/* باغچه — علوم (science and nature) lessons, leveled. Built on inquiry: look, guess, try, explain.
   Every lesson ends with a safe experiment to do at home (step type "home"), with everyday things only:
   no fire, sharp tools, electricity or chemicals.
   Lessons are plain data; step types are listed in README.md. Science-only steps (test, shadow, home) are in
   js/steps/science.js. Seed and Sprout children may not read yet: on-screen text is short, and pictures,
   narration and the parent's questions carry the lesson. Tree and Forest lessons come after teacher review. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "science", name: "علوم", emoji: "🔬", leveled: true });

B.LESSONS.push(
  // ---------------- Science: Seed (looking closely at the world around us) ----------------
  {
    id: "science-seed-1", subject: "science", level: "seed", emoji: "🐞", title: "زنده یا غیرزنده؟",
    steps: [
      { type: "scene", prompt: "ببین چه می‌شود", bg: "#cdeaf7",
        /* What is alive eats and grows: the kitten drinks and grows, the plant drinks and grows and flowers, the
           ball gets the same milk and the same days and stays as it is. Days pass as the sun going round and the
           sky going dark. Drawings: js/art/rig-science.js, cat-side from js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [22, 16] }, night: { art: "sci-night", o: 0 },
          ball: { art: "sci-ball", at: [-10, 75.2], s: 2.2 }, bowl: { art: "sci-bowl", at: [81, 84], s: 1.8 },
          cat: { art: "cat-side", at: [62, 84], s: 1.5 },
          pot: { art: "sci-pot", at: [128, 86], s: 1.6, o: 0 }, sprout: { art: "sci-sprout", at: [128, 67], s: 1.1, o: 0 },
          plant: { art: "sci-plant", at: [128, 67], s: 0.8, o: 0 }, bloom: { art: "sci-bloom", at: [128, 26.6], s: 0 },
          can: { art: "sci-can", at: [150, 40], s: 1.5, o: 0 }
        },
        scenes: [
          { caption: "این بچه‌گربه است.", do: [
            { id: "cat", path: "M40 84L62 84", dur: 1400, ease: "out" },
            { id: "cat", to: { r: 4 }, dur: 1400, yoyo: true, times: 6 },
            { id: "cat.head", to: { r: -12 }, at: 1600, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "بچه‌گربه شیر می‌خورد.", key: 1800, do: [
            { id: "cat", to: { x: 65 }, dur: 500 },
            { id: "cat.head", to: { r: 34 }, at: 500, dur: 400 },
            { id: "cat.head", to: { r: 24 }, at: 900, dur: 2400, yoyo: true, times: 8 },
            { id: "bowl.milk", to: { s: 0.25 }, at: 900, dur: 2600 },
            { id: "cat.head", to: { r: 0 }, at: 3400, dur: 400 }
          ] },
          { caption: "روزها گذشت و بچه‌گربه بزرگ شد.", do: [
            { id: "bowl", to: { o: 0 }, dur: 400 },
            { id: "sun", path: "M22 16Q90 -10 170 56", at: 200, dur: 1000, ease: "in" },
            { id: "night", to: { o: 0.75 }, at: 1000, dur: 300 }, { id: "night", to: { o: 0 }, at: 1600, dur: 300 },
            { id: "sun", path: "M-10 56Q90 -10 170 56", at: 1500, dur: 1600, ease: "linear" },
            { id: "night", to: { o: 0.75 }, at: 2900, dur: 300 }, { id: "night", to: { o: 0 }, at: 3500, dur: 300 },
            { id: "sun", path: "M-10 56Q4 22 22 16", at: 3400, dur: 700, ease: "out" },
            { id: "cat", to: { s: 2.6, x: 78 }, at: 300, dur: 3800 }
          ] },
          { caption: "این توپ است. توپ غذا نمی‌خورد و بزرگ نمی‌شود.", hold: 6000, do: [
            { id: "ball", path: "M-10 75.2L20 75.2", dur: 1200, ease: "out" }, { id: "ball", to: { r: 520 }, dur: 1200, ease: "out" },
            { id: "bowl.milk", to: { s: 1 }, dur: 1 },
            { id: "bowl", path: "M81 84Q62 60 42 84", at: 1300, dur: 900 }, { id: "bowl", to: { o: 1 }, at: 1300, dur: 300 },
            { id: "sun", path: "M22 16Q90 -10 170 56", at: 2600, dur: 1000, ease: "in" },
            { id: "night", to: { o: 0.75 }, at: 3400, dur: 300 }, { id: "night", to: { o: 0 }, at: 4000, dur: 300 },
            { id: "sun", path: "M-10 56Q4 22 22 16", at: 3900, dur: 800, ease: "out" }
          ] },
          { caption: "این گیاه آب می‌خورد و بزرگ می‌شود.", key: 3000, hold: 6400, do: [
            { id: "pot", to: { o: 1 }, dur: 400 }, { id: "sprout", to: { o: 1 }, dur: 400 },
            { id: "can", to: { o: 1 }, at: 500, dur: 300 }, { id: "can", to: { r: -35 }, at: 800, dur: 500 },
            { emit: "drop", where: [127, 46], spread: [3, 2], rise: 18, n: 14, at: 1300, dur: 2000, life: 800 },
            { id: "can", to: { r: 0, o: 0 }, at: 3400, dur: 500 },
            { id: "sprout", to: { s: 1.8 }, at: 2200, dur: 1400 },
            { id: "plant", to: { o: 1, s: 1.85 }, at: 3600, dur: 2400 }, { id: "sprout", to: { o: 0 }, at: 3600, dur: 600 }
          ] },
          { caption: "گیاه گل داد!", do: [
            { id: "bloom", to: { s: 2.2, r: 180 }, dur: 1400, ease: "back" }
          ] },
          { caption: "گربه و گل زنده‌اند. توپ زنده نیست.", key: 1800, hold: 5600, do: [
            { id: "cat.head", to: { r: -14 }, dur: 900, yoyo: true, times: 2 },
            { id: "cat", to: { y: "-3" }, at: 200, dur: 1200, yoyo: true, times: 4 },
            { emit: "spark", where: [76, 40], spread: [34, 10], n: 6, at: 300, dur: 1200 },
                        { id: "bloom", to: { r: 220, s: 2.5 }, at: 1600, dur: 1000, yoyo: true, times: 2 },
            { emit: "spark", where: [128, 28], spread: [20, 10], n: 6, at: 1700, dur: 1200 }
          ],
            wait: { tap: ["cat", "bloom"], hint: "تو هم پیدا کن: روی چیزهای زنده بزن!",
              each: [{ id: "$", to: { s: "+0.25" }, dur: 500, yoyo: true, times: 2 }] } }
        ],
        question: "کدام زنده است؟", pic: true,
        options: [{ label: "🧸", value: "عروسک" }, { label: "🐟", value: "ماهی" }, { label: "👟", value: "کفش" }], answer: "ماهی" },
      { type: "sort", prompt: "زنده‌ها یک طرف، غیرزنده‌ها یک طرف",
        say: "چیزهای زنده را در یک سبد بگذار و چیزهای غیرزنده را در سبد دیگر.",
        baskets: [{ label: "زنده", pic: "🌱", value: "live" }, { label: "غیرزنده", pic: "🧱", value: "not" }],
        items: [
          { pic: "🌳", say: "درخت", basket: "live" },
          { pic: "🐞", say: "کفشدوزک", basket: "live" },
          { pic: "🐦", say: "گنجشک", basket: "live" },
          { pic: "🥄", say: "قاشق", basket: "not" },
          { pic: "🚗", say: "ماشین", basket: "not" },
          { pic: "✏️", say: "مداد", basket: "not" }
        ] },
      { type: "choose", prompt: "ماشین حرکت می‌کند. آیا زنده است؟", say: "ماشین حرکت می‌کند. آیا ماشین زنده است؟",
        options: ["زنده است", "زنده نیست"], answer: "زنده نیست" },
      { type: "home", pic: "🏡 🔍", text: "در حیاط یا کوچه دنبال چیزهای زنده بگرد.",
        need: ["یک سبد یا کیسه کوچک", "کاغذ و مداد رنگی"],
        steps: [
          "با کودک در حیاط، پارک یا کوچه قدم بزنید.",
          "هر چیزی را که می‌بینید نام ببرید و بپرسید: «این زنده است یا نه؟ از کجا فهمیدی؟»",
          "چند چیز غیرزنده، مثل سنگ و دکمه، را در سبد جمع کنید. به حیوان‌ها و گیاه‌های ناآشنا دست نزنید.",
          "در خانه، کودک یک چیز زنده و یک چیز غیرزنده را نقاشی کند."
        ],
        ask: "ابر حرکت می‌کند. آیا زنده است؟ چرا؟" }
    ]
  },
  {
    id: "science-seed-2", subject: "science", level: "seed", emoji: "👀", title: "پنج حس",
    steps: [
      { type: "scene", prompt: "حس‌های ما", bg: "#cdeaf7",
        /* One child's face, and each sense in turn reaching it: the eyes turn to the rainbow as it is painted, the
           sparrow's notes fly to the ear, the rose's smell drifts to the nose, a bite of watermelon, and the child
           strokes the sheep (wait: rub). At the end a ring goes round each sense. Drawings: js/art/rig-science.js. */
        parts: {
          rainbow: { art: "sci-rainbow", at: [44, 64], s: 1.2 },
          branch: { art: "sci-branch", at: [40, 56], s: 1.2, o: 0 }, bird: { art: "sci-sparrow", at: [40, 56], s: 1.8, o: 0 },
          n1: { art: "sci-note", at: [54, 34], s: 1.4, o: 0 }, n2: { art: "sci-note", at: [54, 34], s: 1.4, o: 0 }, n3: { art: "sci-note", at: [54, 34], s: 1.4, o: 0 },
          rose: { art: "sci-rose", at: [42, 76], s: 1.9, o: 0 }, scent: { art: "sci-scent", at: [52, 36], sx: 1.45, o: 0 },
          sheep: { art: "sci-sheep", at: [46, 82], s: 1.6, o: 0 },
          face: { art: "sci-face", at: [118, 40] },
          melon: { art: "sci-melon", at: [40, 84], s: 1.3, o: 0 },
          hand: { art: "hand", at: [150, 110], r: -80, s: 1.2 },
          ring: { art: "sci-ring", at: [118, 40], sx: 2.8, o: 0 }
        },
        scenes: [
          { caption: "با چشم می‌بینیم: رنگین‌کمان!", do: [
            { id: "rainbow", draw: true, at: 300, dur: 2200 },
            { id: "face.pupils", to: { x: -1.4 }, at: 200, dur: 500 },
            { id: "face.eyes", to: { sy: 1.15 }, at: 2600, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "با گوش می‌شنویم: آواز گنجشک!", key: 2200, hold: 4600, do: [
            { id: "rainbow", to: { o: 0 }, dur: 500 }, { id: "face.pupils", to: { x: 0 }, dur: 400 },
            { id: "branch", to: { o: 1 }, at: 300, dur: 400 }, { id: "bird", to: { o: 1 }, at: 300, dur: 400 },
            { id: "bird.beak", to: { r: 30 }, at: 900, dur: 2800, yoyo: true, times: 10 },
            { id: "n1", to: { o: 1 }, at: 1000, dur: 200 }, { id: "n1", path: "M54 34Q70 24 80 34T100 38", at: 1000, dur: 1500 }, { id: "n1", to: { o: 0 }, at: 2400, dur: 300 },
            { id: "n2", to: { o: 1 }, at: 1700, dur: 200 }, { id: "n2", path: "M54 34Q70 46 80 38T100 42", at: 1700, dur: 1500 }, { id: "n2", to: { o: 0 }, at: 3100, dur: 300 },
            { id: "n3", to: { o: 1 }, at: 2400, dur: 200 }, { id: "n3", path: "M54 34Q68 28 80 30T100 40", at: 2400, dur: 1500 }, { id: "n3", to: { o: 0 }, at: 3800, dur: 300 },
            { id: "face.earL", to: { s: 1.25 }, at: 2300, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "با بینی بو می‌کنیم: گل سرخ!", key: 2600, do: [
            { id: "bird", to: { o: 0 }, dur: 400 }, { id: "branch", to: { o: 0 }, dur: 400 },
            { id: "rose", to: { o: 1 }, at: 300, dur: 500 },
            { id: "scent", to: { o: 1 }, at: 900, dur: 100 }, { id: "scent", draw: true, at: 900, dur: 1700 },
            { id: "face.nose", to: { s: 1.5 }, at: 2400, dur: 1200, yoyo: true, times: 4 },
            { id: "face.eyes", to: { sy: 0.15 }, at: 2500, dur: 400 }
          ] },
          { caption: "با زبان مزه می‌کنیم: هندوانه شیرین!", key: 2050, do: [
            { id: "rose", to: { o: 0 }, dur: 400 }, { id: "scent", to: { o: 0 }, dur: 400 }, { id: "face.eyes", to: { sy: 1 }, dur: 400 },
            { id: "melon", to: { o: 1 }, at: 200, dur: 300 }, { id: "melon", path: "M40 84Q70 76 118 57.5", at: 400, dur: 1200 },
            { id: "face.smile", to: { o: 0 }, at: 1300, dur: 200 }, { id: "face.open", to: { o: 1 }, at: 1300, dur: 200 },
            { id: "melon.whole", to: { o: 0 }, at: 1900, dur: 100 }, { id: "melon.bitten", to: { o: 1 }, at: 1900, dur: 100 },
            { id: "face.open", to: { o: 0 }, at: 2100, dur: 200 }, { id: "face.smile", to: { o: 1 }, at: 2100, dur: 200 },
            { id: "face", to: { sy: 0.97 }, at: 2300, dur: 1400, yoyo: true, times: 6 },
            { id: "melon", path: "M118 57.5Q80 80 40 84", at: 2600, dur: 1000 },
            { emit: "spark", where: [118, 50], spread: [26, 10], n: 6, at: 2400, dur: 1000 }
          ] },
          { caption: "با دست لمس می‌کنیم: پشم نرم گوسفند!", key: 2400, do: [
            { id: "melon", to: { o: 0 }, dur: 400 },
            { id: "sheep", to: { o: 1 }, at: 200, dur: 500 },
            { id: "hand", path: "M150 110Q120 70 52 56", at: 700, dur: 1200 },
            { id: "hand", to: { x: "+7" }, at: 2000, dur: 2400, yoyo: true, times: 6 },
            { id: "sheep.wool", to: { sy: 0.93 }, at: 2000, dur: 2400, yoyo: true, times: 6 }
          ],
            wait: { rub: true, n: 6, hint: "تو هم پشم گوسفند را ناز کن: روی گوسفند چپ و راست بکش!",
              each: [
                { id: "hand", to: { x: "+7" }, dur: 360, yoyo: true, times: 2 },
                { id: "sheep.wool", to: { sy: 0.93 }, dur: 360, yoyo: true, times: 2 }
              ] } },
          { caption: "چشم، گوش، بینی، زبان و پوست به ما کمک می‌کنند دنیا را بشناسیم.", key: 1000, hold: 7800, do: [
            { id: "sheep", to: { o: 0 }, dur: 400 },
            { id: "hand", path: "M52 56Q110 96 146 84", dur: 900 }, { id: "hand", to: { r: 0 }, dur: 900 },
            { id: "ring", to: { o: 1 }, at: 300, dur: 300 },
            { id: "face.eyes", to: { sy: 1.15 }, at: 400, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { x: 98, y: 42, sx: 1, s: 1.15 }, at: 1700, dur: 500 },
            { id: "face.earL", to: { s: 1.25 }, at: 2200, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { x: 118, y: 45, s: 0.85 }, at: 3100, dur: 500 },
            { id: "face.nose", to: { s: 1.5 }, at: 3600, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { x: 118, y: 52, s: 1 }, at: 4500, dur: 500 },
            { id: "face.smile", to: { o: 0 }, at: 4800, dur: 200 }, { id: "face.open", to: { o: 1 }, at: 4800, dur: 200 },
            { id: "face.open", to: { o: 0 }, at: 5800, dur: 200 }, { id: "face.smile", to: { o: 1 }, at: 5800, dur: 200 },
            { id: "ring", to: { x: 146, y: 72, s: 2 }, at: 6000, dur: 500 },
            { id: "hand", to: { s: 1.3 }, at: 6400, dur: 600, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "pairs", prompt: "جفت‌ها را پیدا کن",
        say: "بوی گل را با بینی می‌فهمیم. صدای زنگ را با گوش. حالا جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "👃", say: "بینی" }, { pic: "🌹", say: "گل" }],
          [{ pic: "👂", say: "گوش" }, { pic: "🔔", say: "زنگ" }],
          [{ pic: "👀", say: "چشم" }, { pic: "🌈", say: "رنگین‌کمان" }],
          [{ pic: "👅", say: "زبان" }, { pic: "🍋", say: "لیموترش" }]
        ] },
      { type: "choose", prompt: "صدای باران را با کدام می‌شنویم؟", say: "صدای باران را با کدام می‌شنویم؟", pic: true,
        options: [{ label: "👀", value: "چشم" }, { label: "👂", value: "گوش" }, { label: "👅", value: "زبان" }], answer: "گوش" },
      { type: "choose", prompt: "مزه شیرین خرما را با کدام می‌فهمیم؟", say: "مزه شیرین خرما را با کدام می‌فهمیم؟", pic: true,
        options: [{ label: "✋", value: "دست" }, { label: "👂", value: "گوش" }, { label: "👅", value: "زبان" }], answer: "زبان" },
      { type: "home", pic: "👜 ✋", text: "بدون نگاه کردن، فقط با دست حدس بزن!",
        need: ["یک کیسه پارچه‌ای یا یک جوراب بزرگ", "چند چیز آشنا که خیلی کوچک نباشند: قاشق، سیب، جوراب، مداد، شانه"],
        steps: [
          "دور از چشم کودک، چند چیز را در کیسه بگذارید.",
          "کودک دستش را در کیسه می‌برد و فقط با لمس کردن حدس می‌زند هر چیز چیست.",
          "بپرسید: «سفت است یا نرم؟ صاف است یا زبر؟ سرد است یا گرم؟»",
          "با چشم بسته، بوی نعناع، دارچین و پوست پرتقال را هم حدس بزنید.",
          "جایتان را عوض کنید: این بار کودک برای شما چیزی در کیسه بگذارد."
        ],
        ask: "کدام حس کمکت کرد؟" }
    ]
  },
  {
    id: "science-seed-3", subject: "science", level: "seed", emoji: "🌱", title: "دانه چطور سبز می‌شود؟",
    steps: [
      { type: "scene", prompt: "ببین دانه چطور سبز می‌شود", bg: "#cdeaf7",
        /* The ground is cut open, so the seed stays in sight under the soil: Leila plants it, waters it (the soil
           goes dark), the sun's light reaches it, days pass (the sky goes dark and light), a root grows down and a
           shoot up, the shoot becomes a plant, and the plant flowers. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-soil" }, sun: { art: "sci-sun", at: [22, 14], o: 0 },
          ray1: { art: "sci-ray", at: [28.2, 20.5], r: 46.3, sx: 1.3, o: 0 }, ray2: { art: "sci-ray", at: [28.6, 20.1], r: 42.5, sx: 1.4, o: 0 }, ray3: { art: "sci-ray", at: [29, 19.7], r: 39.2, sx: 1.52, o: 0 },
          wet: { art: "sci-wet", at: [70, 64], o: 0 },
          seed: { art: "sci-bean", at: [86, 40], s: 1.6, o: 0 },
          roots: { art: "sci-roots-small", at: [70, 67], s: 1.6, sy: 0 },
          sprout: { art: "sci-sprout", at: [70, 64], s: 1.6, sy: 0 },
          plant: { art: "sci-plant", at: [70, 64], s: 0.8, o: 0 }, tulip: { art: "sci-tulip", at: [70, 29], s: 0 },
          girl: { art: "👧", at: [98, 57], s: 1.6, flip: true },
          can: { art: "sci-can", at: [82, 37], s: 1.15, o: 0 },
          night: { art: "sci-night", o: 0 }
        },
        scenes: [
          { caption: "لیلا یک دانه در خاک کاشت.", key: 2800, do: [
            { id: "seed", to: { o: 1 }, at: 300, dur: 300 },
            { id: "girl.armF", to: { r: -60 }, at: 200, dur: 500 }, { id: "seed", path: "M86 40Q76 36 70 56L70 66", at: 700, dur: 1800 },
            { id: "girl.armF", to: { r: 0 }, at: 1200, dur: 600 }
          ] },
          { caption: "به آن آب داد.", key: 2200, do: [
            { id: "girl.armF", to: { r: -80 }, dur: 300 }, { id: "can", to: { o: 1 }, dur: 300 }, { id: "can", to: { r: -35 }, at: 300, dur: 500 },
            { emit: "drop", where: [64, 41], spread: [3, 2], rise: 15, n: 14, at: 800, dur: 2000, life: 800 },
            { id: "wet", to: { o: 1 }, at: 1400, dur: 1600 },
            { id: "can", to: { r: 0 }, at: 3000, dur: 400 }, { id: "can", to: { o: 0 }, at: 3300, dur: 400 }, { id: "girl.armF", to: { r: 0 }, at: 3300, dur: 500 }
          ] },
          { caption: "خورشید به آن نور داد.", do: [
            { id: "sun", to: { o: 1 }, dur: 600 }, { id: "sun.rays", to: { r: 90 }, dur: 3000 },
            { id: "ray1", to: { o: 1 }, at: 600, dur: 100 }, { id: "ray1", draw: true, at: 600, dur: 1200 },
            { id: "ray2", to: { o: 1 }, at: 800, dur: 100 }, { id: "ray2", draw: true, at: 800, dur: 1200 },
            { id: "ray3", to: { o: 1 }, at: 1000, dur: 100 }, { id: "ray3", draw: true, at: 1000, dur: 1200 },
            { emit: "spark", where: [70, 60], spread: [14, 6], n: 5, at: 1900, dur: 800 }
          ] },
          { caption: "چند روز گذشت. دانه جوانه زد!", hold: 5000, do: [
            { id: "ray1", to: { o: 0 }, dur: 300 }, { id: "ray2", to: { o: 0 }, dur: 300 }, { id: "ray3", to: { o: 0 }, dur: 300 },
            { id: "night", to: { o: 0.7 }, at: 300, dur: 400 }, { id: "night", to: { o: 0 }, at: 1000, dur: 400 },
            { id: "night", to: { o: 0.7 }, at: 1600, dur: 400 }, { id: "night", to: { o: 0 }, at: 2300, dur: 400 },
            { id: "roots", to: { sy: 1.6 }, at: 1500, dur: 1600 },
            { id: "sprout", to: { sy: 1.6 }, at: 2600, dur: 1400, ease: "out" }
          ] },
          { caption: "جوانه بزرگ‌تر شد.", do: [
            { id: "plant", to: { o: 1 }, dur: 600 }, { id: "sprout", to: { o: 0 }, dur: 600 },
            { id: "plant", to: { s: 1.6 }, dur: 2600 }
          ] },
          { caption: "گیاه گل داد!", key: 2000, do: [
            { id: "tulip", to: { s: 2 }, dur: 1300, ease: "back" },
            { id: "girl", to: { y: "-4" }, at: 1400, dur: 1200, yoyo: true, times: 4 }
          ] }
        ],
        question: "گیاه برای بزرگ شدن چه می‌خواهد؟", pic: true,
        options: [{ label: "🍭🍬", value: "آبنبات" }, { label: "💧☀️", value: "آب و نور" }, { label: "🧸🎈", value: "اسباب‌بازی" }], answer: "آب و نور" },
      { type: "order", prompt: "از اول تا آخر بچین", say: "اول دانه بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌰", say: "دانه" }, { pic: "🌱", say: "جوانه" }, { pic: "🌿", say: "گیاه" }, { pic: "🌷", say: "گل" }] },
      { type: "choose", show: "🥀", prompt: "این گل پژمرده شده. به آن چه بدهیم؟", say: "این گل پژمرده شده. به آن چه بدهیم؟", pic: true,
        options: [{ label: "🍞", value: "نان" }, { label: "🧦", value: "جوراب" }, { label: "💧", value: "آب" }], answer: "آب" },
      { type: "home", pic: "🌱 🍽️", text: "مثل سبزه نوروز، تو هم دانه سبز کن!",
        need: ["یک مشت عدس یا ماش", "دو بشقاب", "پنبه یا دستمال کاغذی", "آب"],
        steps: [
          "نیمی از عدس‌ها را یک شب در کاسه آب بگذارید تا خیس بخورند و نیم دیگر را خشک نگه دارید.",
          "در هر بشقاب پنبه یا دستمال پهن کنید. عدس‌های خیس را در یک بشقاب و عدس‌های خشک را در بشقاب دیگر بریزید.",
          "هر روز روی پنبه بشقاب اول کمی آب بپاشید و بشقاب دوم را خشک نگه دارید.",
          "هر دو را کنار پنجره بگذارید. کودک هر روز سر بزند و ببیند چه شده."
        ],
        ask: "کدام بشقاب سبز شد؟ چرا؟" }
    ]
  },
  {
    id: "science-seed-4", subject: "science", level: "seed", emoji: "🐿️", title: "خانه و غذای حیوان‌ها",
    steps: [
      { type: "pairs", prompt: "هر حیوان چه می‌خورد؟", say: "هر حیوان چه می‌خورد؟ جفتش را پیدا کن.",
        pairs: [
          [{ pic: "🐰", say: "خرگوش" }, { pic: "🥕", say: "هویج" }],
          [{ pic: "🐿️", say: "سنجاب" }, { pic: "🌰", say: "فندق" }],
          [{ pic: "🐝", say: "زنبور" }, { pic: "🌸", say: "گل" }],
          [{ pic: "🐄", say: "گاو" }, { pic: "🌾", say: "علف" }]
        ] },
      { type: "scene", prompt: "گنجشک کجا زندگی می‌کند؟", bg: "#cdeaf7",
        /* The sparrow brings twigs and the nest is drawn twig by twig; it sits and the eggs are there; we look
           closer as one egg cracks and the chick comes out; the mother fetches a worm from the grass and feeds it to
           the chick. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, tree: { art: "sci-tree", at: [52, 88], s: 1.15 },
          nestBack: { art: "sci-nest-back", at: [82, 44.5], s: 1.3, o: 0 },
          eggs: { art: "sci-eggs", at: [82, 43.5], s: 1.3, o: 0 }, chick: { art: "sci-chick", at: [85.9, 44], s: 1.3, o: 0 },
          nest: { art: "sci-nest", at: [82, 44.5], s: 1.3, o: 0 }, lines: { art: "sci-nest-lines", at: [82, 44.5], s: 1.3, o: 0 },
          wormG: { art: "sci-worm", at: [24, 84], s: 1.3 },
          bird: { art: "sci-sparrow", at: [170, 8], s: 1.4, flip: true },
          twig: { art: "sci-twig", at: [11, -9], under: "bird" }, worm: { art: "sci-worm", at: [11, -8.6], s: 0.8, under: "bird", o: 0 },
          wormC: { art: "sci-worm", at: [90.6, 33.4], s: 1.1, o: 0 }
        },
        scenes: [
          { caption: "گنجشک روی درخت لانه می‌سازد.", hold: 8200, do: [
            { id: "bird.wing", to: { r: -40 }, dur: 7600, yoyo: true, times: 40 },
            { id: "bird", path: "M170 8Q130 4 85 40", dur: 1600 },
            { id: "twig", to: { o: 0 }, at: 1700, dur: 200 },
            { id: "lines", to: { o: 1 }, at: 1700, dur: 100 }, { id: "lines", draw: true, oneByOne: true, at: 1700, dur: 4400 },
            { id: "bird", path: "M85 40Q120 0 170 6", at: 2000, dur: 1300 },
            { id: "twig", to: { o: 1 }, at: 3300, dur: 100 },
            { id: "bird", path: "M170 6Q130 2 85 40", at: 3500, dur: 1500 },
            { id: "twig", to: { o: 0 }, at: 5100, dur: 200 },
            { id: "nestBack", to: { o: 1 }, at: 6000, dur: 800 }, { id: "nest", to: { o: 1 }, at: 6000, dur: 800 },
            { id: "bird", path: "M85 40L98 41.5", at: 6200, dur: 600 }
          ] },
          { caption: "در لانه تخم می‌گذارد.", do: [
            { id: "lines", to: { o: 0 }, dur: 300 },
            { id: "bird", path: "M98 41.5Q90 32 83 39.5", dur: 700 }, { id: "bird", to: { sy: 0.85 }, at: 700, dur: 300 },
            { id: "eggs", to: { o: 1 }, at: 1500, dur: 300 },
            { id: "bird", to: { sy: 1 }, at: 2200, dur: 300 }, { id: "bird", path: "M83 39.5Q90 32 98 41.5", at: 2400, dur: 700 }
          ] },
          { caption: "جوجه از تخم بیرون آمد!", hold: 5200, do: [
            { cam: { x: 88, y: 38, zoom: 2.4 }, dur: 900 },
            { id: "eggs.top", to: { r: 12 }, at: 1000, dur: 1200, yoyo: true, times: 6 },
            { id: "eggs.top", to: { y: -5, x: 3, r: 70, o: 0 }, at: 2400, dur: 700 },
            { id: "chick", to: { o: 1 }, at: 2300, dur: 200 }, { id: "chick", to: { y: 43 }, at: 2400, dur: 600, ease: "back" },
            { id: "eggs.bottom", to: { o: 0 }, at: 3300, dur: 400 },
            { id: "chick", to: { y: "-1.2" }, at: 3300, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "مادر برای جوجه غذا می‌آورد.", key: 4000, hold: 5600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "bird.wing", to: { r: -40 }, at: 900, dur: 4200, yoyo: true, times: 24 },
            { id: "bird", path: "M98 41.5Q60 40 38 84", at: 900, dur: 1300 },
            { id: "bird", to: { r: -30 }, at: 2300, dur: 300, yoyo: true, times: 2 },
            { id: "wormG", to: { o: 0 }, at: 2600, dur: 100 }, { id: "worm", to: { o: 1 }, at: 2600, dur: 100 },
            { id: "bird", path: "M38 84Q60 30 104 46", at: 3100, dur: 1600 }
          ] },
          { caption: "جوجه گرسنه بود. نوش جان!", key: 1900, do: [
            { cam: { x: 92, y: 40, zoom: 2.2 }, dur: 800 },
            { id: "bird.wing", to: { r: -40 }, dur: 3000, yoyo: true, times: 16 },
            { id: "chick.beak", to: { r: 40 }, at: 400, dur: 1400, yoyo: true, times: 6 },
            { id: "bird", to: { r: -16 }, at: 900, dur: 400 },
            { id: "worm", to: { o: 0 }, at: 1300, dur: 100 }, { id: "wormC", to: { o: 1 }, at: 1300, dur: 100 },
            { id: "wormC", to: { x: 93.2, y: 38.8, s: 0, o: 0 }, at: 1500, dur: 900 },
            { id: "bird", to: { r: 0 }, at: 2100, dur: 400 },
            { id: "chick", to: { y: "-1.4" }, at: 2500, dur: 1400, yoyo: true, times: 4 }
          ] }
        ],
        question: "جوجه گنجشک کجا زندگی می‌کند؟", pic: true,
        options: [{ label: "🌊", value: "در آب" }, { label: "🌳", value: "در لانه روی درخت" }, { label: "🏜️", value: "در کویر" }], answer: "در لانه روی درخت" },
      { type: "sort", prompt: "در آب یا در خشکی؟", say: "کدام حیوان در آب زندگی می‌کند و کدام در خشکی؟",
        baskets: [{ label: "آب", pic: "🌊", value: "water" }, { label: "خشکی", pic: "🌳", value: "land" }],
        items: [
          { pic: "🐟", say: "ماهی", basket: "water" },
          { pic: "🐬", say: "دلفین", basket: "water" },
          { pic: "🐙", say: "هشت‌پا", basket: "water" },
          { pic: "🐫", say: "شتر", basket: "land" },
          { pic: "🐑", say: "گوسفند", basket: "land" },
          { pic: "🐈", say: "گربه", basket: "land" }
        ] },
      { type: "home", pic: "🐦 🌾", text: "بیا برای پرنده‌ها دانه بگذاریم و تماشایشان کنیم.",
        need: ["یک ظرف کوچک برای دانه", "کمی ارزن، برنج خام یا گندم", "یک ظرف کم‌عمق آب"],
        steps: [
          "ظرف دانه و آب را لب پنجره، روی بالکن یا گوشه حیاط بگذارید.",
          "از پشت پنجره، آرام و بی‌صدا نگاه کنید. به پرنده‌ها دست نزنید.",
          "بشمارید چند پرنده آمد و بگویید چه رنگی بودند.",
          "اگر مورچه دیدید، با هم دنبالش کنید: کجا می‌رود؟ خانه‌اش کجاست؟"
        ],
        ask: "پرنده دانه را با چه برمی‌دارد؟" }
    ]
  },
  {
    id: "science-seed-5", subject: "science", level: "seed", emoji: "🌦️", title: "امروز هوا چطور است؟",
    steps: [
      { type: "scene", prompt: "هوا هر روز یک‌جور است", bg: "#cdeaf7",
        /* Three days, three weathers: the sun shines and Sara takes the sun hat off the coat stand and puts it on;
           clouds and rain come and Reza takes the umbrella and opens it; snow falls and settles, he shivers, and
           the coat, scarf and gloves go from the stand onto him. The clothes are drawn in the child's own units, so
           a piece at the child's place and size is worn. Drawings: js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, grey: { art: "sci-grey-sky", o: 0 }, sun: { art: "sci-sun", at: [138, 16] },
          c1: { art: "sci-cloud-grey", at: [40, -14], s: 1.6 }, c2: { art: "sci-cloud-grey", at: [110, -16], s: 2 },
          ground: { art: "sci-ground" }, snowGround: { art: "sci-snow-ground", o: 0 },
          rain: { art: "sci-rainfall", o: 0 }, snow: { art: "sci-snowfall", o: 0 },
          rack: { art: "sci-rack", at: [30, 86], s: 1.2 }, umbrella: { art: "sci-umbrella", at: [44, 86], r: 14 },
          girl: { art: "sci-kid-girl", at: [94, 86], s: 1.4, look: { hair: "auto", kind: "girl" } }, boy: { art: "sci-kid-boy", at: [190, 86], s: 1.4 },
          hat: { art: "sci-hat", at: [37, 92.4], s: 1.4 }, coat: { art: "sci-coat", at: [22.8, 73.3], s: 1.4 },
          scarf: { art: "sci-scarf", at: [37.2, 87.2], s: 1.4 }, gloves: { art: "sci-gloves", at: [30, 87], s: 0.7 }
        },
        scenes: [
          { caption: "امروز هوا آفتابی و گرم است. سارا کلاه سرش می‌گذارد.", key: 3600, do: [
            { id: "sun.rays", to: { r: 135 }, dur: 5000 }, { id: "sun", to: { s: 1.15 }, dur: 1200, yoyo: true, times: 2 },
            { id: "girl", to: { r: -4 }, at: 1600, dur: 400, yoyo: true, times: 2 },
            { id: "hat", path: "M37 92.4Q60 40 94 86", at: 2000, dur: 1500 },
            { id: "girl", to: { y: "-3" }, at: 3800, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "امروز باران می‌بارد. رضا چتر برمی‌دارد.", key: 5200, hold: 6600, do: [
            { id: "girl", path: "M94 86L190 86", dur: 1600, ease: "in" }, { id: "hat", path: "M94 86L190 86", dur: 1600, ease: "in" },
            { id: "grey", to: { o: 1 }, at: 300, dur: 1200 }, { id: "sun", to: { o: 0 }, at: 300, dur: 1000 },
            { id: "c1", to: { y: 14 }, at: 300, dur: 1400 }, { id: "c2", to: { y: 10 }, at: 300, dur: 1400 },
            { id: "rain", to: { o: 1 }, at: 1400, dur: 500 }, { id: "rain", to: { y: "+12" }, at: 1400, dur: 5200, times: 13, ease: "linear" },
            { id: "boy", path: "M190 86L96 86", at: 1500, dur: 1600, ease: "out" },
            { id: "umbrella", path: "M44 86Q80 56 110.6 66", at: 3200, dur: 1000 }, { id: "umbrella", to: { r: -12 }, at: 3200, dur: 1000 },
            { id: "umbrella.closed", to: { o: 0 }, at: 4300, dur: 200 },
            { id: "umbrella.open", to: { o: 1, sx: 0.2 }, at: 4300, dur: 1 }, { id: "umbrella.open", to: { sx: 1 }, at: 4300, dur: 700, ease: "back" }
          ] },
          { caption: "امروز برف می‌بارد و هوا سرد است. کاپشن، شال‌گردن و دستکش می‌پوشیم.", key: 7400, hold: 8400, do: [
            { id: "rain", to: { o: 0 }, dur: 800 },
            { id: "umbrella.open", to: { sx: 0.2, o: 0 }, dur: 500 }, { id: "umbrella.closed", to: { o: 1 }, at: 400, dur: 100 },
            { id: "umbrella", path: "M110.6 66Q80 56 44 86", at: 600, dur: 1000 }, { id: "umbrella", to: { r: 14 }, at: 600, dur: 1000 },
            { id: "c1", to: { o: 0.6 }, dur: 600 },
            { id: "snow", to: { o: 1 }, at: 700, dur: 800 }, { id: "snow", to: { y: "+20" }, at: 700, dur: 7600, times: 5, ease: "linear" },
            { id: "snowGround", to: { o: 1 }, at: 1400, dur: 2400 },
            { id: "boy", to: { x: "+0.8" }, at: 1800, dur: 1600, yoyo: true, times: 16 },
            { id: "coat", path: "M22.8 73.3Q60 40 96 86", at: 3500, dur: 1300 },
            { id: "scarf", path: "M37.2 87.2Q66 50 96 86", at: 4900, dur: 1200 },
            { id: "gloves", path: "M30 87Q64 66 96 86", at: 6200, dur: 1100 }, { id: "gloves", to: { s: 1.4 }, at: 6200, dur: 1100 },
            { id: "boy", to: { y: "-3" }, at: 7500, dur: 800, yoyo: true, times: 2 }
          ] }
        ],
        question: "باران می‌بارد. چه برداریم؟", pic: true,
        options: [{ label: "🕶️", value: "عینک آفتابی" }, { label: "☂️", value: "چتر" }, { label: "⚽", value: "توپ" }], answer: "چتر" },
      { type: "sort", prompt: "برای هوای گرم یا هوای سرد؟", say: "کدام را در هوای گرم می‌پوشیم و کدام را در هوای سرد؟",
        baskets: [{ label: "هوای گرم", pic: "☀️", value: "hot" }, { label: "هوای سرد", pic: "❄️", value: "cold" }],
        items: [
          { pic: "👒", say: "کلاه آفتابی", basket: "hot" },
          { pic: "🕶️", say: "عینک آفتابی", basket: "hot" },
          { pic: "👕", say: "پیراهن نازک", basket: "hot" },
          { pic: "🧣", say: "شال‌گردن", basket: "cold" },
          { pic: "🧤", say: "دستکش", basket: "cold" },
          { pic: "🧥", say: "کاپشن", basket: "cold" }
        ] },
      { type: "home", pic: "☀️ ☁️ 🌧️", text: "هر روز صبح هوا را ببین و بگو امروز چه بپوشیم.",
        need: ["لباس‌های خود کودک"],
        steps: [
          "هر روز صبح با کودک از پنجره یا در حیاط به آسمان نگاه کنید.",
          "بپرسید: «آفتابی است یا ابری؟ باد می‌آید؟ باران می‌بارد؟»",
          "کودک دستش را بیرون ببرد و بگوید هوا گرم است یا سرد.",
          "با هم لباس امروز را انتخاب کنید و بپرسید: «چرا این را می‌پوشیم؟»",
          "بازی کنید: شما بگویید «برف می‌بارد!» یا «آفتاب داغ است!» و کودک از میان لباس‌ها، لباس مناسب را پیدا کند."
        ],
        ask: "اگر باد سرد بیاید، چه می‌پوشی؟" }
    ]
  },
  {
    id: "science-seed-6", subject: "science", level: "seed", emoji: "🎨", title: "رنگ‌ها را قاطی کن",
    steps: [
      { type: "scene", prompt: "ببین رنگ‌ها چه می‌شوند", bg: "#f6efdc",
        /* Real paint in real bowls: each jar tips and pours, the brush stirs, the two colours swirl and become one
           new colour. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          bowlA: { art: "sci-mixbowl", at: [56, 86], s: 1.3 }, bowlB: { art: "sci-mixbowl", at: [104, 86], s: 1.3 },
          redA: { art: "sci-paint-red", at: [56, 74.4], s: 0 }, ryA: { art: "sci-swirl-ry", at: [56, 74.4], s: 1.2, o: 0 }, orA: { art: "sci-paint-orange", at: [56, 74.4], s: 1.2, o: 0 },
          blueB: { art: "sci-paint-blue", at: [104, 74.4], s: 0 }, byB: { art: "sci-swirl-by", at: [104, 74.4], s: 1.2, o: 0 }, grB: { art: "sci-paint-green", at: [104, 74.4], s: 1.2, o: 0 },
          sRed: { art: "sci-stream-red", at: [60.7, 61.6], sy: 0.8, o: 0 }, sYelA: { art: "sci-stream-yellow", at: [51.3, 61.6], sy: 0.8, o: 0 },
          sBlue: { art: "sci-stream-blue", at: [99.3, 61.6], sy: 0.8, o: 0 }, sYelB: { art: "sci-stream-yellow", at: [108.7, 61.6], sy: 0.8, o: 0 },
          red: { art: "sci-jar-red", at: [24, 72], s: 1.5 }, yellow: { art: "sci-jar-yellow", at: [80, 66], s: 1.5 }, blue: { art: "sci-jar-blue", at: [138, 72], s: 1.5 },
          brush: { art: "sci-brush", at: [80, 40], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "این رنگ قرمز است و این رنگ زرد.", key: 900, do: [
            { id: "red", to: { s: 1.9, y: "-3" }, at: 300, dur: 1200, yoyo: true, times: 2 },
            { id: "yellow", to: { s: 1.9, y: "-3" }, at: 1800, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "قرمز و زرد را با هم قاطی می‌کنیم…", key: 6200, hold: 8200, do: [
            { id: "red", path: "M24 72Q30 50 40 58", dur: 800 }, { id: "red", to: { r: 100 }, at: 800, dur: 500 },
            { id: "sRed", to: { o: 1 }, at: 1200, dur: 150 }, { id: "redA", to: { s: 1.2 }, at: 1300, dur: 1200 }, { id: "sRed", to: { o: 0 }, at: 2400, dur: 150 },
            { id: "red", to: { r: 0 }, at: 2500, dur: 400 }, { id: "red", path: "M40 58Q30 50 24 72", at: 2900, dur: 700 },
            { id: "yellow", path: "M80 66Q76 54 72 58", at: 2500, dur: 600 }, { id: "yellow", to: { r: -100 }, at: 3100, dur: 500 },
            { id: "sYelA", to: { o: 1 }, at: 3500, dur: 150 }, { id: "ryA", to: { o: 1 }, at: 3600, dur: 1000 }, { id: "sYelA", to: { o: 0 }, at: 4700, dur: 150 },
            { id: "yellow", to: { r: 0 }, at: 4800, dur: 400 }, { id: "yellow", path: "M72 58Q76 54 80 66", at: 5200, dur: 600 },
            { id: "brush", to: { o: 1 }, at: 4900, dur: 300 }, { id: "brush", path: "M80 40Q60 50 56 75", at: 4900, dur: 700 },
            { id: "brush", path: "M56 75c-10 0-10 2 0 2s10-2 0-2c-10 0-10 2 0 2s10-2 0-2c-10 0-10 2 0 2s10-2 0-2", at: 5700, dur: 2400, ease: "linear" },
            { id: "ryA", to: { r: 4 }, at: 5700, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "نارنجی شد!", do: [
            { id: "orA", to: { o: 1 }, dur: 1000 }, { id: "brush", path: "M56 75Q60 50 80 40", at: 600, dur: 800 }, { id: "brush", to: { o: 0 }, at: 1300, dur: 300 },
            { id: "bowlA", to: { s: 1.45 }, at: 1100, dur: 900, yoyo: true, times: 2 }, { id: "orA", to: { s: 1.35, y: "-1.4" }, at: 1100, dur: 900, yoyo: true, times: 2 },
            { emit: "spark", where: [56, 70], spread: [30, 8], n: 7, at: 1000, dur: 1000 }
          ] },
          { caption: "حالا آبی و زرد…", key: 1000, do: [
            { id: "blue", to: { s: 1.9, y: "-3" }, at: 300, dur: 1200, yoyo: true, times: 2 },
            { id: "yellow", to: { s: 1.9, y: "-3" }, at: 1700, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "با هم قاطی می‌کنیم…", key: 6200, hold: 8200, do: [
            { id: "blue", path: "M138 72Q132 50 120 58", dur: 800 }, { id: "blue", to: { r: -100 }, at: 800, dur: 500 },
            { id: "sBlue", to: { o: 1 }, at: 1200, dur: 150 }, { id: "blueB", to: { s: 1.2 }, at: 1300, dur: 1200 }, { id: "sBlue", to: { o: 0 }, at: 2400, dur: 150 },
            { id: "blue", to: { r: 0 }, at: 2500, dur: 400 }, { id: "blue", path: "M120 58Q132 50 138 72", at: 2900, dur: 700 },
            { id: "yellow", path: "M80 66Q84 54 88 58", at: 2500, dur: 600 }, { id: "yellow", to: { r: 100 }, at: 3100, dur: 500 },
            { id: "sYelB", to: { o: 1 }, at: 3500, dur: 150 }, { id: "byB", to: { o: 1 }, at: 3600, dur: 1000 }, { id: "sYelB", to: { o: 0 }, at: 4700, dur: 150 },
            { id: "yellow", to: { r: 0 }, at: 4800, dur: 400 }, { id: "yellow", path: "M88 58Q84 54 80 66", at: 5200, dur: 600 },
            { id: "brush", to: { o: 1 }, at: 4900, dur: 300 }, { id: "brush", path: "M80 40Q100 50 104 75", at: 4900, dur: 700 },
            { id: "brush", path: "M104 75c-10 0-10 2 0 2s10-2 0-2c-10 0-10 2 0 2s10-2 0-2c-10 0-10 2 0 2s10-2 0-2", at: 5700, dur: 2400, ease: "linear" },
            { id: "byB", to: { r: -4 }, at: 5700, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "سبز شد!", do: [
            { id: "grB", to: { o: 1 }, dur: 1000 }, { id: "brush", path: "M104 75Q100 50 80 40", at: 600, dur: 800 }, { id: "brush", to: { o: 0 }, at: 1300, dur: 300 },
            { id: "bowlB", to: { s: 1.45 }, at: 1100, dur: 900, yoyo: true, times: 2 }, { id: "grB", to: { s: 1.35, y: "-1.4" }, at: 1100, dur: 900, yoyo: true, times: 2 },
            { emit: "spark", where: [104, 70], spread: [30, 8], n: 7, at: 1000, dur: 1000 }
          ] }
        ] },
      { type: "choose", ltr: true, show: "🔴 + 🟡", prompt: "قرمز و زرد چه رنگی می‌شوند؟", say: "قرمز و زرد را قاطی کنیم، چه رنگی می‌شوند؟", pic: true,
        options: [{ label: "🟢", value: "سبز" }, { label: "🟠", value: "نارنجی" }, { label: "🟣", value: "بنفش" }], answer: "نارنجی" },
      { type: "choose", ltr: true, show: "🔵 + 🟡", prompt: "آبی و زرد چه رنگی می‌شوند؟", say: "آبی و زرد را قاطی کنیم، چه رنگی می‌شوند؟", pic: true,
        options: [{ label: "🟠", value: "نارنجی" }, { label: "🟣", value: "بنفش" }, { label: "🟢", value: "سبز" }], answer: "سبز" },
      { type: "choose", ltr: true, show: "🔴 + 🔵", prompt: "حدس بزن: قرمز و آبی چه رنگی می‌شوند؟", say: "این یکی را ندیدی. حدس بزن: قرمز و آبی را قاطی کنیم، چه رنگی می‌شوند؟", pic: true,
        options: [{ label: "🟣", value: "بنفش" }, { label: "🟢", value: "سبز" }, { label: "🟡", value: "زرد" }], answer: "بنفش" },
      { type: "home", pic: "🎨 🖌️", text: "خودت رنگ‌ها را قاطی کن و ببین چه می‌شود!",
        need: ["آبرنگ یا گواش قرمز، زرد و آبی، یا چند قطره رنگ خوراکی در لیوان‌های آب", "قلم‌مو و کاغذ", "روزنامه یا سفره کهنه برای روی میز"],
        steps: [
          "روزنامه را روی میز پهن کنید و به کودک لباس کهنه بپوشانید.",
          "پیش از هر بار قاطی کردن، کودک حدس بزند: «زرد و آبی چه رنگی می‌شود؟»",
          "دو رنگ را روی کاغذ یا در یک لیوان خالی با هم قاطی کنید و ببینید چه شد.",
          "همه جفت‌ها را امتحان کنید و رنگ‌های تازه را کنار هم روی کاغذ بکشید."
        ],
        ask: "اگر هر سه رنگ را با هم قاطی کنیم، چه می‌شود؟" }
    ]
  },

  // ---------------- Science: Sprout (guess, try, see) ----------------
  {
    id: "science-sprout-1", subject: "science", level: "sprout", emoji: "🌻", title: "بخش‌های گیاه",
    steps: [
      { type: "scene", prompt: "هر بخش گیاه چه کاری می‌کند؟", bg: "#cdeaf7",
        /* The ground is cut open to show the roots. A ring goes round each part as the words name it; water drops
           go from the soil into the roots and up the stem; sunlight reaches the leaves and they sparkle; the middle
           of the flower fills with seeds, and one seed comes out: it is a تخمه. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-soil" }, sun: { art: "sci-sun", at: [20, 14], o: 0 },
          ray1: { art: "sci-ray", at: [27.8, 18.5], r: 30.1, sx: 1.35, o: 0 }, ray2: { art: "sci-ray", at: [28.7, 16.3], r: 14.6, sx: 1.78, o: 0 }, ray3: { art: "sci-ray", at: [28.8, 16], r: 13.1, sx: 1.28, o: 0 },
          sf: { art: "sci-sunflower", at: [86, 57], s: 0.95 },
          d1: { art: "sci-drop", at: [60, 82], o: 0 }, d2: { art: "sci-drop", at: [112, 80], o: 0 }, d3: { art: "sci-drop", at: [74, 88], o: 0 },
          seed: { art: "sci-sf-seed", at: [86, 13], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "این گل آفتابگردان است.", do: [
            { id: "sf.head", to: { r: 8 }, at: 300, dur: 2400, yoyo: true, times: 2 },
            { id: "sf.leaves", to: { r: -3 }, at: 300, dur: 2400, yoyo: true, times: 2 }
          ] },
          { caption: "ریشه زیر خاک است. ریشه از خاک آب می‌خورد.", key: 2600, hold: 5200, do: [
            { id: "sf.glowRoots", to: { o: 1 }, dur: 400 },
            { id: "d1", to: { o: 1 }, at: 1200, dur: 200 }, { id: "d2", to: { o: 1 }, at: 1500, dur: 200 }, { id: "d3", to: { o: 1 }, at: 1800, dur: 200 },
            { id: "d1", path: "M60 82Q66 74 75.5 70.3Q82 64 86 58", at: 1400, dur: 2400 },
            { id: "d2", path: "M112 80Q104 72 97.4 68.4Q90 62 86 58", at: 1700, dur: 2400 },
            { id: "d3", path: "M74 88Q82 84 86 77.9L86 58", at: 2000, dur: 2400 },
            { id: "d1", to: { o: 0 }, at: 3800, dur: 300 }, { id: "d2", to: { o: 0 }, at: 4100, dur: 300 }, { id: "d3", to: { o: 0 }, at: 4400, dur: 300 }
          ] },
          { caption: "ساقه آب را بالا می‌برد.", key: 1900, do: [
            { id: "sf.glowRoots", to: { o: 0 }, dur: 300 }, { id: "sf.glowStem", to: { o: 1 }, dur: 400 },
            { id: "d1", to: { o: 1 }, at: 500, dur: 150 }, { id: "d1", path: "M86 58L86 16", at: 500, dur: 2000, ease: "linear" }, { id: "d1", to: { o: 0 }, at: 2400, dur: 300 },
            { id: "d2", to: { o: 1 }, at: 1100, dur: 150 }, { id: "d2", path: "M86 58L86 16", at: 1100, dur: 2000, ease: "linear" }, { id: "d2", to: { o: 0 }, at: 3000, dur: 300 },
            { id: "d3", to: { o: 1 }, at: 1700, dur: 150 }, { id: "d3", path: "M86 58L86 16", at: 1700, dur: 2000, ease: "linear" }, { id: "d3", to: { o: 0 }, at: 3600, dur: 300 }
          ] },
          { caption: "برگ‌ها نور خورشید را می‌گیرند و برای گیاه غذا می‌سازند.", key: 3400, hold: 6000, do: [
            { id: "sf.glowStem", to: { o: 0 }, dur: 300 },
            { id: "sun", to: { o: 1 }, dur: 600 }, { id: "sun.rays", to: { r: 120 }, dur: 5000 },
            { id: "ray1", to: { o: 1 }, at: 700, dur: 100 }, { id: "ray1", draw: true, at: 700, dur: 1300 },
            { id: "ray2", to: { o: 1 }, at: 900, dur: 100 }, { id: "ray2", draw: true, at: 900, dur: 1300 },
            { id: "ray3", to: { o: 1 }, at: 1100, dur: 100 }, { id: "ray3", draw: true, at: 1100, dur: 1300 },
            { id: "sf.glowLeaves", to: { o: 1 }, at: 2200, dur: 400 },
            { id: "sf.leaves", to: { s: 1.06 }, at: 2400, dur: 2400, yoyo: true, times: 4 },
            { emit: "spark", where: [86, 38], spread: [30, 20], n: 10, at: 2600, dur: 2400 }
          ] },
          { caption: "گل دانه می‌سازد. تخمه آفتابگردان همان دانه این گل است!", hold: 7000, do: [
            { id: "ray1", to: { o: 0 }, dur: 300 }, { id: "ray2", to: { o: 0 }, dur: 300 }, { id: "ray3", to: { o: 0 }, dur: 300 }, { id: "sf.glowLeaves", to: { o: 0 }, dur: 300 },
            { cam: { x: 92, y: 20, zoom: 2.3 }, at: 200, dur: 1000 },
            { id: "sf.seeds", to: { o: 1 }, at: 1300, dur: 1600 },
            { id: "seed", to: { o: 1 }, at: 3800, dur: 200 }, { id: "seed", path: "M86 13Q100 6 112 22", at: 3800, dur: 1100 },
            { id: "seed", to: { s: 1.8, r: 20 }, at: 3800, dur: 1100 },
            { id: "seed", to: { s: 2.1 }, at: 5100, dur: 600, yoyo: true, times: 2 }
          ] }
        ],
        question: "کدام بخش گیاه از خاک آب می‌خورد؟",
        options: ["برگ", "ریشه", "گل"], answer: "ریشه" },
      { type: "pairs", prompt: "از کدام بخش گیاه می‌خوریم؟", say: "هویج ریشه گیاه است. ما از کدام بخش گیاه می‌خوریم؟ جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🥕", say: "هویج" }, "ریشه"],
          [{ pic: "🥬", say: "کاهو" }, "برگ"],
          [{ pic: "🍎", say: "سیب" }, "میوه"],
          [{ pic: "🌽", say: "ذرت" }, "دانه"]
        ] },
      { type: "choose", prompt: "اگر گیاه آب نخورد، چه می‌شود؟", say: "اگر گیاه چند روز آب نخورد، چه می‌شود؟", pic: true,
        options: [{ label: "🌷", value: "شاداب می‌ماند" }, { label: "🥀", value: "پژمرده می‌شود" }], answer: "پژمرده می‌شود" },
      { type: "home", pic: "🥬 🥛", text: "ببین ساقه چطور آب را بالا می‌برد.",
        need: ["یک ساقه کرفس با برگ، یا یک گل سفید", "یک لیوان آب", "کمی آب لبو یا رنگ خوراکی"],
        steps: [
          "آب لبو یا رنگ خوراکی را در لیوان آب بریزید.",
          "ساقه کرفس یا گل سفید را در لیوان بگذارید.",
          "از کودک بپرسید: «فکر می‌کنی چه می‌شود؟» حدسش را روی کاغذ بنویسید.",
          "فردا با هم به برگ‌ها یا گلبرگ‌ها نگاه کنید و با حدس کودک مقایسه کنید."
        ],
        ask: "رنگ از کجا بالا رفت؟" }
    ]
  },
  {
    id: "science-sprout-2", subject: "science", level: "sprout", emoji: "🧊", title: "یخ، آب، بخار",
    steps: [
      { type: "scene", prompt: "یخ چه می‌شود؟", bg: "#f6efdc",
        /* A finger taps the ice (hard) and pulls back from the cold; the sun's light reaches it and it really
           melts: it gets smaller and the puddle grows. A glass of water goes into the freezer and comes out ice.
           Steam rises from hot tea and a cold lid held over it gets drops of water: steam is water too.
           Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, sun: { art: "sci-sun", at: [24, 16], o: 0 },
          ray1: { art: "sci-ray", at: [31.3, 21.2], r: 35.5, sx: 1.5, o: 0 }, ray2: { art: "sci-ray", at: [30.6, 22.1], r: 42.5, sx: 1.4, o: 0 },
          plate: { art: "sci-plate", at: [80, 76] }, puddle: { art: "sci-puddle", at: [80, 74.4], s: 0.2, o: 0 },
          ice: { art: "sci-ice", at: [80, 74.6], s: 1.6 }, chill: { art: "sci-chill", at: [80, 52], o: 0 },
          fr: { art: "sci-freezer", at: [124, 86], s: 1.3, o: 0 }, cup: { art: "sci-cup", at: [56, 74], s: 1.4, o: 0 },
          frDoor: { art: "sci-freezer-door", at: [142.2, 86], s: 1.3, o: 0 },
          tea: { art: "sci-tea", at: [80, 80], s: 1.6, o: 0 },
          w1: { art: "sci-steam", at: [76, 58], s: 1.3, o: 0 }, w2: { art: "sci-steam", at: [80, 56], s: 1.3, o: 0 }, w3: { art: "sci-steam", at: [84, 58], s: 1.3, o: 0 },
          lid: { art: "sci-lid", at: [80, 36], s: 1.2, o: 0 }, hand2: { art: "hand", at: [106, 37], r: -90, o: 0 },
          hand: { art: "hand", at: [80, -24], r: 180 }
        },
        scenes: [
          { caption: "این یک تکه یخ است. یخ سفت و سرد است.", key: 1500, hold: 5000, do: [
            { id: "hand", path: "M80 -24L80 28", dur: 900, ease: "out" },
            { id: "hand", to: { y: 25 }, at: 1000, dur: 200, yoyo: true, times: 4 },
            { emit: "spark", where: [80, 51], spread: [6, 2], n: 4, at: 1100, dur: 800 },
            { id: "chill", to: { o: 1 }, at: 1800, dur: 100 }, { id: "chill", draw: true, at: 1800, dur: 1200 },
            { id: "hand", path: "M80 28L92 6", at: 2100, dur: 400, ease: "out" },
            { id: "hand", to: { x: "+1.6" }, at: 2500, dur: 900, yoyo: true, times: 6 },
            { id: "hand", path: "M92 6L92 -30", at: 3600, dur: 600 }
          ] },
          { caption: "خورشید یخ را گرم کرد…", key: 3600, hold: 5600, do: [
            { id: "chill", to: { o: 0 }, dur: 300 },
            { id: "sun", to: { o: 1 }, dur: 600 }, { id: "sun.rays", to: { r: 120 }, dur: 5400 },
            { id: "ray1", to: { o: 1 }, at: 600, dur: 100 }, { id: "ray1", draw: true, at: 600, dur: 1100 },
            { id: "ray2", to: { o: 1 }, at: 800, dur: 100 }, { id: "ray2", draw: true, at: 800, dur: 1100 },
            { id: "ice", to: { sy: 0.55, sx: 0.86 }, at: 1600, dur: 3800 },
            { id: "puddle", to: { o: 1, s: 0.95 }, at: 1600, dur: 3800 },
            { emit: "drop", where: [80, 66], spread: [22, 2], rise: 7, n: 10, at: 1800, dur: 3200, life: 700 }
          ] },
          { caption: "و یخ آب شد!", do: [
            { id: "ice", to: { sy: 0.06, sx: 0.7 }, dur: 1600 }, { id: "ice", to: { o: 0 }, at: 1300, dur: 400 },
            { id: "puddle", to: { s: 1.15 }, dur: 1600 },
            { id: "puddle", to: { sy: 1.25 }, at: 1700, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "اگر آب را در فریزر بگذاریم، دوباره یخ می‌زند.", hold: 9400, do: [
            { id: "sun", to: { o: 0 }, dur: 500 }, { id: "ray1", to: { o: 0 }, dur: 300 }, { id: "ray2", to: { o: 0 }, dur: 300 },
            { id: "plate", to: { o: 0 }, dur: 500 }, { id: "puddle", to: { o: 0 }, dur: 500 },
            { id: "fr", to: { o: 1 }, dur: 500 }, { id: "frDoor", to: { o: 1 }, dur: 500 }, { id: "cup", to: { o: 1 }, at: 300, dur: 500 },
            { id: "frDoor", to: { sx: 0.12 }, at: 900, dur: 600 },
            { id: "cup", path: "M56 74Q90 34 124 60", at: 1600, dur: 1200 },
            { id: "frDoor", to: { sx: 1 }, at: 3000, dur: 500 },
            { id: "fr", to: { x: "+0.6" }, at: 3600, dur: 1600, yoyo: true, times: 8 }, { id: "frDoor", to: { x: "+0.6" }, at: 3600, dur: 1600, yoyo: true, times: 8 },
            { id: "cup.water", to: { o: 0 }, at: 4200, dur: 300 }, { id: "cup.ice", to: { o: 1 }, at: 4200, dur: 300 },
            { id: "frDoor", to: { sx: 0.12 }, at: 5400, dur: 600 },
            { id: "cup", path: "M124 60Q90 34 56 74", at: 6200, dur: 1200 },
            { emit: "spark", where: [56, 64], spread: [12, 10], n: 6, at: 7400, dur: 900 }
          ] },
          { caption: "از چای داغ بخار بلند می‌شود. بخار هم آب است!", key: 4600, hold: 7000, do: [
            { id: "fr", to: { o: 0 }, dur: 500 }, { id: "frDoor", to: { o: 0 }, dur: 500 }, { id: "cup", to: { o: 0 }, dur: 500 },
            { id: "tea", to: { o: 1 }, at: 300, dur: 500 },
            { id: "w1", to: { o: 1 }, at: 900, dur: 1 }, { id: "w1", to: { y: "-12", o: 0 }, at: 900, dur: 6000, times: 4, ease: "out" },
            { id: "w2", to: { o: 1 }, at: 1300, dur: 1 }, { id: "w2", to: { y: "-12", o: 0 }, at: 1300, dur: 6000, times: 4, ease: "out" },
            { id: "w3", to: { o: 1 }, at: 1700, dur: 1 }, { id: "w3", to: { y: "-12", o: 0 }, at: 1700, dur: 6000, times: 4, ease: "out" },
            { id: "lid", to: { o: 1 }, at: 2600, dur: 500 }, { id: "hand2", to: { o: 1 }, at: 2600, dur: 500 },
            { emit: "drop", where: [80, 39], spread: [16, 1], rise: 3, n: 12, keep: true, at: 3800, dur: 2400, life: 900 }
          ] },
          { caption: "بخار بالا می‌رود.", key: 1600, do: [
            { id: "lid", to: { o: 0 }, dur: 400 }, { id: "hand2", to: { o: 0 }, dur: 400 },
            { id: "w1", to: { y: 58, o: 1 }, dur: 1 }, { id: "w1", to: { y: 14, o: 0 }, at: 1, dur: 3000, ease: "out" },
            { id: "w2", to: { y: 56, o: 1 }, at: 400, dur: 1 }, { id: "w2", to: { y: 10, o: 0 }, at: 401, dur: 3000, ease: "out" },
            { id: "w3", to: { y: 58, o: 1 }, at: 800, dur: 1 }, { id: "w3", to: { y: 16, o: 0 }, at: 801, dur: 3000, ease: "out" }
          ] }
        ],
        question: "یخ در آفتاب چه می‌شود؟", pic: true,
        options: [{ label: "🧊🧊", value: "بیشتر می‌شود" }, { label: "💧", value: "آب می‌شود" }, { label: "⛄", value: "آدم‌برفی می‌شود" }], answer: "آب می‌شود" },
      { type: "order", prompt: "یخ در آفتاب: به ترتیب بچین", say: "یخ را در آفتاب گذاشتیم. اول چه بود، بعد چه شد؟", numbered: true,
        items: [{ pic: "🧊", say: "یخ" }, { pic: "🧊💧", say: "یخ دارد آب می‌شود" }, { pic: "💧", say: "آب" }] },
      { type: "sort", prompt: "سرد یا گرم؟", say: "کدام سرد است و کدام گرم؟",
        baskets: [{ label: "سرد", pic: "❄️", value: "cold" }, { label: "گرم", pic: "☀️", value: "hot" }],
        items: [
          { pic: "🧊", say: "یخ", basket: "cold" },
          { pic: "⛄", say: "آدم‌برفی", basket: "cold" },
          { pic: "🍦", say: "بستنی", basket: "cold" },
          { pic: "☕", say: "چای داغ", basket: "hot" },
          { pic: "🍲", say: "آش داغ", basket: "hot" },
          { pic: "🍞", say: "نان تازه و داغ", basket: "hot" }
        ] },
      { type: "home", pic: "🧊 ☀️", text: "حدس بزن: یخ در آفتاب زودتر آب می‌شود یا در سایه؟",
        need: ["دو تکه یخ هم‌اندازه", "دو بشقاب"],
        steps: [
          "یک بشقاب را در آفتاب و یکی را در سایه بگذارید و در هر کدام یک تکه یخ.",
          "پیش از شروع، از کودک بپرسید کدام زودتر آب می‌شود.",
          "هر چند دقیقه با هم سر بزنید و نگاه کنید.",
          "آب بشقاب را در فریزر بگذارید و فردا ببینید چه شده."
        ],
        ask: "چرا یخی که در آفتاب بود زودتر آب شد؟" }
    ]
  },
  {
    id: "science-sprout-3", subject: "science", level: "sprout", emoji: "🛶", title: "روی آب یا زیر آب؟",
    steps: [
      { type: "test", kind: "float", prompt: "اول حدس بزن، بعد امتحان کن!",
        items: [
          { pic: "🍎", say: "سیب", yes: true },
          { pic: "🔑", say: "کلید", yes: false },
          { pic: "🍂", say: "برگ", yes: true },
          { pic: "🥄", say: "قاشق", yes: false },
          { pic: "🧽", say: "اسفنج", yes: true },
          { pic: "🥚", say: "تخم‌مرغ", yes: false }
        ] },
      { type: "sort", prompt: "کدام روی آب می‌ماند؟", say: "حالا تو بگو: کدام روی آب می‌ماند و کدام فرو می‌رود؟",
        baskets: [{ label: "روی آب می‌ماند", pic: "🛶", value: "up" }, { label: "فرو می‌رود", pic: "⚓", value: "down" }],
        items: [
          { pic: "⚽", say: "توپ", basket: "up" },
          { pic: "✏️", say: "مداد چوبی", basket: "up" },
          { pic: "🍊", say: "پرتقال", basket: "up" },
          { pic: "🔩", say: "پیچ آهنی", basket: "down" },
          { pic: "🧱", say: "آجر", basket: "down" }
        ] },
      { type: "home", pic: "🥣 🍎", text: "در خانه هم امتحان کن: چه چیزهایی روی آب می‌مانند؟",
        need: ["یک تشت یا کاسه بزرگ آب", "چیزهایی که خیس شدنشان اشکالی ندارد: قاشق، در بطری، سیب، مداد، اسفنج، سنگ", "یک تکه فویل آلومینیومی"],
        steps: [
          "پیش از انداختن هر چیز، کودک حدس بزند: «روی آب می‌ماند یا فرو می‌رود؟»",
          "آن را آرام روی آب بگذارید و با هم نگاه کنید.",
          "چیزها را دو دسته کنید: روی آب ماند، فرو رفت.",
          "یک تکه فویل را گلوله کنید و در آب بیندازید. با یک تکه دیگر قایق کوچکی بسازید. این بار چه می‌شود؟",
          "کودک را حتی یک لحظه کنار تشت آب تنها نگذارید."
        ],
        ask: "چرا قایق روی آب ماند ولی گلوله فرو رفت؟" }
    ]
  },
  {
    id: "science-sprout-4", subject: "science", level: "sprout", emoji: "🌙", title: "روز و شب",
    steps: [
      { type: "scene", prompt: "خورشید در آسمان کجا می‌رود؟", bg: "#cdeaf7",
        /* One day over one house: the sun comes up from behind the mountain, is high at noon, goes down on the other
           side in the evening; then night, the moon, the stars and a lit window. Last, a change of view: the Earth
           from far away, lit on the sun's side, where children are up, and dark on our side. Drawings:
           js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, dusk: { art: "sci-dusk", o: 0.7 }, night: { art: "sci-night", o: 0 }, stars: { art: "sci-stars", o: 0 },
          sun: { art: "sci-sun", at: [128, 56] }, moon: { art: "sci-moon", at: [40, 40], s: 1.3, o: 0 },
          mountains: { art: "sci-mountains" }, ground: { art: "sci-ground" }, dim: { art: "sci-night", o: 0 }, house: { art: "sci-house", at: [58, 82], s: 1.4 },
          globe: { art: "sci-globe", at: [104, 46], s: 1.25, o: 0 }, globeNight: { art: "sci-globe-night", at: [104, 46], s: 1.25, o: 0 },
          ring: { art: "sci-ring", at: [-30, 0], s: 1.2, o: 0, under: "globe" }
        },
        scenes: [
          { caption: "صبح خورشید از پشت کوه بالا می‌آید.", do: [
            { id: "sun", path: "M128 56L126 16", at: 300, dur: 2600, ease: "out" },
            { id: "dusk", to: { o: 0 }, at: 900, dur: 2200 }, { id: "sun.rays", to: { r: 90 }, dur: 3000 }
          ] },
          { caption: "ظهر خورشید بالای آسمان است.", do: [
            { id: "sun", path: "M126 16Q104 4 80 10", dur: 2000 }, { id: "sun.rays", to: { r: 180 }, dur: 2800 },
            { id: "sun", to: { s: 1.15 }, at: 2000, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "عصر خورشید پایین می‌رود.", do: [
            { id: "sun", path: "M80 10Q40 10 24 56", dur: 2600, ease: "in" }, { id: "sun.rays", to: { r: 270 }, dur: 2600 },
            { id: "dusk", to: { o: 0.65 }, at: 800, dur: 1800 }
          ] },
          { caption: "شب شد. ماه و ستاره‌ها پیدا شدند.", key: 3800, do: [
            { id: "sun", path: "M24 56L20 80", dur: 900, ease: "in" },
            { id: "night", to: { o: 0.95 }, at: 500, dur: 1300 }, { id: "dim", to: { o: 0.5 }, at: 500, dur: 1300 }, { id: "dusk", to: { o: 0 }, at: 1600, dur: 400 },
            { id: "house.light", to: { o: 1 }, at: 1200, dur: 400 },
            { id: "moon", to: { o: 1 }, at: 1400, dur: 600 }, { id: "moon", path: "M40 40Q50 24 64 18", at: 1400, dur: 2400 },
            { id: "stars", to: { o: 1 }, at: 1800, dur: 900 },
            { id: "stars.s0", to: { o: 0.3 }, at: 2600, dur: 1200, yoyo: true, times: 4 },
            { id: "stars.s1", to: { o: 0.3 }, at: 3000, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "حالا آن طرف زمین روز است و بچه‌ها بیدارند!", key: 5200, hold: 7600, do: [
            { id: "mountains", to: { o: 0 }, dur: 900 }, { id: "dim", to: { o: 0 }, dur: 900 }, { id: "ground", to: { o: 0 }, dur: 900 }, { id: "house", to: { o: 0 }, dur: 900 }, { id: "moon", to: { o: 0 }, dur: 900 },
            { id: "sun", to: { x: 26, y: 46, s: 1.8 }, at: 900, dur: 1 }, { id: "sun", to: { o: 0 }, at: 900, dur: 1 },
            { id: "sun", to: { o: 1 }, at: 1100, dur: 700 },
            { id: "globe", to: { o: 1 }, at: 1100, dur: 900 }, { id: "globeNight", to: { o: 1 }, at: 1300, dur: 900 },
            { id: "globe", to: { r: 18 }, at: 2000, dur: 5000, ease: "linear" },
            { id: "ring", to: { o: 1 }, at: 3600, dur: 300 }, { id: "ring", to: { s: 1.4 }, at: 3900, dur: 700, yoyo: true, times: 4 }
          ] }
        ],
        question: "شب در آسمان چه می‌بینیم؟", pic: true,
        options: [{ label: "☀️🌈", value: "خورشید و رنگین‌کمان" }, { label: "🌙⭐", value: "ماه و ستاره" }], answer: "ماه و ستاره" },
      { type: "order", prompt: "یک روز، از صبح تا شب", say: "یک روز را از صبح تا شب به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌅", say: "صبح" }, { pic: "☀️", say: "ظهر" }, { pic: "🌇", say: "عصر" }, { pic: "🌙", say: "شب" }] },
      { type: "sort", prompt: "روز یا شب؟", say: "این‌ها مال روزند یا مال شب؟",
        baskets: [{ label: "روز", pic: "☀️", value: "day" }, { label: "شب", pic: "🌙", value: "night" }],
        items: [
          { pic: "🐓", say: "خروس می‌خواند", basket: "day" },
          { pic: "🏫", say: "مدرسه رفتن", basket: "day" },
          { pic: "🌻", say: "آفتابگردان رو به خورشید", basket: "day" },
          { pic: "🦉", say: "جغد بیدار است", basket: "night" },
          { pic: "⭐", say: "ستاره‌ها", basket: "night" },
          { pic: "🛌", say: "خوابیدن", basket: "night" }
        ] },
      { type: "home", pic: "🌙 📝", text: "هر شب ماه را پیدا کن و شکلش را بکش.",
        need: ["کاغذ و مداد"],
        steps: [
          "صبح و عصر از یک پنجره به آسمان نگاه کنید: خورشید کجاست؟ هرگز مستقیم به خورشید نگاه نکنید.",
          "یک جدول هفت خانه‌ای روی کاغذ بکشید.",
          "چند شب پشت سر هم، پیش از خواب، با هم ماه را در آسمان پیدا کنید.",
          "کودک هر شب شکل ماه را در یک خانه جدول بکشد. اگر ماه پیدا نبود یا هوا ابری بود، خانه را خالی بگذارید."
        ],
        ask: "شکل ماه عوض شد؟ چطور؟" }
    ]
  },
  {
    id: "science-sprout-5", subject: "science", level: "sprout", emoji: "🍂", title: "چهار فصل",
    steps: [
      { type: "scene", prompt: "درخت در هر فصل چه شکلی است؟", bg: "#cdeaf7",
        /* The same tree all year: in spring its leaves and blossoms open and the Nowruz sabzeh is on the table; in
           summer the sun is hot and green fruit turns red; in autumn the leaves turn yellow and fall; in winter it
           snows and the snow settles on the ground and the branches. Drawings: js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, grey: { art: "sci-grey-sky", o: 0 }, sun: { art: "sci-sun", at: [136, 16], o: 0 },
          ground: { art: "sci-ground" }, snowGround: { art: "sci-snow-ground", o: 0 },
          tree: { art: "sci-tree-bare", at: [70, 86] }, treeSnow: { art: "sci-tree-snow", at: [70, 86], o: 0 },
          crown: { art: "sci-crown", at: [70, 36], s: 0.6, o: 0 }, autumn: { art: "sci-crown-autumn", at: [70, 36], o: 0 },
          blossoms: { art: "sci-blossoms", at: [70, 36] },
          green: { art: "sci-fruits-green", at: [70, 36], s: 0.4, o: 0 }, red: { art: "sci-fruits-red", at: [70, 36], o: 0 },
          l1: { art: "sci-leaf-fall", at: [58, 34], s: 1.4, o: 0 }, l2: { art: "sci-leaf-fall-y", at: [78, 30], s: 1.4, o: 0 }, l3: { art: "sci-leaf-fall", at: [86, 44], s: 1.4, o: 0 },
          l4: { art: "sci-leaf-fall-y", at: [64, 46], s: 1.4, o: 0 }, l5: { art: "sci-leaf-fall", at: [72, 24], s: 1.4, o: 0 },
          sabzeh: { art: "sci-sabzeh", at: [122, 84], s: 1.6, o: 0 },
          snow: { art: "sci-snowfall", o: 0 }
        },
        scenes: [
          { caption: "بهار است. درخت شکوفه می‌دهد. نوروز اول بهار است.", key: 5400, hold: 6600, do: [
            { id: "crown", to: { o: 1, s: 1 }, at: 200, dur: 1800, ease: "out" },
            { id: "blossoms.b0", to: { o: 1 }, at: 1800, dur: 300 }, { id: "blossoms.b1", to: { o: 1 }, at: 2000, dur: 300 }, { id: "blossoms.b2", to: { o: 1 }, at: 2200, dur: 300 },
            { id: "blossoms.b3", to: { o: 1 }, at: 2400, dur: 300 }, { id: "blossoms.b4", to: { o: 1 }, at: 2600, dur: 300 }, { id: "blossoms.b5", to: { o: 1 }, at: 2800, dur: 300 },
            { id: "blossoms.b6", to: { o: 1 }, at: 3000, dur: 300 }, { id: "blossoms.b7", to: { o: 1 }, at: 3200, dur: 300 }, { id: "blossoms.b8", to: { o: 1 }, at: 3400, dur: 300 },
            { id: "blossoms.b9", to: { o: 1 }, at: 3600, dur: 300 }, { id: "blossoms.b10", to: { o: 1 }, at: 3800, dur: 300 }, { id: "blossoms.b11", to: { o: 1 }, at: 4000, dur: 300 },
            { id: "sabzeh", to: { o: 1 }, at: 4300, dur: 600 }, { id: "sabzeh", to: { s: 1.8 }, at: 4900, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "تابستان است. هوا گرم است و میوه‌ها می‌رسند.", key: 5000, hold: 5600, do: [
            { id: "sabzeh", to: { o: 0 }, dur: 500 }, { id: "blossoms", to: { o: 0 }, dur: 900 },
            { id: "sun", to: { o: 1 }, dur: 700 }, { id: "sun.rays", to: { r: 180 }, dur: 5400 }, { id: "sun", to: { s: 1.2 }, at: 700, dur: 1600, yoyo: true, times: 2 },
            { id: "green", to: { o: 1, s: 1 }, at: 700, dur: 1600 },
            { id: "red", to: { o: 1 }, at: 2600, dur: 2200 }
          ] },
          { caption: "پاییز است. برگ‌ها زرد می‌شوند و می‌ریزند.", key: 3400, hold: 6600, do: [
            { id: "sun", to: { o: 0 }, dur: 800 }, { id: "green", to: { o: 0 }, dur: 600 }, { id: "red", to: { o: 0 }, dur: 600 },
            { id: "autumn", to: { o: 1 }, at: 300, dur: 1600 },
            { id: "l1", to: { o: 1 }, at: 1900, dur: 100 }, { id: "l1", path: "M58 34Q48 46 56 58T50 84", at: 1900, dur: 2600, ease: "linear" }, { id: "l1", to: { r: 300 }, at: 1900, dur: 2600 },
            { id: "l2", to: { o: 1 }, at: 2300, dur: 100 }, { id: "l2", path: "M78 30Q92 44 84 58T92 85", at: 2300, dur: 2800, ease: "linear" }, { id: "l2", to: { r: -280 }, at: 2300, dur: 2800 },
            { id: "l3", to: { o: 1 }, at: 2800, dur: 100 }, { id: "l3", path: "M86 44Q100 56 96 70T104 84", at: 2800, dur: 2400, ease: "linear" }, { id: "l3", to: { r: 260 }, at: 2800, dur: 2400 },
            { id: "l4", to: { o: 1 }, at: 3200, dur: 100 }, { id: "l4", path: "M64 46Q54 58 62 70T40 85", at: 3200, dur: 2400, ease: "linear" }, { id: "l4", to: { r: -300 }, at: 3200, dur: 2400 },
            { id: "l5", to: { o: 1 }, at: 3600, dur: 100 }, { id: "l5", path: "M72 24Q60 40 74 56T68 84", at: 3600, dur: 2800, ease: "linear" }, { id: "l5", to: { r: 320 }, at: 3600, dur: 2800 },
            { id: "crown", to: { o: 0 }, at: 1900, dur: 300 }, { id: "autumn", to: { o: 0.3 }, at: 2400, dur: 4000 }
          ] },
          { caption: "زمستان است. هوا سرد است و برف می‌بارد.", key: 5000, hold: 6400, do: [
            { id: "autumn", to: { o: 0 }, dur: 900 },
            { id: "grey", to: { o: 1 }, dur: 1200 },
            { id: "snow", to: { o: 1 }, at: 600, dur: 800 }, { id: "snow", to: { y: "+20" }, at: 600, dur: 6400, times: 4, ease: "linear" },
            { id: "snowGround", to: { o: 1 }, at: 1600, dur: 3000 }, { id: "treeSnow", to: { o: 1 }, at: 2400, dur: 2400 },
            { id: "l1", to: { o: 0 }, at: 2800, dur: 1500 }, { id: "l2", to: { o: 0 }, at: 2800, dur: 1500 }, { id: "l3", to: { o: 0 }, at: 2800, dur: 1500 },
            { id: "l4", to: { o: 0 }, at: 2800, dur: 1500 }, { id: "l5", to: { o: 0 }, at: 2800, dur: 1500 }
          ] }
        ],
        question: "برگ‌ها در کدام فصل می‌ریزند؟", pic: true,
        options: [{ label: "🌸", value: "بهار" }, { label: "🍂", value: "پاییز" }, { label: "☀️", value: "تابستان" }], answer: "پاییز" },
      { type: "order", prompt: "فصل‌ها را از بهار بچین", say: "فصل‌ها را از بهار به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌸", label: "بهار" }, { pic: "☀️", label: "تابستان" }, { pic: "🍂", label: "پاییز" }, { pic: "⛄", label: "زمستان" }] },
      { type: "pattern", prompt: "بعد از زمستان کدام فصل می‌آید؟", say: "بعد از زمستان، دوباره کدام فصل می‌آید؟",
        seq: ["🌸", "☀️", "🍂", "⛄", "🌸", "☀️"], blanks: [4], options: ["🍂", "🌸", "☀️"] },
      { type: "scene", prompt: "ایران بزرگ است", bg: "#f6efdc",
        /* One winter day on the map of Iran (js/maps/iran.js): snow falls over Tabriz and the ground goes white, rain
           falls over Rasht, the sun shines over Bandar Abbas; at the end we see all three at once. Drawings:
           js/art/rig-science.js. */
        parts: {
          map: { art: "sci-iran" }, patch: { art: "sci-snowpatch", at: [49.3, 17.4], s: 0.6, o: 0 },
          tz: { art: "sci-dot", at: [49.3, 16.4] }, rs: { art: "sci-dot", at: [62.1, 20.8] }, ba: { art: "sci-dot", at: [89.1, 69.7] },
          c1: { art: "sci-cloud-grey", at: [49.3, 8.6], s: 0.45, o: 0 },
          f1: { art: "sci-flakes", at: [49.3, 11.2], s: 0.9, o: 0 }, f2: { art: "sci-flakes", at: [49.3, 11.2], s: 0.9, r: 180, o: 0 },
          c2: { art: "sci-cloud-grey", at: [62.1, 12.6], s: 0.45, o: 0 },
          r1: { art: "sci-streaks", at: [62.1, 15.2], s: 0.9, o: 0 }, r2: { art: "sci-streaks", at: [63, 15.2], s: 0.9, o: 0 },
          sun: { art: "sci-sun", at: [89.1, 62], s: 0.45, o: 0 }
        },
        scenes: [
          { caption: "زمستان است. در تبریز برف می‌بارد.", key: 2600, hold: 5600, do: [
            { cam: { x: 56, y: 22, zoom: 2.4 }, dur: 1000 },
            { id: "c1", to: { o: 1 }, at: 900, dur: 400 },
            { id: "f1", to: { o: 1 }, at: 1300, dur: 1 }, { id: "f1", to: { y: "+5", o: 0 }, at: 1300, dur: 4800, times: 6, ease: "linear" },
            { id: "f2", to: { o: 1 }, at: 1700, dur: 1 }, { id: "f2", to: { y: "+5", o: 0 }, at: 1700, dur: 4800, times: 6, ease: "linear" },
            { id: "patch", to: { o: 1 }, at: 2200, dur: 3000 }
          ] },
          { caption: "همان روز، در رشت باران می‌بارد.", key: 2600, hold: 5000, do: [
            { id: "f1", to: { y: 11.2, o: 1 }, dur: 1 }, { id: "f1", to: { y: "+5", o: 0 }, at: 1, dur: 4800, times: 6, ease: "linear" },
            { id: "f2", to: { y: 11.2, o: 1 }, at: 400, dur: 1 }, { id: "f2", to: { y: "+5", o: 0 }, at: 401, dur: 4800, times: 6, ease: "linear" },
            { id: "c2", to: { o: 1 }, at: 300, dur: 400 },
            { id: "r1", to: { o: 1 }, at: 800, dur: 1 }, { id: "r1", to: { y: "+5", o: 0 }, at: 800, dur: 4200, times: 7, ease: "linear" },
            { id: "r2", to: { o: 1 }, at: 1100, dur: 1 }, { id: "r2", to: { y: "+5", o: 0 }, at: 1100, dur: 4200, times: 7, ease: "linear" },
            { id: "rs", to: { s: 1.6 }, at: 1600, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "و در بندرعباس هوا گرم و آفتابی است!", key: 5600, hold: 7400, do: [
            { cam: { x: 89, y: 60, zoom: 2.4 }, dur: 1200 },
            { id: "sun", to: { o: 1 }, at: 1000, dur: 500 }, { id: "sun.rays", to: { r: 270 }, at: 1000, dur: 6400 },
            { id: "sun", to: { s: 0.6 }, at: 1500, dur: 1400, yoyo: true, times: 2 },
            { cam: { x: 80, y: 45, zoom: 1 }, at: 3400, dur: 1400 },
            { id: "f1", to: { y: 11.2, o: 1 }, at: 3400, dur: 1 }, { id: "f1", to: { y: "+5", o: 0 }, at: 3401, dur: 4000, times: 5, ease: "linear" },
            { id: "f2", to: { y: 11.2, o: 1 }, at: 3800, dur: 1 }, { id: "f2", to: { y: "+5", o: 0 }, at: 3801, dur: 4000, times: 5, ease: "linear" },
            { id: "r1", to: { y: 15.2, o: 1 }, at: 3400, dur: 1 }, { id: "r1", to: { y: "+5", o: 0 }, at: 3401, dur: 4000, times: 7, ease: "linear" },
            { id: "r2", to: { y: 15.2, o: 1 }, at: 3700, dur: 1 }, { id: "r2", to: { y: "+5", o: 0 }, at: 3701, dur: 4000, times: 7, ease: "linear" }
          ] }
        ],
        question: "زمستان در بندرعباس هوا چطور است؟", pic: true,
        options: [{ label: "⛄", value: "برفی" }, { label: "☀️", value: "گرم و آفتابی" }], answer: "گرم و آفتابی" },
      { type: "home", pic: "🏡 🌳", text: "امروز هوا چطور است؟ بیا هوا را نقاشی کنیم.",
        need: ["کاغذ و مداد رنگی"],
        steps: [
          "هر روز صبح با هم از پنجره یا در حیاط به هوا نگاه کنید: آفتابی، ابری، بارانی یا برفی؟",
          "کودک برای هر روز یک نشانه کوچک بکشد: ☀️ ☁️ 🌧️ ❄️",
          "یک درخت نزدیک خانه را انتخاب کنید و هر ماه یک بار نقاشی‌اش کنید.",
          "از پدربزرگ یا مادربزرگ بپرسید زمستان در شهر یا روستای کودکی‌شان چطور بود."
        ],
        ask: "این هفته بیشتر روزها هوا چطور بود؟" }
    ]
  },
  {
    id: "science-sprout-6", subject: "science", level: "sprout", emoji: "🧺", title: "از چه ساخته شده؟",
    steps: [
      { type: "scene", prompt: "هر چیز از یک جنس ساخته شده است", bg: "#f6efdc",
        /* Each material shows what the words say about it: a log from the tree rolls over and becomes the chair;
           the spoon shines and knocks on the table without bending; one hand tosses the light bottle up; the clear
           glass slides in front of a flower and the flower still shows; a hand presses the soft shirt, then the
           child does (wait: rub). Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          tree: { art: "sci-tree", at: [26, 72], s: 0.55 }, log: { art: "sci-log", at: [30, 66], o: 0 }, chair: { art: "sci-chair", at: [108, 72], s: 1.3, o: 0 },
          spoon: { art: "sci-spoon", at: [80, 44], r: -35, s: 2.2, o: 0 },
          bottle: { art: "sci-bottle", at: [80, 72], s: 1.7, o: 0 },
          flower: { art: "🌷", at: [84, 72], s: 1.4, o: 0 }, glass: { art: "sci-glass", at: [20, 72], s: 1.7, o: 0 },
          shirt: { art: "sci-shirt", at: [80, 74], s: 1.8, o: 0 },
          hand: { art: "hand", at: [80, 124], s: 1.2 }
        },
        scenes: [
          { caption: "این صندلی از چوب است. چوب را از درخت به دست می‌آوریم.", key: 3600, hold: 6200, do: [
            { id: "log", to: { o: 1 }, at: 300, dur: 500 },
            { id: "log", path: "M30 66L70 66", at: 900, dur: 1600, ease: "out" }, { id: "log", to: { r: 360 }, at: 900, dur: 1600, ease: "out" },
            { id: "log", path: "M70 66Q90 40 108 56", at: 2700, dur: 1100 }, { id: "log", to: { s: 0.6, o: 0 }, at: 3100, dur: 700 },
            { id: "chair", to: { o: 1 }, at: 3200, dur: 900 },
            { emit: "spark", where: [108, 52], spread: [24, 20], n: 6, at: 3800, dur: 900 }
          ] },
          { caption: "این قاشق از فلز است. فلز سخت و براق است.", key: 1900, hold: 5200, do: [
            { id: "tree", to: { o: 0 }, dur: 500 }, { id: "chair", to: { o: 0 }, dur: 500 },
            { id: "spoon", to: { o: 1 }, at: 300, dur: 500 },
            { id: "spoon.shine", to: { y: 6 }, at: 900, dur: 1800, yoyo: true, times: 2 },
            { emit: "spark", where: [74, 30], spread: [16, 14], n: 7, at: 1000, dur: 1500 },
            { id: "spoon", to: { y: "+1.6" }, at: 3000, dur: 300, yoyo: true, times: 2 },
            { emit: "spark", where: [98, 70], spread: [4, 1], n: 3, at: 3150, dur: 200, life: 600 },
            { id: "spoon", to: { y: "+1.6" }, at: 3600, dur: 300, yoyo: true, times: 2 },
            { emit: "spark", where: [98, 70], spread: [4, 1], n: 3, at: 3750, dur: 200, life: 600 }
          ] },
          { caption: "این بطری از پلاستیک است. پلاستیک سبک است.", key: 2600, hold: 5000, do: [
            { id: "spoon", to: { o: 0 }, dur: 500 },
            { id: "bottle", to: { o: 1 }, at: 300, dur: 500 },
            { id: "hand", path: "M80 124L80 98", at: 600, dur: 700, ease: "out" },
            { id: "hand", path: "M80 98L80 82", at: 1400, dur: 600, ease: "out" }, { id: "bottle", path: "M80 72L80 56", at: 1400, dur: 600, ease: "out" },
            { id: "bottle", to: { y: "-9", r: 20 }, at: 2100, dur: 1000, yoyo: true, times: 2, ease: "soft" }, { id: "hand", to: { y: "-3" }, at: 2100, dur: 1000, yoyo: true, times: 2, ease: "soft" },
            { id: "hand", path: "M80 82L80 98", at: 3300, dur: 700 }, { id: "bottle", path: "M80 56L80 72", at: 3300, dur: 700 },
            { id: "hand", path: "M80 98L80 124", at: 4100, dur: 600 }
          ] },
          { caption: "این لیوان از شیشه است. از پشت شیشه می‌شود آن طرف را دید.", hold: 5200, do: [
            { id: "bottle", to: { o: 0 }, dur: 500 },
            { id: "flower", to: { o: 1 }, at: 300, dur: 500 }, { id: "glass", to: { o: 1 }, at: 300, dur: 500 },
            { id: "glass", path: "M20 72L84 72", at: 900, dur: 2200 },
            { id: "flower", to: { r: 6 }, at: 3300, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "این پیراهن از پارچه است. پارچه نرم است.", key: 2300, do: [
            { id: "flower", to: { o: 0 }, dur: 500 }, { id: "glass", to: { o: 0 }, dur: 500 },
            { id: "shirt", to: { o: 1 }, at: 300, dur: 500 },
            { id: "hand", to: { r: 180, x: 80, y: -30 }, dur: 1 },
            { id: "hand", path: "M80 -30L80 26", at: 600, dur: 900, ease: "out" },
            { id: "hand", to: { y: "+5" }, at: 1600, dur: 2400, yoyo: true, times: 4 },
            { id: "shirt", to: { sy: 0.84 }, at: 1600, dur: 2400, yoyo: true, times: 4 },
            { id: "shirt.folds", to: { o: 1 }, at: 1600, dur: 2400, yoyo: true, times: 4 }
          ],
            wait: { rub: true, n: 6, hint: "تو هم پارچه را فشار بده: روی پیراهن چپ و راست بکش!",
              each: [
                { id: "hand", to: { x: "+5", y: "+4" }, dur: 360, yoyo: true, times: 2 },
                { id: "shirt", to: { sy: 0.86 }, dur: 360, yoyo: true, times: 2 },
                { id: "shirt.folds", to: { o: 1 }, dur: 360, yoyo: true, times: 2 }
              ] } }
        ],
        question: "پنجره از چه ساخته شده است؟",
        options: ["پارچه", "شیشه", "چوب"], answer: "شیشه" },
      { type: "sort", prompt: "چوب، فلز یا پارچه؟", say: "هر چیز را در سبد جنس خودش بگذار: چوب، فلز یا پارچه.",
        baskets: [{ label: "چوب", value: "wood" }, { label: "فلز", value: "metal" }, { label: "پارچه", value: "cloth" }],
        items: [
          { pic: "🪑", label: "صندلی", basket: "wood" },
          { pic: "🥢", label: "چوب غذا", basket: "wood" },
          { pic: "🔑", label: "کلید", basket: "metal" },
          { pic: "🥄", label: "قاشق", basket: "metal" },
          { pic: "🧦", label: "جوراب", basket: "cloth" },
          { pic: "🧣", label: "شال‌گردن", basket: "cloth" }
        ] },
      { type: "sort", prompt: "پلاستیک یا شیشه؟", say: "کدام از پلاستیک است و کدام از شیشه؟",
        baskets: [{ label: "پلاستیک", value: "plastic" }, { label: "شیشه", value: "glass" }],
        items: [
          { pic: "🧴", label: "بطری شامپو", basket: "plastic" },
          { pic: "🥤", label: "لیوان یک‌بار مصرف", basket: "plastic" },
          { pic: "🥛", label: "لیوان شیشه‌ای", basket: "glass" },
          { pic: "👓", label: "شیشه عینک", basket: "glass" }
        ] },
      { type: "test", kind: "float", prompt: "چوب، فلز یا پلاستیک: کدام روی آب می‌ماند؟ اول حدس بزن!",
        items: [
          { pic: "✏️", say: "مداد چوبی", yes: true },
          { pic: "🥄", say: "قاشق فلزی", yes: false },
          { pic: "🧴", say: "بطری پلاستیکی خالی", yes: true },
          { pic: "🔑", say: "کلید فلزی", yes: false },
          { pic: "🥢", say: "چوب غذا", yes: true }
        ] },
      { type: "home", pic: "🧺 🔍", text: "در خانه بگرد: چه چیزهایی از چوب، فلز، پلاستیک، شیشه یا پارچه است؟",
        need: ["یک سبد", "چیزهای خانه از جنس‌های مختلف"],
        steps: [
          "با کودک در خانه بگردید و از هر جنس یک چیز پیدا کنید. چیزهای شیشه‌ای را خودتان بردارید و به کودک ندهید.",
          "چیزها را روی زمین بچینید و با هم دسته کنید: چوب، فلز، پلاستیک، شیشه، پارچه.",
          "کودک به هر چیز دست بزند و بگوید: «سرد است یا گرم؟ سخت است یا نرم؟ سبک است یا سنگین؟»",
          "آرام با انگشت به هر چیز بزنید: صدای چوب، فلز و پلاستیک چه فرقی دارد؟"
        ],
        ask: "در آشپزخانه ما چه چیزهایی از فلز است؟" }
    ]
  },

  // ---------------- Science: Sapling (why does it happen?) ----------------
  {
    id: "science-sapling-1", subject: "science", level: "sapling", emoji: "🌧️", title: "چرخه آب",
    steps: [
      { type: "scene", prompt: "آب باران از کجا می‌آید؟", bg: "#cdeaf7",
        /* The whole cycle in one landscape: sunlight warms the sea, faint vapour rises (we draw it dotted, because
           it cannot really be seen), tiny drops gather into a cloud, the wind blows it to the mountain, it rains on
           the slopes and snows on the top, the water runs down the river to the sea, and arrows show it going
           round. Drawings: js/art/rig-science.js. */
        parts: {
          land: { art: "sci-wc-land" }, river: { art: "sci-river", o: 0 },
          sun: { art: "sci-sun", at: [140, 14] },
          ray1: { art: "sci-ray", at: [137.6, 22.7], r: 105.4, sx: 1.28, o: 0 }, ray2: { art: "sci-ray", at: [140.9, 23], r: 84.3, sx: 1.28, o: 0 },
          v1: { art: "sci-vapour", at: [106, 72], o: 0 }, v2: { art: "sci-vapour", at: [118, 74], o: 0 }, v3: { art: "sci-vapour", at: [130, 72], o: 0 }, v4: { art: "sci-vapour", at: [146, 74], o: 0 },
          drops: { art: "sci-droplets", at: [112, 26], s: 1.8, o: 0 },
          wind: { art: "sci-wind", at: [124, 26], o: 0 },
          cloud: { art: "sci-cloud", at: [112, 24], s: 0 }, grey: { art: "sci-cloud-grey", at: [44, 16], s: 1.5, o: 0 },
          f1: { art: "sci-flakes", at: [33, 24], s: 1.8, o: 0 }, f2: { art: "sci-flakes", at: [36, 25], s: 1.8, r: 180, o: 0 },
          q1: { art: "sci-streaks", at: [52, 26], s: 1.8, o: 0 }, q2: { art: "sci-streaks", at: [58, 27], s: 1.8, o: 0 },
          r1: { art: "sci-drop", at: [40, 46], s: 0.8, o: 0 }, r2: { art: "sci-drop", at: [40, 46], s: 0.8, o: 0 }, r3: { art: "sci-drop", at: [40, 46], s: 0.8, o: 0 },
          cycle: { art: "sci-cycle", o: 0 }
        },
        scenes: [
          { caption: "خورشید آب دریا را گرم می‌کند.", do: [
            { id: "sun.rays", to: { r: 120 }, dur: 3600 },
            { id: "ray1", to: { o: 1 }, at: 300, dur: 100 }, { id: "ray1", draw: true, at: 300, dur: 1200 },
            { id: "ray2", to: { o: 1 }, at: 500, dur: 100 }, { id: "ray2", draw: true, at: 500, dur: 1200 },
            { emit: "spark", where: [128, 78], spread: [56, 8], n: 10, at: 1400, dur: 2000 }
          ] },
          { caption: "آب بخار می‌شود و بالا می‌رود. بخار را نمی‌بینیم.", key: 2000, hold: 5600, do: [
            { id: "ray1", to: { o: 0 }, dur: 400 }, { id: "ray2", to: { o: 0 }, dur: 400 },
            { id: "v1", to: { o: 0.9 }, at: 300, dur: 1 }, { id: "v1", to: { y: "-30", o: 0 }, at: 300, dur: 5000, times: 2 },
            { id: "v2", to: { o: 0.9 }, at: 900, dur: 1 }, { id: "v2", to: { y: "-30", o: 0 }, at: 900, dur: 4800, times: 2 },
            { id: "v3", to: { o: 0.9 }, at: 600, dur: 1 }, { id: "v3", to: { y: "-30", o: 0 }, at: 600, dur: 5000, times: 2 },
            { id: "v4", to: { o: 0.9 }, at: 1200, dur: 1 }, { id: "v4", to: { y: "-30", o: 0 }, at: 1200, dur: 4400, times: 2 }
          ] },
          { caption: "بالای آسمان هوا سرد است. بخار قطره‌های خیلی ریز می‌شود و ابر درست می‌شود.", key: 5600, hold: 7600, do: [
            { id: "v1", to: { y: 72, o: 0.9 }, dur: 1 }, { id: "v1", path: "M106 72Q104 50 108 30", at: 1, dur: 2400 }, { id: "v1", to: { o: 0 }, at: 1800, dur: 600 },
            { id: "v2", to: { y: 74, o: 0.9 }, at: 300, dur: 1 }, { id: "v2", path: "M118 74Q120 50 114 32", at: 301, dur: 2400 }, { id: "v2", to: { o: 0 }, at: 2100, dur: 600 },
            { id: "v3", to: { y: 72, o: 0.9 }, at: 600, dur: 1 }, { id: "v3", path: "M130 72Q128 50 118 30", at: 601, dur: 2400 }, { id: "v3", to: { o: 0 }, at: 2400, dur: 600 },
            { id: "drops", to: { o: 1 }, at: 2000, dur: 1000 }, { id: "drops", to: { s: 1 }, at: 2400, dur: 2400 },
            { id: "cloud", to: { s: 0.7 }, at: 4400, dur: 2000 }, { id: "drops", to: { o: 0 }, at: 5200, dur: 1200 }
          ] },
          { caption: "ابر درست شد!", do: [
            { id: "cloud", to: { s: 1.5 }, dur: 1000, ease: "back" }, { id: "drops", to: { o: 0 }, dur: 300 }
          ] },
          { caption: "باد ابر را به طرف کوه می‌برد.", key: 2200, do: [
            { id: "wind", to: { o: 1 }, dur: 100 }, { id: "wind", draw: true, dur: 900 },
            { id: "cloud", path: "M112 24Q80 14 44 16", at: 600, dur: 2800 }, { id: "wind", path: "M124 26Q96 18 58 20", at: 600, dur: 2800 },
            { id: "wind", to: { o: 0 }, at: 3300, dur: 400 }
          ] },
          { caption: "از ابر باران می‌بارد. روی کوه‌های بلند برف می‌بارد.", key: 3900, hold: 6200, do: [
            { id: "grey", to: { o: 1 }, dur: 800 }, { id: "cloud", to: { o: 0 }, at: 300, dur: 600 },
            { emit: "drop", where: [54, 32], spread: [18, 2], rise: 24, n: 26, at: 900, dur: 5000, life: 900 },
            { id: "q1", to: { o: 1 }, at: 900, dur: 1 }, { id: "q1", to: { y: "+12", o: 0 }, at: 900, dur: 5200, times: 8, ease: "linear" },
            { id: "q2", to: { o: 1 }, at: 1200, dur: 1 }, { id: "q2", to: { y: "+12", o: 0 }, at: 1200, dur: 5200, times: 8, ease: "linear" },
            { id: "f1", to: { o: 1 }, at: 900, dur: 1 }, { id: "f1", to: { y: "+6", o: 0 }, at: 900, dur: 5200, times: 6, ease: "linear" },
            { id: "f2", to: { o: 1 }, at: 1350, dur: 1 }, { id: "f2", to: { y: "+6", o: 0 }, at: 1350, dur: 5200, times: 6, ease: "linear" },
            { id: "land.snow", to: { o: 1 }, at: 1800, dur: 2800 }
          ] },
          { caption: "آب باران در رود جمع می‌شود و به دریا برمی‌گردد.", key: 3400, hold: 6000, do: [
            { id: "river", to: { o: 1 }, dur: 100 }, { id: "river", draw: true, dur: 2000 },
            { id: "r1", to: { o: 1 }, at: 1600, dur: 1 }, { id: "r1", path: "M40 46c5 8-3 13 3 19s13 5 21 8 18 3 34 3", at: 1600, dur: 2400, ease: "linear" }, { id: "r1", to: { o: 0 }, at: 3900, dur: 300 },
            { id: "r2", to: { o: 1 }, at: 2400, dur: 1 }, { id: "r2", path: "M40 46c5 8-3 13 3 19s13 5 21 8 18 3 34 3", at: 2400, dur: 2400, ease: "linear" }, { id: "r2", to: { o: 0 }, at: 4700, dur: 300 },
            { id: "r3", to: { o: 1 }, at: 3200, dur: 1 }, { id: "r3", path: "M40 46c5 8-3 13 3 19s13 5 21 8 18 3 34 3", at: 3200, dur: 2400, ease: "linear" }, { id: "r3", to: { o: 0 }, at: 5500, dur: 300 }
          ] },
          { caption: "و این چرخه دوباره شروع می‌شود!", hold: 6000, do: [
            { id: "grey", to: { o: 0 }, dur: 800 },
            { id: "cycle", to: { o: 1 }, dur: 100 }, { id: "cycle", draw: true, oneByOne: true, at: 200, dur: 4000 },
            { id: "sun.rays", to: { r: 240 }, dur: 4000 },
            { id: "v1", to: { y: 72, x: 106, o: 0.9 }, at: 400, dur: 1 }, { id: "v1", to: { y: "-30", o: 0 }, at: 401, dur: 2800 },
            { id: "v3", to: { y: 72, x: 130, o: 0.9 }, at: 900, dur: 1 }, { id: "v3", to: { y: "-30", o: 0 }, at: 901, dur: 2800 }
          ] }
        ],
        question: "ابر از چه درست شده است؟",
        options: ["دود", "قطره‌های ریز آب", "پنبه"], answer: "قطره‌های ریز آب" },
      { type: "order", prompt: "چرخه آب را به ترتیب بچین", numbered: true,
        items: [{ pic: "🌊", label: "دریا" }, { pic: "💨", label: "بخار" }, { pic: "☁️", label: "ابر" }, { pic: "🌧️", label: "باران" }] },
      { type: "choose", prompt: "چرا لباس خیس در آفتاب خشک می‌شود؟", stack: true,
        options: ["آبش یخ می‌زند", "آبش بخار می‌شود و به هوا می‌رود", "آبش در لباس پنهان می‌شود"], answer: "آبش بخار می‌شود و به هوا می‌رود" },
      { type: "choose", show: "🥛", prompt: "روی لیوان دوغ سرد قطره‌های آب نشسته است. این آب از کجا آمده؟", stack: true,
        options: ["دوغ از لیوان بیرون زده", "کسی روی لیوان آب پاشیده", "بخار آب هوا روی لیوان سرد قطره شده"], answer: "بخار آب هوا روی لیوان سرد قطره شده" },
      { type: "home", pic: "🥣 ☀️", text: "یک چرخه آب کوچک بساز!",
        need: ["یک کاسه بزرگ", "یک لیوان کوچک", "سلفون آشپزخانه", "آب ولرم شیر", "یک تکه یخ"],
        steps: [
          "کمی آب ولرم شیر در کاسه بریزید و لیوان خالی را وسط کاسه بگذارید.",
          "روی کاسه را با سلفون محکم بپوشانید.",
          "یک تکه یخ روی سلفون، درست بالای لیوان بگذارید.",
          "کاسه را در آفتاب بگذارید و نیم ساعت بعد نگاه کنید: زیر سلفون قطره جمع شده و شاید چند قطره در لیوان چکیده باشد."
        ],
        ask: "کدام قسمت مثل دریا بود؟ کدام مثل ابر؟ کدام مثل باران؟" }
    ]
  },
  {
    id: "science-sapling-2", subject: "science", level: "sapling", emoji: "🧲", title: "آهنربا",
    steps: [
      { type: "test", kind: "magnet", prompt: "اول حدس بزن، بعد امتحان کن!",
        items: [
          { pic: "📎", say: "گیره کاغذ", yes: true },
          { pic: "✏️", say: "مداد", yes: false },
          { pic: "🔩", say: "پیچ آهنی", yes: true },
          { pic: "🧦", say: "جوراب", yes: false },
          { pic: "🧷", say: "سنجاق قفلی", yes: true },
          { pic: "🍎", say: "سیب", yes: false }
        ] },
      { type: "scene", prompt: "آهنربا از پشت کاغذ هم می‌کشد؟", bg: "#f6efdc",
        /* Seen from the side, so both the clip on the card and the magnet under it are in sight: a hand brings
           the magnet up under the clip, moves it, and the clip follows across the card. Then the child moves the
           magnet (wait: rub). Drawings: js/art/rig-science.js. */
        parts: {
          board: { art: "sci-board" }, clip: { art: "sci-clip", at: [100, 56], s: 1.3 },
          magnet: { art: "sci-magnet", at: [100, 104], s: 1.1 }, pull: { art: "sci-pull", under: "magnet", o: 0 }, hand: { art: "hand", at: [0, 34], s: 0.9, under: "magnet" }
        },
        scenes: [
          { caption: "گیره روی کاغذ است. آهنربا زیر کاغذ است.", do: [
            { id: "clip", to: { s: 1.6 }, at: 200, dur: 800, yoyo: true, times: 2 },
            { id: "magnet", path: "M100 104L100 59", at: 1000, dur: 1600, ease: "out" },
            { id: "pull", to: { o: 1 }, at: 2600, dur: 400 }
          ] },
          { caption: "آهنربا را زیر کاغذ تکان می‌دهیم…", key: 1600, do: [
            { id: "magnet", path: "M100 59L56 59", dur: 2400 },
            { id: "clip", path: "M100 56L56 56", at: 200, dur: 2400 }
          ] },
          { caption: "گیره هم دنبالش می‌رود!", key: 1800, do: [
            { cam: { x: 90, y: 54, zoom: 1.6 }, dur: 800 },
            { id: "magnet", path: "M56 59L124 59", at: 400, dur: 2800 },
            { id: "clip", path: "M56 56L124 56", at: 600, dur: 2800 },
            { cam: { x: 80, y: 45, zoom: 1 }, at: 3400, dur: 800 }
          ] },
          { caption: "آهنربا از پشت کاغذ هم چیزهای آهنی را می‌کشد.", key: 1600, do: [
            { id: "magnet", path: "M124 59L90 59", dur: 1600 }, { id: "clip", path: "M124 56L90 56", at: 150, dur: 1600 },
            { id: "pull", to: { s: 1.3 }, at: 1800, dur: 1000, yoyo: true, times: 2 }
          ],
            wait: { rub: true, n: 6, hint: "حالا تو آهنربا را زیر کاغذ تکان بده: چپ و راست بکش!",
              each: [
                { id: "magnet", to: { x: "+12" }, dur: 600, yoyo: true, times: 2 },
                { id: "clip", to: { x: "+12" }, dur: 640, yoyo: true, times: 2 }
              ] } }
        ],
        question: "آهنربا چه چیزهایی را می‌کشد؟",
        options: ["همه چیزهای سنگین", "چیزهای آهنی", "همه چیزهای براق"], answer: "چیزهای آهنی" },
      { type: "sort", prompt: "آهنربا کدام را می‌کشد؟",
        baskets: [{ label: "می‌کشد", pic: "🧲", value: "yes" }, { label: "نمی‌کشد", pic: "✋", value: "no" }],
        items: [
          { pic: "🔩", label: "پیچ آهنی", basket: "yes" },
          { pic: "🥫", label: "قوطی کنسرو", basket: "yes" },
          { pic: "📎", label: "گیره", basket: "yes" },
          { pic: "🍂", label: "برگ", basket: "no" },
          { pic: "🧸", label: "عروسک", basket: "no" },
          { pic: "🥛", label: "لیوان", basket: "no" }
        ] },
      { type: "home", pic: "🧲 🔍", text: "آهنربای یخچال را بردار و امتحان کن!",
        need: ["یک آهنربای بزرگ یخچال", "چیزهای خانه: گیره کاغذ، در قابلمه، قاشق، سکه، پاک‌کن، در بطری", "یک تکه مقوا یا سینی"],
        steps: [
          "پیش از هر امتحان، کودک حدس بزند: «آهنربا این را می‌کشد؟»",
          "آهنربا را به هر چیز نزدیک کنید و چیزها را دو دسته کنید.",
          "گیره را روی مقوا بگذارید و آهنربا را از زیر مقوا حرکت دهید.",
          "از آهنرباهای کوچک یا گوی‌های آهنربایی استفاده نکنید؛ قورت دادن آن‌ها بسیار خطرناک است. آهنربا را از گوشی و کارت بانکی دور نگه دارید."
        ],
        ask: "آهنربا همه چیزهای فلزی را کشید؟ کدام را نکشید؟" }
    ]
  },
  {
    id: "science-sapling-3", subject: "science", level: "sapling", emoji: "🌳", title: "نور و سایه",
    steps: [
      { type: "shadow",
        tasks: [
          { prompt: "خورشید را جابه‌جا کن تا سایه درخت خیلی کوتاه شود.", want: "short" },
          { prompt: "حالا کاری کن که سایه بلند شود و طرف چپ درخت بیفتد.", want: "left" },
          { prompt: "حالا سایه بلند را طرف راست درخت بینداز.", want: "right" }
        ],
        question: "سایه درخت کی از همه کوتاه‌تر است؟",
        options: ["صبح زود", "ظهر", "عصر"], answer: "ظهر" },
      { type: "choose", prompt: "خورشید سمت راست درخت است. سایه درخت به کدام طرف می‌افتد؟",
        options: ["طرف راست", "طرف چپ", "بالای درخت"], answer: "طرف چپ" },
      { type: "sort", prompt: "نور از کدام رد می‌شود؟",
        baskets: [{ label: "نور رد می‌شود", pic: "💡", value: "yes" }, { label: "نور رد نمی‌شود", pic: "🌑", value: "no" }],
        items: [
          { label: "شیشه پنجره", basket: "yes" },
          { label: "آب زلال", basket: "yes" },
          { label: "نایلون شفاف", basket: "yes" },
          { label: "دیوار", basket: "no" },
          { label: "کتاب", basket: "no" },
          { label: "تخته چوب", basket: "no" }
        ] },
      { type: "home", pic: "☀️ 🧍", text: "سایه‌ات را صبح و ظهر اندازه بگیر!",
        need: ["گچ یا چند سنگ کوچک", "یک چوب یا مداد بلند", "یک گلدان خاک یا کمی خاک در حیاط"],
        steps: [
          "در یک روز آفتابی، چوب را صاف در خاک فرو کنید.",
          "صبح سر سایه چوب را با گچ یا یک سنگ علامت بگذارید.",
          "ظهر و عصر دوباره علامت بگذارید.",
          "کودک بایستد و شما دور سایه‌اش را با گچ بکشید. چند ساعت بعد، دوباره همان‌جا بایستد. سایه چه شد؟",
          "هرگز مستقیم به خورشید نگاه نکنید."
        ],
        ask: "سایه کی از همه کوتاه‌تر بود؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-4", subject: "science", level: "sapling", emoji: "🏔️", title: "طبیعت ایران",
    steps: [
      { type: "scene", prompt: "سفری به طبیعت ایران", bg: "#f6efdc",
        /* A trip over the map of Iran (js/maps/iran.js): the camera flies to each region as it is named, the region
           takes its colour, and its weather and animal move there: rain on the northern forests and a maral walking
           among the trees, snow on the Zagros and a wild goat climbing, the hot sandy desert and a cheetah running,
           dolphins jumping in the warm Persian Gulf. Drawings: js/art/rig-science.js and js/art. */
        parts: {
          map: { art: "sci-iran" },
          t1: { art: "🌲", at: [61, 23], s: 0.3, o: 0 }, t2: { art: "🌲", at: [66.5, 25], s: 0.32, o: 0 }, t3: { art: "🌲", at: [76, 26.4], s: 0.3, o: 0 }, t4: { art: "🌲", at: [82, 25.4], s: 0.28, o: 0 },
          rain1: { art: "sci-streaks", at: [64, 14], s: 0.5, o: 0 }, rain2: { art: "sci-streaks", at: [77, 15], s: 0.5, o: 0 },
          deer: { art: "🦌", at: [80, 28], s: 0.3, o: 0 },
          p1: { art: "🏔️", at: [51, 36], s: 0.34, o: 0 }, p2: { art: "🏔️", at: [57, 42], s: 0.36, o: 0 }, p3: { art: "🏔️", at: [64.5, 47], s: 0.34, o: 0 },
          snow1: { art: "sci-flakes", at: [56, 29], s: 0.6, o: 0 }, snow2: { art: "sci-flakes", at: [63, 34], s: 0.6, r: 180, o: 0 },
          goat: { art: "🐐", at: [62, 44.4], s: 0.24, o: 0 },
          d1: { art: "sci-dunes", at: [84, 40], s: 0.4, o: 0 }, d2: { art: "sci-dunes", at: [93, 47], s: 0.45, o: 0 }, d3: { art: "sci-dunes", at: [99, 53], s: 0.4, o: 0 },
          sun: { art: "sci-sun", at: [100, 36], s: 0.4, o: 0 },
          cheetah: { art: "🐆", at: [76, 46], s: 0.3, o: 0 },
          sun2: { art: "sci-sun", at: [82, 62], s: 0.36, o: 0 },
          dolphin: { art: "🐬", at: [76, 73], s: 0.34, o: 0 }, dolphin2: { art: "🐬", at: [66, 76], s: 0.28, o: 0 }
        },
        scenes: [
          { caption: "ایران سرزمین بزرگی است، با طبیعت‌های گوناگون.", key: 4200, do: [
            { id: "map.north", to: { o: 1 }, at: 1000, dur: 800 }, { id: "map.zagros", to: { o: 1 }, at: 1900, dur: 800 }, { id: "map.desert", to: { o: 1 }, at: 2800, dur: 800 }
          ] },
          { caption: "در شمال، کنار دریای خزر، جنگل‌های سبز و پرباران هست.", key: 3000, hold: 5600, do: [
            { cam: { x: 72, y: 22, zoom: 2.8 }, dur: 1200 },
            { id: "t1", to: { o: 1 }, at: 1000, dur: 400 }, { id: "t2", to: { o: 1 }, at: 1200, dur: 400 }, { id: "t3", to: { o: 1 }, at: 1400, dur: 400 }, { id: "t4", to: { o: 1 }, at: 1600, dur: 400 },
            { id: "rain1", to: { o: 1 }, at: 1800, dur: 1 }, { id: "rain1", to: { y: "+5", o: 0 }, at: 1800, dur: 3800, times: 6, ease: "linear" },
            { id: "rain2", to: { o: 1 }, at: 2100, dur: 1 }, { id: "rain2", to: { y: "+5", o: 0 }, at: 2100, dur: 3800, times: 6, ease: "linear" }
          ] },
          { caption: "مرال در جنگل‌های شمال زندگی می‌کند.", key: 2600, do: [
            { id: "deer", to: { o: 1 }, dur: 400 },
            { id: "deer", path: "M80 28L71 28.6", at: 300, dur: 2600, ease: "linear" }, { id: "deer", to: { r: 5 }, at: 300, dur: 2600, yoyo: true, times: 8 },
            { id: "deer", to: { r: -8 }, at: 3000, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "کوه‌های بلند زاگرس زمستان پر از برف‌اند. بز کوهی روی صخره‌ها راه می‌رود.", key: 4400, hold: 8000, do: [
            { cam: { x: 58, y: 40, zoom: 2.6 }, dur: 1300 },
            { id: "p1", to: { o: 1 }, at: 1000, dur: 400 }, { id: "p2", to: { o: 1 }, at: 1200, dur: 400 }, { id: "p3", to: { o: 1 }, at: 1400, dur: 400 },
            { id: "snow1", to: { o: 1 }, at: 1600, dur: 1 }, { id: "snow1", to: { y: "+5", o: 0 }, at: 1600, dur: 6400, times: 8, ease: "linear" },
            { id: "snow2", to: { o: 1 }, at: 2000, dur: 1 }, { id: "snow2", to: { y: "+5", o: 0 }, at: 2000, dur: 6000, times: 8, ease: "linear" },
            { id: "goat", to: { o: 1 }, at: 3000, dur: 400 },
            { id: "goat", path: "M62 44.4L60 42.2 58.2 42.8 56.4 40.4 54.6 41", at: 3200, dur: 4000, ease: "linear" },
            { id: "goat", to: { r: -6 }, at: 3200, dur: 4000, yoyo: true, times: 10 }
          ] },
          { caption: "وسط ایران کویر است: گرم، خشک و پر از شن. یوزپلنگ ایرانی آنجا زندگی می‌کند.", key: 4800, hold: 7800, do: [
            { cam: { x: 88, y: 45, zoom: 2.5 }, dur: 1300 },
            { id: "d1", to: { o: 1 }, at: 1000, dur: 400 }, { id: "d2", to: { o: 1 }, at: 1200, dur: 400 }, { id: "d3", to: { o: 1 }, at: 1400, dur: 400 },
            { id: "sun", to: { o: 1 }, at: 1500, dur: 500 }, { id: "sun.rays", to: { r: 270 }, at: 1500, dur: 6000 }, { id: "sun", to: { s: 0.5 }, at: 2000, dur: 1600, yoyo: true, times: 2 },
            { id: "cheetah", to: { o: 1 }, at: 3600, dur: 300 },
            { id: "cheetah", path: "M76 46L97 47", at: 3800, dur: 2400 }, { id: "cheetah", to: { r: 8 }, at: 3800, dur: 2400, yoyo: true, times: 10 }
          ] },
          { caption: "در جنوب، خلیج فارس است. آبش گرم است و دلفین‌ها در آن شنا می‌کنند.", key: 3400, hold: 6800, do: [
            { cam: { x: 70, y: 70, zoom: 2.6 }, dur: 1300 },
            { id: "sun2", to: { o: 1 }, at: 900, dur: 500 }, { id: "sun2.rays", to: { r: 200 }, at: 900, dur: 5000 },
            { id: "dolphin", to: { o: 1 }, at: 1200, dur: 300 }, { id: "dolphin", path: "M76 73Q72 64 67 72", at: 1400, dur: 1400 }, { id: "dolphin", to: { r: -30 }, at: 1400, dur: 1400, yoyo: true, times: 2 },
            { id: "dolphin2", to: { o: 1 }, at: 2400, dur: 300 }, { id: "dolphin2", path: "M66 76Q62 68 58 74", at: 2600, dur: 1400 },
            { id: "dolphin", path: "M67 72Q63 64 59 70", at: 3600, dur: 1400 }, { id: "dolphin", to: { r: -30 }, at: 3600, dur: 1400, yoyo: true, times: 2 }
          ] }
        ],
        question: "یوزپلنگ ایرانی کجا زندگی می‌کند؟",
        options: ["کنار دریای خزر", "در کویر", "در خلیج فارس"], answer: "در کویر" },
      { type: "pairs", prompt: "هر حیوان را با جایی که زندگی می‌کند جفت کن",
        pairs: [
          [{ pic: "🏜️", label: "کویر" }, { pic: "🐪", say: "شتر" }],
          [{ pic: "🌲", label: "جنگل" }, { pic: "🦌", say: "مرال" }],
          [{ pic: "🏔️", label: "کوه" }, { pic: "🐐", say: "بز کوهی" }],
          [{ pic: "🌊", label: "دریا" }, { pic: "🐬", say: "دلفین" }]
        ] },
      { type: "choose", prompt: "در کدام شهر باران بیشتری می‌بارد؟",
        options: ["یزد", "رشت", "کرمان"], answer: "رشت" },
      { type: "choose", prompt: "زمستان کدام شهر گرم‌تر است؟",
        options: ["تبریز", "همدان", "بندرعباس"], answer: "بندرعباس" },
      { type: "home", pic: "🗺️ 🏡", text: "شهر یا روستای ما چه طبیعتی دارد؟",
        need: ["کاغذ و مداد رنگی", "اگر دارید، نقشه ایران"],
        steps: [
          "از کودک بپرسید: «دور و بر شهر ما کوه هست؟ دریا؟ جنگل؟ کویر؟»",
          "با هم یک گیاه یا حیوان منطقه خودتان را پیدا کنید و درباره‌اش حرف بزنید.",
          "اگر یکی از اقوام در شهر دیگری زندگی می‌کند، از او بپرسید هوای آنجا چطور است و چه درخت‌هایی دارد.",
          "کودک طبیعت منطقه شما را نقاشی کند: آسمان، زمین، گیاه و حیوان."
        ],
        ask: "اگر یک روز به کویر بروی، چه چیزهایی با خودت می‌بری؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-5", subject: "science", level: "sapling", emoji: "🛒", title: "هل دادن و کشیدن",
    steps: [
      { type: "scene", prompt: "چیزها چطور حرکت می‌کنند؟", bg: "#cdeaf7",
        /* Pushing moves a thing away from you, pulling brings it after you: Omid walks pushing the cart with his
           arm out, then gives it a push and it rolls on alone; Maryam walks ahead holding the rope and the sled
           follows on the snow; the same ball pushed gently stops at the first flag, pushed hard it rolls to a far
           one. People: the walker in js/art/rig.js; other drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, snow: { art: "sci-snow-ground", o: 0 },
          f1: { art: "sci-flag", at: [78, 83], s: 1.3, o: 0 }, f2: { art: "sci-flag", at: [149, 83], s: 1.3, o: 0 },
          cart: { art: "sci-cart", at: [45.9, 82], s: 0.82 }, boy: { art: "👦", at: [20, 82], s: 1.6 },
          sled: { art: "sci-sled", at: [-12, 82], s: 1.1, o: 0 }, girl: { art: "👧", at: [20, 82], s: 1.6, o: 0 },
          ball: { art: "sci-ball", at: [49, 71.6], s: 2.6, o: 0 }
        },
        scenes: [
          { caption: "امید چرخ‌دستی را هل می‌دهد. چرخ‌دستی از او دور می‌شود.", key: 4200, hold: 6000, do: [
            { id: "boy.armF", to: { r: -80 }, dur: 500 },
            { id: "boy", walk: [52, 82], at: 500, dur: 2400 }, { id: "boy.armF", to: { r: -80 }, at: 500, dur: 2400 },
            { id: "cart", path: "M45.9 82L77.9 82", at: 500, dur: 2400, ease: "linear" },
            { id: "cart.w1", to: { r: 360 }, at: 500, dur: 2400, ease: "linear" }, { id: "cart.w2", to: { r: 360 }, at: 500, dur: 2400, ease: "linear" },
            { id: "boy.armF", to: { r: -90 }, at: 2900, dur: 200 },
            { id: "cart", path: "M77.9 82L106 82", at: 3000, dur: 2000, ease: "out" },
            { id: "cart.w1", to: { r: 720 }, at: 3000, dur: 2000, ease: "out" }, { id: "cart.w2", to: { r: 720 }, at: 3000, dur: 2000, ease: "out" }
          ] },
          { caption: "چرخ‌دستی جلو رفت.", do: [
            { id: "cart", path: "M106 82L124 82", dur: 1400, ease: "out" },
            { id: "cart.w1", to: { r: 1000 }, dur: 1400, ease: "out" }, { id: "cart.w2", to: { r: 1000 }, dur: 1400, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 300, dur: 600 }
          ] },
          { caption: "مریم سورتمه را می‌کشد. سورتمه دنبالش می‌آید.", key: 3800, hold: 6000, do: [
            { id: "boy", to: { o: 0 }, dur: 600 }, { id: "cart", to: { o: 0 }, dur: 600 },
            { id: "snow", to: { o: 1 }, dur: 900 },
            { id: "girl", to: { o: 1 }, at: 500, dur: 400 }, { id: "sled", to: { o: 1 }, at: 500, dur: 400 }, { id: "girl.armF", to: { r: 40 }, at: 500, dur: 400 },
            { id: "girl", walk: [84, 82], at: 1100, dur: 4400 }, { id: "girl.armF", to: { r: 40 }, at: 1100, dur: 4400 },
            { id: "sled", path: "M-12 82L52 82", at: 1100, dur: 4400, ease: "linear" }
          ] },
          { caption: "مریم و سورتمه رفتند.", key: 1400, do: [
            { id: "girl", walk: [232, 82], dur: 3000 }, { id: "girl.armF", to: { r: 40 }, dur: 3000 },
            { id: "sled", path: "M52 82L200 82", dur: 3000, ease: "linear" }
          ] },
          { caption: "توپ را آرام هل بدهیم، کمی می‌رود.", do: [
            { id: "snow", to: { o: 0 }, dur: 800 },
            { id: "boy", to: { x: 30, o: 1 }, dur: 600 }, { id: "ball", to: { o: 1 }, dur: 600 },
            { id: "boy.armF", to: { r: -62 }, at: 900, dur: 900, ease: "soft" },
            { id: "ball", path: "M49 71.6L66 71.6", at: 1700, dur: 1600, ease: "out" }, { id: "ball", to: { r: 150 }, at: 1700, dur: 1600, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 2200, dur: 600 },
            { id: "f1", to: { o: 1 }, at: 3300, dur: 400 }
          ] },
          { caption: "محکم هل بدهیم، خیلی دورتر می‌رود!", do: [
            { id: "ball", to: { x: 49, r: 0 }, dur: 600 },
            { id: "boy.armF", to: { r: 30 }, at: 600, dur: 400 }, { id: "boy.armF", to: { r: -66 }, at: 1100, dur: 250, ease: "in" },
            { id: "ball", path: "M49 71.6L130 71.6", at: 1350, dur: 2200, ease: "out" }, { id: "ball", to: { r: 900 }, at: 1350, dur: 2200, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 1900, dur: 600 },
            { id: "f2", to: { o: 1 }, at: 3600, dur: 400 }, { id: "f2", to: { s: 1.6 }, at: 4000, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "برای اینکه توپ دورتر برود، چه کنیم؟",
        options: ["آرام‌تر هلش بدهیم", "محکم‌تر هلش بدهیم", "به آن دست نزنیم"], answer: "محکم‌تر هلش بدهیم" },
      { type: "sort", prompt: "هل دادن است یا کشیدن؟",
        baskets: [{ label: "هل دادن", value: "push" }, { label: "کشیدن", value: "pull" }],
        items: [
          { pic: "🛒", label: "چرخ‌دستی", basket: "push" },
          { pic: "⚽", label: "شوت کردن توپ", basket: "push" },
          { pic: "🔔", label: "زدن زنگ در", basket: "push" },
          { pic: "🪁", label: "نخ بادبادک", basket: "pull" },
          { pic: "🥕", label: "درآوردن هویج از خاک", basket: "pull" },
          { pic: "🎒", label: "بستن زیپ کیف", basket: "pull" }
        ] },
      { type: "choose", prompt: "ماشین اسباب‌بازی را هر بار به یک اندازه هل می‌دهیم. روی کدام دورتر می‌رود؟",
        options: ["روی فرش", "روی موزاییک صاف", "روی پتو"], answer: "روی موزاییک صاف" },
      { type: "home", pic: "🚗 📚", text: "ماشین اسباب‌بازی روی کدام زمین دورتر می‌رود؟",
        need: ["یک ماشین اسباب‌بازی یا توپ کوچک", "یک کتاب بزرگ یا تخته برای سرسره", "جاهای مختلف خانه: فرش، موزاییک، پتو"],
        steps: [
          "یک طرف کتاب را روی چند کتاب دیگر بگذارید تا سرسره کوچکی درست شود.",
          "ماشین را از بالای سرسره رها کنید: یک بار روی موزاییک، یک بار روی فرش و یک بار روی پتو.",
          "پیش از هر بار، کودک حدس بزند ماشین کجا دورتر می‌رود.",
          "جایی را که ماشین ایستاد با یک دکمه علامت بگذارید و فاصله را با وجب اندازه بگیرید."
        ],
        ask: "روی کدام دورتر رفت؟ چرا فکر می‌کنی؟" }
    ]
  },
  {
    id: "science-sapling-6", subject: "science", level: "sapling", emoji: "🐸", title: "چرخه زندگی",
    steps: [
      { type: "scene", prompt: "تخمه از کجا می‌آید؟", bg: "#cdeaf7",
        /* A sunflower's life cycle with the ground cut open: the seed goes into the soil, is watered, sends a root
           down and a shoot up, grows leaves in the sun, opens a big flower that a bee visits, fills its middle with
           new seeds, and the seeds fall to the soil where one sprouts again. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-soil" }, sun: { art: "sci-sun", at: [22, 14], o: 0 },
          wet: { art: "sci-wet", at: [80, 64], o: 0 },
          roots: { art: "sci-roots-small", at: [80, 67], s: 1.6, sy: 0 }, sprout: { art: "sci-sprout", at: [80, 64], s: 1.6, sy: 0 },
          plant: { art: "sci-plant", at: [80, 64], s: 0.8, o: 0 }, sf: { art: "sci-sunflower", at: [80, 57], s: 0.95, o: 0 },
          seed: { art: "sci-sf-seed", at: [80, 34], s: 3.4 },
          s1: { art: "sci-sf-seed", at: [80, 13.3], s: 0.6, o: 0 }, s2: { art: "sci-sf-seed", at: [80, 13.3], s: 0.6, o: 0 }, s3: { art: "sci-sf-seed", at: [80, 13.3], s: 0.6, o: 0 },
          sprout2: { art: "sci-sprout", at: [118, 57], s: 1.2, sy: 0 },
          can: { art: "sci-can", at: [104, 30], s: 1.5, o: 0 },
          bee: { art: "🐝", at: [170, 10], s: 0.6 }
        },
        scenes: [
          { caption: "این یک دانه آفتابگردان است. همان تخمه‌ای که می‌شناسی.", do: [
            { id: "seed", to: { r: 14 }, at: 300, dur: 2400, yoyo: true, times: 4 },
            { emit: "spark", where: [80, 34], spread: [26, 26], n: 6, at: 600, dur: 1600 }
          ] },
          { caption: "دانه را در خاک می‌کاریم و آب می‌دهیم. دانه جوانه می‌زند.", key: 5200, hold: 7200, do: [
            { id: "seed", path: "M80 34L80 66", dur: 1400, ease: "in" }, { id: "seed", to: { s: 0.9, r: 0 }, dur: 1400 },
            { id: "can", to: { o: 1 }, at: 1400, dur: 300 }, { id: "can", to: { r: -35 }, at: 1700, dur: 400 },
            { emit: "drop", where: [80.4, 36], spread: [3, 2], rise: 20, n: 12, at: 2100, dur: 1800, life: 800 },
            { id: "wet", to: { o: 1 }, at: 2600, dur: 1400 },
            { id: "can", to: { r: 0, o: 0 }, at: 4000, dur: 500 },
            { id: "roots", to: { sy: 1.6 }, at: 4200, dur: 1400 }, { id: "sprout", to: { sy: 1.6 }, at: 4800, dur: 1400, ease: "out" }
          ] },
          { caption: "جوانه با نور خورشید و آب بزرگ می‌شود و برگ می‌دهد.", do: [
            { id: "sun", to: { o: 1 }, dur: 600 }, { id: "sun.rays", to: { r: 120 }, dur: 3600 },
            { id: "plant", to: { o: 1 }, at: 600, dur: 600 }, { id: "sprout", to: { o: 0 }, at: 600, dur: 600 },
            { id: "plant", to: { s: 1.5 }, at: 600, dur: 2600 }
          ] },
          { caption: "تابستان گل بزرگ آفتابگردان باز می‌شود. زنبور به گل سر می‌زند.", key: 4600, hold: 7000, do: [
            { id: "sf.head", to: { s: 0.15 }, dur: 1 }, { id: "sf", to: { o: 1 }, dur: 800 }, { id: "plant", to: { o: 0 }, dur: 800 }, { id: "roots", to: { o: 0 }, dur: 800 },
            { id: "sf.head", to: { s: 1 }, at: 900, dur: 1600, ease: "back" },
            { id: "bee", path: "M170 10C140 0 130 30 110 20S90 4 86 10", at: 2600, dur: 2200 },
            { id: "bee", to: { r: 12 }, at: 2600, dur: 4000, yoyo: true, times: 16 }
          ] },
          { caption: "وسط گل پر از دانه تازه می‌شود؛ صدها دانه!", hold: 5600, do: [
            { id: "bee", path: "M86 10C100 0 130 0 180 -10", dur: 1600 },
            { cam: { x: 80, y: 18, zoom: 2.8 }, at: 300, dur: 1000 },
            { id: "sf.seeds", to: { o: 1 }, at: 1300, dur: 2400 }
          ] },
          { caption: "دانه‌ها به خاک می‌افتند و چرخه زندگی دوباره شروع می‌شود.", hold: 7400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "sf.head", to: { r: 30, x: 3, y: 5, s: 0.9 }, at: 900, dur: 1200 },
            { id: "s1", to: { o: 1 }, at: 1900, dur: 1 }, { id: "s1", path: "M84 16Q70 30 62 56", at: 1900, dur: 1300, ease: "in" }, { id: "s1", to: { r: 200 }, at: 1900, dur: 1300 },
            { id: "s2", to: { o: 1 }, at: 2300, dur: 1 }, { id: "s2", path: "M86 16Q100 32 102 56", at: 2300, dur: 1300, ease: "in" }, { id: "s2", to: { r: -160 }, at: 2300, dur: 1300 },
            { id: "s3", to: { o: 1 }, at: 2700, dur: 1 }, { id: "s3", path: "M86 16Q112 30 118 58", at: 2700, dur: 1400, ease: "in" }, { id: "s3", to: { r: 140 }, at: 2700, dur: 1400 },
            { id: "s3", to: { y: 62 }, at: 4300, dur: 800 },
            { id: "sprout2", to: { sy: 1.2 }, at: 5200, dur: 1400, ease: "out" }
          ] }
        ],
        question: "یک گل آفتابگردان چند دانه تازه می‌دهد؟",
        options: ["هیچ", "فقط یکی", "خیلی زیاد"], answer: "خیلی زیاد" },
      { type: "order", prompt: "چرخه زندگی آفتابگردان را به ترتیب بچین", numbered: true,
        items: [{ pic: "🫘", label: "دانه" }, { pic: "🌱", label: "جوانه" }, { pic: "🌿", label: "گیاه" }, { pic: "🌻", label: "گل" }] },
      { type: "scene", prompt: "قورباغه‌های شالیزار", bg: "#cdeaf7",
        /* A rice paddy seen from the side, so we see under the water: the frog lays a jelly cluster of eggs,
           tadpoles come out and swim with their tails, grow legs while their tails shrink, become small frogs that
           climb out and hop on the bank, grow, and lay eggs in the water again. Drawings: js/art/rig-science.js. */
        parts: {
          paddy: { art: "sci-paddy" },
          spawn: { art: "sci-frogspawn", at: [46, 58], s: 0 }, spawn2: { art: "sci-frogspawn", at: [98, 60], s: 0 },
          tp1: { art: "sci-tadpole", at: [46, 58], s: 1.3, o: 0 }, tp2: { art: "sci-tadpole", at: [44, 60], s: 1.3, o: 0 }, tp3: { art: "sci-tadpole", at: [49, 57], s: 1.3, o: 0 },
          veil: { art: "sci-veil" },
          frog: { art: "🐸", at: [40, 46], s: 0.6 },
          young: { art: "🐸", at: [96, 66], s: 0.42, o: 0 }
        },
        scenes: [
          { caption: "در شالیزارهای گیلان، قورباغه در آب تخم می‌گذارد. تخم‌ها مثل حباب‌های ژله‌ای‌اند.", key: 4000, hold: 7000, do: [
            { id: "frog", to: { y: "-1" }, dur: 1600, yoyo: true, times: 4 },
            { id: "spawn", to: { s: 1.8 }, at: 1600, dur: 3000, ease: "out" },
            { cam: { x: 48, y: 54, zoom: 1.8 }, at: 3000, dur: 1200 }
          ] },
          { caption: "از هر تخم یک بچه‌قورباغه درمی‌آید. دم دارد، پا ندارد و مثل ماهی در آب شنا می‌کند.", key: 4400, hold: 8000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "frog", path: "M40 46Q30 30 -20 40", dur: 1200 },
            { id: "spawn", to: { o: 0.35 }, at: 800, dur: 1400 },
            { id: "tp1", to: { o: 1 }, at: 1000, dur: 400 }, { id: "tp2", to: { o: 1 }, at: 1300, dur: 400 }, { id: "tp3", to: { o: 1 }, at: 1600, dur: 400 },
            { id: "tp1.tail", to: { r: 28 }, at: 1000, dur: 6400, yoyo: true, times: 40 }, { id: "tp2.tail", to: { r: 28 }, at: 1300, dur: 6400, yoyo: true, times: 40 }, { id: "tp3.tail", to: { r: 28 }, at: 1600, dur: 6400, yoyo: true, times: 40 },
            { id: "tp1", path: "M46 58C60 52 70 66 84 60S100 56 96 66", at: 1400, dur: 5200 },
            { id: "tp2", path: "M44 60C54 70 66 74 76 70S90 74 104 76", at: 1700, dur: 5200 },
            { id: "tp3", path: "M49 57C58 50 68 52 74 56S86 52 102 54", at: 2000, dur: 5200 }
          ] },
          { caption: "کم‌کم پاهایش درمی‌آید و دمش کوتاه می‌شود.", hold: 6000, do: [
            { cam: { x: 96, y: 64, zoom: 3 }, dur: 1200 },
            { id: "tp1.legs", to: { o: 1 }, at: 1400, dur: 1600 }, { id: "tp2.legs", to: { o: 1 }, at: 1400, dur: 1600 }, { id: "tp3.legs", to: { o: 1 }, at: 1400, dur: 1600 },
            { id: "tp1.tail", to: { sx: 0.4 }, at: 2400, dur: 2600 }, { id: "tp2.tail", to: { sx: 0.4 }, at: 2400, dur: 2600 }, { id: "tp3.tail", to: { sx: 0.4 }, at: 2400, dur: 2600 }
          ] },
          { caption: "حالا قورباغه کوچکی است. از آب بیرون می‌آید و روی خشکی هم می‌پرد.", key: 4600, hold: 7400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "tp1", to: { o: 0 }, at: 800, dur: 500 }, { id: "young", to: { o: 1 }, at: 800, dur: 500 },
            { id: "tp2", to: { o: 0 }, at: 900, dur: 600 }, { id: "tp3", to: { o: 0 }, at: 900, dur: 600 },
            { id: "young", path: "M96 66Q104 54 112 46", at: 1500, dur: 1200 },
            { id: "young", path: "M112 46Q120 36 128 50", at: 2900, dur: 700 },
            { id: "young", path: "M128 50Q136 38 144 49", at: 3800, dur: 700 },
            { id: "young", path: "M144 49Q150 40 154 48", at: 4700, dur: 700 }
          ] },
          { caption: "قورباغه بزرگ می‌شود و او هم در آب تخم می‌گذارد.", key: 5200, hold: 6600, do: [
            { id: "young", to: { s: 0.7 }, dur: 2000 },
            { id: "young", path: "M154 48Q140 34 118 44", at: 2200, dur: 1000 }, { id: "young", path: "M118 44Q110 38 100 46", at: 3400, dur: 800 },
            { id: "spawn2", to: { s: 1.6 }, at: 4200, dur: 2000, ease: "out" }
          ] }
        ],
        question: "بچه‌قورباغه دم‌دار کجا زندگی می‌کند؟",
        options: ["در آب", "روی درخت", "زیر خاک"], answer: "در آب" },
      { type: "order", prompt: "چرخه زندگی قورباغه را به ترتیب بچین", numbered: true,
        items: [{ pic: "🫧", label: "تخم‌ها" }, { label: "بچه‌قورباغه دم‌دار" }, { label: "بچه‌قورباغه پادار" }, { pic: "🐸", label: "قورباغه" }] },
      { type: "scene", prompt: "پروانه اول چه شکلی بود؟", bg: "#e6f4d7",
        /* The butterfly lands and leaves tiny eggs on the leaf; a caterpillar comes out and eats bite after bite,
           growing; it hangs from the twig and a cocoon closes round it, and through the cocoon we see it change; the
           cocoon splits and a butterfly unfolds its wings and flies. Last, a silkworm's white cocoon is unwound
           onto a spool as silk thread. Drawings: js/art/rig-science.js and js/art. */
        parts: {
          lb: { art: "sci-leafbranch" }, eggs: { art: "sci-leaf-eggs", at: [64, 56], s: 1.8, o: 0 },
          catH: { art: "sci-none", at: [64, 60], o: 0 }, cat: { art: "🐛", s: 0.3, under: "catH" },
          cocoon: { art: "sci-cocoon", at: [110, 25], s: 1.4, sy: 0 },
          fly: { art: "🦋", at: [170, 6], s: 0.75 }, fly2: { art: "🦋", at: [110, 62], s: 0.2, sx: 0.2, o: 0 },
          worm: { art: "sci-silkworm", at: [24, 86], s: 1.8, o: 0 }, silk: { art: "sci-silk-cocoon", at: [40, 74], s: 0, o: 0 },
          thread: { art: "sci-thread", at: [40, 74], sx: 1.05, o: 0 }, spool: { art: "sci-spool", at: [90, 74], s: 2, o: 0 }
        },
        scenes: [
          { caption: "پروانه روی برگ تخم‌های خیلی ریزی می‌گذارد.", key: 2700, hold: 5600, do: [
            { id: "fly", path: "M170 6Q120 0 66 52", dur: 2000 }, { id: "fly", to: { sx: 0.3 }, dur: 2000, yoyo: true, times: 12 },
            { id: "eggs", to: { o: 1 }, at: 2400, dur: 800 },
            { id: "fly", path: "M66 52Q100 10 176 -6", at: 3600, dur: 1800 }, { id: "fly", to: { sx: 0.3 }, at: 3600, dur: 1800, yoyo: true, times: 12 }
          ] },
          { caption: "از تخم یک کرم کوچک درمی‌آید. کرم پشت سر هم برگ می‌خورد و بزرگ می‌شود.", key: 5600, hold: 8000, do: [
            { id: "eggs", to: { o: 0 }, dur: 600 }, { id: "catH", to: { o: 1 }, dur: 600 },
            { id: "catH", path: "M64 60L56 50", at: 800, dur: 1200 }, { id: "lb.b0", to: { o: 1 }, at: 2000, dur: 800 }, { id: "cat", to: { s: 0.45 }, at: 1600, dur: 1400 },
            { id: "catH", path: "M56 50L58 62", at: 3000, dur: 1200 }, { id: "lb.b2", to: { o: 1 }, at: 4100, dur: 800 }, { id: "cat", to: { s: 0.6 }, at: 3800, dur: 1400 },
            { id: "catH", path: "M58 62L80 58", at: 5200, dur: 1400 }, { id: "lb.b3", to: { o: 1 }, at: 6500, dur: 800 }, { id: "cat", to: { s: 0.8 }, at: 6000, dur: 1400 },
            { id: "catH", to: { sx: 0.85 }, at: 800, dur: 6600, yoyo: true, times: 22 }
          ] },
          { caption: "بعد دور خودش پیله می‌سازد و آرام می‌ماند. داخل پیله، کرم کم‌کم تغییر می‌کند.", key: 5800, hold: 7800, do: [
            { id: "catH", path: "M80 58Q100 40 110 52", dur: 1400 }, { id: "catH", to: { r: -90 }, at: 1000, dur: 600 },
            { id: "catH", to: { o: 0 }, at: 1800, dur: 600 }, { id: "cocoon", to: { sy: 1.4 }, at: 1500, dur: 1800 },
            { cam: { x: 110, y: 38, zoom: 2.2 }, at: 3000, dur: 1000 },
            { id: "cocoon.worm", to: { o: 0 }, at: 4200, dur: 2800 }, { id: "cocoon.fly", to: { o: 1 }, at: 4200, dur: 2800 }
          ] },
          { caption: "یک روز پیله باز می‌شود و یک پروانه بیرون می‌آید!", key: 3200, hold: 6600, do: [
            { id: "cocoon", to: { r: 6 }, dur: 900, yoyo: true, times: 4 },
            { id: "cocoon.shell", to: { o: 0 }, at: 1000, dur: 300 }, { id: "cocoon.open", to: { o: 1 }, at: 1000, dur: 300 }, { id: "cocoon.fly", to: { o: 0 }, at: 1200, dur: 400 },
            { id: "fly2", to: { o: 1 }, at: 1200, dur: 400 }, { id: "fly2", to: { s: 0.5, sx: 1 }, at: 1400, dur: 1800, ease: "out" },
            { cam: { x: 80, y: 45, zoom: 1 }, at: 3400, dur: 1000 },
            { id: "fly2", path: "M110 62Q130 30 120 10", at: 3600, dur: 2400 }, { id: "fly2", to: { sx: 0.3 }, at: 3600, dur: 2400, yoyo: true, times: 14 }
          ] },
          { caption: "کرم ابریشم هم همین‌طور است. در گیلان از پیله کرم ابریشم، نخ ابریشم درست می‌کنند.", key: 6200, hold: 8600, do: [
            { id: "lb", to: { o: 0.35 }, dur: 800 }, { id: "cocoon", to: { o: 0.35 }, dur: 800 },
            { id: "worm", to: { o: 1 }, at: 400, dur: 500 }, { id: "worm", to: { sx: 0.85 }, at: 400, dur: 1800, yoyo: true, times: 6 },
            { id: "worm", path: "M24 86Q32 80 40 78", at: 1600, dur: 1000 }, { id: "worm", to: { o: 0 }, at: 2600, dur: 600 },
            { id: "silk", to: { o: 1, s: 2.2 }, at: 2400, dur: 1400 },
            { id: "spool", to: { o: 1 }, at: 3600, dur: 400 },
            { id: "thread", to: { o: 1 }, at: 4000, dur: 100 }, { id: "thread", draw: true, at: 4000, dur: 1600 },
            { id: "spool", to: { r: 1080 }, at: 4800, dur: 3600, ease: "linear" }, { id: "silk", to: { r: -720, s: 1.5 }, at: 4800, dur: 3600, ease: "linear" }
          ] }
        ],
        question: "کرم داخل پیله چه می‌شود؟",
        options: ["پروانه", "برگ", "قورباغه"], answer: "پروانه" },
      { type: "order", prompt: "چرخه زندگی پروانه را به ترتیب بچین", numbered: true,
        items: [{ pic: "🥚", label: "تخم" }, { pic: "🐛", label: "کرم" }, { label: "پیله" }, { pic: "🦋", label: "پروانه" }] },
      { type: "order", prompt: "چرخه زندگی مرغ را به ترتیب بچین", numbered: true,
        items: [{ pic: "🥚", label: "تخم‌مرغ" }, { pic: "🐣", label: "جوجه از تخم درمی‌آید" }, { pic: "🐥", label: "جوجه" }, { pic: "🐔", label: "مرغ" }] },
      { type: "home", pic: "🫘 🫙", text: "لوبیا را در شیشه بکار و رشدش را ببین!",
        need: ["یک شیشه مربا یا لیوان شفاف", "دستمال کاغذی یا پنبه", "چند دانه لوبیا", "آب", "کاغذ و مداد"],
        steps: [
          "دستمال کاغذی را خیس کنید و دور دیواره شیشه بچسبانید.",
          "دانه‌های لوبیا را بین دستمال و شیشه بگذارید تا از بیرون دیده شوند.",
          "شیشه را کنار پنجره بگذارید و هر روز کمی آب بریزید تا دستمال خیس بماند.",
          "کودک هر چند روز یک بار لوبیا را نقاشی کند: اول ریشه، بعد ساقه، بعد برگ.",
          "عکس‌های خانوادگی را هم با هم ببینید: نوزادی، کودکی، بزرگسالی و پدربزرگ‌ها و مادربزرگ‌ها. ما هم چرخه زندگی داریم."
        ],
        ask: "اول ریشه درآمد یا برگ؟ اگر لوبیا را در خاک بکاریم و بزرگ شود، آخرش چه می‌دهد؟" }
    ]
  },
  {
    id: "science-sapling-7", subject: "science", level: "sapling", emoji: "🦉", title: "چه کسی چه می‌خورد؟",
    steps: [
      { type: "scene", prompt: "در کوه‌های زاگرس چه کسی چه می‌خورد؟", bg: "#cdeaf7",
        /* The sun comes up over the Zagros; its light reaches the grass, water rises into it from the soil and air
           blows over it, and it sparkles and grows (it makes its own food). A wild goat walks up and eats it down; a
           Persian leopard creeps up and springs, and the goat runs (the chase leaves the picture: nothing is
           shown being caught). Last the three stand in a row with arrows: food, then who eats it.
           Drawings: js/art/rig-science.js and js/art. */
        parts: {
          bg: { art: "sci-zagros" }, sun: { art: "sci-sun", at: [140, 36], o: 0 },
          ray1: { art: "sci-ray", at: [130, 18.1], r: 152.6, sx: 2.8, o: 0 }, ray2: { art: "sci-ray", at: [130.2, 18.4], r: 150.4, sx: 2.7, o: 0 },
          wind: { art: "sci-wind", at: [2, 70], o: 0 },
          wd1: { art: "sci-drop", at: [26, 90], s: 0.8, o: 0 }, wd2: { art: "sci-drop", at: [34, 90], s: 0.8, o: 0 },
          grass: { art: "sci-grass", at: [30, 84], s: 1.4 },
          goat: { art: "🐐", at: [190, 84], s: 1.2, flip: true },
          leopard: { art: "🐆", at: [210, 84], s: 1.2, flip: true },
          a1: { art: "sci-arrow", at: [44, 74], o: 0 }, a2: { art: "sci-arrow", at: [92, 74], sx: 1.15, o: 0 }
        },
        scenes: [
          { caption: "خورشید به کوه‌های زاگرس می‌تابد.", do: [
            { id: "sun", to: { o: 1 }, dur: 400 }, { id: "sun", path: "M140 36L140 14", dur: 2200, ease: "out" }, { id: "sun.rays", to: { r: 120 }, dur: 3600 },
            { emit: "spark", where: [70, 30], spread: [110, 30], n: 10, at: 1600, dur: 2000 }
          ] },
          { caption: "علف با نور خورشید، آب و هوا برای خودش غذا می‌سازد.", key: 3600, hold: 6400, do: [
            { id: "ray1", to: { o: 1 }, dur: 100 }, { id: "ray1", draw: true, dur: 1400 },
            { id: "ray2", to: { o: 1 }, at: 200, dur: 100 }, { id: "ray2", draw: true, at: 200, dur: 1400 },
            { id: "wd1", to: { o: 1 }, at: 1400, dur: 1 }, { id: "wd1", path: "M26 90L28 80", at: 1400, dur: 1200 }, { id: "wd1", to: { o: 0 }, at: 2500, dur: 300 },
            { id: "wd2", to: { o: 1 }, at: 1800, dur: 1 }, { id: "wd2", path: "M34 90L32 80", at: 1800, dur: 1200 }, { id: "wd2", to: { o: 0 }, at: 2900, dur: 300 },
            { id: "wind", to: { o: 1 }, at: 2200, dur: 100 }, { id: "wind", draw: true, at: 2200, dur: 1200 },
            { emit: "spark", where: [30, 74], spread: [16, 10], n: 8, at: 3200, dur: 1800 },
            { id: "grass", to: { s: 1.65 }, at: 3400, dur: 2200, ease: "out" }
          ] },
          { caption: "بز کوهی علف می‌خورد.", key: 3600, hold: 5600, do: [
            { id: "ray1", to: { o: 0 }, dur: 400 }, { id: "ray2", to: { o: 0 }, dur: 400 }, { id: "wind", to: { o: 0 }, dur: 400 },
            { id: "goat", path: "M190 84L50 84", dur: 2600, ease: "out" }, { id: "goat", to: { r: 5 }, dur: 2600, yoyo: true, times: 8 },
            { id: "goat", to: { r: -14 }, at: 2800, dur: 2400, yoyo: true, times: 6 },
            { id: "grass", to: { sy: 0.45 }, at: 2900, dur: 2400 }
          ] },
          { caption: "پلنگ ایرانی بز کوهی را شکار می‌کند.", key: 3000, hold: 6000, do: [
            { id: "leopard", path: "M210 84L120 84", dur: 2400 }, { id: "leopard", to: { sy: 0.85 }, dur: 2400 },
            { id: "goat", to: { r: 8 }, at: 2300, dur: 300 },
            { id: "leopard", to: { sy: 1 }, at: 2500, dur: 200 }, { id: "leopard", path: "M120 84Q94 60 72 84", at: 2600, dur: 700 },
            { id: "goat", to: { r: 0 }, at: 2700, dur: 150 }, { id: "goat", path: "M50 84L-30 84", at: 2800, dur: 1300, ease: "in" },
            { id: "leopard", path: "M72 84L-40 84", at: 3300, dur: 1300, ease: "in" }
          ] },
          { caption: "علف، بز کوهی، پلنگ: به این می‌گوییم زنجیره غذایی. هر کدام غذای بعدی است.", hold: 7600, do: [
            { id: "grass", to: { sy: 1, s: 1.6 }, dur: 1000 },
            { id: "goat", to: { x: 78, flip: 1, o: 0 }, dur: 1 }, { id: "goat", to: { o: 1 }, at: 100, dur: 600 },
            { id: "leopard", to: { x: 132, o: 0 }, dur: 1 }, { id: "leopard", to: { o: 1 }, at: 100, dur: 600 },
            { id: "a1", to: { o: 1 }, at: 2400, dur: 100 }, { id: "a1", draw: true, at: 2400, dur: 900 },
            { id: "goat", to: { s: 1.4 }, at: 3300, dur: 700, yoyo: true, times: 2 },
            { id: "a2", to: { o: 1 }, at: 4400, dur: 100 }, { id: "a2", draw: true, at: 4400, dur: 900 },
            { id: "leopard", to: { s: 1.35 }, at: 5300, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "علف غذایش را از کجا می‌آورد؟",
        options: ["علف‌های دیگر را می‌خورد", "با نور خورشید خودش غذا می‌سازد", "بز کوهی به آن غذا می‌دهد"], answer: "با نور خورشید خودش غذا می‌سازد" },
      { type: "order", prompt: "زنجیره غذایی مزرعه را بچین: اول غذا، بعد کسی که آن را می‌خورد", numbered: true,
        items: [{ pic: "🌾", label: "گندم" }, { pic: "🐭", label: "موش" }, { pic: "🐍", label: "مار" }, { pic: "🦅", label: "عقاب" }] },
      { type: "pairs", prompt: "هر حیوان را با غذایش جفت کن",
        pairs: [
          [{ pic: "🐿️", say: "سنجاب ایرانی" }, { pic: "🌰", label: "بلوط" }],
          [{ pic: "🐝", say: "زنبور عسل" }, { pic: "🌸", label: "شهد گل" }],
          [{ pic: "🐪", say: "شتر" }, { pic: "🌵", label: "خارشتر" }],
          [{ pic: "🦉", say: "جغد" }, { pic: "🐭", label: "موش" }]
        ] },
      { type: "scene", prompt: "جغد دوست کشاورز است",
        /* A wheat field: a mouse nibbles the grain; at night the owl swoops down from its tree and the mouse is gone
           (we do not show more); with the owl gone, mice appear one after another and the wheat goes, stalk by
           stalk, while the farmer comes and finds little left; the owl comes back, the mice are few again and the
           wheat grows back. Drawings: js/art/rig-science.js and js/art. */
        bg: "#cdeaf7",
        parts: {
          bg: { art: "sci-meadow" }, tree: { art: "sci-tree-bare", at: [146, 88], s: 0.9 },
          w1: { art: "🌾", at: [14, 86], s: 1.1 }, w2: { art: "🌾", at: [28, 86], s: 1.1 }, w3: { art: "🌾", at: [42, 86], s: 1.1 }, w4: { art: "🌾", at: [56, 86], s: 1.1 },
          w5: { art: "🌾", at: [70, 86], s: 1.1 }, w6: { art: "🌾", at: [84, 86], s: 1.1 }, w7: { art: "🌾", at: [98, 86], s: 1.1 }, w8: { art: "🌾", at: [112, 86], s: 1.1 },
          m1: { art: "🐭", at: [36, 88], s: 0.55 }, m2: { art: "🐭", at: [62, 88], s: 0.55, o: 0 }, m3: { art: "🐭", at: [20, 88], s: 0.55, o: 0 },
          m4: { art: "🐭", at: [90, 88], s: 0.55, o: 0 }, m5: { art: "🐭", at: [48, 88], s: 0.55, o: 0 }, m6: { art: "🐭", at: [76, 88], s: 0.55, o: 0 },
          farmer: { art: "🧑‍🌾", at: [190, 88], s: 1.35, flip: true },
          night: { art: "sci-night", o: 0 },
          owl: { art: "🦉", at: [146, 44], s: 0.8 }
        },
        scenes: [
          { caption: "در مزرعه گندم، موش‌ها دانه‌های گندم را می‌خورند.", key: 2400, do: [
            { id: "m1", path: "M36 88L30 88", dur: 800 },
            { id: "m1", to: { r: -10 }, at: 900, dur: 2800, yoyo: true, times: 10 },
            { id: "w2", to: { r: 6 }, at: 900, dur: 2800, yoyo: true, times: 6 },
            { emit: "spark", where: [28, 68], spread: [8, 4], rise: 14, n: 8, at: 1000, dur: 2600, life: 1000 }
          ] },
          { caption: "شب‌ها جغد موش‌ها را شکار می‌کند. برای همین موش‌ها زیاد نمی‌شوند.", key: 2700, hold: 6000, do: [
            { id: "night", to: { o: 0.7 }, dur: 1200 },
            { id: "owl", path: "M146 44Q90 30 34 82", at: 1400, dur: 1500, ease: "in" },
            { id: "m1", to: { o: 0 }, at: 2850, dur: 150 },
            { id: "owl", path: "M34 82Q90 20 146 44", at: 3000, dur: 1800, ease: "out" }
          ] },
          { caption: "اگر جغدها از مزرعه بروند، موش‌ها خیلی زیاد می‌شوند…", hold: 6400, do: [
            { id: "night", to: { o: 0 }, dur: 900 },
            { id: "owl", path: "M146 44Q160 10 200 -20", at: 600, dur: 1600 },
            { id: "m1", to: { o: 1 }, at: 1800, dur: 300 }, { id: "m2", to: { o: 1 }, at: 2400, dur: 300 }, { id: "m3", to: { o: 1 }, at: 3000, dur: 300 },
            { id: "m4", to: { o: 1 }, at: 3600, dur: 300 }, { id: "m5", to: { o: 1 }, at: 4200, dur: 300 }, { id: "m6", to: { o: 1 }, at: 4800, dur: 300 }
          ] },
          { caption: "…و گندم کمی برای کشاورز می‌ماند.", hold: 6600, do: [
            { id: "m1", to: { r: -10 }, dur: 4400, yoyo: true, times: 14 }, { id: "m4", to: { r: 10 }, dur: 4400, yoyo: true, times: 14 },
            { id: "w2", to: { r: -80, o: 0 }, at: 400, dur: 600 }, { id: "w5", to: { r: 80, o: 0 }, at: 900, dur: 600 }, { id: "w3", to: { r: -80, o: 0 }, at: 1400, dur: 600 },
            { id: "w7", to: { r: 80, o: 0 }, at: 1900, dur: 600 }, { id: "w1", to: { r: -80, o: 0 }, at: 2400, dur: 600 }, { id: "w6", to: { r: 80, o: 0 }, at: 2900, dur: 600 },
            { id: "farmer", walk: [124, 88], at: 2600, dur: 2400 },
            { id: "farmer", to: { r: -8 }, at: 5200, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "هر حیوان در زنجیره غذایی جای خودش را دارد. وقتی همه باشند، طبیعت سالم می‌ماند.", hold: 8000, do: [
            { id: "owl", path: "M200 -20Q160 10 146 44", dur: 1600 },
            { id: "m2", to: { o: 0 }, at: 1200, dur: 500 }, { id: "m3", to: { o: 0 }, at: 1400, dur: 500 }, { id: "m4", to: { o: 0 }, at: 1600, dur: 500 },
            { id: "m5", to: { o: 0 }, at: 1800, dur: 500 }, { id: "m6", to: { o: 0 }, at: 2000, dur: 500 },
            { id: "w1", to: { r: 0, o: 1, sy: 0.2 }, at: 2600, dur: 1 }, { id: "w1", to: { sy: 1 }, at: 2601, dur: 1600 },
            { id: "w2", to: { r: 0, o: 1, sy: 0.2 }, at: 2900, dur: 1 }, { id: "w2", to: { sy: 1 }, at: 2901, dur: 1600 },
            { id: "w3", to: { r: 0, o: 1, sy: 0.2 }, at: 3200, dur: 1 }, { id: "w3", to: { sy: 1 }, at: 3201, dur: 1600 },
            { id: "w5", to: { r: 0, o: 1, sy: 0.2 }, at: 3500, dur: 1 }, { id: "w5", to: { sy: 1 }, at: 3501, dur: 1600 },
            { id: "w6", to: { r: 0, o: 1, sy: 0.2 }, at: 3800, dur: 1 }, { id: "w6", to: { sy: 1 }, at: 3801, dur: 1600 },
            { id: "w7", to: { r: 0, o: 1, sy: 0.2 }, at: 4100, dur: 1 }, { id: "w7", to: { sy: 1 }, at: 4101, dur: 1600 },
            { id: "farmer", to: { y: "-4" }, at: 5600, dur: 1200, yoyo: true, times: 4 },
            { emit: "spark", where: [64, 66], spread: [100, 16], n: 10, at: 5600, dur: 1600 }
          ] }
        ],
        question: "اگر جغدها از مزرعه بروند، چه می‌شود؟",
        options: ["موش‌ها خیلی زیاد می‌شوند", "گندم بیشتر می‌شود", "هیچ اتفاقی نمی‌افتد"], answer: "موش‌ها خیلی زیاد می‌شوند" },
      { type: "order", prompt: "زنجیره غذایی خلیج فارس را بچین: اول غذا، بعد کسی که آن را می‌خورد", numbered: true,
        items: [{ pic: "🌿", label: "جلبک" }, { pic: "🦐", label: "میگو" }, { pic: "🐟", label: "ماهی" }, { pic: "🐬", label: "دلفین" }] },
      { type: "home", pic: "🍽️ ☀️", text: "غذای امروز ما از کجا آمده؟",
        need: ["چند تکه کاغذ کوچک", "مداد رنگی", "نخ یا چسب"],
        steps: [
          "بعد از ناهار، کودک بگوید چه خوردیم: مثلا نان، ماست، برنج یا سبزی.",
          "برای هر غذا بپرسید: «این از کجا آمده؟» نان از گندم؛ ماست از شیر گاو، و گاو علف می‌خورد.",
          "هر حلقه را روی یک کاغذ نقاشی کنید و کاغذها را با نخ یا چسب پشت سر هم وصل کنید. اولین حلقه همیشه خورشید است.",
          "در حیاط یا پارک، آرام به پرنده‌ها و حشره‌ها نگاه کنید: گنجشک چه می‌خورد؟ مورچه چه می‌برد؟ به آن‌ها دست نزنید."
        ],
        ask: "در زنجیره غذایی ما، خورشید کجاست؟ اگر خورشید نبود، چه می‌شد؟" }
    ]
  },
  {
    id: "science-sapling-8", subject: "science", level: "sapling", emoji: "🥁", title: "صدا از کجا می‌آید؟",
    steps: [
      { type: "scene", prompt: "صدا از کجا می‌آید؟", bg: "#f6e3c6",
        /* Sara's own hand hits the tonbak and its skin shivers; a few grains of rice on the skin jump, so the shivering
           can be seen (like the home experiment), and sound spreads from it as waves. Soft hits: a small shiver,
           small waves; hard hits: a big shiver, big waves. Drawings: js/art/rig-science.js and js/art. */
        parts: {
          room: { art: "sci-bg-room" },
          drum: { art: "sci-tonbak", at: [80, 88], s: 1 },
          girl: { art: "👧", at: [100, 88], s: 2, flip: true },
          wR: { art: "sci-waves", at: [93, 57], o: 0 }, wL: { art: "sci-waves", at: [67, 57], flip: true, o: 0 }
        },
        scenes: [
          { caption: "سارا تنبک می‌زند. گوش کن!", key: 1300, hold: 4400, do: [
            { id: "girl.armF", to: { r: -120 }, dur: 300 }, { id: "girl.armF", to: { r: -82 }, at: 300, dur: 3200, yoyo: true, times: 8, ease: "in" },
            { id: "wR", to: { s: 0.6, o: 1 }, at: 500, dur: 1 }, { id: "wR", to: { s: 1.5, o: 0 }, at: 500, dur: 3200, times: 4, ease: "out" },
            { id: "wL", to: { s: 0.6, o: 1 }, at: 500, dur: 1 }, { id: "wL", to: { s: 1.5, o: 0 }, at: 500, dur: 3200, times: 4, ease: "out" },
            { id: "drum.skin", to: { sy: 0.4 }, at: 500, dur: 3200, yoyo: true, times: 24 }
          ] },
          { caption: "وقتی دستش به پوست تنبک می‌خورد، پوست تنبک تند تند می‌لرزد.", key: 2400, hold: 5000, do: [
            { cam: { x: 86, y: 60, zoom: 2.4 }, dur: 900 },
            { id: "girl.armF", to: { r: -82 }, at: 1100, dur: 300, ease: "in" }, { id: "girl.armF", to: { r: -120 }, at: 1400, dur: 500 },
            { id: "drum.skin", to: { sy: 0.2 }, at: 1400, dur: 2400, yoyo: true, times: 30 },
            { id: "drum.rice", to: { y: -3 }, at: 1400, dur: 2400, yoyo: true, times: 10 }
          ] },
          { caption: "این لرزش صدا می‌سازد.", key: 2400, hold: 4400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "drum.skin", to: { sy: 0.3 }, dur: 3600, yoyo: true, times: 40 },
            { id: "drum.rice", to: { y: -2 }, dur: 3600, yoyo: true, times: 14 },
            { id: "wR", to: { s: 0.6, o: 1 }, at: 600, dur: 1 }, { id: "wR", to: { s: 1.6, o: 0 }, at: 600, dur: 3600, times: 3, ease: "out" },
            { id: "wL", to: { s: 0.6, o: 1 }, at: 600, dur: 1 }, { id: "wL", to: { s: 1.6, o: 0 }, at: 600, dur: 3600, times: 3, ease: "out" }
          ] },
          { caption: "سارا آرام می‌زند: پوست کم می‌لرزد و صدا آهسته است.", key: 2100, hold: 5200, do: [
            { id: "girl.armF", to: { r: -95 }, dur: 600 }, { id: "girl.armF", to: { r: -82 }, at: 600, dur: 3600, yoyo: true, times: 8, ease: "soft" },
            { id: "drum.skin", to: { sy: 0.85 }, at: 800, dur: 3600, yoyo: true, times: 30 },
            { id: "drum.rice", to: { y: -0.6 }, at: 800, dur: 3600, yoyo: true, times: 12 },
            { id: "wR", to: { s: 0.4, o: 0.7 }, at: 800, dur: 1 }, { id: "wR", to: { s: 0.8, o: 0 }, at: 800, dur: 3600, times: 4, ease: "out" },
            { id: "wL", to: { s: 0.4, o: 0.7 }, at: 800, dur: 1 }, { id: "wL", to: { s: 0.8, o: 0 }, at: 800, dur: 3600, times: 4, ease: "out" }
          ] },
          { caption: "محکم می‌زند: پوست زیاد می‌لرزد و صدا بلند است!", key: 2100, hold: 5200, do: [
            { id: "girl.armF", to: { r: -155 }, dur: 600 }, { id: "girl.armF", to: { r: -82 }, at: 600, dur: 3600, yoyo: true, times: 8, ease: "in" },
            { id: "drum.skin", to: { sy: -0.6 }, at: 800, dur: 3600, yoyo: true, times: 30 },
            { id: "drum.rice", to: { y: -7 }, at: 800, dur: 3600, yoyo: true, times: 8 },
            { id: "wR", to: { s: 0.8, o: 1 }, at: 800, dur: 1 }, { id: "wR", to: { s: 2.3, o: 0 }, at: 800, dur: 3600, times: 4, ease: "out" },
            { id: "wL", to: { s: 0.8, o: 1 }, at: 800, dur: 1 }, { id: "wL", to: { s: 2.3, o: 0 }, at: 800, dur: 3600, times: 4, ease: "out" }
          ] }
        ],
        question: "وقتی تنبک صدا می‌دهد، پوست آن چه می‌کند؟",
        options: ["می‌لرزد", "گرم می‌شود", "رنگش عوض می‌شود"], answer: "می‌لرزد" },
      { type: "scene", prompt: "دستت را روی گلویت بگذار", bg: "#f6e3c6",
        /* Arash rests his hand on his throat; when he says «آآآ» his mouth opens, sound goes out, and his throat and
           hand shiver (little lines beside the throat); when he stops, everything is still. Then he sings again,
           for the child to try. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-bg-room" },
          face: { art: "sci-face", at: [80, 34] },
          buzz: { art: "sci-buzz", at: [80, 56], s: 1.6, o: 0 },
          hand: { art: "hand", at: [130, 110], r: -90 },
          waves: { art: "sci-waves", at: [88, 44], o: 0 },
          n1: { art: "sci-note", at: [96, 40], s: 1.6, o: 0 }, n2: { art: "sci-note", at: [96, 40], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "آرش دستش را آرام روی گلویش می‌گذارد.", do: [
            { id: "hand", path: "M130 110Q120 70 102 58", dur: 1600, ease: "out" }
          ] },
          { caption: "حالا می‌گوید «آآآآ». گلویش زیر دستش می‌لرزد!", key: 2000, hold: 5200, do: [
            { id: "face.smile", to: { o: 0 }, at: 300, dur: 200 }, { id: "face.open", to: { o: 1 }, at: 300, dur: 200 },
            { id: "waves", to: { s: 0.6, o: 1 }, at: 500, dur: 1 }, { id: "waves", to: { s: 1.5, o: 0 }, at: 500, dur: 4000, times: 4, ease: "out" },
            { id: "buzz", to: { o: 1 }, at: 600, dur: 200 }, { id: "buzz", to: { x: "+0.6" }, at: 600, dur: 4000, yoyo: true, times: 60 },
            { id: "hand", to: { x: "+0.5" }, at: 600, dur: 4000, yoyo: true, times: 60 },
            { id: "face", to: { y: "+0.3" }, at: 600, dur: 4000, yoyo: true, times: 60 }
          ] },
          { caption: "ساکت می‌شود. لرزش هم تمام می‌شود.", do: [
            { id: "face.open", to: { o: 0 }, dur: 200 }, { id: "face.smile", to: { o: 1 }, dur: 200 },
            { id: "buzz", to: { o: 0 }, dur: 300 }, { id: "waves", to: { o: 0 }, dur: 300 }
          ] },
          { caption: "تو هم امتحان کن: دستت را روی گلویت بگذار و آواز بخوان.", key: 2400, hold: 6000, do: [
            { id: "face.smile", to: { o: 0 }, at: 300, dur: 200 }, { id: "face.open", to: { o: 1 }, at: 300, dur: 200 },
            { id: "face", to: { r: 4 }, at: 500, dur: 4400, yoyo: true, times: 8 },
            { id: "buzz", to: { o: 1 }, at: 500, dur: 200 }, { id: "buzz", to: { x: "+0.6" }, at: 500, dur: 4400, yoyo: true, times: 60 },
            { id: "hand", to: { x: "+0.5" }, at: 500, dur: 4400, yoyo: true, times: 60 },
            { id: "n1", to: { o: 1 }, at: 700, dur: 1 }, { id: "n1", to: { y: "-24", x: "+20", o: 0 }, at: 700, dur: 4400, times: 3 },
            { id: "n2", to: { o: 1 }, at: 1400, dur: 1 }, { id: "n2", to: { y: "-18", x: "+28", o: 0 }, at: 1400, dur: 4000, times: 3 },
            { id: "face.open", to: { o: 0 }, at: 5000, dur: 200 }, { id: "face.smile", to: { o: 1 }, at: 5000, dur: 200 }, { id: "buzz", to: { o: 0 }, at: 5000, dur: 200 }
          ] }
        ],
        question: "وقتی حرف می‌زنیم، کجای بدن ما می‌لرزد؟",
        options: ["گلو", "زانو", "موها"], answer: "گلو" },
      { type: "scene", prompt: "صدا چطور به گوش ما می‌رسد؟",
        /* The school bell swings and shivers; the air beside it is drawn as dots, and the shiver passes from one
           column of dots to the next, across to the ear, which hears it. Farther from the bell the dots shiver less
           and less, and the farther ear hears it quieter. Drawings: js/art/rig-science.js and js/art. */
        bg: "#f3e7d3",
        parts: {
          bracket: { art: "sci-bracket", at: [24, 22], s: 1.2 }, holder: { art: "sci-none", at: [24, 22] },
          bell: { art: "🔔", at: [0, 22], s: 1.1, under: "holder" }, buzzB: { art: "sci-buzz", at: [0, 12], s: 1.4, o: 0, under: "holder" },
          air: { art: "sci-air", at: [46, 40] },
          ear: { art: "👂", at: [134, 56], s: 1.3 },
          front: { art: "sci-arc", at: [44, 40], s: 2.2, o: 0 }
        },
        scenes: [
          { caption: "زنگ مدرسه به صدا درمی‌آید. زنگ می‌لرزد.", key: 600, do: [
            { id: "holder", to: { r: 24 }, at: 200, dur: 3200, yoyo: true, times: 8 },
            { id: "buzzB", to: { o: 1 }, at: 300, dur: 200 }, { id: "bell", to: { x: "+0.5" }, at: 300, dur: 2800, yoyo: true, times: 40 }
          ] },
          { caption: "لرزش زنگ، هوای کنارش را می‌لرزاند.", key: 1400, do: [
            { id: "bell", to: { x: "+0.5" }, dur: 3000, yoyo: true, times: 40 },
            { id: "air.c0", to: { x: 2.4 }, at: 200, dur: 2800, yoyo: true, times: 14 },
            { id: "air.c1", to: { x: 2.4 }, at: 500, dur: 2500, yoyo: true, times: 12 },
            { id: "front", to: { o: 1 }, at: 200, dur: 200 }, { id: "front", path: "M44 40L54 40", at: 200, dur: 1400 }
          ] },
          { caption: "هوا لرزش را دست به دست جلو می‌برد…", key: 2600, hold: 4400, do: [
            { id: "bell", to: { x: "+0.5" }, dur: 4000, yoyo: true, times: 50 },
            { id: "air.c0", to: { x: 2.4 }, dur: 4000, yoyo: true, times: 20 }, { id: "air.c1", to: { x: 2.4 }, at: 300, dur: 3700, yoyo: true, times: 18 },
            { id: "air.c2", to: { x: 2.4 }, at: 600, dur: 3400, yoyo: true, times: 16 }, { id: "air.c3", to: { x: 2.4 }, at: 900, dur: 3100, yoyo: true, times: 16 },
            { id: "air.c4", to: { x: 2.4 }, at: 1200, dur: 2800, yoyo: true, times: 14 }, { id: "air.c5", to: { x: 2.4 }, at: 1500, dur: 2500, yoyo: true, times: 12 },
            { id: "air.c6", to: { x: 2.4 }, at: 1800, dur: 2200, yoyo: true, times: 12 },
            { id: "front", path: "M54 40L94 40", dur: 2400, ease: "linear" }
          ] },
          { caption: "…تا به گوش ما برسد. حالا صدا را می‌شنویم!", key: 1500, hold: 4400, do: [
            { id: "bell", to: { x: "+0.5" }, dur: 4000, yoyo: true, times: 50 },
            { id: "air.c4", to: { x: 2.4 }, dur: 4000, yoyo: true, times: 20 }, { id: "air.c5", to: { x: 2.4 }, at: 200, dur: 3800, yoyo: true, times: 18 },
            { id: "air.c6", to: { x: 2.4 }, at: 400, dur: 3600, yoyo: true, times: 18 }, { id: "air.c7", to: { x: 2.4 }, at: 600, dur: 3400, yoyo: true, times: 16 },
            { id: "air.c8", to: { x: 2.4 }, at: 800, dur: 3200, yoyo: true, times: 16 }, { id: "air.c9", to: { x: 2.4 }, at: 1000, dur: 3000, yoyo: true, times: 14 },
            { id: "front", path: "M94 40L122 40", dur: 1300, ease: "linear" }, { id: "front", to: { o: 0 }, at: 1300, dur: 300 },
            { id: "ear", to: { s: 1.6 }, at: 1300, dur: 1400, yoyo: true, times: 2 },
            { emit: "spark", where: [134, 44], spread: [16, 16], n: 6, at: 1400, dur: 1200 }
          ] },
          { caption: "هرچه دورتر باشیم، صدا آهسته‌تر به گوشمان می‌رسد.", key: 3200, hold: 6000, do: [
            { id: "ear", path: "M134 56L154 58", dur: 1200 }, { id: "ear", to: { s: 1 }, dur: 1200 },
            { id: "front", to: { x: 44, o: 1, s: 2.2 }, at: 1000, dur: 1 }, { id: "front", path: "M44 40L146 40", at: 1001, dur: 4000, ease: "linear" }, { id: "front", to: { o: 0.15, s: 1.2 }, at: 1001, dur: 4000, ease: "linear" },
            { id: "bell", to: { x: "+0.5" }, at: 1000, dur: 4400, yoyo: true, times: 50 },
            { id: "air.c0", to: { x: 2.6 }, at: 1000, dur: 4400, yoyo: true, times: 22 }, { id: "air.c1", to: { x: 2.2 }, at: 1200, dur: 4200, yoyo: true, times: 20 },
            { id: "air.c2", to: { x: 1.9 }, at: 1400, dur: 4000, yoyo: true, times: 20 }, { id: "air.c3", to: { x: 1.6 }, at: 1600, dur: 3800, yoyo: true, times: 18 },
            { id: "air.c4", to: { x: 1.3 }, at: 1800, dur: 3600, yoyo: true, times: 18 }, { id: "air.c5", to: { x: 1 }, at: 2000, dur: 3400, yoyo: true, times: 16 },
            { id: "air.c6", to: { x: 0.8 }, at: 2200, dur: 3200, yoyo: true, times: 16 }, { id: "air.c7", to: { x: 0.6 }, at: 2400, dur: 3000, yoyo: true, times: 14 },
            { id: "air.c8", to: { x: 0.4 }, at: 2600, dur: 2800, yoyo: true, times: 14 }, { id: "air.c9", to: { x: 0.3 }, at: 2800, dur: 2600, yoyo: true, times: 12 }
          ] }
        ],
        question: "صدای زنگ از چه راهی به گوش ما می‌رسد؟",
        options: ["از راه هوا", "از راه نور", "از راه سیم برق"], answer: "از راه هوا" },
      { type: "scene", prompt: "صدا از آب و چوب هم رد می‌شود؟", bg: "#5bb0e0",
        /* Under the sea, one dolphin calls and its sound travels through the water as arcs to the other, which
           turns and calls back. Then at a table: a child's ear is on one end, a fist knocks gently on the other, and
           the sound travels through the wood to the ear. Drawings: js/art/rig-science.js and js/art. */
        parts: {
          sea: { art: "sci-underwater" },
          d1: { art: "sci-dolphin", at: [32, 44], s: 1.3 }, d2: { art: "sci-dolphin", at: [128, 54], s: 1.3, flip: true },
          a1: { art: "sci-arc", at: [52, 44], o: 0 }, a2: { art: "sci-arc", at: [52, 44], o: 0 }, a3: { art: "sci-arc", at: [52, 44], o: 0 },
          b1: { art: "sci-arc", at: [108, 54], flip: true, o: 0 }, b2: { art: "sci-arc", at: [108, 54], flip: true, o: 0 },
          room: { art: "sci-bg-room", o: 0 }, table: { art: "sci-longtable", o: 0 },
          kid: { art: "sci-face", at: [36, 42.4], s: 0.6, r: -90, o: 0 },
          fist: { art: "✊", at: [128, 56], s: 0.8, o: 0 },
          k1: { art: "sci-arc", at: [118, 58.5], s: 0.35, flip: true, o: 0 }, k2: { art: "sci-arc", at: [118, 58.5], s: 0.35, flip: true, o: 0 }
        },
        scenes: [
          { caption: "دلفین‌های خلیج فارس زیر آب با صدا هم را صدا می‌زنند.", key: 1800, do: [
            { id: "d1", to: { r: -10 }, at: 200, dur: 1200, yoyo: true, times: 4 },
            { id: "a1", to: { o: 1 }, at: 600, dur: 1 }, { id: "a1", path: "M52 44L78 47", at: 600, dur: 1600 }, { id: "a1", to: { o: 0 }, at: 1800, dur: 400 },
            { id: "a2", to: { o: 1 }, at: 1100, dur: 1 }, { id: "a2", path: "M52 44L78 47", at: 1100, dur: 1600 }, { id: "a2", to: { o: 0 }, at: 2300, dur: 400 }
          ] },
          { caption: "صدا در آب هم می‌رود. دلفین دیگر صدا را می‌شنود و جواب می‌دهد.", key: 2200, hold: 5600, do: [
            { id: "a1", to: { x: 52, y: 44, o: 1 }, dur: 1 }, { id: "a1", path: "M52 44L108 54", at: 1, dur: 2000 }, { id: "a1", to: { o: 0 }, at: 1800, dur: 300 },
            { id: "a3", to: { o: 1 }, at: 500, dur: 1 }, { id: "a3", path: "M52 44L108 54", at: 500, dur: 2000 }, { id: "a3", to: { o: 0 }, at: 2300, dur: 300 },
            { id: "d2", to: { r: 12 }, at: 2100, dur: 1000, yoyo: true, times: 4 },
            { id: "b1", to: { o: 1 }, at: 2800, dur: 1 }, { id: "b1", path: "M108 54L52 44", at: 2800, dur: 2000 }, { id: "b1", to: { o: 0 }, at: 4600, dur: 300 },
            { id: "b2", to: { o: 1 }, at: 3300, dur: 1 }, { id: "b2", path: "M108 54L52 44", at: 3300, dur: 2000 }, { id: "b2", to: { o: 0 }, at: 5100, dur: 300 },
            { id: "d1", to: { r: -10 }, at: 4800, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "صدا از چوب هم رد می‌شود. گوشت را روی میز بگذار و کسی آن طرف میز آرام به میز بزند.", key: 4400, hold: 8400, do: [
            { id: "room", to: { o: 1 }, dur: 900 }, { id: "table", to: { o: 1 }, dur: 900 },
            { id: "d1", to: { o: 0 }, dur: 600 }, { id: "d2", to: { o: 0 }, dur: 600 },
            { id: "kid", to: { o: 1 }, at: 900, dur: 600 }, { id: "fist", to: { o: 1 }, at: 1300, dur: 500 },
            { id: "fist", to: { y: 50 }, at: 2200, dur: 6000, yoyo: true, times: 16, ease: "in" },
            { id: "k1", to: { o: 1 }, at: 2600, dur: 1 }, { id: "k1", to: { x: "-80", o: 0 }, at: 2600, dur: 5600, times: 4, ease: "linear" },
            { id: "k2", to: { o: 1 }, at: 3300, dur: 1 }, { id: "k2", to: { x: "-80", o: 0 }, at: 3300, dur: 5600, times: 4, ease: "linear" }
          ] },
          { caption: "صدای تق تق را خیلی خوب می‌شنوی!", key: 1400, hold: 4400, do: [
            { id: "fist", to: { y: 50 }, dur: 3600, yoyo: true, times: 10, ease: "in" },
            { id: "k1", to: { x: 118, o: 1 }, dur: 1 }, { id: "k1", to: { x: 38 }, at: 1, dur: 1500, ease: "linear" }, { id: "k1", to: { o: 0 }, at: 1300, dur: 200 },
            { id: "k2", to: { x: 118, o: 1 }, at: 900, dur: 1 }, { id: "k2", to: { x: 38 }, at: 901, dur: 1500, ease: "linear" }, { id: "k2", to: { o: 0 }, at: 2200, dur: 200 },
            { emit: "spark", where: [38, 50], spread: [12, 8], n: 6, at: 1400, dur: 1600 },
            { id: "kid.smile", to: { o: 0 }, at: 1500, dur: 200 }, { id: "kid.open", to: { o: 1 }, at: 1500, dur: 200 },
            { id: "kid.eyes", to: { s: 1.2 }, at: 1500, dur: 1200, yoyo: true, times: 2 }
          ] }
        ],
        question: "زیر آب صدا می‌رود؟",
        options: ["بله، صدا در آب هم می‌رود", "نه، زیر آب هیچ صدایی نیست"], answer: "بله، صدا در آب هم می‌رود" },
      { type: "scene", prompt: "صدای زیر و صدای بم", bg: "#f6e3c6",
        /* The setar's two strings really shiver: the thin one fast, with a busy wave of many small bumps (a high
           sound); the thick one slower, with a wave of a few big bumps (a low sound). Then a sparrow's chirp makes
           the busy wave and a cow's moo the slow one. Drawings: js/art/rig-science.js and js/art. */
        parts: {
          room: { art: "sci-bg-room" },
          setar: { art: "sci-setar", at: [74, 46], s: 1.4 },
          hi: { art: "sci-wave-hi", at: [100, 28], s: 1.2, o: 0 }, lo: { art: "sci-wave-lo", at: [100, 66], s: 1.2, o: 0 },
          branch: { art: "sci-branch", at: [34, 62], s: 1.3, o: 0 }, bird: { art: "sci-sparrow", at: [34, 62], s: 2, o: 0 },
          cow: { art: "🐄", at: [128, 88], s: 2, o: 0 },
          hi2: { art: "sci-wave-hi", at: [54, 42], o: 0 }, lo2: { art: "sci-wave-lo", at: [104, 62], flip: true, o: 0 }
        },
        scenes: [
          { caption: "این سه‌تار است. سیم‌هایش وقتی لرزیده شوند، صدا می‌دهند.", key: 1800, do: [
            { id: "setar.thin", to: { sy: -1 }, at: 600, dur: 1600, yoyo: true, times: 24 },
            { id: "setar.thick", to: { sy: -1 }, at: 600, dur: 1600, yoyo: true, times: 8 }
          ] },
          { caption: "سیم نازک تند تند می‌لرزد و صدای زیر می‌دهد.", key: 1700, hold: 4400, do: [
            { id: "setar.thin", to: { sy: -1 }, at: 600, dur: 3200, yoyo: true, times: 60 },
            { id: "hi", to: { o: 1 }, at: 800, dur: 100 }, { id: "hi", draw: true, at: 800, dur: 1800 }
          ] },
          { caption: "سیم کلفت آرام‌تر می‌لرزد و صدای بم می‌دهد.", key: 1700, hold: 4400, do: [
            { id: "setar.thick", to: { sy: -1 }, at: 400, dur: 3200, yoyo: true, times: 16 },
            { id: "lo", to: { o: 1 }, at: 600, dur: 100 }, { id: "lo", draw: true, at: 600, dur: 1800 }
          ] },
          { caption: "صدای جیک جیک گنجشک زیر است. صدای ماغ گاو بم است.", key: 5200, hold: 7000, do: [
            { id: "setar", to: { o: 0 }, dur: 600 }, { id: "hi", to: { o: 0 }, dur: 600 }, { id: "lo", to: { o: 0 }, dur: 600 },
            { id: "branch", to: { o: 1 }, at: 600, dur: 400 }, { id: "bird", to: { o: 1 }, at: 600, dur: 400 },
            { id: "bird.beak", to: { r: 30 }, at: 1200, dur: 2000, yoyo: true, times: 16 },
            { id: "hi2", to: { o: 1 }, at: 1300, dur: 100 }, { id: "hi2", draw: true, at: 1300, dur: 1600 },
            { id: "cow", to: { o: 1 }, at: 3200, dur: 400 },
            { id: "cow", to: { sy: 1.06, r: -4 }, at: 3800, dur: 2600, yoyo: true, times: 2 },
            { id: "lo2", to: { o: 1 }, at: 3900, dur: 100 }, { id: "lo2", draw: true, at: 3900, dur: 2000 }
          ] }
        ],
        question: "سیم نازک چه صدایی دارد؟",
        options: ["صدای زیر", "صدای بم", "هیچ صدایی"], answer: "صدای زیر" },
      { type: "home", pic: "🥣 🍚", text: "لرزش صدا را با چشم ببین!",
        need: ["یک کاسه", "سلفون آشپزخانه", "چند دانه برنج یا کمی نمک", "یک قابلمه و یک قاشق چوبی", "یک کش پول و یک ظرف پلاستیکی بی‌در"],
        steps: [
          "روی کاسه را با سلفون محکم و صاف بپوشانید و چند دانه برنج روی سلفون بریزید.",
          "قابلمه را نزدیک کاسه نگه دارید و با قاشق چوبی محکم به آن بزنید. برنج‌ها روی سلفون می‌پرند!",
          "یک بار آرام بزنید و یک بار محکم. پیش از هر بار، کودک حدس بزند برنج‌ها چقدر می‌پرند.",
          "کش را دور ظرف پلاستیکی ببندید، با انگشت بکشید و رها کنید. کش می‌لرزد و صدا می‌دهد. بعد کش را سفت‌تر دور ظرف ببندید: صدایش زیرتر می‌شود."
        ],
        ask: "چرا برنج‌ها پریدند؟ وقتی محکم‌تر زدی، چه فرقی کرد؟" }
    ]
  }
);
