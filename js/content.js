/* باغچه — curriculum data. Lessons are plain data so teachers can add or translate them without touching the engine.
   Step types: intro, choose, trace, blend, passage, count, tenframe, make, numline, tens, compare, shape, measure, money,
   talk, breathe, feelings (see js/engine.js). */
var B = window.B || {};
window.B = B;

// Gardens (levels). Typical ages live only in the parent guide, never in the children's view.
B.LEVELS = [
  { id: "seed", name: "دانه", emoji: "🌰" },
  { id: "sprout", name: "جوانه", emoji: "🌱" },
  { id: "sapling", name: "نهال", emoji: "🌿" },
  { id: "tree", name: "درخت", emoji: "🌳" },
  { id: "forest", name: "جنگل", emoji: "🌲" }
];

B.SUBJECTS = [
  { id: "read", name: "فارسی", emoji: "📖", leveled: true },
  { id: "math", name: "ریاضی", emoji: "🔢", leveled: true },
  { id: "feel", name: "احساس‌های من", emoji: "💛", leveled: false }
];

B.NUMBER_WORDS = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه", "ده",
  "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده", "بیست"];

B.LESSONS = [
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

  // ---------------- Reading: Sapling (the remaining first letters, short vowels, sentences) ----------------
  // Letters follow the first-grade textbook order after «س»: او، ت، ر، ای، ن، ز، ش، اِ، اُ، ک.
  // Words and passages use only letters taught earlier; instructions and questions are for the grown-up to read aloud.
  {
    id: "read-sapling-1", subject: "read", level: "sapling", emoji: "👃", title: "«او» و «ت»",
    steps: [
      { type: "intro", letter: "او", text: "این «او» است؛ مثل صدای آخر «بو». «و» به حرف بعدی نمی‌چسبد.", say: "او. مثل بو",
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
      { type: "intro", letter: "ای", text: "این «ای» است؛ مثل صدای وسط «سیب».", say: "ای. مثل سیب",
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
  },

  // ---------------- Math: Seed (counting real things) ----------------
  {
    id: "math-seed-1", subject: "math", level: "seed", emoji: "🍎", title: "شمردن تا پنج",
    steps: [
      { type: "count", thing: "🍎", n: 2, options: [1, 2, 3] },
      { type: "count", thing: "🐟", n: 3, options: [2, 3, 4] },
      { type: "count", thing: "⭐", n: 4, options: [3, 4, 5] },
      { type: "count", thing: "🎈", n: 5, options: [5, 4, 6] }
    ]
  },
  {
    id: "math-seed-2", subject: "math", level: "seed", emoji: "🐞", title: "شمردن تا ده",
    steps: [
      { type: "count", thing: "🍓", n: 6, options: [5, 6, 7] },
      { type: "count", thing: "🐞", n: 7, options: [8, 6, 7] },
      { type: "count", thing: "🌸", n: 8, options: [7, 8, 9] },
      { type: "count", thing: "🐥", n: 10, options: [9, 10, 8] }
    ]
  },

  // ---------------- Math: Sprout (from objects, to pictures, to numbers) ----------------
  {
    id: "math-sprout-1", subject: "math", level: "sprout", emoji: "🔟", title: "قاب ده‌تایی",
    steps: [
      { type: "count", thing: "🍊", n: 5, options: [4, 5, 6] },
      { type: "tenframe", n: 5, prompt: "در قاب چندتا مهره هست؟", options: [5, 6, 4] },
      { type: "tenframe", n: 7, prompt: "در قاب چندتا مهره هست؟", options: [6, 8, 7] },
      { type: "make", n: 4 },
      { type: "make", n: 9 },
      { type: "tenframe", n: 10, prompt: "در قاب چندتا مهره هست؟", options: [9, 10, 8] }
    ]
  },
  {
    id: "math-sprout-2", subject: "math", level: "sprout", emoji: "🤝", title: "چندتا تا ده؟",
    steps: [
      { type: "tenframe", n: 8, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [1, 2, 3] },
      { type: "tenframe", n: 6, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [4, 3, 5] },
      { type: "tenframe", n: 3, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [6, 8, 7] },
      { type: "tenframe", n: 5, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [5, 4, 6] },
      { type: "tenframe", n: 9, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [2, 1, 0] }
    ]
  },
  {
    id: "math-sprout-3", subject: "math", level: "sprout", emoji: "🥚", title: "عددهای ۱۱ تا ۲۰",
    steps: [
      { type: "count", thing: "🥚", n: 12, options: [11, 12, 13] },
      { type: "tenframe", n: 13, prompt: "یک قاب پر، یعنی ده تا. روی هم چندتا مهره هست؟", options: [12, 13, 3] },
      { type: "tenframe", n: 16, prompt: "روی هم چندتا مهره هست؟", options: [16, 6, 15] },
      { type: "make", n: 14 },
      { type: "tenframe", n: 19, prompt: "روی هم چندتا مهره هست؟", options: [18, 20, 19] },
      { type: "make", n: 20 },
      { type: "choose", prompt: "ده و هفت می‌شود چند؟", say: "ده و هفت می‌شود چند؟", options: ["۷۱", "۱۷", "۱۰"], answer: "۱۷" }
    ]
  },
  {
    id: "math-sprout-4", subject: "math", level: "sprout", emoji: "⚖️", title: "بیشتر یا کمتر؟",
    steps: [
      { type: "compare", a: 7, b: 4, thing: "🍎", ask: "more" },
      { type: "compare", a: 5, b: 9, thing: "🐟", ask: "more" },
      { type: "compare", a: 8, b: 6, thing: "⭐", ask: "less" },
      { type: "compare", a: 12, b: 15, ask: "more" },
      { type: "compare", a: 19, b: 11, ask: "less" },
      { type: "compare", a: 17, b: 14, ask: "more" }
    ]
  },
  {
    id: "math-sprout-5", subject: "math", level: "sprout", emoji: "🍐", title: "جمع تا ده",
    steps: [
      { type: "count", thing: "🍐", n: 5, options: [4, 5, 6] },
      { type: "tenframe", n: 3, plus: 2, options: [4, 5, 6] },
      { type: "tenframe", n: 4, plus: 3, options: [7, 6, 8] },
      { type: "tenframe", n: 5, plus: 4, options: [8, 10, 9] },
      { type: "tenframe", n: 6, plus: 4, options: [10, 9, 11] },
      { type: "choose", ltr: true, show: "۲ + ۵ = ؟", prompt: "جواب چند است؟", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۳ + ۳ = ؟", prompt: "جواب چند است؟", options: ["۶", "۵", "۳"], answer: "۶" }
    ]
  },
  {
    id: "math-sprout-6", subject: "math", level: "sprout", emoji: "🍪", title: "کم کردن تا ده",
    steps: [
      { type: "tenframe", n: 5, minus: 2, options: [2, 3, 4] },
      { type: "tenframe", n: 7, minus: 3, options: [4, 3, 5] },
      { type: "tenframe", n: 9, minus: 4, options: [6, 4, 5] },
      { type: "tenframe", n: 10, minus: 6, options: [4, 5, 3] },
      { type: "choose", ltr: true, show: "۸ − ۵ = ؟", prompt: "جواب چند است؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", ltr: true, show: "۶ − ۶ = ؟", prompt: "جواب چند است؟", options: ["۶", "۱", "۰"], answer: "۰" }
    ]
  },
  {
    id: "math-sprout-7", subject: "math", level: "sprout", emoji: "🔺", title: "شکل‌ها",
    steps: [
      { type: "shape", show: ["circle", "square", "triangle", "rectangle"], prompt: "این‌ها دایره، مربع، مثلث و مستطیل‌اند." },
      { type: "shape", prompt: "دایره کدام است؟", options: ["square", "circle", "triangle"], answer: "circle" },
      { type: "shape", prompt: "مثلث کدام است؟", options: ["circle", "rectangle", "triangle-tilt"], answer: "triangle" },
      { type: "shape", prompt: "مربع کدام است؟", options: ["rectangle", "triangle", "square-tilt"], answer: "square" },
      { type: "shape", prompt: "مستطیل کدام است؟", options: ["rectangle-tall", "circle", "triangle"], answer: "rectangle" },
      { type: "shape", show: "triangle", prompt: "مثلث چند ضلع دارد؟", options: [4, 3, 5], answer: 3 },
      { type: "shape", show: "rectangle", prompt: "مستطیل چند ضلع دارد؟", options: [3, 5, 4], answer: 4 },
      { type: "shape", show: "circle", prompt: "کدام شبیه این شکل است؟", pic: true,
        options: [{ label: "🚪", value: "در" }, { label: "🍪", value: "شیرینی" }, { label: "🍕", value: "پیتزا" }], answer: "شیرینی" },
      { type: "shape", show: "triangle", prompt: "کدام شبیه این شکل است؟", pic: true,
        options: [{ label: "🍕", value: "پیتزا" }, { label: "⚽", value: "توپ" }, { label: "🚪", value: "در" }], answer: "پیتزا" }
    ]
  },

  // ---------------- Math: Sapling (to 100: making ten, tens and ones, comparing, adding and taking away, measuring, money) ----------------
  // Lessons are listed in teaching order; ids are only names, so new ones keep counting up.
  {
    id: "math-sapling-3", subject: "math", level: "sapling", emoji: "🧩", title: "جمع با ساختن ده",
    steps: [
      { type: "tenframe", n: 9, plus: 3, options: [11, 12, 13] },
      { type: "tenframe", n: 8, plus: 5, options: [12, 14, 13] },
      { type: "tenframe", n: 7, plus: 6, options: [13, 12, 14] },
      { type: "tenframe", n: 9, plus: 6, options: [16, 15, 14] },
      { type: "choose", ltr: true, show: "۸ + ۴ = ؟", prompt: "اول ده بساز. جواب چند است؟", options: ["۱۱", "۱۲", "۱۳"], answer: "۱۲" },
      { type: "choose", ltr: true, show: "۹ + ۸ = ؟", prompt: "اول ده بساز. جواب چند است؟", options: ["۱۸", "۱۶", "۱۷"], answer: "۱۷" }
    ]
  },
  {
    id: "math-sapling-1", subject: "math", level: "sapling", emoji: "🐸", title: "جمع با پرش قورباغه",
    steps: [
      { type: "numline", a: 8, b: 5, options: [12, 13, 14] },
      { type: "numline", a: 6, b: 7, options: [13, 12, 14] },
      { type: "numline", a: 9, b: 4, options: [14, 12, 13] },
      { type: "numline", a: 12, b: 5, options: [17, 16, 18] },
      { type: "numline", a: 7, b: 8, options: [14, 15, 16] }
    ]
  },
  {
    id: "math-sapling-2", subject: "math", level: "sapling", emoji: "🐇", title: "تفریق با پرش خرگوش",
    steps: [
      { type: "numline", a: 13, b: -5, thing: "🐇", options: [7, 8, 9] },
      { type: "numline", a: 15, b: -7, thing: "🐇", options: [8, 9, 7] },
      { type: "numline", a: 11, b: -4, thing: "🐇", options: [6, 8, 7] },
      { type: "numline", a: 18, b: -9, thing: "🐇", options: [9, 10, 8] }
    ]
  },
  {
    id: "math-sapling-4", subject: "math", level: "sapling", emoji: "🧮", title: "دسته‌های ده‌تایی",
    steps: [
      { type: "tens", build: true, n: 13 },
      { type: "tens", n: 20, options: [2, 20, 12] },
      { type: "tens", n: 30, options: [13, 3, 30] },
      { type: "tens", n: 24, options: [42, 24, 6] },
      { type: "tens", build: true, n: 35 },
      { type: "tens", n: 47, options: [47, 74, 11] },
      { type: "tens", n: 60, options: [16, 60, 6] }
    ]
  },
  {
    id: "math-sapling-5", subject: "math", level: "sapling", emoji: "💯", title: "عددها تا ۱۰۰",
    steps: [
      { type: "tens", n: 56, options: [65, 11, 56] },
      { type: "tens", build: true, n: 72 },
      { type: "choose", prompt: "۳ دسته ده‌تایی و ۸ چوب. روی هم چندتاست؟", options: ["۸۳", "۳۸", "۱۱"], answer: "۳۸" },
      { type: "choose", show: "۶۴", prompt: "در این عدد چند دسته ده‌تایی هست؟", options: ["۴", "۱۰", "۶"], answer: "۶" },
      { type: "choose", prompt: "بعد از ۳۹ کدام عدد می‌آید؟", options: ["۳۸", "۴۰", "۵۰"], answer: "۴۰" },
      { type: "choose", prompt: "قبل از ۷۰ کدام عدد است؟", options: ["۶۹", "۷۱", "۶۰"], answer: "۶۹" },
      { type: "tens", n: 100, options: [10, 90, 100] }
    ]
  },
  {
    id: "math-sapling-6", subject: "math", level: "sapling", emoji: "⚖️", title: "مقایسه عددها",
    steps: [
      { type: "compare", a: 34, b: 43, pic: "tens", ask: "more" },
      { type: "compare", a: 52, b: 25, pic: "tens", ask: "less" },
      { type: "compare", a: 61, b: 58, pic: "tens", ask: "symbol" },
      { type: "compare", a: 27, b: 72, pic: "tens", ask: "symbol" },
      { type: "compare", a: 45, b: 45, pic: "tens", ask: "symbol" },
      { type: "compare", a: 89, b: 98, ask: "symbol" },
      { type: "compare", a: 70, b: 69, ask: "symbol" }
    ]
  },
  {
    id: "math-sapling-7", subject: "math", level: "sapling", emoji: "➕", title: "جمع عددهای دورقمی",
    steps: [
      { type: "tens", n: 20, b: 30, options: [5, 50, 23] },
      { type: "tens", n: 34, b: 25, options: [59, 58, 69] },
      { type: "tens", n: 41, b: 16, options: [56, 67, 57] },
      { type: "tens", n: 38, b: 25, options: [53, 63, 64] },
      { type: "choose", ltr: true, show: "۵۲ + ۳۶ = ؟", prompt: "جواب چند است؟", options: ["۸۸", "۸۷", "۷۸"], answer: "۸۸" },
      { type: "choose", ltr: true, show: "۴۷ + ۲۸ = ؟", prompt: "جواب چند است؟", options: ["۶۵", "۷۴", "۷۵"], answer: "۷۵" }
    ]
  },
  {
    id: "math-sapling-8", subject: "math", level: "sapling", emoji: "➖", title: "تفریق عددهای دورقمی",
    steps: [
      { type: "tens", n: 50, b: -20, options: [30, 70, 3] },
      { type: "tens", n: 47, b: -23, options: [25, 24, 14] },
      { type: "tens", n: 68, b: -35, options: [33, 32, 43] },
      { type: "tens", n: 42, b: -17, options: [35, 24, 25] },
      { type: "choose", ltr: true, show: "۷۹ − ۴۶ = ؟", prompt: "جواب چند است؟", options: ["۳۳", "۳۲", "۴۳"], answer: "۳۳" },
      { type: "choose", ltr: true, show: "۶۰ − ۲۴ = ؟", prompt: "جواب چند است؟", options: ["۴۴", "۳۶", "۳۴"], answer: "۳۶" }
    ]
  },
  {
    id: "math-sapling-9", subject: "math", level: "sapling", emoji: "📏", title: "اندازه‌گیری",
    steps: [
      { type: "measure", ask: "longer", bars: [{ thing: "🖍️", len: 4 }, { thing: "✏️", len: 6 }] },
      { type: "measure", ask: "shorter", bars: [{ thing: "🐍", len: 8 }, { thing: "🐛", len: 3 }, { thing: "🦎", len: 5 }] },
      { type: "measure", ask: "longer", bars: [{ thing: "🥄", len: 4 }, { thing: "🍴", len: 5 }, { thing: "🔑", len: 2 }] },
      { type: "measure", ask: "count", bars: [{ thing: "✏️", len: 5 }], unit: "📎", prompt: "مداد چند گیره است؟", options: [4, 5, 6] },
      { type: "measure", ask: "count", bars: [{ thing: "🥄", len: 3 }], unit: "📎", prompt: "قاشق چند گیره است؟", options: [3, 4, 2] },
      { type: "measure", ask: "count", bars: [{ thing: "🧣", len: 6 }], unit: "✋", prompt: "شال‌گردن چند وجب است؟", options: [7, 5, 6] }
    ]
  },
  {
    id: "math-sapling-10", subject: "math", level: "sapling", emoji: "🍞", title: "خرید از نانوایی",
    steps: [
      { type: "money", prompt: "این پول روی هم چقدر است؟", bills: [5, 1, 1], options: [6, 7, 8] },
      { type: "money", prompt: "این پول روی هم چقدر است؟", bills: [10, 5, 2], options: [17, 16, 15] },
      { type: "money", prompt: "پول نان را بده.", items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }], wallet: [5, 2, 1, 1, 10] },
      { type: "money", prompt: "دو تا نان سنگک روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }, { emoji: "🍞", name: "نان سنگک", price: 6 }], options: [6, 12, 11] },
      { type: "money", prompt: "پول دو تا نان را بده.",
        items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }, { emoji: "🍞", name: "نان سنگک", price: 6 }], wallet: [10, 5, 1, 1, 2] },
      { type: "money", prompt: "۱۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }],
        bills: [10], answer: 4, options: [5, 4, 3] }
    ]
  },
  {
    id: "math-sapling-11", subject: "math", level: "sapling", emoji: "🧺", title: "خرید از بازار",
    steps: [
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍎", name: "سیب", price: 30 }, { emoji: "🍊", name: "پرتقال", price: 20 }], options: [40, 50, 60] },
      { type: "money", prompt: "پول خیار را بده.", items: [{ emoji: "🥒", name: "خیار", price: 15 }], wallet: [10, 2, 5, 5, 1] },
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🧀", name: "پنیر", price: 35 }, { emoji: "🥛", name: "شیر", price: 25 }], options: [50, 60, 70] },
      { type: "money", prompt: "۵۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍉", name: "هندوانه", price: 45 }],
        bills: [50], answer: 5, options: [15, 10, 5] },
      { type: "money", prompt: "پول انگور را بده.", items: [{ emoji: "🍇", name: "انگور", price: 28 }], wallet: [20, 10, 5, 2, 1, 1] },
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍅", name: "گوجه‌فرنگی", price: 24 }, { emoji: "🥔", name: "سیب‌زمینی", price: 18 }], options: [32, 42, 41] }
    ]
  },

  // ---------------- Me and my feelings (for every child, not leveled) ----------------
  {
    id: "feel-1", subject: "feel", level: null, emoji: "🌷", title: "نفس گل و شمع",
    steps: [
      { type: "breathe", cycles: 4 },
      { type: "feelings" }
    ]
  }
];

/* Placement check, modelled on the ASER/TaRL one-to-one assessment: the parent shows each item
   and answers yes/no. The first "not yet" decides the starting garden. */
B.PLACEMENT = {
  read: [
    { title: "حرف‌ها", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این حرف‌ها را بگوید (نام یا صدایش را)؟",
      items: ["ب", "د", "م", "س", "ر"], ifNot: "seed" },
    { title: "کلمه‌ها", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این کلمه‌ها را بخواند؟",
      items: ["آب", "بابا", "سَبَد", "دَست", "کِتاب"], ifNot: "sprout" },
    { title: "بند کوتاه", ask: "آیا کودک می‌تواند این چند جمله را آرام اما درست بخواند (با کمتر از ۳ اشتباه)؟",
      text: "سارا یک گربه دارد. گربه سفید است. سارا با گربه بازی می‌کند. گربه شیر می‌خورد.", ifNot: "sapling" },
    { title: "داستان", ask: "آیا کودک می‌تواند این داستان را روان بخواند و بگوید چرا رضا خوشحال شد؟",
      text: "رضا و مادربزرگش در باغ درخت کاشتند. هر روز صبح رضا به درخت آب می‌داد. روزها گذشت و درخت کوچک بزرگ‌تر شد. تابستان که آمد، درخت پر از سیب‌های سرخ بود. رضا یک سیب چید و آن را با مادربزرگ نصف کرد. رضا خیلی خوشحال بود، چون درختی که خودش کاشته بود میوه داده بود.",
      ifNot: "tree" }
  ],
  readTop: "forest",
  math: [
    { title: "شمردن", ask: "آیا کودک می‌تواند این‌ها را یکی‌یکی درست بشمارد؟", items: ["🍎🍎🍎🍎🍎🍎🍎"], ifNot: "seed" },
    { title: "عددهای یک‌رقمی", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این عددها را بخواند؟", items: ["۳", "۷", "۵", "۹", "۲"], ifNot: "sprout" },
    { title: "عددهای دورقمی", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این عددها را بخواند؟", items: ["۲۳", "۴۷", "۶۱", "۸۵", "۳۹"], ifNot: "sprout" },
    { title: "تفریق", ask: "آیا کودک می‌تواند دست‌کم یکی از این دو را روی کاغذ درست حل کند؟", items: ["۵۲ − ۲۷", "۴۳ − ۱۸"], ifNot: "sapling" },
    { title: "تقسیم", ask: "آیا کودک می‌تواند این تقسیم را روی کاغذ درست حل کند؟", items: ["۶۸۴ ÷ ۴"], ifNot: "tree" }
  ],
  mathTop: "forest"
};

B.levelById = function (id) { return B.LEVELS.find(function (l) { return l.id === id; }); };
B.subjectById = function (id) { return B.SUBJECTS.find(function (s) { return s.id === id; }); };
B.lessonById = function (id) { return B.LESSONS.find(function (l) { return l.id === id; }); };
B.lessonsFor = function (subject, level) {
  return B.LESSONS.filter(function (l) { return l.subject === subject && (l.level === level || l.level === null); });
};
