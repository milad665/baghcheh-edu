// The home hub: a small HTTP server on the home network that serves the website and keeps the family's
// progress in <app data>/progress.json. Devices pair with a 4-digit code shown in the app window, then
// sync with GET/PUT /api/state; the merging itself happens in the browser (B.merge in js/common.js).
// Requests from outside private address ranges are refused, so nothing is reachable from the internet.

use serde_json::{json, Value};
use std::fs::{self, File};
use std::io::Read;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant};
use tiny_http::{Header, Method, Request, Response, Server};

include!(concat!(env!("OUT_DIR"), "/site.rs"));

const PORTS: std::ops::RangeInclusive<u16> = 8765..=8775;
const CODE_LIFETIME: Duration = Duration::from_secs(10 * 60);
const CODE_TRIES: u32 = 10;
const BACKUPS_KEPT: usize = 14;
const MAX_BODY: usize = 5 * 1024 * 1024;

pub struct Hub {
    pub port: u16,
    pub token: String,
}

struct Code {
    digits: String,
    made: Instant,
    wrong: u32,
}

struct State {
    dir: PathBuf,
    port: u16,
    hub_token: String,
    rev: u64,
    data: Value, // {profiles: [...], deleted: {...}}
    devices: Vec<Value>, // [{token, paired}]
    code: Option<Code>,
    backed_up_rev: Option<u64>,
}

type Shared = Arc<Mutex<State>>;

pub fn start(dir: PathBuf) -> Result<Option<Hub>, Box<dyn std::error::Error>> {
    fs::create_dir_all(dir.join("backups"))?;
    // One hub per computer: a second copy of the app just quits.
    let lock = File::create(dir.join("hub.lock"))?;
    if lock.try_lock().is_err() { return Ok(None); }
    std::mem::forget(lock);

    let saved = read_json(&dir.join("progress.json"));
    let rev = saved.get("rev").and_then(Value::as_u64).unwrap_or(0);
    let data = json!({
        "profiles": saved.get("profiles").cloned().filter(Value::is_array).unwrap_or(json!([])),
        "deleted": saved.get("deleted").cloned().filter(Value::is_object).unwrap_or(json!({})),
    });
    let devices = read_json(&dir.join("devices.json")).get("devices").and_then(Value::as_array).cloned().unwrap_or_default();

    let server = PORTS
        .clone()
        .find_map(|p| Server::http(SocketAddr::from((Ipv4Addr::UNSPECIFIED, p))).ok().map(|s| (s, p)))
        .or_else(|| Server::http("127.0.0.1:0").ok().map(|s| { let p = s.server_addr().to_ip().unwrap().port(); (s, p) }))
        .ok_or("no free port")?;
    let (server, port) = (Arc::new(server.0), server.1);

    let token = random_hex(16);
    let state: Shared = Arc::new(Mutex::new(State {
        dir, port, hub_token: token.clone(), rev, data, devices, code: None, backed_up_rev: None,
    }));

    for _ in 0..4 {
        let (server, state) = (server.clone(), state.clone());
        thread::spawn(move || {
            for req in server.incoming_requests() { handle(req, &state); }
        });
    }
    let backups = state.clone();
    thread::spawn(move || loop {
        daily_backup(&backups);
        thread::sleep(Duration::from_secs(60));
    });
    Ok(Some(Hub { port, token }))
}

// ---------- Requests ----------

fn handle(mut req: Request, state: &Shared) {
    #[cfg(debug_assertions)]
    eprintln!("{} {} {}", req.remote_addr().map(|a| a.to_string()).unwrap_or_default(), req.method(), req.url());
    let res = respond(&mut req, state);
    let _ = req.respond(res);
}

type Res = Response<std::io::Cursor<Vec<u8>>>;

fn respond(req: &mut Request, state: &Shared) -> Res {
    let from_home = req.remote_addr().map(|a| is_private(a.ip())).unwrap_or(false);
    if !from_home || !host_ok(req) { return text(403, "forbidden"); }
    let url = req.url().to_string();
    let (path, query) = url.split_once('?').unwrap_or((&url, ""));
    if path.starts_with("/api/") { return api(req, path, query, state); }
    if *req.method() != Method::Get && *req.method() != Method::Head { return text(405, "method not allowed"); }
    let name = path.trim_start_matches('/');
    let name = if name.is_empty() { "index.html" } else { name };
    match FILES.iter().find(|(f, _)| *f == name) {
        Some((f, bytes)) => {
            let mut body = bytes.to_vec();
            if f.ends_with(".html") {
                // Marks pages served by a hub, so the site offers pairing and sync (js/sync.js).
                let mut page = String::from_utf8_lossy(&body).replacen("<head>", "<head>\n  <meta name=\"baghcheh-hub\" content=\"1\">", 1);
                // Development only: lets a normal browser on this computer act as the hub's window, for testing.
                #[cfg(debug_assertions)]
                if std::env::var_os("BAGHCHEH_DEV_HUB_PAGES").is_some() && req.remote_addr().is_some_and(|a| a.ip().is_loopback()) {
                    let token = state.lock().unwrap().hub_token.clone();
                    page = page.replacen("<head>", &format!("<head>\n  <script>window.BAGHCHEH_HUB_TOKEN = {token:?};</script>"), 1);
                }
                body = page.into_bytes();
            }
            Response::from_data(body).with_header(header("Content-Type", mime(f))).with_header(header("Cache-Control", "no-cache"))
                .with_header(header("X-Content-Type-Options", "nosniff")).with_header(header("Referrer-Policy", "no-referrer"))
        }
        None => text(404, "not found"),
    }
}

fn api(req: &mut Request, path: &str, query: &str, state: &Shared) -> Res {
    let method = req.method().clone();
    let given = req.headers().iter().find(|h| h.field.equiv("X-Baghcheh-Token")).map(|h| h.value.to_string()).unwrap_or_default();
    let body = read_body(req);
    let mut st = state.lock().unwrap();
    let is_hub = !given.is_empty() && given == st.hub_token;
    let is_device = is_hub || (!given.is_empty() && st.devices.iter().any(|d| d["token"] == given.as_str()));

    match (method, path) {
        (Method::Post, "/api/pair") => {
            let digits = body.as_ref().and_then(|b| b["code"].as_str()).unwrap_or("").to_string();
            let fresh = st.code.as_ref().is_some_and(|c| c.made.elapsed() < CODE_LIFETIME && c.wrong < CODE_TRIES);
            if !fresh { st.code = None; return json_res(410, json!({"error": "expired"})); }
            let code = st.code.as_mut().unwrap();
            if code.digits != digits {
                code.wrong += 1;
                return json_res(403, json!({"error": "wrong"}));
            }
            let token = random_hex(16);
            st.devices.push(json!({"token": token, "paired": now_ms()}));
            save_devices(&st);
            json_res(200, json!({"token": token}))
        }
        (Method::Get, "/api/state") if is_device => {
            let known = query.split('&').find_map(|kv| kv.strip_prefix("rev=")).and_then(|v| v.parse::<u64>().ok());
            if known == Some(st.rev) { return json_res(200, json!({"rev": st.rev, "same": true})); }
            json_res(200, state_json(&st))
        }
        (Method::Put, "/api/state") if is_device => {
            let Some(b) = body else { return json_res(400, json!({"error": "bad"})) };
            if b["rev"].as_u64() != Some(st.rev) { return json_res(409, state_json(&st)); }
            let (Some(profiles), Some(deleted)) = (b.get("profiles").filter(|v| v.is_array()), b.get("deleted").filter(|v| v.is_object())) else {
                return json_res(400, json!({"error": "bad"}));
            };
            let data = json!({"profiles": profiles, "deleted": deleted});
            if data != st.data {
                st.data = data;
                st.rev += 1;
                if let Err(e) = save_progress(&st) {
                    eprintln!("could not save progress: {e}");
                    return json_res(500, json!({"error": "disk"}));
                }
            }
            json_res(200, json!({"rev": st.rev}))
        }
        (_, "/api/state") => json_res(401, json!({"error": "not paired"})),

        // ---- Only for the app's own window ----
        (_, p) if p.starts_with("/api/hub/") && !is_hub => json_res(401, json!({"error": "not the hub"})),
        (Method::Get, "/api/hub/info") => {
            let code = st.code.as_ref().filter(|c| c.made.elapsed() < CODE_LIFETIME && c.wrong < CODE_TRIES).map(|c| c.digits.clone());
            let addresses: Vec<String> = lan_addresses().iter().map(|ip| format!("{ip}:{}", st.port)).collect();
            let qr = match (&code, addresses.first()) {
                (Some(c), Some(a)) => qr_svg(&format!("http://{a}/#/pair/{c}")),
                _ => String::new(),
            };
            let backups = list_backups(&st.dir);
            json_res(200, json!({
                "addresses": addresses,
                "code": code,
                "qr": qr,
                "devices": st.devices.len(),
                "backupsDir": st.dir.join("backups").to_string_lossy(),
                "backups": backups.len(),
                "lastBackup": backups.last().map(|p| p.file_name().unwrap().to_string_lossy().to_string()),
            }))
        }
        (Method::Post, "/api/hub/code") => {
            let n = u32::from_le_bytes(random_bytes::<4>()) % 10000;
            st.code = Some(Code { digits: format!("{n:04}"), made: Instant::now(), wrong: 0 });
            json_res(200, json!({"ok": true}))
        }
        (Method::Post, "/api/hub/forget") => {
            st.devices.clear();
            st.code = None;
            save_devices(&st);
            json_res(200, json!({"ok": true}))
        }
        (Method::Post, "/api/hub/open-backups") => {
            open(&st.dir.join("backups").to_string_lossy());
            json_res(200, json!({"ok": true}))
        }
        _ => json_res(404, json!({"error": "not found"})),
    }
}

fn state_json(st: &State) -> Value {
    json!({"rev": st.rev, "profiles": st.data["profiles"], "deleted": st.data["deleted"]})
}

fn read_body(req: &mut Request) -> Option<Value> {
    let mut buf = Vec::new();
    req.as_reader().take(MAX_BODY as u64 + 1).read_to_end(&mut buf).ok()?;
    if buf.is_empty() || buf.len() > MAX_BODY { return None; }
    serde_json::from_slice(&buf).ok()
}

// Blocks pages from other sites that point their own name at this computer (DNS rebinding):
// the hub is only ever reached by IP address, localhost or a .local name.
fn host_ok(req: &Request) -> bool {
    let Some(h) = req.headers().iter().find(|h| h.field.equiv("Host")) else { return false };
    let host = h.value.as_str();
    let name = if host.starts_with('[') { host.split(']').next().unwrap_or("").trim_start_matches('[') } else { host.split(':').next().unwrap_or("") };
    name.parse::<IpAddr>().is_ok() || name == "localhost" || name.ends_with(".local")
}

fn is_private(ip: IpAddr) -> bool {
    match ip {
        IpAddr::V4(v4) => v4.is_loopback() || v4.is_private() || v4.is_link_local(),
        IpAddr::V6(v6) => match v6.to_ipv4_mapped() {
            Some(v4) => is_private(IpAddr::V4(v4)),
            None => v6.is_loopback() || (v6.segments()[0] & 0xfe00) == 0xfc00 || (v6.segments()[0] & 0xffc0) == 0xfe80,
        },
    }
}

// The computer's addresses on the home network, most likely Wi-Fi first.
fn lan_addresses() -> Vec<Ipv4Addr> {
    let mut ips: Vec<Ipv4Addr> = if_addrs::get_if_addrs().unwrap_or_default().into_iter()
        .filter_map(|i| match i.ip() { IpAddr::V4(v4) if v4.is_private() => Some(v4), _ => None })
        .collect();
    ips.sort_by_key(|ip| match ip.octets() { [192, 168, ..] => 0, [10, ..] => 1, _ => 2 });
    ips.dedup();
    ips
}

fn qr_svg(text: &str) -> String {
    use qrcode::render::svg;
    match qrcode::QrCode::new(text.as_bytes()) {
        Ok(code) => code.render::<svg::Color>().min_dimensions(220, 220).quiet_zone(true)
            .dark_color(svg::Color("#000000")).light_color(svg::Color("#ffffff")).build(),
        Err(_) => String::new(),
    }
}

// ---------- Files ----------

fn read_json(path: &Path) -> Value {
    fs::read(path).ok().and_then(|b| serde_json::from_slice(&b).ok()).unwrap_or(json!({}))
}

// Writes to a temporary file first, so a crash or power cut never leaves half a file.
fn write_atomic(path: &Path, value: &Value) -> std::io::Result<()> {
    let tmp = path.with_extension("tmp");
    fs::write(&tmp, serde_json::to_vec_pretty(value)?)?;
    fs::rename(&tmp, path)
}

fn save_progress(st: &State) -> std::io::Result<()> {
    let mut v = state_json(st);
    v["app"] = json!("baghcheh");
    write_atomic(&st.dir.join("progress.json"), &v)
}

fn save_devices(st: &State) {
    let _ = write_atomic(&st.dir.join("devices.json"), &json!({"devices": st.devices}));
}

fn list_backups(dir: &Path) -> Vec<PathBuf> {
    let mut files: Vec<PathBuf> = fs::read_dir(dir.join("backups")).map(|it| it.flatten().map(|e| e.path()).collect()).unwrap_or_default();
    files.retain(|p| p.file_name().and_then(|n| n.to_str()).is_some_and(|n| n.starts_with("baghcheh-") && n.ends_with(".json")));
    files.sort();
    files
}

// One backup file per day, in the same format as the site's own backup file (B.backup in js/common.js),
// rewritten while that day's progress changes. The last 14 days are kept.
fn daily_backup(state: &Shared) {
    let mut st = state.lock().unwrap();
    let has_children = st.data["profiles"].as_array().is_some_and(|p| !p.is_empty());
    if !has_children || st.backed_up_rev == Some(st.rev) { return; }
    let name = format!("baghcheh-{}.json", chrono::Local::now().format("%Y-%m-%d"));
    let backup = json!({
        "app": "baghcheh", "format": 1, "exported": now_ms(),
        "profiles": st.data["profiles"], "deleted": st.data["deleted"],
    });
    if write_atomic(&st.dir.join("backups").join(&name), &backup).is_ok() {
        st.backed_up_rev = Some(st.rev);
    }
    let files = list_backups(&st.dir);
    for old in files.iter().take(files.len().saturating_sub(BACKUPS_KEPT)) { let _ = fs::remove_file(old); }
}

// ---------- Small helpers ----------

pub fn open(target: &str) {
    #[cfg(target_os = "macos")]
    let cmd = ("open", vec![target]);
    #[cfg(target_os = "windows")]
    let cmd = ("explorer", vec![target]);
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    let cmd = ("xdg-open", vec![target]);
    let _ = std::process::Command::new(cmd.0).args(cmd.1).spawn();
}

fn random_bytes<const N: usize>() -> [u8; N] {
    let mut b = [0u8; N];
    getrandom::fill(&mut b).expect("no randomness");
    b
}

fn random_hex(n: usize) -> String {
    let mut b = vec![0u8; n];
    getrandom::fill(&mut b).expect("no randomness");
    b.iter().map(|x| format!("{x:02x}")).collect()
}

fn now_ms() -> u64 {
    std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.as_millis() as u64).unwrap_or(0)
}

fn header(k: &str, v: &str) -> Header { Header::from_bytes(k.as_bytes(), v.as_bytes()).unwrap() }

fn text(status: u16, msg: &str) -> Res {
    Response::from_string(msg).with_status_code(status).with_header(header("Content-Type", "text/plain; charset=utf-8"))
}

fn json_res(status: u16, v: Value) -> Res {
    Response::from_data(serde_json::to_vec(&v).unwrap()).with_status_code(status)
        .with_header(header("Content-Type", "application/json")).with_header(header("Cache-Control", "no-store"))
}

fn mime(f: &str) -> &'static str {
    match f.rsplit('.').next().unwrap_or("") {
        "html" => "text/html; charset=utf-8",
        "js" => "text/javascript; charset=utf-8",
        "css" => "text/css; charset=utf-8",
        "svg" => "image/svg+xml",
        "webmanifest" => "application/manifest+json",
        "json" => "application/json",
        "woff2" => "font/woff2",
        "mp3" => "audio/mpeg",
        "ogg" => "audio/ogg",
        "m4a" => "audio/mp4",
        "wav" => "audio/wav",
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "webp" => "image/webp",
        "apk" => "application/vnd.android.package-archive",
        _ => "application/octet-stream",
    }
}
