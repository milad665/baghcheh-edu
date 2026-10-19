# Baghcheh content plan · برنامه محتوای باغچه

This is the **single source of truth** for what Baghcheh teaches: every subject, garden, unit and lesson,
what each one covers, and which kinds of content it uses. Build lessons from this plan, and change the plan
first (in the same commit) whenever the content changes. `node tools/check-plan.js` checks that the plan and
`js/lessons/` agree.

Status: ✅ built (committed: children get it) · 🔨 being built (in `js/lessons/` but not committed yet) ·
⬜ planned (not written). `tools/check-plan.js` reads git to check ✅ and 🔨, so mark lessons ✅ in the same commit
that adds them. Expert review still to do is noted in each subject's introduction. Planned titles are working titles: polish them with
`STYLE.md` when the lesson is written. 🆕 marks content that needs a step type (or an option) that does not exist yet
(see [New step types](#new-step-types)).

**Lesson ids are permanent.** Children's progress and reviews are stored by id, so an id is never renamed,
reused or renumbered. A lesson inserted between two others gets the next free number; its place in the garden
comes from its position in the lesson file (and in this plan), not from the number.

## Subjects

| Subject | id | Lessons | Gardens | Starts at |
|---|---|---|---|---|
| فارسی | `read` | `js/lessons/read.js` | all five | placement check |
| ریاضی | `math` | `js/lessons/math.js` | all five | placement check |
| احساس‌های من | `feel` | `js/lessons/feel.js` | not leveled | — |
| علوم | `science` | `js/lessons/science.js` | all five | the child's Persian garden |
| خواندن و نوشتن انگلیسی | `english` | `js/lessons/english.js` | all five | Seed (`defaultLevel`) |
| سلامت و ایمنی | `health` | `js/lessons/health.js` | all five, plus lessons for every garden | the child's Persian garden |
| فکر و برنامه‌نویسی | `think` | `js/lessons/thinking.js` | all five | the child's Persian garden |
| ایران و جهان | `world` | `js/lessons/world.js` | all five | the child's Persian garden |

## Changing the plan

- **Adding, removing, moving or retitling a lesson, or changing what it covers or which content types it uses:**
  change its row here in the same commit. A new lesson gets a ⬜ row first, then 🔨 while it is written, then ✅.
- **Dropping a planned lesson:** delete its row (its id may then be used). A built lesson is never deleted, since
  children's progress refers to it; retire it by keeping it and saying so in "Covers".
- **A new subject:** a new `## <name> — subject \`<id>\`` section with one `### … — \`<level>\`` table per garden
  (`any` for `level: null`), and a row in the subjects table above.
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

## فارسی — subject `read`

Goal: from listening and talking (Seed) to reading and writing every letter (Sprout, Sapling), then reading for
meaning, vocabulary, grammar and writing (Tree, Forest). Letter order follows `tools/check-reading.js` (`TEACHES`).
Every letter lesson has the same shape: `intro` (sound, forms, example word; the letter is shown being written),
`choose` (find the letter / the sound), `trace`, `blend` (read syllables and words), and a `passage` once enough
letters are known.

### 🌰 دانه — `seed`

Pre-reading: oral language, listening, phonological awareness, telling shapes apart, how print works, pre-writing.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `read-seed-1` | کدام شبیه است؟ | Visual discrimination: shapes, then letter shapes | lesson (`choose`) |
| ✅ | `read-seed-2` | با هم ببینیم و بگوییم | Dialogic talk about picture scenes with a grown-up | story (`talk`) |
| ✅ | `read-seed-3` | بازی ببین و پیدا کن | Matching, sequencing, patterns | animation, game (`pairs`, `order`, `pattern`) |
| ✅ | `read-seed-4` | کلمه‌های هم‌قافیه | Rhyme: hear which words sound alike at the end (picture + spoken word) | animation, lesson (`choose` with `say`), game (`pairs`) |
| ✅ | `read-seed-5` | دست بزن، بشمار | Syllables: clap and count the parts of a word (one to three parts) | animation, lesson (`clap`, `choose`) |
| ✅ | `read-seed-6` | با چه صدایی شروع می‌شود؟ | First sound of a word (oral, pictures only): م، س، ب، ت | animation, lesson (`choose` with `say`), game (`sort` by first sound, `pairs`) |
| ✅ | `read-seed-7` | قصه گوش کن | Listening comprehension: three heard stories, what happened first/next/last, how a character felt, retelling | animation (`scene` + `question`), game (`order` with `numbered`), story (`talk`) |
| ✅ | `read-seed-8` | کتاب از کجا شروع می‌شود؟ | Print concepts: writing vs pictures, right to left, top to bottom, words and spaces, the first word | animation, lesson (`choose`), story (`talk` with a real book) |
| ✅ | `read-seed-9` | خط‌های رنگی | Pre-writing: lines top to bottom and right to left, slants, a bowl, hills, waves, zigzags, a circle; each shown being drawn first, then traced; drawing them on paper | lesson (`trace` with `path`), home (`doit`) |
| ✅ | `read-seed-10` | بازی صداها | Unit game: rhyme, syllables, first sound (پ، د) | game (`pairs` with `hidden`, `sort`) |

### 🌱 جوانه — `sprout`

First letters and short vowels; reading the first syllables and words.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `read-sprout-1` | «آ» و «ب» | آ ا ب; آب، بابا | lesson (`intro`, `choose`, `trace`, `blend`) |
| ✅ | `read-sprout-2` | «د» و «م» | د م | lesson |
| ✅ | `read-sprout-3` | «س» و «ـَ» | س and the short vowel ـَ | lesson |
| ✅ | `read-sprout-4` | بازی حرف‌ها و صداها | Unit game: letters ↔ sounds, building words | game (`pairs`, `build`, `sort`) |
| ✅ | `read-sprout-5` | اولین جمله‌ها | First decodable phrases with آ ب د م س ـَ (بابا آمَد. بابا آب داد.) | story (`passage`), lesson (`blend`) |
| ✅ | `read-sprout-6` | کلمه‌ها را بساز | Spelling with known letters: hear a word, build it letter by letter (dictation: no word or picture shown until the end) | game (`build` with `hidden` and `extra`) |

### 🌿 نهال — `sapling`

The rest of the alphabet, long and short vowels, letter forms, first sentences and passages, spelling.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `read-sapling-1` | «او» و «ت» | او (long u), ت | lesson |
| ✅ | `read-sapling-2` | «ر» و «ای» | ر، ای (long i) | lesson |
| ✅ | `read-sapling-3` | «ن» و «ز» | ن ز | lesson, story (`passage`) |
| ✅ | `read-sapling-4` | «ش» و «ـِ» | ش and the short vowel ـِ | lesson, story |
| ✅ | `read-sapling-5` | «ـُ» و «ک» | the short vowel ـُ, ک | lesson, story |
| ✅ | `read-sapling-18` | بازی کلمه‌ها | Unit game: words so far | game (`pairs`, `build`, `sort`, `order`) |
| ✅ | `read-sapling-6` | جمله بخوانیم، معنا بفهمیم | Reading sentences for meaning | story (`passage` ×4) |
| ✅ | `read-sapling-7` | «ه» و «ـه» | ه and final ـه (as a vowel) | lesson, story |
| ✅ | `read-sapling-8` | «پ» و «ل» | پ ل | lesson, story |
| ✅ | `read-sapling-9` | «ج» و «گ» | ج گ | lesson, story |
| ✅ | `read-sapling-10` | «چ» و «خ» | چ خ | lesson, story |
| ✅ | `read-sapling-11` | «ف» و «ق» | ف ق | lesson, story |
| ✅ | `read-sapling-19` | بازی کلمه‌ها ۲ | Unit game | game (`sort`, `build`, `pairs`, `order`) |
| ✅ | `read-sapling-12` | «یـ» و «ژ» | consonant ی, ژ | lesson, story |
| ✅ | `read-sapling-13` | «ص» و «ث» | ص ث (same sound as س) | lesson, story |
| ✅ | `read-sapling-14` | «ذ»، «ض» و «ظ» | ذ ض ظ (same sound as ز) | lesson, story |
| ✅ | `read-sapling-15` | «ط» و «ح» | ط ح | lesson, story |
| ✅ | `read-sapling-16` | «ع» و «غ» | ع غ | lesson, story |
| ✅ | `read-sapling-17` | «ـّ» و «ـً» | tashdid, tanvin | lesson, story |
| ✅ | `read-sapling-20` | «ء» و «ئـ» | hamza forms: ء alone, ئـ on a tooth, ئ (جزء، تئاتر، مسئله) | lesson, story |
| ✅ | `read-sapling-21` | بازی کلمه‌ها ۳ | Unit game: the last letters (ژ ص ح ط ع غ ذ، tashdid, tanvin, hamza) | game (`pairs`, `build`, `sort`) |
| ✅ | `read-sapling-22` | شکل‌های یک حرف | Letter forms: alone, start, middle, end (ب بـ ـبـ ـب; ن ع ه ی ج); where «ب» sits in a word | game (`pairs`, `sort`) |
| ✅ | `read-sapling-23` | حرف‌های هم‌صدا | Same sound, different letters: ت/ط، س/ص/ث، ز/ذ/ض/ظ، ه/ح، ق/غ، ا/ع | animation, game (`sort` by letter in known words) |
| ✅ | `read-sapling-24` | املا | Dictation: hear a word, build it letter by letter, with a same-sound letter among the tiles | game (`build` with `hidden`) |
| ✅ | `read-sapling-25` | جمله بساز | Order words into a sentence; full stop and question mark | game (`order` of words), lesson (`choose`) |
| ✅ | `read-sapling-26` | کلمه‌ها را به هم بنویس | Writing joined letters: the forms of «ب», then whole words (بابا، نان، لب، سیب، دست), each joined piece in one go, dots last | lesson (`intro`, `trace` with joined forms and whole words from `js/strokes.js`) |
| ✅ | `read-sapling-27` | قصه‌های کوتاه | Three short decodable stories (Rasht, Bushehr, Sanandaj), each shown as an animation first, then read, with questions | animation, story (`passage`) |
| ✅ | `read-sapling-28` | بلند بخوان | Fluency: five short passages read aloud; the parent marks the hard words, they practise them, the child re-reads (accuracy only, never a timer) | story (`readaloud`: parent-marked, not scored) |

### 🌳 درخت — `tree`

Reading stories and understanding them, vocabulary, first grammar, writing paragraphs, poetry. Texts are no
longer limited to taught letters (all are known), but keep vowel marks on hard words.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `read-tree-1` | قصه و آدم‌هایش | Story comprehension: who, where, what happened (literal) | animation, story (`passage`), game (`order`) |
| ⬜ | `read-tree-2` | چرا این‌طور شد؟ | Inference: why, how did they feel, what will happen next | story (`passage`), lesson (`choose`) |
| ⬜ | `read-tree-3` | هم‌معنی و مخالف | Synonyms and antonyms | game (`pairs`, `pairs` with `hidden`) |
| ⬜ | `read-tree-4` | خانواده کلمه‌ها | Word families and roots (دان، دانا، دانش، دانشمند) | game (`sort`, `build`) |
| ⬜ | `read-tree-5` | یکی، چندتا | Singular and plural: ـها، ـان | game (`sort`), lesson (`choose`) |
| ⬜ | `read-tree-6` | دیروز، امروز، فردا | Verb tense: past, present, future | game (`sort`), story (`passage`) |
| ⬜ | `read-tree-7` | بازی کلمه‌ها ۴ | Unit game: vocabulary and grammar so far | game |
| ⬜ | `read-tree-8` | به ترتیب الفبا | Alphabetical order; finding a word in a dictionary | game (`order`), lesson (`choose`) |
| ⬜ | `read-tree-9` | خار یا خوار؟ | Homophones and spelling in context (صد/سد، خار/خوار) | lesson (`choose` in a sentence) |
| ⬜ | `read-tree-10` | شعر بخوانیم | Children's poems: rhythm, rhyme, picturing the poem; learn one by heart | animation, game (`pairs` of rhyming words), home |
| ⬜ | `read-tree-11` | بند بنویسیم | Writing: order the sentences of a paragraph, then write one about a picture on paper | game (`order`), home · 🆕 `paper` (writing task on paper with a short checklist for the parent) |
| ⬜ | `read-tree-12` | خبر و نامه | Reading and writing a short letter or message | story (`passage`), home / 🆕 `paper` |

### 🌲 جنگل — `forest`

Longer literary and informational texts, main idea and summary, figurative language, opinion writing.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `read-forest-1` | متن علمی بخوانیم | Informational text: main idea and details | story (`passage`), lesson (`choose`) |
| ⬜ | `read-forest-2` | خلاصه کن | Summarising: pick the best summary, then write one | lesson (`choose`), 🆕 `paper` |
| ⬜ | `read-forest-3` | واقعیت یا نظر؟ | Fact and opinion | game (`sort`) |
| ⬜ | `read-forest-4` | ضرب‌المثل‌ها | Proverbs and what they mean | game (`pairs`), animation |
| ⬜ | `read-forest-5` | مثل ماه | Figurative language: تشبیه, personification | lesson (`choose`), story (`passage`) |
| ⬜ | `read-forest-6` | اسم، فعل، صفت | Parts of speech | game (`sort`) |
| ⬜ | `read-forest-7` | نظر من این است | Opinion writing: claim, two reasons, example | game (`order`), 🆕 `paper` |
| ⬜ | `read-forest-8` | حکایت‌های کهن | Short classical tales (e.g. adapted from گلستان) and poems on kindness and nature, retold simply | animation, story (`passage`) |
| ⬜ | `read-forest-9` | قصه خودم | Story writing: plan beginning, middle, end, then write | game (`order`), 🆕 `paper` |

---

## ریاضی — subject `math`

Goal: number sense through objects and pictures (Seed, Sprout), place value and the four operations
(Sapling, Tree), then fractions, decimals, early algebra, geometry and data (Tree, Forest). Concrete → pictorial
→ abstract throughout; ten-frames, number lines, bundles of ten and money from Iranian daily life.

### 🌰 دانه — `seed`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `math-seed-1` | شمردن تا پنج | Counting objects to 5 | lesson (`count`) |
| ✅ | `math-seed-2` | شمردن تا ده | Counting objects to 10 | lesson (`count`) |
| ✅ | `math-seed-3` | بازی غذا دادن | One-to-one, counting out a number, patterns | animation, game (`feed`, `pairs`, `pattern`, `order`) |
| ✅ | `math-seed-4` | بزرگ و کوچک | Size: bigger/smaller (bazaar, animals), longer/shorter, taller (children and a tree in the yard) | animation, lesson (`measure`, `choose`) |
| ✅ | `math-seed-5` | دسته کن | Sorting by colour (two, then three baskets), by shape (round / four-cornered, colours mixed), by size | game (`sort`) |
| ✅ | `math-seed-6` | کجاست؟ | Position words: بالا، پایین، جلو، پشت، کنار، داخل (picture stories with questions, then up/down with the body) | animation, lesson (`choose`) |
| ✅ | `math-seed-7` | شکل‌های دور و بر ما | Circle, square, triangle: naming them, then finding them in everyday things; a shape hunt at home | lesson (`shape`), home (`doit`) |
| ✅ | `math-seed-8` | الگو بساز | Repeating patterns AB, AAB, ABC (colours, salad, clapping, a carpet), filling one to three places | game (`pattern`) |
| ✅ | `math-seed-9` | عددها را بشناسیم | Numerals ۱–۵ ↔ quantities: each numeral shown with things, matched to dots and pictures, giving a numeral's worth, putting ۱–۵ in order | animation, game (`pairs` numeral ↔ dots, `feed`, `order`), lesson (`choose`) |
| ✅ | `math-seed-10` | بازی شمردن | Unit game: count out to 5, memory game numeral ↔ dots and pictures, order by quantity, count back from ۵ | game (`feed`, `pairs` with `hidden`, `order`) |

### 🌱 جوانه — `sprout`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `math-sprout-1` | قاب ده‌تایی | Ten-frame: see and build numbers to 10 | lesson (`tenframe`, `make`, `count`) |
| ✅ | `math-sprout-2` | چندتا تا ده؟ | Number bonds to 10 | lesson (`tenframe` with `missing`) |
| ✅ | `math-sprout-3` | عددهای ۱۱ تا ۲۰ | Teen numbers as ten and some more | lesson (`tenframe`, `make`, `choose`) |
| ✅ | `math-sprout-4` | بیشتر یا کمتر؟ | Comparing quantities and numbers | lesson (`compare`) |
| ✅ | `math-sprout-5` | جمع تا ده | Addition to 10 | lesson (`tenframe` with `plus`, `choose`) |
| ✅ | `math-sprout-6` | کم کردن تا ده | Subtraction to 10 | lesson (`tenframe` with `minus`, `choose`) |
| ✅ | `math-sprout-7` | شکل‌ها | Naming and recognising 2D shapes, turned and stretched | lesson (`shape`) |
| ✅ | `math-sprout-8` | بازی جمع | Unit game: addition | animation, game (`feed`, `pairs`, `order`, `pattern`) |
| ✅ | `math-sprout-9` | نوشتن عددها | Writing digits ۱–۹ and ۰, each shown being written first (۷ and ۸ side by side as opposites); Persian only, no English version | lesson (`trace` of digits) |
| ✅ | `math-sprout-10` | قبل و بعد | Number order to 20: before, after, between (house numbers in an alley, one hop on the number line, then numbers alone; putting ۱۱–۲۰ in order) | animation, lesson (`numline`, `choose`), game (`order` with `ltr`) |
| ✅ | `math-sprout-11` | قصه جمع و تفریق | Word problems to 10 told as stories: three animated stories to count (adding and taking away), then stories heard with the number sentence, then a story alone | animation (`story` + `question`), lesson (`choose`) |
| ✅ | `math-sprout-12` | صبح، ظهر، شب | Time order: parts of the day (a child's day from breakfast to bed), days of the week from شنبه to جمعه, the day before and after | animation, game (`order`), lesson (`choose`) |
| ✅ | `math-sprout-13` | بازی عددها تا بیست | Unit game: numbers to 20: counting out 12, teen numbers as two hands (ten) and dots, counting on, back from 20 and in twos | game (`pairs`, `pattern`, `feed`) |

### 🌿 نهال — `sapling`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `math-sapling-3` | جمع با ساختن ده | Make-ten strategy (8 + 5 = 8 + 2 + 3) | lesson (`tenframe`, `choose`) |
| ✅ | `math-sapling-1` | جمع با پرش قورباغه | Addition on the number line | lesson (`numline`) |
| ✅ | `math-sapling-2` | تفریق با پرش خرگوش | Subtraction on the number line | lesson (`numline`) |
| ✅ | `math-sapling-4` | دسته‌های ده‌تایی | Place value: tens and ones | lesson (`tens`) |
| ✅ | `math-sapling-5` | عددها تا ۱۰۰ | Reading and building numbers to 100 | lesson (`tens`, `choose`) |
| ✅ | `math-sapling-6` | مقایسه عددها | Comparing two-digit numbers, < = > | lesson (`compare`) |
| ✅ | `math-sapling-12` | زوج و فرد، الگوی عددها | Odd and even, number patterns, skip counting | animation, game (`sort`, `pattern`, `order`) |
| ✅ | `math-sapling-7` | جمع عددهای دورقمی | Two-digit addition with bundles | lesson (`tens` with `b`, `choose`) |
| ✅ | `math-sapling-8` | تفریق عددهای دورقمی | Two-digit subtraction, opening a bundle | lesson (`tens` with negative `b`, `choose`) |
| ✅ | `math-sapling-9` | اندازه‌گیری | Comparing and measuring length with units | lesson (`measure`) |
| ✅ | `math-sapling-10` | خرید از نانوایی | Money: adding prices, paying | lesson (`money`) |
| ✅ | `math-sapling-11` | خرید از بازار | Money: totals, paying the exact amount | lesson (`money` with `wallet`) |
| 🔨 | `math-sapling-13` | دوتایی‌ها و خانواده عددها | Doubles (eggs in two bowls, matching doubles to answers), near doubles from a double (۶ + ۷ = ۶ + ۶ + ۱), fact families (۳، ۴، ۷: from a sum to its differences; sorting sums and differences into their families) | game (`pairs`, `sort`), lesson (`choose`) |
| 🔨 | `math-sapling-14` | مسئله‌های قصه‌ای | Two-digit word problems: which operation, then the answer (cards from grandma, bread at the bakery, children in a class, buying a book), then a «how many more» problem alone | animation (`story` + `question`), lesson (`choose`) |
| 🔨 | `math-sapling-15` | ساعت | Telling time: o'clock and half past (the two hands, watching the long hand turn from ۳ to ۳ و نیم while the short hand moves on, turning them freely, then reading the clock and setting the hands at times of a child's day) | lesson (`clock`) |
| 🔨 | `math-sapling-16` | سنگین و سبک | Mass on a two-pan balance: heavier and lighter (bigger is not always heavier), trying things out, weighing fruit with kilogram weights, adding up weights on a held balance, making it balance | lesson (`balance`) |
| 🔨 | `math-sapling-17` | عددهای سه‌رقمی | Hundreds, tens and ones to 1,000: ten bundles tie into a pack of a hundred, reading and building three-digit numbers (a zero in the tens), opening a hundred to take away, comparing, after ۹۹۹ | lesson (`tens` with hundreds, `compare`, `choose`) |
| 🔨 | `math-sapling-18` | دسته‌های مساوی | Equal groups, repeated addition: the start of multiplication (plates of sweets for guests, feeding in groups, ۳ + ۳ + ۳ + ۳, word problems) | animation, game (`feed`), lesson (`choose`) |
| 🔨 | `math-sapling-19` | نصف و یک‌چهارم | Halves and quarters of a shape and of a number: sharing 8 biscuits between 2, then 4 (story), equal and unequal halves of a sangak, cutting bread and a cake, colouring and naming a part, sharing 8 sweets between 2 and 4 | animation, lesson (`fraction`) |
| 🔨 | `math-sapling-20` | نمودار تصویری | Reading and making a picture graph: favourite fruit (how many, fewest, how many more), animals on a farm put into a graph, adding to a weather graph, how children come to school | lesson (`chart`) |
| 🔨 | `math-sapling-21` | بازی بازار | Unit game: money, adding and subtracting (prices ↔ bills, what 30 thousand toman buys, paying, change, three things together) | game (`sort`, `pairs`), lesson (`money`) |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `math-tree-1` | عددهای بزرگ | Place value to 1,000,000, reading big numbers, rounding | lesson (`choose`, `compare`) · `tens` with thousands |
| ⬜ | `math-tree-2` | جمع و تفریق ستونی | Column addition and subtraction with carrying and borrowing | 🆕 `column` (written method, digit by digit) |
| ⬜ | `math-tree-3` | ضرب با آرایه | Multiplication as an array; commutativity | animation · 🆕 `array` |
| ⬜ | `math-tree-4` | جدول ضرب | Times tables 2–10 by patterns, not by rote | game (`pattern`, `pairs` with `hidden`), lesson (`choose`) |
| ⬜ | `math-tree-5` | ضرب دورقمی | 2-digit × 1-digit, then 2 × 2, with the area model | 🆕 `array` (area model), 🆕 `column` |
| ⬜ | `math-tree-6` | تقسیم: سهم مساوی | Division as sharing and grouping; remainders | animation, game · 🆕 `feed` with several plates |
| ⬜ | `math-tree-7` | تقسیم ستونی | Long division (3-digit ÷ 1-digit, as in the placement check) | 🆕 `column` (division layout) |
| ⬜ | `math-tree-8` | بازی ضرب و تقسیم | Unit game | game (`pairs`, `sort`, `pattern`) |
| ⬜ | `math-tree-9` | کسرها | Fractions as parts of a whole and of a set; on the number line | animation, lesson (`numline`, `fraction`) |
| ⬜ | `math-tree-10` | کسرهای مساوی | Equivalent fractions, comparing, adding with the same denominator | lesson (`fraction`, `compare`) |
| ⬜ | `math-tree-11` | عددهای اعشاری | Tenths and hundredths, with lengths (cm, m) | lesson (`measure`, `choose`) |
| ⬜ | `math-tree-12` | واحدهای اندازه‌گیری | Length, mass, volume units; converting | lesson (`measure`, `choose`), home |
| ⬜ | `math-tree-13` | زمان و تقویم | Minutes, hours, days, the months of the Persian calendar | lesson (`clock` with `snap: 5`), game (`order`) |
| ⬜ | `math-tree-14` | محیط و مساحت | Perimeter and area on a grid | 🆕 `grid` (count squares, draw shapes) |
| ⬜ | `math-tree-15` | زاویه و خط | Right angles, parallel and perpendicular lines | lesson (`shape`, `choose`) |
| ⬜ | `math-tree-16` | تقارن | Lines of symmetry, completing a symmetric picture | 🆕 `mirror` |
| ⬜ | `math-tree-17` | شکل‌های فضایی | Cube, cuboid, cylinder, sphere, cone; faces and edges | animation, game (`sort`) |
| ⬜ | `math-tree-18` | جدول و نمودار ستونی | Tables and bar charts | lesson (`chart` with `bars`) |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `math-forest-1` | عمل‌ها با کسر | Adding, subtracting, multiplying fractions | lesson (`fraction`, `choose`) |
| ⬜ | `math-forest-2` | عمل‌ها با اعشار | Decimal operations; money and measures | lesson (`choose`), 🆕 `column` |
| ⬜ | `math-forest-3` | درصد | Percentages: discounts at the bazaar | animation, lesson (`money`, `choose`) |
| ⬜ | `math-forest-4` | عددهای منفی | Integers on the number line, temperature | lesson (`numline`, `compare`) |
| ⬜ | `math-forest-5` | نسبت و تناسب | Ratio and proportion with recipes | animation, lesson (`choose`) |
| ⬜ | `math-forest-6` | عامل‌ها و عددهای اول | Factors, multiples, primes, divisibility | game (`sort`), 🆕 `array` |
| ⬜ | `math-forest-7` | توان | Powers and square numbers | 🆕 `array`, lesson (`choose`) |
| ⬜ | `math-forest-8` | معادله با ترازو | Unknowns and simple equations | lesson (`balance` with an unknown: a thing labelled «؟», both pans open, then `question`) |
| ⬜ | `math-forest-9` | از الگو تا عبارت | Number patterns → expressions | game (`pattern`), lesson (`choose`) |
| ⬜ | `math-forest-10` | مساحت شکل‌ها | Area of triangle, parallelogram, circle; angle sums | 🆕 `grid`, animation |
| ⬜ | `math-forest-11` | مختصات | Coordinates on a grid / a map | 🆕 `grid` with axes |
| ⬜ | `math-forest-12` | میانگین | Mean, median, reading data | lesson (`chart`, `choose`) |
| ⬜ | `math-forest-13` | احتمال | Chance: dice, spinners, experiments | 🆕 `spinner` (repeat an experiment, tally), home |

---

## احساس‌های من — subject `feel`

Not leveled (`level: null`): every child sees every lesson. Social and emotional learning, trauma-informed:
safety, calm, naming feelings, connection. **Never scored, answers never stored**, no right or wrong about
feelings. No frightening content; for worry and loss, the parent guide points to professional help.
Animal or child characters, everyday Iranian settings. Steps: `js/steps/feel.js`.
**Needs review by a child psychologist** (trauma-informed practice, the wording of every line said to the child,
the parent notes) before launch.

### همه — `any`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `feel-1` | نفس گل و شمع | Slow breathing (smell the flower, blow the candle); how do I feel now | calm (`breathe`, `feelings`) |
| ✅ | `feel-2` | اسم احساس‌ها | Naming feelings from faces and situations: خوشحال، غمگین، عصبانی، نگران، ترسیده، آرام; when do I feel them; how do I feel now | animation, game (`pairs` face ↔ word, `practice`), story (`talk`), calm (`feelings`) |
| ✅ | `feel-3` | احساس در بدن من | Where a feeling is felt in the body (happy, worried, angry), then slow breathing | animation, calm (`body`, `breathe`) |
| ✅ | `feel-4` | نفس مربعی | A second breathing pattern (in 4, hold 4, out 4, hold 4); how do I feel now | animation, calm (`breathe` `pattern`, `feelings`) |
| ✅ | `feel-5` | پنج چیز که می‌بینم | Grounding: 5 things I see, 4 I hear, 3 I touch, 2 I smell, 1 slow breath | animation, calm (`ground`, `feelings`) |
| ✅ | `feel-6` | وقتی نگرانم | Worry: a squirrel worried before the first day of school, telling a grown-up, breathing together; a parent note on when to get professional help (`guide.html#feelings`) | animation, story (`talk`), calm (`breathe`), parent tip (`forparents`) |
| ✅ | `feel-7` | دماسنج خشم | Anger: how big is my anger, what I can do instead (stop, breathe, say it) | animation, calm (`meter`, `breathe`), game (`sort`, `practice`) |
| ✅ | `feel-8` | دوستی و مهربانی | Being a friend, sharing, saying sorry; kind words (سلام، ممنون، بفرما، ببخشید) | animation, game (`pairs`, `practice`), story (`talk`) |
| ✅ | `feel-9` | وقتی دعوا می‌شود | Solving a conflict in steps: stop, breathe, say how I feel, find a way (taking turns) | animation, game (`order`, `practice`), story (`talk`) |
| ✅ | `feel-10` | خواب آرام | Bedtime routine and relaxing the body part by part | game (`order`, `practice`), calm (`relax`, `breathe`) |
| ✅ | `feel-11` | سه چیز خوب امروز | Gratitude and good moments: three good things today | animation, story (`talk`), home (`doit`) |

---

## علوم — subject `science`

Lessons in `js/lessons/science.js`, science step types (`test`, `shadow`, `home`) in `js/steps/science.js`.
Starts at the child's Persian garden (`B.levelOf`). Inquiry first: look, guess, try, explain; guesses are never
marked wrong. Every lesson ends with a safe experiment at home (`home`) with everyday things only: no fire, sharp
tools, electricity or chemicals. Seed and Sprout children may not read yet, so pictures, narration and the
parent's questions carry the lesson. Examples from Iran's nature: Caspian forests, Zagros oaks, the desert, the
Persian Gulf. The human body as health and hygiene belongs to `health`; science covers how the body works.

### 🌰 دانه — `seed`

Looking closely at the world around us.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `science-seed-1` | زنده یا غیرزنده؟ | Living and non-living things | animation, game (`sort`), lesson (`choose`), home |
| ✅ | `science-seed-2` | پنج حس | The five senses | animation, game (`pairs`), lesson (`choose`), home |
| ✅ | `science-seed-3` | دانه چطور سبز می‌شود؟ | How a seed grows; what a plant needs (water, light) | animation, game (`order`), lesson (`choose`), home |
| ✅ | `science-seed-4` | خانه و غذای حیوان‌ها | Animals, their homes and food | game (`pairs`, `sort`), animation, home |
| ✅ | `science-seed-5` | امروز هوا چطور است؟ | Weather and what we wear | animation, game (`sort`), home |
| ✅ | `science-seed-6` | رنگ‌ها را قاطی کن | Mixing colours: red, yellow, blue make orange, green, purple (guess, then mix) | animation, lesson (`choose`), home |

### 🌱 جوانه — `sprout`

Guess, try, see.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `science-sprout-1` | بخش‌های گیاه | Root, stem, leaf, flower, fruit | animation, game (`pairs`), lesson (`choose`), home |
| ✅ | `science-sprout-2` | یخ، آب، بخار | States of water | animation, game (`order`, `sort`), home |
| ✅ | `science-sprout-3` | روی آب یا زیر آب؟ | Floating and sinking | inquiry (`test` float), game (`sort`), home |
| ✅ | `science-sprout-4` | روز و شب | Day and night | animation, game (`order`, `sort`), home |
| ✅ | `science-sprout-5` | چهار فصل | Seasons and how nature changes | animation, game (`order`, `pattern`), home |
| ✅ | `science-sprout-6` | از چه ساخته شده؟ | Materials: wood, metal, plastic, glass, cloth; which float | animation, game (`sort`), inquiry (`test`), home |

### 🌿 نهال — `sapling`

Why does it happen?

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `science-sapling-1` | چرخه آب | Evaporation, clouds, rain | animation, game (`order`), lesson (`choose`), home |
| ✅ | `science-sapling-2` | آهنربا | What magnets pull | inquiry (`test` magnet), animation, game (`sort`), home |
| ✅ | `science-sapling-3` | نور و سایه | Light and shadow across the day | inquiry (`shadow`), lesson (`choose`), game (`sort`), home |
| ✅ | `science-sapling-4` | طبیعت ایران | Iran's habitats and the animals that live there | animation, game (`pairs`), lesson (`choose`), home |
| ✅ | `science-sapling-5` | هل دادن و کشیدن | Forces: push and pull | animation, game (`sort`), lesson (`choose`), home |
| 🔨 | `science-sapling-6` | چرخه زندگی | Life cycles: plant, frog, butterfly, hen | animation, game (`order`), home |
| 🔨 | `science-sapling-7` | چه کسی چه می‌خورد؟ | Food chains | game (`order`, `pairs`), animation, home |
| 🔨 | `science-sapling-8` | صدا از کجا می‌آید؟ | Sound and vibration | animation, home |

### 🌳 درخت — `tree`

After teacher review of the earlier gardens.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `science-tree-1` | مدار ساده | Electric circuits: battery, wire, bulb, switch (on screen only) | 🆕 `circuit` (build a circuit) |
| ⬜ | `science-tree-2` | اصطکاک و سطح شیب‌دار | Friction, ramps, speed | animation · 🆕 `ramp` (try surfaces) |
| ⬜ | `science-tree-3` | اهرم و قرقره | Simple machines | animation · 🆕 `balance` as a lever (things at a distance from the middle) |
| ⬜ | `science-tree-4` | ماه و منظومه شمسی | The moon's phases, the planets | animation, game (`order`) |
| ⬜ | `science-tree-5` | بازتاب نور | Mirrors, reflection, how we see | animation, home |
| ⬜ | `science-tree-6` | شبکه غذایی | Food webs and ecosystems in Iran | animation, game (`sort`, `pairs`) |
| ⬜ | `science-tree-7` | آزمایش منصفانه | Planning a fair test: change one thing | game (`order`), inquiry (`test`), home |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `science-forest-1` | ذره‌ها | Matter is made of particles; solids, liquids, gases | animation |
| ⬜ | `science-forest-2` | مخلوط و جداسازی | Mixtures and separating them (filter, evaporate, sieve) | home, game (`pairs`) |
| ⬜ | `science-forest-3` | شکل‌های انرژی | Forms of energy and how energy changes form | animation, game (`order`) |
| ⬜ | `science-forest-4` | سلول | Cells, the microscope, plant and animal cells | animation, game (`sort`) |
| ⬜ | `science-forest-5` | دستگاه‌های بدن | Digestion, breathing, circulation | animation, game (`order`) |
| ⬜ | `science-forest-6` | زمین زیر پای ما | Rocks, soil, how earthquakes happen (calm and factual) | animation, home |
| ⬜ | `science-forest-7` | دانشمند کوچک | The scientific method: question, guess, test, record, conclude | game (`order`), home, `chart` |

---

## خواندن و نوشتن انگلیسی — subject `english`

The English reading and writing course; speaking and understanding English also grow from playing the other
subjects' lessons in English ([Lessons in English](#lessons-in-english)). Lessons in `js/lessons/english.js`, English
step types (`words`, `listen`, `letter`, `tip`) in `js/steps/english.js`, writing on paper (`paper`) in `js/steps/paper.js`, the English voice in `js/english-voice.js`.
Every child starts at Seed (`defaultLevel: "seed"`). Seed gets the child ready to read: listening and speaking
first, meaning shown by pictures and actions (never by translation), lots of repetition. Sprout teaches the letters
and their sounds a few at a time (systematic phonics) and writing them; Sapling reading and writing short
sentences; Tree and Forest longer texts and short pieces of writing. Instructions are Persian and spoken; English is
written left to right and spoken with the device's English voice. Every lesson ends with a `tip` for parents, who
may not know English. Our own chants and texts only (no copyrighted songs). Every animation is a `scene` (drawings in
`js/art/rig-english.js`) where the picture does what the English says: people wave for hello, point for "this is",
touch their nose, clap, eat or push away; animals open their mouths for their sounds; a finger goes up for each number.

### 🌰 دانه — `seed`

Listen, point, say.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `english-seed-1` | سلام و خداحافظ | Hello, goodbye, my name is | animation, lesson (`words`, `listen`), parent tip |
| ✅ | `english-seed-2` | رنگ‌ها | Colours | animation, lesson (`words`, `listen`), game (`pairs`), parent tip |
| ✅ | `english-seed-3` | عددها تا ده | Numbers 1–10 | animation, lesson (`words`, `listen`), game (`pairs`), parent tip |
| ✅ | `english-seed-4` | حیوان‌ها | Animals | animation, lesson, game (`pairs`), parent tip |
| ✅ | `english-seed-5` | خانواده | Family words | animation, lesson, parent tip |
| ✅ | `english-seed-6` | بدن من | Body parts | animation, lesson, parent tip |
| ✅ | `english-seed-7` | خوراکی‌ها | Food and drink words; asking with «please» at breakfast | animation, lesson (`words`, `listen`), game (`pairs` with `hidden`), parent tip |
| ✅ | `english-seed-8` | بازی کلمه‌ها | Unit game: words from the Seed garden (animals, food, body, family, numbers, animal sounds) | game (`pairs`, `sort`) |

### 🌱 جوانه — `sprout`

Letters and their sounds, a few at a time; short words from them.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `english-sprout-1` | حرف‌های s a t p | Sounds s a t p; sat, pat, tap | lesson (`letter`, `listen`), game (`sort`, `pairs`, `build`), parent tip |
| ✅ | `english-sprout-2` | حرف‌های i n m d | i n m d | lesson, game (`sort`, `build`, `pairs`), parent tip |
| ✅ | `english-sprout-3` | حرف‌های g o c k | g o c k | lesson, game, parent tip |
| ✅ | `english-sprout-4` | حرف‌های e u r | e u r | lesson, game (`build`, `pairs`), parent tip |
| ✅ | `english-sprout-5` | حرف‌های h b f l | h b f l | lesson, game, parent tip |
| ✅ | `english-sprout-6` | حرف‌های j v w x y z q | The remaining letters (x heard at the end: box, fox; q with u: queen); fox | lesson (`letter`, `listen`), game (`pairs`, `build`), parent tip |
| ✅ | `english-sprout-7` | حرف بزرگ، حرف کوچک | Uppercase ↔ lowercase, b and d, names start with a capital (Sara, Reza) | game (`pairs`, `sort`), lesson (`listen`), parent tip |
| ✅ | `english-sprout-8` | کلمه‌های پرکاربرد | First sight words: I, a, the, is, see, my; reading «I see my cat.» | animation, game (`pairs`, `build`, `order`), lesson (`listen`), parent tip |
| ✅ | `english-sprout-9` | sh، ch، th | Two letters, one sound; fish, bath, shop | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip |
| ✅ | `english-sprout-10` | نوشتن حرف‌ها | Writing small letters on the line, from the right starting point, by family: round (c a d), tall sticks (l t), humps (n), s; the rest on paper (parent tip) | lesson (`trace` of Latin letters), parent tip |
| ✅ | `english-sprout-11` | نوشتن کلمه‌ها | Hear a short word, build it, then write it letter by letter (cat, sun; bed on paper) | game (`build`), lesson (`trace` of Latin letters), parent tip |

### 🌿 نهال — `sapling`

Short sentences, questions, everyday phrases.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `english-sapling-1` | I can see | Reading and building "I can see a …" | animation, lesson (`listen`), game (`order`, `pairs`), parent tip |
| ✅ | `english-sapling-2` | سؤال و جواب | What is this? It is a … | animation, lesson (`listen`), game (`order`), parent tip |
| ✅ | `english-sapling-3` | جمله‌های هر روز | Everyday phrases | animation, lesson (`words`, `listen`), game (`order`), parent tip |
| 🔨 | `english-sapling-4` | دوست دارم | I like … / I don't like …: hear, show with a face, read and sort sentences, build them | animation, lesson (`words`, `listen`), game (`sort`, `order`), parent tip |
| 🔨 | `english-sapling-5` | یکی، چندتا | Plural -s: one cat, two cats; hear it, read it, sort one / many | lesson (`words`, `listen`), game (`sort`, `pairs`), parent tip |
| 🔨 | `english-sapling-6` | کجاست؟ | in, on, under, next to, shown with pictures of where things are; hear it, then read the sentence | animation, lesson (`words`, `listen`), parent tip |
| 🔨 | `english-sapling-7` | قصه کوتاه | A short story heard first, then read with questions (Sara's dog and ball); a second one read alone (Reza's cat) | animation, story (`passage`), parent tip |
| 🔨 | `english-sapling-8` | نوشتن جمله | Writing a short sentence: capital letter, spaces between words, full stop; copy one, then write their own on paper | lesson (`listen`), game (`order`), `paper`, parent tip |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `english-tree-1` | هر روز | Present simple: daily routines | animation, game (`order`) |
| ⬜ | `english-tree-2` | روزها و ماه‌ها | Days of the week, months, the weather | game (`order`, `pairs`) |
| ⬜ | `english-tree-3` | الان چه می‌کنی؟ | Present continuous | animation, lesson (`listen`, `choose`) |
| ⬜ | `english-tree-4` | قصه‌های کوتاه | Reading short stories with questions | story (`passage`, `story` + `question`) |
| ⬜ | `english-tree-5` | توصیف کن | Adjectives: big, small, happy, tall… describing a picture | game (`sort`), animation |
| ⬜ | `english-tree-6` | بنویس چه می‌بینی | Writing two or three sentences about a picture | lesson (`listen`), 🆕 `paper` |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `english-forest-1` | دیروز | Past simple | story (`passage`), game (`sort`) |
| ⬜ | `english-forest-2` | گفت‌وگو | Everyday dialogues: shop, directions, introducing yourself | animation, lesson (`listen`, `choose`) |
| ⬜ | `english-forest-3` | متن بلندتر | Longer texts, main idea | story (`passage`) |
| ⬜ | `english-forest-4` | درباره من | Writing a short paragraph about yourself | game (`order`), 🆕 `paper` |

---

## سلامت و ایمنی — subject `health`

Lessons in `js/lessons/health.js`, step types `doit` (do something real with the body, away from the screen) and
`forparents` (the note that ends every lesson) in `js/steps/health.js`. Hygiene, food and water, sleep and play,
the body and feelings, body safety, and staying safe at home, on the street, when lost, in an emergency and in an
earthquake. Health facts follow WHO and UNICEF guidance; body safety follows the Council of Europe's
"Underwear Rule". Never frightening: practical and reassuring. **Needs review by a health professional and a
child-protection specialist before launch.** Feelings themselves belong to `feel`; how the body works to `science`.

### 🌰 دانه — `seed`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `health-seed-1` | دست‌هایم را می‌شویم | Handwashing step by step; washing before eating | animation, game (`order`), lesson (`choose`), home (`doit`), parent tip |
| ✅ | `health-seed-2` | مسواک می‌زنم | Brushing teeth: morning and night, a pea of toothpaste, the bedtime order | animation, lesson (`choose`), game (`order`, `pairs`), parent tip |
| ✅ | `health-seed-3` | بدن من | Body parts and what they do | animation, lesson (`choose`), game (`pairs`), home (`doit`), parent tip |
| ✅ | `health-seed-4` | آب و خوراکی | Water as the best drink; everyday and sometimes foods from the Iranian table (no diet or body-shape talk) | animation, game (`sort`), lesson (`choose`), home (`doit`), parent tip |

### 🌱 جوانه — `sprout`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `health-sprout-1` | عطسه و سرفه | Germs: sneezing into a tissue or the elbow, the bin, and when to wash hands | animation, lesson (`choose`), game (`order`, `sort`), parent tip |
| ✅ | `health-sprout-2` | در خانه مراقبم | Safety at home: medicines and cleaning products are for grown-ups; hot tea and stoves, sharp things, sockets | animation, game (`sort`), lesson (`choose`), parent tip |
| ✅ | `health-sprout-3` | در خیابان | Road safety: hold hands, stop-look-listen, the pedestrian light, safe places to play, seat belts | animation, game (`order`, `sort`), lesson (`choose`), parent tip |
| ✅ | `health-sprout-4` | اگر گم شدم | If I get lost: stay, ask a safe grown-up, know my parent's name and number | animation, lesson (`choose`), home (`doit`), parent tip |

### 🌿 نهال — `sapling`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `health-sapling-1` | خواب، بازی و نرمش | Sleep, play and exercise | animation, game (`sort`, `order`), lesson (`choose`), home (`doit`), parent tip |
| ✅ | `health-sapling-2` | احساس‌ها در بدن | Where feelings show in the body; calming down | animation, game (`pairs`), lesson (`choose`), calm (`breathe`), home (`doit`), parent tip |
| ✅ | `health-sapling-3` | لمس خوب، راز خوب | Safe and unsafe touch, good and bad secrets, keep telling until someone helps, five trusted grown-ups | animation, game (`sort`), lesson (`choose`), home (`doit`), parent tip |
| 🔨 | `health-sapling-4` | آتش و گرما | Fire safety at home: hot things in the kitchen and the samovar, matches and lighters are for grown-ups, smoke (get low, go out, tell a grown-up, ۱۲۵), «بایست، بخواب، غلت بزن» | animation, game (`order`), home (`doit`), parent tip |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `health-tree-1` | کمک‌های اولیه | First aid for small cuts, bumps and burns | animation, game (`order`), parent tip |
| ⬜ | `health-tree-2` | ایمنی در اینترنت | Personal information, strangers online, telling a grown-up | animation, game (`sort`), parent tip |
| ⬜ | `health-tree-3` | بدنم بزرگ می‌شود | Growing up (in general terms) | animation, parent tip |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `health-forest-1` | غذا و انرژی | Reading food labels, sugar, a balanced day | lesson (`choose`), game (`sort`), home |
| ⬜ | `health-forest-2` | مراقبت از ذهن | Stress, sleep and screens; asking for help | animation, story (`talk`), parent tip |

### همه باغچه‌ها — `any`

For every child, whatever their garden (`level: null`).

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `health-all-1` | بدن من مال خودم است | Body safety: my body belongs to me, private parts (the Underwear Rule), saying no, telling a trusted grown-up | animation, lesson (`choose`), home (`doit`), parent tip |
| ✅ | `health-all-2` | تمرین زلزله | Earthquake drill: بنشین، پناه بگیر، محکم نگه دار | animation, game (`order`), lesson (`choose`), home (`doit`), parent tip |
| ✅ | `health-all-3` | شماره‌های کمک | Emergency numbers (۱۱۵، ۱۲۵، ۱۱۰), getting out first if there is smoke, saying my address | animation, game (`pairs`), lesson (`choose`), home (`doit`), parent tip |

---

## فکر و برنامه‌نویسی — subject `think`

Lessons in `js/lessons/thinking.js`, step types `code` (block coding on a grid) and `unplugged` (a screen-free
thinking game for the parent) in `js/steps/coding.js`. Logical thinking before code: patterns, sorting,
sequences, conditions, then programs with arrows, turns and repetition. A program that misses is something to
fix, never a loss (debugging is the skill). Every lesson ends with an `unplugged` game.

### 🌰 دانه — `seed`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `think-seed-1` | الگوها | Spotting and continuing patterns | game (`pattern`), home (`unplugged`) |
| ✅ | `think-seed-2` | دسته‌بندی | Sorting by one rule (colour, kind), matching pairs, ordering by how many | game (`sort`, `pairs`, `order`), home (`unplugged`) |
| ✅ | `think-seed-3` | قدم به قدم | Sequences: the steps of everyday tasks | animation, game (`order`), home (`unplugged`) |
| ✅ | `think-seed-4` | راه لاک‌پشت | First programs: arrows on a small grid, going around a rock | coding (`code` arrows), home (`unplugged`) |

### 🌱 جوانه — `sprout`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `think-sprout-1` | کدام جور نیست؟ | Odd one out: finding the rule | lesson (`choose`), game (`sort`), home (`unplugged`) |
| ✅ | `think-sprout-2` | اگر… آن‌وقت… | Conditions in everyday life | lesson (`choose`), game (`sort`), home (`unplugged`) |
| ✅ | `think-sprout-3` | الگوهای سخت‌تر | Longer and growing patterns | game (`pattern`), home (`unplugged`) |
| ✅ | `think-sprout-4` | برنامه با فلش | Programs with arrows and walls | coding (`code` arrows), home (`unplugged`) |
| ✅ | `think-sprout-5` | اشکال را پیدا کن | Debugging: fix a given program | coding (`code` with `given`), home (`unplugged`) |

### 🌿 نهال — `sapling`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `think-sapling-1` | به چپ بچرخ، به راست بچرخ | Left and right from the character's point of view; first forward-and-turn program | lesson (`choose`), coding (`code` turn), home (`unplugged`) |
| ✅ | `think-sapling-2` | جلو برو، بچرخ | Forward and turn blocks | coding (`code` turn), home (`unplugged`) |
| ✅ | `think-sapling-3` | تکرار | The repeat block; shorter programs within a block limit; fixing a repeat count | animation, coding (`code` with `repeat`), home (`unplugged`) |
| ✅ | `think-sapling-4` | مرتب کردن | Ordering numbers and the days of the week; sorting by swapping neighbours (an algorithm) | game (`order`, `sort`), animation, home (`unplugged`) |
| ✅ | `think-sapling-5` | برنامه‌های بزرگ‌تر | Longer programs combining turns and repeats within a block limit, including one to debug | coding (`code` with `repeat`, `given`), home (`unplugged`) |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `think-tree-1` | اگر دیوار بود | Conditions inside programs | 🆕 `code` if-block |
| ⬜ | `think-tree-2` | دستور تازه بساز | Functions: name a group of blocks and reuse it | 🆕 `code` function block |
| ⬜ | `think-tree-3` | جست‌وجو | Searching: guess the number, halving each time | game, home (`unplugged`) |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `think-forest-1` | متغیر | Variables: a box that keeps a number | 🆕 `code` with a counter |
| ⬜ | `think-forest-2` | عددهای دودویی | Binary numbers with cards | animation, home (`unplugged`) |

---

## ایران و جهان — subject `world`

People, places and the past: Persian culture and the cultures of the world, maps and geography (Iran's and the
world's), countries, and the history of Iran and of the world. One integrated course instead of separate history,
geography and social-studies lessons, so a child meets a place, its people and its past together (Isfahan is a
city on a map, a Safavid capital, and a bazaar where people work today).

**Approach (modern practice):**

- **From near to far, and back.** Each garden widens the circle (me and my home → neighbourhood and city → Iran →
  the world → the world through time), but every unit starts from the child's own life and comes back to it
  (expanding horizons, with place-based learning: the child's own street, city and province are the first sources).
- **Inquiry, not memorising.** Every unit has a compelling question the child can answer by the end («چرا
  یزدی‌ها بادگیر ساختند؟»، «غذای ما از کجا می‌آید؟»), worked out from pictures, maps, objects and short texts
  (inquiry arc of the C3 Framework, NCSS 2013). Facts such as capitals and provinces are practised as games and
  come back in reviews, but they are never the goal of a lesson on their own.
- **Thinking like a geographer:** reading and making maps step by step (a picture of a room from above → a
  neighbourhood map with a legend → the map of Iran → the globe), directions, scale, and asking why things are
  where they are (where people live, what grows there, why).
- **Thinking like a historian** (from Tree; Seixas' historical thinking concepts): putting things in order on a
  timeline, what changed and what stayed the same, causes and consequences, how we know (evidence from objects,
  buildings and writing), and how people at the time saw things. History is told through what people built,
  invented, traded, wrote and ate, and through ordinary people's daily lives, not through kings and battles.
- **Windows and mirrors.** Persian and Iranian cultures are a mirror (the child sees their own life); other cultures
  are windows. Show real children's everyday lives (school, food, games, homes), similarities first, then
  differences, and avoid the "tourist approach" (only costumes and festivals) and stereotypes.
- **Iran is many peoples.** Persians, Azerbaijanis, Kurds, Lurs, Baluch, Arabs, Turkmen, Gilaks, Mazandaranis,
  Armenians, Assyrians and others, with their languages, music, crafts and foods, are all part of Iran's culture and
  history (`method.html#language`). No ethnic group is shown as more Iranian than another.
- **Modern settings.** Today's Iran and today's world appear next to the past: metro and railways, a science park,
  a nature reserve, a village school, a port. Virtual field trips (animated tours) to UNESCO World Heritage
  sites in Iran and around the world.
- **Off the screen:** interviewing grandparents (oral history), drawing a map of the street, cooking a regional
  dish, visiting a museum or an old house, finding Iran on a globe.

**Neutrality and safety** (`policies.html`), stricter here than anywhere else:

- **Political history of Iran goes up to the Constitutional Revolution** (مشروطه، ۱۲۸۵): what a constitution and a
  parliament are, and that people asked for law. After that, **the 20th century and today are told without
  politics**: daily life, science, technology, cities, the arts and the environment.
  - Periods are named by years («ایران در سال‌های ۱۳۰۰ تا ۱۳۳۰»), never by rulers, dynasties or governments.
  - No leaders and no pictures of leaders; no revolutions, wars, elections or current events after ۱۲۸۵.
  - The test for every sentence: would a family that supports the government and one that opposes it, inside Iran
    and abroad, both read it without objecting? If not, it goes.
  - Seeing an event from several sides is practised on distant history only (how Greeks and Persians described each
    other, how two travellers saw Isfahan), so the skill is learned without today's politics.
  - Family history comes from the family: the child interviews a grandparent about school, games and home; the
    parent note asks to keep it to everyday life.
- **Religion:** no doctrine, no religious holidays and no judgement of any faith. Where history needs it (for example
  how the language and script changed after the 7th century), one short factual sentence, checked by reviewers.
  Places of worship can appear only as architecture (tilework, domes), described as buildings.
- **No glorifying conquest and no battle scenes.** Empires are shown through what they built and how many peoples
  lived and worked together; invasions, if mentioned, through what changed and what was rebuilt (the Maragheh
  observatory after the Mongols).
- **Maps:** borders as on Natural Earth's de facto map; disputed areas are not labelled, and country games use a
  chosen set of countries (Iran's neighbours, then a few per continent), not every country. Names as in Iranian
  schools (خلیج فارس، دریای خزر، دریای عمان).
- **Flags:** every country's flag is shown, except Iran's. Iran's flag is a family's choice: in «بخش والدین» a
  parent can pick the current flag or the lion-and-sun flag (listed side by side, with plain descriptive names and
  no comment), or leave it unset. Lessons never draw Iran's flag themselves; they ask for it (`flag: "iran"`) and get
  the parent's choice. While nothing is chosen, the child sees an empty flag with «پرچم ایران را از پدر و مادرت
  بپرس.» The choice stays on the device like all settings. No anthems of any country.
- **Accuracy:** every lesson is checked by a history or geography teacher before it is published; sources are noted
  in a comment above each lesson. Lessons on the 20th century and today are also checked by two reviewers with
  different views.
- Overlap with other subjects: `science` teaches nature (habitats, animals, climate as science); `world` teaches
  how people live with that nature. Festivals and food are culture here, never religion.

### 🌰 دانه — `seed`

Me, my family, my home, my neighbourhood; the first picture maps; Nowruz; children around the world.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `world-seed-1` | من و خانواده‌ام | My family: who is who, what we do together; every family is different (families in Shiraz, Gonbad, Rasht, Ahvaz) | animation, story (`talk`), game (`pairs`), home |
| ✅ | `world-seed-2` | خانه ما از بالا | Looking from above: a room seen from above, finding things on a picture map of a room and of a whole home; a ball from above is a circle | animation, `map` (picture map), lesson (`choose`), home (draw a map of your room) |
| ✅ | `world-seed-3` | محله ما | Places in the neighbourhood (نانوایی، مدرسه، پارک، درمانگاه) and the people who work there; crossing the street with a grown-up | animation, `map` (neighbourhood, tap to hear), game (`pairs`, `sort`), lesson (`choose`), home (walk and name places) |
| ✅ | `world-seed-4` | راه خانه تا نانوایی | Following a route on a picture map; near and far | animation, `map` (route, near / far), game (`order`), home (walk and draw the route) |
| ✅ | `world-seed-5` | نوروز | Nowruz: spring, cleaning the house, سبزه, هفت‌سین, visiting family, عیدی | animation, game (`pairs` with `hidden`, `sort`), lesson (`choose`), story (`talk`), home |
| ✅ | `world-seed-6` | بازی‌های بچه‌های ایران | Traditional games (لی‌لی، هفت‌سنگ، یه‌قل‌دوقل، قایم‌موشک) played by children in Tehran, Tabriz, Khorramabad and Chabahar | animation, lesson (`count`), home (`doit`) |
| ✅ | `world-seed-7` | بچه‌های دنیا | Children around the world (Iran, Japan, Kenya, Brazil): food, school, games, weather, hello; same first, then different | animation, game (`sort` same / different, `pairs`), story (`talk`) |
| ✅ | `world-seed-8` | بازی خانه و محله | Unit game: workers and places, rooms of a home, a day with the family, Nowruz in order | game (`pairs` with `hidden`, `sort`, `order`) |

### 🌱 جوانه — `sprout`

My city or village, the map of Iran, directions, the festivals of the year, the languages of Iran.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `world-sprout-1` | شهر و روستا | Life in a city (Mashhad) and in a village (Kurdistan): homes, work, getting around; what is the same in both | animation (with `question`), game (`sort` city / village / both, `pairs`), story (`talk`) |
| 🔨 | `world-sprout-2` | نقشه چیست؟ | From a picture to a map: a village seen from above, then the same village with symbols and a legend (راهنمای نقشه) | animation, `map` (picture map, then symbols with a legend), game (`pairs` thing ↔ symbol), lesson (`choose`), home (draw your street with symbols) |
| 🔨 | `world-sprout-3` | شمال، جنوب، شرق، غرب | The four directions; the sun rises in the east, is in the south at noon (in Iran) and sets in the west; facing north, east is on the right; a compass shows north | animation, `compass` (with the sun; only north shown), lesson (`choose`), home (label the walls of a room) |
| 🔨 | `world-sprout-4` | ایران روی نقشه | The shape of Iran, the Caspian Sea, the Persian Gulf and the Sea of Oman, big cities found with directions, the provinces, finding my own province | `map` (Iran: seas, cities, provinces, my province), home (find Iran on a globe or atlas) |
| 🔨 | `world-sprout-5` | جشن‌های سال | Festivals through the year: Nowruz, سیزده‌به‌در، مهرگان، یلدا، چهارشنبه‌سوری (and fire safety) | animation, game (`order` on the year, `pairs`), lesson (`choose`), story (`talk`) |
| 🔨 | `world-sprout-6` | سلام به زبان‌های ایران | Hello and thank you in Azerbaijani, Kurdish, Arabic, Turkmen, Balochi and Armenian; every language is valuable. The words are shown, never said by the device voice: **needs recordings by native speakers** (a slot per word) | animation, game (`pairs`), story (`talk`), home (ask how grandparents say it) |
| 🔨 | `world-sprout-7` | سفره‌های ایران | Regional foods and why they grow there (rice in Gilan, dates in Bushehr, pistachios in Kerman, saffron in Khorasan, fish on the coasts) | animation, `map` (Iran's provinces), game (`pairs`), story (`talk`), home (cook one dish) |
| 🔨 | `world-sprout-8` | بازی نقشه | Unit game: the seas of Iran, directions, a symbol map, city and village, festivals, where foods grow | game (`pairs` with `hidden`, `sort`), `map`, `compass` |

### 🌿 نهال — `sapling`

Iran's land, climate, provinces and peoples; how people live with a dry land; the continents and oceans; Iran's
neighbours.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `world-sapling-1` | کوه، دشت، کویر، دریا | Landforms of Iran: Alborz, Zagros, Damavand, Dasht-e Kavir, Lut, the coasts | animation, 🆕 `map` (relief) |
| ⬜ | `world-sapling-2` | چهار فصل در یک روز | Iran's climates: snow in Ardabil while it is warm in Chabahar; why | animation, game (`sort` cities by climate), `map` |
| ⬜ | `world-sapling-3` | استان‌های ایران | The provinces and their centres; my province | `map` (provinces), game (`pairs` with `hidden`) |
| ⬜ | `world-sapling-4` | قنات و بادگیر | Living with little water: qanat, windcatcher, ab-anbar, yakhchal (inquiry: why did people build them?) | animation, game (`order`), home |
| ⬜ | `world-sapling-5` | بازار و کاروانسرا | Trade then and now: the bazaar, caravanserais, today's markets and ports | animation, game (`sort` then / now) |
| ⬜ | `world-sapling-6` | دست‌های هنرمند | Crafts of Iran by region: carpet, tilework, قلمکار، خاتم، pottery | animation, game (`pairs`), home |
| ⬜ | `world-sapling-7` | قاره‌ها و اقیانوس‌ها | The seven continents and five oceans; the globe and the flat map | animation, 🆕 `map` (world) |
| ⬜ | `world-sapling-8` | همسایه‌های ایران | Neighbouring countries by land and sea, their capitals and languages; Nowruz shared with neighbours | 🆕 `map` (region), game (`pairs`) |
| ⬜ | `world-sapling-9` | ایران‌گردی | Unit game: a virtual trip around Iran's World Heritage sites | animation (tour), game (`pairs`, `order`), `map` |

### 🌳 درخت — `tree`

The history of Iran from the first villages to the Safavids, how we know about the past, Iranian science and
writing; the countries and cultures of the world.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `world-tree-1` | از کجا می‌دانیم؟ | What history is; sources (objects, buildings, writing, memories); reading a timeline | animation, 🆕 `source` (look closely), 🆕 `timeline`, home (interview a grandparent) |
| ⬜ | `world-tree-2` | نخستین روستاها و شهرها | Farming, the first villages, Shahr-e Sukhteh, Jiroft, Susa and Elam | animation, 🆕 `source`, 🆕 `timeline` |
| ⬜ | `world-tree-3` | از خط میخی تا خط فارسی | How writing began and changed: cuneiform, Elamite, Old Persian, Pahlavi, today's Persian script | animation, game (`order`, `pairs`) |
| ⬜ | `world-tree-4` | تخت جمشید و راه شاهی | The Achaemenids: Persepolis, the Royal Road and the چاپار post, many peoples in one land | animation (tour), 🆕 `source` (the reliefs), 🆕 `map` |
| ⬜ | `world-tree-5` | جاده‌ها و دانشگاه‌ها | Parthians and Sasanians: the Silk Road, Gondishapur, inventions and games (نرد) | animation, 🆕 `timeline`, game (`sort`) |
| ⬜ | `world-tree-6` | زبان فارسی می‌ماند | Persian after the 7th century: new script, Rudaki, Ferdowsi and the Shahnameh's stories (gentle ones) | animation, story (`passage`), game (`order`) |
| ⬜ | `world-tree-7` | دانشمندان ایرانی | Khwarizmi, Razi, Ibn Sina, Biruni, Khayyam (the Jalali calendar), Tusi's observatory | animation, game (`pairs`), 🆕 `timeline` |
| ⬜ | `world-tree-8` | اصفهان نصف جهان | Safavid Isfahan: the square, the bridges, trade with the world | animation (tour), 🆕 `source`, 🆕 `map` |
| ⬜ | `world-tree-9` | خط زمان ایران | Unit game: putting Iran's history in order | 🆕 `timeline`, game (`order`, `pairs`) |
| ⬜ | `world-tree-10` | کشورها و پایتخت‌ها | Countries, capitals and flags by continent (a chosen set); Iran's flag as the family chose | 🆕 `map` (world), game (`pairs` with `hidden`) |
| ⬜ | `world-tree-11` | زندگی در آب‌وهوای مختلف | World climate zones and how homes, clothes and food fit them | animation, game (`sort`), 🆕 `map` |
| ⬜ | `world-tree-12` | یک روز با بچه‌های دنیا | A school day for children in five countries: same and different (inquiry) | animation, game (`sort`), story (`talk`) |
| ⬜ | `world-tree-13` | سال نو در دنیا | How people welcome the new year around the world; Nowruz across many countries | animation, game (`pairs`, `order`) |

### 🌲 جنگل — `forest`

World history and how civilisations were connected, Iran's place in it, the Qajar era and the Constitutional
Revolution, Iran in the 20th century and today (without politics), the world today and our shared planet; a
research project.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `world-forest-1` | تمدن‌های کهن | Mesopotamia, Egypt, the Indus, China, Greece and Rome, the Maya: comparing how they lived | animation, 🆕 `timeline`, game (`sort`) |
| ⬜ | `world-forest-2` | جاده ابریشم | Trade and ideas moving: paper, rice, oranges, numbers; Iran in the middle | animation, 🆕 `map` (routes), game (`pairs`) |
| ⬜ | `world-forest-3` | اختراع‌هایی که دنیا را عوض کرد | Paper, printing, the compass, Hindu–Arabic numbers, steam, electricity: causes and consequences | animation, game (`order`), 🆕 `timeline` |
| ⬜ | `world-forest-4` | نقشه‌های دنیا | How maps improved: Biruni measuring the Earth, travellers, satellites; different maps, different views | animation, 🆕 `source`, 🆕 `map` |
| ⬜ | `world-forest-5` | قاجار: دنیای تازه | The Qajar era: Dar ul-Funun, the first newspapers, photography, the telegraph; what changed and what stayed | animation, 🆕 `source`, 🆕 `timeline` |
| ⬜ | `world-forest-11` | مشروطه: قانون و مجلس | The Constitutional Revolution: people asked for law; what a constitution and a parliament are; the first مجلس (1285) | animation, 🆕 `source`, 🆕 `timeline`, lesson (`choose`) |
| ⬜ | `world-forest-6` | از کارگاه تا کارخانه | The industrial revolution, the growth of cities, and what it meant for daily life and nature | animation, game (`sort` before / after) |
| ⬜ | `world-forest-12` | ایران در قرن چهاردهم | Iran from about ۱۳۰۰ to ۱۳۷۰, by years: the railway, new schools and universities, more girls at school, radio, cinema, cities growing | animation, 🆕 `timeline`, game (`sort` before / after) |
| ⬜ | `world-forest-13` | ایران امروز | Today's Iran: cities and the metro, science and space, artists and athletes, nature and water | animation (tour), `map`, game (`pairs`) |
| ⬜ | `world-forest-14` | تاریخ خانواده ما | Oral history: interview a grandparent about school, games and home; compare then and now | home, 🆕 `paper`, game (`sort` then / now), parent tip |
| ⬜ | `world-forest-7` | مردم و شهرها | Population, where people live and why, moving to cities | 🆕 `map`, `chart` |
| ⬜ | `world-forest-8` | زمین ما، خانه همه | Shared challenges: water in Iran, protecting the Asiatic cheetah, caring for the planet | animation, home, 🆕 `paper` |
| ⬜ | `world-forest-9` | میراث جهانی | World Heritage in Iran and around the world: why we protect it | animation (tour), game (`pairs`), 🆕 `map` |
| ⬜ | `world-forest-10` | پژوهش من | Research project: a question about a country or a time, sources, a short presentation for the family | game (`order` of the steps), 🆕 `paper`, home |

---

## Outside lessons

| St | What | Where | Plan |
|---|---|---|---|
| ✅ | Placement check for فارسی and ریاضی | `B.PLACEMENT` in `js/content.js` | Other subjects have none: they start at their `defaultLevel` or the child's Persian garden |
| ✅ | Daily off-screen activities, 6 per garden | `js/activities.js` | Add science, English, health and coding activities once those subjects ship |
| ✅ | Parent guide, method, policies | `guide.html`, `method.html`, `policies.html` | When Tree/Forest lessons ship, update the line in `guide.html` saying they are coming |
| 🔨 | Animations that show what they say | `js/scene.js`, `js/art/rig*.js`, `tools/storyboard.html` | Every animation in every subject is now a `scene` step (no `story` left): 92 lessons, 606 frames, checked against their captions in the storyboard. The engine has moving parts, paths, walking people (`walker`, full bodies for every person emoji), camera pans with depth, the child rubbing or tapping, and a slower pace. Left: commit, then teacher review of the pictures |
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
