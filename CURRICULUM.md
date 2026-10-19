# Baghcheh content plan · برنامه محتوای باغچه

This is the **single source of truth** for what Baghcheh teaches: every subject, garden, objective, unit and
lesson, what each one covers, and which kinds of content it uses. This file holds what every subject shares; each
subject's scope and sequence is in its own file in `curriculum/` (listed under [Subjects](#subjects)). Build lessons
from the plan, and change the plan first (in the same commit) whenever the content changes.
`node tools/check-plan.js` checks that the plan and `js/lessons/` agree.

Status: ✅ built (committed: children get it) · 🔨 being built (in `js/lessons/` but not committed yet) ·
⬜ planned (not written). `tools/check-plan.js` reads git to check ✅ and 🔨, so mark lessons ✅ in the same commit
that adds them. Expert review still to do is noted in each subject's introduction. Planned titles are working titles: polish them with
`STYLE.md` when the lesson is written. 🆕 marks content that needs a step type (or an option) that does not exist yet
(see [New step types](#new-step-types)).

**Lesson ids are permanent.** Children's progress and reviews are stored by id, so an id is never renamed,
reused or renumbered. A lesson inserted between two others gets the next free number; its place in the garden
comes from its position in the lesson file (and in this plan), not from the number.

## Subjects

| Subject | id | Plan | Lessons | Gardens | Starts at |
|---|---|---|---|---|---|
| فارسی | `read` | [curriculum/read.md](curriculum/read.md) | `js/lessons/read.js` | all five | placement check |
| ریاضی | `math` | [curriculum/math.md](curriculum/math.md) | `js/lessons/math.js` | all five | placement check |
| احساس‌های من | `feel` | [curriculum/feel.md](curriculum/feel.md) | `js/lessons/feel.js` | all five, plus lessons for every garden | the child's Persian garden |
| علوم | `science` | [curriculum/science.md](curriculum/science.md) | `js/lessons/science.js` | all five | the child's Persian garden |
| خواندن و نوشتن انگلیسی | `english` | [curriculum/english.md](curriculum/english.md) | `js/lessons/english.js` | all five | Seed (`defaultLevel`) |
| سلامت و ایمنی | `health` | [curriculum/health.md](curriculum/health.md) | `js/lessons/health.js` | all five, plus lessons for every garden | the child's Persian garden |
| فکر و برنامه‌نویسی | `think` | [curriculum/think.md](curriculum/think.md) | `js/lessons/thinking.js` | all five | the child's Persian garden |
| ایران و جهان | `world` | [curriculum/world.md](curriculum/world.md) | `js/lessons/world.js` | all five | the child's Persian garden |

## A full curriculum, as deep as each family wants

Schools in Iran are on and off and unfocused because of war, so Baghcheh is planned as a **full curriculum**: a child
who learns only with Baghcheh, from the Seed garden to the end of the Forest garden, should be able to do what the
best education systems expect by the end of grade 9, at age about 15. Parents choose how deep each child
goes, per subject:

| Depth | For | What the child gets |
|---|---|---|
| «پایه» (core) | a little every day, or a child catching up | only the objectives marked `core`: what is needed to move on |
| «کامل» (full) | a child learning mainly at home | every objective, every lesson and plenty of practice: it replaces school |
| «همراه مدرسه» (alongside school) | a child who is in school | the parent picks the school grade; Baghcheh shows the objectives of that grade (the `School` column) and practice for them, so it follows the class |

So every objective says whether it is `core` or `full`, and which Iranian school grade and textbook lesson it matches.
(Choosing the depth is a parent setting still to build: see "Outside lessons".)

**Time and size.** A full year is about 36 weeks of 5 days. Time a day for all subjects together, at full depth:
Seed 20–30 minutes, Sprout 30–45, Sapling 45–60, Tree 60–90, Forest 90–120; core depth is about half of that. Each
subject's share of the day follows the weekly timetable of Iranian schools for the matching grades (each subject file
writes down the numbers it used). A lesson is about 10 minutes of new teaching; the rest of a subject's time is
review and practice. So each subject sizes each garden as: years × 36 weeks × its sessions a week, split between new
lessons and practice, and writes the result at the top of the garden.

## Scope and sequence (the format of every subject file)

Every `curriculum/<subject>.md` has, in this order:

1. **Frameworks:** what the subject is anchored to. **The best systems and best practice lead:** the curricula of the
   countries that do best in international studies (PISA, TIMSS, PIRLS: for example Singapore, Estonia, Finland,
   Japan, Korea, Canada, England, Ireland) and the strongest research and frameworks for the subject (for example the
   science of reading, Common Core and its progressions, NGSS, CEFR, the C3 framework, CSTA, CASEL, WHO/UNESCO
   guidance). Where good systems differ, choose what the evidence supports and say why. They decide what is taught
   and in what order. The Iranian national curriculum and school textbooks are used in two ways only: to fill the
   School column (so «همراه مدرسه» can follow a child's class), and where Iranian schools cover clearly more than the
   Western standard, to add some of it, leaning towards the Western scope (somewhere in the middle, usually as `full`
   rather than `core`). Where the Iranian curriculum covers the same or less, follow the Western standard only.
   Persian language and literature are by nature Iranian content; their skills progression (reading, writing,
   vocabulary, comprehension) still follows Western literacy standards and research. Sources are named so a reviewer
   can check them.
2. **Strands:** the lines along which the subject grows (Persian: oral language, sounds, decoding and spelling,
   handwriting, fluency, vocabulary and word parts, comprehension, writing, grammar, literature).
3. **For each garden** (its `###` heading ends with the level in backticks, as now):
   - a sizing line: the years, sessions a week and the number of lessons and practice sessions that gives;
   - `#### Objectives`: what the child can do at the end, one row each:
     `| Code | Can do | Strand | Depth | School | Checked by |`. Code is `<subject>.<seed|spr|sap|tree|for|any>.<n>`
     (`read.sap.12`); Depth is `core` or `full`; School is the Iranian grade and textbook lesson it matches
     («پایه دوم، فارسی، درس ۵»), for parents only; Checked by says which lesson step or check shows it is learned.
   - `#### Lessons`: the lesson table, with two more columns at the end:
     `| St | Lesson | Title | Covers | Content types | Objectives | Depth |`. Objectives lists the codes the lesson
     teaches; Depth is `core` or `full`. Units of several lessons per objective, not one lesson per topic.
   - `#### Practice`: what practice the garden needs beyond its lessons, as generators or banks that make endless
     varied items (a decodable-sentence bank for the letters taught so far, a times-table generator):
     `| St | Practice | What it makes | Objectives |`. Hand-written lessons teach; generated practice builds fluency.

`tools/check-plan.js` checks this: every objective code is unique and is taught by at least one lesson, every lesson
names objectives that exist, and depths are `core` or `full`. A subject without objectives yet only gets a warning.

## Changing the plan

- **Adding, removing, moving or retitling a lesson, or changing what it covers or which content types it uses:**
  change its row here in the same commit. A new lesson gets a ⬜ row first, then 🔨 while it is written, then ✅.
- **Dropping a planned lesson:** delete its row (its id may then be used). A built lesson is never deleted, since
  children's progress refers to it; retire it by keeping it and saying so in "Covers".
- **A new subject:** a new file `curriculum/<id>.md` that starts with `## <name> — subject \`<id>\`` and has one
  `### … — \`<level>\`` section per garden (`any` for `level: null`) in the format above, and a row in the subjects table.
- **A new step type:** add it to "Content types", and remove the 🆕 from the rows it unlocks.
- Run `node tools/check-plan.js` (and `node tools/check-reading.js` for reading lessons) before committing.

## How lessons are built

These rules come from `method.html` and `README.md`; every lesson in every subject follows them.

- **One lesson ≈ 10 minutes, 5 to 9 steps.** A session is 15–20 minutes (`guide.html`), so one new lesson plus reviews.
- **Mastery:** ≥ 80% of scored steps right on the first try. Mastered lessons come back after 1, 3, 7, 14 and 30 days,
  so a scored lesson must still make sense when replayed out of order.
- **Unit shape.** A unit is a few *teaching* lessons, then a *game* lesson that practises the same skills
  (titled «بازی …»), and, where it helps, an *animation* or *story* that explains or uses the idea.
  The game is the skill itself, never a reward (`js/games.js`): no timers, points or losing.
- **Concrete → pictorial → abstract** in math and science: objects and pictures first, symbols last.
- **Reading is decodable:** every word a child reads uses only letters taught earlier (`node tools/check-reading.js`).
- **Text:** `STYLE.md` (Iranian school terms, no ezafe kasra, Persian digits, «تو» for the child). Examples from Iranian
  children's lives, girls and boys, many regions and peoples. No political, ideological or religious content,
  and no war or frightening imagery (`policies.html`).
- **No ages or grades** anywhere in the children's view; gardens only. Ages live in `guide.html`.
- **Every lesson is reviewed** by a Persian-speaking teacher before it is published (`policies.html#accuracy`).
- **Off-screen:** each garden also has daily activities away from the screen (`js/activities.js`).
- **English as a second language:** Persian is the main language of every lesson. Every lesson except Persian
  reading and writing (`read`) and the English course (`english`) also gets an English version, so a child can
  play it in English (see [Lessons in English](#lessons-in-english)). A new lesson gets its English version in
  the same change, or later in its subject's English file.

## Lessons in English

Baghcheh teaches English as a second language, not only as a subject: the child uses English to learn the same
things they learn in Persian. Any lesson with an English version shows a «🔤 English» button in the lesson bar;
the child (or parent) can switch, and the choice is remembered for that child. It is the same lesson, so progress
and reviews are shared. In English the lesson's words, the player's words (`js/en/strings.js`), the digits (0–9)
and the voice are English, and the page runs left to right. English reading and writing are taught in their own
course, «خواندن و نوشتن انگلیسی» (subject `english`, below).

An English version is an overlay in `js/en/<subject>.js`: `B.EN["<lesson id>"] = { title, steps: [ … ] }` with
only the words (prompts, captions, questions, labels, names); steps are matched by position, and numbers,
pictures and answers come from the Persian lesson (`js/english-mode.js`). English text must be simple, natural
and checked by a fluent speaker; no translated Iranian names or places (sangak bread stays sangak bread).

| Subject | English versions | Status |
|---|---|---|
| فارسی | — | Never: Persian reading and writing are taught in Persian only |
| ریاضی | `js/en/math.js` | 🔨 every built lesson, except `math-sprout-9` (writing Persian digits) |
| احساس‌های من | `js/en/feel.js` | 🔨 every built lesson (11) |
| علوم | `js/en/science.js` | 🔨 every built lesson (17) |
| سلامت و ایمنی | `js/en/health.js` | 🔨 every built lesson (15) |
| فکر و برنامه‌نویسی | `js/en/thinking.js` | 🔨 every built lesson (14) |
| ایران و جهان | `js/en/world.js` | 🔨 every built lesson (16; Iranian place names stay as they are) |
| خواندن و نوشتن انگلیسی | — | The course itself (instructions in Persian, the English it teaches) |

## Content types

Every lesson row below lists its content types. These are the names to use, with the step types that make them.

| Content type | What it is | Step types |
|---|---|---|
| **lesson** | Interactive teaching: show, explain, try with instant feedback | `intro`, `choose`, `trace`, `blend`, `clap`, `count`, `tenframe`, `make`, `numline`, `tens` (with packs of a hundred and boxes of a thousand), `compare`, `shape`, `measure`, `money`, `fraction` (cut, colour, name and share equal parts), `chart` (read, make and add to picture graphs and bar charts), `clock` (read a clock, set its hands), `balance` (two-pan balance: which side is heavier, making it balance; unknowns as labelled things); English: `words`, `listen`, `letter`; maps: `map` (tap places on a picture map, a symbol map with a legend or the map of Iran; follow a route; find my province; world outlines later), `compass` (turn to north, south, east, west) |
| **game** | Learning game; the move *is* the skill (`practice: true` on `pairs`, `order` or `sort`: never scored) | `pairs`, `build`, `order`, `sort`, `feed`, `pattern` |
| **animation** | Animated picture explanation or story, play/pause/replay (`scene` shows real actions: moving parts, paths, views, the child doing it; `story` only moves whole pictures) | `scene`, `story` |
| **story** | Text the child reads (decodable) or a story heard and talked about | `passage`, `story` (with `question`), `talk`, `readaloud` (the child reads aloud, the parent marks the hard words, then a re-read; not scored) |
| **inquiry** | Guess, try, see (science) | `test`, `shadow` |
| **coding** | Block programs on a grid; a miss is something to debug | `code` |
| **calm** | Breathing, naming feelings, grounding and relaxing; never scored, answers never stored | `breathe` (optional `pattern`: box breathing), `feelings`, `body`, `ground`, `meter`, `relax` |
| **home** | A task away from the screen, shown inside a lesson: an experiment, a body activity, a thinking game, writing on paper (`paper`: a task with an example, the parent ticks a short checklist; not scored, the ticks are not kept) | `home`, `doit`, `unplugged`, `paper` |
| **parent tip** | A note for the parent at the end of a lesson: how to practise, how to talk about it | `tip`, `forparents` |
| **activity** | Daily off-screen suggestion in the parent's plan (not a lesson) | `B.ACTIVITIES` in `js/activities.js` |

Subject-specific step types live in `js/steps/` (`paper.js` for every subject, `reading.js`, `science.js`, `english.js`, `health.js`, `coding.js`, `feel.js`, `world.js`, `numbers.js`, `measure.js`). A new step type
must be added to this table, or `tools/check-plan.js` fails.

---

## Outside lessons

| St | What | Where | Plan |
|---|---|---|---|
| ✅ | Placement check for فارسی and ریاضی | `B.PLACEMENT` in `js/content.js` | Other subjects have none: they start at their `defaultLevel` or the child's Persian garden |
| ✅ | Daily off-screen activities, 6 per garden | `js/activities.js` | Add science, English, health and coding activities once those subjects ship |
| ✅ | Parent guide, method, policies | `guide.html`, `method.html`, `policies.html` | When Tree/Forest lessons ship, update the line in `guide.html` saying they are coming |
| 🔨 | Animations that show what they say | `js/scene.js`, `js/art/rig*.js`, `tools/storyboard.html` | Every animation in every subject is now a `scene` step (no `story` left): 92 lessons, 606 frames, checked against their captions in the storyboard. The engine has moving parts, paths, walking people (`walker`, full bodies for every person emoji), camera pans with depth, the child rubbing or tapping, and a slower pace. Left: commit, then teacher review of the pictures |
| ⬜ | Depth per subject, chosen by the parent | «بخش والدین» (`js/app.js`, `js/plan.js`) | «پایه»، «کامل»، «همراه مدرسه» per child and subject (see [depth](#a-full-curriculum-as-deep-as-each-family-wants)). Core shows only `core` lessons; alongside school asks for the school grade and puts that grade's objectives first. The weekly plan and the daily time follow the depth |
| ⬜ | Recorded audio for every lesson | `audio/` | Record Seed and Sprout first (children who cannot read yet need it most) |
| ⬜ | «ایران و جهان» in the parent guide and the method page | `guide.html`, `method.html` | A method section on inquiry, maps, historical thinking and windows-and-mirrors, with references (C3 Framework, Seixas, Bishop), and the neutrality rules for history |
| ⬜ | Iran's flag, chosen by the parent | «بخش والدین» (`js/app.js`, `js/strings.js`), stored with the family's settings | The current flag, the lion-and-sun flag, or not chosen (the default). Plain names, side by side, no comment; synced to the home hub like other settings and kept in backups |
| 🔨 | Map data for «ایران و جهان» | `js/maps/` | Simplified SVG outlines from Natural Earth (public domain), self-hosted and small; no outside requests. **Iran is built** (`js/maps/iran.js`, made by `tools/build-iran-map.js`: provinces, seas, provincial centres, neighbours as plain shapes). Still to do: the world's countries, the region with named neighbours, relief, and SVG flags (public domain); Iran's two flags are drawn but used only through the parent's choice |
| ⬜ | Reviewers for «ایران و جهان» | `policies.html#accuracy` | A history or geography teacher reviews every lesson; speakers of each language record the «سلام» audio |
| ⬜ | Off-screen activities for «ایران و جهان» | `js/activities.js` | Oral history with grandparents, drawing the street, a museum or old-house visit, a regional dish |

## New step types

Built in this order (the first ones unlock the most lessons). When one is built, document it in `README.md`
and remove the 🆕 from the rows that use it.

| Step type / option | What it does | Used by |
|---|---|---|
| `paper` | A writing task on paper with a short checklist for the parent; not scored. **Built** (`js/steps/paper.js`) | `read-tree-11`, `read-tree-12`, `read-forest-2/7/9`, `english-sapling-8`, `english-tree-6`, `english-forest-4`, `world-forest-8/10`, `world-forest-14` |
| `fraction` | Cut a shape or a set into parts and colour some. **Built** (`js/steps/numbers.js`): shapes (circle, square, bar, sangak) cut into any number of parts, sharing a set | `math-sapling-19`, `math-tree-9/10`, `math-forest-1` |
| `clock` | Read and set clock hands. **Built** (`js/steps/measure.js`): o'clock and half past, and any minutes with `snap` | `math-sapling-15`, `math-tree-13` |
| `balance` | Two-pan balance (mass, then equations, levers). **Two pans and unknowns are built** (`js/steps/measure.js`); the lever (things placed at a distance from the middle) is still to do: the beam already turns by the weight on each side | `math-sapling-16`, `math-forest-8`, `science-tree-3` |
| `chart` | Read and add to picture graphs and bar charts. **Built** (`js/steps/numbers.js`), bar charts with `bars: true` | `math-sapling-20`, `math-tree-18`, `math-forest-12`, `science-forest-7`, `world-forest-7` |
| `array` | Rows × columns, area model | `math-tree-3/5`, `math-forest-6/7` |
| `column` | Written column methods (+ − × ÷), digit by digit | `math-tree-2/5/7`, `math-forest-2` |
| `grid` | Squared grid: perimeter, area, coordinates | `math-tree-14`, `math-forest-10/11` |
| `tens` hundreds/thousands | Flats and cubes in the place-value step. **Built** (`js/engine.js`) | `math-sapling-17`, `math-tree-1` |
| `feed` several plates | Sharing into equal groups | `math-tree-6` |
| `mirror` | Complete a symmetric picture | `math-tree-16` |
| `spinner` | Repeat a chance experiment, tally results | `math-forest-13` |
| `map` | Tap, find and label places on an SVG map: picture maps (room, neighbourhood), Iran and its provinces, the region, the world; optional routes. **Picture maps, finding, routes, symbol maps with a legend and the map of Iran (provinces, seas, cities, my province; `js/maps/iran.js`) are built** (`js/steps/world.js`); the region, the world, relief and trade routes wait for their map data in `js/maps/` | `world-seed-2/4`, `world-sprout-2/4/7/8`, `world-sapling-1/2/3/7/8/9`, `world-tree-4/8/10/11`, `world-forest-2/4/7/9`, `world-forest-13` |
| `timeline` | Place events and pictures on a timeline with eras; before and after | `world-tree-1/2/5/7/9`, `world-forest-1/3/5`, `world-forest-11/12` |
| `source` | Look closely at a picture of an object, building or old text: «چه می‌بینی؟ چه فکر می‌کنی؟ چه سؤالی داری؟», with questions for the parent; not scored | `world-tree-1/2/4/8`, `world-forest-4/5`, `world-forest-11` |
| Flag faces | Self-hosted SVG flags as a face (`flag: "fr"`) in `pairs`, `sort` and `map`; `flag: "iran"` shows the parent's choice, or an empty flag with «پرچم ایران را از پدر و مادرت بپرس.» | `world-sapling-8`, `world-tree-10` |
| `compass` | Turn to north, south, east and west; the sun's path. **Built** (`js/steps/world.js`) | `world-sprout-3/8` |
| `circuit`, `ramp` | Small science simulations | `science-tree-1`, `science-tree-2` |
| `code` if, function and counter blocks | Conditions, functions, variables | `think-tree-1/2`, `think-forest-1` |
