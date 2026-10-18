// Baghcheh home hub: the website in a desktop window, with the family's progress kept in a file,
// a daily backup, and sync for tablets and computers on the same Wi-Fi. Nothing leaves the home network.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod hub;

use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let dir = app.path().app_data_dir()?;
            let hub = match hub::start(dir)? {
                Some(hub) => hub,
                None => std::process::exit(0), // already running
            };
            let origin = format!("http://127.0.0.1:{}", hub.port);
            // Only the app's own window gets the hub key; pages on other devices pair with a code instead.
            let script = format!(
                "if (location.origin === {origin:?}) window.BAGHCHEH_HUB_TOKEN = {:?};",
                hub.token
            );
            let allowed = format!("{origin}/");
            WebviewWindowBuilder::new(app, "main", WebviewUrl::External(format!("{origin}/index.html").parse()?))
                .title("باغچه")
                .inner_size(1100.0, 800.0)
                .min_inner_size(360.0, 480.0)
                .initialization_script(&script)
                // Links to other sites open in the normal browser, never inside the hub window.
                .on_navigation(move |url| {
                    let ours = url.as_str().starts_with(&allowed);
                    if !ours && matches!(url.scheme(), "http" | "https") { hub::open(url.as_str()); }
                    ours
                })
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Baghcheh");
}
