## احساس‌های من — subject `feel`

Social and emotional learning, trauma-informed: safety, calm, naming and handling feelings, knowing myself, other
people, friendship, good decisions and hope. Lessons in `js/lessons/feel.js`, step types in `js/steps/feel.js`.
Animal or child characters, everyday Iranian settings.

> **Leveled by garden** (decided by the user, 2026-10-19). `feel` is `leveled: true` in `js/content.js` and starts at
> the child's Persian garden, like `health`. Each garden section below is that garden's lessons (`level` set in
> `js/lessons/feel.js`); the 11 built lessons stay `level: null`, so every child in every garden keeps them, as
> `health-all-1/2/3` do. The weekly calm lesson in the parent's plan still comes from the lessons for every age.
> Reasons: [Leveling](#leveling).

**Rules that stay** (every lesson, every garden):

- **Never scored, and nothing the child answers is stored.** Feel steps are `calm` steps or games with
  `practice: true`; no `choose` and no mastery. A lesson counts as done when it is played, nothing more
  (`policies.html#privacy`: «احساس‌ها ذخیره نمی‌شوند»). Writing about oneself happens on paper (`paper`), never on screen.
- **No right or wrong about a feeling.** Every feeling is allowed; only what we *do* with it can be chosen. No step
  says a feeling is wrong, too big or silly.
- **Calm and safe.** No war, violence, injury, death shown, sirens, loud bangs or frightening pictures
  (`policies.html#safety`); slow pace; the child can stop at any time. The child is **never asked to tell or relive
  a frightening event**: lessons teach skills and name common reactions in general terms; telling is always to a
  trusted grown-up, and only if the child wants (WHO PFA: do not force anyone to talk).
- **Not therapy.** Baghcheh teaches everyday skills (the "universal" layer of the IASC pyramid). For worry, loss,
  nightmares or self-harm the parent guide (`guide.html#feelings`) says when and where to get professional help;
  every lesson that touches worry, sadness or loss ends with a `forparents` note pointing there.
- **Grown-ups are part of it.** Younger children play with a parent; every lesson ends with something to do
  together. Neutral: no political, religious or ideological content (`policies.html#neutral`).

**Needs review by a child psychologist** before any new lesson is built: see [For the psychologist](#for-the-psychologist).

### Frameworks

**Best practice leads.** What is taught and in what order comes from CASEL, the strongest evidence on social and
emotional learning (universal-programme evaluations and meta-analyses), and the approaches of top-performing
systems such as Singapore and Finland. Iranian school topics are used only to fill the School column. Iran has no
school subject for SEL, so this subject follows that scope alone and adds nothing from Iranian textbooks.

- **Evidence on what works:** Durlak et al. (2011), *The impact of enhancing students' social and emotional
  learning: a meta-analysis of school-based universal interventions*, Child Development 82(1) (213 programmes:
  better skills, behaviour, wellbeing and achievement; `method.html#sel`). The programmes that work are **SAFE**
  (sequenced, active, focused, explicit), so this plan has a sequence of units per garden, active steps (breathing,
  sorting, ordering, home tasks) rather than talk alone, a clear time each week, and named skills. Taylor et al.
  (2017), Child Development 88(4), found the effects still there years later.
- **CASEL framework** (casel.org/framework): five competencies (self-awareness, self-management, social awareness,
  relationship skills, responsible decision-making). CASEL itself publishes no grade-by-grade list; the progression
  here follows state standards built on it, mainly New York's *SEL Benchmarks* (2022, nysed.gov, preschool to grade 12,
  earlier bands with more adult support, never used to grade children) and Michigan's *SEL Competencies and
  Indicators, Early Childhood to Grade 12* (michigan.gov).
- **WHO, *Life Skills Education for Children and Adolescents in Schools*** (1997, WHO/MNH/PSF/93.7A.Rev.2): the ten
  life skills (self-awareness, empathy, communication, relationships, decision making, problem solving, creative and
  critical thinking, coping with emotions, coping with stress). Iranian life-skills («مهارت‌های زندگی») training draws on the same list (to confirm).
- **Trauma-informed, for children affected by conflict:**
  - Hobfoll et al. (2007), *Five essential elements of immediate and mid-term mass trauma intervention*, Psychiatry
    70(4): **safety, calming, self- and community efficacy, connectedness, hope**. The strands are built on these.
  - WHO, War Trauma Foundation & World Vision (2011), *Psychological First Aid: Guide for Field Workers* (look, listen,
    link); Save the Children Denmark (2013), *Psychological First Aid Training Manual for Child Practitioners*.
  - IASC (2007), *Guidelines on Mental Health and Psychosocial Support in Emergency Settings* (the intervention
    pyramid: Baghcheh sits in the bottom layers, everyday support in the family), and UNICEF (2018), *Operational
    Guidelines: Community-Based Mental Health and Psychosocial Support in Humanitarian Settings*.
  - INEE (2018), *Guidance Note on Psychosocial Support: Facilitating psychosocial wellbeing and social and emotional
    learning* (McNatt, Boothby, Wessells, Lo): emotion-regulation exercises, cooperative play, role-play and reflection
    inside ordinary learning.
  - NCTSN, *Age-Related Reactions to a Traumatic Event* (nctsn.org): what is common at each age (younger children lose
    skills, sleep and separation suffer; school-age children worry about safety and feel guilt; adolescents feel shame,
    withdraw, take risks). Used for the parent notes and for what each garden needs, never shown to the child.
- **Evidence-based programmes, for scope only (none of their materials):** PATHS (Promoting Alternative THinking
  Strategies: self-control with the "turtle", feelings, problem solving; crimesolutions.ojp.gov rates it effective);
  Second Step (early learning to middle school: emotion management, empathy and kindness, problem solving, growth
  mindset and goals, bullying, thoughts-emotions-decisions, relationships and conflict); Sesame Workshop and IRC,
  *Ahlan Simsim* (an RCT in Jordan by NYU Global TIES found more emotion words and more use of breathing among
  preschoolers affected by the Syrian conflict: the closest evidence to Baghcheh's situation).
- **Top-performing systems:**
  - **Singapore**, Character and Citizenship Education (MOE, SEL since 2005; CCE syllabus 2014, enhanced 2021 with
    more mental health and cyber wellness; moe.gov.sg): the same five competencies as CASEL, taught every year from
    primary to secondary, with resilience and healthy relationships as aims. Followed here: one sequence for every
    year, mental health and online kindness in the later gardens (`feel-tree-11`, `feel-forest-4/5/6/10`).
  - **Finland**, National Core Curriculum for Basic Education 2014 (Finnish National Agency for Education;
    Eurydice summary): "taking care of oneself and others, managing daily life" is a transversal competence in every
    subject, and health education (*terveystieto*) is its own subject in the upper grades. Followed here: calm and
    emotion skills in daily routines (the check-in and calm minute, the off-screen activities), and stress, sleep and
    help-seeking as explicit topics for teenagers (shared with `health-forest-2`).
- **What children understand about loss, by age** (for the parent notes): young children feel death as separation and
  may think it can be undone; by about 6–10 they come to see it as final (Hopkins 2014, University of East Anglia;
  Winston's Wish). That is why loss is "missing someone" for every age and a lesson of its own only in Tree.
- **Choices where sources differ, and why:**
  - *Order*: calm and safety first, then naming feelings, then managing them, then others and decisions. CASEL lists
    its competencies side by side; for children who have lived through fear, Hobfoll's elements and PFA put safety
    and calming first, and PATHS and Second Step also start with self-control and feelings.
  - *Leveled, with a core for every age*: Singapore and the state standards progress by age, so the subject is planned
    per garden; the calm tools stay for every age because a child under stress needs them at once (INEE, PFA).
  - *Never scored, nothing stored*: the New York benchmarks say not to grade children on SEL; Baghcheh goes further
    for privacy and safety.
  - *No trauma processing*: the evidence for retelling an event is for trained clinicians (IASC upper layers); a
    universal programme teaches skills and links to help.
- **Iranian school (School column only):** there is no school subject for social and emotional learning. Related topics: «تفکر و پژوهش»
  (پایه ششم) and «تفکر و سبک زندگی» (پایه‌های هفتم و هشتم: «من کیستم؟»، خودآگاهی، مدیریت زمان، مدیریت اختلاف نظر);
  the School column names these where they fit and says «—» elsewhere. Lesson titles are from secondary sources
  (gama.ir teaching material; Karimian, content analyses of «تفکر و سبک زندگی», ensani.ir and fabak.ihcs.ac.ir):
  check against the current textbook before showing them to parents.

### Strands

| Strand | What grows | CASEL | Hobfoll |
|---|---|---|---|
| calm | breathing, grounding, relaxing, moving, a safe place in the mind, sleep: from doing it with a grown-up to choosing my own tool | self-management | safety, calming |
| awareness | naming feelings (6 words → 20 → precise words and intensity), where they are in the body, mixed feelings, what feelings tell us | self-awareness | — |
| managing | what to do with anger, worry, sadness, frustration and stress; thoughts that help; worry vs problem | self-management | calming, self-efficacy |
| self | I can, I can try again, my strengths, goals, identity and values | self-awareness | self-efficacy, hope |
| others | reading faces, empathy, other points of view, respecting differences | social awareness | connectedness |
| relationships | kind words, turns, friendship, listening, saying how I feel, repair, bullying, peer pressure, healthy relationships, asking for and giving help | relationship skills | connectedness |
| decisions | stop and think, problem-solving steps, choices and their results, honesty, big decisions, information and feelings | responsible decision-making | self-efficacy |
| hope | good moments, gratitude, helping others, plans for later | — | hope, community efficacy |

### Sizing

Iranian schools have no lesson time for this, so Baghcheh gives `feel` **one session of about 15 minutes a week**
at «کامل», plus **a daily calm minute and check-in** of 2–3 minutes (the [practice](#practice-for-every-garden)
below, not counted as sessions). At «پایه» it is the core lessons and the daily minute. At «همراه مدرسه» it is the
same as «پایه» (the School column only says which school topic is related). Calm lessons are meant to be played
again and again, so many sessions are a replay of a lesson the child chooses.

| Garden | Years | Sessions (× 36 weeks × 1) | New lessons | Replays and practice |
|---|---|---|---|---|
| Seed | 2 | 72 | 16 for every age + 8 = 24 | 48 |
| Sprout | 2 | 72 | 10 (+ the 16 for every age, if the child starts here) | 62 (46) |
| Sapling | 2 | 72 | 12 | 60 |
| Tree | 3 | 108 | 14 | 94 |
| Forest | 3 | 108 | 14 | 94 |

Fewer new lessons than other subjects on purpose: these skills grow by repeating them in daily life, not by new
content. Plan for 74 lessons in all (16 for every age, 58 in gardens).

### Leveling

**Recommendation: level it, the way `health` is leveled.** A 3-year-old and a 14-year-old need different things:
a Seed child needs a grown-up beside them, faces and a turtle that stops and breathes; a Forest child needs identity,
stress, healthy relationships and how news and social media change how they feel, and would turn away from lessons
that look made for little children. One list for everyone either bores the older ones or loses the younger ones.
Keep the 16 lessons for every age `level: null`: the calm tools, naming feelings and asking for help must be there
for every child at every moment, whatever garden they are in. Start each child at their Persian garden; the parent
can change it. The code change (in `js/content.js` and `js/lessons/feel.js`) is the user's decision.

### همه — `any`

For every child in every garden (`level: null`). Sizing: 16 lessons, about 10 minutes each; they come first for a
new child, then stay available to replay at any time.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.any.1` | Calm down with slow breathing (smell the flower, blow the candle; box breathing), with a grown-up or alone | calm | core | — | `breathe` in `feel-1`, `feel-4`, done with the parent (not scored) |
| `feel.any.2` | Name six feelings (خوشحال، غمگین، عصبانی، نگران، ترسیده، آرام) from faces and everyday situations | awareness | core | — | `pairs` (practice) in `feel-2`; the daily check-in |
| `feel.any.3` | Say or show how I feel right now, knowing every feeling is allowed and feelings change | awareness | core | — | `feelings` at the end of the lessons (nothing stored) |
| `feel.any.4` | Show where a feeling is felt in my body | awareness | core | — | `body` in `feel-3` |
| `feel.any.5` | Come back to here and now by noticing what I see, hear, touch and smell | calm | core | — | `ground` in `feel-5` |
| `feel.any.6` | Move or relax my body to let tension go (shake, stretch, tense and let go, butterfly hug) | calm | core | — | `relax` in `feel-10`; `doit` in `feel-15` |
| `feel.any.7` | Imagine a safe, calm place and go there in my mind when I need to | calm | full | — | `relax` (guided) in `feel-13` |
| `feel.any.8` | Follow a bedtime routine and relax before sleep | calm | core | — | `order` (practice) and `relax` in `feel-10` |
| `feel.any.9` | Say when I am worried and tell a trusted grown-up | managing | core | — | `talk` in `feel-6`; the parent sees it at home |
| `feel.any.10` | Tell how big my anger is and choose something safe to do instead (stop, breathe, say it) | managing | core | — | `meter` and `sort` (practice) in `feel-7` |
| `feel.any.11` | Name sadness and missing someone, and things that help (a hug, a memory, a drawing, talking) | managing | core | — | `talk` and `doit` in `feel-12` |
| `feel.any.12` | Know that after hard or frightening days bodies and feelings react (sleep, tummy, clinginess), that this is common and gets better with calm, routine and people who care | managing | core | — | `talk` in `feel-16`; the parent note |
| `feel.any.13` | Name the grown-ups who help me, and how to ask them | relationships | core | — | `doit` (draw my helpers' hand) in `feel-14` |
| `feel.any.14` | Use kind words (سلام، ممنون، بفرما، ببخشید), share and say sorry | relationships | core | — | `pairs` (practice) and `talk` in `feel-8` |
| `feel.any.15` | Solve a quarrel in steps: stop, breathe, say how I feel, find a way (take turns, share) | decisions | core | — | `order` (practice) in `feel-9` |
| `feel.any.16` | Notice good moments and say three good things about today | hope | full | — | `talk` and `doit` in `feel-11` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ✅ | `feel-1` | نفس گل و شمع | Slow breathing (smell the flower, blow the candle); how do I feel now | calm (`breathe`, `feelings`) | feel.any.1, feel.any.3 | core |
| ✅ | `feel-2` | اسم احساس‌ها | Naming feelings from faces and situations: خوشحال، غمگین، عصبانی، نگران، ترسیده، آرام; when do I feel them; how do I feel now | animation, game (`pairs` face ↔ word, `practice`), story (`talk`), calm (`feelings`) | feel.any.2, feel.any.3 | core |
| ✅ | `feel-3` | احساس در بدن من | Where a feeling is felt in the body (happy, worried, angry), then slow breathing | animation, calm (`body`, `breathe`) | feel.any.4, feel.any.1 | core |
| ✅ | `feel-4` | نفس مربعی | A second breathing pattern (in 4, hold 4, out 4, hold 4); how do I feel now | animation, calm (`breathe` `pattern`, `feelings`) | feel.any.1, feel.any.3 | core |
| ✅ | `feel-5` | پنج چیز که می‌بینم | Grounding: 5 things I see, 4 I hear, 3 I touch, 2 I smell, 1 slow breath | animation, calm (`ground`, `feelings`) | feel.any.5 | core |
| 🔨 | `feel-15` | بدنم را تکان می‌دهم | Letting tension go by moving: tight shoulders and fists, then shake hands and arms like a wet cat, stretch tall like a tree, the butterfly hug (arms crossed, tap slowly), a slow breath; doing it with the grown-up; how do I feel now | animation, home (`doit`), calm (`breathe`, `feelings`), parent tip (`forparents`) | feel.any.6, feel.any.3 | core |
| 🔨 | `feel-13` | جای امن من | A calm place in my mind: Yasaman goes to Grandma's garden with her eyes closed (what she sees, hears and smells there); relaxing the body first (tense and let go); a guided "close your eyes" for the child's own place, real or made up; going there with slow breaths; drawing it on paper | animation, calm (`relax`, `breathe`), story (`talk`), home (`doit`), parent tip (`forparents`) | feel.any.7 | full |
| ✅ | `feel-6` | وقتی نگرانم | Worry: a squirrel worried before the first day of school, telling a grown-up, breathing together; a parent note on when to get professional help (`guide.html#feelings`) | animation, story (`talk`), calm (`breathe`), parent tip (`forparents`) | feel.any.9, feel.any.1 | core |
| 🔨 | `feel-14` | آدم‌های کمک‌کار من | My helpers: five grown-ups I trust, one on each finger (Mom, Dad, Grandma, an aunt, a teacher); a helper can be far away and still care (Grandma in another city, on the phone); how to ask («می‌شود کمکم کنی؟»: a teddy on a high shelf), then practising it in turns; my helpers' hand drawn on paper | animation, story (`talk`), home (`doit`), parent tip (`forparents`) | feel.any.13 | core |
| ✅ | `feel-7` | دماسنج خشم | Anger: how big is my anger, what I can do instead (stop, breathe, say it) | animation, calm (`meter`, `breathe`), game (`sort`, `practice`) | feel.any.10, feel.any.1 | core |
| 🔨 | `feel-12` | وقتی دلم تنگ است | Sadness and missing someone: Arash misses his friend Sam who moved; it is all right to cry; what helps (a hug, Sam's photo, a drawing for him, a phone call); no one is to blame for being sad; the talk widens it to anyone or anything missed (a relative far away, the old house, school) | animation, story (`talk`), home (`doit`), calm (`feelings`), parent tip (`forparents`) | feel.any.11, feel.any.3 | core |
| 🔨 | `feel-16` | بعد از روزهای سخت | After hard days a body and its feelings can react (Fandogh the squirrel): trouble sleeping, a tummy ache, wanting to stay close, getting cross quickly. Many children feel this; it gets better with calm (breathing with Mama), the people who care (a hug) and the day's routine (breakfast, play, sleep at their times). What helps me (my calm tools, my helpers). No event shown or asked about; the parent note on what is common and when to get help | animation, story (`talk`), calm (`breathe`, `feelings`), parent tip (`forparents`) | feel.any.12, feel.any.13 | core |
| ✅ | `feel-8` | دوستی و مهربانی | Being a friend, sharing, saying sorry; kind words (سلام، ممنون، بفرما، ببخشید) | animation, game (`pairs`, `practice`), story (`talk`) | feel.any.14 | core |
| ✅ | `feel-9` | وقتی دعوا می‌شود | Solving a conflict in steps: stop, breathe, say how I feel, find a way (taking turns) | animation, game (`order`, `practice`), story (`talk`) | feel.any.15, feel.any.10 | core |
| ✅ | `feel-10` | خواب آرام | Bedtime routine and relaxing the body part by part | game (`order`, `practice`), calm (`relax`, `breathe`) | feel.any.8, feel.any.6 | core |
| ✅ | `feel-11` | سه چیز خوب امروز | Gratitude and good moments: three good things today | animation, story (`talk`), home (`doit`) | feel.any.16 | full |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `feel-any-p1` | Daily check-in «امروز حالم…» | A `feelings` step: pick a face (the 6 feelings and «نمی‌دانم»; all 13 after `feel-sprout-1`), then one sentence back for that feeling; for worried, sad, angry or scared, the offer of a calm tool the child has met («می‌خواهی با هم آرام شویم؟»). **Nothing is stored**, not even for the parent | feel.any.2, feel.any.3 |
| 🔨 | `feel-any-p2` | Calm minute | A `menu` of the calm tools the child has met (flower and candle, box breathing, 5-4-3-2-1, shake and butterfly hug, safe place, tense and let go), in a new order each time; the child picks one and it plays; never scored | feel.any.1, feel.any.5, feel.any.6, feel.any.7 |
| 🔨 | `feel-any-p3` | Calm corner | A button on the child's home screen (`home: true`), any time, outside lessons: «می‌خواهم آرام شوم» opens a `menu` of the calm tools the child has met, and going to a grown-up | feel.any.1, feel.any.5, feel.any.6 |
| 🔨 | `feel-any-p4` | Off-screen activities | In `js/activities.js`: feelings charades, three good things at dinner, a kindness jar, drawing my helpers, a family bedtime routine | feel.any.2, feel.any.13, feel.any.14, feel.any.16 |

### 🌰 دانه — `seed`

Sizing: 2 years × 36 weeks × 1 session = 72 sessions: the 16 lessons for every age, 8 Seed lessons, 48 replays and
practice. Always with a grown-up beside the child; every step is heard (audio), no reading.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.seed.1` | Show how I feel today with a face, and see that feelings change during a day | awareness | core | — | `feelings` in `feel-seed-1` |
| `feel.seed.2` | Stop like a turtle when a feeling is big: go into my shell, breathe, then come out and say it | managing | core | — | `breathe` and `doit` in `feel-seed-2` |
| `feel.seed.3` | Wait, take turns and play together with a toy | relationships | core | — | `order` (practice) in `feel-seed-3` |
| `feel.seed.4` | Tell how someone else feels from their face and what happened, and do something kind | others | core | — | `pairs` (practice) in `feel-seed-4` |
| `feel.seed.5` | Help at home in small ways and see that helping makes people feel good | hope | full | — | `doit` in `feel-seed-5` |
| `feel.seed.6` | Say goodbye and know that my grown-up comes back; use a goodbye routine | managing | core | — | `order` (practice) and `talk` in `feel-seed-6` |
| `feel.seed.7` | Do things by myself and try again when something is hard | self | full | — | `doit` in `feel-seed-7` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| 🔨 | `feel-seed-1` | امروز حالم چطور است؟ | A day with a little rabbit: happy at breakfast, sad when the ball rolls away, happy again when Mama helps find it, calm at bedtime; feelings come and go; matching her faces with the moments; my day and the grown-up's day; my face today | animation, game (`pairs`, `practice`), calm (`feelings`), story (`talk`) | feel.seed.1 | core |
| 🔨 | `feel-seed-2` | لاک‌پشت آرام | The turtle who stops when she is angry or scared: into the shell, three slow breaths, out, «من عصبانی‌ام»; the child does it with their arms | animation, home (`doit`), calm (`breathe`), parent tip (`forparents`) | feel.seed.2 | core |
| 🔨 | `feel-seed-3` | نوبت من، نوبت تو | Waiting and taking turns on the swing (asking, counting five swings), with blocks, in a ball game; what we can do while we wait (count, sing, clap); a turn-taking ball game at home | animation, game (`order`, `practice`), story (`talk`), home (`doit`) | feel.seed.3 | core |
| 🔨 | `feel-seed-4` | او چه حسی دارد؟ | Faces and what happened (his tower fell, she got a gift, his apple fell); what I could do (help, share, a hug); a face-guessing game with the grown-up | animation, game (`pairs`, `practice`), story (`talk`) | feel.seed.4 | core |
| 🔨 | `feel-seed-5` | کمک کوچک | Small help at home: setting the sofreh, watering a plant, putting shoes away; how the other person feels (Mom and Dad pleased, and the helper too); my jobs and grown-ups' jobs (the stove, knives, hot tea are for grown-ups) | animation, game (`sort`, `practice`), story (`talk`), home (`doit`), parent tip (`forparents`) | feel.seed.5 | full |
| 🔨 | `feel-seed-6` | خداحافظ، دوباره سلام | A goodbye routine (a hug, a wave, «عصر می‌بینمت!») when Mom goes to work and Arash stays with Grandma; it is all right to miss her; playing meanwhile; Mom comes back in the evening as she said («سلام دوباره!»); making our own goodbye at home | animation, game (`order`, `practice`), story (`talk`), home (`doit`), parent tip (`forparents`) | feel.seed.6 | core |
| 🔨 | `feel-seed-7` | خودم می‌توانم | Things I can do myself (washing hands, carrying my plate, shoes); when it is hard I breathe, try again or ask for help («می‌شود کمکم کنی؟»), then «خودم توانستم!» | animation, story (`talk`), home (`doit`), parent tip (`forparents`) | feel.seed.7 | full |
| 🔨 | `feel-seed-8` | بازی احساس‌ها | Game: feelings faces with situations, kind actions (sorting, and matching a feeling with a kind thing to do), the turtle steps in order; how do I feel now | game (`pairs`, `sort`, `order`, `practice`), calm (`feelings`) | feel.seed.1, feel.seed.2, feel.seed.4 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `feel-seed-p1` | Face and situation bank (Seed) | Endless `pairs` and `sort` rounds (practice): a face ↔ what happened, from a bank of everyday pictures with the 6 feelings | feel.seed.1, feel.seed.4 |
| 🔨 | `feel-seed-p2` | Off-screen: turtle game | In `js/activities.js`: the family plays turtle (stop, shell, breathe) when someone is cross, a grown-up first | feel.seed.2 |
| 🔨 | `feel-seed-p3` | Step by step «قدم به قدم» | `order` rounds (scored as games about a story): the turtle's steps, taking a turn, a goodbye routine, trying again; each family opens after its lesson, with several stories each | feel.seed.2, feel.seed.3, feel.seed.6, feel.seed.7 |
| 🔨 | `feel-seed-p4` | What helps? «چه چیزی کمک می‌کند؟» | `sort` rounds about a small story: what helps and what doesn't when angry, waiting, a friend is sad, saying goodbye or something is hard; and my jobs and grown-ups' jobs at home | feel.seed.2, feel.seed.3, feel.seed.4, feel.seed.5, feel.seed.6, feel.seed.7 |
| 🔨 | `feel-seed-p5` | What do I say? «چه بگویم؟» | `pairs` rounds: a face ↔ the name of its feeling; and, after their lessons, a moment ↔ what we can say («من عصبانی‌ام»، «نوبت من کی است؟»، «بیا کمکت کنم»، «عصر می‌بینمت!»، «می‌شود کمکم کنی؟»…) | feel.seed.1, feel.seed.2, feel.seed.3, feel.seed.4, feel.seed.5, feel.seed.6, feel.seed.7 |

### 🌱 جوانه — `sprout`

Sizing: 2 years × 36 weeks × 1 session = 72 sessions: 10 new lessons (plus the 16 for every age for a child who
starts here) and 62 replays and practice.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.spr.1` | Name more feelings: خجالت‌زده، هیجان‌زده، ناامید، حسود، سربلند، دلتنگ، بی‌حوصله | awareness | core | — | `pairs` (practice) in `feel-sprout-1` |
| `feel.spr.2` | Tell a small feeling from a big one, and do something that fits its size | managing | core | — | `meter` in `feel-sprout-2` |
| `feel.spr.3` | Keep trying when something is hard, and say «هنوز نه» (not yet) instead of «نمی‌توانم» | self | full | — | `talk` in `feel-sprout-3` |
| `feel.spr.4` | See that the same thing can make two people feel differently | others | full | — | `sort` (practice) in `feel-sprout-4` |
| `feel.spr.5` | Listen well: look, stay still, wait for my turn to talk | relationships | core | — | `doit` in `feel-sprout-5` |
| `feel.spr.6` | Ask to join a game, invite someone who is alone, and know what to do when I am left out | relationships | core | — | `talk` in `feel-sprout-6` |
| `feel.spr.7` | Say how I feel with «من»: «من ناراحت شدم وقتی…» | relationships | core | — | `order` (practice) in `feel-sprout-7` |
| `feel.spr.8` | Stop and think before I choose, and see what happens after a choice | decisions | full | — | `sort` (practice) in `feel-sprout-8` |
| `feel.spr.9` | Respect that people are different (languages, looks, homes, what they like) | others | full | — | `talk` in `feel-sprout-9` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| 🔨 | `feel-sprout-1` | احساس‌های تازه | Seven new feeling words in small everyday stories (shy saying a poem in front of the class, excited before a trip to the sea, disappointed when it rains, jealous of a new baby, proud of a drawing, missing a friend, bored); when I felt them; charades with the new words | animation, game (`pairs`, `practice`), story (`talk`), calm (`feelings`) | feel.spr.1 | core |
| 🔨 | `feel-sprout-2` | احساس بزرگ، احساس کوچک | A feeling can be small or big (1 to 5, a thermometer): a lost pencil (small: say it, look for it), a scribbled drawing (big: stop, breathe, ask a grown-up); feelings get smaller again; how big was mine; what fits a small and a big feeling | animation, calm (`meter`, `breathe`, `feelings`), game (`sort`, `practice`) | feel.spr.2 | core |
| 🔨 | `feel-sprout-3` | هنوز نه! | Learning to ride a bike (Nika, seen from the front): wobbling, a tumble onto the grass, «نمی‌توانم!», Dad's «هنوز نمی‌توانی», trying again with Dad holding on, practising day after day (the brain learns with practice), riding alone; words that help or make me give up; my «هنوز» list | animation, story (`talk`), game (`sort`, `practice`), parent tip (`forparents`) | feel.spr.3 | full |
| 🔨 | `feel-sprout-4` | هر کس یک جور | The same thing (rain, a dog, a loud party) makes one child happy and another scared or uneasy; both are all right and we accept others' feelings; who liked what; asking the family | animation, game (`sort`, `practice`), story (`talk`), home (`doit`), calm (`feelings`) | feel.spr.4 | full |
| 🔨 | `feel-sprout-5` | خوب گوش می‌دهم | Listening with eyes, ears and a still body, and waiting for my turn (Aydin fidgets, then listens to Shirin); practising it, the «چه گفتم؟» game and a sounds game with the family | animation, home (`doit`), parent tip (`forparents`) | feel.spr.5 | core |
| 🔨 | `feel-sprout-6` | بیا با هم بازی کنیم | Asking «می‌شود من هم بازی کنم؟», inviting a child who is alone, and what I can do when someone says no (another game, another friend, ask later, tell a grown-up if it keeps happening); acting it out at home | animation, story (`talk`), game (`sort`, `practice`), home (`doit`) | feel.spr.6 | core |
| 🔨 | `feel-sprout-7` | با «من» می‌گویم | Saying how I feel without blaming: «من ناراحت شدم، وقتی …، می‌خواهم …» (Yasaman and her crayons, after a slow breath); putting the parts in order (two sentences); making my own; listening to someone's «من» sentence | animation, game (`order`, `practice`), story (`talk`) | feel.spr.7 | core |
| 🔨 | `feel-sprout-8` | اول فکر می‌کنم | Stop, think, choose: what happens after each choice (Sam's pencil breaks: taking Arash's or asking, shown in two thought bubbles; staying close in the market or running off; waiting or pushing in a queue); the «بعدش چه می‌شود؟» game | animation, game (`order`, `sort`, `practice`), story (`talk`) | feel.spr.8 | full |
| 🔨 | `feel-sprout-9` | همه با هم فرق داریم | Children from many parts of Iran in one class: languages at home (Turkish, Kurdish, Arabic, Persian) and Persian together at school, liking different things, looking different; the feelings we all share; being fair to everyone; asking an older person about where they grew up | animation, story (`talk`), game (`pairs`, `practice`), home (`doit`) | feel.spr.9 | full |
| 🔨 | `feel-sprout-10` | بازی دوستی | Game: feeling words, an I-sentence in order, joining and inviting, helpful and unhelpful choices, what helps each feeling | game (`pairs`, `order`, `sort`, `practice`) | feel.spr.1, feel.spr.6, feel.spr.7, feel.spr.8 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `feel-sprout-p1` | Feeling-word bank (Sprout) | `pairs` rounds: a small story ↔ its feeling word, from 13 feelings (at least two of the seven new words each round). The check-in shows all 13 faces after `feel-sprout-1` (`feel-any-p1`) | feel.spr.1 |
| 🔨 | `feel-sprout-p2` | "What could I do?" bank | `sort` rounds (practice): a situation, then actions that help or don't help; endless everyday situations, never a frightening one | feel.spr.2, feel.spr.8 |
| 🔨 | `feel-sprout-p3` | What do I say? «چه بگویم؟» | `pairs` rounds: a feeling ↔ what could help it; and, after their lessons, a moment ↔ what we can say («هنوز نمی‌توانم»، «می‌شود من هم بازی کنم؟»، «اول تو بگو»، «می‌شود قرض بگیرم؟»…) | feel.spr.1, feel.spr.2, feel.spr.3, feel.spr.5, feel.spr.6, feel.spr.8, feel.spr.9 |
| 🔨 | `feel-sprout-p4` | Step by step «قدم به قدم» | `order` rounds: the steps for a big feeling, learning something hard, listening well, joining a game, an I-sentence (many examples), stop-think-choose; each family after its lesson | feel.spr.2, feel.spr.3, feel.spr.5, feel.spr.6, feel.spr.7, feel.spr.8 |
| 🔨 | `feel-sprout-p5` | Everyone is different «هر کس یک جور» | `sort` rounds: in a little story, who liked something and who didn't (the same thing, two feelings); after feel-sprout-9, what we all share and what is different between us | feel.spr.4, feel.spr.9 |
| 🔨 | `feel-sprout-p6` | Kind words «حرف مهربان» | `sort` rounds of things children say or do, into kind and unkind: about others' feelings, listening, joining and inviting, «من» sentences and blaming, being fair to everyone; each family after its lesson | feel.spr.4, feel.spr.5, feel.spr.6, feel.spr.7, feel.spr.9 |

### 🌿 نهال — `sapling`

Sizing: 2 years × 36 weeks × 1 session = 72 sessions: 12 new lessons and 60 replays and practice. The child may
play alone; each lesson still ends with something to do with the family.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.sap.1` | Notice two feelings at once (excited and scared, happy and sad) | awareness | core | — | `talk` in `feel-sapling-1` |
| `feel.sap.2` | Explain how a thought changes a feeling and what I do, and find a more helpful thought | managing | core | — | `sort` (practice) in `feel-sapling-2` |
| `feel.sap.3` | Make my own calm plan: which tools work for me and when | calm | core | — | `paper` in `feel-sapling-3` (the parent ticks, nothing kept) |
| `feel.sap.4` | Name my strengths and what I like about myself | self | full | — | `paper` in `feel-sapling-4` |
| `feel.sap.5` | Set a small goal and plan its steps | self | full | — | `order` (practice) in `feel-sapling-5` |
| `feel.sap.6` | Show empathy: notice, imagine how the other feels, offer help | others | core | — | `talk` in `feel-sapling-6` |
| `feel.sap.7` | Tell teasing from bullying, and what to do as the child it happens to or as someone who sees it (say stop, stay with them, tell a grown-up) | relationships | core | — | `sort` (practice) in `feel-sapling-7` |
| `feel.sap.8` | Solve a problem in steps: stop and calm, say the problem, think of ways, choose, try, see how it went | decisions | core | — | `order` (practice) in `feel-sapling-8` |
| `feel.sap.9` | Make up after a quarrel: a real apology and making it right | relationships | full | — | `order` (practice) in `feel-sapling-9` |
| `feel.sap.10` | Work in a group: share jobs, listen to ideas, decide together | relationships | full | — | `doit` in `feel-sapling-10` |
| `feel.sap.11` | Tell the truth and keep promises, even when it is hard | decisions | full | — | `talk` in `feel-sapling-11` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| 🔨 | `feel-sapling-1` | دو احساس با هم | Two feelings at once: the first day in a new school (excited and worried), a cousin leaving after a visit (happy it happened, sad it ended); both are true; matching moments with two feelings; a two-coloured heart on paper | animation, game (`pairs`, `practice`), story (`talk`), home (`doit`), calm (`feelings`) | feel.sap.1 | core |
| 🔨 | `feel-sapling-2` | فکر، احساس، کار | A thought → a feeling → what I do (a friend doesn't wave: «او از من بدش می‌آید» or «شاید مرا ندید»); putting them in order; helpful and unhelpful thoughts; finding a kinder, truer thought; the «یک فکر دیگر» game | animation, game (`order`, `sort`, `practice`), story (`talk`) | feel.sap.2 | core |
| 🔨 | `feel-sapling-3` | جعبه‌ابزار آرامش من | Trying the calm tools again (flower and candle, box breathing, 5-4-3-2-1, tense and let go) and choosing my favourites; my calm plan on paper: when I feel …, I can …, I can ask … | calm (`breathe`, `ground`, `relax`), home (`paper`), parent tip (`forparents`) | feel.sap.3 | core |
| 🔨 | `feel-sapling-4` | نقطه‌های قوت من | Strengths that are not marks (patient with plants, funny, kind, brave, careful), shown by four children; matching strengths; finding mine and a family member's on paper; telling each other | animation, game (`pairs`, `practice`), home (`paper`), story (`talk`) | feel.sap.4 | full |
| 🔨 | `feel-sapling-5` | هدف کوچک من | A small goal (reading a storybook in a week, two pages a day, a star each day), what to do when it gets hard (rest, ask for help); the steps in order; my own goal and its steps on paper | animation, game (`order`, `practice`), story (`talk`), home (`paper`) | feel.sap.5 | full |
| 🔨 | `feel-sapling-6` | جای او بودن | Empathy in three steps: notice, imagine, help; a new child alone in the class, a little brother who lost a game; the steps in order; what shows I put myself in their place | animation, game (`order`, `sort`, `practice`), story (`talk`) | feel.sap.6 | core |
| 🔨 | `feel-sapling-7` | قلدری نه! | Teasing that is fun for both, and bullying (again and again, on purpose, to hurt), with no violence shown; what to do: say «بس کنید!», walk away, stay with the child, tell a grown-up and keep telling; sorting teasing from bullying and what helps | animation, game (`sort`, `practice`), story (`talk`), parent tip (`forparents`) | feel.sap.7 | core |
| 🔨 | `feel-sapling-8` | چراغ راهنمایی | Problem solving like a traffic light (two children, one ball): red (stop, calm), yellow (say the problem, think of ways), green (choose, try, see); the steps in order for the ball and for a lost pencil; a traffic light at home | animation, game (`order`, `practice`), story (`talk`) | feel.sap.8 | core |
| 🔨 | `feel-sapling-9` | آشتی | A real apology (Sam spills paint water on Arash's drawing: say what I did, how they felt, how I will make it right), accepting one, making up; two apologies in order; accepting while still a bit upset | animation, game (`order`, `practice`), story (`talk`) | feel.sap.9 | full |
| 🔨 | `feel-sapling-10` | با هم کار می‌کنیم | Building something together (a block house): every idea heard, deciding together when ideas differ (a house with a tower and a garden), sharing the jobs; building, deciding fairly and tidying up with the family | animation, home (`doit`), parent tip (`forparents`) | feel.sap.10 | full |
| 🔨 | `feel-sapling-11` | راستش را می‌گویم | Telling the truth when I broke something (a vase; Mom thanks Aydin and picks up the pieces herself), keeping a promise to a friend; how trust is built; what builds or takes away trust | animation, story (`talk`), game (`sort`, `practice`), parent tip (`forparents`) | feel.sap.11 | full |
| 🔨 | `feel-sapling-12` | بازی حل مسئله | Game: the traffic-light steps, helpful thoughts, teasing or bullying, what an apology needs, problems and good ways to solve them | game (`order`, `sort`, `pairs`, `practice`) | feel.sap.2, feel.sap.7, feel.sap.8, feel.sap.9 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| 🔨 | `feel-sapling-p1` | Thought bank (Sapling) | `sort` rounds (practice): a situation and a thought, find a more helpful thought | feel.sap.2 |
| 🔨 | `feel-sapling-p2` | Problem bank | `order` rounds (practice): everyday problems (two children, one ball; a lost pencil; a broken promise) through the traffic-light steps | feel.sap.8, feel.sap.9 |
| 🔨 | `feel-sapling-p3` | In their place «جای او بودن» | `pairs` rounds: a moment ↔ the two feelings that come with it; after feel-sapling-4 a strength ↔ an example of it; after feel-sapling-6 someone's situation ↔ how they might feel | feel.sap.1, feel.sap.4, feel.sap.6 |
| 🔨 | `feel-sapling-p4` | Which group? «کدام دسته؟» | `sort` rounds: what calms me and what doesn't, a strength or a thing I own, what helps when a goal gets hard, what shows empathy, teasing or bullying, which traffic light a step belongs to, a real apology or not, good teamwork, what builds trust; each family after its lesson | feel.sap.3, feel.sap.4, feel.sap.5, feel.sap.6, feel.sap.7, feel.sap.8, feel.sap.9, feel.sap.10, feel.sap.11 |
| 🔨 | `feel-sapling-p5` | Step by step «قدم به قدم» | `order` rounds: thought → feeling → action, my calm plan, the steps of a goal, notice-imagine-help, what to do about bullying, working in a group, telling the truth; each family after its lesson, with several stories | feel.sap.2, feel.sap.3, feel.sap.5, feel.sap.6, feel.sap.7, feel.sap.10, feel.sap.11 |
| 🔨 | `feel-sapling-p6` | What do I say? «چه بگویم؟» | `pairs` rounds: a moment ↔ what we can say: two feelings, a kinder thought, my calm plan, a compliment, a goal that got hard, «بس کن!», the problem in words, an apology and accepting one, an idea in a group, the truth; each after its lesson | feel.sap.1, feel.sap.2, feel.sap.3, feel.sap.4, feel.sap.5, feel.sap.7, feel.sap.8, feel.sap.9, feel.sap.10, feel.sap.11 |

### 🌳 درخت — `tree`

Sizing: 3 years × 36 weeks × 1 session = 108 sessions: 14 new lessons and 94 replays and practice. Most children
play alone; discussion (`talk`) becomes reflection, and writing about oneself stays on paper.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.tree.1` | Explain what feelings are for (each one has a message) and that they rise and fall like a wave | awareness | core | — | `talk` in `feel-tree-1` |
| `feel.tree.2` | Use precise feeling words and intensity (کلافه، عصبانی، خشمگین; نگران، مضطرب، وحشت‌زده) | awareness | full | — | `order` (practice) in `feel-tree-2` |
| `feel.tree.3` | Spot thinking traps (all or nothing, always the worst, mind-reading) and answer them | managing | core | — | `sort` (practice) in `feel-tree-3` |
| `feel.tree.4` | Tell a worry I can act on from one I cannot, make a plan for the first and set the second down (worry time, calm tools) | managing | core | — | `sort` (practice) in `feel-tree-4` |
| `feel.tree.5` | Bring my attention back to one thing (the breath, a sound) for a minute | calm | full | — | `breathe` in `feel-tree-5` |
| `feel.tree.6` | Learn from mistakes and talk to myself kindly, as I would to a friend | self | core | — | `talk` in `feel-tree-6` |
| `feel.tree.7` | Plan my day and my work: what first, how long, breaks | self | full | پایه هفتم، تفکر و سبک زندگی (مدیریت زمان) | `order` (practice) and `paper` in `feel-tree-7` |
| `feel.tree.8` | Tell a good friendship from a hurtful one (trust, fairness, respect) | relationships | core | — | `sort` (practice) in `feel-tree-8` |
| `feel.tree.9` | Say what I need clearly and calmly, not by giving in or attacking | relationships | core | — | `sort` (practice) in `feel-tree-9` |
| `feel.tree.10` | Say no to a group and stay myself; find a friend who agrees | decisions | core | — | `talk` in `feel-tree-10` |
| `feel.tree.11` | Be kind in messages and games online, and know what to do when someone is left out or hurt online | relationships | full | — | `sort` (practice) in `feel-tree-11` |
| `feel.tree.12` | Make a decision: options, what each leads to, what matters to me, then choose | decisions | core | پایه ششم، تفکر و پژوهش | `order` (practice) in `feel-tree-12` |
| `feel.tree.13` | Know that grief has many feelings, that it comes in waves, and what helps remember and go on | managing | full | — | `talk` in `feel-tree-13` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ⬜ | `feel-tree-1` | احساس‌ها پیام دارند | What each feeling tells us (fear: be careful; anger: something is unfair; sadness: I lost something that mattered); a feeling is a wave that rises, peaks and falls | animation, story (`talk`), calm (`breathe`) | feel.tree.1 | core |
| ⬜ | `feel-tree-2` | کلمه‌های دقیق‌تر | Feeling words in order of strength; finding the exact word helps; a feelings wheel | animation, game (`order`, `pairs`, `practice`), calm (`feelings`) | feel.tree.2 | full |
| ⬜ | `feel-tree-3` | تله‌های فکر | Thinking traps with everyday examples (a bad mark: «من هیچ‌وقت یاد نمی‌گیرم»); questions that answer them («دلیلش چیست؟ به دوستم چه می‌گفتم؟») | animation, game (`sort`, `practice`), story (`talk`) | feel.tree.3 | core |
| ⬜ | `feel-tree-4` | وقتی نگرانی زیاد است | Worries I can do something about and ones I can't; a plan for the first; "worry time" and calm tools for the second; when to tell a grown-up | animation, game (`sort`, `practice`), calm (`breathe`, `ground`), parent tip (`forparents`) | feel.tree.4 | core |
| ⬜ | `feel-tree-5` | یک دقیقه توجه | Attention like a puppy that wanders: bring it back gently to the breath or a sound; one minute, then two | animation, calm (`breathe`, `ground`) | feel.tree.5 | full |
| ⬜ | `feel-tree-6` | اشتباه و دوباره | Mistakes are how we learn; famous efforts that took many tries; talking to myself as to a friend | animation, story (`talk`), home (`paper`) | feel.tree.6 | core |
| ⬜ | `feel-tree-7` | برنامهٔ روز من | Planning a day: big and small jobs, what first, breaks, sleep and play; a plan on paper | animation, game (`order`, `practice`), home (`paper`), parent tip (`forparents`) | feel.tree.7 | full |
| ⬜ | `feel-tree-8` | دوستی واقعی | What makes a good friend (trust, fairness, keeping secrets that are safe, respect) and signs of a friendship that hurts | animation, game (`sort`, `practice`), story (`talk`) | feel.tree.8 | core |
| ⬜ | `feel-tree-9` | محکم و مهربان | Three ways to answer (giving in, attacking, firm and kind); practising the third with «من» sentences | animation, game (`sort`, `practice`), story (`talk`) | feel.tree.9 | core |
| ⬜ | `feel-tree-10` | نه گفتن به گروه | When friends push me to do something I don't want; ways to say no, to leave, to find one friend who agrees | animation, story (`talk`), game (`sort`, `practice`) | feel.tree.10 | core |
| ⬜ | `feel-tree-11` | مهربانی در پیام‌ها | Kind messages and games online; leaving someone out of a group chat; what to do if someone is hurt (don't share, support them, tell a grown-up). Personal information and strangers online stay in `health-tree-2` | animation, game (`sort`, `practice`), parent tip (`forparents`) | feel.tree.11 | full |
| ⬜ | `feel-tree-12` | تصمیم خوب | Decision steps: what are my options, what happens with each, what matters to me, choose and look back | animation, game (`order`, `practice`), home (`paper`) | feel.tree.12 | core |
| ⬜ | `feel-tree-13` | وقتی کسی را از دست می‌دهیم | Grief, in calm general words (an old grandmother who died, a pet): many feelings at once, waves, no right way to grieve; remembering (a memory box, a story), carrying on, asking for help. No sudden or violent loss shown; the parent sees the note first and decides | animation, story (`talk`), home (`doit`), calm (`breathe`), parent tip (`forparents`) | feel.tree.13 | full |
| ⬜ | `feel-tree-14` | بازی موقعیت‌ها | Game: thinking traps, worry sorting, firm and kind answers, decision steps | game (`sort`, `order`, `pairs`, `practice`) | feel.tree.3, feel.tree.4, feel.tree.9, feel.tree.12 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `feel-tree-p1` | Situation bank (Tree) | `sort` rounds (practice) from everyday situations at home, with friends and online: helpful thought, firm-and-kind answer, a worry I can or can't act on | feel.tree.3, feel.tree.4, feel.tree.9, feel.tree.11 |
| ⬜ | `feel-tree-p2` | Feeling-word ladder | `order` rounds (practice): feeling words by strength, from a bank of about 40 words | feel.tree.2 |

### 🌲 جنگل — `forest`

Sizing: 3 years × 36 weeks × 1 session = 108 sessions: 14 new lessons and 94 replays and practice. Written for
teenagers: respectful, never childish; the characters are teenagers.

#### Objectives

| Code | Can do | Strand | Depth | School | Checked by |
|---|---|---|---|---|---|
| `feel.for.1` | Describe who I am: what I like, what I am good at, where I come from, how I am changing | self | core | پایه هفتم، تفکر و سبک زندگی («من کیستم؟»، خودآگاهی) | `paper` in `feel-forest-1` |
| `feel.for.2` | Name the values that matter to me and use them to choose | self | full | — | `sort` (practice) in `feel-forest-2` |
| `feel.for.3` | Explain why feelings are stronger in the teenage years (a growing brain, sleep) and what helps | awareness | full | — | `talk` in `feel-forest-3` |
| `feel.for.4` | Recognise stress in my body and thoughts, and use healthy ways to cope (not avoiding, not harming) | managing | core | — | `sort` (practice) in `feel-forest-4` |
| `feel.for.5` | Draw on what helped me before, the people around me and hope to get through hard times | hope | core | — | `paper` in `feel-forest-5` |
| `feel.for.6` | Notice how news and social media change how I feel, and take breaks | managing | core | — | `talk` in `feel-forest-6` |
| `feel.for.7` | Understand a view different from mine and disagree with respect | others | full | پایه هشتم، تفکر و سبک زندگی | `talk` in `feel-forest-7` |
| `feel.for.8` | Settle a disagreement by talking: listen, say what I need, look for a way that works for both | relationships | core | پایه هفتم، تفکر و سبک زندگی (مدیریت اختلاف نظر) | `order` (practice) in `feel-forest-8` |
| `feel.for.9` | Tell healthy relationships from unhealthy ones and keep my boundaries, and respect others' | relationships | core | — | `sort` (practice) in `feel-forest-9` |
| `feel.for.10` | Ask for help when things are too heavy, and help a friend who is struggling get to a trusted adult | relationships | core | — | `talk` in `feel-forest-10` |
| `feel.for.11` | Build a habit towards a long goal and keep going when motivation drops | self | full | — | `paper` in `feel-forest-11` |
| `feel.for.12` | Think through a big decision: risks, who influences me, what I will think of it later | decisions | core | — | `order` (practice) in `feel-forest-12` |
| `feel.for.13` | Plan and do something useful for my family, street or community | hope | full | — | `paper` in `feel-forest-13` |

#### Lessons

| St | Lesson | Title | Covers | Content types | Objectives | Depth |
|---|---|---|---|---|---|---|
| ⬜ | `feel-forest-1` | من کیستم؟ | Many parts of me (what I like, what I'm good at, family, language, place); how I am changing and what stays; a map of me on paper | animation, home (`paper`), story (`talk`) | feel.for.1 | core |
| ⬜ | `feel-forest-2` | ارزش‌های من | What matters most to me (fairness, family, learning, kindness, freedom to create…); choosing my five; using them in a decision | animation, game (`sort`, `practice`), home (`paper`) | feel.for.2 | full |
| ⬜ | `feel-forest-3` | احساس‌ها در نوجوانی | A growing brain: feelings get faster than the "brakes"; why sleep matters; it is normal and it settles (puberty itself is in `health-tree-3`) | animation, story (`talk`), parent tip (`forparents`) | feel.for.3 | full |
| ⬜ | `feel-forest-4` | استرس و کنار آمدن | Some stress helps, too much hurts; signs in the body and thoughts; helpful ways (move, breathe, talk, plan, rest) and ones that make it worse. Sleep and screens are in `health-forest-2` | animation, game (`sort`, `practice`), calm (`breathe`, `relax`) | feel.for.4 | core |
| ⬜ | `feel-forest-5` | تاب‌آوری | Getting through: what helped me before, the people around me, small things I can control, hope for later; a resilience map on paper | animation, home (`paper`), story (`talk`), parent tip (`forparents`) | feel.for.5 | core |
| ⬜ | `feel-forest-6` | خبر، شبکه و حال من | How scrolling and bad news change my mood; noticing it, taking breaks, choosing what I follow, talking about it. No real news, no images of events | animation, story (`talk`), calm (`ground`), parent tip (`forparents`) | feel.for.6 | core |
| ⬜ | `feel-forest-7` | از نگاه او | Two friends who see the same thing differently; listening to understand, asking questions, agreeing to disagree with respect | animation, story (`talk`), game (`sort`, `practice`) | feel.for.7 | full |
| ⬜ | `feel-forest-8` | حل اختلاف | Steps to settle a disagreement: calm down, each one speaks and is heard, what each needs, ideas, a choice that works for both | animation, game (`order`, `practice`), story (`talk`) | feel.for.8 | core |
| ⬜ | `feel-forest-9` | رابطه‌های سالم | Respect, trust and honesty in friendships and family; pressure, control and jealousy as warning signs; my boundaries and others'; who to tell. Body safety stays in `health-all-1` | animation, game (`sort`, `practice`), story (`talk`), parent tip (`forparents`) | feel.for.9 | core |
| ⬜ | `feel-forest-10` | کمک خواستن | When feelings stay heavy for weeks, asking for help is strong, not weak; who can help; how to start; when a friend is struggling: listen, don't keep it secret if they are in danger, go with them to a trusted adult | animation, story (`talk`), parent tip (`forparents`) | feel.for.10 | core |
| ⬜ | `feel-forest-11` | هدف و عادت | A long goal in small daily habits; tracking on paper; what to do on days motivation is gone | animation, home (`paper`), game (`order`, `practice`) | feel.for.11 | full |
| ⬜ | `feel-forest-12` | تصمیم‌های بزرگ | Risky choices, the pull of friends and adverts, how I will see it in a year; decision steps for big choices | animation, game (`order`, `sort`, `practice`), story (`talk`) | feel.for.12 | core |
| ⬜ | `feel-forest-13` | کاری برای دیگران | A small project to help: teaching a younger sibling, helping a neighbour, planting a tree on the street; plan it, do it, look back | animation, home (`paper`, `doit`), parent tip (`forparents`) | feel.for.13 | full |
| ⬜ | `feel-forest-14` | بازی موقعیت‌ها | Game: coping that helps or hurts, healthy or unhealthy, the steps to settle a disagreement and to decide | game (`sort`, `order`, `practice`) | feel.for.4, feel.for.8, feel.for.9, feel.for.12 | core |

#### Practice

| St | Id | Practice | What it makes | Objectives |
|---|---|---|---|---|
| ⬜ | `feel-forest-p1` | Situation bank (Forest) | `sort` and `order` rounds (practice): coping choices, relationship signs, disagreement and decision steps, with teenage characters | feel.for.4, feel.for.8, feel.for.9, feel.for.12 |
| ⬜ | `feel-forest-p2` | Journal prompts on paper | One question a week to write about on paper, never on screen («امروز چه چیزی به من انرژی داد؟») | feel.for.1, feel.for.5 |

### For the psychologist

A child psychologist (trauma-informed, Persian-speaking, ideally with experience of children affected by conflict
or displacement) must review, before launch:

1. **The new lessons for every age that touch hard experiences:** `feel-16` (reactions after hard days: is it right
   to name them to a child, and in which words), `feel-12` (missing someone), `feel-14` (helpers far away: a child
   whose family is separated), `feel-13` (a safe place: some children have no place that feels safe, or lost it),
   `feel-15` (the butterfly hug, from EMDR: suitable as everyday self-soothing?).
2. **Loss:** whether `feel-tree-13` (grief) should be built at all, at what garden, and how a parent chooses it; how
   the other lessons avoid death so that a bereaved child is not hurt by surprise.
3. **Every line said to the child** in Persian, especially the replies to the check-in when the child picks worried,
   sad, angry or scared, and anything about bullying, healthy relationships and peer pressure.
4. **The parent notes** (`forparents`, `guide.html#feelings`): the list of common reactions by age, when to get
   professional help, what to do if a child talks about self-harm, and help that exists inside Iran.
5. **The Forest lessons** `feel-forest-4/5/6/9/10` (stress, resilience, news, relationships, help-seeking): safe
   messaging, nothing that could lead a teenager to self-harm content, a clear way to a trusted adult.
6. **The leveling** of each lesson: which garden, and which lessons should stay for every age.
7. **The built lessons** `feel-1` to `feel-11`, as already noted.
8. **The Seed lessons** `feel-seed-1` to `feel-seed-8` (built 2026-10-19, not yet reviewed): the turtle (`feel-seed-2`:
   is "into the shell" suitable, and is it never felt as a punishment?), the goodbye (`feel-seed-6`: Mom comes back
   "as she said", not "always", for children whose family is separated; is the parent note enough?), doing it myself
   (`feel-seed-7`: the note that a child may lose skills after hard times), and the Seed lines said to the child.
   Also the five new lessons for every age as built: the butterfly hug's wording, the safe place offered as real
   or made up, helpers "far away", the missing-someone lesson kept to someone who moved (no death), and the list of
   common reactions in `feel-16`'s parent note.
