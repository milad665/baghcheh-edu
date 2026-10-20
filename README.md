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
CURRICULUM.md       the content plan: depth, sizing, the scope-and-sequence format, content and step types
curriculum/*.md     each subject's scope and sequence: objectives per garden, lessons, practice generators
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
js/maps/*.js        outline maps for the map step, from Natural Earth (iran.js: provinces, seas, cities; iran-relief.js;
                    region.js: Iran's neighbours; world.js: continents, oceans, countries), and flags.js (public-domain flags)
js/en/*.js          the same lessons in English (English as a second language), one file per subject
js/english-mode.js  plays a lesson in English: the «🔤 English» switch in the lesson bar
js/engine.js        lesson player and the basic step types
js/games.js         game step types (pairs, build, order, sort, feed, pattern)
js/anim.js          animated steps: how a letter is written, picture stories (story)
js/art.js           pictures: shows a hand-drawn SVG in place of an emoji wherever lessons use one
js/art/*.js         the drawings, by group (people, feelings, animals, food, nature, home, things), and story backdrops (scenes.js)
js/strokes.js       stroke order of every letter (source: Iran's first-grade writing book), hamza, joined forms and whole words, the digits ۰–۹, Latin a–z and A–Z, and pre-writing paths, as SVG paths
js/app.js           routing and screens
js/practice.js      practice generators: registry, seeded random, what the child has met, short sessions, missed items back
js/practice/*.js    each subject's practice generators (read.js also holds B.READ_TEACHES: the letters each reading lesson teaches)
js/browse.js        the content browser (browse.html); shows planned lessons too when CURRICULUM.md is served
sw.js               offline cache
tools/check-reading.js  checks reading lessons use only letters taught so far (node)
tools/check-plan.js     checks the lessons match CURRICULUM.md (node)
tools/storyboard.html   every animation as still pictures with their captions, to check they match (open from the site)
tools/build-iran-map.js makes js/maps/iran.js and iran-relief.js from Natural Earth and NOAA's ETOPO1 (node + mapshaper; only when the map data changes)
tools/build-world-map.js makes js/maps/region.js and world.js from Natural Earth (node + mapshaper)
tools/build-flags.js    makes js/maps/flags.js from public-domain SVG flags (node + svgo)
tools/strokes-preview.html  every model in js/strokes.js with numbered strokes and arrows, to check by eye
tools/art-preview.html  every drawing and backdrop, and the emoji in lessons that have no drawing yet
audio/  fonts/      optional recorded audio / self-hosted Baloo Bhaijaan 2 font
js/recess.js        «زنگ تفریح» (recess): the catalog of games (B.GAMES), the recess page, games in the garden's path,
                    the parent's daily recess time
games/<id>/index.html   the recess games, one self-contained page each (Persian only)
games/shared/       what the games share: profile.js (the child playing, progress per child, play time and the break
                    reminder), lines.js (every spoken line), voice.js, kit.js, kit.css, saved.js (photos and drawings
                    in the child's own IndexedDB), robot.js
audio/games/        the games' recorded Persian lines, one mp3 per line in games/shared/lines.js
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

Start from `CURRICULUM.md` and the subject's file in `curriculum/`: they list every objective and every planned lesson
with its id, garden, order, what it covers, the objectives it teaches and the content types it uses. Change the plan in the same commit as the lesson, then run `node tools/check-plan.js`.

Lessons are plain data in `js/lessons/<subject>.js`, one file per subject, each pushing into `B.LESSONS`. Each has `id`, `subject` (`read` | `math` | `feel`),
`level` (`seed` | `sprout` | `sapling` | `tree` | `forest`, or `null` for every level), `emoji`, `title` and `steps`.

| Step type  | Fields | Scored |
|------------|--------|--------|
| `intro`    | `letter`, `text`, `say`, `forms` [[form, label]], `example` {pic, word}, optional `write` (the letter to animate when `letter` is not a plain letter, e.g. `"او"` → `"و"`). Letters in `js/strokes.js` are shown being written, stroke by stroke | no |
| `choose`   | `prompt`, `options` (strings or {label, value}), `answer`, optional `show`, `say`, `pic`, `ltr` (`show` is a math expression, drawn left to right) | yes |
| `trace`    | `letter`, `prompt`, optional `say` (spoken, with a listen button). The child writes over the handwriting model from `js/strokes.js`, which is first shown being written. `letter` can be a Persian letter, a Persian digit (`"۵"`) or a Latin letter (`"a"`, `"A"`: drawn left to right, with the midline and top line of an English exercise book), or a joined form or whole word that has a model in `js/strokes.js` (`"ـبـ"`, `"سیب"`: each joined piece written in one go, dots last; drawn with a thinner model). Instead of `letter`: `path`, a pre-writing path from `B.PATHS` (`down`, `across`, `slant`, `bowl`, `hills`, `wave`, `zigzag`, `circle`), or `strokes`, any list of strokes in the same form as `js/strokes.js` (paths and shapes have no baseline) | no |
| `blend`    | `parts`, `word`, `pic`, `say`. In the English course (`js/steps/english.js`) the parts are written left to right and each is a sound button: tap it to hear its sound (`sounds`: what the English voice says for each part, e.g. `["sss", "ah", "tuh"]`, or `audios`: recordings) | no |
| `passage`  | `text` (a short decodable passage), `question`, `options`, `answer`, optional `pic`; the passage itself is never read aloud | yes |
| `count`    | `thing` (emoji), `n`, `options`. More in `js/steps/numbers.js`: optional `prompt`, `say`, `ask` (the question at the end), `layout` (`line`, `circle`, `scatter`, `rows`: two rows of five), `move: true` (each thing counted moves to a line below, to keep track), `beats: true` (the thing, a drum by default, beats or jumps `n` times while the child counts), `flash` (`true` or ms: `show` is seen for a moment, then covered, and the child says how many without counting; `show`: `dots`, `dice`, `fingers`, `frame` or an emoji; a miss shows it once more, two misses leave it open), `show` without `flash` (the picture stays, and the child says how many; also `tally`: tally marks in fives), `optDots: true` (each answer shows its dots under the number); options may also be `{fingers}` or `{dots}` | yes |
| `tenframe` | `n` (up to 20: two frames), `options`, optional `prompt`, `missing` (asks how many make ten), `plus` or `minus` (shows `n + plus` in two colours, or crosses out `minus`) | yes |
| `make`     | `n` (child builds n in one or two ten-frames) | yes |
| `numline`  | `a`, `b` (negative to subtract), `options`, optional `thing`, `prompt` and `say` (the question in words instead of the sum «۴ + ۱ = ؟», for children who do not write sums yet) | yes |
| `tens`     | `n` and `options` (read a number from bundles of ten and loose sticks; above 100 also packs of a hundred, above 1,000 boxes of a thousand), optional `b` (add, or take away when negative; a bundle, pack or box is opened when needed, and the child is told), or `build: true` (child builds n; ten sticks tie into a bundle, ten bundles into a pack, ten packs into a box), optional `prompt`, `hundreds` (`true`: packs of a hundred for 100 and below too; `false`: bundles only), `thousands: true` | yes |
| `compare`  | `a`, `b`, `ask` (`more` \| `less` \| `symbol` for < = >), optional `pic: "tens"` (bundles, and packs of a hundred above 100) or `thing` (emoji). `match: true` (`js/steps/numbers.js`): `a` of `thing` in a row and `b` of `thing2` below (`spread`: `wide` or `tight`); the child taps each one below and it goes under the next one above, one to one; then which group has more (`ask: "more"`) or fewer (`"less"`), or the same. Optional `big: "a"` or `"b"` (that group drawn bigger: big is not more), `names`, `prompt`, `say` | yes |
| `shape`    | `prompt`, then `show` (a shape id, or a list of ids to name them with no question), `options` (shape ids, numbers or {label, value}), `answer`. Shapes: circle, square, triangle, rectangle, plus `-tilt` / `-tall` variants, `rectangle-thin`, `square-small`, `triangle-thin`, `triangle-small`, `triangle-down`, and two that are not triangles: `opentri` (open) and `curvetri` (a curved side) | yes, unless `show` is a list |
| `measure`  | `bars` [{thing, len}], `ask` (`longer` \| `shorter`, or `count` with `unit` emoji, `prompt`, `options`). Or `tool` (`ruler` in cm, `jug` in ml, `thermometer` in °C; `js/steps/measure.js`) with `value`: `ask: "read"` (with `options`) or `"set"` (raise or lower the level to `value` with arrows, drag or keys, then «درست شد»); optional `min`, `max`, `step` (numbered marks), `snap`, `unit`, `pic` (the thing on the ruler), `prompt`, `say` | yes |
| `money`    | `prompt`, optional `items` [{emoji, name, price}], then `bills` + `options` (+ `answer` if not the sum), or `wallet` (child pays the exact total). Amounts are in thousands of toman | yes |
| `talk`     | `scene`, `caption` (dialogic-reading prompts for the grown-up) | no |
| `breathe`  | `cycles` | no |
| `feelings` | (no fields; the answer is never stored) | no |

**Games** (`js/games.js`). The game is the skill itself, never a reward added on top. No timers, points or losing:
a wrong move bounces back with a gentle word, and after two misses on the same thing the right answer is shown.
Everything works by tapping (mouse, touch, or Tab and Enter on a keyboard), and dragging works too. A game is right
on the first try when there were no misses. Things on cards and tiles ("faces") can be a string (letter, word or
emoji), a number (shown in Persian digits), or `{label, pic, dots, say}`: a word or number, a picture, a number of
dots to count, and the words said aloud when it is tapped (used for pictures). Also `size` (the picture bigger or smaller,
to order things by size), `bar` (a strip that many units long), `shape` (a shape id from the `shape` step), and
`fingers` or `dice` (hands or a die face showing that number), and `flag` (a country's flag, `"fr"`, from
`js/maps/flags.js`; `"iran"` is the flag the parent chose, or an empty flag that asks the child to ask a parent).

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
| `scene`   | An animated explanation where the drawing really does what the words say (`js/scene.js`, drawings in `js/art/rig.js`). `parts` {id: {`art` (a drawing in `B.RIG` or an emoji), `at` [x, y] on a 160 × 90 stage, `s`, `sx`, `sy`, `r`, `o`, `flip`, `under` (inside another part, so it moves with it)}}; `scenes` [{`caption`, `say`, `audio`, `hold`, `key`, `do` [tracks], `wait`}]. Tracks run at once or one after another (`at`, `dur` in ms): move, turn, squash or fade (`to` {x, y, s, sx, sy, r, o}, `"+3"` for a change, `times`, `yoyo`), follow a `path`, `draw` lines like a pencil, `emit` bubbles, drops or sparks, `count` a number, move the `cam` (the world can be wider than the stage: pan along it to travel), or `walk` a person there (legs and arms swing; `walker` in `js/art/rig.js` is a child or grown-up seen from the side, set by `look`). People emoji (👧 👦 👩 👨 👵 👴, cooks, teachers, doctors…) are drawn as full-body walkers in a scene (the emoji pictures are head-and-shoulders portraits for cards), grown-ups bigger; `look` changes them and `flip` turns them to face left. Whether a woman or girl wears a headscarf is chosen by chance, more often without (`hair: "auto"` with `kind`; `B.headscarf` in `js/art/rig.js`, STYLE.md rule 6). A part's `depth` makes scenery slide by more slowly as the camera moves (0 the sky, 0.3 far hills, 1 the street). Every time is stretched by `B.SCENE_PACE` (1.3), each scene rests a moment before the next, and none moves on while its caption is still being said. Pieces inside a drawing (`data-part`) are tracks too: `"tap.handle"`. `wait` lets the child do it: `{rub: true, n, hint, each}` (rub back and forth) or `{tap: [ids], hint, each, counter, inOrder}` (tap each thing once, to count or pick them; `"$"` in `each` is the part just tapped; `counter` shows how many), or `{choose: [lines], answer, hint, each}` (choose what to say, for `dialogue`). With "reduce motion" each scene shows its end picture. Use it whenever a caption names an action; `story` only moves whole pictures. Check every scene in `tools/storyboard.html` | only with `question` |

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
| `code`      | `goal` [x, y], optional `start` [x, y] (default [0, 0]), `size` [columns, rows] (default [5, 5]), `walls` [[x, y], …] (x from the left, y from the top, from 0), `blocks` (`"arrows"`: up, down, left, right; or `"turn"`: forward, turn right, turn left, with `face` up \| down \| left \| right for the way the character looks at the start), `repeat: true` (adds a repeat block; tap its count to change it, 2 to 5), `max` (most blocks the program may use, to ask for a repeat), `given` (a program to fix, e.g. `["right", {repeat: 3, body: ["up"]}]`; runs before the child changes it don't count as tries), `hero`, `goalPic`, `wall` (emoji), `prompt`, `say`. Right on the first try when the first run reaches the goal. More, each only when the step asks for it (Tree garden): `until` (`"goal"`, `"wall"` or `"count"`: a "repeat until" box; in `given`: `{until: "goal", body}`), `if` (`"wall"`, `"open"` or `"apple"`: an "if … else" box with two strips; `{if: "wall", body, else}`), `nest: true` (boxes inside boxes), `fn: true` (a new block ⭐ built in its own strip and used in the program; `fnGiven`), `pick: true` and `apples` [[x, y]…] (pick up apples), `counter: true` ("counter = 0" and "counter + 1" blocks, the counter shown) with `target` (pick that many and count them right), `step: true` (a "next step" button that runs one block at a time and shows the state), `boards` [{start, goal, walls, face, apples}…] (one program must solve every board), `limit` (most blocks a run may do, default 80, so a repeat that never ends is caught) | yes |
| `binary`    | Dot cards 16, 8, 4, 2, 1 (`cards`: how many). `target` (flip cards to make it; `bits: true` shows 1 or 0 under each card, `sum: true` the total), or `mode: "read"` with `bits` ("10110") and `options` | yes |
| `logicgrid` | A logic grid: `rows` and `cols` [{pic, label}], `clues`, `answer` (each row's column), optional `given` marks; tapping cycles empty, ✗, ✓. Or a sudoku: `sudoku` (rows such as `"1 . . 4"`) and `solution` | yes |
| `flowchart` | `nodes` [{id, kind: start \| do \| ask \| end, text, next, yes, no}] drawn top to bottom. `mode: "follow"` (default): the child walks through it, answering each question by the facts in `visits` [{answer, fact}]; `mode: "fill"`: nodes with `blank: true` are filled from `options` | yes |
| `turtle`    | A pen that draws: blocks forward (a length), turn right or left (an angle), pen up and down, repeat (nested). `goal` (a program whose shape is shown faint, e.g. `[{repeat: 4, body: [["fd", 60], ["rt", 90]]}]`), optional `lengths`, `angles`, `blocks`, `max`, `given`, `start` | yes (no `goal`: not scored) |
| `train`     | Teach a program by examples: `labels` (two kinds), `examples` [{pic, label, f}] that the child labels (or `trained`, already taught, some `wrong`), `tests` [{pic, f}] that it guesses by the nearest taught example; then `question`, `options`, `answer` | yes |
| `type`      | Touch typing: `lang` (`"fa"` or `"en"`), `words`; the next key and its finger are lit; real keys (any layout, matched by place) or on-screen keys | no |
| `stage`     | Events, like ScratchJr: `sprites` [{id, pic, name, at, light}], `blocks` (say, move, back, jump, wait, light), `lines` (what can be said), optional `given` (scripts to remix), `need` [{sprite, event, op, arg, hint}] (what the finished program must have; it must also be run once). Without `need` it is a free project | yes (with `need`) |
| `pycode`    | Python (`js/steps/python.js`): `given` (starting code), `tests` [{inputs, out}] (out = what print() writes), or `expect` / `minLines` / `vars`; `inputs` (for «اجرا»), `snippets`, `blocks` (the program as blocks beside it), `turtle` with `goal`; `mode: "predict"` with `options`, `answer` | yes |
| `sheet`     | A spreadsheet: `cols`, `rows`, `cells` (`"=SUM(B2:B8)"` …), `editable`, `tasks` [{cell, value, fn}] or [{sorted}], `sortCol`, `chart` {labels, values} | yes |
| `graph`     | `nodes` [{id, x, y, label}], `edges` [[a, b, length]]; `mode` "path" (`from`, `to`: a shortest way), "tree" (least road joining all), "color" (`colors`) | yes |
| `gates`     | `gate` AND, OR, NOT, XOR or "half" (half adder): flip switches, fill the truth table; `mode: "pick"` with `want` and `choices` | yes |
| `pixels`    | A picture made of numbered squares (`js/steps/thinking.js`). `mode: "rgb"` with `target` [r, g, b]: mix red, green and blue light to match a colour. `colors` (the palette by number, `"#ffffff"` for 0…), optional `names` (said and shown on the palette), `pic` (the code: one string of digits per row, read left to right). `mode: "paint"` (the default): the code is shown as a grid of numbers beside an empty grid; the child picks a colour, taps squares, then checks (after two checks that miss, the wrong squares are marked; `done` [rows] are already painted). `mode: "read"`: the picture with one row marked (`row`), and `options` (codes) for that row | yes |
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
| `feelings` | The check-in: tap a face, hear a kind line back; nothing stored. Optional `faces` (`"all"`: the 13 feelings and «نمی‌دانم», or a list of ids from `B.T.feelingFaces`: happy, sad, angry, worried, scared, calm, shy, excited, disappointed, jealous, proud, missing, bored, tired, unsure), `replies` {id: line said after that face}, `offer` {id: a calm step such as `{type: "breathe", cycles: 3}`}: after that face the child is asked «می‌خواهی با هم آرام شویم؟» and, on yes, the step plays; `prompt`. Without these it is the six-face check-in | no |
| `menu`    | The child picks one thing to do: `items` [{pic, label, say, step}], optional `prompt`; the chosen step then plays in its place (a calm tool, a game). Not scored itself | no (its step may be) |

**Health** (`js/steps/health.js`, used by سلامت و ایمنی). Never scored.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `doit`    | `text`, optional `pic`, `list` (short lines, e.g. the moves of a movement break), `say`: the child does something real away from the screen, then taps «انجام دادم!» | no |
| `move`    | A guided movement routine, one move at a time: a jointed person from `js/art/rig-health.js` shows it, and after «شروع» it is done `times` times, counted aloud at a calm pace (a count, never a timer); a rest with one slow breath between moves, and the child goes on when ready. `moves` [{`name`, `say`, `part` (`warm` \| `calm`), `art` (default `h-girl-front`), `a`, `b` (the two poses, as for `B.hpose`), `sink` (how far down the person is at `a`, for a crouch), `hop`, `step`, `times` (default 8), `pace` (ms for one time, default 1800), `easier`, `harder` ({`say`, `times`, `a`, `b`, `hop`, `pace`}: what changes)}], optional `prompt`, `art`, `beat` (beats a minute: one time per beat with a soft tick, e.g. 110 for hands-only CPR), `rest: false`. Ends with «انجام دادم!» | no |
| `forparents` | `tips` (lines), optional `text` (said to the child first), `pic`, `guide`, `guideLabel` | no |

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
| `words`   | `words` [{pic or color or dots, en, audio}]: tap each picture to hear it and say it aloud; optional `show` (write the word, from Sprout on), `prompt`. A picture can be drawn bigger or smaller (`scale: 1.5`) or stretched (`scale: [1.6, 1]`), for big, small, long and short; the same in `listen`; `art` (a drawing in `B.RIG`) in place of `pic`, for things with no emoji | no |
| `listen`  | `say` (English to hear, or `audio`: a recording, or an everyday sound from `audio/en/sounds/`, made by `tools/make-en-sounds.js`), `options` (emoji, or {pic or color or dots, label, en, value}), `answer` (the option's value: its pic, color, dots or label by default), optional `prompt`, `quiet` (don't repeat the Persian question), `show` (a letter, word or picture shown above). Options with `en` say it when tapped; with no `say`, their words are read out. A picture of where something is: `{pic, ref, where}` (`where`: `in`, `on`, `under`, `next to`; e.g. 🐱 on 📦), as an option (its value is `where`), in `words`, or as `show` | yes |
| `letter`  | `letter` (one letter, or two with one sound: `"sh"`), `words` [{pic, en}] starting with its sound, optional `like` (a Persian letter with a similar sound), `say`, `audio` (a recording of the sound), `end: true` (the words end with it instead, for x: box, fox), `inside: true` (it is anywhere in the word, for vowel pairs: rain, boat; it is shown in bold where it is); a split vowel is written `"a-e"` (cake, bike, home: the vowel and the final e in bold) | no |
| `record`  | `say` (the model, said by the English voice) or `audio`, optional `example` (the model written on a sheet), `prompt`, `pic` (a picture to talk about), `check` [questions for the parent], `note`. The child records and hears their voice next to the model; the recording stays in memory on the device while the step is open (never stored or sent); without a microphone the child says it to the parent | no |
| `dialogue` | A role play in a `scene`: `parts` (the cast and the place), `you` (the child's character), `lines` [{`who`, `en`, `do` (more tracks), `choose` (wrong lines to choose from: the child's turn), `hint`}]. Each line is said while the speaker's mouth moves; at the child's turn the lines are shown as buttons (`wait: { choose }` in `js/scene.js`), the right one is said and the child says it aloud | yes |
| `tip`     | `text`: how parents can practise at home, even without knowing English; optional `pic` | no |

Any step can take `audio: "audio/file.mp3"` to play a recording instead of the device voice.

**Reading** (`js/steps/reading.js`, used by فارسی). `clap` comes before letters (Seed): everything is heard, the word is
said aloud and shown as a picture. `readaloud` is for children who already read.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `clap`    | `word` (said aloud), `parts` (its syllables), optional `pic`, `prompt`, `say`, `audio`, `sounds: true` (the parts are the word's sounds, for oral segmenting in the English course: one clap per sound, said with the English voice, and the feedback counts sounds), `words: true` (`word` is a short sentence and `parts` its words: one clap per word, and the feedback counts words). The child taps 👏 once per syllable and presses «تمام شد»; a wrong count is never marked wrong: the word is clapped together, one dot lighting for each part as it is said, and the child tries once more | no |
| `boxes`   | Sound boxes (Elkonin boxes): `word` (said aloud), `parts` (its sounds), optional `pic`, `prompt`, `say`, `audio`, `sounds` (what to say for each part). The child taps the counter: one goes into each box in turn and its sound is said, first sound on the right; then the word is said whole. With `letters: true` (and optional `extra`), the child puts each sound's letter into its box instead; a wrong letter bounces and the box's sound is said again, and after two misses the right letter is shown | only with `letters` |
| `mark`    | Tap words in a text to mark them: `text`, `answer` (the words to mark, written as in the text without punctuation), optional `prompt`, `say`, `audio`. A tap again unmarks; «تمام شد» checks: extra marks bounce off and the number still missing is said; after two tries the right words are shown | yes |
| `readaloud` | Fluency, for readers (Sapling): `text` (a short decodable passage), optional `pic`, `prompt`. In the English course the passage is written left to right and a tapped hard word is said in the English voice. The child reads aloud while the parent taps the words that were hard; then the hard words are shown on their own (tap one to hear it), the child reads the whole passage again, and the parent taps the hard words that went well this time. Accuracy only: no timer, nothing is stored | no |

**Science** (`js/steps/science.js`). Inquiry steps: the child guesses, tries and sees.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `test`    | `kind` (`float`: a basin of water, `magnet`, `roll`: a slope, `waterproof`: water poured on it, `dissolve`: put in a glass of water, `absorbs`: put on a puddle, `soaksin`: a heap of sand, soil or clay that water is poured on), `items` [{pic, say, yes}] where `yes` means it floats / the magnet pulls it / it rolls down turning over (otherwise it slides down flat) / it keeps water out / it dissolves / it soaks up the puddle / the water soaks into it, optional `prompt`, `ask`, `yesLabel`, `noLabel`, `yesSaw`, `noSaw`. The child guesses, then watches it happen; guesses are never marked wrong | no |
| `shadow`  | Drag the sun (or use the buttons or arrow keys) and watch a tree's shadow. `tasks` [{prompt, want}] where `want` is `short`, `long`, `left` or `right`; optional `thing`, `prompt`, and `question`, `options`, `answer`, `pic` asked at the end | only with `question` |
| `home`    | A safe experiment for home, written for the parent: `pic`, `text` (one line for the child, read aloud), `need` [things], `steps` [what to do], optional `ask` (a question for the child), `title` and `note` (replace the experiment heading and safety line, for home activities in other subjects) | no |

**Iran and the world** (`js/steps/world.js`). Maps seen from above, drawn with inline SVG. Same rules as the games: no
timers or points, a gentle bounce on a miss, the answer shown after two misses; tap a place, drag the 📍 (or the walker)
under the map onto it, or Tab and Enter. Outline maps (`js/maps/`) are Natural Earth's de facto borders; only a chosen set
of countries has names (disputed areas never do), and names are the ones Iranian schools use (`curriculum/world.md`,
"Neutrality and safety"). Iran's flag is never drawn by a lesson: `flag: "iran"` shows the flag the parent chose in
«بخش والدین» (the current flag or the lion-and-sun flag), or an empty flag with «پرچم ایران را از پدر و مادرت بپرس.».

| Step type | Fields | Scored |
|-----------|--------|--------|
| `map`     | `map`: an object or the name of a shared map in `B.MAPS` (picture maps `room`, `home`, `street`, `toys` (a room from the side), `park`, `village` are in `js/lessons/world.js`): `{ view: [w, h] (viewBox, default [400, 300]), bg, shapes: [{ rect: [x, y, w, h], r } or { circle: [cx, cy, r] } or { d } (SVG path), with `kind` (floor, wall, rug, wood, road, line, block, park, grass, water, sand, land: CSS class `map-<kind>`)], deco: [{ pic, at, size }], places: [{ id, name, pic, at: [x, y], size, say, d, kind }] }`. A place has an emoji (`pic`) or an outline (`d`, e.g. a province, coloured by `kind`), or both; `at` is where its picture and ring go, and `name` (or `say`) is said when it is tapped. `tasks`: `[{ find: id, prompt, say }]` (tap the place) or `[{ route: [id, …], prompt, say, walker }]` (start at the first place and tap the others in order; the walker emoji walks there). With no `tasks`, the child taps every place to hear its name. Optional `prompt`, `say`, `labels: true` (names written under places, for readers), `enough: n` (with no `tasks`: «بعدی» after n places). Places and legend items take `en` (the English name). **Symbol maps:** `legend: [{ pic, name, en }]` on the map (e.g. 🟢 = trees), shown under it; tapping an item says it. **The map of Iran** (`map: "iran"`, `js/maps/iran.js`): `layers` `["iran", "seas"]` (the default: all of Iran is one place, plus the three seas) or `["provinces", …]` (each province is a place); `cities: ["tehran", …]` or `"centres"` marks cities to tap. A task `{ mine: true, prompt, say }` asks for the child's own province: any province is right, its centre is named, nothing is stored, and «نمی‌دانم» goes on. **Relief** (on `map: "iran"`): `layers` with `"relief"` colours Iran by height (lowlands green, then yellow, brown and white for the highest mountains, with a legend; `legend: false` hides it) and `"landforms"` adds the ranges and deserts (`alborz`, `zagros`, `kavir`, `lut`) and peaks (`damavand`, `sabalan`, `dena`, `taftan`) as places. **The region** (`map: "region"`, `js/maps/region.js`) and **the world** (`map: "world"`, `js/maps/world.js`): `layers` from `"countries"` (the region's default, with `"seas"`), `"continents"` (the world's default, with `"oceans"`; ids `asia`, `europe`, `africa`, `north-america`, `south-america`, `oceania`, `antarctica`), `"oceans"` (`pacific`, `atlantic`, `indian`, `arctic`, `southern`), `"seas"` (`caspian`, `persian-gulf`, `oman-sea`, `arabian-sea`, `red-sea`, `mediterranean`, `black-sea`), `"capitals"` (ids `capital-<country>`) and `"equator"`; `countries`: `[ids]` (flag codes: `"iq"`, `"tr"`, …; Iran is `"iran"`), `"neighbours"` (Iran and its neighbours by land and sea) or every named country (the default). `flags: true` puts each country's flag on it, and a task's `flag: "tr"` shows a flag beside the question. **Grid:** `grid: [columns, rows]` draws a grid with letters across the top (الف ب پ …, in English A B C …, from the left like the map) and numbers down the side; tasks `{ cell: [column, row] }` (tap that square) and `{ cellOf: id }` (choose the square a place is in from three); exploring says each place's square. **Scale:** `scale: true` (Iran and the region: a bar of a round number of kilometres), `{ km }`, or on a picture map `{ units, value, unit, en }` (the bar's length in map units, e.g. 10 «متر»); a task `{ distance: [id, id] }` draws the line with a tick at every bar length and the child chooses about how far | yes, unless there are no `tasks` |
| `timeline` | Put pictures and events in place on a timeline; time runs in the reading direction (long ago on the right in Persian, on the left in English). Either `bands: [{ label, en, pic }]` (fuzzy times, oldest first: «خیلی قدیم», «وقتی پدربزرگ و مادربزرگ بچه بودند», «حالا») with items' `band` (from 0), or `years: [from, to]`, `every` (default 10: the line is cut into pieces that long) with items' `year`, and optional `eras: [{ from, to, label, en }]` drawn above. `items: [{ pic, label, en, say, band \| year, row }]`: tap a thing, then its place (or drag it there). Optional `rows: [{ label, en }]` (two lines, such as Iran and the world; an item's `row` from 0), `show: true` (everything already in place, tap to hear; not scored), `prompt`, `say`. A wrong place says its name; the right one is shown after two misses | yes, unless `show` |
| `source`  | Look closely at a picture and talk about it: `pic` (an emoji or drawing) or `img` (a picture file in the site, with `alt`; add it to `FILES` in `sw.js`), `caption` (what and where it is). Three questions one after another, «چه می‌بینی؟»، «چه فکر می‌کنی؟»، «چه سؤالی داری؟» (`more: true` adds «چه کسی آن را ساخته؟ کی؟ چرا؟»); the parent gets ideas for each in a box (`ask: { see, think, wonder, who }`: lists of questions; general ones when there are none). `look: [{ at: [x, y] (percent from the top left), say }]` puts 🔍 spots on the picture: tapping one zooms there and says what to look at; tapping the picture or ＋ and － zooms in and out. Optional `prompt`, `say`, `note` | no |
| `compass` | Turn to north, south, east or west: a child seen from above in a yard, north at the top and east on the right (like a map). `tasks: [{ face: "n" \| "e" \| "s" \| "w", prompt, say, sun }]`: tap that side or press an arrow key; `sun` is `rise` (east), `noon` (south) or `set` (west) and draws the sun on its side. Optional `prompt`, `say`, `hide: true` (only north is written, as on a compass). A wrong side says its name; the right one is shown after two misses | yes |

**Writing on paper** (`js/steps/paper.js`, any subject). For writing longer than a letter or a word, done away from
the screen: the child hears the task, sees an example, writes on paper or in an exercise book and shows it to a parent,
who ticks a short checklist. Not scored; the ticks are not kept (only that the lesson was done, as for every lesson).

| Step type | Fields | Scored |
|-----------|--------|--------|
| `paper`   | `text` (the task, read aloud), `check` [questions for the parent, e.g. «با حرف بزرگ شروع کرده؟»], optional `example` (the model, e.g. `"I like apples."`), `lang` (`"en"` or `"fa"`: the language written, and so its direction; by default English when `example` has only Latin letters), `pic`, `say`, `audio`, `note` (instead of the general line for the parent). «نوشتم!» and «بعداً می‌نویسم» both go on | no |

**Fractions, graphs and number games** (`js/steps/numbers.js`, used by ریاضی, and by علوم and «ایران و جهان» for graphs). Same rules as
the games: no timers or points, a gentle bounce on a miss, the answer shown after two misses; tap, drag, or Tab and Enter.

| Step type  | Fields | Scored |
|------------|--------|--------|
| `fraction` | `shape` (`circle`, `square`, `rect` (a bar), `bread` (a sangak); default circle), `parts` (equal parts, default 2), then one of: `take` (the child colours that many parts and presses «تمام شد»); `ask: "name"` with `take` parts coloured, `options` (strings, or `{frac: [1, 4]}` written as a fraction) and `answer`; `ask: "equal"` (or `"unequal"`) with `shapes` [{`shape`, `cuts`} or {`shape`, `parts`}]: tap the one cut into equal parts (`cuts` are places from 0 to 1: across a long shape from the left, or turns of a circle from the top, so `[0, 0.5]` halves a circle); `cut: true`: the child cuts into `parts` equal parts by tapping dotted lines (`grid`: how many places to cut, default 2 × parts); `set` (a number of things, `thing` emoji) shared equally between `parts` children (`who`: their emoji), with optional `result` said at the end («نصف ۸ می‌شود ۴.»). Optional `prompt`, `say`, `pic` | yes |
| `chart`    | `rows` [{`label`, `pic`, `n`, `has`}]: one column per row, `n` pictures high. Optional `title`, `prompt`, `say`, `max` (the height), `bars: true` (a bar chart with a number scale), then: `question`, `options` (numbers, or {label, value}), `answer` (read the graph); or `make: true` (the pictures are in a pile; the child puts each in its column, a wrong column bounces) or `add: true` (+ and − under each column until each has `n`, starting from `has`; the prompt says what to add), each optionally followed by the `question` | yes |
| `track`    | A number board game (Siegler & Ramani): a straight track of squares 1 … `to` (10 or 20, left to right). The child rolls the die, moves the pawn by tapping the next square once for each point (each number is said as the pawn lands), then says which number it reached. Optional `start` (the square to start on, default 0), `die` (the faces it can show, default [1, 2, 3]), `rolls` (fixed rolls), `pawn`, `goal` (emoji), `prompt`, `say`. A wrong square or number is a miss; after two the next square glows | yes |
| `tangram`  | Fill an outline with shapes: `slots` [{`shape`, `at` [x, y], `r` (degrees), `s`, `color`}] on a board of `view` [w, h] (default [100, 80]); shapes `square`, `rect`, `tri`, `rtri` (half a square), `circle`, `semi`. One piece per slot plus `extra` [{`shape`, `s`}], all upright at first: the child picks one, turns it (↻ by `turn` degrees, default 90) and taps or drags it to its place; a wrong shape or turn is a miss, and after two the piece turns itself. Optional `prompt`, `say`, `pic` and `made` (the picture and words at the end) | yes |

**Time and mass** (`js/steps/measure.js`, used by ریاضی; the balance later by علوم too). Same rules as the games: no
timers or points, a gentle bounce on a miss, the answer shown after two misses; tap, drag, or the keyboard.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `clock`   | A clock face with a short and a long hand, geared like a real clock (at half past three the short hand is between ۳ and ۴). Times are written `"h:mm"` (`"3:00"`, `"9:30"`) and said as «ساعت ۳ و نیم». `ask: "read"` (the default with `options`): `time` and `options` (times), choose what it shows; `ask: "set"` (the default with `time`): the child sets the hands to `time`, from `start` (default `"12:00"`), and presses «درست شد» (a miss names the hand to look at; after two the hands turn to the time); `ask: "explore"` (the default with no `time`): turn the hands and hear the time; `ask: "show"`: the clock shows `start`, then both hands turn on to `time` while the child watches, with a replay button (to explain, not scored). Hands are moved by dragging them, the round-arrow buttons, or the arrow keys on a hand. Optional `prompt`, `say`, `pic` (what happens at that time), `snap` (minutes the long hand moves by, default 15; 5 to read minutes) | yes, unless `explore` or `show` |
| `balance` | A two-pan balance that tips towards the heavier side. Things are numbers (a weight of that mass, labelled with `unit`, default کیلو; `""` for none) or {`pic`, `mass`, `label`, `say`} (`label` is written on the thing: `"؟"` for an unknown). `left`, `right` (on the pans at the start), `tray` (things the child can put on), `open` (`left`, `right` or `both`, default both: where the child may put things). `ask`: `heavier` or `lighter` (tap that pan; `held: true` keeps it level until the answer, so the weights are added up, not seen), `balance` (the default with a `tray`: put things on until it is level; putting something on the lighter pan that tips it past level is a miss; taking things off never is, and after two the things move by themselves into a way that balances) or `explore` (not scored). Optional `prompt`, `say`, and `question`, `options`, `answer`, `pic`, asked once it balances. `lever: true` makes it a seesaw: seats along the beam (`seats` per side, default 3), things on it give a `seat`, and each side turns by mass × seat | yes, unless `explore` |

**More math** (`js/steps/math2.js`, used by ریاضی from Sapling on). Same rules as the games: no timers or points, a
gentle bounce on a miss, the answer shown after two misses; tap, drag, or the keyboard (Tab and Enter, digits, arrow
keys). Math is written left to right; numbers are typed with digit keys (tap, drag onto the box, or type 0–9 or ۰–۹).
Every step here takes an optional `prompt`, `say`, and `question`, `options`, `answer` asked at the end.

| Step type | Fields | Scored |
|-----------|--------|--------|
| `bar`     | The bar model. `bars` [{`label`, `pic`, `parts`}]: a part is a number, `"?"` (the unknown, as long as `answer`) or {`n`, `text`, `shade`} (`n` its length, `text` what is written, `""` for nothing). `braces` [{`bar`, `from`, `to`, `text`, `below`}] or {`rows: true`, `text`}; shortcuts `whole` (a brace over bar 0), `diff` (the shorter of two bars gets a dashed gap with a brace: comparing), `total` (a brace over all the bars). Then `options` and `answer` (what goes in the «؟»; `result`: a line shown at the end, «۴۵ − ۱۸ = ۲۷»); `mark: true` first takes the numbers off and the child puts each back; or `models` [{`bars`, …}] with `answer` (the index): which model fits the problem? | yes |
| `column`  | Written methods. `op` (`"+"`, `"-"`, `"×"`), `a`, `b` (numbers; decimals as `"12.5"` for + and −). The child writes the answer digit by digit from the ones; a wrong digit names the column («یکان: ۷ + ۵ = ؟»), after two it is written in. Carries and borrowed digits go in the small row above (borrowed digits crossed out); `bundles` (default on for + and − under 1000) shows sticks, bundles and packs beside it, tied on a carry and opened on a borrow. × by a number of two or more digits writes a line per digit, then adds them. `result` replaces the line written at the end. Long division is still to do | yes |
| `array`   | `rows`, `cols`, `thing` (emoji, default a dot). `ask`: `count` (default; `turn: true` turns ۳ × ۴ into ۴ × ۳), `build` (make `rows` × `cols`, or any array of `n`, in an empty grid of `max` [r, c]: tap or drag to the corner, or the arrow keys), `split` (tap a line between rows; `split`: the rows in the first part; both products and their sum are written), `area` (the area model: `rows` and `cols` are numbers or lists of parts, `cols: [20, 3]`; the child writes each part, then the whole) | yes |
| `grid`    | A squared grid, `size` [columns, rows] (default [8, 6]); squares are [column, row] from 1 at the bottom left; `labels: true` numbers them; `axes: true` numbers the lines from 0 and uses points [x, y] (`origin` [x, y] for negatives). `ask`: `area` (`cells`: tap each square to count, then the area: `options` or written), `perimeter` (`cells`: tap each side around), `draw` (colour squares until `area`, `rect` [w, h] and/or `perimeter` are right; `show: "perimeter"`), `find` (`at`), `plot` (`points` in order, `names`, `join`, `close`), `read` (`mark`, `pic`, `options`), `move` (`piece` {`at` or `cells`, `pic`, `dir`} to `goal` {`at` or `cells`, `dir`} with arrow buttons, keys or dragging; `turn: true` adds quarter turns) | yes |
| `mirror`  | `ask: "complete"` (default with `cells`): `size` (default [8, 8]), `line` (`v`, `h` or `d`), `cells` [[column, row, colour 0–4]] on one side, `colors`; the child colours the mirror image, then «درست است؟» (wrong squares get ✕, missing ones are shown after two misses). `ask: "lines"`: `shape` (square, rect, triangle, isosceles, pentagon, hexagon, star, heart, butterfly, kite, parallelogram), `text` (a letter; give `symmetric`) or `cells` with `size` (a tile pattern); `lines` to try (some of `v`, `h`, `d1`, `d2`); the child taps every line of symmetry, or «هیچ‌کدام» | yes |
| `spinner` | A chance experiment: `spinner` [{`label`, `color`, `size`}], `bag` {"🔴": 3, "🔵": 1}, `die: true` (`dice: 2` adds two) or `coin: true`; `tries` (default 10): spin, see, and tap (or drag to) the result's row to make a tally mark; `more: n` adds n tries at once. `answer` may be `"most"` or `"least"` (from the child's own tallies; a tie is said and not asked) | yes |

Options on older steps (also in `js/steps/math2.js`): **`numline`** with `denom` (equal parts per whole) or `dec: true` (tenths, ۰/۳), `max` (wholes), `labels` (`wholes`, `all`, `none`), `strips` [1, 2, 4] (fraction strips over the line), and `ask`: `place` (`at` [3, 4] or 0.3: tap the tick), `name` (`mark`, `options` such as {`frac`: [3, 4]}, `answer` `"3/4"`), `cut` (cut 0–1 into `denom` parts with − and +), `hop` (`from`, `by` [1, 2], `hops`, then the question). **`feed`** with `plates` (a number) or `who` [emoji]: `n` things (`food`) shared equally, a bowl for what is left over (`leftover: true` shows it anyway), the division written at the end («۱۴ ÷ ۳ = ۴ (باقی‌مانده ۲)», or `result`).

**Adding a step type or a subject.** A new file can add step types with `B.engine.steps.mytype = function (s, box, done) { … }`
(call `done(scored, firstTry)` at the end; `B.engine` also shares `choice`, `speakBtn`, `nextBtn`, `doneButton`, `pick`, `nums`).
A new subject gets its own `js/lessons/<id>.js` that does `B.SUBJECTS.push({ id, name, emoji, leveled })` and
`B.LESSONS.push(…)`. Load new files in `index.html` and `browse.html` (step files after `js/anim.js`, lesson files after the other lesson
files) and list them in `FILES` in `sw.js`. New phrases go in `js/strings.js`, new styles at the end of `css/style.css`.

A lesson counts as mastered when ≥ 80% of scored steps are right on the first try. Mastered lessons come back
for review after 1, 3, 7, 14 and 30 days.

After changing a reading lesson, run `node tools/check-reading.js`: every word the child decodes must use only letters taught
in earlier lessons (each reading lesson's new letters go in `B.READ_TEACHES` in `js/practice/read.js`).

To review lessons, open `browse.html`: it lists every built and planned lesson by subject and garden, shows each
step's data (answers highlighted, the English version beside the Persian one), and plays any lesson from any step
without touching children's progress. New lesson and step files are loaded in `browse.html` too (`tools/check-plan.js`
reports any that are missing).

Before publishing a new lesson, have it reviewed by at least one Persian-speaking teacher (see `policies.html#accuracy`).

## Adding a recess game

The recess games («زنگ تفریح») are plain pages outside the lesson player. Their plan is in `CURRICULUM.md`,
"Recess games". To add one:

1. Add a row to that table (its id is permanent: children's progress is stored by it), then add the game to
   `B.GAMES` in `js/recess.js`: `id` (its folder), `name`, `emoji`, `group`, `about` (for parents), `after` (lesson ids
   it follows in a garden's path, or `[]`) and `gardens`.
2. Make `games/<id>/index.html` (start from `games/memory-match/index.html`): `<html lang="fa" dir="ltr">`, scripts
   from `../shared/` in the order `profile.js`, `lines.js`, `voice.js`, then `saved.js`/`robot.js`/`kit.js` as needed,
   relative paths only (the site may live in a subfolder or on a USB stick), 🏠 to `../../index.html#/play`, every
   visible text in Persian (`STYLE.md`), digits with `Kit.fa`, the title with `Kit.title` (word by word, so Persian
   letters stay joined).
3. Progress: `Kit.store('<id>')` for small things (kept in the child's profile, backed up and synced);
   `Kit.store('<id>', { device: true })`, `Child.key()` or `Child.db()` for bulky things that stay on the device.
   Never put pictures or audio in the profile.
4. Spoken lines go in `games/shared/lines.js` (`key: [text, version]`) with a recording in `audio/games/<key>.mp3`.
   A line with an empty version uses the device's Persian voice until it is recorded.
5. Add the page to `FILES` in `sw.js` and to the table in `guide.html#recess`.

## Practice generators

Lessons teach; practice builds fluency. Every garden of every subject plan has a `#### Practice` table, and each row
is a **generator**: code that makes endless varied items from the existing step types, using only what the child has
met so far. Practice is part of the course (`CURRICULUM.md`, "Practice in the course"): in Seed, Sprout and Sapling
each garden's page is one **path**, lesson → **its practice set** → next lesson …, with a **unit quiz** every 3 to 6
practised lessons, and «ادامه» at the end of each leads to the next (`#/set/<lesson>`, `#/quiz/<lesson>`). A set is
every generator listed for that lesson, 6 to 9 items, interleaved, made from that lesson and the ones before it; it is
done when finished, never scored as a lesson. Finished sets come back after 1, 3, 7, 14, 30, 60 and 120 days, mixed into
one «🔄 مرور» per subject (`#/review/<subject>`), in place of replaying whole lessons. Quizzes (8 items) give 1 to 3
stars. Items the child misses come back first in the next session, then after 1, 3 and 7 days. Below the path,
«تمرین آزاد» still offers every open generator on its own (`#/practice/<subject>/<id>`).

**The coverage rule: at least 3 generators in every lesson's set** (Seed, Sprout and Sapling), of different kinds:
different step types and ways of asking (recognise, produce, match, sort, order, find the mistake, a short word
problem…). `node tools/check-plan.js` prints a coverage summary per subject; `node tools/check-plan.js --coverage=math`
lists each lesson below 3 with the generators that serve its objectives and could join its set.

**Files.** `js/practice.js` is the framework (registry, seeded random, context, sessions, spaced repetition). Each
subject's generators go in `js/practice/<subject>.js` (`read.js` and `math.js` exist; copy their shape). A new file
is loaded in `index.html` and `browse.html` right after `js/practice/math.js`, and listed in `FILES` in `sw.js`.
English words go in `js/en/<subject>.js`. No other file needs to change.

**1. The plan row.** Find the row in `curriculum/<subject>.md`. Its **Id** (`math-seed-p1`) is permanent: children's
records are kept by it. Build what the row says, for its objectives. Set the row to 🔨 when the generator exists
(✅ in the commit that adds it). Change the row first if the generator should do something else.

**2. Register it.**

```js
B.PRACTICE.push({
  id: "math-seed-p1", subject: "math", level: "seed",   // level null: the garden-less «همه» part of a subject
  objectives: ["math.seed.2", "math.seed.4"],          // exactly the codes in the row
  needs: ["math-seed-1"],                              // lessons that unlock it (done, or in an earlier garden)
  lessons: ["math-seed-1", "math-seed-2", "math-seed-12"], // whose practice sets it is in (default: its needs)
  emoji: "🍎", title: "بشمار، چندتا؟",                  // the child sees these (STYLE.md)
  words: { ask: "پس چند {name} هست؟", names: { "🍎": "سیب" } }, // every Persian word it uses
  make: function (rng, n, ctx) { … return steps; }     // up to n steps
});
```

`lessons` places the generator in those lessons' practice sets: list every lesson whose skill it practises, as long as
it is open there (its `needs` come at or before it; `tools/check-plan.js` checks). In a set it is called with the
context of a child who has done exactly the lessons up to that one, so `ctx.done` must gate every kind of item.

**3. `make(rng, n, ctx)`** returns up to `n` steps (fewer is fine; `[]` when nothing can be made yet), each one a
step exactly as in a lesson (`choose`, `count`, `pairs`, `sort`, `order`, `build`, `track`, `listen`, `passage`, …;
see the tables above), plus an optional `key`: a short **string** naming the item, the same every time it is made
(`"7"`, a word, `"3x4"`). The framework adds `gen: <id>` to each step. Never set `practice: true` on a generated
step: it makes `pairs`, `order` and `sort` unscored, so misses could not come back (`tools/check-plan.js` reports it).

- `rng` is a seeded random source: `rng()` (0 ≤ x < 1), `rng.int(lo, hi)` (both included), `rng.pick(list)`,
  `rng.shuffle(list)` (a copy), `rng.sample(list, k)`. Use only `rng` for chance, never `Math.random`, and make the
  same `rng` calls whatever the language: the English switch remakes the session from the same seeds.
- `ctx.done(lessonId)`: the child has done that lesson (or it is in an earlier garden than the child's). Use it to
  grow the items with the lessons (numbers to 5, then to 10; new layouts after the lesson that taught them).
  `ctx.doneIds` lists them, in lesson order.
- `ctx.letters`: every letter taught so far (reading; `B.READ_TEACHES` in `js/practice/read.js`, «V»/«Y» for و and
  ی as consonants). `B.decodable(text, ctx.letters)` (in `js/practice/read.js`) says whether a text can be read.
- `ctx.again`: keys of items this child missed, most urgent first. Make these first (if they still fit `ctx`).
- `ctx.w(key, vars)`: the generator's word for `key` in the session's language (`words`, or the English overlay),
  with `{name}` filled from `vars`; a word can also be a list or a table (`ctx.w("names")["🍎"]`).
- `ctx.t(key, vars)`: a player string (`js/strings.js`, or `js/en/strings.js` in English).
- `ctx.lang` (`"fa"` or `"en"`), `ctx.level` (the child's garden in this subject) and `ctx.subject`.

**Options.** `home: true` also puts the generator on the child's home screen as a button (its emoji and title),
outside every garden, once its `needs` are met (the calm corner, `feel-any-p3`). A session with nothing scored
(a check-in, a calm tool) ends with thanks instead of praise for practising. To let the child choose what to do,
make one `menu` step whose items are the choices.

**Off-screen rows.** A row whose "What it makes" is off-screen activities is built in `js/activities.js`, not by a
generator: add activities with `practice: "<row id>"` under the row's garden (`any` for every garden: they are added
to each garden's daily suggestion), with permanent ids. `tools/check-plan.js` then accepts the row as 🔨/✅, and
`browse.html#/practice/<id>` lists them.

**4. The rules.** Same as lessons (`CURRICULUM.md`, "How lessons are built"):

- **Only what has been taught:** gate every kind of item on `ctx.done(…)` and, for reading, on `ctx.letters`. A
  generator that is open must still make sense for a child who has done only its `needs`.
- **Items, not lessons:** short items a child can do alone, right or wrong on the first try (scored steps), so a miss
  can come back. A session holds 5 to 9 items; a generator asked for `n` makes at most `n`, with no item twice
  the same way. No `intro`, `scene` or `home` steps: practice does not teach.
- **Persian per `STYLE.md`**: Iranian school terms, «تو» for the child, Persian digits come from the player, names of
  girls and boys from many places; nothing political, religious or frightening.
- **English**, for every subject except `read` and `english`: `B.EN["<id>"] = { title, words: { … } }` in
  `js/en/<subject>.js`, the same keys as `words`. Numbers, pictures and answers stay as they are; Persian digits and
  «؟» become 0–9 and "?" by themselves. Without it the generator plays in Persian only.

**5. Test it.**

1. `node tools/check-plan.js`: the row and the generator agree (id, subject, garden, objectives, `needs`), and the
   generator runs without errors at every point of its subject's lessons, in Persian and English, making only known
   step types and string keys. For reading also `node tools/check-reading.js`: every word of every item, at every
   point of the lessons, uses only the letters taught by then.
2. `browse.html#/practice/<id>` (from the site's server): the row, its objectives and `needs`, a fresh sample's
   steps (with answers), «اجرای یک نمونه تازه» to play it, «نمونه تازه» for another, «متن انگلیسی» for English, and
   «کودک درس‌ها را تا اینجا خوانده است» to make items as for a child who has done the lessons up to any one.
3. `browse.html#/lesson/<id>`: the lesson's practice set (its generators, «اجرای تمرین این درس») and, after the last
   lesson of a unit, its quiz («اجرای آزمون کوتاه»).
4. In the app (`index.html`), as a child in that garden: the path on the garden's page, lesson → «ادامه» → its set,
   in Persian and with «🔤 English», no console errors; miss an item on purpose, then «یک تمرین دیگر»: it comes first.
5. Generators make no animations, so `tools/storyboard.html` is not needed.

The child's records are `p.practice[<id>] = { box, due, n, at, items: { <key>: { box, due } } }` (only missed items
are kept, at most 30), `p.practice["set:<lesson id>"] = { done, box, due, n, at }` and
`p.practice["quiz:<lesson id>"] = { done, stars, last, n, at }`, saved, backed up and synced with the profile
(`B.mergePractice`: the record practised last wins). The day's log has `p: ["set:…", "quiz:…", "review-<subject>"]`, and
the parent's weekly plan fills each day's minutes with lessons (10), sets, quizzes and reviews (5 each).

The framework's functions: `B.lessonGens(lessonId)` (a set), `B.practicePath(subject, level)` (the path),
`B.gardenPath(p, …)` (with a child's state), `B.pathNext`, `B.setSession`, `B.quizSession`, `B.reviewSession`,
`B.dueSets`, `B.finishPractice` (`js/practice.js`).

## Release checklist

1. Add any new file to `FILES` in `sw.js` (and to `TOP`/`DIRS` in `desktop/src-tauri/build.rs` and the
   `copySite` task in `android/build.gradle` if it is outside `js/`, `css/`, `fonts/`, `audio/`, `games/`).
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
