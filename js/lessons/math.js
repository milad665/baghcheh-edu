/* باغچه — ریاضی (math) lessons.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

(function () {
  /* Moves the math scenes share (step type `scene`, js/scene.js; drawings in js/art/rig.js and js/art/rig-math.js).
     Things to count really arrive, leave, join and get shared out; numbers and signs come after the things. */
  // Jump from a to b in one arc, h above the higher end.
  function hop(id, a, b, at, dur, h) {
    var top = Math.min(a[1], b[1]) - (h == null ? 10 : h);
    return { id: id, path: "M" + a.join(" ") + "Q" + (a[0] + b[0]) / 2 + " " + top + " " + b.join(" "), at: at || 0, dur: dur || 700 };
  }
  // Little hops along the ground from a to b (a chick, a shoe).
  function hops(id, a, b, n, at, dur, h) {
    var d = "M" + a.join(" "), dx = (b[0] - a[0]) / n, dy = (b[1] - a[1]) / n;
    for (var i = 0; i < n; i++) {
      var x = a[0] + dx * i, y = a[1] + dy * i;
      d += "Q" + (x + dx / 2) + " " + (y + dy / 2 - (h || 3)) + " " + (x + dx) + " " + (y + dy);
    }
    return { id: id, path: d, at: at || 0, dur: dur || 2000, ease: "linear" };
  }
  // Fly from a to b, flapping (a drawing with a "wing" piece, like the sparrow).
  function fly(id, a, b, at, dur, h) {
    return [hop(id, a, b, at, dur, h), { id: id + ".wing", to: { r: -70 }, at: at || 0, dur: dur, yoyo: true, times: 2 * Math.max(1, Math.round(dur / 260)) }];
  }
  // Show something with a little bounce (grow: how much bigger it gets for a moment).
  function pop(id, at, grow) {
    return [{ id: id, to: { o: 1 }, at: at || 0, dur: 250 }, { id: id, to: { s: "+" + (grow || 0.25) }, at: at || 0, dur: 500, yoyo: true, times: 2 }];
  }
  // A little jump on the spot, for something standing still.
  function jump(id, at, h) { return { id: id, to: { y: "-" + (h || 3) }, at: at || 0, dur: 500, yoyo: true, times: 2 }; }
  // A counter shows n from that moment: one more each time a thing arrives (a running total).
  function tally(id, n, at) { return { count: id, from: n, to: n, at: at, dur: 1 }; }
  // All the tracks given, as one list (lists inside are flattened; used on every beat at the end of this file).
  function all() {
    var out = [];
    (function add(x) { if (Array.isArray(x)) x.forEach(add); else if (x) out.push(x); })([].slice.call(arguments));
    return out;
  }

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
      /* The hen pecks the grain; three chicks hop in one at a time, then the child counts them by tapping each one
         (one tap, one chick). No numbers on the stage: numerals come in math-seed-9. */
      { type: "scene", prompt: "به قصه نگاه کن و بشمار",
        parts: {
          bg: { art: "bg-garden" }, seeds: { art: "seeds", at: [84, 86], s: 1.8 }, hen: { art: "🐔", at: [110, 86], s: 2.3 },
          c1: { art: "🐥", at: [-12, 87], s: 1.05, flip: true }, c2: { art: "🐥", at: [-12, 87], s: 1.05, flip: true },
          c3: { art: "🐥", at: [-12, 87], s: 1.05, flip: true }
        },
        scenes: [
          { caption: "مرغ در حیاط دانه می‌خورد.", key: 700, do: [
            { id: "hen", to: { r: -26 }, at: 300, dur: 2800, yoyo: true, times: 8 },
            { id: "seeds.s5", to: { o: 0 }, at: 650, dur: 150 }, { id: "seeds.s4", to: { o: 0 }, at: 1350, dur: 150 },
            { id: "seeds.s6", to: { o: 0 }, at: 2050, dur: 150 }, { id: "seeds.s3", to: { o: 0 }, at: 2750, dur: 150 }
          ] },
          { caption: "یک جوجه آمد.", do: [hops("c1", [-12, 87], [68, 87], 8, 0, 2400)] },
          { caption: "باز هم یک جوجه آمد.", do: [hops("c2", [-12, 87], [48, 87], 7, 0, 2100)] },
          { caption: "باز هم یک جوجه آمد.", do: [hops("c3", [-12, 87], [28, 87], 6, 0, 1800),
            { id: "hen", to: { r: 10 }, at: 2000, dur: 800, yoyo: true, times: 2 }],
            wait: { tap: ["c3", "c2", "c1"], hint: "حالا تو جوجه‌ها را بشمار: روی هر جوجه بزن.", each: [jump("$", 0, 5)] } }
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
      /* At a fruit stall: Maryam points at the big watermelon, then the small apple, and the apple is set next to
         the watermelon to compare them. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          bg: { art: "bg-street" }, table: { art: "counter-table", at: [52, 86] }, awning: { art: "awning", at: [52, 34] },
          melon: { art: "🍉", at: [34, 68], s: 1.8 }, apple: { art: "🍎", at: [72, 68], s: 0.55 },
          ring: { art: "ring", at: [34, 57], s: 1.6, o: 0 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [176, 88], flip: true },
          mom: { art: "walker", look: { hair: "auto", kind: "woman", scarf: "#3f6f8f", top: "#7b5ea7", bottom: "dress" }, at: [194, 88], s: 1.3, flip: true }
        },
        scenes: [
          { caption: "مریم با مادرش به بازار رفته است.", do: [
            { id: "girl", walk: [108, 88], dur: 2600 }, { id: "mom", walk: [126, 88], dur: 2600 }
          ] },
          { caption: "این هندوانه بزرگ است.", do: [
            { id: "girl.armF", to: { r: -100 }, dur: 500 },
            { id: "ring", to: { o: 1 }, at: 500, dur: 150 }, { id: "ring", draw: true, at: 500, dur: 900 }
          ] },
          { caption: "این سیب کوچک است.", do: [
            { id: "ring", to: { x: 72, y: 63, s: 0.7 }, dur: 900 }, { id: "girl.armF", to: { r: -80 }, dur: 900 }
          ] },
          { caption: "هندوانه از سیب بزرگ‌تر است. سیب از هندوانه کوچک‌تر است.", do: [
            { id: "ring", to: { o: 0 }, dur: 300 }, { id: "girl.armF", to: { r: 0 }, dur: 500 },
            hop("apple", [72, 68], [53, 68], 300, 800, 8),
            jump("melon", 1600, 2), jump("apple", 2600, 3)
          ] }
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
      /* Narges and Arash stand in the yard; a dashed line from the top of each head shows who is taller, and a
         third from the top of the tree shows it is taller than both. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [126, 86] },
          girl: { art: "walker", look: { hair: "long", top: "#f6b73c", bottom: "dress" }, at: [-12, 87], s: 1.25 },
          boy: { art: "walker", look: { top: "#5a9a45" }, at: [-30, 87], s: 0.95 },
          lineG: { art: "level", at: [30, 56.8], sx: 0.62, o: 0 }, lineB: { art: "level", at: [30, 64], sx: 0.62, o: 0 },
          lineT: { art: "level", at: [30, 9.5], sx: 1, o: 0 }
        },
        scenes: [
          { caption: "نرگس و برادرش آرش در حیاط هستند.", do: [
            { id: "girl", walk: [44, 87], dur: 2400 }, { id: "boy", walk: [70, 87], dur: 3000 }
          ] },
          { caption: "قد نرگس بلندتر است.", do: [
            { id: "lineG", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineG", draw: true, at: 300, dur: 1200 }
          ] },
          { caption: "قد آرش کوتاه‌تر است.", do: [
            { id: "lineB", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineB", draw: true, at: 300, dur: 1200 }
          ] },
          { caption: "درخت حیاط از هر دو بلندتر است!", do: [
            { id: "lineT", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineT", draw: true, at: 300, dur: 1600 },
            { id: "tree", to: { r: 2 }, at: 2000, dur: 1600, yoyo: true, times: 4 }
          ] }
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
      /* Position words, each shown by something going there: the sparrow flies up to the top of the tree, the cat
         walks to its foot, the ball rolls up next to it. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [70, 86], s: 0.85 },
          bird: { art: "sparrow", at: [-20, 10], s: 1.6 }, cat: { art: "cat-side", at: [-16, 88], s: 1.6 },
          ball: { art: "ball-roll", at: [178, 81], s: 1.6 }
        },
        scenes: [
          { caption: "این درخت حیاط است." },
          { caption: "گنجشک آمد و بالای درخت نشست.", do: [fly("bird", [-20, 10], [70, 21.5], 0, 2200, 8)] },
          { caption: "گربه آمد و پایین درخت نشست.", do: [hops("cat", [-16, 88], [64, 88], 9, 0, 2600, 1.5)] },
          { caption: "توپ قل خورد و کنار درخت ایستاد.", do: [
            { id: "ball", to: { x: 112 }, dur: 2200, ease: "out" }, { id: "ball", to: { r: -900 }, dur: 2200, ease: "out" }
          ] }
        ] },
      /* Hide-and-seek: Kamran really goes behind the wide trunk (only his edge peeks out), and Sara comes in front
         of it. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [140, 86], s: 1.1, flip: true },
          tree: { art: "plane-tree", at: [80, 87], s: 0.95 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [20, 88], s: 1.1 }
        },
        scenes: [
          { caption: "سارا و کامران قایم‌باشک بازی می‌کنند.", do: [
            jump("girl", 0, 3), jump("boy", 500, 3),
            { id: "girl", to: { flip: -1 }, at: 1600, dur: 300 }, { id: "girl.armF", to: { r: -150 }, at: 1900, dur: 500 }
          ] },
          { caption: "کامران پشت درخت قایم شد.", do: [{ id: "boy", walk: [88, 84], dur: 2400 }] },
          { caption: "سارا جلوی درخت آمد.", do: [
            { id: "girl.armF", to: { r: 0 }, dur: 400 }, { id: "girl", to: { flip: 1 }, at: 400, dur: 300 },
            { id: "girl", walk: [72, 89], at: 800, dur: 2200 }
          ] },
          { caption: "پیدات کردم!", do: [
            { id: "boy", walk: [106, 87], dur: 900 }, { id: "girl.armF", to: { r: -95 }, at: 900, dur: 400 },
            jump("girl", 1300, 4), jump("boy", 1300, 4)
          ] }
        ],
        question: "چه کسی پشت درخت قایم شد؟", pic: true,
        options: [{ label: "👧", value: "سارا" }, { label: "👦", value: "کامران" }], answer: "کامران" },
      // The sun comes up from behind the house and stays above it; the dog trots up next to the house.
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          sky: { art: "sky-day" }, sun: { art: "sun", at: [72, 62], s: 1.2 }, ground: { art: "ground" },
          house: { art: "🏠", at: [72, 84], s: 2.6 }, dog: { art: "🐕", at: [178, 86], s: 1.4 }
        },
        scenes: [
          { caption: "یک خانه، یک خورشید و یک سگ. کدام بالای خانه است؟", do: [
            { id: "sun", to: { y: 16 }, dur: 2600, ease: "out" }, hops("dog", [178, 86], [122, 86], 6, 1200, 2000, 2)
          ] }
        ],
        question: "کدام بالای خانه است؟", pic: true,
        options: [{ label: "🐕", value: "سگ" }, { label: "☀️", value: "خورشید" }, { label: "🏠", value: "خانه" }], answer: "خورشید" },
      /* Grandma comes home with a bag of fruit; the apple goes into the basket (between its back and front, so it
         is really inside) and the pear stays next to it. */
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          bg: { art: "bg-kitchen" }, basketB: { art: "basket-back", at: [56, 86], s: 1.6 },
          apple: { art: "🍎", at: [126, 80], s: 0.9, o: 0 }, basketF: { art: "basket-front", at: [56, 86], s: 1.6 },
          pear: { art: "🍐", at: [126, 80], s: 0.95, o: 0 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#c4673a", top: "#8a6f9e", bottom: "dress" }, at: [184, 88], s: 1.5, flip: true },
          bag: { art: "🛍️", at: [177, 88] }
        },
        scenes: [
          { caption: "مادربزرگ از بازار میوه خریده است.", do: [
            { id: "gran", walk: [140, 88], dur: 2600 }, { id: "bag", to: { x: 133 }, dur: 2600, ease: "linear" },
            { id: "bag", to: { x: 126 }, at: 2700, dur: 400 },
            { id: "apple", to: { o: 1 }, at: 3200, dur: 150 }, hop("apple", [126, 80], [112, 88], 3200, 700, 10),
            { id: "pear", to: { o: 1 }, at: 4000, dur: 150 }, hop("pear", [126, 80], [98, 88], 4000, 700, 10)
          ] },
          { caption: "سیب را داخل سبد گذاشت. گلابی کنار سبد است.", do: [
            { id: "gran.armF", to: { r: -60 }, dur: 500 }, hop("apple", [112, 88], [56, 77], 400, 1000, 18),
            { id: "gran.armF", to: { r: 0 }, at: 1500, dur: 500 }, jump("pear", 2600, 3)
          ] }
        ],
        question: "چه چیزی داخل سبد است؟", pic: true,
        options: [{ label: "🍐", value: "گلابی" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "دستت را بالا ببر! بالا کدام طرف است؟", say: "دستت را بالا ببر! بالا کدام طرف است؟", pic: true,
        options: [{ label: "⬇️", value: "پایین" }, { label: "⬆️", value: "بالا" }], answer: "بالا" },
      { type: "choose", prompt: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", say: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", pic: true,
        options: [{ label: "⬆️", value: "بالا" }, { label: "⬇️", value: "پایین" }], answer: "پایین" },
      // The sparrow sits next to the cat, then flies up to the top of the tree; the cat looks up after it.
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [104, 87], s: 0.85 },
          cat: { art: "cat-side", at: [26, 88], s: 1.6 }, bird: { art: "sparrow", at: [46, 88], s: 1.5, flip: true }
        },
        scenes: [
          { caption: "گنجشک کنار گربه نشسته بود. پرید و رفت بالای درخت.", key: 1200, do: [
            { id: "bird", to: { flip: 1 }, at: 2200, dur: 200 }, fly("bird", [46, 88], [104, 22.5], 2400, 2200, 14),
            { id: "cat.head", to: { r: -30 }, at: 3200, dur: 800 }
          ] },
          { caption: "حالا گنجشک کجاست؟", do: [jump("bird", 300, 2)] }
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
      /* Concrete first: the things come onto the table one at a time and the number counts up with them (a running
         total), so the numeral is the last number said. Then they leave and the next number starts from one. */
      (function () {
        var things = ["🍎", "🍐", "🍊", "🍓", "🥚"];
        var captions = ["یک سیب. این عدد یک است.", "دو گلابی. این عدد دو است.", "سه پرتقال. این عدد سه است.",
          "چهار توت‌فرنگی. این عدد چهار است.", "پنج تخم‌مرغ. این عدد پنج است."];
        var parts = { table: { art: "counter-table", at: [80, 90], s: 1.6 },
          num: { art: "count:big", at: [80, 42], s: 1.7, o: 0 } };
        var scenes = things.map(function (t, k) {
          var n = k + 1, tracks = [{ id: "num", to: { o: 0 }, dur: 200 }];
          // the last number's things slide away
          for (var j = 0; j < k; j++) tracks.push({ id: "f" + k + j, to: { x: "-120", o: 0 }, dur: 700, ease: "in" });
          for (var i = 0; i < n; i++) {
            var id = "f" + n + i, at = 800 + i * 900, x = 80 + (i - (n - 1) / 2) * 22;
            parts[id] = { art: t, at: [178, 40], s: 0.9, o: 0 };
            tracks.push({ id: id, to: { o: 1 }, at: at, dur: 100 }, hop(id, [178, 40], [x, 61], at, 700, 6), tally("num", i + 1, at + 700));
          }
          tracks.push({ id: "num", to: { o: 1 }, at: 1500, dur: 200 }, pop("num", 900 + n * 900, 0.3));
          return { caption: captions[k], do: tracks };
        });
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts, scenes: scenes };
      })(),
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
      /* Three red apples hop onto the table, then two green ones; each group gets its number after it has
         arrived. The green ones move up next to the red ones, the child counts every apple by tapping it (the total
         counts up), and the numbers go up into a row to make the sum, left to right as in the schoolbook. */
      { type: "scene", prompt: "ببین سیب‌ها چه می‌شوند", bg: "#f7ecd9",
        parts: {
          table: { art: "counter-table", at: [80, 90], s: 1.6 },
          a1: { art: "🍎", at: [-14, 61], s: 0.9 }, a2: { art: "🍎", at: [-14, 61], s: 0.9 }, a3: { art: "🍎", at: [-14, 61], s: 0.9 },
          b1: { art: "🍏", at: [176, 61], s: 0.9 }, b2: { art: "🍏", at: [176, 61], s: 0.9 },
          n3: { art: "n:۳", at: [46, 47], o: 0 }, n2: { art: "n:۲", at: [114, 47], o: 0 },
          plus: { art: "n:+", at: [58, 25], o: 0 }, eq: { art: "n:=", at: [82, 25], o: 0 },
          total: { art: "count:big", at: [95, 25], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "اینجا سه سیب قرمز هست.", do: [
            hops("a1", [-14, 61], [62, 61], 4, 0, 1500, 5), hops("a2", [-14, 61], [46, 61], 3, 600, 1300, 5),
            hops("a3", [-14, 61], [30, 61], 3, 1200, 1100, 5), pop("n3", 2600)
          ] },
          { caption: "آنجا دو سیب سبز هست.", do: [
            hops("b1", [176, 61], [106, 61], 4, 0, 1300, 5), hops("b2", [176, 61], [122, 61], 3, 600, 1100, 5), pop("n2", 2000)
          ] },
          { caption: "سیب‌ها را کنار هم می‌گذاریم.", do: [
            hops("b1", [106, 61], [78, 61], 2, 0, 900, 4), hops("b2", [122, 61], [94, 61], 2, 300, 900, 4),
            { id: "n2", to: { x: 86 }, at: 300, dur: 900 }, { id: "total", to: { o: 1 }, at: 1300, dur: 200 }
          ],
            wait: { tap: ["a3", "a2", "a1", "b1", "b2"], counter: "total", hint: "حالا همه سیب‌ها را بشمار: روی هر سیب بزن.",
              each: [jump("$", 0, 4)] } },
          { caption: "روی هم پنج سیب شد. سه به‌علاوه دو می‌شود پنج.", do: [
            { id: "total", to: { o: 1 }, dur: 200 }, tally("total", 5, 0), pop("total", 300, 0.2),
            { id: "n3", to: { y: 25 }, at: 1300, dur: 800 }, { id: "n2", to: { x: 70, y: 25 }, at: 1300, dur: 800 },
            pop("plus", 2200), pop("eq", 2200)
          ] }
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
      /* Three houses in an alley get their numbers one after another; Zahra walks to her house (۷), back one house
         to ۶ (before) and on past hers to ۸ (after), then home again, between the two. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          bg: { art: "bg-street" },
          h1: { art: "🏠", at: [36, 76], s: 2.3 }, h2: { art: "🏠", at: [80, 76], s: 2.3 }, h3: { art: "🏠", at: [124, 76], s: 2.3 },
          t1: { art: "tag:۶", at: [36, 59], o: 0 }, t2: { art: "tag:۷", at: [80, 59], o: 0 }, t3: { art: "tag:۸", at: [124, 59], o: 0 },
          ring: { art: "ring", at: [80, 54.3], s: 0.75, o: 0 },
          girl: { art: "walker", look: { hair: "long", top: "#5a9a45", bottom: "dress" }, at: [-12, 88], s: 1.3 }
        },
        scenes: [
          { caption: "در کوچه ما هر خانه یک شماره دارد.", do: [pop("t1", 400), pop("t2", 1300), pop("t3", 2200)] },
          { caption: "خانه زهرا شماره هفت است.", do: [
            { id: "girl", walk: [94, 88], dur: 3000 },
            { id: "ring", to: { o: 1 }, at: 3100, dur: 100 }, { id: "ring", draw: true, at: 3100, dur: 800 }
          ] },
          { caption: "قبل از هفت، شش می‌آید.", do: [
            { id: "ring", to: { o: 0 }, dur: 300 }, { id: "girl", to: { flip: -1 }, dur: 300 },
            { id: "girl", walk: [50, 88], at: 300, dur: 2200 }, pop("t1", 2600, 0.3)
          ] },
          { caption: "بعد از هفت، هشت می‌آید.", do: [
            { id: "girl", to: { flip: 1 }, dur: 300 }, { id: "girl", walk: [138, 88], at: 300, dur: 3600 }, pop("t3", 4000, 0.3)
          ] },
          { caption: "هفت بین شش و هشت است.", do: [
            { id: "girl", to: { flip: -1 }, dur: 300 }, { id: "girl", walk: [94, 88], at: 300, dur: 2000 },
            pop("t1", 2500, 0.3), pop("t3", 2500, 0.3),
            { id: "ring", to: { o: 1 }, at: 3200, dur: 100 }, { id: "ring", draw: true, at: 3200, dur: 800 }
          ] }
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
      /* Nazanin pulls up three tulips one by one and stands them in the flower box; Arash walks in with two more,
         and they go into the box next to hers. The child counts the box (the question asks how many). */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-garden" },
          f1: { art: "🌷", at: [114, 87], s: 1.1 }, f2: { art: "🌷", at: [128, 87], s: 1.1 }, f3: { art: "🌷", at: [142, 87], s: 1.1 },
          f4: { art: "🌷", at: [184, 82], s: 1.1 }, f5: { art: "🌷", at: [191, 82], s: 1.1 },
          box: { art: "planter", at: [48, 89], s: 1.2 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [100, 88], s: 1.2 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [196, 88], s: 1.25, flip: true }
        },
        scenes: [
          { caption: "نازنین سه گل لاله چید.", do: [
            { id: "girl.armF", to: { r: -60 }, at: 200, dur: 400, yoyo: true, times: 2 },
            { id: "f1", to: { y: "-8" }, at: 500, dur: 400 }, hop("f1", [114, 79], [18, 87], 900, 900, 8),
            { id: "girl.armF", to: { r: -60 }, at: 1900, dur: 400, yoyo: true, times: 2 },
            { id: "f2", to: { y: "-8" }, at: 2200, dur: 400 }, hop("f2", [128, 79], [32, 87], 2600, 900, 8),
            { id: "girl.armF", to: { r: -60 }, at: 3600, dur: 400, yoyo: true, times: 2 },
            { id: "f3", to: { y: "-8" }, at: 3900, dur: 400 }, hop("f3", [142, 79], [46, 87], 4300, 900, 8)
          ] },
          { caption: "برادرش آرش دو گل دیگر آورد.", do: [
            { id: "boy", walk: [146, 88], dur: 2400 },
            { id: "f4", to: { x: 134 }, dur: 2400, ease: "linear" }, { id: "f5", to: { x: 141 }, dur: 2400, ease: "linear" }
          ] },
          { caption: "گل‌ها را کنار هم گذاشتند.", do: [
            hop("f4", [134, 82], [60, 87], 300, 1000, 8), hop("f5", [141, 82], [74, 87], 1000, 1000, 8),
            { id: "boy.armF", to: { r: -60 }, at: 200, dur: 500, yoyo: true, times: 4 }
          ] }
        ],
        question: "حالا روی هم چند گل دارند؟", options: ["۴", "۵", "۶"], answer: "۵" },
      // Six sparrows sit in the tree; two flap their wings and fly off the stage; four stay and look round.
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [80, 88], s: 0.95 },
          b1: { art: "sparrow", at: [54, 36], s: 1.3 }, b2: { art: "sparrow", at: [68, 23], s: 1.3, flip: true },
          b3: { art: "sparrow", at: [88, 21], s: 1.3 }, b4: { art: "sparrow", at: [104, 30], s: 1.3, flip: true },
          b5: { art: "sparrow", at: [66, 44], s: 1.3 }, b6: { art: "sparrow", at: [96, 44], s: 1.3 }
        },
        scenes: [
          { caption: "شش گنجشک روی درخت حیاط نشسته بودند." },
          { caption: "دو گنجشک پریدند و رفتند.", do: [
            fly("b6", [96, 44], [176, 6], 300, 1800, 6), fly("b5", [66, 44], [178, -6], 900, 2200, 10)
          ] },
          { caption: "بقیه روی درخت ماندند.", do: [
            { id: "b1", to: { flip: -1 }, at: 200, dur: 300, yoyo: true, times: 2 }, { id: "b4", to: { flip: 1 }, at: 900, dur: 300, yoyo: true, times: 2 },
            jump("b2", 1500, 2), jump("b3", 2000, 2)
          ] }
        ],
        question: "چند گنجشک روی درخت ماند؟", options: ["۳", "۴", "۵"], answer: "۴" },
      /* Grandma's four apples are in the basket; she goes off to the bazaar and comes back with a bag, three apples
         come out of it, and she puts them into the basket with the others. */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-kitchen" }, basketB: { art: "basket-back", at: [56, 87], s: 2 },
          p1: { art: "🍎", at: [23, 69], s: 0.7 }, p2: { art: "🍎", at: [34, 69], s: 0.7 }, p3: { art: "🍎", at: [45, 69], s: 0.7 }, p4: { art: "🍎", at: [56, 69], s: 0.7 },
          p5: { art: "🍎", at: [130, 80], s: 0.7, o: 0 }, p6: { art: "🍎", at: [130, 80], s: 0.7, o: 0 }, p7: { art: "🍎", at: [130, 80], s: 0.7, o: 0 },
          basketF: { art: "basket-front", at: [56, 87], s: 2 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#5a9a45", top: "#b5523b", bottom: "dress" }, at: [140, 88], s: 1.5, flip: true },
          bag: { art: "🛍️", at: [200, 88] }
        },
        scenes: [
          { caption: "مادربزرگ چهار سیب داشت.", do: [jump("p1", 300, 3), jump("p2", 900, 3), jump("p3", 1500, 3), jump("p4", 2100, 3)] },
          { caption: "از بازار سه سیب دیگر هم خرید.", do: [
            { id: "gran", to: { flip: 1 }, dur: 300 }, { id: "gran", walk: [188, 88], at: 300, dur: 1500 },
            { id: "gran", to: { flip: -1 }, at: 2000, dur: 100 },
            { id: "gran", walk: [140, 88], at: 2300, dur: 1800 }, { id: "bag", to: { x: 132 }, at: 2100, dur: 2000, ease: "linear" },
            { id: "bag", to: { x: 124 }, at: 4200, dur: 400 },
            { id: "p5", to: { o: 1 }, at: 4800, dur: 100 }, hop("p5", [124, 80], [116, 88], 4800, 600, 8),
            { id: "p6", to: { o: 1 }, at: 5300, dur: 100 }, hop("p6", [124, 80], [106, 88], 5300, 600, 8),
            { id: "p7", to: { o: 1 }, at: 5800, dur: 100 }, hop("p7", [124, 80], [96, 88], 5800, 600, 8)
          ] },
          { caption: "همه سیب‌ها را در سبد گذاشت.", do: [
            { id: "gran.armF", to: { r: -60 }, dur: 400 },
            hop("p7", [96, 88], [67, 69], 300, 800, 12), hop("p6", [106, 88], [78, 69], 1200, 800, 12), hop("p5", [116, 88], [89, 69], 2100, 800, 12),
            { id: "gran.armF", to: { r: 0 }, at: 3000, dur: 400 }
          ] }
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
      /* One day of Omid's, in his room: the sky in the window goes from dawn to noon, the sun climbs, and at night
         the moon is out. He gets up and has bread and cheese with his family, comes back from school with his bag
         and has lunch, plays ball with his sister in the park late in the afternoon (orange sky, low sun),
         brushes his teeth and goes to bed. */
      { type: "scene", prompt: "یک روز امید را ببین",
        parts: {
          dawn: { art: "sky-dawn" }, day: { art: "sky-day", o: 0 }, night: { art: "sky-night", o: 0 },
          sun: { art: "sun", at: [64, 52], s: 0.9 }, moon: { art: "moon", at: [92, 18], o: 0 },
          room: { art: "day-room" }, bed: { art: "bed-side", at: [28, 84] },
          sofreh: { art: "sofreh", at: [112, 80], s: 0.9 },
          bread: { art: "🫓", at: [104, 80], s: 0.55 }, cheese: { art: "🧀", at: [119, 80], s: 0.5 }, pot: { art: "🍲", at: [112, 80], s: 0.7, o: 0 },
          dad: { art: "walker", look: { top: "#3f6f8f", bottom: "#5c4a3a" }, at: [80, 86], s: 1.35 },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [146, 86], s: 1.3, flip: true },
          park: { art: "sky-dusk", o: 0 }, lowSun: { art: "sun", at: [118, 52], s: 0.9, o: 0 }, grass: { art: "ground", o: 0 },
          tree1: { art: "plane-tree", at: [16, 66], s: 0.5, o: 0 }, tree2: { art: "plane-tree", at: [146, 64], s: 0.45, o: 0 },
          sister: { art: "walker", look: { hair: "long", top: "#f6b73c", bottom: "dress" }, at: [40, 88], s: 1.1, o: 0 },
          ball: { art: "ball-roll", at: [46, 72], s: 1.1, o: 0 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [46, 71], s: 1.2, r: -90 },
          bag: { art: "🎒", under: "boy", at: [-5, -9], s: 0.45, o: 0 },
          brush: { art: "🪥", at: [86, 67], s: 0.35, o: 0 }, z1: { art: "zz", at: [16, 58], o: 0 }, z2: { art: "zz", at: [22, 54], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "صبح است. امید بیدار می‌شود و با خانواده نان و پنیر می‌خورد.", key: 5300, do: [
            { id: "sun", to: { x: 68, y: 30 }, dur: 2400, ease: "out" },
            { id: "boy", to: { x: 52, y: 88, r: 0 }, at: 1600, dur: 800 }, { id: "boy", walk: [98, 88], at: 2500, dur: 2000 },
            hop("bread", [104, 80], [101, 70], 4700, 500, 3), { id: "bread", to: { s: 0.4 }, at: 5400, dur: 300 },
            hop("bread", [101, 70], [104, 80], 5900, 500, 3)
          ] },
          { caption: "ظهر است. امید از مدرسه برمی‌گردد و ناهار می‌خورد.", hold: 6000, do: [
            { id: "day", to: { o: 1 }, dur: 1400 }, { id: "sun", to: { x: 80, y: 16 }, dur: 2400 },
            { id: "bread", to: { o: 0 }, dur: 400 }, { id: "cheese", to: { o: 0 }, dur: 400 }, { id: "dad", to: { o: 0 }, dur: 400 },
            { id: "boy", to: { o: 0 }, dur: 300 }, { id: "boy", to: { x: 176, flip: -1 }, at: 300, dur: 1 },
            { id: "boy", to: { o: 1 }, at: 400, dur: 100 }, { id: "bag", to: { o: 1 }, at: 400, dur: 100 },
            { id: "boy", walk: [100, 88], at: 500, dur: 2600 }, { id: "bag", to: { o: 0 }, at: 3300, dur: 300 },
            { id: "boy", to: { flip: 1 }, at: 3500, dur: 300 },
            { id: "pot", to: { o: 1 }, at: 3300, dur: 400 }, { emit: "bubble", where: [112, 66], spread: [8, 2], rise: -10, n: 8, at: 3600, dur: 2400 }
          ] },
          { caption: "عصر است. امید با خواهرش در پارک بازی می‌کند.", key: 1800, do: [
            { id: "park", to: { o: 1 }, dur: 900 }, { id: "lowSun", to: { o: 1 }, dur: 900 }, { id: "grass", to: { o: 1 }, dur: 900 },
            { id: "tree1", to: { o: 1 }, dur: 900 }, { id: "tree2", to: { o: 1 }, dur: 900 }, { id: "pot", to: { o: 0 }, dur: 300 },
            { id: "mom", to: { o: 0 }, dur: 300 },
            { id: "boy", to: { x: 110, flip: -1 }, dur: 900 }, { id: "sister", to: { o: 1 }, at: 400, dur: 500 },
            { id: "ball", to: { o: 1 }, at: 700, dur: 200 },
            hop("ball", [46, 72], [104, 72], 1000, 1100, 16), hop("ball", [104, 72], [46, 72], 2400, 1100, 16),
            hop("ball", [46, 72], [104, 72], 3800, 1100, 16)
          ] },
          { caption: "شب است. امید مسواک می‌زند و می‌خوابد.", key: 2600, hold: 7000, do: [
            { id: "park", to: { o: 0 }, dur: 900 }, { id: "lowSun", to: { o: 0 }, dur: 900 }, { id: "grass", to: { o: 0 }, dur: 900 },
            { id: "tree1", to: { o: 0 }, dur: 900 }, { id: "tree2", to: { o: 0 }, dur: 900 },
            { id: "sister", to: { o: 0 }, dur: 400 }, { id: "ball", to: { o: 0 }, dur: 400 },
            { id: "night", to: { o: 1 }, dur: 900 }, { id: "sun", to: { o: 0 }, dur: 600 }, { id: "moon", to: { o: 1 }, at: 600, dur: 600 },
            { id: "boy", to: { x: 80, flip: 1 }, dur: 900 },
            { id: "brush", to: { o: 1 }, at: 1200, dur: 200 }, { id: "brush", to: { x: "+2.5" }, at: 1300, dur: 2400, yoyo: true, times: 10 },
            { id: "brush", to: { o: 0 }, at: 3800, dur: 200 },
            { id: "boy", to: { flip: -1 }, at: 4000, dur: 300 }, { id: "boy", walk: [52, 88], at: 4300, dur: 1200 },
            { id: "boy", to: { x: 46, y: 71, r: -90 }, at: 5600, dur: 800 },
            { id: "z1", to: { o: 1 }, at: 6400, dur: 300 }, { id: "z1", to: { y: "-8" }, at: 6400, dur: 1400 },
            { id: "z2", to: { o: 1 }, at: 6900, dur: 300 }, { id: "z2", to: { y: "-8" }, at: 6900, dur: 1400 }
          ] }
        ],
        question: "امید ناهار را کی خورد؟", pic: true,
        options: [{ label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }], answer: "ظهر" },
      { type: "order", prompt: "کارهای امید را از صبح تا شب بچین", say: "کارهای امید را از صبح تا شب به ترتیب بچین.", numbered: true,
        items: [{ pic: "🧀", label: "صبحانه" }, { pic: "🍲", label: "ناهار" }, { pic: "⚽", label: "بازی" }, { pic: "🛏️", label: "خواب" }] },
      { type: "choose", prompt: "کی مسواک می‌زنیم و می‌خوابیم؟", say: "کی مسواک می‌زنیم و می‌خوابیم؟", pic: true,
        options: [{ label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }, { label: "🌅", value: "صبح" }], answer: "شب" },
      /* The seven days appear one under another and are counted (seven); an arrow goes down them day by day, and
         on Friday the school's gate slides shut. The column reads the same in English. */
      { type: "scene", prompt: "روزهای هفته", bg: "#fdf3e1",
        parts: {
          school: { art: "🏫", at: [44, 82], s: 2.4, o: 0 }, gate: { art: "gate", at: [72, 82], s: 1.5, o: 0 },
          d1: { art: "day:شنبه", at: [122, 14], o: 0 }, d2: { art: "day:یکشنبه", at: [122, 25], o: 0 },
          d3: { art: "day:دوشنبه", at: [122, 36], o: 0 }, d4: { art: "day:سه‌شنبه", at: [122, 47], o: 0 },
          d5: { art: "day:چهارشنبه", at: [122, 58], o: 0 }, d6: { art: "day:پنجشنبه", at: [122, 69], o: 0 },
          d7: { art: "day:جمعه", at: [122, 80], o: 0 },
          seven: { art: "count:big", at: [60, 50], s: 2, o: 0 }, arrow: { art: "pointer", at: [100, 9.3], o: 0 }
        },
        scenes: [
          { caption: "هفته هفت روز دارد. هفته از شنبه شروع می‌شود.", do: [
            { id: "seven", to: { o: 1 }, at: 300, dur: 200 },
            pop("d1", 300), tally("seven", 1, 300), pop("d2", 800), tally("seven", 2, 800), pop("d3", 1300), tally("seven", 3, 1300),
            pop("d4", 1800), tally("seven", 4, 1800), pop("d5", 2300), tally("seven", 5, 2300), pop("d6", 2800), tally("seven", 6, 2800),
            pop("d7", 3300), tally("seven", 7, 3300),
            { id: "arrow", to: { o: 1 }, at: 4300, dur: 300 }, pop("d1", 4500, 0.15)
          ] },
          { caption: "بعد یکشنبه، دوشنبه و سه‌شنبه می‌آیند.", do: [
            { id: "seven", to: { o: 0 }, dur: 400 },
            { id: "arrow", to: { y: 20.3 }, at: 300, dur: 500 }, pop("d2", 800, 0.15),
            { id: "arrow", to: { y: 31.3 }, at: 1700, dur: 500 }, pop("d3", 2200, 0.15),
            { id: "arrow", to: { y: 42.3 }, at: 3100, dur: 500 }, pop("d4", 3600, 0.15)
          ] },
          { caption: "بعد چهارشنبه و پنجشنبه.", do: [
            { id: "arrow", to: { y: 53.3 }, at: 300, dur: 500 }, pop("d5", 800, 0.15),
            { id: "arrow", to: { y: 64.3 }, at: 1700, dur: 500 }, pop("d6", 2200, 0.15)
          ] },
          { caption: "روز آخر هفته جمعه است. جمعه مدرسه‌ها تعطیل‌اند.", do: [
            { id: "arrow", to: { y: 75.3 }, at: 300, dur: 500 }, pop("d7", 800, 0.15),
            { id: "school", to: { o: 1 }, at: 1600, dur: 500 }, { id: "gate", to: { o: 1 }, at: 2200, dur: 200 },
            { id: "gate", to: { x: 44 }, at: 2400, dur: 1400, ease: "out" }
          ] }
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
      /* The child counts six odd shoes by tapping them, then they move into pairs (a ring round each pair): none is left over, so six is
         even. A seventh comes, looks for a partner, finds none and stays alone: seven is odd. */
      { type: "scene", prompt: "ببین زوج و فرد یعنی چه", bg: "#f6e3c6",
        parts: {
          s1: { art: "shoe", at: [14, 62], s: 1.3, r: -20, flip: true, o: 0 }, s2: { art: "shoe", at: [34, 64], s: 1.3, r: 15, o: 0 },
          s3: { art: "shoe", at: [54, 60], s: 1.3, r: 25, flip: true, o: 0 }, s4: { art: "shoe", at: [74, 63], s: 1.3, r: -10, o: 0 },
          s5: { art: "shoe", at: [94, 61], s: 1.3, r: -15, flip: true, o: 0 }, s6: { art: "shoe", at: [114, 64], s: 1.3, r: 30, o: 0 },
          s7: { art: "shoe", at: [178, 62], s: 1.3 },
          r1: { art: "pair-ring", at: [34, 62], s: 1.25, o: 0 }, r2: { art: "pair-ring", at: [70, 62], s: 1.25, o: 0 },
          r3: { art: "pair-ring", at: [106, 62], s: 1.25, o: 0 }, r7: { art: "pair-ring", at: [142, 62], s: 1.25, o: 0 },
          count: { art: "count:big", at: [142, 30], o: 0 },
          even: { art: "tag:۶ زوج", at: [70, 34], s: 1.3, o: 0 }, odd: { art: "tag:۷ فرد", at: [70, 34], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "شش لنگه کفش داریم.", do: [
            { id: "count", to: { o: 1 }, at: 300, dur: 200 },
            pop("s1", 300), pop("s2", 700), pop("s3", 1100), pop("s4", 1500), pop("s5", 1900), pop("s6", 2300)
          ],
            wait: { tap: ["s1", "s2", "s3", "s4", "s5", "s6"], counter: "count", hint: "بشمار: روی هر لنگه کفش بزن.",
              each: [{ id: "$", to: { s: "+0.3" }, dur: 300, yoyo: true, times: 2 }] } },
          { caption: "لنگه‌ها را دوتا دوتا جفت می‌کنیم.", do: [
            tally("count", 6, 0),
            { id: "s1", to: { x: 28, y: 62, r: 0 }, at: 200, dur: 800 }, { id: "s2", to: { x: 40, y: 62, r: 0 }, at: 200, dur: 800 },
            { id: "r1", to: { o: 1 }, at: 1100, dur: 100 }, { id: "r1", draw: true, at: 1100, dur: 600 },
            { id: "s3", to: { x: 64, y: 62, r: 0 }, at: 1900, dur: 800 }, { id: "s4", to: { x: 76, y: 62, r: 0 }, at: 1900, dur: 800 },
            { id: "r2", to: { o: 1 }, at: 2800, dur: 100 }, { id: "r2", draw: true, at: 2800, dur: 600 },
            { id: "s5", to: { x: 100, y: 62, r: 0 }, at: 3600, dur: 800 }, { id: "s6", to: { x: 112, y: 62, r: 0 }, at: 3600, dur: 800 },
            { id: "r3", to: { o: 1 }, at: 4500, dur: 100 }, { id: "r3", draw: true, at: 4500, dur: 600 }
          ] },
          { caption: "همه جفت شدند و هیچ لنگه‌ای تنها نماند. پس شش زوج است.", do: [
            pop("even", 1200, 0.2), { emit: "spark", where: [70, 62], spread: [90, 20], n: 10, at: 1200, dur: 1200 }
          ] },
          { caption: "حالا یک لنگه کفش دیگر می‌آید.", do: [
            { id: "even", to: { o: 0 }, dur: 400 }, hops("s7", [178, 62], [142, 62], 3, 300, 1400, 4), tally("count", 7, 1700),
            pop("count", 1700, 0.2)
          ] },
          { caption: "این یکی جفت ندارد و تنها می‌ماند. پس هفت فرد است.", do: [
            { id: "s7", to: { x: 126 }, at: 200, dur: 700 }, { id: "s7", to: { r: -12 }, at: 900, dur: 600, yoyo: true, times: 2 },
            { id: "s7", to: { x: 142 }, at: 1600, dur: 700 },
            { id: "r7", to: { o: 1 }, at: 2400, dur: 100 }, { id: "r7", draw: true, at: 2400, dur: 600 },
            pop("odd", 3300, 0.2)
          ] }
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
  },
  {
    id: "math-sapling-13", subject: "math", level: "sapling", emoji: "🥚", title: "دوتایی‌ها و خانواده عددها",
    steps: [
      { type: "choose", ltr: true, show: "🥚🥚🥚 + 🥚🥚🥚", prompt: "مادربزرگ در هر ظرف سه تخم‌مرغ گذاشت. دو ظرف روی هم چند تخم‌مرغ دارد؟",
        say: "مادربزرگ در هر ظرف سه تخم‌مرغ گذاشت. دو ظرف روی هم چند تخم‌مرغ دارد؟", options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "choose", ltr: true, show: "۴ + ۴ = ؟", prompt: "وقتی عددی را با خودش جمع می‌کنیم، به آن دوتایی می‌گوییم. ۴ و ۴ چند می‌شود؟",
        say: "وقتی عددی را با خودش جمع می‌کنیم، به آن دوتایی می‌گوییم. چهار و چهار چند می‌شود؟", options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "pairs", prompt: "هر دوتایی را با جوابش جفت کن",
        pairs: [[{ label: "۲ + ۲", say: "دو و دو" }, 4], [{ label: "۳ + ۳", say: "سه و سه" }, 6], [{ label: "۵ + ۵", say: "پنج و پنج" }, 10],
          [{ label: "۶ + ۶", say: "شش و شش" }, 12]] },
      { type: "choose", ltr: true, show: "۶ + ۷ = ؟", prompt: "۶ و ۶ می‌شود ۱۲. ۷ یکی از ۶ بیشتر است. پس ۶ و ۷ چند می‌شود؟",
        say: "شش و شش می‌شود دوازده. هفت یکی از شش بیشتر است. پس شش و هفت چند می‌شود؟", options: ["۱۲", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "choose", ltr: true, show: "۸ + ۹ = ؟", prompt: "اول ۸ و ۸ را حساب کن، بعد یکی اضافه کن. جواب چند است؟",
        say: "اول هشت و هشت را حساب کن، بعد یکی اضافه کن. جواب چند است؟", options: ["۱۶", "۱۷", "۱۸"], answer: "۱۷" },
      { type: "sort", prompt: "دوتایی‌ها را در یک سبد و نزدیک دوتایی‌ها را در سبد دیگر بگذار.",
        baskets: [{ label: "دوتایی", value: "double" }, { label: "نزدیک دوتایی", value: "near" }],
        items: [{ label: "⁦۵ + ۵⁩", say: "پنج و پنج", basket: "double" }, { label: "⁦۵ + ۶⁩", say: "پنج و شش", basket: "near" },
          { label: "⁦۷ + ۷⁩", say: "هفت و هفت", basket: "double" }, { label: "⁦۷ + ۸⁩", say: "هفت و هشت", basket: "near" },
          { label: "⁦۹ + ۹⁩", say: "نه و نه", basket: "double" }, { label: "⁦۳ + ۴⁩", say: "سه و چهار", basket: "near" }] },
      { type: "choose", ltr: true, show: "۷ − ۴ = ؟", prompt: "۳ و ۴ و ۷ یک خانواده‌اند: ۳ و ۴ می‌شود ۷. پس ۷ منهای ۴ چند می‌شود؟",
        say: "سه و چهار و هفت یک خانواده‌اند: سه و چهار می‌شود هفت. پس هفت منهای چهار چند می‌شود؟", options: ["۳", "۴", "۱۱"], answer: "۳" },
      { type: "choose", ltr: true, show: "۹ − ۵ = ؟", prompt: "می‌دانیم ۴ و ۵ می‌شود ۹. پس ۹ منهای ۵ چند است؟",
        say: "می‌دانیم چهار و پنج می‌شود نه. پس نه منهای پنج چند است؟", options: ["۴", "۵", "۱۴"], answer: "۴" },
      { type: "sort", prompt: "هر جمع و تفریق را در سبد خانواده‌اش بگذار.",
        baskets: [{ label: "خانواده ۳، ۵، ۸", value: "358" }, { label: "خانواده ۲، ۷، ۹", value: "279" }],
        items: [{ label: "⁦۳ + ۵⁩", say: "سه و پنج", basket: "358" }, { label: "⁦۸ − ۵⁩", say: "هشت منهای پنج", basket: "358" },
          { label: "⁦۲ + ۷⁩", say: "دو و هفت", basket: "279" }, { label: "⁦۸ − ۳⁩", say: "هشت منهای سه", basket: "358" },
          { label: "⁦۹ − ۷⁩", say: "نه منهای هفت", basket: "279" }, { label: "⁦۹ − ۲⁩", say: "نه منهای دو", basket: "279" }] }
    ]
  },
  {
    id: "math-sapling-14", subject: "math", level: "sapling", emoji: "🃏", title: "مسئله‌های قصه‌ای",
    steps: [
      /* Place value you can see, laid out like adding in columns: Mina's 24 cards (two bundles of ten, four single
         cards) on the top row, tens on the left and ones on the right; Grandma's 13 go on the row under them, then
         her bundle joins the tens and her singles join the ones. (No sign on the stage: the question is whether to
         add or take away.) */
      { type: "scene", prompt: "به قصه گوش کن", bg: "#f6e3c6",
        parts: {
          girl: { art: "walker", look: { hair: "long", top: "#7b5ea7", bottom: "dress" }, at: [8, 89], s: 1.15 },
          m1: { art: "pcard-ten", at: [38, 58], s: 1.7, o: 0 }, m2: { art: "pcard-ten", at: [52, 58], s: 1.7, o: 0 },
          m3: { art: "pcard", at: [82, 58], s: 1.7, o: 0 }, m4: { art: "pcard", at: [91.8, 58], s: 1.7, o: 0 },
          m5: { art: "pcard", at: [101.6, 58], s: 1.7, o: 0 }, m6: { art: "pcard", at: [111.4, 58], s: 1.7, o: 0 },
          tagA: { art: "tag:۲۴", at: [22, 52], o: 0 }, tagB: { art: "tag:۱۳", at: [22, 80], o: 0 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#3f6f8f", top: "#5a9a45", bottom: "dress" }, at: [194, 89], s: 1.3, flip: true },
          g1: { art: "pcard-ten", at: [184, 80], s: 1.7 }, g2: { art: "pcard", at: [188, 80], s: 1.7 },
          g3: { art: "pcard", at: [191, 80], s: 1.7 }, g4: { art: "pcard", at: [194, 80], s: 1.7 }
        },
        scenes: [
          { caption: "مینا ۲۴ کارت داشت.", do: [
            pop("m1", 300), pop("m2", 800), pop("m3", 1500), pop("m4", 1900), pop("m5", 2300), pop("m6", 2700), pop("tagA", 3400)
          ] },
          { caption: "مادربزرگ ۱۳ کارت آورد.", do: [
            { id: "gran", walk: [152, 89], dur: 2400 },
            { id: "g1", to: { x: 142 }, dur: 2400, ease: "linear" }, { id: "g2", to: { x: 146 }, dur: 2400, ease: "linear" },
            { id: "g3", to: { x: 149 }, dur: 2400, ease: "linear" }, { id: "g4", to: { x: 152 }, dur: 2400, ease: "linear" },
            hop("g1", [142, 80], [38, 84], 2600, 900, 6), hop("g2", [146, 80], [82, 84], 3100, 700, 5),
            hop("g3", [149, 80], [91.8, 84], 3500, 700, 5), hop("g4", [152, 80], [101.6, 84], 3900, 700, 5),
            pop("tagB", 4800)
          ] },
          { caption: "مادربزرگ کارت‌ها را به مینا داد.", do: [
            hop("g1", [38, 84], [66, 58], 300, 900, 8),
            hop("g2", [82, 84], [121.2, 58], 1400, 700, 8), hop("g3", [91.8, 84], [131, 58], 1900, 700, 8), hop("g4", [101.6, 84], [140.8, 58], 2400, 700, 8),
            { id: "tagB", to: { o: 0 }, at: 3200, dur: 400 }, { id: "tagA", to: { o: 0 }, at: 3200, dur: 400 }, jump("girl", 3400, 3)
          ] }
        ],
        question: "برای پیدا کردن همه کارت‌ها، جمع کنیم یا تفریق؟", options: ["جمع", "تفریق"], answer: "جمع" },
      { type: "choose", ltr: true, show: "۲۴ + ۱۳ = ؟", prompt: "مینا روی هم چند کارت دارد؟", say: "مینا روی هم چند کارت دارد؟",
        options: ["۳۷", "۱۱", "۳۶"], answer: "۳۷" },
      /* The baker's 45 sangak breads are four piles of ten and five single breads, counted on the stage by tens and
         then ones (a running total). Two piles (۲۰) go to the customers and leave with them; what is left gets «؟». */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "bg-street" }, table: { art: "counter-table", at: [62, 88], s: 1.25 },
          baker: { art: "walker", look: { top: "#fff", bottom: "#3f6f8f" }, at: [9, 89], s: 1.35 },
          k1: { art: "sangak-ten", at: [30, 65.5], s: 0.75 }, k2: { art: "sangak-ten", at: [47, 65.5], s: 0.75 },
          k3: { art: "sangak-ten", at: [64, 65.5], s: 0.75 }, k4: { art: "sangak-ten", at: [81, 65.5], s: 0.75 },
          o1: { art: "sangak", at: [101, 65.5], s: 0.75 }, o2: { art: "sangak", at: [101, 64.4], s: 0.75 }, o3: { art: "sangak", at: [101, 63.3], s: 0.75 },
          o4: { art: "sangak", at: [101, 62.2], s: 0.75 }, o5: { art: "sangak", at: [101, 61.1], s: 0.75 },
          total: { art: "count:big", at: [62, 46], o: 0 }, tag20: { art: "tag:۲۰", at: [128, 48], o: 0 }, rest: { art: "tag:؟", at: [48, 48], o: 0 },
          boy: { art: "walker", look: { top: "#e5483f" }, at: [178, 88], s: 1.15, flip: true },
          mom: { art: "walker", look: { hair: "auto", kind: "woman", scarf: "#8a6f9e", top: "#3f6f8f", bottom: "dress" }, at: [196, 88], s: 1.35, flip: true }
        },
        scenes: [
          { caption: "نانوای محله ۴۵ نان سنگک دارد.", do: [
            { id: "total", to: { o: 1 }, at: 300, dur: 200 },
            jump("k1", 300, 2), tally("total", 10, 300), jump("k2", 900, 2), tally("total", 20, 900),
            jump("k3", 1500, 2), tally("total", 30, 1500), jump("k4", 2100, 2), tally("total", 40, 2100),
            jump("o5", 2900, 2), tally("total", 41, 2900), tally("total", 42, 3300), tally("total", 43, 3700),
            tally("total", 44, 4100), tally("total", 45, 4500)
          ] },
          { caption: "دو مشتری آمدند.", do: [{ id: "boy", walk: [124, 88], dur: 2600 }, { id: "mom", walk: [140, 88], dur: 2600 }] },
          { caption: "نانوا ۲۰ نان به مشتری‌ها داد.", do: [
            { id: "total", to: { o: 0 }, dur: 300 },
            hop("k4", [81, 65.5], [118, 75], 300, 900, 8), hop("k3", [64, 65.5], [134, 72], 1300, 1000, 10),
            pop("tag20", 2500), pop("rest", 3300)
          ] },
          { caption: "مشتری‌ها نان‌ها را بردند. بقیه نان‌ها پیش نانوا ماند.", do: [
            { id: "boy", to: { flip: 1 }, dur: 300 }, { id: "mom", to: { flip: 1 }, dur: 300 },
            { id: "boy", walk: [186, 88], at: 300, dur: 2400 }, { id: "mom", walk: [202, 88], at: 300, dur: 2400 },
            { id: "k4", to: { x: 180 }, at: 300, dur: 2400, ease: "linear" }, { id: "k3", to: { x: 196 }, at: 300, dur: 2400, ease: "linear" },
            { id: "tag20", to: { x: 190 }, at: 300, dur: 2400, ease: "linear" },
            { id: "o1", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o2", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o3", to: { x: 66 }, at: 2900, dur: 700 },
            { id: "o4", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o5", to: { x: 66 }, at: 2900, dur: 700 },
            jump("rest", 3800, 2)
          ] }
        ],
        question: "چند نان پیش نانوا مانده است؟", options: ["۲۵", "۶۵", "۲۰"], answer: "۲۵" },
      { type: "choose", prompt: "در کلاس ۱۸ دختر و ۱۵ پسر هستند. برای پیدا کردن همه بچه‌های کلاس، جمع کنیم یا تفریق؟",
        say: "در کلاس هجده دختر و پانزده پسر هستند. برای پیدا کردن همه بچه‌های کلاس، جمع کنیم یا تفریق؟", options: ["جمع", "تفریق"], answer: "جمع" },
      { type: "choose", ltr: true, show: "۱۸ + ۱۵ = ؟", prompt: "در کلاس روی هم چند بچه هست؟", say: "در کلاس روی هم چند بچه هست؟",
        options: ["۳۳", "۲۳", "۳"], answer: "۳۳" },
      { type: "choose", prompt: "آرمان ۵۰ هزار تومان داشت و یک کتاب قصه ۳۵ هزار تومانی خرید. برای پیدا کردن پولی که برایش ماند، جمع کنیم یا تفریق؟",
        say: "آرمان پنجاه هزار تومان داشت و یک کتاب قصه سی و پنج هزار تومانی خرید. برای پیدا کردن پولی که برایش ماند، جمع کنیم یا تفریق؟",
        options: ["جمع", "تفریق"], answer: "تفریق" },
      { type: "choose", ltr: true, show: "۵۰ − ۳۵ = ؟", prompt: "چند هزار تومان برای آرمان ماند؟", say: "چند هزار تومان برای آرمان ماند؟",
        options: ["۱۵", "۲۵", "۸۵"], answer: "۱۵" },
      { type: "choose", prompt: "در باغ پدربزرگ گلاره ۳۲ درخت سیب و ۲۶ درخت گلابی هست. درخت‌های سیب چندتا از درخت‌های گلابی بیشترند؟",
        say: "در باغ پدربزرگ گلاره سی و دو درخت سیب و بیست و شش درخت گلابی هست. درخت‌های سیب چندتا از درخت‌های گلابی بیشترند؟",
        options: ["۶", "۵۸", "۱۴"], answer: "۶" }
    ]
  },
  {
    id: "math-sapling-15", subject: "math", level: "sapling", emoji: "🕒", title: "ساعت",
    steps: [
      { type: "clock", ask: "show", time: "3:00",
        prompt: "ساعت دو عقربه دارد. عقربه کوتاه ساعت را نشان می‌دهد و عقربه بلند دقیقه را. عقربه بلند روی ۱۲ است و عقربه کوتاه روی ۳. پس ساعت ۳ است.",
        say: "ساعت دو عقربه دارد. عقربه کوتاه ساعت را نشان می‌دهد و عقربه بلند دقیقه را. عقربه بلند روی دوازده است و عقربه کوتاه روی سه. پس ساعت سه است." },
      { type: "clock", ask: "show", start: "3:00", time: "3:30",
        prompt: "ببین: عقربه بلند نیم دور می‌چرخد و روی ۶ می‌رود. عقربه کوتاه هم کمی جلو می‌رود و بین ۳ و ۴ می‌ایستد. حالا ساعت ۳ و نیم است.",
        say: "ببین: عقربه بلند نیم دور می‌چرخد و روی شش می‌رود. عقربه کوتاه هم کمی جلو می‌رود و بین سه و چهار می‌ایستد. حالا ساعت سه و نیم است." },
      { type: "clock", start: "3:00", prompt: "حالا خودت عقربه‌ها را بچرخان و ببین ساعت چند می‌شود.", say: "حالا خودت عقربه‌ها را بچرخان و ببین ساعت چند می‌شود." },
      { type: "clock", time: "7:00", options: ["7:00", "12:00", "8:00"], pic: "⏰", prompt: "آرش صبح‌ها این ساعت بیدار می‌شود. ساعت چند است؟" },
      { type: "clock", time: "9:30", options: ["9:00", "9:30", "10:30"] },
      { type: "clock", time: "4:00", pic: "🎨", prompt: "زهرا ساعت ۴ به کلاس نقاشی می‌رود. عقربه‌ها را روی ساعت ۴ بگذار." },
      { type: "clock", time: "1:30", options: ["1:30", "1:00", "2:30"], pic: "🍲", prompt: "ناهار آماده است. ساعت چند است؟" },
      { type: "clock", time: "7:30", pic: "🏫", prompt: "کاوه ساعت ۷ و نیم به مدرسه می‌رود. عقربه‌ها را روی ساعت ۷ و نیم بگذار." },
      { type: "clock", time: "9:00", start: "8:00", pic: "🛏️", prompt: "شب‌ها نیلوفر ساعت ۹ می‌خوابد. عقربه‌ها را روی ساعت ۹ بگذار." }
    ]
  },
  {
    id: "math-sapling-16", subject: "math", level: "sapling", emoji: "⚖️", title: "سنگین و سبک",
    steps: [
      { type: "balance", left: [{ pic: "🍉", mass: 5, say: "هندوانه" }], right: [{ pic: "🍎", mass: 1, say: "سیب" }],
        prompt: "در میوه‌فروشی، یک هندوانه و یک سیب را روی ترازو گذاشتیم. کدام طرف سنگین‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "lighter", left: [{ pic: "🎈", mass: 1, say: "بادکنک" }], right: [{ pic: "🔑", mass: 2, say: "کلید" }],
        prompt: "بادکنک از کلید بزرگ‌تر است. ولی کدام سبک‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "explore", tray: [{ pic: "🍉", mass: 5, say: "هندوانه" }, { pic: "🍎", mass: 1, say: "سیب" }, { pic: "🍈", mass: 3, say: "طالبی" },
        { pic: "🥕", mass: 1, say: "هویج" }, { pic: "📚", mass: 4, say: "کتاب‌ها" }],
        prompt: "چیزها را روی دو کفه ترازو بگذار. کدام از همه سنگین‌تر است؟" },
      { type: "balance", left: [{ pic: "🍈", mass: 3, say: "طالبی" }], open: "right", tray: [1, 1, 1, 1, 1],
        prompt: "رها و مادرش یک طالبی خریدند. وزنه‌های یک کیلویی را روی کفه راست بگذار تا ترازو صاف شود.",
        question: "طالبی چند کیلو است؟", options: [2, 3, 4], answer: 3 },
      { type: "balance", left: [{ pic: "🍉", mass: 6, say: "هندوانه" }], open: "right", tray: [5, 2, 1, 1],
        prompt: "امید می‌خواهد هندوانه را وزن کند. وزنه بگذار تا ترازو صاف شود.",
        question: "هندوانه چند کیلو است؟", options: [5, 6, 7], answer: 6 },
      { type: "balance", held: true, left: [2, 2, 1], right: [5, 1],
        prompt: "دست فروشنده ترازو را نگه داشته است. وزنه‌های هر طرف را جمع کن. کدام طرف سنگین‌تر است؟" },
      { type: "balance", left: [10, 5], right: [10], open: "right", tray: [1, 2, 2, 5],
        prompt: "کفه راست چقدر کم دارد؟ وزنه بگذار تا ترازو صاف شود." }
    ]
  },
  {
    id: "math-sapling-17", subject: "math", level: "sapling", emoji: "📦", title: "عددهای سه‌رقمی",
    steps: [
      { type: "tens", n: 100, prompt: "ده دسته ده‌تایی. روی هم چند تا چوب است؟", options: [10, 100, 1000] },
      { type: "tens", build: true, n: 100, hundreds: true, prompt: "ده دسته ده‌تایی بگذار و ببین چه می‌شود." },
      { type: "tens", n: 234, options: [234, 432, 9] },
      { type: "tens", n: 305, options: [35, 350, 305] },
      { type: "tens", build: true, n: 142 },
      { type: "choose", show: "۴۷۶", prompt: "در این عدد چند بسته صدتایی هست؟", options: ["۷", "۴", "۶"], answer: "۴" },
      { type: "tens", n: 130, b: -50, options: [80, 180, 70] },
      { type: "compare", a: 352, b: 325, pic: "tens", ask: "symbol" },
      { type: "choose", prompt: "بعد از ۹۹۹ کدام عدد می‌آید؟", options: ["۱۰۰۰", "۹۹۸", "۱۰۰"], answer: "۱۰۰۰" }
    ]
  },
  {
    id: "math-sapling-18", subject: "math", level: "sapling", emoji: "🍽️", title: "دسته‌های مساوی",
    steps: [
      /* Mum deals the biscuits out one plate at a time, round and round, until each plate has two; then a «۲»
         comes over each plate and the plus signs join them: ۲ + ۲ + ۲ (the total is the question). */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [70, 90], s: 1.5 },
          p1: { art: "plate", at: [32, 63], s: 1.3, o: 0 }, p2: { art: "plate", at: [58, 63], s: 1.3, o: 0 }, p3: { art: "plate", at: [84, 63], s: 1.3, o: 0 },
          c1: { art: "🍪", at: [101, 63], s: 0.5 }, c2: { art: "🍪", at: [111, 63], s: 0.5 }, c3: { art: "🍪", at: [121, 63], s: 0.5 },
          c4: { art: "🍪", at: [101, 55], s: 0.5 }, c5: { art: "🍪", at: [111, 55], s: 0.5 }, c6: { art: "🍪", at: [121, 55], s: 0.5 },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [142, 88], s: 1.45, flip: true },
          n1: { art: "n:۲", at: [32, 50], o: 0 }, n2: { art: "n:۲", at: [58, 50], o: 0 }, n3: { art: "n:۲", at: [84, 50], o: 0 },
          plus1: { art: "n:+", at: [45, 50], o: 0 }, plus2: { art: "n:+", at: [71, 50], o: 0 }
        },
        scenes: [
          { caption: "مادر سه بشقاب و شش شیرینی دارد.", do: [
            pop("p1", 300), pop("p2", 800), pop("p3", 1300),
            jump("c1", 2100, 2), jump("c2", 2500, 2), jump("c3", 2900, 2), jump("c4", 3300, 2), jump("c5", 3700, 2), jump("c6", 4100, 2)
          ] },
          { caption: "در هر بشقاب دو شیرینی گذاشت.", do: [
            { id: "mom.armF", to: { r: -70 }, dur: 400 },
            hop("c4", [101, 55], [27, 60.1], 300, 800, 10), hop("c5", [111, 55], [53, 60.1], 1200, 800, 10), hop("c6", [121, 55], [79, 60.1], 2100, 800, 10),
            hop("c1", [101, 63], [37, 60.1], 3000, 800, 10), hop("c2", [111, 63], [63, 60.1], 3900, 800, 10), hop("c3", [121, 63], [89, 60.1], 4800, 800, 10),
            { id: "mom.armF", to: { r: 0 }, at: 5700, dur: 400 }
          ] },
          { caption: "سه دسته دوتایی داریم: دو، و دو، و دو.", do: [
            pop("n1", 1600), pop("n2", 2600), pop("n3", 3600), pop("plus1", 4400), pop("plus2", 4400)
          ] }
        ],
        question: "روی هم چند شیرینی است؟", options: ["۵", "۶", "۸"], answer: "۶" },
      { type: "feed", a: 3, b: 3, animal: "🐿️", food: "🌰", prompt: "سنجاب دو دسته سه‌تایی بلوط می‌خواهد. به او بده." },
      { type: "feed", a: 5, b: 5, animal: "🐰", food: "🥕", max: 13, prompt: "خرگوش دو دسته پنج‌تایی هویج می‌خواهد. به او بده." },
      { type: "choose", ltr: true, show: "۳ + ۳ + ۳ + ۳ = ؟", prompt: "چهار بشقاب داریم. در هر بشقاب سه خرما هست. روی هم چند خرما است؟",
        say: "چهار بشقاب داریم. در هر بشقاب سه خرما هست. روی هم چند خرما است؟", options: ["۷", "۱۲", "۱۵"], answer: "۱۲" },
      { type: "choose", ltr: true, prompt: "سه دسته پنج‌تایی کدام است؟", options: ["۳ + ۵", "۵ + ۵ + ۵", "۳ + ۳ + ۳"], answer: "۵ + ۵ + ۵" },
      { type: "choose", ltr: true, show: "۵ + ۵ + ۵ = ؟", prompt: "سه دسته پنج‌تایی روی هم چندتاست؟", options: ["۱۵", "۸", "۲۰"], answer: "۱۵" },
      { type: "choose", prompt: "مادربزرگ به هر کدام از سه نوه‌اش چهار گردو داد. روی هم چند گردو داد؟",
        say: "مادربزرگ به هر کدام از سه نوه‌اش چهار گردو داد. روی هم چند گردو داد؟", options: ["۷", "۱۲", "۱۶"], answer: "۱۲" },
      { type: "choose", prompt: "یاسمن و کاوه هر کدام هفت تیله دارند. روی هم چند تیله دارند؟",
        say: "یاسمن و کاوه هر کدام هفت تیله دارند. روی هم چند تیله دارند؟", options: ["۱۴", "۹", "۱۲"], answer: "۱۴" }
    ]
  },
  {
    id: "math-sapling-19", subject: "math", level: "sapling", emoji: "🍰", title: "نصف و یک‌چهارم",
    steps: [
      /* Sharing out, one at a time: Mum gives the eight biscuits to Sara and Reza in turn, so each share is half.
         Dad and Grandma come, the biscuits go back to the middle, and she deals them round the four of them: each
         share is a quarter (two biscuits). The sangak halves come in the fraction steps after this. */
      (function () {
        var parts = {
          bg: { art: "bg-kitchen" },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [80, 47], s: 1.3 },
          sofreh: { art: "sofreh", at: [80, 50], sx: 2.1, sy: 1.2 }
        };
        var middle = [59, 65, 71, 77, 83, 89, 95, 101], tracks2 = [], tracks4 = [], back = [];
        // halves: Sara's pile near her (left), Reza's near him (right); quarters: two at each of the four places
        var half = [[12, 19, 26, 33], [128, 135, 142, 149]], quarter = [[19, 26], [59, 66], [99, 106], [139, 146]];
        middle.forEach(function (x, i) {
          parts["c" + i] = { art: "🍪", at: [x, 49], s: 0.38 };
          var h = half[i % 2][Math.floor(i / 2)], q = quarter[i % 4][Math.floor(i / 4)];
          tracks2.push(hop("c" + i, [x, 49], [h, 56], 500 + i * 650, 600, 8));
          back.push(hop("c" + i, [h, 56], [x, 49], 2600, 900, 6));
          tracks4.push(hop("c" + i, [x, 49], [q, 56], 500 + i * 650, 600, 8));
        });
        Object.assign(parts, {
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [22, 90], s: 1.15 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [138, 90], s: 1.15, flip: true },
          dad: { art: "walker", look: { top: "#3f6f8f", bottom: "#5c4a3a" }, at: [184, 91], s: 1.3, flip: true },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#c4673a", top: "#8a6f9e", bottom: "dress", cane: true }, at: [204, 91], s: 1.25, flip: true },
          t1: { art: "tag:نصف", at: [22.5, 42], o: 0 }, t2: { art: "tag:نصف", at: [138.5, 42], o: 0 }, t3: { art: "tag:یک‌چهارم", at: [22.5, 42], o: 0 }
        });
        return { type: "scene", prompt: "ببین نصف و یک‌چهارم یعنی چه", parts: parts,
          scenes: [
            { caption: "مادر هشت شیرینی دارد. سارا و رضا هر دو شیرینی می‌خواهند.", do: [
              middle.map(function (x, i) { return jump("c" + i, 300 + i * 350, 2); }), jump("girl", 3500, 3), jump("boy", 3900, 3)
            ] },
            { caption: "مادر شیرینی‌ها را بین سارا و رضا تقسیم کرد.", do: [
              { id: "mom.armF", to: { r: -70 }, dur: 400 }, tracks2, { id: "mom.armF", to: { r: 0 }, at: 5800, dur: 400 }
            ] },
            { caption: "سهم هر دو یک اندازه است. به سهم هر کدام می‌گوییم نصف شیرینی‌ها.", do: [pop("t1", 1500), pop("t2", 1500)] },
            { caption: "پدر و مادربزرگ هم آمدند. شیرینی‌ها را دوباره وسط گذاشتیم.", do: [
              { id: "t1", to: { o: 0 }, dur: 300 }, { id: "t2", to: { o: 0 }, dur: 300 },
              { id: "boy", walk: [62, 90], dur: 2200 }, { id: "dad", walk: [102, 91], dur: 2600 }, { id: "gran", walk: [142, 91], dur: 2800 },
              back
            ] },
            { caption: "مادر شیرینی‌ها را مساوی بین چهار نفر تقسیم کرد. به هر نفر دو شیرینی رسید.", do: [
              { id: "mom.armF", to: { r: -70 }, dur: 400 }, tracks4, { id: "mom.armF", to: { r: 0 }, at: 5800, dur: 400 }
            ] },
            { caption: "به سهم هر نفر می‌گوییم یک‌چهارم شیرینی‌ها.", do: [pop("t3", 1000)] }
          ],
          question: "هشت شیرینی را مساوی بین چهار نفر تقسیم کردیم. به سهم هر نفر چه می‌گوییم؟",
          options: ["نصف", "یک‌چهارم", "همه شیرینی‌ها"], answer: "یک‌چهارم" };
      })(),
      { type: "fraction", ask: "equal", shape: "bread", prompt: "کدام نان درست از وسط نصف شده است؟",
        shapes: [{ cuts: [0.3] }, { parts: 2 }, { cuts: [0.65] }] },
      { type: "fraction", cut: true, shape: "bread", parts: 2, prompt: "نان سنگک را به دو تکه مساوی ببر. روی خط‌چین‌ها بزن." },
      { type: "fraction", shape: "circle", parts: 4, take: 1, prompt: "کیک به چهار تکه مساوی بریده شده. یک‌چهارم آن را رنگ کن." },
      { type: "fraction", ask: "name", shape: "circle", parts: 2, take: 1, prompt: "چه مقدار از کیک رنگ شده است؟",
        options: ["نصف", "یک‌چهارم", "همه کیک"], answer: "نصف" },
      { type: "fraction", cut: true, shape: "circle", parts: 4, prompt: "این کیک را به چهار تکه مساوی ببر. روی خط‌چین‌ها بزن." },
      { type: "fraction", set: 8, parts: 2, thing: "🍬", who: ["👦", "👧"], prompt: "هشت آب‌نبات را مساوی بین آرش و نازنین تقسیم کن.",
        result: "نصف ۸ می‌شود ۴." },
      { type: "fraction", set: 8, parts: 4, thing: "🍪", who: ["👧", "👦", "👧🏽", "👦🏻"], prompt: "هشت شیرینی را مساوی بین چهار دوست تقسیم کن.",
        result: "یک‌چهارم ۸ می‌شود ۲." }
    ]
  },
  {
    id: "math-sapling-20", subject: "math", level: "sapling", emoji: "📊", title: "نمودار تصویری",
    steps: [
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "چند نفر انگور دوست دارند؟", options: [4, 5, 6], answer: 5 },
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "کدام میوه را کمتر از همه دوست دارند؟",
        options: [{ label: "سیب", value: "🍎" }, { label: "انگور", value: "🍇" }, { label: "پرتقال", value: "🍊" }], answer: "🍊" },
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "انگور را چند نفر بیشتر از پرتقال دوست دارند؟", options: [2, 3, 7], answer: 3 },
      { type: "chart", make: true, title: "حیوان‌های مزرعه پدربزرگ", prompt: "حیوان‌های مزرعه را بشمار: هر کدام را در ستون خودش بگذار.",
        rows: [{ label: "مرغ", pic: "🐔", n: 5 }, { label: "گوسفند", pic: "🐑", n: 3 }, { label: "گاو", pic: "🐄", n: 2 }],
        question: "از کدام حیوان بیشتر از همه هست؟",
        options: [{ label: "مرغ", value: "🐔" }, { label: "گوسفند", value: "🐑" }, { label: "گاو", value: "🐄" }], answer: "🐔" },
      { type: "chart", add: true, title: "هوای این هفته", prompt: "دو روز دیگر هوا آفتابی بود و یک روز دیگر ابری. به نمودار اضافه کن.",
        rows: [{ label: "آفتابی", pic: "☀️", has: 2, n: 4 }, { label: "ابری", pic: "☁️", has: 1, n: 2 }, { label: "بارانی", pic: "🌧️", has: 1, n: 1 }],
        question: "این هفته چند روز هوا آفتابی بود؟", options: [2, 4, 3], answer: 4 },
      { type: "chart", title: "بچه‌ها چطور به مدرسه می‌آیند؟",
        rows: [{ label: "پیاده", pic: "🚶", n: 6 }, { label: "سرویس", pic: "🚌", n: 4 }, { label: "ماشین", pic: "🚗", n: 2 }, { label: "دوچرخه", pic: "🚲", n: 1 }],
        question: "روی هم چند نفر پیاده یا با دوچرخه می‌آیند؟", options: [6, 7, 8], answer: 7 }
    ]
  },
  {
    id: "math-sapling-21", subject: "math", level: "sapling", emoji: "🏪", title: "بازی بازار",
    steps: [
      { type: "pairs", prompt: "هر قیمت را به پولی که همان‌قدر است وصل کن.",
        pairs: [[{ pic: "🍉", label: 25 }, "۲۰ + ۵"], [{ pic: "🍇", label: 17 }, "۱۰ + ۵ + ۲"], [{ pic: "🍎", label: 8 }, "۵ + ۲ + ۱"], [{ pic: "🍊", label: 12 }, "۱۰ + ۲"]] },
      { type: "money", prompt: "یاسمن پسته و عسل خرید. روی هم چقدر شد؟",
        items: [{ emoji: "🥜", name: "پسته", price: 40 }, { emoji: "🍯", name: "عسل", price: 35 }], options: [65, 75, 85] },
      { type: "sort", prompt: "آراز ۳۰ هزار تومان دارد. کدام را می‌تواند بخرد؟",
        baskets: [{ label: "می‌تواند بخرد", pic: "👍", value: "yes" }, { label: "پولش کم است", pic: "✋", value: "no" }],
        items: [{ pic: "🍎", label: 12, basket: "yes" }, { pic: "🍉", label: 45, basket: "no" }, { pic: "🥒", label: 25, basket: "yes" },
          { pic: "🧀", label: 38, basket: "no" }, { pic: "🍞", label: 6, basket: "yes" }, { pic: "🍯", label: 30, basket: "yes" }] },
      { type: "money", prompt: "پول گلابی‌ها را بده.", items: [{ emoji: "🍐", name: "گلابی", price: 27 }], wallet: [20, 5, 10, 2, 1, 1] },
      { type: "money", prompt: "۵۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍉", name: "هندوانه", price: 36 }],
        bills: [50], answer: 14, options: [24, 14, 16] },
      { type: "pairs", prompt: "هر تفریق را به جوابش وصل کن.", pairs: [["۲۰ − ۱۵", 5], ["۵۰ − ۳۵", 15], ["۱۰۰ − ۶۰", 40]] },
      { type: "money", prompt: "مهسا گوجه‌فرنگی، خیار و پیاز خرید. روی هم چقدر شد؟",
        items: [{ emoji: "🍅", name: "گوجه‌فرنگی", price: 15 }, { emoji: "🥒", name: "خیار", price: 12 }, { emoji: "🧅", name: "پیاز", price: 8 }], options: [33, 35, 45] }
    ]
  }
);

  // Tracks can be given in little lists (fly, pop): each beat gets one flat list.
  B.LESSONS.forEach(function (l) {
    if (l.subject === "math") l.steps.forEach(function (st) {
      if (st.type === "scene") st.scenes.forEach(function (sc) { if (sc.do) sc.do = all(sc.do); });
    });
  });
})();
