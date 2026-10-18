# Baghcheh content plan · برنامه محتوای باغچه

This is the **single source of truth** for what Baghcheh teaches: every subject, garden, unit and lesson,
what each one covers, and which kinds of content it uses. Build lessons from this plan, and change the plan
first (in the same commit) whenever the content changes. `node tools/check-plan.js` checks that the plan and
`js/lessons/` agree.

Status: ✅ built (in `js/lessons/`, reviewed, released) · 🔨 being built (in `js/lessons/` but not finished, reviewed or
committed yet) · ⬜ planned (not written). Planned titles are working titles: polish them with
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
| زبان انگلیسی | `english` | `js/lessons/english.js` | all five | Seed (`defaultLevel`) |
| سلامت و ایمنی | `health` | `js/lessons/health.js` | all five, plus lessons for every garden | the child's Persian garden |
| فکر و برنامه‌نویسی | `think` | `js/lessons/thinking.js` | all five | the child's Persian garden |

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

## Content types

Every lesson row below lists its content types. These are the names to use, with the step types that make them.

| Content type | What it is | Step types |
|---|---|---|
| **lesson** | Interactive teaching: show, explain, try with instant feedback | `intro`, `choose`, `trace`, `blend`, `count`, `tenframe`, `make`, `numline`, `tens`, `compare`, `shape`, `measure`, `money`; English: `words`, `listen`, `letter` |
| **game** | Learning game; the move *is* the skill | `pairs`, `build`, `order`, `sort`, `feed`, `pattern` |
| **animation** | Animated picture explanation or story, play/pause/replay | `story` |
| **story** | Text the child reads (decodable) or a story heard and talked about | `passage`, `story` (with `question`), `talk` |
| **inquiry** | Guess, try, see (science) | `test`, `shadow` |
| **coding** | Block programs on a grid; a miss is something to debug | `code` |
| **calm** | Breathing and naming feelings; never scored, answers never stored | `breathe`, `feelings` |
| **home** | A task away from the screen, shown inside a lesson: an experiment, a body activity, a thinking game | `home`, `doit`, `unplugged` |
| **parent tip** | A note for the parent at the end of a lesson: how to practise, how to talk about it | `tip`, `forparents` |
| **activity** | Daily off-screen suggestion in the parent's plan (not a lesson) | `B.ACTIVITIES` in `js/activities.js` |

Subject-specific step types live in `js/steps/` (`science.js`, `english.js`, `health.js`, `coding.js`). A new step type
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
| ⬜ | `read-seed-4` | کلمه‌های هم‌قافیه | Rhyme: hear which words sound alike at the end (picture + spoken word) | lesson (`choose` with `say`), game (`pairs`) |
| ⬜ | `read-seed-5` | دست بزن، بشمار | Syllables: clap and count the parts of a word | animation, lesson (`choose`) · 🆕 `clap` (tap once per syllable) |
| ⬜ | `read-seed-6` | با چه صدایی شروع می‌شود؟ | First sound of a word (oral, pictures only) | game (`sort` by first sound, `pairs`) |
| ⬜ | `read-seed-7` | قصه گوش کن | Listening comprehension: a heard story, what happened first/next/last, how a character felt | animation (`story` + `question`), game (`order` with `numbered`) |
| ⬜ | `read-seed-8` | کتاب از کجا شروع می‌شود؟ | Print concepts: right to left, top to bottom, words and spaces | animation, lesson (`choose`) |
| ⬜ | `read-seed-9` | خط‌های رنگی | Pre-writing: straight lines, curves, circles, zigzags | 🆕 `trace` of non-letter paths |
| ⬜ | `read-seed-10` | بازی صداها | Unit game: rhyme, syllables, first sound | game (`pairs` with `hidden`, `sort`) |

### 🌱 جوانه — `sprout`

First letters and short vowels; reading the first syllables and words.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `read-sprout-1` | «آ» و «ب» | آ ا ب; آب، بابا | lesson (`intro`, `choose`, `trace`, `blend`) |
| ✅ | `read-sprout-2` | «د» و «م» | د م | lesson |
| ✅ | `read-sprout-3` | «س» و «ـَ» | س and the short vowel ـَ | lesson |
| ✅ | `read-sprout-4` | بازی حرف‌ها و صداها | Unit game: letters ↔ sounds, building words | game (`pairs`, `build`, `sort`) |
| ⬜ | `read-sprout-5` | اولین جمله‌ها | First decodable phrases with آ ب د م س ـَ (بابا آب داد.) | story (`passage`), lesson (`blend`) |
| ⬜ | `read-sprout-6` | کلمه‌ها را بساز | Spelling with known letters: hear a word, build it (no word shown) | game (`build` with `extra`) · 🆕 `build` option to hide the word until the end (dictation) |

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
| ⬜ | `read-sapling-20` | «ء» و «ئـ» | hamza forms (مسئله، جزء) | lesson, story |
| ⬜ | `read-sapling-21` | بازی کلمه‌ها ۳ | Unit game: the last letters | game (`pairs`, `build`, `sort`) |
| ⬜ | `read-sapling-22` | شکل‌های یک حرف | Letter forms: alone, start, middle, end (ب بـ ـبـ ـب) | game (`pairs`, `sort`) |
| ⬜ | `read-sapling-23` | حرف‌های هم‌صدا | Same sound, different letters: ت/ط، س/ص/ث، ز/ذ/ض/ظ، ه/ح، ق/غ، ا/ع | animation, game (`sort` by letter in known words) |
| ⬜ | `read-sapling-24` | املا | Dictation: hear a word, build it, including same-sound letters | game (`build`) · 🆕 hidden-word option (see `read-sprout-6`) |
| ⬜ | `read-sapling-25` | جمله بساز | Order words into a sentence; full stop and question mark | game (`order` of words), lesson (`choose`) |
| ⬜ | `read-sapling-26` | کلمه‌ها را به هم بنویس | Writing joined letters in whole words | 🆕 `trace` of joined words (strokes for joined forms in `js/strokes.js`) |
| ⬜ | `read-sapling-27` | قصه‌های کوتاه | Short illustrated decodable stories, questions about them | animation, story (`passage`) |
| ⬜ | `read-sapling-28` | بلند بخوان | Fluency: re-read a short passage aloud; the parent marks the hard words (accuracy only, never a timer) | 🆕 `readaloud` (parent-marked, not scored) |

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
| ⬜ | `math-seed-4` | بزرگ و کوچک | Size: bigger/smaller, longer/shorter, taller | lesson (`measure`, `choose`) |
| ⬜ | `math-seed-5` | دسته کن | Sorting by colour, shape, size | game (`sort`) |
| ⬜ | `math-seed-6` | کجاست؟ | Position words: بالا، پایین، جلو، پشت، کنار، داخل | animation, lesson (`choose`) |
| ⬜ | `math-seed-7` | شکل‌های دور و بر ما | Circle, square, triangle in everyday things | lesson (`shape`), home |
| ⬜ | `math-seed-8` | الگو بساز | Repeating patterns AB, AAB, ABC | game (`pattern`) |
| ⬜ | `math-seed-9` | عددها را بشناسیم | Numerals ۱–۵ ↔ quantities | game (`pairs` numeral ↔ dots) |
| ⬜ | `math-seed-10` | بازی شمردن | Unit game: count, match, order | game (`feed`, `pairs` with `hidden`, `order`) |

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
| ⬜ | `math-sprout-9` | نوشتن عددها | Writing digits ۰–۹ | 🆕 `trace` of digits (strokes for ۰–۹ in `js/strokes.js`) |
| ⬜ | `math-sprout-10` | قبل و بعد | Number order to 20: before, after, between | game (`order` with `ltr`), lesson (`numline`) |
| ⬜ | `math-sprout-11` | قصه جمع و تفریق | Word problems to 10 told as stories | animation (`story` + `question`), lesson (`choose`) |
| ⬜ | `math-sprout-12` | صبح، ظهر، شب | Time order: parts of the day, days of the week (from شنبه) | game (`order`), animation |
| ⬜ | `math-sprout-13` | بازی عددها تا بیست | Unit game: numbers to 20 | game (`pairs`, `pattern`, `feed`) |

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
| ⬜ | `math-sapling-13` | دوتایی‌ها و خانواده عددها | Doubles, near doubles, fact families (۳ + ۴، ۷ − ۳…) | game (`pairs`, `sort`), lesson (`choose`) |
| ⬜ | `math-sapling-14` | مسئله‌های قصه‌ای | Two-digit word problems: which operation? | animation (`story` + `question`), lesson (`choose`) |
| ⬜ | `math-sapling-15` | ساعت | Telling time: o'clock and half past | animation · 🆕 `clock` (read and set the hands) |
| ⬜ | `math-sapling-16` | سنگین و سبک | Mass: heavier/lighter, balancing | 🆕 `balance` (two pans) |
| ⬜ | `math-sapling-17` | عددهای سه‌رقمی | Hundreds, tens and ones to 1,000 | lesson · 🆕 `tens` with hundreds |
| ⬜ | `math-sapling-18` | دسته‌های مساوی | Equal groups, repeated addition: the start of multiplication | animation, game (`feed`), lesson (`choose`) |
| ⬜ | `math-sapling-19` | نصف و یک‌چهارم | Halves and quarters of a shape and of a number (sharing bread) | animation · 🆕 `fraction` (cut and colour parts) |
| ⬜ | `math-sapling-20` | نمودار تصویری | Reading and making a picture graph | 🆕 `chart` (read a graph, add to one) |
| ⬜ | `math-sapling-21` | بازی بازار | Unit game: money, adding and subtracting | game (`sort`, `pairs`), lesson (`money`) |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `math-tree-1` | عددهای بزرگ | Place value to 1,000,000, reading big numbers, rounding | lesson (`choose`, `compare`) · 🆕 `tens` with thousands |
| ⬜ | `math-tree-2` | جمع و تفریق ستونی | Column addition and subtraction with carrying and borrowing | 🆕 `column` (written method, digit by digit) |
| ⬜ | `math-tree-3` | ضرب با آرایه | Multiplication as an array; commutativity | animation · 🆕 `array` |
| ⬜ | `math-tree-4` | جدول ضرب | Times tables 2–10 by patterns, not by rote | game (`pattern`, `pairs` with `hidden`), lesson (`choose`) |
| ⬜ | `math-tree-5` | ضرب دورقمی | 2-digit × 1-digit, then 2 × 2, with the area model | 🆕 `array` (area model), 🆕 `column` |
| ⬜ | `math-tree-6` | تقسیم: سهم مساوی | Division as sharing and grouping; remainders | animation, game · 🆕 `feed` with several plates |
| ⬜ | `math-tree-7` | تقسیم ستونی | Long division (3-digit ÷ 1-digit, as in the placement check) | 🆕 `column` (division layout) |
| ⬜ | `math-tree-8` | بازی ضرب و تقسیم | Unit game | game (`pairs`, `sort`, `pattern`) |
| ⬜ | `math-tree-9` | کسرها | Fractions as parts of a whole and of a set; on the number line | animation, lesson (`numline`) · 🆕 `fraction` |
| ⬜ | `math-tree-10` | کسرهای مساوی | Equivalent fractions, comparing, adding with the same denominator | 🆕 `fraction`, lesson (`compare`) |
| ⬜ | `math-tree-11` | عددهای اعشاری | Tenths and hundredths, with lengths (cm, m) | lesson (`measure`, `choose`) |
| ⬜ | `math-tree-12` | واحدهای اندازه‌گیری | Length, mass, volume units; converting | lesson (`measure`, `choose`), home |
| ⬜ | `math-tree-13` | زمان و تقویم | Minutes, hours, days, the months of the Persian calendar | 🆕 `clock`, game (`order`) |
| ⬜ | `math-tree-14` | محیط و مساحت | Perimeter and area on a grid | 🆕 `grid` (count squares, draw shapes) |
| ⬜ | `math-tree-15` | زاویه و خط | Right angles, parallel and perpendicular lines | lesson (`shape`, `choose`) |
| ⬜ | `math-tree-16` | تقارن | Lines of symmetry, completing a symmetric picture | 🆕 `mirror` |
| ⬜ | `math-tree-17` | شکل‌های فضایی | Cube, cuboid, cylinder, sphere, cone; faces and edges | animation, game (`sort`) |
| ⬜ | `math-tree-18` | جدول و نمودار ستونی | Tables and bar charts | 🆕 `chart` |

### 🌲 جنگل — `forest`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `math-forest-1` | عمل‌ها با کسر | Adding, subtracting, multiplying fractions | 🆕 `fraction`, lesson (`choose`) |
| ⬜ | `math-forest-2` | عمل‌ها با اعشار | Decimal operations; money and measures | lesson (`choose`), 🆕 `column` |
| ⬜ | `math-forest-3` | درصد | Percentages: discounts at the bazaar | animation, lesson (`money`, `choose`) |
| ⬜ | `math-forest-4` | عددهای منفی | Integers on the number line, temperature | lesson (`numline`, `compare`) |
| ⬜ | `math-forest-5` | نسبت و تناسب | Ratio and proportion with recipes | animation, lesson (`choose`) |
| ⬜ | `math-forest-6` | عامل‌ها و عددهای اول | Factors, multiples, primes, divisibility | game (`sort`), 🆕 `array` |
| ⬜ | `math-forest-7` | توان | Powers and square numbers | 🆕 `array`, lesson (`choose`) |
| ⬜ | `math-forest-8` | معادله با ترازو | Unknowns and simple equations | 🆕 `balance` with unknowns |
| ⬜ | `math-forest-9` | از الگو تا عبارت | Number patterns → expressions | game (`pattern`), lesson (`choose`) |
| ⬜ | `math-forest-10` | مساحت شکل‌ها | Area of triangle, parallelogram, circle; angle sums | 🆕 `grid`, animation |
| ⬜ | `math-forest-11` | مختصات | Coordinates on a grid / a map | 🆕 `grid` with axes |
| ⬜ | `math-forest-12` | میانگین | Mean, median, reading data | 🆕 `chart`, lesson (`choose`) |
| ⬜ | `math-forest-13` | احتمال | Chance: dice, spinners, experiments | 🆕 `spinner` (repeat an experiment, tally), home |

---

## احساس‌های من — subject `feel`

Not leveled (`level: null`): every child sees every lesson. Social and emotional learning, trauma-informed:
safety, calm, naming feelings, connection. **Never scored, answers never stored**, no right or wrong about
feelings. No frightening content; for worry and loss, the parent guide points to professional help.
Animal or child characters, everyday Iranian settings.

### همه — `any`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ✅ | `feel-1` | نفس گل و شمع | Slow breathing (smell the flower, blow the candle); how do I feel now | calm (`breathe`, `feelings`) |
| ⬜ | `feel-2` | اسم احساس‌ها | Naming feelings from faces and situations: خوشحال، غمگین، عصبانی، نگران، ترسیده، آرام | animation, game (`pairs` face ↔ word, unscored) · 🆕 `pairs` option `practice` (not scored) |
| ⬜ | `feel-3` | احساس در بدن من | Where a feeling is felt in the body | 🆕 `body` (tap a body outline; not stored) |
| ⬜ | `feel-4` | نفس مربعی | A second breathing pattern (in 4, hold 4, out 4, hold 4) | calm · 🆕 `breathe` option `pattern` |
| ⬜ | `feel-5` | پنج چیز که می‌بینم | Grounding: 5 things I see, 4 I hear, 3 I touch… | 🆕 `ground` (guided, untimed) |
| ⬜ | `feel-6` | وقتی نگرانم | Worry: a story of a character who worries, what helps, telling a grown-up | animation, story (`talk`), calm |
| ⬜ | `feel-7` | دماسنج خشم | Anger: how big is my anger, what I can do instead | animation · 🆕 `meter` (pick a level; not stored) |
| ⬜ | `feel-8` | دوستی و مهربانی | Being a friend, sharing, saying sorry | animation, story (`talk`) |
| ⬜ | `feel-9` | وقتی دعوا می‌شود | Solving a conflict in steps: stop, say how I feel, find a way | animation, game (`order`, unscored) |
| ⬜ | `feel-10` | خواب آرام | Bedtime routine and relaxing the body | game (`order`), 🆕 `relax` (tense and let go, part by part) |
| ⬜ | `feel-11` | سه چیز خوب امروز | Gratitude and good moments | story (`talk`), home |

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
| 🔨 | `science-seed-1` | زنده یا غیرزنده؟ | Living and non-living things | animation, game (`sort`), lesson (`choose`), home |
| 🔨 | `science-seed-2` | پنج حس | The five senses | animation, game (`pairs`), lesson (`choose`), home |
| 🔨 | `science-seed-3` | دانه چطور سبز می‌شود؟ | How a seed grows; what a plant needs (water, light) | animation, game (`order`), lesson (`choose`), home |
| 🔨 | `science-seed-4` | خانه و غذای حیوان‌ها | Animals, their homes and food | game (`pairs`, `sort`), animation, home |
| ⬜ | `science-seed-5` | امروز هوا چطور است؟ | Weather and what we wear | game (`sort`), animation, home |
| ⬜ | `science-seed-6` | رنگ‌ها را قاطی کن | Mixing colours | home, lesson (`choose`) |

### 🌱 جوانه — `sprout`

Guess, try, see.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `science-sprout-1` | بخش‌های گیاه | Root, stem, leaf, flower, fruit | animation, game (`pairs`), lesson (`choose`), home |
| 🔨 | `science-sprout-2` | یخ، آب، بخار | States of water | animation, game (`order`, `sort`), home |
| 🔨 | `science-sprout-3` | روی آب یا زیر آب؟ | Floating and sinking | inquiry (`test` float), game (`sort`), home |
| 🔨 | `science-sprout-4` | روز و شب | Day and night | animation, game (`order`, `sort`), home |
| 🔨 | `science-sprout-5` | چهار فصل | Seasons and how nature changes | animation, game (`order`, `pattern`), home |
| ⬜ | `science-sprout-6` | از چه ساخته شده؟ | Materials: wood, metal, plastic, glass, cloth | game (`sort`), inquiry (`test`), home |

### 🌿 نهال — `sapling`

Why does it happen?

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `science-sapling-1` | چرخه آب | Evaporation, clouds, rain | animation, game (`order`), lesson (`choose`), home |
| 🔨 | `science-sapling-2` | آهنربا | What magnets pull | inquiry (`test` magnet), animation, game (`sort`), home |
| 🔨 | `science-sapling-3` | نور و سایه | Light and shadow across the day | inquiry (`shadow`), lesson (`choose`), game (`sort`), home |
| 🔨 | `science-sapling-4` | طبیعت ایران | Iran's habitats and the animals that live there | animation, game (`pairs`), lesson (`choose`), home |
| 🔨 | `science-sapling-5` | هل دادن و کشیدن | Forces: push and pull | animation, game (`sort`), lesson (`choose`), home |
| ⬜ | `science-sapling-6` | چرخه زندگی | Life cycles: plant, frog, butterfly, hen | animation, game (`order`), home |
| ⬜ | `science-sapling-7` | چه کسی چه می‌خورد؟ | Food chains | game (`order`, `pairs`), animation |
| ⬜ | `science-sapling-8` | صدا از کجا می‌آید؟ | Sound and vibration | animation, home |

### 🌳 درخت — `tree`

After teacher review of the earlier gardens.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `science-tree-1` | مدار ساده | Electric circuits: battery, wire, bulb, switch (on screen only) | 🆕 `circuit` (build a circuit) |
| ⬜ | `science-tree-2` | اصطکاک و سطح شیب‌دار | Friction, ramps, speed | animation · 🆕 `ramp` (try surfaces) |
| ⬜ | `science-tree-3` | اهرم و قرقره | Simple machines | animation · 🆕 `balance` |
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
| ⬜ | `science-forest-7` | دانشمند کوچک | The scientific method: question, guess, test, record, conclude | game (`order`), home, 🆕 `chart` |

---

## زبان انگلیسی — subject `english`

Lessons in `js/lessons/english.js`, English step types (`words`, `listen`, `letter`, `tip`) in `js/steps/english.js`,
the English voice in `js/english-voice.js`. Every child starts at Seed (`defaultLevel: "seed"`). Listening and
speaking first, meaning shown by pictures and actions (never by translation), lots of repetition; then letters and
their sounds a few at a time (phonics groups), then sentences. Instructions are Persian and spoken; English is
written left to right and spoken with the device's English voice. Every lesson ends with a `tip` for parents, who
may not know English. Our own chants and texts only (no copyrighted songs).

### 🌰 دانه — `seed`

Listen, point, say.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `english-seed-1` | سلام و خداحافظ | Hello, goodbye, my name is | animation, lesson (`words`, `listen`), parent tip |
| 🔨 | `english-seed-2` | رنگ‌ها | Colours | animation, lesson (`words`, `listen`), game (`pairs`), parent tip |
| 🔨 | `english-seed-3` | عددها تا ده | Numbers 1–10 | animation, lesson (`words`, `listen`), game (`pairs`), parent tip |
| 🔨 | `english-seed-4` | حیوان‌ها | Animals | animation, lesson, game (`pairs`), parent tip |
| 🔨 | `english-seed-5` | خانواده | Family words | animation, lesson, parent tip |
| 🔨 | `english-seed-6` | بدن من | Body parts | animation, lesson, parent tip |
| ⬜ | `english-seed-7` | خوراکی‌ها | Food and drink words | animation, lesson, game (`pairs` with `hidden`), parent tip |
| ⬜ | `english-seed-8` | بازی کلمه‌ها | Unit game: words from the Seed garden | game (`pairs`, `sort`) |

### 🌱 جوانه — `sprout`

Letters and their sounds, a few at a time; short words from them.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `english-sprout-1` | حرف‌های s a t p | Sounds s a t p; sat, pat, tap | lesson (`letter`, `listen`), game (`sort`, `pairs`, `build`), parent tip |
| 🔨 | `english-sprout-2` | حرف‌های i n m d | i n m d | lesson, game (`sort`, `build`, `pairs`), parent tip |
| 🔨 | `english-sprout-3` | حرف‌های g o c k | g o c k | lesson, game, parent tip |
| 🔨 | `english-sprout-4` | حرف‌های e u r | e u r | lesson, game (`build`, `pairs`), parent tip |
| 🔨 | `english-sprout-5` | حرف‌های h b f l | h b f l | lesson, game, parent tip |
| ⬜ | `english-sprout-6` | حرف‌های j v w x y z q | The remaining letters | lesson (`letter`, `listen`), game, parent tip |
| ⬜ | `english-sprout-7` | حرف بزرگ، حرف کوچک | Uppercase ↔ lowercase | game (`pairs`, `sort`) |
| ⬜ | `english-sprout-8` | کلمه‌های پرکاربرد | First sight words: I, a, the, is, see, my | game (`pairs`, `build`), lesson (`listen`) |
| ⬜ | `english-sprout-9` | sh، ch، th | Two letters, one sound | lesson (`letter`), game (`sort`, `build`) |

### 🌿 نهال — `sapling`

Short sentences, questions, everyday phrases.

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `english-sapling-1` | I can see | Reading and building "I can see a …" | animation, lesson (`listen`), game (`order`, `pairs`), parent tip |
| 🔨 | `english-sapling-2` | سؤال و جواب | What is this? It is a … | animation, lesson (`listen`), game (`order`), parent tip |
| 🔨 | `english-sapling-3` | جمله‌های هر روز | Everyday phrases | animation, lesson (`words`, `listen`), game (`order`), parent tip |
| ⬜ | `english-sapling-4` | دوست دارم | I like … / I don't like … | animation, game (`sort`), lesson (`listen`) |
| ⬜ | `english-sapling-5` | یکی، چندتا | Plural -s: one cat, two cats | game (`sort`), lesson (`listen`) |
| ⬜ | `english-sapling-6` | کجاست؟ | in, on, under, next to | animation, lesson (`listen`, `choose`) |
| ⬜ | `english-sapling-7` | قصه کوتاه | A short story to read with questions | story (`passage`), animation |

### 🌳 درخت — `tree`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| ⬜ | `english-tree-1` | هر روز | Present simple: daily routines | animation, game (`order`) |
| ⬜ | `english-tree-2` | روزها و ماه‌ها | Days of the week, months, the weather | game (`order`, `pairs`) |
| ⬜ | `english-tree-3` | الان چه می‌کنی؟ | Present continuous | animation, lesson (`listen`, `choose`) |
| ⬜ | `english-tree-4` | قصه‌های کوتاه | Reading short stories with questions | story (`passage`, `story` + `question`) |
| ⬜ | `english-tree-5` | توصیف کن | Adjectives: big, small, happy, tall… describing a picture | game (`sort`), animation |

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
| 🔨 | `health-seed-1` | دست‌هایم را می‌شویم | Handwashing step by step | animation, game (`order`), lesson (`choose`), home (`doit`), parent tip |
| 🔨 | `health-seed-2` | مسواک می‌زنم | Brushing teeth | animation, lesson (`choose`), game (`order`, `pairs`), parent tip |
| 🔨 | `health-seed-3` | بدن من | Body parts and what they do | animation, lesson (`choose`), game (`pairs`), home (`doit`), parent tip |
| 🔨 | `health-seed-4` | آب و خوراکی | Water and healthy food | animation, game (`sort`), lesson (`choose`), home (`doit`), parent tip |

### 🌱 جوانه — `sprout`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `health-sprout-1` | عطسه و سرفه | Germs: sneezing and coughing into the elbow | animation, lesson (`choose`), game (`order`, `sort`), parent tip |
| 🔨 | `health-sprout-2` | در خانه مراقبم | Safety at home: medicines, hot things, sockets | animation, game (`sort`), lesson (`choose`), parent tip |
| 🔨 | `health-sprout-3` | در خیابان | Road safety: crossing, traffic lights | animation, game (`order`, `sort`), lesson (`choose`), parent tip |
| 🔨 | `health-sprout-4` | اگر گم شدم | If I get lost: stay, ask a safe grown-up, know my parent's name and number | animation, lesson (`choose`), home (`doit`), parent tip |

### 🌿 نهال — `sapling`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `health-sapling-1` | خواب، بازی و نرمش | Sleep, play and exercise | animation, game (`sort`, `order`), lesson (`choose`), home (`doit`), parent tip |
| 🔨 | `health-sapling-2` | احساس‌ها در بدن | Where feelings show in the body; calming down | animation, game (`pairs`), calm (`breathe`), home (`doit`), parent tip |
| 🔨 | `health-sapling-3` | لمس خوب، راز خوب | Safe and unsafe touch, good and bad secrets | animation, game (`sort`), lesson (`choose`), home (`doit`), parent tip |
| ⬜ | `health-sapling-4` | آتش و گرما | Fire safety at home | animation, game (`order`), home (`doit`), parent tip |

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
| 🔨 | `health-all-1` | بدن من مال خودم است | Body safety: my body belongs to me, saying no, telling a trusted grown-up | animation, lesson (`choose`), home (`doit`), parent tip |
| 🔨 | `health-all-2` | تمرین زلزله | Earthquake drill: بنشین، پناه بگیر، محکم نگه دار | animation, game (`order`), lesson (`choose`), home (`doit`), parent tip |
| 🔨 | `health-all-3` | شماره‌های کمک | Emergency numbers (۱۱۵، ۱۲۵) and what to say | animation, game (`pairs`), lesson (`choose`), home (`doit`), parent tip |

---

## فکر و برنامه‌نویسی — subject `think`

Lessons in `js/lessons/thinking.js`, step types `code` (block coding on a grid) and `unplugged` (a screen-free
thinking game for the parent) in `js/steps/coding.js`. Logical thinking before code: patterns, sorting,
sequences, conditions, then programs with arrows, turns and repetition. A program that misses is something to
fix, never a loss (debugging is the skill). Every lesson ends with an `unplugged` game.

### 🌰 دانه — `seed`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `think-seed-1` | الگوها | Spotting and continuing patterns | game (`pattern`), home (`unplugged`) |
| 🔨 | `think-seed-2` | دسته‌بندی | Sorting by one rule | game (`sort`, `pairs`, `order`), home (`unplugged`) |
| 🔨 | `think-seed-3` | قدم به قدم | Sequences: the steps of everyday tasks | animation, game (`order`), home (`unplugged`) |
| 🔨 | `think-seed-4` | راه لاک‌پشت | First programs: arrows on a small grid | coding (`code` arrows), home (`unplugged`) |

### 🌱 جوانه — `sprout`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `think-sprout-1` | کدام جور نیست؟ | Odd one out: finding the rule | lesson (`choose`), game (`sort`), home (`unplugged`) |
| 🔨 | `think-sprout-2` | اگر… آن‌وقت… | Conditions in everyday life | lesson (`choose`), game (`sort`), home (`unplugged`) |
| 🔨 | `think-sprout-3` | الگوهای سخت‌تر | Longer and growing patterns | game (`pattern`), home (`unplugged`) |
| 🔨 | `think-sprout-4` | برنامه با فلش | Programs with arrows and walls | coding (`code` arrows), home (`unplugged`) |
| 🔨 | `think-sprout-5` | اشکال را پیدا کن | Debugging: fix a given program | coding (`code` with `given`), home (`unplugged`) |

### 🌿 نهال — `sapling`

| St | Lesson | Title | Covers | Content types |
|---|---|---|---|---|
| 🔨 | `think-sapling-1` | به چپ بچرخ، به راست بچرخ | Left and right from the character's point of view | lesson (`choose`), coding (`code`), home (`unplugged`) |
| 🔨 | `think-sapling-2` | جلو برو، بچرخ | Forward and turn blocks | coding (`code` turn), home (`unplugged`) |
| 🔨 | `think-sapling-3` | تکرار | The repeat block; shorter programs | animation, coding (`code` with `repeat`), home (`unplugged`) |
| 🔨 | `think-sapling-4` | مرتب کردن | Sorting step by step (an algorithm) | game (`order`, `sort`), animation, home (`unplugged`) |
| 🔨 | `think-sapling-5` | برنامه‌های بزرگ‌تر | Longer programs combining turns and repeats | coding (`code`), home (`unplugged`) |

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

## Outside lessons

| St | What | Where | Plan |
|---|---|---|---|
| ✅ | Placement check for فارسی and ریاضی | `B.PLACEMENT` in `js/content.js` | Other subjects have none: they start at their `defaultLevel` or the child's Persian garden |
| ✅ | Daily off-screen activities, 6 per garden | `js/activities.js` | Add science, English, health and coding activities once those subjects ship |
| ✅ | Parent guide, method, policies | `guide.html`, `method.html`, `policies.html` | When Tree/Forest lessons ship, update the line in `guide.html` saying they are coming |
| ⬜ | Recorded audio for every lesson | `audio/` | Record Seed and Sprout first (children who cannot read yet need it most) |

## New step types

Built in this order (the first ones unlock the most lessons). When one is built, document it in `README.md`
and remove the 🆕 from the rows that use it.

| Step type / option | What it does | Used by |
|---|---|---|
| `build` hidden word | Dictation: the word is only heard, shown at the end | `read-sprout-6`, `read-sapling-24` |
| `trace` paths and digits | Trace lines, curves, digits ۰–۹ and joined words | `read-seed-9`, `math-sprout-9`, `read-sapling-26` |
| `paper` | A writing task on paper with a short checklist for the parent; not scored | `read-tree-11`, `read-tree-12`, `read-forest-2/7/9`, `english-forest-4` |
| `fraction` | Cut a shape or a set into parts and colour some | `math-sapling-19`, `math-tree-9/10`, `math-forest-1` |
| `clock` | Read and set clock hands | `math-sapling-15`, `math-tree-13` |
| `balance` | Two-pan balance (mass, then equations, levers) | `math-sapling-16`, `math-forest-8`, `science-tree-3` |
| `chart` | Read and add to picture graphs and bar charts | `math-sapling-20`, `math-tree-18`, `math-forest-12`, `science-forest-7` |
| `array` | Rows × columns, area model | `math-tree-3/5`, `math-forest-6/7` |
| `column` | Written column methods (+ − × ÷), digit by digit | `math-tree-2/5/7`, `math-forest-2` |
| `grid` | Squared grid: perimeter, area, coordinates | `math-tree-14`, `math-forest-10/11` |
| `tens` hundreds/thousands | Flats and cubes in the place-value step | `math-sapling-17`, `math-tree-1` |
| `feed` several plates | Sharing into equal groups | `math-tree-6` |
| `mirror` | Complete a symmetric picture | `math-tree-16` |
| `spinner` | Repeat a chance experiment, tally results | `math-forest-13` |
| `clap` | Tap once per syllable | `read-seed-5` |
| `readaloud` | Parent marks hard words while the child reads aloud | `read-sapling-28` |
| `pairs` practice, `breathe` pattern, `body`, `ground`, `meter`, `relax` | Calm and feelings steps, never scored or stored | `feel-2` … `feel-10` |
| `circuit`, `ramp` | Small science simulations | `science-tree-1`, `science-tree-2` |
| `code` if, function and counter blocks | Conditions, functions, variables | `think-tree-1/2`, `think-forest-1` |
