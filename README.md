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
browse.html         content browser, separate from the app: every subject, garden, lesson and step, playable, nothing saved
guide.html          parent guide (including the level ↔ age table)
method.html         method and evidence, with references
policies.html       free, privacy, neutrality, child safety, licensing
open.html           open source, self-hosting, contributing
css/style.css
js/common.js        on-device storage, backup/merge, speech, Persian digits
js/sync.js          pairing and sync with the home hub (inactive on normal mirrors)
js/content.js       curriculum DATA shared by all subjects: levels, subjects, placement check
js/lessons/*.js     the lessons, one file per subject (read.js, math.js, feel.js)  ← teachers edit these
js/maps/*.js        outline maps for the map step, from Natural Earth (iran.js: provinces, seas, cities)
js/en/*.js          the same lessons in English (English as a second language), one file per subject
js/english-mode.js  plays a lesson in English: the «🔤 English» switch in the lesson bar
js/engine.js        lesson player and the basic step types
js/games.js         game step types (pairs, build, order, sort, feed, pattern)
js/anim.js          animated steps: how a letter is written, picture stories (story)
js/art.js           pictures: shows a hand-drawn SVG in place of an emoji wherever lessons use one
js/art/*.js         the drawings, by group (people, feelings, animals, food, nature, home, things), and story backdrops (scenes.js)
js/strokes.js       stroke order of every letter (source: Iran's first-grade writing book), hamza, joined forms and whole words, the digits ۰–۹, Latin a–z and A–Z, and pre-writing paths, as SVG paths
js/app.js           routing and screens
js/browse.js        the content browser (browse.html); shows planned lessons too when CURRICULUM.md is served
sw.js               offline cache
tools/check-reading.js  checks reading lessons use only letters taught so far (node)
tools/check-plan.js     checks the lessons match CURRICULUM.md (node)
tools/storyboard.html   every animation as still pictures with their captions, to check they match (open from the site)
tools/build-iran-map.js makes js/maps/iran.js from Natural Earth (node + mapshaper; only when the map data changes)
tools/strokes-preview.html  every model in js/strokes.js with numbered strokes and arrows, to check by eye
tools/art-preview.html  every drawing and backdrop, and the emoji in lessons that have no drawing yet
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

The official site, garden-edu.com, is Cloudflare Pages: `.github/workflows/site.yml` checks the content and
deploys every push to `main` (it needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets). Pages
allows 20,000 files per deploy (100,000 on a paid plan) and 25 MiB per file, with no limit on total size or
traffic; if audio ever outgrows that, move `audio/` to an R2 bucket on its own subdomain.

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
| `trace`    | `letter`, `prompt`, optional `say` (spoken, with a listen button). The child writes over the handwriting model from `js/strokes.js`, which is first shown being written. `letter` can be a Persian letter, a Persian digit (`"۵"`) or a Latin letter (`"a"`, `"A"`: drawn left to right, with the midline and top line of an English exercise book), or a joined form or whole word that has a model in `js/strokes.js` (`"ـبـ"`, `"سیب"`: each joined piece written in one go, dots last; drawn with a thinner model). Instead of `letter`: `path`, a pre-writing path from `B.PATHS` (`down`, `across`, `slant`, `bowl`, `hills`, `wave`, `zigzag`, `circle`), or `strokes`, any list of strokes in the same form as `js/strokes.js` (paths and shapes have no baseline) | no |
| `blend`    | `parts`, `word`, `pic`, `say` | no |
| `passage`  | `text` (a short decodable passage), `question`, `options`, `answer`, optional `pic`; the passage itself is never read aloud | yes |
| `count`    | `thing` (emoji), `n`, `options` | yes |
| `tenframe` | `n` (up to 20: two frames), `options`, optional `prompt`, `missing` (asks how many make ten), `plus` or `minus` (shows `n + plus` in two colours, or crosses out `minus`) | yes |
| `make`     | `n` (child builds n in one or two ten-frames) | yes |
| `numline`  | `a`, `b` (negative to subtract), `options`, optional `thing` | yes |
| `tens`     | `n` and `options` (read a number from bundles of ten and loose sticks; above 100 also packs of a hundred, above 1,000 boxes of a thousand), optional `b` (add, or take away when negative; a bundle, pack or box is opened when needed, and the child is told), or `build: true` (child builds n; ten sticks tie into a bundle, ten bundles into a pack, ten packs into a box), optional `prompt`, `hundreds` (`true`: packs of a hundred for 100 and below too; `false`: bundles only), `thousands: true` | yes |
| `compare`  | `a`, `b`, `ask` (`more` \| `less` \| `symbol` for < = >), optional `pic: "tens"` (bundles, and packs of a hundred above 100) or `thing` (emoji) | yes |
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
| `build`   | `word` (shown joined at the end), `parts` (letters or syllables in reading order), optional `extra` (tiles that don't belong), `pic`, `say`, `prompt`, `hidden: true` for dictation (the word is said at the start and on the listen button, and the picture waits for the end with the word; with no Persian voice, the parent opens the word and says it) | yes |
| `order`   | `items` in the right order (faces), optional `prompt`, `ltr` (left to right, for numbers), `numbered` (۱، ۲، ۳ under the places, for story steps) | yes |
| `sort`    | `prompt`, `baskets` [{label, pic, value}] (value defaults to the label), `items` [{label, pic, dots, say, basket}] where `basket` is a basket's value | yes |
| `feed`    | `n` (how many), or `a` and `b` (the sign shows a + b), optional `animal`, `food` (emoji), `prompt`, `max` (food on the table, default n + 4). The child moves food onto the plate and presses «بفرما!»; after two tries the food on the plate is numbered | yes |
| `pattern` | `seq` (the whole pattern), `blanks` (places to fill, from 0; default the last), `options`, optional `prompt`, `ltr` | yes |

**Animations** (`js/anim.js`). SVG and CSS only, no video. With "reduce motion" on, strokes and scenes appear one by one without movement.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `story`   | A short animated picture story or explanation with play, pause and replay. `cast` {id: emoji or short text such as `"۳ + ۲ = ۵"`}, `scenes` [{`caption`, `say`, `audio`, `at`}] where `at` is {id: [x, y] or [x, y, {size, flip, act}] or `null` to hide}; x and y are percentages of the stage from the top left, an actor stays where it is until a scene moves it, and `act` is `bounce`, `spin`, `grow` or `shake`. Captions are read aloud. Optional `prompt`, `bg` (a drawn backdrop: `meadow` (the default), `garden`, `night`, `room`, `bedroom`, `kitchen`, `school`, `sea`, `street`, `snow`, `sky`; or any CSS background; a scene's own `bg` changes it from that scene on), `tall`, and `question`, `options`, `answer`, `pic` to ask about the story at the end | only with `question` |
| `scene`   | An animated explanation where the drawing really does what the words say (`js/scene.js`, drawings in `js/art/rig.js`). `parts` {id: {`art` (a drawing in `B.RIG` or an emoji), `at` [x, y] on a 160 × 90 stage, `s`, `sx`, `sy`, `r`, `o`, `flip`, `under` (inside another part, so it moves with it)}}; `scenes` [{`caption`, `say`, `audio`, `hold`, `key`, `do` [tracks], `wait`}]. Tracks run at once or one after another (`at`, `dur` in ms): move, turn, squash or fade (`to` {x, y, s, sx, sy, r, o}, `"+3"` for a change, `times`, `yoyo`), follow a `path`, `draw` lines like a pencil, `emit` bubbles, drops or sparks, `count` a number, move the `cam` (the world can be wider than the stage: pan along it to travel), or `walk` a person there (legs and arms swing; `walker` in `js/art/rig.js` is a child or grown-up seen from the side, set by `look`). People emoji (👧 👦 👩 👨 👵 👴, cooks, teachers, doctors…) are drawn as full-body walkers in a scene (the emoji pictures are head-and-shoulders portraits for cards), grown-ups bigger; `look` changes them and `flip` turns them to face left. Whether a woman or girl wears a headscarf is chosen by chance, more often without (`hair: "auto"` with `kind`; `B.headscarf` in `js/art/rig.js`, STYLE.md rule 6). A part's `depth` makes scenery slide by more slowly as the camera moves (0 the sky, 0.3 far hills, 1 the street). Every time is stretched by `B.SCENE_PACE` (1.3), each scene rests a moment before the next, and none moves on while its caption is still being said. Pieces inside a drawing (`data-part`) are tracks too: `"tap.handle"`. `wait` lets the child do it: `{rub: true, n, hint, each}` (rub back and forth) or `{tap: [ids], hint, each, counter, inOrder}` (tap each thing once, to count or pick them; `"$"` in `each` is the part just tapped; `counter` shows how many). With "reduce motion" each scene shows its end picture. Use it whenever a caption names an action; `story` only moves whole pictures. Check every scene in `tools/storyboard.html` | only with `question` |

**Pictures** (`js/art.js`, `js/art/*.js`). Lessons name every picture with an emoji (`pic: "🍎"`, `thing: "🐟"`, a
story's `cast`). When a hand-drawn SVG exists for that emoji, it is shown instead, everywhere: cards, tiles, options,
baskets, maps, story actors, lesson cards. An emoji with no drawing simply stays an emoji, so a lesson never needs to
wait for a drawing. Skin-tone emoji (`👧🏿`) use the same drawing with that skin colour. In stories, drawings blink,
sway and walk from place to place. To add a drawing, add the emoji to `B.addArt({…})` in the right `js/art/*.js` file,
following the style written at the top of `js/art.js`, and check it in `tools/art-preview.html`.

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

**Calm and feelings** (`js/steps/feel.js`, used by «احساس‌های من»). Never scored, and nothing the child chooses is
stored: there is no right or wrong about a feeling. Every prompt is said aloud, for children who cannot read yet.
`practice: true` on `pairs`, `order` or `sort` plays the same game as practice, never scored. `talk` takes optional
`tips` (lines for the grown-up, instead of the general reading tips) and then also says its caption aloud.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `breathe` | with `pattern` [in, hold, out, hold] in seconds (e.g. `[4, 4, 4, 4]`) and `cycles`: box breathing, a dot going round a square while the seconds are counted; optional `prompt` | no |
| `body`    | Tap where on a body outline you feel it (head, throat, chest, tummy, hands, legs; several can be chosen). Optional `prompt`, `pic` (the feeling's face), `notes` {part: line said when it is tapped} | no |
| `ground`  | The 5-4-3-2-1 grounding exercise (5 things I see, 4 I hear, 3 I touch, 2 I smell, 1 slow breath), one sense at a time, no timer; the child taps a circle for each thing named. Optional `prompt` | no |
| `meter`   | How big is the feeling: five levels from «یک ذره» to «خیلی زیاد». Optional `prompt`, `pic`, `replies` (a line for each level; the last is used for the levels above) | no |
| `relax`   | Tense and let go, part by part: `parts` [{pic, tense, release}], optional `prompt`. The child presses «آماده‌ام», squeezes while four is counted, then lets go | no |

`forparents` (`js/steps/health.js`) takes optional `guide` (a section of `guide.html`, e.g. `feelings`) and
`guideLabel` for its link.

**Lessons in English.** English is taught as a second language: any lesson outside Persian reading (`read`) and the
English course (`english`) can be played in English when it has an English version in `js/en/<subject>.js`:
`B.EN["<lesson id>"] = { title, steps: [ … ] }`, with only the words (prompts, captions, questions, labels, names),
steps and lists matched by position (`{}` leaves a step as it is). Numbers, pictures and answers come from the Persian
lesson; Persian digits and «؟» become 0–9 and "?". The player's own words in English are in `js/en/strings.js`
(`B.T_EN`, same keys as `js/strings.js`). The «🔤 English» button appears in the lesson bar, the choice is kept per
child (`lessonLang`), and progress is shared with the Persian lesson. See `CURRICULUM.md`, "Lessons in English".

**English** (`js/steps/english.js`). English is spoken with the device's English voice (`B.speakEn` in
`js/english-voice.js`; any text written only in Latin letters that goes through `B.speak` is spoken in English too) and
written left to right. Steps of English lessons carry `en: true` (set in `js/lessons/english.js`), so the games and
`story` above also mark their English text `lang="en" dir="ltr"`.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `words`   | `words` [{pic or color or dots, en, audio}]: tap each picture to hear it and say it aloud; optional `show` (write the word, from Sprout on), `prompt` | no |
| `listen`  | `say` (English to hear, or `audio`), `options` (emoji, or {pic or color or dots, label, en, value}), `answer` (the option's value: its pic, color, dots or label by default), optional `prompt`, `quiet` (don't repeat the Persian question), `show` (a letter, word or picture shown above). Options with `en` say it when tapped; with no `say`, their words are read out. A picture of where something is: `{pic, ref, where}` (`where`: `in`, `on`, `under`, `next to`; e.g. 🐱 on 📦), as an option (its value is `where`), in `words`, or as `show` | yes |
| `letter`  | `letter` (one letter, or two with one sound: `"sh"`), `words` [{pic, en}] starting with its sound, optional `like` (a Persian letter with a similar sound), `say`, `audio` (a recording of the sound), `end: true` (the words end with it instead, for x: box, fox) | no |
| `tip`     | `text`: how parents can practise at home, even without knowing English; optional `pic` | no |

Any step can take `audio: "audio/file.mp3"` to play a recording instead of the device voice.

**Reading** (`js/steps/reading.js`, used by فارسی). `clap` comes before letters (Seed): everything is heard, the word is
said aloud and shown as a picture. `readaloud` is for children who already read.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `clap`    | `word` (said aloud), `parts` (its syllables), optional `pic`, `prompt`, `say`, `audio`. The child taps 👏 once per syllable and presses «تمام شد»; a wrong count is never marked wrong: the word is clapped together, one dot lighting for each part as it is said, and the child tries once more | no |
| `readaloud` | Fluency, for readers (Sapling): `text` (a short decodable passage), optional `pic`, `prompt`. The child reads aloud while the parent taps the words that were hard; then the hard words are shown on their own (tap one to hear it), the child reads the whole passage again, and the parent taps the hard words that went well this time. Accuracy only: no timer, nothing is stored | no |

**Science** (`js/steps/science.js`). Inquiry steps: the child guesses, tries and sees.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `test`    | `kind` (`float`: a basin of water, or `magnet`), `items` [{pic, say, yes}] where `yes` means it floats / the magnet pulls it, optional `prompt`, `ask`, `yesLabel`, `noLabel`, `yesSaw`, `noSaw`. The child guesses, then watches it happen; guesses are never marked wrong | no |
| `shadow`  | Drag the sun (or use the buttons or arrow keys) and watch a tree's shadow. `tasks` [{prompt, want}] where `want` is `short`, `long`, `left` or `right`; optional `thing`, `prompt`, and `question`, `options`, `answer`, `pic` asked at the end | only with `question` |
| `home`    | A safe experiment for home, written for the parent: `pic`, `text` (one line for the child, read aloud), `need` [things], `steps` [what to do], optional `ask` (a question for the child), `title` and `note` (replace the experiment heading and safety line, for home activities in other subjects) | no |

**Iran and the world** (`js/steps/world.js`). Maps seen from above, drawn with inline SVG. Same rules as the games: no
timers or points, a gentle bounce on a miss, the answer shown after two misses; tap a place, drag the 📍 (or the walker)
under the map onto it, or Tab and Enter. Outline maps (`js/maps/`) are Natural Earth's de facto borders; neighbouring
countries are plain shapes with no names, and names are the ones Iranian schools use (`CURRICULUM.md`, "Neutrality and safety").

| Step type | Fields | Scored |
|-----------|--------|--------|
| `map`     | `map`: an object or the name of a shared map in `B.MAPS` (picture maps `room`, `home`, `street` are in `js/lessons/world.js`): `{ view: [w, h] (viewBox, default [400, 300]), bg, shapes: [{ rect: [x, y, w, h], r } or { circle: [cx, cy, r] } or { d } (SVG path), with `kind` (floor, wall, rug, wood, road, line, block, park, grass, water, sand, land: CSS class `map-<kind>`)], deco: [{ pic, at, size }], places: [{ id, name, pic, at: [x, y], size, say, d, kind }] }`. A place has an emoji (`pic`) or an outline (`d`, e.g. a province, coloured by `kind`), or both; `at` is where its picture and ring go, and `name` (or `say`) is said when it is tapped. `tasks`: `[{ find: id, prompt, say }]` (tap the place) or `[{ route: [id, …], prompt, say, walker }]` (start at the first place and tap the others in order; the walker emoji walks there). With no `tasks`, the child taps every place to hear its name. Optional `prompt`, `say`, `labels: true` (names written under places, for readers), `enough: n` (with no `tasks`: «بعدی» after n places). Places and legend items take `en` (the English name). **Symbol maps:** `legend: [{ pic, name, en }]` on the map (e.g. 🟢 = trees), shown under it; tapping an item says it. **The map of Iran** (`map: "iran"`, `js/maps/iran.js`): `layers` `["iran", "seas"]` (the default: all of Iran is one place, plus the three seas) or `["provinces", …]` (each province is a place); `cities: ["tehran", …]` or `"centres"` marks cities to tap. A task `{ mine: true, prompt, say }` asks for the child's own province: any province is right, its centre is named, nothing is stored, and «نمی‌دانم» goes on | yes, unless there are no `tasks` |
| `compass` | Turn to north, south, east or west: a child seen from above in a yard, north at the top and east on the right (like a map). `tasks: [{ face: "n" \| "e" \| "s" \| "w", prompt, say, sun }]`: tap that side or press an arrow key; `sun` is `rise` (east), `noon` (south) or `set` (west) and draws the sun on its side. Optional `prompt`, `say`, `hide: true` (only north is written, as on a compass). A wrong side says its name; the right one is shown after two misses | yes |

**Writing on paper** (`js/steps/paper.js`, any subject). For writing longer than a letter or a word, done away from
the screen: the child hears the task, sees an example, writes on paper or in an exercise book and shows it to a parent,
who ticks a short checklist. Not scored; the ticks are not kept (only that the lesson was done, as for every lesson).

| Step type | Fields | Scored |
|-----------|--------|--------|
| `paper`   | `text` (the task, read aloud), `check` [questions for the parent, e.g. «با حرف بزرگ شروع کرده؟»], optional `example` (the model, e.g. `"I like apples."`), `lang` (`"en"` or `"fa"`: the language written, and so its direction; by default English when `example` has only Latin letters), `pic`, `say`, `audio`, `note` (instead of the general line for the parent). «نوشتم!» and «بعداً می‌نویسم» both go on | no |

**Fractions and graphs** (`js/steps/numbers.js`, used by ریاضی, and by علوم and «ایران و جهان» for graphs). Same rules as
the games: no timers or points, a gentle bounce on a miss, the answer shown after two misses; tap, drag, or Tab and Enter.

| Step type  | Fields | Scored |
|------------|--------|--------|
| `fraction` | `shape` (`circle`, `square`, `rect` (a bar), `bread` (a sangak); default circle), `parts` (equal parts, default 2), then one of: `take` (the child colours that many parts and presses «تمام شد»); `ask: "name"` with `take` parts coloured, `options` (strings, or `{frac: [1, 4]}` written as a fraction) and `answer`; `ask: "equal"` (or `"unequal"`) with `shapes` [{`shape`, `cuts`} or {`shape`, `parts`}]: tap the one cut into equal parts (`cuts` are places from 0 to 1: across a long shape from the left, or turns of a circle from the top, so `[0, 0.5]` halves a circle); `cut: true`: the child cuts into `parts` equal parts by tapping dotted lines (`grid`: how many places to cut, default 2 × parts); `set` (a number of things, `thing` emoji) shared equally between `parts` children (`who`: their emoji), with optional `result` said at the end («نصف ۸ می‌شود ۴.»). Optional `prompt`, `say`, `pic` | yes |
| `chart`    | `rows` [{`label`, `pic`, `n`, `has`}]: one column per row, `n` pictures high. Optional `title`, `prompt`, `say`, `max` (the height), `bars: true` (a bar chart with a number scale), then: `question`, `options` (numbers, or {label, value}), `answer` (read the graph); or `make: true` (the pictures are in a pile; the child puts each in its column, a wrong column bounces) or `add: true` (+ and − under each column until each has `n`, starting from `has`; the prompt says what to add), each optionally followed by the `question` | yes |

**Time and mass** (`js/steps/measure.js`, used by ریاضی; the balance later by علوم too). Same rules as the games: no
timers or points, a gentle bounce on a miss, the answer shown after two misses; tap, drag, or the keyboard.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `clock`   | A clock face with a short and a long hand, geared like a real clock (at half past three the short hand is between ۳ and ۴). Times are written `"h:mm"` (`"3:00"`, `"9:30"`) and said as «ساعت ۳ و نیم». `ask: "read"` (the default with `options`): `time` and `options` (times), choose what it shows; `ask: "set"` (the default with `time`): the child sets the hands to `time`, from `start` (default `"12:00"`), and presses «درست شد» (a miss names the hand to look at; after two the hands turn to the time); `ask: "explore"` (the default with no `time`): turn the hands and hear the time; `ask: "show"`: the clock shows `start`, then both hands turn on to `time` while the child watches, with a replay button (to explain, not scored). Hands are moved by dragging them, the round-arrow buttons, or the arrow keys on a hand. Optional `prompt`, `say`, `pic` (what happens at that time), `snap` (minutes the long hand moves by, default 15; 5 to read minutes) | yes, unless `explore` or `show` |
| `balance` | A two-pan balance that tips towards the heavier side. Things are numbers (a weight of that mass, labelled with `unit`, default کیلو; `""` for none) or {`pic`, `mass`, `label`, `say`} (`label` is written on the thing: `"؟"` for an unknown). `left`, `right` (on the pans at the start), `tray` (things the child can put on), `open` (`left`, `right` or `both`, default both: where the child may put things). `ask`: `heavier` or `lighter` (tap that pan; `held: true` keeps it level until the answer, so the weights are added up, not seen), `balance` (the default with a `tray`: put things on until it is level; putting something on the lighter pan that tips it past level is a miss; taking things off never is, and after two the things move by themselves into a way that balances) or `explore` (not scored). Optional `prompt`, `say`, and `question`, `options`, `answer`, `pic`, asked once it balances | yes, unless `explore` |

**Adding a step type or a subject.** A new file can add step types with `B.engine.steps.mytype = function (s, box, done) { … }`
(call `done(scored, firstTry)` at the end; `B.engine` also shares `choice`, `speakBtn`, `nextBtn`, `doneButton`, `pick`, `nums`).
A new subject gets its own `js/lessons/<id>.js` that does `B.SUBJECTS.push({ id, name, emoji, leveled })` and
`B.LESSONS.push(…)`. Load new files in `index.html` and `browse.html` (step files after `js/anim.js`, lesson files after the other lesson
files) and list them in `FILES` in `sw.js`. New phrases go in `js/strings.js`, new styles at the end of `css/style.css`.

A lesson counts as mastered when ≥ 80% of scored steps are right on the first try. Mastered lessons come back
for review after 1, 3, 7, 14 and 30 days.

After changing a reading lesson, run `node tools/check-reading.js`: every word the child decodes must use only letters taught
in earlier lessons (new letters go in its `TEACHES` table).

To review lessons, open `browse.html`: it lists every built and planned lesson by subject and garden, shows each
step's data (answers highlighted, the English version beside the Persian one), and plays any lesson from any step
without touching children's progress. New lesson and step files are loaded in `browse.html` too (`tools/check-plan.js`
reports any that are missing).

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
