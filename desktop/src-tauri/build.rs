// Embeds the website (the repository root) into the app, so the installer works offline and the site
// itself needs no build step. Only the files a browser needs are taken, never desktop/ or android/.
use std::{env, fs, path::Path};

const TOP: &[&str] = &["index.html", "guide.html", "method.html", "policies.html", "open.html", "browse.html",
    "manifest.webmanifest", "icon.svg", "sw.js"];
// downloads/ holds the Android APK when CI has built it, so tablets can get it straight from the hub.
const DIRS: &[&str] = &["js", "css", "fonts", "audio", "games", "downloads"];

fn walk(root: &Path, rel: &str, out: &mut Vec<String>) {
    let dir = root.join(rel);
    println!("cargo:rerun-if-changed={}", dir.display());
    let Ok(entries) = fs::read_dir(&dir) else { return };
    let mut names: Vec<_> = entries.flatten().collect();
    names.sort_by_key(|e| e.file_name());
    for e in names {
        let name = e.file_name().to_string_lossy().to_string();
        if name.starts_with('.') || name.ends_with(".md") { continue; }
        let path = format!("{rel}/{name}");
        if e.path().is_dir() { walk(root, &path, out) } else { out.push(path) }
    }
}

fn main() {
    let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../..").canonicalize().unwrap();
    let mut files: Vec<String> = TOP.iter().map(|s| s.to_string()).collect();
    for d in DIRS { walk(&root, d, &mut files); }
    let mut code = String::from("pub static FILES: &[(&str, &[u8])] = &[\n");
    for f in &files {
        let abs = root.join(f);
        println!("cargo:rerun-if-changed={}", abs.display());
        assert!(abs.exists(), "missing site file {f}");
        code += &format!("    ({f:?}, include_bytes!({:?})),\n", abs.to_string_lossy());
    }
    code += "];\n";
    fs::write(Path::new(&env::var("OUT_DIR").unwrap()).join("site.rs"), code).unwrap();
    tauri_build::build()
}
