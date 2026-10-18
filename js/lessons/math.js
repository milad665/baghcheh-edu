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
  }
);
