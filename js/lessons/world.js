/* باغچه — ایران و جهان (people, places and the past) lessons, leveled. One course for culture, maps and
   geography, and history: from near to far (me and my home → neighbourhood → Iran → the world → the world through
   time), always starting from the child's own life. See "ایران و جهان" in CURRICULUM.md for the approach and the
   neutrality rules, which are stricter here than anywhere else: no politics after ۱۲۸۵, no leaders, no religion
   beyond architecture, no battles; Iran is many peoples.
   Lessons are plain data; step types are listed in README.md. The map step is in js/steps/world.js, and the maps
   several lessons share are in B.MAPS below. Seed children cannot read yet: everything is said aloud and shown in
   pictures. Every lesson is checked by a history or geography teacher before it is published; sources are noted
   above each lesson. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "world", name: "ایران و جهان", emoji: "🌍", leveled: true });

B.MAPS = B.MAPS || {};

/* Picture maps seen from above (viewBox 400 × 300). Places are tapped; shapes and deco are only the picture. */
B.MAPS.room = {
  bg: "wall",
  shapes: [
    { rect: [12, 12, 376, 276], kind: "floor" },
    { rect: [150, 3, 100, 10], kind: "water" },
    { rect: [388, 196, 10, 68], kind: "wood" },
    { rect: [130, 110, 150, 100], r: 12, kind: "rug" },
    { rect: [24, 24, 92, 150], r: 8, kind: "wood" },
    { rect: [32, 32, 76, 30], r: 8, kind: "block" },
    { rect: [276, 26, 100, 62], r: 6, kind: "wood" }
  ],
  places: [
    { id: "bed", name: "تخت", pic: "🛏️", at: [70, 112] },
    { id: "window", name: "پنجره", pic: "🪟", at: [200, 36], size: 0.8 },
    { id: "door", name: "در اتاق", pic: "🚪", at: [360, 230], size: 0.9 },
    { id: "desk", name: "میز و کتاب‌ها", pic: "📚", at: [326, 57] },
    { id: "chair", name: "صندلی", pic: "🪑", at: [326, 118], size: 0.9 },
    { id: "ball", name: "توپ", pic: "⚽", at: [205, 160] },
    { id: "teddy", name: "عروسک خرسی", pic: "🧸", at: [70, 220] },
    { id: "plant", name: "گلدان", pic: "🪴", at: [36, 264], size: 0.8 },
    { id: "cat", name: "گربه", pic: "🐈", at: [252, 254] }
  ]
};

B.MAPS.home = {
  bg: "grass",
  shapes: [
    { circle: [72, 190, 34], kind: "water" },
    { rect: [148, 14, 240, 272], r: 6, kind: "wall" },
    { rect: [156, 22, 110, 120], kind: "floor" },
    { rect: [272, 22, 108, 120], kind: "floor" },
    { rect: [156, 148, 150, 130], kind: "floor" },
    { rect: [312, 148, 68, 130], kind: "floor" },
    { rect: [143, 196, 12, 44], kind: "wood" }
  ],
  deco: [{ pic: "🐟", at: [72, 190], size: 0.7 }, { pic: "🌸", at: [30, 270], size: 0.8 }, { pic: "🌷", at: [120, 270], size: 0.8 }],
  places: [
    { id: "yard", name: "حیاط", pic: "🌳", at: [72, 80], size: 1.2 },
    { id: "kitchen", name: "آشپزخانه", pic: "🍳", at: [211, 82] },
    { id: "bedroom", name: "اتاق خواب", pic: "🛏️", at: [326, 82] },
    { id: "hall", name: "هال", pic: "🛋️", at: [231, 213] },
    { id: "bath", name: "حمام", pic: "🛁", at: [346, 213], size: 0.9 },
    { id: "door", name: "در خانه", pic: "🚪", at: [128, 218], size: 0.8 }
  ]
};

B.MAPS.street = {
  bg: "grass",
  shapes: [
    { rect: [0, 135, 400, 32], kind: "road" },
    { rect: [184, 0, 32, 300], kind: "road" },
    { d: "M0 151 H400", kind: "line" },
    { d: "M200 0 V300", kind: "line" },
    { rect: [12, 14, 160, 108], r: 8, kind: "block" },
    { rect: [228, 14, 160, 108], r: 8, kind: "park" },
    { rect: [12, 180, 160, 108], r: 8, kind: "block" },
    { rect: [228, 180, 160, 108], r: 8, kind: "block" }
  ],
  deco: [{ pic: "🌲", at: [250, 32], size: 0.7 }, { pic: "🌲", at: [366, 104], size: 0.7 }, { pic: "🌼", at: [250, 106], size: 0.6 }, { pic: "🚗", at: [110, 151], size: 0.8 }],
  places: [
    { id: "bakery", name: "نانوایی", pic: "🫓", at: [56, 66] },
    { id: "fruit", name: "میوه‌فروشی", pic: "🍎", at: [136, 66] },
    { id: "park", name: "پارک", pic: "🌳", at: [308, 68], size: 1.2 },
    { id: "school", name: "مدرسه", pic: "🏫", at: [92, 234], size: 1.1 },
    { id: "clinic", name: "درمانگاه", pic: "🏥", at: [266, 234] },
    { id: "home", name: "خانه ما", pic: "🏠", at: [350, 234] }
  ]
};

(function () {
  var HOME = { title: "🏠 در خانه (برای والدین)", note: "کاری ساده برای انجام دادن با هم، بدون صفحه." };
  function home(s) { s.type = "home"; s.title = HOME.title; s.note = HOME.note; return s; }

  B.LESSONS.push(
    // ---------------- Iran and the world: Seed (me, my family, my home, my neighbourhood) ----------------

    /* Sources: family as the first circle of social studies (NCSS, "Individual Development and Identity";
       expanding horizons); family diversity shown without judgement (single-parent, extended and large families
       are all common in Iran). Names from different regions: کیان (Shiraz), مراد (Gonbad-e Kavus, Turkmen),
       دلارام (Rasht), حمید (Ahvaz). Teacher review: whether the families feel familiar in every region. */
    {
      id: "world-seed-1", subject: "world", level: "seed", emoji: "👨‍👩‍👧", title: "من و خانواده‌ام",
      steps: [
        { type: "story", prompt: "خانواده کیان", bg: "room",
          cast: { kian: "👦", mom: "👩", dad: "👨", baby: "👶", gran: "👵", pan: "🍳", ball: "⚽", milk: "🍼", book: "📖", dinner: "🍲" },
          scenes: [
            { caption: "این کیان است. در شیراز زندگی می‌کند.", at: { kian: [50, 60, { size: 1.4, act: "bounce" }] } },
            { caption: "این مادر و پدر کیان هستند.", at: { kian: [50, 62], mom: [72, 56, { size: 1.3 }], dad: [28, 56, { size: 1.3 }] } },
            { caption: "این نازنین است، خواهر کوچک کیان. مادربزرگ هم با آن‌ها زندگی می‌کند.", at: { baby: [60, 74, { size: 0.8, act: "bounce" }], gran: [88, 58, { size: 1.2 }] } },
            { caption: "صبح، پدر صبحانه درست می‌کند.", at: { mom: null, gran: null, baby: null, kian: [70, 62], dad: [36, 56, { size: 1.3 }], pan: [52, 72, { act: "shake" }] } },
            { caption: "نازنین شیر می‌خورد.", at: { pan: null, dad: null, kian: null, baby: [50, 62, { size: 1.2 }], milk: [66, 62, { act: "bounce" }] } },
            { caption: "عصر، مادر با کیان توپ‌بازی می‌کند.", at: { baby: null, milk: null, mom: [72, 56, { size: 1.3 }], kian: [28, 62], ball: [50, 70, { act: "bounce" }] } },
            { caption: "شب، مادربزرگ برای بچه‌ها قصه می‌گوید.", at: { mom: null, ball: null, gran: [70, 56, { size: 1.3 }], book: [52, 62], kian: [32, 62], baby: [18, 70, { size: 0.8 }] } },
            { caption: "همه با هم شام می‌خورند. نوش جان!", at: { book: null, dinner: [50, 76, { act: "grow" }], mom: [70, 52], dad: [30, 52], gran: [88, 56], kian: [50, 50], baby: [12, 60, { size: 0.8 }] } }
          ] },
        { type: "pairs", prompt: "چه کسی چه کار کرد؟",
          say: "در خانواده کیان، چه کسی چه کار کرد؟ جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "👨", say: "پدر" }, { pic: "🍳", say: "صبحانه درست کرد" }],
            [{ pic: "👩", say: "مادر" }, { pic: "⚽", say: "توپ‌بازی کرد" }],
            [{ pic: "👵", say: "مادربزرگ" }, { pic: "📖", say: "قصه گفت" }],
            [{ pic: "👶", say: "نازنین" }, { pic: "🍼", say: "شیر خورد" }]
          ] },
        { type: "story", prompt: "هر خانواده‌ای یک جور است", bg: "room",
          cast: { murad: "👦", grandpa: "👴", gran: "👵", mom: "👩", dad: "👨", del: "👧", hamid: "🧒", b1: "👦", b2: "👦", s1: "👧", s2: "👧", heart: "❤️" },
          scenes: [
            { caption: "این مراد است. در گنبد، با پدر و مادر و پدربزرگ و مادربزرگش زندگی می‌کند.",
              at: { murad: [50, 66, { size: 1.2 }], dad: [70, 58], mom: [30, 58], grandpa: [88, 58], gran: [12, 58] } },
            { caption: "این دلارام است. در رشت، با مادرش زندگی می‌کند.",
              at: { murad: null, dad: null, grandpa: null, gran: null, del: [42, 64, { size: 1.2 }], mom: [62, 56, { size: 1.3 }] } },
            { caption: "این حمید است. در اهواز زندگی می‌کند. دو برادر و دو خواهر دارد!",
              at: { del: null, mom: null, hamid: [50, 64, { size: 1.2 }], b1: [70, 64], b2: [86, 64], s1: [30, 64], s2: [14, 64] } },
            { caption: "خانواده‌ها با هم فرق دارند: کوچک و بزرگ. ولی همه همدیگر را دوست دارند.",
              at: { hamid: [50, 66], heart: [50, 34, { size: 1.4, act: "grow" }] } }
          ] },
        { type: "talk", scene: "👨‍👩‍👧‍👦 👵 👴 🏡", caption: "خانواده تو چه کسانی هستند؟ با هم چه کار می‌کنید؟" },
        home({ pic: "🖍️ 👨‍👩‍👧", text: "خانواده‌ات را نقاشی کن!",
          need: ["کاغذ", "مداد رنگی"],
          steps: [
            "از کودک بخواهید هر کسی را که خانواده خودش می‌داند نقاشی کند. هر خانواده‌ای یک جور است و همه درست‌اند.",
            "کنار هر نفر، نامش را بنویسید و کودک بگوید او با او چه کار می‌کند: «با بابا آشپزی می‌کنم.»",
            "اگر عکس خانوادگی دارید، با هم نگاه کنید و بپرسید: «این کیه؟ اون روز چی کار کردیم؟»"
          ],
          ask: "تو در خانه چه کاری برای خانواده‌ات انجام می‌دهی؟" })
      ]
    },

    /* Sources: map skills begin with a familiar space seen from above, then a picture map
       (Bishop, "Learning to read maps"; NCSS C3 Framework, Geography D2.Geo.1.K–2: construct maps of familiar places;
       Iran's preschool programme, «من و محیط اطرافم»). Top view of a ball (a circle) and a rug (a rectangle)
       links to the shapes the child knows from math. */
    {
      id: "world-seed-2", subject: "world", level: "seed", emoji: "🗺️", title: "خانه ما از بالا",
      steps: [
        { type: "story", prompt: "از بالا نگاه کنیم", bg: "room",
          cast: { girl: "👧", cat: "🐈", bed: "🛏️", ball: "⚽", teddy: "🧸", circle: "⚪", rug: "🟫", map: "🗺️" },
          scenes: [
            { caption: "این اتاق دلارام است.", at: { girl: [74, 62, { size: 1.3 }], bed: [24, 66, { size: 1.4 }], ball: [50, 76], teddy: [36, 78, { size: 0.8 }], cat: [86, 80, { size: 0.8 }] } },
            { caption: "گربه دلارام از کمد بالا رفت.", at: { cat: [86, 14, { size: 0.8, act: "bounce" }] } },
            { caption: "از آن بالا، گربه همه اتاق را می‌بیند: تخت، توپ و عروسک.", at: { cat: [86, 14, { size: 0.8, act: "shake" }], bed: [24, 66, { size: 1.4, act: "grow" }], ball: [50, 76, { act: "grow" }] } },
            { caption: "از بالا، توپ مثل یک دایره است و فرش مثل یک مستطیل.", at: { girl: null, bed: null, teddy: null, ball: [36, 50], circle: [36, 74, { act: "grow" }], rug: [64, 62, { size: 1.6, act: "grow" }] } },
            { caption: "دلارام اتاقش را از بالا کشید. این نقشه اتاق است!", at: { ball: null, circle: null, rug: null, cat: null, girl: [72, 60, { size: 1.3 }], map: [40, 56, { size: 2, act: "grow" }] } }
          ] },
        { type: "map", map: "room", prompt: "این نقشه اتاق دلارام است. روی هر چیز بزن تا اسمش را بشنوی." },
        { type: "map", map: "room", say: "در نقشه اتاق دلارام پیدا کن.",
          tasks: [
            { find: "bed", prompt: "تخت کجاست؟" },
            { find: "ball", prompt: "توپ کجاست؟" },
            { find: "cat", prompt: "گربه کجاست؟" },
            { find: "door", prompt: "از کجا وارد اتاق می‌شویم؟", say: "از کجا وارد اتاق می‌شویم؟ در کجاست؟" }
          ] },
        { type: "map", map: "home", say: "این نقشه همه خانه دلارام است، از بالا.",
          tasks: [
            { find: "kitchen", prompt: "غذا را کجا درست می‌کنیم؟", say: "غذا را کجا درست می‌کنیم؟ آشپزخانه کجاست؟" },
            { find: "bath", prompt: "حمام کجاست؟" },
            { find: "yard", prompt: "حیاط کجاست؟", say: "حیاط با حوض و درخت کجاست؟" }
          ] },
        { type: "choose", prompt: "از بالا، توپ چه شکلی است؟", say: "اگر از بالا به توپ نگاه کنیم، چه شکلی است؟", pic: true,
          options: [{ label: "🔺", value: "مثلث" }, { label: "⚪", value: "دایره" }, { label: "🟥", value: "مربع" }], answer: "دایره" },
        home({ pic: "🖍️ 🗺️", text: "نقشه اتاقت را بکش!",
          need: ["یک کاغذ بزرگ", "مداد رنگی"],
          steps: [
            "با کودک بالای یک صندلی بایستید (با احتیاط) یا از در اتاق نگاه کنید و بپرسید: «از بالا تخت چه شکلی است؟»",
            "کمکش کنید شکل اتاق را روی کاغذ بکشد، بعد تخت، در، پنجره و فرش را از بالا بکشد.",
            "یک اسباب‌بازی را در اتاق پنهان کنید و جایش را روی نقشه با یک ضربدر نشان بدهید. کودک با نقشه پیدایش کند.",
            "جایتان را عوض کنید: کودک پنهان کند و روی نقشه علامت بزند."
          ],
          ask: "در نقشه تو، در اتاق کجاست؟" })
      ]
    },

    /* Sources: community places and helpers (NCSS C3 D2.Civ.2.K–2 and D2.Geo.2.K–2; Iranian preschool theme
       «محله ما»). Workers shown against stereotype on purpose (a woman doctor, a man teacher). Road safety:
       crossing with a grown-up. Teacher review: the places a child knows in a village (no clinic or park nearby)
       are mentioned in the parent note. */
    {
      id: "world-seed-3", subject: "world", level: "seed", emoji: "🏘️", title: "محله ما",
      steps: [
        { type: "story", prompt: "با حمید و مادربزرگ در محله", bg: "street",
          cast: { boy: "👦", gran: "👵", bread: "🫓", baker: "🧑‍🍳", school: "🏫", teacher: "👨‍🏫", park: "🌳", gardener: "🧑‍🌾", clinic: "🏥", doctor: "👩‍⚕️", home: "🏠" },
          scenes: [
            { caption: "حمید و مادربزرگ از خانه بیرون آمدند.", at: { home: [86, 56, { size: 1.6 }], boy: [70, 72], gran: [60, 66, { size: 1.2 }] } },
            { caption: "اول به نانوایی رفتند. نانوا نان تازه می‌پزد.", at: { home: null, boy: [70, 72], gran: [82, 66, { size: 1.2 }], baker: [30, 58, { size: 1.3 }], bread: [46, 70, { act: "grow" }] } },
            { caption: "از جلوی مدرسه رد شدند. آقای معلم به حمید سلام کرد.", at: { baker: null, bread: null, school: [30, 50, { size: 1.6 }], teacher: [48, 68, { act: "bounce" }] } },
            { caption: "در پارک، باغبان به گل‌ها آب می‌داد.", at: { school: null, teacher: null, park: [30, 50, { size: 1.8 }], gardener: [50, 68, { act: "bounce" }] } },
            { caption: "این درمانگاه است. خانم دکتر به آدم‌های بیمار کمک می‌کند.", at: { park: null, gardener: null, clinic: [30, 50, { size: 1.6 }], doctor: [50, 68, { act: "bounce" }] } },
            { caption: "این‌ها محله حمید است. محله تو چه جاهایی دارد؟", at: { clinic: [18, 40], doctor: null, park: [40, 40], school: [62, 40], bread: [84, 40], boy: [44, 74, { act: "bounce" }], gran: [58, 70, { size: 1.2 }] } }
          ] },
        { type: "map", map: "street", prompt: "این نقشه یک محله است. روی هر جا بزن تا اسمش را بشنوی." },
        { type: "pairs", prompt: "هر کس کجا کار می‌کند؟", say: "هر کس کجا کار می‌کند؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "🧑‍🍳", say: "نانوا" }, { pic: "🫓", say: "نانوایی" }],
            [{ pic: "👨‍🏫", say: "معلم" }, { pic: "🏫", say: "مدرسه" }],
            [{ pic: "👩‍⚕️", say: "پزشک" }, { pic: "🏥", say: "درمانگاه" }],
            [{ pic: "🧑‍🌾", say: "باغبان" }, { pic: "🌳", say: "پارک" }]
          ] },
        { type: "sort", prompt: "برای هر کار کجا برویم؟",
          say: "برای هر کار کجا برویم؟ نانوایی، درمانگاه یا پارک؟",
          baskets: [{ pic: "🫓", label: "نانوایی", value: "bakery" }, { pic: "🏥", label: "درمانگاه", value: "clinic" }, { pic: "🌳", label: "پارک", value: "park" }],
          items: [
            { pic: "🥖", say: "نان بربری بخریم", basket: "bakery" },
            { pic: "🫓", say: "نان سنگک بخریم", basket: "bakery" },
            { pic: "🤒", say: "تب داریم", basket: "clinic" },
            { pic: "💉", say: "واکسن بزنیم", basket: "clinic" },
            { pic: "🛝", say: "سرسره‌بازی کنیم", basket: "park" },
            { pic: "🪁", say: "بادبادک هوا کنیم", basket: "park" }
          ] },
        { type: "choose", prompt: "حمید با چه کسی از خیابان رد شد؟", say: "برای رد شدن از خیابان، دست چه کسی را بگیریم؟", pic: true,
          options: [{ label: "🐈", value: "گربه" }, { label: "👵", value: "یک بزرگ‌تر" }, { label: "🧸", value: "عروسک" }], answer: "یک بزرگ‌تر" },
        home({ pic: "🚶 🏘️", text: "در محله‌تان قدم بزن و جاها را نام ببر.",
          need: ["کفش راحت", "اگر خواستید: کاغذ و مداد برای کشیدن"],
          steps: [
            "با کودک در کوچه و محله قدم بزنید. هر جا را که می‌بینید نام ببرید: نانوایی، مدرسه، پارک، بقالی، داروخانه، ایستگاه اتوبوس.",
            "در روستا هم همین کار را بکنید: چشمه، مزرعه، مدرسه، خانه همسایه.",
            "بپرسید: «اینجا چه کسی کار می‌کند؟ ما برای چه به اینجا می‌آییم؟»",
            "سر خیابان بایستید و رد شدن با دقت را با هم تمرین کنید: «اول نگاه می‌کنیم، دست بزرگ‌تر را می‌گیریم.»"
          ],
          ask: "کدام جای محله را از همه بیشتر دوست داری؟ چرا؟" })
      ]
    },

    /* Sources: following a route on a picture map with landmarks, and near / far (NCSS C3 D2.Geo.1.K–2;
       Bishop, "Learning to read maps": routes before coordinates). Same neighbourhood map as world-seed-3
       (B.MAPS.street). Road safety: crossing with a grown-up. */
    {
      id: "world-seed-4", subject: "world", level: "seed", emoji: "🚶", title: "راه خانه تا نانوایی",
      steps: [
        { type: "story", prompt: "پریا و پدربزرگ نان می‌خرند", bg: "street",
          cast: { girl: "👧", grandpa: "👴", home: "🏠", park: "🌳", fruit: "🍎", bread: "🫓", car: "🚗" },
          scenes: [
            { caption: "پریا و پدربزرگ می‌خواهند نان بخرند.", at: { home: [86, 50, { size: 1.6 }], girl: [72, 72], grandpa: [62, 66, { size: 1.2 }] } },
            { caption: "اول از کنار پارک رد می‌شوند.", at: { home: null, park: [60, 40, { size: 1.6 }], girl: [62, 74], grandpa: [52, 68, { size: 1.2 }] } },
            { caption: "سر خیابان می‌ایستند. پریا دست پدربزرگ را می‌گیرد. ماشینی نمی‌آید؟ حالا رد می‌شوند.", at: { park: null, car: [14, 80, { act: "shake" }], girl: [56, 72, { act: "bounce" }], grandpa: [46, 66, { size: 1.2 }] } },
            { caption: "از میوه‌فروشی سیب می‌خرند.", at: { car: null, fruit: [26, 50, { size: 1.4, act: "grow" }], girl: [48, 72], grandpa: [38, 66, { size: 1.2 }] } },
            { caption: "رسیدند به نانوایی. نان داغ!", at: { fruit: null, bread: [18, 50, { size: 1.6, act: "grow" }], girl: [38, 72, { act: "bounce" }], grandpa: [28, 66, { size: 1.2 }] } },
            { caption: "نانوایی از خانه پریا دور است. پارک نزدیک است.", at: { bread: [14, 44, { size: 1.2 }], home: [86, 44, { size: 1.2 }], park: [66, 44, { size: 1.2 }], girl: [50, 76], grandpa: [40, 70, { size: 1.2 }] } }
          ] },
        { type: "map", map: "street", say: "با پریا راه برو.",
          tasks: [{ route: ["home", "park", "fruit", "bakery"], walker: "👧",
            prompt: "از خانه برو پارک، بعد میوه‌فروشی، بعد نانوایی.",
            say: "از خانه شروع کن. اول برو پارک، بعد میوه‌فروشی، بعد نانوایی." }] },
        { type: "order", prompt: "پریا به ترتیب از کجاها رد شد؟", say: "پریا اول کجا بود؟ بعد کجا رفت؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏠", say: "خانه" }, { pic: "🌳", say: "پارک" }, { pic: "🍎", say: "میوه‌فروشی" }, { pic: "🫓", say: "نانوایی" }] },
        { type: "map", map: "street",
          tasks: [{ route: ["home", "clinic", "school"], walker: "🧒",
            prompt: "از خانه برو مدرسه. سر راه از درمانگاه رد شو.",
            say: "از خانه شروع کن. از کنار درمانگاه رد شو و برو مدرسه." }] },
        { type: "map", map: "street", say: "نزدیک و دور.",
          tasks: [
            { find: "clinic", prompt: "کدام به خانه نزدیک‌تر است: درمانگاه یا نانوایی؟", say: "کدام به خانه نزدیک‌تر است؟ درمانگاه یا نانوایی؟ رویش بزن." },
            { find: "school", prompt: "کدام از خانه دورتر است: پارک یا مدرسه؟", say: "کدام از خانه دورتر است؟ پارک یا مدرسه؟ رویش بزن." }
          ] },
        home({ pic: "🚶 🗺️", text: "راه خانه تا نانوایی را با هم برو و بکش.",
          need: ["کاغذ", "مداد رنگی"],
          steps: [
            "وقتی به نانوایی، بقالی یا مدرسه می‌روید، از کودک بپرسید: «حالا از کجا رد می‌شیم؟ بعدش چی می‌بینیم؟»",
            "در خانه، کودک راه را روی کاغذ بکشد: خانه یک طرف، نانوایی طرف دیگر، و چیزهایی که سر راه دید وسطشان.",
            "بپرسید: «کدوم نزدیک‌تره، نانوایی یا مدرسه؟ از کجا فهمیدی؟»"
          ],
          ask: "وقتی از خیابان رد می‌شویم، چه کار می‌کنیم؟" })
      ]
    },

    /* Sources: Nowruz customs (خانه‌تکانی، سبزه، هفت‌سین، دید و بازدید، عیدی): Encyclopaedia Iranica, "Nowruz"
       (A. Shahbazi, 2016); UNESCO Representative List of the Intangible Cultural Heritage, "Nowruz" (2009, extended
       2016: Iran and its neighbours). Haft-sin items vary by family; only common food and plant items are shown,
       no religious objects. Shown as culture, not religion. */
    {
      id: "world-seed-5", subject: "world", level: "seed", emoji: "🌱", title: "نوروز",
      steps: [
        { type: "story", prompt: "نوروز شیلان", bg: "room",
          cast: { tree: "🌸", girl: "👧", mom: "👩", dad: "👨", broom: "🧹", sabzeh: "🌱", apple: "🍎", garlic: "🧄", coin: "🪙", hyacinth: "🪻", mirror: "🪞", gran: "👵", grandpa: "👴", sun: "☀️" },
          scenes: [
            { caption: "زمستان تمام شد. بهار آمد و درخت‌ها شکوفه دادند.", bg: "meadow", at: { sun: [14, 16, { act: "grow" }], tree: [56, 54, { size: 2.2, act: "grow" }] } },
            { caption: "نوروز نزدیک است. شیلان و پدر و مادرش خانه را تمیز می‌کنند: خانه‌تکانی!", bg: "room", at: { sun: null, tree: null, girl: [50, 66], mom: [72, 58, { size: 1.2 }], dad: [28, 58, { size: 1.2 }], broom: [40, 74, { act: "shake" }] } },
            { caption: "شیلان دو هفته پیش عدس خیس کرده بود. حالا سبزه سبز شده.", at: { mom: null, dad: null, broom: null, girl: [72, 62], sabzeh: [46, 66, { size: 1.6, act: "grow" }] } },
            { caption: "سفره هفت‌سین را چیدند: سبزه، سیب، سیر، سکه، سنبل… و یک آینه.",
              at: { girl: null, sabzeh: [84, 62], apple: [68, 64], garlic: [52, 64], coin: [36, 64, { size: 0.8 }], hyacinth: [20, 62], mirror: [52, 34, { size: 1.3, act: "grow" }] } },
            { caption: "سال نو شد! همه به هم می‌گویند: «نوروز مبارک!»", at: { sabzeh: null, apple: null, garlic: null, coin: null, hyacinth: null, mirror: null, girl: [50, 64, { act: "bounce" }], mom: [70, 58, { size: 1.2, act: "bounce" }], dad: [30, 58, { size: 1.2, act: "bounce" }] } },
            { caption: "به خانه مادربزرگ و پدربزرگ رفتند. پدربزرگ به شیلان عیدی داد.", at: { mom: null, dad: null, gran: [74, 58, { size: 1.2 }], grandpa: [30, 58, { size: 1.2 }], girl: [52, 66], coin: [42, 62, { size: 0.8, act: "bounce" }] } },
            { caption: "در ایران و کشورهای همسایه، خیلی از مردم نوروز را جشن می‌گیرند.", bg: "meadow", at: { gran: null, grandpa: null, coin: null, girl: [50, 66], tree: [22, 54, { size: 1.5 }], sabzeh: [78, 62, { size: 1.3 }] } }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌های جفت هفت‌سین را پیدا کن",
          pairs: [
            [{ pic: "🌱", say: "سبزه" }, { pic: "🌱", say: "سبزه" }],
            [{ pic: "🍎", say: "سیب" }, { pic: "🍎", say: "سیب" }],
            [{ pic: "🧄", say: "سیر" }, { pic: "🧄", say: "سیر" }],
            [{ pic: "🪙", say: "سکه" }, { pic: "🪙", say: "سکه" }]
          ] },
        { type: "sort", prompt: "کدام روی سفره هفت‌سین است؟",
          say: "کدام روی سفره هفت‌سین است؟ اسم‌ها را گوش کن: هفت‌سین‌ها با صدای «سـ» شروع می‌شوند.",
          baskets: [{ pic: "🪞", label: "هفت‌سین", value: "yes" }, { pic: "🧺", label: "جای دیگر", value: "no" }],
          items: [
            { pic: "🍎", say: "سیب", basket: "yes" },
            { pic: "🧄", say: "سیر", basket: "yes" },
            { pic: "🪻", say: "سنبل", basket: "yes" },
            { pic: "⚽", say: "توپ", basket: "no" },
            { pic: "👟", say: "کفش", basket: "no" },
            { pic: "🥕", say: "هویج", basket: "no" }
          ] },
        { type: "choose", prompt: "نوروز در کدام فصل است؟", say: "نوروز در کدام فصل است؟", pic: true,
          options: [{ label: "❄️", value: "زمستان" }, { label: "🌸", value: "بهار" }, { label: "🍂", value: "پاییز" }], answer: "بهار" },
        { type: "talk", scene: "🌱 🍎 🧄 🪙 🪻 🪞", caption: "نوروز شما چطور است؟ به دیدن چه کسانی می‌روید؟" },
        home({ pic: "🧹 🌱", text: "برای نوروز به خانواده‌ات کمک کن.",
          need: ["یک کشو یا قفسه اسباب‌بازی", "اگر نوروز نزدیک است: یک بشقاب عدس یا گندم برای سبزه"],
          steps: [
            "با کودک یک کشو یا قفسه اسباب‌بازی را مرتب کنید: خانه‌تکانی کوچک خودش.",
            "اگر نوروز نزدیک است، با هم سبزه بگذارید و هر روز آبش بدهید.",
            "از پدربزرگ و مادربزرگ (یا تلفنی) بپرسید نوروز بچگی‌شان چطور بود: کجا می‌رفتند، چه بازی می‌کردند."
          ],
          ask: "تو نوروز را برای چه دوست داری؟" })
      ]
    },

    /* Sources: traditional children's games played across Iran (لی‌لی، هفت‌سنگ، یه‌قل‌دوقل، قایم‌موشک); names
       differ by city and language. Dehkhoda dictionary entries for لی‌لی and هفت‌سنگ; Iran's Cultural Heritage
       (میراث فرهنگی) national list of traditional games. Children from Tehran, Tabriz, Khorramabad and Chabahar.
       Safety: never hide in a closed box, wardrobe, fridge or car; soft ball and paper cups for هفت‌سنگ indoors.
       Teacher review: the regional detail (which games are best known where). */
    {
      id: "world-seed-6", subject: "world", level: "seed", emoji: "🪨", title: "بازی‌های بچه‌های ایران",
      steps: [
        { type: "story", prompt: "بچه‌ها در همه جای ایران بازی می‌کنند",
          cast: { sara: "👧", sq1: "🟨", sq2: "🟨", sq3: "🟨", aydin: "👦", friend: "🧒", stones: "🪨", ball: "⚽", gol: "👧", pebbles: "⚪⚪⚪⚪⚪", yusuf: "👦", eyes: "🙈", sea: "🌊", palm: "🌴" },
          scenes: [
            { caption: "سارا در کوچه‌شان در تهران لی‌لی بازی می‌کند. با یک پا می‌پرد!",
              at: { sq1: [24, 80, { size: 0.9 }], sq2: [46, 80, { size: 0.9 }], sq3: [68, 80, { size: 0.9 }], sara: [46, 56, { size: 1.3, act: "bounce" }] } },
            { caption: "آیدین و دوستش در تبریز هفت‌سنگ بازی می‌کنند. هفت سنگ صاف را روی هم می‌چینند…",
              at: { sq1: null, sq2: null, sq3: null, sara: null, aydin: [80, 62, { size: 1.2 }], friend: [64, 64], stones: [30, 66, { size: 1.4, act: "grow" }] } },
            { caption: "…و با توپ آن‌ها را می‌اندازند! بعد زود دوباره می‌چینند.",
              at: { ball: [36, 66, { act: "spin" }], stones: [30, 74, { size: 1.4, act: "shake" }] } },
            { caption: "گل‌پری در خرم‌آباد با پنج سنگ‌ریزه یه‌قل‌دوقل بازی می‌کند.",
              at: { aydin: null, friend: null, ball: null, stones: null, gol: [72, 58, { size: 1.3 }], pebbles: [38, 72, { act: "bounce" }] } },
            { caption: "یوسف و دوستانش در چابهار، کنار دریا، قایم‌موشک بازی می‌کنند. یکی چشمش را می‌بندد و تا ده می‌شمارد.",
              at: { gol: null, pebbles: null, sea: [20, 78, { size: 1.6 }], palm: [86, 50, { size: 1.6 }], yusuf: [54, 60, { size: 1.2 }], eyes: [54, 36, { act: "bounce" }] } },
            { caption: "اسم این بازی‌ها در هر شهر و هر زبانی ممکن است فرق کند. ولی بچه‌ها همه جا بازی را دوست دارند!",
              at: { sea: null, palm: null, eyes: null, yusuf: [80, 62], gol: [62, 62], aydin: [38, 62], sara: [20, 62, { act: "bounce" }] } }
          ],
          question: "در هفت‌سنگ، سنگ‌ها را با چه می‌اندازند؟", pic: true,
          options: [{ label: "🪁", value: "بادبادک" }, { label: "⚽", value: "توپ" }, { label: "🧸", value: "عروسک" }], answer: "توپ" },
        { type: "count", thing: "🪨", n: 7, options: [5, 6, 7] },
        { type: "doit", pic: "🦶", text: "بیا لی‌لی بازی کنیم!",
          list: ["با گچ یا نوار چسب، چند خانه پشت سر هم روی زمین بکش.", "یک سنگ کوچک یا دکمه در خانه اول بینداز.", "با یک پا از روی خانه‌ها بپر و برگرد.", "جایی بازی کن که زمینش لیز نیست."] },
        { type: "doit", pic: "🙈", text: "قایم‌موشک بازی کن!",
          list: ["یکی چشمش را می‌بندد و تا ده می‌شمارد.", "بقیه قایم می‌شوند.", "هیچ وقت در کمد، صندوق، یخچال یا ماشین قایم نشو.", "پیدات کردم!"] },
        { type: "doit", pic: "🥤 ⚽", text: "هفت‌سنگ خانگی!",
          list: ["هفت لیوان کاغذی یا قوطی خالی را روی هم بچین.", "از کمی دورتر، با یک توپ نرم آن‌ها را بینداز.", "حالا دوباره بچین. چند بار توانستی؟"] }
      ]
    },

    /* Sources: windows and mirrors (Bishop 1990); similarities first, then differences, real everyday lives and no
       "tourist approach" (Derman-Sparks, "Anti-Bias Education"). Facts: in Japan many children walk to school in
       neighbourhood groups (集団登校); a traditional Japanese breakfast is rice and miso soup; Swahili «habari»
       (Kenya); Portuguese «olá» (Brazil); Rio de Janeiro is warm most of the year; Tabriz has snowy winters.
       No flags. Teacher review: names and greetings. */
    {
      id: "world-seed-7", subject: "world", level: "seed", emoji: "🌏", title: "بچه‌های دنیا",
      steps: [
        { type: "story", prompt: "چهار دوست از چهار جای دنیا",
          cast: { aylar: "👧🏻", haruto: "👦🏻", wanjiru: "👧🏿", pedro: "👦🏽", globe: "🌍", food: "🍽️", school: "🎒", ball: "⚽", laugh: "😂" },
          scenes: [
            { caption: "این آیلار است. در تبریز، در ایران، زندگی می‌کند.", at: { aylar: [50, 60, { size: 1.5, act: "bounce" }] } },
            { caption: "این هاروتو است، از ژاپن. این وانجیرو است، از کنیا. این پدرو است، از برزیل.",
              at: { globe: [50, 26, { size: 1.4, act: "spin" }], aylar: [86, 64], haruto: [62, 64, { act: "bounce" }], wanjiru: [38, 64, { act: "bounce" }], pedro: [14, 64, { act: "bounce" }] } },
            { caption: "همه آن‌ها با خانواده‌شان غذا می‌خورند.", at: { globe: null, food: [50, 30, { size: 1.4, act: "grow" }] } },
            { caption: "همه به مدرسه می‌روند و دوست دارند.", at: { food: null, school: [50, 30, { size: 1.4, act: "grow" }] } },
            { caption: "همه بازی را دوست دارند: توپ‌بازی، لی‌لی، قایم‌موشک!", at: { school: null, ball: [50, 30, { size: 1.2, act: "bounce" }] } },
            { caption: "همه می‌خندند، گاهی گریه می‌کنند و شب خوابشان می‌آید. خیلی چیزهایشان مثل هم است.", at: { ball: null, laugh: [50, 30, { size: 1.3, act: "grow" }] } }
          ] },
        { type: "story", prompt: "بعضی چیزها فرق دارد",
          cast: { aylar: "👧🏻", haruto: "👦🏻", wanjiru: "👧🏿", pedro: "👦🏽", bread: "🫓🧀", rice: "🍚🍲", fruit: "🍞🍌", walk: "🚶", bus: "🚌", snow: "❄️", sun: "☀️", hi: "👋" },
          scenes: [
            { caption: "صبحانه آیلار نان و پنیر است.", at: { aylar: [70, 60, { size: 1.4 }], bread: [36, 62, { size: 1.3, act: "grow" }] } },
            { caption: "صبحانه هاروتو برنج و سوپ است.", at: { aylar: null, bread: null, haruto: [70, 60, { size: 1.4 }], rice: [36, 62, { size: 1.3, act: "grow" }] } },
            { caption: "صبحانه پدرو نان و موز است.", at: { haruto: null, rice: null, pedro: [70, 60, { size: 1.4 }], fruit: [36, 62, { size: 1.3, act: "grow" }] } },
            { caption: "هاروتو با بچه‌های محله پیاده به مدرسه می‌رود. وانجیرو با اتوبوس مدرسه می‌رود.",
              at: { pedro: null, fruit: null, haruto: [80, 60, { size: 1.2 }], walk: [64, 62, { act: "bounce" }], wanjiru: [36, 60, { size: 1.2 }], bus: [16, 64, { act: "shake" }] } },
            { caption: "در شهر پدرو، ریو، بیشتر وقت‌ها هوا گرم است. در تبریز، زمستان برف می‌بارد!",
              at: { haruto: null, walk: null, wanjiru: null, bus: null, pedro: [70, 62, { size: 1.2 }], sun: [86, 24, { act: "grow" }], aylar: [30, 62, { size: 1.2 }], snow: [14, 24, { act: "spin" }] } },
            { caption: "هر کدام به زبان خودش سلام می‌کند: «سلام!»، «کونیچیوا!»، «هاباری!»، «اولا!»",
              at: { sun: null, snow: null, aylar: [86, 62], haruto: [62, 62], wanjiru: [38, 62], pedro: [14, 62], hi: [50, 28, { size: 1.3, act: "shake" }] } }
          ],
          question: "صبحانه هاروتو چه بود؟", pic: true,
          options: [{ label: "🫓", value: "نان و پنیر" }, { label: "🍚", value: "برنج و سوپ" }, { label: "🍌", value: "نان و موز" }], answer: "برنج و سوپ" },
        { type: "sort", prompt: "مثل هم یا فرق دارد؟",
          say: "این‌ها در همه بچه‌های دنیا مثل هم است، یا هر جا فرق دارد؟",
          baskets: [{ pic: "🤝", label: "همه بچه‌ها", value: "same" }, { pic: "🌈", label: "هر جا فرق دارد", value: "diff" }],
          items: [
            { pic: "😴", say: "خوابیدن", basket: "same" },
            { pic: "😂", say: "خندیدن", basket: "same" },
            { pic: "⚽", say: "دوست داشتن بازی", basket: "same" },
            { pic: "🗣️", say: "زبانی که با آن حرف می‌زنند", basket: "diff" },
            { pic: "🍳", say: "چیزی که صبحانه می‌خورند", basket: "diff" },
            { pic: "🌦️", say: "هوای شهرشان", basket: "diff" }
          ] },
        { type: "pairs", prompt: "چه کسی؟ چه چیزی؟", say: "یادت هست؟ هر بچه را با چیزی که در قصه داشت جفت کن.",
          pairs: [
            [{ pic: "👧🏻", say: "آیلار، از تبریز" }, { pic: "❄️", say: "برف زمستان" }],
            [{ pic: "👦🏻", say: "هاروتو، از ژاپن" }, { pic: "🍚", say: "صبحانه برنج" }],
            [{ pic: "👧🏿", say: "وانجیرو، از کنیا" }, { pic: "🚌", say: "اتوبوس مدرسه" }],
            [{ pic: "👦🏽", say: "پدرو، از برزیل" }, { pic: "☀️", say: "هوای گرم" }]
          ] },
        { type: "talk", scene: "👧🏻 👦🏻 👧🏿 👦🏽", caption: "اگر یک دوست از آن طرف دنیا داشتی، از او چه می‌پرسیدی؟ تو درباره خودت چه می‌گفتی؟" }
      ]
    },

    /* Sources: unit game practising world-seed-1 to world-seed-5 (family, rooms of a home, neighbourhood places and
       workers, Nowruz). Each step stands on its own for reviews. */
    {
      id: "world-seed-8", subject: "world", level: "seed", emoji: "🎲", title: "بازی خانه و محله",
      steps: [
        { type: "pairs", hidden: true, prompt: "هر کس کجا کار می‌کند؟ کارت‌ها را برگردان",
          say: "کارت‌ها را برگردان. هر کس را با جایی که کار می‌کند جفت کن.",
          pairs: [
            [{ pic: "🧑‍🍳", say: "نانوا" }, { pic: "🫓", say: "نانوایی" }],
            [{ pic: "👨‍🏫", say: "معلم" }, { pic: "🏫", say: "مدرسه" }],
            [{ pic: "👩‍⚕️", say: "پزشک" }, { pic: "🏥", say: "درمانگاه" }],
            [{ pic: "🧑‍🌾", say: "باغبان" }, { pic: "🌳", say: "پارک" }]
          ] },
        { type: "sort", prompt: "هر چیز در کدام اتاق است؟",
          say: "هر چیز را به اتاق خودش ببر: آشپزخانه، اتاق خواب یا حمام.",
          baskets: [{ pic: "🍳", label: "آشپزخانه", value: "kitchen" }, { pic: "🛏️", label: "اتاق خواب", value: "bedroom" }, { pic: "🛁", label: "حمام", value: "bath" }],
          items: [
            { pic: "🥄", say: "قاشق", basket: "kitchen" },
            { pic: "🍽️", say: "بشقاب", basket: "kitchen" },
            { pic: "🧸", say: "عروسک", basket: "bedroom" },
            { pic: "🛌", say: "بالش و پتو", basket: "bedroom" },
            { pic: "🪥", say: "مسواک", basket: "bath" },
            { pic: "🧼", say: "صابون", basket: "bath" }
          ] },
        { type: "order", prompt: "یک روز با خانواده", say: "یک روز با خانواده: اول چه کار می‌کنیم؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🍳", say: "صبحانه" }, { pic: "🎒", say: "مدرسه" }, { pic: "⚽", say: "بازی" }, { pic: "🛌", say: "خواب" }] },
        { type: "order", prompt: "نوروز به ترتیب", say: "برای نوروز اول چه کار می‌کنیم؟ به ترتیب بچین: خانه‌تکانی، سفره هفت‌سین، بعد دید و بازدید.", numbered: true,
          items: [{ pic: "🧹", say: "خانه‌تکانی" }, { pic: "🪞", say: "سفره هفت‌سین" }, { pic: "👵", say: "دید و بازدید" }] },
        { type: "sort", prompt: "برای هر کار کجا برویم؟",
          say: "برای هر کار کجا برویم؟ میوه‌فروشی، مدرسه یا پارک؟",
          baskets: [{ pic: "🍎", label: "میوه‌فروشی", value: "fruit" }, { pic: "🏫", label: "مدرسه", value: "school" }, { pic: "🌳", label: "پارک", value: "park" }],
          items: [
            { pic: "🍊", say: "پرتقال بخریم", basket: "fruit" },
            { pic: "🍉", say: "هندوانه بخریم", basket: "fruit" },
            { pic: "📚", say: "درس بخوانیم", basket: "school" },
            { pic: "✏️", say: "نوشتن یاد بگیریم", basket: "school" },
            { pic: "🛝", say: "سرسره‌بازی کنیم", basket: "park" },
            { pic: "🦆", say: "اردک‌ها را ببینیم", basket: "park" }
          ] }
      ]
    }
  );
})();
