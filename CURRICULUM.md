# Baghcheh content plan · برنامه محتوای باغچه

This is the **single source of truth** for what Baghcheh teaches: every subject, garden, objective, unit and
lesson, what each one covers, and which kinds of content it uses. This file holds what every subject shares; each
subject's scope and sequence is in its own file in `curriculum/` (listed under [Subjects](#subjects)). Build lessons
from the plan, and change the plan first (in the same commit) whenever the content changes.
`node tools/check-plan.js` checks that the plan and `js/lessons/` agree.

Status: ✅ built (committed: children get it) · 🔨 being built (in `js/lessons/` but not committed yet) ·
⬜ planned (not written). Practice rows use the same marks for their generators (in `js/practice/`). `tools/check-plan.js` reads git to check ✅ and 🔨, so mark lessons ✅ in the same commit
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
     `| St | Id | Practice | What it makes | Objectives |`. Hand-written lessons teach; generated practice builds fluency.
     **Id** is permanent, like a lesson id (children's practice records are kept by it): `<subject>-<garden>-p<n>`,
     `<garden>` being the level or `any` (`math-seed-p1`, `feel-any-p2`); a new row takes the next free number in its
     subject and garden. A row is ⬜ until its generator is registered with that id in `js/practice/<subject>.js`,
     🔨 while that is uncommitted, ✅ once committed. How to write one: `README.md`, "Practice generators". In the
     app, each garden's «تمرین» mixes the generators the child has unlocked (by the lessons each one `needs`) into
     short sessions of about 5 minutes, never scored as lessons; missed items come back the next time. A generator
     with `home: true` is also a button on the child's home screen (the calm corner). A row can instead be built by
     off-screen activities in `js/activities.js` that name it (`practice: "<row id>"`, in the row's garden or `any`).

`tools/check-plan.js` checks this: every objective code is unique and is taught by at least one lesson, every lesson
names objectives that exist, and depths are `core` or `full`. A subject without objectives yet only gets a warning.
For practice it checks that every row has a unique id of the right shape, that a 🔨/✅ row has a registered generator
(✅ only when committed) and every registered generator has a row with the same subject, garden and objectives, and
it runs each generator at every point of its subject's lessons. `tools/check-reading.js` also checks every word the
reading generators make against the letters taught up to that point.

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
- **Mastery:** ≥ 80% of scored steps right on the first try. A mastered lesson that has no practice set yet comes back
  whole after 1, 3, 7, 14 and 30 days, so a scored lesson must still make sense when replayed out of order. A lesson
  with a practice set is reviewed through that set instead (see [Practice in the course](#practice-in-the-course)).
- **Every lesson is followed by its practice** (Seed, Sprout and Sapling): at least 3 different generators per lesson.
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

## Practice in the course

Lessons teach; generated practice (the `#### Practice` rows, `js/practice/`) makes it stick. In Seed, Sprout and
Sapling, practice is part of each garden's path, not a corner of it:

- **The path.** On a garden's page the child walks one path: a lesson, then **its practice set**, then the next lesson,
  and every few lessons a **unit quiz**. The «ادامه» button at the end of each one leads to the next. The next item
  opens when the one before it is *finished*, not when it is perfect: there is no fail state, and what was missed
  comes back later. Anything a child has already done stays open (children who started before the path keep their
  progress).
- **A lesson's practice set** is about 5 minutes (6 to 9 items) mixing **every generator listed for that lesson**,
  interleaved, with items made only from that lesson and the ones before it. A generator names the lessons whose set
  it belongs to (`lessons: [ids]` in `js/practice/<subject>.js`; by default its `needs`). **Coverage rule:** every
  built lesson in Seed, Sprout and Sapling has **at least 3 different generators** in its set, so the same skill is
  met in different ways: different step types and different ways of asking (recognise, produce, match, sort, order,
  find the mistake, a short word problem…). `tools/check-plan.js` warns about every lesson below 3 and suggests
  generators that serve the lesson's objectives; a subject adds generators and plan rows until no warning is left.
- **Brought back many times.** A finished set comes back for review after 1, 3, 7, 14, 30, 60 and 120 days (a set
  where many items were missed goes one step back instead of forward). Missed items come back sooner, at the next
  session and then after 1, 3 and 7 days. The sets that are due in a subject are mixed into one **review** («مرور»),
  about 5 minutes, at the top of the garden's page and on the child's home screen. This replaces replaying a whole
  lesson for review; the lesson itself can still be replayed any time. A lesson with no practice set yet keeps the
  old whole-lesson review (1, 3, 7, 14, 30 days).
- **Unit quizzes.** A unit is the lessons of one or more objectives: a quiz comes after a lesson where the topic
  changes (an objective practised in its set is not practised in the next lesson's set), once at least 3 lessons with
  practice sets have passed since the last quiz, after 6 of them at most, and at the end of the garden. It mixes the generators of those lessons (8 items). The result is gentle: 1 to 3 stars (one for finishing,
  more for answers right on the first try), the best result is kept, it can be taken again, and the items missed come
  back in later practice like any other miss.
- **Parents.** The weekly plan fills each planned day's minutes with lessons, their practice sets, quizzes and reviews
  (a lesson counts 10 minutes, a set, review or quiz 5), and the calendar log records practice too. The content
  browser shows each lesson's practice set and each unit's quiz, playable.
- **Stored** with the child's profile (backed up and synced like everything else): `p.practice["set:<lesson id>"]`,
  `p.practice["quiz:<lesson id>"]` (the quiz after that lesson) and the generators' own records.

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
| ریاضی | `js/en/math.js` | 🔨 every built lesson, except `math-sprout-9`, `math-sprout-23` and `math-sprout-41` (writing Persian digits) |
| احساس‌های من | `js/en/feel.js` | 🔨 every lesson (24: the 16 for every age and the 8 Seed lessons) |
| علوم | `js/en/science.js` | 🔨 every built lesson (17) |
| سلامت و ایمنی | `js/en/health.js` | 🔨 every built lesson (85) |
| فکر و برنامه‌نویسی | `js/en/thinking.js` | 🔨 every built lesson (83; in `think-tree-16` the Persian typing practice stays in Persian) |
| ایران و جهان | `js/en/world.js` | 🔨 every built lesson (Iranian place names stay as they are) |
| خواندن و نوشتن انگلیسی | — | The course itself (instructions in Persian, the English it teaches) |

## Content types

Every lesson row below lists its content types. These are the names to use, with the step types that make them.

| Content type | What it is | Step types |
|---|---|---|
| **lesson** | Interactive teaching: show, explain, try with instant feedback | `intro`, `choose`, `trace`, `blend`, `clap`, `count` (in a line, circle or scattered, moved aside as counted, beats heard, or `flash`: dots, a die, fingers or a frame seen for a moment), `tenframe`, `make`, `numline`, `tens` (with packs of a hundred and boxes of a thousand), `compare` (with `match`: two groups put side by side one to one), `shape`, `measure`, `money`, `fraction` (cut, colour, name and share equal parts), `chart` (read, make and add to picture graphs and bar charts), `pixels` (colour squares by a number code to make a picture, or read a picture's code), `flowchart` (follow a flowchart box by box, answering its questions, or fill its empty boxes), `binary` (flip dot cards 16, 8, 4, 2, 1 to make or read a number), `train` (teach a program with labelled examples, then see what it guesses), `type` (touch typing on an on-screen keyboard in Persian or English, the next key and its finger lit; not scored), `pycode` (Python: a small offline Python in the browser, with Persian error messages, hidden tests, a turtle and blocks beside the code; or what does this code print?), `sheet` (a small spreadsheet: cells, SUM and AVERAGE formulas, sorting, a bar chart), `graph` (towns and roads: the shortest way, the least road joining all towns, colouring neighbours differently), `gates` (switches, AND, OR, NOT and XOR gates and a lamp: fill the truth table or pick the gate; a half adder), `clock` (read a clock, set its hands), `boxes` (sound boxes: a counter, or the letter, in a box for each sound of a heard word), `mark` (tap the words of a kind in a sentence: names, verbs, describing words), `balance` (two-pan balance: which side is heavier, making it balance; unknowns as labelled things); `bar` (the bar model: parts and a whole, two bars to compare, equal units; mark the numbers, find the «؟», pick the model that fits), `column` (written + − × digit by digit, carrying and borrowing beside bundles, decimals lined up), `array` (rows × columns: count, turn, build, split; the area model), `grid` (squared grid: count area and perimeter, draw shapes, find and plot places with or without axes, move and turn a shape or robot), `mirror` (complete a symmetric picture, find lines of symmetry), `spinner` (repeat a chance experiment with a spinner, a bag of marbles, a die or a coin, and tally), `numline` with fractions and decimals (place, name, cut 0–1, hop by a fraction; fraction strips); English: `words`, `listen`, `letter`; maps: `map` (tap places on a picture map, a symbol map with a legend, the map of Iran, the region with Iran's neighbours or the world: provinces, countries, continents, oceans, seas, capitals, the equator, Iran's relief, mountains and deserts; follow a route; find my province; a letter-and-number grid: tap or name a square; a scale bar: about how far; flags on the countries), `compass` (turn to north, south, east, west); history: `timeline` (put pictures and events in place, in fuzzy bands such as now, when grandparents were small, long ago, or by years with named eras; two rows such as Iran and the world), `record` (the child says it, hears it back next to the model; stays on the device, never stored or sent; a parent checklist; not scored), `dialogue` (a role play in a scene: the characters talk and the child takes one part, choosing each line and then saying it aloud) |
| **game** | Learning game; the move *is* the skill (`practice: true` on `pairs`, `order` or `sort`: never scored) | `pairs`, `build`, `order`, `sort` (cards, tiles and baskets can show a country's flag, `flag: "fr"`; `flag: "iran"` is the flag the parent chose, or an empty flag that asks), `feed` (with `plates`: share equally between several plates, with a bowl for the remainder), `pattern`, `track` (a number board game: roll, move counting each square), `tangram` (fill an outline with shapes, turning them), `logicgrid` (a logic grid of ticks and crosses from clues, or a 4 × 4 or 6 × 6 sudoku) |
| **animation** | Animated picture explanation or story, play/pause/replay (`scene` shows real actions: moving parts, paths, views, the child doing it; `story` only moves whole pictures) | `scene`, `story` |
| **story** | Text the child reads (decodable) or a story heard and talked about | `passage`, `story` (with `question`), `talk`, `readaloud` (the child reads aloud, the parent marks the hard words, then a re-read; not scored) |
| **inquiry** | Guess, try, see (science); look closely at a source (history) | `test`, `shadow`, `source` (look closely at an object, building, photo or old text: «چه می‌بینی؟ چه فکر می‌کنی؟ چه سؤالی داری؟», then who made it, when and why; questions for the parent; not scored) |
| **coding** | Block programs on a grid; a miss is something to debug | `code` (also repeat-until, if … else, a new block of your own, a counter with apples to pick, running one block at a time, one program for several boards), `turtle` (a pen that draws by length and angle), `stage` (characters with scripts started by the green flag or a tap; remixing a given program) |
| **calm** | Breathing, naming feelings, grounding and relaxing; never scored, answers never stored | `breathe` (optional `pattern`: box breathing), `feelings` (six faces, or the 13 feelings with `faces: "all"`; a reply for each feeling; a calm tool offered after some feelings), `body`, `ground`, `meter`, `relax`, `menu` (the child picks one of several steps to do, e.g. a calm tool; not scored) |
| **home** | A task away from the screen, shown inside a lesson: an experiment, a body activity, a thinking game, writing on paper (`paper`: a task with an example, the parent ticks a short checklist; not scored, the ticks are not kept) | `home`, `doit`, `move` (a guided movement routine: one move at a time shown by a moving person, counted aloud at a calm pace, easier and harder versions, a slow breath between moves; option `beat`), `unplugged`, `paper` |
| **parent tip** | A note for the parent at the end of a lesson: how to practise, how to talk about it | `tip`, `forparents` |
| **activity** | Daily off-screen suggestion in the parent's plan (not a lesson) | `B.ACTIVITIES` in `js/activities.js` |

Subject-specific step types live in `js/steps/` (`paper.js` for every subject, `reading.js`, `science.js`, `english.js`, `health.js`, `coding.js`, `thinking.js`, `feel.js`, `world.js`, `numbers.js`, `measure.js`, `math2.js`). A new step type
must be added to this table, or `tools/check-plan.js` fails.

---

## Outside lessons

| St | What | Where | Plan |
|---|---|---|---|
| ✅ | Placement check for فارسی and ریاضی | `B.PLACEMENT` in `js/content.js` | Other subjects have none: they start at their `defaultLevel` or the child's Persian garden |
| ✅ | Daily off-screen activities, 6 per garden | `js/activities.js` | Add science, English, health and coding activities once those subjects ship |
| ✅ | Parent guide, method, policies | `guide.html`, `method.html`, `policies.html` | When Tree/Forest lessons ship, update the line in `guide.html` saying they are coming |
| 🔨 | Animations that show what they say | `js/scene.js`, `js/art/rig*.js`, `tools/storyboard.html` | Every animation in every subject is now a `scene` step (no `story` left): 92 lessons, 606 frames, checked against their captions in the storyboard. The engine has moving parts, paths, walking people (`walker`, full bodies for every person emoji), camera pans with depth, the child rubbing or tapping, and a slower pace. Left: commit, then teacher review of the pictures |
| 🔨 | Practice generators (the framework) | `js/practice.js` (registry, context, sessions, spaced repetition), `js/practice/<subject>.js` (the generators), «تمرین» on each garden's page (`js/app.js`), `browse.html`, `tools/check-plan.js`, `tools/check-reading.js` | Built: the registry and the plan link (the Id column of every practice table), sessions mixing generators, interleaved, in Persian or English, missed items brought back next time and then after 1, 3 and 7 days (kept with the child's profile, backed up and synced), the content browser's fresh samples, and [practice in the course](#practice-in-the-course): each garden's path (lesson → its practice set → … → unit quiz), set reviews at 1–120 days mixed into one «مرور», quizzes with stars, practice in the parent's weekly plan and log. Still to do: every lesson in Seed, Sprout and Sapling with at least 3 generators (`node tools/check-plan.js --coverage`), practice following the depth a parent chooses |
| ⬜ | Depth per subject, chosen by the parent | «بخش والدین» (`js/app.js`, `js/plan.js`) | «پایه»، «کامل»، «همراه مدرسه» per child and subject (see [depth](#a-full-curriculum-as-deep-as-each-family-wants)). Core shows only `core` lessons; alongside school asks for the school grade and puts that grade's objectives first. The weekly plan and the daily time follow the depth |
| ⬜ | Recorded audio for every lesson | `audio/` | Record Seed and Sprout first (children who cannot read yet need it most) |
| ⬜ | «ایران و جهان» in the parent guide and the method page | `guide.html`, `method.html` | A method section on inquiry, maps, historical thinking and windows-and-mirrors, with references (C3 Framework, Seixas, Bishop), and the neutrality rules for history |
| 🔨 | Iran's flag, chosen by the parent | «بخش والدین» (`js/app.js`, `js/strings.js`), stored with the family's settings (`B.family()` in `js/common.js`) | Built: the current flag, the lion-and-sun flag, or not chosen (the default), drawn side by side with plain names and no comment; for every child in the family; kept in backups, merged (the copy changed last wins) and synced to the home hub (`desktop/src-tauri/src/hub.rs` keeps `family`). Lessons ask for `flag: "iran"`; until a parent chooses, the child sees an empty flag with «پرچم ایران را از پدر و مادرت بپرس.» |
| 🔨 | Map data for «ایران و جهان» | `js/maps/` | Simplified SVG outlines from Natural Earth (public domain), self-hosted and small; no outside requests. **Built:** Iran (`js/maps/iran.js`, made by `tools/build-iran-map.js`: provinces, seas, provincial centres, neighbours as plain shapes, the scale), Iran's relief (`js/maps/iran-relief.js`, same tool: height bands from NOAA's ETOPO1, public domain; the Alborz and Zagros, Dasht-e Kavir and Lut, four peaks), the region and the world (`js/maps/region.js`, `js/maps/world.js`, made by `tools/build-world-map.js`: a chosen set of 77 named countries with capitals, Iran's neighbours by land and sea, seas, continents, oceans, the equator; every other country and every disputed area a plain shape with no name), and flags (`js/maps/flags.js`, made by `tools/build-flags.js` from public-domain files on Wikimedia Commons; Iran's two flags are used only through the parent's choice). Left out for now: Oman's flag (its file on Commons is under Oman's own licence, not public domain: to be drawn) and Afghanistan's (which flag to show is for the reviewers). Still to do: the world's relief, thematic maps and layers, latitude and longitude lines, trade routes drawn as paths |
| ⬜ | Reviewers for «ایران و جهان» | `policies.html#accuracy` | A history or geography teacher reviews every lesson; speakers of each language record the «سلام» audio |
| ⬜ | Off-screen activities for «ایران و جهان» | `js/activities.js` | Oral history with grandparents, drawing the street, a museum or old-house visit, a regional dish |

## New step types

Built in this order (the first ones unlock the most lessons). When one is built, document it in `README.md`
and remove the 🆕 from the rows that use it.

| Step type / option | What it does | Used by |
|---|---|---|
| `count` with `flash`, `track`, `tangram` | Subitising (dots, dice, fingers, frames seen for a moment), the linear number board game (Siegler & Ramani), filling an outline with shapes. **Built** (`js/steps/numbers.js`) | `math-seed-11/13/31`, `math-sprout-14`, `math-seed-24` |
| `paper` | A writing task on paper with a short checklist for the parent; not scored. **Built** (`js/steps/paper.js`) | `read-tree-11`, `read-tree-12`, `read-forest-2/7/9`, `english-sapling-8`, `english-tree-6`, `english-forest-4`, `world-forest-8/10`, `world-forest-14` |
| `fraction` | Cut a shape or a set into parts and colour some. **Built** (`js/steps/numbers.js`): shapes (circle, square, bar, sangak) cut into any number of parts, sharing a set | `math-sapling-19`, `math-tree-9/10`, `math-forest-1` |
| `clock` | Read and set clock hands. **Built** (`js/steps/measure.js`): o'clock and half past, and any minutes with `snap` | `math-sapling-15`, `math-tree-13` |
| `balance` | Two-pan balance (mass, then equations, levers). **Built** (`js/steps/measure.js`): two pans, unknowns, and the lever (`lever: true`: things on seats at a distance from the middle) | `math-sapling-16`, `math-forest-8`, `science-tree-3` |
| `chart` | Read and add to picture graphs and bar charts. **Built** (`js/steps/numbers.js`), bar charts with `bars: true` | `math-sapling-20`, `math-tree-18`, `math-forest-12`, `science-forest-7`, `world-forest-7` |
| `array` area model with fractions, decimals and letters | The area model in `array` with parts that are fractions, decimals or algebra (`array` itself is **built**, `js/steps/math2.js`: counting, turning, building, splitting, whole-number area models) | `math-tree-27/31`, `math-forest-27` |
| `column` division and signed decimals | Long division in the textbook layout, × and ÷ of decimals (`column` itself is **built**, `js/steps/math2.js`: + − × digit by digit, decimals in + and −) | `math-tree-7`, `math-forest-2` |
| `grid` vectors, tilted squares, enlargements | Arrows between points, squares drawn on slanted sides, scaling a shape (`grid` itself is **built**, `js/steps/math2.js`: area, perimeter, drawing, finding, plotting with axes, moving and turning) | `math-forest-23/29/39/45` |
| `tens` hundreds/thousands | Flats and cubes in the place-value step. **Built** (`js/engine.js`) | `math-sapling-17`, `math-tree-1` |
| `feed` with place-value pieces | Sharing hundreds, tens and ones between plates, opening a bundle when it does not share (`feed` with `plates` is **built**, `js/steps/math2.js`) | `math-tree-6` |
| `map` | Tap, find and label places on an SVG map: picture maps (room, neighbourhood), Iran and its provinces, the region, the world; optional routes. **Built** (`js/steps/world.js`): picture maps, finding, routes, symbol maps with a legend, the map of Iran (provinces, seas, cities, my province), Iran's relief with its mountains and deserts, the region with Iran's neighbours, the world (continents, oceans, countries, capitals, the equator), flags on countries, a letter-and-number grid (tap or name a square) and a scale bar (about how far). Still to do: the world's relief, thematic maps and layers, latitude and longitude lines, trade routes drawn as paths | `world-seed-2/4`, `world-sprout-2/4/7/8`, `world-sapling-1/2/3/7/8/9`, `world-tree-4/8/10/11`, `world-forest-2/4/7/9`, `world-forest-13` |
| `compass` | Turn to north, south, east and west; the sun's path. **Built** (`js/steps/world.js`) | `world-sprout-3/8` |
| `circuit`, `ramp` | Small science simulations | `science-tree-1`, `science-tree-2` |
| `pixels` | Colour the squares of a grid by a number code, or read a picture's code. **Built** (`js/steps/thinking.js`); RGB colours and run-length codes still to do | `think-sapling-15`, `think-forest-2` |
| `code` if, until, function, counter, step-by-step, several boards | Conditions, repeat until, functions, variables, running a block at a time. **Built** (`js/steps/coding.js`) | `think-tree-1/2/5/6/9` |
| `turtle`, `flowchart`, `binary`, `type`, `train`, `logicgrid`, `stage` | Pen drawing, flowcharts, binary cards, typing, teaching a classifier, logic grids and sudoku, events. **Built** (`js/steps/thinking.js`); still to do: bytes and letters in `binary`, Python turtle | `think-tree-3` to `think-tree-23`, `think-forest-2/8/20` |
| `pycode`, `sheet`, `graph`, `gates`, `pixels` RGB | Python text programming, spreadsheets, graph puzzles, logic gates, mixing light. **Built** (`js/steps/python.js`, `js/steps/thinking.js`); no lesson uses them yet | `think-forest-1` to `think-forest-24` |
