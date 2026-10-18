/* باغچه — ریاضی (math) lessons.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

B.LESSONS.push(
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

  {
    id: "math-seed-3", subject: "math", level: "seed", emoji: "🐰", title: "بازی غذا دادن",
    steps: [
      { type: "story", prompt: "به قصه نگاه کن و بشمار",
        cast: { hen: "🐔", c1: "🐥", c2: "🐥", c3: "🐥", grain: "🌾" },
        scenes: [
          { caption: "مرغ در حیاط دانه می‌خورد.", at: { hen: [78, 60, { size: 1.5 }], grain: [60, 78, { size: 0.8 }] } },
          { caption: "یک جوجه آمد.", at: { c1: [44, 72, { act: "bounce" }] } },
          { caption: "باز هم یک جوجه آمد.", at: { c2: [34, 74, { act: "bounce" }] } },
          { caption: "باز هم یک جوجه آمد.", at: { c3: [24, 72, { act: "bounce" }] } }
        ],
        question: "چند جوجه پیش مرغ آمد؟", pic: true,
        options: [{ label: "🐥🐥", value: 2 }, { label: "🐥🐥🐥", value: 3 }, { label: "🐥🐥🐥🐥", value: 4 }], answer: 3 },
      { type: "feed", animal: "🐰", food: "🥕", n: 3, prompt: "خرگوش گرسنه است. سه تا هویج به او بده." },
      { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
        pairs: [[{ dots: 2 }, "🍎🍎"], [{ dots: 4 }, "🐟🐟🐟🐟"], [{ dots: 1 }, "⭐"], [{ dots: 3 }, "🎈🎈🎈"]] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 5, prompt: "سنجاب گرسنه است. پنج تا به او بده." },
      { type: "pattern", prompt: "بعدی کدام است؟", seq: ["🍎", "🍌", "🍎", "🍌", "🍎", "🍌"], blanks: [5], options: ["🍌", "🍎", "🍇"] },
      { type: "order", prompt: "از کم به زیاد بچین", ltr: true, items: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }] }
    ]
  },
  {
    id: "math-seed-4", subject: "math", level: "seed", emoji: "🐘", title: "بزرگ و کوچک",
    steps: [
      { type: "story", prompt: "ببین و گوش کن", bg: "street",
        cast: { girl: "👧", melon: "🍉", apple: "🍎" },
        scenes: [
          { caption: "مریم با مادرش به بازار رفته است.", at: { girl: [84, 72] } },
          { caption: "این هندوانه بزرگ است.", at: { melon: [36, 63, { size: 2.2, act: "grow" }] } },
          { caption: "این سیب کوچک است.", at: { apple: [62, 74, { size: 0.8, act: "bounce" }] } },
          { caption: "هندوانه از سیب بزرگ‌تر است. سیب از هندوانه کوچک‌تر است.", at: { melon: [36, 63, { size: 2.2, act: "bounce" }] } }
        ],
        question: "کدام کوچک‌تر است؟", pic: true,
        options: [{ label: "🍉", value: "هندوانه" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "کدام بزرگ‌تر است؟", say: "کدام بزرگ‌تر است؟ فیل یا موش؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🐘", value: "فیل" }], answer: "فیل" },
      { type: "choose", prompt: "کدام از همه کوچک‌تر است؟", say: "کدام از همه کوچک‌تر است؟ گاو، مورچه یا اسب؟", pic: true,
        options: [{ label: "🐄", value: "گاو" }, { label: "🐜", value: "مورچه" }, { label: "🐎", value: "اسب" }], answer: "مورچه" },
      { type: "measure", ask: "longer", bars: [{ thing: "🖍️", len: 3 }, { thing: "✏️", len: 7 }] },
      { type: "measure", ask: "shorter", bars: [{ thing: "🐍", len: 8 }, { thing: "🐛", len: 2 }, { thing: "🦎", len: 5 }] },
      { type: "measure", ask: "longer", bars: [{ thing: "🥄", len: 3 }, { thing: "🧣", len: 8 }, { thing: "🔑", len: 2 }] },
      { type: "story", prompt: "ببین و گوش کن",
        cast: { girl: "🧍‍♀️", boy: "🧍‍♂️", tree: "🌳" },
        scenes: [
          { caption: "نرگس و برادرش آرش در حیاط هستند.", at: { girl: [30, 66, { size: 1.8 }], boy: [50, 70, { size: 1.3 }] } },
          { caption: "قد نرگس بلندتر است.", at: { girl: [30, 66, { size: 1.8, act: "bounce" }] } },
          { caption: "قد آرش کوتاه‌تر است.", at: { boy: [50, 70, { size: 1.3, act: "bounce" }] } },
          { caption: "درخت حیاط از هر دو بلندتر است!", at: { tree: [76, 60, { size: 2.6, act: "grow" }] } }
        ],
        question: "کدام از همه بلندتر است؟", pic: true,
        options: [{ label: "🧍‍♀️", value: "نرگس" }, { label: "🧍‍♂️", value: "آرش" }, { label: "🌳", value: "درخت" }], answer: "درخت" }
    ]
  },
  {
    id: "math-seed-5", subject: "math", level: "seed", emoji: "🧺", title: "دسته کن",
    steps: [
      { type: "sort", prompt: "قرمزها یک طرف، سبزها یک طرف",
        say: "میوه‌ها و سبزی‌های قرمز را در یک سبد بگذار و سبزها را در سبد دیگر.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "سبز", pic: "🟢", value: "green" }],
        items: [
          { pic: "🍎", say: "سیب", basket: "red" },
          { pic: "🍅", say: "گوجه‌فرنگی", basket: "red" },
          { pic: "🍓", say: "توت‌فرنگی", basket: "red" },
          { pic: "🥒", say: "خیار", basket: "green" },
          { pic: "🍏", say: "سیب سبز", basket: "green" },
          { pic: "🥬", say: "کاهو", basket: "green" }
        ] },
      { type: "sort", prompt: "اسباب‌بازی‌ها را جمع کن",
        say: "اسباب‌بازی‌های قرمز را در یک جعبه بگذار و آبی‌ها را در جعبه دیگر.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "آبی", pic: "🔵", value: "blue" }],
        items: [
          { pic: "🚗", say: "ماشین قرمز", basket: "red" },
          { pic: "🚙", say: "ماشین آبی", basket: "blue" },
          { pic: "🎈", say: "بادکنک قرمز", basket: "red" },
          { pic: "🧢", say: "کلاه آبی", basket: "blue" },
          { pic: "🚒", say: "ماشین آتش‌نشانی", basket: "red" },
          { pic: "🐳", say: "نهنگ آبی", basket: "blue" }
        ] },
      { type: "sort", prompt: "هر چیز را در سبد رنگ خودش بگذار",
        say: "قرمزها، زردها و آبی‌ها. هر چیز را در سبد رنگ خودش بگذار.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "زرد", pic: "🟡", value: "yellow" }, { label: "آبی", pic: "🔵", value: "blue" }],
        items: [
          { pic: "🍒", say: "گیلاس", basket: "red" },
          { pic: "🍋", say: "لیمو", basket: "yellow" },
          { pic: "💧", say: "قطره آب", basket: "blue" },
          { pic: "🌹", say: "گل سرخ", basket: "red" },
          { pic: "🌻", say: "گل آفتابگردان", basket: "yellow" },
          { pic: "👖", say: "شلوار", basket: "blue" }
        ] },
      { type: "sort", prompt: "گردها یک طرف، چهارگوش‌ها یک طرف",
        say: "به شکل‌شان نگاه کن، نه به رنگ‌شان. گردها را در یک سبد بگذار و چهارگوش‌ها را در سبد دیگر.",
        baskets: [{ label: "گرد", pic: "⚪", value: "round" }, { label: "چهارگوش", pic: "⬜", value: "square" }],
        items: [
          { pic: "🔴", say: "گرد قرمز", basket: "round" },
          { pic: "🟥", say: "چهارگوش قرمز", basket: "square" },
          { pic: "🔵", say: "گرد آبی", basket: "round" },
          { pic: "🟦", say: "چهارگوش آبی", basket: "square" },
          { pic: "🟡", say: "گرد زرد", basket: "round" },
          { pic: "🟨", say: "چهارگوش زرد", basket: "square" }
        ] },
      { type: "sort", prompt: "بزرگ‌ها یک طرف، کوچک‌ها یک طرف",
        say: "چیزهای بزرگ را در یک سبد بگذار و چیزهای کوچک را در سبد دیگر.",
        baskets: [{ label: "بزرگ", pic: "🐘", value: "big" }, { label: "کوچک", pic: "🐜", value: "small" }],
        items: [
          { pic: "🚌", say: "اتوبوس", basket: "big" },
          { pic: "🔑", say: "کلید", basket: "small" },
          { pic: "🌳", say: "درخت", basket: "big" },
          { pic: "🐞", say: "کفشدوزک", basket: "small" },
          { pic: "🏠", say: "خانه", basket: "big" },
          { pic: "🍒", say: "گیلاس", basket: "small" }
        ] }
    ]
  },
  {
    id: "math-seed-6", subject: "math", level: "seed", emoji: "🐈", title: "کجاست؟",
    steps: [
      { type: "story", prompt: "ببین و گوش کن",
        cast: { tree: "🌳", bird: "🐦", cat: "🐈", ball: "⚽" },
        scenes: [
          { caption: "این درخت حیاط است.", at: { tree: [50, 55, { size: 2.2 }] } },
          { caption: "گنجشک بالای درخت است.", at: { bird: [50, 22, { act: "bounce" }] } },
          { caption: "گربه پایین درخت است.", at: { cat: [50, 82, { act: "bounce" }] } },
          { caption: "توپ کنار درخت است.", at: { ball: [76, 76, { act: "bounce" }] } }
        ] },
      { type: "story", prompt: "ببین و گوش کن",
        cast: { boy: "👦", tree: "🌳", girl: "👧" },
        scenes: [
          { caption: "سارا و کامران قایم‌باشک بازی می‌کنند.", at: { tree: [50, 55, { size: 2.2 }], girl: [22, 72], boy: [80, 72] } },
          { caption: "کامران پشت درخت قایم شد.", at: { boy: [57, 62] } },
          { caption: "سارا جلوی درخت آمد.", at: { girl: [46, 70, { size: 1.2 }] } },
          { caption: "پیدات کردم!", at: { boy: [76, 72, { act: "bounce" }], girl: [46, 70, { size: 1.2, act: "bounce" }] } }
        ],
        question: "چه کسی پشت درخت قایم شد؟", pic: true,
        options: [{ label: "👧", value: "سارا" }, { label: "👦", value: "کامران" }], answer: "کامران" },
      { type: "story", prompt: "ببین و جواب بده",
        cast: { house: "🏠", sun: "☀️", dog: "🐕" },
        scenes: [
          { caption: "یک خانه، یک خورشید و یک سگ. کدام بالای خانه است؟",
            at: { house: [40, 58, { size: 2 }], sun: [40, 16], dog: [72, 76] } }
        ],
        question: "کدام بالای خانه است؟", pic: true,
        options: [{ label: "🐕", value: "سگ" }, { label: "☀️", value: "خورشید" }, { label: "🏠", value: "خانه" }], answer: "خورشید" },
      { type: "story", prompt: "ببین و جواب بده",
        cast: { apple: "🍎", basket: "🧺", pear: "🍐" },
        scenes: [
          { caption: "مادربزرگ از بازار میوه خریده است.", at: { basket: [44, 68, { size: 1.8 }], pear: [72, 75] } },
          { caption: "سیب را داخل سبد گذاشت. گلابی کنار سبد است.", at: { apple: [44, 60, { act: "bounce" }] } }
        ],
        question: "چه چیزی داخل سبد است؟", pic: true,
        options: [{ label: "🍐", value: "گلابی" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "دستت را بالا ببر! بالا کدام طرف است؟", say: "دستت را بالا ببر! بالا کدام طرف است؟", pic: true,
        options: [{ label: "⬇️", value: "پایین" }, { label: "⬆️", value: "بالا" }], answer: "بالا" },
      { type: "choose", prompt: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", say: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", pic: true,
        options: [{ label: "⬆️", value: "بالا" }, { label: "⬇️", value: "پایین" }], answer: "پایین" },
      { type: "story", prompt: "ببین و جواب بده",
        cast: { tree: "🌳", cat: "🐈", bird: "🐦" },
        scenes: [
          { caption: "گنجشک کنار گربه نشسته بود. پرید و رفت بالای درخت.",
            at: { tree: [50, 55, { size: 2.2 }], cat: [24, 76], bird: [36, 78] } },
          { caption: "حالا گنجشک کجاست؟", at: { bird: [50, 22, { act: "bounce" }] } }
        ],
        question: "گنجشک کجاست؟", pic: true,
        options: [{ label: "⬆️", value: "بالای درخت" }, { label: "⬇️", value: "پایین درخت" }], answer: "بالای درخت" }
    ]
  },
  {
    id: "math-seed-7", subject: "math", level: "seed", emoji: "⚽", title: "شکل‌های دور و بر ما",
    steps: [
      { type: "shape", show: ["circle", "square", "triangle"], prompt: "این دایره است، این مربع و این مثلث." },
      { type: "shape", prompt: "دایره کدام است؟", options: ["square", "circle", "triangle"], answer: "circle" },
      { type: "shape", prompt: "مثلث کدام است؟", options: ["circle", "square", "triangle-tilt"], answer: "triangle" },
      { type: "shape", prompt: "مربع کدام است؟", options: ["triangle", "square-tilt", "circle"], answer: "square" },
      { type: "shape", show: "circle", prompt: "کدام شبیه دایره است؟", say: "کدام شبیه دایره است؟ توپ، کتاب یا موز؟", pic: true,
        options: [{ label: "📕", value: "کتاب" }, { label: "⚽", value: "توپ" }, { label: "🍌", value: "موز" }], answer: "توپ" },
      { type: "shape", show: "square", prompt: "کدام شبیه مربع است؟", say: "کدام شبیه مربع است؟ ماه، جعبه کادو یا موز؟", pic: true,
        options: [{ label: "🌙", value: "ماه" }, { label: "🍌", value: "موز" }, { label: "🎁", value: "جعبه" }], answer: "جعبه" },
      { type: "shape", show: "triangle", prompt: "کدام شبیه مثلث است؟", say: "کدام شبیه مثلث است؟ چادر عشایر، توپ یا جعبه؟", pic: true,
        options: [{ label: "⚽", value: "توپ" }, { label: "⛺", value: "چادر" }, { label: "🎁", value: "جعبه" }], answer: "چادر" },
      { type: "doit", pic: "🏠 🔍", text: "در خانه بگرد و این شکل‌ها را پیدا کن:",
        list: ["یک چیز گرد، مثل بشقاب یا نان تافتون", "یک چیز مربع، مثل کاشی یا دستمال", "یک چیز مثلث، مثل یک تکه هندوانه"] }
    ]
  },
  {
    id: "math-seed-8", subject: "math", level: "seed", emoji: "🔁", title: "الگو بساز",
    steps: [
      { type: "pattern", prompt: "بعدی کدام است؟", say: "قرمز، آبی، قرمز، آبی. بعدی کدام است؟",
        seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], blanks: [5], options: ["🔴", "🔵", "🟡"] },
      { type: "pattern", prompt: "سالاد شیرازی! خیار، گوجه، خیار، گوجه…", say: "خیار، گوجه، خیار، گوجه. جاهای خالی را پر کن.",
        seq: ["🥒", "🍅", "🥒", "🍅", "🥒", "🍅"], blanks: [4, 5], options: ["🍅", "🥒", "🧅"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "گل، گل، برگ. گل، گل، برگ. بعدی کدام است؟",
        seq: ["🌸", "🌸", "🍃", "🌸", "🌸", "🍃", "🌸", "🌸", "🍃"], blanks: [8], options: ["🌸", "🍃"] },
      { type: "pattern", prompt: "دست بزن، دست بزن، پا بکوب!", say: "دست، دست، پا. دست، دست، پا. با من دست بزن و پا بکوب، بعد جاهای خالی را پر کن.",
        seq: ["👏", "👏", "🦶", "👏", "👏", "🦶", "👏", "👏", "🦶"], blanks: [5, 8], options: ["👏", "🦶"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "قرمز، زرد، آبی. قرمز، زرد، آبی. بعدی کدام است؟",
        seq: ["🔴", "🟡", "🔵", "🔴", "🟡", "🔵", "🔴", "🟡"], blanks: [7], options: ["🔵", "🔴", "🟡"] },
      { type: "pattern", prompt: "مرغ، جوجه، تخم‌مرغ…", say: "مرغ، جوجه، تخم‌مرغ. مرغ، جوجه، تخم‌مرغ. جاهای خالی را پر کن.",
        seq: ["🐔", "🐥", "🥚", "🐔", "🐥", "🥚", "🐔"], blanks: [5, 6], options: ["🥚", "🐔", "🐥"] },
      { type: "pattern", prompt: "فرش را تمام کن", say: "این فرش نقش دارد: قرمز، زرد، قرمز، زرد. بقیه‌اش را تو بباف.",
        seq: ["🟥", "🟨", "🟥", "🟨", "🟥", "🟨"], blanks: [3, 4, 5], options: ["🟥", "🟨", "🟦"] }
    ]
  },
  {
    id: "math-seed-9", subject: "math", level: "seed", emoji: "🔢", title: "عددها را بشناسیم",
    steps: [
      { type: "story", prompt: "ببین و گوش کن",
        cast: { n1: "۱", f1: "🍎", n2: "۲", f2: "🍐🍐", n3: "۳", f3: "🍊🍊🍊", n4: "۴", f4: "🍓🍓🍓🍓", n5: "۵", f5: "🥚🥚🥚🥚🥚" },
        scenes: [
          { caption: "این عدد یک است. یک سیب.", at: { n1: [50, 28, { size: 1.4, act: "grow" }], f1: [50, 74] } },
          { caption: "این عدد دو است. دو گلابی.", at: { n1: null, f1: null, n2: [50, 28, { size: 1.4, act: "grow" }], f2: [50, 74] } },
          { caption: "این عدد سه است. سه پرتقال.", at: { n2: null, f2: null, n3: [50, 28, { size: 1.4, act: "grow" }], f3: [50, 74] } },
          { caption: "این عدد چهار است. چهار توت‌فرنگی.", at: { n3: null, f3: null, n4: [50, 28, { size: 1.4, act: "grow" }], f4: [50, 74] } },
          { caption: "این عدد پنج است. پنج تخم‌مرغ.", at: { n4: null, f4: null, n5: [50, 28, { size: 1.4, act: "grow" }], f5: [50, 74] } }
        ] },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 1, say: "یک" }, { dots: 1 }], [{ label: 2, say: "دو" }, { dots: 2 }], [{ label: 3, say: "سه" }, { dots: 3 }]] },
      { type: "choose", show: "۳", prompt: "این عدد را ببین. کدام دسته همین‌قدر است؟", say: "این عدد را ببین. کدام دسته همین‌قدر است؟", pic: true,
        options: [{ label: "🐟🐟", value: 2 }, { label: "🐟🐟🐟", value: 3 }, { label: "🐟🐟🐟🐟", value: 4 }], answer: 3 },
      { type: "pairs", prompt: "هر عدد را با دسته‌اش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. بشمار و هر عدد را با دسته‌اش جفت کن.",
        pairs: [[{ label: 2, say: "دو" }, "🍎🍎"], [{ label: 4, say: "چهار" }, "🍓🍓🍓🍓"], [{ label: 1, say: "یک" }, "🍐"], [{ label: 5, say: "پنج" }, "🥚🥚🥚🥚🥚"]] },
      { type: "choose", show: "۵", prompt: "این عدد را ببین. کدام دسته همین‌قدر است؟", say: "این عدد را ببین. کدام دسته همین‌قدر است؟", pic: true,
        options: [{ label: "🎈🎈🎈🎈🎈", value: 5 }, { label: "🎈🎈🎈", value: 3 }, { label: "🎈🎈🎈🎈", value: 4 }], answer: 5 },
      { type: "feed", animal: "🐦", food: "🌾", n: 4, prompt: "عدد را ببین. همان‌قدر دانه به گنجشک بده." },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 3, say: "سه" }, { dots: 3 }], [{ label: 5, say: "پنج" }, { dots: 5 }], [{ label: 4, say: "چهار" }, { dots: 4 }], [{ label: 2, say: "دو" }, { dots: 2 }]] },
      { type: "order", prompt: "عددها را از یک تا پنج بچین", say: "عددها را از یک تا پنج بچین: یک، دو، سه، چهار، پنج.", ltr: true,
        items: [{ label: 1, say: "یک" }, { label: 2, say: "دو" }, { label: 3, say: "سه" }, { label: 4, say: "چهار" }, { label: 5, say: "پنج" }] }
    ]
  },
  {
    id: "math-seed-10", subject: "math", level: "seed", emoji: "🎲", title: "بازی شمردن",
    steps: [
      { type: "feed", animal: "🐔", food: "🌽", n: 3, prompt: "مرغ گرسنه است. سه تا ذرت به او بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 2, say: "دو" }, { dots: 2 }], [{ label: 4, say: "چهار" }, { dots: 4 }], [{ label: 1, say: "یک" }, { dots: 1 }]] },
      { type: "order", prompt: "از کم به زیاد بچین", ltr: true, items: ["🍓", "🍓🍓", "🍓🍓🍓", "🍓🍓🍓🍓", "🍓🍓🍓🍓🍓"] },
      { type: "feed", animal: "🐐", food: "🌿", n: 5, prompt: "بزغاله گرسنه است. پنج تا علف به او بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با دسته‌اش جفت کن.",
        pairs: [[{ label: 3, say: "سه" }, "🐟🐟🐟"], [{ label: 5, say: "پنج" }, "🎈🎈🎈🎈🎈"], [{ label: 1, say: "یک" }, "⭐"], [{ label: 4, say: "چهار" }, "🍎🍎🍎🍎"]] },
      { type: "feed", animal: "🐈", food: "🐟", n: 4, prompt: "عدد را ببین. همان‌قدر ماهی به گربه بده." },
      { type: "order", prompt: "از پنج تا یک برعکس بشمار و بچین", say: "از پنج تا یک برعکس بشمار: پنج، چهار، سه، دو، یک.", ltr: true,
        items: [{ label: 5, say: "پنج" }, { label: 4, say: "چهار" }, { label: 3, say: "سه" }, { label: 2, say: "دو" }, { label: 1, say: "یک" }] }
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

  {
    id: "math-sprout-8", subject: "math", level: "sprout", emoji: "🥕", title: "بازی جمع",
    steps: [
      { type: "story", prompt: "ببین سیب‌ها چه می‌شوند",
        cast: { a1: "🍎", a2: "🍎", a3: "🍎", b1: "🍏", b2: "🍏", sum: "۳ + ۲ = ۵" },
        scenes: [
          { caption: "اینجا سه سیب قرمز هست.", at: { a1: [12, 62], a2: [22, 62], a3: [32, 62] } },
          { caption: "آنجا دو سیب سبز هست.", at: { b1: [72, 62], b2: [82, 62] } },
          { caption: "سیب‌ها را کنار هم می‌گذاریم.", at: { b1: [42, 62], b2: [52, 62] } },
          { caption: "روی هم پنج سیب شد. سه به‌علاوه دو می‌شود پنج.", at: { sum: [32, 24, { size: 0.8, act: "grow" }] } }
        ] },
      { type: "feed", animal: "🐰", food: "🥕", a: 3, b: 2, prompt: "جواب این جمع را حساب کن و همان‌قدر هویج به خرگوش بده." },
      { type: "feed", animal: "🐿️", food: "🌰", a: 4, b: 3, prompt: "جواب این جمع را حساب کن و همان‌قدر به سنجاب بده." },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن",
        pairs: [[3, { dots: 3 }], [5, { dots: 5 }], [7, { dots: 7 }], [9, { dots: 9 }]] },
      { type: "feed", animal: "🐔", food: "🌽", a: 5, b: 4, prompt: "جواب این جمع را حساب کن و همان‌قدر ذرت به مرغ بده." },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [3, 6, 8, 12, 15] },
      { type: "pattern", prompt: "دوتا دوتا بشمار. جای خالی را پر کن.", ltr: true, seq: [2, 4, 6, 8, 10], blanks: [3], options: [7, 8, 9] }
    ]
  },

  {
    id: "math-sprout-9", subject: "math", level: "sprout", emoji: "✏️", title: "نوشتن عددها",
    steps: [
      { type: "trace", letter: "۱", prompt: "«۱» را بنویس. از بالا به پایین.", say: "یک. از بالا شروع کن و صاف پایین بیا." },
      { type: "trace", letter: "۲", prompt: "«۲» را بنویس. اول دندانه، بعد پایین.", say: "دو. از بالا، سمت راست شروع کن. یک دندانه بکش و بعد پایین بیا." },
      { type: "trace", letter: "۳", prompt: "«۳» را بنویس. دو دندانه، بعد پایین.", say: "سه. از بالا، سمت راست شروع کن. دو دندانه بکش و بعد پایین بیا." },
      { type: "trace", letter: "۴", prompt: "«۴» را بنویس.", say: "چهار. از بالا، سمت راست شروع کن. دو بار دور بزن و پایین بیا." },
      { type: "trace", letter: "۵", prompt: "«۵» را بنویس. از نوک بالا شروع کن.", say: "پنج. از نوک بالا شروع کن، دور بزن و به همان نوک برگرد." },
      { type: "trace", letter: "۶", prompt: "«۶» را بنویس.", say: "شش. از بالا شروع کن، یک کلاه کوچک بکش و کج پایین بیا." },
      { type: "trace", letter: "۷", prompt: "«۷» و «۸» برعکس هم‌اند. «۷» را بنویس.", say: "هفت. از بالا، سمت راست شروع کن. پایین بیا و دوباره بالا برو." },
      { type: "trace", letter: "۸", prompt: "حالا «۸» را بنویس.", say: "هشت. از پایین، سمت راست شروع کن. بالا برو و دوباره پایین بیا." },
      { type: "trace", letter: "۹", prompt: "«۹» را بنویس. اول سرش، بعد پایین.", say: "نه. اول سر گرد نه را بکش، بعد صاف پایین بیا." },
      { type: "trace", letter: "۰", prompt: "«۰» را بنویس. یک دایره کوچک.", say: "صفر. یک دایره کوچک بکش." }
    ]
  },
  {
    id: "math-sprout-10", subject: "math", level: "sprout", emoji: "👣", title: "قبل و بعد",
    steps: [
      { type: "story", prompt: "ببین و گوش کن", bg: "street",
        cast: { h1: "🏠", h2: "🏠", h3: "🏠", n1: "۶", n2: "۷", n3: "۸", girl: "👧" },
        scenes: [
          { caption: "در کوچه ما هر خانه یک شماره دارد.",
            at: { h1: [22, 52, { size: 1.6 }], h2: [50, 52, { size: 1.6 }], h3: [78, 52, { size: 1.6 }], n1: [22, 20], n2: [50, 20], n3: [78, 20] } },
          { caption: "خانه زهرا شماره هفت است.", at: { girl: [50, 84, { act: "bounce" }], n2: [50, 20, { act: "grow" }] } },
          { caption: "قبل از هفت، شش می‌آید.", at: { n1: [22, 20, { act: "bounce" }] } },
          { caption: "بعد از هفت، هشت می‌آید.", at: { n3: [78, 20, { act: "bounce" }] } },
          { caption: "هفت بین شش و هشت است.", at: { n2: [50, 20, { act: "grow" }] } }
        ],
        question: "بعد از هفت کدام عدد می‌آید؟", options: ["۶", "۸", "۹"], answer: "۸" },
      { type: "numline", a: 9, b: 1, options: [8, 10, 11] },
      { type: "numline", a: 14, b: -1, thing: "🐇", options: [13, 15, 12] },
      { type: "choose", prompt: "بعد از ۱۲ کدام عدد می‌آید؟", say: "بعد از دوازده کدام عدد می‌آید؟", options: ["۱۱", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "choose", prompt: "قبل از ۱۰ کدام عدد است؟", say: "قبل از ده کدام عدد است؟", options: ["۱۱", "۸", "۹"], answer: "۹" },
      { type: "choose", prompt: "کدام عدد بین ۱۶ و ۱۸ است؟", say: "کدام عدد بین شانزده و هجده است؟", options: ["۱۷", "۱۵", "۱۹"], answer: "۱۷" },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [11, 12, 13, 14, 15] },
      { type: "order", prompt: "از ۱۵ تا ۲۰ پشت سر هم بچین", say: "از پانزده تا بیست پشت سر هم بچین.", ltr: true, items: [15, 16, 17, 18, 19, 20] }
    ]
  },
  {
    id: "math-sprout-11", subject: "math", level: "sprout", emoji: "📖", title: "قصه جمع و تفریق",
    steps: [
      { type: "story", prompt: "به قصه گوش کن و بشمار",
        cast: { girl: "👧", boy: "👦", f1: "🌷", f2: "🌷", f3: "🌷", f4: "🌷", f5: "🌷" },
        scenes: [
          { caption: "نازنین سه گل لاله چید.", at: { girl: [12, 70], f1: [34, 62], f2: [44, 62], f3: [54, 62] } },
          { caption: "برادرش آرش دو گل دیگر آورد.", at: { boy: [88, 70], f4: [70, 62, { act: "bounce" }], f5: [80, 62, { act: "bounce" }] } },
          { caption: "گل‌ها را کنار هم گذاشتند.", at: { f4: [64, 62], f5: [74, 62] } }
        ],
        question: "حالا روی هم چند گل دارند؟", options: ["۴", "۵", "۶"], answer: "۵" },
      { type: "story", prompt: "به قصه گوش کن و بشمار",
        cast: { tree: "🌳", b1: "🐦", b2: "🐦", b3: "🐦", b4: "🐦", b5: "🐦", b6: "🐦" },
        scenes: [
          { caption: "شش گنجشک روی درخت حیاط نشسته بودند.",
            at: { tree: [50, 58, { size: 3 }], b1: [36, 40], b2: [46, 32], b3: [56, 34], b4: [64, 44], b5: [42, 52], b6: [58, 54] } },
          { caption: "دو گنجشک پریدند و رفتند.", at: { b5: [84, 12, { act: "bounce" }], b6: [92, 20, { act: "bounce" }] } },
          { caption: "بقیه روی درخت ماندند.", at: { b5: null, b6: null } }
        ],
        question: "چند گنجشک روی درخت ماند؟", options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "story", prompt: "به قصه گوش کن و بشمار",
        cast: { gran: "👵", p1: "🍎", p2: "🍎", p3: "🍎", p4: "🍎", p5: "🍎", p6: "🍎", p7: "🍎", bag: "🛍️" },
        scenes: [
          { caption: "مادربزرگ چهار سیب داشت.", at: { gran: [86, 66, { size: 1.4 }], p1: [24, 70], p2: [34, 70], p3: [44, 70], p4: [54, 70] } },
          { caption: "از بازار سه سیب دیگر هم خرید.", at: { bag: [14, 40], p5: [24, 50, { act: "bounce" }], p6: [34, 50, { act: "bounce" }], p7: [44, 50, { act: "bounce" }] } },
          { caption: "همه سیب‌ها را در سبد گذاشت.", at: { bag: null, p5: [64, 70], p6: [24, 82], p7: [34, 82] } }
        ],
        question: "حالا مادربزرگ چند سیب دارد؟", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۸ − ۳ = ؟", prompt: "آیلین هشت شیرینی داشت. سه تا را به دوستش داد. چندتا برایش ماند؟",
        say: "آیلین هشت شیرینی داشت. سه تا را به دوستش داد. چندتا برایش ماند؟", options: ["۵", "۶", "۱۱"], answer: "۵" },
      { type: "choose", ltr: true, show: "۴ + ۵ = ؟", prompt: "در اتوبوس چهار نفر بودند. در ایستگاه پنج نفر دیگر سوار شدند. حالا چند نفر در اتوبوس‌اند؟",
        say: "در اتوبوس چهار نفر بودند. در ایستگاه پنج نفر دیگر سوار شدند. حالا چند نفر در اتوبوس‌اند؟", options: ["۸", "۱", "۹"], answer: "۹" },
      { type: "choose", prompt: "هژار ده تیله داشت. چهار تیله را در بازی به برادرش داد. چندتا تیله برایش ماند؟",
        say: "هژار ده تیله داشت. چهار تیله را در بازی به برادرش داد. چندتا تیله برایش ماند؟", options: ["۶", "۱۴", "۷"], answer: "۶" }
    ]
  },
  {
    id: "math-sprout-12", subject: "math", level: "sprout", emoji: "🗓️", title: "صبح، ظهر، شب",
    steps: [
      { type: "story", prompt: "یک روز امید را ببین",
        cast: { boy: "👦", girl: "👧", dawn: "🌅", sun: "☀️", dusk: "🌇", moon: "🌙", bread: "🧀", lunch: "🍲", ball: "⚽", sleep: "😴", bed: "🛏️" },
        scenes: [
          { caption: "صبح است. امید بیدار می‌شود و با خانواده نان و پنیر می‌خورد.", at: { dawn: [16, 20], boy: [50, 70], bread: [70, 74] } },
          { caption: "ظهر است. امید از مدرسه برمی‌گردد و ناهار می‌خورد.", at: { dawn: null, bread: null, sun: [50, 14, { act: "grow" }], lunch: [70, 74] } },
          { caption: "عصر است. امید با خواهرش در پارک بازی می‌کند.", at: { sun: null, lunch: null, dusk: [84, 24], girl: [28, 70], ball: [40, 82, { act: "bounce" }] } },
          { caption: "شب است. امید مسواک می‌زند و می‌خوابد.", at: { dusk: null, girl: null, ball: null, boy: null, moon: [80, 16], bed: [50, 74, { size: 1.6 }], sleep: [50, 56] } }
        ],
        question: "امید ناهار را کی خورد؟", pic: true,
        options: [{ label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }], answer: "ظهر" },
      { type: "order", prompt: "کارهای امید را از صبح تا شب بچین", say: "کارهای امید را از صبح تا شب به ترتیب بچین.", numbered: true,
        items: [{ pic: "🧀", label: "صبحانه" }, { pic: "🍲", label: "ناهار" }, { pic: "⚽", label: "بازی" }, { pic: "🛏️", label: "خواب" }] },
      { type: "choose", prompt: "کی مسواک می‌زنیم و می‌خوابیم؟", say: "کی مسواک می‌زنیم و می‌خوابیم؟", pic: true,
        options: [{ label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }, { label: "🌅", value: "صبح" }], answer: "شب" },
      { type: "story", prompt: "روزهای هفته", tall: true,
        cast: { d1: "شنبه", d2: "یکشنبه", d3: "دوشنبه", d4: "سه‌شنبه", d5: "چهارشنبه", d6: "پنجشنبه", d7: "جمعه" },
        scenes: [
          { caption: "هفته هفت روز دارد. هفته از شنبه شروع می‌شود.", at: { d1: [50, 9, { size: 0.55, act: "grow" }] } },
          { caption: "بعد یکشنبه، دوشنبه و سه‌شنبه می‌آیند.", at: { d2: [50, 23, { size: 0.55 }], d3: [50, 37, { size: 0.55 }], d4: [50, 50, { size: 0.55 }] } },
          { caption: "بعد چهارشنبه و پنجشنبه.", at: { d5: [50, 63, { size: 0.55 }], d6: [50, 77, { size: 0.55 }] } },
          { caption: "روز آخر هفته جمعه است. جمعه مدرسه‌ها تعطیل‌اند.", at: { d7: [50, 91, { size: 0.55, act: "bounce" }] } }
        ] },
      { type: "order", prompt: "روزهای هفته را از شنبه بچین", say: "روزهای هفته را از شنبه به ترتیب بچین.", numbered: true,
        items: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه"] },
      { type: "choose", prompt: "بعد از دوشنبه چه روزی است؟", say: "بعد از دوشنبه چه روزی است؟", options: ["یکشنبه", "سه‌شنبه", "جمعه"], answer: "سه‌شنبه" },
      { type: "choose", prompt: "قبل از جمعه چه روزی است؟", say: "قبل از جمعه چه روزی است؟", options: ["پنجشنبه", "شنبه", "چهارشنبه"], answer: "پنجشنبه" }
    ]
  },
  {
    id: "math-sprout-13", subject: "math", level: "sprout", emoji: "🎈", title: "بازی عددها تا بیست",
    steps: [
      { type: "feed", animal: "🐑", food: "🌿", n: 12, prompt: "گوسفند گرسنه است. دوازده تا علف به او بده." },
      { type: "pairs", prompt: "دو دست یعنی ده انگشت. هر عدد را با دست‌ها و نقطه‌هایش جفت کن.",
        pairs: [[13, { pic: "🙌", dots: 3, say: "ده و سه" }], [16, { pic: "🙌", dots: 6, say: "ده و شش" }],
          [11, { pic: "🙌", dots: 1, say: "ده و یک" }], [18, { pic: "🙌", dots: 8, say: "ده و هشت" }]] },
      { type: "pattern", prompt: "یکی یکی بشمار. جای خالی را پر کن.", ltr: true, seq: [11, 12, 13, 14, 15], blanks: [2], options: [12, 13, 14] },
      { type: "feed", animal: "🐴", food: "🥕", a: 10, b: 5, prompt: "جواب این جمع را حساب کن و همان‌قدر هویج به اسب بده." },
      { type: "pattern", prompt: "از بیست برعکس بشمار. جاهای خالی را پر کن.", ltr: true, seq: [20, 19, 18, 17, 16], blanks: [1, 3], options: [17, 19, 15] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با دست‌ها و نقطه‌هایش جفت کن.",
        pairs: [[{ label: 12, say: "دوازده" }, { pic: "🙌", dots: 2, say: "ده و دو" }], [{ label: 15, say: "پانزده" }, { pic: "🙌", dots: 5, say: "ده و پنج" }],
          [{ label: 17, say: "هفده" }, { pic: "🙌", dots: 7, say: "ده و هفت" }]] },
      { type: "pattern", prompt: "دوتا دوتا تا بیست بشمار. جاهای خالی را پر کن.", ltr: true, seq: [10, 12, 14, 16, 18, 20], blanks: [2, 4], options: [14, 15, 18, 19] }
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
    id: "math-sapling-12", subject: "math", level: "sapling", emoji: "👟", title: "زوج و فرد، الگوی عددها",
    steps: [
      { type: "story", prompt: "ببین زوج و فرد یعنی چه",
        cast: { s1: "👟", s2: "👟", s3: "👟", s4: "👟", s5: "👟", s6: "👟", s7: "👟", even: "۶ زوج", odd: "۷ فرد" },
        scenes: [
          { caption: "شش لنگه کفش داریم.", at: { s1: [12, 64], s2: [26, 64], s3: [40, 64], s4: [54, 64], s5: [68, 64], s6: [82, 64] } },
          { caption: "لنگه‌ها را دوتا دوتا جفت می‌کنیم.", at: { s1: [18, 64], s2: [25, 64], s3: [41, 64], s4: [48, 64], s5: [64, 64], s6: [71, 64] } },
          { caption: "همه جفت شدند و هیچ لنگه‌ای تنها نماند. پس شش زوج است.", at: { even: [45, 24, { size: 0.8, act: "grow" }] } },
          { caption: "حالا یک لنگه کفش دیگر می‌آید.", at: { even: null, s7: [88, 64, { act: "bounce" }] } },
          { caption: "این یکی جفت ندارد و تنها می‌ماند. پس هفت فرد است.", at: { s7: [88, 64, { act: "shake" }], odd: [45, 24, { size: 0.8, act: "grow" }] } }
        ] },
      { type: "sort", prompt: "زوج‌ها را در یک سبد و فردها را در سبد دیگر بگذار.",
        baskets: [{ label: "زوج", value: "even" }, { label: "فرد", value: "odd" }],
        items: [{ dots: 4, basket: "even" }, { dots: 7, basket: "odd" }, { label: 6, basket: "even" }, { label: 9, basket: "odd" },
          { label: 12, basket: "even" }, { label: 15, basket: "odd" }] },
      { type: "pattern", prompt: "ده‌تا ده‌تا بشمار. جای خالی را پر کن.", ltr: true, seq: [10, 20, 30, 40, 50], blanks: [3], options: [35, 40, 41] },
      { type: "pattern", prompt: "پنج‌تا پنج‌تا بشمار. جاهای خالی را پر کن.", ltr: true, seq: [5, 10, 15, 20, 25, 30], blanks: [2, 4], options: [15, 25, 20, 11] },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [27, 45, 54, 72, 90] }
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
  }
);
