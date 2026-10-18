# 🌱 باغچه · Baghcheh

**آموزشِ رایگان، تعاملی و بدونِ ثبت‌نام برای کودکانِ فارسی‌زبان.** خواندن، نوشتن، حساب و آرامش، حتی بدونِ اینترنت.

Free, interactive, offline-first learning for Persian-speaking children, designed for desktop and tablet and usable on phones. Built on proven practices
(Teaching at the Right Level, mastery learning, spaced retrieval, systematic phonics,
concrete → pictorial → abstract math). See `method.html` for the method and the references behind it.

## Principles

- **Free forever.** No ads, no accounts, no tracking, no third-party requests of any kind.
- **Levels, not ages.** Children see gardens (دانه، جوانه، نهال، درخت، جنگل), set per subject. Typical ages appear only in the parent guide.
- **Runs anywhere.** Plain static files, no build step, no backend. Copy the folder to any web server, inside or outside Iran, or open `index.html` from a USB stick.
- **Neutral and safe.** No political or ideological content, so using it never puts a family at risk.

The full commitments are in `policies.html`.

## Structure

```
index.html          children's app (profiles, gardens, lessons, placement check)
guide.html          parent guide (including the level ↔ age table)
method.html         method and evidence, with references
policies.html       free, privacy, neutrality, child safety, licensing
open.html           open source, self-hosting, contributing
css/style.css
js/common.js        on-device storage, backup/merge, speech, Persian digits
js/sync.js          pairing and sync with the home hub (inactive on normal mirrors)
js/content.js       curriculum DATA: levels, lessons, placement check  ← teachers edit this
js/engine.js        lesson step types
js/app.js           routing and screens
sw.js               offline cache
tools/check-reading.js  checks reading lessons use only letters taught so far (node)
audio/  fonts/      optional recorded audio / self-hosted Vazirmatn font
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly also works, but without offline caching.

## Host a mirror

Upload every file to any static host: nginx, Apache, shared hosting, object storage, GitHub Pages,
Cloudflare Pages, Netlify. Please:

1. Use HTTPS (offline install needs it).
2. Turn off or shorten access logs so families' IP addresses are not kept.
3. Do not add analytics, ads or outside scripts. If your copy does, please don't call it Baghcheh.

## Offline pack

Zip the whole folder and share it over Bluetooth, USB or a messenger. The recipient unzips it and opens `index.html`.

## Apps: home hub and Android

The website needs none of this; the apps only package the same files.

- **Desktop home hub** (`desktop/`, Tauri 2, installer of a few MB). One computer at home runs it. Progress lives in
  `progress.json` in the app-data folder (macOS `~/Library/Application Support/org.baghcheh.hub`, Windows
  `%APPDATA%\org.baghcheh.hub`, Linux `~/.local/share/org.baghcheh.hub`), with a daily backup in `backups/`
  (same format as the site's backup file, last 14 kept). The app runs a small HTTP server on port 8765 (or the next
  free one up to 8775) that serves the site to the home network and a sync API. It answers only private-network
  addresses and refuses unknown `Host` names.
- **Pairing:** the hub window shows its address, a QR code and a 4-digit code (valid 10 minutes, 10 wrong tries).
  A tablet opens the address (or scans the QR), enters the code and gets a device token.
- **Sync:** `GET /api/state` → merge locally with `B.merge` → `PUT /api/state` with the revision it read
  (409 means someone else wrote first: merge again). Per lesson the record with more progress wins; name, picture and
  levels follow the profile's `updatedAt`; deleted children leave tombstones (`deleted: {id: time}`) and stay deleted
  unless changed after the deletion. Restoring a backup file on purpose brings a deleted child back.
- **Android** (`android/`, no libraries, about 140 KB). The site is copied into the APK at build time; a small Java
  bridge makes the HTTP calls to the hub and refuses any address outside the home network.
- **iPad/iPhone:** open the hub's address in Safari. A page loaded from an HTTPS mirror cannot reach a hub on
  plain HTTP, so sync works only on pages opened from the hub itself.

Build locally:

```bash
cd desktop && npm install && npx tauri build      # needs Rust and Node
cd android && ./gradlew assembleRelease            # needs JDK 17 and the Android SDK
```

For development, `cargo run` in `desktop/src-tauri` with `BAGHCHEH_DEV_HUB_PAGES=1` lets a normal browser on
the same computer act as the hub window (debug builds only).

GitHub Actions (`.github/workflows/apps.yml`) builds everything for free: run it by hand, or push a `v*` tag for a
draft release. Desktop builds are unsigned (`guide.html#home-app` explains the "unknown developer" warning). Put the
APK on mirrors as `downloads/baghcheh.apk`; CI also embeds it in the hub so tablets can get it at home.

## Adding a lesson

Lessons are plain data in `js/content.js`. Each has `id`, `subject` (`read` | `math` | `feel`),
`level` (`seed` | `sprout` | `sapling` | `tree` | `forest`, or `null` for every level), `emoji`, `title` and `steps`.

| Step type  | Fields | Scored |
|------------|--------|--------|
| `intro`    | `letter`, `text`, `say`, `forms` [[form, label]], `example` {pic, word} | no |
| `choose`   | `prompt`, `options` (strings or {label, value}), `answer`, optional `show`, `say`, `pic`, `ltr` (`show` is a math expression, drawn left to right) | yes |
| `trace`    | `letter`, `prompt` | no |
| `blend`    | `parts`, `word`, `pic`, `say` | no |
| `passage`  | `text` (a short decodable passage), `question`, `options`, `answer`, optional `pic`; the passage itself is never read aloud | yes |
| `count`    | `thing` (emoji), `n`, `options` | yes |
| `tenframe` | `n` (up to 20: two frames), `options`, optional `prompt`, `missing` (asks how many make ten), `plus` or `minus` (shows `n + plus` in two colours, or crosses out `minus`) | yes |
| `make`     | `n` (child builds n in one or two ten-frames) | yes |
| `numline`  | `a`, `b` (negative to subtract), `options`, optional `thing` | yes |
| `tens`     | `n` and `options` (read a number from bundles of ten and loose sticks), optional `b` (add, or take away when negative; a bundle is opened when needed), or `build: true` (child builds n; ten sticks tie into a bundle) | yes |
| `compare`  | `a`, `b`, `ask` (`more` \| `less` \| `symbol` for < = >), optional `pic: "tens"` or `thing` (emoji) | yes |
| `shape`    | `prompt`, then `show` (a shape id, or a list of ids to name them with no question), `options` (shape ids, numbers or {label, value}), `answer`. Shapes: circle, square, triangle, rectangle, plus `-tilt` / `-tall` variants | yes, unless `show` is a list |
| `measure`  | `bars` [{thing, len}], `ask` (`longer` \| `shorter`, or `count` with `unit` emoji, `prompt`, `options`) | yes |
| `money`    | `prompt`, optional `items` [{emoji, name, price}], then `bills` + `options` (+ `answer` if not the sum), or `wallet` (child pays the exact total). Amounts are in thousands of toman | yes |
| `talk`     | `scene`, `caption` (dialogic-reading prompts for the grown-up) | no |
| `breathe`  | `cycles` | no |
| `feelings` | (no fields; the answer is never stored) | no |

Any step can take `audio: "audio/file.mp3"` to play a recording instead of the device voice.

A lesson counts as mastered when ≥ 80% of scored steps are right on the first try. Mastered lessons come back
for review after 1, 3, 7, 14 and 30 days.

After changing a reading lesson, run `node tools/check-reading.js`: every word the child decodes must use only letters taught
in earlier lessons (new letters go in its `TEACHES` table).

Before publishing a new lesson, have it reviewed by at least one Persian-speaking teacher (see `policies.html#accuracy`).

## Release checklist

1. Add any new file to `FILES` in `sw.js` (and to `TOP`/`DIRS` in `desktop/src-tauri/build.rs` and the
   `copySite` task in `android/build.gradle` if it is outside `js/`, `css/`, `fonts/`, `audio/`).
2. Bump `VERSION` in `sw.js`, or returning visitors keep the old files.
3. Update the date at the top of `policies.html` if the policies changed.
4. For the apps, bump `version` in `desktop/src-tauri/tauri.conf.json` and `Cargo.toml`, and `versionCode`/`versionName` in `android/build.gradle`.

## License

- **Software** (the website's HTML/CSS/JavaScript, the desktop and Android apps, `tools/`):
  [GNU AGPL-3.0-or-later](LICENSE). You may use, host and change it freely. If you distribute a modified
  version or run one on a server for others, you must publish its source under the same license, so a
  modified copy with hidden tracking can't stay hidden.
- **Educational content** (lessons in `js/content.js`, the text in `js/strings.js`, the info pages, `STYLE.md`, `audio/`):
  [CC BY-SA 4.0](LICENSE-CONTENT). Credit "Baghcheh contributors / مشارکت‌کنندگان باغچه" and share changes under the same license.

Copyright (C) 2026 Baghcheh contributors. Copyright is held collectively so contributors can stay anonymous.
By contributing, you agree to license your contribution under these terms.
