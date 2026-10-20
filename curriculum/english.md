## خواندن و نوشتن انگلیسی — subject `english`

The English course: listening, speaking, reading and writing English as a second language, from the Seed garden to
the end of the Forest garden. Speaking and understanding English also grow from playing the other subjects' lessons
in English ([Lessons in English](../CURRICULUM.md#lessons-in-english)), which adds exposure on top of the sizes below.
Lessons in `js/lessons/english.js`, English step types (`words`, `listen`, `letter`, `tip`) in `js/steps/english.js`,
writing on paper (`paper`) in `js/steps/paper.js`, the English voice in `js/english-voice.js`.
Every child starts at Seed (`defaultLevel: "seed"`). Seed is listening and speaking first: meaning shown by pictures
and actions (never by translation), lots of repetition, and hearing the sounds in words. Sprout teaches the letters
and their sounds a few at a time (systematic synthetic phonics), blending them to read and writing them. Sapling
reads and writes short sentences and texts, with the first grammar. Tree and Forest read longer texts, write
paragraphs and talk about more of the world, up to A2 for everyone and B1 at full depth. Instructions are Persian and
spoken; English is written left to right and spoken with the device's English voice. Every lesson ends with a `tip`
for parents, who may not know English. Our own chants, stories and texts only (no copyrighted songs or books). Every
animation is a `scene` (drawings in `js/art/rig-english.js`) where the picture does what the English says.

**Expert review still to do:** an English teacher (ideally one who has taught Prospect 1–3 and young learners)
reviews the objectives, the order of the phonics and the School column; a fluent speaker checks every English text.
See "Questions for an English teacher" at the end.

### Frameworks

**The best systems and best practice lead.** What is taught, and in what order, follows the CEFR, the Cambridge
young-learner lists, systematic phonics research and what the countries most successful at teaching English as a
foreign language do. Iran's school English (Prospect 1–3) is used only for the School column, so «همراه مدرسه» can
follow the class; where Prospect has something the standards below don't (Iranian festivals), it is added as `full`.

- **Countries that teach English best** (the Netherlands first in the EF English Proficiency Index 2025, then Austria,
  Germany, Norway, Denmark, Sweden, Finland; Singapore is now counted as English-speaking). What Baghcheh takes:
  - **Start early, by ear.** Finland starts its first foreign language (usually English) in grade 1 since 2020, with
    the focus on speaking and listening, not reading. Dutch schools may start English at 4 (*vvto*); pupils who
    started early reach the expected standard in reading, listening and vocabulary and speak better than those who
    started at 10 (Cito, reported to the Dutch parliament). So English starts in Seed, oral only.
  - **Lots of English outside lessons.** Dutch and Nordic children hear English every day (subtitled, not dubbed,
    films and TV). Baghcheh adds the other subjects' lessons in English, the story bank, and parent tips about
    listening to English at home.
  - **Communication around the child's world.** Sweden's syllabus (Lgr22) is built on reception, production and
    interaction about familiar topics, with songs, rhymes, stories, dialogues and short presentations; the Dutch core
    goals (*kerndoelen* 13–16) stress speaking, listening and reading simple texts. These shape the strands and the
    speaking objectives (dialogues, describing, short talks).
  - **Explicit teaching of reading.** Singapore's English syllabus (2020) teaches phonics, grammar in context and
    shared reading explicitly. Baghcheh teaches phonics systematically (below) and reads stories with the child.
- **CEFR** (Council of Europe): levels Pre-A1, A1, A2 and B1, the *Companion Volume* (2020) can-do descriptors, and
  the collated descriptors for young learners aged 7–10 and 11–15 (Goodier and Szabo, 2018). Objectives below are
  written as can-do statements with their level.
- **Cambridge English Qualifications for young learners** as the vocabulary and grammar spine: the *Pre A1 Starters,
  A1 Movers and A2 Flyers Wordlist* (2018) and the *Grammar and structures* lists in the *Young Learners Handbook for
  Teachers* (2024); then the *A2 Key* and *B1 Preliminary for Schools* vocabulary lists for Forest. Starters ≈ end of
  Sprout and Sapling, Movers ≈ end of Sapling, Flyers ≈ end of Tree, Key/Preliminary ≈ Forest.
- **Systematic synthetic phonics:** *Letters and Sounds* (DfES, 2007), six phases: Phase 1 (listening, rhyme,
  first sounds, oral blending) in Seed; Phases 2–4 (letters and their sounds, digraphs, adjacent consonants, tricky
  words) in Sprout; Phase 5 (alternative spellings) and Phase 6 (spelling rules, fluency) in Sapling; and DfE's
  *The Reading Framework* (2023) for daily, cumulative, decodable practice.
- **Listening and speaking first, meaning without translation:** Cameron, *Teaching Languages to Young Learners*
  (CUP, 2001); Pinter, *Teaching Young Language Learners* (OUP, 2017).
- **Hours per level** (guided learning hours from beginner): about 90–100 for Starters/A1 Movers, 180–200 for A2
  Flyers (Cambridge figures as quoted by exam-preparation sites); the British Council quotes about 100, 175 and 250
  school hours for Starters, Movers and Flyers. B1 is commonly put at 350–400 hours. These set the sizes below.
- **Iran (for the School column only).** English is not part of the public primary timetable (grades 1–6); it
  starts in grade 7 with the national textbooks *Prospect 1* (grade 7, 8 lessons), *Prospect 2* (grade 8, 7 lessons) and *Prospect 3*
  (grade 9, 6 lessons), written by the Ministry of Education's Organisation for Educational Research and Planning
  (سازمان پژوهش و برنامه‌ریزی آموزشی) since 2013 with a communicative approach, starting from the alphabet. The
  timetable gives a foreign language **2 hours a week** in lower secondary (جدول مواد درسی و ساعات تدریس هفتگی,
  شورای عالی آموزش و پرورش، ۱۳۹۲). The national curriculum (برنامه درسی ملی، ۱۳۹۱) puts it in the learning area
  «زبان‌های خارجی». Lessons used for the School column:
  - Prospect 1: 1 My Name · 2 My Classmates · 3 My Age · 4 My Family · 5 My Appearance · 6 My House · 7 My Address ·
    8 My Favorite Food (greetings and names, spelling, *who*, contractions, age and months, jobs, possessive
    adjectives, yes/no questions with *be*, present continuous, *be going to*, *How about …?*).
  - Prospect 2: 1 My Nationality · 2 My Week · 3 My Abilities · 4 My Health · 5 My City · 6 My Village · 7 My Hobbies
    (*Where are you from?*, spelling; present simple, *do/does*, *on/in* for time; *can*, *be good at*; *What's
    wrong?*, *should*, *Why don't you …?*; *there is/are*, *some/many*, *famous for*, *What's it like?*; weather;
    *like + -ing*, *usually*).
  - Prospect 3: 1 Personality · 2 Travel · 3 Festivals and Ceremonies · 4 Services · 5 Media · 6 Health and
    Injuries (grammar as summarised by teachers: *be* and *there is/are*; present continuous; present simple and
    frequency adverbs; wh-questions; past simple of *be* and regular verbs; irregular past and object pronouns).
  A child who follows Baghcheh reaches grade 7 at about A2, well ahead of Prospect 1. The School column points to the
  Prospect lesson an objective covers; Prospect never decides what is taught or when. The one Prospect topic the
  standards above lack, festivals and ceremonies in Iran, is added in Forest as `full` (`english.for.25`).

Sources to check:
[EF EPI 2025](https://www.ef.com/wwen/epi/) ·
[Finland: A1 language from grade 1 (Tampere University)](https://research.tuni.fi/tovi-l2-teaching-research/early-language-teaching/) ·
[Turku: language studies from grade 1](https://turku.fi/en/news/2019-04-09_language-studies-will-start-early-1st-grade) ·
[Sweden: Lgr22 (Skolverket)](https://skolverket.se/download/18.7c808d9519080d9657c12/1720176003183/pdf13128.pdf) ·
[Netherlands: Engels in het basisonderwijs (SLO)](https://slo.nl/publish/pages/2774/engels-in-het-basisonderwijs-vakdossier.pdf) ·
[Netherlands: vvto results (Tweede Kamer)](https://zoek.officielebekendmakingen.nl/kst-31293-179.pdf) ·
Singapore Ministry of Education, *English Language Syllabus 2020, Primary* ·
[Cambridge YLE wordlist 2018](https://www.cambridgeenglish.org/vn/Images/351851-a2-flyers-word-list-2018.pdf) ·
[Young Learners handbook 2024](https://www.cambridgeenglish.org/es/Images/young-learners-handbook-2024.pdf) ·
[British Council: young learners exams](https://www.britishcouncil.cz/en/exam/cambridge/which/young-learners) ·
[CEFR bank of supplementary descriptors (YL collations)](https://www.coe.int/en/web/common-european-framework-reference-languages/bank-of-supplementary-descriptors) ·
[Letters and Sounds overview (Oxford Owl)](https://home.oxfordowl.co.uk/reading/what-is-letters-and-sounds/) ·
[Grade 7 timetable, 2 hours of foreign language (Migna)](https://www.migna.ir/news/17673/) ·
[Grade 8 lessons and grammar (Faradars)](https://blog.faradars.org/گرامر-زبان-هشتم/) ·
[Grade 9 grammar (Faradars)](https://blog.faradars.org/گرامر-زبان-نهم/) ·
[Grade 9 grammar (Ostadbank)](https://edu.ostadbank.com/ninth-english-grammar/) ·
[Grade 7 grammar (Faab)](https://blog.faab.ir/languages/seventh-grade-language-grammar) ·
[Grade 8 lesson list (Gama)](https://gama.ir/course/detail/450) ·
[Grade 9 lesson list (Gama)](https://gama.ir/course/detail/470) ·
[Textbook titles, lower secondary (chap.sch.ir)](http://chap.sch.ir/guide-books).
The Prospect lesson-by-lesson grammar comes from teachers' summaries, not the books themselves: a teacher should
confirm it against the current editions.

### Strands

- **listening:** sounds and words, then instructions, stories, dialogues and talks.
- **speaking:** words and chunks, then questions and answers, short exchanges, telling and presenting.
- **phonics and spelling:** hearing sounds (Phase 1), letters and their sounds, blending and segmenting,
  alternative spellings, spelling rules.
- **reading:** captions and decodable sentences, then stories and information texts, reading for pleasure.
- **writing:** letter formation, words, sentences, paragraphs, messages and stories.
- **vocabulary:** words by theme (Starters → Movers → Flyers → Key/Preliminary), word building, dictionary use.
- **grammar:** chunks first (Seed, Sprout), then the structures of the Cambridge lists and the CEFR level descriptions.

### Sizing

School gives no English before grade 7 and 2 hours a week after it, so Baghcheh sets its own share (about a fifth of
a Seed day, less later), enough to reach the levels above: sessions of 10 minutes (Seed), 15 (Sprout), 20 (Sapling,
Tree) and 25 (Forest). Core depth is about half: the `core` objectives and lessons, with fewer practice sessions.

| Garden | Years | Sessions a week | Sessions | Lessons | Practice sessions | Hours | Reaches |
|---|---|---|---|---|---|---|---|
| Seed | 2 | 3 | 216 | 40 | 176 | ≈ 36 | Pre-A1 listening and speaking |
| Sprout | 2 | 4 | 288 | 60 | 228 | ≈ 72 (108 in all) | Pre-A1 (Starters), decoding Phases 2–4 |
| Sapling | 2 | 4 | 288 | 60 | 228 | ≈ 96 (204) | A1 (Movers) |
| Tree | 3 | 4 | 432 | 90 | 342 | ≈ 144 (348) | A2 (Flyers) |
| Forest | 3 | 4 | 432 | 90 | 342 | ≈ 180 (528) | A2+ for all, B1 at full depth |

### 🌰 دانه — `seed`

Listen, point, say. Sound play (Letters and Sounds Phase 1) gets the ear ready for Sprout. No reading.
**2 years × 36 weeks × 3 sessions of 10 minutes = 216 sessions: 40 lessons and 176 practice sessions.**

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `english.seed.1` | Can say hello and goodbye, and say my name: «Hello, I'm Sara.» (Pre-A1) | speaking | core | پیش‌نیاز Prospect 1، درس ۱ | `words` and `listen` in `english-seed-1`, `english-seed-9` |
| `english.seed.2` | Can do what simple spoken instructions say: stand up, sit down, clap, jump, touch your nose (Pre-A1) | listening | core | — | `listen` with actions in `english-seed-10`, `english-seed-16` |
| `english.seed.3` | Can understand and say about 150 everyday words from pictures: colours, animals, family, body, food, toys, clothes, home, classroom, weather, actions (Pre-A1) | vocabulary | core | پیش‌نیاز Prospect 1 | `listen` and `pairs` in each theme lesson; `english-seed-40` |
| `english.seed.4` | Can count aloud to 10 and show how many (Pre-A1) | vocabulary | core | — | `listen` with dots in `english-seed-3`, `english-seed-12` |
| `english.seed.5` | Can join in with short chants and action rhymes (Pre-A1) | speaking | core | — | parent tip in `english-seed-16`, `english-seed-38` |
| `english.seed.6` | Can answer simple questions with a word or a chunk: What's this? What colour? How many? Who's this? (Pre-A1) | speaking | core | — | `listen` in `english-seed-11`, `english-seed-36` |
| `english.seed.7` | Can ask for things politely: please, thank you, yes please, no thank you (Pre-A1) | speaking | full | — | `english-seed-7`, `english-seed-17` |
| `english.seed.8` | Can tell sounds apart, keep a beat and hear words that rhyme (cat, hat) | phonics and spelling | full | — | `listen` and `pairs` in `english-seed-13`, `english-seed-20` |
| `english.seed.9` | Can hear the first sound of a word (s-s-sun) and find pictures that start with it | phonics and spelling | core | — | `sort` in `english-seed-22`, `english-seed-31` |
| `english.seed.10` | Can blend sounds said one by one into a word (c-a-t → cat) and say a word in sounds | phonics and spelling | full | — | `listen` in `english-seed-27`, `english-seed-34` |
| `english.seed.11` | Can follow a short picture story told slowly with a repeated line, and point to what happens (Pre-A1) | listening | full | — | `story` questions in `english-seed-25`, `english-seed-39` |
| `english.seed.12` | Can say how I feel: happy, sad, tired, hungry (Pre-A1) | speaking | full | — | `listen` in `english-seed-24` |
| `english.seed.13` | Knows that English is written left to right with its own letters, and recognises my name written in English | reading | full | — | `english-seed-37` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `english-seed-1` | سلام و خداحافظ | Hello, goodbye, my name is | animation, lesson (`words`, `listen`), parent tip | english.seed.1 | core |
| 🔨 | `english-seed-9` | اسم تو چیست؟ | What's your name? I'm … How are you? I'm fine. Mina and Reza meet, then turn and ask the child, who answers aloud | animation, lesson (`words`, `listen`), parent tip | english.seed.1, english.seed.6 | core |
| 🔨 | `english-seed-10` | بلند شو، بنشین | Action words: stand up, sit down, clap your hands, jump, turn around; «Sara says» (do it only when Sara says) | animation, lesson (`listen`), home (`doit`), parent tip | english.seed.2 | core |
| ✅ | `english-seed-2` | رنگ‌ها | Colours | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.seed.3 | core |
| 🔨 | `english-seed-11` | رنگ‌های بیشتر | pink, orange, purple, brown, black, white; What colour is it? It's red. | lesson (`words`, `listen`), game (`pairs`), parent tip | english.seed.3, english.seed.6 | core |
| ✅ | `english-seed-3` | عددها تا ده | Numbers 1–10 | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.seed.4 | core |
| 🔨 | `english-seed-12` | چندتا؟ | How many? Counting things in a picture; show me three fingers | lesson (`listen`), game (`pairs`), parent tip | english.seed.4, english.seed.6 | core |
| 🔨 | `english-seed-13` | گوش کن! | Sounds around us (Phase 1): which made this sound (a knock on the door, rain, a bell, a clock, a car horn: our own synthesised sounds)? Loud and quiet | lesson (`listen` with `audio`), game (`pairs`), parent tip | english.seed.8 | full |
| ✅ | `english-seed-4` | حیوان‌ها | Animals | animation, lesson, game (`pairs`), parent tip | english.seed.3 | core |
| 🔨 | `english-seed-14` | مثل حیوان‌ها | Hop like a frog, fly like a bird, swim like a fish; what animals say (ribbit, tweet) | animation, lesson (`listen`), home (`doit`), parent tip | english.seed.2, english.seed.3 | core |
| ✅ | `english-seed-5` | خانواده | Family words | animation, lesson, parent tip | english.seed.3 | core |
| 🔨 | `english-seed-15` | این مامان من است | This is my mum. Who's this? It's my grandpa. | animation, lesson (`listen`), parent tip | english.seed.3, english.seed.6 | core |
| ✅ | `english-seed-6` | بدن من | Body parts | animation, lesson, parent tip | english.seed.3 | core |
| 🔨 | `english-seed-16` | دست بزن به دماغت | Touch your nose, clap your hands, stamp your feet; our own action chant | animation, lesson (`listen`), home (`doit`), parent tip | english.seed.2, english.seed.5 | core |
| ✅ | `english-seed-7` | خوراکی‌ها | Food and drink words; asking with «please» at breakfast | animation, lesson (`words`, `listen`), game (`pairs` with `hidden`), parent tip | english.seed.3, english.seed.7 | core |
| 🔨 | `english-seed-17` | لطفاً، ممنون | Can I have an apple, please? Here you are. Thank you. Yes, please / No, thank you | animation, lesson (`listen`), parent tip | english.seed.7 | full |
| ✅ | `english-seed-8` | بازی کلمه‌ها | Unit game: words from the Seed garden (animals, food, body, family, numbers, animal sounds) | game (`pairs`, `sort`) | english.seed.3 | core |
| 🔨 | `english-seed-18` | بازی با ضرب | Phase 1: copy a beat, clap the rhythm of a chant, fast and slow (synthesised claps) | lesson (`listen`), home (`doit`), parent tip | english.seed.8, english.seed.5 | full |
| 🔨 | `english-seed-19` | اسباب‌بازی‌ها | ball, doll, car, teddy, kite, train; I've got a ball | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.seed.3 | core |
| 🔨 | `english-seed-20` | هم‌قافیه | Rhyme: cat–hat, dog–frog; which one rhymes? Finish the rhyme | lesson (`listen`), game (`pairs`), parent tip | english.seed.8 | full |
| 🔨 | `english-seed-21` | لباس‌ها | hat, shoes, coat, dress, T-shirt, socks; put on your hat | animation, lesson (`words`, `listen`), parent tip | english.seed.3, english.seed.2 | core |
| 🔨 | `english-seed-22` | صدای اول | I spy (Phase 1, alliteration): s-s-sun; which one starts with /m/? | lesson (`listen`), game (`sort`), parent tip | english.seed.9 | core |
| 🔨 | `english-seed-23` | خانه من | kitchen, bedroom, bathroom; door, window, chair, bed (in the picture); a cat goes from room to room; Where's the cat? In the kitchen. | animation, lesson (`words`, `listen`), parent tip | english.seed.3 | core |
| 🔨 | `english-seed-24` | حال من | happy, sad, angry, tired, hungry, scared; I'm happy. How are you? (faces shown, not explained) | animation, lesson (`words`, `listen`), parent tip | english.seed.12 | full |
| 🔨 | `english-seed-25` | قصه: گربه کجاست؟ | Picture story with a repeated line («Is it in the box? No!»), heard slowly; point to the cat | animation, story (`scene` + `question`), lesson (`listen`), parent tip | english.seed.11 | full |
| 🔨 | `english-seed-26` | بازی اسباب‌بازی و لباس | Unit game: toys, clothes, home | game (`pairs`, `sort`), parent tip | english.seed.3 | core |
| 🔨 | `english-seed-27` | حرف زدن رباتی | Oral blending (Phase 1): a robot says r-e-d, c-a-t; tap the picture | lesson (`listen`), parent tip | english.seed.10 | full |
| 🔨 | `english-seed-28` | هوا | sunny, rainy, windy, cloudy, snowy; What's the weather like? It's sunny. | animation, lesson (`words`, `listen`), parent tip | english.seed.3, english.seed.6 | full |
| 🔨 | `english-seed-29` | شکل‌ها و اندازه‌ها | circle, square, triangle, star; big, small, long, short | lesson (`words`, `listen`), game (`sort`), parent tip | english.seed.3 | full |
| 🔨 | `english-seed-30` | کارهایی که می‌کنم | run, jump, swim, climb, sing, dance, eat, sleep; I can jump! (sleep in words and listening only) | animation, lesson (`words`, `listen`), home (`doit`), parent tip | english.seed.2, english.seed.3 | core |
| 🔨 | `english-seed-31` | بازی صدای اول | Sort pictures by first sound (s, m, t, b) | game (`sort`, `pairs`), parent tip | english.seed.9 | core |
| 🔨 | `english-seed-32` | کلاس من | book, pen, pencil, bag, crayon; open your book, show me a pencil | animation, lesson (`words`, `listen`), parent tip | english.seed.3, english.seed.2 | core |
| 🔨 | `english-seed-33` | قصه: خرس گرسنه | Story with a repeated line («I'm hungry! An apple, please.») | animation, story (`scene` + `question`), lesson (`listen`), parent tip | english.seed.11, english.seed.7 | full |
| 🔨 | `english-seed-34` | کلمه را تکه کن | Oral segmenting: say sun in sounds like the robot; how many sounds? | lesson (`listen`, `clap` with `sounds: true`), parent tip | english.seed.10 | full |
| 🔨 | `english-seed-35` | در پارک | tree, flower, sun, sky, bird, bike; outdoors words | animation, lesson (`words`, `listen`), parent tip | english.seed.3 | full |
| 🔨 | `english-seed-36` | این چیست؟ | What's this? It's a … Is it a cat? Yes / No. One-word and chunk answers | animation, lesson (`listen`, `words`), parent tip | english.seed.6 | core |
| 🔨 | `english-seed-37` | حرف‌های انگلیسی | English goes left to right and has its own letters; my name in English letters (seen, not taught) | lesson (`listen`), game (`sort`), parent tip | english.seed.13 | full |
| 🔨 | `english-seed-38` | شعر من | A longer action chant with words from the garden; say it along | animation, lesson (`listen`), home (`doit`), parent tip | english.seed.5 | core |
| 🔨 | `english-seed-39` | قصه: روز سارا | A day in pictures with known words; point and answer | animation, story (`scene` + `question`), lesson (`listen`), parent tip | english.seed.11 | full |
| 🔨 | `english-seed-40` | بازی بزرگ دانه | Garden game: words of every theme, first sounds | game (`pairs`, `sort`), parent tip | english.seed.3, english.seed.9 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `english-seed-p1` | Word bank by theme | Picture + English audio for every Seed word, by theme (colours, numbers, animals, family, body, food, toys, clothes, home, classroom, weather, actions); makes `listen` and `pairs` items from the themes learned | english.seed.3, english.seed.4 |
| 🔨 | `english-seed-p2` | «Sara says» | Endless action instructions from a list of verbs and body parts (`listen` with action pictures, and off-screen) | english.seed.2 |
| 🔨 | `english-seed-p3` | Sound play | Rhyme pairs and first-sound sets from the word bank; oral blending of short words (robot talk) | english.seed.8, english.seed.9, english.seed.10 |
| 🔨 | `english-seed-p4` | Question time | What's this? What colour? How many? Who's this? on pictures from the word bank | english.seed.6 |
| 🔨 | `english-seed-p5` | Memory pairs | Face-down picture cards that say their word; find the pairs (`pairs` hidden), from the words of the lessons done, this lesson's first | english.seed.3 |
| 🔨 | `english-seed-p6` | Odd one out | Three pictures of one theme and one of another, each saying its word: which one does not belong? (`listen`) | english.seed.3 |
| 🔨 | `english-seed-p7` | Say it, then check | A picture: the child says its word aloud, then taps the one of three spoken words that is right (`listen` with sound buttons) | english.seed.3, english.seed.1 |
| 🔨 | `english-seed-p8` | Sort by theme | Picture cards that say their word, into two theme baskets (animals or food, toys or clothes …) (`sort`) | english.seed.3 |
| 🔨 | `english-seed-p9` | What do you say? | Everyday moments (morning, bedtime, a present, meeting someone, asking for something, how I feel): hear the phrase and tap the moment, or hear the moment and choose what to say | english.seed.1, english.seed.7, english.seed.12 |
| 🔨 | `english-seed-p10` | Little stories | Two or three short sentences heard, with a question and pictures to choose (who, where, what happened) | english.seed.11, english.seed.6 |

### 🌱 جوانه — `sprout`

Letters and their sounds (Letters and Sounds Phases 2–4), blending to read and segmenting to spell, tricky words,
and writing letters; listening and speaking grow with the Starters themes.
**2 years × 36 weeks × 4 sessions of 15 minutes = 288 sessions: 60 lessons and 228 practice sessions.**

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `english.spr.1` | Can say the sound of every single letter and find the letter for a sound (Phases 2–3) | phonics and spelling | core | پایه هفتم، Prospect 1 (الفبا و صداها) | `letter` and `pairs` in `english-sprout-1` to `english-sprout-6`, `english-sprout-59` |
| `english.spr.2` | Can blend sounds to read short words: sat, pin, dog, red (Pre-A1) | phonics and spelling | core | پایه هفتم، Prospect 1 | `pairs` (word ↔ picture) in `english-sprout-12`, `english-sprout-18`, `english-sprout-60` |
| `english.spr.3` | Can split a short word into its sounds and build it with letters | phonics and spelling | core | — | `build` in `english-sprout-13`, `english-sprout-52` |
| `english.spr.4` | Can read words with sh, ch, th, ng, nk, ck, qu and double letters | phonics and spelling | core | — | `sort` in `english-sprout-9`, `english-sprout-24` |
| `english.spr.5` | Can read words with ai, ee, igh, oa, oo, ar, or, ur, ow, oi, ear, air, er | phonics and spelling | core | — | `sort` and `pairs` in `english-sprout-26` to `english-sprout-34` |
| `english.spr.6` | Can read words with consonants side by side: hand, milk, frog, stop (Phase 4) | phonics and spelling | core | — | `pairs` in `english-sprout-38`, `english-sprout-39`, `english-sprout-42` |
| `english.spr.7` | Can read the common tricky words (I, the, to, no, go, he, she, we, me, be, was, you, they, my, are, all, said, have, like, so, do, some, come, were, there, one, what, when, out) | reading | core | — | `pairs` and `order` in `english-sprout-8`, `english-sprout-29`, `english-sprout-41` |
| `english.spr.8` | Can read a short decodable caption or sentence and match it to a picture (Pre-A1) | reading | core | — | `passage` in `english-sprout-30`, `english-sprout-43`, `english-sprout-55` |
| `english.spr.9` | Can write every small and capital letter on the line, starting in the right place | writing | core | پایه هفتم، Prospect 1 (نوشتن حرف‌ها) | `trace` in `english-sprout-10`, `english-sprout-14`, `english-sprout-51` |
| `english.spr.10` | Can write a short word and a short caption that is said aloud | writing | full | — | `build` (`hidden`) and `paper` in `english-sprout-11`, `english-sprout-53` |
| `english.spr.11` | Can understand and use about 250 more words: school, clothes, home, food, animals, toys, the face (Starters themes) (Pre-A1) | vocabulary | core | پایه هفتم، Prospect 1، درس ۲، ۵ و ۶ | `listen` in each theme lesson; `english-sprout-58` |
| `english.spr.12` | Can ask and answer simple questions: How old are you? Have you got …? Do you like …? Can you …? (Pre-A1) | speaking | core | پایه هفتم، Prospect 1، درس ۳ | `listen` in `english-sprout-19`, `english-sprout-46`, `english-sprout-50` |
| `english.spr.13` | Can follow short spoken instructions and a short story made of known words (colour the cat red; point to the frog) (Pre-A1) | listening | core | — | `listen` in `english-sprout-37`, `english-sprout-44` |
| `english.spr.14` | Can use the chunks I've got, I can, I like, there's, this/that, and hear one/many (Pre-A1) | grammar | full | — | `order` in `english-sprout-35`, `english-sprout-48` |
| `english.spr.15` | Can say the alphabet with the letter names and spell my name aloud | phonics and spelling | full | پایه هفتم، Prospect 1، درس ۱ | `order` in `english-sprout-22` |
| `english.spr.16` | Can count to 20 and say my age (Pre-A1) | vocabulary | core | پایه هفتم، Prospect 1، درس ۳ | `listen` in `english-sprout-19` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `english-sprout-1` | حرف‌های s a t p | Sounds s a t p; sat, pat, tap | lesson (`letter`, `listen`), game (`sort`, `pairs`, `build`), parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-12` | بخوان با s a t p | Blending: at, sat, pat, tap, sap; sound buttons under each letter, then the whole word | lesson (`listen`, `blend` in English), game (`pairs`), parent tip | english.spr.2 | core |
| ✅ | `english-sprout-2` | حرف‌های i n m d | i n m d | lesson, game (`sort`, `build`, `pairs`), parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-13` | کلمه‌های تازه | Read and build pin, tin, man, sit, dad, and, mat; first tricky word: the | lesson (`listen`), game (`build`, `pairs`), parent tip | english.spr.2, english.spr.3 | core |
| 🔨 | `english-sprout-14` | نوشتن حرف‌های اول | Writing s a t p i n m d on the line, from the right starting point | lesson (`trace` of Latin letters), parent tip | english.spr.9 | core |
| ✅ | `english-sprout-3` | حرف‌های g o c k | g o c k | lesson, game, parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-15` | سگ و گربه | Read dog, cat, pot, kid, cot; tricky words I, no, go, to | lesson (`listen`), game (`pairs`, `build`), parent tip | english.spr.2, english.spr.7 | core |
| ✅ | `english-sprout-4` | حرف‌های e u r | e u r | lesson, game (`build`, `pairs`), parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-16` | جمله‌های کوچک | Read captions: a red cap, a pet in a cot, get up | game (`pairs`, `order`), parent tip | english.spr.8, english.spr.7 | core |
| ✅ | `english-sprout-5` | حرف‌های h b f l | h b f l | lesson, game, parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-17` | ff، ll، ss، ck | Double letters and ck: off, bell, doll, kiss, duck, sock, lock | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.spr.4 | core |
| 🔨 | `english-sprout-18` | بازی خواندن ۱ | Read short words with the letters so far; sort by middle sound | game (`pairs`, `sort`, `build`), parent tip | english.spr.2, english.spr.3 | core |
| 🔨 | `english-sprout-19` | عددها تا بیست | Numbers 11–20; How old are you? I'm six. | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.spr.16, english.spr.12 | core |
| ✅ | `english-sprout-6` | حرف‌های j v w x y z q | The remaining letters (x heard at the end: box, fox; q with u: queen); fox. *Revise: seven letters is too many for one lesson; keep j v w x here and leave y z qu to `english-sprout-21`* | lesson (`letter`, `listen`), game (`pairs`, `build`), parent tip | english.spr.1 | core |
| 🔨 | `english-sprout-20` | دوباره: j v w x | Read and build jam, van, web, fox, box, wet | lesson (`listen`), game (`pairs`, `build`), parent tip | english.spr.1, english.spr.2 | core |
| 🔨 | `english-sprout-21` | y، z، qu | yes, yet, zip, buzz, quiz, quick | lesson (`letter`, `listen`), game (`pairs`, `build`), parent tip | english.spr.1, english.spr.4 | core |
| ✅ | `english-sprout-7` | حرف بزرگ، حرف کوچک | Uppercase ↔ lowercase, b and d, names start with a capital (Sara, Reza) | game (`pairs`, `sort`), lesson (`listen`), parent tip | english.spr.9, english.spr.1 | core |
| 🔨 | `english-sprout-22` | الفبا | Letter names A–Z in order (our own alphabet chant); spell your name: S-A-R-A | animation, lesson (`listen`), game (`order`), parent tip | english.spr.15 | full |
| ✅ | `english-sprout-8` | کلمه‌های پرکاربرد | First sight words: I, a, the, is, see, my; reading «I see my cat.» | animation, game (`pairs`, `build`, `order`), lesson (`listen`), parent tip | english.spr.7, english.spr.8 | core |
| ✅ | `english-sprout-9` | sh، ch، th | Two letters, one sound; fish, bath, shop | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.spr.4 | core |
| 🔨 | `english-sprout-23` | ng و nk | ring, sing, king, bank, pink, think | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.spr.4 | core |
| ✅ | `english-sprout-10` | نوشتن حرف‌ها | Writing small letters on the line, from the right starting point, by family: round (c a d), tall sticks (l t), humps (n), s; the rest on paper (parent tip). *Revise: `english-sprout-14` and `english-sprout-51` now cover the other letters on screen* | lesson (`trace` of Latin letters), parent tip | english.spr.9 | core |
| ✅ | `english-sprout-11` | نوشتن کلمه‌ها | Hear a short word, build it, then write it letter by letter (cat, sun; bed on paper) | game (`build`), lesson (`trace` of Latin letters), parent tip | english.spr.10, english.spr.3 | core |
| 🔨 | `english-sprout-24` | بازی دو حرف، یک صدا | Sort and read words with sh, ch, th, ng, ck | game (`sort`, `pairs`, `build`), parent tip | english.spr.4 | core |
| 🔨 | `english-sprout-25` | مدرسه | pencil, rubber, ruler, desk, board, teacher; Have you got a pencil? Yes, I have. | animation, lesson (`words`, `listen`), parent tip | english.spr.11, english.spr.12, english.spr.14 | core |
| 🔨 | `english-sprout-26` | ai و ee | rain, tail, wait; see, tree, feet | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.spr.5 | core |
| 🔨 | `english-sprout-27` | igh و oa | night, light, high; boat, coat, goat | lesson (`letter`, `listen`), game (`pairs`, `build`), parent tip | english.spr.5 | core |
| 🔨 | `english-sprout-28` | oo بلند، oo کوتاه | moon, food, zoo; book, look, foot | lesson (`letter`, `listen`), game (`sort`), parent tip | english.spr.5 | core |
| 🔨 | `english-sprout-29` | کلمه‌های پرکاربرد ۲ | he, she, we, me, be, was, you, they, all, are, her | game (`pairs`, `order`), lesson (`listen`), parent tip | english.spr.7 | core |
| 🔨 | `english-sprout-30` | قصه: بز در قایق | Decodable story «The goat in the boat» with questions | story (`passage`), parent tip | english.spr.8 | core |
| 🔨 | `english-sprout-31` | ar و or | car, star, farm; fork, corn, horse | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.spr.5 | core |
| 🔨 | `english-sprout-32` | ur، ow، oi | fur, burn; cow, town; coin, oil | lesson (`letter`, `listen`), game (`sort`), parent tip | english.spr.5 | full |
| 🔨 | `english-sprout-33` | ear، air، er | ear, hear; hair, chair; sister, letter | lesson (`letter`, `listen`), game (`pairs`), parent tip | english.spr.5 | full |
| 🔨 | `english-sprout-34` | بازی صداهای دوحرفی | Sort and read words with vowel digraphs | game (`sort`, `pairs`, `build`), parent tip | english.spr.5 | core |
| 🔨 | `english-sprout-35` | لباس‌های من | Clothes and colours: I've got a blue T-shirt. She's got a purple dress, pink shoes; I've got a red hat (order) | animation, lesson (`words`, `listen`), game (`order`), parent tip | english.spr.11, english.spr.14 | core |
| 🔨 | `english-sprout-36` | اتاق من | bed, lamp, sofa, cupboard, mirror; There's a lamp in my room. | animation, lesson (`words`, `listen`), parent tip | english.spr.11, english.spr.14 | full |
| 🔨 | `english-sprout-37` | گوش کن و رنگ کن | Listen and do (the Starters task): colour the cat red, point to the frog, find the small ball | lesson (`listen`), parent tip | english.spr.13 | core |
| 🔨 | `english-sprout-38` | دو حرف کنار هم ۱ | Final blends: hand, milk, tent, jump, lamp, nest | lesson (`listen`), game (`pairs`, `build`), parent tip | english.spr.6 | core |
| 🔨 | `english-sprout-39` | دو حرف کنار هم ۲ | First blends: frog, stop, crab, flag, swim, drum | lesson (`listen`), game (`pairs`, `build`), parent tip | english.spr.6 | core |
| 🔨 | `english-sprout-40` | کلمه‌های بلندتر | Two-part words: rabbit, picnic, lunchbox, helmet; clap the parts, then read | lesson (`clap` in English), game (`build`), parent tip | english.spr.6 | full |
| 🔨 | `english-sprout-41` | کلمه‌های پرکاربرد ۳ | said, have, like, so, do, some, come, were, there, one, what, when, out | game (`pairs`, `order`), lesson (`listen`), parent tip | english.spr.7 | core |
| 🔨 | `english-sprout-42` | بازی خواندن ۲ | Read captions with blends and match the picture | game (`pairs`, `order`), parent tip | english.spr.6, english.spr.8 | core |
| 🔨 | `english-sprout-43` | قصه: قورباغه و اردک | Decodable story «The frog and the duck» with questions | story (`passage`), parent tip | english.spr.8 | core |
| 🔨 | `english-sprout-44` | قصه را گوش کن | A heard story of known words (a cat, a bird and a tree); put the pictures in order | animation, game (`order`), lesson (`listen`), parent tip | english.spr.13 | core |
| 🔨 | `english-sprout-45` | حیوان‌های بیشتر | crocodile, giraffe, hippo, monkey, snake, spider; It's big. It's small. It's green. It's got a long neck; It's got eight legs (heard). | animation, lesson (`words`, `listen`), parent tip | english.spr.11, english.spr.14 | full |
| 🔨 | `english-sprout-46` | دوست داری؟ | rice, chicken, carrots, banana, ice cream; Do you like …? Yes, I do. / No, I don't. | animation, lesson (`words`, `listen`), parent tip | english.spr.11, english.spr.12 | core |
| 🔨 | `english-sprout-47` | صورت و بدن | hair, face, arm, leg, long, short; He's got brown hair. | animation, lesson (`words`, `listen`), parent tip | english.spr.11, english.spr.14 | full |
| 🔨 | `english-sprout-48` | من می‌توانم | I can swim. Can you jump? Yes, I can. / No, I can't. | animation, lesson (`listen`), game (`order`), parent tip | english.spr.12, english.spr.14 | core |
| 🔨 | `english-sprout-49` | این و آن | What's this? What's that? Near and far, shown by pointing | animation, lesson (`listen`), parent tip | english.spr.14, english.spr.12 | full |
| 🔨 | `english-sprout-50` | سؤال‌ها | What? Who? Where? How many? How old? Heard and answered | animation, lesson (`listen`), parent tip | english.spr.12 | core |
| 🔨 | `english-sprout-51` | نوشتن حرف‌های بزرگ | Writing capital letters, and the small letters not yet written | lesson (`trace` of Latin letters), parent tip | english.spr.9 | core |
| 🔨 | `english-sprout-52` | دیکته کلمه | Hear a word, build it with letters (no picture first), then see it | game (`build` with `hidden`), parent tip | english.spr.3, english.spr.10 | core |
| 🔨 | `english-sprout-53` | نوشتن جمله کوتاه | Write a short caption that is said: a fish in a dish | game (`build` with `hidden`), `paper`, parent tip | english.spr.10 | full |
| 🔨 | `english-sprout-54` | بازی و اسباب‌بازی | kite, robot, doll, bike, game; Let's play! | animation, lesson (`words`, `listen`), parent tip | english.spr.11 | full |
| 🔨 | `english-sprout-55` | قصه: ماهی بزرگ | Decodable story «The big fish» with tricky words and questions | story (`passage`), parent tip | english.spr.8, english.spr.7 | core |
| 🔨 | `english-sprout-56` | یک صدا را عوض کن | Change one sound: cat → hat → hot → hop | game (`build`), parent tip | english.spr.3 | full |
| 🔨 | `english-sprout-57` | بلند بخوان | Read a short decodable text aloud, then again; the parent marks the hard words; a question on each text | story (`readaloud` in English, `passage`), parent tip | english.spr.8 | full |
| 🔨 | `english-sprout-58` | بازی بزرگ کلمه‌ها | Garden game: words of the Sprout themes | game (`pairs`, `sort`), parent tip | english.spr.11 | core |
| 🔨 | `english-sprout-59` | بازی بزرگ صداها | Garden game: every letter and letter pair taught | game (`pairs`, `sort`, `build`), parent tip | english.spr.1, english.spr.4, english.spr.5 | core |
| 🔨 | `english-sprout-60` | ببین چه بلدی | End of the garden: read words and two sentences, listen and point (Starters style); a note for the parent on what to practise | lesson (`listen`), game (`pairs`), story (`passage`), parent tip | english.spr.2, english.spr.8, english.spr.13 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `english-sprout-p1` | Sound cards | Letters and letter pairs taught so far, in mixed order: hear and tap, see and say | english.spr.1, english.spr.4, english.spr.5 |
| 🔨 | `english-sprout-p2` | Decodable words | Words made only of the sounds taught so far (a word list tagged by sound): read and match, build, sort | english.spr.2, english.spr.3, english.spr.6 |
| 🔨 | `english-sprout-p3` | Decodable sentences | Sentences from the decodable words and the tricky words taught so far, with a picture to match | english.spr.7, english.spr.8 |
| 🔨 | `english-sprout-p4` | Dictation | Hear a decodable word and build it from its sounds (`build` with `hidden`); writing it on paper stays in the lessons (`english-sprout-52`, `english-sprout-53`) | english.spr.3, english.spr.10 |
| 🔨 | `english-sprout-p5` | Word bank (Starters) | Picture + audio for every Sprout word by theme, numbers to 20 | english.spr.11, english.spr.16 |
| 🔨 | `english-sprout-p6` | Listen and do | Colour, point and find instructions made from known words and colours | english.spr.13 |
| 🔨 | `english-sprout-p7` | Questions and answers | Have you got …? Do you like …? Can you …? with pictures from the word bank | english.spr.12, english.spr.14 |
| 🔨 | `english-sprout-p8` | First letters | Pictures (not only decodable words) that say their word, sorted by the letter they start with, from the letters taught (`sort`) | english.spr.1 |
| 🔨 | `english-sprout-p9` | Letter match | Letter ↔ picture of a word that starts with its sound, and capital ↔ small letter after english-sprout-7 (`pairs`) | english.spr.1, english.spr.15 |
| 🔨 | `english-sprout-p10` | Word and picture | Decodable words and the Starters words of the lessons done, matched to their pictures (`pairs`), and the odd word out | english.spr.2, english.spr.11 |

### 🌿 نهال — `sapling`

Short sentences, questions and everyday phrases; alternative spellings (Phase 5) and spelling rules (Phase 6);
the first grammar from the Movers list; writing a few sentences.
**2 years × 36 weeks × 4 sessions of 20 minutes = 288 sessions: 60 lessons and 228 practice sessions.**

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `english.sap.1` | Can read words with other spellings of the same sound: ay, a-e, ie, i-e, o-e, ow, u-e, ew, ue, ea, ou, oy, aw, ir, wh, ph (Phase 5) (A1) | phonics and spelling | core | — | `sort` in `english-sapling-11` to `english-sapling-21` |
| `english.sap.2` | Knows that a letter or pair can make more than one sound: c in cat and city, g, ow in cow and snow, y in yes, my, happy | phonics and spelling | full | — | `sort` in `english-sapling-19`, `english-sapling-30` |
| `english.sap.3` | Can spell -s and -es plurals, -ing and -ed, and common tricky words (Phase 6) | phonics and spelling | core | پایه هفتم، Prospect 1 (املا) | `build` in `english-sapling-16`, `english-sapling-33`, `english-sapling-54` |
| `english.sap.4` | Can read a short text (50–100 words) aloud accurately and answer questions on it (A1) | reading | core | — | `passage` in `english-sapling-7`, `english-sapling-48` |
| `english.sap.5` | Can read simple stories and short information texts and find a detail (A1) | reading | core | — | `passage` in `english-sapling-28`, `english-sapling-47` |
| `english.sap.6` | Can write a sentence with a capital letter, spaces, a full stop or question mark, and join two ideas with and (A1) | writing | core | پایه هفتم، Prospect 1، درس ۱ (حرف بزرگ اسم‌ها) | `order` and `paper` in `english-sapling-8`, `english-sapling-22` |
| `english.sap.7` | Can write 3–5 sentences about myself, a picture or a friend, and a short card (A1) | writing | full | پایه هفتم، Prospect 1 | `paper` in `english-sapling-50`, `english-sapling-51` |
| `english.sap.8` | Can understand and use about 500 more words: home, town, jobs, weather, health, sports and hobbies, time (Movers themes) (A1) | vocabulary | core | پایه هفتم و هشتم، Prospect 1 و 2 | `listen` in each theme lesson; `english-sapling-59` |
| `english.sap.9` | Can use *be* (I'm, he's, they're), its negatives and questions, and *have got* (A1) | grammar | core | پایه هفتم، Prospect 1، درس ۲ و ۵ | `order` in `english-sapling-9`, `english-sapling-10` |
| `english.sap.10` | Can use the present simple for routines and likes: I play, she plays, Do you …? Does he …? (A1) | grammar | core | پایه هشتم، Prospect 2، درس ۲ | `sort` and `order` in `english-sapling-26`, `english-sapling-27` |
| `english.sap.11` | Can use the present continuous for what is happening now: What are you doing? I'm reading. (A1) | grammar | full | پایه هفتم، Prospect 1، درس ۶ | `listen` in `english-sapling-31`, `english-sapling-32` |
| `english.sap.12` | Can use can and can't, instructions and Let's … (A1) | grammar | core | پایه هشتم، Prospect 2، درس ۳ | `listen` in `english-sapling-34`, `english-sapling-35` |
| `english.sap.13` | Can use there is / there are, in/on/under/next to/behind, plurals, a/an/some, and my/your/his/her/'s (A1) | grammar | core | پایه هفتم، Prospect 1، درس ۴ و ۶ | `listen` and `order` in `english-sapling-6`, `english-sapling-17`, `english-sapling-36` |
| `english.sap.14` | Can ask and answer about myself, my family and my things in a short exchange (name, age, where from, likes) (A1) | speaking | core | پایه هفتم، Prospect 1، درس ۱–۴؛ پایه هشتم، Prospect 2، درس ۱ | `listen` in `english-sapling-2`, `english-sapling-52`, `english-sapling-53` |
| `english.sap.15` | Can understand short dialogues and descriptions on familiar topics spoken slowly and clearly (A1) | listening | core | — | `listen` in `english-sapling-46`, `english-sapling-60` |
| `english.sap.16` | Can tell the time (o'clock, half past) and say days, months and my birthday (A1) | vocabulary | core | پایه هفتم، Prospect 1، درس ۳؛ پایه هشتم، Prospect 2، درس ۲ | `listen` with clocks in `english-sapling-23`, `english-sapling-24` |
| `english.sap.17` | Can use polite everyday phrases in short role plays: in a shop, meeting someone, saying sorry (A1) | speaking | full | پایه هفتم، Prospect 1، درس ۲ | `listen` in `english-sapling-3`, `english-sapling-44` |
| `english.sap.18` | Can describe what people look like (tall, short, long hair, glasses) (A1) | vocabulary | full | پایه هفتم، Prospect 1، درس ۵ | `pairs` in `english-sapling-37` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `english-sapling-1` | I can see | Reading and building "I can see a …" | animation, lesson (`listen`), game (`order`, `pairs`), parent tip | english.sap.4, english.sap.12 | core |
| ✅ | `english-sapling-2` | سؤال و جواب | What is this? It is a … | animation, lesson (`listen`), game (`order`), parent tip | english.sap.14, english.sap.9 | core |
| 🔨 | `english-sapling-9` | I am, you are | I'm Sara. He's my brother. She's eight. They're my friends. Short forms | animation, lesson (`listen`), game (`order`, `sort`), parent tip | english.sap.9 | core |
| 🔨 | `english-sapling-10` | Is he? Yes, he is. | Questions and no with be: Is it a cat? No, it isn't. I'm not tired. | animation, lesson (`listen`), game (`order`), parent tip | english.sap.9, english.sap.14 | core |
| ✅ | `english-sapling-3` | جمله‌های هر روز | Everyday phrases | animation, lesson (`words`, `listen`), game (`order`), parent tip | english.sap.17, english.sap.14 | core |
| 🔨 | `english-sapling-11` | ay و a-e | day, play, say; cake, name, game (the e at the end changes the a) | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.sap.1 | core |
| 🔨 | `english-sapling-12` | ie و i-e | pie, tie; bike, time, five (and igh: light) | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.sap.1 | core |
| ✅ | `english-sapling-4` | دوست دارم | I like … / I don't like …: hear, show with a face, read and sort sentences, build them | animation, lesson (`words`, `listen`), game (`sort`, `order`), parent tip | english.sap.10 | core |
| 🔨 | `english-sapling-13` | Do you like? | Do you like …? Yes, I do. He likes … She doesn't like … | animation, lesson (`listen`), game (`sort`, `order`), parent tip | english.sap.10, english.sap.14 | core |
| 🔨 | `english-sapling-14` | o-e و ow | home, rope, nose; snow, slow, yellow | lesson (`letter`, `listen`), game (`sort`, `build`), parent tip | english.sap.1 | core |
| 🔨 | `english-sapling-15` | u-e، ew، ue | cube, tube; new, few; blue, glue | lesson (`letter`, `listen`), game (`sort`), parent tip | english.sap.1 | core |
| ✅ | `english-sapling-5` | یکی، چندتا | Plural -s: one cat, two cats; hear it, read it, sort one / many | lesson (`words`, `listen`), game (`sort`, `pairs`), parent tip | english.sap.13, english.sap.3 | core |
| 🔨 | `english-sapling-16` | -es و -ies | boxes, buses, babies; and children, feet, mice, men | lesson (`listen`), game (`sort`, `build`), parent tip | english.sap.3 | core |
| ✅ | `english-sapling-6` | کجاست؟ | in, on, under, next to, shown with pictures of where things are; hear it, then read the sentence | animation, lesson (`words`, `listen`), parent tip | english.sap.13 | core |
| 🔨 | `english-sapling-17` | There is، there are | There's a cat under the bed. There are two books. Is there …? How many … are there? | animation, lesson (`listen`), game (`order`), parent tip | english.sap.13, english.sap.8 | core |
| 🔨 | `english-sapling-18` | خانه ما | upstairs, downstairs, kitchen, sofa, shower, garden; Where's Mum? She's in the kitchen. | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.15 | core |
| ✅ | `english-sapling-7` | قصه کوتاه | A short story heard first, then read with questions (Sara's dog and ball); a second one read alone (Reza's cat) | animation, story (`passage`), parent tip | english.sap.4, english.sap.5 | core |
| 🔨 | `english-sapling-19` | ea، ee، ey | sea, leaf, read; tree; key; and ea in bread | lesson (`letter`, `listen`), game (`sort`), parent tip | english.sap.1, english.sap.2 | core |
| 🔨 | `english-sapling-20` | ou، ow، oy، oi، aw | out, house; cow; boy, toy; coin; saw, draw | lesson (`letter`, `listen`), game (`sort`), parent tip | english.sap.1 | full |
| 🔨 | `english-sapling-21` | ir، ur، er، wh، ph | bird, girl; nurse; her; when, white; phone | lesson (`letter`, `listen`), game (`sort`), parent tip | english.sap.1 | full |
| ✅ | `english-sapling-8` | نوشتن جمله | Writing a short sentence: capital letter, spaces between words, full stop; copy one, then write their own on paper | lesson (`listen`), game (`order`), `paper`, parent tip | english.sap.6 | core |
| 🔨 | `english-sapling-22` | نقطه و علامت سؤال | Full stop or question mark? Capital letters for names and I; join with and | game (`sort`, `order`), lesson (`listen`), `paper`, parent tip | english.sap.6 | core |
| 🔨 | `english-sapling-23` | ساعت چند است؟ | o'clock and half past; What time is it? It's seven o'clock. | animation, lesson (`listen`, `clock`), parent tip | english.sap.16 | core |
| 🔨 | `english-sapling-24` | روزهای هفته | Monday to Sunday; Today is …; On Friday I … | animation, lesson (`words`, `listen`), game (`order`), parent tip | english.sap.16, english.sap.10 | core |
| 🔨 | `english-sapling-25` | ماه‌ها و تولد | January to December; When's your birthday? It's in May. | lesson (`words`, `listen`), game (`order`), parent tip | english.sap.16 | full |
| 🔨 | `english-sapling-26` | روز من | I get up, I have breakfast, I go to school, I go to bed (present simple) | animation, lesson (`listen`), game (`order`), parent tip | english.sap.10, english.sap.8 | core |
| 🔨 | `english-sapling-27` | روز او | She gets up at seven. He goes to school. Does he …? | animation, lesson (`listen`), game (`sort`, `order`), parent tip | english.sap.10 | core |
| 🔨 | `english-sapling-28` | قصه: روز رضا | A story about a day, read with questions | story (`passage`), parent tip | english.sap.5, english.sap.4 | core |
| 🔨 | `english-sapling-29` | بازی هر روز | Put a day in order; sort I play / she plays | game (`order`, `sort`), parent tip | english.sap.10 | core |
| 🔨 | `english-sapling-30` | یک حرف، دو صدا | c in cat and city, g in goat and giraffe, y in yes, my and happy | lesson (`listen`), game (`sort`), parent tip | english.sap.2 | full |
| 🔨 | `english-sapling-31` | الان چه می‌کنی؟ | I'm reading. What are you doing? She's eating. | animation, lesson (`listen`), game (`order`), parent tip | english.sap.11 | full |
| 🔨 | `english-sapling-32` | در پارک | A busy park picture: what are they doing? Listen and find the person | animation, lesson (`listen`), parent tip | english.sap.11, english.sap.15 | full |
| 🔨 | `english-sapling-33` | -ing و -ed | run → running, make → making, play → played, hop → hopped | lesson (`listen`), game (`sort`, `build`), parent tip | english.sap.3 | full |
| 🔨 | `english-sapling-34` | توانایی‌ها | Can you swim? I can ride a bike. He can't whistle. | animation, lesson (`listen`), game (`sort`), parent tip | english.sap.12, english.sap.14 | core |
| 🔨 | `english-sapling-35` | این کار را بکن | Open the door. Don't run. Let's play! | animation, lesson (`listen`), parent tip | english.sap.12, english.sap.15 | core |
| 🔨 | `english-sapling-36` | مال کیست؟ | my, your, his, her, our, their; Sara's bag; Whose is this? | animation, lesson (`listen`), game (`pairs`), parent tip | english.sap.13 | core |
| 🔨 | `english-sapling-37` | چه شکلی است؟ | tall, short, long hair, curly hair, glasses, beard; She's tall and she's got long hair. | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.sap.18, english.sap.9 | full |
| 🔨 | `english-sapling-38` | a، an، some | a banana, an egg, some milk, some bread | lesson (`listen`), game (`sort`), parent tip | english.sap.13 | full |
| 🔨 | `english-sapling-39` | در شهر | shop, park, hospital, library, bus stop; Where's the park? It's next to the school. | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.13 | core |
| 🔨 | `english-sapling-40` | شغل‌ها | teacher, doctor, farmer, driver, nurse, cook; What does she do? She's a nurse. | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.10 | core |
| 🔨 | `english-sapling-41` | هوا و فصل‌ها | spring, summer, autumn, winter; It's hot in summer. | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.9 | core |
| 🔨 | `english-sapling-42` | حالم خوب نیست | What's the matter? I've got a headache, a cold, a stomachache | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.14 | full |
| 🔨 | `english-sapling-43` | ورزش و سرگرمی | football, swimming, painting, reading; I like playing football. | animation, lesson (`words`, `listen`), parent tip | english.sap.8, english.sap.10 | full |
| 🔨 | `english-sapling-44` | در مغازه | Can I have …, please? How much is it? Here you are. Thank you. | animation, lesson (`listen`), game (`order`), parent tip | english.sap.17, english.sap.15 | full |
| 🔨 | `english-sapling-45` | بازی کلمه‌های نهال | Words of the Sapling themes | game (`pairs`, `sort`), parent tip | english.sap.8 | core |
| 🔨 | `english-sapling-46` | گفت‌وگو را گوش کن | Short dialogues; choose the picture that matches (Movers listening style) | lesson (`listen`), parent tip | english.sap.15 | core |
| 🔨 | `english-sapling-47` | متن اطلاعاتی | A short fact text (camels, our school); find the detail | story (`passage`), parent tip | english.sap.5 | full |
| 🔨 | `english-sapling-48` | قصه: کلاه گم‌شده | A longer story (about 100 words) with questions | animation, story (`passage`), parent tip | english.sap.4, english.sap.5 | core |
| 🔨 | `english-sapling-49` | روان بخوان | Read a passage aloud twice; the parent marks the hard words; a question on each | story (`readaloud` in English, `passage`), parent tip | english.sap.4 | full |
| 🔨 | `english-sapling-50` | درباره من بنویس | Write 3–4 sentences about myself from a model (name, age, family, likes) | game (`order`), `paper`, parent tip | english.sap.7, english.sap.6 | full |
| 🔨 | `english-sapling-51` | درباره تصویر بنویس | There is … The boy is … Three sentences about a picture | lesson (`listen`), `paper`, parent tip | english.sap.7 | full |
| 🔨 | `english-sapling-52` | کلمه‌های پرسشی | Who, what, where, when, how many, how old; answer with a whole sentence | animation, lesson (`listen`), game (`pairs`), parent tip | english.sap.14 | core |
| 🔨 | `english-sapling-53` | آشنا شدن | This is my friend. Nice to meet you. Where are you from? I'm from Iran. | animation, lesson (`listen`), game (`order`), parent tip | english.sap.14, english.sap.17 | core |
| 🔨 | `english-sapling-54` | دیکته جمله | Hear a sentence, build it, then write it on paper | game (`order`, `build` with `hidden`), `paper`, parent tip | english.sap.6, english.sap.3 | core |
| 🔨 | `english-sapling-55` | کلمه‌های سخت‌نویس | because, friend, school, people, could, would, laugh | game (`build`, `pairs`), parent tip | english.sap.3 | full |
| 🔨 | `english-sapling-56` | کارت تولد | Dear …, Happy birthday! Love, …; write a card on paper | lesson (`listen`), `paper`, parent tip | english.sap.7 | full |
| 🔨 | `english-sapling-57` | قصه شنیدنی | A longer story heard (Reza's dog runs off and comes back); put the pictures in order and answer | animation, game (`order`), lesson (`listen`), parent tip | english.sap.15 | full |
| 🔨 | `english-sapling-58` | بازی جمله‌سازی | Build sentences from word cards: who, does what, where | game (`order`), parent tip | english.sap.9, english.sap.10, english.sap.6 | core |
| 🔨 | `english-sapling-59` | بازی بزرگ نهال | Garden game: words and sentences of the Sapling garden | game (`pairs`, `sort`, `order`), parent tip | english.sap.8, english.sap.13 | core |
| 🔨 | `english-sapling-60` | ببین چه بلدی | End of the garden: read a short text, listen to dialogues, answer questions (Movers style); a note for the parent | lesson (`listen`), story (`passage`), parent tip | english.sap.4, english.sap.15, english.sap.14 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `english-sapling-p1` | Spelling sorter | Words tagged by sound and spelling (ai/ay/a-e …): sort them, read them, build them | english.sap.1, english.sap.2 |
| 🔨 | `english-sapling-p2` | Word endings | -s/-es/-ies, -ing, -ed from a verb and noun list, with the spelling rules | english.sap.3 |
| 🔨 | `english-sapling-p3` | Sentence builder | Sentences from frames (be, have got, present simple, present continuous, can, there is) and the word bank, to put in order, make negative or make a question | english.sap.6, english.sap.9, english.sap.10, english.sap.11, english.sap.12, english.sap.13 |
| 🔨 | `english-sapling-p4` | Story bank | Short graded stories and fact texts (50–100 words) with questions, using only taught spellings and words | english.sap.4, english.sap.5 |
| 🔨 | `english-sapling-p5` | Word bank (Movers) | Picture + audio for every Sapling word by theme | english.sap.8, english.sap.18 |
| 🔨 | `english-sapling-p6` | Clocks and calendars | Times (o'clock, half past), days and months to hear and match | english.sap.16 |
| 🔨 | `english-sapling-p7` | Dialogue bank | Short dialogues heard, with a picture or answer to choose | english.sap.14, english.sap.15, english.sap.17 |
| 🔨 | `english-sapling-p8` | Questions and answers | A question heard (What's your name? How old …? Where …? What time …? Do you …? Is she …? Can he …?): choose the answer that fits | english.sap.14, english.sap.9, english.sap.10 |
| 🔨 | `english-sapling-p9` | Spell it | A picture and its word said: build it from letter tiles, with a tile that does not belong (`build`), words of the spellings and endings taught | english.sap.3, english.sap.1 |
| 🔨 | `english-sapling-p10` | Find the mistake | Three sentences, one with a mistake (capital letter, full stop, a/an, is/are, plural, word order): which one is wrong? | english.sap.6, english.sap.9, english.sap.13 |

### 🌳 درخت — `tree`

Longer texts, the past and the future, comparisons and paragraphs; Flyers vocabulary and grammar. A child who
finishes Tree starts school English (grade 7) at about A2.
**3 years × 36 weeks × 4 sessions of 20 minutes = 432 sessions: 90 lessons and 342 practice sessions.** The rows
below are the units' first lessons (one or more per objective); the rest of the 90 are added unit by unit before the
garden is built (each unit: teaching lessons, a game, and a story or animation where it helps).

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `english.tree.1` | Can understand the main points of short clear talk on familiar topics: instructions, announcements, a story (A2) | listening | core | — | `listen` in `english-tree-24`, `english-tree-36` |
| `english.tree.2` | Can take part in short conversations about routines, free time, last weekend and plans (A2) | speaking | core | پایه هشتم، Prospect 2، درس ۲ و ۷ | `listen` and `dialogue` in `english-tree-35` |
| `english.tree.3` | Can describe people, places, animals and pictures in a few sentences (A2) | speaking | core | پایه هشتم، Prospect 2، درس ۵ | `record` and parent tip in `english-tree-5`, `english-tree-34` |
| `english.tree.4` | Can tell a short story from pictures with first, then, after that, finally (A2) | speaking | full | — | `record` in `english-tree-11` |
| `english.tree.5` | Can read stories and information texts of 150–250 words and find the main idea and details (A2) | reading | core | — | `passage` in `english-tree-4`, `english-tree-27` |
| `english.tree.6` | Reads graded stories alone for pleasure, a little every week (A2) | reading | full | — | reading log in `english-tree-28` |
| `english.tree.7` | Can guess a new word from the sentence and the picture, and use titles and pictures to know what a text is about (A2) | reading | full | — | `choose` in `english-tree-26` |
| `english.tree.8` | Can write a paragraph of 5–8 sentences joined with and, but, because, then (A2) | writing | core | — | `paper` in `english-tree-6`, `english-tree-30` |
| `english.tree.9` | Can write a postcard, message or short email (A2) | writing | full | پایه هفتم، Prospect 1، درس ۷ | `paper` in `english-tree-29` |
| `english.tree.10` | Can spell common words with suffixes (-ful, -ly, -er, -est) and tell homophones apart (there/their, to/two) | phonics and spelling | full | — | `build` and `sort` in `english-tree-31` |
| `english.tree.11` | Can understand and use about 700 more words: nature and materials, travel and countries, school subjects, dates (Flyers themes) (A2) | vocabulary | core | پایه هشتم و نهم، Prospect 2 و 3 | `listen` and `pairs` in `english-tree-2`, `english-tree-21`, `english-tree-23` |
| `english.tree.12` | Can use the present simple and continuous and say how often (always, usually, sometimes, never) (A2) | grammar | core | پایه نهم، Prospect 3، درس ۲ و ۳ | `sort` in `english-tree-1`, `english-tree-3` |
| `english.tree.13` | Can use the past simple: was/were, regular and common irregular verbs, questions and negatives (A2) | grammar | core | پایه نهم، Prospect 3، درس ۵ و ۶ | `sort` and `order` in `english-tree-7` to `english-tree-10` |
| `english.tree.14` | Can talk about the future with going to and will (A2) | grammar | core | پایه هفتم، Prospect 1، درس ۷ | `order` in `english-tree-15`, `english-tree-16` |
| `english.tree.15` | Can compare with -er/-est and more/most, and use adverbs (quickly, well) (A2) | grammar | core | — | `sort` in `english-tree-12`, `english-tree-14` |
| `english.tree.16` | Can use must, mustn't, have to and should for rules and advice (A2) | grammar | full | پایه هشتم، Prospect 2، درس ۴ | `sort` in `english-tree-17` |
| `english.tree.17` | Can use some/any, much/many, a lot of, and countable and uncountable nouns (A2) | grammar | full | پایه هشتم، Prospect 2، درس ۵ | `sort` in `english-tree-18` |
| `english.tree.18` | Can use object and possessive pronouns (me, mine), and why, which, whose, how often (A2) | grammar | core | پایه نهم، Prospect 3، درس ۴ و ۶ | `pairs` in `english-tree-19`, `english-tree-20` |
| `english.tree.19` | Can build words (compounds, un-, -er) and find a word in a dictionary by alphabetical order | vocabulary | full | — | `build` and `order` in `english-tree-32` |
| `english.tree.20` | Can put the stress in the right place in a word, say -ed endings right, and let the voice go up for yes/no questions | speaking | full | — | `listen` and `record` in `english-tree-8`, `english-tree-33` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| 🔨 | `english-tree-1` | هر روز | Present simple: daily routines; always, usually, sometimes, never | animation, lesson (`listen`), game (`order`, `sort`), parent tip | english.tree.12 | core |
| 🔨 | `english-tree-2` | تاریخ و برنامه | Dates (the third of May), ordinals, quarter past and to, a school timetable | lesson (`listen`, `clock`), game (`order`, `pairs`), parent tip | english.tree.11 | core |
| 🔨 | `english-tree-3` | الان چه می‌کنی؟ | Present continuous next to the present simple: now or every day? | animation, lesson (`listen`, `choose`), game (`sort`), parent tip | english.tree.12 | core |
| 🔨 | `english-tree-4` | قصه‌های کوتاه | Reading short stories (150 words) with questions | story (`passage`), animation (`scene` + question), parent tip | english.tree.5 | core |
| 🔨 | `english-tree-5` | توصیف کن | Adjectives: big, small, happy, tall, old, beautiful; describing a picture aloud | animation, lesson (`words`, `listen`, `record`), game (`sort`), parent tip | english.tree.3 | core |
| 🔨 | `english-tree-6` | بنویس چه می‌بینی | Writing three to five sentences about a picture | lesson (`listen`), `paper`, parent tip | english.tree.8 | core |
| 🔨 | `english-tree-7` | دیروز | was and were: I was at home. Were you happy? | animation, lesson (`listen`), game (`sort`), parent tip | english.tree.13 | core |
| 🔨 | `english-tree-8` | دیروز چه کردی؟ | Regular past -ed and its three sounds: walked, played, wanted | lesson (`listen`), game (`sort`), parent tip | english.tree.13, english.tree.20 | core |
| 🔨 | `english-tree-9` | فعل‌های بی‌قاعده | went, saw, ate, had, came, made, took, got | animation, game (`pairs`, `sort`), parent tip | english.tree.13 | core |
| 🔨 | `english-tree-10` | Did you …? | Past questions and negatives: Did you go? I didn't see it. | animation, lesson (`listen`), game (`order`), parent tip | english.tree.13 | core |
| 🔨 | `english-tree-11` | قصه بگو | Tell a story from four pictures: first, then, after that, finally | animation, game (`order`), lesson (`record`), parent tip | english.tree.4 | full |
| 🔨 | `english-tree-12` | بزرگ‌تر، بزرگ‌ترین | taller, the tallest, more beautiful, the best | animation, lesson (`listen`), game (`sort`, `order`), parent tip | english.tree.15 | core |
| 🔨 | `english-tree-13` | کدام تندتر است؟ | Compare animals and places in a short text: Which is faster, a horse or a camel? | story (`passage`), game (`sort`), parent tip | english.tree.15, english.tree.5 | full |
| 🔨 | `english-tree-14` | تند و آهسته | Adverbs: quickly, slowly, carefully, well | animation, lesson (`listen`), game (`sort`), parent tip | english.tree.15 | full |
| 🔨 | `english-tree-15` | برنامه‌های من | going to: I'm going to visit my grandma. What are you going to do? | animation, lesson (`listen`), game (`order`), parent tip | english.tree.14 | core |
| 🔨 | `english-tree-16` | فکر می‌کنم … | will for guesses and offers: It will rain. I'll help you. | animation, lesson (`listen`), game (`sort`), parent tip | english.tree.14 | full |
| 🔨 | `english-tree-17` | باید و نباید | must, mustn't, have to, should: rules at the pool, advice for a cold | animation, lesson (`listen`), game (`sort`), parent tip | english.tree.16 | full |
| 🔨 | `english-tree-18` | چقدر؟ چندتا؟ | some/any, much/many, a lot of: a shopping list and a kitchen | lesson (`listen`), game (`sort`), parent tip | english.tree.17 | full |
| 🔨 | `english-tree-19` | مال من، مال تو | me, him, her, us, them; mine, yours; Whose is it? | lesson (`listen`), game (`pairs`), parent tip | english.tree.18 | core |
| 🔨 | `english-tree-20` | چرا؟ چون … | why and because, which, how often; joining two sentences | animation, lesson (`listen`), game (`order`), parent tip | english.tree.18, english.tree.8 | core |
| 🔨 | `english-tree-21` | دنیای اطراف | Nature and materials: forest, desert, river; made of wood, metal, glass | animation, lesson (`words`, `listen`), game (`sort`), parent tip | english.tree.11 | core |
| 🔨 | `english-tree-22` | سفر | airport, station, ticket, map; countries and nationalities | animation, lesson (`words`, `listen`), game (`pairs`), parent tip | english.tree.11, english.tree.2 | full |
| 🔨 | `english-tree-23` | درس‌های مدرسه | maths, science, art, history; What's your favourite subject? | lesson (`words`, `listen`), game (`pairs`), parent tip | english.tree.11, english.tree.2 | core |
| 🔨 | `english-tree-24` | گوش کن: پیام‌ها | Announcements and instructions: catch the time, the number, the spelled name | lesson (`listen`), parent tip | english.tree.1 | core |
| 🔨 | `english-tree-25` | گوش کن: قصه | A longer story heard; what happened first, why | animation, lesson (`listen`), game (`order`), parent tip | english.tree.1 | full |
| 🔨 | `english-tree-26` | معنی را حدس بزن | Guess a new word from the sentence and the picture; what is this text about? | lesson (`choose`), story (`passage`), parent tip | english.tree.7 | full |
| 🔨 | `english-tree-27` | متن اطلاعاتی | A fact text (200 words): the main idea and three details | story (`passage`), parent tip | english.tree.5, english.tree.7 | core |
| 🔨 | `english-tree-28` | قفسه کتاب | Reading graded stories alone from the story bank, and a reading log for the parent | story (`passage`), parent tip | english.tree.6 | full |
| 🔨 | `english-tree-29` | کارت‌پستال و ایمیل | Write a postcard and a short email: greeting, three things, ending | lesson (`listen`), `paper`, parent tip | english.tree.9 | full |
| 🔨 | `english-tree-30` | پاراگراف من | A paragraph of 5–8 sentences with and, but, because, then; plan, write, check | game (`order`), lesson (`listen`), `paper`, parent tip | english.tree.8 | core |
| 🔨 | `english-tree-31` | پسوندها و هم‌آواها | -ful, -ly, -er, -est spelling; there/their, to/two, see/sea | game (`build`, `sort`), parent tip | english.tree.10 | full |
| 🔨 | `english-tree-32` | کلمه‌سازی و فرهنگ لغت | football, bedroom; unhappy; teacher; alphabetical order in a dictionary | game (`build`, `order`), parent tip | english.tree.19 | full |
| 🔨 | `english-tree-33` | تکیه و آهنگ | Word stress (TEAcher, comPUter), questions going up | lesson (`listen`, `record`), parent tip | english.tree.20 | full |
| 🔨 | `english-tree-34` | شهر من | Describe a place: what it is like, what it is famous for, there is / there are | animation, lesson (`listen`, `record`), parent tip | english.tree.3, english.tree.11 | core |
| 🔨 | `english-tree-35` | آخر هفته | What did you do at the weekend? What are you going to do? A conversation | animation, lesson (`listen`, `dialogue`), parent tip | english.tree.2, english.tree.13, english.tree.14 | core |
| 🔨 | `english-tree-36` | ببین چه بلدی | End of the garden: read, listen and write (Flyers style); a note for the parent | lesson (`listen`), story (`passage`), `paper`, parent tip | english.tree.1, english.tree.5 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `english-tree-p1` | Story bank (A2) | Graded stories and fact texts of 150–250 words, with questions on the main idea, details and new words | english.tree.5, english.tree.6, english.tree.7 |
| ⬜ | `english-tree-p2` | Verb forms | -s, -ing, past (regular and irregular), going to and will forms of the verbs taught | english.tree.12, english.tree.13, english.tree.14 |
| ⬜ | `english-tree-p3` | Sentence changer | Make it negative, make it a question, put it in the past, compare | english.tree.13, english.tree.15, english.tree.18 |
| ⬜ | `english-tree-p4` | Word bank (Flyers) | Picture + audio + spelling for every Tree word by theme, with spaced review | english.tree.11, english.tree.10 |
| ⬜ | `english-tree-p5` | Listening bank | Short announcements, dialogues and stories with questions | english.tree.1, english.tree.2 |
| ⬜ | `english-tree-p6` | Writing prompts | A picture or a situation, a model and a checklist (`paper`) | english.tree.8, english.tree.9 |

### 🌲 جنگل — `forest`

A2 for everyone and B1 at full depth, following the topics, functions and grammar of Cambridge *A2 Key* and *B1
Preliminary for Schools* and the CEFR. These cover everything in Prospect 1–3 (grades 7–9); the School column shows
the matching Prospect lesson for «همراه مدرسه», and Iranian festivals (Prospect 3, lesson 3) are added as `full`.
**3 years × 36 weeks × 4 sessions of 25 minutes = 432 sessions: 90 lessons and 342 practice sessions.** As in Tree,
the rows below are the units' first lessons; the rest are added unit by unit before the garden is built.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `english.for.1` | Personal identification: can introduce myself and others, greet, spell names and say where people are from (A2) | speaking | core | پایه هفتم، Prospect 1، درس ۱ و ۲؛ پایه هشتم، Prospect 2، درس ۱ | `dialogue` in `english-forest-5` |
| `english.for.2` | Family, friends and work: can talk and write about age, birthday, family, jobs and what people look like (A2) | speaking | core | پایه هفتم، Prospect 1، درس ۳، ۴ و ۵ | `listen` and `paper` in `english-forest-4`, `english-forest-6` |
| `english.for.3` | House and home, places and buildings: can describe my home, give an address, phone number and email, and give and follow directions (A2) | speaking | core | پایه هفتم، Prospect 1، درس ۶ و ۷ | `listen` in `english-forest-2`, `english-forest-7` |
| `english.for.4` | Food and drink, shopping: can say what I like, order and buy, and make and answer suggestions: How about …? Let's … Would you like …? (A2) | speaking | core | پایه هفتم، Prospect 1، درس ۸ | `dialogue` in `english-forest-8` |
| `english.for.5` | Daily life, abilities, health: can talk about my week and what I can do, and about feeling ill, with advice (should, Why don't you …?) (A2) | speaking | core | پایه هشتم، Prospect 2، درس ۲، ۳ و ۴ | `listen` in `english-forest-9`, `english-forest-10` |
| `english.for.6` | Places, the natural world, weather, free time: can describe a town or village and its weather, and talk about hobbies and sport (like + -ing) (A2) | speaking | core | پایه هشتم، Prospect 2، درس ۵، ۶ و ۷ | `record` in `english-forest-11`, `english-forest-12` |
| `english.for.7` | Personal feelings and character: can describe what people are like (shy, brave, kind, hard-working) and compare them (A2) | vocabulary | core | پایه نهم، Prospect 3، درس ۱ | `sort` in `english-forest-13` |
| `english.for.8` | Travel and holidays, transport: can plan a journey, buy a ticket and tell about a trip (A2) | speaking | core | پایه نهم، Prospect 3، درس ۲ | `passage` in `english-forest-14` |
| `english.for.9` | Services, media and communication, health and injuries: can ask for help at a bank, post office or clinic, talk about news and the internet, and say what hurts (A2; B1 at full depth) | vocabulary | full | پایه نهم، Prospect 3، درس ۴، ۵ و ۶ | `listen` in `english-forest-16` to `english-forest-18` |
| `english.for.10` | Can tell a past event with the past simple and the past continuous (when, while) (B1) | grammar | full | — | `order` in `english-forest-19` |
| `english.for.11` | Can use the present perfect for experiences and recent events (ever, never, just, yet, already) (B1) | grammar | full | — | `sort` in `english-forest-20`, `english-forest-21` |
| `english.for.12` | Can understand and use the passive (present and past) and the first conditional (B1) | grammar | full | — | `sort` in `english-forest-22`, `english-forest-23` |
| `english.for.13` | Can use who, which and that to join ideas, and although, so, however (B1) | grammar | full | — | `order` in `english-forest-24` |
| `english.for.14` | Can use the past simple of regular and irregular verbs and object pronouns accurately (A2) | grammar | core | پایه نهم، Prospect 3، درس ۵ و ۶ | `sort` in `english-forest-1` |
| `english.for.15` | Can use be, there is/are, the present simple and continuous, frequency words and wh-questions accurately (A2) | grammar | core | پایه نهم، Prospect 3، درس ۱ تا ۴ | `sort` and `order` in `english-forest-9` |
| `english.for.16` | Can understand the main points of clear speech on familiar topics: longer dialogues, a short radio-style talk (A2; B1 at full depth) | listening | core | — | `listen` in `english-forest-25`, `english-forest-34` |
| `english.for.17` | Can read texts of 300–600 words (stories, articles, messages) for the main idea, details and what the writer means (A2; B1 at full depth) | reading | core | — | `passage` in `english-forest-3`, `english-forest-34` |
| `english.for.18` | Reads a short graded book alone over a few weeks (B1) | reading | full | — | reading log in `english-forest-26` |
| `english.for.19` | Can write connected texts of 80–120 words (an email, a description, about myself), plan them and check them (A2) | writing | core | پایه هفتم تا نهم، Prospect 1–3 (Writing) | `paper` in `english-forest-4`, `english-forest-27` |
| `english.for.20` | Can write a short story or an opinion paragraph with linking words (B1) | writing | full | — | `paper` in `english-forest-28`, `english-forest-29` |
| `english.for.21` | Can use a dictionary for meaning, word class and stress, and keep a vocabulary notebook | vocabulary | full | — | `english-forest-32` |
| `english.for.22` | Can take part in a longer conversation: agree, disagree, give reasons, ask someone to repeat or explain (B1) | speaking | full | — | `dialogue` in `english-forest-30` |
| `english.for.23` | Can give a short prepared talk (1–2 minutes) from notes (A2; B1 at full depth) | speaking | full | — | `record` in `english-forest-31` |
| `english.for.24` | Can understand and use about 1,000 more words (Key and Preliminary for Schools topics), with word families (A2; B1 at full depth) | vocabulary | core | پایه هفتم تا نهم، Prospect 1–3 | `pairs` in `english-forest-33` |
| `english.for.25` | Can talk and write about festivals and ceremonies in Iran (Nowruz, Yalda, Mehregan) and compare them with festivals elsewhere; added from Prospect (A2) | speaking | full | پایه نهم، Prospect 3، درس ۳ | `passage` and `paper` in `english-forest-15` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| 🔨 | `english-forest-5` | آشنایی | Introducing yourself and others, spelling names, nationalities | animation, lesson (`listen`, `dialogue`), parent tip | english.for.1 | core |
| 🔨 | `english-forest-6` | خانواده و ظاهر | Age, birthdays, family, jobs, appearance | animation, lesson (`listen`), game (`pairs`), parent tip | english.for.2 | core |
| 🔨 | `english-forest-4` | درباره من | Writing a short paragraph about yourself | game (`order`), `paper`, parent tip | english.for.2, english.for.19 | core |
| 🔨 | `english-forest-7` | خانه و نشانی | My house, address, phone number, email | animation, lesson (`listen`), parent tip | english.for.3 | core |
| 🔨 | `english-forest-2` | گفت‌وگو | Everyday dialogues: shop, directions, introducing yourself | animation, lesson (`listen`, `choose`), parent tip | english.for.3, english.for.1 | core |
| 🔨 | `english-forest-8` | غذای محبوب | Favourite food; How about …? Let's … Would you like …? | animation, lesson (`listen`, `dialogue`), parent tip | english.for.4 | core |
| 🔨 | `english-forest-9` | هفته من | Routines, frequency words, wh-questions | animation, lesson (`listen`), game (`sort`, `order`), parent tip | english.for.5, english.for.15 | core |
| 🔨 | `english-forest-10` | توانایی و سلامت | can, be good at; What's wrong? You should … Why don't you …? | animation, lesson (`listen`), parent tip | english.for.5 | core |
| 🔨 | `english-forest-11` | شهر و روستا | What's it like? It's famous for … There are many … | animation, lesson (`listen`, `record`), parent tip | english.for.6 | core |
| 🔨 | `english-forest-12` | هوا و سرگرمی | The weather; I like reading. What do you do in your free time? | animation, lesson (`listen`, `record`), parent tip | english.for.6 | core |
| 🔨 | `english-forest-13` | شخصیت | Personality words and comparing people | animation, lesson (`listen`), game (`sort`), parent tip | english.for.7 | core |
| 🔨 | `english-forest-14` | سفر | A journey: plans, tickets, what happened | animation, story (`passage`), parent tip | english.for.8 | core |
| 🔨 | `english-forest-1` | دیروز | Past simple | story (`passage`), game (`sort`), parent tip | english.for.14 | core |
| 🔨 | `english-forest-15` | جشن‌ها | Nowruz, Yalda, Mehregan and festivals elsewhere; a text and a short description in the past simple | animation, story (`passage`), `paper`, parent tip | english.for.25, english.for.14 | full |
| 🔨 | `english-forest-16` | خدمات | Bank, post office, hospital, asking for help politely | animation, lesson (`listen`), parent tip | english.for.9 | full |
| 🔨 | `english-forest-17` | رسانه | News, TV, radio, the internet; what is true? | lesson (`listen`), story (`passage`), parent tip | english.for.9 | full |
| 🔨 | `english-forest-18` | سلامت و آسیب | Injuries and first aid words; I cut my finger | animation, lesson (`listen`), parent tip | english.for.9 | full |
| 🔨 | `english-forest-3` | متن بلندتر | Longer texts, main idea | story (`passage`), parent tip | english.for.17 | core |
| 🔨 | `english-forest-19` | داشتم می‌رفتم که … | Past continuous with when and while | animation, story (`passage`), game (`order`), parent tip | english.for.10 | full |
| 🔨 | `english-forest-20` | تا حالا …؟ | Present perfect: Have you ever …? I've never … | animation, lesson (`listen`), game (`sort`), parent tip | english.for.11 | full |
| 🔨 | `english-forest-21` | تازه، هنوز | just, yet, already | lesson (`listen`), game (`sort`), parent tip | english.for.11 | full |
| 🔨 | `english-forest-22` | ساخته می‌شود | The passive: Rugs are made in Kashan. It was built in … | animation, lesson (`listen`), game (`sort`), parent tip | english.for.12 | full |
| 🔨 | `english-forest-23` | اگر … | First conditional: If it rains, we'll stay at home. | animation, lesson (`listen`), game (`order`), parent tip | english.for.12 | full |
| 🔨 | `english-forest-24` | کسی که، چیزی که | who, which, that; although, so, however | lesson (`listen`), game (`order`), parent tip | english.for.13 | full |
| 🔨 | `english-forest-25` | گوش کن: برنامه رادیویی | A longer talk or interview; notes and questions | lesson (`listen`), parent tip | english.for.16 | core |
| 🔨 | `english-forest-26` | کتاب من | A short graded book read alone over weeks, a chapter at a time, with questions | story (`passage`), parent tip | english.for.18 | full |
| 🔨 | `english-forest-27` | ایمیل | An email of 80–100 words: plan, write, check with a checklist | game (`order`), lesson (`listen`), `paper`, parent tip | english.for.19 | core |
| 🔨 | `english-forest-28` | قصه بنویس | A short story with a beginning, a problem and an end, with linking words | story (`passage`), `paper`, parent tip | english.for.20, english.for.13 | full |
| 🔨 | `english-forest-29` | نظر من | An opinion paragraph: I think … because … However … | game (`order`), lesson (`listen`), `paper`, parent tip | english.for.20 | full |
| 🔨 | `english-forest-30` | موافقم، مخالفم | Agreeing, disagreeing, giving reasons, asking someone to repeat | animation, lesson (`listen`, `dialogue`), parent tip | english.for.22 | full |
| 🔨 | `english-forest-31` | یک ارائه کوتاه | Plan and give a 1–2 minute talk from notes, recorded and listened back to | lesson (`record`), `paper`, parent tip | english.for.23 | full |
| 🔨 | `english-forest-32` | فرهنگ لغت و دفتر لغت | Word class, stress and examples in a dictionary; a vocabulary notebook | lesson (`listen`, `choose`), home (`paper`), parent tip | english.for.21 | full |
| 🔨 | `english-forest-33` | خانواده کلمه‌ها | happy, happiness, unhappy, happily; words of the Key and Preliminary topics | game (`pairs`, `sort`, `build`), parent tip | english.for.24 | core |
| 🔨 | `english-forest-34` | ببین چه بلدی | End of the course: reading, listening and writing (Key style, with B1 parts) | lesson (`listen`), story (`passage`), `paper`, parent tip | english.for.16, english.for.17 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `english-forest-p1` | Prospect review | For «همراه مدرسه»: the words, dialogues and grammar of the Prospect lesson the parent picks, as `listen`, `pairs`, `order` and `sort` items | english.for.1, english.for.2, english.for.3, english.for.4, english.for.5, english.for.6, english.for.7, english.for.8, english.for.9, english.for.25 |
| ⬜ | `english-forest-p2` | Grammar generator | Tense, passive, conditional and relative-clause items from sentence frames: choose, change, order | english.for.10, english.for.11, english.for.12, english.for.13, english.for.14, english.for.15 |
| ⬜ | `english-forest-p3` | Word bank (Key, Preliminary) | Words with audio, spelling and word families, with spaced review | english.for.24, english.for.21 |
| ⬜ | `english-forest-p4` | Reading library | Graded texts of 300–600 words and short graded books, with questions | english.for.17, english.for.18 |
| ⬜ | `english-forest-p5` | Listening bank | Dialogues, announcements and short talks with questions | english.for.16 |
| ⬜ | `english-forest-p6` | Writing prompts | Email, story, description and opinion tasks with a model and a checklist (`paper`) | english.for.19, english.for.20 |

### Step types needed

| Step type / option | What it does | Used by |
|---|---|---|
| English voice in `blend`, `clap` and `readaloud` | The Persian reading steps with an English word, the English voice and left-to-right text. **Built:** `clap` (`sounds: true`: one clap per sound; English parts spoken with the English voice; syllables work as they are), `blend` (left to right, each part a sound button, `sounds`) and `readaloud` (left to right) in `js/steps/english.js` | `english-sprout-12`, `english-sprout-40`, `english-sprout-57`, `english-sapling-49` |
| `record` | The child says something and hears it back next to the model (on the device only, nothing stored or sent); the parent ticks a short checklist; not scored. **Built** in `js/steps/english.js` | `english-tree-5/11/33/34`, `english-forest-11/12/31` |
| `dialogue` | A role play: the characters speak, the child takes one part (chooses the line, then says it aloud), with the conversation animated. **Built** in `js/steps/english.js` (a `scene` with `wait: { choose }`, `js/scene.js`) | `english-tree-35`, `english-forest-5/8/30` |

### Questions for an English teacher

- **Phonics order and pace:** Sprout follows Letters and Sounds (Phases 2–4) but the built lessons teach four to
  seven letters a lesson. Is one consolidation lesson after each set enough, or should `english-sprout-6` be split?
- **British or American English:** the built lessons use British spellings and words (colour, rubber, mum); Prospect
  uses mostly American (color, favorite, mom). Which should Baghcheh use, and should the other one be shown?
- **Tricky words:** which list (Letters and Sounds, or a list matched to the Prospect and Cambridge words)?
- **The School column:** the grammar of each Prospect lesson comes from teachers' summaries; please check it
  against the current books, especially Prospect 3, where summaries disagree.
- **B1 at full depth in Forest:** is B1 realistic at 12–15 with about 530 hours, or should B1 objectives stay optional?
- **Speaking without a teacher:** is recording and listening back (`record`), with a parent checklist, enough, or
  should Baghcheh suggest weekly speaking with another person?
