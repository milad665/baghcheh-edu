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
["hpose", "hunpose", "hwalk", "hloops", "hnotes"].forEach(function (k) { if (!B[k]) B[k] = function () { return []; }; });

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
    id: "health-seed-5", subject: "health", level: "seed", emoji: "🛁", title: "دستشویی و حمام",
    steps: [
      /* Looking after the body: after the toilet, flush and wash the hands; bath time with a grown-up near; short
         nails (a grown-up cuts them); the nose into a tissue, the tissue into the bin, then wash the hands. The bath
         is a little further along the bathroom: the camera goes there and back. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چطور بدنمان را تمیز نگه می‌داریم", bg: "#dff1f7",
        parts: {
          room: { art: "h-bathroom" }, room2: { art: "h-bathroom", at: [160, 0] },
          toilet: { art: "h-toilet", at: [38, 88], s: 1.1 },
          sink: { art: "h-sink-side", at: [128, 88], s: 1.3 }, soap: { art: "h-soap-small", at: [126, 54.2], s: 1.3 },
          table: { art: "h-table", at: [72, 88], s: 1.1 }, tissues: { art: "h-tissues", at: [72, 67.1] },
          bin: { art: "h-bin", at: [94, 88], s: 1.1 },
          shower: { art: "h-shower", at: [236, 20], s: 1.4 },
          boy: { art: "h-boy-front", at: [236, 92], s: 1.6 }, tub: { art: "h-tub", at: [240, 90], s: 1.2 },
          mom: { art: "h-mom-home", at: [296, 88], s: 1.2, flip: true },
          girl: { art: "h-girl", at: [44, 88], s: 1.4, flip: true },
          tissue: { art: "h-tissue", at: [94, 66], s: 1.3, o: 0 },
          panel: { art: "h-panel", at: [160, 0], o: 0 },
          hand: { art: "h-nailhand", at: [240, 84], s: 2.6, o: 0 },
          clip: { art: "h-clipper", at: [290, 30], s: 2.2, o: 0 }
        },
        scenes: [
          { caption: "بعد از دستشویی، سیفون را می‌کشیم.", key: 2400, do: B.hpose("girl", "h-girl", { armF: [8.2, -26] }, 300, 800).concat([
            { id: "boy.legL", to: { o: 0 }, dur: 1 }, { id: "boy.legR", to: { o: 0 }, dur: 1 },
            { id: "toilet.button", to: { y: 0.8 }, at: 1300, dur: 300 },
            { id: "toilet.flush", to: { o: 1 }, at: 1500, dur: 300 }, { id: "toilet.flush", to: { r: -20 }, at: 1500, dur: 2400, yoyo: true, times: 6 },
            { id: "toilet.button", to: { y: 0 }, at: 2200, dur: 300 }, { id: "toilet.flush", to: { o: 0 }, at: 3900, dur: 400 }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 2300, 600)) },
          { caption: "بعد، دست‌هایمان را با آب و صابون می‌شوییم.", key: 4600, hold: 6400, do: [
            { id: "girl", to: { flip: 1 }, dur: 1 }, { id: "girl", to: { x: 111 }, dur: 3000, ease: "linear" }
          ].concat(B.hwalk("girl", 0, 3000, 5), B.hpose("girl", "h-girl", { armF: [8.9, -22.3], armB: [8.6, -22.6] }, 3200, 700), [
            { id: "sink.water", to: { o: 1 }, at: 3300, dur: 300 },
            { id: "girl.foreF", to: { r: "+12" }, at: 4000, dur: 3200, yoyo: true, times: 12 },
            { emit: "bubble", where: [124, 57], spread: [8, 4], n: 14, at: 4000, dur: 3200 },
            { id: "sink.water", to: { o: 0 }, at: 7400, dur: 300 }
          ]) },
          { caption: "در حمام، موها و بدنمان را با آب و صابون می‌شوییم. یک بزرگ‌تر همیشه کنارمان است.", key: 5200, hold: 8600, do: [
            { cam: { x: 240 }, dur: 2000 }, { id: "shower.water", to: { o: 1 }, at: 1800, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 500),
            B.hpose("boy", "h-boy-front", { armL: [-3.4, -32], armR: [3.4, -32] }, 2200, 700), [
            { id: "boy.foreL", to: { r: "+14" }, at: 3000, dur: 2600, yoyo: true, times: 10 },
            { id: "boy.foreR", to: { r: "-14" }, at: 3000, dur: 2600, yoyo: true, times: 10 },
            { emit: "bubble", where: [236, 40], spread: [14, 6], n: 16, at: 3000, dur: 2600 },
            { id: "boy.pupils", to: { o: 0 }, at: 2400, dur: 200 }, { id: "boy.shut", to: { o: 1 }, at: 2400, dur: 200 }
          ], B.hpose("boy", "h-boy-front", { armL: [5, -21.5], armR: [-5, -21] }, 5800, 600), [
            { id: "boy.foreL", to: { r: "+12" }, at: 6500, dur: 1800, yoyo: true, times: 6 },
            { emit: "bubble", where: [236, 58], spread: [16, 4], n: 8, at: 6500, dur: 1800 },
            { id: "mom.head", to: { r: 8 }, at: 3400, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "ناخن که بلند شود، زیرش کثیف می‌شود. با ناخن‌گیر کوتاهش می‌کنیم.", key: 5000, hold: 9400, do: [
            { id: "shower.water", to: { o: 0 }, dur: 400 },
            { id: "panel", to: { o: 1 }, at: 300, dur: 500 }, { id: "hand", to: { o: 1 }, at: 500, dur: 500 },
            { id: "clip", to: { o: 1 }, at: 1600, dur: 300 },
            { id: "clip", path: "M290 30L224.1 28.4", at: 1800, dur: 900 }, { id: "clip.lever", to: { r: 10 }, at: 2800, dur: 500, yoyo: true, times: 2 }, { id: "hand.t1", to: { sy: 0.15 }, at: 3000, dur: 300 },
            { id: "clip", path: "M224.1 28.4L233.4 24.2", at: 3500, dur: 600 }, { id: "clip.lever", to: { r: 10 }, at: 4200, dur: 500, yoyo: true, times: 2 }, { id: "hand.t2", to: { sy: 0.15 }, at: 4400, dur: 300 },
            { id: "clip", path: "M233.4 24.2L242.8 25.2", at: 4900, dur: 600 }, { id: "clip.lever", to: { r: 10 }, at: 5600, dur: 500, yoyo: true, times: 2 }, { id: "hand.t3", to: { sy: 0.15 }, at: 5800, dur: 300 },
            { id: "clip", path: "M242.8 25.2L252.2 30.4", at: 6300, dur: 600 }, { id: "clip.lever", to: { r: 10 }, at: 7000, dur: 500, yoyo: true, times: 2 }, { id: "hand.t4", to: { sy: 0.15 }, at: 7200, dur: 300 },
            { id: "clip", path: "M252.2 30.4L300 50", at: 7800, dur: 800 }, { id: "clip", to: { o: 0 }, at: 8300, dur: 300 }
          ] },
          { caption: "آب بینی‌مان را با دستمال کاغذی پاک می‌کنیم.", key: 6800, hold: 6000, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "hand", to: { o: 0 }, dur: 500 },
            { cam: { x: 80 }, at: 300, dur: 1800 },
            { id: "girl", to: { flip: -1 }, at: 1800, dur: 1 }, { id: "girl", to: { x: 60 }, at: 1900, dur: 2600, ease: "linear" }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 400), B.hwalk("girl", 1900, 2600, 4), [
            { id: "girl", to: { flip: 1 }, at: 4600, dur: 1 }
          ], B.hpose("girl", "h-girl", { armF: [8.6, -15] }, 4700, 500), [
            { id: "tissues.top", to: { o: 0 }, at: 5200, dur: 100 }, { id: "girl.tissue", to: { o: 1 }, at: 5300, dur: 100 }
          ], B.hpose("girl", "h-girl", "face", 5300, 600), [
            { id: "girl.eye", to: { o: 0 }, at: 6000, dur: 150 }, { id: "girl.shut", to: { o: 1 }, at: 6000, dur: 150 },
            { id: "girl.head", to: { r: 14 }, at: 6100, dur: 1400, yoyo: true, times: 4 },
            { id: "girl.eye", to: { o: 1 }, at: 7600, dur: 150 }, { id: "girl.shut", to: { o: 0 }, at: 7600, dur: 150 }
          ]) },
          { caption: "دستمال را در سطل آشغال می‌اندازیم و دست‌هایمان را می‌شوییم.", key: 2150, hold: 9000, do: [
            { id: "girl", to: { x: 82 }, dur: 1400, ease: "linear" }, { id: "girl.tissue", to: { o: 0 }, at: 1700, dur: 100 }
          ].concat(B.hwalk("girl", 0, 1400, 2), B.hpose("girl", "h-girl", { armF: [8.6, -16], head: 0 }, 1200, 500), [
            { id: "bin.lid", to: { r: -60 }, at: 1500, dur: 400 },
            { id: "tissue", to: { o: 1 }, at: 1700, dur: 100 }, { id: "tissue", path: "M94 66L94 78", at: 1900, dur: 600, ease: "in" }, { id: "tissue", to: { o: 0 }, at: 2400, dur: 200 },
            { id: "bin.lid", to: { r: 0 }, at: 2800, dur: 400 },
            { id: "girl", to: { x: 111 }, at: 3500, dur: 1800, ease: "linear" }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 2800, 500), B.hwalk("girl", 3500, 1800, 3),
            B.hpose("girl", "h-girl", { armF: [8.9, -22.3], armB: [8.6, -22.6] }, 5400, 600), [
            { id: "sink.water", to: { o: 1 }, at: 5500, dur: 300 },
            { id: "girl.foreF", to: { r: "+12" }, at: 6100, dur: 2600, yoyo: true, times: 10 },
            { emit: "bubble", where: [124, 57], spread: [8, 4], n: 12, at: 6100, dur: 2600 },
            { id: "sink.water", to: { o: 0 }, at: 8800, dur: 300 }
          ]) },
          { caption: "تمیز و راحتیم!", key: 1400, do: B.hpose("girl", "h-girl", { armF: [3, -33.5], armB: [1, -33.5] }, 200, 500).concat([
            { emit: "spark", from: "girl", where: [0, -30], spread: [26, 26], n: 10, at: 400, dur: 1200, life: 1400 },
            { id: "girl.mouth", to: { o: 0 }, at: 300, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 300, dur: 100 }
          ]) }
        ] },
      { type: "order", prompt: "بعد از دستشویی چه کار می‌کنیم؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "🚽", label: "سیفون را می‌کشیم" }, { pic: "🧼", label: "دست‌ها را با صابون می‌شوییم" }, { pic: "🚰", label: "آب می‌کشیم" }, { pic: "👐", label: "خشک می‌کنیم" }] },
      { type: "choose", prompt: "آب بینی‌ات راه افتاده. چه کار می‌کنی؟", say: "آب بینی‌ات راه افتاده. چه کار می‌کنی؟", stack: true,
        options: ["🧻 با دستمال کاغذی پاکش می‌کنم و دستمال را در سطل می‌اندازم", "👕 با آستینم پاکش می‌کنم", "🛋️ دستمال را روی مبل می‌گذارم"],
        answer: "🧻 با دستمال کاغذی پاکش می‌کنم و دستمال را در سطل می‌اندازم" },
      { type: "choose", prompt: "کی حمام می‌کنیم؟", say: "کی حمام می‌کنیم؟", stack: true,
        options: ["🛁 با یک بزرگ‌تر که کنارمان است", "🙈 تنهایی، وقتی کسی خانه نیست"], answer: "🛁 با یک بزرگ‌تر که کنارمان است" },
      { type: "doit", pic: "💅", text: "به ناخن‌هایت نگاه کن. بلند شده‌اند؟ زیرشان کثیف است؟ اگر بله، به بزرگ‌ترت بگو کوتاهشان کند. بعد دست‌هایت را با آب و صابون بشوی." },
      { type: "forparents",
        tips: [
          "کودک را کم‌کم به دستشویی رفتن خودش عادت دهید: سیفون کشیدن، شستن دست با آب و صابون و خشک کردن. یاد بدهید دختران خودشان را از جلو به عقب بشویند یا پاک کنند.",
          "کودک خردسال را هیچ‌وقت، حتی برای یک لحظه، در وان یا تشت آب تنها نگذارید. غرق شدن در آب کم‌عمق هم بی‌صدا و سریع اتفاق می‌افتد.",
          "در حمام بگذارید کودک خودش بدنش را با صابون بشوید و شما کمک کنید. اسم همه جاهای بدن را با همان لحن معمولی بگویید.",
          "ناخن‌های دست و پا را هر هفته کوتاه کنید؛ بهتر است بعد از حمام که نرم‌اند. ناخن کوتاه کمتر میکروب نگه می‌دارد.",
          "دستمال کاغذی را در دسترس کودک بگذارید و سطل آشغال دربسته داشته باشید. بعد از فین کردن، دست‌ها را بشویید."
        ] }
    ]
  },
  {
    id: "health-seed-6", subject: "health", level: "seed", emoji: "🫧", title: "بازی تمیزی",
    steps: [
      // The game lesson of the unit: when we wash our hands (sort), then the handwashing and the teeth steps in order.
      { type: "sort", prompt: "کی دست‌هایمان را با آب و صابون می‌شوییم؟",
        baskets: [{ label: "دست‌ها را می‌شوییم", pic: "🧼", value: "wash" }, { label: "لازم نیست", pic: "🙂", value: "no" }],
        items: [
          { pic: "🍽️", label: "پیش از غذا", say: "پیش از غذا خوردن", basket: "wash" },
          { pic: "🧻", label: "بعد از دستشویی", say: "بعد از دستشویی", basket: "wash" },
          { pic: "⚽", label: "بعد از بازی بیرون", say: "بعد از بازی بیرون", basket: "wash" },
          { pic: "🐶", label: "بعد از ناز کردن حیوان", say: "بعد از ناز کردن حیوان", basket: "wash" },
          { pic: "🤧", label: "بعد از فین کردن", say: "بعد از فین کردن", basket: "wash" },
          { pic: "📖", label: "وقتی کتاب نگاه می‌کنیم", say: "وقتی کتاب نگاه می‌کنیم", basket: "no" },
          { pic: "🎵", label: "وقتی آواز می‌خوانیم", say: "وقتی آواز می‌خوانیم", basket: "no" }
        ] },
      { type: "order", prompt: "کارهای شستن دست را به ترتیب بچین", numbered: true,
        items: [{ pic: "💧", label: "خیس کردن" }, { pic: "🧼", label: "صابون زدن" }, { pic: "🫧", label: "مالیدن" }, { pic: "🚰", label: "آب کشیدن" }, { pic: "👐", label: "خشک کردن" }] },
      { type: "order", prompt: "کارهای مسواک زدن را به ترتیب بچین", numbered: true,
        items: [{ pic: "🪥", label: "خمیردندان، اندازه یک نخود" }, { pic: "🦷", label: "مسواک زدن جلو و پشت دندان‌ها" }, { pic: "💦", label: "تف کردن" }] },
      { type: "doit", pic: "🧼", text: "امروز هر بار دست‌هایت را شستی، آرام تا بیست بشمار. شب به بزرگ‌ترت بگو چند بار دست‌هایت را شستی." },
      { type: "forparents",
        tips: [
          "این بازی را در خانه هم بکنید: بپرسید «الان دست بشوییم یا لازم نیست؟» پیش از غذا، بعد از دستشویی، بعد از بازی بیرون، بعد از ناز کردن حیوان و بعد از فین کردن.",
          "کنار روشویی یک چهارپایه بگذارید تا کودک خودش به شیر آب و صابون برسد، و حوله‌اش را جایی بگذارید که دستش برسد.",
          "مسواک شب را با هم بزنید و کار کودک را بعد از او تمام کنید. تا هفت هشت سالگی بیشتر کودکان هنوز به کمک نیاز دارند."
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
    id: "health-seed-7", subject: "health", level: "seed", emoji: "🐻", title: "مثل حیوان‌ها",
    steps: [
      /* Animal moves on a rug in an empty corner of the room: each animal moves along the back, and the boy does the
         same move in front: a bear (hands and feet on the floor), a rabbit (small hops, feet together), a frog (down low,
         then a big jump), a crab (tummy up, on hands and feet) and a stork (on one leg, counted to five).
         Drawings: js/art/rig-health.js (h-bear, h-stork) and the animal pictures (js/art/animals.js). */
      { type: "scene", prompt: "ببین و مثل حیوان‌ها حرکت کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, rug: { art: "rug-side", at: [86, 90], s: 1.3 },
          bear: { art: "h-bear", at: [-34, 68], s: 1.1 }, rabbit: { art: "🐇", at: [-20, 68], s: 1.1 },
          frog: { art: "🐸", at: [-20, 68], s: 1.1 }, crab: { art: "🦀", at: [-20, 68], s: 1.1 },
          stork: { art: "h-stork", at: [-20, 68], s: 0.85 },
          boy: { art: "h-boy", at: [20, 86], s: 1.5 },
          counter: { art: "counter", at: [140, 18], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "روی فرش، یک جای خالی پیدا می‌کنیم. بیا مثل حیوان‌ها حرکت کنیم!", key: 3000, do: [
            { id: "boy", to: { x: 56 }, dur: 2400, ease: "linear" }
          ].concat(B.hwalk("boy", 0, 2400, 4), [
            { id: "boy.head", to: { r: -10 }, at: 2600, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "مثل خرس راه می‌رویم: دست‌ها و پاها روی زمین.", key: 5200, hold: 8000, do: [
            { id: "bear", walk: [70, 68], at: 600, dur: 5400, steps: 8 },
            { id: "boy", to: { y: 88.4 }, dur: 800 }
          ].concat(B.hpose("boy", "h-boy", { upper: 110, head: -60, legF: 30, legB: 26, armF: [12, -2.8], armB: [10.5, -2.8] }, 0, 800), [
            { id: "boy", to: { x: 92 }, at: 1200, dur: 5400, ease: "linear" },
            { id: "boy.armF", to: { r: "+14" }, at: 1200, dur: 5400, yoyo: true, times: 12 },
            { id: "boy.armB", to: { r: "-14" }, at: 1200, dur: 5400, yoyo: true, times: 12 },
            { id: "boy.legF", to: { r: "-12" }, at: 1200, dur: 5400, yoyo: true, times: 12 },
            { id: "boy.legB", to: { r: "+12" }, at: 1200, dur: 5400, yoyo: true, times: 12 }
          ]) },
          { caption: "مثل خرگوش، با دو پای جفت، کوچک و آرام می‌پریم.", key: 4300, hold: 8000, do: [
            { id: "bear", to: { x: 190 }, dur: 2000, ease: "in" },
            { id: "boy", to: { y: 86 }, dur: 600 }
          ].concat(B.hunpose("boy", "h-boy", 0, 600), [
            { id: "rabbit", path: "M-20 68Q-12 60-4 68Q4 60 12 68Q20 60 28 68Q36 60 44 68Q52 60 60 68", at: 800, dur: 5000, ease: "linear" },
            { id: "boy", to: { y: 91.4 }, at: 800, dur: 600 }
          ], B.hpose("boy", "h-boy", { upper: 20, legF: -50, shinF: 90, legB: -50, shinB: 90, armF: [3, -36], armB: [1.5, -36] }, 800, 600), [
            { id: "boy", path: "M92 91.4Q86 82 80 91.4Q74 82 68 91.4Q62 82 56 91.4", at: 2000, dur: 4500, ease: "linear" }
          ]) },
          { caption: "مثل قورباغه، پایین می‌نشینیم و بلند می‌پریم.", key: 3000, hold: 9000, do: [
            { id: "rabbit", to: { x: 190 }, dur: 2000, ease: "in" },
            { id: "frog", to: { x: 20 }, at: 400, dur: 1000 }
          ].concat(B.hpose("boy", "h-boy", { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] }, 0, 900), [
            { id: "boy", to: { y: 101.2 }, dur: 900 },
            { id: "frog", path: "M20 68Q32 36 44 68", at: 2200, dur: 1400 },
            { id: "boy", path: "M56 101.2L58 101.2Q68 28 78 86", at: 2400, dur: 1600 }
          ], B.hpose("boy", "h-boy", { upper: 0, head: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [3, -33.5], armB: [1, -33.5] }, 2400, 600),
            B.hpose("boy", "h-boy", { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] }, 4100, 700), [
            { id: "boy", to: { y: 101.2 }, at: 4100, dur: 700 },
            { id: "frog", path: "M44 68Q56 36 68 68", at: 5600, dur: 1400 },
            { id: "boy", path: "M78 101.2L80 101.2Q90 28 100 86", at: 5800, dur: 1600 }
          ], B.hpose("boy", "h-boy", { upper: 0, head: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [3, -33.5], armB: [1, -33.5] }, 5800, 600),
            B.hpose("boy", "h-boy", { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] }, 7500, 700), [
            { id: "boy", to: { y: 101.2 }, at: 7500, dur: 700 }
          ]) },
          { caption: "مثل خرچنگ، شکم رو به بالا، روی دست‌ها و پاها راه می‌رویم.", key: 5000, hold: 8400, do: [
            { id: "frog", path: "M68 68Q90 44 112 68Q140 44 190 68", dur: 2000 },
            { id: "crab", to: { x: 30 }, at: 600, dur: 1200 },
            { id: "crab", to: { x: "+6" }, at: 1800, dur: 5600, yoyo: true, times: 8 },
            { id: "boy", to: { y: 98.1 }, dur: 900 }
          ].concat(B.hpose("boy", "h-boy", { upper: -70, head: 40, legF: -110, shinF: 110, legB: -110, shinB: 110, armF: [-9.5, -9.25], armB: [-8.5, -9.25] }, 0, 900), [
            { id: "boy", to: { x: 70 }, at: 1600, dur: 6000, ease: "linear" },
            { id: "boy.legF", to: { r: "-12" }, at: 1600, dur: 6000, yoyo: true, times: 12 },
            { id: "boy.armB", to: { r: "+10" }, at: 1600, dur: 6000, yoyo: true, times: 12 }
          ]) },
          { caption: "مثل لک‌لک، روی یک پا می‌ایستیم و تا پنج می‌شماریم.", key: 6200, hold: 9000, do: [
            { id: "crab", to: { x: 190 }, dur: 2400 },
            { id: "stork", to: { x: 30 }, at: 400, dur: 1400 },
            { id: "boy", to: { y: 86 }, dur: 800 },
            { id: "stork.leg", to: { r: -110 }, at: 2000, dur: 700 }
          ].concat(B.hunpose("boy", "h-boy", 0, 800), B.hpose("boy", "h-boy", { legB: -80, shinB: 90, armF: [9, -22], armB: [-9, -22] }, 2200, 800), [
            { id: "counter", to: { o: 1 }, at: 3000, dur: 300 }, { count: "counter", from: 1, to: 5, at: 3200, dur: 5000 },
            { id: "boy", to: { r: 2 }, at: 3200, dur: 5000, yoyo: true, times: 6 }
          ]) },
          { caption: "آفرین! حالا نوبت توست.", key: 1800, do: [
            { id: "counter", to: { o: 0 }, dur: 300 }, { id: "stork.leg", to: { r: 0 }, dur: 600 },
            { id: "stork", to: { x: 16 }, dur: 800 }, { id: "bear", to: { x: 42, y: 68 }, dur: 1 }, { id: "rabbit", to: { x: 98, y: 68 }, dur: 1 },
            { id: "frog", to: { x: 120, y: 68 }, dur: 1 }, { id: "crab", to: { x: 142, y: 68 }, dur: 1 }
          ].concat(B.hpose("boy", "h-boy", { legB: 0, shinB: 0, armF: [3, -33.5], armB: [1, -33.5] }, 0, 600), [
            { id: "boy", path: "M70 86Q70 72 70 86", at: 700, dur: 700 },
            { emit: "spark", from: "boy", where: [0, -30], spread: [30, 20], n: 10, at: 700, dur: 1000, life: 1400 }
          ]) }
        ] },
      { type: "doit", pic: "🐾", text: "حالا تو! روی فرش یا جای خالی، دور از میز و لبه‌ها، هر کدام را چند بار انجام بده:",
        list: ["مثل خرس راه برو: دست‌ها و پاها روی زمین.", "مثل خرگوش، کوچک بپر.", "مثل قورباغه، پایین بنشین و بلند بپر.", "مثل خرچنگ، شکم رو به بالا راه برو.", "مثل لک‌لک روی یک پا بایست و تا پنج بشمار. حالا پای دیگر!"] },
      { type: "pairs", prompt: "هر حیوان را با حرکتش جفت کن",
        pairs: [[{ pic: "🐻", say: "خرس" }, { label: "دست و پا روی زمین", say: "دست و پا روی زمین" }],
          [{ pic: "🐇", say: "خرگوش" }, { label: "پرش کوچک", say: "پرش کوچک" }],
          [{ pic: "🐸", say: "قورباغه" }, { label: "پرش بلند", say: "پرش بلند" }],
          [{ pic: "🦀", say: "خرچنگ" }, { label: "شکم رو به بالا", say: "شکم رو به بالا" }]] },
      { type: "doit", pic: "🎲", text: "بازی «حیوان بگو»: بزرگ‌ترت اسم یک حیوان را می‌گوید و تو مثل آن حرکت می‌کنی. بعد جایتان را عوض کنید! یک حیوان تازه هم بساز: مار، پنگوئن یا اسب." },
      { type: "forparents",
        tips: [
          "کودکان این سن باید هر روز روی هم رفته حدود سه ساعت بازی و حرکت کنند و دست‌کم یک ساعتش پرتحرک باشد (سازمان جهانی بهداشت). حرکت‌های حیوانی راهی ساده برای همین است.",
          "یک جای خالی آماده کنید: فرش یا پتو، دور از گوشه میز، شیشه و پله. جوراب را درآورید تا سُر نخورد.",
          "کودک را مجبور به تکرار نکنید. با او بازی کنید: «حالا من خرسم، تو خرگوش باش!» یا یک حیوان تازه بسازید: مار، پنگوئن، اسب.",
          "ایستادن روی یک پا را با هر دو پا تمرین کنید. برای شروع اگر لازم است دستش را به دیوار بگیرد."
        ] }
    ]
  },
  {
    id: "health-seed-8", subject: "health", level: "seed", emoji: "🏃", title: "بدو، بایست!",
    steps: [
      /* In the park: the girl runs and stops each time her mother says «بایست!» (the freeze game); jumps with both
         feet and lands softly on bent knees; walks along a chalk line, arms out; stands on one foot while five is
         counted. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین و با هم بازی کنیم", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, line: { art: "h-line", at: [34, 84], o: 0 },
          mom: { art: "h-mom", at: [146, 88], s: 1.15, flip: true },
          talk: { art: "h-talk", at: [133, 42], s: 1.4, flip: true, o: 0 },
          girl: { art: "h-girl", at: [10, 86], s: 1.4 },
          counter: { art: "counter", at: [112, 16], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "می‌دویم و می‌دویم. بزرگ‌تر می‌گوید «بایست!» و ما همان‌جا بی‌حرکت می‌ایستیم.", key: 3200, hold: 9800, do: [
            { id: "girl", to: { x: 56 }, dur: 2400, ease: "linear" }
          ].concat(B.hwalk("girl", 0, 2400, 4, true), [
            { id: "talk", to: { o: 1 }, at: 2200, dur: 200 }, { id: "talk", to: { s: 1.7 }, at: 2200, dur: 800, yoyo: true, times: 2 }, { id: "talk", to: { o: 0 }, at: 3400, dur: 300 }
          ], B.hpose("girl", "h-girl", { armF: [8.6, -24], armB: [-8, -23] }, 2400, 300), B.hunpose("girl", "h-girl", 4600, 300), [
            { id: "girl", to: { x: 100 }, at: 4900, dur: 2400, ease: "linear" }
          ], B.hwalk("girl", 4900, 2400, 4, true), [
            { id: "talk", to: { o: 1 }, at: 7100, dur: 200 }, { id: "talk", to: { s: 1.7 }, at: 7100, dur: 800, yoyo: true, times: 2 }, { id: "talk", to: { o: 0 }, at: 8300, dur: 300 }
          ], B.hpose("girl", "h-girl", { armF: [3, -33.5], armB: [9, -12] }, 7300, 300)) },
          { caption: "با دو پای جفت می‌پریم و نرم فرود می‌آییم: زانوها خم.", key: 5600, hold: 8000, do: B.hunpose("girl", "h-girl", 0, 500).concat(
            B.hpose("girl", "h-girl", { upper: 20, legF: -50, shinF: 90, legB: -50, shinB: 90, armF: [-6, -14], armB: [-6, -14] }, 800, 700), [
            { id: "girl", to: { y: 91 }, at: 800, dur: 700 },
            { id: "girl", path: "M100 91Q100 50 100 91", at: 2000, dur: 1600 }
          ], B.hpose("girl", "h-girl", { upper: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [3, -33.5], armB: [1, -33.5] }, 2000, 500),
            B.hpose("girl", "h-girl", { upper: 20, legF: -50, shinF: 90, legB: -50, shinB: 90, armF: [8, -16], armB: [7, -16] }, 3100, 500), [
            { emit: "spark", where: [100, 90], spread: [16, 2], rise: -2, n: 5, at: 3600, dur: 300, life: 900 },
            { id: "girl", to: { y: 86 }, at: 6300, dur: 600 }
          ], B.hunpose("girl", "h-girl", 6300, 600)) },
          { caption: "روی یک خط راه می‌رویم: یک پا جلوی پای دیگر.", key: 4600, hold: 9000, do: [
            { id: "line", to: { o: 1 }, dur: 500 }, { id: "girl", to: { flip: -1 }, at: 400, dur: 1 },
            { id: "girl", to: { x: 96 }, at: 500, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { armF: [8.6, -23], armB: [-8.4, -23] }, 800, 600), [
            { id: "girl", to: { x: 36 }, at: 1600, dur: 6400, ease: "linear" },
            { id: "girl.legF", to: { r: -16 }, at: 1600, dur: 6400, yoyo: true, times: 16 },
            { id: "girl.legB", to: { r: 16 }, at: 1600, dur: 6400, yoyo: true, times: 16 },
            { id: "girl", to: { r: 3 }, at: 1600, dur: 6400, yoyo: true, times: 8 }
          ]) },
          { caption: "روی یک پا می‌ایستیم و تا پنج می‌شماریم.", key: 6200, hold: 8000, do: [
            { id: "line", to: { o: 0 }, dur: 500 }, { id: "girl", to: { flip: 1 }, at: 300, dur: 1 }
          ].concat(B.hpose("girl", "h-girl", { legB: -80, shinB: 90, armF: [8.6, -23], armB: [-8.4, -23] }, 500, 700), [
            { id: "counter", to: { o: 1 }, at: 1200, dur: 300 }, { count: "counter", from: 1, to: 5, at: 1400, dur: 5000 },
            { id: "girl", to: { r: 2 }, at: 1400, dur: 5000, yoyo: true, times: 6 }
          ]) },
          { caption: "آفرین! حالا با هم بازی «بایست!» می‌کنیم.", key: 3200, do: [
            { id: "counter", to: { o: 0 }, dur: 300 }
          ].concat(B.hunpose("girl", "h-girl", 0, 500), [
            { id: "girl", to: { x: 110 }, at: 600, dur: 1400, ease: "linear" }
          ], B.hwalk("girl", 600, 1400, 2), B.hpose("girl", "h-girl", { armF: [3, -33.5] }, 2100, 400), B.hpose("mom", "h-mom", { armF: [6, -58] }, 2100, 400), [
            { id: "girl.armF", to: { r: "+20" }, at: 2500, dur: 1600, yoyo: true, times: 4 }, { id: "mom.armF", to: { r: "+16" }, at: 2500, dur: 1600, yoyo: true, times: 4 },
            { emit: "spark", where: [126, 50], spread: [40, 20], n: 10, at: 2500, dur: 1400, life: 1400 }
          ]) }
        ] },
      { type: "choose", prompt: "بزرگ‌ترت می‌گوید: «بایست!» چه کار می‌کنی؟", say: "بزرگ‌ترت می‌گوید: بایست! چه کار می‌کنی؟", stack: true,
        options: ["🧍 همان‌جا می‌ایستم", "🏃 تندتر می‌دوم"], answer: "🧍 همان‌جا می‌ایستم" },
      { type: "choose", prompt: "وقتی می‌پریم، چطور فرود می‌آییم؟", say: "وقتی می‌پریم، چطور فرود می‌آییم؟", stack: true,
        options: ["🦵 نرم، با زانوهای خم", "🪵 محکم، با پاهای صاف"], answer: "🦵 نرم، با زانوهای خم" },
      { type: "doit", pic: "🏃", text: "بازی «بایست!» با بزرگ‌ترت: تو می‌دوی یا راه می‌روی، او می‌گوید «بایست!» و تو مثل مجسمه می‌ایستی. بعد این‌ها را هم انجام بده:",
        list: ["با دو پا بپر و نرم فرود بیا: زانوها خم.", "روی یک خط راه برو: یک پا جلوی پای دیگر.", "روی یک پا بایست و تا پنج بشمار. حالا پای دیگر!"] },
      { type: "forparents",
        tips: [
          "بازی «بایست!» (مجسمه) به کودک یاد می‌دهد بدنش را کنترل کند و به نشانه گوش بدهد. نشانه را عوض کنید: دست زدن، بالا بردن یک دستمال، قطع شدن آهنگ.",
          "برای دویدن جای امن انتخاب کنید: حیاط، پارک یا راهروی خالی، دور از خیابان، پله و شیشه.",
          "یک خط با گچ، چسب کاغذی یا طناب روی زمین بکشید تا کودک رویش راه برود. بعد پس‌پسکی یا روی نوک پا امتحان کنید.",
          "پریدن و نرم فرود آمدن را چند بار با هم تمرین کنید؛ این برای مفصل‌ها و زمین نخوردن مهم است. اگر کودک هنوز نمی‌تواند روی یک پا بایستد، دستش را بگیرید."
        ] }
    ]
  },
  {
    id: "health-seed-9", subject: "health", level: "seed", emoji: "🧦", title: "توپ نرم",
    steps: [
      /* A soft ball made of rolled-up socks, played with Dad indoors, away from the window: rolling it to each other,
         throwing it underarm, catching it with two hands, kicking it gently. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین با توپ نرم چطور بازی می‌کنیم", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, win: { art: "h-window", at: [24, 26] }, ring: { art: "h-ring", at: [24, 26], s: 3.6, o: 0 },
          sock1: { art: "h-sock", at: [52, 82], s: 1.2 }, sock2: { art: "h-sock", at: [62, 83], s: 1.2, r: 30 },
          dad: { art: "h-dad", at: [176, 88], s: 1.15, flip: true },
          girl: { art: "h-girl", at: [36, 97.8], s: 1.4 },
          ball: { art: "h-sockball", at: [57, 80.6], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "چند جوراب را لوله می‌کنیم و یک توپ نرم می‌سازیم.", key: 3600, hold: 5600, do: B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1).concat(
            B.hpose("girl", "h-girl", { upper: 40, armF: [13.5, -10.5], armB: [12.5, -10] }, 300, 700), [
            { id: "sock1", to: { x: 56, y: 80, r: 180, s: 0.7 }, at: 1100, dur: 1600 }, { id: "sock2", to: { x: 58, y: 80, r: -160, s: 0.7 }, at: 1100, dur: 1600 },
            { id: "girl.foreF", to: { r: "+14" }, at: 1100, dur: 1600, yoyo: true, times: 6 },
            { id: "sock1", to: { o: 0 }, at: 2600, dur: 300 }, { id: "sock2", to: { o: 0 }, at: 2600, dur: 300 },
            { id: "ball", to: { o: 1 }, at: 2600, dur: 300 },
            { emit: "spark", where: [57, 78], spread: [10, 6], n: 6, at: 2800, dur: 500, life: 1100 }
          ]) },
          { caption: "دور از پنجره و چیزهای شکستنی، یک جای خالی پیدا می‌کنیم.", key: 4300, hold: 7400, do: [
            { id: "ring", to: { o: 1 }, dur: 400 }, { id: "ring", to: { s: 4.2 }, at: 400, dur: 4000, yoyo: true, times: 8 },
            { id: "girl", to: { y: 86 }, at: 500, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { upper: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [8, -17], armB: [8, -17.4] }, 500, 600), [
            { id: "ball", path: "M57 80.6L47.2 62.2", at: 500, dur: 600 },
            { id: "ring", to: { o: 0 }, at: 4600, dur: 400 },
            { id: "girl", to: { x: 64 }, at: 2400, dur: 2000, ease: "linear" }, { id: "ball", to: { x: 75.2 }, at: 2400, dur: 2000, ease: "linear" },
            { id: "girl.legF", to: { r: -20 }, at: 2400, dur: 2000, yoyo: true, times: 6 }, { id: "girl.legB", to: { r: 20 }, at: 2400, dur: 2000, yoyo: true, times: 6 },
            { id: "dad", walk: [132, 88], at: 2400, dur: 2600 }
          ]) },
          { caption: "توپ را روی زمین برای هم قِل می‌دهیم.", key: 4200, hold: 9000, do: [
            { id: "girl", to: { y: 97.8 }, dur: 600 }, { id: "dad", to: { y: 104.6 }, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 30, armF: [11.5, -6.2], armB: [11, -6.4] }, 0, 600),
            B.hpose("dad", "h-dad", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 30, armF: [15, -18.6], armB: [14, -18.6] }, 0, 600), [
            { id: "ball", path: "M75.2 62.2L80 80.6", dur: 600 },
            { id: "ball", to: { x: 113 }, at: 1400, dur: 2400, ease: "out" }, { id: "ball", to: { r: 900 }, at: 1400, dur: 2400, ease: "out" },
            { id: "ball", to: { x: 80 }, at: 4800, dur: 2400, ease: "out" }, { id: "ball", to: { r: 0 }, at: 4800, dur: 2400, ease: "out" },
            { id: "dad.armF", to: { r: "-10" }, at: 4400, dur: 500, yoyo: true, times: 2 }
          ]) },
          { caption: "از پایین و آرام، توپ را برای هم پرت می‌کنیم.", key: 2600, hold: 6200, do: [
            { id: "girl", to: { y: 86 }, dur: 600 }, { id: "dad", to: { y: 88 }, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { legF: 0, shinF: 0, legB: 0, shinB: 0, upper: 0, armF: [0.2, -12], armB: [0.2, -12] }, 0, 600),
            B.hpose("dad", "h-dad", { legF: 0, shinF: 0, legB: 0, shinB: 0, upper: 0, armF: [10, -30], armB: [10, -29.4] }, 0, 600), [
            { id: "ball", path: "M80 80.6L64.3 69.2", dur: 600 }
          ], B.hpose("girl", "h-girl", { armF: [-5, -15] }, 900, 700), [
            { id: "ball", path: "M64.3 69.2L57 65", at: 900, dur: 700 }
          ], B.hpose("girl", "h-girl", { armF: [8, -25] }, 1700, 500), [
            { id: "ball", path: "M57 65Q64 70 75.2 51Q96 26 120.5 53.5", at: 1700, dur: 1500, ease: "linear" },
            { id: "ball", to: { r: 360 }, at: 1700, dur: 1500 }
          ]) },
          { caption: "توپ را با دو دست می‌گیریم.", key: 3900, hold: 6400, do: B.hpose("dad", "h-dad", { armF: [-8, -24], armB: [0.2, -21] }, 300, 700).concat([
            { id: "ball", path: "M120.5 53.5L141.2 60.4", at: 300, dur: 700 }
          ], B.hpose("girl", "h-girl", { armF: [8, -17], armB: [8, -17.4] }, 500, 600), B.hpose("dad", "h-dad", { armF: [12, -38] }, 1100, 500), [
            { id: "ball", path: "M141.2 60.4Q130 66 118.2 44.3Q96 22 75.2 62.2", at: 1100, dur: 1800, ease: "linear" },
            { id: "ball", to: { r: 0 }, at: 1100, dur: 1800 }
          ], B.hpose("girl", "h-girl", { armF: [7, -18], armB: [7, -18.4] }, 2800, 300)) },
          { caption: "توپ را روی زمین می‌گذاریم و با پا آرام به آن ضربه می‌زنیم.", key: 3000, hold: 7400, do: [
            { id: "ball", path: "M75.2 62.2L78 80.6", dur: 700, ease: "in" }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 300, 500), B.hpose("dad", "h-dad", { armF: [0.2, -21], armB: [0.2, -21] }, 0, 500), [
            { id: "girl.legF", to: { r: 35 }, at: 1600, dur: 600 }, { id: "girl.legF", to: { r: -45 }, at: 2200, dur: 300, ease: "in" },
            { id: "ball", to: { x: 121 }, at: 2450, dur: 1800, ease: "out" }, { id: "ball", to: { r: 1000 }, at: 2450, dur: 1800, ease: "out" },
            { id: "girl.legF", to: { r: 0 }, at: 3000, dur: 500 },
            { id: "dad.legF", to: { r: -18 }, at: 3600, dur: 500 }
          ]) },
          { caption: "چه بازی خوبی! تو هم با یک بزرگ‌تر بازی کن.", key: 1600, do: [
            { id: "dad.legF", to: { r: 0 }, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { armF: [3, -33.5], armB: [1, -33.5] }, 300, 500), B.hpose("dad", "h-dad", { armF: [6, -58] }, 300, 500), [
            { id: "girl", path: "M64 86Q64 74 64 86", at: 900, dur: 700 },
            { emit: "spark", where: [96, 44], spread: [60, 20], n: 10, at: 900, dur: 1000, life: 1400 }
          ]) }
        ] },
      { type: "doit", pic: "🧦", text: "با یک بزرگ‌تر یک توپ جورابی بساز: چند جوراب را لوله کن و در یک جوراب دیگر فرو کن. حالا در یک جای خالی، دور از پنجره، با هم بازی کنید:",
        list: ["توپ را روی زمین برای هم قِل بدهید.", "از پایین و آرام برای هم پرت کنید.", "با دو دست بگیر.", "با پا آرام ضربه بزن."] },
      { type: "choose", prompt: "در خانه با کدام توپ بازی می‌کنیم؟", say: "در خانه با کدام توپ بازی می‌کنیم؟", stack: true,
        options: ["🧦 توپ نرم جورابی", "🏀 توپ سفت و سنگین"], answer: "🧦 توپ نرم جورابی" },
      { type: "choose", prompt: "کجا توپ‌بازی کنیم؟", say: "کجا توپ‌بازی کنیم؟", stack: true,
        options: ["🫧 یک جای خالی، دور از پنجره", "🪟 کنار پنجره و تلویزیون"], answer: "🫧 یک جای خالی، دور از پنجره" },
      { type: "forparents",
        tips: [
          "در خانه فقط توپ نرم: جوراب لوله‌شده، توپ پارچه‌ای یا بادکنک. اول با هم جا را خالی کنید و از پنجره، شیشه، تلویزیون و گلدان دور بمانید.",
          "از نزدیک شروع کنید (یک یا دو قدم) و کم‌کم دورتر بروید. اول قِل دادن، بعد پرت کردن از پایین، بعد گرفتن.",
          "گرفتن توپ برای کودک خردسال سخت است. توپ را آرام و درست به دست‌هایش بیندازید و هر بار که تلاش کرد تشویقش کنید، نه فقط وقتی گرفت.",
          "با هر دو دست و هر دو پا تمرین کنید: «حالا با پای دیگرت!»"
        ] }
    ]
  },
  {
    id: "health-seed-10", subject: "health", level: "seed", emoji: "🤸", title: "نرمش کوچک من",
    steps: [
      /* The first daily routine, done by a girl in her room: stretch up tall, march (seen from the side, knees up),
         jump, wiggle; then her hand on her chest: the heart beats fast after moving; then slow breaths and the heart
         slows down. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین و با هم نرمش کنیم", bg: "#dfe8f6",
        parts: {
          room: { art: "h-bedroom" }, rug: { art: "rug-side", at: [80, 90], s: 1.1 },
          side: { art: "h-girl", at: [80, 86], s: 1.6, o: 0 },
          kid: { art: "h-girl-front", at: [80, 86], s: 1.6 },
          heart: { art: "h-heart", at: [128, 26], s: 1.6, o: 0 },
          breath: { art: "h-breath", at: [128, 26], s: 2, o: 0 }
        },
        scenes: [
          { caption: "اول کش و قوس: دست‌ها را بالا می‌بریم و قد می‌کشیم.", key: 2400, hold: 6000, do: B.hpose("kid", "h-girl-front", { armL: [-9, -38], armR: [9, -38] }, 400, 1400).concat([
            { id: "kid", to: { sy: 1.04 }, at: 400, dur: 1400 },
            { id: "kid", to: { sy: 1 }, at: 3000, dur: 1200 }
          ], B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [7, -12] }, 3000, 1200)) },
          { caption: "رژه می‌رویم: زانوها بالا، دست‌ها تاب می‌خورند.", key: 1240, hold: 7600, do: [
            { id: "kid", to: { o: 0 }, dur: 400 }, { id: "side", to: { o: 1 }, dur: 400 },
            { id: "side.legF", to: { r: -70 }, at: 600, dur: 6400, yoyo: true, times: 10 }, { id: "side.shinF", to: { r: 70 }, at: 600, dur: 6400, yoyo: true, times: 10 },
            { id: "side.legB", to: { r: -70 }, at: 1240, dur: 6400, yoyo: true, times: 10 }, { id: "side.shinB", to: { r: 70 }, at: 1240, dur: 6400, yoyo: true, times: 10 },
            { id: "side.armB", to: { r: -35 }, at: 600, dur: 6400, yoyo: true, times: 10 }, { id: "side.armF", to: { r: -35 }, at: 1240, dur: 6400, yoyo: true, times: 10 },
            { id: "side", to: { y: "-1" }, at: 600, dur: 6400, yoyo: true, times: 20 }
          ] },
          { caption: "سر جایمان می‌پریم.", key: 1450, hold: 6000, do: [
            { id: "side", to: { o: 0 }, dur: 400 }, { id: "kid", to: { o: 1 }, dur: 400 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-9, -27], armR: [9, -27] }, 400, 400), [
            { id: "kid", path: "M80 86Q80 46 80 86", at: 900, dur: 1100, ease: "linear" },
            { id: "kid", path: "M80 86Q80 46 80 86", at: 2200, dur: 1100, ease: "linear" },
            { id: "kid", path: "M80 86Q80 46 80 86", at: 3500, dur: 1100, ease: "linear" }
          ]) },
          { caption: "بدنمان را تکان تکان می‌دهیم.", key: 2000, hold: 6000, do: B.hpose("kid", "h-girl-front", { armL: [-9, -14], armR: [9, -14] }, 0, 500).concat([
            { id: "kid", to: { r: 6 }, at: 500, dur: 4400, yoyo: true, times: 12 },
            { id: "kid.foreL", to: { r: 30 }, at: 500, dur: 4400, yoyo: true, times: 16 }, { id: "kid.foreR", to: { r: -30 }, at: 500, dur: 4400, yoyo: true, times: 16 },
            { id: "kid.head", to: { r: -8 }, at: 500, dur: 4400, yoyo: true, times: 8 },
            { id: "kid.mouth", to: { o: 0 }, at: 500, dur: 200 }, { id: "kid.grin", to: { o: 1 }, at: 500, dur: 200 }
          ]) },
          { caption: "دستمان را روی سینه می‌گذاریم. قلبمان تند می‌زند! وقتی حرکت می‌کنیم، قلب تندتر می‌زند.", key: 3000, hold: 7000, do: [
            { id: "kid", to: { r: 0 }, dur: 400 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [0.8, -19, -1] }, 300, 700), [
            { id: "kid.heart", to: { o: 1 }, at: 1000, dur: 300 }, { id: "heart", to: { o: 1 }, at: 1000, dur: 300 },
            { id: "kid.heart", to: { s: 1.4 }, at: 1300, dur: 5000, yoyo: true, times: 22 },
            { id: "heart", to: { s: 2.2 }, at: 1300, dur: 5000, yoyo: true, times: 22 }
          ]) },
          { caption: "حالا آرام می‌شویم: آرام نفس می‌کشیم، و قلب هم آرام‌تر می‌زند.", key: 4000, hold: 10000, do: [
            { id: "kid.grin", to: { o: 0 }, dur: 300 }, { id: "kid.mouth", to: { o: 1 }, dur: 300 },
            { id: "kid.pupils", to: { o: 0 }, at: 300, dur: 300 }, { id: "kid.shut", to: { o: 1 }, at: 300, dur: 300 },
            { id: "heart", to: { x: 32 }, dur: 800 },
            { id: "breath", to: { o: 1 }, at: 600, dur: 400 },
            { id: "breath", to: { s: 3 }, at: 1000, dur: 8000, yoyo: true, times: 4, ease: "inout" },
            { id: "kid", to: { sy: 1.03 }, at: 1000, dur: 8000, yoyo: true, times: 4, ease: "inout" },
            { id: "kid.heart", to: { s: 1.3 }, at: 1000, dur: 8000, yoyo: true, times: 8 },
            { id: "heart", to: { s: 2 }, at: 1000, dur: 8000, yoyo: true, times: 8 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [7, -12] }, 0, 900)) }
        ] },
      { type: "doit", pic: "🤸", text: "حالا نرمش کوچک خودت را انجام بده، با بزرگ‌ترت:",
        list: ["کش و قوس: دست‌ها بالا، قد بکش. سه بار.", "رژه برو: زانوها بالا. تا ده بشمار.", "سر جایت بپر. ده بار.", "بدنت را تکان تکان بده.", "دستت را روی سینه‌ات بگذار. قلبت را حس می‌کنی؟"] },
      { type: "breathe", cycles: 3 },
      { type: "choose", prompt: "وقتی تند حرکت می‌کنیم، قلبمان چطور می‌زند؟", say: "وقتی تند حرکت می‌کنیم، قلبمان چطور می‌زند؟", stack: true,
        options: ["💓 تندتر", "😴 آرام‌تر"], answer: "💓 تندتر" },
      { type: "forparents",
        tips: [
          "این نرمش کوچک را هر روز، صبح یا بعدازظهر، با هم انجام دهید؛ پنج دقیقه کافی است. حرکت‌ها را عوض کنید تا تازه بماند.",
          "سازمان جهانی بهداشت می‌گوید کودکان خردسال روزی حدود سه ساعت فعالیت بدنی لازم دارند، دست‌کم یک ساعتش پرتحرک (دویدن، پریدن، بازی پرجنب‌وجوش). از پنج سالگی، روزی دست‌کم یک ساعت فعالیت پرتحرک.",
          "کودک را بیشتر از یک ساعت پشت سر هم نشانده نگه ندارید: در ماشین، جلوی صفحه یا پشت میز. بعد از هر نشستن طولانی، با هم کمی حرکت کنید.",
          "بعد از نرمش، دست کودک را روی سینه‌اش بگذارید تا تند زدن قلب را حس کند، و بعد از چند نفس آرام، آرام‌تر شدنش را. همیشه با آرام شدن تمام کنید."
        ] }
    ]
  },
  {
    id: "health-seed-22", subject: "health", level: "seed", emoji: "🫧", title: "بالا، پایین، تند، آرام",
    steps: [
      /* Moving with control in my own space: a girl and a boy each in a space bubble (a dashed ring that moves with
         them); high (on tiptoe, arms up) and low (crouched small); fast and slow; forwards, backwards and (seen from
         the front) sideways; walking towards each other and stopping before the bubbles bump. Drawings:
         js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چطور در جای خودمان حرکت می‌کنیم", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" },
          girl: { art: "h-girl", at: [40, 86], s: 1.4 }, gB: { art: "h-space", at: [0, -17], under: "girl", o: 0 },
          front: { art: "h-girl-front", at: [50, 86], s: 1.4, o: 0 }, fB: { art: "h-space", at: [0, -17], under: "front" },
          boy: { art: "h-boy", at: [120, 86], s: 1.4, flip: true }, bB: { art: "h-space", at: [0, -17], under: "boy", o: 0 },
          turtle: { art: "🐢", at: [150, 88], s: 0.9, flip: true, o: 0 }
        },
        scenes: [
          { caption: "هر کدام از ما دور خودش یک حباب دارد: جای خودش. در حباب خودمان حرکت می‌کنیم.", key: 2400, do: [
            { id: "gB", to: { o: 1 }, at: 400, dur: 600 }, { id: "bB", to: { o: 1 }, at: 900, dur: 600 },
            { id: "gB", to: { s: 1.08 }, at: 1100, dur: 1600, yoyo: true, times: 2 }, { id: "bB", to: { s: 1.08 }, at: 1600, dur: 1600, yoyo: true, times: 2 }
          ] },
          { caption: "بالا می‌رویم: روی نوک پا، دست‌ها بالا.", key: 1800, hold: 4000, do:
            B.hpose("girl", "h-girl", { armF: [3, -33.5], armB: [1, -33.5] }, 400, 800).concat(B.hpose("boy", "h-boy", { armF: [3, -33.5], armB: [1, -33.5] }, 400, 800), [
            { id: "girl", to: { sy: 1.05 }, at: 400, dur: 800 }, { id: "boy", to: { sy: 1.05 }, at: 400, dur: 800 }
          ]) },
          { caption: "پایین می‌آییم: می‌نشینیم و کوچک می‌شویم.", key: 2000, hold: 4000, do: [
            { id: "girl", to: { sy: 1, y: 100.1 }, at: 200, dur: 900 }, { id: "boy", to: { sy: 1, y: 100.1 }, at: 200, dur: 900 }
          ].concat(B.hpose("girl", "h-girl", { upper: 50, head: -20, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [7.5, -11], armB: [6.5, -11] }, 200, 900),
            B.hpose("boy", "h-boy", { upper: 50, head: -20, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [7.5, -11], armB: [6.5, -11] }, 200, 900)) },
          { caption: "تند راه می‌رویم.", key: 2200, hold: 4000, do: [
            { id: "girl", to: { y: 86 }, dur: 700 }, { id: "boy", to: { y: 86 }, dur: 700 }
          ].concat(B.hunpose("girl", "h-girl", 0, 700), B.hunpose("boy", "h-boy", 0, 700), [
            { id: "boy", walk: [190, 86], at: 700, dur: 1800 },
            { id: "girl", walk: [118, 86], at: 1200, dur: 1800, steps: 7 }
          ]) },
          { caption: "آرام راه می‌رویم، مثل لاک‌پشت.", key: 3000, hold: 6600, do: [
            { id: "girl", to: { flip: -1 }, dur: 1 },
            { id: "girl", walk: [40, 86], at: 200, dur: 6400, steps: 7 },
            { id: "turtle", to: { o: 1 }, at: 200, dur: 400 }, { id: "turtle", to: { x: 104 }, at: 200, dur: 6400, ease: "linear" },
            { id: "turtle", to: { o: 0 }, at: 6800, dur: 400 }
          ] },
          { caption: "جلو می‌رویم، و عقب عقب می‌رویم.", key: 4400, hold: 6400, do: [
            { id: "girl", to: { flip: 1 }, dur: 1 },
            { id: "girl", walk: [80, 86], at: 300, dur: 2400 },
            { id: "girl", walk: [50, 86], at: 3200, dur: 3000 }
          ] },
          { caption: "به پهلو هم می‌رویم.", key: 2400, hold: 4400, do: [
            { id: "girl", to: { o: 0 }, dur: 400 }, { id: "front", to: { o: 1 }, dur: 400 },
            { id: "front", to: { x: 96 }, at: 600, dur: 3400, ease: "linear" },
            { id: "front.legL", to: { r: 14 }, at: 600, dur: 3400, yoyo: true, times: 8 }, { id: "front.legR", to: { r: -14 }, at: 600, dur: 3400, yoyo: true, times: 8 }
          ] },
          { caption: "به هم نزدیک می‌شویم و پیش از آن‌که حباب‌هایمان به هم بخورند، می‌ایستیم.", key: 5200, hold: 7400, do: [
            { id: "front", to: { o: 0 }, dur: 400 }, { id: "girl", to: { x: 24, o: 1 }, dur: 1 },
            { id: "boy", to: { x: 176 }, dur: 1 },
            { id: "girl", walk: [57, 86], at: 400, dur: 3600 }, { id: "boy", walk: [104, 86], at: 400, dur: 3600 },
            { id: "gB", to: { s: 1.08 }, at: 4200, dur: 1000, yoyo: true, times: 2 }, { id: "bB", to: { s: 1.08 }, at: 4200, dur: 1000, yoyo: true, times: 2 }
          ].concat(B.hpose("girl", "h-girl", { armF: [6, -30] }, 4300, 500), B.hpose("boy", "h-boy", { armF: [6, -30] }, 4300, 500), [
            { id: "girl.foreF", to: { r: "+30" }, at: 4800, dur: 1600, yoyo: true, times: 4 }, { id: "boy.foreF", to: { r: "+30" }, at: 4800, dur: 1600, yoyo: true, times: 4 }
          ]) }
        ] },
      { type: "choose", prompt: "دوستت جلوی توست و تند می‌دوی. چه کار می‌کنی؟", say: "دوستت جلوی توست و تند می‌دوی. چه کار می‌کنی؟", stack: true,
        options: ["🧍 آرام می‌کنم و پیش از رسیدن به او می‌ایستم", "💥 همان‌طور تند می‌دوم"], answer: "🧍 آرام می‌کنم و پیش از رسیدن به او می‌ایستم" },
      { type: "choose", prompt: "کدام «پایین» است؟", say: "کدام پایین است؟", pic: true,
        options: [{ label: "🧎", value: "low" }, { label: "🙆", value: "high" }], answer: "low" },
      { type: "doit", pic: "🫧", text: "دست‌هایت را باز کن و دور خودت بچرخ: این حباب توست! حالا در حباب خودت، بزرگ‌ترت می‌گوید و تو انجام می‌دهی:",
        list: ["بالا: روی نوک پا، دست‌ها بالا.", "پایین: بنشین و کوچک شو.", "تند راه برو… آرام راه برو.", "جلو برو، عقب عقب برو، به پهلو برو.", "«بایست!»"] },
      { type: "forparents",
        tips: [
          "«حباب من» یعنی فضای خود کودک. وقتی دست‌هایش را باز می‌کند و دور خودش می‌چرخد، اندازه‌اش را حس می‌کند. این به او کمک می‌کند در بازی گروهی، صف و کلاس به دیگران نخورد.",
          "بازی «بزرگ‌تر می‌گوید»: یک کلمه بگویید (بالا، پایین، تند، آرام، جلو، عقب، پهلو، بایست) و کودک انجام دهد. بعد جایتان را عوض کنید و کودک فرمان بدهد.",
          "اول در جای باز و خلوت بازی کنید. کودک باید بتواند تند برود و بی‌آن‌که به چیزی بخورد بایستد؛ این مهارت برای خیابان و حیاط مدرسه هم مهم است."
        ] }
    ]
  },
  {
    id: "health-seed-23", subject: "health", level: "seed", emoji: "🥁", title: "با ریتم",
    steps: [
      /* Dad plays the tonbak, kneeling; each beat his hand hits the drum, the skin shakes and a note rises. The girl
         moves to the beat: clapping, marching, quick steps when the beat is fast, swaying when it is slow, and
         freezing when it stops. Drawings: js/art/rig-health.js and the tonbak from js/art/rig-science.js. */
      { type: "scene", prompt: "گوش کن و با ضرب حرکت کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, rug: { art: "rug-side", at: [60, 90], s: 1 },
          dad: { art: "h-dad", at: [124, 104.6], s: 1.15, flip: true },
          drum: { art: "sci-tonbak", at: [106, 88], s: 0.75 },
          n1: { art: "sci-note", at: [104, 64], s: 1.2, o: 0 }, n2: { art: "sci-note", at: [104, 64], s: 1.2, o: 0 }, n3: { art: "sci-note", at: [104, 64], s: 1.2, o: 0 },
          kid: { art: "h-girl-front", at: [50, 86], s: 1.5 },
          side: { art: "h-girl", at: [50, 86], s: 1.5, o: 0 }
        },
        scenes: [
          { caption: "بابا تنبک می‌زند: بوم، بوم، بوم. ما با ضرب دست می‌زنیم.", key: 3600, hold: 7600, do: B.hpose("dad", "h-dad", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 20, armF: [14.4, -30.5], armB: [12, -24] }, 0, 1).concat(
            B.hpose("kid", "h-girl-front", { armL: [-0.9, -16.4], armR: [0.9, -16.4] }, 300, 600), [
            { id: "dad.foreF", to: { r: -22 }, at: 900, dur: 5400, yoyo: true, times: 12 },
            { id: "drum.skin", to: { sy: 0.5 }, at: 1350, dur: 5400, yoyo: true, times: 12 },
            { id: "kid.foreL", to: { r: 30 }, at: 900, dur: 5400, yoyo: true, times: 12 }, { id: "kid.foreR", to: { r: -30 }, at: 900, dur: 5400, yoyo: true, times: 12 }
          ], B.hnotes(["n1", "n2", "n3"], 104, 64, 1800, 900, 5)) },
          { caption: "با ضرب رژه می‌رویم: زانوها بالا.", key: 2200, hold: 7600, do: [
            { id: "kid", to: { o: 0 }, dur: 400 }, { id: "side", to: { o: 1 }, dur: 400 },
            { id: "dad.foreF", to: { r: -22 }, at: 400, dur: 6300, yoyo: true, times: 14 },
            { id: "drum.skin", to: { sy: 0.5 }, at: 850, dur: 6300, yoyo: true, times: 14 },
            { id: "side.legF", to: { r: -70 }, at: 400, dur: 6300, yoyo: true, times: 7 }, { id: "side.shinF", to: { r: 70 }, at: 400, dur: 6300, yoyo: true, times: 7 },
            { id: "side.legB", to: { r: -70 }, at: 1300, dur: 6300, yoyo: true, times: 7 }, { id: "side.shinB", to: { r: 70 }, at: 1300, dur: 6300, yoyo: true, times: 7 },
            { id: "side.armB", to: { r: -35 }, at: 400, dur: 6300, yoyo: true, times: 7 }, { id: "side.armF", to: { r: -35 }, at: 1300, dur: 6300, yoyo: true, times: 7 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [7, -12] }, 0, 1), B.hnotes(["n1", "n2", "n3"], 104, 64, 1300, 900, 6)) },
          { caption: "ضرب تند شد: ما هم تند قدم برمی‌داریم.", key: 2050, hold: 6000, do: [
            { id: "dad.foreF", to: { r: -22 }, dur: 4500, yoyo: true, times: 20 },
            { id: "drum.skin", to: { sy: 0.5 }, at: 225, dur: 4500, yoyo: true, times: 20 },
            { id: "side.legF", to: { r: -40 }, dur: 4500, yoyo: true, times: 10 }, { id: "side.shinF", to: { r: 40 }, dur: 4500, yoyo: true, times: 10 },
            { id: "side.legB", to: { r: -40 }, at: 450, dur: 4500, yoyo: true, times: 10 }, { id: "side.shinB", to: { r: 40 }, at: 450, dur: 4500, yoyo: true, times: 10 },
            { id: "side.armB", to: { r: -30 }, dur: 4500, yoyo: true, times: 10 }, { id: "side.armF", to: { r: -30 }, at: 450, dur: 4500, yoyo: true, times: 10 }
          ].concat(B.hnotes(["n1", "n2", "n3"], 104, 64, 200, 450, 9)) },
          { caption: "ضرب آرام شد: ما هم آرام تاب می‌خوریم.", key: 3400, hold: 8400, do: [
            { id: "side", to: { o: 0 }, dur: 400 }, { id: "kid", to: { o: 1 }, dur: 400 },
            { id: "dad.foreF", to: { r: -22 }, at: 400, dur: 7000, yoyo: true, times: 10 },
            { id: "drum.skin", to: { sy: 0.5 }, at: 1100, dur: 7000, yoyo: true, times: 10 },
            { id: "kid", to: { r: 7 }, at: 900, dur: 7000, yoyo: true, times: 5 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-9, -36], armR: [9, -36] }, 300, 600), B.hnotes(["n1", "n2", "n3"], 104, 64, 900, 1400, 5)) },
          { caption: "صدا قطع شد: بی‌حرکت می‌ایستیم!", key: 2400, hold: 5000, do: [
            { id: "kid", to: { r: 0 }, dur: 300 }, { id: "dad.foreF", to: { r: -22 }, dur: 300 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-3, -38], armR: [9, -21] }, 0, 300), [
            { id: "kid.mouth", to: { o: 0 }, at: 300, dur: 100 }, { id: "kid.grin", to: { o: 1 }, at: 300, dur: 100 },
            { id: "kid.pupils", to: { x: 0.6 }, at: 1600, dur: 300 }, { id: "kid.pupils", to: { x: 0 }, at: 3200, dur: 300 }
          ]) }
        ] },
      { type: "doit", pic: "🥁", text: "بزرگ‌ترت با قابلمه و قاشق یا با دست زدن ضرب بگیرد، یا یک آهنگ بچگانه بگذارد. تو با ضرب حرکت کن:",
        list: ["دست بزن.", "رژه برو.", "ضرب تند: تند قدم بردار. ضرب آرام: آرام تاب بخور.", "صدا قطع شد: مثل مجسمه بایست!"] },
      { type: "choose", prompt: "ضرب تند شد. ما چطور حرکت می‌کنیم؟", say: "ضرب تند شد. ما چطور حرکت می‌کنیم؟", stack: true,
        options: ["🏃 تند", "🐢 آرام"], answer: "🏃 تند" },
      { type: "choose", prompt: "صدا قطع شد! چه کار می‌کنیم؟", say: "صدا قطع شد! چه کار می‌کنیم؟", stack: true,
        options: ["🧍 مثل مجسمه می‌ایستیم", "🤸 بیشتر می‌پریم"], answer: "🧍 مثل مجسمه می‌ایستیم" },
      { type: "forparents",
        tips: [
          "حرکت با ریتم به هماهنگی بدن، گوش دادن و بعدها به خواندن و ریاضی هم کمک می‌کند. ساز لازم نیست: دست زدن، قابلمه و قاشق، یا ضرب گرفتن روی میز کافی است.",
          "ضرب را گاهی تند و گاهی آرام کنید و ناگهان قطع کنید تا کودک «مجسمه» شود. بعد جایتان را عوض کنید و بگذارید کودک ضرب بگیرد و شما حرکت کنید.",
          "شعرها و ترانه‌های کودکانه خودتان را بخوانید، شعرهایی که در خانواده و منطقه‌تان رایج است."
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
  {
    id: "health-seed-11", subject: "health", level: "seed", emoji: "🥕", title: "رنگ‌های سفره",
    steps: [
      /* Fruit and vegetables of every colour come onto the sofreh, one colour at a time; the boy puts a little of each
         colour on his plate, eats with his mother at the sofreh, chewing slowly, and tries a new taste she offers
         (fresh herbs). No food is called bad. Drawings: js/art/rig-health.js and the food pictures (js/art/food.js). */
      { type: "scene", prompt: "به رنگ‌های سفره نگاه کن", bg: "#fbeedd",
        parts: {
          room: { art: "h-kitchen" }, sofreh: { art: "h-sofreh", at: [84, 80], s: 1.5 },
          tomato: { art: "🍅", at: [54, 68], s: 0.6, o: 0 }, carrot: { art: "🥕", at: [69, 68], s: 0.6, o: 0 },
          banana: { art: "🍌", at: [84, 68], s: 0.6, o: 0 }, cucumber: { art: "🥒", at: [99, 68], s: 0.6, o: 0 },
          grapes: { art: "🍇", at: [114, 68], s: 0.6, o: 0 },
          plate: { art: "🍽️", at: [42, 86], s: 0.5 },
          boy: { art: "h-boy", at: [24, 100.6], s: 1.5 }, mom: { art: "h-mom-home", at: [142, 104.6], s: 1.15, flip: true },
          herb: { art: "🥬", at: [121.6, 70], s: 0.4, o: 0 }
        },
        scenes: [
          { caption: "میوه و سبزی رنگارنگ است: قرمز، نارنجی، زرد، سبز و بنفش.", key: 7400, hold: 8200, do: B.hpose("boy", "h-boy", "sit", 0, 1).concat(
            B.hpose("mom", "h-mom-home", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1), [
            { id: "tomato", path: "M54 68L54 80", at: 300, dur: 600, ease: "out" }, { id: "tomato", to: { o: 1 }, at: 300, dur: 300 },
            { id: "carrot", path: "M69 68L69 80", at: 1800, dur: 600, ease: "out" }, { id: "carrot", to: { o: 1 }, at: 1800, dur: 300 },
            { id: "banana", path: "M84 68L84 80", at: 3300, dur: 600, ease: "out" }, { id: "banana", to: { o: 1 }, at: 3300, dur: 300 },
            { id: "cucumber", path: "M99 68L99 80", at: 4800, dur: 600, ease: "out" }, { id: "cucumber", to: { o: 1 }, at: 4800, dur: 300 },
            { id: "grapes", path: "M114 68L114 80", at: 6300, dur: 600, ease: "out" }, { id: "grapes", to: { o: 1 }, at: 6300, dur: 300 }
          ]) },
          { caption: "از هر رنگ کمی در بشقابمان می‌گذاریم.", key: 6900, hold: 7000, do: B.hpose("boy", "h-boy", { upper: 25, armF: [11, -12] }, 300, 600).concat([
            { id: "tomato", path: "M54 80Q48 70 38 84", at: 1000, dur: 700 }, { id: "tomato", to: { s: 0.35 }, at: 1000, dur: 700 },
            { id: "carrot", path: "M69 80Q56 66 44 84", at: 1900, dur: 900 }, { id: "carrot", to: { s: 0.35 }, at: 1900, dur: 900 },
            { id: "banana", path: "M84 80Q64 62 46 82", at: 3000, dur: 1000 }, { id: "banana", to: { s: 0.35 }, at: 3000, dur: 1000 },
            { id: "cucumber", path: "M99 80Q70 58 40 81", at: 4200, dur: 1100 }, { id: "cucumber", to: { s: 0.35 }, at: 4200, dur: 1100 },
            { id: "grapes", path: "M114 80Q80 54 43 80", at: 5400, dur: 1200 }, { id: "grapes", to: { s: 0.35 }, at: 5400, dur: 1200 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [0.2, -12] }, 6700, 500)) },
          { caption: "با هم سر سفره می‌نشینیم و آرام و با حوصله می‌جویم.", key: 3200, hold: 8400, do: B.hpose("boy", "h-boy", { upper: 25, armF: [11, -12] }, 0, 600).concat([
            { id: "boy.bread", to: { o: 1 }, at: 700, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 700, 700), [
            { id: "boy.mouth", to: { o: 0 }, at: 1400, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1400, dur: 100 },
            { id: "boy.bread", to: { o: 0 }, at: 1600, dur: 200 },
            { id: "boy.open", to: { sy: 0.3 }, at: 1700, dur: 4800, yoyo: true, times: 8 },
            { id: "boy.open", to: { o: 0 }, at: 6600, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 6600, dur: 100 },
            { id: "mom.head", to: { r: 8 }, at: 1700, dur: 2400, yoyo: true, times: 2 }
          ], B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 6600, 500)) },
          { caption: "یک مزه تازه را امتحان می‌کنیم: یک لقمه کوچک!", key: 3300, hold: 8600, do: B.hpose("mom", "h-mom-home", { upper: 15, armF: [16, -30] }, 0, 700).concat([
            { id: "herb", to: { o: 1 }, at: 700, dur: 200 },
            { id: "herb", path: "M121.6 70Q80 50 44 82", at: 1100, dur: 1400 }
          ], B.hpose("mom", "h-mom-home", { upper: 0, armF: [0.2, -21] }, 1500, 600), B.hpose("boy", "h-boy", { upper: 25, armF: [11, -12] }, 2200, 500), [
            { id: "herb", path: "M44 82Q40 70 33.6 63", at: 2800, dur: 700 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 2800, 700), [
            { id: "boy.mouth", to: { o: 0 }, at: 3400, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 3400, dur: 100 },
            { id: "herb", to: { o: 0 }, at: 3600, dur: 200 },
            { id: "boy.open", to: { sy: 0.3 }, at: 3700, dur: 2800, yoyo: true, times: 6 },
            { id: "boy.open", to: { o: 0 }, at: 6600, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 6600, dur: 100 },
            { emit: "spark", where: [34, 58], spread: [12, 8], n: 6, at: 6700, dur: 600, life: 1200 }
          ], B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 6600, 500)) }
        ] },
      { type: "sort", prompt: "هر کدام را در سبد رنگ خودش بگذار",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "سبز", pic: "🟢", value: "green" }, { label: "زرد", pic: "🟡", value: "yellow" }],
        items: [
          { pic: "🍅", say: "گوجه", basket: "red" }, { pic: "🍎", say: "سیب", basket: "red" }, { pic: "🍓", say: "توت‌فرنگی", basket: "red" },
          { pic: "🥒", say: "خیار", basket: "green" }, { pic: "🥬", say: "کاهو", basket: "green" },
          { pic: "🍌", say: "موز", basket: "yellow" }, { pic: "🍋", say: "لیمو", basket: "yellow" }
        ] },
      { type: "sort", prompt: "حالا نارنجی‌ها و بنفش‌ها",
        baskets: [{ label: "نارنجی", pic: "🟠", value: "orange" }, { label: "بنفش", pic: "🟣", value: "purple" }],
        items: [
          { pic: "🥕", say: "هویج", basket: "orange" }, { pic: "🍊", say: "پرتقال", basket: "orange" },
          { pic: "🍇", say: "انگور", basket: "purple" }, { pic: "🍆", say: "بادمجان", basket: "purple" }, { pic: "🫐", say: "زغال‌اخته", basket: "purple" }
        ] },
      { type: "doit", pic: "🌈", text: "سر سفره امروز، بشمار چند رنگ میوه و سبزی داری. یک خوراکی را که تا حالا نخورده‌ای، یک لقمه کوچک امتحان کن. آرام بجو!" },
      { type: "forparents",
        tips: [
          "هر روز میوه و سبزی از رنگ‌های مختلف سر سفره بگذارید؛ میوه و سبزی فصل ارزان‌تر و خوش‌مزه‌تر است. سبزی خوردن، خیار و گوجه کنار غذا هم حساب است.",
          "کودکان گاهی باید یک خوراکی تازه را ده بار یا بیشتر ببینند و بچشند تا دوستش داشته باشند. مجبورش نکنید؛ یک لقمه کوچک پیشنهاد کنید و اگر نخواست، روز دیگر دوباره.",
          "هیچ خوراکی را «بد» نخوانید و خوراکی را جایزه یا تنبیه نکنید. بگویید «این را هر روز می‌خوریم» و «این را گاهی».",
          "با هم و بدون تلویزیون و گوشی سر سفره بنشینید. آرام غذا خوردن و حرف زدن سر سفره به کودک کمک می‌کند سیری‌اش را حس کند."
        ] }
    ]
  },
  {
    id: "health-seed-12", subject: "health", level: "seed", emoji: "🌙", title: "شب بخیر بدن",
    steps: [
      /* The bedtime order, room by room (the camera goes along the house): dinner at the sofreh, brushing teeth, the
         toilet and washing hands, a story in bed with the light low, lights out and sleep (the blanket rises and falls,
         the mark on the height chart goes up a little: sleep helps the body grow), and waking up fresh in the morning.
         Drawings: js/art/rig-health.js and the bathroom from js/art/rig.js. */
      { type: "scene", prompt: "ببین شب‌ها چه کارهایی می‌کنیم", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, win: { art: "h-window", at: [132, 24] }, sofreh: { art: "h-sofreh", at: [82, 80], s: 1.2 },
          bread: { art: "🍞", at: [74, 81], s: 0.5 }, bowl: { art: "🍲", at: [90, 81], s: 0.5 },
          mom: { art: "h-mom-home", at: [124, 104.6], s: 1.15, flip: true }, boy: { art: "h-boy", at: [46, 100.6], s: 1.5 },
          bath: { art: "bathroom", at: [160, 0] }, boyF: { art: "h-boy-front", at: [240, 86], s: 1.8 }, counter: { art: "h-counter", at: [160, 0] },
          wc: { art: "h-bathroom", at: [320, 0] }, toilet: { art: "h-toilet", at: [374, 88], s: 1.1 },
          sink: { art: "h-sink-side", at: [452, 88], s: 1.3 }, boyT: { art: "h-boy", at: [380, 88], s: 1.4, flip: true },
          bedroom: { art: "h-bedroom", at: [480, 0] }, win2: { art: "h-window", at: [612, 24] }, chart: { art: "h-chart", at: [628, 88], s: 1.1 },
          bed: { art: "h-bed", at: [568, 88], s: 1.3 }, sleeper: { art: "h-boy", at: [584, 68.4], s: 1.3, r: -90 },
          blanket: { art: "h-blanket", at: [568, 88], s: 1.3 },
          mom2: { art: "h-mom-home", at: [516, 104.6], s: 1.15 },
          dark: { art: "h-dark", at: [480, 0], o: 0 }
        },
        scenes: [
          { caption: "شب شده. اول با هم شام می‌خوریم.", key: 3000, hold: 6600, do: [
            { id: "win.night", to: { o: 1 }, dur: 1 }, { id: "win.sun", to: { o: 0 }, dur: 1 }, { id: "win.moon", to: { o: 1 }, dur: 1 }, { id: "win.stars", to: { o: 1 }, dur: 1 },
            { id: "win2.night", to: { o: 1 }, dur: 1 }, { id: "win2.sun", to: { o: 0 }, dur: 1 }, { id: "win2.moon", to: { o: 1 }, dur: 1 }, { id: "win2.stars", to: { o: 1 }, dur: 1 }
          ].concat(B.hpose("boy", "h-boy", "sit", 0, 1), B.hpose("mom", "h-mom-home", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1),
            B.hpose("mom2", "h-mom-home", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1),
            B.hpose("boy", "h-boy", { upper: 25, armF: [11, -12] }, 400, 600), [
            { id: "boy.bread", to: { o: 1 }, at: 1100, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 1100, 700), [
            { id: "boy.mouth", to: { o: 0 }, at: 1800, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1800, dur: 100 },
            { id: "boy.bread", to: { o: 0 }, at: 2000, dur: 200 },
            { id: "boy.open", to: { sy: 0.3 }, at: 2100, dur: 3600, yoyo: true, times: 6 },
            { id: "mom.head", to: { r: 8 }, at: 2100, dur: 2400, yoyo: true, times: 2 }
          ]) },
          { caption: "بعد مسواک می‌زنیم.", key: 3800, hold: 6400, do: [
            { cam: { x: 240 }, dur: 1800 }
          ].concat(B.hpose("boyF", "h-boy-front", "brush", 1600, 700), [
            { id: "boyF.brush", to: { o: 1 }, at: 1600, dur: 200 },
            { id: "boyF.foreR", to: { r: "+9" }, at: 2400, dur: 3000, yoyo: true, times: 14 },
            { emit: "bubble", where: [242, 41], spread: [6, 3], rise: -4, n: 9, at: 2400, dur: 3000, life: 900 }
          ]) },
          { caption: "دستشویی می‌رویم و بعد دست‌هایمان را می‌شوییم.", key: 6400, hold: 8400, do: [
            { cam: { x: 400 }, dur: 1800 }
          ].concat(B.hpose("boyT", "h-boy", { armF: [8.2, -26] }, 1800, 700), [
            { id: "toilet.button", to: { y: 0.8 }, at: 2500, dur: 300 },
            { id: "toilet.flush", to: { o: 1 }, at: 2700, dur: 300 }, { id: "toilet.flush", to: { r: -20 }, at: 2700, dur: 1600, yoyo: true, times: 4 },
            { id: "toilet.button", to: { y: 0 }, at: 3100, dur: 300 }, { id: "toilet.flush", to: { o: 0 }, at: 4300, dur: 300 },
            { id: "boyT", to: { flip: 1 }, at: 3400, dur: 1 }
          ], B.hpose("boyT", "h-boy", { armF: [0.2, -12] }, 3000, 400), [
            { id: "boyT", to: { x: 435 }, at: 3500, dur: 2200, ease: "linear" }
          ], B.hwalk("boyT", 3500, 2200, 4), B.hpose("boyT", "h-boy", { armF: [8.9, -22.3], armB: [8.6, -22.6] }, 5800, 600), [
            { id: "sink.water", to: { o: 1 }, at: 5900, dur: 300 },
            { id: "boyT.foreF", to: { r: "+12" }, at: 6400, dur: 1800, yoyo: true, times: 6 },
            { emit: "bubble", where: [448, 57], spread: [8, 4], n: 8, at: 6400, dur: 1800 },
            { id: "sink.water", to: { o: 0 }, at: 8300, dur: 300 }
          ]) },
          { caption: "در رختخواب، بزرگ‌تر برایمان قصه می‌خواند. چراغ کم‌نور است و همه جا آرام است.", key: 4200, hold: 8000, do: [
            { cam: { x: 560 }, dur: 1800 }, { id: "dark", to: { o: 0.5 }, at: 1800, dur: 1200 },
            { id: "mom2.book", to: { o: 1 }, at: 1900, dur: 300 },
            { id: "mom2.mouth", to: { o: 0 }, at: 2400, dur: 100 }, { id: "mom2.open", to: { o: 1 }, at: 2400, dur: 100 },
            { id: "mom2.open", to: { sy: 0.4 }, at: 2500, dur: 4800, yoyo: true, times: 14 },
            { id: "blanket", to: { sy: 1.04 }, at: 2500, dur: 4800, yoyo: true, times: 4, ease: "soft" }
          ].concat(B.hpose("mom2", "h-mom-home", "book", 1900, 500)) },
          { caption: "چراغ را خاموش می‌کنیم و می‌خوابیم. در خواب، بدن استراحت می‌کند و بزرگ می‌شود.", key: 5400, hold: 8400, do: [
            { id: "mom2.open", to: { o: 0 }, dur: 100 }, { id: "mom2.mouth", to: { o: 1 }, dur: 100 },
            { id: "mom2", to: { o: 0 }, at: 300, dur: 900 }, { id: "dark", to: { o: 1 }, at: 900, dur: 1200 },
            { id: "sleeper.eye", to: { o: 0 }, at: 1400, dur: 300 }, { id: "sleeper.shut", to: { o: 1 }, at: 1400, dur: 300 },
            { id: "blanket", to: { sy: 1.06 }, at: 1800, dur: 6000, yoyo: true, times: 6, ease: "soft" },
            { id: "chart.mark", to: { y: -2.4 }, at: 3400, dur: 2000 },
            { emit: "spark", where: [630, 38], spread: [10, 4], n: 4, at: 5200, dur: 400, life: 1200 }
          ] },
          { caption: "صبح، سرحال بیدار می‌شویم!", key: 3800, hold: 5600, do: [
            { id: "dark", to: { o: 0 }, dur: 1200 },
            { id: "win2.night", to: { o: 0 }, dur: 1200 }, { id: "win2.moon", to: { o: 0 }, dur: 800 }, { id: "win2.stars", to: { o: 0 }, dur: 800 },
            { id: "win2.sun", to: { o: 1, y: 6 }, dur: 1 }, { id: "win2.sun", to: { y: 0 }, at: 200, dur: 1200 },
            { id: "sleeper.eye", to: { o: 1 }, at: 1500, dur: 200 }, { id: "sleeper.shut", to: { o: 0 }, at: 1500, dur: 200 },
            { id: "sleeper.upper", to: { r: 88 }, at: 1900, dur: 800 },
            { id: "sleeper.armF", to: { r: 175 }, at: 2800, dur: 600 }, { id: "sleeper.armB", to: { r: 165 }, at: 2800, dur: 600 },
            { id: "sleeper.mouth", to: { o: 0 }, at: 2800, dur: 200 }, { id: "sleeper.open", to: { o: 1 }, at: 2800, dur: 200 },
            { emit: "spark", where: [560, 34], spread: [26, 14], n: 8, at: 3200, dur: 800, life: 1300 }
          ] }
        ] },
      { type: "order", prompt: "کارهای شب را به ترتیب بچین", numbered: true,
        items: [{ pic: "🍲", label: "شام" }, { pic: "🪥", label: "مسواک" }, { pic: "🧻", label: "دستشویی" }, { pic: "📖", label: "قصه" }, { pic: "😴", label: "خواب" }] },
      { type: "choose", prompt: "پیش از خواب کدام بهتر است؟", say: "پیش از خواب کدام بهتر است؟", stack: true,
        options: ["📖 قصه با نور کم", "📱 بازی با گوشی"], answer: "📖 قصه با نور کم" },
      { type: "choose", prompt: "وقتی خوب می‌خوابیم، بدنمان چه می‌شود؟", say: "وقتی خوب می‌خوابیم، بدنمان چه می‌شود؟", stack: true,
        options: ["💪 استراحت می‌کند و بزرگ می‌شود", "😩 خسته‌تر می‌شود"], answer: "💪 استراحت می‌کند و بزرگ می‌شود" },
      { type: "forparents",
        tips: [
          "کودکان سه تا پنج ساله شبانه‌روز ۱۰ تا ۱۳ ساعت خواب لازم دارند (با خواب نیم‌روز). هر شب سر یک ساعت بخوابانید و صبح سر یک ساعت بیدار کنید، حتی روزهای تعطیل.",
          "کارهای پیش از خواب را هر شب به یک ترتیب انجام دهید: شام، مسواک، دستشویی، قصه، خواب. ترتیب ثابت به کودک آرامش می‌دهد.",
          "یک ساعت پیش از خواب صفحه‌ها (تلویزیون، گوشی، تبلت) را خاموش کنید و نور خانه را کم کنید. اتاق خواب تاریک، آرام و خنک باشد.",
          "اگر کودک از تاریکی می‌ترسد، یک چراغ خواب کم‌نور بگذارید و درباره ترسش آرام حرف بزنید. درس «احساس‌های من» درباره آرام شدن پیش از خواب هم کمک می‌کند."
        ] }
    ]
  },
  {
    id: "health-seed-13", subject: "health", level: "seed", emoji: "🤒", title: "حالم خوب نیست",
    steps: [
      /* Calm, nobody hurt: the boy holds his tummy and tells his mother; she kneels and feels his forehead; he rests on
         the sofa and drinks the water she pours; the doctor listens to his chest; at home his mother takes the
         medicine down from the high shelf and gives him one spoonful; then he is well and plays again.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین وقتی حالمان خوب نیست چه کار می‌کنیم", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [46, 88], s: 1.3 }, table: { art: "h-table", at: [80, 88], s: 1.1 },
          shelf: { art: "h-shelf", at: [94, 26] }, bottle: { art: "h-bottle", at: [94, 26] },
          glass: { art: "h-glass", at: [78, 67.1], s: 1.1 }, jug: { art: "h-jug", at: [86, 67.1], s: 0.9 },
          clinic: { art: "h-bedroom", at: [160, 0] }, doctor: { art: "h-doctor", at: [214, 88], s: 1.2 },
          boy2: { art: "h-boy", at: [235, 88], s: 1.4, flip: true }, mom2: { art: "h-mom-home", at: [268, 88], s: 1.15, flip: true },
          mom: { art: "h-mom-home", at: [130, 88], s: 1.15, flip: true },
          boy: { art: "h-boy", at: [100, 88], s: 1.4 },
          talk: { art: "h-talk", at: [108, 52], o: 0 }
        },
        scenes: [
          { caption: "وقتی حالمان خوب نیست یا جایی‌مان درد می‌کند، به بزرگ‌ترمان می‌گوییم.", key: 4400, hold: 7000, do:
            B.hpose("boy", "h-boy", { armF: [3, -15.6], head: 12 }, 300, 700).concat([
            { id: "talk", to: { o: 1 }, at: 1300, dur: 200 }, { id: "boy.mouth", to: { o: 0 }, at: 1300, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1300, dur: 100 },
            { id: "boy.open", to: { sy: 0.4 }, at: 1400, dur: 1800, yoyo: true, times: 6 }, { id: "talk", to: { s: 1.3 }, at: 1400, dur: 1800, yoyo: true, times: 4 },
            { id: "talk", to: { o: 0 }, at: 3300, dur: 300 }, { id: "boy.open", to: { o: 0 }, at: 3300, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 3300, dur: 100 }
          ], B.hpose("mom", "h-mom-home", { upper: 30, armF: [19, -34.6] }, 3400, 900)) },
          { caption: "روی مبل استراحت می‌کنیم و آب می‌نوشیم.", key: 7900, hold: 9600, do: B.hpose("mom", "h-mom-home", { upper: 0, armF: [0.2, -21] }, 0, 600).concat(
            B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 0, 600), [
            { id: "boy", to: { flip: -1 }, at: 600, dur: 1 }, { id: "boy", to: { x: 46 }, at: 700, dur: 2000, ease: "linear" }
          ], B.hwalk("boy", 700, 2000, 4), [
            { id: "boy", to: { flip: 1 }, at: 2800, dur: 1 }, { id: "boy", to: { y: 91.2 }, at: 2900, dur: 600 }
          ], B.hpose("boy", "h-boy", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 2900, 600), [
            { id: "mom", to: { x: 104 }, at: 700, dur: 1800, ease: "linear" }
          ], B.hwalk("mom", 700, 1800, 3), B.hpose("mom", "h-mom-home", { armF: [16, -26] }, 3600, 600), [
            { id: "jug", to: { r: -50 }, at: 4200, dur: 600 }, { id: "glass.water", to: { sy: 0 }, dur: 1 }, { id: "glass.water", to: { sy: 1 }, at: 4600, dur: 900 },
            { id: "jug", to: { r: 0 }, at: 5600, dur: 500 }
          ], B.hpose("mom", "h-mom-home", { armF: [0.2, -21] }, 5600, 500), B.hpose("boy", "h-boy", { upper: 15, armF: [12.6, -17] }, 6000, 600), [
            { id: "glass", to: { o: 0 }, at: 6600, dur: 100 }, { id: "boy.glass", to: { o: 1 }, at: 6600, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.8, -26.6], head: -14 }, 6600, 700), [
            { id: "boy.eye", to: { o: 0 }, at: 7300, dur: 200 }, { id: "boy.shut", to: { o: 1 }, at: 7300, dur: 200 }
          ]) },
          { caption: "اگر لازم باشد، به دکتر می‌رویم. دکتر کمکمان می‌کند خوب شویم.", key: 4200, hold: 6600, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "boy.eye", to: { o: 1 }, dur: 100 }, { id: "boy.shut", to: { o: 0 }, dur: 100 }, { id: "boy.glass", to: { o: 0 }, dur: 100 }, { id: "glass", to: { o: 1 }, dur: 100 },
            { id: "doctor", to: { y: 100.6 }, at: 1800, dur: 700 }
          ].concat(B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 0, 300), B.hpose("doctor", "h-doctor", "listen", 1800, 700), [
            { id: "doctor.steth", to: { o: 1 }, at: 2500, dur: 200 },
            { id: "boy2.head", to: { r: -8 }, at: 2800, dur: 2400, yoyo: true, times: 2 },
            { id: "doctor.head", to: { r: 8 }, at: 2800, dur: 2400, yoyo: true, times: 2 },
            { id: "mom2.head", to: { r: 6 }, at: 3600, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "دارو را فقط بزرگ‌تر به ما می‌دهد، همان اندازه‌ای که دکتر گفته.", key: 7000, hold: 9000, do: [
            { cam: { x: 80 }, dur: 1800 }
          ].concat(B.hpose("mom", "h-mom-home", "high", 1800, 700), [
            { id: "bottle", path: "M94 26Q106 40 90 67.1", at: 2600, dur: 1200 }
          ], B.hpose("mom", "h-mom-home", { armF: [14, -26] }, 2600, 1200), [
            { id: "mom.spoon", to: { o: 1 }, at: 4000, dur: 200 }
          ], B.hpose("mom", "h-mom-home", "spoon", 3800, 600), [
            { id: "mom", to: { x: 76 }, at: 4500, dur: 1800, ease: "linear" },
            { id: "mom.legF", to: { r: -18 }, at: 4500, dur: 1800, yoyo: true, times: 6 }, { id: "mom.legB", to: { r: 18 }, at: 4500, dur: 1800, yoyo: true, times: 6 },
            { id: "boy.mouth", to: { o: 0 }, at: 6300, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 6300, dur: 100 },
            { id: "boy.open", to: { o: 0 }, at: 7600, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 7600, dur: 100 },
            { id: "mom.spoon", to: { o: 0 }, at: 7900, dur: 200 }
          ], B.hpose("mom", "h-mom-home", { upper: 0, armF: [0.2, -21] }, 7900, 600)) },
          { caption: "کم‌کم حالمان بهتر می‌شود و دوباره بازی می‌کنیم!", key: 2600, do: [
            { id: "boy", to: { y: 88 }, dur: 600 }
          ].concat(B.hunpose("boy", "h-boy", 0, 600), [
            { id: "boy", walk: [100, 88], at: 700, dur: 1600, steps: 3 }
          ], B.hpose("boy", "h-boy", { armF: [3, -33.5], armB: [1, -33.5] }, 2400, 300), [
            { id: "boy", path: "M100 88Q100 72 100 88", at: 2500, dur: 700 },
            { emit: "spark", from: "boy", where: [0, -30], spread: [26, 22], n: 10, at: 2500, dur: 1000, life: 1400 },
            { id: "mom.head", to: { r: 8 }, at: 2600, dur: 1600, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "choose", prompt: "دلت درد می‌کند. چه کار می‌کنی؟", say: "دلت درد می‌کند. چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به بزرگ‌ترم می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "💊 خودم دارو برمی‌دارم"], answer: "🗣️ به بزرگ‌ترم می‌گویم" },
      { type: "choose", prompt: "وقتی مریضیم، چه کمکمان می‌کند؟", say: "وقتی مریضیم، چه کمکمان می‌کند؟", stack: true,
        options: ["🛋️ استراحت و آب", "🏃 خیلی دویدن"], answer: "🛋️ استراحت و آب" },
      { type: "choose", prompt: "چه کسی به ما دارو می‌دهد؟", say: "چه کسی به ما دارو می‌دهد؟", stack: true,
        options: ["👩 بزرگ‌تری که از ما مراقبت می‌کند", "🧒 خودم", "👦 دوستم"], answer: "👩 بزرگ‌تری که از ما مراقبت می‌کند" },
      { type: "forparents",
        tips: [
          "به کودک بگویید هر وقت حالش خوب نیست یا جایی‌اش درد می‌کند، به شما بگوید، و وقتی گفت، آرام و با حوصله گوش کنید. کودکی که حرفش شنیده می‌شود، زودتر می‌گوید.",
          "دارو، ویتامین و قرص را هیچ‌وقت «آب‌نبات» نخوانید. همه داروها را بالا، در قفسه دربسته و دور از دسترس کودک نگه دارید.",
          "دارو را فقط به اندازه‌ای که پزشک یا داروساز گفته و با پیمانه خودش بدهید، نه با قاشق آشپزخانه. اگر کودک اشتباهی دارو خورد، فوراً با اورژانس ۱۱۵ تماس بگیرید.",
          "این علامت‌ها را جدی بگیرید و زود به پزشک یا اورژانس مراجعه کنید: تب بالا در نوزاد، سختی نفس کشیدن، بی‌حالی شدید، کم ادرار کردن یا خشکی دهان، یا هر چیزی که نگرانتان می‌کند."
        ] }
    ]
  },
  {
    id: "health-seed-14", subject: "health", level: "seed", emoji: "🔥", title: "داغ است! تیز است!",
    steps: [
      /* Shown as the safe action, never the accident: the girl reaches towards the hot tea, then takes her hand back;
         the hot things are pointed out one by one (the samovar and the tea, the stove, the heater, the iron), then the
         sharp ones (a knife, scissors, a broken glass on the floor); she stops, calls her mother, and stays back while
         her mother sweeps up the glass. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چه چیزهایی داغ یا تیز است", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, table: { art: "h-dtable", at: [52, 88], s: 1.2 },
          samovar: { art: "h-samovar", at: [38, 60.4], s: 0.95 }, tea: { art: "h-estekan", at: [56, 60.4], s: 1.1 }, steam: { art: "h-steam", at: [56, 52] },
          iron: { art: "h-iron", at: [70, 60.4], s: 0.9 }, steam2: { art: "h-steam", at: [72, 54], o: 0 },
          stove: { art: "h-stove", at: [106, 88] }, heater: { art: "h-heater", at: [142, 88] },
          ring: { art: "h-oval", at: [46, 50], s: 1.4, o: 0 },
          kitchen2: { art: "h-kitchen", at: [160, 0] }, table2: { art: "h-dtable", at: [212, 88], s: 1.2 },
          knife: { art: "h-knife", at: [202, 59.6], s: 1.1 }, scissors: { art: "h-scissors", at: [220, 59.6], s: 1.1 },
          shards: { art: "h-shards", at: [262, 86], s: 1.3 }, broom: { art: "🧹", at: [252, 88], s: 0.6, r: -30, o: 0 },
          ring2: { art: "h-oval", at: [211, 58], s: 1.6, o: 0 },
          mom: { art: "h-mom-home", at: [176, 88], s: 1.15 },
          girl: { art: "h-girl", at: [-10, 88], s: 1.4 }, girl2: { art: "h-girl", at: [312, 88], s: 1.4, flip: true },
          talk: { art: "h-talk", at: [279, 52], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "چای و سماور داغ‌اند. به آن‌ها دست نمی‌زنیم.", key: 4800, hold: 7400, do: [
            { id: "girl", walk: [22, 88], dur: 2000 },
            { id: "steam", to: { y: "-2", o: 0.5 }, dur: 6800, yoyo: true, times: 6 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9, -22] }, 2200, 800), B.hpose("girl", "h-girl", { armF: [3, -16], head: -8 }, 3400, 500), [
            { id: "ring", to: { o: 1 }, at: 3600, dur: 400 }, { id: "ring", to: { s: 1.6 }, at: 4000, dur: 1600, yoyo: true, times: 2 },
            { id: "girl.head", to: { r: 8 }, at: 4200, dur: 1800, yoyo: true, times: 4 }
          ]) },
          { caption: "اجاق، بخاری و اتو هم داغ‌اند.", key: 6400, hold: 8000, do: [
            { id: "ring", path: "M46 50L106 56", dur: 900 }, { id: "ring", to: { s: 2 }, dur: 900 },
            { id: "stove.flame", to: { sy: 1.3 }, at: 600, dur: 7000, yoyo: true, times: 14 },
            { id: "ring", path: "M106 56L142 72", at: 2400, dur: 900 },
            { id: "heater.glow", to: { sy: 1.25 }, at: 2400, dur: 5000, yoyo: true, times: 10 },
            { id: "ring", path: "M142 72L70 56", at: 4600, dur: 1000 }, { id: "ring", to: { s: 1.2 }, at: 4600, dur: 1000 },
            { id: "steam2", to: { o: 1 }, at: 5400, dur: 400 }, { id: "steam2", to: { y: "-2" }, at: 5600, dur: 2000, yoyo: true, times: 2 }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], head: 0 }, 0, 600)) },
          { caption: "چاقو، قیچی و شیشه شکسته تیزند.", key: 4600, hold: 6800, do: [
            { id: "ring", to: { o: 0 }, dur: 300 }, { cam: { x: 240 }, dur: 1800 },
            { id: "ring2", to: { o: 1 }, at: 1800, dur: 400 }, { id: "ring2", to: { s: 1.8 }, at: 2200, dur: 1400, yoyo: true, times: 2 },
            { id: "ring2", path: "M211 58L262 84", at: 3800, dur: 900 }, { id: "ring2", to: { s: 1.3 }, at: 3800, dur: 900 }
          ] },
          { caption: "اگر چیز داغ یا تیزی دیدیم، می‌ایستیم و به بزرگ‌تر می‌گوییم.", key: 4600, hold: 7400, do: [
            { id: "ring2", to: { o: 0 }, dur: 300 },
            { id: "girl2", walk: [288, 88], at: 300, dur: 2000 }
          ].concat(B.hpose("girl2", "h-girl", { armF: [3, -16], head: 10 }, 2400, 500), [
            { id: "girl2.head", to: { r: -14 }, at: 3300, dur: 500 },
            { id: "talk", to: { o: 1 }, at: 3800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 3800, dur: 1600, yoyo: true, times: 4 },
            { id: "girl2.mouth", to: { o: 0 }, at: 3800, dur: 100 }, { id: "girl2.open", to: { o: 1 }, at: 3800, dur: 100 },
            { id: "girl2.open", to: { sy: 0.4 }, at: 3900, dur: 1600, yoyo: true, times: 6 },
            { id: "talk", to: { o: 0 }, at: 5600, dur: 300 }, { id: "girl2.open", to: { o: 0 }, at: 5600, dur: 100 }, { id: "girl2.mouth", to: { o: 1 }, at: 5600, dur: 100 },
            { id: "mom.head", to: { r: 10 }, at: 4400, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "بزرگ‌تر شیشه‌ها را جمع می‌کند و ما دور می‌ایستیم.", key: 5600, hold: 8000, do: [
            { id: "mom", walk: [240, 88], dur: 2400 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 40, armF: [16, -10] }, 2500, 700), [
            { id: "broom", to: { o: 1 }, at: 3000, dur: 300 },
            { id: "broom", to: { x: "+6" }, at: 3300, dur: 3000, yoyo: true, times: 8 },
            { id: "shards", to: { o: 0, x: 254 }, at: 3300, dur: 3000 },
            { id: "girl2.head", to: { r: 0 }, at: 300, dur: 500 }
          ], B.hpose("girl2", "h-girl", { armF: [0.2, -12] }, 300, 500)) }
        ] },
      { type: "choose", prompt: "روی میز یک استکان چای داغ است. چه کار می‌کنی؟", say: "روی میز یک استکان چای داغ است. چه کار می‌کنی؟", stack: true,
        options: ["✋ دست نمی‌زنم و به بزرگ‌تر می‌گویم", "🤲 برش می‌دارم"], answer: "✋ دست نمی‌زنم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "یک لیوان افتاده و شکسته است. چه کار می‌کنی؟", say: "یک لیوان افتاده و شکسته است. چه کار می‌کنی؟", stack: true,
        options: ["🧍 همان‌جا می‌ایستم و بزرگ‌تر را صدا می‌زنم", "🖐️ تکه‌ها را جمع می‌کنم"], answer: "🧍 همان‌جا می‌ایستم و بزرگ‌تر را صدا می‌زنم" },
      { type: "sort", prompt: "کدام داغ است و کدام تیز؟",
        baskets: [{ label: "داغ", pic: "🔥", value: "hot" }, { label: "تیز", pic: "✂️", value: "sharp" }],
        items: [
          { pic: "🫖", say: "قوری چای", basket: "hot" }, { pic: "🍲", say: "غذای روی اجاق", basket: "hot" }, { pic: "☕", say: "چای داغ", basket: "hot" },
          { pic: "🔪", say: "چاقو", basket: "sharp" }, { pic: "✂️", say: "قیچی", basket: "sharp" }, { pic: "🪚", say: "اره", basket: "sharp" }
        ] },
      { type: "forparents",
        tips: [
          "سوختگی با مایع داغ (چای، آب جوش، غذا) از شایع‌ترین آسیب‌های کودکان خردسال است. استکان و قوری را لبه میز نگذارید، رومیزی آویزان نداشته باشید و دسته قابلمه را رو به داخل اجاق بچرخانید.",
          "سماور، بخاری و اتو را دور از جای بازی کودک بگذارید و جلوی بخاری حفاظ بگذارید. اتو را بعد از کار، دور از دسترس سرد کنید و سیمش را آویزان نگذارید.",
          "چاقو، قیچی تیز، تیغ و شیشه را در کشو یا جای بلند نگه دارید. اگر چیزی شکست، کودک را از آن‌جا دور کنید و خودتان جمع کنید.",
          "به کودک یاد بدهید: «داغ یا تیز دیدی، بایست و به بزرگ‌تر بگو.» و هر بار که این کار را کرد، از او تشکر کنید."
        ] }
    ]
  },
  {
    id: "health-seed-15", subject: "health", level: "seed", emoji: "💊", title: "شبیه خوراکی، ولی نه!",
    steps: [
      /* Look-alikes side by side on a card: sweets and pills, juice and a bottle of cleaning liquid, sweets and button
         batteries and magnets. Then the boy finds pills on the floor, does not touch or taste them and calls his
         mother, who puts them away in a high, locked cupboard. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "خوب نگاه کن: کدام خوراکی است؟", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, cupboard: { art: "h-cupboard", at: [70, 30], s: 1.3 },
          pills: { art: "h-pillset", at: [76, 86], s: 1.6 },
          mom: { art: "h-mom-home", at: [-20, 88], s: 1.15 }, boy: { art: "h-boy", at: [176, 88], s: 1.4, flip: true },
          talk: { art: "h-talk", at: [87, 52], s: 1.2, flip: true, o: 0 },
          panel: { art: "h-panel" },
          candy: { art: "h-candy", at: [112, 62], s: 2.6, o: 0 }, pills2: { art: "h-pillset", at: [44, 58], s: 3.4, o: 0 }, bottle: { art: "h-bottle", at: [62, 62], s: 2, o: 0 },
          juice: { art: "🧃", at: [112, 66], s: 1.5, o: 0 }, cleaner: { art: "h-cleaner", at: [48, 66], s: 2.4, o: 0 },
          cells: { art: "h-cells", at: [38, 56], s: 3.4, o: 0 }, magnets: { art: "h-magnets", at: [62, 56], s: 3, o: 0 },
          ringL: { art: "h-oval", at: [112, 52], s: 2.4, o: 0 }, ringR: { art: "h-oval", at: [50, 52], s: 2.6, o: 0 }
        },
        scenes: [
          { caption: "این‌ها آب‌نبات‌اند و این‌ها قرص. خیلی شبیه هم‌اند!", key: 3600, hold: 5600, do: [
            { id: "candy", to: { o: 1 }, at: 300, dur: 500 }, { id: "ringL", to: { o: 1 }, at: 800, dur: 400 }, { id: "ringL", to: { s: 2.7 }, at: 1200, dur: 1000, yoyo: true, times: 2 },
            { id: "pills2", to: { o: 1 }, at: 2200, dur: 500 }, { id: "bottle", to: { o: 1 }, at: 2200, dur: 500 },
            { id: "ringR", to: { o: 1 }, at: 2700, dur: 400 }, { id: "ringR", to: { s: 2.9 }, at: 3100, dur: 1000, yoyo: true, times: 2 }
          ] },
          { caption: "این آب‌میوه است و این مایع شوینده. آن هم شبیه نوشیدنی است!", key: 3600, hold: 5600, do: [
            { id: "candy", to: { o: 0 }, dur: 400 }, { id: "pills2", to: { o: 0 }, dur: 400 }, { id: "bottle", to: { o: 0 }, dur: 400 },
            { id: "ringL", to: { o: 0 }, dur: 300 }, { id: "ringR", to: { o: 0 }, dur: 300 },
            { id: "juice", to: { o: 1 }, at: 500, dur: 500 }, { id: "ringL", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "cleaner", to: { o: 1 }, at: 2200, dur: 500 }, { id: "ringR", to: { o: 1 }, at: 2700, dur: 400 }, { id: "ringR", to: { s: 2.9 }, at: 3100, dur: 1000, yoyo: true, times: 2 }
          ] },
          { caption: "باتری‌های گرد کوچک و آهن‌رباها هم شبیه آب‌نبات‌اند.", key: 3600, hold: 5600, do: [
            { id: "juice", to: { o: 0 }, dur: 400 }, { id: "cleaner", to: { o: 0 }, dur: 400 }, { id: "ringR", to: { o: 0 }, dur: 300 },
            { id: "candy", to: { o: 1 }, at: 500, dur: 500 },
            { id: "cells", to: { o: 1 }, at: 2000, dur: 500 }, { id: "magnets", to: { o: 1 }, at: 2400, dur: 500 },
            { id: "ringR", to: { o: 1 }, at: 2800, dur: 400 }, { id: "ringR", to: { s: 2.9 }, at: 3200, dur: 1000, yoyo: true, times: 2 }
          ] },
          { caption: "چیزی را که نمی‌دانیم چیست، هیچ‌وقت نمی‌چشیم. دست نمی‌زنیم و به بزرگ‌تر می‌گوییم.", key: 4600, hold: 7400, do: [
            { id: "panel", to: { o: 0 }, dur: 600 }, { id: "candy", to: { o: 0 }, dur: 500 }, { id: "cells", to: { o: 0 }, dur: 500 }, { id: "magnets", to: { o: 0 }, dur: 500 },
            { id: "ringL", to: { o: 0 }, dur: 300 }, { id: "ringR", to: { o: 0 }, dur: 300 },
            { id: "boy", walk: [96, 88], at: 600, dur: 2400 }
          ].concat(B.hpose("boy", "h-boy", { head: 18, armF: [3, -16] }, 3100, 500), [
            { id: "talk", to: { o: 1 }, at: 4000, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 4000, dur: 1600, yoyo: true, times: 4 },
            { id: "boy.head", to: { r: -6 }, at: 3800, dur: 400 },
            { id: "boy.mouth", to: { o: 0 }, at: 4000, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 4000, dur: 100 },
            { id: "boy.open", to: { sy: 0.4 }, at: 4100, dur: 1600, yoyo: true, times: 6 },
            { id: "talk", to: { o: 0 }, at: 5800, dur: 300 }, { id: "boy.open", to: { o: 0 }, at: 5800, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 5800, dur: 100 }
          ]) },
          { caption: "بزرگ‌تر آن‌ها را برمی‌دارد و در یک کمد بلند و قفل‌دار می‌گذارد.", key: 4500, hold: 9000, do: [
            { id: "mom", walk: [60, 88], dur: 2600 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 50, armF: [12.4, -4] }, 2700, 700), [
            { id: "pills", path: "M76 86L74 72", at: 3500, dur: 600 }
          ], B.hpose("mom", "h-mom-home", { upper: 0, armF: [9, -58] }, 3500, 1200), [
            { id: "pills", path: "M74 72L70.4 21", at: 4100, dur: 600 },
            { id: "cupboard.door", to: { sx: 0.12 }, at: 3800, dur: 600 },
            { id: "pills", to: { o: 0 }, at: 5000, dur: 300 },
            { id: "cupboard.door", to: { sx: 1 }, at: 5400, dur: 600 },
            { emit: "spark", where: [70, 18], spread: [16, 6], n: 5, at: 6100, dur: 500, life: 1200 }
          ], B.hpose("mom", "h-mom-home", { armF: [0.2, -21] }, 6200, 600), B.hpose("boy", "h-boy", { head: 0, armF: [0.2, -12] }, 6200, 600)) }
        ] },
      { type: "choose", prompt: "روی زمین چند قرص رنگی پیدا کرده‌ای. چه کار می‌کنی؟", say: "روی زمین چند قرص رنگی پیدا کرده‌ای. چه کار می‌کنی؟", stack: true,
        options: ["🗣️ دست نمی‌زنم و به بزرگ‌تر می‌گویم", "😋 یکی را می‌چشم", "🎒 در جیبم می‌گذارم"], answer: "🗣️ دست نمی‌زنم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "یک بطری رنگی روی زمین است. شبیه آب‌میوه است. چه کار می‌کنی؟", say: "یک بطری رنگی روی زمین است. شبیه آب‌میوه است. چه کار می‌کنی؟", stack: true,
        options: ["🙅 نمی‌نوشم و به بزرگ‌تر نشانش می‌دهم", "🥤 کمی می‌نوشم"], answer: "🙅 نمی‌نوشم و به بزرگ‌تر نشانش می‌دهم" },
      { type: "choose", prompt: "کدام را می‌شود خورد؟", say: "کدام را می‌شود خورد؟", pic: true,
        options: [{ label: "🍎", value: "apple" }, { label: "💊", value: "pill" }, { label: "🔋", value: "battery" }], answer: "apple" },
      { type: "forparents",
        tips: [
          "همه داروها، ویتامین‌ها، مواد شوینده، سفیدکننده، سم و نفت را بالا و در کمد قفل‌دار نگه دارید، نه زیر سینک. هیچ‌وقت آن‌ها را در بطری آب یا نوشابه نریزید.",
          "باتری‌های سکه‌ای (در کنترل، ساعت و اسباب‌بازی) و آهن‌رباهای کوچک اگر بلعیده شوند خیلی خطرناک‌اند. در محفظه باتری‌ها را با پیچ یا چسب ببندید و باتری‌های کهنه را دور از دسترس دور بریزید.",
          "اگر کودک چیزی خورد یا نوشید که نباید: آرام بمانید، او را وادار به استفراغ نکنید، و فوراً با اورژانس ۱۱۵ تماس بگیرید. ظرف یا بسته‌اش را نگه دارید و همراه ببرید.",
          "دارو را جلوی کودک «آب‌نبات» نخوانید و جلوی او قرص نخورید؛ کودکان از بزرگ‌ترها تقلید می‌کنند."
        ] }
    ]
  },
  {
    id: "health-seed-16", subject: "health", level: "seed", emoji: "🤔", title: "بازی امن یا بپرس",
    steps: [
      // The game lesson of the safety unit: sort pictures from home, near water and near the road into «امن است» and
      // «از بزرگ‌تر می‌پرسم». Every picture is said aloud when tapped.
      { type: "sort", prompt: "در خانه: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🧸", say: "خرس عروسکی", basket: "ok" }, { pic: "📖", say: "کتاب قصه", basket: "ok" }, { pic: "🧩", say: "پازل", basket: "ok" },
          { pic: "💊", say: "قرص", basket: "ask" }, { pic: "🔪", say: "چاقو", basket: "ask" }, { pic: "🔌", say: "پریز برق", basket: "ask" }, { pic: "☕", say: "چای داغ", basket: "ask" }
        ] },
      { type: "sort", prompt: "کنار آب: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🚰", say: "شستن دست در روشویی", basket: "ok" }, { pic: "🥛", say: "نوشیدن یک لیوان آب", basket: "ok" },
          { pic: "🌊", say: "رفتن به دریا", basket: "ask" }, { pic: "🏊", say: "رفتن به استخر", basket: "ask" }, { pic: "🪣", say: "بازی با سطل پر از آب", basket: "ask" }, { pic: "🛁", say: "رفتن به وان حمام", basket: "ask" }
        ] },
      { type: "sort", prompt: "نزدیک خیابان: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🛝", say: "سرسره در پارک", basket: "ok" }, { pic: "🤝", say: "دست بزرگ‌تر را گرفتن", basket: "ok" },
          { pic: "🚗", say: "رد شدن از خیابان", basket: "ask" }, { pic: "⚽", say: "دویدن دنبال توپ به خیابان", basket: "ask" }, { pic: "🚲", say: "دوچرخه‌سواری کنار ماشین‌ها", basket: "ask" }
        ] },
      { type: "doit", pic: "🔎", text: "با بزرگ‌ترت در خانه بگرد: سه چیز امن برای بازی پیدا کن، و سه چیز که باید درباره‌شان از بزرگ‌تر بپرسی." },
      { type: "forparents",
        tips: [
          "قانون ساده این بخش: «اگر مطمئن نیستی، بایست و از بزرگ‌تر بپرس.» این جمله را در خانه، کنار آب و نزدیک خیابان تکرار کنید.",
          "بعد از بازی «خانه‌گردی»، خودتان هم خانه را از ارتفاع چشم کودک نگاه کنید: پریزها، دارو و شوینده‌ها، چاقو، سیم اتو، پنجره و بالکن.",
          "از کودک به‌خاطر پرسیدن تشکر کنید، حتی وقتی جواب «بله، امن است» است. کودکی که پرسیدن برایش خوشایند است، بیشتر می‌پرسد."
        ] }
    ]
  },
  {
    id: "health-seed-17", subject: "health", level: "seed", emoji: "🌊", title: "آب‌بازی با بزرگ‌تر",
    steps: [
      /* Water play only while a grown-up watches: the girl splashes at the حوض while Grandma sits close and watches
         her (a line of sight); when Grandma goes in, the girl steps back from the water and waits. At the sea, Dad
         holds the boy's hand at the edge. The bucket and the bath: a grown-up is always there. Nobody is shown in
         danger. Drawings: js/art/rig-health.js and the courtyard from js/art/rig-feel.js, the beach from js/art/rig-world.js. */
      { type: "scene", prompt: "ببین چطور آب‌بازی می‌کنیم", bg: "#cfe8f5",
        parts: {
          beach: { art: "w-beach", at: [160, 0] },
          yard: { art: "fl-yard" }, hoz: { art: "h-hoz", at: [106, 76], s: 1.6 }, bench: { art: "h-bench", at: [28, 88], s: 1.3 },
          gran: { art: "h-gran", at: [30, 101], s: 1.15 }, sight: { art: "h-sight", at: [35, 50], sx: 3.6, r: 31, o: 0 },
          girl: { art: "h-girl", at: [66, 99.8], s: 1.4 },
          dad: { art: "h-dad", at: [222, 74], s: 1.15 }, boy: { art: "h-boy", at: [240, 74], s: 1.4 },
          shallow: { art: "h-shallow", at: [160, 2] },
          bath: { art: "h-bathroom", at: [320, 0] }, bucket: { art: "🪣", at: [446, 86], s: 0.9 },
          kid: { art: "h-girl-front", at: [392, 92], s: 1.6 }, tub: { art: "h-tub", at: [396, 90], s: 1.2 },
          mom: { art: "h-mom-home", at: [452, 88], s: 1.15, flip: true }
        },
        scenes: [
          { caption: "آب‌بازی خیلی کیف دارد! فقط وقتی یک بزرگ‌تر کنارمان است و نگاهمان می‌کند.", key: 4200, hold: 7400, do: B.hpose("gran", "h-gran", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 0, 1).concat(
            B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1), [
            { id: "kid.legL", to: { o: 0 }, dur: 1 }, { id: "kid.legR", to: { o: 0 }, dur: 1 }
          ], B.hpose("girl", "h-girl", { upper: 30, armF: [10, -17] }, 300, 700), [
            { id: "girl.foreF", to: { r: "+16" }, at: 1100, dur: 5000, yoyo: true, times: 10 },
            { emit: "drop", where: [82, 74], spread: [10, 4], rise: -6, n: 14, at: 1100, dur: 5000, life: 900 },
            { id: "hoz.ripple", to: { s: 1.3 }, at: 1100, dur: 5000, yoyo: true, times: 6 },
            { id: "sight", to: { o: 1 }, at: 1800, dur: 600 },
            { id: "gran.head", to: { r: 6 }, at: 2400, dur: 3000, yoyo: true, times: 2 }
          ]) },
          { caption: "اگر بزرگ‌تر رفت، ما هم از آب دور می‌شویم و صبر می‌کنیم.", key: 6400, hold: 8400, do: [
            { id: "sight", to: { o: 0 }, dur: 400 }, { id: "gran", to: { y: 88 }, at: 400, dur: 600 }, { id: "gran", to: { flip: -1 }, at: 1100, dur: 1 },
            { id: "gran", walk: [-30, 88], at: 1200, dur: 3200 }
          ].concat(B.hunpose("gran", "h-gran", 400, 600), B.hpose("girl", "h-girl", { upper: 0, armF: [0.2, -12] }, 1400, 600), [
            { id: "girl.head", to: { r: -14 }, at: 2000, dur: 600 },
            { id: "girl", to: { y: 86 }, at: 3000, dur: 700 }
          ], B.hunpose("girl", "h-girl", 3000, 700), [
            { id: "girl", to: { flip: -1 }, at: 3800, dur: 1 }, { id: "girl", walk: [44, 86], at: 3900, dur: 1800 },
            { id: "girl", to: { flip: 1 }, at: 5800, dur: 1 }
          ]) },
          { caption: "در دریا و رودخانه هم فقط با بزرگ‌تر، دست در دست، کنار ساحل.", key: 4400, hold: 7000, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "beach.waves", to: { x: 10 }, dur: 6800, ease: "linear" }
          ].concat(B.hpose("dad", "h-dad", { armF: [12, -21] }, 0, 1), B.hpose("boy", "h-boy", { armB: [-5, -13] }, 0, 1), [
            { id: "dad", to: { x: 250 }, at: 1800, dur: 4200, ease: "linear" }, { id: "boy", to: { x: 268 }, at: 1800, dur: 4200, ease: "linear" },
            { id: "dad.legF", to: { r: -20 }, at: 1800, dur: 4200, yoyo: true, times: 10 }, { id: "dad.legB", to: { r: 20 }, at: 1800, dur: 4200, yoyo: true, times: 10 },
            { id: "boy.legF", to: { r: -24 }, at: 1800, dur: 4200, yoyo: true, times: 12 }, { id: "boy.legB", to: { r: 24 }, at: 1800, dur: 4200, yoyo: true, times: 12 },
            { emit: "drop", where: [262, 70], spread: [30, 2], rise: 4, n: 10, at: 2000, dur: 4000, life: 700 }
          ]) },
          { caption: "سطل پر از آب و وان حمام هم همین‌طور: فقط وقتی بزرگ‌تر کنارمان است.", key: 4000, hold: 6600, do: [
            { cam: { x: 400 }, dur: 1800 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-8, -24], armR: [8, -24] }, 1800, 600), [
            { id: "kid.foreL", to: { r: 20 }, at: 2400, dur: 3600, yoyo: true, times: 8 }, { id: "kid.foreR", to: { r: -20 }, at: 2400, dur: 3600, yoyo: true, times: 8 },
            { emit: "bubble", where: [396, 62], spread: [40, 6], n: 12, at: 2400, dur: 3600 },
            { id: "kid.mouth", to: { o: 0 }, at: 2400, dur: 100 }, { id: "kid.grin", to: { o: 1 }, at: 2400, dur: 100 },
            { id: "mom.head", to: { r: 8 }, at: 2800, dur: 2600, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "sort", prompt: "کدام را فقط با بزرگ‌تر انجام می‌دهیم؟",
        baskets: [{ label: "فقط با بزرگ‌تر", pic: "👩", value: "adult" }, { label: "خودم هم می‌توانم", pic: "🧒", value: "self" }],
        items: [
          { pic: "🌊", say: "رفتن به دریا", basket: "adult" }, { pic: "🏊", say: "رفتن به استخر", basket: "adult" }, { pic: "🛁", say: "حمام در وان", basket: "adult" },
          { pic: "🪣", say: "بازی با سطل آب", basket: "adult" }, { pic: "🚰", say: "شستن دست‌ها", basket: "self" }, { pic: "🥛", say: "نوشیدن آب", basket: "self" }
        ] },
      { type: "choose", prompt: "کنار حوض بازی می‌کنی و بزرگ‌ترت به خانه رفت. چه کار می‌کنی؟", say: "کنار حوض بازی می‌کنی و بزرگ‌ترت به خانه رفت. چه کار می‌کنی؟", stack: true,
        options: ["🚶 از آب دور می‌شوم و صبر می‌کنم یا با او می‌روم", "💦 تنهایی آب‌بازی می‌کنم"], answer: "🚶 از آب دور می‌شوم و صبر می‌کنم یا با او می‌روم" },
      { type: "choose", prompt: "توپت در آب افتاد. چه کار می‌کنی؟", say: "توپت در آب افتاد. چه کار می‌کنی؟", stack: true,
        options: ["🙋 به بزرگ‌تر می‌گویم تا برش دارد", "🤸 خودم خم می‌شوم و برش می‌دارم"], answer: "🙋 به بزرگ‌تر می‌گویم تا برش دارد" },
      { type: "forparents",
        tips: [
          "غرق شدن بی‌صدا و خیلی سریع اتفاق می‌افتد، حتی در چند سانتی‌متر آب: در وان، تشت، سطل، حوض یا استخر بادی. کودک خردسال را حتی یک لحظه کنار آب تنها نگذارید و چشم از او برندارید.",
          "کنار آب، یک بزرگ‌تر فقط مراقب کودکان باشد، بی‌گوشی و بی‌کار دیگر. اگر باید بروید، کودک را با خودتان ببرید.",
          "حوض، منبع آب، چاه و استخر را با در، توری یا حصار بپوشانید. تشت و سطل را بعد از استفاده خالی کنید و برگردانید.",
          "در دریا و رودخانه فقط جایی شنا کنید که نجات‌غریق دارد. رودخانه و سد حتی کنار ساحل جریان تند دارند. بهتر است کودک از پنج‌سالگی پیش مربی شنا یاد بگیرد."
        ] }
    ]
  },
  {
    id: "health-seed-18", subject: "health", level: "seed", emoji: "🐶", title: "دوست حیوان‌ها",
    steps: [
      /* Calm, nobody hurt: in the park the girl asks the owner before stroking her dog; a cat asleep and the dog
         eating are left alone; in an alley, a stray dog far off: the girl and her mother walk calmly the other way;
         she washes her hands after playing with the animal; and she shows her hand to her mother if an animal has
         scratched her. Drawings: js/art/rig-health.js, the alley from js/art/rig-world.js, the cat from js/art/rig.js. */
      { type: "scene", prompt: "ببین با حیوان‌ها چطور رفتار می‌کنیم", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, cat: { art: "cat-top", at: [26, 82], s: 1.6 }, zzz: { art: "w-zzz", at: [32, 74], s: 1.3, o: 0 },
          bowl: { art: "🥣", at: [126, 89], s: 0.45, o: 0 },
          owner: { art: "h-seller", at: [134, 88], s: 1.15, flip: true }, dog: { art: "🐕", at: [108, 88], s: 1.1 },
          girl: { art: "h-girl", at: [-10, 86], s: 1.4 },
          talk: { art: "h-talk", at: [84, 51], s: 1.2, o: 0 },
          alley: { art: "w-alley", at: [160, 0] }, stray: { art: "🐕", at: [300, 80], s: 0.8, flip: true },
          mom: { art: "h-mom", at: [236, 88], s: 1.15 }, girl2: { art: "h-girl", at: [256, 86], s: 1.4 },
          bath: { art: "h-bathroom", at: [320, 0] }, sink: { art: "h-sink-side", at: [436, 88], s: 1.3 },
          girl3: { art: "h-girl", at: [419, 86], s: 1.4 }, mom3: { art: "h-mom-home", at: [330, 88], s: 1.15 },
          talk3: { art: "h-talk", at: [404, 51], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "پیش از ناز کردن یک حیوان، از صاحبش می‌پرسیم: «می‌شود نازش کنم؟»", key: 5800, hold: 8400, do: [
            { id: "girl", walk: [76, 86], dur: 2600 },
            { id: "talk", to: { o: 1 }, at: 2800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 2800, dur: 1400, yoyo: true, times: 4 },
            { id: "girl.mouth", to: { o: 0 }, at: 2800, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 2800, dur: 100 },
            { id: "girl.open", to: { sy: 0.4 }, at: 2900, dur: 1300, yoyo: true, times: 4 },
            { id: "talk", to: { o: 0 }, at: 4300, dur: 300 }, { id: "girl.open", to: { o: 0 }, at: 4300, dur: 100 }, { id: "girl.mouth", to: { o: 1 }, at: 4300, dur: 100 },
            { id: "owner.head", to: { r: 12 }, at: 4400, dur: 1000, yoyo: true, times: 2 }
          ].concat(B.hpose("girl", "h-girl", { upper: 35, armF: [17, -8] }, 5200, 600), [
            { id: "girl.foreF", to: { r: "+14" }, at: 5800, dur: 2000, yoyo: true, times: 6 }
          ]) },
          { caption: "حیوانی که غذا می‌خورد یا خوابیده را ناز نمی‌کنیم. بگذاریم راحت باشد.", key: 5400, hold: 7400, do: B.hpose("girl", "h-girl", { upper: 0, armF: [0.2, -12] }, 0, 600).concat([
            { id: "bowl", to: { o: 1 }, at: 300, dur: 400 }, { id: "dog", to: { x: 120 }, at: 600, dur: 800 },
            { id: "dog", to: { r: 8 }, at: 1500, dur: 5000, yoyo: true, times: 10 },
            { id: "zzz", to: { o: 1 }, at: 800, dur: 400 }, { id: "zzz", to: { y: 70 }, at: 1200, dur: 5000, yoyo: true, times: 4 },
            { id: "girl", to: { flip: -1 }, at: 700, dur: 1 }, { id: "girl", walk: [50, 86], at: 800, dur: 2200 },
            { id: "girl.head", to: { r: 14 }, at: 3200, dur: 600 },
            { id: "girl", to: { flip: 1 }, at: 4800, dur: 1 }, { id: "girl.head", to: { r: 0 }, at: 4700, dur: 400 },
            { id: "girl", walk: [80, 86], at: 4900, dur: 2000 }
          ]) },
          { caption: "از سگ‌های ولگرد دور می‌مانیم: آرام برمی‌گردیم و نمی‌دویم.", key: 4400, hold: 7400, do: [
            { cam: { x: 240 }, dur: 1800 }
          ].concat(B.hpose("mom", "h-mom", { armF: [12, -21] }, 0, 1), B.hpose("girl2", "h-girl", { armB: [-5, -13] }, 0, 1), [
            { id: "girl2.head", to: { r: -6 }, at: 1800, dur: 500 }
          ], B.hpose("mom", "h-mom", { armF: [0.2, -21], armB: [-12, -21] }, 2600, 1), B.hpose("girl2", "h-girl", { armB: [0.2, -12], armF: [5, -13] }, 2600, 1), [
            { id: "mom", to: { flip: -1 }, at: 2600, dur: 1 }, { id: "girl2", to: { flip: -1 }, at: 2600, dur: 1 },
            { id: "mom", to: { x: 192 }, at: 2800, dur: 4000, ease: "linear" }, { id: "girl2", to: { x: 210 }, at: 2800, dur: 4000, ease: "linear" },
            { id: "mom.legF", to: { r: -18 }, at: 2800, dur: 4000, yoyo: true, times: 10 }, { id: "mom.legB", to: { r: 18 }, at: 2800, dur: 4000, yoyo: true, times: 10 },
            { id: "girl2.legF", to: { r: -20 }, at: 2800, dur: 4000, yoyo: true, times: 12 }, { id: "girl2.legB", to: { r: 20 }, at: 2800, dur: 4000, yoyo: true, times: 12 }
          ]) },
          { caption: "بعد از بازی با حیوان، دست‌هایمان را با آب و صابون می‌شوییم.", key: 3800, hold: 6000, do: [
            { cam: { x: 400 }, dur: 1800 }
          ].concat(B.hpose("girl3", "h-girl", { armF: [8.9, -22.3], armB: [8.6, -22.6] }, 1600, 600), [
            { id: "sink.water", to: { o: 1 }, at: 1800, dur: 300 },
            { id: "girl3.foreF", to: { r: "+12" }, at: 2300, dur: 3000, yoyo: true, times: 10 },
            { emit: "bubble", where: [428, 57], spread: [8, 4], n: 12, at: 2300, dur: 3000 },
            { id: "sink.water", to: { o: 0 }, at: 5500, dur: 300 }
          ]) },
          { caption: "اگر حیوانی ما را خراشید یا گاز گرفت، فوراً به بزرگ‌تر می‌گوییم.", key: 5200, hold: 7400, do: [
            { id: "mom3", walk: [384, 88], dur: 2400 }
          ].concat(B.hpose("girl3", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 500), [
            { id: "girl3", to: { flip: -1 }, at: 1200, dur: 1 }
          ], B.hpose("girl3", "h-girl", "show", 2600, 500), [
            { id: "talk3", to: { o: 1 }, at: 3000, dur: 200 }, { id: "talk3", to: { s: 1.5 }, at: 3000, dur: 1400, yoyo: true, times: 4 },
            { id: "girl3.mouth", to: { o: 0 }, at: 3000, dur: 100 }, { id: "girl3.open", to: { o: 1 }, at: 3000, dur: 100 },
            { id: "girl3.open", to: { sy: 0.4 }, at: 3100, dur: 1300, yoyo: true, times: 4 },
            { id: "talk3", to: { o: 0 }, at: 4500, dur: 300 }, { id: "girl3.open", to: { o: 0 }, at: 4500, dur: 100 }, { id: "girl3.mouth", to: { o: 1 }, at: 4500, dur: 100 }
          ], B.hpose("mom3", "h-mom-home", { upper: 30, armF: [18.4, -27] }, 4400, 700)) }
        ] },
      { type: "choose", prompt: "یک گربه زیر درخت خوابیده. چه کار می‌کنی؟", say: "یک گربه زیر درخت خوابیده. چه کار می‌کنی؟", stack: true,
        options: ["😴 می‌گذارم بخوابد", "✋ بیدارش می‌کنم و نازش می‌کنم"], answer: "😴 می‌گذارم بخوابد" },
      { type: "choose", prompt: "یک سگ را که نمی‌شناسی در کوچه می‌بینی. چه کار می‌کنی؟", say: "یک سگ را که نمی‌شناسی در کوچه می‌بینی. چه کار می‌کنی؟", stack: true,
        options: ["🚶 آرام از او دور می‌شوم و به بزرگ‌ترم می‌گویم", "🏃 جیغ می‌زنم و می‌دوم", "🖐️ جلو می‌روم و نازش می‌کنم"], answer: "🚶 آرام از او دور می‌شوم و به بزرگ‌ترم می‌گویم" },
      { type: "choose", prompt: "بعد از بازی با گربه چه کار می‌کنیم؟", say: "بعد از بازی با گربه چه کار می‌کنیم؟", pic: true,
        options: [{ label: "🧼", value: "wash" }, { label: "🍪", value: "eat" }], answer: "wash" },
      { type: "forparents",
        tips: [
          "به کودک یاد بدهید پیش از ناز کردن هر حیوانی از صاحبش بپرسد، آرام نزدیک شود و اول بگذارد حیوان دستش را بو کند. هیچ‌وقت سراغ حیوانی که غذا می‌خورد، خوابیده یا بچه دارد نرود.",
          "کنار سگ‌های ولگرد، کودک ندود و جیغ نزند؛ آرام بایستد یا آرام دور شود و به چشم سگ زل نزند. کودک خردسال را با هیچ سگی، حتی سگ آشنا، تنها نگذارید.",
          "اگر حیوانی کودک را گاز گرفت یا خراشید، حتی کم: زخم را ۱۵ دقیقه با آب و صابون فراوان بشویید و همان روز به مرکز بهداشت یا پزشک بروید. هاری خطرناک است و واکسن به‌موقع از آن پیشگیری می‌کند.",
          "بعد از دست زدن به حیوان، دست‌ها را با آب و صابون بشویید، به‌خصوص پیش از غذا."
        ] }
    ]
  },
  {
    id: "health-seed-19", subject: "health", level: "seed", emoji: "🤝", title: "دستم در دست تو",
    steps: [
      /* Seen from behind a child and her mother on the pavement: they hold hands, stop at the edge of the pavement
         (the kerb line is ringed; their feet stay on the pavement), a car and a bus go by, big and fast; then in the
         car, a boy in his child seat in the back, the belt drawn across him. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#cfe9f7",
        parts: {
          street: { art: "h-street" },
          car: { art: "🚗", at: [-40, 63], s: 2, flip: true }, bus: { art: "🚌", at: [210, 54], s: 2.2 },
          gm: { art: "h-mom-back", at: [86, 100], s: 0.95 }, kid: { art: "h-girl-back", at: [72, 100], s: 1 },
          edge: { art: "h-oval", at: [78, 67], sx: 3.4, sy: 0.6, o: 0 },
          panel: { art: "h-panel", o: 0 }, carIn: { art: "h-car-in", o: 0 }, seat: { art: "h-carseat", o: 0 },
          kidCar: { art: "h-boy", at: [61.1, 66.8], o: 0 }, dadCar: { art: "h-dad", at: [100, 77], s: 0.9, o: 0 },
          carBody: { art: "h-car-body", o: 0 }, belt: { art: "h-belt", o: 0 }
        },
        scenes: [
          { caption: "نزدیک خیابان، دست بزرگ‌تر را محکم می‌گیریم.", key: 3200, hold: 5200, do: [
            { id: "gm", to: { y: 86, s: 0.82 }, dur: 2200, ease: "out" }, { id: "kid", to: { x: 72, y: 86, s: 0.87 }, dur: 2200, ease: "out" },
            { id: "gm.legL", to: { sy: 0.86 }, dur: 2000, yoyo: true, times: 6 }, { id: "gm.legR", to: { sy: 0.86 }, at: 170, dur: 2000, yoyo: true, times: 6 },
            { id: "kid.legL", to: { sy: 0.86 }, dur: 2000, yoyo: true, times: 6 }, { id: "kid.legR", to: { sy: 0.86 }, at: 170, dur: 2000, yoyo: true, times: 6 }
          ].concat(B.hpose("gm", "h-mom-back", { armL: [-6.4, -21.4] }, 2400, 600), B.hpose("kid", "h-girl-back", { armR: [8.1, -20.1] }, 2400, 600)) },
          { caption: "به لبه پیاده‌رو که رسیدیم، می‌ایستیم. پایمان را در خیابان نمی‌گذاریم.", key: 4000, hold: 6400, do: [
            { id: "gm", to: { y: 70, s: 0.74 }, dur: 1600, ease: "out" }, { id: "kid", to: { x: 72.6, y: 70, s: 0.78 }, dur: 1600, ease: "out" },
            { id: "gm.legL", to: { sy: 0.86 }, dur: 1500, yoyo: true, times: 4 }, { id: "gm.legR", to: { sy: 0.86 }, at: 170, dur: 1500, yoyo: true, times: 4 },
            { id: "kid.legL", to: { sy: 0.86 }, dur: 1500, yoyo: true, times: 4 }, { id: "kid.legR", to: { sy: 0.86 }, at: 170, dur: 1500, yoyo: true, times: 4 },
            { cam: { x: 78, y: 60, zoom: 1.8 }, at: 1800, dur: 900 },
            { id: "edge", to: { o: 1 }, at: 2600, dur: 400 }, { id: "edge", to: { sx: 3.8 }, at: 3000, dur: 1600, yoyo: true, times: 2 }
          ] },
          { caption: "ماشین‌ها بزرگ و تند هستند. کنار بزرگ‌تر صبر می‌کنیم تا رد شوند.", key: 1700, hold: 5600, do: [
            { id: "edge", to: { o: 0 }, dur: 300 }, { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "car", to: { x: 200 }, at: 600, dur: 1900, ease: "linear" },
            { id: "bus", to: { x: -50 }, at: 2400, dur: 2600, ease: "linear" },
            { id: "gm.head", to: { r: -14 }, at: 600, dur: 900 }, { id: "kid.head", to: { r: -14 }, at: 600, dur: 900 },
            { id: "gm.lookL", to: { o: 1 }, at: 700, dur: 200 }, { id: "kid.lookL", to: { o: 1 }, at: 700, dur: 200 },
            { id: "gm.head", to: { r: 14 }, at: 2600, dur: 1200 }, { id: "kid.head", to: { r: 14 }, at: 2600, dur: 1200 },
            { id: "gm.lookL", to: { o: 0 }, at: 2800, dur: 200 }, { id: "kid.lookL", to: { o: 0 }, at: 2800, dur: 200 },
            { id: "gm.lookR", to: { o: 1 }, at: 3000, dur: 200 }, { id: "kid.lookR", to: { o: 1 }, at: 3000, dur: 200 }
          ] },
          { caption: "در ماشین، هر بار عقب و در صندلی کودک می‌نشینیم و کمربند می‌بندیم، حتی برای راه کوتاه.", key: 3400, hold: 6600, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "carIn", to: { o: 1 }, at: 300, dur: 500 }, { id: "seat", to: { o: 1 }, at: 300, dur: 500 },
            { id: "carBody", to: { o: 1 }, at: 300, dur: 500 }, { id: "kidCar", to: { o: 1 }, at: 300, dur: 500 }, { id: "dadCar", to: { o: 1 }, at: 300, dur: 500 },
            { id: "belt", to: { o: 1 }, at: 1900, dur: 1 }, { id: "belt", draw: true, at: 1900, dur: 1100 },
            { emit: "spark", where: [67, 50], spread: [3, 3], n: 4, at: 3000, dur: 300, life: 1000 }
          ].concat(B.hpose("kidCar", "h-boy", { armF: [-4, -26] }, 1400, 500), B.hpose("kidCar", "h-boy", { armF: [6, -15] }, 1900, 1100)) }
        ] },
      { type: "choose", prompt: "با بزرگ‌ترت کنار خیابان راه می‌روی. چه کار می‌کنی؟", say: "با بزرگ‌ترت کنار خیابان راه می‌روی. چه کار می‌کنی؟", stack: true,
        options: ["🤝 دستش را محکم می‌گیرم", "🏃 جلوتر می‌دوم"], answer: "🤝 دستش را محکم می‌گیرم" },
      { type: "choose", prompt: "توپت به خیابان رفت. چه کار می‌کنی؟", say: "توپت به خیابان رفت. چه کار می‌کنی؟", stack: true,
        options: ["🧍 لبه پیاده‌رو می‌ایستم و به بزرگ‌تر می‌گویم", "⚽ می‌دوم و برش می‌دارم"], answer: "🧍 لبه پیاده‌رو می‌ایستم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "سوار ماشین شدی. اول چه کار می‌کنی؟", say: "سوار ماشین شدی. اول چه کار می‌کنی؟", stack: true,
        options: ["🪢 در صندلی‌ام می‌نشینم و کمربند می‌بندم", "🪟 سرم را از پنجره بیرون می‌برم"], answer: "🪢 در صندلی‌ام می‌نشینم و کمربند می‌بندم" },
      { type: "doit", pic: "🤝", text: "امروز که بیرون رفتید، دست بزرگ‌ترت را بگیر و لبه هر پیاده‌رو بایست. در ماشین هم خودت یادآوری کن: «کمربند!»" },
      { type: "forparents",
        tips: [
          "کودک خردسال نمی‌تواند سرعت و فاصله ماشین را درست حدس بزند و از پشت ماشین‌های پارک‌شده دیده نمی‌شود. کنار خیابان همیشه دستش را بگیرید و خودتان سمت خیابان راه بروید.",
          "«لبه پیاده‌رو جای ایستادن است» را بازی کنید: هر بار به لبه رسیدید، هر دو بایستید و بگویید «بایست، نگاه کن، گوش کن».",
          "کودک را در هر سفر، حتی کوتاه، در صندلی کودک مناسب سن و وزنش در صندلی عقب بنشانید؛ نه روی پا و نه در صندلی جلو. صندلی کودک جان کودک را در تصادف نجات می‌دهد.",
          "کودک را حتی برای یک لحظه در ماشین تنها نگذارید، به‌خصوص در هوای گرم."
        ] }
    ]
  },
  {
    id: "health-seed-20", subject: "health", level: "seed", emoji: "💛", title: "بزرگ‌ترهای مهربان من",
    steps: [
      /* The boy's safe grown-ups: at home his mother, father and grandmother (a heart over each), at school his teacher;
         he says his own name and his mother's name. In the park he can't see his mother: he stands still on the spot
         and calls out, then asks a mother who has children with her; she helps, and his mother comes back.
         Drawings: js/art/rig-health.js; the teacher and the other mother are full-body walkers from js/scene.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [24, 88], s: 1.2 },
          gran: { art: "h-gran", at: [30, 99], s: 1.15 }, mom: { art: "h-mom", at: [120, 88], s: 1.15, flip: true }, dad: { art: "h-dad", at: [140, 88], s: 1.15, flip: true },
          boy: { art: "h-boy", at: [76, 88], s: 1.4 },
          h1: { art: "h-heart", at: [34, 36], s: 0.6, o: 0 }, h2: { art: "h-heart", at: [116, 24], s: 0.6, o: 0 }, h3: { art: "h-heart", at: [140, 22], s: 0.6, o: 0 },
          school: { art: "h-bedroom", at: [160, 0] }, board: { art: "h-board", at: [240, 30], s: 1.2 },
          teacher: { art: "👨‍🏫", at: [262, 88], s: 1.7, flip: true }, kid1: { art: "👧", at: [206, 88], s: 1.75 }, kid2: { art: "🧒", at: [188, 88], s: 1.75 },
          boy2: { art: "h-boy", at: [228, 88], s: 1.4 }, talk2: { art: "h-talk", at: [235, 52], s: 1.2, o: 0 },
          h4: { art: "h-heart", at: [258, 22], s: 0.6, o: 0 },
          park: { art: "h-park", at: [320, 0] }, spot: { art: "h-spot", at: [400, 88], s: 1.2, o: 0 },
          boy3: { art: "h-boy", at: [400, 88], s: 1.4 }, call: { art: "h-talk", at: [408, 51], s: 2, o: 0 },
          other: { art: "👩", at: [500, 88], s: 1.6, flip: true }, child: { art: "🧒", at: [518, 88], s: 1.6, flip: true },
          talk3: { art: "h-talk", at: [408, 52], s: 1.2, o: 0 },
          mom3: { art: "h-mom", at: [330, 88], s: 1.15, o: 0 }, h5: { art: "h-heart", at: [400, 40], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "این‌ها بزرگ‌ترهای مهربان من در خانه‌اند: مادرم، پدرم و مادربزرگم.", key: 4400, hold: 6400, do: B.hpose("gran", "h-gran", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 0, 1).concat([
            { id: "h2", to: { o: 1 }, at: 600, dur: 400 }, { id: "h2", to: { s: 0.8 }, at: 1000, dur: 800, yoyo: true, times: 2 },
            { id: "boy.head", to: { r: 6 }, at: 600, dur: 600 },
            { id: "h3", to: { o: 1 }, at: 1900, dur: 400 }, { id: "h3", to: { s: 0.8 }, at: 2300, dur: 800, yoyo: true, times: 2 },
            { id: "boy", to: { flip: -1 }, at: 3000, dur: 1 },
            { id: "h1", to: { o: 1 }, at: 3200, dur: 400 }, { id: "h1", to: { s: 0.8 }, at: 3600, dur: 800, yoyo: true, times: 2 },
            { id: "gran.head", to: { r: 8 }, at: 3600, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "در مهدکودک یا مدرسه هم یک بزرگ‌تر مهربان داریم: معلم.", key: 3800, hold: 6000, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "h4", to: { o: 1 }, at: 2000, dur: 400 }, { id: "h4", to: { s: 0.8 }, at: 2400, dur: 800, yoyo: true, times: 2 },
            { id: "teacher", to: { r: -4 }, at: 2400, dur: 1600, yoyo: true, times: 2 },
            { id: "kid1", path: "M206 88Q206 80 206 88", at: 3000, dur: 600 }
          ] },
          { caption: "اسم خودم را می‌دانم، و اسم مادر یا پدرم را هم می‌دانم.", key: 2600, hold: 6000, do: B.hpose("boy2", "h-boy", "talk", 0, 500).concat([
            { id: "talk2", to: { o: 1 }, at: 500, dur: 200 }, { id: "talk2", to: { s: 1.5 }, at: 500, dur: 3200, yoyo: true, times: 8 },
            { id: "boy2.mouth", to: { o: 0 }, at: 500, dur: 100 }, { id: "boy2.open", to: { o: 1 }, at: 500, dur: 100 },
            { id: "boy2.open", to: { sy: 0.4 }, at: 600, dur: 3200, yoyo: true, times: 10 },
            { id: "talk2", to: { o: 0 }, at: 3900, dur: 300 }, { id: "boy2.open", to: { o: 0 }, at: 3900, dur: 100 }, { id: "boy2.mouth", to: { o: 1 }, at: 3900, dur: 100 },
            { id: "teacher", to: { r: 5 }, at: 4000, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "اگر بزرگ‌ترمان را نمی‌بینیم، همان‌جا می‌ایستیم و بلند صدایش می‌زنیم.", key: 4400, hold: 7000, do: [
            { cam: { x: 400 }, dur: 1800 }, { id: "spot", to: { o: 1 }, at: 1800, dur: 500 },
            { id: "boy3.head", to: { r: -14 }, at: 2000, dur: 500 }, { id: "boy3", to: { flip: -1 }, at: 2600, dur: 300 }, { id: "boy3", to: { flip: 1 }, at: 3300, dur: 300 },
            { id: "boy3.head", to: { r: -10 }, at: 3700, dur: 400 },
            { id: "boy3.mouth", to: { o: 0 }, at: 3800, dur: 100 }, { id: "boy3.open", to: { o: 1 }, at: 3800, dur: 100 },
            { id: "call", to: { o: 1 }, at: 3800, dur: 200 }, { id: "call", to: { s: 2.6 }, at: 3800, dur: 2600, yoyo: true, times: 6 },
            { id: "call", to: { o: 0 }, at: 6400, dur: 300 }, { id: "boy3.open", to: { o: 0 }, at: 6400, dur: 100 }, { id: "boy3.mouth", to: { o: 1 }, at: 6400, dur: 100 }
          ] },
          { caption: "اگر نیامد، از یک مادر که بچه‌اش همراهش است کمک می‌خواهیم.", key: 5600, hold: 7600, do: [
            { id: "boy3.head", to: { r: 0 }, dur: 400 },
            { id: "other", walk: [432, 88], at: 300, dur: 2600 }, { id: "child", walk: [450, 88], at: 300, dur: 2600 },
            { id: "talk3", to: { o: 1 }, at: 3200, dur: 200 }, { id: "talk3", to: { s: 1.5 }, at: 3200, dur: 2400, yoyo: true, times: 6 },
            { id: "boy3.mouth", to: { o: 0 }, at: 3200, dur: 100 }, { id: "boy3.open", to: { o: 1 }, at: 3200, dur: 100 },
            { id: "boy3.open", to: { sy: 0.4 }, at: 3300, dur: 2400, yoyo: true, times: 8 },
            { id: "talk3", to: { o: 0 }, at: 5700, dur: 300 }, { id: "boy3.open", to: { o: 0 }, at: 5700, dur: 100 }, { id: "boy3.mouth", to: { o: 1 }, at: 5700, dur: 100 },
            { id: "other", to: { r: 5 }, at: 5800, dur: 1200, yoyo: true, times: 2 }
          ].concat(B.hpose("boy3", "h-boy", "talk", 3000, 400)) },
          { caption: "مادرش آمد! همدیگر را بغل می‌کنند.", key: 4600, hold: 6000, do: [
            { id: "spot", to: { o: 0 }, dur: 400 }, { id: "mom3", to: { o: 1 }, dur: 300 },
            { id: "mom3", walk: [380, 88], at: 200, dur: 2400 },
            { id: "boy3", to: { flip: -1 }, at: 1600, dur: 300 }
          ].concat(B.hpose("boy3", "h-boy", { armF: [7, -24], armB: [6, -23] }, 2400, 500), B.hpose("mom3", "h-mom", { upper: 25, armF: [17, -28], armB: [16, -27] }, 2600, 600), [
            { id: "h5", to: { o: 1 }, at: 3200, dur: 300 }, { id: "h5", path: "M392 40L390 30", at: 3200, dur: 1400 },
            { id: "other", to: { r: 0 }, dur: 300 }
          ]) }
        ] },
      { type: "choose", prompt: "در پارک هستی و مادرت را نمی‌بینی. اول چه کار می‌کنی؟", say: "در پارک هستی و مادرت را نمی‌بینی. اول چه کار می‌کنی؟", stack: true,
        options: ["🧍 همان‌جا می‌ایستم و بلند صدایش می‌زنم", "🏃 می‌دوم و همه جا را می‌گردم", "🚗 با یک غریبه می‌روم"], answer: "🧍 همان‌جا می‌ایستم و بلند صدایش می‌زنم" },
      { type: "choose", prompt: "از چه کسی کمک می‌خواهی؟", say: "از چه کسی کمک می‌خواهی؟", stack: true,
        options: ["👩‍👧 از یک مادر که بچه‌اش همراهش است، یا از فروشنده", "🚙 از کسی که در ماشین نشسته"], answer: "👩‍👧 از یک مادر که بچه‌اش همراهش است، یا از فروشنده" },
      { type: "doit", pic: "🗣️", text: "با بزرگ‌ترت تمرین کن: اسم کامل خودت را بگو، و اسم مادر یا پدرت را. بعد نام بزرگ‌ترهای مهربانت را بشمار: در خانه و در مهد یا مدرسه." },
      { type: "forparents",
        tips: [
          "با کودک فهرست «بزرگ‌ترهای مهربان» را بسازید: چند نفر در خانه، مهد یا مدرسه و همسایه که می‌تواند به آن‌ها بگوید. بزرگ‌تری که امن است به حرف کودک گوش می‌دهد و از او نمی‌خواهد رازی را از شما پنهان کند.",
          "اسم کامل کودک و اسم کامل یکی از والدین را با او تمرین کنید. از حدود چهار سالگی شماره تلفن را هم مثل شعر تمرین کنید، یا روی یک کارت در جیبش بگذارید.",
          "در جاهای شلوغ قرار بگذارید: «اگر همدیگر را گم کردیم، همان‌جا بایست و صدایم کن. من برمی‌گردم.» به او بگویید از یک مادر که بچه همراهش است یا از فروشنده مغازه کمک بخواهد، و هیچ‌وقت با کسی جایی نرود.",
          "اگر کودک گم شد و پیدا شد، دعوایش نکنید. بغلش کنید و از کارهای درستی که کرد تعریف کنید."
        ] }
    ]
  },
  {
    id: "health-seed-21", subject: "health", level: "seed", emoji: "📺", title: "کمی صفحه، کلی بازی",
    steps: [
      /* A girl watches a cartoon with her mother on the sofa; when the clock's long hand reaches the agreed place,
         she turns the television off herself and goes to play with her ball. Another time, the screen shows something
         that upsets her (grey clouds: nothing frightening is drawn): she goes to her mother and tells her, and her
         mother puts an arm round her. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, clock: { art: "h-clock", at: [96, 20], s: 1.3 }, tv: { art: "h-tv", at: [130, 88], s: 1.3 },
          sofa: { art: "h-sofa", at: [44, 88], s: 1.3 }, ball: { art: "ball-side", at: [96, 88], s: 1.2 },
          mom: { art: "h-mom-home", at: [56, 97.9], s: 1.15 }, girl: { art: "h-girl", at: [38, 91.2], s: 1.4 },
          talk: { art: "h-talk", at: [62, 51], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "گاهی با یک بزرگ‌تر کمی کارتون تماشا می‌کنیم.", key: 3000, hold: 6000, do: B.hpose("girl", "h-girl", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 0, 1).concat(
            B.hpose("mom", "h-mom-home", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 0, 1), [
            { id: "clock.min", to: { r: 0 }, dur: 1 }, { id: "clock.hour", to: { r: 120 }, dur: 1 },
            { id: "tv.sun", to: { x: 10 }, at: 300, dur: 5200, yoyo: true, times: 4 },
            { id: "girl.mouth", to: { o: 0 }, at: 1000, dur: 200 }, { id: "girl.open", to: { o: 1 }, at: 1000, dur: 200 },
            { id: "mom.head", to: { r: -6 }, at: 2000, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "وقتی که قرار گذاشته‌ایم تمام شد، صفحه را خاموش می‌کنیم.", key: 6600, hold: 7600, do: [
            { id: "girl.open", to: { o: 0 }, dur: 200 }, { id: "girl.mouth", to: { o: 1 }, dur: 200 },
            { id: "clock.min", to: { r: 180 }, at: 300, dur: 2400, ease: "linear" }, { id: "clock.hour", to: { r: 135 }, at: 300, dur: 2400, ease: "linear" },
            { emit: "spark", where: [96, 26], spread: [6, 4], n: 4, at: 2700, dur: 300, life: 1000 },
            { id: "girl", to: { y: 88 }, at: 3000, dur: 500 }
          ].concat(B.hunpose("girl", "h-girl", 3000, 500), [
            { id: "girl", walk: [108, 88], at: 3600, dur: 2000 }
          ], B.hpose("girl", "h-girl", { armF: [9.6, -26] }, 5600, 500), [
            { id: "tv.off", to: { o: 1 }, at: 6200, dur: 300 }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 6700, 400)) },
          { caption: "و می‌رویم بازی کنیم!", key: 2000, hold: 5000, do: [
            { id: "girl", to: { flip: -1 }, dur: 1 },
            { id: "girl", walk: [104, 88], at: 100, dur: 600 },
            { id: "girl.legF", to: { r: 35 }, at: 900, dur: 400 }, { id: "girl.legF", to: { r: -40 }, at: 1300, dur: 250, ease: "in" },
            { id: "ball", path: "M96 88Q80 60 64 88Q54 72 44 88", at: 1500, dur: 1800, ease: "linear" }, { id: "ball", to: { r: -720 }, at: 1500, dur: 1800 },
            { id: "girl.legF", to: { r: 0 }, at: 1800, dur: 400 },
            { id: "girl", walk: [70, 88], at: 2400, dur: 1400, steps: 4 }
          ].concat(B.hwalk("girl", 2400, 1400, 4, true)) },
          { caption: "اگر چیزی در صفحه ما را ترساند یا ناراحت کرد، به بزرگ‌ترمان می‌گوییم.", key: 6400, hold: 8400, do: [
            { id: "tv.off", to: { o: 0 }, dur: 300 }, { id: "tv.show", to: { o: 0 }, dur: 300 }, { id: "tv.grey", to: { o: 1 }, dur: 300 },
            { id: "girl", to: { flip: 1 }, at: 400, dur: 1 },
            { id: "girl.head", to: { r: 10 }, at: 800, dur: 600 },
            { id: "girl", to: { flip: -1 }, at: 2200, dur: 1 }, { id: "girl.head", to: { r: 0 }, at: 2200, dur: 300 },
            { id: "talk", to: { o: 1 }, at: 2600, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 2600, dur: 2000, yoyo: true, times: 6 },
            { id: "girl.mouth", to: { o: 0 }, at: 2600, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 2600, dur: 100 },
            { id: "girl.open", to: { sy: 0.4 }, at: 2700, dur: 2000, yoyo: true, times: 6 },
            { id: "talk", to: { o: 0 }, at: 4700, dur: 300 }, { id: "girl.open", to: { o: 0 }, at: 4700, dur: 100 }, { id: "girl.mouth", to: { o: 1 }, at: 4700, dur: 100 },
            { id: "mom", to: { y: 88 }, at: 4800, dur: 600 }
          ].concat(B.hunpose("mom", "h-mom-home", 4800, 600), B.hpose("mom", "h-mom-home", { upper: 20, armF: [14, -24] }, 5500, 700), [
            { id: "mom.head", to: { r: 10 }, at: 6200, dur: 1400, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "sort", prompt: "کدام بازی با صفحه است و کدام بازی بدون صفحه؟ بیشتر روز را با کدام بگذرانیم؟",
        baskets: [{ label: "بدون صفحه", pic: "⚽", value: "play" }, { label: "با صفحه", pic: "📱", value: "screen" }],
        items: [
          { pic: "🧱", say: "خانه‌سازی", basket: "play" }, { pic: "🖍️", say: "نقاشی", basket: "play" }, { pic: "📖", say: "کتاب با بزرگ‌تر", basket: "play" },
          { pic: "🛝", say: "سرسره", basket: "play" }, { pic: "📱", say: "بازی با گوشی", basket: "screen" }, { pic: "📺", say: "تلویزیون", basket: "screen" }
        ] },
      { type: "choose", prompt: "وقت کارتون تمام شد. چه کار می‌کنی؟", say: "وقت کارتون تمام شد. چه کار می‌کنی؟", stack: true,
        options: ["⚽ خاموشش می‌کنم و می‌روم بازی", "😠 گریه می‌کنم که باز هم ببینم"], answer: "⚽ خاموشش می‌کنم و می‌روم بازی" },
      { type: "choose", prompt: "در گوشی چیزی دیدی که ناراحتت کرد. چه کار می‌کنی؟", say: "در گوشی چیزی دیدی که ناراحتت کرد. چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به بزرگ‌ترم می‌گویم", "🤐 به هیچ‌کس نمی‌گویم"], answer: "🗣️ به بزرگ‌ترم می‌گویم" },
      { type: "forparents",
        tips: [
          "سازمان جهانی بهداشت: برای کودک زیر دو سال صفحه نه (جز تماس تصویری با خانواده)، و برای دو تا پنج سال روزی حداکثر یک ساعت، هرچه کمتر بهتر. کنار کودک بنشینید و درباره آنچه می‌بینید حرف بزنید.",
          "پیش از روشن کردن، وقت را قرار بگذارید: «تا وقتی عقربه بزرگ به شش برسد.» یک دقیقه مانده خبر بدهید، و بعد بازی بعدی را پیشنهاد کنید. صفحه را جایزه یا تنبیه نکنید.",
          "سر سفره، یک ساعت پیش از خواب و در اتاق خواب صفحه نباشد. خودتان هم جلوی کودک کمتر با گوشی باشید.",
          "به کودک بگویید اگر چیزی در صفحه او را ترساند یا ناراحت کرد، بگوید و دعوا نمی‌شود. وقتی گفت، آرام بغلش کنید، صفحه را خاموش کنید و با او حرف بزنید."
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
    id: "health-sprout-5", subject: "health", level: "sprout", emoji: "🪥", title: "خودم تمیز می‌کنم",
    steps: [
      /* Doing more on my own: two minutes of brushing (the clock's long hand moves two minutes), every side of the teeth
         and the tongue (close-ups from js/art/rig-health.js, as in health-seed-2), washing the hair in the bath with a
         grown-up near, short nails, and dirty clothes into the laundry basket, clean ones out of the drawer. */
      { type: "scene", prompt: "ببین چطور خودمان را تمیز نگه می‌داریم", bg: "#dff1f7",
        parts: {
          room: { art: "bathroom" }, clock: { art: "h-clock", at: [130, 18], s: 1.3 },
          kid: { art: "h-boy-front", at: [80, 86], s: 1.8 }, counter: { art: "h-counter" },
          panel: { art: "h-panel", o: 0 }, mouth: { art: "h-mouth", o: 0 }, brushF: { art: "h-brushF", at: [52, 36], o: 0 },
          arch: { art: "h-arch", o: 0 }, brushT: { art: "h-brushT", at: [80, 60], o: 0 },
          bath: { art: "h-bathroom", at: [160, 0] }, shower: { art: "h-shower", at: [236, 20], s: 1.4 },
          boyB: { art: "h-boy-front", at: [236, 92], s: 1.6 }, tub: { art: "h-tub", at: [240, 90], s: 1.2 },
          dad: { art: "h-dad", at: [296, 88], s: 1.15, flip: true },
          panel2: { art: "h-panel", at: [160, 0], o: 0 }, hand: { art: "h-nailhand", at: [240, 84], s: 2.6, o: 0 }, clip: { art: "h-clipper", at: [290, 30], s: 2.2, o: 0 },
          bed: { art: "h-bedroom", at: [320, 0] }, drawer: { art: "h-table", at: [440, 88], s: 1.4 }, shirt: { art: "👕", at: [440, 62.4], s: 0.6 },
          basket: { art: "🧺", at: [356, 88], s: 0.8 }, sock: { art: "🧦", at: [392, 62], s: 0.45, o: 0 },
          boyS: { art: "h-boy", at: [400, 88], s: 1.4, flip: true }
        },
        scenes: [
          { caption: "حالا بیشتر کارها را خودمان انجام می‌دهیم. صبح و شب، دو دقیقه مسواک می‌زنیم.", key: 4400, hold: 7400, do: B.hpose("kid", "h-boy-front", "brush", 300, 700).concat([
            { id: "boyB.legL", to: { o: 0 }, dur: 1 }, { id: "boyB.legR", to: { o: 0 }, dur: 1 },
            { id: "kid.brush", to: { o: 1 }, at: 300, dur: 200 },
            { id: "kid.foreR", to: { r: "+9" }, at: 1100, dur: 5600, yoyo: true, times: 24 },
            { emit: "bubble", where: [82, 41], spread: [6, 3], rise: -4, n: 14, at: 1100, dur: 5600, life: 900 },
            { id: "clock.min", to: { r: 12 }, at: 1100, dur: 5600, ease: "linear" }
          ]) },
          { caption: "همه طرف دندان‌ها را مسواک می‌زنیم: جلو، پشت و روی آن‌ها. زبان را هم آرام مسواک می‌زنیم.", key: 6300, hold: 9200, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "mouth", to: { o: 1 }, at: 300, dur: 500 }, { id: "brushF", to: { o: 1 }, at: 600, dur: 300 },
            { id: "mouth.dirtUp", to: { o: 0 }, at: 900, dur: 2200 },
            { id: "mouth", to: { o: 0 }, at: 3300, dur: 400 }, { id: "brushF", to: { o: 0 }, at: 3300, dur: 300 },
            { id: "arch", to: { o: 1 }, at: 3500, dur: 500 }, { id: "brushT", to: { o: 1 }, at: 3900, dur: 300 },
            { id: "arch.dirtIn", to: { o: 0 }, at: 4000, dur: 2000 }, { id: "arch.dirtTop", to: { o: 0 }, at: 4000, dur: 2000 },
            { emit: "bubble", where: [80, 60], spread: [24, 16], rise: -3, n: 10, at: 4000, dur: 4000, life: 1000 }
          ].concat(B.hloops("brushF", [52, 36], [108, 36], 6, 2.2, 900, 2200), B.hloops("brushT", [70, 62], [90, 62], 6, 2, 4000, 3600)) },
          { caption: "در حمام، خودمان موهایمان را با شامپو می‌شوییم و آب می‌کشیم. یک بزرگ‌تر نزدیکمان است.", key: 4400, hold: 7600, do: [
            { id: "arch", to: { o: 0 }, dur: 400 }, { id: "brushT", to: { o: 0 }, dur: 300 }, { id: "panel", to: { o: 0 }, dur: 400 },
            { cam: { x: 240 }, at: 300, dur: 1800 }
          ].concat(B.hpose("boyB", "h-boy-front", { armL: [-3.4, -32], armR: [3.4, -32] }, 2000, 600), [
            { id: "boyB.foreL", to: { r: "+14" }, at: 2600, dur: 2400, yoyo: true, times: 10 }, { id: "boyB.foreR", to: { r: "-14" }, at: 2600, dur: 2400, yoyo: true, times: 10 },
            { emit: "bubble", where: [236, 40], spread: [14, 6], n: 14, at: 2600, dur: 2400 },
            { id: "shower.water", to: { o: 1 }, at: 5100, dur: 300 },
            { id: "boyB.pupils", to: { o: 0 }, at: 2400, dur: 200 }, { id: "boyB.shut", to: { o: 1 }, at: 2400, dur: 200 },
            { id: "dad.head", to: { r: 8 }, at: 3000, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "ناخن‌هایمان را کوتاه و تمیز نگه می‌داریم.", key: 3600, hold: 6000, do: [
            { id: "shower.water", to: { o: 0 }, dur: 400 },
            { id: "panel2", to: { o: 1 }, at: 300, dur: 500 }, { id: "hand", to: { o: 1 }, at: 500, dur: 500 }, { id: "clip", to: { o: 1 }, at: 1000, dur: 300 },
            { id: "clip", path: "M290 30L224.1 28.4", at: 1200, dur: 700 }, { id: "clip.lever", to: { r: 10 }, at: 1900, dur: 400, yoyo: true, times: 2 }, { id: "hand.t1", to: { sy: 0.15 }, at: 2100, dur: 300 },
            { id: "clip", path: "M224.1 28.4L233.4 24.2", at: 2400, dur: 400 }, { id: "clip.lever", to: { r: 10 }, at: 2800, dur: 400, yoyo: true, times: 2 }, { id: "hand.t2", to: { sy: 0.15 }, at: 3000, dur: 300 },
            { id: "clip", path: "M233.4 24.2L242.8 25.2", at: 3300, dur: 400 }, { id: "clip.lever", to: { r: 10 }, at: 3700, dur: 400, yoyo: true, times: 2 }, { id: "hand.t3", to: { sy: 0.15 }, at: 3900, dur: 300 },
            { id: "clip", path: "M242.8 25.2L252.2 30.4", at: 4200, dur: 400 }, { id: "clip.lever", to: { r: 10 }, at: 4600, dur: 400, yoyo: true, times: 2 }, { id: "hand.t4", to: { sy: 0.15 }, at: 4800, dur: 300 }
          ] },
          { caption: "لباس‌های کثیف را در سبد رخت‌چرک می‌گذاریم و لباس تمیز برمی‌داریم.", key: 7400, hold: 7400, do: [
            { cam: { x: 400 }, dur: 1800 },
            { id: "sock", to: { o: 1 }, at: 1800, dur: 200 }
          ].concat(B.hpose("boyS", "h-boy", "talk", 1700, 300), [
            { id: "boyS", walk: [372, 88], at: 2000, dur: 1600 }, { id: "sock", path: "M392 62L364 62Q358 66 356 76", at: 2000, dur: 2400 },
            { id: "boyS", to: { flip: 1 }, at: 4500, dur: 1 }, { id: "boyS", walk: [424, 88], at: 4600, dur: 1800 }
          ], B.hpose("boyS", "h-boy", { armF: [12, -24] }, 6500, 500), [
            { id: "shirt", to: { y: 56, x: 438 }, at: 7000, dur: 500 }
          ]) }
        ] },
      { type: "order", prompt: "مسواک زدن را به ترتیب بچین", numbered: true,
        items: [{ pic: "🪥", label: "خمیردندان، اندازه یک نخود" }, { pic: "😁", label: "جلوی دندان‌ها" }, { pic: "🦷", label: "پشت و روی دندان‌ها" }, { pic: "👅", label: "زبان" }, { pic: "💦", label: "تف کردن" }] },
      { type: "order", prompt: "حمام کردن را به ترتیب بچین", numbered: true,
        items: [{ pic: "🚿", label: "خیس کردن" }, { pic: "🧴", label: "شامپو و صابون" }, { pic: "🫧", label: "مالیدن" }, { pic: "💧", label: "آب کشیدن" }, { pic: "🧺", label: "خشک کردن و لباس تمیز" }] },
      { type: "doit", pic: "⏱️", text: "امشب خودت مسواک بزن و آرام تا ۱۲۰ بشمار، یا یک آهنگ دو دقیقه‌ای بخوان. بعد بگذار بزرگ‌ترت نگاه کند و اگر لازم بود کمکت کند." },
      { type: "forparents",
        tips: [
          "کودک در این سن خیلی کارها را خودش می‌تواند، ولی هنوز به نظارت نیاز دارد. بعد از مسواک او، شما هم یک بار مسواک بزنید یا نگاه کنید، تا حدود هشت سالگی.",
          "مسواک دو دقیقه طول بکشد، صبح و شب، با خمیردندان فلوئوردار به اندازه یک نخود. یک ساعت شنی یا یک آهنگ کوتاه کمک می‌کند.",
          "سبد رخت‌چرک و کشوی لباس را جایی بگذارید که کودک خودش برسد. لباس زیر و جوراب را هر روز عوض کنید.",
          "اگر کودک در حمام خودش را می‌شوید، شما بیرون در و در دسترس باشید و آب گرم را خودتان تنظیم کنید."
        ] }
    ]
  },
  {
    id: "health-sprout-6", subject: "health", level: "sprout", emoji: "🩺", title: "دکتر، دندان‌پزشک، واکسن",
    steps: [
      /* A calm visit, nothing hurts in the pictures: at the health centre the girl's height is measured and her eyes
         are checked with a chart; the dentist looks at her teeth; for a vaccine she holds her mother's hand and breathes
         slowly while the nurse touches her arm, then a small plaster; and a star sticker at the end. The needle itself is
         never shown. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#dfe8f6",
        parts: {
          clinic: { art: "h-bedroom" }, chart: { art: "h-chart", at: [34, 88], s: 1.2 }, eyes: { art: "h-eyechart", at: [134, 34], s: 1.2 },
          doctor: { art: "h-doctor", at: [96, 88], s: 1.2, flip: true }, girl: { art: "h-girl", at: [40, 88], s: 1.4 },
          room2: { art: "h-bedroom", at: [160, 0] }, girlF: { art: "h-girl-front", at: [228, 88], s: 1.6 }, dentist: { art: "h-doctor", at: [258, 88], s: 1.2, flip: true },
          room3: { art: "h-bedroom", at: [320, 0] }, mom: { art: "h-mom-home", at: [374, 88], s: 1.15 }, girl3: { art: "h-girl", at: [392, 88], s: 1.4 },
          nurse: { art: "h-doctor", at: [414, 88], s: 1.2, flip: true }, breath: { art: "h-breath", at: [383, 20], s: 1.1, o: 0 },
          plaster: { art: "h-plaster", at: [393.5, 61], s: 1.2, o: 0 }, sticker: { art: "h-sticker", at: [395, 68], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "در معاینه، قدمان را اندازه می‌گیرند.", key: 3200, hold: 5400, do: [
            { id: "chart.mark", to: { y: 1.6 }, at: 800, dur: 1800 },
            { emit: "spark", where: [34, 40], spread: [10, 4], n: 4, at: 2600, dur: 400, life: 1100 },
            { id: "doctor.head", to: { r: 8 }, at: 2800, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "چشم‌هایمان را با یک تابلو امتحان می‌کنند: یک چشم را می‌پوشانیم و شکل‌ها را می‌گوییم.", key: 4600, hold: 7000, do: [
            { id: "girl", walk: [70, 88], dur: 1800 }, { id: "doctor", walk: [112, 88], at: 200, dur: 1400 }
          ].concat(B.hpose("girl", "h-girl", "face", 2000, 600), B.hpose("doctor", "h-doctor", { armF: [-14, -44] }, 2200, 700), [
            { id: "girl.mouth", to: { o: 0 }, at: 3000, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 3000, dur: 100 },
            { id: "girl.open", to: { sy: 0.4 }, at: 3100, dur: 2400, yoyo: true, times: 8 }
          ]) },
          { caption: "دندان‌پزشک دندان‌هایمان را نگاه می‌کند. دهانمان را باز نگه می‌داریم.", key: 4000, hold: 6000, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "girlF.mouth", to: { o: 0 }, at: 1800, dur: 100 }, { id: "girlF.open", to: { o: 1, s: 1.6 }, at: 1800, dur: 300 }
          ].concat(B.hpose("dentist", "h-doctor", { upper: 25, armF: [16, -34] }, 1900, 700), [
            { id: "dentist.head", to: { r: 10 }, at: 2800, dur: 2400, yoyo: true, times: 2 }
          ]) },
          { caption: "واکسن یک لحظه سوزن می‌زند و زود تمام می‌شود. دست بزرگ‌تر را می‌گیریم و آرام نفس می‌کشیم.", key: 4400, hold: 8000, do: [
            { cam: { x: 400 }, dur: 1800 }
          ].concat(B.hpose("mom", "h-mom-home", { armF: [14, -22] }, 1700, 600), B.hpose("girl3", "h-girl", { armB: [-3.4, -14] }, 1700, 600), [
            { id: "breath", to: { o: 1 }, at: 2200, dur: 400 }, { id: "breath", to: { s: 1.8 }, at: 2400, dur: 4800, yoyo: true, times: 4, ease: "soft" },
            { id: "girl3.eye", to: { o: 0 }, at: 2600, dur: 200 }, { id: "girl3.shut", to: { o: 1 }, at: 2600, dur: 200 }
          ], B.hpose("nurse", "h-doctor", { armF: [15.8, -21.7] }, 2600, 700), [
            { id: "plaster", to: { o: 1 }, at: 4600, dur: 300 }
          ], B.hpose("nurse", "h-doctor", { upper: 0, armF: [0.2, -21] }, 5000, 600), [
            { id: "girl3.eye", to: { o: 1 }, at: 6000, dur: 200 }, { id: "girl3.shut", to: { o: 0 }, at: 6000, dur: 200 }
          ]) },
          { caption: "واکسن به بدن کمک می‌کند بیمار نشود. هر سؤالی داریم، می‌پرسیم.", key: 2400, hold: 5000, do: [
            { id: "breath", to: { o: 0 }, dur: 400 }, { id: "sticker", to: { o: 1 }, at: 600, dur: 300 }, { id: "sticker", to: { s: 1 }, at: 900, dur: 600, yoyo: true, times: 2 },
            { emit: "spark", where: [395, 50], spread: [24, 16], n: 8, at: 900, dur: 900, life: 1300 },
            { id: "girl3.mouth", to: { o: 0 }, at: 1000, dur: 100 }, { id: "girl3.open", to: { o: 1 }, at: 1000, dur: 100 },
            { id: "nurse.head", to: { r: 8 }, at: 1600, dur: 1400, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "choose", prompt: "دکتر می‌خواهد قلبت را با گوشی پزشکی گوش کند. چه کار می‌کنی؟", say: "دکتر می‌خواهد قلبت را با گوشی پزشکی گوش کند. چه کار می‌کنی؟", stack: true,
        options: ["🧍 آرام می‌ایستم و نفس می‌کشم", "🏃 فرار می‌کنم"], answer: "🧍 آرام می‌ایستم و نفس می‌کشم" },
      { type: "choose", prompt: "واکسن چه کاری می‌کند؟", say: "واکسن چه کاری می‌کند؟", stack: true,
        options: ["🛡️ به بدن کمک می‌کند بیمار نشود", "🍬 خوش‌مزه است"], answer: "🛡️ به بدن کمک می‌کند بیمار نشود" },
      { type: "breathe", cycles: 3 },
      { type: "forparents",
        tips: [
          "پیش از رفتن، ساده و راست بگویید چه می‌شود: «قدت را اندازه می‌گیرند، چشم‌هایت را امتحان می‌کنند. واکسن یک لحظه سوزن می‌زند.» نگویید «اصلاً درد ندارد» و دکتر و آمپول را وسیله ترساندن نکنید.",
          "واکسن‌های کودک را طبق کارت واکسن و برنامه مرکز بهداشت به‌موقع بزنید و معاینه سلامت پیش از دبستان (بینایی، شنوایی، دندان) را فراموش نکنید.",
          "سالی یک یا دو بار به دندان‌پزشک یا مرکز بهداشت بروید. در زمان واکسن، کودک را بغل کنید، دستش را بگیرید و با او آرام نفس بکشید.",
          "بعد از ویزیت، از شجاعتش تعریف کنید و بگذارید درباره احساسش حرف بزند."
        ] }
    ]
  },
  {
    id: "health-sprout-7", subject: "health", level: "sprout", emoji: "🦠", title: "بازی میکروب",
    steps: [
      // The game lesson of the hygiene unit: what spreads germs and what stops them (two sorts), the steps of sneezing
      // into a tissue and of getting ready in the morning, in order.
      { type: "sort", prompt: "کدام میکروب را پخش می‌کند و کدام جلویش را می‌گیرد؟",
        baskets: [{ label: "پخش می‌کند", pic: "🦠", value: "spread" }, { label: "جلویش را می‌گیرد", pic: "🛡️", value: "stop" }],
        items: [
          { pic: "🧼", say: "شستن دست با آب و صابون", basket: "stop" }, { pic: "💪", say: "عطسه در آرنج", basket: "stop" }, { pic: "🗑️", say: "دستمال در سطل آشغال", basket: "stop" },
          { pic: "🤧", say: "عطسه در هوا", basket: "spread" }, { pic: "👃", say: "دست در دماغ", basket: "spread" }, { pic: "🥄", say: "قاشق مشترک وقتی مریضیم", basket: "spread" }
        ] },
      { type: "sort", prompt: "کی دست‌هایمان را می‌شوییم؟",
        baskets: [{ label: "دست‌ها را می‌شوییم", pic: "🧼", value: "wash" }, { label: "لازم نیست", pic: "🙂", value: "no" }],
        items: [
          { pic: "🍽️", say: "پیش از غذا", basket: "wash" }, { pic: "🧻", say: "بعد از دستشویی", basket: "wash" }, { pic: "🤧", say: "بعد از فین کردن", basket: "wash" },
          { pic: "🐈", say: "بعد از ناز کردن گربه", basket: "wash" }, { pic: "📖", say: "پیش از کتاب خواندن", basket: "no" }, { pic: "😴", say: "وقتی خوابیم", basket: "no" }
        ] },
      { type: "order", prompt: "عطسه می‌آید! به ترتیب بچین", numbered: true,
        items: [{ pic: "🧻", label: "دستمال جلوی دهان و بینی" }, { pic: "🤧", label: "عطسه" }, { pic: "🗑️", label: "دستمال در سطل" }, { pic: "🧼", label: "شستن دست‌ها" }] },
      { type: "order", prompt: "کارهای صبح را به ترتیب بچین", numbered: true,
        items: [{ pic: "🧻", label: "دستشویی" }, { pic: "🧼", label: "شستن دست و صورت" }, { pic: "👕", label: "پوشیدن لباس تمیز" }, { pic: "🍞", label: "صبحانه" }, { pic: "🪥", label: "مسواک" }] },
      { type: "forparents",
        tips: [
          "شستن دست با آب و صابون مهم‌ترین کار برای پیشگیری از اسهال و سرماخوردگی است. هر بار که کودک یادش ماند، تشویقش کنید.",
          "به کودک یاد بدهید وقتی دستمال نیست، در آرنجش عطسه یا سرفه کند، نه در دستش. وقتی کسی مریض است، قاشق، لیوان و حوله جدا باشد.",
          "کودکی که تب یا اسهال دارد در خانه استراحت کند تا خوب شود؛ این از دوستانش هم مراقبت می‌کند."
        ] }
    ]
  },
  {
    id: "health-sprout-8", subject: "health", level: "sprout", emoji: "🍽️", title: "بشقاب من",
    steps: [
      /* The food groups of the Iranian table, one group at a time in the corners of a cloth (bread and rice; fruit and
         vegetables; beans, eggs, meat and fish; milk, yoghurt and cheese), then one of each goes onto the plate in the
         middle. No food is called good or bad. Drawings: js/art/rig-health.js and the food pictures (js/art/food.js). */
      { type: "scene", prompt: "به سفره نگاه کن", bg: "#fbeedd",
        parts: {
          cloth: { art: "h-panel" }, plate: { art: "h-plate", at: [80, 46], s: 1.1 },
          bread: { art: "🍞", at: [18, 26], s: 0.85, o: 0 }, rice: { art: "🍚", at: [36, 26], s: 0.85, o: 0 },
          apple: { art: "🍎", at: [110, 26], s: 0.8, o: 0 }, carrot: { art: "🥕", at: [126, 26], s: 0.8, o: 0 }, cucumber: { art: "🥒", at: [142, 26], s: 0.8, o: 0 },
          egg: { art: "🥚", at: [16, 84], s: 0.8, o: 0 }, fish: { art: "🐟", at: [32, 84], s: 0.8, o: 0 }, stew: { art: "🍲", at: [48, 84], s: 0.8, o: 0 },
          milk: { art: "🥛", at: [124, 84], s: 0.8, o: 0 }, cheese: { art: "🧀", at: [142, 84], s: 0.8, o: 0 },
          ring: { art: "h-oval", at: [27, 18], s: 1.8, o: 0 }
        },
        scenes: [
          { caption: "سفره ایرانی گروه‌های خوراکی دارد. نان و برنج به بدنمان نیرو می‌دهند.", key: 3000, hold: 5400, do: [
            { id: "bread", to: { o: 1 }, at: 400, dur: 500 }, { id: "rice", to: { o: 1 }, at: 900, dur: 500 },
            { id: "ring", to: { o: 1 }, at: 1400, dur: 400 }, { id: "ring", to: { s: 2 }, at: 1800, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "میوه و سبزی رنگارنگ‌اند و هر روز سر سفره‌اند.", key: 3000, hold: 5400, do: [
            { id: "ring", path: "M27 18L126 18", dur: 900 }, { id: "ring", to: { sx: 1.5 }, dur: 900 },
            { id: "apple", to: { o: 1 }, at: 600, dur: 500 }, { id: "carrot", to: { o: 1 }, at: 1000, dur: 500 }, { id: "cucumber", to: { o: 1 }, at: 1400, dur: 500 }
          ] },
          { caption: "تخم‌مرغ، ماهی و عدسی بدنمان را قوی می‌کنند.", key: 3000, hold: 5400, do: [
            { id: "ring", path: "M126 18L32 76", dur: 900 },
            { id: "egg", to: { o: 1 }, at: 600, dur: 500 }, { id: "fish", to: { o: 1 }, at: 1000, dur: 500 }, { id: "stew", to: { o: 1 }, at: 1400, dur: 500 }
          ] },
          { caption: "شیر و پنیر به استخوان‌ها و دندان‌ها کمک می‌کنند.", key: 3000, hold: 5400, do: [
            { id: "ring", path: "M32 76L133 76", dur: 900 }, { id: "ring", to: { sx: 1.1 }, dur: 900 },
            { id: "milk", to: { o: 1 }, at: 600, dur: 500 }, { id: "cheese", to: { o: 1 }, at: 1000, dur: 500 }
          ] },
          { caption: "در بشقابمان از هر گروه کمی می‌گذاریم. هیچ خوراکی «بد» نیست.", key: 6400, hold: 8400, do: [
            { id: "ring", to: { o: 0 }, dur: 400 },
            { id: "rice", path: "M36 26Q60 30 72 40", at: 600, dur: 1000 }, { id: "carrot", path: "M126 26Q100 30 90 40", at: 1800, dur: 1000 },
            { id: "fish", path: "M32 84Q56 66 72 58", at: 3000, dur: 1000 }, { id: "cheese", path: "M142 84Q106 66 90 58", at: 4200, dur: 1000 },
            { emit: "spark", where: [80, 46], spread: [40, 30], n: 10, at: 5400, dur: 900, life: 1300 }
          ] }
        ] },
      { type: "sort", prompt: "هر خوراکی را در گروه خودش بگذار",
        baskets: [{ label: "نان و برنج", pic: "🍞", value: "grain" }, { label: "میوه و سبزی", pic: "🍎", value: "fruit" }, { label: "تخم‌مرغ، حبوبات، گوشت", pic: "🥚", value: "protein" }, { label: "شیر و لبنیات", pic: "🥛", value: "dairy" }],
        items: [
          { pic: "🍚", say: "برنج", basket: "grain" }, { pic: "🥖", say: "نان", basket: "grain" }, { pic: "🍐", say: "گلابی", basket: "fruit" }, { pic: "🥬", say: "کاهو", basket: "fruit" },
          { pic: "🐟", say: "ماهی", basket: "protein" }, { pic: "🍲", say: "عدسی", basket: "protein" }, { pic: "🧀", say: "پنیر", basket: "dairy" }, { pic: "🥛", say: "شیر", basket: "dairy" }
        ] },
      { type: "choose", prompt: "کدام بشقاب از همه گروه‌ها کمی دارد؟", say: "کدام بشقاب از همه گروه‌ها کمی دارد؟", stack: true,
        options: ["🍚🥕🐟🧀 برنج، هویج، ماهی و پنیر", "🍚🍞🥖 برنج، نان و نان", "🍰🍬 کیک و آب‌نبات"], answer: "🍚🥕🐟🧀 برنج، هویج، ماهی و پنیر" },
      { type: "choose", prompt: "عدس و لوبیا در کدام گروه‌اند؟", say: "عدس و لوبیا در کدام گروه‌اند؟", stack: true,
        options: ["🥚 همان گروهی که تخم‌مرغ و گوشت در آن است", "🥛 گروه شیر"], answer: "🥚 همان گروهی که تخم‌مرغ و گوشت در آن است" },
      { type: "forparents",
        tips: [
          "سفره ایرانی به‌خودی‌خود متنوع است: نان یا برنج، سبزی و میوه، حبوبات و تخم‌مرغ یا گوشت، و ماست و پنیر. سعی کنید هر وعده از چند گروه چیزی داشته باشد.",
          "خوراکی‌ها را «خوب» و «بد» یا «چاق‌کننده» نخوانید. درباره وزن و شکل بدن کودک یا دیگران حرف نزنید.",
          "اندازه بشقاب کودک کوچک‌تر از بزرگ‌ترهاست. بگذارید خودش بگوید سیر شده و مجبورش نکنید بشقاب را تمام کند.",
          "کودک را در چیدن سفره و بشقاب شریک کنید: «یک چیز از گروه میوه و سبزی هم بگذاریم؟»"
        ] }
    ]
  },
  {
    id: "health-sprout-9", subject: "health", level: "sprout", emoji: "🧀", title: "صبحانه و میان‌وعده",
    steps: [
      /* In the kitchen: the boy eats breakfast at the sofreh (bread and cheese, an egg), then gets up full of energy and
         jumps; later a small snack comes on a plate (an apple, walnuts, bread and cheese) and he eats a piece of apple;
         and he drinks a glass of water. Drawings: js/art/rig-health.js and the food pictures. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#fbeedd",
        parts: {
          room: { art: "h-kitchen" }, win: { art: "h-window", at: [130, 26] }, sofreh: { art: "h-sofreh", at: [92, 80], s: 1.1 },
          bread: { art: "🍞", at: [80, 81], s: 0.5 }, cheese: { art: "🧀", at: [94, 80], s: 0.45 }, egg: { art: "🥚", at: [108, 80], s: 0.42 },
          plate: { art: "🍽️", at: [94, 84], s: 0.6, o: 0 }, apple: { art: "🍎", at: [88, 80], s: 0.42, o: 0 }, nuts: { art: "🌰", at: [96, 80.5], s: 0.38, o: 0 },
          piece: { art: "🍎", at: [80, 79], s: 0.25, o: 0 },
          glass: { art: "h-glass", at: [72, 83], s: 1.1, o: 0 },
          boy: { art: "h-boy", at: [52, 100.6], s: 1.5 }
        },
        scenes: [
          { caption: "صبح صبحانه می‌خوریم تا برای بازی و یادگیری نیرو داشته باشیم.", key: 3200, hold: 6600, do: B.hpose("boy", "h-boy", "sit", 0, 1).concat([
            { id: "win.sun", to: { y: 6 }, dur: 1 }, { id: "win.sun", to: { y: 0 }, at: 100, dur: 1400, ease: "out" }
          ], B.hpose("boy", "h-boy", { upper: 25, armF: [12, -12] }, 600, 600), [
            { id: "bread", to: { o: 0 }, at: 1200, dur: 100 }, { id: "boy.bread", to: { o: 1 }, at: 1200, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 1200, 700), [
            { id: "boy.mouth", to: { o: 0 }, at: 1900, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1900, dur: 100 },
            { id: "boy.open", to: { sy: 0.3 }, at: 2000, dur: 3600, yoyo: true, times: 6 }, { id: "boy.bread", to: { o: 0 }, at: 5400, dur: 200 },
            { id: "boy.open", to: { o: 0 }, at: 5700, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 5700, dur: 100 }
          ], B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 5700, 500)) },
          { caption: "با نیروی صبحانه، تا ظهر بازی می‌کنیم و یاد می‌گیریم!", key: 2300, hold: 5000, do: [
            { id: "boy", to: { y: 88 }, dur: 600 }, { id: "boy", walk: [36, 88], at: 700, dur: 900 },
            { id: "boy", path: "M36 88Q36 64 36 88", at: 1800, dur: 700 }, { id: "boy", path: "M36 88Q36 64 36 88", at: 2600, dur: 700 },
            { emit: "spark", from: "boy", where: [0, -30], spread: [26, 30], n: 8, at: 1800, dur: 1400, life: 1200 }
          ].concat(B.hunpose("boy", "h-boy", 0, 600), B.hpose("boy", "h-boy", { armF: [3, -33.5], armB: [1, -33.5] }, 1700, 300), B.hpose("boy", "h-boy", { armF: [0.2, -12], armB: [0.2, -12] }, 3400, 400)) },
          { caption: "میان روز یک میان‌وعده کوچک می‌خوریم: میوه، گردو، یا نان و پنیر.", key: 5600, hold: 8000, do: [
            { id: "bread", to: { o: 1, x: 104 }, dur: 1 }, { id: "cheese", to: { x: 112 }, dur: 1 }, { id: "egg", to: { o: 0 }, dur: 1 },
            { id: "plate", to: { o: 1 }, at: 300, dur: 400 }, { id: "apple", to: { o: 1 }, at: 700, dur: 400 }, { id: "nuts", to: { o: 1 }, at: 1100, dur: 400 },
            { id: "boy", walk: [52, 88], at: 300, dur: 1000 }, { id: "boy", to: { y: 100.6 }, at: 1500, dur: 500 }
          ].concat(B.hpose("boy", "h-boy", "sit", 1500, 500), B.hpose("boy", "h-boy", { upper: 25, armF: [12, -12] }, 2200, 500), [
            { id: "piece", to: { o: 1 }, at: 2700, dur: 100 }, { id: "piece", path: "M80 79Q72 66 60.4 63", at: 2700, dur: 700 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.4, -26.2], head: 4 }, 2700, 700), [
            { id: "boy.mouth", to: { o: 0 }, at: 3400, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 3400, dur: 100 }, { id: "piece", to: { o: 0 }, at: 3600, dur: 200 },
            { id: "boy.open", to: { sy: 0.3 }, at: 3700, dur: 2400, yoyo: true, times: 4 },
            { id: "boy.open", to: { o: 0 }, at: 6200, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 6200, dur: 100 }
          ], B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 6200, 500)) },
          { caption: "و در طول روز آب می‌نوشیم.", key: 3600, hold: 6000, do: [
            { id: "glass", to: { o: 1 }, dur: 400 }
          ].concat(B.hpose("boy", "h-boy", { upper: 20, armF: [12.6, -12.4] }, 500, 600), [
            { id: "glass", to: { o: 0 }, at: 1100, dur: 100 }, { id: "boy.glass", to: { o: 1 }, at: 1100, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.8, -26.6], head: -14 }, 1100, 700), [
            { id: "boy.shut", to: { o: 1 }, at: 1900, dur: 200 }, { id: "boy.eye", to: { o: 0 }, at: 1900, dur: 200 },
            { id: "boy.shut", to: { o: 0 }, at: 4200, dur: 200 }, { id: "boy.eye", to: { o: 1 }, at: 4200, dur: 200 }
          ]) }
        ] },
      { type: "choose", prompt: "چرا صبحانه می‌خوریم؟", say: "چرا صبحانه می‌خوریم؟", stack: true,
        options: ["💪 تا برای بازی و یادگیری نیرو داشته باشیم", "😴 تا دوباره بخوابیم"], answer: "💪 تا برای بازی و یادگیری نیرو داشته باشیم" },
      { type: "choose", prompt: "کدام میان‌وعده خوبی است؟", say: "کدام میان‌وعده خوبی است؟", stack: true,
        options: ["🍎 یک سیب", "🍬 یک مشت آب‌نبات", "🥤 نوشابه"], answer: "🍎 یک سیب" },
      { type: "doit", pic: "🧺", text: "با بزرگ‌ترت میان‌وعده فردا را آماده کن: یک میوه، چند گردو یا یک لقمه نان و پنیر. یک بطری آب هم کنارش بگذار." },
      { type: "forparents",
        tips: [
          "صبحانه را حتی ساده بخورید: نان و پنیر و گردو، تخم‌مرغ، یا نان و خرما با یک لیوان شیر. کودکی که صبحانه خورده بهتر یاد می‌گیرد و بازی می‌کند.",
          "میان‌وعده‌ها کوچک باشند: میوه، خیار، گردو و بادام (برای کودک خردسال خردشده)، نان و پنیر، ماست. خوراکی شیرین را به وقت غذا محدود کنید.",
          "بطری آب کودک همیشه همراهش باشد و در روز چند بار آب بنوشد، بیشتر در هوای گرم و بعد از بازی.",
          "آجیل درسته، ذرت بوداده و انگور درسته برای کودکان خردسال خطر خفگی دارد؛ آن‌ها را خرد کنید."
        ] }
    ]
  },
  {
    id: "health-sprout-10", subject: "health", level: "sprout", emoji: "🥣", title: "بازی سفره",
    steps: [
      // The game lesson of the food unit: foods into their groups, snacks and drinks for every day or sometimes, and
      // pairs of a food with its group.
      { type: "sort", prompt: "سفره را بچین: هر خوراکی را در گروه خودش بگذار",
        baskets: [{ label: "نان و برنج", pic: "🍚", value: "grain" }, { label: "میوه و سبزی", pic: "🥕", value: "fruit" }, { label: "تخم‌مرغ، حبوبات، گوشت", pic: "🥚", value: "protein" }, { label: "شیر و لبنیات", pic: "🧀", value: "dairy" }],
        items: [
          { pic: "🫓", say: "نان لواش", basket: "grain" }, { pic: "🍝", say: "ماکارونی", basket: "grain" }, { pic: "🍊", say: "پرتقال", basket: "fruit" }, { pic: "🍅", say: "گوجه", basket: "fruit" },
          { pic: "🍳", say: "نیمرو", basket: "protein" }, { pic: "🐟", say: "ماهی", basket: "protein" }, { pic: "🥛", say: "شیر", basket: "dairy" }, { pic: "🥣", say: "ماست", basket: "dairy" }
        ] },
      { type: "sort", prompt: "کدام را هر روز می‌خوریم و می‌نوشیم و کدام را فقط گاهی؟",
        baskets: [{ label: "هر روز", pic: "🌞", value: "often" }, { label: "گاهی، کم", pic: "🎈", value: "sometimes" }],
        items: [
          { pic: "💧", say: "آب", basket: "often" }, { pic: "🍎", say: "سیب", basket: "often" }, { pic: "🌰", say: "گردو", basket: "often" }, { pic: "🥛", say: "شیر", basket: "often" },
          { pic: "🥤", say: "نوشابه", basket: "sometimes" }, { pic: "🍭", say: "آب‌نبات", basket: "sometimes" }, { pic: "🍪", say: "بیسکویت شکلاتی", basket: "sometimes" }
        ] },
      { type: "pairs", prompt: "هر خوراکی را با گروهش جفت کن",
        pairs: [[{ pic: "🍚", say: "برنج" }, { label: "نان و برنج", say: "نان و برنج" }], [{ pic: "🍐", say: "گلابی" }, { label: "میوه و سبزی", say: "میوه و سبزی" }],
          [{ pic: "🥚", say: "تخم‌مرغ" }, { label: "تخم‌مرغ و حبوبات", say: "تخم‌مرغ و حبوبات" }], [{ pic: "🧀", say: "پنیر" }, { label: "شیر و لبنیات", say: "شیر و لبنیات" }]] },
      { type: "pairs", prompt: "هر وعده را با خوراکی‌اش جفت کن",
        pairs: [[{ pic: "🌅", say: "صبحانه" }, { pic: "🍳", say: "نیمرو و نان" }], [{ pic: "🍎", say: "میان‌وعده" }, { pic: "🌰", say: "گردو" }], [{ pic: "🌙", say: "شام" }, { pic: "🍲", say: "آش" }]] },
      { type: "forparents",
        tips: [
          "بازی سفره را سر سفره واقعی ادامه دهید: «امروز از کدام گروه‌ها خوردیم؟ کدام جا مانده؟»",
          "بیشتر روزها آب و شیر بنوشید. نوشابه، آب‌میوه صنعتی و نوشیدنی‌های شیرین را برای گاهی نگه دارید.",
          "خرید کردن و آماده کردن غذا را با کودک انجام دهید؛ کودکی که در آشپزی کمک کرده، غذای تازه را راحت‌تر امتحان می‌کند."
        ] }
    ]
  },
  {
    id: "health-sprout-11", subject: "health", level: "sprout", emoji: "🪢", title: "لی‌لی و طناب",
    steps: [
      /* In the yard: hopping on one foot (the other knee up), then on the other foot; galloping beside a horse picture
         (one foot leads, the other follows); jumping a rope seen from the front (the loop turns over the head and under
         the feet as she jumps), counted to five. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین و تو هم امتحان کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, horse: { art: "🐴", at: [-30, 80], s: 1.1, flip: true },
          girl: { art: "h-girl", at: [24, 86], s: 1.4 },
          front: { art: "h-girl-front", at: [96, 86], s: 1.5, o: 0 }, rope: { art: "h-rope", at: [96, 66], s: 1.5, o: 0 },
          counter: { art: "counter", at: [134, 30], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "لی‌لی: روی یک پا می‌پریم. بعد با پای دیگر.", key: 1600, hold: 8400, do: B.hpose("girl", "h-girl", { legB: -70, shinB: 100, armF: [8, -22], armB: [-6, -20] }, 0, 600).concat([
            { id: "girl", path: "M24 86Q30 76 36 86Q42 76 48 86Q54 76 60 86", at: 700, dur: 3000, ease: "linear" }
          ], B.hpose("girl", "h-girl", { legB: 0, shinB: 0, legF: -70, shinF: 100 }, 3900, 500), [
            { id: "girl", path: "M60 86Q66 76 72 86Q78 76 84 86Q90 76 96 86", at: 4500, dur: 3000, ease: "linear" }
          ]) },
          { caption: "یورتمه می‌رویم، مثل اسب: یک پا جلو می‌رود و پای دیگر دنبالش.", key: 2700, hold: 7000, do: B.hpose("girl", "h-girl", { legF: 0, shinF: 0, armF: [8, -22], armB: [8, -22] }, 0, 500).concat([
            { id: "girl", to: { flip: -1 }, at: 500, dur: 1 },
            { id: "horse", to: { flip: -1 }, dur: 1 }, { id: "horse", to: { x: 190 }, dur: 1 },
            { id: "horse", path: "M190 80Q170 74 150 80Q130 74 110 80Q90 74 70 80Q50 74 30 80Q10 74 -40 80", at: 600, dur: 5600, ease: "linear" },
            { id: "girl", path: "M96 86Q88 80 80 86Q72 80 64 86Q56 80 48 86Q40 80 32 86", at: 600, dur: 5000, ease: "linear" },
            { id: "girl.legF", to: { r: -40 }, at: 600, dur: 5000, yoyo: true, times: 10 }, { id: "girl.legB", to: { r: 25 }, at: 600, dur: 5000, yoyo: true, times: 10 }
          ]) },
          { caption: "طناب‌بازی: طناب را می‌چرخانیم و با دو پای جفت از رویش می‌پریم.", key: 2850, hold: 6400, do: [
            { id: "girl", to: { o: 0 }, dur: 400 }, { id: "front", to: { o: 1 }, dur: 400 }, { id: "rope", to: { o: 1 }, dur: 400 }
          ].concat(B.hpose("front", "h-girl-front", { armL: [-9, -13], armR: [9, -13] }, 0, 400), [
            { id: "rope", to: { sy: -1.5 }, at: 600, dur: 4800, yoyo: true, times: 8 },
            { id: "front", path: "M96 86Q96 74 96 86", at: 1200, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 2400, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 3600, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 4800, dur: 600 }
          ]) },
          { caption: "با هر پرش می‌شماریم: یک، دو، سه، چهار، پنج!", key: 6100, hold: 7600, do: [
            { id: "counter", to: { o: 1 }, dur: 300 },
            { id: "rope", to: { sy: -1.5 }, at: 300, dur: 6000, yoyo: true, times: 10 },
            { id: "front", path: "M96 86Q96 74 96 86", at: 900, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 2100, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 3300, dur: 600 },
            { id: "front", path: "M96 86Q96 74 96 86", at: 4500, dur: 600 }, { id: "front", path: "M96 86Q96 74 96 86", at: 5700, dur: 600 },
            { count: "counter", from: 1, to: 5, at: 900, dur: 5400 },
            { id: "front.mouth", to: { o: 0 }, at: 900, dur: 100 }, { id: "front.grin", to: { o: 1 }, at: 900, dur: 100 }
          ] }
        ] },
      { type: "doit", pic: "🦶", text: "لی‌لی کن: روی پای راست پنج بار بپر، بعد روی پای چپ پنج بار. اگر سخت بود، دستت را به دیوار بگیر." },
      { type: "doit", pic: "🪢", text: "اگر طناب داری، با بزرگ‌ترت طناب بزن و با هر پرش بشمار. اگر طناب نداری، یک خط روی زمین بکش و از رویش بپر.",
        list: ["یک، دو، سه، چهار، پنج!", "حالا تا ده!", "حالا یورتمه برو، مثل اسب."] },
      { type: "choose", prompt: "لی‌لی یعنی…", say: "لی‌لی یعنی چه؟", stack: true,
        options: ["🦶 پریدن روی یک پا", "🛌 دراز کشیدن", "🚶 راه رفتن آرام"], answer: "🦶 پریدن روی یک پا" },
      { type: "forparents",
        tips: [
          "لی‌لی، یورتمه و طناب‌بازی تعادل، قدرت پا و هماهنگی را می‌سازند. هر دو پا را تمرین کنید؛ بیشتر کودکان با یک پا راحت‌ترند.",
          "طناب‌بازی را روی زمین صاف و نرم، با کفش، و جایی که سر طناب به کسی نخورد انجام دهید. اول طناب را جلوی پا روی زمین بیندازید تا کودک از رویش بپرد.",
          "شعرهای طناب‌بازی و لی‌لی‌ای که خودتان در کودکی می‌خواندید، به کودک یاد بدهید.",
          "کودکان این سن هر روز دست‌کم یک ساعت بازی پرتحرک لازم دارند؛ این بازی‌ها بخشی از همان ساعت است."
        ] }
    ]
  },
  {
    id: "health-sprout-12", subject: "health", level: "sprout", emoji: "⚾", title: "پرتاب کن، بگیر",
    steps: [
      /* In the park with Dad: the girl stands side on with the ball up behind her shoulder, steps forward with the
         opposite foot and throws overarm; she catches Dad's throw with soft hands and pulls the ball in to her chest;
         a close-up card seen from above shows a kick with the inside of the foot, the ball rolling straight ahead.
         Drawings: js/art/rig-health.js and the ball from js/art/rig.js. */
      { type: "scene", prompt: "ببین و یاد بگیر", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, dad: { art: "h-dad", at: [128, 88], s: 1.15, flip: true },
          girl: { art: "h-girl", at: [40, 86], s: 1.4 }, ball: { art: "ball-side", at: [40.3, 74.8], s: 1.2 },
          panel: { art: "h-panel", o: 0 }, shoe: { art: "h-shoe-top", at: [80, 80], s: 1.2, r: 90, o: 0 }, ballT: { art: "h-ball-top", at: [80, 60], s: 1.4, o: 0 },
          line: { art: "h-sight", at: [80, 52], sx: 3.6, r: -90, o: 0 }
        },
        scenes: [
          { caption: "برای پرتاب از بالای شانه، پهلو می‌ایستیم و دستِ توپ را بالا و عقب می‌بریم.", key: 2600, hold: 5000, do: B.hpose("girl", "h-girl", { armF: [-8, -30], armB: [9, -24], head: 0 }, 300, 900).concat([
            { id: "ball", path: "M40.3 74.8L28.8 48.8", at: 300, dur: 900 },
            { id: "dad.head", to: { r: 6 }, at: 1600, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "پای مخالف را یک قدم جلو می‌گذاریم و توپ را محکم پرت می‌کنیم.", key: 1700, hold: 5400, do: [
            { id: "girl.legF", to: { r: -25 }, at: 200, dur: 500 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9, -32], armB: [-6, -18] }, 700, 400), [
            { id: "ball", path: "M28.8 48.8Q40 30 52.6 41.2Q86 18 114.2 58.3", at: 700, dur: 1800, ease: "linear" }
          ], B.hpose("dad", "h-dad", { armF: [12, -30], armB: [12, -29.4] }, 800, 600), [
            { id: "girl.legF", to: { r: 0 }, at: 2600, dur: 500 }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 2600, 600)) },
          { caption: "برای گرفتن، دست‌ها را جلو می‌آوریم، نرم می‌گیریم و توپ را به سینه می‌کشیم.", key: 4000, hold: 6000, do: B.hpose("girl", "h-girl", { armF: [8, -17], armB: [8, -17.4] }, 0, 500).concat(
            B.hpose("dad", "h-dad", { armF: [-6, -22], armB: [0.2, -21] }, 0, 600), [
            { id: "ball", path: "M114.2 58.3L134 66", dur: 600 }
          ], B.hpose("dad", "h-dad", { armF: [12, -30] }, 900, 500), [
            { id: "ball", path: "M134 66Q130 70 116 50Q86 26 51.2 67", at: 900, dur: 1800, ease: "linear" }
          ], B.hpose("girl", "h-girl", { armF: [4.6, -18], armB: [4.6, -18.4] }, 2800, 600), [
            { id: "ball", path: "M51.2 67L46.6 66", at: 2800, dur: 600 }
          ]) },
          { caption: "برای ضربه، با داخل پا به توپ می‌زنیم تا مستقیم برود.", key: 2500, hold: 5600, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "shoe", to: { o: 1 }, at: 300, dur: 400 }, { id: "ballT", to: { o: 1 }, at: 300, dur: 400 },
            { id: "shoe", path: "M80 80L80 86", at: 900, dur: 600 }, { id: "shoe", path: "M80 86L80 70", at: 1600, dur: 350, ease: "in" },
            { id: "line", to: { o: 1 }, at: 1900, dur: 300 },
            { id: "ballT", path: "M80 60L80 12", at: 1950, dur: 1400, ease: "out" }, { id: "ballT", to: { r: 540 }, at: 1950, dur: 1400, ease: "out" }
          ] }
        ] },
      { type: "doit", pic: "⚾", text: "با یک توپ نرم و بزرگ‌ترت تمرین کن:", list: ["پهلو بایست، توپ را بالای شانه ببر، یک قدم بردار و پرت کن.", "دست‌ها را جلو بیاور و توپ را نرم بگیر.", "با داخل پا به توپ بزن تا به بزرگ‌ترت برسد."] },
      { type: "choose", prompt: "وقتی توپ را پرت می‌کنیم، کدام پا را جلو می‌گذاریم؟", say: "وقتی توپ را پرت می‌کنیم، کدام پا را جلو می‌گذاریم؟", stack: true,
        options: ["🦶 پای مخالف دستی که پرت می‌کند", "🦶 همان پای سمت دست"], answer: "🦶 پای مخالف دستی که پرت می‌کند" },
      { type: "choose", prompt: "برای گرفتن توپ، دست‌ها چطور باشند؟", say: "برای گرفتن توپ، دست‌ها چطور باشند؟", stack: true,
        options: ["👐 جلو و نرم", "✊ مشت‌کرده پشت سر"], answer: "👐 جلو و نرم" },
      { type: "forparents",
        tips: [
          "پرتاب، گرفتن و ضربه مهارت‌های پایه همه ورزش‌هاست. با توپ نرم و از فاصله کم شروع کنید و کم‌کم دورتر بروید.",
          "برای پرتاب از بالای شانه: پهلو ایستادن، قدم با پای مخالف و چرخیدن بدن. برای گرفتن: چشم به توپ، دست‌ها جلو و نرم.",
          "برای ضربه، با داخل پا بزنید تا توپ مستقیم برود. با هر دو پا تمرین کنید.",
          "این بازی‌ها را بیرون یا در جای امن و خالی انجام دهید، دور از پنجره و خیابان."
        ] }
    ]
  },
  {
    id: "health-sprout-13", subject: "health", level: "sprout", emoji: "💓", title: "قلبم تند می‌زند",
    steps: [
      /* The girl warms up (walking on the spot, arm circles), feels her heart beating slowly, does star jumps, and then
         her heart beats fast (the heart on her chest and the big heart pulse faster), she breathes fast, her face is warm
         and a few drops of sweat fall; she calms down with a stretch and slow breaths and the heart slows; then a clock's
         long hand goes round once: an hour of lively play every day. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین وقتی حرکت می‌کنیم، بدن چه می‌کند", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, heart: { art: "h-heart", at: [130, 30], s: 1.6, o: 0 }, breath: { art: "h-breath", at: [130, 30], s: 2, o: 0 },
          clock: { art: "h-clock", at: [112, 30], s: 1.8, o: 0 }, ball: { art: "ball-side", at: [104, 88], s: 1.2, o: 0 },
          kid: { art: "h-girl-front", at: [70, 86], s: 1.6 }
        },
        scenes: [
          { caption: "پیش از بازی، بدن را گرم می‌کنیم: سر جایمان راه می‌رویم و دست‌ها را می‌چرخانیم.", key: 3000, hold: 6400, do: B.hpose("kid", "h-girl-front", { armL: [-11, -22], armR: [11, -22] }, 300, 600).concat([
            { id: "kid.armL", to: { r: "+70" }, at: 900, dur: 5000, yoyo: true, times: 8 }, { id: "kid.armR", to: { r: "-70" }, at: 900, dur: 5000, yoyo: true, times: 8 },
            { id: "kid.legL", to: { sy: 0.85 }, at: 900, dur: 5000, yoyo: true, times: 10 }, { id: "kid.legR", to: { sy: 0.85 }, at: 1150, dur: 5000, yoyo: true, times: 10 }
          ]) },
          { caption: "دستمان را روی سینه می‌گذاریم: قلبمان آرام می‌زند.", key: 2400, hold: 5400, do: B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [0.8, -19, -1] }, 0, 600).concat([
            { id: "kid.heart", to: { o: 1 }, at: 700, dur: 300 }, { id: "heart", to: { o: 1 }, at: 700, dur: 300 },
            { id: "kid.heart", to: { s: 1.3 }, at: 1000, dur: 4400, yoyo: true, times: 6 }, { id: "heart", to: { s: 1.9 }, at: 1000, dur: 4400, yoyo: true, times: 6 }
          ]) },
          { caption: "حالا می‌پریم و دست‌ها را بالا و پایین می‌بریم!", key: 1500, hold: 6000, do: [
            { id: "kid.heart", to: { o: 0 }, dur: 200 }, { id: "heart", to: { o: 0 }, dur: 300 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-9, -34], armR: [9, -34] }, 300, 300), [
            { id: "kid.armL", to: { r: "-110" }, at: 600, dur: 4800, yoyo: true, times: 8 }, { id: "kid.armR", to: { r: "+110" }, at: 600, dur: 4800, yoyo: true, times: 8 },
            { id: "kid.legL", to: { r: 14 }, at: 600, dur: 4800, yoyo: true, times: 8 }, { id: "kid.legR", to: { r: -14 }, at: 600, dur: 4800, yoyo: true, times: 8 },
            { id: "kid", to: { y: 80 }, at: 600, dur: 4800, yoyo: true, times: 8 }
          ]) },
          { caption: "قلب تند می‌زند، تند نفس می‌کشیم، گرممان می‌شود و کمی عرق می‌کنیم. این خوب است!", key: 3000, hold: 6600, do: B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [0.8, -19, -1] }, 0, 500).concat([
            { id: "kid", to: { y: 86 }, dur: 300 },
            { id: "kid.heart", to: { o: 1 }, at: 500, dur: 200 }, { id: "heart", to: { o: 1 }, at: 500, dur: 200 },
            { id: "kid.heart", to: { s: 1.4 }, at: 700, dur: 5200, yoyo: true, times: 22 }, { id: "heart", to: { s: 2.2 }, at: 700, dur: 5200, yoyo: true, times: 22 },
            { id: "kid.flush", to: { o: 1 }, at: 700, dur: 600 }, { id: "kid.mouth", to: { o: 0 }, at: 700, dur: 100 }, { id: "kid.open", to: { o: 1 }, at: 700, dur: 100 },
            { id: "kid.open", to: { sy: 0.5 }, at: 800, dur: 5000, yoyo: true, times: 14 },
            { emit: "drop", where: [70, 32], spread: [12, 2], rise: 8, n: 6, at: 1200, dur: 4000, life: 900 }
          ]) },
          { caption: "بعد آرام می‌شویم: کش می‌آییم و آرام نفس می‌کشیم. قلب آرام‌تر می‌زند.", key: 4000, hold: 8000, do: [
            { id: "kid.flush", to: { o: 0 }, at: 2000, dur: 2000 }, { id: "kid.open", to: { o: 0 }, dur: 100 }, { id: "kid.mouth", to: { o: 1 }, dur: 100 },
            { id: "kid.heart", to: { o: 0 }, dur: 300 }, { id: "heart", to: { x: 30 }, dur: 800 },
            { id: "breath", to: { o: 1 }, at: 600, dur: 400 }, { id: "breath", to: { s: 3 }, at: 1000, dur: 7000, yoyo: true, times: 4, ease: "inout" },
            { id: "heart", to: { s: 1.9 }, at: 1000, dur: 7000, yoyo: true, times: 8 },
            { id: "kid.pupils", to: { o: 0 }, at: 900, dur: 300 }, { id: "kid.shut", to: { o: 1 }, at: 900, dur: 300 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-9, -38], armR: [9, -38] }, 300, 1200)) },
          { caption: "هر روز دست‌کم یک ساعت بازی پرتحرک می‌کنیم: دویدن، پریدن، توپ‌بازی.", key: 4400, hold: 6600, do: [
            { id: "breath", to: { o: 0 }, dur: 400 }, { id: "heart", to: { o: 0 }, dur: 400 },
            { id: "kid.pupils", to: { o: 1 }, dur: 200 }, { id: "kid.shut", to: { o: 0 }, dur: 200 },
            { id: "clock", to: { o: 1 }, at: 400, dur: 400 }, { id: "clock.min", to: { r: 360 }, at: 800, dur: 5000, ease: "linear" }, { id: "clock.hour", to: { r: 30 }, at: 800, dur: 5000, ease: "linear" },
            { id: "ball", to: { o: 1 }, at: 500, dur: 300 }, { id: "ball", path: "M104 88Q90 50 76 88Q60 60 44 88", at: 1600, dur: 2000, ease: "linear" },
            { id: "kid", path: "M70 86Q70 70 70 86", at: 2000, dur: 700 }, { id: "kid", path: "M70 86Q70 70 70 86", at: 3000, dur: 700 }
          ].concat(B.hpose("kid", "h-girl-front", { armL: [-7, -12], armR: [7, -12] }, 0, 500), B.hpose("kid", "h-girl-front", { armL: [-9, -34], armR: [9, -34] }, 1900, 300)) }
        ] },
      { type: "doit", pic: "💓", text: "آزمایش قلب:", list: ["دستت را روی سینه‌ات بگذار. قلبت چطور می‌زند؟", "حالا بیست بار سر جایت بپر.", "دوباره دستت را روی سینه بگذار. قلبت تندتر می‌زند؟", "حالا سه نفس آرام بکش و دوباره حس کن."] },
      { type: "choose", prompt: "بعد از دویدن، قلبمان چطور می‌زند؟", say: "بعد از دویدن، قلبمان چطور می‌زند؟", stack: true,
        options: ["💓 تندتر", "😴 آرام‌تر"], answer: "💓 تندتر" },
      { type: "choose", prompt: "پیش از بازی پرتحرک چه کار می‌کنیم؟", say: "پیش از بازی پرتحرک چه کار می‌کنیم؟", stack: true,
        options: ["🔥 بدن را گرم می‌کنیم", "🛌 می‌خوابیم"], answer: "🔥 بدن را گرم می‌کنیم" },
      { type: "forparents",
        tips: [
          "سازمان جهانی بهداشت: کودکان پنج تا هفده سال هر روز به‌طور میانگین دست‌کم ۶۰ دقیقه فعالیت متوسط تا شدید لازم دارند (دویدن، پریدن، دوچرخه، بازی‌های کوچه)، و چند روز در هفته بازی‌هایی که استخوان و عضله را قوی می‌کند.",
          "تند زدن قلب، نفس‌نفس زدن، گرم شدن و کمی عرق کردن نشانه خوب کار کردن بدن است. اما اگر کودک درد قفسه سینه، سرگیجه یا تنگی نفس غیرعادی داشت، بازی را متوقف کنید و با پزشک مشورت کنید.",
          "بازی را با گرم کردن شروع و با آرام شدن (کشش و نفس آرام) تمام کنید. در هوای گرم آب کافی بنوشید.",
          "بازی‌های پرتحرک را در روز پخش کنید: صبح، بعد از ظهر، با خانواده. لازم نیست یک‌جا باشد."
        ] }
    ]
  },
  {
    id: "health-sprout-14", subject: "health", level: "sprout", emoji: "🪨", title: "بازی‌های کوچه",
    steps: [
      /* Street games in an alley: هفت‌سنگ (the boy rolls the ball and the stack of seven stones falls), گرگم به هوا
         (the "wolf" runs after the others), عمو زنجیرباف (children holding hands in a chain), inviting a child who is on
         their own to join, and shaking hands at the end, whoever won. Drawings: js/art/rig-health.js, the alley and
         the seven stones from js/art/rig-world.js; the other children are full-body walkers from js/scene.js. */
      { type: "scene", prompt: "به بازی بچه‌ها نگاه کن", bg: "#d99a6c",
        parts: {
          alley: { art: "w-alley" }, s1: { art: "w-stone1", at: [118, 88.0], s: 1.3 }, s2: { art: "w-stone2", at: [118, 83.6], s: 1.3 }, s3: { art: "w-stone3", at: [118, 79.2], s: 1.3 }, s4: { art: "w-stone4", at: [118, 74.8], s: 1.3 }, s5: { art: "w-stone5", at: [118, 70.4], s: 1.3 }, s6: { art: "w-stone6", at: [118, 66.0], s: 1.3 }, s7: { art: "w-stone7", at: [118, 61.6], s: 1.3 },
          ball: { art: "ball-side", at: [46, 88], s: 1.1, o: 0 },
          w1: { art: "👧", at: [70, 88], s: 1.75 }, w2: { art: "🧒", at: [86, 88], s: 1.75 }, w3: { art: "👦", at: [-20, 88], s: 1.75, look: { top: "#5a9a45" } },
          girl: { art: "h-girl", at: [140, 86], s: 1.4, flip: true }, boy: { art: "h-boy", at: [36, 86], s: 1.4 }
        },
        scenes: [
          { caption: "هفت‌سنگ: سنگ‌ها را روی هم می‌چینیم و با توپ آن‌ها را می‌اندازیم.", key: 1900, hold: 5600, do: [
            { id: "ball", to: { o: 1 }, dur: 300 }
          ].concat(B.hpose("boy", "h-boy", { upper: 30, armF: [12, -6] }, 300, 600), [
            { id: "ball", to: { x: 114 }, at: 1000, dur: 1200, ease: "linear" }, { id: "ball", to: { r: 720 }, at: 1000, dur: 1200, ease: "linear" },
            { id: "s1", path: "M118 88.0Q107 78 96 88", at: 2200, dur: 900 },
            { id: "s2", path: "M118 83.6Q111 73 104 90", at: 2200, dur: 900 },
            { id: "s3", path: "M118 79.2Q122 69 126 90", at: 2200, dur: 900 },
            { id: "s4", path: "M118 74.8Q127 64 136 88", at: 2200, dur: 900 },
            { id: "s5", path: "M118 70.4Q114 60 110 92", at: 2200, dur: 900 },
            { id: "s6", path: "M118 66.0Q131 56 144 90", at: 2200, dur: 900 },
            { id: "s7", path: "M118 61.6Q124 51 130 86", at: 2200, dur: 900 },
            { id: "w1", to: { r: -6 }, at: 2400, dur: 1200, yoyo: true, times: 4 }, { id: "w2", path: "M86 88Q86 78 86 88", at: 2500, dur: 600 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [3, -33.5], armB: [1, -33.5] }, 2600, 500)) },
          { caption: "گرگم به هوا: یک نفر «گرگ» می‌شود و دنبال بقیه می‌دود.", key: 2800, hold: 6000, do: [
            { id: "ball", to: { o: 0 }, dur: 300 }
          ].concat(B.hpose("boy", "h-boy", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 400), [
            { id: "w1", walk: [150, 88], at: 400, dur: 3000, steps: 8 }, { id: "w2", walk: [130, 88], at: 400, dur: 3000, steps: 8 },
            { id: "boy", to: { x: 110 }, at: 900, dur: 3000, ease: "linear" }
          ], B.hwalk("boy", 900, 3000, 6, true), [
            { id: "girl", to: { flip: 1 }, at: 400, dur: 1 }, { id: "girl", to: { x: 170 }, at: 400, dur: 2200, ease: "linear" }
          ], B.hwalk("girl", 400, 2200, 5, true)) },
          { caption: "عمو زنجیرباف: دست همدیگر را می‌گیریم و زنجیر درست می‌کنیم.", key: 3200, hold: 6000, do: [
            { id: "w1", to: { x: 52, flip: -1 }, dur: 1 }, { id: "w2", to: { x: 70, flip: -1 }, dur: 1 }, { id: "girl", to: { x: 106, flip: -1 }, dur: 1 }, { id: "boy", to: { x: 88, flip: -1 }, dur: 1 }
          ].concat(B.hpose("boy", "h-boy", { armF: [7, -15], armB: [-7, -15] }, 0, 1), B.hpose("girl", "h-girl", { armF: [7, -15], armB: [-7, -15] }, 0, 1), [
            { id: "w1", walk: [32, 88], at: 300, dur: 4000 }, { id: "w2", walk: [50, 88], at: 300, dur: 4000 },
            { id: "boy", to: { x: 68 }, at: 300, dur: 4000, ease: "linear" }, { id: "girl", to: { x: 86 }, at: 300, dur: 4000, ease: "linear" }
          ], B.hwalk("boy", 300, 4000, 6), B.hwalk("girl", 300, 4000, 6), B.hpose("boy", "h-boy", { armF: [7, -15], armB: [-7, -15] }, 4400, 300), B.hpose("girl", "h-girl", { armF: [7, -15], armB: [-7, -15] }, 4400, 300)) },
          { caption: "نوبت می‌گیریم و همه را به بازی راه می‌دهیم. بیا، تو هم بازی کن!", key: 4600, hold: 6400, do: [
            { id: "w3", walk: [10, 88], dur: 1200 }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 400), [
            { id: "girl", to: { flip: 1 }, at: 400, dur: 1 }, { id: "girl", to: { flip: -1 }, at: 1400, dur: 1 }
          ], B.hpose("girl", "h-girl", { armF: [7, -30] }, 1600, 400), [
            { id: "girl.foreF", to: { r: "+30" }, at: 2000, dur: 1600, yoyo: true, times: 4 },
            { id: "w3", walk: [30, 88], at: 3200, dur: 1400 }, { id: "w1", walk: [44, 88], at: 3200, dur: 1000 }
          ]) },
          { caption: "چه ببریم، چه ببازیم، آخر بازی با مهربانی دست می‌دهیم.", key: 3000, hold: 5000, do: B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 0, 300).concat([
            { id: "boy", to: { flip: 1, x: 70 }, dur: 1 }, { id: "girl", to: { flip: -1, x: 90 }, dur: 1 }
          ], B.hpose("boy", "h-boy", { armF: [9, -16], armB: [0.2, -12] }, 600, 600), B.hpose("girl", "h-girl", { armF: [9, -16], armB: [0.2, -12] }, 600, 600), [
            { id: "boy.foreF", to: { r: "+10" }, at: 1300, dur: 1600, yoyo: true, times: 4 }, { id: "girl.foreF", to: { r: "+10" }, at: 1300, dur: 1600, yoyo: true, times: 4 },
            { id: "boy.mouth", to: { o: 0 }, at: 1300, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1300, dur: 100 }
          ]) }
        ] },
      { type: "talk", scene: "🧒👧👦", caption: "کدام بازی را بیشتر دوست داری؟ اگر کسی تنها ایستاده بود و بازی را نگاه می‌کرد، به او چه می‌گفتی؟ وقتی می‌بازی، چه کار می‌کنی؟" },
      { type: "doit", pic: "🪨", text: "با خانواده یا دوستانت یکی از بازی‌های کوچه را بازی کنید: هفت‌سنگ، لی‌لی، گرگم به هوا یا عمو زنجیرباف. نوبت را رعایت کنید!" },
      { type: "doit", pic: "🤝", text: "آخر بازی، با همه دست بده و بگو: «بازی خوبی بود!»" },
      { type: "forparents",
        tips: [
          "بازی‌های کوچه و حیاط (هفت‌سنگ، لی‌لی، گرگم به هوا، عمو زنجیرباف، قایم‌باشک) هم پرتحرک‌اند و هم نوبت گرفتن، قانون نگه داشتن و کنار آمدن با باخت را یاد می‌دهند.",
          "بازی‌هایی را که خودتان در کودکی در شهر و روستایتان بازی می‌کردید، به کودک یاد بدهید.",
          "کمک کنید همه بازی کنند: کودکی را که تنهاست دعوت کنید، و برای کوچک‌ترها قانون را ساده کنید.",
          "باختن را عادی کنید: «باختیم، دفعه بعد دوباره امتحان می‌کنیم.» برنده را هم به مهربانی تشویق کنید."
        ] }
    ]
  },
  {
    id: "health-sprout-15", subject: "health", level: "sprout", emoji: "🌅", title: "نرمش صبح",
    steps: [
      /* A 7-minute morning routine with the move step (js/steps/health.js): a person shows each move and it is counted
         aloud at a calm pace, with an easier and a harder version and a slow breath between moves. Warm-up first, then
         hops, skips, frog jumps and star jumps, then stretches and slow breaths. Done at home in a small space. */
      { type: "move", prompt: "اول بدن را گرم می‌کنیم",
        moves: [
          { name: "رژه سر جا", part: "warm", art: "h-girl", say: "زانوها را بالا بیاور و دست‌ها را تاب بده.", times: 16, pace: 1300,
            a: { legF: -60, shinF: 70, armB: -35 }, b: { legB: -60, shinB: 70, armF: -35 },
            easier: { say: "آرام راه برو و زانوها را کمی بالا بیاور.", a: { legF: -30, shinF: 40 }, b: { legB: -30, shinB: 40 } } },
          { name: "چرخاندن دست‌ها", part: "warm", say: "دست‌ها را باز کن و بالا و پایین ببر، آرام و بزرگ.", times: 8,
            a: { armL: [-11, -22], armR: [11, -22] }, b: { armL: [-9, -36], armR: [9, -36] } }
        ] },
      { type: "move", prompt: "حالا حرکت‌های پرانرژی",
        moves: [
          { name: "لی‌لی", art: "h-girl", say: "روی یک پا بپر. بعد روی پای دیگر.", times: 10, pace: 1200,
            a: { legB: -70, shinB: 100, armF: [8, -22] }, b: { legB: -70, shinB: 100, armF: [8, -22] }, hop: 4,
            easier: { say: "روی یک پا بایست و تا پنج بشمار. بعد پای دیگر.", times: 2, pace: 5000, hop: 0 } },
          { name: "یورتمه", art: "h-girl", say: "یک پا جلو، پای دیگر دنبالش، با یک پرش کوچک.", times: 12, pace: 1100,
            a: { legF: -50, shinF: 60, armB: -30 }, b: { legB: -50, shinB: 60, armF: -30 }, hop: 3 },
          { name: "پرش قورباغه", art: "h-girl", say: "پایین بنشین، دست‌ها روی زمین، بعد بلند بپر.", times: 6, pace: 2200, sink: 10,
            a: { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] },
            b: { upper: 0, head: 0, armF: [3, -33.5], armB: [1, -33.5] }, hop: 8,
            easier: { say: "پایین بنشین و بلند شو، بدون پریدن.", hop: 0 }, harder: { say: "بلندتر بپر و نرم فرود بیا.", times: 10 } },
          { name: "پرش ستاره", say: "با هر پرش، دست‌ها بالا و پاها باز؛ بعد دوباره جمع.", times: 10, pace: 1400,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -36], armR: [9, -36], legL: 14, legR: -14 }, hop: 4,
            easier: { say: "بدون پریدن: یک پا به پهلو و دست‌ها بالا، بعد برگرد.", hop: 0, b: { armL: [-9, -36], armR: [9, -36], legL: 14 } },
            harder: { say: "تندتر و بیشتر!", times: 20, pace: 1000 } }
        ] },
      { type: "move", prompt: "آخر کار، آرام می‌شویم",
        moves: [
          { name: "کش و قوس", part: "calm", say: "دست‌ها را بالا ببر، قد بکش و آرام پایین بیاور.", times: 4, pace: 3600,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -38], armR: [9, -38] } },
          { name: "نفس آرام", part: "calm", say: "با دم دست‌ها را باز کن، با بازدم آرام پایین بیاور.", times: 3, pace: 6000,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-12, -26], armR: [12, -26] } }
        ] },
      { type: "doit", pic: "📅", text: "این نرمش را هر روز صبح انجام بده. با بزرگ‌ترت یک جدول بکش و هر روز که نرمش کردی، یک ستاره بکش." },
      { type: "forparents",
        tips: [
          "این نرمش هفت دقیقه‌ای را صبح‌ها با هم انجام دهید؛ با گرم کردن شروع و با آرام شدن تمام کنید. حرکت‌ها برای یک اتاق کوچک و بدون وسیله است.",
          "دکمه‌های «آسان‌تر» و «سخت‌تر» را بسته به حال و توان کودک انتخاب کنید. هدف لذت بردن از حرکت است، نه رقابت.",
          "جای خالی آماده کنید: دور از گوشه میز و شیشه، روی فرش، با جوراب درآورده یا کفش مناسب.",
          "این ده دقیقه بخشی از یک ساعت بازی پرتحرک روزانه کودک است، نه همه آن."
        ] }
    ]
  },
  {
    id: "health-sprout-26", subject: "health", level: "sprout", emoji: "⭐", title: "شکل‌ها و تعادل",
    steps: [
      /* Body shapes and balances on a rug, home-safe (no handstands or flips): star and pencil (from the front), tuck
         and bridge (from the side), balancing on one foot and then on one knee and one hand, a log roll seen from above
         (face up, face down, face up), and a jump with a soft landing. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین و شکل‌ها را بساز", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, rug: { art: "rug-side", at: [80, 90], s: 1.4 },
          kid: { art: "h-girl-front", at: [80, 86], s: 1.6 }, side: { art: "h-girl", at: [80, 86], s: 1.5, o: 0 },
          panel: { art: "h-panel", o: 0 }, mat: { art: "h-oval", at: [80, 46], sx: 6, sy: 4, o: 0 }, roll: { art: "h-girl-top", at: [80, 30], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "شکل ستاره: دست‌ها و پاها را باز می‌کنیم.", key: 1600, hold: 4000, do: B.hpose("kid", "h-girl-front", { armL: [-13, -32], armR: [13, -32], legL: 18, legR: -18 }, 300, 800) },
          { caption: "شکل مداد: صاف و کشیده، دست‌ها بالای سر.", key: 1600, hold: 4000, do: B.hpose("kid", "h-girl-front", { armL: [-6.5, -30.8], armR: [6.5, -30.8], legL: 0, legR: 0 }, 300, 800).concat([
            { id: "kid", to: { sy: 1.04 }, at: 300, dur: 800 }]) },
          { caption: "شکل توپ: جمع می‌شویم و زانوها را بغل می‌کنیم.", key: 1800, hold: 4400, do: [
            { id: "kid", to: { o: 0, sy: 1 }, dur: 400 }, { id: "side", to: { o: 1 }, dur: 400 },
            { id: "side", to: { y: 101 }, at: 400, dur: 900 }
          ].concat(B.hpose("side", "h-girl", { upper: 50, head: 20, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [8.4, -14], armB: [7.6, -14] }, 400, 900)) },
          { caption: "شکل پل: شکم بالا، دست‌ها و پاها روی زمین.", key: 1800, hold: 4400, do: [
            { id: "side", to: { y: 98.1 }, at: 200, dur: 900 }
          ].concat(B.hpose("side", "h-girl", { upper: -70, head: 40, legF: -110, shinF: 110, legB: -110, shinB: 110, armF: [-9.5, -9.25], armB: [-8.5, -9.25] }, 200, 900)) },
          { caption: "تعادل: روی یک پا می‌ایستیم، دست‌ها باز.", key: 1800, hold: 4400, do: [
            { id: "side", to: { y: 86 }, at: 200, dur: 800 }
          ].concat(B.hpose("side", "h-girl", { upper: 0, head: 0, legF: 0, shinF: 0, legB: -80, shinB: 90, armF: [9, -24], armB: [-9, -24] }, 200, 800), [
            { id: "side", to: { r: 2 }, at: 1200, dur: 3000, yoyo: true, times: 4 }
          ]) },
          { caption: "حالا روی یک زانو و یک دست: پای دیگر و دست دیگر را دراز می‌کنیم.", key: 2000, hold: 5000, do: [
            { id: "side", to: { y: 95, r: 0 }, at: 200, dur: 900 }
          ].concat(B.hpose("side", "h-girl", { upper: 90, head: -60, legF: 0, shinF: 90, legB: 90, shinB: 0, armF: [11, -4], armB: [16, -24] }, 200, 900)) },
          { caption: "غلت چوبی: روی فرش، صاف مثل مداد، آرام به پهلو غلت می‌خوریم.", key: 3000, hold: 6000, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "mat", to: { o: 1 }, at: 200, dur: 400 }, { id: "roll", to: { o: 1 }, at: 400, dur: 400 },
            { id: "roll", to: { y: 62 }, at: 900, dur: 4400, ease: "linear" },
            { id: "roll.up", to: { o: 0 }, at: 1300, dur: 200 }, { id: "roll.down", to: { o: 1 }, at: 1300, dur: 200 },
            { id: "roll.up", to: { o: 1 }, at: 2400, dur: 200 }, { id: "roll.down", to: { o: 0 }, at: 2400, dur: 200 },
            { id: "roll.up", to: { o: 0 }, at: 3500, dur: 200 }, { id: "roll.down", to: { o: 1 }, at: 3500, dur: 200 },
            { id: "roll.up", to: { o: 1 }, at: 4600, dur: 200 }, { id: "roll.down", to: { o: 0 }, at: 4600, dur: 200 }
          ] },
          { caption: "می‌پریم و نرم فرود می‌آییم: زانوها خم.", key: 2900, hold: 5000, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "mat", to: { o: 0 }, dur: 400 }, { id: "roll", to: { o: 0 }, dur: 400 },
            { id: "side", to: { y: 86 }, at: 300, dur: 500 }
          ].concat(B.hpose("side", "h-girl", { upper: 0, head: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [3, -33.5], armB: [1, -33.5] }, 300, 500), [
            { id: "side", path: "M80 86Q80 56 80 91", at: 1000, dur: 1300 }
          ], B.hpose("side", "h-girl", { upper: 20, legF: -50, shinF: 90, legB: -50, shinB: 90, armF: [8, -16], armB: [7, -16] }, 2000, 400)) }
        ] },
      { type: "pairs", prompt: "هر شکل را با اسمش جفت کن",
        pairs: [[{ pic: "⭐", say: "ستاره" }, { label: "دست و پا باز", say: "دست و پا باز" }], [{ pic: "✏️", say: "مداد" }, { label: "صاف و کشیده", say: "صاف و کشیده" }],
          [{ pic: "⚽", say: "توپ" }, { label: "جمع و گرد", say: "جمع و گرد" }], [{ pic: "🌉", say: "پل" }, { label: "شکم بالا", say: "شکم بالا" }]] },
      { type: "doit", pic: "⭐", text: "روی فرش این شکل‌ها را بساز و هر کدام را تا سه نگه دار:", list: ["ستاره", "مداد", "توپ", "پل", "روی یک پا، بعد پای دیگر"] },
      { type: "doit", pic: "🪵", text: "غلت چوبی: روی فرش یا تشک دراز بکش، صاف مثل مداد، و آرام به پهلو غلت بخور. بزرگ‌ترت مراقب است که جا باز باشد." },
      { type: "forparents",
        tips: [
          "شکل‌ها و تعادل پایه ژیمناستیک و همه ورزش‌هاست. فقط حرکت‌های امن خانگی: بدون بالانس روی دست، پشتک یا معلق.",
          "روی فرش یا تشک نرم، دور از گوشه میز، تمرین کنید. کودک هر شکل را تا سه یا پنج نگه دارد و بعد آرام رها کند.",
          "غلت چوبی را روی سطح نرم و صاف انجام دهید، با دست‌ها بالای سر و بدن صاف. سرگیجه کم طبیعی است؛ چند غلت کافی است.",
          "با هر دو پا و هر دو طرف تمرین کنید و از کودک بخواهید یک شکل تازه اختراع کند."
        ] }
    ]
  },
  {
    id: "health-sprout-27", subject: "health", level: "sprout", emoji: "🎵", title: "حرکت با موسیقی",
    steps: [
      /* Making a dance: four move cards (clap, jump, turn, star) come up, are put in order in four numbered places,
         then the girl does them one after another to the music (a ring moves along the cards as she does each one,
         notes rise); then her father joins in. Drawings: js/art/rig-health.js and the note from js/art/rig-science.js. */
      { type: "scene", prompt: "ببین چطور یک رقص کوچک می‌سازیم", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" },
          c1: { art: "👏", at: [116, 26], s: 0.8, o: 0 }, c2: { art: "🦘", at: [44, 26], s: 0.8, o: 0 }, c3: { art: "🔄", at: [92, 26], s: 0.8, o: 0 }, c4: { art: "⭐", at: [68, 26], s: 0.8, o: 0 },
          n1: { art: "counter", at: [134, 34], s: 0.6, o: 0 }, n2: { art: "counter", at: [110, 34], s: 0.6, o: 0 }, n3: { art: "counter", at: [86, 34], s: 0.6, o: 0 }, n4: { art: "counter", at: [62, 34], s: 0.6, o: 0 },
          ring: { art: "h-ring", at: [134, 17], s: 2.2, o: 0 },
          m1: { art: "sci-note", at: [30, 60], s: 1.2, o: 0 }, m2: { art: "sci-note", at: [30, 60], s: 1.2, o: 0 }, m3: { art: "sci-note", at: [30, 60], s: 1.2, o: 0 },
          dad: { art: "h-dad", at: [-20, 88], s: 1.15 },
          kid: { art: "h-girl-front", at: [80, 88], s: 1.4 }
        },
        scenes: [
          { caption: "چهار حرکت انتخاب می‌کنیم: دست زدن، پریدن، چرخیدن و شکل ستاره.", key: 4600, hold: 6400, do: [
            { id: "c1", to: { o: 1 }, at: 400, dur: 400 }, { id: "c2", to: { o: 1 }, at: 1400, dur: 400 }, { id: "c3", to: { o: 1 }, at: 2400, dur: 400 }, { id: "c4", to: { o: 1 }, at: 3400, dur: 400 }
          ] },
          { caption: "آن‌ها را به ترتیب می‌چینیم: یک، دو، سه، چهار.", key: 4400, hold: 6000, do: [
            { id: "n1", to: { o: 1 }, dur: 300 }, { count: "n1", from: 1, to: 1, dur: 1 }, { id: "n2", to: { o: 1 }, dur: 300 }, { count: "n2", from: 2, to: 2, dur: 1 },
            { id: "n3", to: { o: 1 }, dur: 300 }, { count: "n3", from: 3, to: 3, dur: 1 }, { id: "n4", to: { o: 1 }, dur: 300 }, { count: "n4", from: 4, to: 4, dur: 1 },
            { id: "c1", path: "M116 26L134 26", at: 600, dur: 700 }, { id: "c2", path: "M44 26Q76 10 110 26", at: 1500, dur: 900 },
            { id: "c3", path: "M92 26L86 26", at: 2600, dur: 600 }, { id: "c4", path: "M68 26L62 26", at: 3400, dur: 600 }
          ] },
          { caption: "با آهنگ، حرکت‌ها را پشت سر هم انجام می‌دهیم.", key: 2000, hold: 9000, do: [
            { id: "ring", to: { o: 1 }, dur: 300 }
          ].concat(B.hnotes(["m1", "m2", "m3"], 30, 60, 200, 900, 9),
            B.hpose("kid", "h-girl-front", { armL: [-0.9, -16.4], armR: [0.9, -16.4] }, 300, 400), [
            { id: "kid.foreL", to: { r: 30 }, at: 700, dur: 1200, yoyo: true, times: 4 }, { id: "kid.foreR", to: { r: -30 }, at: 700, dur: 1200, yoyo: true, times: 4 },
            { id: "ring", path: "M134 17L110 17", at: 2000, dur: 300 }
          ], B.hpose("kid", "h-girl-front", { armL: [-9, -34], armR: [9, -34] }, 2000, 300), [
            { id: "kid", path: "M80 88Q80 70 80 88", at: 2300, dur: 700 }, { id: "kid", path: "M80 88Q80 70 80 88", at: 3100, dur: 700 },
            { id: "ring", path: "M110 17L86 17", at: 4000, dur: 300 },
            { id: "kid", to: { sx: -1 }, at: 4300, dur: 700 }, { id: "kid", to: { sx: 1 }, at: 5000, dur: 700 },
            { id: "ring", path: "M86 17L62 17", at: 6000, dur: 300 }
          ], B.hpose("kid", "h-girl-front", { armL: [-13, -32], armR: [13, -32], legL: 18, legR: -18 }, 6300, 600)) },
          { caption: "دوباره و دوباره! بابا هم می‌آید و با هم می‌رقصیم.", key: 3600, hold: 6000, do: [
            { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "dad", walk: [36, 88], dur: 2000 }
          ].concat(B.hnotes(["m1", "m2", "m3"], 30, 60, 300, 900, 6), B.hpose("dad", "h-dad", { armF: [6, -58], armB: [4, -58] }, 2200, 500), [
            { id: "dad", path: "M36 88Q36 76 36 88", at: 2800, dur: 700 }, { id: "dad", path: "M36 88Q36 76 36 88", at: 3700, dur: 700 },
            { id: "kid", path: "M80 88Q80 70 80 88", at: 2800, dur: 700 }, { id: "kid", path: "M80 88Q80 70 80 88", at: 3700, dur: 700 }
          ]) }
        ] },
      { type: "order", prompt: "این رقص را به ترتیب بچین: دست زدن، پریدن، چرخیدن، ستاره", numbered: true,
        items: [{ pic: "👏", label: "دست زدن" }, { pic: "🦘", label: "پریدن" }, { pic: "🔄", label: "چرخیدن" }, { pic: "⭐", label: "ستاره" }] },
      { type: "order", prompt: "یک رقص دیگر: پا کوبیدن، تاب خوردن، پریدن", numbered: true,
        items: [{ pic: "🦶", label: "پا کوبیدن" }, { pic: "🌬️", label: "تاب خوردن" }, { pic: "🦘", label: "پریدن" }] },
      { type: "doit", pic: "🎵", text: "رقص خودت را بساز: چهار حرکت انتخاب کن، به ترتیب بچین و با یک آهنگ چند بار تکرار کن. بعد به خانواده‌ات یاد بده تا با هم انجام دهید." },
      { type: "forparents",
        tips: [
          "ساختن و تکرار یک رشته حرکت به حافظه، تمرکز و هماهنگی کمک می‌کند. بگذارید کودک حرکت‌ها را خودش انتخاب کند و اسم بگذارد.",
          "می‌توانید حرکت‌ها را روی کاغذ نقاشی کنید و به ترتیب روی زمین بچینید، مثل یک «نقشه رقص».",
          "آهنگ‌های شاد خانوادگی یا محلی بگذارید و با هم حرکت کنید. هر چند وقت یک حرکت را عوض کنید.",
          "رقص و حرکت با موسیقی هم بخشی از یک ساعت بازی پرتحرک روزانه است."
        ] }
    ]
  },
  {
    id: "health-sprout-16", subject: "health", level: "sprout", emoji: "⏰", title: "ساعت خواب",
    steps: [
      /* The same bedtime every night: the clock shows the agreed time; the television goes off an hour before bed and
         the girl reads; teeth and toilet are done (the order is in the game); lights low, she sleeps; the clock's hands
         go round the night while the window turns from night to morning; she wakes at the same time, fresh.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#dfe8f6",
        parts: {
          room: { art: "h-bedroom" }, win: { art: "h-window", at: [132, 24] }, clock: { art: "h-clock", at: [74, 20], s: 1.4 },
          tv: { art: "h-tv", at: [28, 88], s: 1.1 }, bed: { art: "h-bed", at: [112, 88], s: 1.3 }, sleeper: { art: "h-girl2", at: [128, 68.4], s: 1.3, r: -90, o: 0 },
          blanket: { art: "h-blanket", at: [112, 88], s: 1.3, o: 0 },
          kid: { art: "h-girl2", at: [56, 88], s: 1.4 }, dark: { art: "h-dark", o: 0 }
        },
        scenes: [
          { caption: "یک ساعت پیش از خواب، صفحه‌ها را خاموش می‌کنیم و کتاب می‌خوانیم یا آرام بازی می‌کنیم.", key: 4400, hold: 7000, do: [
            { id: "win.night", to: { o: 1 }, dur: 1 }, { id: "win.sun", to: { o: 0 }, dur: 1 }, { id: "win.moon", to: { o: 1 }, dur: 1 }, { id: "win.stars", to: { o: 1 }, dur: 1 },
            { id: "clock.hour", to: { r: 240 }, dur: 1 },
            { id: "tv.off", to: { o: 1 }, at: 800, dur: 400 },
            { id: "kid.book", to: { o: 1 }, at: 1800, dur: 300 }
          ].concat(B.hpose("kid", "h-girl2", "book", 1500, 600), [
            { id: "kid.head", to: { r: 8 }, at: 2400, dur: 3000, yoyo: true, times: 2 }
          ]) },
          { caption: "هر شب سر همان ساعت به رختخواب می‌رویم.", key: 5400, hold: 6000, do: [
            { id: "clock.hour", to: { r: 270 }, dur: 1600 }, { id: "clock.min", to: { r: 360 }, dur: 1600 },
            { id: "kid.book", to: { o: 0 }, at: 1700, dur: 300 }, { id: "dark", to: { o: 0.5 }, at: 1700, dur: 1200 },
            { id: "kid", walk: [96, 88], at: 1900, dur: 1600 },
            { id: "kid", to: { o: 0 }, at: 3500, dur: 400 }, { id: "sleeper", to: { o: 1 }, at: 3500, dur: 400 }, { id: "blanket", to: { o: 1 }, at: 3500, dur: 400 }
          ].concat(B.hpose("kid", "h-girl2", { armF: [0.2, -12], armB: [0.2, -12] }, 1700, 300)) },
          { caption: "چراغ خاموش است و می‌خوابیم. خواب شب طولانی است: حدود ده ساعت یا بیشتر.", key: 4600, hold: 7400, do: [
            { id: "dark", to: { o: 1 }, dur: 1000 },
            { id: "sleeper.eye", to: { o: 0 }, at: 300, dur: 300 }, { id: "sleeper.shut", to: { o: 1 }, at: 300, dur: 300 },
            { id: "blanket", to: { sy: 1.06 }, at: 800, dur: 6000, yoyo: true, times: 6, ease: "soft" },
            { id: "clock.min", to: { r: 3960 }, at: 800, dur: 6000, ease: "linear" }, { id: "clock.hour", to: { r: 570 }, at: 800, dur: 6000, ease: "linear" }
          ] },
          { caption: "صبح سر همان ساعت هر روز، سرحال بیدار می‌شویم!", key: 3800, hold: 5600, do: [
            { id: "dark", to: { o: 0 }, dur: 1200 },
            { id: "win.night", to: { o: 0 }, dur: 1200 }, { id: "win.moon", to: { o: 0 }, dur: 800 }, { id: "win.stars", to: { o: 0 }, dur: 800 },
            { id: "win.sun", to: { o: 1, y: 6 }, dur: 1 }, { id: "win.sun", to: { y: 0 }, at: 200, dur: 1200 },
            { id: "sleeper.eye", to: { o: 1 }, at: 1500, dur: 200 }, { id: "sleeper.shut", to: { o: 0 }, at: 1500, dur: 200 },
            { id: "sleeper.upper", to: { r: 88 }, at: 1900, dur: 800 },
            { id: "sleeper.armF", to: { r: 175 }, at: 2800, dur: 600 }, { id: "sleeper.armB", to: { r: 165 }, at: 2800, dur: 600 },
            { emit: "spark", where: [112, 34], spread: [26, 14], n: 8, at: 3200, dur: 800, life: 1300 }
          ] }
        ] },
      { type: "order", prompt: "کارهای پیش از خواب را به ترتیب بچین", numbered: true,
        items: [{ pic: "📺", label: "خاموش کردن صفحه‌ها" }, { pic: "🪥", label: "مسواک" }, { pic: "🧻", label: "دستشویی" }, { pic: "📖", label: "قصه" }, { pic: "😴", label: "خواب" }] },
      { type: "choose", prompt: "کدام برای خواب خوب بهتر است؟", say: "کدام برای خواب خوب بهتر است؟", stack: true,
        options: ["⏰ هر شب سر یک ساعت خوابیدن", "🎲 هر شب یک ساعت تازه"], answer: "⏰ هر شب سر یک ساعت خوابیدن" },
      { type: "choose", prompt: "یک ساعت پیش از خواب چه کار کنیم؟", say: "یک ساعت پیش از خواب چه کار کنیم؟", stack: true,
        options: ["📖 کتاب بخوانیم یا آرام بازی کنیم", "📱 بازی با گوشی"], answer: "📖 کتاب بخوانیم یا آرام بازی کنیم" },
      { type: "forparents",
        tips: [
          "کودکان سه تا پنج ساله ۱۰ تا ۱۳ ساعت و کودکان شش تا دوازده ساله ۹ تا ۱۲ ساعت خواب در شبانه‌روز لازم دارند (آکادمی آمریکایی طب خواب). ساعت خواب و بیداری را هر روز، حتی تعطیلات، یکی نگه دارید.",
          "یک ساعت پیش از خواب صفحه‌ها را خاموش کنید؛ نور صفحه خواب را دیر می‌کند. تلویزیون و گوشی در اتاق خواب کودک نباشد.",
          "کارهای پیش از خواب را هر شب به یک ترتیب انجام دهید و اتاق را تاریک، آرام و خنک نگه دارید.",
          "اگر کودک خروپف می‌کند، شب‌ها زیاد بیدار می‌شود یا روزها خیلی خواب‌آلود است، با پزشک مشورت کنید."
        ] }
    ]
  },
  {
    id: "health-sprout-17", subject: "health", level: "sprout", emoji: "📱", title: "صفحه و بازی",
    steps: [
      /* A day: lots of play in the park; a little time with a tablet on the sofa; a new game appears, so the boy shows
         his mother and asks first; when the clock's long hand reaches the agreed place he puts the tablet down and goes
         to build with blocks. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به یک روز نگاه کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, ball: { art: "ball-side", at: [96, 88], s: 1.2 }, kid0: { art: "h-boy", at: [30, 88], s: 1.4 },
          room: { art: "h-room", at: [160, 0] }, clock: { art: "h-clock", at: [236, 20], s: 1.3 }, sofa: { art: "h-sofa", at: [196, 88], s: 1.3 },
          table: { art: "h-table", at: [262, 88], s: 1.1 }, blocks: { art: "🧱", at: [296, 88], s: 0.7 },
          mom: { art: "h-mom-home", at: [290, 88], s: 1.15, flip: true },
          boy: { art: "h-boy", at: [194, 91.2], s: 1.4 }, tab: { art: "h-tablet", at: [209, 66], s: 1.2 },
          talk: { art: "h-talk", at: [262, 52], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "بیشتر روز را بازی می‌کنیم: بیرون می‌دویم و توپ‌بازی می‌کنیم.", key: 2600, hold: 5600, do: [
            { id: "kid0", to: { x: 80 }, dur: 1800, ease: "linear" }
          ].concat(B.hwalk("kid0", 0, 1800, 4, true), [
            { id: "kid0.legF", to: { r: -45 }, at: 2000, dur: 250 }, { id: "kid0.legF", to: { r: 0 }, at: 2400, dur: 300 },
            { id: "ball", path: "M96 88Q120 40 150 86", at: 2150, dur: 1300, ease: "linear" }, { id: "ball", to: { r: 540 }, at: 2150, dur: 1300 }
          ]) },
          { caption: "کمی هم با صفحه بازی می‌کنیم، وقتی بزرگ‌تر اجازه داده است.", key: 3600, hold: 6000, do: [
            { cam: { x: 240 }, dur: 1800 }
          ].concat(B.hpose("boy", "h-boy", { legF: -88, shinF: 88, legB: -88, shinB: 88, armF: [10, -20], armB: [10, -20.4], head: 14 }, 0, 1), [
            { id: "clock.min", to: { r: 0 }, dur: 1 },
            { id: "tab.glow", to: { o: 0.6 }, at: 1800, dur: 2400, yoyo: true, times: 4 },
            { id: "clock.min", to: { r: 90 }, at: 1800, dur: 3600, ease: "linear" }
          ]) },
          { caption: "اگر یک بازی یا برنامه تازه دیدیم، اول از بزرگ‌تر می‌پرسیم.", key: 4400, hold: 7000, do: [
            { id: "boy", to: { y: 88 }, dur: 500 }, { id: "tab", to: { o: 0 }, dur: 200 }
          ].concat(B.hunpose("boy", "h-boy", 0, 500), [
            { id: "boy", walk: [258, 88], at: 600, dur: 2000 }
          ], B.hpose("boy", "h-boy", "talk", 2600, 400), [
            { id: "tab", to: { x: 266.4, y: 64, o: 1 }, at: 3000, dur: 300 },
            { id: "talk", to: { o: 1 }, at: 3200, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 3200, dur: 1600, yoyo: true, times: 4 },
            { id: "talk", to: { o: 0 }, at: 4900, dur: 300 },
            { id: "mom.head", to: { r: 14 }, at: 3600, dur: 800 }, { id: "mom.head", to: { r: 0 }, at: 5200, dur: 500 },
            { id: "mom.head", to: { r: 8 }, at: 5800, dur: 900, yoyo: true, times: 2 }
          ]) },
          { caption: "وقت تمام شد: صفحه را کنار می‌گذاریم و می‌رویم بازی کنیم.", key: 5600, hold: 7400, do: [
            { id: "clock.min", to: { r: 180 }, dur: 1200, ease: "linear" },
            { emit: "spark", where: [236, 26], spread: [6, 4], n: 4, at: 1200, dur: 300, life: 1000 },
            { id: "tab", path: "M266.4 64L262 67", at: 1600, dur: 600 }, { id: "tab.glow", to: { o: 0 }, at: 2200, dur: 400 }
          ].concat(B.hpose("boy", "h-boy", { armF: [9.6, -16] }, 1400, 500), B.hpose("boy", "h-boy", { armF: [0.2, -12] }, 2300, 400), [
            { id: "boy", to: { flip: 1 }, at: 2700, dur: 1 }, { id: "boy", walk: [284, 88], at: 2800, dur: 1600 },
            { id: "mom", to: { x: 318 }, at: 2400, dur: 1200 }
          ], B.hpose("boy", "h-boy", { upper: 40, armF: [12, -8] }, 4500, 600), [
            { id: "blocks", to: { y: 84 }, at: 5200, dur: 400, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "sort", prompt: "یک روز خوب: کدام بازی بدون صفحه است و کدام با صفحه؟",
        baskets: [{ label: "بدون صفحه", pic: "⚽", value: "play" }, { label: "با صفحه", pic: "📱", value: "screen" }],
        items: [
          { pic: "🪁", say: "بادبادک", basket: "play" }, { pic: "🧩", say: "پازل", basket: "play" }, { pic: "🚲", say: "دوچرخه", basket: "play" }, { pic: "🖍️", say: "نقاشی", basket: "play" },
          { pic: "📱", say: "بازی با تبلت", basket: "screen" }, { pic: "📺", say: "کارتون", basket: "screen" }
        ] },
      { type: "choose", prompt: "یک بازی تازه در تبلت دیدی. چه کار می‌کنی؟", say: "یک بازی تازه در تبلت دیدی. چه کار می‌کنی؟", stack: true,
        options: ["🙋 اول از بزرگ‌ترم می‌پرسم", "👆 خودم نصبش می‌کنم"], answer: "🙋 اول از بزرگ‌ترم می‌پرسم" },
      { type: "choose", prompt: "وقت صفحه تمام شد. چه کار می‌کنی؟", say: "وقت صفحه تمام شد. چه کار می‌کنی؟", stack: true,
        options: ["🧱 کنارش می‌گذارم و بازی دیگری می‌کنم", "😠 قایمکی ادامه می‌دهم"], answer: "🧱 کنارش می‌گذارم و بازی دیگری می‌کنم" },
      { type: "forparents",
        tips: [
          "برای کودکان این سن، زمان صفحه تفریحی کم باشد (حدود یک ساعت در روز یا کمتر) و همیشه با برنامه‌ای که با هم گذاشته‌اید. بازی، خواب، غذا و خانواده جای اول را دارند.",
          "قانون «اول بپرس» را بگذارید: هیچ بازی، برنامه یا ویدیوی تازه‌ای بدون پرسیدن از شما نصب یا باز نشود. برنامه‌ها و بازی‌ها را خودتان ببینید.",
          "پیش از تمام شدن وقت خبر بدهید و بعد یک بازی دیگر پیشنهاد کنید. اگر کودک خودش صفحه را کنار گذاشت، تشویقش کنید.",
          "سر سفره، در اتاق خواب و یک ساعت پیش از خواب صفحه نباشد. خودتان هم الگوی کم‌استفاده از گوشی باشید."
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
    id: "health-sprout-18", subject: "health", level: "sprout", emoji: "🪟", title: "پنجره، بالکن، بخاری",
    steps: [
      /* Shown as the safe action, never a fall or a burn: the girl looks out of an open window from behind its guard
         without leaning out; the boy plays by the wall on the balcony, away from the railing; the girl moves away from
         the heater and sits further off; the boy smells gas in the kitchen, covers his nose, goes out and tells his
         father. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#dfe8f6",
        parts: {
          bedroom: { art: "h-bedroom" }, win: { art: "h-window-open", at: [84, 34], s: 1.4 }, girl: { art: "h-girl", at: [40, 88], s: 1.4 },
          balcony: { art: "h-balcony", at: [160, 0] }, boy: { art: "h-boy", at: [186, 84], s: 1.3 }, ball: { art: "ball-side", at: [200, 84], s: 1.1 }, railing: { art: "h-railing", at: [160, 0] },
          room: { art: "h-room", at: [320, 0] }, heater: { art: "h-heater", at: [444, 88], s: 1.2 }, cushion: { art: "h-cushion", at: [360, 88], s: 1.3 }, girl3: { art: "h-girl", at: [424, 88], s: 1.4, flip: true },
          kitchen: { art: "h-kitchen", at: [480, 0] }, stove: { art: "h-stove", at: [600, 88] }, gas1: { art: "h-scent", at: [590, 56], s: 1.4, o: 0 }, gas2: { art: "h-scent", at: [590, 56], s: 1.4, o: 0 },
          dad: { art: "h-dad", at: [500, 88], s: 1.15 }, boy4: { art: "h-boy", at: [566, 88], s: 1.4, flip: true },
          talk: { art: "h-talk", at: [551, 51], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "پنجره باز است؟ به بیرون خم نمی‌شویم و از آن بالا نمی‌رویم. از پشت آن نگاه می‌کنیم.", key: 4200, hold: 6400, do: [
            { id: "girl", walk: [64, 88], dur: 2000 },
            { id: "girl.head", to: { r: -10 }, at: 2200, dur: 700 },
            { id: "girl.head", to: { r: 4 }, at: 3600, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "در بالکن، کنار دیوار بازی می‌کنیم و از نرده بالا نمی‌رویم.", key: 4000, hold: 6400, do: [
            { cam: { x: 240 }, dur: 1800 }
          ].concat(B.hpose("boy", "h-boy", { upper: 30, armF: [12, -6] }, 1800, 500), [
            { id: "ball", path: "M200 84Q194 74 180 84", at: 2400, dur: 1400 },
            { id: "boy", to: { flip: -1 }, at: 2400, dur: 1 },
            { id: "ball", path: "M180 84Q190 74 200 84", at: 4200, dur: 1200 }
          ]) },
          { caption: "از بخاری فاصله می‌گیریم: دورتر می‌نشینیم و چیزی رویش نمی‌گذاریم.", key: 4600, hold: 6400, do: [
            { cam: { x: 400 }, dur: 1800 },
            { id: "heater.glow", to: { sy: 1.2 }, dur: 6000, yoyo: true, times: 10 },
            { id: "girl3", walk: [370, 88], at: 1800, dur: 2000 },
            { id: "girl3", to: { y: 95 }, at: 3900, dur: 500 }
          ].concat(B.hpose("girl3", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 3900, 500), [
            { id: "girl3", to: { flip: 1 }, at: 4500, dur: 1 }
          ]) },
          { caption: "اگر بوی گاز آمد، از آشپزخانه بیرون می‌رویم و فوراً به بزرگ‌تر می‌گوییم.", key: 5400, hold: 7600, do: [
            { cam: { x: 560 }, dur: 1800 },
            { id: "gas1", to: { o: 1 }, at: 1600, dur: 300 }, { id: "gas1", path: "M590 56L566 48", at: 1600, dur: 5000 }, { id: "gas1", to: { o: 0 }, at: 6800, dur: 300 },
            { id: "gas2", to: { o: 1 }, at: 2400, dur: 300 }, { id: "gas2", path: "M592 60L570 52", at: 2400, dur: 4600 }, { id: "gas2", to: { o: 0 }, at: 7000, dur: 300 },
            { id: "boy4.head", to: { r: 10 }, at: 2400, dur: 500 }
          ].concat(B.hpose("boy4", "h-boy", { armF: [5.4, -26.2] }, 3000, 500), [
            { id: "boy4", walk: [530, 88], at: 3600, dur: 1600 },
            { id: "talk", to: { o: 1, x: 516 }, at: 5200, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 5300, dur: 1400, yoyo: true, times: 4 },
            { id: "boy4.head", to: { r: 0 }, at: 5000, dur: 300 }
          ], B.hpose("boy4", "h-boy", { armF: [0.2, -12] }, 5000, 400), [
            { id: "dad.head", to: { r: 10 }, at: 5600, dur: 900, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "choose", prompt: "پنجره اتاق باز است. چه کار می‌کنی؟", say: "پنجره اتاق باز است. چه کار می‌کنی؟", stack: true,
        options: ["👀 از پشت آن نگاه می‌کنم", "🪑 صندلی می‌گذارم و بالا می‌روم"], answer: "👀 از پشت آن نگاه می‌کنم" },
      { type: "choose", prompt: "توپت کنار نرده بالکن رفت. چه کار می‌کنی؟", say: "توپت کنار نرده بالکن رفت. چه کار می‌کنی؟", stack: true,
        options: ["🙋 به بزرگ‌تر می‌گویم", "🧗 از نرده بالا می‌روم"], answer: "🙋 به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "در آشپزخانه بوی بدِ گاز می‌آید. چه کار می‌کنی؟", say: "در آشپزخانه بوی بد گاز می‌آید. چه کار می‌کنی؟", stack: true,
        options: ["🏃 بیرون می‌روم و به بزرگ‌تر می‌گویم", "💡 چراغ را روشن می‌کنم تا ببینم", "🙈 کاری نمی‌کنم"], answer: "🏃 بیرون می‌روم و به بزرگ‌تر می‌گویم" },
      { type: "forparents",
        tips: [
          "افتادن از پنجره و بالکن از آسیب‌های جدی کودکان در آپارتمان‌هاست. روی پنجره‌ها حفاظ یا قفل بازشو (حداکثر ۱۰ سانتی‌متر) بگذارید و مبل، صندلی و گلدان را از کنار پنجره و نرده دور کنید.",
          "کمد، قفسه و تلویزیون را به دیوار ببندید تا اگر کودک از آن بالا رفت، نیفتد.",
          "جلوی بخاری حفاظ بگذارید و دودکش آن را هر سال پیش از زمستان بازدید کنید. هرگز بخاری گازی بدون دودکش یا منقل را در اتاق دربسته روشن نکنید؛ گاز مونوکسید کربن بی‌بو و خطرناک است. یک دستگاه هشدار مونوکسید کربن بگذارید.",
          "اگر بوی گاز آمد: کلید برق را نزنید و شعله روشن نکنید، شیر گاز را ببندید، پنجره‌ها را باز کنید، همه بیرون بروند و از بیرون با اورژانس گاز ۱۹۴ تماس بگیرید."
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
    id: "health-sprout-19", subject: "health", level: "sprout", emoji: "🚗", title: "در ماشین و روی موتور",
    steps: [
      /* The car cut open (as in health-sprout-3): the girl in the back in her booster seat, the belt drawn across her;
         the window is open but her hands stay in her lap; the car stops by the pavement and she gets out on the pavement
         side to her mother; then a boy rides a bike in the park with a helmet on. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#cfe9f7",
        parts: {
          outside: { art: "h-outside" },
          panel: { art: "h-panel" }, carIn: { art: "h-car-in" }, seat: { art: "h-carseat" },
          kidCar: { art: "h-girl", at: [61.1, 66.8] }, dadCar: { art: "h-dad", at: [100, 77], s: 0.9 },
          carBody: { art: "h-car-body" }, belt: { art: "h-belt", o: 0 },
          car: { art: "🚗", at: [210, 86], s: 2.6, flip: true }, mom: { art: "h-mom", at: [20, 86], s: 1.1, o: 0 }, girl: { art: "h-girl", at: [88, 86], s: 1.3, o: 0 },
          park: { art: "h-park", o: 0 }, bike: { art: "🚲", at: [170, 88], s: 2.2, o: 0 }, rider: { art: "h-boy", at: [170, 78], s: 1.2, o: 0 },
          helmet: { art: "h-helmet", at: [1.2, -29.4], s: 0.95, under: "rider" }
        },
        scenes: [
          { caption: "در ماشین، هر بار عقب می‌نشینیم، در صندلی کودک یا روی صندلی بلندکننده، و کمربند می‌بندیم.", key: 3200, hold: 5400, do: B.hpose("kidCar", "h-girl", { armF: [-4, -26] }, 600, 500).concat([
            { id: "belt", to: { o: 1 }, at: 1200, dur: 1 }, { id: "belt", draw: true, at: 1200, dur: 1100 },
            { emit: "spark", where: [67, 50], spread: [3, 3], n: 4, at: 2400, dur: 300, life: 1000 }
          ], B.hpose("kidCar", "h-girl", { armF: [6, -15] }, 1200, 1100)) },
          { caption: "پنجره باز است، ولی سر و دستمان را بیرون نمی‌بریم.", key: 3000, hold: 5000, do: B.hpose("kidCar", "h-girl", { armF: [8, -24] }, 400, 700).concat(
            B.hpose("kidCar", "h-girl", { armF: [6, -15] }, 1600, 700), [
            { id: "kidCar.head", to: { r: -8 }, at: 2400, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "ماشین که ایستاد، از سمت پیاده‌رو پیاده می‌شویم.", key: 4400, hold: 6400, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "carIn", to: { o: 0 }, dur: 500 }, { id: "seat", to: { o: 0 }, dur: 500 }, { id: "kidCar", to: { o: 0 }, dur: 500 },
            { id: "dadCar", to: { o: 0 }, dur: 500 }, { id: "carBody", to: { o: 0 }, dur: 500 }, { id: "belt", to: { o: 0 }, dur: 500 },
            { id: "mom", to: { o: 1 }, at: 300, dur: 400 }, { id: "car", to: { x: 104 }, at: 400, dur: 1800, ease: "out" },
            { id: "girl", to: { o: 1 }, at: 2400, dur: 400 }, { id: "girl", to: { flip: -1 }, at: 2400, dur: 1 },
            { id: "girl", walk: [36, 86], at: 2700, dur: 2200 }
          ].concat(B.hpose("mom", "h-mom", { armF: [9, -24] }, 4400, 500)) },
          { caption: "روی دوچرخه، همیشه کلاه ایمنی سرمان است.", key: 3400, hold: 6000, do: [
            { id: "mom", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 0 }, dur: 400 }, { id: "car", to: { o: 0 }, dur: 400 }, { id: "park", to: { o: 1 }, dur: 600 }, { id: "bike", to: { o: 1 }, at: 400, dur: 400 }, { id: "rider", to: { o: 1 }, at: 400, dur: 400 },
            { id: "bike", to: { x: -30 }, dur: 1 }, { id: "rider", to: { x: -30 }, dur: 1 }
          ].concat(B.hpose("rider", "h-boy", { legF: -60, shinF: 70, legB: -40, shinB: 80, armF: [9, -19], armB: [8.6, -19.4] }, 0, 1), [
            { id: "bike", to: { x: 110 }, at: 700, dur: 4400, ease: "linear" }, { id: "rider", to: { x: 110 }, at: 700, dur: 4400, ease: "linear" },
            { id: "rider.legF", to: { r: -30 }, at: 700, dur: 4400, yoyo: true, times: 10 }, { id: "rider.legB", to: { r: -70 }, at: 700, dur: 4400, yoyo: true, times: 10 }
          ]) }
        ] },
      { type: "choose", prompt: "سوار ماشین شدی. کجا می‌نشینی؟", say: "سوار ماشین شدی. کجا می‌نشینی؟", stack: true,
        options: ["🪑 عقب، با کمربند", "🧑‍✈️ جلو، کنار راننده", "🛋️ عقب، بدون کمربند"], answer: "🪑 عقب، با کمربند" },
      { type: "choose", prompt: "می‌خواهی سوار دوچرخه یا موتور شوی. اول چه کار می‌کنی؟", say: "می‌خواهی سوار دوچرخه یا موتور شوی. اول چه کار می‌کنی؟", stack: true,
        options: ["⛑️ کلاه ایمنی سرم می‌گذارم", "🏃 زود راه می‌افتم"], answer: "⛑️ کلاه ایمنی سرم می‌گذارم" },
      { type: "choose", prompt: "از کدام در ماشین پیاده می‌شوی؟", say: "از کدام در ماشین پیاده می‌شوی؟", stack: true,
        options: ["🚶 دری که سمت پیاده‌روست", "🚗 دری که سمت خیابان است"], answer: "🚶 دری که سمت پیاده‌روست" },
      { type: "forparents",
        tips: [
          "کودک تا وقتی قدش به حدود ۱۴۵ سانتی‌متر نرسیده، در صندلی کودک یا صندلی بلندکننده مناسب وزنش، در صندلی عقب بنشیند؛ هر سفر، حتی کوتاه. کودک را روی پا ننشانید.",
          "قفل کودک درهای عقب را روشن کنید و پنجره را فقط کمی باز کنید. کودک را هیچ‌وقت در ماشین تنها نگذارید.",
          "روی موتورسیکلت، کودک کلاه ایمنی اندازه سرش داشته باشد؛ بسیاری از کشورها سوار کردن کودکان خردسال بر موتور را ممنوع می‌دانند. روی دوچرخه هم همیشه کلاه، و دور از خیابان.",
          "به کودک یاد بدهید از در سمت پیاده‌رو پیاده شود و پشت ماشین پارک‌شده بازی نکند؛ راننده او را نمی‌بیند."
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
  {
    id: "health-sprout-20", subject: "health", level: "sprout", emoji: "🤔", title: "بازی امن یا بپرس",
    steps: [
      // The game lesson of the home and street unit: safe, or ask a grown-up first, in four mixes.
      { type: "sort", prompt: "در خانه: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "📖", say: "کتاب خواندن روی فرش", basket: "ok" }, { pic: "🧩", say: "پازل", basket: "ok" }, { pic: "🥛", say: "یک لیوان شیر", basket: "ok" },
          { pic: "🔌", say: "پریز برق", basket: "ask" }, { pic: "🧴", say: "بطری مایع شوینده", basket: "ask" }, { pic: "💊", say: "قرص روی میز", basket: "ask" }
        ] },
      { type: "sort", prompt: "پنجره، بالکن و بخاری: کدام امن است و کدام را می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🪟", say: "نگاه کردن از پشت پنجره", basket: "ok" }, { pic: "🧸", say: "بازی کنار دیوار بالکن", basket: "ok" },
          { pic: "🪑", say: "رفتن روی صندلی کنار پنجره باز", basket: "ask" }, { pic: "🔥", say: "دست زدن به بخاری", basket: "ask" }, { pic: "👃", say: "بوی گاز", basket: "ask" }
        ] },
      { type: "sort", prompt: "در خیابان: کدام امن است و کدام را می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🤝", say: "دست بزرگ‌تر را گرفتن", basket: "ok" }, { pic: "🚦", say: "صبر کردن پشت خط عابر", basket: "ok" },
          { pic: "⚽", say: "دویدن دنبال توپ به خیابان", basket: "ask" }, { pic: "🚗", say: "رد شدن از بین ماشین‌های پارک‌شده", basket: "ask" }
        ] },
      { type: "sort", prompt: "در ماشین و روی دوچرخه: کدام درست است و کدام نه؟",
        baskets: [{ label: "درست است", pic: "👍", value: "ok" }, { label: "نه، خطرناک است", pic: "✋", value: "ask" }],
        items: [
          { pic: "🪢", say: "بستن کمربند", basket: "ok" }, { pic: "⛑️", say: "کلاه ایمنی روی دوچرخه", basket: "ok" }, { pic: "🚶", say: "پیاده شدن از سمت پیاده‌رو", basket: "ok" },
          { pic: "🪟", say: "بیرون بردن سر از پنجره ماشین", basket: "ask" }, { pic: "🧑‍✈️", say: "نشستن در صندلی جلو", basket: "ask" }
        ] },
      { type: "forparents",
        tips: [
          "این بازی را در زندگی روزمره ادامه دهید: در خانه، در خیابان یا در ماشین بپرسید «این امن است یا باید بپرسیم؟» و بگذارید کودک توضیح دهد چرا.",
          "قانون اصلی: «اگر مطمئن نیستی، بایست و از بزرگ‌تر بپرس.» از کودک به‌خاطر پرسیدن تشکر کنید.",
          "یک بار با کودک خانه را از ارتفاع چشم او بگردید: پریز، دارو، شوینده، پنجره، بالکن، بخاری. هر چه را که می‌توانید امن‌تر کنید."
        ] }
    ]
  },
  {
    id: "health-sprout-21", subject: "health", level: "sprout", emoji: "🛡️", title: "قانون‌های بدن من",
    steps: [
      /* Builds on health-all-1, calm and plain, nobody shown doing harm: the parts the underwear covers glow softly; the
         girl tells her mother the names of her body parts; safe touch (a hug from Grandma); for an unsafe touch she says
         «نه!» with her hand up, walks away and tells; the doctor checks her with Mum beside her; and she tells her father
         about a secret she was asked to keep. Drawings: js/art/rig-health.js. Needs the child-protection reviewer. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, kid: { art: "h-girl-front", at: [80, 88], s: 1.6 },
          girl: { art: "h-girl", at: [60, 88], s: 1.4, o: 0 }, mom: { art: "h-mom-home", at: [104, 88], s: 1.2, flip: true, o: 0 },
          gran: { art: "h-gran", at: [100, 88], s: 1.2, flip: true, o: 0 }, dad: { art: "h-dad", at: [104, 88], s: 1.2, flip: true, o: 0 },
          doctor: { art: "h-doctor", at: [84, 88], s: 1.2, flip: true, o: 0 },
          talk: { art: "h-talk", at: [67, 51], s: 1.2, o: 0 }, talkF: { art: "h-talk", at: [86, 44], s: 1.6, o: 0 },
          heart: { art: "h-heart", at: [80, 20], o: 0 }
        },
        scenes: [
          { caption: "بدن ما قانون دارد. جاهایی که لباس زیر می‌پوشاند، جاهای خصوصی بدن است.", key: 2600, hold: 5000, do: [
            { id: "kid.private", to: { o: 1 }, at: 600, dur: 600 }, { id: "kid.private", to: { s: 1.06 }, at: 1200, dur: 2400, yoyo: true, times: 2 }
          ].concat(B.hpose("kid", "h-girl-front", "hug", 200, 700)) },
          { caption: "هر جای بدن اسمی دارد. اسم جاهای خصوصی را هم بلدیم و می‌توانیم با پدر و مادرمان درباره‌اش حرف بزنیم.", key: 2400, hold: 6400, do: [
            { id: "kid", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 1 }, dur: 400 }, { id: "mom", to: { o: 1 }, dur: 400 },
            { id: "talk", to: { o: 1 }, at: 800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 800, dur: 2400, yoyo: true, times: 6 },
            { id: "girl.mouth", to: { o: 0 }, at: 800, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 800, dur: 100 },
            { id: "girl.open", to: { sy: 0.4 }, at: 900, dur: 2400, yoyo: true, times: 8 },
            { id: "talk", to: { o: 0 }, at: 3300, dur: 300 }, { id: "girl.open", to: { o: 0 }, at: 3300, dur: 100 }, { id: "girl.mouth", to: { o: 1 }, at: 3300, dur: 100 },
            { id: "mom.head", to: { r: 10 }, at: 3500, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "لمس امن حالمان را خوب می‌کند: بغل مادربزرگ وقتی خودمان می‌خواهیم، دست دادن، بزن قدش.", key: 3400, hold: 6000, do: [
            { id: "mom", to: { o: 0 }, dur: 400 }, { id: "gran", to: { o: 1 }, dur: 400 }, { id: "girl", walk: [76, 88], at: 400, dur: 1400 }
          ].concat(B.hpose("gran", "h-gran", { upper: 14, armF: [14, -36], armB: [13, -34] }, 1800, 700), B.hpose("girl", "h-girl", { armF: [7, -22], armB: [6.4, -22] }, 1800, 700), [
            { id: "heart", to: { o: 1 }, at: 2600, dur: 400 }, { id: "heart", to: { s: 1.3 }, at: 3000, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "اگر کسی بخواهد به جاهای خصوصی ما دست بزند یا لمسی حالمان را بد کند، محکم می‌گوییم «نه!»، دور می‌شویم و به بزرگ‌ترمان می‌گوییم.", key: 2400, hold: 8000, do: [
            { id: "heart", to: { o: 0 }, dur: 300 }, { id: "gran", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 0 }, dur: 400 }, { id: "kid", to: { o: 1 }, dur: 400 }, { id: "kid.private", to: { o: 0 }, dur: 400 }
          ].concat(B.hpose("kid", "h-girl-front", "stop", 500, 600), [
            { id: "kid.palmR", to: { o: 1 }, at: 1100, dur: 200 }, { id: "kid.handR", to: { o: 0 }, at: 1100, dur: 200 },
            { id: "kid.browsDown", to: { o: 1 }, at: 1100, dur: 200 }, { id: "kid.mouth", to: { o: 0 }, at: 1100, dur: 100 }, { id: "kid.open", to: { o: 1 }, at: 1100, dur: 100 },
            { id: "talkF", to: { o: 1 }, at: 1200, dur: 200 }, { id: "talkF", to: { s: 2 }, at: 1200, dur: 1400, yoyo: true, times: 2 }, { id: "talkF", to: { o: 0 }, at: 2800, dur: 300 },
            { id: "kid", to: { o: 0 }, at: 3600, dur: 400 }, { id: "girl", to: { o: 1, x: 40 }, at: 3600, dur: 1 }, { id: "girl", to: { o: 1 }, at: 3600, dur: 400 }, { id: "mom", to: { o: 1 }, at: 3600, dur: 400 },
            { id: "girl", walk: [80, 88], at: 4000, dur: 2000 },
            { id: "talk", to: { o: 1, x: 87 }, at: 6100, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 6100, dur: 1400, yoyo: true, times: 4 }
          ], B.hpose("mom", "h-mom-home", { upper: 20, armF: [16, -30] }, 6400, 600)) },
          { caption: "پزشک فقط برای سلامتی‌مان معاینه‌مان می‌کند، وقتی پدر یا مادرمان کنارمان است.", key: 3400, hold: 6000, do: [
            { id: "talk", to: { o: 0 }, dur: 300 }, { id: "doctor", to: { o: 1, x: 116 }, dur: 500 }, { id: "mom", to: { x: 70, flip: 1 }, dur: 1 }, { id: "girl", to: { x: 92 }, dur: 1 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 0, armF: [13.4, -27] }, 0, 1), [
            { id: "doctor", to: { y: 100.6 }, at: 900, dur: 700 }
          ], B.hpose("doctor", "h-doctor", "listen", 900, 700), [
            { id: "doctor.steth", to: { o: 1 }, at: 1600, dur: 200 }
          ]) },
          { caption: "اگر کسی گفت «به هیچ‌کس نگو»، باز هم به پدر یا مادرمان می‌گوییم. هیچ‌وقت تقصیر ما نیست.", key: 5200, hold: 7000, do: [
            { id: "doctor", to: { o: 0 }, dur: 400 }, { id: "mom", to: { o: 0 }, dur: 400 }, { id: "dad", to: { o: 1 }, at: 300, dur: 400 }, { id: "girl", to: { x: 76 }, dur: 600 },
            { id: "talk", to: { o: 1, x: 83 }, at: 1000, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 1000, dur: 2400, yoyo: true, times: 6 },
            { id: "girl.mouth", to: { o: 0 }, at: 1000, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 1000, dur: 100 }, { id: "girl.open", to: { sy: 0.4 }, at: 1100, dur: 2400, yoyo: true, times: 8 },
            { id: "talk", to: { o: 0 }, at: 3500, dur: 300 }, { id: "girl.open", to: { o: 0 }, at: 3500, dur: 100 }, { id: "girl.mouth", to: { o: 1 }, at: 3500, dur: 100 },
            { id: "heart", to: { o: 1 }, at: 4200, dur: 400 }
          ].concat(B.hpose("dad", "h-dad", { upper: 20, armF: [16, -30] }, 3600, 700)) }
        ] },
      { type: "sort", prompt: "کدام لمس امن است و برای کدام «نه» می‌گوییم و به بزرگ‌تر خبر می‌دهیم؟",
        baskets: [{ label: "امن است", pic: "💛", value: "ok" }, { label: "«نه» می‌گویم و خبر می‌دهم", pic: "✋", value: "no" }],
        items: [
          { pic: "🤗", say: "بغل مامان، وقتی خودم می‌خواهم", basket: "ok" }, { pic: "🤝", say: "دست دادن", basket: "ok" }, { pic: "🙌", say: "بزن قدش", basket: "ok" },
          { pic: "🩺", say: "معاینه دکتر وقتی مامان کنارم است", basket: "ok" },
          { pic: "🩲", say: "کسی بخواهد به جاهای خصوصی‌ام دست بزند", basket: "no" }, { pic: "🤫", say: "کسی بگوید این راز را به هیچ‌کس نگو", basket: "no" }
        ] },
      { type: "choose", prompt: "اگر کسی کاری کرد که حالت را بد کرد و گفت «به کسی نگو»، چه کار می‌کنی؟", say: "اگر کسی کاری کرد که حالت را بد کرد و گفت به کسی نگو، چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به پدر یا مادرم یا یک بزرگ‌تر مهربان می‌گویم", "🤐 به هیچ‌کس نمی‌گویم"], answer: "🗣️ به پدر یا مادرم یا یک بزرگ‌تر مهربان می‌گویم" },
      { type: "choose", prompt: "تقصیر چه کسی است؟", say: "اگر کسی لمس ناامنی کرد، تقصیر چه کسی است؟", stack: true,
        options: ["💛 هیچ‌وقت تقصیر من نیست", "😔 تقصیر من است"], answer: "💛 هیچ‌وقت تقصیر من نیست" },
      { type: "doit", pic: "✋", text: "با بزرگ‌ترت تمرین کن:", list: ["دستت را بالا بیاور و محکم بگو: «نه! دوست ندارم.»", "چند قدم دور شو.", "برو پیش بزرگ‌ترت و بگو چه شد.", "اسم سه بزرگ‌تر مهربان را بگو که می‌توانی به آن‌ها بگویی."] },
      { type: "forparents",
        text: "بدن تو مال خودت است. هر چیزی به ما بگویی، کمکت می‌کنیم.",
        tips: [
          "این درس دنباله درس «بدن من مال خودم است» است. آن را کنار کودک ببینید و آرام و معمولی حرف بزنید، مثل وقتی که درباره مسواک حرف می‌زنید.",
          "اسم درست جاهای خصوصی بدن را به کودک بگویید (مثلاً آلت تناسلی، باسن، سینه)، یا کلمه‌ای روشن که در خانواده‌تان به کار می‌رود. کودکی که برای بدنش کلمه دارد، راحت‌تر می‌تواند بگوید چه اتفاقی افتاده است.",
          "تفاوت «راز خوب» (هدیه تولد، که زود گفته می‌شود و همه را شاد می‌کند) و «راز بد» (که حال را بد می‌کند و کسی می‌گوید هیچ‌وقت نگو) را بگویید. رازی درباره لمس هیچ‌وقت نگه داشته نمی‌شود.",
          "اگر کودک چیزی گفت: آرام بمانید، حرفش را باور کنید، از او تشکر کنید و بگویید تقصیر او نیست. سؤال‌های زیاد نپرسید و او را با فرد مورد نظر روبه‌رو نکنید. با اورژانس اجتماعی ۱۲۳ تماس بگیرید."
        ] }
    ]
  },
  {
    id: "health-sprout-22", subject: "health", level: "sprout", emoji: "🤝", title: "وقتی کسی اذیتم می‌کند",
    steps: [
      /* In the school yard, calm and with nobody hurt: two children leave a girl out and laugh at her, again; a heart
         shows it is not her fault; she puts her hand up and says «بس کن!», walks away, and tells the teacher; later she
         and a friend invite a boy who is on his own to play. Drawings: js/art/rig-health.js and the yard from
         js/art/rig-world.js; the other children and the teacher are full-body walkers from js/scene.js. Pairs with
         feel-8 (kindness). Needs the child-protection reviewer. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#e8d3b0",
        parts: {
          yard: { art: "w-yard-tabriz" }, yard2: { art: "w-yard-tabriz", at: [160, 0] },
          w1: { art: "👦", at: [100, 88], s: 1.75, flip: true, look: { top: "#5a9a45" } }, w2: { art: "🧒", at: [116, 88], s: 1.75, flip: true },
          girl: { art: "h-girl", at: [62, 86], s: 1.4 }, front: { art: "h-girl-front", at: [62, 86], s: 1.5, o: 0 },
          laugh: { art: "h-talk", at: [90, 50], s: 1.2, flip: true, o: 0 }, talk: { art: "h-talk", at: [74, 43], s: 1.8, o: 0 },
          heart: { art: "h-heart", at: [62, 30], o: 0 },
          teacher: { art: "👨‍🏫", at: [204, 88], s: 1.7, flip: true }, talk2: { art: "h-talk", at: [0, 0], s: 1.2, o: 0 },
          alone: { art: "🧒", at: [260, 88], s: 1.75, flip: true, look: { top: "#e5483f" } }, friend: { art: "👧", at: [176, 88], s: 1.75, look: { top: "#5b9bd5" }, o: 0 }
        },
        scenes: [
          { caption: "اگر بچه‌ها بارها کسی را مسخره کنند یا بازی ندهند، به آن «زورگویی» می‌گویند.", key: 3800, hold: 6400, do: [
            { id: "w1", to: { flip: 1 }, at: 600, dur: 1 }, { id: "w2", to: { flip: 1 }, at: 600, dur: 1 },
            { id: "w1", walk: [128, 88], at: 700, dur: 1600 }, { id: "w2", walk: [142, 88], at: 700, dur: 1600 },
            { id: "w1", to: { flip: -1 }, at: 2400, dur: 1 },
            { id: "laugh", to: { o: 1, x: 118 }, at: 2600, dur: 200 }, { id: "laugh", to: { s: 1.5 }, at: 2600, dur: 1800, yoyo: true, times: 4 }, { id: "laugh", to: { o: 0 }, at: 4600, dur: 300 },
            { id: "girl.head", to: { r: 12 }, at: 2800, dur: 800 }
          ] },
          { caption: "این هیچ‌وقت تقصیر کسی نیست که اذیت می‌شود.", key: 2400, hold: 4600, do: [
            { id: "heart", to: { o: 1 }, at: 300, dur: 400 }, { id: "heart", to: { s: 1.3 }, at: 700, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "دستمان را بالا می‌آوریم و محکم می‌گوییم: «بس کن!» بعد از آن‌جا دور می‌شویم.", key: 2200, hold: 6600, do: [
            { id: "heart", to: { o: 0 }, dur: 300 }, { id: "girl", to: { o: 0 }, dur: 300 }, { id: "front", to: { o: 1 }, dur: 300 }
          ].concat(B.hpose("front", "h-girl-front", "stop", 300, 600), [
            { id: "front.palmR", to: { o: 1 }, at: 900, dur: 200 }, { id: "front.handR", to: { o: 0 }, at: 900, dur: 200 },
            { id: "front.mouth", to: { o: 0 }, at: 900, dur: 100 }, { id: "front.open", to: { o: 1 }, at: 900, dur: 100 },
            { id: "talk", to: { o: 1 }, at: 1000, dur: 200 }, { id: "talk", to: { s: 2.2 }, at: 1000, dur: 1600, yoyo: true, times: 2 }, { id: "talk", to: { o: 0 }, at: 2800, dur: 300 },
            { id: "front", to: { o: 0 }, at: 3400, dur: 300 }, { id: "girl", to: { o: 1, flip: -1 }, at: 3400, dur: 300 }, { id: "girl.head", to: { r: 0 }, at: 3400, dur: 1 },
            { id: "girl", walk: [24, 86], at: 3800, dur: 2400 }
          ]) },
          { caption: "و به یک بزرگ‌تر می‌گوییم: معلم، یا پدر و مادرمان.", key: 4600, hold: 6400, do: [
            { cam: { x: 240 }, dur: 1600 }, { id: "girl", to: { x: 150, flip: 1 }, dur: 1 },
            { id: "girl", walk: [182, 86], at: 1600, dur: 1600 }
          ].concat(B.hpose("girl", "h-girl", "talk", 3200, 400), [
            { id: "talk2", to: { o: 1, x: 189, y: 51 }, at: 3400, dur: 200 }, { id: "talk2", to: { s: 1.5 }, at: 3400, dur: 2400, yoyo: true, times: 6 },
            { id: "teacher", to: { r: 5 }, at: 4200, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "ما هم مهربانیم: بچه‌ای را که تنهاست به بازی دعوت می‌کنیم.", key: 4400, hold: 6400, do: [
            { id: "talk2", to: { o: 0 }, dur: 300 }, { id: "teacher", walk: [300, 88], dur: 2000 }, { id: "friend", to: { o: 1 }, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 0, 300), [
            { id: "girl", walk: [228, 86], at: 400, dur: 1600 }, { id: "friend", walk: [212, 88], at: 400, dur: 1600 }
          ], B.hpose("girl", "h-girl", { armF: [7, -30] }, 2200, 400), [
            { id: "girl.foreF", to: { r: "+30" }, at: 2600, dur: 1400, yoyo: true, times: 4 },
            { id: "alone", walk: [246, 88], at: 3400, dur: 1200 },
            { emit: "spark", where: [236, 40], spread: [30, 14], n: 8, at: 4400, dur: 800, life: 1300 }
          ]) }
        ] },
      { type: "choose", prompt: "یکی از بچه‌ها هر روز تو را مسخره می‌کند. چه کار می‌کنی؟", say: "یکی از بچه‌ها هر روز تو را مسخره می‌کند. چه کار می‌کنی؟", stack: true,
        options: ["✋ می‌گویم «بس کن»، دور می‌شوم و به یک بزرگ‌تر می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "👊 او را می‌زنم"], answer: "✋ می‌گویم «بس کن»، دور می‌شوم و به یک بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "یک بچه تنها ایستاده و کسی با او بازی نمی‌کند. چه کار می‌کنی؟", say: "یک بچه تنها ایستاده و کسی با او بازی نمی‌کند. چه کار می‌کنی؟", stack: true,
        options: ["🤝 او را به بازی دعوت می‌کنم", "😄 به او می‌خندم"], answer: "🤝 او را به بازی دعوت می‌کنم" },
      { type: "talk", scene: "🧒👧🤝", caption: "اگر کسی تو را اذیت کند، به چه کسی می‌گویی؟ تو برای این‌که بقیه احساس خوبی داشته باشند، چه کار می‌کنی؟" },
      { type: "forparents",
        tips: [
          "زورگویی یعنی اذیت کردن تکراری و عمدی، از طرف کسی که قدرت بیشتری دارد: مسخره کردن، هل دادن، کنار گذاشتن از بازی، پخش حرف بد. به کودک بگویید هیچ‌وقت تقصیر او نیست.",
          "اگر کودک گفت اذیت شده: آرام گوش بدهید، از او تشکر کنید و بپرسید چه کمکی می‌خواهد. با معلم یا مدیر مدرسه حرف بزنید. به کودک نگویید «تو هم بزن».",
          "«بس کن» گفتن با صدای محکم، دور شدن و خبر دادن را با هم بازی و تمرین کنید.",
          "مهربانی را تشویق کنید: دعوت کردن کسی که تنهاست، و کنار کسی ایستادن که اذیت می‌شود. اگر شنیدید کودک خودتان کسی را اذیت کرده، آرام با او حرف بزنید و کمکش کنید جبران کند."
        ] }
    ]
  },
  {
    id: "health-sprout-23", subject: "health", level: "sprout", emoji: "💻", title: "اینترنت با بزرگ‌تر",
    steps: [
      /* A big tablet: a video call with Grandma far away (she waves on the screen); the girl uses the tablet on the sofa
         with her mother beside her; her name, her home and her photo get padlocks: private; and when something on the
         screen makes her feel bad, she turns and tells her mother, who puts an arm round her. Nothing frightening is
         drawn on the screen. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [64, 88], s: 1.3 },
          mom: { art: "h-mom-home", at: [74, 97.9], s: 1.15, o: 0 }, girl: { art: "h-girl", at: [58, 91.2], s: 1.4, o: 0 }, tab: { art: "h-tablet", at: [76, 64], s: 1.2, o: 0 },
          talk: { art: "h-talk", at: [66, 55], s: 1.2, o: 0 },
          tablet: { art: "h-bigtablet" }, gran: { art: "h-gran", at: [92, 72], s: 1.05 }, kidBack: { art: "h-girl-back", at: [44, 104], s: 1.5 },
          card: { art: "h-namecard", at: [48, 34], s: 1.4, o: 0 }, home: { art: "🏠", at: [80, 44], s: 0.8, o: 0 }, photo: { art: "📷", at: [112, 44], s: 0.8, o: 0 },
          l1: { art: "h-lock", at: [56, 26], o: 0 }, l2: { art: "h-lock", at: [88, 26], o: 0 }, l3: { art: "h-lock", at: [120, 26], o: 0 },
          heart: { art: "h-heart", at: [70, 24], o: 0 }
        },
        scenes: [
          { caption: "اینترنت کمکمان می‌کند یاد بگیریم و خانواده‌ای را که دور است ببینیم.", key: 3000, hold: 5400, do: B.hpose("gran", "h-gran", { armF: [9, -50] }, 400, 600).concat([
            { id: "gran.armF", to: { r: "+20" }, at: 1000, dur: 2400, yoyo: true, times: 6 }
          ], B.hpose("kidBack", "h-girl-back", { armR: [10, -26] }, 600, 600), [
            { id: "kidBack.foreR", to: { r: "-20" }, at: 1200, dur: 2400, yoyo: true, times: 6 }
          ]) },
          { caption: "از اینترنت فقط با یک بزرگ‌تر استفاده می‌کنیم، که کنارمان است.", key: 2600, hold: 5000, do: [
            { id: "tablet", to: { o: 0 }, dur: 500 }, { id: "gran", to: { o: 0 }, dur: 500 }, { id: "kidBack", to: { o: 0 }, dur: 500 },
            { id: "mom", to: { o: 1 }, at: 300, dur: 500 }, { id: "girl", to: { o: 1 }, at: 300, dur: 500 }, { id: "tab", to: { o: 1 }, at: 300, dur: 500 },
            { id: "tab.glow", to: { o: 0.6 }, at: 900, dur: 3000, yoyo: true, times: 4 }
          ].concat(B.hpose("girl", "h-girl", { legF: -88, shinF: 88, legB: -88, shinB: 88, armF: [10, -20], armB: [10, -20.4], head: 14 }, 0, 1),
            B.hpose("mom", "h-mom-home", { legF: -88, shinF: 88, legB: -88, shinB: 88, head: 14 }, 0, 1)) },
          { caption: "اسم ما، نشانی خانه‌مان و عکسمان خصوصی است. آن‌ها را در اینترنت به کسی نمی‌دهیم.", key: 4400, hold: 6400, do: [
            { id: "tablet", to: { o: 1 }, dur: 500 },
            { id: "card", to: { o: 1 }, at: 600, dur: 400 }, { id: "home", to: { o: 1 }, at: 1100, dur: 400 }, { id: "photo", to: { o: 1 }, at: 1600, dur: 400 },
            { id: "l1", to: { o: 1 }, at: 2400, dur: 300 }, { id: "l1", path: "M60 26L58 40", at: 2400, dur: 500 },
            { id: "l2", to: { o: 1 }, at: 3000, dur: 300 }, { id: "l2", path: "M92 26L90 46", at: 3000, dur: 500 },
            { id: "l3", to: { o: 1 }, at: 3600, dur: 300 }, { id: "l3", path: "M124 26L122 46", at: 3600, dur: 500 }
          ] },
          { caption: "اگر چیزی در اینترنت حالمان را بد کرد یا ترساند، فوراً به بزرگ‌ترمان می‌گوییم.", key: 4600, hold: 6400, do: [
            { id: "tablet", to: { o: 0 }, dur: 500 }, { id: "card", to: { o: 0 }, dur: 400 }, { id: "home", to: { o: 0 }, dur: 400 }, { id: "photo", to: { o: 0 }, dur: 400 },
            { id: "l1", to: { o: 0 }, dur: 400 }, { id: "l2", to: { o: 0 }, dur: 400 }, { id: "l3", to: { o: 0 }, dur: 400 },
            { id: "girl.head", to: { r: -30 }, at: 900, dur: 500 }, { id: "girl", to: { flip: -1 }, at: 1400, dur: 1 }, { id: "girl.head", to: { r: 0 }, at: 1400, dur: 300 },
            { id: "talk", to: { o: 1, flip: -1, x: 52 }, at: 1800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 1800, dur: 2000, yoyo: true, times: 6 },
            { id: "talk", to: { o: 0 }, at: 3900, dur: 300 },
            { id: "heart", to: { o: 1 }, at: 4200, dur: 400 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: -10, armF: [-6, -30], head: -10 }, 3400, 700)) }
        ] },
      { type: "sort", prompt: "کدام را می‌شود در اینترنت گفت و کدام خصوصی است؟",
        baskets: [{ label: "می‌شود گفت", pic: "👍", value: "ok" }, { label: "خصوصی است", pic: "🔒", value: "private" }],
        items: [
          { pic: "🎨", say: "رنگی که دوست دارم", basket: "ok" }, { pic: "🐱", say: "حیوانی که دوست دارم", basket: "ok" }, { pic: "🍎", say: "میوه‌ای که دوست دارم", basket: "ok" },
          { pic: "🏠", say: "نشانی خانه‌ام", basket: "private" }, { pic: "📷", say: "عکس خودم", basket: "private" }, { pic: "🏫", say: "اسم مدرسه‌ام", basket: "private" }, { pic: "☎️", say: "شماره تلفن", basket: "private" }
        ] },
      { type: "choose", prompt: "در یک بازی اینترنتی، کسی پرسید خانه‌ات کجاست. چه کار می‌کنی؟", say: "در یک بازی اینترنتی، کسی پرسید خانه‌ات کجاست. چه کار می‌کنی؟", stack: true,
        options: ["🙋 نمی‌گویم و به بزرگ‌ترم خبر می‌دهم", "🏠 نشانی را می‌نویسم"], answer: "🙋 نمی‌گویم و به بزرگ‌ترم خبر می‌دهم" },
      { type: "choose", prompt: "در گوشی چیزی دیدی که ترساندت. چه کار می‌کنی؟", say: "در گوشی چیزی دیدی که ترساندت. چه کار می‌کنی؟", stack: true,
        options: ["🗣️ به بزرگ‌ترم می‌گویم", "🤐 تنهایی نگاهش می‌کنم"], answer: "🗣️ به بزرگ‌ترم می‌گویم" },
      { type: "forparents",
        tips: [
          "در این سن، کودک فقط با حضور شما از اینترنت استفاده کند. دستگاه را در اتاق عمومی خانه نگه دارید، نه اتاق خواب، و برنامه‌ها و بازی‌ها را خودتان انتخاب کنید.",
          "کنترل والدین و تنظیمات حریم خصوصی دستگاه را روشن کنید و گفت‌وگو با غریبه‌ها را در بازی‌ها ببندید.",
          "به کودک بگویید اسم کامل، نشانی، مدرسه، شماره تلفن و عکسش خصوصی است. پیش از گذاشتن عکس کودک در شبکه‌های اجتماعی هم فکر کنید.",
          "اگر کودک گفت چیزی دیده که ناراحتش کرده، دعوایش نکنید و دستگاه را از او نگیرید؛ از او تشکر کنید و با هم حرف بزنید. این‌طوری دفعه بعد هم به شما می‌گوید."
        ] }
    ]
  },
  {
    id: "health-sprout-24", subject: "health", level: "sprout", emoji: "🩹", title: "زخم کوچک، خون دماغ",
    steps: [
      /* Calm first aid, no blood and nobody in pain: the boy sits after a fall, holds his knee and calls his father; a
         close-up of the knee: a small pink scrape is washed with clean water from a jug and covered with a plaster; for
         a nosebleed the girl sits, leans a little forward and pinches the soft part of her nose while ten is counted; for
         a bump the boy holds a cool cloth on his forehead. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین چطور از زخم کوچک مراقبت می‌کنیم", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, room: { art: "h-room", o: 0 }, cushion: { art: "h-cushion", at: [56, 88], s: 1.4, o: 0 },
          dad: { art: "h-dad", at: [180, 88], s: 1.15, flip: true }, boy: { art: "h-boy", at: [60, 100.6], s: 1.4 },
          talk: { art: "h-talk", at: [70, 64], s: 1.2, o: 0 },
          girl: { art: "h-girl", at: [56, 101.4], s: 1.6, o: 0 }, tissue: { art: "h-tissue", at: [74.1, 61.1], s: 1.5, o: 0 }, counter: { art: "counter", at: [128, 22], s: 1.2, o: 0 },
          kidF: { art: "h-boy-front", at: [110, 88], s: 1.5, o: 0 }, cloth: { art: "h-coldcloth", at: [111, 45], s: 1.2, o: 0 },
          panel: { art: "h-panel", o: 0 }, knee: { art: "h-knee", o: 0 }, jug: { art: "h-jug", at: [98, 30], s: 2, o: 0 }, aid: { art: "h-bandaid", at: [80, 30], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "اگر زمین خوردیم و زانویمان خراش برداشت، به بزرگ‌تر می‌گوییم.", key: 3400, hold: 5600, do: B.hpose("boy", "h-boy", { legF: -84, shinF: 168, legB: -84, shinB: 168, upper: 20, armF: [9, -6], head: 20 }, 0, 1).concat([
            { id: "boy.head", to: { r: -10 }, at: 600, dur: 500 },
            { id: "talk", to: { o: 1 }, at: 800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 800, dur: 1600, yoyo: true, times: 4 }, { id: "talk", to: { o: 0 }, at: 2500, dur: 300 },
            { id: "dad", walk: [96, 88], at: 1400, dur: 2200 }
          ], B.hpose("dad", "h-dad", { upper: 30, armF: [18, -16] }, 3700, 700)) },
          { caption: "زخم را با آب تمیز می‌شوییم.", key: 2800, hold: 5000, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "knee", to: { o: 1 }, at: 300, dur: 500 }, { id: "jug", to: { o: 1 }, at: 600, dur: 400 },
            { id: "jug", to: { r: -50 }, at: 1000, dur: 600 },
            { emit: "drop", where: [80, 34], spread: [8, 4], rise: 18, n: 18, at: 1500, dur: 2800, life: 700 },
            { id: "knee.scrape", to: { o: 0.4 }, at: 1600, dur: 2600 },
            { id: "jug", to: { r: 0 }, at: 4300, dur: 500 }
          ] },
          { caption: "بعد رویش چسب زخم می‌زنیم.", key: 2400, hold: 4400, do: [
            { id: "jug", to: { o: 0 }, dur: 400 }, { id: "aid", to: { o: 1 }, at: 300, dur: 300 }, { id: "aid", path: "M80 30L80 56", at: 600, dur: 900 }, { id: "aid", to: { r: -8 }, at: 600, dur: 900 },
            { emit: "spark", where: [80, 56], spread: [20, 8], n: 6, at: 1600, dur: 500, life: 1200 }
          ] },
          { caption: "خون دماغ شد؟ می‌نشینیم، کمی به جلو خم می‌شویم و نرمی بینی را فشار می‌دهیم. بزرگ‌تر کنارمان است.", key: 6000, hold: 9000, do: [
            { id: "panel", to: { o: 0 }, dur: 400 }, { id: "knee", to: { o: 0 }, dur: 400 }, { id: "aid", to: { o: 0 }, dur: 400 },
            { id: "room", to: { o: 1 }, dur: 600 }, { id: "boy", to: { o: 0 }, dur: 400 }, { id: "cushion", to: { o: 1 }, at: 400, dur: 400 }, { id: "girl", to: { o: 1 }, at: 400, dur: 400 },
            { id: "dad", to: { x: 96 }, dur: 1 }
          ].concat(B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1), B.hpose("dad", "h-dad", { upper: 0, armF: [0.2, -21] }, 0, 400),
            B.hpose("girl", "h-girl", { upper: 20, armF: [11.3, -25.2], head: 10 }, 1000, 800), [
            { id: "tissue", to: { o: 1 }, at: 1800, dur: 200 },
            { id: "counter", to: { o: 1 }, at: 2200, dur: 300 }, { count: "counter", from: 1, to: 10, at: 2400, dur: 6000 },
            { id: "girl.eye", to: { o: 0 }, at: 2400, dur: 300 }, { id: "girl.shut", to: { o: 1 }, at: 2400, dur: 300 }
          ]) },
          { caption: "سرمان به جایی خورد؟ یک پارچه سرد رویش می‌گذاریم و به بزرگ‌تر می‌گوییم.", key: 3400, hold: 5600, do: [
            { id: "counter", to: { o: 0 }, dur: 300 }, { id: "tissue", to: { o: 0 }, dur: 300 }, { id: "girl", to: { o: 0 }, dur: 400 }, { id: "cushion", to: { o: 0 }, dur: 400 },
            { id: "kidF", to: { o: 1 }, at: 300, dur: 400 }, { id: "dad", to: { x: 140 }, dur: 1 }
          ].concat(B.hpose("kidF", "h-boy-front", { armR: [2.4, -31.6, -1] }, 800, 700), [
            { id: "cloth", to: { o: 1 }, at: 1400, dur: 300 },
            { id: "kidF.pupils", to: { o: 0 }, at: 1700, dur: 300 }, { id: "kidF.shut", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "dad.head", to: { r: 10 }, at: 2200, dur: 1400, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "order", prompt: "زخم کوچک: به ترتیب بچین", numbered: true,
        items: [{ pic: "🗣️", label: "به بزرگ‌تر می‌گوییم" }, { pic: "💧", label: "با آب تمیز می‌شوییم" }, { pic: "🩹", label: "چسب زخم می‌زنیم" }] },
      { type: "order", prompt: "خون دماغ: به ترتیب بچین", numbered: true,
        items: [{ pic: "🪑", label: "می‌نشینیم" }, { pic: "🙇", label: "کمی به جلو خم می‌شویم" }, { pic: "👃", label: "نرمی بینی را فشار می‌دهیم" }, { pic: "🔟", label: "آرام تا ده می‌شماریم و صبر می‌کنیم" }] },
      { type: "choose", prompt: "وقتی خون دماغ می‌شویم، سرمان را چطور نگه می‌داریم؟", say: "وقتی خون دماغ می‌شویم، سرمان را چطور نگه می‌داریم؟", stack: true,
        options: ["🙇 کمی به جلو", "🙆 رو به عقب، بالا"], answer: "🙇 کمی به جلو" },
      { type: "forparents",
        tips: [
          "خراش کوچک: دست‌ها را بشویید، زخم را با آب تمیز روان بشویید، آرام خشک کنید و با چسب زخم یا گاز تمیز بپوشانید. اگر زخم عمیق است، خونریزی بند نمی‌آید، یا قرمز و داغ و دردناک شد، به پزشک مراجعه کنید.",
          "خون دماغ: کودک بنشیند، کمی به جلو خم شود (نه به عقب) و نرمی بینی را ۱۰ تا ۱۵ دقیقه پیوسته فشار دهد و از دهان نفس بکشد. اگر بعد از ۲۰ دقیقه بند نیامد یا بعد از ضربه به سر بود، به پزشک یا اورژانس ۱۱۵ زنگ بزنید.",
          "ضربه و ورم: یک پارچه سرد یا یخ پیچیده در پارچه (نه یخ مستقیم) را چند دقیقه رویش بگذارید. اگر بعد از ضربه به سر کودک خواب‌آلود شد، استفراغ کرد یا گیج بود، فوراً با ۱۱۵ تماس بگیرید.",
          "به کودک بگویید هر زخم و ضربه‌ای را به بزرگ‌تر بگوید. خودتان آرام باشید؛ آرامش شما به کودک هم آرامش می‌دهد."
        ] }
    ]
  },
  {
    id: "health-sprout-25", subject: "health", level: "sprout", emoji: "☀️", title: "آفتاب و گرما",
    steps: [
      /* A hot day in the park: the boy puts on his sun hat; drinks water although he is not thirsty yet; plays in the
         shade of the tree; and at midday, when the sun is strongest, rests on the bench in the shade. Drawings:
         js/art/rig-health.js. */
      { type: "scene", prompt: "به یک روز گرم نگاه کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, shade: { art: "h-shade", at: [20, 74], s: 1.3, o: 0 }, bench: { art: "h-bench", at: [26, 80], s: 1.1, o: 0 },
          glass: { art: "h-glass", at: [104, 88], s: 1.1, o: 0 }, ball: { art: "ball-side", at: [130, 88], s: 1.1 },
          boy: { art: "h-boy", at: [90, 88], s: 1.4 }, hatOn: { art: "h-sunhat", at: [1.2, -31.6], s: 0.7, under: "boy", o: 0 }, hat: { art: "h-sunhat", at: [116, 70], s: 0.8 }
        },
        scenes: [
          { caption: "روزهای گرم، کلاه سرمان می‌گذاریم.", key: 3200, hold: 5000, do: [].concat(B.hpose("boy", "h-boy", { upper: 30, armF: [16, -16] }, 300, 600), [
            { id: "hat", path: "M116 70Q100 40 91.3 49.2", at: 1000, dur: 1200 }, { id: "hat", to: { s: 0.95 }, at: 1000, dur: 1200 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [2, -33] }, 1000, 1200), B.hpose("boy", "h-boy", { armF: [0.2, -12] }, 2400, 500), [
            { id: "hat", to: { o: 0 }, at: 2200, dur: 1 }, { id: "hatOn", to: { o: 1 }, at: 2200, dur: 1 },
            { emit: "spark", where: [92, 46], spread: [10, 6], n: 4, at: 2300, dur: 400, life: 1100 }
          ]) },
          { caption: "زیاد آب می‌نوشیم، حتی پیش از آن‌که تشنه شویم.", key: 3600, hold: 5600, do: [
            { id: "glass", to: { o: 1 }, dur: 400 }, { id: "glass.water", to: { sy: 1 }, dur: 1 }
          ].concat(B.hpose("boy", "h-boy", { upper: 35, armF: [12, -2] }, 400, 600), [
            { id: "glass", to: { o: 0 }, at: 1000, dur: 100 }, { id: "boy.glass", to: { o: 1 }, at: 1000, dur: 100 }
          ], B.hpose("boy", "h-boy", { upper: 0, armF: [5.8, -26.6], head: -14 }, 1000, 700), [
            { id: "boy.shut", to: { o: 1 }, at: 1800, dur: 200 }, { id: "boy.eye", to: { o: 0 }, at: 1800, dur: 200 },
            { id: "boy.shut", to: { o: 0 }, at: 4200, dur: 200 }, { id: "boy.eye", to: { o: 1 }, at: 4200, dur: 200 },
            { id: "boy.glass", to: { o: 0 }, at: 4600, dur: 200 }
          ], B.hpose("boy", "h-boy", { armF: [0.2, -12], head: 0 }, 4600, 500)) },
          { caption: "در سایه بازی می‌کنیم، نه زیر آفتاب داغ.", key: 4200, hold: 6000, do: [
            { id: "shade", to: { o: 1 }, dur: 600 },
            { id: "boy", to: { flip: -1 }, at: 300, dur: 1 }, { id: "boy", walk: [30, 88], at: 400, dur: 2600 },
            { id: "ball", path: "M130 88Q80 50 40 88", at: 600, dur: 2400 }, { id: "ball", to: { r: -720 }, at: 600, dur: 2400 },
            { id: "boy.legF", to: { r: -40 }, at: 3600, dur: 300 }, { id: "boy.legF", to: { r: 0 }, at: 4000, dur: 300 },
            { id: "ball", path: "M40 88Q30 76 18 88", at: 3800, dur: 900 }
          ] },
          { caption: "ظهر که آفتاب خیلی داغ است، در سایه استراحت می‌کنیم.", key: 4400, hold: 6400, do: [
            { id: "bench", to: { o: 1 }, dur: 500 },
            { emit: "spark", where: [138, 14], spread: [20, 14], n: 6, at: 300, dur: 1200, life: 1200 },
            { id: "boy", to: { flip: 1, x: 22 }, at: 600, dur: 1 }, { id: "boy", to: { y: 86.4 }, at: 700, dur: 600 }
          ].concat(B.hpose("boy", "h-boy", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 700, 600), [
            { id: "boy.shut", to: { o: 1 }, at: 1800, dur: 300 }, { id: "boy.eye", to: { o: 0 }, at: 1800, dur: 300 },
            { id: "boy.upper", to: { sy: 1.03 }, at: 2000, dur: 4000, yoyo: true, times: 4, ease: "soft" }
          ]) }
        ] },
      { type: "choose", prompt: "روز گرم تابستان است و می‌خواهی بیرون بازی کنی. چه با خودت می‌بری؟", say: "روز گرم تابستان است و می‌خواهی بیرون بازی کنی. چه با خودت می‌بری؟", stack: true,
        options: ["🧢💧 کلاه و بطری آب", "🧣🧤 شال‌گردن و دستکش"], answer: "🧢💧 کلاه و بطری آب" },
      { type: "choose", prompt: "ظهر هوا خیلی داغ است. کجا بازی کنیم؟", say: "ظهر هوا خیلی داغ است. کجا بازی کنیم؟", stack: true,
        options: ["🌳 در سایه یا داخل خانه", "☀️ زیر آفتاب"], answer: "🌳 در سایه یا داخل خانه" },
      { type: "choose", prompt: "کی آب می‌نوشیم؟", say: "کی آب می‌نوشیم؟", stack: true,
        options: ["💧 چند بار در روز، حتی پیش از تشنه شدن", "🥤 فقط وقتی خیلی تشنه‌ایم"], answer: "💧 چند بار در روز، حتی پیش از تشنه شدن" },
      { type: "forparents",
        tips: [
          "در روزهای گرم، کودک کلاه لبه‌دار و لباس روشن و گشاد بپوشد و در سایه بازی کند. بین ساعت ۱۱ تا ۱۶ از بازی طولانی زیر آفتاب پرهیز کنید.",
          "کودک در گرما زودتر از بزرگ‌ترها کم‌آب می‌شود. هر نیم ساعت آب بدهید، حتی اگر نخواست. نوشابه و نوشیدنی‌های خیلی شیرین جای آب را نمی‌گیرند.",
          "کودک را هرگز، حتی برای یک دقیقه، در ماشین پارک‌شده تنها نگذارید.",
          "اگر کودک بی‌حال، سرخ و داغ شد، سردرد یا تهوع داشت، او را به جای خنک ببرید، آب بدهید و با پارچه خیس خنکش کنید. اگر گیج بود یا بهتر نشد، با ۱۱۵ تماس بگیرید."
        ] }
    ]
  },

  // ---------------- Health: Sapling ----------------
  {
    id: "health-sapling-5", subject: "health", level: "sapling", emoji: "🦠", title: "میکروب‌ها سفر می‌کنند",
    steps: [
      /* Germs drawn much bigger than life, friendly: they go from the girl's hand to the boy's in a handshake; a sneeze
         into the air spreads them; they sit in cloudy water and on an unwashed apple; then four ways to stop them, each
         with a green shield, and the germs fade. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین میکروب‌ها چطور سفر می‌کنند", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, girl: { art: "h-girl", at: [52, 88], s: 1.4 }, boy: { art: "h-boy", at: [82, 88], s: 1.4, flip: true },
          g1: { art: "h-germ", at: [72, 52], s: 1.2, o: 0 }, g2: { art: "h-germ", at: [72, 52], s: 1, o: 0 }, g3: { art: "h-germ", at: [72, 52], s: 1.1, o: 0 }, g4: { art: "h-germ", at: [72, 52], s: 0.9, o: 0 },
          panel: { art: "h-panel", o: 0 }, glass: { art: "h-glass", at: [50, 70], s: 3, o: 0 }, apple: { art: "🍎", at: [112, 72], s: 1.4, o: 0 },
          w1: { art: "h-germ", at: [48, 52], o: 0 }, w2: { art: "h-germ", at: [54, 58], o: 0 }, w3: { art: "h-germ", at: [106, 52], o: 0 }, w4: { art: "h-germ", at: [116, 60], o: 0 },
          i1: { art: "🧼", at: [32, 56], s: 0.9, o: 0 }, i2: { art: "💪", at: [64, 56], s: 0.9, o: 0 }, i3: { art: "💧", at: [96, 56], s: 0.9, o: 0 }, i4: { art: "🍎", at: [128, 56], s: 0.9, o: 0 },
          s1: { art: "h-shield", at: [32, 66], s: 1.4, o: 0 }, s2: { art: "h-shield", at: [64, 66], s: 1.4, o: 0 }, s3: { art: "h-shield", at: [96, 66], s: 1.4, o: 0 }, s4: { art: "h-shield", at: [128, 66], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "میکروب‌ها آن‌قدر کوچک‌اند که دیده نمی‌شوند. از راه دست‌ها از یک نفر به دیگری می‌روند.", key: 4200, hold: 6600, do: [
            { id: "girl.germs", to: { o: 1, s: 1.6 }, at: 300, dur: 500 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9.6, -17] }, 1000, 700), B.hpose("boy", "h-boy", { armF: [9.6, -17] }, 1000, 700), [
            { id: "girl.foreF", to: { r: "+10" }, at: 1800, dur: 1600, yoyo: true, times: 4 }, { id: "boy.foreF", to: { r: "+10" }, at: 1800, dur: 1600, yoyo: true, times: 4 },
            { id: "boy.germs", to: { o: 1, s: 1.6 }, at: 2800, dur: 800 }
          ]) },
          { caption: "با عطسه و سرفه هم در هوا پخش می‌شوند.", key: 2600, hold: 5000, do: B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 0, 500).concat(B.hpose("boy", "h-boy", { armF: [0.2, -12] }, 0, 500), [
            { id: "boy.head", to: { r: 16 }, at: 600, dur: 600 }, { id: "boy.head", to: { r: -14 }, at: 1300, dur: 250 },
            { id: "boy.mouth", to: { o: 0 }, at: 1300, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 1300, dur: 100 },
            { id: "g1", to: { o: 1 }, at: 1400, dur: 100 }, { id: "g1", path: "M72 52L46 40", at: 1400, dur: 1200, ease: "out" },
            { id: "g2", to: { o: 1 }, at: 1400, dur: 100 }, { id: "g2", path: "M72 52L40 54", at: 1400, dur: 1200, ease: "out" },
            { id: "g3", to: { o: 1 }, at: 1450, dur: 100 }, { id: "g3", path: "M72 52L52 30", at: 1450, dur: 1200, ease: "out" },
            { id: "g4", to: { o: 1 }, at: 1500, dur: 100 }, { id: "g4", path: "M72 52L34 46", at: 1500, dur: 1200, ease: "out" },
            { id: "boy.open", to: { o: 0 }, at: 2800, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 2800, dur: 100 }, { id: "boy.head", to: { r: 0 }, at: 2800, dur: 400 }
          ]) },
          { caption: "از آب آلوده و از میوه و سبزی نشسته هم به بدن می‌رسند.", key: 2600, hold: 5000, do: [
            { id: "g1", to: { o: 0 }, dur: 300 }, { id: "g2", to: { o: 0 }, dur: 300 }, { id: "g3", to: { o: 0 }, dur: 300 }, { id: "g4", to: { o: 0 }, dur: 300 },
            { id: "panel", to: { o: 1 }, at: 200, dur: 500 }, { id: "glass", to: { o: 1 }, at: 500, dur: 400 }, { id: "apple", to: { o: 1 }, at: 500, dur: 400 },
            { id: "w1", to: { o: 1 }, at: 1100, dur: 300 }, { id: "w2", to: { o: 1 }, at: 1300, dur: 300 }, { id: "w3", to: { o: 1 }, at: 1600, dur: 300 }, { id: "w4", to: { o: 1 }, at: 1800, dur: 300 },
            { id: "w1", to: { y: "-3" }, at: 2100, dur: 2400, yoyo: true, times: 4 }, { id: "w4", to: { y: "-3" }, at: 2200, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "چهار راه برای ایستاندن آن‌ها: شستن دست، عطسه در آرنج، آب سالم، و شستن میوه و سبزی.", key: 5600, hold: 7400, do: [
            { id: "glass", to: { o: 0 }, dur: 400 }, { id: "apple", to: { o: 0 }, dur: 400 },
            { id: "w1", to: { o: 0 }, dur: 400 }, { id: "w2", to: { o: 0 }, dur: 400 }, { id: "w3", to: { o: 0 }, dur: 400 }, { id: "w4", to: { o: 0 }, dur: 400 },
            { id: "i1", to: { o: 1 }, at: 500, dur: 400 }, { id: "s1", to: { o: 1 }, at: 900, dur: 400 },
            { id: "i2", to: { o: 1 }, at: 1700, dur: 400 }, { id: "s2", to: { o: 1 }, at: 2100, dur: 400 },
            { id: "i3", to: { o: 1 }, at: 2900, dur: 400 }, { id: "s3", to: { o: 1 }, at: 3300, dur: 400 },
            { id: "i4", to: { o: 1 }, at: 4100, dur: 400 }, { id: "s4", to: { o: 1 }, at: 4500, dur: 400 },
            { emit: "spark", where: [80, 60], spread: [110, 20], n: 10, at: 5000, dur: 900, life: 1300 }
          ] }
        ] },
      { type: "choose", prompt: "میکروب‌ها از کدام راه از یک نفر به دیگری می‌روند؟", say: "میکروب‌ها از کدام راه از یک نفر به دیگری می‌روند؟", stack: true,
        options: ["🤝 دست‌ها، عطسه و سرفه، آب و غذا", "🌈 رنگین‌کمان", "📚 کتاب خواندن"], answer: "🤝 دست‌ها، عطسه و سرفه، آب و غذا" },
      { type: "choose", prompt: "دستمال نداری و عطسه‌ات می‌آید. چه کار می‌کنی؟", say: "دستمال نداری و عطسه‌ات می‌آید. چه کار می‌کنی؟", stack: true,
        options: ["💪 در آرنجم عطسه می‌کنم", "✋ در دستم عطسه می‌کنم", "🤧 در هوا عطسه می‌کنم"], answer: "💪 در آرنجم عطسه می‌کنم" },
      { type: "doit", pic: "✨", text: "آزمایش اکلیل با بزرگ‌ترت: کمی اکلیل یا آرد کف دستت بریز؛ این‌ها «میکروب»‌اند!", list: ["با یک نفر دست بده: ببین «میکروب»‌ها به دست او هم رفتند؟", "به دستگیره در دست بزن: آن‌جا هم رفتند؟", "حالا فقط با آب بشوی. همه رفتند؟", "حالا با آب و صابون بشوی و بیست ثانیه بمال."] },
      { type: "forparents",
        tips: [
          "میکروب‌ها از چهار راه اصلی پخش می‌شوند: دست‌ها، عطسه و سرفه، آب آلوده و غذای آلوده. و چهار کار ساده جلویشان را می‌گیرد: شستن دست با صابون، پوشاندن عطسه و سرفه، آب سالم، شستن و پختن درست غذا.",
          "آزمایش اکلیل یا آرد نشان می‌دهد چیزهایی که دیده نمی‌شوند چطور با دست جابه‌جا می‌شوند و چرا صابون لازم است. بعدش با هم جای کار را تمیز کنید.",
          "به کودک بگویید میکروب‌ها همه بد نیستند و بدن ما هم از خودش دفاع می‌کند. هدف ترساندن نیست؛ هدف عادت به کارهای ساده است."
        ] }
    ]
  },
  {
    id: "health-sapling-6", subject: "health", level: "sapling", emoji: "🍏", title: "آب سالم، غذای تمیز",
    steps: [
      /* In the kitchen: the girl washes an apple under the tap; puts a cover over the dish of food on the table; her
         mother puts the leftover food in the fridge; and they drink safe water poured from a jug of boiled, cooled
         water. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به آشپزخانه نگاه کن", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, sink: { art: "h-sink-side", at: [44, 88], s: 1.3 }, table: { art: "h-table", at: [92, 88], s: 1.3 },
          fridge: { art: "h-fridge", at: [140, 88], s: 1.3 }, open: { art: "h-fridge-open", at: [140, 88], s: 1.3, o: 0 },
          jug: { art: "h-jug", at: [100, 63.3], s: 0.9, o: 0 }, glass: { art: "h-glass", at: [90, 63.3], s: 1, o: 0 },
          mom: { art: "h-mom-home", at: [118, 88], s: 1.15, flip: true },
          dish: { art: "🍲", at: [92, 63.3], s: 0.6 }, cover: { art: "h-cover", at: [80, 40], s: 1.1, o: 0 }, girl: { art: "h-girl", at: [26, 88], s: 1.4 },
          apple: { art: "🍎", at: [37, 51], s: 0.55, o: 0 }
        },
        scenes: [
          { caption: "میوه و سبزی را پیش از خوردن با آب تمیز می‌شوییم.", key: 3400, hold: 6000, do: B.hpose("girl", "h-girl", { armF: [9.4, -26], armB: [9, -26.4] }, 300, 700).concat([
            { id: "sink.water", to: { o: 1 }, at: 700, dur: 300 }, { id: "apple", to: { o: 1 }, at: 900, dur: 300 },
            { id: "apple", to: { r: 360 }, at: 1200, dur: 3000 },
            { emit: "drop", where: [36, 56], spread: [8, 4], rise: 8, n: 14, at: 1200, dur: 3000, life: 700 },
            { id: "girl.foreF", to: { r: "+10" }, at: 1200, dur: 3000, yoyo: true, times: 8 },
            { id: "sink.water", to: { o: 0 }, at: 4400, dur: 300 }
          ]) },
          { caption: "روی غذا را می‌پوشانیم تا گرد و خاک و حشره رویش ننشیند.", key: 3600, hold: 5400, do: [
            { id: "apple", to: { o: 0 }, dur: 300 }, { id: "girl", walk: [70, 88], at: 300, dur: 1800 }
          ].concat(B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 0, 400), B.hpose("girl", "h-girl", { armF: [12, -30] }, 2200, 500), [
            { id: "cover", to: { o: 1 }, at: 2400, dur: 300 }, { id: "cover", path: "M86 40L92 63.3", at: 2700, dur: 800 }
          ]) },
          { caption: "غذای مانده را زود در یخچال می‌گذاریم تا سرد بماند و خراب نشود.", key: 3600, hold: 6000, do: B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 0, 400).concat([
            { id: "mom", walk: [108, 88], at: 0, dur: 1000 }
          ], B.hpose("mom", "h-mom-home", { upper: 14, armF: [16, -26], armB: [15, -27] }, 1000, 500), [
            { id: "dish", path: "M92 63.3L101 58", at: 1500, dur: 400 }, { id: "cover", path: "M92 63.3L101 58", at: 1500, dur: 400 },
            { id: "mom", to: { sx: -1 }, at: 2000, dur: 150 },
            { id: "dish", path: "M101 58L115 58", at: 2000, dur: 150 }, { id: "cover", path: "M101 58L115 58", at: 2000, dur: 150 },
            { id: "mom", walk: [116, 88], at: 2200, dur: 1000 },
            { id: "dish", path: "M115 58L123 58", at: 2200, dur: 1000, ease: "linear" }, { id: "cover", path: "M115 58L123 58", at: 2200, dur: 1000, ease: "linear" },
            { id: "open", to: { o: 1 }, at: 2600, dur: 400 },
            { id: "dish", path: "M123 58L138 64", at: 3300, dur: 600 }, { id: "cover", path: "M123 58L138 64", at: 3300, dur: 600 },
            { id: "dish", to: { o: 0 }, at: 4200, dur: 200 }, { id: "cover", to: { o: 0 }, at: 4200, dur: 200 }, { id: "open", to: { o: 0 }, at: 4200, dur: 400 }
          ], B.hpose("mom", "h-mom-home", { upper: 0, armF: [0.2, -21], armB: [0.2, -21] }, 4300, 500)) },
          { caption: "آب سالم می‌نوشیم: آب لوله‌کشی سالم، یا آبی که جوشیده و سرد شده است.", key: 4600, hold: 6600, do: [
            { id: "jug", to: { o: 1 }, dur: 400 }, { id: "glass", to: { o: 1 }, dur: 400 }, { id: "glass.water", to: { sy: 0 }, dur: 1 },
            { id: "jug", to: { r: -50 }, at: 700, dur: 600 }, { id: "glass.water", to: { sy: 1 }, at: 1100, dur: 900 }, { id: "jug", to: { r: 0 }, at: 2100, dur: 500 }
          ].concat(B.hpose("girl", "h-girl", { armF: [12, -24] }, 2600, 500), [
            { id: "glass", path: "M90 63.3L86 50", at: 3100, dur: 600 },
            { id: "girl.eye", to: { o: 0 }, at: 3700, dur: 200 }, { id: "girl.shut", to: { o: 1 }, at: 3700, dur: 200 }
          ]) }
        ] },
      { type: "sort", prompt: "کدام کار غذا و آب را سالم نگه می‌دارد و کدام نه؟",
        baskets: [{ label: "سالم نگه می‌دارد", pic: "✅", value: "ok" }, { label: "خطرناک است", pic: "⚠️", value: "bad" }],
        items: [
          { pic: "🚰", say: "شستن میوه با آب تمیز", basket: "ok" }, { pic: "🍲", say: "پوشاندن روی غذا", basket: "ok" }, { pic: "🧊", say: "غذای مانده در یخچال", basket: "ok" },
          { pic: "🍎", say: "خوردن میوه نشسته", basket: "bad" }, { pic: "☀️", say: "غذای مانده بیرون، زیر آفتاب", basket: "bad" }, { pic: "🏞️", say: "نوشیدن آب رودخانه", basket: "bad" }
        ] },
      { type: "choose", prompt: "در گردش، تشنه‌ای و کنار یک جوی آب هستی. چه کار می‌کنی؟", say: "در گردش، تشنه‌ای و کنار یک جوی آب هستی. چه کار می‌کنی؟", stack: true,
        options: ["🧴 از بطری آب سالمی که آورده‌ایم می‌نوشم", "🏞️ از آب جوی می‌نوشم"], answer: "🧴 از بطری آب سالمی که آورده‌ایم می‌نوشم" },
      { type: "choose", prompt: "غذای ظهر مانده است. کجا بگذاریم؟", say: "غذای ظهر مانده است. کجا بگذاریم؟", stack: true,
        options: ["🧊 زود در یخچال", "🪟 کنار پنجره تا شب"], answer: "🧊 زود در یخچال" },
      { type: "forparents",
        tips: [
          "میوه و سبزی را زیر آب روان بشویید؛ سبزی خوردن را پس از شستن در آب و ماده ضدعفونی‌کننده مناسب طبق دستور روی بسته بخیسانید و دوباره آب بکشید.",
          "غذای پخته را بیش از دو ساعت بیرون نگذارید (در هوای گرم کمتر). باقی‌مانده را زود در یخچال بگذارید و فقط یک بار دوباره گرم کنید.",
          "اگر به آب لوله‌کشی مطمئن نیستید، آن را دست‌کم یک دقیقه بجوشانید و در ظرف دربسته تمیز نگه دارید. در گردش آب سالم همراه ببرید.",
          "دست‌ها را پیش از آماده کردن غذا بشویید و تخته و چاقوی گوشت خام را جدا نگه دارید."
        ] }
    ]
  },
  {
    id: "health-sapling-7", subject: "health", level: "sapling", emoji: "🦷", title: "دندان تازه",
    steps: [
      /* Close-ups of a row of lower teeth: the loose milk tooth falls out and the new tooth grows in its place (with a
         sparkle: it stays for life); brushing every side seen from above, and a grown-up's floss going between two
         teeth; sugar between meals leaves a small brown spot; then the dentist looks at the girl's teeth. Nothing
         hurts. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به دندان‌ها نگاه کن", bg: "#fffaf0",
        parts: {
          panel: { art: "h-panel" }, row: { art: "h-teethrow" }, sugar: { art: "h-sugar", at: [124, 30], s: 1.4, o: 0 },
          arch: { art: "h-arch", o: 0 }, brushT: { art: "h-brushT", at: [56, 76], o: 0 },
          room: { art: "h-bedroom", o: 0 }, girlF: { art: "h-girl-front", at: [70, 88], s: 1.6, o: 0 }, dentist: { art: "h-doctor", at: [100, 88], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "دندان‌های شیری کم‌کم لق می‌شوند و می‌افتند، و دندان تازه جایشان درمی‌آید.", key: 4600, hold: 6400, do: [
            { id: "row.milk", to: { r: 8 }, at: 400, dur: 1600, yoyo: true, times: 6 },
            { id: "row.milk", path: "M0 0Q8 20 10 50", at: 2200, dur: 900, ease: "in" }, { id: "row.milk", to: { o: 0 }, at: 2800, dur: 300 },
            { id: "row.grown", to: { y: 12 }, dur: 1 }, { id: "row.grown", to: { o: 1 }, at: 3300, dur: 300 }, { id: "row.grown", to: { y: 0 }, at: 3300, dur: 1400, ease: "out" }
          ] },
          { caption: "دندان‌های تازه تا آخر عمر با ما می‌مانند. پس خوب از آن‌ها مراقبت می‌کنیم.", key: 2000, hold: 4400, do: [
            { emit: "spark", where: [80, 40], spread: [16, 16], n: 8, at: 300, dur: 1000, life: 1400 }
          ] },
          { caption: "همه طرف هر دندان را مسواک می‌زنیم: بیرون، داخل و رویشان.", key: 3000, hold: 5200, do: [
            { id: "row", to: { o: 0 }, dur: 400 }, { id: "arch", to: { o: 1 }, at: 300, dur: 500 }, { id: "brushT", to: { o: 1 }, at: 600, dur: 300 },
            { id: "arch.dirtIn", to: { o: 0 }, at: 800, dur: 3600 }, { id: "arch.dirtTop", to: { o: 0 }, at: 800, dur: 3600 },
            { emit: "bubble", where: [80, 50], spread: [44, 40], rise: -3, n: 12, at: 800, dur: 3600, life: 1000 }
          ].concat(B.hloops("brushT", [56, 76], [57, 44], 3, 1.8, 800, 1200), B.hloops("brushT", [62, 34], [98, 34], 3, 1.8, 2000, 1200), B.hloops("brushT", [103, 44], [104, 76], 3, 1.8, 3200, 1200)) },
          { caption: "لای دندان‌ها را هم نخ دندان می‌کشیم.", key: 2000, hold: 4400, do: [
            { id: "arch", to: { o: 0 }, dur: 400 }, { id: "brushT", to: { o: 0 }, dur: 300 }, { id: "row", to: { o: 1 }, at: 100, dur: 400 },
            { id: "row.floss", to: { o: 1 }, at: 600, dur: 300 }, { id: "row.floss", to: { y: 6 }, at: 900, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "خوراکی و نوشیدنی شیرین بین وعده‌ها به دندان آسیب می‌زند. بعدش آب می‌نوشیم و دهانمان را آب می‌کشیم.", key: 3600, hold: 6000, do: [
            { id: "row.floss", to: { o: 0 }, dur: 300 },
            { id: "sugar", to: { o: 1 }, at: 300, dur: 400 }, { id: "sugar", path: "M124 30L110 34", at: 800, dur: 900 },
            { id: "row.spot", to: { o: 1 }, at: 1800, dur: 900 },
            { emit: "drop", where: [104, 24], spread: [16, 4], rise: 14, n: 10, at: 3400, dur: 1400, life: 700 },
            { id: "sugar", to: { o: 0 }, at: 3300, dur: 400 }
          ] },
          { caption: "سالی یک یا دو بار به دندان‌پزشک می‌رویم تا دندان‌هایمان را نگاه کند.", key: 3600, hold: 5600, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "row", to: { o: 0 }, dur: 500 }, { id: "room", to: { o: 1 }, dur: 500 },
            { id: "girlF", to: { o: 1 }, at: 300, dur: 500 }, { id: "dentist", to: { o: 1 }, at: 300, dur: 500 },
            { id: "girlF.mouth", to: { o: 0 }, at: 1500, dur: 100 }, { id: "girlF.open", to: { o: 1, s: 1.6 }, at: 1500, dur: 300 }
          ].concat(B.hpose("dentist", "h-doctor", { upper: 25, armF: [16, -34] }, 1500, 700), [
            { id: "dentist.head", to: { r: 10 }, at: 2400, dur: 2400, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "order", prompt: "مسواک شب را به ترتیب بچین", numbered: true,
        items: [{ pic: "🪥", label: "خمیردندان، اندازه نخود" }, { pic: "😁", label: "بیرون دندان‌ها" }, { pic: "🦷", label: "پشت و روی دندان‌ها" }, { pic: "🧵", label: "نخ دندان با کمک بزرگ‌تر" }, { pic: "💦", label: "تف کردن" }] },
      { type: "choose", prompt: "دندان شیری‌ات لق شده. چه کار می‌کنی؟", say: "دندان شیری‌ات لق شده. چه کار می‌کنی؟", stack: true,
        options: ["🙂 به بزرگ‌ترم می‌گویم؛ خودش کم‌کم می‌افتد", "😨 می‌ترسم و مسواک نمی‌زنم"], answer: "🙂 به بزرگ‌ترم می‌گویم؛ خودش کم‌کم می‌افتد" },
      { type: "choose", prompt: "کدام برای دندان‌ها بهتر است؟", say: "کدام برای دندان‌ها بهتر است؟", stack: true,
        options: ["💧 آب نوشیدن بین وعده‌ها", "🍭 آب‌نبات مکیدن تمام بعدازظهر"], answer: "💧 آب نوشیدن بین وعده‌ها" },
      { type: "doit", pic: "🪞", text: "جلوی آینه دهانت را باز کن و دندان‌هایت را بشمار. کدام‌ها تازه‌اند؟ امشب با بزرگ‌ترت همه طرف دندان‌ها را مسواک بزن." },
      { type: "forparents",
        tips: [
          "دندان‌های شیری از حدود شش سالگی می‌افتند و دندان‌های دائمی جایشان می‌آیند. دندان آسیاب اول دائمی (حدود شش سالگی) پشت دندان‌های شیری درمی‌آید و خیلی‌ها متوجهش نمی‌شوند؛ از آن خوب مراقبت کنید.",
          "روزی دو بار با خمیردندان فلوئوردار مسواک بزنید و تا حدود هشت سالگی بعد از کودک خودتان هم نگاه کنید. نخ دندان را با کمک شما انجام دهد.",
          "تعداد دفعه‌های خوردن شیرینی مهم‌تر از مقدار آن است. خوراکی و نوشیدنی شیرین را به وقت غذا محدود کنید و بین وعده‌ها آب بدهید.",
          "سالی یک یا دو بار به دندان‌پزشک یا مرکز بهداشت بروید؛ وارنیش فلوراید و شیارپوش (فیشور سیلانت) دندان‌های تازه را محافظت می‌کنند."
        ] }
    ]
  },
  {
    id: "health-sapling-8", subject: "health", level: "sapling", emoji: "🤒", title: "وقتی مریض می‌شوم",
    steps: [
      /* Calm: the girl tells her mother she feels unwell and her mother takes her temperature; she rests in bed with
         a glass of water; her mother measures the medicine in its own measuring cup, the amount the doctor said; at
         school a friend offers a snack and a girl with an allergy says «نه، مرسی» and has her own snack. Drawings:
         js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#dfe8f6",
        parts: {
          room: { art: "h-bedroom" }, bed: { art: "h-bed", at: [104, 88], s: 1.3 }, sleeper: { art: "h-girl", at: [120, 68.4], s: 1.3, r: -90, o: 0 }, blanket: { art: "h-blanket", at: [104, 88], s: 1.3, o: 0 },
          table: { art: "h-table", at: [146, 88], s: 1 }, glass: { art: "h-glass", at: [146, 69], s: 1, o: 0 },
          bottle: { art: "h-bottle", at: [150, 69], s: 0.9, o: 0 }, cup: { art: "h-dosecup", at: [140, 69], s: 1, o: 0 },
          mom: { art: "h-mom-home", at: [70, 88], s: 1.15, flip: true }, girl: { art: "h-girl", at: [44, 88], s: 1.4 },
          thermo: { art: "🌡️", at: [60, 52], s: 0.35, o: 0 }, talk: { art: "h-talk", at: [52, 52], s: 1.2, o: 0 },
          school: { art: "w-yard-tabriz", o: 0 }, boy: { art: "h-boy", at: [60, 88], s: 1.4, o: 0 }, friend: { art: "h-girl-front", at: [98, 86], s: 1.5, o: 0 },
          nuts: { art: "🥜", at: [76.8, 66], s: 0.4, o: 0 }, own: { art: "🍎", at: [108, 64], s: 0.4, o: 0 }
        },
        scenes: [
          { caption: "وقتی حالمان خوب نیست، به بزرگ‌ترمان می‌گوییم.", key: 3600, hold: 5800, do: B.hpose("girl", "h-girl", { armF: [3, -15.6], head: 12 }, 200, 600).concat([
            { id: "talk", to: { o: 1 }, at: 800, dur: 200 }, { id: "talk", to: { s: 1.4 }, at: 800, dur: 1600, yoyo: true, times: 4 }, { id: "talk", to: { o: 0 }, at: 2500, dur: 300 }
          ], B.hpose("mom", "h-mom-home", { upper: 25, armF: [17, -30] }, 2600, 700), [
            { id: "thermo", to: { o: 1 }, at: 3300, dur: 300 }
          ]) },
          { caption: "استراحت می‌کنیم، آب و مایعات می‌نوشیم و در خانه می‌مانیم تا خوب شویم.", key: 3800, hold: 6000, do: [
            { id: "thermo", to: { o: 0 }, dur: 300 }, { id: "girl", to: { o: 0 }, dur: 500 },
            { id: "sleeper", to: { o: 1 }, at: 300, dur: 500 }, { id: "blanket", to: { o: 1 }, at: 300, dur: 500 },
            { id: "glass", to: { o: 1 }, at: 900, dur: 400 },
            { id: "sleeper.eye", to: { o: 0 }, at: 1600, dur: 300 }, { id: "sleeper.shut", to: { o: 1 }, at: 1600, dur: 300 },
            { id: "blanket", to: { sy: 1.05 }, at: 1900, dur: 4000, yoyo: true, times: 4, ease: "soft" }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 0, armF: [0.2, -21] }, 0, 500)) },
          { caption: "دارو را فقط بزرگ‌تر می‌دهد: با پیمانه خودش و همان اندازه‌ای که پزشک گفته.", key: 4200, hold: 6400, do: [
            { id: "bottle", to: { o: 1 }, dur: 400 }, { id: "cup", to: { o: 1 }, dur: 400 }, { id: "cup.dose", to: { sy: 0 }, dur: 1 },
            { id: "mom", walk: [126, 88], at: 400, dur: 1800 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: 20, armF: [16, -26] }, 2300, 600), [
            { id: "bottle", to: { r: -60 }, at: 2900, dur: 500 }, { id: "cup.dose", to: { sy: 1 }, at: 3300, dur: 900 }, { id: "bottle", to: { r: 0 }, at: 4300, dur: 400 },
            { id: "sleeper.eye", to: { o: 1 }, at: 4500, dur: 200 }, { id: "sleeper.shut", to: { o: 0 }, at: 4500, dur: 200 }
          ]) },
          { caption: "بعضی دوستانمان به یک خوراکی حساسیت دارند. وقتی «نه، ممنون» می‌گویند، خوراکی‌مان را به آن‌ها نمی‌دهیم.", key: 2700, hold: 7000, do: [
            { id: "school", to: { o: 1 }, dur: 600 }, { id: "boy", to: { o: 1 }, at: 300, dur: 400 }, { id: "friend", to: { o: 1 }, at: 300, dur: 400 },
            { id: "nuts", to: { o: 1 }, at: 1000, dur: 300 }, { id: "own", to: { o: 1 }, at: 1000, dur: 300 }
          ].concat(B.hpose("boy", "h-boy", { armF: [12, -16] }, 700, 500), B.hpose("friend", "h-girl-front", "stop", 1800, 500), [
            { id: "friend.palmR", to: { o: 1 }, at: 2300, dur: 200 }, { id: "friend.handR", to: { o: 0 }, at: 2300, dur: 200 },
            { id: "friend.mouth", to: { o: 0 }, at: 2400, dur: 100 }, { id: "friend.grin", to: { o: 1 }, at: 2400, dur: 100 }
          ], B.hpose("boy", "h-boy", { armF: [3, -15] }, 3200, 600), [
            { id: "nuts", path: "M76.8 66L64.6 66", at: 3200, dur: 600 }
          ]) }
        ] },
      { type: "choose", prompt: "تب داری و سرت درد می‌کند. چه کار می‌کنی؟", say: "تب داری و سرت درد می‌کند. چه کار می‌کنی؟", stack: true,
        options: ["🛌 به بزرگ‌ترم می‌گویم، استراحت می‌کنم و آب می‌نوشم", "⚽ بیرون می‌روم و فوتبال بازی می‌کنم"], answer: "🛌 به بزرگ‌ترم می‌گویم، استراحت می‌کنم و آب می‌نوشم" },
      { type: "choose", prompt: "قرص‌های دوستت روی میز است. چه کار می‌کنی؟", say: "قرص‌های دوستت روی میز است. چه کار می‌کنی؟", stack: true,
        options: ["🙋 دست نمی‌زنم و به بزرگ‌تر می‌گویم", "💊 یکی می‌خورم چون من هم مریضم"], answer: "🙋 دست نمی‌زنم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "دوستت به بادام‌زمینی حساسیت دارد. تو خوراکی بادام‌زمینی داری. چه کار می‌کنی؟", say: "دوستت به بادام‌زمینی حساسیت دارد. تو خوراکی بادام‌زمینی داری. چه کار می‌کنی؟", stack: true,
        options: ["🚫 به او تعارف نمی‌کنم", "🥜 کمی به او می‌دهم"], answer: "🚫 به او تعارف نمی‌کنم" },
      { type: "forparents",
        tips: [
          "به کودک یاد بدهید هر وقت حالش خوب نیست بگوید. کودک بیمار (تب، اسهال، استفراغ) در خانه استراحت کند تا خوب شود؛ این از دیگران هم مراقبت می‌کند.",
          "دارو را فقط بزرگ‌تر بدهد، با پیمانه یا سرنگ خود دارو، به مقداری که پزشک یا داروساز گفته. داروی بزرگ‌سالان یا داروی کودک دیگر را به کودک ندهید. همه داروها بالا و قفل‌دار.",
          "اگر کودک حساسیت غذایی یا آسم دارد، به معلم و مدرسه بگویید و برنامه کتبی داشته باشید. به همه کودکان یاد بدهید خوراکی را بدون اجازه بزرگ‌تر با دوست حساس قسمت نکنند.",
          "نشانه‌های هشدار را جدی بگیرید: سختی نفس کشیدن، تورم لب و صورت بعد از غذا، بی‌حالی شدید، تشنج. فوراً با ۱۱۵ تماس بگیرید."
        ] }
    ]
  },
  {
    id: "health-sapling-9", subject: "health", level: "sapling", emoji: "🧽", title: "بازی پاکیزگی",
    steps: [
      // The game lesson of the hygiene unit: what stops germs and what spreads them, safe and unsafe food and water,
      // and the steps of brushing and of washing fruit, in order.
      { type: "sort", prompt: "کدام جلوی میکروب را می‌گیرد و کدام آن را پخش می‌کند؟",
        baskets: [{ label: "جلویش را می‌گیرد", pic: "🛡️", value: "stop" }, { label: "پخشش می‌کند", pic: "🦠", value: "spread" }],
        items: [
          { pic: "🧼", say: "شستن دست با صابون", basket: "stop" }, { pic: "💪", say: "سرفه در آرنج", basket: "stop" }, { pic: "🗑️", say: "دستمال در سطل", basket: "stop" },
          { pic: "🥤", say: "نوشیدن از لیوان دوست مریض", basket: "spread" }, { pic: "🤧", say: "عطسه رو به دیگران", basket: "spread" }, { pic: "👃", say: "دست در بینی و بعد خوراکی", basket: "spread" }
        ] },
      { type: "sort", prompt: "کدام غذا و آب سالم است و کدام نه؟",
        baskets: [{ label: "سالم", pic: "✅", value: "ok" }, { label: "سالم نیست", pic: "⚠️", value: "bad" }],
        items: [
          { pic: "🍎", say: "سیب شسته", basket: "ok" }, { pic: "🧊", say: "غذای مانده در یخچال", basket: "ok" }, { pic: "🫗", say: "آب جوشیده و سردشده", basket: "ok" },
          { pic: "🏞️", say: "آب رودخانه", basket: "bad" }, { pic: "🍲", say: "غذایی که از دیروز بیرون مانده", basket: "bad" }
        ] },
      { type: "order", prompt: "مسواک زدن را به ترتیب بچین", numbered: true,
        items: [{ pic: "🪥", label: "خمیردندان، اندازه نخود" }, { pic: "😁", label: "بیرون دندان‌ها" }, { pic: "🦷", label: "داخل و روی دندان‌ها" }, { pic: "👅", label: "زبان" }, { pic: "💦", label: "تف کردن" }] },
      { type: "order", prompt: "شستن میوه را به ترتیب بچین", numbered: true,
        items: [{ pic: "🧼", label: "شستن دست‌ها" }, { pic: "🚰", label: "شستن میوه زیر آب" }, { pic: "🧺", label: "گذاشتن در سبد تمیز" }, { pic: "🍎", label: "خوردن" }] },
      { type: "forparents",
        tips: [
          "این بازی‌ها را با موقعیت‌های واقعی خانه ادامه دهید: «حالا وقت دست شستن است یا نه؟»، «این آب را می‌شود خورد؟»",
          "کودک را در شستن میوه و چیدن سفره شریک کنید تا عادت‌های تمیزی را خودش انجام دهد.",
          "از کودک بخواهید به خواهر و برادر کوچک‌تر یاد بدهد؛ یاد دادن بهترین راه یاد گرفتن است."
        ] }
    ]
  },
  {
    id: "health-sapling-10", subject: "health", level: "sapling", emoji: "🍚", title: "یک روز خوراک خوب",
    steps: [
      /* One day at the sofreh, the window going from morning to night: breakfast (bread, cheese, walnuts, milk), a fruit
         snack, lunch (rice, a bean stew, herbs, yoghurt), and a lighter dinner eaten together with the family.
         Drawings: js/art/rig-health.js and the food pictures. */
      { type: "scene", prompt: "یک روز سر سفره", bg: "#fbeedd",
        parts: {
          kitchen: { art: "h-kitchen" }, win: { art: "h-window", at: [132, 26] }, sofreh: { art: "h-sofreh", at: [84, 80], s: 1.3 },
          f1: { art: "🍞", at: [62, 81], s: 0.55, o: 0 }, f2: { art: "🧀", at: [76, 80], s: 0.5, o: 0 }, f3: { art: "🌰", at: [90, 81], s: 0.45, o: 0 }, f4: { art: "🥛", at: [104, 81], s: 0.5, o: 0 },
          f5: { art: "🍎", at: [84, 81], s: 0.55, o: 0 },
          f6: { art: "🍚", at: [62, 81], s: 0.6, o: 0 }, f7: { art: "🍲", at: [78, 81], s: 0.6, o: 0 }, f8: { art: "🥬", at: [94, 81], s: 0.5, o: 0 }, f9: { art: "🥣", at: [108, 81], s: 0.5, o: 0 },
          f10: { art: "🍳", at: [70, 81], s: 0.55, o: 0 }, f11: { art: "🥒", at: [86, 81], s: 0.5, o: 0 }, f12: { art: "🫓", at: [100, 81], s: 0.55, o: 0 },
          girl: { art: "h-girl", at: [36, 99.8], s: 1.4 }, mom: { art: "h-mom-home", at: [134, 104.6], s: 1.15, flip: true, o: 0 }, dad: { art: "h-dad", at: [148, 104.6], s: 1.15, flip: true, o: 0 }
        },
        scenes: [
          { caption: "صبحانه: نان و پنیر و گردو، با یک لیوان شیر.", key: 3400, hold: 5600, do: B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1).concat(
            B.hpose("mom", "h-mom-home", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1), B.hpose("dad", "h-dad", { legF: -84, shinF: 168, legB: -84, shinB: 168 }, 0, 1), [
            { id: "win.sun", to: { y: 6 }, dur: 1 }, { id: "win.sun", to: { y: 2 }, at: 100, dur: 1400 },
            { id: "f1", to: { o: 1 }, at: 400, dur: 400 }, { id: "f2", to: { o: 1 }, at: 900, dur: 400 }, { id: "f3", to: { o: 1 }, at: 1400, dur: 400 }, { id: "f4", to: { o: 1 }, at: 1900, dur: 400 }
          ], B.hpose("girl", "h-girl", { upper: 20, armF: [12, -12] }, 2500, 600)) },
          { caption: "میان‌وعده: یک میوه.", key: 2400, hold: 4400, do: [
            { id: "f1", to: { o: 0 }, dur: 400 }, { id: "f2", to: { o: 0 }, dur: 400 }, { id: "f3", to: { o: 0 }, dur: 400 }, { id: "f4", to: { o: 0 }, dur: 400 },
            { id: "win.sun", to: { y: -2 }, dur: 1200 }, { id: "f5", to: { o: 1 }, at: 800, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { upper: 0, armF: [0.2, -12] }, 0, 500)) },
          { caption: "ناهار: برنج، خورش با حبوبات یا گوشت، سبزی و ماست. از چند گروه خوراکی.", key: 3800, hold: 6000, do: [
            { id: "f5", to: { o: 0 }, dur: 400 }, { id: "win.sun", to: { y: -5 }, dur: 1200 },
            { id: "f6", to: { o: 1 }, at: 500, dur: 400 }, { id: "f7", to: { o: 1 }, at: 1100, dur: 400 }, { id: "f8", to: { o: 1 }, at: 1700, dur: 400 }, { id: "f9", to: { o: 1 }, at: 2300, dur: 400 },
            { emit: "spark", where: [84, 74], spread: [56, 6], n: 6, at: 3000, dur: 600, life: 1100 }
          ] },
          { caption: "شام سبک‌تر است. با خانواده سر سفره می‌نشینیم و با هم می‌خوریم.", key: 4400, hold: 6400, do: [
            { id: "f6", to: { o: 0 }, dur: 400 }, { id: "f7", to: { o: 0 }, dur: 400 }, { id: "f8", to: { o: 0 }, dur: 400 }, { id: "f9", to: { o: 0 }, dur: 400 },
            { id: "win.night", to: { o: 1 }, dur: 1200 }, { id: "win.sun", to: { o: 0 }, dur: 800 }, { id: "win.moon", to: { o: 1 }, at: 600, dur: 600 }, { id: "win.stars", to: { o: 1 }, at: 800, dur: 600 },
            { id: "mom", to: { o: 1 }, at: 600, dur: 500 }, { id: "dad", to: { o: 1 }, at: 600, dur: 500 },
            { id: "f10", to: { o: 1 }, at: 1300, dur: 400 }, { id: "f11", to: { o: 1 }, at: 1700, dur: 400 }, { id: "f12", to: { o: 1 }, at: 2100, dur: 400 },
            { id: "mom.head", to: { r: 8 }, at: 2800, dur: 1400, yoyo: true, times: 2 }, { id: "dad.head", to: { r: -6 }, at: 3200, dur: 1400, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "sort", prompt: "هر خوراکی را در وعده‌ای بگذار که بیشتر وقت‌ها می‌خوریم",
        baskets: [{ label: "صبحانه", pic: "🌅", value: "b" }, { label: "ناهار", pic: "☀️", value: "l" }, { label: "میان‌وعده", pic: "🍎", value: "s" }],
        items: [
          { pic: "🧀", say: "نان و پنیر", basket: "b" }, { pic: "🥛", say: "شیر", basket: "b" }, { pic: "🍚", say: "برنج و خورش", basket: "l" }, { pic: "🥗", say: "سالاد", basket: "l" },
          { pic: "🍊", say: "پرتقال", basket: "s" }, { pic: "🌰", say: "گردو", basket: "s" }
        ] },
      { type: "sort", prompt: "در ناهار امروز از کدام گروه‌ها داریم؟ هر کدام را در گروهش بگذار",
        baskets: [{ label: "نان و برنج", pic: "🍚", value: "grain" }, { label: "میوه و سبزی", pic: "🥕", value: "fruit" }, { label: "حبوبات و گوشت", pic: "🍲", value: "protein" }, { label: "لبنیات", pic: "🥣", value: "dairy" }],
        items: [{ pic: "🍚", say: "برنج", basket: "grain" }, { pic: "🥬", say: "سبزی", basket: "fruit" }, { pic: "🍲", say: "خورش لوبیا", basket: "protein" }, { pic: "🥣", say: "ماست", basket: "dairy" }] },
      { type: "doit", pic: "🍽️", text: "امروز با بزرگ‌ترت یک روز خوراک خوب بنویس یا نقاشی کن: صبحانه، میان‌وعده، ناهار و شام. هر وعده از چند گروه خوراکی دارد؟" },
      { type: "forparents",
        tips: [
          "سه وعده اصلی و یک یا دو میان‌وعده کوچک به کودک انرژی یکنواخت می‌دهد. سعی کنید هر وعده دست‌کم از سه گروه خوراکی چیزی داشته باشد.",
          "سفره ایرانی پر از نمونه‌های خوب است: عدسی، آش، خورش‌های حبوبات، کوکو سبزی، نان و پنیر و سبزی. خوراکی را «خوب» و «بد» نخوانید و درباره وزن حرف نزنید.",
          "دست‌کم یک وعده در روز را با هم و بدون صفحه بخورید. کودک را در آماده کردن غذا شریک کنید.",
          "اگر کودک غذایی را نمی‌خورد، اصرار نکنید؛ آن را چند بار دیگر، کنار غذاهایی که دوست دارد، سر سفره بگذارید."
        ] }
    ]
  },
  {
    id: "health-sapling-11", subject: "health", level: "sapling", emoji: "🥤", title: "نوشیدنی و قند",
    steps: [
      /* A card of drinks, one at a time, with the sugar cubes hidden in each piled up beside it and counted: water (none),
         milk (no added sugar), a can of fizzy drink (about eight cubes), a carton of juice (about six); then water and
         milk again, with a sparkle. Cube numbers are rounded for children (4 g a cube); the reviewer checks them.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "در هر نوشیدنی چند حبه قند پنهان است؟", bg: "#fffaf0",
        parts: {
          panel: { art: "h-panel" }, glass: { art: "h-glass", at: [56, 82], s: 3.4, o: 0 }, milk: { art: "🥛", at: [56, 82], s: 2, o: 0 },
          can: { art: "🥤", at: [56, 82], s: 2, o: 0 }, juice: { art: "🧃", at: [56, 82], s: 2, o: 0 },
          c1: { art: "h-cube", at: [96, 80], s: 1.1, o: 0 }, c2: { art: "h-cube", at: [103, 80], s: 1.1, o: 0 }, c3: { art: "h-cube", at: [110, 80], s: 1.1, o: 0 }, c4: { art: "h-cube", at: [117, 80], s: 1.1, o: 0 }, c5: { art: "h-cube", at: [99.5, 73], s: 1.1, o: 0 }, c6: { art: "h-cube", at: [106.5, 73], s: 1.1, o: 0 }, c7: { art: "h-cube", at: [113.5, 73], s: 1.1, o: 0 }, c8: { art: "h-cube", at: [103, 66], s: 1.1, o: 0 }, num: { art: "counter", at: [136, 22], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "آب بهترین نوشیدنی است. هیچ قندی ندارد.", key: 2200, hold: 4400, do: [
            { id: "glass", to: { o: 1 }, at: 300, dur: 500 }, { id: "num", to: { o: 1 }, at: 900, dur: 300 }, { count: "num", from: 0, to: 0, at: 900, dur: 1 },
            { emit: "spark", where: [56, 50], spread: [16, 20], n: 6, at: 1200, dur: 600, life: 1200 }
          ] },
          { caption: "شیر هم نوشیدنی خوبی است، بدون قند اضافه.", key: 2200, hold: 4400, do: [
            { id: "glass", to: { o: 0 }, dur: 400 }, { id: "milk", to: { o: 1 }, at: 300, dur: 500 }, { count: "num", from: 0, to: 0, dur: 1 }
          ] },
          { caption: "در یک قوطی نوشابه، حدود هشت حبه قند پنهان است!", key: 4200, hold: 6000, do: [
            { id: "milk", to: { o: 0 }, dur: 400 }, { id: "can", to: { o: 1 }, at: 300, dur: 500 },
            { id: "c1", to: { o: 1 }, at: 900, dur: 250 }, { id: "c2", to: { o: 1 }, at: 1250, dur: 250 }, { id: "c3", to: { o: 1 }, at: 1600, dur: 250 }, { id: "c4", to: { o: 1 }, at: 1950, dur: 250 }, { id: "c5", to: { o: 1 }, at: 2300, dur: 250 }, { id: "c6", to: { o: 1 }, at: 2650, dur: 250 }, { id: "c7", to: { o: 1 }, at: 3000, dur: 250 }, { id: "c8", to: { o: 1 }, at: 3350, dur: 250 }, { count: "num", from: 1, to: 8, at: 900, dur: 2800 }
          ] },
          { caption: "در یک پاکت کوچک آب‌میوه صنعتی هم حدود شش حبه قند هست.", key: 4000, hold: 6000, do: [
            { id: "c1", to: { o: 0 }, dur: 300 }, { id: "c2", to: { o: 0 }, dur: 300 }, { id: "c3", to: { o: 0 }, dur: 300 }, { id: "c4", to: { o: 0 }, dur: 300 }, { id: "c5", to: { o: 0 }, dur: 300 }, { id: "c6", to: { o: 0 }, dur: 300 }, { id: "c7", to: { o: 0 }, dur: 300 }, { id: "c8", to: { o: 0 }, dur: 300 }, { id: "can", to: { o: 0 }, dur: 400 }, { id: "juice", to: { o: 1 }, at: 300, dur: 500 },
            { id: "c1", to: { o: 1 }, at: 900, dur: 250 }, { id: "c2", to: { o: 1 }, at: 1250, dur: 250 }, { id: "c3", to: { o: 1 }, at: 1600, dur: 250 }, { id: "c4", to: { o: 1 }, at: 1950, dur: 250 }, { id: "c5", to: { o: 1 }, at: 2300, dur: 250 }, { id: "c6", to: { o: 1 }, at: 2650, dur: 250 }, { count: "num", from: 1, to: 6, at: 900, dur: 2100 }
          ] },
          { caption: "پس بیشتر وقت‌ها آب و شیر می‌نوشیم. قند اضافه ندارند.", key: 3000, hold: 5000, do: [
            { id: "c1", to: { o: 0 }, dur: 300 }, { id: "c2", to: { o: 0 }, dur: 300 }, { id: "c3", to: { o: 0 }, dur: 300 }, { id: "c4", to: { o: 0 }, dur: 300 }, { id: "c5", to: { o: 0 }, dur: 300 }, { id: "c6", to: { o: 0 }, dur: 300 }, { id: "juice", to: { o: 0 }, dur: 400 }, { id: "num", to: { o: 0 }, dur: 300 },
            { id: "glass", to: { o: 1, x: 66 }, at: 300, dur: 500 }, { id: "milk", to: { o: 1, x: 104 }, at: 300, dur: 500 },
            { emit: "spark", where: [84, 50], spread: [60, 24], n: 10, at: 1000, dur: 900, life: 1300 }
          ] }
        ] },
      { type: "sort", prompt: "کدام را هر روز می‌نوشیم و کدام را فقط گاهی؟",
        baskets: [{ label: "هر روز", pic: "🌞", value: "often" }, { label: "گاهی، کم", pic: "🎈", value: "sometimes" }],
        items: [
          { pic: "💧", say: "آب", basket: "often" }, { pic: "🥛", say: "شیر", basket: "often" }, { pic: "🥣", say: "دوغ کم‌نمک", basket: "often" },
          { pic: "🥤", say: "نوشابه", basket: "sometimes" }, { pic: "🧃", say: "آب‌میوه صنعتی", basket: "sometimes" }, { pic: "🧋", say: "نوشیدنی شیرین", basket: "sometimes" }
        ] },
      { type: "choose", prompt: "بعد از بازی خیلی تشنه‌ای. بهترین نوشیدنی کدام است؟", say: "بعد از بازی خیلی تشنه‌ای. بهترین نوشیدنی کدام است؟", stack: true,
        options: ["💧 آب", "🥤 نوشابه", "🧃 آب‌میوه صنعتی"], answer: "💧 آب" },
      { type: "choose", prompt: "در کدام قند بیشتری پنهان است؟", say: "در کدام قند بیشتری پنهان است؟", stack: true,
        options: ["🥤 یک قوطی نوشابه", "💧 یک لیوان آب"], answer: "🥤 یک قوطی نوشابه" },
      { type: "forparents",
        tips: [
          "سازمان جهانی بهداشت توصیه می‌کند قند افزوده کمتر از ۱۰ درصد انرژی روزانه باشد و بهتر است کمتر از ۵ درصد. برای کودک یعنی یک نوشیدنی شیرین می‌تواند کل سهم قند روز را پر کند.",
          "یک قوطی نوشابه حدود ۳۵ گرم قند (حدود ۸ تا ۹ حبه) و یک پاکت کوچک آب‌میوه صنعتی حدود ۲۰ تا ۲۵ گرم دارد. میوه کامل از آب‌میوه بهتر است.",
          "آب و شیر نوشیدنی‌های هر روز باشند. نوشیدنی‌های شیرین را برای گاهی، و بهتر است همراه غذا، نگه دارید؛ بعد از آن آب بنوشید تا دندان‌ها آسیب کمتری ببینند.",
          "با کودک برچسب نوشیدنی‌ها را بخوانید و قندش را با حبه قند نشان دهید؛ دیدن حبه‌ها بیشتر از حرف زدن اثر دارد."
        ] }
    ]
  },
  {
    id: "health-sapling-12", subject: "health", level: "sapling", emoji: "🗓️", title: "بازی سفره یک روز",
    steps: [
      // The game lesson of the food unit: build a good day of meals from the Iranian table, sort drinks by sugar, and
      // match meals and foods to their groups.
      { type: "sort", prompt: "یک روز خوب بساز: هر خوراکی را در وعده‌ای بگذار که برایش خوب است",
        baskets: [{ label: "صبحانه", pic: "🌅", value: "b" }, { label: "ناهار", pic: "☀️", value: "l" }, { label: "شام", pic: "🌙", value: "d" }],
        items: [
          { pic: "🧀", say: "نان و پنیر و گردو", basket: "b" }, { pic: "🍳", say: "تخم‌مرغ", basket: "b" },
          { pic: "🍚", say: "برنج و خورش", basket: "l" }, { pic: "🥗", say: "سالاد", basket: "l" },
          { pic: "🍲", say: "آش", basket: "d" }, { pic: "🥣", say: "ماست", basket: "d" }
        ] },
      { type: "sort", prompt: "کدام نوشیدنی قند کم دارد و کدام قند زیاد؟",
        baskets: [{ label: "قند کم یا بی‌قند", pic: "💧", value: "low" }, { label: "قند زیاد", pic: "🍬", value: "high" }],
        items: [
          { pic: "💧", say: "آب", basket: "low" }, { pic: "🥛", say: "شیر", basket: "low" }, { pic: "🫖", say: "چای بی‌قند", basket: "low" },
          { pic: "🥤", say: "نوشابه", basket: "high" }, { pic: "🧃", say: "آب‌میوه صنعتی", basket: "high" }, { pic: "🧋", say: "شیرکاکائو", basket: "high" }
        ] },
      { type: "pairs", prompt: "هر خوراکی را با گروهش جفت کن",
        pairs: [[{ pic: "🫓", say: "نان" }, { label: "نان و برنج", say: "نان و برنج" }], [{ pic: "🥕", say: "هویج" }, { label: "میوه و سبزی", say: "میوه و سبزی" }],
          [{ pic: "🍲", say: "عدسی" }, { label: "حبوبات و گوشت", say: "حبوبات و گوشت" }], [{ pic: "🥣", say: "ماست" }, { label: "لبنیات", say: "لبنیات" }]] },
      { type: "pairs", prompt: "هر وعده را با زمانش جفت کن",
        pairs: [[{ pic: "🌅", say: "صبح" }, { label: "صبحانه", say: "صبحانه" }], [{ pic: "☀️", say: "ظهر" }, { label: "ناهار", say: "ناهار" }], [{ pic: "🌙", say: "شب" }, { label: "شام", say: "شام" }]] },
      { type: "forparents",
        tips: [
          "از کودک بخواهید منوی یک روز خانواده را با شما بچیند: هر وعده از چند گروه، و نوشیدنی آب یا شیر.",
          "برچسب نوشیدنی‌ها و خوراکی‌های بسته‌بندی را با هم بخوانید. چراغ راهنمای تغذیه‌ای روی بسته‌ها (رنگ قرمز برای قند، چربی و نمک زیاد) را به کودک نشان دهید.",
          "هیچ خوراکی را ممنوع یا «بد» نکنید؛ «هر روز» و «گاهی» بگویید."
        ] }
    ]
  },
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
    id: "health-sapling-13", subject: "health", level: "sapling", emoji: "💪", title: "قلب، ماهیچه، کشش، تعادل",
    steps: [
      /* The four parts of fitness, each with its sign in the corner and a move the girl does: running (heart and lungs,
         the heart sign beats fast), push-ups against a wall (strength), the cat stretch on hands and knees, its back
         rounding and dipping (flexibility, with a cat), and standing on one foot (balance). Drawings:
         js/art/rig-health.js and the cat from js/art/rig.js. */
      { type: "scene", prompt: "چهار بخش آمادگی بدن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, rug: { art: "rug-side", at: [70, 90], s: 1.3 }, pillar: { art: "h-pillar", at: [120, 88], o: 0 },
          cat: { art: "cat-side", at: [118, 86], s: 1.2, o: 0 },
          girl: { art: "h-girl", at: [20, 86], s: 1.4 },
          sign: { art: "h-heart", at: [138, 18], s: 1.2, o: 0 }, sign2: { art: "💪", at: [138, 26], s: 0.7, o: 0 }, sign3: { art: "🐈", at: [138, 26], s: 0.7, o: 0 }, sign4: { art: "⚖️", at: [138, 26], s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "قلب و ریه‌ها: دویدن، قلب و ریه‌ها را قوی می‌کند.", key: 3000, hold: 5400, do: [
            { id: "sign", to: { o: 1 }, dur: 400 }, { id: "sign", to: { s: 1.6 }, at: 400, dur: 4400, yoyo: true, times: 16 },
            { id: "girl", to: { x: 100 }, at: 300, dur: 3600, ease: "linear" }
          ].concat(B.hwalk("girl", 300, 3600, 7, true)) },
          { caption: "قدرت: شنا رفتن روی دیوار، ماهیچه‌های دست و شانه را قوی می‌کند.", key: 3000, hold: 5600, do: [
            { id: "sign", to: { o: 0 }, dur: 300 }, { id: "sign2", to: { o: 1 }, at: 200, dur: 400 }, { id: "pillar", to: { o: 1 }, dur: 400 },
            { id: "girl", to: { x: 101 }, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { upper: 25, armF: [14.6, -27], armB: [14, -27.4], head: -10 }, 400, 600), [
            { id: "girl.upper", to: { r: 40 }, at: 1100, dur: 4400, yoyo: true, times: 8 }
          ]) },
          { caption: "کشش: حرکت گربه، پشت را گرد و بعد گود می‌کنیم. بدن نرم و کشیده می‌ماند.", key: 2600, hold: 6000, do: [
            { id: "sign2", to: { o: 0 }, dur: 300 }, { id: "sign3", to: { o: 1 }, at: 200, dur: 400 }, { id: "pillar", to: { o: 0 }, dur: 400 }, { id: "cat", to: { o: 1 }, at: 300, dur: 400 },
            { id: "girl", to: { x: 64, y: 95 }, at: 300, dur: 800 }
          ].concat(B.hpose("girl", "h-girl", { upper: 88, head: -50, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10.5, -6.6], armB: [9.6, -6.6] }, 300, 800), [
            { id: "girl.upper", to: { r: 78 }, at: 1300, dur: 4400, yoyo: true, times: 6 }, { id: "girl.head", to: { r: -30 }, at: 1300, dur: 4400, yoyo: true, times: 6 },
            { id: "cat", to: { sy: 0.92 }, at: 1300, dur: 4400, yoyo: true, times: 6 }
          ]) },
          { caption: "تعادل: روی یک پا می‌ایستیم و تا ده می‌شماریم. بعد پای دیگر.", key: 3400, hold: 6000, do: [
            { id: "sign3", to: { o: 0 }, dur: 300 }, { id: "sign4", to: { o: 1 }, at: 200, dur: 400 }, { id: "cat", to: { o: 0 }, dur: 400 },
            { id: "girl", to: { y: 86 }, at: 200, dur: 700 }
          ].concat(B.hpose("girl", "h-girl", { upper: 0, head: 0, legF: 0, shinF: 0, legB: -80, shinB: 90, armF: [9, -24], armB: [-9, -24] }, 200, 700), [
            { id: "girl", to: { r: 2 }, at: 1000, dur: 4400, yoyo: true, times: 6 }
          ]) }
        ] },
      { type: "pairs", prompt: "هر بخش آمادگی را با حرکتش جفت کن",
        pairs: [[{ pic: "💓", say: "قلب و ریه" }, { label: "دویدن", say: "دویدن" }], [{ pic: "💪", say: "قدرت" }, { label: "شنا روی دیوار", say: "شنا روی دیوار" }],
          [{ pic: "🐈", say: "کشش" }, { label: "حرکت گربه", say: "حرکت گربه" }], [{ pic: "⚖️", say: "تعادل" }, { label: "روی یک پا", say: "روی یک پا" }]] },
      { type: "doit", pic: "💪", text: "هر چهار حرکت را با بزرگ‌ترت انجام بده:", list: ["دویدن یا پریدن سر جا: تا بیست بشمار.", "شنا روی دیوار: ده بار.", "حرکت گربه: پنج بار آرام.", "روی یک پا: تا ده بشمار، بعد پای دیگر."] },
      { type: "doit", pic: "📝", text: "یک بازی یا ورزش را که دوست داری نام ببر. به کدام بخش آمادگی کمک می‌کند؟ قلب، قدرت، کشش یا تعادل؟ شاید به چند تا!" },
      { type: "forparents",
        tips: [
          "آمادگی بدن چند بخش دارد: قلب و ریه (دویدن، طناب، دوچرخه)، قدرت ماهیچه و استخوان (شنا روی دیوار، بالا رفتن، پریدن)، انعطاف (کشش‌ها) و تعادل. بازی‌های متنوع همه را با هم تقویت می‌کنند.",
          "سازمان جهانی بهداشت: روزی میانگین ۶۰ دقیقه فعالیت متوسط تا شدید، و سه روز در هفته فعالیت‌هایی که عضله و استخوان را قوی می‌کند.",
          "حرکت‌های قدرتی برای کودک با وزن خود بدن است (نه وزنه سنگین): شنا روی دیوار، اسکوات، پریدن، از تاب و میله آویزان شدن.",
          "حرکت‌ها آرام و بدون درد باشند. اگر جایی درد گرفت، کودک دست نگه دارد."
        ] }
    ]
  },
  {
    id: "health-sapling-14", subject: "health", level: "sapling", emoji: "🔥", title: "گرم کن، آرام کن",
    steps: [
      /* In the yard before and after play: the girl marches on the spot (knees up), swings her arms in big circles and
         does small jumps (seen from the front), then plays ball; after the game she walks slowly, stretches up tall and
         breathes out slowly with her eyes closed. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "گرم کردن و آرام کردن بدن", bg: "#cfe8f5",
        parts: {
          park: { art: "h-park" },
          girl: { art: "h-girl", at: [60, 88], s: 1.4 }, girlF: { art: "h-girl-front", at: [80, 88], s: 1.5, o: 0 },
          ball: { art: "⚽", at: [82, 86], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "پیش از بازی، بدن را گرم می‌کنیم: سر جا رژه می‌رویم و زانوها را بالا می‌آوریم.", key: 1800, hold: 5600, do: [
            { id: "girl.legF", to: { r: -60 }, at: 300, dur: 4800, yoyo: true, times: 10 }, { id: "girl.shinF", to: { r: 70 }, at: 300, dur: 4800, yoyo: true, times: 10 },
            { id: "girl.legB", to: { r: -60 }, at: 780, dur: 4800, yoyo: true, times: 10 }, { id: "girl.shinB", to: { r: 70 }, at: 780, dur: 4800, yoyo: true, times: 10 },
            { id: "girl.armB", to: { r: -35 }, at: 300, dur: 4800, yoyo: true, times: 10 }, { id: "girl.armF", to: { r: -35 }, at: 780, dur: 4800, yoyo: true, times: 10 }
          ] },
          { caption: "دست‌ها را بزرگ و آرام می‌چرخانیم و چند پرش کوچک می‌کنیم.", key: 4200, hold: 6000, do: [
            { id: "girl", to: { o: 0 }, dur: 400 }, { id: "girlF", to: { o: 1 }, dur: 400 }
          ].concat(B.hpose("girlF", "h-girl-front", { armL: [-11, -22], armR: [11, -22] }, 400, 500),
            B.hpose("girlF", "h-girl-front", { armL: [-9, -36], armR: [9, -36] }, 1000, 700),
            B.hpose("girlF", "h-girl-front", { armL: [-11, -22], armR: [11, -22] }, 1800, 700),
            B.hpose("girlF", "h-girl-front", { armL: [-9, -36], armR: [9, -36] }, 2600, 700),
            B.hpose("girlF", "h-girl-front", { armL: [-11, -22], armR: [11, -22] }, 3400, 500), [
            { id: "girlF", to: { y: 82 }, at: 4000, dur: 1600, yoyo: true, times: 8 }
          ]) },
          { caption: "حالا بدن آماده بازی است!", key: 1700, hold: 4400, do: [
            { id: "girlF", to: { o: 0 }, dur: 300 }, { id: "girl", to: { o: 1, x: 70 }, dur: 300 }, { id: "ball", to: { o: 1 }, at: 200, dur: 300 },
            { id: "ball", path: "M82 86Q110 56 136 86", at: 1300, dur: 900 }, { id: "ball", to: { r: 360 }, at: 1300, dur: 900 }
          ].concat(B.hpose("girl", "h-girl", { legF: -40, shinF: 10 }, 900, 300), B.hpose("girl", "h-girl", { legF: 0, shinF: 0 }, 1500, 400)) },
          { caption: "بعد از بازی، بدن را آرام می‌کنیم: آهسته راه می‌رویم تا نفسمان آرام شود.", key: 2400, hold: 5200, do: [
            { id: "ball", to: { o: 0 }, dur: 400 }, { id: "girl", walk: [118, 88], at: 300, dur: 4400, steps: 6 }
          ] },
          { caption: "دست‌ها را بالا می‌بریم و قد می‌کشیم. بعد نفس عمیق، و آرام بیرون می‌دهیم.", key: 3200, hold: 6400, do: [
            { id: "girl", to: { o: 0 }, dur: 400 }, { id: "girlF", to: { o: 1, x: 110 }, dur: 400 }
          ].concat(B.hpose("girlF", "h-girl-front", { armL: [-9, -38], armR: [9, -38] }, 500, 1800), [
            { id: "girlF.pupils", to: { o: 0 }, at: 2400, dur: 200 }, { id: "girlF.shut", to: { o: 1 }, at: 2400, dur: 200 }
          ], B.hpose("girlF", "h-girl-front", { armL: [0.6, -12], armR: [-0.6, -12] }, 3600, 2200)) }
        ] },
      { type: "order", prompt: "این کارها را به ترتیب بچین: از پیش از بازی تا بعد از آن", numbered: true,
        items: [{ pic: "🚶", label: "رژه سر جا" }, { pic: "🙆", label: "چرخاندن دست‌ها" }, { pic: "⚽", label: "بازی" }, { pic: "🐢", label: "آهسته راه رفتن" }, { pic: "😮‍💨", label: "کش آمدن و نفس آرام" }] },
      { type: "order", prompt: "گرم کردن را به ترتیب بچین: از آرام به تند", numbered: true,
        items: [{ pic: "🚶", label: "راه رفتن" }, { pic: "🦵", label: "رژه با زانوی بالا" }, { pic: "🐇", label: "پرش‌های کوچک" }] },
      { type: "doit", pic: "🔥", text: "پیش از بازی بعدی، با بزرگ‌ترت بدن را گرم کن:", list: ["رژه سر جا: تا بیست بشمار.", "چرخاندن دست‌ها: پنج بار جلو، پنج بار عقب.", "ده پرش کوچک."] },
      { type: "doit", pic: "🌙", text: "بعد از بازی، بدن را آرام کن:", list: ["یک دقیقه آهسته راه برو.", "دست‌ها را بالا ببر و قد بکش.", "سه نفس آرام بکش."] },
      { type: "forparents",
        tips: [
          "گرم کردن (پنج دقیقه حرکت سبک که کم‌کم تند می‌شود) ماهیچه‌ها و قلب را برای بازی آماده می‌کند. آرام کردن (راه رفتن آهسته، کشش نرم و نفس آرام) بدن را کم‌کم به حال عادی برمی‌گرداند.",
          "کشش‌ها را آرام و بدون تکان دادن انجام دهید. کشش هرگز نباید درد داشته باشد.",
          "پیش و پس از بازی و ورزش، آب بنوشید.",
          "این عادت را خودتان هم انجام دهید: کودک بیشتر از دیدن یاد می‌گیرد تا شنیدن."
        ] }
    ]
  },
  {
    id: "health-sapling-15", subject: "health", level: "sapling", emoji: "🎯", title: "طناب و نشانه",
    steps: [
      /* In the park: two children turn a long rope and the girl jumps it each time it passes under her feet; she throws
         a soft ball at a round target; a soft ball rolls towards her and she steps aside; and she bounces the ball as
         she walks along. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین و تو هم امتحان کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, target: { art: "h-target", at: [130, 88], s: 1.2, o: 0 },
          boy: { art: "h-boy", at: [40, 88], s: 1.4 }, friend: { art: "h-girl2", at: [120, 88], s: 1.4, flip: true },
          rope: { art: "h-rope", at: [80, 58.6], sx: 3.04, sy: 1.8 },
          front: { art: "h-girl-front", at: [80, 88], s: 1.5 }, girl: { art: "h-girl", at: [40, 88], s: 1.4, o: 0 },
          ball: { art: "h-ball-top", at: [30, 48], s: 0.6, o: 0 }, roll: { art: "h-ball-top", at: [-10, 84], s: 0.8, o: 0 },
          dribble: { art: "h-ball-top", at: [7.8, -12.5], s: 0.45, under: "girl" }
        },
        scenes: [
          { caption: "طناب بلند: دو نفر طناب را می‌چرخانند. هر بار که طناب زیر پا می‌آید، می‌پریم.", key: 1800, hold: 5600, do: B.hpose("boy", "h-boy", { armF: [9, -21], armB: [8.6, -21] }, 0, 1).concat(
            B.hpose("friend", "h-girl2", { armF: [9, -21], armB: [8.6, -21] }, 0, 1), [
            { id: "rope", to: { sy: -1.8 }, at: 0, dur: 4800, yoyo: true, times: 8 },
            { id: "front", path: "M80 88Q80 76 80 88", at: 400, dur: 400 }, { id: "front", path: "M80 88Q80 76 80 88", at: 1600, dur: 400 },
            { id: "front", path: "M80 88Q80 76 80 88", at: 2800, dur: 400 }, { id: "front", path: "M80 88Q80 76 80 88", at: 4000, dur: 400 },
            { id: "front.mouth", to: { o: 0 }, at: 1000, dur: 100 }, { id: "front.grin", to: { o: 1 }, at: 1000, dur: 100 }
          ]) },
          { caption: "پرتاب به نشانه: به وسط نشانه نگاه می‌کنیم و توپ نرم را پرتاب می‌کنیم.", key: 2400, hold: 5600, do: [
            { id: "rope", to: { o: 0 }, dur: 400 }, { id: "boy", to: { o: 0 }, dur: 400 }, { id: "friend", to: { o: 0 }, dur: 400 }, { id: "front", to: { o: 0 }, dur: 400 },
            { id: "girl", to: { o: 1 }, at: 300, dur: 400 }, { id: "target", to: { o: 1 }, at: 300, dur: 400 }, { id: "dribble", to: { o: 0 }, dur: 1 }
          ].concat(B.hpose("girl", "h-girl", { armF: [-5, -29], legF: -16, legB: 10 }, 800, 700), [
            { id: "ball", to: { o: 1 }, at: 1300, dur: 200 }
          ], B.hpose("girl", "h-girl", { armF: [8, -27] }, 1700, 300), [
            { id: "ball", path: "M33 48Q80 24 128 56.8", at: 1900, dur: 800, ease: "linear" },
            { emit: "spark", where: [130, 56], spread: [12, 12], n: 6, at: 2700, dur: 400, life: 900 },
            { id: "ball", path: "M128 56.8L124 85", at: 2800, dur: 600, ease: "in" }
          ]) },
          { caption: "جاخالی: توپ نرمی به طرفمان می‌آید. با یک قدم بلند به کنار، جاخالی می‌دهیم.", key: 2550, hold: 5400, do: [
            { id: "girl", to: { o: 0 }, dur: 400 }, { id: "target", to: { o: 0 }, dur: 400 }, { id: "ball", to: { o: 0 }, dur: 300 },
            { id: "front", to: { o: 1, x: 80, y: 88 }, at: 300, dur: 400 }, { id: "roll", to: { o: 1 }, at: 800, dur: 200 },
            { id: "roll", to: { x: 170 }, at: 1000, dur: 3000, ease: "linear" }, { id: "roll", to: { r: 720 }, at: 1000, dur: 3000, ease: "linear" },
            { id: "front", path: "M80 88Q90 80 104 88", at: 1300, dur: 500 }
          ].concat(B.hpose("front", "h-girl-front", { armL: [-11, -22], armR: [11, -22] }, 1300, 400)) },
          { caption: "توپ را با یک دست به زمین می‌زنیم و همراهش راه می‌رویم.", key: 2500, hold: 6600, do: [
            { id: "front", to: { o: 0 }, dur: 400 }, { id: "roll", to: { o: 0 }, dur: 300 },
            { id: "girl", to: { x: 20 }, dur: 1 }, { id: "girl.armF", to: { r: 0 }, dur: 1 }, { id: "girl", to: { o: 1 }, at: 300, dur: 400 }, { id: "dribble", to: { o: 1 }, at: 300, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { armF: [6.5, -15], legF: 0, legB: 0 }, 300, 400), [
            { id: "dribble", to: { y: -2.5 }, at: 800, dur: 5200, yoyo: true, times: 16 },
            { id: "girl.foreF", to: { r: "+12" }, at: 800, dur: 5200, yoyo: true, times: 16 },
            { id: "girl", to: { x: 120 }, at: 800, dur: 5200, ease: "linear" }
          ], B.hwalk("girl", 800, 5200, 6).slice(0, 2)) }
        ] },
      { type: "doit", pic: "🪢", text: "طناب بلند: دو بزرگ‌تر طناب را آرام بچرخانند و تو هر بار که طناب زیر پایت آمد، بپر. با هر پرش بشمار." },
      { type: "doit", pic: "🎯", text: "بازی نشانه در خانه: یک سبد بگذار و از سه قدم دورتر، توپ جوراب را تویش بینداز.", list: ["پنج بار پرتاب کن. چند تا رفت تو؟", "یک قدم عقب‌تر برو و دوباره امتحان کن."] },
      { type: "doit", pic: "🏀", text: "در حیاط یا پارک، با بزرگ‌ترت بازی کن:", list: ["توپ را با یک دست به زمین بزن و بگیر: ده بار.", "حالا همراه توپ راه برو.", "جاخالی: بزرگ‌ترت یک توپ نرم را روی زمین به طرفت بغلتاند و تو به کنار بپر."] },
      { type: "forparents",
        tips: [
          "طناب، پرتاب به نشانه، جاخالی و دریبل، چند حرکت را با هم ترکیب می‌کنند: چشم و دست، تعادل و زمان‌بندی. این‌ها پایه بیشتر بازی‌ها و ورزش‌های گروهی است.",
          "برای جاخالی و پرتاب، فقط از توپ نرم (اسفنجی، پارچه‌ای یا جوراب گلوله‌شده) استفاده کنید و به سر کسی پرتاب نکنید.",
          "در طناب بلند، اول طناب را آرام مثل تاب جلو و عقب ببرید، بعد کامل بچرخانید.",
          "هر حرکت را با هر دو دست و هر دو پا تمرین کنید."
        ] }
    ]
  },
  {
    id: "health-sapling-16", subject: "health", level: "sapling", emoji: "🤝", title: "بازی جوانمردانه",
    steps: [
      /* A football game in the park: the children agree the rules (heads nodding); a girl calls a child standing alone
         to join, and he walks over; the boy scores and everyone cheers; the boy picks the ball up with his hands and
         the girl says calmly that it is not the rule, and he puts it down; at the end the girl and the boy shake hands.
         Drawings: js/art/rig-health.js; the lone child is a walker. */
      { type: "scene", prompt: "یک بازی جوانمردانه", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, goal: { art: "h-goal", at: [16, 88], s: 1.3 },
          girl: { art: "h-girl", at: [44, 88], s: 1.4 }, boy: { art: "h-boy", at: [72, 88], s: 1.4, flip: true },
          friend: { art: "h-girl2", at: [100, 88], s: 1.4, flip: true }, kid: { art: "🧒", at: [146, 88], s: 1.7, flip: true, o: 0 },
          ball: { art: "⚽", at: [58, 86], s: 0.5 }
        },
        scenes: [
          { caption: "پیش از بازی، قانون‌ها را با هم می‌گوییم و همه قبول می‌کنیم.", key: 2600, hold: 5000, do: B.hpose("girl", "h-girl", "talk", 300, 500).concat([
            { id: "boy.head", to: { r: 10 }, at: 1200, dur: 2000, yoyo: true, times: 4 }, { id: "friend.head", to: { r: 10 }, at: 1400, dur: 2000, yoyo: true, times: 4 }
          ], B.hunpose("girl", "h-girl", 3600, 400)) },
          { caption: "یک نفر تنها ایستاده است. صدایش می‌کنیم: «بیا با ما بازی کن!»", key: 2800, hold: 5600, do: [
            { id: "kid", to: { o: 1 }, dur: 400 }, { id: "friend", to: { sx: -1 }, at: 600, dur: 150 }
          ].concat(B.hpose("friend", "h-girl2", { armF: [3, -30] }, 800, 400), [
            { id: "friend.foreF", to: { r: "+30" }, at: 1200, dur: 1600, yoyo: true, times: 4 },
            { id: "kid", walk: [126, 88], at: 2000, dur: 1800 }
          ], B.hunpose("friend", "h-girl2", 3400, 400)) },
          { caption: "گل! وقتی کسی خوب بازی می‌کند، تشویقش می‌کنیم: «آفرین!»", key: 2600, hold: 5400, do: [
            { id: "boy", walk: [64, 88], at: 0, dur: 600 }
          ].concat(B.hpose("boy", "h-boy", { legF: 20 }, 600, 300), B.hpose("boy", "h-boy", { legF: -45 }, 900, 200), [
            { id: "ball", path: "M58 86Q38 64 18 80", at: 1050, dur: 700, ease: "linear" }, { id: "ball", to: { r: -540 }, at: 1050, dur: 700 },
            { emit: "spark", where: [16, 76], spread: [16, 10], n: 6, at: 1750, dur: 500, life: 900 }
          ], B.hpose("boy", "h-boy", { legF: 0 }, 1300, 300), B.hpose("girl", "h-girl", { armF: [3, -31], armB: [-2, -31] }, 1900, 400),
            B.hpose("friend", "h-girl2", { armF: [3, -31], armB: [-2, -31] }, 1900, 400), B.hunpose("girl", "h-girl", 4000, 400), B.hunpose("friend", "h-girl2", 4000, 400)) },
          { caption: "اگر کسی قانون را زیر پا گذاشت، داد نمی‌زنیم. آرام می‌گوییم: «با دست نه! دوباره از اول.»", key: 3000, hold: 6000, do: [
            { id: "ball", to: { o: 0 }, dur: 300 }, { id: "ball", to: { x: 64, y: 86, r: 0 }, at: 300, dur: 1 }, { id: "ball", to: { o: 1 }, at: 400, dur: 300 },
            { id: "boy", walk: [76, 88], at: 0, dur: 600 }
          ].concat(B.hpose("boy", "h-boy", { armF: [9, -17], armB: [8.6, -17.4] }, 800, 500), [
            { id: "ball", path: "M64 86L63.4 62", at: 1300, dur: 500 }
          ], B.hpose("girl", "h-girl", "talk", 1900, 500), [
            { id: "boy.head", to: { r: 10 }, at: 3400, dur: 1200, yoyo: true, times: 2 },
            { id: "ball", path: "M63.4 62L64 86", at: 4600, dur: 500 }
          ], B.hunpose("boy", "h-boy", 4600, 500), B.hunpose("girl", "h-girl", 4600, 500)) },
          { caption: "آخر بازی، برنده باشیم یا بازنده، دست می‌دهیم و می‌گوییم: «بازی خوبی بود!»", key: 3000, hold: 5600, do: [
            { id: "ball", to: { o: 0 }, dur: 300 }, { id: "boy", walk: [71, 88], at: 300, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9.6, -17] }, 1000, 600), B.hpose("boy", "h-boy", { armF: [9.6, -17] }, 1000, 600), [
            { id: "girl.foreF", to: { r: "+10" }, at: 1700, dur: 1600, yoyo: true, times: 4 }, { id: "boy.foreF", to: { r: "+10" }, at: 1700, dur: 1600, yoyo: true, times: 4 }
          ]) }
        ] },
      { type: "choose", prompt: "در بازی، یکی از هم‌تیمی‌هایت تقلب می‌کند. چه کار می‌کنی؟", say: "در بازی، یکی از هم‌تیمی‌هایت تقلب می‌کند. چه کار می‌کنی؟", stack: true,
        options: ["🗣️ آرام می‌گویم این قانون نبود، و اگر ادامه داد به بزرگ‌تر می‌گویم", "😠 داد می‌زنم و هلش می‌دهم", "🙈 من هم تقلب می‌کنم"],
        answer: "🗣️ آرام می‌گویم این قانون نبود، و اگر ادامه داد به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "تیم شما باخت. چه کار می‌کنی؟", say: "تیم شما باخت. چه کار می‌کنی؟", stack: true,
        options: ["🤝 با تیم برنده دست می‌دهم و می‌گویم: «بازی خوبی بود!»", "😤 توپ را برمی‌دارم و می‌روم", "🗯️ می‌گویم آن‌ها تقلب کردند"],
        answer: "🤝 با تیم برنده دست می‌دهم و می‌گویم: «بازی خوبی بود!»" },
      { type: "choose", prompt: "یک بچه تازه‌وارد کنار زمین ایستاده و بازی را نگاه می‌کند. چه کار می‌کنی؟", say: "یک بچه تازه‌وارد کنار زمین ایستاده و بازی را نگاه می‌کند. چه کار می‌کنی؟", stack: true,
        options: ["👋 صدایش می‌کنم و قانون بازی را برایش می‌گویم", "🙅 می‌گویم جا نداریم", "😶 به او نگاه هم نمی‌کنم"],
        answer: "👋 صدایش می‌کنم و قانون بازی را برایش می‌گویم" },
      { type: "talk", scene: "⚽🤝👏", caption: "کدام بازی گروهی را دوست داری؟ قانون‌هایش چیست؟ یک بار که کسی تو را تشویق کرد یا تو کسی را تشویق کردی، چه حسی داشتی؟" },
      { type: "forparents",
        tips: [
          "بازی جوانمردانه یعنی قانون را نگه داشتن، همه را بازی دادن، تشویق کردن هم‌تیمی و حریف، و دست دادن بعد از بازی، چه ببریم چه ببازیم.",
          "وقتی کودک می‌بازد، احساسش را بپذیرید («ناراحتی که باختید») و بعد به تلاش و کار گروهی اشاره کنید، نه فقط به نتیجه.",
          "اگر کسی تقلب کرد، کودک یاد بگیرد آرام بگوید، و اگر ادامه داشت از بزرگ‌تر کمک بگیرد؛ نه دعوا، نه تقلب متقابل.",
          "در تماشای ورزش هم، رفتار جوانمردانه بازیکنان و تماشاگران را با کودک ببینید و درباره‌اش حرف بزنید."
        ] }
    ]
  },
  {
    id: "health-sapling-17", subject: "health", level: "sapling", emoji: "🎒", title: "کیف و صندلی",
    steps: [
      /* At home before and after school. Seen from behind, the girl carries her backpack on one shoulder and leans; then
         on both shoulders, standing straight. She takes the toys she does not need out of her bag. She sits at the
         table with her feet on the floor and her back against the chair while the clock's hand goes round; she gets up
         and stretches; then, working on a tablet, she looks up from it to the window. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "کیف سبک، نشستن خوب", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, clock: { art: "h-clock", at: [40, 28], s: 1.2 }, window: { art: "h-window", at: [128, 34], s: 1.1 },
          chair: { art: "h-chair", at: [69, 86], s: 1.4, o: 0 }, table: { art: "h-table", at: [92, 86], o: 0 },
          bag: { art: "🎒", at: [92, 61], s: 0.7, o: 0 }, toy: { art: "🧸", at: [92, 61], s: 0.45, o: 0 }, car: { art: "🚗", at: [92, 61], s: 0.45, o: 0 },
          book: { art: "📖", at: [92, 64.6], s: 0.5, o: 0 }, tablet: { art: "h-tablet", at: [92, 63.6], r: -20, o: 0 },
          back: { art: "h-girl-back-pink", at: [70, 86], s: 1.6 },
          pack: { art: "h-pack", under: "back", o: 0 }, packOne: { art: "h-pack-one", under: "back" },
          girl: { art: "h-girl", at: [79, 86], s: 1.4, o: 0 }, sight: { art: "h-sight", at: [76, 54.5], sx: 0, r: -21.5, o: 0 }
        },
        scenes: [
          { caption: "کیف روی یک شانه کج می‌شود و بدن را هم کج می‌کند.", key: 2400, hold: 4800, do: [
            { id: "back", to: { r: -6 }, at: 600, dur: 1200 }
          ] },
          { caption: "پس کیف را روی هر دو شانه می‌اندازیم. بدن صاف می‌ماند.", key: 2600, hold: 5000, do: [
            { id: "packOne", to: { o: 0 }, at: 300, dur: 500 }, { id: "pack", to: { o: 1 }, at: 500, dur: 500 }, { id: "back", to: { r: 0 }, at: 600, dur: 900 }
          ] },
          { caption: "فقط چیزهای لازم آن روز را در کیف می‌گذاریم تا سبک باشد.", key: 2900, hold: 5400, do: [
            { id: "back", to: { o: 0 }, dur: 400 }, { id: "pack", to: { o: 0 }, dur: 400 },
            { id: "table", to: { o: 1 }, at: 200, dur: 400 }, { id: "chair", to: { o: 1 }, at: 200, dur: 400 }, { id: "bag", to: { o: 1 }, at: 200, dur: 400 }, { id: "girl", to: { o: 1 }, at: 300, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9.3, -20] }, 800, 500), [
            { id: "toy", to: { o: 1 }, at: 1300, dur: 200 }, { id: "toy", path: "M92 61Q110 40 122 82", at: 1300, dur: 1000 },
            { id: "car", to: { o: 1 }, at: 2300, dur: 200 }, { id: "car", path: "M92 61Q112 42 132 83", at: 2300, dur: 1000 }
          ]) },
          { caption: "صاف می‌نشینیم: پاها روی زمین و پشت به صندلی.", key: 3400, hold: 6400, do: [
            { id: "bag", to: { o: 0 }, dur: 400 }, { id: "toy", to: { o: 0 }, dur: 400 }, { id: "car", to: { o: 0 }, dur: 400 },
            { id: "girl", to: { x: 70, y: 94.4 }, at: 300, dur: 900 }
          ].concat(B.hpose("girl", "h-girl", { legF: -90, shinF: 90, legB: -90, shinB: 90, armF: [9.2, -20], armB: [8.8, -20.2] }, 300, 900), [
            { id: "book", to: { o: 1 }, at: 1200, dur: 400 }, { id: "girl.head", to: { r: 10 }, at: 1400, dur: 600 },
            { id: "clock.min", to: { r: 300 }, at: 1400, dur: 4400, ease: "linear" }
          ]) },
          { caption: "بعد از مدتی نشستن، بلند می‌شویم و کش می‌آییم.", key: 2400, hold: 4800, do: [
            { id: "girl", to: { x: 76, y: 86 }, at: 200, dur: 800 }
          ].concat(B.hpose("girl", "h-girl", { head: 0, legF: 0, shinF: 0, legB: 0, shinB: 0, armF: [0.2, -12], armB: [0.2, -12] }, 200, 800),
            B.hpose("girl", "h-girl", { head: -10, armF: [1.4, -33], armB: [0.6, -33] }, 1200, 1000),
            B.hpose("girl", "h-girl", { head: 0, armF: [0.2, -12], armB: [0.2, -12] }, 3600, 900)) },
          { caption: "وقتی با صفحه کار می‌کنیم، گاهی چشم را از صفحه برمی‌داریم و از پنجره دور را نگاه می‌کنیم.", key: 4000, hold: 6400, do: [
            { id: "book", to: { o: 0 }, dur: 300 }, { id: "tablet", to: { o: 1 }, at: 200, dur: 400 },
            { id: "girl", to: { x: 70, y: 94.4 }, at: 200, dur: 900 }
          ].concat(B.hpose("girl", "h-girl", { head: 12, legF: -90, shinF: 90, legB: -90, shinB: 90, armF: [9.2, -20], armB: [8.8, -20.2] }, 200, 900),
            B.hpose("girl", "h-girl", { head: -14 }, 2800, 800), [
            { id: "sight", to: { o: 1, sx: 4.6 }, at: 3400, dur: 600 }
          ]) }
        ] },
      { type: "choose", prompt: "کدام بچه کیفش را درست برداشته است؟", say: "کدام بچه کیفش را درست برداشته است؟", stack: true,
        options: ["🎒 کیف روی هر دو شانه، با بندهای سفت", "👜 کیف روی یک شانه", "🧳 کیف پر از اسباب‌بازی"], answer: "🎒 کیف روی هر دو شانه، با بندهای سفت" },
      { type: "choose", prompt: "یک ساعت است که نشسته‌ای و بازی می‌کنی. حالا چه کار می‌کنی؟", say: "یک ساعت است که نشسته‌ای و بازی می‌کنی. حالا چه کار می‌کنی؟", stack: true,
        options: ["🙆 بلند می‌شوم، کش می‌آیم و کمی راه می‌روم", "🛋️ همان‌جا یک ساعت دیگر می‌نشینم", "📱 صفحه را نزدیک‌تر می‌آورم"], answer: "🙆 بلند می‌شوم، کش می‌آیم و کمی راه می‌روم" },
      { type: "doit", pic: "🎒", text: "امشب کیف فردا را با بزرگ‌ترت آماده کن:", list: ["فقط کتاب و دفترهای فردا را بگذار.", "اسباب‌بازی‌ها را بیرون بیاور.", "بندها را طوری تنظیم کن که کیف بالای کمرت بنشیند."] },
      { type: "doit", pic: "🪑", text: "سر مشق، صاف بنشین: پاها روی زمین، پشت به صندلی. هر بار که یک صفحه تمام شد، بلند شو و کش بیا." },
      { type: "forparents",
        tips: [
          "کیف مدرسه بهتر است از حدود یک دهم وزن کودک سنگین‌تر نباشد. هر روز فقط وسایل همان روز را بگذارید و سنگین‌ترها را نزدیک پشت.",
          "هر دو بند را روی شانه‌ها بیندازید و طوری کوتاه کنید که کیف بالای کمر بنشیند، نه روی باسن.",
          "میز و صندلی مشق: پاها روی زمین (یا روی یک جعبه)، زانوها حدود زاویه راست، و صفحه یا کتاب در فاصله مناسب از چشم.",
          "بعد از هر نیم تا یک ساعت نشستن، چند دقیقه حرکت. در کار با صفحه، هر بیست دقیقه حدود بیست ثانیه به دور نگاه کنید."
        ] }
    ]
  },
  {
    id: "health-sapling-18", subject: "health", level: "sapling", emoji: "⏱️", title: "نرمش ده‌دقیقه‌ای",
    steps: [
      /* A ten-minute routine in five parts (move steps: one move at a time, counted aloud, a slow breath between moves,
         an easier and a harder version): warm-up, moves for the heart, strength (push-ups against a wall, squats, a
         plank on the knees), stretches, and calming down. People: js/art/rig-health.js. */
      { type: "move", prompt: "۱. گرم کردن",
        moves: [
          { name: "رژه سر جا", part: "warm", art: "h-girl", say: "زانوها را بالا بیاور و دست‌ها را تاب بده.", times: 30, pace: 1300,
            a: { legF: -60, shinF: 70, armB: -35 }, b: { legB: -60, shinB: 70, armF: -35 },
            easier: { say: "آرام راه برو و زانوها را کمی بالا بیاور.", a: { legF: -30, shinF: 40 }, b: { legB: -30, shinB: 40 } } },
          { name: "چرخاندن دست‌ها", part: "warm", say: "دست‌ها را باز کن و بزرگ و آرام بالا و پایین ببر.", times: 12,
            a: { armL: [-11, -22], armR: [11, -22] }, b: { armL: [-9, -36], armR: [9, -36] } },
          { name: "پرش‌های کوچک", part: "warm", say: "روی پنجه‌ها، کوچک و نرم بپر.", times: 20, pace: 1000, a: {}, b: {}, hop: 3,
            easier: { say: "بدون پریدن: روی پنجه‌ها بلند شو و پایین بیا.", hop: 1 } }
        ] },
      { type: "move", prompt: "۲. حرکت‌های قلب",
        moves: [
          { name: "پرش ستاره", say: "با هر پرش، دست‌ها بالا و پاها باز؛ بعد دوباره جمع.", times: 20, pace: 1400,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -36], armR: [9, -36], legL: 14, legR: -14 }, hop: 4,
            easier: { say: "بدون پریدن: یک پا به پهلو و دست‌ها بالا، بعد برگرد.", hop: 0, b: { armL: [-9, -36], armR: [9, -36], legL: 14 } },
            harder: { say: "تندتر و بیشتر!", times: 30, pace: 1000 } },
          { name: "دویدن سر جا", art: "h-girl", say: "سر جایت بدو و دست‌ها را تاب بده.", times: 40, pace: 800,
            a: { legF: -50, shinF: 60, armB: -35, armF: 30 }, b: { legB: -50, shinB: 60, armF: -35, armB: 30 }, hop: 3,
            easier: { say: "تند رژه برو، بدون پریدن.", hop: 0, pace: 1100, times: 30 }, harder: { say: "زانوها بالاتر!", a: { legF: -80, shinF: 90, armB: -40, armF: 35 }, b: { legB: -80, shinB: 90, armF: -40, armB: 35 } } },
          { name: "پرش قورباغه", art: "h-girl", say: "پایین بنشین، دست‌ها روی زمین، بعد بلند بپر و نرم فرود بیا.", times: 8, pace: 2200, sink: 10,
            a: { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] },
            b: { upper: 0, head: 0, armF: [3, -33.5], armB: [1, -33.5] }, hop: 8,
            easier: { say: "پایین بنشین و بلند شو، بدون پریدن.", hop: 0 }, harder: { times: 12 } }
        ] },
      { type: "move", prompt: "۳. قدرت",
        moves: [
          { name: "شنا روی دیوار", art: "h-girl-wall", say: "دست‌ها روی دیوار، بدن صاف. آرنج‌ها را خم کن و دوباره صاف کن.", times: 10, pace: 2400,
            a: { upper: 22, armF: [14.2, -26], armB: [13.8, -26.4], head: -10 }, b: { upper: 35, armF: [14.2, -26], armB: [13.8, -26.4], head: -14 },
            easier: { say: "نزدیک‌تر به دیوار بایست و کم خم شو.", b: { upper: 28, armF: [14.2, -26], armB: [13.8, -26.4], head: -12 } }, harder: { times: 15 } },
          { name: "اسکات", art: "h-girl", say: "پاها باز، دست‌ها جلو. مثل نشستن روی صندلی پایین برو و بلند شو.", times: 10, pace: 2400, sink: 4.5,
            a: { upper: 30, head: -20, legF: -70, shinF: 95, legB: -70, shinB: 95, armF: [14, -20], armB: [13.6, -20.4] }, b: { armF: [9, -21], armB: [8.6, -21.4] },
            easier: { say: "کمی پایین برو، فقط تا جایی که راحتی.", times: 8 }, harder: { times: 15 } },
          { name: "پلانک روی زانو", art: "h-girl", say: "روی زانوها و دست‌ها، بدن مثل یک خط صاف. نگه دار و بشمار.", times: 10, pace: 1000, sink: 9.4, hop: -18.8,
            a: { upper: 60, head: -40, legF: 60, shinF: 30, legB: 60, shinB: 30, armF: [8.2, -9.8], armB: [7.8, -9.8] },
            b: { upper: 60, head: -36, legF: 60, shinF: 30, legB: 60, shinB: 30, armF: [8.2, -9.8], armB: [7.8, -9.8] },
            easier: { say: "تا پنج نگه دار.", times: 5 }, harder: { say: "تا بیست نگه دار.", times: 20 } }
        ] },
      { type: "move", prompt: "۴. کشش",
        moves: [
          { name: "قد کشیدن", part: "calm", say: "دست‌ها را بالا ببر، قد بکش و آرام پایین بیاور.", times: 4, pace: 3600,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -38], armR: [9, -38] } },
          { name: "خم شدن به جلو", part: "calm", art: "h-girl", say: "زانوها کمی نرم. آرام به جلو خم شو و دست‌ها را به طرف پا ببر. فقط تا جایی که درد ندارد.", times: 4, pace: 4000,
            a: {}, b: { upper: 80, head: 10, armF: [7.5, -6], armB: [7, -6] } },
          { name: "حرکت گربه", part: "calm", art: "h-girl", say: "روی دست‌ها و زانوها: پشت را گرد کن، بعد آرام گود کن.", times: 5, pace: 4000, sink: 6.4, hop: -12.8,
            a: { upper: 88, head: -50, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10.5, -6.6], armB: [9.6, -6.6] },
            b: { upper: 78, head: -30, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10.5, -6.6], armB: [9.6, -6.6] } }
        ] },
      { type: "move", prompt: "۵. آرام شدن",
        moves: [
          { name: "راه رفتن آهسته", part: "calm", art: "h-girl", say: "آهسته و آرام سر جایت راه برو.", times: 16, pace: 1600,
            a: { legF: -25, shinF: 30, armB: -15 }, b: { legB: -25, shinB: 30, armF: -15 } },
          { name: "نفس آرام", part: "calm", say: "با دم دست‌ها را باز کن، با بازدم آرام پایین بیاور.", times: 3, pace: 6000,
            a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-12, -26], armR: [12, -26] } }
        ] },
      { type: "forparents",
        tips: [
          "این نرمش با استراحت‌های کوتاه حدود ده دقیقه طول می‌کشد. اگر وقت بیشتری دارید، بخش «حرکت‌های قلب» را دو بار انجام دهید.",
          "دکمه «آسان‌تر» و «سخت‌تر» را با هم انتخاب کنید. هر حرکت باید بدون درد باشد؛ اگر جایی درد گرفت، دست نگه دارید.",
          "جای کافی، زمین صاف و غیرلغزنده و کفش یا پای برهنه (نه جوراب روی سرامیک) لازم است. پرش‌ها را دور از لبه میز و مبل انجام دهید.",
          "سازمان جهانی بهداشت برای کودکان روزی میانگین ۶۰ دقیقه حرکت متوسط تا شدید پیشنهاد می‌کند؛ این نرمش بخشی از آن است، نه همه‌اش. با هم انجامش دهید."
        ] }
    ]
  },
  {
    id: "health-sapling-30", subject: "health", level: "sapling", emoji: "🔗", title: "زنجیره حرکت",
    steps: [
      /* On a rug, the girl (seen from the front) makes a movement chain: a still start like a pencil, a balance on one
         foot, a star jump, travelling sideways in steps, and a still star to finish; then a boy faces her and mirrors
         her moves. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین یک زنجیره حرکت چطور ساخته می‌شود", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, rug: { art: "rug-side", at: [80, 90], s: 1.8 },
          girl: { art: "h-girl-front", at: [56, 86], s: 1.5 }, boy: { art: "h-boy-front", at: [112, 86], s: 1.5, o: 0 }
        },
        scenes: [
          { caption: "شروع: صاف و بی‌حرکت می‌ایستیم، مثل یک مداد.", key: 1600, hold: 3800, do: [] },
          { caption: "بعد یک تعادل: روی یک پا، دست‌ها باز. تا سه می‌شماریم.", key: 2400, hold: 4800, do:
            B.hpose("girl", "h-girl-front", { armL: [-11, -22], armR: [11, -22], legR: -28 }, 300, 900).concat([
            { id: "girl", to: { r: 2 }, at: 1300, dur: 2400, yoyo: true, times: 4 }
          ]) },
          { caption: "یک پرش: دست‌ها بالا و پاها باز، و نرم فرود می‌آییم.", key: 1150, hold: 4200, do:
            B.hpose("girl", "h-girl-front", { armL: [-9, -36], armR: [9, -36], legL: 14, legR: -14 }, 600, 350).concat([
            { id: "girl", path: "M56 86Q56 72 56 86", at: 700, dur: 900 }
          ], B.hunpose("girl", "h-girl-front", 1700, 500)) },
          { caption: "یک حرکت رفتنی: چند قدم به پهلو می‌رویم.", key: 1650, hold: 4800, do: [
            { id: "girl", to: { x: 100 }, at: 300, dur: 3600, ease: "linear" },
            { id: "girl.legL", to: { r: 12 }, at: 300, dur: 3600, yoyo: true, times: 8 }, { id: "girl.legR", to: { r: -12 }, at: 300, dur: 3600, yoyo: true, times: 8 }
          ] },
          { caption: "پایان: یک شکل آخر و بی‌حرکت، مثل ستاره. تمام!", key: 2400, hold: 4600, do:
            B.hpose("girl", "h-girl-front", { armL: [-11, -30], armR: [11, -30], legL: 16, legR: -16 }, 300, 900).concat([
            { id: "girl.mouth", to: { o: 0 }, at: 1400, dur: 100 }, { id: "girl.grin", to: { o: 1 }, at: 1400, dur: 100 }
          ]) },
          { caption: "با یک دوست: یکی حرکت می‌کند و دیگری مثل آینه همان کار را می‌کند.", key: 3200, hold: 6400, do: [
            { id: "girl", to: { x: 52 }, dur: 600 }, { id: "boy", to: { o: 1 }, at: 300, dur: 500 }
          ].concat(B.hunpose("girl", "h-girl-front", 0, 600),
            B.hpose("girl", "h-girl-front", { armR: [11, -30] }, 1200, 700), B.hpose("boy", "h-boy-front", { armL: [-11, -30] }, 1500, 700),
            B.hpose("girl", "h-girl-front", { armL: [-11, -22], legL: 16 }, 3600, 700), B.hpose("boy", "h-boy-front", { armR: [11, -22], legR: -16 }, 3900, 700)) }
        ] },
      { type: "order", prompt: "زنجیره را به ترتیب بچین", numbered: true,
        items: [{ pic: "✏️", label: "شروع: مداد" }, { pic: "🦩", label: "تعادل روی یک پا" }, { pic: "⭐", label: "پرش" }, { pic: "👣", label: "قدم به پهلو" }, { pic: "🌟", label: "پایان: ستاره" }] },
      { type: "doit", pic: "🔗", text: "زنجیره خودت را بساز و سه بار تکرارش کن، یک بار با موسیقی و یک بار در سکوت:", list: ["یک شکل شروع", "یک تعادل", "یک پرش", "یک حرکت رفتنی (قدم، لی‌لی یا غلت)", "یک شکل پایان"] },
      { type: "doit", pic: "🪞", text: "بازی آینه: با بزرگ‌تر یا دوستت رو به رو بایستید. یکی آرام حرکت کند و دیگری مثل آینه همان را انجام دهد. بعد جایتان را عوض کنید." },
      { type: "forparents",
        tips: [
          "زنجیره حرکت پایه ژیمناستیک و رقص است: کودک چند حرکت را به هم وصل می‌کند و یاد می‌گیرد شروع و پایان روشن داشته باشد و حرکت‌ها را به یاد بسپارد.",
          "فقط حرکت‌های امن خانگی: بدون بالانس دست، پشتک یا وارو. غلت را فقط روی تشک نرم و با نظارت انجام دهید.",
          "از کودک بخواهید زنجیره‌اش را برای خانواده اجرا کند و آن را با یک کلمه یا نقاشی ساده یادداشت کند.",
          "بازی آینه تمرکز، هماهنگی و نوبت گرفتن را تقویت می‌کند؛ اول خودتان آهسته حرکت کنید."
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
    id: "health-sapling-19", subject: "health", level: "sapling", emoji: "🌈", title: "هر بدن یک جور است",
    steps: [
      /* In the park, children who look different come together: a tall boy and a shorter girl; a boy with glasses and
         a girl with freckles (the camera comes close to their faces); a boy in a wheelchair rolls up; then they all
         play ball together and the boy in the wheelchair catches it. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به بچه‌ها نگاه کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" },
          tall: { art: "h-boy", at: [22, 88], s: 1.7 }, short: { art: "h-girl", at: [44, 88], s: 1.25 },
          glasses: { art: "h-boy-glasses", at: [176, 88], s: 1.45, flip: true }, freckles: { art: "h-girl-freckles", at: [196, 88], s: 1.4, flip: true },
          wc: { art: "h-wheelchair", at: [210, 88], s: 1.4, flip: true }, kid: { art: "h-kid-chair", at: [0, 6], under: "wc" },
          ball: { art: "⚽", at: [52, 66], s: 0.45, o: 0 }
        },
        scenes: [
          { caption: "بچه‌ها با سرعت‌های مختلف بزرگ می‌شوند. یکی بلندتر است و یکی کوتاه‌تر.", key: 2000, hold: 4800, do: B.hpose("kid", "h-kid-chair", { legF: -90, shinF: 90, legB: -90, shinB: 90, armF: [5, -15], armB: [4.6, -15.2] }, 0, 1).concat([
            { id: "tall.head", to: { r: 8 }, at: 800, dur: 1600, yoyo: true, times: 2 }, { id: "short.head", to: { r: -10 }, at: 1000, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "یکی عینک می‌زند و یکی کک‌مک دارد.", key: 3600, hold: 6000, do: [
            { id: "glasses", walk: [70, 88], at: 0, dur: 2000 }, { id: "freckles", walk: [92, 88], at: 200, dur: 2000 },
            { cam: { x: 85, y: 62, zoom: 1.65 }, at: 2400, dur: 1000 },
            { cam: { x: 80, y: 50, zoom: 1 }, at: 4600, dur: 900 }
          ] },
          { caption: "یکی با ویلچر جابه‌جا می‌شود.", key: 2600, hold: 5000, do: [
            { id: "wc", to: { x: 124 }, at: 300, dur: 2600, ease: "out" }, { id: "wc.wheel", to: { r: 300 }, at: 300, dur: 2600, ease: "out" },
            { id: "kid.foreF", to: { r: "+14" }, at: 300, dur: 2400, yoyo: true, times: 6 }
          ] },
          { caption: "همه بدن‌ها خوب‌اند. هیچ‌کس را برای بدنش مسخره نمی‌کنیم و با همه بازی می‌کنیم.", key: 3200, hold: 6000, do:
            B.hpose("short", "h-girl", { armF: [8, -27] }, 300, 500).concat([
            { id: "ball", to: { o: 1 }, at: 700, dur: 200 }, { id: "ball", path: "M52 66Q90 24 117 58", at: 1300, dur: 1600, ease: "linear" }
          ], B.hpose("short", "h-girl", { armF: [0.2, -12] }, 1500, 500), B.hpose("kid", "h-kid-chair", { armF: [7, -27], armB: [6.6, -27.4] }, 2100, 600), [
            { emit: "spark", where: [80, 40], spread: [90, 20], n: 8, at: 3000, dur: 1400, life: 1200 }
          ]) }
        ] },
      { type: "choose", prompt: "یکی از بچه‌ها به قد کوتاه دوستت می‌خندد. چه کار می‌کنی؟", say: "یکی از بچه‌ها به قد کوتاه دوستت می‌خندد. چه کار می‌کنی؟", stack: true,
        options: ["🙋 می‌گویم این کار درست نیست، کنار دوستم می‌ایستم و اگر ادامه داد به بزرگ‌تر می‌گویم", "😂 من هم می‌خندم", "🙈 وانمود می‌کنم ندیدم"],
        answer: "🙋 می‌گویم این کار درست نیست، کنار دوستم می‌ایستم و اگر ادامه داد به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "یک بچه تازه با ویلچر به کلاس آمده است. کدام کار مهربانانه است؟", say: "یک بچه تازه با ویلچر به کلاس آمده است. کدام کار مهربانانه است؟", stack: true,
        options: ["👋 سلام می‌کنم و می‌پرسم دوست دارد با هم چه بازی کنیم", "👀 از دور به او خیره می‌شوم", "🚫 فکر می‌کنم نمی‌تواند بازی کند"],
        answer: "👋 سلام می‌کنم و می‌پرسم دوست دارد با هم چه بازی کنیم" },
      { type: "choose", prompt: "کدام جمله درست است؟", say: "کدام جمله درست است؟", stack: true,
        options: ["🌈 بدن‌ها جورواجورند و همه خوب‌اند", "📏 فقط بدن قدبلند خوب است", "🙅 هر کس عینک دارد نباید بازی کند"], answer: "🌈 بدن‌ها جورواجورند و همه خوب‌اند" },
      { type: "talk", scene: "🧒👧🧑‍🦽👦", caption: "تو و دوستانت در چه چیزهایی شبیه هم هستید و در چه چیزهایی فرق دارید؟ بدنت چه کارهای خوبی برایت انجام می‌دهد؟" },
      { type: "forparents",
        tips: [
          "کودکان با سرعت‌های متفاوت رشد می‌کنند؛ قد، وزن و زمان تغییرات بدن در بچه‌های هم‌سن خیلی فرق دارد و این طبیعی است. اگر نگرانی دارید، با پزشک کودک صحبت کنید، نه جلوی کودک.",
          "درباره بدن خودتان و دیگران (چاقی، لاغری، قد، رنگ پوست) جلوی کودک حرف منفی نزنید. به کارهایی که بدن می‌کند توجه کنید، نه فقط به ظاهرش.",
          "اگر کودک درباره معلولیت یا ظاهر کسی سؤال کرد، ساده و محترمانه جواب دهید و او را به دوستی و بازی مشترک تشویق کنید.",
          "مسخره کردن به خاطر بدن نوعی قلدری است. به کودک یاد دهید کنار دوستش بایستد و به بزرگ‌تر بگوید."
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
    id: "health-sapling-20", subject: "health", level: "sapling", emoji: "🛑", title: "قلدری، نه!",
    steps: [
      /* In the park: a child says unkind words to a boy and takes his ball (the boy looks down; nobody is hurt); a heart:
         it is never his fault; a girl who saw it comes and stands beside him; the two of them, seen from the front,
         raise a hand and say «بس کن!» together, and the two other children walk away; then the girl and the boy go
         together to a teacher and tell her. Drawings: js/art/rig-health.js; the other children are walkers. */
      { type: "scene", prompt: "ببین چه کار می‌کنیم", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, park2: { art: "h-park", at: [-160, 0] },
          teacher: { art: "h-teacher", at: [-66, 88], s: 1.15 },
          boy: { art: "h-boy", at: [70, 88], s: 1.4 }, girl: { art: "h-girl", at: [-24, 88], s: 1.4 },
          boyF: { art: "h-boy-front", at: [74, 88], s: 1.5, o: 0 }, girlF: { art: "h-girl-front", at: [54, 88], s: 1.5, o: 0 },
          w1: { art: "👦", at: [98, 88], s: 1.75, flip: true, look: { top: "#5a9a45" } }, w2: { art: "🧒", at: [116, 88], s: 1.75, flip: true },
          ball: { art: "⚽", at: [80, 86], s: 0.45 }, words: { art: "h-talk", at: [89, 50], s: 1.2, flip: true, o: 0 },
          heart: { art: "h-heart", at: [70, 30], o: 0 }, talk: { art: "h-talk", at: [0, 0], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "قلدری یعنی کسی بارها و از عمد، دیگری را اذیت کند: مثلاً حرف زشت بزند یا وسایلش را بگیرد.", key: 3400, hold: 6400, do: [
            { id: "words", to: { o: 1 }, at: 600, dur: 200 }, { id: "words", to: { s: 1.6 }, at: 600, dur: 2400, yoyo: true, times: 6 },
            { id: "ball", path: "M80 86L106 86", at: 2400, dur: 900 }, { id: "ball", to: { r: 360 }, at: 2400, dur: 900 },
            { id: "boy.head", to: { r: 12 }, at: 1600, dur: 800 }, { id: "words", to: { o: 0 }, at: 4800, dur: 300 }
          ] },
          { caption: "این هیچ‌وقت تقصیر کسی نیست که اذیت می‌شود.", key: 2400, hold: 4600, do: [
            { id: "heart", to: { o: 1 }, at: 300, dur: 400 }, { id: "heart", to: { s: 1.3 }, at: 700, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "اگر ببینیم کسی اذیت می‌شود، پیشش می‌رویم و کنارش می‌ایستیم.", key: 3200, hold: 5200, do: [
            { id: "heart", to: { o: 0 }, dur: 300 }, { id: "girl", walk: [52, 88], at: 300, dur: 2600 }, { id: "boy.head", to: { r: 0 }, at: 2800, dur: 600 }
          ] },
          { caption: "با هم، محکم و آرام می‌گوییم: «بس کن!»", key: 2000, hold: 5200, do: [
            { id: "girl", to: { o: 0 }, dur: 300 }, { id: "boy", to: { o: 0 }, dur: 300 }, { id: "girlF", to: { o: 1 }, dur: 300 }, { id: "boyF", to: { o: 1 }, dur: 300 }
          ].concat(B.hpose("girlF", "h-girl-front", "stop", 400, 600), B.hpose("boyF", "h-boy-front", "stop", 400, 600), [
            { id: "girlF.palmR", to: { o: 1 }, at: 1000, dur: 200 }, { id: "girlF.handR", to: { o: 0 }, at: 1000, dur: 200 },
            { id: "boyF.palmR", to: { o: 1 }, at: 1000, dur: 200 }, { id: "boyF.handR", to: { o: 0 }, at: 1000, dur: 200 },
            { id: "girlF.mouth", to: { o: 0 }, at: 1100, dur: 100 }, { id: "girlF.open", to: { o: 1 }, at: 1100, dur: 100 },
            { id: "boyF.mouth", to: { o: 0 }, at: 1100, dur: 100 }, { id: "boyF.open", to: { o: 1 }, at: 1100, dur: 100 },
            { id: "w1", to: { flip: 1 }, at: 3000, dur: 1 }, { id: "w2", to: { flip: 1 }, at: 3000, dur: 1 },
            { id: "w1", walk: [200, 88], at: 3100, dur: 2400 }, { id: "w2", walk: [216, 88], at: 3100, dur: 2400 }
          ]) },
          { caption: "بعد با هم به یک بزرگ‌تر می‌گوییم. این خبرچینی نیست؛ کمک خواستن است.", key: 5000, hold: 7000, do: [
            { id: "girlF", to: { o: 0 }, dur: 300 }, { id: "boyF", to: { o: 0 }, dur: 300 },
            { id: "girl", to: { o: 1, flip: -1 }, dur: 300 }, { id: "boy", to: { o: 1, flip: -1, x: 74 }, dur: 300 },
            { cam: { x: 0 }, at: 400, dur: 2000 },
            { id: "girl", walk: [-38, 88], at: 400, dur: 2800 }, { id: "boy", walk: [-20, 88], at: 400, dur: 2800 }
          ].concat(B.hpose("girl", "h-girl", "talk", 3300, 400), [
            { id: "talk", to: { o: 1, x: -45, y: 50 }, at: 3500, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 3500, dur: 2400, yoyo: true, times: 6 },
            { id: "teacher.head", to: { r: 10 }, at: 4400, dur: 1200, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "choose", prompt: "کدام یکی قلدری است؟", say: "کدام یکی قلدری است؟", stack: true,
        options: ["🔁 یک نفر هر روز از عمد به یک بچه حرف زشت می‌زند", "⚽ دو دوست یک بار سر نوبت بازی بحث می‌کنند و آشتی می‌کنند", "😄 دوستت با هم شوخی می‌کنید و هر دو می‌خندید"],
        answer: "🔁 یک نفر هر روز از عمد به یک بچه حرف زشت می‌زند" },
      { type: "choose", prompt: "می‌بینی چند بچه، یک بچه را بازی نمی‌دهند و مسخره‌اش می‌کنند. چه کار می‌کنی؟", say: "می‌بینی چند بچه، یک بچه را بازی نمی‌دهند و مسخره‌اش می‌کنند. چه کار می‌کنی؟", stack: true,
        options: ["🤝 کنارش می‌ایستم، با هم دور می‌شویم و به بزرگ‌تر می‌گوییم", "😂 من هم با آن‌ها می‌خندم", "👊 با آن‌ها دعوا می‌کنم"],
        answer: "🤝 کنارش می‌ایستم، با هم دور می‌شویم و به بزرگ‌تر می‌گوییم" },
      { type: "choose", prompt: "یکی هر روز در راه مدرسه تو را اذیت می‌کند. تقصیر کیست؟", say: "یکی هر روز در راه مدرسه تو را اذیت می‌کند. تقصیر کیست؟", stack: true,
        options: ["💛 تقصیر من نیست. به بزرگ‌تر می‌گویم تا کمکم کند", "😔 لابد تقصیر من است", "🤐 به هیچ‌کس نمی‌گویم"], answer: "💛 تقصیر من نیست. به بزرگ‌تر می‌گویم تا کمکم کند" },
      { type: "talk", scene: "🧒👧🤝", caption: "اگر ببینی کسی تنها مانده یا اذیت می‌شود، چه کار می‌توانی بکنی؟ به کدام بزرگ‌ترها می‌توانی بگویی؟" },
      { type: "forparents",
        tips: [
          "قلدری رفتاری است که از عمد و بارها تکرار می‌شود و یک طرف زور یا قدرت بیشتری دارد: کتک، حرف زشت و لقب گذاشتن، کنار گذاشتن، گرفتن وسایل، یا اذیت در پیام و بازی اینترنتی. یک دعوای یک‌باره قلدری نیست.",
          "اگر کودک گفت اذیت می‌شود، آرام گوش دهید، از او تشکر کنید که گفت، و بگویید تقصیر او نیست. با معلم و مدیر مدرسه صحبت کنید؛ از کودک نخواهید خودش «جوابش را بدهد» یا دعوا کند.",
          "نشانه‌هایی که شاید کودک چیزی نگوید: نخواستن رفتن به مدرسه، گم شدن یا خراب شدن وسایل، دل‌درد و سردرد صبح‌ها، تنهایی، یا تغییر ناگهانی خلق.",
          "به کودک یاد دهید تماشاچی نماند: کنار کسی که اذیت می‌شود بایستد، با او دور شود و به بزرگ‌تر بگوید. خبر دادن به بزرگ‌تر کمک است، نه خبرچینی.",
          "اگر کودک خودش دیگران را اذیت می‌کند، او را تحقیر نکنید؛ دلیلش را بفهمید، روشن بگویید این رفتار پذیرفته نیست، و جبران و همدلی را تمرین کنید."
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
  {
    id: "health-sapling-21", subject: "health", level: "sapling", emoji: "🏫", title: "تا مدرسه",
    steps: [
      /* The way to school: the girl walks on the pavement with her mother, who walks on the road side; they cross a wide
         road on the footbridge while a car passes underneath; they wait well back from the kerb until the school bus
         has stopped; in the bus (cut open) the girl fastens her seat belt; and on a free afternoon she rides her bike
         in the park with a helmet. Drawings: js/art/rig-health.js; the cars, the bus and the bike are js/art/things.js. */
      { type: "scene", prompt: "راه امن مدرسه", bg: "#cfe9f7",
        parts: {
          walkway: { art: "h-walkway" }, car1: { art: "🚗", at: [190, 75], s: 1.1 },
          bridge: { art: "h-footbridge", o: 0 }, car2: { art: "🚘", at: [80, 72], s: 0.3, o: 0 },
          street: { art: "h-street", o: 0 }, bus: { art: "🚌", at: [-50, 64], s: 1.5, flip: true, o: 0 },
          momB: { art: "h-mom-back", at: [80, 90], s: 0.95, o: 0 }, kidB: { art: "h-girl-back-pink", at: [66, 90], s: 1, o: 0 },
          mom: { art: "h-mom", at: [-6, 90], s: 1 }, girl: { art: "h-girl", at: [-24, 95], s: 1.3 },
          panel: { art: "h-panel", o: 0 }, carIn: { art: "h-car-in", o: 0 },
          kidCar: { art: "h-girl", at: [61.1, 66.8], o: 0 }, driver: { art: "h-dad", at: [100, 77], s: 0.95, o: 0 },
          carBody: { art: "h-car-body", o: 0 }, belt: { art: "h-belt", o: 0 },
          park: { art: "h-park", o: 0 }, bike: { art: "🚲", at: [-30, 88], s: 2.2, o: 0 }, rider: { art: "h-girl", at: [-30, 78], s: 1.2, o: 0 },
          helmet: { art: "h-helmet", at: [1.2, -29.4], s: 0.95, under: "rider" }
        },
        scenes: [
          { caption: "با یک بزرگ‌تر، روی پیاده‌رو به مدرسه می‌رویم. بزرگ‌تر طرف خیابان راه می‌رود.", key: 2800, hold: 5600, do: [
            { id: "mom", walk: [96, 90], at: 300, dur: 4400 }, { id: "girl", walk: [80, 95], at: 300, dur: 4400 },
            { id: "car1", to: { x: -40 }, at: 600, dur: 3600, ease: "linear" }
          ] },
          { caption: "از خیابان پهن، از پل عابر پیاده رد می‌شویم.", key: 4600, hold: 6400, do: [
            { id: "walkway", to: { o: 0 }, dur: 500 }, { id: "car1", to: { o: 0 }, dur: 300 }, { id: "bridge", to: { o: 1 }, dur: 500 },
            { id: "mom", to: { x: 4, y: 88, s: 0.75 }, dur: 1 }, { id: "girl", to: { x: 4, y: 88, s: 0.9 }, dur: 1 },
            { id: "mom", path: "M4 88L30 46L100 46", at: 600, dur: 4400, ease: "linear" }, { id: "girl", path: "M4 88L30 46L84 46", at: 1300, dur: 3800, ease: "linear" },
            { id: "car2", to: { o: 1 }, at: 2800, dur: 300 }, { id: "car2", to: { y: 100, s: 1.6 }, at: 2800, dur: 2200, ease: "in" }, { id: "car2", to: { o: 0 }, at: 4800, dur: 300 }
          ].concat(B.hwalk("mom", 600, 4400, 6), B.hwalk("girl", 1300, 3800, 6)) },
          { caption: "منتظر سرویس، روی پیاده‌رو و دور از لبه خیابان می‌ایستیم، تا سرویس کامل بایستد.", key: 3800, hold: 6000, do: [
            { id: "bridge", to: { o: 0 }, dur: 500 }, { id: "mom", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 0 }, dur: 400 },
            { id: "street", to: { o: 1 }, dur: 500 }, { id: "momB", to: { o: 1 }, at: 300, dur: 400 }, { id: "kidB", to: { o: 1 }, at: 300, dur: 400 },
            { id: "bus", to: { o: 1 }, at: 800, dur: 300 }, { id: "bus", to: { x: 128 }, at: 800, dur: 2600, ease: "out" }
          ] },
          { caption: "در سرویس هم عقب می‌نشینیم و کمربند می‌بندیم.", key: 3200, hold: 5400, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "carIn", to: { o: 1 }, at: 300, dur: 500 }, { id: "carBody", to: { o: 1 }, at: 300, dur: 500 },
            { id: "kidCar", to: { o: 1 }, at: 300, dur: 500 }, { id: "driver", to: { o: 1 }, at: 300, dur: 500 },
            { id: "street", to: { o: 0 }, at: 500, dur: 1 }, { id: "bus", to: { o: 0 }, at: 500, dur: 1 }, { id: "momB", to: { o: 0 }, at: 500, dur: 1 }, { id: "kidB", to: { o: 0 }, at: 500, dur: 1 }
          ].concat(B.hpose("kidCar", "h-girl", { armF: [-4, -26] }, 600, 500), [
            { id: "belt", to: { o: 1 }, at: 1200, dur: 1 }, { id: "belt", draw: true, at: 1200, dur: 1100 },
            { emit: "spark", where: [67, 50], spread: [3, 3], n: 4, at: 2400, dur: 300, life: 1000 }
          ], B.hpose("kidCar", "h-girl", { armF: [6, -15] }, 1200, 1100)) },
          { caption: "دوچرخه را در پارک یا کوچه خلوت می‌رانیم، با کلاه ایمنی.", key: 3400, hold: 6000, do: [
            { id: "panel", to: { o: 0 }, dur: 400 }, { id: "carIn", to: { o: 0 }, dur: 400 }, { id: "carBody", to: { o: 0 }, dur: 400 }, { id: "kidCar", to: { o: 0 }, dur: 400 },
            { id: "driver", to: { o: 0 }, dur: 400 }, { id: "belt", to: { o: 0 }, dur: 400 },
            { id: "park", to: { o: 1 }, dur: 600 }, { id: "bike", to: { o: 1 }, at: 400, dur: 400 }, { id: "rider", to: { o: 1 }, at: 400, dur: 400 }
          ].concat(B.hpose("rider", "h-girl", { legF: -60, shinF: 70, legB: -40, shinB: 80, armF: [9, -19], armB: [8.6, -19.4] }, 0, 1), [
            { id: "bike", to: { x: 110 }, at: 700, dur: 4400, ease: "linear" }, { id: "rider", to: { x: 110 }, at: 700, dur: 4400, ease: "linear" },
            { id: "rider.legF", to: { r: -20 }, at: 700, dur: 4400, yoyo: true, times: 8 }, { id: "rider.legB", to: { r: -80 }, at: 700, dur: 4400, yoyo: true, times: 8 }
          ]) }
        ] },
      { type: "choose", prompt: "برای رد شدن از یک خیابان پهن و شلوغ، کدام راه امن‌تر است؟", say: "برای رد شدن از یک خیابان پهن و شلوغ، کدام راه امن‌تر است؟", stack: true,
        options: ["🌉 پل عابر پیاده، یا خط عابر با چراغ سبز و همراه بزرگ‌تر", "🏃 دویدن از وسط ماشین‌ها", "🚧 رد شدن از روی نرده وسط خیابان"], answer: "🌉 پل عابر پیاده، یا خط عابر با چراغ سبز و همراه بزرگ‌تر" },
      { type: "choose", prompt: "توپت به وسط خیابان رفت. چه کار می‌کنی؟", say: "توپت به وسط خیابان رفت. چه کار می‌کنی؟", stack: true,
        options: ["🙋 همان‌جا روی پیاده‌رو می‌مانم و به بزرگ‌تر می‌گویم", "🏃 تند می‌دوم و برش می‌دارم", "👀 اول نگاه می‌کنم، بعد خودم می‌روم"], answer: "🙋 همان‌جا روی پیاده‌رو می‌مانم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "کجا دوچرخه‌سواری کنیم؟", say: "کجا دوچرخه‌سواری کنیم؟", stack: true,
        options: ["🌳 در پارک یا کوچه خلوت، با کلاه ایمنی", "🚗 در خیابان شلوغ، کنار ماشین‌ها", "🌙 شب در تاریکی، بدون چراغ"], answer: "🌳 در پارک یا کوچه خلوت، با کلاه ایمنی" },
      { type: "forparents",
        tips: [
          "کودکان زیر حدود ده سالگی هنوز نمی‌توانند سرعت و فاصله ماشین‌ها را درست تخمین بزنند و میدان دیدشان کوچک‌تر است. در خیابان همیشه همراهشان باشید و دستشان را بگیرید.",
          "راه مدرسه را با هم بروید و جاهای امن را نشان دهید: پل عابر، خط عابر با چراغ، و جاهای خطرناک مثل پشت ماشین‌های پارک‌شده و ورودی پارکینگ‌ها.",
          "سرویس مدرسه: کودک روی پیاده‌رو و دور از لبه منتظر بماند، فقط وقتی سرویس کامل ایستاد سوار و پیاده شود، کمربند ببندد، و هرگز از جلو یا پشت سرویس رد نشود.",
          "دوچرخه‌سواری فقط در پارک، کوچه خلوت یا مسیر دوچرخه، با کلاه ایمنی که درست بسته شده، و با لباس روشن.",
          "خودتان الگو باشید: از پل عابر استفاده کنید و از وسط خیابان رد نشوید."
        ] }
    ]
  },
  {
    id: "health-sapling-22", subject: "health", level: "sapling", emoji: "🏊", title: "آب و شنا",
    steps: [
      /* At the pool, the girl swims while her father watches from the side; at a river, a ball floats away fast while
         the girl and her mother stay back on the bank; in the pool, the girl floats on her back with her father beside
         her; and when a boy in the water waves for help, a girl on the side calls out and throws him a float ring, and
         the father comes. Nobody is shown in danger. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "ببین در آب چطور امن می‌مانیم", bg: "#e8f3f7",
        parts: {
          pool: { art: "h-pool" }, river: { art: "h-river", at: [160, 0] }, sign: { art: "⚠️", at: [296, 82], s: 0.7 },
          dad: { art: "h-dad", at: [14, 70], s: 1 }, sight: { art: "h-sight", at: [20, 32], sx: 0, r: 36, o: 0 },
          swim: { art: "h-girl", at: [50, 76], s: 1.2, r: 90 },
          boy: { art: "h-boy-front", at: [124, 94], s: 1.3, o: 0 },
          rMom: { art: "h-mom", at: [196, 92], s: 1 }, rGirl: { art: "h-girl", at: [212, 94], s: 1.25 }, ball: { art: "⚽", at: [170, 56], s: 0.45 },
          helper: { art: "h-girl2", at: [-14, 70], s: 1.2, o: 0 }, ring: { art: "h-floatring", at: [24, 52], s: 1.2, o: 0 },
          water: { art: "h-pool-water" }, call: { art: "h-talk", at: [27, 41], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "فقط جایی شنا می‌کنیم که یک بزرگ‌تر یا نجات‌غریق نگاهمان می‌کند.", key: 3400, hold: 6000, do: B.hpose("dad", "h-dad", { head: 14 }, 0, 600).concat([
            { id: "swim", to: { x: 104 }, at: 300, dur: 5000, ease: "linear" },
            { id: "swim.armF", to: { r: 360 }, at: 300, dur: 1600, times: 3, ease: "linear" }, { id: "swim.armB", to: { r: 360 }, at: 1100, dur: 1600, times: 3, ease: "linear" },
            { id: "swim.legF", to: { r: -14 }, at: 300, dur: 5000, yoyo: true, times: 16 }, { id: "swim.legB", to: { r: 14 }, at: 300, dur: 5000, yoyo: true, times: 16 },
            { emit: "drop", from: "swim", where: [10, -4], spread: [12, 2], rise: 4, n: 12, at: 400, dur: 4800, life: 600 },
            { id: "sight", to: { o: 1, sx: 5.4 }, at: 1600, dur: 800 }
          ]) },
          { caption: "آب رودخانه آرام به نظر می‌رسد، ولی تند می‌کشد: ببین توپ چه زود رفت! در رودخانه شنا نمی‌کنیم.", key: 3200, hold: 6400, do: [
            { id: "sight", to: { o: 0 }, dur: 300 }, { cam: { x: 240 }, dur: 1400 },
            { id: "river.flow", to: { x: 30 }, at: 0, dur: 6000, ease: "linear" },
            { id: "ball", to: { x: 330 }, at: 1400, dur: 2600, ease: "linear" }, { id: "ball", to: { r: 540 }, at: 1400, dur: 2600, ease: "linear" }
          ].concat(B.hpose("rMom", "h-mom", { armB: [5.6, -25.6] }, 2600, 500), [
            { id: "rGirl.head", to: { r: 8 }, at: 2800, dur: 1600, yoyo: true, times: 2 }
          ]) },
          { caption: "روی آب شناور ماندن را یاد می‌گیریم: به پشت دراز می‌کشیم، دست‌ها باز، و آرام نفس می‌کشیم.", key: 3000, hold: 6000, do: [
            { cam: { x: 80 }, dur: 1400 }, { id: "swim", to: { x: 104, y: 75, r: -90 }, dur: 1 },
            { id: "dad", to: { x: 44, y: 98 }, dur: 1 }
          ].concat(B.hpose("swim", "h-girl", { armF: [-6, -30], armB: [6, -30], legF: -10, legB: 10 }, 0, 1), B.hpose("dad", "h-dad", { head: 18, armF: [12, -24] }, 0, 1), [
            { id: "swim", to: { y: 76.6 }, at: 1400, dur: 4400, yoyo: true, times: 4 }
          ]) },
          { caption: "اگر کسی در آب کمک خواست، خودمان در آب نمی‌پریم. بزرگ‌تر را صدا می‌زنیم و یک حلقه برایش می‌اندازیم.", key: 4400, hold: 7400, do: [
            { id: "swim", to: { o: 0 }, dur: 400 }, { id: "dad", to: { o: 0 }, dur: 400 },
            { id: "boy", to: { o: 1 }, at: 300, dur: 400 }, { id: "helper", to: { o: 1 }, at: 300, dur: 400 }, { id: "helper", walk: [16, 70], at: 300, dur: 1200 }
          ].concat(B.hpose("boy", "h-boy-front", { armR: [7.6, -30] }, 600, 500), [
            { id: "boy.foreR", to: { r: 30 }, at: 1100, dur: 2000, yoyo: true, times: 4 }
          ], B.hpose("helper", "h-girl2", { armF: [6, -15.8] }, 1600, 300), [
            { id: "call", to: { o: 1 }, at: 1700, dur: 200 }, { id: "call", to: { s: 1.6 }, at: 1700, dur: 1400, yoyo: true, times: 4 }, { id: "call", to: { o: 0 }, at: 3100, dur: 200 },
            { id: "dad", to: { x: -20, y: 70, o: 1 }, at: 2000, dur: 1 }
          ], B.hunpose("dad", "h-dad", 2000, 1), [
            { id: "dad", walk: [4, 70], at: 2100, dur: 1600 }
          ], B.hpose("helper", "h-girl2", { armF: [6, -30] }, 2600, 400), [
            { id: "ring", to: { o: 1 }, at: 2900, dur: 100 }, { id: "ring", path: "M26 50Q76 22 118 72", at: 3000, dur: 1000, ease: "linear" }
          ], B.hpose("boy", "h-boy-front", { armL: [-6.4, -22], armR: [6.4, -22] }, 3800, 400)) }
        ] },
      { type: "choose", prompt: "روز گرمی است و کنار رودخانه هستید. بچه‌ها می‌گویند بیا شنا کنیم. چه کار می‌کنی؟", say: "روز گرمی است و کنار رودخانه هستید. بچه‌ها می‌گویند بیا شنا کنیم. چه کار می‌کنی؟", stack: true,
        options: ["🙅 نمی‌روم؛ آب رودخانه تند می‌کشد. فقط کنار آب با بزرگ‌تر بازی می‌کنیم", "🏊 می‌پرم توی آب", "👀 اول نگاه می‌کنم ببینم عمیق است یا نه، بعد می‌روم"], answer: "🙅 نمی‌روم؛ آب رودخانه تند می‌کشد. فقط کنار آب با بزرگ‌تر بازی می‌کنیم" },
      { type: "choose", prompt: "دوستت در استخر خسته شده و کمک می‌خواهد. چه کار می‌کنی؟", say: "دوستت در استخر خسته شده و کمک می‌خواهد. چه کار می‌کنی؟", stack: true,
        options: ["📣 بلند نجات‌غریق را صدا می‌زنم و یک حلقه یا چیز شناور برایش می‌اندازم", "🤽 خودم می‌پرم توی آب", "🏃 می‌دوم و می‌روم"], answer: "📣 بلند نجات‌غریق را صدا می‌زنم و یک حلقه یا چیز شناور برایش می‌اندازم" },
      { type: "choose", prompt: "کجا می‌توانیم شنا کنیم؟", say: "کجا می‌توانیم شنا کنیم؟", stack: true,
        options: ["🏊 استخر یا ساحل مجاز، وقتی نجات‌غریق یا بزرگ‌تر نگاهمان می‌کند", "🌊 پشت سد یا در کانال آب", "🏞️ در رودخانه، تنهایی"], answer: "🏊 استخر یا ساحل مجاز، وقتی نجات‌غریق یا بزرگ‌تر نگاهمان می‌کند" },
      { type: "forparents",
        tips: [
          "غرق شدن بی‌صدا و در چند ثانیه اتفاق می‌افتد. وقتی کودک در آب یا نزدیک آب است، یک بزرگ‌تر فقط و فقط او را نگاه کند، بدون گوشی.",
          "رودخانه، کانال، پشت سد و دریای بی‌نجات‌غریق، حتی برای شناگرها خطرناک است: جریان زیر آب، آب سرد و عمق ناگهانی. فقط در استخر و ساحل‌های مجاز با نجات‌غریق شنا کنید.",
          "اگر می‌توانید، کودک را در کلاس شنا با مربی ثبت‌نام کنید. یاد گرفتن شناور ماندن به پشت و بیرون آمدن از آب، مهارت نجات‌دهنده است.",
          "به کودک یاد دهید برای کمک به کسی در آب، خودش در آب نپرد: بزرگ‌تر را صدا بزند و یک حلقه، توپ یا بطری خالی دربسته برایش بیندازد.",
          "حوض، وان، سطل و بشکه آب را هم خالی یا پوشیده نگه دارید؛ کودک کوچک در آب کم‌عمق هم ممکن است غرق شود."
        ] }
    ]
  },
  {
    id: "health-sapling-23", subject: "health", level: "sapling", emoji: "🌡️", title: "گرما، سرما، هوای آلوده",
    steps: [
      /* Three kinds of day: hot (the boy in the shade of the tree, a sun hat on, drinking water); cold (snow falls and
         the girl comes out of the house in a warm coat and a woolly hat); polluted or dusty air (grey air outside the
         window: the girl closes it, then reads a book on the rug). Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "هوای هر روز، کار خودش را دارد", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, shade: { art: "h-shade", at: [40, 74], s: 1.3 },
          boy: { art: "h-boy", at: [46, 88], s: 1.4 }, hatOn: { art: "h-sunhat", at: [1.2, -31.6], s: 0.7, under: "boy" },
          outside: { art: "h-outside", o: 0 }, girlC: { art: "h-girl-coat", at: [25, 86], s: 1.3, o: 0 }, beanie: { art: "h-beanie", at: [0.9, -29.6], under: "girlC" },
          room: { art: "h-room", o: 0 }, rug: { art: "rug-side", at: [60, 90], s: 1.3, o: 0 },
          winOpen: { art: "h-window-open", at: [104, 36], s: 1.4, o: 0 }, winShut: { art: "h-window", at: [104, 36], s: 1.4, o: 0 }, haze: { art: "h-haze", at: [104, 36], s: 1.4, o: 0 },
          girl: { art: "h-girl", at: [56, 86], s: 1.4, o: 0 }, book: { art: "📖", at: [67.5, 70.4], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "روزهای گرم: آب زیاد می‌نوشیم، کلاه سر می‌گذاریم و در سایه بازی می‌کنیم.", key: 2600, hold: 5000, do: B.hpose("boy", "h-boy", "drink", 600, 700).concat([
            { id: "boy.glass", to: { o: 1 }, at: 600, dur: 200 },
            { id: "boy.shut", to: { o: 1 }, at: 1400, dur: 200 }, { id: "boy.eye", to: { o: 0 }, at: 1400, dur: 200 },
            { emit: "spark", where: [138, 14], spread: [20, 14], n: 5, at: 300, dur: 1200, life: 1200 }
          ]) },
          { caption: "روزهای سرد: لباس گرم و چند لایه می‌پوشیم و کلاه سر می‌گذاریم.", key: 3200, hold: 5800, do: [
            { id: "park", to: { o: 0 }, dur: 500 }, { id: "shade", to: { o: 0 }, dur: 500 }, { id: "boy", to: { o: 0 }, dur: 500 },
            { id: "outside", to: { o: 1 }, dur: 500 }, { id: "girlC", to: { o: 1 }, at: 400, dur: 400 },
            { id: "girlC", walk: [88, 86], at: 800, dur: 2800 },
            { emit: "bubble", where: [80, 20], spread: [160, 30], rise: -50, n: 40, at: 300, dur: 5000, life: 2600 }
          ] },
          { caption: "روزهایی که هوا آلوده یا پر از گرد و خاک است، در خانه می‌مانیم و پنجره را می‌بندیم.", key: 3600, hold: 6000, do: [
            { id: "outside", to: { o: 0 }, dur: 500 }, { id: "girlC", to: { o: 0 }, dur: 400 },
            { id: "room", to: { o: 1 }, dur: 500 }, { id: "rug", to: { o: 1 }, dur: 500 }, { id: "winOpen", to: { o: 1 }, dur: 500 }, { id: "haze", to: { o: 1 }, at: 300, dur: 900 },
            { id: "girl", to: { o: 1 }, at: 300, dur: 400 }, { id: "girl", walk: [88, 86], at: 700, dur: 1800 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9, -30] }, 2600, 500), [
            { id: "winOpen", to: { o: 0 }, at: 3100, dur: 400 }, { id: "winShut", to: { o: 1 }, at: 3100, dur: 400 }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 4200, 500)) },
          { caption: "در خانه آرام بازی می‌کنیم؛ مثلاً کتاب می‌خوانیم.", key: 3400, hold: 5600, do: [
            { id: "girl", to: { flip: -1 }, at: 200, dur: 1 }, { id: "girl", walk: [64, 86], at: 300, dur: 1400 },
            { id: "girl", to: { flip: 1, x: 56 }, at: 1800, dur: 1 }, { id: "girl", to: { y: 97.8 }, at: 1900, dur: 600 }
          ].concat(B.hpose("girl", "h-girl", { legF: -84, shinF: 168, legB: -84, shinB: 168, armF: [8.2, -19.6], armB: [7.8, -19.8], head: 10 }, 1900, 600), [
            { id: "book", to: { o: 1 }, at: 2400, dur: 300 }
          ]) }
        ] },
      { type: "sort", prompt: "هر کار را در سبد هوای خودش بگذار",
        baskets: [{ label: "روز گرم", pic: "☀️", value: "hot" }, { label: "روز سرد", pic: "❄️", value: "cold" }, { label: "هوای آلوده", pic: "🌫️", value: "dust" }],
        items: [
          { pic: "💧", say: "آب زیاد", basket: "hot" }, { pic: "🌳", say: "بازی در سایه", basket: "hot" },
          { pic: "🧥", say: "کاپشن", basket: "cold" }, { pic: "🧣", say: "شال‌گردن و دستکش", basket: "cold" },
          { pic: "🪟", say: "پنجره بسته", basket: "dust" }, { pic: "📚", say: "بازی آرام در خانه", basket: "dust" }
        ] },
      { type: "sort", prompt: "کدام کار درست است و کدام نه؟",
        baskets: [{ label: "درست", pic: "✅", value: "ok" }, { label: "نه!", pic: "🚫", value: "no" }],
        items: [
          { pic: "🧢", say: "کلاه در آفتاب", basket: "ok" }, { pic: "🧤", say: "دستکش در برف", basket: "ok" }, { pic: "🏠", say: "ماندن در خانه در هوای آلوده", basket: "ok" },
          { pic: "🏃", say: "دویدن ظهر تابستان زیر آفتاب", basket: "no" }, { pic: "👕", say: "لباس نازک در برف", basket: "no" }, { pic: "⚽", say: "فوتبال بیرون در هوای آلوده", basket: "no" }
        ] },
      { type: "choose", prompt: "تابستان است و هوا خیلی گرم. کی بیرون بازی کنیم؟", say: "تابستان است و هوا خیلی گرم. کی بیرون بازی کنیم؟", stack: true,
        options: ["🌅 صبح زود یا عصر، در سایه، با بطری آب", "☀️ ظهر، زیر آفتاب", "🚗 در ماشین بسته منتظر بمانیم"], answer: "🌅 صبح زود یا عصر، در سایه، با بطری آب" },
      { type: "forparents",
        tips: [
          "گرما: در روزهای داغ، بازی بیرون را به صبح زود و عصر ببرید؛ آب زیاد، لباس روشن و گشاد، کلاه و ضدآفتاب. هرگز کودک را حتی چند دقیقه در ماشین بسته تنها نگذارید.",
          "نشانه‌های گرمازدگی: سردرد، سرگیجه، تهوع، خستگی زیاد یا پوست داغ و قرمز. کودک را به سایه یا جای خنک ببرید، آب بدهید و اگر بهتر نشد یا گیج بود، به ۱۱۵ زنگ بزنید.",
          "سرما: چند لایه لباس نازک بهتر از یک لباس کلفت است؛ کلاه، دستکش و جوراب گرم. وسیله گرمایشی را هرگز در اتاق خواب بسته روشن نگذارید (گاز گرفتگی).",
          "هوای آلوده و گرد و خاک: شاخص کیفیت هوا را در اخبار یا برنامه‌های هواشناسی ببینید. در روزهای ناسالم، فعالیت بیرون را کم کنید، پنجره‌ها را ببندید و بازی آرام در خانه را جایگزین کنید. ماسک معمولی پارچه‌ای در برابر ذرات ریز کمک زیادی نمی‌کند.",
          "کودکان مبتلا به آسم در هوای آلوده و سرد بیشتر مراقبت لازم دارند؛ برنامه پزشکشان را دنبال کنید."
        ] }
    ]
  },
  {
    id: "health-sapling-24", subject: "health", level: "sapling", emoji: "🔐", title: "اینترنت امن",
    steps: [
      /* A big tablet: the full name, the home, the school, a photo and a key (a password) each get a padlock; in a game
         chat, someone we don't know asks where we live (a house and a question mark in the bubble); on the sofa the
         girl turns the tablet off and tells her mother, who listens with an arm round her; and back on the screen she
         sends kind messages (a thumbs-up and a heart) and a friend smiles back. Nothing frightening is drawn.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "اینترنت امن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [64, 88], s: 1.3 },
          mom: { art: "h-mom-home", at: [74, 97.9], s: 1.15 }, girl: { art: "h-girl", at: [58, 91.2], s: 1.4 }, tab: { art: "h-tablet", at: [76, 64], s: 1.2 },
          talk: { art: "h-talk", at: [52, 55], s: 1.2, flip: true, o: 0 }, heart: { art: "h-heart", at: [70, 24], o: 0 },
          tablet: { art: "h-bigtablet" },
          card: { art: "h-namecard", at: [38, 40], s: 1.1 }, home: { art: "🏠", at: [60, 40], s: 0.7 }, school: { art: "🏫", at: [82, 40], s: 0.7 },
          photo: { art: "📷", at: [104, 40], s: 0.7 }, key: { art: "🔑", at: [124, 40], s: 0.7 },
          l1: { art: "h-lock", at: [38, 16], o: 0 }, l2: { art: "h-lock", at: [60, 16], o: 0 }, l3: { art: "h-lock", at: [82, 16], o: 0 }, l4: { art: "h-lock", at: [104, 16], o: 0 }, l5: { art: "h-lock", at: [124, 16], o: 0 },
          who: { art: "👤", at: [40, 34], s: 0.8, o: 0 }, ask: { art: "h-chat", at: [48, 40], s: 1.1, o: 0 }, askHome: { art: "🏠", at: [68, 30], s: 0.5, o: 0 }, askQ: { art: "❓", at: [88, 30], s: 0.5, o: 0 },
          me: { art: "👧", at: [122, 62], s: 0.7, o: 0 }, mine: { art: "h-chat", at: [114, 64], s: 1, sx: -1, o: 0 }, like: { art: "👍", at: [84, 55], s: 0.5, o: 0 }, love: { art: "❤️", at: [100, 55], s: 0.5, o: 0 },
          pal: { art: "👦", at: [40, 30], s: 0.7, o: 0 }, back: { art: "h-chat", at: [48, 34], s: 0.7, o: 0 }, smile: { art: "😊", at: [62, 27], s: 0.45, o: 0 }
        },
        scenes: [
          { caption: "این‌ها خصوصی‌اند: نام کامل، نشانی خانه، مدرسه، عکس و رمز. آن‌ها را در اینترنت به کسی نمی‌گوییم.", key: 4400, hold: 6600, do: B.hpose("girl", "h-girl", { legF: -88, shinF: 88, legB: -88, shinB: 88, armF: [10, -20], armB: [10, -20.4], head: 14 }, 0, 1).concat(
            B.hpose("mom", "h-mom-home", { legF: -88, shinF: 88, legB: -88, shinB: 88, head: 14 }, 0, 1), [
            { id: "l1", to: { o: 1 }, at: 900, dur: 200 }, { id: "l1", path: "M38 16L38 52", at: 900, dur: 500 },
            { id: "l2", to: { o: 1 }, at: 1500, dur: 200 }, { id: "l2", path: "M60 16L60 52", at: 1500, dur: 500 },
            { id: "l3", to: { o: 1 }, at: 2100, dur: 200 }, { id: "l3", path: "M82 16L82 52", at: 2100, dur: 500 },
            { id: "l4", to: { o: 1 }, at: 2700, dur: 200 }, { id: "l4", path: "M104 16L104 52", at: 2700, dur: 500 },
            { id: "l5", to: { o: 1 }, at: 3300, dur: 200 }, { id: "l5", path: "M124 16L124 52", at: 3300, dur: 500 }
          ]) },
          { caption: "در یک بازی اینترنتی، کسی که نمی‌شناسیم پیام می‌دهد و می‌پرسد خانه‌مان کجاست.", key: 3000, hold: 5400, do: [
            { id: "card", to: { o: 0 }, dur: 400 }, { id: "home", to: { o: 0 }, dur: 400 }, { id: "school", to: { o: 0 }, dur: 400 }, { id: "photo", to: { o: 0 }, dur: 400 }, { id: "key", to: { o: 0 }, dur: 400 },
            { id: "l1", to: { o: 0 }, dur: 400 }, { id: "l2", to: { o: 0 }, dur: 400 }, { id: "l3", to: { o: 0 }, dur: 400 }, { id: "l4", to: { o: 0 }, dur: 400 }, { id: "l5", to: { o: 0 }, dur: 400 },
            { id: "who", to: { o: 1 }, at: 700, dur: 400 }, { id: "ask", to: { o: 1 }, at: 1300, dur: 400 }, { id: "askHome", to: { o: 1 }, at: 1700, dur: 300 }, { id: "askQ", to: { o: 1 }, at: 2000, dur: 300 },
            { id: "askQ", to: { s: 0.65 }, at: 2400, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "جواب نمی‌دهیم. صفحه را می‌بندیم و فوراً به بزرگ‌تر می‌گوییم.", key: 4400, hold: 6400, do: [
            { id: "tablet", to: { o: 0 }, dur: 500 }, { id: "who", to: { o: 0 }, dur: 400 }, { id: "ask", to: { o: 0 }, dur: 400 }, { id: "askHome", to: { o: 0 }, dur: 400 }, { id: "askQ", to: { o: 0 }, dur: 400 },
            { id: "tab.glow", to: { o: 0 }, at: 900, dur: 300 },
            { id: "girl.head", to: { r: -30 }, at: 1300, dur: 500 }, { id: "girl", to: { flip: -1 }, at: 1800, dur: 1 }, { id: "girl.head", to: { r: 0 }, at: 1800, dur: 300 },
            { id: "talk", to: { o: 1 }, at: 2200, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 2200, dur: 2000, yoyo: true, times: 6 },
            { id: "heart", to: { o: 1 }, at: 3800, dur: 400 }
          ].concat(B.hpose("mom", "h-mom-home", { upper: -10, armF: [-6, -30], head: -10 }, 3200, 700)) },
          { caption: "در اینترنت هم مهربانیم: پیام خوب می‌فرستیم و کسی را مسخره نمی‌کنیم.", key: 3600, hold: 5800, do: [
            { id: "talk", to: { o: 0 }, dur: 300 }, { id: "heart", to: { o: 0 }, dur: 300 }, { id: "tablet", to: { o: 1 }, at: 200, dur: 500 },
            { id: "me", to: { o: 1 }, at: 700, dur: 300 }, { id: "mine", to: { o: 1 }, at: 1000, dur: 300 }, { id: "like", to: { o: 1 }, at: 1300, dur: 300 }, { id: "love", to: { o: 1 }, at: 1600, dur: 300 },
            { id: "pal", to: { o: 1 }, at: 2400, dur: 300 }, { id: "back", to: { o: 1 }, at: 2700, dur: 300 }, { id: "smile", to: { o: 1 }, at: 3000, dur: 300 }
          ] }
        ] },
      { type: "sort", prompt: "کدام را می‌شود در اینترنت گفت و کدام خصوصی است؟",
        baskets: [{ label: "می‌شود گفت", pic: "💬", value: "ok" }, { label: "خصوصی", pic: "🔒", value: "private" }],
        items: [
          { pic: "🎨", say: "رنگ محبوبم", basket: "ok" }, { pic: "🐱", say: "حیوان محبوبم", basket: "ok" }, { pic: "⚽", say: "بازی‌ای که دوست دارم", basket: "ok" },
          { pic: "🏠", say: "نشانی خانه", basket: "private" }, { pic: "🏫", say: "اسم مدرسه‌ام", basket: "private" }, { pic: "🔑", say: "رمز", basket: "private" }, { pic: "📷", say: "عکس خودم", basket: "private" }
        ] },
      { type: "choose", prompt: "در بازی، کسی می‌گوید: «بیا با هم دوست شویم. عکست را بفرست.» چه کار می‌کنی؟", say: "در بازی، کسی می‌گوید: بیا با هم دوست شویم. عکست را بفرست. چه کار می‌کنی؟", stack: true,
        options: ["🙋 عکس نمی‌فرستم و فوراً به بزرگ‌تر نشان می‌دهم", "📷 عکسم را می‌فرستم", "🤐 می‌فرستم ولی به کسی نمی‌گویم"], answer: "🙋 عکس نمی‌فرستم و فوراً به بزرگ‌تر نشان می‌دهم" },
      { type: "choose", prompt: "می‌خواهی یک بازی یا برنامه تازه نصب کنی. اول چه کار می‌کنی؟", say: "می‌خواهی یک بازی یا برنامه تازه نصب کنی. اول چه کار می‌کنی؟", stack: true,
        options: ["👨‍👩‍👧 اول از بزرگ‌تر می‌پرسم", "⬇️ خودم نصبش می‌کنم", "🔑 رمز مامان را حدس می‌زنم"], answer: "👨‍👩‍👧 اول از بزرگ‌تر می‌پرسم" },
      { type: "choose", prompt: "در گروه کلاس، بچه‌ها عکس یکی را گذاشته‌اند و مسخره‌اش می‌کنند. چه کار می‌کنی؟", say: "در گروه کلاس، بچه‌ها عکس یکی را گذاشته‌اند و مسخره‌اش می‌کنند. چه کار می‌کنی؟", stack: true,
        options: ["💛 من مسخره نمی‌کنم و به بزرگ‌تر می‌گویم", "😂 من هم یک شکلک خنده می‌فرستم", "🔁 عکس را برای بقیه می‌فرستم"], answer: "💛 من مسخره نمی‌کنم و به بزرگ‌تر می‌گویم" },
      { type: "forparents",
        tips: [
          "اطلاعات خصوصی را با کودک فهرست کنید: نام کامل، نشانی، مدرسه، شماره تلفن، عکس و رمزها. قانون خانه: «اول از بزرگ‌تر می‌پرسم» پیش از نصب، خرید یا فرستادن هر چیز.",
          "گفت‌وگو در بازی‌های اینترنتی را تا جای ممکن ببندید یا به دوستان شناخته‌شده محدود کنید، و تنظیمات حریم خصوصی و کنترل والدین را با هم روشن کنید.",
          "آدم‌های بد ممکن است خودشان را بچه معرفی کنند، هدیه یا امتیاز بازی بدهند و بخواهند راز نگه دارید یا عکس بفرستید. به کودک بگویید هیچ بزرگ‌تر خوبی از بچه نمی‌خواهد رازی را از پدر و مادرش پنهان کند.",
          "اگر کودک چیز ناراحت‌کننده‌ای دید یا کسی اذیتش کرد، آرام بمانید، از او تشکر کنید که گفت، و دستگاه را به‌عنوان تنبیه نگیرید؛ وگرنه دفعه بعد نمی‌گوید. پیام‌ها را نگه دارید و گزارش دهید.",
          "دستگاه‌ها را در فضای مشترک خانه استفاده کنید، نه در اتاق دربسته."
        ] }
    ]
  },
  {
    id: "health-sapling-25", subject: "health", level: "sapling", emoji: "🤔", title: "امن یا بپرس: بیرون",
    steps: [
      // The game lesson of the outdoor safety unit: on the way, in the water, in the weather and online, sort each thing
      // into «امن است» and «از بزرگ‌تر می‌پرسم». Every picture is said aloud when tapped.
      { type: "sort", prompt: "در راه: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🌉", say: "رد شدن از پل عابر با بزرگ‌تر", basket: "ok" }, { pic: "🪖", say: "دوچرخه در پارک با کلاه ایمنی", basket: "ok" }, { pic: "🚸", say: "منتظر ماندن روی پیاده‌رو", basket: "ok" },
          { pic: "⚽", say: "برداشتن توپ از وسط خیابان", basket: "ask" }, { pic: "🚗", say: "سوار شدن به ماشین یک غریبه", basket: "ask" }, { pic: "🛣️", say: "رفتن از یک راه تازه به مدرسه", basket: "ask" }
        ] },
      { type: "sort", prompt: "در آب: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "🏊", say: "شنا در استخر وقتی نجات‌غریق نگاه می‌کند", basket: "ok" }, { pic: "🛟", say: "شناور ماندن به پشت در کلاس شنا", basket: "ok" },
          { pic: "🏞️", say: "آب‌تنی در رودخانه", basket: "ask" }, { pic: "🌊", say: "رفتن به آب دریا", basket: "ask" }, { pic: "🤽", say: "پریدن در آب برای کمک به دوست", basket: "ask" }
        ] },
      { type: "sort", prompt: "در گرما، سرما و هوای آلوده: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "💧", say: "آب نوشیدن در روز گرم", basket: "ok" }, { pic: "🧥", say: "پوشیدن کاپشن در روز سرد", basket: "ok" }, { pic: "📚", say: "بازی در خانه وقتی هوا آلوده است", basket: "ok" },
          { pic: "☀️", say: "بازی بیرون ظهر تابستان", basket: "ask" }, { pic: "🔥", say: "روشن کردن بخاری", basket: "ask" }, { pic: "🌫️", say: "دویدن بیرون در گرد و خاک", basket: "ask" }
        ] },
      { type: "sort", prompt: "در اینترنت: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
        baskets: [{ label: "امن است", pic: "👍", value: "ok" }, { label: "از بزرگ‌تر می‌پرسم", pic: "🙋", value: "ask" }],
        items: [
          { pic: "📞", say: "تماس تصویری با مادربزرگ، کنار بزرگ‌تر", basket: "ok" }, { pic: "👍", say: "فرستادن پیام مهربان به دوستم", basket: "ok" },
          { pic: "⬇️", say: "نصب یک بازی تازه", basket: "ask" }, { pic: "📷", say: "فرستادن عکس خودم", basket: "ask" }, { pic: "👤", say: "جواب دادن به پیام یک غریبه", basket: "ask" }, { pic: "🔗", say: "باز کردن یک پیوند عجیب", basket: "ask" }
        ] },
      { type: "forparents",
        tips: [
          "قانون این بخش همان قانون همیشگی است: «اگر مطمئن نیستی، بایست و از بزرگ‌تر بپرس.» در راه، کنار آب، در هوای بد و در اینترنت.",
          "بعد از بازی، چند تا از کارت‌ها را با کودک دوباره ببینید و بپرسید چرا باید درباره‌شان پرسید. جواب‌های او را جدی بگیرید.",
          "این بازی را در زندگی واقعی هم بکنید: پیش از رفتن به پارک، استخر یا سفر بپرسید «این‌جا چه چیزهایی را باید اول بپرسیم؟»",
          "وقتی کودک می‌پرسد، او را تشویق کنید، حتی اگر جواب «آره، اشکالی ندارد» باشد. پرسیدن باید همیشه کار خوبی باشد."
        ] }
    ]
  },
  {
    id: "health-sapling-26", subject: "health", level: "sapling", emoji: "📞", title: "الو، اورژانس؟",
    steps: [
      /* The three numbers, each beside its vehicle; Grandma rests on the sofa feeling unwell (her eyes closed, nothing
         else shown) and the girl, alone with her, phones ۱۱۵; she says who she is, what happened and where (a name
         card, a «!» and a house appear one by one); she listens and stays on the line; then she and her mother practise
         a call, each with a phone. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "زنگ زدن برای کمک", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, sofa: { art: "h-sofa", at: [104, 88], s: 1.3, flip: true },
          gran: { art: "h-gran", at: [110, 97.9], s: 1.15, flip: true, o: 0 }, girl: { art: "h-girl", at: [44, 86], s: 1.4, o: 0 }, mom: { art: "h-mom", at: [120, 86], s: 1.1, flip: true, o: 0 },
          sign: { art: "h-number", at: [44, 18], s: 1.2, o: 0 }, talk: { art: "h-talk", at: [50, 52], s: 1.2, o: 0 }, hear: { art: "h-waves", at: [54, 46], s: 1.1, o: 0 },
          card: { art: "h-namecard", at: [70, 24], s: 1, o: 0 }, what: { art: "❗", at: [90, 24], s: 0.6, o: 0 }, where: { art: "🏠", at: [110, 24], s: 0.6, o: 0 },
          panel: { art: "h-panel" },
          v1: { art: "🚑", at: [52, 30], s: 0.8 }, n1: { art: "h-number", at: [104, 30], s: 1.4 },
          v2: { art: "🚒", at: [52, 54], s: 0.8 }, n2: { art: "h-number", at: [104, 54], s: 1.4 },
          v3: { art: "🚓", at: [52, 78], s: 0.8 }, n3: { art: "h-number", at: [104, 78], s: 1.4 }
        },
        scenes: [
          { caption: "سه شماره مهم: ۱۱۵ اورژانس، برای بیماری و آسیب؛ ۱۲۵ آتش‌نشانی؛ ۱۱۰ پلیس.", key: 3600, hold: 7000, do: [
            { count: "n1", from: 115, to: 115, dur: 1 }, { count: "n2", from: 125, to: 125, dur: 1 }, { count: "n3", from: 110, to: 110, dur: 1 },
            { id: "v1", to: { s: 0.95 }, at: 400, dur: 800, yoyo: true, times: 2 }, { id: "v2", to: { s: 0.95 }, at: 1600, dur: 800, yoyo: true, times: 2 }, { id: "v3", to: { s: 0.95 }, at: 2800, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "اگر مادربزرگ حالش بد شد و بزرگ‌تر دیگری در خانه نبود، به ۱۱۵ زنگ می‌زنیم.", key: 3800, hold: 6400, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "v1", to: { o: 0 }, dur: 500 }, { id: "n1", to: { o: 0 }, dur: 500 }, { id: "v2", to: { o: 0 }, dur: 500 }, { id: "n2", to: { o: 0 }, dur: 500 },
            { id: "v3", to: { o: 0 }, dur: 500 }, { id: "n3", to: { o: 0 }, dur: 500 },
            { id: "gran", to: { o: 1 }, at: 200, dur: 500 }, { id: "girl", to: { o: 1 }, at: 200, dur: 500 },
            { id: "gran.eye", to: { o: 0 }, dur: 1 }, { id: "gran.shut", to: { o: 1 }, dur: 1 }, { id: "girl.head", to: { r: -6 }, at: 900, dur: 600 }
          ].concat(B.hpose("gran", "h-gran", { legF: -88, shinF: 88, legB: -88, shinB: 88, head: -14 }, 0, 1), B.hpose("girl", "h-girl", "ear", 2000, 600), [
            { id: "girl.phone", to: { o: 1 }, at: 2400, dur: 200 }, { count: "sign", from: 115, to: 115, at: 2600, dur: 1 }, { id: "sign", to: { o: 1 }, at: 2600, dur: 300 }
          ]) },
          { caption: "آرام و روشن می‌گوییم: من کی هستم، چه اتفاقی افتاده، و کجا هستیم.", key: 4400, hold: 6800, do: [
            { id: "sign", to: { o: 0 }, dur: 300 },
            { id: "talk", to: { o: 1 }, at: 300, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 300, dur: 4800, yoyo: true, times: 12 },
            { id: "card", to: { o: 1 }, at: 900, dur: 400 }, { id: "what", to: { o: 1 }, at: 2100, dur: 400 }, { id: "where", to: { o: 1 }, at: 3300, dur: 400 }
          ] },
          { caption: "گوشی را قطع نمی‌کنیم. گوش می‌دهیم و همان کاری را می‌کنیم که می‌گویند.", key: 2600, hold: 5000, do: [
            { id: "talk", to: { o: 0 }, dur: 300 }, { id: "card", to: { o: 0 }, dur: 300 }, { id: "what", to: { o: 0 }, dur: 300 }, { id: "where", to: { o: 0 }, dur: 300 },
            { id: "hear", to: { o: 1 }, at: 500, dur: 300 }, { id: "hear", to: { s: 1.4 }, at: 500, dur: 3600, yoyo: true, times: 8 },
            { id: "girl.head", to: { r: 6 }, at: 1200, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "با بزرگ‌ترمان تمرین می‌کنیم: یکی اورژانس می‌شود و یکی زنگ می‌زند.", key: 3600, hold: 6000, do: [
            { id: "hear", to: { o: 0 }, dur: 300 }, { id: "gran", to: { o: 0 }, dur: 500 }, { id: "sofa", to: { o: 0 }, dur: 500 },
            { id: "gran.eye", to: { o: 1 }, at: 500, dur: 1 }, { id: "gran.shut", to: { o: 0 }, at: 500, dur: 1 },
            { id: "mom", to: { o: 1 }, at: 400, dur: 500 }
          ].concat(B.hpose("mom", "h-mom", "ear", 900, 600), [
            { id: "mom.phone", to: { o: 1 }, at: 1300, dur: 200 },
            { id: "talk", to: { o: 1 }, at: 1800, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 1800, dur: 1600, yoyo: true, times: 4 }, { id: "talk", to: { o: 0 }, at: 3400, dur: 200 },
            { id: "mom.head", to: { r: 8 }, at: 3400, dur: 1200, yoyo: true, times: 2 }
          ]) }
        ] },
      { type: "order", prompt: "در تماس با اورژانس، به ترتیب چه می‌گوییم؟", numbered: true,
        items: [{ pic: "👧", label: "من کی هستم" }, { pic: "❗", label: "چه اتفاقی افتاده" }, { pic: "🏠", label: "کجا هستیم: نشانی" }, { pic: "👂", label: "گوش می‌دهم و قطع نمی‌کنم" }] },
      { type: "pairs", prompt: "هر گرفتاری را با شماره‌اش جفت کن",
        pairs: [[{ pic: "🤒", say: "کسی سخت بیمار شده یا آسیب دیده" }, { label: "۱۱۵", say: "صد و پانزده" }], [{ pic: "🔥", say: "آتش" }, { label: "۱۲۵", say: "صد و بیست و پنج" }],
          [{ pic: "🚨", say: "دزد یا گم شدن" }, { label: "۱۱۰", say: "صد و ده" }]] },
      { type: "doit", pic: "📞", text: "با بزرگ‌ترت یک تماس الکی تمرین کن، بدون این‌که واقعاً شماره را بگیری:", list: ["بزرگ‌ترت اورژانس می‌شود.", "بگو کی هستی، چه اتفاقی افتاده و کجا هستید.", "گوش بده و قطع نکن."] },
      { type: "doit", pic: "🏠", text: "نشانی خانه‌تان و شماره تلفن پدر یا مادرت را از حفظ کن و برای بزرگ‌ترت بگو." },
      { type: "forparents",
        tips: [
          "شماره‌ها در ایران: اورژانس ۱۱۵، آتش‌نشانی ۱۲۵، پلیس ۱۱۰، و اورژانس گاز ۱۹۴. این‌ها را کنار تلفن یا روی یخچال بچسبانید.",
          "به کودک یاد دهید فقط در گرفتاری واقعی زنگ بزند و تماس الکی با این شماره‌ها کار اشتباهی است؛ تمرین را بدون گرفتن شماره انجام دهید.",
          "کمک کنید کودک نشانی کامل خانه، یک نشانه نزدیک خانه و شماره پدر و مادر را از حفظ بداند.",
          "اگر گوشی قفل دارد، به کودک نشان دهید چطور از صفحه قفل تماس اضطراری بگیرد.",
          "به کودک بگویید پشت تلفن آرام حرف بزند، قطع نکند و به سؤال‌ها جواب دهد؛ و اگر گفتند، در را برای امدادگرها باز کند."
        ] }
    ]
  },
  {
    id: "health-sapling-27", subject: "health", level: "sapling", emoji: "🎒", title: "کیف اضطراری خانه ما",
    steps: [
      /* The family gets ready together: around a bag on the floor, water, a torch, a whistle, a list of numbers,
         plasters and a snack go into it one by one; in the park they choose a meeting place under the big tree (a
         pin); and on a sheet the plan is ticked off: the bag, the meeting place, the numbers. Calm, no disaster shown.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "برنامه خانواده ما", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, park: { art: "h-park", o: 0 }, bag: { art: "🎒", at: [80, 80], s: 1.1 },
          girl: { art: "h-girl", at: [50, 86], s: 1.4 }, mom: { art: "h-mom-home", at: [108, 86], s: 1.15, flip: true }, dad: { art: "h-dad", at: [132, 86], s: 1.1, flip: true },
          i1: { art: "h-waterbottle", at: [40, 30], s: 1.2, o: 0 }, i2: { art: "🔦", at: [56, 26], s: 0.6, o: 0 }, i3: { art: "h-whistle", at: [72, 26], s: 1.1, o: 0 },
          i4: { art: "📝", at: [88, 26], s: 0.6, o: 0 }, i5: { art: "🩹", at: [104, 26], s: 0.6, o: 0 }, i6: { art: "🍪", at: [120, 26], s: 0.6, o: 0 },
          pin: { art: "📍", at: [22, 36], s: 0.8, o: 0 },
          panel: { art: "h-panel", o: 0 },
          p1: { art: "🎒", at: [62, 30], s: 0.7, o: 0 }, p2: { art: "🌳", at: [62, 52], s: 0.7, o: 0 }, p3: { art: "📞", at: [62, 74], s: 0.7, o: 0 },
          t1: { art: "✅", at: [100, 30], s: 0.6, o: 0 }, t2: { art: "✅", at: [100, 52], s: 0.6, o: 0 }, t3: { art: "✅", at: [100, 74], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "با خانواده، یک کیف اضطراری آماده می‌کنیم.", key: 2400, hold: 4600, do: B.hpose("girl", "h-girl", "talk", 600, 500).concat(
            B.hpose("mom", "h-mom-home", { upper: 20, armF: [14, -22] }, 900, 600), [
            { id: "dad.head", to: { r: 10 }, at: 1400, dur: 1400, yoyo: true, times: 2 }
          ]) },
          { caption: "در آن می‌گذاریم: آب، چراغ‌قوه، سوت، فهرست شماره‌ها، چسب‌زخم و کمی خوراکی.", key: 1700, hold: 7600, do: [
            { id: "i1", to: { o: 1 }, at: 200, dur: 300 }, { id: "i2", to: { o: 1 }, at: 400, dur: 300 }, { id: "i3", to: { o: 1 }, at: 600, dur: 300 },
            { id: "i4", to: { o: 1 }, at: 800, dur: 300 }, { id: "i5", to: { o: 1 }, at: 1000, dur: 300 }, { id: "i6", to: { o: 1 }, at: 1200, dur: 300 },
            { id: "i1", path: "M40 30Q60 40 78 70", at: 1800, dur: 700 }, { id: "i2", path: "M56 26Q70 40 80 70", at: 2300, dur: 700 }, { id: "i3", path: "M72 26Q78 40 80 70", at: 2800, dur: 700 },
            { id: "i4", path: "M88 26Q84 40 80 70", at: 3300, dur: 700 }, { id: "i5", path: "M104 26Q92 40 81 70", at: 3800, dur: 700 }, { id: "i6", path: "M120 26Q100 40 82 70", at: 4300, dur: 700 },
            { id: "i1", to: { o: 0 }, at: 2400, dur: 200 }, { id: "i2", to: { o: 0 }, at: 2900, dur: 200 }, { id: "i3", to: { o: 0 }, at: 3400, dur: 200 },
            { id: "i4", to: { o: 0 }, at: 3900, dur: 200 }, { id: "i5", to: { o: 0 }, at: 4400, dur: 200 }, { id: "i6", to: { o: 0 }, at: 4900, dur: 200 }
          ] },
          { caption: "یک جای دیدار بیرون از خانه انتخاب می‌کنیم؛ مثلاً زیر درخت بزرگ پارک.", key: 4200, hold: 6400, do: [
            { id: "room", to: { o: 0 }, dur: 500 }, { id: "bag", to: { o: 0 }, dur: 500 }, { id: "park", to: { o: 1 }, dur: 600 },
            { id: "girl", to: { flip: -1, x: 110, y: 88 }, at: 300, dur: 1 }, { id: "mom", to: { x: 128, y: 88 }, at: 300, dur: 1 }, { id: "dad", to: { x: 146, y: 88 }, at: 300, dur: 1 }
          ].concat(B.hunpose("girl", "h-girl", 300, 1), B.hunpose("mom", "h-mom-home", 300, 1), [
            { id: "girl", walk: [42, 88], at: 600, dur: 3000 }, { id: "mom", walk: [62, 88], at: 600, dur: 3000 }, { id: "dad", walk: [82, 88], at: 600, dur: 3000 },
            { id: "pin", to: { o: 1 }, at: 3600, dur: 400 }, { id: "pin", path: "M22 20L22 36", at: 3600, dur: 500 }
          ]) },
          { caption: "برنامه را روی کاغذ می‌کشیم و هر چیز که آماده شد، تیک می‌زنیم: کیف، جای دیدار، شماره‌ها.", key: 3600, hold: 6000, do: [
            { id: "panel", to: { o: 1 }, dur: 500 }, { id: "girl", to: { o: 0 }, dur: 500 }, { id: "mom", to: { o: 0 }, dur: 500 }, { id: "dad", to: { o: 0 }, dur: 500 }, { id: "pin", to: { o: 0 }, dur: 500 },
            { id: "p1", to: { o: 1 }, at: 300, dur: 300 }, { id: "p2", to: { o: 1 }, at: 500, dur: 300 }, { id: "p3", to: { o: 1 }, at: 700, dur: 300 },
            { id: "t1", to: { o: 1 }, at: 1400, dur: 300 }, { id: "t2", to: { o: 1 }, at: 2200, dur: 300 }, { id: "t3", to: { o: 1 }, at: 3000, dur: 300 }
          ] }
        ] },
      { type: "sort", prompt: "کدام در کیف اضطراری می‌رود؟",
        baskets: [{ label: "در کیف", pic: "🎒", value: "in" }, { label: "لازم نیست", pic: "🚫", value: "out" }],
        items: [
          { pic: "💧", say: "آب", basket: "in" }, { pic: "🔦", say: "چراغ‌قوه", basket: "in" }, { pic: "📝", say: "فهرست شماره‌ها", basket: "in" }, { pic: "🩹", say: "چسب‌زخم", basket: "in" },
          { pic: "🎮", say: "بازی کامپیوتری", basket: "out" }, { pic: "🧸", say: "همه اسباب‌بازی‌ها", basket: "out" }, { pic: "🪴", say: "گلدان", basket: "out" }
        ] },
      { type: "paper", pic: "🗺️", lang: "fa",
        text: "با خانواده‌ات برنامه اضطراری خانه را روی یک کاغذ بکش و بنویس: جای دیدار بیرون از خانه، شماره‌هایی که باید زنگ بزنیم، و چیزهایی که در کیف هست. کنار هر چیزی که آماده شد، تیک بزن.",
        example: "جای دیدار: زیر درخت بزرگ پارک.\nشماره‌ها: ۱۱۵، ۱۲۵، ۱۱۰، شماره مامان و بابا.\nدر کیف: آب ✓ چراغ‌قوه ✓ سوت ✓",
        check: ["جای دیدار را کشیده یا نوشته؟", "دست‌کم سه شماره را نوشته؟", "چیزهای کیف را فهرست کرده و تیک زده؟"],
        note: "برنامه را کنار در یا روی یخچال بچسبانید و هر چند ماه یک بار با هم مرورش کنید." },
      { type: "doit", pic: "🌳", text: "با خانواده‌ات تا جای دیدار بروید و یک بار تمرین کنید: هر کس از خانه بیرون می‌آید و همان‌جا منتظر بقیه می‌ماند." },
      { type: "forparents",
        tips: [
          "برنامه خانواده سه بخش دارد: جای دیدار (یکی نزدیک خانه و یکی دورتر)، چه کسی به چه کسی زنگ بزند (یک آشنای خارج از شهر هم مفید است)، و کیف اضطراری.",
          "کیف اضطراری: آب، خوراکی کم‌حجم، چراغ‌قوه و باتری، سوت، جعبه کمک‌های اولیه، داروهای لازم خانواده، کپی مدارک، کمی پول، لباس گرم و فهرست شماره‌ها. هر چند ماه تاریخ‌ها را چک کنید.",
          "کودک را در آماده کردن کیف شریک کنید؛ کاری که خودش در آن نقش دارد، کمتر می‌ترساندش و بهتر به یادش می‌ماند.",
          "این را با مانور زلزله مدرسه (آذر) هماهنگ کنید و برنامه را با زبانی آرام توضیح دهید: «آماده بودن یعنی می‌دانیم چه کنیم.»"
        ] }
    ]
  },
  {
    id: "health-sapling-28", subject: "health", level: "sapling", emoji: "🩹", title: "زخم، سوختگی، نیش",
    steps: [
      /* Close-ups of a forearm, calm and small: a little cut is pressed with a clean cloth, washed under the tap and
         covered with a plaster; a small pink burn is held under cool running water for a long time while the clock's
         hand goes round, and ice, butter and toothpaste are crossed out; a bee flies off and the sting is washed and
         cooled with a cloth; then the girl calls her mother for anything big. Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "کمک‌های اولیه برای زخم‌های کوچک", bg: "#fffaf0",
        parts: {
          panel: { art: "h-panel" }, arm: { art: "h-armclose" },
          cloth: { art: "h-coldcloth", at: [70, 30], s: 1.2, o: 0 }, tap: { art: "h-tap", at: [72, 24], s: 2, o: 0 }, aid: { art: "h-bandaid", at: [70, 26], s: 1.2, o: 0 },
          clock: { art: "h-clock", at: [130, 26], s: 1.3, o: 0 },
          no1: { art: "🧊", at: [36, 84], s: 0.5, o: 0 }, no2: { art: "🧈", at: [62, 84], s: 0.5, o: 0 }, no3: { art: "h-tube", at: [86, 84], s: 0.7, o: 0 },
          x1: { art: "❌", at: [43, 78], s: 0.32, o: 0 }, x2: { art: "❌", at: [69, 78], s: 0.32, o: 0 }, x3: { art: "❌", at: [104, 77], s: 0.32, o: 0 },
          bee: { art: "🐝", at: [92, 50], s: 0.6, o: 0 }, cloth2: { art: "h-coldcloth", at: [90, 30], s: 1, o: 0 },
          room: { art: "h-room", o: 0 }, girl: { art: "h-girl", at: [40, 86], s: 1.4, o: 0 }, mom: { art: "h-mom-home", at: [190, 86], s: 1.15, flip: true },
          talk: { art: "h-talk", at: [47, 50], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "بریدگی کوچک: با یک پارچه تمیز، چند دقیقه رویش را فشار می‌دهیم.", key: 2600, hold: 5000, do: [
            { id: "arm.cut", to: { o: 1 }, at: 300, dur: 400 }, { id: "cloth", to: { o: 1 }, at: 800, dur: 300 }, { id: "cloth", path: "M70 30L70 55", at: 1100, dur: 800 },
            { id: "cloth", to: { sy: 0.85 }, at: 2000, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "بعد زخم را با آب تمیز می‌شوییم.", key: 2400, hold: 4600, do: [
            { id: "cloth", to: { o: 0 }, dur: 400 }, { id: "tap", to: { o: 1 }, at: 300, dur: 400 }, { id: "tap.flow", to: { o: 1 }, at: 900, dur: 300 },
            { emit: "drop", where: [70, 58], spread: [14, 2], rise: 6, n: 16, at: 1000, dur: 3000, life: 600 },
            { id: "tap.flow", to: { o: 0 }, at: 4000, dur: 300 }
          ] },
          { caption: "و رویش چسب زخم می‌زنیم.", key: 2000, hold: 4000, do: [
            { id: "tap", to: { o: 0 }, dur: 400 }, { id: "aid", to: { o: 1 }, at: 300, dur: 300 }, { id: "aid", path: "M70 26L70 58", at: 600, dur: 900 },
            { emit: "spark", where: [70, 58], spread: [18, 8], n: 6, at: 1500, dur: 500, life: 1100 }
          ] },
          { caption: "سوختگی کوچک: مدت زیادی زیر آب خنکِ شیر می‌گیریم. یخ، کره یا خمیردندان نمی‌زنیم.", key: 5200, hold: 7400, do: [
            { id: "aid", to: { o: 0 }, dur: 300 }, { id: "arm.cut", to: { o: 0 }, dur: 300 }, { id: "arm.burn", to: { o: 1 }, at: 300, dur: 400 },
            { id: "tap", to: { x: 52, o: 1 }, at: 700, dur: 400 }, { id: "tap.flow", to: { o: 1 }, at: 1200, dur: 300 },
            { emit: "drop", where: [50, 59], spread: [14, 2], rise: 6, n: 30, at: 1300, dur: 5600, life: 600 },
            { id: "clock", to: { o: 1 }, at: 1200, dur: 300 }, { id: "clock.min", to: { r: 120 }, at: 1400, dur: 5000, ease: "linear" },
            { id: "arm.burn", to: { o: 0.5 }, at: 1400, dur: 5000 },
            { id: "no1", to: { o: 1 }, at: 2600, dur: 300 }, { id: "no2", to: { o: 1 }, at: 2900, dur: 300 }, { id: "no3", to: { o: 1 }, at: 3200, dur: 300 },
            { id: "x1", to: { o: 1 }, at: 3800, dur: 200 }, { id: "x2", to: { o: 1 }, at: 4100, dur: 200 }, { id: "x3", to: { o: 1 }, at: 4400, dur: 200 }
          ] },
          { caption: "نیش زنبور: زنبور رفته است. یک پارچه سرد روی جای نیش می‌گذاریم.", key: 3800, hold: 6000, do: [
            { id: "tap.flow", to: { o: 0 }, dur: 300 }, { id: "tap", to: { o: 0 }, dur: 400 }, { id: "clock", to: { o: 0 }, dur: 400 }, { id: "arm.burn", to: { o: 0 }, dur: 400 },
            { id: "no1", to: { o: 0 }, dur: 400 }, { id: "no2", to: { o: 0 }, dur: 400 }, { id: "no3", to: { o: 0 }, dur: 400 }, { id: "x1", to: { o: 0 }, dur: 400 }, { id: "x2", to: { o: 0 }, dur: 400 }, { id: "x3", to: { o: 0 }, dur: 400 },
            { id: "bee", to: { o: 1 }, at: 400, dur: 200 }, { id: "bee", path: "M92 50Q120 30 150 14", at: 900, dur: 1200 }, { id: "arm.sting", to: { o: 1 }, at: 900, dur: 400 },
            { id: "cloth2", to: { o: 1 }, at: 2800, dur: 300 }, { id: "cloth2", path: "M90 30L90 54", at: 3000, dur: 700 }
          ] },
          { caption: "اگر زخم یا سوختگی بزرگ بود، یا چیزی نگرانمان کرد، فوراً بزرگ‌تر را صدا می‌زنیم.", key: 3600, hold: 6000, do: [
            { id: "panel", to: { o: 0 }, dur: 500 }, { id: "arm", to: { o: 0 }, dur: 500 }, { id: "cloth2", to: { o: 0 }, dur: 500 }, { id: "bee", to: { o: 0 }, dur: 300 },
            { id: "room", to: { o: 1 }, dur: 500 }, { id: "girl", to: { o: 1 }, at: 300, dur: 400 }
          ].concat(B.hpose("girl", "h-girl", "talk", 800, 400), [
            { id: "talk", to: { o: 1 }, at: 1000, dur: 200 }, { id: "talk", to: { s: 1.5 }, at: 1000, dur: 2000, yoyo: true, times: 4 }, { id: "talk", to: { o: 0 }, at: 3000, dur: 200 },
            { id: "mom", walk: [86, 86], at: 1200, dur: 2200 }
          ]) }
        ] },
      { type: "order", prompt: "بریدگی کوچک: به ترتیب بچین", numbered: true,
        items: [{ pic: "🧻", label: "فشار با پارچه تمیز" }, { pic: "💧", label: "شستن با آب تمیز" }, { pic: "🩹", label: "چسب زخم" }] },
      { type: "choose", prompt: "دستت به قوری داغ خورد و کمی سوخت. چه کار می‌کنی؟", say: "دستت به قوری داغ خورد و کمی سوخت. چه کار می‌کنی؟", stack: true,
        options: ["🚰 مدت زیادی زیر آب خنک شیر می‌گیرم و به بزرگ‌تر می‌گویم", "🧊 یخ رویش می‌گذارم", "🧈 کره یا خمیردندان می‌زنم"], answer: "🚰 مدت زیادی زیر آب خنک شیر می‌گیرم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "زنبور دوستت را نیش زد و حالا صورتش ورم کرده و سخت نفس می‌کشد. چه کار می‌کنی؟", say: "زنبور دوستت را نیش زد و حالا صورتش ورم کرده و سخت نفس می‌کشد. چه کار می‌کنی؟", stack: true,
        options: ["📣 فوراً بزرگ‌تر را صدا می‌زنم تا به ۱۱۵ زنگ بزند", "🧻 فقط یک پارچه سرد رویش می‌گذارم", "⏳ صبر می‌کنم خودش خوب شود"], answer: "📣 فوراً بزرگ‌تر را صدا می‌زنم تا به ۱۱۵ زنگ بزند" },
      { type: "choose", prompt: "کدام را خودمان با کمک‌های اولیه درست می‌کنیم؟", say: "کدام را خودمان با کمک‌های اولیه درست می‌کنیم؟", stack: true,
        options: ["🩹 یک خراش یا بریدگی کوچک", "🩸 زخم بزرگی که خونش بند نمی‌آید", "🔥 سوختگی بزرگ"], answer: "🩹 یک خراش یا بریدگی کوچک" },
      { type: "forparents",
        tips: [
          "یک جعبه کمک‌های اولیه در خانه و ماشین داشته باشید و جایش را به کودک نشان دهید: گاز استریل، چسب زخم، باند، دستکش، قیچی، محلول شست‌وشو، و شماره‌های اضطراری.",
          "بریدگی: چند دقیقه با پارچه یا گاز تمیز فشار دهید، بعد با آب تمیز بشویید و بپوشانید. اگر خون بند نیامد، زخم عمیق یا بزرگ بود، یا چیزی در آن مانده بود، به پزشک یا ۱۱۵ مراجعه کنید.",
          "سوختگی: حدود ۲۰ دقیقه زیر آب خنک (نه یخ) بگیرید، انگشتر و دستبند را درآورید و با پوشش تمیز و نچسب بپوشانید. یخ، کره، خمیردندان، روغن یا تخم‌مرغ نزنید. سوختگی بزرگ، روی صورت، دست، پا یا ناحیه تناسلی، یا تاول بزرگ: پزشک یا ۱۱۵.",
          "نیش زنبور: اگر نیش مانده، با لبه یک کارت کنارش بزنید (فشار ندهید)، بشویید و سرد کنید. ورم صورت یا لب، سختی نفس یا حال بد: فوراً ۱۱۵.",
          "خون دماغ و ضربه به سر در درس «زخم کوچک، خون دماغ» (جوانه) آمده است. در هر شکی، با پزشک یا ۱۱۵ مشورت کنید."
        ] }
    ]
  },
  {
    id: "health-sapling-29", subject: "health", level: "sapling", emoji: "🧰", title: "بازی کمک‌های اولیه",
    steps: [
      // The game lesson of the first-aid unit: put the steps in order, and match each trouble with its number and its
      // first aid. Every picture is said aloud when tapped.
      { type: "order", prompt: "بریدگی کوچک: کارها را به ترتیب بچین", numbered: true,
        items: [{ pic: "🧻", label: "فشار با پارچه تمیز" }, { pic: "💧", label: "شستن با آب تمیز" }, { pic: "🩹", label: "چسب زخم" }] },
      { type: "order", prompt: "سوختگی کوچک: کارها را به ترتیب بچین", numbered: true,
        items: [{ pic: "🗣️", label: "به بزرگ‌تر می‌گویم" }, { pic: "🚰", label: "مدت زیادی زیر آب خنک" }, { pic: "🩹", label: "پوشاندن با پارچه تمیز" }] },
      { type: "order", prompt: "زنگ به اورژانس: به ترتیب بچین", numbered: true,
        items: [{ pic: "📞", label: "شماره ۱۱۵ را می‌گیرم" }, { pic: "👧", label: "می‌گویم کی هستم" }, { pic: "❗", label: "می‌گویم چه شده" }, { pic: "🏠", label: "می‌گویم کجا هستیم" }, { pic: "👂", label: "گوش می‌دهم و قطع نمی‌کنم" }] },
      { type: "pairs", prompt: "هر گرفتاری را با شماره‌اش جفت کن",
        pairs: [[{ pic: "🤒", say: "کسی سخت بیمار شده" }, { label: "۱۱۵", say: "صد و پانزده" }], [{ pic: "🔥", say: "آتش" }, { label: "۱۲۵", say: "صد و بیست و پنج" }],
          [{ pic: "🚨", say: "دزد" }, { label: "۱۱۰", say: "صد و ده" }], [{ pic: "💨", say: "بوی گاز" }, { label: "۱۹۴", say: "صد و نود و چهار" }]] },
      { type: "pairs", prompt: "هر گرفتاری را با کمک اولیه‌اش جفت کن",
        pairs: [[{ pic: "🔥", say: "سوختگی کوچک" }, { label: "آب خنک", say: "آب خنک" }], [{ pic: "🩸", say: "بریدگی کوچک" }, { label: "فشار با پارچه تمیز", say: "فشار با پارچه تمیز" }],
          [{ pic: "🐝", say: "نیش زنبور" }, { label: "پارچه سرد", say: "پارچه سرد" }], [{ pic: "👃", say: "خون دماغ" }, { label: "فشار نرمی بینی", say: "فشار نرمی بینی" }]] },
      { type: "forparents",
        tips: [
          "بعد از بازی، جعبه کمک‌های اولیه خانه را با کودک باز کنید و هر چیز را نام ببرید. بگذارید یک چسب زخم را خودش روی عروسکش بزند.",
          "شماره‌های اضطراری (۱۱۵، ۱۲۵، ۱۱۰، ۱۹۴) را کنار تلفن بچسبانید و هر چند وقت یک بار با هم مرور کنید.",
          "کودکان این سن کمک‌های اولیه ساده را می‌توانند، ولی همیشه اول بزرگ‌تر را خبر کنند. به آن‌ها بگویید آرام ماندن و خبر کردن، خودش بزرگ‌ترین کمک است.",
          "اگر می‌توانید، خودتان در یک دوره کمک‌های اولیه (مثلاً هلال احمر) شرکت کنید."
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
  },
  {
    id: "health-all-4", subject: "health", level: null, emoji: "✋", title: "دست نزن، خبر بده",
    steps: [
      /* Calm and everyday, with no war context (UNICEF and IMAS 12.10 risk education: don't touch, step back, tell a
         grown-up), for every strange thing. A card shows a used syringe, a battery, a firework that did not go off, a
         rusty piece of metal and a bag left on the ground. In the park, a boy sees a syringe on the grass: he does not
         touch it, steps back, and goes back to tell his father, who phones for help while the boy stays away. In an
         alley a girl sees a bag left by a wall, steps back and calls her mother. Drawings: js/art/rig-health.js and
         the alley from js/art/rig-world.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#cfe9f7",
        parts: {
          park: { art: "h-park" }, bench: { art: "h-bench", at: [30, 88], s: 1.3 },
          dad: { art: "h-dad", at: [30, 101.8], s: 1.15 }, thing: { art: "h-syringe", at: [100, 84], s: 1.5 },
          keep: { art: "h-keepout", at: [100, 85], s: 1.3, o: 0 },
          boy: { art: "h-boy", at: [44, 88], s: 1.4 },
          alley: { art: "w-alley", at: [160, 0] }, bag: { art: "h-bag", at: [276, 86], s: 1.3 }, keep2: { art: "h-keepout", at: [276, 86], s: 1.4, o: 0 },
          mom: { art: "h-mom-home", at: [206, 88], s: 1.15 }, girl: { art: "h-girl", at: [226, 86], s: 1.4 },
          talk: { art: "h-talk", at: [219, 51], s: 1.2, flip: true, o: 0 },
          panel: { art: "h-panel" },
          i1: { art: "h-syringe", at: [136, 46], s: 1.8, o: 0 }, i2: { art: "h-battery", at: [108, 46], s: 1.8, o: 0 }, i3: { art: "h-cracker", at: [81, 46], s: 1.8, o: 0 },
          i4: { art: "h-metal", at: [54, 46], s: 1.8, o: 0 }, i5: { art: "h-bag", at: [26, 56], s: 1.8, o: 0 }
        },
        scenes: [
          { caption: "گاهی روی زمین چیز عجیبی می‌بینیم: یک سرنگ، یک باتری، یک ترقه که نترکیده، یک تکه فلز یا یک کیسه.", key: 6400, hold: 8400, do: [
            { id: "i1", to: { o: 1 }, at: 400, dur: 500 }, { id: "i2", to: { o: 1 }, at: 1700, dur: 500 }, { id: "i3", to: { o: 1 }, at: 3000, dur: 500 },
            { id: "i4", to: { o: 1 }, at: 4300, dur: 500 }, { id: "i5", to: { o: 1 }, at: 5600, dur: 500 }
          ] },
          { caption: "اگر چیزی دیدیم که نمی‌شناسیم، به آن دست نمی‌زنیم.", key: 4400, hold: 6600, do: [
            { id: "panel", to: { o: 0 }, dur: 600 }, { id: "i1", to: { o: 0 }, dur: 500 }, { id: "i2", to: { o: 0 }, dur: 500 }, { id: "i3", to: { o: 0 }, dur: 500 },
            { id: "i4", to: { o: 0 }, dur: 500 }, { id: "i5", to: { o: 0 }, dur: 500 },
            { id: "boy", walk: [84, 88], at: 700, dur: 2400 }
          ].concat(B.hpose("dad", "h-dad", { legF: -88, shinF: 88, legB: -88, shinB: 88 }, 0, 1), B.hpose("boy", "h-boy", { head: 22, armF: [-4, -14], armB: [-4, -14] }, 3200, 600)) },
          { caption: "چند قدم عقب می‌رویم.", key: 3000, hold: 4600, do: [
            { id: "boy", to: { x: 66 }, at: 300, dur: 2400, ease: "linear" },
            { id: "boy.legF", to: { r: 16 }, at: 300, dur: 2400, yoyo: true, times: 6 }, { id: "boy.legB", to: { r: -16 }, at: 300, dur: 2400, yoyo: true, times: 6 },
            { id: "keep", to: { o: 1 }, at: 1800, dur: 500 }, { id: "keep", to: { s: 1.5 }, at: 2300, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "و به یک بزرگ‌تر خبر می‌دهیم.", key: 4200, hold: 6400, do: B.hpose("boy", "h-boy", { head: 0, armF: [0.2, -12], armB: [0.2, -12] }, 0, 500).concat([
            { id: "boy", to: { flip: -1 }, at: 500, dur: 1 }, { id: "boy", walk: [54, 88], at: 600, dur: 1600 }
          ], B.hpose("boy", "h-boy", "talk", 2300, 400), [
            { id: "boy.mouth", to: { o: 0 }, at: 2600, dur: 100 }, { id: "boy.open", to: { o: 1 }, at: 2600, dur: 100 },
            { id: "boy.open", to: { sy: 0.4 }, at: 2700, dur: 2400, yoyo: true, times: 8 },
            { id: "boy.open", to: { o: 0 }, at: 5100, dur: 100 }, { id: "boy.mouth", to: { o: 1 }, at: 5100, dur: 100 },
            { id: "dad.head", to: { r: 10 }, at: 3200, dur: 1200, yoyo: true, times: 2 }
          ]) },
          { caption: "بزرگ‌تر می‌داند چه کار کند. ما از آن دور می‌مانیم.", key: 4400, hold: 6400, do: B.hpose("boy", "h-boy", { armF: [0.2, -12] }, 0, 400).concat([
            { id: "dad", to: { y: 88 }, at: 300, dur: 600 }
          ], B.hunpose("dad", "h-dad", 300, 600), B.hpose("dad", "h-dad", "ear", 1200, 600), [
            { id: "dad.phone", to: { o: 1 }, at: 1600, dur: 200 },
            { id: "dad.head", to: { r: 6 }, at: 2200, dur: 2800, yoyo: true, times: 4 }
          ]) },
          { caption: "در کوچه هم همین‌طور: دست نمی‌زنیم، عقب می‌رویم و خبر می‌دهیم.", key: 6600, hold: 8800, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "girl", walk: [256, 86], at: 1800, dur: 1800 }
          ].concat(B.hpose("girl", "h-girl", { head: 18, armF: [-4, -14], armB: [-4, -14] }, 3600, 500), [
            { id: "girl", to: { x: 240 }, at: 4300, dur: 1400, ease: "linear" },
            { id: "girl.legF", to: { r: 16 }, at: 4300, dur: 1400, yoyo: true, times: 4 }, { id: "girl.legB", to: { r: -16 }, at: 4300, dur: 1400, yoyo: true, times: 4 },
            { id: "keep2", to: { o: 1 }, at: 4600, dur: 500 },
            { id: "girl", to: { flip: -1 }, at: 5800, dur: 1 }, { id: "girl.head", to: { r: 0 }, at: 5800, dur: 300 },
            { id: "talk", to: { o: 1 }, at: 6100, dur: 200 }, { id: "talk", to: { x: 233 }, at: 6100, dur: 1 }, { id: "talk", to: { s: 1.5 }, at: 6100, dur: 2000, yoyo: true, times: 6 },
            { id: "girl.mouth", to: { o: 0 }, at: 6100, dur: 100 }, { id: "girl.open", to: { o: 1 }, at: 6100, dur: 100 },
            { id: "girl.open", to: { sy: 0.4 }, at: 6200, dur: 2000, yoyo: true, times: 6 },
            { id: "mom.head", to: { r: 10 }, at: 6800, dur: 1200, yoyo: true, times: 2 }
          ], B.hpose("girl", "h-girl", { armF: [0.2, -12], armB: [0.2, -12] }, 5800, 400)) }
        ] },
      { type: "choose", prompt: "در پارک، کنار نیمکت یک سرنگ افتاده. چه کار می‌کنی؟", say: "در پارک، کنار نیمکت یک سرنگ افتاده. چه کار می‌کنی؟", stack: true,
        options: ["✋ دست نمی‌زنم، عقب می‌روم و به بزرگ‌تر می‌گویم", "🖐️ برش می‌دارم و در سطل می‌اندازم", "🦶 با پا هلش می‌دهم"], answer: "✋ دست نمی‌زنم، عقب می‌روم و به بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "در کوچه یک چیز فلزی ناآشنا دیدی. چه کار می‌کنی؟", say: "در کوچه یک چیز فلزی ناآشنا دیدی. چه کار می‌کنی؟", stack: true,
        options: ["🚶 عقب می‌روم و به بزرگ‌تر خبر می‌دهم", "🪨 با سنگ به آن می‌زنم", "🎒 برش می‌دارم و به خانه می‌برم"], answer: "🚶 عقب می‌روم و به بزرگ‌تر خبر می‌دهم" },
      { type: "sort", prompt: "به کدام دست نمی‌زنیم و به بزرگ‌تر می‌گوییم؟",
        baskets: [{ label: "دست نمی‌زنم، خبر می‌دهم", pic: "✋", value: "tell" }, { label: "مال خودم است، بازی می‌کنم", pic: "🧸", value: "mine" }],
        items: [
          { pic: "💉", say: "سرنگ روی زمین", basket: "tell" }, { pic: "🔋", say: "باتری روی زمین", basket: "tell" }, { pic: "🧨", say: "ترقه‌ای که نترکیده", basket: "tell" },
          { pic: "🔩", say: "یک تکه فلز ناآشنا", basket: "tell" }, { pic: "👜", say: "کیسه‌ای که کسی جا گذاشته", basket: "tell" },
          { pic: "⚽", say: "توپ خودم", basket: "mine" }, { pic: "🧸", say: "عروسک خودم", basket: "mine" }
        ] },
      { type: "forparents",
        tips: [
          "قانون این درس برای هر چیز ناآشنا یکی است: «دست نزن، عقب برو، به بزرگ‌تر خبر بده.» این را آرام و مثل یک قانون معمولی، مثل شستن دست، تکرار کنید.",
          "سرنگ و سوزن: خودتان هم با دست برندارید. کودک را دور کنید و به شهرداری یا مرکز بهداشت محل خبر بدهید. اگر کودک با سوزن تماس پیدا کرد، محل را با آب و صابون بشویید و همان روز به پزشک بروید.",
          "ترقه و مواد آتش‌بازی که نترکیده، به‌خصوص بعد از چهارشنبه‌سوری، خطرناک‌اند. کودک به آن‌ها دست نزند و کسی دوباره روشنشان نکند. باتری و آهن‌ربای کوچک را هم کودک خردسال نباید بردارد.",
          "اگر چیز فلزی ناشناخته یا کیسه یا بسته مشکوکی دیدید، به آن دست نزنید، دیگران را دور کنید و به پلیس ۱۱۰ خبر بدهید.",
          "این درس را بدون حرف زدن از جنگ و بدون مثال ترسناک کار کنید. اگر کودک سؤالی پرسید یا نگران شد، کوتاه و آرام جواب بدهید و بگویید بزرگ‌ترها مراقب‌اند."
        ] }
    ]
  },
  {
    id: "health-all-5", subject: "health", level: null, emoji: "🗺️", title: "نقشه خانواده ما",
    steps: [
      /* Calm and practical, nothing happening: the family talks about its plan; the ready bag by the door (water, a
         torch, a first-aid box go into it); the numbers to call on the fridge; when Dad says «حالا!» everyone walks out
         calmly together, Dad carrying the bag; outside they all meet at their meeting place, the tree near the house.
         Drawings: js/art/rig-health.js. */
      { type: "scene", prompt: "به قصه نگاه کن", bg: "#f6e3c6",
        parts: {
          room: { art: "h-room" }, door: { art: "h-door", at: [134, 62] }, fridge: { art: "h-fridge", at: [18, 72], s: 1.1 },
          bag: { art: "🎒", at: [124, 74], s: 0.75 }, ring: { art: "h-oval", at: [124, 66], s: 1.2, o: 0 },
          water: { art: "💧", at: [112, 40], s: 0.45, o: 0 }, torch: { art: "🔦", at: [124, 38], s: 0.45, o: 0 }, kit: { art: "🧰", at: [136, 40], s: 0.45, o: 0 },
          dad: { art: "h-dad", at: [56, 88], s: 1.15 }, mom: { art: "h-mom-home", at: [86, 88], s: 1.15, flip: true }, girl: { art: "h-girl", at: [104, 86], s: 1.4, flip: true },
          talk: { art: "h-talk", at: [64, 41], s: 1.3, o: 0 },
          outside: { art: "h-outside", at: [160, 0] }, tree: { art: "h-tree", at: [282, 74], s: 1.4 },
          dad2: { art: "h-dad", at: [186, 88], s: 1.15, o: 0 }, bag2: { art: "🎒", at: [181, 54], s: 0.5, o: 0 },
          mom2: { art: "h-mom-home", at: [186, 88], s: 1.15, o: 0 }, girl2: { art: "h-girl", at: [186, 86], s: 1.4, o: 0 },
          star: { art: "h-star", at: [282, 22], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "خانواده ما یک نقشه دارد. با هم درباره‌اش حرف می‌زنیم.", key: 3000, hold: 6000, do: [
            { id: "talk", to: { o: 1 }, at: 400, dur: 200 }, { id: "talk", to: { s: 1.6 }, at: 400, dur: 3600, yoyo: true, times: 8 },
            { id: "dad.mouth", to: { o: 0 }, at: 400, dur: 100 }, { id: "dad.open", to: { o: 1 }, at: 400, dur: 100 },
            { id: "dad.open", to: { sy: 0.4 }, at: 500, dur: 3600, yoyo: true, times: 10 },
            { id: "talk", to: { o: 0 }, at: 4200, dur: 300 }, { id: "dad.open", to: { o: 0 }, at: 4200, dur: 100 }, { id: "dad.mouth", to: { o: 1 }, at: 4200, dur: 100 },
            { id: "mom.head", to: { r: 8 }, at: 2000, dur: 1400, yoyo: true, times: 2 }, { id: "girl.head", to: { r: 10 }, at: 3000, dur: 1400, yoyo: true, times: 2 }
          ].concat(B.hpose("dad", "h-dad", { armF: [8, -30] }, 400, 500), B.hpose("dad", "h-dad", { armF: [0.2, -21] }, 4300, 500)) },
          { caption: "کیف آماده ما کنار در است: آب، چراغ‌قوه و جعبه کمک‌های اولیه در آن است.", key: 4000, hold: 6600, do: [
            { id: "ring", to: { o: 1 }, dur: 400 }, { id: "ring", to: { s: 1.4 }, at: 400, dur: 1200, yoyo: true, times: 2 },
            { id: "water", to: { o: 1 }, at: 1600, dur: 300 }, { id: "water", path: "M112 40Q118 50 122 66", at: 2600, dur: 700 }, { id: "water", to: { o: 0 }, at: 3200, dur: 200 },
            { id: "torch", to: { o: 1 }, at: 1600, dur: 300 }, { id: "torch", path: "M124 38L124 66", at: 3600, dur: 700 }, { id: "torch", to: { o: 0 }, at: 4200, dur: 200 },
            { id: "kit", to: { o: 1 }, at: 1600, dur: 300 }, { id: "kit", path: "M136 40Q130 50 126 66", at: 4600, dur: 700 }, { id: "kit", to: { o: 0 }, at: 5200, dur: 200 },
            { id: "bag", to: { s: 0.85 }, at: 5300, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "شماره‌هایی که باید زنگ بزنیم، روی یخچال نوشته شده است.", key: 4200, hold: 6000, do: [
            { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "girl", walk: [42, 86], at: 300, dur: 3000 },
            { id: "fridge.note", to: { s: 1.25 }, at: 3400, dur: 1200, yoyo: true, times: 4 }
          ].concat(B.hpose("girl", "h-girl", { armF: [9, -24] }, 3400, 500)) },
          { caption: "بزرگ‌تر می‌گوید «حالا!». آرام و با هم بیرون می‌رویم. نمی‌دویم و دنبال وسیله نمی‌گردیم.", key: 4400, hold: 8000, do: B.hpose("girl", "h-girl", { armF: [0.2, -12] }, 0, 400).concat([
            { id: "talk", to: { o: 1, x: 70 }, at: 300, dur: 200 }, { id: "talk", to: { s: 1.8 }, at: 300, dur: 1200, yoyo: true, times: 2 }, { id: "talk", to: { o: 0 }, at: 1600, dur: 300 },
            { id: "girl", to: { flip: 1 }, at: 1200, dur: 1 },
            { id: "dad", walk: [122, 88], at: 1400, dur: 2400 }, { id: "bag", path: "M124 74Q124 60 117 54", at: 3800, dur: 600 },
            { id: "door.leaf", to: { sx: 0.15 }, at: 3800, dur: 600 },
            { id: "mom", to: { flip: 1 }, at: 1600, dur: 1 }, { id: "mom", walk: [110, 88], at: 1800, dur: 2600 },
            { id: "girl", walk: [96, 86], at: 1800, dur: 3000 },
            { id: "dad", walk: [150, 88], at: 4500, dur: 1600 }, { id: "bag", to: { x: 145 }, at: 4500, dur: 1600, ease: "linear" },
            { id: "dad", to: { o: 0 }, at: 5800, dur: 400 }, { id: "bag", to: { o: 0 }, at: 5800, dur: 400 },
            { id: "mom", walk: [146, 88], at: 4700, dur: 2000 }, { id: "mom", to: { o: 0 }, at: 6400, dur: 400 },
            { id: "girl", walk: [144, 86], at: 4900, dur: 2400 }, { id: "girl", to: { o: 0 }, at: 7000, dur: 400 }
          ]) },
          { caption: "جای قرارمان نزدیک خانه است: زیر همین درخت. همه این‌جا جمع می‌شویم.", key: 6200, hold: 7400, do: [
            { cam: { x: 240 }, dur: 1600 },
            { id: "dad2", to: { o: 1 }, at: 1400, dur: 300 }, { id: "bag2", to: { o: 1 }, at: 1400, dur: 300 },
            { id: "dad2", walk: [262, 88], at: 1500, dur: 3000 }, { id: "bag2", to: { x: 257 }, at: 1500, dur: 3000, ease: "linear" },
            { id: "mom2", to: { o: 1 }, at: 1900, dur: 300 }, { id: "mom2", walk: [300, 88], at: 2000, dur: 3400 },
            { id: "girl2", to: { o: 1 }, at: 2300, dur: 300 }, { id: "girl2", walk: [282, 86], at: 2400, dur: 2800 },
            { id: "star", to: { o: 1 }, at: 5300, dur: 400 }, { id: "star", to: { s: 1.8, r: 20 }, at: 5700, dur: 1200, yoyo: true, times: 2 },
            { id: "mom2", to: { flip: -1 }, at: 5500, dur: 1 },
            { emit: "spark", where: [282, 40], spread: [40, 14], n: 8, at: 5600, dur: 900, life: 1300 }
          ] }
        ] },
      { type: "choose", prompt: "بزرگ‌ترت می‌گوید: «حالا باید بیرون برویم!» چه کار می‌کنی؟", say: "بزرگ‌ترت می‌گوید: حالا باید بیرون برویم! چه کار می‌کنی؟", stack: true,
        options: ["🚶 آرام و با او می‌روم", "🧸 اول می‌روم اسباب‌بازی‌ام را بیاورم", "🙈 زیر تخت قایم می‌شوم"], answer: "🚶 آرام و با او می‌روم" },
      { type: "choose", prompt: "بیرون از خانه، کجا همدیگر را پیدا می‌کنیم؟", say: "بیرون از خانه، کجا همدیگر را پیدا می‌کنیم؟", stack: true,
        options: ["🌳 در جای قرارمان", "🏪 هر جا که دلم خواست"], answer: "🌳 در جای قرارمان" },
      { type: "doit", pic: "🗺️", text: "با خانواده‌ات نقشه را تمرین کنید:",
        list: ["جای قرارتان نزدیک خانه کجاست؟ با هم بروید و ببینید.", "کیف آماده کجاست؟ به آن دست بزن.", "شماره‌ها کجا نوشته شده؟ نشانش بده.", "یک نفر می‌گوید «حالا!» و همه آرام و با هم تا جای قرار می‌روید."] },
      { type: "forparents",
        tips: [
          "یک «نقشه خانواده» داشته باشید: جای قرار نزدیک خانه (درخت، در مدرسه یا خانه همسایه) و یک جای قرار دورتر، شماره‌های لازم (والدین، یک خویشاوند در شهر دیگر، ۱۱۵، ۱۲۵، ۱۱۰) و کسی که کودک را از مدرسه برمی‌دارد.",
          "کیف آماده: آب، خوراکی خشک، چراغ‌قوه و باتری، جعبه کمک‌های اولیه، داروهای لازم خانواده، سوت، لباس گرم، کپی مدارک و کمی پول. آن را کنار در بگذارید و هر چند ماه یک بار نگاهش کنید.",
          "سالی دو بار، در یک روز آرام، نقشه را مثل بازی تمرین کنید. اهمیت تمرین در «آرام و با هم رفتن» است، نه در سرعت.",
          "با کودک آرام و ساده حرف بزنید و تصویر ترسناک یا خبر به او نشان ندهید. اگر کودک نگران شد، به او بگویید نقشه داشتن یعنی همه می‌دانیم چه کنیم."
        ] }
    ]
  }
);
