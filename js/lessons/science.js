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
    id: "science-seed-7", subject: "science", level: "seed", emoji: "🐣", title: "بچه‌ها بزرگ می‌شوند",
    steps: [
      { type: "scene", prompt: "ببین چه کسی بزرگ می‌شود", bg: "#cdeaf7",
        /* Then and now: a kitten, a sapling and little Arash, each small; days and months pass (the sun goes round,
           the sky goes dark and light) and all three grow, while the ball next to them stays just as it was. Then
           the child taps the ones that grew. Drawings: js/art/rig-science.js, cat-side from js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [22, 16] }, night: { art: "sci-night", o: 0 },
          tree: { art: "sci-tree", at: [82, 82], s: 0.22, o: 0 },
          cat: { art: "cat-side", at: [-12, 84], s: 0.9 },
          boy: { art: "👦", at: [180, 85], s: 0.6, flip: true },
          ball: { art: "sci-ball", at: [152, 81], s: 1.1 },
          ring: { art: "sci-ring", at: [152, 81], s: 1, o: 0 }
        },
        scenes: [
          { caption: "این بچه‌گربه کوچک است.", key: 2400, do: [
            { id: "cat", walk: [30, 84], dur: 2000, steps: 6 },
            { id: "cat.head", to: { r: -12 }, at: 2200, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "این نهال کوچک است.", do: [
            { id: "tree", to: { o: 1 }, dur: 800 },
            { id: "tree", to: { r: 4 }, at: 900, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "این آرش است، وقتی کوچولو بود.", key: 2600, do: [
            { id: "boy", walk: [132, 85], dur: 2400, steps: 8 }
          ] },
          { caption: "روزها و ماه‌ها گذشت. گربه، نهال و آرش بزرگ شدند!", key: 5600, hold: 6800, do: [
            { id: "sun", path: "M22 16Q90 -10 170 56", dur: 1000, ease: "in" },
            { id: "night", to: { o: 0.75 }, at: 800, dur: 300 }, { id: "night", to: { o: 0 }, at: 1400, dur: 300 },
            { id: "sun", path: "M-10 56Q90 -10 170 56", at: 1300, dur: 1600, ease: "linear" },
            { id: "night", to: { o: 0.75 }, at: 2700, dur: 300 }, { id: "night", to: { o: 0 }, at: 3300, dur: 300 },
            { id: "sun", path: "M-10 56Q4 22 22 16", at: 3200, dur: 900, ease: "out" },
            { id: "cat", to: { s: 1.8 }, at: 300, dur: 4000 },
            { id: "tree", to: { s: 0.86 }, at: 300, dur: 4000 },
            { id: "boy", to: { s: 1.15 }, at: 300, dur: 4000 }
          ] },
          { caption: "ولی توپ همان‌قدر ماند. توپ بزرگ نمی‌شود.", key: 1600, hold: 5200, do: [
            { id: "ring", to: { o: 1 }, dur: 300 }, { id: "ring", to: { s: 1.3 }, at: 300, dur: 800, yoyo: true, times: 2 },
            { id: "ball", path: "M152 81Q152 66 152 81", at: 1800, dur: 900, ease: "linear" },
            { id: "ball", path: "M152 81Q152 70 152 81", at: 2700, dur: 800, ease: "linear" },
            { id: "ring", to: { o: 0 }, at: 3800, dur: 400 }
          ] },
          { caption: "گربه، درخت و آرش زنده‌اند. زنده‌ها بزرگ می‌شوند.", hold: 4000, do: [
            { id: "cat.head", to: { r: -14 }, dur: 900, yoyo: true, times: 2 },
            { id: "boy", to: { y: "-3" }, at: 300, dur: 900, yoyo: true, times: 2 },
            { id: "tree", to: { r: 3 }, at: 600, dur: 1400, yoyo: true, times: 2 }
          ],
            wait: { tap: ["cat", "tree", "boy"], hint: "روی چیزهایی بزن که بزرگ شدند!",
              each: [{ id: "$", to: { y: "-3" }, dur: 500, yoyo: true, times: 2 }] } }
        ],
        question: "کدام بزرگ می‌شود؟", pic: true,
        options: [{ label: "🪑", value: "صندلی" }, { label: "🐣", value: "جوجه" }, { label: "⚽", value: "توپ" }], answer: "جوجه" },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "اول تخم بود، بعد جوجه شد، بعد مرغ. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🥚", say: "تخم" }, { pic: "🐣", say: "جوجه" }, { pic: "🐔", say: "مرغ" }] },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "دانه کوچک است. درخت بزرگ است. از کوچک تا بزرگ بچین.", numbered: true,
        items: [{ pic: "🌰", say: "دانه" }, { pic: "🌱", say: "نهال" }, { pic: "🌳", say: "درخت" }] },
      { type: "sort", prompt: "بزرگ می‌شود یا نه؟", say: "کدام بزرگ می‌شود و کدام بزرگ نمی‌شود؟",
        baskets: [{ label: "بزرگ می‌شود", pic: "🌱", value: "grows" }, { label: "بزرگ نمی‌شود", pic: "🧱", value: "not" }],
        items: [
          { pic: "🐥", say: "جوجه", basket: "grows" },
          { pic: "🌻", say: "آفتابگردان", basket: "grows" },
          { pic: "🐛", say: "کرم", basket: "grows" },
          { pic: "🧸", say: "عروسک", basket: "not" },
          { pic: "🪨", say: "سنگ", basket: "not" },
          { pic: "🚲", say: "دوچرخه", basket: "not" }
        ] },
      { type: "home", pic: "📏 🚪", text: "تو هم بزرگ می‌شوی! بیا قدت را علامت بزنیم.",
        need: ["مداد یا یک تکه نوار چسب", "یک کتاب", "عکس‌های کودکی و یک لباس کوچک قدیمی کودک، اگر دارید"],
        steps: [
          "کودک پابرهنه، پشت به چارچوب در بایستد. کتاب را صاف روی سرش بگذارید و زیر آن علامت بزنید.",
          "تاریخ امروز را کنار علامت بنویسید.",
          "با هم عکس‌های نوزادی کودک را ببینید یا لباس کوچک قدیمی‌اش را کنار خودش بگیرید.",
          "چند ماه بعد دوباره قد بگیرید و دو علامت را با هم مقایسه کنید."
        ],
        ask: "عروسکت هم بزرگ می‌شود؟ چرا نه؟" }
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
    id: "science-seed-8", subject: "science", level: "seed", emoji: "🦵", title: "بدن من چه کار می‌کند؟",
    steps: [
      { type: "scene", prompt: "ببین سارا با بدنش چه کار می‌کند", bg: "#cdeaf7",
        /* Sara walks to the apple tree on her legs, reaches up and picks an apple with her hand, brings it to her
           mouth and bites it; then she hops beside a rabbit and flaps her arms as a sparrow flies by. Last, a ring
           goes round her legs, her hand and her mouth. Her hand is at the shoulder (72, 66.5) plus the arm's 9.1
           units turned by armF's angle, so the apple follows those points. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [140, 14] },
          tree: { art: "sci-tree", at: [92, 84], s: 0.9 },
          apple: { art: "sci-apple", at: [75.1, 57.9], s: 1.1 },
          rabbit: { art: "🐰", at: [-16, 84], s: 1 },
          girl: { art: "👧", at: [6, 84], s: 1.2 },
          bird: { art: "sci-sparrow", at: [-14, 30], s: 1.3 },
          ring: { art: "sci-ring", at: [72, 79], s: 1, o: 0 }
        },
        scenes: [
          { caption: "سارا با پاهایش راه می‌رود.", key: 2400, do: [
            { id: "girl", walk: [72, 84], dur: 3000, steps: 10 }
          ] },
          { caption: "با دستش یک سیب از درخت می‌چیند.", key: 2900, do: [
            { id: "girl.armF", to: { r: -160 }, dur: 900 },
            { id: "apple", to: { r: -10 }, at: 1000, dur: 300, yoyo: true, times: 2 },
            { id: "girl.armF", to: { r: -90 }, at: 1800, dur: 1000 },
            { id: "apple", path: "M75.1 57.9A9.1 9.1 0 0 1 81.1 66.5", at: 1800, dur: 1000 }
          ] },
          { caption: "با دهانش سیب را گاز می‌زند. به‌به!", key: 2400, do: [
            { id: "girl.armF", to: { r: -140 }, dur: 800 },
            { id: "apple", path: "M81.1 66.5A9.1 9.1 0 0 0 77.9 59.5", dur: 800 },
            { id: "apple.whole", to: { o: 0 }, at: 1400, dur: 100 }, { id: "apple.bitten", to: { o: 1 }, at: 1400, dur: 100 },
            { id: "girl", to: { sy: 0.98 }, at: 1600, dur: 1600, yoyo: true, times: 6 },
            { emit: "spark", where: [78, 56], spread: [8, 6], n: 4, at: 1500, dur: 900 }
          ] },
          { caption: "حالا سارا مثل خرگوش می‌پرد!", key: 4050, hold: 7000, do: [
            { id: "apple", to: { o: 0 }, dur: 400 }, { id: "girl.armF", to: { r: 0 }, dur: 600 },
            { id: "rabbit", path: "M-16 84Q-6 68 4 84Q14 68 24 84Q34 68 44 84", at: 400, dur: 2400, ease: "linear" },
            { id: "girl", path: "M72 84Q78 62 84 84", at: 1400, dur: 900, ease: "linear" },
            { id: "girl", path: "M84 84Q90 62 96 84", at: 2500, dur: 900, ease: "linear" },
            { id: "girl", path: "M96 84Q102 62 108 84", at: 3600, dur: 900, ease: "linear" },
            { id: "rabbit", path: "M44 84Q54 68 64 84Q74 68 84 84", at: 3000, dur: 1600, ease: "linear" }
          ] },
          { caption: "مثل گنجشک دست‌هایش را بالا و پایین می‌برد!", key: 2600, hold: 6000, do: [
            { id: "bird", path: "M-14 30Q60 10 180 26", dur: 5600, ease: "linear" },
            { id: "bird.wing", to: { r: -40 }, dur: 5600, yoyo: true, times: 28 },
            { id: "girl.armF", to: { r: -130 }, at: 600, dur: 4800, yoyo: true, times: 8 },
            { id: "girl.armB", to: { r: -130 }, at: 600, dur: 4800, yoyo: true, times: 8 }
          ] },
          { caption: "پاها برای راه رفتن، دست‌ها برای گرفتن، دهان برای خوردن.", key: 1200, hold: 7600, do: [
            { id: "ring", to: { x: 108, y: 79, o: 1 }, dur: 400 }, { id: "girl.legF", to: { r: 20 }, at: 400, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { x: 117, y: 66, s: 0.8 }, at: 2400, dur: 500 }, { id: "girl.armF", to: { r: -90 }, at: 2900, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { x: 112, y: 62, s: 0.6 }, at: 4800, dur: 500 }, { id: "girl", to: { sy: 0.98 }, at: 5300, dur: 800, yoyo: true, times: 2 }
          ] }
        ],
        question: "با کدام راه می‌رویم؟", pic: true,
        options: [{ label: "👂", value: "گوش" }, { label: "🦵", value: "پا" }, { label: "👃", value: "بینی" }], answer: "پا" },
      { type: "pairs", prompt: "هر کدام چه کار می‌کند؟", say: "با چشم کتاب را می‌بینیم. با پا کفش می‌پوشیم. حالا جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "👀", say: "چشم" }, { pic: "📖", say: "کتاب" }],
          [{ pic: "👂", say: "گوش" }, { pic: "🔔", say: "زنگ" }],
          [{ pic: "✋", say: "دست" }, { pic: "⚽", say: "توپ" }],
          [{ pic: "🦶", say: "پا" }, { pic: "👟", say: "کفش" }],
          [{ pic: "👄", say: "دهان" }, { pic: "🍎", say: "سیب" }]
        ] },
      { type: "choose", prompt: "مداد را با کدام می‌گیریم؟", say: "مداد را با کدام می‌گیریم؟", pic: true,
        options: [{ label: "✋", value: "دست" }, { label: "👂", value: "گوش" }, { label: "👀", value: "چشم" }], answer: "دست" },
      { type: "choose", prompt: "بوی نان تازه را با کدام می‌فهمیم؟", say: "بوی نان تازه را با کدام می‌فهمیم؟", pic: true,
        options: [{ label: "🦵", value: "پا" }, { label: "👃", value: "بینی" }, { label: "✋", value: "دست" }], answer: "بینی" },
      { type: "doit", pic: "🐰 🦆 🐢", text: "مثل حیوان‌ها راه برو!",
        list: ["مثل خرگوش بپر.", "مثل اردک راه برو.", "مثل گنجشک بال بزن.", "مثل گربه چهار دست و پا برو.", "مثل لاک‌پشت خیلی آهسته برو."],
        say: "مثل حیوان‌ها راه برو! مثل خرگوش بپر. مثل اردک راه برو. مثل گنجشک بال بزن. مثل گربه چهار دست و پا برو. مثل لاک‌پشت خیلی آهسته برو. با کدام قسمت بدنت این کارها را کردی؟" }
    ]
  },
  {
    id: "science-seed-9", subject: "science", level: "seed", emoji: "🧸", title: "نرم یا سفت؟",
    steps: [
      { type: "choose", prompt: "کدام نرم است؟", say: "با دست لمس می‌کنیم و می‌فهمیم چیزی نرم است یا سفت. کدام نرم است؟", pic: true,
        options: [{ label: "🪨", value: "سنگ" }, { label: "🧸", value: "عروسک" }, { label: "🔑", value: "کلید" }], answer: "عروسک" },
      { type: "sort", prompt: "نرم یا سفت؟", say: "اگر فشارش بدهی، فرو می‌رود؟ نرم‌ها یک طرف، سفت‌ها یک طرف.",
        baskets: [{ label: "نرم", pic: "🧶", value: "soft" }, { label: "سفت", pic: "🧱", value: "hard" }],
        items: [
          { pic: "🧸", say: "عروسک", basket: "soft" },
          { pic: "🧽", say: "اسفنج", basket: "soft" },
          { pic: "🧦", say: "جوراب", basket: "soft" },
          { pic: "🪨", say: "سنگ", basket: "hard" },
          { pic: "🥄", say: "قاشق", basket: "hard" },
          { pic: "🪑", say: "صندلی چوبی", basket: "hard" }
        ] },
      { type: "choose", show: "🧱", prompt: "اگر دستت را روی آجر بکشی، چطور است؟", say: "اگر دستت را روی آجر بکشی، چطور است؟ زبر است یا صاف؟",
        options: ["زبر", "صاف"], answer: "زبر" },
      { type: "choose", show: "🪞", prompt: "اگر دستت را روی آینه بکشی، چطور است؟", say: "اگر دستت را روی آینه بکشی، چطور است؟ زبر است یا صاف؟",
        options: ["زبر", "صاف"], answer: "صاف" },
      { type: "choose", prompt: "کدام سرد است؟", say: "کدام را اگر لمس کنی، سرد است؟", pic: true,
        options: [{ label: "☕", value: "چای" }, { label: "🧊", value: "یخ" }, { label: "🍞", value: "نان تازه" }], answer: "یخ" },
      { type: "home", pic: "✋ 🙈", text: "با چشم بسته لمس کن و بگو: نرم یا سفت؟ زبر یا صاف؟",
        need: ["چند چیز از خانه: بالش، قاشق فلزی، قاشق چوبی، اسفنج ظرف‌شویی، سنگ، یک تکه پارچه، یک کاسه", "یک دستمال برای بستن چشم، اگر کودک دوست دارد"],
        steps: [
          "کودک چشمش را ببندد. هر چیز را در دستش بگذارید و بپرسید: «نرم است یا سفت؟ زبر است یا صاف؟»",
          "چیزها را دو دسته کنید: نرم‌ها و سفت‌ها. بعد دوباره دسته کنید: زبرها و صاف‌ها.",
          "اسفنج ظرف‌شویی را برگردانید: یک طرفش زبر است و یک طرفش نرم.",
          "قاشق فلزی و قاشق چوبی را که در یک اتاق بوده‌اند، با هم لمس کنید. کدام سردتر است؟"
        ],
        ask: "با کدام حس فهمیدی؟ بدون نگاه کردن چطور فهمیدی؟" }
    ]
  },
  {
    id: "science-seed-10", subject: "science", level: "seed", emoji: "🎯", title: "بازی حس‌ها",
    steps: [
      { type: "pairs", prompt: "هر کدام را با چه می‌فهمیم؟", say: "بوی نان را با بینی می‌فهمیم. حالا جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "👃", say: "بینی" }, { pic: "🍞", say: "بوی نان" }],
          [{ pic: "👀", say: "چشم" }, { pic: "⭐", say: "ستاره" }],
          [{ pic: "👂", say: "گوش" }, { pic: "🎵", say: "آهنگ" }],
          [{ pic: "👅", say: "زبان" }, { pic: "🍉", say: "مزه هندوانه" }],
          [{ pic: "✋", say: "دست" }, { pic: "🧶", say: "کاموای نرم" }]
        ] },
      { type: "pairs", prompt: "با کدام قسمت بدن؟", say: "توپ را با پا شوت می‌کنیم. جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🦵", say: "پا" }, { pic: "⚽", say: "شوت کردن" }],
          [{ pic: "✋", say: "دست" }, { pic: "✏️", say: "نوشتن" }],
          [{ pic: "👀", say: "چشم" }, { pic: "📖", say: "دیدن کتاب" }],
          [{ pic: "👂", say: "گوش" }, { pic: "☎️", say: "شنیدن صدای تلفن" }]
        ] },
      { type: "sort", prompt: "قرمز یا زرد؟", say: "قرمزها یک طرف، زردها یک طرف.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "زرد", pic: "🟡", value: "yellow" }],
        items: [
          { pic: "🍅", say: "گوجه‌فرنگی", basket: "red" },
          { pic: "🍓", say: "توت‌فرنگی", basket: "red" },
          { pic: "🍒", say: "آلبالو", basket: "red" },
          { pic: "🍌", say: "موز", basket: "yellow" },
          { pic: "🍋", say: "لیمو", basket: "yellow" },
          { pic: "🌻", say: "آفتابگردان", basket: "yellow" }
        ] },
      { type: "sort", prompt: "نرم یا سفت؟", say: "نرم‌ها یک طرف، سفت‌ها یک طرف.",
        baskets: [{ label: "نرم", pic: "🧶", value: "soft" }, { label: "سفت", pic: "🧱", value: "hard" }],
        items: [
          { pic: "🐑", say: "پشم گوسفند", basket: "soft" },
          { pic: "🧣", say: "شال‌گردن", basket: "soft" },
          { pic: "🛏️", say: "تشک", basket: "soft" },
          { pic: "🔩", say: "پیچ", basket: "hard" },
          { pic: "✏️", say: "مداد", basket: "hard" },
          { pic: "🥚", say: "پوست تخم‌مرغ", basket: "hard" }
        ] },
      { type: "home", pic: "🔍 🌈", text: "بازی «من چیزی می‌بینم که…»",
        need: ["هیچ چیز! فقط چشم، گوش، بینی و دست"],
        steps: [
          "در خانه یا در پارک بازی کنید. یکی می‌گوید: «من چیزی می‌بینم که قرمز است.» دیگری حدس می‌زند.",
          "با حس‌های دیگر هم بازی کنید: «چیزی را لمس می‌کنم که نرم است»، «صدایی می‌شنوم که بلند است»، «بویی می‌آید که خوب است».",
          "نوبتی بازی کنید تا کودک هم سؤال بپرسد.",
          "آخر بازی بپرسید: «امروز با کدام حس بیشتر بازی کردیم؟»"
        ],
        ask: "کدام حس برای این بازی بیشتر به کارت آمد؟" }
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
    id: "science-seed-11", subject: "science", level: "seed", emoji: "🍁", title: "گیاه‌های دور و بر ما",
    steps: [
      { type: "scene", prompt: "بیا در باغ گیاه‌ها را ببینیم", bg: "#cdeaf7",
        /* A garden with a plane tree, a pomegranate tree and a date palm, grass and flowers; Sara walks in. The
           camera comes close to each tree in turn, so its leaves can be seen: wide like a hand, small and narrow,
           very long. Then the wind blows one leaf off each tree, and the camera looks at the three leaves on the
           grass for the child to tap. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [148, 12], s: 0.8 },
          plane: { art: "sci-plane-tree", at: [32, 80] }, pom: { art: "sci-pom-tree", at: [84, 80] }, palm: { art: "sci-palm", at: [128, 80] },
          g1: { art: "sci-grass", at: [12, 88], s: 0.8 }, g2: { art: "sci-grass", at: [114, 89], s: 0.8 }, g3: { art: "sci-grass", at: [148, 88], s: 0.7 },
          f1: { art: "🌷", at: [56, 88], s: 0.45 }, f2: { art: "🌼", at: [64, 89], s: 0.4 }, f3: { art: "🌷", at: [104, 88], s: 0.45 }, f4: { art: "🌼", at: [140, 89], s: 0.4 },
          girl: { art: "👧", at: [178, 86], s: 1.1, flip: true },
          wind: { art: "sci-wind", at: [2, 40], s: 1.4, o: 0 },
          leafP: { art: "sci-leaf-plane", at: [40, 48], s: 0.8, o: 0 }, leafM: { art: "sci-leaf-pom", at: [90, 46], s: 1, o: 0 },
          leafL: { art: "sci-leaf-palm", at: [122, 26], s: 0.8, r: -20, o: 0 }
        },
        scenes: [
          { caption: "در باغ گیاه‌های زیادی هست: درخت، چمن و گل.", key: 2800, do: [
            { id: "girl", walk: [112, 86], dur: 3000, steps: 9 },
            { id: "palm.fronds", to: { r: 4 }, dur: 3600, yoyo: true, times: 4 },
            { id: "f1", to: { r: 10 }, dur: 1800, yoyo: true, times: 4 }, { id: "f3", to: { r: -10 }, dur: 1800, yoyo: true, times: 4 },
            { id: "f2", to: { r: -8 }, at: 300, dur: 1800, yoyo: true, times: 4 }, { id: "f4", to: { r: 8 }, at: 300, dur: 1800, yoyo: true, times: 4 }
          ] },
          { caption: "این درخت چنار است. برگ‌هایش پهن است، مثل دست.", key: 2600, hold: 5200, do: [
            { cam: { x: 32, y: 32, zoom: 2.6 }, dur: 1400 },
            { id: "plane", to: { r: 1.5 }, at: 1600, dur: 2400, yoyo: true, times: 2 }
          ] },
          { caption: "این درخت انار است. برگ‌هایش کوچک و باریک است. انار هم دارد!", key: 2600, hold: 6000, do: [
            { cam: { x: 84, y: 54, zoom: 3 }, dur: 1400 },
            { id: "pom.fruits", to: { s: 1.06 }, at: 2000, dur: 1600, yoyo: true, times: 2 }
          ] },
          { caption: "این درخت خرما است. اسمش نخل است. برگ‌هایش خیلی دراز است.", key: 2600, hold: 5600, do: [
            { cam: { x: 128, y: 30, zoom: 2.4 }, dur: 1400 },
            { id: "palm.fronds", to: { r: 5 }, at: 1400, dur: 3600, yoyo: true, times: 4 }
          ] },
          { caption: "باد وزید و از هر درخت یک برگ افتاد.", key: 3500, hold: 5400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1200 },
            { id: "wind", to: { o: 1 }, at: 1000, dur: 100 }, { id: "wind", draw: true, at: 1000, dur: 1400 }, { id: "wind", to: { o: 0 }, at: 3400, dur: 500 },
            { id: "palm.fronds", to: { r: 8 }, at: 1200, dur: 1400, yoyo: true, times: 2 },
            { id: "plane", to: { r: 2 }, at: 1200, dur: 1400, yoyo: true, times: 2 }, { id: "pom", to: { r: 3 }, at: 1200, dur: 1400, yoyo: true, times: 2 },
            { id: "leafP", to: { o: 1 }, at: 1400, dur: 100 }, { id: "leafP", path: "M40 48Q30 66 52 72T66 85", at: 1400, dur: 2600 }, { id: "leafP", to: { r: 380 }, at: 1400, dur: 2600 },
            { id: "leafM", to: { o: 1 }, at: 1700, dur: 100 }, { id: "leafM", path: "M90 46Q102 62 88 72T81 86", at: 1700, dur: 2400 }, { id: "leafM", to: { r: 410 }, at: 1700, dur: 2400 },
            { id: "leafL", to: { o: 1 }, at: 2000, dur: 100 }, { id: "leafL", path: "M122 26Q144 50 112 64T97 85", at: 2000, dur: 2800 }, { id: "leafL", to: { r: 78 }, at: 2000, dur: 2800 }
          ] },
          { caption: "سه برگ با سه شکل!", hold: 3000, do: [
            { cam: { x: 80, y: 71, zoom: 2.4 }, dur: 1400 }
          ],
            wait: { tap: ["leafP", "leafM", "leafL"], hint: "روی هر برگ بزن!",
              each: [{ id: "$", to: { s: "+0.2" }, dur: 500, yoyo: true, times: 2 }] } }
        ],
        question: "برگ چنار شبیه چیست؟", pic: true,
        options: [{ label: "🥕", value: "هویج" }, { label: "✋", value: "دست" }, { label: "⚽", value: "توپ" }], answer: "دست" },
      { type: "choose", prompt: "کدام درخت برگ‌های خیلی دراز دارد؟", say: "کدام درخت برگ‌های خیلی دراز دارد؟", pic: true,
        options: [{ label: "🌳", value: "چنار" }, { label: "🌴", value: "نخل" }, { label: "🌲", value: "کاج" }], answer: "نخل" },
      { type: "sort", prompt: "درخت یا گل؟", say: "درخت‌ها یک طرف، گل‌ها یک طرف.",
        baskets: [{ label: "درخت", pic: "🌳", value: "tree" }, { label: "گل", pic: "🌷", value: "flower" }],
        items: [
          { pic: "🌴", say: "نخل", basket: "tree" },
          { pic: "🌲", say: "کاج", basket: "tree" },
          { pic: "🌳", say: "چنار", basket: "tree" },
          { pic: "🌻", say: "آفتابگردان", basket: "flower" },
          { pic: "🌹", say: "گل سرخ", basket: "flower" },
          { pic: "🌼", say: "گل بابونه", basket: "flower" }
        ] },
      { type: "sort", prompt: "گیاه است یا نه؟", say: "کدام گیاه است و کدام گیاه نیست؟",
        baskets: [{ label: "گیاه", pic: "🌿", value: "plant" }, { label: "گیاه نیست", pic: "🪨", value: "not" }],
        items: [
          { pic: "🌾", say: "گندم", basket: "plant" },
          { pic: "🪴", say: "گلدان گیاه", basket: "plant" },
          { pic: "🌵", say: "کاکتوس", basket: "plant" },
          { pic: "🦋", say: "پروانه", basket: "not" },
          { pic: "🐛", say: "کرم", basket: "not" },
          { pic: "🪨", say: "سنگ", basket: "not" }
        ] },
      { type: "home", pic: "🍂 🖍️", text: "بیا برویم برگ جمع کنیم!",
        need: ["یک کیسه", "کاغذ سفید نازک", "مداد شمعی"],
        steps: [
          "در کوچه یا پارک قدم بزنید و فقط برگ‌هایی را که روی زمین افتاده‌اند جمع کنید. برگ را از درخت نکنید.",
          "برگ‌ها را کنار هم بچینید: کدام بزرگ است، کدام کوچک؟ کدام پهن است، کدام باریک؟ لبه کدام دندانه دارد؟",
          "برگی را زیر کاغذ بگذارید و با پهلوی مداد شمعی روی کاغذ بکشید تا شکل برگ و رگ‌هایش پیدا شود.",
          "اگر بلدید، اسم درخت هر برگ را بگویید: چنار، توت، انار، بید…"
        ],
        ask: "کدام برگ را بیشتر دوست داشتی؟ شکلش چطور بود؟" }
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
    id: "science-seed-12", subject: "science", level: "seed", emoji: "🐥", title: "مادرها و بچه‌ها",
    steps: [
      { type: "scene", prompt: "ببین بچه هر حیوان کیست", bg: "#cdeaf7",
        /* A farm and, further along, a rice paddy (the world is 320 wide; the camera pans). The hen gets up from her
           eggs, one egg cracks and a chick comes out; the chick walks after its mother. The lamb runs to the sheep
           and drinks under her belly. Then the camera goes on to the paddy, where tadpoles swim under the water
           near their mother frog. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, paddy: { art: "sci-paddy", at: [160, 0] }, sun: { art: "sci-sun", at: [22, 14] },
          nestBack: { art: "sci-nest-back", at: [44, 85], s: 1.3 },
          eggs: { art: "sci-eggs", at: [44, 84], s: 1.3 }, chick: { art: "sci-chick", at: [47.9, 84.5], s: 1.3, o: 0 },
          nest: { art: "sci-nest", at: [44, 85], s: 1.3 },
          hen: { art: "🐔", at: [44, 84], s: 1.3, flip: true },
          walker: { art: "🐥", at: [48, 85], s: 0.42, o: 0 },
          sheep: { art: "sci-sheep", at: [136, 84], s: 1.6 }, lamb: { art: "sci-sheep", at: [182, 84], s: 0.7 },
          frog: { art: "🐸", at: [200, 46], s: 0.6 },
          tp1: { art: "sci-tadpole", at: [210, 58], s: 1.3 }, tp2: { art: "sci-tadpole", at: [226, 64], s: 1.3 }, tp3: { art: "sci-tadpole", at: [244, 56], s: 1.3 },
          veil: { art: "sci-veil", at: [160, 0] }
        },
        scenes: [
          { caption: "مرغ روی تخم‌هایش نشسته است.", do: [
            { id: "hen", to: { sy: 0.94 }, dur: 2400, yoyo: true, times: 4 },
            { id: "hen", to: { r: -6 }, at: 400, dur: 1600, yoyo: true, times: 2 }
          ] },
          { caption: "مرغ بلند شد. جوجه از تخم بیرون آمد!", key: 4200, hold: 6400, do: [
            { id: "hen", path: "M44 84Q54 72 64 85", dur: 1100 },
            { cam: { x: 50, y: 72, zoom: 2.6 }, at: 1000, dur: 1000 },
            { id: "eggs.top", to: { r: 12 }, at: 2000, dur: 1200, yoyo: true, times: 6 },
            { id: "eggs.top", to: { y: -5, x: 3, r: 70, o: 0 }, at: 3400, dur: 700 },
            { id: "chick", to: { o: 1 }, at: 3300, dur: 200 }, { id: "chick", to: { y: 83.5 }, at: 3400, dur: 600, ease: "back" },
            { id: "eggs.bottom", to: { o: 0 }, at: 4300, dur: 400 },
            { id: "chick", to: { y: "-1.2" }, at: 4300, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "جوجه دنبال مادرش راه می‌رود.", key: 4400, hold: 5600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "chick", to: { o: 0 }, at: 1000, dur: 300 }, { id: "walker", to: { o: 1 }, at: 1000, dur: 300 },
            { id: "hen", path: "M64 85L100 85", at: 1300, dur: 3600, ease: "linear" }, { id: "hen", to: { r: 5 }, at: 1300, dur: 3600, yoyo: true, times: 8 },
            { id: "walker", path: "M48 85L84 85", at: 1900, dur: 3000, ease: "linear" }, { id: "walker", to: { y: "-1.2" }, at: 1900, dur: 3000, yoyo: true, times: 10 }
          ] },
          { caption: "این گوسفند است و این بره‌اش. بره پیش مادرش می‌دود و شیر می‌خورد.", key: 4400, hold: 7000, do: [
            { id: "lamb", path: "M182 84L155 84", dur: 1800, ease: "out" }, { id: "lamb", to: { y: "-1.5" }, dur: 1800, yoyo: true, times: 6 },
            { id: "sheep.eyes", to: { o: 0 }, at: 1600, dur: 200 }, { id: "sheep.eyes", to: { o: 1 }, at: 1800, dur: 200 },
            { id: "lamb", to: { r: -8 }, at: 2200, dur: 1000 },
            { id: "lamb", to: { r: -14 }, at: 3200, dur: 3200, yoyo: true, times: 8 }
          ] },
          { caption: "این قورباغه است. بچه‌هایش در آب شنا می‌کنند. بچه‌قورباغه شبیه مادرش نیست!", key: 3600, hold: 8000, do: [
            { id: "lamb", to: { r: 0 }, dur: 400 },
            { cam: { x: 232, y: 50, zoom: 1.2 }, dur: 2200, ease: "inout" },
            { id: "frog", to: { y: "-1" }, at: 2200, dur: 1600, yoyo: true, times: 4 },
            { id: "tp1.tail", to: { r: 28 }, dur: 7600, yoyo: true, times: 46 }, { id: "tp2.tail", to: { r: 28 }, dur: 7600, yoyo: true, times: 46 }, { id: "tp3.tail", to: { r: 28 }, dur: 7600, yoyo: true, times: 46 },
            { id: "tp1", path: "M210 58C222 52 232 64 244 62", at: 2000, dur: 5200 },
            { id: "tp2", path: "M226 64C236 72 248 72 258 66", at: 2200, dur: 5200 },
            { id: "tp3", path: "M244 56C254 50 262 54 268 60", at: 2400, dur: 5200 }
          ] }
        ],
        question: "مادر جوجه کیست؟", pic: true,
        options: [{ label: "🐑", value: "گوسفند" }, { label: "🐔", value: "مرغ" }, { label: "🐸", value: "قورباغه" }], answer: "مرغ" },
      { type: "pairs", prompt: "مادر و بچه را پیدا کن", say: "جوجه بچه مرغ است. بچه هر مادر را پیدا کن.",
        pairs: [
          [{ pic: "🐔", say: "مرغ" }, { pic: "🐥", say: "جوجه" }],
          [{ pic: "🦋", say: "پروانه" }, { pic: "🐛", say: "کرم پروانه" }],
          [{ pic: "🐕", say: "سگ" }, { pic: "🐶", say: "توله‌سگ" }],
          [{ pic: "🐈", say: "گربه" }, { pic: "🐱", say: "بچه‌گربه" }]
        ] },
      { type: "choose", prompt: "بچه‌قورباغه کجا زندگی می‌کند؟", say: "بچه‌قورباغه کجا زندگی می‌کند؟", pic: true,
        options: [{ label: "🌳", value: "روی درخت" }, { label: "🌊", value: "در آب" }, { label: "🏜️", value: "در کویر" }], answer: "در آب" },
      { type: "choose", prompt: "کدام از تخم بیرون می‌آید؟", say: "کدام بچه از تخم بیرون می‌آید؟", pic: true,
        options: [{ label: "🐶", value: "توله‌سگ" }, { label: "🐱", value: "بچه‌گربه" }, { label: "🐥", value: "جوجه" }], answer: "جوجه" },
      { type: "home", pic: "🐈 🐦", text: "بیا مادرها و بچه‌ها را پیدا کنیم!",
        need: ["کاغذ و مداد رنگی"],
        steps: [
          "در کوچه، پارک یا روستا دنبال حیوان‌هایی بگردید که با بچه‌شان هستند: گربه و بچه‌گربه، کبوتر و جوجه‌اش، مرغ و جوجه‌ها.",
          "از دور نگاه کنید و به آن‌ها نزدیک نشوید: مادرها از بچه‌هایشان مراقبت می‌کنند و ممکن است بترسند.",
          "بپرسید: «بچه شبیه مادرش است؟ چه فرقی دارند؟ مادر برایش چه کار می‌کند؟»",
          "در خانه، کودک یک مادر و بچه‌اش را نقاشی کند."
        ],
        ask: "بچه‌ها چه چیزهایی از مادرشان می‌گیرند؟" }
    ]
  },
  {
    id: "science-seed-13", subject: "science", level: "seed", emoji: "🪴", title: "مراقب گیاه‌ها و حیوان‌ها",
    steps: [
      { type: "scene", prompt: "ببین بچه‌ها چطور مراقبت می‌کنند", bg: "#cdeaf7",
        /* In the yard: the pot plant hangs its leaves; Reza waters it and it stands up again. Sara pours water into
           a dish on the low wall, and a sparrow comes and drinks. Then an ant carries a crumb past their feet, and
           they only watch it. Each child holds a watering can at the hand: the shoulder plus the arm (7.6 × size)
           turned by armF, the can 4 to the side of the hand. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [86, 14] },
          wall: { art: "sci-wall", at: [30, 86] }, dish: { art: "sci-dish", at: [30, 72.6], s: 1.3 },
          pot: { art: "sci-potplant", at: [96, 87], s: 1.3 },
          girl: { art: "👧", at: [62, 86], s: 1.2, flip: true }, can2: { art: "sci-can", at: [54.9, 78.4], s: 1.15 },
          boy: { art: "👦", at: [126, 86], s: 1.3, flip: true }, can: { art: "sci-can", at: [118.6, 77.6], s: 1.15 },
          bird: { art: "sci-sparrow", at: [180, 8], s: 1.3 },
          ant: { art: "🐜", at: [118, 89], s: 0.45 }, crumb: { art: "sci-crumb", at: [-9.5, -6], s: 2.4, under: "ant" }
        },
        scenes: [
          { caption: "گلدان تشنه است. برگ‌هایش آویزان شده.", key: 2400, do: [
            { cam: { x: 100, y: 64, zoom: 2 }, dur: 1200 },
            { id: "pot.droop", to: { r: 6 }, at: 1200, dur: 2400, yoyo: true, times: 2 }
          ] },
          { caption: "رضا به گلدان آب می‌دهد. برگ‌ها دوباره بالا می‌آیند.", key: 4500, hold: 6600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "boy.armF", to: { r: -95 }, at: 800, dur: 900 },
            { id: "can", path: "M118.6 77.6Q118 70 112.2 67.4", at: 800, dur: 900 },
            { id: "can", to: { r: -35 }, at: 1700, dur: 500 },
            { emit: "drop", where: [94, 71.7], spread: [3, 1], rise: 4, n: 14, at: 2200, dur: 2000, life: 700 },
            { id: "pot.droop", to: { o: 0 }, at: 3200, dur: 1200 }, { id: "pot.up", to: { o: 1 }, at: 3200, dur: 1200 },
            { id: "can", to: { r: 0 }, at: 4400, dur: 400 },
            { id: "boy.armF", to: { r: -20 }, at: 4800, dur: 800 }, { id: "can", path: "M112.2 67.4Q118 70 118.6 77.6", at: 4800, dur: 800 }
          ] },
          { caption: "سارا در ظرف آب می‌ریزد تا گنجشک‌ها آب بخورند.", key: 3400, hold: 5600, do: [
            { id: "girl.armF", to: { r: -120 }, dur: 900 },
            { id: "can2", path: "M54.9 78.4Q56 70 50.1 65.2", dur: 900 },
            { id: "can2", to: { r: -35 }, at: 900, dur: 500 },
            { emit: "drop", where: [32, 69.5], spread: [2, 1], rise: 3, n: 12, at: 1400, dur: 1800, life: 600 },
            { id: "dish.water", to: { o: 1 }, at: 1800, dur: 1400 },
            { id: "can2", to: { r: 0 }, at: 3600, dur: 400 },
            { id: "girl.armF", to: { r: -20 }, at: 4000, dur: 800 }, { id: "can2", path: "M50.1 65.2Q56 70 54.9 78.4", at: 4000, dur: 800 }
          ] },
          { caption: "گنجشک آمد و آب خورد.", key: 3800, hold: 6000, do: [
            { id: "bird.wing", to: { r: -40 }, dur: 2400, yoyo: true, times: 14 },
            { id: "bird", path: "M180 8Q90 0 16 72.6", dur: 2400 },
            { id: "bird", to: { r: 30 }, at: 2900, dur: 600, yoyo: true, times: 6 }
          ] },
          { caption: "مورچه یک خرده نان می‌برد. بچه‌ها فقط نگاهش می‌کنند و به آن دست نمی‌زنند.", key: 3600, hold: 7200, do: [
            { cam: { x: 88, y: 65, zoom: 1.8 }, dur: 1200 },
            { id: "ant", path: "M118 89L72 89", at: 600, dur: 6000, ease: "linear" },
            { id: "ant", to: { y: "-0.5" }, at: 600, dur: 6000, yoyo: true, times: 24 }
          ] },
          { caption: "گیاه، گنجشک و مورچه زنده‌اند. ما مراقبشان هستیم.", hold: 3000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 }
          ],
            wait: { tap: ["pot", "bird", "ant"], hint: "روی چیزهای زنده بزن!",
              each: [{ id: "$", to: { y: "-2" }, dur: 500, yoyo: true, times: 2 }] } }
        ],
        question: "گلدان پژمرده بود. رضا چه کار کرد؟", pic: true,
        options: [{ label: "💧", value: "آبش داد" }, { label: "🗑️", value: "دورش انداخت" }, { label: "🍬", value: "به آن آبنبات داد" }], answer: "آبش داد" },
      { type: "choose", prompt: "یک مورچه دیدی. چه کار می‌کنی؟", say: "یک مورچه دیدی. چه کار می‌کنی؟", pic: true,
        options: [{ label: "🔍", value: "آرام نگاهش می‌کنم" }, { label: "👟", value: "پایم را رویش می‌گذارم" }], answer: "آرام نگاهش می‌کنم" },
      { type: "choose", prompt: "تابستان است و هوا گرم است. برای گنجشک‌ها چه بگذاریم؟", say: "تابستان است و هوا گرم است. برای گنجشک‌ها چه بگذاریم؟", pic: true,
        options: [{ label: "🧸", value: "عروسک" }, { label: "💧", value: "آب" }, { label: "🍬", value: "آبنبات" }], answer: "آب" },
      { type: "choose", prompt: "در پارک گل‌های قشنگ دیدی. چه کار کنیم؟", say: "در پارک گل‌های قشنگ دیدی. چه کار کنیم؟", pic: true,
        options: [{ label: "✋🌷", value: "گل‌ها را بچینیم" }, { label: "👀🌷", value: "گل‌ها را تماشا کنیم" }], answer: "گل‌ها را تماشا کنیم" },
      { type: "home", pic: "🪴 💧", text: "یک گیاه را یک هفته مراقبت کن!",
        need: ["یک گلدان گیاه", "یک لیوان آب", "یک کاغذ برای جدول هفته", "یک ظرف کم‌عمق برای آب پرنده‌ها"],
        steps: [
          "با کودک یک گیاه انتخاب کنید که مال خودش باشد.",
          "هر روز با هم خاک گلدان را با انگشت لمس کنید: اگر خشک بود، کودک کمی آب بدهد. در جدول هفته یک قطره بکشد.",
          "اگر برگی آویزان شد یا زرد شد، با هم فکر کنید: آب کم دارد؟ نور کم دارد؟",
          "در روزهای گرم، ظرف کم‌عمق آب را لب پنجره یا بالکن بگذارید و هر روز آبش را عوض کنید."
        ],
        ask: "گیاهت این هفته چه تغییری کرد؟" }
    ]
  },
  {
    id: "science-seed-14", subject: "science", level: "seed", emoji: "🌻", title: "بازی باغچه",
    steps: [
      { type: "sort", prompt: "زنده یا غیرزنده؟", say: "زنده‌ها یک طرف، غیرزنده‌ها یک طرف.",
        baskets: [{ label: "زنده", pic: "🌱", value: "live" }, { label: "غیرزنده", pic: "🧱", value: "not" }],
        items: [
          { pic: "🐢", say: "لاک‌پشت", basket: "live" },
          { pic: "🌵", say: "کاکتوس", basket: "live" },
          { pic: "🐝", say: "زنبور", basket: "live" },
          { pic: "⏰", say: "ساعت", basket: "not" },
          { pic: "🎈", say: "بادکنک", basket: "not" },
          { pic: "🪑", say: "صندلی", basket: "not" }
        ] },
      { type: "pairs", prompt: "هر حیوان کجا زندگی می‌کند؟", say: "ماهی در آب زندگی می‌کند. خانه هر حیوان را پیدا کن.",
        pairs: [
          [{ pic: "🐟", say: "ماهی" }, { pic: "🌊", say: "آب" }],
          [{ pic: "🐫", say: "شتر" }, { pic: "🏜️", say: "کویر" }],
          [{ pic: "🐦", say: "گنجشک" }, { pic: "🌳", say: "لانه روی درخت" }],
          [{ pic: "🐧", say: "پنگوئن" }, { pic: "🧊", say: "یخ" }]
        ] },
      { type: "pairs", prompt: "هر حیوان چه می‌خورد؟", say: "مرغ دانه ذرت می‌خورد. غذای هر حیوان را پیدا کن.",
        pairs: [
          [{ pic: "🐔", say: "مرغ" }, { pic: "🌽", say: "ذرت" }],
          [{ pic: "🐭", say: "موش" }, { pic: "🧀", say: "پنیر" }],
          [{ pic: "🐑", say: "گوسفند" }, { pic: "🌾", say: "علف" }],
          [{ pic: "🐻", say: "خرس" }, { pic: "🍯", say: "عسل" }]
        ] },
      { type: "pairs", prompt: "مادر و بچه", say: "بچه هر مادر را پیدا کن.",
        pairs: [
          [{ pic: "🐔", say: "مرغ" }, { pic: "🐥", say: "جوجه" }],
          [{ pic: "🦋", say: "پروانه" }, { pic: "🐛", say: "کرم پروانه" }],
          [{ pic: "🐕", say: "سگ" }, { pic: "🐶", say: "توله‌سگ" }]
        ] },
      { type: "order", prompt: "از دانه تا گل بچین", say: "اول دانه بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌰", say: "دانه" }, { pic: "🌱", say: "جوانه" }, { pic: "🌿", say: "گیاه" }, { pic: "🌻", say: "گل آفتابگردان" }] },
      { type: "home", pic: "🏡 🔍", text: "بازی پیدا کن در حیاط یا پارک!",
        need: ["یک کاغذ با این شکل‌ها: 🌱 🐜 🐦 🌸 🍂 🪨"],
        steps: [
          "شکل‌ها را روی کاغذ بکشید و با کودک به حیاط، پارک یا کوچه بروید.",
          "هر کدام را که پیدا کردید، کودک کنار شکلش علامت بزند: یک جوانه، یک مورچه، یک پرنده، یک گل، یک برگ خشک، یک سنگ.",
          "برای هر کدام بپرسید: «زنده است یا نه؟ خانه‌اش کجاست؟ چه می‌خورد؟»",
          "فقط نگاه کنید و به حیوان‌ها دست نزنید."
        ],
        ask: "کدام را زودتر از همه پیدا کردی؟ کدام سخت‌تر بود؟" }
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
    id: "science-seed-15", subject: "science", level: "seed", emoji: "🌙", title: "خورشید، ماه و ستاره‌ها",
    steps: [
      { type: "scene", prompt: "روز و شب در آسمان", bg: "#cdeaf7",
        /* One day in Sara's yard: the sun shines and she kicks her ball; the sun goes down behind the mountain and
           it gets dark; the moon and the stars come out; the window lights up and Sara walks home to sleep; the owl
           wakes and flies to the tree. Drawings: js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, dusk: { art: "sci-dusk", o: 0 }, night: { art: "sci-night", o: 0 }, stars: { art: "sci-stars", o: 0 },
          sun: { art: "sci-sun", at: [70, 14], s: 1.2 }, moon: { art: "sci-moon", at: [10, 50], s: 1.4, o: 0 },
          mountains: { art: "sci-mountains" }, ground: { art: "sci-ground" }, dim: { art: "sci-night", o: 0 },
          tree: { art: "sci-tree", at: [14, 84], s: 0.7 }, house: { art: "sci-house", at: [130, 82], s: 1.5 },
          ball: { art: "sci-ball", at: [49, 81], s: 1.1 },
          girl: { art: "👧", at: [40, 85], s: 1.2 },
          owl: { art: "🦉", at: [-14, 30], s: 0.7 }
        },
        scenes: [
          { caption: "روز است. خورشید در آسمان می‌درخشد و همه جا روشن است.", do: [
            { id: "sun.rays", to: { r: 120 }, dur: 4000 },
            { id: "sun", to: { s: 1.35 }, at: 600, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "در روز سارا در حیاط توپ‌بازی می‌کند.", key: 1100, hold: 4200, do: [
            { id: "girl.legF", to: { r: -45 }, at: 600, dur: 400 }, { id: "girl.legF", to: { r: 0 }, at: 1000, dur: 500 },
            { id: "ball", path: "M49 81Q70 60 92 81", at: 950, dur: 1200, ease: "out" }, { id: "ball", to: { r: 540 }, at: 950, dur: 2400, ease: "out" },
            { id: "ball", path: "M92 81L104 81", at: 2150, dur: 1200, ease: "out" },
            { id: "girl", walk: [90, 85], at: 2400, dur: 1600, steps: 6 }
          ] },
          { caption: "خورشید پشت کوه رفت. هوا کم‌کم تاریک شد.", key: 2900, do: [
            { id: "sun", path: "M70 14Q122 2 146 64", dur: 3200, ease: "in" }, { id: "sun.rays", to: { r: 240 }, dur: 3200 },
            { id: "dusk", to: { o: 0.7 }, at: 600, dur: 1800 },
            { id: "night", to: { o: 0.95 }, at: 2400, dur: 1400 }, { id: "dim", to: { o: 0.45 }, at: 2400, dur: 1400 }, { id: "dusk", to: { o: 0 }, at: 3600, dur: 400 }
          ] },
          { caption: "شب شد. ماه و ستاره‌ها در آسمان پیدا شدند.", key: 3000, do: [
            { id: "moon", to: { o: 1 }, dur: 600 }, { id: "moon", path: "M10 50Q22 22 44 14", dur: 3000 },
            { id: "stars", to: { o: 1 }, at: 600, dur: 1200 },
            { id: "stars.s0", to: { o: 0.3 }, at: 1800, dur: 1200, yoyo: true, times: 4 },
            { id: "stars.s2", to: { o: 0.3 }, at: 2200, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "چراغ خانه روشن شد. سارا به خانه می‌رود تا بخوابد.", key: 2400, hold: 5400, do: [
            { id: "house.light", to: { o: 1 }, dur: 600 },
            { id: "girl", walk: [130, 85], at: 600, dur: 3000, steps: 9 },
            { id: "girl", to: { o: 0 }, at: 3700, dur: 500 }
          ] },
          { caption: "ولی جغد شب‌ها بیدار است و پرواز می‌کند!", key: 1400, hold: 5000, do: [
            { id: "owl", path: "M-14 30Q30 6 34 58", dur: 2600 }, { id: "owl", to: { r: -10 }, dur: 650, yoyo: true, times: 4 },
            { id: "owl", to: { s: 0.78 }, at: 3000, dur: 600, yoyo: true, times: 2 }
          ] }
        ],
        question: "کی هوا تاریک است؟",
        options: ["روز", "شب"], answer: "شب" },
      { type: "sort", prompt: "روز یا شب؟", say: "این‌ها را در روز می‌بینیم یا در شب؟",
        baskets: [{ label: "روز", pic: "☀️", value: "day" }, { label: "شب", pic: "🌙", value: "night" }],
        items: [
          { pic: "🌞", say: "خورشید", basket: "day" },
          { pic: "🌈", say: "رنگین‌کمان", basket: "day" },
          { pic: "🛝", say: "سرسره‌بازی در پارک", basket: "day" },
          { pic: "🌙", say: "ماه", basket: "night" },
          { pic: "⭐", say: "ستاره", basket: "night" },
          { pic: "🦉", say: "جغد بیدار", basket: "night" }
        ] },
      { type: "choose", prompt: "شب برای این‌که خانه روشن شود، چه روشن می‌کنیم؟", say: "شب هوا تاریک است. برای این‌که خانه روشن شود، چه روشن می‌کنیم؟", pic: true,
        options: [{ label: "🧦", value: "جوراب" }, { label: "💡", value: "چراغ" }, { label: "🍎", value: "سیب" }], answer: "چراغ" },
      { type: "choose", prompt: "خورشید کی در آسمان است؟", say: "خورشید کی در آسمان است؟",
        options: ["روز", "شب"], answer: "روز" },
      { type: "home", pic: "🌇 🌙", text: "امروز عصر با هم آسمان را تماشا کنیم.",
        need: ["کاغذ و مداد رنگی", "یک چراغ‌قوه"],
        steps: [
          "عصر، از پنجره یا در حیاط، با هم ببینید چطور هوا کم‌کم تاریک می‌شود. هرگز مستقیم به خورشید نگاه نکنید.",
          "وقتی تاریک شد، ماه و ستاره‌ها را پیدا کنید. چند ستاره می‌بینید؟",
          "چراغ اتاق را خاموش کنید و با چراغ‌قوه بازی کنید: بدون نور چه چیزهایی را نمی‌بینیم؟",
          "کودک کاغذی را از وسط تا کند: یک طرف روز را بکشد و طرف دیگر شب را."
        ],
        ask: "در روز چه می‌بینیم که شب نمی‌بینیم؟" }
    ]
  },
  {
    id: "science-seed-16", subject: "science", level: "seed", emoji: "💧", title: "آب کجا می‌رود؟",
    steps: [
      { type: "scene", prompt: "ببین آب کجا می‌رود", bg: "#cdeaf7",
        /* Three places, one after another: water falls from the tap down into a glass and fills it; rain on the
           mountain runs down as a river to the sea; in the yard a wet shirt drips on the line and dries in the sun
           and wind, and a puddle gets smaller and smaller in the sun until it is gone. Drawings:
           js/art/rig-science.js (tap, water and bathroom from js/art/rig.js). */
        parts: {
          room: { art: "bathroom" }, water: { art: "water", o: 0 }, glass: { art: "sci-tumbler", at: [80, 68], s: 1.1 }, tap: { art: "tap" },
          land: { art: "sci-wc-land", o: 0 }, cloud: { art: "sci-cloud-grey", at: [34, -10], s: 1.8, o: 0 }, rain: { art: "sci-rainfall", o: 0 }, river: { art: "sci-river", o: 0 },
          yard: { art: "sci-meadow", o: 0 }, sun: { art: "sci-sun", at: [26, 16], o: 0 },
          line: { art: "sci-clothesline", at: [112, 84], o: 0 }, shirt: { art: "sci-shirt-line", at: [112, 80], s: 1.1, o: 0 },
          puddle: { art: "sci-puddle", at: [52, 82], s: 1.8, o: 0 },
          v1: { art: "sci-vapour", at: [44, 80], o: 0 }, v2: { art: "sci-vapour", at: [56, 80], o: 0 }, v3: { art: "sci-vapour", at: [108, 64], o: 0 }, v4: { art: "sci-vapour", at: [116, 64], o: 0 },
          wind: { art: "sci-wind", at: [140, 50], s: 1.2, flip: true, o: 0 }
        },
        scenes: [
          { caption: "شیر را باز کردیم. آب پایین می‌ریزد و لیوان پر می‌شود.", key: 2600, hold: 5400, do: [
            { id: "glass.water", to: { sy: 0 }, dur: 1 },
            { id: "tap.handle", to: { r: -55 }, at: 300, dur: 600 },
            { id: "water", to: { o: 1 }, at: 800, dur: 300 },
            { id: "glass.water", to: { sy: 1 }, at: 1000, dur: 3200, ease: "linear" },
            { id: "tap.handle", to: { r: 0 }, at: 4100, dur: 500 }, { id: "water", to: { o: 0 }, at: 4300, dur: 300 }
          ] },
          { caption: "باران روی کوه می‌بارد. آب از کوه پایین می‌آید و به دریا می‌رود.", key: 5900, hold: 7400, do: [
            { id: "land", to: { o: 1 }, dur: 800 },
            { id: "cloud", to: { o: 1 }, at: 600, dur: 600 }, { id: "cloud", to: { y: 14 }, at: 600, dur: 1200 },
            { id: "rain", to: { o: 1 }, at: 1600, dur: 400 }, { id: "rain", to: { y: "+12" }, at: 1600, dur: 600, ease: "linear", times: 8 },
            { id: "river", to: { o: 1 }, at: 2400, dur: 100 }, { id: "river", draw: true, at: 2400, dur: 3400, ease: "in" },
            { emit: "drop", where: [43, 52], spread: [3, 3], rise: -6, n: 8, at: 3000, dur: 2400, life: 900 }
          ] },
          { caption: "این لباس خیس است. از آن آب می‌چکد.", key: 2800, do: [
            { id: "yard", to: { o: 1 }, dur: 800 }, { id: "line", to: { o: 1 }, dur: 800 }, { id: "shirt", to: { o: 1 }, dur: 800 },
            { id: "rain", to: { o: 0 }, dur: 400 }, { id: "cloud", to: { o: 0 }, dur: 400 },
            { cam: { x: 112, y: 62, zoom: 2 }, at: 800, dur: 1200 },
            { emit: "drop", where: [112, 81], spread: [12, 1], rise: -5, n: 12, at: 1600, dur: 2600, life: 800 }
          ] },
          { caption: "آفتاب تابید و باد وزید. لباس کم‌کم خشک شد.", key: 5600, hold: 6400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "sun", to: { o: 1 }, dur: 800 }, { id: "sun.rays", to: { r: 120 }, dur: 6000 },
            { id: "wind", to: { o: 1 }, at: 1200, dur: 100 }, { id: "wind", draw: true, at: 1200, dur: 1400 }, { id: "wind", to: { o: 0 }, at: 3600, dur: 500 },
            { id: "shirt", to: { r: -6 }, at: 1400, dur: 1400, yoyo: true, times: 4 },
            { id: "v3", to: { o: 1 }, at: 1600, dur: 1 }, { id: "v3", to: { y: 52, o: 0 }, at: 1600, dur: 2000, times: 2 },
            { id: "v4", to: { o: 1 }, at: 2200, dur: 1 }, { id: "v4", to: { y: 52, o: 0 }, at: 2200, dur: 2000, times: 2 },
            { id: "shirt.wet", to: { o: 0 }, at: 1600, dur: 4000 }
          ] },
          { caption: "بعد از باران یک چاله آب در حیاط مانده است.", key: 1800, do: [
            { id: "puddle", to: { o: 1 }, dur: 900 },
            { id: "puddle", to: { sy: 2.1 }, at: 1000, dur: 1000, yoyo: true, times: 2 }
          ] },
          { caption: "آفتاب به چاله می‌تابد. چاله کوچک و کوچک‌تر می‌شود تا خشک شود.", key: 5000, hold: 7000, do: [
            { id: "sun", to: { s: 1.2 }, dur: 900, yoyo: true, times: 2 },
            { id: "v1", to: { o: 1 }, at: 600, dur: 1 }, { id: "v1", to: { y: 66, o: 0 }, at: 600, dur: 2000, times: 3 },
            { id: "v2", to: { o: 1 }, at: 1200, dur: 1 }, { id: "v2", to: { y: 66, o: 0 }, at: 1200, dur: 2000, times: 3 },
            { id: "puddle", to: { sx: 1.1, sy: 1.1 }, at: 600, dur: 3000 },
            { id: "puddle", to: { sx: 0.3, sy: 0.3 }, at: 3600, dur: 2200 }, { id: "puddle", to: { o: 0 }, at: 5400, dur: 600 }
          ] }
        ],
        question: "چاله آب در آفتاب چه شد؟", pic: true,
        options: [{ label: "🌊", value: "بزرگ‌تر شد" }, { label: "☀️", value: "خشک شد" }, { label: "🧊", value: "یخ زد" }], answer: "خشک شد" },
      { type: "choose", prompt: "آب را روی سرسره بریزیم، کجا می‌رود؟", say: "اگر از بالای سرسره آب بریزیم، آب کجا می‌رود؟ بالا یا پایین؟",
        options: ["بالا", "پایین"], answer: "پایین" },
      { type: "choose", prompt: "لباس خیس را کجا بگذاریم که زودتر خشک شود؟", say: "لباس خیس را کجا بگذاریم که زودتر خشک شود؟", pic: true,
        options: [{ label: "☀️", value: "در آفتاب" }, { label: "🧺", value: "در سبد، گلوله شده" }], answer: "در آفتاب" },
      { type: "choose", prompt: "آب باران از کوه به کجا می‌رود؟", say: "آب باران از کوه به کجا می‌رود؟", pic: true,
        options: [{ label: "☁️", value: "بالای آسمان" }, { label: "🌊", value: "پایین، به رود و دریا" }], answer: "پایین، به رود و دریا" },
      { type: "home", pic: "💧 ☀️", text: "دو دستمال خیس: کدام زودتر خشک می‌شود؟",
        need: ["دو دستمال یا جوراب هم‌اندازه", "آب", "دو گیره لباس"],
        steps: [
          "هر دو دستمال را خیس کنید و کمی بچلانید.",
          "یکی را صاف روی بند یا پشتی صندلی در آفتاب پهن کنید و دیگری را گلوله کرده در سایه بگذارید.",
          "پیش از شروع، کودک حدس بزند کدام زودتر خشک می‌شود.",
          "هر نیم ساعت با دست لمس کنید و ببینید کدام خشک شد.",
          "در حیاط یا بالکن با یک لیوان آب روی زمین یک لکه خیس درست کنید و دورش را با گچ خط بکشید. چند ساعت بعد ببینید لکه کجا رفت."
        ],
        ask: "آب لباس کجا رفت؟" }
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
    id: "science-seed-17", subject: "science", level: "seed", emoji: "🧈", title: "گرم و سرد",
    steps: [
      { type: "scene", prompt: "گرما و سرما چیزها را عوض می‌کنند", bg: "#f6efdc",
        /* On the kitchen table: an ice cube (guess first), then a warm hand holds it and it melts into a little pool
           in the palm. Cold butter is hard: the spoon stops on top. The sun warms it, it slumps, and the spoon goes
           in. Last, a glass of water goes into the freezer and comes out ice. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, sun: { art: "sci-sun", at: [24, 16], o: 0 },
          ray1: { art: "sci-ray", at: [31, 21], r: 30, sx: 1.7, o: 0 }, ray2: { art: "sci-ray", at: [30.6, 22.1], r: 38, sx: 1.6, o: 0 },
          plate: { art: "sci-plate", at: [56, 72], s: 0.7 }, ice: { art: "sci-ice", at: [56, 70.6], s: 0.9 }, chill: { art: "sci-chill", at: [56, 56], o: 0 },
          hand: { art: "sci-hand-up", at: [190, 56], s: 1.3 },
          plate2: { art: "sci-plate", at: [100, 72], s: 0.8, o: 0 },
          spoon: { art: "sci-spoon", at: [100, 22], r: 180, s: 1.2, o: 0 }, butter: { art: "sci-butter", at: [100, 71], s: 1.4, o: 0 },
          fr: { art: "sci-freezer", at: [124, 86], s: 1.3, o: 0 }, cup: { art: "sci-cup", at: [56, 74], s: 1.4, o: 0 },
          frDoor: { art: "sci-freezer-door", at: [142.2, 86], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "این یک تکه یخ است. حدس بزن اگر آن را در دست گرم نگه داریم، چه می‌شود؟", key: 2000, hold: 7000, do: [
            { id: "chill", to: { o: 1 }, at: 300, dur: 100 }, { id: "chill", draw: true, at: 300, dur: 1600 },
            { id: "ice", to: { s: 1 }, at: 2400, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "یخ را در دست گرفتیم. دست ما گرم است.", key: 3900, do: [
            { id: "chill", to: { o: 0 }, dur: 400 },
            { id: "hand", path: "M190 56L60 56", dur: 1800, ease: "out" },
            { id: "ice", path: "M56 70.6Q54 56 56 56", at: 2000, dur: 900 }, { id: "hand", to: { x: 70 }, at: 2900, dur: 900 }, { id: "ice", to: { x: 66 }, at: 2900, dur: 900 },
            { id: "plate", to: { o: 0 }, at: 3000, dur: 500 }
          ] },
          { caption: "یخ کم‌کم آب شد. حالا در دست آب جمع شده!", key: 4000, hold: 6000, do: [
            { cam: { x: 70, y: 52, zoom: 2.4 }, dur: 1000 },
            { id: "ice", to: { sy: 0.2, sx: 0.8 }, at: 1000, dur: 4000 }, { id: "ice", to: { o: 0 }, at: 4400, dur: 600 },
            { id: "hand.pool", to: { o: 1 }, at: 1400, dur: 3000 },
            { emit: "drop", where: [52, 58], spread: [1, 1], rise: -6, n: 5, at: 3000, dur: 2000, life: 700 }
          ] },
          { caption: "کره سرد است و سفت. قاشق در آن فرو نمی‌رود.", key: 3600, hold: 6000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "hand", path: "M70 56L190 56", dur: 1400, ease: "in" },
            { id: "plate2", to: { o: 1 }, at: 900, dur: 500 }, { id: "butter", to: { o: 1 }, at: 900, dur: 500 }, { id: "spoon", to: { o: 1 }, at: 900, dur: 500 },
            { id: "spoon", path: "M100 22L100 42.4", at: 1500, dur: 1200, ease: "in" },
            { id: "spoon", to: { y: 40.6 }, at: 2800, dur: 300, yoyo: true, times: 4 },
            { id: "spoon", path: "M100 42.4L100 26", at: 4400, dur: 900 }
          ] },
          { caption: "آفتاب کره را گرم کرد. کره نرم شد و قاشق در آن فرو رفت.", key: 5000, hold: 6600, do: [
            { id: "sun", to: { o: 1 }, dur: 600 }, { id: "sun.rays", to: { r: 120 }, dur: 6000 },
            { id: "ray1", to: { o: 1 }, at: 600, dur: 100 }, { id: "ray1", draw: true, at: 600, dur: 1200 },
            { id: "ray2", to: { o: 1 }, at: 800, dur: 100 }, { id: "ray2", draw: true, at: 800, dur: 1200 },
            { id: "butter.hard", to: { o: 0 }, at: 1800, dur: 1800 }, { id: "butter.soft", to: { o: 1 }, at: 1800, dur: 1800 },
            { id: "spoon", path: "M100 26L100 49", at: 3800, dur: 1200, ease: "out" }
          ] },
          { caption: "آب را در فریزر گذاشتیم. سرد شد و یخ زد!", key: 7800, hold: 9400, do: [
            { id: "sun", to: { o: 0 }, dur: 500 }, { id: "ray1", to: { o: 0 }, dur: 300 }, { id: "ray2", to: { o: 0 }, dur: 300 },
            { id: "plate2", to: { o: 0 }, dur: 500 }, { id: "butter", to: { o: 0 }, dur: 500 }, { id: "spoon", to: { o: 0 }, dur: 500 },
            { id: "fr", to: { o: 1 }, dur: 500 }, { id: "frDoor", to: { o: 1 }, dur: 500 }, { id: "cup", to: { o: 1 }, at: 300, dur: 500 },
            { id: "frDoor", to: { sx: 0.12 }, at: 900, dur: 600 },
            { id: "cup", path: "M56 74Q90 34 124 60", at: 1600, dur: 1200 },
            { id: "frDoor", to: { sx: 1 }, at: 3000, dur: 500 },
            { id: "fr", to: { x: "+0.6" }, at: 3600, dur: 1600, yoyo: true, times: 8 }, { id: "frDoor", to: { x: "+0.6" }, at: 3600, dur: 1600, yoyo: true, times: 8 },
            { id: "cup.water", to: { o: 0 }, at: 4200, dur: 300 }, { id: "cup.ice", to: { o: 1 }, at: 4200, dur: 300 },
            { id: "frDoor", to: { sx: 0.12 }, at: 5400, dur: 600 },
            { id: "cup", path: "M124 60Q90 34 56 74", at: 6200, dur: 1200 },
            { emit: "spark", where: [56, 64], spread: [12, 10], n: 6, at: 7400, dur: 900 }
          ] }
        ],
        question: "یخ در دست گرم چه شد؟", pic: true,
        options: [{ label: "💧", value: "آب شد" }, { label: "🧊🧊", value: "بزرگ‌تر شد" }, { label: "🔥", value: "داغ شد" }], answer: "آب شد" },
      { type: "choose", prompt: "بستنی را در آفتاب بگذاریم، چه می‌شود؟", say: "اگر بستنی را در آفتاب بگذاریم، چه می‌شود؟", pic: true,
        options: [{ label: "🍦", value: "همان‌طور می‌ماند" }, { label: "💧", value: "آب می‌شود" }], answer: "آب می‌شود" },
      { type: "choose", prompt: "آب را در فریزر بگذاریم، چه می‌شود؟", say: "اگر آب را در فریزر بگذاریم، چه می‌شود؟", pic: true,
        options: [{ label: "🧊", value: "یخ می‌زند" }, { label: "☕", value: "داغ می‌شود" }], answer: "یخ می‌زند" },
      { type: "choose", prompt: "کره سفت را چطور نرم کنیم؟", say: "کره سرد سفت است. چطور نرمش کنیم؟", pic: true,
        options: [{ label: "❄️", value: "در فریزر بگذاریم" }, { label: "☀️", value: "کمی گرمش کنیم" }], answer: "کمی گرمش کنیم" },
      { type: "home", pic: "🧊 ✋", text: "اول حدس بزن، بعد امتحان کن: یخ کجا زودتر آب می‌شود؟",
        need: ["سه تکه یخ هم‌اندازه", "یک بشقاب", "یک کاسه کوچک", "یک دستمال"],
        steps: [
          "پیش از شروع بپرسید: «یخ در دست زودتر آب می‌شود، در بشقاب یا در کاسه‌ای که با دستمال پوشانده‌ایم؟» حدس کودک را بنویسید.",
          "یک تکه یخ را کودک در دستش نگه دارد (اگر خیلی سرد بود، روی دستمال در دستش بگذارید). یکی را در بشقاب و یکی را در کاسه زیر دستمال بگذارید.",
          "هر چند دقیقه با هم نگاه کنید. کدام زودتر آب شد؟",
          "یک تکه کره را از یخچال بیرون بگذارید و هر ده دقیقه با قاشق امتحان کنید: کی نرم می‌شود؟"
        ],
        ask: "حدست درست بود؟ چرا یخ در دست زودتر آب شد؟" }
    ]
  },
  {
    id: "science-seed-18", subject: "science", level: "seed", emoji: "🍉", title: "بزرگ و کوچک، سنگین و سبک",
    steps: [
      { type: "choose", prompt: "کدام بزرگ‌تر است؟", say: "کدام بزرگ‌تر است؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🐘", value: "فیل" }], answer: "فیل" },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "از کوچک‌ترین تا بزرگ‌ترین بچین.", numbered: true,
        items: [{ pic: "🍒", say: "آلبالو" }, { pic: "🍎", say: "سیب" }, { pic: "🍉", say: "هندوانه" }] },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "این حیوان‌ها را از کوچک‌ترین تا بزرگ‌ترین بچین.", numbered: true,
        items: [{ pic: "🐜", say: "مورچه" }, { pic: "🐈", say: "گربه" }, { pic: "🐄", say: "گاو" }, { pic: "🐘", say: "فیل" }] },
      { type: "choose", prompt: "کدام سنگین‌تر است؟", say: "یکی را در این دست و یکی را در آن دست بگیر. کدام سنگین‌تر است؟", pic: true,
        options: [{ label: "🍃", value: "برگ" }, { label: "🍉", value: "هندوانه" }], answer: "هندوانه" },
      { type: "sort", prompt: "سنگین یا سبک؟", say: "سنگین‌ها یک طرف، سبک‌ها یک طرف.",
        baskets: [{ label: "سنگین", pic: "🧱", value: "heavy" }, { label: "سبک", pic: "🎈", value: "light" }],
        items: [
          { pic: "🧱", say: "آجر", basket: "heavy" },
          { pic: "🪨", say: "سنگ بزرگ", basket: "heavy" },
          { pic: "📚", say: "یک دسته کتاب", basket: "heavy" },
          { pic: "🎈", say: "بادکنک", basket: "light" },
          { pic: "🍂", say: "برگ خشک", basket: "light" },
          { pic: "🧦", say: "جوراب", basket: "light" }
        ] },
      { type: "choose", prompt: "بادکنک بزرگ است و سنگ کوچک. کدام سنگین‌تر است؟", say: "بادکنک بزرگ است و سنگ کوچک است. کدام سنگین‌تر است؟", pic: true,
        options: [{ label: "🎈", value: "بادکنک" }, { label: "🪨", value: "سنگ" }], answer: "سنگ" },
      { type: "home", pic: "✋ ⚖️ ✋", text: "دست‌هایت ترازو می‌شوند!",
        need: ["چند چیز از خانه: سیب، قاشق، کتاب، بالش کوچک، پرتقال، اسفنج", "یک چوب‌لباسی و دو کیسه پلاستیکی، اگر دارید"],
        steps: [
          "کودک دست‌هایش را جلو بگیرد. در هر دست یک چیز بگذارید و بپرسید: «کدام سنگین‌تر است؟»",
          "یک چیز بزرگ و سبک (بالش) و یک چیز کوچک و سنگین (سیب) را امتحان کنید: بزرگ‌تر همیشه سنگین‌تر است؟",
          "چیزها را به ترتیب بچینید: از کوچک تا بزرگ، بعد از سبک تا سنگین.",
          "اگر چوب‌لباسی دارید، دو کیسه را دو سرش آویزان کنید و در هر کیسه یک چیز بگذارید: کیسه سنگین‌تر پایین می‌رود."
        ],
        ask: "بزرگ‌ترین چیز، سنگین‌ترین هم بود؟" }
    ]
  },
  {
    id: "science-seed-19", subject: "science", level: "seed", emoji: "⚽", title: "غلت می‌خورد یا نه؟",
    steps: [
      { type: "test", kind: "roll", prompt: "اول حدس بزن، بعد امتحان کن! این‌ها را بالای سرازیری می‌گذاریم.",
        items: [
          { pic: "⚽", say: "توپ", yes: true },
          { pic: "📦", say: "جعبه", yes: false },
          { pic: "🍊", say: "پرتقال", yes: true },
          { pic: "📕", say: "کتاب", yes: false },
          { pic: "🥫", say: "قوطی که به پهلو خوابیده", yes: true },
          { pic: "🧽", say: "اسفنج", yes: false }
        ] },
      { type: "choose", prompt: "چرا توپ غلت می‌خورد؟", say: "توپ غلت خورد و جعبه سُر خورد. چرا توپ غلت می‌خورد؟",
        options: ["چون گرد است", "چون قرمز است"], answer: "چون گرد است" },
      { type: "sort", prompt: "غلت می‌خورد یا سُر می‌خورد؟", say: "گردها غلت می‌خورند و پهن‌ها سُر می‌خورند. هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "غلت می‌خورد", pic: "⚽", value: "roll" }, { label: "سُر می‌خورد", pic: "🛷", value: "slide" }],
        items: [
          { pic: "🍎", say: "سیب", basket: "roll" },
          { pic: "🧶", say: "کلاف کاموا", basket: "roll" },
          { pic: "🍉", say: "هندوانه", basket: "roll" },
          { pic: "📚", say: "کتاب", basket: "slide" },
          { pic: "🧱", say: "آجر", basket: "slide" },
          { pic: "🍽️", say: "بشقاب", basket: "slide" }
        ] },
      { type: "choose", prompt: "توپ را آرام هل بدهیم یا محکم، تا دورتر برود؟", say: "اگر بخواهیم توپ دورتر برود، آرام هلش بدهیم یا محکم؟",
        options: ["آرام", "محکم"], answer: "محکم" },
      { type: "home", pic: "📚 ⚽", text: "یک سرازیری بساز و امتحان کن!",
        need: ["یک سینی یا تخته صاف", "چند کتاب", "چیزهای گرد و پهن: توپ کوچک، پرتقال، قوطی، مداد، کتاب کوچک، پاک‌کن، در بطری"],
        steps: [
          "یک سر سینی را روی دو سه کتاب بگذارید تا سرازیری درست شود.",
          "پیش از رها کردن هر چیز، کودک حدس بزند: «غلت می‌خورد یا سُر می‌خورد یا همان‌جا می‌ماند؟»",
          "چیز را بالای سرازیری بگذارید و رها کنید. با هم ببینید چه شد.",
          "کتاب‌های بیشتری زیر سینی بگذارید تا سرازیری تندتر شود. حالا چه می‌شود؟",
          "مداد را یک بار از پهلو و یک بار از سرش بگذارید. فرقی کرد؟"
        ],
        ask: "کدام‌ها غلت خوردند؟ شکلشان چطور بود؟" }
    ]
  },
  {
    id: "science-seed-20", subject: "science", level: "seed", emoji: "🛒", title: "هل بده، بکش",
    steps: [
      { type: "scene", prompt: "هل دادن و کشیدن", bg: "#cdeaf7",
        /* Reza pushes the cart and it starts to roll; Sara holds her hand out in front of it and it stops. Then Sara
           walks ahead pulling the toy wagon by its rope, and it follows her. Last, the same ball: a gentle push and
           it stops at the first flag, a hard push and it rolls all the way to the wall and bounces back. People: the
           walker in js/art/rig.js; other drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, wall: { art: "sci-wall", at: [156, 86], s: 0.9 },
          f1: { art: "sci-flag", at: [70, 83], s: 1.3, o: 0 },
          cart: { art: "sci-cart", at: [45.9, 82], s: 0.82 }, boy: { art: "👦", at: [20, 82], s: 1.6 },
          girl: { art: "👧", at: [122, 82], s: 1.6, flip: true },
          wagon: { art: "sci-wagon", at: [-40, 82], o: 0 }, girl2: { art: "👧", at: [-8, 82], s: 1.6, o: 0 },
          ball: { art: "sci-ball", at: [49, 71.6], s: 2.6, o: 0 }
        },
        scenes: [
          { caption: "رضا چرخ‌دستی را هل می‌دهد. چرخ‌دستی راه می‌افتد.", key: 2600, hold: 5000, do: [
            { id: "boy.armF", to: { r: -80 }, dur: 500 },
            { id: "boy", walk: [52, 82], at: 500, dur: 2400 }, { id: "boy.armF", to: { r: -80 }, at: 500, dur: 2400 },
            { id: "cart", path: "M45.9 82L77.9 82", at: 500, dur: 2400, ease: "linear" },
            { id: "cart.w1", to: { r: 360 }, at: 500, dur: 2400, ease: "linear" }, { id: "cart.w2", to: { r: 360 }, at: 500, dur: 2400, ease: "linear" },
            { id: "boy.armF", to: { r: -90 }, at: 2900, dur: 200 }, { id: "boy.armF", to: { r: 0 }, at: 3600, dur: 600 }
          ] },
          { caption: "سارا دستش را جلوی چرخ‌دستی می‌گیرد. چرخ‌دستی می‌ایستد.", key: 3400, hold: 5200, do: [
            { id: "girl.armF", to: { r: -80 }, dur: 600 },
            { id: "cart", path: "M77.9 82L97.4 82", at: 400, dur: 2200, ease: "out" },
            { id: "cart.w1", to: { r: 720 }, at: 400, dur: 2200, ease: "out" }, { id: "cart.w2", to: { r: 720 }, at: 400, dur: 2200, ease: "out" },
            { id: "girl", to: { x: "+0.8" }, at: 2500, dur: 200, yoyo: true, times: 2 }
          ] },
          { caption: "سارا طناب را می‌کشد. واگن کوچک دنبالش می‌آید.", key: 3800, hold: 6000, do: [
            { id: "boy", to: { o: 0 }, dur: 600 }, { id: "cart", to: { o: 0 }, dur: 600 }, { id: "girl", to: { o: 0 }, dur: 600 },
            { id: "girl2", to: { o: 1 }, at: 500, dur: 400 }, { id: "wagon", to: { o: 1 }, at: 500, dur: 400 }, { id: "girl2.armF", to: { r: 40 }, at: 500, dur: 400 },
            { id: "girl2", walk: [100, 82], at: 1000, dur: 4600 }, { id: "girl2.armF", to: { r: 40 }, at: 1000, dur: 4600 },
            { id: "wagon", path: "M-40 82L68 82", at: 1000, dur: 4600, ease: "linear" },
            { id: "wagon.w1", to: { r: 900 }, at: 1000, dur: 4600, ease: "linear" }, { id: "wagon.w2", to: { r: 900 }, at: 1000, dur: 4600, ease: "linear" }
          ] },
          { caption: "توپ را آرام هل بدهیم، کمی می‌رود.", key: 5100, do: [
            { id: "girl2", walk: [210, 82], dur: 2400 }, { id: "girl2.armF", to: { r: 40 }, dur: 2400 },
            { id: "wagon", path: "M68 82L178 82", dur: 2400, ease: "linear" },
            { id: "boy", to: { x: 30, o: 1 }, at: 1600, dur: 600 }, { id: "ball", to: { o: 1 }, at: 1600, dur: 600 },
            { id: "boy.armF", to: { r: -62 }, at: 2400, dur: 900, ease: "soft" },
            { id: "ball", path: "M49 71.6L66 71.6", at: 3200, dur: 1600, ease: "out" }, { id: "ball", to: { r: 150 }, at: 3200, dur: 1600, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 3700, dur: 600 },
            { id: "f1", to: { o: 1 }, at: 4800, dur: 400 }
          ] },
          { caption: "محکم هل بدهیم، دورتر می‌رود. به دیوار خورد و برگشت!", key: 3400, hold: 6400, do: [
            { id: "ball", to: { x: 49, r: 0 }, dur: 600 },
            { id: "boy.armF", to: { r: 30 }, at: 600, dur: 400 }, { id: "boy.armF", to: { r: -66 }, at: 1100, dur: 250, ease: "in" },
            { id: "ball", path: "M49 71.6L127.4 71.6", at: 1350, dur: 1600, ease: "in" }, { id: "ball", to: { r: 700 }, at: 1350, dur: 1600, ease: "in" },
            { id: "boy.armF", to: { r: 0 }, at: 1900, dur: 600 },
            { id: "wall", to: { x: "+0.8" }, at: 2950, dur: 150, yoyo: true, times: 2 },
            { id: "ball", path: "M127.4 71.6L102 71.6", at: 2950, dur: 1800, ease: "out" }, { id: "ball", to: { r: 380 }, at: 2950, dur: 1800, ease: "out" }
          ] }
        ],
        question: "برای اینکه توپ دورتر برود، چه کنیم؟",
        options: ["آرام‌تر هلش بدهیم", "محکم‌تر هلش بدهیم"], answer: "محکم‌تر هلش بدهیم" },
      { type: "sort", prompt: "هل می‌دهیم یا می‌کشیم؟", say: "این کارها هل دادن است یا کشیدن؟",
        baskets: [{ label: "هل دادن", pic: "🛒", value: "push" }, { label: "کشیدن", pic: "🪢", value: "pull" }],
        items: [
          { pic: "🛝", say: "هل دادن دوستت روی تاب", basket: "push" },
          { pic: "⚽", say: "شوت کردن توپ", basket: "push" },
          { pic: "🛒", say: "بردن چرخ‌دستی در بازار", basket: "push" },
          { pic: "🪁", say: "کشیدن نخ بادبادک", basket: "pull" },
          { pic: "🧦", say: "پوشیدن جوراب", basket: "pull" },
          { pic: "🪣", say: "بالا کشیدن سطل از چاه", basket: "pull" }
        ] },
      { type: "choose", prompt: "چرخ‌دستی دارد می‌رود. چطور نگهش داریم؟", say: "چرخ‌دستی دارد می‌رود. چطور نگهش داریم؟",
        options: ["دستمان را جلویش می‌گیریم", "برایش دست می‌زنیم"], answer: "دستمان را جلویش می‌گیریم" },
      { type: "choose", prompt: "کدام را با نخ می‌کشیم؟", say: "کدام را با نخ دنبال خودمان می‌کشیم؟", pic: true,
        options: [{ label: "⚽", value: "توپ فوتبال" }, { label: "🪁", value: "بادبادک" }], answer: "بادبادک" },
      { type: "doit", pic: "🚪 🧸", text: "تو هم هل بده و بکش!",
        list: ["یک بالش را روی زمین هل بده تا جلو برود.", "با یک طناب یا شال، جعبه‌ای را دنبال خودت بکش.", "توپ را آرام هل بده، بعد محکم. کدام دورتر رفت؟", "یک بار توپی را که دارد غلت می‌خورد با دست نگه دار."],
        say: "تو هم هل بده و بکش! یک بالش را روی زمین هل بده تا جلو برود. با یک طناب یا شال، جعبه‌ای را دنبال خودت بکش. توپ را آرام هل بده، بعد محکم. کدام دورتر رفت؟ یک بار توپی را که دارد غلت می‌خورد با دست نگه دار." }
    ]
  },
  {
    id: "science-seed-21", subject: "science", level: "seed", emoji: "🔔", title: "صداهای دور و بر ما",
    steps: [
      { type: "scene", prompt: "گوش کن! این صدای چیست؟", bg: "#cdeaf7",
        /* Sounds, each shown as arcs going out from where it is made, big for loud and small for quiet: the
           sparrow sings outside; inside, rain drops run down the window; the door slams shut; the kettle boils and
           whistles; Sara whispers to her mother; Reza calls loudly from across the room. Drawings:
           js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, door: { art: "sci-door", at: [62, 72] },
          d1: { art: "sci-drop", at: [21, 16], s: 0.8, o: 0 }, d2: { art: "sci-drop", at: [36, 16], s: 0.8, o: 0 }, d3: { art: "sci-drop", at: [27, 30], s: 0.8, o: 0 },
          a1: { art: "sci-arc", at: [50, 28], s: 0.7, o: 0 }, a2: { art: "sci-arc", at: [50, 28], s: 0.7, o: 0 },
          kettle: { art: "sci-kettle", at: [134, 54], s: 1.3 },
          w1: { art: "sci-steam", at: [114, 30], o: 0 }, w2: { art: "sci-steam", at: [117, 29], o: 0 },
          kw: { art: "sci-waves", at: [112, 30], s: 0.9, flip: true, o: 0 },
          bang: { art: "sci-waves", at: [86, 46], s: 1.8, o: 0 }, bang2: { art: "sci-waves", at: [60, 46], s: 1.8, flip: true, o: 0 },
          mom: { art: "👩", at: [104, 87], s: 1.3, flip: true, o: 0 }, girl: { art: "👧", at: [88, 87], s: 1.2, o: 0 },
          hush: { art: "sci-waves", at: [92.4, 64.6], s: 0.4, o: 0 },
          boy: { art: "👦", at: [22, 87], s: 1.3, o: 0 }, call: { art: "sci-waves", at: [27, 58], s: 1.6, o: 0 },
          out: { art: "sci-meadow" }, branch: { art: "sci-branch", at: [60, 50], s: 1.4 }, bird: { art: "sci-sparrow", at: [60, 50], s: 2 },
          n1: { art: "sci-note", at: [80, 30], s: 1.4, o: 0 }, n2: { art: "sci-note", at: [80, 30], s: 1.4, o: 0 }, n3: { art: "sci-note", at: [80, 30], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "گوش کن! گنجشک روی شاخه آواز می‌خواند: جیک، جیک!", key: 2600, hold: 5400, do: [
            { id: "bird.beak", to: { r: 30 }, at: 400, dur: 4400, yoyo: true, times: 14 },
            { id: "n1", to: { o: 1 }, at: 500, dur: 200 }, { id: "n1", path: "M80 30Q96 20 106 30T126 34", at: 500, dur: 1600 }, { id: "n1", to: { o: 0 }, at: 1900, dur: 300 },
            { id: "n2", to: { o: 1 }, at: 1300, dur: 200 }, { id: "n2", path: "M80 30Q96 42 106 34T126 38", at: 1300, dur: 1600 }, { id: "n2", to: { o: 0 }, at: 2700, dur: 300 },
            { id: "n3", to: { o: 1 }, at: 2100, dur: 200 }, { id: "n3", path: "M80 30Q94 24 106 26T126 36", at: 2100, dur: 1600 }, { id: "n3", to: { o: 0 }, at: 3500, dur: 300 }
          ] },
          { caption: "باران به پنجره می‌خورد: تق، تق، تق.", key: 2400, hold: 5600, do: [
            { id: "out", to: { o: 0 }, dur: 800 }, { id: "branch", to: { o: 0 }, dur: 800 }, { id: "bird", to: { o: 0 }, dur: 800 },
            { id: "door.leaf", to: { sx: 0.2 }, dur: 1 },
            { cam: { x: 36, y: 30, zoom: 2.2 }, at: 600, dur: 1200 },
            { id: "d1", to: { o: 1 }, at: 1000, dur: 200 }, { id: "d1", path: "M21 16L20 40", at: 1000, dur: 2400, ease: "in", times: 2 },
            { id: "d2", to: { o: 1 }, at: 1600, dur: 200 }, { id: "d2", path: "M36 16L35 40", at: 1600, dur: 2200, ease: "in", times: 2 },
            { id: "d3", to: { o: 1 }, at: 2200, dur: 200 }, { id: "d3", path: "M27 30L26 40", at: 2200, dur: 1400, ease: "in", times: 2 },
            { id: "a1", to: { o: 1 }, at: 1200, dur: 100 }, { id: "a1", to: { x: 58, o: 0 }, at: 1300, dur: 900, times: 4 },
            { id: "a2", to: { o: 1 }, at: 1700, dur: 100 }, { id: "a2", to: { x: 58, o: 0 }, at: 1800, dur: 900, times: 4 }
          ] },
          { caption: "در محکم بسته شد: بَنگ! این صدا بلند است.", key: 2000, hold: 5000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "door.leaf", to: { sx: 1 }, at: 1500, dur: 260, ease: "in" },
            { id: "door", to: { x: "+0.6" }, at: 1760, dur: 120, yoyo: true, times: 4 },
            { id: "bang", to: { o: 1 }, at: 1760, dur: 100 }, { id: "bang", to: { s: 2.6, o: 0 }, at: 2200, dur: 1400 },
            { id: "bang2", to: { o: 1 }, at: 1760, dur: 100 }, { id: "bang2", to: { s: 2.6, o: 0 }, at: 2200, dur: 1400 }
          ] },
          { caption: "آب کتری جوش آمد. کتری سوت می‌کشد!", key: 3000, hold: 5600, do: [
            { cam: { x: 124, y: 36, zoom: 2 }, dur: 1000 },
            { id: "w1", to: { o: 1 }, at: 900, dur: 1 }, { id: "w1", to: { y: 18, o: 0 }, at: 900, dur: 1800, times: 3, ease: "out" },
            { id: "w2", to: { o: 1 }, at: 1500, dur: 1 }, { id: "w2", to: { y: 16, o: 0 }, at: 1500, dur: 1800, times: 3, ease: "out" },
            { id: "kettle.lid", to: { r: 8 }, at: 1200, dur: 300, yoyo: true, times: 10 },
            { id: "kettle.whistle", to: { r: -14 }, at: 2000, dur: 200, yoyo: true, times: 12 },
            { id: "kw", to: { o: 1 }, at: 2000, dur: 200 }, { id: "kw", to: { s: 1.3 }, at: 2200, dur: 500, yoyo: true, times: 6 }
          ] },
          { caption: "سارا آرام با مادرش حرف می‌زند: پِچ‌پِچ. این صدا آرام است.", key: 3000, hold: 6000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 }, { id: "kw", to: { o: 0 }, dur: 400 },
            { id: "mom", to: { o: 1 }, at: 800, dur: 600 }, { id: "girl", to: { o: 1 }, at: 800, dur: 600 },
            { cam: { x: 96, y: 62, zoom: 2.2 }, at: 1600, dur: 1000 },
            { id: "hush", to: { o: 1 }, at: 2600, dur: 300 }, { id: "hush", to: { s: 0.5 }, at: 2900, dur: 500, yoyo: true, times: 4 },
            { id: "mom", to: { r: -4 }, at: 2600, dur: 1600, yoyo: true, times: 2 }
          ] },
          { caption: "رضا از آن طرف اتاق بلند صدا می‌زند: «سارا!» این صدا بلند است.", key: 2600, hold: 5400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "boy", to: { o: 1 }, at: 600, dur: 600 },
            { id: "call", to: { o: 1 }, at: 1600, dur: 100 }, { id: "call", to: { s: 2.2 }, at: 1700, dur: 500, yoyo: true, times: 6 },
            { id: "girl", to: { y: "-2" }, at: 2200, dur: 300, yoyo: true, times: 2 }
          ] }
        ],
        question: "کدام صدا بلندتر است؟", pic: true,
        options: [{ label: "🤫", value: "پچ‌پچ" }, { label: "🚒", value: "آژیر ماشین آتش‌نشانی" }], answer: "آژیر ماشین آتش‌نشانی" },
      { type: "pairs", prompt: "صدای کیست؟", say: "روی کارت‌ها بزن و گوش کن. هر صدا را به صاحبش برسان.",
        pairs: [
          [{ pic: "🐦", say: "گنجشک" }, { pic: "🔊", label: "جیک‌جیک", say: "جیک جیک" }],
          [{ pic: "🐈", say: "گربه" }, { pic: "🔊", label: "میو", say: "میو میو" }],
          [{ pic: "🐑", say: "گوسفند" }, { pic: "🔊", label: "بع‌بع", say: "بع بع" }],
          [{ pic: "🐓", say: "خروس" }, { pic: "🔊", label: "قوقولی‌قوقو", say: "قوقولی قوقو" }]
        ] },
      { type: "pairs", prompt: "صدای چیست؟", say: "هر صدا را به چیزی که آن را می‌سازد برسان.",
        pairs: [
          [{ pic: "🌧️", say: "باران" }, { pic: "🔊", label: "شُرشُر", say: "شُر شُر" }],
          [{ pic: "🔔", say: "زنگ" }, { pic: "🔊", label: "دینگ‌دینگ", say: "دینگ دینگ" }],
          [{ pic: "🚪", say: "در" }, { pic: "🔊", label: "تق‌تق", say: "تق تق" }]
        ] },
      { type: "choose", prompt: "کدام صدا آرام است؟", say: "کدام صدا آرام است؟", pic: true,
        options: [{ label: "🚒", value: "آژیر" }, { label: "🤫", value: "پچ‌پچ" }, { label: "🐶", value: "پارس سگ" }], answer: "پچ‌پچ" },
      { type: "home", pic: "👂 🍚", text: "چشمت را ببند و گوش کن!",
        need: ["دو بطری کوچک پلاستیکی با در", "کمی برنج و کمی نخود یا لوبیا"],
        steps: [
          "با هم یک دقیقه در اتاق یا حیاط بنشینید، چشم‌ها را ببندید و فقط گوش کنید.",
          "بعد بگویید چه صداهایی شنیدید: کدام بلند بود؟ کدام آرام؟ کدام از دور می‌آمد؟",
          "در یک بطری کمی برنج و در بطری دیگر کمی نخود بریزید و درشان را محکم ببندید.",
          "بطری‌ها را تکان دهید: صدای کدام بلندتر است؟ یک بار آرام تکان دهید و یک بار تند.",
          "بطری‌ها را از دسترس بچه‌های خیلی کوچک دور نگه دارید."
        ],
        ask: "بلندترین صدایی که امروز شنیدی چه بود؟" }
    ]
  },
  {
    id: "science-seed-22", subject: "science", level: "seed", emoji: "🧱", title: "برج بلند بساز",
    steps: [
      { type: "scene", prompt: "آرش برج می‌سازد", bg: "#f6efdc",
        /* Arash takes blocks out of the toy box and stacks them one on another into a tall, thin tower; it sways
           and falls. He does not give up: he builds again with a wide bottom (three, then two, then one), and this
           tower stands. Drawings: js/art/rig-science.js. Block moves are made by a small script (positions on the
           floor at y = 84, the tower at x = 84). */
        parts: {
          room: { art: "sci-room" },
          box: { art: "📦", at: [46, 87], s: 0.9 },
          k1: { art: "sci-block-r", at: [46, 80], o: 0 },
          k2: { art: "sci-block-y", at: [46, 80], o: 0 },
          k3: { art: "sci-block-b", at: [46, 80], o: 0 },
          k4: { art: "sci-block-g", at: [46, 80], o: 0 },
          k5: { art: "sci-block-r", at: [46, 80], o: 0 },
          k6: { art: "sci-block-y", at: [46, 80], o: 0 },
          boy: { art: "👦", at: [24, 87], s: 1.3 }
        },
        scenes: [
          { caption: "آرش مکعب‌ها را روی هم می‌گذارد و یک برج بلند می‌سازد.", key: 8100, hold: 8400, do: [
            { id: "boy.armF", to: { r: -70 }, at: 600, dur: 500 }, { id: "k1", to: { o: 1 }, at: 900, dur: 200 }, { id: "k1", path: "M46 80Q65 66 84 84", at: 900, dur: 1000 }, { id: "boy.armF", to: { r: -20 }, at: 1900, dur: 500 },
            { id: "boy.armF", to: { r: -70 }, at: 2100, dur: 500 }, { id: "k2", to: { o: 1 }, at: 2400, dur: 200 }, { id: "k2", path: "M46 80Q65 62 84 76", at: 2400, dur: 1000 }, { id: "boy.armF", to: { r: -20 }, at: 3400, dur: 500 },
            { id: "boy.armF", to: { r: -70 }, at: 3600, dur: 500 }, { id: "k3", to: { o: 1 }, at: 3900, dur: 200 }, { id: "k3", path: "M46 80Q65 54 84 68", at: 3900, dur: 1000 }, { id: "boy.armF", to: { r: -20 }, at: 4900, dur: 500 },
            { id: "boy.armF", to: { r: -70 }, at: 5100, dur: 500 }, { id: "k4", to: { o: 1 }, at: 5400, dur: 200 }, { id: "k4", path: "M46 80Q65 46 84 60", at: 5400, dur: 1000 }, { id: "boy.armF", to: { r: -20 }, at: 6400, dur: 500 },
            { id: "boy.armF", to: { r: -70 }, at: 6600, dur: 500 }, { id: "k5", to: { o: 1 }, at: 6900, dur: 200 }, { id: "k5", path: "M46 80Q65 38 84 52", at: 6900, dur: 1000 }, { id: "boy.armF", to: { r: -20 }, at: 7900, dur: 500 }
          ] },
          { caption: "برج بلند و باریک است. دارد تکان می‌خورد…", key: 1800, hold: 4400, do: [
            { id: "k1", to: { x: 84 }, at: 400, dur: 700, yoyo: true, times: 6 },
            { id: "k2", to: { x: 84.5 }, at: 400, dur: 700, yoyo: true, times: 6 },
            { id: "k3", to: { x: 85 }, at: 400, dur: 700, yoyo: true, times: 6 },
            { id: "k4", to: { x: 85.5 }, at: 400, dur: 700, yoyo: true, times: 6 },
            { id: "k5", to: { x: 86 }, at: 400, dur: 700, yoyo: true, times: 6 }
          ] },
          { caption: "و افتاد! اشکالی ندارد.", key: 2400, hold: 4000, do: [
            { id: "k1", path: "M84 84Q82 78 80 84", at: 440, dur: 700, ease: "in" }, { id: "k1", to: { r: 0 }, at: 440, dur: 700 },
            { id: "k2", path: "M84 76Q89 70 94 84", at: 380, dur: 820, ease: "in" }, { id: "k2", to: { r: 90 }, at: 380, dur: 820 },
            { id: "k3", path: "M84 68Q94 62 104 84", at: 320, dur: 940, ease: "in" }, { id: "k3", to: { r: -90 }, at: 320, dur: 940 },
            { id: "k4", path: "M84 60Q76 54 68 84", at: 260, dur: 1060, ease: "in" }, { id: "k4", to: { r: 90 }, at: 260, dur: 1060 },
            { id: "k5", path: "M84 52Q100 46 116 84", at: 200, dur: 1180, ease: "in" }, { id: "k5", to: { r: 180 }, at: 200, dur: 1180 },
            { id: "boy", to: { y: "-2" }, at: 1600, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "آرش دوباره امتحان می‌کند. این بار پایین برج را پهن می‌سازد.", key: 8200, hold: 9000, do: [
            { id: "boy.armF", to: { r: -70 }, at: 400, dur: 400 }, { id: "k1", path: "M80 84Q77 70 74 84", at: 600, dur: 900 }, { id: "k1", to: { r: 0 }, at: 600, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 1500, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 1700, dur: 400 }, { id: "k2", path: "M94 84Q89 70 84 84", at: 1900, dur: 900 }, { id: "k2", to: { r: 0 }, at: 1900, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 2800, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 3000, dur: 400 }, { id: "k3", path: "M104 84Q99 70 94 84", at: 3200, dur: 900 }, { id: "k3", to: { r: 0 }, at: 3200, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 4100, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 4300, dur: 400 }, { id: "k4", path: "M68 84Q73.5 62 79 76", at: 4500, dur: 900 }, { id: "k4", to: { r: 0 }, at: 4500, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 5400, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 5600, dur: 400 }, { id: "k5", path: "M116 84Q102.5 62 89 76", at: 5800, dur: 900 }, { id: "k5", to: { r: 0 }, at: 5800, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 6700, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 6900, dur: 400 }, { id: "k6", path: "M46 80Q65 54 84 68", at: 7100, dur: 900 }, { id: "k6", to: { r: 0 }, at: 7100, dur: 900 }, { id: "boy.armF", to: { r: -20 }, at: 8000, dur: 400 }, { id: "k6", to: { o: 1 }, at: 7100, dur: 200 }
          ] },
          { caption: "برج پهن محکم ایستاد!", key: 2200, hold: 4600, do: [
            { emit: "spark", where: [84, 56], spread: [24, 12], n: 8, at: 300, dur: 1400 },
            { id: "boy", to: { y: "-4" }, at: 600, dur: 600, yoyo: true, times: 4 }
          ] }
        ],
        question: "کدام برج بهتر می‌ایستد؟",
        options: ["برجی که پایینش باریک است", "برجی که پایینش پهن است"], answer: "برجی که پایینش پهن است" },
      { type: "choose", prompt: "برجت افتاد. حالا چه کار می‌کنی؟", say: "برجت افتاد. حالا چه کار می‌کنی؟",
        options: ["دوباره می‌سازم", "دیگر هیچ‌وقت نمی‌سازم"], answer: "دوباره می‌سازم" },
      { type: "choose", prompt: "می‌خواهی با سنگ برج بسازی. کدام سنگ را پایین بگذاری؟", say: "می‌خواهی با سنگ‌ها برج بسازی. کدام سنگ را پایین‌تر از همه بگذاری؟",
        options: ["سنگ بزرگ و پهن", "سنگ کوچک و گرد"], answer: "سنگ بزرگ و پهن" },
      { type: "choose", prompt: "برج بلندتر را چطور محکم‌تر کنیم؟", say: "برای اینکه برج بلند نیفتد، چه کار کنیم؟",
        options: ["پایینش را پهن‌تر بسازیم", "بالایش را سنگین‌تر کنیم"], answer: "پایینش را پهن‌تر بسازیم" },
      { type: "home", pic: "🧱 📦", text: "یک برج بساز! چند تا روی هم می‌ایستند؟",
        need: ["چیزهای سبک برای ساختن: قوطی‌های خالی، جعبه‌های کوچک مقوایی، لیوان‌های کاغذی یا مکعب‌های اسباب‌بازی"],
        steps: [
          "پیش از ساختن بپرسید: «فکر می‌کنی چند تا روی هم می‌ایستند؟»",
          "اول یک برج باریک بسازید: یکی روی یکی. بشمارید چند تا ایستاد.",
          "بعد یک برج با پایین پهن بسازید: سه تا پایین، دو تا رویشان، یکی بالا. کدام محکم‌تر بود؟",
          "اگر برج افتاد، بخندید و دوباره بسازید. بپرسید: «این بار چه چیزی را عوض کنیم؟»",
          "فقط چیزهای سبک به کار ببرید که اگر افتادند به کسی آسیب نزنند."
        ],
        ask: "بلندترین برجت چند طبقه بود؟ چه کردی که نیفتد؟" }
    ]
  },
  {
    id: "science-seed-23", subject: "science", level: "seed", emoji: "🎲", title: "بازی چیزها",
    steps: [
      { type: "sort", prompt: "غلت می‌خورد یا سُر می‌خورد؟", say: "گردها غلت می‌خورند و پهن‌ها سُر می‌خورند. هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "غلت می‌خورد", pic: "⚽", value: "roll" }, { label: "سُر می‌خورد", pic: "🛷", value: "slide" }],
        items: [
          { pic: "🍊", say: "پرتقال", basket: "roll" },
          { pic: "🥫", say: "قوطی خوابیده", basket: "roll" },
          { pic: "🧶", say: "کلاف کاموا", basket: "roll" },
          { pic: "📦", say: "جعبه", basket: "slide" },
          { pic: "📕", say: "کتاب", basket: "slide" },
          { pic: "🧽", say: "اسفنج", basket: "slide" }
        ] },
      { type: "sort", prompt: "هل می‌دهیم یا می‌کشیم؟", say: "این کارها هل دادن است یا کشیدن؟",
        baskets: [{ label: "هل دادن", pic: "🛒", value: "push" }, { label: "کشیدن", pic: "🪢", value: "pull" }],
        items: [
          { pic: "🛝", say: "هل دادن تاب", basket: "push" },
          { pic: "🛒", say: "بردن چرخ‌دستی", basket: "push" },
          { pic: "⚽", say: "شوت کردن توپ", basket: "push" },
          { pic: "🪁", say: "کشیدن نخ بادبادک", basket: "pull" },
          { pic: "🪣", say: "بالا کشیدن سطل", basket: "pull" },
          { pic: "🛷", say: "کشیدن سورتمه روی برف", basket: "pull" }
        ] },
      { type: "sort", prompt: "سنگین یا سبک؟", say: "سنگین‌ها یک طرف، سبک‌ها یک طرف.",
        baskets: [{ label: "سنگین", pic: "🧱", value: "heavy" }, { label: "سبک", pic: "🎈", value: "light" }],
        items: [
          { pic: "🍉", say: "هندوانه", basket: "heavy" },
          { pic: "🪨", say: "سنگ بزرگ", basket: "heavy" },
          { pic: "🛋️", say: "مبل", basket: "heavy" },
          { pic: "🪶", say: "پَر", basket: "light" },
          { pic: "🍃", say: "برگ", basket: "light" },
          { pic: "🧻", say: "دستمال کاغذی", basket: "light" }
        ] },
      { type: "pairs", prompt: "صدای کیست؟", say: "روی کارت‌ها بزن و گوش کن. هر صدا را به صاحبش برسان.",
        pairs: [
          [{ pic: "🐶", say: "سگ" }, { pic: "🔊", label: "هاپ‌هاپ", say: "هاپ هاپ" }],
          [{ pic: "🐄", say: "گاو" }, { pic: "🔊", label: "ماع", say: "ماع" }],
          [{ pic: "🐝", say: "زنبور" }, { pic: "🔊", label: "وِزوِز", say: "وِز وِز" }],
          [{ pic: "🔔", say: "زنگ" }, { pic: "🔊", label: "دینگ‌دینگ", say: "دینگ دینگ" }]
        ] },
      { type: "sort", prompt: "صدای بلند یا آرام؟", say: "صداهای بلند یک طرف، صداهای آرام یک طرف.",
        baskets: [{ label: "بلند", pic: "📢", value: "loud" }, { label: "آرام", pic: "🤫", value: "quiet" }],
        items: [
          { pic: "🚒", say: "آژیر ماشین آتش‌نشانی", basket: "loud" },
          { pic: "⚡", say: "رعد", basket: "loud" },
          { pic: "🐓", say: "خروس", basket: "loud" },
          { pic: "🐈", say: "خُرخُر گربه", basket: "quiet" },
          { pic: "🍃", say: "خش‌خش برگ", basket: "quiet" },
          { pic: "😴", say: "نفس کشیدن کسی که خواب است", basket: "quiet" }
        ] },
      { type: "home", pic: "🔍 🏠", text: "در خانه دنبال این‌ها بگرد!",
        need: ["هیچ چیز! فقط خانه خودتان"],
        steps: [
          "با هم در خانه بگردید و پیدا کنید: یک چیز که غلت می‌خورد، یک چیز که سُر می‌خورد.",
          "یک چیز که هلش می‌دهیم (مثل در کشو) و یک چیز که می‌کشیمش (مثل زیپ).",
          "یک چیز سنگین و یک چیز سبک. هر دو را در دو دست بگیرید و مقایسه کنید.",
          "یک چیز که صدای بلند دارد و یک چیز که صدای آرام دارد."
        ],
        ask: "کدام را از همه زودتر پیدا کردی؟" }
    ]
  },
  {
    id: "science-seed-24", subject: "science", level: "seed", emoji: "🔍", title: "دانشمند کوچک در حیاط",
    steps: [
      { type: "scene", prompt: "مثل یک دانشمند نگاه کن", bg: "#cdeaf7",
        /* Look, guess, check, tell: Sara comes into the yard with a magnifying glass, looks closely at a ladybird on
           a big leaf of the bush, guesses that something is under the leaf, lifts the leaf and finds a caterpillar,
           and goes to tell her grandmother. Her hand is at the shoulder (66, 68.5) plus the arm (9.1) turned by
           armF. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [24, 14] },
          tree: { art: "sci-tree", at: [22, 84], s: 0.8 },
          bush: { art: "sci-bush", at: [96, 86], s: 1.3 },
          cat: { art: "🐛", at: [83, 73], s: 0.45, o: 0 },
          bug: { art: "🐞", at: [80, 67.6], s: 0.3 },
          girl: { art: "👧", at: [-10, 86], s: 1.2 }, glass: { art: "🔍", at: [75.5, 71], s: 0.45, o: 0 },
          gran: { art: "👵", at: [148, 86], s: 1.15, flip: true },
          talk: { art: "sci-waves", at: [129.6, 64.6], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "سارا با ذره‌بین به حیاط آمده تا چیزها را از نزدیک ببیند.", key: 4000, hold: 5200, do: [
            { id: "girl", walk: [66, 86], dur: 3200, steps: 10 },
            { id: "girl.armF", to: { r: -80 }, at: 3300, dur: 600 }, { id: "glass", to: { o: 1 }, at: 3500, dur: 400 }
          ] },
          { caption: "از نزدیک نگاه می‌کند: روی برگ یک کفشدوزک است! خال‌هایش را می‌شمارد.", key: 2600, hold: 6000, do: [
            { cam: { x: 78, y: 66, zoom: 3 }, dur: 1200 },
            { id: "bug", path: "M80 67.6L82 67.2", at: 1400, dur: 2000 },
            { id: "glass", to: { s: 0.5 }, at: 1400, dur: 900, yoyo: true, times: 2 }
          ] },
          { caption: "کفشدوزک پرید و رفت. سارا حدس می‌زند: «زیر این برگ چیزی هست؟»", key: 3400, hold: 5600, do: [
            { cam: { x: 80, y: 56, zoom: 1.6 }, dur: 1000 },
            { id: "bug", path: "M82 67.2Q100 40 150 20", at: 600, dur: 2000 }, { id: "bug", to: { o: 0 }, at: 2300, dur: 300 },
            { id: "glass", to: { o: 0 }, at: 2400, dur: 400 }, { id: "girl.armF", to: { r: -20 }, at: 2400, dur: 500 },
            { id: "girl", to: { r: 3 }, at: 3000, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "برگ را آرام بالا می‌زند. زیرش یک کرم کوچک است! حدسش درست بود.", key: 3200, hold: 5800, do: [
            { id: "girl.armF", to: { r: -80 }, dur: 600 }, { cam: { x: 80, y: 64, zoom: 2.4 }, dur: 1000 },
            { id: "girl.armF", to: { r: -112 }, at: 900, dur: 900 }, { id: "bush.flap", to: { r: 40 }, at: 900, dur: 900 },
            { id: "cat", to: { o: 1 }, at: 1500, dur: 400 },
            { id: "cat", path: "M83 73L86 73", at: 2000, dur: 2600 }, { id: "cat", to: { sy: 0.92 }, at: 2000, dur: 2600, yoyo: true, times: 6 }
          ] },
          { caption: "سارا پیش مادربزرگ می‌رود و می‌گوید چه دید.", key: 4400, hold: 6400, do: [
            { id: "bush.flap", to: { r: 0 }, dur: 700 }, { id: "cat", to: { o: 0 }, dur: 500 }, { id: "girl.armF", to: { r: 0 }, dur: 600 },
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "girl", walk: [126, 86], at: 700, dur: 2800, steps: 9 },
            { id: "talk", to: { o: 1 }, at: 3700, dur: 200 }, { id: "talk", to: { s: 0.65 }, at: 3900, dur: 500, yoyo: true, times: 4 },
            { id: "gran", to: { r: -5 }, at: 4200, dur: 500, yoyo: true, times: 4 }
          ] },
          { caption: "نگاه کن، حدس بزن، امتحان کن و بگو. مثل یک دانشمند!", key: 1600, hold: 4400, do: [
            { id: "talk", to: { o: 0 }, dur: 300 },
            { emit: "spark", where: [128, 50], spread: [20, 10], n: 8, at: 300, dur: 1400 },
            { id: "girl", to: { y: "-4" }, at: 500, dur: 600, yoyo: true, times: 4 }
          ] }
        ],
        question: "سارا برای این‌که کفشدوزک را از نزدیک ببیند، با خودش چه آورده بود؟", pic: true,
        options: [{ label: "🧦", value: "جوراب" }, { label: "🔍", value: "ذره‌بین" }, { label: "🥄", value: "قاشق" }], answer: "ذره‌بین" },
      { type: "choose", prompt: "زیر برگ یک کرم کوچک دیدی. چه کار می‌کنی؟", say: "زیر برگ یک کرم کوچک دیدی. چه کار می‌کنی؟",
        options: ["نگاهش می‌کنم و به یک بزرگ‌تر می‌گویم", "لهش می‌کنم"], answer: "نگاهش می‌کنم و به یک بزرگ‌تر می‌گویم" },
      { type: "choose", prompt: "می‌خواهی بفهمی سنگ زبر است یا صاف. چه کار می‌کنی؟", say: "می‌خواهی بفهمی یک سنگ زبر است یا صاف. چه کار می‌کنی؟", pic: true,
        options: [{ label: "✋", value: "لمسش می‌کنم" }, { label: "👂", value: "به آن گوش می‌دهم" }], answer: "لمسش می‌کنم" },
      { type: "choose", prompt: "دانشمند کوچک پیش از امتحان کردن چه کار می‌کند؟", say: "دانشمند کوچک پیش از امتحان کردن چه کار می‌کند؟",
        options: ["حدس می‌زند", "می‌خوابد"], answer: "حدس می‌زند" },
      { type: "home", pic: "🔍 🌿", text: "امروز تو دانشمند حیاط هستی!",
        need: ["یک ذره‌بین، اگر دارید", "یک کیسه کوچک", "کاغذ و مداد رنگی"],
        steps: [
          "با کودک در حیاط، پارک یا کوچه آرام راه بروید و از نزدیک نگاه کنید: برگ‌ها، سنگ‌ها، پوست درخت، حشره‌ها.",
          "پیش از نگاه کردن زیر یک برگ یا کنار یک گلدان، بپرسید: «فکر می‌کنی آن‌جا چه هست؟» بعد با هم نگاه کنید.",
          "یک برگ افتاده و یک سنگ کوچک جمع کنید و با دست لمس کنید: زبر است یا صاف؟ چه رنگی است؟",
          "به حشره‌ها و حیوان‌ها فقط نگاه کنید و دست نزنید. بعد از بازی دست‌ها را بشویید.",
          "در خانه، کودک یکی از چیزهایی را که دید نقاشی کند و برای خانواده تعریف کند."
        ],
        ask: "امروز چه چیز تازه‌ای دیدی؟ حدست درست بود؟" }
    ]
  },
  {
    id: "science-sprout-7", subject: "science", level: "sprout", emoji: "❓", title: "زنگ علوم: نگاه کن، بپرس",
    steps: [
      { type: "scene", prompt: "یک دانشمند چطور کار می‌کند؟", bg: "#cdeaf7",
        /* Ask, look, guess, try, draw: Arash sees ants going into a crack in the low wall and asks a question; he
           looks closely and guesses; he puts a sugar cube on the wall; the ants come to it; he draws what he saw.
           His hand is at the shoulder (76, 68.5) plus the arm (9.1) turned by armF. Drawings:
           js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [26, 14] },
          wall: { art: "sci-wall", at: [104, 86], s: 1.1 }, hole: { art: "sci-nesthole", at: [112, 71.4] },
          sugar: { art: "sci-sugar", at: [82, 60], s: 1.6, o: 0 },
          a1: { art: "🐜", at: [124, 71.4], s: 0.25 }, a2: { art: "🐜", at: [112, 71.4], s: 0.25, o: 0 }, a3: { art: "🐜", at: [112, 71.4], s: 0.25, o: 0 },
          boy: { art: "👦", at: [-10, 86], s: 1.2 },
          q: { art: "❓", at: [70, 50], s: 0.6, o: 0 },
          note: { art: "sci-notebook", at: [92, 54], s: 1, o: 0 }
        },
        scenes: [
          { caption: "آرش مورچه‌ای را دید که به خانه‌اش می‌رفت. از خودش پرسید: «مورچه‌ها چه می‌خورند؟»", key: 2400, hold: 7000, do: [
            { id: "boy", walk: [76, 86], dur: 3000, steps: 9 },
            { id: "a1", path: "M124 71.4L112 71.4", at: 1000, dur: 2800, ease: "linear" }, { id: "a1", to: { o: 0 }, at: 3800, dur: 300 },
            { id: "q", to: { o: 1 }, at: 4200, dur: 400 }, { id: "q", to: { s: 0.7 }, at: 4600, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "از نزدیک نگاه کرد و حدس زد: «شاید شیرینی دوست دارند.»", key: 2400, hold: 5600, do: [
            { id: "q", to: { o: 0 }, dur: 400 },
            { cam: { x: 98, y: 66, zoom: 2.4 }, dur: 1200 },
            { id: "boy", to: { r: 6 }, at: 1200, dur: 800 }, { id: "boy", to: { r: 0 }, at: 4000, dur: 600 }
          ] },
          { caption: "برای امتحان، یک حبه قند روی دیوار گذاشت.", key: 2400, hold: 4800, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "boy.armF", to: { r: -72 }, at: 600, dur: 800 }, { id: "sugar", to: { o: 1 }, at: 600, dur: 200 },
            { id: "sugar", path: "M78 70Q82 66 84.7 70.4", at: 600, dur: 800 },
            { id: "boy.armF", to: { r: 0 }, at: 2200, dur: 700 }
          ] },
          { caption: "کمی بعد مورچه‌ها سراغ قند آمدند!", key: 5000, hold: 7000, do: [
            { cam: { x: 98, y: 66, zoom: 2.4 }, dur: 1000 },
            { id: "a2", to: { o: 1 }, at: 900, dur: 300 }, { id: "a2", path: "M112 71.4L87 71.4", at: 900, dur: 4000, ease: "linear" },
            { id: "a3", to: { o: 1 }, at: 2200, dur: 300 }, { id: "a3", path: "M112 71.4L90 71.4", at: 2200, dur: 3800, ease: "linear" }
          ] },
          { caption: "آرش چیزی را که دید روی کاغذ کشید.", key: 5200, hold: 5600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "boy.armF", to: { r: -100 }, at: 600, dur: 700 }, { id: "note", to: { o: 1 }, at: 900, dur: 400 },
            { cam: { x: 90, y: 56, zoom: 2 }, at: 1500, dur: 900 },
            { id: "note.sketch", draw: true, at: 2400, dur: 2600 }
          ] }
        ],
        question: "آرش اول چه کار کرد؟",
        options: ["سؤال پرسید", "قند خورد", "خوابید"], answer: "سؤال پرسید" },
      { type: "order", prompt: "کار دانشمند را به ترتیب بچین", say: "اول می‌پرسیم، بعد نگاه می‌کنیم، بعد حدس می‌زنیم، امتحان می‌کنیم و آخر می‌کشیم. به ترتیب بچین.", numbered: true,
        items: [{ pic: "❓", say: "می‌پرسیم" }, { pic: "🔍", say: "نگاه می‌کنیم" }, { pic: "💭", say: "حدس می‌زنیم" }, { pic: "✋", say: "امتحان می‌کنیم" }, { pic: "✏️", say: "می‌کشیم و می‌گوییم" }] },
      { type: "choose", prompt: "اگر حدست درست نبود، چه؟", say: "اگر حدست درست نبود، چه؟",
        options: ["اشکالی ندارد، چیز تازه‌ای یاد گرفتم", "حدس زدن کار بدی است"], answer: "اشکالی ندارد، چیز تازه‌ای یاد گرفتم" },
      { type: "choose", prompt: "برای دیدن چیزهای خیلی کوچک چه برداریم؟", say: "برای دیدن چیزهای خیلی کوچک چه برداریم؟", pic: true,
        options: [{ label: "🔍", value: "ذره‌بین" }, { label: "🧦", value: "جوراب" }, { label: "🥄", value: "قاشق" }], answer: "ذره‌بین" },
      { type: "paper", pic: "❓ ✏️", text: "یک سؤال درباره دور و برت بپرس. حدس بزن، امتحان کن و چیزی را که دیدی روی کاغذ بکش.",
        check: ["سؤالش را بلند گفت؟", "پیش از امتحان حدس زد؟", "چیزی را که دید کشید و برایتان تعریف کرد؟"],
        note: "سؤال‌های ساده خوب‌اند: «کدام زودتر خشک می‌شود؟»، «گربه کجا می‌خوابد؟». جواب درست مهم نیست؛ پرسیدن، حدس زدن و امتحان کردن مهم است." }
    ]
  },
  {
    id: "science-sprout-10", subject: "science", level: "sprout", emoji: "🐇", title: "جانوران چطور راه می‌روند؟",
    steps: [
      { type: "scene", prompt: "هر جانور چطور جابه‌جا می‌شود؟", bg: "#cdeaf7",
        /* One meadow and, along it, a pond seen from under the water (the world is 320 wide; the camera pans): the
           rabbit hops, the sparrow flies flapping its wings, the snake crawls in curves, the horse walks on four legs,
           and under the water the fish swims, moving its tail. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sea: { art: "sci-underwater", at: [160, 0] }, sun: { art: "sci-sun", at: [26, 14] },
          rabbit: { art: "🐰", at: [-14, 86], s: 1.1 },
          bird: { art: "sci-sparrow", at: [-16, 30], s: 1.6 },
          snake: { art: "🐍", at: [70, 88], s: 0.9, o: 0 },
          horse: { art: "🐴", at: [-20, 86], s: 1.4, flip: true },
          fish: { art: "🐟", at: [330, 50], s: 1 }
        },
        scenes: [
          { caption: "خرگوش با پاهایش می‌پرد.", key: 2250, do: [
            { id: "rabbit", path: "M-14 86Q-4 62 6 86Q16 62 26 86Q36 62 46 86Q56 62 66 86", dur: 3600, ease: "linear" }
          ] },
          { caption: "گنجشک بال می‌زند و پرواز می‌کند.", key: 2000, do: [
            { id: "bird.wing", to: { r: -40 }, dur: 4000, yoyo: true, times: 22 },
            { id: "bird", path: "M-16 30Q60 4 150 20", dur: 4000, ease: "linear" }, { id: "bird", to: { o: 0 }, at: 3700, dur: 400 }
          ] },
          { caption: "مار پا ندارد. روی زمین می‌خزد.", key: 2400, do: [
            { id: "snake", to: { o: 1 }, dur: 400 },
            { id: "snake", path: "M70 88C80 84 86 92 96 88S112 84 122 88", at: 200, dur: 4000, ease: "linear" },
            { id: "snake", to: { sy: 0.85 }, at: 200, dur: 4000, yoyo: true, times: 8 }
          ] },
          { caption: "اسب با چهار پایش راه می‌رود.", key: 2400, hold: 5000, do: [
            { id: "snake", to: { o: 0 }, dur: 400 },
            { id: "horse", path: "M-20 86L110 86", dur: 4400, ease: "linear" }, { id: "horse", to: { y: "-1.2" }, dur: 4400, yoyo: true, times: 16 }
          ] },
          { caption: "ماهی با دم و باله‌هایش در آب شنا می‌کند.", key: 3400, hold: 6000, do: [
            { cam: { x: 240, y: 45, zoom: 1 }, dur: 2000 },
            { id: "fish", path: "M330 50C300 40 280 60 250 50S210 44 190 52", at: 1400, dur: 4400, ease: "linear" },
            { id: "fish", to: { r: 8 }, at: 1400, dur: 4400, yoyo: true, times: 12 }
          ] }
        ],
        question: "مار چطور جابه‌جا می‌شود؟",
        options: ["پرواز می‌کند", "روی زمین می‌خزد", "با پا می‌پرد"], answer: "روی زمین می‌خزد" },
      { type: "sort", prompt: "پرواز، شنا یا راه رفتن؟", say: "کدام پرواز می‌کند، کدام شنا می‌کند و کدام روی زمین راه می‌رود؟",
        baskets: [{ label: "پرواز", pic: "🐦", value: "fly" }, { label: "شنا", pic: "🌊", value: "swim" }, { label: "راه رفتن", pic: "🐾", value: "walk" }],
        items: [
          { pic: "🦋", say: "پروانه", basket: "fly" },
          { pic: "🦉", say: "جغد", basket: "fly" },
          { pic: "🐬", say: "دلفین", basket: "swim" },
          { pic: "🐙", say: "هشت‌پا", basket: "swim" },
          { pic: "🐫", say: "شتر", basket: "walk" },
          { pic: "🐄", say: "گاو", basket: "walk" }
        ] },
      { type: "choose", prompt: "پرنده با چه پرواز می‌کند؟", say: "پرنده با چه پرواز می‌کند؟",
        options: ["بال", "باله", "دم"], answer: "بال" },
      { type: "choose", prompt: "کدام پا ندارد؟", say: "کدام جانور پا ندارد؟", pic: true,
        options: [{ label: "🐍", value: "مار" }, { label: "🐈", value: "گربه" }, { label: "🐔", value: "مرغ" }], answer: "مار" },
      { type: "doit", pic: "🐇 🐍 🐦", text: "بازی «حدس بزن کدام جانورم!»",
        list: ["تو مثل یک جانور حرکت کن: بپر، بخز، بال بزن، شنا کن یا چهار دست و پا برو.", "پدر یا مادرت حدس بزنند کدام جانوری.", "جایتان را عوض کنید: حالا آن‌ها حرکت کنند و تو حدس بزن."],
        say: "بازی حدس بزن کدام جانورم! مثل یک جانور حرکت کن: بپر، بخز، بال بزن، شنا کن یا چهار دست و پا برو. پدر یا مادرت حدس بزنند کدام جانوری. بعد جایتان را عوض کنید." }
    ]
  },
  {
    id: "science-sprout-11", subject: "science", level: "sprout", emoji: "🪶", title: "پر، مو، فلس",
    steps: [
      { type: "scene", prompt: "بدن جانوران با چه پوشیده شده؟", bg: "#cdeaf7",
        /* Close looks at what covers each animal: a feather falls from the sparrow; the child strokes the cat's fur
           (wait: rub); the camera comes close to the fish's scales; the tortoise has a hard shell; the frog's skin
           is smooth and wet. Drawings: js/art/rig-science.js, cat-side and hand from js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" },
          branch: { art: "sci-branch", at: [34, 40], s: 1.3 }, bird: { art: "sci-sparrow", at: [34, 40], s: 2 },
          feather: { art: "sci-feather", at: [40, 34], s: 0.9, o: 0 },
          cat: { art: "cat-side", at: [104, 84], s: 2.4 }, hand: { art: "hand", at: [140, 120], r: -90, s: 1 },
          sea: { art: "sci-underwater", o: 0 }, fish: { art: "sci-fish", at: [80, 46], s: 1.6, o: 0 },
          tort: { art: "🐢", at: [48, 86], s: 1.6, o: 0 }, frog: { art: "🐸", at: [116, 86], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "گنجشک پر دارد. یک پر از بالش افتاد.", key: 3200, hold: 5400, do: [
            { id: "bird.wing", to: { r: -40 }, dur: 1200, yoyo: true, times: 6 },
            { id: "feather", to: { o: 1 }, at: 1000, dur: 200 }, { id: "feather", path: "M40 34Q56 50 44 64T52 84", at: 1000, dur: 3600 },
            { id: "feather", to: { r: 40 }, at: 1000, dur: 1200, yoyo: true, times: 3 }
          ] },
          { caption: "گربه مو دارد. موهایش نرم است.", key: 2400, do: [
            { id: "hand", path: "M140 120Q130 80 112 60", dur: 1200 },
            { id: "hand", to: { x: "+6" }, at: 1300, dur: 2000, yoyo: true, times: 4 },
            { id: "cat.head", to: { r: -10 }, at: 1400, dur: 1800, yoyo: true, times: 2 }
          ],
            wait: { rub: true, n: 6, hint: "تو هم گربه را ناز کن: روی گربه چپ و راست بکش!",
              each: [{ id: "hand", to: { x: "+6" }, dur: 360, yoyo: true, times: 2 }] } },
          { caption: "ماهی فلس دارد. فلس‌ها مثل کاشی روی هم نشسته‌اند.", key: 3000, hold: 5600, do: [
            { id: "hand", to: { o: 0 }, dur: 400 }, { id: "cat", to: { o: 0 }, dur: 400 },
            { id: "sea", to: { o: 1 }, at: 300, dur: 800 }, { id: "fish", to: { o: 1 }, at: 600, dur: 600 },
            { id: "fish.tail", to: { r: 18 }, at: 1200, dur: 4000, yoyo: true, times: 10 },
            { cam: { x: 78, y: 46, zoom: 2.2 }, at: 1600, dur: 1200 }
          ] },
          { caption: "لاک‌پشت لاک سفت دارد. قورباغه پوست صاف و خیس دارد.", key: 3600, hold: 6400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "sea", to: { o: 0 }, dur: 800 }, { id: "fish", to: { o: 0 }, dur: 600 },
            { id: "tort", to: { o: 1 }, at: 800, dur: 600 }, { id: "tort", path: "M48 86L60 86", at: 1400, dur: 3600, ease: "linear" },
            { id: "frog", to: { o: 1 }, at: 1800, dur: 600 }, { id: "frog", path: "M116 86Q122 74 128 86", at: 2600, dur: 800 },
            { emit: "drop", where: [128, 76], spread: [6, 3], rise: -3, n: 6, at: 3400, dur: 1400, life: 700 }
          ] }
        ],
        question: "بدن ماهی با چه پوشیده شده؟",
        options: ["پر", "فلس", "مو"], answer: "فلس" },
      { type: "sort", prompt: "پر، مو یا فلس؟", say: "بدن هر جانور با چه پوشیده شده؟ پر، مو یا فلس؟",
        baskets: [{ label: "پر", pic: "🐦", value: "feather" }, { label: "مو", pic: "🐑", value: "fur" }, { label: "فلس", pic: "🐟", value: "scale" }],
        items: [
          { pic: "🦆", say: "اردک", basket: "feather" },
          { pic: "🦉", say: "جغد", basket: "feather" },
          { pic: "🐕", say: "سگ", basket: "fur" },
          { pic: "🐰", say: "خرگوش", basket: "fur" },
          { pic: "🐍", say: "مار", basket: "scale" },
          { pic: "🦎", say: "مارمولک", basket: "scale" }
        ] },
      { type: "pairs", prompt: "پوشش کدام‌ها شبیه هم است؟", say: "مرغ و اردک هر دو پر دارند. جفت‌هایی را پیدا کن که پوششان شبیه هم است.",
        pairs: [
          [{ pic: "🐔", say: "مرغ" }, { pic: "🦆", say: "اردک" }],
          [{ pic: "🐟", say: "ماهی" }, { pic: "🐍", say: "مار" }],
          [{ pic: "🐱", say: "گربه" }, { pic: "🐻", say: "خرس" }],
          [{ pic: "🐢", say: "لاک‌پشت" }, { pic: "🐌", say: "حلزون" }]
        ] },
      { type: "choose", prompt: "بدن پرنده با چه پوشیده شده؟", say: "بدن پرنده با چه پوشیده شده؟",
        options: ["پر", "فلس", "مو"], answer: "پر" },
      { type: "home", pic: "🪶 🐟", text: "پوشش جانوران را از نزدیک ببین.",
        need: ["یک پر (اگر پیدا کردید)", "یک تکه کاموا یا پشم", "در بازار ماهی‌فروشی، فقط برای نگاه کردن"],
        steps: [
          "اگر در پارک پری افتاده دیدید، با هم از نزدیک نگاهش کنید: رگه‌های ریزش را ببینید.",
          "کاموا یا پشم را لمس کنید: مثل موی گوسفند است.",
          "در بازار، از دور به ماهی‌ها نگاه کنید: فلس‌ها برق می‌زنند. به ماهی دست نزنید.",
          "اگر گربه یا سگ آشنایی هست و صاحبش اجازه داد، آرام موهایش را ناز کنید. بعد دست‌ها را بشویید."
        ],
        ask: "پر، مو و فلس چه فرقی با هم دارند؟" }
    ]
  },
  {
    id: "science-sprout-12", subject: "science", level: "sprout", emoji: "🐄", title: "گیاه‌خوار و گوشت‌خوار",
    steps: [
      { type: "scene", prompt: "هر جانور چه می‌خورد؟", bg: "#cdeaf7",
        /* What animals eat and where they find it: the sheep crops the grass; the sparrow pecks seeds; the cat eats
           fish from its plate; then the camera goes on to the desert (the world is 320 wide), where the camel eats
           the thorny shrub that grows there. Drawings: js/art/rig-science.js, cat-side from js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" }, desert: { art: "sci-desert", at: [160, 0] }, sun: { art: "sci-sun", at: [24, 14] },
          grass: { art: "sci-grass", at: [22, 87], s: 1.1 }, sheep: { art: "sci-sheep", at: [44, 86], s: 1.4 },
          seeds: { art: "sci-sf-seed", at: [80, 85], s: 0.8 }, seeds2: { art: "sci-sf-seed", at: [84, 86], s: 0.8 },
          bird: { art: "sci-sparrow", at: [72, 86], s: 1.4 },
          plate: { art: "sci-plate", at: [128, 87], s: 0.5 }, fish: { art: "🐟", at: [128, 86.4], s: 0.5 },
          cat: { art: "cat-side", at: [117, 86], s: 1.6 },
          thorn: { art: "sci-thorn", at: [228, 84], s: 1.4 }, camel: { art: "🐫", at: [266, 86], s: 2.4, flip: true }
        },
        scenes: [
          { caption: "گوسفند علف می‌خورد. گوسفند گیاه‌خوار است.", key: 2400, hold: 5600, do: [
            { cam: { x: 40, y: 68, zoom: 2 }, dur: 900 }, { id: "sheep", to: { r: -10 }, at: 400, dur: 600 },
            { id: "sheep", to: { r: -14 }, at: 1000, dur: 3200, yoyo: true, times: 8 },
            { id: "grass", to: { sy: 0.4 }, at: 1200, dur: 3400 },
            { id: "sheep", to: { r: 0 }, at: 4400, dur: 500 }
          ] },
          { caption: "گنجشک با نوکش دانه برمی‌دارد و می‌خورد.", key: 1500, hold: 5000, do: [
            { cam: { x: 78, y: 72, zoom: 2.4 }, dur: 900 }, { id: "bird", to: { r: 32 }, at: 400, dur: 500, yoyo: true, times: 2 },
            { id: "seeds", to: { o: 0 }, at: 900, dur: 200 },
            { id: "bird", to: { r: 32 }, at: 1800, dur: 500, yoyo: true, times: 2 },
            { id: "seeds2", to: { o: 0 }, at: 2300, dur: 200 },
            { id: "bird.beak", to: { r: 30 }, at: 2900, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "گربه ماهی می‌خورد. گربه گوشت‌خوار است.", key: 2400, hold: 5400, do: [
            { cam: { x: 122, y: 70, zoom: 2.2 }, dur: 900 }, { id: "cat.head", to: { r: 34 }, at: 300, dur: 500 },
            { id: "cat.head", to: { r: 24 }, at: 800, dur: 2800, yoyo: true, times: 8 },
            { id: "fish", to: { s: 0.1, o: 0 }, at: 900, dur: 3000 },
            { id: "cat.head", to: { r: 0 }, at: 3800, dur: 400 }
          ] },
          { caption: "شتر در کویر زندگی می‌کند. خار شتر می‌خورد که آن‌جا می‌روید.", key: 4200, hold: 7000, do: [
            { cam: { x: 240, y: 45, zoom: 1 }, dur: 2000 },
            { id: "camel", path: "M266 86L250 86", at: 1800, dur: 1600, ease: "linear" }, { id: "camel", to: { y: "-1" }, at: 1800, dur: 1600, yoyo: true, times: 4 },
            { id: "camel", to: { r: -10 }, at: 3600, dur: 500, yoyo: true, times: 4 },
            { id: "thorn.bite", to: { o: 0 }, at: 4200, dur: 1200 }
          ] }
        ],
        question: "گربه چه می‌خورد؟", pic: true,
        options: [{ label: "🌾", value: "علف" }, { label: "🐟", value: "ماهی" }, { label: "🌰", value: "دانه" }], answer: "ماهی" },
      { type: "sort", prompt: "گیاه‌خوار یا گوشت‌خوار؟", say: "کدام گیاه می‌خورد و کدام گوشت؟",
        baskets: [{ label: "گیاه‌خوار", pic: "🌿", value: "plant" }, { label: "گوشت‌خوار", pic: "🍖", value: "meat" }],
        items: [
          { pic: "🐄", say: "گاو", basket: "plant" },
          { pic: "🐰", say: "خرگوش", basket: "plant" },
          { pic: "🐫", say: "شتر", basket: "plant" },
          { pic: "🦁", say: "شیر", basket: "meat" },
          { pic: "🐆", say: "یوزپلنگ", basket: "meat" },
          { pic: "🦉", say: "جغد", basket: "meat" }
        ] },
      { type: "choose", prompt: "همه جانوران برای زنده ماندن چه می‌خواهند؟", say: "همه جانوران برای زنده ماندن چه می‌خواهند؟", pic: true,
        options: [{ label: "💧🍎", value: "آب و غذا" }, { label: "🧸🎈", value: "اسباب‌بازی" }], answer: "آب و غذا" },
      { type: "choose", prompt: "جغد موش می‌خورد. جغد گیاه‌خوار است یا گوشت‌خوار؟", say: "جغد موش می‌خورد. جغد گیاه‌خوار است یا گوشت‌خوار؟",
        options: ["گیاه‌خوار", "گوشت‌خوار"], answer: "گوشت‌خوار" },
      { type: "home", pic: "🪞 🦷", text: "دندان‌هایت را در آینه نگاه کن!",
        need: ["یک آینه", "یک سیب یا هویج"],
        steps: [
          "کودک جلوی آینه دهانش را باز کند. دندان‌های جلو تیز و نازک‌اند و دندان‌های عقب پهن.",
          "یک گاز از سیب بزند: با کدام دندان‌ها برید؟ بعد بجود: با کدام دندان‌ها جوید؟",
          "بگویید: «ما هم گیاه می‌خوریم هم گوشت؛ برای همین هر دو جور دندان داریم.»",
          "اگر گربه، مرغ یا پرنده‌ای در دور و برتان هست، از دور ببینید چه می‌خورد."
        ],
        ask: "گوسفند چه دندان‌هایی دارد که علف بجود؟" }
    ]
  },
  {
    id: "science-sprout-13", subject: "science", level: "sprout", emoji: "🦉", title: "بازی جانوران",
    steps: [
      { type: "sort", prompt: "پرواز، شنا یا راه رفتن؟", say: "هر جانور چطور جابه‌جا می‌شود؟",
        baskets: [{ label: "پرواز", pic: "🐦", value: "fly" }, { label: "شنا", pic: "🌊", value: "swim" }, { label: "راه رفتن", pic: "🐾", value: "walk" }],
        items: [
          { pic: "🕊️", say: "کبوتر", basket: "fly" },
          { pic: "🐝", say: "زنبور", basket: "fly" },
          { pic: "🐳", say: "نهنگ", basket: "swim" },
          { pic: "🐟", say: "ماهی", basket: "swim" },
          { pic: "🦒", say: "زرافه", basket: "walk" },
          { pic: "🐐", say: "بز", basket: "walk" }
        ] },
      { type: "sort", prompt: "پر، مو یا فلس؟", say: "بدن هر جانور با چه پوشیده شده؟",
        baskets: [{ label: "پر", pic: "🐦", value: "feather" }, { label: "مو", pic: "🐑", value: "fur" }, { label: "فلس", pic: "🐟", value: "scale" }],
        items: [
          { pic: "🦜", say: "طوطی", basket: "feather" },
          { pic: "🐓", say: "خروس", basket: "feather" },
          { pic: "🐻", say: "خرس", basket: "fur" },
          { pic: "🐐", say: "بز", basket: "fur" },
          { pic: "🐍", say: "مار", basket: "scale" },
          { pic: "🐟", say: "ماهی", basket: "scale" }
        ] },
      { type: "pairs", prompt: "هر جانور چه می‌خورد؟", say: "غذای هر جانور را پیدا کن.",
        pairs: [
          [{ pic: "🐄", say: "گاو" }, { pic: "🌾", say: "علف" }],
          [{ pic: "🐱", say: "گربه" }, { pic: "🐟", say: "ماهی" }],
          [{ pic: "🐿️", say: "سنجاب" }, { pic: "🌰", say: "فندق" }],
          [{ pic: "🐝", say: "زنبور" }, { pic: "🌸", say: "شهد گل" }]
        ] },
      { type: "pairs", prompt: "هر جانور با چه جابه‌جا می‌شود؟", say: "پرنده با بال پرواز می‌کند. جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🐦", say: "پرنده" }, { label: "بال", pic: "🪶", say: "بال" }],
          [{ pic: "🐟", say: "ماهی" }, { label: "باله", pic: "🌊", say: "باله" }],
          [{ pic: "🐎", say: "اسب" }, { label: "پا", pic: "🐾", say: "پا" }]
        ] },
      { type: "sort", prompt: "گیاه‌خوار یا گوشت‌خوار؟", say: "کدام گیاه می‌خورد و کدام گوشت؟",
        baskets: [{ label: "گیاه‌خوار", pic: "🌿", value: "plant" }, { label: "گوشت‌خوار", pic: "🍖", value: "meat" }],
        items: [
          { pic: "🐑", say: "گوسفند", basket: "plant" },
          { pic: "🦒", say: "زرافه", basket: "plant" },
          { pic: "🐯", say: "ببر", basket: "meat" },
          { pic: "🦊", say: "روباه", basket: "meat" }
        ] },
      { type: "home", pic: "🐾 📖", text: "جانوران را با هم دسته کنید!",
        need: ["چند عکس یا نقاشی جانوران از کتاب یا مجله، یا اسباب‌بازی‌های حیوانی"],
        steps: [
          "عکس‌ها یا اسباب‌بازی‌ها را روی فرش بچینید.",
          "یک بار آن‌ها را بر اساس جابه‌جا شدن دسته کنید: پرنده‌ها، شناگرها، راه‌روها.",
          "یک بار بر اساس پوشش: پر، مو، فلس، لاک.",
          "یک بار بر اساس غذا: گیاه‌خوار و گوشت‌خوار. کودک خودش راه دسته کردن تازه‌ای پیشنهاد کند."
        ],
        ask: "کدام جانور در چند دسته جا می‌شد؟" }
    ]
  },
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
    id: "science-sprout-14", subject: "science", level: "sprout", emoji: "🫘", title: "گیاه چه می‌خواهد؟",
    steps: [
      { type: "scene", prompt: "یک آزمایش با دو گلدان", bg: "#f6efdc",
        /* Two bean pots, just sprouted, are watered; one goes by the window and one into a dark cupboard; we guess;
           days and nights pass in the window; the cupboard opens: the plant in the light is green and strong, the
           one in the dark tall, thin and pale. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, winDay: { art: "sci-window-day" }, beam: { art: "sci-sunbeam" }, winNight: { art: "sci-window-night", o: 0 },
          cup: { art: "sci-cupboard", at: [126, 72], s: 1.4 },
          potA: { art: "sci-pot", at: [32, 72], s: 1.3 }, sprA: { art: "sci-sprout", at: [32, 57.6], s: 1.3 }, plantA: { art: "sci-plant", at: [32, 57.6], s: 0.4, o: 0 },
          potB: { art: "sci-pot", at: [60, 72], s: 1.3 }, sprB: { art: "sci-sprout", at: [60, 57.6], s: 1.3 }, plantB: { art: "sci-plant-pale", at: [60, 57.6], s: 0.4, o: 0 },
          door: { art: "sci-cupboard-door", at: [148.4, 72], s: 1.4, sx: 0.12 },
          can: { art: "sci-can", at: [50, 30], s: 1.2, o: 0 },
          dim: { art: "sci-night", o: 0 },
          q: { art: "❓", at: [80, 40], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "دو گلدان لوبیا داریم. هر دو تازه جوانه زده‌اند. به هر دو آب دادیم.", key: 3400, hold: 6400, do: [
            { id: "can", to: { o: 1 }, dur: 400 }, { id: "can", to: { r: -35 }, at: 400, dur: 500 },
            { emit: "drop", where: [32, 50], spread: [3, 2], rise: 3, n: 8, at: 900, dur: 1400, life: 700 },
            { id: "can", path: "M50 30L78 30", at: 2300, dur: 900 },
            { emit: "drop", where: [60, 50], spread: [3, 2], rise: 3, n: 8, at: 3200, dur: 1400, life: 700 },
            { id: "can", to: { r: 0, o: 0 }, at: 4700, dur: 500 }
          ] },
          { caption: "یکی را کنار پنجره گذاشتیم و یکی را در کمد تاریک.", key: 1800, hold: 5400, do: [
            { id: "potB", path: "M60 72Q94 60 126 67.8", dur: 2200 }, { id: "sprB", path: "M60 57.6Q94 45.6 126 53.4", dur: 2200 },
            
            { id: "door", to: { sx: 1.4 }, at: 2800, dur: 700 }
          ] },
          { caption: "حدس بزن: کدام گیاه بهتر رشد می‌کند؟", hold: 6000, do: [
            { id: "q", to: { o: 1 }, dur: 400 }, { id: "q", to: { s: 0.95 }, at: 400, dur: 800, yoyo: true, times: 4 }
          ] },
          { caption: "چند روز و چند شب گذشت.", key: 1100, hold: 5200, do: [
            { id: "q", to: { o: 0 }, dur: 300 },
            { id: "winNight", to: { o: 1 }, at: 400, dur: 400 }, { id: "dim", to: { o: 0.45 }, at: 400, dur: 400 }, { id: "beam", to: { o: 0 }, at: 400, dur: 400 }, { id: "beam", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "winNight", to: { o: 0 }, at: 1300, dur: 400 }, { id: "dim", to: { o: 0 }, at: 1300, dur: 400 },
            { id: "winNight", to: { o: 1 }, at: 2200, dur: 400 }, { id: "dim", to: { o: 0.45 }, at: 2200, dur: 400 }, { id: "beam", to: { o: 0 }, at: 2200, dur: 400 }, { id: "beam", to: { o: 1 }, at: 3100, dur: 400 },
            { id: "winNight", to: { o: 0 }, at: 3100, dur: 400 }, { id: "dim", to: { o: 0 }, at: 3100, dur: 400 },
            { id: "sprA", to: { o: 0 }, at: 1200, dur: 800 }, { id: "plantA", to: { o: 1 }, at: 1200, dur: 800 }, { id: "plantA", to: { s: 1.5 }, at: 1200, dur: 3200 }
          ] },
          { caption: "کمد را باز کردیم. گیاه کنار پنجره سبز و قوی است. گیاه کمد زرد و ضعیف شده.", key: 2600, hold: 7400, do: [
            { id: "door", to: { sx: 0.17 }, dur: 800 },
            { id: "sprB", to: { o: 0 }, at: 600, dur: 600 }, { id: "plantB", to: { o: 1, s: 1.12 }, at: 600, dur: 1200 },
            { id: "potB", path: "M126 67.8Q100 60 76 72", at: 2000, dur: 1600 }, { id: "plantB", path: "M126 53.4Q100 45.6 76 57.6", at: 2000, dur: 1600 }
          ] },
          { caption: "گیاه برای رشد هم آب می‌خواهد و هم نور.", hold: 4000, do: [
            { id: "plantA", to: { r: 4 }, dur: 1200, yoyo: true, times: 2 },
            { emit: "spark", where: [32, 34], spread: [14, 10], n: 6, at: 300, dur: 1200 }
          ] }
        ],
        question: "کدام گیاه سبز و قوی شد؟",
        options: ["گیاه کنار پنجره", "گیاه در کمد تاریک"], answer: "گیاه کنار پنجره" },
      { type: "order", prompt: "آزمایش را به ترتیب بچین", say: "اول دانه را کاشتیم، بعد آب دادیم، بعد صبر کردیم و آخر نگاه کردیم. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🫘", say: "کاشتیم" }, { pic: "💧", say: "آب دادیم" }, { pic: "⏳", say: "صبر کردیم" }, { pic: "👀", say: "نگاه کردیم" }] },
      { type: "choose", prompt: "اگر به گیاه آب ندهیم چه می‌شود؟", say: "اگر به گیاه آب ندهیم چه می‌شود؟", pic: true,
        options: [{ label: "🥀", value: "پژمرده می‌شود" }, { label: "🌳", value: "بزرگ‌تر می‌شود" }], answer: "پژمرده می‌شود" },
      { type: "choose", prompt: "گیاه کمد چرا زرد شد؟", say: "گیاهی که در کمد تاریک بود، چرا زرد و ضعیف شد؟",
        options: ["چون نور نداشت", "چون زیاد آب خورده بود"], answer: "چون نور نداشت" },
      { type: "home", pic: "🫘 📦", text: "تو هم این آزمایش را انجام بده!",
        need: ["دو لیوان یا گلدان کوچک", "خاک یا پنبه خیس", "چند دانه لوبیا یا عدس", "یک جعبه یا کمد تاریک"],
        steps: [
          "در هر لیوان چند دانه بکارید و آب بدهید. صبر کنید تا جوانه بزنند.",
          "یکی را کنار پنجره بگذارید و یکی را در جعبه یا کمد تاریک.",
          "از کودک بپرسید کدام بهتر رشد می‌کند و حدسش را بنویسید.",
          "هر روز به هر دو کمی آب بدهید. یک هفته بعد با هم مقایسه کنید: رنگ، قد، برگ‌ها.",
          "بعد گیاه زرد را کنار پنجره بگذارید و ببینید چند روز بعد چه می‌شود."
        ],
        ask: "حدست درست بود؟ گیاه زرد در نور چه شد؟" }
    ]
  },
  {
    id: "science-sprout-15", subject: "science", level: "sprout", emoji: "🍉", title: "میوه‌ها و دانه‌ها",
    steps: [
      { type: "scene", prompt: "داخل میوه‌ها چیست؟", bg: "#f6efdc",
        /* On the kitchen table, fruits are opened one by one and their seeds are seen: the pomegranate full of red
           seeds, the melon with its seeds in the middle, the date with one long stone. The stone goes into a pot
           of soil and a sprout comes up. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          pom: { art: "sci-pomegranate", at: [30, 72], s: 1.6 },
          melon: { art: "sci-muskmelon", at: [88, 72], s: 1.3, o: 0 },
          date: { art: "sci-date", at: [128, 72], s: 1.8, o: 0 },
          pot: { art: "sci-pot", at: [148, 72], s: 1.3, o: 0 }, sprout: { art: "sci-sprout", at: [148, 57.6], s: 1.3, sy: 0 }
        },
        scenes: [
          { caption: "این انار است. ببینیم داخلش چیست.", do: [
            { id: "pom", to: { r: 8 }, dur: 600, yoyo: true, times: 4 }
          ] },
          { caption: "انار را نصف کردیم. پر از دانه‌های قرمز است!", key: 2400, hold: 5000, do: [
            { id: "pom.whole", to: { o: 0 }, dur: 400 }, { id: "pom.l", to: { o: 1 }, dur: 400 }, { id: "pom.r", to: { o: 1 }, dur: 400 },
            { id: "pom.l", to: { x: -9 }, at: 400, dur: 800 }, { id: "pom.r", to: { x: 9 }, at: 400, dur: 800 },
            { cam: { x: 30, y: 58, zoom: 2.4 }, at: 1200, dur: 1000 }
          ] },
          { caption: "داخل خربزه هم دانه هست، درست در وسطش.", key: 2600, hold: 5000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "melon", to: { o: 1 }, at: 500, dur: 500 },
            { id: "melon.whole", to: { o: 0 }, at: 1400, dur: 400 }, { id: "melon.l", to: { o: 1 }, at: 1400, dur: 400 }, { id: "melon.r", to: { o: 1 }, at: 1400, dur: 400 },
            { id: "melon.l", to: { x: -11 }, at: 1800, dur: 800 }, { id: "melon.r", to: { x: 11 }, at: 1800, dur: 800 }
          ] },
          { caption: "خرما فقط یک هسته دارد.", key: 2600, hold: 5000, do: [
            { id: "date", to: { o: 1 }, dur: 500 },
            { cam: { x: 128, y: 62, zoom: 2.6 }, at: 400, dur: 900 },
            { id: "date.whole", to: { o: 0 }, at: 1400, dur: 400 }, { id: "date.open", to: { o: 1 }, at: 1400, dur: 400 }, { id: "date.stone", to: { o: 1 }, at: 1400, dur: 400 },
            { id: "date.stone", to: { y: -6 }, at: 2000, dur: 600, ease: "back" }
          ] },
          { caption: "اگر هسته را در خاک بکاریم و آب بدهیم، از آن گیاه تازه‌ای سبز می‌شود.", key: 4800, hold: 7000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "date.open", to: { o: 0 }, at: 600, dur: 400 }, { id: "pot", to: { o: 1 }, at: 600, dur: 500 },
            { id: "date", path: "M128 72Q140 48 148 60", at: 1100, dur: 1000 },
            { id: "date.stone", to: { o: 0 }, at: 2000, dur: 300 },
            { emit: "drop", where: [148, 52], spread: [3, 2], rise: 3, n: 8, at: 2400, dur: 1200, life: 600 },
            { id: "sprout", to: { sy: 1.3 }, at: 3600, dur: 1600, ease: "out" }
          ] }
        ],
        question: "انار داخلش چه دارد؟", pic: true,
        options: [{ label: "💧", value: "فقط آب" }, { label: "🔴🔴🔴", value: "دانه‌های زیاد" }, { label: "🪨", value: "یک سنگ" }], answer: "دانه‌های زیاد" },
      { type: "pairs", prompt: "از هر گیاه چه می‌خوریم؟", say: "نان را از گندم درست می‌کنیم. جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🌾", say: "گندم" }, { pic: "🍞", say: "نان" }],
          [{ pic: "🌳", say: "درخت سیب" }, { pic: "🍎", say: "سیب" }],
          [{ pic: "🌻", say: "آفتابگردان" }, { label: "تخمه", pic: "🌰", say: "تخمه" }],
          [{ pic: "🌴", say: "نخل" }, { label: "خرما", say: "خرما" }]
        ] },
      { type: "sort", prompt: "کدام قسمت گیاه را می‌خوریم؟", say: "از هویج ریشه‌اش را می‌خوریم، از کاهو برگش را و از سیب میوه‌اش را. هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "میوه", pic: "🍎", value: "fruit" }, { label: "برگ", pic: "🍃", value: "leaf" }, { label: "ریشه", pic: "🥕", value: "root" }],
        items: [
          { pic: "🍐", say: "گلابی", basket: "fruit" },
          { pic: "🍅", say: "گوجه‌فرنگی", basket: "fruit" },
          { pic: "🥬", say: "کاهو", basket: "leaf" },
          { pic: "🌿", say: "سبزی خوردن", basket: "leaf" },
          { pic: "🥕", say: "هویج", basket: "root" }
        ] },
      { type: "choose", prompt: "انار را بکاریم چه سبز می‌شود؟", say: "اگر دانه انار را بکاریم، چه درختی سبز می‌شود؟",
        options: ["درخت انار", "درخت سیب"], answer: "درخت انار" },
      { type: "home", pic: "🍊 🌱", text: "بیا دانه‌های میوه‌ها را پیدا کنیم و بکاریم.",
        need: ["چند میوه: پرتقال، سیب، خرما، لیمو", "یک بشقاب", "پنبه یا خاک در یک لیوان"],
        steps: [
          "بزرگ‌تر میوه‌ها را با چاقو نصف کند. کودک به چاقو دست نزند.",
          "با هم دانه‌های هر میوه را پیدا کنید و بشمارید: کدام بیشتر دانه داشت؟",
          "دانه‌ها را بشویید و در پنبه خیس یا خاک بکارید. هر روز کمی آب بدهید.",
          "هر چند روز نگاه کنید: کدام جوانه زد؟"
        ],
        ask: "کدام میوه بیشتر از همه دانه داشت؟" }
    ]
  },
  {
    id: "science-sprout-16", subject: "science", level: "sprout", emoji: "🌻", title: "بازی گیاه‌ها",
    steps: [
      { type: "pairs", prompt: "هر قسمت گیاه چه کار می‌کند؟", say: "ریشه آب را از خاک می‌گیرد. جفت‌ها را پیدا کن.",
        pairs: [
          [{ label: "ریشه", pic: "🥕", say: "ریشه" }, { pic: "💧", say: "آب را از خاک می‌گیرد" }],
          [{ label: "برگ", pic: "🍃", say: "برگ" }, { pic: "☀️", say: "نور خورشید را می‌گیرد" }],
          [{ label: "گل", pic: "🌷", say: "گل" }, { pic: "🐝", say: "زنبور را صدا می‌زند" }],
          [{ label: "میوه", pic: "🍎", say: "میوه" }, { pic: "🌰", say: "دانه‌ها را نگه می‌دارد" }]
        ] },
      { type: "order", prompt: "از دانه تا میوه بچین", say: "اول دانه است. بعد چه می‌شود؟ به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌰", say: "دانه" }, { pic: "🌱", say: "جوانه" }, { pic: "🌿", say: "گیاه" }, { pic: "🌸", say: "گل" }, { pic: "🍎", say: "میوه" }] },
      { type: "sort", prompt: "گیاه این را می‌خواهد یا نه؟", say: "گیاه برای رشد کدام‌ها را می‌خواهد؟",
        baskets: [{ label: "می‌خواهد", pic: "🌱", value: "yes" }, { label: "نمی‌خواهد", pic: "🚫", value: "no" }],
        items: [
          { pic: "💧", say: "آب", basket: "yes" },
          { pic: "☀️", say: "نور خورشید", basket: "yes" },
          { pic: "🟫", say: "خاک", basket: "yes" },
          { pic: "🍬", say: "آبنبات", basket: "no" },
          { pic: "🧸", say: "عروسک", basket: "no" },
          { pic: "📺", say: "تلویزیون", basket: "no" }
        ] },
      { type: "sort", prompt: "کدام قسمت گیاه را می‌خوریم؟", say: "هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "میوه", pic: "🍎", value: "fruit" }, { label: "برگ", pic: "🍃", value: "leaf" }, { label: "دانه", pic: "🌰", value: "seed" }],
        items: [
          { pic: "🍇", say: "انگور", basket: "fruit" },
          { pic: "🍉", say: "هندوانه", basket: "fruit" },
          { pic: "🥬", say: "کاهو", basket: "leaf" },
          { pic: "🌽", say: "دانه ذرت", basket: "seed" },
          { pic: "🫘", say: "لوبیا", basket: "seed" }
        ] },
      { type: "home", pic: "🥗 🌿", text: "سر سفره قسمت‌های گیاه را پیدا کن!",
        need: ["سفره ناهار یا شام"],
        steps: [
          "سر سفره بپرسید: «این کدام قسمت گیاه است؟ ریشه، ساقه، برگ، گل، میوه یا دانه؟»",
          "مثلاً: هویج ریشه است، سبزی برگ است، برنج و لوبیا دانه‌اند، گوجه میوه است.",
          "کودک یکی را انتخاب کند و نقاشی کند که آن گیاه در زمین چه شکلی است."
        ],
        ask: "امروز کدام قسمت‌های گیاه را خوردی؟" }
    ]
  },
  {
    id: "science-sprout-40", subject: "science", level: "sprout", emoji: "📊", title: "هوای امروز را بنویس",
    steps: [
      { type: "scene", prompt: "جدول هوای سارا", bg: "#f6efdc",
        /* Every morning Sara looks out of the window and sticks a picture of the weather on her chart on the wall:
           a sun, then a cloud, then rain; after two weeks the chart is full and the sun's column is the tallest.
           The window shows that day's sky. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, winCloud: { art: "sci-window-cloudy", o: 0 }, winDay: { art: "sci-window-day" },
          chart: { art: "sci-weatherchart", at: [54, 8] },
          lab_sun: { art: "☀️", at: [63, 54.5], s: 0.36 },
          sun1: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          sun2: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          sun3: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          sun4: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          sun5: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          sun6: { art: "☀️", at: [119, 62], s: 0.34, o: 0 },
          lab_cloud: { art: "☁️", at: [75, 54.5], s: 0.36 },
          cloud1: { art: "☁️", at: [119, 62], s: 0.34, o: 0 },
          cloud2: { art: "☁️", at: [119, 62], s: 0.34, o: 0 },
          cloud3: { art: "☁️", at: [119, 62], s: 0.34, o: 0 },
          cloud4: { art: "☁️", at: [119, 62], s: 0.34, o: 0 },
          lab_rain: { art: "🌧️", at: [87, 54.5], s: 0.36 },
          rain1: { art: "🌧️", at: [119, 62], s: 0.34, o: 0 },
          rain2: { art: "🌧️", at: [119, 62], s: 0.34, o: 0 },
          rain3: { art: "🌧️", at: [119, 62], s: 0.34, o: 0 },
          lab_wind: { art: "🌬️", at: [99, 54.5], s: 0.36 },
          wind1: { art: "🌬️", at: [119, 62], s: 0.34, o: 0 },
          girl: { art: "👧", at: [124, 87], s: 1.3, flip: true },
          ring: { art: "sci-ring", at: [63, 33], s: 3.4, sx: 0.5, o: 0 }
        },
        scenes: [
          { caption: "سارا هر روز صبح از پنجره هوا را نگاه می‌کند.", key: 2400, do: [
            { id: "girl", to: { r: -4 }, at: 400, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "امروز آفتابی است. سارا یک خورشید در جدولش می‌چسباند.", key: 2400, hold: 4800, do: [
            { id: "girl.armF", to: { r: -150 }, at: 600, dur: 700 },
            { id: "sun1", to: { o: 1 }, at: 1400, dur: 200 }, { id: "sun1", path: "M119 62Q91 36 63 46", at: 1400, dur: 900 },
            { id: "girl.armF", to: { r: 0 }, at: 2600, dur: 600 }
          ] },
          { caption: "فردا ابری بود. یک ابر چسباند.", key: 2400, hold: 4800, do: [
            { id: "winDay", to: { o: 0 }, dur: 600 }, { id: "winCloud", to: { o: 1 }, dur: 600 },
            { id: "girl.armF", to: { r: -150 }, at: 600, dur: 700 },
            { id: "cloud1", to: { o: 1 }, at: 1400, dur: 200 }, { id: "cloud1", path: "M119 62Q97 36 75 46", at: 1400, dur: 900 },
            { id: "girl.armF", to: { r: 0 }, at: 2600, dur: 600 }
          ] },
          { caption: "پس‌فردا باران آمد. یک باران چسباند.", key: 2400, hold: 4800, do: [
            { id: "winCloud", to: { o: 0 }, dur: 600 },
            { id: "girl.armF", to: { r: -150 }, at: 600, dur: 700 },
            { id: "rain1", to: { o: 1 }, at: 1400, dur: 200 }, { id: "rain1", path: "M119 62Q103 36 87 46", at: 1400, dur: 900 },
            { id: "girl.armF", to: { r: 0 }, at: 2600, dur: 600 }
          ] },
          { caption: "دو هفته گذشت و جدول پر شد.", key: 6400, hold: 7000, do: [
            { id: "girl.armF", to: { r: -150 }, dur: 600 },
            { id: "sun2", to: { o: 1 }, at: 600, dur: 200 }, { id: "sun2", path: "M119 62Q91 30 63 40", at: 600, dur: 600 },
            { id: "cloud2", to: { o: 1 }, at: 1100, dur: 200 }, { id: "cloud2", path: "M119 62Q97 30 75 40", at: 1100, dur: 600 },
            { id: "sun3", to: { o: 1 }, at: 1600, dur: 200 }, { id: "sun3", path: "M119 62Q91 24 63 34", at: 1600, dur: 600 },
            { id: "rain2", to: { o: 1 }, at: 2100, dur: 200 }, { id: "rain2", path: "M119 62Q103 30 87 40", at: 2100, dur: 600 },
            { id: "sun4", to: { o: 1 }, at: 2600, dur: 200 }, { id: "sun4", path: "M119 62Q91 18 63 28", at: 2600, dur: 600 },
            { id: "wind1", to: { o: 1 }, at: 3100, dur: 200 }, { id: "wind1", path: "M119 62Q109 36 99 46", at: 3100, dur: 600 },
            { id: "cloud3", to: { o: 1 }, at: 3600, dur: 200 }, { id: "cloud3", path: "M119 62Q97 24 75 34", at: 3600, dur: 600 },
            { id: "sun5", to: { o: 1 }, at: 4100, dur: 200 }, { id: "sun5", path: "M119 62Q91 12 63 22", at: 4100, dur: 600 },
            { id: "rain3", to: { o: 1 }, at: 4600, dur: 200 }, { id: "rain3", path: "M119 62Q103 24 87 34", at: 4600, dur: 600 },
            { id: "cloud4", to: { o: 1 }, at: 5100, dur: 200 }, { id: "cloud4", path: "M119 62Q97 18 75 28", at: 5100, dur: 600 },
            { id: "sun6", to: { o: 1 }, at: 5600, dur: 200 }, { id: "sun6", path: "M119 62Q91 6 63 16", at: 5600, dur: 600 },
            { id: "girl.armF", to: { r: 0 }, at: 6200, dur: 600 }
          ] },
          { caption: "ستون خورشید از همه بلندتر است. بیشتر روزها آفتابی بود!", hold: 4400, do: [
            { cam: { x: 82, y: 34, zoom: 2 }, dur: 900 }, { id: "ring", to: { o: 1 }, at: 900, dur: 400 }, { id: "ring", to: { s: 3.7 }, at: 1300, dur: 700, yoyo: true, times: 4 }
          ] }
        ],
        question: "کدام هوا بیشتر از همه بود؟", pic: true,
        options: [{ label: "☀️", value: "آفتابی" }, { label: "🌧️", value: "بارانی" }, { label: "🌬️", value: "بادی" }], answer: "آفتابی" },
      { type: "chart", make: true, title: "هوای دو هفته", prompt: "هر روز را در ستون هوای خودش بگذار.", say: "هر تصویر یک روز است. هر کدام را در ستون هوای خودش بگذار.",
        rows: [{ label: "آفتابی", pic: "☀️", n: 6 }, { label: "ابری", pic: "☁️", n: 4 }, { label: "بارانی", pic: "🌧️", n: 3 }, { label: "بادی", pic: "🌬️", n: 1 }],
        question: "کدام هوا کمتر از همه بود؟", options: [{ label: "آفتابی", value: "☀️" }, { label: "ابری", value: "☁️" }, { label: "بادی", value: "🌬️" }], answer: "🌬️" },
      { type: "chart", title: "هوای دو هفته",
        rows: [{ label: "آفتابی", pic: "☀️", n: 6 }, { label: "ابری", pic: "☁️", n: 4 }, { label: "بارانی", pic: "🌧️", n: 3 }, { label: "بادی", pic: "🌬️", n: 1 }],
        question: "چند روز بارانی بود؟", options: [2, 3, 4], answer: 3 },
      { type: "choose", prompt: "فردا هوا چطور است؟ از کجا بفهمیم؟", say: "می‌خواهیم بدانیم فردا هوا چطور است. چه کار کنیم؟",
        options: ["پیش‌بینی هوا را ببینیم", "حدس بزنیم و هیچ‌وقت نگاه نکنیم"], answer: "پیش‌بینی هوا را ببینیم" },
      { type: "paper", pic: "📅 ☀️", text: "دو هفته، هر روز صبح هوا را نگاه کن و در جدولت یک تصویر بکش: خورشید، ابر، باران یا باد.",
        check: ["هر روز یک تصویر کشید؟", "در آخر شمرد کدام هوا بیشتر بود؟", "گفت فردا هوا چطور است؟"],
        note: "یک کاغذ را چهار ستون کنید و بالای هر ستون یک شکل بکشید: ☀️ ☁️ 🌧️ 🌬️. هر روز کودک در ستون آن روز یک شکل کوچک بکشد. آخر هفته با هم بشمارید." }
    ]
  },
  {
    id: "science-sprout-41", subject: "science", level: "sprout", emoji: "📺", title: "پیش‌بینی هوا",
    steps: [
      { type: "scene", prompt: "فردا هوا چطور است؟", bg: "#f6efdc",
        /* Calm and practical: the forecast on television shows rain for tomorrow; Mother puts the umbrella by the
           door; next day it rains and Sara stands under her open umbrella, dry; last, the forecast map with rain and
           wind: knowing helps us get ready. The umbrella is at Sara's hand (her shoulder plus the arm, armF -100).
           Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, door: { art: "sci-door", at: [136, 72] },
          tv: { art: "sci-tv", at: [88, 72], s: 1.3 }, talk: { art: "sci-waves", at: [66, 44], s: 0.9, flip: true, o: 0 },
          mom: { art: "👩", at: [24, 87], s: 1.15 }, girl: { art: "👧", at: [44, 87], s: 1.2 },
          umb: { art: "sci-umbrella", at: [-20, 70], s: 0.7, o: 0 },
          sky: { art: "sci-grey-sky", o: 0 }, ground: { art: "sci-ground", o: 0 }, rain: { art: "sci-rainfall", o: 0 },
          girl2: { art: "👧", at: [70, 87], s: 1.2, o: 0 }, umb2: { art: "sci-umbrella", at: [79, 67], s: 0.52, r: -6, o: 0 }
        },
        scenes: [
          { caption: "هواشناسی در تلویزیون می‌گوید: «فردا باران می‌بارد.»", key: 2800, hold: 5600, do: [
            { id: "tv.cloud", to: { o: 1 }, at: 600, dur: 400 }, { id: "tv.cloud", to: { s: 1.1 }, at: 1000, dur: 800, yoyo: true, times: 4 },
            { id: "talk", to: { o: 1 }, at: 800, dur: 200 }, { id: "talk", to: { s: 1.1 }, at: 1000, dur: 500, yoyo: true, times: 6 },
            { id: "girl", to: { r: -3 }, at: 2600, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "مادر چتر را کنار در می‌گذارد تا فردا آماده باشند.", key: 4600, hold: 6000, do: [
            { id: "talk", to: { o: 0 }, dur: 300 },
            { id: "umb", to: { x: 33.7, y: 71, o: 1 }, dur: 400 }, { id: "mom.armF", to: { r: -60 }, dur: 400 },
            { id: "mom", walk: [118, 87], at: 400, dur: 3200, steps: 10 }, { id: "mom.armF", to: { r: -60 }, at: 400, dur: 3200 },
            { id: "umb", path: "M33.7 71L127.7 71", at: 400, dur: 3200, ease: "linear" },
            { id: "umb", path: "M127.7 71L130 86", at: 3800, dur: 700, ease: "in" }, { id: "mom.armF", to: { r: 0 }, at: 4200, dur: 500 }
          ] },
          { caption: "فردا باران آمد. سارا با چترش بیرون رفت و خیس نشد.", key: 3400, hold: 6400, do: [
            { id: "sky", to: { o: 1 }, dur: 800 }, { id: "ground", to: { o: 1 }, dur: 800 },
            { id: "girl2", to: { o: 1 }, at: 600, dur: 400 }, { id: "girl2.armF", to: { r: -100 }, at: 600, dur: 1 },
            { id: "umb2", to: { o: 1 }, at: 600, dur: 400 }, { id: "umb2.closed", to: { o: 0 }, at: 600, dur: 1 }, { id: "umb2.open", to: { o: 1 }, at: 600, dur: 1 },
            { id: "rain", to: { o: 1 }, at: 1000, dur: 400 }, { id: "rain", to: { y: "+12" }, at: 1000, dur: 600, ease: "linear", times: 8 },
            { emit: "spark", where: [78, 42], spread: [18, 2], n: 8, at: 1600, dur: 3200 }
          ] },
          { caption: "هواشناسی به ما می‌گوید باران، برف یا باد تند می‌آید، تا آماده باشیم.", key: 2600, hold: 6000, do: [
            { id: "rain", to: { o: 0 }, dur: 600 }, { id: "sky", to: { o: 0 }, dur: 600 }, { id: "ground", to: { o: 0 }, dur: 600 }, { id: "girl2", to: { o: 0 }, dur: 600 }, { id: "umb2", to: { o: 0 }, dur: 600 },
            { cam: { x: 88, y: 42, zoom: 2.6 }, at: 400, dur: 1200 },
            { id: "tv.wind", to: { o: 1 }, at: 1800, dur: 400 }, { id: "tv.wind", to: { x: 1.5 }, at: 2200, dur: 700, yoyo: true, times: 4 }
          ] }
        ],
        question: "هواشناسی گفت فردا باران می‌آید. چه برداریم؟", pic: true,
        options: [{ label: "☂️", value: "چتر" }, { label: "🕶️", value: "عینک آفتابی" }], answer: "چتر" },
      { type: "choose", prompt: "هواشناسی گفت فردا برف می‌آید. چه آماده کنیم؟", say: "هواشناسی گفت فردا برف می‌آید. چه آماده کنیم؟", pic: true,
        options: [{ label: "🧤🧣", value: "دستکش و شال‌گردن" }, { label: "👒", value: "کلاه آفتابی" }], answer: "دستکش و شال‌گردن" },
      { type: "choose", prompt: "هواشناسی گفت باد تند می‌آید. گلدان روی بالکن را چه کنیم؟", say: "هواشناسی گفت باد تند می‌آید. گلدان روی بالکن را چه کنیم؟", pic: true,
        options: [{ label: "🏠", value: "داخل خانه بیاوریم" }, { label: "🪟", value: "لبه بالکن بگذاریم" }], answer: "داخل خانه بیاوریم" },
      { type: "choose", prompt: "هواشناسی برای چه به ما کمک می‌کند؟", say: "هواشناسی برای چه به ما کمک می‌کند؟",
        options: ["برای اینکه آماده باشیم", "برای اینکه باران نیاید"], answer: "برای اینکه آماده باشیم" },
      { type: "home", pic: "📻 ☂️", text: "با هم هواشناسی را ببینیم و فردا امتحانش کنیم!",
        need: ["تلویزیون، رادیو یا گوشی برای دیدن پیش‌بینی هوا", "کاغذ و مداد"],
        steps: [
          "شب با هم پیش‌بینی هوای فردا را ببینید یا بشنوید. کودک شکلش را بکشد: آفتاب، ابر، باران، برف یا باد.",
          "بپرسید: «برای فردا چه آماده کنیم؟» و با هم آماده کنید.",
          "فردا از پنجره نگاه کنید: پیش‌بینی درست بود؟",
          "اگر کودک از طوفان یا باد تند می‌ترسد، آرام بگویید که خبرش را از قبل می‌دانیم و برایش آماده‌ایم."
        ],
        ask: "پیش‌بینی هوا درست بود؟" }
    ]
  },
  {
    id: "science-sprout-28", subject: "science", level: "sprout", emoji: "⚽", title: "تند و آهسته",
    steps: [
      { type: "scene", prompt: "هل دادن چه کار می‌کند؟", bg: "#cdeaf7",
        /* From the side: a gentle push and the ball rolls slowly and stops at the first flag; a hard push and it
           rolls fast to the far flag. Then a change of view, from above, on a rug: the rolling ball is pushed from
           the side and turns; a hand held in front of it stops it. Drawings: js/art/rig-science.js, hand from
           js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" },
          f1: { art: "sci-flag", at: [72, 83], s: 1.3, o: 0 }, f2: { art: "sci-flag", at: [146, 83], s: 1.3, o: 0 },
          boy: { art: "👦", at: [30, 82], s: 1.6 }, ball: { art: "sci-ball", at: [49, 71.6], s: 2.6 },
          rug: { art: "sci-rug-top", o: 0 },
          tball: { art: "sci-ball-top", at: [20, 45], s: 1.6, o: 0 },
          hand: { art: "hand", at: [80, 120], o: 0 }, hand2: { art: "hand", at: [180, 62], r: -90, o: 0 }
        },
        scenes: [
          { caption: "توپ را آرام هل بدهیم، آهسته می‌رود و زود می‌ایستد.", key: 3400, do: [
            { id: "boy.armF", to: { r: -62 }, at: 300, dur: 900, ease: "soft" },
            { id: "ball", path: "M49 71.6L66 71.6", at: 1100, dur: 2200, ease: "out" }, { id: "ball", to: { r: 150 }, at: 1100, dur: 2200, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 1600, dur: 600 },
            { id: "f1", to: { o: 1 }, at: 3300, dur: 400 }
          ] },
          { caption: "محکم هل بدهیم، تند می‌رود و خیلی دورتر.", key: 2200, hold: 5400, do: [
            { id: "ball", to: { x: 49, r: 0 }, dur: 600 },
            { id: "boy.armF", to: { r: 30 }, at: 600, dur: 400 }, { id: "boy.armF", to: { r: -66 }, at: 1100, dur: 250, ease: "in" },
            { id: "ball", path: "M49 71.6L134 71.6", at: 1350, dur: 1500, ease: "out" }, { id: "ball", to: { r: 900 }, at: 1350, dur: 1500, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 1900, dur: 600 },
            { id: "f2", to: { o: 1 }, at: 2900, dur: 400 }, { id: "f2", to: { s: 1.6 }, at: 3300, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "حالا از بالا نگاه می‌کنیم. توپ روی فرش می‌غلتد.", key: 2600, do: [
            { id: "rug", to: { o: 1 }, dur: 800 }, { id: "tball", to: { o: 1 }, at: 600, dur: 400 },
            { id: "tball", path: "M20 45L80 45", at: 1000, dur: 2400, ease: "linear" }, { id: "tball", to: { r: 540 }, at: 1000, dur: 2400, ease: "linear" }
          ] },
          { caption: "از کنار به توپ ضربه زدیم. توپ راهش را عوض کرد!", key: 700, hold: 4800, do: [
            { id: "hand", to: { o: 1 }, dur: 200 }, { id: "hand", path: "M80 120L80 77", dur: 600, ease: "in" },
            { id: "tball", path: "M80 45L108 12", at: 600, dur: 1600, ease: "out" }, { id: "tball", to: { r: 900 }, at: 600, dur: 1600, ease: "out" },
            { id: "hand", path: "M80 77L80 120", at: 800, dur: 700 }
          ] },
          { caption: "دستمان را جلوی توپ گرفتیم. توپ ایستاد.", key: 3400, hold: 5000, do: [
            { id: "tball", to: { o: 0 }, dur: 300 }, { id: "tball", to: { x: 20, y: 62 }, at: 300, dur: 1 }, { id: "tball", to: { o: 1 }, at: 400, dur: 300 },
            { id: "hand2", to: { o: 1 }, at: 300, dur: 200 }, { id: "hand2", path: "M180 62L130 62", at: 300, dur: 800, ease: "out" },
            { id: "tball", path: "M20 62L100 62", at: 900, dur: 2200, ease: "out" }, { id: "tball", to: { r: 720 }, at: 900, dur: 2200, ease: "out" }
          ] }
        ],
        question: "برای اینکه توپ تندتر برود، چه کنیم؟",
        options: ["محکم‌تر هلش بدهیم", "آرام‌تر هلش بدهیم"], answer: "محکم‌تر هلش بدهیم" },
      { type: "sort", prompt: "تند یا آهسته؟", say: "کدام تند می‌رود و کدام آهسته؟",
        baskets: [{ label: "تند", pic: "🐆", value: "fast" }, { label: "آهسته", pic: "🐢", value: "slow" }],
        items: [
          { pic: "🐆", say: "یوزپلنگ ایرانی", basket: "fast" },
          { pic: "🚂", say: "قطار", basket: "fast" },
          { pic: "🏃", say: "بچه‌ای که می‌دود", basket: "fast" },
          { pic: "🐌", say: "حلزون", basket: "slow" },
          { pic: "🐢", say: "لاک‌پشت", basket: "slow" },
          { pic: "🚶", say: "بچه‌ای که آرام راه می‌رود", basket: "slow" }
        ] },
      { type: "choose", prompt: "توپ دارد به طرف در حیاط می‌غلتد. چطور نگهش داریم؟", say: "توپ دارد به طرف در حیاط می‌غلتد. چطور نگهش داریم؟",
        options: ["دستمان یا پایمان را جلویش بگذاریم", "داد بزنیم"], answer: "دستمان یا پایمان را جلویش بگذاریم" },
      { type: "choose", prompt: "توپ از کنار ضربه بخورد، چه می‌شود؟", say: "اگر به توپی که می‌غلتد از کنار ضربه بزنیم، چه می‌شود؟",
        options: ["راهش را عوض می‌کند", "همان راه را می‌رود"], answer: "راهش را عوض می‌کند" },
      { type: "home", pic: "⚽ 📏", text: "آرام و محکم: توپ تا کجا می‌رود؟",
        need: ["یک توپ کوچک یا تیله", "چند تکه کاغذ یا لنگه جوراب برای علامت گذاشتن"],
        steps: [
          "در راهرو یا حیاط، توپ را یک بار آرام و یک بار محکم هل بدهید. هر بار جایی را که ایستاد با کاغذ علامت بگذارید.",
          "پیش از هر بار، کودک حدس بزند توپ تا کجا می‌رود.",
          "حالا یک نفر توپ را بغلتاند و دیگری از کنار آرام به آن ضربه بزند: کجا رفت؟",
          "فقط در جای امن بازی کنید، دور از پله و خیابان."
        ],
        ask: "با کدام هل دادن توپ دورتر رفت؟" }
    ]
  },
  {
    id: "science-sprout-29", subject: "science", level: "sprout", emoji: "🛝", title: "غلتیدن، سُر خوردن، تاب خوردن",
    steps: [
      { type: "scene", prompt: "در پارک چیزها چطور حرکت می‌کنند؟", bg: "#cdeaf7",
        /* A playground, one way of moving at a time: the ball rolls on the grass, turning; Sara slides down the
           slide; the swing goes back and forth with a boy on it; the pinwheel spins round in the wind. Last, all
           four move together. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [80, 12] },
          slide: { art: "sci-slide", at: [46, 86], s: 1.2 },
          swing: { art: "sci-swing", at: [112, 86], s: 1.1 },
          pin: { art: "sci-pinwheel", at: [148, 86], s: 0.9 },
          ball: { art: "sci-ball", at: [6, 80], s: 1.4 },
          girl: { art: "👧", at: [31.6, 50], s: 1, o: 0 },
          wind: { art: "sci-wind", at: [118, 52], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "توپ روی چمن می‌غلتد: دور خودش می‌چرخد و جلو می‌رود.", key: 2000, do: [
            { id: "ball", path: "M6 80L26 80", dur: 3000, ease: "out" }, { id: "ball", to: { r: 600 }, dur: 3000, ease: "out" }
          ] },
          { caption: "سارا از سرسره سُر می‌خورد و پایین می‌آید.", key: 2500, hold: 4600, do: [
            { id: "girl", to: { o: 1 }, dur: 400 },
            { id: "girl", path: "M31.6 50C38 50 42 62 50 72S66 82.4 72 82.4", at: 600, dur: 2200, ease: "in" },
            { id: "girl", walk: [80, 86], at: 3000, dur: 900, steps: 3 }
          ] },
          { caption: "تاب جلو و عقب می‌رود.", key: 1300, do: [
            { id: "swing.seat", to: { r: 30 }, dur: 1300, ease: "inout" },
            { id: "swing.seat", to: { r: -30 }, at: 1300, dur: 1300, ease: "inout" },
            { id: "swing.seat", to: { r: 25 }, at: 2600, dur: 1300, ease: "inout" },
            { id: "swing.seat", to: { r: 0 }, at: 3900, dur: 1000, ease: "inout" }
          ] },
          { caption: "باد وزید و فرفره دور خودش می‌چرخد.", key: 2400, do: [
            { id: "wind", to: { o: 1 }, dur: 100 }, { id: "wind", draw: true, dur: 1400 }, { id: "wind", to: { o: 0 }, at: 2800, dur: 400 },
            { id: "pin.blades", to: { r: 1440 }, at: 400, dur: 3600, ease: "inout" }
          ] },
          { caption: "غلتیدن، سُر خوردن، تاب خوردن و چرخیدن!", key: 1800, hold: 5000, do: [
            { id: "ball", path: "M26 80L36 80", dur: 1600, ease: "out" }, { id: "ball", to: { r: 900 }, dur: 1600, ease: "out" },
            { id: "swing.seat", to: { r: 25 }, dur: 1200, yoyo: true, times: 4 },
            { id: "pin.blades", to: { r: 2880 }, dur: 4000, ease: "linear" }
          ] }
        ],
        question: "فرفره چطور حرکت می‌کند؟",
        options: ["می‌چرخد", "سُر می‌خورد", "می‌پرد"], answer: "می‌چرخد" },
      { type: "sort", prompt: "می‌غلتد یا سُر می‌خورد؟", say: "کدام می‌غلتد و کدام سُر می‌خورد؟",
        baskets: [{ label: "می‌غلتد", pic: "⚽", value: "roll" }, { label: "سُر می‌خورد", pic: "🛷", value: "slide" }],
        items: [
          { pic: "🚲", say: "چرخ دوچرخه", basket: "roll" },
          { pic: "🍊", say: "پرتقال", basket: "roll" },
          { pic: "🪀", say: "یویو", basket: "roll" },
          { pic: "🛷", say: "سورتمه روی برف", basket: "slide" },
          { pic: "🛝", say: "بچه روی سرسره", basket: "slide" },
          { pic: "🧊", say: "یخ روی زمین", basket: "slide" }
        ] },
      { type: "pairs", prompt: "هر کدام چطور حرکت می‌کند؟", say: "هر چیز را به نوع حرکتش برسان.",
        pairs: [
          [{ pic: "⚽", say: "توپ" }, { label: "می‌غلتد", say: "می‌غلتد" }],
          [{ pic: "🛝", say: "سرسره" }, { label: "سُر می‌خورد", say: "سُر می‌خورد" }],
          [{ label: "تاب", say: "تاب" }, { label: "جلو و عقب می‌رود", say: "جلو و عقب می‌رود" }],
          [{ pic: "🌀", say: "فرفره" }, { label: "می‌چرخد", say: "می‌چرخد" }]
        ] },
      { type: "choose", prompt: "تاب چطور حرکت می‌کند؟", say: "تاب چطور حرکت می‌کند؟",
        options: ["جلو و عقب می‌رود", "می‌غلتد"], answer: "جلو و عقب می‌رود" },
      { type: "doit", pic: "🛝 🔄", text: "تو هم حرکت کن!",
        list: ["روی زمین نرم مثل توپ قِل بخور.", "دست‌هایت را باز کن و آرام دور خودت بچرخ، بعد بایست.", "مثل تاب، جلو و عقب تاب بخور.", "در پارک سرسره‌بازی کن و بگو: سُر خوردم!"],
        say: "تو هم حرکت کن! روی زمین نرم مثل توپ قل بخور. دست‌هایت را باز کن و آرام دور خودت بچرخ، بعد بایست. مثل تاب، جلو و عقب تاب بخور. در پارک سرسره‌بازی کن." }
    ]
  },
  {
    id: "science-sprout-33", subject: "science", level: "sprout", emoji: "☀️", title: "آفتاب گرم می‌کند",
    steps: [
      { type: "scene", prompt: "آفتاب چه کار می‌کند؟", bg: "#cdeaf7",
        /* Two stones, one in the sun and one in the tree's shade: a hand touches each (warmth rises from the sunny
           one, coolness from the shaded one); two dishes of water, the same; then a teddy is hot in the sun, and a
           shade of two sticks and a cloth is made for it. Drawings: js/art/rig-science.js, hand from
           js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [132, 14], s: 1.2 },
          ray: { art: "sci-ray", at: [128, 20], r: 125, sx: 1.6, o: 0 },
          shade: { art: "sci-shade", at: [40, 86] }, tree: { art: "sci-tree", at: [40, 84], s: 0.9 },
          stoneB: { art: "sci-stone", at: [44, 86], s: 0.9 }, stoneA: { art: "sci-stone", at: [92, 86], s: 0.9 },
          warmA: { art: "sci-warm", at: [92, 78], o: 0 }, coolB: { art: "sci-chill", at: [44, 78], s: 0.7, o: 0 },
          dishB: { art: "sci-dish", at: [28, 86], s: 1.4, o: 0 }, dishA: { art: "sci-dish", at: [108, 86], s: 1.4, o: 0 },
          warmD: { art: "sci-warm", at: [108, 80], o: 0 }, coolD: { art: "sci-chill", at: [28, 80], s: 0.7, o: 0 },
          teddy: { art: "🧸", at: [134, 86], s: 0.7, o: 0 }, warmT: { art: "sci-warm", at: [134, 70], o: 0 },
          tshade: { art: "sci-shade", at: [134, 86.4], s: 0.5, o: 0 },
          canopy: { art: "sci-canopy", at: [134, 86], o: 0 },
          hand: { art: "hand", at: [92, -30], r: 180 }
        },
        scenes: [
          { caption: "دو سنگ داریم: یکی زیر آفتاب است و یکی در سایه درخت.", key: 2400, do: [
            { id: "sun.rays", to: { r: 90 }, dur: 3000 },
            { id: "ray", to: { o: 1 }, at: 600, dur: 100 }, { id: "ray", draw: true, at: 600, dur: 1400 }
          ] },
          { caption: "سنگی که زیر آفتاب است گرم شده.", key: 2600, hold: 5000, do: [
            { id: "hand", path: "M92 -30L92 57.7", dur: 1400, ease: "out" },
            { id: "warmA", to: { o: 1 }, at: 1400, dur: 100 }, { id: "warmA", draw: true, at: 1400, dur: 1400 },
            { id: "hand", path: "M92 57.7L92 -30", at: 3400, dur: 1000, ease: "in" }
          ] },
          { caption: "سنگی که در سایه است خنک مانده.", key: 2800, hold: 5000, do: [
            { id: "hand", to: { x: 44 }, dur: 1 }, { id: "hand", path: "M44 -30L44 57.7", at: 100, dur: 1400, ease: "out" },
            { id: "coolB", to: { o: 1 }, at: 1500, dur: 100 }, { id: "coolB", draw: true, at: 1500, dur: 1400 },
            { id: "hand", path: "M44 57.7L44 -30", at: 3400, dur: 1000, ease: "in" }
          ] },
          { caption: "آب هم همین‌طور است: آب کاسه آفتابی گرم شد و آب کاسه سایه خنک ماند.", key: 3400, hold: 6000, do: [
            { id: "dishA", to: { o: 1 }, dur: 500 }, { id: "dishB", to: { o: 1 }, dur: 500 },
            { id: "dishA.water", to: { o: 1 }, at: 400, dur: 400 }, { id: "dishB.water", to: { o: 1 }, at: 400, dur: 400 },
            { id: "warmD", to: { o: 1 }, at: 1600, dur: 100 }, { id: "warmD", draw: true, at: 1600, dur: 1600 },
            { id: "coolD", to: { o: 1 }, at: 1800, dur: 100 }, { id: "coolD", draw: true, at: 1800, dur: 1600 }
          ] },
          { caption: "خرس عروسکی زیر آفتاب داغ شده. برایش سایه‌بان می‌سازیم!", key: 4400, hold: 6800, do: [
            { id: "teddy", to: { o: 1 }, dur: 500 }, { cam: { x: 126, y: 70, zoom: 2.2 }, dur: 1200 },
            { id: "warmT", to: { o: 1 }, at: 500, dur: 100 }, { id: "warmT", draw: true, at: 500, dur: 1200 },
            { id: "canopy", to: { o: 1 }, at: 1800, dur: 100 }, { id: "canopy.sticks", to: { sy: 0 }, at: 1800, dur: 1 }, { id: "canopy.sticks", to: { sy: 1 }, at: 1900, dur: 900 },
            { id: "canopy.cloth", to: { o: 1 }, at: 3000, dur: 600 },
            { id: "tshade", to: { o: 1 }, at: 3500, dur: 600 }, { id: "warmT", to: { o: 0 }, at: 3600, dur: 800 }
          ] }
        ],
        question: "کدام سنگ گرم‌تر بود؟",
        options: ["سنگی که زیر آفتاب بود", "سنگی که در سایه بود"], answer: "سنگی که زیر آفتاب بود" },
      { type: "choose", prompt: "تابستان است. کجا خنک‌تر است؟", say: "تابستان است و هوا گرم است. کجا خنک‌تر است؟", pic: true,
        options: [{ label: "🌳", value: "زیر سایه درخت" }, { label: "☀️", value: "زیر آفتاب" }], answer: "زیر سایه درخت" },
      { type: "choose", prompt: "ماشین را زیر آفتاب پارک کرده‌ایم. فرمانش چطور شده؟", say: "ماشین ساعت‌ها زیر آفتاب مانده. فرمانش چطور شده؟",
        options: ["گرم شده", "سرد شده"], answer: "گرم شده" },
      { type: "choose", prompt: "برای اینکه بستنی دیرتر آب شود، کجا بخوریمش؟", say: "برای اینکه بستنی دیرتر آب شود، کجا بخوریمش؟", pic: true,
        options: [{ label: "🌳", value: "در سایه" }, { label: "☀️", value: "زیر آفتاب" }], answer: "در سایه" },
      { type: "home", pic: "☀️ 🧸", text: "آفتاب و سایه را با دستت امتحان کن.",
        need: ["دو سنگ یا دو کاسه آب هم‌اندازه", "یک اسباب‌بازی کوچک", "دو چوب‌بستنی یا مداد، یک دستمال و کمی خمیر یا چسب"],
        steps: [
          "صبح یک سنگ یا کاسه آب را در آفتاب و یکی را در سایه بگذارید.",
          "ظهر با هم لمس کنید: کدام گرم‌تر است؟ (در روزهای خیلی گرم، اول خودتان لمس کنید.)",
          "با دو چوب و یک دستمال برای اسباب‌بازی سایه‌بان بسازید: چوب‌ها را در خمیر بگذارید و دستمال را رویشان ببندید.",
          "آیا سایه‌بان سایه درست کرد؟ اگر نه، با هم درستش کنید و دوباره امتحان کنید."
        ],
        ask: "چرا سنگ آفتابی گرم‌تر شد؟" }
    ]
  },
  {
    id: "science-sprout-35", subject: "science", level: "sprout", emoji: "🐜", title: "جانداران جایشان را تغییر می‌دهند",
    steps: [
      { type: "scene", prompt: "جانداران چطور جایشان را عوض می‌کنند؟", bg: "#cdeaf7",
        /* Four places, one after another: ants dig tunnels under the ground and carry the soil out into a heap; a
           sparrow builds a nest, twig by twig; a root grows into the crack of a rock and opens it as the little tree
           grows; a man lays bricks one by one into a wall. Drawings: js/art/rig-science.js. */
        parts: {
          bgD: { art: "sci-meadow" }, man: { art: "👨", at: [26, 86] }, pile: { art: "sci-brick", at: [46, 86], s: 1.2 },
          b1: { art: "sci-brick", at: [46, 84], o: 0 },
          b2: { art: "sci-brick", at: [46, 84], o: 0 },
          b3: { art: "sci-brick", at: [46, 84], o: 0 },
          b4: { art: "sci-brick", at: [46, 84], o: 0 },
          b5: { art: "sci-brick", at: [46, 84], o: 0 },
          b6: { art: "sci-brick", at: [46, 84], o: 0 },
          b7: { art: "sci-brick", at: [46, 84], o: 0 },
          b8: { art: "sci-brick", at: [46, 84], o: 0 },
          b9: { art: "sci-brick", at: [46, 84], o: 0 },
          bgC: { art: "sci-meadow" }, rock: { art: "sci-rock", at: [80, 88], s: 1.6 }, tree: { art: "sci-plant", at: [80, 61], s: 0.5 },
          bgB: { art: "sci-meadow" }, btree: { art: "sci-tree", at: [52, 88], s: 1.15 },
          nestBack: { art: "sci-nest-back", at: [82, 44.5], s: 1.3, o: 0 }, nest: { art: "sci-nest", at: [82, 44.5], s: 1.3, o: 0 }, lines: { art: "sci-nest-lines", at: [82, 44.5], s: 1.3, o: 0 },
          bird: { art: "sci-sparrow", at: [170, 8], s: 1.4, flip: true }, twig: { art: "sci-twig", at: [11, -9], under: "bird" },
          bgA: { art: "sci-soil" }, tunnels: { art: "sci-tunnels", o: 0 }, hill: { art: "sci-anthill", at: [40, 58], s: 0.4 },
          a1: { art: "🐜", at: [70, 58], s: 0.45 }, a2: { art: "🐜", at: [40, 70], s: 0.45, o: 0 }
        },
        scenes: [
          { caption: "مورچه‌ها زیر خاک تونل می‌کنند و خاکش را بیرون می‌آورند.", key: 4400, hold: 6400, do: [
            { id: "a1", path: "M70 58L42 58", dur: 1600, ease: "linear" }, { id: "a1", to: { o: 0 }, at: 1600, dur: 300 },
            { id: "tunnels", to: { o: 1 }, at: 1400, dur: 100 }, { id: "tunnels", draw: true, oneByOne: true, at: 1400, dur: 3600 },
            { id: "a2", to: { o: 1 }, at: 2000, dur: 300 }, { id: "a2", path: "M54 82C46 80 38 78 40 72S42 62 40 58", at: 2000, dur: 3000, ease: "linear" },
            { id: "hill", to: { s: 1.8 }, at: 2600, dur: 3000 }, { cam: { x: 50, y: 66, zoom: 2 }, at: 800, dur: 1200 }
          ] },
          { caption: "گنجشک با شاخه‌های کوچک لانه می‌سازد.", key: 5200, hold: 8000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 800 }, { id: "bgA", to: { o: 0 }, dur: 800 }, { id: "tunnels", to: { o: 0 }, dur: 800 }, { id: "hill", to: { o: 0 }, dur: 800 }, { id: "a2", to: { o: 0 }, dur: 800 },
            { id: "bird.wing", to: { r: -40 }, at: 600, dur: 6400, yoyo: true, times: 34 },
            { id: "bird", path: "M170 8Q130 4 85 40", at: 600, dur: 1600 },
            { id: "twig", to: { o: 0 }, at: 2300, dur: 200 },
            { id: "lines", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lines", draw: true, oneByOne: true, at: 2300, dur: 4200 },
            { id: "bird", path: "M85 40Q120 0 170 6", at: 2600, dur: 1300 },
            { id: "twig", to: { o: 1 }, at: 3900, dur: 100 },
            { id: "bird", path: "M170 6Q130 2 85 40", at: 4100, dur: 1500 },
            { id: "twig", to: { o: 0 }, at: 5700, dur: 200 },
            { id: "nestBack", to: { o: 1 }, at: 6400, dur: 800 }, { id: "nest", to: { o: 1 }, at: 6400, dur: 800 }
          ] },
          { caption: "ریشه درخت در شکاف سنگ رشد می‌کند و سنگ را باز می‌کند.", key: 5000, hold: 7000, do: [
            { id: "bgB", to: { o: 0 }, dur: 800 }, { id: "btree", to: { o: 0 }, dur: 800 }, { id: "bird", to: { o: 0 }, dur: 800 },
            { id: "nest", to: { o: 0 }, dur: 800 }, { id: "nestBack", to: { o: 0 }, dur: 800 }, { id: "lines", to: { o: 0 }, dur: 800 },
            { id: "rock.root", to: { sy: 0 }, dur: 1 }, { id: "rock.root", to: { sy: 1 }, at: 1000, dur: 3000 },
            { id: "tree", to: { s: 1.2 }, at: 1000, dur: 4000 },
            { id: "rock.left", to: { r: -8 }, at: 2400, dur: 2600 }, { id: "rock.right", to: { r: 8 }, at: 2400, dur: 2600 }
          ] },
          { caption: "آدم‌ها آجرها را روی هم می‌گذارند و خانه می‌سازند.", key: 6800, hold: 8000, do: [
            { cam: { x: 62, y: 66, zoom: 1.8 }, dur: 900 }, { id: "bgC", to: { o: 0 }, dur: 800 }, { id: "rock", to: { o: 0 }, dur: 800 }, { id: "tree", to: { o: 0 }, dur: 800 },
            { id: "man.armF", to: { r: -60 }, at: 600, dur: 300 }, { id: "b1", to: { o: 1 }, at: 600, dur: 100 }, { id: "b1", path: "M46 84Q60 74 74 86", at: 600, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 1200, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 1400, dur: 300 }, { id: "b2", to: { o: 1 }, at: 1400, dur: 100 }, { id: "b2", path: "M46 84Q64 74 82 86", at: 1400, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 2000, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 2200, dur: 300 }, { id: "b3", to: { o: 1 }, at: 2200, dur: 100 }, { id: "b3", path: "M46 84Q68 74 90 86", at: 2200, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 2800, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 3000, dur: 300 }, { id: "b4", to: { o: 1 }, at: 3000, dur: 100 }, { id: "b4", path: "M46 84Q62 70 78 82", at: 3000, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 3600, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 3800, dur: 300 }, { id: "b5", to: { o: 1 }, at: 3800, dur: 100 }, { id: "b5", path: "M46 84Q66 70 86 82", at: 3800, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 4400, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 4600, dur: 300 }, { id: "b6", to: { o: 1 }, at: 4600, dur: 100 }, { id: "b6", path: "M46 84Q70 70 94 82", at: 4600, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 5200, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 5400, dur: 300 }, { id: "b7", to: { o: 1 }, at: 5400, dur: 100 }, { id: "b7", path: "M46 84Q60 66 74 78", at: 5400, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 6000, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 6200, dur: 300 }, { id: "b8", to: { o: 1 }, at: 6200, dur: 100 }, { id: "b8", path: "M46 84Q64 66 82 78", at: 6200, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 6800, dur: 300 },
            { id: "man.armF", to: { r: -60 }, at: 7000, dur: 300 }, { id: "b9", to: { o: 1 }, at: 7000, dur: 100 }, { id: "b9", path: "M46 84Q68 66 90 78", at: 7000, dur: 600 }, { id: "man.armF", to: { r: -10 }, at: 7600, dur: 300 }
          ] }
        ],
        question: "مورچه‌ها کجا خانه می‌سازند؟", pic: true,
        options: [{ label: "☁️", value: "در آسمان" }, { label: "🟫", value: "زیر خاک" }, { label: "🌊", value: "در دریا" }], answer: "زیر خاک" },
      { type: "pairs", prompt: "چه کسی چه می‌سازد؟", say: "مورچه زیر خاک تونل می‌کند. جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🐜", say: "مورچه" }, { label: "تونل زیر خاک", pic: "🟫", say: "تونل زیر خاک" }],
          [{ pic: "🐦", say: "گنجشک" }, { label: "لانه", pic: "🌳", say: "لانه روی درخت" }],
          [{ pic: "🌱", say: "ریشه گیاه" }, { label: "شکاف سنگ", pic: "🪨", say: "سنگ را باز می‌کند" }],
          [{ pic: "👨", say: "آدم‌ها" }, { label: "خانه", pic: "🏠", say: "خانه" }]
        ] },
      { type: "pairs", prompt: "چه کسی این را ساخته؟", say: "هر چیز را به سازنده‌اش برسان.",
        pairs: [
          [{ pic: "🕸️", say: "تار" }, { pic: "🕷️", say: "عنکبوت" }],
          [{ pic: "🍯", say: "کندوی عسل" }, { pic: "🐝", say: "زنبور" }],
          [{ pic: "🏫", say: "مدرسه" }, { pic: "🧑", say: "آدم‌ها" }]
        ] },
      { type: "choose", prompt: "زنبور کجا خانه می‌سازد؟", say: "زنبور عسل خانه‌اش را چه می‌سازد؟",
        options: ["کندو", "لانه زیر آب"], answer: "کندو" },
      { type: "home", pic: "🐜 🔍", text: "دنبال کارهای جانداران بگرد!",
        need: ["چشم‌های تیزبین", "کاغذ و مداد"],
        steps: [
          "در حیاط، پارک یا کوچه دنبال نشانه‌هایی بگردید که جانداران ساخته‌اند: لانه مورچه، لانه پرنده، تار عنکبوت، جای ریشه در آسفالت یا دیوار.",
          "فقط نگاه کنید و به لانه‌ها دست نزنید.",
          "بپرسید: «این جانور یا گیاه جایش را چطور عوض کرده؟»",
          "کودک یکی را که دید نقاشی کند."
        ],
        ask: "کدام کار جانداران را دیدی؟" }
    ]
  },
  {
    id: "science-sprout-18", subject: "science", level: "sprout", emoji: "🚰", title: "آب را هدر ندهیم",
    steps: [
      { type: "scene", prompt: "هر قطره آب ارزش دارد", bg: "#f6efdc",
        /* Iran's map: most of it is dry desert, only the north is green with rain. Then the bathroom: Reza brushes
           his teeth with the tap running and the water runs away; he turns the tap off and uses a cup; the water
           saved fills glass after glass, counted. Drawings: js/art/rig-science.js (tap, water and bathroom from
           js/art/rig.js). */
        parts: {
          room: { art: "bathroom" }, water: { art: "water", o: 0 }, tap: { art: "tap" },
          cup: { art: "sci-tumbler", at: [100, 62], s: 0.7, o: 0 },
          g1: { art: "sci-tumbler", at: [104, 88], s: 0.8, o: 0 }, g2: { art: "sci-tumbler", at: [116, 88], s: 0.8, o: 0 }, g3: { art: "sci-tumbler", at: [128, 88], s: 0.8, o: 0 },
          g4: { art: "sci-tumbler", at: [140, 88], s: 0.8, o: 0 }, g5: { art: "sci-tumbler", at: [152, 88], s: 0.8, o: 0 },
          count: { art: "counter", at: [128, 64], s: 1.2, o: 0 },
          boy: { art: "👦", at: [40, 90], s: 1.6 }, brush: { art: "sci-toothbrush", at: [49, 58.4], s: 0.9, o: 0 },
          map: { art: "sci-iran" }
        },
        scenes: [
          { caption: "ایران سرزمین خشکی است. در بیشتر جاهایش باران کمی می‌بارد.", key: 3200, hold: 6000, do: [
            { id: "map.desert", to: { o: 1 }, at: 600, dur: 1200 }, { id: "map.north", to: { o: 1 }, at: 1800, dur: 1200 },
            { emit: "drop", where: [74, 14], spread: [18, 3], rise: -6, n: 10, at: 2400, dur: 2400, life: 800 }
          ] },
          { caption: "اگر موقع مسواک زدن شیر آب باز بماند، آب زیادی هدر می‌رود.", key: 3600, hold: 6400, do: [
            { id: "map", to: { o: 0 }, dur: 900 },
            { id: "tap.handle", to: { r: -55 }, at: 900, dur: 600 }, { id: "water", to: { o: 1 }, at: 1400, dur: 300 },
            { id: "boy.armF", to: { r: -135 }, at: 1200, dur: 600 }, { id: "brush", to: { o: 1 }, at: 1600, dur: 300 },
            { id: "brush", to: { x: 50.5 }, at: 2000, dur: 3600, yoyo: true, times: 14 },
            { emit: "drop", where: [80, 68], spread: [8, 1], rise: 2, n: 14, at: 1600, dur: 4400, life: 600 }
          ] },
          { caption: "رضا شیر را می‌بندد. برای شستن دهانش فقط یک لیوان آب برمی‌دارد.", key: 3400, hold: 6000, do: [
            { id: "tap.handle", to: { r: 0 }, dur: 600 }, { id: "water", to: { o: 0 }, at: 300, dur: 300 },
            { id: "brush", to: { o: 0 }, at: 900, dur: 300 }, { id: "boy.armF", to: { r: -60 }, at: 900, dur: 600 },
            { id: "cup", to: { o: 1 }, at: 1200, dur: 400 }, { id: "cup.water", to: { sy: 0.2 }, at: 1200, dur: 1 },
            { id: "cup", path: "M100 62Q80 40 52 64", at: 1800, dur: 1200 },
            { id: "cup.water", to: { sy: 0.9 }, at: 1800, dur: 1 }
          ] },
          { caption: "این‌طوری هر بار چند لیوان آب نگه می‌داریم!", key: 6400, hold: 7400, do: [
            { id: "cup", to: { o: 0 }, dur: 400 }, { id: "boy.armF", to: { r: 0 }, dur: 600 },
            { id: "count", to: { o: 1 }, at: 400, dur: 300 },
            { id: "g1", to: { o: 1 }, at: 600, dur: 300 }, { count: "count", from: 1, to: 1, at: 700, dur: 1 },
            { id: "g2", to: { o: 1 }, at: 1600, dur: 300 }, { count: "count", from: 2, to: 2, at: 1700, dur: 1 },
            { id: "g3", to: { o: 1 }, at: 2600, dur: 300 }, { count: "count", from: 3, to: 3, at: 2700, dur: 1 },
            { id: "g4", to: { o: 1 }, at: 3600, dur: 300 }, { count: "count", from: 4, to: 4, at: 3700, dur: 1 },
            { id: "g5", to: { o: 1 }, at: 4600, dur: 300 }, { count: "count", from: 5, to: 5, at: 4700, dur: 1 },
            { emit: "spark", where: [128, 72], spread: [26, 8], n: 8, at: 5000, dur: 1200 }
          ] }
        ],
        question: "موقع مسواک زدن، شیر آب را چه کنیم؟",
        options: ["ببندیم", "باز بگذاریم"], answer: "ببندیم" },
      { type: "choose", prompt: "برای شستن ماشین یا حیاط کدام آب کمتری هدر می‌دهد؟", say: "برای شستن ماشین یا حیاط، کدام آب کمتری هدر می‌دهد؟", pic: true,
        options: [{ label: "🪣", value: "یک سطل آب" }, { label: "🚿", value: "شلنگی که همیشه باز است" }], answer: "یک سطل آب" },
      { type: "choose", prompt: "شیر آب چکه می‌کند. چه کنیم؟", say: "شیر آب چکه می‌کند. چه کار کنیم؟",
        options: ["به بزرگ‌ترها بگوییم تا درستش کنند", "کاری نکنیم"], answer: "به بزرگ‌ترها بگوییم تا درستش کنند" },
      { type: "choose", prompt: "آب ته لیوان مانده. با آن چه کنیم؟", say: "کمی آب ته لیوانت مانده. با آن چه کار کنیم؟", pic: true,
        options: [{ label: "🪴", value: "به گلدان بدهیم" }, { label: "🚽", value: "دورش بریزیم" }], answer: "به گلدان بدهیم" },
      { type: "home", pic: "🥛 🪥", text: "بشمار چند لیوان آب نگه داشتی!",
        need: ["یک لیوان", "یک کاسه یا تشت"],
        steps: [
          "یک بار وقت مسواک زدن، تشت را زیر شیر بگذارید و شیر را باز بگذارید. آب تشت را با لیوان بشمارید.",
          "بار دیگر شیر را ببندید و فقط یک لیوان آب بردارید.",
          "فرقش را حساب کنید: چند لیوان آب نگه داشتید؟ آب تشت را به گلدان‌ها بدهید.",
          "با هم دنبال شیرهای چکه‌کن در خانه بگردید."
        ],
        ask: "تو چطور می‌توانی آب را هدر ندهی؟" }
    ]
  },
  {
    id: "science-sprout-36", subject: "science", level: "sprout", emoji: "♻️", title: "زباله‌ها را جدا کنیم",
    steps: [
      { type: "scene", prompt: "هر زباله در سطل خودش", bg: "#f6efdc",
        /* Four bins by the kitchen table, each with its picture above it; one thing after another goes from the
           table into its bin: the paper, the plastic bottle, the glass bottle, the apple core. The jam jar is kept:
           pencils go into it. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          binP: { art: "sci-bin-paper", at: [30, 90], s: 1.1 }, binL: { art: "sci-bin-plastic", at: [56, 90], s: 1.1 },
          binG: { art: "sci-bin-glass", at: [82, 90], s: 1.1 }, binF: { art: "sci-bin-food", at: [108, 90], s: 1.1 },
          icP: { art: "📄", at: [30, 63], s: 0.45 }, icL: { art: "🥤", at: [56, 63], s: 0.45 }, icG: { art: "🥛", at: [82, 63], s: 0.45 }, icF: { art: "🍎", at: [108, 63], s: 0.45 },
          paper: { art: "sci-paperball", at: [128, 66], s: 2.2 },
          bottle: { art: "sci-bottle", at: [140, 70], s: 0.75 },
          gbottle: { art: "sci-glassbottle", at: [151, 70], s: 0.8 },
          core: { art: "sci-core", at: [121, 65], s: 1.8 },
          jar: { art: "sci-jar", at: [134, 70], s: 1 }
        },
        scenes: [
          { caption: "زباله‌ها را قاطی نمی‌کنیم. چهار سطل داریم: کاغذ، پلاستیک، شیشه و غذا.", key: 3600, hold: 6000, do: [
            { id: "binP", to: { y: 89 }, at: 300, dur: 300, yoyo: true, times: 2 }, { id: "binL", to: { y: 89 }, at: 900, dur: 300, yoyo: true, times: 2 },
            { id: "binG", to: { y: 89 }, at: 1500, dur: 300, yoyo: true, times: 2 }, { id: "binF", to: { y: 89 }, at: 2100, dur: 300, yoyo: true, times: 2 }
          ] },
          { caption: "کاغذ در سطل کاغذ، بطری پلاستیکی در سطل پلاستیک.", key: 1400, hold: 5000, do: [
            { id: "paper", path: "M128 66Q80 30 30 68", dur: 1600 }, { id: "paper", to: { r: 360 }, dur: 1600 }, { id: "paper", to: { o: 0 }, at: 1600, dur: 200 },
            { id: "bottle", path: "M140 70Q100 30 56 72", at: 2000, dur: 1600 }, { id: "bottle", to: { r: -200 }, at: 2000, dur: 1600 }, { id: "bottle", to: { o: 0 }, at: 3600, dur: 200 }
          ] },
          { caption: "بطری شیشه‌ای در سطل شیشه، ته‌مانده سیب در سطل غذا.", key: 1400, hold: 5000, do: [
            { id: "gbottle", path: "M150 70Q116 30 82 72", dur: 1600 }, { id: "gbottle", to: { r: -200 }, dur: 1600 }, { id: "gbottle", to: { o: 0 }, at: 1600, dur: 200 },
            { id: "core", path: "M121 65Q114 40 108 68", at: 2000, dur: 1400 }, { id: "core", to: { r: 300 }, at: 2000, dur: 1400 }, { id: "core", to: { o: 0 }, at: 3400, dur: 200 }
          ] },
          { caption: "شیشه مربا را دور نمی‌اندازیم. حالا جای مداد شده!", key: 2600, hold: 5400, do: [
            { cam: { x: 130, y: 58, zoom: 2.4 }, dur: 1200 },
            { id: "jar.pencils", to: { o: 1 }, at: 1400, dur: 100 }, { id: "jar.pencils", to: { y: 0 }, at: 1400, dur: 1 },
            { id: "jar", to: { r: 4 }, at: 2400, dur: 600, yoyo: true, times: 2 }
          ] }
        ],
        question: "بطری پلاستیکی را در کدام سطل بیندازیم؟",
        options: ["سطل پلاستیک", "سطل غذا", "سطل کاغذ"], answer: "سطل پلاستیک" },
      { type: "sort", prompt: "هر زباله در سطل خودش", say: "هر زباله را در سطل خودش بینداز.",
        baskets: [{ label: "کاغذ", pic: "📄", value: "paper" }, { label: "پلاستیک", pic: "🥤", value: "plastic" }, { label: "شیشه", pic: "🥛", value: "glass" }, { label: "غذا", pic: "🍎", value: "food" }],
        items: [
          { pic: "📰", say: "روزنامه", basket: "paper" },
          { pic: "📦", say: "جعبه مقوایی", basket: "paper" },
          { pic: "🧴", say: "بطری شامپو", basket: "plastic" },
          { pic: "🛍️", say: "کیسه پلاستیکی", basket: "plastic" },
          { pic: "🫙", say: "شیشه خالی", basket: "glass" },
          { pic: "🍌", say: "پوست موز", basket: "food" },
          { pic: "🥚", say: "پوست تخم‌مرغ", basket: "food" }
        ] },
      { type: "choose", prompt: "با جعبه کفش خالی چه کنیم؟", say: "یک جعبه کفش خالی داریم. با آن چه کار کنیم؟", pic: true,
        options: [{ label: "🧸", value: "خانه عروسک بسازیم" }, { label: "🗑️", value: "بیندازیمش با زباله غذا" }], answer: "خانه عروسک بسازیم" },
      { type: "choose", prompt: "شیشه مربای خالی را چه کنیم؟", say: "شیشه مربای خالی را چه کار کنیم؟",
        options: ["دوباره به کارش ببریم یا در سطل شیشه بیندازیم", "با زباله غذا قاطی کنیم"], answer: "دوباره به کارش ببریم یا در سطل شیشه بیندازیم" },
      { type: "home", pic: "♻️ 📦", text: "در خانه زباله‌ها را جدا کن و یک چیز کهنه را دوباره به کار ببر!",
        need: ["چند کیسه یا جعبه برای جدا کردن", "یک جعبه یا شیشه خالی و تمیز"],
        steps: [
          "روی هر کیسه یک شکل بکشید: کاغذ، پلاستیک، شیشه، غذا.",
          "یک هفته کودک کمک کند زباله‌ها را در کیسه درست بیندازد. شیشه‌ها را بزرگ‌ترها جابه‌جا کنند.",
          "با هم از یک جعبه یا شیشه خالی چیز تازه‌ای بسازید: جای مداد، خانه عروسک، گلدان.",
          "بپرسید: «اگر زباله‌ها را جدا کنیم، چه فایده‌ای دارد؟»"
        ],
        ask: "با چه چیز کهنه‌ای چیز تازه ساختی؟" }
    ]
  },
  {
    id: "science-sprout-30", subject: "science", level: "sprout", emoji: "⛵", title: "چه می‌خواهم بسازم؟",
    steps: [
      { type: "scene", prompt: "یک قایق فویلی بسازیم", bg: "#f6efdc",
        /* Plan, build, test, improve: a plan is drawn; the first foil boat floats, but four pebbles push it down
           until water gets in and it sinks; the better boat, wider with high sides, carries ten pebbles (counted)
           and stays up. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          basin: { art: "sci-basin", at: [80, 88], s: 1.4 },
          plan: { art: "sci-plan", at: [80, 34], s: 1.3 },
          boat: { art: "sci-foilboat", at: [64, 40], s: 1.4, o: 0 }, boat2: { art: "sci-foilboat2", at: [96, 40], s: 1.4, o: 0 },
          p1: { art: "sci-pebble", at: [-5, -5.2], o: 0, under: "boat" },
          p2: { art: "sci-pebble", at: [-1.6, -5.2], o: 0, under: "boat" },
          p3: { art: "sci-pebble", at: [1.8, -5.2], o: 0, under: "boat" },
          p4: { art: "sci-pebble", at: [5, -5.2], o: 0, under: "boat" },
          q1: { art: "sci-pebble", at: [-10, -9.2], o: 0, under: "boat2" },
          q2: { art: "sci-pebble", at: [-6.6, -9.2], o: 0, under: "boat2" },
          q3: { art: "sci-pebble", at: [-3.2, -9.2], o: 0, under: "boat2" },
          q4: { art: "sci-pebble", at: [0.2, -9.2], o: 0, under: "boat2" },
          q5: { art: "sci-pebble", at: [3.6, -9.2], o: 0, under: "boat2" },
          q6: { art: "sci-pebble", at: [7, -9.2], o: 0, under: "boat2" },
          q7: { art: "sci-pebble", at: [10.2, -9.2], o: 0, under: "boat2" },
          q8: { art: "sci-pebble", at: [-8.4, -11.4], o: 0, under: "boat2" },
          q9: { art: "sci-pebble", at: [-1.6, -11.4], o: 0, under: "boat2" },
          q10: { art: "sci-pebble", at: [5.2, -11.4], o: 0, under: "boat2" },
          water: { art: "sci-basin-water", at: [80, 88], s: 1.4 },
          count: { art: "counter", at: [112, 54], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "می‌خواهیم با فویل قایقی بسازیم که سنگ‌ریزه زیادی ببرد. اول نقشه‌اش را می‌کشیم.", key: 3400, hold: 6400, do: [
            { id: "plan.sketch", draw: true, at: 600, dur: 3200 }
          ] },
          { caption: "قایق را ساختیم و روی آب گذاشتیم. روی آب ماند!", key: 3000, do: [
            { id: "plan", to: { o: 0 }, dur: 500 }, { cam: { x: 80, y: 68, zoom: 2 }, at: 1600, dur: 1200 },
            { id: "boat", to: { o: 1 }, at: 400, dur: 400 }, { id: "boat", path: "M64 40L64 69.5", at: 800, dur: 1200, ease: "out" },
            { id: "boat", to: { r: 3 }, at: 2000, dur: 900, yoyo: true, times: 2 }
          ] },
          { caption: "سنگ‌ریزه‌ها را یکی یکی گذاشتیم. قایق پایین رفت، آب تویش آمد و غرق شد!", key: 5200, hold: 7400, do: [
            { id: "p1", to: { o: 1 }, at: 400, dur: 100 }, { id: "p1", path: "M-5 -24L-5 -5.2", at: 400, dur: 500, ease: "in" }, { id: "boat", to: { y: 70.7 }, at: 900, dur: 300 },
            { id: "p2", to: { o: 1 }, at: 1300, dur: 100 }, { id: "p2", path: "M-1.6 -24L-1.6 -5.2", at: 1300, dur: 500, ease: "in" }, { id: "boat", to: { y: 71.9 }, at: 1800, dur: 300 },
            { id: "p3", to: { o: 1 }, at: 2200, dur: 100 }, { id: "p3", path: "M1.8 -24L1.8 -5.2", at: 2200, dur: 500, ease: "in" }, { id: "boat", to: { y: 73.1 }, at: 2700, dur: 300 },
            { id: "p4", to: { o: 1 }, at: 3100, dur: 100 }, { id: "p4", path: "M5 -24L5 -5.2", at: 3100, dur: 500, ease: "in" }, { id: "boat", to: { y: 74.3 }, at: 3600, dur: 300 },
            { id: "boat.in", to: { o: 1 }, at: 4300, dur: 400 },
            { id: "boat", to: { y: 84, r: 14 }, at: 4600, dur: 1600, ease: "in" }
          ] },
          { caption: "قایق را بهتر کردیم: کفش پهن‌تر و لبه‌هایش بلندتر شد.", key: 2400, do: [
            { id: "boat2", to: { o: 1 }, dur: 400 }, { id: "boat2", path: "M96 40L96 69.5", at: 400, dur: 1200, ease: "out" },
            { id: "boat2", to: { r: -3 }, at: 1600, dur: 900, yoyo: true, times: 2 }
          ] },
          { caption: "قایق تازه ده سنگ‌ریزه برد و غرق نشد!", key: 5600, hold: 7000, do: [
            { id: "count", to: { o: 1 }, dur: 300 },
            { id: "q1", to: { o: 1 }, at: 400, dur: 100 }, { id: "q1", path: "M-10 -24L-10 -9.2", at: 400, dur: 400, ease: "in" }, { count: "count", from: 1, to: 1, at: 800, dur: 1 },
            { id: "q2", to: { o: 1 }, at: 900, dur: 100 }, { id: "q2", path: "M-6.6 -24L-6.6 -9.2", at: 900, dur: 400, ease: "in" }, { count: "count", from: 2, to: 2, at: 1300, dur: 1 },
            { id: "q3", to: { o: 1 }, at: 1400, dur: 100 }, { id: "q3", path: "M-3.2 -24L-3.2 -9.2", at: 1400, dur: 400, ease: "in" }, { count: "count", from: 3, to: 3, at: 1800, dur: 1 },
            { id: "q4", to: { o: 1 }, at: 1900, dur: 100 }, { id: "q4", path: "M0.2 -24L0.2 -9.2", at: 1900, dur: 400, ease: "in" }, { count: "count", from: 4, to: 4, at: 2300, dur: 1 },
            { id: "q5", to: { o: 1 }, at: 2400, dur: 100 }, { id: "q5", path: "M3.6 -24L3.6 -9.2", at: 2400, dur: 400, ease: "in" }, { count: "count", from: 5, to: 5, at: 2800, dur: 1 },
            { id: "q6", to: { o: 1 }, at: 2900, dur: 100 }, { id: "q6", path: "M7 -24L7 -9.2", at: 2900, dur: 400, ease: "in" }, { count: "count", from: 6, to: 6, at: 3300, dur: 1 },
            { id: "q7", to: { o: 1 }, at: 3400, dur: 100 }, { id: "q7", path: "M10.2 -24L10.2 -9.2", at: 3400, dur: 400, ease: "in" }, { count: "count", from: 7, to: 7, at: 3800, dur: 1 },
            { id: "q8", to: { o: 1 }, at: 3900, dur: 100 }, { id: "q8", path: "M-8.4 -24L-8.4 -11.4", at: 3900, dur: 400, ease: "in" }, { count: "count", from: 8, to: 8, at: 4300, dur: 1 },
            { id: "q9", to: { o: 1 }, at: 4400, dur: 100 }, { id: "q9", path: "M-1.6 -24L-1.6 -11.4", at: 4400, dur: 400, ease: "in" }, { count: "count", from: 9, to: 9, at: 4800, dur: 1 },
            { id: "q10", to: { o: 1 }, at: 4900, dur: 100 }, { id: "q10", path: "M5.2 -24L5.2 -11.4", at: 4900, dur: 400, ease: "in" }, { count: "count", from: 10, to: 10, at: 5300, dur: 1 },
            { id: "boat2", to: { y: 72.5 }, at: 400, dur: 5000 },
            { emit: "spark", where: [96, 56], spread: [20, 8], n: 8, at: 5400, dur: 1200 }
          ] }
        ],
        question: "قایق اول چرا غرق شد؟",
        options: ["لبه‌هایش کوتاه بود و آب تویش رفت", "رنگش قشنگ نبود"], answer: "لبه‌هایش کوتاه بود و آب تویش رفت" },
      { type: "order", prompt: "کار سازنده را به ترتیب بچین", say: "اول نقشه می‌کشیم، بعد می‌سازیم، بعد امتحان می‌کنیم و آخر بهترش می‌کنیم.", numbered: true,
        items: [{ pic: "📝", say: "نقشه می‌کشیم" }, { pic: "✋", say: "می‌سازیم" }, { pic: "💧", say: "امتحان می‌کنیم" }, { pic: "✨", say: "بهترش می‌کنیم" }] },
      { type: "choose", prompt: "قایقت غرق شد. حالا چه کنی؟", say: "قایقت غرق شد. حالا چه کار می‌کنی؟",
        options: ["فکر می‌کنم چرا، و بهترش می‌کنم", "دیگر نمی‌سازم"], answer: "فکر می‌کنم چرا، و بهترش می‌کنم" },
      { type: "choose", prompt: "سازنده‌ها اول چه کار می‌کنند؟", say: "پیش از ساختن قایق، اول چه کار کردیم؟",
        options: ["نقشه کشیدیم", "قایق را غرق کردیم"], answer: "نقشه کشیدیم" },
      { type: "home", pic: "⛵ 🪨", text: "مسابقه قایق فویلی: قایق تو چند سنگ‌ریزه می‌برد؟",
        need: ["چند تکه فویل آلومینیومی هم‌اندازه", "یک تشت آب", "سنگ‌ریزه، دکمه یا سکه کوچک"],
        steps: [
          "اول کودک نقشه قایقش را روی کاغذ بکشد.",
          "با فویل قایق بسازید و روی آب بگذارید.",
          "سنگ‌ریزه‌ها را یکی یکی در قایق بگذارید و بشمارید تا غرق شود.",
          "فکر کنید چطور بهترش کنید: کف پهن‌تر؟ لبه بلندتر؟ قایق تازه بسازید و دوباره بشمارید.",
          "کودک را کنار تشت آب تنها نگذارید."
        ],
        ask: "قایق بهتر چند سنگ‌ریزه برد؟ چه چیزی را عوض کردی؟" }
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
    id: "science-sprout-24", subject: "science", level: "sprout", emoji: "🧣", title: "دنیای سرد و گرم",
    steps: [
      { type: "scene", prompt: "گرما کجا می‌رود؟", bg: "#f6efdc",
        /* A glass of fresh tea is hot; left on the table while the clock's hand goes round, it cools (the wisps
           stop). Tea kept in a thermos is still hot hours later: it is poured into a glass and the wisps rise.
           In winter, a coat, a woollen scarf and gloves keep Reza warm in the snow. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          tea: { art: "sci-tea", at: [40, 72], s: 1.4 },
          w1: { art: "sci-steam", at: [37, 52], o: 0 }, w2: { art: "sci-steam", at: [43, 50], o: 0 },
          clock: { art: "sci-clock", at: [80, 26], s: 1.4, o: 0 },
          thermos: { art: "sci-thermos", at: [104, 72], s: 1.4 },
          tea2: { art: "sci-tea", at: [134, 72], s: 1.2, o: 0 },
          w3: { art: "sci-steam", at: [132, 54], o: 0 }, w4: { art: "sci-steam", at: [137, 52], o: 0 },
          sky: { art: "sci-grey-sky", o: 0 }, ground: { art: "sci-ground", o: 0 }, snowG: { art: "sci-snow-ground", o: 0 }, snow: { art: "sci-snowfall", o: 0 },
          boy: { art: "sci-kid-boy", at: [80, 86], s: 1.4, o: 0 },
          coat: { art: "sci-coat", at: [80, 86], s: 1.4, o: 0 }, scarf: { art: "sci-scarf", at: [80, 86], s: 1.4, o: 0 }, gloves: { art: "sci-gloves", at: [80, 86], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "این چای تازه است. خیلی داغ است.", key: 2400, do: [
            { id: "w1", to: { o: 1 }, dur: 400 }, { id: "w1", to: { y: 40 }, dur: 4000, ease: "linear" },
            { id: "w2", to: { o: 1 }, at: 600, dur: 400 }, { id: "w2", to: { y: 38 }, at: 600, dur: 4000, ease: "linear" }
          ] },
          { caption: "چای را روی میز گذاشتیم. وقت گذشت و چای کم‌کم خنک شد.", key: 4200, hold: 6000, do: [
            { id: "clock", to: { o: 1 }, dur: 400 }, { id: "clock.hand", to: { r: 720 }, at: 400, dur: 4400, ease: "linear" },
            { id: "w1", to: { o: 0 }, dur: 2400 }, { id: "w2", to: { o: 0 }, at: 600, dur: 2600 }
          ] },
          { caption: "چای داغی که در فلاسک ریخته بودیم، چند ساعت بعد هنوز داغ است!", key: 4600, hold: 6400, do: [
            { id: "clock", to: { o: 0 }, dur: 400 },
            { id: "tea2", to: { o: 1 }, dur: 400 },
            { id: "thermos", path: "M104 72Q100 50 98 40.5", at: 500, dur: 900 }, { id: "thermos", to: { r: 110 }, at: 1400, dur: 700 },
            { emit: "drop", where: [132, 46], spread: [1, 1], rise: -6, n: 8, at: 2100, dur: 1200, life: 500 },
            { id: "thermos", to: { r: 0 }, at: 3400, dur: 600 }, { id: "thermos", path: "M98 40.5Q100 50 104 72", at: 4000, dur: 800 },
            { id: "w3", to: { o: 1 }, at: 3200, dur: 400 }, { id: "w3", to: { y: 42 }, at: 3200, dur: 3600, ease: "linear" },
            { id: "w4", to: { o: 1 }, at: 3700, dur: 400 }, { id: "w4", to: { y: 40 }, at: 3700, dur: 3600, ease: "linear" }
          ] },
          { caption: "زمستان است. رضا سردش است. کاپشن، شال‌گردن پشمی و دستکش گرمای بدنش را نگه می‌دارند.", key: 6800, hold: 8000, do: [
            { id: "w3", to: { o: 0 }, dur: 400 }, { id: "w4", to: { o: 0 }, dur: 400 },
            { id: "sky", to: { o: 1 }, dur: 800 }, { id: "ground", to: { o: 1 }, dur: 800 }, { id: "snowG", to: { o: 1 }, dur: 800 },
            { id: "snow", to: { o: 1 }, at: 600, dur: 600 }, { id: "snow", to: { y: "+20" }, at: 600, dur: 7200, times: 5, ease: "linear" },
            { id: "boy", to: { o: 1 }, at: 800, dur: 500 }, { id: "boy", to: { x: "+0.8" }, at: 1400, dur: 1600, yoyo: true, times: 10 },
            { id: "coat", to: { o: 1 }, at: 3200, dur: 600 }, { id: "scarf", to: { o: 1 }, at: 4000, dur: 600 }, { id: "gloves", to: { o: 1 }, at: 4800, dur: 600 },
            { id: "boy", to: { y: "-3" }, at: 6000, dur: 600, yoyo: true, times: 2 }
          ] }
        ],
        question: "چای داغی که روی میز بماند چه می‌شود؟",
        options: ["کم‌کم خنک می‌شود", "داغ‌تر می‌شود"], answer: "کم‌کم خنک می‌شود" },
      { type: "sort", prompt: "داغ یا سرد؟", say: "کدام داغ است و کدام سرد؟",
        baskets: [{ label: "داغ", pic: "☕", value: "hot" }, { label: "سرد", pic: "🧊", value: "cold" }],
        items: [
          { pic: "🍲", say: "آش داغ", basket: "hot" },
          { pic: "🫖", say: "قوری چای", basket: "hot" },
          { pic: "☀️", say: "سنگ زیر آفتاب تابستان", basket: "hot" },
          { pic: "❄️", say: "برف", basket: "cold" },
          { pic: "🍦", say: "بستنی", basket: "cold" },
          { pic: "🧊", say: "یخ", basket: "cold" }
        ] },
      { type: "sort", prompt: "کدام ما را گرم نگه می‌دارد؟", say: "در زمستان کدام‌ها ما را گرم نگه می‌دارند؟",
        baskets: [{ label: "گرم نگه می‌دارد", pic: "🧣", value: "warm" }, { label: "برای تابستان", pic: "☀️", value: "summer" }],
        items: [
          { pic: "🧥", say: "کاپشن", basket: "warm" },
          { pic: "🧤", say: "دستکش پشمی", basket: "warm" },
          { pic: "🧣", say: "شال‌گردن", basket: "warm" },
          { pic: "🩳", say: "شلوارک", basket: "summer" },
          { pic: "🩴", say: "دمپایی", basket: "summer" },
          { pic: "👒", say: "کلاه آفتابی", basket: "summer" }
        ] },
      { type: "choose", prompt: "می‌خواهیم چای تا عصر گرم بماند. کجا بریزیم؟", say: "می‌خواهیم چای تا عصر گرم بماند. کجا بریزیمش؟",
        options: ["در فلاسک", "در لیوان روی میز"], answer: "در فلاسک" },
      { type: "home", pic: "🥛 🧣", text: "کدام لیوان دیرتر سرد می‌شود؟",
        need: ["دو لیوان هم‌اندازه", "آب گرم (نه داغ؛ بزرگ‌تر آماده کند)", "یک شال‌گردن یا جوراب پشمی"],
        steps: [
          "بزرگ‌تر در دو لیوان آب گرم بریزد. دور یکی شال‌گردن پشمی بپیچید و دیگری را همین‌طور بگذارید.",
          "کودک حدس بزند کدام دیرتر سرد می‌شود.",
          "بیست دقیقه بعد با انگشت آب هر دو را امتحان کنید. کدام گرم‌تر مانده؟",
          "بگویید: «پشم گرما را نگه می‌دارد؛ برای همین در زمستان لباس پشمی می‌پوشیم.»"
        ],
        ask: "چرا آب لیوانی که شال پیچیده بودیم گرم‌تر ماند؟" }
    ]
  },
  {
    id: "science-sprout-25", subject: "science", level: "sprout", emoji: "🥛", title: "جامد و مایع",
    steps: [
      { type: "scene", prompt: "جامد یا مایع؟", bg: "#f6efdc",
        /* A block goes into a bowl and out again and keeps its shape; the water in a tall glass is poured into a
           wide bowl and takes the bowl's shape; sand pours like water into a heap, but close up each grain is a
           tiny solid. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          bowl1: { art: "sci-wbowl", at: [44, 72], s: 1.2 },
          block: { art: "sci-block-r", at: [14, 72], s: 1.4 },
          bowl2: { art: "sci-wbowl", at: [128, 72], s: 1.4 },
          glass: { art: "sci-tumbler", at: [100, 72], s: 1.2 },
          heap: { art: "sci-sandheap", at: [73, 72], s: 1.3, sy: 0 }, stream: { art: "sci-sandstream", at: [73, 47], sy: 1.2, o: 0 },
          sandg: { art: "sci-sandglass", at: [62, 72], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "این مکعب جامد است. هر جا بگذاریمش، شکلش عوض نمی‌شود.", key: 2000, hold: 5600, do: [
            { id: "block", path: "M14 72Q30 50 44 69", at: 400, dur: 1200 },
            { id: "block", path: "M44 69Q30 50 14 72", at: 2600, dur: 1200 }
          ] },
          { caption: "آب مایع است. در لیوان، شکل لیوان را گرفته.", key: 2400, do: [
            { cam: { x: 100, y: 60, zoom: 2.4 }, dur: 1000 },
            { id: "glass.water", to: { sx: 0.98 }, at: 1200, dur: 600, yoyo: true, times: 4 }
          ] },
          { caption: "آب را در کاسه ریختیم. حالا شکل کاسه را گرفته!", key: 4250, hold: 6600, do: [
            { cam: { x: 112, y: 54, zoom: 1.6 }, dur: 900 },
            { id: "bowl2.water", to: { sy: 0 }, dur: 1 },
            { id: "glass", path: "M100 72Q100 50 106 42", at: 600, dur: 900 }, { id: "glass", to: { r: 100 }, at: 1500, dur: 700 },
            { emit: "drop", where: [126, 52], spread: [1, 2], rise: -8, n: 16, at: 2000, dur: 2000, life: 500 },
            { id: "glass.water", to: { sy: 0 }, at: 2000, dur: 2000 }, { id: "bowl2.water", to: { sy: 1 }, at: 2200, dur: 2000 },
            { id: "glass", to: { r: 0 }, at: 4300, dur: 500 }, { id: "glass", path: "M106 42Q100 50 100 72", at: 4800, dur: 800 }
          ] },
          { caption: "شن هم مثل آب ریخته می‌شود.", key: 3600, hold: 5600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "sandg", to: { o: 1 }, at: 400, dur: 400 }, { id: "sandg", path: "M62 72Q54 56 55 46", at: 800, dur: 900 }, { id: "sandg", to: { r: 100 }, at: 1700, dur: 600 },
            { id: "stream", to: { o: 1 }, at: 2200, dur: 200 }, { id: "heap", to: { sy: 1 }, at: 2300, dur: 2600 },
            { id: "stream", to: { o: 0 }, at: 4800, dur: 300 }
          ] },
          { caption: "ولی اگر از نزدیک نگاه کنیم، هر دانه شن کوچک و جامد است.", key: 2200, do: [
            { cam: { x: 73, y: 68, zoom: 4 }, dur: 1600 }
          ] }
        ],
        question: "آب در کاسه چه شکلی پیدا کرد؟",
        options: ["شکل کاسه", "شکل مکعب", "شکل لیوان"], answer: "شکل کاسه" },
      { type: "sort", prompt: "جامد یا مایع؟", say: "جامدها شکلشان را نگه می‌دارند. مایع‌ها ریخته می‌شوند. هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "جامد", pic: "🧱", value: "solid" }, { label: "مایع", pic: "💧", value: "liquid" }],
        items: [
          { pic: "🪨", say: "سنگ", basket: "solid" },
          { pic: "🧊", say: "یخ", basket: "solid" },
          { pic: "🥄", say: "قاشق", basket: "solid" },
          { pic: "🥛", say: "شیر", basket: "liquid" },
          { pic: "🍯", say: "عسل", basket: "liquid" },
          { pic: "🧃", say: "آبمیوه", basket: "liquid" }
        ] },
      { type: "choose", prompt: "شیر را در لیوان بلند بریزیم، چه شکلی می‌شود؟", say: "اگر شیر را در یک لیوان بلند بریزیم، شیر چه شکلی پیدا می‌کند؟",
        options: ["شکل لیوان", "شکل گلوله"], answer: "شکل لیوان" },
      { type: "choose", prompt: "یخ جامد است. اگر آب شود، چه می‌شود؟", say: "یخ جامد است. اگر آب شود، جامد است یا مایع؟",
        options: ["مایع", "جامد"], answer: "مایع" },
      { type: "home", pic: "💧 🍚", text: "با آب و برنج بازی کن: کدام شکلش عوض می‌شود؟",
        need: ["چند ظرف با شکل‌های مختلف: لیوان، کاسه، بطری", "آب", "یک کاسه برنج یا عدس", "یک قاشق"],
        steps: [
          "آب را از لیوان در کاسه و از کاسه در بطری بریزید. هر بار بپرسید: «آب چه شکلی شد؟»",
          "یک قاشق را در ظرف‌های مختلف بگذارید: شکلش عوض شد؟",
          "برنج را هم از ظرفی به ظرف دیگر بریزید. ریخته می‌شود مثل آب! حالا یک دانه برنج را بردارید و نگاه کنید: سفت و جامد است.",
          "کار را در سینی یا حمام انجام دهید که اگر ریخت اشکالی نداشته باشد."
        ],
        ask: "برنج جامد است یا مایع؟ چرا مثل آب ریخته می‌شود؟" }
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
    id: "science-sprout-17", subject: "science", level: "sprout", emoji: "🌊", title: "زمین، خانه پرآب ما",
    steps: [
      { type: "scene", prompt: "آب کجاهاست؟", bg: "#cdeaf7",
        /* Where water is: a spring wells up on the mountain; the river runs down to the sea; the sea is salty and
           the spring and river water fresh; in dry lands a qanat brings water from under the mountain to a village
           through a tunnel; and water comes from a dam lake through a pipe to our house and out of the tap.
           Drawings: js/art/rig-science.js. */
        parts: {
          land: { art: "sci-wc-land" }, river: { art: "sci-river", o: 0 },
          salt: { art: "🧂", at: [130, 84], s: 0.5, o: 0 }, fresh: { art: "💧", at: [56, 66], s: 0.45, o: 0 },
          qanat: { art: "sci-qanat", o: 0 },
          pipes: { art: "sci-pipes", o: 0 }
        },
        scenes: [
          { caption: "از دل کوه، آب چشمه بیرون می‌آید.", key: 2400, do: [
            { cam: { x: 40, y: 48, zoom: 2.4 }, dur: 1200 },
            { emit: "drop", where: [40, 45], spread: [2, 1], rise: 3, n: 12, at: 1000, dur: 3000, life: 700 }
          ] },
          { caption: "آب چشمه‌ها رود می‌شود. رود پایین می‌آید و به دریا می‌رسد.", key: 4400, hold: 6000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 1000 },
            { id: "river", to: { o: 1 }, at: 800, dur: 100 }, { id: "river", draw: true, at: 800, dur: 3600, ease: "in" }
          ] },
          { caption: "آب دریا شور است. آب چشمه و رود شیرین است.", key: 2400, hold: 5600, do: [
            { id: "salt", to: { o: 1 }, dur: 400 }, { id: "salt", to: { s: 0.6 }, at: 400, dur: 600, yoyo: true, times: 2 },
            { id: "fresh", to: { o: 1 }, at: 1600, dur: 400 }, { id: "fresh", to: { s: 0.55 }, at: 2000, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "در جاهای خشک، مردم قنات ساخته‌اند. آب از زیر کوه، در یک تونل آرام به روستا می‌رسد.", key: 5000, hold: 7400, do: [
            { id: "qanat", to: { o: 1 }, dur: 900 },
            { id: "qanat.flow", to: { o: 0 }, dur: 1 }, { id: "qanat.flow", to: { o: 1 }, at: 1000, dur: 100 }, { id: "qanat.flow", draw: true, at: 1000, dur: 4200, ease: "linear" }
          ] },
          { caption: "آب از دریاچه پشت سد، در لوله‌ها به خانه ما می‌آید و از شیر بیرون می‌ریزد.", key: 4600, hold: 7000, do: [
            { id: "pipes", to: { o: 1 }, dur: 900 },
            { id: "pipes.flow", to: { o: 0 }, dur: 1 }, { id: "pipes.flow", to: { o: 1 }, at: 1000, dur: 100 }, { id: "pipes.flow", draw: true, at: 1000, dur: 3000, ease: "linear" },
            { emit: "drop", where: [127, 51], spread: [1, 1], rise: -4, n: 10, at: 4000, dur: 2400, life: 600 }
          ] }
        ],
        question: "آب کدام شور است؟", pic: true,
        options: [{ label: "🌊", value: "دریا" }, { label: "🏞️", value: "رود" }, { label: "⛲", value: "چشمه" }], answer: "دریا" },
      { type: "sort", prompt: "آب شور یا آب شیرین؟", say: "آب کدام‌ها شور است و آب کدام‌ها شیرین؟",
        baskets: [{ label: "شور", pic: "🧂", value: "salty" }, { label: "شیرین", pic: "💧", value: "fresh" }],
        items: [
          { pic: "🌊", say: "دریای خزر", basket: "salty" },
          { pic: "🐬", say: "خلیج فارس", basket: "salty" },
          { pic: "🏞️", say: "رود کارون", basket: "fresh" },
          { pic: "⛲", say: "چشمه", basket: "fresh" },
          { pic: "🚰", say: "آب شیر خانه", basket: "fresh" }
        ] },
      { type: "choose", prompt: "قنات آب را از کجا به روستا می‌آورد؟", say: "قنات آب را از کجا به روستا می‌آورد؟",
        options: ["از زیر زمین", "از ابرها", "از دریا"], answer: "از زیر زمین" },
      { type: "choose", prompt: "آب شیر خانه از کجا می‌آید؟", say: "آبی که از شیر خانه بیرون می‌آید، از کجا آمده؟",
        options: ["از سد یا چاه، در لوله‌ها", "از توی دیوار درست می‌شود"], answer: "از سد یا چاه، در لوله‌ها" },
      { type: "home", pic: "🧂 💧", text: "آب شور و آب شیرین را بچش و ببین.",
        need: ["دو لیوان آب آشامیدنی", "یک قاشق نمک", "یک بشقاب سیاه یا تیره"],
        steps: [
          "در یکی از لیوان‌ها کمی نمک حل کنید: این مثل آب دریا شور است.",
          "کودک با نوک انگشت از هر کدام یک قطره بچشد. کدام شور است؟ آب شور را ننوشید.",
          "چند قاشق آب شور را در بشقاب تیره بریزید و در آفتاب بگذارید. فردا ببینید چه مانده: نمک!",
          "از بزرگ‌ترها بپرسید آب شهر یا روستای شما از کجا می‌آید: سد، رود، چاه یا قنات؟"
        ],
        ask: "وقتی آب بشقاب خشک شد، چه چیزی ماند؟" }
    ]
  },
  {
    id: "science-sprout-19", subject: "science", level: "sprout", emoji: "🎈", title: "هوا همه جا هست",
    steps: [
      { type: "scene", prompt: "هوا را نمی‌بینیم، ولی همه جا هست!", bg: "#f6efdc",
        /* Air we cannot see: Sara blows into a balloon and it grows; a bag swept through the air and closed is
           puffed up; a glass with a tissue in its bottom goes upside down into the water, the water stays out, and
           the tissue comes out dry; last, Sara blows and a feather flies off the table. Her hand is at her mouth
           (armF -135). Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          girl: { art: "👧", at: [30, 90], s: 1.6 },
          balloon: { art: "sci-balloon", at: [44, 59], s: 0.25, r: 90 },
          bag: { art: "sci-bag", at: [96, 70], s: 1.6, o: 0 },
          basin: { art: "sci-basin", at: [112, 88], s: 1.2, o: 0 }, glass: { art: "sci-glassdown", at: [112, 40], s: 1.2, o: 0 }, water: { art: "sci-basin-water", at: [112, 88], s: 1.2, o: 0 }, pocket: { art: "sci-airpocket", at: [112, 84], s: 1.2, o: 0 },
          feather: { art: "sci-feather", at: [58, 69], s: 0.8, o: 0 },
          puff: { art: "sci-wind", at: [48, 60], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "سارا در بادکنک فوت می‌کند. هوا بادکنک را پر می‌کند.", key: 3800, hold: 5600, do: [
            { id: "girl.armF", to: { r: -135 }, dur: 500 },
            { id: "balloon", to: { s: 0.6 }, at: 800, dur: 900 }, { id: "girl", to: { sy: 1.02 }, at: 800, dur: 900, yoyo: true, times: 2 },
            { id: "balloon", to: { s: 1 }, at: 2000, dur: 900 }, { id: "girl", to: { sy: 1.02 }, at: 2000, dur: 900, yoyo: true, times: 2 },
            { id: "balloon", to: { s: 1.4 }, at: 3200, dur: 900 }
          ] },
          { caption: "کیسه را در هوا چرخاندیم و سرش را بستیم. کیسه پر از هوا شد!", key: 3600, hold: 5400, do: [
            { id: "balloon", to: { o: 0 }, dur: 400 }, { id: "girl.armF", to: { r: 0 }, dur: 500 },
            { id: "bag", to: { o: 1 }, at: 400, dur: 400 },
            { id: "bag", path: "M96 70Q112 30 128 60T96 70", at: 900, dur: 1600 },
            { id: "bag.flat", to: { o: 0 }, at: 2200, dur: 500 }, { id: "bag.full", to: { o: 1 }, at: 2200, dur: 500 },
            { id: "bag", to: { s: 1.7 }, at: 2800, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "یک دستمال ته لیوان گذاشتیم و لیوان را برعکس در آب فرو کردیم.", key: 3700, hold: 5400, do: [
            { id: "bag", to: { o: 0 }, dur: 400 },
            { id: "basin", to: { o: 1 }, at: 300, dur: 500 }, { id: "water", to: { o: 1 }, at: 300, dur: 500 }, { id: "glass", to: { o: 1 }, at: 500, dur: 500 },
            { cam: { x: 112, y: 64, zoom: 2 }, at: 600, dur: 1000 },
            { id: "glass", path: "M112 40L112 84", at: 1400, dur: 1800, ease: "inout" }, { id: "pocket", to: { o: 1 }, at: 3000, dur: 300 }
          ] },
          { caption: "لیوان را بیرون آوردیم. دستمال خشک ماند! هوای توی لیوان نگذاشت آب بالا برود.", key: 2400, hold: 6000, do: [
            { id: "pocket", to: { o: 0 }, dur: 200 }, { cam: { x: 112, y: 46, zoom: 1.5 }, dur: 1200 },
            { id: "glass", path: "M112 84L112 40", dur: 1600, ease: "inout" },
            { emit: "spark", where: [112, 22], spread: [8, 4], n: 6, at: 1600, dur: 1200 }
          ] },
          { caption: "هوا چیزها را تکان می‌دهد. سارا فوت می‌کند و پَر پرواز می‌کند!", key: 2200, hold: 5000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 }, { id: "glass", to: { o: 0 }, dur: 500 }, { id: "basin", to: { o: 0 }, dur: 500 }, { id: "water", to: { o: 0 }, dur: 500 },
            { id: "feather", to: { o: 1 }, at: 300, dur: 400 },
            { id: "puff", to: { o: 1 }, at: 1000, dur: 100 }, { id: "puff", draw: true, at: 1000, dur: 800 }, { id: "puff", to: { o: 0 }, at: 2200, dur: 400 },
            { id: "feather", path: "M58 69Q76 40 98 54T130 50", at: 1300, dur: 3000 }, { id: "feather", to: { r: 220 }, at: 1300, dur: 3000 }
          ] }
        ],
        question: "توی بادکنک چه چیزی هست؟",
        options: ["هوا", "آب", "هیچ چیز"], answer: "هوا" },
      { type: "choose", prompt: "باد چیست؟", say: "باد چیست؟",
        options: ["هوایی که حرکت می‌کند", "آبی که حرکت می‌کند"], answer: "هوایی که حرکت می‌کند" },
      { type: "choose", prompt: "یک بطری خالی داریم. داخلش چیست؟", say: "یک بطری خالی روی میز است. داخلش واقعاً خالی است؟",
        options: ["پر از هواست", "هیچ چیز نیست"], answer: "پر از هواست" },
      { type: "choose", prompt: "کدام را هوا پر کرده؟", say: "کدام را هوا پر کرده است؟", pic: true,
        options: [{ label: "🎈", value: "بادکنک" }, { label: "🧱", value: "آجر" }, { label: "🍎", value: "سیب" }], answer: "بادکنک" },
      { type: "home", pic: "🥛 💧", text: "آزمایش دستمال خشک را خودت انجام بده!",
        need: ["یک لیوان شفاف", "یک دستمال کاغذی", "یک کاسه یا تشت آب", "یک بادکنک"],
        steps: [
          "دستمال را مچاله کنید و ته لیوان فشار دهید تا نیفتد.",
          "پیش از شروع بپرسید: «اگر لیوان را برعکس در آب فرو کنیم، دستمال خیس می‌شود؟»",
          "لیوان را صاف و برعکس در آب فرو کنید، کج نکنید. بعد صاف بیرون بیاورید و دستمال را لمس کنید.",
          "حالا لیوان را کج کنید: حباب‌های هوا بیرون می‌آیند و آب بالا می‌رود.",
          "یک بادکنک باد کنید و هوایش را روی صورت کودک خالی کنید: هوا را حس کرد؟"
        ],
        ask: "چرا دستمال خیس نشد؟" }
    ]
  },
  {
    id: "science-sprout-20", subject: "science", level: "sprout", emoji: "🌬️", title: "باد",
    steps: [
      { type: "scene", prompt: "باد چه کار می‌کند؟", bg: "#cdeaf7",
        /* Wind is moving air, seen by what it moves: the pinwheel spins, the tree's leaves sway, the wet washing
           flaps and dries, and the dandelion's seeds fly away to grow somewhere new. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, tree: { art: "sci-tree", at: [26, 84], s: 0.8 },
          line: { art: "sci-clothesline", at: [80, 84] }, shirt: { art: "sci-shirt-line", at: [80, 80], s: 1 },
          pin: { art: "sci-pinwheel", at: [128, 86], s: 1.1 },
          dand: { art: "sci-dandelion", at: [150, 86], s: 1 },
          d1: { art: "sci-dseed", at: [150, 65], s: 1.4 }, d2: { art: "sci-dseed", at: [148, 66], s: 1.4 }, d3: { art: "sci-dseed", at: [152, 64], s: 1.4 },
          w1: { art: "sci-wind", at: [-30, 40], s: 1.4, o: 0 }, w2: { art: "sci-wind", at: [-30, 60], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "باد هواست که حرکت می‌کند. هوا را نمی‌بینیم، ولی کارهایش را می‌بینیم.", key: 2400, do: [
            { id: "w1", to: { o: 1 }, dur: 100 }, { id: "w1", draw: true, dur: 1200 }, { id: "w1", path: "M-30 40L40 40", dur: 3600, ease: "linear" }, { id: "w1", to: { o: 0 }, at: 3200, dur: 400 },
            { id: "tree", to: { r: 3 }, at: 600, dur: 1000, yoyo: true, times: 4 }
          ] },
          { caption: "باد فرفره را می‌چرخاند.", key: 2000, do: [
            { id: "w2", to: { o: 1 }, dur: 100 }, { id: "w2", path: "M-30 60L100 60", dur: 3000, ease: "linear" }, { id: "w2", to: { o: 0 }, at: 2800, dur: 300 },
            { id: "pin.blades", to: { r: 1440 }, at: 600, dur: 3600, ease: "inout" }
          ] },
          { caption: "باد لباس خیس را تکان می‌دهد و خشکش می‌کند.", key: 4600, hold: 6000, do: [
            { id: "shirt", to: { r: -10 }, dur: 900, yoyo: true, times: 6 },
            { id: "shirt.wet", to: { o: 0 }, at: 600, dur: 5000 },
            { emit: "drop", where: [80, 80], spread: [10, 1], rise: -4, n: 6, at: 300, dur: 1800, life: 600 }
          ] },
          { caption: "باد دانه‌های قاصدک را با خودش می‌برد. هر دانه جای دیگری سبز می‌شود.", key: 3000, hold: 6000, do: [
            { id: "d1", path: "M150 65Q120 30 80 26", at: 300, dur: 3600 },
            { id: "d2", path: "M148 66Q110 48 60 40", at: 700, dur: 3800 },
            { id: "d3", path: "M152 64Q130 20 100 12", at: 1100, dur: 3600 },
            { id: "dand", to: { r: -6 }, at: 300, dur: 1000, yoyo: true, times: 4 }, { id: "dand.head", to: { o: 0.25 }, at: 400, dur: 2400 }
          ] }
        ],
        question: "باد چیست؟",
        options: ["هوایی که حرکت می‌کند", "دودی که بالا می‌رود"], answer: "هوایی که حرکت می‌کند" },
      { type: "sort", prompt: "باد می‌تواند تکانش بدهد؟", say: "باد کدام‌ها را تکان می‌دهد و کدام‌ها را نمی‌تواند تکان بدهد؟",
        baskets: [{ label: "تکانش می‌دهد", pic: "🌬️", value: "yes" }, { label: "نمی‌تواند", pic: "🪨", value: "no" }],
        items: [
          { pic: "🪁", say: "بادبادک", basket: "yes" },
          { pic: "🍂", say: "برگ خشک", basket: "yes" },
          { pic: "⛵", say: "قایق بادبانی", basket: "yes" },
          { pic: "🏠", say: "خانه", basket: "no" },
          { pic: "🪨", say: "سنگ بزرگ", basket: "no" },
          { pic: "🧱", say: "دیوار آجری", basket: "no" }
        ] },
      { type: "choose", prompt: "روز بادی است. کدام بازی خوب است؟", say: "امروز باد می‌آید. کدام بازی برای روز بادی خوب است؟", pic: true,
        options: [{ label: "🪁", value: "بادبادک‌بازی" }, { label: "🧩", value: "پازل" }], answer: "بادبادک‌بازی" },
      { type: "choose", prompt: "باد با لباس خیس روی بند چه می‌کند؟", say: "باد با لباس خیسی که روی بند است چه می‌کند؟",
        options: ["خشکش می‌کند", "خیس‌ترش می‌کند"], answer: "خشکش می‌کند" },
      { type: "home", pic: "🌀 🌬️", text: "یک فرفره بساز و با باد امتحانش کن!",
        need: ["یک کاغذ مربعی", "یک مداد با پاک‌کن ته آن", "یک سنجاق (فقط بزرگ‌تر دست بزند)", "قیچی (فقط بزرگ‌تر)"],
        steps: [
          "بزرگ‌تر چهار گوشه کاغذ را تا نزدیک وسط ببُرد.",
          "کودک یک در میان، گوشه‌ها را به وسط بیاورد و بزرگ‌تر آن‌ها را با سنجاق به پاک‌کن مداد وصل کند.",
          "فرفره را بیرون یا جلوی پنجره ببرید. کجا تندتر می‌چرخد؟",
          "فوت کنید: آرام و محکم. فرفره چه فرقی کرد؟"
        ],
        ask: "باد را دیدی؟ از کجا فهمیدی باد می‌آید؟" }
    ]
  },
  {
    id: "science-sprout-21", subject: "science", level: "sprout", emoji: "🪨", title: "زمین، خانه سنگی ما",
    steps: [
      { type: "scene", prompt: "سنگ‌ها را از نزدیک ببینیم", bg: "#f6efdc",
        /* Rocks of many colours and sizes appear on the table one by one; a hard grey rock rubbed on a soft pale
           one leaves a scratch; stones make an old bridge; and a piece of turquoise from Neyshabur becomes the stone
           of a ring. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          r1: { art: "sci-rockc", at: [24, 72], s: 2.2, o: 0, look: { fill: "#a8a29a" } },
          r2: { art: "sci-rockc", at: [50, 72], s: 1.2, o: 0, look: { fill: "#c4673a", spots: "#8a3a22" } },
          r3: { art: "sci-rockc", at: [72, 72], s: 1.7, o: 0, look: { fill: "#f4f0e6", spots: "#cfc6b0" } },
          r4: { art: "sci-rockc", at: [96, 72], s: 0.8, o: 0, look: { fill: "#3d3d3d" } },
          r5: { art: "sci-rockc", at: [118, 72], s: 1.4, o: 0, look: { fill: "#e7c27a", spots: "#b08a4a" } },
          hard: { art: "sci-rockc", at: [72, 40], s: 1.2, o: 0, look: { fill: "#6b6b6b" } },
          bridge: { art: "sci-stonebridge", o: 0 },
          turq: { art: "sci-turquoise", at: [140, 64], s: 1.6, o: 0 }, ring: { art: "sci-ring-turq", at: [140, 64], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "سنگ‌ها رنگ‌ها و اندازه‌های گوناگون دارند: بزرگ و کوچک، سفید و قرمز و سیاه.", key: 3400, hold: 6000, do: [
            { id: "r1", to: { o: 1 }, at: 200, dur: 400 }, { id: "r2", to: { o: 1 }, at: 800, dur: 400 }, { id: "r3", to: { o: 1 }, at: 1400, dur: 400 },
            { id: "r4", to: { o: 1 }, at: 2000, dur: 400 }, { id: "r5", to: { o: 1 }, at: 2600, dur: 400 }
          ] },
          { caption: "سنگ سخت را روی سنگ نرم می‌کشیم. روی سنگ نرم خط می‌افتد!", key: 2600, hold: 6000, do: [
            { cam: { x: 72, y: 60, zoom: 2.4 }, dur: 1000 },
            { id: "hard", to: { o: 1 }, at: 600, dur: 300 }, { id: "hard", path: "M72 40L66 64", at: 900, dur: 800 },
            { id: "hard", to: { x: 78 }, at: 1800, dur: 1200, ease: "linear" },
            { id: "r3.scratch", to: { o: 1 }, at: 1800, dur: 100 }, { id: "r3.scratch", draw: true, at: 1800, dur: 1200, ease: "linear" },
            { id: "hard", path: "M78 64L84 40", at: 3200, dur: 700 }
          ] },
          { caption: "از سنگ خانه و پل می‌سازند. این پل سنگی قدیمی است.", key: 1600, hold: 4400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 }, { id: "hard", to: { o: 0 }, dur: 400 },
            { id: "r1", to: { o: 0 }, dur: 500 }, { id: "r2", to: { o: 0 }, dur: 500 }, { id: "r3", to: { o: 0 }, dur: 500 }, { id: "r4", to: { o: 0 }, dur: 500 }, { id: "r5", to: { o: 0 }, dur: 500 },
            { id: "bridge", to: { o: 1 }, at: 400, dur: 900 }
          ] },
          { caption: "این فیروزه نیشابور است، سنگ آبی زیبایی که از آن جواهر می‌سازند.", key: 3400, hold: 6000, do: [
            { id: "bridge", to: { o: 0 }, dur: 700 },
            { id: "turq", to: { o: 1 }, at: 400, dur: 500 }, { cam: { x: 136, y: 60, zoom: 2.4 }, at: 600, dur: 1000 },
            { id: "turq", to: { r: 15 }, at: 1600, dur: 600, yoyo: true, times: 2 },
            { id: "ring", to: { o: 1 }, at: 2800, dur: 600 }, { id: "turq", to: { o: 0 }, at: 2800, dur: 600 },
            { emit: "spark", where: [140, 60], spread: [10, 6], n: 6, at: 3400, dur: 1000 }
          ] }
        ],
        question: "وقتی سنگ سخت را روی سنگ نرم کشیدیم، چه شد؟",
        options: ["روی سنگ نرم خط افتاد", "سنگ نرم آب شد"], answer: "روی سنگ نرم خط افتاد" },
      { type: "sort", prompt: "بزرگ یا کوچک؟", say: "سنگ‌های بزرگ یک طرف، سنگ‌های کوچک یک طرف.",
        baskets: [{ label: "بزرگ", pic: "⛰️", value: "big" }, { label: "کوچک", pic: "🪨", value: "small" }],
        items: [
          { pic: "⛰️", say: "تخته‌سنگ کوه", basket: "big" },
          { pic: "🏔️", say: "صخره بزرگ", basket: "big" },
          { pic: "🧱", say: "سنگ ساختمان", basket: "big" },
          { label: "سنگ‌ریزه", pic: "🪨", say: "سنگ‌ریزه", basket: "small" },
          { pic: "💍", say: "فیروزه انگشتر", basket: "small" },
          { label: "دانه شن", pic: "⚪", say: "دانه شن", basket: "small" }
        ] },
      { type: "sort", prompt: "از سنگ است یا نه؟", say: "کدام از سنگ ساخته شده و کدام نه؟",
        baskets: [{ label: "از سنگ", pic: "🪨", value: "stone" }, { label: "از سنگ نیست", pic: "🧸", value: "not" }],
        items: [
          { pic: "🌉", say: "پل سنگی", basket: "stone" },
          { pic: "💍", say: "نگین فیروزه", basket: "stone" },
          { pic: "🏔️", say: "کوه", basket: "stone" },
          { pic: "🧸", say: "عروسک", basket: "not" },
          { pic: "🍞", say: "نان", basket: "not" },
          { pic: "🌳", say: "درخت", basket: "not" }
        ] },
      { type: "choose", prompt: "کدام سنگ نرم‌تر است؟", say: "وقتی دو سنگ را به هم بکشیم، روی کدام خط می‌افتد؟",
        options: ["روی سنگ نرم‌تر", "روی سنگ سخت‌تر"], answer: "روی سنگ نرم‌تر" },
      { type: "home", pic: "🪨 🔍", text: "یک مجموعه سنگ جمع کن!",
        need: ["یک جعبه تخم‌مرغ یا کیسه", "یک سکه", "یک تکه کاشی یا سنگ‌فرش", "ذره‌بین، اگر دارید"],
        steps: [
          "در حیاط، پارک یا کنار رود چند سنگ کوچک جمع کنید.",
          "سنگ‌ها را بشویید و از نزدیک نگاه کنید: چه رنگی‌اند؟ لکه یا رگه دارند؟ زبرند یا صاف؟",
          "هر سنگ را روی کاشی یا سنگ‌فرش بکشید: کدام خط رنگی به جا می‌گذارد؟ با سکه هم امتحان کنید: روی کدام خط می‌افتد؟",
          "سنگ‌ها را از بزرگ به کوچک بچینید و در جعبه بگذارید."
        ],
        ask: "نرم‌ترین سنگت کدام بود؟ از کجا فهمیدی؟" }
    ]
  },
  {
    id: "science-sprout-22", subject: "science", level: "sprout", emoji: "🪱", title: "زمین، خانه خاکی ما",
    steps: [
      { type: "scene", prompt: "در خاک چه هست؟", bg: "#cdeaf7",
        /* The ground cut open: up close, soil has sand, little pebbles and bits of leaf and root; soil and water
           shaken in a jar are all brown, and after waiting they settle in layers; a worm moves through the soil,
           leaving a tunnel. Drawings: js/art/rig-science.js. */
        parts: {
          soil: { art: "sci-soil" }, bits: { art: "sci-soilbits" },
          worm: { art: "sci-worm", at: [20, 70], s: 1.4 },
          table: { art: "sci-table", o: 0 }, jar: { art: "sci-soiljar", at: [80, 72], s: 1.6, o: 0 },
          clock: { art: "sci-clock", at: [124, 30], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "خاک را از نزدیک نگاه می‌کنیم: دانه‌های شن، سنگ‌ریزه و تکه‌های برگ و ریشه در آن هست.", key: 2600, hold: 6000, do: [
            { cam: { x: 70, y: 72, zoom: 2.2 }, dur: 1400 },
            { cam: { x: 110, y: 72, zoom: 2.2 }, at: 2800, dur: 1600 }
          ] },
          { caption: "یک کرم خاکی در خاک راه می‌رود. کرم خاک را نرم می‌کند و برای گیاه خوب است.", key: 3400, hold: 6000, do: [
            { cam: { x: 70, y: 72, zoom: 2 }, dur: 900 },
            { id: "worm", path: "M20 70C40 66 50 80 70 76S100 64 120 72", at: 600, dur: 5000, ease: "linear" },
            { id: "worm", to: { sx: 0.85 }, at: 600, dur: 5000, yoyo: true, times: 12 }
          ] },
          { caption: "خاک و آب را در یک شیشه ریختیم و تکان دادیم. همه‌جا قهوه‌ای شد.", key: 2600, hold: 5000, do: [
            { id: "table", to: { o: 1 }, dur: 800 }, { id: "jar", to: { o: 1 }, at: 400, dur: 500 },
            { id: "jar", to: { r: 12 }, at: 1000, dur: 300, yoyo: true, times: 6 }
          ] },
          { caption: "صبر کردیم. خاک لایه‌لایه ته شیشه نشست: سنگ‌ریزه پایین، بعد شن، بعد خاک نرم، و تکه‌های برگ روی آب.", key: 4600, hold: 7400, do: [
            { id: "clock", to: { o: 1 }, dur: 400 }, { id: "clock.hand", to: { r: 720 }, at: 400, dur: 3000, ease: "linear" },
            { id: "jar.muddy", to: { o: 0 }, at: 800, dur: 3000 }, { id: "jar.layers", to: { o: 1 }, at: 800, dur: 3000 },
            { cam: { x: 80, y: 56, zoom: 2.2 }, at: 3600, dur: 1000 }
          ] }
        ],
        question: "در خاک چه چیزهایی هست؟",
        options: ["شن، سنگ‌ریزه و تکه‌های گیاه", "فقط آب", "آبنبات"], answer: "شن، سنگ‌ریزه و تکه‌های گیاه" },
      { type: "sort", prompt: "در خاک پیدا می‌شود؟", say: "کدام‌ها را در خاک باغچه پیدا می‌کنیم؟",
        baskets: [{ label: "در خاک هست", pic: "🟫", value: "yes" }, { label: "در خاک نیست", pic: "🚫", value: "no" }],
        items: [
          { pic: "🐜", say: "مورچه", basket: "yes" },
          { pic: "🍂", say: "برگ پوسیده", basket: "yes" },
          { pic: "🪨", say: "سنگ‌ریزه", basket: "yes" },
          { pic: "🐟", say: "ماهی", basket: "no" },
          { pic: "🍦", say: "بستنی", basket: "no" },
          { pic: "⭐", say: "ستاره", basket: "no" }
        ] },
      { type: "choose", prompt: "کرم خاکی برای خاک خوب است یا بد؟", say: "کرم خاکی در خاک تونل می‌زند. برای خاک خوب است یا بد؟",
        options: ["خوب است، خاک را نرم می‌کند", "بد است"], answer: "خوب است، خاک را نرم می‌کند" },
      { type: "choose", prompt: "در شیشه، کدام پایین‌تر از همه نشست؟", say: "وقتی خاک در شیشه آب نشست، کدام پایین‌تر از همه بود؟",
        options: ["سنگ‌ریزه", "تکه‌های برگ"], answer: "سنگ‌ریزه" },
      { type: "home", pic: "🫙 🟫", text: "آزمایش شیشه خاک: خاک لایه‌لایه می‌شود!",
        need: ["یک شیشه شفاف با در", "دو سه قاشق خاک باغچه", "آب"],
        steps: [
          "شیشه را تا نیمه از خاک پر کنید و بقیه‌اش را آب بریزید. درش را محکم ببندید.",
          "کودک شیشه را خوب تکان دهد. بپرسید: «فکر می‌کنی اگر صبر کنیم چه می‌شود؟»",
          "شیشه را یک روز کنار بگذارید و تکانش ندهید.",
          "فردا لایه‌ها را با هم ببینید: کدام لایه پایین است؟ چه چیزی روی آب شناور است؟ بعد از بازی با خاک دست‌ها را بشویید."
        ],
        ask: "چرا سنگ‌ریزه‌ها پایین نشستند؟" }
    ]
  },
  {
    id: "science-sprout-23", subject: "science", level: "sprout", emoji: "🌍", title: "بازی زمین",
    steps: [
      { type: "sort", prompt: "آب شور یا شیرین؟", say: "آب کدام شور است و آب کدام شیرین؟",
        baskets: [{ label: "شور", pic: "🧂", value: "salty" }, { label: "شیرین", pic: "💧", value: "fresh" }],
        items: [
          { pic: "🌊", say: "دریا", basket: "salty" },
          { pic: "🐳", say: "اقیانوس", basket: "salty" },
          { pic: "⛲", say: "چشمه", basket: "fresh" },
          { pic: "🏞️", say: "رود", basket: "fresh" },
          { pic: "🚰", say: "آب شیر", basket: "fresh" }
        ] },
      { type: "pairs", prompt: "هر کدام چه کار می‌کند؟", say: "جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "🎈", say: "بادکنک" }, { label: "پر از هوا", pic: "💨", say: "پر از هوا" }],
          [{ pic: "🌀", say: "فرفره" }, { pic: "🌬️", say: "باد" }],
          [{ label: "قنات", pic: "🏜️", say: "قنات" }, { label: "آب زیر زمین", pic: "💧", say: "آب زیر زمین" }],
          [{ pic: "💍", say: "نگین انگشتر" }, { label: "فیروزه", pic: "🪨", say: "فیروزه" }]
        ] },
      { type: "sort", prompt: "سنگ، خاک یا آب؟", say: "هر کدام را در سبد خودش بگذار: سنگ، خاک یا آب.",
        baskets: [{ label: "سنگ", pic: "🪨", value: "rock" }, { label: "خاک", pic: "🟫", value: "soil" }, { label: "آب", pic: "💧", value: "water" }],
        items: [
          { pic: "⛰️", say: "صخره", basket: "rock" },
          { pic: "💍", say: "فیروزه", basket: "rock" },
          { pic: "🪴", say: "خاک گلدان", basket: "soil" },
          { pic: "🌱", say: "خاک باغچه", basket: "soil" },
          { pic: "🌊", say: "دریا", basket: "water" },
          { pic: "🌧️", say: "باران", basket: "water" }
        ] },
      { type: "pairs", prompt: "هوا چه کار می‌کند؟", say: "باد چه چیزهایی را تکان می‌دهد؟ جفت‌ها را پیدا کن.",
        pairs: [
          [{ pic: "⛵", say: "قایق بادبانی" }, { label: "جلو می‌رود", say: "جلو می‌رود" }],
          [{ pic: "🪁", say: "بادبادک" }, { label: "بالا می‌رود", say: "بالا می‌رود" }],
          [{ pic: "👕", say: "لباس خیس" }, { label: "خشک می‌شود", say: "خشک می‌شود" }]
        ] },
      { type: "home", pic: "🌍 🔍", text: "در یک گردش، آب، هوا، سنگ و خاک را پیدا کن!",
        need: ["یک کیسه کوچک", "کاغذ و مداد"],
        steps: [
          "در پارک یا کوچه با هم بگردید: کجا آب هست؟ کجا سنگ؟ کجا خاک؟ از کجا می‌فهمیم هوا هست؟",
          "یک سنگ کوچک و کمی خاک در کیسه جمع کنید.",
          "در خانه کودک از هر کدام یک نقاشی بکشد.",
          "بعد از بازی با خاک دست‌ها را بشویید."
        ],
        ask: "هوا را از کجا فهمیدی؟" }
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
    id: "science-sprout-32", subject: "science", level: "sprout", emoji: "🌓", title: "ماه چه شکلی است؟",
    steps: [
      { type: "scene", prompt: "شکل ماه در یک ماه", bg: "#1f2a52",
        /* Night after night over the same house, the moon's lit part grows from a thin crescent to a half to the
           full moon, then shrinks again to a half and a crescent, and on one night it cannot be seen; each night's
           shape goes into the moon diary at the bottom. The night passes as the sky dims between moons. Drawings:
           js/art/rig-science.js. */
        parts: {
          night: { art: "sci-night" }, stars: { art: "sci-stars" },
          ground: { art: "sci-ground" }, dim: { art: "sci-night", o: 0.45 }, house: { art: "sci-house", at: [40, 70], s: 1.3 },
          diary: { art: "sci-moondiary" },
          m1: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.08 } },
          k1: { art: "sci-moonphase", at: [20.5, 78], s: 1.1, o: 0, look: { phase: 0.08 } },
          m2: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.25 } },
          k2: { art: "sci-moonphase", at: [37.5, 78], s: 1.1, o: 0, look: { phase: 0.25 } },
          m3: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.38 } },
          k3: { art: "sci-moonphase", at: [54.5, 78], s: 1.1, o: 0, look: { phase: 0.38 } },
          m4: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.5 } },
          k4: { art: "sci-moonphase", at: [71.5, 78], s: 1.1, o: 0, look: { phase: 0.5 } },
          m5: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.62 } },
          k5: { art: "sci-moonphase", at: [88.5, 78], s: 1.1, o: 0, look: { phase: 0.62 } },
          m6: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.75 } },
          k6: { art: "sci-moonphase", at: [105.5, 78], s: 1.1, o: 0, look: { phase: 0.75 } },
          m7: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0.9 } },
          k7: { art: "sci-moonphase", at: [122.5, 78], s: 1.1, o: 0, look: { phase: 0.9 } },
          m8: { art: "sci-moonphase", at: [100, 28], s: 2.6, o: 0, look: { phase: 0 } },
          k8: { art: "sci-moonphase", at: [139.5, 78], s: 1.1, o: 0, look: { phase: 0 } }
        },
        scenes: [
          { caption: "یک شب، ماه یک هلال باریک است. شکلش را در دفتر ماه می‌کشیم.", key: 2600, do: [
            { id: "house.light", to: { o: 1 }, dur: 400 },
            { id: "m1", to: { o: 1 }, at: 300, dur: 800 }, { id: "k1", to: { o: 1 }, at: 1600, dur: 500 }
          ] },
          { caption: "شب‌های بعد، ماه هر شب کمی پُرتر می‌شود: نیمه ماه.", key: 3600, hold: 5600, do: [
            { id: "m1", to: { o: 0 }, dur: 600 }, { id: "m2", to: { o: 1 }, at: 600, dur: 800 }, { id: "k2", to: { o: 1 }, at: 1400, dur: 500 },
            { id: "m2", to: { o: 0 }, at: 2400, dur: 600 }, { id: "m3", to: { o: 1 }, at: 2800, dur: 800 }, { id: "k3", to: { o: 1 }, at: 3400, dur: 500 }
          ] },
          { caption: "تا اینکه ماه کامل و گرد می‌شود: ماه شب چهارده!", key: 2200, do: [
            { id: "m3", to: { o: 0 }, dur: 600 }, { id: "m4", to: { o: 1 }, at: 600, dur: 900 }, { id: "k4", to: { o: 1 }, at: 1600, dur: 500 },
            { id: "m4", to: { s: 2.9 }, at: 1600, dur: 900, yoyo: true, times: 2 }
          ] },
          { caption: "بعد ماه شب به شب لاغرتر می‌شود.", key: 5200, hold: 6400, do: [
            { id: "m4", to: { o: 0 }, dur: 600 }, { id: "m5", to: { o: 1 }, at: 600, dur: 700 }, { id: "k5", to: { o: 1 }, at: 1200, dur: 400 },
            { id: "m5", to: { o: 0 }, at: 2000, dur: 600 }, { id: "m6", to: { o: 1 }, at: 2400, dur: 700 }, { id: "k6", to: { o: 1 }, at: 3000, dur: 400 },
            { id: "m6", to: { o: 0 }, at: 3800, dur: 600 }, { id: "m7", to: { o: 1 }, at: 4200, dur: 700 }, { id: "k7", to: { o: 1 }, at: 4800, dur: 400 }
          ] },
          { caption: "یک شب اصلاً ماه را نمی‌بینیم. بعد دوباره هلال باریک پیدا می‌شود و همه چیز از اول تکرار می‌شود.", key: 4200, hold: 7000, do: [
            { id: "m7", to: { o: 0 }, dur: 600 }, { id: "m8", to: { o: 0.6 }, at: 600, dur: 700 }, { id: "k8", to: { o: 1 }, at: 1200, dur: 400 },
            { id: "m8", to: { o: 0 }, at: 2600, dur: 600 }, { id: "m1", to: { o: 1 }, at: 3200, dur: 800 }
          ] }
        ],
        question: "ماه کامل و گرد را چه می‌نامیم؟",
        options: ["ماه شب چهارده", "هلال ماه", "نیمه ماه"], answer: "ماه شب چهارده" },
      { type: "order", prompt: "از هلال تا ماه کامل بچین", say: "اول هلال باریک است، بعد نیمه ماه، بعد ماه کامل. به ترتیب بچین.", numbered: true, ltr: true,
        items: [{ pic: "🌒", say: "هلال" }, { pic: "🌓", say: "نیمه ماه" }, { pic: "🌔", say: "بیشتر از نیمه" }, { pic: "🌕", say: "ماه کامل" }] },
      { type: "pattern", prompt: "بعد از ماه کامل چه می‌آید؟", say: "ماه پُر می‌شود و دوباره لاغر می‌شود. بعد از ماه کامل کدام شکل می‌آید؟", ltr: true,
        seq: ["🌒", "🌓", "🌕", "🌗", "🌘"], blanks: [3], options: ["🌗", "🌒", "🌕"] },
      { type: "choose", prompt: "ماه هر شب همان شکل است؟", say: "ماه هر شب همان شکل است؟",
        options: ["نه، شکلش کم‌کم عوض می‌شود", "بله، همیشه گرد است"], answer: "نه، شکلش کم‌کم عوض می‌شود" },
      { type: "paper", pic: "🌙 📅", text: "دفتر ماه: چند شب، شکل ماه را در یک خانه جدول بکش.",
        check: ["چند شب پشت سر هم ماه را پیدا کرد؟", "شکل‌ها را در خانه‌های جدول کشید؟", "دید که ماه پُرتر یا لاغرتر شد؟"],
        note: "یک کاغذ را هشت خانه کنید. هر شب پیش از خواب از پنجره ماه را پیدا کنید (گاهی ماه عصر یا صبح در آسمان است). اگر ابری بود یا ماه پیدا نبود، خانه را خالی بگذارید. هرگز مستقیم به خورشید نگاه نکنید." }
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
    id: "science-sprout-34", subject: "science", level: "sprout", emoji: "🌕", title: "بازی آسمان و فصل‌ها",
    steps: [
      { type: "order", prompt: "خورشید در یک روز: به ترتیب بچین", say: "صبح خورشید بالا می‌آید، ظهر بالای آسمان است و عصر پایین می‌رود. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌅", say: "صبح" }, { pic: "☀️", say: "ظهر" }, { pic: "🌇", say: "عصر" }, { pic: "🌙", say: "شب" }] },
      { type: "order", prompt: "ماه پُر می‌شود: به ترتیب بچین", say: "از هلال باریک تا ماه کامل به ترتیب بچین.", numbered: true, ltr: true,
        items: [{ pic: "🌒", say: "هلال" }, { pic: "🌓", say: "نیمه ماه" }, { pic: "🌕", say: "ماه کامل" }] },
      { type: "pattern", prompt: "بعد از پاییز کدام فصل می‌آید؟", say: "بهار، تابستان، پاییز… بعد کدام فصل می‌آید؟",
        seq: ["🌸", "☀️", "🍂", "⛄", "🌸", "☀️"], blanks: [3], options: ["⛄", "🌸", "☀️"] },
      { type: "pattern", prompt: "روز و شب: بعدی چیست؟", say: "روز، شب، روز، شب… بعدی چیست؟",
        seq: ["☀️", "🌙", "☀️", "🌙", "☀️", "🌙"], blanks: [4], options: ["☀️", "🌙"] },
      { type: "sort", prompt: "تابستان یا زمستان؟", say: "این‌ها مال تابستان‌اند یا زمستان؟",
        baskets: [{ label: "تابستان", pic: "☀️", value: "summer" }, { label: "زمستان", pic: "⛄", value: "winter" }],
        items: [
          { pic: "🍉", say: "هندوانه", basket: "summer" },
          { pic: "🏖️", say: "کنار دریا", basket: "summer" },
          { pic: "👒", say: "کلاه آفتابی", basket: "summer" },
          { pic: "⛄", say: "آدم‌برفی", basket: "winter" },
          { pic: "🧣", say: "شال‌گردن", basket: "winter" },
          { pic: "❄️", say: "برف", basket: "winter" }
        ] },
      { type: "home", pic: "☀️ 🌙", text: "آسمان امروز را با آسمان امشب مقایسه کن.",
        need: ["کاغذ و مداد رنگی"],
        steps: [
          "صبح، ظهر و عصر از یک پنجره ببینید خورشید کجای آسمان است. هرگز مستقیم به خورشید نگاه نکنید.",
          "شب ماه را پیدا کنید و شکلش را بکشید.",
          "بپرسید: «الان چه فصلی است؟ از کجا می‌فهمی؟» (درخت‌ها، هوا، لباس‌ها)",
          "کودک یک نقاشی از فصل امروز بکشد."
        ],
        ask: "الان چه فصلی است؟ از کجا فهمیدی؟" }
    ]
  },
  {
    id: "science-sprout-37", subject: "science", level: "sprout", emoji: "🔦", title: "نور و تاریکی",
    steps: [
      { type: "scene", prompt: "بدون نور می‌بینیم؟", bg: "#f6efdc",
        /* In a dark room nothing can be seen; the torch's light falls on the teddy and we see it, and behind it a
           shadow falls on the wall where the light cannot reach. Then the light comes on and torches shine at three
           screens: through the glass the light passes (a bright spot on the wall behind), through paper a little
           (a faint spot), through wood not at all. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, teddy: { art: "🧸", at: [92, 76], s: 0.9 },
          dark: { art: "sci-night", o: 1 },
          torch: { art: "sci-torch", at: [30, 64], s: 1.2 },
          teddyLit: { art: "🧸", at: [92, 76], s: 0.9, o: 0 }, shadow: { art: "sci-teddyshadow", at: [112, 66], s: 1.3, o: 0 },
          t1: { art: "sci-torch", at: [8, 58], s: 1.2, o: 0 }, t2: { art: "sci-torch", at: [56, 58], s: 1.2, o: 0 }, t3: { art: "sci-torch", at: [104, 58], s: 1.2, o: 0 },
          sc1: { art: "sci-screen-glass", at: [36, 74], s: 1.6, o: 0 }, sc2: { art: "sci-screen-paper", at: [84, 74], s: 1.6, o: 0 }, sc3: { art: "sci-screen-wood", at: [132, 74], s: 1.6, o: 0 },
          sp1: { art: "sci-lightspot", at: [54, 52], s: 1.2, o: 0 }, sp2: { art: "sci-lightspot", at: [102, 52], s: 1.2, o: 0 }, sp3: { art: "sci-lightspot", at: [150, 52], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "اتاق تاریکِ تاریک است. هیچ چیز را نمی‌بینیم.", hold: 4400, do: [
            { id: "teddy", to: { r: 0 }, dur: 1200 }
          ] },
          { caption: "چراغ‌قوه را روشن کردیم. نورش به خرس عروسکی خورد و حالا آن را می‌بینیم!", key: 2400, hold: 5600, do: [
            { id: "torch.beam", to: { o: 1 }, at: 600, dur: 300 }, { id: "teddyLit", to: { o: 1 }, at: 800, dur: 500 },
            { id: "teddyLit", to: { r: -6 }, at: 1800, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "پشت خرس روی دیوار سایه افتاد. سایه جایی است که نور به آن نمی‌رسد.", key: 2400, hold: 5600, do: [
            { id: "shadow", to: { o: 1 }, at: 400, dur: 900 },
            { id: "shadow", to: { s: 1.4 }, at: 1800, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "چراغ‌قوه را به شیشه، کاغذ و چوب تاباندیم. نور از شیشه رد می‌شود، از کاغذ کمی، و از چوب اصلاً!", key: 3600, hold: 7400, do: [
            { id: "dark", to: { o: 0 }, dur: 900 }, { id: "torch", to: { o: 0 }, dur: 600 }, { id: "teddyLit", to: { o: 0 }, dur: 600 }, { id: "teddy", to: { o: 0 }, dur: 600 }, { id: "shadow", to: { o: 0 }, dur: 600 },
            { id: "sc1", to: { o: 1 }, at: 700, dur: 500 }, { id: "sc2", to: { o: 1 }, at: 700, dur: 500 }, { id: "sc3", to: { o: 1 }, at: 700, dur: 500 },
            { id: "t1", to: { o: 1 }, at: 900, dur: 400 }, { id: "t2", to: { o: 1 }, at: 900, dur: 400 }, { id: "t3", to: { o: 1 }, at: 900, dur: 400 },
            { id: "t1.beam", to: { o: 1, sx: 0.2 }, at: 1600, dur: 300 }, { id: "t2.beam", to: { o: 1, sx: 0.2 }, at: 1600, dur: 300 }, { id: "t3.beam", to: { o: 1, sx: 0.2 }, at: 1600, dur: 300 },
            { id: "sp1", to: { o: 1 }, at: 2200, dur: 500 }, { id: "sp2", to: { o: 0.35 }, at: 2200, dur: 500 },
            { id: "sc3", to: { x: "+0.5" }, at: 2600, dur: 300, yoyo: true, times: 2 }
          ] }
        ],
        question: "در اتاق کاملاً تاریک، چیزها را می‌بینیم؟",
        options: ["نه، برای دیدن نور لازم است", "بله، خوب می‌بینیم"], answer: "نه، برای دیدن نور لازم است" },
      { type: "sort", prompt: "نور از آن رد می‌شود؟", say: "نور از کدام‌ها رد می‌شود و از کدام‌ها رد نمی‌شود؟",
        baskets: [{ label: "رد می‌شود", pic: "🪟", value: "yes" }, { label: "رد نمی‌شود", pic: "🧱", value: "no" }],
        items: [
          { pic: "🪟", say: "شیشه پنجره", basket: "yes" },
          { pic: "👓", say: "شیشه عینک", basket: "yes" },
          { pic: "💧", say: "آب زلال", basket: "yes" },
          { pic: "📕", say: "کتاب", basket: "no" },
          { pic: "🧱", say: "دیوار", basket: "no" },
          { pic: "🚪", say: "در چوبی", basket: "no" }
        ] },
      { type: "choose", prompt: "سایه کجا می‌افتد؟", say: "وقتی نور به چیزی می‌خورد، سایه‌اش کجا می‌افتد؟",
        options: ["پشت آن، جایی که نور نمی‌رسد", "جلوی چراغ‌قوه"], answer: "پشت آن، جایی که نور نمی‌رسد" },
      { type: "choose", prompt: "برای دیدن چه لازم است؟", say: "برای اینکه چیزها را ببینیم، چه لازم است؟",
        options: ["نور", "صدا"], answer: "نور" },
      { type: "home", pic: "🔦 ✋", text: "شب، با چراغ‌قوه بازی سایه کن!",
        need: ["یک چراغ‌قوه", "یک دیوار روشن", "یک تکه شیشه یا لیوان شیشه‌ای، یک کاغذ، یک تخته یا کتاب"],
        steps: [
          "اتاق را تاریک کنید و چراغ‌قوه را به دیوار بتابانید. با دست‌ها شکل حیوان بسازید: سایه‌اش روی دیوار می‌افتد.",
          "دستتان را به چراغ نزدیک کنید و دور کنید: سایه چه می‌شود؟",
          "چراغ‌قوه را پشت لیوان شیشه‌ای، کاغذ و کتاب بگیرید: نور از کدام رد می‌شود؟",
          "چراغ‌قوه را به چشم کسی نتابانید."
        ],
        ask: "سایه دستت کی بزرگ‌تر شد؟" }
    ]
  },
  {
    id: "science-sprout-38", subject: "science", level: "sprout", emoji: "📏", title: "لرزش و صدا",
    steps: [
      { type: "scene", prompt: "صدا از لرزش می‌آید", bg: "#f6efdc",
        /* A ruler held down on the table's edge is flicked: its free end shakes fast and sound goes out; a rubber
           band round a box is plucked: it shivers and sounds; a hand on the band stops the shivering and the sound
           stops too. Drawings: js/art/rig-science.js, hand from js/art/rig.js. */
        parts: {
          room: { art: "sci-room" }, table: { art: "sci-longtable", at: [-30, 0] },
          ruler: { art: "sci-ruler", at: [112, 54.4], s: 1.3 }, press: { art: "hand", at: [100, 10], r: 180, s: 0.8 },
          wr: { art: "sci-waves", at: [142, 56], s: 0.9, o: 0 },
          box: { art: "sci-bandbox", at: [56, 56], s: 1.3, o: 0 }, wb: { art: "sci-waves", at: [78, 38], s: 0.9, o: 0 },
          pluck: { art: "hand", at: [56, 0], r: 180, s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "یک سر خط‌کش را روی میز نگه داشتیم و سر دیگرش را پایین زدیم.", key: 2200, do: [
            { id: "press", path: "M100 10L100 36.8", dur: 900, ease: "out" },
            { id: "ruler.end", to: { r: 18 }, at: 1400, dur: 400, ease: "in" }
          ] },
          { caption: "خط‌کش تند تند لرزید و صدا داد: وززز!", key: 1600, hold: 5000, do: [
            { cam: { x: 124, y: 52, zoom: 2 }, dur: 600 }, { id: "ruler.end", to: { r: -12 }, dur: 120 },
            { id: "ruler.end", to: { r: 10 }, at: 120, dur: 3600, yoyo: true, times: 40, ease: "linear" },
            { id: "wr", to: { o: 1 }, at: 200, dur: 200 }, { id: "wr", to: { s: 1.3 }, at: 400, dur: 3200, yoyo: true, times: 10 },
            { id: "wr", to: { o: 0 }, at: 3800, dur: 400 }, { id: "ruler.end", to: { r: 0 }, at: 3800, dur: 400 }
          ] },
          { caption: "یک کش دور جعبه انداختیم. کش را کشیدیم و رها کردیم: کش لرزید و صدا داد.", key: 2600, hold: 5400, do: [
            { id: "press", to: { o: 0 }, dur: 400 }, { id: "box", to: { o: 1 }, dur: 500 }, { cam: { x: 64, y: 44, zoom: 2 }, dur: 900 }, { id: "pluck", to: { o: 1 }, at: 300, dur: 300 },
            { id: "pluck", path: "M56 0L56 25", at: 500, dur: 700 },
            { id: "box.band", to: { sy: -3 }, at: 1300, dur: 300 },
            { id: "pluck", path: "M56 25L56 12", at: 1600, dur: 500 },
            { id: "box.band", to: { sy: 2.5 }, at: 1600, dur: 3200, yoyo: true, times: 30, ease: "linear" },
            { id: "wb", to: { o: 1 }, at: 1700, dur: 200 }, { id: "wb", to: { s: 1.3 }, at: 1900, dur: 3000, yoyo: true, times: 8 }
          ] },
          { caption: "دستمان را روی کش گذاشتیم. لرزش ایستاد و صدا هم تمام شد.", key: 2400, hold: 5000, do: [
            { id: "pluck", path: "M56 12L56 25", dur: 600, ease: "out" },
            { id: "box.band", to: { sy: 1 }, at: 600, dur: 200 },
            { id: "wb", to: { o: 0 }, at: 600, dur: 400 }
          ] }
        ],
        question: "وقتی چیزی صدا می‌دهد، چه کار می‌کند؟",
        options: ["می‌لرزد", "رنگش عوض می‌شود", "سرد می‌شود"], answer: "می‌لرزد" },
      { type: "sort", prompt: "می‌لرزد و صدا می‌دهد؟", say: "کدام‌ها الان می‌لرزند و صدا می‌دهند و کدام‌ها ساکت‌اند؟",
        baskets: [{ label: "می‌لرزد و صدا می‌دهد", pic: "🔔", value: "yes" }, { label: "ساکت است", pic: "🤫", value: "no" }],
        items: [
          { pic: "🔔", say: "زنگی که به صدا درآمده", basket: "yes" },
          { pic: "🐝", say: "بال زنبوری که وزوز می‌کند", basket: "yes" },
          { pic: "🎻", say: "سیم سازی که می‌نوازند", basket: "yes" },
          { pic: "📕", say: "کتابی که روی میز است", basket: "no" },
          { pic: "🪨", say: "سنگ", basket: "no" },
          { pic: "🧸", say: "عروسک خوابیده", basket: "no" }
        ] },
      { type: "choose", prompt: "برای اینکه زنگ ساکت شود، چه کنیم؟", say: "زنگ دارد صدا می‌دهد. برای اینکه ساکت شود، چه کار کنیم؟",
        options: ["دستمان را رویش بگذاریم تا نلرزد", "محکم‌تر بزنیمش"], answer: "دستمان را رویش بگذاریم تا نلرزد" },
      { type: "choose", prompt: "دستت را روی گلویت بگذار و آواز بخوان. چه حس می‌کنی؟", say: "دستت را آرام روی گلویت بگذار و یک آواز بخوان. چه حس می‌کنی؟",
        options: ["گلویم می‌لرزد", "گلویم سرد می‌شود"], answer: "گلویم می‌لرزد" },
      { type: "home", pic: "📏 🥣", text: "لرزش را ببین و بشنو!",
        need: ["یک خط‌کش", "یک کاسه، کمی پلاستیک فریزر و یک کش", "چند دانه برنج"],
        steps: [
          "خط‌کش را لب میز بگذارید و یک سرش را با دست نگه دارید. سر دیگرش را آرام پایین بزنید: لرزید؟ صدا داد؟",
          "خط‌کش را بیشتر و کمتر از میز بیرون بگذارید: صدا چه فرقی می‌کند؟",
          "پلاستیک را روی کاسه بکشید و با کش ببندید. چند دانه برنج رویش بریزید و کنار کاسه دست بزنید یا یک قابلمه بزنید: برنج‌ها می‌پرند!",
          "دست را روی گلو بگذارید و آواز بخوانید: لرزش را حس کنید."
        ],
        ask: "وقتی خط‌کش ایستاد، صدا چه شد؟" }
    ]
  },
  {
    id: "science-sprout-39", subject: "science", level: "sprout", emoji: "📞", title: "پیام با نور و صدا",
    steps: [
      { type: "scene", prompt: "پیام فرستادن از دور", bg: "#1f2a52",
        /* At night a torch at one window flashes three times; from the house across the street a torch flashes
           back. By day Arash taps a drum and the sound goes across to Sara. Then the two make
           a cup-and-string telephone: Arash talks into his cup and the sound runs along the tight string to Sara's
           cup at her ear. Drawings: js/art/rig-science.js. */
        parts: {
          night: { art: "sci-night" }, stars: { art: "sci-stars" },
          hA: { art: "sci-house", at: [28, 86], s: 2.4 }, hB: { art: "sci-house", at: [132, 86], s: 2.4 },
          torchA: { art: "sci-torch", at: [36, 56], s: 1 }, torchB: { art: "sci-torch", at: [124, 56], s: 1, flip: true },
          day: { art: "sci-meadow", o: 0 },
          drum: { art: "sci-tonbak", at: [40, 86], s: 1.2, o: 0 }, boy: { art: "👦", at: [26, 86], s: 1.4, o: 0 }, girl2: { art: "👧", at: [134, 86], s: 1.4, flip: true, o: 0 },
          dw: { art: "sci-waves", at: [52, 52], s: 1, o: 0 },
          string: { art: "sci-string", o: 0 },
          cupA: { art: "sci-papercup", at: [37, 58], s: 1, o: 0 }, cupB: { art: "sci-papercup", at: [123, 58], s: 1, flip: true, o: 0 },
          dot1: { art: "sci-arc", at: [40, 58], s: 0.4, o: 0 }, dot2: { art: "sci-arc", at: [40, 58], s: 0.4, o: 0 }
        },
        scenes: [
          { caption: "شب است. از یک پنجره با چراغ‌قوه سه بار نور می‌فرستیم.", key: 1300, hold: 5000, do: [
            { id: "hA.light", to: { o: 1 }, dur: 300 }, { id: "hB.light", to: { o: 1 }, dur: 300 },
            { id: "torchA.beam", to: { o: 1 }, at: 800, dur: 100 }, { id: "torchA.beam", to: { o: 0 }, at: 1500, dur: 100 },
            { id: "torchA.beam", to: { o: 1 }, at: 2000, dur: 100 }, { id: "torchA.beam", to: { o: 0 }, at: 2700, dur: 100 },
            { id: "torchA.beam", to: { o: 1 }, at: 3200, dur: 100 }, { id: "torchA.beam", to: { o: 0 }, at: 3900, dur: 100 }
          ] },
          { caption: "از خانه آن طرف کوچه نور را دیدند و با چراغ‌قوه جواب دادند!", key: 1300, hold: 4600, do: [
            { id: "torchB.beam", to: { o: 1 }, at: 800, dur: 100 }, { id: "torchB.beam", to: { o: 0 }, at: 1500, dur: 100 },
            { id: "torchB.beam", to: { o: 1 }, at: 2000, dur: 100 }, { id: "torchB.beam", to: { o: 0 }, at: 2700, dur: 100 }
          ] },
          { caption: "روز، آرش تنبک می‌زند. صدای تنبک به سارا می‌رسد.", key: 2400, hold: 5200, do: [
            { id: "day", to: { o: 1 }, dur: 800 }, { id: "drum", to: { o: 1 }, at: 400, dur: 400 }, { id: "boy", to: { o: 1 }, at: 400, dur: 400 }, { id: "girl2", to: { o: 1 }, at: 400, dur: 400 },
            { id: "boy.armF", to: { r: -110 }, at: 900, dur: 300 }, { id: "boy.armF", to: { r: -80 }, at: 1200, dur: 2800, yoyo: true, times: 8, ease: "in" },
            { id: "dw", to: { o: 1 }, at: 1300, dur: 100 }, { id: "dw", path: "M52 52L118 52", at: 1300, dur: 2400, ease: "linear" }, { id: "dw", to: { o: 0 }, at: 3600, dur: 300 },
            { id: "girl2", to: { y: "-2" }, at: 3500, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "حالا با دو لیوان کاغذی و یک نخ تلفن می‌سازیم. نخ باید کشیده باشد.", key: 2400, hold: 5000, do: [
            { id: "drum", to: { o: 0 }, dur: 400 },
            { id: "boy.armF", to: { r: -135 }, at: 300, dur: 500 }, { id: "girl2.armF", to: { r: -135 }, at: 300, dur: 500 },
            { id: "cupA", to: { o: 1 }, at: 700, dur: 400 }, { id: "cupB", to: { o: 1 }, at: 700, dur: 400 },
            { id: "string", to: { o: 1 }, at: 1100, dur: 100 }, { id: "string", draw: true, at: 1100, dur: 1400 }
          ] },
          { caption: "آرش در لیوانش حرف می‌زند. صدا از روی نخ می‌لرزد و به گوش سارا می‌رسد!", key: 2600, hold: 5600, do: [
            { id: "dot1", to: { o: 1 }, at: 400, dur: 100 }, { id: "dot1", path: "M40 58L120 58", at: 400, dur: 1800, ease: "linear" }, { id: "dot1", to: { o: 0 }, at: 2200, dur: 100 },
            { id: "dot2", to: { o: 1 }, at: 1400, dur: 100 }, { id: "dot2", path: "M40 58L120 58", at: 1400, dur: 1800, ease: "linear" }, { id: "dot2", to: { o: 0 }, at: 3200, dur: 100 },
            { id: "string", to: { y: 0.4 }, at: 400, dur: 2800, yoyo: true, times: 20 },
            { id: "girl2", to: { y: "-2" }, at: 3400, dur: 400, yoyo: true, times: 2 }
          ] }
        ],
        question: "شب، از دور با چه می‌شود پیام فرستاد؟", pic: true,
        options: [{ label: "🔦", value: "چراغ‌قوه" }, { label: "🧦", value: "جوراب" }], answer: "چراغ‌قوه" },
      { type: "choose", prompt: "در تلفن لیوانی، صدا از کجا می‌رود؟", say: "در تلفن لیوانی، صدا از کجا به لیوان دیگر می‌رسد؟",
        options: ["از روی نخ کشیده", "از توی هوا با پرواز"], answer: "از روی نخ کشیده" },
      { type: "choose", prompt: "روز، از دور با چه می‌شود دوستت را صدا زد؟", say: "روز در پارک، دوستت دور است. با چه می‌شود صدایش زد؟", pic: true,
        options: [{ label: "🥁", value: "طبل" }, { label: "📕", value: "کتاب بسته" }], answer: "طبل" },
      { type: "choose", prompt: "اگر نخ تلفن شل باشد، چه می‌شود؟", say: "اگر نخ تلفن لیوانی شل و آویزان باشد، صدا خوب می‌رسد؟",
        options: ["نه، نخ باید کشیده باشد", "بله، بهتر می‌رسد"], answer: "نه، نخ باید کشیده باشد" },
      { type: "home", pic: "🥤 🧵", text: "تلفن لیوانی بساز!",
        need: ["دو لیوان کاغذی یا یک‌بار مصرف", "یک نخ بلند، چند متر", "یک مداد", "یک چراغ‌قوه"],
        steps: [
          "بزرگ‌تر با نوک مداد ته هر لیوان یک سوراخ کوچک درست کند.",
          "سر نخ را از سوراخ رد کنید و داخل لیوان گره بزنید. سر دیگر را به لیوان دوم ببندید.",
          "هر کدام یک لیوان بگیرید و آن‌قدر دور شوید که نخ کشیده شود. یکی در لیوان آرام حرف بزند و دیگری لیوان را روی گوشش بگذارد.",
          "شب، با چراغ‌قوه یک رمز بسازید: یک چشمک یعنی «سلام»، دو چشمک یعنی «بیا». چراغ را به چشم کسی نتابانید."
        ],
        ask: "وقتی نخ شل شد، صدا را می‌شنیدی؟" }
    ]
  },
  {
    id: "science-sprout-45", subject: "science", level: "sprout", emoji: "💡", title: "بازی نور و صدا",
    steps: [
      { type: "sort", prompt: "روشن یا تاریک؟", say: "کدام نور می‌دهد و کدام نور نمی‌دهد؟",
        baskets: [{ label: "نور می‌دهد", pic: "💡", value: "light" }, { label: "نور نمی‌دهد", pic: "🌑", value: "dark" }],
        items: [
          { pic: "☀️", say: "خورشید", basket: "light" },
          { pic: "🔦", say: "چراغ‌قوه روشن", basket: "light" },
          { pic: "💡", say: "لامپ روشن", basket: "light" },
          { pic: "🪨", say: "سنگ", basket: "dark" },
          { pic: "📕", say: "کتاب", basket: "dark" },
          { pic: "🧸", say: "عروسک", basket: "dark" }
        ] },
      { type: "sort", prompt: "نور از آن رد می‌شود؟", say: "نور از کدام‌ها رد می‌شود؟",
        baskets: [{ label: "رد می‌شود", pic: "🪟", value: "yes" }, { label: "رد نمی‌شود", pic: "🧱", value: "no" }],
        items: [
          { pic: "🥛", say: "لیوان شیشه‌ای", basket: "yes" },
          { pic: "🪟", say: "پنجره", basket: "yes" },
          { pic: "🪑", say: "صندلی چوبی", basket: "no" },
          { pic: "🧱", say: "آجر", basket: "no" }
        ] },
      { type: "pairs", prompt: "صدای این‌ها از لرزش کدام قسمت است؟", say: "هر چیز را به قسمتی که می‌لرزد و صدا می‌دهد برسان.",
        pairs: [
          [{ pic: "🥁", say: "تنبک" }, { label: "پوست تنبک", say: "پوست تنبک" }],
          [{ pic: "🎻", say: "ساز" }, { label: "سیم ساز", say: "سیم ساز" }],
          [{ pic: "🐝", say: "زنبور" }, { label: "بال زنبور", say: "بال زنبور" }],
          [{ pic: "🗣️", say: "آدم وقتی حرف می‌زند" }, { label: "گلو", say: "گلو" }]
        ] },
      { type: "pairs", prompt: "پیام با نور یا صدا", say: "هر پیام را به چیزی که با آن فرستاده می‌شود برسان.",
        pairs: [
          [{ pic: "🔦", say: "چراغ‌قوه" }, { label: "پیام با نور", say: "پیام با نور" }],
          [{ pic: "🔔", say: "زنگ مدرسه" }, { label: "پیام با صدا", say: "پیام با صدا" }],
          [{ pic: "🚦", say: "چراغ راهنمایی" }, { label: "رنگ نور", say: "رنگ نور" }]
        ] },
      { type: "home", pic: "🔦 🔔", text: "بازی پیام‌های رمزی!",
        need: ["یک چراغ‌قوه", "یک قاشق و یک قابلمه یا یک زنگ کوچک"],
        steps: [
          "با هم رمز بگذارید: یک بار نور یعنی «بیا»، دو بار یعنی «بنشین». یک ضربه به قابلمه یعنی «دست بزن».",
          "یکی پیام بفرستد و دیگری کارش را انجام دهد. بعد جایتان را عوض کنید.",
          "در اتاق تاریک پیام نوری بفرستید و در اتاق روشن پیام صوتی.",
          "صدا را آرام نگه دارید و نور را به چشم کسی نتابانید."
        ],
        ask: "کدام پیام از دور بهتر می‌رسید: نور یا صدا؟" }
    ]
  },
  {
    id: "science-sprout-8", subject: "science", level: "sprout", emoji: "🫀", title: "سلام، به من نگاه کن!",
    steps: [
      { type: "scene", prompt: "بدن ما چه دارد؟", bg: "#f6efdc",
        /* Arash from the front: a ring shows his head, body, arms and legs; then an x-ray look shows his bones; the
           knees and elbows are joints, and a close-up arm bends at the elbow; his lungs fill and empty with each
           breath; his heart beats, and after he jumps it beats faster. The x-ray is drawn in the child's own units,
           inside his part, so it jumps with him. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" },
          boy: { art: "sci-kid-boy", at: [60, 86], s: 1.6 },
          xray: { art: "sci-xray", at: [0, 0], o: 0, under: "boy" },
          ring: { art: "sci-ring", at: [60, 26.8], s: 2, o: 0 },
          arm: { art: "sci-armbones", at: [118, 22], s: 1.8, o: 0 }
        },
        scenes: [
          { caption: "سلام! این آرش است: سر، تنه، دست‌ها و پاها.", key: 1400, hold: 6400, do: [
            { id: "ring", to: { o: 1 }, at: 300, dur: 300 },
            { id: "ring", to: { y: 50, s: 2.4 }, at: 1600, dur: 600 },
            { id: "ring", to: { x: 44, y: 54, s: 1.6 }, at: 3000, dur: 600 },
            { id: "ring", to: { x: 60, y: 72, s: 2.2 }, at: 4400, dur: 600 },
            { id: "ring", to: { o: 0 }, at: 5800, dur: 400 }
          ] },
          { caption: "زیر پوست ما استخوان‌ها هستند. استخوان‌ها بدن را محکم نگه می‌دارند.", key: 2200, hold: 5000, do: [
            { id: "xray", to: { o: 1 }, at: 300, dur: 1400 }
          ] },
          { caption: "جایی که دو استخوان به هم می‌رسند، مفصل است. آرنج و زانو خم می‌شوند.", key: 3400, hold: 6400, do: [
            { id: "xray.joints", to: { o: 1 }, dur: 500 }, { id: "xray.joints", to: { s: 1.05 }, at: 500, dur: 600, yoyo: true, times: 2 },
            { id: "arm", to: { o: 1 }, at: 1400, dur: 500 },
            { id: "arm.fore", to: { r: -110 }, at: 2200, dur: 1400, yoyo: true, times: 3 }
          ] },
          { caption: "شش‌ها هوا را می‌گیرند. با هر نفس پر و خالی می‌شوند.", key: 2400, hold: 6000, do: [
            { id: "arm", to: { o: 0 }, dur: 500 }, { id: "xray.joints", to: { o: 0 }, dur: 500 },
            { cam: { x: 60, y: 50, zoom: 2 }, at: 300, dur: 1000 },
            { id: "xray.lungs", to: { sy: 1.15, sx: 1.08 }, at: 1200, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "قلب خون را در بدن می‌چرخاند. وقتی می‌پریم، قلب تندتر می‌زند!", key: 4800, hold: 7400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "xray.heart", to: { s: 1.3 }, at: 800, dur: 1600, yoyo: true, times: 4, ease: "out" },
            { id: "boy", path: "M60 86Q60 70 60 86", at: 2400, dur: 600, ease: "linear" }, { id: "boy", path: "M60 86Q60 70 60 86", at: 3000, dur: 600, ease: "linear" },
            { id: "boy", path: "M60 86Q60 70 60 86", at: 3600, dur: 600, ease: "linear" },
            { id: "xray.heart", to: { s: 1.35 }, at: 4200, dur: 2400, yoyo: true, times: 12, ease: "out" }
          ] }
        ],
        question: "استخوان‌ها چه کار می‌کنند؟",
        options: ["بدن را محکم نگه می‌دارند", "غذا را هضم می‌کنند"], answer: "بدن را محکم نگه می‌دارند" },
      { type: "pairs", prompt: "هر قسمت چه کار می‌کند؟", say: "قلب خون را در بدن می‌چرخاند. جفت‌ها را پیدا کن.",
        pairs: [
          [{ label: "قلب", pic: "❤️", say: "قلب" }, { label: "خون را می‌چرخاند", say: "خون را در بدن می‌چرخاند" }],
          [{ label: "شش‌ها", pic: "🫁", say: "شش‌ها" }, { label: "هوا را می‌گیرند", say: "هوا را می‌گیرند" }],
          [{ label: "استخوان‌ها", pic: "🦴", say: "استخوان‌ها" }, { label: "بدن را نگه می‌دارند", say: "بدن را محکم نگه می‌دارند" }],
          [{ pic: "👀", say: "چشم‌ها" }, { label: "می‌بینند", say: "می‌بینند" }]
        ] },
      { type: "choose", prompt: "بعد از دویدن، قلبت چطور می‌زند؟", say: "بعد از دویدن، قلبت چطور می‌زند؟",
        options: ["تندتر", "آهسته‌تر"], answer: "تندتر" },
      { type: "choose", prompt: "کدام خم می‌شود؟", say: "کدام قسمت بدن خم می‌شود؟",
        options: ["زانو", "وسط استخوان ران"], answer: "زانو" },
      { type: "doit", pic: "❤️ 🦵", text: "قلبت را حس کن و مفصل‌هایت را خم کن!",
        list: ["دستت را روی سینه‌ات بگذار و آرام بنشین. قلبت را حس می‌کنی؟", "حالا ده بار بپر.", "دوباره دستت را روی سینه‌ات بگذار: قلبت تندتر می‌زند؟", "زانوها، آرنج‌ها و انگشت‌هایت را خم و صاف کن.", "یک نفس عمیق بکش: سینه‌ات بالا می‌آید؟"],
        say: "قلبت را حس کن! دستت را روی سینه‌ات بگذار و آرام بنشین. حالا ده بار بپر. دوباره دستت را روی سینه‌ات بگذار: قلبت تندتر می‌زند؟ زانوها، آرنج‌ها و انگشت‌هایت را خم و صاف کن. یک نفس عمیق بکش." }
    ]
  },
  {
    id: "science-sprout-9", subject: "science", level: "sprout", emoji: "👶", title: "من بزرگ می‌شوم",
    steps: [
      { type: "scene", prompt: "ما چطور بزرگ می‌شویم؟", bg: "#cdeaf7",
        /* One life, side by side: Arash as a little one, Arash now going to school, a grown-up like his father and,
           one day, a grandfather with a cane; then his hand when he was little next to his hand now. People: the
           walker in js/art/rig.js; hand from js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" }, sun: { art: "sci-sun", at: [140, 14] },
          little: { art: "👦", at: [-10, 86], s: 0.55 },
          boy: { art: "👦", at: [-10, 86], s: 1.05 }, bag: { art: "🎒", at: [-5.5, -7], s: 0.3, under: "boy" },
          dad: { art: "👨", at: [-10, 86] }, grandpa: { art: "👴", at: [-10, 86] },
          handS: { art: "hand", at: [62, 70], s: 0.55, o: 0 }, handB: { art: "hand", at: [98, 76], s: 1, o: 0 }
        },
        scenes: [
          { caption: "آرش وقتی کوچولو بود، این‌قدر بود.", key: 3000, do: [
            { id: "little", walk: [24, 86], dur: 2800, steps: 10 }
          ] },
          { caption: "حالا بزرگ‌تر شده و به مدرسه می‌رود.", key: 3000, do: [
            { id: "boy", walk: [58, 86], dur: 3000, steps: 9 }
          ] },
          { caption: "بعدها مرد بزرگی می‌شود، مثل پدرش.", key: 3000, do: [
            { id: "dad", walk: [94, 86], dur: 3200, steps: 9 }
          ] },
          { caption: "و یک روز پدربزرگ می‌شود.", key: 3400, hold: 5000, do: [
            { id: "grandpa", walk: [130, 86], dur: 3800, steps: 10 }
          ] },
          { caption: "دست آرش وقتی کوچولو بود، و دستش حالا. چقدر بزرگ شده!", key: 2600, hold: 5600, do: [
            { id: "little", to: { o: 0 }, dur: 500 }, { id: "boy", to: { o: 0 }, dur: 500 }, { id: "dad", to: { o: 0 }, dur: 500 }, { id: "grandpa", to: { o: 0 }, dur: 500 },
            { id: "handS", to: { o: 1 }, at: 900, dur: 500 }, { id: "handB", to: { o: 1 }, at: 1500, dur: 500 },
            { id: "handB", to: { s: 1.06 }, at: 2400, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "وقتی بزرگ می‌شویم، چه چیزی عوض می‌شود؟",
        options: ["قدمان بلندتر می‌شود", "اسممان عوض می‌شود"], answer: "قدمان بلندتر می‌شود" },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "اول نوزادیم، بعد بچه، بعد بزرگ می‌شویم و آخر پدربزرگ و مادربزرگ. به ترتیب بچین.", numbered: true,
        items: [{ pic: "👶", say: "نوزاد" }, { pic: "🧒", say: "بچه" }, { pic: "👨", say: "بزرگسال" }, { pic: "👴", say: "پدربزرگ" }] },
      { type: "choose", prompt: "نوزاد چه کار می‌کند که تو حالا خودت می‌کنی؟", say: "یک نوزاد را دیگران غذا می‌دهند. تو حالا چه کار می‌کنی؟",
        options: ["خودم غذا می‌خورم", "هنوز نمی‌توانم بخورم"], answer: "خودم غذا می‌خورم" },
      { type: "choose", prompt: "کدام بزرگ‌تر است؟", say: "کدام بزرگ‌تر است: کفش نوزاد یا کفش تو؟",
        options: ["کفش من", "کفش نوزاد"], answer: "کفش من" },
      { type: "home", pic: "✋ 📏", text: "دستت را روی کاغذ بکش و با عکس کوچکی‌ات مقایسه کن!",
        need: ["کاغذ و مداد", "عکس نوزادی یا لباس نوزادی کودک، اگر دارید", "دست یک بزرگ‌تر و یک پدربزرگ یا مادربزرگ"],
        steps: [
          "کودک دستش را روی کاغذ بگذارد و دورش را با مداد بکشید. تاریخ را کنارش بنویسید.",
          "دست یک بزرگ‌تر را هم دور بکشید و مقایسه کنید.",
          "با هم عکس یا لباس نوزادی‌اش را ببینید. بپرسید: «از آن موقع چه چیزهایی یاد گرفته‌ای؟»",
          "اگر پدربزرگ یا مادربزرگ هست، بپرسید وقتی بچه بودند چه شکلی بودند."
        ],
        ask: "تو حالا چه کارهایی می‌کنی که وقتی نوزاد بودی نمی‌کردی؟" }
    ]
  },
  {
    id: "science-sprout-42", subject: "science", level: "sprout", emoji: "🐈", title: "شبیه پدر و مادر",
    steps: [
      { type: "scene", prompt: "بچه‌ها شبیه پدر و مادرشان‌اند؟", bg: "#cdeaf7",
        /* The mother cat and her three kittens: they look like her (ears, tail, whiskers) but each is a little
           different (orange, grey, white); three sunflowers from one flower's seeds grow, each a different height;
           a family of three, alike but not the same. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" },
          mom: { art: "sci-catc", at: [40, 84], s: 2.4, look: { fill: "#f0a35e" } },
          k1: { art: "sci-catc", at: [-10, 84], s: 1.2, look: { fill: "#f0a35e" } },
          k2: { art: "sci-catc", at: [-24, 84], s: 1.1, look: { fill: "#9aa0a6" } },
          k3: { art: "sci-catc", at: [-38, 84], s: 1.15, look: { fill: "#f4efe6" } },
          f1: { art: "sci-sunflower", at: [104, 84], s: 0.75, sy: 0, o: 0 }, f2: { art: "sci-sunflower", at: [124, 84], s: 0.6, sy: 0, o: 0 }, f3: { art: "sci-sunflower", at: [144, 84], s: 0.68, sy: 0, o: 0 },
          fmom: { art: "👩", at: [96, 88], s: 1.1, o: 0, look: { hairColor: "#2f2420" } }, fdad: { art: "👨", at: [116, 88], s: 1.1, flip: true, o: 0 },
          fgirl: { art: "👧", at: [106, 88], s: 1.1, o: 0, look: { hairColor: "#3d2c22" } }
        },
        scenes: [
          { caption: "این گربه مادر است.", do: [
            { id: "mom.head", to: { r: -12 }, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "بچه‌گربه‌هایش شبیه او هستند: گوش، دم و سبیل دارند و میو می‌کنند.", key: 3600, hold: 5000, do: [
            { id: "k1", walk: [62, 84], dur: 3400, steps: 10 }, { id: "k2", walk: [78, 84], dur: 3400, steps: 10 }, { id: "k3", walk: [94, 84], dur: 3400, steps: 10 }
          ] },
          { caption: "ولی هر بچه‌گربه کمی فرق دارد: یکی نارنجی است، یکی خاکستری و یکی سفید.", key: 3800, hold: 5400, do: [
            { id: "k1", to: { y: "-3" }, at: 400, dur: 500, yoyo: true, times: 2 },
            { id: "k2", to: { y: "-3" }, at: 1600, dur: 500, yoyo: true, times: 2 },
            { id: "k3", to: { y: "-3" }, at: 2800, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "دانه‌های یک آفتابگردان هم آفتابگردان می‌شوند، ولی همه هم‌قد نیستند.", key: 3800, hold: 5600, do: [
            { id: "mom", to: { o: 0 }, dur: 600 }, { id: "k1", to: { o: 0 }, dur: 600 }, { id: "k2", to: { o: 0 }, dur: 600 }, { id: "k3", to: { o: 0 }, dur: 600 },
            { cam: { x: 110, y: 52, zoom: 1.6 }, at: 400, dur: 1000 },
            { id: "f1", to: { o: 1 }, at: 600, dur: 200 }, { id: "f1", to: { sy: 0.75 }, at: 600, dur: 2800 },
            { id: "f2", to: { o: 1 }, at: 800, dur: 200 }, { id: "f2", to: { sy: 0.6 }, at: 800, dur: 2800 },
            { id: "f3", to: { o: 1 }, at: 1000, dur: 200 }, { id: "f3", to: { sy: 0.68 }, at: 1000, dur: 2800 }
          ] },
          { caption: "سارا هم شبیه پدر و مادرش است، ولی نه دقیقاً مثل آن‌ها.", key: 2600, hold: 5000, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "f1", to: { o: 0 }, dur: 600 }, { id: "f2", to: { o: 0 }, dur: 600 }, { id: "f3", to: { o: 0 }, dur: 600 },
            { id: "fmom", to: { o: 1 }, at: 600, dur: 600 }, { id: "fdad", to: { o: 1 }, at: 600, dur: 600 }, { id: "fgirl", to: { o: 1 }, at: 900, dur: 600 },
            { id: "fgirl", to: { y: "-2" }, at: 1800, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "بچه‌گربه‌ها دقیقاً مثل مادرشان‌اند؟",
        options: ["شبیه‌اند، ولی کمی فرق دارند", "دقیقاً مثل هم‌اند"], answer: "شبیه‌اند، ولی کمی فرق دارند" },
      { type: "pairs", prompt: "بچه هر کدام را پیدا کن", say: "هر بچه را به پدر یا مادرش برسان.",
        pairs: [
          [{ pic: "🐕", say: "سگ" }, { pic: "🐶", say: "توله‌سگ" }],
          [{ pic: "🐔", say: "مرغ" }, { pic: "🐥", say: "جوجه" }],
          [{ pic: "🌻", say: "آفتابگردان" }, { label: "جوانه آفتابگردان", pic: "🌱", say: "جوانه آفتابگردان" }],
          [{ pic: "🐄", say: "گاو" }, { label: "گوساله", pic: "🐮", say: "گوساله" }]
        ] },
      { type: "choose", prompt: "جوجه‌های یک مرغ همه یک‌جورند؟", say: "جوجه‌های یک مرغ همه دقیقاً یک‌جورند؟",
        options: ["نه، شبیه‌اند ولی کمی فرق دارند", "بله، دقیقاً یک‌جورند"], answer: "نه، شبیه‌اند ولی کمی فرق دارند" },
      { type: "choose", prompt: "دانه سیب را بکاریم، چه سبز می‌شود؟", say: "اگر دانه سیب را بکاریم، چه درختی سبز می‌شود؟", pic: true,
        options: [{ label: "🍎", value: "درخت سیب" }, { label: "🍊", value: "درخت پرتقال" }], answer: "درخت سیب" },
      { type: "home", pic: "📷 🌱", text: "شباهت‌ها و فرق‌ها را پیدا کن!",
        need: ["عکس‌های خانوادگی", "چند دانه لوبیا از یک بسته، کاشته در یک ظرف"],
        steps: [
          "با هم عکس کودک، پدر و مادر و پدربزرگ و مادربزرگ را ببینید: چشم‌ها، مو، لبخند. کجا شبیه‌اند؟ کجا فرق دارند؟",
          "دانه‌های یک بسته لوبیا را بکارید. وقتی سبز شدند، ببینید: همه شبیه‌اند؟ همه هم‌قدند؟",
          "اگر گربه یا سگی با بچه‌هایش دیدید، از دور شباهت‌ها و فرق‌ها را بشمارید.",
          "به کودک بگویید هر کسی شبیه خانواده‌اش است و در عین حال یکتاست."
        ],
        ask: "تو در چه چیزی شبیه پدر یا مادرت هستی؟" }
    ]
  },
  {
    id: "science-sprout-43", subject: "science", level: "sprout", emoji: "🐣", title: "پدر و مادرها مراقب‌اند",
    steps: [
      { type: "scene", prompt: "پدر و مادرها چه کار می‌کنند؟", bg: "#cdeaf7",
        /* Parents feed, warm and protect their young, and the young call for help: in the nest the chick calls with
           its beak wide open and its mother brings a worm; the hen gathers her chicks under her; the lamb bleats and
           its mother comes to it; Sara calls and her mother comes. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, tree: { art: "sci-tree", at: [52, 88], s: 1.15 },
          nestBack: { art: "sci-nest-back", at: [82, 44.5], s: 1.3 }, chick: { art: "sci-chick", at: [83, 43], s: 1.3 }, nest: { art: "sci-nest", at: [82, 44.5], s: 1.3 },
          n1: { art: "sci-note", at: [88, 34], s: 1, o: 0 },
          bird: { art: "sci-sparrow", at: [170, 10], s: 1.4, flip: true }, worm: { art: "sci-worm", at: [11, -8.6], s: 0.8, under: "bird" },
          bg2: { art: "sci-meadow", o: 0 },
          hen: { art: "🐔", at: [50, 86], s: 1.4, flip: true, o: 0 },
          c1: { art: "🐥", at: [20, 86], s: 0.45, o: 0 }, c2: { art: "🐥", at: [10, 86], s: 0.45, o: 0 }, c3: { art: "🐥", at: [0, 86], s: 0.45, o: 0 },
          sheep: { art: "sci-sheep", at: [150, 84], s: 1.5, o: 0 }, lamb: { art: "sci-sheep", at: [100, 84], s: 0.7, o: 0 }, baa: { art: "sci-waves", at: [92, 70], s: 0.6, flip: true, o: 0 },
          girl: { art: "👧", at: [40, 86], s: 1.2, o: 0 }, call: { art: "sci-waves", at: [46, 60], s: 0.8, o: 0 }, mom: { art: "👩", at: [180, 86], s: 1.1, flip: true, o: 0 }
        },
        scenes: [
          { caption: "جوجه گنجشک نوکش را باز می‌کند و جیک‌جیک می‌کند: یعنی گرسنه‌ام!", key: 1700, hold: 5000, do: [
            { cam: { x: 86, y: 40, zoom: 2.4 }, dur: 1000 },
            { id: "chick.beak", to: { r: 40 }, at: 900, dur: 3400, yoyo: true, times: 10 },
            { id: "n1", to: { o: 1 }, at: 1200, dur: 200 }, { id: "n1", path: "M88 34Q96 24 104 30", at: 1200, dur: 1800 }, { id: "n1", to: { o: 0 }, at: 2800, dur: 300 }
          ] },
          { caption: "مادرش برایش کرم می‌آورد و در دهانش می‌گذارد.", key: 3200, hold: 5600, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "bird.wing", to: { r: -40 }, dur: 3600, yoyo: true, times: 20 },
            { id: "bird", path: "M170 10Q130 4 98 40", dur: 2400 },
            { id: "chick.beak", to: { r: 40 }, at: 2200, dur: 600 },
            { id: "worm", to: { o: 0 }, at: 3000, dur: 300 }, { id: "chick.beak", to: { r: 0 }, at: 3300, dur: 400 },
            { id: "chick", to: { y: "-1.2" }, at: 3600, dur: 1200, yoyo: true, times: 2 }
          ] },
          { caption: "مرغ جوجه‌هایش را صدا می‌زند و آن‌ها را زیر بالش گرم نگه می‌دارد.", key: 4000, hold: 6000, do: [
            { id: "bg2", to: { o: 1 }, dur: 800 }, { id: "hen", to: { o: 1 }, at: 400, dur: 500 },
            { id: "c1", to: { o: 1 }, at: 600, dur: 300 }, { id: "c2", to: { o: 1 }, at: 600, dur: 300 }, { id: "c3", to: { o: 1 }, at: 600, dur: 300 },
            { id: "c1", path: "M20 86L46 86", at: 1200, dur: 2000, ease: "linear" }, { id: "c2", path: "M10 86L50 86", at: 1300, dur: 2400, ease: "linear" }, { id: "c3", path: "M0 86L54 86", at: 1400, dur: 2800, ease: "linear" },
            { id: "c1", to: { o: 0.25 }, at: 3200, dur: 400 }, { id: "c2", to: { o: 0.25 }, at: 3700, dur: 400 }, { id: "c3", to: { o: 0.25 }, at: 4200, dur: 400 },
            { id: "hen", to: { sy: 0.92 }, at: 4400, dur: 600 }
          ] },
          { caption: "بره بع‌بع می‌کند و مادرش پیش او می‌آید.", key: 3400, hold: 5600, do: [
            { id: "sheep", to: { o: 1 }, dur: 400 }, { id: "lamb", to: { o: 1 }, dur: 400 },
            { id: "baa", to: { o: 1 }, at: 600, dur: 100 }, { id: "baa", to: { s: 0.9 }, at: 700, dur: 1600, yoyo: true, times: 4 }, { id: "baa", to: { o: 0 }, at: 2400, dur: 300 },
            { id: "sheep", path: "M150 84L118 84", at: 1600, dur: 2200, ease: "linear" }, { id: "sheep", to: { y: "-1" }, at: 1600, dur: 2200, yoyo: true, times: 6 }
          ] },
          { caption: "ما هم وقتی کمک لازم داریم، پدر یا مادرمان را صدا می‌زنیم. سارا مادرش را صدا می‌زند و مادر می‌آید.", key: 4200, hold: 6400, do: [
            { id: "hen", to: { o: 0 }, dur: 500 }, { id: "c1", to: { o: 0 }, dur: 500 }, { id: "c2", to: { o: 0 }, dur: 500 }, { id: "c3", to: { o: 0 }, dur: 500 },
            { id: "sheep", to: { o: 0 }, dur: 500 }, { id: "lamb", to: { o: 0 }, dur: 500 },
            { id: "girl", to: { o: 1 }, at: 500, dur: 400 }, { id: "mom", to: { o: 1 }, at: 500, dur: 100 },
            { id: "call", to: { o: 1 }, at: 1000, dur: 100 }, { id: "call", to: { s: 1.1 }, at: 1100, dur: 1400, yoyo: true, times: 4 }, { id: "call", to: { o: 0 }, at: 2600, dur: 300 },
            { id: "mom", walk: [58, 86], at: 1600, dur: 3200, steps: 10 }
          ] }
        ],
        question: "مرغ جوجه‌ها را چطور گرم نگه می‌دارد؟",
        options: ["زیر بالش", "در آب", "روی درخت"], answer: "زیر بالش" },
      { type: "pairs", prompt: "پدر و مادرها چه کار می‌کنند؟", say: "هر کار را به جانوری که آن را انجام می‌دهد برسان.",
        pairs: [
          [{ pic: "🐦", say: "گنجشک" }, { label: "به جوجه کرم می‌دهد", say: "به جوجه کرم می‌دهد" }],
          [{ pic: "🐔", say: "مرغ" }, { label: "جوجه‌ها را زیر بال گرم می‌کند", say: "جوجه‌ها را زیر بال گرم می‌کند" }],
          [{ pic: "🐑", say: "گوسفند" }, { label: "به بره شیر می‌دهد", say: "به بره شیر می‌دهد" }],
          [{ pic: "🐈", say: "گربه" }, { label: "بچه‌اش را با دهان جابه‌جا می‌کند", say: "بچه‌اش را آرام با دهان جابه‌جا می‌کند" }]
        ] },
      { type: "pairs", prompt: "بچه‌ها چطور کمک می‌خواهند؟", say: "هر بچه را به صدایی که برای کمک می‌کند برسان.",
        pairs: [
          [{ pic: "🐥", say: "جوجه" }, { label: "جیک‌جیک", pic: "🔊", say: "جیک جیک" }],
          [{ pic: "🐑", say: "بره" }, { label: "بع‌بع", pic: "🔊", say: "بع بع" }],
          [{ pic: "🐱", say: "بچه‌گربه" }, { label: "میو", pic: "🔊", say: "میو" }]
        ] },
      { type: "choose", prompt: "جوجه گرسنه چه می‌کند؟", say: "جوجه وقتی گرسنه است چه کار می‌کند؟",
        options: ["جیک‌جیک می‌کند و نوکش را باز می‌کند", "ساکت می‌خوابد"], answer: "جیک‌جیک می‌کند و نوکش را باز می‌کند" },
      { type: "home", pic: "👪 💬", text: "بپرس: وقتی کوچولو بودم، چطور مراقبم بودید؟",
        need: ["کمی وقت برای حرف زدن", "عکس‌های نوزادی، اگر دارید"],
        steps: [
          "با کودک درباره روزهایی که نوزاد بود حرف بزنید: چطور به او غذا می‌دادید، گرمش می‌کردید و آرامش می‌کردید.",
          "اگر پدربزرگ یا مادربزرگ هست، از او هم بپرسید.",
          "در پارک ببینید پرنده‌ها یا گربه‌ها چطور مراقب بچه‌هایشان‌اند. از دور نگاه کنید.",
          "به کودک یادآوری کنید که هر وقت کمک لازم داشت، می‌تواند صدایتان بزند."
        ],
        ask: "وقتی کمک لازم داری، چه کسی را صدا می‌زنی؟" }
    ]
  },
  {
    id: "science-sprout-44", subject: "science", level: "sprout", emoji: "🌵", title: "از طبیعت یاد بگیر",
    steps: [
      { type: "scene", prompt: "آدم‌ها از طبیعت چه یاد گرفته‌اند؟", bg: "#cdeaf7",
        /* Ideas copied from nature: a pebble bounces off the tortoise's hard shell, and Arash's bicycle helmet
           protects his head the same way; a burr's tiny hooks catch in the sheep's wool, and a shoe's hook-and-loop
           strap closes the same way; a cactus fills up with rain and keeps the water inside. Drawings:
           js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" },
          tort: { art: "🐢", at: [40, 86], s: 1.6 }, pebble: { art: "sci-pebble", at: [40, 20], s: 1.6, o: 0 },
          boy: { art: "👦", at: [110, 86], s: 1.5, o: 0 }, helmet: { art: "sci-helmet", at: [111, 30], s: 1.1, o: 0 },
          sheep: { art: "sci-sheep", at: [56, 86], s: 1.8, o: 0 }, burr: { art: "sci-burr", at: [10, 60], s: 1.2, o: 0 },
          shoe: { art: "sci-shoe", at: [118, 84], s: 1.8, o: 0 },
          cactus: { art: "sci-cactus", at: [80, 86], s: 1.6, o: 0 }, rain: { art: "sci-rainfall", o: 0 }
        },
        scenes: [
          { caption: "لاک‌پشت لاک سفتی دارد. سنگ‌ریزه به لاکش خورد، ولی لاک‌پشت آسیبی ندید.", key: 1600, hold: 5000, do: [
            { id: "pebble", to: { o: 1 }, at: 400, dur: 100 }, { id: "pebble", path: "M40 20L40 70", at: 500, dur: 900, ease: "in" },
            { id: "pebble", path: "M40 70Q48 58 58 86", at: 1400, dur: 900 }
          ] },
          { caption: "آدم‌ها از روی لاک، کلاه ایمنی ساختند تا از سرشان محافظت کنند.", key: 2600, hold: 5000, do: [
            { id: "boy", to: { o: 1 }, dur: 500 },
            { id: "helmet", to: { o: 1 }, at: 600, dur: 300 }, { id: "helmet", path: "M111 30L110.9 55.7", at: 900, dur: 1200, ease: "out" }
          ] },
          { caption: "دانه‌های خاردار قلاب‌های ریزی دارند و به پشم گوسفند می‌چسبند.", key: 2600, hold: 5000, do: [
            { id: "tort", to: { o: 0 }, dur: 500 }, { id: "pebble", to: { o: 0 }, dur: 500 }, { id: "boy", to: { o: 0 }, dur: 500 }, { id: "helmet", to: { o: 0 }, dur: 500 },
            { id: "sheep", to: { o: 1 }, at: 500, dur: 500 },
            { id: "burr", to: { o: 1 }, at: 900, dur: 200 }, { id: "burr", path: "M10 60Q30 40 54 66", at: 1000, dur: 1200 },
            { id: "sheep", to: { r: 3 }, at: 2400, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "از روی آن‌ها چسب لباس را ساختند. با آن کفش را می‌بندیم.", key: 2400, hold: 5000, do: [
            { id: "shoe", to: { o: 1 }, dur: 500 }, { id: "shoe.strap", to: { r: -60 }, dur: 1 },
            { cam: { x: 118, y: 74, zoom: 2.6 }, at: 400, dur: 1000 },
            { id: "shoe.strap", to: { r: 0 }, at: 1600, dur: 800 }
          ] },
          { caption: "کاکتوس وقتی باران می‌آید، آب را در تنه‌اش نگه می‌دارد، مثل یک مخزن آب.", key: 4200, hold: 6400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 900 },
            { id: "sheep", to: { o: 0 }, dur: 500 }, { id: "burr", to: { o: 0 }, dur: 500 }, { id: "shoe", to: { o: 0 }, dur: 500 },
            { id: "cactus", to: { o: 1 }, at: 500, dur: 500 }, { id: "cactus.water", to: { sy: 0.1 }, dur: 1 },
            { id: "rain", to: { o: 1 }, at: 1000, dur: 400 }, { id: "rain", to: { y: "+12" }, at: 1000, dur: 600, ease: "linear", times: 5 }, { id: "rain", to: { o: 0 }, at: 4000, dur: 400 },
            { id: "cactus.water", to: { sy: 1 }, at: 1400, dur: 3000 }
          ] }
        ],
        question: "کلاه ایمنی را از روی چه چیزی ساخته‌اند؟", pic: true,
        options: [{ label: "🐢", value: "لاک لاک‌پشت" }, { label: "🌸", value: "گل" }], answer: "لاک لاک‌پشت" },
      { type: "pairs", prompt: "این فکر را از کجا گرفته‌اند؟", say: "هر ساخته آدم‌ها را به جانور یا گیاهی که از آن یاد گرفته‌اند برسان.",
        pairs: [
          [{ pic: "🐢", say: "لاک‌پشت" }, { label: "کلاه ایمنی", pic: "⛑️", say: "کلاه ایمنی" }],
          [{ label: "دانه خاردار", pic: "🌰", say: "دانه خاردار" }, { label: "چسب لباس", pic: "👟", say: "چسب لباس" }],
          [{ pic: "🌵", say: "کاکتوس" }, { label: "مخزن آب", pic: "💧", say: "مخزن آب" }],
          [{ pic: "🐦", say: "پرنده" }, { label: "هواپیما", say: "هواپیما" }]
        ] },
      { type: "choose", prompt: "چسب لباس را از روی چه ساخته‌اند؟", say: "چسب لباس را از روی چه ساخته‌اند؟",
        options: ["دانه‌های خاردار", "سنگ"], answer: "دانه‌های خاردار" },
      { type: "choose", prompt: "کاکتوس آب را کجا نگه می‌دارد؟", say: "کاکتوس آب باران را کجا نگه می‌دارد؟",
        options: ["در تنه‌اش", "در گلش"], answer: "در تنه‌اش" },
      { type: "home", pic: "🔍 💡", text: "از طبیعت یک فکر بگیر و چیزی بساز!",
        need: ["چیزهایی از طبیعت: برگ، پر، پوست گردو، دانه", "کاغذ، مقوا و چسب"],
        steps: [
          "در پارک با هم چیزهای طبیعت را از نزدیک ببینید: پر سبک است، پوست گردو سفت است، برگ نیلوفر آب را پس می‌زند.",
          "بپرسید: «اگر بخواهیم چیزی بسازیم که مثل این باشد، چه می‌سازیم؟»",
          "کودک یک فکر را نقاشی کند، مثلاً کلاهی مثل لاک یا چتری مثل برگ.",
          "اگر شد، با مقوا و کاغذ آن را بسازید و امتحان کنید."
        ],
        ask: "تو از کدام جانور یا گیاه فکر گرفتی؟" }
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
    id: "science-sprout-26", subject: "science", level: "sprout", emoji: "☂️", title: "کدام جنس برای کدام کار؟",
    steps: [
      { type: "test", kind: "waterproof", prompt: "اول حدس بزن، بعد امتحان کن: روی هر کدام آب می‌ریزیم.",
        items: [
          { pic: "📄", say: "کاغذ", yes: false },
          { pic: "🛍️", say: "کیسه پلاستیکی", yes: true },
          { pic: "🧦", say: "پارچه نخی", yes: false },
          { pic: "☂️", say: "پارچه چتر", yes: true },
          { pic: "🧽", say: "اسفنج", yes: false }
        ] },
      { type: "sort", prompt: "خم می‌شود یا نه؟", say: "اگر با دست فشارش بدهیم، کدام خم می‌شود یا کش می‌آید و کدام سفت می‌ماند؟",
        baskets: [{ label: "خم می‌شود یا کش می‌آید", pic: "🎈", value: "bends" }, { label: "سفت می‌ماند", pic: "🧱", value: "stiff" }],
        items: [
          { pic: "📄", say: "کاغذ", basket: "bends" },
          { pic: "🎈", say: "بادکنک", basket: "bends" },
          { pic: "🧶", say: "کاموا", basket: "bends" },
          { pic: "🪨", say: "سنگ", basket: "stiff" },
          { pic: "🧱", say: "آجر", basket: "stiff" },
          { pic: "🍽️", say: "بشقاب چینی", basket: "stiff" }
        ] },
      { type: "choose", prompt: "بارانی را از چه جنسی بسازیم؟", say: "می‌خواهیم یک بارانی بسازیم که خیس نشویم. از چه جنسی بسازیم؟", pic: true,
        options: [{ label: "🛍️", value: "پلاستیک" }, { label: "📄", value: "کاغذ" }], answer: "پلاستیک" },
      { type: "choose", prompt: "پنجره را از چه بسازیم که نور رد شود؟", say: "پنجره را از چه بسازیم که نور از آن رد شود و باد نیاید؟", pic: true,
        options: [{ label: "🪟", value: "شیشه" }, { label: "🪵", value: "چوب" }], answer: "شیشه" },
      { type: "choose", prompt: "قاشق از کدام جنس بهتر است؟", say: "قاشق باید محکم باشد و در آب خراب نشود. از کدام جنس بهتر است؟", pic: true,
        options: [{ label: "🥄", value: "فلز" }, { label: "📄", value: "کاغذ" }], answer: "فلز" },
      { type: "home", pic: "💧 🧪", text: "کدام جنس آب را رد نمی‌کند؟ امتحان کن!",
        need: ["چند تکه کوچک: کاغذ، دستمال، کیسه پلاستیکی، پارچه، فویل", "یک لیوان کوچک آب و یک قاشق", "یک کاسه"],
        steps: [
          "هر تکه را روی دهانه کاسه بگذارید.",
          "پیش از هر بار، کودک حدس بزند: «آب از آن رد می‌شود؟» حدسش را بنویسید.",
          "یک قاشق آب رویش بریزید. آب از آن رد شد و در کاسه چکید؟",
          "هر تکه را هم خم کنید، بپیچانید و بکشید: کدام کش می‌آید؟ کدام پاره می‌شود؟",
          "در آخر بپرسید: «برای بارانی کدام بهتر است؟ برای کیسه خرید کدام؟»"
        ],
        ask: "کدام جنس آب را رد نکرد؟ برای چه کاری خوب است؟" }
    ]
  },
  {
    id: "science-sprout-27", subject: "science", level: "sprout", emoji: "🧺", title: "بازی جنس‌ها",
    steps: [
      { type: "sort", prompt: "از چه ساخته شده؟", say: "هر چیز را در سبد جنسش بگذار: چوب، فلز یا پلاستیک.",
        baskets: [{ label: "چوب", pic: "🪵", value: "wood" }, { label: "فلز", pic: "🔩", value: "metal" }, { label: "پلاستیک", pic: "🧴", value: "plastic" }],
        items: [
          { pic: "🪑", say: "صندلی چوبی", basket: "wood" },
          { pic: "✏️", say: "مداد", basket: "wood" },
          { pic: "🥄", say: "قاشق فلزی", basket: "metal" },
          { pic: "🔑", say: "کلید", basket: "metal" },
          { pic: "🪣", say: "سطل پلاستیکی", basket: "plastic" },
          { pic: "🛍️", say: "کیسه پلاستیکی", basket: "plastic" }
        ] },
      { type: "pairs", prompt: "هر جنس چه ویژگی‌ای دارد؟", say: "هر جنس را به ویژگی‌اش برسان.",
        pairs: [
          [{ label: "شیشه", pic: "🪟", say: "شیشه" }, { label: "نور از آن رد می‌شود", say: "نور از آن رد می‌شود" }],
          [{ label: "پلاستیک", pic: "🛍️", say: "پلاستیک" }, { label: "آب را رد نمی‌کند", say: "آب را رد نمی‌کند" }],
          [{ label: "پشم", pic: "🧶", say: "پشم" }, { label: "گرم نگه می‌دارد", say: "ما را گرم نگه می‌دارد" }],
          [{ label: "سنگ", pic: "🪨", say: "سنگ" }, { label: "سفت است", say: "سفت است" }]
        ] },
      { type: "sort", prompt: "جامد یا مایع؟", say: "جامدها یک طرف، مایع‌ها یک طرف.",
        baskets: [{ label: "جامد", pic: "🧱", value: "solid" }, { label: "مایع", pic: "💧", value: "liquid" }],
        items: [
          { pic: "🔑", say: "کلید", basket: "solid" },
          { pic: "🍎", say: "سیب", basket: "solid" },
          { pic: "🥛", say: "شیر", basket: "liquid" },
          { pic: "🍵", say: "چای", basket: "liquid" }
        ] },
      { type: "sort", prompt: "داغ یا سرد؟", say: "داغ‌ها یک طرف، سردها یک طرف.",
        baskets: [{ label: "داغ", pic: "☕", value: "hot" }, { label: "سرد", pic: "🧊", value: "cold" }],
        items: [
          { pic: "🍲", say: "آش داغ", basket: "hot" },
          { pic: "☕", say: "چای داغ", basket: "hot" },
          { pic: "🍦", say: "بستنی", basket: "cold" },
          { pic: "⛄", say: "آدم‌برفی", basket: "cold" }
        ] },
      { type: "home", pic: "🔍 🏠", text: "در خانه جنس چیزها را پیدا کن!",
        need: ["چیزهای خانه"],
        steps: [
          "با هم در خانه بگردید: یک چیز چوبی، یک چیز فلزی، یک چیز پلاستیکی، یک چیز شیشه‌ای و یک چیز پارچه‌ای پیدا کنید.",
          "برای هر کدام بپرسید: «چرا این را از این جنس ساخته‌اند؟»",
          "یک چیز جامد و یک چیز مایع در آشپزخانه پیدا کنید.",
          "به چیزهای داغ و تیز دست نزنید."
        ],
        ask: "چرا لیوان را از شیشه می‌سازند؟" }
    ]
  },
  {
    id: "science-sprout-31", subject: "science", level: "sprout", emoji: "💡", title: "از گذشته تا آینده",
    steps: [
      { type: "scene", prompt: "وسیله‌ها چطور عوض شده‌اند؟", bg: "#f6efdc",
        /* Then and now, three times: a dim room lit by an oil lamp with a flickering flame, then a bright lamp; a
           horse pulling a cart slowly along the road, then a car going fast; clothes rubbed by hand in a basin, then
           a washing machine with its drum turning. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, table: { art: "sci-longtable", at: [-20, 10] },
          oil: { art: "sci-oillamp", at: [60, 66], s: 1.4 }, dim: { art: "sci-night", o: 0.5 },
          bulb: { art: "💡", at: [80, 30], s: 0.8, o: 0 }, glow: { art: "sci-lightspot", at: [80, 22], s: 3, o: 0 },
          out: { art: "sci-meadow", o: 0 }, road: { art: "sci-ground", o: 0 },
          cart: { art: "sci-horsecart", at: [-40, 86], s: 1.2, o: 0 }, horse: { art: "🐴", at: [-13, 86], s: 1.3, flip: true, o: 0 },
          car: { art: "🚗", at: [-30, 86], s: 1.4, flip: true, o: 0 },
          room2: { art: "sci-room", o: 0 }, tub: { art: "sci-washtub", at: [48, 86], s: 1.4, o: 0 }, hand: { art: "hand", at: [48, 52], r: 180, s: 0.7, o: 0 },
          washer: { art: "sci-washer", at: [116, 86], s: 1.5, o: 0 }
        },
        scenes: [
          { caption: "در گذشته، شب‌ها خانه را با چراغ روغنی روشن می‌کردند. نورش کم بود.", key: 2400, do: [
            { id: "oil.flame", to: { sx: 0.8, sy: 1.15 }, dur: 600, yoyo: true, times: 6 }
          ] },
          { caption: "حالا لامپ داریم. با زدن یک کلید، اتاق روشن می‌شود.", key: 2000, do: [
            { id: "bulb", to: { o: 1 }, at: 400, dur: 300 }, { id: "glow", to: { o: 0.6 }, at: 700, dur: 300 }, { id: "dim", to: { o: 0 }, at: 700, dur: 400 }
          ] },
          { caption: "در گذشته مردم با گاری و اسب سفر می‌کردند. آهسته می‌رفت.", key: 3400, hold: 6400, do: [
            { id: "out", to: { o: 1 }, dur: 700 }, { id: "road", to: { o: 1 }, dur: 700 },
            { id: "cart", to: { o: 1 }, at: 500, dur: 300 }, { id: "horse", to: { o: 1 }, at: 500, dur: 300 },
            { id: "cart", path: "M-40 86L80 86", at: 800, dur: 5400, ease: "linear" }, { id: "horse", path: "M-13 86L107 86", at: 800, dur: 5400, ease: "linear" },
            { id: "cart.wheel", to: { r: 720 }, at: 800, dur: 5400, ease: "linear" }, { id: "horse", to: { y: "-1" }, at: 800, dur: 5400, yoyo: true, times: 18 }
          ] },
          { caption: "حالا ماشین داریم که خیلی تندتر می‌رود.", key: 1200, hold: 4400, do: [
            { id: "cart", to: { o: 0 }, dur: 400 }, { id: "horse", to: { o: 0 }, dur: 400 },
            { id: "car", to: { o: 1 }, at: 300, dur: 100 }, { id: "car", path: "M-30 86L200 86", at: 400, dur: 1800, ease: "in" }
          ] },
          { caption: "در گذشته لباس‌ها را با دست می‌شستند. حالا ماشین لباسشویی می‌شوید.", key: 3600, hold: 6400, do: [
            { id: "room2", to: { o: 1 }, dur: 700 }, { id: "tub", to: { o: 1 }, at: 400, dur: 400 }, { id: "hand", to: { o: 1 }, at: 400, dur: 400 },
            { id: "hand", to: { x: 54 }, at: 800, dur: 1800, yoyo: true, times: 6 }, { id: "tub.cloth", to: { x: 5 }, at: 800, dur: 1800, yoyo: true, times: 6 },
            { id: "washer", to: { o: 1 }, at: 2600, dur: 500 }, { id: "washer.drum", to: { r: 1080 }, at: 3000, dur: 3200, ease: "linear" }
          ] }
        ],
        question: "در گذشته خانه را با چه روشن می‌کردند؟",
        options: ["با چراغ روغنی", "با لامپ"], answer: "با چراغ روغنی" },
      { type: "order", prompt: "از گذشته تا حالا بچین", say: "اول مردم پیاده می‌رفتند، بعد با اسب و گاری، و حالا با ماشین. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🚶", say: "پیاده" }, { pic: "🐴", say: "با اسب و گاری" }, { pic: "🚗", say: "با ماشین" }] },
      { type: "pairs", prompt: "گذشته و حالا", say: "هر وسیله قدیمی را به وسیله امروزی‌اش برسان.",
        pairs: [
          [{ pic: "🕯️", say: "شمع" }, { pic: "💡", say: "لامپ" }],
          [{ pic: "🐴", say: "گاری اسبی" }, { pic: "🚗", say: "ماشین" }],
          [{ label: "شستن با دست", pic: "🧺", say: "شستن با دست" }, { label: "ماشین لباسشویی", say: "ماشین لباسشویی" }],
          [{ pic: "✉️", say: "نامه" }, { pic: "📱", say: "تلفن همراه" }]
        ] },
      { type: "choose", prompt: "در گذشته لباس‌ها را چطور می‌شستند؟", say: "در گذشته لباس‌ها را چطور می‌شستند؟",
        options: ["با دست", "با ماشین لباسشویی"], answer: "با دست" },
      { type: "home", pic: "👵 📻", text: "از پدربزرگ یا مادربزرگ بپرس: آن موقع چطور بود؟",
        need: ["یک بزرگ‌تر خانواده برای گفت‌وگو", "کاغذ و مداد"],
        steps: [
          "از پدربزرگ، مادربزرگ یا یک بزرگ‌تر بپرسید: «وقتی بچه بودید، خانه را با چه روشن می‌کردید؟ با چه سفر می‌کردید؟ لباس‌ها را چطور می‌شستید؟»",
          "اگر وسیله قدیمی در خانه دارید، مثل چراغ، رادیو یا اتو، با هم ببینید.",
          "کودک یک وسیله قدیمی و همان وسیله امروزی را کنار هم نقاشی کند.",
          "بپرسید: «فکر می‌کنی در آینده این وسیله چه شکلی می‌شود؟»"
        ],
        ask: "کدام وسیله از گذشته تا حالا بیشتر عوض شده؟" }
    ]
  },
  {
    id: "science-sapling-9", subject: "science", level: "sapling", emoji: "⚖️", title: "زنگ علوم: فقط یک چیز را عوض کن",
    steps: [
      { type: "scene", prompt: "آزمایش منصفانه", bg: "#f6efdc",
        /* A fair test: which soaks up more water, a cloth towel or a paper towel? Two glasses with the same water, two
           strips of the same size, dipped at the same moment for the same count of ten; only the material differs.
           The glass the cloth was in has less water left. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          gA: { art: "sci-tumbler", at: [56, 72], s: 1.6 }, gB: { art: "sci-tumbler", at: [104, 72], s: 1.6 },
          sA: { art: "sci-strip", at: [56, 14], s: 1.6, look: { fill: "#e46b8a" }, o: 0 }, sB: { art: "sci-strip", at: [104, 14], s: 1.6, look: { fill: "#fffdf6" }, o: 0 },
          eq: { art: "sci-ring", at: [80, 60], s: 1, o: 0 },
          count: { art: "counter", at: [80, 30], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "سؤال: کدام آب بیشتری جذب می‌کند، حوله پارچه‌ای یا دستمال کاغذی؟", key: 2000, hold: 6000, do: [
            { id: "sA", to: { o: 1 }, at: 400, dur: 400 }, { id: "sB", to: { o: 1 }, at: 800, dur: 400 }
          ] },
          { caption: "برای اینکه آزمایش منصفانه باشد، همه چیز را یکسان می‌گذاریم: لیوان‌ها و آبشان، اندازه تکه‌ها و زمان. فقط جنس حوله فرق دارد.", key: 2600, hold: 8000, do: [
            { id: "gA.water", to: { sy: 0.9 }, dur: 1 }, { id: "gB.water", to: { sy: 0.9 }, dur: 1 },
            { id: "gA", to: { s: 1.7 }, at: 600, dur: 500, yoyo: true, times: 2 }, { id: "gB", to: { s: 1.7 }, at: 600, dur: 500, yoyo: true, times: 2 },
            { id: "sA", to: { sy: 1.75 }, at: 2200, dur: 500, yoyo: true, times: 2 }, { id: "sB", to: { sy: 1.75 }, at: 2200, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "هر دو را با هم در آب گذاشتیم و تا ده شمردیم.", key: 4400, hold: 6000, do: [
            { id: "sA", path: "M56 14L56 34", dur: 700 }, { id: "sB", path: "M104 14L104 34", dur: 700 },
            { id: "count", to: { o: 1 }, at: 600, dur: 200 },
            { count: "count", from: 1, to: 1, at: 1050, dur: 1 },
            { count: "count", from: 2, to: 2, at: 1400, dur: 1 },
            { count: "count", from: 3, to: 3, at: 1750, dur: 1 },
            { count: "count", from: 4, to: 4, at: 2100, dur: 1 },
            { count: "count", from: 5, to: 5, at: 2450, dur: 1 },
            { count: "count", from: 6, to: 6, at: 2800, dur: 1 },
            { count: "count", from: 7, to: 7, at: 3150, dur: 1 },
            { count: "count", from: 8, to: 8, at: 3500, dur: 1 },
            { count: "count", from: 9, to: 9, at: 3850, dur: 1 },
            { count: "count", from: 10, to: 10, at: 4200, dur: 1 }
          ] },
          { caption: "تکه‌ها را بیرون آوردیم. آب لیوانی که حوله پارچه‌ای در آن بود بیشتر کم شد: حوله پارچه‌ای آب بیشتری جذب کرد!", key: 2800, hold: 7000, do: [
            { id: "count", to: { o: 0 }, dur: 300 },
            { id: "sA", path: "M56 34L56 10", dur: 800 }, { id: "sB", path: "M104 34L104 10", dur: 800 },
            { id: "gA.water", to: { sy: 0.45 }, at: 400, dur: 900 }, { id: "gB.water", to: { sy: 0.75 }, at: 400, dur: 900 },
            { emit: "drop", where: [56, 42], spread: [2, 2], rise: -4, n: 6, at: 1200, dur: 1400, life: 500 }
          ] }
        ],
        question: "در این آزمایش، کدام چیز را عوض کردیم؟",
        options: ["فقط جنس حوله", "اندازه لیوان‌ها", "مقدار آب"], answer: "فقط جنس حوله" },
      { type: "order", prompt: "کار دانشمند را به ترتیب بچین", say: "اول می‌پرسیم، بعد حدس می‌زنیم، بعد همه چیز را جز یکی یکسان می‌کنیم، امتحان می‌کنیم و نتیجه را می‌نویسیم.", numbered: true,
        items: [{ pic: "❓", label: "سؤال", say: "سؤال می‌پرسیم" }, { pic: "💭", label: "حدس", say: "حدس می‌زنیم" }, { pic: "⚖️", label: "یکسان کردن", say: "همه چیز را جز یکی یکسان می‌کنیم" }, { pic: "✋", label: "امتحان", say: "امتحان می‌کنیم" }, { pic: "📝", label: "نتیجه", say: "نتیجه را می‌نویسیم" }] },
      { type: "choose", prompt: "کدام آزمایش منصفانه است؟", say: "می‌خواهیم ببینیم کدام توپ بیشتر بالا می‌پرد. کدام آزمایش منصفانه است؟",
        options: ["هر دو توپ را از یک بلندی رها کنیم", "یکی را از بالای میز و یکی را از روی زمین رها کنیم"], answer: "هر دو توپ را از یک بلندی رها کنیم" },
      { type: "choose", prompt: "اگر یکی از تکه‌ها بزرگ‌تر بود چه؟", say: "اگر تکه حوله پارچه‌ای دو برابر بزرگ‌تر بود، آزمایش منصفانه بود؟",
        options: ["نه، چون دو چیز فرق داشت", "بله، فرقی نمی‌کند"], answer: "نه، چون دو چیز فرق داشت" },
      { type: "home", pic: "🧻 🥛", text: "خودت یک آزمایش منصفانه انجام بده!",
        need: ["دو لیوان هم‌اندازه", "آب", "یک تکه حوله و یک تکه دستمال کاغذی هم‌اندازه", "قیچی (فقط بزرگ‌تر)"],
        steps: [
          "بزرگ‌تر دو تکه هم‌اندازه از حوله و دستمال کاغذی ببرد.",
          "در هر لیوان به یک اندازه آب بریزید. کودک حدس بزند کدام آب بیشتری جذب می‌کند.",
          "هر دو تکه را با هم در آب بگذارید، تا ده بشمارید و با هم بیرون بیاورید.",
          "ببینید آب کدام لیوان بیشتر کم شده. نتیجه را بنویسید.",
          "بپرسید: «چه چیزهایی را یکسان نگه داشتیم؟ چه چیزی را عوض کردیم؟»"
        ],
        ask: "اگر یکی را بیشتر در آب نگه می‌داشتیم، آزمایش منصفانه بود؟" }
    ]
  },
  {
    id: "science-sapling-10", subject: "science", level: "sapling", emoji: "📏", title: "اندازه بگیر: طول و جرم",
    steps: [
      { type: "measure", tool: "ruler", value: 7, pic: "✏️", max: 15, options: [6, 7, 8], prompt: "این مداد چند سانتی‌متر است؟", say: "مداد را کنار خط‌کش گذاشته‌ایم. از صفر شروع کن. مداد چند سانتی‌متر است؟" },
      { type: "measure", tool: "ruler", value: 4, pic: "🍃", max: 10, options: [3, 4, 5], prompt: "این برگ چند سانتی‌متر است؟", say: "این برگ چند سانتی‌متر است؟" },
      { type: "measure", tool: "ruler", value: 9, max: 15, ask: "set", prompt: "یک نوار ۹ سانتی‌متری بساز.", say: "نوار را آن‌قدر دراز کن که ۹ سانتی‌متر شود. بعد بزن روی درست شد." },
      { type: "balance", ask: "heavier", left: [{ pic: "🍎", mass: 150, say: "سیب" }], right: [{ pic: "🍓", mass: 20, say: "توت‌فرنگی" }], unit: "گرم", prompt: "کدام سنگین‌تر است؟ روی کفه سنگین‌تر بزن." },
      { type: "balance", tray: [100, 50, 50, 20], left: [{ pic: "🍐", mass: 150, label: "؟", say: "گلابی" }], open: "right", unit: "گرم",
        prompt: "وزنه‌ها را در کفه دیگر بگذار تا ترازو صاف شود.", question: "گلابی چند گرم است؟", options: [120, 150, 200], answer: 150 },
      { type: "choose", prompt: "چرا دو بار اندازه می‌گیریم؟", say: "دانشمندها معمولاً دو بار اندازه می‌گیرند. چرا؟",
        options: ["تا مطمئن شویم درست اندازه گرفته‌ایم", "چون اندازه اول همیشه غلط است"], answer: "تا مطمئن شویم درست اندازه گرفته‌ایم" },
      { type: "home", pic: "📏 ⚖️", text: "چیزهای خانه را اندازه بگیر!",
        need: ["یک خط‌کش یا متر", "ترازوی آشپزخانه، اگر دارید", "کاغذ و مداد"],
        steps: [
          "طول مداد، قاشق، کتاب و کف دست کودک را با خط‌کش اندازه بگیرید. یادآوری کنید که از صفر خط‌کش شروع کند.",
          "هر کدام را دو بار اندازه بگیرید: هر دو بار یک عدد شد؟",
          "اگر ترازوی آشپزخانه دارید، یک سیب، یک پرتقال و یک کتاب را وزن کنید. اول حدس بزنید کدام سنگین‌تر است.",
          "عددها را در یک جدول بنویسید."
        ],
        ask: "بلندترین چیزی که اندازه گرفتی چند سانتی‌متر بود؟" }
    ]
  },
  {
    id: "science-sapling-11", subject: "science", level: "sapling", emoji: "🌡️", title: "حجم و دما",
    steps: [
      { type: "measure", tool: "jug", value: 400, options: [300, 400, 500], prompt: "در پیمانه چند میلی‌لیتر آب هست؟", say: "به سطح آب نگاه کن. کدام خط کنارش است؟ چند میلی‌لیتر آب هست؟" },
      { type: "measure", tool: "jug", value: 250, ask: "set", prompt: "۲۵۰ میلی‌لیتر آب در پیمانه بریز.", say: "آب را آن‌قدر بالا ببر که به ۲۵۰ میلی‌لیتر برسد. بعد بزن روی درست شد." },
      { type: "measure", tool: "thermometer", value: 20, options: [10, 20, 30], prompt: "دماسنج چند درجه را نشان می‌دهد؟", say: "نوک خط قرمز کجاست؟ دماسنج چند درجه را نشان می‌دهد؟" },
      { type: "measure", tool: "thermometer", value: 35, ask: "set", snap: 5, prompt: "دماسنج را روی ۳۵ درجه بگذار: یک روز گرم تابستان.", say: "یک روز گرم تابستان، هوا ۳۵ درجه است. خط قرمز را روی ۳۵ بگذار." },
      { type: "choose", prompt: "کدام گرم‌تر است؟", say: "کدام گرم‌تر است: هوای ۳۰ درجه یا هوای ۵ درجه؟",
        options: ["۳۰ درجه", "۵ درجه"], answer: "۳۰ درجه" },
      { type: "choose", prompt: "آب در چند درجه یخ می‌زند؟", say: "آب در چند درجه یخ می‌زند؟",
        options: ["صفر درجه", "۵۰ درجه"], answer: "صفر درجه" },
      { type: "home", pic: "🥛 🌡️", text: "پیمانه و دماسنج خانه را امتحان کن!",
        need: ["یک پیمانه یا لیوان مدرج آشپزخانه", "آب", "دماسنج خانه یا دماسنج بیرون پنجره، اگر دارید"],
        steps: [
          "با پیمانه ۲۰۰ میلی‌لیتر آب بردارید و در یک لیوان بریزید. لیوان پر شد؟ چند لیوان یک لیتر می‌شود؟",
          "کودک بخواند پیمانه چه عددی را نشان می‌دهد. چشمش را هم‌سطح آب بگیرد.",
          "اگر دماسنج دارید، صبح و ظهر دمای هوا را بخوانید و بنویسید.",
          "دماسنج تب را به عنوان اسباب‌بازی ندهید؛ اگر شیشه‌ای است، فقط بزرگ‌تر با آن کار کند."
        ],
        ask: "دمای هوا ظهر بیشتر بود یا صبح؟" }
    ]
  },
  {
    id: "science-sapling-12", subject: "science", level: "sapling", emoji: "📊", title: "نتیجه را بنویس",
    steps: [
      { type: "chart", make: true, title: "چند قاشق آب جذب کرد؟", prompt: "هر قاشق آبی که جذب شد را در ستون خودش بگذار.", say: "حوله پارچه‌ای پنج قاشق آب جذب کرد، دستمال کاغذی سه قاشق، و پلاستیک هیچ. هر قاشق را در ستون خودش بگذار.",
        rows: [{ label: "حوله", pic: "🧺", n: 5 }, { label: "دستمال", pic: "🧻", n: 3 }, { label: "پلاستیک", pic: "🛍️", n: 0 }],
        question: "کدام بیشتر از همه آب جذب کرد؟", options: [{ label: "حوله", value: "🧺" }, { label: "دستمال", value: "🧻" }, { label: "پلاستیک", value: "🛍️" }], answer: "🧺" },
      { type: "chart", bars: true, title: "قد لوبیا (سانتی‌متر)", say: "این نمودار قد گیاه لوبیا را در چهار هفته نشان می‌دهد.",
        rows: [{ label: "هفته ۱", pic: "🌱", n: 2 }, { label: "هفته ۲", pic: "🌱", n: 5 }, { label: "هفته ۳", pic: "🌱", n: 8 }, { label: "هفته ۴", pic: "🌱", n: 11 }],
        question: "در هفته سوم قد لوبیا چند سانتی‌متر بود؟", options: [5, 8, 11], answer: 8 },
      { type: "chart", bars: true, title: "قد لوبیا (سانتی‌متر)",
        rows: [{ label: "هفته ۱", pic: "🌱", n: 2 }, { label: "هفته ۲", pic: "🌱", n: 5 }, { label: "هفته ۳", pic: "🌱", n: 8 }, { label: "هفته ۴", pic: "🌱", n: 11 }],
        question: "گیاه هفته به هفته چه شد؟", options: ["بلندتر شد", "کوتاه‌تر شد", "همان‌قدر ماند"], answer: "بلندتر شد" },
      { type: "choose", prompt: "چرا نتیجه را می‌نویسیم؟", say: "چرا نتیجه آزمایش را در جدول می‌نویسیم؟",
        options: ["تا یادمان نرود و بتوانیم مقایسه کنیم", "چون نوشتن قشنگ است"], answer: "تا یادمان نرود و بتوانیم مقایسه کنیم" },
      { type: "paper", pic: "📝 📊", text: "نتیجه یک آزمایش را در جدول بنویس و یک نمودار تصویری بکش.",
        check: ["جدول دو ستون دارد: چه چیزی و چقدر؟", "عددها را درست نوشت؟", "برای هر عدد به همان تعداد شکل کشید؟", "گفت نمودار چه چیزی را نشان می‌دهد؟"],
        note: "از آزمایش حوله‌ها (درس «فقط یک چیز را عوض کن») یا آزمایش دیگری استفاده کنید. مثلاً: هر حوله چند قاشق آب جذب کرد؟ کودک برای هر قاشق یک قطره بکشد." }
    ]
  },
  {
    id: "science-sapling-41", subject: "science", level: "sapling", emoji: "🎈", title: "جامد، مایع، گاز",
    steps: [
      { type: "scene", prompt: "سه حالت ماده", bg: "#f6efdc",
        /* A spoon (solid) keeps its shape in a glass or a bowl; water (liquid) takes the shape of the glass and then
           of the bowl it is poured into; air (gas) fills a balloon as it is blown up; the smell of fresh bread spreads
           across the whole room to Reza at the far end. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, table: { art: "sci-longtable", at: [-20, 10] },
          spoon: { art: "sci-spoon", at: [24, 52], s: 1.1 },
          glass: { art: "sci-tumbler", at: [50, 66], s: 1.2 }, bowl: { art: "sci-wbowl", at: [86, 66], s: 1.3 },
          balloon: { art: "sci-balloon", at: [104, 62], s: 0.3, o: 0 },
          bread: { art: "🍞", at: [30, 66], s: 0.8, o: 0 },
          sm1: { art: "sci-scent", at: [36, 50], s: 1.2, o: 0 }, sm2: { art: "sci-scent", at: [60, 44], s: 1.2, o: 0 }, sm3: { art: "sci-scent", at: [86, 50], s: 1.2, o: 0 }, sm4: { art: "sci-scent", at: [110, 44], s: 1.2, o: 0 },
          boy: { art: "👦", at: [140, 87], s: 1.3, flip: true, o: 0 }
        },
        scenes: [
          { caption: "قاشق جامد است. هر جا بگذاریمش، شکل خودش را نگه می‌دارد.", key: 3800, hold: 5600, do: [
            { id: "spoon", path: "M24 52Q36 30 50 48", at: 400, dur: 1200 },
            { id: "spoon", path: "M50 48Q68 28 86 52", at: 2200, dur: 1200 }, { id: "spoon", to: { r: 30 }, at: 2200, dur: 1200 }
          ] },
          { caption: "آب مایع است. در لیوان شکل لیوان را دارد. در کاسه شکل کاسه را می‌گیرد.", key: 4400, hold: 6400, do: [
            { id: "spoon", to: { o: 0 }, dur: 400 },
            { id: "bowl.water", to: { sy: 0 }, dur: 1 },
            { id: "glass", path: "M50 66Q56 44 70 40", at: 600, dur: 900 }, { id: "glass", to: { r: 100 }, at: 1500, dur: 700 },
            { emit: "drop", where: [87, 44], spread: [1, 2], rise: -8, n: 14, at: 2000, dur: 1800, life: 500 },
            { id: "glass.water", to: { sy: 0 }, at: 2000, dur: 1800 }, { id: "bowl.water", to: { sy: 1 }, at: 2200, dur: 1800 },
            { id: "glass", to: { r: 0 }, at: 4100, dur: 500 }, { id: "glass", path: "M70 40Q56 44 50 66", at: 4600, dur: 800 }
          ] },
          { caption: "هوا گاز است. گاز همه جای ظرفش را پر می‌کند: هرچه بادکنک را باد کنیم، هوا همه‌اش را پر می‌کند.", key: 3600, hold: 6400, do: [
            { id: "balloon", to: { o: 1 }, dur: 300 },
            { id: "balloon", to: { s: 0.8 }, at: 400, dur: 1000 }, { id: "balloon", to: { s: 1.3 }, at: 1600, dur: 1000 }, { id: "balloon", to: { s: 1.8 }, at: 2800, dur: 1000 }
          ] },
          { caption: "بوی نان تازه هم گاز است. در همه اتاق پخش می‌شود و به آن طرف اتاق هم می‌رسد.", key: 4600, hold: 7000, do: [
            { id: "balloon", to: { o: 0 }, dur: 400 }, { id: "bread", to: { o: 1 }, dur: 400 }, { id: "boy", to: { o: 1 }, dur: 400 },
            { id: "sm1", to: { o: 1 }, at: 600, dur: 100 }, { id: "sm1", draw: true, at: 600, dur: 900 },
            { id: "sm2", to: { o: 1 }, at: 1400, dur: 100 }, { id: "sm2", draw: true, at: 1400, dur: 900 },
            { id: "sm3", to: { o: 1 }, at: 2200, dur: 100 }, { id: "sm3", draw: true, at: 2200, dur: 900 },
            { id: "sm4", to: { o: 1 }, at: 3000, dur: 100 }, { id: "sm4", draw: true, at: 3000, dur: 900 },
            { id: "boy", to: { y: "-2" }, at: 4200, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "کدام همه جای ظرفش را پر می‌کند؟",
        options: ["گاز", "جامد", "مایع"], answer: "گاز" },
      { type: "sort", prompt: "جامد، مایع یا گاز؟", say: "هر کدام را در سبد خودش بگذار: جامد، مایع یا گاز.",
        baskets: [{ label: "جامد", pic: "🧱", value: "solid" }, { label: "مایع", pic: "💧", value: "liquid" }, { label: "گاز", pic: "🎈", value: "gas" }],
        items: [
          { pic: "🪨", say: "سنگ", basket: "solid" },
          { pic: "🔑", say: "کلید", basket: "solid" },
          { pic: "🥛", say: "شیر", basket: "liquid" },
          { pic: "🍯", say: "عسل", basket: "liquid" },
          { pic: "🎈", say: "هوای توی بادکنک", basket: "gas" },
          { pic: "🌹", say: "بوی گل", basket: "gas" }
        ] },
      { type: "choose", prompt: "مایع چه شکلی دارد؟", say: "آب را در یک بطری بریزیم، چه شکلی پیدا می‌کند؟",
        options: ["شکل بطری", "شکل خودش را نگه می‌دارد"], answer: "شکل بطری" },
      { type: "choose", prompt: "بوی غذا چطور به اتاق دیگر می‌رسد؟", say: "مادر در آشپزخانه غذا می‌پزد و بویش به اتاق تو می‌رسد. چطور؟",
        options: ["بو گاز است و در هوا پخش می‌شود", "بو را کسی می‌آورد"], answer: "بو گاز است و در هوا پخش می‌شود" },
      { type: "home", pic: "🌹 ⏱️", text: "بو چقدر طول می‌کشد تا به تو برسد؟",
        need: ["یک چیز خوش‌بو: پوست پرتقال، گلاب یا نعناع", "ساعت یا کسی که بشمارد"],
        steps: [
          "کودک آن طرف اتاق بایستد و چشمش را ببندد.",
          "بزرگ‌تر این طرف اتاق پوست پرتقال را بشکند یا در شیشه گلاب را باز کند و شروع به شمردن کند.",
          "کودک هر وقت بو را حس کرد دستش را بالا ببرد. تا چند شمردید؟",
          "جایتان را عوض کنید. بپرسید: «بو چطور از آن طرف به این طرف اتاق آمد؟»"
        ],
        ask: "بو جامد است، مایع است یا گاز؟" }
    ]
  },
  {
    id: "science-sapling-42", subject: "science", level: "sapling", emoji: "🧽", title: "هر ماده چه ویژگی‌ای دارد؟",
    steps: [
      { type: "test", kind: "absorbs", prompt: "اول حدس بزن، بعد امتحان کن: هر کدام را روی آب ریخته شده می‌گذاریم.",
        items: [
          { pic: "🧽", say: "اسفنج", yes: true },
          { pic: "🛍️", say: "کیسه پلاستیکی", yes: false },
          { pic: "🧻", say: "دستمال کاغذی", yes: true },
          { pic: "🥄", say: "قاشق فلزی", yes: false },
          { pic: "🧦", say: "جوراب نخی", yes: true }
        ] },
      { type: "sort", prompt: "شفاف یا غیرشفاف؟", say: "از کدام‌ها می‌شود آن طرف را دید و از کدام‌ها نه؟",
        baskets: [{ label: "شفاف", pic: "🪟", value: "clear" }, { label: "غیرشفاف", pic: "🧱", value: "opaque" }],
        items: [
          { pic: "🪟", say: "شیشه پنجره", basket: "clear" },
          { pic: "🥛", say: "لیوان شیشه‌ای خالی", basket: "clear" },
          { pic: "👓", say: "عینک", basket: "clear" },
          { pic: "📕", say: "کتاب", basket: "opaque" },
          { pic: "🪵", say: "تخته", basket: "opaque" },
          { pic: "🧱", say: "آجر", basket: "opaque" }
        ] },
      { type: "sort", prompt: "خم می‌شود یا سفت است؟", say: "کدام‌ها خم می‌شوند و کدام‌ها سفت‌اند؟",
        baskets: [{ label: "خم می‌شود", pic: "🧶", value: "bendy" }, { label: "سفت است", pic: "🪨", value: "hard" }],
        items: [
          { pic: "📄", say: "کاغذ", basket: "bendy" },
          { pic: "🧣", say: "شال‌گردن", basket: "bendy" },
          { pic: "🪢", say: "طناب", basket: "bendy" },
          { pic: "🪨", say: "سنگ", basket: "hard" },
          { pic: "🔩", say: "پیچ آهنی", basket: "hard" },
          { pic: "🧱", say: "آجر", basket: "hard" }
        ] },
      { type: "choose", prompt: "حوله را از چه بسازیم؟", say: "حوله باید آب را خوب جذب کند. از چه جنسی بسازیم؟", pic: true,
        options: [{ label: "🧺", value: "پارچه نخی" }, { label: "🛍️", value: "پلاستیک" }], answer: "پارچه نخی" },
      { type: "choose", prompt: "سقف خانه را از چه می‌سازند؟", say: "سقف خانه باید سفت باشد و آب از آن رد نشود. از چه می‌سازند؟",
        options: ["آجر، سیمان یا سفال", "کاغذ"], answer: "آجر، سیمان یا سفال" },
      { type: "home", pic: "🧪 🧽", text: "ماده‌های خانه را آزمایش کن!",
        need: ["چند تکه: اسفنج، پارچه، کاغذ، پلاستیک، فویل، چوب کوچک", "کمی آب و یک بشقاب"],
        steps: [
          "برای هر تکه چهار آزمایش کنید: سفت است یا خم می‌شود؟ شفاف است یا نه؟ آب را جذب می‌کند؟ کش می‌آید؟",
          "پیش از هر آزمایش کودک حدس بزند.",
          "نتیجه‌ها را در یک جدول با علامت ✓ و ✗ بنویسید.",
          "بپرسید: «برای کیسه خرید کدام بهتر است؟ برای سقف؟ برای حوله؟»"
        ],
        ask: "کدام ماده بیشتر از همه آب جذب کرد؟" }
    ]
  },
  {
    id: "science-sapling-43", subject: "science", level: "sapling", emoji: "🍳", title: "برمی‌گردد یا نه؟",
    steps: [
      { type: "scene", prompt: "بعضی تغییرها برمی‌گردند", bg: "#f6efdc",
        /* Some changes can be undone and some cannot: ice melts into water and the water freezes back into ice
           (arrows both ways); dough is baked into bread, rice is cooked and an egg is fried, and none of them can
           become as it was (an arrow one way, and a cross on the way back). Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          ice: { art: "🧊", at: [40, 66], s: 1.2 }, water: { art: "💧", at: [120, 66], s: 1.2, o: 0 },
          arF: { art: "sci-arrow", at: [62, 46], s: 1.8, o: 0 }, arB: { art: "sci-arrow", at: [98, 58], s: 1.8, r: 180, o: 0 },
          cross: { art: "sci-cross", at: [80, 58], s: 1.2, o: 0 },
          egg: { art: "🥚", at: [40, 66], s: 1.2, o: 0 }, fried: { art: "🍳", at: [120, 66], s: 1.4, o: 0 },
          rice: { art: "🌾", at: [40, 66], s: 1.2, o: 0 }, cooked: { art: "🍚", at: [120, 66], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "یخ در گرما آب می‌شود.", key: 2400, do: [
            { id: "arF", to: { o: 1 }, at: 400, dur: 100 }, { id: "arF", draw: true, at: 400, dur: 900 },
            { id: "ice", to: { sy: 0.4, o: 0.3 }, at: 600, dur: 1800 }, { id: "water", to: { o: 1 }, at: 1600, dur: 800 }
          ] },
          { caption: "آب را در فریزر بگذاریم، دوباره یخ می‌شود. این تغییر برمی‌گردد!", key: 2600, hold: 5000, do: [
            { id: "arB", to: { o: 1 }, at: 400, dur: 100 }, { id: "arB", draw: true, at: 400, dur: 900 },
            { id: "ice", to: { sy: 1, o: 1 }, at: 1200, dur: 1400 }, { id: "water", to: { o: 0.3 }, at: 1200, dur: 1400 }
          ] },
          { caption: "تخم‌مرغ را در تابه سرخ کردیم. دیگر نمی‌شود آن را دوباره تخم‌مرغ خام کرد.", key: 3600, hold: 6000, do: [
            { id: "ice", to: { o: 0 }, dur: 400 }, { id: "water", to: { o: 0 }, dur: 400 }, { id: "arB", to: { o: 0 }, dur: 400 },
            { id: "egg", to: { o: 1 }, at: 400, dur: 400 },
            { id: "egg", to: { o: 0.3 }, at: 1200, dur: 1000 }, { id: "fried", to: { o: 1 }, at: 1400, dur: 900 },
            { id: "arB", to: { o: 0.5 }, at: 2600, dur: 300 }, { id: "cross", to: { o: 1 }, at: 3000, dur: 300 }, { id: "cross", to: { s: 1.4 }, at: 3300, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "برنج پخته هم دیگر برنج خام نمی‌شود. این تغییرها برنمی‌گردند.", key: 2800, hold: 5400, do: [
            { id: "egg", to: { o: 0 }, dur: 400 }, { id: "fried", to: { o: 0 }, dur: 400 },
            { id: "rice", to: { o: 1 }, at: 400, dur: 400 }, { id: "rice", to: { o: 0.3 }, at: 1200, dur: 900 }, { id: "cooked", to: { o: 1 }, at: 1300, dur: 900 },
            { id: "cross", to: { s: 1.4 }, at: 2400, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "کدام تغییر برمی‌گردد؟",
        options: ["آب شدن یخ", "سرخ شدن تخم‌مرغ", "پختن نان"], answer: "آب شدن یخ" },
      { type: "sort", prompt: "برمی‌گردد یا برنمی‌گردد؟", say: "کدام تغییر را می‌شود برگرداند و کدام را نه؟",
        baskets: [{ label: "برمی‌گردد", pic: "🔄", value: "back" }, { label: "برنمی‌گردد", pic: "➡️", value: "not" }],
        items: [
          { pic: "🧊", say: "یخی که آب شد", basket: "back" },
          { pic: "🕯️", say: "شمعی که آب شد و دوباره سفت شد", basket: "back" },
          { pic: "🧈", say: "کره‌ای که نرم شد و در یخچال دوباره سفت شد", basket: "back" },
          { pic: "🍞", say: "خمیری که نان شد", basket: "not" },
          { pic: "🍳", say: "تخم‌مرغی که پخت", basket: "not" },
          { pic: "🍚", say: "برنجی که پخت", basket: "not" }
        ] },
      { type: "choose", prompt: "شکلات در آفتاب آب شد. در یخچال چه می‌شود؟", say: "شکلات در آفتاب آب شد. اگر آن را در یخچال بگذاریم، چه می‌شود؟",
        options: ["دوباره سفت می‌شود", "دیگر هیچ‌وقت سفت نمی‌شود"], answer: "دوباره سفت می‌شود" },
      { type: "choose", prompt: "یخ آب شد. دوباره یخ می‌شود؟", say: "یخ آب شد. اگر آب را در فریزر بگذاریم، دوباره یخ می‌شود؟",
        options: ["بله، دوباره یخ می‌شود", "نه، هیچ‌وقت"], answer: "بله، دوباره یخ می‌شود" },
      { type: "home", pic: "🧊 🍞", text: "تغییرهای آشپزخانه را تماشا کن!",
        need: ["یک تکه یخ", "یک لقمه نان و کمی خمیر یا آرد و آب", "یک بزرگ‌تر برای هر کاری که با گرما است"],
        steps: [
          "یک تکه یخ را در بشقاب بگذارید تا آب شود. بعد آبش را در فریزر بگذارید. فردا ببینید: برگشت؟",
          "کمی آرد و آب را مخلوط کنید تا خمیر شود. کنار یک تکه نان بگذارید و مقایسه کنید.",
          "بپرسید: «می‌توانیم نان را دوباره خمیر کنیم؟ برنج پخته را دوباره خام کنیم؟»",
          "پختن و سرخ کردن را فقط بزرگ‌تر انجام دهد؛ کودک از دور نگاه کند."
        ],
        ask: "کدام تغییر را می‌شود برگرداند؟" }
    ]
  },
  {
    id: "science-sapling-44", subject: "science", level: "sapling", emoji: "🧱", title: "تکه‌تکه و دوباره",
    steps: [
      { type: "scene", prompt: "از تکه‌های کوچک چیز تازه بساز", bg: "#f6efdc",
        /* A little house made of six blocks is taken apart, piece by piece, and the same blocks are built into a
           bridge; then mud bricks (khesht), one by one, make a wall, as people built old houses in Yazd and Kashan.
           Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" },
          k1: { art: "sci-block-r", at: [70, 84], s: 1.2 },
          k2: { art: "sci-block-y", at: [80, 84], s: 1.2 },
          k3: { art: "sci-block-b", at: [90, 84], s: 1.2 },
          k4: { art: "sci-block-g", at: [70, 76], s: 1.2 },
          k5: { art: "sci-block-r", at: [90, 76], s: 1.2 },
          k6: { art: "sci-block-y", at: [80, 68], s: 1.2 },
          bgK: { art: "sci-desert", o: 0 },
          h1: { art: "sci-khesht", at: [60, 84], o: 0 },
          h2: { art: "sci-khesht", at: [70, 84], o: 0 },
          h3: { art: "sci-khesht", at: [80, 84], o: 0 },
          h4: { art: "sci-khesht", at: [90, 84], o: 0 },
          h5: { art: "sci-khesht", at: [100, 84], o: 0 },
          h6: { art: "sci-khesht", at: [65, 80], o: 0 },
          h7: { art: "sci-khesht", at: [75, 80], o: 0 },
          h8: { art: "sci-khesht", at: [85, 80], o: 0 },
          h9: { art: "sci-khesht", at: [95, 80], o: 0 },
          h10: { art: "sci-khesht", at: [60, 76], o: 0 },
          h11: { art: "sci-khesht", at: [70, 76], o: 0 },
          h12: { art: "sci-khesht", at: [80, 76], o: 0 },
          h13: { art: "sci-khesht", at: [90, 76], o: 0 },
          h14: { art: "sci-khesht", at: [100, 76], o: 0 },
          h15: { art: "sci-khesht", at: [65, 72], o: 0 },
          h16: { art: "sci-khesht", at: [75, 72], o: 0 },
          h17: { art: "sci-khesht", at: [85, 72], o: 0 },
          h18: { art: "sci-khesht", at: [95, 72], o: 0 }
        },
        scenes: [
          { caption: "این خانه کوچک از شش مکعب ساخته شده.", do: [
            { id: "k6", to: { y: "-1" }, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "آن را تکه‌تکه کردیم. مکعب‌ها خراب نشدند.", key: 3200, hold: 5400, do: [
            { id: "k1", path: "M70 84Q50 70 30 84", at: 300, dur: 900 },
            { id: "k2", path: "M80 84Q60 70 40 84", at: 650, dur: 900 },
            { id: "k3", path: "M90 84Q105 70 120 84", at: 1000, dur: 900 },
            { id: "k4", path: "M70 76Q100 62 130 84", at: 1350, dur: 900 },
            { id: "k5", path: "M90 76Q115 62 140 84", at: 1700, dur: 900 },
            { id: "k6", path: "M80 68Q65 54 50 84", at: 2050, dur: 900 }
          ] },
          { caption: "با همان مکعب‌ها یک پل ساختیم!", key: 3600, hold: 5600, do: [
            { id: "k1", path: "M30 84Q47 70 64 84", at: 300, dur: 900 },
            { id: "k2", path: "M40 84Q52 62 64 76", at: 800, dur: 900 },
            { id: "k3", path: "M120 84Q108 70 96 84", at: 1300, dur: 900 },
            { id: "k4", path: "M130 84Q113 62 96 76", at: 1800, dur: 900 },
            { id: "k5", path: "M140 84Q106 54 74 66.4", at: 2300, dur: 900 },
            { id: "k6", path: "M50 84Q69 54 86 66.4", at: 2800, dur: 900 }
          ] },
          { caption: "در یزد و کاشان، خانه‌های قدیمی را با خشت ساخته‌اند: خشت‌ها را یکی‌یکی روی هم می‌گذارند و دیوار می‌سازند.", key: 6000, hold: 7600, do: [
            { id: "k1", to: { o: 0 }, dur: 400 }, { id: "k2", to: { o: 0 }, dur: 400 }, { id: "k3", to: { o: 0 }, dur: 400 }, { id: "k4", to: { o: 0 }, dur: 400 }, { id: "k5", to: { o: 0 }, dur: 400 }, { id: "k6", to: { o: 0 }, dur: 400 },
            { id: "bgK", to: { o: 1 }, dur: 600 },
            { id: "h1", to: { o: 1 }, at: 500, dur: 1 }, { id: "h1", path: "M150 84Q105 72 60 84", at: 500, dur: 500 },
            { id: "h2", to: { o: 1 }, at: 780, dur: 1 }, { id: "h2", path: "M150 84Q110 72 70 84", at: 780, dur: 500 },
            { id: "h3", to: { o: 1 }, at: 1060, dur: 1 }, { id: "h3", path: "M150 84Q115 72 80 84", at: 1060, dur: 500 },
            { id: "h4", to: { o: 1 }, at: 1340, dur: 1 }, { id: "h4", path: "M150 84Q120 72 90 84", at: 1340, dur: 500 },
            { id: "h5", to: { o: 1 }, at: 1620, dur: 1 }, { id: "h5", path: "M150 84Q125 72 100 84", at: 1620, dur: 500 },
            { id: "h6", to: { o: 1 }, at: 1900, dur: 1 }, { id: "h6", path: "M150 84Q107.5 68 65 80", at: 1900, dur: 500 },
            { id: "h7", to: { o: 1 }, at: 2180, dur: 1 }, { id: "h7", path: "M150 84Q112.5 68 75 80", at: 2180, dur: 500 },
            { id: "h8", to: { o: 1 }, at: 2460, dur: 1 }, { id: "h8", path: "M150 84Q117.5 68 85 80", at: 2460, dur: 500 },
            { id: "h9", to: { o: 1 }, at: 2740, dur: 1 }, { id: "h9", path: "M150 84Q122.5 68 95 80", at: 2740, dur: 500 },
            { id: "h10", to: { o: 1 }, at: 3020, dur: 1 }, { id: "h10", path: "M150 84Q105 64 60 76", at: 3020, dur: 500 },
            { id: "h11", to: { o: 1 }, at: 3300, dur: 1 }, { id: "h11", path: "M150 84Q110 64 70 76", at: 3300, dur: 500 },
            { id: "h12", to: { o: 1 }, at: 3580, dur: 1 }, { id: "h12", path: "M150 84Q115 64 80 76", at: 3580, dur: 500 },
            { id: "h13", to: { o: 1 }, at: 3860, dur: 1 }, { id: "h13", path: "M150 84Q120 64 90 76", at: 3860, dur: 500 },
            { id: "h14", to: { o: 1 }, at: 4140, dur: 1 }, { id: "h14", path: "M150 84Q125 64 100 76", at: 4140, dur: 500 },
            { id: "h15", to: { o: 1 }, at: 4420, dur: 1 }, { id: "h15", path: "M150 84Q107.5 60 65 72", at: 4420, dur: 500 },
            { id: "h16", to: { o: 1 }, at: 4700, dur: 1 }, { id: "h16", path: "M150 84Q112.5 60 75 72", at: 4700, dur: 500 },
            { id: "h17", to: { o: 1 }, at: 4980, dur: 1 }, { id: "h17", path: "M150 84Q117.5 60 85 72", at: 4980, dur: 500 },
            { id: "h18", to: { o: 1 }, at: 5260, dur: 1 }, { id: "h18", path: "M150 84Q122.5 60 95 72", at: 5260, dur: 500 }
          ] }
        ],
        question: "با مکعب‌های خانه چه ساختیم؟",
        options: ["یک پل", "هیچ چیز، مکعب‌ها شکستند"], answer: "یک پل" },
      { type: "choose", prompt: "چیزی که از تکه‌های کوچک ساخته شده، می‌شود…", say: "چیزی که از تکه‌های کوچک ساخته شده را می‌شود باز کرد و با همان تکه‌ها چیز تازه‌ای ساخت؟",
        options: ["بله، باز کرد و دوباره ساخت", "نه، هیچ‌وقت"], answer: "بله، باز کرد و دوباره ساخت" },
      { type: "choose", prompt: "دیوار خانه‌های قدیمی یزد از چیست؟", say: "دیوار خانه‌های قدیمی یزد از چه ساخته شده؟", pic: true,
        options: [{ label: "🧱", value: "خشت" }, { label: "🧊", value: "یخ" }], answer: "خشت" },
      { type: "choose", prompt: "جورچین را چطور دوباره درست کنیم؟", say: "پازل را از هم باز کردیم. چطور دوباره درستش کنیم؟", pic: true,
        options: [{ label: "🧩", value: "تکه‌ها را دوباره کنار هم بگذاریم" }, { label: "🗑️", value: "دورش بیندازیم" }], answer: "تکه‌ها را دوباره کنار هم بگذاریم" },
      { type: "home", pic: "🧱 🏠", text: "یک چیز بساز، بازش کن و چیز تازه بساز!",
        need: ["مکعب‌های اسباب‌بازی، جعبه‌های کوچک یا قوطی‌ها", "اگر حیاط دارید: کمی خاک، آب و یک قالب یخ"],
        steps: [
          "با مکعب‌ها یک خانه بسازید. بشمارید چند تکه است.",
          "خانه را باز کنید و با همان تکه‌ها یک چیز دیگر بسازید: پل، ماشین، برج.",
          "اگر حیاط دارید: خاک و کمی آب را گِل کنید، در قالب یخ بریزید و چند روز در آفتاب بگذارید تا خشت‌های کوچک خشک شوند. بعد با آن‌ها دیوار کوچکی بسازید.",
          "بعد از بازی با گل دست‌ها را بشویید."
        ],
        ask: "با همان تکه‌ها چه چیزهایی ساختی؟" }
    ]
  },
  {
    id: "science-sapling-45", subject: "science", level: "sapling", emoji: "🧪", title: "بازی مواد",
    steps: [
      { type: "sort", prompt: "جامد، مایع یا گاز؟", say: "هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "جامد", pic: "🧱", value: "solid" }, { label: "مایع", pic: "💧", value: "liquid" }, { label: "گاز", pic: "🎈", value: "gas" }],
        items: [
          { pic: "🥄", say: "قاشق", basket: "solid" },
          { pic: "🧊", say: "یخ", basket: "solid" },
          { pic: "🧃", say: "آبمیوه", basket: "liquid" },
          { pic: "🌧️", say: "آب باران", basket: "liquid" },
          { pic: "🎈", say: "هوای بادکنک", basket: "gas" },
          { pic: "🍞", say: "بوی نان تازه", basket: "gas" }
        ] },
      { type: "pairs", prompt: "بهترین جنس برای هر کار", say: "هر کار را به بهترین جنس برایش برسان.",
        pairs: [
          [{ label: "پنجره", pic: "🪟", say: "پنجره" }, { label: "شیشه", say: "شیشه" }],
          [{ label: "حوله", pic: "🧺", say: "حوله" }, { label: "پارچه نخی", say: "پارچه نخی" }],
          [{ label: "بارانی", pic: "🧥", say: "بارانی" }, { label: "پلاستیک", say: "پلاستیک" }],
          [{ label: "قابلمه", pic: "🍲", say: "قابلمه" }, { label: "فلز", say: "فلز" }]
        ] },
      { type: "sort", prompt: "برمی‌گردد یا نه؟", say: "کدام تغییر برمی‌گردد و کدام برنمی‌گردد؟",
        baskets: [{ label: "برمی‌گردد", pic: "🔄", value: "back" }, { label: "برنمی‌گردد", pic: "➡️", value: "not" }],
        items: [
          { pic: "🧊", say: "آب که یخ زد", basket: "back" },
          { pic: "🍦", say: "بستنی که آب شد و دوباره در فریزر یخ زد", basket: "back" },
          { pic: "🍳", say: "تخم‌مرغ پخته", basket: "not" },
          { pic: "🍞", say: "نان پخته", basket: "not" }
        ] },
      { type: "pairs", prompt: "ویژگی هر ماده", say: "هر ماده را به ویژگی‌اش برسان.",
        pairs: [
          [{ pic: "🧽", say: "اسفنج" }, { label: "آب را جذب می‌کند", say: "آب را جذب می‌کند" }],
          [{ pic: "🪟", say: "شیشه" }, { label: "شفاف است", say: "شفاف است" }],
          [{ pic: "🪨", say: "سنگ" }, { label: "سفت است", say: "سفت است" }]
        ] },
      { type: "home", pic: "🏠 🔍", text: "در خانه سه حالت ماده را پیدا کن!",
        need: ["آشپزخانه و یک بزرگ‌تر"],
        steps: [
          "در آشپزخانه یک جامد، یک مایع و یک گاز پیدا کنید (گاز: هوای توی یک بطری خالی یا بوی غذا).",
          "یک تغییر برگشت‌پذیر (یخ) و یک تغییر برگشت‌ناپذیر (پختن) را با هم ببینید.",
          "برای سه چیز خانه بپرسید: «چرا از این جنس ساخته شده؟»"
        ],
        ask: "گاز را در خانه کجا پیدا کردی؟" }
    ]
  },
  {
    id: "science-sapling-29", subject: "science", level: "sapling", emoji: "🫘", title: "سرگذشت دانه",
    steps: [
      { type: "scene", prompt: "داخل دانه چیست؟", bg: "#f6efdc",
        /* A bean, soaked overnight, swells; its coat comes off; it opens into two halves of stored food with a tiny
           plant inside. Then three jars: dry cotton (nothing happens), wet cotton in the cold fridge (nothing yet),
           wet cotton in a warm room (a root grows down and a shoot up). Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          bean: { art: "sci-beanbig", at: [80, 44], s: 1.4 },
          ring: { art: "sci-ring", at: [72, 44], s: 1, o: 0 },
          jDry: { art: "sci-seedjar", at: [36, 72], s: 1.4, look: { dry: true }, o: 0 },
          fridge: { art: "sci-fridge", at: [80, 72], s: 1.1, o: 0 }, jCold: { art: "sci-seedjar", at: [80, 65], s: 1, o: 0 },
          jWarm: { art: "sci-seedjar", at: [128, 72], s: 1.4, o: 0 },
          sun: { art: "sci-sun", at: [140, 18], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "این یک دانه لوبیاست. سفت و خشک است. داخلش چیست؟", do: [
            { id: "bean", to: { r: 10 }, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "لوبیا را یک شب در آب گذاشتیم. آب خورد و بزرگ‌تر شد. پوستش نرم شد و آن را برداشتیم.", key: 3400, hold: 6000, do: [
            { id: "bean", to: { s: 1.8 }, at: 300, dur: 1600 },
            { id: "bean.coat", to: { o: 0 }, at: 2400, dur: 900 }
          ] },
          { caption: "دانه را باز کردیم: یک گیاه خیلی کوچک داخلش است، و دو تکه غذا که گیاه با آن رشد می‌کند.", key: 3000, hold: 6600, do: [
            { id: "bean.l", to: { x: -4, r: -12 }, dur: 900 }, { id: "bean.r", to: { x: 4, r: 12 }, dur: 900 },
            { cam: { x: 80, y: 44, zoom: 2.2 }, at: 700, dur: 1000 },
            { id: "ring", to: { o: 1, x: 71 }, at: 1800, dur: 400 }, { id: "ring", to: { s: 1.3 }, at: 2200, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "سه دانه را امتحان کردیم: یکی در پنبه خشک، یکی در پنبه خیس در یخچال سرد، یکی در پنبه خیس در اتاق گرم.", key: 2600, hold: 6400, do: [
            { cam: { x: 80, y: 45, zoom: 1 }, dur: 800 }, { id: "bean", to: { o: 0 }, dur: 500 }, { id: "ring", to: { o: 0 }, dur: 300 },
            { id: "jDry", to: { o: 1 }, at: 600, dur: 400 }, { id: "fridge", to: { o: 1 }, at: 900, dur: 400 }, { id: "jCold", to: { o: 1 }, at: 900, dur: 400 },
            { id: "jWarm", to: { o: 1 }, at: 1200, dur: 400 }, { id: "sun", to: { o: 1 }, at: 1200, dur: 400 },
            { id: "jDry.root", to: { sy: 0 }, dur: 1 }, { id: "jDry.shoot", to: { sy: 0 }, dur: 1 }, { id: "jCold.root", to: { sy: 0 }, dur: 1 }, { id: "jCold.shoot", to: { sy: 0 }, dur: 1 },
            { id: "jWarm.root", to: { sy: 0 }, dur: 1 }, { id: "jWarm.shoot", to: { sy: 0 }, dur: 1 }
          ] },
          { caption: "چند روز بعد، فقط دانه‌ای که آب، گرما و هوا داشت جوانه زد: ریشه پایین رفت و ساقه بالا آمد.", key: 4400, hold: 7000, do: [
            { id: "sun.rays", to: { r: 90 }, dur: 4400 },
            { id: "jWarm.root", to: { sy: 1 }, at: 600, dur: 1800 }, { id: "jWarm.shoot", to: { sy: 1 }, at: 2200, dur: 2000 },
            { emit: "spark", where: [128, 50], spread: [10, 8], n: 6, at: 4200, dur: 1000 }
          ] }
        ],
        question: "دانه برای جوانه زدن چه می‌خواهد؟",
        options: ["آب، گرما و هوا", "فقط تاریکی", "شیر"], answer: "آب، گرما و هوا" },
      { type: "order", prompt: "سرگذشت دانه را به ترتیب بچین", say: "اول دانه خشک است، بعد آب می‌خورد و باد می‌کند، بعد ریشه می‌زند و بعد ساقه و برگ درمی‌آورد.", numbered: true,
        items: [{ pic: "🫘", label: "دانه خشک", say: "دانه خشک" }, { pic: "💧", label: "آب خورد", say: "دانه آب خورد و باد کرد" }, { pic: "🌱", label: "ریشه و جوانه", say: "ریشه و جوانه درآمد" }, { pic: "🌿", label: "گیاه", say: "گیاه با برگ" }] },
      { type: "choose", prompt: "گیاه کوچک داخل دانه، اول از کجا غذا می‌گیرد؟", say: "گیاه کوچک داخل دانه، پیش از اینکه برگ داشته باشد، از کجا غذا می‌گیرد؟",
        options: ["از غذای داخل خود دانه", "از نور ماه"], answer: "از غذای داخل خود دانه" },
      { type: "choose", prompt: "چرا دانه پنبه خشک جوانه نزد؟", say: "دانه‌ای که در پنبه خشک بود جوانه نزد. چرا؟",
        options: ["چون آب نداشت", "چون زیاد آب داشت"], answer: "چون آب نداشت" },
      { type: "home", pic: "🫘 🫙", text: "داخل لوبیا را ببین و جوانه زدن را آزمایش کن!",
        need: ["چند دانه لوبیا", "یک کاسه آب", "سه شیشه کوچک یا لیوان", "پنبه"],
        steps: [
          "یک لوبیا را یک شب در آب بگذارید. صبح پوستش را بردارید و آرام دو نیمه‌اش کنید. با ذره‌بین گیاه کوچک داخلش را پیدا کنید.",
          "در سه شیشه پنبه بگذارید و کنار شیشه یک لوبیا. پنبه یکی را خشک بگذارید و دو تای دیگر را خیس کنید.",
          "یک شیشه خیس را در یخچال و دو شیشه دیگر را در اتاق بگذارید. پیش از شروع حدس بزنید کدام جوانه می‌زند.",
          "هر روز نگاه کنید و نقاشی کنید. پنبه را خیس نگه دارید."
        ],
        ask: "کدام دانه زودتر جوانه زد؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-30", subject: "science", level: "sapling", emoji: "🪴", title: "بکارید و ببینید",
    steps: [
      { type: "scene", prompt: "گیاه به چه نیاز دارد؟ یک آزمایش منصفانه", bg: "#f6efdc",
        /* Three pots of the same bean seedling, the same soil and the same size; only one thing differs for each:
           pot 1 has light and water, pot 2 has light but no water, pot 3 has water but no light (a box over it).
           Each week the plants are measured with a ruler: pot 1 grows tall and green, pot 2 wilts, pot 3 grows
           thin and pale. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, winDay: { art: "sci-window-day" }, beam: { art: "sci-sunbeam" },
          p1: { art: "sci-pot", at: [26, 72], s: 1.3 }, pl1: { art: "sci-plant", at: [26, 57.6], s: 0.4 },
          p2: { art: "sci-pot", at: [50, 72], s: 1.3 }, pl2: { art: "sci-potplant", at: [50, 72], s: 1.3, o: 0 }, pl2b: { art: "sci-plant", at: [50, 57.6], s: 0.4 },
          p3: { art: "sci-pot", at: [118, 72], s: 1.3 }, pl3: { art: "sci-plant-pale", at: [118, 57.6], s: 0.4 },
          box: { art: "📦", at: [118, 73], s: 2.4, o: 0 },
          can: { art: "sci-can", at: [40, 30], s: 1.1, o: 0 },
          ruler: { art: "sci-ruler", at: [14, 60], s: 1, r: -90, o: 0 }
        },
        scenes: [
          { caption: "سه گلدان لوبیای یکسان داریم: یک خاک، یک اندازه. فقط یک چیز را در هر کدام عوض می‌کنیم.", key: 1800, hold: 5600, do: [
            { id: "p1", to: { y: "-1" }, at: 400, dur: 400, yoyo: true, times: 2 }, { id: "p2", to: { y: "-1" }, at: 900, dur: 400, yoyo: true, times: 2 }, { id: "p3", to: { y: "-1" }, at: 1400, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "گلدان اول نور و آب دارد. گلدان دوم نور دارد ولی آب ندارد. گلدان سوم آب دارد ولی نور ندارد.", key: 5400, hold: 7400, do: [
            { id: "can", to: { o: 1 }, at: 300, dur: 300 }, { id: "can", to: { r: -35 }, at: 600, dur: 400 },
            { emit: "drop", where: [23, 43], spread: [3, 2], rise: 3, n: 8, at: 1000, dur: 1200, life: 600 },
            { id: "can", path: "M40 30Q90 10 132 30", at: 2400, dur: 1400 },
            { emit: "drop", where: [115, 43], spread: [3, 2], rise: 3, n: 8, at: 3900, dur: 1200, life: 600 },
            { id: "can", to: { o: 0 }, at: 5200, dur: 300 },
            { id: "box", to: { o: 1 }, at: 5300, dur: 600 }
          ] },
          { caption: "سه هفته گذشت. هر هفته قد گیاه‌ها را با خط‌کش اندازه گرفتیم و نوشتیم.", key: 4400, hold: 6600, do: [
            { id: "pl1", to: { s: 1.6 }, at: 300, dur: 3600 },
            { id: "pl2b", to: { o: 0 }, at: 1500, dur: 1000 }, { id: "pl2", to: { o: 1 }, at: 1500, dur: 1000 },
            { id: "pl3", to: { s: 1.1 }, at: 300, dur: 3600 },
            { id: "ruler", to: { o: 1 }, at: 3800, dur: 300 }
          ] },
          { caption: "گیاه نور و آب‌دار بلند و سبز شد. گیاه بی‌آب پژمرده شد. گیاه بی‌نور زرد و باریک ماند.", key: 2400, hold: 6600, do: [
            { id: "box", to: { o: 0 }, dur: 600 },
            { id: "pl1", to: { r: 3 }, at: 800, dur: 1200, yoyo: true, times: 2 }
          ] }
        ],
        question: "کدام گیاه بهتر رشد کرد؟",
        options: ["گیاهی که نور و آب داشت", "گیاهی که آب نداشت", "گیاهی که نور نداشت"], answer: "گیاهی که نور و آب داشت" },
      { type: "chart", bars: true, title: "قد گیاه‌ها بعد از سه هفته (سانتی‌متر)", say: "این نمودار قد سه گیاه را بعد از سه هفته نشان می‌دهد.",
        rows: [{ label: "نور و آب", pic: "🌿", n: 12 }, { label: "بی‌آب", pic: "🥀", n: 3 }, { label: "بی‌نور", pic: "🌱", n: 7 }],
        question: "گیاه بی‌نور چند سانتی‌متر بود؟", options: [3, 7, 12], answer: 7 },
      { type: "chart", bars: true, title: "قد گیاه‌ها بعد از سه هفته (سانتی‌متر)",
        rows: [{ label: "نور و آب", pic: "🌿", n: 12 }, { label: "بی‌آب", pic: "🥀", n: 3 }, { label: "بی‌نور", pic: "🌱", n: 7 }],
        question: "گیاه نور و آب‌دار چند سانتی‌متر بلندتر از گیاه بی‌آب بود؟", options: [5, 9, 12], answer: 9 },
      { type: "choose", prompt: "چرا هر سه گلدان را یکسان گرفتیم؟", say: "چرا هر سه گلدان را با یک خاک و یک اندازه گرفتیم؟",
        options: ["تا فقط یک چیز فرق داشته باشد و آزمایش منصفانه باشد", "چون گلدان دیگری نداشتیم"], answer: "تا فقط یک چیز فرق داشته باشد و آزمایش منصفانه باشد" },
      { type: "paper", pic: "🌱 📏", text: "دفترچه گیاه: هر هفته قد گیاهت را اندازه بگیر و بنویس.",
        check: ["هر هفته با خط‌کش اندازه گرفت؟", "عددها را در جدول نوشت؟", "شکل گیاه را کشید؟", "گفت گیاه چه چیزی لازم داشت؟"],
        note: "سه لیوان لوبیا یا عدس بکارید و فقط یک چیز را عوض کنید: یکی نور و آب، یکی بی‌آب، یکی در جعبه تاریک. هر هفته قد را بنویسید و آخر کار نمودار میله‌ای بکشید." }
    ]
  },
  {
    id: "science-sapling-36", subject: "science", level: "sapling", emoji: "🐝", title: "زنبور و گل",
    steps: [
      { type: "scene", prompt: "گیاه‌ها به کمک چه کسانی نیاز دارند؟", bg: "#cdeaf7",
        /* A bee lands on one flower and pollen sticks to its legs; it flies to another flower and leaves pollen
           there, which helps the flower make fruit and seeds. Then seeds travel: dandelion seeds on the wind, a
           winged seed spinning down, a burr carried on a sheep's wool. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" },
          fl1: { art: "sci-flower", at: [40, 86], s: 1.4 }, fl2: { art: "sci-flower", at: [116, 86], s: 1.4 },
          bee: { art: "sci-bee", at: [-10, 30], s: 1.6 },
          fruit: { art: "🍎", at: [116, 52], s: 0, o: 0 },
          dand: { art: "sci-dandelion", at: [30, 86], s: 1.2, o: 0 },
          d1: { art: "sci-dseed", at: [30, 60], s: 1.6, o: 0 }, d2: { art: "sci-dseed", at: [28, 61], s: 1.6, o: 0 },
          tree: { art: "sci-tree", at: [100, 84], s: 0.8, o: 0 }, ws: { art: "sci-wingseed", at: [96, 40], s: 1.2, o: 0 },
          sheep: { art: "sci-sheep", at: [180, 86], s: 1.6, o: 0 }, burr: { art: "sci-burr", at: [70, 82], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "زنبور روی گل می‌نشیند تا شهد بخورد. گرده‌های زرد گل به پاهایش می‌چسبد.", key: 3200, hold: 5600, do: [
            { id: "bee.wings", to: { r: -30 }, dur: 4400, yoyo: true, times: 30 },
            { id: "bee", path: "M-10 30Q20 20 44 46", dur: 1800 },
            { id: "fl1.pollen", to: { o: 0 }, at: 2600, dur: 400 }, { id: "bee.dust", to: { o: 1 }, at: 2600, dur: 400 }
          ] },
          { caption: "زنبور به گل دیگری می‌رود و گرده‌ها را آن‌جا جا می‌گذارد.", key: 2800, hold: 5400, do: [
            { id: "bee.wings", to: { r: -30 }, dur: 4400, yoyo: true, times: 30 },
            { id: "bee", path: "M44 46Q80 10 120 46", dur: 2000 },
            { id: "bee.dust", to: { o: 0 }, at: 2400, dur: 400 },
            { emit: "spark", where: [116, 50], spread: [6, 4], n: 5, at: 2500, dur: 900 }
          ] },
          { caption: "حالا گل می‌تواند میوه و دانه بسازد.", key: 3000, do: [
            { id: "bee", path: "M120 46Q150 20 180 10", dur: 1400 },
            { id: "fl2.head", to: { o: 0 }, at: 1000, dur: 800 }, { id: "fruit", to: { o: 1, s: 0.6 }, at: 1200, dur: 1600, ease: "back" }
          ] },
          { caption: "دانه‌ها هم سفر می‌کنند: باد دانه‌های قاصدک را می‌برد و دانه بال‌دار چرخ‌زنان پایین می‌آید.", key: 3000, hold: 6400, do: [
            { id: "fl1", to: { o: 0 }, dur: 500 }, { id: "fl2", to: { o: 0 }, dur: 500 }, { id: "fruit", to: { o: 0 }, dur: 500 },
            { id: "dand", to: { o: 1 }, at: 300, dur: 400 }, { id: "tree", to: { o: 1 }, at: 300, dur: 400 },
            { id: "d1", to: { o: 1 }, at: 700, dur: 100 }, { id: "d1", path: "M30 60Q60 30 90 24", at: 800, dur: 4000 },
            { id: "d2", to: { o: 1 }, at: 900, dur: 100 }, { id: "d2", path: "M28 61Q50 50 70 30", at: 1000, dur: 4000 },
            { id: "dand.head", to: { o: 0.3 }, at: 800, dur: 2000 },
            { id: "ws", to: { o: 1 }, at: 1200, dur: 100 }, { id: "ws", path: "M96 40Q110 60 118 86", at: 1300, dur: 3600 }, { id: "ws", to: { r: 1080 }, at: 1300, dur: 3600 }
          ] },
          { caption: "دانه خاردار به پشم گوسفند می‌چسبد و با او به جای دیگری می‌رود.", key: 3600, hold: 6400, do: [
            { id: "dand", to: { o: 0 }, dur: 400 }, { id: "tree", to: { o: 0 }, dur: 400 }, { id: "d1", to: { o: 0 }, dur: 400 }, { id: "d2", to: { o: 0 }, dur: 400 }, { id: "ws", to: { o: 0 }, dur: 400 },
            { id: "burr", to: { o: 1 }, at: 300, dur: 300 }, { id: "sheep", to: { o: 1 }, at: 300, dur: 100 },
            { id: "sheep", path: "M180 86L84 86", at: 400, dur: 2600, ease: "linear" }, { id: "sheep", to: { y: "-1" }, at: 400, dur: 2600, yoyo: true, times: 8 },
            { id: "burr", path: "M70 82Q72 70 78 70", at: 3000, dur: 400 },
            { id: "sheep", path: "M84 86L20 86", at: 3600, dur: 2400, ease: "linear" }, { id: "burr", path: "M78 70L14 70", at: 3600, dur: 2400, ease: "linear" }
          ] }
        ],
        question: "زنبور برای گل چه کار می‌کند؟",
        options: ["گرده را از یک گل به گل دیگر می‌برد", "برگ‌هایش را می‌خورد"], answer: "گرده را از یک گل به گل دیگر می‌برد" },
      { type: "pairs", prompt: "هر دانه چطور سفر می‌کند؟", say: "هر دانه را به راه سفرش برسان.",
        pairs: [
          [{ label: "قاصدک", pic: "🌬️", say: "دانه قاصدک" }, { label: "با باد", say: "با باد" }],
          [{ label: "دانه خاردار", pic: "🐑", say: "دانه خاردار" }, { label: "با پشم جانوران", say: "به پشم جانوران می‌چسبد" }],
          [{ label: "نارگیل", pic: "🌊", say: "نارگیل" }, { label: "روی آب", say: "روی آب شناور می‌شود" }],
          [{ label: "دانه آلبالو", pic: "🐦", say: "دانه آلبالو" }, { label: "پرنده می‌خورد و جای دیگر می‌اندازد", say: "پرنده میوه را می‌خورد و دانه را جای دیگر می‌اندازد" }]
        ] },
      { type: "pairs", prompt: "چه کسی گرده را جابه‌جا می‌کند؟", say: "کدام جانوران گرده گل‌ها را جابه‌جا می‌کنند؟",
        pairs: [
          [{ pic: "🐝", say: "زنبور" }, { pic: "🌸", say: "گل" }],
          [{ pic: "🦋", say: "پروانه" }, { pic: "🌻", say: "آفتابگردان" }],
          [{ pic: "🐞", say: "کفشدوزک" }, { pic: "🌼", say: "گل بابونه" }]
        ] },
      { type: "choose", prompt: "اگر زنبورها نباشند، چه می‌شود؟", say: "اگر زنبورها نباشند، برای خیلی از گیاه‌ها چه اتفاقی می‌افتد؟",
        options: ["میوه و دانه کمتری می‌سازند", "بزرگ‌تر می‌شوند"], answer: "میوه و دانه کمتری می‌سازند" },
      { type: "home", pic: "🌀 📄", text: "یک دانه کاغذی طراحی کن که آرام‌تر پایین بیاید!",
        need: ["کاغذ", "یک گیره کاغذ", "قیچی (فقط بزرگ‌تر)"],
        steps: [
          "بزرگ‌تر یک نوار کاغذ ببُرد و سرش را دو شاخه کند. شاخه‌ها را به دو طرف تا کنید و ته آن را با گیره وزن دهید: یک «دانه بال‌دار».",
          "یک تکه کاغذ گلوله‌شده و دانه بال‌دار را از یک بلندی با هم رها کنید. کدام آرام‌تر پایین می‌آید؟",
          "بال‌ها را بلندتر یا کوتاه‌تر کنید و دوباره امتحان کنید. کدام دورتر می‌رود؟",
          "در پارک ببینید زنبورها روی کدام گل‌ها می‌نشینند. از دور نگاه کنید."
        ],
        ask: "کدام طرح دانه‌ات آرام‌تر پایین آمد؟" }
    ]
  },
  {
    id: "science-sapling-13", subject: "science", level: "sapling", emoji: "💧", title: "آب، ماده باارزش",
    steps: [
      { type: "scene", prompt: "آب چه ویژگی‌هایی دارد؟", bg: "#f6efdc",
        /* Three glasses of water: a spoon of salt stirred into one glass disappears (dissolves); a
           spoon of sand stays at the bottom of another; oil poured in floats on top in a yellow layer. Drawings:
           js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          gS: { art: "sci-glassmix", at: [40, 72], s: 1.6 }, gN: { art: "sci-glassmix", at: [80, 72], s: 1.6 }, gO: { art: "sci-glassmix", at: [120, 72], s: 1.6 },
          salt: { art: "sci-spoonful", at: [22, 20], s: 1.4, o: 0 }, sand: { art: "sci-spoonful", at: [62, 20], s: 1.4, o: 0, look: { fill: "#e7c27a" } },
          bits: { art: "sci-pebble", at: [40, 50], s: 0.6, o: 0 },
          oilp: { art: "🫗", at: [140, 30], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "سه لیوان آب داریم. ببینیم چه چیزهایی در آب حل می‌شوند و چه چیزهایی نه.", do: [
            { id: "gS", to: { s: 1.7 }, at: 300, dur: 500, yoyo: true, times: 2 }, { id: "gN", to: { s: 1.7 }, at: 900, dur: 500, yoyo: true, times: 2 }, { id: "gO", to: { s: 1.7 }, at: 1500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "یک قاشق نمک در آب ریختیم و هم زدیم. نمک ناپدید شد: در آب حل شد!", key: 3600, hold: 6000, do: [
            { id: "salt", to: { o: 1 }, dur: 300 }, { id: "salt", path: "M22 20L36 36", at: 300, dur: 800 }, { id: "salt", to: { r: 60 }, at: 1100, dur: 400 },
            { id: "bits", to: { o: 1 }, at: 1400, dur: 100 }, { id: "bits", path: "M40 40L40 62", at: 1400, dur: 900 }, { id: "bits", to: { o: 0, s: 0.2 }, at: 2400, dur: 1400 },
            { id: "salt", to: { r: 30 }, at: 2000, dur: 400, yoyo: true, times: 4 }, { id: "salt", to: { o: 0 }, at: 4000, dur: 400 }
          ] },
          { caption: "یک قاشق ماسه در آب ریختیم و هم زدیم. ماسه حل نشد و ته لیوان نشست.", key: 4000, hold: 6000, do: [
            { id: "sand", to: { o: 1 }, dur: 300 }, { id: "sand", path: "M62 20L76 36", at: 300, dur: 800 }, { id: "sand", to: { r: 60 }, at: 1100, dur: 400 },
            { id: "gN.sand", to: { o: 1 }, at: 1600, dur: 1600 },
            { id: "sand", to: { r: 30 }, at: 2000, dur: 400, yoyo: true, times: 4 }, { id: "sand", to: { o: 0 }, at: 4000, dur: 400 }
          ] },
          { caption: "کمی روغن ریختیم. روغن هم حل نشد: روی آب ایستاد و یک لایه زرد ساخت.", key: 3400, hold: 6000, do: [
            { id: "oilp", to: { o: 1 }, dur: 300 }, { id: "oilp", to: { r: -60 }, at: 400, dur: 600 },
            { emit: "drop", where: [126, 36], spread: [1, 1], rise: -6, n: 6, at: 1000, dur: 1200, life: 500 },
            { id: "gO.oil", to: { o: 1 }, at: 1600, dur: 1400 }, { id: "oilp", to: { o: 0 }, at: 3200, dur: 400 }
          ] }
        ],
        question: "کدام در آب حل شد؟",
        options: ["نمک", "ماسه", "روغن"], answer: "نمک" },
      { type: "test", kind: "dissolve", prompt: "اول حدس بزن، بعد امتحان کن: هر کدام را در آب می‌ریزیم و هم می‌زنیم.",
        items: [
          { pic: "🧂", say: "نمک", yes: true },
          { pic: "🪨", say: "سنگ‌ریزه", yes: false },
          { pic: "🍬", say: "آبنبات", yes: true },
          { pic: "🏖️", say: "ماسه", yes: false },
          { pic: "🍯", say: "عسل", yes: true }
        ] },
      { type: "sort", prompt: "در آب حل می‌شود یا نه؟", say: "کدام‌ها در آب حل می‌شوند و کدام‌ها نه؟",
        baskets: [{ label: "حل می‌شود", pic: "✨", value: "yes" }, { label: "حل نمی‌شود", pic: "🪨", value: "no" }],
        items: [
          { pic: "🧂", say: "نمک", basket: "yes" },
          { pic: "🍬", say: "شکر", basket: "yes" },
          { pic: "🏖️", say: "ماسه", basket: "no" },
          { pic: "🫒", say: "روغن زیتون", basket: "no" },
          { pic: "🍚", say: "برنج", basket: "no" }
        ] },
      { type: "choose", prompt: "چرا آب ماده باارزشی است؟", say: "چرا آب برای ما خیلی باارزش است؟",
        options: ["همه جانداران برای زنده ماندن به آن نیاز دارند", "چون رنگ قشنگی دارد"], answer: "همه جانداران برای زنده ماندن به آن نیاز دارند" },
      { type: "home", pic: "🥛 🧂", text: "آزمایش حل شدن را در آشپزخانه انجام بده!",
        need: ["پنج لیوان آب", "یک قاشق از هر کدام: نمک، شکر، ماسه یا خاک، روغن، برنج", "یک قاشق برای هم زدن"],
        steps: [
          "پیش از هر بار، کودک حدس بزند: «حل می‌شود یا نه؟»",
          "یک قاشق از هر چیز را در یک لیوان بریزید و یک دقیقه هم بزنید.",
          "ببینید: ناپدید شد؟ ته نشست؟ روی آب ماند؟ نتیجه‌ها را در جدول بنویسید.",
          "هیچ کدام را نچشید، جز آبی که فقط نمک یا شکر دارد."
        ],
        ask: "روغن کجای لیوان ایستاد؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-14", subject: "science", level: "sapling", emoji: "🥄", title: "کدام زودتر حل می‌شود؟",
    steps: [
      { type: "test", kind: "dissolve", prompt: "حدس بزن، بعد ببین: در هر لیوان یک قاشق شکر می‌ریزیم.", ask: "زود حل می‌شود یا دیر؟",
        yesLabel: "⚡ زود حل می‌شود", noLabel: "🐢 دیر حل می‌شود", yesSaw: "زود حل شد", noSaw: "دیر حل شد",
        items: [
          { pic: "☕", say: "شکر در آب گرم", yes: true },
          { pic: "🧊", say: "شکر در آب یخ", yes: false },
          { pic: "🥄", say: "شکر در آب، با هم زدن", yes: true },
          { pic: "🥛", say: "شکر در آب، بدون هم زدن", yes: false }
        ] },
      { type: "order", prompt: "از زودتر به دیرتر بچین", say: "شکر در کدام لیوان زودتر حل می‌شود؟ از زودتر به دیرتر بچین.", numbered: true,
        items: [{ pic: "☕", label: "گرم و هم‌زده", say: "آب گرم و هم زدن" }, { pic: "🥛", label: "معمولی و هم‌زده", say: "آب معمولی و هم زدن" }, { pic: "🧊", label: "سرد بدون هم زدن", say: "آب سرد بدون هم زدن" }] },
      { type: "choose", prompt: "کدام آزمایش منصفانه است؟", say: "می‌خواهیم ببینیم گرمی آب چه اثری دارد. کدام آزمایش منصفانه است؟",
        options: ["هر دو لیوان یک قاشق شکر و یک‌جور هم زدن؛ فقط گرمی آب فرق دارد", "در لیوان گرم دو قاشق شکر و در لیوان سرد یک قاشق"], answer: "هر دو لیوان یک قاشق شکر و یک‌جور هم زدن؛ فقط گرمی آب فرق دارد" },
      { type: "choose", prompt: "چای شیرین زودتر آماده می‌شود اگر…", say: "قند در چای داغ زودتر حل می‌شود یا در چای سرد؟",
        options: ["چای داغ", "چای سرد"], answer: "چای داغ" },
      { type: "home", pic: "☕ 🧊", text: "آزمایش منصفانه شکر: آب گرم یا آب سرد؟",
        need: ["دو لیوان شفاف", "آب ولرم (نه داغ؛ بزرگ‌تر آماده کند) و آب سرد", "شکر و یک قاشق", "ساعت یا شمردن"],
        steps: [
          "در هر لیوان به یک اندازه آب بریزید: یکی ولرم، یکی سرد.",
          "در هر دو یک قاشق شکر بریزید و با هم شروع به هم زدن کنید. هر دو را یک‌جور هم بزنید.",
          "بشمارید تا شکر هر لیوان ناپدید شود. کدام زودتر بود؟",
          "یک بار دیگر بدون هم زدن امتحان کنید.",
          "بپرسید: «چه چیزی را یکسان نگه داشتیم؟ چه چیزی را عوض کردیم؟»"
        ],
        ask: "شکر در کدام لیوان زودتر حل شد؟" }
    ]
  },
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
    id: "science-sapling-15", subject: "science", level: "sapling", emoji: "🚰", title: "آب ما از کجا می‌آید؟",
    steps: [
      { type: "scene", prompt: "آب شهر و روستای ما از کجا می‌آید؟", bg: "#cdeaf7",
        /* Four ways water reaches people, one after another: a river from the mountain; a well in a village yard,
           its bucket going down and coming up full; a qanat bringing water from under the mountain; a dam lake and
           a pipe to a house's tap. Last, Iran's map: much of the country is dry, so water must be used with care.
           Drawings: js/art/rig-science.js. */
        parts: {
          land: { art: "sci-wc-land" }, river: { art: "sci-river", o: 0 },
          yard: { art: "sci-desert", o: 0 }, well: { art: "sci-well", at: [80, 84], s: 1.6, o: 0 },
          qanat: { art: "sci-qanat", o: 0 },
          pipes: { art: "sci-pipes", o: 0 },
          map: { art: "sci-iran", o: 0 }
        },
        scenes: [
          { caption: "رودها از کوه پایین می‌آیند. خیلی از شهرها آبشان را از رود می‌گیرند.", key: 3800, hold: 5600, do: [
            { id: "river", to: { o: 1 }, at: 300, dur: 100 }, { id: "river", draw: true, at: 300, dur: 3600, ease: "in" }
          ] },
          { caption: "در روستا، مردم از چاه آب برمی‌دارند: آب زیر زمین است.", key: 3600, hold: 6000, do: [
            { id: "yard", to: { o: 1 }, dur: 800 }, { id: "well", to: { o: 1 }, at: 400, dur: 500 },
            { id: "well.bucket", to: { y: 12 }, at: 1200, dur: 1400 }, { id: "well.bucket", to: { y: 0 }, at: 3000, dur: 1600 }
          ] },
          { caption: "در کویر، قنات آب زیر کوه را در یک تونل آرام به روستا می‌آورد.", key: 4400, hold: 6600, do: [
            { id: "qanat", to: { o: 1 }, dur: 800 },
            { id: "qanat.flow", to: { o: 0 }, dur: 1 }, { id: "qanat.flow", to: { o: 1 }, at: 900, dur: 100 }, { id: "qanat.flow", draw: true, at: 900, dur: 3800, ease: "linear" }
          ] },
          { caption: "پشت سد، آب رود جمع می‌شود و از لوله‌ها به خانه‌ها می‌رسد.", key: 4000, hold: 6400, do: [
            { id: "pipes", to: { o: 1 }, dur: 800 },
            { id: "pipes.flow", to: { o: 0 }, dur: 1 }, { id: "pipes.flow", to: { o: 1 }, at: 900, dur: 100 }, { id: "pipes.flow", draw: true, at: 900, dur: 2800, ease: "linear" },
            { emit: "drop", where: [127, 51], spread: [1, 1], rise: -4, n: 10, at: 3700, dur: 2200, life: 600 }
          ] },
          { caption: "بیشتر جاهای ایران کم‌باران است. پس باید آب را با دقت مصرف کنیم.", key: 2600, hold: 6000, do: [
            { id: "map", to: { o: 1 }, dur: 800 }, { id: "map.desert", to: { o: 1 }, at: 900, dur: 1200 }
          ] }
        ],
        question: "قنات آب را از کجا می‌آورد؟",
        options: ["از زیر زمین، از دل کوه", "از دریا", "از ابرها"], answer: "از زیر زمین، از دل کوه" },
      { type: "order", prompt: "سفر آب تا خانه را بچین", say: "اول باران روی کوه می‌بارد، بعد آب رود می‌شود، پشت سد جمع می‌شود و از لوله به خانه می‌رسد. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌧️", label: "باران", say: "باران روی کوه" }, { pic: "🏞️", label: "رود", say: "رود" }, { label: "سد", pic: "🌊", say: "دریاچه پشت سد" }, { pic: "🚰", label: "شیر خانه", say: "شیر آب خانه" }] },
      { type: "choose", prompt: "چرا در ایران باید آب را با دقت مصرف کنیم؟", say: "چرا در ایران باید آب را با دقت مصرف کنیم؟",
        options: ["چون بیشتر جاهایش کم‌باران است", "چون آب هیچ‌وقت تمام نمی‌شود"], answer: "چون بیشتر جاهایش کم‌باران است" },
      { type: "choose", prompt: "کدام کار آب را نگه می‌دارد؟", say: "کدام کار آب را هدر نمی‌دهد؟",
        options: ["کوتاه دوش گرفتن", "باز گذاشتن شیر آب"], answer: "کوتاه دوش گرفتن" },
      { type: "home", pic: "📒 💧", text: "دفترچه آب: امروز آب را برای چه کارهایی مصرف کردیم؟",
        need: ["کاغذ و مداد"],
        steps: [
          "یک جدول بکشید: خوردن، شستن دست، مسواک، ظرف، حمام، آب دادن به گلدان.",
          "در طول روز، هر بار که آب مصرف کردید، کودک یک قطره در ستون همان کار بکشد.",
          "شب بشمارید: بیشتر آب برای چه کاری بود؟",
          "از بزرگ‌ترها بپرسید آب خانه شما از کجا می‌آید: رود، چاه، قنات یا سد؟ با هم یک راه برای کم کردن مصرف آب پیدا کنید."
        ],
        ask: "کجا می‌توانیم کمتر آب مصرف کنیم؟" }
    ]
  },
  {
    id: "science-sapling-16", subject: "science", level: "sapling", emoji: "🌳", title: "هوای سالم، آب سالم",
    steps: [
      { type: "scene", prompt: "چه چیزی هوا و آب را کثیف می‌کند؟", bg: "#cdeaf7",
        /* What makes air and water dirty and what keeps them clean: smoke from a car's exhaust and a factory chimney
           drifts up; trees by the road catch dust (the air clears around them); a plastic bottle floats in the river;
           a hand takes it out and puts it in a bin; muddy water poured through a bottle filter of gravel, sand and
           cotton comes out clearer below, to look at, not to drink. Drawings: js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, factory: { art: "sci-factory", at: [128, 70], s: 1.2 },
          car: { art: "🚗", at: [-20, 86], s: 1.2, flip: true },
          sm1: { art: "sci-smoke", at: [138, 24], s: 1.2, o: 0 }, sm4: { art: "sci-smoke", at: [138, 24], s: 1.2, o: 0 },
          sm2: { art: "sci-smoke", at: [-4, 82], s: 0.8, o: 0 }, sm3: { art: "sci-smoke", at: [31, 82], s: 0.8, o: 0 },
          haze: { art: "sci-grey", o: 0 },
          t1: { art: "sci-tree", at: [36, 84], s: 0.45, o: 0 }, t2: { art: "sci-tree", at: [84, 84], s: 0.45, o: 0 },
          land: { art: "sci-wc-land", o: 0 }, river: { art: "sci-river", o: 0 }, litter: { art: "sci-litter", at: [70, 74], s: 1.2, o: 0 },
          hand: { art: "hand", at: [70, -20], r: 180, s: 0.7, o: 0 }, bin: { art: "sci-bin-plastic", at: [120, 88], s: 0.8, o: 0 },
          table: { art: "sci-table", o: 0 }, filter: { art: "sci-filter", at: [80, 72], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "دود ماشین‌ها و کارخانه‌ها هوا را کثیف می‌کند.", key: 3400, hold: 6000, do: [
            { id: "car", path: "M-20 86L110 86", dur: 4400, ease: "linear" },
            { id: "sm2", to: { o: 1 }, at: 800, dur: 200 }, { id: "sm2", path: "M-4 82Q0 70 6 58", at: 800, dur: 2800 }, { id: "sm2", to: { o: 0 }, at: 3600, dur: 600 },
            { id: "sm3", to: { o: 1 }, at: 2000, dur: 200 }, { id: "sm3", path: "M31 82Q35 70 41 58", at: 2000, dur: 2800 }, { id: "sm3", to: { o: 0 }, at: 4800, dur: 600 },
            { id: "sm1", to: { o: 1 }, at: 400, dur: 300 }, { id: "sm1", path: "M138 24Q142 14 150 4", at: 400, dur: 3600 },
            { id: "sm4", to: { o: 1 }, at: 2000, dur: 300 }, { id: "sm4", path: "M138 24Q141 18 145 12", at: 2000, dur: 3000 },
            { id: "haze", to: { o: 0.45 }, at: 1000, dur: 3000 }
          ] },
          { caption: "درخت‌ها گرد و خاک هوا را می‌گیرند و هوا را تمیزتر می‌کنند.", key: 3200, hold: 5600, do: [
            { id: "t1", to: { o: 1 }, dur: 600 }, { id: "t2", to: { o: 1 }, at: 300, dur: 600 },
            { id: "haze", to: { o: 0.08 }, at: 1000, dur: 2400 }, { id: "sm1", to: { o: 0 }, at: 1000, dur: 1000 }, { id: "sm4", to: { o: 0 }, at: 1000, dur: 1000 }
          ] },
          { caption: "زباله‌ای که در رود می‌اندازند، آب را کثیف می‌کند. ما آن را برمی‌داریم و در سطل زباله می‌اندازیم.", key: 3600, hold: 6800, do: [
            { id: "land", to: { o: 1 }, dur: 800 }, { id: "river", to: { o: 1 }, dur: 800 }, { id: "haze", to: { o: 0 }, dur: 800 },
            { id: "litter", to: { o: 1 }, at: 600, dur: 300 }, { id: "litter", to: { r: 10 }, at: 900, dur: 800, yoyo: true, times: 2 },
            { id: "hand", to: { o: 1 }, at: 2200, dur: 200 }, { id: "hand", path: "M70 -20L70 52", at: 2200, dur: 900, ease: "out" },
            { id: "bin", to: { o: 1 }, at: 2400, dur: 300 },
            { id: "hand", path: "M70 52Q96 30 120 46", at: 3300, dur: 1200 }, { id: "litter", path: "M70 74Q96 52 120 68", at: 3300, dur: 1200 },
            { id: "litter", to: { o: 0 }, at: 4600, dur: 300 }, { id: "hand", to: { o: 0 }, at: 4800, dur: 300 }
          ] },
          { caption: "آب گل‌آلود را از یک صافی سنگ‌ریزه، ماسه و پنبه رد کردیم. آبی که پایین آمد زلال‌تر شد. ولی این آب را نمی‌نوشیم!", key: 5200, hold: 7400, do: [
            { id: "table", to: { o: 1 }, dur: 800 }, { id: "filter", to: { o: 1 }, at: 400, dur: 500 },
            { id: "filter.clean", to: { o: 1, sy: 0 }, at: 900, dur: 1 },
            { id: "filter.muddy", to: { o: 1 }, at: 1000, dur: 500 },
            { emit: "drop", where: [80, 55], spread: [1, 1], rise: -4, n: 12, at: 1800, dur: 3200, life: 500 },
            { id: "filter.clean", to: { sy: 1 }, at: 1900, dur: 3400 }, { id: "filter.muddy", to: { sy: 0.4 }, at: 1900, dur: 3400 }
          ] }
        ],
        question: "کدام کار هوا را تمیزتر می‌کند؟",
        options: ["درخت کاشتن", "زباله سوزاندن", "ماشین را روشن گذاشتن"], answer: "درخت کاشتن" },
      { type: "sort", prompt: "تمیز می‌کند یا کثیف؟", say: "کدام کار هوا یا آب را تمیز نگه می‌دارد و کدام کثیف می‌کند؟",
        baskets: [{ label: "تمیز نگه می‌دارد", pic: "🌳", value: "clean" }, { label: "کثیف می‌کند", pic: "💨", value: "dirty" }],
        items: [
          { pic: "🌱", say: "درخت کاشتن", basket: "clean" },
          { pic: "🚲", say: "دوچرخه‌سواری به جای ماشین", basket: "clean" },
          { pic: "🗑️", say: "زباله را در سطل انداختن", basket: "clean" },
          { pic: "🚗", say: "روشن گذاشتن ماشین", basket: "dirty" },
          { pic: "🛍️", say: "انداختن کیسه پلاستیکی در رود", basket: "dirty" },
          { pic: "🏭", say: "دود کارخانه", basket: "dirty" }
        ] },
      { type: "choose", prompt: "آب صاف‌شده را می‌شود نوشید؟", say: "آبی که از صافی سنگ‌ریزه و ماسه رد شد را می‌شود نوشید؟",
        options: ["نه، هنوز ممکن است میکروب داشته باشد", "بله، کاملاً تمیز است"], answer: "نه، هنوز ممکن است میکروب داشته باشد" },
      { type: "choose", prompt: "چرا کنار خیابان درخت می‌کاریم؟", say: "چرا کنار خیابان‌ها درخت می‌کاریم؟",
        options: ["چون گرد و خاک هوا را می‌گیرند", "چون دود ماشین‌ها را بیشتر می‌کنند"], answer: "چون گرد و خاک هوا را می‌گیرند" },
      { type: "home", pic: "🧴 🌫️", text: "یک صافی آب بساز و ببین چه می‌شود (فقط برای نگاه کردن)!",
        need: ["یک بطری پلاستیکی که بزرگ‌تر از وسط بریده", "پنبه، ماسه و سنگ‌ریزه شسته", "کمی آب گل‌آلود (آب و خاک)", "یک لیوان"],
        steps: [
          "بزرگ‌تر بطری را از وسط ببرد. نیمه بالایی را برعکس روی لیوان بگذارید.",
          "به ترتیب پنبه، ماسه و سنگ‌ریزه در آن بریزید.",
          "آب گل‌آلود را آرام رویش بریزید و ببینید آبی که پایین می‌آید چه رنگی است.",
          "این آب را ننوشید و به گلدان بدهید. بعد دست‌ها را بشویید."
        ],
        ask: "آب پایین زلال‌تر بود یا گل‌آلودتر؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-17", subject: "science", level: "sapling", emoji: "🌊", title: "بازی آب",
    steps: [
      { type: "order", prompt: "چرخه آب را بچین", say: "آب گرم می‌شود و بالا می‌رود، ابر می‌سازد، باران می‌بارد و به رود و دریا برمی‌گردد. به ترتیب بچین.", numbered: true,
        items: [{ pic: "☀️", label: "گرم شدن آب", say: "خورشید آب را گرم می‌کند" }, { pic: "☁️", label: "ابر", say: "ابر درست می‌شود" }, { pic: "🌧️", label: "باران", say: "باران می‌بارد" }, { pic: "🌊", label: "رود و دریا", say: "آب به رود و دریا برمی‌گردد" }] },
      { type: "sort", prompt: "حل می‌شود یا نه؟", say: "کدام در آب حل می‌شود و کدام نه؟",
        baskets: [{ label: "حل می‌شود", pic: "✨", value: "yes" }, { label: "حل نمی‌شود", pic: "🪨", value: "no" }],
        items: [
          { pic: "🧂", say: "نمک", basket: "yes" },
          { pic: "🍬", say: "شکر", basket: "yes" },
          { pic: "🏖️", say: "ماسه", basket: "no" },
          { pic: "🪨", say: "سنگ‌ریزه", basket: "no" }
        ] },
      { type: "pairs", prompt: "آب از کجا می‌آید؟", say: "هر راه رسیدن آب را به جایش برسان.",
        pairs: [
          [{ label: "قنات", say: "قنات" }, { label: "آب زیر کوه در تونل", say: "آب زیر کوه در تونل" }],
          [{ label: "چاه", say: "چاه" }, { label: "آب زیر زمین روستا", say: "آب زیر زمین روستا" }],
          [{ label: "سد", say: "سد" }, { label: "دریاچه و لوله", say: "دریاچه پشت سد و لوله‌ها" }]
        ] },
      { type: "sort", prompt: "آب را تمیز نگه می‌دارد یا کثیف می‌کند؟", say: "کدام کار آب را تمیز نگه می‌دارد و کدام کثیف می‌کند؟",
        baskets: [{ label: "تمیز", pic: "💧", value: "clean" }, { label: "کثیف", pic: "🛢️", value: "dirty" }],
        items: [
          { pic: "🗑️", say: "زباله را در سطل انداختن", basket: "clean" },
          { pic: "🚰", say: "بستن شیر آب", basket: "clean" },
          { pic: "🛍️", say: "انداختن کیسه در رود", basket: "dirty" },
          { pic: "🧴", say: "ریختن روغن در جوی", basket: "dirty" }
        ] },
      { type: "home", pic: "💧 🔍", text: "در محله آب را دنبال کن!",
        need: ["یک گردش کوتاه در محله"],
        steps: [
          "در کوچه جوی آب، شیر آب، کولر یا ناودان را پیدا کنید: آب از کجا می‌آید و به کجا می‌رود؟",
          "ببینید جوی آب تمیز است یا زباله دارد. اگر زباله دید، به بزرگ‌تر بگوید؛ با دست به آن دست نزند.",
          "در خانه، با هم یک کار برای مصرف کمتر آب انتخاب کنید و یک هفته انجامش دهید."
        ],
        ask: "آب جوی کوچه شما به کجا می‌رود؟" }
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
    id: "science-sapling-18", subject: "science", level: "sapling", emoji: "🧭", title: "قطب‌ها و قطب‌نما",
    steps: [
      { type: "scene", prompt: "دو سر آهنربا چه فرقی دارند؟", bg: "#f6efdc",
        /* Two bar magnets on a table: red end (north) to blue end (south), they snap together; one is turned round,
           and red to red pushes it away. A paper clip stroked with a magnet, put on a leaf floating in a bowl,
           swings round and stops pointing north. A compass needle does the same, even when the compass turns. Last,
           a magnet moved over a rug finds a lost pin. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          m1: { art: "sci-barmag", at: [46, 65], s: 1.4 }, m2: { art: "sci-barmag", at: [114, 65], s: 1.4 },
          clip: { art: "sci-clip", at: [80, 70], s: 3, o: 0 },
          bowl: { art: "sci-bowltop", at: [74, 47], s: 1.5, o: 0 }, north: { art: "sci-north", at: [140, 46], s: 1.6, o: 0 },
          compass: { art: "sci-compass", at: [74, 46], s: 2.4, o: 0 },
          rug: { art: "sci-rug-top", o: 0 }, pin: { art: "sci-pin", at: [104, 62], s: 1.6, r: 30, o: 0 },
          m3: { art: "sci-barmag", at: [24, 52], s: 1.1, o: 0 }
        },
        scenes: [
          { caption: "هر آهنربا دو سر دارد: قطب شمال (قرمز) و قطب جنوب (آبی). شمال و جنوب همدیگر را می‌کشند.", key: 3000, hold: 5600, do: [
            { id: "m1", to: { x: 63 }, at: 900, dur: 1300, ease: "in" }, { id: "m2", to: { x: 97 }, at: 900, dur: 1300, ease: "in" },
            { emit: "spark", where: [80, 65], spread: [2, 6], n: 6, at: 2200, dur: 300, life: 600 }
          ] },
          { caption: "یکی را برگرداندیم. حالا دو قطب شمال روبه‌روی هم‌اند: همدیگر را هل می‌دهند!", key: 3600, hold: 6000, do: [
            { id: "m1", to: { x: 46 }, dur: 800 }, { id: "m2", to: { x: 114 }, dur: 800 },
            { id: "m2", to: { sx: -1 }, at: 1000, dur: 700 },
            { id: "m1", to: { x: 66 }, at: 2000, dur: 1000 }, { id: "m2", to: { x: 128 }, at: 2500, dur: 700, ease: "out" }
          ] },
          { caption: "یک گیره را چند بار، فقط از یک طرف، با آهنربا مالیدیم. گیره هم کمی آهنربا شد.", key: 3000, hold: 6400, do: [
            { id: "m2", to: { o: 0 }, dur: 400 }, { id: "m1", to: { o: 0 }, dur: 400 },
            { id: "clip", to: { o: 1 }, at: 300, dur: 500 },
            { id: "m1", to: { x: 56, y: 57 }, at: 500, dur: 1 }, { id: "m1", to: { o: 1 }, at: 600, dur: 300 },
            { id: "m1", path: "M56 57L104 57", at: 900, dur: 900 }, { id: "m1", path: "M104 57Q80 40 56 57", at: 1800, dur: 700 },
            { id: "m1", path: "M56 57L104 57", at: 2500, dur: 900 }, { id: "m1", path: "M104 57Q80 40 56 57", at: 3400, dur: 700 },
            { id: "m1", path: "M56 57L104 57", at: 4100, dur: 900 }
          ] },
          { caption: "گیره را روی برگی در کاسه آب گذاشتیم. برگ چرخید و ایستاد: سر گیره رو به شمال بود!", key: 4600, hold: 6400, do: [
            { id: "table", to: { o: 0 }, dur: 600 }, { id: "m1", to: { o: 0 }, dur: 400 }, { id: "clip", to: { o: 0 }, dur: 400 },
            { id: "bowl", to: { o: 1 }, at: 300, dur: 600 }, { id: "north", to: { o: 1 }, at: 600, dur: 500 },
            { id: "bowl.float", to: { r: -112 }, at: 1200, dur: 1800, ease: "out" }, { id: "bowl.float", to: { r: -84 }, at: 3000, dur: 900 },
            { id: "bowl.float", to: { r: -90 }, at: 3900, dur: 600 }
          ] },
          { caption: "قطب‌نما هم یک آهنربای کوچک دارد. هر طرف بچرخانیمش، سر قرمز عقربه رو به شمال می‌ماند.", key: 4400, hold: 6600, do: [
            { id: "bowl", to: { o: 0 }, dur: 500 },
            { id: "compass.needle", to: { r: 60 }, dur: 1 }, { id: "compass", to: { o: 1 }, at: 300, dur: 500 },
            { id: "compass.needle", to: { r: -14 }, at: 900, dur: 1200, ease: "out" }, { id: "compass.needle", to: { r: 0 }, at: 2100, dur: 500 },
            { id: "compass", to: { r: 45 }, at: 2900, dur: 1400 }, { id: "compass.needle", to: { r: -45 }, at: 2900, dur: 1400 }
          ] },
          { caption: "سوزن مادربزرگ لای فرش گم شد. آهنربا را آرام روی فرش کشیدیم: سوزن پرید و به آن چسبید!", key: 3400, hold: 6400, do: [
            { id: "compass", to: { o: 0 }, dur: 500 }, { id: "north", to: { o: 0 }, dur: 500 }, { id: "rug", to: { o: 1 }, dur: 700 },
            { id: "pin", to: { o: 1 }, at: 500, dur: 400 }, { id: "m3", to: { o: 1 }, at: 700, dur: 400 },
            { id: "m3", path: "M24 52L104 52", at: 1100, dur: 2200, ease: "linear" },
            { id: "pin", to: { y: 55.6, r: 0 }, at: 2900, dur: 200, ease: "out" },
            { id: "m3", path: "M104 52L136 34", at: 4000, dur: 1600 }, { id: "pin", path: "M104 55.6L136 37.6", at: 4000, dur: 1600 }
          ] }
        ],
        question: "اگر دو قطب شمال آهنربا به هم نزدیک شوند، چه می‌شود؟",
        options: ["همدیگر را هل می‌دهند", "همدیگر را می‌کشند", "هیچ اتفاقی نمی‌افتد"], answer: "همدیگر را هل می‌دهند" },
      { type: "sort", prompt: "می‌کشند یا هل می‌دهند؟", say: "قرمز قطب شمال است و آبی قطب جنوب. این دو سر همدیگر را می‌کشند یا هل می‌دهند؟",
        baskets: [{ label: "می‌کشند", pic: "🤝", value: "pull" }, { label: "هل می‌دهند", pic: "↔️", value: "push" }],
        items: [
          { pic: "🔴🔵", say: "قطب شمال کنار قطب جنوب", basket: "pull" },
          { pic: "🔵🔴", say: "قطب جنوب کنار قطب شمال", basket: "pull" },
          { pic: "🔴🔴", say: "دو قطب شمال", basket: "push" },
          { pic: "🔵🔵", say: "دو قطب جنوب", basket: "push" }
        ] },
      { type: "choose", prompt: "سر قرمز عقربه قطب‌نما رو به کدام طرف است؟", say: "سر قرمز عقربه قطب‌نما همیشه رو به کدام طرف می‌ایستد؟",
        options: ["شمال", "جنوب"], answer: "شمال" },
      { type: "choose", prompt: "سوزن لای فرش گم شده. چه کنیم؟", say: "سوزن لای فرش گم شده. بهترین راه پیدا کردنش چیست؟",
        options: ["آهنربا را آرام روی فرش بکشیم", "پابرهنه روی فرش راه برویم"], answer: "آهنربا را آرام روی فرش بکشیم" },
      { type: "home", pic: "🧲 🍃", text: "با یک گیره و یک برگ، قطب‌نما بساز!",
        need: ["یک آهنربای میله‌ای یا نعلی", "یک گیره کاغذ", "یک برگ یا در پلاستیکی بطری", "یک کاسه آب"],
        steps: [
          "بزرگ‌تر گیره را صاف کند.",
          "گیره را ۲۰ بار با یک سر آهنربا بمالید؛ همیشه از یک طرف به طرف دیگر.",
          "برگ را روی آب کاسه بگذارید و گیره را آرام رویش بگذارید.",
          "صبر کنید تا برگ بایستد. با قطب‌نمای گوشی یک بزرگ‌تر ببینید: یک سر گیره رو به شمال است؟",
          "برگ را کمی بچرخانید و ول کنید. دوباره به همان طرف برمی‌گردد؟"
        ],
        ask: "گیره رو به کدام طرف ایستاد؟" }
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
    id: "science-sapling-19", subject: "science", level: "sapling", emoji: "👀", title: "ما چطور می‌بینیم؟",
    steps: [
      { type: "scene", prompt: "چشم ما چطور چیزها را می‌بیند؟", bg: "#cdeaf7",
        /* Light sources: the sun sets, then a lamp lights in a house window and fireflies glow in a bush. The moon
           has no light of its own: a ray from the sun (off the stage) hits it and comes back down to the girl's
           eyes. Indoors, light goes from the lamp to an apple and from the apple to the girl's eyes, so she sees it;
           when the lamp goes off, no light reaches her eyes and the apple can't be seen. Drawings:
           js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, sun: { art: "sci-sun", at: [30, 22], s: 1.4 },           ground: { art: "sci-ground" }, house: { art: "sci-house", at: [124, 72], s: 1.2 }, bush: { art: "sci-bush", at: [74, 78], s: 0.9 },
          night: { art: "sci-night", o: 0 }, moon: { art: "sci-moonphase", look: { phase: 0.5 }, at: [132, 16], s: 1.3, o: 0 },
          w1: { art: "sci-lampglow", at: [133, 58], s: 0.3, o: 0 }, w2: { art: "sci-lampglow", at: [115, 58], s: 0.3, o: 0 },
          ff1: { art: "sci-firefly", at: [66, 62], s: 0.8, o: 0 }, ff2: { art: "sci-firefly", at: [80, 56], s: 0.8, o: 0 }, ff3: { art: "sci-firefly", at: [86, 66], s: 0.8, o: 0 },
          girl: { art: "👧", at: [40, 86], s: 1.2, o: 0 },
          rIn: { art: "sci-ray", at: [-4, 12], r: 3, sx: 0, o: 0 }, rOut: { art: "sci-ray", at: [128, 18], r: 154, sx: 0, o: 0 },
          room: { art: "sci-room", o: 0 }, glow: { art: "sci-lampglow", at: [80, 26], o: 0 }, lamp: { art: "h-lamp", at: [80, 0], s: 1.4, o: 0 },
          apple: { art: "sci-apple", at: [126, 52], s: 1.6, o: 0 },
          kid: { art: "👧", at: [36, 86], s: 1.2, o: 0 },
          r1: { art: "sci-ray", at: [82, 28], r: 28, sx: 0, o: 0 }, r2: { art: "sci-ray", at: [120, 52], r: 177, sx: 0, o: 0 },
          dark: { art: "sci-night", o: 0 }
        },
        scenes: [
          { caption: "خورشید، چراغ و کرم شب‌تاب خودشان نور دارند. به آن‌ها «منبع نور» می‌گوییم.", key: 5200, hold: 7000, do: [
            { id: "sun.rays", to: { r: 45 }, dur: 2400 },
            { id: "sun", to: { y: 84 }, at: 1400, dur: 2600, ease: "in" }, { id: "night", to: { o: 0.6 }, at: 1800, dur: 2400 },
            { id: "house.light", to: { o: 1 }, at: 3400, dur: 600 }, { id: "w1", to: { o: 1 }, at: 3400, dur: 600 }, { id: "w2", to: { o: 1 }, at: 3400, dur: 600 },
            { id: "ff1", to: { o: 1 }, at: 3800, dur: 300 }, { id: "ff2", to: { o: 1 }, at: 3800, dur: 300 }, { id: "ff3", to: { o: 1 }, at: 3800, dur: 300 },
            { id: "ff1.glow", to: { o: 1 }, at: 4000, dur: 500, yoyo: true, times: 3 }, { id: "ff2.glow", to: { o: 1 }, at: 4300, dur: 500, yoyo: true, times: 3 },
            { id: "ff3.glow", to: { o: 1 }, at: 4600, dur: 500, yoyo: true, times: 3 },
            { id: "ff1", path: "M66 62Q60 56 64 50", at: 4000, dur: 3000 }, { id: "ff2", path: "M80 56Q88 50 94 54", at: 4000, dur: 3000 }
          ] },
          { caption: "ماه خودش نور ندارد. نور خورشید به ماه می‌خورد و از آنجا به چشم ما می‌رسد.", key: 4400, hold: 6800, do: [
            { id: "ff1", to: { o: 0 }, dur: 500 }, { id: "ff2", to: { o: 0 }, dur: 500 }, { id: "ff3", to: { o: 0 }, dur: 500 },
            { id: "moon", to: { o: 1 }, at: 300, dur: 800 }, { id: "girl", to: { o: 1 }, at: 300, dur: 600 },
            { id: "rIn", to: { o: 1 }, at: 1300, dur: 100 }, { id: "rIn", to: { sx: 3.3 }, at: 1300, dur: 1400, ease: "linear" },
            { id: "rOut", to: { o: 1 }, at: 2700, dur: 100 }, { id: "rOut", to: { sx: 2.3 }, at: 2700, dur: 1400, ease: "linear" }
          ] },
          { caption: "در اتاق، نور چراغ به سیب می‌خورد و از سیب به چشم ما می‌رسد. این‌طوری سیب را می‌بینیم.", key: 4400, hold: 6800, do: [
            { id: "room", to: { o: 1 }, dur: 800 }, { id: "rIn", to: { o: 0 }, dur: 400 }, { id: "rOut", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 0 }, dur: 400 },
            { id: "lamp", to: { o: 1 }, at: 600, dur: 400 }, { id: "glow", to: { o: 1 }, at: 900, dur: 500 },
            { id: "apple", to: { o: 1 }, at: 700, dur: 400 }, { id: "kid", to: { o: 1 }, at: 700, dur: 400 },
            { id: "r1", to: { o: 1 }, at: 1500, dur: 100 }, { id: "r1", to: { sx: 1.2 }, at: 1500, dur: 1200, ease: "linear" },
            { id: "r2", to: { o: 1 }, at: 2800, dur: 100 }, { id: "r2", to: { sx: 1.95 }, at: 2800, dur: 1500, ease: "linear" }
          ] },
          { caption: "چراغ را خاموش کردیم. هیچ نوری به سیب نمی‌خورد و به چشم ما نمی‌رسد؛ پس سیب را نمی‌بینیم.", key: 2600, hold: 6000, do: [
            { id: "glow", to: { o: 0 }, at: 600, dur: 200 }, { id: "r1", to: { o: 0 }, at: 600, dur: 200 }, { id: "r2", to: { o: 0 }, at: 600, dur: 200 },
            { id: "dark", to: { o: 0.92 }, at: 600, dur: 400 }
          ] }
        ],
        question: "کدام خودش نور ندارد؟",
        options: ["ماه", "خورشید", "کرم شب‌تاب"], answer: "ماه" },
      { type: "sort", prompt: "خودش نور دارد یا نه؟", say: "کدام‌ها خودشان نور می‌دهند و کدام‌ها فقط نور را برمی‌گردانند؟",
        baskets: [{ label: "خودش نور دارد", pic: "💡", value: "yes" }, { label: "خودش نور ندارد", pic: "🪞", value: "no" }],
        items: [
          { pic: "☀️", say: "خورشید", basket: "yes" },
          { pic: "🕯️", say: "شمع روشن", basket: "yes" },
          { pic: "🔦", say: "چراغ‌قوه روشن", basket: "yes" },
          { pic: "🌕", say: "ماه", basket: "no" },
          { pic: "🪞", say: "آینه", basket: "no" },
          { pic: "🍎", say: "سیب", basket: "no" }
        ] },
      { type: "choose", prompt: "ما چطور سیب را می‌بینیم؟", say: "ما چطور سیب را می‌بینیم؟",
        options: ["نور به سیب می‌خورد و از سیب به چشم ما می‌رسد", "از چشم ما نور بیرون می‌آید"], answer: "نور به سیب می‌خورد و از سیب به چشم ما می‌رسد" },
      { type: "choose", prompt: "در اتاق کاملاً تاریک چه می‌بینیم؟", say: "در اتاقی که هیچ نوری ندارد، چه می‌بینیم؟",
        options: ["هیچ چیز", "فقط چیزهای سفید"], answer: "هیچ چیز" },
      { type: "home", pic: "📦 🔦", text: "جعبه تاریک: بدون نور چه می‌بینیم؟",
        need: ["یک جعبه کفش با در", "یک اسباب‌بازی کوچک", "یک چراغ‌قوه"],
        steps: [
          "بزرگ‌تر یک سوراخ کوچک برای نگاه کردن در یک سر جعبه درست کند.",
          "اسباب‌بازی را در جعبه بگذارید و در را ببندید. از سوراخ نگاه کنید: چه می‌بینید؟",
          "حالا در را کمی باز کنید یا با چراغ‌قوه از گوشه در نور بتابانید. دوباره نگاه کنید.",
          "با هم بگویید: نور از چراغ به اسباب‌بازی خورد و بعد به چشم ما رسید."
        ],
        ask: "کی اسباب‌بازی را دیدی؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-20", subject: "science", level: "sapling", emoji: "🌍", title: "زمین می‌چرخد",
    steps: [
      { type: "scene", prompt: "چرا روز و شب می‌شود؟", bg: "#1f2a52",
        /* The sun on the left and the Earth on the right, lit only on the sun's side. The Earth turns slowly and our
           house (marked with a ring) comes round into the light: morning; it keeps turning and the house goes into
           the dark: night. Last, back on the ground: the sun seems to cross the sky, but it is we who turn with the
           Earth. Drawings: js/art/rig-science.js. */
        parts: {
          stars: { art: "sci-stars" },
          sun: { art: "sci-sun", at: [22, 46], s: 1.8 },
          globe: { art: "sci-globe", at: [104, 46], s: 1.25 }, globeNight: { art: "sci-globe-night", at: [104, 46], s: 1.25 },
          ring: { art: "sci-ring", at: [30, 0], s: 1.3, o: 0, under: "globe" },
          sky: { art: "sci-sky", o: 0 }, sun2: { art: "sci-sun", at: [134, 60], s: 1.1, o: 0 },
          ground: { art: "sci-ground", o: 0 }, house: { art: "sci-house", at: [80, 82], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "خورشید فقط به یک طرف زمین نور می‌دهد. آن طرف روز است و این طرف شب.", key: 3000, hold: 6000, do: [
            { id: "sun.rays", to: { r: 45 }, dur: 4000 },
            { id: "ring", to: { o: 1 }, at: 1600, dur: 400 }, { id: "ring", to: { s: 1.6 }, at: 2000, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "زمین مثل فرفره دور خودش می‌چرخد. خانه ما آرام‌آرام به طرف نور می‌آید: صبح می‌شود.", key: 5400, hold: 7000, do: [
            { id: "globe", to: { r: -180 }, at: 300, dur: 6000, ease: "linear" }, { id: "sun.rays", to: { r: 90 }, dur: 6000 }
          ] },
          { caption: "زمین باز هم می‌چرخد و خانه ما به طرف تاریک می‌رود: شب می‌شود. هر دور کامل زمین، یک شبانه‌روز است.", key: 5400, hold: 7000, do: [
            { id: "globe", to: { r: -360 }, at: 300, dur: 6000, ease: "linear" }, { id: "sun.rays", to: { r: 135 }, dur: 6000 }
          ] },
          { caption: "از روی زمین به نظر می‌رسد خورشید در آسمان راه می‌رود؛ ولی خورشید سر جایش است و این ما هستیم که با زمین می‌چرخیم.", key: 4400, hold: 7600, do: [
            { id: "sky", to: { o: 1 }, dur: 900 }, { id: "ground", to: { o: 1 }, dur: 900 }, { id: "house", to: { o: 1 }, dur: 900 },
            { id: "sun2", to: { o: 1 }, at: 600, dur: 400 }, { id: "sun2", path: "M134 60Q80 -6 26 60", at: 900, dur: 6000, ease: "linear" },
            { id: "sun2.rays", to: { r: 180 }, at: 900, dur: 6000 }
          ] }
        ],
        question: "چرا روز و شب می‌شود؟",
        options: ["چون زمین دور خودش می‌چرخد", "چون خورشید شب‌ها خاموش می‌شود", "چون ابرها خورشید را می‌پوشانند"], answer: "چون زمین دور خودش می‌چرخد" },
      { type: "choose", prompt: "وقتی خانه ما طرف خورشید است، چه وقتی است؟", say: "وقتی خانه ما طرف خورشید است، روز است یا شب؟",
        options: ["روز", "شب"], answer: "روز" },
      { type: "choose", prompt: "وقتی اینجا شب است، آن طرف زمین چه خبر است؟", say: "وقتی اینجا شب است، آن طرف زمین روز است یا شب؟",
        options: ["روز است و بچه‌ها بیدارند", "آنجا هم شب است"], answer: "روز است و بچه‌ها بیدارند" },
      { type: "choose", prompt: "خورشید واقعاً در آسمان راه می‌رود؟", say: "خورشید واقعاً در آسمان راه می‌رود، یا ما با زمین می‌چرخیم؟",
        options: ["نه، ما با زمین می‌چرخیم", "بله، خورشید دور خانه ما می‌چرخد"], answer: "نه، ما با زمین می‌چرخیم" },
      { type: "home", pic: "🔦 🍊", text: "با یک چراغ‌قوه و یک پرتقال، روز و شب بساز!",
        need: ["یک چراغ‌قوه", "یک پرتقال یا توپ", "یک برچسب کوچک یا خلال دندان شکسته (خانه ما)"],
        steps: [
          "برچسب را روی پرتقال بچسبانید: این خانه ماست.",
          "اتاق را تاریک کنید. یک نفر چراغ‌قوه را روشن نگه دارد و به پرتقال بتاباند: این خورشید است.",
          "پرتقال را آرام دور خودش بچرخانید. کی خانه ما در نور است؟ کی در تاریکی؟",
          "بگویید: «صبح شد!» وقتی خانه به نور می‌رسد، و «شب شد!» وقتی به تاریکی می‌رود."
        ],
        ask: "چراغ‌قوه حرکت کرد یا پرتقال چرخید؟" }
    ]
  },
  {
    id: "science-sapling-21", subject: "science", level: "sapling", emoji: "🕰️", title: "ساعت آفتابی",
    steps: [
      { type: "shadow", thing: "🚩", prompt: "خورشید را در آسمان جابه‌جا کن و سایه چوب پرچم را ببین.",
        tasks: [
          { prompt: "صبح است: خورشید را پایین، طرف شرق (راست) بیاور. سایه بلند به طرف چپ می‌افتد.", want: "left" },
          { prompt: "حالا ظهر کن: سایه را از همه کوتاه‌تر کن.", want: "short" },
          { prompt: "حالا عصر کن: سایه بلند را طرف راست بینداز.", want: "right" }
        ],
        question: "اگر سایه چوب خیلی کوتاه باشد، چه وقت روز است؟",
        options: ["ظهر", "صبح زود", "عصر دیر"], answer: "ظهر" },
      { type: "scene", prompt: "با سایه یک چوب ساعت بسازیم", bg: "#e8d3a6",
        /* A stick in a sandy yard, seen from above (north is up). At nine in the morning the sun is in the east and
           the stick's long shadow points west: a stone marks its tip. At noon the sun is in the south and the shadow
           is short and points north: a second stone. At three in the afternoon the long shadow points east: a third
           stone. The next day at nine the shadow falls on the first stone again. Drawings: js/art/rig-science.js. */
        parts: {
          yard: { art: "sci-yardtop" },
          st1: { art: "sci-stone", at: [38.7, 47], s: 0.75, o: 0 }, st2: { art: "sci-stone", at: [80, 46], s: 0.75, o: 0 }, st3: { art: "sci-stone", at: [121.3, 47], s: 0.75, o: 0 },
          shadow: { art: "sci-shadowline", at: [80, 60], r: 200, sx: 0, o: 0 },
          stick: { art: "sci-sticktop", at: [80, 60], s: 1.2 },
          sun: { art: "sci-sun", at: [150, 76], s: 1.1, o: 0 },
          ring: { art: "sci-ring", at: [38.7, 45], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "یک چوب را در خاک حیاط فرو کردیم. ساعت ۹ صبح خورشید طرف شرق است و سایه چوب بلند است. سر سایه یک سنگ گذاشتیم.", key: 4400, hold: 7000, do: [
            { id: "sun", to: { o: 1 }, at: 300, dur: 600 }, { id: "sun.rays", to: { r: 45 }, dur: 5000 },
            { id: "shadow", to: { o: 1 }, at: 900, dur: 100 }, { id: "shadow", to: { sx: 1.1 }, at: 900, dur: 1600 },
            { id: "st1", to: { o: 1 }, at: 3200, dur: 500 }
          ] },
          { caption: "ظهر خورشید طرف جنوب و بالای آسمان است. سایه از همه کوتاه‌تر شده. سنگ دوم را گذاشتیم.", key: 4600, hold: 7000, do: [
            { id: "sun", path: "M150 76Q120 88 80 86", dur: 3000 }, { id: "sun.rays", to: { r: 90 }, dur: 3000 },
            { id: "shadow", to: { r: 270, sx: 0.4 }, dur: 3000 },
            { id: "st2", to: { o: 1 }, at: 3400, dur: 500 }
          ] },
          { caption: "ساعت ۳ عصر خورشید طرف غرب رفته و سایه دوباره بلند شده؛ این بار به طرف دیگر. سنگ سوم را گذاشتیم.", key: 4600, hold: 7000, do: [
            { id: "sun", path: "M80 86Q40 88 10 76", dur: 3000 }, { id: "sun.rays", to: { r: 135 }, dur: 3000 },
            { id: "shadow", to: { r: 340, sx: 1.1 }, dur: 3000 },
            { id: "st3", to: { o: 1 }, at: 3400, dur: 500 }
          ] },
          { caption: "فردا ساعت ۹ صبح، سایه دوباره روی سنگ اول افتاد! حالا با سایه چوب می‌فهمیم ساعت چند است.", key: 4200, hold: 7000, do: [
            { id: "shadow", to: { o: 0 }, dur: 500 }, { id: "sun", to: { o: 0 }, dur: 500 },
            { id: "sun", to: { x: 150, y: 76 }, at: 600, dur: 1 }, { id: "shadow", to: { r: 200, sx: 0 }, at: 600, dur: 1 },
            { id: "sun", to: { o: 1 }, at: 900, dur: 500 }, { id: "shadow", to: { o: 1 }, at: 1100, dur: 100 }, { id: "shadow", to: { sx: 1.1 }, at: 1100, dur: 1600 },
            { id: "ring", to: { o: 1 }, at: 3000, dur: 300 }, { id: "ring", to: { s: 1.5 }, at: 3300, dur: 600, yoyo: true, times: 3 }
          ] }
        ],
        question: "ظهر سایه چوب چطور است؟",
        options: ["از همه کوتاه‌تر", "از همه بلندتر", "اصلاً سایه ندارد"], answer: "از همه کوتاه‌تر" },
      { type: "order", prompt: "سایه‌ها را از صبح تا عصر بچین", say: "صبح سایه بلند است، ظهر کوتاه، عصر دوباره بلند. از صبح تا عصر بچین.", numbered: true,
        items: [{ pic: "🌅", label: "صبح: سایه بلند", say: "صبح، سایه بلند" }, { pic: "☀️", label: "ظهر: سایه کوتاه", say: "ظهر، سایه کوتاه" }, { pic: "🌇", label: "عصر: سایه بلند", say: "عصر، سایه بلند" }] },
      { type: "choose", prompt: "روز ابری ساعت آفتابی کار می‌کند؟", say: "در یک روز خیلی ابری، ساعت آفتابی کار می‌کند؟",
        options: ["نه، چون سایه درستی نمی‌افتد", "بله، بهتر از همیشه"], answer: "نه، چون سایه درستی نمی‌افتد" },
      { type: "home", pic: "🪵 🪨", text: "یک ساعت آفتابی بساز!",
        need: ["یک چوب صاف یا یک مداد در یک گلدان خاک", "چند سنگ کوچک یا تکه کاغذ", "یک روز آفتابی", "ساعت خانه"],
        steps: [
          "چوب را جایی آفتابی صاف در خاک فرو کنید که تمام روز آفتاب بخورد.",
          "ساعت ۹ صبح سر سایه چوب یک سنگ بگذارید. با یک بزرگ‌تر ساعت را روی کاغذ کنار سنگ بنویسید.",
          "ساعت ۱۲ و ساعت ۳ هم همین کار را بکنید.",
          "فردا سر همان ساعت‌ها نگاه کنید: سایه روی کدام سنگ افتاده؟",
          "هیچ‌وقت مستقیم به خورشید نگاه نکنید؛ فقط به سایه نگاه کنید."
        ],
        ask: "سایه کی از همه کوتاه‌تر بود؟" }
    ]
  },
  {
    id: "science-sapling-22", subject: "science", level: "sapling", emoji: "🔦", title: "بازی نور و سایه",
    steps: [
      { type: "sort", prompt: "خودش نور دارد یا نه؟", say: "کدام‌ها منبع نورند و خودشان نور می‌دهند؟ کدام‌ها نور ندارند؟",
        baskets: [{ label: "منبع نور", pic: "💡", value: "yes" }, { label: "خودش نور ندارد", pic: "🌑", value: "no" }],
        items: [
          { pic: "☀️", say: "خورشید", basket: "yes" },
          { pic: "💡", say: "لامپ روشن", basket: "yes" },
          { pic: "🕯️", say: "شمع روشن", basket: "yes" },
          { pic: "🌕", say: "ماه", basket: "no" },
          { pic: "🧸", say: "خرس عروسکی", basket: "no" },
          { pic: "🪞", say: "آینه", basket: "no" }
        ] },
      { type: "sort", prompt: "نور از آن رد می‌شود؟", say: "نور از کدام کاملاً رد می‌شود، از کدام کمی، و از کدام اصلاً؟",
        baskets: [{ label: "کاملاً رد می‌شود", pic: "🪟", value: "all" }, { label: "کمی رد می‌شود", pic: "📄", value: "some" }, { label: "رد نمی‌شود", pic: "🧱", value: "none" }],
        items: [
          { pic: "🪟", say: "شیشه پنجره", basket: "all" },
          { pic: "🥛", say: "لیوان آب زلال", basket: "all" },
          { pic: "📄", say: "کاغذ نازک", basket: "some" },
          { pic: "🧻", say: "دستمال کاغذی", basket: "some" },
          { pic: "🪵", say: "تخته چوبی", basket: "none" },
          { pic: "📚", say: "کتاب", basket: "none" }
        ] },
      { type: "order", prompt: "خورشید را از صبح تا عصر بچین", say: "صبح خورشید طرف شرق است، ظهر بالای آسمان، عصر طرف غرب. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌅", label: "صبح، شرق", say: "صبح، خورشید طرف شرق" }, { pic: "☀️", label: "ظهر، بالا", say: "ظهر، خورشید بالای آسمان" }, { pic: "🌇", label: "عصر، غرب", say: "عصر، خورشید طرف غرب" }] },
      { type: "pairs", prompt: "هر سایه کی است؟", say: "هر وقت روز را به سایه‌اش برسان.",
        pairs: [
          [{ pic: "☀️", say: "ظهر" }, { label: "سایه کوتاه", say: "سایه کوتاه" }],
          [{ pic: "🌅", say: "صبح" }, { label: "سایه بلند طرف غرب", say: "سایه بلند طرف غرب" }],
          [{ pic: "🌇", say: "عصر" }, { label: "سایه بلند طرف شرق", say: "سایه بلند طرف شرق" }]
        ] },
      { type: "home", pic: "🖐️ 🔦", text: "نمایش سایه با دست!",
        need: ["یک چراغ‌قوه", "یک دیوار روشن", "دست‌ها"],
        steps: [
          "اتاق را کمی تاریک کنید. یک نفر چراغ‌قوه را به دیوار بتاباند.",
          "دست‌ها را بین چراغ‌قوه و دیوار بگیرید و شکل پرنده، سگ یا خرگوش بسازید.",
          "دست را به چراغ‌قوه نزدیک کنید، بعد دور کنید: سایه چه می‌شود؟",
          "یک کاغذ نازک جلوی چراغ‌قوه بگیرید: نور هنوز به دیوار می‌رسد؟"
        ],
        ask: "سایه کی بزرگ‌تر شد؟" }
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
    id: "science-sapling-23", subject: "science", level: "sapling", emoji: "⛰️", title: "کوه، دره، رود، کویر",
    steps: [
      { type: "scene", prompt: "زمین ایران چه شکل‌هایی دارد؟", bg: "#cdeaf7",
        /* One landscape of Iran; the camera visits each part as it is named: Damavand's snowy top (water as a solid),
           a deep Zagros valley where melted snow starts the Karun (water as a liquid), the flat plain with fields
           and Lake Urmia, and the dry Lut desert with its sand and kaluts. Drawings: js/art/rig-science.js. */
        parts: {
          land: { art: "sci-landscape" }, karun: { art: "sci-karun", o: 0 },
          g1: { art: "sci-glint", at: [28, 20], s: 0.8, o: 0 }, g2: { art: "sci-glint", at: [33, 24], s: 0.6, o: 0 },
          melt: { art: "sci-drop", at: [76, 50], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "ایران کوه، دره، دشت، رود، دریاچه و کویر دارد.", key: 2600, hold: 5400, do: [
            { id: "land", to: { r: 0 }, dur: 2000 }
          ] },
          { caption: "دماوند بلندترین کوه ایران است. روی قله‌اش برف و یخ است: آبِ جامد.", key: 3200, hold: 6000, do: [
            { cam: { x: 32, y: 26, zoom: 2.4 }, dur: 1600 },
            { id: "g1", to: { o: 1 }, at: 1600, dur: 400, yoyo: true, times: 3 }, { id: "g2", to: { o: 1 }, at: 2000, dur: 400, yoyo: true, times: 3 }
          ] },
          { caption: "کوه‌های زاگرس دره‌های گود دارند. برف آب می‌شود و رود کارون در دره راه می‌افتد: آبِ مایع.", key: 4600, hold: 7000, do: [
            { cam: { x: 78, y: 62, zoom: 2 }, dur: 1600 },
            { id: "melt", to: { o: 1 }, at: 1400, dur: 200 }, { id: "melt", to: { y: 58 }, at: 1400, dur: 800, ease: "in" }, { id: "melt", to: { o: 0 }, at: 2100, dur: 200 },
            { id: "karun", to: { o: 1 }, at: 2100, dur: 100 }, { id: "karun", draw: true, at: 2100, dur: 2800, ease: "linear" }
          ] },
          { caption: "دشت صاف و پهن است و کشاورزها در آن گندم می‌کارند. دریاچه ارومیه آب شور دارد و دورش سفیدِ نمک است.", key: 3000, hold: 7000, do: [
            { cam: { x: 104, y: 76, zoom: 2.4 }, dur: 1800 }
          ] },
          { caption: "کویر لوت خیلی خشک و داغ است. آنجا ماسه زیاد است و باد از خاک، تپه‌های بلند به اسم «کلوت» ساخته.", key: 3000, hold: 7000, do: [
            { cam: { x: 142, y: 74, zoom: 2.6 }, dur: 1800 }
          ] }
        ],
        question: "کجا آب به شکل جامد است؟",
        options: ["برف روی قله دماوند", "آب رود کارون", "آب دریاچه ارومیه"], answer: "برف روی قله دماوند" },
      { type: "pairs", prompt: "هر جا را به اسمش برسان", say: "هر شکل زمین را به جایی در ایران برسان.",
        pairs: [
          [{ pic: "🏔️", say: "کوه بلند" }, { label: "دماوند", say: "دماوند" }],
          [{ pic: "🏞️", say: "رود" }, { label: "کارون", say: "کارون" }],
          [{ pic: "🌊", say: "دریاچه" }, { label: "ارومیه", say: "دریاچه ارومیه" }],
          [{ pic: "🏜️", say: "کویر" }, { label: "لوت", say: "کویر لوت" }]
        ] },
      { type: "sort", prompt: "آب جامد است یا مایع؟", say: "در کدام‌ها آب جامد است و در کدام‌ها مایع؟",
        baskets: [{ label: "جامد", pic: "🧊", value: "solid" }, { label: "مایع", pic: "💧", value: "liquid" }],
        items: [
          { pic: "🏔️", say: "برف قله کوه", basket: "solid" },
          { pic: "🧊", say: "یخ رودخانه در زمستان", basket: "solid" },
          { pic: "🏞️", say: "آب رود", basket: "liquid" },
          { pic: "🌊", say: "آب دریاچه", basket: "liquid" },
          { pic: "🌧️", say: "باران", basket: "liquid" }
        ] },
      { type: "choose", prompt: "کجا آب از همه کمتر است؟", say: "در کدام جا آب از همه کمتر است؟",
        options: ["کویر لوت", "دریاچه ارومیه", "رود کارون"], answer: "کویر لوت" },
      { type: "home", pic: "🏔️ 🧊", text: "کوه برفی بساز و ببین رود چطور راه می‌افتد!",
        need: ["یک سینی", "خاک یا ماسه نم‌دار", "چند تکه یخ"],
        steps: [
          "در سینی با خاک نم‌دار یک کوه بسازید و با انگشت یک دره روی آن بکشید.",
          "چند تکه یخ روی قله بگذارید: این برف کوه است.",
          "صبر کنید و نگاه کنید: یخ آب می‌شود و آب از کجا پایین می‌رود؟",
          "پای کوه یک گودی بسازید تا آب در آن جمع شود و دریاچه شود. بعد دست‌ها را بشویید."
        ],
        ask: "آب از دره پایین رفت یا از روی کوه؟" }
    ]
  },
  {
    id: "science-sapling-24", subject: "science", level: "sapling", emoji: "🌊", title: "آب و باد زمین را تغییر می‌دهند",
    steps: [
      { type: "scene", prompt: "زمین چطور شکلش را عوض می‌کند؟", bg: "#cdeaf7",
        /* Slow changes: a river on a flat plateau cuts a valley that slowly gets deeper (thousands of years); wind
           blows sand over the Lut's kaluts and wears them thinner. A fast change: in a storm the river floods its
           banks in a few hours, brown with soil. Last, two hills in the rain: under the trees the roots hold the
           soil; down the bare hill the soil washes away. Drawings: js/art/rig-science.js. */
        parts: {
          canyon: { art: "sci-canyon" },
          kaluts: { art: "sci-kaluts", o: 0 }, s1: { art: "sci-sandblow", at: [-24, 50], s: 1.4, o: 0 }, s2: { art: "sci-sandblow", at: [-24, 62], s: 1.2, o: 0 },
          wind: { art: "sci-wind", at: [8, 30], s: 1.2, o: 0 },
          flood: { art: "sci-floodplain", o: 0 }, house: { art: "sci-house", at: [138, 66], s: 0.8, o: 0 },
          hills: { art: "sci-twohills", o: 0 },
          t1: { art: "sci-tree", at: [16, 52], s: 0.3, o: 0 }, t2: { art: "sci-tree", at: [40, 46], s: 0.32, o: 0 }, t3: { art: "sci-tree", at: [58, 51], s: 0.28, o: 0 },
          rain: { art: "sci-rainfall", o: 0 }
        },
        scenes: [
          { caption: "رود هر روز کمی خاک و سنگ را با خودش می‌برد. در هزاران سال، یک دره گود درست می‌شود.", key: 5000, hold: 7000, do: [
            { id: "canyon.cut", to: { sy: 0.08 }, dur: 1 }, { id: "canyon.cut", to: { sy: 1 }, at: 600, dur: 5000, ease: "linear" }
          ] },
          { caption: "در کویر لوت، باد ماسه را می‌آورد و خاک را آرام‌آرام می‌ساید. باد این کلوت‌ها را ساخته.", key: 4000, hold: 7000, do: [
            { id: "kaluts", to: { o: 1 }, dur: 900 },
            { id: "wind", to: { o: 1 }, at: 900, dur: 100 }, { id: "wind", draw: true, at: 900, dur: 1200 },
            { id: "s1", to: { o: 1 }, at: 1000, dur: 300 }, { id: "s1", to: { x: 170 }, at: 1000, dur: 3000, ease: "linear", times: 2 },
            { id: "s2", to: { o: 1 }, at: 1600, dur: 300 }, { id: "s2", to: { x: 170 }, at: 1600, dur: 3400, ease: "linear", times: 2 },
            { id: "kaluts.k1", to: { sx: 0.8 }, at: 1400, dur: 4000 }, { id: "kaluts.k2", to: { sx: 0.85 }, at: 1400, dur: 4000 }, { id: "kaluts.k3", to: { sx: 0.8 }, at: 1400, dur: 4000 }
          ] },
          { caption: "سیل ولی زود می‌آید! بعد از یک باران خیلی تند، در چند ساعت آب گل‌آلود از رود بیرون می‌زند.", key: 4400, hold: 7000, do: [
            { id: "flood", to: { o: 1 }, dur: 800 }, { id: "house", to: { o: 1 }, dur: 800 }, { id: "wind", to: { o: 0 }, dur: 400 }, { id: "s1", to: { o: 0 }, dur: 300 }, { id: "s2", to: { o: 0 }, dur: 300 },
            { id: "rain", to: { o: 1 }, at: 600, dur: 400 }, { id: "rain", to: { y: "+12" }, at: 600, dur: 600, ease: "linear", times: 9 },
            { id: "flood.flood", to: { sy: 0.2 }, at: 900, dur: 1 }, { id: "flood.flood", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "flood.flood", to: { sy: 1.1 }, at: 1400, dur: 3000 }
          ] },
          { caption: "ریشه درخت‌ها خاک را نگه می‌دارند. روی تپه بی‌درخت، باران خاک را می‌شوید و با خودش می‌برد.", key: 4600, hold: 7400, do: [
            { id: "hills", to: { o: 1 }, dur: 800 }, { id: "house", to: { o: 0 }, dur: 600 },
            { id: "t1", to: { o: 1 }, at: 500, dur: 500 }, { id: "t2", to: { o: 1 }, at: 500, dur: 500 }, { id: "t3", to: { o: 1 }, at: 500, dur: 500 },
            { id: "rain", to: { y: "+12" }, dur: 600, ease: "linear", times: 9 },
            { id: "hills.mud", to: { o: 0 }, dur: 1 }, { id: "hills.mud", to: { o: 1 }, at: 1600, dur: 100 }, { id: "hills.mud", draw: true, at: 1600, dur: 3000, ease: "linear" }
          ] }
        ],
        question: "کدام تغییر خیلی زود اتفاق می‌افتد؟",
        options: ["سیل", "گود شدن دره", "ساخته شدن کلوت‌ها"], answer: "سیل" },
      { type: "sort", prompt: "آرام یا زود؟", say: "کدام تغییرها هزاران سال طول می‌کشند و کدام‌ها زود اتفاق می‌افتند؟",
        baskets: [{ label: "خیلی آرام", pic: "🐢", value: "slow" }, { label: "خیلی زود", pic: "⚡", value: "fast" }],
        items: [
          { pic: "🏞️", say: "رود دره را گود می‌کند", basket: "slow" },
          { pic: "🏜️", say: "باد کلوت می‌سازد", basket: "slow" },
          { pic: "🪨", say: "سنگ کوه کم‌کم خرد می‌شود", basket: "slow" },
          { pic: "🌊", say: "سیل", basket: "fast" },
          { pic: "⛰️", say: "ریزش کوه بعد از زلزله", basket: "fast" }
        ] },
      { type: "choose", prompt: "روی کدام تپه خاک کمتر شسته می‌شود؟", say: "باران تند می‌بارد. روی کدام تپه خاک کمتر شسته می‌شود؟",
        options: ["تپه‌ای که درخت دارد", "تپه بی‌درخت"], answer: "تپه‌ای که درخت دارد" },
      { type: "choose", prompt: "برای اینکه سیل خاک را نبرد، چه کنیم؟", say: "برای اینکه باران و سیل خاک کوه را نبرند، چه کاری خوب است؟",
        options: ["درخت بکاریم", "درخت‌ها را ببریم"], answer: "درخت بکاریم" },
      { type: "home", pic: "🌱 💧", text: "ریشه‌ها خاک را نگه می‌دارند؟ امتحان کن!",
        need: ["دو سینی یا دو در ظرف پلاستیکی", "خاک", "کمی چمن یا علف با ریشه و خاکش (از باغچه، با اجازه)", "یک لیوان آب"],
        steps: [
          "در یک سینی فقط خاک بریزید و در سینی دیگر علف ریشه‌دار با خاکش.",
          "هر دو سینی را کمی کج کنید، مثل یک تپه. یک ظرف زیرشان بگذارید.",
          "از بالا روی هر دو آرام آب بریزید، مثل باران.",
          "ببینید آبی که پایین می‌آید کدام گل‌آلودتر است. بعد دست‌ها را بشویید."
        ],
        ask: "کدام سینی خاک بیشتری از دست داد؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-57", subject: "science", level: "sapling", emoji: "🦩", title: "وقتی زیستگاه تغییر می‌کند",
    steps: [
      { type: "scene", prompt: "اگر خانه جانوران عوض شود، چه می‌شود؟", bg: "#cdeaf7",
        /* Lake Urmia full of salty water, brine shrimp swimming in it and flamingos eating them. Dry years and water
           taken from its rivers make the lake shrink and leave white salt. The flamingos can fly away to another
           lake; the tiny shrimp cannot leave, and fewer of them are left. Last, people help: they waste less water,
           more reaches the lake, it fills a little and the flamingos come back. Drawings: js/art/rig-science.js. */
        parts: {
          lake: { art: "sci-urmia" },
          a1: { art: "sci-artemia", at: [50, 66], s: 1.6 }, a2: { art: "sci-artemia", at: [72, 72], s: 1.6 }, a3: { art: "sci-artemia", at: [98, 64], s: 1.6 }, a4: { art: "sci-artemia", at: [116, 70], s: 1.6 },
          f1: { art: "sci-flamingo", at: [36, 70], s: 0.9 }, f2: { art: "sci-flamingo", at: [128, 74], s: 0.9, flip: true },
          ff1: { art: "sci-flamingo-fly", at: [36, 54], s: 0.9, o: 0 }, ff2: { art: "sci-flamingo-fly", at: [128, 58], s: 0.9, o: 0 },
          grey: { art: "sci-grey", o: 0 }
        },
        scenes: [
          { caption: "دریاچه ارومیه آب شور دارد. میگوهای خیلی ریزی به اسم «آرتمیا» در آن زندگی می‌کنند و فلامینگوها آن‌ها را می‌خورند.", key: 3600, hold: 7000, do: [
            { id: "a1", to: { x: "-10" }, dur: 4000, ease: "linear" }, { id: "a2", to: { x: "-8" }, dur: 4000, ease: "linear" },
            { id: "a3", to: { x: "-10" }, dur: 4000, ease: "linear" }, { id: "a4", to: { x: "-8" }, dur: 4000, ease: "linear" },
            { id: "f1", to: { r: -8 }, at: 1600, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "چند سال باران کم آمد و آب رودها را برای کشاورزی برداشتند. دریاچه کوچک شد و جای آب، نمک سفید ماند.", key: 4800, hold: 7400, do: [
            { id: "grey", to: { o: 0.25 }, dur: 1500 },
            { id: "lake.water", to: { sx: 0.45, sy: 0.5 }, at: 600, dur: 4400 },
            { id: "a1", to: { x: 64, y: 66 }, at: 600, dur: 3000 }, { id: "a4", to: { x: 96, y: 66 }, at: 600, dur: 3000 },
            { id: "f1", to: { x: 48 }, at: 2400, dur: 2000 }, { id: "f2", to: { x: 114 }, at: 2400, dur: 2000 }
          ] },
          { caption: "فلامینگوها می‌توانند پرواز کنند و به دریاچه دیگری بروند. ولی آرتمیاهای ریز نمی‌توانند بروند و کم شدند.", key: 2200, hold: 7000, do: [
            { id: "f1", to: { o: 0 }, dur: 300 }, { id: "f2", to: { o: 0 }, dur: 300 },
            { id: "ff1", to: { x: 48, o: 1 }, dur: 300 }, { id: "ff2", to: { x: 114, o: 1 }, dur: 300 },
            { id: "ff1.wing", to: { sy: -1 }, at: 300, dur: 300, yoyo: true, times: 6 }, { id: "ff2.wing", to: { sy: -1 }, at: 300, dur: 300, yoyo: true, times: 6 },
            { id: "ff1", path: "M48 54Q20 30 -24 14", at: 400, dur: 3200, ease: "in" }, { id: "ff2", path: "M114 58Q60 30 -24 20", at: 600, dur: 3400, ease: "in" },
            { id: "a2", to: { o: 0 }, at: 1800, dur: 900 }, { id: "a3", to: { o: 0 }, at: 2400, dur: 900 }
          ] },
          { caption: "مردم کمک می‌کنند: آب را کمتر هدر می‌دهند تا آب بیشتری به دریاچه برسد. دریاچه کمی پر شد و فلامینگوها برگشتند.", key: 6800, hold: 8400, do: [
            { id: "grey", to: { o: 0 }, dur: 1200 },
            { id: "lake.water", to: { sx: 0.8, sy: 0.85 }, at: 400, dur: 3600 },
            { id: "a2", to: { o: 1 }, at: 2400, dur: 800 }, { id: "a3", to: { o: 1 }, at: 2600, dur: 800 },
            { id: "ff1", to: { y: 14 }, at: 3000, dur: 1 }, { id: "ff1", path: "M180 14Q100 30 46 60", at: 3000, dur: 2800, ease: "out" },
            { id: "ff1.wing", to: { sy: -1 }, at: 3000, dur: 300, yoyo: true, times: 8 },
            { id: "f1", to: { x: 46 }, at: 5700, dur: 1 }, { id: "f1", to: { o: 1 }, at: 5800, dur: 300 }, { id: "ff1", to: { o: 0 }, at: 5800, dur: 300 }
          ] }
        ],
        question: "وقتی دریاچه کوچک شد، چرا آرتمیاها کم شدند؟",
        options: ["چون نمی‌توانستند به جای دیگری بروند", "چون پرواز کردند و رفتند", "چون آب شیرین شد"], answer: "چون نمی‌توانستند به جای دیگری بروند" },
      { type: "choose", prompt: "کدام جانور می‌تواند زیستگاهش را عوض کند؟", say: "اگر خانه‌اش خراب شود، کدام جانور راحت‌تر می‌تواند به جای دیگری برود؟",
        options: ["فلامینگو، چون پرواز می‌کند", "آرتمیا، چون خیلی ریز است"], answer: "فلامینگو، چون پرواز می‌کند" },
      { type: "choose", prompt: "اگر جنگل را ببرند، چه کسی بیشتر آسیب می‌بیند؟", say: "اگر درخت‌های یک جنگل را ببرند، کدام بیشتر آسیب می‌بیند؟",
        options: ["درخت‌ها و گیاه‌ها، چون نمی‌توانند راه بروند", "پرنده‌ها، چون پرواز می‌کنند"], answer: "درخت‌ها و گیاه‌ها، چون نمی‌توانند راه بروند" },
      { type: "choose", prompt: "ما چطور می‌توانیم کمک کنیم؟", say: "برای اینکه آب بیشتری به دریاچه‌ها و رودها برسد، ما چه کار می‌توانیم بکنیم؟",
        options: ["آب را هدر ندهیم", "شیر آب را باز بگذاریم"], answer: "آب را هدر ندهیم" },
      { type: "home", pic: "🧂 💧", text: "وقتی آب کم می‌شود، چه می‌ماند؟",
        need: ["یک بشقاب گود", "آب گرم (بزرگ‌تر آماده کند)", "دو قاشق نمک", "یک قاشق"],
        steps: [
          "نمک را در آب گرم بریزید و هم بزنید تا حل شود. این آب شور، مثل دریاچه ارومیه است.",
          "آب را در بشقاب بریزید و بشقاب را جایی آفتابی بگذارید.",
          "هر روز نگاه کنید: آب کم می‌شود؟ کنار بشقاب چه چیزی پیدا می‌شود؟",
          "وقتی آب تمام شد، نمک سفید را ببینید. فکر کنید: جانوری که در این آب زندگی می‌کرد، کجا برود؟"
        ],
        ask: "وقتی آب رفت، چه چیزی در بشقاب ماند؟" }
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
    id: "science-sapling-25", subject: "science", level: "sapling", emoji: "💪", title: "نیرو همه جا",
    steps: [
      { type: "scene", prompt: "یک هل یا یک کشش چه کارهایی می‌کند؟", bg: "#cdeaf7",
        /* A push starts a ball and another push stops it; a kick sends it back the other way. A hand presses play
           dough, gently and then hard: the harder, the flatter. Tug-of-war: two against two, the ribbon stays over
           the chalk line; a third child joins one side and the rope and everyone move that way. Drawings:
           js/art/rig-science.js and js/art/rig.js. */
        parts: {
          bg: { art: "sci-meadow" },
          boy: { art: "👦", at: [24, 84], s: 1.4 }, girl: { art: "👧", at: [138, 84], s: 1.4, flip: true },
          ball: { art: "sci-ball", at: [36, 76], s: 2 },
          table: { art: "sci-table", o: 0 }, dough: { art: "sci-dough", at: [80, 70], s: 1.3, o: 0 },
          hand: { art: "hand", at: [80, 10], r: 180, s: 0.8, o: 0 },
          meadow2: { art: "sci-meadow", o: 0 }, chalk: { art: "sci-chalk", at: [80, 84], s: 1, o: 0 },
          rope: { art: "sci-rope", o: 0 },
          k1: { art: "👧", at: [30, 84], s: 1.4, o: 0 }, k2: { art: "👦", at: [50, 84], s: 1.4, o: 0 },
          k3: { art: "👦", at: [110, 84], s: 1.4, flip: true, o: 0 }, k4: { art: "👧", at: [130, 84], s: 1.4, flip: true, o: 0 },
          k5: { art: "👦", at: [-14, 84], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "نیرو چیزها را راه می‌اندازد و نگه می‌دارد: امید به توپ ضربه زد و توپ راه افتاد. مریم با پایش آن را نگه داشت.", key: 3600, hold: 6400, do: [
            { id: "boy.legF", to: { r: -40 }, at: 600, dur: 250 }, { id: "boy.legF", to: { r: 0 }, at: 850, dur: 400 },
            { id: "ball", path: "M36 76L124 76", at: 850, dur: 2200, ease: "out" }, { id: "ball", to: { r: 720 }, at: 850, dur: 2200, ease: "out" },
            { id: "girl.legF", to: { r: -24 }, at: 2600, dur: 400 }
          ] },
          { caption: "نیرو جهت را هم عوض می‌کند: مریم توپ را به طرف دیگر زد و توپ برگشت.", key: 3000, hold: 5600, do: [
            { id: "girl.legF", to: { r: -50 }, at: 500, dur: 200 }, { id: "girl.legF", to: { r: 0 }, at: 700, dur: 400 },
            { id: "ball", path: "M124 76L48 76", at: 700, dur: 2200, ease: "out" }, { id: "ball", to: { r: 0 }, at: 700, dur: 2200, ease: "out" }
          ] },
          { caption: "نیرو شکل چیزها را هم عوض می‌کند. خمیر را آرام فشار دادیم، کمی پهن شد. محکم فشار دادیم، خیلی پهن شد!", key: 4300, hold: 7400, do: [
            { id: "table", to: { o: 1 }, dur: 800 }, { id: "dough", to: { o: 1 }, at: 500, dur: 500 },
            { id: "hand", to: { o: 1 }, at: 900, dur: 300 }, { id: "hand", to: { y: 31.4 }, at: 900, dur: 900 },
            { id: "hand", to: { y: 36 }, at: 1900, dur: 600 }, { id: "dough", to: { sx: 1.5, sy: 1.04 }, at: 1900, dur: 600 },
            { id: "hand", to: { y: 22 }, at: 2900, dur: 600 },
            { id: "hand", to: { y: 43 }, at: 3800, dur: 500, ease: "in" }, { id: "dough", to: { sx: 2.2, sy: 0.6 }, at: 3900, dur: 400 },
            { id: "hand", to: { y: 20 }, at: 4800, dur: 700 }
          ] },
          { caption: "طناب‌کشی! دو طرف هم‌زورند: هر دو طرف می‌کشند، ولی طناب جابه‌جا نمی‌شود.", key: 3400, hold: 6400, do: [
            { id: "meadow2", to: { o: 1 }, dur: 800 }, { id: "hand", to: { o: 0 }, dur: 300 }, { id: "chalk", to: { o: 1 }, at: 500, dur: 400 }, { id: "rope", to: { o: 1 }, at: 500, dur: 400 },
            { id: "k1.armF", to: { r: -62 }, dur: 1 }, { id: "k1.armB", to: { r: -62 }, dur: 1 }, { id: "k2.armF", to: { r: -62 }, dur: 1 }, { id: "k2.armB", to: { r: -62 }, dur: 1 },
            { id: "k3.armF", to: { r: -62 }, dur: 1 }, { id: "k3.armB", to: { r: -62 }, dur: 1 }, { id: "k4.armF", to: { r: -62 }, dur: 1 }, { id: "k4.armB", to: { r: -62 }, dur: 1 },
            { id: "k5.armF", to: { r: -62 }, dur: 1 }, { id: "k5.armB", to: { r: -62 }, dur: 1 },
            { id: "k1", to: { o: 1 }, at: 500, dur: 400 }, { id: "k2", to: { o: 1 }, at: 500, dur: 400 }, { id: "k3", to: { o: 1 }, at: 500, dur: 400 }, { id: "k4", to: { o: 1 }, at: 500, dur: 400 },
            { id: "k1", to: { r: -8 }, at: 1200, dur: 300 }, { id: "k2", to: { r: -8 }, at: 1200, dur: 300 }, { id: "k3", to: { r: 8 }, at: 1200, dur: 300 }, { id: "k4", to: { r: 8 }, at: 1200, dur: 300 },
            { id: "rope", to: { x: "-1" }, at: 1600, dur: 400, yoyo: true, times: 3 }
          ] },
          { caption: "یک نفر دیگر به طرف چپ آمد. حالا زور آن طرف بیشتر است و طناب و همه به طرف چپ می‌روند.", key: 4800, hold: 7000, do: [
            { id: "k5", to: { o: 1 }, dur: 300 }, { id: "k5", walk: [14, 84], dur: 1600 }, { id: "k5", to: { r: -8 }, at: 1700, dur: 300 }, { id: "k5.armF", to: { r: -62 }, at: 1650, dur: 300 }, { id: "k5.armB", to: { r: -62 }, at: 1650, dur: 300 },
            { id: "rope", to: { x: -10 }, at: 2200, dur: 2000 },
            { id: "k1", to: { x: 20 }, at: 2200, dur: 2000 }, { id: "k2", to: { x: 40 }, at: 2200, dur: 2000 }, { id: "k5", to: { x: 4 }, at: 2200, dur: 2000 },
            { id: "k3", to: { x: 100 }, at: 2200, dur: 2000 }, { id: "k4", to: { x: 120 }, at: 2200, dur: 2000 }
          ] }
        ],
        question: "در طناب‌کشی، کی طناب جابه‌جا نمی‌شود؟",
        options: ["وقتی دو طرف هم‌زورند", "وقتی یک طرف زورش بیشتر است", "وقتی کسی نمی‌کشد"], answer: "وقتی دو طرف هم‌زورند" },
      { type: "sort", prompt: "نیرو چه کرد؟", say: "در هر کدام، نیرو چیزی را راه انداخت یا شکلش را عوض کرد؟",
        baskets: [{ label: "راه انداخت یا جهتش را عوض کرد", pic: "⚽", value: "move" }, { label: "شکلش را عوض کرد", pic: "🫓", value: "shape" }],
        items: [
          { pic: "⚽", say: "ضربه به توپ", basket: "move" },
          { pic: "🛒", say: "هل دادن چرخ‌دستی", basket: "move" },
          { pic: "🏓", say: "برگرداندن توپ با راکت", basket: "move" },
          { pic: "🥫", say: "له کردن قوطی خالی", basket: "shape" },
          { pic: "🎈", say: "فشار دادن بادکنک", basket: "shape" },
          { pic: "🍞", say: "پهن کردن خمیر نان", basket: "shape" }
        ] },
      { type: "choose", prompt: "کدام هل توپ را دورتر می‌برد؟", say: "کدام هل توپ را دورتر می‌برد: آرام یا محکم؟",
        options: ["هل محکم", "هل آرام"], answer: "هل محکم" },
      { type: "choose", prompt: "سه نفر با دو نفر طناب‌کشی می‌کنند. طناب کدام طرف می‌رود؟", say: "سه بچه هم‌قد با دو بچه طناب‌کشی می‌کنند. طناب به کدام طرف می‌رود؟",
        options: ["طرف سه نفر", "طرف دو نفر", "هیچ طرف"], answer: "طرف سه نفر" },
      { type: "home", pic: "🫓 🧦", text: "با خمیر و توپ جوراب، نیرو را امتحان کن!",
        need: ["کمی خمیر بازی یا خمیر نان", "یک توپ نرم یا جوراب گلوله‌شده"],
        steps: [
          "خمیر را گرد کنید. یک بار آرام و یک بار محکم فشارش دهید: کدام پهن‌تر شد؟",
          "توپ نرم را روی زمین آرام هل بدهید، بعد کمی محکم‌تر. کدام دورتر رفت؟",
          "وقتی توپ می‌آید، با دست جلویش را بگیرید: نیروی دست شما آن را نگه داشت.",
          "توپ را که می‌آید به طرف دیگر هل بدهید: جهتش عوض شد!"
        ],
        ask: "نیرو با خمیر چه کرد؟ با توپ چه کرد؟" }
    ]
  },
  {
    id: "science-sapling-26", subject: "science", level: "sapling", emoji: "🍎", title: "نیرو بدون تماس",
    steps: [
      { type: "scene", prompt: "نیرو بدون دست زدن هم کار می‌کند؟", bg: "#cdeaf7",
        /* Forces that act without touching: an apple falls from the tree and a ball thrown up comes back down,
           pulled by the Earth; a magnet held above a paper clip tied to the table by a thread pulls the clip up
           into the air; a balloon rubbed on hair pulls little bits of paper up from the table. Drawings:
           js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, tree: { art: "sci-tree", at: [56, 84], s: 0.75 },
          apple: { art: "sci-apple", at: [70, 34], s: 1.4 },
          boy: { art: "👦", at: [116, 84], s: 1.4, flip: true }, ball: { art: "sci-ball", at: [106, 66], s: 1.2 },
          table: { art: "sci-table", o: 0 },
          thread: { art: "sci-thread", at: [60, 70], sy: 0, o: 0 }, clip: { art: "sci-clip", at: [60, 70], s: 2, o: 0 },
          magnet: { art: "sci-magnet", at: [60, -20], s: 1.6, r: 180, o: 0 },
          b1: { art: "sci-bit", at: [108, 69], s: 1.4, o: 0 }, b2: { art: "sci-bit", at: [114, 69.4], s: 1.4, r: 40, o: 0 }, b3: { art: "sci-bit", at: [120, 69], s: 1.4, r: -30, o: 0 },
          girl: { art: "👧", at: [140, 84], s: 1.4, flip: true, o: 0 },
          balloon: { art: "sci-balloon", at: [132, 56], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "سیب از درخت افتاد. کسی آن را هل نداد: زمین همه چیز را به طرف خودش می‌کشد.", key: 2600, hold: 5600, do: [
            { id: "apple", to: { r: 10 }, at: 400, dur: 300, yoyo: true, times: 2 },
            { id: "apple", to: { y: 82 }, at: 1100, dur: 900, ease: "in" }, { id: "apple", to: { y: 80 }, at: 2000, dur: 200, yoyo: true }
          ] },
          { caption: "امید توپ را بالا انداخت. توپ کمی بالا رفت و بعد زمین آن را پایین کشید.", key: 2000, hold: 5600, do: [
            { id: "boy.armF", to: { r: -150 }, at: 400, dur: 300 },
            { id: "ball", to: { y: 14 }, at: 500, dur: 1200, ease: "out" }, { id: "ball", to: { y: 80 }, at: 1700, dur: 1200, ease: "in" },
            { id: "boy.armF", to: { r: 0 }, at: 1200, dur: 600 }
          ] },
          { caption: "گیره را با نخ به میز بستیم. آهنربا را بالایش گرفتیم: آهنربا گیره را از دور بالا کشید، بدون اینکه به آن بخورد!", key: 4200, hold: 7000, do: [
            { id: "table", to: { o: 1 }, dur: 800 }, { id: "clip", to: { o: 1 }, at: 500, dur: 400 }, { id: "thread", to: { o: 1 }, at: 500, dur: 400 },
            { id: "magnet", to: { o: 1 }, at: 900, dur: 300 }, { id: "magnet", to: { y: 30 }, at: 1000, dur: 1600, ease: "out" },
            { id: "clip", to: { y: 44.4 }, at: 2400, dur: 700, ease: "out" }, { id: "thread", to: { sy: 1 }, at: 2400, dur: 700, ease: "out" },
            { id: "clip", to: { x: "+0.6" }, at: 3200, dur: 300, yoyo: true, times: 3 }
          ] },
          { caption: "مریم بادکنک را به موهایش مالید. حالا بادکنک تکه‌های کاغذ را از دور به طرف خودش می‌کشد!", key: 5000, hold: 7400, do: [
            { id: "girl", to: { o: 1 }, dur: 500 }, { id: "balloon", to: { o: 1 }, dur: 500 },
            { id: "magnet", to: { o: 0 }, dur: 500 }, { id: "clip", to: { o: 0 }, dur: 500 }, { id: "thread", to: { o: 0 }, dur: 500 },
            { id: "balloon", to: { x: 138, y: 60 }, at: 600, dur: 300 },
            { id: "balloon", to: { y: 56 }, at: 900, dur: 250, yoyo: true, times: 6 },
            { id: "b1", to: { o: 1 }, at: 900, dur: 300 }, { id: "b2", to: { o: 1 }, at: 900, dur: 300 }, { id: "b3", to: { o: 1 }, at: 900, dur: 300 },
            { id: "balloon", path: "M138 60Q130 56 114 56", at: 2600, dur: 1200 },
            { id: "b1", to: { x: 110, y: 58 }, at: 3900, dur: 300, ease: "in" }, { id: "b2", to: { x: 114, y: 58.6 }, at: 4100, dur: 300, ease: "in" },
            { id: "b3", to: { x: 118, y: 58 }, at: 4300, dur: 300, ease: "in" }
          ] }
        ],
        question: "چرا سیب از درخت پایین افتاد؟",
        options: ["چون زمین آن را به طرف خودش می‌کشد", "چون باد آن را هل داد", "چون سیب خسته شد"], answer: "چون زمین آن را به طرف خودش می‌کشد" },
      { type: "sort", prompt: "با تماس یا بدون تماس؟", say: "کدام نیرو با دست زدن کار می‌کند و کدام بدون تماس؟",
        baskets: [{ label: "با تماس", pic: "✋", value: "touch" }, { label: "بدون تماس", pic: "🧲", value: "far" }],
        items: [
          { pic: "🛒", say: "هل دادن چرخ‌دستی", basket: "touch" },
          { pic: "⚽", say: "ضربه به توپ", basket: "touch" },
          { pic: "🍎", say: "افتادن سیب", basket: "far" },
          { pic: "🧲", say: "آهنربا گیره را از دور می‌کشد", basket: "far" },
          { pic: "🎈", say: "بادکنک مالیده کاغذ را می‌کشد", basket: "far" }
        ] },
      { type: "choose", prompt: "اگر توپ را بالا بیندازیم، چه می‌شود؟", say: "اگر توپ را بالا بیندازیم، چه می‌شود؟",
        options: ["پایین برمی‌گردد", "همیشه بالا می‌ماند"], answer: "پایین برمی‌گردد" },
      { type: "choose", prompt: "آهنربا از روی یک کاغذ هم گیره را می‌کشد؟", say: "اگر یک کاغذ بین آهنربا و گیره باشد، آهنربا باز هم گیره را می‌کشد؟",
        options: ["بله، از روی کاغذ هم می‌کشد", "نه، اصلاً"], answer: "بله، از روی کاغذ هم می‌کشد" },
      { type: "home", pic: "🎈 💇", text: "بادکنک جادویی!",
        need: ["یک بادکنک باد‌شده", "چند تکه کاغذ خیلی ریز", "موهای خشک"],
        steps: [
          "کاغذها را روی میز بریزید.",
          "بادکنک را چند بار به موهای خشک بمالید.",
          "بادکنک را آرام بالای کاغذها بگیرید؛ به آن‌ها نزنید. چه می‌شود؟",
          "بادکنک را نزدیک موهای خودتان بگیرید: موها به طرفش بلند می‌شوند؟",
          "یک توپ یا مداد را هم ول کنید: همیشه پایین می‌افتد؟"
        ],
        ask: "بادکنک بدون اینکه دست بزند، چه چیزهایی را کشید؟" }
    ]
  },
  {
    id: "science-sapling-27", subject: "science", level: "sapling", emoji: "⚖️", title: "الاکلنگ و اهرم",
    steps: [
      { type: "scene", prompt: "الاکلنگ کی صاف می‌ماند؟", bg: "#cdeaf7",
        /* A seesaw in the park. Two children of the same size on the two ends: it rocks and comes level. Dad takes
           one child's place: his end goes down. He moves in near the middle and it is level again: a heavy thing
           near the middle balances a light one far out. Last, a tin with a tight lid: a grown-up puts the tip of a
           spoon under the lid, on the rim, and pushes the long handle down; the lid lifts easily. Drawings:
           js/art/rig-science.js. */
        parts: {
          bg: { art: "sci-meadow" }, stand: { art: "sci-fulcrum", at: [80, 84], s: 1 },
          beam: { art: "sci-beam", at: [80, 66] },
          k1: { art: "👦", at: [-50, 7.6], s: 1.2, under: "beam" }, k2: { art: "👧", at: [50, 7.6], s: 1.2, flip: true, under: "beam" },
          dad: { art: "👨", at: [-50, 9], s: 1.1, o: 0, under: "beam" },
          table: { art: "sci-table", o: 0 }, tin: { art: "sci-tin", at: [92, 70], s: 1.6, o: 0 },
          spoon: { art: "sci-spoon", at: [72.8, 41.2], s: 1.6, r: 20, o: 0 },
          hand: { art: "hand", at: [28, 12], r: 180, s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "امید و مریم هم‌وزن‌اند و هر کدام یک سر الاکلنگ نشسته‌اند. الاکلنگ تاب می‌خورد و صاف می‌ایستد.", key: 3600, hold: 6000, do: [
            { id: "k1.legF", to: { r: -80 }, dur: 1 }, { id: "k1.legB", to: { r: -80 }, dur: 1 }, { id: "k2.legF", to: { r: -80 }, dur: 1 }, { id: "k2.legB", to: { r: -80 }, dur: 1 },
            { id: "k1.armF", to: { r: -40 }, dur: 1 }, { id: "k2.armF", to: { r: -40 }, dur: 1 },
            { id: "dad.legF", to: { r: -80 }, dur: 1 }, { id: "dad.legB", to: { r: -80 }, dur: 1 }, { id: "dad.armF", to: { r: -40 }, dur: 1 },
            { id: "beam", to: { r: -10 }, at: 300, dur: 900 }, { id: "beam", to: { r: 8 }, at: 1200, dur: 1000 }, { id: "beam", to: { r: 0 }, at: 2200, dur: 900 }
          ] },
          { caption: "بابا جای امید نشست. بابا سنگین‌تر است، پس طرف او پایین رفت و مریم بالا رفت.", key: 3400, hold: 6000, do: [
            { id: "k1", to: { o: 0 }, dur: 500 }, { id: "dad", to: { o: 1 }, at: 500, dur: 500 },
            { id: "beam", to: { r: -13 }, at: 1200, dur: 1400, ease: "in" }
          ] },
          { caption: "بابا نزدیک وسط نشست. الاکلنگ دوباره صاف شد! چیز سنگین نزدیک وسط با چیز سبک دور از وسط هم‌وزن می‌شود.", key: 4600, hold: 7400, do: [
            { id: "dad", to: { x: -17 }, at: 400, dur: 2000 }, { id: "beam", to: { r: 0 }, at: 1600, dur: 1800 }
          ] },
          { caption: "در قوطی سفت بود. بزرگ‌تر سر قاشق را زیر در گذاشت و دسته بلندش را پایین داد: در راحت باز شد! به این کار «اهرم» می‌گوییم.", key: 4400, hold: 7400, do: [
            { id: "table", to: { o: 1 }, dur: 800 }, { id: "tin", to: { o: 1 }, at: 500, dur: 500 }, { id: "spoon", to: { o: 1 }, at: 800, dur: 400 },
            { id: "hand", to: { o: 1 }, at: 1200, dur: 300 },
            { id: "spoon", to: { r: -6 }, at: 1800, dur: 1600 }, { id: "hand", to: { x: 25, y: 33 }, at: 1800, dur: 1600 },
            { id: "tin.lid", to: { r: 16 }, at: 2600, dur: 900, ease: "out" }
          ] }
        ],
        question: "بابا کجا بنشیند تا با مریم هم‌وزن شود؟",
        options: ["نزدیک وسط الاکلنگ", "درست سر الاکلنگ", "روی زمین"], answer: "نزدیک وسط الاکلنگ" },
      { type: "balance", lever: true, prompt: "مریم را کجا بنشانیم؟", say: "بابا نزدیک وسط نشسته. مریم را روی یکی از جاها بگذار تا الاکلنگ صاف شود.",
        left: [{ pic: "👨", mass: 3, seat: 1, say: "بابا" }], tray: [{ pic: "👧", mass: 1, say: "مریم" }], open: "right" },
      { type: "balance", lever: true, prompt: "الاکلنگ را صاف کن", say: "سبد سنگین دور از وسط است. سنگ و خرس عروسکی را جایی بگذار که الاکلنگ صاف شود.",
        left: [{ pic: "🧺", mass: 2, seat: 3, say: "سبد" }], tray: [{ pic: "🪨", mass: 3, say: "سنگ" }, { pic: "🧸", mass: 1, say: "خرس عروسکی" }], open: "right" },
      { type: "choose", prompt: "با کدام قاشق در قوطی راحت‌تر باز می‌شود؟", say: "برای باز کردن در سفت قوطی، کدام قاشق کار را راحت‌تر می‌کند؟",
        options: ["قاشق با دسته بلند", "قاشق با دسته خیلی کوتاه"], answer: "قاشق با دسته بلند" },
      { type: "home", pic: "📏 🪙", text: "یک الاکلنگ کوچک بساز!",
        need: ["یک خط‌کش", "یک مداد شش‌گوش", "چند سکه یا پاک‌کن"],
        steps: [
          "مداد را روی میز بگذارید و خط‌کش را از وسط رویش بگذارید.",
          "یک سکه سر هر طرف بگذارید: خط‌کش صاف می‌ماند؟",
          "حالا دو سکه را روی هم یک طرف بگذارید. یک سکه طرف دیگر را کجا بگذاریم تا صاف شود؟",
          "سکه‌ها را جابه‌جا کنید و ببینید: سنگین نزدیک وسط، سبک دور از وسط."
        ],
        ask: "دو سکه را کجا گذاشتی تا با یک سکه صاف شود؟" }
    ]
  },
  {
    id: "science-sapling-28", subject: "science", level: "sapling", emoji: "🎯", title: "بازی نیروها",
    steps: [
      { type: "sort", prompt: "هل است یا کشش؟", say: "در کدام‌ها چیزی را هل می‌دهیم و در کدام‌ها می‌کشیم؟",
        baskets: [{ label: "هل دادن", pic: "👐", value: "push" }, { label: "کشیدن", pic: "🪢", value: "pull" }],
        items: [
          { pic: "🛒", say: "راندن چرخ‌دستی", basket: "push" },
          { pic: "🚪", say: "بستن در با دست", basket: "push" },
          { pic: "⚽", say: "ضربه به توپ", basket: "push" },
          { pic: "🪁", say: "کشیدن نخ بادبادک", basket: "pull" },
          { pic: "🗄️", say: "بیرون آوردن کشو", basket: "pull" },
          { pic: "🛷", say: "کشیدن سورتمه", basket: "pull" }
        ] },
      { type: "sort", prompt: "با تماس یا بدون تماس؟", say: "کدام نیرو با دست زدن کار می‌کند و کدام از دور؟",
        baskets: [{ label: "با تماس", pic: "✋", value: "touch" }, { label: "بدون تماس", pic: "🧲", value: "far" }],
        items: [
          { pic: "🧹", say: "جارو کشیدن", basket: "touch" },
          { pic: "🪢", say: "طناب‌کشی", basket: "touch" },
          { pic: "🍂", say: "افتادن برگ به زمین", basket: "far" },
          { pic: "🧲", say: "آهنربا و گیره", basket: "far" },
          { pic: "🎈", say: "بادکنک مالیده و مو", basket: "far" }
        ] },
      { type: "pairs", prompt: "چه اتفاقی می‌افتد؟", say: "هر کار را به چیزی که پیش می‌آید برسان.",
        pairs: [
          [{ label: "دو طرف هم‌زور", say: "طناب‌کشی، دو طرف هم‌زور" }, { label: "طناب نمی‌رود", say: "طناب تکان نمی‌خورد" }],
          [{ label: "یک طرف زورتر", say: "طناب‌کشی، یک طرف زورتر" }, { label: "طناب به طرف او می‌رود", say: "طناب به طرف زورتر می‌رود" }],
          [{ label: "سنگین نزدیک وسط", say: "سنگین نزدیک وسط الاکلنگ" }, { label: "الاکلنگ صاف می‌شود", say: "الاکلنگ صاف می‌شود" }],
          [{ label: "هل محکم", say: "هل محکم به توپ" }, { label: "توپ دور می‌رود", say: "توپ دور می‌رود" }]
        ] },
      { type: "balance", lever: true, prompt: "الاکلنگ را صاف کن", say: "دو جعبه سنگین روی یک طرف است. جعبه را طرف دیگر کجا بگذاریم تا صاف شود؟",
        left: [{ pic: "📦", mass: 2, seat: 2, say: "جعبه سنگین" }], tray: [{ pic: "🎁", mass: 1, say: "جعبه سبک" }, { pic: "🎁", mass: 1, say: "جعبه سبک" }], open: "right" },
      { type: "home", pic: "🧦 🚗", text: "مسابقه ماشین کاغذی: کدام هل دورتر می‌برد؟",
        need: ["یک ماشین اسباب‌بازی یا یک جعبه کبریت خالی", "یک نوار چسب برای خط شروع", "چند تکه کاغذ برای علامت"],
        steps: [
          "یک خط شروع روی زمین بچسبانید.",
          "ماشین را آرام هل بدهید و جای ایستادنش را با کاغذ علامت بزنید.",
          "حالا کمی محکم‌تر هل بدهید و دوباره علامت بزنید.",
          "یک کتاب سر راهش بگذارید: کتاب ماشین را نگه داشت!"
        ],
        ask: "کدام هل ماشین را دورتر برد؟" }
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
    id: "science-sapling-31", subject: "science", level: "sapling", emoji: "🐈", title: "ویژگی‌ها از کجا می‌آیند؟",
    steps: [
      { type: "scene", prompt: "چرا بچه‌ها شبیه پدر و مادرشان‌اند ولی عین هم نیستند؟", bg: "#f6efdc",
        /* An orange mother cat and a grey father cat; their three kittens come in: one orange, one grey, one cream.
           They look like their parents, but no two are the same. Then two pots planted with the same seeds: one in
           the sun grows short, bushy and green, one in the shade grows tall, thin and pale. Last, a wild goat eats
           the twigs of a shrub with short thorns but backs away from one with long thorns. Drawings:
           js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" },
          mom: { art: "sci-catc", at: [34, 84], s: 2.2, look: { fill: "#f0a35e" } }, dad: { art: "sci-catc", at: [128, 84], s: 2.3, flip: true, look: { fill: "#9aa0a6" } },
          k1: { art: "sci-catc", at: [-12, 86], s: 1.1, look: { fill: "#f0a35e" } }, k2: { art: "sci-catc", at: [-26, 86], s: 1.1, look: { fill: "#9aa0a6" } },
          k3: { art: "sci-catc", at: [-40, 86], s: 1.1, look: { fill: "#f2d8a8" } },
          sun: { art: "sci-room", o: 0 }, ray: { art: "sci-lampglow", at: [40, 44], s: 2.2, o: 0 },
          pot1: { art: "sci-emptypot", at: [40, 72], s: 1.6, o: 0 }, pl1: { art: "sci-plant-sun", at: [40, 52.2], s: 0.2, o: 0 },
          pot2: { art: "sci-emptypot", at: [128, 72], s: 1.6, o: 0 }, pl2: { art: "sci-plant-pale", at: [128, 52.2], s: 0.2, o: 0 },
          shade: { art: "sci-halfshade", o: 0 },
          hill: { art: "sci-meadow", o: 0 },
          b1: { art: "sci-thorn", at: [56, 82], s: 2, o: 0 }, b2: { art: "sci-thorn", at: [116, 82], s: 2, o: 0 }, sp: { art: "sci-spikes", at: [116, 82], s: 2.8, o: 0 },
          goat: { art: "🐐", at: [-20, 86], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "مادر این بچه‌گربه‌ها نارنجی است و پدرشان خاکستری. بچه‌ها رنگ و شکلشان را از پدر و مادر گرفته‌اند.", key: 4200, hold: 6600, do: [
            { id: "k1", to: { x: 62 }, at: 400, dur: 2600 }, { id: "k2", to: { x: 80 }, at: 400, dur: 2800 }, { id: "k3", to: { x: 98 }, at: 400, dur: 3000 },
            { id: "mom.head", to: { r: -10 }, at: 2800, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "ولی هیچ دو بچه‌ای عین هم نیستند: یکی نارنجی است، یکی خاکستری، یکی کِرِم. ما هم با خواهر و برادرمان فرق داریم.", key: 3200, hold: 6400, do: [
            { id: "k1", to: { s: 1.25 }, at: 400, dur: 500, yoyo: true }, { id: "k2", to: { s: 1.25 }, at: 1200, dur: 500, yoyo: true }, { id: "k3", to: { s: 1.25 }, at: 2000, dur: 500, yoyo: true }
          ] },
          { caption: "جایی که زندگی می‌کنیم هم ما را عوض می‌کند. دو دانه یکسان کاشتیم: یکی در آفتاب کوتاه و پرپشت و سبز شد، یکی در سایه بلند و باریک و کم‌رنگ.", key: 5200, hold: 8000, do: [
            { id: "sun", to: { o: 1 }, dur: 800 }, { id: "ray", to: { o: 1 }, at: 400, dur: 800 }, { id: "shade", to: { o: 1 }, at: 400, dur: 800 },
            { id: "pot1", to: { o: 1 }, at: 600, dur: 400 }, { id: "pot2", to: { o: 1 }, at: 600, dur: 400 },
            { id: "pl1", to: { o: 1 }, at: 1200, dur: 300 }, { id: "pl2", to: { o: 1 }, at: 1200, dur: 300 },
            { id: "pl1", to: { s: 1.5 }, at: 1400, dur: 3600 }, { id: "pl2", to: { s: 1.6 }, at: 1400, dur: 3600 }
          ] },
          { caption: "تفاوت‌ها گاهی کمک می‌کنند زنده بمانیم. بز شاخه‌های بوته کم‌خار را خورد، ولی به بوته‌ای که خارهای بلند داشت نزدیک نشد.", key: 6000, hold: 8200, do: [
            { id: "hill", to: { o: 1 }, dur: 800 }, { id: "b1", to: { o: 1 }, at: 400, dur: 400 }, { id: "b2", to: { o: 1 }, at: 400, dur: 400 }, { id: "sp", to: { o: 1 }, at: 400, dur: 400 },
            { id: "goat", to: { o: 1 }, at: 600, dur: 300 }, { id: "goat", to: { x: 36 }, at: 700, dur: 1800 },
            { id: "goat", to: { r: 8 }, at: 2600, dur: 300, yoyo: true, times: 3 }, { id: "b1.bite", to: { o: 0 }, at: 3200, dur: 400 },
            { id: "goat", to: { x: 94 }, at: 4000, dur: 1400 }, { id: "goat", to: { x: 82 }, at: 5500, dur: 500, ease: "out" }
          ] }
        ],
        question: "رنگ بچه‌گربه‌ها از کجا آمده؟",
        options: ["از پدر و مادرشان", "از غذایی که خوردند", "از جای خوابشان"], answer: "از پدر و مادرشان" },
      { type: "pairs", prompt: "هر بچه را به پدر و مادرش برسان", say: "بچه‌ها شبیه پدر و مادرشان‌اند. هر بچه را به پدر یا مادرش برسان.",
        pairs: [
          [{ pic: "🐣", say: "جوجه" }, { pic: "🐔", say: "مرغ" }],
          [{ pic: "🐸", say: "قورباغه کوچک" }, { pic: "🐸", say: "قورباغه بزرگ" }],
          [{ pic: "🌱", say: "نهال سیب" }, { pic: "🍎", say: "درخت سیب" }],
          [{ pic: "🐑", say: "بره" }, { pic: "🐑", say: "گوسفند" }]
        ] },
      { type: "choose", prompt: "گیاهی که در سایه بزرگ شد چه شکلی است؟", say: "دو دانه یکسان کاشتیم. آنکه در سایه بزرگ شد چه شکلی شد؟",
        options: ["بلند و باریک و کم‌رنگ", "کوتاه و پرپشت و سبز"], answer: "بلند و باریک و کم‌رنگ" },
      { type: "choose", prompt: "کدام بوته از بز در امان می‌ماند؟", say: "کدام بوته بهتر از بز در امان می‌ماند؟",
        options: ["بوته‌ای که خارهای بلند دارد", "بوته‌ای که خار ندارد"], answer: "بوته‌ای که خارهای بلند دارد" },
      { type: "home", pic: "👪 🔍", text: "شباهت‌های خانواده را پیدا کن!",
        need: ["چند عکس خانوادگی (اگر دارید)", "یک آینه"],
        steps: [
          "در آینه به چشم‌ها، رنگ مو و شکل گوش خود نگاه کنید.",
          "بعد به پدر، مادر یا خواهر و برادرتان نگاه کنید: در چه چیزهایی شبیه هم هستید؟",
          "در چه چیزهایی با هم فرق دارید؟",
          "اگر عکس قدیمی دارید، ببینید پدر و مادر در کودکی شبیه کدام بچه بودند."
        ],
        ask: "در چه چیزی شبیه مادر یا پدرت هستی؟" }
    ]
  },
  {
    id: "science-sapling-32", subject: "science", level: "sapling", emoji: "🐟", title: "هر کدام جای خود: ماهی و دوزیست",
    steps: [
      { type: "scene", prompt: "ماهی‌ها و دوزیست‌ها چه فرقی دارند؟", bg: "#7fbcd8",
        /* What animals need, and two groups of animals with a backbone. A deer comes to drink at the river: animals need
           food, water, air and a safe place. An X-ray of a fish shows its backbone; a worm has none. A Persian sturgeon
           swims in the Caspian, its gills opening and closing. A green toad's eggs in the water hatch into a tadpole,
           and the grown toad sits on the bank. Drawings: js/art/rig-science.js. */
        parts: {
          meadow: { art: "sci-meadow" }, river: { art: "sci-river", at: [0, 10] }, deer: { art: "🦌", at: [-20, 78], s: 1.4 },
          xray: { art: "sci-fishbones", at: [60, 40], s: 1.6, o: 0 }, worm: { art: "sci-worm", at: [128, 44], s: 1.6, o: 0 },
          sea: { art: "sci-sea", o: 0 }, fish: { art: "sci-sturgeon", at: [-30, 46], s: 1.4, o: 0 },
          paddy: { art: "sci-paddy", o: 0 }, eggs: { art: "sci-frogspawn", at: [36, 62], s: 2, o: 0 }, tad: { art: "sci-tadpole", at: [40, 66], s: 2, o: 0 },
          veil: { art: "sci-veil", o: 0 }, toad: { art: "sci-toad", at: [136, 50], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "همه جانوران به غذا، آب، هوا و جایی امن برای زندگی نیاز دارند.", key: 3600, hold: 6000, do: [
            { id: "deer", walk: [30, 78], at: 300, dur: 2200 }, { id: "deer", to: { r: 14 }, at: 3000, dur: 500 }
          ] },
          { caption: "این عکس استخوان‌های یک ماهی است. ماهی ستون مهره دارد: یک ردیف استخوان در پشتش. کرم ستون مهره ندارد.", key: 3400, hold: 6800, do: [
            { id: "xray", to: { o: 1 }, dur: 700 }, { id: "deer", to: { o: 0 }, dur: 500 }, { id: "worm", to: { o: 1 }, at: 1600, dur: 500 },
            { id: "worm", to: { sx: 0.8 }, at: 2200, dur: 500, yoyo: true, times: 3 }
          ] },
          { caption: "ماهی‌ها در آب زندگی می‌کنند، فلس دارند و با آبشش نفس می‌کشند. ماهی خاویاری در دریای خزر زندگی می‌کند.", key: 4000, hold: 7000, do: [
            { id: "sea", to: { o: 1 }, dur: 800 }, { id: "xray", to: { o: 0 }, dur: 500 }, { id: "worm", to: { o: 0 }, dur: 500 },
            { id: "fish", to: { o: 1 }, at: 600, dur: 300 }, { id: "fish", to: { x: 92 }, at: 600, dur: 4000, ease: "out" },
            { id: "fish.tail", to: { r: 14 }, at: 600, dur: 400, yoyo: true, times: 5 },
            { id: "fish.gill", to: { sx: 0.4 }, at: 1000, dur: 500, yoyo: true, times: 4 },
            { emit: "bubble", from: "fish", where: [24, -4], n: 5, rise: 18, at: 2600, dur: 1600, life: 1600 }
          ] },
          { caption: "وزغ سبز یک دوزیست است: تخمش در آب باز می‌شود و نوزادش در آب شنا می‌کند. بزرگ که شد، بیشتر در خشکی زندگی می‌کند. پوستش نرم و خیس است.", key: 5800, hold: 8400, do: [
            { id: "paddy", to: { o: 1 }, dur: 800 }, { id: "veil", to: { o: 1 }, dur: 800 }, { id: "fish", to: { o: 0 }, dur: 500 },
            { id: "eggs", to: { o: 1 }, at: 600, dur: 400 }, { id: "eggs", to: { o: 0 }, at: 2000, dur: 500 },
            { id: "tad", to: { o: 1 }, at: 2000, dur: 500 }, { id: "tad", to: { x: 100 }, at: 2400, dur: 2600 }, { id: "tad.tail", to: { r: 20 }, at: 2400, dur: 300, yoyo: true, times: 8 },
            { id: "toad", to: { o: 1 }, at: 4600, dur: 600 }, { id: "toad", to: { y: 47 }, at: 5400, dur: 300, yoyo: true, times: 2 }
          ] }
        ],
        question: "ماهی با چه نفس می‌کشد؟",
        options: ["با آبشش", "با بینی", "با پوستش"], answer: "با آبشش" },
      { type: "sort", prompt: "ماهی است یا دوزیست؟", say: "کدام ماهی است و کدام دوزیست؟",
        baskets: [{ label: "ماهی", pic: "🐟", value: "fish" }, { label: "دوزیست", pic: "🐸", value: "amph" }],
        items: [
          { pic: "🐟", say: "ماهی خاویاری", basket: "fish" },
          { pic: "🐠", say: "ماهی قزل‌آلا", basket: "fish" },
          { pic: "🦈", say: "کوسه", basket: "fish" },
          { pic: "🐸", say: "قورباغه", basket: "amph" },
          { label: "سمندر", say: "سمندر", basket: "amph" },
          { pic: "🐸", say: "وزغ سبز", basket: "amph" }
        ] },
      { type: "choose", prompt: "کدام ستون مهره دارد؟", say: "کدام جانور ستون مهره دارد؟",
        options: ["ماهی", "کرم خاکی"], answer: "ماهی" },
      { type: "choose", prompt: "بچه قورباغه کجا زندگی می‌کند؟", say: "بچه قورباغه، یعنی نوزادش، کجا زندگی می‌کند؟",
        options: ["در آب", "روی درخت"], answer: "در آب" },
      { type: "home", pic: "🦴 ✋", text: "ستون مهره خودت را پیدا کن!",
        need: ["یک بزرگ‌تر", "یک لباس نازک"],
        steps: [
          "کودک کمی به جلو خم شود.",
          "بزرگ‌تر آرام دستش را از گردن تا پایین کمر کودک بکشد: برجستگی‌های کوچک را حس می‌کنید؟ این‌ها مهره‌ها هستند.",
          "با هم بشمارید چند مهره را حس می‌کنید.",
          "بگویید: ما هم مثل ماهی و قورباغه ستون مهره داریم!"
        ],
        ask: "چه جانورهای دیگری ستون مهره دارند؟" }
    ]
  },
  {
    id: "science-sapling-33", subject: "science", level: "sapling", emoji: "🦎", title: "خزنده، پرنده، پستاندار",
    steps: [
      { type: "scene", prompt: "خزنده‌ها، پرنده‌ها و پستانداران چه فرقی دارند؟", bg: "#f8e7c4",
        /* Three more groups of animals with a backbone. In the desert a tortoise walks slowly and a lizard warms up
           on a rock, its eggs in the sand: dry skin with scales. In a tree, a bird sits on the eggs in its nest and
           a chick hatches: feathers. In a meadow a lamb comes to drink milk from its mother: wool, and young born
           alive. Last, in a cave at night: a bat flies, but it is not a bird: it has fur and feeds its baby milk.
           Drawings: js/art/rig-science.js. */
        parts: {
          desert: { art: "sci-desert" }, rock: { art: "sci-rock", at: [112, 80], s: 1.4 },
          lizard: { art: "🦎", at: [112, 54], s: 1.1 }, tort: { art: "🐢", at: [-16, 80], s: 1.4 },
          e1: { art: "🥚", at: [60, 82], s: 0.4, o: 0 }, e2: { art: "🥚", at: [66, 83], s: 0.4, o: 0 },
          meadow: { art: "sci-meadow", o: 0 }, tree: { art: "sci-tree", at: [50, 88], o: 0 },
          nestBack: { art: "sci-nest-back", at: [76, 50.5], s: 1.3, o: 0 },
          egg: { art: "🥚", at: [76, 47.5], s: 0.42, o: 0 }, chick: { art: "🐣", at: [76, 46.5], s: 0.55, o: 0 },
          nest: { art: "sci-nest", at: [76, 50.5], s: 1.3, o: 0 }, bird: { art: "🐦", at: [140, 20], s: 1, o: 0 },
          ewe: { art: "🐑", at: [100, 80], s: 2.2, o: 0 }, lamb: { art: "🐑", at: [-10, 82], s: 1.2, o: 0 },
          cave: { art: "sci-cave", o: 0 }, hang: { art: "sci-bat-hang", at: [80, 34], s: 1.6, o: 0 },
          bat: { art: "sci-bat", at: [20, 20], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "خزنده‌ها پوست خشک و فلس‌دار دارند و بیشترشان تخم می‌گذارند. لاک‌پشت و مارمولک خزنده‌اند.", key: 4400, hold: 7000, do: [
            { id: "tort", to: { x: 44 }, at: 300, dur: 5000, ease: "linear" },
            { id: "lizard", to: { r: -6 }, at: 1200, dur: 500, yoyo: true, times: 2 },
            { id: "e1", to: { o: 1 }, at: 2200, dur: 500 }, { id: "e2", to: { o: 1 }, at: 2400, dur: 500 }
          ] },
          { caption: "پرنده‌ها پر دارند و تخم می‌گذارند. روی تخم می‌نشینند تا گرم بماند، تا جوجه بیرون بیاید.", key: 5000, hold: 7400, do: [
            { id: "meadow", to: { o: 1 }, dur: 800 }, { id: "tree", to: { o: 1 }, dur: 800 },
            { id: "nestBack", to: { o: 1 }, at: 400, dur: 400 }, { id: "egg", to: { o: 1 }, at: 400, dur: 400 }, { id: "nest", to: { o: 1 }, at: 400, dur: 400 },
            { id: "bird", to: { o: 1 }, at: 800, dur: 300 }, { id: "bird", path: "M140 20Q110 20 78 42", at: 800, dur: 1600, ease: "out" },
            { id: "bird", path: "M78 42Q100 24 124 30", at: 3400, dur: 1200 },
            { id: "egg", to: { r: 10 }, at: 3600, dur: 200, yoyo: true, times: 3 }, { id: "egg", to: { o: 0 }, at: 4400, dur: 300 }, { id: "chick", to: { o: 1 }, at: 4400, dur: 300 }
          ] },
          { caption: "پستانداران مو یا پشم دارند. بیشترشان بچه به دنیا می‌آورند و به بچه‌شان شیر می‌دهند. گوسفند و ما آدم‌ها پستانداریم.", key: 4400, hold: 7400, do: [
            { id: "tree", to: { o: 0 }, dur: 600 }, { id: "nestBack", to: { o: 0 }, dur: 600 }, { id: "nest", to: { o: 0 }, dur: 600 }, { id: "chick", to: { o: 0 }, dur: 600 }, { id: "bird", to: { o: 0 }, dur: 600 },
            { id: "ewe", to: { o: 1 }, at: 400, dur: 500 }, { id: "lamb", to: { o: 1 }, at: 600, dur: 300 }, { id: "lamb", to: { x: 82 }, at: 700, dur: 3000 },
            { id: "lamb", to: { r: 10 }, at: 3800, dur: 400, yoyo: true, times: 3 }
          ] },
          { caption: "خفاش پرواز می‌کند، ولی پرنده نیست! پر ندارد، مو دارد، بچه به دنیا می‌آورد و به او شیر می‌دهد. خفاش پستاندار است.", key: 4200, hold: 7600, do: [
            { id: "cave", to: { o: 1 }, dur: 800 }, { id: "ewe", to: { o: 0 }, dur: 500 }, { id: "lamb", to: { o: 0 }, dur: 500 },
            { id: "bat", to: { o: 1 }, at: 600, dur: 300 }, { id: "bat", path: "M20 20Q60 4 100 22T140 20", at: 600, dur: 3400 },
            { id: "bat.wl", to: { sy: -0.6 }, at: 600, dur: 200, yoyo: true, times: 8 }, { id: "bat.wr", to: { sy: -0.6 }, at: 600, dur: 200, yoyo: true, times: 8 },
            { id: "hang", to: { o: 1 }, at: 2400, dur: 600 }, { id: "hang", to: { r: 6 }, at: 3200, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "چرا خفاش پستاندار است؟",
        options: ["چون مو دارد و به بچه‌اش شیر می‌دهد", "چون پرواز می‌کند", "چون تخم می‌گذارد"], answer: "چون مو دارد و به بچه‌اش شیر می‌دهد" },
      { type: "sort", prompt: "خزنده، پرنده یا پستاندار؟", say: "هر جانور در کدام گروه است؟",
        baskets: [{ label: "خزنده", pic: "🦎", value: "rep" }, { label: "پرنده", pic: "🐦", value: "bird" }, { label: "پستاندار", pic: "🐄", value: "mam" }],
        items: [
          { pic: "🐢", say: "لاک‌پشت", basket: "rep" },
          { pic: "🐍", say: "مار", basket: "rep" },
          { pic: "🦉", say: "جغد", basket: "bird" },
          { pic: "🕊️", say: "کبوتر", basket: "bird" },
          { pic: "🐪", say: "شتر", basket: "mam" },
          { label: "خفاش", say: "خفاش", basket: "mam" }
        ] },
      { type: "choose", prompt: "بدن پرنده با چه پوشیده شده؟", say: "بدن پرنده با چه پوشیده شده؟",
        options: ["پر", "فلس", "پشم"], answer: "پر" },
      { type: "choose", prompt: "کدام به بچه‌اش شیر می‌دهد؟", say: "کدام جانور به بچه‌اش شیر می‌دهد؟",
        options: ["گاو", "مارمولک", "مرغ"], answer: "گاو" },
      { type: "home", pic: "🪶 🧶", text: "پوشش جانوران را لمس کن!",
        need: ["یک پر (اگر پیدا شد)", "کمی پشم یا یک لباس پشمی", "یک تکه چرم یا کیف چرمی", "عکس جانوران از کتاب"],
        steps: [
          "پر، پشم و چرم را با انگشت لمس کنید و با چشم بسته حدس بزنید کدام است.",
          "بگویید هر کدام شبیه پوشش کدام جانور است: پر پرنده، پشم گوسفند، پوست خزنده.",
          "در کتاب یا بیرون، جانوری پیدا کنید و بگویید: مو دارد، پر دارد یا فلس؟",
          "اگر پر را از زمین برداشتید، بعد دست‌ها را بشویید."
        ],
        ask: "کدام نرم‌تر بود: پر یا پشم؟" }
    ]
  },
  {
    id: "science-sapling-35", subject: "science", level: "sapling", emoji: "🦴", title: "بازی مهره‌دارها",
    steps: [
      { type: "sort", prompt: "ستون مهره دارد یا نه؟", say: "کدام جانور ستون مهره دارد و کدام ندارد؟",
        baskets: [{ label: "مهره‌دار", pic: "🦴", value: "yes" }, { label: "بی‌مهره", pic: "🐛", value: "no" }],
        items: [
          { pic: "🐟", say: "ماهی", basket: "yes" },
          { pic: "🐸", say: "قورباغه", basket: "yes" },
          { pic: "🐈", say: "گربه", basket: "yes" },
          { pic: "🐛", say: "کرم ابریشم", basket: "no" },
          { pic: "🐌", say: "حلزون", basket: "no" },
          { pic: "🐝", say: "زنبور", basket: "no" }
        ] },
      { type: "sort", prompt: "در کدام گروه است؟", say: "هر جانور را در گروه خودش بگذار.",
        baskets: [{ label: "ماهی", pic: "🐟", value: "fish" }, { label: "دوزیست", pic: "🐸", value: "amph" }, { label: "خزنده", pic: "🐢", value: "rep" }],
        items: [
          { pic: "🐟", say: "ماهی خاویاری", basket: "fish" },
          { pic: "🦈", say: "کوسه", basket: "fish" },
          { pic: "🐸", say: "قورباغه", basket: "amph" },
          { label: "سمندر", say: "سمندر", basket: "amph" },
          { pic: "🐍", say: "مار", basket: "rep" },
          { pic: "🦎", say: "مارمولک", basket: "rep" }
        ] },
      { type: "sort", prompt: "پرنده یا پستاندار؟", say: "کدام پرنده است و کدام پستاندار؟",
        baskets: [{ label: "پرنده", pic: "🐦", value: "bird" }, { label: "پستاندار", pic: "🐄", value: "mam" }],
        items: [
          { pic: "🦉", say: "جغد", basket: "bird" },
          { pic: "🦜", say: "طوطی", basket: "bird" },
          { pic: "🐓", say: "خروس", basket: "bird" },
          { pic: "🐪", say: "شتر", basket: "mam" },
          { pic: "🐆", say: "یوزپلنگ", basket: "mam" },
          { label: "خفاش", say: "خفاش", basket: "mam" }
        ] },
      { type: "pairs", prompt: "هر گروه با پوششش", say: "هر گروه را به پوشش بدنش برسان.",
        pairs: [
          [{ pic: "🐦", say: "پرنده" }, { label: "پر", say: "پر" }],
          [{ pic: "🐑", say: "پستاندار" }, { label: "مو یا پشم", say: "مو یا پشم" }],
          [{ pic: "🐍", say: "خزنده" }, { label: "فلس خشک", say: "فلس خشک" }],
          [{ pic: "🐸", say: "دوزیست" }, { label: "پوست نرم و خیس", say: "پوست نرم و خیس" }]
        ] },
      { type: "home", pic: "📚 🦴", text: "دفترچه گروه‌های جانوران",
        need: ["کاغذ و مداد رنگی", "یا عکس جانوران از مجله‌های کهنه و چسب"],
        steps: [
          "کاغذ را به پنج ستون تقسیم کنید: ماهی، دوزیست، خزنده، پرنده، پستاندار.",
          "در هر ستون دست‌کم یک جانور بکشید یا عکسش را بچسبانید.",
          "برای هر جانور بگویید: کجا زندگی می‌کند و بدنش با چه پوشیده شده؟",
          "خودتان را هم در ستون درست بکشید!"
        ],
        ask: "خودت را در کدام ستون کشیدی؟" }
    ]
  },
  {
    id: "science-sapling-34", subject: "science", level: "sapling", emoji: "🪹", title: "درون آشیانه‌ها",
    steps: [
      { type: "scene", prompt: "جانوران کجا خانه می‌سازند؟", bg: "#cdeaf7",
        /* A stork flies to its big nest of sticks on top of an old minaret and lands; two chicks look out. A river
           bank cut away: a bee-eater flies into its tunnel in the earth wall, where its eggs are; below, a fox's
           den, and the fox brings her cubs out. Last, back on the minaret: the stork bends down and feeds its chicks.
           Drawings: js/art/rig-science.js. */
        parts: {
          meadow: { art: "sci-meadow" }, minaret: { art: "sci-minaret", at: [96, 88], s: 0.9 },
          nest: { art: "sci-nest", at: [96, 30.6], s: 1.8 }, chicks: { art: "sci-storkchicks", at: [95, 29.4], s: 1, o: 0 },
          stork: { art: "sci-stork", at: [100, 30], s: 0.8, o: 0 }, fly: { art: "sci-stork-fly", at: [-24, 30], s: 0.9 },
          bank: { art: "sci-bank", o: 0 }, bee: { art: "sci-beeeater", at: [176, 34], s: 1.3, o: 0 },
          fox: { art: "🦊", at: [44, 72], s: 1.2, o: 0 }, cub1: { art: "🦊", at: [38, 74], s: 0.6, o: 0 }, cub2: { art: "🦊", at: [50, 74], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "لک‌لک لانه بزرگش را با شاخه، بالای مناره می‌سازد. هر بهار به همان لانه برمی‌گردد.", key: 4400, hold: 7000, do: [
            { id: "fly.wings", to: { sy: -0.6 }, dur: 300, yoyo: true, times: 7 },
            { id: "fly", path: "M-24 40Q40 10 98 20", dur: 3600, ease: "out" },
            { id: "fly", to: { o: 0 }, at: 3600, dur: 200 }, { id: "stork", to: { o: 1 }, at: 3600, dur: 200 },
            { id: "chicks", to: { o: 1 }, at: 4000, dur: 400 }
          ] },
          { caption: "زنبورخوار در دیواره خاکی کنار رود تونل می‌کَنَد و ته تونل تخم می‌گذارد.", key: 3800, hold: 6800, do: [
            { id: "bank", to: { o: 1 }, dur: 800 },
            { id: "bee", to: { o: 1 }, at: 600, dur: 300 }, { id: "bee", path: "M176 34Q150 30 124 46", at: 700, dur: 1800, ease: "out" },
            { id: "bee", to: { x: 104, y: 46 }, at: 2600, dur: 1400 }
          ] },
          { caption: "پایین‌تر، روباه در لانه زیرزمینی‌اش بچه به دنیا آورده و از آن‌ها نگهداری می‌کند.", key: 3800, hold: 6800, do: [
            { id: "fox", to: { o: 1 }, dur: 600 }, { id: "cub1", to: { o: 1 }, at: 600, dur: 500 }, { id: "cub2", to: { o: 1 }, at: 800, dur: 500 },
            { id: "cub1", to: { r: -8 }, at: 1600, dur: 400, yoyo: true, times: 3 }, { id: "fox", to: { r: 6 }, at: 2400, dur: 600, yoyo: true }
          ] },
          { caption: "پدر و مادرها از بچه‌ها مراقبت می‌کنند: به آن‌ها غذا می‌دهند و گرمشان نگه می‌دارند.", key: 3200, hold: 6800, do: [
            { id: "bank", to: { o: 0 }, dur: 800 }, { id: "bee", to: { o: 0 }, dur: 400 }, { id: "fox", to: { o: 0 }, dur: 600 }, { id: "cub1", to: { o: 0 }, dur: 600 }, { id: "cub2", to: { o: 0 }, dur: 600 },
            { cam: { x: 96, y: 26, zoom: 2.4 }, at: 600, dur: 1400 },
            { id: "stork.head", to: { r: 70 }, at: 2200, dur: 700 }, { id: "chicks", to: { y: 28 }, at: 2600, dur: 300, yoyo: true, times: 3 },
            { id: "stork.head", to: { r: 0 }, at: 4200, dur: 700 }
          ] }
        ],
        question: "زنبورخوار تخمش را کجا می‌گذارد؟",
        options: ["ته تونلی در دیواره خاکی", "بالای مناره", "روی آب"], answer: "ته تونلی در دیواره خاکی" },
      { type: "pairs", prompt: "هر جانور و خانه‌اش", say: "هر جانور را به خانه‌اش برسان.",
        pairs: [
          [{ label: "لک‌لک", say: "لک‌لک" }, { label: "لانه بالای مناره", say: "لانه بالای مناره" }],
          [{ label: "زنبورخوار", say: "زنبورخوار" }, { label: "تونل در دیواره خاکی", say: "تونل در دیواره خاکی" }],
          [{ pic: "🦊", say: "روباه" }, { label: "لانه زیرزمینی", say: "لانه زیرزمینی" }],
          [{ pic: "🐝", say: "زنبور عسل" }, { label: "کندو", say: "کندو" }]
        ] },
      { type: "choose", prompt: "چرا پرنده‌ها روی تخم می‌نشینند؟", say: "چرا پرنده‌ها روی تخمشان می‌نشینند؟",
        options: ["تا تخم گرم بماند و جوجه بیرون بیاید", "چون خسته‌اند"], answer: "تا تخم گرم بماند و جوجه بیرون بیاید" },
      { type: "choose", prompt: "اگر لانه پرنده‌ای را دیدیم، چه کنیم؟", say: "اگر در پارک لانه پرنده‌ای دیدیم، چه کار کنیم؟",
        options: ["از دور نگاهش کنیم و به آن دست نزنیم", "تخم‌ها را برداریم"], answer: "از دور نگاهش کنیم و به آن دست نزنیم" },
      { type: "home", pic: "🪹 🔭", text: "لانه‌یاب محله!",
        need: ["یک گردش کوتاه با یک بزرگ‌تر", "کاغذ و مداد"],
        steps: [
          "در درخت‌ها، زیر لبه بام‌ها و روی تیرهای برق دنبال لانه بگردید.",
          "از دور نگاه کنید: لانه از چه ساخته شده؟ شاخه، گل یا علف؟",
          "لانه را بکشید و بنویسید کجا بود.",
          "هیچ‌وقت به لانه و تخم‌ها دست نزنید؛ پدر و مادر ممکن است بترسند و برنگردند."
        ],
        ask: "لانه‌ای که پیدا کردی از چه ساخته شده بود؟" }
    ]
  },
  {
    id: "science-sapling-56", subject: "science", level: "sapling", emoji: "🐐", title: "با هم زنده می‌مانیم",
    steps: [
      { type: "scene", prompt: "زندگی در گروه به جانوران چه کمکی می‌کند؟", bg: "#cdeaf7",
        /* A herd of wild goats grazes on a mountain slope while one stands on a rock and watches; it sees a leopard
           far off, and the whole herd runs up the mountain. Cranes fly in a V (like the Persian digit ۷), each in the
           air stirred by the one ahead. Inside a hive, each bee has a job: one brings nectar in through the door,
           one guards the door, one feeds the young. Drawings: js/art/rig-science.js. */
        parts: {
          sky: { art: "sci-sky" }, hills: { art: "sci-mountains" }, ground: { art: "sci-ground" }, rock: { art: "sci-rock", at: [120, 80], s: 1 },
          g1: { art: "🐐", at: [40, 82], s: 1.3 }, g2: { art: "🐐", at: [62, 84], s: 1.2 }, g3: { art: "🐐", at: [84, 82], s: 1.3 },
          g4: { art: "🐐", at: [120, 64], s: 1.2 },
          leo: { art: "🐆", at: [-20, 86], s: 1.4 },
          c1: { art: "sci-crane-fly", at: [-10, 30], s: 0.7, o: 0 }, c2: { art: "sci-crane-fly", at: [-36, 18], s: 0.7, o: 0 }, c3: { art: "sci-crane-fly", at: [-36, 42], s: 0.7, o: 0 },
          c4: { art: "sci-crane-fly", at: [-62, 6], s: 0.7, o: 0 }, c5: { art: "sci-crane-fly", at: [-62, 54], s: 0.7, o: 0 },
          comb: { art: "sci-comb", o: 0 },
          bee1: { art: "sci-bee", at: [170, 70], s: 1.6, o: 0 }, bee2: { art: "sci-bee", at: [126, 76], s: 1.6, flip: true, o: 0 }, bee3: { art: "sci-bee", at: [60, 40], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "بزهای کوهی گروهی زندگی می‌کنند. وقتی بقیه می‌چرند، یکی روی سنگ می‌ایستد و نگهبانی می‌دهد.", key: 3200, hold: 6000, do: [
            { id: "g1", to: { r: 10 }, at: 400, dur: 600, yoyo: true, times: 2 }, { id: "g3", to: { r: 10 }, at: 900, dur: 600, yoyo: true, times: 2 },
            { id: "g4", to: { r: -6 }, at: 1600, dur: 800, yoyo: true }
          ] },
          { caption: "نگهبان پلنگ را از دور دید و خبر داد. همه با هم به بالای کوه فرار کردند!", key: 3600, hold: 6400, do: [
            { id: "leo", to: { x: 8 }, dur: 1400 },
            { id: "g4", to: { y: 61 }, at: 1200, dur: 200, yoyo: true, times: 2 },
            { id: "g1", to: { x: 100, y: 58 }, at: 1800, dur: 2200, ease: "in" }, { id: "g2", to: { x: 118, y: 50 }, at: 1900, dur: 2200, ease: "in" },
            { id: "g3", to: { x: 134, y: 44 }, at: 1800, dur: 2000, ease: "in" }, { id: "g4", to: { x: 146, y: 40 }, at: 2000, dur: 1800, ease: "in" },
            { id: "leo", to: { x: 30 }, at: 2400, dur: 1600 }
          ] },
          { caption: "درناها در آسمان به شکل «۷» پرواز می‌کنند. اینطوری هر درنا راحت‌تر پرواز می‌کند و کسی گم نمی‌شود.", key: 4400, hold: 7000, do: [
            { id: "leo", to: { o: 0 }, dur: 500 }, { id: "g1", to: { o: 0 }, dur: 500 }, { id: "g2", to: { o: 0 }, dur: 500 }, { id: "g3", to: { o: 0 }, dur: 500 }, { id: "g4", to: { o: 0 }, dur: 500 },
            { id: "c1", to: { o: 1 }, dur: 300 }, { id: "c2", to: { o: 1 }, dur: 300 }, { id: "c3", to: { o: 1 }, dur: 300 }, { id: "c4", to: { o: 1 }, dur: 300 }, { id: "c5", to: { o: 1 }, dur: 300 },
            { id: "c1", to: { x: "+140" }, at: 300, dur: 6000, ease: "linear" }, { id: "c2", to: { x: "+140" }, at: 300, dur: 6000, ease: "linear" }, { id: "c3", to: { x: "+140" }, at: 300, dur: 6000, ease: "linear" },
            { id: "c4", to: { x: "+140" }, at: 300, dur: 6000, ease: "linear" }, { id: "c5", to: { x: "+140" }, at: 300, dur: 6000, ease: "linear" },
            { id: "c1.wings", to: { sy: -0.6 }, at: 300, dur: 500, yoyo: true, times: 11 }, { id: "c2.wings", to: { sy: -0.6 }, at: 400, dur: 500, yoyo: true, times: 11 },
            { id: "c3.wings", to: { sy: -0.6 }, at: 450, dur: 500, yoyo: true, times: 11 }, { id: "c4.wings", to: { sy: -0.6 }, at: 550, dur: 500, yoyo: true, times: 11 },
            { id: "c5.wings", to: { sy: -0.6 }, at: 600, dur: 500, yoyo: true, times: 11 }
          ] },
          { caption: "در کندو هر زنبوری کاری دارد: یکی شهد گل را می‌آورد، یکی از در نگهبانی می‌کند، یکی به بچه‌زنبورها غذا می‌دهد.", key: 4400, hold: 7600, do: [
            { id: "comb", to: { o: 1 }, dur: 800 },
            { id: "bee2", to: { o: 1 }, at: 400, dur: 300 }, { id: "bee3", to: { o: 1 }, at: 400, dur: 300 },
            { id: "bee1", to: { o: 1 }, at: 600, dur: 300 }, { id: "bee1", path: "M170 70Q150 70 140 82", at: 700, dur: 1400 }, { id: "bee1", path: "M140 82Q110 60 92 52", at: 2200, dur: 1800 },
            { id: "bee1.wings", to: { sy: -1 }, at: 700, dur: 120, yoyo: true, times: 26 },
            { id: "bee2", to: { x: "-3" }, at: 1200, dur: 400, yoyo: true, times: 3 },
            { id: "bee3", path: "M60 40Q66 34 72 40T84 40", at: 1400, dur: 2600 }
          ] }
        ],
        question: "چرا بزهای کوهی یک نگهبان دارند؟",
        options: ["تا خطر را زود ببیند و به بقیه خبر بدهد", "تا تنها غذا بخورد", "تا بقیه را بترساند"], answer: "تا خطر را زود ببیند و به بقیه خبر بدهد" },
      { type: "pairs", prompt: "هر گروه و کمکش", say: "هر گروه جانور را به کاری که با هم می‌کنند برسان.",
        pairs: [
          [{ pic: "🐐", say: "گله بزهای کوهی" }, { label: "نگهبانی از گله", say: "یکی نگهبانی می‌دهد" }],
          [{ label: "درناها", say: "درناها" }, { label: "پرواز به شکل ۷", say: "پرواز به شکل ۷" }],
          [{ pic: "🐝", say: "زنبورهای عسل" }, { label: "تقسیم کار در کندو", say: "هر کدام کاری در کندو" }],
          [{ pic: "🐜", say: "مورچه‌ها" }, { label: "با هم بردن دانه", say: "با هم دانه می‌برند" }]
        ] },
      { type: "choose", prompt: "چرا درناها با هم پرواز می‌کنند؟", say: "چرا درناها با هم و به شکل ۷ پرواز می‌کنند؟",
        options: ["تا راحت‌تر پرواز کنند و گم نشوند", "تا با هم دعوا کنند"], answer: "تا راحت‌تر پرواز کنند و گم نشوند" },
      { type: "choose", prompt: "ما آدم‌ها کجا با هم کار می‌کنیم؟", say: "ما آدم‌ها هم با هم کار می‌کنیم. کدام مثال درست است؟",
        options: ["خانواده با هم خانه را تمیز می‌کند", "هر کس فقط برای خودش کار می‌کند"], answer: "خانواده با هم خانه را تمیز می‌کند" },
      { type: "home", pic: "🐜 🔍", text: "مورچه‌ها چطور با هم کار می‌کنند؟",
        need: ["یک ذره نان یا شکر", "یک جای کوچک بیرون که مورچه دارد"],
        steps: [
          "یک ذره نان یا شکر نزدیک لانه مورچه‌ها بگذارید.",
          "صبر کنید و از نزدیک ولی بدون دست زدن نگاه کنید: کی اولین مورچه پیدایش می‌شود؟",
          "ببینید مورچه‌ها دیگران را خبر می‌کنند؟ چند تا با هم یک تکه را می‌برند؟",
          "در خانه با هم یک کار گروهی بکنید، مثل چیدن سفره: هر کس یک کار."
        ],
        ask: "چند مورچه با هم کار کردند؟" }
    ]
  },
  {
    id: "science-sapling-55", subject: "science", level: "sapling", emoji: "🐚", title: "سنگ‌ها و فسیل‌ها",
    steps: [
      { type: "scene", prompt: "سنگ‌ها از گذشته زمین چه می‌گویند؟", bg: "#f6efdc",
        /* Three rocks on a table, each picked out in turn: rough speckled granite, a smooth round river stone, red
           sandstone in layers. Then the bottom of a shallow sea: a shell falls onto the mud and layers of mud and sand
           slowly cover it. Millions of years later the sea is gone, the mud is rock, and the shell's print is a
           fossil. Last, a fossil shell high in Iran's mountains: there was a sea there long ago. Drawings:
           js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" },
          r1: { art: "sci-granite", at: [40, 72], s: 1.6 }, r2: { art: "sci-riverstone", at: [80, 72], s: 1.6 }, r3: { art: "sci-sandstone", at: [120, 72], s: 1.6 },
          ring: { art: "sci-ring", at: [40, 56], s: 3, o: 0 },
          sea: { art: "sci-seabed", o: 0 }, shell: { art: "sci-shell", at: [80, 20], s: 1.6, o: 0 },
          m1: { art: "sci-mudband", at: [0, 56], o: 0 }, m2: { art: "sci-mudband", at: [0, 50], o: 0 }, m3: { art: "sci-mudband", at: [0, 44], o: 0 },
          rock: { art: "sci-fossilrock", o: 0 },
          sky: { art: "sci-sky", o: 0 }, hills: { art: "sci-mountains", o: 0 }, ground: { art: "sci-ground", o: 0 },
          fossil: { art: "sci-fossil", at: [128, 46], s: 1.2, o: 0 }, glass: { art: "sci-ring", at: [128, 46], s: 3.4, o: 0 }
        },
        scenes: [
          { caption: "سنگ‌ها با هم فرق دارند: یکی زبر و خال‌خالی است، یکی صاف و گرد، یکی لایه‌لایه.", key: 4600, hold: 7000, do: [
            { id: "ring", to: { o: 1 }, at: 600, dur: 300 }, { id: "ring", to: { x: 80 }, at: 2000, dur: 600 }, { id: "ring", to: { x: 120 }, at: 3400, dur: 600 }
          ] },
          { caption: "خیلی خیلی سال پیش، یک صدف در دریا مُرد و روی گلِ کف دریا افتاد. کم‌کم گل و ماسه رویش را پوشاند.", key: 3700, hold: 8000, do: [
            { id: "sea", to: { o: 1 }, dur: 800 }, { id: "ring", to: { o: 0 }, dur: 400 },
            { id: "shell", to: { o: 1 }, at: 600, dur: 300 }, { id: "shell", path: "M80 20Q84 40 80 62", at: 700, dur: 2000, ease: "out" },
            { id: "m1", to: { o: 1 }, at: 3000, dur: 900 }, { id: "m2", to: { o: 1 }, at: 4000, dur: 900 }, { id: "m3", to: { o: 1 }, at: 5000, dur: 900 }
          ] },
          { caption: "میلیون‌ها سال گذشت. دریا رفت، گل سفت شد و سنگ شد. جای صدف در سنگ ماند: به این «فسیل» می‌گوییم.", key: 3200, hold: 7000, do: [
            { id: "rock", to: { o: 1 }, at: 400, dur: 2400 }
          ] },
          { caption: "در کوه‌های زاگرس و البرز، فسیل صدف و جانوران دریایی پیدا می‌شود. یعنی روزگاری آنجا دریا بوده!", key: 3600, hold: 7400, do: [
            { id: "sky", to: { o: 1 }, dur: 800 }, { id: "hills", to: { o: 1 }, dur: 800 }, { id: "ground", to: { o: 1 }, dur: 800 },
            { id: "fossil", to: { o: 1 }, at: 1000, dur: 500 }, { id: "glass", to: { o: 1 }, at: 1600, dur: 300 }, { id: "glass", to: { s: 3.8 }, at: 1900, dur: 600, yoyo: true, times: 2 }
          ] }
        ],
        question: "فسیل صدف در کوه به ما چه می‌گوید؟",
        options: ["روزگاری آنجا دریا بوده", "صدف‌ها از کوه بالا رفته‌اند", "دیروز آنجا باران آمده"], answer: "روزگاری آنجا دریا بوده" },
      { type: "sort", prompt: "زبر است یا صاف؟", say: "دست بکش و ببین: کدام سنگ زبر است و کدام صاف؟",
        baskets: [{ label: "زبر", pic: "🪨", value: "rough" }, { label: "صاف", pic: "⚪", value: "smooth" }],
        items: [
          { label: "سنگ پا", say: "سنگ پا", basket: "rough" },
          { label: "سنگ شکسته کوه", say: "سنگ شکسته کوه", basket: "rough" },
          { label: "ماسه‌سنگ", say: "ماسه‌سنگ", basket: "rough" },
          { label: "سنگ‌ریزه رودخانه", say: "سنگ‌ریزه رودخانه", basket: "smooth" },
          { label: "سنگ مرمر صیقلی", say: "سنگ مرمر صیقلی", basket: "smooth" }
        ] },
      { type: "order", prompt: "فسیل چطور درست می‌شود؟", say: "صدف روی گل افتاد، گل رویش را پوشاند، گل سنگ شد، و حالا فسیل را در کوه پیدا می‌کنیم. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🐚", label: "صدف روی گل", say: "صدف روی گل کف دریا افتاد" }, { pic: "🌊", label: "گل رویش را پوشاند", say: "گل و ماسه رویش را پوشاند" },
          { pic: "🪨", label: "گل سنگ شد", say: "گل سفت شد و سنگ شد" }, { pic: "⛰️", label: "فسیل در کوه", say: "فسیل را در کوه پیدا می‌کنیم" }] },
      { type: "choose", prompt: "فسیل درست شدن چقدر طول می‌کشد؟", say: "درست شدن یک فسیل چقدر طول می‌کشد؟",
        options: ["میلیون‌ها سال", "یک روز"], answer: "میلیون‌ها سال" },
      { type: "home", pic: "🐚 🫓", text: "یک فسیل خمیری بساز!",
        need: ["کمی خمیر بازی یا خمیر نمک", "یک صدف، برگ یا اسباب‌بازی کوچک", "چند سنگ مختلف از حیاط"],
        steps: [
          "خمیر را صاف کنید. صدف یا برگ را محکم رویش فشار دهید و بردارید: جایش ماند!",
          "بگذارید خمیر یک روز خشک شود. این شبیه فسیل است: جای چیزی که دیگر نیست.",
          "سنگ‌های حیاط را با دست لمس کنید و کنار هم بچینید: زبرها یک طرف، صاف‌ها یک طرف.",
          "با ذره‌بین یا از نزدیک نگاه کنید: کدام سنگ خال یا لایه دارد؟ بعد دست‌ها را بشویید."
        ],
        ask: "جای کدام چیز روی خمیر ماند؟" }
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
    id: "science-sapling-37", subject: "science", level: "sapling", emoji: "📏", title: "من رشد می‌کنم",
    steps: [
      { type: "scene", prompt: "بدن ما چطور بزرگ می‌شود؟", bg: "#f6efdc",
        /* A child stands by a height chart on the wall and grows from a little one to a bigger child; a red mark is
           drawn at each height. Then the child eats bread and fruit and runs and jumps: food gives energy. Last,
           bricks are laid one by one on a little wall as the child grows taller beside it: food also gives the body
           what it needs to build itself bigger. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, chart: { art: "sci-heightchart", at: [70, 72] },
          mk1: { art: "sci-mark", at: [66, 53.4], o: 0 }, mk2: { art: "sci-mark", at: [66, 50], o: 0 }, mk3: { art: "sci-mark", at: [66, 46.2], o: 0 },
          kid: { art: "🧒", at: [82, 74], s: 0.85 },
          bread: { art: "🍞", at: [120, 62], s: 0.8, o: 0 }, apple: { art: "🍎", at: [132, 62], s: 0.7, o: 0 },
          wall: { art: "sci-brick", at: [40, 86], s: 1.2, o: 0 }, w2: { art: "sci-brick", at: [40, 40], s: 1.2, o: 0 }, w3: { art: "sci-brick", at: [40, 40], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "بدن ما رشد می‌کند. هر سال قدمان کمی بلندتر می‌شود. مو و ناخن‌هایمان هم بلند می‌شوند.", key: 5600, hold: 7600, do: [
            { id: "mk1", to: { o: 1 }, at: 600, dur: 300 },
            { id: "kid", to: { s: 1 }, at: 1200, dur: 1600 }, { id: "mk2", to: { o: 1 }, at: 3000, dur: 300 },
            { id: "kid", to: { s: 1.15 }, at: 3600, dur: 1600 }, { id: "mk3", to: { o: 1 }, at: 5300, dur: 300 }
          ] },
          { caption: "غذا به ما انرژی می‌دهد تا بدویم، بازی کنیم و فکر کنیم.", key: 4800, hold: 7000, do: [
            { id: "bread", to: { o: 1 }, dur: 300 }, { id: "apple", to: { o: 1 }, dur: 300 },
            { id: "kid.armF", to: { r: -110 }, at: 600, dur: 400 }, { id: "bread", to: { x: 86, y: 52 }, at: 600, dur: 600 }, { id: "bread", to: { o: 0 }, at: 1300, dur: 300 },
            { id: "apple", to: { x: 86, y: 52 }, at: 1700, dur: 600 }, { id: "apple", to: { o: 0 }, at: 2400, dur: 300 }, { id: "kid.armF", to: { r: 0 }, at: 2400, dur: 400 },
            { id: "kid", to: { y: 68 }, at: 3000, dur: 300, yoyo: true, times: 4, ease: "out" },
            { emit: "spark", from: "kid", where: [0, -26], spread: [10, 6], n: 8, at: 3000, dur: 1400, life: 700 }
          ] },
          { caption: "غذا مصالح ساختن بدن را هم می‌دهد، مثل آجرهایی که دیوار را بالا می‌برند. این‌طوری استخوان و ماهیچه‌هایمان بزرگ می‌شوند.", key: 4800, hold: 7600, do: [
            { id: "wall", to: { o: 1 }, dur: 500 },
            { id: "w2", to: { o: 1 }, at: 800, dur: 200 }, { id: "w2", to: { y: 81.2 }, at: 800, dur: 800, ease: "in" },
            { id: "w3", to: { o: 1 }, at: 2200, dur: 200 }, { id: "w3", to: { y: 76.4 }, at: 2200, dur: 800, ease: "in" },
            { id: "kid", to: { s: 1.3 }, at: 1000, dur: 3200 }
          ] }
        ],
        question: "غذا به بدن ما چه می‌دهد؟",
        options: ["انرژی و مصالح رشد", "فقط مزه", "هیچ چیز"], answer: "انرژی و مصالح رشد" },
      { type: "order", prompt: "از کوچک تا بزرگ بچین", say: "اول نوزاد بودیم، بعد کودک شدیم، بعد نوجوان، و بعد بزرگسال می‌شویم. به ترتیب بچین.", numbered: true,
        items: [{ pic: "👶", label: "نوزاد", say: "نوزاد" }, { pic: "🧒", label: "کودک", say: "کودک" }, { pic: "🧑", label: "نوجوان", say: "نوجوان" }, { pic: "🧔", label: "بزرگسال", say: "بزرگسال" }] },
      { type: "sort", prompt: "رشد می‌کند یا نه؟", say: "کدام‌ها با گذشت زمان بزرگ‌تر یا بلندتر می‌شوند و کدام‌ها نه؟",
        baskets: [{ label: "رشد می‌کند", pic: "🌱", value: "yes" }, { label: "رشد نمی‌کند", pic: "🧸", value: "no" }],
        items: [
          { label: "قد من", say: "قد من", basket: "yes" },
          { label: "موی من", say: "موی من", basket: "yes" },
          { label: "ناخن‌های من", say: "ناخن‌های من", basket: "yes" },
          { pic: "👟", say: "کفش من", basket: "no" },
          { pic: "🧸", say: "خرس عروسکی", basket: "no" },
          { pic: "🪨", say: "سنگ", basket: "no" }
        ] },
      { type: "choose", prompt: "چرا وقتی بزرگ می‌شویم کفش‌ها تنگ می‌شوند؟", say: "چرا کفش‌های پارسال حالا تنگ شده‌اند؟",
        options: ["چون پای ما رشد کرده", "چون کفش کوچک شده"], answer: "چون پای ما رشد کرده" },
      { type: "home", pic: "📏 🚪", text: "قدت را علامت بزن!",
        need: ["یک چارچوب در یا یک کاغذ بلند روی دیوار", "یک مداد", "یک کتاب"],
        steps: [
          "کودک بدون کفش، صاف کنار در بایستد.",
          "بزرگ‌تر یک کتاب صاف روی سرش بگذارد و زیر کتاب یک خط بکشد. تاریخ را کنارش بنویسید.",
          "هر ماه یا هر فصل دوباره اندازه بگیرید.",
          "دست کودک را روی کاغذ بکشید و نگه دارید؛ سال دیگر دوباره بکشید و مقایسه کنید."
        ],
        ask: "تا حالا چقدر بلندتر شده‌ای؟" }
    ]
  },
  {
    id: "science-sapling-38", subject: "science", level: "sapling", emoji: "🔗", title: "بازی زنجیره‌ها",
    steps: [
      { type: "order", prompt: "زنجیره غذایی را بچین", say: "زنجیره غذایی با گیاه شروع می‌شود. علف، ملخ، گنجشک، جغد. از اول بچین.", numbered: true,
        items: [{ pic: "🌿", label: "علف", say: "علف" }, { label: "ملخ", say: "ملخ" }, { pic: "🐦", label: "گنجشک", say: "گنجشک" }, { pic: "🦉", label: "جغد", say: "جغد" }] },
      { type: "order", prompt: "این زنجیره را هم بچین", say: "در دریا هم زنجیره هست: گیاهان ریز دریا، ماهی کوچک، ماهی بزرگ، دلفین. از اول بچین.", numbered: true,
        items: [{ label: "گیاه ریز دریا", say: "گیاهان ریز دریا" }, { pic: "🐟", label: "ماهی کوچک", say: "ماهی کوچک" }, { pic: "🐠", label: "ماهی بزرگ", say: "ماهی بزرگ" }, { pic: "🐬", label: "دلفین", say: "دلفین" }] },
      { type: "pairs", prompt: "هر جانور و زیستگاهش", say: "هر جانور را به جایی در ایران برسان که آنجا زندگی می‌کند.",
        pairs: [
          [{ pic: "🦌", say: "مرال" }, { label: "جنگل‌های شمال", say: "جنگل‌های شمال" }],
          [{ pic: "🐐", say: "بز کوهی" }, { label: "کوه‌های زاگرس", say: "کوه‌های زاگرس" }],
          [{ pic: "🐆", say: "یوزپلنگ" }, { label: "کویر", say: "کویر" }],
          [{ pic: "🐬", say: "دلفین" }, { label: "خلیج فارس", say: "خلیج فارس" }]
        ] },
      { type: "pairs", prompt: "کی به کی کمک می‌کند؟", say: "گیاهان به جانوران نیاز دارند. هر جانور را به کمکی که به گیاه می‌کند برسان.",
        pairs: [
          [{ pic: "🐝", say: "زنبور" }, { label: "گرده را از گلی به گل دیگر می‌برد", say: "گرده را از گلی به گل دیگر می‌برد" }],
          [{ pic: "🐿️", say: "سنجاب" }, { label: "دانه را زیر خاک چال می‌کند", say: "دانه را زیر خاک چال می‌کند" }],
          [{ pic: "🐦", say: "پرنده" }, { label: "دانه میوه را جای دیگری می‌برد", say: "دانه میوه را جای دیگری می‌برد" }]
        ] },
      { type: "home", pic: "🌼 🐝", text: "کارآگاه گل‌ها: چه کسی به گل‌ها سر می‌زند؟",
        need: ["یک باغچه یا پارک با گل", "کاغذ و مداد"],
        steps: [
          "کنار چند گل بایستید، ولی نه خیلی نزدیک.",
          "چند دقیقه آرام نگاه کنید: زنبور، پروانه یا مگس روی گل‌ها می‌نشیند؟",
          "هر بار که یکی آمد، یک خط روی کاغذ بکشید.",
          "به زنبورها دست نزنید و آرام بمانید؛ آن‌ها مشغول کارشان‌اند."
        ],
        ask: "کدام جانور بیشتر به گل‌ها سر زد؟" }
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
  },
  {
    id: "science-sapling-39", subject: "science", level: "sapling", emoji: "🎵", title: "بلند و آهسته، زیر و بم",
    steps: [
      { type: "scene", prompt: "چطور صدا را زیر یا بم، بلند یا آهسته کنیم؟", bg: "#f6efdc",
        /* A shoebox with a thin and a thick rubber band. The thin band is plucked: it shivers fast and high notes
           rise; the thick one shivers slowly and low notes rise. Plucked hard, the band swings far and the sound is
           loud (big waves); plucked gently, it is quiet (small waves). Last, four glass jars with more and more water
           are tapped with a wooden spoon in turn: the more water, the lower the note. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, box: { art: "sci-bandbox2", at: [80, 70], s: 2.4 },
          n1: { art: "sci-note", at: [96, 36], s: 1.4, o: 0 }, n2: { art: "sci-note", at: [104, 40], s: 1.4, o: 0 },
          n3: { art: "sci-note", at: [64, 46], s: 2.2, o: 0 },
          wv: { art: "sci-waves", at: [120, 44], s: 1.6, o: 0 }, wq: { art: "sci-waves", at: [120, 44], s: 0.8, o: 0 },
          j1: { art: "sci-jarw", at: [44, 72], s: 1.6, o: 0 }, j2: { art: "sci-jarw", at: [68, 72], s: 1.6, o: 0 }, j3: { art: "sci-jarw", at: [92, 72], s: 1.6, o: 0 }, j4: { art: "sci-jarw", at: [116, 72], s: 1.6, o: 0 },
          spoon: { art: "sci-woodspoon", at: [140, 30], s: 1.4, o: 0 },
          t1: { art: "sci-note", at: [44, 36], s: 1.2, o: 0 }, t2: { art: "sci-note", at: [68, 36], s: 1.5, o: 0 }, t3: { art: "sci-note", at: [92, 36], s: 1.8, o: 0 }, t4: { art: "sci-note", at: [116, 36], s: 2.1, o: 0 }
        },
        scenes: [
          { caption: "کش نازک را کشیدیم: تند تند لرزید و صدای زیر داد. کش کلفت آرام‌تر لرزید و صدای بم داد.", key: 2200, hold: 7000, do: [
            { id: "box.thin", to: { sy: 4 }, at: 600, dur: 60, yoyo: true, times: 20 },
            { id: "n1", to: { o: 1 }, at: 700, dur: 200 }, { id: "n1", to: { y: 24 }, at: 700, dur: 1400 }, { id: "n1", to: { o: 0 }, at: 2100, dur: 300 },
            { id: "n2", to: { o: 1 }, at: 1000, dur: 200 }, { id: "n2", to: { y: 26 }, at: 1000, dur: 1400 }, { id: "n2", to: { o: 0 }, at: 2400, dur: 300 },
            { id: "box.thick", to: { sy: 3 }, at: 3200, dur: 180, yoyo: true, times: 8 },
            { id: "n3", to: { o: 1 }, at: 3300, dur: 200 }, { id: "n3", to: { y: 30 }, at: 3300, dur: 2200 }, { id: "n3", to: { o: 0 }, at: 5300, dur: 400 }
          ] },
          { caption: "کش را محکم بکشیم، زیاد می‌لرزد و صدا بلند است. آرام بکشیم، کم می‌لرزد و صدا آهسته است.", key: 1400, hold: 6400, do: [
            { id: "box.thick", to: { sy: 6 }, at: 400, dur: 160, yoyo: true, times: 8 },
            { id: "wv", to: { o: 1 }, at: 500, dur: 200 }, { id: "wv", to: { o: 0 }, at: 1900, dur: 400 },
            { id: "box.thick", to: { sy: 2 }, at: 3000, dur: 160, yoyo: true, times: 8 },
            { id: "wq", to: { o: 1 }, at: 3100, dur: 200 }, { id: "wq", to: { o: 0 }, at: 4500, dur: 400 }
          ] },
          { caption: "در شیشه‌ها آب ریختیم، هر کدام کمی بیشتر. با قاشق چوبی آرام به آن‌ها زدیم: شیشه‌ای که آب بیشتری دارد، صدای بم‌تری می‌دهد.", key: 6400, hold: 8400, do: [
            { id: "box", to: { o: 0 }, dur: 500 },
            { id: "j1", to: { o: 1 }, at: 300, dur: 400 }, { id: "j2", to: { o: 1 }, at: 300, dur: 400 }, { id: "j3", to: { o: 1 }, at: 300, dur: 400 }, { id: "j4", to: { o: 1 }, at: 300, dur: 400 },
            { id: "j1.water", to: { sy: 0.2 }, dur: 1 }, { id: "j2.water", to: { sy: 0.4 }, dur: 1 }, { id: "j3.water", to: { sy: 0.6 }, dur: 1 }, { id: "j4.water", to: { sy: 0.85 }, dur: 1 },
            { id: "spoon", to: { o: 1 }, at: 900, dur: 300 },
            { id: "spoon", to: { x: 50, y: 50 }, at: 1200, dur: 500 }, { id: "t1", to: { o: 1 }, at: 1700, dur: 200 }, { id: "t1", to: { y: 22 }, at: 1700, dur: 1200 }, { id: "t1", to: { o: 0 }, at: 2900, dur: 300 },
            { id: "spoon", to: { x: 74 }, at: 2400, dur: 500 }, { id: "t2", to: { o: 1 }, at: 2900, dur: 200 }, { id: "t2", to: { y: 22 }, at: 2900, dur: 1200 }, { id: "t2", to: { o: 0 }, at: 4100, dur: 300 },
            { id: "spoon", to: { x: 98 }, at: 3600, dur: 500 }, { id: "t3", to: { o: 1 }, at: 4100, dur: 200 }, { id: "t3", to: { y: 22 }, at: 4100, dur: 1200 }, { id: "t3", to: { o: 0 }, at: 5300, dur: 300 },
            { id: "spoon", to: { x: 122 }, at: 4800, dur: 500 }, { id: "t4", to: { o: 1 }, at: 5300, dur: 200 }, { id: "t4", to: { y: 22 }, at: 5300, dur: 1400 }
          ] }
        ],
        question: "کدام کش صدای زیرتر می‌دهد؟",
        options: ["کش نازک", "کش کلفت"], answer: "کش نازک" },
      { type: "sort", prompt: "زیر است یا بم؟", say: "کدام صدا زیر است و کدام بم؟",
        baskets: [{ label: "زیر", pic: "🐦", value: "high" }, { label: "بم", pic: "🐻", value: "low" }],
        items: [
          { pic: "🐦", say: "جیک‌جیک گنجشک", basket: "high" },
          { pic: "🔔", say: "زنگوله کوچک", basket: "high" },
          { pic: "🐭", say: "جیرجیر موش", basket: "high" },
          { pic: "🥁", say: "طبل بزرگ", basket: "low" },
          { pic: "🐄", say: "ماغ گاو", basket: "low" },
          { pic: "🚢", say: "بوق کشتی", basket: "low" }
        ] },
      { type: "sort", prompt: "بلند است یا آهسته؟", say: "کدام صدا بلند است و کدام آهسته؟",
        baskets: [{ label: "بلند", pic: "📢", value: "loud" }, { label: "آهسته", pic: "🤫", value: "quiet" }],
        items: [
          { pic: "🚒", say: "آژیر آتش‌نشانی", basket: "loud" },
          { pic: "⛈️", say: "رعد", basket: "loud" },
          { pic: "🤫", say: "پچ‌پچ", basket: "quiet" },
          { pic: "🍂", say: "خش‌خش برگ", basket: "quiet" }
        ] },
      { type: "choose", prompt: "کدام شیشه صدای بم‌تری می‌دهد؟", say: "به دو شیشه آرام ضربه می‌زنیم. کدام صدای بم‌تری می‌دهد؟",
        options: ["شیشه‌ای که آب بیشتری دارد", "شیشه‌ای که آب کمتری دارد"], answer: "شیشه‌ای که آب بیشتری دارد" },
      { type: "home", pic: "📦 🫙", text: "ساز خانگی بساز!",
        need: ["یک جعبه کفش بدون در", "دو کش: یکی نازک، یکی کلفت", "چند شیشه یا لیوان شیشه‌ای هم‌اندازه", "آب و یک قاشق چوبی"],
        steps: [
          "کش‌ها را دور جعبه بیندازید و هر کدام را بکشید و ول کنید. کدام صدای زیرتر دارد؟",
          "یک بار آرام و یک بار محکم بکشید: کدام صدا بلندتر بود؟",
          "در شیشه‌ها آب بریزید: یکی کم، یکی بیشتر، یکی خیلی زیاد.",
          "با قاشق چوبی آرام به شیشه‌ها بزنید (محکم نزنید). از بم به زیر بچینیدشان و یک آهنگ بزنید."
        ],
        ask: "کدام شیشه صدای بم‌تری داشت؟" }
    ]
  },
  {
    id: "science-sapling-51", subject: "science", level: "sapling", emoji: "🌡️", title: "هواشناس کوچک",
    steps: [
      { type: "measure", tool: "thermometer", value: 10, options: [0, 10, 20], prompt: "صبح زود، دماسنج حیاط چند درجه است؟", say: "صبح زود به دماسنج حیاط نگاه کردیم. نوک خط قرمز کجاست؟ چند درجه است؟" },
      { type: "measure", tool: "thermometer", value: 20, ask: "set", prompt: "ظهر هوا گرم‌تر شد: ۲۰ درجه. دماسنج را روی ۲۰ ببر.", say: "ظهر خورشید بالا آمد و هوا گرم‌تر شد: بیست درجه. خط قرمز دماسنج را تا بیست بالا ببر. بعد بزن روی درست شد." },
      { type: "chart", make: true, title: "هوای این هفته", prompt: "هر روز هفته را در ستون هوای خودش بگذار.", say: "این هفته چهار روز آفتابی بود، دو روز ابری و یک روز بارانی. هر روز را در ستون هوای خودش بگذار.",
        rows: [{ label: "آفتابی", pic: "☀️", n: 4 }, { label: "ابری", pic: "☁️", n: 2 }, { label: "بارانی", pic: "🌧️", n: 1 }],
        question: "این هفته بیشتر روزها چطور بود؟", options: [{ label: "آفتابی", value: "☀️" }, { label: "ابری", value: "☁️" }, { label: "بارانی", value: "🌧️" }], answer: "☀️" },
      { type: "chart", bars: true, title: "دمای ظهر در این هفته (درجه)", say: "هر ظهر دما را از روی دماسنج خواندیم و این نمودار را کشیدیم.",
        rows: [{ label: "شنبه", pic: "☀️", n: 16 }, { label: "یکشنبه", pic: "☀️", n: 18 }, { label: "دوشنبه", pic: "☁️", n: 14 }, { label: "سه‌شنبه", pic: "🌧️", n: 11 }, { label: "چهارشنبه", pic: "☁️", n: 13 }, { label: "پنجشنبه", pic: "☀️", n: 17 }, { label: "جمعه", pic: "☀️", n: 19 }],
        question: "کدام روز از همه سردتر بود؟", options: [{ label: "سه‌شنبه", value: "سه‌شنبه" }, { label: "جمعه", value: "جمعه" }, { label: "شنبه", value: "شنبه" }], answer: "سه‌شنبه" },
      { type: "choose", prompt: "باد را از کجا بفهمیم؟", say: "باد را نمی‌بینیم. از کجا بفهمیم باد می‌آید؟",
        options: ["برگ‌ها و پرچم‌ها تکان می‌خورند", "دماسنج بالا می‌رود"], answer: "برگ‌ها و پرچم‌ها تکان می‌خورند" },
      { type: "paper", pic: "📒 🌦️", lang: "fa",
        text: "یک هفته هواشناس باش! هر روز در دفترچه هوا یک خانه بکش: دما (از دماسنج خانه یا پیش‌بینی هوا)، و یک تصویر برای آفتاب، ابر، باران یا باد. آخر هفته یک نمودار ستونی از دماها بکش.",
        example: "شنبه: ۱۶ درجه ☀️ بدون باد\nیکشنبه: ۱۸ درجه ☀️ کمی باد\nدوشنبه: ۱۴ درجه ☁️\nسه‌شنبه: ۱۱ درجه 🌧️",
        check: ["هر روز دما را نوشته؟", "برای هر روز تصویر هوا کشیده؟", "آخر هفته نمودار ستونی کشیده؟"],
        note: "دما را هر روز سر یک ساعت بخوانید، مثلاً ظهر. اگر دماسنج ندارید، از پیش‌بینی هوا بخوانید. آخر هفته بپرسید: گرم‌ترین و سردترین روز کدام بود؟" }
    ]
  },
  {
    id: "science-sapling-52", subject: "science", level: "sapling", emoji: "🗺️", title: "آب و هوای جاهای ایران",
    steps: [
      { type: "scene", prompt: "هوا با آب و هوا چه فرقی دارد؟", bg: "#f6efdc",
        /* Weather and climate. Through a window: rain today, sun tomorrow; that is the weather. Then the map of Iran
           (js/maps/iran.js), and the camera visits four cities with their usual weather: rain over Rasht, snow over
           Ardabil, the hot sun over dry Yazd, and the hot sun with damp air over Bandar Abbas by the sea. Drawings:
           js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, win: { art: "sci-window-day", o: 0 },
          map: { art: "sci-iran", o: 0 },
          rasht: { art: "sci-dot", at: [62.1, 20.8], s: 0.7, o: 0 }, ardabil: { art: "sci-dot", at: [57.1, 15.9], s: 0.7, o: 0 },
          yazd: { art: "sci-dot", at: [80.5, 47.1], s: 0.7, o: 0 }, bandar: { art: "sci-dot", at: [89.1, 69.7], s: 0.7, o: 0 },
          rain: { art: "sci-streaks", at: [62, 14], s: 0.4, o: 0 }, snow: { art: "sci-flakes", at: [57, 9], s: 0.7, o: 0 },
          sunY: { art: "sci-sun", at: [84, 42], s: 0.3, o: 0 }, sunB: { art: "sci-sun", at: [93, 64], s: 0.3, o: 0 },
          damp1: { art: "sci-drop", at: [86, 70], s: 0.3, o: 0 }, damp2: { art: "sci-drop", at: [91.6, 72], s: 0.3, o: 0 }
        },
        scenes: [
          { caption: "امروز باران می‌بارد و فردا شاید آفتابی باشد: این «هوا»ست. ولی «آب و هوا» یعنی یک جا هر سال معمولاً چطور است.", key: 2000, hold: 7400, do: [
            { id: "win", to: { o: 1 }, at: 2400, dur: 1200 }
          ] },
          { caption: "رشت در گیلان پرباران است. بیشتر روزهای سال ابری و بارانی است و جنگل‌هایش سبزند.", key: 3200, hold: 6400, do: [
            { id: "map", to: { o: 1 }, dur: 800 }, { id: "rasht", to: { o: 1 }, at: 600, dur: 300 },
            { cam: { x: 62, y: 22, zoom: 3 }, at: 600, dur: 1600 },
            { id: "rain", to: { o: 1 }, at: 1800, dur: 300 }, { id: "rain", to: { y: "+2" }, at: 1800, dur: 500, times: 6, ease: "linear" }
          ] },
          { caption: "اردبیل زمستان‌های خیلی سرد و پربرف دارد.", key: 2600, hold: 5600, do: [
            { id: "rain", to: { o: 0 }, dur: 300 }, { id: "ardabil", to: { o: 1 }, dur: 300 },
            { cam: { x: 57, y: 15, zoom: 3 }, dur: 1200 },
            { id: "snow", to: { o: 1 }, at: 1200, dur: 300 }, { id: "snow", to: { y: "+2" }, at: 1200, dur: 900, times: 4, ease: "linear" }
          ] },
          { caption: "یزد خشک و کم‌باران است. تابستان‌هایش خیلی گرم است و آسمانش بیشتر وقت‌ها صاف است.", key: 3000, hold: 6000, do: [
            { id: "snow", to: { o: 0 }, dur: 300 }, { id: "yazd", to: { o: 1 }, dur: 300 },
            { cam: { x: 80, y: 46, zoom: 3 }, dur: 1400 },
            { id: "sunY", to: { o: 1 }, at: 1300, dur: 400 }, { id: "sunY.rays", to: { r: 90 }, at: 1300, dur: 3000 }
          ] },
          { caption: "بندرعباس کنار دریاست. هوایش گرم و «شرجی» است: یعنی گرم و پر از رطوبت.", key: 3200, hold: 6400, do: [
            { id: "sunY", to: { o: 0 }, dur: 300 }, { id: "bandar", to: { o: 1 }, dur: 300 },
            { cam: { x: 89, y: 67, zoom: 3 }, dur: 1400 },
            { id: "sunB", to: { o: 1 }, at: 1300, dur: 400 }, { id: "sunB.rays", to: { r: 90 }, at: 1300, dur: 3000 },
            { id: "damp1", to: { o: 1 }, at: 1800, dur: 300 }, { id: "damp2", to: { o: 1 }, at: 2200, dur: 300 },
            { id: "damp1", to: { y: 67 }, at: 1800, dur: 1600, yoyo: true }, { id: "damp2", to: { y: 69 }, at: 2200, dur: 1600, yoyo: true }
          ] }
        ],
        question: "کدام شهر پرباران است؟",
        options: ["رشت", "یزد", "بندرعباس"], answer: "رشت" },
      { type: "pairs", prompt: "هر شهر و آب و هوایش", say: "هر شهر را به آب و هوای معمولش برسان.",
        pairs: [
          [{ label: "رشت", say: "رشت" }, { pic: "🌧️", say: "پرباران" }],
          [{ label: "اردبیل", say: "اردبیل" }, { pic: "❄️", say: "زمستان سرد و پربرف" }],
          [{ label: "یزد", say: "یزد" }, { pic: "🏜️", say: "خشک و کم‌باران" }],
          [{ label: "بندرعباس", say: "بندرعباس" }, { pic: "🥵", say: "گرم و شرجی" }]
        ] },
      { type: "choose", prompt: "کدام جمله درباره «آب و هوا»ست؟", say: "کدام جمله درباره آب و هوای یک جاست، نه هوای امروز؟",
        options: ["یزد هر سال تابستان‌های گرم و خشکی دارد", "امروز صبح در یزد باد آمد"], answer: "یزد هر سال تابستان‌های گرم و خشکی دارد" },
      { type: "choose", prompt: "برای سفر زمستانی به اردبیل چه برداریم؟", say: "زمستان به اردبیل سفر می‌کنیم. چه لباسی برداریم؟",
        options: ["کاپشن، کلاه و دستکش گرم", "فقط لباس نازک تابستانی"], answer: "کاپشن، کلاه و دستکش گرم" },
      { type: "home", pic: "🥤 💧", text: "آب در هوا پنهان است!",
        need: ["یک لیوان", "آب خیلی سرد یا چند تکه یخ"],
        steps: [
          "لیوان را از بیرون خشک کنید.",
          "در لیوان آب یخ بریزید و چند دقیقه صبر کنید.",
          "به بیرون لیوان دست بکشید: خیس شده؟ این آب از هوای اتاق آمده!",
          "در هوای شرجی، مثل بندرعباس، هوا آب خیلی بیشتری دارد. اگر سفر رفتید، دوباره امتحان کنید."
        ],
        ask: "قطره‌ها روی کدام طرف لیوان پیدا شدند: بیرون یا داخل؟" }
    ]
  },
  {
    id: "science-sapling-53", subject: "science", level: "sapling", emoji: "⛈️", title: "وقتی هوا سخت می‌شود",
    steps: [
      { type: "scene", prompt: "وقتی هوا سخت می‌شود، چطور در امان بمانیم؟", bg: "#f6efdc",
        /* Calm and practical. A family watches the forecast: a hail cloud on the map on the TV, so they get ready.
           Hail falls on a house with its lights on: the family is safe under the roof. A dust storm blows in from
           the left; behind a row of trees (a windbreak) the air stays clear. A river rises; a mother and child walk
           away from it, up to high ground. Drawings: js/art/rig-science.js. */
        parts: {
          room: { art: "sci-room" }, tv: { art: "sci-tv", at: [122, 56], s: 1.4 },
          mom: { art: "👩", at: [60, 86] }, kid: { art: "👧", at: [80, 86], s: 1.2 },
          sky: { art: "sci-grey-sky", o: 0 }, ground: { art: "sci-ground", o: 0 }, house: { art: "sci-house", at: [80, 80], s: 2, o: 0 },
          hail: { art: "sci-hail", o: 0 },
          meadow: { art: "sci-meadow", o: 0 }, t1: { art: "sci-tree", at: [80, 84], s: 0.4, o: 0 }, t2: { art: "sci-tree", at: [92, 86], s: 0.42, o: 0 }, t3: { art: "sci-tree", at: [104, 84], s: 0.4, o: 0 },
          dust: { art: "sci-dust", at: [-80, 0], o: 0 }, wind: { art: "sci-wind", at: [8, 40], s: 1.4, o: 0 },
          flood: { art: "sci-floodplain", o: 0 }, high: { art: "sci-highground", o: 0 },
          mom2: { art: "👩", at: [120, 57.4], o: 0 }, kid2: { art: "👧", at: [111, 61], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "پیش‌بینی هوا گفت فردا تگرگ می‌آید. حالا می‌دانیم و آماده‌ایم.", key: 3000, hold: 6000, do: [
            { id: "tv.map", to: { o: 1 }, dur: 1 }, { id: "tv.cloud", to: { o: 1 }, at: 800, dur: 500 },
            { id: "kid", to: { r: -6 }, at: 1600, dur: 600, yoyo: true }
          ] },
          { caption: "تگرگ دانه‌های یخ است که از ابر می‌بارد. زیر سقف می‌مانیم تا تمام شود؛ سقف از ما محافظت می‌کند.", key: 3600, hold: 7000, do: [
            { id: "sky", to: { o: 1 }, dur: 800 }, { id: "ground", to: { o: 1 }, dur: 800 }, { id: "house", to: { o: 1 }, dur: 800 },
            { id: "house.light", to: { o: 1 }, at: 800, dur: 400 },
            { id: "hail", to: { o: 1 }, at: 1200, dur: 400 }, { id: "hail", to: { y: "+12" }, at: 1200, dur: 500, ease: "linear", times: 10 }
          ] },
          { caption: "در طوفان گرد و خاک، پنجره‌ها را می‌بندیم و در خانه می‌مانیم. ردیف درخت‌ها جلوی باد و خاک را می‌گیرند.", key: 4400, hold: 7400, do: [
            { id: "meadow", to: { o: 1 }, dur: 800 }, { id: "hail", to: { o: 0 }, dur: 400 },
            { id: "t1", to: { o: 1 }, at: 400, dur: 400 }, { id: "t2", to: { o: 1 }, at: 400, dur: 400 }, { id: "t3", to: { o: 1 }, at: 400, dur: 400 },
            { id: "dust", to: { o: 1 }, at: 900, dur: 300 }, { id: "dust", to: { x: 0 }, at: 900, dur: 3000, ease: "out" },
            { id: "wind", to: { o: 1 }, at: 1200, dur: 100 }, { id: "wind", draw: true, at: 1200, dur: 1200 },
            { id: "t1", to: { r: 5 }, at: 3000, dur: 500, yoyo: true, times: 2 }, { id: "t2", to: { r: 5 }, at: 3100, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "اگر آب رود بالا آمد، از رود دور می‌شویم و به جای بلند می‌رویم. بزرگ‌ترها راه را بلدند.", key: 5000, hold: 7600, do: [
            { id: "flood", to: { o: 1 }, dur: 800 }, { id: "high", to: { o: 1 }, dur: 800 }, { id: "dust", to: { o: 0 }, dur: 600 }, { id: "wind", to: { o: 0 }, dur: 400 },
            { id: "flood.flood", to: { sy: 0.2 }, dur: 1 }, { id: "flood.flood", to: { o: 1 }, at: 400, dur: 400 }, { id: "flood.flood", to: { sy: 0.7 }, at: 800, dur: 4000 },
            { id: "mom2", to: { o: 1 }, at: 600, dur: 300 }, { id: "kid2", to: { o: 1 }, at: 600, dur: 300 },
            { id: "mom2", walk: [150, 44.6], at: 1200, dur: 3400 }, { id: "kid2", walk: [140, 49], at: 1200, dur: 3400 }
          ] }
        ],
        question: "وقتی تگرگ می‌بارد، کجا بمانیم؟",
        options: ["زیر سقف، در خانه", "وسط حیاط", "زیر درخت تنها"], answer: "زیر سقف، در خانه" },
      { type: "choose", prompt: "در طوفان گرد و خاک چه کنیم؟", say: "طوفان گرد و خاک آمده. چه کار کنیم؟",
        options: ["پنجره‌ها را ببندیم و در خانه بمانیم", "بیرون برویم و بازی کنیم"], answer: "پنجره‌ها را ببندیم و در خانه بمانیم" },
      { type: "choose", prompt: "اگر آب رود بالا آمد، کجا برویم؟", say: "باران زیادی آمده و آب رود بالا آمده. کجا برویم؟",
        options: ["دور از رود، به جای بلند", "کنار رود، برای تماشا"], answer: "دور از رود، به جای بلند" },
      { type: "choose", prompt: "از کجا بدانیم فردا هوا سخت می‌شود؟", say: "از کجا بفهمیم فردا هوا طوفانی یا تگرگی است؟",
        options: ["از پیش‌بینی هوا", "هیچ راهی نیست"], answer: "از پیش‌بینی هوا" },
      { type: "home", pic: "📻 🎒", text: "برنامه هوای سخت خانواده ما",
        need: ["کاغذ و مداد", "یک بزرگ‌تر"],
        steps: [
          "با هم پیش‌بینی هوای فردا را از تلویزیون، رادیو یا گوشی ببینید.",
          "با هم فکر کنید: اگر تگرگ بیاید چه کنیم؟ اگر طوفان گرد و خاک بیاید؟",
          "روی کاغذ سه کار ساده بنویسید یا بکشید، مثل: زیر سقف بمانیم، پنجره‌ها را ببندیم، از رود دور شویم.",
          "کاغذ را جایی بچسبانید که همه ببینند."
        ],
        ask: "فردا هوا چطور است؟" }
    ]
  },
  {
    id: "science-sapling-46", subject: "science", level: "sapling", emoji: "💡", title: "اگر تمام شود…",
    steps: [
      { type: "scene", prompt: "آب، گاز، نفت و برق از کجا می‌آیند؟", bg: "#cdeaf7",
        /* Things we use that come from the Earth and can run out. The ground cut away: oil and gas deep under it,
           an oil pump nodding on top. In a room, a yellow gas pipe brings gas to the heater, which glows. Power
           lines go from a power station to a house, whose windows light up. Last, saving: a child switches off the
           lamp when leaving the room and turns off the running tap. Drawings: js/art/rig-science.js and
           js/art/rig-health.js. */
        parts: {
          under: { art: "sci-underground" }, pump: { art: "sci-derrick", at: [58, 30], s: 1.1 },
          room: { art: "sci-room", o: 0 }, pipe: { art: "sci-gaspipe", o: 0 }, heater: { art: "h-heater", at: [50, 74], s: 1.3, o: 0 },
          meadow: { art: "sci-meadow", o: 0 }, plant: { art: "sci-factory", at: [28, 72], s: 1.1, o: 0 }, line: { art: "sci-powerline", o: 0 },
          house: { art: "sci-house", at: [130, 80], s: 1.4, o: 0 },
          room2: { art: "sci-room", o: 0 }, glow: { art: "sci-lampglow", at: [80, 26], o: 0 }, lamp: { art: "h-lamp", at: [80, 0], s: 1.4, o: 0 },
          sw: { art: "sci-switch", at: [56, 50], s: 1.4, o: 0 },
          tap: { art: "h-tap", at: [130, 44], s: 1, o: 0 },
          kid: { art: "👧", at: [70, 86], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "نفت و گاز در اعماق زمین‌اند. میلیون‌ها سال طول کشیده تا درست شوند. اگر تمام شوند، به این زودی دوباره درست نمی‌شوند.", key: 3800, hold: 7400, do: [
            { id: "pump.beam", to: { r: 14 }, dur: 900, yoyo: true, times: 5 }
          ] },
          { caption: "گاز از لوله‌ها به خانه‌ها می‌رسد. با آن خانه را گرم می‌کنیم و غذا می‌پزیم.", key: 3000, hold: 6400, do: [
            { id: "room", to: { o: 1 }, dur: 800 }, { id: "pipe", to: { o: 1 }, at: 500, dur: 300 }, { id: "pipe", draw: true, at: 500, dur: 1400 },
            { id: "heater", to: { o: 1 }, at: 600, dur: 500 }, { id: "heater.glow", to: { sy: 1.2 }, at: 1900, dur: 400, yoyo: true, times: 4 }
          ] },
          { caption: "برق را در نیروگاه درست می‌کنند و با سیم به خانه‌ها می‌آورند. خیلی از نیروگاه‌ها برای ساختن برق، گاز یا نفت می‌سوزانند.", key: 3800, hold: 7400, do: [
            { id: "meadow", to: { o: 1 }, dur: 800 }, { id: "plant", to: { o: 1 }, at: 400, dur: 500 }, { id: "house", to: { o: 1 }, at: 400, dur: 500 },
            { id: "line", to: { o: 1 }, at: 900, dur: 100 }, { id: "line", draw: true, at: 900, dur: 1800 },
            { id: "house.light", to: { o: 1 }, at: 2800, dur: 400 }
          ] },
          { caption: "پس صرفه‌جویی می‌کنیم: از اتاق که بیرون می‌رویم، چراغ را خاموش می‌کنیم. شیر آب را هم وقتی کارمان تمام شد، می‌بندیم.", key: 5200, hold: 8000, do: [
            { id: "room2", to: { o: 1 }, dur: 800 }, { id: "lamp", to: { o: 1 }, at: 300, dur: 300 }, { id: "glow", to: { o: 1 }, at: 300, dur: 300 },
            { id: "sw", to: { o: 1 }, at: 300, dur: 300 }, { id: "tap", to: { o: 1 }, at: 300, dur: 300 }, { id: "tap.flow", to: { o: 1 }, at: 400, dur: 300 },
            { id: "kid", to: { o: 1 }, at: 600, dur: 300 }, { id: "kid", walk: [60, 86], at: 900, dur: 900 },
            { id: "kid.armF", to: { r: -150 }, at: 1900, dur: 400 }, { id: "sw.toggle", to: { sy: -1 }, at: 2300, dur: 200 }, { id: "glow", to: { o: 0 }, at: 2400, dur: 200 },
            { id: "kid.armF", to: { r: 0 }, at: 2600, dur: 300 },
            { id: "kid", walk: [122, 86], at: 3000, dur: 1600 }, { id: "kid.armF", to: { r: -120 }, at: 4600, dur: 400 }, { id: "tap.flow", to: { o: 0 }, at: 5000, dur: 200 }
          ] }
        ],
        question: "چرا وقتی از اتاق بیرون می‌رویم، چراغ را خاموش می‌کنیم؟",
        options: ["تا برق و گاز و نفت زود تمام نشود", "چون چراغ خسته می‌شود"], answer: "تا برق و گاز و نفت زود تمام نشود" },
      { type: "sort", prompt: "صرفه‌جویی است یا هدر دادن؟", say: "کدام کار صرفه‌جویی است و کدام هدر دادن؟",
        baskets: [{ label: "صرفه‌جویی", pic: "👍", value: "save" }, { label: "هدر دادن", pic: "💸", value: "waste" }],
        items: [
          { pic: "💡", say: "خاموش کردن چراغ اتاق خالی", basket: "save" },
          { pic: "🚰", say: "بستن شیر وقت مسواک زدن", basket: "save" },
          { pic: "🧥", say: "پوشیدن ژاکت به جای زیاد کردن بخاری", basket: "save" },
          { pic: "📺", say: "روشن ماندن تلویزیون وقتی کسی نگاه نمی‌کند", basket: "waste" },
          { pic: "🪟", say: "باز گذاشتن پنجره وقتی بخاری روشن است", basket: "waste" },
          { pic: "🚿", say: "دوش خیلی طولانی", basket: "waste" }
        ] },
      { type: "choose", prompt: "گاز و نفت از کجا می‌آیند؟", say: "گاز و نفت از کجا می‌آیند؟",
        options: ["از اعماق زمین", "از ابرها"], answer: "از اعماق زمین" },
      { type: "choose", prompt: "اگر نفت و گاز تمام شود، زود دوباره درست می‌شود؟", say: "اگر نفت و گاز تمام شود، زود دوباره درست می‌شود؟",
        options: ["نه، میلیون‌ها سال طول می‌کشد", "بله، فردا"], answer: "نه، میلیون‌ها سال طول می‌کشد" },
      { type: "home", pic: "🔦 🏠", text: "نگهبان انرژی خانه شو!",
        need: ["کاغذ و مداد", "یک روز در خانه"],
        steps: [
          "یک جدول بکشید: چراغ روشن در اتاق خالی، شیر آب باز، تلویزیون روشن بدون تماشاچی.",
          "یک روز، هر بار یکی را دیدید، یک خط در ستونش بکشید و آن را خاموش یا بسته کنید (اگر لازم بود، بزرگ‌تر کمک کند).",
          "به پریز و سیم برق دست نزنید؛ فقط کلید چراغ را بزنید.",
          "شب بشمارید: چند بار انرژی را نجات دادید؟"
        ],
        ask: "کدام بیشتر روشن مانده بود؟" }
    ]
  },
  {
    id: "science-sapling-47", subject: "science", level: "sapling", emoji: "🎉", title: "بعد از جشن",
    steps: [
      { type: "scene", prompt: "زباله‌های جشن را چه کنیم؟", bg: "#f6efdc",
        /* After a birthday party: the table is covered with plastic cups, paper plates, a glass bottle and peels.
           Reduce: next time a washable cup instead of a throwaway one (a red cross over the plastic cup, a cup of
           tea in its place). Reuse: a bottle becomes a flower pot. Recycle: paper and plastic go into their bins.
           Compost: the peels go on a heap in the garden and slowly turn into soil that feeds a plant. Drawings:
           js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, b1: { art: "sci-balloon", at: [20, 40], s: 1.4 }, b2: { art: "sci-balloon", at: [140, 36], s: 1.3, r: 8 },
          cake: { art: "🎂", at: [80, 62], s: 1.1 },
          cup1: { art: "🥤", at: [44, 64], s: 0.8 }, cup2: { art: "🥤", at: [56, 65], s: 0.8 }, plate: { art: "🍽️", at: [106, 66], s: 0.9 },
          gbottle: { art: "sci-glassbottle", at: [124, 70], s: 0.8 }, peel: { art: "🍌", at: [136, 66], s: 0.7 },
          no: { art: "sci-no", at: [50, 60], s: 1.6, o: 0 }, mug: { art: "☕", at: [50, 64], s: 0.8, o: 0 },
          pot: { art: "🪴", at: [124, 58], s: 1, o: 0 },
          binP: { art: "sci-bin-paper", at: [40, 90], s: 1, o: 0 }, binL: { art: "sci-bin-plastic", at: [66, 90], s: 1, o: 0 },
          meadow: { art: "sci-meadow", o: 0 }, heap: { art: "sci-compost", at: [60, 84], s: 1.6, o: 0 }, flower: { art: "🌻", at: [96, 80], s: 0.3, o: 0 },
          peel2: { art: "🍌", at: [140, 30], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "جشن تولد تمام شد. روی میز پر از لیوان پلاستیکی، بشقاب کاغذی، بطری و پوست میوه است!", key: 2600, hold: 6000, do: [
            { id: "b1", to: { r: -8 }, dur: 1200, yoyo: true, times: 2 }, { id: "b2", to: { r: 0 }, dur: 1400, yoyo: true, times: 2 }
          ] },
          { caption: "کم کنیم: دفعه بعد به جای لیوان یک‌بار مصرف، لیوان شستنی می‌گذاریم. دوباره استفاده کنیم: بطری شیشه‌ای گلدان شد!", key: 4400, hold: 7400, do: [
            { id: "no", to: { o: 1 }, at: 400, dur: 300 }, { id: "cup1", to: { o: 0 }, at: 1400, dur: 400 }, { id: "cup2", to: { o: 0 }, at: 1400, dur: 400 }, { id: "no", to: { o: 0 }, at: 1600, dur: 300 },
            { id: "mug", to: { o: 1 }, at: 1800, dur: 400 },
            { id: "pot", to: { o: 1 }, at: 2800, dur: 600 }, { id: "gbottle", to: { o: 0 }, at: 2800, dur: 600 }
          ] },
          { caption: "بازیافت: بشقاب کاغذی در سطل کاغذ و لیوان پلاستیکی در سطل پلاستیک. از آن‌ها چیزهای تازه می‌سازند.", key: 3800, hold: 6800, do: [
            { id: "binP", to: { o: 1 }, dur: 400 }, { id: "binL", to: { o: 1 }, dur: 400 },
            { id: "plate", path: "M106 66Q70 40 40 70", at: 600, dur: 1400 }, { id: "plate", to: { o: 0 }, at: 2000, dur: 200 },
            { id: "cup1", to: { x: 100, y: 60 }, at: 1800, dur: 1 }, { id: "cup1", to: { o: 1 }, at: 1900, dur: 200 },
            { id: "cup1", path: "M100 60Q84 40 66 70", at: 2100, dur: 1400 }, { id: "cup1", to: { o: 0 }, at: 3500, dur: 200 }
          ] },
          { caption: "پوست میوه را در گوشه باغچه روی تپه کود می‌ریزیم. کم‌کم خاک خوب می‌شود و به گیاه‌ها غذا می‌دهد.", key: 5600, hold: 8000, do: [
            { id: "meadow", to: { o: 1 }, dur: 800 }, { id: "heap", to: { o: 1 }, at: 400, dur: 400 }, { id: "heap.peels", to: { o: 0 }, dur: 1 },
            { id: "peel2", to: { o: 1 }, at: 600, dur: 200 }, { id: "peel2", path: "M140 30Q100 20 60 70", at: 700, dur: 1400, ease: "in" }, { id: "peel2", to: { o: 0 }, at: 2100, dur: 200 },
            { id: "heap.peels", to: { o: 1 }, at: 2100, dur: 200 }, { id: "heap.peels", to: { o: 0 }, at: 2800, dur: 2000 },
            { id: "flower", to: { o: 1 }, at: 3400, dur: 300 }, { id: "flower", to: { s: 1.3 }, at: 3400, dur: 2600 }
          ] }
        ],
        question: "پوست میوه را چه کنیم؟",
        options: ["روی تپه کود بریزیم تا خاک شود", "در سطل شیشه بیندازیم", "در رود بیندازیم"], answer: "روی تپه کود بریزیم تا خاک شود" },
      { type: "sort", prompt: "هر کدام کجا برود؟", say: "زباله‌های جشن را جدا کن. هر کدام کجا می‌رود؟",
        baskets: [{ label: "کاغذ", pic: "📄", value: "paper" }, { label: "پلاستیک", pic: "🥤", value: "plastic" }, { label: "کود", pic: "🍌", value: "food" }],
        items: [
          { pic: "🍽️", say: "بشقاب کاغذی", basket: "paper" },
          { pic: "🎁", say: "کاغذ کادو", basket: "paper" },
          { pic: "🥤", say: "لیوان پلاستیکی", basket: "plastic" },
          { pic: "🧃", say: "پاکت آبمیوه", basket: "plastic" },
          { pic: "🍌", say: "پوست موز", basket: "food" },
          { pic: "🍊", say: "پوست پرتقال", basket: "food" }
        ] },
      { type: "sort", prompt: "کم کنیم، دوباره استفاده کنیم یا بازیافت؟", say: "هر کار کدام است: کم کردن، دوباره استفاده کردن یا بازیافت؟",
        baskets: [{ label: "کم کردن", pic: "➖", value: "reduce" }, { label: "دوباره استفاده", pic: "🔁", value: "reuse" }, { label: "بازیافت", pic: "♻️", value: "recycle" }],
        items: [
          { label: "لیوان شستنی به جای یک‌بار مصرف", say: "لیوان شستنی به جای یک‌بار مصرف", basket: "reduce" },
          { label: "کیسه پارچه‌ای برای خرید", say: "کیسه پارچه‌ای برای خرید", basket: "reduce" },
          { label: "شیشه مربا برای مداد", say: "شیشه مربا برای مداد", basket: "reuse" },
          { label: "بطری برای گلدان", say: "بطری برای گلدان", basket: "reuse" },
          { label: "روزنامه در سطل کاغذ", say: "روزنامه در سطل کاغذ", basket: "recycle" }
        ] },
      { type: "choose", prompt: "چرا لیوان شستنی بهتر است؟", say: "چرا برای جشن لیوان شستنی بهتر از لیوان یک‌بار مصرف است؟",
        options: ["چون زباله کمتری درست می‌کند", "چون زودتر خراب می‌شود"], answer: "چون زباله کمتری درست می‌کند" },
      { type: "home", pic: "🧺 ♻️", text: "یک هفته زباله کمتر!",
        need: ["چند جعبه یا کیسه برای جدا کردن", "کاغذ و مداد برای برچسب"],
        steps: [
          "روی جعبه‌ها بنویسید یا بکشید: کاغذ، پلاستیک، شیشه، پسماند غذا.",
          "یک هفته زباله‌های خانه را با هم جدا کنید. شیشه شکسته را بزرگ‌ترها بردارند.",
          "یک چیز را دوباره استفاده کنید، مثلاً یک قوطی را جای مداد کنید.",
          "اگر باغچه یا گلدان دارید، پوست میوه را کمی خاک کنید و ببینید چند هفته بعد چه می‌شود."
        ],
        ask: "کدام جعبه زودتر پر شد؟" }
    ]
  },
  {
    id: "science-sapling-48", subject: "science", level: "sapling", emoji: "🌉", title: "جست‌وجو کنیم و بسازیم",
    steps: [
      { type: "scene", prompt: "یک پل کاغذی بسازیم که سکه‌ها را نگه دارد", bg: "#f6efdc",
        /* The design steps with a paper bridge between two piles of books. What it must do: span the gap and hold
           coins. Sketch: two ideas drawn on paper. Build and test the flat sheet: two coins and it sags and drops
           them. Improve: the sheet folded like a fan holds a whole stack of coins. Drawings: js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, bk1: { art: "sci-books", at: [44, 74], s: 1 }, bk2: { art: "sci-books", at: [116, 74], s: 1 },
          sketch: { art: "sci-sketchpage", at: [80, 30], s: 1.4, o: 0 },
          flat: { art: "sci-paperflat", o: 0 }, sag: { art: "sci-papersag", o: 0 }, fold: { art: "sci-paperfold", o: 0 },
          c1: { art: "sci-coin", at: [80, 40], s: 1.4, o: 0 }, c2: { art: "sci-coin", at: [80, 40], s: 1.4, o: 0 },
          d1: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 }, d2: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 }, d3: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 },
          d4: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 }, d5: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 }, d6: { art: "sci-coin", at: [80, 30], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "مسئله: یک پل کاغذی می‌خواهیم که از این کتاب‌ها تا آن کتاب‌ها برسد و سکه‌ها را نگه دارد.", key: 2600, hold: 6000, do: [
            { id: "bk1", to: { y: 73 }, at: 600, dur: 300, yoyo: true }, { id: "bk2", to: { y: 73 }, at: 1100, dur: 300, yoyo: true }
          ] },
          { caption: "اول فکر می‌کنیم و چند راه را روی کاغذ می‌کشیم: یک کاغذ صاف، یا کاغذی که مثل بادبزن تا شده.", key: 3600, hold: 6400, do: [
            { id: "sketch", to: { o: 1 }, dur: 500 }, { id: "sketch.lines", draw: true, at: 500, dur: 2800 }
          ] },
          { caption: "می‌سازیم و امتحان می‌کنیم: کاغذ صاف را گذاشتیم. با دو سکه خم شد و سکه‌ها افتادند!", key: 3800, hold: 6800, do: [
            { id: "sketch", to: { o: 0 }, dur: 500 }, { id: "flat", to: { o: 1 }, at: 300, dur: 400 },
            { id: "c1", to: { o: 1 }, at: 900, dur: 200 }, { id: "c1", to: { y: 57.4 }, at: 900, dur: 500, ease: "in" },
            { id: "c2", to: { o: 1 }, at: 1700, dur: 200 }, { id: "c2", to: { y: 56.2 }, at: 1700, dur: 500, ease: "in" },
            { id: "flat", to: { o: 0 }, at: 2300, dur: 100 }, { id: "sag", to: { o: 1 }, at: 2300, dur: 100 },
            { id: "c1", to: { y: 69 }, at: 2300, dur: 300 }, { id: "c2", to: { y: 67.8 }, at: 2300, dur: 300 },
            { id: "c1", to: { y: 74, x: 76 }, at: 3000, dur: 400, ease: "in" }, { id: "c2", to: { y: 74, x: 85 }, at: 3100, dur: 400, ease: "in" }
          ] },
          { caption: "بهتر می‌کنیم: کاغذ را مثل بادبزن تا زدیم. حالا شش سکه را هم نگه می‌دارد!", key: 5400, hold: 7600, do: [
            { id: "sag", to: { o: 0 }, dur: 300 }, { id: "c1", to: { o: 0 }, dur: 300 }, { id: "c2", to: { o: 0 }, dur: 300 }, { id: "fold", to: { o: 1 }, at: 400, dur: 500 },
            { id: "d1", to: { o: 1 }, at: 1100, dur: 100 }, { id: "d1", to: { y: 54 }, at: 1100, dur: 400, ease: "in" },
            { id: "d2", to: { o: 1 }, at: 1700, dur: 100 }, { id: "d2", to: { y: 52.6 }, at: 1700, dur: 400, ease: "in" },
            { id: "d3", to: { o: 1 }, at: 2300, dur: 100 }, { id: "d3", to: { y: 51.2 }, at: 2300, dur: 400, ease: "in" },
            { id: "d4", to: { o: 1 }, at: 2900, dur: 100 }, { id: "d4", to: { y: 49.8 }, at: 2900, dur: 400, ease: "in" },
            { id: "d5", to: { o: 1 }, at: 3500, dur: 100 }, { id: "d5", to: { y: 48.4 }, at: 3500, dur: 400, ease: "in" },
            { id: "d6", to: { o: 1 }, at: 4100, dur: 100 }, { id: "d6", to: { y: 47 }, at: 4100, dur: 400, ease: "in" }
          ] }
        ],
        question: "وقتی پل اول خم شد، چه کردیم؟",
        options: ["فکر کردیم و آن را بهتر ساختیم", "دست کشیدیم و رفتیم", "سکه‌ها را دور انداختیم"], answer: "فکر کردیم و آن را بهتر ساختیم" },
      { type: "order", prompt: "مراحل ساختن را بچین", say: "سازنده‌ها اول می‌پرسند چه می‌خواهیم، بعد طرح می‌کشند، بعد می‌سازند، امتحان می‌کنند و بهترش می‌کنند. به ترتیب بچین.", numbered: true,
        items: [{ pic: "❓", label: "چه می‌خواهیم؟", say: "می‌پرسیم پل باید چه کار کند" }, { pic: "✏️", label: "طرح می‌کشیم", say: "طرح می‌کشیم" }, { pic: "✂️", label: "می‌سازیم", say: "می‌سازیم" },
          { pic: "🪙", label: "امتحان می‌کنیم", say: "با سکه امتحان می‌کنیم" }, { pic: "🔁", label: "بهتر می‌کنیم", say: "بهترش می‌کنیم" }] },
      { type: "choose", prompt: "برای اینکه امتحان منصفانه باشد…", say: "دو پل را می‌خواهیم مقایسه کنیم. چه چیزی باید یکسان باشد؟",
        options: ["یک جور کاغذ و یک فاصله بین کتاب‌ها", "یکی با کاغذ کلفت، یکی با نازک"], answer: "یک جور کاغذ و یک فاصله بین کتاب‌ها" },
      { type: "choose", prompt: "کدام پل محکم‌تر بود؟", say: "کدام پل سکه‌های بیشتری را نگه داشت؟",
        options: ["کاغذ تاشده مثل بادبزن", "کاغذ صاف"], answer: "کاغذ تاشده مثل بادبزن" },
      { type: "home", pic: "📄 🪙", text: "مسابقه پل کاغذی!",
        need: ["چند برگ کاغذ هم‌اندازه", "دو دسته کتاب هم‌قد", "سکه یا پاک‌کن هم‌وزن", "نوار چسب (اگر لازم شد)"],
        steps: [
          "دو دسته کتاب را با یک فاصله یکسان بگذارید.",
          "یک کاغذ صاف رویشان بگذارید و یکی یکی سکه بگذارید. چند سکه نگه داشت؟",
          "حالا با کاغذ دیگری طرح تازه‌ای بسازید: تا بزنید، لوله کنید یا لبه‌هایش را بالا بیاورید.",
          "دوباره امتحان کنید و بشمارید. کدام طرح برنده شد؟ چرا؟"
        ],
        ask: "بهترین پل تو چند سکه نگه داشت؟" }
    ]
  },
  {
    id: "science-sapling-49", subject: "science", level: "sapling", emoji: "🧊", title: "دو راه حل",
    steps: [
      { type: "scene", prompt: "یخ را چطور دیرتر آب کنیم؟", bg: "#f6efdc",
        /* Two designs to keep an ice cube from melting, side by side on a table. Two equal ice cubes: one is wrapped
           in a woolly sock, the other goes in an open foil cup. A clock's hand goes round (time passes). Then the
           sock is taken off: its ice is still big; in the foil cup only a small piece is left in a puddle. Drawings:
           js/art/rig-science.js. */
        parts: {
          table: { art: "sci-table" }, p1: { art: "sci-plate", at: [48, 72], s: 1.2 }, p2: { art: "sci-plate", at: [112, 72], s: 1.2 },
          ice1: { art: "sci-ice", at: [48, 68.4], s: 1 }, ice2: { art: "sci-ice", at: [112, 68.4], s: 1 },
          puddle: { art: "sci-puddle", at: [112, 68.6], s: 0.8, o: 0 },
          cup: { art: "sci-foilcup", at: [112, 68.4], s: 1.4, o: 0 }, wool: { art: "sci-woolwrap", at: [48, 68.4], s: 1.2, o: 0 },
          clock: { art: "sci-clock", at: [80, 26], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "دو تکه یخ هم‌اندازه داریم. می‌خواهیم یکی از آن‌ها دیرتر آب شود. دو راه را امتحان می‌کنیم.", key: 2600, hold: 6000, do: [
            { id: "ice1", to: { y: 68 }, at: 600, dur: 300, yoyo: true }, { id: "ice2", to: { y: 68 }, at: 1100, dur: 300, yoyo: true }
          ] },
          { caption: "راه اول: یخ را در جوراب پشمی پیچیدیم. راه دوم: یخ را در لیوان فلزی گذاشتیم. بقیه چیزها یکسان است.", key: 3000, hold: 6400, do: [
            { id: "wool", to: { o: 1 }, at: 600, dur: 600 }, { id: "cup", to: { o: 1 }, at: 1600, dur: 600 }
          ] },
          { caption: "نیم ساعت صبر کردیم.", key: 3000, hold: 4800, do: [
            { id: "clock", to: { o: 1 }, dur: 400 }, { id: "clock.hand", to: { r: 180 }, at: 400, dur: 3000, ease: "linear" },
            { id: "ice2", to: { sx: 0.4, sy: 0.35 }, at: 400, dur: 3200 }, { id: "puddle", to: { o: 1 }, at: 1200, dur: 2000 }, { id: "ice1", to: { sx: 0.85, sy: 0.85 }, at: 400, dur: 3200 }
          ] },
          { caption: "جوراب را برداشتیم: یخش هنوز بزرگ است! در لیوان فلزی فقط یک تکه کوچک ماند. پشم نمی‌گذارد گرمای اتاق زود به یخ برسد.", key: 3600, hold: 7600, do: [
            { id: "clock", to: { o: 0 }, dur: 400 }, { id: "wool", to: { o: 0, y: 50 }, at: 400, dur: 1200 }, { id: "cup", to: { o: 0.35 }, at: 600, dur: 900 }
          ] }
        ],
        question: "کدام یخ دیرتر آب شد؟",
        options: ["یخِ داخل جوراب پشمی", "یخِ داخل لیوان فلزی"], answer: "یخِ داخل جوراب پشمی" },
      { type: "chart", bars: true, title: "یخ چند دقیقه طول کشید تا کامل آب شود؟", say: "زمان را اندازه گرفتیم: هر یخ چند دقیقه طول کشید تا کامل آب شود؟ ستون بلندتر یعنی دیرتر آب شد.",
        rows: [{ label: "جوراب پشمی", pic: "🧦", n: 9 }, { label: "لیوان فلزی", pic: "🥫", n: 4 }, { label: "بشقاب خالی", pic: "🍽️", n: 5 }],
        question: "کدام راه بهتر بود؟", options: [{ label: "جوراب پشمی", value: "🧦" }, { label: "لیوان فلزی", value: "🥫" }, { label: "بشقاب خالی", value: "🍽️" }], answer: "🧦" },
      { type: "choose", prompt: "برای امتحان منصفانه چه باید یکسان باشد؟", say: "برای اینکه مقایسه منصفانه باشد، چه چیزی باید یکسان باشد؟",
        options: ["اندازه یخ‌ها و جای گذاشتنشان", "رنگ جوراب"], answer: "اندازه یخ‌ها و جای گذاشتنشان" },
      { type: "choose", prompt: "چرا پشم بهتر بود؟", say: "چرا یخِ داخل پشم دیرتر آب شد؟",
        options: ["چون پشم گرما را دیر رد می‌کند", "چون پشم سرد است"], answer: "چون پشم گرما را دیر رد می‌کند" },
      { type: "home", pic: "🧊 ⏱️", text: "مسابقه یخ: کدام راه بهتر است؟",
        need: ["سه تکه یخ هم‌اندازه", "سه بشقاب", "یک جوراب پشمی و یک دستمال", "ساعت"],
        steps: [
          "یک یخ را در جوراب، یکی را در دستمال، و یکی را بدون پوشش روی بشقاب بگذارید.",
          "هر سه را کنار هم در یک اتاق بگذارید.",
          "هر ده دقیقه نگاه کنید و بنویسید کدام هنوز یخ دارد.",
          "یک نمودار ستونی بکشید: هر کدام چند دقیقه طول کشید تا آب شود؟"
        ],
        ask: "کدام راه یخ را بیشتر نگه داشت؟ چرا؟" }
    ]
  },
  {
    id: "science-sapling-50", subject: "science", level: "sapling", emoji: "🍞", title: "از گذشته تا آینده: نان",
    steps: [
      { type: "scene", prompt: "نان از گذشته تا امروز چطور درست شده؟", bg: "#cdeaf7",
        /* How bread was made, then and now. A wheat field; a farmer walks through it with a sickle and the stalks
           fall. The old windmills of Nashtifan in Khorasan: the wind turns their wooden blades inside mud walls and
           the millstone grinds the grain into flour. A water mill: the stream turns its wheel. Today: a bakery's
           machine kneads the dough and sangak bakes in the tanoor. Drawings: js/art/rig-science.js. */
        parts: {
          meadow: { art: "sci-meadow" },
          s1: { art: "sci-stalk", at: [60, 84], s: 1.6 }, s2: { art: "sci-stalk", at: [72, 85], s: 1.7 }, s3: { art: "sci-stalk", at: [84, 84], s: 1.6 },
          s4: { art: "sci-stalk", at: [96, 85], s: 1.7 }, s5: { art: "sci-stalk", at: [108, 84], s: 1.6 }, s6: { art: "sci-stalk", at: [120, 85], s: 1.7 },
          farmer: { art: "👨", at: [36, 86] }, sickle: { art: "sci-sickle", at: [46, 72], s: 1.2 },
          wind: { art: "sci-nashtifan", o: 0 }, gust: { art: "sci-wind", at: [4, 40], s: 1.4, o: 0 },
          mill: { art: "sci-watermill", o: 0 },
          bake: { art: "sci-table", o: 0 }, oven: { art: "sci-tanoor", at: [56, 70], s: 1.6, o: 0 }, bread: { art: "sci-sangak", at: [120, 66], s: 1.4, o: 0 },
          baker: { art: "👩", at: [94, 86], o: 0 }
        },
        scenes: [
          { caption: "گندم که رسید، قدیم کشاورزها آن را با داس درو می‌کردند. کار سخت و طولانی بود.", key: 4400, hold: 7000, do: [
            { id: "farmer", walk: [96, 86], at: 400, dur: 4400 }, { id: "sickle", to: { x: 106 }, at: 400, dur: 4400, ease: "linear" },
            { id: "sickle", to: { r: -40 }, at: 400, dur: 400, yoyo: true, times: 10 },
            { id: "s1", to: { r: -80 }, at: 1200, dur: 400 }, { id: "s2", to: { r: -80 }, at: 1900, dur: 400 }, { id: "s3", to: { r: -80 }, at: 2600, dur: 400 },
            { id: "s4", to: { r: -80 }, at: 3300, dur: 400 }, { id: "s5", to: { r: -80 }, at: 4000, dur: 400 }
          ] },
          { caption: "در نشتیفان خراسان، آسیاب‌های بادیِ خیلی قدیمی هست: باد پره‌های چوبی را می‌چرخاند و سنگ آسیا گندم را آرد می‌کند.", key: 3800, hold: 7400, do: [
            { id: "wind", to: { o: 1 }, dur: 800 }, { id: "gust", to: { o: 1 }, at: 800, dur: 100 }, { id: "gust", draw: true, at: 800, dur: 1200 },
            { id: "wind.b1", to: { sx: -1 }, at: 1000, dur: 700, yoyo: true, times: 6 }, { id: "wind.b2", to: { sx: -1 }, at: 1200, dur: 700, yoyo: true, times: 6 },
            { id: "wind.b3", to: { sx: -1 }, at: 1400, dur: 700, yoyo: true, times: 6 }
          ] },
          { caption: "در جاهای دیگر، آسیاب آبی بود: زور آب رود چرخ را می‌چرخاند و گندم آرد می‌شد.", key: 3600, hold: 6400, do: [
            { id: "mill", to: { o: 1 }, dur: 800 }, { id: "gust", to: { o: 0 }, dur: 400 },
            { id: "mill.wheel", to: { r: 360 }, at: 400, dur: 5000, ease: "linear" }
          ] },
          { caption: "امروز در نانوایی، دستگاه خمیر را ورز می‌دهد و نان سنگک در تنور پخته می‌شود. ولی هنوز آرد از همان گندم است!", key: 3600, hold: 7400, do: [
            { id: "bake", to: { o: 1 }, dur: 800 }, { id: "oven", to: { o: 1 }, at: 400, dur: 500 }, { id: "baker", to: { o: 1 }, at: 600, dur: 400 },
            { id: "bread", to: { o: 1 }, at: 1600, dur: 400 }, { id: "bread", path: "M64 60Q90 40 120 66", at: 1600, dur: 1600 },
            { id: "baker.armF", to: { r: -60 }, at: 1400, dur: 500 }, { id: "baker.armF", to: { r: 0 }, at: 3200, dur: 500 }
          ] }
        ],
        question: "آسیاب بادی با چه چیزی می‌چرخد؟",
        options: ["با زور باد", "با زور آب", "با دست"], answer: "با زور باد" },
      { type: "order", prompt: "از گندم تا نان را بچین", say: "اول گندم را درو می‌کنیم، بعد در آسیاب آرد می‌کنیم، بعد خمیر درست می‌کنیم و در تنور می‌پزیم. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌾", label: "درو کردن گندم", say: "درو کردن گندم" }, { label: "آسیاب کردن", say: "آسیاب کردن و آرد شدن" }, { label: "خمیر کردن", say: "درست کردن خمیر" }, { pic: "🍞", label: "پختن نان", say: "پختن نان در تنور" }] },
      { type: "order", prompt: "آسیاب‌ها را از قدیم تا امروز بچین", say: "قدیم با دست و سنگ گندم را آرد می‌کردند، بعد آسیاب بادی و آبی ساختند، و امروز کارخانه آرد هست. به ترتیب بچین.", numbered: true,
        items: [{ pic: "🪨", label: "سنگ دستی", say: "آسیاب دستی سنگی" }, { label: "آسیاب بادی و آبی", say: "آسیاب بادی و آسیاب آبی" }, { pic: "🏭", label: "کارخانه آرد", say: "کارخانه آرد امروز" }] },
      { type: "choose", prompt: "آسیاب‌های بادی قدیمی کجای ایران است؟", say: "آسیاب‌های بادی خیلی قدیمی ایران کجاست؟",
        options: ["نشتیفان در خراسان", "کنار دریای خزر"], answer: "نشتیفان در خراسان" },
      { type: "home", pic: "🌾 🥄", text: "خودت آسیابان شو!",
        need: ["یک مشت گندم یا برنج", "دو قاشق فلزی یا دو سنگ صاف و تمیز", "یک بشقاب", "کمی آرد و آب"],
        steps: [
          "چند دانه گندم را روی بشقاب بریزید و با پشت قاشق یا سنگ صاف فشار دهید و بسایید. چه می‌شود؟",
          "گرد دانه‌ها را کنار آرد خانه بگذارید و مقایسه کنید: کدام نرم‌تر است؟ آسیاب‌ها کار سختی می‌کردند!",
          "کمی آرد و آب را ورز دهید تا خمیر شود و با نوک انگشت رویش جای ریگ‌های سنگک را بزنید. (پختن لازم نیست.)",
          "اگر شد، با یک بزرگ‌تر به نانوایی بروید و از دور ببینید نان چطور پخته می‌شود."
        ],
        ask: "ساییدن دانه‌ها آسان بود یا سخت؟" }
    ]
  },
  {
    id: "science-sapling-54", subject: "science", level: "sapling", emoji: "🏆", title: "بازی بزرگ نهال",
    steps: [
      { type: "order", prompt: "یک آزمایش منصفانه را بچین", say: "دانشمندها اول سؤال می‌پرسند، بعد حدس می‌زنند، بعد آزمایش منصفانه می‌کنند و آخر نتیجه را می‌گویند. به ترتیب بچین.", numbered: true,
        items: [{ pic: "❓", label: "سؤال", say: "یک سؤال می‌پرسیم" }, { pic: "🤔", label: "حدس", say: "حدس می‌زنیم" }, { pic: "🧪", label: "آزمایش منصفانه", say: "آزمایش منصفانه می‌کنیم" }, { pic: "📝", label: "نتیجه", say: "نتیجه را می‌گوییم" }] },
      { type: "sort", prompt: "با تماس یا بدون تماس؟", say: "کدام نیرو با دست زدن کار می‌کند و کدام بدون تماس؟",
        baskets: [{ label: "با تماس", pic: "✋", value: "touch" }, { label: "بدون تماس", pic: "🧲", value: "far" }],
        items: [
          { pic: "⚽", say: "ضربه به توپ", basket: "touch" },
          { pic: "🪢", say: "طناب‌کشی", basket: "touch" },
          { pic: "🍎", say: "افتادن سیب از درخت", basket: "far" },
          { pic: "🧲", say: "آهنربا و میخ", basket: "far" }
        ] },
      { type: "sort", prompt: "از پدر و مادر است یا از محیط؟", say: "کدام ویژگی را از پدر و مادر می‌گیریم و کدام را محیط عوض می‌کند؟",
        baskets: [{ label: "از پدر و مادر", pic: "👪", value: "parents" }, { label: "از محیط", pic: "🌤️", value: "env" }],
        items: [
          { label: "رنگ چشم", say: "رنگ چشم", basket: "parents" },
          { label: "رنگ پشم بچه‌گربه", say: "رنگ پشم بچه‌گربه", basket: "parents" },
          { label: "گیاه کم‌رنگ در سایه", say: "گیاهی که در سایه کم‌رنگ شد", basket: "env" },
          { label: "پوست آفتاب‌سوخته", say: "پوستی که در آفتاب تیره شد", basket: "env" }
        ] },
      { type: "pairs", prompt: "هوا یا آب و هوا؟", say: "هر شهر را به آب و هوای معمولش برسان.",
        pairs: [
          [{ label: "رشت", say: "رشت" }, { pic: "🌧️", say: "پرباران" }],
          [{ label: "یزد", say: "یزد" }, { pic: "🏜️", say: "خشک" }],
          [{ label: "اردبیل", say: "اردبیل" }, { pic: "❄️", say: "پربرف" }],
          [{ label: "بندرعباس", say: "بندرعباس" }, { pic: "🥵", say: "گرم و شرجی" }]
        ] },
      { type: "choose", prompt: "کدام آزمایش منصفانه است؟", say: "می‌خواهیم ببینیم کدام توپ بیشتر می‌پرد. کدام آزمایش منصفانه است؟",
        options: ["هر دو را از یک ارتفاع ول کنیم", "یکی را از بالای میز و یکی را از روی زمین ول کنیم"], answer: "هر دو را از یک ارتفاع ول کنیم" },
      { type: "home", pic: "🏀 📏", text: "آزمایش منصفانه توپ‌ها!",
        need: ["دو یا سه توپ مختلف (پلاستیکی، پارچه‌ای، لاستیکی)", "یک دیوار و یک مداد یا تکه کاغذ چسبی برای علامت"],
        steps: [
          "حدس بزنید کدام توپ بیشتر می‌پرد.",
          "هر توپ را کنار دیوار از یک ارتفاع یکسان (مثلاً قد شانه بزرگ‌تر) ول کنید؛ هل ندهید.",
          "یک نفر جای بالاترین پرش را روی کاغذ چسبی علامت بزند.",
          "هر توپ را سه بار امتحان کنید. کدام برنده شد؟ حدستان درست بود؟"
        ],
        ask: "کدام توپ بیشتر پرید؟ چه چیزی را یکسان نگه داشتیم؟" }
    ]
  }
);
