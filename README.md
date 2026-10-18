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

[💚 Support Baghcheh](https://buy.stripe.com/bJecMY8Nh56s4JG0o88og01) · it's free for every child, funded by donations.

## Structure

```
CURRICULUM.md       the content plan: every subject, garden and lesson, what it covers, which content types
index.html          children's app (profiles, gardens, lessons, placement check)
guide.html          parent guide (including the level ↔ age table)
method.html         method and evidence, with references
policies.html       free, privacy, neutrality, child safety, licensing
open.html           open source, self-hosting, contributing
css/style.css
js/common.js        on-device storage, backup/merge, speech, Persian digits
js/sync.js          pairing and sync with the home hub (inactive on normal mirrors)
js/content.js       curriculum DATA shared by all subjects: levels, subjects, placement check
js/lessons/*.js     the lessons, one file per subject (read.js, math.js, feel.js)  ← teachers edit these
js/engine.js        lesson player and the basic step types
js/games.js         game step types (pairs, build, order, sort, feed, pattern)
js/anim.js          animated steps: how a letter is written, picture stories (story)
js/strokes.js       stroke order of every letter, drawn as SVG paths
js/app.js           routing and screens
sw.js               offline cache
tools/check-reading.js  checks reading lessons use only letters taught so far (node)
tools/check-plan.js     checks the lessons match CURRICULUM.md (node)
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

Start from `CURRICULUM.md`: it lists every planned lesson with its id, garden, order, what it covers and the content
types it uses. Change the plan in the same commit as the lesson, then run `node tools/check-plan.js`.

Lessons are plain data in `js/lessons/<subject>.js`, one file per subject, each pushing into `B.LESSONS`. Each has `id`, `subject` (`read` | `math` | `feel`),
`level` (`seed` | `sprout` | `sapling` | `tree` | `forest`, or `null` for every level), `emoji`, `title` and `steps`.

| Step type  | Fields | Scored |
|------------|--------|--------|
| `intro`    | `letter`, `text`, `say`, `forms` [[form, label]], `example` {pic, word}, optional `write` (the letter to animate when `letter` is not a plain letter, e.g. `"او"` → `"و"`). Letters in `js/strokes.js` are shown being written, stroke by stroke | no |
| `choose`   | `prompt`, `options` (strings or {label, value}), `answer`, optional `show`, `say`, `pic`, `ltr` (`show` is a math expression, drawn left to right) | yes |
| `trace`    | `letter`, `prompt` (the child writes over the handwriting model from `js/strokes.js`, which is first shown being written) | no |
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

**Games** (`js/games.js`). The game is the skill itself, never a reward added on top. No timers, points or losing:
a wrong move bounces back with a gentle word, and after two misses on the same thing the right answer is shown.
Everything works by tapping (mouse, touch, or Tab and Enter on a keyboard), and dragging works too. A game is right
on the first try when there were no misses. Things on cards and tiles ("faces") can be a string (letter, word or
emoji), a number (shown in Persian digits), or `{label, pic, dots, say}`: a word or number, a picture, a number of
dots to count, and the words said aloud when it is tapped (used for pictures).

| Step type | Fields | Scored |
|-----------|--------|--------|
| `pairs`   | `pairs` [[a, b], …] (letter ↔ picture, number ↔ dots, word ↔ picture), optional `prompt`, `hidden: true` for a memory game with the cards face down (a miss only counts when the partner was already seen; one such miss is allowed) | yes |
| `build`   | `word` (shown joined at the end), `parts` (letters or syllables in reading order), optional `extra` (tiles that don't belong), `pic`, `say`, `prompt` | yes |
| `order`   | `items` in the right order (faces), optional `prompt`, `ltr` (left to right, for numbers), `numbered` (۱، ۲، ۳ under the places, for story steps) | yes |
| `sort`    | `prompt`, `baskets` [{label, pic, value}] (value defaults to the label), `items` [{label, pic, dots, say, basket}] where `basket` is a basket's value | yes |
| `feed`    | `n` (how many), or `a` and `b` (the sign shows a + b), optional `animal`, `food` (emoji), `prompt`, `max` (food on the table, default n + 4). The child moves food onto the plate and presses «بفرما!»; after two tries the food on the plate is numbered | yes |
| `pattern` | `seq` (the whole pattern), `blanks` (places to fill, from 0; default the last), `options`, optional `prompt`, `ltr` | yes |

**Animations** (`js/anim.js`). SVG and CSS only, no video. With "reduce motion" on, strokes and scenes appear one by one without movement.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `story`   | A short animated picture story or explanation with play, pause and replay. `cast` {id: emoji or short text such as `"۳ + ۲ = ۵"`}, `scenes` [{`caption`, `say`, `audio`, `at`}] where `at` is {id: [x, y] or [x, y, {size, flip, act}] or `null` to hide}; x and y are percentages of the stage from the top left, an actor stays where it is until a scene moves it, and `act` is `bounce`, `spin`, `grow` or `shake`. Captions are read aloud. Optional `prompt`, `bg` (CSS background), `tall`, and `question`, `options`, `answer`, `pic` to ask about the story at the end | only with `question` |

**Coding** (`js/steps/coding.js`, used by «فکر و برنامه‌نویسی»). Block coding in the spirit of ScratchJr and Code.org's early courses.
The child lines up blocks by tapping, dragging, or the keyboard's arrow keys (Backspace takes one out), presses «اجرا» and
watches the character follow the program block by block. No timers, points or losing: a program that misses is
"let's fix it". Tapping a block in the program takes it out and the next block goes in its place. After two runs that
miss, the first block that went wrong is coloured (or the empty place, when blocks are missing). With "reduce motion"
on, the character jumps from square to square.

| Step type   | Fields | Scored |
|-------------|--------|--------|
| `code`      | `goal` [x, y], optional `start` [x, y] (default [0, 0]), `size` [columns, rows] (default [5, 5]), `walls` [[x, y], …] (x from the left, y from the top, from 0), `blocks` (`"arrows"`: up, down, left, right; or `"turn"`: forward, turn right, turn left, with `face` up \| down \| left \| right for the way the character looks at the start), `repeat: true` (adds a repeat block; tap its count to change it, 2 to 5), `max` (most blocks the program may use, to ask for a repeat), `given` (a program to fix, e.g. `["right", {repeat: 3, body: ["up"]}]`; runs before the child changes it don't count as tries), `hero`, `goalPic`, `wall` (emoji), `prompt`, `say`. Right on the first try when the first run reaches the goal | yes |
| `unplugged` | `text`: a game for home without a screen, written for the parent (e.g. a parent plays a robot that follows the child's spoken instructions). Ends every thinking lesson | no |

**English** (`js/steps/english.js`). English is spoken with the device's English voice (`B.speakEn` in
`js/english-voice.js`; any text written only in Latin letters that goes through `B.speak` is spoken in English too) and
written left to right. Steps of English lessons carry `en: true` (set in `js/lessons/english.js`), so the games and
`story` above also mark their English text `lang="en" dir="ltr"`.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `words`   | `words` [{pic or color or dots, en, audio}]: tap each picture to hear it and say it aloud; optional `show` (write the word, from Sprout on), `prompt` | no |
| `listen`  | `say` (English to hear, or `audio`), `options` (emoji, or {pic or color or dots, label, en, value}), `answer` (the option's value: its pic, color, dots or label by default), optional `prompt`, `quiet` (don't repeat the Persian question), `show` (a letter, word or picture shown above). Options with `en` say it when tapped; with no `say`, their words are read out | yes |
| `letter`  | `letter`, `words` [{pic, en}] starting with its sound, optional `like` (a Persian letter with a similar sound), `say`, `audio` (a recording of the sound) | no |
| `tip`     | `text`: how parents can practise at home, even without knowing English; optional `pic` | no |

Any step can take `audio: "audio/file.mp3"` to play a recording instead of the device voice.

**Science** (`js/steps/science.js`). Inquiry steps: the child guesses, tries and sees.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `test`    | `kind` (`float`: a basin of water, or `magnet`), `items` [{pic, say, yes}] where `yes` means it floats / the magnet pulls it, optional `prompt`, `ask`, `yesLabel`, `noLabel`, `yesSaw`, `noSaw`. The child guesses, then watches it happen; guesses are never marked wrong | no |
| `shadow`  | Drag the sun (or use the buttons or arrow keys) and watch a tree's shadow. `tasks` [{prompt, want}] where `want` is `short`, `long`, `left` or `right`; optional `thing`, `prompt`, and `question`, `options`, `answer`, `pic` asked at the end | only with `question` |
| `home`    | A safe experiment for home, written for the parent: `pic`, `text` (one line for the child, read aloud), `need` [things], `steps` [what to do], optional `ask` (a question for the child) | no |

**Adding a step type or a subject.** A new file can add step types with `B.engine.steps.mytype = function (s, box, done) { … }`
(call `done(scored, firstTry)` at the end; `B.engine` also shares `choice`, `speakBtn`, `nextBtn`, `doneButton`, `pick`, `nums`).
A new subject gets its own `js/lessons/<id>.js` that does `B.SUBJECTS.push({ id, name, emoji, leveled })` and
`B.LESSONS.push(…)`. Load new files in `index.html` (step files after `js/anim.js`, lesson files after the other lesson
files) and list them in `FILES` in `sw.js`. New phrases go in `js/strings.js`, new styles at the end of `css/style.css`.

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

## Support

Baghcheh is free for every child and always will be. Hosting, recorded lesson audio and teacher review
are paid for by voluntary donations.

**[💚 Support Baghcheh](https://buy.stripe.com/bJecMY8Nh56s4JG0o88og01)** (pay any amount, via Stripe)

Donations give no say over the content and no access to any data about children or families.
You can also help without money: review lessons, record audio, translate, or host a mirror (see `open.html`).

## License

- **Software** (the website's HTML/CSS/JavaScript, the desktop and Android apps, `tools/`):
  [GNU AGPL-3.0-or-later](LICENSE). You may use, host and change it freely. If you distribute a modified
  version or run one on a server for others, you must publish its source under the same license, so a
  modified copy with hidden tracking can't stay hidden.
- **Educational content** (lessons in `js/lessons/` and `js/content.js`, the plan in `CURRICULUM.md`, the text in `js/strings.js`, the info pages, `STYLE.md`, `audio/`):
  [CC BY-SA 4.0](LICENSE-CONTENT). Credit "Baghcheh contributors / مشارکت‌کنندگان باغچه" and share changes under the same license.

Copyright (C) 2026 Baghcheh contributors. Copyright is held collectively so contributors can stay anonymous.
By contributing, you agree to license your contribution under these terms.
