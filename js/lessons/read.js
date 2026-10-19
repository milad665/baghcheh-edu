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
      /* A picture story to watch and listen to: Sara throws her ball, the cat comes out from behind the bush, the
         ball rolls to it and it plays. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه نگاه کن و گوش بده",
        parts: {
          bg: { art: "read-bg-meadow" }, tree: { art: "read-tree-big", at: [40, 84] },
          cat: { art: "🐈", at: [40, 86], s: 1.1, flip: true }, bush: { art: "read-bush", at: [40, 88], s: 1.3 },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#6b3f26" }, at: [124, 86], s: 1.5, flip: true },
          ball: { art: "read-ball-c", at: [108, 64], s: 1.4 }
        },
        scenes: [
          { caption: "سارا در حیاط توپ‌بازی می‌کند.", key: 900, do: [
            { id: "girl.armF", to: { r: -90 }, dur: 1 }, { id: "girl.armB", to: { r: -80 }, dur: 1 },
            { id: "ball", to: { y: 30 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 },
            { id: "girl.armF", to: { r: -150 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 },
            { id: "girl.armB", to: { r: -140 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 }
          ] },
          { caption: "گربه از پشت درخت بیرون می‌آید.", do: [
            { id: "cat", to: { y: 79 }, dur: 700, ease: "out" },
            { id: "cat", path: "M40 79Q52 72 62 88", at: 1000, dur: 1000 }
          ] },
          { caption: "توپ قِل می‌خورد و می‌رود پیش گربه.", do: [
            { id: "girl.armF", to: { r: -40 }, dur: 400 }, { id: "girl.armB", to: { r: -30 }, dur: 400 },
            { id: "ball", path: "M108 64Q104 66 100 80.4", dur: 500, ease: "in" },
            { id: "ball", to: { x: 80, r: -200 }, at: 500, dur: 2200, ease: "out" },
            { id: "girl.armF", to: { r: 0 }, at: 900, dur: 500 }, { id: "girl.armB", to: { r: 0 }, at: 900, dur: 500 }
          ] },
          { caption: "گربه با توپ بازی می‌کند. سارا می‌خندد.", key: 1700, do: [
            { id: "cat", to: { x: "+4", r: 8 }, dur: 3200, yoyo: true, times: 6 },
            { id: "ball", to: { x: "+6", r: "+90" }, at: 120, dur: 3200, yoyo: true, times: 6 },
            { id: "girl.eyes", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.smile", to: { o: 0 }, at: 900, dur: 200 },
            { id: "girl.laugh", to: { o: 1 }, at: 900, dur: 200 },
            { id: "girl", to: { y: "-2" }, at: 1000, dur: 2200, yoyo: true, times: 6 }
          ] }
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
      /* Rhyme: each word is said as two coloured sound bars (the first sound on the right, as Persian is read).
         Words that rhyme end in the same colour, and the two endings light up together. */
      { type: "scene", prompt: "گوش بده: آخر این کلمه‌ها چه صدایی دارد؟", bg: "#fdf3df",
        parts: {
          mouse: { art: "🐭", at: [180, 52], s: 2 }, ear: { art: "👂", at: [42, 52], s: 0.2, o: 0 },
          barM: { art: "read-bar-mouse", at: [102, 57], o: 0 }, barE: { art: "read-bar-ear", at: [42, 57], o: 0 },
          link: { art: "read-link-rhyme", o: 0 }, frame: { art: "read-pair-frame", o: 0 },
          lion: { art: "🦁", at: [100, 72], s: 0.2, o: 0 }, cheese: { art: "🧀", at: [60, 72], s: 0.2, o: 0 },
          barL: { art: "read-bar-lion", at: [100, 75], s: 0.8, o: 0 }, barC: { art: "read-bar-cheese", at: [60, 75], s: 0.8, o: 0 },
          link2: { art: "read-link-rhyme2", o: 0 }, frame2: { art: "read-pair-frame2", o: 0 }
        },
        scenes: [
          { caption: "این موش است.", do: [
            { id: "mouse", path: "M180 52Q160 44 146 52Q132 44 118 52Q110 46 102 52", dur: 1600, ease: "out" }
          ] },
          { caption: "این گوش است.", do: [
            { id: "ear", to: { s: 2, o: 1 }, dur: 900, ease: "back" }
          ] },
          { caption: "موش، گوش! آخرشان یک‌جور صدا می‌دهد.", key: 3400, hold: 6000, do: [
            { id: "barM", to: { o: 1 }, dur: 300 }, { id: "barE", to: { o: 1 }, dur: 300 },
            { id: "barM.start", to: { s: 1.3 }, at: 100, dur: 400, yoyo: true, times: 2 },
            { id: "barM.end", to: { s: 1.3 }, at: 450, dur: 400, yoyo: true, times: 2 },
            { id: "barE.start", to: { s: 1.3 }, at: 800, dur: 400, yoyo: true, times: 2 },
            { id: "barE.end", to: { s: 1.3 }, at: 1150, dur: 400, yoyo: true, times: 2 },
            { id: "barM.end", to: { s: 1.35 }, at: 2600, dur: 2400, yoyo: true, times: 6 },
            { id: "barE.end", to: { s: 1.35 }, at: 2600, dur: 2400, yoyo: true, times: 6 },
            { id: "link", to: { o: 1 }, at: 2600, dur: 100 }, { id: "link", draw: true, at: 2600, dur: 1200 }
          ] },
          { caption: "به این‌ها می‌گوییم کلمه‌های هم‌قافیه.", do: [
            { id: "link", to: { o: 0 }, dur: 300 },
            { id: "mouse", to: { x: 100, y: 30, s: 1.2 }, at: 300, dur: 1000 }, { id: "ear", to: { x: 60, y: 30, s: 1.2 }, at: 300, dur: 1000 },
            { id: "barM", to: { x: 100, y: 33, s: 0.8 }, at: 300, dur: 1000 }, { id: "barE", to: { x: 60, y: 33, s: 0.8 }, at: 300, dur: 1000 },
            { id: "frame", to: { o: 1 }, at: 1400, dur: 100 }, { id: "frame", draw: true, at: 1400, dur: 1400 }
          ] },
          { caption: "شیر، پنیر! این‌ها هم هم‌قافیه‌اند.", key: 3600, hold: 6000, do: [
            { id: "lion", to: { s: 1.2, o: 1 }, dur: 700, ease: "back" }, { id: "cheese", to: { s: 1.2, o: 1 }, at: 500, dur: 700, ease: "back" },
            { id: "barL", to: { o: 1 }, at: 200, dur: 300 }, { id: "barC", to: { o: 1 }, at: 700, dur: 300 },
            { id: "barL.start", to: { s: 1.3 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "barL.end", to: { s: 1.3 }, at: 650, dur: 400, yoyo: true, times: 2 },
            { id: "barC.start", to: { s: 1.3 }, at: 1000, dur: 400, yoyo: true, times: 2 },
            { id: "barC.end", to: { s: 1.3 }, at: 1350, dur: 400, yoyo: true, times: 2 },
            { id: "barL.end", to: { s: 1.35 }, at: 2400, dur: 2400, yoyo: true, times: 6 },
            { id: "barC.end", to: { s: 1.35 }, at: 2400, dur: 2400, yoyo: true, times: 6 },
            { id: "link2", to: { o: 1 }, at: 2400, dur: 100 }, { id: "link2", draw: true, at: 2400, dur: 1000 },
            { id: "frame2", to: { o: 1 }, at: 3600, dur: 100 }, { id: "frame2", draw: true, at: 3600, dur: 1400 }
          ] }
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
      /* Kian says each word in pieces and claps once for every piece: a close-up of his hands, a clap mark for
         every clap, so the number of claps can be counted. The child claps next (step clap). */
      { type: "scene", prompt: "ببین کیان چطور کلمه‌ها را تکه‌تکه می‌گوید", bg: "#fdf3df",
        parts: {
          boy: { art: "👦", at: [140, 88], s: 1.3, flip: true },
          dad: { art: "👨", at: [70, 30], s: 0.6, o: 0 }, ball: { art: "⚽", at: [70, 30], s: 0.6, o: 0 }, fly: { art: "🦋", at: [70, 30], s: 0.6, o: 0 },
          c1: { art: "👏", at: [58, 53], s: 0.3, o: 0 }, c2: { art: "👏", at: [82, 53], s: 0.3, o: 0 }, c3: { art: "👏", at: [92, 53], s: 0.3, o: 0 },
          handL: { art: "hand", at: [57, 90], s: 1.3, r: -12, flip: true }, handR: { art: "hand", at: [83, 90], s: 1.3, r: 12 }
        },
        scenes: [
          { caption: "کیان کلمه‌ها را تکه‌تکه می‌گوید و با هر تکه دست می‌زند.", key: 2770, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2600, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2600, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2770, dur: 100, life: 700 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 3400, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 3400, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 3570, dur: 100, life: 700 }
          ] },
          { caption: "بابا", say: "بابا. با ... با", key: 2500, hold: 3600, do: [
            { id: "dad", to: { o: 1, s: 1.1 }, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1200, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1200, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1370, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1380, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2100, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2100, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2270, dur: 100, life: 700 },
            { id: "c2", to: { o: 1, s: 1.05 }, at: 2280, dur: 250, ease: "back" }
          ] },
          { caption: "دو تکه، دو بار دست.", key: 1080, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1070, dur: 100, life: 700 },
            { id: "c2", to: { s: 1.4 }, at: 1080, dur: 360, yoyo: true, times: 2 }
          ] },
          { caption: "توپ", say: "توپ. توپ", key: 1600, hold: 3000, do: [
            { id: "dad", to: { o: 0, s: 0.6 }, dur: 500, ease: "in" },
            { id: "c1", to: { o: 0, s: 0.3 }, dur: 300 }, { id: "c2", to: { o: 0, s: 0.3 }, dur: 300 },
            { id: "c1", to: { x: 70 }, at: 320, dur: 1 },
            { id: "ball", to: { o: 1, s: 1.4 }, at: 300, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1200, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1200, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1370, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1380, dur: 250, ease: "back" }
          ] },
          { caption: "یک تکه، یک بار دست.", key: 480, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 }
          ] },
          { caption: "پروانه", say: "پروانه. پَر ... وا ... نه", key: 3300, hold: 4200, do: [
            { id: "ball", to: { o: 0, s: 0.6 }, dur: 500, ease: "in" },
            { id: "c1", to: { o: 0, s: 0.3 }, dur: 300 },
            { id: "c1", to: { x: 48 }, at: 320, dur: 1 },
            { id: "c2", to: { x: 70 }, at: 320, dur: 1 },
            { id: "fly", to: { o: 1, s: 1.4 }, at: 300, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1470, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1480, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2100, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2100, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2270, dur: 100, life: 700 },
            { id: "c2", to: { o: 1, s: 1.05 }, at: 2280, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 3070, dur: 100, life: 700 },
            { id: "c3", to: { o: 1, s: 1.05 }, at: 3080, dur: 250, ease: "back" }
          ] },
          { caption: "سه تکه، سه بار دست. حالا تو امتحان کن!", key: 1680, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1070, dur: 100, life: 700 },
            { id: "c2", to: { s: 1.4 }, at: 1080, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1500, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1500, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1670, dur: 100, life: 700 },
            { id: "c3", to: { s: 1.4 }, at: 1680, dur: 360, yoyo: true, times: 2 },
            { id: "boy", to: { y: "-4" }, at: 2600, dur: 1200, yoyo: true, times: 4 }
          ] }
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
      /* First sounds: each word is said as two sound bars (the first sound on the right, as Persian is read). Words
         that begin alike start with the same colour, and the first sound lights up as it is said. */
      { type: "scene", prompt: "گوش بده: اول هر کلمه چه صدایی دارد؟", bg: "#fdf3df",
        parts: {
          fish: { art: "🐟", at: [124, 58], s: 0.4, o: 0 }, mouse: { art: "🐭", at: [84, 58], s: 0.4, o: 0 }, apple: { art: "🍎", at: [40, 58], s: 0.4, o: 0 },
          barF: { art: "read-bar-m", at: [124, 63], o: 0 }, barMo: { art: "read-bar-m", at: [84, 63], o: 0 }, barA: { art: "read-bar-s", at: [40, 63], o: 0 },
          link: { art: "read-link-start", o: 0 }
        },
        scenes: [
          { caption: "ماهی با صدای «مـ» شروع می‌شود.", say: "ماهی. مـ ... ماهی. ماهی با صدای مـ شروع می‌شود.", key: 1700, do: [
            { id: "fish", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barF", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barF.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barF.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 },
            { id: "fish", to: { r: 8 }, at: 800, dur: 3200, yoyo: true, times: 4 }
          ] },
          { caption: "موش هم با صدای «مـ» شروع می‌شود.", say: "موش. مـ ... موش. موش هم با صدای مـ شروع می‌شود.", key: 1700, do: [
            { id: "mouse", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barMo", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barMo.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barMo.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "سیب با صدای «سـ» شروع می‌شود.", say: "سیب. سـ ... سیب. سیب با صدای سـ شروع می‌شود.", key: 1700, do: [
            { id: "apple", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barA", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barA.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barA.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "ماهی و موش اولشان مثل هم است. سیب نه!", key: 3400, hold: 5000, do: [
            { id: "barF.start", to: { s: 1.35 }, dur: 2400, yoyo: true, times: 6 }, { id: "barMo.start", to: { s: 1.35 }, dur: 2400, yoyo: true, times: 6 },
            { id: "fish", to: { y: "-3" }, dur: 2400, yoyo: true, times: 6 }, { id: "mouse", to: { y: "-3" }, dur: 2400, yoyo: true, times: 6 },
            { id: "link", to: { o: 1 }, dur: 100 }, { id: "link", draw: true, dur: 1200 },
            { id: "apple", to: { o: 0.4, s: 1.4 }, at: 2600, dur: 700 }, { id: "barA", to: { o: 0.4 }, at: 2600, dur: 700 }
          ] }
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
      /* Listening stories: each one shows its events in order, so «اول چه شد؟» can be answered from what was seen.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-street" }, bakery: { art: "read-bakery", at: [38, 60] },
          baker: { art: "🧑‍🍳", at: [85.7, 89], flip: true }, peel: { art: "read-peel", at: [75.8, 70], s: 0.72, r: 39.4 },
          steam1: { art: "read-steam", at: [48, 45], o: 0 },
          boy: { art: "read-kid", look: { hair: "short", top: "#4f8fd6" }, at: [190, 88], s: 1.05, flip: true },
          gran: { art: "👵", look: { key: "nima-gran" }, at: [212, 88], flip: true },
          bread: { art: "🫓", at: [48, 50], s: 0.45, o: 0 }, steam2: { art: "read-steam", at: [115, 68], o: 0 },
          room: { art: "read-bg-room", o: 0 }, sofreh: { art: "read-sofreh", at: [80, 81], o: 0 },
          bread2: { art: "🫓", at: [62, 83], s: 0.7, o: 0 }, cheese: { art: "🧀", at: [78, 84], s: 0.55, o: 0 }, pot: { art: "🫖", at: [94, 83], s: 0.6, o: 0 },
          boy2: { art: "read-kid", look: { hair: "short", top: "#4f8fd6" }, at: [40, 92.4], s: 1.05, o: 0 },
          gran2: { art: "👵", look: { key: "nima-gran", cane: false }, at: [124, 95], flip: true, o: 0 },
          glass: { art: "read-tea-glass", at: [114, 84], s: 1.1, o: 0 }, bite: { art: "read-bite", at: [47, 81], o: 0 }
        },
        scenes: [
          { caption: "صبح است. نیما و مادربزرگ به نانوایی می‌روند.", do: [
            { id: "baker.armF", to: { r: -90 }, dur: 1 }, { id: "baker.armB", to: { r: -80 }, dur: 1 },
            { id: "boy", walk: [122, 88], dur: 2800 }, { id: "gran", walk: [144, 88], at: 200, dur: 2800 }
          ] },
          { caption: "نانوا نان سنگک گرم می‌پزد.", hold: 5200, do: [
            { id: "baker", to: { x: "-8" }, at: 300, dur: 800 }, { id: "peel", to: { x: "-8" }, at: 300, dur: 800 },
            { id: "bakery.fire", to: { s: 1.3 }, at: 1100, dur: 1600, yoyo: true, times: 4 },
            { id: "peel.dough", to: { o: 0 }, at: 1800, dur: 600 }, { id: "peel.bread", to: { o: 1 }, at: 1800, dur: 600 },
            { id: "baker", to: { x: "+8" }, at: 2900, dur: 800 }, { id: "peel", to: { x: "+8" }, at: 2900, dur: 800 },
            { id: "steam1", to: { o: 1 }, at: 3700, dur: 300 }, { id: "steam1", to: { y: "-4" }, at: 3700, dur: 1200 }
          ] },
          { caption: "نیما نان گرم را بغل می‌کند. چه بوی خوبی!", key: 3000, do: [
            { id: "steam1", to: { o: 0 }, dur: 300 },
            { id: "peel.bread", to: { o: 0 }, at: 300, dur: 1 }, { id: "bread", to: { o: 1 }, at: 300, dur: 1 },
            { id: "bread", path: "M48 50Q86 40 115 79", at: 300, dur: 1300 }, { id: "bread", to: { s: 0.6 }, at: 300, dur: 1300 },
            { id: "boy.armF", to: { r: -60 }, at: 1100, dur: 500 }, { id: "boy.armB", to: { r: -50 }, at: 1100, dur: 500 },
            { id: "boy", to: { y: "-2" }, at: 1700, dur: 1600, yoyo: true, times: 4 }, { id: "bread", to: { y: "-2" }, at: 1700, dur: 1600, yoyo: true, times: 4 },
            { id: "steam2", to: { o: 1 }, at: 1700, dur: 300 }, { id: "steam2", to: { y: "-5" }, at: 1700, dur: 1800 },
            { id: "boy.eyes", to: { o: 0 }, at: 1700, dur: 200 }, { id: "boy.smile", to: { o: 0 }, at: 1700, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, at: 1700, dur: 200 }
          ] },
          { caption: "در خانه، همه سر سفره صبحانه نان و پنیر و چای می‌خورند.", key: 2700, hold: 6500, do: [
            { id: "room", to: { o: 1 }, dur: 800 },
            { id: "boy2.legF", to: { r: -90 }, dur: 1 }, { id: "boy2.legB", to: { r: -90 }, dur: 1 },
            { id: "gran2.legF", to: { r: -90 }, dur: 1 }, { id: "gran2.legB", to: { r: -90 }, dur: 1 },
            { id: "sofreh", to: { o: 1 }, at: 600, dur: 500 }, { id: "bread2", to: { o: 1 }, at: 700, dur: 500 }, { id: "cheese", to: { o: 1 }, at: 700, dur: 500 },
            { id: "pot", to: { o: 1 }, at: 700, dur: 500 }, { id: "glass", to: { o: 1 }, at: 700, dur: 500 },
            { id: "boy2", to: { o: 1 }, at: 700, dur: 500 }, { id: "gran2", to: { o: 1 }, at: 700, dur: 500 },
            { id: "boy2.armF", to: { r: -60 }, at: 1400, dur: 500 }, { id: "bite", to: { o: 1 }, at: 1900, dur: 200 },
            { id: "boy2.armF", to: { r: -140 }, at: 2000, dur: 700 }, { id: "bite", path: "M47 81Q44 76 45 71", at: 2000, dur: 700 },
            { id: "bite", to: { o: 0 }, at: 3000, dur: 300 }, { id: "boy2.armF", to: { r: 0 }, at: 3300, dur: 600 },
            { id: "gran2.armF", to: { r: -60 }, at: 1400, dur: 500 },
            { id: "gran2.armF", to: { r: -140 }, at: 2000, dur: 700 }, { id: "glass", path: "M114 84Q114 76 117.6 72.5", at: 2000, dur: 700 },
            { id: "gran2.armF", to: { r: -60 }, at: 3600, dur: 700 }, { id: "glass", path: "M117.6 72.5Q114 76 114 84", at: 3600, dur: 700 },
            { id: "gran2.armF", to: { r: 0 }, at: 4400, dur: 500 }
          ] }
        ],
        question: "نیما و مادربزرگ کجا رفتند؟", pic: true,
        options: [{ label: "🏫", value: "مدرسه" }, { label: "🫓", value: "نانوایی" }, { label: "🌳", value: "پارک" }], answer: "نانوایی" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "👵👦", say: "نیما و مادربزرگ به نانوایی رفتند" }, { pic: "🫓", say: "نانوا نان پخت" }, { pic: "🧀", say: "سر سفره صبحانه خوردند" }] },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-garden" }, rainbow: { art: "read-rainbow", o: 0 }, house: { art: "read-house" },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#f59e0b", hairColor: "#3d2c22" }, at: [143, 66], s: 1.1, flip: true },
          umb: { art: "read-umbrella-red", under: "girl", at: [7.5, -15.9], s: 0.55, r: -20 },
          grey: { art: "read-grey" }, cloud: { art: "read-raincloud" }
        },
        scenes: [
          { caption: "در رشت باران می‌بارد.", key: 2500, do: [
            { id: "girl.armF", to: { r: -100 }, dur: 1 }, { id: "umb.open", to: { o: 0 }, dur: 1 }, { id: "umb.shut", to: { o: 1 }, dur: 1 },
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 70, dur: 4200, life: 1000 },
            { id: "cloud", to: { x: "+3" }, dur: 4200, yoyo: true, times: 2 }
          ] },
          { caption: "ترانه چترش را باز می‌کند و به حیاط می‌رود.", key: 4000, hold: 5200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 80, dur: 4800, life: 1000 },
            { id: "umb.open", to: { sx: 0.15, o: 1 }, at: 300, dur: 1 }, { id: "umb.open", to: { sx: 1 }, at: 320, dur: 900, ease: "back" },
            { id: "umb.shut", to: { o: 0 }, at: 300, dur: 300 },
            { id: "girl", to: { x: 92, y: 88, s: 1.5 }, at: 1500, dur: 2400, ease: "linear" },
            { id: "girl.legF", to: { r: 24 }, at: 1500, dur: 2400, yoyo: true, times: 10 }, { id: "girl.legB", to: { r: -24 }, at: 1500, dur: 2400, yoyo: true, times: 10 }
          ] },
          { caption: "باران بند می‌آید. رنگین‌کمان در آسمان پیدا می‌شود.", hold: 5000, do: [
            { id: "grey", to: { o: 0 }, dur: 1600 }, { id: "cloud", to: { x: -170 }, dur: 2400, ease: "in" },
            { id: "rainbow", to: { o: 1 }, at: 1600, dur: 100 }, { id: "rainbow", draw: true, at: 1600, dur: 2200 }
          ] },
          { caption: "ترانه رنگین‌کمان را نگاه می‌کند و می‌خندد.", key: 2200, do: [
            { id: "girl", to: { r: -8 }, dur: 700 },
            { id: "girl.eyes", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.smile", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 900, dur: 200 },
            { id: "girl", to: { y: "-2" }, at: 1100, dur: 2000, yoyo: true, times: 6 }
          ] }
        ],
        question: "ترانه آخر قصه چه حسی داشت؟", pic: true,
        options: [{ label: "😢", value: "ناراحت" }, { label: "😄", value: "خوشحال" }, { label: "😠", value: "عصبانی" }], answer: "خوشحال" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "🌧️", say: "باران آمد" }, { pic: "☂️", say: "ترانه چترش را باز کرد" }, { pic: "🌈", say: "رنگین‌کمان پیدا شد" }] },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-garden" }, tree: { art: "read-tree-big", at: [40, 84] },
          stuck: { art: "read-kite-stuck", at: [52, 40], s: 0.85, o: 0 },
          wind1: { art: "read-wind", at: [150, 30], o: 0 }, wind2: { art: "read-wind", at: [160, 52], o: 0 },
          grandpa: { art: "👴", look: { cane: false }, at: [196, 88], s: 1.25, flip: true },
          pole: { art: "read-pole", under: "grandpa", at: [0, -7], s: 0.45 },
          kite: { art: "read-kite-line", at: [111.9, 62.5], s: 0.3, r: 40 },
          boy: { art: "read-kid", look: { hair: "short", top: "#5a9a45" }, at: [118, 88], s: 1.25, flip: true },
          heart: { art: "read-heart", at: [96, 46], s: 0.2, o: 0 }
        },
        scenes: [
          { caption: "آرش در باغ بادبادک هوا می‌کند.", key: 3000, do: [
            { id: "boy.armF", to: { r: -140 }, dur: 1 },
            { id: "kite", to: { s: 0.75, r: 0 }, dur: 2200, ease: "out" },
            { id: "kite", to: { r: 5 }, at: 2200, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "باد تند می‌آید. بادبادک روی درخت گیر می‌کند.", key: 1500, do: [
            { id: "wind1", to: { o: 1 }, dur: 300 }, { id: "wind1", to: { x: 10 }, dur: 1800, ease: "linear" }, { id: "wind1", to: { o: 0 }, at: 1500, dur: 300 },
            { id: "wind2", to: { o: 1 }, at: 400, dur: 300 }, { id: "wind2", to: { x: 20 }, at: 400, dur: 1800, ease: "linear" }, { id: "wind2", to: { o: 0 }, at: 1900, dur: 300 },
            { id: "tree", to: { r: -3 }, at: 300, dur: 2000, yoyo: true, times: 4 },
            { id: "kite", to: { r: -47.5, s: 0.89 }, at: 600, dur: 1400, ease: "in" },
            { id: "kite", to: { o: 0 }, at: 2000, dur: 200 }, { id: "stuck", to: { o: 1 }, at: 2000, dur: 200 },
            { id: "boy.armF", to: { r: 0 }, at: 2300, dur: 600 },
            { id: "stuck", to: { r: 8 }, at: 2200, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "آرش ناراحت است. بادبادکش را می‌خواهد.", key: 2600, do: [
            { id: "boy.smile", to: { o: 0 }, dur: 300 }, { id: "boy.sad", to: { o: 1 }, dur: 300 },
            { id: "boy", walk: [108, 88], at: 600, dur: 1200 },
            { id: "boy.armF", to: { r: -160 }, at: 2000, dur: 300 },
            { id: "boy", to: { y: "-6" }, at: 2200, dur: 1600, yoyo: true, times: 4, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 3900, dur: 400 }
          ] },
          { caption: "پدربزرگ با یک چوب بلند بادبادک را پایین می‌آورد.", key: 3500, hold: 6000, do: [
            { id: "grandpa", walk: [92, 88], dur: 2400 },
            { id: "grandpa.armF", to: { r: -150 }, at: 2600, dur: 800 }, { id: "pole", to: { x: 3.8, y: -21.2, r: 66.7 }, at: 2600, dur: 800 },
            { id: "stuck", path: "M52 40Q76 52 98 84", at: 3500, dur: 1200, ease: "in" }, { id: "stuck", to: { r: 120 }, at: 3500, dur: 1200 },
            { id: "grandpa.armF", to: { r: 0 }, at: 4800, dur: 700 }, { id: "pole", to: { x: 0, y: -7, r: 0 }, at: 4800, dur: 700 }
          ] },
          { caption: "آرش خوشحال می‌شود. پدربزرگ را بغل می‌کند و می‌گوید: «مرسی!»", do: [
            { id: "boy.sad", to: { o: 0 }, dur: 200 }, { id: "boy.eyes", to: { o: 0 }, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, dur: 200 },
            { id: "boy.armF", to: { r: -60 }, at: 200, dur: 500 }, { id: "stuck", to: { x: 100, y: 74, r: 0 }, at: 200, dur: 700 },
            { id: "boy", to: { x: 100 }, at: 1100, dur: 900 }, { id: "stuck", to: { x: 92 }, at: 1100, dur: 900 },
            { id: "grandpa", to: { flip: 1 }, at: 900, dur: 300 }, { id: "boy.armB", to: { r: -70 }, at: 1700, dur: 400 },
            { id: "heart", to: { o: 1, s: 1 }, at: 2100, dur: 600, ease: "back" }
          ] }
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
      /* How a Persian book is read: a finger runs under the words from right to left, line by line, each word lighting
         up as it passes; then the spaces between the words are marked. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین کتاب فارسی را چطور می‌خوانیم", bg: "#f6efe2",
        parts: {
          book: { art: "read-book", at: [0, 8], o: 0 }, ringPic: { art: "read-ring-pic", o: 0 }, ringText: { art: "read-ring-text", o: 0 },
          finger: { art: "read-finger", at: [135.5, 35.5], o: 0 }
        },
        scenes: [
          { caption: "این یک کتاب قصه است. در کتاب، هم تصویر هست و هم نوشته.", hold: 6500, do: [
            { id: "book", to: { y: 0, o: 1 }, dur: 900, ease: "out" },
            { id: "ringPic", to: { o: 1 }, at: 2800, dur: 100 }, { id: "ringPic", draw: true, at: 2800, dur: 1200 },
            { id: "ringText", to: { o: 1 }, at: 4600, dur: 100 }, { id: "ringText", draw: true, at: 4600, dur: 1200 }
          ] },
          { caption: "نوشته‌ها را از سمت راست شروع می‌کنیم.", do: [
            { id: "ringPic", to: { o: 0 }, dur: 400 }, { id: "ringText", to: { o: 0 }, dur: 400 },
            { cam: { x: 114, y: 41, zoom: 2 }, at: 300, dur: 1300 },
            { id: "finger", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "finger", to: { y: "+2" }, at: 2000, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "انگشت از راست به چپ می‌رود.", do: [
            { id: "finger", to: { x: 97 }, dur: 2400, ease: "linear" },
            { id: "book.h1", to: { o: 1 }, at: 150, dur: 250 }, { id: "book.h2", to: { o: 1 }, at: 1250, dur: 250 }, { id: "book.h3", to: { o: 1 }, at: 2250, dur: 250 }
          ] },
          { caption: "خط اول تمام شد. حالا می‌رویم خط پایین.", do: [
            { id: "book.h1", to: { o: 0 }, dur: 400 }, { id: "book.h2", to: { o: 0 }, dur: 400 }, { id: "book.h3", to: { o: 0 }, dur: 400 },
            { id: "finger", path: "M97 35.5Q124 42 139 53.5", at: 500, dur: 1400 },
            { id: "finger", to: { y: "+2" }, at: 2100, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "باز هم از راست به چپ.", do: [
            { id: "finger", to: { x: 89 }, dur: 2600, ease: "linear" },
            { id: "book.h4", to: { o: 1 }, at: 260, dur: 250 }, { id: "book.h5", to: { o: 1 }, at: 1300, dur: 250 }, { id: "book.h6", to: { o: 1 }, at: 2340, dur: 250 }
          ] },
          { caption: "بین کلمه‌ها کمی جای خالی هست. این‌طوری کلمه‌ها را از هم جدا می‌کنیم.", hold: 6000, do: [
            { id: "finger", to: { o: 0 }, dur: 400 },
            { id: "book.h4", to: { o: 0 }, dur: 400 }, { id: "book.h5", to: { o: 0 }, dur: 400 }, { id: "book.h6", to: { o: 0 }, dur: 400 },
            { id: "book.g1", to: { o: 1 }, at: 1200, dur: 300 }, { id: "book.g2", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "book.g3", to: { o: 1 }, at: 2200, dur: 300 }, { id: "book.g4", to: { o: 1 }, at: 2700, dur: 300 },
            { id: "book.w1", to: { s: 1.2 }, at: 3400, dur: 500, yoyo: true, times: 2 }, { id: "book.w2", to: { s: 1.2 }, at: 3700, dur: 500, yoyo: true, times: 2 },
            { id: "book.w3", to: { s: 1.2 }, at: 4000, dur: 500, yoyo: true, times: 2 }, { id: "book.w4", to: { s: 1.2 }, at: 4300, dur: 500, yoyo: true, times: 2 },
            { id: "book.w5", to: { s: 1.2 }, at: 4600, dur: 500, yoyo: true, times: 2 }, { id: "book.w6", to: { s: 1.2 }, at: 4900, dur: 500, yoyo: true, times: 2 }
          ] }
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
  },
  {
    id: "read-sapling-20", subject: "read", level: "sapling", emoji: "🎭", title: "«ء» و «ئـ»",
    steps: [
      { type: "intro", letter: "ء", text: "این «هَمزه» است. «ء» صدایی مثل «اَ» دارد، کوتاه و بُریده؛ مثل آخر «جُزء».", say: "همزه. مثل جزء",
        forms: [["ء", "تنها"], ["ئـ", "روی دندانه"], ["ئ", "روی «ی»"]], example: { pic: "🧩", word: "جُزء" } },
      { type: "intro", letter: "ئـ", text: "همزه روی دندانه هم می‌نشیند: «ئـ». مثل «تِئاتر» و «مَسئَله».", say: "مثل تئاتر",
        forms: [["ئـ", "اول یا وسط"], ["ـئـ", "وسط"]], example: { pic: "🎭", word: "تِئاتر" } },
      { type: "choose", prompt: "کدام «همزه» است؟", say: "کدام همزه است؟", options: ["ع", "ء", "ه"], answer: "ء" },
      { type: "trace", letter: "ء", prompt: "با انگشتت «ء» بنویس" },
      { type: "blend", parts: ["تِ", "ئا", "تر"], word: "تِئاتر", pic: "🎭", say: "تِ ... ئا ... تر ... تئاتر" },
      { type: "blend", parts: ["مَس", "ئَ", "له"], word: "مَسئَله", pic: "🧮", say: "مَس ... ئَ ... له ... مسئله" },
      { type: "choose", show: "تِئاتر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧮", value: "مَسئَله" }, { label: "🎭", value: "تِئاتر" }, { label: "🧩", value: "جُزء" }], answer: "تِئاتر", pic: true },
      { type: "passage", text: "آیدا و کاوه در تَبریز به تِئاتر رَفتَند. روی صَحنه، روباه یک مَسئَله داشت: پَنیرَش را گُم کَرده بود!", question: "آیدا و کاوه کجا رفتند؟",
        options: ["باغ", "تِئاتر", "مَدرِسه"], answer: "تِئاتر" }
    ]
  },
  {
    id: "read-sapling-21", subject: "read", level: "sapling", emoji: "🃏", title: "بازی کلمه‌ها ۳",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["ژاکَت", "🧥"], ["صابون", "🧼"], ["طوطی", "🦜"], ["عَسَل", "🍯"]] },
      { type: "build", pic: "🐌", word: "حَلَزون", parts: ["حَ", "لَ", "زون"], extra: ["هَ"], say: "حلزون" },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ع" }, { label: "غ" }],
        items: [{ label: "عَسَل", basket: "ع" }, { label: "غاز", basket: "غ" }, { label: "عینَک", basket: "ع" },
          { label: "غَذا", basket: "غ" }, { label: "عَروسَک", basket: "ع" }, { label: "غُنچه", basket: "غ" }] },
      { type: "build", pic: "🍽️", word: "غَذا", parts: ["غَ", "ذا"], extra: ["زا"], say: "غذا" },
      { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن.",
        pairs: [["بَچّه", "🧒"], ["اَرّه", "🪚"], ["مُرَبّا", "🍓"], ["لُطفاً", "🙏"]] },
      { type: "build", pic: "🧩", word: "جُزء", parts: ["جُ", "ز", "ء"], extra: ["ع"], say: "جزء" },
      { type: "build", pic: "🦜", word: "طوطی", parts: ["طو", "طی"], extra: ["تو"], say: "طوطی" }
    ]
  },
  {
    id: "read-sapling-22", subject: "read", level: "sapling", emoji: "🔤", title: "شکل‌های یک حرف",
    steps: [
      { type: "pairs", prompt: "هر حرف تنها را با شکل اولش جفت کن.",
        pairs: [["ب", "بـ"], ["س", "سـ"], ["ک", "کـ"], ["ع", "عـ"]] },
      { type: "sort", prompt: "این شکل‌ها اول کلمه می‌آیند، میان کلمه یا آخر کلمه؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "بـ", basket: "start" }, { label: "ـبـ", basket: "mid" }, { label: "ـب", basket: "end" },
          { label: "نـ", basket: "start" }, { label: "ـنـ", basket: "mid" }, { label: "ـن", basket: "end" }] },
      { type: "pairs", prompt: "هر حرف تنها را با شکل وسطش جفت کن.",
        pairs: [["ع", "ـعـ"], ["ه", "ـهـ"], ["ی", "ـیـ"], ["ج", "ـجـ"]] },
      { type: "sort", prompt: "هر کلمه را بخوان. «ب» اول کلمه است، میان یا آخر؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "بَرف", basket: "start" }, { label: "کَبوتَر", basket: "mid" }, { label: "سیب", basket: "end" },
          { label: "باغ", basket: "start" }, { label: "سَبزی", basket: "mid" }, { label: "کِتاب", basket: "end" }] },
      { type: "sort", prompt: "این شکل‌های «ع» و «ه» کجای کلمه می‌آیند؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "عـ", basket: "start" }, { label: "ـعـ", basket: "mid" }, { label: "ـع", basket: "end" },
          { label: "هـ", basket: "start" }, { label: "ـهـ", basket: "mid" }, { label: "ـه", basket: "end" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن. «ع» را در هر کلمه پیدا کن.",
        pairs: [["عَسَل", "🍯"], ["شَمع", "🕯️"], ["ساعَت", "⏰"], ["عینَک", "👓"]] }
    ]
  },
  {
    id: "read-sapling-23", subject: "read", level: "sapling", emoji: "👯", title: "حرف‌های هم‌صدا",
    steps: [
      /* Letters with one sound: one voice, lines to every letter that makes it, all bouncing together; then the
         words they are in, and words a reader has learnt by heart. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین و گوش کن.", bg: "#f6efe2",
        parts: {
          speaker: { art: "🗣️", at: [80, 30], s: 1.1, o: 0 }, ring: { art: "read-sound", at: [80, 18], o: 0 },
          tA: { art: "read-card", look: { text: "ت" }, at: [105, 64], s: 0.3, o: 0 },
          la1: { art: "read-line-to", look: { to: [105, 53] }, o: 0 },
          tB: { art: "read-card", look: { text: "ط" }, at: [55, 64], s: 0.3, o: 0 },
          la2: { art: "read-line-to", look: { to: [55, 53] }, o: 0 },
          s1: { art: "read-card", look: { text: "س" }, at: [120, 64], s: 0.3, o: 0 },
          lb1: { art: "read-line-to", look: { to: [120, 53] }, o: 0 },
          s2: { art: "read-card", look: { text: "ص" }, at: [80, 64], s: 0.3, o: 0 },
          lb2: { art: "read-line-to", look: { to: [80, 53] }, o: 0 },
          s3: { art: "read-card", look: { text: "ث" }, at: [40, 64], s: 0.3, o: 0 },
          lb3: { art: "read-line-to", look: { to: [40, 53] }, o: 0 },
          z1: { art: "read-card", look: { text: "ز" }, at: [128, 64], s: 0.3, o: 0 },
          lc1: { art: "read-line-to", look: { to: [128, 53] }, o: 0 },
          z2: { art: "read-card", look: { text: "ذ" }, at: [96, 64], s: 0.3, o: 0 },
          lc2: { art: "read-line-to", look: { to: [96, 53] }, o: 0 },
          z3: { art: "read-card", look: { text: "ض" }, at: [64, 64], s: 0.3, o: 0 },
          lc3: { art: "read-line-to", look: { to: [64, 53] }, o: 0 },
          z4: { art: "read-card", look: { text: "ظ" }, at: [32, 64], s: 0.3, o: 0 },
          lc4: { art: "read-line-to", look: { to: [32, 53] }, o: 0 },
          ball: { art: "⚽", at: [105, 60], s: 1.1, o: 0 }, parrot: { art: "🦜", at: [55, 60], s: 1.1, o: 0 },
          wT: { art: "read-wordcard", look: { text: "توپ", w: 30, hl: 5.8 }, at: [105, 72], o: 0 }, wTa: { art: "read-wordcard", look: { text: "طوطی", w: 40, hl: 11.3 }, at: [55, 72], o: 0 },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#8a6cc4" }, at: [52, 88], s: 1.4, o: 0 }, book: { art: "📖", at: [63, 76], s: 0.55, o: 0 },
          cloud: { art: "read-thought", o: 0 },
          k1: { art: "read-wordcard", look: { text: "صابون", w: 36, hl: 9.3 }, at: [63, 70], s: 0.3, o: 0 }, k2: { art: "read-wordcard", look: { text: "طوطی", w: 40, hl: 11.3 }, at: [63, 70], s: 0.3, o: 0 }, k3: { art: "read-wordcard", look: { text: "ظَرف", w: 32, hl: 6.9 }, at: [63, 70], s: 0.3, o: 0 }
        },
        scenes: [
          { caption: "این دو حرف یک صدا دارند: «ت» و «ط».", key: 3300, hold: 5000, do: [
            { id: "speaker", to: { o: 1 }, dur: 400 },
            { id: "tA", to: { s: 1, o: 1 }, at: 300, dur: 500, ease: "back" },
            { id: "tB", to: { s: 1, o: 1 }, at: 700, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 1600, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 1620, dur: 900, ease: "out" },
            { id: "la1", to: { o: 1 }, at: 1700, dur: 100 }, { id: "la1", draw: true, at: 1700, dur: 800 },
            { id: "la2", to: { o: 1 }, at: 1700, dur: 100 }, { id: "la2", draw: true, at: 1700, dur: 800 },
            { id: "tA", to: { s: 1.2 }, at: 2600, dur: 1400, yoyo: true, times: 4 },
            { id: "tB", to: { s: 1.2 }, at: 2600, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "«ت» در «توپ» است و «ط» در «طوطی».", hold: 5200, do: [
            { id: "speaker", to: { o: 0 }, dur: 400 }, { id: "la1", to: { o: 0 }, dur: 400 }, { id: "la2", to: { o: 0 }, dur: 400 },
            { id: "tA", to: { y: 24, s: 0.9 }, at: 300, dur: 700 }, { id: "tB", to: { y: 24, s: 0.9 }, at: 300, dur: 700 },
            { id: "ball", to: { o: 1 }, at: 1000, dur: 400 }, { id: "parrot", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "wT", to: { o: 1 }, at: 1300, dur: 400 }, { id: "wTa", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "wT.hl", to: { o: 1 }, at: 2400, dur: 300 }, { id: "tA", to: { s: 1.1 }, at: 2400, dur: 800, yoyo: true, times: 2 },
            { id: "wTa.hl", to: { o: 1 }, at: 3600, dur: 300 }, { id: "tB", to: { s: 1.1 }, at: 3600, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "«س»، «ص» و «ث» هم یک صدا دارند.", key: 3600, hold: 5400, do: [
            { id: "tA", to: { o: 0 }, dur: 400 }, { id: "tB", to: { o: 0 }, dur: 400 }, { id: "ball", to: { o: 0 }, dur: 400 }, { id: "parrot", to: { o: 0 }, dur: 400 }, { id: "wT", to: { o: 0 }, dur: 400 }, { id: "wTa", to: { o: 0 }, dur: 400 },
            { id: "speaker", to: { o: 1 }, at: 300, dur: 400 },
            { id: "s1", to: { s: 1, o: 1 }, at: 600, dur: 500, ease: "back" },
            { id: "s2", to: { s: 1, o: 1 }, at: 900, dur: 500, ease: "back" },
            { id: "s3", to: { s: 1, o: 1 }, at: 1200, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 1900, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 1920, dur: 900, ease: "out" },
            { id: "lb1", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb1", draw: true, at: 2000, dur: 800 },
            { id: "lb2", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb2", draw: true, at: 2000, dur: 800 },
            { id: "lb3", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb3", draw: true, at: 2000, dur: 800 },
            { id: "s1", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 },
            { id: "s2", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 },
            { id: "s3", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "«ز»، «ذ»، «ض» و «ظ» چهار حرف هستند با یک صدا.", key: 3900, hold: 5800, do: [
            { id: "s1", to: { o: 0 }, dur: 400 }, { id: "s2", to: { o: 0 }, dur: 400 }, { id: "s3", to: { o: 0 }, dur: 400 }, { id: "lb1", to: { o: 0 }, dur: 400 }, { id: "lb2", to: { o: 0 }, dur: 400 }, { id: "lb3", to: { o: 0 }, dur: 400 },
            { id: "z1", to: { s: 1, o: 1 }, at: 500, dur: 500, ease: "back" },
            { id: "z2", to: { s: 1, o: 1 }, at: 800, dur: 500, ease: "back" },
            { id: "z3", to: { s: 1, o: 1 }, at: 1100, dur: 500, ease: "back" },
            { id: "z4", to: { s: 1, o: 1 }, at: 1400, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 2200, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 2220, dur: 900, ease: "out" },
            { id: "lc1", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc1", draw: true, at: 2300, dur: 800 },
            { id: "lc2", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc2", draw: true, at: 2300, dur: 800 },
            { id: "lc3", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc3", draw: true, at: 2300, dur: 800 },
            { id: "lc4", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc4", draw: true, at: 2300, dur: 800 },
            { id: "z1", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z2", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z3", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z4", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "از کجا بدانیم کدام را بنویسیم؟ باید کلمه را بشناسیم. هر چه بیشتر بخوانیم، شکل کلمه‌ها بهتر یادمان می‌ماند.", hold: 8000, do: [
            { id: "z1", to: { o: 0 }, dur: 400 }, { id: "z2", to: { o: 0 }, dur: 400 }, { id: "z3", to: { o: 0 }, dur: 400 }, { id: "z4", to: { o: 0 }, dur: 400 }, { id: "lc1", to: { o: 0 }, dur: 400 }, { id: "lc2", to: { o: 0 }, dur: 400 }, { id: "lc3", to: { o: 0 }, dur: 400 }, { id: "lc4", to: { o: 0 }, dur: 400 }, { id: "speaker", to: { o: 0 }, dur: 400 },
            { id: "girl.armF", to: { r: -70 }, dur: 1 }, { id: "girl.armB", to: { r: -60 }, dur: 1 },
            { id: "girl", to: { o: 1 }, at: 300, dur: 500 }, { id: "book", to: { o: 1 }, at: 300, dur: 500 },
            { id: "cloud", to: { o: 1 }, at: 1200, dur: 500 },
            { id: "k1", to: { o: 1 }, at: 1800, dur: 200 }, { id: "k1", path: "M63 70Q80 40 104 25", at: 1800, dur: 1100 }, { id: "k1", to: { s: 0.75 }, at: 1800, dur: 1100 },
            { id: "k2", to: { o: 1 }, at: 3200, dur: 200 }, { id: "k2", path: "M63 70Q76 44 96 36", at: 3200, dur: 1100 }, { id: "k2", to: { s: 0.75 }, at: 3200, dur: 1100 },
            { id: "k3", to: { o: 1 }, at: 4600, dur: 200 }, { id: "k3", path: "M63 70Q90 56 115 44", at: 4600, dur: 1100 }, { id: "k3", to: { s: 0.75 }, at: 4600, dur: 1100 },
            { id: "k1.hl", to: { o: 1 }, at: 6000, dur: 300 }, { id: "k2.hl", to: { o: 1 }, at: 6300, dur: 300 }, { id: "k3.hl", to: { o: 1 }, at: 6600, dur: 300 }
          ] }
        ] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ت" }, { label: "ط" }],
        items: [{ label: "توپ", basket: "ت" }, { label: "طوطی", basket: "ط" }, { label: "تَخته", basket: "ت" }, { label: "طَناب", basket: "ط" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "س" }, { label: "ص" }, { label: "ث" }],
        items: [{ label: "سیب", basket: "س" }, { label: "صابون", basket: "ص" }, { label: "مُثَلَّث", basket: "ث" },
          { label: "سَبَد", basket: "س" }, { label: "صُبح", basket: "ص" }, { label: "ثانیه", basket: "ث" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ز" }, { label: "ذ" }, { label: "ض" }, { label: "ظ" }],
        items: [{ label: "زَنبور", basket: "ز" }, { label: "ذُرَّت", basket: "ذ" }, { label: "حوض", basket: "ض" }, { label: "ظَرف", basket: "ظ" },
          { label: "زَمین", basket: "ز" }, { label: "کاغَذ", basket: "ذ" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ه" }, { label: "ح" }],
        items: [{ label: "ماه", basket: "ه" }, { label: "حَلَزون", basket: "ح" }, { label: "کوه", basket: "ه" }, { label: "صُبح", basket: "ح" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ق" }, { label: "غ" }],
        items: [{ label: "قاشُق", basket: "ق" }, { label: "غاز", basket: "غ" }, { label: "قایِق", basket: "ق" }, { label: "باغ", basket: "غ" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ا" }, { label: "ع" }],
        items: [{ label: "اَسب", basket: "ا" }, { label: "عَسَل", basket: "ع" }, { label: "اَبر", basket: "ا" }, { label: "عینَک", basket: "ع" }] }
    ]
  },
  {
    id: "read-sapling-24", subject: "read", level: "sapling", emoji: "📝", title: "املا",
    steps: [
      { type: "build", hidden: true, pic: "🍯", word: "عَسَل", parts: ["عَ", "سَ", "ل"], extra: ["اَ", "صَ"], say: "عسل" },
      { type: "build", hidden: true, pic: "🦜", word: "طوطی", parts: ["ط", "و", "ط", "ی"], extra: ["ت"], say: "طوطی" },
      { type: "build", hidden: true, pic: "🧼", word: "صابون", parts: ["ص", "ا", "ب", "و", "ن"], extra: ["س"], say: "صابون" },
      { type: "build", hidden: true, pic: "🍽️", word: "غَذا", parts: ["غَ", "ذ", "ا"], extra: ["ز", "قَ"], say: "غذا" },
      { type: "build", hidden: true, pic: "🐌", word: "حَلَزون", parts: ["حَ", "لَ", "ز", "و", "ن"], extra: ["هَ"], say: "حلزون" },
      { type: "build", hidden: true, pic: "🌅", word: "صُبح", parts: ["صُ", "ب", "ح"], extra: ["سُ", "ه"], say: "صبح" },
      { type: "build", hidden: true, pic: "🐸", word: "قورباغه", parts: ["ق", "و", "ر", "ب", "ا", "غ", "ه"], extra: ["ح"], say: "قورباغه" }
    ]
  },
  {
    id: "read-sapling-25", subject: "read", level: "sapling", emoji: "💬", title: "جمله بساز",
    steps: [
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["نَرگِس", "در", "یَزد", "زِندگی", "می‌کُنَد."] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["هومَن", "کِنار", "دَریا", "بازی", "می‌کُنَد."] },
      { type: "choose", show: "اِمروز آفتابی است", prompt: "این جمله خبر می‌دهد. آخرش چه نشانه‌ای می‌گذاریم؟",
        say: "این جمله خبر می‌دهد. آخرش چه نشانه‌ای می‌گذاریم؟", options: [".", "؟"], answer: "." },
      { type: "choose", show: "تو کُجا زِندگی می‌کُنی", prompt: "این جمله می‌پرسد. آخرش چه نشانه‌ای می‌گذاریم؟",
        say: "این جمله می‌پرسد. آخرش چه نشانه‌ای می‌گذاریم؟", options: [".", "؟"], answer: "؟" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا پرسش درست شود.", items: ["آیا", "تو", "اَنار", "دوست", "داری؟"] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["بَهار", "و", "آرَش", "با", "هَم", "نَقّاشی", "می‌کِشَند."] },
      { type: "choose", prompt: "کدام جمله درست است؟", say: "کدام جمله درست است؟",
        options: ["سیب مَن دوست دارَم.", "مَن سیب دوست دارَم.", "دارَم سیب مَن دوست."], answer: "مَن سیب دوست دارَم." }
    ]
  },
  {
    id: "read-sapling-26", subject: "read", level: "sapling", emoji: "✍️", title: "کلمه‌ها را به هم بنویس",
    steps: [
      { type: "intro", letter: "بـ", text: "حرف‌ها در کلمه به هم می‌چسبند و شکلشان کمی کوتاه می‌شود. این «ب» اول کلمه است.", say: "حرف‌ها به هم می‌چسبند. مثل بابا",
        forms: [["ب", "تنها"], ["بـ", "اول"], ["ـبـ", "وسط"], ["ـب", "آخر"]], example: { pic: "👨", word: "بابا" } },
      { type: "trace", letter: "ـبـ", prompt: "با انگشتت «ب» وسط کلمه را بنویس" },
      { type: "trace", letter: "بابا", say: "بابا", prompt: "با انگشتت «بابا» را بنویس. هر تکه را یک‌جا بنویس، بعد نقطه‌اش را بگذار." },
      { type: "trace", letter: "نان", say: "نان", prompt: "با انگشتت «نان» را بنویس" },
      { type: "trace", letter: "لب", say: "لب", prompt: "با انگشتت «لب» را بنویس" },
      { type: "trace", letter: "سیب", say: "سیب", prompt: "با انگشتت «سیب» را بنویس. همه کلمه یک تکه است؛ نقطه‌ها را آخر بگذار." },
      { type: "trace", letter: "دست", say: "دست", prompt: "با انگشتت «دست» را بنویس. «د» به حرف بعدی نمی‌چسبد." }
    ]
  },
  {
    id: "read-sapling-27", subject: "read", level: "sapling", emoji: "📚", title: "قصه‌های کوتاه",
    steps: [
      /* Before each short text, a picture story that sets the scene (the text itself is read next, in a passage). */
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.",
        parts: {
          bg: { art: "read-bg-garden" }, tea: { art: "read-tea-rows" },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#3d2c22" }, at: [64, 86], s: 1.3 },
          umb: { art: "read-umbrella-green", under: "girl", at: [7.5, -15.9], s: 0.55, r: -20 },
          boy: { art: "read-kid", look: { hair: "short", top: "#f59e0b" }, at: [190, 86], s: 1.2, flip: true },
          grey: { art: "read-grey" }, cloud: { art: "read-raincloud" }
        },
        scenes: [
          { caption: "یک روز بارانی در رَشت.", key: 2500, do: [
            { id: "girl.armF", to: { r: -100 }, dur: 1 }, { id: "umb.open", to: { o: 0 }, dur: 1 }, { id: "umb.shut", to: { o: 1 }, dur: 1 },
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 60, dur: 3800, life: 1000 }
          ] },
          { caption: "گلی چتر دارد.", key: 2200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 50, dur: 3200, life: 1000 },
            { id: "umb.open", to: { sx: 0.15, o: 1 }, at: 300, dur: 1 }, { id: "umb.open", to: { sx: 1 }, at: 320, dur: 900, ease: "back" },
            { id: "umb.shut", to: { o: 0 }, at: 300, dur: 300 }
          ] },
          { caption: "برادرش هم می‌آید.", key: 3200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 60, dur: 3800, life: 1000 },
            { id: "boy", walk: [84, 86], dur: 2800 }
          ] }
        ] },
      { type: "passage", text: "گُلی در رَشت زِندگی می‌کُنَد. دیروز باران آمَد. گُلی چَتر سَبز و چَکمه قِرمِز داشت. او با بَرادَرَش، سینا، به باغ چای رَفت.",
        question: "چکمه گلی چه رنگی بود؟", options: ["سَبز", "قِرمِز", "آبی"], answer: "قِرمِز" },
      { type: "passage", text: "گُلی در رَشت زِندگی می‌کُنَد. دیروز باران آمَد. گُلی چَتر سَبز و چَکمه قِرمِز داشت. او با بَرادَرَش، سینا، به باغ چای رَفت.",
        question: "گلی با چه کسی به باغ چای رفت؟", options: ["مادَر", "سینا", "بابا"], answer: "سینا" },
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.",
        parts: {
          sky: { art: "read-dawn-sky" }, sun: { art: "read-sun", at: [124, 54] }, sea: { art: "read-sea" },
          boat: { art: "read-boat-back", at: [-30, 66] },
          grandpa: { art: "👴", look: { cane: false }, under: "boat", at: [-9, -6], s: 0.8 },
          boy: { art: "read-kid", look: { hair: "short", top: "#e5483f" }, under: "boat", at: [9, -6], s: 0.75 },
          hull: { art: "read-boat-hull", under: "boat" },
          f1: { art: "🐟", at: [176, 72], s: 0.45 }, f2: { art: "🐟", at: [184, 80], s: 0.45 }, f3: { art: "🐟", at: [192, 70], s: 0.45 },
          f4: { art: "🐟", at: [200, 84], s: 0.45 }, f5: { art: "🐟", at: [210, 76], s: 0.45 }, f6: { art: "🐟", at: [220, 82], s: 0.45 }
        },
        scenes: [
          { caption: "صبح زود در بوشهر.", key: 1500, do: [
            { id: "sun", to: { y: 22 }, dur: 3600, ease: "out" }, { id: "sky.day", to: { o: 1 }, at: 1400, dur: 3000 }
          ] },
          { caption: "آرش و پدربزرگ سوار قایق هستند.", do: [
            { id: "boat", to: { x: 64 }, dur: 2800, ease: "out" },
            { id: "boat", to: { r: 3 }, dur: 3000, yoyo: true, times: 6 }
          ] },
          { caption: "ماهی‌ها می‌آیند!", key: 2900, hold: 4200, do: [
            { id: "boat", to: { r: 3 }, dur: 4000, yoyo: true, times: 8 },
            { id: "f1", to: { x: 92 }, dur: 2400, ease: "out" }, { id: "f2", to: { x: 104 }, at: 200, dur: 2400, ease: "out" },
            { id: "f3", to: { x: 112 }, at: 400, dur: 2000, ease: "out" }, { id: "f4", to: { x: 120 }, at: 500, dur: 2400, ease: "out" },
            { id: "f5", to: { x: 130 }, at: 700, dur: 2400, ease: "out" }, { id: "f6", to: { x: 142 }, at: 900, dur: 2400, ease: "out" },
            { id: "f3", path: "M112 70Q104 44 96 66", at: 2400, dur: 1000 }, { id: "f3", to: { r: -40 }, at: 2400, dur: 1000, yoyo: true, times: 2 },
            { id: "boy.armF", to: { r: -120 }, at: 1600, dur: 500 }
          ] }
        ] },
      { type: "passage", text: "آرَش و پِدَربُزُرگ در بوشِهر بودَند. صُبح زود با قایِق به دَریا رَفتَند. پِدَربُزُرگ تور اَنداخت. آرَش سه ماهی شِمُرد.",
        question: "آرش چند ماهی شمرد؟", options: ["دو", "سه", "چَهار"], answer: "سه" },
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.", bg: "#dfe8f0",
        parts: {
          ground: { art: "read-ground" }, cloud: { art: "read-raincloud" }, house: { art: "read-house-snow" }, cover: { art: "read-snowcover", at: [0, 91], sy: 0.05 },
          bahar: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#5b9bd5", hairColor: "#6b3f26" }, at: [32, 62], s: 0.8, o: 0 },
          zhila: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#5a9a45", hairColor: "#3d2c22", skin: "#c98f63" }, at: [186, 86], s: 1.2, flip: true },
          scarf: { art: "read-scarf", under: "zhila" }, ring: { art: "read-ring-small", at: [99.6, 66.6], o: 0 }
        },
        scenes: [
          { caption: "در سنندج برف آمد.", key: 2600, do: [
            { id: "house.snow", to: { o: 0 }, dur: 1 },
            { emit: "bubble", where: [80, 4], spread: [160, 8], rise: 70, n: 80, dur: 4200, life: 1600 },
            { id: "cover", to: { sy: 1 }, at: 400, dur: 3600 }, { id: "house.snow", to: { o: 1 }, at: 400, dur: 3200 }
          ] },
          { caption: "بهار و ژیلا بیرون آمدند.", do: [
            { id: "bahar", to: { o: 1 }, dur: 300 }, { id: "bahar", to: { x: 58, y: 86, s: 1.2 }, at: 300, dur: 2200, ease: "linear" },
            { id: "bahar.legF", to: { r: 24 }, at: 300, dur: 2200, yoyo: true, times: 8 }, { id: "bahar.legB", to: { r: -24 }, at: 300, dur: 2200, yoyo: true, times: 8 },
            { id: "zhila", walk: [100, 86], dur: 2600 }
          ] },
          { caption: "ژیلا یک چیز گرم دارد.", key: 2200, do: [
            { id: "zhila.armF", to: { r: -130 }, dur: 600 },
            { id: "scarf.ends", to: { r: 25 }, at: 600, dur: 2400, yoyo: true, times: 6 },
            { id: "ring", to: { o: 1 }, at: 900, dur: 100 }, { id: "ring", draw: true, at: 900, dur: 900 },
            { id: "ring", to: { s: 1.15 }, at: 1900, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "passage", text: "در سَنَندَج بَرف آمَد. بَهار و دوستَش، ژیلا، یک آدَم‌بَرفی ساختَند. ژیلا شال‌گَردَنَش را به آدَم‌بَرفی داد. حالا آدَم‌بَرفی سَرما نِمی‌خورَد!",
        question: "ژیلا چه چیزی به آدم‌برفی داد؟",
        options: [{ label: "🎩", value: "کُلاه" }, { label: "🧣", value: "شال‌گَردَن" }, { label: "🥕", value: "هَویج" }], answer: "شال‌گَردَن", pic: true }
    ]
  },
  {
    id: "read-sapling-28", subject: "read", level: "sapling", emoji: "🗣️", title: "بلند بخوان",
    steps: [
      { type: "readaloud", pic: "⚽", text: "سارا و نیما در حَیاط هَستَند. سارا توپ دارد. توپ را به نیما می‌دَهَد. نیما توپ را می‌گیرَد." },
      { type: "readaloud", pic: "💧", text: "ماهان در زاهِدان زِندگی می‌کُنَد. اِمروز گَرم است. ماهان آب خُنَک می‌نوشَد و زیر سایه دِرَخت می‌نِشینَد." },
      { type: "readaloud", pic: "🍎", text: "تینا با مادَرَش به بازار رَفت. آن‌ها سیب و اَنار و نان سَنگَک خَریدَند. نان سَنگَک گَرم بود." },
      { type: "readaloud", pic: "🌸", text: "سامان در شیراز یک باغچه کوچَک دارد. او هَر روز به گُل‌ها آب می‌دَهَد. حالا گُل‌ها باز شُده‌اَند." },
      { type: "readaloud", pic: "📖", text: "زَهرا یک کِتاب قِصّه دارد. او قِصّه خَرگوش را بَرای پِدَرَش بُلَند می‌گوید. پِدَر می‌خَندَد و می‌گوید: «آفَرین، با دِقَّت گُفتی!»" }
    ]
  }
);
