/* باغچه — سلامت و ایمنی (health, body and safety): hygiene, food and water, sleep and play, the body and
   feelings, body safety, and staying safe at home, on the street, when lost, in an emergency and in an earthquake.
   Health facts follow WHO and UNICEF guidance; body safety follows the Council of Europe's "Underwear Rule".
   Every lesson ends with a note for parents (step type forparents, js/steps/health.js).
   Three lessons are for every garden (level: null): body safety, the earthquake drill and the emergency numbers.
   NEEDS REVIEW by a health professional and a child-protection specialist before launch.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;
// The scenes move people with B.hpose and friends from js/art/rig-health.js; tools that read only the lessons
// (tools/check-plan.js) get empty stand-ins.
["hpose", "hunpose", "hwalk", "hloops"].forEach(function (k) { if (!B[k]) B[k] = function () { return []; }; });

B.SUBJECTS.push({ id: "health", name: "سلامت و ایمنی", emoji: "🩺", leveled: true });

B.LESSONS.push(
  // ---------------- Health: Seed ----------------
  {
    id: "health-seed-1", subject: "health", level: "seed", emoji: "🧼", title: "دست‌هایم را می‌شویم",
    steps: [
      /* Handwashing as WHO shows it: wet, soap, rub the palms, the backs, between the fingers (about 20 seconds),
         rinse, dry. The child rubs the hands too (wait: rub). Drawings: js/art/rig.js. */
      { type: "scene", prompt: "ببین دست‌ها را چطور می‌شوییم", bg: "#dff1f7",
        parts: {
          room: { art: "bathroom" }, soap: { art: "soap", at: [36, 66] },
          water: { art: "water", o: 0 }, tap: { art: "tap" },
          handL: { art: "hand", at: [44, 88], r: -14, s: 1.35, flip: true }, germL: { art: "germs-hand", under: "handL" }, foamL: { art: "foam-hand", under: "handL", o: 0, s: 0.5 },
          handR: { art: "hand", at: [116, 88], r: 14, s: 1.35 }, germR: { art: "germs-hand", under: "handR" }, foamR: { art: "foam-hand", under: "handR", o: 0, s: 0.5 },
          laced: { art: "hands-laced", at: [80, 70], s: 1.35, o: 0 }, counter: { art: "counter", at: [26, 38], o: 0 },
          towel: { art: "towel", at: [136, 26] }
        },
        scenes: [
          { caption: "شیر آب را باز می‌کنیم و دست‌ها را زیر آب خیس می‌کنیم.", do: [
            { id: "tap.handle", to: { r: -55 }, dur: 600 },
            { id: "water", to: { o: 1 }, at: 500, dur: 300 },
            { id: "handL", to: { x: 66, y: 70, r: 14 }, at: 1100, dur: 1000 },
            { id: "handR", to: { x: 94, y: 70, r: -14 }, at: 1100, dur: 1000 },
            { emit: "drop", where: [80, 50], spread: [18, 14], rise: 10, n: 12, at: 2100, dur: 2000, life: 900 }
          ] },
          { caption: "شیر را می‌بندیم تا آب هدر نرود، و به دست‌ها صابون می‌زنیم.", key: 2600, do: [
            { id: "tap.handle", to: { r: 0 }, dur: 500 }, { id: "water", to: { o: 0 }, at: 300, dur: 300 },
            { id: "soap", path: "M36 66Q52 36 80 52", at: 900, dur: 900 },
            { id: "handL", to: { x: "+2.5" }, at: 1900, dur: 1800, yoyo: true, times: 6 },
            { id: "handR", to: { x: "-2.5" }, at: 1900, dur: 1800, yoyo: true, times: 6 },
            { emit: "bubble", where: [80, 48], spread: [16, 12], n: 8, at: 1900, dur: 1800 },
            { id: "foamL", to: { o: 0.3, s: 0.6 }, at: 2200, dur: 1400 }, { id: "foamR", to: { o: 0.3, s: 0.6 }, at: 2200, dur: 1400 },
            { id: "soap", path: "M80 52Q56 34 36 66", at: 3900, dur: 900 }
          ] },
          { caption: "کف دست‌ها را به هم می‌مالیم تا کف کنند.", key: 2200, hold: 3600, do: [
            { id: "handL", to: { x: 75, r: 6 }, dur: 500 }, { id: "handR", to: { x: 85, r: -6 }, dur: 500 },
            { id: "handL", to: { x: "+3", y: "-2" }, at: 600, dur: 2800, yoyo: true, times: 8 },
            { id: "handR", to: { x: "-3", y: "+2" }, at: 600, dur: 2800, yoyo: true, times: 8 },
            { id: "foamL", to: { o: 0.6, s: 0.8 }, at: 300, dur: 2400 }, { id: "foamR", to: { o: 0.6, s: 0.8 }, at: 300, dur: 2400 },
            { id: "germL", to: { o: 0.7 }, at: 300, dur: 2400 }, { id: "germR", to: { o: 0.7 }, at: 300, dur: 2400 },
            { emit: "bubble", where: [80, 46], spread: [18, 14], n: 14, dur: 2800 }
          ],
            wait: { rub: true, n: 8, hint: "حالا نوبت توست: با انگشت یا ماوس روی دست‌ها چپ و راست بکش!",
              each: [
                { id: "handL", to: { x: "+2.5" }, dur: 320, yoyo: true, times: 2 }, { id: "handR", to: { x: "-2.5" }, dur: 320, yoyo: true, times: 2 },
                { id: "foamL", to: { o: "+0.06", s: "+0.03" }, dur: 300 }, { id: "foamR", to: { o: "+0.06", s: "+0.03" }, dur: 300 },
                { id: "germL", to: { o: "-0.05" }, dur: 300 }, { id: "germR", to: { o: "-0.05" }, dur: 300 },
                { emit: "bubble", where: [80, 46], spread: [18, 14], n: 3, dur: 250 }
              ] } },
          { caption: "پشت دست‌ها را هم می‌مالیم.", key: 2000, do: [
            { id: "handR.nails", to: { o: 1 }, dur: 300 },
            { id: "handR", to: { x: 78, y: 66, r: -24 }, at: 300, dur: 700 },
            { id: "handR", to: { x: "-3" }, at: 1100, dur: 2400, yoyo: true, times: 8 },
            { emit: "bubble", where: [78, 46], spread: [14, 12], n: 8, at: 1100, dur: 2400 },
            { id: "handR", to: { x: 85, y: 70, r: -6 }, at: 3700, dur: 700 }, { id: "handR.nails", to: { o: 0 }, at: 4300, dur: 300 }
          ] },
          { caption: "لای انگشت‌ها را هم می‌شوییم. آرام تا بیست می‌شماریم.", key: 4500, hold: 10500, do: [
            { id: "handL", to: { o: 0 }, dur: 400 }, { id: "handR", to: { o: 0 }, dur: 400 },
            { id: "laced", to: { o: 1 }, dur: 400 },
            { id: "laced", to: { y: "-3" }, at: 500, dur: 9000, yoyo: true, times: 24 },
            { id: "laced", to: { r: 5 }, at: 500, dur: 9000, yoyo: true, times: 12 },
            { emit: "bubble", where: [80, 50], spread: [20, 14], n: 18, at: 500, dur: 9000 },
            { id: "counter", to: { o: 1 }, at: 300, dur: 300 }, { count: "counter", from: 1, to: 20, at: 500, dur: 9000 },
            { id: "laced", to: { o: 0 }, at: 9600, dur: 400 }, { id: "counter", to: { o: 0 }, at: 9800, dur: 400 },
            { id: "handL", to: { o: 1 }, at: 9600, dur: 400 }, { id: "handR", to: { o: 1 }, at: 9600, dur: 400 }
          ] },
          { caption: "شیر را باز می‌کنیم و دست‌ها را زیر آب می‌گیریم تا کف‌ها و میکروب‌ها بروند.", key: 2000, do: [
            { id: "tap.handle", to: { r: -55 }, dur: 500 }, { id: "water", to: { o: 1 }, at: 400, dur: 300 },
            { id: "handL", to: { x: 67, r: 14 }, at: 400, dur: 500 }, { id: "handR", to: { x: 93, r: -14 }, at: 400, dur: 500 },
            { id: "handL", to: { y: "-4" }, at: 1000, dur: 2800, yoyo: true, times: 6 },
            { id: "handR", to: { y: "-4" }, at: 1000, dur: 2800, yoyo: true, times: 6 },
            { id: "foamL", to: { o: 0 }, at: 900, dur: 2600 }, { id: "foamR", to: { o: 0 }, at: 900, dur: 2600 },
            { id: "germL", to: { o: 0 }, at: 900, dur: 2600 }, { id: "germR", to: { o: 0 }, at: 900, dur: 2600 },
            { emit: "bubble", where: [80, 56], spread: [18, 6], rise: 12, n: 14, at: 900, dur: 2600, life: 1000 }
          ] },
          { caption: "شیر آب را می‌بندیم و دست‌ها را با حوله تمیز خشک می‌کنیم.", key: 2600, do: [
            { id: "tap.handle", to: { r: 0 }, dur: 500 }, { id: "water", to: { o: 0 }, at: 300, dur: 300 },
            { id: "towel", path: "M136 26Q112 24 86 40", at: 800, dur: 900 }, { id: "towel", to: { s: 1.5 }, at: 800, dur: 900 },
            { id: "towel", to: { x: "-8" }, at: 1800, dur: 2200, yoyo: true, times: 6 },
            { id: "towel", path: "M86 40Q112 24 136 26", at: 4100, dur: 900 }, { id: "towel", to: { s: 1 }, at: 4100, dur: 900 }
          ] },
          { caption: "دست‌هایمان تمیز شد!", do: [
            { emit: "spark", where: [80, 46], spread: [26, 22], n: 10, dur: 1600, life: 1600 },
            { id: "handL", to: { r: -10 }, at: 400, dur: 1600, yoyo: true, times: 4 },
            { id: "handR", to: { r: 10 }, at: 400, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "order", prompt: "کارهای شستن دست را به ترتیب بچین", numbered: true,
        items: [{ pic: "💧", label: "خیس کردن" }, { pic: "🧼", label: "صابون زدن" }, { pic: "🫧", label: "مالیدن" }, { pic: "🚰", label: "آب کشیدن" }] },
      { type: "choose", prompt: "پیش از غذا خوردن چه کار می‌کنیم؟", say: "پیش از غذا خوردن چه کار می‌کنیم؟", stack: true,
        options: ["🧼 دست‌هایمان را می‌شوییم", "😴 می‌خوابیم", "🎈 بادکنک باد می‌کنیم"], answer: "🧼 دست‌هایمان را می‌شوییم" },
      { type: "doit", pic: "🚰", text: "حالا با یک بزرگ‌تر برو و دست‌هایت را با آب و صابون بشوی. آرام تا بیست بشمار." },
      { type: "forparents",
        tips: [
          "دست‌ها را این وقت‌ها با آب و صابون بشویید: پیش از غذا خوردن و غذا درست کردن، بعد از دستشویی، بعد از بازی بیرون، بعد از دست زدن به حیوان، و بعد از فین کردن، عطسه یا سرفه.",
          "شستن دست دست‌کم ۲۰ ثانیه طول بکشد. با هم آرام تا ۲۰ بشمارید یا یک شعر کوتاه بخوانید.",
          "آب گرم لازم نیست؛ آب سرد هم با صابون خوب تمیز می‌کند. اگر آب لوله‌کشی نیست، یک نفر از پارچ آب بریزد و دیگری دست بشوید.",
          "کودک بیشتر از دیدن شما یاد می‌گیرد تا از شنیدن. کنار هم دست بشویید."
        ] }
    ]
  },
  {
    id: "health-seed-2", subject: "health", level: "seed", emoji: "🪥", title: "مسواک می‌زنم",
    steps: [
      /* Brushing as dentists show it: morning and night, a pea of toothpaste, small gentle circles on the front and
         the back of the teeth, back and forth on top, then spit. The child brushes the lower teeth (wait: rub).
         Drawings: js/art/rig.js (bathroom) and js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چطور مسواک می‌زنیم", bg: "#dff1f7",
        parts: {
          room: { art: "bathroom" }, win: { art: "h-window", at: [24, 22] },
          kid: { art: "h-girl-front", at: [80, 86], s: 1.8 }, counter: { art: "h-counter" },
          panel: { art: "h-panel", o: 0 },
          brush: { art: "h-bigbrush", at: [62, 56], o: 0 }, paste: { art: "h-paste", at: [62, 51], s: 0.1, o: 0 },
          tube: { art: "h-tube", at: [112, 34], r: -25, o: 0 }, pea: { art: "h-pea", at: [40, 46], o: 0 },
          mouth: { art: "h-mouth", o: 0 }, brushF: { art: "h-brushF", at: [52, 36], o: 0 },
          arch: { art: "h-arch", o: 0 }, brushT: { art: "h-brushT", at: [56, 76], o: 0 }
        },
        scenes: [
          { caption: "صبح مسواک می‌زنیم.", key: 3400, do: [
            { id: "win.sun", to: { y: 6 }, dur: 1 }, { id: "win.sun", to: { y: 0 }, at: 100, dur: 1400, ease: "out" }
          ].concat(B.hpose("kid", "h-girl-front", "brush", 1200, 700), [
            { id: "kid.brush", to: { o: 1 }, at: 1200, dur: 200 },
            { id: "kid.foreR", to: { r: "+9" }, at: 2000, dur: 2600, yoyo: true, times: 12 },
            { emit: "bubble", where: [82, 41], spread: [6, 3], rise: -4, n: 8, at: 2000, dur: 2600, life: 900 }
          ]) },
          { caption: "شب، پیش از خواب هم مسواک می‌زنیم.", key: 2600, do: [
            { id: "win.night", to: { o: 1 }, dur: 1200 }, { id: "win.sun", to: { y: 8, o: 0 }, dur: 1200 },
            { id: "win.moon", to: { o: 1 }, at: 800, dur: 800 }, { id: "win.stars", to: { o: 1 }, at: 1100, dur: 800 },
            { id: "kid.foreR", to: { r: "+9" }, at: 1400, dur: 2600, yoyo: true, times: 12 },
            { emit: "bubble", where: [82, 41], spread: [6, 3], rise: -4, n: 8, at: 1400, dur: 2600, life: 900 }
          ] },
          { caption: "کمی خمیردندان، به اندازه یک نخود، کافی است.", hold: 5600, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "brush", to: { o: 1 }, at: 300, dur: 400 },
            { id: "tube", to: { o: 1 }, at: 500, dur: 400 }, { id: "tube", path: "M112 34Q96 30 70 44", at: 900, dur: 900 },
            { id: "tube.body", to: { sy: 0.65 }, at: 1900, dur: 900, ease: "out" },
            { id: "paste", to: { o: 1, s: 1 }, at: 1900, dur: 900, ease: "out" },
            { id: "tube", path: "M70 44Q96 30 120 30", at: 2900, dur: 800 }, { id: "tube", to: { o: 0 }, at: 3300, dur: 400 },
            { id: "pea", to: { o: 1 }, at: 3600, dur: 400 }, { id: "pea", path: "M40 46Q44 34 50 44", at: 3800, dur: 700 },
            { id: "paste", to: { s: 1.2 }, at: 4600, dur: 400, yoyo: true, times: 2 }, { id: "pea", to: { s: 1.2 }, at: 4600, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "جلوی دندان‌ها را آرام و دایره‌ای مسواک می‌زنیم.", key: 3000, do: [
            { id: "brush", to: { o: 0 }, dur: 400 }, { id: "paste", to: { o: 0 }, dur: 400 }, { id: "pea", to: { o: 0 }, dur: 400 },
            { id: "mouth", to: { o: 1 }, at: 300, dur: 500 }, { id: "brushF", to: { o: 1 }, at: 700, dur: 300 },
            { id: "mouth.dirtUp", to: { o: 0 }, at: 1100, dur: 4200 },
            { emit: "bubble", where: [80, 36], spread: [56, 6], rise: -3, n: 14, at: 1100, dur: 4200, life: 1000 },
            { id: "brushF", path: "M108 36L60 57", at: 5500, dur: 700 }
          ].concat(B.hloops("brushF", [52, 36], [108, 36], 8, 2.2, 1100, 4200)),
            wait: { rub: true, n: 8, hint: "حالا نوبت توست: دندان‌های پایین را مسواک بزن! روی دندان‌ها چپ و راست بکش.",
              each: [
                { id: "brushF", to: { x: "+5" }, dur: 300 }, { id: "brushF", to: { y: "-2" }, dur: 300, yoyo: true, times: 2 },
                { id: "mouth.dirtLo", to: { o: "-0.13" }, dur: 300 },
                { emit: "bubble", from: "brushF", where: [0, 0], spread: [8, 4], rise: -3, n: 3, dur: 250, life: 900 }
              ] } },
          { caption: "حالا دندان‌های پایین را از بالا می‌بینیم. پشت دندان‌ها را هم دایره‌ای مسواک می‌زنیم.", key: 4200, hold: 8600, do: [
            { id: "mouth", to: { o: 0 }, dur: 500 }, { id: "brushF", to: { o: 0 }, dur: 400 },
            { id: "arch", to: { o: 1 }, at: 400, dur: 600 }, { id: "brushT", to: { o: 1 }, at: 1000, dur: 300 },
            { id: "brushT", path: "M57 44L62 34", at: 3200, dur: 300 }, { id: "brushT", path: "M98 34L103 44", at: 5600, dur: 300 },
            { id: "arch.dirtIn", to: { o: 0 }, at: 1300, dur: 6600 },
            { emit: "bubble", where: [80, 50], spread: [44, 40], rise: -3, n: 14, at: 1300, dur: 6600, life: 1000 }
          ].concat(B.hloops("brushT", [56, 76], [57, 44], 4, 1.8, 1300, 1900), B.hloops("brushT", [62, 34], [98, 34], 5, 1.8, 3500, 2100),
            B.hloops("brushT", [103, 44], [104, 76], 4, 1.8, 5900, 1900)) },
          { caption: "روی دندان‌ها را هم عقب و جلو مسواک می‌زنیم.", key: 2400, do: [
            { id: "brushT", path: "M104 76Q80 90 47 66", dur: 800 },
            { id: "brushT", to: { y: "-12" }, at: 900, dur: 2000, yoyo: true, times: 8 },
            { id: "brushT", path: "M47 66Q80 84 113 66", at: 3000, dur: 800 },
            { id: "brushT", to: { y: "-12" }, at: 3900, dur: 2000, yoyo: true, times: 8 },
            { id: "arch.dirtTop", to: { o: 0 }, at: 900, dur: 5000 },
            { emit: "bubble", where: [80, 62], spread: [70, 16], rise: -3, n: 12, at: 900, dur: 5000, life: 1000 }
          ] },
          { caption: "خمیردندان را تف می‌کنیم.", key: 2200, do: [
            { id: "arch", to: { o: 0 }, dur: 500 }, { id: "brushT", to: { o: 0 }, dur: 400 }, { id: "panel", to: { o: 0 }, at: 300, dur: 500 },
            { id: "kid.brush", to: { o: 0 }, dur: 1 }, { id: "kid", to: { y: 89 }, at: 900, dur: 500 },
            { id: "kid.open", to: { o: 1 }, at: 1500, dur: 200 }, { id: "kid.mouth", to: { o: 0 }, at: 1500, dur: 200 },
            { emit: "bubble", where: [80, 45], spread: [3, 2], rise: 22, n: 7, at: 1600, dur: 900, life: 800 },
            { id: "kid.open", to: { o: 0 }, at: 2800, dur: 200 }, { id: "kid.mouth", to: { o: 1 }, at: 2800, dur: 200 },
            { id: "kid", to: { y: 86 }, at: 3100, dur: 500 }
          ].concat(B.hunpose("kid", "h-girl-front", 0, 700)) },
          { caption: "دندان‌هایمان تمیز شد!", key: 900, do: [
            { id: "kid.mouth", to: { o: 0 }, dur: 200 }, { id: "kid.grin", to: { o: 1 }, dur: 200 },
            { emit: "spark", where: [80, 40], spread: [18, 8], n: 8, at: 200, dur: 1400, life: 1400 },
            { id: "kid.head", to: { r: 6 }, at: 400, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "choose", prompt: "روزی چند بار مسواک می‌زنیم؟", show: "☀️ 🌙",
        options: [{ label: "یک بار", value: 1 }, { label: "دو بار", value: 2 }, { label: "پنج بار", value: 5 }], answer: 2 },
      { type: "order", prompt: "شب، اول کدام؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "🍲", label: "شام" }, { pic: "🪥", label: "مسواک" }, { pic: "😴", label: "خواب" }] },
      { type: "pairs", prompt: "هر چیز را با جایی از بدن جفت کن که به کارش می‌آید",
        pairs: [[{ pic: "🪥", say: "مسواک" }, { pic: "🦷", say: "دندان" }], [{ pic: "🧼", say: "صابون" }, { pic: "👐", say: "دست" }], [{ pic: "👟", say: "کفش" }, { pic: "🦶", say: "پا" }]] },
      { type: "forparents",
        tips: [
          "روزی دو بار مسواک بزنید: صبح و آخرین کار پیش از خواب. بعد از مسواک شب، چیزی جز آب نخورید.",
          "از خمیردندان فلوئوردار استفاده کنید. برای کودکی که هنوز تف کردن بلد نیست، به اندازه یک دانه برنج؛ بعد از آن به اندازه یک نخود.",
          "بعد از مسواک، خمیردندان را تف کنید و دهان را زیاد آب نکشید تا فلوئور روی دندان‌ها بماند.",
          "تا وقتی کودک خودش خوب مسواک نمی‌زند، کمکش کنید یا بعد از او دوباره مسواک بزنید. خوراکی و نوشیدنی شیرین را به وقت غذا محدود کنید، نه میان وعده‌ها.",
          "اگر می‌توانید، سالی یک یا دو بار به دندان‌پزشک یا مرکز بهداشت محل بروید."
        ] }
    ]
  },
  {
    id: "health-seed-3", subject: "health", level: "seed", emoji: "👂", title: "بدن من",
    steps: [
      /* Each part of the body doing its job: the eyes look at the rainbow, the sound of the bell reaches the ear, the
         smell of the rose reaches the nose, the mouth bites the apple and talks, the hands catch a ball, the legs walk
         and run. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "بدن ما چه کارهایی می‌کند؟", bg: "#e8f4dc",
        parts: {
          kid: { art: "h-girl-front", at: [46, 88], s: 2 },
          ring: { art: "h-ring", at: [46, 31.6], sx: 1.7, sy: 0.9, o: 0 },
          rainbow: { art: "h-rainbow", at: [118, 52], s: 1.4, o: 0 }, sight: { art: "h-sight", at: [51, 31.6], sx: 0, o: 0 },
          bell: { art: "h-bell", at: [120, 10], s: 1.3, o: 0 },
          wave1: { art: "h-waves", at: [104, 33], o: 0 }, wave2: { art: "h-waves", at: [104, 33], o: 0 },
          rose: { art: "h-rose", at: [118, 70], s: 1.6, o: 0 },
          scent1: { art: "h-scent", at: [106, 38], o: 0 }, scent2: { art: "h-scent", at: [106, 38], o: 0 },
          apple: { art: "h-apple", at: [118, 52], s: 1.5, flip: true, o: 0 }, talk: { art: "h-talk", at: [49, 37.2], o: 0 },
          ball: { art: "ball-side", at: [132, 60], s: 2.1, o: 0 },
          walker: { art: "h-girl", at: [16, 88], s: 1.5, o: 0 }, feet: { art: "h-ring", at: [0, -1], sx: 1.3, sy: 0.5, under: "walker", o: 0 }
        },
        scenes: [
          { caption: "این چشم است. با چشم می‌بینیم.", do: [
            { id: "ring", to: { o: 1 }, dur: 400 }, { id: "ring", to: { s: 1.15 }, at: 400, dur: 1000, yoyo: true, times: 2 },
            { id: "rainbow", to: { o: 1 }, at: 1200, dur: 1 }, { id: "rainbow", draw: true, at: 1200, dur: 1400 },
            { id: "kid.pupils", to: { x: 0.5 }, at: 2400, dur: 400 },
            { id: "sight", to: { o: 1, sx: 6.6 }, at: 2700, dur: 900 }
          ] },
          { caption: "این گوش است. با گوش می‌شنویم.", key: 2900, do: [
            { id: "rainbow", to: { o: 0 }, dur: 400 }, { id: "sight", to: { o: 0 }, dur: 400 }, { id: "kid.pupils", to: { x: 0 }, dur: 400 },
            { id: "ring", path: "M46 31.6L57.4 33", dur: 600 }, { id: "ring", to: { sx: 0.8, sy: 0.8 }, dur: 600 },
            { id: "bell", to: { o: 1 }, at: 500, dur: 400 }, { id: "bell.swing", to: { r: 16 }, at: 900, dur: 300 }, { id: "bell.swing", to: { r: -32 }, at: 1200, dur: 3300, yoyo: true, times: 7 },
            { id: "wave1", to: { o: 1 }, at: 1000, dur: 300 }, { id: "wave1", path: "M104 33L66 33", at: 1000, dur: 1600, ease: "linear" }, { id: "wave1", to: { o: 0 }, at: 2400, dur: 300 },
            { id: "wave2", to: { o: 1 }, at: 2200, dur: 300 }, { id: "wave2", path: "M104 33L66 33", at: 2200, dur: 1600, ease: "linear" }, { id: "wave2", to: { o: 0 }, at: 3600, dur: 300 },
            { id: "kid.head", to: { r: -6 }, at: 2000, dur: 600 }
          ] },
          { caption: "این بینی است. با بینی بو می‌کنیم.", key: 2700, do: [
            { id: "bell", to: { o: 0 }, dur: 400 }, { id: "kid.head", to: { r: 0 }, dur: 500 },
            { id: "ring", path: "M57.4 33L46 33.6", dur: 600 }, { id: "ring", to: { sx: 0.55, sy: 0.55 }, dur: 600 },
            { id: "rose", to: { o: 1 }, at: 500, dur: 500 },
            { id: "scent1", to: { o: 1 }, at: 1000, dur: 300 }, { id: "scent1", path: "M106 38Q80 30 56 33.6", at: 1000, dur: 1700, ease: "linear" }, { id: "scent1", to: { o: 0 }, at: 2500, dur: 300 },
            { id: "scent2", to: { o: 1 }, at: 2100, dur: 300 }, { id: "scent2", path: "M106 38Q80 30 56 33.6", at: 2100, dur: 1700, ease: "linear" }, { id: "scent2", to: { o: 0 }, at: 3600, dur: 300 },
            { id: "kid.pupils", to: { o: 0 }, at: 2500, dur: 200 }, { id: "kid.shut", to: { o: 1 }, at: 2500, dur: 200 },
            { id: "kid.mouth", to: { o: 0 }, at: 2500, dur: 200 }, { id: "kid.grin", to: { o: 1 }, at: 2500, dur: 200 }
          ] },
          { caption: "این دهان است. با دهان غذا می‌خوریم و حرف می‌زنیم.", key: 2300, hold: 6200, do: [
            { id: "rose", to: { o: 0 }, dur: 400 }, { id: "kid.pupils", to: { o: 1 }, dur: 200 }, { id: "kid.shut", to: { o: 0 }, dur: 200 },
            { id: "kid.grin", to: { o: 0 }, dur: 200 }, { id: "kid.mouth", to: { o: 1 }, dur: 200 },
            { id: "ring", path: "M46 33.6L46 37.4", dur: 500 }, { id: "ring", to: { sx: 0.75, sy: 0.6 }, dur: 500 },
            { id: "apple", to: { o: 1 }, at: 400, dur: 400 }, { id: "apple", path: "M118 52Q90 30 55 38", at: 900, dur: 1100 },
            { id: "kid.mouth", to: { o: 0 }, at: 1700, dur: 150 }, { id: "kid.open", to: { o: 1 }, at: 1700, dur: 150 },
            { id: "apple.bite", to: { o: 1 }, at: 2200, dur: 100 },
            { id: "kid.open", to: { sy: 0.4 }, at: 2400, dur: 1200, yoyo: true, times: 6 },
            { id: "apple", path: "M55 38Q90 30 118 52", at: 2400, dur: 1000 },
            { id: "talk", to: { o: 1 }, at: 4000, dur: 300 }, { id: "kid.open", to: { sy: 0.4 }, at: 4000, dur: 1800, yoyo: true, times: 8 },
            { id: "talk", to: { s: 1.3 }, at: 4000, dur: 1800, yoyo: true, times: 6 }
          ] },
          { caption: "با دست‌ها چیزها را می‌گیریم.", key: 2600, do: [
            { id: "apple", to: { o: 0 }, dur: 400 }, { id: "talk", to: { o: 0 }, dur: 300 },
            { id: "kid.open", to: { o: 0 }, dur: 200 }, { id: "kid.mouth", to: { o: 1 }, dur: 200 },
            { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "ball", to: { o: 1 }, at: 300, dur: 300 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-5.4, -15.4], armR: [5.4, -15.4] }, 800, 600), [
            { id: "ball", path: "M132 60Q96 18 46 66.4", at: 1100, dur: 1200, ease: "out" },
            { id: "ring", path: "M46 37.4L46 58", at: 2300, dur: 1 }, { id: "ring", to: { sx: 3, sy: 1.6 }, at: 2300, dur: 1 },
            { id: "ring", to: { o: 1 }, at: 2400, dur: 300 }
          ]) },
          { caption: "با پاها راه می‌رویم و می‌دویم.", key: 4400, do: [
            { id: "kid", to: { o: 0 }, dur: 500 }, { id: "ball", to: { o: 0 }, dur: 500 }, { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "walker", to: { o: 1 }, at: 400, dur: 400 }, { id: "feet", to: { o: 1 }, at: 600, dur: 300 },
            { id: "walker", to: { x: 70 }, at: 800, dur: 2600, ease: "linear" }
          ].concat(B.hwalk("walker", 800, 2600, 4), [
            { id: "walker", to: { x: 150 }, at: 3600, dur: 1800, ease: "linear" }
          ], B.hwalk("walker", 3600, 1800, 4, true)) }
        ] },
      { type: "choose", prompt: "با کدام می‌شنویم؟", say: "با کدام می‌شنویم؟", pic: true,
        options: [{ label: "👁️", value: "چشم" }, { label: "👂", value: "گوش" }, { label: "🦶", value: "پا" }], answer: "گوش" },
      { type: "choose", prompt: "با کدام بو می‌کنیم؟", say: "با کدام بو می‌کنیم؟", pic: true,
        options: [{ label: "✋", value: "دست" }, { label: "👄", value: "دهان" }, { label: "👃", value: "بینی" }], answer: "بینی" },
      { type: "pairs", prompt: "هر کدام را با چیزی جفت کن که با آن حسش می‌کنیم",
        pairs: [[{ pic: "👁️", say: "چشم" }, { pic: "🌈", say: "رنگین‌کمان" }], [{ pic: "👂", say: "گوش" }, { pic: "🔔", say: "زنگ" }],
          [{ pic: "👃", say: "بینی" }, { pic: "🌹", say: "گل" }]] },
      { type: "doit", pic: "🙌", text: "بازی «دست بزن به…»! بزرگ‌ترت می‌گوید و تو دست می‌زنی:",
        list: ["به بینی‌ات", "به گوش‌هایت", "به زانوهایت", "به آرنجت", "حالا دست بزن و پا بکوب!"] },
      { type: "forparents",
        tips: [
          "موقع لباس پوشیدن، حمام و غذا خوردن، اسم عضوهای بدن را بگویید: «دست‌هایت را بشوییم»، «جوراب را پایت کن».",
          "بازی «دست بزن به…» را با عضوهای تازه ادامه دهید: آرنج، مچ، شانه، پاشنه.",
          "اسم جاهای خصوصی بدن را هم با همان لحن آرام و معمولی بگویید که اسم بینی و آرنج را می‌گویید. درس «بدن من مال خودم است» در همین بخش به این موضوع می‌پردازد.",
          "از بدن کودک یا دیگران با کلمه‌هایی مثل چاق، لاغر، زشت یا قد کوتاه حرف نزنید. بگویید بدن ما چه کارهای خوبی برایمان می‌کند."
        ] }
    ]
  },
  {
    id: "health-seed-4", subject: "health", level: "seed", emoji: "🍎", title: "آب و خوراکی",
    steps: [
      /* The sofreh fills with breakfast, a boy eats and has the energy to jump, grows a little on the measuring stick,
         and drinks water when he is thirsty. Drawings: js/art/rig-health.js and the food pictures (js/art/food.js). */
      { type: "scene", prompt: "به سفره صبحانه نگاه کن", bg: "#fbeedd",
        parts: {
          room: { art: "h-kitchen" }, chart: { art: "h-chart", at: [16, 88], s: 1.25 },
          sofreh: { art: "h-sofreh", at: [94, 78], s: 1.2 },
          bread: { art: "🍞", at: [62, 81], s: 0.55, o: 0 }, cheese: { art: "🧀", at: [76, 80], s: 0.5, o: 0 },
          nut: { art: "🌰", at: [89, 81], s: 0.45, o: 0 }, cucumber: { art: "🥒", at: [102, 80], s: 0.55, o: 0 },
          tomato: { art: "🍅", at: [115, 81], s: 0.5, o: 0 }, egg: { art: "🥚", at: [127, 79], s: 0.45, o: 0 },
          jug: { art: "h-jug", at: [70, 80], o: 0 }, glass: { art: "h-glass", at: [62, 83], s: 1.1, o: 0 },
          boy: { art: "h-boy", at: [-20, 88], s: 1.5 }
        },
        scenes: [
          { caption: "سفره صبحانه رنگارنگ است: نان و پنیر و گردو، خیار و گوجه، تخم‌مرغ.", do: [
            { id: "bread", path: "M62 71L62 81", at: 500, dur: 500, ease: "out" }, { id: "bread", to: { o: 1 }, at: 500, dur: 300 },
            { id: "cheese", path: "M76 70L76 80", at: 1300, dur: 500, ease: "out" }, { id: "cheese", to: { o: 1 }, at: 1300, dur: 300 },
            { id: "nut", path: "M89 71L89 81", at: 2100, dur: 500, ease: "out" }, { id: "nut", to: { o: 1 }, at: 2100, dur: 300 },
            { id: "cucumber", path: "M102 70L102 80", at: 3000, dur: 500, ease: "out" }, { id: "cucumber", to: { o: 1 }, at: 3000, dur: 300 },
            { id: "tomato", path: "M115 71L115 81", at: 3800, dur: 500, ease: "out" }, { id: "tomato", to: { o: 1 }, at: 3800, dur: 300 },
            { id: "egg", path: "M127 69L127 79", at: 4700, dur: 500, ease: "out" }, { id: "egg", to: { o: 1 }, at: 4700, dur: 300 }
          ] },
          { caption: "خوراکی‌های رنگارنگ به بدن ما نیرو می‌دهند تا بازی کنیم.", key: 6100, hold: 7600, do: [
            { id: "boy", to: { x: 48 }, dur: 1800, ease: "linear" }
          ].concat(B.hwalk("boy", 0, 1800, 3),
            B.hpose("boy", "h-boy", "sit", 1900, 500), [{ id: "boy", to: { y: 100.6 }, at: 1900, dur: 500 }],
            B.hpose("boy", "h-boy", { upper: 25, armF: [9.3, -14.6] }, 2500, 600),
            [{ id: "bread", to: { o: 0 }, at: 3100, dur: 100 }, { id: "boy.bread", to: { o: 1 }, at: 3100, dur: 100 }],
            B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 3100, 600), [
            { id: "boy.mouth", to: { o: 0 }, at: 3700, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 3700, dur: 100 },
            { id: "boy.open", to: { sy: 0.3 }, at: 3800, dur: 1200, yoyo: true, times: 6 },
            { id: "boy.bread", to: { o: 0 }, at: 4900, dur: 200 },
            { id: "boy.open", to: { o: 0 }, at: 5000, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 5000, dur: 100 },
            { id: "boy", to: { y: 88 }, at: 5200, dur: 400 },
            { emit: "spark", from: "boy", where: [0, -30], spread: [26, 30], n: 8, at: 5400, dur: 600, life: 1200 },
            { id: "boy", path: "M48 88Q48 66 48 88", at: 5800, dur: 700 }, { id: "boy", path: "M48 88Q48 66 48 88", at: 6600, dur: 700 }
          ], B.hunpose("boy", "h-boy", 5200, 400), B.hpose("boy", "h-boy", { armF: [3, -33.5], armB: [1, -33.5] }, 5700, 300),
            B.hpose("boy", "h-boy", { armF: [0.2, -12], armB: [0.2, -12] }, 7300, 300)) },
          { caption: "خوراکی‌ها کمک می‌کنند تا بزرگ شویم.", key: 4300, do: [
            { id: "boy", to: { flip: -1 }, dur: 200 }, { id: "boy", to: { x: 24 }, at: 200, dur: 1500, ease: "linear" }
          ].concat(B.hwalk("boy", 200, 1500, 2), [
            { id: "boy", to: { flip: 1 }, at: 1800, dur: 200 },
            { id: "boy", to: { sy: 1.06 }, at: 2600, dur: 1400 }, { id: "chart.mark", to: { y: -2.4 }, at: 2600, dur: 1400 },
            { emit: "spark", where: [26, 36], spread: [10, 4], n: 4, at: 3800, dur: 400, life: 1200 }
          ]) },
          { caption: "وقتی تشنه‌ایم، بهترین نوشیدنی آب است.", key: 5000, hold: 7000, do: [
            { emit: "drop", where: [26, 44], spread: [8, 3], rise: 6, n: 4, dur: 800, life: 900 },
            { id: "jug", to: { o: 1 }, at: 300, dur: 400 }, { id: "glass", to: { o: 1 }, at: 300, dur: 400 },
            { id: "glass.water", to: { sy: 0 }, dur: 1 }, { id: "glass.water", to: { sy: 1 }, at: 500, dur: 800 },
            { id: "boy", to: { x: 48 }, at: 900, dur: 1300, ease: "linear" }
          ].concat(B.hwalk("boy", 900, 1300, 2),
            B.hpose("boy", "h-boy", "sit", 2300, 500), [{ id: "boy", to: { y: 100.6 }, at: 2300, dur: 500 }],
            B.hpose("boy", "h-boy", { upper: 20, armF: [8.2, -13.4] }, 2900, 500), [
            { id: "glass", to: { o: 0 }, at: 3400, dur: 100 }, { id: "boy.glass", to: { o: 1 }, at: 3400, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.8, -26.6], head: -14 }, 3400, 700), [
            { id: "glass.water", to: { sy: 0.15 }, at: 3500, dur: 1 },
            { id: "boy.shut", to: { o: 1 }, at: 4100, dur: 200 }, { id: "boy.eye", to: { o: 0 }, at: 4100, dur: 200 },
            { id: "boy.shut", to: { o: 0 }, at: 5600, dur: 200 }, { id: "boy.eye", to: { o: 1 }, at: 5600, dur: 200 },
            { id: "boy.glass", to: { o: 0 }, at: 6300, dur: 100 }, { id: "glass", to: { o: 1 }, at: 6300, dur: 100 },
            { emit: "spark", from: "boy", where: [6, -24], spread: [10, 8], n: 5, at: 6400, dur: 500, life: 1100 }
          ], B.hpose("boy", "h-boy", { upper: 20, armF: [8.2, -13.4], head: 0 }, 5700, 600), B.hpose("boy", "h-boy", { upper: 0, armF: [0.2, -12] }, 6400, 500)) }
        ] },
      { type: "sort", prompt: "کدام را هر روز می‌خوریم و کدام را فقط گاهی و کم؟",
        baskets: [{ label: "هر روز", pic: "🌞", value: "often" }, { label: "گاهی، کم", pic: "🎈", value: "sometimes" }],
        items: [
          { pic: "🍞", say: "نان", basket: "often" }, { pic: "🍎", say: "سیب", basket: "often" }, { pic: "🥒", say: "خیار", basket: "often" },
          { pic: "🧀", say: "پنیر", basket: "often" }, { pic: "🍬", say: "آب‌نبات", basket: "sometimes" },
          { pic: "🥤", say: "نوشابه", basket: "sometimes" }, { pic: "🍰", say: "کیک", basket: "sometimes" }
        ] },
      { type: "choose", prompt: "بعد از بازی تشنه‌ای. چه بنوشی بهتر است؟", say: "بعد از بازی تشنه‌ای. چه بنوشی بهتر است؟",
        options: ["💧 آب", "🥤 نوشابه"], answer: "💧 آب" },
      { type: "doit", pic: "💧", text: "برو و یک لیوان آب بنوش. نوش جان!" },
      { type: "forparents",
        tips: [
          "خوراکی‌ها را «خوب» و «بد» نخوانید؛ بگویید «هر روز» و «گاهی». شیرینی را جایزه نکنید و غذا را تنبیه نکنید.",
          "سفره ساده ایرانی خیلی خوب است: نان، پنیر، گردو، ماست، عدس، لوبیا، تخم‌مرغ، برنج و میوه و سبزی فصل. هر روز میوه و سبزی داشته باشید.",
          "آب بهترین نوشیدنی است. نوشابه، آب‌میوه صنعتی و خوراکی‌های خیلی شیرین یا خیلی شور را کم کنید.",
          "اگر به آب لوله‌کشی مطمئن نیستید، آن را بجوشانید و در ظرف دربسته و تمیز نگه دارید.",
          "درباره وزن، چاقی یا لاغری کودک یا دیگران جلوی او حرف نزنید. از کودک بخواهید به سیری و گرسنگی خودش گوش بدهد و مجبورش نکنید بشقاب را تمام کند."
        ] }
    ]
  },

  // ---------------- Health: Sprout ----------------
  {
    id: "health-sprout-1", subject: "health", level: "sprout", emoji: "🤧", title: "عطسه و سرفه",
    steps: [
      /* Aida sneezes into a tissue, throws it in the bin, sneezes into her elbow when there is no tissue left, and
         washes her hands. Germs show on her hand only after the tissue, not after the elbow. Drawings:
         js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چه کار می‌کنیم", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, table: { art: "h-table", at: [98, 88], s: 1.2 }, tissues: { art: "h-tissues", at: [98, 65.2], s: 1.2 },
          bin: { art: "h-bin", at: [116, 88], s: 1.2 }, sink: { art: "h-sink-side", at: [142, 88], s: 1.3 }, soap: { art: "h-soap-small", at: [134, 54.4] },
          aida: { art: "h-girl", at: [86, 88], s: 1.5 }, ball: { art: "h-tissue", at: [96.5, 55], s: 1.3, o: 0 },
          friend: { art: "h-boy", at: [-14, 88], s: 1.5 }
        },
        scenes: [
          { caption: "آیدا دارد عطسه‌اش می‌گیرد.", do: [
            { id: "aida.head", to: { r: -8 }, at: 300, dur: 600 }, { id: "aida.head", to: { r: -16 }, at: 1300, dur: 700 },
            { id: "aida.eye", to: { o: 0 }, at: 900, dur: 200 }, { id: "aida.shut", to: { o: 1 }, at: 900, dur: 200 },
            { id: "aida.mouth", to: { o: 0 }, at: 1300, dur: 200 }, { id: "aida.open", to: { o: 1 }, at: 1300, dur: 200 },
            { emit: "spark", where: [95.5, 43], spread: [3, 3], n: 3, at: 600, dur: 1400, life: 900 }
          ] },
          { caption: "جلوی دهان و بینی‌اش دستمال می‌گیرد و عطسه می‌کند.", key: 2300, do: [
            { id: "aida.head", to: { r: -10 }, dur: 300 }
          ].concat(B.hpose("aida", "h-girl", { armF: [8, -19.3] }, 200, 600), [
            { id: "tissues.top", to: { o: 0 }, at: 800, dur: 100 }, { id: "aida.tissue", to: { o: 1 }, at: 800, dur: 100 }
          ], B.hpose("aida", "h-girl", { armF: [4.6, -24.3], head: -10 }, 850, 600), [
            { id: "aida.head", to: { r: 12 }, at: 2000, dur: 150 }, { id: "aida.upper", to: { r: 7 }, at: 2000, dur: 150 },
            { id: "aida.upper", to: { r: 0 }, at: 2500, dur: 500 }, { id: "aida.head", to: { r: 8 }, at: 2500, dur: 500 },
            { emit: "drop", where: [97, 49], spread: [2, 3], rise: 0, n: 5, at: 2000, dur: 300, life: 500 },
            { id: "aida.open", to: { o: 0 }, at: 2600, dur: 200 }, { id: "aida.mouth", to: { o: 1 }, at: 2600, dur: 200 },
            { id: "aida.shut", to: { o: 0 }, at: 2800, dur: 200 }, { id: "aida.eye", to: { o: 1 }, at: 2800, dur: 200 },
            { id: "aida.germs", to: { o: 1 }, at: 2800, dur: 400 }
          ]) },
          { caption: "دستمال را در سطل آشغال می‌اندازد.", key: 1300, do: [
            { id: "aida.head", to: { r: 0 }, dur: 400 }, { id: "aida.tissue", to: { o: 0 }, at: 500, dur: 100 }
          ].concat(B.hpose("aida", "h-girl", { armF: [7, -22] }, 0, 500), [
            { id: "ball", to: { o: 1 }, at: 500, dur: 100 }, { id: "ball", path: "M96.5 55Q110 40 116 70", at: 600, dur: 900, ease: "in" },
            { id: "bin.lid", to: { r: -70 }, at: 300, dur: 300 }, { id: "ball", to: { o: 0 }, at: 1500, dur: 200 },
            { id: "bin.lid", to: { r: 0 }, at: 1900, dur: 300 }
          ], B.hpose("aida", "h-girl", { armF: [0.2, -12] }, 1700, 500)) },
          { caption: "اگر دستمال نباشد، توی آرنجش عطسه یا سرفه می‌کند.", key: 2600, do: [
            { id: "aida.head", to: { r: 22 }, dur: 500 }, { id: "tissues", to: { r: -8 }, at: 500, dur: 300, yoyo: true, times: 2 },
            { id: "aida.head", to: { r: 0 }, at: 1100, dur: 300 }
          ].concat(B.hpose("aida", "h-girl", { armF: [1.6, -27.4, -1], head: 12 }, 1300, 700), [
            { id: "aida.eye", to: { o: 0 }, at: 2000, dur: 100 }, { id: "aida.shut", to: { o: 1 }, at: 2000, dur: 100 },
            { id: "aida.upper", to: { r: 7 }, at: 2300, dur: 150 }, { id: "aida.upper", to: { r: 0 }, at: 2800, dur: 500 },
            { id: "aida.eye", to: { o: 1 }, at: 3200, dur: 100 }, { id: "aida.shut", to: { o: 0 }, at: 3200, dur: 100 }
          ]) },
          { caption: "بعد دست‌هایش را با آب و صابون می‌شوید.", key: 4600, hold: 7600, do: B.hunpose("aida", "h-girl", 0, 500).concat([
            { id: "aida", to: { x: 124 }, at: 400, dur: 1600, ease: "linear" }
          ], B.hwalk("aida", 400, 1600, 3), [
            { id: "sink.water", to: { o: 1 }, at: 2000, dur: 200 }
          ], B.hpose("aida", "h-girl", { armF: [9.3, -20.5], armB: [9.6, -20.9] }, 2100, 600), [
            { id: "soap", path: "M134 54.4Q136 46 138 56", at: 2800, dur: 600 }, { id: "soap", to: { o: 0 }, at: 3300, dur: 200 },
            { id: "aida.foreF", to: { r: "+12" }, at: 3400, dur: 2400, yoyo: true, times: 8 },
            { id: "aida.foreB", to: { r: "-12" }, at: 3400, dur: 2400, yoyo: true, times: 8 },
            { emit: "bubble", where: [138, 56], spread: [8, 5], n: 12, at: 3400, dur: 2400, life: 1000 },
            { id: "aida.germs", to: { o: 0 }, at: 3600, dur: 2000 },
            { id: "soap", to: { o: 1 }, at: 6000, dur: 300 }, { id: "soap", path: "M138 56Q136 46 134 54.4", at: 6000, dur: 1 },
            { id: "sink.water", to: { o: 0 }, at: 6600, dur: 200 }
          ]) },
          { caption: "حالا میکروب‌ها به دیگران نمی‌رسند.", key: 3600, do: B.hunpose("aida", "h-girl", 0, 500).concat([
            { id: "friend", to: { x: 68 }, at: 300, dur: 2000, ease: "linear" }
          ], B.hwalk("friend", 300, 2000, 3), [
            { id: "aida", to: { flip: -1 }, at: 600, dur: 200 }, { id: "aida", to: { x: 94 }, at: 800, dur: 1500, ease: "linear" }
          ], B.hwalk("aida", 800, 1500, 2),
            B.hpose("aida", "h-girl", { armF: [8.4, -27.4] }, 2500, 500), B.hpose("friend", "h-boy", { armF: [8.4, -27.4] }, 2500, 500), [
            { emit: "spark", where: [81, 46], spread: [6, 6], n: 6, at: 3000, dur: 300, life: 1200 },
            { id: "aida.mouth", to: { o: 0 }, at: 3000, dur: 100 }, { id: "aida.open", to: { o: 1, sy: 0.6 }, at: 3000, dur: 100 }
          ]) }
        ] },
      { type: "choose", prompt: "اگر دستمال نداریم، کجا عطسه کنیم؟", stack: true,
        options: ["💪 توی آرنجمان", "✋ توی کف دستمان", "🌬️ رو به هوا"], answer: "💪 توی آرنجمان" },
      { type: "order", prompt: "به ترتیب بچین", numbered: true,
        items: [{ pic: "🤧", label: "عطسه در دستمال" }, { pic: "🗑️", label: "دستمال در سطل" }, { pic: "🧼", label: "شستن دست" }] },
      { type: "sort", prompt: "کی باید دست‌ها را بشوییم؟",
        baskets: [{ label: "دست‌ها را می‌شوییم", pic: "🧼", value: "wash" }, { label: "لازم نیست", pic: "🙂", value: "no" }],
        items: [
          { pic: "🍽️", label: "پیش از غذا", basket: "wash" }, { pic: "🚽", label: "بعد از دستشویی", basket: "wash" },
          { pic: "⚽", label: "بعد از بازی", say: "بعد از بازی در حیاط", basket: "wash" }, { pic: "🐈", label: "بعد از ناز کردن گربه", basket: "wash" },
          { pic: "📖", label: "بعد از قصه شنیدن", basket: "no" }, { pic: "🎵", label: "بعد از آواز خواندن", basket: "no" }
        ] },
      { type: "forparents",
        tips: [
          "یاد بدهید هنگام عطسه و سرفه جلوی دهان و بینی دستمال بگیرد یا توی آرنجش عطسه کند، دستمال را دور بیندازد و دست‌هایش را بشوید.",
          "اگر کودک یادش رفت، سرزنشش نکنید. خودتان هم همین کار را بکنید تا ببیند.",
          "وقتی کودک بیمار است، بگذارید در خانه استراحت کند و لیوان و قاشقش جدا باشد.",
          "اگر کودک تب بالا دارد، به سختی نفس می‌کشد، خیلی بی‌حال است یا چیزی نمی‌نوشد، به پزشک یا مرکز بهداشت محل بروید. در وضعیت اضطراری با ۱۱۵ تماس بگیرید."
        ] }
    ]
  },
  {
    id: "health-sprout-2", subject: "health", level: "sprout", emoji: "🫖", title: "در خانه مراقبم",
    steps: [
      /* Gran pours hot tea; Kian sits a little way off and waits until the steam is gone; sharp things glint; pills
         look like the candies next to them, and Gran puts the medicine up on the shelf; Kian keeps his hands back and
         tells her. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#fbeedd",
        parts: {
          room: { art: "h-kitchen" }, shelf: { art: "h-shelf", at: [110, 20] }, cushion: { art: "h-cushion", at: [30, 88], s: 1.2 },
          table: { art: "h-dtable", at: [92, 88], s: 1.2 },
          estekan: { art: "h-estekan", at: [96, 60.4], s: 1.2 }, steamT: { art: "h-steam", at: [96, 52], o: 0 },
          knife: { art: "h-knife", at: [74, 59.4], o: 0 }, scissors: { art: "h-scissors", at: [86, 58.8], o: 0 },
          candy: { art: "h-candy", at: [90, 60.4], s: 1.1, o: 0 }, bottle: { art: "h-bottle", at: [106, 60.4], o: 0 },
          pills: { art: "h-pillset", at: [101, 59.4], o: 0 }, oval: { art: "h-oval", at: [97, 56], sx: 1.5, o: 0 },
          gran: { art: "h-gran", at: [130, 88], s: 1.2, flip: true },
          teapot: { art: "h-teapot", at: [114.6, 41.2] }, steamP: { art: "h-steam", at: [106, 37] },
          stream: { art: "h-teastream", at: [97.4, 50], sy: 0.4, o: 0 },
          kian: { art: "h-boy", at: [-14, 88], s: 1.3 }, talk: { art: "h-talk", at: [70.6, 54.6], s: 1.2, r: -10, o: 0 }
        },
        scenes: [
          { caption: "مادربزرگ چای می‌ریزد. قوری و استکان چای داغ است.", key: 2200, do: B.hpose("gran", "h-gran", { armF: [12.6, -39] }, 0, 1).concat([
            { id: "estekan.tea", to: { sy: 0 }, dur: 1 },
            { id: "steamP", to: { y: "-1.5", o: 0.5 }, dur: 1600, yoyo: true, times: 4 },
            { id: "teapot", to: { r: -32 }, at: 500, dur: 700 }, { id: "stream", to: { o: 1 }, at: 1100, dur: 200 },
            { id: "estekan.tea", to: { sy: 1 }, at: 1200, dur: 1600 },
            { id: "stream", to: { o: 0 }, at: 2800, dur: 200 }, { id: "teapot", to: { r: 0 }, at: 2900, dur: 600 },
            { id: "steamT", to: { o: 1 }, at: 2000, dur: 600 }, { id: "steamT", to: { y: "-1.5" }, at: 2000, dur: 2400, yoyo: true, times: 4 }
          ]) },
          { caption: "کیان کمی دورتر می‌نشیند و صبر می‌کند تا چایش خنک شود.", hold: 7600, do: [
            { id: "teapot", path: "M114.6 41.2L116 56.4", dur: 700 }
          ].concat(B.hpose("gran", "h-gran", { armF: [11.2, -27.6] }, 0, 700), B.hpose("gran", "h-gran", { armF: [0.2, -21] }, 900, 500), [
            { id: "steamP", to: { o: 0 }, at: 700, dur: 600 },
            { id: "kian", to: { x: 30 }, at: 300, dur: 2000, ease: "linear" }
          ], B.hwalk("kian", 300, 2000, 3), B.hpose("kian", "h-boy", "sit", 2400, 500), [
            { id: "kian", to: { y: 96.5 }, at: 2400, dur: 500 },
            { id: "kian.head", to: { r: 10 }, at: 3200, dur: 600 },
            { id: "steamT", to: { y: "-1.5" }, at: 2900, dur: 4400, yoyo: true, times: 6 },
            { id: "steamT", to: { o: 0 }, at: 3000, dur: 4400 }
          ]) },
          { caption: "چاقو و قیچی تیز است. با آن‌ها بازی نمی‌کنیم.", key: 2600, do: [
            { id: "knife", to: { o: 1 }, dur: 500 }, { id: "scissors", to: { o: 1 }, dur: 500 },
            { emit: "spark", where: [80, 58], spread: [16, 2], n: 4, at: 600, dur: 1200, life: 900 },
            { id: "kian.head", to: { r: -8 }, at: 1600, dur: 300 }, { id: "kian.head", to: { r: 8 }, at: 1900, dur: 1800, yoyo: true, times: 6 },
            { id: "kian.head", to: { r: 0 }, at: 3800, dur: 300 }
          ] },
          { caption: "دارو خوراکی نیست، حتی اگر شبیه آب‌نبات باشد.", key: 2300, do: [
            { id: "knife", to: { o: 0 }, dur: 400 }, { id: "scissors", to: { o: 0 }, dur: 400 },
            { id: "candy", to: { o: 1 }, at: 300, dur: 500 }, { id: "bottle", to: { o: 1 }, at: 300, dur: 500 }, { id: "pills", to: { o: 1 }, at: 300, dur: 500 },
            { id: "oval", to: { o: 1 }, at: 1200, dur: 400 }, { id: "oval", to: { s: 1.12 }, at: 1600, dur: 1200, yoyo: true, times: 2 },
            { id: "kian.head", to: { r: -8 }, at: 2000, dur: 300 }, { id: "kian.head", to: { r: 8 }, at: 2300, dur: 1800, yoyo: true, times: 6 },
            { id: "kian.head", to: { r: 0 }, at: 4200, dur: 300 }
          ] },
          { caption: "دارو را بزرگ‌ترها بالا و دور از دست ما می‌گذارند.", key: 3000, do: [
            { id: "oval", to: { o: 0 }, dur: 400 },
            { id: "gran", to: { x: 120 }, dur: 900 }
          ].concat(B.hwalk("gran", 0, 900, 1), B.hpose("gran", "h-gran", { armF: [11.6, -24.4] }, 1000, 600), [
            { id: "pills", to: { o: 0 }, at: 1600, dur: 300 },
            { id: "bottle", path: "M106 60.4Q100 40 109.6 20", at: 2000, dur: 1200 }
          ], B.hpose("gran", "h-gran", { armF: [9.4, -57] }, 2000, 1200), B.hpose("gran", "h-gran", { armF: [0.2, -21] }, 3600, 600)) },
          { caption: "اگر چیز داغ، تیز یا دارو دیدیم، دست نمی‌زنیم و به بزرگ‌تر می‌گوییم.", key: 5200, hold: 7000, do: B.hunpose("kian", "h-boy", 0, 500).concat([
            { id: "kian", to: { y: 88 }, dur: 500 },
            { id: "kian", to: { x: 64 }, at: 700, dur: 2000, ease: "linear" },
            { id: "gran", to: { x: 94 }, at: 1400, dur: 1400, ease: "linear" }
          ], B.hwalk("kian", 700, 2000, 3), B.hwalk("gran", 1400, 1400, 2), B.hpose("kian", "h-boy", { armF: [-3.6, -13], armB: [-3.6, -13] }, 2800, 500), [
            { id: "kian.head", to: { r: -10 }, at: 3200, dur: 400 },
            { id: "kian.mouth", to: { o: 0 }, at: 3500, dur: 100 }, { id: "kian.open", to: { o: 1 }, at: 3500, dur: 100 },
            { id: "kian.open", to: { sy: 0.4 }, at: 3600, dur: 2400, yoyo: true, times: 8 }, { id: "talk", to: { o: 1 }, at: 3600, dur: 300 },
            { id: "talk", to: { s: 1.4 }, at: 3600, dur: 2400, yoyo: true, times: 6 },
            { id: "gran.head", to: { r: 12 }, at: 4200, dur: 1600, yoyo: true, times: 4 }
          ]) }
        ] },
      { type: "sort", prompt: "با کدام بازی می‌کنیم؟ به کدام دست نمی‌زنیم؟",
        baskets: [{ label: "با آن بازی می‌کنم", pic: "🧸", value: "play" }, { label: "دست نمی‌زنم", pic: "✋", say: "دست نمی‌زنم، به بزرگ‌تر می‌گویم", value: "stop" }],
        items: [
          { pic: "⚽", label: "توپ", basket: "play" }, { pic: "📚", label: "کتاب", basket: "play" }, { pic: "🖍️", label: "مداد شمعی", basket: "play" },
          { pic: "🔪", label: "چاقو", basket: "stop" }, { pic: "💊", label: "دارو", basket: "stop" }, { pic: "🫖", label: "قوری داغ", basket: "stop" },
          { pic: "🔌", label: "پریز برق", basket: "stop" }, { pic: "🧴", label: "مایع شوینده", basket: "stop" }
        ] },
      { type: "choose", prompt: "روی میز یک قرص رنگی دیدی که شبیه آب‌نبات است. چه کار می‌کنی؟", stack: true,
        options: ["✋ دست نمی‌زنم و به بزرگ‌تر می‌گویم", "😋 می‌خورمش", "🎁 به دوستم می‌دهم"], answer: "✋ دست نمی‌زنم و به بزرگ‌تر می‌گویم" },
      { type: "forparents",
        tips: [
          "دارو، مایع شوینده، سفیدکننده و نفت را بالا و دور از دست کودک، و اگر می‌شود در کمد قفل‌دار، نگه دارید. هیچ‌وقت آن‌ها را در بطری نوشابه یا لیوان نریزید.",
          "به دارو «آب‌نبات» نگویید. اگر کودک دارو یا ماده شوینده خورد، او را وادار به استفراغ نکنید و فوراً با ۱۱۵ تماس بگیرید.",
          "قوری، سماور، کتری و استکان چای را دور از لبه میز و سفره بگذارید و دسته قابلمه را رو به داخل اجاق بچرخانید.",
          "اگر جایی از بدن کودک سوخت، آن را ۲۰ دقیقه زیر آب خنک (نه یخ) بگیرید. ماست، خمیردندان، کره یا روغن نزنید. اگر سوختگی بزرگ است یا روی صورت، دست یا پاست، به پزشک بروید.",
          "بخاری گازی و آبگرمکن باید دودکش سالم داشته باشند. پنجره‌ها و بالکن‌ها را طوری ببندید که کودک نتواند بالا برود."
        ] }
    ]
  },
  {
    id: "health-sprout-3", subject: "health", level: "sprout", emoji: "🚦", title: "در خیابان",
    steps: [
      /* Seen from behind Nazanin and her mother: they hold hands at the kerb, look left, right and left again, wait
         while a car and a motorbike pass, and cross on the zebra when the walking light is green. Then a car cut
         open: Nazanin in the back seat, fastening her seat belt. Drawings: js/art/rig-health.js; the car and the
         motorbike are js/art/things.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#cfe9f7",
        parts: {
          street: { art: "h-street" }, light: { art: "h-pedlight", at: [106, 34], s: 0.9 },
          bike: { art: "🛵", at: [186, 50], s: 0.75 }, car: { art: "🚗", at: [-24, 65], s: 1.1, flip: true },
          sound: { art: "h-waves", at: [16, 58], s: 1.2, flip: true, o: 0 },
          mom: { art: "h-mom-back", at: [80, 98], s: 0.95 }, kid: { art: "h-girl-back", at: [67, 98], s: 1 },
          panel: { art: "h-panel", o: 0 }, carIn: { art: "h-car-in", o: 0 },
          kidCar: { art: "h-girl", at: [61.1, 66.8], o: 0 }, momCar: { art: "h-mom", at: [100, 77], s: 0.95, o: 0 },
          carBody: { art: "h-car-body", o: 0 },
          belt: { art: "h-belt", o: 0 }
        },
        scenes: [
          { caption: "نازنین و مادرش می‌خواهند از خیابان رد شوند. نازنین دست مادرش را می‌گیرد.", do: [
            { id: "mom", to: { y: 84, s: 0.8 }, dur: 2200, ease: "out" }, { id: "kid", to: { x: 68, y: 84, s: 0.85 }, dur: 2200, ease: "out" },
            { id: "mom.legL", to: { sy: 0.86 }, dur: 2000, yoyo: true, times: 6 }, { id: "mom.legR", to: { sy: 0.86 }, at: 170, dur: 2000, yoyo: true, times: 6 },
            { id: "kid.legL", to: { sy: 0.86 }, dur: 2000, yoyo: true, times: 6 }, { id: "kid.legR", to: { sy: 0.86 }, at: 170, dur: 2000, yoyo: true, times: 6 }
          ].concat(B.hpose("mom", "h-mom-back", { armL: [-6.4, -21.4] }, 2400, 600), B.hpose("kid", "h-girl-back", { armR: [8.1, -20.1] }, 2400, 600)) },
          { caption: "کنار خیابان می‌ایستند. به چپ و راست نگاه می‌کنند و گوش می‌دهند.", key: 1100, hold: 5400, do: [
            { cam: { x: 70, y: 64, zoom: 2 }, dur: 700 }, { cam: { x: 80, y: 45, zoom: 1 }, at: 4400, dur: 800 },
            { id: "mom.head", to: { r: -16 }, at: 300, dur: 400 }, { id: "kid.head", to: { r: -16 }, at: 300, dur: 400 },
            { id: "mom.lookL", to: { o: 1 }, at: 300, dur: 300 }, { id: "kid.lookL", to: { o: 1 }, at: 300, dur: 300 },
            { id: "mom.head", to: { r: 16 }, at: 1700, dur: 600 }, { id: "kid.head", to: { r: 16 }, at: 1700, dur: 600 },
            { id: "mom.lookL", to: { o: 0 }, at: 1800, dur: 200 }, { id: "kid.lookL", to: { o: 0 }, at: 1800, dur: 200 },
            { id: "mom.lookR", to: { o: 1 }, at: 2000, dur: 200 }, { id: "kid.lookR", to: { o: 1 }, at: 2000, dur: 200 },
            { id: "mom.head", to: { r: -16 }, at: 3100, dur: 600 }, { id: "kid.head", to: { r: -16 }, at: 3100, dur: 600 },
            { id: "mom.lookR", to: { o: 0 }, at: 3200, dur: 200 }, { id: "kid.lookR", to: { o: 0 }, at: 3200, dur: 200 },
            { id: "mom.lookL", to: { o: 1 }, at: 3400, dur: 200 }, { id: "kid.lookL", to: { o: 1 }, at: 3400, dur: 200 },
            { id: "sound", to: { o: 1 }, at: 3600, dur: 300 }, { id: "sound", to: { s: 1.5 }, at: 3600, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "ماشین و موتور رد می‌شوند. صبر می‌کنند.", key: 700, do: [
            { id: "sound", to: { o: 0 }, at: 600, dur: 300 },
            { id: "car", to: { x: 190 }, dur: 2600, ease: "linear" }, { id: "bike", to: { x: -34 }, dur: 2600, ease: "linear" },
            { id: "mom.head", to: { r: 8 }, at: 800, dur: 1400 }, { id: "kid.head", to: { r: 8 }, at: 800, dur: 1400 },
            { id: "mom.lookL", to: { o: 0 }, at: 1200, dur: 200 }, { id: "kid.lookL", to: { o: 0 }, at: 1200, dur: 200 },
            { id: "mom.lookR", to: { o: 1 }, at: 1400, dur: 200 }, { id: "kid.lookR", to: { o: 1 }, at: 1400, dur: 200 }
          ] },
          { caption: "خیابان خالی است و چراغ عابر سبز است. از خط عابر پیاده رد می‌شوند.", key: 4200, hold: 7200, do: [
            { id: "light.red", to: { o: 0 }, at: 300, dur: 200 }, { id: "light.green", to: { o: 1 }, at: 300, dur: 200 },
            { id: "mom.head", to: { r: -12 }, at: 700, dur: 400 }, { id: "kid.head", to: { r: -12 }, at: 700, dur: 400 },
            { id: "mom.lookR", to: { o: 0 }, at: 700, dur: 200 }, { id: "kid.lookR", to: { o: 0 }, at: 700, dur: 200 },
            { id: "mom.lookL", to: { o: 1 }, at: 800, dur: 200 }, { id: "kid.lookL", to: { o: 1 }, at: 800, dur: 200 },
            { id: "mom.head", to: { r: 0 }, at: 1800, dur: 400 }, { id: "kid.head", to: { r: 0 }, at: 1800, dur: 400 },
            { id: "mom.lookL", to: { o: 0 }, at: 1800, dur: 200 }, { id: "kid.lookL", to: { o: 0 }, at: 1800, dur: 200 },
            { id: "mom", to: { x: 85, y: 35, s: 0.5 }, at: 2300, dur: 4200, ease: "linear" }, { id: "kid", to: { x: 77.6, y: 35, s: 0.53 }, at: 2300, dur: 4200, ease: "linear" },
            { id: "mom.legL", to: { sy: 0.86 }, at: 2300, dur: 4200, yoyo: true, times: 12 }, { id: "mom.legR", to: { sy: 0.86 }, at: 2480, dur: 4200, yoyo: true, times: 12 },
            { id: "kid.legL", to: { sy: 0.86 }, at: 2300, dur: 4200, yoyo: true, times: 12 }, { id: "kid.legR", to: { sy: 0.86 }, at: 2480, dur: 4200, yoyo: true, times: 12 }
          ] },
          { caption: "در ماشین هم عقب می‌نشینیم و کمربند می‌بندیم.", key: 3200, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "carIn", to: { o: 1 }, at: 300, dur: 500 }, { id: "carBody", to: { o: 1 }, at: 300, dur: 500 },
            { id: "kidCar", to: { o: 1 }, at: 300, dur: 500 }, { id: "momCar", to: { o: 1 }, at: 300, dur: 500 },
            { id: "kidCar", to: { s: 1.06 }, at: 900, dur: 500, yoyo: true, times: 2 },
            { id: "belt", to: { o: 1 }, at: 1800, dur: 1 }, { id: "belt", draw: true, at: 1800, dur: 1000 },
            { emit: "spark", where: [67, 50], spread: [3, 3], n: 4, at: 2800, dur: 300, life: 1000 }
          ].concat(B.hpose("kidCar", "h-girl", { armF: [-4, -26] }, 1400, 400), B.hpose("kidCar", "h-girl", { armF: [6, -15] }, 1800, 1000)) }
        ] },
      { type: "order", prompt: "برای رد شدن از خیابان، به ترتیب بچین", numbered: true,
        items: [{ pic: "✋", label: "بایست" }, { pic: "👀", label: "نگاه کن و گوش بده" }, { pic: "🚶", label: "دست در دست، رد شو" }] },
      { type: "sort", prompt: "کجا جای بازی است؟",
        baskets: [{ label: "جای بازی است", pic: "⚽", value: "ok" }, { label: "جای بازی نیست", pic: "✋", value: "no" }],
        items: [
          { pic: "🌳", label: "پارک", basket: "ok" }, { pic: "🏡", label: "حیاط خانه", basket: "ok" }, { pic: "🏫", label: "حیاط مدرسه", basket: "ok" },
          { pic: "🚗", label: "کنار خیابان", basket: "no" }, { pic: "🅿️", label: "بین ماشین‌ها", say: "بین ماشین‌های پارک‌شده", basket: "no" }
        ] },
      { type: "choose", prompt: "چراغ عابر پیاده چه رنگی باشد تا رد شویم؟",
        options: ["🟢 سبز", "🔴 قرمز"], answer: "🟢 سبز" },
      { type: "forparents",
        tips: [
          "کودکان هنوز نمی‌توانند سرعت و فاصله ماشین را درست تخمین بزنند و راننده‌ها هم آن‌ها را دیرتر می‌بینند. نزدیک خیابان همیشه دستش را بگیرید.",
          "هر بار که با هم رد می‌شوید، بلند بگویید: «بایست، نگاه کن، گوش بده.» از خط عابر و سر چهارراه رد شوید، نه از بین ماشین‌های پارک‌شده. کودک از کار شما یاد می‌گیرد.",
          "در ماشین، کودک عقب بنشیند و کمربند یا صندلی کودک داشته باشد. اگر کودک را با موتور جابه‌جا می‌کنید، کلاه ایمنی به اندازه سرش داشته باشد.",
          "برای بازی جای امن انتخاب کنید: حیاط، پارک یا کوچه‌ای که ماشین در آن رفت‌وآمد نمی‌کند."
        ] }
    ]
  },
  {
    id: "health-sprout-4", subject: "health", level: "sprout", emoji: "🧭", title: "اگر گم شدم",
    steps: [
      /* Shirin looks up at the kites while her father walks on; she stays on the spot and breathes slowly, tells the
         shop seller and shows the card with his number; the seller phones him, and he comes back and hugs her.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#e9cfa6",
        parts: {
          bazaar: { art: "h-bazaar" }, kites: { art: "h-kites" },
          shopBack: { art: "h-shop-back" }, seller: { art: "h-seller", at: [24, 84], s: 1.15 }, shopFront: { art: "h-shop-front" },
          spot: { art: "h-spot", at: [86, 88], s: 1.2, o: 0 }, breath: { art: "h-breath", at: [86, 62], o: 0 },
          dad: { art: "h-dad", at: [-24, 88], s: 1.15 }, shirin: { art: "h-girl", at: [-19, 88], s: 1.35 },
          talk: { art: "h-talk", at: [51.5, 54], s: 1.3, flip: true, o: 0 },
          ringS: { art: "h-ring-lines", at: [28, 37], o: 0 }, ringD: { art: "h-ring-lines", at: [129, 38], o: 0 },
          heart1: { art: "h-heart", at: [64, 40], s: 0.6, o: 0 }, heart2: { art: "h-heart", at: [72, 34], s: 0.45, o: 0 }
        },
        scenes: [
          { caption: "شیرین و پدرش به بازار رفته‌اند.", do: B.hpose("dad", "h-dad", { armF: [3.2, -22] }, 0, 1).concat(
            B.hpose("shirin", "h-girl", { armB: [-1, -18.7] }, 0, 1), [
            { id: "dad", to: { x: 81 }, dur: 3200, ease: "linear" }, { id: "shirin", to: { x: 86 }, dur: 3200, ease: "linear" },
            { id: "dad.legF", to: { r: -20 }, dur: 3200, yoyo: true, times: 10 }, { id: "dad.legB", to: { r: 20 }, dur: 3200, yoyo: true, times: 10 },
            { id: "shirin.legF", to: { r: -24 }, dur: 3200, yoyo: true, times: 12 }, { id: "shirin.legB", to: { r: 24 }, dur: 3200, yoyo: true, times: 12 }
          ]) },
          { caption: "شیرین به بادبادک‌ها نگاه می‌کند. سرش را که بلند می‌کند، پدرش را نمی‌بیند.", hold: 7600, do: B.hpose("shirin", "h-girl", { armB: [0.2, -12] }, 0, 400).concat(
            B.hpose("dad", "h-dad", { armF: [0.2, -21] }, 0, 400), [
            { id: "shirin.head", to: { r: -26 }, at: 300, dur: 600 },
            { id: "kites.k1", to: { r: 10 }, at: 300, dur: 3000, yoyo: true, times: 4 }, { id: "kites.k2", to: { r: -8 }, at: 300, dur: 3000, yoyo: true, times: 4 },
            { id: "kites.k3", to: { r: 9 }, at: 500, dur: 3000, yoyo: true, times: 4 },
            { id: "dad", to: { x: 190 }, at: 500, dur: 3200, ease: "linear" }
          ], B.hwalk("dad", 500, 3200, 5), [
            { id: "shirin.head", to: { r: 0 }, at: 4000, dur: 500 },
            { id: "shirin", to: { flip: -1 }, at: 4800, dur: 300 }, { id: "shirin", to: { flip: 1 }, at: 5800, dur: 300 },
            { id: "shirin.head", to: { r: -6 }, at: 6300, dur: 400 }
          ]) },
          { caption: "شیرین همان‌جا می‌ایستد. نفس آرام می‌کشد. جای دیگری نمی‌رود.", key: 2400, hold: 7400, do: [
            { id: "shirin.head", to: { r: 0 }, dur: 400 }, { id: "spot", to: { o: 1 }, at: 300, dur: 500 },
            { id: "breath", to: { o: 1 }, at: 600, dur: 400 },
            { id: "breath", to: { s: 1.7 }, at: 800, dur: 6000, yoyo: true, times: 6, ease: "soft" },
            { id: "shirin.upper", to: { sy: 1.04 }, at: 800, dur: 6000, yoyo: true, times: 6, ease: "soft" },
            { id: "shirin.eye", to: { o: 0 }, at: 900, dur: 300 }, { id: "shirin.shut", to: { o: 1 }, at: 900, dur: 300 },
            { id: "shirin.eye", to: { o: 1 }, at: 6600, dur: 300 }, { id: "shirin.shut", to: { o: 0 }, at: 6600, dur: 300 }
          ] },
          { caption: "به فروشنده مغازه می‌گوید: «گم شده‌ام. اسم بابام رضا است. این شماره اوست.»", key: 5600, hold: 7600, do: [
            { id: "breath", to: { o: 0 }, dur: 400 }, { id: "spot", to: { o: 0 }, dur: 400 },
            { id: "shirin", to: { flip: -1 }, at: 200, dur: 300 }, { id: "shirin", to: { x: 58 }, at: 500, dur: 1400, ease: "linear" }
          ].concat(B.hwalk("shirin", 500, 1400, 2), [
            { id: "shirin.head", to: { r: -10 }, at: 2000, dur: 400 },
            { id: "shirin.mouth", to: { o: 0 }, at: 2400, dur: 100 }, { id: "shirin.open", to: { o: 1 }, at: 2400, dur: 100 },
            { id: "shirin.open", to: { sy: 0.4 }, at: 2500, dur: 4000, yoyo: true, times: 12 },
            { id: "talk", to: { o: 1 }, at: 2500, dur: 300 }, { id: "talk", to: { s: 1.7 }, at: 2500, dur: 4000, yoyo: true, times: 8 },
            { id: "shirin.card", to: { o: 1 }, at: 4600, dur: 200 },
            { id: "seller.head", to: { r: 10 }, at: 3000, dur: 1600, yoyo: true, times: 4 },
            { id: "talk", to: { o: 0 }, at: 6600, dur: 300 }, { id: "shirin.open", to: { o: 0 }, at: 6600, dur: 100 }, { id: "shirin.mouth", to: { o: 1 }, at: 6600, dur: 100 }
          ], B.hpose("shirin", "h-girl", "show", 4500, 500)) },
          { caption: "فروشنده به پدر شیرین زنگ می‌زند. پدر هم دنبال شیرین می‌گشت.", key: 6000, hold: 7600, do: B.hpose("seller", "h-seller", "ear", 0, 600).concat([
            { id: "seller.phone", to: { o: 1 }, at: 100, dur: 200 },
            { id: "dad", to: { flip: -1 }, dur: 1 }, { id: "dad", to: { x: 132 }, at: 600, dur: 1800, ease: "linear" }
          ], B.hwalk("dad", 600, 1800, 3), [
            { id: "dad.head", to: { r: -10 }, at: 2500, dur: 500 }, { id: "dad.head", to: { r: 8 }, at: 3000, dur: 1200, yoyo: true, times: 2 },
            { id: "ringD", to: { o: 1 }, at: 3800, dur: 200 }, { id: "ringD", to: { s: 1.3 }, at: 3800, dur: 1400, yoyo: true, times: 6 },
            { id: "dad.phone", to: { o: 1 }, at: 5000, dur: 200 }, { id: "ringD", to: { o: 0 }, at: 5200, dur: 200 },
            { id: "seller.mouth", to: { o: 0 }, at: 5400, dur: 100 }, { id: "seller.open", to: { o: 1 }, at: 5400, dur: 100 },
            { id: "seller.open", to: { sy: 0.4 }, at: 5500, dur: 1800, yoyo: true, times: 6 }
          ], B.hpose("dad", "h-dad", "ear", 5000, 500)) },
          { caption: "پدر زود می‌آید و شیرین را بغل می‌کند.", key: 4000, do: B.hpose("dad", "h-dad", { armF: [0.2, -21], head: 0 }, 0, 400).concat(
            B.hpose("seller", "h-seller", { armF: [0.2, -21], head: 0 }, 0, 400), [
            { id: "dad.phone", to: { o: 0 }, dur: 100 }, { id: "seller.phone", to: { o: 0 }, dur: 100 },
            { id: "seller.open", to: { o: 0 }, dur: 100 }, { id: "seller.mouth", to: { o: 1 }, dur: 100 },
            { id: "shirin.card", to: { o: 0 }, dur: 100 },
            { id: "dad", to: { x: 70 }, at: 400, dur: 1600, ease: "linear" }
          ], B.hwalk("dad", 400, 1600, 3, true), B.hpose("shirin", "h-girl", { armF: [0.2, -12], head: 0 }, 0, 400), [
            { id: "shirin", to: { flip: 1 }, at: 1600, dur: 300 }
          ], B.hpose("dad", "h-dad", { upper: 30, armF: [10, -22], armB: [10.6, -23.4] }, 2100, 700),
            B.hpose("shirin", "h-girl", { armF: [7, -25], armB: [6.6, -24.6] }, 2200, 600), [
            { id: "heart1", to: { o: 1 }, at: 2900, dur: 400 }, { id: "heart1", path: "M64 40L62 30", at: 2900, dur: 1600 },
            { id: "heart2", to: { o: 1 }, at: 3300, dur: 400 }, { id: "heart2", path: "M72 34L74 24", at: 3300, dur: 1600 },
            { id: "shirin.eye", to: { o: 0 }, at: 2800, dur: 200 }, { id: "shirin.shut", to: { o: 1 }, at: 2800, dur: 200 }
          ]) }
        ] },
      { type: "choose", prompt: "اگر بزرگ‌ترت را در بازار گم کردی، اول چه کار می‌کنی؟", stack: true,
        options: ["🧍 همان‌جا می‌ایستم", "🚶 تنها راه می‌افتم و می‌روم خانه", "🙈 یک جا قایم می‌شوم"], answer: "🧍 همان‌جا می‌ایستم" },
      { type: "choose", prompt: "از چه کسی کمک می‌خواهی؟", stack: true,
        options: ["🏪 فروشنده‌ای که در مغازه است", "🚗 کسی که از توی ماشین صدایم می‌کند", "🚶 از هیچ‌کس؛ خودم دنبالش می‌گردم"],
        answer: "🏪 فروشنده‌ای که در مغازه است" },
      { type: "doit", pic: "☎️", text: "با بزرگ‌ترت تمرین کن. بلند بگو:", list: ["اسم کامل خودت", "اسم پدر یا مادرت", "شماره تلفن پدر یا مادرت"] },
      { type: "forparents",
        tips: [
          "قاعده ساده را بارها تکرار کنید: «اگر گم شدی، همان‌جا بایست. ما خودمان پیدایت می‌کنیم.»",
          "به کودک بگویید از چه کسی کمک بخواهد: فروشنده‌ای که در مغازه است، پلیس، یا خانمی که بچه همراهش است. با هیچ‌کس جایی نرود، حتی اگر بگوید «بیا پیش مامانت ببرمت».",
          "شماره تلفن خود را با آهنگ یا شعر به کودک یاد بدهید. می‌توانید آن را روی کارتی در جیب کودک هم بگذارید، نه جایی روی لباس که همه ببینند.",
          "در جای شلوغ، از اول یک جای قرار مشخص کنید: «اگر هم را گم کردیم، کنار همین در بزرگ.»",
          "وقتی دوباره کودک را پیدا کردید، دعوایش نکنید. بغلش کنید و بگویید چه کار درستی کرد."
        ] }
    ]
  },

  // ---------------- Health: Sapling ----------------
  {
    id: "health-sapling-1", subject: "health", level: "sapling", emoji: "🌙", title: "خواب، بازی و نرمش",
    steps: [
      /* A day: running, jumping and kicking a ball in the park, resting on a bench with a book, then asleep in bed
         (today's ball and book in a dream), the clock going from nine to seven, and waking up fresh.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "یک روز خوب", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, bench: { art: "h-bench", at: [118, 88], s: 1.3 }, ball: { art: "ball-side", at: [58, 88], s: 1.2 },
          kid: { art: "h-girl2", at: [-14, 88], s: 1.4 },
          room: { art: "h-bedroom", o: 0 }, win: { art: "h-window", at: [128, 24], o: 0 }, clock: { art: "h-clock", at: [30, 22], s: 1.2, o: 0 },
          bed: { art: "h-bed", at: [80, 88], s: 1.3, o: 0 }, sleeper: { art: "h-girl2", at: [96, 68.4], s: 1.3, r: -90, o: 0 },
          blanket: { art: "h-blanket", at: [80, 88], s: 1.3, o: 0 }, dream: { art: "h-dream", at: [64, 54], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "بدن ما هر روز بازی و تکان خوردن می‌خواهد: دویدن، پریدن، توپ‌بازی.", key: 4700, hold: 6600, do: [
            { id: "kid", to: { x: 34 }, dur: 1500, ease: "linear" }
          ].concat(B.hwalk("kid", 0, 1500, 3, true), B.hpose("kid", "h-girl2", { armF: [3, -33.5], armB: [1, -33.5] }, 1600, 300), [
            { id: "kid", path: "M34 88Q34 64 34 88", at: 1700, dur: 650 }, { id: "kid", path: "M34 88Q34 64 34 88", at: 2450, dur: 650 }
          ], B.hpose("kid", "h-girl2", { armF: [0.2, -12], armB: [0.2, -12] }, 3100, 300), [
            { id: "kid", to: { x: 50 }, at: 3300, dur: 600, ease: "linear" }
          ], B.hwalk("kid", 3300, 600, 1), [
            { id: "kid.legF", to: { r: -60 }, at: 4000, dur: 200 }, { id: "kid.legF", to: { r: 0 }, at: 4300, dur: 300 },
            { id: "ball", path: "M58 88Q100 36 146 86", at: 4150, dur: 1300, ease: "linear" }, { id: "ball", to: { r: 540 }, at: 4150, dur: 1300, ease: "linear" }
          ]) },
          { caption: "بعد از بازی، بدن کمی هم استراحت می‌خواهد.", key: 3600, hold: 6000, do: [
            { id: "kid", to: { x: 116 }, dur: 2000, ease: "linear" }
          ].concat(B.hwalk("kid", 0, 2000, 3), B.hpose("kid", "h-girl2", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 2100, 500), [
            { id: "kid", to: { y: 86.6 }, at: 2100, dur: 500 }, { id: "kid.book", to: { o: 1 }, at: 2700, dur: 300 },
            { id: "kid.upper", to: { sy: 1.03 }, at: 3000, dur: 3000, yoyo: true, times: 4, ease: "soft" }
          ], B.hpose("kid", "h-girl2", "book", 2600, 500)) },
          { caption: "شب، خوب می‌خوابیم. در خواب، بدن استراحت می‌کند و چیزهایی را که امروز یاد گرفتیم به یاد می‌سپارد.", key: 4400, hold: 7000, do: [
            { id: "room", to: { o: 1 }, dur: 700 }, { id: "win", to: { o: 1 }, dur: 700 }, { id: "win.night", to: { o: 1 }, dur: 1 },
            { id: "win.sun", to: { o: 0 }, dur: 1 }, { id: "win.moon", to: { o: 1 }, dur: 1 }, { id: "win.stars", to: { o: 1 }, dur: 1 },
            { id: "clock", to: { o: 1 }, dur: 700 }, { id: "clock.hour", to: { r: -90 }, dur: 1 },
            { id: "bed", to: { o: 1 }, dur: 700 }, { id: "sleeper", to: { o: 1 }, dur: 700 }, { id: "blanket", to: { o: 1 }, dur: 700 },
            { id: "sleeper.eye", to: { o: 0 }, dur: 1 }, { id: "sleeper.shut", to: { o: 1 }, dur: 1 },
            { id: "blanket", to: { sy: 1.06 }, at: 900, dur: 6000, yoyo: true, times: 6, ease: "soft" },
            { id: "dream", to: { o: 1 }, at: 2400, dur: 900 }, { id: "dream", to: { y: 52 }, at: 2400, dur: 4000, yoyo: true, times: 2 }
          ] },
          { caption: "هر شب سر یک ساعت می‌خوابیم و صبح سرحال بیدار می‌شویم.", key: 5600, hold: 6600, do: [
            { id: "dream", to: { o: 0 }, dur: 600 },
            { id: "clock.min", to: { r: 3600 }, at: 300, dur: 3000, ease: "linear" }, { id: "clock.hour", to: { r: 210 }, at: 300, dur: 3000, ease: "linear" },
            { id: "win.night", to: { o: 0 }, at: 1800, dur: 1200 }, { id: "win.moon", to: { o: 0 }, at: 1800, dur: 800 }, { id: "win.stars", to: { o: 0 }, at: 1800, dur: 800 },
            { id: "win.sun", to: { o: 1, y: 6 }, at: 1800, dur: 1 }, { id: "win.sun", to: { y: 0 }, at: 2000, dur: 1200 },
            { id: "sleeper.eye", to: { o: 1 }, at: 3500, dur: 200 }, { id: "sleeper.shut", to: { o: 0 }, at: 3500, dur: 200 },
            { id: "sleeper.upper", to: { r: 88 }, at: 3900, dur: 800 },
            { id: "sleeper.armF", to: { r: 175 }, at: 4800, dur: 600 }, { id: "sleeper.armB", to: { r: 165 }, at: 4800, dur: 600 },
            { id: "sleeper.mouth", to: { o: 0 }, at: 4800, dur: 200 }, { id: "sleeper.open", to: { o: 1 }, at: 4800, dur: 200 },
            { emit: "spark", where: [80, 34], spread: [26, 14], n: 8, at: 5200, dur: 800, life: 1300 }
          ] }
        ] },
      { type: "sort", prompt: "کدام تکان خوردن است و کدام استراحت؟ بدن ما هر دو را لازم دارد.",
        baskets: [{ label: "تکان خوردن", pic: "🏃", value: "move" }, { label: "استراحت", pic: "😌", value: "rest" }],
        items: [
          { pic: "🚲", label: "دوچرخه‌سواری", basket: "move" }, { pic: "⚽", label: "توپ‌بازی", basket: "move" }, { pic: "🪢", label: "طناب‌بازی", basket: "move" },
          { pic: "😴", label: "خواب", basket: "rest" }, { pic: "📖", label: "قصه شنیدن", basket: "rest" }, { pic: "🌷", label: "نفس آرام", basket: "rest" }
        ] },
      { type: "order", prompt: "کارهای شب را به ترتیب بچین", numbered: true,
        items: [{ pic: "🍲", label: "شام" }, { pic: "🪥", label: "مسواک" }, { pic: "📖", label: "قصه" }, { pic: "😴", label: "خواب" }] },
      { type: "choose", prompt: "پیش از خواب کدام بهتر است؟", options: ["📖 قصه شنیدن", "📱 بازی با گوشی"], answer: "📖 قصه شنیدن" },
      { type: "doit", pic: "🐇", text: "بیا کمی تکان بخوریم!", list: ["مثل خرگوش پنج بار بپر", "مثل درخت روی یک پا بایست", "مثل گربه کش بیا", "آرام بنشین و نفس بکش"] },
      { type: "forparents",
        tips: [
          "کودکان هر روز دست‌کم یک ساعت بازی پرتحرک لازم دارند، طوری که نفسشان کمی تند شود: دویدن، طناب‌بازی، دوچرخه، لی‌لی، کار در حیاط.",
          "کودکان بیشتر از بزرگ‌ترها خواب لازم دارند؛ بیشترشان شبی حدود ۱۰ ساعت. ساعت خواب و بیداری را هر روز، حتی روزهای تعطیل، تقریباً یکی نگه دارید.",
          "یک ساعت پیش از خواب، گوشی و تلویزیون را خاموش کنید. اتاق تاریک و آرام باشد. قصه یا لالایی کمک می‌کند.",
          "بعد از اتفاق‌های سخت، بیدار شدن شبانه یا ترس از تنها خوابیدن طبیعی است. کنار کودک بمانید و برنامه شب را ثابت نگه دارید. اگر چند هفته طول کشید، با پزشک یا مشاور حرف بزنید."
        ] }
    ]
  },
  {
    id: "health-sapling-2", subject: "health", level: "sapling", emoji: "💓", title: "احساس‌ها در بدن",
    steps: [
      /* One boy, four feelings, each shown where it is felt: a fast heart, a hot red face and fists, a heavy throat
         and a tear, a body so light it floats. Then all feelings are fine; breathe slowly and tell someone you love.
         Drawings: js/art/rig-health.js; the faces are js/art/feelings.js. */
      { type: "scene", prompt: "بدن ما با احساس‌ها چه می‌کند؟", bg: "#fdf3e1",
        parts: {
          kid: { art: "h-boy-front", at: [80, 88], s: 2 }, glow: { art: "h-breath", at: [80, 52], s: 0.1, o: 0 },
          heat: { art: "h-heat", at: [80, 20], o: 0 }, balloon: { art: "h-balloon", at: [112, 70], s: 1.2, o: 0 },
          f1: { art: "😨", at: [36, 34], s: 0.7, o: 0 }, f2: { art: "😠", at: [124, 34], s: 0.7, o: 0 },
          f3: { art: "😢", at: [36, 70], s: 0.7, o: 0 }, f4: { art: "😊", at: [124, 70], s: 0.7, o: 0 },
          mom: { art: "h-mom-home", at: [190, 88], s: 1.25, flip: true }, talk: { art: "h-talk", at: [84, 37.6], s: 1.4, o: 0 },
          heart: { art: "h-heart", at: [102, 30], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "وقتی می‌ترسیم، قلبمان تند تند می‌زند.", key: 2000, do: [
            { id: "kid.pupils", to: { o: 0 }, dur: 200 }, { id: "kid.wide", to: { o: 1 }, dur: 200 }, { id: "kid.browsHigh", to: { o: 1 }, dur: 200 },
            { id: "kid.mouth", to: { o: 0 }, dur: 200 }, { id: "kid.open", to: { o: 1, sy: 0.7 }, dur: 200 },
            { id: "kid.heart", to: { o: 1 }, at: 400, dur: 300 }, { id: "kid.heart", to: { s: 1.45 }, at: 700, dur: 3600, yoyo: true, times: 18 },
            { id: "kid", to: { x: "+0.6" }, at: 700, dur: 3600, yoyo: true, times: 24 }
          ] },
          { caption: "وقتی عصبانی هستیم، صورتمان داغ می‌شود و دست‌هایمان مشت می‌شود.", key: 2600, do: [
            { id: "kid.heart", to: { o: 0 }, dur: 300 }, { id: "kid.wide", to: { o: 0 }, dur: 200 }, { id: "kid.pupils", to: { o: 1 }, dur: 200 },
            { id: "kid.browsHigh", to: { o: 0 }, dur: 200 }, { id: "kid.open", to: { o: 0 }, dur: 200 },
            { id: "kid.browsDown", to: { o: 1 }, at: 200, dur: 200 }, { id: "kid.tight", to: { o: 1 }, at: 200, dur: 200 },
            { id: "kid.flush", to: { o: 1 }, at: 500, dur: 1200 }, { id: "heat", to: { o: 1 }, at: 900, dur: 400 }, { id: "heat", to: { y: 15 }, at: 900, dur: 3000, yoyo: true, times: 4 },
            { id: "kid.fistL", to: { o: 1 }, at: 1600, dur: 200 }, { id: "kid.fistR", to: { o: 1 }, at: 1600, dur: 200 },
            { id: "kid.foreL", to: { r: "-8" }, at: 2200, dur: 1800, yoyo: true, times: 8 }, { id: "kid.foreR", to: { r: "+8" }, at: 2200, dur: 1800, yoyo: true, times: 8 }
          ].concat(B.hpose("kid", "h-boy-front", { armL: [-7.4, -14.6], armR: [7.4, -14.6] }, 1400, 500)) },
          { caption: "وقتی غمگینیم، گلویمان سنگین می‌شود و شاید اشکمان بیاید.", key: 2600, do: [
            { id: "heat", to: { o: 0 }, dur: 300 }, { id: "kid.flush", to: { o: 0 }, dur: 600 }, { id: "kid.browsDown", to: { o: 0 }, dur: 200 },
            { id: "kid.tight", to: { o: 0 }, dur: 200 }, { id: "kid.fistL", to: { o: 0 }, dur: 200 }, { id: "kid.fistR", to: { o: 0 }, dur: 200 },
            { id: "kid.browsUp", to: { o: 1 }, at: 300, dur: 200 }, { id: "kid.sad", to: { o: 1 }, at: 300, dur: 200 }, { id: "kid.mouth", to: { o: 0 }, at: 300, dur: 200 },
            { id: "kid.head", to: { y: 0.8 }, at: 500, dur: 600 },
            { id: "kid.glowThroat", to: { o: 1 }, at: 800, dur: 600 }, { id: "kid.glowThroat", to: { s: 1.3 }, at: 1400, dur: 3000, yoyo: true, times: 4 },
            { id: "kid.tear", to: { o: 1 }, at: 1800, dur: 300 }, { id: "kid.tear", to: { y: 2.6 }, at: 2100, dur: 1400 }
          ].concat(B.hunpose("kid", "h-boy-front", 0, 500)) },
          { caption: "وقتی شادیم، بدنمان سبک می‌شود.", key: 1900, do: [
            { id: "kid.glowThroat", to: { o: 0 }, dur: 300 }, { id: "kid.tear", to: { o: 0 }, dur: 200 }, { id: "kid.browsUp", to: { o: 0 }, dur: 200 },
            { id: "kid.sad", to: { o: 0 }, dur: 200 }, { id: "kid.head", to: { y: 0 }, dur: 400 }, { id: "kid.grin", to: { o: 1 }, at: 200, dur: 200 },
            { id: "kid.glowAll", to: { o: 1 }, at: 500, dur: 600 },
            { id: "kid", to: { y: 80 }, at: 900, dur: 1000, ease: "soft" }, { id: "kid", to: { y: 84 }, at: 1900, dur: 1600, yoyo: true, times: 2, ease: "soft" },
            { id: "kid", to: { y: 88 }, at: 3600, dur: 900, ease: "soft" },
            { id: "balloon", to: { o: 1 }, at: 600, dur: 400 }, { id: "balloon", to: { y: 40 }, at: 900, dur: 3600, ease: "soft" }
          ].concat(B.hpose("kid", "h-boy-front", { armL: [-8, -25], armR: [8, -25] }, 900, 700), B.hunpose("kid", "h-boy-front", 3600, 700)) },
          { caption: "هر حسی که داریم طبیعی است.", key: 2600, do: [
            { id: "balloon", to: { o: 0 }, dur: 400 }, { id: "kid.glowAll", to: { o: 0 }, dur: 600 },
            { id: "kid.grin", to: { o: 0 }, dur: 200 }, { id: "kid.mouth", to: { o: 1 }, dur: 200 },
            { id: "f1", to: { o: 1 }, at: 500, dur: 400 }, { id: "f2", to: { o: 1 }, at: 900, dur: 400 }, { id: "f3", to: { o: 1 }, at: 1300, dur: 400 }, { id: "f4", to: { o: 1 }, at: 1700, dur: 400 },
            { id: "f1", to: { s: 0.8 }, at: 2200, dur: 1200, yoyo: true, times: 2 }, { id: "f2", to: { s: 0.8 }, at: 2400, dur: 1200, yoyo: true, times: 2 },
            { id: "f3", to: { s: 0.8 }, at: 2600, dur: 1200, yoyo: true, times: 2 }, { id: "f4", to: { s: 0.8 }, at: 2800, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "وقتی حسی خیلی بزرگ است، آرام نفس می‌کشیم.", key: 3200, hold: 7600, do: [
            { id: "f1", to: { o: 0 }, dur: 400 }, { id: "f2", to: { o: 0 }, dur: 400 }, { id: "f3", to: { o: 0 }, dur: 400 }, { id: "f4", to: { o: 0 }, dur: 400 },
            { id: "kid.pupils", to: { o: 0 }, at: 300, dur: 200 }, { id: "kid.shut", to: { o: 1 }, at: 300, dur: 200 },
            { id: "glow", to: { o: 1, s: 1.4 }, at: 500, dur: 3000, ease: "soft" }, { id: "glow", to: { s: 2.6 }, at: 3500, dur: 3000, ease: "soft" },
            { id: "kid", to: { sy: 1.03 }, at: 500, dur: 6000, yoyo: true, times: 4, ease: "soft" },
            { id: "kid.pupils", to: { o: 1 }, at: 6800, dur: 200 }, { id: "kid.shut", to: { o: 0 }, at: 6800, dur: 200 }
          ] },
          { caption: "و به کسی که دوستش داریم می‌گوییم.", key: 4400, hold: 6400, do: [
            { id: "glow", to: { o: 0, s: 0.1 }, dur: 600 },
            { id: "kid", to: { x: 62 }, at: 300, dur: 900 }, { id: "talk", to: { x: 66 }, at: 300, dur: 1 },
            { id: "mom", to: { x: 112 }, at: 300, dur: 2000, ease: "linear" }
          ].concat(B.hwalk("mom", 300, 2000, 3), B.hpose("mom", "h-mom-home", { upper: 16, armF: [7, -27] }, 2400, 700), [
            { id: "kid.mouth", to: { o: 0 }, at: 2800, dur: 100 }, { id: "kid.open", to: { o: 1, sy: 1 }, at: 2800, dur: 100 },
            { id: "kid.open", to: { sy: 0.4 }, at: 2900, dur: 2600, yoyo: true, times: 8 },
            { id: "talk", to: { o: 1 }, at: 2900, dur: 300 }, { id: "talk", to: { s: 1.8 }, at: 2900, dur: 2600, yoyo: true, times: 6 },
            { id: "mom.head", to: { r: 10 }, at: 3400, dur: 1400, yoyo: true, times: 4 },
            { id: "heart", to: { o: 1 }, at: 5000, dur: 400 }, { id: "heart", to: { s: 1 }, at: 5000, dur: 600, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "pairs", prompt: "مثل قصه، هر حس را با نشانه‌اش در بدن جفت کن",
        pairs: [[{ pic: "😨", say: "ترس" }, { pic: "💓", say: "قلبم تند می‌زند" }], [{ pic: "😠", say: "عصبانیت" }, { pic: "✊", say: "دستم مشت می‌شود" }],
          [{ pic: "😢", say: "غم" }, { pic: "💧", say: "اشکم می‌آید" }], [{ pic: "😊", say: "شادی" }, { pic: "🎈", say: "بدنم سبک می‌شود" }]] },
      { type: "breathe", cycles: 3 },
      { type: "choose", prompt: "وقتی حسی خیلی بزرگ است، چه کاری به بدنمان کمک می‌کند؟", stack: true,
        options: ["🌷 آرام و عمیق نفس می‌کشم", "😤 نفسم را نگه می‌دارم", "💨 تند تند نفس می‌کشم"], answer: "🌷 آرام و عمیق نفس می‌کشم" },
      { type: "doit", pic: "🤲", text: "دستت را روی قلبت بگذار. حسش می‌کنی؟ حالا آرام نفس بکش و ببین قلبت چه می‌کند." },
      { type: "forparents",
        tips: [
          "به کودک کمک کنید اسم حسش را پیدا کند: «انگار ترسیدی. قلبت تند می‌زند؟» حس‌ها را درست یا غلط ندانید؛ رفتار است که گاهی باید عوض شود.",
          "بعد از تجربه‌های سخت مثل جنگ، زلزله یا از دست دادن عزیزان، دل‌درد، سردرد، کابوس، شب‌ادراری یا چسبیدن به والدین در کودکان زیاد دیده می‌شود. معمولاً با آرامش، برنامه روزانه ثابت و نزدیکی شما کم می‌شود.",
          "اگر این نشانه‌ها چند هفته ادامه پیدا کرد یا زندگی روزانه کودک (خواب، غذا، بازی) را به هم زد، با پزشک، مرکز بهداشت یا یک روان‌شناس کودک مشورت کنید.",
          "درس‌های «احساس‌های من» در صفحه اصلی، تمرین نفس آرام دارند. هر وقت لازم شد با هم انجامشان دهید."
        ] }
    ]
  },
  {
    id: "health-sapling-3", subject: "health", level: "sapling", emoji: "🤝", title: "لمس خوب، راز خوب",
    steps: [
      /* Calm and plain, nobody shown doing harm: the parts the underwear covers glow softly; a hand up and a space
         that is hers; a present kept for Mum's birthday and given the next day; a worry cloud with a lock that opens
         when she tells; one grown-up is busy on the phone, so she tells another, who listens and hugs her.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, space: { art: "h-space", at: [56, 61], s: 1.25, o: 0 },
          gift: { art: "h-gift", at: [32, 88], s: 1.3, o: 0 },
          kid: { art: "h-girl-front", at: [56, 88], s: 1.6 }, cloud: { art: "h-cloud", at: [56, 22], s: 1.3, o: 0 },
          dad: { art: "h-dad", at: [88, 88], s: 1.2, o: 0 }, gran: { art: "h-gran", at: [146, 88], s: 1.2, flip: true, o: 0 },
          kidS: { art: "h-girl", at: [56, 88], s: 1.45, o: 0 }, cloudS: { art: "h-cloud", at: [2, -42], s: 0.9, under: "kidS", o: 0 },
          mom: { art: "h-mom-home", at: [192, 88], s: 1.4, flip: true },
          talk: { art: "h-talk", at: [79, 51.6], s: 1.3, o: 0 }, heart: { art: "h-heart", at: [134, 20], o: 0 }
        },
        scenes: [
          { caption: "یادت هست؟ جاهایی که لباس زیر می‌پوشاند، جاهای خصوصی بدن توست.", key: 2600, do: [
            { id: "kid.private", to: { o: 1 }, at: 600, dur: 700 }, { id: "kid.private", to: { s: 1.12 }, at: 1400, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "کسی نباید به جاهای خصوصی تو دست بزند، و کسی نباید از تو بخواهد به جاهای خصوصی او دست بزنی.", key: 2400, do: [
            { id: "kid.palmR", to: { o: 1 }, at: 300, dur: 200 }, { id: "kid.handR", to: { o: 0 }, at: 300, dur: 200 },
            { id: "space", to: { o: 1 }, at: 900, dur: 800 }, { id: "space", to: { s: 1.32 }, at: 1700, dur: 2400, yoyo: true, times: 2 }
          ].concat(B.hpose("kid", "h-girl-front", "stop", 200, 600)) },
          { caption: "بعضی رازها خوب‌اند: مثل هدیه تولد مامان که فردا به او می‌دهیم. راز خوب زود گفته می‌شود و همه را شاد می‌کند.", key: 6200, hold: 8200, do: [
            { id: "space", to: { o: 0 }, dur: 500 }, { id: "kid.private", to: { o: 0 }, dur: 500 },
            { id: "kid.palmR", to: { o: 0 }, dur: 200 }, { id: "kid.handR", to: { o: 1 }, dur: 200 },
            { id: "gift", to: { o: 1 }, at: 400, dur: 400 },
            { id: "kid.mouth", to: { o: 0 }, at: 900, dur: 200 }, { id: "kid.grin", to: { o: 1 }, at: 900, dur: 200 },
            { id: "mom", to: { x: 100 }, at: 3000, dur: 2000, ease: "linear" }
          ].concat(B.hpose("kid", "h-girl-front", { armR: [0.2, -12], armL: [-0.2, -24.4, -1] }, 400, 600), B.hwalk("mom", 3000, 2000, 3),
            B.hpose("kid", "h-girl-front", "give", 5000, 500), B.hpose("mom", "h-mom-home", { armF: [9.6, -27], armB: [9.6, -26] }, 5100, 500), [
            { id: "gift", path: "M32 88Q60 40 86.6 53", at: 5100, dur: 900 },
            { id: "mom.mouth", to: { o: 0 }, at: 6000, dur: 100 }, { id: "mom.open", to: { o: 1 }, at: 6000, dur: 100 },
            { emit: "spark", where: [86, 46], spread: [24, 16], n: 10, at: 6000, dur: 800, life: 1300 }
          ]) },
          { caption: "بعضی رازها بدند: رازی که نگرانت می‌کند، و کسی می‌گوید هیچ‌وقت به کسی نگو. راز بد را باید گفت.", key: 3600, hold: 7600, do: [
            { id: "gift", to: { o: 0 }, dur: 400 }, { id: "mom.open", to: { o: 0 }, dur: 100 }, { id: "mom.mouth", to: { o: 1 }, dur: 100 },
            { id: "mom", to: { flip: 1 }, at: 300, dur: 300 }, { id: "mom", to: { x: 194 }, at: 600, dur: 2000, ease: "linear" }
          ].concat(B.hunpose("mom", "h-mom-home", 0, 400), B.hwalk("mom", 600, 2000, 3), B.hunpose("kid", "h-girl-front", 0, 500), [
            { id: "kid.grin", to: { o: 0 }, at: 1800, dur: 200 }, { id: "kid.sad", to: { o: 1 }, at: 1800, dur: 200 }, { id: "kid.browsUp", to: { o: 1 }, at: 1800, dur: 200 },
            { id: "cloud", to: { o: 1 }, at: 2200, dur: 800 }, { id: "cloud", to: { y: 25 }, at: 3000, dur: 4400, yoyo: true, times: 4, ease: "soft" }
          ]) },
          { caption: "به بزرگ‌تری که به او اعتماد داری بگو. اگر گوش نداد، به یک بزرگ‌تر دیگر بگو، تا وقتی کسی کمکت کند.", key: 7600, hold: 10000, do: [
            { id: "kid", to: { o: 0 }, dur: 500 }, { id: "cloud", to: { o: 0 }, dur: 500 },
            { id: "kidS", to: { o: 1 }, dur: 500 }, { id: "cloudS", to: { o: 1 }, dur: 500 },
            { id: "dad", to: { o: 1 }, at: 200, dur: 600 }, { id: "gran", to: { o: 1 }, at: 200, dur: 600 }, { id: "dad.phone", to: { o: 1 }, dur: 1 },
            { id: "kidS.eye", to: { o: 1 }, dur: 1 },
            { id: "kidS", to: { x: 72 }, at: 900, dur: 1000, ease: "linear" }
          ].concat(B.hpose("dad", "h-dad", "ear", 0, 1), B.hwalk("kidS", 900, 1000, 2), [
            { id: "kidS.head", to: { r: -8 }, at: 2200, dur: 300 },
            { id: "kidS.mouth", to: { o: 0 }, at: 2300, dur: 100 }, { id: "kidS.open", to: { o: 1 }, at: 2300, dur: 100 },
            { id: "kidS.open", to: { sy: 0.4 }, at: 2400, dur: 1800, yoyo: true, times: 6 },
            { id: "talk", to: { o: 1 }, at: 2400, dur: 300 }, { id: "talk", to: { o: 0 }, at: 4100, dur: 300 },
            { id: "dad.mouth", to: { o: 0 }, at: 2400, dur: 100 }, { id: "dad.open", to: { o: 1 }, at: 2400, dur: 100 },
            { id: "dad.open", to: { sy: 0.4 }, at: 2500, dur: 2400, yoyo: true, times: 8 },
            { id: "kidS.head", to: { r: 0 }, at: 4300, dur: 300 },
            { id: "kidS", to: { x: 118 }, at: 4500, dur: 1300, ease: "linear" },
            { id: "talk", path: "M79 51.6L125 51.6", at: 4500, dur: 1 },
            { id: "kidS.head", to: { r: -10 }, at: 5900, dur: 300 }, { id: "talk", to: { o: 1 }, at: 6000, dur: 300 },
            { id: "kidS.open", to: { sy: 0.4 }, at: 6000, dur: 2000, yoyo: true, times: 6 },
            { id: "gran.head", to: { r: 12 }, at: 6400, dur: 1600, yoyo: true, times: 4 },
            { id: "cloudS.shackle", to: { y: -1.6, r: 30 }, at: 7400, dur: 500 }, { id: "cloudS", to: { o: 0 }, at: 8600, dur: 900 },
            { id: "talk", to: { o: 0 }, at: 8100, dur: 300 }, { id: "kidS.open", to: { o: 0 }, at: 8100, dur: 100 }, { id: "kidS.mouth", to: { o: 1 }, at: 8100, dur: 100 }
          ], B.hwalk("kidS", 4500, 1300, 2), B.hpose("gran", "h-gran", { upper: 18, armF: [16, -27] }, 6200, 700)) },
          { caption: "تقصیر تو نیست. هر وقت بگویی، دیر نیست.", key: 2600, do: B.hpose("gran", "h-gran", { upper: 26, armF: [14.4, -24], armB: [14.4, -25] }, 0, 700).concat(
            B.hpose("kidS", "h-girl", { armF: [7.4, -26], armB: [7, -25.4], head: -6 }, 200, 600), [
            { id: "dad", to: { o: 0 }, dur: 600 }, { id: "kidS", to: { x: 124 }, dur: 600 },
            { id: "kidS.eye", to: { o: 0 }, at: 900, dur: 200 }, { id: "kidS.shut", to: { o: 1 }, at: 900, dur: 200 },
            { id: "heart", to: { o: 1 }, at: 1200, dur: 500 }, { id: "heart", to: { s: 1.25 }, at: 1700, dur: 1400, yoyo: true, times: 4 }
          ]) }
        ] },
      { type: "sort", prompt: "کدام لمس خوب است؟ کدام را باید گفت «نه!»؟",
        baskets: [{ label: "لمس خوب", pic: "😊", value: "ok" }, { label: "نه!", pic: "✋", say: "نه! به بزرگ‌تر می‌گویم", value: "no" }],
        items: [
          { pic: "🤗", label: "بغلی که دوست دارم", say: "بغل مادربزرگ، وقتی خودم دوست دارم", basket: "ok" },
          { pic: "🖐️", label: "بزن قدش", say: "بزن قدش با دوستم", basket: "ok" },
          { pic: "🩺", label: "معاینه دکتر", say: "معاینه دکتر، وقتی مامان یا بابا کنارم هستند", basket: "ok" },
          { pic: "🙅", label: "دست زدن به جای خصوصی", say: "کسی بخواهد به جاهای خصوصی‌ام دست بزند", basket: "no" },
          { pic: "😣", label: "لمسی که حالم را بد می‌کند", say: "لمسی که دردم می‌آورد یا حالم را بد می‌کند", basket: "no" },
          { pic: "🤫", label: "لمسی که باید راز بماند", say: "کسی بگوید این لمس باید راز بماند", basket: "no" }
        ] },
      { type: "sort", prompt: "کدام راز خوب است و کدام راز بد؟",
        baskets: [{ label: "راز خوب", pic: "🎁", value: "good" }, { label: "راز بد", pic: "🗣️", say: "راز بد، باید آن را گفت", value: "tell" }],
        items: [
          { pic: "🎂", label: "جشن غافلگیری", say: "جشن تولد پدربزرگ که قرار است غافلگیرش کنیم", basket: "good" },
          { pic: "🎁", label: "هدیه تولد خواهرم", say: "نقاشی‌ای که برای تولد خواهرم کشیده‌ام و فردا به او می‌دهم", basket: "good" },
          { pic: "😟", label: "رازی که نگرانم می‌کند", say: "کسی بگوید این راز ماست، به مامانت نگو، و من نگرانم", basket: "tell" },
          { pic: "📷", label: "عکس پنهانی از بدنم", say: "کسی بخواهد از بدنم عکس بگیرد و بگوید به کسی نگو", basket: "tell" }
        ] },
      { type: "choose", prompt: "به بزرگ‌تری گفتی، ولی گوش نداد. حالا چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به یک بزرگ‌تر دیگر می‌گویم", "🤐 دیگر به هیچ‌کس نمی‌گویم"], answer: "🗣️ به یک بزرگ‌تر دیگر می‌گویم" },
      { type: "doit", pic: "🖐️", text: "دست اعتماد: با بزرگ‌ترت روی پنج انگشتت، پنج نفر را بشمار که می‌توانی هر چیزی را به آن‌ها بگویی." },
      { type: "forparents",
        text: "تو می‌توانی هر چیزی را به ما بگویی. ما همیشه گوش می‌دهیم.",
        tips: [
          "این درس را با کودک ببینید و بعد با زبان خودتان تکرارش کنید. لحن آرام و معمولی بهتر از هشدار و ترساندن است.",
          "بیشتر آسیب‌ها از طرف غریبه نیست، از طرف کسی است که کودک او را می‌شناسد. برای همین به جای «از غریبه‌ها بترس»، قاعده را یاد بدهید: هیچ‌کس، هر کسی که باشد.",
          "فرق راز خوب و بد را با مثال‌های روزمره تمرین کنید. در خانه به جای «راز»، از «غافلگیری» برای هدیه و جشن استفاده کنید؛ غافلگیری زود گفته می‌شود.",
          "«دست اعتماد» کودک را با هم بنویسید: پنج بزرگ‌تری که کودک می‌تواند به آن‌ها پناه ببرد، دست‌کم یکی بیرون از خانه (مثلاً معلم).",
          "اگر کودک چیزی گفت: آرام بمانید، حرفش را باور کنید، از او تشکر کنید، بگویید تقصیر او نیست و قول ندهید که به کسی نمی‌گویید. بخش «ایمنی بدن» در راهنمای والدین می‌گوید از کجا کمک بگیرید."
        ] }
    ]
  },
  {
    id: "health-sapling-4", subject: "health", level: "sapling", emoji: "🚒", title: "آتش و گرما",
    steps: [
      /* Calm, practical, nobody hurt: Mum cooks, the pot and the samovar steam; Taraneh steps back from them and
         keeps her hands behind her back; she finds matches and tells Mum; smoke under the ceiling, so she crawls low
         to the door, past her teddy and the bed, and out; outside, Mum phones ۱۲۵ and the fire engine comes. Then
         «بایست، بخواب، غلت بزن» as a practice, with no fire at all. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, table: { art: "h-table", at: [64, 88], s: 1.2 }, samovar: { art: "h-samovar", at: [64, 65.2], s: 1.3 },
          stove: { art: "h-stove", at: [116, 88], s: 1.2 }, steamP: { art: "h-steam", at: [116, 40], o: 0.8 }, steamS: { art: "h-steam", at: [69, 31] },
          mom: { art: "h-mom-home", at: [97, 88], s: 1.25 }, matches: { art: "h-matches", at: [40, 87], s: 1.1, o: 0 },
          room: { art: "h-room", o: 0 }, door: { art: "h-door", at: [128, 62], o: 0 }, bed: { art: "h-bed", at: [76, 80], s: 1.1, o: 0 },
          teddy: { art: "🧸", at: [36, 84], s: 0.5, o: 0 }, smoke: { art: "h-smoke", at: [0, -36], o: 0 },
          mom2: { art: "h-mom-home", at: [190, 88], s: 1.25, flip: true },
          outside: { art: "h-outside", o: 0 }, truck: { art: "🚒", at: [196, 74], s: 1.4 },
          momOut: { art: "h-mom", at: [70, 88], s: 1.2, flip: true, o: 0 }, sign: { art: "h-number", at: [92, 26], o: 0 },
          kid: { art: "h-girl", at: [-14, 88], s: 1.4 }, spot: { art: "h-spot", at: [0, 0], s: 0.8, under: "kid", o: 0 },
          talk: { art: "h-talk", at: [38.4, 52.6], s: 1.2, o: 0 }, num: { art: "counter", at: [146, 14], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "مادر شام می‌پزد. اجاق، قابلمه، سماور و قوری چای داغ‌اند.", key: 2400, do: B.hpose("mom", "h-mom-home", "stir", 0, 1).concat([
            { id: "mom.ladle", to: { o: 1 }, dur: 1 },
            { id: "mom.foreF", to: { r: "+10" }, at: 300, dur: 4000, yoyo: true, times: 10 },
            { id: "stove.flame", to: { sy: 1.25 }, dur: 4200, yoyo: true, times: 14 },
            { id: "stove.lid", to: { y: -0.6 }, at: 400, dur: 3600, yoyo: true, times: 12 },
            { id: "steamP", to: { y: "-2", o: 0.4 }, dur: 4200, yoyo: true, times: 4 },
            { id: "steamS", to: { y: "-2", o: 0.4 }, at: 300, dur: 4200, yoyo: true, times: 4 }
          ]) },
          { caption: "ترانه یک قدم بزرگ دور از اجاق و سماور می‌ایستد و به آن‌ها دست نمی‌زند.", key: 4600, hold: 6000, do: [
            { id: "mom.foreF", to: { r: "+10" }, dur: 5000, yoyo: true, times: 12 },
            { id: "kid", to: { x: 46 }, dur: 1800, ease: "linear" }
          ].concat(B.hwalk("kid", 0, 1800, 3), [
            { id: "kid", path: "M46 88Q38 84 30 88", at: 2300, dur: 700 },
            { id: "kid.legB", to: { r: 32 }, at: 2300, dur: 350 }, { id: "kid.legF", to: { r: -14 }, at: 2300, dur: 350 },
            { id: "kid.legB", to: { r: 0 }, at: 2650, dur: 350 }, { id: "kid.legF", to: { r: 0 }, at: 2650, dur: 350 },
            { id: "spot", to: { o: 1 }, at: 3100, dur: 500 }
          ], B.hpose("kid", "h-girl", { armF: [-3.6, -13], armB: [-3.6, -13] }, 3200, 500)) },
          { caption: "کبریت و فندک مال بزرگ‌ترهاست، نه برای بازی. اگر یکی پیدا کردیم، به آن دست نمی‌زنیم و به بزرگ‌تر می‌گوییم.", key: 5400, hold: 7200, do: [
            { id: "spot", to: { o: 0 }, dur: 400 }, { id: "matches", to: { o: 1 }, at: 300, dur: 500 },
            { id: "kid.head", to: { r: 26 }, at: 900, dur: 500 }, { id: "kid.head", to: { r: 0 }, at: 2400, dur: 400 },
            { id: "mom.ladle", to: { o: 0 }, at: 2800, dur: 100 },
            { id: "kid.mouth", to: { o: 0 }, at: 2900, dur: 100 }, { id: "kid.open", to: { o: 1 }, at: 2900, dur: 100 },
            { id: "kid.open", to: { sy: 0.4 }, at: 3000, dur: 3000, yoyo: true, times: 10 },
            { id: "talk", to: { o: 1 }, at: 3000, dur: 300 }, { id: "talk", to: { s: 1.6 }, at: 3000, dur: 3000, yoyo: true, times: 6 },
            { id: "mom", to: { flip: -1 }, at: 3200, dur: 300 }, { id: "mom", to: { x: 48 }, at: 3600, dur: 1800, ease: "linear" },
            { id: "mom.head", to: { r: 12 }, at: 5300, dur: 1400, yoyo: true, times: 4 }
          ].concat(B.hunpose("mom", "h-mom-home", 2800, 500), B.hwalk("mom", 3600, 1800, 3)) },
          { caption: "اگر دود دیدیم یا بوی دود آمد، خم می‌شویم و پایین می‌مانیم. هوای پایین تمیزتر است.", key: 4600, hold: 6400, do: [
            { id: "talk", to: { o: 0 }, dur: 300 }, { id: "kid.open", to: { o: 0 }, dur: 100 }, { id: "kid.mouth", to: { o: 1 }, dur: 100 },
            { id: "room", to: { o: 1 }, dur: 700 }, { id: "door", to: { o: 1 }, dur: 700 }, { id: "bed", to: { o: 1 }, dur: 700 }, { id: "teddy", to: { o: 1 }, dur: 700 },
            { id: "kid", to: { x: 24 }, dur: 1 }, { id: "mom", to: { o: 0 }, dur: 1 }, { id: "matches", to: { o: 0 }, dur: 1 },
            { id: "smoke", to: { o: 1 }, at: 800, dur: 1200 }, { id: "smoke", to: { y: 0 }, at: 800, dur: 2600, ease: "out" },
            { id: "kid.head", to: { r: -20 }, at: 1600, dur: 500 },
            { id: "kid", to: { y: 96.5 }, at: 3000, dur: 700 }
          ].concat(B.hpose("kid", "h-girl", { upper: 80, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10, -6.9], armB: [9, -6.9], head: -60 }, 3000, 700), [
            { id: "kid", to: { x: 44 }, at: 3900, dur: 2200, ease: "linear" },
            { id: "kid.armF", to: { r: "+14" }, at: 3900, dur: 2200, yoyo: true, times: 6 }, { id: "kid.legB", to: { r: -14 }, at: 3900, dur: 2200, yoyo: true, times: 6 }
          ]) },
          { caption: "زود از خانه بیرون می‌رویم. قایم نمی‌شویم و برای برداشتن اسباب‌بازی برنمی‌گردیم.", key: 2000, hold: 6400, do: [
            { id: "kid", to: { x: 124 }, dur: 4600, ease: "linear" },
            { id: "kid.armF", to: { r: "+14" }, dur: 4600, yoyo: true, times: 12 }, { id: "kid.legB", to: { r: -14 }, dur: 4600, yoyo: true, times: 12 },
            { id: "kid.head", to: { r: -110 }, at: 1200, dur: 400 }, { id: "kid.head", to: { r: -60 }, at: 2400, dur: 400 },
            { id: "door.leaf", to: { sx: 0.15 }, at: 3600, dur: 700 },
            { id: "kid", path: "M124 96.5L138 74", at: 4700, dur: 900 }, { id: "kid", to: { s: 1.05, o: 0 }, at: 4800, dur: 800 }
          ] },
          { caption: "بیرون از خانه، به بزرگ‌ترها خبر می‌دهیم. آن‌ها به آتش‌نشانی زنگ می‌زنند: ۱۲۵.", key: 5200, hold: 7000, do: [
            { id: "outside", to: { o: 1 }, dur: 700 }, { id: "smoke", to: { o: 0 }, dur: 700 }, { id: "momOut", to: { o: 1 }, dur: 700 },
            { id: "kid", to: { x: 44, y: 88, s: 1.4, o: 1 }, at: 300, dur: 1 }
          ].concat(B.hunpose("kid", "h-girl", 300, 1), [
            { id: "kid.mouth", to: { o: 0 }, at: 900, dur: 100 }, { id: "kid.open", to: { o: 1 }, at: 900, dur: 100 },
            { id: "kid.open", to: { sy: 0.4 }, at: 1000, dur: 1800, yoyo: true, times: 6 },
            { id: "talk", path: "M38.4 52.6L51.4 52.6", at: 900, dur: 1 }, { id: "talk", to: { o: 1, s: 1.2 }, at: 1000, dur: 300 }, { id: "talk", to: { o: 0 }, at: 2800, dur: 300 },
            { id: "kid.open", to: { o: 0 }, at: 2900, dur: 100 }, { id: "kid.mouth", to: { o: 1 }, at: 2900, dur: 100 },
            { id: "momOut.phone", to: { o: 1 }, at: 3100, dur: 200 },
            { id: "sign", to: { o: 1 }, at: 3500, dur: 400 }, { count: "sign", from: 125, to: 125, at: 3500, dur: 1 },
            { id: "sign", to: { s: 1.2 }, at: 3900, dur: 1200, yoyo: true, times: 2 },
            { id: "truck", to: { x: 130 }, at: 3800, dur: 2200, ease: "out" }
          ], B.hpose("momOut", "h-mom", "ear", 3000, 500)) },
          { caption: "اگر لباسمان آتش گرفت، نمی‌دویم. بیا تمرین کنیم. یک: همان‌جا می‌ایستیم.", key: 2400, do: [
            { id: "outside", to: { o: 0 }, dur: 700 }, { id: "momOut", to: { o: 0 }, dur: 700 }, { id: "sign", to: { o: 0 }, dur: 500 }, { id: "truck", to: { o: 0 }, dur: 500 },
            { id: "door.leaf", to: { sx: 1 }, dur: 1 }, { id: "bed", to: { o: 0 }, dur: 500 }, { id: "teddy", to: { o: 0 }, dur: 500 },
            { id: "kid", to: { x: 86 }, at: 400, dur: 1 },
            { id: "num", to: { o: 1 }, at: 800, dur: 400 }, { count: "num", from: 1, to: 1, at: 800, dur: 1 },
            { id: "spot", to: { o: 1 }, at: 1300, dur: 500 }, { id: "spot", to: { s: 1 }, at: 1800, dur: 1600, yoyo: true, times: 2 }
          ].concat(B.hpose("momOut", "h-mom", { armF: [0.2, -21], head: 0 }, 0, 1), [{ id: "momOut.phone", to: { o: 0 }, dur: 1 }]) },
          { caption: "دو: روی زمین دراز می‌کشیم و صورتمان را با دست‌ها می‌پوشانیم.", key: 2600, do: [
            { id: "spot", to: { o: 0 }, dur: 300 }, { count: "num", from: 2, to: 2, dur: 1 },
            { id: "kid", to: { y: 96.5 }, dur: 600 }
          ].concat(B.hpose("kid", "h-girl", { legF: 0, shinF: 90, legB: 0, shinB: 90 }, 0, 600), [
            { id: "kid", to: { r: -90, y: 83.2 }, at: 800, dur: 900 }
          ], B.hpose("kid", "h-girl", { legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [5.6, -27.6, -1], armB: [5.2, -27, -1] }, 800, 900)) },
          { caption: "سه: آن‌قدر غلت می‌زنیم تا آتش خاموش شود.", key: 700, do: [
            { count: "num", from: 3, to: 3, dur: 1 },
            { id: "kid", to: { sx: -1 }, at: 300, dur: 4000, yoyo: true, times: 8 },
            { id: "kid", to: { y: 81.6 }, at: 300, dur: 4000, yoyo: true, times: 16 }
          ] },
          { caption: "بعد بلند می‌شویم و به بزرگ‌ترها خبر می‌دهیم.", key: 4400, hold: 6400, do: [
            { id: "num", to: { o: 0 }, dur: 400 },
            { id: "kid", to: { r: 0, y: 88 }, at: 200, dur: 900 }
          ].concat(B.hunpose("kid", "h-girl", 200, 900), [
            { id: "mom2", to: { x: 116 }, at: 600, dur: 1600, ease: "linear" }
          ], B.hwalk("mom2", 600, 1600, 3), [
            { id: "kid.mouth", to: { o: 0 }, at: 2600, dur: 100 }, { id: "kid.open", to: { o: 1 }, at: 2600, dur: 100 },
            { id: "kid.open", to: { sy: 0.4 }, at: 2700, dur: 2400, yoyo: true, times: 8 },
            { id: "talk", path: "M51.4 52.6L93.4 52.6", at: 2600, dur: 1 }, { id: "talk", to: { o: 1 }, at: 2700, dur: 300 },
            { id: "mom2.head", to: { r: 12 }, at: 3200, dur: 1600, yoyo: true, times: 4 }
          ]) }
        ] },
      { type: "order", prompt: "اگر دود دیدی، چه کار می‌کنی؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "🧎", label: "پایین بمان" }, { pic: "🚪", label: "بیرون برو" }, { pic: "🗣️", label: "خبر بده", say: "به بزرگ‌تر خبر بده" }, { pic: "☎️", label: "۱۲۵", say: "زنگ به صد و بیست و پنج" }] },
      { type: "order", prompt: "اگر لباست آتش گرفت، چه کار می‌کنی؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "🧍", label: "بایست" }, { pic: "⬇️", label: "بخواب" }, { pic: "🔄", label: "غلت بزن" }] },
      { type: "doit", pic: "🔄", text: "حالا با بزرگ‌ترت روی فرش یا تشک تمرین کن:",
        list: ["بایست", "بخواب و صورتت را با دست‌ها بپوشان", "غلت بزن، غلت بزن، غلت بزن"] },
      { type: "doit", pic: "🚪", text: "با بزرگ‌ترت در خانه بگرد: از کدام درها می‌شود بیرون رفت؟ بیرون از خانه، کجا همدیگر را پیدا می‌کنیم؟" },
      { type: "forparents",
        tips: [
          "در آشپزخانه یک «جای امن» یک‌متری دور از اجاق، سماور و بخاری برای کودک درست کنید. سماور و قوری را دور از لبه میز و سفره بگذارید و سیمش را از دسترس کودک دور نگه دارید.",
          "کبریت و فندک را بالا و دور از دست کودک نگه دارید. شمع، اجاق روشن و بخاری را هیچ‌وقت بی‌مراقب نگذارید. پرده، لباس و رختخواب را دست‌کم یک متر دور از بخاری نگه دارید و رخت را روی بخاری خشک نکنید.",
          "دستگاه هشدار دود نصب کنید و هر ماه امتحانش کنید. بخاری گازی و آبگرمکن دودکش سالم لازم دارند؛ دستگاه هشدار گاز گرفتگی (مونوکسید کربن) هم جان خانواده را نجات می‌دهد.",
          "یک نقشه فرار خانوادگی بکشید: دو راه بیرون رفتن از هر اتاق و یک جای قرار بیرون از خانه. سالی دو بار با هم تمرینش کنید. بیرون که رفتید، بیرون بمانید و از همان‌جا به ۱۲۵ زنگ بزنید.",
          "«بایست، بخواب، غلت بزن» فقط برای وقتی است که لباس آتش بگیرد. بعد، جای سوختگی را ۲۰ دقیقه زیر آب خنک (نه یخ) بگیرید و به پزشک بروید.",
          "این درس را مثل یک بازی آرام و در روز تمرین کنید، بدون قصه‌های ترسناک. اگر کودک قبلاً آتش‌سوزی دیده است یا نگران می‌شود، اصرار نکنید؛ بغلش کنید و بگویید بزرگ‌ترها مراقب خانه هستند."
        ] }
    ]
  },

  // ---------------- Health: for every garden ----------------
  {
    id: "health-all-1", subject: "health", level: null, emoji: "💛", title: "بدن من مال خودم است",
    steps: [
      /* Calm and plain, nobody shown doing harm: she hugs herself; says «نه، مرسی» to a hug and gives a high five
         instead; the parts the underwear covers glow softly; a hand up and a space that is hers; Mum washing her hair
         in the bath; the doctor listening to her chest with Mum beside her; telling Mum about a worry.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, space: { art: "h-space", at: [80, 61], s: 1.25, o: 0 },
          kid: { art: "h-girl-front", at: [80, 88], s: 1.6 },
          kidS: { art: "h-girl", at: [66, 88], s: 1.4, o: 0 }, cloudS: { art: "h-cloud", at: [2, -42], s: 0.9, under: "kidS", o: 0 },
          gran: { art: "h-gran", at: [98, 88], s: 1.2, flip: true, o: 0 }, talk: { art: "h-talk", at: [73.4, 52.6], s: 1.2, o: 0 },
          bather: { art: "h-girl-front", at: [98, 88], s: 1.3, o: 0 }, tub: { art: "h-tub", at: [80, 88], s: 1.2, o: 0 },
          mom: { art: "h-mom-home", at: [76, 88], s: 1.3, o: 0 },
          doctor: { art: "h-doctor", at: [89, 88], s: 1.2, flip: true, o: 0 }, beat: { art: "h-heart", at: [76, 60], s: 0.3, o: 0 },
          heart: { art: "h-heart", at: [84, 20], o: 0 }
        },
        scenes: [
          { caption: "این بدن توست. بدن تو مال خودت است.", key: 2600, do: [
            { id: "kid.mouth", to: { o: 0 }, at: 300, dur: 200 }, { id: "kid.grin", to: { o: 1 }, at: 300, dur: 200 },
            { id: "kid.heart", to: { o: 1 }, at: 1000, dur: 400 }, { id: "kid.glowAll", to: { o: 0.8 }, at: 900, dur: 900 },
            { id: "kid", to: { r: 4 }, at: 1400, dur: 2400, yoyo: true, times: 4 }
          ].concat(B.hpose("kid", "h-girl-front", "hug", 200, 700)) },
          { caption: "اگر بغل یا بوسی را نمی‌خواهی، می‌توانی مهربان بگویی: «نه، مرسی.» به جایش می‌شود دست داد یا بزن قدش.", key: 5600, hold: 7600, do: [
            { id: "kid", to: { o: 0 }, dur: 500 }, { id: "kidS", to: { o: 1 }, dur: 500 }, { id: "gran", to: { o: 1 }, dur: 500 }
          ].concat(B.hpose("gran", "h-gran", { upper: 14, armF: [12, -40], armB: [11, -42] }, 700, 700), [
            { id: "kidS.mouth", to: { o: 0 }, at: 1600, dur: 100 }, { id: "kidS.open", to: { o: 1 }, at: 1600, dur: 100 },
            { id: "kidS.open", to: { sy: 0.4 }, at: 1700, dur: 1600, yoyo: true, times: 4 }, { id: "talk", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "kidS.head", to: { r: 8 }, at: 1800, dur: 1400, yoyo: true, times: 4 },
            { id: "talk", to: { o: 0 }, at: 3300, dur: 300 }, { id: "kidS.open", to: { o: 0 }, at: 3300, dur: 100 }, { id: "kidS.mouth", to: { o: 1 }, at: 3300, dur: 100 },
            { id: "gran.head", to: { r: 10 }, at: 3400, dur: 600, yoyo: true, times: 2 }
          ], B.hpose("gran", "h-gran", { upper: 0, armF: [13.4, -33.8], armB: [0.2, -21] }, 3800, 700), B.hpose("kidS", "h-girl", { armF: [9.4, -28] }, 3900, 600), [
            { emit: "spark", where: [81, 47], spread: [6, 6], n: 6, at: 4600, dur: 300, life: 1200 }
          ]) },
          { caption: "جاهایی از بدن که لباس زیر می‌پوشاند، جاهای خصوصی بدن است.", key: 2400, do: [
            { id: "kidS", to: { o: 0 }, dur: 500 }, { id: "gran", to: { o: 0 }, dur: 500 }, { id: "kid", to: { o: 1 }, dur: 500 },
            { id: "kid.heart", to: { o: 0 }, dur: 1 }, { id: "kid.glowAll", to: { o: 0 }, dur: 1 }, { id: "kid.grin", to: { o: 0 }, dur: 1 }, { id: "kid.mouth", to: { o: 1 }, dur: 1 },
            { id: "kid", to: { r: 0 }, dur: 1 },
            { id: "kid.private", to: { o: 1 }, at: 700, dur: 700 }, { id: "kid.private", to: { s: 1.12 }, at: 1400, dur: 2400, yoyo: true, times: 4 }
          ].concat(B.hunpose("kid", "h-girl-front", 0, 1)) },
          { caption: "کسی نباید به جاهای خصوصی تو دست بزند یا بخواهد آن‌ها را ببیند.", key: 2400, do: [
            { id: "kid.palmR", to: { o: 1 }, at: 300, dur: 200 }, { id: "kid.handR", to: { o: 0 }, at: 300, dur: 200 },
            { id: "space", to: { o: 1 }, at: 900, dur: 800 }, { id: "space", to: { s: 1.32 }, at: 1700, dur: 2400, yoyo: true, times: 2 }
          ].concat(B.hpose("kid", "h-girl-front", "stop", 200, 600)) },
          { caption: "فقط وقتی لازم است، مامان یا بابا در حمام کمکت می‌کنند.", key: 3000, do: [
            { id: "kid", to: { o: 0 }, dur: 500 }, { id: "space", to: { o: 0 }, dur: 500 },
            { id: "room", to: { o: 0.6 }, dur: 500 },
            { id: "bather", to: { o: 1 }, at: 300, dur: 500 }, { id: "tub", to: { o: 1 }, at: 300, dur: 500 }, { id: "mom", to: { o: 1 }, at: 300, dur: 500 },
            { id: "bather.mouth", to: { o: 0 }, at: 300, dur: 1 }, { id: "bather.grin", to: { o: 1 }, at: 300, dur: 1 },
            { id: "bather.pupils", to: { o: 0 }, at: 1300, dur: 200 }, { id: "bather.shut", to: { o: 1 }, at: 1300, dur: 200 },
            { id: "mom.foreF", to: { r: "+14" }, at: 1500, dur: 3000, yoyo: true, times: 10 },
            { emit: "bubble", where: [98, 45], spread: [10, 4], n: 12, at: 1500, dur: 3000, life: 1200 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 14, armF: [16, -33] }, 800, 700)) },
          { caption: "یا دکتر، وقتی مامان یا بابا کنارت هستند.", key: 3400, do: [
            { id: "bather", to: { o: 0 }, dur: 500 }, { id: "tub", to: { o: 0 }, dur: 500 }, { id: "room", to: { o: 1 }, dur: 500 },
            { id: "mom", to: { x: 52 }, at: 500, dur: 1 }, { id: "kidS", to: { x: 70 }, at: 500, dur: 1 },
            { id: "doctor", to: { y: 100.6 }, at: 900, dur: 500 },
            { id: "kidS", to: { o: 1 }, at: 500, dur: 500 }, { id: "doctor", to: { o: 1 }, at: 500, dur: 500 },
            { id: "doctor.steth", to: { o: 1 }, at: 1800, dur: 200 },
            { id: "beat", to: { o: 1 }, at: 2400, dur: 300 }, { id: "beat", to: { s: 0.45 }, at: 2600, dur: 2400, yoyo: true, times: 8 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 0, armF: [13.4, -27] }, 500, 700), B.hpose("doctor", "h-doctor", "listen", 900, 900)) },
          { caption: "اگر چیزی حالت را بد کرد یا گیجت کرد، به بزرگ‌تری که به او اعتماد داری بگو. او کمکت می‌کند.", key: 4600, hold: 7400, do: [
            { id: "doctor", to: { o: 0 }, dur: 500 }, { id: "beat", to: { o: 0 }, dur: 300 }, { id: "doctor.steth", to: { o: 0 }, dur: 1 },
            { id: "mom", to: { flip: -1 }, at: 400, dur: 300 }, { id: "mom", to: { x: 104 }, at: 700, dur: 1200, ease: "linear" },
            { id: "kidS.mouth", to: { o: 0 }, dur: 1 }, { id: "kidS.open", to: { o: 0 }, dur: 1 }, { id: "kidS.sad", to: { o: 1 }, dur: 1 },
            { id: "cloudS", to: { o: 1 }, at: 800, dur: 600 },
            { id: "kidS.head", to: { r: -8 }, at: 2200, dur: 300 }, { id: "kidS.open", to: { o: 1 }, at: 2400, dur: 100 },
            { id: "kidS.open", to: { sy: 0.4 }, at: 2500, dur: 2400, yoyo: true, times: 8 },
            { id: "talk", path: "M73.4 52.6L77.4 52.6", at: 2400, dur: 1 }, { id: "talk", to: { o: 1 }, at: 2500, dur: 300 },
            { id: "mom.head", to: { r: 10 }, at: 3000, dur: 1600, yoyo: true, times: 4 },
            { id: "cloudS.shackle", to: { y: -1.6, r: 30 }, at: 4400, dur: 500 }, { id: "cloudS", to: { o: 0 }, at: 5200, dur: 900 },
            { id: "talk", to: { o: 0 }, at: 5000, dur: 300 }, { id: "kidS.open", to: { o: 0 }, at: 5000, dur: 100 }, { id: "kidS.mouth", to: { o: 1 }, at: 5000, dur: 100 },
            { id: "heart", to: { o: 1 }, at: 5400, dur: 500 }, { id: "heart", to: { s: 1.2 }, at: 5900, dur: 1200, yoyo: true, times: 2 }
          ].concat(B.hunpose("mom", "h-mom-home", 0, 400), B.hwalk("mom", 700, 1200, 2), B.hpose("kidS", "h-girl", { armF: [0.2, -12] }, 0, 400),
            B.hpose("mom", "h-mom-home", { upper: 22, armF: [12, -30] }, 2600, 700)) }
        ] },
      { type: "choose", prompt: "جاهای خصوصی بدن کجاست؟", stack: true,
        options: ["🩲 جاهایی که لباس زیر می‌پوشاند", "👃 بینی", "🦶 کف پا"], answer: "🩲 جاهایی که لباس زیر می‌پوشاند" },
      { type: "choose", prompt: "اگر کسی کاری کرد که حالت را بد کرد، چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به بزرگ‌تری که به او اعتماد دارم می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "⏳ صبر می‌کنم تا یادم برود"],
        answer: "🗣️ به بزرگ‌تری که به او اعتماد دارم می‌گویم" },
      { type: "doit", pic: "✋", text: "با صدای محکم بگو: «نه! دوست ندارم.» بعد پیش بزرگ‌ترت برو و بگو چه شد. با هم تمرین کنید." },
      { type: "forparents",
        text: "بدن تو مال خودت است. هر وقت چیزی نگرانت کرد، می‌توانی به ما بگویی.",
        tips: [
          "این درس را کنار کودک ببینید. لحن شما آرام و معمولی باشد، همان‌طور که درباره مسواک زدن حرف می‌زنید. هدف ترساندن نیست؛ هدف این است که کودک بداند می‌تواند به شما بگوید.",
          "قاعده لباس زیر: جاهایی که لباس زیر می‌پوشاند خصوصی است. کسی نباید به آن‌ها دست بزند، نگاهشان کند یا از کودک بخواهد به جاهای خصوصی خودش دست بزند. فقط برای شستن، یا معاینه پزشک در حضور شما، استثنا دارد.",
          "برای جاهای خصوصی بدن کلمه‌ای درست و بدون خجالت انتخاب کنید و همیشه همان را به کار ببرید. کودکی که برای بدنش کلمه دارد، راحت‌تر می‌تواند بگوید چه اتفاقی افتاده است.",
          "اگر کودک بغل یا بوس کسی را نخواست، مجبورش نکنید. به جایش دست دادن یا سلام گرم را پیشنهاد کنید. احترام به بزرگ‌ترها با این کار کم نمی‌شود.",
          "به کودک بگویید: «هر چیزی به من بگویی، از دستت ناراحت نمی‌شوم.» اگر روزی چیزی گفت، آرام بمانید، گوش بدهید، از او تشکر کنید و بگویید تقصیر او نیست. بخش «ایمنی بدن» در راهنمای والدین را بخوانید."
        ] }
    ]
  },
  {
    id: "health-all-2", subject: "health", level: null, emoji: "🧎", title: "تمرین زلزله",
    steps: [
      /* The drill as a calm game: the room shakes a little and the lamp swings; then بنشین (down on the knees),
         پناه بگیر (crawl under a sturdy table and curl up, hands over the head and neck), محکم نگه دار (hold a leg
         of the table while it moves); with no table, curl up by an inside wall away from the window; afterwards go
         out with a grown-up by the stairs, not the lift. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "با هم تمرین می‌کنیم", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, win: { art: "h-window", at: [22, 30] }, lamp: { art: "h-lamp", at: [66, 0], s: 1.2 },
          table: { art: "h-dtable", at: [106, 88], s: 1.3 },
          hall: { art: "h-hall", o: 0 }, outside: { art: "h-outside", o: 0 },
          mom: { art: "h-mom-home", at: [46, 88], s: 1.25, o: 0 },
          kid: { art: "h-boy", at: [44, 88], s: 1.3 }, num: { art: "counter", at: [146, 14], s: 1.2, o: 0 },
          star: { art: "h-star", at: [130, 24], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "گاهی زمین تکان می‌خورد. به این، زلزله می‌گویند. امروز تمرین می‌کنیم تا بدانیم چه کار کنیم.", key: 1300, do: [
            { id: "lamp.swing", to: { r: 12 }, at: 600, dur: 300 }, { id: "lamp.swing", to: { r: -24 }, at: 900, dur: 2400, yoyo: true, times: 6 },
            { id: "lamp.swing", to: { r: 0 }, at: 3300, dur: 600 },
            { id: "kid.head", to: { r: -12 }, at: 900, dur: 500 }, { id: "kid.head", to: { r: 0 }, at: 3400, dur: 500 }
          ].concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return { cam: { x: i % 2 ? 79.2 : 80.8 }, at: 600 + i * 260, dur: 260 }; }),
            [{ cam: { x: 80 }, at: 3200, dur: 300 }]) },
          { caption: "یک: روی زانوهایمان می‌نشینیم.", do: [
            { id: "num", to: { o: 1 }, dur: 300 }, { count: "num", from: 1, to: 1, dur: 1 },
            { id: "kid", to: { y: 95.9 }, at: 300, dur: 600 }
          ].concat(B.hpose("kid", "h-boy", { legF: 0, shinF: 90, legB: 0, shinB: 90 }, 300, 600)) },
          { caption: "دو: زیر یک میز محکم می‌رویم و با دست‌ها سر و گردنمان را می‌پوشانیم.", hold: 5400, do: [
            { count: "num", from: 2, to: 2, dur: 1 }
          ].concat(B.hpose("kid", "h-boy", { upper: 80, armF: [10, -6.9], armB: [9, -6.9], head: -60 }, 0, 600), [
            { id: "kid", to: { x: 106 }, at: 700, dur: 2400, ease: "linear" },
            { id: "kid.armF", to: { r: "+14" }, at: 700, dur: 2400, yoyo: true, times: 6 }, { id: "kid.legB", to: { r: -14 }, at: 700, dur: 2400, yoyo: true, times: 6 },
            { id: "kid", to: { y: 98.9 }, at: 3300, dur: 600 }
          ], B.hpose("kid", "h-boy", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 72, head: 30, armF: [12.5, -21.5], armB: [11.5, -21] }, 3300, 800)) },
          { caption: "سه: پایه میز را محکم نگه می‌داریم تا تکان تمام شود.", key: 2000, do: [
            { count: "num", from: 3, to: 3, dur: 1 }
          ].concat(B.hpose("kid", "h-boy", { upper: 72, armF: [16.4, -13] }, 200, 600), [
            { id: "table", to: { x: "+0.9" }, at: 900, dur: 3000, yoyo: true, times: 12 },
            { id: "kid", to: { x: "+0.9" }, at: 900, dur: 3000, yoyo: true, times: 12 },
            { id: "lamp.swing", to: { r: -16 }, at: 900, dur: 3000, yoyo: true, times: 6 }
          ]) },
          { caption: "اگر میزی نیست، کنار دیوار و دور از پنجره می‌نشینیم و سر و گردنمان را می‌پوشانیم.", key: 4400, hold: 6200, do: [
            { id: "num", to: { o: 0 }, dur: 300 }, { id: "table", to: { o: 0 }, dur: 600 }
          ].concat(B.hpose("kid", "h-boy", { legF: 0, shinF: 90, legB: 0, shinB: 90, upper: 80, armF: [10, -6.9], armB: [9, -6.9], head: -60 }, 400, 600), [
            { id: "kid", to: { y: 95.9 }, at: 400, dur: 600 },
            { id: "kid", path: "M106 95.9L132 82", at: 1100, dur: 2200, ease: "linear" }, { id: "kid", to: { s: 1.1 }, at: 1100, dur: 2200 },
            { id: "kid.armF", to: { r: "+14" }, at: 1100, dur: 2200, yoyo: true, times: 6 },
            { id: "kid", to: { y: 84.4 }, at: 3400, dur: 600 },
            { id: "win", to: { s: 1.08 }, at: 4600, dur: 800, yoyo: true, times: 2 }
          ], B.hpose("kid", "h-boy", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 72, head: 30, armF: [12.5, -21.5], armB: [11.5, -21] }, 3400, 800)) },
          { caption: "وقتی تکان تمام شد، آرام با بزرگ‌ترها بیرون می‌رویم. از پله می‌رویم، نه از آسانسور.", key: 3900, hold: 7000, do: [
            { id: "hall", to: { o: 1 }, dur: 700 }, { id: "mom", to: { o: 1 }, dur: 700 },
            { id: "kid", to: { x: 62, y: 88, s: 1.3 }, dur: 1 }
          ].concat(B.hunpose("kid", "h-boy", 0, 1), B.hpose("mom", "h-mom-home", { armF: [6, -22] }, 600, 500), B.hpose("kid", "h-boy", { armB: [-6.5, -21.2] }, 600, 500), [
            { id: "mom.head", to: { r: 10 }, at: 1000, dur: 1200, yoyo: true, times: 2 },
            { id: "mom", to: { x: 82 }, at: 2200, dur: 1200, ease: "linear" }, { id: "kid", to: { x: 98 }, at: 2200, dur: 1200, ease: "linear" },
            { id: "mom", path: "M82 88L92 88L136 110", at: 3400, dur: 3000, ease: "linear" }, { id: "kid", path: "M98 88L104 91L144 111", at: 3400, dur: 3000, ease: "linear" },
            { id: "mom.legF", to: { r: -20 }, at: 2200, dur: 4200, yoyo: true, times: 14 }, { id: "mom.legB", to: { r: 20 }, at: 2200, dur: 4200, yoyo: true, times: 14 },
            { id: "kid.legF", to: { r: -24 }, at: 2200, dur: 4200, yoyo: true, times: 16 }, { id: "kid.legB", to: { r: 24 }, at: 2200, dur: 4200, yoyo: true, times: 16 }
          ]) },
          { caption: "خوب تمرین کردیم! حالا می‌دانیم چه کار کنیم.", key: 1800, do: [
            { id: "outside", to: { o: 1 }, dur: 600 },
            { id: "mom", to: { x: 92, y: 88 }, dur: 1 }, { id: "kid", to: { x: 110, y: 88 }, dur: 1 }
          ].concat(B.hpose("mom", "h-mom-home", { armF: [0.2, -21] }, 0, 1), B.hpose("kid", "h-boy", { armB: [0.2, -12] }, 0, 1), [
            { id: "kid", path: "M110 88Q110 74 110 88", at: 800, dur: 600 },
            { id: "star", to: { o: 1 }, at: 800, dur: 400 }, { id: "star", to: { s: 1.8, r: 20 }, at: 1200, dur: 1200, yoyo: true, times: 2 },
            { emit: "spark", where: [118, 36], spread: [40, 20], n: 10, at: 900, dur: 1000, life: 1400 }
          ], B.hpose("kid", "h-boy", { armF: [3, -33.5], armB: [1, -33.5] }, 700, 300)) }
        ] },
      { type: "order", prompt: "کارهای تمرین زلزله را به ترتیب بچین", numbered: true,
        items: [{ pic: "🧎", label: "بنشین" }, { pic: "🙆", label: "پناه بگیر" }, { pic: "✊", label: "محکم نگه دار" }] },
      { type: "choose", prompt: "وقتی زمین تکان می‌خورد، کجا بهتر است؟", stack: true,
        options: ["┬─┬ زیر یک میز محکم", "🪟 کنار پنجره", "🚪 وسط راه‌پله"], answer: "┬─┬ زیر یک میز محکم" },
      { type: "doit", pic: "🧎", text: "حالا با خانواده تمرین کنید. یک نفر می‌گوید: «تمرین زلزله!» و همه این سه کار را انجام می‌دهند:",
        list: ["بنشین", "پناه بگیر", "محکم نگه دار"] },
      { type: "forparents",
        tips: [
          "ایران کشور زلزله‌خیزی است و تمرین کمک می‌کند کودک در لحظه واقعی بداند چه کند. تمرین را مثل یک بازی آرام، در روز و با لبخند انجام دهید و چند ماه یک بار تکرارش کنید.",
          "اگر کودک زلزله یا جنگ را تجربه کرده و این درس ناراحتش می‌کند، اصرار نکنید. بغلش کنید، بگویید الان در امان است، و تمرین را برای وقت دیگری بگذارید.",
          "در خانه با هم جاهای امن را پیدا کنید: زیر میز محکم، کنار دیوار داخلی، دور از پنجره و قفسه‌ها. کمد و قفسه‌های بلند را به دیوار ببندید و چیز سنگین بالای تخت خواب نگذارید.",
          "اگر کودک در رختخواب است، همان‌جا بماند و سرش را با بالش بپوشاند. بیرون از خانه، دور از ساختمان، دیوار، تیر برق و درخت بایستد.",
          "یک جای قرار بیرون از خانه برای خانواده انتخاب کنید و یک کوله آماده داشته باشید: آب، چراغ‌قوه، جعبه کمک‌های اولیه، داروهای لازم، سوت و کپی مدارک."
        ] }
    ]
  },
  {
    id: "health-all-3", subject: "health", level: null, emoji: "🚑", title: "شماره‌های کمک",
    steps: [
      /* Calm, nobody hurt: Gran feels unwell on the sofa and Mum phones; the ambulance (۱۱۵), the fire engine
         putting out a small fire in a bin (۱۲۵), the police helping a lost girl (۱۱۰); a boy phones, says where he
         lives and keeps listening; then he leaves the phone and plays. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چه کسانی کمک می‌کنند", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [40, 88], s: 1.3 },
          gran: { art: "h-gran", at: [42, 100.6], s: 1.2 }, mom: { art: "h-mom-home", at: [100, 88], s: 1.25, flip: true },
          ring: { art: "h-ring-lines", at: [97, 37], o: 0 },
          outside: { art: "h-outside", o: 0 }, bin: { art: "h-bin", at: [30, 88], s: 1.2, o: 0 }, flame: { art: "h-flame", at: [30, 70], s: 1.2, o: 0 },
          lost: { art: "h-girl", at: [44, 88], s: 1.35, o: 0 }, officer: { art: "h-officer", at: [96, 88], s: 1.2, flip: true, o: 0 },
          amb: { art: "🚑", at: [200, 80], s: 1.5 }, sA: { art: "h-siren", at: [0, -15], under: "amb" },
          fire: { art: "🚒", at: [200, 80], s: 1.5 }, police: { art: "🚓", at: [200, 80], s: 1.5 }, sP: { art: "h-siren", at: [0, -14], under: "police" },
          sign: { art: "h-number", at: [118, 22], s: 1.3, o: 0 },
          home: { art: "h-room", o: 0 }, table: { art: "h-table", at: [76, 88], s: 1.2, o: 0 }, phone: { art: "☎️", at: [76, 65.2], s: 0.4, o: 0 },
          boy: { art: "h-boy", at: [60, 88], s: 1.4, o: 0 },
          say: { art: "h-sayhome", at: [72, 46], o: 0 }, voice: { art: "h-waves", at: [72, 46], s: 0.8, flip: true, o: 0 },
          ball: { art: "ball-side", at: [112, 88], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "وقتی کسی ناگهان حالش خیلی بد می‌شود یا اتفاقی می‌افتد، بزرگ‌ترها برای کمک زنگ می‌زنند.", key: 3000, do: B.hpose("gran", "h-gran", { legF: -88, shinF: 88, legB: -88, shinB: 88, armF: [4.4, -45.6] }, 0, 1).concat([
            { id: "gran.eye", to: { o: 0 }, dur: 1 }, { id: "gran.shut", to: { o: 1 }, dur: 1 },
            { id: "mom.phone", to: { o: 1 }, at: 900, dur: 200 }, { id: "ring", to: { o: 1 }, at: 1400, dur: 200 },
            { id: "ring", to: { s: 1.3 }, at: 1400, dur: 2400, yoyo: true, times: 6 }
          ], B.hpose("mom", "h-mom-home", "ear", 800, 500)) },
          { caption: "آمبولانس: ۱۱۵. برای وقتی که کسی حالش خیلی بد است.", key: 2600, do: [
            { id: "outside", to: { o: 1 }, dur: 600 }, { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "amb", to: { x: 100 }, at: 400, dur: 2000, ease: "out" },
            { id: "sA.red", to: { o: 0.3 }, at: 400, dur: 3200, yoyo: true, times: 8 }, { id: "sA.blue", to: { o: 1 }, at: 400, dur: 3200, yoyo: true, times: 8 },
            { id: "sign", to: { o: 1 }, at: 1600, dur: 400 }, { count: "sign", from: 115, to: 115, at: 1600, dur: 1 }
          ] },
          { caption: "آتش‌نشانی: ۱۲۵. برای وقتی که جایی آتش گرفته است.", key: 3400, do: [
            { id: "amb", to: { x: -40 }, dur: 1400, ease: "in" }, { count: "sign", from: 125, to: 125, dur: 1 },
            { id: "bin", to: { o: 1 }, dur: 400 }, { id: "flame", to: { o: 1 }, dur: 400 }, { id: "flame", to: { sy: 1.4 }, dur: 2000, yoyo: true, times: 6 },
            { id: "fire", to: { x: 92 }, at: 600, dur: 1800, ease: "out" },
            { emit: "drop", where: [40, 64], spread: [10, 6], rise: 6, n: 14, at: 2400, dur: 1600, life: 700 },
            { id: "flame", to: { s: 0, o: 0 }, at: 3200, dur: 900 }
          ] },
          { caption: "پلیس: ۱۱۰. برای وقتی که کسی در خطر است یا گم شده است.", key: 4200, hold: 6000, do: [
            { id: "fire", to: { x: -40 }, dur: 1400, ease: "in" }, { id: "bin", to: { o: 0 }, dur: 400 }, { count: "sign", from: 110, to: 110, dur: 1 },
            { id: "lost", to: { o: 1 }, at: 300, dur: 400 }, { id: "lost.head", to: { r: -10 }, at: 600, dur: 1600, yoyo: true, times: 4 },
            { id: "police", to: { x: 130 }, at: 600, dur: 1800, ease: "out" },
            { id: "sP.red", to: { o: 0.3 }, at: 600, dur: 3200, yoyo: true, times: 8 }, { id: "sP.blue", to: { o: 1 }, at: 600, dur: 3200, yoyo: true, times: 8 },
            { id: "officer", to: { o: 1 }, at: 2400, dur: 400 }, { id: "officer", to: { x: 66 }, at: 2600, dur: 1400, ease: "linear" }
          ].concat(B.hwalk("officer", 2600, 1400, 2), B.hpose("officer", "h-officer", { upper: 14, armF: [10, -24] }, 4100, 500), B.hpose("lost", "h-girl", { armF: [7.6, -16] }, 4200, 500)) },
          { caption: "اگر بزرگ‌تری نزدیک نیست، تو هم می‌توانی زنگ بزنی. آرام بگو چه شده و خانه‌تان کجاست. گوشی را قطع نکن تا خودشان بگویند.", key: 3600, hold: 8000, do: [
            { id: "home", to: { o: 1 }, dur: 600 }, { id: "table", to: { o: 1 }, dur: 600 }, { id: "boy", to: { o: 1 }, dur: 600 }, { id: "sign", to: { o: 0 }, dur: 400 },
            { id: "boy.phone", to: { o: 1 }, at: 700, dur: 200 },
            { id: "boy.mouth", to: { o: 0 }, at: 1300, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1300, dur: 100 },
            { id: "boy.open", to: { sy: 0.4 }, at: 1400, dur: 3200, yoyo: true, times: 10 },
            { id: "say", to: { o: 1 }, at: 2200, dur: 400 }, { id: "say", to: { o: 0 }, at: 4800, dur: 400 },
            { id: "boy.open", to: { o: 0 }, at: 4700, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 4700, dur: 100 },
            { id: "voice", to: { o: 1 }, at: 5200, dur: 300 }, { id: "voice", to: { s: 1.1 }, at: 5200, dur: 2400, yoyo: true, times: 6 },
            { id: "boy.head", to: { r: 6 }, at: 5400, dur: 2200, yoyo: true, times: 4 }
          ].concat(B.hpose("boy", "h-boy", "ear", 600, 500)) },
          { caption: "این شماره‌ها برای کمک واقعی است، نه برای بازی.", key: 3400, do: [
            { id: "voice", to: { o: 0 }, dur: 300 }, { id: "boy.phone", to: { o: 0 }, at: 500, dur: 200 }, { id: "phone", to: { o: 1 }, at: 600, dur: 300 },
            { id: "boy.head", to: { r: -8 }, at: 900, dur: 300 }, { id: "boy.head", to: { r: 8 }, at: 1200, dur: 1400, yoyo: true, times: 4 },
            { id: "boy.head", to: { r: 0 }, at: 2600, dur: 300 },
            { id: "ball", to: { o: 1 }, at: 2400, dur: 300 }, { id: "ball", path: "M112 88Q112 66 112 88", at: 2800, dur: 700 }, { id: "ball", path: "M112 88Q112 70 112 88", at: 3500, dur: 600 }
          ].concat(B.hpose("boy", "h-boy", { armF: [10.4, -16.4], head: 0 }, 0, 500), B.hpose("boy", "h-boy", { armF: [0.2, -12] }, 800, 400)) }
        ] },
      { type: "pairs", prompt: "هر کدام را با شماره‌اش جفت کن",
        pairs: [[{ pic: "🚑", say: "آمبولانس" }, 115], [{ pic: "🚒", say: "آتش‌نشانی" }, 125], [{ pic: "🚓", say: "پلیس" }, 110]] },
      { type: "choose", prompt: "مادربزرگ زمین خورده و پایش خیلی درد می‌کند. نمی‌تواند بلند شود. به کجا زنگ می‌زنیم؟",
        options: [{ label: "🚑 ۱۱۵", value: 115 }, { label: "🚒 ۱۲۵", value: 125 }, { label: "🚓 ۱۱۰", value: 110 }], answer: 115 },
      { type: "choose", prompt: "از آشپزخانه دود بیرون می‌آید. اول چه کار می‌کنی؟", stack: true,
        options: ["🏃 از خانه بیرون می‌روم و به بزرگ‌ترها خبر می‌دهم", "🙈 زیر تخت قایم می‌شوم", "👀 می‌روم ببینم چه شده"],
        answer: "🏃 از خانه بیرون می‌روم و به بزرگ‌ترها خبر می‌دهم" },
      { type: "doit", pic: "🏠", text: "با بزرگ‌ترت تمرین کن و نشانی خانه‌تان را بگو: شهر، محله، خیابان یا کوچه، و پلاک." },
      { type: "forparents",
        tips: [
          "شماره‌ها: اورژانس ۱۱۵، آتش‌نشانی ۱۲۵، پلیس ۱۱۰. تماس با آن‌ها رایگان است. این شماره‌ها را درشت روی یخچال یا کنار تلفن بنویسید.",
          "با کودک «تماس تمرینی» بازی کنید، با گوشی خاموش: «سلام، اسم من … است. مادربزرگم زمین خورده. خانه ما در … است.» نشانی خانه را آن‌قدر تکرار کنید که از بر شود.",
          "برای کودک توضیح دهید که زنگ زدن برای شوخی، خط را برای کسی که واقعاً کمک لازم دارد اشغال می‌کند.",
          "در آتش‌سوزی، اول همه از خانه بیرون بروند و بیرون بمانند؛ بعد زنگ بزنید. هیچ‌کس برای برداشتن وسیله برنگردد.",
          "این درس را آرام و بدون مثال‌های ترسناک کار کنید. اگر کودک قبلاً حادثه‌ای دیده است، بگذارید سؤال بپرسد و به او بگویید کمک همیشه نزدیک است."
        ] }
    ]
  }
);
