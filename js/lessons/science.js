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
      { type: "story", prompt: "ببین چه می‌شود",
        cast: { cat: "🐈", milk: "🥛", ball: "⚽", seed: "🌱", flower: "🌻" },
        scenes: [
          { caption: "این بچه‌گربه است.", at: { cat: [72, 64, { size: 0.7 }] } },
          { caption: "بچه‌گربه شیر می‌خورد.", at: { milk: [56, 74, { size: 0.8 }], cat: [70, 64, { size: 0.7, act: "bounce" }] } },
          { caption: "روزها گذشت و بچه‌گربه بزرگ شد.", at: { milk: null, cat: [72, 58, { size: 1.4 }] } },
          { caption: "این توپ است. توپ غذا نمی‌خورد و بزرگ نمی‌شود.", at: { ball: [28, 72] } },
          { caption: "این گیاه آب می‌خورد و بزرگ می‌شود.", at: { seed: [48, 72] } },
          { caption: "گیاه گل داد!", at: { seed: null, flower: [48, 62, { size: 1.4, act: "grow" }] } },
          { caption: "گربه و گل زنده‌اند. توپ زنده نیست.", at: { cat: [72, 58, { size: 1.4, act: "bounce" }], ball: [28, 72, { act: "shake" }] } }
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
      { type: "story", prompt: "حس‌های ما",
        cast: { eye: "👀", rainbow: "🌈", ear: "👂", bird: "🐦", nose: "👃", rose: "🌹", tongue: "👅", melon: "🍉", hand: "✋", sheep: "🐑" },
        scenes: [
          { caption: "با چشم می‌بینیم: رنگین‌کمان!", at: { eye: [68, 50, { size: 1.3 }], rainbow: [32, 45, { size: 1.5, act: "grow" }] } },
          { caption: "با گوش می‌شنویم: آواز گنجشک!", at: { eye: null, rainbow: null, ear: [68, 50, { size: 1.3 }], bird: [32, 45, { size: 1.3, act: "bounce" }] } },
          { caption: "با بینی بو می‌کنیم: گل سرخ!", at: { ear: null, bird: null, nose: [68, 50, { size: 1.3 }], rose: [32, 50, { size: 1.3, act: "grow" }] } },
          { caption: "با زبان مزه می‌کنیم: هندوانه شیرین!", at: { nose: null, rose: null, tongue: [68, 50, { size: 1.3 }], melon: [32, 50, { size: 1.3, act: "bounce" }] } },
          { caption: "با دست لمس می‌کنیم: پشم نرم گوسفند!", at: { tongue: null, melon: null, hand: [68, 50, { size: 1.3 }], sheep: [32, 55, { size: 1.4, act: "shake" }] } },
          { caption: "چشم، گوش، بینی، زبان و پوست به ما کمک می‌کنند دنیا را بشناسیم.",
            at: { hand: [10, 45], sheep: null, eye: [90, 45], ear: [70, 45], nose: [50, 45], tongue: [30, 45] } }
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
      { type: "story", prompt: "ببین دانه چطور سبز می‌شود",
        cast: { girl: "👧", seed: "🌰", water: "💧", sun: "☀️", sprout: "🌱", plant: "🌿", flower: "🌷" },
        scenes: [
          { caption: "لیلا یک دانه در خاک کاشت.", at: { girl: [80, 56, { size: 1.3 }], seed: [48, 76, { size: 0.7 }] } },
          { caption: "به آن آب داد.", at: { water: [48, 50, { act: "bounce" }] } },
          { caption: "خورشید به آن نور داد.", at: { water: null, sun: [14, 18, { act: "grow" }] } },
          { caption: "چند روز گذشت. دانه جوانه زد!", at: { seed: null, sprout: [48, 70, { act: "grow" }] } },
          { caption: "جوانه بزرگ‌تر شد.", at: { sprout: null, plant: [48, 64, { size: 1.3, act: "grow" }] } },
          { caption: "گیاه گل داد!", at: { plant: null, flower: [48, 60, { size: 1.6, act: "grow" }], girl: [80, 56, { size: 1.3, act: "bounce" }] } }
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
      { type: "story", prompt: "گنجشک کجا زندگی می‌کند؟",
        cast: { tree: "🌳", bird: "🐦", egg: "🥚", chick: "🐣", worm: "🐛" },
        scenes: [
          { caption: "گنجشک روی درخت لانه می‌سازد.", at: { tree: [50, 46, { size: 3 }], bird: [80, 20, { act: "bounce" }] } },
          { caption: "در لانه تخم می‌گذارد.", at: { bird: [58, 30, { size: 0.8 }], egg: [46, 34, { size: 0.6 }] } },
          { caption: "جوجه از تخم بیرون آمد!", at: { egg: null, chick: [46, 34, { size: 0.7, act: "bounce" }], bird: [80, 20] } },
          { caption: "مادر برای جوجه غذا می‌آورد.", at: { worm: [12, 80, { size: 0.6 }] } },
          { caption: "جوجه گرسنه بود. نوش جان!", at: { bird: [58, 32, { size: 0.8 }], worm: [52, 34, { size: 0.4 }], chick: [46, 34, { size: 0.7, act: "bounce" }] } }
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

  // ---------------- Science: Sprout (guess, try, see) ----------------
  {
    id: "science-sprout-1", subject: "science", level: "sprout", emoji: "🌻", title: "بخش‌های گیاه",
    steps: [
      { type: "story", prompt: "هر بخش گیاه چه کاری می‌کند؟", tall: true,
        cast: { plant: "🌻", root: "ریشه", stem: "ساقه", leaf: "برگ", flower: "گل", drop: "💧", sun: "☀️", seeds: "تخمه" },
        scenes: [
          { caption: "این گل آفتابگردان است.", at: { plant: [50, 50, { size: 3.2 }] } },
          { caption: "ریشه زیر خاک است. ریشه از خاک آب می‌خورد.", at: { root: [50, 88, { size: 0.6 }], drop: [62, 86, { size: 0.6, act: "bounce" }] } },
          { caption: "ساقه آب را بالا می‌برد.", at: { stem: [28, 66, { size: 0.6 }], drop: [50, 58, { size: 0.6 }] } },
          { caption: "برگ‌ها نور خورشید را می‌گیرند و برای گیاه غذا می‌سازند.", at: { drop: null, leaf: [76, 58, { size: 0.6 }], sun: [12, 12, { act: "grow" }] } },
          { caption: "گل دانه می‌سازد. تخمه آفتابگردان همان دانه این گل است!", at: { flower: [76, 22, { size: 0.6 }], seeds: [28, 26, { size: 0.5, act: "bounce" }] } }
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
      { type: "story", prompt: "یخ چه می‌شود؟",
        cast: { ice: "🧊", sun: "☀️", drop: "💧", cold: "❄️", tea: "☕", steam: "💨" },
        scenes: [
          { caption: "این یک تکه یخ است. یخ سفت و سرد است.", at: { ice: [50, 62, { size: 1.4 }] } },
          { caption: "خورشید یخ را گرم کرد…", at: { sun: [14, 18, { act: "grow" }], ice: [50, 64, { size: 1.1, act: "shake" }] } },
          { caption: "و یخ آب شد!", at: { ice: null, drop: [50, 72, { size: 1.3 }] } },
          { caption: "اگر آب را در فریزر بگذاریم، دوباره یخ می‌زند.", at: { sun: null, cold: [30, 30, { act: "spin" }], drop: null, ice: [50, 62, { size: 1.4 }] } },
          { caption: "از چای داغ بخار بلند می‌شود. بخار هم آب است!", at: { cold: null, ice: null, tea: [50, 72, { size: 1.4 }], steam: [50, 50, { size: 0.8 }] } },
          { caption: "بخار بالا می‌رود.", at: { steam: [48, 18, { size: 1.1 }] } }
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
      { type: "story", prompt: "خورشید در آسمان کجا می‌رود؟",
        cast: { sun: "☀️", hill: "⛰️", house: "🏡", moon: "🌙", s1: "⭐", s2: "✨", s3: "⭐" },
        scenes: [
          { caption: "صبح خورشید از پشت کوه بالا می‌آید.", at: { house: [50, 64, { size: 1.3 }], hill: [86, 58, { size: 1.6 }], sun: [86, 42] } },
          { caption: "ظهر خورشید بالای آسمان است.", at: { sun: [50, 12] } },
          { caption: "عصر خورشید پایین می‌رود.", at: { sun: [14, 50] } },
          { caption: "شب شد. ماه و ستاره‌ها پیدا شدند.", at: { sun: null, moon: [72, 18], s1: [30, 14, { size: 0.6 }], s2: [46, 28, { size: 0.6 }], s3: [18, 34, { size: 0.5 }] } },
          { caption: "حالا آن طرف زمین روز است و بچه‌ها بیدارند!", at: { moon: [72, 18, { act: "bounce" }] } }
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
      { type: "story", prompt: "درخت در هر فصل چه شکلی است؟",
        cast: { tree: "🌳", b1: "🌸", b2: "🌸", fruit: "🍒", sun: "☀️", l1: "🍂", l2: "🍁", snow: "❄️", man: "⛄" },
        scenes: [
          { caption: "بهار است. درخت شکوفه می‌دهد. نوروز اول بهار است.", at: { tree: [50, 46, { size: 2.6 }], b1: [40, 34, { size: 0.6, act: "grow" }], b2: [58, 28, { size: 0.6, act: "grow" }] } },
          { caption: "تابستان است. هوا گرم است و میوه‌ها می‌رسند.", at: { b1: null, b2: null, fruit: [56, 40, { size: 0.7, act: "bounce" }], sun: [14, 16, { act: "grow" }] } },
          { caption: "پاییز است. برگ‌ها زرد می‌شوند و می‌ریزند.", at: { fruit: null, sun: null, l1: [34, 82, { size: 0.7, act: "spin" }], l2: [70, 84, { size: 0.7, act: "spin" }] } },
          { caption: "زمستان است. هوا سرد است و برف می‌بارد.", at: { l1: null, l2: null, snow: [30, 20, { act: "spin" }], man: [80, 70, { act: "bounce" }] } }
        ],
        question: "برگ‌ها در کدام فصل می‌ریزند؟", pic: true,
        options: [{ label: "🌸", value: "بهار" }, { label: "🍂", value: "پاییز" }, { label: "☀️", value: "تابستان" }], answer: "پاییز" },
      { type: "order", prompt: "فصل‌ها را از بهار بچین", say: "فصل‌ها را از بهار به ترتیب بچین.", numbered: true,
        items: [{ pic: "🌸", label: "بهار" }, { pic: "☀️", label: "تابستان" }, { pic: "🍂", label: "پاییز" }, { pic: "⛄", label: "زمستان" }] },
      { type: "pattern", prompt: "بعد از زمستان کدام فصل می‌آید؟", say: "بعد از زمستان، دوباره کدام فصل می‌آید؟",
        seq: ["🌸", "☀️", "🍂", "⛄", "🌸", "☀️"], blanks: [4], options: ["🍂", "🌸", "☀️"] },
      { type: "story", prompt: "ایران بزرگ است", tall: true, bg: "#f6efdc",
        cast: { tabriz: "⛄ تبریز", rasht: "🌧️ رشت", bandar: "☀️ بندرعباس" },
        scenes: [
          { caption: "زمستان است. در تبریز برف می‌بارد.", at: { tabriz: [26, 20, { size: 0.6, act: "bounce" }] } },
          { caption: "همان روز، در رشت باران می‌بارد.", at: { rasht: [50, 12, { size: 0.6, act: "bounce" }] } },
          { caption: "و در بندرعباس هوا گرم و آفتابی است!", at: { bandar: [62, 84, { size: 0.6, act: "bounce" }] } }
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

  // ---------------- Science: Sapling (why does it happen?) ----------------
  {
    id: "science-sapling-1", subject: "science", level: "sapling", emoji: "🌧️", title: "چرخه آب",
    steps: [
      { type: "story", prompt: "آب باران از کجا می‌آید؟",
        cast: { sea: "🌊", sun: "☀️", mount: "🏔️", v1: "💧", v2: "💧", cloud: "☁️", rain: "🌧️", river: "💧" },
        scenes: [
          { caption: "خورشید آب دریا را گرم می‌کند.", at: { mount: [22, 52, { size: 2 }], sea: [72, 84, { size: 1.8 }], sun: [88, 14, { act: "grow" }] } },
          { caption: "آب بخار می‌شود و بالا می‌رود. بخار را نمی‌بینیم.", at: { v1: [66, 74, { size: 0.5 }], v2: [78, 76, { size: 0.5 }] } },
          { caption: "بالای آسمان هوا سرد است. بخار قطره‌های خیلی ریز می‌شود و ابر درست می‌شود.", at: { v1: [64, 26, { size: 0.4 }], v2: [72, 22, { size: 0.4 }] } },
          { caption: "ابر درست شد!", at: { v1: null, v2: null, cloud: [66, 22, { size: 1.4, act: "grow" }] } },
          { caption: "باد ابر را به طرف کوه می‌برد.", at: { cloud: [28, 16, { size: 1.4 }] } },
          { caption: "از ابر باران می‌بارد. روی کوه‌های بلند برف می‌بارد.", at: { cloud: null, rain: [28, 16, { size: 1.4, act: "shake" }] } },
          { caption: "آب باران در رود جمع می‌شود و به دریا برمی‌گردد.", at: { river: [30, 66, { size: 0.6 }] } },
          { caption: "و این چرخه دوباره شروع می‌شود!", at: { rain: null, river: [68, 82, { size: 0.6 }], sun: [88, 14, { act: "grow" }] } }
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
      { type: "story", prompt: "آهنربا از پشت کاغذ هم می‌کشد؟", bg: "#f6efdc",
        cast: { paper: "📄", clip: "📎", magnet: "🧲" },
        scenes: [
          { caption: "گیره روی کاغذ است. آهنربا زیر کاغذ است.", at: { paper: [50, 50, { size: 4 }], clip: [64, 46, { size: 0.8 }], magnet: [64, 86, { size: 0.9 }] } },
          { caption: "آهنربا را زیر کاغذ تکان می‌دهیم…", at: { magnet: [36, 86, { size: 0.9 }] } },
          { caption: "گیره هم دنبالش می‌رود!", at: { clip: [38, 46, { size: 0.8, act: "bounce" }] } },
          { caption: "آهنربا از پشت کاغذ هم چیزهای آهنی را می‌کشد.", at: { magnet: [60, 86, { size: 0.9 }], clip: [60, 46, { size: 0.8 }] } }
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
      { type: "story", prompt: "سفری به طبیعت ایران", tall: true, bg: "#f6efdc",
        cast: { caspian: "🌊 دریای خزر", forest: "🌲 جنگل‌های شمال", deer: "🦌", mount: "🏔️ زاگرس", goat: "🐐",
          desert: "🏜️ کویر", cheetah: "🐆", gulf: "🌊 خلیج فارس", dolphin: "🐬" },
        scenes: [
          { caption: "ایران سرزمین بزرگی است، با طبیعت‌های گوناگون.", at: { caspian: [54, 8, { size: 0.5 }], gulf: [52, 92, { size: 0.5 }] } },
          { caption: "در شمال، کنار دریای خزر، جنگل‌های سبز و پرباران هست.", at: { forest: [52, 22, { size: 0.5, act: "grow" }] } },
          { caption: "مرال در جنگل‌های شمال زندگی می‌کند.", at: { deer: [52, 33, { size: 0.8, act: "bounce" }] } },
          { caption: "کوه‌های بلند زاگرس زمستان پر از برف‌اند. بز کوهی روی صخره‌ها راه می‌رود.", at: { mount: [22, 48, { size: 0.5, act: "grow" }], goat: [22, 62, { size: 0.8, act: "bounce" }] } },
          { caption: "وسط ایران کویر است: گرم، خشک و پر از شن. یوزپلنگ ایرانی آنجا زندگی می‌کند.", at: { desert: [64, 50, { size: 0.5, act: "grow" }], cheetah: [80, 62, { size: 0.8, act: "bounce" }] } },
          { caption: "در جنوب، خلیج فارس است. آبش گرم است و دلفین‌ها در آن شنا می‌کنند.", at: { dolphin: [82, 76, { size: 0.8, act: "bounce" }] } }
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
      { type: "story", prompt: "چیزها چطور حرکت می‌کنند؟",
        cast: { boy: "👦", cart: "🛒", girl: "👧", sled: "🛷", ball: "⚽" },
        scenes: [
          { caption: "امید چرخ‌دستی را هل می‌دهد. چرخ‌دستی از او دور می‌شود.", at: { boy: [80, 62, { size: 1.2, flip: true }], cart: [64, 66, { flip: true }] } },
          { caption: "چرخ‌دستی جلو رفت.", at: { boy: [50, 62, { size: 1.2, flip: true }], cart: [30, 66, { flip: true }] } },
          { caption: "مریم سورتمه را می‌کشد. سورتمه دنبالش می‌آید.", at: { boy: null, cart: null, girl: [56, 62, { size: 1.2 }], sled: [76, 70] } },
          { caption: "مریم و سورتمه رفتند.", at: { girl: [20, 62, { size: 1.2 }], sled: [40, 70] } },
          { caption: "توپ را آرام هل بدهیم، کمی می‌رود.", at: { girl: null, sled: null, ball: [62, 74] } },
          { caption: "محکم هل بدهیم، خیلی دورتر می‌رود!", at: { ball: [10, 74, { act: "spin" }] } }
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
  }
);
