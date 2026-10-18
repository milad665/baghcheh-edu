/* باغچه — فارسی (reading and writing) lessons.
   After any change run  node tools/check-reading.js : words a child decodes may use only letters taught so far.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

B.LESSONS.push(
  // ---------------- Reading: Seed (seeing and talking, before letters) ----------------
  {
    id: "read-seed-1", subject: "read", level: "seed", emoji: "🔍", title: "کدام شبیه است؟",
    steps: [
      { type: "choose", show: "▲", prompt: "کدام شبیه این است؟", options: ["●", "▲", "■"], answer: "▲" },
      { type: "choose", show: "⭐", prompt: "کدام شبیه این است؟", options: ["🌙", "☀️", "⭐"], answer: "⭐", pic: true },
      { type: "choose", show: "ب", prompt: "کدام شبیه این است؟", options: ["ن", "ب", "م"], answer: "ب" },
      { type: "choose", show: "م", prompt: "کدام شبیه این است؟", options: ["م", "س", "د"], answer: "م" },
      { type: "choose", show: "آ", prompt: "کدام شبیه این است؟", options: ["د", "ب", "آ"], answer: "آ" },
      { type: "choose", show: "س", prompt: "کدام شبیه این است؟", options: ["ش", "س", "ب"], answer: "س" }
    ]
  },
  {
    id: "read-seed-2", subject: "read", level: "seed", emoji: "🗣️", title: "با هم ببینیم و بگوییم",
    steps: [
      { type: "talk", scene: "🏡 🌳 👧 🐈 ☀️", caption: "یک روز آفتابی در حیاط" },
      { type: "talk", scene: "🌧️ ☂️ 👦 🐕 🌈", caption: "یک روز بارانی" },
      { type: "talk", scene: "🍞 🧀 🍉 👵 👶", caption: "سفره صبحانه" }
    ]
  },

  {
    id: "read-seed-3", subject: "read", level: "seed", emoji: "🎴", title: "بازی ببین و پیدا کن",
    steps: [
      { type: "story", prompt: "به قصه نگاه کن و گوش بده",
        cast: { tree: "🌳", sun: "☀️", girl: "👧", ball: "⚽", cat: "🐈" },
        scenes: [
          { caption: "سارا در حیاط توپ‌بازی می‌کند.", at: { tree: [14, 52, { size: 1.8 }], sun: [88, 16], girl: [72, 62, { size: 1.2 }], ball: [56, 74, { size: 0.7 }] } },
          { caption: "گربه از پشت درخت بیرون می‌آید.", at: { cat: [24, 72, { flip: true }] } },
          { caption: "توپ قِل می‌خورد و می‌رود پیش گربه.", at: { ball: [42, 76, { size: 0.7, act: "spin" }] } },
          { caption: "گربه با توپ بازی می‌کند. سارا می‌خندد.", at: { cat: [33, 70, { flip: true, act: "bounce" }], girl: [64, 62, { size: 1.2, act: "bounce" }] } }
        ],
        question: "گربه با چه بازی کرد؟", pic: true,
        options: [{ label: "🧶", value: "کاموا" }, { label: "⚽", value: "توپ" }, { label: "🪁", value: "بادبادک" }], answer: "توپ" },
      { type: "pairs", prompt: "جفت هر شکل را پیدا کن",
        pairs: [["ب", "ب"], ["م", "م"], ["س", "س"], ["آ", "آ"]] },
      { type: "pairs", hidden: true, pairs: [["🐈", "🐈"], ["🌳", "🌳"], ["☀️", "☀️"]] },
      { type: "order", prompt: "اول دانه بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: ["🌰", "🌱", "🌿", "🌳"] },
      { type: "pattern", prompt: "بعدی کدام است؟", seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], options: ["🔴", "🔵", "🟡"] },
      { type: "order", prompt: "اول تخم بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: ["🥚", "🐣", "🐥", "🐔"] }
    ]
  },

  // Seed lessons 4–10 are all heard: everything the child needs is said aloud, and pictures carry the words.
  // `say` on a picture is the word it stands for; a tap says it.
  {
    id: "read-seed-4", subject: "read", level: "seed", emoji: "🐭", title: "کلمه‌های هم‌قافیه",
    steps: [
      { type: "story", prompt: "گوش بده: آخر این کلمه‌ها چه صدایی دارد؟",
        cast: { mouse: "🐭", ear: "👂", lion: "🦁", cheese: "🧀" },
        scenes: [
          { caption: "این موش است.", at: { mouse: [70, 50, { size: 1.6 }] } },
          { caption: "این گوش است.", at: { ear: [30, 50, { size: 1.6, act: "grow" }] } },
          { caption: "موش، گوش! آخرشان یک‌جور صدا می‌دهد.", at: { mouse: [62, 50, { size: 1.6, act: "bounce" }], ear: [38, 50, { size: 1.6, act: "bounce" }] } },
          { caption: "به این‌ها می‌گوییم کلمه‌های هم‌قافیه.", at: { mouse: [70, 30, { size: 1.1 }], ear: [30, 30, { size: 1.1 }] } },
          { caption: "شیر، پنیر! این‌ها هم هم‌قافیه‌اند.", at: { lion: [70, 72, { size: 1.4, act: "bounce" }], cheese: [30, 72, { size: 1.4, act: "bounce" }] } }
        ] },
      { type: "choose", show: "🐭", prompt: "کدام با «موش» هم‌قافیه است؟", say: "موش. کدام با موش هم‌قافیه است؟ سیب؟ گوش؟ ماه؟", pic: true,
        options: [{ label: "🍎", value: "سیب" }, { label: "👂", value: "گوش" }, { label: "🌙", value: "ماه" }], answer: "گوش" },
      { type: "choose", show: "🌙", prompt: "کدام با «ماه» هم‌قافیه است؟", say: "ماه. کدام با ماه هم‌قافیه است؟ ماهی؟ نان؟ کلاه؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🍞", value: "نان" }, { label: "🧢", value: "کلاه" }], answer: "کلاه" },
      { type: "choose", show: "🐍", prompt: "کدام با «مار» هم‌قافیه است؟", say: "مار. کدام با مار هم‌قافیه است؟ خیار؟ گربه؟ توپ؟", pic: true,
        options: [{ label: "🥒", value: "خیار" }, { label: "🐈", value: "گربه" }, { label: "⚽", value: "توپ" }], answer: "خیار" },
      { type: "choose", show: "🌳", prompt: "کدام با «درخت» هم‌قافیه است؟", say: "درخت. کدام با درخت هم‌قافیه است؟ گل؟ تخت؟ دست؟", pic: true,
        options: [{ label: "🌸", value: "گل" }, { label: "✋", value: "دست" }, { label: "🛏️", value: "تخت" }], answer: "تخت" },
      { type: "choose", show: "🦁", prompt: "کدام با «شیر» هم‌قافیه است؟", say: "شیر. کدام با شیر هم‌قافیه است؟ پنیر؟ موز؟ خرس؟", pic: true,
        options: [{ label: "🍌", value: "موز" }, { label: "🧀", value: "پنیر" }, { label: "🐻", value: "خرس" }], answer: "پنیر" },
      { type: "pairs", prompt: "روی هر تصویر بزن و اسمش را بشنو. دو تصویر هم‌قافیه را با هم جفت کن.",
        pairs: [[{ pic: "🐭", say: "موش" }, { pic: "👂", say: "گوش" }], [{ pic: "🌸", say: "گل" }, { pic: "🌉", say: "پل" }],
          [{ pic: "🍞", say: "نان" }, { pic: "🦷", say: "دندان" }], [{ pic: "🐍", say: "مار" }, { pic: "🥒", say: "خیار" }]] }
    ]
  },
  {
    id: "read-seed-5", subject: "read", level: "seed", emoji: "👏", title: "دست بزن، بشمار",
    steps: [
      { type: "story", prompt: "ببین کیان چطور کلمه‌ها را تکه‌تکه می‌گوید",
        cast: { boy: "👦", dad: "👨", ball: "⚽", fly: "🦋", c1: "👏", c2: "👏", c3: "👏" },
        scenes: [
          { caption: "کیان کلمه‌ها را تکه‌تکه می‌گوید و با هر تکه دست می‌زند.", at: { boy: [78, 50, { size: 1.6 }] } },
          { caption: "بابا", say: "بابا. با ... با", at: { dad: [46, 24, { size: 1.3 }], c1: [36, 70, { act: "bounce" }], c2: [56, 70, { act: "bounce" }] } },
          { caption: "دو تکه، دو بار دست.", at: { c1: [36, 70, { act: "grow" }], c2: [56, 70, { act: "grow" }] } },
          { caption: "توپ", say: "توپ. توپ", at: { dad: null, c2: null, ball: [46, 24, { size: 1.3 }], c1: [46, 70, { act: "bounce" }] } },
          { caption: "یک تکه، یک بار دست.", at: { c1: [46, 70, { act: "grow" }] } },
          { caption: "پروانه", say: "پروانه. پَر ... وا ... نه", at: { ball: null, fly: [46, 24, { size: 1.3 }], c1: [26, 70, { act: "bounce" }], c2: [46, 70, { act: "bounce" }], c3: [66, 70, { act: "bounce" }] } },
          { caption: "سه تکه، سه بار دست. حالا تو امتحان کن!", at: { boy: [78, 50, { size: 1.6, act: "bounce" }] } }
        ] },
      { type: "clap", pic: "👨", word: "بابا", parts: ["با", "با"] },
      { type: "clap", pic: "⚽", word: "توپ", parts: ["توپ"] },
      { type: "clap", pic: "🦋", word: "پروانه", parts: ["پَر", "وا", "نه"] },
      { type: "choose", show: "🚗", prompt: "«ماشین» چند تکه دارد؟", say: "ماشین. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "2" },
      { type: "choose", show: "🍎", prompt: "«سیب» چند تکه دارد؟", say: "سیب. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "1" },
      { type: "clap", pic: "🦒", word: "زرافه", parts: ["زَ", "را", "فه"] },
      { type: "choose", show: "🐈", prompt: "«گربه» چند تکه دارد؟", say: "گربه. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "2" }
    ]
  },
  {
    id: "read-seed-6", subject: "read", level: "seed", emoji: "🐟", title: "با چه صدایی شروع می‌شود؟",
    steps: [
      { type: "story", prompt: "گوش بده: اول هر کلمه چه صدایی دارد؟",
        cast: { fish: "🐟", mouse: "🐭", apple: "🍎" },
        scenes: [
          { caption: "ماهی با صدای «مـ» شروع می‌شود.", say: "ماهی. مـ ... ماهی. ماهی با صدای مـ شروع می‌شود.", at: { fish: [70, 45, { size: 1.6, act: "bounce" }], mouse: null, apple: null } },
          { caption: "موش هم با صدای «مـ» شروع می‌شود.", say: "موش. مـ ... موش. موش هم با صدای مـ شروع می‌شود.", at: { mouse: [45, 45, { size: 1.6, act: "bounce" }] } },
          { caption: "سیب با صدای «سـ» شروع می‌شود.", say: "سیب. سـ ... سیب. سیب با صدای سـ شروع می‌شود.", at: { apple: [20, 45, { size: 1.6, act: "bounce" }] } },
          { caption: "ماهی و موش اولشان مثل هم است. سیب نه!", at: { fish: [70, 45, { size: 1.6, act: "grow" }], mouse: [50, 45, { size: 1.6, act: "grow" }], apple: [20, 45, { size: 1.2 }] } }
        ] },
      { type: "choose", show: "🐟", prompt: "کدام هم مثل «ماهی» شروع می‌شود؟", say: "ماهی. کدام هم مثل ماهی شروع می‌شود؟ موش؟ سیب؟ توپ؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🍎", value: "سیب" }, { label: "⚽", value: "توپ" }], answer: "موش" },
      { type: "choose", show: "🍎", prompt: "کدام هم مثل «سیب» شروع می‌شود؟", say: "سیب. کدام هم مثل سیب شروع می‌شود؟ نان؟ گربه؟ سبد؟", pic: true,
        options: [{ label: "🍞", value: "نان" }, { label: "🐈", value: "گربه" }, { label: "🧺", value: "سبد" }], answer: "سبد" },
      { type: "choose", show: "👨", prompt: "کدام هم مثل «بابا» شروع می‌شود؟", say: "بابا. کدام هم مثل بابا شروع می‌شود؟ ماهی؟ باران؟ سیر؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🌧️", value: "باران" }, { label: "🧄", value: "سیر" }], answer: "باران" },
      { type: "sort", prompt: "روی هر تصویر بزن و اسمش را بشنو. مثل «ماهی» شروع می‌شود یا مثل «سیب»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل ماهی شروع می‌شود یا مثل سیب؟",
        baskets: [{ pic: "🐟", value: "م" }, { pic: "🍎", value: "س" }],
        items: [{ pic: "🐭", say: "موش", basket: "م" }, { pic: "🧄", say: "سیر", basket: "س" }, { pic: "🍌", say: "موز", basket: "م" },
          { pic: "⭐", say: "ستاره", basket: "س" }, { pic: "🚗", say: "ماشین", basket: "م" }, { pic: "🧺", say: "سبد", basket: "س" }] },
      { type: "sort", prompt: "مثل «بابا» شروع می‌شود یا مثل «توپ»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل بابا شروع می‌شود یا مثل توپ؟",
        baskets: [{ pic: "👨", value: "ب" }, { pic: "⚽", value: "ت" }],
        items: [{ pic: "🌬️", say: "باد", basket: "ب" }, { pic: "🛏️", say: "تخت", basket: "ت" }, { pic: "🍆", say: "بادمجان", basket: "ب" },
          { pic: "🥚", say: "تخم‌مرغ", basket: "ت" }, { pic: "🐑", say: "بره", basket: "ب" }, { pic: "🍓", say: "توت‌فرنگی", basket: "ت" }] },
      { type: "pairs", prompt: "دو تصویری را جفت کن که اولشان مثل هم است.",
        say: "روی هر تصویر بزن و اسمش را بشنو. دو تصویری را جفت کن که اولشان مثل هم است.",
        pairs: [[{ pic: "🐟", say: "ماهی" }, { pic: "🐭", say: "موش" }], [{ pic: "🍎", say: "سیب" }, { pic: "⭐", say: "ستاره" }],
          [{ pic: "👨", say: "بابا" }, { pic: "🌧️", say: "باران" }], [{ pic: "⚽", say: "توپ" }, { pic: "🛏️", say: "تخت" }]] }
    ]
  },
  {
    id: "read-seed-7", subject: "read", level: "seed", emoji: "👂", title: "قصه گوش کن",
    steps: [
      { type: "story", prompt: "به قصه گوش کن", bg: "street",
        cast: { boy: "👦", gran: "👵", bread: "🫓", cheese: "🧀", tea: "🫖" },
        scenes: [
          { caption: "صبح است. نیما و مادربزرگ به نانوایی می‌روند.", at: { boy: [70, 62, { size: 1.2 }], gran: [84, 58, { size: 1.4 }] } },
          { caption: "نانوا نان سنگک گرم می‌پزد.", at: { boy: [52, 62, { size: 1.2 }], gran: [66, 58, { size: 1.4 }], bread: [24, 56, { size: 1.4, act: "grow" }] } },
          { caption: "نیما نان گرم را بغل می‌کند. چه بوی خوبی!", at: { bread: [44, 56, { size: 1.2, act: "bounce" }], boy: [50, 62, { size: 1.2, act: "bounce" }] } },
          { caption: "در خانه، همه سر سفره صبحانه نان و پنیر و چای می‌خورند.", bg: "room", at: { bread: [36, 76], cheese: [50, 78], tea: [64, 76], boy: [24, 56, { size: 1.2 }], gran: [76, 60, { size: 1.4 }] } }
        ],
        question: "نیما و مادربزرگ کجا رفتند؟", pic: true,
        options: [{ label: "🏫", value: "مدرسه" }, { label: "🫓", value: "نانوایی" }, { label: "🌳", value: "پارک" }], answer: "نانوایی" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "👵👦", say: "نیما و مادربزرگ به نانوایی رفتند" }, { pic: "🫓", say: "نانوا نان پخت" }, { pic: "🧀", say: "سر سفره صبحانه خوردند" }] },
      { type: "story", prompt: "به قصه گوش کن",
        cast: { rain: "🌧️", girl: "👧", umbrella: "☂️", rainbow: "🌈", sun: "☀️" },
        scenes: [
          { caption: "در رشت باران می‌بارد.", at: { rain: [50, 18, { size: 1.6 }], girl: [70, 70, { size: 1.3 }] } },
          { caption: "ترانه چترش را باز می‌کند و به حیاط می‌رود.", at: { umbrella: [44, 54, { size: 1.4, act: "grow" }], girl: [48, 72, { size: 1.3 }] } },
          { caption: "باران بند می‌آید. رنگین‌کمان در آسمان پیدا می‌شود.", at: { rain: null, umbrella: null, sun: [84, 16], rainbow: [36, 24, { size: 2, act: "grow" }] } },
          { caption: "ترانه رنگین‌کمان را نگاه می‌کند و می‌خندد.", at: { girl: [52, 70, { size: 1.3, act: "bounce" }] } }
        ],
        question: "ترانه آخر قصه چه حسی داشت؟", pic: true,
        options: [{ label: "😢", value: "ناراحت" }, { label: "😄", value: "خوشحال" }, { label: "😠", value: "عصبانی" }], answer: "خوشحال" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "🌧️", say: "باران آمد" }, { pic: "☂️", say: "ترانه چترش را باز کرد" }, { pic: "🌈", say: "رنگین‌کمان پیدا شد" }] },
      { type: "story", prompt: "به قصه گوش کن", bg: "garden",
        cast: { boy: "👦", kite: "🪁", tree: "🌳", grandpa: "👴" },
        scenes: [
          { caption: "آرش در باغ بادبادک هوا می‌کند.", at: { tree: [24, 50, { size: 2.4 }], boy: [72, 72, { size: 1.2 }], kite: [62, 22, { act: "bounce" }] } },
          { caption: "باد تند می‌آید. بادبادک روی درخت گیر می‌کند.", at: { kite: [26, 30, { act: "shake" }] } },
          { caption: "آرش ناراحت است. بادبادکش را می‌خواهد.", at: { boy: [60, 72, { size: 1.2 }] } },
          { caption: "پدربزرگ با یک چوب بلند بادبادک را پایین می‌آورد.", at: { grandpa: [42, 66, { size: 1.4 }], kite: [44, 46, { act: "spin" }] } },
          { caption: "آرش خوشحال می‌شود و از پدربزرگ تشکر می‌کند.", at: { kite: [60, 54], boy: [62, 72, { size: 1.2, act: "bounce" }] } }
        ],
        question: "وقتی بادبادک روی درخت گیر کرد، آرش چه حسی داشت؟", pic: true,
        options: [{ label: "😄", value: "خوشحال" }, { label: "😢", value: "ناراحت" }, { label: "😴", value: "خواب‌آلود" }], answer: "ناراحت" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "🪁", say: "آرش بادبادک هوا کرد" }, { pic: "🌳", say: "بادبادک روی درخت گیر کرد" }, { pic: "👴", say: "پدربزرگ بادبادک را پایین آورد" }] },
      { type: "talk", scene: "👦 👵 🫓 🧀 🫖", caption: "قصه نانوایی را تو برای ما تعریف کن. اول چه شد؟" }
    ]
  },
  {
    id: "read-seed-8", subject: "read", level: "seed", emoji: "📖", title: "کتاب از کجا شروع می‌شود؟",
    steps: [
      { type: "story", prompt: "ببین کتاب فارسی را چطور می‌خوانیم", tall: true,
        cast: { book: "📖", line1: "بابا آب داد.", line2: "سارا توپ دارد.", finger: "👆" },
        scenes: [
          { caption: "این یک کتاب قصه است. در کتاب، هم تصویر هست و هم نوشته.", at: { book: [50, 40, { size: 2.6, act: "grow" }], line1: null, line2: null, finger: null } },
          { caption: "نوشته‌ها را از سمت راست شروع می‌کنیم.", at: { book: null, line1: [50, 30], finger: [74, 46, { act: "bounce" }] } },
          { caption: "انگشت از راست به چپ می‌رود.", at: { finger: [28, 46] } },
          { caption: "خط اول تمام شد. حالا می‌رویم خط پایین.", at: { line2: [50, 62], finger: [74, 78, { act: "bounce" }] } },
          { caption: "باز هم از راست به چپ.", at: { finger: [28, 78] } },
          { caption: "بین کلمه‌ها کمی جای خالی هست. این‌طوری کلمه‌ها را از هم جدا می‌کنیم.", at: { finger: null, line1: [50, 30, { act: "grow" }], line2: [50, 62, { act: "grow" }] } }
        ] },
      { type: "choose", prompt: "کدام نوشته است؟", say: "یکی نقاشی است و یکی نوشته. کدام نوشته است؟",
        options: [{ label: "🐈", value: "نقاشی" }, { label: "گربه", value: "نوشته" }], answer: "نوشته" },
      { type: "choose", prompt: "کدام نوشته است؟", say: "کدام نوشته است؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🌳", value: "درخت" }, { label: "ماهی", value: "نوشته" }], answer: "نوشته" },
      { type: "choose", prompt: "ستاره جایی است که خواندن شروع می‌شود. کدام درست است؟",
        say: "ستاره جایی است که خواندن شروع می‌شود. در فارسی از کدام طرف شروع می‌کنیم؟ کدام درست است؟", stack: true,
        options: [{ label: "بابا آب داد ⭐", value: "left" }, { label: "⭐ بابا آب داد", value: "right" }], answer: "right" },
      { type: "choose", show: "سارا توپ دارد", prompt: "چند کلمه می‌بینی؟", say: "سارا توپ دارد. بین کلمه‌ها جای خالی هست. چند کلمه می‌بینی؟",
        options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", show: "باران آمد", prompt: "چند کلمه می‌بینی؟", say: "باران آمد. چند کلمه می‌بینی؟",
        options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", show: "مریم گل دارد", prompt: "اولین کلمه کدام است؟", say: "مریم گل دارد. اولین کلمه را پیدا کن. یادت باشد از راست شروع می‌کنیم.",
        options: ["دارد", "گل", "مریم"], answer: "مریم" },
      { type: "talk", scene: "📖 👧 👨", caption: "با هم یک کتاب قصه بخوانید. کتاب از کجا شروع می‌شود؟ انگشتت را زیر نوشته‌ها از راست به چپ ببر." }
    ]
  },
  {
    id: "read-seed-9", subject: "read", level: "seed", emoji: "🖍️", title: "خط‌های رنگی",
    steps: [
      { type: "trace", path: "down", prompt: "باران از بالا می‌بارد. از بالا به پایین خط بکش.",
        say: "باران از بالا می‌بارد. اول ببین، بعد با انگشتت از بالا به پایین خط بکش." },
      { type: "trace", path: "across", prompt: "از راست به چپ خط بکش، مثل وقتی فارسی می‌نویسیم.",
        say: "حالا از راست به چپ خط بکش. فارسی را هم از راست به چپ می‌نویسیم." },
      { type: "trace", path: "slant", prompt: "باد می‌آید و باران کج می‌بارد. کج خط بکش.",
        say: "باد می‌آید و باران کج می‌بارد. از بالا شروع کن و کج پایین بیا." },
      { type: "trace", path: "bowl", prompt: "یک کاسه بکش.", say: "یک کاسه بکش. از راست شروع کن، پایین برو و دوباره بالا بیا." },
      { type: "trace", path: "hills", prompt: "از روی تپه‌ها بپر.", say: "خرگوش از روی تپه‌ها می‌پرد. از راست شروع کن و از روی تپه‌ها بپر." },
      { type: "trace", path: "wave", prompt: "موج‌های دریا را بکش.", say: "موج‌های دریا بالا و پایین می‌روند. از راست شروع کن." },
      { type: "trace", path: "zigzag", prompt: "کوه‌ها را بکش.", say: "کوه‌ها را بکش: بالا، پایین، بالا، پایین. از راست شروع کن." },
      { type: "trace", path: "circle", prompt: "یک دایره بکش، مثل خورشید.", say: "یک دایره بکش، گرد مثل خورشید. از بالا شروع کن و دور بزن تا به همان‌جا برسی." },
      { type: "doit", pic: "🖍️", text: "حالا روی کاغذ با مداد رنگی خط بکش.",
        list: ["باران: از بالا به پایین", "راه: از راست به چپ", "موج و کوه", "یک خورشید گرد"] }
    ]
  },
  {
    id: "read-seed-10", subject: "read", level: "seed", emoji: "🎶", title: "بازی صداها",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        say: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        pairs: [[{ pic: "🐭", say: "موش" }, { pic: "👂", say: "گوش" }], [{ pic: "🌳", say: "درخت" }, { pic: "🛏️", say: "تخت" }],
          [{ pic: "🌙", say: "ماه" }, { pic: "🧢", say: "کلاه" }]] },
      { type: "sort", prompt: "هم‌قافیه با «موش» است یا با «پنیر»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. هم‌قافیه با موش است یا با پنیر؟",
        baskets: [{ pic: "🐭", value: "موش" }, { pic: "🧀", value: "پنیر" }],
        items: [{ pic: "👂", say: "گوش", basket: "موش" }, { pic: "🦁", say: "شیر", basket: "پنیر" }, { pic: "🐰", say: "خرگوش", basket: "موش" },
          { pic: "🧄", say: "سیر", basket: "پنیر" }] },
      { type: "sort", prompt: "یک بار دست می‌زنی یا دو بار؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. با هر تکه دست بزن. یک بار دست می‌زنی یا دو بار؟",
        baskets: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }],
        items: [{ pic: "⚽", say: "توپ", basket: "1" }, { pic: "🐟", say: "ماهی", basket: "2" }, { pic: "🍎", say: "سیب", basket: "1" },
          { pic: "🐈", say: "گربه", basket: "2" }, { pic: "🐭", say: "موش", basket: "1" }, { pic: "🚗", say: "ماشین", basket: "2" }] },
      { type: "sort", prompt: "مثل «پنگوئن» شروع می‌شود یا مثل «در»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل پنگوئن شروع می‌شود یا مثل در؟",
        baskets: [{ pic: "🐧", value: "پ" }, { pic: "🚪", value: "د" }],
        items: [{ pic: "🦋", say: "پروانه", basket: "پ" }, { pic: "🦷", say: "دندان", basket: "د" }, { pic: "🧀", say: "پنیر", basket: "پ" },
          { pic: "✋", say: "دست", basket: "د" }, { pic: "🪶", say: "پر", basket: "پ" }, { pic: "🌊", say: "دریا", basket: "د" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. دو تصویری را پیدا کن که اولشان مثل هم است.",
        say: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویری را پیدا کن که اولشان مثل هم است.",
        pairs: [[{ pic: "🍎", say: "سیب" }, { pic: "⭐", say: "ستاره" }], [{ pic: "👨", say: "بابا" }, { pic: "🌧️", say: "باران" }],
          [{ pic: "🐟", say: "ماهی" }, { pic: "🍌", say: "موز" }]] }
    ]
  },

  // ---------------- Reading: Sprout (first letters, syllables and words) ----------------
  {
    id: "read-sprout-1", subject: "read", level: "sprout", emoji: "💧", title: "«آ» و «ب»",
    steps: [
      { type: "intro", letter: "آ", text: "این «آ» است؛ مثل صدای اول «آب».", say: "آ. مثل آب",
        forms: [["آ", "اول کلمه"], ["ا", "وسط و آخر"], ["ـا", "چسبیده"]], example: { pic: "💧", word: "آب" } },
      { type: "intro", letter: "ب", text: "این «ب» است؛ مثل صدای اول «بابا».", say: "ب. مثل بابا",
        forms: [["ب", "تنها"], ["بـ", "اول"], ["ـبـ", "وسط"], ["ـب", "آخر"]], example: { pic: "👨", word: "بابا" } },
      { type: "choose", prompt: "«ب» را پیدا کن", say: "ب را پیدا کن", options: ["آ", "ب", "م", "ن"], answer: "ب" },
      { type: "choose", prompt: "«آ» را پیدا کن", say: "آ را پیدا کن", options: ["ب", "د", "آ", "ر"], answer: "آ" },
      { type: "trace", letter: "ب", prompt: "با انگشتت «ب» بنویس" },
      { type: "blend", parts: ["آ", "ب"], word: "آب", pic: "💧", say: "آ ... ب ... آب" },
      { type: "blend", parts: ["با", "با"], word: "بابا", pic: "👨", say: "با ... با ... بابا" },
      { type: "choose", show: "آب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "👨", value: "بابا" }, { label: "💧", value: "آب" }], answer: "آب", pic: true },
      { type: "choose", show: "💧", prompt: "کدام کلمه «آب» است؟", say: "کدام کلمه آب است؟", options: ["بابا", "آب"], answer: "آب" }
    ]
  },
  {
    id: "read-sprout-2", subject: "read", level: "sprout", emoji: "🌰", title: "«د» و «م»",
    steps: [
      { type: "intro", letter: "د", text: "این «د» است؛ مثل صدای آخر «باد». «د» به حرف بعدی نمی‌چسبد.", say: "د. مثل باد",
        forms: [["د", "تنها"], ["ـد", "آخر"]], example: { pic: "🌬️", word: "باد" } },
      { type: "intro", letter: "م", text: "این «م» است؛ مثل صدای آخر «بام».", say: "م. مثل بام",
        forms: [["م", "تنها"], ["مـ", "اول"], ["ـمـ", "وسط"], ["ـم", "آخر"]], example: { pic: "🏠", word: "بام" } },
      { type: "choose", prompt: "«د» را پیدا کن", say: "د را پیدا کن", options: ["ر", "ب", "د", "م"], answer: "د" },
      { type: "choose", prompt: "«م» را پیدا کن", say: "م را پیدا کن", options: ["م", "آ", "د", "ب"], answer: "م" },
      { type: "trace", letter: "م", prompt: "با انگشتت «م» بنویس" },
      { type: "blend", parts: ["با", "د"], word: "باد", pic: "🌬️", say: "با ... د ... باد" },
      { type: "blend", parts: ["با", "م"], word: "بام", pic: "🏠", say: "با ... م ... بام" },
      { type: "blend", parts: ["با", "دام"], word: "بادام", pic: "🌰", say: "با ... دام ... بادام" },
      { type: "choose", show: "بادام", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🏠", value: "بام" }, { label: "🌰", value: "بادام" }, { label: "🌬️", value: "باد" }], answer: "بادام", pic: true },
      { type: "choose", show: "بام", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌬️", value: "باد" }, { label: "💧", value: "آب" }, { label: "🏠", value: "بام" }], answer: "بام", pic: true },
      { type: "choose", show: "🌬️", prompt: "کدام کلمه «باد» است؟", say: "کدام کلمه باد است؟", options: ["بام", "باد", "بابا"], answer: "باد" }
    ]
  },
  {
    id: "read-sprout-3", subject: "read", level: "sprout", emoji: "🐴", title: "«س» و «ـَ»",
    steps: [
      { type: "intro", letter: "س", text: "این «س» است؛ مثل صدای اول «سَبَد».", say: "س. مثل سبد",
        forms: [["س", "تنها"], ["سـ", "اول"], ["ـسـ", "وسط"], ["ـس", "آخر"]], example: { pic: "🧺", word: "سَبَد" } },
      { type: "intro", letter: "اَ", text: "این نشانه «زَبَر» است و صدای «اَ» می‌دهد. اول کلمه روی «ا» می‌نشیند و جاهای دیگر روی خود حرف.", say: "اَ. مثل اسب",
        forms: [["اَ", "اول کلمه"], ["بَ", "روی حرف"], ["سَ", "روی حرف"]], example: { pic: "🐴", word: "اَسب" } },
      { type: "choose", prompt: "«س» را پیدا کن", say: "س را پیدا کن", options: ["ش", "ب", "س", "م"], answer: "س" },
      { type: "choose", prompt: "کدام «بَ» است؟", say: "کدام بَ است؟", options: ["با", "بَ", "ب"], answer: "بَ" },
      { type: "trace", letter: "س", prompt: "با انگشتت «س» بنویس" },
      { type: "blend", parts: ["اَ", "س", "ب"], word: "اَسب", pic: "🐴", say: "اَ ... س ... ب ... اسب" },
      { type: "blend", parts: ["سَ", "بَد"], word: "سَبَد", pic: "🧺", say: "سَ ... بَد ... سبد" },
      { type: "choose", show: "سَبَد", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐴", value: "اَسب" }, { label: "🧺", value: "سَبَد" }, { label: "🌰", value: "بادام" }], answer: "سَبَد", pic: true },
      { type: "choose", show: "اَسب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌬️", value: "باد" }, { label: "🧺", value: "سَبَد" }, { label: "🐴", value: "اَسب" }], answer: "اَسب", pic: true },
      { type: "choose", show: "🧺", prompt: "کدام کلمه «سَبَد» است؟", say: "کدام کلمه سبد است؟", options: ["اَسب", "بادام", "سَبَد"], answer: "سَبَد" }
    ]
  },

  {
    id: "read-sprout-4", subject: "read", level: "sprout", emoji: "🧩", title: "بازی حرف‌ها و صداها",
    steps: [
      { type: "pairs", prompt: "هر حرف را با تصویری جفت کن که اسمش با صدای همان حرف شروع می‌شود",
        pairs: [["آ", { pic: "💧", say: "آب" }], ["ب", { pic: "👨", say: "بابا" }], ["س", { pic: "🧺", say: "سبد" }], ["م", { pic: "🐟", say: "ماهی" }]] },
      { type: "build", pic: "🌬️", word: "باد", parts: ["ب", "ا", "د"], extra: ["م"], say: "باد" },
      { type: "build", pic: "👨", word: "بابا", parts: ["با", "با"], extra: ["دا"], say: "بابا" },
      { type: "sort", prompt: "اسم هر تصویر با کدام صدا شروع می‌شود؟ آن را در سبد همان حرف بگذار.",
        baskets: [{ label: "ب" }, { label: "س" }],
        items: [{ pic: "🧺", say: "سبد", basket: "س" }, { pic: "🌬️", say: "باد", basket: "ب" }, { pic: "🍎", say: "سیب", basket: "س" },
          { pic: "🌧️", say: "باران", basket: "ب" }, { pic: "🧄", say: "سیر", basket: "س" }, { pic: "👨", say: "بابا", basket: "ب" }] },
      { type: "build", pic: "🧺", word: "سَبَد", parts: ["سَ", "بَد"], extra: ["با"], say: "سبد" },
      { type: "build", pic: "🌰", word: "بادام", parts: ["با", "دام"], extra: ["سَ"], say: "بادام" }
    ]
  },
  {
    id: "read-sprout-5", subject: "read", level: "sprout", emoji: "📖", title: "اولین جمله‌ها",
    steps: [
      { type: "blend", parts: ["آ", "مَد"], word: "آمَد", pic: "🚶", say: "آ ... مَد ... آمد" },
      { type: "blend", parts: ["دا", "د"], word: "داد", pic: "🤲", say: "دا ... د ... داد" },
      { type: "blend", parts: ["بابا", "آمَد"], word: "بابا آمَد.", pic: "👨", say: "بابا ... آمد ... بابا آمد" },
      { type: "passage", text: "اَسب آمَد.", question: "چه کسی آمد؟",
        options: [{ label: "👨", value: "بابا" }, { label: "🐴", value: "اَسب" }], answer: "اَسب", pic: true },
      { type: "blend", parts: ["بابا", "آب", "داد"], word: "بابا آب داد.", pic: "💧", say: "بابا ... آب ... داد ... بابا آب داد" },
      { type: "passage", text: "بابا بادام داد.", question: "بابا چه داد؟",
        options: [{ label: "💧", value: "آب" }, { label: "🌰", value: "بادام" }, { label: "🧺", value: "سَبَد" }], answer: "بادام", pic: true },
      { type: "passage", text: "سام آمَد. بابا سَبَد داد.", question: "بابا به سام چه داد؟",
        options: [{ label: "🧺", value: "سَبَد" }, { label: "🐴", value: "اَسب" }, { label: "💧", value: "آب" }], answer: "سَبَد", pic: true },
      { type: "passage", text: "اَسب آمَد. سام آب داد.", question: "سام به اسب چه داد؟",
        options: [{ label: "🌰", value: "بادام" }, { label: "💧", value: "آب" }], answer: "آب", pic: true }
    ]
  },
  {
    id: "read-sprout-6", subject: "read", level: "sprout", emoji: "✏️", title: "کلمه‌ها را بساز",
    steps: [
      { type: "build", hidden: true, pic: "💧", word: "آب", parts: ["آ", "ب"], extra: ["د"], say: "آب" },
      { type: "build", hidden: true, pic: "🌬️", word: "باد", parts: ["ب", "ا", "د"], extra: ["م"], say: "باد" },
      { type: "build", hidden: true, pic: "🏠", word: "بام", parts: ["ب", "ا", "م"], extra: ["د"], say: "بام" },
      { type: "build", hidden: true, pic: "👨", word: "بابا", parts: ["ب", "ا", "ب", "ا"], extra: ["م"], say: "بابا" },
      { type: "build", hidden: true, pic: "🐴", word: "اَسب", parts: ["اَ", "س", "ب"], extra: ["آ"], say: "اسب" },
      { type: "build", hidden: true, pic: "🧺", word: "سَبَد", parts: ["سَ", "بَ", "د"], extra: ["ا"], say: "سبد" },
      { type: "build", hidden: true, pic: "🌰", word: "بادام", parts: ["ب", "ا", "د", "ا", "م"], extra: ["س"], say: "بادام" }
    ]
  },

  // ---------------- Reading: Sapling (the remaining first letters, short vowels, sentences) ----------------
  // Letters follow the first-grade textbook order after «س»: او، ت، ر، ای، ن، ز، ش، اِ، اُ، ک.
  // Words and passages use only letters taught earlier; instructions and questions are for the grown-up to read aloud.
  {
    id: "read-sapling-1", subject: "read", level: "sapling", emoji: "👃", title: "«او» و «ت»",
    steps: [
      { type: "intro", letter: "او", write: "و", text: "این «او» است؛ مثل صدای آخر «بو». «و» به حرف بعدی نمی‌چسبد.", say: "او. مثل بو",
        forms: [["او", "اول کلمه"], ["و", "بعد از حرف"], ["ـو", "چسبیده"]], example: { pic: "👃", word: "بو" } },
      { type: "intro", letter: "ت", text: "این «ت» است؛ مثل صدای آخر «دَست».", say: "ت. مثل دست",
        forms: [["ت", "تنها"], ["تـ", "اول"], ["ـتـ", "وسط"], ["ـت", "آخر"]], example: { pic: "✋", word: "دَست" } },
      { type: "choose", prompt: "«و» را پیدا کن", say: "و را پیدا کن", options: ["د", "و", "ر", "م"], answer: "و" },
      { type: "choose", prompt: "«ت» را پیدا کن", say: "ت را پیدا کن", options: ["ب", "ن", "ت", "ث"], answer: "ت" },
      { type: "trace", letter: "ت", prompt: "با انگشتت «ت» بنویس" },
      { type: "blend", parts: ["ب", "و"], word: "بو", pic: "👃", say: "ب ... او ... بو" },
      { type: "blend", parts: ["دو", "د"], word: "دود", pic: "💨", say: "دو ... د ... دود" },
      { type: "blend", parts: ["دَ", "س", "ت"], word: "دَست", pic: "✋", say: "دَ ... س ... ت ... دست" },
      { type: "choose", show: "دود", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "👃", value: "بو" }, { label: "💨", value: "دود" }, { label: "✋", value: "دَست" }], answer: "دود", pic: true },
      { type: "choose", show: "دَست", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "✋", value: "دَست" }, { label: "💧", value: "آب" }, { label: "💨", value: "دود" }], answer: "دَست", pic: true },
      { type: "choose", show: "👃", prompt: "کدام کلمه «بو» است؟", say: "کدام کلمه بو است؟", options: ["دود", "دَست", "بو"], answer: "بو" }
    ]
  },
  {
    id: "read-sapling-2", subject: "read", level: "sapling", emoji: "🍎", title: "«ر» و «ای»",
    steps: [
      { type: "intro", letter: "ر", text: "این «ر» است؛ مثل صدای آخر «اَبر». «ر» به حرف بعدی نمی‌چسبد.", say: "ر. مثل ابر",
        forms: [["ر", "تنها"], ["ـر", "آخر"]], example: { pic: "☁️", word: "اَبر" } },
      { type: "intro", letter: "ای", write: "ی", text: "این «ای» است؛ مثل صدای وسط «سیب».", say: "ای. مثل سیب",
        forms: [["ای", "اول کلمه"], ["ـیـ", "وسط"], ["ی", "آخر"], ["ـی", "چسبیده"]], example: { pic: "🍎", word: "سیب" } },
      { type: "choose", prompt: "«ر» را پیدا کن", say: "ر را پیدا کن", options: ["ز", "د", "ر", "و"], answer: "ر" },
      { type: "choose", prompt: "«ـیـ» را پیدا کن", say: "ای را پیدا کن", options: ["ـنـ", "ـیـ", "ـبـ", "ـتـ"], answer: "ـیـ" },
      { type: "trace", letter: "ی", prompt: "با انگشتت «ی» بنویس" },
      { type: "blend", parts: ["اَ", "بر"], word: "اَبر", pic: "☁️", say: "اَ ... بر ... ابر" },
      { type: "blend", parts: ["ما", "دَر"], word: "مادَر", pic: "👩", say: "ما ... دَر ... مادر" },
      { type: "blend", parts: ["سی", "ب"], word: "سیب", pic: "🍎", say: "سی ... ب ... سیب" },
      { type: "choose", show: "مادَر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "☁️", value: "اَبر" }, { label: "👩", value: "مادَر" }, { label: "🍎", value: "سیب" }], answer: "مادَر", pic: true },
      { type: "choose", show: "سیب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🚪", value: "دَر" }, { label: "🧄", value: "سیر" }, { label: "🍎", value: "سیب" }], answer: "سیب", pic: true },
      { type: "choose", show: "🚪", prompt: "کدام کلمه «دَر» است؟", say: "کدام کلمه در است؟", options: ["دَر", "اَبر", "سیر"], answer: "دَر" }
    ]
  },
  {
    id: "read-sapling-3", subject: "read", level: "sapling", emoji: "🐝", title: "«ن» و «ز»",
    steps: [
      { type: "intro", letter: "ن", text: "این «ن» است؛ مثل صدای اول «نان».", say: "ن. مثل نان",
        forms: [["ن", "تنها"], ["نـ", "اول"], ["ـنـ", "وسط"], ["ـن", "آخر"]], example: { pic: "🍞", word: "نان" } },
      { type: "intro", letter: "ز", text: "این «ز» است؛ مثل صدای اول «زَنبور». «ز» به حرف بعدی نمی‌چسبد.", say: "ز. مثل زنبور",
        forms: [["ز", "تنها"], ["ـز", "آخر"]], example: { pic: "🐝", word: "زَنبور" } },
      { type: "choose", prompt: "«ن» را پیدا کن", say: "ن را پیدا کن", options: ["ب", "ت", "ی", "ن"], answer: "ن" },
      { type: "choose", prompt: "«ز» را پیدا کن", say: "ز را پیدا کن", options: ["ر", "ز", "د", "ژ"], answer: "ز" },
      { type: "trace", letter: "ن", prompt: "با انگشتت «ن» بنویس" },
      { type: "blend", parts: ["نا", "ن"], word: "نان", pic: "🍞", say: "نا ... ن ... نان" },
      { type: "blend", parts: ["با", "ران"], word: "باران", pic: "🌧️", say: "با ... ران ... باران" },
      { type: "blend", parts: ["زَن", "بور"], word: "زَنبور", pic: "🐝", say: "زَن ... بور ... زنبور" },
      { type: "blend", parts: ["دَن", "دان"], word: "دَندان", pic: "🦷", say: "دَن ... دان ... دندان" },
      { type: "choose", show: "باران", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🍞", value: "نان" }, { label: "🌧️", value: "باران" }, { label: "🐝", value: "زَنبور" }], answer: "باران", pic: true },
      { type: "choose", show: "دَندان", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐝", value: "زَنبور" }, { label: "☀️", value: "روز" }, { label: "🦷", value: "دَندان" }], answer: "دَندان", pic: true },
      { type: "passage", text: "مادَر نان دارد.", question: "مادر چه دارد؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🍞", value: "نان" }, { label: "🦷", value: "دَندان" }], answer: "نان", pic: true }
    ]
  },
  {
    id: "read-sapling-4", subject: "read", level: "sapling", emoji: "✏️", title: "«ش» و «ـِ»",
    steps: [
      { type: "intro", letter: "ش", text: "این «ش» است؛ مثل صدای آخر «موش».", say: "ش. مثل موش",
        forms: [["ش", "تنها"], ["شـ", "اول"], ["ـشـ", "وسط"], ["ـش", "آخر"]], example: { pic: "🐭", word: "موش" } },
      { type: "intro", letter: "اِ", text: "این نشانه «زیر» است و صدای «اِ» می‌دهد. اول کلمه زیر «ا» می‌نشیند و جاهای دیگر زیر خود حرف.", say: "اِ. مثل مداد",
        forms: [["اِ", "اول کلمه"], ["مِ", "زیر حرف"], ["شِ", "زیر حرف"]], example: { pic: "✏️", word: "مِداد" } },
      { type: "choose", prompt: "«ش» را پیدا کن", say: "ش را پیدا کن", options: ["س", "ش", "ث", "ز"], answer: "ش" },
      { type: "choose", prompt: "کدام «مِ» است؟", say: "کدام مِ است؟", options: ["مَ", "ما", "مِ"], answer: "مِ" },
      { type: "trace", letter: "ش", prompt: "با انگشتت «ش» بنویس" },
      { type: "blend", parts: ["مو", "ش"], word: "موش", pic: "🐭", say: "مو ... ش ... موش" },
      { type: "blend", parts: ["ما", "شین"], word: "ماشین", pic: "🚗", say: "ما ... شین ... ماشین" },
      { type: "blend", parts: ["مِ", "داد"], word: "مِداد", pic: "✏️", say: "مِ ... داد ... مداد" },
      { type: "choose", show: "شیر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐭", value: "موش" }, { label: "🥛", value: "شیر" }, { label: "🚗", value: "ماشین" }], answer: "شیر", pic: true },
      { type: "choose", show: "مِداد", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "✏️", value: "مِداد" }, { label: "🏊", value: "شِنا" }, { label: "🍞", value: "نان" }], answer: "مِداد", pic: true },
      { type: "passage", text: "موش با ماشین می‌رود.", question: "موش با کدام می‌رود؟",
        options: [{ label: "🐝", value: "زَنبور" }, { label: "🚗", value: "ماشین" }, { label: "☁️", value: "اَبر" }], answer: "ماشین", pic: true }
    ]
  },
  {
    id: "read-sapling-5", subject: "read", level: "sapling", emoji: "🦆", title: "«ـُ» و «ک»",
    steps: [
      { type: "intro", letter: "ک", text: "این «ک» است؛ مثل صدای اول «کِتاب».", say: "ک. مثل کتاب",
        forms: [["ک", "تنها"], ["کـ", "اول"], ["ـکـ", "وسط"], ["ـک", "آخر"]], example: { pic: "📖", word: "کِتاب" } },
      { type: "intro", letter: "اُ", text: "این نشانه «پیش» است و صدای «اُ» می‌دهد. اول کلمه روی «ا» می‌نشیند و جاهای دیگر روی خود حرف.", say: "اُ. مثل اردک",
        forms: [["اُ", "اول کلمه"], ["کُ", "روی حرف"], ["دُ", "روی حرف"]], example: { pic: "🦆", word: "اُردَک" } },
      { type: "choose", prompt: "«ک» را پیدا کن", say: "ک را پیدا کن", options: ["گ", "ل", "ک", "ن"], answer: "ک" },
      { type: "choose", prompt: "کدام «کُ» است؟", say: "کدام کُ است؟", options: ["کَ", "کُ", "کِ"], answer: "کُ" },
      { type: "trace", letter: "ک", prompt: "با انگشتت «ک» بنویس" },
      { type: "blend", parts: ["اُر", "دَک"], word: "اُردَک", pic: "🦆", say: "اُر ... دَک ... اردک" },
      { type: "blend", parts: ["کَ", "بو", "تَر"], word: "کَبوتَر", pic: "🕊️", say: "کَ ... بو ... تَر ... کبوتر" },
      { type: "blend", parts: ["باد", "با", "دَک"], word: "بادبادَک", pic: "🪁", say: "باد ... با ... دَک ... بادبادک" },
      { type: "choose", show: "کِتاب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🦆", value: "اُردَک" }, { label: "🧥", value: "کُت" }, { label: "📖", value: "کِتاب" }], answer: "کِتاب", pic: true },
      { type: "choose", show: "بادبادَک", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🪁", value: "بادبادَک" }, { label: "🕊️", value: "کَبوتَر" }, { label: "🚗", value: "ماشین" }], answer: "بادبادَک", pic: true },
      { type: "passage", text: "اُردَک در آب است. کَبوتَر سَر بام است.", question: "کدام سر بام است؟",
        options: [{ label: "🦆", value: "اُردَک" }, { label: "🕊️", value: "کَبوتَر" }], answer: "کَبوتَر", pic: true }
    ]
  },
  {
    id: "read-sapling-18", subject: "read", level: "sapling", emoji: "🧩", title: "بازی کلمه‌ها",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["موش", "🐭"], ["نان", "🍞"], ["کِتاب", "📖"], ["دَست", "✋"]] },
      { type: "build", pic: "📖", word: "کِتاب", parts: ["کِ", "تا", "ب"], extra: ["شِ"], say: "کتاب" },
      { type: "build", pic: "🚗", word: "ماشین", parts: ["ما", "شین"], extra: ["مو"], say: "ماشین" },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ک" }, { label: "م" }],
        items: [{ label: "کِتاب", basket: "ک" }, { label: "مادَر", basket: "م" }, { label: "کَبوتَر", basket: "ک" },
          { label: "موش", basket: "م" }, { label: "کُت", basket: "ک" }, { label: "مِداد", basket: "م" }] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["موش", "با", "ماشین", "می‌رود."] },
      { type: "build", pic: "🐝", word: "زَنبور", parts: ["زَن", "بور"], extra: ["نا"], say: "زنبور" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["اُردَک", "در", "آب", "است."] }
    ]
  },
  {
    id: "read-sapling-6", subject: "read", level: "sapling", emoji: "📖", title: "جمله بخوانیم، معنا بفهمیم",
    steps: [
      { type: "passage", text: "سارا کِتاب دارد. کِتابِ سارا آبی است.", question: "کتاب سارا آبی است یا سبز؟",
        options: ["سَبز", "آبی"], answer: "آبی" },
      { type: "passage", text: "بابا نان دارد. مادَر شیر دارد. بَرادَر سیب دارد.", question: "برادر چه دارد؟",
        options: [{ label: "🍞", value: "نان" }, { label: "🥛", value: "شیر" }, { label: "🍎", value: "سیب" }], answer: "سیب", pic: true },
      { type: "passage", text: "اِمروز باران آمد. آسمان اَبری است.", question: "امروز هوا چطور است؟",
        options: [{ label: "☀️", value: "آفتابی" }, { label: "🌧️", value: "بارانی" }], answer: "بارانی", pic: true },
      { type: "passage", text: "سینا بادبادَک دارد. سینا و نیما با بادبادَک بازی می‌کُنَند. نیما شاد است.", question: "سینا با چه کسی بازی می‌کند؟",
        options: ["سارا", "نیما", "مادَر"], answer: "نیما" }
    ]
  },
  // The rest of the alphabet, in the first-grade textbook order: ه/ـه، پ، ل، ج، گ، چ، خ، ف، ق، ی (یـ)، ژ،
  // then the letters that share a sound (ص ث، ذ ض ظ، ط، ح، ع غ), and finally تشدید and تنوین.
  // Check with: node tools/check-reading.js
  {
    id: "read-sapling-7", subject: "read", level: "sapling", emoji: "🌙", title: "«ه» و «ـه»",
    steps: [
      { type: "intro", letter: "ه", text: "این «ه» است؛ مثل صدای آخر «ماه».", say: "ه. مثل ماه",
        forms: [["ه", "تنها"], ["هـ", "اول"], ["ـهـ", "وسط"], ["ـه", "آخر"]], example: { pic: "🌙", word: "ماه" } },
      { type: "intro", letter: "ـه", text: "«ه» آخر کلمه گاهی صدای «اِ» می‌دهد؛ مثل «نامه».", say: "اِ. مثل نامه",
        forms: [["ـه", "چسبیده"], ["ه", "جدا"]], example: { pic: "✉️", word: "نامه" } },
      { type: "choose", prompt: "«ه» را پیدا کن", say: "ه را پیدا کن", options: ["ح", "م", "ه", "ع"], answer: "ه" },
      { type: "choose", prompt: "«ـه» را پیدا کن", say: "ه را پیدا کن", options: ["ـم", "ـه", "ـن", "ـع"], answer: "ـه" },
      { type: "trace", letter: "ه", prompt: "با انگشتت «ه» بنویس" },
      { type: "blend", parts: ["ما", "ه"], word: "ماه", pic: "🌙", say: "ما ... ه ... ماه" },
      { type: "blend", parts: ["کو", "ه"], word: "کوه", pic: "⛰️", say: "کو ... ه ... کوه" },
      { type: "blend", parts: ["نا", "مه"], word: "نامه", pic: "✉️", say: "نا ... مه ... نامه" },
      { type: "blend", parts: ["سَب", "زه"], word: "سَبزه", pic: "🌱", say: "سَب ... زه ... سبزه" },
      { type: "choose", show: "کوه", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌙", value: "ماه" }, { label: "⛰️", value: "کوه" }, { label: "✉️", value: "نامه" }], answer: "کوه", pic: true },
      { type: "choose", show: "🌱", prompt: "کدام کلمه «سَبزه» است؟", say: "کدام کلمه سبزه است؟", options: ["نامه", "سَبزه", "ماه"], answer: "سَبزه" },
      { type: "passage", text: "مادَر سَبزه کاشت. سَبزه سَبز شُد.", question: "مادر چه کاشت؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🌱", value: "سَبزه" }, { label: "🌰", value: "بادام" }], answer: "سَبزه", pic: true }
    ]
  },
  {
    id: "read-sapling-8", subject: "read", level: "sapling", emoji: "🐢", title: "«پ» و «ل»",
    steps: [
      { type: "intro", letter: "پ", text: "این «پ» است؛ مثل صدای آخر «توپ». «پ» سه نقطه زیرش دارد.", say: "پ. مثل توپ",
        forms: [["پ", "تنها"], ["پـ", "اول"], ["ـپـ", "وسط"], ["ـپ", "آخر"]], example: { pic: "⚽", word: "توپ" } },
      { type: "intro", letter: "ل", text: "این «ل» است؛ مثل صدای اول «لاله».", say: "ل. مثل لاله",
        forms: [["ل", "تنها"], ["لـ", "اول"], ["ـلـ", "وسط"], ["ـل", "آخر"]], example: { pic: "🌷", word: "لاله" } },
      { type: "choose", prompt: "«پ» را پیدا کن", say: "پ را پیدا کن", options: ["ب", "ت", "پ", "ث"], answer: "پ" },
      { type: "choose", prompt: "«ل» را پیدا کن", say: "ل را پیدا کن", options: ["ل", "ک", "ا", "د"], answer: "ل" },
      { type: "trace", letter: "ل", prompt: "با انگشتت «ل» بنویس" },
      { type: "blend", parts: ["تو", "پ"], word: "توپ", pic: "⚽", say: "تو ... پ ... توپ" },
      { type: "blend", parts: ["لا", "له"], word: "لاله", pic: "🌷", say: "لا ... له ... لاله" },
      { type: "blend", parts: ["بُل", "بُل"], word: "بُلبُل", pic: "🐦", say: "بُل ... بُل ... بلبل" },
      { type: "blend", parts: ["لاک", "پُشت"], word: "لاک‌پُشت", pic: "🐢", say: "لاک ... پُشت ... لاک‌پشت" },
      { type: "choose", show: "لاک‌پُشت", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "⚽", value: "توپ" }, { label: "🌷", value: "لاله" }, { label: "🐢", value: "لاک‌پُشت" }], answer: "لاک‌پُشت", pic: true },
      { type: "choose", show: "پا", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🦶", value: "پا" }, { label: "🐦", value: "بُلبُل" }, { label: "✋", value: "دَست" }], answer: "پا", pic: true },
      { type: "passage", text: "نَسرین توپ دارد. نَسرین با توپ بازی می‌کُنَد.", question: "نسرین با چه بازی می‌کند؟",
        options: [{ label: "🪁", value: "بادبادَک" }, { label: "📖", value: "کِتاب" }, { label: "⚽", value: "توپ" }], answer: "توپ", pic: true }
    ]
  },
  {
    id: "read-sapling-9", subject: "read", level: "sapling", emoji: "🐥", title: "«ج» و «گ»",
    steps: [
      { type: "intro", letter: "ج", text: "این «ج» است؛ مثل صدای اول «جوجه».", say: "ج. مثل جوجه",
        forms: [["ج", "تنها"], ["جـ", "اول"], ["ـجـ", "وسط"], ["ـج", "آخر"]], example: { pic: "🐥", word: "جوجه" } },
      { type: "intro", letter: "گ", text: "این «گ» است؛ مثل صدای اول «گُل». «گ» مثل «ک» است، با یک سرکش بیشتر.", say: "گ. مثل گل",
        forms: [["گ", "تنها"], ["گـ", "اول"], ["ـگـ", "وسط"], ["ـگ", "آخر"]], example: { pic: "🌸", word: "گُل" } },
      { type: "choose", prompt: "«ج» را پیدا کن", say: "ج را پیدا کن", options: ["چ", "خ", "ج", "ح"], answer: "ج" },
      { type: "choose", prompt: "«گ» را پیدا کن", say: "گ را پیدا کن", options: ["ک", "گ", "ل", "ق"], answer: "گ" },
      { type: "trace", letter: "ج", prompt: "با انگشتت «ج» بنویس" },
      { type: "blend", parts: ["جو", "جه"], word: "جوجه", pic: "🐥", say: "جو ... جه ... جوجه" },
      { type: "blend", parts: ["اَن", "گور"], word: "اَنگور", pic: "🍇", say: "اَن ... گور ... انگور" },
      { type: "blend", parts: ["جو", "راب"], word: "جوراب", pic: "🧦", say: "جو ... راب ... جوراب" },
      { type: "blend", parts: ["پَن", "جَ", "ره"], word: "پَنجَره", pic: "🪟", say: "پَن ... جَ ... ره ... پنجره" },
      { type: "choose", show: "اَنگور", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐥", value: "جوجه" }, { label: "🍇", value: "اَنگور" }, { label: "🌸", value: "گُل" }], answer: "اَنگور", pic: true },
      { type: "choose", show: "👂", prompt: "کدام کلمه «گوش» است؟", say: "کدام کلمه گوش است؟", options: ["موش", "گُل", "گوش"], answer: "گوش" },
      { type: "passage", text: "جوجه زیر سَبَد است. جوجه زَرد است.", question: "جوجه چه رنگی است؟",
        options: [{ label: "🔴", value: "قرمز" }, { label: "🟡", value: "زرد" }, { label: "⚫", value: "سیاه" }], answer: "زرد", pic: true }
    ]
  },
  {
    id: "read-sapling-10", subject: "read", level: "sapling", emoji: "☂️", title: "«چ» و «خ»",
    steps: [
      { type: "intro", letter: "چ", text: "این «چ» است؛ مثل صدای اول «چَتر». «چ» سه نقطه دارد.", say: "چ. مثل چتر",
        forms: [["چ", "تنها"], ["چـ", "اول"], ["ـچـ", "وسط"], ["ـچ", "آخر"]], example: { pic: "☂️", word: "چَتر" } },
      { type: "intro", letter: "خ", text: "این «خ» است؛ مثل صدای اول «خانه». «خ» یک نقطه رویش دارد.", say: "خ. مثل خانه",
        forms: [["خ", "تنها"], ["خـ", "اول"], ["ـخـ", "وسط"], ["ـخ", "آخر"]], example: { pic: "🏡", word: "خانه" } },
      { type: "choose", prompt: "«چ» را پیدا کن", say: "چ را پیدا کن", options: ["ج", "چ", "خ", "ح"], answer: "چ" },
      { type: "choose", prompt: "«خ» را پیدا کن", say: "خ را پیدا کن", options: ["ج", "ح", "چ", "خ"], answer: "خ" },
      { type: "trace", letter: "خ", prompt: "با انگشتت «خ» بنویس" },
      { type: "blend", parts: ["چَ", "تر"], word: "چَتر", pic: "☂️", say: "چَ ... تر ... چتر" },
      { type: "blend", parts: ["چَش", "م"], word: "چَشم", pic: "👁️", say: "چَش ... م ... چشم" },
      { type: "blend", parts: ["خُ", "روس"], word: "خُروس", pic: "🐓", say: "خُ ... روس ... خروس" },
      { type: "blend", parts: ["دِ", "رَخت"], word: "دِرَخت", pic: "🌳", say: "دِ ... رَخت ... درخت" },
      { type: "choose", show: "خُروس", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐥", value: "جوجه" }, { label: "🐝", value: "زَنبور" }, { label: "🐓", value: "خُروس" }], answer: "خُروس", pic: true },
      { type: "choose", show: "🌳", prompt: "کدام کلمه «دِرَخت» است؟", say: "کدام کلمه درخت است؟", options: ["دِرَخت", "خانه", "چَتر"], answer: "دِرَخت" },
      { type: "passage", text: "باران می‌بارَد. سارا چَتر دارد. سارا زیر چَتر است.", question: "سارا زیر چه چیزی است؟",
        options: [{ label: "🌳", value: "دِرَخت" }, { label: "☂️", value: "چَتر" }, { label: "🏡", value: "خانه" }], answer: "چَتر", pic: true }
    ]
  },
  {
    id: "read-sapling-11", subject: "read", level: "sapling", emoji: "🐘", title: "«ف» و «ق»",
    steps: [
      { type: "intro", letter: "ف", text: "این «ف» است؛ مثل صدای اول «فیل».", say: "ف. مثل فیل",
        forms: [["ف", "تنها"], ["فـ", "اول"], ["ـفـ", "وسط"], ["ـف", "آخر"]], example: { pic: "🐘", word: "فیل" } },
      { type: "intro", letter: "ق", text: "این «ق» است؛ مثل صدای اول «قاشُق». «ق» دو نقطه دارد.", say: "ق. مثل قاشق",
        forms: [["ق", "تنها"], ["قـ", "اول"], ["ـقـ", "وسط"], ["ـق", "آخر"]], example: { pic: "🥄", word: "قاشُق" } },
      { type: "choose", prompt: "«ف» را پیدا کن", say: "ف را پیدا کن", options: ["ق", "ف", "غ", "ع"], answer: "ف" },
      { type: "choose", prompt: "«ق» را پیدا کن", say: "ق را پیدا کن", options: ["ف", "ن", "ق", "غ"], answer: "ق" },
      { type: "trace", letter: "ق", prompt: "با انگشتت «ق» بنویس" },
      { type: "blend", parts: ["بَر", "ف"], word: "بَرف", pic: "❄️", say: "بَر ... ف ... برف" },
      { type: "blend", parts: ["کَف", "ش"], word: "کَفش", pic: "👟", say: "کَف ... ش ... کفش" },
      { type: "blend", parts: ["قا", "شُق"], word: "قاشُق", pic: "🥄", say: "قا ... شُق ... قاشق" },
      { type: "blend", parts: ["بُش", "قاب"], word: "بُشقاب", pic: "🍽️", say: "بُش ... قاب ... بشقاب" },
      { type: "choose", show: "بُشقاب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🍽️", value: "بُشقاب" }, { label: "🥄", value: "قاشُق" }, { label: "👟", value: "کَفش" }], answer: "بُشقاب", pic: true },
      { type: "choose", show: "🐘", prompt: "کدام کلمه «فیل» است؟", say: "کدام کلمه فیل است؟", options: ["بَرف", "فیل", "کَفش"], answer: "فیل" },
      { type: "passage", text: "اِمروز بَرف آمد. آرَش کَفش پوشید و بیرون رَفت.", question: "امروز چه آمد؟",
        options: [{ label: "🌧️", value: "باران" }, { label: "❄️", value: "بَرف" }, { label: "🌬️", value: "باد" }], answer: "بَرف", pic: true }
    ]
  },
  {
    id: "read-sapling-19", subject: "read", level: "sapling", emoji: "🎲", title: "بازی کلمه‌ها ۲",
    steps: [
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ج" }, { label: "چ" }],
        items: [{ label: "جوجه", basket: "ج" }, { label: "چَتر", basket: "چ" }, { label: "جوراب", basket: "ج" }, { label: "چَشم", basket: "چ" }] },
      { type: "build", pic: "🥄", word: "قاشُق", parts: ["قا", "شُق"], extra: ["فا"], say: "قاشق" },
      { type: "build", pic: "❄️", word: "بَرف", parts: ["بَ", "ر", "ف"], extra: ["ق"], say: "برف" },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["فیل", "🐘"], ["خانه", "🏡"], ["گُل", "🌸"], ["توپ", "⚽"]] },
      { type: "build", pic: "🐓", word: "خُروس", parts: ["خُ", "روس"], extra: ["چَ"], say: "خروس" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["سارا", "زیر", "چَتر", "است."] }
    ]
  },
  {
    id: "read-sapling-12", subject: "read", level: "sapling", emoji: "🧥", title: "«یـ» و «ژ»",
    steps: [
      { type: "intro", letter: "یـ", text: "«ی» صدای «یـ» هم می‌دهد؛ مثل صدای اول «یَخ».", say: "یَ. مثل یخ",
        forms: [["یـ", "اول"], ["ـیـ", "وسط"], ["ی", "آخر"]], example: { pic: "🧊", word: "یَخ" } },
      { type: "intro", letter: "ژ", text: "این «ژ» است؛ مثل صدای اول «ژاکَت». «ژ» مثل «ز» است، با سه نقطه. به حرف بعدی نمی‌چسبد.", say: "ژ. مثل ژاکت",
        forms: [["ژ", "تنها"], ["ـژ", "آخر"]], example: { pic: "🧥", word: "ژاکَت" } },
      { type: "choose", prompt: "«ژ» را پیدا کن", say: "ژ را پیدا کن", options: ["ز", "ر", "ژ", "ش"], answer: "ژ" },
      { type: "choose", prompt: "کدام «یَ» است؟", say: "کدام یَ است؟", options: ["یَ", "یِ", "یُ"], answer: "یَ" },
      { type: "trace", letter: "ژ", prompt: "با انگشتت «ژ» بنویس" },
      { type: "blend", parts: ["یَ", "خ"], word: "یَخ", pic: "🧊", say: "یَ ... خ ... یخ" },
      { type: "blend", parts: ["یوز", "پَ", "لَنگ"], word: "یوزپَلَنگ", pic: "🐆", say: "یوز ... پَ ... لَنگ ... یوزپلنگ" },
      { type: "blend", parts: ["قا", "یِق"], word: "قایِق", pic: "⛵", say: "قا ... یِق ... قایق" },
      { type: "blend", parts: ["ژا", "کَت"], word: "ژاکَت", pic: "🧥", say: "ژا ... کَت ... ژاکت" },
      { type: "choose", show: "قایِق", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧊", value: "یَخ" }, { label: "⛵", value: "قایِق" }, { label: "🧅", value: "پیاز" }], answer: "قایِق", pic: true },
      { type: "choose", show: "🧅", prompt: "کدام کلمه «پیاز» است؟", say: "کدام کلمه پیاز است؟", options: ["پیاز", "یَخ", "ژاکَت"], answer: "پیاز" },
      { type: "passage", text: "بَرف می‌آیَد. آب یَخ زَد. سارا ژاکَت پوشید.", question: "سارا چه پوشید؟",
        options: [{ label: "👟", value: "کَفش" }, { label: "🧦", value: "جوراب" }, { label: "🧥", value: "ژاکَت" }], answer: "ژاکَت", pic: true }
    ]
  },
  {
    id: "read-sapling-13", subject: "read", level: "sapling", emoji: "🧼", title: "«ص» و «ث»",
    steps: [
      { type: "intro", letter: "ص", text: "این «ص» است. صدایش مثل «س» است، اما شکلش فرق دارد؛ مثل «صابون».", say: "ص. مثل صابون",
        forms: [["ص", "تنها"], ["صـ", "اول"], ["ـصـ", "وسط"], ["ـص", "آخر"]], example: { pic: "🧼", word: "صابون" } },
      { type: "intro", letter: "ث", text: "این «ث» است. صدای «ث» هم مثل «س» است؛ مثل «ثانیه». «ث» سه نقطه دارد.", say: "ث. مثل ثانیه",
        forms: [["ث", "تنها"], ["ثـ", "اول"], ["ـثـ", "وسط"], ["ـث", "آخر"]], example: { pic: "⏱️", word: "ثانیه" } },
      { type: "choose", prompt: "«ص» را پیدا کن", say: "ص را پیدا کن", options: ["س", "ض", "ص", "ط"], answer: "ص" },
      { type: "choose", prompt: "«ث» را پیدا کن", say: "ث را پیدا کن", options: ["ت", "ث", "ن", "پ"], answer: "ث" },
      { type: "trace", letter: "ص", prompt: "با انگشتت «ص» بنویس" },
      { type: "blend", parts: ["صا", "بون"], word: "صابون", pic: "🧼", say: "صا ... بون ... صابون" },
      { type: "blend", parts: ["صَن", "دَ", "لی"], word: "صَندَلی", pic: "🪑", say: "صَن ... دَ ... لی ... صندلی" },
      { type: "blend", parts: ["ثا", "نیه"], word: "ثانیه", pic: "⏱️", say: "ثا ... نیه ... ثانیه" },
      { type: "choose", show: "صَندَلی", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧼", value: "صابون" }, { label: "🪑", value: "صَندَلی" }, { label: "⏱️", value: "ثانیه" }], answer: "صَندَلی", pic: true },
      { type: "choose", show: "🧼", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["سابون", "صابون"], answer: "صابون" },
      { type: "passage", text: "سارا با آب و صابون دَست شُست. دَست سارا تَمیز شُد.", question: "سارا با چه دست شست؟",
        options: [{ label: "🪑", value: "صَندَلی" }, { label: "🍞", value: "نان" }, { label: "🧼", value: "صابون" }], answer: "صابون", pic: true }
    ]
  },
  {
    id: "read-sapling-14", subject: "read", level: "sapling", emoji: "🌽", title: "«ذ»، «ض» و «ظ»",
    steps: [
      { type: "intro", letter: "ذ", text: "این «ذ» است. صدایش مثل «ز» است؛ مثل «ذُرَت». «ذ» به حرف بعدی نمی‌چسبد.", say: "ذ. مثل ذرت",
        forms: [["ذ", "تنها"], ["ـذ", "آخر"]], example: { pic: "🌽", word: "ذُرَت" } },
      { type: "intro", letter: "ض", text: "این «ض» است. صدای «ض» هم مثل «ز» است؛ مثل «مَریض».", say: "ض. مثل مریض",
        forms: [["ض", "تنها"], ["ضـ", "اول"], ["ـضـ", "وسط"], ["ـض", "آخر"]], example: { pic: "🤒", word: "مَریض" } },
      { type: "intro", letter: "ظ", text: "این «ظ» است. صدای «ظ» هم مثل «ز» است؛ مثل «ظَرف».", say: "ظ. مثل ظرف",
        forms: [["ظ", "تنها"], ["ظـ", "اول"], ["ـظـ", "وسط"], ["ـظ", "آخر"]], example: { pic: "🥣", word: "ظَرف" } },
      { type: "choose", prompt: "«ذ» را پیدا کن", say: "ذ را پیدا کن", options: ["د", "ز", "ذ", "ر"], answer: "ذ" },
      { type: "choose", prompt: "«ظ» را پیدا کن", say: "ظ را پیدا کن", options: ["ط", "ظ", "ض", "ص"], answer: "ظ" },
      { type: "trace", letter: "ض", prompt: "با انگشتت «ض» بنویس" },
      { type: "blend", parts: ["ذُ", "رَت"], word: "ذُرَت", pic: "🌽", say: "ذُ ... رَت ... ذرت" },
      { type: "blend", parts: ["مَ", "ریض"], word: "مَریض", pic: "🤒", say: "مَ ... ریض ... مریض" },
      { type: "blend", parts: ["ظَر", "ف"], word: "ظَرف", pic: "🥣", say: "ظَر ... ف ... ظرف" },
      { type: "choose", show: "ظَرف", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌽", value: "ذُرَت" }, { label: "🥣", value: "ظَرف" }, { label: "🤒", value: "مَریض" }], answer: "ظَرف", pic: true },
      { type: "choose", show: "🌽", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["ذُرَت", "زُرَت"], answer: "ذُرَت" },
      { type: "passage", text: "رِضا مَریض است. مادَر یک ظَرف سوپ بَرای رِضا بُرد.", question: "مادر برای رضا چه برد؟",
        options: [{ label: "🍲", value: "سوپ" }, { label: "🌽", value: "ذُرَت" }, { label: "🍞", value: "نان" }], answer: "سوپ", pic: true }
    ]
  },
  {
    id: "read-sapling-15", subject: "read", level: "sapling", emoji: "🦜", title: "«ط» و «ح»",
    steps: [
      { type: "intro", letter: "ط", text: "این «ط» است. صدایش مثل «ت» است؛ مثل «طوطی».", say: "ط. مثل طوطی",
        forms: [["ط", "تنها"], ["طـ", "اول"], ["ـطـ", "وسط"], ["ـط", "آخر"]], example: { pic: "🦜", word: "طوطی" } },
      { type: "intro", letter: "ح", text: "این «ح» است. صدایش مثل «ه» است؛ مثل «حَلَزون». «ح» نقطه ندارد.", say: "ح. مثل حلزون",
        forms: [["ح", "تنها"], ["حـ", "اول"], ["ـحـ", "وسط"], ["ـح", "آخر"]], example: { pic: "🐌", word: "حَلَزون" } },
      { type: "choose", prompt: "«ط» را پیدا کن", say: "ط را پیدا کن", options: ["ظ", "ص", "ت", "ط"], answer: "ط" },
      { type: "choose", prompt: "«ح» را پیدا کن", say: "ح را پیدا کن", options: ["ج", "ح", "خ", "چ"], answer: "ح" },
      { type: "trace", letter: "ط", prompt: "با انگشتت «ط» بنویس" },
      { type: "blend", parts: ["طو", "طی"], word: "طوطی", pic: "🦜", say: "طو ... طی ... طوطی" },
      { type: "blend", parts: ["قَ", "طار"], word: "قَطار", pic: "🚂", say: "قَ ... طار ... قطار" },
      { type: "blend", parts: ["حَ", "لَ", "زون"], word: "حَلَزون", pic: "🐌", say: "حَ ... لَ ... زون ... حلزون" },
      { type: "blend", parts: ["صُب", "حا", "نه"], word: "صُبحانه", pic: "🍳", say: "صُب ... حا ... نه ... صبحانه" },
      { type: "choose", show: "قَطار", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐌", value: "حَلَزون" }, { label: "🦜", value: "طوطی" }, { label: "🚂", value: "قَطار" }], answer: "قَطار", pic: true },
      { type: "choose", show: "🦜", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["طوطی", "توتی"], answer: "طوطی" },
      { type: "passage", text: "حَسَن یک طوطی دارد. طوطی سَبز است. طوطی حَرف می‌زَنَد.", question: "طوطی حسن چه رنگی است؟",
        options: [{ label: "🟡", value: "زرد" }, { label: "🟢", value: "سبز" }, { label: "🔴", value: "قرمز" }], answer: "سبز", pic: true }
    ]
  },
  {
    id: "read-sapling-16", subject: "read", level: "sapling", emoji: "🐸", title: "«ع» و «غ»",
    steps: [
      { type: "intro", letter: "ع", text: "این «ع» است. صدایش مثل «اَ» در «اَسب» است؛ مثل «عَسَل».", say: "ع. مثل عسل",
        forms: [["ع", "تنها"], ["عـ", "اول"], ["ـعـ", "وسط"], ["ـع", "آخر"]], example: { pic: "🍯", word: "عَسَل" } },
      { type: "intro", letter: "غ", text: "این «غ» است. صدایش مثل «ق» است؛ مثل «مُرغ». «غ» یک نقطه رویش دارد.", say: "غ. مثل مرغ",
        forms: [["غ", "تنها"], ["غـ", "اول"], ["ـغـ", "وسط"], ["ـغ", "آخر"]], example: { pic: "🐔", word: "مُرغ" } },
      { type: "choose", prompt: "«ع» را پیدا کن", say: "ع را پیدا کن", options: ["غ", "ع", "ح", "ه"], answer: "ع" },
      { type: "choose", prompt: "«غ» را پیدا کن", say: "غ را پیدا کن", options: ["ع", "ف", "ق", "غ"], answer: "غ" },
      { type: "trace", letter: "ع", prompt: "با انگشتت «ع» بنویس" },
      { type: "blend", parts: ["عَ", "سَل"], word: "عَسَل", pic: "🍯", say: "عَ ... سَل ... عسل" },
      { type: "blend", parts: ["سا", "عَت"], word: "ساعَت", pic: "⏰", say: "سا ... عَت ... ساعت" },
      { type: "blend", parts: ["قور", "با", "غه"], word: "قورباغه", pic: "🐸", say: "قور ... با ... غه ... قورباغه" },
      { type: "blend", parts: ["تُخم", "مُرغ"], word: "تُخم‌مُرغ", pic: "🥚", say: "تُخم ... مُرغ ... تخم‌مرغ" },
      { type: "choose", show: "ساعَت", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "⏰", value: "ساعَت" }, { label: "🍯", value: "عَسَل" }, { label: "🐸", value: "قورباغه" }], answer: "ساعَت", pic: true },
      { type: "choose", show: "🍯", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["اَسَل", "عَسَل"], answer: "عَسَل" },
      { type: "passage", text: "مادَربُزُرگ در باغ مُرغ دارد. مُرغ تُخم گُذاشت.", question: "مرغ چه گذاشت؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🍯", value: "عَسَل" }, { label: "🥚", value: "تُخم" }], answer: "تُخم", pic: true }
    ]
  },
  {
    id: "read-sapling-17", subject: "read", level: "sapling", emoji: "🪚", title: "«ـّ» و «ـً»",
    steps: [
      { type: "intro", letter: "ـّ", text: "این نشانه «تَشدید» است. حرفی که تشدید دارد دو بار خوانده می‌شود؛ مثل «اَرّه».", say: "تشدید. مثل اره",
        forms: [["رّ", "روی حرف"], ["بّ", "روی حرف"], ["چّ", "روی حرف"]], example: { pic: "🪚", word: "اَرّه" } },
      { type: "intro", letter: "اً", text: "این نشانه «تَنوین» است. «اً» آخر کلمه صدای «اَن» می‌دهد؛ مثل «لُطفاً».", say: "تنوین. مثل لطفاً",
        forms: [["اً", "آخر کلمه"]], example: { pic: "🙏", word: "لُطفاً" } },
      { type: "choose", prompt: "کدام نشانه «تشدید» است؟", say: "کدام نشانه تشدید است؟", options: ["ـً", "ـّ", "ـُ"], answer: "ـّ" },
      { type: "choose", prompt: "کدام نشانه «تنوین» است؟", say: "کدام نشانه تنوین است؟", options: ["ـً", "ـَ", "ـّ"], answer: "ـً" },
      { type: "trace", letter: "اً", prompt: "با انگشتت «اً» بنویس" },
      { type: "blend", parts: ["اَر", "ره"], word: "اَرّه", pic: "🪚", say: "اَر ... ره ... اره" },
      { type: "blend", parts: ["بَچ", "چه"], word: "بَچّه", pic: "🧒", say: "بَچ ... چه ... بچه" },
      { type: "blend", parts: ["مُ", "رَب", "با"], word: "مُرَبّا", pic: "🍓", say: "مُ ... رَب ... با ... مربا" },
      { type: "blend", parts: ["لُط", "فاً"], word: "لُطفاً", pic: "🙏", say: "لُط ... فَن ... لطفاً" },
      { type: "choose", show: "مُرَبّا", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧒", value: "بَچّه" }, { label: "🍓", value: "مُرَبّا" }, { label: "🪚", value: "اَرّه" }], answer: "مُرَبّا", pic: true },
      { type: "choose", show: "🧒", prompt: "کدام کلمه «بَچّه» است؟", say: "کدام کلمه بچه است؟", options: ["بَچّه", "اَرّه", "لُطفاً"], answer: "بَچّه" },
      { type: "passage", text: "بَچّه‌ها در حَیاط بازی می‌کُنَند. مادَربُزُرگ می‌گوید: «لُطفاً آرام بازی کُنید.»", question: "بچه‌ها کجا بازی می‌کنند؟",
        options: ["کِلاس", "حَیاط", "باغ"], answer: "حَیاط" }
    ]
  }
);
