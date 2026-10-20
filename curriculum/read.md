## فارسی — subject `read`

Goal: a child who learns Persian only with Baghcheh, from Seed to the end of Forest, can do in Persian what the
best school systems expect in their own language by about age 15, and what Iranian schools expect by the end of
پایه نهم: listen and speak well, read any text aloud fluently and silently with understanding,
spell correctly (املا), write by hand and compose from a sentence up to a short essay, know the grammar taught in
school (دستور زبان) and the literary devices and forms of Persian poetry, and have read and enjoyed the classics
and today's children's literature. Seed listens and talks; Sprout and Sapling learn to read and write; Tree and
Forest read to learn, write to say something, and meet literature.

Every letter lesson has the same shape: `intro` (sound, forms, example word; the letter is shown being written),
`choose` (find the letter / the sound), `trace`, `blend` (read syllables and words), and a `passage` once enough
letters are known. Letter order follows `B.READ_TEACHES` in `js/practice/read.js` (read by `tools/check-reading.js`): every word a child decodes uses only
letters taught earlier, until the whole alphabet is known.

Expert review still to do: a Persian primary teacher reviews every lesson before it is published, and a teacher
of پایه اول decides the questions under "Questions for a Persian teacher" at the end of this file.

### Frameworks

**What leads: the best systems and the science of reading.** What is taught and in what order follows the
literacy curricula of the systems that read best in PIRLS 2021 and PISA reading, and the research below, adapted to
Persian script and Persian texts. Iran's curriculum fills the School column and adds a moderate amount where it
clearly goes further (marked `full`); where it covers the same or less, the standards below decide.
- **PIRLS 2021** (Mullis et al., 2023, *PIRLS 2021 International Results in Reading*, TIMSS & PIRLS International
  Study Center, Boston College): Singapore, Ireland, Hong Kong, Northern Ireland, England and Finland lead.
  **PISA 2022** reading (OECD, 2023, *PISA 2022 Results, Volume I*): Ireland, Japan, Korea, Estonia, Singapore and
  Canada lead.
- **England:** *English programmes of study*, key stages 1–3 (Department for Education, 2013), and the *Early years
  foundation stage statutory framework* (2024): systematic synthetic phonics from Reception, every letter–sound
  known and checked by the end of Year 1, fluency and comprehension by Year 2; poems recited by heart from Year 1;
  grammar terms named year by year; joined handwriting; spoken language throughout; at key stage 3 whole books,
  poetry and drama, and seminal world literature.
- **Ireland:** *Primary Language Curriculum* (NCCA, 2019): oral language, reading and writing as three linked
  strands with learning outcomes and progression continua, used here for the speaking and listening objectives.
- **Singapore:** *English Language Syllabus 2020*, primary and secondary (Ministry of Education): listening and
  viewing, reading and viewing, speaking and representing, writing and representing, grammar and vocabulary;
  explicit grammar from the early years; reading multimodal and digital texts critically.
- **Finland:** *National core curriculum for basic education 2014*, «Mother tongue and literature» (Finnish National
  Agency for Education): reading started in a transparent script at 7, interaction, text skills across genres,
  literature and media literacy; used for the later start of formal reading in a transparent script and for media literacy.
- **United States:** *Common Core State Standards for English Language Arts* (NGA Center & CCSSO, 2010), grade by
  grade from kindergarten to grade 9–10, and *Appendix A* on text complexity; the *Head Start Early Learning
  Outcomes Framework* (Office of Head Start, 2015) for ages 3–5. Used for grade-by-grade expectations: opinion,
  informative and narrative writing from the first grades, short research from grade 3, argument and evidence
  from grade 6, figurative language (simile, metaphor, idioms, proverbs, allusion), and sentence grammar (clauses,
  active and passive, mood).

**Where good systems differ, and what Baghcheh chooses.**
- *When formal reading starts:* England and Ireland teach letter–sounds at 4–5, Finland at 7. Persian with vowel
  marks is as transparent as Finnish and is learned in about a year (Rahbari & Sénéchal, 2010), while early, explicit
  phonics helps most children and above all those at risk (Ehri et al., 2001). So Seed stays oral, with a taste of
  letters at `full` depth, and the whole alphabet is learned across Sprout (ages 5–7), as in England's Reception and
  Year 1. The built letter lessons in Sapling are therefore one garden late (question 1 at the end).
- *Grammar:* England and Singapore teach named grammar early, Finland and Ireland later and through use. Baghcheh
  names the main word classes and tenses from Sapling, sentence parts in Tree and clauses in Forest; the finer
  Iranian categories (each kind of modifier in the noun group, مسند, the full set of past tenses) are `full`.
- *Writing:* every system teaches narrative, information and opinion writing; Common Core and England start
  opinion and information writing in the first years, the Iranian books later. Baghcheh follows the earlier
  start. Iranian writing forms beyond these (حکایت‌نگاری، مَثَل‌نویسی، تصویرنویسی) are `full`.
- *Literature:* every system asks for a heritage of classic texts and a wide range of modern and world texts. For
  Persian, the heritage is the classics (فردوسی، سعدی، مولوی، حافظ، عطار); the Iranian books' detailed poetics
  (each classical form, the full list of devices) is partly `full`.

**Iran (the School column, and a few additions).**
- برنامه درسی ملی جمهوری اسلامی ایران (شورای عالی آموزش و پرورش، ۱۳۹۱), learning area «آموزش زبان و ادبیات
  فارسی» (fa.wikisource.org, «برنامه درسی ملی جمهوری اسلامی ایران/حوزه‌های تربیت و یادگیری»): a communicative
  approach (رویکرد ارتباطی); the four skills گوش دادن، سخن گفتن، خواندن، نوشتن, built together in every grade,
  with thinking and critical reading alongside; in primary school language for communication and literature for
  enjoyment, later literature for its art. Persian is the shared language of all Iranians; Baghcheh also respects
  the mother tongues of children who speak another language at home (method.html, section 10).
- Textbooks (سازمان پژوهش و برنامه‌ریزی آموزشی; editions of ۱۴۰۵, read from the PDFs and lesson lists, since
  chap.sch.ir did not open):
  - پایه اول, «فارسی اول» and «نگارش اول»: «نگاره‌ها» (ten picture-reading lessons: خانه، مدرسه، روستا، نوروز…),
    «آموزش نشانه‌ها ۱» (درس ۱–۱۵: آ ب | ـَ د | م س | او ت | ر ن | ای ز | ـِ ـه ش | ی ـُ | ک و | پ گ | ف خ | ق ل |
    ج، «و» read «اُ» | ه چ | ژ، خوا) and «آموزش نشانه‌ها ۲» (درس ۱۶–۲۲: ـّ، ص ذ، ع ث، ح، ض ط، غ، ظ), with «با هم
    بخوانیم» and روان‌خوانی texts, ending with the alphabet table.
  - پایه دوم to ششم, «فارسی» (بخوانیم) and «نگارش» (بنویسیم): 17 lessons a year in 6–7 chapters, each with
    «بخوان و حفظ کن» poems, «حکایت» and «بخوان و بیندیش» stories; the نگارش book's parts are املا، واژه‌آموزی،
    دانش زبانی، درک متن، «بیاموز و بگو»، «هنر و سرگرمی» (سرمشق، نشانه‌گذاری) and نگارش. Literary landmarks:
    پایه دوم درس ۱۲ فردوسی; پایه چهارم درس ۶ آرش کمانگیر; پایه ششم درس ۵ هفت‌خان رستم and درس ۱۰ عطّار و
    جلال‌الدین محمد; پایه ششم «نهاد و گزاره».
  - پایه هفتم to نهم, «فارسی» (17 lessons in the same eight chapters each year: lesson, خودارزیابی, دانش زبانی,
    دانش ادبی, گفت‌وگو, فعالیت‌های نوشتاری, then حکایت / شعرخوانی / روان‌خوانی; a glossary and an index) and
    «نگارش» (8 lessons a year: the lesson, فعالیت‌های نگارشی, درست‌نویسی, then تصویرنویسی, حکایت‌نگاری or
    مَثَل‌نویسی). The grammar and literary points per lesson are in the School column of the Forest objectives.
  - Sources for the lesson lists: daneshchi.ir/farsi-1 … farsi-6 and negaresh-1 … negaresh-6; ostadejazeh.com
    (پایه اول, نشانه per lesson); the ۱۴۰۵ PDFs of فارسی and نگارش ۷–۹ mirrored on dl.heyvagroup.com; gama.ir course
    pages 2292, 493, 793; paadars.com. A teacher should check them against the books in class.
- Weekly hours (جدول ساعات دروس): grades 1–5 are not published in one current official table; teachers' copies
  give فارسی about 11 hours of 24–25 in پایه اول and about 7–8 (reading, املا and انشا together) in پایه دوم to
  پنجم (em90.blogfa.com, andisheman.blogfa.com; unverified). پایه ششم: 5 of 25 (شورای عالی آموزش و پرورش,
  reported by Mehr News, ۲۴ بهمن ۱۳۹۰). پایه هفتم: «زبان و ادبیات فارسی» 4 of 30 (جدول ۱۳۹۲; pana.ir), 2 for فارسی
  with املا and 2 for نگارش (introduction of «نگارش هشتم»). Across the twelve years the national curriculum gives
  Persian about a fifth of teaching time (Mehr News, report on the national curriculum). Each garden's sizing line
  turns these into sessions a week.

**Research (how children learn to read and write).**
- National Reading Panel (2000), *Teaching children to read*, NICHD: the five pillars (phonemic awareness, phonics,
  fluency, vocabulary, comprehension). Ehri, Nunes, Stahl & Willows (2001), *Review of Educational Research* 71(3).
- Scarborough (2001), the reading rope, in Neuman & Dickinson (eds.), *Handbook of Early Literacy Research*, vol. 1:
  word recognition (phonological awareness, decoding, sight words) and language comprehension (background
  knowledge, vocabulary, language structures, verbal reasoning, literacy knowledge) woven together. Gough & Tunmer
  (1986), the simple view of reading, *Remedial and Special Education* 7(1).
- Ehri (2005, 2014), phases of word reading and orthographic mapping, *Scientific Studies of Reading* 9(2), 18(1):
  words become sight words by being decoded and spelled, not by being memorised as shapes. Castles, Rastle &
  Nation (2018), "Ending the reading wars", *Psychological Science in the Public Interest* 19(1).
- **Reading Persian.** Persian script is transparent with vowel marks and opaque without them: short vowels are not
  written, so children first read fully vowelled text, then marks are dropped (by پایه دوم–سوم) and words are
  read through knowledge of the word and its family. Baluch & Besner (1991), *JEP: LMC* 17(4); Rahbari, Sénéchal
  & Arab-Moghaddam (2007), *Reading and Writing* 20(5); Rahbari & Sénéchal (2009), *Reading and Writing* 22(5);
  **Rahbari & Sénéchal (2010), "Learning to read and spell in Persian: a cross-sectional study from Grades 1 to 4",
  *Developmental Psychology* 46(6)**; Rahbari (2019), error patterns in Persian reading and spelling, *Reading and
  Writing* 32(3); Gholamain & Geva (1999), *Language Learning* 49(2); Arab-Moghaddam & Sénéchal (2001),
  *International Journal of Behavioral Development* 25(2); Baluch & Danaye-Tousi (2006), *Annals of Dyslexia*
  56(2); Sadeghi, Everatt & McNeill (2014, 2016), comprehension weaknesses and a simple model of Persian reading,
  *Asia Pacific Journal of Developmental Differences* 1(2), *Writing Systems Research* 8(1); Bakhtiar et al.
  (2021), *Frontiers in Psychology* 12. Related Arabic-script evidence: Abu-Rabia (2001, 2019) on short vowels;
  Saiegh-Haddad & Geva (2008) on morphological awareness. What follows for Baghcheh: vowel marks on every new
  word until the whole alphabet is known, then faded step by step; the letters that sound the same (ت/ط،
  س/ص/ث، ز/ذ/ض/ظ، ه/ح، ق/غ، ا/ع) and املا taught through word families and meaning, not lists; morphology (roots,
  prefixes, suffixes, compounds) as the main way to read unvowelled words and to spell.
- Vocabulary: Beck, McKeown & Kucan (2013), *Bringing Words to Life* (2nd ed.), Guilford: tier 2 words taught on
  purpose, in rich contexts, many times; word families and roots.
- Fluency: Kuhn & Stahl (2003), *Journal of Educational Psychology* 95(1); Rasinski (2010), *The Fluent Reader*:
  repeated and assisted reading of decodable, then real texts; accuracy and expression first, never a timer.
  (Hasbrouck & Tindal (2017) norms are for English and are not used as Persian targets.)
- Comprehension: Shanahan et al. (2010), *Improving reading comprehension in kindergarten through 3rd grade*,
  IES NCEE 2010-4038; Duke & Pearson (2002), "Effective practices for developing reading comprehension": teach
  strategies (predict, question, picture, summarise, infer, monitor), text structure, and talk about texts across
  genres; build knowledge with information texts.
- Writing: Graham et al. (2012), *Teaching elementary school students to be effective writers*, IES NCEE 2012-4058;
  Graham et al. (2016), *Teaching secondary students to write effectively*, IES NCEE 2017-4002; Graham & Perin
  (2007), *Writing Next*; Hochman & Wexler (2017), *The Writing Revolution*: handwriting and spelling made
  automatic, then sentence → paragraph → composition, planning and revising with a model, writing for real readers.
- Dialogic reading for the youngest: Whitehurst et al. (1988), *Developmental Psychology* 24(4).
- Literature: the children's book lists of شورای کتاب کودک (since ۱۳۴۱); classical texts (سعدی، مولوی، فردوسی،
  عطار، کلیله و دمنه، پروین اعتصامی) and anonymous folk tales are free to retell and quote; modern poets and
  writers (عباس یمینی‌شریف، محمود کیانوش، مصطفی رحماندوست، افسانه شعبان‌نژاد، جعفر ابراهیمی، ناصر کشاورز) are
  still under copyright (Iran: life + 50 years), so Baghcheh writes its own poems in their spirit, quotes at most a few
  lines with the poet's name, and points families to the books.

### Strands

| Strand | What grows |
|---|---|
| oral language | listening, talking about pictures and stories, telling and explaining, speaking to a group, standard spoken Persian next to the home language |
| sounds | rhyme, syllables, single sounds (phonemic awareness), then the sounds of poetry (rhythm, metre) |
| print | how books and writing work |
| decoding and spelling | letters and their forms, vowel marks, reading words, املا, letters that sound the same, unvowelled words |
| handwriting | strokes, letters, joined letters, then neat, quick writing; نستعلیق for a taste |
| fluency | accurate, then smooth reading aloud with expression; silent reading |
| vocabulary | everyday and school words, synonyms and opposites, word families, roots and affixes, compounds, dictionary, idioms and proverbs |
| comprehension | literal, inference, main idea, summary, text structure, fact and opinion, critical reading, across stories, poems, information texts and media |
| writing | from a sentence to a paragraph to a composition: describing, telling, reporting, letters, explaining, opinion; planning and revising |
| grammar | the sentence and its parts, nouns, verbs and tenses, adjectives, pronouns, punctuation, then the grammar of پایه هفتم–نهم |
| literature | rhymes and folk tales, children's poems by heart, حکایت, poetry forms and devices, the classics |

### 🌰 دانه — `seed`

Before reading: listening and talking, words, the sounds inside words, how books and writing work, and hands
ready to write. Everything is heard and spoken; the child reads no words yet. Classic stories and rhymes are heard
and told, never read.

Sizing: 2 years × 36 weeks × 3 sessions a week = **216 sessions**: **37 lessons** (about 55 sessions with
replays and reviews) and **about 160 practice sessions** (talk cards, sound games, heard stories and rhymes,
lines to trace). There is no school timetable at this age; 3 short sessions a week is Persian's share (about
a third) of the Seed garden's 20–30 minutes a day.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `read.seed.1` | Tells apart shapes and letter-like shapes that differ in one detail (a dot, a turn, a size) | print | core | پیش از دبستان (آمادگی خواندن) | `read-seed-1` `choose` steps |
| `read.seed.2` | Talks about a picture with a grown-up: names things, says what is happening, answers open questions in whole sentences | oral language | core | پیش از دبستان؛ پایه اول، تصویرخوانی | `talk` steps (the grown-up notes it) |
| `read.seed.3` | Knows and sorts the everyday words of home, family, body, food, animals, clothes, colours and places | vocabulary | core | پیش از دبستان | `sort` and `pairs` with pictures |
| `read.seed.4` | Uses position, size and opposite words (روی، زیر، کنار، پشت؛ بزرگ و کوچک؛ پر و خالی) | vocabulary | core | پیش از دبستان | `choose` with pictures |
| `read.seed.5` | Follows two- and three-step spoken instructions | oral language | core | پیش از دبستان | `doit` and `choose` with `say` |
| `read.seed.6` | Asks and answers «چه کسی؟ کجا؟ چه کار؟ چرا؟» about a picture or a story | oral language | core | پیش از دبستان | `talk`, `choose` |
| `read.seed.7` | Tells an event from their own day, or a story from pictures, in order (اول، بعد، آخرش) | oral language | core | پیش از دبستان؛ پایه اول، تصویرخوانی | `order` of pictures, then `talk` |
| `read.seed.8` | Listens to a story and says who was in it, what happened first, next and last, and how a character felt | comprehension | core | پیش از دبستان | `read-seed-7` (`scene` + `question`, `order`) |
| `read.seed.9` | Tells everyday sounds and spoken words apart (same or different) | sounds | core | پیش از دبستان | `choose` with `say` |
| `read.seed.10` | Hears which words rhyme and finds a rhyming word | sounds | core | پیش از دبستان | `read-seed-4` (`choose` with `say`, `pairs`) |
| `read.seed.11` | Claps and counts the syllables (بخش) of a word, and the words of a short spoken sentence | sounds | core | پیش از دبستان؛ پایه اول، بخش‌بخش کردن | `clap`, `choose` |
| `read.seed.12` | Hears the first sound of a word and finds words that start with the same sound | sounds | core | پیش از دبستان | `read-seed-6` (`choose`, `sort`) |
| `read.seed.13` | Hears the last sound of a word | sounds | full | پیش از دبستان | `choose` with `say` |
| `read.seed.14` | Joins two or three spoken sounds into a word (س… ی… ب → سیب), only by ear | sounds | core | پیش از دبستان | `choose` with `say` (picture options) |
| `read.seed.15` | Knows how a book works: front, right to left, top to bottom, writing and pictures, words and spaces | print | core | پیش از دبستان | `read-seed-8` (`choose`) |
| `read.seed.16` | Knows that writing says something: finds writing around them (signs, packets, their name) and knows their own written name | print | core | پیش از دبستان | `choose`, `home` |
| `read.seed.17` | Draws the lines of writing with control: top to bottom, right to left, curves, waves, circles; holds a pencil well | handwriting | core | پیش از دبستان (آمادگی نوشتن) | `trace` with `path`, `doit` on paper |
| `read.seed.18` | Draws a picture and tells what it says, so a grown-up can write it down (early writing) | writing | core | پیش از دبستان | `home` (not scored) |
| `read.seed.19` | Says along and then says alone short rhymes and children's poems (اتل متل، لالایی، شعرهای کودکانه) | literature | core | پیش از دبستان | `talk`, `home` |
| `read.seed.20` | Knows the classic Persian children's tales (کدو قلقله‌زن، خاله سوسکه، بزبز قندی، شنگول و منگول) and retells one | literature | full | پیش از دبستان | `order`, `talk` |
| `read.seed.22` | Listens to a short information text read aloud (how a seed grows, where animals live) and says one thing they learned | comprehension | core | پیش از دبستان | `scene` + `question` |
| `read.seed.23` | Knows a few letters by shape and sound, starting with the first letter of their name and آ ب م | sounds | full | پیش از دبستان (EYFS، ELOF: letter knowledge) | `choose` with `say` |
| `read.seed.21` | Matches, orders and continues patterns of pictures (visual memory and sequence) | print | full | پیش از دبستان | `read-seed-3` (`pairs`, `order`, `pattern`) |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `read-seed-1` | کدام شبیه است؟ | Visual discrimination: shapes, then letter shapes | lesson (`choose`) | read.seed.1 | core |
| ✅ | `read-seed-11` | این صدای چیست؟ | Everyday sounds and voices (who says «میو»?), loud and soft, then two spoken words: same or different (توپ / توت) | lesson (`choose` with `say`), game (`pairs`) | read.seed.9 | core |
| ✅ | `read-seed-2` | با هم ببینیم و بگوییم | Dialogic talk about picture scenes with a grown-up | story (`talk`) | read.seed.2, read.seed.6 | core |
| ✅ | `read-seed-12` | اسم چیزها | Everyday words by group: fruit, animals, clothes, things at home; hear and tap, sort into baskets, then name things in a picture with a grown-up | lesson (`choose` with `say`), game (`sort`), story (`talk`) | read.seed.3 | core |
| ✅ | `read-seed-13` | بزرگ و کوچک، پر و خالی | Opposites and describing words (بزرگ/کوچک، پر/خالی، گرم/سرد، تند/آرام) with pictures that show them, then pairs of opposites; تمیز/کثیف waits for pictures that show it; position words are in `math-seed-6` | lesson (`choose` with `say`), game (`pairs`) | read.seed.4 | core |
| ✅ | `read-seed-14` | گوش کن و انجام بده | Two- and three-step instructions: what to take first and whom to give it to, then put in order what the voice asks (two and three steps), then do it at home («قاشق را بیاور و روی سفره بگذار») | lesson (`choose` with `say`), game (`order` with `numbered`), home (`doit`) | read.seed.5 | core |
| ✅ | `read-seed-3` | بازی ببین و پیدا کن | Matching, sequencing, patterns | animation, game (`pairs`, `order`, `pattern`) | read.seed.21, read.seed.1 | core |
| ✅ | `read-seed-15` | با هم ببینیم و بگوییم: بازار | Dialogic talk, second scenes: a bazaar and a park; the grown-up asks open questions and stretches the child's answer | story (`talk`) | read.seed.2, read.seed.6 | core |
| ✅ | `read-seed-16` | چه کسی؟ کجا؟ چرا؟ | Question words: a short scene, the voice asks who / where / what / why, the child taps the picture answer; then the child asks the grown-up a question | animation (`scene` + `question`), lesson (`choose` with `say`), story (`talk`) | read.seed.6 | core |
| ✅ | `read-seed-17` | امروز چه کردی؟ | Telling in order: put a morning in order (waking, washing, breakfast, play), then tell the grown-up about today with «اول، بعد، آخرش» | game (`order` with `numbered`), story (`talk`) | read.seed.7 | core |
| ✅ | `read-seed-18` | بازی کلمه‌ها | Unit game: groups of words, opposites, memory pairs of words heard and pictures | game (`sort`, `pairs` with `hidden`) | read.seed.3, read.seed.4 | core |
| ✅ | `read-seed-4` | کلمه‌های هم‌قافیه | Rhyme: hear which words sound alike at the end (picture + spoken word) | animation, lesson (`choose` with `say`), game (`pairs`) | read.seed.10 | core |
| ✅ | `read-seed-19` | شعر قافیه‌دار | Rhyme in a short children's poem: hear it, then pick the word that ends the line | animation (`scene`), lesson (`choose` with `say`) | read.seed.10, read.seed.19 | core |
| ✅ | `read-seed-5` | دست بزن، بشمار | Syllables: clap and count the parts of a word (one to three parts) | animation, lesson (`clap`, `choose`) | read.seed.11 | core |
| ✅ | `read-seed-20` | چند کلمه شنیدی؟ | Words in a spoken sentence: one clap per word (two to five words); long and short words (more claps = longer word; a big thing can have a short name) | lesson (`clap` with `words`, `choose` with `say`) | read.seed.11 | core |
| ✅ | `read-seed-6` | با چه صدایی شروع می‌شود؟ | First sound of a word (oral, pictures only): م، س، ب، ت | animation, lesson (`choose` with `say`), game (`sort` by first sound, `pairs`) | read.seed.12 | core |
| ✅ | `read-seed-7` | قصه گوش کن | Listening comprehension: three heard stories, what happened first/next/last, how a character felt, retelling | animation (`scene` + `question`), game (`order` with `numbered`), story (`talk`) | read.seed.8, read.seed.7 | core |
| ✅ | `read-seed-23` | کدو قلقله‌زن | A classic tale heard as an animation (the old woman, the wolf, the pumpkin), the pictures put in order, then retold to a grown-up | animation (`scene`), game (`order`), story (`talk`) | read.seed.20, read.seed.8 | full |
| ✅ | `read-seed-24` | اتل متل | Rhymes and finger plays: say along, fill in the missing rhyming word, then say it to someone at home | animation (`scene`), lesson (`choose` with `say`), home (`doit`) | read.seed.19, read.seed.10 | full |
| ✅ | `read-seed-8` | کتاب از کجا شروع می‌شود؟ | Print concepts: writing vs pictures, right to left, top to bottom, words and spaces, the first word | animation, lesson (`choose`), story (`talk` with a real book) | read.seed.15 | core |
| ✅ | `read-seed-25` | نوشته‌ها دور و بر ما | Writing all around: which pictures have writing (a sign, a bread bag, a book, a medicine box), what it might say; find three writings at home | lesson (`choose`), home (`doit`) | read.seed.16 | core |
| ✅ | `read-seed-26` | اسم من | The grown-up writes the child's name on a card: find it among others, hear its first sound, decorate it; names of the family | home (`doit`), story (`talk`), lesson (`choose` with `say`) | read.seed.16, read.seed.12 | core |
| ✅ | `read-seed-9` | خط‌های رنگی | Pre-writing: lines top to bottom and right to left, slants, a bowl, hills, waves, zigzags, a circle; each shown being drawn first, then traced; drawing them on paper | lesson (`trace` with `path`), home (`doit`) | read.seed.17 | core |
| ✅ | `read-seed-27` | مداد را درست بگیر | Holding a pencil (three fingers), sitting, the paper; dot-to-dot shapes traced, then on paper | lesson (`intro`, `trace` with `path`), home (`doit`) | read.seed.17 | core |
| ✅ | `read-seed-28` | بکش و بگو | Early writing: draw a picture of something that happened, tell what it says; the grown-up writes the words under it and reads them back | home (`doit`), story (`talk`) | read.seed.18, read.seed.7 | core |
| ✅ | `read-seed-10` | بازی صداها | Unit game: rhyme, syllables, first sound (پ، د) | game (`pairs` with `hidden`, `sort`) | read.seed.10, read.seed.11, read.seed.12 | core |
| ✅ | `read-seed-21` | صدای آخر | Last sound of a word (oral, pictures): which ends with «م»? sort by last sound | lesson (`choose` with `say`), game (`sort`) | read.seed.13 | full |
| ✅ | `read-seed-22` | صداها را به هم بچسبان | Oral blending: hear parts (سـ… یب), then sounds (س… ی… ب), tap the picture; a train whose wagons join | animation (`scene`), lesson (`choose` with `say`) | read.seed.14 | core |
| ✅ | `read-seed-29` | بازی قطار صداها | Unit game: blend sounds to a picture, sort pictures by first and last sound | game (`pairs`, `sort`) | read.seed.14, read.seed.13, read.seed.12 | core |
| ✅ | `read-seed-30` | قصه گوش کن ۲ | Three more heard stories: why a character felt that way, what will happen next, a different ending | animation (`scene` + `question`), story (`talk`) | read.seed.8, read.seed.6 | core |
| ✅ | `read-seed-31` | خاله سوسکه | A second classic tale (shortened, gentle), heard as an animation, put in order, retold | animation (`scene`), game (`order`), story (`talk`) | read.seed.20, read.seed.7 | full |
| ✅ | `read-seed-32` | قصه را تو بگو | A four-picture story with no words: put it in order, then tell it; the grown-up asks «بعدش چه شد؟» | game (`order` with `numbered`), story (`talk`) | read.seed.7 | core |
| ✅ | `read-seed-33` | با هم ببینیم و بگوییم: آشپزخانه | Dialogic talk, third scenes: a kitchen and a family meal; naming, describing, why | story (`talk`) | read.seed.2, read.seed.3 | core |
| ✅ | `read-seed-34` | کتاب علمی گوش کن | A short information text heard with a scene (a seed becomes a plant; animals' homes), questions, one thing learned | animation (`scene` + `question`), story (`talk`) | read.seed.22 | core |
| ✅ | `read-seed-35` | کاسه، دندانه، حلقه | Pre-writing shapes that letters use: a bowl, teeth, a loop, a dot above and below, a long stroke down; each shown, traced, then on paper | lesson (`trace` with `path`), home (`doit`) | read.seed.17 | core |
| ✅ | `read-seed-37` | حرف اول اسم من | A taste of letters: the first letter of the child's name (from a card the grown-up writes) and آ ب م, each shown, heard and found among shapes; no reading yet (listed in `tools/check-reading.js` with no letters: this lesson is `full`, so Sprout still teaches آ ب م for reading) | lesson (`choose` with `say`, `trace`), home (`doit`) | read.seed.23, read.seed.16 | full |
| ✅ | `read-seed-36` | بازی باغچه دانه | Garden game: rhyme, syllables, first and last sounds, word groups, a story in order | game (`pairs` with `hidden`, `sort`, `order`) | read.seed.10, read.seed.11, read.seed.12, read.seed.13, read.seed.3 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ✅ | `read-seed-p1` | Picture-talk cards | A bank of scenes (home, bazaar, park, kitchen, village, seaside, many regions) with three open questions for the grown-up | read.seed.2, read.seed.6 |
| ✅ | `read-seed-p2` | Word-picture bank | Everyday words with picture and voice, by group, for sort and memory games; opposites in pairs | read.seed.3, read.seed.4 |
| ✅ | `read-seed-p3` | Sound-game generator | Rhyme pairs, syllable counts, first and last sounds and blending from a bank of picture words with their syllables and sounds | read.seed.9, read.seed.10, read.seed.11, read.seed.12, read.seed.13, read.seed.14 |
| ✅ | `read-seed-p4` | Heard-story library | Short stories and classic tales with scenes and questions (who, what next, how did they feel) | read.seed.8, read.seed.20 |
| ✅ | `read-seed-p5` | Rhyme and poem bank | Nursery rhymes and short children's poems with voice, to say along | read.seed.19 |
| ✅ | `read-seed-p6` | Line-tracing generator | Paths of growing difficulty (lines, curves, loops, dots) to trace, and a printable sheet for paper | read.seed.17 |
| ✅ | `read-seed-p7` | کدام شبیه است؟ | the same shape (then a letter's shape) among others that differ in one detail. | read.seed.1 |
| ✅ | `read-seed-p8` | کارت‌های جفت | memory games: two cards the same; later things and their opposites. | read.seed.21, read.seed.4 |
| ✅ | `read-seed-p9` | بعدی کدام است؟ | patterns to continue, and growing things put in order. | read.seed.21 |
| ✅ | `read-seed-p10` | این صدای کیست؟ | everyday sounds and animal voices heard, the picture that makes them found. | read.seed.9 |
| ✅ | `read-seed-p11` | گوش کن و جواب بده | a little scene heard, then who / where / what / why. | read.seed.6, read.seed.2 |
| ✅ | `read-seed-p12` | در تصویر پیدا کن | a picture made of things; which of these is in it? | read.seed.2, read.seed.3 |
| ✅ | `read-seed-p13` | کدام جور نیست؟ | three of a group and one that does not belong; later, opposites. | read.seed.3, read.seed.4 |
| ✅ | `read-seed-p14` | گوش کن و انجام بده | a two- or three-step instruction heard; what first, what next, what last. | read.seed.5 |
| ✅ | `read-seed-p15` | به ترتیب بچین | what the voice said, a morning, a story: put the pictures in order. | read.seed.5, read.seed.7 |
| ✅ | `read-seed-p16` | اول کدام بود؟ | two moments of a story or a day; which came first (or last)? | read.seed.7, read.seed.8 |
| ✅ | `read-seed-p17` | چه حسی داشت؟ | a moment heard; how did the child (or animal) feel? | read.seed.8 |
| ✅ | `read-seed-p18` | کتاب و نوشته | writing or picture; where reading starts; what a sign by a shop might say. | read.seed.15, read.seed.16 |
| ✅ | `read-seed-p19` | صداها را جدا کن | picture words sorted by ear: rhyme, number of claps, first sound, last sound. | read.seed.10, read.seed.11, read.seed.12, read.seed.13 |
| ✅ | `read-seed-p20` | جفت صداها | memory pairs by ear: a voice and who makes it, rhyming pictures, pictures that start alike, sounds that join into a word. | read.seed.9, read.seed.10, read.seed.12, read.seed.14 |
| ✅ | `read-seed-p21` | دست بزن | clap a word's parts; later, clap the words of a short sentence (not scored). | read.seed.11 |
| ✅ | `read-seed-p22` | از کجا شروع کنیم؟ | the way lines go: down, right to left, where a circle starts. | read.seed.17, read.seed.15 |
| ✅ | `read-seed-p23` | روی کاغذ | a task on paper for the grown-up to tick: lines and shapes, then a drawing to tell about. | read.seed.17, read.seed.18 |
| ✅ | `read-seed-p24` | حرف اول | the first sound of names, and (after the taste of letters) آ ب م found among others. | read.seed.23, read.seed.16, read.seed.12 |
| ✅ | `read-seed-p25` | شنیدیم، یاد گرفتیم | a short fact heard (how a seed grows, where animals live); one question. | read.seed.22 |

### 🌱 جوانه — `sprout`

The year before school and the start of reading: the sounds inside words (phonemic awareness), picture reading
and talk, hands ready to write, then the first letters (آ ب د م س ـَ), their syllables, words and first
sentences, written by hand and spelled from dictation. The rest of the alphabet follows in Sapling (see the note there).

Sizing: 2 years × 36 weeks: 3 sessions a week in the first year (پیش‌دبستانی, no timetable) and 5 in the second
(پایه اول, where فارسی has about 11 of the week's 24–25 hours, see Frameworks) = **288 sessions**: **27 lessons**
(about 50 sessions with replays and reviews) and **about 235 practice sessions** (sound games, decodable reading and
dictation with the letters taught, handwriting, heard stories and poems). Sprout has 30–45 minutes a day, so a
Persian session is 15–20 minutes.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `read.spr.1` | Joins three or four spoken sounds into a word, and says the sounds of a short word one by one (باد → ب، ا، د) | sounds | core | پیش‌دبستانی؛ پایه اول، آغاز (صداشناسی) | `choose` with `say`; `boxes` |
| `read.spr.2` | Hears where a sound is in a word (start, middle, end) | sounds | core | پیش‌دبستانی؛ پایه اول | `choose` with `say`, `sort` |
| `read.spr.3` | Changes, adds or removes one sound to make a new word (باد → باز → بار) | sounds | core | پایه اول | `choose` with `say` |
| `read.spr.4` | Splits a word into its syllables (بخش) and each syllable into its sounds, the way پایه اول does | sounds | core | پایه اول، بخش‌بخش کردن و صداکشی | `clap`, `choose`, `build` |
| `read.spr.5` | Knows the sound and the forms (alone, start, middle, end) of آ ا ب د م س and the short vowel ـَ | decoding and spelling | core | پایه اول، نشانه‌های آ، ب، ـَ، د، م، س | `read-sprout-1` to `read-sprout-4` (`intro`, `choose`) |
| `read.spr.6` | Reads syllables and words made of the letters taught, with vowel marks, by joining sounds | decoding and spelling | core | پایه اول، نشانه‌های ۱ تا ۶ | `blend`, `choose` (word ↔ picture) |
| `read.spr.7` | Reads decodable phrases and short sentences made of the letters taught and shows what they mean | fluency | core | پایه اول، نشانه‌های ۱ تا ۶ | `read-sprout-5` (`passage`) |
| `read.spr.8` | Spells words of the letters taught from dictation, sound by sound | decoding and spelling | core | پایه اول، املا | `read-sprout-6` (`build` with `hidden`) |
| `read.spr.9` | Writes the letters taught on paper: starting point, direction, size on the line, dots last | handwriting | core | پایه اول، «بنویسیم» نشانه‌های ۱ تا ۶ | `trace`, then `paper` (parent checklist) |
| `read.spr.10` | Sits, holds the pencil and places the paper well; draws the strokes of letters (bowl, tooth, loop) on a line, right to left | handwriting | core | پیش‌دبستانی؛ پایه اول، آمادگی نوشتن | `trace` with `path`, `doit` |
| `read.spr.11` | Reads a picture: says who, where, what is happening and what may happen next, in full sentences | oral language | core | پایه اول، تصویرخوانی | `talk`, `choose` |
| `read.spr.12` | Knows and uses the words of themes children meet (seasons, jobs, the body, nature, feelings, the city and the village) | vocabulary | core | پیش‌دبستانی؛ پایه اول | `sort`, `pairs`, `choose` |
| `read.spr.13` | Tells a story from a series of pictures, with a beginning, a middle and an end | oral language | core | پایه اول، تصویرخوانی و قصه‌گویی | `order`, `talk` |
| `read.spr.14` | Listens to a longer story and says the problem, how it was solved, and predicts what comes next | comprehension | core | پیش‌دبستانی؛ پایه اول، «گوش کن و بگو» | `scene` + `question` |
| `read.spr.15` | Listens to a short information text and answers questions about it | comprehension | core | پایه اول | `scene` + `question` |
| `read.spr.16` | Says children's poems by heart with their rhythm, and finds their rhymes | literature | core | پایه اول، «بخوان و حفظ کن» | `choose` with `say`, `home` |
| `read.spr.17` | Explains how to do something or why something happened, in two or three sentences | oral language | core | پایه اول | `talk` |
| `read.spr.18` | Copies their own name and short words from a model on paper | handwriting | core | پیش‌دبستانی؛ پایه اول | `paper` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `read-sprout-7` | صداها را بشمار | Sounds in a spoken word: hear «باد», tap a counter for each sound (ب، ا، د), then join sounds back into the word | animation (`scene`: a word pulled apart into sounds), lesson (`choose` with `say`), lesson (`boxes`: a counter into a box for each sound) | read.spr.1 | core |
| ✅ | `read-sprout-8` | صدا کجاست؟ | Where a sound is: start, middle or end of a word (س in سیب، کاسه، خروس) | lesson (`choose` with `say`), game (`sort`) | read.spr.2 | core |
| ✅ | `read-sprout-9` | بخش و صدا | Syllables then sounds: clap «بادام» into با‑دام, then pull «با» into ب، ا (the way پایه اول splits words) | lesson (`clap`, `choose` with `say`) | read.spr.4, read.spr.1 | core |
| ✅ | `read-sprout-10` | یک صدا را عوض کن | Change one sound to make a new word (سیب → سیر، ماه → مار، موش → گوش، شیر → سیر، دست → شست), take sounds away (گوشت → گوش، بادام → باد); every word has a picture | animation (`scene`), lesson (`choose` with `say`) | read.spr.3 | core |
| ✅ | `read-sprout-11` | بازی صداها ۲ | Unit game: count sounds, sort by where a sound is, join sounds to pictures | game (`sort`, `pairs` with `hidden`) | read.spr.1, read.spr.2, read.spr.4 | core |
| ✅ | `read-sprout-12` | تصویر را بخوان: خانه | Picture reading as پایه اول opens: a home in the morning; who, where, what is happening, what next; answers in sentences | story (`talk`), lesson (`choose`) | read.spr.11 | core |
| ✅ | `read-sprout-13` | تصویر را بخوان: کوچه و بازار | Picture reading: a street, a bakery, a fruit shop; jobs and the words of the city | story (`talk`), lesson (`choose` with `say`) | read.spr.11, read.spr.12 | core |
| ✅ | `read-sprout-14` | تصویر را بخوان: روستا و طبیعت | Picture reading: a village, fields, a river, animals; the words of nature and the seasons | story (`talk`), game (`sort` by season) | read.spr.11, read.spr.12 | core |
| ✅ | `read-sprout-15` | قصه چهار تصویری | Picture series with no words: order the four pictures, then tell the story with a beginning, middle and end | game (`order` with `numbered`), story (`talk`) | read.spr.13 | core |
| ✅ | `read-sprout-16` | کلمه‌های تازه | Theme words, ten at a time with picture and voice: the body, jobs, feelings, the weather; memory game | lesson (`choose` with `say`), game (`pairs` with `hidden`) | read.spr.12 | core |
| ✅ | `read-sprout-17` | چطور؟ چرا؟ | Explaining: how to wash hands or plant a seed (order the steps, then tell them); why the ice cream melted | game (`order`), story (`talk`) | read.spr.17, read.spr.13 | core |
| ✅ | `read-sprout-18` | قصه گوش کن ۳ | Longer heard stories: the character's problem, how it was solved, what will happen next | animation (`scene` + `question`), story (`talk`) | read.spr.14 | core |
| ✅ | `read-sprout-19` | شنیدیم، یاد گرفتیم | A short information text heard with a scene (bees and honey; how bread is made), questions | animation (`scene` + `question`) | read.spr.15 | core |
| ✅ | `read-sprout-20` | شعر بخوان، حفظ کن | A children's poem heard and said along: its rhythm (clap the beats), its rhymes, then by heart for the family | animation (`scene`), lesson (`clap`, `choose` with `say`), home (`doit`) | read.spr.16 | core |
| ✅ | `read-sprout-21` | روی خط | Writing readiness: sitting, the pencil, the paper; strokes between two lines (down, across from right, a bowl, a tooth, a loop) | lesson (`intro`, `trace` with `path`), home (`paper`) | read.spr.10 | core |
| ✅ | `read-sprout-22` | اسمم را می‌نویسم | Copying one's name from a card the grown-up writes, then the names of the family; letters are not taught yet, only copied | home (`paper`), story (`talk`) | read.spr.18 | core |
| ✅ | `read-sprout-1` | «آ» و «ب» | آ ا ب; آب، بابا | lesson (`intro`, `choose`, `trace`, `blend`) | read.spr.5, read.spr.6 | core |
| ✅ | `read-sprout-2` | «د» و «م» | د م | lesson | read.spr.5, read.spr.6 | core |
| ✅ | `read-sprout-3` | «س» و «ـَ» | س and the short vowel ـَ | lesson | read.spr.5, read.spr.6 | core |
| ✅ | `read-sprout-23` | «آ ب د م س» را بنویس | Handwriting of the letters taught: each form shown being written, traced, then on paper (آ، ب، بـ، د، م، مـ، س، سـ); words آب، بابا، بادام | lesson (`trace`), home (`paper`) | read.spr.9 | core |
| ✅ | `read-sprout-4` | بازی حرف‌ها و صداها | Unit game: letters ↔ sounds, building words | game (`pairs`, `build`, `sort`) | read.spr.5, read.spr.6 | core |
| ✅ | `read-sprout-24` | جدول بخش‌ها | Reading syllables: بَ با بـ، دَ دا، مَ ما، سَ سا, then words (بابا، سَبَد، اَسب، بادام); finding the syllable that was said | lesson (`blend`, `choose` with `say`) | read.spr.6, read.spr.4 | core |
| ✅ | `read-sprout-5` | اولین جمله‌ها | First decodable phrases with آ ب د م س ـَ (بابا آمَد. بابا آب داد.) | story (`passage`), lesson (`blend`) | read.spr.7 | core |
| ✅ | `read-sprout-6` | کلمه‌ها را بساز | Spelling with known letters: hear a word, build it letter by letter (dictation: no word or picture shown until the end) | game (`build` with `hidden` and `extra`) | read.spr.8 | core |
| ✅ | `read-sprout-25` | بلند بخوان: جوانه | Fluency with the letters taught: short decodable lines read aloud, the grown-up marks the hard words, then a re-read | story (`readaloud`) | read.spr.7, read.spr.6 | core |
| ✅ | `read-sprout-26` | املای اول | Dictation on paper: the grown-up says five words of the letters taught, the child writes them, then checks against the answers | home (`paper`), game (`build` with `hidden`) | read.spr.8, read.spr.9 | core |
| ✅ | `read-sprout-27` | بازی باغچه جوانه | Garden game: sounds, letters, syllables, words and a sentence to put in order | game (`pairs` with `hidden`, `build`, `order`, `sort`) | read.spr.1, read.spr.5, read.spr.6, read.spr.7 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ✅ | `read-sprout-p1` | Sound-game generator (phonemes) | From a bank of picture words with their sounds: count the sounds, where is the sound, join sounds, change a sound | read.spr.1, read.spr.2, read.spr.3, read.spr.4 |
| ✅ | `read-sprout-p2` | Decodable library: first letters | Syllables, words, phrases and sentences that use only آ ب د م س ـَ (checked by `tools/check-reading.js`), to read and to match to pictures | read.spr.6, read.spr.7 |
| ✅ | `read-sprout-p3` | Dictation bank: first letters | Words of the letters taught, said aloud, to build with tiles or write on paper (answers for the grown-up) | read.spr.8, read.spr.9 |
| ✅ | `read-sprout-p4` | Handwriting sheets | Printable lines with the letter forms and words taught, model first, then to copy | read.spr.9, read.spr.10, read.spr.18 |
| ✅ | `read-sprout-p5` | Picture-reading cards | Scenes and four-picture stories with questions for the grown-up | read.spr.11, read.spr.13, read.spr.17 |
| ✅ | `read-sprout-p6` | Theme-word bank | Picture words by theme for memory and sort games | read.spr.12 |
| ✅ | `read-sprout-p7` | Heard-story and poem library | Stories, information texts and poems with scenes and questions | read.spr.14, read.spr.15, read.spr.16 |
| ✅ | `read-sprout-p8` | خانه‌های صدا | sound boxes: a counter for each sound of a heard word (not scored). | read.spr.1 |
| ✅ | `read-sprout-p9` | صداها را جدا کن | picture words sorted by how many sounds, or by where a sound is. | read.spr.1, read.spr.2 |
| ✅ | `read-sprout-p10` | یک صدا فرق دارد | memory pairs of two pictures whose names differ in one sound. | read.spr.3 |
| ✅ | `read-sprout-p11` | چرا؟ | something that happened, heard; why did it happen? (explaining, causes). | read.spr.17, read.spr.14 |
| ✅ | `read-sprout-p12` | حرف را پیدا کن | a letter taught, heard and found among letters that look alike. | read.spr.5 |
| ✅ | `read-sprout-p13` | حرف و تصویر | letters matched to the pictures whose names start with their sound. | read.spr.5 |
| ✅ | `read-sprout-p14` | کلمه بساز | a picture and its word built from letter or syllable tiles (shown, not dictation). | read.spr.6, read.spr.4 |
| ✅ | `read-sprout-p15` | کدام بخش را شنیدی؟ | a syllable heard; the child finds it among others. | read.spr.4, read.spr.6 |
| ✅ | `read-sprout-p16` | جمله بساز | words put in order to make a sentence (each word decodable). | read.spr.7 |
| ✅ | `read-sprout-p17` | بلند بخوان | a short decodable line read aloud, the grown-up marks the hard words (not scored). | read.spr.7, read.spr.6 |

### 🌿 نهال — `sapling`

The rest of the alphabet (the second half of پایه اول), then reading and writing as پایه دوم and سوم expect:
vowel marks faded until text is read without them, smooth reading aloud, understanding stories, poems and
information texts, words and word families, املا, first grammar, and writing from a sentence to a paragraph.

**Note on the alphabet.** By age the Sprout garden matches پیش‌دبستانی and پایه اول, but the built letter lessons
`read-sapling-1` to `read-sapling-28` sit here, and the placement check sends a child who reads a few words to
Sapling. So Sapling starts with the second half of پایه اول. The best systems (England's Reception and Year 1, Ireland, Singapore)
teach every letter–sound by about age 6–7, so the recommendation is to move those lessons to Sprout (only their
`level` would change; ids stay) once the user and a teacher agree (see the end of this file); the rows below are
ordered so that the move would be one block.

Sizing: 2 years × 36 weeks × 5 sessions a week = **360 sessions**: **89 lessons** (about 130 sessions with replays and
reviews) and **about 235 practice sessions** (decodable and then real reading, dictation, word families,
handwriting, writing tasks). Numbers used: Sapling has 45–60 minutes a day; in پایه دوم and سوم Persian
(reading, املا and انشا) has about 8 of the week's 25 hours, so Persian is a 15–20 minute session every day.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `read.sap.1` | Knows the sound and forms of the letters and signs after the first six: او ت ر ای ن ز ـِ ـه ش ـُ ک ه پ ل ج گ چ خ ف ق ی ژ | decoding and spelling | core | پایه اول، آموزش نشانه‌ها ۱، درس ۴ تا ۱۵ | each letter lesson (`intro`, `choose`, `blend`) |
| `read.sap.2` | Reads words with the letters that share a sound with an earlier one: ص ث، ذ ض ظ، ط ح، ع غ | decoding and spelling | core | پایه اول، آموزش نشانه‌ها ۲، درس ۱۷ تا ۲۲ | `read-sapling-13` to `read-sapling-16`, `read-sapling-23` |
| `read.sap.3` | Reads ـّ (تشدید), ـً (تنوین) and the hamza forms ء، ئـ، ئ | decoding and spelling | core | پایه اول، درس ۱۶ (ـّ)؛ ـً و همزه در پایه دوم و سوم | `read-sapling-17`, `read-sapling-20` |
| `read.sap.4` | Reads «و» as v (وَرزِش), as «او», as «اُ» (تو، خود، دو), and «و» for "and"; reads «خوا» (خواهر) and final «ـه» as «ـِ» (خانه) | decoding and spelling | core | پایه اول، درس ۷، ۹، ۱۳، ۱۵ | `blend`, `choose` |
| `read.sap.5` | Knows a letter's forms at the start, middle and end of a word, and the seven letters that never join the next one (ا د ذ ر ز ژ و) | decoding and spelling | core | پایه اول | `read-sapling-22` (`sort`, `pairs`) |
| `read.sap.6` | Reads decodable sentences and short stories that use the letters taught and answers questions about them | comprehension | core | پایه اول، «با هم بخوانیم» و روان‌خوانی | `passage` steps |
| `read.sap.7` | Spells from dictation words with any letter, choosing among same-sound letters by remembering the word | decoding and spelling | core | پایه اول، املا | `build` with `hidden`, `paper` |
| `read.sap.8` | Writes every letter and joined words by hand: each form, the joins, dots last, on the line | handwriting | core | پایه اول، نگارش | `trace` with joined forms, `paper` |
| `read.sap.9` | Puts words in order to make a sentence and ends it with «.» or «؟» | grammar | core | پایه اول، نگارش | `read-sapling-25` (`order`) |
| `read.sap.10` | Reads aloud accurately, then more smoothly by re-reading | fluency | core | پایه اول تا سوم، روان‌خوانی | `readaloud` (parent-marked) |
| `read.sap.11` | Reads text with vowel marks only on new or unclear words (پایه دوم), then without marks (پایه سوم), choosing a word's vowels from the sentence and its family | decoding and spelling | core | پایه دوم و سوم | `passage` without marks, `choose` |
| `read.sap.12` | Reads a page of a story or poem aloud smoothly, with expression and pauses at punctuation | fluency | core | پایه دوم و سوم، روان‌خوانی | `readaloud` |
| `read.sap.13` | Answers who, where and what questions and retells a text in order in their own words | comprehension | core | پایه دوم، «درک متن» | `passage` + question, `order` |
| `read.sap.14` | Infers why something happened, how a character felt and what a word means from the sentence; says the lesson of a story or حکایت | comprehension | core | پایه دوم و سوم، «بخوان و بیندیش»، «حکایت» | `passage` + question, `talk` |
| `read.sap.15` | Reads an information text: title, pictures and captions; finds a fact and says what they learned | comprehension | core | پایه دوم، درس ۱۶–۱۷؛ پایه سوم، درس ۱۵–۱۷ | `passage` + question |
| `read.sap.16` | Knows synonyms (هم‌معنی) and opposites (مخالف) and uses them in a sentence | vocabulary | core | پایه دوم و سوم، واژه‌آموزی | `pairs`, `choose` in a sentence |
| `read.sap.17` | Finds word families (هم‌خانواده: دانش، دانا، دانشمند) and uses them to read and spell | vocabulary | core | پایه دوم و سوم، واژه‌آموزی و املا | `sort`, `build` |
| `read.sap.18` | Makes and understands words with common suffixes and compounds (ـی، ـچه، ـبان، ـگر، ـدان، ـستان، ـمند؛ گل‌فروش، کتاب‌خانه) | vocabulary | core | پایه دوم و سوم، واژه‌آموزی | `build`, `choose` |
| `read.sap.19` | Learns new words from a text and uses them (tier 2 words) | vocabulary | core | پایه دوم و سوم، واژه‌آموزی | `choose` in context, `pairs` |
| `read.sap.20` | Changes singular to plural and back (ـها، ـان) | grammar | core | پایه دوم، دانش زبانی | `sort`, `choose` |
| `read.sap.21` | Spells common words with same-sound letters and homophones correctly by meaning and family (صد/سد، خار/خوار) | decoding and spelling | core | پایه دوم و سوم، املا | `choose` in a sentence, `build` with `hidden`, `paper` |
| `read.sap.22` | Uses «.»، «؟»، «!»، «،» and «« »» in writing | grammar | core | پایه دوم و سوم، نگارش (نشانه‌گذاری) | `choose`, `paper` |
| `read.sap.23` | Tells naming words (اسم), action words (فعل) and describing words (صفت) apart; proper and common names | grammar | core | پایه سوم، دانش زبانی | `sort`, `mark` |
| `read.sap.24` | Uses past, present and future verbs and their endings for من، تو، او، ما، شما، آن‌ها | grammar | core | پایه سوم، دانش زبانی | `sort`, `choose` |
| `read.sap.25` | Writes sentences: completes one, answers a question in a whole sentence, writes about a picture, joins two with «و»، «امّا»، «چون» | writing | core | پایه دوم، نگارش | `order`, `paper` |
| `read.sap.26` | Writes four to six connected sentences about a picture, an experience or a thing, then reads them back and fixes them | writing | core | پایه دوم و سوم، نگارش | `paper` (parent checklist) |
| `read.sap.27` | Writes a paragraph that starts with what it is about and goes on with details, and a short story with a beginning, middle and end | writing | core | پایه سوم، نگارش | `order`, `paper` |
| `read.sap.34` | Writes an opinion with a reason or two and a linking word (چون، برای اینکه، پس) | writing | core | پایه دوم و سوم (CCSS W.2.1, W.3.1) | `order`, `paper` |
| `read.sap.35` | Writes a short information text: a topic, two or three facts, a closing sentence | writing | core | پایه سوم، نگارش (CCSS W.2.2, W.3.2) | `paper` |
| `read.sap.36` | Compares two texts on the same subject: what is the same, what is different | comprehension | core | پایه سوم (CCSS RI.2.9, RL.2.9) | `passage`, `sort` |
| `read.sap.37` | Does a small research task with a grown-up: a question, a book or page, three facts written down | writing | full | (CCSS W.2.7, W.3.7; England Y3) | `paper` |
| `read.sap.28` | Writes a short letter, message or invitation, and a diary entry | writing | full | پایه سوم، نگارش | `paper` |
| `read.sap.29` | Says poems by heart with their rhythm, and enjoys حکایت and folk tales | literature | core | پایه دوم و سوم، «بخوان و حفظ کن»، «حکایت» | `readaloud`, `home` |
| `read.sap.30` | Knows the letters' names and the alphabet's order; finds a word in a children's dictionary | vocabulary | core | پایه اول (جدول الفبا)؛ پایه سوم | `order`, `choose` |
| `read.sap.31` | Tells a story, a book or something they saw to the family, clearly and in order | oral language | core | پایه دوم و سوم، «بیاموز و بگو» | `talk` |
| `read.sap.32` | Reads a short book alone and talks about it | literature | core | پایه دوم، «کتابخانه کلاس ما» | `talk`, `paper` |
| `read.sap.33` | Copies a paragraph neatly with even letters and spaces, at a comfortable speed | handwriting | core | پایه دوم و سوم، «هنر و سرگرمی» (سرمشق) | `paper` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `read-sapling-1` | «او» و «ت» | او (long u), ت | lesson | read.sap.1 | core |
| ✅ | `read-sapling-2` | «ر» و «ای» | ر، ای (long i) | lesson | read.sap.1 | core |
| ✅ | `read-sapling-3` | «ن» و «ز» | ن ز | lesson, story (`passage`) | read.sap.1, read.sap.6 | core |
| ✅ | `read-sapling-4` | «ش» و «ـِ» | ش and the short vowel ـِ | lesson, story | read.sap.1, read.sap.6 | core |
| ✅ | `read-sapling-5` | «ـُ» و «ک» | the short vowel ـُ, ک | lesson, story | read.sap.1, read.sap.6 | core |
| ✅ | `read-sapling-29` | «و» | Consonant «و» (v) as in پایه اول درس ۹: وَرزِش، آواز، گاو؛ «او» or «و»? «و» for "and" (formal «وَ», everyday «وُ») | lesson (`intro`, `choose`, `trace`, `blend`), story (`passage`) | read.sap.4 | core |
| ✅ | `read-sapling-18` | بازی کلمه‌ها | Unit game: words so far | game (`pairs`, `build`, `sort`, `order`) | read.sap.1, read.sap.6 | core |
| ✅ | `read-sapling-6` | جمله بخوانیم، معنا بفهمیم | Reading sentences for meaning | story (`passage` ×4) | read.sap.6 | core |
| ✅ | `read-sapling-7` | «ه» و «ـه» | ه and final ـه (as a vowel) | lesson, story | read.sap.1, read.sap.4 | core |
| ✅ | `read-sapling-8` | «پ» و «ل» | پ ل | lesson, story | read.sap.1 | core |
| ✅ | `read-sapling-9` | «ج» و «گ» | ج گ | lesson, story | read.sap.1 | core |
| ✅ | `read-sapling-10` | «چ» و «خ» | چ خ | lesson, story | read.sap.1 | core |
| ✅ | `read-sapling-11` | «ف» و «ق» | ف ق | lesson, story | read.sap.1 | core |
| ✅ | `read-sapling-19` | بازی کلمه‌ها ۲ | Unit game | game (`sort`, `build`, `pairs`, `order`) | read.sap.1, read.sap.6 | core |
| ✅ | `read-sapling-12` | «یـ» و «ژ» | consonant ی, ژ | lesson, story | read.sap.1 | core |
| ✅ | `read-sapling-30` | «خود» و «خواهر» | «و» read as «اُ» (تو، خود، دو، خوش) and silent «و» in «خوا» (خواهر، خواب، خواندن), as in پایه اول درس ۱۳ and ۱۵ | lesson (`intro`, `choose`, `blend`), story (`passage`) | read.sap.4 | core |
| ✅ | `read-sapling-13` | «ص» و «ث» | ص ث (same sound as س) | lesson, story | read.sap.2 | core |
| ✅ | `read-sapling-14` | «ذ»، «ض» و «ظ» | ذ ض ظ (same sound as ز) | lesson, story | read.sap.2 | core |
| ✅ | `read-sapling-15` | «ط» و «ح» | ط ح | lesson, story | read.sap.2 | core |
| ✅ | `read-sapling-16` | «ع» و «غ» | ع غ | lesson, story | read.sap.2 | core |
| ✅ | `read-sapling-17` | «ـّ» و «ـً» | tashdid, tanvin | lesson, story | read.sap.3 | core |
| ✅ | `read-sapling-20` | «ء» و «ئـ» | hamza forms: ء alone, ئـ on a tooth, ئ (جزء، تئاتر، مسئله) | lesson, story | read.sap.3 | core |
| ✅ | `read-sapling-21` | بازی کلمه‌ها ۳ | Unit game: the last letters (ژ ص ح ط ع غ ذ، tashdid, tanvin, hamza) | game (`pairs`, `build`, `sort`) | read.sap.2, read.sap.3 | core |
| ✅ | `read-sapling-22` | شکل‌های یک حرف | Letter forms: alone, start, middle, end (ب بـ ـبـ ـب; ن ع ه ی ج); where «ب» sits in a word. To revise: add the seven letters that never join the next one | game (`pairs`, `sort`) | read.sap.5 | core |
| ✅ | `read-sapling-23` | حرف‌های هم‌صدا | Same sound, different letters: ت/ط، س/ص/ث، ز/ذ/ض/ظ، ه/ح، ق/غ، ا/ع | animation, game (`sort` by letter in known words) | read.sap.2, read.sap.7 | core |
| ✅ | `read-sapling-24` | املا | Dictation: hear a word, build it letter by letter, with a same-sound letter among the tiles | game (`build` with `hidden`) | read.sap.7 | core |
| ✅ | `read-sapling-25` | جمله بساز | Order words into a sentence; full stop and question mark | game (`order` of words), lesson (`choose`) | read.sap.9 | core |
| ✅ | `read-sapling-26` | کلمه‌ها را به هم بنویس | Writing joined letters: the forms of «ب», then whole words (بابا، نان، لب، سیب، دست), each joined piece in one go, dots last | lesson (`intro`, `trace` with joined forms and whole words from `js/strokes.js`) | read.sap.8 | core |
| ✅ | `read-sapling-27` | قصه‌های کوتاه | Three short decodable stories (Rasht, Bushehr, Sanandaj), each shown as an animation first, then read, with questions | animation, story (`passage`) | read.sap.6 | core |
| ✅ | `read-sapling-28` | بلند بخوان | Fluency: five short passages read aloud; the parent marks the hard words, they practise them, the child re-reads (accuracy only, never a timer) | story (`readaloud`: parent-marked, not scored) | read.sap.10 | core |
| ✅ | `read-sapling-31` | دندانه‌دارها را بنویس | Handwriting: ب پ ت ث ن ی in every form, joined in words (تاب، نان، پنیر، بینی), on the line, dots last; then on paper | lesson (`intro`, `trace` with joined forms), home (`paper`) | read.sap.8 | core |
| ✅ | `read-sapling-32` | کاسه‌دارها را بنویس | Handwriting: س ش ص ض and the bowls of ن ق ل ی at the end (سوسن، شیش، صابون، قاشق) | lesson (`trace` with joined forms), home (`paper`) | read.sap.8 | core |
| ✅ | `read-sapling-33` | «ج چ ح خ» و «ع غ» را بنویس | Handwriting: the hook letters and the forms of ع غ (بچه، حلزون، جعبه، باغ) | lesson (`trace` with joined forms), home (`paper`) | read.sap.8 | core |
| ✅ | `read-sapling-34` | «ک گ ف ق م ه ط ظ» را بنویس | Handwriting: the tall and round letters (کفش، گلدان، مهتاب، طوطی، ظرف) | lesson (`trace` with joined forms), home (`paper`) | read.sap.8 | core |
| ✅ | `read-sapling-35` | حرف‌هایی که نمی‌چسبند | ا د ذ ر ز ژ و never join the next letter: sort letters, find the gaps in words (دارو، روز، ژاله), write words with them | game (`sort`), lesson (`trace`), home (`paper`) | read.sap.5, read.sap.8 | core |
| ✅ | `read-sapling-36` | جدول الفبا | The 32 letters in order with their names (الف، بِ، پِ … واو، ه، ی) as پایه اول ends; put letters in order; say a word's letters by name | animation (`scene`), game (`order`), lesson (`choose` with `say`) | read.sap.30 | core |
| ✅ | `read-sapling-37` | با هم بخوانیم | Longer vowelled texts with every letter: a short story and a poem, read with a grown-up, then alone; questions | story (`passage`, `readaloud`) | read.sap.6, read.sap.10 | core |
| ✅ | `read-sapling-38` | املای جمله | Dictation of short sentences: the grown-up reads, the child writes on paper, then checks word by word against the answer; tiles for the hardest words | home (`paper`), game (`build` with `hidden`) | read.sap.7, read.sap.8 | core |
| ✅ | `read-sapling-39` | نشانه‌ها کم می‌شوند | Fading marks: the same text with all marks, then marks only on new words; finding a word's vowels from the sentence (گُل یا گِل؟) | story (`passage`), lesson (`choose`) | read.sap.11 | core |
| ✅ | `read-sapling-40` | کلمه‌های پرکاربرد | Common words read without marks at a glance (است، این، آن، که، را، با، از، می‌رود، بود), each one first decoded, then found fast in sentences | game (`pairs` with `hidden`), lesson (`choose`) | read.sap.11, read.sap.10 | core |
| ✅ | `read-sapling-41` | بلند بخوان ۲ | Fluency with fewer marks: short texts read aloud, hard words practised, re-read with expression | story (`readaloud`) | read.sap.10, read.sap.12 | core |
| ✅ | `read-sapling-42` | هم‌معنی | Synonyms: match pairs, then pick the word that can replace one in a sentence (شاد/خوشحال، زیبا/قشنگ) | game (`pairs`), lesson (`choose`) | read.sap.16 | core |
| ✅ | `read-sapling-43` | مخالف | Opposites: pairs, then finish a sentence with the opposite (بالا/پایین، روز/شب، زود/دیر) | game (`pairs` with `hidden`), lesson (`choose`) | read.sap.16 | core |
| ✅ | `read-sapling-44` | یکی، چندتا | Singular and plural with ـها and ـان (گل‌ها، درختان); which takes which | game (`sort`), lesson (`choose`) | read.sap.20 | core |
| ✅ | `read-sapling-45` | بازی کلمه‌ها ۴ | Unit game: synonyms, opposites, plurals, common words | game (`pairs`, `sort`) | read.sap.16, read.sap.20, read.sap.11 | core |
| ✅ | `read-sapling-46` | قصه و آدم‌هایش | Story comprehension: who, where, what happened; put the events in order; retell to the grown-up | animation (`scene`), story (`passage`, `talk`), game (`order`) | read.sap.13 | core |
| ✅ | `read-sapling-47` | چرا این‌طور شد؟ | Inference: why, how did they feel, what will happen next; a word's meaning from the sentence | story (`passage`), lesson (`choose`) | read.sap.14 | core |
| ✅ | `read-sapling-48` | حکایت | Short حکایت in our own words (the lion and the mouse; the clever child): read, say the lesson, tell it at home | animation (`scene`), story (`passage`, `talk`) | read.sap.14, read.sap.29 | core |
| ✅ | `read-sapling-49` | بخوان و حفظ کن | A children's poem written for Baghcheh: read it, clap its rhythm, find its rhymes, say it by heart for the family | story (`readaloud`), lesson (`clap`, `choose`), home (`doit`) | read.sap.29, read.sap.12 | core |
| ✅ | `read-sapling-50` | جمله را کامل کن | Sentences: finish a sentence, answer a question with a whole sentence, put a word in the right place | lesson (`choose`), game (`order`) | read.sap.25 | core |
| ✅ | `read-sapling-51` | نشانه‌های نوشتن | Punctuation: «.»، «؟»، «!»، «،» and «« »» for what someone says; put the missing mark | lesson (`choose`), story (`passage`) | read.sap.22 | core |
| ✅ | `read-sapling-52` | درباره تصویر بنویس | Three to five sentences about a picture on paper: who, where, what is happening; the grown-up ticks a short checklist | lesson (`choose`), home (`paper`) | read.sap.25, read.sap.26 | core |
| ✅ | `read-sapling-53` | هم‌صداها در کلمه‌ها | املا of same-sound letters in common words, using the family to decide (صبح ← صبحانه، ظهر ← ظهرها، حیاط) | game (`sort`, `build` with `hidden`), lesson (`choose`) | read.sap.21, read.sap.17 | core |
| ✅ | `read-sapling-54` | خانواده کلمه‌ها | Word families: words that share a root (دان، دانا، دانش، دانشمند; کار، کارگر، کارخانه); sort and build | game (`sort`, `build`), lesson (`choose`) | read.sap.17 | core |
| ✅ | `read-sapling-55` | کلمه بساز | Suffixes: ـی (ایرانی)، ـچه (باغچه)، ـبان (باغبان)، ـگر (کارگر)، ـدان (نمکدان)، ـستان (گلستان)؛ what each adds | game (`build`), lesson (`choose`) | read.sap.18 | core |
| ✅ | `read-sapling-56` | کلمه‌های مرکب | Compound words (گل‌فروش، کتاب‌خانه، آب‌پاش، دست‌کش): split them, say what they mean, write them with a half-space | game (`build`, `pairs`), lesson (`choose`) | read.sap.18 | core |
| ✅ | `read-sapling-57` | بازی کلمه‌سازی | Unit game: families, suffixes, compounds | game (`sort`, `build`, `pairs` with `hidden`) | read.sap.17, read.sap.18 | core |
| ✅ | `read-sapling-58` | بخوانیم و یاد بگیریم | Information text: title, pictures, captions; find a fact, say what you learned (how rain falls; bees) | story (`passage`), lesson (`choose`) | read.sap.15 | core |
| ✅ | `read-sapling-59` | کلمه‌های تازه | Tier 2 words from texts: meet the word in a sentence, a child-friendly meaning, examples, use it (مواظب، تصمیم، کمک کردن) | lesson (`choose` in a sentence), game (`pairs`) | read.sap.19 | core |
| ✅ | `read-sapling-60` | برایم تعریف کن | Speaking: tell the family a story or what you learned, in order; the grown-up asks two questions | story (`talk`), home (`doit`) | read.sap.31 | core |
| ✅ | `read-sapling-61` | کتاب‌خوانی | Reading a short book alone (from home or a library), then talking about it: who, what, favourite part; a book list for families | story (`talk`), home (`paper`), parent tip (`forparents`) | read.sap.32 | core |
| ✅ | `read-sapling-62` | متن بی‌نشانه | Reading without vowel marks: stories and information texts with no marks; when a word could be read two ways, the sentence decides | story (`passage`), lesson (`choose`) | read.sap.11 | core |
| ✅ | `read-sapling-63` | روان و با حالت | Fluency: punctuation pauses, a question's tune, a character's voice; read, practise, re-read | story (`readaloud`) | read.sap.12 | core |
| ✅ | `read-sapling-64` | اسم | Naming words: people, animals, things, places; proper names (تبریز، سارا) and common names | game (`sort`), lesson (`mark`: tap the names in a sentence) | read.sap.23 | core |
| ✅ | `read-sapling-65` | فعل | Action words: what someone does; find the verb at the end of a Persian sentence | game (`sort`), lesson (`mark`) | read.sap.23 | core |
| ✅ | `read-sapling-66` | صفت | Describing words: colour, size, how something is (سیب سرخ، کوه بلند); add a describing word to a sentence | lesson (`choose`, `mark`) | read.sap.23 | core |
| ✅ | `read-sapling-67` | دیروز، امروز، فردا | Verb tense: past, present, future (رفت، می‌رود، خواهد رفت) | game (`sort`), story (`passage`) | read.sap.24 | core |
| ✅ | `read-sapling-68` | من، تو، او | Person: verb endings for من، تو، او، ما، شما، آن‌ها (رفتم، رفتی، رفت …) | lesson (`choose`), game (`pairs`) | read.sap.24 | core |
| ✅ | `read-sapling-69` | بازی دستور | Unit game: names, verbs, describing words, tenses | game (`sort`, `pairs`, `order`) | read.sap.23, read.sap.24 | core |
| ✅ | `read-sapling-70` | خار یا خوار؟ | Homophones and spelling in context (صد/سد، خار/خوار، خاستن/خواستن، اسرار/اصرار): the sentence decides | lesson (`choose` in a sentence) | read.sap.21 | core |
| ✅ | `read-sapling-71` | املای تشدید، تنوین و همزه | Spelling ـّ (بنّا)، ـً (فوراً) and ء ئ (جزء، مسئله; پاییز with «ی», as the Academy's rules write it) in common words | game (`build` with `hidden`), lesson (`choose`) | read.sap.21, read.sap.3 | core |
| ✅ | `read-sapling-72` | املای بند | Dictation of a short paragraph on paper, then self-check with the text, then the hard words again with tiles | home (`paper`), game (`build` with `hidden`) | read.sap.7, read.sap.21 | core |
| ✅ | `read-sapling-73` | جمله‌ها را به هم وصل کن | Joining sentences with «و»، «امّا»، «چون»، «بعد»؛ which joining word fits | lesson (`choose`), game (`order`) | read.sap.25 | core |
| ✅ | `read-sapling-74` | بند بنویسیم | A paragraph: order the sentences of a model paragraph (the first says what it is about), then write one about a picture on paper | game (`order`), home (`paper`), story (`talk`) | read.sap.27, read.sap.26 | core |
| ✅ | `read-sapling-75` | قصه بنویس | A story from three pictures: beginning, middle, end; plan with the pictures, write, read it back, fix one thing | game (`order` with `numbered`), home (`paper`), story (`talk`) | read.sap.27 | core |
| ✅ | `read-sapling-76` | نامه و دعوت‌نامه | Reading and writing a short letter, a message and an invitation: who to, what, from whom | story (`passage`), home (`paper`) | read.sap.28 | full |
| ✅ | `read-sapling-77` | دفتر خاطرات | A diary entry: when, what happened, how I felt; a week of short entries at home | story (`passage`), home (`paper`) | read.sap.28, read.sap.26 | full |
| ✅ | `read-sapling-78` | شعر بخوانیم | Children's poems: rhythm, rhyme, picturing the poem; learn one by heart | animation (`scene`), game (`pairs` of rhyming words), home (`doit`), story (`readaloud`), lesson (`choose`) | read.sap.29, read.sap.12 | core |
| ✅ | `read-sapling-79` | قصه‌های کهن | An animal fable from کلیله و دمنه and a folk tale (ماه‌پیشونی), retold for Baghcheh: read, the lesson, tell it | animation (`scene`), story (`passage`, `talk`) | read.sap.29, read.sap.14 | core |
| ✅ | `read-sapling-80` | به ترتیب الفبا | Alphabetical order by the first, then the second letter; finding a word in a children's dictionary | game (`order`), lesson (`choose`) | read.sap.30 | core |
| ✅ | `read-sapling-81` | در فرهنگ لغت | Using a dictionary page: find the word, read its meaning, pick the meaning that fits the sentence | lesson (`choose`), story (`passage`) | read.sap.30, read.sap.19 | core |
| ✅ | `read-sapling-82` | سرمشق | Neat handwriting: letter sizes, spaces between words, a model line copied on paper; a paragraph copied without hurry | lesson (`trace` with whole words), home (`paper`) | read.sap.33 | core |
| ✅ | `read-sapling-83` | متن علمی ۲ | A longer information text (the sea, the forest): headings, a fact from each part, a new word from its sentence | story (`passage`), lesson (`choose`) | read.sap.15, read.sap.19 | core |
| ✅ | `read-sapling-84` | گزارش کوتاه | Reporting: tell, then write three sentences about something seen (a trip to the bakery, a plant growing) | story (`talk`), home (`paper`) | read.sap.31, read.sap.35 | core |
| ✅ | `read-sapling-86` | نظر من | Opinion: say what you like best and why; order a model (opinion, reason, «چون», ending), then write one on paper | game (`order`), home (`paper`) | read.sap.34 | core |
| ✅ | `read-sapling-87` | درباره‌اش بنویس | Information writing: a topic sentence, three facts from a text, a closing sentence, on paper | story (`passage`), home (`paper`) | read.sap.35 | core |
| ✅ | `read-sapling-88` | دو متن، یک موضوع | Two short texts about the same animal or place: sort what is the same and what is different | story (`passage`), game (`sort`) | read.sap.36 | core |
| ✅ | `read-sapling-89` | پژوهش کوچک | A question, a book or page with a grown-up, three facts written down, told to the family | home (`paper`), story (`talk`), parent tip (`forparents`) | read.sap.37 | full |
| ✅ | `read-sapling-85` | بازی باغچه نهال | Garden game: unvowelled words, families, grammar, homophones, a story in order | game (`sort`, `pairs` with `hidden`, `build`, `order`), lesson (`choose`) | read.sap.11, read.sap.17, read.sap.21, read.sap.23, read.sap.13 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ✅ | `read-sapling-p1` | Decodable library, growing with the letters | Words, sentences and short stories that use only the letters taught so far (checked by `tools/check-reading.js`), with a picture question; after the alphabet, levelled texts with fewer marks | read.sap.6, read.sap.10, read.sap.11 |
| ✅ | `read-sapling-p2` | Dictation bank (املا) | Words, then sentences, then short paragraphs by letter group, same-sound letters and homophones, with audio; tiles or paper, with the answer for the grown-up | read.sap.7, read.sap.21 |
| ✅ | `read-sapling-p3` | Handwriting sheets | Printable models of each letter group and joined words, then model lines (سرمشق) | read.sap.8, read.sap.33 |
| ✅ | `read-sapling-p4` | Word-family and suffix bank | Roots with their families, suffixes and compounds, for sort and build games | read.sap.17, read.sap.18 |
| ✅ | `read-sapling-p5` | Synonym, opposite and plural bank | Pairs and sentences for matching and fill-in games | read.sap.16, read.sap.20 |
| ✅ | `read-sapling-p6` | Fluency passages | Short texts for repeated reading aloud, parent-marked, from vowelled to unvowelled | read.sap.10, read.sap.12 |
| ✅ | `read-sapling-p7` | Comprehension texts | Stories, حکایت and information texts with who/what/why/what next questions | read.sap.13, read.sap.14, read.sap.15 |
| ✅ | `read-sapling-p8` | Grammar sentence bank | Sentences tagged by word class and tense for sort and tap games | read.sap.23, read.sap.24 |
| ✅ | `read-sapling-p9` | Writing prompts | Pictures and topics for sentences, paragraphs, stories, letters and diary entries, each with a model and a checklist | read.sap.25, read.sap.26, read.sap.27, read.sap.28 |
| ✅ | `read-sapling-p10` | حرف را پیدا کن | a letter taught, found among letters that look alike, or the letter a picture starts with. | read.sap.1, read.sap.30 |
| ✅ | `read-sapling-p11` | بخوان و پیدا کن | read a word and tap its picture, or see a picture and tap its word. | read.sap.1, read.sap.6 |
| ✅ | `read-sapling-p12` | حرف به حرف بساز | the picture's word built from letter tiles, with one tile too many. | read.sap.1, read.sap.7 |
| ✅ | `read-sapling-p13` | کلمه و تصویر | memory pairs and open pairs: each written word with its picture. | read.sap.6 |
| ✅ | `read-sapling-p14` | جمله بساز | words (or phrases) put in order to make a sentence; the full stop goes last. | read.sap.9, read.sap.25 |
| ✅ | `read-sapling-p15` | شکل‌های حرف | a letter alone and its form at the start of a word; letters that join or not. | read.sap.5, read.sap.8 |
| ✅ | `read-sapling-p16` | کدام درست است؟ | a picture and two spellings with a same-sound letter; later homophones in a sentence. | read.sap.7, read.sap.21 |
| ✅ | `read-sapling-p17` | نشانه بگذار | which mark ends a sentence (. ؟ !), the comma, and «» for what someone says. | read.sap.9, read.sap.22 |
| ✅ | `read-sapling-p18` | اول، بعد، آخر | the sentences of a short story put in order. | read.sap.13, read.sap.27 |
| ✅ | `read-sapling-p19` | الفبا | letters in alphabet order, a letter's name, words by their first letter. | read.sap.30 |
| ✅ | `read-sapling-p20` | کدام خوانده می‌شود؟ | a word with no marks in a sentence; which way is it read here? | read.sap.11 |
| ✅ | `read-sapling-p21` | کلمه‌های پرکاربرد | common words found fast in a sentence, and memory pairs of them. | read.sap.11, read.sap.10 |
| ✅ | `read-sapling-p22` | اشتباه را پیدا کن | which pair is not synonyms / opposites; which sentence uses a word wrongly. | read.sap.16, read.sap.20 |
| ✅ | `read-sapling-p23` | کلمه‌ها را جدا کن | words sorted: same meaning or opposite, one or many, family, compound or simple. | read.sap.16, read.sap.17, read.sap.20 |
| ✅ | `read-sapling-p24` | درست یا نادرست؟ | a short text read, then a sentence about it: true or false? | read.sap.13, read.sap.15 |
| ✅ | `read-sapling-p25` | هم‌قافیه‌ها | written words matched with the word that rhymes. | read.sap.29 |
| ✅ | `read-sapling-p26` | جمله را کامل کن | the word that completes a sentence: a verb, a joining word (و، امّا، چون، بعد). | read.sap.25, read.sap.34 |
| ✅ | `read-sapling-p27` | کدام از این خانواده نیست؟ | four words, one not in the family; or the word a suffix makes. | read.sap.17, read.sap.18 |
| ✅ | `read-sapling-p28` | واقعیت یا نظر؟ | sentences sorted into facts and opinions; the sentence that is a fact. | read.sap.15, read.sap.34, read.sap.36 |
| ✅ | `read-sapling-p29` | معنی از جمله | a new word met in a sentence; its meaning chosen from the sentence. | read.sap.19, read.sap.14 |
| ✅ | `read-sapling-p30` | تعریف کن | something to tell the family, with questions for the grown-up (not scored). | read.sap.31, read.sap.32 |
| ✅ | `read-sapling-p32` | کدام کلمه؟ | the noun, the verb or the describing word in a sentence, chosen. | read.sap.23 |
| ✅ | `read-sapling-p33` | فعل درست | the right verb form for a person or a time. | read.sap.24, read.sap.23 |
| ✅ | `read-sapling-p35` | غلط املایی | three words, one misspelled with a same-sound letter: find it. | read.sap.21, read.sap.7 |
| ✅ | `read-sapling-p36` | فرهنگ لغت | a dictionary line read; the meaning that fits a sentence; which word comes first. | read.sap.30, read.sap.19 |

### 🌳 درخت — `tree`

Reading to learn, as پایه چهارم to ششم expect: fluent silent reading of unvowelled text, main idea and summary,
story and information-text structure, roots and affixes (Persian and Arabic-origin), املا of borrowed words,
grammar up to نهاد و گزاره and the verb, writing from a paragraph to a three-part composition (description,
memory, report, letter, retelling a حکایت), and the classics: حکایت, شاهنامه, poems by heart. Texts are no longer
limited to taught letters (all are known), but keep vowel marks on hard or unclear words.

Sizing: 3 years × 36 weeks × 5 sessions a week = **540 sessions**: **150 lessons** (about 50 a year, one per
textbook lesson's reading, writing and language parts; about 210 sessions with replays and reviews) and **about
330 practice sessions** (real texts read silently with questions, dictation, word study, writing tasks, books).
Numbers used: Tree has 60–90 minutes a day; Persian has about 7 of 25 hours a week in پایه چهارم and پنجم and
5 of 25 in پایه ششم, so a 15–20 minute session every day. The rows below list every objective and the first
lesson of each unit (47 rows); each unit grows to three or four lessons, written row by row before it is built.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `read.tree.1` | Reads unvowelled school-level text aloud fluently and with expression, and reads silently with understanding | fluency | core | پایه چهارم تا ششم، روان‌خوانی | `readaloud`, `passage` + questions |
| `read.tree.2` | Reads and spells Arabic-origin forms: ـه/ة, أ ؤ إ, «ی» read as «ا» (موسی، حتی), «ال» (بالاخره، فی‌المثل), ـاً | decoding and spelling | core | پایه چهارم و پنجم، املا و واژه‌آموزی | `choose`, `build` with `hidden` |
| `read.tree.3` | Finds the main idea of a paragraph and of a text, and the details that support it | comprehension | core | پایه چهارم تا ششم، درک متن | `passage` + `choose` |
| `read.tree.4` | Summarises a story or an information text in a few sentences | comprehension | core | پایه پنجم و ششم، درک متن | `choose`, `paper` |
| `read.tree.5` | Uses the structure of information texts (sequence, cause and effect, comparison, problem and solution) and their headings, tables and maps | comprehension | core | پایه چهارم، «علم و عمل»؛ پایه ششم، آداب مطالعه | `passage`, `sort`, `order` |
| `read.tree.6` | Knows the elements of a story (place, time, characters, problem, turning point, ending) and explains why a character acts as they do | comprehension | core | پایه چهارم تا ششم، «بخوان و بیندیش» | `passage`, `order`, `talk` |
| `read.tree.7` | Tells fact from opinion and says what the writer wants (inform, persuade, entertain) | comprehension | core | پایه پنجم و ششم | `sort`, `choose` |
| `read.tree.8` | Uses comprehension strategies on purpose: predicts, asks questions, pictures, notices when it stops making sense and re-reads | comprehension | core | پایه چهارم، درک متن | `passage`, `choose`, `talk` |
| `read.tree.9` | Works out a word's meaning from context; knows words with several meanings and more synonyms and opposites | vocabulary | core | پایه چهارم تا ششم، واژه‌آموزی | `choose` in a sentence |
| `read.tree.10` | Reads, spells and builds words with prefixes (نا، بی، هم، با) and suffixes (ـانه، ـگاه، ـمند، ـکار، ـوار، ـگین), and the Arabic plurals (کتب، علوم، ـات، ـین) | vocabulary | core | پایه چهارم تا ششم، واژه‌آموزی و دانش زبانی | `build`, `sort` |
| `read.tree.11` | Uses a dictionary: entry, several meanings, the meaning that fits | vocabulary | core | پایه چهارم و پنجم | `choose` |
| `read.tree.12` | Knows common proverbs and idioms and uses one in speech and writing | vocabulary | core | پایه چهارم تا ششم، نگارش (ضرب‌المثل) | `pairs`, `paper` |
| `read.tree.13` | Spells words of Arabic origin through their families (علم، عالم، معلوم؛ صبر، صابر) and the letters ص ث ط ظ ض ذ ع ح | decoding and spelling | core | پایه چهارم تا ششم، املا | `build` with `hidden`, `paper` |
| `read.tree.14` | Splits a sentence into نهاد and گزاره, and knows a sentence needs a verb | grammar | core | پایه ششم، دانش زبانی | 🆕 `mark`, `sort` |
| `read.tree.15` | Uses nouns (singular/plural, proper/common), pronouns (من … آن‌ها and ـَم ـَت ـَش), adjectives and ـتر / ـترین | grammar | core | پایه چهارم و پنجم، دانش زبانی | `sort`, `choose`, 🆕 `mark` |
| `read.tree.16` | Knows the verb: infinitive (مصدر), past and present stems, simple and continuous past, present, future, positive and negative | grammar | core | پایه پنجم و ششم، دانش زبانی | `build`, `sort` |
| `read.tree.17` | Punctuates with every common mark (. ، ؛ : ؟ ! « » …) and writes the half-space (نیم‌فاصله) correctly | grammar | core | پایه چهارم تا ششم، نگارش | `choose`, `paper` |
| `read.tree.18` | Writes a description of a person, place or thing using the senses | writing | core | پایه چهارم، نگارش (توصیف) | `paper` |
| `read.tree.19` | Writes a memory or story with order, dialogue and a feeling | writing | core | پایه چهارم و پنجم، نگارش (خاطره) | `paper` |
| `read.tree.20` | Writes a report of an event or explains how something is done | writing | core | پایه پنجم، نگارش (گزارش) | `paper` |
| `read.tree.21` | Writes a friendly and a formal letter | writing | full | پایه پنجم و ششم، نگارش (نامه) | `paper` |
| `read.tree.22` | Retells a poem or حکایت in prose, and writes a story that shows a proverb | writing | full | پایه چهارم تا ششم، نگارش (بازنویسی، ضرب‌المثل‌نویسی) | `paper` |
| `read.tree.23` | Plans, drafts, revises and corrects a text of three paragraphs (introduction, body, conclusion) with a checklist | writing | core | پایه ششم، نگارش | `order`, `paper` |
| `read.tree.33` | Writes an opinion piece: a clear claim, reasons backed by facts or examples, linking words, a conclusion | writing | core | پایه پنجم و ششم (CCSS W.4.1–W.6.1; England Y5–Y6) | `order`, `paper` |
| `read.tree.34` | Does a short research project from several sources, takes notes in own words and lists the sources | writing | core | پایه ششم، آداب مطالعه (CCSS W.4.7–W.6.8) | `paper` |
| `read.tree.35` | Types a page in Persian on a computer or phone keyboard, with the half-space | handwriting | full | — (CCSS W.4.6) | `home` |
| `read.tree.24` | Reads a poem aloud with its rhythm, finds قافیه and ردیف, and says poems by heart | literature | core | پایه چهارم تا ششم، «بخوان و حفظ کن» | `readaloud`, `choose` |
| `read.tree.25` | Knows حکایت from گلستان and مثنوی, stories from شاهنامه (آرش، هفت‌خان رستم) and the great poets (فردوسی، سعدی، مولوی، عطار، حافظ، پروین اعتصامی) | literature | core | پایه چهارم، درس ۶؛ پایه ششم، درس ۵ و ۱۰؛ «حکایت» | `passage`, `talk` |
| `read.tree.26` | Notices and makes similes (تشبیه), metaphors (استعاره) and personification (تشخیص) | literature | core | پایه پنجم و ششم (تشبیه)؛ استعاره در پایه دهم (CCSS L.4.5, L.5.5) | `choose`, `paper` |
| `read.tree.27` | Gives a short talk to the family from notes and takes part in a discussion, taking turns | oral language | core | پایه چهارم تا ششم، «بیاموز و بگو» | `talk` |
| `read.tree.28` | Listens to a talk or a recording and notes the main points | oral language | core | پایه پنجم و ششم | `scene` + `question`, `paper` |
| `read.tree.29` | Reads whole books for pleasure and keeps a reading log | literature | core | پایه ششم، آداب مطالعه | `paper`, `talk` |
| `read.tree.30` | Writes fluently and legibly at length; tries نستعلیق letters | handwriting | full | پایه چهارم تا ششم (خوش‌نویسی) | `trace`, `paper` |
| `read.tree.31` | Reads a news item, an advert, a table or a web page and asks who made it and why | comprehension | core | پایه ششم | `passage`, `choose` |
| `read.tree.32` | Reads a short play in roles with the family | literature | core | پایه دوم (نمایش) تا ششم | `readaloud`, `talk` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ⬜ | `read-tree-1` | بی‌نشانه، روان | Unit: fluent reading of unvowelled texts, aloud and silent; hard words practised and re-read; silent reading with questions | story (`readaloud`, `passage`) | read.tree.1 | core |
| ⬜ | `read-tree-2` | پیش از خواندن، وقت خواندن | Unit: strategies: predict from the title, ask questions while reading, picture it, stop and re-read when lost | story (`passage`), lesson (`choose`), story (`talk`) | read.tree.8 | core |
| ⬜ | `read-tree-3` | فکر اصلی | Unit: the main idea of a paragraph, then of a text; the details that support it | story (`passage`), lesson (`choose`, `mark`) | read.tree.3 | core |
| ⬜ | `read-tree-4` | معنی از جمله | Unit: context clues and words with several meanings (شیر، دور، سیر) | lesson (`choose` in a sentence), game (`pairs`) | read.tree.9 | core |
| ⬜ | `read-tree-5` | پیشوندها | Unit: نا، بی، هم، با: what they add, build and read words | game (`build`, `sort`) | read.tree.10 | core |
| ⬜ | `read-tree-6` | پسوندها | Unit: ـانه، ـگاه، ـمند، ـکار، ـوار، ـگین | game (`build`), lesson (`choose`) | read.tree.10 | core |
| ⬜ | `read-tree-7` | بازی کلمه‌ها ۵ | Unit game: meanings from context, prefixes, suffixes | game (`build`, `sort`, `pairs` with `hidden`) | read.tree.9, read.tree.10 | core |
| ⬜ | `read-tree-8` | کلمه‌های عربی‌تبار | Unit: املا through families of Arabic-origin words (علم، عالم، معلوم، تعلیم), ـه/ة, «ی» read as «ا», ـاً, «ال» | game (`sort`, `build` with `hidden`), lesson (`choose`) | read.tree.13, read.tree.2 | core |
| ⬜ | `read-tree-9` | ضرب‌المثل‌ها | Unit: proverbs and what they mean, when to use one (کار نیکو کردن از پر کردن است; قطره‌قطره جمع گردد…) | animation (`scene`), game (`pairs`) | read.tree.12 | core |
| ⬜ | `read-tree-10` | با پنج حس | Unit: description: read a model, find the sense words, add them to plain sentences | story (`passage`), lesson (`choose`) | read.tree.18 | core |
| ⬜ | `read-tree-11` | بند بنویسیم: توصیف | Writing a descriptive paragraph about a place on paper: plan with the senses, write, check with the list | game (`order`), home (`paper`) | read.tree.18, read.tree.23 | core |
| ⬜ | `read-tree-12` | نامه | Reading and writing a friendly letter: greeting, body, ending; then a short note to a teacher or neighbour | story (`passage`), home (`paper`) | read.tree.21 | full |
| ⬜ | `read-tree-13` | قافیه و ردیف | Unit: poems read aloud with their rhythm; قافیه and ردیف; one by heart each month | animation (`scene`), story (`readaloud`), lesson (`choose`) | read.tree.24 | core |
| ⬜ | `read-tree-14` | حکایت‌های گلستان | Unit: short حکایت from سعدی's گلستان in the original with a simple retelling; the lesson of each | story (`passage`, `talk`) | read.tree.25 | core |
| ⬜ | `read-tree-15` | آرش کمانگیر | Unit: a story from Iran's epics retold (آرش), its characters and turning point | animation (`scene`), story (`passage`), game (`order`) | read.tree.25, read.tree.6 | core |
| ⬜ | `read-tree-16` | ضمیر | Unit: pronouns, separate and attached (کتابم، کتابت، کتابش), and the nouns they stand for | lesson (`choose`, `mark`) | read.tree.15 | core |
| ⬜ | `read-tree-17` | بازی دستور ۲ | Unit game: nouns, pronouns, adjectives | game (`sort`, `pairs`) | read.tree.15 | core |
| ⬜ | `read-tree-18` | برای خانواده بگو | Speaking: a two-minute talk from three notes about a hobby or a book; listening and asking a question | story (`talk`), home (`paper`) | read.tree.27 | core |
| ⬜ | `read-tree-19` | عناصر داستان | Unit: place, time, characters, problem, turning point, ending; why a character acts | story (`passage`), game (`order`, `sort`) | read.tree.6 | core |
| ⬜ | `read-tree-20` | واقعیت یا نظر؟ | Unit: fact and opinion; what the writer wants | game (`sort`), lesson (`choose`) | read.tree.7 | core |
| ⬜ | `read-tree-21` | متن علمی چطور ساخته شده؟ | Unit: sequence, cause and effect, comparison, problem and solution; signal words (چون، بنابراین، اما) | story (`passage`), game (`sort`, `order`) | read.tree.5 | core |
| ⬜ | `read-tree-22` | خلاصه کن | Unit: summarising a story: who wanted what, what went wrong, how it ended; pick the best summary, then write one | lesson (`choose`), home (`paper`) | read.tree.4 | core |
| ⬜ | `read-tree-23` | جدول و نقشه در متن | Unit: reading a table, a simple chart and a map inside a text | story (`passage`), lesson (`choose`), lesson (`chart`) | read.tree.5, read.tree.31 | core |
| ⬜ | `read-tree-24` | جمع‌های عربی | Unit: کتب، علوم، اشخاص، ـات، ـین; reading and spelling them | game (`pairs`, `sort`) | read.tree.10 | core |
| ⬜ | `read-tree-25` | بزرگ‌تر، بزرگ‌ترین | Unit: adjectives and comparison (ـتر، ـترین) | lesson (`choose`), game (`order`) | read.tree.15 | core |
| ⬜ | `read-tree-26` | فعل و زمان‌ها | Unit: present, simple and continuous past, future; positive and negative | game (`sort`), lesson (`choose`) | read.tree.16 | core |
| ⬜ | `read-tree-27` | خاطره بنویس | Unit: a memory: order of events, a line of dialogue in «», how it felt; plan, write, revise | story (`passage`), home (`paper`) | read.tree.19 | core |
| ⬜ | `read-tree-28` | گزارش بنویس | Unit: report of a visit or an experiment; how-to steps | story (`passage`), game (`order`), home (`paper`) | read.tree.20 | core |
| ⬜ | `read-tree-29` | بازنویسی | Unit: a حکایت or a short poem retold in plain prose; a story that shows a proverb | story (`passage`), home (`paper`) | read.tree.22 | full |
| ⬜ | `read-tree-30` | مثل ماه | Unit: simile (تشبیه), metaphor (استعاره) and personification (تشخیص) in poems and prose; make one | lesson (`choose`), story (`passage`), home (`paper`) | read.tree.26 | core |
| ⬜ | `read-tree-31` | شاعران بزرگ | Unit: فردوسی، سعدی، مولوی، عطار، حافظ، پروین اعتصامی: who, when, a line or two of each | animation (`scene`), story (`passage`), game (`pairs`) | read.tree.25 | core |
| ⬜ | `read-tree-32` | فرهنگ لغت | Unit: entries, several meanings, picking the meaning that fits | lesson (`choose`), story (`passage`) | read.tree.11 | core |
| ⬜ | `read-tree-33` | گوش کن و یادداشت کن | Unit: a short heard talk, notes of three main points, then a check | animation (`scene` + `question`), home (`paper`) | read.tree.28 | core |
| ⬜ | `read-tree-34` | نهاد و گزاره | Unit: the sentence's two parts; finding them; a sentence without a verb is not finished | 🆕 `mark`, game (`sort`, `order`) | read.tree.14 | core |
| ⬜ | `read-tree-35` | مصدر و بن | Unit: infinitive, past and present stems (رفتن، رفت، رو), making verbs from them | game (`build`, `pairs`) | read.tree.16 | core |
| ⬜ | `read-tree-36` | نشانه‌ها و نیم‌فاصله | Unit: every common mark and where it goes; the half-space (می‌روم، کتاب‌ها) | lesson (`choose`), story (`passage`) | read.tree.17 | core |
| ⬜ | `read-tree-37` | مقدمه، بدنه، نتیجه | Unit: a three-paragraph composition: plan, write, revise with a checklist, correct | game (`order`), home (`paper`) | read.tree.23 | core |
| ⬜ | `read-tree-45` | دلیل بیاور | Unit: opinion writing: a claim, reasons with facts or examples, linking words (اول، علاوه بر این، بنابراین), a conclusion | game (`order`, `sort`), home (`paper`) | read.tree.33 | core |
| ⬜ | `read-tree-46` | پژوهش | Unit: a question, two or three sources, notes in own words, a short report with the sources named | home (`paper`), parent tip (`forparents`) | read.tree.34 | core |
| ⬜ | `read-tree-47` | تایپ فارسی | Typing Persian: the keyboard layout, the half-space, a page typed and checked | home (`doit`), parent tip (`forparents`) | read.tree.35 | full |
| ⬜ | `read-tree-38` | هفت‌خان رستم | Unit: شاهنامه story retold in parts, with a few lines of the original; characters and choices | animation (`scene`), story (`passage`, `talk`) | read.tree.25, read.tree.6 | core |
| ⬜ | `read-tree-39` | حکایت‌های مثنوی و منطق‌الطیر | Unit: short tales from مولوی and عطار retold, a few lines of the original; what they teach | story (`passage`, `talk`) | read.tree.25 | full |
| ⬜ | `read-tree-40` | نمایش‌نامه بخوانیم | Unit: a short play read in roles; stage directions, voices | story (`readaloud`, `talk`) | read.tree.32 | core |
| ⬜ | `read-tree-41` | خبر و آگهی | Unit: a news item, an advert and a web page: who made it, why, what is fact | story (`passage`), game (`sort`) | read.tree.31, read.tree.7 | core |
| ⬜ | `read-tree-42` | دفتر کتاب‌خوانی | Reading whole books: choosing one, a reading log, telling a friend about it | home (`paper`), story (`talk`), parent tip (`forparents`) | read.tree.29 | core |
| ⬜ | `read-tree-43` | خوش‌نویسی | Neat fast handwriting, and a first taste of نستعلیق letters with a pen | lesson (`trace`), home (`paper`) | read.tree.30 | full |
| ⬜ | `read-tree-44` | بازی باغچه درخت | Garden game: main idea, word parts, grammar, poets, proverbs | game (`sort`, `pairs` with `hidden`, `order`) | read.tree.3, read.tree.10, read.tree.14, read.tree.12 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `read-tree-p1` | Reading library | Levelled stories, information texts, حکایت and poems without marks, each with literal, inference, main-idea and vocabulary questions | read.tree.1, read.tree.3, read.tree.6, read.tree.8 |
| ⬜ | `read-tree-p2` | Fluency passages | Short texts for repeated reading aloud, parent-marked | read.tree.1 |
| ⬜ | `read-tree-p3` | Dictation bank (املا) | Paragraphs built around word families, Arabic-origin words and homophones, with audio and answers | read.tree.2, read.tree.13 |
| ⬜ | `read-tree-p4` | Word-part generator | Roots with prefixes and suffixes, Arabic plurals, to build, sort and define | read.tree.10 |
| ⬜ | `read-tree-p5` | Grammar sentence bank | Sentences tagged for نهاد/گزاره, word class and tense, for tap and sort games | read.tree.14, read.tree.15, read.tree.16 |
| ⬜ | `read-tree-p6` | Proverb and idiom bank | Proverbs with meaning and a situation to match | read.tree.12 |
| ⬜ | `read-tree-p7` | Writing prompts | Pictures and topics for description, memory, report, letter and retelling, each with a model and a checklist | read.tree.18, read.tree.19, read.tree.20, read.tree.21, read.tree.22, read.tree.23 |
| ⬜ | `read-tree-p8` | Poem bank | Classical lines and Baghcheh's own poems to read aloud and learn by heart | read.tree.24, read.tree.25 |

### 🌲 جنگل — `forest`

Reading and writing as پایه هفتم to نهم expect: literary and information texts read with the right tone and
read critically; the grammar of the sentence, the verb and the noun group; the literary devices and the forms of
poetry; the classics with a gloss, today's writers and world literature; and composition as the نگارش books
teach it, from a plan to an edited essay, in the forms people write in (letter, memory, travel writing, life
story, report, opinion), plus حکایت‌نگاری, مَثَل‌نویسی and تصویرنویسی.

Sizing: 3 years × 36 weeks × 5 sessions a week = **540 sessions**: **140 lessons** (about 47 a year: the 17 lessons of
فارسی and 8 of نگارش in each grade, a language and a literature lesson for most of them; about 190 sessions with
replays and reviews) and **about 350 practice sessions** (long reading, essays written and revised, dictation and
درست‌نویسی, poems by heart, books). Numbers used: Forest has 90–120 minutes a day; Persian has 4 of 30 hours a week
in پایه هفتم (2 for فارسی with املا, 2 for نگارش), so a 15-minute session every day, with writing done on paper
between sessions. The rows below list every objective and the first lesson of each unit (43 rows); each unit
grows to three or four lessons, written row by row before it is built.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `read.for.1` | Reads literary and information texts silently with understanding, and aloud with the tone they need (تعلیمی، حماسی، عاطفی، طنز) | fluency | core | پایه هفتم تا نهم، روان‌خوانی؛ پایه نهم، درس ۳، ۷، ۱۰، ۱۳ (لحن) | `readaloud`, `passage` + questions |
| `read.for.2` | Finds the main idea and the structure of a long text, takes notes and summarises it | comprehension | core | پایه هفتم تا نهم، خودارزیابی؛ نگارش هفتم، درس ۲ (بخش‌های نوشته) | `choose`, `order`, `paper` |
| `read.for.3` | Reads critically: fact and opinion, evidence, the writer's purpose and point of view; compares two texts on one subject | comprehension | core | پایه هفتم تا نهم، گفت‌وگو | `sort`, `choose`, `talk` |
| `read.for.4` | Explains the meaning behind symbolic stories and fables (داستان رمزی و نمادین) and a poem's message | comprehension | core | پایه هفتم، درس ۱۶ | `passage`, `talk` |
| `read.for.5` | Knows simple, derived and compound words (ساده، مشتق، مرکب), synonyms and opposites (ترادف، تضاد), and uses a glossary and dictionary | vocabulary | core | پایه نهم، درس ۹ و ۱۶؛ واژه‌نامه | `sort`, `build`, `choose` |
| `read.for.6` | Writes correctly (درست‌نویسی): املا of borrowed words, joined and separate writing, the half-space, the Academy's spelling rules (دستور خط فارسی) | decoding and spelling | core | پایه هفتم تا نهم، املا؛ نگارش، درست‌نویسی | `choose`, `build` with `hidden`, `paper` |
| `read.for.7` | Knows sentence types (خبری، پرسشی، امری، عاطفی) and the parts of a sentence: نهاد، فعل، مفعول، متمّم، مسند with فعل اسنادی | grammar | core | پایه هفتم، درس ۱–۴، ۶–۹؛ پایه هشتم، درس ۴ | 🆕 `mark`, `sort` |
| `read.for.29` | Joins clauses into compound and complex sentences (و، امّا، یا / که، اگر، وقتی، چون، تا) and punctuates them | grammar | core | پایه هفتم تا نهم (CCSS L.7.1) | `order`, `choose`, `paper` |
| `read.for.8` | Knows the verb: شخص و شناسه, stems, present and past tenses, the future, mood (اخباری، التزامی، امری) and active and passive (معلوم و مجهول) | grammar | core | پایه هفتم، درس ۱۱، ۱۳، ۱۴، ۱۶؛ پایه نهم، درس ۶، ۹، ۱۱، ۱۲؛ مجهول در پایه دهم (CCSS L.8.1) | `sort`, `build`, `choose` |
| `read.for.9` | Knows pronouns and the noun group: its head (هسته), adjectives (including برتر و برترین) and مضاف‌الیه | grammar | core | پایه هفتم، درس ۱۲؛ پایه هشتم، درس ۷، ۹، ۱۱، ۱۲، ۱۶؛ پایه نهم، درس ۲ و ۴ | 🆕 `mark`, `sort` |
| `read.for.31` | Names every kind of modifier in the noun group (صفت اشاره، شمارشی، پرسشی، تعجبی، مبهم; وابسته‌های پیشین و پسین) | grammar | full | پایه هشتم، درس ۷، ۹، ۱۱، ۱۲، ۱۶؛ پایه نهم، درس ۲ | 🆕 `mark`, `sort` |
| `read.for.10` | Knows the adverb (قید) and how word order changes in poetry and literary prose | grammar | core | پایه هفتم، درس ۷؛ پایه نهم، درس ۱۴ | 🆕 `mark`, `order` |
| `read.for.11` | Finds and uses the main literary devices: تشبیه and its four parts, استعاره (metaphor), تشخیص, واج‌آرایی, جناس, تلمیح | literature | core | پایه هفتم، درس ۶؛ پایه هشتم، درس ۲، ۳، ۱۰؛ پایه نهم، درس ۱، ۱۰ (CCSS L.7.5, L.8.5, RL.8.4) | `choose`, `sort`, 🆕 `mark` |
| `read.for.30` | Knows the further devices of Persian poetics: مراعات نظیر، تضاد، تکرار، کنایه | literature | full | پایه هفتم، درس ۶؛ پایه هشتم، درس ۱۳؛ پایه نهم، درس ۱ و ۸ | `choose`, `sort` |
| `read.for.12` | Tells verse from prose, finds قافیه and ردیف, and says how a poem's form (مثنوی، غزل) shapes it | literature | core | پایه هشتم، درس ۱ و ۸؛ پایه نهم، درس ۷ و ۱۳ (CCSS RL.8.5) | `sort`, `choose` |
| `read.for.13` | Knows the other forms and kinds: قطعه، شعر نیمایی، رباعی، دوبیتی، قصیده; حماسی، تعلیمی، غنایی | literature | full | پایه هفتم، درس ۱۰ (قطعه، نیمایی)؛ the rest in پایه دهم | `sort`, `choose` |
| `read.for.14` | Reads classical texts with a gloss: حکایت from گلستان and بوستان, مثنوی, شاهنامه, a غزل of حافظ; knows the great works and their authors | literature | core | پایه هفتم تا نهم، حکایت و شعرخوانی؛ اعلام | `passage`, `talk` |
| `read.for.15` | Reads world literature in translation and talks about it | literature | core | پایه هفتم تا نهم، فصل «ادبیات جهان»؛ پایه نهم، درس ۱۷ | `passage`, `talk` |
| `read.for.16` | Reads today's Persian stories, poems, travel writing and life stories | literature | core | پایه هفتم، روان‌خوانی (سفرنامه اصفهان)؛ فصل آزاد «ادبیات بومی» | `passage`, `talk` |
| `read.for.17` | Plans a text (mind map, sorting, narrowing the topic), writes an introduction, body paragraphs with topic sentences and a conclusion, gives it a title, then revises and edits it | writing | core | نگارش هفتم، درس ۱–۷؛ نگارش نهم، درس ۱، ۵، ۸ | `order`, `paper` |
| `read.for.18` | Writes from observation with all the senses, and by comparing and substituting | writing | core | نگارش هشتم، درس ۳–۷ | `paper` |
| `read.for.19` | Writes the common forms: نامه، خاطره، سفرنامه، زندگی‌نامه، گزارش | writing | core | نگارش نهم، درس ۶ | `paper` |
| `read.for.20` | Writes about an abstract subject and argues an opinion: claim, reasons, an example, the other side | writing | core | نگارش هفتم، درس ۸ | `order`, `paper` |
| `read.for.21` | Retells a classical حکایت in today's prose (حکایت‌نگاری), writes around a proverb (مَثَل‌نویسی) and from a picture (تصویرنویسی) | writing | full | نگارش هفتم تا نهم (every lesson) | `paper` |
| `read.for.22` | Chooses the register (رسمی، عامیانه، ادبی), the words and the mood of a text, and changes them on purpose | writing | core | نگارش نهم، درس ۲–۴ | `choose`, `paper` |
| `read.for.23` | Writes a short story with a plot, characters, dialogue and a point of view | writing | core | نگارش هشتم، درس ۸؛ نگارش نهم، درس ۶ (داستان) | `order`, `paper` |
| `read.for.24` | Takes part in a discussion, gives a short presentation, and recites a poem with the right tone | oral language | core | پایه هفتم تا نهم، گفت‌وگو و شعرخوانی | `talk`, `readaloud` |
| `read.for.25` | Listens to a talk or a programme and writes what it said | oral language | core | نگارش هشتم، درس ۴ (گوش بدهیم و بنویسیم) | `scene` + `question`, `paper` |
| `read.for.26` | Reads online texts critically: who wrote it, when, is it true, where else to check; quotes a source | comprehension | core | پایه هشتم، درس ۷ (انسان، فناوری، اخلاق) | `passage`, `sort` |
| `read.for.27` | Finds information in several sources, takes notes and writes a short report naming them | writing | core | — (best practice; IES 2016) | `paper` |
| `read.for.28` | Reads whole books by choice and talks or writes about them | literature | core | پایه هفتم، درس ۹ (شوق خواندن) | `paper`, `talk` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ⬜ | `read-forest-1` | با لحن درست بخوان | Unit: tone (لحن) of instruction, epic, feeling and humour: hear a model, read, re-read | animation (`scene`), story (`readaloud`) | read.for.1 | core |
| ⬜ | `read-forest-3` | جمله و انواعش | Unit: what a sentence is; خبری، پرسشی، امری، عاطفی and their marks | lesson (`choose`), game (`sort`) | read.for.7 | core |
| ⬜ | `read-forest-4` | نهاد، مفعول، متمّم | Unit: the verb decides the parts; find نهاد، مفعول (with «را»)، متمّم (with its preposition) | 🆕 `mark`, game (`sort`) | read.for.7 | core |
| ⬜ | `read-forest-5` | مسند و فعل اسنادی | Unit: است، بود، شد، گشت، گردید and the مسند they need | 🆕 `mark`, lesson (`choose`) | read.for.7 | core |
| ⬜ | `read-forest-6` | نقشه نوشتن | Unit: plan first: a mind map, sorting ideas, making a big topic smaller | game (`sort`, `order`), home (`paper`) | read.for.17 | core |
| ⬜ | `read-forest-2` | خلاصه کن | Unit: the main idea of each part of a long text, notes, then a summary: pick the best one, then write one | lesson (`choose`), game (`order`), home (`paper`) | read.for.2 | core |
| ⬜ | `read-forest-8` | حکایت‌نگاری | Unit: a حکایت from گلستان read with a gloss, then retold in today's prose on paper | story (`passage`), home (`paper`) | read.for.21, read.for.14 | full |
| ⬜ | `read-forest-10` | شناسه و زمان‌ها | Unit: person endings, stems, present, the pasts and the future; mood; active and passive (معلوم و مجهول) | game (`sort`, `build`), lesson (`choose`) | read.for.8 | core |
| ⬜ | `read-forest-11` | ضمیر | Unit: personal, attached and reflexive pronouns (خود، خویش) | lesson (`choose`, `mark`) | read.for.9 | core |
| ⬜ | `read-forest-12` | تکرار و جابه‌جایی | Unit: repetition as a device; word order in poems and literary prose put back in plain order | game (`order`), lesson (`choose`) | read.for.10, read.for.30 | core |
| ⬜ | `read-forest-13` | قطعه و شعر نیمایی | Unit: where the rhyme sits in a قطعه; نیما and free verse | story (`passage`), lesson (`choose`) | read.for.13 | full |
| ⬜ | `read-forest-14` | داستان رمزی | Unit: fables and symbolic stories (from منطق‌الطیر, and tales written for Baghcheh): what each part stands for | story (`passage`, `talk`) | read.for.4 | core |
| ⬜ | `read-forest-15` | بند و جمله موضوع | Unit: body paragraphs, each with a topic sentence and support; mark the topic sentences in a model, write a paragraph | 🆕 `mark`, home (`paper`) | read.for.17 | core |
| ⬜ | `read-forest-16` | مثل‌نویسی | Unit: a proverb explained, then a story or short essay that shows it | animation (`scene`), home (`paper`) | read.for.21 | full |
| ⬜ | `read-forest-17` | تصویرنویسی | Unit: writing from a picture: what is seen, what is felt, what may have happened | lesson (`choose`), home (`paper`) | read.for.21, read.for.18 | full |
| ⬜ | `read-forest-7` | نظر من این است | Unit: opinion and argument: claim, two reasons, an example, the other side, a conclusion; order a model, then write | game (`order`), home (`paper`) | read.for.20 | core |
| ⬜ | `read-forest-18` | نظم و نثر، قافیه و ردیف | Unit: verse and prose; قافیه and ردیف found and made | game (`sort`), lesson (`choose`) | read.for.12 | core |
| ⬜ | `read-forest-19` | تشبیه | Unit: the four parts of a simile (مشبّه، مشبّه‌به، وجه شبه، ادات); find them, make one | lesson (`choose`), 🆕 `mark`, home (`paper`) | read.for.11 | core |
| ⬜ | `read-forest-42` | استعاره | Unit: metaphor: a simile with the comparison word and one side left out; find it in poems and everyday speech, make one | lesson (`choose`, `mark`) | read.for.11 | core |
| ⬜ | `read-forest-20` | گروه اسمی | Unit: the noun group: the head, adjectives and مضاف‌الیه; at full depth every kind of modifier (صفت اشاره، شمارشی، پرسشی، تعجبی، مبهم) | 🆕 `mark`, game (`sort`, `build`) | read.for.9, read.for.31 | core |
| ⬜ | `read-forest-21` | مثنوی | Unit: the مثنوی form; a story from مولوی's مثنوی with a gloss | story (`passage`, `talk`), lesson (`choose`) | read.for.12, read.for.14 | core |
| ⬜ | `read-forest-22` | با حواس پنج‌گانه بنویس | Unit: see, hear, touch, smell, taste and write; compare and substitute to write more easily | lesson (`choose`), home (`paper`) | read.for.18 | core |
| ⬜ | `read-forest-23` | واج‌آرایی، جناس، کنایه | Unit: sound patterns, puns and کنایه in poems and everyday speech | lesson (`choose`), game (`pairs`) | read.for.11, read.for.30 | core |
| ⬜ | `read-forest-24` | واقعیت، نظر، شاهد | Unit: critical reading: claims and evidence, the writer's purpose, two texts on one subject compared | story (`passage`), game (`sort`) | read.for.3 | core |
| ⬜ | `read-forest-25` | متن در اینترنت | Unit: who wrote it, when, is it true, how to check; quoting a source | story (`passage`), game (`sort`) | read.for.26, read.for.3 | core |
| ⬜ | `read-forest-26` | گوش بده و بنویس | Unit: a talk heard, notes, then what it said in a paragraph | animation (`scene` + `question`), home (`paper`) | read.for.25 | core |
| ⬜ | `read-forest-27` | درست‌نویسی | Unit: common mistakes, joined and separate writing, the half-space, Arabic-origin words, the Academy's rules | lesson (`choose`), game (`build` with `hidden`) | read.for.6 | core |
| ⬜ | `read-forest-28` | ساده، مشتق، مرکّب | Unit: how words are made; ترادف and تضاد; the glossary and the dictionary | game (`sort`, `build`), lesson (`choose`) | read.for.5 | core |
| ⬜ | `read-forest-29` | قید | Unit: adverbs of time, place, manner; finding them; moving them | 🆕 `mark`, lesson (`choose`) | read.for.10 | core |
| ⬜ | `read-forest-43` | جمله‌های مرکب | Unit: joining clauses (و، امّا / که، اگر، وقتی، چون); making long sentences clear; commas | game (`order`), lesson (`choose`), home (`paper`) | read.for.29 | core |
| ⬜ | `read-forest-30` | غزل حافظ | Unit: a غزل with a gloss; قافیه and ردیف; reciting it | story (`passage`, `readaloud`) | read.for.12, read.for.14, read.for.24 | core |
| ⬜ | `read-forest-31` | تضاد، مراعات نظیر، تلمیح | Unit: the remaining devices, found in poems and made in prose | lesson (`choose`), game (`sort`) | read.for.11, read.for.30 | core |
| ⬜ | `read-forest-32` | زبان نوشته | Unit: رسمی، عامیانه، ادبی: change a text's register, its words and its mood | lesson (`choose`), home (`paper`) | read.for.22 | core |
| ⬜ | `read-forest-33` | قالب‌های نوشتن | Unit: letter, memory, travel writing, life story, report: one model of each, then write one | story (`passage`), home (`paper`) | read.for.19 | core |
| ⬜ | `read-forest-34` | آغاز خوب، پایان زیبا | Unit: openings, endings and titles; then editing a whole text with a checklist | game (`order`), lesson (`choose`), home (`paper`) | read.for.17 | core |
| ⬜ | `read-forest-9` | قصه خودم | Unit: story writing: plot, character, dialogue, point of view; plan, write, revise | game (`order`), home (`paper`) | read.for.23 | core |
| ⬜ | `read-forest-35` | شاهنامه | Unit: passages of فردوسی with a gloss (آرش، رستم و سهراب retold), the epic tone | animation (`scene`), story (`passage`, `readaloud`) | read.for.14, read.for.1 | core |
| ⬜ | `read-forest-36` | رباعی، دوبیتی، قصیده | Unit: the other classical forms and the kinds of literature (حماسی، تعلیمی، غنایی) | game (`sort`), story (`passage`) | read.for.13 | full |
| ⬜ | `read-forest-37` | ادبیات جهان | Unit: world stories in translation (from the textbook's «ادبیات جهان», such as *The Little Prince*): read, discuss | story (`passage`, `talk`) | read.for.15 | core |
| ⬜ | `read-forest-38` | سفرنامه و زندگی‌نامه | Unit: today's Persian prose: a travel diary and a life story read and talked about | story (`passage`, `talk`) | read.for.16 | core |
| ⬜ | `read-forest-39` | گفت‌وگو و ارائه | Unit: a discussion with the family on a question from a text; a three-minute presentation from notes | story (`talk`), home (`paper`) | read.for.24 | core |
| ⬜ | `read-forest-40` | پژوهش کوچک | Unit: a question, three sources, notes, a one-page report naming them | home (`paper`), parent tip (`forparents`) | read.for.27 | core |
| ⬜ | `read-forest-41` | کتاب‌های من | Reading whole books: a reading list, a log, a short review written for a friend | home (`paper`), story (`talk`) | read.for.28 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `read-forest-p1` | Reading library | Literary and information texts with questions on main idea, structure, inference, critical reading and words | read.for.1, read.for.2, read.for.3, read.for.4 |
| ⬜ | `read-forest-p2` | Grammar sentence bank | Sentences tagged for sentence parts, verb tense, noun groups and adverbs, for tap and sort games | read.for.7, read.for.8, read.for.9, read.for.10 |
| ⬜ | `read-forest-p3` | Literary-device bank | Lines of classical and Baghcheh poems tagged by device and form | read.for.11, read.for.12, read.for.13 |
| ⬜ | `read-forest-p4` | Dictation and درست‌نویسی bank | Paragraphs with Arabic-origin words, half-spaces and common mistakes, with answers | read.for.6 |
| ⬜ | `read-forest-p5` | Word-formation generator | Roots and affixes to build and sort ساده، مشتق، مرکب words | read.for.5 |
| ⬜ | `read-forest-p6` | Writing prompts | Pictures, proverbs, حکایت, abstract topics and forms, each with a model, a plan and a checklist for revision | read.for.17, read.for.18, read.for.19, read.for.20, read.for.21, read.for.22, read.for.23 |
| ⬜ | `read-forest-p7` | Poem bank | Classical poems with a gloss to read with tone and learn by heart | read.for.14, read.for.24 |

### Step types needed

Not built yet; rows that use them are marked 🆕. They also belong in "New step types" in `CURRICULUM.md`
(not edited here, since other subjects are being rewritten at the same time).

| Step type | What it does | Used by |
|---|---|---|
| `mark` | **Built** (`js/steps/reading.js`, words). Tap words, phrases or sentences in a text to mark them (the names, the verb, نهاد and گزاره, the topic sentence, the simile, the evidence for an answer); scored against the marked answer, with the right ones shown after two tries | `read-sapling-64/65/66`, `read-tree-3/16/34`, `read-forest-4/5/11/15/19/20/29/42` |
| `boxes` | **Built** (`js/steps/reading.js`). Sound boxes (Elkonin boxes): hear a word, push one counter into a box for each sound; later the letters go into the boxes (`letters: true`), so the same step teaches spelling | `read-sprout-7` (and the sound and dictation practice generators) |

### Questions for a Persian teacher

1. **Where the alphabet sits (recommended: move it).** The leading systems finish letter–sounds by about age 6–7. By age, Sprout matches پیش‌دبستانی and پایه اول, but the built letter lessons
   (`read-sapling-1` to `read-sapling-24`) are in Sapling, so a child who finishes Sprout knows only آ ب د م س ـَ, and
   Baghcheh's other subjects start at the child's Persian garden. Move those lessons to Sprout (only `level`
   changes, ids stay; the placement check would change too), or keep the gardens as they are?
2. **Letter order.** Baghcheh teaches ی (y) after ژ and ج before ق ل, while پایه اول teaches ی in درس ۸ and ج in
   درس ۱۳. For a child using Baghcheh alongside school in پایه اول, is the difference a problem?
3. **The missing «و» lessons.** Consonant «و», «و» read as «اُ» and «خوا» are not taught yet; `read-sapling-29`
   and `read-sapling-30` are planned at the places پایه اول teaches them. The built lessons after them avoid
   these words, so nothing breaks, but `B.READ_TEACHES` (`js/practice/read.js`, used by `tools/check-reading.js`) needs them when they are built.
4. **How fast to drop the vowel marks** (`read-sapling-39`, `-62`): which words keep marks in پایه دوم and سوم?
5. **Grammar in پایه دوم to پنجم.** Which «دانش زبانی» points each grade teaches could not be checked online
   (only پایه ششم's نهاد و گزاره and all of پایه هفتم–نهم). The School column for `read.sap.20`, `.23`, `.24` and
   `read.tree.14`–`.16` is a best guess.
6. **Weekly hours in پایه اول to پنجم** are from teachers' copies of the timetable, not an official current table.
7. **Poems by heart.** Most poems in the school books (عباس یمینی‌شریف, مصطفی رحماندوست, افسانه شعبان‌نژاد …) are
   still under copyright. Baghcheh plans its own poems plus classical ones; should we ask the poets or their
   families for permission to use a few well-known children's poems?
8. **Textbook lessons Baghcheh leaves out.** Lessons on religion, the revolution and war (for example مسجد محله،
   زیارت، دفاع از میهن، شهدا) are not mirrored, by Baghcheh's content policy; their School mapping is to the
   language skill only. Is any language skill taught only in those lessons?
9. **Folk tales for the youngest.** Which tellings of کدو قلقله‌زن and خاله سوسکه are gentle enough for Seed?
10. **Letter names and alphabetical order** (`read-sapling-36`, `-80`): when do schools expect them?
