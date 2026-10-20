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
  // The same room as the plan in the «خانه ما از بالا» scene (js/art/rig.js): change both together.
  bg: "wall",
  shapes: [
    { rect: [12, 12, 376, 276], kind: "floor" },
    { rect: [150, 3, 100, 10], kind: "water" },
    { rect: [388, 210, 10, 60], kind: "wood" },
    { rect: [120, 130, 160, 100], r: 6, kind: "rug" },
    { rect: [24, 24, 130, 80], r: 6, kind: "wood" },
    { rect: [34, 36, 34, 56], r: 6, kind: "block" },
    { rect: [300, 20, 80, 50], r: 3, kind: "wood" },
    { rect: [320, 120, 56, 70], r: 3, kind: "wood" },
    { rect: [286, 140, 28, 30], r: 5, kind: "wood" }
  ],
  places: [
    { id: "bed", name: "تخت", en: "bed", pic: "🛏️", at: [100, 64] },
    { id: "window", name: "پنجره", en: "window", pic: "🪟", at: [200, 34], size: 0.8 },
    { id: "door", name: "در اتاق", en: "door", pic: "🚪", at: [360, 240], size: 0.9 },
    { id: "desk", name: "میز و کتاب‌ها", en: "desk and books", pic: "📚", at: [348, 155] },
    { id: "ball", name: "توپ", en: "ball", pic: "⚽", at: [210, 175] },
    { id: "teddy", name: "عروسک خرسی", en: "teddy bear", pic: "🧸", at: [70, 240] },
    { id: "plant", name: "گلدان", en: "plant pot", pic: "🪴", at: [34, 268], size: 0.8 },
    { id: "cat", name: "گربه، بالای کمد", en: "cat, on the wardrobe", pic: "🐈", at: [340, 45] }
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
    { id: "yard", name: "حیاط", en: "yard", pic: "🌳", at: [72, 80], size: 1.2 },
    { id: "kitchen", name: "آشپزخانه", en: "kitchen", pic: "🍳", at: [211, 82] },
    { id: "bedroom", name: "اتاق خواب", en: "bedroom", pic: "🛏️", at: [326, 82] },
    { id: "hall", name: "هال", en: "living room", pic: "🛋️", at: [231, 213] },
    { id: "bath", name: "حمام", en: "bathroom", pic: "🛁", at: [346, 213], size: 0.9 },
    { id: "door", name: "در خانه", en: "front door", pic: "🚪", at: [128, 218], size: 0.8 }
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
    { id: "bakery", name: "نانوایی", en: "bakery", pic: "🫓", at: [56, 66] },
    { id: "fruit", name: "میوه‌فروشی", en: "fruit shop", pic: "🍎", at: [136, 66] },
    { id: "park", name: "پارک", en: "park", pic: "🌳", at: [308, 68], size: 1.2 },
    { id: "school", name: "مدرسه", en: "school", pic: "🏫", at: [92, 234], size: 1.1 },
    { id: "clinic", name: "درمانگاه", en: "clinic", pic: "🏥", at: [266, 234] },
    { id: "home", name: "خانه ما", en: "our home", pic: "🏠", at: [350, 234] }
  ]
};

/* A room from the side (world-seed-12): things on, under, next to and in front of the furniture, found by where
   they are. Only the targets and a few others are places; the furniture is the picture. */
B.MAPS.toys = {
  bg: "wall",
  shapes: [
    { rect: [0, 220, 400, 80], kind: "floor" },
    { rect: [150, 66, 110, 10], kind: "wood" },
    { rect: [14, 140, 112, 12], kind: "wood" }, { rect: [22, 152, 10, 68], kind: "wood" }, { rect: [108, 152, 10, 68], kind: "wood" },
    { rect: [186, 168, 58, 52], r: 2, kind: "sand" },
    { rect: [286, 150, 100, 24], r: 6, kind: "rug" }, { rect: [282, 172, 108, 22], kind: "wood" },
    { rect: [378, 110, 12, 84], kind: "wood" }, { rect: [284, 194, 8, 26], kind: "wood" }, { rect: [380, 194, 8, 26], kind: "wood" }
  ],
  places: [
    { id: "teddy", name: "عروسک خرسی، روی تخت", en: "teddy bear, on the bed", pic: "🧸", at: [326, 130] },
    { id: "ball", name: "توپ، زیر میز", en: "ball, under the table", pic: "⚽", at: [70, 200] },
    { id: "cat", name: "گربه، کنار جعبه", en: "cat, next to the box", pic: "🐈", at: [160, 200] },
    { id: "book", name: "کتاب‌ها، روی قفسه", en: "books, on the shelf", pic: "📚", at: [205, 46] },
    { id: "shoes", name: "کفش‌ها، زیر تخت", en: "shoes, under the bed", pic: "👟", at: [336, 208], size: 0.9 },
    { id: "car", name: "ماشین، جلوی جعبه", en: "car, in front of the box", pic: "🚗", at: [215, 232], size: 0.9 },
    { id: "plant", name: "گلدان، روی میز", en: "plant pot, on the table", pic: "🪴", at: [52, 116], size: 0.9 }
  ]
};

/* A park from above (world-seed-20): paths, a pond, a big tree, a slide, a bench and a flower bed, and four treasure
   spots (❌), each named by what it is next to. */
B.MAPS.park = {
  bg: "grass",
  shapes: [
    { rect: [20, 128, 360, 36], r: 18, kind: "sand" }, { rect: [182, 20, 36, 280], kind: "sand" },
    { circle: [300, 70, 42], kind: "water" }, { circle: [90, 70, 46], kind: "park" },
    { rect: [56, 196, 100, 64], r: 12, kind: "park" }, { rect: [278, 204, 74, 40], r: 6, kind: "block" },
    { rect: [120, 98, 44, 14], r: 3, kind: "wood" }
  ],
  deco: [{ pic: "🌷", at: [80, 214], size: 0.6 }, { pic: "🌼", at: [130, 244], size: 0.6 }, { pic: "🦆", at: [286, 60], size: 0.6 }],
  places: [
    { id: "gate", name: "در پارک", en: "park gate", pic: "🚪", at: [200, 278], size: 0.9 },
    { id: "tree", name: "درخت بزرگ", en: "big tree", pic: "🌳", at: [90, 70], size: 1.5 },
    { id: "pond", name: "حوض", en: "pond", pic: "⛲", at: [312, 82], size: 0.9 },
    { id: "slide", name: "سرسره", en: "slide", pic: "🛝", at: [315, 224] },
    { id: "bench", name: "نیمکت", en: "bench", pic: "🪑", at: [142, 92], size: 0.8 },
    { id: "flowers", name: "باغچه گل", en: "flower bed", pic: "🌷", at: [106, 228] },
    { id: "xPond", name: "ضربدر کنار حوض", en: "X next to the pond", pic: "❌", at: [356, 112], size: 0.6 },
    { id: "xSlide", name: "ضربدر کنار سرسره", en: "X next to the slide", pic: "❌", at: [252, 224], size: 0.6 },
    { id: "xTree", name: "ضربدر زیر درخت", en: "X under the tree", pic: "❌", at: [60, 96], size: 0.6 },
    { id: "xFlowers", name: "ضربدر کنار باغچه گل", en: "X next to the flower bed", pic: "❌", at: [40, 272], size: 0.6 }
  ]
};

/* A school plan from above (world-sprout-15): rooms around a corridor, and the yard. */
B.MAPS.school = {
  bg: "grass",
  shapes: [
    { rect: [30, 20, 340, 150], r: 6, kind: "wall" },
    { rect: [40, 30, 100, 56], kind: "floor" }, { rect: [150, 30, 100, 56], kind: "floor" }, { rect: [260, 30, 100, 56], kind: "floor" },
    { rect: [40, 104, 150, 56], kind: "floor" }, { rect: [200, 104, 70, 56], kind: "floor" }, { rect: [280, 104, 80, 56], kind: "floor" },
    { rect: [40, 88, 320, 14], kind: "sand" }, { rect: [190, 170, 20, 120], kind: "sand" },
    { rect: [30, 186, 150, 100], r: 8, kind: "park" }, { rect: [220, 186, 150, 100], r: 8, kind: "park" }
  ],
  deco: [{ pic: "✏️", at: [310, 58], size: 0.7 }, { pic: "🌳", at: [60, 270], size: 0.8 }, { pic: "🌳", at: [350, 270], size: 0.8 }],
  places: [
    { id: "office", name: "دفتر مدرسه", en: "school office", pic: "📋", at: [90, 58] },
    { id: "class", name: "کلاس دریا", en: "Darya's classroom", pic: "✏️", at: [200, 58] },
    { id: "library", name: "کتابخانه", en: "library", pic: "📚", at: [115, 132] },
    { id: "health", name: "اتاق بهداشت", en: "health room", pic: "🩺", at: [235, 132] },
    { id: "yard", name: "حیاط مدرسه", en: "schoolyard", pic: "⚽", at: [295, 236], size: 1.2 },
    { id: "gate", name: "در مدرسه", en: "school gate", pic: "🚪", at: [200, 280], size: 0.8 }
  ]
};

/* A neighbourhood map with symbols and a legend (world-sprout-35). */
B.MAPS.hood = {
  bg: "grass",
  shapes: [
    { rect: [0, 130, 400, 34], kind: "road" }, { rect: [250, 0, 34, 300], kind: "road" }, { d: "M0 147 H400", kind: "line" }, { d: "M267 0 V300", kind: "line" },
    { rect: [20, 20, 210, 96], r: 6, kind: "block" }, { rect: [300, 20, 86, 96], r: 6, kind: "park" }, { rect: [20, 180, 210, 100], r: 6, kind: "block" }, { rect: [300, 180, 86, 100], r: 6, kind: "block" }
  ],
  legend: [
    { pic: "🟥", name: "خانه نیما", en: "Nima's home" }, { pic: "🟡", name: "نانوایی", en: "bakery" }, { pic: "⭐", name: "مدرسه", en: "school" },
    { pic: "➕", name: "درمانگاه", en: "clinic" }, { pic: "🟢", name: "پارک", en: "park" }, { pic: "🔷", name: "ایستگاه اتوبوس", en: "bus stop" }
  ],
  places: [
    { id: "home", name: "خانه نیما", en: "Nima's home", pic: "🟥", at: [60, 230], size: 0.8 },
    { id: "bakery", name: "نانوایی", en: "bakery", pic: "🟡", at: [80, 70], size: 0.8 },
    { id: "school", name: "مدرسه", en: "school", pic: "⭐", at: [340, 230], size: 0.8 },
    { id: "clinic", name: "درمانگاه", en: "clinic", pic: "➕", at: [180, 70], size: 0.8 },
    { id: "park", name: "پارک", en: "park", pic: "🟢", at: [343, 68], size: 0.8 },
    { id: "bus", name: "ایستگاه اتوبوس", en: "bus stop", pic: "🔷", at: [200, 230], size: 0.8 }
  ]
};

/* Maps built from the map of Iran when they are first used (js/maps/iran.js loads after this file): the main
   rivers and Lake Urmia drawn roughly over the provinces (world-sapling-15), and a weather map (world-sapling-41). */
(function () {
  function iranShapes() {
    var m = B.MAPS.iran, out = [];
    m.abroad.forEach(function (d) { out.push({ d: d, kind: "sand" }); });
    m.provinces.forEach(function (p) { out.push({ d: p.d, kind: "land" }); });
    m.seas.forEach(function (sea) { out.push({ d: sea.d, kind: "water" }); });
    return out;
  }
  // a river as a thin band along its points (map units)
  function band(pts, w) {
    var a = pts.map(function (p) { return p[0] + " " + (p[1] - w); }), b = pts.slice().reverse().map(function (p) { return p[0] + " " + (p[1] + w); });
    return "M" + a.join("L") + "L" + b.join("L") + "Z";
  }
  var RIVERS = {
    karun: [[150, 168], [138, 176], [124, 180], [112, 186], [104, 198], [98, 210]],
    zayandeh: [[140, 158], [150, 160], [160, 161], [176, 166], [190, 172]],
    sefid: [[100, 84], [112, 80], [122, 74], [128, 68]],
    aras: [[34, 30], [60, 28], [90, 36], [114, 40]]
  };
  var cache = {};
  function lazy(name, make) {
    Object.defineProperty(B.MAPS, name, { configurable: true, enumerable: true, get: function () {
      if (!cache[name] && B.MAPS.iran) cache[name] = make();
      return cache[name];
    } });
  }
  lazy("rivers", function () {
    var m = B.MAPS.iran;
    return { view: m.view, bg: "water",
      shapes: iranShapes().concat(Object.keys(RIVERS).map(function (k) { return { d: band(RIVERS[k], 1.6), kind: "water" }; })),
      places: [
        { id: "karun", name: "رود کارون", en: "the Karun river", pic: "💧", at: [124, 180], size: 0.7 },
        { id: "zayandeh", name: "زاینده‌رود", en: "the Zayandeh Rud", pic: "💧", at: [160, 161], size: 0.7 },
        { id: "sefid", name: "سفیدرود", en: "the Sefidrud", pic: "💧", at: [112, 80], size: 0.7 },
        { id: "aras", name: "رود ارس", en: "the Aras river", pic: "💧", at: [62, 28], size: 0.7 },
        { id: "urmia", name: "دریاچه ارومیه", en: "Lake Urmia", d: "M62 51c4 0 6 6 6 11s-2 11-6 11-6-6-6-11 2-11 6-11z", kind: "water", at: [62, 62] },
        { id: "gulf", name: "خلیج فارس", en: "the Persian Gulf", pic: "🌊", at: [150, 250], size: 0.8 },
        { id: "caspian", name: "دریای خزر", en: "the Caspian Sea", pic: "🌊", at: [170, 40], size: 0.8 }
      ] };
  });
  var WEATHER = { tabriz: "❄️", ardabil: "❄️", rasht: "🌧️", sari: "🌧️", tehran: "⛅", mashhad: "⛅", yazd: "☀️", shiraz: "☀️", "bandar-abbas": "☀️", ahvaz: "☀️" };
  lazy("weather", function () {
    var m = B.MAPS.iran, byId = {};
    m.cities.forEach(function (c) { byId[c.id] = c; });
    return { view: m.view, bg: "water", shapes: iranShapes(),
      legend: [{ pic: "☀️", name: "آفتابی", en: "sunny" }, { pic: "⛅", name: "نیمه‌ابری", en: "partly cloudy" }, { pic: "🌧️", name: "بارانی", en: "rainy" }, { pic: "❄️", name: "برفی", en: "snowy" }],
      places: Object.keys(WEATHER).map(function (id) { var c = byId[id]; return { id: id, name: c.name + "، " + { "☀️": "آفتابی", "⛅": "نیمه‌ابری", "🌧️": "بارانی", "❄️": "برفی" }[WEATHER[id]], en: c.en, pic: WEATHER[id], at: c.at, size: 0.8 }; }) };
  });
})();

/* A village from above, as a picture (world-sprout-2) and as a map with symbols and a legend: the same places in
   the same spots, so the child can see how a picture becomes a map. */
var VILLAGE_SHAPES = [
  { d: "M350 0 C325 80 385 170 345 300 L380 300 C420 170 360 80 385 0 Z", kind: "water" },
  { rect: [0, 140, 340, 24], kind: "road" },
  { rect: [176, 0, 24, 140], kind: "road" },
  { rect: [16, 186, 120, 96], r: 6, kind: "park" },
  { rect: [230, 10, 96, 112], r: 6, kind: "sand" }
];
B.MAPS.village = {
  bg: "grass", shapes: VILLAGE_SHAPES,
  deco: [{ pic: "🌾", at: [278, 66], size: 0.8 }, { pic: "🐑", at: [110, 260], size: 0.7 }],
  places: [
    { id: "home", name: "خانه ستاره", en: "Setareh's home", pic: "🏠", at: [70, 80] },
    { id: "garden", name: "باغ", en: "orchard", pic: "🌳", at: [60, 226], size: 1.1 },
    { id: "bakery", name: "نانوایی", en: "bakery", pic: "🫓", at: [140, 92] },
    { id: "school", name: "مدرسه", en: "school", pic: "🏫", at: [240, 200] },
    { id: "clinic", name: "خانه بهداشت", en: "health house", pic: "🏥", at: [300, 260] },
    { id: "spring", name: "چشمه", en: "spring", pic: "⛲", at: [318, 180], size: 0.9 }
  ]
};
B.MAPS.villageKey = {
  bg: "grass", shapes: VILLAGE_SHAPES,
  legend: [
    { pic: "🟥", name: "خانه", en: "home" }, { pic: "🟢", name: "درخت و باغ", en: "trees, orchard" },
    { pic: "🟡", name: "نانوایی", en: "bakery" }, { pic: "⭐", name: "مدرسه", en: "school" },
    { pic: "➕", name: "خانه بهداشت", en: "health house" }, { pic: "🔵", name: "آب و چشمه", en: "water, spring" }
  ],
  places: [
    { id: "home", name: "خانه ستاره", en: "Setareh's home", pic: "🟥", at: [70, 80], size: 0.8 },
    { id: "garden", name: "باغ", en: "orchard", pic: "🟢", at: [60, 226], size: 0.8 },
    { id: "bakery", name: "نانوایی", en: "bakery", pic: "🟡", at: [140, 92], size: 0.8 },
    { id: "school", name: "مدرسه", en: "school", pic: "⭐", at: [240, 200], size: 0.8 },
    { id: "clinic", name: "خانه بهداشت", en: "health house", pic: "➕", at: [300, 260], size: 0.8 },
    { id: "spring", name: "چشمه", en: "spring", pic: "🔵", at: [318, 180], size: 0.8 }
  ]
};

(function () {
  var HOME = { title: "🏠 در خانه (برای والدین)", note: "کاری ساده برای انجام دادن با هم، بدون صفحه." };
  function home(s) { s.type = "home"; s.title = HOME.title; s.note = HOME.note; return s; }
  /* Recording slots for words in Iran's other languages (world-sprout-6). The device voice is Persian and would
     say these words wrongly, so it never says them. When a native speaker records a word, put the file in audio/world/
     and its path here (e.g. az: "audio/world/hello-az.mp3"); until then the child sees the word and hears Persian. */
  var REC = { az: null, ku: null, ar: null, tk: null, bal: null, hy: null, azThanks: null, kuThanks: null, arThanks: null, balThanks: null };

  /* Tracks for the people in the scenes (drawn by B.worldArt.person in js/art/rig-world.js, with the pieces armL,
     armR, legL, legR, head and the face). walk: moves a person (to {x, y} or along a path) with the legs swinging;
     hop: little jumps on one leg; wave: one arm up, waving; eat: a hand to the mouth and back, n times; talk: the
     mouth opening and closing. All of them end where they began, except the walk's place. */
  function walk(id, to, at, dur, still) {
    at = at || 0; dur = dur || 2000;
    var n = Math.max(2, Math.round(dur / 300)); n += n % 2;
    var mv = typeof to === "string" ? { id: id, path: to, at: at, dur: dur, ease: "linear" } : { id: id, to: to, at: at, dur: dur, ease: "linear" };
    var t = [mv, { id: id + ".legL", to: { r: 14 }, at: at, dur: dur, yoyo: true, times: n }, { id: id + ".legR", to: { r: -14 }, at: at, dur: dur, yoyo: true, times: n }];
    // still: the arms stay as they are (holding hands, carrying something)
    return still ? t : t.concat([{ id: id + ".armL", to: { r: "-8" }, at: at, dur: dur, yoyo: true, times: n }, { id: id + ".armR", to: { r: "-8" }, at: at, dur: dur, yoyo: true, times: n }]);
  }
  function wave(id, at, dur, arm) {
    arm = arm || "armR"; dur = dur || 1800;
    var up = arm === "armR" ? -150 : 150, by = arm === "armR" ? 25 : -25;
    return [{ id: id + "." + arm, to: { r: up }, at: at, dur: 300 }, { id: id + "." + arm, to: { r: up + by }, at: at + 300, dur: dur - 600, yoyo: true, times: 4 },
      { id: id + "." + arm, to: { r: 0 }, at: at + dur - 300, dur: 300 }];
  }
  function eat(id, at, n, arm) {
    arm = arm || "armR";
    var r = arm === "armR" ? 138 : -138;
    return [{ id: id + "." + arm, to: { r: r }, at: at, dur: 1000 * (n || 2), yoyo: true, times: 2 * (n || 2) }];
  }
  function talk(id, at, dur) {
    var n = Math.max(2, Math.round(dur / 260)); n += n % 2;
    return [{ id: id + ".smile", to: { o: 0 }, at: at, dur: 100 }, { id: id + ".laugh", to: { o: 1 }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".smile", to: { o: 1 }, at: at + dur, dur: 100 }];
  }
  function hop(id, to, at, dur, n) {
    n = n || 4;
    return [{ id: id + ".legR", to: { r: -40 }, at: at, dur: 200 }, { id: id, to: to, at: at + 200, dur: dur, ease: "linear" },
      { id: id, to: { sy: 0.9 }, at: at + 200, dur: dur, yoyo: true, times: 2 * n }, { id: id + ".legR", to: { r: 0 }, at: at + 200 + dur, dur: 200 }];
  }
  function show(ids, at, dur, o) { return ids.map(function (id) { return { id: id, to: { o: o == null ? 1 : o }, at: at || 0, dur: dur || 500 }; }); }
  function hide(ids, at, dur) { return show(ids, at, dur || 400, 0); }
  function pulse(id, at, s, dur) { return { id: id, to: { s: s || 1.25 }, at: at, dur: dur || 700, yoyo: true, times: 2 }; }
  function D() { return [].concat.apply([], arguments); }
  /* A drawing for the source step (look closely): an inline SVG picture, so it needs no image file. body is SVG in
     the units of vb ("x y w h"). */
  function svgImg(body, vb) {
    return "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '"><g stroke="#3d2c22" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">' + body + "</g></svg>");
  }
  var SRC = {
    // a broken pot from long ago, painted with a zigzag and a mountain goat (Sialk style)
    shard: svgImg('<path d="M-22-10l14-8 22 2 10 12-4 14-20 6-18-6z" fill="#d38a5a"/><path d="M-18-8l6 4 6-4 6 4 6-4 6 4 6-4" fill="none" stroke-width="1.2"/>' +
      '<ellipse cx="0" cy="7" rx="7" ry="2.6" fill="#3d2c22"/><path d="M-5 8l-1 6M-2 9v5M3 9v5M6 8l1 6M6 6l3-4" fill="none" stroke-width="1.1"/>' +
      '<ellipse cx="9.6" cy="1.4" rx="2" ry="1.3" fill="#3d2c22"/><path d="M9 0c-2-8-12-10-16-3" fill="none" stroke-width="1.5"/>', "-30 -26 60 50"),
    // a painted pot in the style of Tepe Sialk: a zigzag band, a row of birds and a mountain goat with great horns
    pot: svgImg('<path d="M-16 24c-12-8-14-24-6-36l-2-8h32l-2 8c8 12 6 28-6 36z" fill="#d9a06a"/><path d="M-16 24h32" fill="none"/>' +
      '<path d="M-20-10l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" fill="none" stroke-width="1.4"/>' +
      '<path d="M-14-16l2-2 2 2M-6-16l2-2 2 2M2-16l2-2 2 2M10-16l2-2 2 2" fill="none" stroke-width="1"/>' +
      '<ellipse cx="0" cy="8" rx="7" ry="2.8" fill="#3d2c22"/><path d="M-5 9l-1 7M-2 10v6M3 10v6M6 9l1 7M6 7l3-4" fill="none" stroke-width="1.2"/>' +
      '<ellipse cx="9.6" cy="2.4" rx="2" ry="1.3" fill="#3d2c22"/><path d="M9 1c-2-9-13-11-17-3" fill="none" stroke-width="1.6"/>', "-30 -32 60 60"),
    // an old black-and-white (sepia) photo of a street: an old house with an arched door, a tree and a bicycle
    oldphoto: svgImg('<rect x="-30" y="-22" width="60" height="44" fill="#f4efe6"/><rect x="-27" y="-19" width="54" height="36" fill="#d8c8a8" stroke="none"/>' +
      '<rect x="-16" y="-10" width="28" height="22" fill="#bfa880"/><rect x="-18" y="-12" width="32" height="3" fill="#a89470"/><path d="M-6 12V1a5 5 0 0 1 10 0v11z" fill="#8a7458"/>' +
      '<path d="M-27 12h54" fill="none" stroke="#8a7458"/><path d="M18 12V1" fill="none" stroke="#6b5a44" stroke-width="1.4"/><circle cx="18" cy="-5" r="6.4" fill="#a89470"/>' +
      '<circle cx="-22" cy="9" r="2.6" fill="none" stroke="#6b5a44" stroke-width=".8"/><circle cx="-14" cy="9" r="2.6" fill="none" stroke="#6b5a44" stroke-width=".8"/>' +
      '<path d="M-22 9l4-5h4v5M-18 4l-1-2M-15 4h2" fill="none" stroke="#6b5a44" stroke-width=".8"/>', "-32 -24 64 48"),
    // an old sepia photo of a little steam train with people watching it
    train: svgImg('<rect x="-34" y="-24" width="68" height="48" fill="#f4efe6"/><rect x="-31" y="-21" width="62" height="40" fill="#d8c8a8" stroke="none"/>' +
      '<path d="M-31 10h62" fill="none" stroke="#6b5a44"/><rect x="-26" y="-4" width="16" height="10" rx="1.4" fill="#5a4a38"/><rect x="-16" y="-10" width="7" height="7" fill="#5a4a38"/>' +
      '<rect x="-24" y="-11" width="3" height="7" fill="#5a4a38"/><circle cx="-22.5" cy="-15" r="3" fill="#bfae90" stroke="none"/><circle cx="-20" cy="-19" r="2.4" fill="#cdbd9f" stroke="none"/>' +
      '<rect x="-8" y="-6" width="20" height="12" rx="1" fill="#7a6a54"/><rect x="-5" y="-3" width="4" height="4" fill="#d8c8a8"/><rect x="2" y="-3" width="4" height="4" fill="#d8c8a8"/>' +
      '<circle cx="-22" cy="8" r="2" fill="#3d3329"/><circle cx="-14" cy="8" r="2" fill="#3d3329"/><circle cx="-4" cy="8" r="1.6" fill="#3d3329"/><circle cx="8" cy="8" r="1.6" fill="#3d3329"/>' +
      '<g fill="#6b5a44"><circle cx="18" cy="2" r="1.6"/><path d="M16 10v-6h4v6z"/><circle cx="24" cy="1" r="1.6"/><path d="M22 10v-7h4v7z"/></g>', "-36 -26 72 52"),
    // a stone hand axe, chipped on both faces
    handaxe: svgImg('<path d="M0-26c8 4 14 14 14 26S8 22 0 24-14 12-14 0-8-22 0-26z" fill="#8a8274"/>' +
      '<path d="M0-26l-4 10 6 6-4 10 4 8-2 10M-12-6l8 0M12-6l-8-2M-12 8l8-2M12 8l-8 0M-4 18l4-6 4 6" fill="none" stroke="#5a554c" stroke-width=".9"/>' +
      '<path d="M-4-14c2-2 4-2 6 0M-6 2c2-2 5-2 7 0" fill="none" stroke="#b0a898" stroke-width=".8"/>', "-24 -30 48 58")
  };

  B.LESSONS.push(
    // ---------------- Iran and the world: Seed (me, my family, my home, my neighbourhood) ----------------

    /* Sources: family as the first circle of social studies (NCSS, "Individual Development and Identity";
       expanding horizons); family diversity shown without judgement (single-parent, extended and large families
       are all common in Iran). Names from different regions: کیان (Shiraz), مراد (Gonbad-e Kavus, Turkmen),
       دلارام (Rasht), حمید (Ahvaz). Teacher review: whether the families feel familiar in every region. */
    {
      id: "world-seed-1", subject: "world", level: "seed", emoji: "👨‍👩‍👧", title: "من و خانواده‌ام",
      steps: [
        { type: "scene", prompt: "خانواده کیان", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, sun: { art: "w-win-sun", o: 0 }, dusk: { art: "w-win-dusk", o: 0 }, night: { art: "w-win-night", o: 0 },
            map: { art: "w-map-shiraz", at: [30, 27], s: 0.9 }, dim: { art: "w-night-dim", o: 0 },
            stove: { art: "w-stove", at: [34, 87], s: 1.25, o: 0 },
            gran: { art: "w-gran", at: [146, 86], s: 1.25, o: 0 }, dad: { art: "w-dad", at: [146, 86], s: 1.25, o: 0 }, mom: { art: "w-mom", at: [146, 86], s: 1.25, o: 0 },
            kian: { art: "w-boy", at: [146, 86], s: 1.25, o: 0 }, baby: { art: "w-baby", at: [66, 88], s: 1.4, o: 0 },
            milk: { art: "w-baby-milk", at: [80, 86], s: 1.8, o: 0 }, ball: { art: "w-ball", at: [104, 64], s: 1.2, o: 0 },
            granS: { art: "w-gran-sit", at: [110, 84], s: 1.25, o: 0 }, book: { art: "w-book", at: [110, 74], s: 1.4, o: 0 },
            kianS: { art: "w-boy-sit", at: [74, 86], s: 1.25, o: 0 }, babyS: { art: "w-baby", at: [52, 87], s: 1.3, o: 0 },
            dadE: { art: "w-dad-sit", at: [38, 74], s: 1.2, o: 0 }, kianE: { art: "w-boy-sit", at: [60, 74], s: 1.2, o: 0 }, babyE: { art: "w-baby", at: [80, 74], s: 1.25, o: 0 },
            momE: { art: "w-mom-sit", at: [100, 74], s: 1.2, o: 0 }, granE: { art: "w-gran-sit", at: [122, 74], s: 1.2, o: 0 },
            sofreh: { art: "w-sofreh", at: [80, 83], s: 1.3, o: 0 }
          },
          scenes: [
            { caption: "این کیان است. در شیراز زندگی می‌کند.", hold: 5200, do: D(
              show(["kian"], 0, 300), walk("kian", { x: 80 }, 0, 2200), wave("kian", 2300, 1800),
              [pulse("map.dot", 2600, 2.2, 1000), pulse("map.dot", 3800, 2.2, 1000)]) },
            { caption: "این مادر و پدر کیان هستند.", hold: 5200, do: D(
              show(["mom"], 0, 300), walk("mom", { x: 108 }, 0, 1400),
              show(["dad"], 600, 300), walk("dad", { x: 52 }, 600, 2800),
              wave("mom", 1600, 1800, "armL"), wave("dad", 3500, 1600)) },
            { caption: "این نازنین است، خواهر کوچک کیان. مادربزرگ هم با آن‌ها زندگی می‌کند.", hold: 6400, do: D(
              show(["baby"], 0, 500), [{ id: "baby.armL", to: { r: 120 }, at: 500, dur: 1600, yoyo: true, times: 4 }, { id: "baby.armR", to: { r: -120 }, at: 500, dur: 1600, yoyo: true, times: 4 },
                { id: "baby.smile", to: { o: 0 }, at: 500, dur: 200 }, { id: "baby.laugh", to: { o: 1 }, at: 500, dur: 200 }],
              show(["gran"], 2600, 400), walk("gran", { x: 132 }, 2600, 2400), wave("gran", 5100, 1300, "armL")) },
            { caption: "صبح، پدر صبحانه درست می‌کند.", key: 3200, hold: 5200, do: D(
              hide(["mom", "gran", "kian", "baby"]), show(["sun", "stove"], 300, 600),
              walk("dad", { x: 70 }, 300, 1100),
              [{ id: "dad.armL", to: { r: 100 }, at: 1300, dur: 500 }, { id: "dad.armL", to: { r: 94 }, at: 1800, dur: 2400, yoyo: true, times: 8 },
                { id: "stove.pan", to: { x: "+1.6" }, at: 1800, dur: 2400, yoyo: true, times: 8 },
                { emit: "bubble", where: [37, 54], spread: [8, 2], n: 8, rise: -10, at: 1800, dur: 2400 },
                { id: "dad.armL", to: { r: 0 }, at: 4400, dur: 500 }]) },
            { caption: "نازنین شیر می‌خورد.", key: 2600, hold: 4400, do: D(
              hide(["dad", "stove"]), show(["milk"], 300, 400),
              [{ id: "milk.armR", to: { r: 133 }, at: 900, dur: 700 }, { id: "milk.milk", to: { sx: 0.3 }, at: 1700, dur: 2000 },
                { id: "milk.head", to: { r: -6 }, at: 1700, dur: 1000, yoyo: true, times: 2 }, { id: "milk.armR", to: { r: 0 }, at: 3800, dur: 600 }]) },
            { caption: "عصر، مادر با کیان توپ‌بازی می‌کند.", key: 3000, hold: 5600, do: D(
              hide(["milk", "sun"]), show(["dusk"], 0, 800), show(["mom", "kian"], 300, 400),
              [{ id: "mom", to: { x: 112 }, dur: 1 }, { id: "kian", to: { x: 48 }, dur: 1 }, { id: "ball", to: { x: 102, y: 64 }, dur: 1 }],
              show(["ball"], 600, 200),
              [{ id: "mom.armL", to: { r: 60 }, at: 900, dur: 300 }, { id: "mom.armL", to: { r: 0 }, at: 1200, dur: 400 },
                { id: "ball", path: "M102 64Q80 30 58 64", at: 1200, dur: 1100, ease: "linear" },
                { id: "kian.armR", to: { r: -60 }, at: 2100, dur: 300 }, { id: "kian.armR", to: { r: 0 }, at: 2500, dur: 400 },
                { id: "ball", path: "M58 64Q80 26 102 64", at: 2500, dur: 1100, ease: "linear" },
                { id: "mom.armL", to: { r: 60 }, at: 3400, dur: 300 }, { id: "mom.armL", to: { r: 0 }, at: 3800, dur: 400 },
                { id: "ball", path: "M102 64Q80 30 58 64", at: 3800, dur: 1100, ease: "linear" },
                { id: "kian.laugh", to: { o: 1 }, at: 2500, dur: 300 }, { id: "kian.smile", to: { o: 0 }, at: 2500, dur: 300 }]) },
            { caption: "شب، مادربزرگ برای بچه‌ها قصه می‌گوید.", key: 3000, hold: 6000, do: D(
              hide(["mom", "kian", "ball", "dusk"]), show(["night", "dim"], 0, 900), show(["granS", "book", "kianS", "babyS"], 500, 600),
              talk("granS", 1300, 4200),
              [{ id: "book.page", to: { sx: -1 }, at: 2400, dur: 700 }, { id: "granS.head", to: { r: 6 }, at: 1300, dur: 4200, yoyo: true, times: 6 },
                { id: "kianS.head", to: { r: -8 }, at: 1600, dur: 600 }, { id: "babyS.head", to: { r: -8 }, at: 1800, dur: 600 }]) },
            { caption: "همه با هم شام می‌خورند. نوش جان!", key: 3000, hold: 5600, do: D(
              hide(["granS", "book", "kianS", "babyS"]), show(["sofreh", "dadE", "kianE", "babyE", "momE", "granE"], 300, 700),
              eat("dadE", 1200, 2, "armR"), eat("kianE", 1500, 2, "armL"), eat("momE", 1300, 2, "armL"), eat("granE", 1700, 2, "armR"),
              [{ emit: "bubble", where: [93, 70], spread: [4, 2], n: 8, rise: -10, at: 1000, dur: 3600 },
                { id: "babyE.armL", to: { r: 110 }, at: 1200, dur: 2400, yoyo: true, times: 4 }, { id: "babyE.armR", to: { r: -110 }, at: 1200, dur: 2400, yoyo: true, times: 4 }]) }
          ] },
        { type: "pairs", prompt: "چه کسی چه کار کرد؟",
          say: "در خانواده کیان، چه کسی چه کار کرد؟ جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "👨", say: "پدر" }, { pic: "🍳", say: "صبحانه درست کرد" }],
            [{ pic: "👩", say: "مادر" }, { pic: "⚽", say: "توپ‌بازی کرد" }],
            [{ pic: "👵", say: "مادربزرگ" }, { pic: "📖", say: "قصه گفت" }],
            [{ pic: "👶", say: "نازنین" }, { pic: "🍼", say: "شیر خورد" }]
          ] },
        { type: "scene", prompt: "هر خانواده‌ای یک جور است", bg: "#fffaf0",
          parts: {
            r1: { art: "w-room3" }, r2: { art: "w-room", at: [160, 0] }, r3: { art: "w-room4", at: [320, 0] },
            m1: { art: "w-map-gonbad", at: [118, 25], s: 0.75 }, m2: { art: "w-map-rasht", at: [278, 25], s: 0.75 }, m3: { art: "w-map-ahvaz", at: [438, 25], s: 0.75 },
            gran: { art: "w-gran2", at: [24, 86], s: 1.2, o: 0 }, mom: { art: "w-mom2", at: [46, 86], s: 1.2, o: 0 }, murad: { art: "w-murad", at: [146, 86], s: 1.25 },
            dad: { art: "w-dad2", at: [98, 86], s: 1.2, o: 0 }, grandpa: { art: "w-grandpa", at: [124, 86], s: 1.2, o: 0 },
            mom2: { art: "w-mom", at: [252, 86], s: 1.2 }, del: { art: "w-girl2", at: [228, 86], s: 1.25 },
            s2: { art: "w-girl3", at: [356, 86], s: 1.15 }, s1: { art: "w-girl", at: [378, 86], s: 1.15 }, hamid: { art: "w-boy3", at: [400, 86], s: 1.25 },
            b1: { art: "w-boy2", at: [422, 86], s: 1.15 }, b2: { art: "w-boy4", at: [444, 86], s: 1.15 },
            h1: { art: "w-heart", at: [80, -16], s: 3, o: 0 }, h2: { art: "w-heart", at: [240, -16], s: 3, o: 0 }, h3: { art: "w-heart", at: [400, -16], s: 3, o: 0 }
          },
          scenes: [
            { caption: "این مراد است. در گنبد، با پدر و مادر و پدربزرگ و مادربزرگش زندگی می‌کند.", hold: 8000, do: D(
              walk("murad", { x: 72 }, 0, 2200), wave("murad", 2300, 1500), [pulse("m1.dot", 2400, 2.2, 1000)],
              show(["dad"], 3600, 500), [{ id: "dad", to: { y: "-3" }, at: 3600, dur: 500, yoyo: true, times: 2 }],
              show(["mom"], 4300, 500), [{ id: "mom", to: { y: "-3" }, at: 4300, dur: 500, yoyo: true, times: 2 }],
              show(["grandpa"], 5200, 500), [{ id: "grandpa", to: { y: "-3" }, at: 5200, dur: 500, yoyo: true, times: 2 }],
              show(["gran"], 6000, 500), [{ id: "gran", to: { y: "-3" }, at: 6000, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "این دلارام است. در رشت، با مادرش زندگی می‌کند.", key: 3600, hold: 5600, do: D(
              [{ cam: { x: 240 }, dur: 1600 }, pulse("m2.dot", 1800, 2.2, 1000)], wave("del", 1900, 1600, "armL"),
              [{ id: "mom2.armL", to: { r: 50 }, at: 3300, dur: 700 }, { id: "del.armR", to: { r: -40 }, at: 3300, dur: 700 }]) },
            { caption: "این حمید است. در اهواز زندگی می‌کند. دو برادر و دو خواهر دارد!", key: 5000, hold: 7200, do: D(
              [{ cam: { x: 400 }, dur: 1600 }, pulse("m3.dot", 2200, 2.2, 1000)], wave("hamid", 1800, 1600),
              [{ id: "b1", to: { y: "-4" }, at: 4300, dur: 500, yoyo: true, times: 2 }, { id: "b2", to: { y: "-4" }, at: 4600, dur: 500, yoyo: true, times: 2 },
                { id: "s1", to: { y: "-4" }, at: 5300, dur: 500, yoyo: true, times: 2 }, { id: "s2", to: { y: "-4" }, at: 5600, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "خانواده‌ها با هم فرق دارند: کوچک و بزرگ. ولی همه همدیگر را دوست دارند.", hold: 8000, do: D(
              [{ cam: { x: 240, y: 36, zoom: 0.33 }, dur: 2200 },
                { id: "mom2.armL", to: { r: 0 }, dur: 400 }, { id: "del.armR", to: { r: 0 }, dur: 400 }],
              show(["h1", "h2", "h3"], 3800, 500), [pulse("h1", 4300, 1.15), pulse("h2", 4500, 1.15), pulse("h3", 4700, 1.15)],
              [{ id: "dad.armL", to: { r: 60 }, at: 3800, dur: 600 }, { id: "mom.armR", to: { r: -60 }, at: 3800, dur: 600 },
                { id: "mom2.armL", to: { r: 50 }, at: 3800, dur: 600 }, { id: "del.armR", to: { r: -40 }, at: 3800, dur: 600 },
                { id: "hamid.armL", to: { r: 60 }, at: 3800, dur: 600 }, { id: "hamid.armR", to: { r: -60 }, at: 3800, dur: 600 },
                { id: "murad.armL", to: { r: 60 }, at: 3800, dur: 600 }, { id: "murad.armR", to: { r: -60 }, at: 3800, dur: 600 }]) }
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

    /* Sources: "my own past" as the first step of historical thinking (NCSS C3 D2.His.2.K–2: compare life in the past
       and now; England KS1 history, "changes within living memory"); stages of life shown without ages. Real growth:
       toddlers walk at about one year; families mark children's height on a wall or a door. Parent note: some
       children have no baby photos (adoption, moving, loss), so any picture, a story or a drawing will do. */
    {
      id: "world-seed-9", subject: "world", level: "seed", emoji: "👶", title: "وقتی کوچک بودم",
      steps: [
        { type: "scene", prompt: "ترانه بزرگ می‌شود", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, meadow: { art: "w-meadow", o: 0 }, chart: { art: "w-height", at: [20, 0], o: 0 },
            baby: { art: "w-baby-milk", at: [80, 86], s: 1.8 },
            toddler: { art: "w-toddler", at: [46, 86], s: 1.3, o: 0 }, momT: { art: "w-mom", at: [118, 86], s: 1.2, o: 0 },
            girl: { art: "w-taraneh", at: [30, 86], s: 1.2, o: 0 }, dad: { art: "w-dad", at: [134, 86], s: 1.2, o: 0 }, ball: { art: "w-ball", at: [128, 58], s: 1.2, o: 0 },
            momH: { art: "w-mom-pencil", at: [24, 62], s: 1.2, o: 0 }, girlH: { art: "w-taraneh", at: [66, 60], s: 0.75, o: 0 },
            l1: { art: "w-baby", at: [140, 84], s: 1.4, o: 0 }, a1: { art: "w-arrow", at: [124, 70], s: 1.2, o: 0 },
            l2: { art: "w-boy", at: [106, 86], s: 1.15, o: 0 }, a2: { art: "w-arrow", at: [88, 70], s: 1.2, o: 0 },
            l3: { art: "w-dad2", at: [68, 86], s: 1.15, o: 0 }, a3: { art: "w-arrow", at: [50, 70], s: 1.2, o: 0 },
            l4: { art: "w-grandpa", at: [28, 86], s: 1.15, o: 0 },
            granS: { art: "w-gran-sit", at: [110, 82], s: 1.25, o: 0 }, girlS: { art: "w-taraneh-sit", at: [48, 82], s: 1.25, o: 0 },
            album: { art: "w-album", at: [80, 89], s: 1.7, o: 0 }
          },
          scenes: [
            { caption: "این ترانه است، وقتی نوزاد بود. خیلی کوچک بود و فقط شیر می‌خورد.", key: 3000, hold: 5600, do: [
              { id: "baby.armR", to: { r: 133 }, at: 900, dur: 700 }, { id: "baby.milk", to: { sx: 0.3 }, at: 1700, dur: 2200 },
              { id: "baby.head", to: { r: -6 }, at: 1700, dur: 1100, yoyo: true, times: 2 }, { id: "baby.armR", to: { r: 0 }, at: 4100, dur: 600 }] },
            { caption: "کمی بزرگ‌تر شد و راه رفتن یاد گرفت. تاتی‌تاتی تا پیش مادرش رفت!", key: 3400, hold: 6800, do: D(
              hide(["baby"]), show(["toddler", "momT"], 300, 500),
              [{ id: "momT.armL", to: { r: 70 }, at: 800, dur: 600 }],
              walk("toddler", { x: 96 }, 1200, 4400),
              [{ id: "toddler", to: { r: 5 }, at: 1200, dur: 4400, yoyo: true, times: 8 },
                { id: "toddler.smile", to: { o: 0 }, at: 5400, dur: 200 }, { id: "toddler.laugh", to: { o: 1 }, at: 5400, dur: 200 },
                { id: "momT.smile", to: { o: 0 }, at: 5600, dur: 200 }, { id: "momT.laugh", to: { o: 1 }, at: 5600, dur: 200 }]) },
            { caption: "حالا ترانه بزرگ شده. می‌دود و توپ را می‌گیرد.", key: 4600, hold: 6400, do: D(
              hide(["toddler", "momT", "room"]), show(["meadow", "girl", "dad"], 0, 600),
              walk("girl", { x: 70 }, 800, 1400),
              [{ id: "dad.armL", to: { r: 80 }, at: 2200, dur: 400 }, { id: "ball", to: { o: 1 }, at: 2200, dur: 200 },
                { id: "dad.armL", to: { r: 0 }, at: 2700, dur: 400 },
                { id: "girl.armL", to: { r: 130 }, at: 2400, dur: 400 }, { id: "girl.armR", to: { r: -130 }, at: 2400, dur: 400 },
                { id: "ball", path: "M128 58Q100 24 71 54", at: 2700, dur: 1300, ease: "linear" },
                { id: "girl.smile", to: { o: 0 }, at: 4100, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 4100, dur: 200 }]) },
            { caption: "هر سال، مادر قد ترانه را روی دیوار علامت زد. ترانه هر سال بلندتر شد!", key: 10200, hold: 11400, do: D(
              hide(["meadow", "girl", "dad", "ball"]), show(["room", "chart", "momH", "girlH"], 0, 700),
              [{ id: "momH.armR", to: { r: -80 }, at: 1200, dur: 700 }, { id: "chart.m1", to: { o: 1 }, at: 2000, dur: 400 }, { id: "momH.armR", to: { r: 0 }, at: 2700, dur: 500 },
                { id: "girlH", to: { s: 1 }, at: 3300, dur: 1600 },
                { id: "momH.armR", to: { r: -99 }, at: 5100, dur: 700 }, { id: "chart.m2", to: { o: 1 }, at: 5900, dur: 400 }, { id: "momH.armR", to: { r: 0 }, at: 6600, dur: 500 },
                { id: "girlH", to: { s: 1.25 }, at: 7200, dur: 1600 },
                { id: "momH.armR", to: { r: -120 }, at: 9000, dur: 700 }, { id: "chart.m3", to: { o: 1 }, at: 9800, dur: 400 },
                { id: "girlH.smile", to: { o: 0 }, at: 10000, dur: 200 }, { id: "girlH.laugh", to: { o: 1 }, at: 10000, dur: 200 }]) },
            { caption: "همه آدم‌ها بزرگ می‌شوند: اول نوزادند، بعد بچه، بعد بزرگ، و بعد پیر می‌شوند، مثل پدربزرگ.", key: 8400, hold: 9000, do: D(
              hide(["chart", "momH", "girlH"]),
              [{ id: "momH.armR", to: { r: 0 }, dur: 300 }],
              show(["l1"], 800, 500), [{ id: "l1", to: { y: "-3" }, at: 1300, dur: 500, yoyo: true, times: 2 }],
              show(["a1", "l2"], 2600, 500), [{ id: "l2", to: { y: "-3" }, at: 3100, dur: 500, yoyo: true, times: 2 }],
              show(["a2", "l3"], 4400, 500), [{ id: "l3", to: { y: "-3" }, at: 4900, dur: 500, yoyo: true, times: 2 }],
              show(["a3", "l4"], 6200, 500), [{ id: "l4", to: { y: "-3" }, at: 6700, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "مادربزرگ هم یک روز نوزاد بود! با ترانه عکس‌های قدیمی را نگاه می‌کنند. این عکس مادربزرگ است، وقتی نوزاد بود.", key: 5600, hold: 8400, do: D(
              hide(["l1", "l2", "l3", "l4", "a1", "a2", "a3"]), show(["granS", "girlS", "album"], 300, 700),
              [{ id: "granS.armL", to: { r: 55 }, at: 2600, dur: 600 }, pulse("album.p1", 3400, 1.3, 900), pulse("album.p1", 4400, 1.3, 900)],
              talk("granS", 1400, 2200),
              [{ id: "girlS.head", to: { r: 8 }, at: 2600, dur: 600 }, { id: "girlS.smile", to: { o: 0 }, at: 5200, dur: 200 }, { id: "girlS.laugh", to: { o: 1 }, at: 5200, dur: 200 }]) }
          ],
          question: "ترانه وقتی نوزاد بود چه می‌خورد؟", pic: true,
          options: [{ label: "🍉", value: "هندوانه" }, { label: "🍼", value: "شیر" }, { label: "🍲", value: "آش" }], answer: "شیر" },
        { type: "order", prompt: "آدم‌ها چطور بزرگ می‌شوند؟", say: "اول نوزادیم، بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "👶", say: "نوزاد" }, { pic: "🧒", say: "بچه" }, { pic: "👨", say: "بزرگ" }, { pic: "👴", say: "پدربزرگ" }] },
        { type: "order", prompt: "ترانه چطور بزرگ شد؟", say: "ترانه اول چه کار می‌کرد؟ بعد چه یاد گرفت؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🍼", say: "فقط شیر می‌خورد" }, { pic: "👣", say: "تاتی‌تاتی راه رفت" }, { pic: "⚽", say: "دوید و توپ گرفت" }] },
        { type: "talk", scene: "👶 ➡ 🧒", caption: "تو وقتی نوزاد بودی چه شکلی بودی؟ حالا چه کارهایی می‌توانی بکنی که آن وقت نمی‌توانستی؟" },
        home({ pic: "📷 👶", text: "عکس‌های نوزادی‌ات را با هم ببینید.",
          need: ["چند عکس از نوزادی کودک (یا لباس یا اسباب‌بازی کوچکی که از آن وقت مانده)"],
          steps: [
            "عکس‌ها را با هم نگاه کنید و بپرسید: «این کیه؟ اون موقع چی کار می‌تونستی بکنی؟ حالا چی؟»",
            "اگر عکسی ندارید، اشکالی ندارد: از روزهای نوزادی‌اش برایش تعریف کنید یا با هم نقاشی‌اش را بکشید.",
            "قد کودک را کنار در یا دیوار با مداد علامت بزنید و تاریخ را کنارش بنویسید. چند ماه بعد دوباره اندازه بگیرید."
          ],
          ask: "تو حالا چه کاری را خودت انجام می‌دهی که وقتی کوچک بودی نمی‌توانستی؟" })
      ]
    },

    /* Sources: the order of a day and yesterday / today / tomorrow (NCSS C3 D2.His.1.K–2: chronological sequence;
       England EYFS "Past and present"; Iran's preschool programme, «زمان»). The sun is high at noon (ظهر). A day of an
       Iranian family: breakfast on the sofreh, lunch as the main meal. */
    {
      id: "world-seed-10", subject: "world", level: "seed", emoji: "🌅", title: "صبح، ظهر، شب",
      steps: [
        { type: "scene", prompt: "یک روز امید", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, sun: { art: "w-sun-small", at: [88, 32], o: 0 }, moon: { art: "w-win-moon", o: 0 }, bars: { art: "w-win-bars" },
            meadow: { art: "w-meadow", o: 0 }, dim: { art: "w-night-dim", o: 0 },
            toshak: { art: "w-toshak", at: [70, 86], s: 1.5 }, omid: { art: "w-boy-sit", at: [64, 82], s: 1.3 }, blanket: { art: "w-blanket", at: [66, 87], s: 1.3 },
            zzz: { art: "w-zzz", at: [72, 46], s: 1.6, o: 0 },
            sofreh: { art: "w-sofreh", at: [80, 83], s: 1.3, o: 0 }, dadE: { art: "w-dad-sit", at: [44, 74], s: 1.2, o: 0 },
            omidE: { art: "w-boy-sit", at: [80, 72], s: 1.2, o: 0 }, momE: { art: "w-mom-sit", at: [116, 74], s: 1.2, o: 0 },
            omidP: { art: "w-boy", at: [58, 86], s: 1.2, o: 0 }, ballP: { art: "w-ball", at: [72, 84], s: 1.1, o: 0 },
            d1: { art: "w-day", at: [128, 50], o: 0 }, d2: { art: "w-day", at: [80, 50], o: 0 }, d3: { art: "w-day", at: [32, 50], o: 0 },
            t1: { art: "دیروز", at: [128, 18], s: 0.34, o: 0 }, t2: { art: "امروز", at: [80, 18], s: 0.34, o: 0 }, t3: { art: "فردا", at: [32, 18], s: 0.34, o: 0 },
            house1: { art: "w-house", at: [136, 68], s: 0.8, o: 0 }, gran1: { art: "w-gran", at: [138, 72], s: 0.62, o: 0 }, boy1: { art: "w-boy", at: [114, 72], s: 0.66, o: 0 },
            boy2: { art: "w-boy", at: [74, 72], s: 0.8, o: 0 }, ball2: { art: "w-ball", at: [88, 70], s: 0.9, o: 0 },
            park3: { art: "w-park", at: [42, 66], s: 0.62, o: 0 }, dad3: { art: "w-dad", at: [20, 72], s: 0.6, o: 0 }, boy3: { art: "w-boy", at: [14, 72], s: 0.62, o: 0 },
            ring: { art: "w-day-ring", at: [128, 50], o: 0 }
          },
          scenes: [
            { caption: "صبح شد. خورشید آرام بالا آمد. امید بیدار شد.", key: 4400, hold: 6000, do: D(
              [{ id: "omid.eyes", to: { o: 0 }, dur: 1 }, { id: "omid.shut", to: { o: 1 }, dur: 1 },
                { id: "sun", to: { o: 1 }, at: 300, dur: 800 }, { id: "sun", to: { y: 22 }, at: 300, dur: 3000, ease: "out" },
                { id: "omid.shut", to: { o: 0 }, at: 3300, dur: 200 }, { id: "omid.eyes", to: { o: 1 }, at: 3300, dur: 200 },
                { id: "omid.armL", to: { r: 160 }, at: 3700, dur: 700 }, { id: "omid.armR", to: { r: -160 }, at: 3700, dur: 700 },
                { id: "omid.armL", to: { r: 0 }, at: 5000, dur: 600 }, { id: "omid.armR", to: { r: 0 }, at: 5000, dur: 600 }]) },
            { caption: "امید با پدر و مادرش صبحانه خورد.", key: 2800, hold: 5400, do: D(
              hide(["toshak", "omid", "blanket"]), show(["sofreh", "dadE", "omidE", "momE"], 300, 700),
              eat("dadE", 1200, 2, "armR"), eat("omidE", 1500, 2, "armL"), eat("momE", 1300, 2, "armL")) },
            { caption: "بعد امید در حیاط توپ‌بازی کرد.", key: 2600, hold: 6000, do: D(
              hide(["sofreh", "dadE", "omidE", "momE", "room", "sun", "bars"]), show(["meadow", "omidP", "ballP"], 0, 600),
              [0, 1, 2].map(function (i) {
                var t = 1000 + i * 1600;
                return [{ id: "omidP.legR", to: { r: -40 }, at: t, dur: 250 }, { id: "omidP.legR", to: { r: 0 }, at: t + 250, dur: 250 },
                  { id: "ballP", path: "M72 84Q100 50 128 84", at: t + 250, dur: 700, ease: "out" }, { id: "ballP", path: "M128 84Q100 70 72 84", at: t + 950, dur: 600, ease: "in" }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "ظهر شد. از پنجره ببین: خورشید آن بالاست. وقت ناهار است!", key: 4200, hold: 6200, do: D(
              hide(["meadow", "omidP", "ballP"]), show(["room", "bars", "sofreh", "dadE", "omidE", "momE"], 0, 600),
              [{ id: "sun", to: { x: 80, y: 15, o: 1 }, dur: 1 }, pulse("sun", 1200, 1.5, 800), pulse("sun", 2200, 1.5, 800)],
              eat("dadE", 3200, 2, "armR"), eat("omidE", 3400, 2, "armL"), eat("momE", 3300, 2, "armL")) },
            { caption: "شب شد. ماه و ستاره‌ها درآمدند. امید خوابید.", key: 4400, hold: 6200, do: D(
              hide(["sofreh", "dadE", "omidE", "momE", "sun"]), show(["moon", "dim", "toshak", "omid", "blanket"], 0, 900),
              [{ id: "moon.moon", to: { y: "+6" }, dur: 1 }, { id: "moon.moon", to: { y: "-6" }, at: 900, dur: 1800 },
                { id: "omid.eyes", to: { o: 1 }, dur: 1 }, { id: "omid.shut", to: { o: 0 }, dur: 1 },
                { id: "omid.head", to: { r: 12 }, at: 2800, dur: 700 }, { id: "omid.eyes", to: { o: 0 }, at: 3000, dur: 300 }, { id: "omid.shut", to: { o: 1 }, at: 3000, dur: 300 },
                { id: "zzz", to: { o: 1 }, at: 3600, dur: 500 }, { id: "zzz", to: { y: "-3" }, at: 3600, dur: 2400, yoyo: true, times: 2 }]) },
            { caption: "دیروز، امید به خانه مادربزرگ رفت.", key: 4200, hold: 6000, do: D(
              hide(["moon", "dim", "toshak", "omid", "blanket", "zzz", "room", "bars"]),
              show(["d1", "d2", "d3", "t1", "t2", "t3"], 300, 600), show(["ring", "house1", "gran1", "boy1"], 1000, 500),
              walk("boy1", { x: 126 }, 1800, 1600), wave("gran1", 3400, 1600, "armL")) },
            { caption: "امروز، امید در حیاط توپ‌بازی می‌کند.", key: 3000, hold: 5400, do: D(
              [{ id: "ring", to: { x: 80 }, dur: 900 }], show(["boy2", "ball2"], 900, 500),
              [{ id: "boy2.armR", to: { r: -60 }, at: 1600, dur: 300 }, { id: "ball2", path: "M88 70Q88 46 88 70", at: 1800, dur: 900, ease: "linear" },
                { id: "boy2.armR", to: { r: -40 }, at: 2700, dur: 200 }, { id: "ball2", path: "M88 70Q88 46 88 70", at: 2900, dur: 900, ease: "linear" }, { id: "boy2.armR", to: { r: 0 }, at: 3900, dur: 300 }]) },
            { caption: "فردا، امید با پدرش به پارک می‌رود.", key: 3600, hold: 5800, do: D(
              [{ id: "ring", to: { x: 32 }, dur: 900 }], show(["park3", "dad3", "boy3"], 900, 500),
              walk("dad3", { x: 30 }, 1600, 2600), walk("boy3", { x: 24 }, 1600, 2600)) }
          ] },
        { type: "order", prompt: "یک روز امید", say: "امید اول چه کار کرد؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🌅", say: "بیدار شد" }, { pic: "🍳", say: "صبحانه خورد" }, { pic: "⚽", say: "توپ‌بازی کرد" }, { pic: "🍲", say: "ناهار خورد" }, { pic: "🌙", say: "خوابید" }] },
        { type: "choose", prompt: "امید کی ناهار خورد؟", say: "امید کی ناهار خورد؟ صبح، ظهر یا شب؟", pic: true,
          options: [{ label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }], answer: "ظهر" },
        { type: "choose", prompt: "کی ماه و ستاره‌ها را می‌بینیم؟", say: "کی ماه و ستاره‌ها را در آسمان می‌بینیم؟", pic: true,
          options: [{ label: "🌙", value: "شب" }, { label: "☀️", value: "ظهر" }, { label: "🌅", value: "صبح" }], answer: "شب" },
        { type: "choose", prompt: "امید دیروز کجا رفت؟", say: "امید دیروز کجا رفت؟", pic: true,
          options: [{ label: "🛝", value: "پارک" }, { label: "👵", value: "خانه مادربزرگ" }, { label: "🏫", value: "مدرسه" }], answer: "خانه مادربزرگ" },
        { type: "choose", prompt: "امید فردا کجا می‌رود؟", say: "امید فردا کجا می‌رود؟", pic: true,
          options: [{ label: "👵", value: "خانه مادربزرگ" }, { label: "🏫", value: "مدرسه" }, { label: "🛝", value: "پارک" }], answer: "پارک" }
      ]
    },

    /* Sources: rules, turns and cooperation in the home and the group (NCSS C3 D2.Civ.7–8.K–2: follow rules,
       take turns, work with others; CASEL relationship skills). Real small conflicts (wanting to go first, a spilt
       glass) and their repair, without blame or punishment. */
    {
      id: "world-seed-11", subject: "world", level: "seed", emoji: "🤝", title: "نوبت می‌گیریم",
      steps: [
        { type: "scene", prompt: "با هم بازی می‌کنیم", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" }, slide: { art: "w-slide", at: [96, 86], s: 1.4 },
            k1: { art: "w-girl4", at: [110, 86] }, k2: { art: "w-boy4", at: [124, 86] }, k3: { art: "w-boy2", at: [138, 86] },
            room: { art: "w-room", o: 0 },
            raha: { art: "w-girl2-sit", at: [52, 80], s: 1.25, o: 0 }, sina: { art: "w-boy-sit", at: [108, 80], s: 1.25, o: 0 },
            d1: { art: "w-drawing", at: [62, 86], s: 1.3, o: 0 }, d2: { art: "w-drawing", at: [98, 86], s: 1.3, o: 0 },
            crayons: { art: "w-crayons", at: [80, 85], s: 1.5, o: 0 }, crayon: { art: "w-crayon", at: [80, 72], s: 1.4, o: 0 },
            puddle: { art: "w-puddle", at: [84, 87], s: 1.6, sx: 0.05, o: 0 }, glass: { art: "w-glass", at: [94, 86], s: 1.4, o: 0 },
            cloth: { art: "w-cloth", at: [84, 85], s: 1.2, o: 0 },
            bub: { art: "w-bubble", at: [112, 30], s: 0.9, o: 0 }, word: { art: "ببخشید!", at: [112, 32.4], s: 0.28, o: 0 },
            teddy: { art: "🧸", at: [28, 88], s: 0.7, o: 0 }, car: { art: "🚗", at: [140, 88], s: 0.7, o: 0 },
            ballT: { art: "w-ball", at: [128, 84], o: 0 }, blocks: { art: "w-blocks", at: [42, 88], s: 1.4, o: 0 },
            box: { art: "w-toybox", at: [80, 89], s: 1.3, o: 0 },
            h1: { art: "w-heart", at: [52, 40], s: 0.9, o: 0 }, h2: { art: "w-heart", at: [108, 40], s: 0.9, o: 0 }
          },
          scenes: [
            { caption: "بچه‌ها در پارک سرسره‌بازی می‌کنند. یکی‌یکی، به نوبت.", key: 3800, hold: 7200, do: D(
              [{ id: "k1", path: "M110 86L105 46", at: 600, dur: 2000, ease: "linear" },
                { id: "k1.armL", to: { r: 150 }, at: 600, dur: 2000, yoyo: true, times: 6 }, { id: "k1.armR", to: { r: -150 }, at: 700, dur: 2000, yoyo: true, times: 6 },
                { id: "k1", path: "M105 46L94 46L52 80L44 86", at: 2900, dur: 1800, ease: "in" },
                { id: "k1.armL", to: { r: 130 }, at: 2900, dur: 300 }, { id: "k1.armR", to: { r: -130 }, at: 2900, dur: 300 },
                { id: "k1.armL", to: { r: 0 }, at: 4900, dur: 300 }, { id: "k1.armR", to: { r: 0 }, at: 4900, dur: 300 },
                { id: "k1.smile", to: { o: 0 }, at: 4700, dur: 200 }, { id: "k1.laugh", to: { o: 1 }, at: 4700, dur: 200 }],
              walk("k2", { x: 110 }, 3000, 1200), walk("k3", { x: 124 }, 3200, 1200)) },
            { caption: "کاوه می‌خواست زودتر برود. ولی صبر کرد تا نوبتش شود.", key: 4400, hold: 7400, do: D(
              walk("k3", { x: 114, y: 86 }, 0, 900),
              [{ id: "k3.head", to: { r: -8 }, at: 1000, dur: 500 }, { id: "k2.head", to: { r: 8 }, at: 1000, dur: 500 }],
              walk("k3", { x: 124 }, 2000, 1000),
              [{ id: "k3.head", to: { r: 0 }, at: 2000, dur: 400 }, { id: "k2.head", to: { r: 0 }, at: 2000, dur: 400 },
                { id: "k2", path: "M110 86L105 46", at: 3100, dur: 1800, ease: "linear" },
                { id: "k2.armL", to: { r: 150 }, at: 3100, dur: 1800, yoyo: true, times: 6 }, { id: "k2.armR", to: { r: -150 }, at: 3200, dur: 1800, yoyo: true, times: 6 },
                { id: "k2", path: "M105 46L94 46L52 80L32 86", at: 5100, dur: 1800, ease: "in" }]) },
            { caption: "حالا نوبت کاوه است!", key: 4400, hold: 6000, do: D(
              walk("k3", { x: 110 }, 0, 900),
              [{ id: "k3", path: "M110 86L105 46", at: 1000, dur: 1800, ease: "linear" },
                { id: "k3.armL", to: { r: 150 }, at: 1000, dur: 1800, yoyo: true, times: 6 }, { id: "k3.armR", to: { r: -150 }, at: 1100, dur: 1800, yoyo: true, times: 6 },
                { id: "k3", path: "M105 46L94 46L52 80L56 86", at: 3000, dur: 1800, ease: "in" },
                { id: "k3.armL", to: { r: 130 }, at: 3000, dur: 300 }, { id: "k3.armR", to: { r: -130 }, at: 3000, dur: 300 },
                { id: "k3.smile", to: { o: 0 }, at: 4200, dur: 200 }, { id: "k3.laugh", to: { o: 1 }, at: 4200, dur: 200 }]) },
            { caption: "در خانه، رها و برادرش سینا نقاشی می‌کشند. یک جعبه مداد رنگی دارند و با هم شریک می‌شوند.", key: 4400, hold: 7600, do: D(
              hide(["meadow", "slide", "k1", "k2", "k3"]), show(["room", "raha", "sina", "d1", "d2", "crayons"], 0, 700),
              [{ id: "raha.armR", to: { r: -55 }, at: 1600, dur: 500 }, { id: "crayon", to: { o: 1 }, at: 2100, dur: 200 },
                { id: "crayon", path: "M80 72Q72 64 64 70", at: 2200, dur: 900 },
                { id: "crayon", path: "M64 70Q84 58 100 70", at: 4000, dur: 1300 }, { id: "raha.armR", to: { r: -80 }, at: 3900, dur: 500 },
                { id: "sina.armL", to: { r: 70 }, at: 4600, dur: 500 }, { id: "raha.armR", to: { r: 0 }, at: 5400, dur: 400 },
                { id: "sina.smile", to: { o: 0 }, at: 5400, dur: 200 }, { id: "sina.laugh", to: { o: 1 }, at: 5400, dur: 200 }]) },
            { caption: "سینا بی‌حواس لیوان آب را انداخت و آب روی نقاشی‌ها ریخت. سینا گفت: «ببخشید!»", key: 5800, hold: 8000, do: D(
              hide(["crayon"]), show(["glass"], 0, 400),
              [{ id: "sina.armL", to: { r: 30 }, dur: 400 }, { id: "sina.laugh", to: { o: 0 }, dur: 200 }, { id: "sina.smile", to: { o: 1 }, dur: 200 },
                { id: "sina.armL", to: { r: 70 }, at: 1000, dur: 300 }, { id: "glass", to: { r: -90, x: 90 }, at: 1300, dur: 400, ease: "in" },
                { id: "puddle", to: { o: 1 }, at: 1600, dur: 200 }, { id: "puddle", to: { sx: 1.6 }, at: 1600, dur: 1400, ease: "out" },
                { emit: "drop", where: [86, 84], spread: [10, 2], rise: -3, n: 6, at: 1600, dur: 800, life: 600 },
                { id: "raha.smile", to: { o: 0 }, at: 2600, dur: 200 }, { id: "raha.sad", to: { o: 1 }, at: 2600, dur: 200 },
                { id: "sina.armL", to: { r: 0 }, at: 3000, dur: 400 }],
              show(["bub", "word"], 4000, 300), talk("sina", 4200, 1600)) },
            { caption: "با هم آب را پاک کردند.", hold: 2000, do: D(
              hide(["bub", "word"]), show(["cloth"], 0, 400),
              [{ id: "glass", to: { r: 0, x: 94 }, dur: 600 }, { id: "raha.armR", to: { r: -40 }, at: 400, dur: 400 }, { id: "sina.armL", to: { r: 60 }, at: 400, dur: 400 }]),
              wait: { rub: true, n: 6, hint: "تو هم کمک کن: روی آب چپ و راست بکش تا پاک شود!",
                each: [{ id: "cloth", to: { x: "+6" }, dur: 300, yoyo: true, times: 2 }, { id: "puddle", to: { sx: "-0.26" }, dur: 300 }] } },
            { caption: "بعد از بازی، همه با هم اسباب‌بازی‌ها را جمع کردند.", hold: 2400, do: D(
              hide(["cloth", "puddle", "glass", "d1", "d2", "crayons"]),
              [{ id: "raha.sad", to: { o: 0 }, dur: 200 }, { id: "raha.smile", to: { o: 1 }, dur: 200 }, { id: "raha.armR", to: { r: 0 }, dur: 400 }, { id: "sina.armL", to: { r: 0 }, dur: 400 }],
              show(["teddy", "car", "ballT", "blocks", "box"], 300, 600)),
              wait: { tap: ["teddy", "car", "ballT", "blocks"], hint: "روی هر اسباب‌بازی بزن تا به جعبه برود!",
                each: [{ id: "$", to: { x: 80, y: 80, s: 0.5 }, dur: 900 }, { id: "$", to: { o: 0 }, at: 800, dur: 300 }, { id: "raha", to: { y: "-2" }, dur: 400, yoyo: true, times: 2 }] } },
            { caption: "وقتی نوبت می‌گیریم، شریک می‌شویم و به هم کمک می‌کنیم، به همه خوش می‌گذرد.", key: 2600, hold: 6400, do: D(
              hide(["teddy", "car", "ballT", "blocks"], 0, 300),
              [{ id: "raha.smile", to: { o: 0 }, at: 300, dur: 200 }, { id: "raha.laugh", to: { o: 1 }, at: 300, dur: 200 },
                { id: "sina.smile", to: { o: 0 }, at: 500, dur: 200 }, { id: "sina.laugh", to: { o: 1 }, at: 500, dur: 200 }],
              show(["h1", "h2"], 1200, 500), [pulse("h1", 1800, 1.2), pulse("h2", 2100, 1.2), pulse("box", 2600, 1.1)]) }
          ] },
        { type: "sort", prompt: "کمک می‌کند یا نه؟",
          say: "کدام کار به بازی با هم کمک می‌کند؟ کدام کمک نمی‌کند؟",
          baskets: [{ pic: "🤝", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کمک نمی‌کند", value: "no" }],
          items: [
            { pic: "⏳", say: "صبر کردن تا نوبتم شود", basket: "yes" },
            { pic: "🖍️", say: "شریک شدن مداد رنگی", basket: "yes" },
            { pic: "🧹", say: "کمک کردن در جمع کردن", basket: "yes" },
            { pic: "🏃", say: "جلو زدن از صف", basket: "no" },
            { pic: "😠", say: "داد زدن سر دوستم", basket: "no" },
            { pic: "🧸", say: "قاپیدن اسباب‌بازی از دست دوستم", basket: "no" }
          ] },
        { type: "talk", scene: "🛝 🖍️ 🤝", caption: "در خانه شما چه قانون‌هایی هست؟ وقتی کسی اشتباهی کاری کند، چه می‌گوییم؟ تو در خانه چه کمکی می‌کنی؟" },
        home({ pic: "🎲 🤝", text: "یک بازی نوبتی با هم بازی کنید.",
          need: ["یک بازی ساده مثل مارپله، یا یک توپ"],
          steps: [
            "یک بازی نوبتی بازی کنید و نوبت‌ها را بلند بگویید: «حالا نوبت منه، حالا نوبت تو.»",
            "اگر کودک بی‌تاب شد، کمکش کنید صبر کند: «تا سه می‌شمریم، بعد نوبت توئه.»",
            "یک قانون ساده خانه را با هم انتخاب کنید (مثلاً جمع کردن اسباب‌بازی‌ها بعد از بازی) و یک هفته با هم انجامش دهید."
          ],
          ask: "وقتی دوستت اسباب‌بازی تو را می‌خواهد، چه کار می‌کنی؟" })
      ]
    },

    /* Sources: position words before maps (NCSS C3 D2.Geo.1.K–2; England EYFS "Mathematics: position"; Iran's
       preschool programme, «مفاهیم مکانی»: بالا، پایین، روی، زیر، کنار، جلو، پشت). One toy cat and a box, so only
       the place changes; then a picture of a room (B.MAPS.toys) to find things by where they are. */
    {
      id: "world-seed-12", subject: "world", level: "seed", emoji: "📦", title: "بالا، پایین، کنار",
      steps: [
        { type: "scene", prompt: "گربه بازیگوش نیما", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, catB: { art: "cat-side", at: [100, 84], s: 1.2, o: 0 },
            box: { art: "w-box", at: [80, 84], s: 1.4 }, table: { art: "w-low-table", at: [128, 84], s: 1.3 },
            cat: { art: "cat-side", at: [36, 84], s: 1.2 }, ball: { art: "w-ball-roll", at: [20, 88], s: 1.3, o: 0 }
          },
          scenes: [
            { caption: "این گربه نیماست. این یک جعبه است و این یک میز.", key: 3600, hold: 5400, do: [
              { id: "cat.head", to: { r: -10 }, at: 600, dur: 600, yoyo: true, times: 2 },
              pulse("box", 2200, 1.12), pulse("table", 3600, 1.1)] },
            { caption: "گربه روی جعبه پرید.", key: 3000, hold: 4600, do: [
              { id: "cat", to: { sy: 0.8 }, at: 400, dur: 300, yoyo: true, times: 2 },
              { id: "cat", path: "M36 84Q52 38 82 59", at: 1000, dur: 900, ease: "out" },
              { id: "cat", to: { sy: 0.8 }, at: 1900, dur: 300, yoyo: true, times: 2 }] },
            { caption: "حالا گربه پایین پرید و رفت زیر میز.", key: 4200, hold: 5600, do: [
              { id: "cat", path: "M82 59Q98 48 104 84", at: 300, dur: 800, ease: "in" },
              { id: "cat", to: { sy: 0.8 }, at: 1100, dur: 300, yoyo: true, times: 2 },
              { id: "cat", path: "M104 84L128 84", at: 1900, dur: 1600, ease: "linear" },
              { id: "cat.head", to: { r: 12 }, at: 3600, dur: 500 }] },
            { caption: "گربه از زیر میز بیرون آمد و کنار جعبه نشست.", key: 4000, hold: 5600, do: [
              { id: "cat.head", to: { r: 0 }, dur: 400 }, { id: "cat", to: { flip: -1 }, at: 400, dur: 300 },
              { id: "cat", path: "M128 84L104 84", at: 800, dur: 1800, ease: "linear" }, { id: "cat", to: { flip: 1 }, at: 2800, dur: 300 },
              { id: "cat", to: { sy: 0.85 }, at: 3200, dur: 400, yoyo: true, times: 2 }] },
            { caption: "توپ قل خورد و جلوی جعبه ایستاد.", key: 3200, hold: 5000, do: [
              { id: "ball", to: { o: 1 }, dur: 300 }, { id: "ball", to: { x: 80 }, at: 300, dur: 2400, ease: "out" }, { id: "ball.spin", to: { r: 540 }, at: 300, dur: 2400, ease: "out" },
              pulse("ball", 3400, 1.2)] },
            { caption: "گربه پشت جعبه قایم شد. فقط گوش‌هایش پیداست!", key: 4400, hold: 6400, do: [
              { id: "catB", to: { x: 104 }, dur: 1 }, { id: "catB", to: { o: 1 }, dur: 200 }, { id: "cat", to: { o: 0 }, dur: 200 },
              { id: "catB", to: { flip: -1 }, at: 400, dur: 300 },
              { id: "catB", path: "M104 84L98 73L84 73", at: 800, dur: 2200, ease: "linear" },
              { id: "catB.head", to: { r: -10 }, at: 3400, dur: 500, yoyo: true, times: 4 }] }
          ] },
        { type: "map", map: "toys", say: "در اتاق نیما پیدا کن.",
          tasks: [
            { find: "teddy", prompt: "روی تخت چه هست؟ رویش بزن.", say: "روی تخت چه هست؟ رویش بزن." },
            { find: "ball", prompt: "زیر میز چه هست؟", say: "زیر میز چه هست؟ رویش بزن." },
            { find: "cat", prompt: "چه کسی کنار جعبه نشسته؟", say: "چه کسی کنار جعبه نشسته؟ رویش بزن." },
            { find: "book", prompt: "روی قفسه چه هست؟", say: "بالا را نگاه کن. روی قفسه چه هست؟" },
            { find: "shoes", prompt: "زیر تخت چه هست؟", say: "پایین را نگاه کن. زیر تخت چه هست؟" },
            { find: "car", prompt: "جلوی جعبه چه هست؟", say: "جلوی جعبه چه هست؟ رویش بزن." }
          ] },
        { type: "choose", prompt: "گربه اول روی چه چیزی پرید؟", say: "یادت هست؟ گربه نیما اول روی چه چیزی پرید؟", pic: true,
          options: [{ label: "🧸", value: "عروسک" }, { label: "📦", value: "جعبه" }, { label: "🛏️", value: "تخت" }], answer: "جعبه" },
        { type: "choose", prompt: "چه چیزی جلوی جعبه ایستاد؟", say: "چه چیزی قل خورد و جلوی جعبه ایستاد؟", pic: true,
          options: [{ label: "⚽", value: "توپ" }, { label: "🐈", value: "گربه" }, { label: "🧸", value: "عروسک" }], answer: "توپ" },
        home({ pic: "🧸 🔍", text: "یک اسباب‌بازی قایم کن و بگو کجاست!",
          need: ["یک اسباب‌بازی کوچک"],
          steps: [
            "اسباب‌بازی را جایی قایم کنید و با کلمه‌های جا راهنمایی کنید: «زیر یه چیز نرمه»، «پشت در نیست».",
            "وقتی پیدا کرد، بپرسید: «کجا بود؟» و کمکش کنید کامل بگوید: «زیر بالش بود.»",
            "جایتان را عوض کنید: کودک قایم کند و به شما بگوید کجا را بگردید.",
            "روی، زیر، کنار، جلو، پشت، بالا و پایین را با کارهای روزانه هم تمرین کنید: «کفش‌ها رو بذار کنار در.»"
          ],
          ask: "توپ تو الان کجاست؟ روی چیزی است یا زیر چیزی؟" })
      ]
    },

    /* Sources: map skills begin with a familiar space seen from above, then a picture map
       (Bishop, "Learning to read maps"; NCSS C3 Framework, Geography D2.Geo.1.K–2: construct maps of familiar places;
       Iran's preschool programme, «من و محیط اطرافم»). Top view of a ball (a circle) and a rug (a rectangle)
       links to the shapes the child knows from math. */
    {
      id: "world-seed-2", subject: "world", level: "seed", emoji: "🗺️", title: "خانه ما از بالا",
      steps: [
        /* The same room from the side, then from above: the walls fold down, every thing flattens and slides to its
           place on the plan, and the plan is the map used in the next steps (B.MAPS.room, js/art/rig.js). */
        { type: "scene", prompt: "از بالا نگاه کنیم", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            rugS: { art: "rug-side", at: [80, 82] }, bedS: { art: "bed-side", at: [36, 68] }, wardS: { art: "wardrobe-side", at: [136, 64] },
            deskS: { art: "desk-side", at: [139, 77] }, ballS: { art: "ball-side", at: [84, 77] },
            teddyS: { art: "🧸", at: [28, 86], s: 0.6 }, plantS: { art: "🪴", at: [12, 88], s: 0.6 },
            girl: { art: "👧", at: [50, 90], s: 1.35 }, catS: { art: "cat-side", at: [108, 88] }, sight: { art: "cat-sight", o: 0 },
            plan: { art: "room-plan", o: 0 }, rugT: { art: "rug-top", o: 0 }, bedT: { art: "bed-top", o: 0 }, wardT: { art: "wardrobe-top", o: 0 },
            deskT: { art: "desk-top", o: 0 }, ballT: { art: "ball-top", o: 0 }, teddyT: { art: "teddy-top", o: 0 }, plantT: { art: "plant-top", o: 0 },
            catT: { art: "cat-top", at: [119.2, 15.6], o: 0 },
            ring: { art: "ring-ball", o: 0 }, frame: { art: "frame-rug", o: 0 },
            paper: { art: "paper", o: 0 }, lines: { art: "room-map-lines", o: 0 }, pencil: { art: "pencil", at: [27.4, 6.4], o: 0 },
            girl2: { art: "👧", at: [149, 88], s: 1.05, o: 0 }
          },
          scenes: [
            { caption: "این اتاق دلارام است. تخت، پنجره، کمد، میز، فرش، توپ و عروسک را ببین.", do: [
              { id: "bedS", to: { s: 1.12 }, at: 2200, dur: 600, yoyo: true, times: 2 },
              { id: "wall.window", to: { s: 1.1 }, at: 2900, dur: 600, yoyo: true, times: 2 },
              { id: "wardS", to: { s: 1.08 }, at: 3600, dur: 600, yoyo: true, times: 2 },
              { id: "deskS", to: { s: 1.15 }, at: 4200, dur: 600, yoyo: true, times: 2 },
              { id: "rugS", to: { s: 1.08 }, at: 4800, dur: 600, yoyo: true, times: 2 },
              { id: "ballS", to: { s: 1.4 }, at: 5400, dur: 600, yoyo: true, times: 2 },
              { id: "teddyS", to: { s: 0.75 }, at: 6000, dur: 600, yoyo: true, times: 2 }
            ] },
            { caption: "گربه دلارام اول روی میز پرید، بعد بالای کمد رفت.", do: [
              { id: "catS", path: "M108 88L124 88", dur: 900, ease: "linear" },
              { id: "catS", path: "M124 88Q124 64 133 63", at: 1100, dur: 550, ease: "out" },
              { id: "catS", to: { sy: 0.8 }, at: 1650, dur: 300, yoyo: true, times: 2 },
              { id: "catS", path: "M133 63Q142 30 134 18", at: 2400, dur: 650, ease: "out" },
              { id: "catS", to: { sy: 0.8 }, at: 3050, dur: 300, yoyo: true, times: 2 },
              { id: "catS", to: { flip: -1 }, at: 3600, dur: 400 }
            ] },
            { caption: "گربه از آن بالا پایین را نگاه می‌کند. تخت، توپ و عروسک را می‌بیند.", do: [
              { id: "catS.head", to: { r: 28 }, dur: 700 },
              { id: "sight", to: { o: 1 }, at: 800, dur: 700 },
              { id: "bedS", to: { s: 1.12 }, at: 2600, dur: 600, yoyo: true, times: 2 },
              { id: "ballS", to: { s: 1.4 }, at: 3300, dur: 600, yoyo: true, times: 2 },
              { id: "teddyS", to: { s: 0.75 }, at: 4000, dur: 600, yoyo: true, times: 2 }
            ] },
            { caption: "حالا ما هم مثل گربه از بالا نگاه می‌کنیم. اتاق از بالا این شکلی است.", key: 3300, hold: 7000, do: [
              { id: "sight", to: { o: 0 }, dur: 400 }, { id: "girl", to: { o: 0 }, dur: 500 },
              { id: "wall", to: { sy: 0 }, at: 2400, dur: 1400, ease: "in" },
              { id: "floor", to: { o: 0 }, at: 3200, dur: 900 }, { id: "plan", to: { o: 1 }, at: 2800, dur: 1300 },
              { id: "bedS", to: { x: 48.9, y: 31, sy: 0.3, o: 0 }, at: 2600, dur: 1600 },
              { id: "wardS", to: { x: 119.2, y: 22.6, sy: 0.3, o: 0 }, at: 2600, dur: 1600 },
              { id: "deskS", to: { x: 121.4, y: 56, sy: 0.3, o: 0 }, at: 2600, dur: 1600 },
              { id: "rugS", to: { x: 80, y: 67.4, sy: 2.5, o: 0 }, at: 2600, dur: 1600 },
              { id: "ballS", to: { x: 82.8, y: 55.9, o: 0 }, at: 2600, dur: 1600 },
              { id: "teddyS", to: { x: 43.6, y: 74, sy: 0.3, o: 0 }, at: 2600, dur: 1600 },
              { id: "plantS", to: { x: 33.5, y: 81, sy: 0.3, o: 0 }, at: 2600, dur: 1600 },
              { id: "catS", to: { x: 119.2, y: 18, sy: 0.4, o: 0 }, at: 2600, dur: 1600 },
              { id: "bedT", to: { o: 1 }, at: 3400, dur: 900 }, { id: "wardT", to: { o: 1 }, at: 3400, dur: 900 },
              { id: "deskT", to: { o: 1 }, at: 3400, dur: 900 }, { id: "rugT", to: { o: 1 }, at: 3400, dur: 900 },
              { id: "ballT", to: { o: 1 }, at: 3400, dur: 900 }, { id: "teddyT", to: { o: 1 }, at: 3400, dur: 900 },
              { id: "plantT", to: { o: 1 }, at: 3400, dur: 900 }, { id: "catT", to: { o: 1 }, at: 3400, dur: 900 }
            ] },
            { caption: "از بالا، توپ مثل یک دایره است و فرش مثل یک مستطیل.", hold: 6500, do: [
              { id: "ring", to: { o: 1 }, at: 1200, dur: 200 }, { id: "ring", draw: true, at: 1200, dur: 1000 },
              { id: "frame", to: { o: 1 }, at: 3600, dur: 200 }, { id: "frame", draw: true, at: 3600, dur: 1300 }
            ] },
            { caption: "دلارام اتاقش را از بالا روی کاغذ کشید. این نقشه اتاق است!", hold: 8000, do: [
              { id: "ring", to: { o: 0 }, dur: 400 }, { id: "frame", to: { o: 0 }, dur: 400 },
              { id: "paper", to: { o: 1 }, dur: 900 },
              { id: "lines", to: { o: 1 }, at: 900, dur: 100 }, { id: "lines", draw: true, oneByOne: true, at: 1000, dur: 5200 },
              { id: "pencil", to: { o: 1 }, at: 900, dur: 100 }, { id: "pencil", path: B.ROOM_MAP_PATH, at: 1000, dur: 5200, ease: "linear" },
              { id: "pencil", to: { o: 0 }, at: 6300, dur: 400 },
              { id: "girl2", to: { o: 1 }, at: 6300, dur: 500 }, { id: "girl2", to: { s: 1.15 }, at: 6800, dur: 500, yoyo: true, times: 2 }
            ] }
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
        { type: "scene", prompt: "با حمید و مادربزرگ در محله", bg: "#cdeaf7",
          /* A real walk: the street is wider than the stage (home on the right at x 540, the clinic at 128) and the
             camera follows Hamid and his grandmother, stopping at each place. Sky, far hills and the street are three
             depths, so the far things slide by more slowly. */
          parts: {
            sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            clinic: { art: "w-clinic", at: [128, 64], s: 1.3 }, park: { art: "w-park", at: [214, 64], s: 1.2 }, school: { art: "w-school", at: [300, 64], s: 1.25 },
            crossing: { art: "w-crossing", at: [372, 64] }, car: { art: "w-car-front", at: [372, 48], s: 0.6 },
            bakery: { art: "w-bakery", at: [450, 64], s: 1.3 }, baker: { art: "🧑‍🍳", at: [436, 62], s: 0.95 }, peel: { art: "w-peel", at: [437, 53], s: 0.6 },
            counter: { art: "w-bakery-counter", at: [450, 64], s: 1.3, sy: 2 },
            home: { art: "w-house", at: [540, 64], s: 1.4 },
            teacher: { art: "👨‍🏫", at: [290, 70] }, gardener: { art: "🧑‍🌾", at: [198, 71] }, can: { art: "w-can", under: "gardener", at: [7, -12] },
            patient: { art: "👨", at: [122, 71], look: { top: "#f2c14e", bottom: "#5a5f7a" } }, doctor: { art: "👩‍⚕️", at: [140, 71], flip: true },
            gran: { art: "👵", at: [540, 64], s: 1.1, flip: true, o: 0 }, hamid: { art: "👦", at: [540, 64], s: 1.25, flip: true, o: 0, look: { top: "#5aa36a", hairColor: "#1f1712" } }
          },
          scenes: [
            { caption: "حمید و مادربزرگ از خانه بیرون آمدند.", hold: 4600, do: [
              { cam: { x: 516 }, dur: 1 }, { id: "home.door", to: { sx: 0.15 }, dur: 600 },
              { id: "gran", to: { o: 1 }, at: 700, dur: 300 }, { id: "gran", walk: [528, 71], at: 700, dur: 1400 },
              { id: "hamid", to: { o: 1 }, at: 1300, dur: 300 }, { id: "hamid", walk: [540, 73], at: 1300, dur: 1200 },
              { id: "home.door", to: { sx: 1 }, at: 2800, dur: 600 }] },
            { caption: "اول به نانوایی رفتند.", hold: 4400, do: [
              { id: "gran", walk: [462, 71], dur: 4000 }, { id: "hamid", walk: [474, 73], dur: 4000 }, { cam: { x: 452 }, dur: 4000, ease: "linear" }] },
            { caption: "نانوا نان تازه می‌پزد.", key: 2600, hold: 5200, do: [
              { id: "bakery.glow", to: { s: 1.15 }, dur: 5000, yoyo: true, times: 8 },
              { id: "baker.armF", to: { r: -60 }, at: 300, dur: 600 }, { id: "peel", to: { x: "+7" }, at: 500, dur: 900, yoyo: true, times: 2 },
              { id: "counter.bread", to: { o: 1 }, at: 2400, dur: 500 }, { id: "baker.armF", to: { r: 0 }, at: 2400, dur: 500 },
              { emit: "bubble", where: [446, 46], spread: [10, 2], n: 8, rise: -10, at: 2600, dur: 2000 },
              { id: "hamid", to: { y: "-2" }, at: 3000, dur: 700, yoyo: true, times: 2 }] },
            { caption: "سر خیابان، حمید دست مادربزرگ را گرفت.", key: 4600, hold: 5600, do: [
              { id: "gran", walk: [392, 71], dur: 3800 }, { id: "hamid", walk: [400, 73], dur: 3800 }, { cam: { x: 382 }, dur: 3800, ease: "linear" },
              { id: "hamid.armF", to: { r: -50 }, at: 4000, dur: 600 }, { id: "gran.armB", to: { r: 40 }, at: 4000, dur: 600 }] },
            { caption: "با هم از خیابان رد شدند.", key: 1600, hold: 4200, do: [
              { id: "gran", to: { x: 344 }, dur: 3200, ease: "linear" }, { id: "hamid", to: { x: 352 }, dur: 3200, ease: "linear" }, { cam: { x: 344 }, dur: 3200, ease: "linear" },
              { id: "gran.legF", to: { r: 24 }, dur: 3200, yoyo: true, times: 8 }, { id: "gran.legB", to: { r: -24 }, dur: 3200, yoyo: true, times: 8 },
              { id: "hamid.legF", to: { r: 24 }, dur: 3200, yoyo: true, times: 8 }, { id: "hamid.legB", to: { r: -24 }, dur: 3200, yoyo: true, times: 8 },
              { id: "hamid.armF", to: { r: 0 }, at: 3400, dur: 400 }, { id: "gran.armB", to: { r: 0 }, at: 3400, dur: 400 }] },
            { caption: "از جلوی مدرسه رد شدند. آقای معلم به حمید سلام کرد.", key: 4400, hold: 6200, do: [
              { id: "gran", walk: [306, 71], dur: 2800 }, { id: "hamid", walk: [316, 73], dur: 2800 }, { cam: { x: 304 }, dur: 2800, ease: "linear" },
              { id: "teacher.armF", to: { r: -150 }, at: 3000, dur: 400 }, { id: "teacher.armF", to: { r: -125 }, at: 3400, dur: 1400, yoyo: true, times: 4 }, { id: "teacher.armF", to: { r: 0 }, at: 4900, dur: 400 },
              { id: "hamid.armF", to: { r: -150 }, at: 3800, dur: 400 }, { id: "hamid.armF", to: { r: -125 }, at: 4200, dur: 1200, yoyo: true, times: 4 }, { id: "hamid.armF", to: { r: 0 }, at: 5500, dur: 400 }] },
            { caption: "در پارک، باغبان به گل‌ها آب می‌داد.", key: 5200, hold: 6600, do: [
              { id: "gran", walk: [232, 71], dur: 3200 }, { id: "hamid", walk: [242, 73], dur: 3200 }, { cam: { x: 220 }, dur: 3200, ease: "linear" },
              { id: "gardener.armF", to: { r: -70 }, at: 3300, dur: 500 }, { id: "can", to: { r: 35 }, at: 3800, dur: 500 },
              { emit: "drop", where: [212, 58], spread: [4, 2], rise: 9, n: 12, at: 4000, dur: 2000, life: 900 },
              { id: "park.f1", to: { sy: 1.35 }, at: 4400, dur: 1400 },
              { id: "can", to: { r: 0 }, at: 6000, dur: 400 }, { id: "gardener.armF", to: { r: 0 }, at: 6200, dur: 400 }] },
            { caption: "این درمانگاه است. خانم دکتر به آدم‌های بیمار کمک می‌کند.", key: 5200, hold: 7000, do: [
              { id: "gran", walk: [160, 71], dur: 3200 }, { id: "hamid", walk: [170, 73], dur: 3200 }, { cam: { x: 140 }, dur: 3200, ease: "linear" },
              { id: "patient.body", to: { r: 8 }, at: 1000, dur: 1600, yoyo: true, times: 4 },
              { id: "doctor.armF", to: { r: -75 }, at: 3600, dur: 700 }, { id: "doctor.armF", to: { r: 0 }, at: 6000, dur: 600 }] },
            { caption: "این‌ها محله حمید است. محله تو چه جاهایی دارد؟", hold: 4400, do: [
              { cam: { x: 334, y: 40, zoom: 0.32 }, dur: 2400 }],
              wait: { tap: ["home", "bakery", "school", "park", "clinic"], hint: "روی جاهای محله بزن!",
                each: [{ id: "$", to: { s: "+0.12" }, dur: 500, yoyo: true, times: 2 }] } }
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
        { type: "scene", prompt: "پریا و پدربزرگ نان می‌خرند", bg: "#cdeaf7",
          /* The route of the map step that follows (home → park → crossing → fruit shop → bakery), walked for real: the
             street is wider than the stage and the camera follows Pariya and her grandfather. */
          parts: {
            sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            bakery: { art: "w-bakery", at: [230, 64], s: 1.3 }, baker: { art: "🧑‍🍳", at: [216, 62], s: 0.95 }, counter: { art: "w-bakery-counter", at: [230, 64], s: 1.3, sy: 2 },
            fruit: { art: "w-fruit", at: [320, 64], s: 1.3 }, fruiter: { art: "👨", at: [328, 71], flip: true, look: { top: "#fffaf0", bottom: "#5a9a45" } },
            crossing: { art: "w-crossing", at: [400, 64] }, car: { art: "w-car-front", at: [400, 40], s: 0.4, o: 0 },
            park: { art: "w-park", at: [472, 64], s: 1.2 }, home: { art: "w-house", at: [540, 64], s: 1.4 },
            a1: { art: "🍎", s: 0.3, at: [300, 54] }, a2: { art: "🍎", s: 0.3, at: [304, 54] }, a3: { art: "🍎", s: 0.3, at: [308, 54] },
            loaf: { art: "w-breads", at: [226, 53], s: 0.8, o: 0 },
            grandpa: { art: "👴", at: [540, 64], flip: true, o: 0 }, bag: { art: "w-cloth-bag", under: "grandpa", at: [-1, -7] },
            girl: { art: "👧", at: [540, 64], s: 1.25, flip: true, o: 0, look: { top: "#e46b8a", bottom: "#b04a6a" } },
            near: { art: "w-dist-near", o: 0 }, far2: { art: "w-dist-far", o: 0 }
          },
          scenes: [
            { caption: "پریا و پدربزرگ می‌خواهند نان بخرند.", hold: 4600, do: [
              { cam: { x: 516 }, dur: 1 }, { id: "home.door", to: { sx: 0.15 }, dur: 600 },
              { id: "grandpa", to: { o: 1 }, at: 700, dur: 300 }, { id: "grandpa", walk: [528, 71], at: 700, dur: 1400 },
              { id: "girl", to: { o: 1 }, at: 1300, dur: 300 }, { id: "girl", walk: [540, 73], at: 1300, dur: 1200 },
              { id: "home.door", to: { sx: 1 }, at: 2800, dur: 600 }] },
            { caption: "اول از کنار پارک رد می‌شوند.", key: 2600, hold: 5200, do: [
              { id: "grandpa", walk: [446, 71], dur: 4600 }, { id: "girl", walk: [458, 73], dur: 4600 }, { cam: { x: 452 }, dur: 4600, ease: "linear" }] },
            { caption: "سر خیابان می‌ایستند. پریا دست پدربزرگ را می‌گیرد.", key: 3600, hold: 5200, do: [
              { id: "grandpa", walk: [418, 71], dur: 1800 }, { id: "girl", walk: [428, 73], dur: 1800 }, { cam: { x: 404 }, dur: 1800, ease: "linear" },
              { id: "girl.armF", to: { r: -50 }, at: 2200, dur: 600 }, { id: "grandpa.armB", to: { r: 40 }, at: 2200, dur: 600 }] },
            { caption: "ماشینی نمی‌آید؟ حالا رد می‌شوند.", key: 1600, hold: 6800, do: [
              { id: "girl.body", to: { r: -6 }, dur: 600, yoyo: true, times: 2 }, { id: "grandpa.body", to: { r: -5 }, dur: 600, yoyo: true, times: 2 },
              { id: "car", to: { o: 1 }, at: 200, dur: 300 }, { id: "car", to: { y: 98, s: 1.5 }, at: 200, dur: 2200, ease: "in" }, { id: "car", to: { o: 0 }, at: 2300, dur: 200 },
              { id: "grandpa", to: { x: 378 }, at: 3000, dur: 3000, ease: "linear" }, { id: "girl", to: { x: 388 }, at: 3000, dur: 3000, ease: "linear" }, { cam: { x: 384 }, at: 3000, dur: 3000, ease: "linear" },
              { id: "grandpa.legF", to: { r: 24 }, at: 3000, dur: 3000, yoyo: true, times: 8 }, { id: "grandpa.legB", to: { r: -24 }, at: 3000, dur: 3000, yoyo: true, times: 8 },
              { id: "girl.legF", to: { r: 24 }, at: 3000, dur: 3000, yoyo: true, times: 8 }, { id: "girl.legB", to: { r: -24 }, at: 3000, dur: 3000, yoyo: true, times: 8 }] },
            { caption: "از میوه‌فروشی سیب می‌خرند.", key: 5200, hold: 7000, do: [
              { id: "girl.armF", to: { r: 0 }, dur: 400 }, { id: "grandpa.armB", to: { r: 0 }, dur: 400 },
              { id: "grandpa", walk: [342, 71], dur: 2400 }, { id: "girl", walk: [352, 73], dur: 2400 }, { cam: { x: 330 }, dur: 2400, ease: "linear" },
              { id: "fruiter.armF", to: { r: -60 }, at: 2800, dur: 500 },
              { id: "a1", path: "M300 54Q322 38 344 62", at: 3200, dur: 900 }, { id: "a1", to: { o: 0 }, at: 4000, dur: 200 },
              { id: "a2", path: "M304 54Q324 38 344 62", at: 4100, dur: 900 }, { id: "a2", to: { o: 0 }, at: 4900, dur: 200 },
              { id: "a3", path: "M308 54Q326 40 344 62", at: 5000, dur: 900 }, { id: "a3", to: { o: 0 }, at: 5800, dur: 200 },
              { id: "fruiter.armF", to: { r: 0 }, at: 6000, dur: 500 }] },
            { caption: "رسیدند به نانوایی. نان داغ!", key: 6000, hold: 7400, do: [
              { id: "grandpa", walk: [252, 71], dur: 3800 }, { id: "girl", walk: [262, 73], dur: 3800 }, { cam: { x: 240 }, dur: 3800, ease: "linear" },
              { id: "counter.bread", to: { o: 1 }, at: 1000, dur: 500 }, { id: "loaf", to: { o: 1 }, at: 1000, dur: 500 },
              { id: "bakery.glow", to: { s: 1.15 }, dur: 7000, yoyo: true, times: 10 },
              { id: "baker.armF", to: { r: -55 }, at: 4000, dur: 600 }, { id: "grandpa.armF", to: { r: -60 }, at: 4200, dur: 600 },
              { id: "loaf", path: "M226 53Q236 44 244 56", at: 4400, dur: 1000 }, { id: "baker.armF", to: { r: 0 }, at: 5400, dur: 500 },
              { emit: "bubble", where: [244, 50], spread: [6, 2], n: 8, rise: -9, at: 5400, dur: 2000 },
              { id: "girl", to: { y: "-2" }, at: 5600, dur: 700, yoyo: true, times: 2 }] },
            { caption: "نانوایی از خانه پریا دور است. پارک نزدیک است.", hold: 7600, do: [
              { cam: { x: 385, y: 40, zoom: 0.45 }, dur: 2000 },
              { id: "far2", to: { o: 1 }, at: 2200, dur: 200 }, { id: "far2", draw: true, at: 2200, dur: 1600 }, { id: "bakery", to: { s: 1.45 }, at: 3800, dur: 600, yoyo: true, times: 2 },
              { id: "near", to: { o: 1 }, at: 4800, dur: 200 }, { id: "near", draw: true, at: 4800, dur: 900 }, { id: "park", to: { s: 1.35 }, at: 5700, dur: 600, yoyo: true, times: 2 }] }
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

    /* Sources: needs and wants, work and money (NCSS C3 D2.Eco.1–2.K–2: choices, goods and services, people work to
       earn money; OECD/INFE financial literacy for young children; England EYFS "People, culture and communities").
       Needs: food, water, a home, clothes. Saving in a piggy bank with عیدی, a familiar habit in Iran. No prices or
       brands; the shop is a neighbourhood بقالی. */
    {
      id: "world-seed-13", subject: "world", level: "seed", emoji: "🛒", title: "لازم دارم، دوست دارم",
      steps: [
        { type: "scene", prompt: "مینا و پدرش خرید می‌کنند", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" }, mina: { art: "w-mina", at: [80, 86], s: 1.25 },
            n1: { art: "🍞", at: [110, 40], s: 0.8, o: 0 }, n2: { art: "💧", at: [136, 40], s: 0.8, o: 0 }, n3: { art: "🏠", at: [110, 68], s: 0.8, o: 0 }, n4: { art: "👕", at: [136, 68], s: 0.8, o: 0 },
            w1: { art: "🧸", at: [24, 40], s: 0.8, o: 0 }, w2: { art: "🍭", at: [50, 40], s: 0.8, o: 0 }, w3: { art: "🎈", at: [37, 68], s: 0.8, o: 0 },
            shop: { art: "w-shop-in", o: 0 }, keeper: { art: "w-fruiter", at: [140, 74], s: 1.2, o: 0 }, counter: { art: "w-counter2", o: 0 },
            doll: { art: "🧸", at: [70, 24], s: 0.6, o: 0 },
            i1: { art: "🍞", at: [22, 44], s: 0.55, o: 0 }, i2: { art: "🥛", at: [40, 44], s: 0.55, o: 0 }, i3: { art: "🍚", at: [58, 44], s: 0.55, o: 0 },
            dad: { art: "w-dad2", at: [-14, 86], s: 1.2, o: 0 }, basket: { art: "🧺", under: "dad", at: [-6, -9], s: 0.42 },
            minaS: { art: "w-mina", at: [-26, 86], s: 1.25, o: 0 },
            money: { art: "w-money", at: [100, 66], s: 1.2, o: 0 }, bag: { art: "🛍", at: [122, 54], s: 0.6, o: 0 },
            room: { art: "w-room4", o: 0 }, chair: { art: "🪑", at: [96, 86], s: 1.1, o: 0 }, dadW: { art: "w-dad-hammer", at: [70, 86], s: 1.2, o: 0 },
            pay: { art: "w-money", at: [124, 52], s: 1.2, o: 0 },
            room2: { art: "w-room", o: 0 }, table: { art: "w-table", at: [104, 86], s: 1.3, o: 0 }, piggy: { art: "w-piggy", at: [104, 67], s: 1.2, o: 0 },
            minaP: { art: "w-mina", at: [76, 86], s: 1.25, o: 0 },
            c1: { art: "🪙", at: [86, 64], s: 0.25, o: 0 }, c2: { art: "🪙", at: [86, 64], s: 0.25, o: 0 }
          },
          scenes: [
            { caption: "برای زندگی چیزهایی لازم داریم: غذا، آب، خانه و لباس.", key: 6200, hold: 7200, do: D(
              [{ id: "n1", to: { o: 1 }, at: 1600, dur: 500 }, pulse("n1", 2100, 1.2), { id: "n2", to: { o: 1 }, at: 2800, dur: 500 }, pulse("n2", 3300, 1.2),
                { id: "n3", to: { o: 1 }, at: 4000, dur: 500 }, pulse("n3", 4500, 1.2), { id: "n4", to: { o: 1 }, at: 5200, dur: 500 }, pulse("n4", 5700, 1.2)],
              wave("mina", 600, 1400)) },
            { caption: "چیزهایی هم هست که دوستشان داریم، ولی بدونشان هم می‌شود زندگی کرد: اسباب‌بازی، آب‌نبات، بادکنک.", key: 7600, hold: 8400, do: D(
              [{ id: "w1", to: { o: 1 }, at: 3600, dur: 500 }, pulse("w1", 4100, 1.2), { id: "w2", to: { o: 1 }, at: 4900, dur: 500 }, pulse("w2", 5400, 1.2),
                { id: "w3", to: { o: 1 }, at: 6200, dur: 500 }, { id: "w3", to: { y: "-3" }, at: 6700, dur: 1400, yoyo: true, times: 2 },
                { id: "mina.smile", to: { o: 0 }, at: 4200, dur: 200 }, { id: "mina.laugh", to: { o: 1 }, at: 4200, dur: 200 }]) },
            { caption: "مینا و پدرش به بقالی محله رفتند.", key: 3400, hold: 5000, do: D(
              hide(["meadow", "mina", "n1", "n2", "n3", "n4", "w1", "w2", "w3"]), show(["shop", "keeper", "counter", "doll", "i1", "i2", "i3", "dad", "minaS"], 300, 700),
              walk("dad", { x: 48 }, 900, 2800), walk("minaS", { x: 26 }, 1100, 2800), wave("keeper", 3600, 1400, "armL")) },
            { caption: "پدر نان و شیر و برنج برداشت. این‌ها را لازم دارند.", key: 4800, hold: 6400, do: D(
              [{ id: "dad.armL", to: { r: 40 }, at: 400, dur: 500 },
                { id: "i1", path: "M22 44Q30 40 41 74", at: 900, dur: 1000 }, { id: "i1", to: { o: 0 }, at: 1800, dur: 200 },
                { id: "i2", path: "M40 44Q44 40 41 74", at: 2200, dur: 1000 }, { id: "i2", to: { o: 0 }, at: 3100, dur: 200 },
                { id: "i3", path: "M58 44Q50 40 41 74", at: 3500, dur: 1000 }, { id: "i3", to: { o: 0 }, at: 4400, dur: 200 },
                { id: "dad.armL", to: { r: 0 }, at: 4600, dur: 500 }, pulse("basket", 4800, 1.3)]) },
            { caption: "مینا یک عروسک دید و خیلی دوستش داشت. ولی امروز فقط چیزهای لازم را می‌خرند.", key: 2600, hold: 7600, do: D(
              [pulse("doll", 400, 1.4), pulse("doll", 1500, 1.4), { id: "minaS.armR", to: { r: -150 }, at: 1600, dur: 600 },
                { id: "minaS.armR", to: { r: 0 }, at: 4600, dur: 600 }, { id: "minaS.head", to: { r: 8 }, at: 5400, dur: 400, yoyo: true, times: 2 }],
              talk("dad", 3000, 1600)) },
            { caption: "پدر به فروشنده پول داد. فروشنده چیزها را در کیسه گذاشت.", key: 5600, hold: 6800, do: D(
              walk("dad", { x: 98 }, 0, 2200), walk("minaS", { x: 76 }, 200, 2200),
              [{ id: "dad.armR", to: { r: -80 }, at: 2400, dur: 500 }, { id: "money", to: { x: 104, y: 60, o: 1 }, at: 2800, dur: 300 },
                { id: "money", path: "M104 60Q116 46 128 52", at: 3100, dur: 900 }, { id: "dad.armR", to: { r: 0 }, at: 3400, dur: 500 },
                { id: "keeper.armL", to: { r: 60 }, at: 3900, dur: 400 }, { id: "money", to: { o: 0 }, at: 4200, dur: 300 },
                { id: "bag", to: { o: 1 }, at: 4500, dur: 400 }, pulse("bag", 5000, 1.3), { id: "keeper.armL", to: { r: 0 }, at: 5000, dur: 400 }]) },
            { caption: "پدر مینا نجار است. کار می‌کند و برای کارش پول می‌گیرد.", key: 5600, hold: 7200, do: D(
              hide(["shop", "keeper", "counter", "doll", "dad", "minaS", "bag"]), show(["room", "chair", "dadW"], 300, 700),
              [{ id: "dadW.armR", to: { r: -110 }, at: 1100, dur: 400 }, { id: "dadW.armR", to: { r: -60 }, at: 1500, dur: 2600, yoyo: true, times: 8 },
                { id: "chair", to: { y: "+0.6" }, at: 1700, dur: 2400, yoyo: true, times: 8 }, { id: "dadW.armR", to: { r: 0 }, at: 4200, dur: 400 },
                { id: "pay", to: { o: 1 }, at: 4600, dur: 300 }, { id: "pay", path: "M124 52Q100 40 82 60", at: 4800, dur: 1000 }, { id: "dadW.armR", to: { r: -60 }, at: 5300, dur: 400 }]) },
            { caption: "مینا عیدی‌اش را در قلک می‌گذارد تا یک روز خودش عروسک بخرد.", key: 3800, hold: 6800, do: D(
              hide(["room", "chair", "dadW", "pay"]), show(["room2", "table", "piggy", "minaP"], 300, 700),
              [{ id: "minaP.armR", to: { r: -100 }, at: 1300, dur: 500 },
                { id: "c1", to: { o: 1 }, at: 1800, dur: 200 }, { id: "c1", path: "M90 60Q100 48 104 56", at: 2000, dur: 900 }, { id: "c1", to: { o: 0 }, at: 2800, dur: 200 },
                { id: "c2", to: { o: 1 }, at: 3300, dur: 200 }, { id: "c2", path: "M90 60Q100 48 104 56", at: 3500, dur: 900 }, { id: "c2", to: { o: 0 }, at: 4300, dur: 200 },
                { id: "minaP.armR", to: { r: 0 }, at: 4600, dur: 400 }, pulse("piggy", 4600, 1.2),
                { id: "minaP.smile", to: { o: 0 }, at: 4800, dur: 200 }, { id: "minaP.laugh", to: { o: 1 }, at: 4800, dur: 200 }]) }
          ],
          question: "کدام را برای زندگی لازم داریم؟", pic: true,
          options: [{ label: "🎈", value: "بادکنک" }, { label: "💧", value: "آب" }, { label: "🍭", value: "آب‌نبات" }], answer: "آب" },
        { type: "sort", prompt: "لازم داریم یا دوست داریم؟",
          say: "کدام را برای زندگی لازم داریم؟ کدام را فقط دوست داریم؟",
          baskets: [{ pic: "🏠", label: "لازم داریم", value: "need" }, { pic: "💛", label: "دوست داریم", value: "want" }],
          items: [
            { pic: "🍞", say: "نان", basket: "need" },
            { pic: "💧", say: "آب", basket: "need" },
            { pic: "🧥", say: "لباس گرم", basket: "need" },
            { pic: "🧸", say: "عروسک", basket: "want" },
            { pic: "🍭", say: "آب‌نبات", basket: "want" },
            { pic: "🎈", say: "بادکنک", basket: "want" }
          ] },
        { type: "choose", prompt: "در مغازه، برای خریدن چه می‌دهیم؟", say: "در مغازه، برای خریدن چیزها به فروشنده چه می‌دهیم؟", pic: true,
          options: [{ label: "🌸", value: "گل" }, { label: "🪙", value: "پول" }, { label: "🧸", value: "اسباب‌بازی" }], answer: "پول" },
        { type: "choose", prompt: "پدر مینا پول را از کجا می‌آورد؟", say: "پدر مینا پول را از کجا می‌آورد؟", pic: true,
          options: [{ label: "🌳", value: "از درخت می‌چیند" }, { label: "🧰", value: "کار می‌کند" }, { label: "🎈", value: "از آسمان می‌افتد" }], answer: "کار می‌کند" },
        home({ pic: "🛒 💛", text: "در مغازه، یک چیز لازم و یک چیز دوست‌داشتنی پیدا کن.",
          need: ["یک خرید معمولی با کودک"],
          steps: [
            "در بقالی یا میوه‌فروشی از کودک بپرسید: «کدوم رو لازم داریم؟ کدوم رو فقط دوست داریم؟»",
            "بگذارید پول را خودش به فروشنده بدهد و ببیند فروشنده چه چیزی به شما می‌دهد.",
            "از کار خودتان برایش بگویید: «من کار می‌کنم و با پولش نان و میوه می‌خریم.»",
            "اگر قلک دارد، با هم برای چیزی که دوست دارد پس‌انداز کنید."
          ],
          ask: "یک چیز بگو که لازم داریم، و یک چیز که فقط دوستش داری." })
      ]
    },

    /* Sources: caring for shared places (NCSS C3 D2.Civ.10.K–2 and D2.Geo.4.K–2; UNESCO ESD for early childhood;
       Iran's preschool theme «محیط زیست»). Safety: litter is picked up by a grown-up, or by children only with
       gloves; never broken glass or sharp things. Kindness to animals: watching, not chasing or feeding. */
    {
      id: "world-seed-14", subject: "world", level: "seed", emoji: "🌳", title: "پارک مال همه است",
      steps: [
        { type: "scene", prompt: "یاسمن در پارک", bg: "#cdeaf7",
          parts: {
            park: { art: "w-park-bg" }, bin: { art: "🗑", at: [56, 74], s: 0.6 }, bench: { art: "w-bench", at: [96, 78], s: 1.2 },
            b1: { art: "🐦", at: [28, 82], s: 0.5 }, b2: { art: "🐦", at: [40, 84], s: 0.5, flip: true },
            arash: { art: "w-boy2-sit", at: [100, 72], s: 1.05 }, granS: { art: "w-gran-sit", at: [110, 72], s: 1.05, o: 0 },
            gran: { art: "w-gran", at: [156, 86], s: 1.15, o: 0 },
            bottle: { art: "w-bottle", at: [128, 86], s: 1.4 },
            yas: { art: "w-yasaman", at: [72, 86], s: 1.15 }, banana: { art: "w-banana", under: "yas", at: [5.6, -12], o: 0 },
            peel: { art: "w-banana-peel", at: [78, 74], s: 1.2, o: 0 },
            dad: { art: "w-dad-glove", at: [146, 86], s: 1.2 }
          },
          scenes: [
            { caption: "این پارک مال همه است: بچه‌ها، بزرگ‌ترها، پرنده‌ها و گل‌ها.", key: 4000, hold: 6400, do: D(
              [{ id: "b1", to: { r: 25 }, at: 400, dur: 4800, yoyo: true, times: 10 }, { id: "b2", to: { r: -25 }, at: 800, dur: 4800, yoyo: true, times: 10 },
                { id: "park.fl1", to: { r: 8 }, dur: 6000, yoyo: true, times: 6 }, { id: "park.fl2", to: { r: -8 }, dur: 6000, yoyo: true, times: 6 },
                { id: "park.fl3", to: { r: 8 }, dur: 6000, yoyo: true, times: 6 }, { id: "park.fl4", to: { r: -8 }, dur: 6000, yoyo: true, times: 6 }],
              wave("yas", 1600, 1600), wave("dad", 2400, 1600, "armL"), wave("arash", 3200, 1400)) },
            { caption: "یاسمن موز خورد. بعد پوستش را در سطل آشغال انداخت.", key: 4300, hold: 6800, do: D(
              show(["banana"], 0, 300), eat("yas", 400, 2, "armR"),
              [{ id: "banana", to: { o: 0 }, at: 2400, dur: 300 }, { id: "peel", to: { o: 1 }, at: 2600, dur: 200 }],
              walk("yas", { x: 66 }, 2600, 1000),
              [{ id: "peel", to: { x: 72, y: 74 }, at: 2600, dur: 1000, ease: "linear" }, { id: "yas.armR", to: { r: -60 }, at: 3800, dur: 300 },
                { id: "peel", path: "M72 74Q66 60 57 66", at: 4000, dur: 700 }, { id: "peel", to: { o: 0 }, at: 4600, dur: 200 }, pulse("bin", 4700, 1.2),
                { id: "yas.armR", to: { r: 0 }, at: 4800, dur: 300 }]) },
            { caption: "یک بطری روی زمین افتاده بود. پدر یاسمن دستکش داشت. آن را برداشت و در سطل انداخت.", key: 5000, hold: 9000, do: D(
              walk("dad", { x: 134 }, 600, 1200),
              [{ id: "dad", to: { sy: 0.88 }, at: 1900, dur: 500 }, { id: "dad.armR", to: { r: -20 }, at: 1900, dur: 500 },
                { id: "bottle", to: { x: 141, y: 74 }, at: 2400, dur: 500 }, { id: "dad", to: { sy: 1 }, at: 2500, dur: 500 }],
              walk("dad", { x: 76 }, 3200, 3200),
              [{ id: "bottle", to: { x: 83, y: 74 }, at: 3200, dur: 3200, ease: "linear" }, { id: "dad.armR", to: { r: -70 }, at: 6500, dur: 400 },
                { id: "bottle", path: "M83 70Q70 56 57 66", at: 6800, dur: 700 }, { id: "bottle", to: { o: 0 }, at: 7400, dur: 200 }, pulse("bin", 7500, 1.2),
                { id: "dad.armR", to: { r: 0 }, at: 7700, dur: 300 }]) },
            { caption: "یاسمن گل‌ها را نمی‌کند. فقط نگاهشان می‌کند و بویشان می‌کند.", key: 4600, hold: 6200, do: D(
              walk("yas", { x: 128 }, 300, 2800),
              [{ id: "yas.head", to: { r: 18 }, at: 3300, dur: 600 }, { id: "yas", to: { sy: 0.9 }, at: 3300, dur: 600 },
                { id: "park.fl2", to: { r: 12 }, at: 3600, dur: 1600, yoyo: true, times: 2 },
                { id: "yas.eyes", to: { o: 0 }, at: 3900, dur: 200 }, { id: "yas.shut", to: { o: 1 }, at: 3900, dur: 200 },
                { id: "yas.eyes", to: { o: 1 }, at: 5400, dur: 200 }, { id: "yas.shut", to: { o: 0 }, at: 5400, dur: 200 },
                { id: "yas.head", to: { r: 0 }, at: 5500, dur: 500 }, { id: "yas", to: { sy: 1 }, at: 5500, dur: 500 }]) },
            { caption: "پرنده‌ها دانه می‌خورند. یاسمن آرام از کنارشان رد می‌شود و اذیتشان نمی‌کند.", key: 4400, hold: 7000, do: D(
              walk("yas", { x: 18 }, 300, 6000),
              [{ id: "b1", to: { r: 25 }, dur: 6400, yoyo: true, times: 12 }, { id: "b2", to: { r: -25 }, at: 300, dur: 6400, yoyo: true, times: 12 }]) },
            { caption: "روی نیمکت جا برای همه هست. آرش کمی کنار رفت تا مادربزرگ هم بنشیند.", key: 6400, hold: 7600, do: D(
              show(["gran"], 0, 400), walk("gran", { x: 120 }, 300, 2600),
              [{ id: "arash", to: { x: 86 }, at: 2200, dur: 1200 }, { id: "arash.head", to: { r: 8 }, at: 2200, dur: 500 },
                { id: "gran", to: { o: 0 }, at: 3600, dur: 400 }, { id: "granS", to: { o: 1 }, at: 3600, dur: 400 },
                { id: "granS.smile", to: { o: 0 }, at: 4600, dur: 200 }, { id: "granS.laugh", to: { o: 1 }, at: 4600, dur: 200 },
                { id: "arash.head", to: { r: 0 }, at: 4800, dur: 400 }], talk("granS", 4800, 1400)) },
            { caption: "پارک تمیز و قشنگ ماند. فردا هم همه می‌توانند اینجا بازی کنند.", key: 3600, hold: 6000, do: D(
              walk("yas", { x: 50 }, 0, 2400), walk("dad", { x: 66 }, 0, 1200),
              [{ emit: "spark", where: [80, 40], spread: [120, 30], n: 16, at: 2400, dur: 3000, life: 1400 },
                { id: "yas.smile", to: { o: 0 }, at: 2600, dur: 200 }, { id: "yas.laugh", to: { o: 1 }, at: 2600, dur: 200 },
                { id: "arash.smile", to: { o: 0 }, at: 2800, dur: 200 }, { id: "arash.laugh", to: { o: 1 }, at: 2800, dur: 200 }]) }
          ] },
        { type: "scene", prompt: "پارک را تمیز کنیم", bg: "#cdeaf7",
          parts: {
            park: { art: "w-park-bg" }, bin: { art: "🗑", at: [56, 74], s: 0.6 },
            l1: { art: "w-paper", at: [30, 82], s: 1.6 }, l2: { art: "w-can", at: [94, 86], s: 1.5 }, l3: { art: "w-bottle", at: [116, 78], s: 1.5 }, l4: { art: "w-paper", at: [146, 86], s: 1.6 },
            yas: { art: "w-yasaman-glove", at: [72, 86], s: 1.15 }
          },
          scenes: [
            { caption: "بعد از یک روز شلوغ، کمی آشغال روی زمین مانده. یاسمن دستکش پوشیده و کمک می‌کند. تو هم کمک کن!", hold: 2000,
              do: D(wave("yas", 600, 1400)),
              wait: { tap: ["l1", "l2", "l3", "l4"], hint: "روی هر آشغال بزن تا در سطل برود!",
                each: [{ id: "$", to: { x: 56, y: 66, s: 0.8 }, dur: 900 }, { id: "$", to: { o: 0 }, at: 800, dur: 200 },
                  { id: "bin", to: { s: 0.7 }, at: 800, dur: 300, yoyo: true, times: 2 }, { id: "yas", to: { y: "-2" }, dur: 400, yoyo: true, times: 2 }] } },
            { caption: "آفرین! حالا پارک تمیز است.", key: 1600, hold: 4000, do: D(
              hide(["l1", "l2", "l3", "l4"], 0, 300),
              [{ emit: "spark", where: [80, 40], spread: [120, 30], n: 14, at: 300, dur: 2400, life: 1400 },
                { id: "yas.smile", to: { o: 0 }, at: 600, dur: 200 }, { id: "yas.laugh", to: { o: 1 }, at: 600, dur: 200 }], wave("yas", 900, 1600)) }
          ] },
        { type: "sort", prompt: "برای پارک خوب است یا نه؟",
          say: "کدام کار برای پارک خوب است؟ کدام خوب نیست؟",
          baskets: [{ pic: "💚", label: "خوب است", value: "yes" }, { pic: "💔", label: "خوب نیست", value: "no" }],
          items: [
            { pic: "🗑️", say: "انداختن آشغال در سطل", basket: "yes" },
            { pic: "🐦", say: "آرام بودن کنار پرنده‌ها", basket: "yes" },
            { pic: "🌷", say: "بو کردن گل", basket: "yes" },
            { pic: "🥀", say: "کندن گل‌ها", basket: "no" },
            { pic: "🍬", say: "انداختن کاغذ شکلات روی زمین", basket: "no" },
            { pic: "✏️", say: "نوشتن روی نیمکت", basket: "no" }
          ] },
        { type: "sort", prompt: "در خیابان و اتوبوس",
          say: "در خیابان و اتوبوس، کدام کار خوب است؟ کدام خوب نیست؟",
          baskets: [{ pic: "💚", label: "خوب است", value: "yes" }, { pic: "💔", label: "خوب نیست", value: "no" }],
          items: [
            { pic: "🚌", say: "جا دادن به مادربزرگ در اتوبوس", basket: "yes" },
            { pic: "🍌", say: "نگه داشتن پوست میوه تا رسیدن به سطل", basket: "yes" },
            { pic: "🗣️", say: "داد زدن در اتوبوس", basket: "no" },
            { pic: "🖍️", say: "خط کشیدن روی دیوار کوچه", basket: "no" }
          ] },
        home({ pic: "🧤 🗑️", text: "با یک بزرگ‌تر، کمی از پارک یا کوچه را تمیز کنید.",
          need: ["دستکش برای هر نفر", "یک کیسه"],
          steps: [
            "با دستکش، کاغذ و بطری و قوطی را از زمین بردارید و در کیسه یا سطل بیندازید.",
            "شیشه شکسته، چیزهای تیز، سرنگ یا هر چیز ناشناخته را بزرگ‌تر جمع می‌کند، نه کودک. اگر لازم بود، به مسئول پارک خبر دهید.",
            "بعد دست‌ها را با آب و صابون بشویید.",
            "بپرسید: «حالا اینجا چه شکلی شده؟ کی از این جای تمیز خوشحال می‌شه؟»"
          ],
          ask: "تو در پارک چه کار می‌کنی تا برای همه تمیز و قشنگ بماند؟" })
      ]
    },

    /* Sources: Nowruz customs (خانه‌تکانی، سبزه، هفت‌سین، دید و بازدید، عیدی): Encyclopaedia Iranica, "Nowruz"
       (A. Shahbazi, 2016); UNESCO Representative List of the Intangible Cultural Heritage, "Nowruz" (2009, extended
       2016: Iran and its neighbours). Haft-sin items vary by family; only common food and plant items are shown,
       no religious objects. Shown as culture, not religion. */
    {
      id: "world-seed-5", subject: "world", level: "seed", emoji: "🌱", title: "نوروز",
      steps: [
        { type: "scene", prompt: "نوروز شیلان", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" }, snowG: { art: "w-snow-ground" }, sun: { art: "w-sun", at: [132, 34], s: 0.9 },
            tree: { art: "w-blossom-tree", at: [74, 80], s: 1.5 },
            room: { art: "w-room", o: 0 }, dust: { art: "w-win-dust", o: 0 }, room2: { art: "w-room2", o: 0 },
            table: { art: "w-table", at: [126, 86], s: 1.2, o: 0 }, stool: { art: "w-stool", at: [80, 88], s: 1.2, o: 0 },
            momB: { art: "w-mom-broom", at: [34, 86], s: 1.2, o: 0 }, dadC: { art: "w-dad-cloth", at: [80, 78], s: 1.2, o: 0 }, girlC: { art: "w-girl-cloth", at: [112, 86], s: 1.2, o: 0 },
            haft: { art: "w-haftsin-table", at: [70, 86], s: 1.5, o: 0 },
            sabzeh: { art: "w-sabzeh", at: [126, 68], s: 1.5, o: 0 }, cal: { art: "w-calendar", at: [26, 30], s: 1.3, o: 0 },
            apple: { art: "🍎", at: [150, 60], s: 0.34, o: 0 }, garlic: { art: "🧄", at: [150, 60], s: 0.34, o: 0 }, coin: { art: "🪙", at: [150, 60], s: 0.28, o: 0 },
            hyac: { art: "🪻", at: [150, 60], s: 0.38, o: 0 }, mirror: { art: "🪞", at: [150, 60], s: 0.5, o: 0 },
            girl: { art: "w-girl", at: [128, 86], s: 1.2, o: 0 }, mom: { art: "w-mom", at: [24, 86], s: 1.2, o: 0 }, dad: { art: "w-dad", at: [44, 86], s: 1.2, o: 0 },
            gran: { art: "w-gran2", at: [118, 86], s: 1.2, o: 0 }, grandpa: { art: "w-grandpa", at: [48, 86], s: 1.2, o: 0 },
            money: { art: "w-money", at: [40, 70], s: 1.2, o: 0 },
            map: { art: "w-map-big", at: [80, 46], o: 0 },
            n1: { art: "w-sabzeh", at: [70, 34], s: 0.5, o: 0 }, n2: { art: "w-sabzeh", at: [74, 60], s: 0.5, o: 0 }, n3: { art: "w-sabzeh", at: [52, 22], s: 0.5, o: 0 },
            n4: { art: "w-sabzeh", at: [99, 30], s: 0.5, o: 0 }, n5: { art: "w-sabzeh", at: [58, 16], s: 0.5, o: 0 }, n6: { art: "w-sabzeh", at: [92, 17], s: 0.5, o: 0 },
            n7: { art: "w-sabzeh", at: [115, 41], s: 0.5, o: 0 }, n8: { art: "w-sabzeh", at: [44, 44], s: 0.5, o: 0 }
          },
          scenes: [
            { caption: "زمستان تمام شد. بهار آمد و درخت‌ها شکوفه دادند.", key: 5600, hold: 6400, do: D(
              [{ id: "sun", to: { y: 18 }, dur: 1600 }, { id: "sun.rays", to: { r: 90 }, dur: 6000 },
                { emit: "drop", where: [74, 30], spread: [30, 10], rise: 12, n: 10, at: 600, dur: 1600, life: 900 },
                { id: "tree.snow", to: { o: 0 }, at: 600, dur: 1400 }, { id: "snowG", to: { o: 0 }, at: 800, dur: 1800 }],
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b, i) { return { id: "tree." + b, to: { s: 0.1 }, dur: 1 }; }),
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b, i) { return { id: "tree." + b, to: { o: 1, s: 1 }, at: 2600 + i * 280, dur: 600, ease: "back" }; })) },
            { caption: "نوروز نزدیک است. شیلان و پدر و مادرش خانه را تمیز می‌کنند: خانه‌تکانی!", key: 2600, hold: 6000, do: D(
              show(["room", "dust", "table", "stool", "momB", "dadC", "girlC"], 0, 700),
              [{ id: "sabzeh.grass", to: { sy: 0.05 }, dur: 1 },
                { id: "momB.armR", to: { r: -28 }, at: 900, dur: 3600, yoyo: true, times: 8 },
                { emit: "bubble", where: [44, 86], spread: [10, 2], n: 8, rise: -4, at: 1000, dur: 3400 },
                { id: "dadC.armR", to: { r: -178 }, at: 700, dur: 600 }, { id: "dadC.armR", to: { r: -160 }, at: 1300, dur: 3200, yoyo: true, times: 8 },
                { id: "dust", to: { o: 0.5 }, at: 1300, dur: 3200 },
                { id: "girlC.armL", to: { r: 70 }, at: 900, dur: 300 }, { id: "girlC.armL", to: { r: 40 }, at: 1200, dur: 3200, yoyo: true, times: 8 },
                { id: "girlC.armL", to: { r: 0 }, at: 4600, dur: 300 }]),
              wait: { rub: true, n: 6, hint: "حالا تو کمک کن: روی پنجره چپ و راست بکش تا تمیز شود!",
                each: [{ id: "dadC.armR", to: { r: "+14" }, dur: 300, yoyo: true, times: 2 }, { id: "dust", to: { o: "-0.09" }, dur: 300 },
                  { emit: "spark", where: [80, 30], spread: [24, 8], n: 2, dur: 200 }] } },
            { caption: "شیلان دو هفته پیش عدس خیس کرده بود. حالا سبزه سبز شده.", key: 4200, hold: 7600, do: D(
              [{ id: "dust", to: { o: 0 }, dur: 400 }, { id: "dadC.armR", to: { r: 0 }, dur: 400 }], hide(["momB", "dadC", "stool", "girlC"]),
              show(["girl", "sabzeh", "cal"], 400, 500),
              [{ emit: "drop", where: [126, 58], spread: [8, 2], rise: 6, n: 6, at: 1000, dur: 1000, life: 700 },
                { id: "girl.armL", to: { r: 60 }, at: 900, dur: 400 }, { id: "girl.armL", to: { r: 0 }, at: 2000, dur: 400 },
                { count: "cal", from: 1, to: 14, at: 2000, dur: 4400 }, { id: "sabzeh.grass", to: { sy: 1 }, at: 2000, dur: 4400, ease: "out" },
                { id: "girl.smile", to: { o: 0 }, at: 6400, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 6400, dur: 200 }]) },
            { caption: "سفره هفت‌سین را چیدند: سبزه، سیب، سیر، سکه، سنبل… و یک آینه.", key: 6200, hold: 7600, do: D(
              hide(["cal", "table"]), show(["haft", "mom", "dad"], 0, 600),
              [{ id: "girl.laugh", to: { o: 0 }, dur: 200 }, { id: "girl.smile", to: { o: 1 }, dur: 200 },
                { id: "sabzeh", path: "M126 68Q100 50 80 66", at: 1800, dur: 800 },
                { id: "apple", to: { o: 1 }, at: 2500, dur: 100 }, { id: "apple", path: "M128 58Q110 48 92 66", at: 2500, dur: 700 },
                { id: "garlic", to: { o: 1 }, at: 3100, dur: 100 }, { id: "garlic", path: "M128 58Q104 46 68 66", at: 3100, dur: 700 },
                { id: "coin", to: { o: 1 }, at: 3700, dur: 100 }, { id: "coin", path: "M128 58Q110 46 101 66", at: 3700, dur: 700 },
                { id: "hyac", to: { o: 1 }, at: 4300, dur: 100 }, { id: "hyac", path: "M128 58Q100 44 56 66", at: 4300, dur: 800 },
                { id: "mirror", to: { o: 1 }, at: 5600, dur: 100 }, { id: "mirror", path: "M128 58Q100 36 80 56", at: 5600, dur: 800 },
                { id: "girl.armL", to: { r: 80 }, at: 1800, dur: 300 }, { id: "girl.armL", to: { r: 60 }, at: 2100, dur: 4200, yoyo: true, times: 8 }, { id: "girl.armL", to: { r: 0 }, at: 6400, dur: 300 }]) },
            { caption: "سال نو شد! همه به هم می‌گویند: «نوروز مبارک!»", key: 2600, hold: 5600, do: D(
              [{ id: "girl", to: { x: 104 }, dur: 900 }, { id: "mom", to: { x: 32 }, dur: 900 }, { id: "dad", to: { x: 132 }, dur: 900 },
                { emit: "spark", where: [80, 30], spread: [120, 30], n: 16, dur: 3000, life: 1400 }],
              wave("girl", 1000, 1800), wave("mom", 1200, 1800, "armL"), wave("dad", 1100, 1800),
              talk("girl", 2400, 1600), talk("mom", 2600, 1600), talk("dad", 2500, 1600)) },
            { caption: "به خانه مادربزرگ و پدربزرگ رفتند. پدربزرگ به شیلان عیدی داد.", key: 5000, hold: 7000, do: D(
              hide(["haft", "sabzeh", "apple", "garlic", "coin", "hyac", "mirror", "room", "mom", "dad"]), show(["room2", "gran", "grandpa"], 300, 700),
              [{ id: "girl", to: { x: 76 }, at: 900, dur: 1200 }],
              wave("gran", 1400, 1600, "armL"),
              [{ id: "grandpa.armR", to: { r: -60 }, at: 2800, dur: 600 }, { id: "money", to: { o: 1 }, at: 3200, dur: 300 },
                { id: "money", path: "M60 64Q66 56 71 66", at: 3500, dur: 900 },
                { id: "girl.armL", to: { r: 50 }, at: 3500, dur: 600 }, { id: "grandpa.armR", to: { r: 0 }, at: 4500, dur: 500 },
                { id: "girl.smile", to: { o: 0 }, at: 4500, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 4500, dur: 200 }]) },
            { caption: "در ایران و کشورهای همسایه، خیلی از مردم نوروز را جشن می‌گیرند.", hold: 7600, do: D(
              hide(["room2", "gran", "grandpa", "girl", "money", "meadow", "tree", "sun"]), show(["map"], 300, 800),
              ["n1", "n2", "n3", "n4"].map(function (n, i) { return { id: n, to: { o: 1 }, at: 1400 + i * 400, dur: 400 }; }),
              ["n5", "n6", "n7", "n8"].map(function (n, i) { return { id: n, to: { o: 1 }, at: 3600 + i * 400, dur: 400 }; })) }
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
        { type: "scene", prompt: "بچه‌ها در همه جای ایران بازی می‌کنند", bg: "#cdeaf7",
          parts: {
            alley: { art: "w-alley" }, hopS: { art: "w-hop" }, sara: { art: "w-girl3", at: [30, 80], s: 1.15 }, mapT: { art: "w-map-tehran", at: [136, 22], s: 0.7 },
            yard: { art: "w-yard-tabriz", o: 0 }, mapB: { art: "w-map-tabriz", at: [136, 22], s: 0.7, o: 0 },
            aydin: { art: "w-boy", at: [84, 84], s: 1.2, o: 0 }, friend: { art: "w-boy2", at: [128, 84], s: 1.2, o: 0 },
            st1: { art: "w-stone1", at: [22, 86], s: 1.2, o: 0 }, st2: { art: "w-stone2", at: [34, 88], s: 1.2, o: 0 }, st3: { art: "w-stone3", at: [14, 88], s: 1.2, o: 0 },
            st4: { art: "w-stone4", at: [42, 84], s: 1.2, o: 0 }, st5: { art: "w-stone5", at: [28, 82], s: 1.2, o: 0 }, st6: { art: "w-stone6", at: [12, 82], s: 1.2, o: 0 },
            st7: { art: "w-stone7", at: [40, 89], s: 1.2, o: 0 }, ball: { art: "w-ball", at: [124, 64], s: 1.1, o: 0 },
            hill: { art: "w-hill-green", o: 0 }, mapK: { art: "w-map-khorramabad", at: [136, 22], s: 0.7, o: 0 },
            gol: { art: "w-girl2-sit", at: [74, 84], s: 1.3, o: 0 },
            p1: { art: "w-pebble", at: [60, 87], s: 1.8, o: 0 }, p2: { art: "w-pebble2", at: [64, 89], s: 1.8, o: 0 }, p3: { art: "w-pebble3", at: [68, 87.6], s: 1.8, o: 0 },
            p4: { art: "w-pebble2", at: [86, 88], s: 1.8, o: 0 }, p5: { art: "w-pebble3", at: [80, 79.4], s: 1.8, o: 0 },
            beach: { art: "w-beach", o: 0 }, mapC: { art: "w-map-chabahar", at: [136, 22], s: 0.7, o: 0 },
            kid1: { art: "w-girl4", at: [70, 82], s: 1.1, o: 0 }, kid2: { art: "w-boy2", at: [84, 82], s: 1.1, o: 0 },
            yusuf: { art: "w-boy4", at: [40, 82], s: 1.15, o: 0 }, count: { art: "w-counter", at: [40, 40], o: 0 },
            palm: { art: "🌴", at: [146, 66], s: 2, o: 0 }, rock: { art: "🪨", at: [98, 88], s: 1.4, o: 0 }, boat: { art: "w-boat", at: [126, 88], s: 1.3, o: 0 },
            map: { art: "w-map-big", at: [80, 46], o: 0 },
            m1: { art: "w-girl3", at: [70, 32], s: 0.42, o: 0 }, m2: { art: "w-boy", at: [52, 20], s: 0.42, o: 0 }, m3: { art: "w-girl2", at: [58, 39], s: 0.42, o: 0 },
            m4: { art: "w-boy4", at: [106, 77], s: 0.42, o: 0 }
          },
          scenes: [
            { caption: "سارا در کوچه‌شان در تهران لی‌لی بازی می‌کند. با یک پا می‌پرد!", key: 4500, hold: 7200, do: [
              pulse("mapT.dot", 600, 2.2, 1000), { id: "sara.legR", to: { r: -42 }, at: 1800, dur: 300 },
              { id: "sara", path: "M30 80Q38 66 46 79Q54 66 62 79Q70 66 78 79Q86 66 94 79Q102 66 110 79Q118 66 126 80", at: 2200, dur: 4200, ease: "linear" },
              { id: "sara.armL", to: { r: 60 }, at: 2200, dur: 400 }, { id: "sara.armR", to: { r: -60 }, at: 2200, dur: 400 },
              { id: "sara.legR", to: { r: 0 }, at: 6500, dur: 300 }, { id: "sara.armL", to: { r: 0 }, at: 6500, dur: 300 }, { id: "sara.armR", to: { r: 0 }, at: 6500, dur: 300 }] },
            { caption: "آیدین و دوستش در تبریز هفت‌سنگ بازی می‌کنند. هفت سنگ صاف را روی هم می‌چینند…", hold: 8400, do: D(
              hide(["alley", "hopS", "sara", "mapT"]), show(["yard", "mapB", "aydin", "friend", "st1", "st2", "st3", "st4", "st5", "st6", "st7"], 0, 600),
              [pulse("mapB.dot", 1600, 2.2, 1000)],
              [1, 2, 3, 4, 5, 6, 7].map(function (k) { return { id: "st" + k, path: "M" + [22, 34, 14, 42, 28, 12, 40][k - 1] + " " + [86, 88, 88, 84, 82, 82, 89][k - 1] + "Q48 60 64 " + (86 - (k - 1) * 3.6), at: 2400 + (k - 1) * 750, dur: 650 }; }),
              [{ id: "aydin.armL", to: { r: 70 }, at: 2400, dur: 5200, yoyo: true, times: 14 }]) },
            { caption: "…و با توپ آن‌ها را می‌اندازند! بعد زود دوباره می‌چینند.", key: 2300, hold: 7000, do: D(
              show(["ball"], 0, 200),
              [{ id: "friend.armR", to: { r: -150 }, at: 200, dur: 400 }, { id: "friend.armR", to: { r: -60 }, at: 700, dur: 250 },
                { id: "ball", path: "M124 60Q96 52 66 76", at: 900, dur: 800, ease: "in" }, { id: "ball", path: "M66 76Q72 70 92 86", at: 1700, dur: 600, ease: "out" },
                { id: "friend.armR", to: { r: 0 }, at: 1200, dur: 400 }],
              [1, 2, 3, 4, 5, 6, 7].map(function (k) {
                var to = [[50, 87], [40, 89], [30, 86], [78, 88], [22, 89], [58, 89], [100, 87]][k - 1];
                return { id: "st" + k, path: "M64 " + (86 - (k - 1) * 3.6) + "Q" + (64 + (to[0] - 64) / 2) + " " + (70 - k * 2) + " " + to[0] + " " + to[1], at: 1700, dur: 700, ease: "out" };
              }),
              [1, 2, 3, 4, 5, 6, 7].map(function (k) { return { id: "st" + k, to: { r: [20, -30, 40, -15, 30, -40, 25][k - 1] }, at: 1700, dur: 700 }; }),
              [{ id: "aydin.smile", to: { o: 0 }, at: 1800, dur: 200 }, { id: "aydin.laugh", to: { o: 1 }, at: 1800, dur: 200 },
                { id: "aydin", to: { x: 76 }, at: 3000, dur: 500 }],
              [1, 2, 3, 4, 5, 6, 7].map(function (k) {
                var fr = [[50, 87], [40, 89], [30, 86], [78, 88], [22, 89], [58, 89], [100, 87]][k - 1];
                return { id: "st" + k, path: "M" + fr[0] + " " + fr[1] + "Q" + ((fr[0] + 64) / 2) + " 66 64 " + (86 - (k - 1) * 3.6), at: 3400 + (k - 1) * 400, dur: 450 };
              }),
              [1, 2, 3, 4, 5, 6, 7].map(function (k) { return { id: "st" + k, to: { r: 0 }, at: 3400 + (k - 1) * 400, dur: 450 }; }),
              [{ id: "aydin.armL", to: { r: 70 }, at: 3400, dur: 2800, yoyo: true, times: 14 }]) },
            { caption: "گل‌پری در خرم‌آباد با پنج سنگ‌ریزه یه‌قل‌دوقل بازی می‌کند.", key: 2800, hold: 7200, do: D(
              hide(["yard", "mapB", "aydin", "friend", "ball", "st1", "st2", "st3", "st4", "st5", "st6", "st7"]),
              show(["hill", "mapK", "gol", "p1", "p2", "p3", "p4", "p5"], 0, 600), [pulse("mapK.dot", 1000, 2.2, 1000)],
              [{ id: "gol.armR", to: { r: -30 }, at: 1600, dur: 300 }, { id: "p5", path: "M80 79.4Q82 20 80 79.4", at: 1900, dur: 1500, ease: "linear" },
                { id: "gol.armL", to: { r: -20 }, at: 2100, dur: 500 }, { id: "p2", path: "M64 89Q66 84 69 80", at: 2600, dur: 500 },
                { id: "gol.armL", to: { r: 0 }, at: 3000, dur: 300 },
                { id: "p5", path: "M80 79.4Q82 20 80 79.4", at: 4000, dur: 1500, ease: "linear" },
                { id: "gol.armL", to: { r: -20 }, at: 4200, dur: 500 }, { id: "p1", path: "M60 87Q64 82 68 80", at: 4700, dur: 500 }, { id: "p3", path: "M68 87.6Q69 83 70 81", at: 4700, dur: 500 },
                { id: "gol.armL", to: { r: 0 }, at: 5200, dur: 300 }, { id: "gol.armR", to: { r: 0 }, at: 5600, dur: 300 }]) },
            { caption: "یوسف و دوستانش در چابهار، کنار دریا، قایم‌موشک بازی می‌کنند. یکی چشمش را می‌بندد و تا ده می‌شمارد.", key: 6000, hold: 10400, do: D(
              hide(["hill", "mapK", "gol", "p1", "p2", "p3", "p4", "p5"]), show(["beach", "mapC", "kid1", "kid2", "yusuf", "palm", "rock", "boat"], 0, 600),
              [pulse("mapC.dot", 1200, 2.2, 1000), { id: "beach.waves", to: { x: 10 }, dur: 10000, ease: "linear" },
                { id: "yusuf.armL", to: { r: -162 }, at: 4200, dur: 500 }, { id: "yusuf.armR", to: { r: 162 }, at: 4200, dur: 500 },
                { id: "count", to: { o: 1 }, at: 4400, dur: 300 }, { count: "count", from: 1, to: 10, at: 4600, dur: 5000 }],
              walk("kid1", { x: 98 }, 4800, 1200), [{ id: "kid1", to: { y: 89, sy: 0.5 }, at: 6000, dur: 400 }],
              walk("kid2", { x: 126 }, 4900, 1400), [{ id: "kid2", to: { y: 89, sy: 0.5 }, at: 6300, dur: 500 }]) },
            { caption: "اسم این بازی‌ها در هر شهر و هر زبانی ممکن است فرق کند. ولی بچه‌ها همه جا بازی را دوست دارند!", hold: 8400, do: D(
              [{ id: "yusuf.armL", to: { r: 0 }, dur: 300 }, { id: "yusuf.armR", to: { r: 0 }, dur: 300 }],
              hide(["beach", "mapC", "kid1", "kid2", "yusuf", "palm", "rock", "boat", "count"]), show(["map", "m1", "m2", "m3", "m4"], 300, 800),
              [{ id: "m1", to: { y: "-3" }, at: 1600, dur: 3600, yoyo: true, times: 6 }, { id: "m2", to: { y: "-3" }, at: 1900, dur: 3600, yoyo: true, times: 6 },
                { id: "m3", to: { y: "-3" }, at: 2200, dur: 3600, yoyo: true, times: 6 }, { id: "m4", to: { y: "-3" }, at: 2500, dur: 3600, yoyo: true, times: 6 }]) }
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

    /* Sources: شب یلدا (شب چله), the last night of autumn and the longest night of the year (30 Azar to 1 Dey):
       families gather at the grandparents', eat watermelon and pomegranate, nuts (آجیل), read poems and tell
       stories. UNESCO Representative List, "Yalda/Chelleh" (2022, Iran and Afghanistan); Encyclopaedia Iranica,
       "Šab-e Yaldā". Shown as a family custom, without religious meaning. */
    {
      id: "world-seed-15", subject: "world", level: "seed", emoji: "🍉", title: "شب یلدا",
      steps: [
        { type: "scene", prompt: "شب یلدای شیوا", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-sky" }, dusk: { art: "w-sky-dusk", o: 0 }, night: { art: "w-sky-night", o: 0 }, stars: { art: "w-stars", o: 0 },
            sun: { art: "w-sun", at: [44, 30] }, moon: { art: "w-moon", at: [126, 30], s: 1.3, o: 0 },
            ground: { art: "w-ground" }, house: { art: "w-house", at: [80, 76], s: 1.6 },
            room: { art: "w-room2", o: 0 }, win: { art: "w-win-night", o: 0 },
            gran: { art: "w-gran2", at: [30, 86], s: 1.2, o: 0 }, grandpa: { art: "w-grandpa", at: [54, 86], s: 1.2, o: 0 },
            dad: { art: "w-dad", at: [146, 86], s: 1.2, o: 0 }, mom: { art: "w-mom", at: [146, 86], s: 1.2, o: 0 }, shiva: { art: "w-shiva", at: [146, 86], s: 1.15, o: 0 },
            sofreh: { art: "w-sofreh", at: [80, 84], s: 1.3, o: 0 },
            grandpaS: { art: "w-grandpa-sit", at: [34, 74], s: 1.15, o: 0 }, dadS: { art: "w-dad-sit", at: [57, 74], s: 1.15, o: 0 },
            shivaS: { art: "w-shiva-sit", at: [80, 73], s: 1.15, o: 0 }, momS: { art: "w-mom-sit", at: [103, 74], s: 1.15, o: 0 }, granS: { art: "w-gran2-sit", at: [126, 74], s: 1.15, o: 0 },
            nuts: { art: "w-nuts", at: [46, 85], s: 1.3, o: 0 }, melon: { art: "w-watermelon", at: [66, 84], s: 1.3, o: 0 },
            sl1: { art: "w-melon", at: [60, 87], s: 1.1, o: 0 }, sl2: { art: "w-melon", at: [72, 87], s: 1.1, o: 0 },
            pom: { art: "w-pomegranate", at: [116, 84], s: 1.3, o: 0 }, pomO: { art: "w-pom-open", at: [116, 85], s: 1.9, o: 0 },
            bowl: { art: "w-seed-bowl", at: [96, 86], s: 1.4, o: 0 }, book: { art: "w-book", at: [36, 66], s: 1.4, o: 0 }
          },
          scenes: [
            { caption: "امشب شب یلداست: آخرین شب پاییز و بلندترین شب سال. خورشید زود غروب کرد و شب شد.", key: 7400, hold: 8400, do: D(
              [{ id: "sun", path: "M44 30Q38 46 30 70", at: 1200, dur: 4000, ease: "in" }, { id: "sun.rays", to: { r: 90 }, dur: 5200 },
                { id: "dusk", to: { o: 1 }, at: 2800, dur: 1800 }, { id: "night", to: { o: 1 }, at: 4600, dur: 1800 },
                { id: "stars", to: { o: 1 }, at: 5800, dur: 900 }, { id: "moon", to: { o: 1 }, at: 6000, dur: 900 }, { id: "moon", to: { y: 22 }, at: 6000, dur: 1600 }]) },
            { caption: "شیوا و پدر و مادرش به خانه مادربزرگ و پدربزرگ رفتند.", key: 5600, hold: 7000, do: D(
              hide(["sky", "dusk", "night", "stars", "sun", "moon", "ground", "house"], 0, 600), show(["room", "win", "gran", "grandpa"], 300, 700),
              show(["dad"], 1000, 300), walk("dad", { x: 82 }, 1000, 2800), show(["mom"], 1600, 300), walk("mom", { x: 104 }, 1600, 2600),
              show(["shiva"], 2200, 300), walk("shiva", { x: 126 }, 2200, 1800),
              wave("gran", 3800, 1600, "armR"), wave("grandpa", 4000, 1600, "armR"), wave("shiva", 4200, 1600, "armL")) },
            { caption: "همه دور سفره نشستند. هندوانه و انار و آجیل آماده است.", key: 5200, hold: 6400, do: D(
              hide(["gran", "grandpa", "dad", "mom", "shiva"]), show(["sofreh", "grandpaS", "dadS", "shivaS", "momS", "granS"], 300, 700),
              [{ id: "bowl.fill", to: { sy: 0.1, o: 0 }, dur: 1 }], show(["nuts", "melon", "pom", "bowl"], 900, 600),
              [pulse("melon", 2600, 1.2), pulse("pom", 3500, 1.25), pulse("nuts", 4400, 1.2)]) },
            { caption: "مادربزرگ انار را دانه کرد. دانه‌های قرمز را در کاسه ریخت.", key: 5600, hold: 7000, do: D(
              [{ id: "granS.armL", to: { r: 70 }, at: 400, dur: 500 }, { id: "pom", to: { o: 0 }, at: 1000, dur: 400 }, { id: "pomO", to: { o: 1 }, at: 1000, dur: 400 },
                { id: "granS.armL", to: { r: 50 }, at: 1500, dur: 3400, yoyo: true, times: 8 },
                { id: "bowl.fill", to: { o: 1 }, at: 1800, dur: 300 }, { id: "bowl.fill", to: { sy: 1 }, at: 1800, dur: 3200 },
                { id: "granS.armL", to: { r: 0 }, at: 5000, dur: 500 }, pulse("bowl", 5400, 1.2)]) },
            { caption: "پدر هندوانه را قاچ کرد.", key: 4800, hold: 5400, do: D(
              [{ id: "dadS.armR", to: { r: -70 }, at: 300, dur: 500 }, { id: "dadS.armR", to: { r: -50 }, at: 800, dur: 1600, yoyo: true, times: 4 },
                { id: "melon.skin", to: { o: 0 }, at: 2400, dur: 300 }, { id: "melon.h1", to: { r: -35 }, at: 2400, dur: 600 }, { id: "melon.h2", to: { r: 35 }, at: 2400, dur: 600 },
                { id: "melon", to: { o: 0 }, at: 3400, dur: 400 }, { id: "sl1", to: { o: 1 }, at: 3400, dur: 400 }, { id: "sl2", to: { o: 1 }, at: 3400, dur: 400 },
                { id: "dadS.armR", to: { r: 0 }, at: 3600, dur: 400 }]) },
            { caption: "پدربزرگ کتاب شعر را باز کرد. برای همه شعر خواند و قصه گفت.", key: 4200, hold: 7200, do: D(
              show(["book"], 300, 500), talk("grandpaS", 1400, 4400),
              [{ id: "book.page", to: { sx: -1 }, at: 1000, dur: 700 }, { id: "grandpaS.head", to: { r: -6 }, at: 1400, dur: 4400, yoyo: true, times: 6 },
                { id: "dadS.head", to: { r: -8 }, at: 1800, dur: 600 }, { id: "shivaS.head", to: { r: -8 }, at: 2000, dur: 600 },
                { id: "momS.head", to: { r: -8 }, at: 2200, dur: 600 }, { id: "granS.head", to: { r: -6 }, at: 2400, dur: 600 }]) },
            { caption: "تا دیروقت بیدار ماندند، خوردند و با هم خندیدند.", key: 3200, hold: 6000, do: D(
              [{ id: "dadS.head", to: { r: 0 }, dur: 400 }, { id: "shivaS.head", to: { r: 0 }, dur: 400 }, { id: "momS.head", to: { r: 0 }, dur: 400 }, { id: "granS.head", to: { r: 0 }, dur: 400 }],
              eat("shivaS", 600, 2, "armL"), eat("momS", 900, 2, "armL"),
              ["grandpaS", "dadS", "shivaS", "momS", "granS"].map(function (p, i) {
                return [{ id: p + ".smile", to: { o: 0 }, at: 2600 + i * 150, dur: 200 }, { id: p + ".laugh", to: { o: 1 }, at: 2600 + i * 150, dur: 200 },
                  { id: p, to: { y: "-1.5" }, at: 2800 + i * 150, dur: 1800, yoyo: true, times: 4 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) }
          ] },
        { type: "pairs", prompt: "چه کسی چه کار کرد؟", say: "شب یلدا، چه کسی چه کار کرد؟ جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "👵", say: "مادربزرگ" }, { pic: "🥣", say: "انار دانه کرد" }],
            [{ pic: "👨", say: "پدر" }, { pic: "🍉", say: "هندوانه را قاچ کرد" }],
            [{ pic: "👴", say: "پدربزرگ" }, { pic: "📖", say: "شعر خواند و قصه گفت" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌های جفت یلدا را پیدا کن",
          pairs: [
            [{ pic: "🍉", say: "هندوانه" }, { pic: "🍉", say: "هندوانه" }],
            [{ pic: "🥜", say: "آجیل" }, { pic: "🥜", say: "آجیل" }],
            [{ pic: "📖", say: "کتاب شعر" }, { pic: "📖", say: "کتاب شعر" }],
            [{ pic: "🌙", say: "شب بلند" }, { pic: "🌙", say: "شب بلند" }]
          ] },
        { type: "talk", scene: "🌙 🍉 📖 👵", caption: "شب یلدا شما کجا جمع می‌شوید؟ چه می‌خورید؟ تو کدام قصه یا شعر را دوست داری؟" },
        home({ pic: "🍉 📖", text: "یک سفره کوچک یلدا با هم بچینید.",
          need: ["یک بشقاب میوه (هر میوه‌ای که دارید)", "یک کتاب قصه یا شعر"],
          steps: [
            "اگر انار دارید، دانه کردنش را با هم انجام دهید (با پیش‌بند: آبش لک می‌کند!).",
            "از پدربزرگ یا مادربزرگ (یا تلفنی) بپرسید یلدای بچگی‌شان چطور بود و چه قصه‌ای می‌گفتند.",
            "یک قصه یا چند بیت شعر با هم بخوانید. اگر یلدا نزدیک نیست، هر شب بلند زمستان هم خوب است."
          ],
          ask: "چرا به شب یلدا «بلندترین شب» می‌گویند؟" })
      ]
    },

    /* Sources: Iran's peoples and languages (Encyclopaedia Iranica, "Iran vi. Iranian languages and scripts";
       "Kurds", "Turkmen", "Baluchistan", "Gilan", "Qashqai", "Arabs of Iran"); everyday music: the Kurdish daf, the
       Turkmen dutar, the Baluch qeychak, the Gilaki laleva (shepherd's flute), the Qashqai karna and dohol, drum and
       song in Khuzestan. Clothes shown are those worn at celebrations; on most days people wear everyday clothes.
       Every people equally Iranian (method.html#language). Words in these languages come in world-sprout-6 with
       recordings; here the language is only named, so the device voice never says it wrongly. Teacher and speaker
       review: each family's clothes, instrument and city. */
    {
      id: "world-seed-16", subject: "world", level: "seed", emoji: "🪘", title: "لباس‌ها و آهنگ‌های ایران",
      steps: [
        { type: "scene", prompt: "سه خانواده، سه جای ایران", bg: "#cdeaf7",
          parts: {
            map: { art: "w-map-big", at: [80, 46] },
            d1: { art: "w-dot", at: [53.6, 32.1], s: 1.3, o: 0 }, d2: { art: "w-dot", at: [83.4, 24.6], s: 1.3, o: 0 }, d3: { art: "w-dot", at: [106.2, 76.5], s: 1.3, o: 0 },
            village: { art: "w-village", o: 0 }, mapK: { art: "w-map-sanandaj", at: [136, 22], s: 0.7, o: 0 },
            zhina: { art: "w-zhina", at: [58, 86], s: 1.2, o: 0 }, kurd: { art: "w-kurd-dad", at: [92, 86], s: 1.2, o: 0 },
            field: { art: "w-field", o: 0 }, mapG: { art: "w-map-gonbad", at: [136, 22], s: 0.7, o: 0 }, horse: { art: "🐎", at: [-20, 56], s: 0.9, o: 0 },
            aynaz: { art: "w-aynaz", at: [58, 86], s: 1.2, o: 0 }, tgp: { art: "w-turkmen-grandpa", at: [92, 86], s: 1.2, o: 0 },
            beach: { art: "w-beach", o: 0 }, palm: { art: "🌴", at: [16, 72], s: 2, o: 0 }, mapC: { art: "w-map-chabahar", at: [136, 22], s: 0.7, o: 0 },
            davood: { art: "w-davood", at: [50, 86], s: 1.2, o: 0 }, bdad: { art: "w-baluch-dad", at: [76, 86], s: 1.2, o: 0 }, bmom: { art: "w-baluch-mom", at: [104, 86], s: 1.2, o: 0 },
            meadow: { art: "w-meadow", o: 0 },
            r1: { art: "w-zhina", at: [122, 86], s: 0.95, o: 0 }, r2: { art: "w-kurd-dad", at: [140, 86], s: 0.95, o: 0 },
            r3: { art: "w-aynaz", at: [72, 86], s: 0.95, o: 0 }, r4: { art: "w-turkmen-grandpa", at: [90, 86], s: 0.95, o: 0 },
            r5: { art: "w-davood", at: [22, 86], s: 0.95, o: 0 }, r6: { art: "w-baluch-dad", at: [40, 86], s: 0.95, o: 0 },
            bb1: { art: "w-bubble", at: [131, 34], s: 0.8, o: 0 }, tt1: { art: "کردی", at: [131, 36], s: 0.3, o: 0 },
            bb2: { art: "w-bubble", at: [81, 34], s: 0.8, o: 0 }, tt2: { art: "ترکمنی", at: [81, 36], s: 0.3, o: 0 },
            bb3: { art: "w-bubble", at: [31, 34], s: 0.8, o: 0 }, tt3: { art: "بلوچی", at: [31, 36], s: 0.3, o: 0 }
          },
          scenes: [
            { caption: "در ایران مردمان زیادی زندگی می‌کنند. بیا به خانه سه خانواده سر بزنیم.", key: 5000, hold: 6000, do: D(
              show(["d1"], 2000, 400), [pulse("d1", 2400, 1.6)], show(["d2"], 3000, 400), [pulse("d2", 3400, 1.6)], show(["d3"], 4000, 400), [pulse("d3", 4400, 1.6)]) },
            { caption: "ژینا و پدرش در کردستان زندگی می‌کنند. امروز جشن است: لباس کردی پوشیده‌اند و پدر ژینا دف می‌زند.", key: 6000, hold: 8400, do: D(
              hide(["map", "d1", "d2", "d3"]), show(["village", "mapK", "zhina", "kurd"], 300, 700), [pulse("mapK.dot", 1400, 2.2, 1000)],
              [{ id: "kurd.armL", to: { r: 70 }, at: 1600, dur: 500 }, { id: "kurd.armR", to: { r: 40 }, at: 2200, dur: 400 },
                { id: "kurd.armR", to: { r: 20 }, at: 2600, dur: 5000, yoyo: true, times: 16 },
                { id: "zhina.armL", to: { r: 120 }, at: 2600, dur: 500 }, { id: "zhina.armR", to: { r: -120 }, at: 2600, dur: 500 },
                { id: "zhina.armL", to: { r: 140 }, at: 3100, dur: 4400, yoyo: true, times: 8 }, { id: "zhina.armR", to: { r: -140 }, at: 3100, dur: 4400, yoyo: true, times: 8 },
                { id: "zhina", to: { x: 50 }, at: 3100, dur: 4400, yoyo: true, times: 4 }]) },
            { caption: "آیناز و پدربزرگش ترکمن هستند و در گنبد زندگی می‌کنند. پدربزرگ دوتار می‌زند. اسبی در دشت می‌دود.", key: 4600, hold: 8800, do: D(
              hide(["village", "mapK", "zhina", "kurd"]), show(["field", "mapG", "aynaz", "tgp"], 300, 700), [pulse("mapG.dot", 1400, 2.2, 1000)],
              [{ id: "tgp.armL", to: { r: -40 }, at: 1800, dur: 400 }, { id: "tgp.armL", to: { r: -20 }, at: 2200, dur: 5600, yoyo: true, times: 20 },
                { id: "aynaz.head", to: { r: 8 }, at: 2400, dur: 5000, yoyo: true, times: 6 },
                { id: "horse", to: { o: 1 }, at: 3200, dur: 300 }, { id: "horse", path: "M-20 56Q60 50 180 56", at: 3200, dur: 5000, ease: "linear" }]) },
            { caption: "داوود و پدر و مادرش بلوچ هستند و در چابهار، کنار دریا، زندگی می‌کنند. پدر داوود قیچک می‌زند. لباس مادرش سوزن‌دوزی بلوچ دارد.", key: 6400, hold: 9800, do: D(
              hide(["field", "mapG", "aynaz", "tgp", "horse"]), show(["beach", "palm", "mapC", "davood", "bdad", "bmom"], 300, 700), [pulse("mapC.dot", 1400, 2.2, 1000)],
              [{ id: "beach.waves", to: { x: 10 }, dur: 9600, ease: "linear" },
                { id: "bdad.armL", to: { r: 30 }, at: 1600, dur: 400 }, { id: "bdad.armR", to: { r: 40 }, at: 2000, dur: 600, yoyo: true, times: 10 },
                { id: "davood.head", to: { r: -8 }, at: 3000, dur: 3000, yoyo: true, times: 4 }, pulse("bmom", 7200, 1.1, 900)]) },
            { caption: "هر خانواده در خانه به زبان خودش هم حرف می‌زند: کردی، ترکمنی، بلوچی.", key: 7000, hold: 8400, do: D(
              hide(["beach", "palm", "mapC", "davood", "bdad", "bmom"]), show(["meadow", "r1", "r2", "r3", "r4", "r5", "r6"], 300, 700),
              show(["bb1", "tt1"], 2400, 400), talk("r1", 2400, 1400), talk("r2", 2800, 1400),
              show(["bb2", "tt2"], 3800, 400), talk("r3", 3800, 1400), talk("r4", 4200, 1400),
              show(["bb3", "tt3"], 5200, 400), talk("r5", 5200, 1400), talk("r6", 5600, 1400)) }
          ] },
        { type: "pairs", prompt: "کدام ساز، کجا؟", say: "هر ساز را با جایی که شنیدی جفت کن.",
          pairs: [
            [{ pic: "🪘", say: "دف" }, { pic: "🏔️", say: "کردستان، کوهستان" }],
            [{ pic: "🪕", say: "دوتار" }, { pic: "🐎", say: "گنبد، دشت و اسب" }],
            [{ pic: "🎻", say: "قیچک" }, { pic: "🌴", say: "چابهار، کنار دریا" }]
          ] },
        { type: "scene", prompt: "سه خانواده دیگر", bg: "#cdeaf7",
          parts: {
            map: { art: "w-map-big", at: [80, 46] },
            d4: { art: "w-dot", at: [63.4, 23.7], s: 1.3, o: 0 }, d5: { art: "w-dot", at: [73.5, 58], s: 1.3, o: 0 }, d6: { art: "w-dot", at: [58.9, 50.3], s: 1.3, o: 0 },
            paddy: { art: "w-paddy", o: 0 }, mapR: { art: "w-map-rasht", at: [136, 22], s: 0.7, o: 0 },
            negar: { art: "w-negar", at: [58, 86], s: 1.2, o: 0 }, ggp: { art: "w-gilak-grandpa", at: [92, 86], s: 1.2, o: 0 },
            meadow: { art: "w-meadow", o: 0 }, tent: { art: "w-black-tent", at: [26, 70], s: 1.1, o: 0 }, mapS: { art: "w-map-shiraz", at: [136, 22], s: 0.7, o: 0 },
            sh1: { art: "🐑", at: [150, 66], s: 0.45, o: 0 }, sh2: { art: "🐑", at: [160, 70], s: 0.45, o: 0 }, sh3: { art: "🐑", at: [170, 66], s: 0.45, o: 0 },
            bahador: { art: "w-bahador", at: [60, 86], s: 1.2, o: 0 }, qmom: { art: "w-qashqai-mom", at: [84, 86], s: 1.2, o: 0 }, uncle: { art: "w-qashqai-uncle", at: [110, 86], s: 1.2, o: 0 },
            ahvaz: { art: "w-ahvaz", o: 0 }, mapA: { art: "w-map-ahvaz", at: [136, 22], s: 0.7, o: 0 },
            adel: { art: "w-adel", at: [58, 86], s: 1.2, o: 0 }, adad: { art: "w-arab-dad", at: [92, 86], s: 1.2, o: 0 },
            k1: { art: "w-zhina", at: [53.6, 32.1], s: 0.42, o: 0 }, k2: { art: "w-aynaz", at: [83.4, 24.6], s: 0.42, o: 0 }, k3: { art: "w-davood", at: [106.2, 76.5], s: 0.42, o: 0 },
            k4: { art: "w-negar", at: [63.4, 23.7], s: 0.42, o: 0 }, k5: { art: "w-bahador", at: [73.5, 58], s: 0.42, o: 0 }, k6: { art: "w-adel", at: [58.9, 50.3], s: 0.42, o: 0 },
            heart: { art: "w-heart", at: [138, 20], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "بیا به سه خانواده دیگر هم سر بزنیم.", key: 4000, hold: 5000, do: D(
              show(["d4"], 1000, 400), [pulse("d4", 1400, 1.6)], show(["d5"], 2000, 400), [pulse("d5", 2400, 1.6)], show(["d6"], 3000, 400), [pulse("d6", 3400, 1.6)]) },
            { caption: "نگار و پدربزرگش گیلک هستند و در گیلان، کنار شالیزار برنج، زندگی می‌کنند. پدربزرگ لله‌وا می‌زند و نگار می‌رقصد.", key: 6000, hold: 9000, do: D(
              hide(["map", "d4", "d5", "d6"]), show(["paddy", "mapR", "negar", "ggp"], 300, 700), [pulse("mapR.dot", 1400, 2.2, 1000)],
              [{ id: "ggp.armR", to: { r: 120 }, at: 1600, dur: 600 }, { id: "ggp.head", to: { r: 6 }, at: 2200, dur: 5600, yoyo: true, times: 8 },
                { emit: "bubble", where: [108, 50], spread: [6, 4], n: 10, rise: -14, at: 2400, dur: 5000 },
                { id: "negar.armL", to: { r: 130 }, at: 2600, dur: 500 }, { id: "negar.armR", to: { r: -130 }, at: 2600, dur: 500 },
                { id: "negar", to: { r: 8 }, at: 3100, dur: 4800, yoyo: true, times: 8 }, { id: "negar", to: { x: 50 }, at: 3100, dur: 4800, yoyo: true, times: 4 }]) },
            { caption: "بهادر و مادرش قشقایی هستند. تابستان‌ها با گله‌شان به کوهستان می‌روند و در چادر زندگی می‌کنند. دایی بهادر کرنا می‌زند.", key: 7400, hold: 10400, do: D(
              hide(["paddy", "mapR", "negar", "ggp"]), show(["meadow", "tent", "mapS", "sh1", "sh2", "sh3", "bahador", "qmom", "uncle"], 300, 700), [pulse("mapS.dot", 1400, 2.2, 1000)],
              [{ id: "sh1", to: { x: 120 }, at: 1200, dur: 5000, ease: "linear" }, { id: "sh2", to: { x: 132 }, at: 1200, dur: 5000, ease: "linear" }, { id: "sh3", to: { x: 144 }, at: 1200, dur: 5000, ease: "linear" },
                { id: "uncle.armR", to: { r: 160 }, at: 5600, dur: 600 }, { id: "uncle", to: { sy: 1.03 }, at: 6200, dur: 3600, yoyo: true, times: 8 },
                { id: "qmom", to: { r: 3 }, at: 6400, dur: 3200, yoyo: true, times: 6 }, { id: "bahador.armL", to: { r: 60 }, at: 6600, dur: 3000, yoyo: true, times: 6 }]) },
            { caption: "عادل و پدرش عرب هستند و در اهواز، کنار رود کارون، زندگی می‌کنند. پدر عادل طبل می‌زند و عادل دست می‌زند.", key: 6000, hold: 9000, do: D(
              hide(["meadow", "tent", "mapS", "sh1", "sh2", "sh3", "bahador", "qmom", "uncle"]), show(["ahvaz", "mapA", "adel", "adad"], 300, 700), [pulse("mapA.dot", 1400, 2.2, 1000)],
              [{ id: "adad.armR", to: { r: 30 }, at: 2000, dur: 400 }, { id: "adad.armR", to: { r: 10 }, at: 2400, dur: 5600, yoyo: true, times: 18 },
                { id: "adel.armL", to: { r: -30 }, at: 3600, dur: 300 }, { id: "adel.armR", to: { r: 30 }, at: 3600, dur: 300 },
                { id: "adel.armL", to: { r: -15 }, at: 3900, dur: 4000, yoyo: true, times: 14 }, { id: "adel.armR", to: { r: 15 }, at: 3900, dur: 4000, yoyo: true, times: 14 },
                { id: "adel.smile", to: { o: 0 }, at: 3900, dur: 200 }, { id: "adel.laugh", to: { o: 1 }, at: 3900, dur: 200 }]) },
            { caption: "لباس‌ها، آهنگ‌ها و زبان‌هایمان با هم فرق دارد. ولی همه ایرانی هستیم و ایران خانه همه ماست.", key: 6600, hold: 8400, do: D(
              hide(["ahvaz", "mapA", "adel", "adad"]), show(["map"], 300, 700),
              show(["k1", "k2", "k3", "k4", "k5", "k6"], 1400, 600),
              ["k1", "k2", "k3", "k4", "k5", "k6"].map(function (k, i) { return { id: k, to: { y: "-2" }, at: 2400 + i * 300, dur: 500, yoyo: true, times: 2 }; }),
              show(["heart"], 5400, 500), [pulse("heart", 5900, 1.25)]) }
          ] },
        { type: "pairs", prompt: "کدام ساز، کجا؟", say: "هر ساز را با جایی که شنیدی جفت کن.",
          pairs: [
            [{ pic: "🪈", say: "لله‌وا" }, { pic: "🌾", say: "گیلان، شالیزار برنج" }],
            [{ pic: "🎺", say: "کرنا" }, { pic: "⛺", say: "قشقایی‌ها، چادر در کوهستان" }],
            [{ pic: "🥁", say: "طبل" }, { pic: "🌉", say: "اهواز، پل‌های رود کارون" }]
          ] },
        { type: "talk", scene: "🪘 🪕 🎻 🪈 🎺 🥁", caption: "خانواده تو در خانه به چه زبانی حرف می‌زنند؟ در جشن‌ها چه لباسی می‌پوشید و چه آهنگی گوش می‌دهید؟" }
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
        (function () {
          /* Four friends, four homes side by side (Aylar first, on the right): each beat shows them all doing the same
             thing in their own frame. */
          var K = [{ id: "a", kid: "w-aylar", grown: "w-mom", friend: "w-girl3", x: 141 }, { id: "h", kid: "w-haruto", grown: "w-haruto-dad", friend: "w-boy2", x: 101 },
            { id: "w", kid: "w-wanjiru", grown: "w-wanjiru-mom", friend: "w-girl", x: 61 }, { id: "p", kid: "w-pedro", grown: "w-pedro-dad", friend: "w-boy4", x: 21 }];
          var parts = { meadow: { art: "w-meadow" }, night: { art: "w-sky-night", o: 0 }, globe: { art: "w-globe", at: [80, 27], s: 1.1 }, dot: { art: "w-dot", at: [80, 15.2], s: 1.3 },
            mapA: { art: "w-map-tabriz", at: [24, 22], s: 0.6, o: 0 },
            aylar: { art: "w-aylar", at: [80, 88], s: 1.15 }, haruto: { art: "w-haruto", at: [176, 88], s: 1.15 },
            wanjiru: { art: "w-wanjiru", at: [176, 88], s: 1.15 }, pedro: { art: "w-pedro", at: [176, 88], s: 1.15 } };
          K.forEach(function (k) {
            parts[k.id + "PH"] = { art: "w-panel-home", at: [k.x, 45], o: 0 };
            parts[k.id + "G"] = { art: k.grown + "-sit", at: [k.x + 7, 66], s: 0.7, o: 0 };
            parts[k.id + "E"] = { art: k.kid + "-sit", at: [k.x - 7, 66], s: 0.7, o: 0 };
            parts[k.id + "T"] = { art: "w-table", at: [k.x, 74], s: 0.75, o: 0 };
            parts[k.id + "PS"] = { art: "w-panel-school", at: [k.x, 45], o: 0 };
            parts[k.id + "F"] = { art: k.friend, at: [k.x - 8, 70], s: 0.68, o: 0 };
            parts[k.id + "B"] = { art: k.kid + "-bag", at: [k.x + 22, 70], s: 0.68, o: 0 };
            parts[k.id + "PP"] = { art: "w-panel-play", at: [k.x, 45], o: 0 };
            parts[k.id + "K"] = { art: k.kid, at: [k.x + 3, 70], s: 0.68, o: 0 };
          });
          // things for the games: a ball for Aylar and Pedro, chalk squares for Wanjiru
          parts.ballA = { art: "w-ball", at: [136, 69], s: 0.8, o: 0 }; parts.ballP = { art: "w-ball", at: [18, 69], s: 0.8, o: 0 };
          parts.hopW = { art: "w-hop", at: [27, 22], s: 0.35, o: 0 };
          parts.zA = { art: "w-zzz", at: [148, 42], s: 1.4, o: 0 }; parts.zH = { art: "w-zzz", at: [108, 42], s: 1.4, o: 0 };
          parts.zW = { art: "w-zzz", at: [68, 42], s: 1.4, o: 0 }; parts.zP = { art: "w-zzz", at: [28, 42], s: 1.4, o: 0 };
          var all = function (f) { return D.apply(null, K.map(f)); };
          return { type: "scene", prompt: "چهار دوست از چهار جای دنیا", bg: "#cdeaf7", parts: parts,
          scenes: [
            { caption: "این آیلار است. در تبریز، در ایران، زندگی می‌کند.", hold: 5200, do: D(
              [{ id: "globe.land", to: { x: -77.7 }, dur: 1 }, { id: "dot", to: { y: 15.2 }, dur: 1 }],
              wave("aylar", 400, 1800), show(["mapA"], 2000, 400), [pulse("mapA.dot", 2400, 2.2, 1000), pulse("dot", 3200, 1.5)]) },
            { caption: "این هاروتو است، از ژاپن. این وانجیرو است، از کنیا. این پدرو است، از برزیل.", hold: 8600, do: D(
              hide(["mapA"]), walk("aylar", { x: 136 }, 0, 1600),
              [{ id: "dot", to: { o: 0 }, dur: 300 }, { id: "globe.land", to: { x: -106 }, at: 200, dur: 1400 }, { id: "dot", to: { y: 13.8, o: 1 }, at: 1600, dur: 300 }],
              walk("haruto", { x: 104 }, 600, 1800), wave("haruto", 2400, 1400),
              [{ id: "dot", to: { o: 0 }, at: 2700, dur: 300 }, { id: "globe.land", to: { x: -72.3 }, at: 2900, dur: 1400 }, { id: "dot", to: { y: 27, o: 1 }, at: 4300, dur: 300 }],
              walk("wanjiru", { x: 64 }, 3000, 2200), wave("wanjiru", 5200, 1400),
              [{ id: "dot", to: { o: 0 }, at: 5500, dur: 300 }, { id: "globe.land", to: { x: -43.3 }, at: 5700, dur: 1200 }, { id: "dot", to: { y: 30.6, o: 1 }, at: 6900, dur: 300 }],
              walk("pedro", { x: 26 }, 5600, 2600), wave("pedro", 7800, 1000)) },
            { caption: "همه آن‌ها با خانواده‌شان غذا می‌خورند.", key: 2400, hold: 5200, do: D(
              hide(["globe", "dot", "aylar", "haruto", "wanjiru", "pedro"]),
              all(function (k) { return show([k.id + "PH", k.id + "G", k.id + "E", k.id + "T"], 300, 600); }),
              all(function (k, i) { return eat(k.id + "E", 1000 + i * 150, 2, "armR").concat(eat(k.id + "G", 1300 + i * 150, 2, "armL")); })) },
            { caption: "همه به مدرسه می‌روند و دوست دارند.", key: 3000, hold: 5200, do: D(
              all(function (k) { return hide([k.id + "PH", k.id + "G", k.id + "E", k.id + "T"]).concat(show([k.id + "PS", k.id + "F", k.id + "B"], 300, 500)); }),
              all(function (k) { return walk(k.id + "B", { x: k.x + 4 }, 800, 1800).concat(wave(k.id + "F", 2600, 1600, "armR"), wave(k.id + "B", 2700, 1600, "armL")); })) },
            { caption: "همه بازی را دوست دارند: توپ‌بازی، لی‌لی، قایم‌موشک!", key: 3200, hold: 6000, do: D(
              all(function (k) { return hide([k.id + "PS", k.id + "F", k.id + "B"]).concat(show([k.id + "PP", k.id + "K"], 300, 500)); }),
              show(["ballA", "ballP", "hopW"], 600, 400),
              // Aylar throws her ball up and catches it; Pedro kicks his; Wanjiru hops; Haruto counts with his eyes closed
              [{ id: "aK.armR", to: { r: -150 }, at: 1200, dur: 400 }, { id: "ballA", path: "M147 66Q146 30 145 66", at: 1500, dur: 1400, ease: "linear" }, { id: "aK.armR", to: { r: -40 }, at: 2800, dur: 300 },
                { id: "ballA", path: "M145 66Q146 34 147 66", at: 3300, dur: 1400, ease: "linear" }, { id: "aK.armR", to: { r: -150 }, at: 3000, dur: 300 },
                { id: "pK.legR", to: { r: -40 }, at: 1300, dur: 300 }, { id: "pK.legR", to: { r: 0 }, at: 1600, dur: 300 },
                { id: "ballP", path: "M18 69Q30 52 34 69", at: 1500, dur: 900, ease: "out" },
                { id: "wK.legR", to: { r: -40 }, at: 1200, dur: 300 }, { id: "wK", path: "M64 70Q60 62 56 69Q52 62 48 69Q44 62 40 69", at: 1500, dur: 2400, ease: "linear" },
                { id: "hK.armL", to: { r: -162 }, at: 1200, dur: 500 }, { id: "hK.armR", to: { r: 162 }, at: 1200, dur: 500 }]) },
            { caption: "همه می‌خندند.", key: 1800, hold: 3600, do: D(
              [{ id: "hK.armL", to: { r: 0 }, dur: 300 }, { id: "hK.armR", to: { r: 0 }, dur: 300 }, { id: "aK.armR", to: { r: 0 }, dur: 300 }, { id: "wK.legR", to: { r: 0 }, dur: 300 }],
              all(function (k) { return hide([k.id + "PP"]).concat([{ id: k.id + "K", to: { x: k.x, y: 86, s: 1.4 }, dur: 900 }]); }), hide(["ballA", "ballP", "hopW"]),
              all(function (k) {
                var id = k.id + "K";
                return [{ id: id + ".smile", to: { o: 0 }, at: 900, dur: 200 }, { id: id + ".laugh", to: { o: 1 }, at: 900, dur: 200 }, { id: id, to: { y: "-3" }, at: 1000, dur: 2000, yoyo: true, times: 6 }];
              })) },
            { caption: "گاهی هم گریه می‌کنند.", key: 1600, hold: 3800, do: all(function (k) {
              var id = k.id + "K";
              return [{ id: id + ".laugh", to: { o: 0 }, dur: 200 }, { id: id + ".sad", to: { o: 1 }, dur: 200 }, { id: id + ".head", to: { r: -6 }, at: 200, dur: 500 },
                { id: id + ".armR", to: { r: 150 }, at: 900, dur: 500 }, { emit: "drop", from: id, where: [-3, -33], spread: [6, 1], rise: 8, n: 6, at: 300, dur: 2600, life: 900 },
                { id: id + ".armR", to: { r: 0 }, at: 3000, dur: 400 }, { id: id + ".head", to: { r: 0 }, at: 3000, dur: 400 }];
            }) },
            { caption: "شب خوابشان می‌آید. خیلی چیزهایشان مثل هم است.", key: 2600, hold: 6400, do: D(
              all(function (k) {
                var id = k.id + "K";
                return [{ id: id + ".sad", to: { o: 0 }, dur: 200 }, { id: id + ".eyes", to: { o: 0 }, at: 900, dur: 300 }, { id: id + ".shut", to: { o: 1 }, at: 900, dur: 300 },
                  { id: id + ".head", to: { r: 12 }, at: 1000, dur: 600 }, { id: "z" + k.id.toUpperCase(), to: { o: 1 }, at: 1400, dur: 500 },
                  { id: "z" + k.id.toUpperCase(), to: { o: 0 }, at: 4000, dur: 300 }, { id: id + ".head", to: { r: 0 }, at: 4000, dur: 400 },
                  { id: id + ".shut", to: { o: 0 }, at: 4000, dur: 300 }, { id: id + ".eyes", to: { o: 1 }, at: 4000, dur: 300 }, { id: id + ".smile", to: { o: 1 }, at: 4000, dur: 300 }];
              }),
              [{ id: "night", to: { o: 0.85 }, at: 600, dur: 600 }, { id: "night", to: { o: 0 }, at: 4000, dur: 600 }]) }
          ] };
        })(),
        { type: "scene", prompt: "بعضی چیزها فرق دارد", bg: "#cdeaf7",
          parts: {
            room: { art: "w-room" }, kA: { art: "w-aylar", at: [80, 80], s: 1.3 }, kH: { art: "w-haruto", at: [80, 80], s: 1.3, o: 0 }, kP: { art: "w-pedro", at: [80, 80], s: 1.3, o: 0 },
            table: { art: "w-table", at: [80, 90], s: 1.7 },
            bread: { art: "🫓", at: [71, 66], s: 0.6 }, cheese: { art: "🧀", at: [89, 66], s: 0.5 },
            rice: { art: "w-rice-bowl", at: [71, 66.4], s: 1.4, o: 0 }, soup: { art: "🥣", at: [89, 67], s: 0.55, o: 0 },
            loaf: { art: "🍞", at: [71, 67], s: 0.5, o: 0 }, banana: { art: "🍌", at: [89, 66], s: 0.55, o: 0 },
            street: { art: "w-vpath", o: 0 }, split: { art: "w-split", o: 0 },
            hA: { art: "w-boy2-bag", at: [176, 80], s: 0.9, o: 0 }, hB: { art: "w-haruto-bag", at: [188, 80], s: 0.9, o: 0 }, hC: { art: "w-girl-bag", at: [200, 80], s: 0.9, o: 0 },
            bus: { art: "w-schoolbus", at: [-30, 80], s: 1.15, o: 0 },
            rio: { art: "w-hot", o: 0 }, snowy: { art: "w-sky", sx: 0.5, o: 0 }, snowG: { art: "w-snow-ground", sx: 0.5, at: [0, -2], o: 0 },
            sun: { art: "w-sun", at: [140, 18], o: 0 }, pedro: { art: "w-pedro-cap", at: [114, 84], s: 1.2, o: 0 }, aylar: { art: "w-aylar-coat", at: [40, 84], s: 1.2, o: 0 },
            meadow: { art: "w-meadow", o: 0 },
            g1: { art: "w-aylar", at: [136, 86], s: 1.05, o: 0 }, g2: { art: "w-haruto", at: [100, 86], s: 1.05, o: 0 }, g3: { art: "w-wanjiru", at: [64, 86], s: 1.05, o: 0 }, g4: { art: "w-pedro", at: [28, 86], s: 1.05, o: 0 },
            b1: { art: "w-bubble", at: [136, 34], s: 0.9, o: 0 }, b2: { art: "w-bubble", at: [100, 22], s: 0.9, o: 0 }, b3: { art: "w-bubble", at: [64, 34], s: 0.9, o: 0 }, b4: { art: "w-bubble", at: [28, 22], s: 0.9, o: 0 },
            t1: { art: "سلام!", at: [136, 36.4], s: 0.3, o: 0 }, t2: { art: "کونیچیوا!", at: [100, 24.4], s: 0.3, o: 0 }, t3: { art: "هاباری!", at: [64, 36.4], s: 0.3, o: 0 }, t4: { art: "اولا!", at: [28, 24.4], s: 0.3, o: 0 }
          },
          scenes: [
            { caption: "صبحانه آیلار نان و پنیر است.", key: 2000, hold: 4400, do: D(eat("kA", 900, 2, "armR"), [{ id: "bread", to: { sx: 0.8 }, at: 1600, dur: 1400 }]) },
            { caption: "صبحانه هاروتو برنج و سوپ است.", key: 2600, hold: 5200, do: D(
              hide(["kA", "bread", "cheese"]), show(["kH", "rice", "soup"], 300, 500),
              [{ id: "kH.armL", to: { r: -60 }, at: 1100, dur: 500 }, { id: "soup", path: "M89 67Q90 58 82 54", at: 1500, dur: 700 },
                { id: "kH.armR", to: { r: 60 }, at: 1100, dur: 500 }, { id: "soup", to: { r: -25 }, at: 2200, dur: 500 },
                { id: "soup", to: { r: 0 }, at: 3300, dur: 400 }, { id: "soup", path: "M82 54Q90 58 89 67", at: 3600, dur: 700 },
                { id: "kH.armL", to: { r: 0 }, at: 3700, dur: 500 }, { id: "kH.armR", to: { r: 0 }, at: 3700, dur: 500 }]) },
            { caption: "صبحانه پدرو نان و موز است.", key: 2400, hold: 4600, do: D(
              hide(["kH", "rice", "soup"]), show(["kP", "loaf", "banana"], 300, 500),
              [{ id: "kP.armL", to: { r: -110 }, at: 1100, dur: 600 }, { id: "banana", path: "M89 66Q92 56 84 52", at: 1100, dur: 600 },
                { id: "banana", to: { sx: 0.6 }, at: 1900, dur: 1200 }, { id: "kP.armL", to: { r: -105 }, at: 1900, dur: 1200, yoyo: true, times: 4 }]) },
            { caption: "هاروتو با بچه‌های محله پیاده به مدرسه می‌رود. وانجیرو با اتوبوس مدرسه می‌رود.", key: 5600, hold: 8400, do: D(
              hide(["kP", "loaf", "banana", "room", "table"]), show(["street", "split", "hA", "hB", "hC", "bus"], 0, 500),
              walk("hA", { x: 96 }, 400, 3400), walk("hB", { x: 108 }, 400, 3400), walk("hC", { x: 120 }, 400, 3400),
              [{ id: "bus", to: { x: 44 }, at: 4200, dur: 2200, ease: "out" }, { id: "bus.w1", to: { r: 720 }, at: 4200, dur: 2200, ease: "out" }, { id: "bus.w2", to: { r: 720 }, at: 4200, dur: 2200, ease: "out" }]) },
            { caption: "در شهر پدرو، ریو، بیشتر وقت‌ها هوا گرم است. در تبریز، زمستان برف می‌بارد!", key: 5600, hold: 7800, do: D(
              hide(["street", "hA", "hB", "hC", "bus"]), show(["rio", "snowy", "snowG", "sun", "pedro", "aylar"], 0, 500),
              [{ id: "sun.rays", to: { r: 180 }, dur: 7000, ease: "linear" }, { id: "pedro.armR", to: { r: -150 }, at: 1000, dur: 500 },
                { id: "pedro.armR", to: { r: -130 }, at: 1500, dur: 2000, yoyo: true, times: 6 }, { id: "pedro.armR", to: { r: 0 }, at: 3600, dur: 400 },
                { emit: "bubble", where: [40, 10], spread: [76, 10], rise: 60, n: 30, at: 3800, dur: 3800, life: 2600 },
                { id: "aylar.armL", to: { r: 120 }, at: 4400, dur: 500 }, { id: "aylar.armR", to: { r: -120 }, at: 4400, dur: 500 },
                { id: "aylar.smile", to: { o: 0 }, at: 4600, dur: 200 }, { id: "aylar.laugh", to: { o: 1 }, at: 4600, dur: 200 }]) },
            { caption: "هر کدام به زبان خودش سلام می‌کند: «سلام!»، «کونیچیوا!»، «هاباری!»، «اولا!»", hold: 8600, do: D(
              hide(["rio", "snowy", "snowG", "sun", "pedro", "aylar", "split"]), show(["meadow", "g1", "g2", "g3", "g4"], 0, 600),
              wave("g1", 2600, 1400), show(["b1", "t1"], 2800, 300), wave("g2", 3800, 1400), show(["b2", "t2"], 4000, 300),
              wave("g3", 5100, 1400, "armL"), show(["b3", "t3"], 5300, 300), wave("g4", 6200, 1400, "armL"), show(["b4", "t4"], 6400, 300)) }
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

    /* Sources: homes and climate (NCSS C3 D2.Geo.4–5.K–2: how weather and land shape the way people live; England
       KS1 geography, "hot and cold places"). Yazd: mud-brick (خشت) houses with windcatchers (بادگیر), "Historic City
       of Yazd", UNESCO World Heritage (2017). Nomads' black tents of goat hair (سیاه‌چادر), e.g. the Qashqai and the
       Bakhtiari. Houses on stilts by rivers that flood (e.g. Southeast Asia). The Inuit of northern Canada built snow
       houses (igluvijaq) as shelters on hunting trips; today most live in ordinary houses, so the caption says
       «از قدیم». Teacher review: the wording on the Inuit and on nomads. */
    {
      id: "world-seed-17", subject: "world", level: "seed", emoji: "🏠", title: "خانه‌ها در دنیا",
      steps: [
        { type: "scene", prompt: "خانه‌ها چرا فرق دارند؟", bg: "#cdeaf7",
          parts: {
            globe: { art: "w-globe", at: [80, 44], s: 1.6 },
            street: { art: "w-street", o: 0 },
            f1: { art: "w-flats", at: [52, 64], s: 0.9, sy: 0.12, o: 0 }, f2: { art: "w-flats2", at: [86, 64], sy: 0.12, o: 0 }, f3: { art: "w-flats3", at: [118, 64], sy: 0.12, o: 0 },
            hot: { art: "w-dry", o: 0 }, sunH: { art: "w-sun", at: [136, 18], o: 0 }, yazd: { art: "w-yazd-house", at: [84, 78], s: 1.3, o: 0 },
            wind: { art: "w-wind-in", at: [60.6, 10.4], s: 1.3, o: 0 },
            meadow: { art: "w-meadow", o: 0 }, tent: { art: "w-black-tent", at: [80, 80], s: 1.3, sy: 0.1, o: 0 },
            sh1: { art: "🐑", at: [170, 84], s: 0.6, o: 0 }, sh2: { art: "🐑", at: [186, 86], s: 0.6, o: 0 }, sh3: { art: "🐑", at: [200, 82], s: 0.6, o: 0 },
            river: { art: "w-river-bg", o: 0 }, stilt: { art: "w-stilt-house", at: [80, 80], s: 1.3, o: 0 }, water: { art: "w-water-up", at: [0, 92], o: 0 },
            snow: { art: "w-snow-bg", o: 0 }, igloo: { art: "w-igloo", at: [96, 80], s: 1.6, o: 0 }, nd: { art: "w-north-dad", at: [44, 86], s: 1.2, o: 0 },
            block: { art: "w-snow-block", at: [52, 72], s: 1.4, o: 0 },
            s1: { art: "w-flats", at: [16, 82], s: 0.42, o: 0 }, s2: { art: "w-yazd-house", at: [48, 82], s: 0.5, o: 0 }, s3: { art: "w-black-tent", at: [80, 82], s: 0.5, o: 0 },
            s4: { art: "w-stilt-house", at: [112, 82], s: 0.55, o: 0 }, s5: { art: "w-igloo", at: [144, 82], s: 0.6, o: 0 },
            i1: { art: "🏘️", at: [16, 40], s: 0.6, o: 0 }, i2: { art: "☀️", at: [48, 40], s: 0.6, o: 0 }, i3: { art: "🐑", at: [80, 40], s: 0.6, o: 0 },
            i4: { art: "🌊", at: [112, 40], s: 0.6, o: 0 }, i5: { art: "❄️", at: [144, 40], s: 0.6, o: 0 }
          },
          scenes: [
            { caption: "خانه‌ها در همه جای دنیا یک شکل نیستند. چرا؟ بیا ببینیم!", key: 3000, hold: 5000, do: [
              { id: "globe.land", to: { x: -60 }, dur: 4400, ease: "linear" }] },
            { caption: "در شهرهای بزرگ، آدم زیاد است و زمین کم. پس خانه‌ها را روی هم می‌سازند: آپارتمان!", key: 6400, hold: 7600, do: D(
              hide(["globe"]), show(["street"], 300, 700),
              [{ id: "f1", to: { o: 1 }, at: 1600, dur: 300 }, { id: "f1", to: { sy: 0.9 }, at: 1600, dur: 2600, ease: "out" },
                { id: "f2", to: { o: 1 }, at: 2600, dur: 300 }, { id: "f2", to: { sy: 1 }, at: 2600, dur: 2600, ease: "out" },
                { id: "f3", to: { o: 1 }, at: 3600, dur: 300 }, { id: "f3", to: { sy: 1 }, at: 3600, dur: 2600, ease: "out" }]) },
            { caption: "یزد گرم و خشک است. خانه‌ها خشتی‌اند و بادگیر دارند. بادگیر باد خنک را پایین، به خانه، می‌فرستد.", key: 7600, hold: 9000, do: D(
              hide(["street", "f1", "f2", "f3"]), show(["hot", "sunH", "yazd"], 300, 700),
              [{ id: "sunH.rays", to: { r: 180 }, dur: 8800, ease: "linear" }, pulse("yazd", 2800, 1.06, 900),
                { id: "wind", to: { o: 1 }, at: 4600, dur: 100 }, { id: "wind", draw: true, at: 4600, dur: 2600 }]) },
            { caption: "عشایر با گله‌شان از جایی به جای دیگر کوچ می‌کنند. چادرشان را با خود می‌برند و هر جا رسیدند برپا می‌کنند.", key: 7600, hold: 9000, do: D(
              hide(["hot", "sunH", "yazd", "wind"]), show(["meadow", "sh1", "sh2", "sh3"], 300, 700),
              [{ id: "sh1", to: { x: 110 }, at: 600, dur: 4400, ease: "linear" }, { id: "sh2", to: { x: 124 }, at: 600, dur: 4400, ease: "linear" }, { id: "sh3", to: { x: 138 }, at: 600, dur: 4400, ease: "linear" },
                { id: "tent", to: { o: 1 }, at: 5200, dur: 300 }, { id: "tent", to: { sy: 1 }, at: 5200, dur: 2200, ease: "back" }]) },
            { caption: "کنار رودی که گاهی آبش بالا می‌آید، خانه را روی پایه‌های بلند می‌سازند. آب بالا می‌آید، ولی خانه خشک می‌ماند.", key: 7400, hold: 8800, do: D(
              hide(["meadow", "sh1", "sh2", "sh3", "tent"]), show(["river", "stilt", "water"], 300, 700),
              [{ id: "water", to: { y: 66 }, at: 3600, dur: 3600, ease: "out" }, pulse("stilt", 7400, 1.06, 900)]) },
            { caption: "در شمال خیلی سرد کانادا، اینوئیت‌ها از قدیم در سفرهای شکار با برف خانه می‌ساختند: خانه برفی!", key: 8000, hold: 9200, do: D(
              hide(["river", "stilt", "water"]), show(["snow", "igloo", "nd"], 300, 700),
              [{ id: "igloo.r1", to: { o: 0 }, dur: 1 }, { id: "igloo.r2", to: { o: 0 }, dur: 1 }, { id: "igloo.r3", to: { o: 0 }, dur: 1 }, { id: "igloo.r4", to: { o: 0 }, dur: 1 }],
              [0, 1, 2, 3].map(function (i) {
                var t = 1600 + i * 1600;
                return [{ id: "nd.armR", to: { r: -60 }, at: t, dur: 400 }, { id: "block", to: { x: 52, y: 72, o: 1 }, at: t, dur: 200 },
                  { id: "block", path: "M52 72Q70 " + (50 - i * 8) + " " + (86 + i * 2) + " " + (76 - i * 9), at: t + 300, dur: 700 }, { id: "block", to: { o: 0 }, at: t + 1000, dur: 100 },
                  { id: "igloo.r" + (i + 1), to: { o: 1 }, at: t + 1000, dur: 300 }, { id: "nd.armR", to: { r: 0 }, at: t + 1100, dur: 400 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "هر خانه برای هوا و زندگی جای خودش ساخته شده است.", key: 6200, hold: 7600, do: D(
              hide(["snow", "igloo", "nd", "block"]), show(["meadow"], 300, 700),
              show(["s1", "i1"], 1000, 500), show(["s2", "i2"], 2000, 500), show(["s3", "i3"], 3000, 500), show(["s4", "i4"], 4000, 500), show(["s5", "i5"], 5000, 500)) }
          ],
          question: "چرا خانه‌های یزد بادگیر دارند؟", pic: true,
          options: [{ label: "❄️", value: "چون آنجا سرد است" }, { label: "☀️", value: "چون آنجا گرم است" }, { label: "🌧️", value: "چون باران زیاد می‌بارد" }], answer: "چون آنجا گرم است" },
        { type: "pairs", prompt: "هر خانه کجاست؟", say: "هر خانه را با جایش جفت کن. روی کارت‌ها بزن تا اسمشان را بشنوی.",
          pairs: [
            [{ pic: "🏢", say: "آپارتمان" }, { pic: "🏘️", say: "شهر بزرگ و شلوغ" }],
            [{ pic: "🏠", say: "خانه خشتی با بادگیر" }, { pic: "☀️", say: "جای گرم و خشک، مثل یزد" }],
            [{ pic: "⛺", say: "چادر عشایر" }, { pic: "🐑", say: "کوچ با گله" }],
            [{ pic: "🛖", say: "خانه روی پایه‌های بلند" }, { pic: "🌊", say: "کنار رودی که آبش بالا می‌آید" }],
            [{ pic: "🧊", say: "خانه برفی" }, { pic: "❄️", say: "جای خیلی سرد" }]
          ] },
        { type: "pairs", hidden: true, prompt: "هر خانه از چه ساخته شده؟ کارت‌ها را برگردان",
          say: "کارت‌ها را برگردان. هر خانه را با چیزی که از آن ساخته شده جفت کن.",
          pairs: [
            [{ pic: "🏠", say: "خانه یزدی" }, { pic: "🧱", say: "خشت" }],
            [{ pic: "🧊", say: "خانه برفی" }, { pic: "❄️", say: "برف" }],
            [{ pic: "⛺", say: "چادر عشایر" }, { pic: "🐐", say: "موی بز" }],
            [{ pic: "🛖", say: "خانه روی پایه‌ها" }, { pic: "🌳", say: "چوب" }]
          ] },
        { type: "talk", scene: "🏢 🏠 ⛺ 🛖 🧊", caption: "خانه شما چه شکلی است؟ از چه ساخته شده؟ اگر جای خیلی سرد یا خیلی گرم زندگی می‌کردی، چه خانه‌ای می‌ساختی؟" },
        home({ pic: "📦 🏠", text: "با هم یک خانه کوچک بسازید.",
          need: ["جعبه مقوایی، کاغذ، چسب و قیچی (قیچی دست بزرگ‌تر)", "یا بالش و پتو"],
          steps: [
            "با جعبه یا بالش و پتو یک خانه کوچک بسازید.",
            "بپرسید: «اگر اینجا خیلی گرم بود، چطور خنکش می‌کردیم؟ اگر بارون زیاد می‌اومد چی؟»",
            "در کوچه یا در عکس‌ها، خانه‌های مختلف را با هم نگاه کنید: «سقفش صافه یا شیب‌دار؟ از چی ساختنش؟»"
          ],
          ask: "خانه تو از چه ساخته شده است؟" })
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
    },

    /* Sources: home, city or village, country (NCSS C3 D2.Geo.1–2.K–2; England KS1 geography, "name … the country
       they live in"; Iran's preschool theme «کشور من»). Nested places: the camera pulls back from a house to its street,
       then each picture shrinks to a dot on the next. Kerman (کرمان) at its place on js/maps/iran.js. Children who live
       outside Iran: the parent note asks them to name their city and their country, and where the family is from. */
    {
      id: "world-seed-18", subject: "world", level: "seed", emoji: "📍", title: "من کجا زندگی می‌کنم؟",
      steps: [
        { type: "scene", prompt: "ماهان کجا زندگی می‌کند؟", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            s1: { art: "w-flats2", at: [20, 64] }, s2: { art: "w-shop1", at: [52, 64], s: 1.2 }, home: { art: "w-house", at: [84, 64], s: 1.3 },
            s3: { art: "w-bakery", at: [118, 64], s: 1.2 }, s4: { art: "w-flats3", at: [148, 64] },
            mahan: { art: "w-mahan", at: [72, 70], s: 0.8 },
            city: { art: "w-city", o: 0 }, ring: { art: "w-dot", at: [82, 62], s: 1.6, o: 0 },
            map: { art: "w-map-big", at: [80, 46], o: 0 }, kerman: { art: "w-dot", at: [91, 54.9], s: 1.4, o: 0 },
            vil: { art: "w-village", at: [100, 4], s: 0.28, o: 0 }, vdot: { art: "w-dot", at: [70, 64], s: 1.4, o: 0 }
          },
          scenes: [
            { caption: "این ماهان است. این خانه ماهان است.", key: 3600, hold: 5000, do: D(
              [{ cam: { x: 80, y: 50, zoom: 2.4 }, dur: 1 }], wave("mahan", 1400, 1600), [pulse("home", 3200, 1.08)]) },
            { caption: "خانه ماهان در یک خیابان است. خانه‌ها و مغازه‌های دور و برش با هم یک محله‌اند.", key: 5200, hold: 6800, do: [
              { cam: { x: 80, y: 45, zoom: 1 }, at: 600, dur: 3600 }, pulse("s3", 4600, 1.08), pulse("s2", 5200, 1.08)] },
            { caption: "محله ماهان در شهر کرمان است. کرمان یک شهر بزرگ است، با خیابان‌ها و محله‌های زیاد.", key: 5800, hold: 7400, do: D(
              [{ id: "sky", to: { o: 0 }, at: 300, dur: 900 }, { id: "far", to: { o: 0 }, at: 300, dur: 900 }, { id: "ground", to: { o: 0 }, at: 300, dur: 900 }],
              hide(["s1", "s2", "home", "s3", "s4", "mahan"], 300, 900), show(["city"], 300, 1000),
              show(["ring"], 3000, 400), [pulse("ring", 3400, 1.8, 900), pulse("ring", 4400, 1.8, 900)]) },
            { caption: "کرمان در ایران است. ایران کشور ماست.", key: 5000, hold: 6400, do: D(
              [{ id: "city", to: { s: 0.05, x: 88, y: 52, o: 0 }, at: 300, dur: 1800 }, { id: "ring", to: { o: 0 }, at: 300, dur: 400 }],
              show(["map"], 1400, 900), show(["kerman"], 2400, 400), [pulse("kerman", 2800, 1.8, 900), pulse("map", 4200, 1.05, 900)]) },
            { caption: "بعضی بچه‌ها در شهر زندگی می‌کنند و بعضی در روستا. شهر و روستا، هر دو در ایران‌اند.", key: 2800, hold: 7200, do: D(
              show(["vil"], 1400, 600), [{ id: "vil", to: { s: 0.05, x: 70, y: 64 }, at: 3000, dur: 1600 }, { id: "vil", to: { o: 0 }, at: 4400, dur: 300 }],
              show(["vdot"], 4400, 300), [pulse("vdot", 4800, 1.8, 900)]) },
            { caption: "تو کجا زندگی می‌کنی؟ اسم شهر یا روستایت را بگو!", key: 2400, hold: 5000, do: [
              pulse("map", 600, 1.05, 900), pulse("kerman", 1600, 1.6, 800), pulse("vdot", 2600, 1.6, 800)] }
          ] },
        { type: "map", map: "iran", layers: ["iran", "seas"], say: "این نقشه است.",
          tasks: [{ find: "iran", prompt: "کشور ما، ایران، کجاست؟ رویش بزن.", say: "این نقشه است. کشور ما، ایران، کجاست؟ رویش بزن." }] },
        { type: "map", map: "iran", layers: ["iran"], cities: ["kerman"], say: "شهر ماهان.",
          tasks: [{ find: "kerman", prompt: "کرمان، شهر ماهان، با نقطه قرمز است. پیدایش کن.", say: "کرمان، شهر ماهان، با یک نقطه قرمز روی نقشه است. پیدایش کن." }] },
        { type: "choose", prompt: "کرمان یک شهر است یا یک کشور؟", say: "کرمان یک شهر است یا یک کشور؟", pic: true,
          options: [{ label: "🏘️", value: "شهر" }, { label: "🗺️", value: "کشور" }], answer: "شهر" },
        { type: "choose", prompt: "خانه در محله است، محله در شهر، و شهر در…؟", say: "خانه ماهان در محله است، محله در شهر، و شهر در کجاست؟", pic: true,
          options: [{ label: "🏠", value: "خانه" }, { label: "🗺️", value: "ایران" }, { label: "⚽", value: "پارک" }], answer: "ایران" },
        home({ pic: "🏠 📍", text: "اسم شهر یا روستایت را یاد بگیر.",
          need: ["کاغذ و مداد رنگی"],
          steps: [
            "با کودک بگویید: «اسم کوچه ما … است. ما در شهر (یا روستای) … زندگی می‌کنیم. کشور ما ایران است.»",
            "سه دایره تودرتو بکشید: کوچک‌ترین خانه، بزرگ‌تر شهر یا روستا، بزرگ‌ترین کشور. کودک در هر کدام نقاشی کند.",
            "اگر بیرون از ایران زندگی می‌کنید، شهر و کشور خودتان را بگویید و بگویید خانواده‌تان از کدام شهر ایران است."
          ],
          ask: "تو در کدام شهر یا روستا زندگی می‌کنی؟" })
      ]
    },

    /* Sources: then and now within living memory (NCSS C3 D2.His.2.K–2; England KS1 history, "changes within living
       memory", old and new objects). Electricity reached most Iranian villages in the second half of the 20th century,
       so a grandparent who grew up in a village may remember oil lanterns (Statistical Centre of Iran). Samovars are
       still used in many homes: shown as old, not as gone. Asking a grandparent is the first oral history. */
    {
      id: "world-seed-19", subject: "world", level: "seed", emoji: "🕯️", title: "قدیم و جدید",
      steps: [
        { type: "scene", prompt: "جعبه قدیمی پدربزرگ", bg: "#e1eed6",
          parts: {
            room: { art: "w-room2" }, dim: { art: "w-night-dim", o: 0 }, win: { art: "w-win-night", o: 0 },
            grandpa: { art: "w-grandpa-sit", at: [110, 82], s: 1.25 }, ava: { art: "w-ava-sit", at: [52, 82], s: 1.25 },
            box: { art: "w-box", at: [82, 88], s: 1.2 },
            lantern: { art: "w-lantern", at: [82, 68], s: 1.4, o: 0 }, lamp: { art: "w-lamp", at: [40, 0], s: 1.3, o: 0 }, sw: { art: "w-switch", at: [128, 40], s: 1.4, o: 0 },
            samovar: { art: "w-samovar", at: [72, 85], s: 1.2, o: 0 }, kettle: { art: "w-kettle", at: [92, 85], s: 1.2, o: 0 },
            letter: { art: "✉️", at: [30, 40], s: 0.5, o: 0 }, cal: { art: "w-calendar", at: [130, 26], s: 1.2, o: 0 },
            phone: { art: "📱", under: "grandpa", at: [-4, -16], s: 0.3, o: 0 },
            bub1: { art: "w-bubble", at: [126, 34], s: 0.7, o: 0 }, photo: { art: "w-old-photo", at: [82, 50], s: 1.6, o: 0 }
          },
          scenes: [
            { caption: "آوا به خانه پدربزرگ آمده. پدربزرگ یک جعبه پر از چیزهای قدیمی دارد.", key: 3800, hold: 5400, do: D(
              talk("grandpa", 800, 1600), [pulse("box", 2600, 1.15, 900), { id: "ava.head", to: { r: 8 }, at: 3000, dur: 500 }]) },
            { caption: "این فانوس است. قدیم، در روستای پدربزرگ برق نبود. شب‌ها فانوس روشن می‌کردند.", key: 6000, hold: 7600, do: D(
              show(["lantern"], 300, 500), [{ id: "lantern", path: "M82 82Q82 70 82 68", at: 300, dur: 700 }],
              show(["dim", "win"], 2200, 900),
              [{ id: "lantern.flame", to: { o: 1 }, at: 3600, dur: 400 }, { id: "lantern.glow", to: { o: 1 }, at: 3800, dur: 800 },
                { id: "lantern.flame", to: { sy: 1.2 }, at: 4200, dur: 3000, yoyo: true, times: 8 }]) },
            { caption: "حالا خانه‌ها برق دارند. با یک کلید، لامپ روشن می‌شود!", key: 4600, hold: 6200, do: D(
              [{ id: "lantern.flame", to: { o: 0 }, dur: 400 }, { id: "lantern.glow", to: { o: 0 }, dur: 400 }], hide(["lantern"], 400, 400),
              show(["lamp", "sw"], 600, 500),
              [{ id: "sw.key", to: { sy: -1 }, at: 2600, dur: 200 }, { id: "lamp.light", to: { o: 1 }, at: 2800, dur: 300 }, { id: "dim", to: { o: 0 }, at: 2800, dur: 300 },
                { id: "ava.smile", to: { o: 0 }, at: 3200, dur: 200 }, { id: "ava.laugh", to: { o: 1 }, at: 3200, dur: 200 }]) },
            { caption: "این سماور مادربزرگ است. هنوز با آن آب جوش می‌آورند. کتری برقی جدیدتر است.", key: 5200, hold: 7200, do: D(
              [{ id: "ava.laugh", to: { o: 0 }, dur: 200 }, { id: "ava.smile", to: { o: 1 }, dur: 200 }], hide(["lamp", "sw", "box"], 0, 400),
              show(["samovar"], 600, 500), [{ emit: "bubble", where: [72, 56], spread: [3, 2], n: 8, rise: 14, at: 1400, dur: 3000 }, pulse("samovar", 1600, 1.1)],
              show(["kettle"], 3600, 500), [{ emit: "bubble", where: [90, 70], spread: [3, 2], n: 8, rise: 14, at: 4400, dur: 2400 }, pulse("kettle", 4600, 1.1)]) },
            { caption: "قدیم، برای کسی که دور بود نامه می‌نوشتند. نامه چند روز در راه بود.", key: 5600, hold: 7600, do: D(
              hide(["samovar", "kettle"], 0, 400), show(["letter", "cal"], 600, 400),
              [{ id: "letter", path: "M30 40Q60 20 80 34T130 50", at: 1200, dur: 5200, ease: "linear" }, { count: "cal", from: 1, to: 5, at: 1200, dur: 5200 }]) },
            { caption: "حالا با تلفن، همان لحظه صدای هم را می‌شنویم.", key: 3400, hold: 5600, do: D(
              hide(["letter", "cal"], 0, 400), show(["phone"], 400, 300),
              [{ id: "grandpa.armL", to: { r: 150 }, at: 400, dur: 600 }], show(["bub1"], 1600, 300), talk("grandpa", 1600, 2600),
              [{ id: "ava.head", to: { r: -8 }, at: 1800, dur: 500 }]) },
            { caption: "این عکس قدیمی پدربزرگ است، وقتی بچه بود. عکس‌های قدیمی سیاه و سفیدند.", key: 4000, hold: 6200, do: D(
              hide(["phone", "bub1"], 0, 300), [{ id: "grandpa.armL", to: { r: 0 }, dur: 500 }],
              show(["photo"], 800, 600), [pulse("photo", 1800, 1.12, 900),
                { id: "ava.smile", to: { o: 0 }, at: 3400, dur: 200 }, { id: "ava.laugh", to: { o: 1 }, at: 3400, dur: 200 }]) }
          ] },
        { type: "pairs", prompt: "قدیم و جدید، برای یک کار", say: "این‌ها یک کار را می‌کنند: یکی قدیمی است، یکی جدید. جفتشان را پیدا کن.",
          pairs: [
            [{ pic: "🕯️", say: "شمع و فانوس، قدیم" }, { pic: "💡", say: "لامپ، جدید" }],
            [{ pic: "✉️", say: "نامه، قدیم" }, { pic: "📱", say: "تلفن همراه، جدید" }],
            [{ pic: "🪣", say: "آوردن آب با سطل از چشمه، قدیم" }, { pic: "🚰", say: "شیر آب در خانه، جدید" }]
          ] },
        { type: "sort", prompt: "قدیمی یا جدید؟",
          say: "کدام قدیمی است؟ کدام جدید است؟",
          baskets: [{ pic: "👴", label: "قدیمی", value: "old" }, { pic: "🧒", label: "جدید", value: "new" }],
          items: [
            { pic: "☎️", say: "تلفن سیم‌دار قدیمی", basket: "old" },
            { pic: "🕯️", say: "شمع برای روشن کردن خانه", basket: "old" },
            { pic: "✉️", say: "نامه‌ای که چند روز در راه است", basket: "old" },
            { pic: "📱", say: "تلفن همراه", basket: "new" },
            { pic: "💡", say: "لامپ", basket: "new" },
            { pic: "💻", say: "رایانه", basket: "new" }
          ] },
        { type: "talk", scene: "👴 👵 📷 🕯️", caption: "از پدربزرگ و مادربزرگت بپرس: وقتی بچه بودید، چه چیزهایی نداشتید؟ چه بازی‌هایی می‌کردید؟" },
        home({ pic: "🔍 🕰️", text: "در خانه یک چیز قدیمی پیدا کن.",
          need: ["یک چیز قدیمی در خانه یا خانه پدربزرگ و مادربزرگ (عکس، ظرف، وسیله، اسباب‌بازی)"],
          steps: [
            "با کودک یک چیز قدیمی پیدا کنید و بپرسید: «فکر می‌کنی این چیه؟ برای چه کاری بوده؟»",
            "اگر می‌شود، از صاحبش بخواهید درباره‌اش تعریف کند: کی خریده شد، با آن چه کار می‌کردند.",
            "بپرسید: «حالا به جای این از چی استفاده می‌کنیم؟»"
          ],
          ask: "چه چیز قدیمی‌ای پیدا کردی؟ حالا به جایش از چه استفاده می‌کنیم؟" })
      ]
    },

    /* Sources: a picture map of a familiar place, a route with landmarks, and position words on a map (NCSS C3
       D2.Geo.1.K–2; Bishop, "Learning to read maps"; England KS1 geography, "simple maps … locational and
       directional language"). B.MAPS.park is drawn from above; the treasure spots are named by what they are next to. */
    {
      id: "world-seed-20", subject: "world", level: "seed", emoji: "🗺️", title: "نقشه گنج",
      steps: [
        { type: "map", map: "park", enough: 5, prompt: "این نقشه یک پارک است، از بالا. روی جاهای پارک بزن تا اسمشان را بشنوی." },
        { type: "map", map: "park", say: "با نقشه راه برو.",
          tasks: [{ route: ["gate", "slide", "pond", "tree"], walker: "🧒",
            prompt: "از در پارک شروع کن. اول برو سرسره، بعد حوض، بعد درخت بزرگ.",
            say: "از در پارک شروع کن. اول برو سرسره، بعد حوض، بعد درخت بزرگ." }] },
        { type: "map", map: "park", say: "گنج‌ها را پیدا کن. هر گنج کنار یک چیز است.",
          tasks: [
            { find: "xPond", prompt: "اولین گنج کنار حوض است. روی ضربدر کنار حوض بزن." },
            { find: "xSlide", prompt: "گنج بعدی کنار سرسره است." },
            { find: "xTree", prompt: "گنج بعدی زیر درخت بزرگ است، در سایه‌اش." },
            { find: "xFlowers", prompt: "آخرین گنج کنار باغچه گل است." }
          ] },
        { type: "choose", prompt: "در نقشه، آب حوض چه رنگی است؟", say: "در نقشه، آب حوض را با چه رنگی کشیده‌اند؟", pic: true,
          options: [{ label: "🟢", value: "سبز" }, { label: "🔵", value: "آبی" }, { label: "🟡", value: "زرد" }], answer: "آبی" },
        { type: "choose", prompt: "از بالا، درخت چه شکلی است؟", say: "اگر از بالا به یک درخت نگاه کنیم، چه شکلی است؟", pic: true,
          options: [{ label: "🔺", value: "مثلث" }, { label: "🟩", value: "مربع" }, { label: "🟢", value: "دایره سبز" }], answer: "دایره سبز" },
        home({ pic: "🗺️ 🎁", text: "با یک نقشه گنج بازی کنید!",
          need: ["کاغذ و مداد", "یک «گنج» کوچک (یک خوراکی یا اسباب‌بازی)"],
          steps: [
            "نقشه ساده اتاق یا حیاط را از بالا بکشید: در، پنجره، فرش، تخت یا درخت.",
            "گنج را قایم کنید و جایش را روی نقشه با ضربدر نشان دهید.",
            "کودک با نقشه گنج را پیدا کند و بگوید کجا بود: «کنار در، زیر بالش».",
            "جایتان را عوض کنید: کودک قایم کند و نقشه بکشد."
          ],
          ask: "گنج تو کجا بود؟ کنار چه چیزی؟" })
      ]
    },

    /* Sources: workers who help us, and how goods get to us (NCSS C3 D2.Eco.1–3.K–2; D2.Civ.2.K–2). Bread from the
       field to the bakery. Workers against stereotype on purpose (a woman farmer, a man nurse). The nurse puts a plaster
       on a scraped knee: no blood, nothing frightening. */
    {
      id: "world-seed-21", subject: "world", level: "seed", emoji: "👷", title: "هر کس یک کار",
      steps: [
        { type: "scene", prompt: "کارهایی که به ما کمک می‌کنند", bg: "#cdeaf7",
          parts: {
            field: { art: "w-field" }, farmer: { art: "w-farmer-woman", at: [110, 86], s: 1.2 },
            street: { art: "w-street", o: 0 }, bakery: { art: "w-bakery", at: [70, 64], s: 1.5, o: 0 }, baker: { art: "🧑‍🍳", at: [54, 62], s: 1.1, o: 0 },
            peel: { art: "w-peel", at: [56, 51], s: 0.7, o: 0 }, counter: { art: "w-bakery-counter", at: [70, 64], s: 1.5, sy: 2, o: 0 },
            bus: { art: "w-bus", at: [200, 74], s: 1.3, o: 0 },
            site: { art: "w-meadow", o: 0 }, wall: { art: "w-wall", at: [68, 86], s: 1.4, o: 0 }, builder: { art: "w-builder", at: [110, 86], s: 1.2, o: 0 },
            clinic: { art: "w-clinic-room", o: 0 }, stool: { art: "w-stool2", at: [64, 86], s: 1.3, o: 0 },
            boy: { art: "w-patient-boy-sit", at: [64, 76], s: 1.25, o: 0 }, nurse: { art: "w-nurse", at: [96, 86], s: 1.2, o: 0 },
            plaster: { art: "w-plaster", at: [70, 74], s: 1.2, o: 0 },
            r1: { art: "w-farmer-woman", at: [140, 86], s: 0.95, o: 0 }, r2: { art: "w-baker", at: [112, 86], s: 0.95, o: 0 }, r3: { art: "w-driver-mom", at: [84, 86], s: 0.95, o: 0 },
            r4: { art: "w-builder", at: [56, 86], s: 0.95, o: 0 }, r5: { art: "w-nurse", at: [28, 86], s: 0.95, o: 0 }
          },
          scenes: [
            { caption: "کشاورز گندم کاشته. به گندم‌ها آب می‌دهد و گندم بزرگ می‌شود.", key: 3600, hold: 7200, do: D(
              [{ id: "field.ws1", to: { sy: 0.3 }, dur: 1 }, { id: "field.ws2", to: { sy: 0.3 }, dur: 1 }, { id: "field.ws3", to: { sy: 0.3 }, dur: 1 },
                { id: "farmer.armR", to: { r: -70 }, at: 800, dur: 500 }, { id: "farmer.can", to: { r: 35 }, at: 1300, dur: 500 },
                { emit: "drop", where: [126, 60], spread: [6, 2], rise: 9, n: 14, at: 1500, dur: 2400, life: 900 },
                { id: "field.ws1", to: { sy: 1 }, at: 2400, dur: 3600, ease: "out" }, { id: "field.ws2", to: { sy: 1 }, at: 2600, dur: 3600, ease: "out" }, { id: "field.ws3", to: { sy: 1 }, at: 2800, dur: 3600, ease: "out" },
                { id: "farmer.can", to: { r: 0 }, at: 4200, dur: 400 }, { id: "farmer.armR", to: { r: 0 }, at: 4400, dur: 400 }]) },
            { caption: "نانوا با آرد گندم نان می‌پزد.", key: 3400, hold: 6000, do: D(
              hide(["field", "farmer"], 0, 500), show(["street", "bakery", "baker", "peel", "counter"], 0, 600),
              [{ id: "bakery.glow", to: { s: 1.15 }, at: 600, dur: 5000, yoyo: true, times: 8 },
                { id: "baker.armF", to: { r: -60 }, at: 900, dur: 600 }, { id: "peel", to: { x: "+8" }, at: 1100, dur: 900, yoyo: true, times: 2 },
                { id: "counter.bread", to: { o: 1 }, at: 3000, dur: 500 }, { id: "baker.armF", to: { r: 0 }, at: 3000, dur: 500 }]) },
            { caption: "راننده با اتوبوس، مردم را به سر کار و مدرسه می‌برد.", key: 3000, hold: 5600, do: D(
              show(["bus"], 0, 300),
              [{ id: "bus", to: { x: -50 }, at: 300, dur: 5000, ease: "linear" }, { id: "bus.w1", to: { r: -900 }, at: 300, dur: 5000, ease: "linear" }, { id: "bus.w2", to: { r: -900 }, at: 300, dur: 5000, ease: "linear" }]) },
            { caption: "بنّا آجر روی آجر می‌گذارد و دیوار می‌سازد.", key: 6400, hold: 7800, do: D(
              hide(["street", "bakery", "baker", "peel", "counter", "bus"], 0, 500), show(["site", "wall", "builder"], 0, 600),
              [{ id: "wall.r2", to: { o: 0 }, dur: 1 }, { id: "wall.r3", to: { o: 0 }, dur: 1 }, { id: "wall.r4", to: { o: 0 }, dur: 1 }, { id: "wall.r5", to: { o: 0 }, dur: 1 }],
              [2, 3, 4, 5].map(function (r, i) {
                var t = 1200 + i * 1500;
                return [{ id: "builder.armR", to: { r: 70 }, at: t, dur: 500 }, { id: "wall.r" + r, to: { o: 1 }, at: t + 500, dur: 300 }, { id: "builder.armR", to: { r: 0 }, at: t + 800, dur: 500 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "زانوی آرین زخم شده. پرستار رویش چسب زخم می‌زند.", key: 4800, hold: 6800, do: D(
              hide(["site", "wall", "builder"], 0, 500), show(["clinic", "stool", "boy", "nurse"], 0, 600),
              [{ id: "boy.smile", to: { o: 0 }, dur: 1 }, { id: "boy.sad", to: { o: 1 }, dur: 1 },
                { id: "nurse.armL", to: { r: 60 }, at: 1600, dur: 600 }, { id: "plaster", to: { o: 1 }, at: 2400, dur: 400 },
                { id: "nurse.armL", to: { r: 0 }, at: 3200, dur: 500 },
                { id: "boy.sad", to: { o: 0 }, at: 3800, dur: 200 }, { id: "boy.smile", to: { o: 1 }, at: 3800, dur: 200 }], talk("nurse", 1000, 1200)) },
            { caption: "همه کار می‌کنند و به هم کمک می‌کنند. نانی که می‌خوریم کار خیلی‌هاست!", key: 6000, hold: 7400, do: D(
              hide(["clinic", "stool", "boy", "nurse", "plaster"], 0, 500), show(["site"], 0, 600),
              show(["r1"], 1200, 400), show(["r2"], 1800, 400), show(["r3"], 2400, 400), show(["r4"], 3000, 400), show(["r5"], 3600, 400),
              wave("r1", 4400, 1400), wave("r3", 4600, 1400, "armL"), wave("r5", 4800, 1400)) }
          ],
          question: "چه کسی نان می‌پزد؟", pic: true,
          options: [{ label: "🧑‍🌾", value: "کشاورز" }, { label: "🧑‍🍳", value: "نانوا" }, { label: "👷", value: "بنا" }], answer: "نانوا" },
        { type: "pairs", prompt: "هر کس با چه کار می‌کند؟", say: "هر کس با چه چیزی کار می‌کند؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "🧑‍🌾", say: "کشاورز" }, { pic: "🌾", say: "گندم" }],
            [{ pic: "🧑‍🍳", say: "نانوا" }, { pic: "🫓", say: "نان" }],
            [{ pic: "👷", say: "بنا" }, { pic: "🧱", say: "آجر" }],
            [{ pic: "🧑‍⚕️", say: "پرستار" }, { pic: "🩹", say: "چسب زخم" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌های جفت را پیدا کن", say: "کارت‌ها را برگردان و جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "🌾", say: "گندم" }, { pic: "🌾", say: "گندم" }],
            [{ pic: "🫓", say: "نان" }, { pic: "🫓", say: "نان" }],
            [{ pic: "🚌", say: "اتوبوس" }, { pic: "🚌", say: "اتوبوس" }],
            [{ pic: "🧱", say: "آجر" }, { pic: "🧱", say: "آجر" }]
          ] },
        { type: "talk", scene: "🧑‍🌾 🧑‍🍳 🚌 👷 🧑‍⚕️", caption: "بزرگ‌ترهای خانه تو چه کار می‌کنند؟ کار آن‌ها به چه کسانی کمک می‌کند؟ تو دوست داری چه کاره شوی؟" }
      ]
    },

    /* Sources: windows and mirrors, similarities first, real everyday lives (Bishop 1990; Derman-Sparks, "Anti-Bias
       Education"). Facts: in Chennai, idli (steamed rice cakes) with sambar is a usual breakfast and many children ride
       to school in an auto-rickshaw; in Cairo, ful medames (beans) with bread; in Canada, yellow school buses, snowy
       winters and steep roofs that let the snow slide off; in Beijing, steamed buns (baozi) and grandparents often take
       children to school. Greetings: Hindi/Tamil «namaste» («vanakkam» in Tamil), Arabic «ahlan», English «hello»,
       Mandarin «nǐ hǎo». No flags. Teacher review: names, foods and greetings. */
    {
      id: "world-seed-22", subject: "world", level: "seed", emoji: "👋", title: "سلام بچه‌های دنیا",
      steps: [
        (function () {
          var K = [{ id: "a", kid: "w-ananya", grown: "w-mom", x: 141 }, { id: "k", kid: "w-karim", grown: "w-dad2", x: 101 },
            { id: "c", kid: "w-chloe", grown: "w-dad", x: 61 }, { id: "w", kid: "w-wei", grown: "w-wei-grandpa", x: 21 }];
          var parts = { meadow: { art: "w-meadow" }, globe: { art: "w-globe", at: [80, 27], s: 1.1 }, dot: { art: "w-dot", at: [80, 23], s: 1.3 },
            ananya: { art: "w-ananya", at: [80, 88], s: 1.15 }, karim: { art: "w-karim", at: [176, 88], s: 1.15 },
            chloe: { art: "w-chloe", at: [176, 88], s: 1.15 }, wei: { art: "w-wei", at: [176, 88], s: 1.15 } };
          K.forEach(function (k) {
            parts[k.id + "PH"] = { art: "w-panel-home", at: [k.x, 45], o: 0 };
            parts[k.id + "G"] = { art: k.grown, at: [k.x + 7, 72], s: 0.6, o: 0 };
            parts[k.id + "H"] = { art: k.kid, at: [k.x - 7, 72], s: 0.62, o: 0 };
            parts[k.id + "T"] = { art: "w-table", at: [k.x, 74], s: 0.75, o: 0 };
            parts[k.id + "E"] = { art: k.kid + "-sit", at: [k.x - 6, 66], s: 0.7, o: 0 };
            parts[k.id + "PS"] = { art: "w-panel-school", at: [k.x, 45], o: 0 };
            parts[k.id + "PP"] = { art: "w-panel-play", at: [k.x, 45], o: 0 };
            parts[k.id + "K"] = { art: k.kid, at: [k.x + 3, 72], s: 0.62, o: 0 };
          });
          parts.ballA = { art: "w-ball", at: [136, 69], s: 0.8, o: 0 }; parts.ballW = { art: "w-ball", at: [16, 69], s: 0.8, o: 0 };
          var all = function (f) { return D.apply(null, K.map(f)); };
          return { type: "scene", prompt: "چهار دوست تازه", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "این آنانیاست. در شهر چِنای، در هند، زندگی می‌کند.", key: 3600, hold: 5200, do: D(
                [{ id: "globe.land", to: { x: -86.7 }, dur: 1 }], wave("ananya", 400, 1800), [pulse("dot", 2600, 1.5)]) },
              { caption: "این کریم است، از قاهره در مصر. این کلویی است، از کانادا. این وِی است، از پکن در چین.", key: 8600, hold: 9600, do: D(
                walk("ananya", { x: 136 }, 0, 1600),
                [{ id: "dot", to: { o: 0 }, dur: 300 }, { id: "globe.land", to: { x: -70.3 }, at: 200, dur: 1400 }, { id: "dot", to: { y: 17.7, o: 1 }, at: 1600, dur: 300 }],
                walk("karim", { x: 104 }, 600, 1800), wave("karim", 2400, 1400),
                [{ id: "dot", to: { o: 0 }, at: 3000, dur: 300 }, { id: "globe.land", to: { x: -27.7 }, at: 3200, dur: 1600 }, { id: "dot", to: { y: 11.5, o: 1 }, at: 4800, dur: 300 }],
                walk("chloe", { x: 64 }, 3300, 2200), wave("chloe", 5500, 1400, "armL"),
                [{ id: "dot", to: { o: 0 }, at: 6000, dur: 300 }, { id: "globe.land", to: { x: -98.7 }, at: 6200, dur: 1400 }, { id: "dot", to: { y: 14.6, o: 1 }, at: 7600, dur: 300 }],
                walk("wei", { x: 26 }, 6000, 2600), wave("wei", 8600, 1000, "armL")) },
              { caption: "هر چهار نفر خانه و خانواده دارند.", key: 3400, hold: 5200, do: D(
                hide(["globe", "dot", "ananya", "karim", "chloe", "wei"]),
                all(function (k) { return show([k.id + "PH", k.id + "G", k.id + "H"], 300, 600); }),
                all(function (k, i) { return wave(k.id + "H", 1400 + i * 300, 1400); })) },
              { caption: "همه صبح صبحانه می‌خورند.", key: 2600, hold: 5000, do: D(
                all(function (k) { return hide([k.id + "G", k.id + "H"]).concat(show([k.id + "T", k.id + "E"], 300, 500)); }),
                all(function (k, i) { return eat(k.id + "E", 1000 + i * 150, 2, "armR"); })) },
              { caption: "همه به مدرسه می‌روند.", key: 2800, hold: 4800, do: D(
                all(function (k) { return hide([k.id + "PH", k.id + "T", k.id + "E"]).concat(show([k.id + "PS", k.id + "K"], 300, 500)); }),
                all(function (k) { return walk(k.id + "K", { x: k.x - 3 }, 800, 1800); })) },
              { caption: "همه دوست دارند با دوستانشان بازی کنند و بخندند.", key: 3400, hold: 5600, do: D(
                all(function (k) { return hide([k.id + "PS"]).concat(show([k.id + "PP"], 300, 500)); }), show(["ballA", "ballW"], 600, 400),
                [{ id: "aK.armR", to: { r: -150 }, at: 1200, dur: 400 }, { id: "ballA", path: "M136 69Q140 34 144 66", at: 1500, dur: 1400, ease: "linear" },
                  { id: "wK.legR", to: { r: -40 }, at: 1300, dur: 300 }, { id: "wK.legR", to: { r: 0 }, at: 1600, dur: 300 }, { id: "ballW", path: "M16 69Q26 52 32 69", at: 1500, dur: 900, ease: "out" },
                  { id: "kK", path: "M104 72Q102 64 100 71Q98 64 96 71", at: 1400, dur: 1800, ease: "linear" }, { id: "cK.armL", to: { r: 150 }, at: 1300, dur: 500 }],
                all(function (k) { return [{ id: k.id + "K.smile", to: { o: 0 }, at: 3000, dur: 200 }, { id: k.id + "K.laugh", to: { o: 1 }, at: 3000, dur: 200 }]; })) }
            ] };
        })(),
        { type: "scene", prompt: "بعضی چیزها فرق دارد", bg: "#cdeaf7",
          parts: {
            room: { art: "w-room" }, table: { art: "w-table", at: [80, 90], s: 1.7 },
            kA: { art: "w-ananya", at: [80, 80], s: 1.3 }, kK: { art: "w-karim", at: [80, 80], s: 1.3, o: 0 }, kC: { art: "w-chloe", at: [80, 80], s: 1.3, o: 0 }, kW: { art: "w-wei", at: [80, 80], s: 1.3, o: 0 },
            idli: { art: "w-idli", at: [80, 66.4], s: 1.5 }, ful: { art: "w-ful", at: [80, 66.4], s: 1.5, o: 0 },
            pancake: { art: "🥞", at: [80, 67], s: 0.6, o: 0 }, bao: { art: "🥟", at: [80, 67], s: 0.6, o: 0 },
            road: { art: "w-vpath", o: 0 }, split: { art: "w-split", o: 0 },
            rick: { art: "w-rickshaw", at: [190, 80], s: 1.3, o: 0 }, karimB: { art: "w-karim-bag", at: [20, 80], s: 0.95, o: 0 },
            bus2: { art: "w-schoolbus2", at: [190, 80], s: 1.15, o: 0 }, weiB: { art: "w-wei-bag", at: [12, 80], s: 0.9, o: 0 }, wgp: { art: "w-wei-grandpa", at: [24, 80], s: 0.9, o: 0 },
            snow: { art: "w-snow-bg", o: 0 }, house: { art: "w-house-slope", at: [80, 78], s: 1.6, o: 0 },
            meadow: { art: "w-meadow", o: 0 },
            g1: { art: "w-ananya", at: [136, 86], s: 1.05, o: 0 }, g2: { art: "w-karim", at: [100, 86], s: 1.05, o: 0 }, g3: { art: "w-chloe", at: [64, 86], s: 1.05, o: 0 }, g4: { art: "w-wei", at: [28, 86], s: 1.05, o: 0 },
            b1: { art: "w-bubble", at: [136, 34], s: 0.9, o: 0 }, b2: { art: "w-bubble", at: [100, 22], s: 0.9, o: 0 }, b3: { art: "w-bubble", at: [64, 34], s: 0.9, o: 0 }, b4: { art: "w-bubble", at: [28, 22], s: 0.9, o: 0 },
            t1: { art: "نمسته!", at: [136, 36.4], s: 0.3, o: 0 }, t2: { art: "اهلاً!", at: [100, 24.4], s: 0.3, o: 0 }, t3: { art: "هلو!", at: [64, 36.4], s: 0.3, o: 0 }, t4: { art: "نی هائو!", at: [28, 24.4], s: 0.3, o: 0 }
          },
          scenes: [
            { caption: "صبحانه آنانیا ایدلی است: کیک‌های کوچک برنجی که با بخار پخته می‌شوند.", key: 2400, hold: 5200, do: D(eat("kA", 900, 2, "armR"), [pulse("idli", 3600, 1.15)]) },
            { caption: "صبحانه کریم فول است: باقلای پخته با نان.", key: 2400, hold: 4800, do: D(
              hide(["kA", "idli"]), show(["kK", "ful"], 300, 500), eat("kK", 1200, 2, "armL")) },
            { caption: "صبحانه کلویی پنکیک است. صبحانه وِی نان بخارپز است.", key: 5200, hold: 6800, do: D(
              hide(["kK", "ful"]), show(["kC", "pancake"], 300, 500), eat("kC", 1100, 1, "armR"),
              hide(["kC", "pancake"], 3200, 400), show(["kW", "bao"], 3600, 500), eat("kW", 4300, 1, "armL")) },
            { caption: "آنانیا با ریکشا به مدرسه می‌رود. کریم پیاده می‌رود.", key: 4400, hold: 6600, do: D(
              hide(["kW", "bao", "room", "table"]), show(["road", "split", "rick", "karimB"], 0, 500),
              [{ id: "rick", to: { x: 120 }, at: 500, dur: 3200, ease: "out" }, { id: "rick.w1", to: { r: -720 }, at: 500, dur: 3200, ease: "out" }, { id: "rick.w2", to: { r: -720 }, at: 500, dur: 3200, ease: "out" }],
              walk("karimB", { x: 62 }, 500, 4400)) },
            { caption: "کلویی با اتوبوس زرد مدرسه می‌رود. وِی با پدربزرگش پیاده می‌رود.", key: 4400, hold: 6600, do: D(
              hide(["rick", "karimB"]), show(["bus2", "weiB", "wgp"], 0, 500),
              [{ id: "bus2", to: { x: 120 }, at: 500, dur: 3200, ease: "out" }, { id: "bus2.w1", to: { r: -720 }, at: 500, dur: 3200, ease: "out" }, { id: "bus2.w2", to: { r: -720 }, at: 500, dur: 3200, ease: "out" }],
              walk("weiB", { x: 54 }, 500, 4400), walk("wgp", { x: 66 }, 500, 4400)) },
            { caption: "در کانادا زمستان برف زیادی می‌بارد. سقف خانه کلویی شیب دارد تا برف پایین بریزد.", key: 4700, hold: 8000, do: D(
              hide(["road", "split", "bus2", "weiB", "wgp"]), show(["snow", "house"], 0, 600),
              [{ emit: "bubble", where: [80, 0], spread: [150, 4], rise: -40, n: 30, at: 600, dur: 5000, life: 2600 },
                { id: "house.snow", path: "M0 0L14 14", at: 4200, dur: 1400, ease: "in" }, { id: "house.snow", to: { o: 0 }, at: 5400, dur: 300 }]) },
            { caption: "هر کدام به زبان خودش سلام می‌کند: «نمسته!»، «اهلاً!»، «هلو!»، «نی هائو!»", key: 7400, hold: 8600, do: D(
              hide(["snow", "house"]), show(["meadow", "g1", "g2", "g3", "g4"], 0, 600),
              wave("g1", 2600, 1400), show(["b1", "t1"], 2800, 300), wave("g2", 3800, 1400), show(["b2", "t2"], 4000, 300),
              wave("g3", 5100, 1400, "armL"), show(["b3", "t3"], 5300, 300), wave("g4", 6200, 1400, "armL"), show(["b4", "t4"], 6400, 300)) }
          ],
          question: "صبحانه کلویی چه بود؟", pic: true,
          options: [{ label: "🥞", value: "پنکیک" }, { label: "🍚", value: "ایدلی برنجی" }, { label: "🫓", value: "فول با نان" }], answer: "پنکیک" },
        { type: "sort", prompt: "مثل هم یا فرق دارد؟",
          say: "این‌ها در هر چهار دوست مثل هم است، یا فرق دارد؟",
          baskets: [{ pic: "🤝", label: "مثل هم", value: "same" }, { pic: "🌈", label: "فرق دارد", value: "diff" }],
          items: [
            { pic: "🏠", say: "داشتن خانه و خانواده", basket: "same" },
            { pic: "🎒", say: "رفتن به مدرسه", basket: "same" },
            { pic: "⚽", say: "دوست داشتن بازی", basket: "same" },
            { pic: "🥞", say: "چیزی که صبحانه می‌خورند", basket: "diff" },
            { pic: "🚌", say: "راه رفتن به مدرسه", basket: "diff" },
            { pic: "🗣️", say: "کلمه‌ای که با آن سلام می‌کنند", basket: "diff" }
          ] },
        { type: "pairs", prompt: "چه کسی؟ چه چیزی؟", say: "یادت هست؟ هر بچه را با چیزی که در قصه داشت جفت کن.",
          pairs: [
            [{ pic: "👧🏾", say: "آنانیا، از هند" }, { pic: "🛺", say: "ریکشا" }],
            [{ pic: "👦🏽", say: "کریم، از مصر" }, { pic: "🫓", say: "فول با نان" }],
            [{ pic: "👧🏼", say: "کلویی، از کانادا" }, { pic: "❄️", say: "برف زیاد" }],
            [{ pic: "👦🏻", say: "وِی، از چین" }, { pic: "👴", say: "پدربزرگ" }]
          ] },
        { type: "talk", scene: "👧🏾 👦🏽 👧🏼 👦🏻", caption: "تو صبح‌ها چه می‌خوری؟ چطور به مدرسه یا مهد می‌روی؟ اگر آنانیا مهمانت بود، چه چیزی به او نشان می‌دادی؟" }
      ]
    },

    /* Sources: cooperation, everyone has a part (NCSS C3 D2.Civ.7–9.K–2; CASEL relationship skills). A sandcastle on a
       beach (Caspian or Persian Gulf), and laying the sofreh together at home. */
    {
      id: "world-seed-23", subject: "world", level: "seed", emoji: "🏰", title: "با هم می‌سازیم",
      steps: [
        { type: "scene", prompt: "قلعه شنی", bg: "#cdeaf7",
          parts: {
            beach: { art: "w-beach" }, castle: { art: "w-castle", at: [86, 84], s: 1.6 },
            parisa: { art: "w-girl", at: [36, 86], s: 1.15 }, sbucket: { art: "w-sand-bucket", at: [48, 86], s: 1.3 },
            babak: { art: "w-babak-bucket", at: [128, 86], s: 1.15 }, arian: { art: "w-boy", at: [112, 86], s: 1.15 }, negin: { art: "w-girl4", at: [146, 86], s: 1.15 },
            room: { art: "w-room", o: 0 }, sofreh: { art: "w-sofreh", at: [80, 84], s: 1.3, sx: 0.05, o: 0 }, dad: { art: "w-dad2", at: [124, 86], s: 1.2, o: 0 },
            k1: { art: "w-girl", at: [24, 86], s: 1.1, o: 0 }, k2: { art: "w-boy3", at: [42, 86], s: 1.1, o: 0 },
            plate: { art: "🍽️", at: [28, 64], s: 0.45, o: 0 }, bread: { art: "🫓", at: [44, 64], s: 0.45, o: 0 },
            dadS: { art: "w-dad2-sit", at: [124, 74], s: 1.15, o: 0 }, k1S: { art: "w-girl-sit", at: [52, 74], s: 1.15, o: 0 }, k2S: { art: "w-boy3-sit", at: [86, 72], s: 1.15, o: 0 }
          },
          scenes: [
            { caption: "چهار دوست کنار دریا می‌خواهند یک قلعه شنی بزرگ بسازند.", key: 3600, hold: 5000, do: D(
              [{ id: "castle.base", to: { sy: 0.05 }, dur: 1 }, { id: "castle.t1", to: { sy: 0.05 }, dur: 1 }, { id: "castle.t2", to: { sy: 0.05 }, dur: 1 },
                { id: "sbucket.sand", to: { o: 0 }, dur: 1 }, { id: "beach.waves", to: { x: 10 }, dur: 5000, ease: "linear" }],
              wave("parisa", 600, 1400), wave("arian", 1000, 1400), wave("babak", 1400, 1400, "armL"), wave("negin", 1800, 1400, "armL")) },
            { caption: "پریسا سطل را پر از شن می‌کند.", key: 3600, hold: 5200, do: D(
              [{ id: "parisa.armR", to: { r: -40 }, at: 300, dur: 400 }, { id: "parisa.armR", to: { r: -20 }, at: 700, dur: 3000, yoyo: true, times: 8 },
                { id: "sbucket.sand", to: { o: 1 }, at: 1600, dur: 400 }, pulse("sbucket", 3400, 1.2), { id: "parisa.armR", to: { r: 0 }, at: 3800, dur: 400 }]) },
            { caption: "بابک با سطل آب می‌آورد تا شن خیس شود.", key: 3200, hold: 5400, do: D(
              walk("babak", { x: 106 }, 300, 2400, true),
              [{ emit: "drop", where: [90, 74], spread: [10, 2], rise: -4, n: 10, at: 2800, dur: 1400, life: 700 }]) },
            { caption: "آرین و نگین برج‌ها را می‌سازند.", key: 5600, hold: 6800, do: D(
              walk("negin", { x: 124 }, 0, 1400), walk("arian", { x: 64 }, 0, 1600),
              [{ id: "castle.base", to: { sy: 1 }, at: 1800, dur: 1600, ease: "out" }, { id: "castle.t1", to: { sy: 1 }, at: 3400, dur: 1400, ease: "out" }, { id: "castle.t2", to: { sy: 1 }, at: 4200, dur: 1400, ease: "out" },
                { id: "arian.armR", to: { r: -60 }, at: 3400, dur: 1400, yoyo: true, times: 2 }, { id: "negin.armL", to: { r: 60 }, at: 4200, dur: 1400, yoyo: true, times: 2 }]) },
            { caption: "پریسا و بابک با صدف تزیینش می‌کنند.", key: 4200, hold: 5400, do: D(
              [{ id: "parisa.armR", to: { r: -70 }, at: 400, dur: 400 }, { id: "castle.s1", to: { o: 1 }, at: 1000, dur: 300 }, { id: "parisa.armR", to: { r: 0 }, at: 1600, dur: 400 },
                { id: "babak.armL", to: { r: 70 }, at: 1800, dur: 400 }, { id: "castle.s2", to: { o: 1 }, at: 2400, dur: 300 }, { id: "castle.s3", to: { o: 1 }, at: 3200, dur: 300 }, { id: "babak.armL", to: { r: 0 }, at: 3600, dur: 400 }]) },
            { caption: "هیچ‌کس به تنهایی نمی‌توانست. با هم ساختند!", key: 2600, hold: 5000, do: D(
              [{ emit: "spark", where: [86, 40], spread: [60, 20], n: 14, at: 300, dur: 2400, life: 1200 }],
              ["parisa", "babak", "arian", "negin"].map(function (k, i) {
                return [{ id: k + ".smile", to: { o: 0 }, at: 600 + i * 150, dur: 200 }, { id: k + ".laugh", to: { o: 1 }, at: 600 + i * 150, dur: 200 }, { id: k, to: { y: "-4" }, at: 800 + i * 150, dur: 600, yoyo: true, times: 4 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "در خانه هم کارها را با هم می‌کنیم. پدر سفره را پهن می‌کند. بچه‌ها بشقاب و نان می‌آورند.", key: 5000, hold: 7600, do: D(
              hide(["beach", "castle", "parisa", "sbucket", "babak", "arian", "negin"], 0, 500), show(["room", "sofreh", "dad", "k1", "k2"], 300, 600),
              [{ id: "sofreh", to: { sx: 1.3 }, at: 900, dur: 1600, ease: "out" }, { id: "dad.armL", to: { r: 60 }, at: 900, dur: 400 }, { id: "dad.armL", to: { r: 0 }, at: 2500, dur: 400 }],
              show(["plate", "bread"], 2600, 300), walk("k1", { x: 58 }, 2800, 1600, true), walk("k2", { x: 76 }, 3000, 1600, true),
              [{ id: "plate", path: "M28 64L62 64Q70 70 64 82", at: 2800, dur: 2400 }, { id: "bread", path: "M44 64L80 64Q86 70 84 82", at: 3000, dur: 2400 }]) },
            { caption: "همه کمک کردند. حالا با هم غذا می‌خورند. نوش جان!", key: 2800, hold: 5000, do: D(
              hide(["dad", "k1", "k2"], 0, 400), show(["dadS", "k1S", "k2S"], 300, 500),
              eat("dadS", 1000, 2, "armL"), eat("k1S", 1200, 2, "armR"), eat("k2S", 1400, 2, "armR")) }
          ] },
        { type: "order", prompt: "قلعه را چطور ساختند؟", say: "دوستان اول چه کار کردند؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🪣", say: "سطل را پر از شن کردند" }, { pic: "💧", say: "آب آوردند تا شن خیس شود" }, { pic: "🏰", say: "برج‌ها را ساختند" }, { pic: "🐚", say: "با صدف تزیین کردند" }] },
        { type: "order", prompt: "سفره را چطور چیدند؟", say: "برای غذا خوردن با هم، اول چه کار می‌کنیم؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🧺", say: "سفره را پهن می‌کنیم" }, { pic: "🍽️", say: "بشقاب‌ها را می‌چینیم" }, { pic: "🫓", say: "نان و غذا را می‌آوریم" }, { pic: "😋", say: "با هم می‌خوریم" }] },
        { type: "doit", pic: "🍽️ 🤝", text: "امروز سفره را با هم بچینید!",
          list: ["یکی سفره را پهن کند.", "یکی بشقاب و قاشق بیاورد.", "یکی نان و آب بیاورد.", "بعد از غذا، با هم جمع کنید."] },
        { type: "doit", pic: "🧸 🤝", text: "اتاق را با هم مرتب کنید!",
          list: ["کارها را تقسیم کنید: یکی کتاب‌ها، یکی اسباب‌بازی‌ها، یکی لباس‌ها.", "هر کس کار خودش را انجام دهد.", "آخر کار ببینید: با هم چقدر زود تمام شد!"] }
      ]
    },

    /* Sources: unit game practising world-seed-9 to world-seed-21 (positions, from above, old and new, need and want,
       my country). Each step stands on its own for reviews. */
    {
      id: "world-seed-24", subject: "world", level: "seed", emoji: "🎲", title: "بازی شهر من",
      steps: [
        { type: "map", map: "toys", say: "در اتاق نیما پیدا کن.",
          tasks: [
            { find: "shoes", prompt: "زیر تخت چه هست؟", say: "زیر تخت چه هست؟ رویش بزن." },
            { find: "plant", prompt: "روی میز چه هست؟", say: "روی میز چه هست؟ رویش بزن." },
            { find: "car", prompt: "جلوی جعبه چه هست؟", say: "جلوی جعبه چه هست؟ رویش بزن." },
            { find: "cat", prompt: "کنار جعبه چه کسی نشسته؟", say: "کنار جعبه چه کسی نشسته؟ رویش بزن." }
          ] },
        { type: "map", map: "room", say: "این اتاق از بالاست.",
          tasks: [
            { find: "ball", prompt: "از بالا، توپ کجاست؟" },
            { find: "bed", prompt: "از بالا، تخت کجاست؟" }
          ] },
        { type: "sort", prompt: "قدیمی یا جدید؟", say: "کدام قدیمی است؟ کدام جدید است؟",
          baskets: [{ pic: "👴", label: "قدیمی", value: "old" }, { pic: "🧒", label: "جدید", value: "new" }],
          items: [
            { pic: "✉️", say: "نامه‌ای که چند روز در راه است", basket: "old" },
            { pic: "☎️", say: "تلفن سیم‌دار قدیمی", basket: "old" },
            { pic: "🕯️", say: "شمع برای روشن کردن خانه", basket: "old" },
            { pic: "💡", say: "لامپ", basket: "new" },
            { pic: "📱", say: "تلفن همراه", basket: "new" }
          ] },
        { type: "sort", prompt: "لازم داریم یا دوست داریم؟", say: "کدام را برای زندگی لازم داریم؟ کدام را فقط دوست داریم؟",
          baskets: [{ pic: "🏠", label: "لازم داریم", value: "need" }, { pic: "💛", label: "دوست داریم", value: "want" }],
          items: [
            { pic: "🍎", say: "غذا", basket: "need" },
            { pic: "🚰", say: "آب", basket: "need" },
            { pic: "🧥", say: "لباس گرم", basket: "need" },
            { pic: "🪁", say: "بادبادک", basket: "want" },
            { pic: "🍬", say: "شکلات", basket: "want" }
          ] },
        { type: "pairs", hidden: true, prompt: "قدیم و جدید را جفت کن", say: "کارت‌ها را برگردان. هر چیز قدیمی را با چیز جدیدی که همان کار را می‌کند جفت کن.",
          pairs: [
            [{ pic: "🕯️", say: "شمع" }, { pic: "💡", say: "لامپ" }],
            [{ pic: "✉️", say: "نامه" }, { pic: "📱", say: "تلفن همراه" }],
            [{ pic: "🪣", say: "سطل آب از چشمه" }, { pic: "🚰", say: "شیر آب" }]
          ] },
        { type: "map", map: "iran", layers: ["iran", "seas"],
          tasks: [{ find: "iran", prompt: "کشور ما کجاست؟ رویش بزن.", say: "کشور ما، ایران، روی نقشه کجاست؟ رویش بزن." }] }
      ]
    },

    // ---------------- Iran and the world: Sprout (city and village, maps, directions, Iran, festivals, languages) ----------------

    /* Sources: "my own past" and a first timeline (NCSS C3 D2.His.1–3.K–2: chronological sequence, before and after;
       England KS1 history, "changes within living memory"; Iran's third-grade social studies, lessons 1–2 «من بزرگ
       می‌شوم»). The life line runs from right (long ago) to left (now), as Persian is read. Parent note: some children
       have no baby photos; drawings and stories are just as good. */
    {
      id: "world-sprout-9", subject: "world", level: "sprout", emoji: "📏", title: "داستان زندگی من",
      steps: [
        { type: "scene", prompt: "خط زندگی بردیا", bg: "#fffaf0",
          parts: {
            line: { art: "w-lifeline", o: 0 }, bardia: { art: "w-bardia", at: [80, 86], s: 1.3 },
            c1: { art: "w-card", at: [136, 46], o: 0 }, c2: { art: "w-card", at: [108, 46], o: 0 }, c3: { art: "w-card", at: [80, 46], o: 0 }, c4: { art: "w-card", at: [52, 46], o: 0 }, c5: { art: "w-card", at: [24, 46], o: 0 },
            p1: { art: "w-baby-arms", at: [136, 54], s: 0.9, o: 0 },
            p2: { art: "w-bardia-small", at: [114, 55], s: 0.5, o: 0 },
            p3: { art: "w-bardia-small", at: [84, 55], s: 0.5, o: 0 }, bub: { art: "w-bubble", at: [75, 38], s: 0.5, o: 0 }, word: { art: "بابا!", at: [75, 39.4], s: 0.18, o: 0 },
            p4: { art: "w-bardia-bag", at: [54, 55], s: 0.55, o: 0 },
            p5: { art: "w-bardia", at: [20, 55], s: 0.62, o: 0 }, ball: { art: "w-ball", at: [30, 52], s: 0.45, o: 0 }
          },
          scenes: [
            { caption: "این بردیاست. می‌خواهد داستان زندگی‌اش را از اول تعریف کند.", key: 2400, hold: 4800, do: D(wave("bardia", 600, 1800)) },
            { caption: "اول، بردیا به دنیا آمد. یک نوزاد کوچک بود.", key: 3200, hold: 5000, do: D(
              [{ id: "bardia", to: { x: 80, y: 96, o: 0 }, dur: 800 }], show(["line"], 600, 600), show(["c1", "p1"], 1400, 600),
              [{ id: "p1.armL", to: { r: 120 }, at: 2200, dur: 1400, yoyo: true, times: 4 }, { id: "p1.armR", to: { r: -120 }, at: 2200, dur: 1400, yoyo: true, times: 4 }]) },
            { caption: "بعد، اولین قدم‌هایش را برداشت.", key: 2400, hold: 4400, do: D(
              show(["c2", "p2"], 300, 500), walk("p2", { x: 102 }, 900, 2600), [{ id: "p2", to: { r: 6 }, at: 900, dur: 2600, yoyo: true, times: 6 }]) },
            { caption: "بعد، اولین کلمه‌اش را گفت: «بابا!»", key: 2600, hold: 4600, do: D(
              show(["c3", "p3"], 300, 500), show(["bub", "word"], 1400, 300), talk("p3", 1400, 1600)) },
            { caption: "بعد، به مهدکودک رفت.", key: 2400, hold: 4400, do: D(
              show(["c4", "p4"], 300, 500), walk("p4", { x: 48 }, 900, 2000)) },
            { caption: "حالا، بردیا بزرگ شده و با دوستانش توپ‌بازی می‌کند.", key: 2400, hold: 4800, do: D(
              show(["c5", "p5", "ball"], 300, 500),
              [{ id: "p5.legR", to: { r: -40 }, at: 1200, dur: 250 }, { id: "p5.legR", to: { r: 0 }, at: 1450, dur: 250 },
                { id: "ball", path: "M30 52Q26 42 22 44", at: 1400, dur: 700, ease: "out" }]) },
            { caption: "قبل، بعد، حالا: این خط زندگی بردیاست. از راست، از وقتی نوزاد بود، تا حالا.", key: 5200, hold: 7000, do: D(
              [pulse("c1", 1400, 1.12), pulse("c2", 2200, 1.12), pulse("c3", 3000, 1.12), pulse("c4", 3800, 1.12), pulse("c5", 4600, 1.12)]) }
          ] },
        { type: "order", prompt: "خط زندگی بردیا", say: "اول چه شد؟ بعد چه؟ از نوزادی تا حالا به ترتیب بچین.", numbered: true,
          items: [{ pic: "👶", say: "به دنیا آمد" }, { pic: "👣", say: "اولین قدم‌ها" }, { pic: "🗣️", say: "اولین کلمه" }, { pic: "🎒", say: "رفتن به مهدکودک" }, { pic: "⚽", say: "حالا: توپ‌بازی با دوستان" }] },
        { type: "order", prompt: "قبل و بعد", say: "این کارها را به ترتیب بچین: کدام اول یاد گرفتی؟ کدام بعد؟", numbered: true,
          items: [{ pic: "🍼", say: "شیر خوردن با شیشه" }, { pic: "🥄", say: "خودم با قاشق غذا خوردن" }, { pic: "👟", say: "خودم کفش پوشیدن" }, { pic: "🚲", say: "دوچرخه‌سواری" }] },
        home({ pic: "📷 📏", text: "خط زندگی خودت را بساز!",
          need: ["یک نوار کاغذ بلند", "چند عکس یا نقاشی (از نوزادی تا حالا)", "چسب"],
          steps: [
            "روی نوار یک خط بکشید. سمت راست بنویسید «به دنیا آمدم» و سمت چپ «حالا».",
            "عکس‌ها یا نقاشی‌ها را به ترتیب روی خط بچسبانید: نوزادی، اولین قدم‌ها، مهد، حالا.",
            "کنار هر عکس با کودک یک جمله بنویسید: «این وقتی بود که…»"
          ],
          ask: "یک چیز بگو که قبلاً نمی‌توانستی و حالا می‌توانی." }),
        { type: "forparents", guide: "offscreen", guideLabel: "یادگیری بیرون از صفحه، در راهنمای والدین",
          tips: [
            "کلمه‌های زمان را در گفت‌وگوی روزانه به کار ببرید: «قبل»، «بعد»، «اول»، «آخر»، «حالا».",
            "اگر عکس نوزادی ندارید، اشکالی ندارد: تعریف کردن و نقاشی کشیدن همان کار را می‌کند.",
            "از خاطره‌های شیرین بگویید و درباره روزهای سخت خانواده، فقط اگر کودک خودش پرسید و آرام، حرف بزنید."
          ] }
      ]
    },

    /* Sources: days, seasons and months in order (NCSS C3 D2.His.1.K–2; England KS1 maths, "days of the week, months
       of the year"; Iran's fourth-grade social studies, lesson 21 «تقویم»). The Iranian solar year: 12 months, three per
       season, Nowruz on 1 Farvardin. Friday is the weekly holiday. */
    {
      id: "world-sprout-10", subject: "world", level: "sprout", emoji: "🗓️", title: "هفته و سال",
      steps: [
        (function () {
          var DAYS = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
          var MONTHS = [["فروردین", "اردیبهشت", "خرداد"], ["تیر", "مرداد", "شهریور"], ["مهر", "آبان", "آذر"], ["دی", "بهمن", "اسفند"]];
          var ICONS = ["🌸", "☀️", "🍂", "❄️"];
          var parts = { meadow: { art: "w-meadow" }, ring: { art: "w-tile-on", at: [148, 40], o: 0 } };
          DAYS.forEach(function (d, i) {
            parts["d" + i] = { art: "w-tile", at: [148 - i * 22, 40], o: 0 };
            parts["dt" + i] = { art: d, at: [148 - i * 22, 41.8], s: 0.2, o: 0 };
          });
          parts.picnic = { art: "w-picnic", at: [16, 76], s: 0.8, o: 0 };
          parts.wheel = { art: "w-year", at: [80, 44], s: 1.6, o: 0 };
          MONTHS.forEach(function (row, r) {
            parts["i" + r] = { art: ICONS[r], at: [140, 25 + r * 18], s: 0.5, o: 0 };
            row.forEach(function (m, c) {
              parts["m" + r + c] = { art: "w-tile", at: [112 - c * 32, 20 + r * 18], s: 1.3, o: 0 };
              parts["mt" + r + c] = { art: m, at: [112 - c * 32, 22.4 + r * 18], s: 0.26, o: 0 };
            });
          });
          parts.cake = { art: "🎂", at: [20, 48], s: 0.9, o: 0 };
          var showRow = function (r, at) {
            return D(show(["i" + r], at, 400), [0, 1, 2].map(function (c) { return show(["m" + r + c, "mt" + r + c], at + 600 + c * 700, 400); }).reduce(function (a, b) { return a.concat(b); }, []));
          };
          return { type: "scene", prompt: "روزها، فصل‌ها و ماه‌ها", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "هفته هفت روز دارد: شنبه، یک‌شنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنج‌شنبه و جمعه.", key: 7600, hold: 8400, do: D(
                [0, 1, 2, 3, 4, 5, 6].map(function (i) { return show(["d" + i, "dt" + i], 1000 + i * 900, 400); }).reduce(function (a, b) { return a.concat(b); }, []),
                [{ id: "ring", to: { o: 1 }, at: 1000, dur: 300 }, { id: "ring", to: { x: 16 }, at: 1000, dur: 6300, ease: "linear" }]) },
              { caption: "جمعه روز تعطیل است. خیلی از خانواده‌ها با هم به گردش می‌روند. بعد دوباره شنبه می‌شود.", key: 3600, hold: 6000, do: D(
                show(["picnic"], 300, 600), [pulse("d6", 900, 1.2), pulse("d6", 1900, 1.2), { id: "ring", to: { x: 148 }, at: 3600, dur: 1200 }, pulse("d0", 4800, 1.2)]) },
              { caption: "سال چهار فصل دارد: بهار، تابستان، پاییز و زمستان.", key: 5600, hold: 7000, do: D(
                hide(["ring", "picnic", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "dt0", "dt1", "dt2", "dt3", "dt4", "dt5", "dt6"]), show(["wheel"], 400, 600),
                [{ id: "wheel.hand", to: { r: 45 }, at: 1800, dur: 900 }, { id: "wheel.hand", to: { r: 135 }, at: 2900, dur: 900 },
                  { id: "wheel.hand", to: { r: 225 }, at: 4000, dur: 900 }, { id: "wheel.hand", to: { r: 315 }, at: 5100, dur: 900 }]) },
              { caption: "هر فصل سه ماه دارد. ماه‌های بهار: فروردین، اردیبهشت، خرداد. نوروز روز اول فروردین است.", key: 4400, hold: 6400, do: D(
                hide(["wheel"]), showRow(0, 500)) },
              { caption: "ماه‌های تابستان: تیر، مرداد، شهریور.", key: 3400, hold: 4400, do: showRow(1, 300) },
              { caption: "ماه‌های پاییز: مهر، آبان، آذر.", key: 3400, hold: 4400, do: showRow(2, 300) },
              { caption: "ماه‌های زمستان: دی، بهمن، اسفند. بعد از اسفند، دوباره فروردین می‌آید.", key: 3400, hold: 5400, do: D(showRow(3, 300), [pulse("m00", 4000, 1.2)]) },
              { caption: "تولد تو در کدام ماه است؟ از پدر و مادرت بپرس!", key: 1600, hold: 4400, do: D(show(["cake"], 300, 500), [pulse("cake", 900, 1.2), pulse("cake", 2100, 1.2)]) }
            ] };
        })(),
        { type: "order", prompt: "روزهای هفته", say: "روزهای هفته را از شنبه به ترتیب بچین. روی هر کدام بزن تا اسمش را بشنوی.", numbered: true,
          items: [{ label: "شنبه", say: "شنبه" }, { label: "یک‌شنبه", say: "یک‌شنبه" }, { label: "دوشنبه", say: "دوشنبه" }, { label: "سه‌شنبه", say: "سه‌شنبه" },
            { label: "چهارشنبه", say: "چهارشنبه" }, { label: "پنج‌شنبه", say: "پنج‌شنبه" }, { label: "جمعه", say: "جمعه" }] },
        { type: "order", prompt: "فصل‌ها", say: "از بهار شروع کن. فصل‌ها را به ترتیب بچین.", numbered: true,
          items: [{ pic: "🌸", say: "بهار" }, { pic: "☀️", say: "تابستان" }, { pic: "🍂", say: "پاییز" }, { pic: "❄️", say: "زمستان" }] },
        { type: "order", prompt: "ماه‌های بهار و تابستان", say: "ماه‌های بهار و تابستان را از فروردین به ترتیب بچین.", numbered: true,
          items: [{ label: "فروردین", say: "فروردین" }, { label: "اردیبهشت", say: "اردیبهشت" }, { label: "خرداد", say: "خرداد" },
            { label: "تیر", say: "تیر" }, { label: "مرداد", say: "مرداد" }, { label: "شهریور", say: "شهریور" }] },
        { type: "choose", prompt: "بعد از سه‌شنبه چه روزی است؟", say: "بعد از سه‌شنبه چه روزی است؟", stack: true,
          options: ["دوشنبه", "چهارشنبه", "جمعه"], answer: "چهارشنبه" },
        { type: "choose", prompt: "مهر در کدام فصل است؟", say: "ماه مهر در کدام فصل است؟", pic: true,
          options: [{ label: "🌸", value: "بهار" }, { label: "🍂", value: "پاییز" }, { label: "❄️", value: "زمستان" }], answer: "پاییز" }
      ]
    },

    /* Sources: families alike and different, families change (NCSS C3 D2.His.2.K–2; Iran's third-grade social studies,
       lessons 3–7 «خانواده»: خانواده‌ها با هم فرق دارند، تغییر خانواده، قدردانی). Changes shown are everyday and happy or
       neutral (a new baby, moving house, a grandparent coming to live with the family); nothing about loss. */
    {
      id: "world-sprout-11", subject: "world", level: "sprout", emoji: "👨‍👩‍👧‍👦", title: "خانواده‌ها تغییر می‌کنند",
      steps: [
        { type: "scene", prompt: "خانواده‌ها", bg: "#fffaf0",
          parts: {
            r1: { art: "w-room3" }, r2: { art: "w-room", at: [160, 0] }, r3: { art: "w-room4", at: [320, 0] },
            f1a: { art: "w-mom2", at: [66, 86], s: 1.15 }, f1b: { art: "w-nila", at: [102, 86], s: 1.15 },
            f2a: { art: "w-dad", at: [204, 86], s: 1.15 }, f2b: { art: "w-mom", at: [226, 86], s: 1.15 }, f2c: { art: "w-reza", at: [250, 86], s: 1.1 }, f2d: { art: "w-boy2", at: [270, 86], s: 1 },
            f3a: { art: "w-grandpa", at: [360, 86], s: 1.15 }, f3b: { art: "w-dad2", at: [382, 86], s: 1.15 }, f3c: { art: "w-mom2", at: [404, 86], s: 1.15 }, f3d: { art: "w-sara-g", at: [428, 86], s: 1.1 },
            baby: { art: "w-baby", at: [84, 87], s: 1.2, o: 0 },
            box1: { art: "w-box", at: [236, 86], s: 0.9, o: 0 }, box2: { art: "w-box", at: [258, 86], s: 0.7, o: 0 }, dbox: { art: "w-dad-box", at: [204, 86], s: 1.15, o: 0 },
            gran: { art: "w-gran", at: [470, 86], s: 1.15, o: 0 }, bag: { art: "🧳", at: [482, 86], s: 0.6, o: 0 },
            heart: { art: "w-heart", at: [400, 30], s: 1.2, o: 0 }
          },
          scenes: [
            { caption: "خانواده‌ها مثل هم نیستند. خانواده نیلا دو نفر است: نیلا و مادرش.", key: 2600, hold: 5000, do: D(wave("f1b", 900, 1600), wave("f1a", 1200, 1600, "armL")) },
            { caption: "خانواده رضا چهار نفر است: پدر، مادر، رضا و برادرش.", key: 3400, hold: 5000, do: D(
              [{ cam: { x: 240 }, dur: 1800 }], wave("f2c", 2000, 1400), wave("f2d", 2400, 1400)) },
            { caption: "خانواده سارا پدربزرگ هم دارد.", key: 3400, hold: 5000, do: D(
              [{ cam: { x: 400 }, dur: 1800 }], wave("f3d", 2000, 1400, "armL"), wave("f3a", 2400, 1400)) },
            { caption: "خانواده‌ها تغییر هم می‌کنند. خانواده نیلا یک نوزاد تازه دارد!", key: 4200, hold: 6000, do: D(
              [{ cam: { x: 80 }, dur: 1800 }], show(["baby"], 2000, 600),
              [{ id: "f1b.smile", to: { o: 0 }, at: 2800, dur: 200 }, { id: "f1b.laugh", to: { o: 1 }, at: 2800, dur: 200 }, { id: "f1b", to: { y: "-3" }, at: 3000, dur: 600, yoyo: true, times: 4 }]) },
            { caption: "خانواده رضا به خانه تازه‌ای می‌روند. همه وسایل را در کارتن گذاشته‌اند.", key: 4400, hold: 6400, do: D(
              [{ cam: { x: 240 }, dur: 1800 }], show(["box1", "box2"], 1600, 500),
              [{ id: "f2a", to: { o: 0 }, at: 2200, dur: 300 }, { id: "dbox", to: { o: 1 }, at: 2200, dur: 300 }],
              walk("dbox", { x: 168 }, 2800, 2600)) },
            { caption: "مادربزرگ سارا حالا با آن‌ها زندگی می‌کند.", key: 4600, hold: 6400, do: D(
              [{ cam: { x: 400 }, dur: 1800 }], show(["gran", "bag"], 1400, 400), walk("gran", { x: 446 }, 1600, 2200),
              [{ id: "bag", to: { x: 458 }, at: 1600, dur: 2200, ease: "linear" }, { id: "f3d.armR", to: { r: -70 }, at: 3900, dur: 500 }, { id: "gran.armL", to: { r: 60 }, at: 3900, dur: 500 }],
              show(["heart"], 4200, 400), [pulse("heart", 4600, 1.2)]) }
          ] },
        { type: "scene", prompt: "ممنون!", bg: "#fffaf0",
          parts: {
            room: { art: "w-room" }, mom: { art: "w-mom", at: [100, 86], s: 1.2 }, girl: { art: "w-nila", at: [56, 86], s: 1.15 },
            pot: { art: "🍲", at: [112, 66], s: 0.45 }, flower: { art: "w-drawing", at: [62, 70], s: 1.1, o: 0 },
            bub: { art: "w-bubble", at: [48, 34], s: 0.8, o: 0 }, word: { art: "ممنون!", at: [48, 36.2], s: 0.28, o: 0 },
            heart: { art: "w-heart", at: [80, 26], s: 1, o: 0 }
          },
          scenes: [
            { caption: "مادر نیلا شام درست کرده است. بوی خوبش همه جا پیچیده.", key: 2600, hold: 4800, do: D(
              [{ id: "mom.armR", to: { r: -60 }, at: 400, dur: 400 }, { id: "pot", to: { y: "-1.5" }, at: 800, dur: 2400, yoyo: true, times: 4 },
                { emit: "bubble", where: [112, 58], spread: [3, 2], n: 8, rise: 12, at: 800, dur: 2400 }]) },
            { caption: "نیلا برای مادرش یک نقاشی کشیده و به او می‌دهد. می‌گوید: «ممنون!»", key: 3800, hold: 6000, do: D(
              [{ id: "mom.armR", to: { r: 0 }, dur: 400 }, { id: "flower", to: { o: 1 }, at: 400, dur: 300 }, { id: "girl.armR", to: { r: -60 }, at: 600, dur: 500 },
                { id: "flower", path: "M62 70Q76 60 90 68", at: 1200, dur: 1000 }, { id: "mom.armL", to: { r: 50 }, at: 1800, dur: 500 }],
              show(["bub", "word"], 2400, 300), talk("girl", 2400, 1400),
              [{ id: "mom.smile", to: { o: 0 }, at: 3800, dur: 200 }, { id: "mom.laugh", to: { o: 1 }, at: 3800, dur: 200 }], show(["heart"], 4200, 400)) }
          ] },
        { type: "sort", prompt: "همه خانواده‌ها یا بعضی؟", say: "این در همه خانواده‌ها هست، یا فقط در بعضی؟",
          baskets: [{ pic: "🤝", label: "همه خانواده‌ها", value: "all" }, { pic: "🌈", label: "بعضی خانواده‌ها", value: "some" }],
          items: [
            { pic: "💛", say: "همدیگر را دوست دارند", basket: "all" },
            { pic: "🤗", say: "به هم کمک می‌کنند", basket: "all" },
            { pic: "🍲", say: "با هم غذا می‌خورند", basket: "all" },
            { pic: "👶", say: "یک نوزاد دارند", basket: "some" },
            { pic: "👵", say: "مادربزرگ با آن‌ها زندگی می‌کند", basket: "some" },
            { pic: "🐈", say: "گربه دارند", basket: "some" }
          ] },
        { type: "sort", prompt: "تشکر کردن", say: "کدام کار راهی برای تشکر کردن است؟",
          baskets: [{ pic: "💛", label: "تشکر است", value: "yes" }, { pic: "❔", label: "تشکر نیست", value: "no" }],
          items: [
            { pic: "🗣️", say: "گفتن «ممنون»", basket: "yes" },
            { pic: "🖍️", say: "کشیدن یک نقاشی برای کسی", basket: "yes" },
            { pic: "🍽️", say: "کمک در جمع کردن سفره", basket: "yes" },
            { pic: "🙈", say: "روی برگرداندن", basket: "no" },
            { pic: "😠", say: "غر زدن", basket: "no" }
          ] },
        { type: "talk", scene: "👨‍👩‍👧 👶 📦 👵", caption: "خانواده تو چند نفر است؟ از وقتی یادت هست، چه تغییری کرده؟ امروز از چه کسی تشکر می‌کنی؟" }
      ]
    },

    /* Sources: unit game practising world-sprout-9 to world-sprout-11 (life in order, the week and the year, families).
       Each step stands on its own for reviews. */
    {
      id: "world-sprout-12", subject: "world", level: "sprout", emoji: "🎲", title: "بازی داستان من",
      steps: [
        { type: "order", prompt: "از نوزادی تا حالا", say: "اول چه می‌شود؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "👶", say: "نوزاد" }, { pic: "👣", say: "اولین قدم‌ها" }, { pic: "🎒", say: "مهدکودک و مدرسه" }, { pic: "🚲", say: "دوچرخه‌سواری" }] },
        { type: "order", prompt: "روزهای هفته", say: "روزهای هفته را از شنبه به ترتیب بچین.", numbered: true,
          items: [{ label: "شنبه", say: "شنبه" }, { label: "یک‌شنبه", say: "یک‌شنبه" }, { label: "دوشنبه", say: "دوشنبه" }, { label: "سه‌شنبه", say: "سه‌شنبه" },
            { label: "چهارشنبه", say: "چهارشنبه" }, { label: "پنج‌شنبه", say: "پنج‌شنبه" }, { label: "جمعه", say: "جمعه" }] },
        { type: "order", prompt: "ماه‌های پاییز و زمستان", say: "ماه‌های پاییز و زمستان را از مهر به ترتیب بچین.", numbered: true,
          items: [{ label: "مهر", say: "مهر" }, { label: "آبان", say: "آبان" }, { label: "آذر", say: "آذر" }, { label: "دی", say: "دی" }, { label: "بهمن", say: "بهمن" }, { label: "اسفند", say: "اسفند" }] },
        { type: "pairs", hidden: true, prompt: "هر فصل و ماه اولش", say: "کارت‌ها را برگردان. هر فصل را با ماه اولش جفت کن.",
          pairs: [
            [{ pic: "🌸", say: "بهار" }, { label: "فروردین", say: "فروردین" }],
            [{ pic: "☀️", say: "تابستان" }, { label: "تیر", say: "تیر" }],
            [{ pic: "🍂", say: "پاییز" }, { label: "مهر", say: "مهر" }],
            [{ pic: "❄️", say: "زمستان" }, { label: "دی", say: "دی" }]
          ] },
        { type: "sort", prompt: "همه خانواده‌ها یا بعضی؟", say: "این در همه خانواده‌ها هست، یا فقط در بعضی؟",
          baskets: [{ pic: "🤝", label: "همه خانواده‌ها", value: "all" }, { pic: "🌈", label: "بعضی خانواده‌ها", value: "some" }],
          items: [
            { pic: "💛", say: "همدیگر را دوست دارند", basket: "all" },
            { pic: "🤗", say: "به هم کمک می‌کنند", basket: "all" },
            { pic: "🏢", say: "در آپارتمان زندگی می‌کنند", basket: "some" },
            { pic: "👴", say: "پدربزرگ با آن‌ها زندگی می‌کند", basket: "some" },
            { pic: "👯", say: "دوقلو دارند", basket: "some" }
          ] }
      ]
    },


    /* Sources: city and rural life as part of "people, places and environments" (NCSS C3 D2.Geo.2–3.K–2: how places
       differ and how people use them); Iran's first-grade social studies theme «شهر و روستا». Today about three in four
       people in Iran live in cities (Statistical Centre of Iran, census 1395). Village in Kurdistan (Hawraman-style
       terraced village), city: Mashhad (metro since 1390). Similarities first, then differences; no village shown as
       poor or backward. Teacher review: whether the village details fit villages in other regions too. */
    {
      id: "world-sprout-1", subject: "world", level: "sprout", emoji: "🏘️", title: "شهر و روستا",
      steps: [
        { type: "scene", prompt: "نیلوفر در شهر زندگی می‌کند", bg: "#cdeaf7",
          parts: {
            street: { art: "w-street" }, street2: { art: "w-street", at: [440, 0] },
            f2: { art: "w-flats2", at: [24, 64], s: 1.1 }, flats: { art: "w-flats-home", at: [62, 64] }, f3: { art: "w-flats3", at: [100, 64], s: 1.2 },
            f4: { art: "w-flats2", at: [-14, 64], s: 0.9 }, f5: { art: "w-flats3", at: [126, 64] },
            shop1: { art: "w-shop1", at: [152, 64], s: 1.2 }, shop2: { art: "w-shop2", at: [190, 64], s: 1.2 }, light: { art: "w-light", at: [214, 74] },
            school: { art: "w-school", at: [300, 64], s: 1.25 }, park: { art: "w-park", at: [380, 64], s: 1.3 },
            carA: { art: "w-car-blue", at: [330, 86] }, carB: { art: "w-car-green", at: [362, 86] },
            map: { art: "w-map-mashhad", at: [118, 20], s: 0.7 },
            girl: { art: "w-girl4", at: [60, 71], s: 1.05 }, girlB: { art: "w-girl4-bag", at: [252, 71], s: 1.05, o: 0 },
            friend: { art: "w-boy2", at: [404, 72], s: 1.05 }, ball: { art: "w-ball", at: [370, 72], o: 0 },
            sky3: { art: "w-sky", at: [520, -2] }, road3: { art: "w-road-top", at: [520, 0] }, tunnel: { art: "w-tunnel", at: [520, 0] },
            metro: { art: "w-metro", at: [740, 84], s: 0.9 }, bus: { art: "w-bus", at: [740, 49], s: 0.8 }
          },
          scenes: [
            { caption: "این نیلوفر است. در شهر مشهد زندگی می‌کند.", hold: 5000, do: D(
              [{ cam: { x: 60 }, dur: 1 }], wave("girl", 500, 1800), [pulse("map.dot", 2600, 2.2, 1000)]) },
            { caption: "خانه نیلوفر در یک ساختمان بلند است. شهر ساختمان‌های بلند زیادی دارد.", hold: 7600, do: D(
              hide(["map"], 0, 300), walk("girl", { x: 62, y: 64 }, 0, 900), hide(["girl"], 700, 300),
              [{ cam: { x: 72, y: 8, zoom: 2.2 }, at: 900, dur: 1800 }, { id: "flats.win", to: { o: 1 }, at: 2700, dur: 300 }, pulse("flats.win", 3000, 1.25),
                { cam: { x: 56, y: 26, zoom: 0.8 }, at: 4300, dur: 1800 },
                pulse("f2", 6200, 1.06), pulse("f3", 6400, 1.06), pulse("f4", 6600, 1.06), pulse("f5", 6800, 1.06)]) },
            { caption: "مادر نیلوفر راننده مترو است. پدرش راننده اتوبوس است.", key: 5200, hold: 7000, do: D(
              [{ cam: { x: 600, y: 45, zoom: 1 }, dur: 1 }, { id: "flats.win", to: { o: 0 }, dur: 1 },
                { id: "metro", to: { x: 598 }, at: 400, dur: 2600, ease: "out" }, { id: "metro.w1", to: { r: -720 }, at: 400, dur: 2600, ease: "out" }, { id: "metro.w2", to: { r: -720 }, at: 400, dur: 2600, ease: "out" },
                { id: "bus", to: { x: 590 }, at: 3400, dur: 2400, ease: "out" }, { id: "bus.w1", to: { r: -540 }, at: 3400, dur: 2400, ease: "out" }, { id: "bus.w2", to: { r: -540 }, at: 3400, dur: 2400, ease: "out" }]) },
            { caption: "در شهر مغازه‌های زیادی هست. ماشین‌ها پشت چراغ قرمز ایستاده‌اند.", key: 5600, hold: 7200, do: D(
              [{ cam: { x: 196, y: 45, zoom: 1 }, dur: 1 }, { id: "girl", to: { x: 204, y: 71, o: 1 }, dur: 1 },
                pulse("shop1", 600, 1.06), pulse("shop2", 1000, 1.06),
                { id: "carA", to: { x: 226 }, at: 2400, dur: 2600, ease: "out" }, { id: "carA.w1", to: { r: -720 }, at: 2400, dur: 2600, ease: "out" }, { id: "carA.w2", to: { r: -720 }, at: 2400, dur: 2600, ease: "out" },
                { id: "carB", to: { x: 254 }, at: 2800, dur: 2600, ease: "out" }, { id: "carB.w1", to: { r: -720 }, at: 2800, dur: 2600, ease: "out" }, { id: "carB.w2", to: { r: -720 }, at: 2800, dur: 2600, ease: "out" },
                pulse("light.red", 2400, 1.5, 600)]) },
            { caption: "صبح، نیلوفر پیاده به مدرسه می‌رود.", key: 2400, hold: 5200, do: D(
              hide(["girl"], 0, 300), show(["girlB"], 0, 300), [{ cam: { x: 270 }, dur: 600 }, { cam: { x: 296 }, at: 700, dur: 3200 }],
              walk("girlB", { x: 306 }, 700, 3200), [{ id: "girlB", to: { y: 64, o: 0 }, at: 4000, dur: 600 }]) },
            { caption: "عصر، نیلوفر در پارک توپ‌بازی می‌کند.", key: 2100, hold: 5600, do: D(
              [{ cam: { x: 386 }, dur: 1200 }, { id: "girl", to: { x: 366, y: 72, o: 1 }, dur: 1 }, { id: "ball", to: { x: 374, o: 1 }, at: 800, dur: 1 },
                { id: "girl.legR", to: { r: -40 }, at: 1400, dur: 250 }, { id: "girl.legR", to: { r: 0 }, at: 1650, dur: 300 },
                { id: "ball", path: "M374 72Q387 60 400 72", at: 1500, dur: 900 },
                { id: "friend.legL", to: { r: 40 }, at: 2600, dur: 250 }, { id: "friend.legL", to: { r: 0 }, at: 2850, dur: 300 },
                { id: "ball", path: "M400 72Q387 58 374 72", at: 2700, dur: 900 },
                { id: "girl.legR", to: { r: -40 }, at: 3700, dur: 250 }, { id: "girl.legR", to: { r: 0 }, at: 3950, dur: 300 },
                { id: "ball", path: "M374 72Q387 60 400 72", at: 3800, dur: 900 },
                { id: "girl.smile", to: { o: 0 }, at: 2000, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 2000, dur: 200 }]) }
          ] },
        { type: "scene", prompt: "ژیار در روستا زندگی می‌کند", bg: "#cdeaf7",
          parts: {
            village: { art: "w-village" }, map: { art: "w-map-kurdistan", at: [26, 20], s: 0.7 }, boy: { art: "w-zhiyar", at: [40, 86], s: 1.3 },
            yard: { art: "w-yard", o: 0 }, boyY: { art: "w-zhiyar", at: [52, 86], s: 1.3, o: 0 },
            field: { art: "w-field", o: 0 }, tractor: { art: "w-tractor", at: [190, 86], s: 1.6, o: 0 }, farmer: { art: "w-farmer-sit", under: "tractor", at: [3, -12], s: 0.55 },
            vpath: { art: "w-vpath", o: 0 }, saj: { art: "w-saj", at: [60, 76], s: 1.6, o: 0 }, breads: { art: "w-breads", at: [84, 76], s: 1.2, o: 0 },
            gran: { art: "w-gran2-sit", at: [40, 78], s: 1.2, o: 0 }, sheep: { art: "🐑", at: [118, 70], s: 0.7, o: 0 }, sheep2: { art: "🐑", at: [140, 76], s: 0.6, o: 0 }, cow: { art: "🐄", at: [104, 84], s: 0.95, o: 0 },
            vschool: { art: "w-vschool", at: [32, 74], s: 1.4, o: 0 }, k1: { art: "w-girl3-bag", at: [18, 78], s: 0.9, o: 0 }, k2: { art: "w-boy2-bag", at: [50, 78], s: 0.9, o: 0 },
            boyB: { art: "w-zhiyar-bag", at: [150, 80], s: 1.05, o: 0 },
            sV: { art: "w-split-village", o: 0 }, sC: { art: "w-split-city", o: 0 }, split: { art: "w-split", o: 0 },
            sch1: { art: "w-vschool", at: [24, 64], s: 0.8, o: 0 }, sch2: { art: "w-gate", at: [118, 68], s: 0.9, o: 0 },
            z2: { art: "w-zhiyar-bag", at: [62, 82], s: 0.95, o: 0 }, n2: { art: "w-girl4-bag", at: [146, 72], s: 0.95, o: 0 },
            zb: { art: "w-ball", at: [47, 84], o: 0 }, nb: { art: "w-ball", at: [133, 74], o: 0 }
          },
          scenes: [
            { caption: "این ژیار است. در یک روستا در کردستان زندگی می‌کند. روستا کنار کوه است.", hold: 7600, do: D(
              [{ cam: { x: 44, y: 66, zoom: 2 }, dur: 1 }], wave("boy", 400, 1800), [pulse("map.dot", 2600, 2.2, 1000),
                { cam: { x: 80, y: 45, zoom: 1 }, at: 3600, dur: 2400 }]) },
            { caption: "این خانه ژیار است. حیاطش درخت و گل دارد.", key: 3000, hold: 5600, do: D(
              hide(["village", "map", "boy"]), show(["yard", "boyY"], 0, 600), walk("boyY", { x: 100 }, 700, 2000),
              [{ id: "yard.crown", to: { r: 3 }, at: 600, dur: 4800, yoyo: true, times: 6 },
                { id: "yard.fl1", to: { r: 12 }, at: 600, dur: 4800, yoyo: true, times: 8 }, { id: "yard.fl2", to: { r: -12 }, at: 700, dur: 4800, yoyo: true, times: 8 },
                { id: "yard.fl3", to: { r: 12 }, at: 800, dur: 4800, yoyo: true, times: 8 }, { id: "yard.fl4", to: { r: -12 }, at: 900, dur: 4800, yoyo: true, times: 8 }],
              wave("boyY", 3000, 1600, "armR")) },
            { caption: "پدربزرگ ژیار کشاورز است. مزرعه گندم و تراکتور دارد.", key: 3600, hold: 6800, do: D(
              hide(["yard", "boyY"]), show(["field", "tractor"], 0, 600),
              [{ id: "field.ws1", to: { r: 2 }, dur: 6400, yoyo: true, times: 8 }, { id: "field.ws2", to: { r: -2 }, at: 200, dur: 6400, yoyo: true, times: 8 }, { id: "field.ws3", to: { r: 2 }, at: 400, dur: 6400, yoyo: true, times: 8 },
                { id: "tractor", to: { x: 80 }, at: 600, dur: 4400, ease: "out" }, { id: "tractor.wb", to: { r: -900 }, at: 600, dur: 4400, ease: "out" }, { id: "tractor.wf", to: { r: -1400 }, at: 600, dur: 4400, ease: "out" },
                { id: "farmer.armR", to: { r: -150 }, at: 5000, dur: 400 }, { id: "farmer.armR", to: { r: -125 }, at: 5400, dur: 1000, yoyo: true, times: 4 }]) },
            { caption: "مادربزرگ نان تازه پخته است. آن‌ها گوسفند و گاو هم دارند.", key: 2600, hold: 6400, do: D(
              hide(["field", "tractor"]), show(["vpath", "saj", "breads", "gran", "sheep", "sheep2", "cow"], 0, 600),
              [{ id: "saj.fire", to: { sy: 1.25 }, dur: 6000, yoyo: true, times: 12 },
                { id: "gran.armR", to: { r: -70 }, at: 900, dur: 500 }, { id: "saj.bread", path: "M0 0Q8 -10 14 0", at: 1400, dur: 900 },
                { id: "gran.armR", to: { r: 0 }, at: 2400, dur: 500 },
                { emit: "bubble", where: [84, 70], spread: [8, 2], n: 8, rise: -9, at: 2000, dur: 2400 },
                { id: "sheep", to: { x: 110 }, at: 2400, dur: 2600 }, { id: "sheep", to: { r: 8 }, at: 3000, dur: 1600, yoyo: true, times: 4 },
                { id: "cow", to: { r: -6 }, at: 3600, dur: 2000, yoyo: true, times: 4 }, { id: "sheep2", to: { r: -8 }, at: 3200, dur: 1600, yoyo: true, times: 4 }]) },
            { caption: "ژیار پیاده به مدرسه روستا می‌رود. مدرسه‌شان کوچک است.", key: 3200, hold: 6000, do: D(
              hide(["saj", "breads", "gran", "sheep", "sheep2", "cow"]), show(["vschool", "k1", "k2", "boyB"], 0, 600),
              walk("boyB", { x: 66 }, 600, 3200), wave("k1", 3400, 1600), wave("k2", 3600, 1600, "armL"), wave("boyB", 3900, 1600)) },
            { caption: "نیلوفر در شهر است و ژیار در روستا. هر دو مدرسه می‌روند و هر دو توپ‌بازی را دوست دارند.", key: 6800, hold: 9600, do: D(
              hide(["vpath", "vschool", "k1", "k2", "boyB"]), show(["sV", "sC", "split", "sch1", "sch2", "z2", "n2"], 0, 600),
              walk("z2", { x: 34 }, 800, 2400), walk("n2", { x: 120 }, 800, 2400),
              [{ id: "z2", to: { o: 0 }, at: 3300, dur: 300 }, { id: "n2", to: { o: 0 }, at: 3300, dur: 300 },
                { id: "z2", to: { x: 54, y: 84 }, at: 3700, dur: 1 }, { id: "n2", to: { x: 140, y: 74 }, at: 3700, dur: 1 },
                { id: "z2", to: { o: 1 }, at: 4200, dur: 300 }, { id: "n2", to: { o: 1 }, at: 4200, dur: 300 }, { id: "zb", to: { o: 1 }, at: 4200, dur: 300 }, { id: "nb", to: { o: 1 }, at: 4200, dur: 300 },
                { id: "z2.legL", to: { r: 40 }, at: 5000, dur: 250 }, { id: "z2.legL", to: { r: 0 }, at: 5250, dur: 300 }, { id: "zb", path: "M47 84Q32 66 16 84", at: 5100, dur: 1000 },
                { id: "n2.legL", to: { r: 40 }, at: 5400, dur: 250 }, { id: "n2.legL", to: { r: 0 }, at: 5650, dur: 300 }, { id: "nb", path: "M133 74Q116 58 98 74", at: 5500, dur: 1000 },
                { id: "z2.smile", to: { o: 0 }, at: 6000, dur: 200 }, { id: "z2.laugh", to: { o: 1 }, at: 6000, dur: 200 }, { id: "n2.smile", to: { o: 0 }, at: 6200, dur: 200 }, { id: "n2.laugh", to: { o: 1 }, at: 6200, dur: 200 }]) }
          ],
          question: "پدربزرگ ژیار چه کاری می‌کند؟", pic: true,
          options: [{ label: "🚌", value: "راننده اتوبوس" }, { label: "🌾", value: "کشاورز" }, { label: "🏪", value: "مغازه‌دار" }], answer: "کشاورز" },
        { type: "sort", prompt: "شهر، روستا یا هر دو؟",
          say: "این‌ها را بیشتر کجا می‌بینیم؟ در شهر، در روستا، یا در هر دو؟",
          baskets: [{ pic: "🏙️", label: "شهر", value: "city" }, { pic: "🏡", label: "روستا", value: "village" }, { pic: "🤝", label: "هر دو", value: "both" }],
          items: [
            { pic: "🚇", say: "مترو", basket: "city" },
            { pic: "🏢", say: "ساختمان خیلی بلند", basket: "city" },
            { pic: "🌾", say: "مزرعه گندم", basket: "village" },
            { pic: "🐑", say: "گله گوسفند", basket: "village" },
            { pic: "🏫", say: "مدرسه", basket: "both" },
            { pic: "🫓", say: "نان تازه", basket: "both" }
          ] },
        { type: "pairs", prompt: "هر کس با چه کار می‌کند؟", say: "هر کس با چه چیزی کار می‌کند؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "🧑‍🌾", say: "کشاورز" }, { pic: "🚜", say: "تراکتور" }],
            [{ pic: "👨", say: "راننده اتوبوس" }, { pic: "🚌", say: "اتوبوس" }],
            [{ pic: "👵", say: "نانوا" }, { pic: "🫓", say: "نان" }],
            [{ pic: "🧒", say: "چوپان" }, { pic: "🐑", say: "گوسفند" }]
          ] },
        { type: "talk", scene: "🏙️ 🏡 🚇 🌾", caption: "تو در شهر زندگی می‌کنی یا روستا؟ چه چیزی در جای زندگی‌ات دوست داری؟ دوست داری یک روز کجا بروی؟" }
      ]
    },

    /* Sources: nomads of Iran (Encyclopaedia Iranica, "Qašqāʾi", "Baḵtiāri", "Šāhsevan"; Statistical Centre of Iran,
       nomad census 1387); seasonal migration between summer pastures (ییلاق) and winter pastures (قشلاق); black tents of
       goat hair (سیاه‌چادر); gabbeh weaving, UNESCO-listed «هنر قالی‌بافی فارس» (2010); nomad schools, often in tents
       (مدارس عشایری). Shown as a way of life today, not as poor or old-fashioned. */
    {
      id: "world-sprout-13", subject: "world", level: "sprout", emoji: "⛺", title: "زندگی عشایر",
      steps: [
        { type: "scene", prompt: "خانواده آرمان کوچ می‌کنند", bg: "#cdeaf7",
          parts: {
            map: { art: "w-map-big", at: [80, 46] },
            q1: { art: "w-dot", at: [73.5, 58], s: 1.3, o: 0 }, q2: { art: "w-dot", at: [67.3, 46], s: 1.3, o: 0 }, q3: { art: "w-dot", at: [58.9, 19.1], s: 1.3, o: 0 },
            m1: { art: "w-sky-hills", depth: 0, o: 0 }, m2: { art: "w-steppe", o: 0 },
            tent: { art: "w-black-tent", at: [64, 78], s: 1.1, o: 0 }, tent2: { art: "w-black-tent", at: [336, 78], s: 1.1, sy: 0.08, o: 0 },
            sh1: { art: "🐑", at: [112, 82], s: 0.5, o: 0 }, sh2: { art: "🐑", at: [124, 85], s: 0.5, o: 0 }, sh3: { art: "🐑", at: [136, 82], s: 0.5, o: 0 },
            mule: { art: "🐴", at: [100, 84], s: 0.75, o: 0 }, m3: { art: "w-box", under: "mule", at: [-2, -15], s: 0.45, o: 0 },
            dad: { art: "w-nomad-dad", at: [90, 86], s: 1.1, o: 0 }, armand: { art: "w-armand", at: [76, 87], s: 1, o: 0 },
            loom: { art: "w-loom", at: [380, 86], s: 1.2, o: 0 }, weaver: { art: "w-weaver", at: [406, 86], s: 1.1, o: 0 },
            st: { art: "w-black-tent", at: [430, 70], s: 0.8, o: 0 }, board: { art: "w-board", at: [446, 86], s: 0.9, o: 0 },
            k1: { art: "w-girl2-sit", at: [418, 86], s: 0.9, o: 0 }, k2: { art: "w-boy3-sit", at: [432, 86], s: 0.9, o: 0 }
          },
          scenes: [
            { caption: "بعضی خانواده‌های ایران عشایرند. با گله‌هایشان کوچ می‌کنند: قشقایی‌ها، بختیاری‌ها، شاهسون‌ها و خیلی‌های دیگر.", key: 6000, hold: 7600, do: D(
              show(["q1"], 2400, 400), [pulse("q1", 2800, 1.7)], show(["q2"], 3600, 400), [pulse("q2", 4000, 1.7)], show(["q3"], 4800, 400), [pulse("q3", 5200, 1.7)]) },
            { caption: "تابستان، کوهستان خنک است و علف زیادی دارد. خانواده آرمان آنجا چادر زده‌اند.", key: 4400, hold: 6000, do: D(
              hide(["map", "q1", "q2", "q3"]), show(["m1", "m2", "m3", "tent", "sh1", "sh2", "sh3", "mule", "dad", "armand"], 300, 800),
              [{ id: "sh1", to: { r: 15 }, at: 1400, dur: 3000, yoyo: true, times: 6 }, { id: "sh3", to: { r: -15 }, at: 1600, dur: 3000, yoyo: true, times: 6 }],
              wave("armand", 2400, 1600)) },
            { caption: "پاییز که هوا سرد می‌شود، چادر را جمع می‌کنند، بار را روی قاطر می‌گذارند و به دشت‌های گرم‌تر کوچ می‌کنند.", key: 6800, hold: 9800, do: D(
              [{ id: "tent", to: { sy: 0.08 }, dur: 1400 }, { id: "tent", to: { o: 0 }, at: 1300, dur: 300 }],
              walk("dad", { x: 330 }, 1800, 7000), walk("armand", { x: 316 }, 1900, 7000),
              [{ id: "mule", to: { x: 340 }, at: 1800, dur: 7000, ease: "linear" }, { id: "sh1", to: { x: 352 }, at: 1800, dur: 7000, ease: "linear" },
                { id: "sh2", to: { x: 364 }, at: 1800, dur: 7000, ease: "linear" }, { id: "sh3", to: { x: 376 }, at: 1800, dur: 7000, ease: "linear" },
                { cam: { x: 320 }, at: 1800, dur: 7000, ease: "linear" }]) },
            { caption: "در دشت، چادر سیاه را دوباره برپا می‌کنند. چادر از موی بز بافته شده است.", key: 3800, hold: 5400, do: [
              { id: "tent2", to: { o: 1 }, dur: 300 }, { id: "tent2", to: { sy: 1.1 }, at: 300, dur: 2400, ease: "back" }, { id: "dad.armL", to: { r: 140 }, at: 300, dur: 2400, yoyo: true, times: 2 }] },
            { caption: "مادر آرمان گبه می‌بافد: فرشی ضخیم و رنگی.", key: 5000, hold: 6400, do: D(
              [{ cam: { x: 400 }, dur: 1600 }], show(["loom", "weaver"], 0, 600),
              [{ id: "loom.rug", to: { sy: 0.2 }, dur: 1 }, { id: "loom.rug", to: { sy: 1 }, at: 1800, dur: 3600 },
                { id: "weaver.armL", to: { r: 100 }, at: 1800, dur: 3600, yoyo: true, times: 10 }]) },
            { caption: "بچه‌های عشایر هم مدرسه دارند. گاهی کلاسشان یک چادر است!", key: 3600, hold: 5400, do: D(
              hide(["loom", "weaver"]), show(["st", "board", "k1", "k2"], 300, 600),
              [{ id: "k1.armR", to: { r: -150 }, at: 1800, dur: 400 }, { id: "k1.armR", to: { r: 0 }, at: 3600, dur: 400 }]) }
          ],
          question: "چرا عشایر کوچ می‌کنند؟", pic: true,
          options: [{ label: "🌿", value: "تا گله‌ها همیشه علف و هوای خوب داشته باشند" }, { label: "🎒", value: "تا به مدرسه بروند" }, { label: "🛍️", value: "تا خرید کنند" }],
          answer: "تا گله‌ها همیشه علف و هوای خوب داشته باشند" },
        { type: "sort", prompt: "شهر، روستا یا عشایر؟", say: "این بیشتر کجاست: در شهر، در روستا، یا با عشایر؟",
          baskets: [{ pic: "🏙️", label: "شهر", value: "city" }, { pic: "🌾", label: "روستا", value: "village" }, { pic: "⛺", label: "عشایر", value: "nomads" }],
          items: [
            { pic: "🏢", say: "آپارتمان‌های بلند", basket: "city" },
            { pic: "🚇", say: "مترو", basket: "city" },
            { pic: "🚜", say: "مزرعه کنار خانه", basket: "village" },
            { pic: "⛲", say: "چشمه ده", basket: "village" },
            { pic: "🐑", say: "کوچ با گله", basket: "nomads" },
            { pic: "⛺", say: "چادر سیاه", basket: "nomads" }
          ] },
        { type: "sort", prompt: "ییلاق یا قشلاق؟", say: "ییلاق جای تابستان عشایر است، در کوهستان خنک. قشلاق جای زمستان است، در دشت گرم. هر کدام کجاست؟",
          baskets: [{ pic: "⛰️", label: "ییلاق", value: "summer" }, { pic: "🏜️", label: "قشلاق", value: "winter" }],
          items: [
            { pic: "☀️", say: "تابستان", basket: "summer" },
            { pic: "🌿", say: "کوهستان خنک", basket: "summer" },
            { pic: "❄️", say: "زمستان", basket: "winter" },
            { pic: "🌴", say: "دشت گرم", basket: "winter" }
          ] },
        { type: "talk", scene: "⛺ 🐑 🐴 🧶", caption: "اگر با عشایر کوچ می‌کردی، چه چیزی را با خودت می‌بردی؟ زندگی در چادر چه فرقی با خانه تو دارد؟" },
        home({ pic: "🧶 ✂️", text: "یک گبه کاغذی ببافید!",
          need: ["دو برگ کاغذ رنگی", "قیچی (دست بزرگ‌تر)", "چسب"],
          steps: [
            "یک کاغذ را تا کنید و از وسطش چند برش موازی بزنید (لبه‌ها بریده نشود). این «دار» شماست.",
            "کاغذ دیگر را نوار نوار کنید.",
            "نوارها را یکی از رو، یکی از زیر، از میان برش‌ها رد کنید. آخر کار سرشان را بچسبانید.",
            "بپرسید: «عشایر با چه چیزی گبه می‌بافند؟» (پشم گوسفند)"
          ],
          ask: "گبه تو چه رنگ‌هایی دارد؟" })
      ]
    },

    /* Sources: homes and climate in Iran (Iran's third-grade social studies, lessons 14–16 «خانه‌ها»; Pirnia,
       «سبک‌شناسی معماری ایرانی»). Yazd: mud brick and windcatchers, UNESCO "Historic City of Yazd" (2017). Gilan: heavy
       rain, steep roofs (once thatch, now often metal), houses raised on a base. Masuleh: stepped houses where a roof is
       the yard of the house above. Kandovan: homes cut into cones of volcanic rock from Mount Sahand. Teacher review:
       the Masuleh picture reuses the stepped-village drawing. */
    {
      id: "world-sprout-14", subject: "world", level: "sprout", emoji: "🏡", title: "خانه‌ها با هم فرق دارند",
      steps: [
        { type: "scene", prompt: "خانه‌های ایران", bg: "#cdeaf7",
          parts: {
            dry: { art: "w-dry" }, sun: { art: "w-sun", at: [136, 18] }, yazd: { art: "w-yazd-house", at: [80, 80], s: 1.3 }, wind: { art: "w-wind-in", at: [56.6, 12.4], s: 1.3, o: 0 },
            mapY: { art: "w-map-yazd", at: [28, 22], s: 0.7 },
            rain: { art: "w-rain-sky", o: 0 }, gilan: { art: "w-gilan-house", at: [80, 82], s: 1.3, o: 0 }, mapG: { art: "w-map-rasht", at: [28, 22], s: 0.7, o: 0 },
            vil: { art: "w-village", o: 0 }, mapM: { art: "w-map-masuleh", at: [136, 22], s: 0.7, o: 0 }, kid: { art: "w-boy4", at: [60, 50], s: 0.5, o: 0 },
            rock: { art: "w-meadow", o: 0 }, kand: { art: "w-kandovan", at: [80, 82], s: 1.6, o: 0 }, mapK: { art: "w-map-tabriz", at: [136, 22], s: 0.7, o: 0 },
            map: { art: "w-map-big", at: [80, 46], o: 0 },
            t1: { art: "w-yazd-house", at: [80.5, 47.9], s: 0.22, o: 0 }, t2: { art: "w-gilan-house", at: [63.4, 23.7], s: 0.22, o: 0 },
            t3: { art: "w-kandovan", at: [48, 20], s: 0.2, o: 0 }
          },
          scenes: [
            { caption: "در یزد، هوا گرم و خشک است. خانه‌ها خشتی‌اند، دیوارهای کلفت دارند و بادگیر. بادگیر باد خنک را به خانه می‌آورد.", key: 6400, hold: 7800, do: D(
              [pulse("mapY.dot", 800, 2.2, 1000), { id: "sun.rays", to: { r: 180 }, dur: 7600, ease: "linear" }, pulse("yazd", 2400, 1.06, 900),
                { id: "wind", to: { o: 1 }, at: 4200, dur: 100 }, { id: "wind", draw: true, at: 4200, dur: 2400 }]) },
            { caption: "در گیلان، باران زیاد می‌بارد. سقف خانه‌ها شیب‌دار است تا آب باران زود پایین برود.", key: 4800, hold: 6800, do: D(
              hide(["dry", "sun", "yazd", "wind", "mapY"]), show(["rain", "gilan", "mapG"], 0, 700), [pulse("mapG.dot", 1200, 2.2, 1000)],
              [{ emit: "drop", where: [80, 6], spread: [120, 4], rise: -50, n: 50, at: 1000, dur: 5400, life: 1200 },
                { emit: "drop", where: [62, 34], spread: [20, 6], rise: -16, n: 16, at: 2200, dur: 4000, life: 900 }, { emit: "drop", where: [100, 34], spread: [20, 6], rise: -16, n: 16, at: 2200, dur: 4000, life: 900 }]) },
            { caption: "در ماسوله، خانه‌ها روی کوه، پله‌پله ساخته شده‌اند. پشت‌بام هر خانه، حیاط خانه بالایی است!", key: 4400, hold: 6400, do: D(
              hide(["rain", "gilan", "mapG"]), show(["vil", "mapM", "kid"], 0, 700), [pulse("mapM.dot", 1200, 2.2, 1000)],
              walk("kid", { x: 84 }, 2000, 3000)) },
            { caption: "در کندوان، نزدیک تبریز، خانه‌ها را در دل سنگ کنده‌اند. این سنگ‌ها از آتشفشان قدیمی کوه سهند است.", key: 4000, hold: 6800, do: D(
              hide(["vil", "mapM", "kid"]), show(["rock", "kand", "mapK"], 0, 700), [pulse("mapK.dot", 1200, 2.2, 1000), pulse("kand", 2600, 1.06, 900)]) },
            { caption: "هر خانه برای هوا و زمین جای خودش ساخته شده است.", key: 4400, hold: 6000, do: D(
              hide(["rock", "kand", "mapK"]), show(["map"], 300, 700),
              show(["t1"], 1400, 400), show(["t2"], 2200, 400), show(["t3"], 3000, 400)) }
          ],
          question: "چرا سقف خانه‌های گیلان شیب دارد؟", pic: true,
          options: [{ label: "☀️", value: "چون آفتاب زیاد است" }, { label: "🌧️", value: "چون باران زیاد می‌بارد" }, { label: "🌬️", value: "برای بادگیر" }], answer: "چون باران زیاد می‌بارد" },
        { type: "pairs", prompt: "هر خانه کجاست؟", say: "هر خانه را با جایش جفت کن. روی کارت‌ها بزن تا بشنوی.",
          pairs: [
            [{ pic: "🏠", say: "خانه خشتی با بادگیر" }, { pic: "☀️", say: "یزد، گرم و خشک" }],
            [{ pic: "🏡", say: "خانه با سقف شیب‌دار" }, { pic: "🌧️", say: "گیلان، باران زیاد" }],
            [{ pic: "🏘️", say: "خانه‌های پله‌پله" }, { pic: "⛰️", say: "ماسوله، روی کوه" }],
            [{ pic: "🪨", say: "خانه در دل سنگ" }, { pic: "🌋", say: "کندوان، کنار کوه سهند" }]
          ] },
        { type: "pairs", hidden: true, prompt: "جفت‌ها را پیدا کن", say: "کارت‌ها را برگردان و جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "🏠", say: "خانه یزدی" }, { pic: "🏠", say: "خانه یزدی" }],
            [{ pic: "🏡", say: "خانه گیلانی" }, { pic: "🏡", say: "خانه گیلانی" }],
            [{ pic: "🏘️", say: "ماسوله" }, { pic: "🏘️", say: "ماسوله" }],
            [{ pic: "🪨", say: "کندوان" }, { pic: "🪨", say: "کندوان" }]
          ] },
        home({ pic: "🖍️ 🏠", text: "خانه‌تان را نقاشی کن!",
          need: ["کاغذ و مداد رنگی"],
          steps: [
            "کودک خانه یا ساختمانی را که در آن زندگی می‌کنید بکشد: سقف، پنجره، در.",
            "بپرسید: «سقف خانه ما صافه یا شیب‌دار؟ چرا؟»، «خانه ما از چی ساخته شده؟»",
            "اگر از شهر دیگری آمده‌اید یا سفر رفته‌اید، از خانه‌های آنجا بگویید."
          ],
          ask: "اگر در گیلان زندگی می‌کردی، سقف خانه‌ات چه شکلی بود؟" })
      ]
    },

    /* Sources: from a picture to a map, map symbols and the legend (Bishop, "Learning to read maps"; NCSS C3
       D2.Geo.1.K–2: maps, symbols and keys; Iran's second-grade social studies, «نقشه و نشانه‌ها»). The same village is
       shown as a picture and as a symbol map (B.MAPS.village and villageKey), so the symbols stand for things the child
       has just seen. خانه بهداشت: the health house of Iranian villages. */
    {
      id: "world-sprout-2", subject: "world", level: "sprout", emoji: "🗺️", title: "نقشه چیست؟",
      steps: [
        { type: "scene", prompt: "از عکس تا نقشه", bg: "#cdeaf7",
          parts: {
            side: { art: "w-vside" }, sHome: { art: "w-vside-home", at: [40, 58], s: 1.3 }, sTrees: { art: "w-vside-trees", at: [70, 60], s: 1.3 },
            sSchool: { art: "w-vside-school", at: [104, 60], s: 1.2 }, sSpring: { art: "w-vside-spring", at: [134, 66], s: 1.3 },
            girl: { art: "w-girl3", at: [22, 86], s: 1.2 },
            top: { art: "w-vtop", o: 0 }, tHome: { art: "w-vtop-home", at: [43.6, 25.4], o: 0 }, tTrees: { art: "w-vtop-trees", at: [40.8, 66.3], o: 0 },
            tSchool: { art: "w-vtop-school", at: [91.2, 59], o: 0 }, tSpring: { art: "w-vtop-spring", at: [113, 53.4], o: 0 },
            yHome: { art: "w-sym-home", at: [43.6, 25.4], o: 0 }, yTrees: { art: "w-sym-trees", at: [40.8, 66.3], o: 0 },
            ySchool: { art: "w-sym-school", at: [91.2, 59], o: 0 }, ySpring: { art: "w-sym-spring", at: [113, 53.4], o: 0 },
            pencil: { art: "pencil", at: [40.2, 22], o: 0 }, legend: { art: "w-legend", at: [-30, 0] },
            girl2: { art: "w-girl3", at: [148, 88], s: 0.8, o: 0 }, finger: { art: "w-point", at: [9, 54], o: 0 }
          },
          scenes: [
            { caption: "این ستاره است. در یک روستا زندگی می‌کند.", hold: 4400, do: D(wave("girl", 500, 1800)) },
            { caption: "در روستای ستاره خانه، باغ، مدرسه و چشمه هست.", key: 2000, hold: 5600, do: [
              pulse("sHome", 1300, 1.15), pulse("sTrees", 2000, 1.15), pulse("sSchool", 2700, 1.12), pulse("sSpring", 3500, 1.2)] },
            { caption: "اگر مثل یک پرنده از بالا نگاه کنیم، روستا این شکلی است.", key: 2600, hold: 6400, do: D(
              hide(["girl"], 0, 400),
              [{ id: "side", to: { o: 0 }, at: 1600, dur: 1200 }, { id: "top", to: { o: 1 }, at: 1600, dur: 1200 },
                { id: "sHome", to: { x: 43.6, y: 29, sy: 0.4, o: 0 }, at: 1400, dur: 1600 }, { id: "sTrees", to: { x: 40.8, y: 70, sy: 0.4, o: 0 }, at: 1400, dur: 1600 },
                { id: "sSchool", to: { x: 91.2, y: 63, sy: 0.4, o: 0 }, at: 1400, dur: 1600 }, { id: "sSpring", to: { x: 113, y: 56, sy: 0.4, o: 0 }, at: 1400, dur: 1600 }],
              show(["tHome", "tTrees", "tSchool", "tSpring"], 2400, 900)) },
            { caption: "کشیدن عکس هر خانه روی نقشه سخت است. برای همین روی نقشه به جای خانه، یک مربع قرمز می‌کشیم.", key: 6600, hold: 9000, do: D(
              [pulse("tHome", 1600, 1.4, 900), { id: "pencil", to: { o: 1 }, at: 5000, dur: 200 },
                { id: "yHome", to: { o: 1 }, at: 5100, dur: 100 }, { id: "yHome", draw: true, at: 5200, dur: 1800 },
                { id: "pencil", path: "M40.2 22H47V28.8H40.2V22", at: 5200, dur: 1800, ease: "linear" },
                { id: "tHome", to: { o: 0 }, at: 6400, dur: 600 }, { id: "pencil", to: { o: 0 }, at: 7200, dur: 300 }]) },
            { caption: "به جای درخت، دایره سبز. به جای مدرسه، ستاره. به جای آب، دایره آبی. به این‌ها «نشانه» می‌گوییم.", hold: 9600, do: [
              { id: "tTrees", to: { o: 0 }, at: 1000, dur: 700 }, { id: "yTrees", to: { o: 1 }, at: 1200, dur: 700 },
              { id: "tSchool", to: { o: 0 }, at: 3000, dur: 700 }, { id: "ySchool", to: { o: 1 }, at: 3200, dur: 700 },
              { id: "tSpring", to: { o: 0 }, at: 5000, dur: 700 }, { id: "ySpring", to: { o: 1 }, at: 5200, dur: 700 },
              pulse("yHome", 7200, 1.12), pulse("yTrees", 7400, 1.12), pulse("ySchool", 7600, 1.12), pulse("ySpring", 7800, 1.12)] },
            { caption: "کنار نقشه، «راهنمای نقشه» است. راهنما می‌گوید هر نشانه یعنی چه.", hold: 7600, do: [
              { id: "legend", to: { x: 0 }, dur: 1200, ease: "out" },
              { id: "finger", to: { o: 1 }, at: 3200, dur: 300 },
              { id: "finger", path: "M9 26L9 40L9 54L9 68", at: 3400, dur: 3200, ease: "linear" }, { id: "finger", to: { o: 0 }, at: 6800, dur: 300 }] },
            { caption: "ستاره با راهنما نقشه را می‌خواند: «این ستاره، مدرسه است!»", key: 4200, hold: 6800, do: D(
              show(["girl2"], 0, 500), [{ id: "finger", to: { x: 9, y: 54 }, dur: 1 }, { id: "finger", to: { o: 1 }, at: 600, dur: 300 },
                { id: "finger", path: "M9 54Q50 30 91 62", at: 1800, dur: 1800 },
                pulse("ySchool", 3700, 1.5, 900), { id: "tSchool", to: { o: 0.6 }, at: 3800, dur: 500 }, { id: "tSchool", to: { o: 0 }, at: 5400, dur: 500 }],
              talk("girl2", 3800, 1800)) }
          ] },
        { type: "map", map: "village", prompt: "این عکس روستای ستاره از بالاست. روی هر جا بزن تا اسمش را بشنوی." },
        { type: "map", map: "villageKey", say: "این نقشه همان روستاست، با نشانه‌ها. به راهنمای نقشه نگاه کن.",
          tasks: [
            { find: "school", prompt: "مدرسه کجاست؟ در راهنما ببین نشانه مدرسه چیست.", say: "مدرسه کجاست؟ نشانه مدرسه ستاره است." },
            { find: "spring", prompt: "چشمه کجاست؟", say: "چشمه کجاست؟ نشانه آب، دایره آبی است." },
            { find: "bakery", prompt: "نانوایی کجاست؟", say: "نانوایی کجاست؟ در راهنمای نقشه ببین نشانه نانوایی چیست." },
            { find: "clinic", prompt: "خانه بهداشت کجاست؟", say: "خانه بهداشت کجاست؟ به راهنمای نقشه نگاه کن." }
          ] },
        { type: "pairs", prompt: "هر چیز با نشانه‌اش", say: "هر چیز را با نشانه‌اش در نقشه جفت کن.",
          pairs: [
            [{ pic: "🏠", say: "خانه" }, { pic: "🟥", say: "مربع قرمز" }],
            [{ pic: "🌳", say: "درخت" }, { pic: "🟢", say: "دایره سبز" }],
            [{ pic: "🏫", say: "مدرسه" }, { pic: "⭐", say: "ستاره" }],
            [{ pic: "⛲", say: "چشمه" }, { pic: "🔵", say: "دایره آبی" }]
          ] },
        { type: "choose", prompt: "در نقشه ستاره، ➕ یعنی چه؟", say: "در نقشه ستاره، نشانه به‌علاوه یعنی چه؟", pic: true,
          options: [{ label: "🏫", value: "مدرسه" }, { label: "🏥", value: "خانه بهداشت" }, { label: "🫓", value: "نانوایی" }], answer: "خانه بهداشت" },
        home({ pic: "🖍️ 🗺️", text: "نقشه کوچه‌تان را با نشانه بکش!",
          need: ["کاغذ", "مداد رنگی"],
          steps: [
            "با کودک در کوچه یا حیاط قدم بزنید و ببینید چه چیزهایی هست: خانه، درخت، مغازه، تیر چراغ برق.",
            "در خانه، کودک برای هر چیز یک نشانه ساده انتخاب کند: مثلاً دایره سبز برای درخت.",
            "نقشه را بکشد و گوشه کاغذ «راهنمای نقشه» را بنویسید: کنار هر نشانه، معنی‌اش.",
            "از کس دیگری در خانه بخواهید با راهنما نقشه را بخواند و بگوید درخت‌ها کجا هستند."
          ],
          ask: "چرا روی نقشه نشانه می‌کشیم و عکس نمی‌کشیم؟" })
      ]
    },

    /* Sources: cardinal directions and the sun (NCSS C3 D2.Geo.1.K–2; Iran's second-grade social studies, «جهت‌ها»).
       The sun rises in the east and sets in the west; at noon it is in the south everywhere in Iran, since all of Iran
       is north of the Tropic of Cancer (Iran's southern tip is about 25° N; the tropic is 23.4° N). A compass needle
       points north. On maps north is at the top and east on the right, so the compass step keeps that layout.
       Teacher review: the right-hand rule («رو به شمال، شرق دست راست») as it is taught in Iranian schools. */
    {
      id: "world-sprout-3", subject: "world", level: "sprout", emoji: "🧭", title: "شمال، جنوب، شرق، غرب",
      steps: [
        { type: "scene", prompt: "خورشید از کدام طرف بالا می‌آید؟", bg: "#bfe3f5",
          /* Arash is seen from behind, facing north: east is on his right, as on a map. The sun rises on the right,
             is high (behind him, in the south) at noon and sets on the left; his shadow turns from west to north to east. */
          parts: {
            sky: { art: "w-sky" }, dawn: { art: "w-sky-dawn", o: 0.85 }, dusk: { art: "w-sky-dusk", o: 0 }, night: { art: "w-sky-night", o: 0 },
            stars: { art: "w-stars", o: 0 }, moon: { art: "w-moon", at: [124, 40], s: 1.2, o: 0 }, sun: { art: "w-sun", at: [146, 60], s: 1.1 },
            ground: { art: "w-ground" }, tree: { art: "🌳", at: [30, 76], s: 1.5 },
            shadow: { art: "w-shadow", at: [80, 84], r: 180, sx: 2.4 }, boy: { art: "w-arash-back", at: [80, 84], s: 1.35 },
            bE: { art: "w-label", at: [144, 46], o: 0 }, tE: { art: "شرق", at: [144, 47.6], s: 0.3, o: 0 },
            bW: { art: "w-label", at: [16, 46], o: 0 }, tW: { art: "غرب", at: [16, 47.6], s: 0.3, o: 0 },
            top: { art: "w-yard-top", o: 0 }, boyT: { art: "w-arash-top", at: [80, 45], s: 1.6, o: 0 },
            bN2: { art: "w-label", at: [80, 7], o: 0 }, tN2: { art: "شمال", at: [80, 8.6], s: 0.3, o: 0 },
            bS2: { art: "w-label", at: [80, 84], o: 0 }, tS2: { art: "جنوب", at: [80, 85.6], s: 0.3, o: 0 },
            bE2: { art: "w-label", at: [144, 45], o: 0 }, tE2: { art: "شرق", at: [144, 46.6], s: 0.3, o: 0 },
            bW2: { art: "w-label", at: [16, 45], o: 0 }, tW2: { art: "غرب", at: [16, 46.6], s: 0.3, o: 0 },
            compass: { art: "w-compass", at: [80, 46], s: 1.9, o: 0 }
          },
          scenes: [
            { caption: "صبح زود است. آرش در حیاط ایستاده. خورشید هنوز پایین است.", hold: 5600, do: [
              { id: "sun", to: { y: 57 }, dur: 2400 }, { id: "boy.head", to: { r: 8 }, at: 2600, dur: 900 }] },
            { caption: "خورشید از این طرف بالا می‌آید. به این طرف «شرق» می‌گوییم.", hold: 6400, do: [
              { id: "boy.head", to: { r: 0 }, dur: 400 },
              { id: "sun", path: "M146 57Q142 38 128 30", at: 300, dur: 2400 }, { id: "dawn", to: { o: 0 }, at: 300, dur: 2400 },
              { id: "shadow", to: { sx: 1.6 }, at: 300, dur: 2400 },
              { id: "boy.armR", to: { r: -115 }, at: 2900, dur: 600 }, { id: "bE", to: { o: 1 }, at: 3400, dur: 400 }, { id: "tE", to: { o: 1 }, at: 3400, dur: 400 },
              pulse("bE", 3900, 1.2), { id: "boy.armR", to: { r: 0 }, at: 5600, dur: 500 }] },
            { caption: "ظهر، خورشید بالای آسمان است.", hold: 4600, do: [
              { id: "bE", to: { o: 0 }, dur: 400 }, { id: "tE", to: { o: 0 }, dur: 400 },
              { id: "sun", path: "M128 30Q110 10 80 9", at: 300, dur: 2600 },
              { id: "shadow", to: { r: 270, sx: 0.6 }, at: 300, dur: 2600 }, { id: "boy.head", to: { r: -3 }, at: 3000, dur: 800, yoyo: true, times: 2 }] },
            { caption: "عصر، خورشید از آن طرف پایین می‌رود. به آن طرف «غرب» می‌گوییم.", hold: 6600, do: [
              { id: "sun", path: "M80 9Q42 10 30 36", at: 0, dur: 2600 }, { id: "dusk", to: { o: 0.8 }, at: 800, dur: 2000 },
              { id: "shadow", to: { r: 360, sx: 1.8 }, at: 0, dur: 2600 },
              { id: "boy.armL", to: { r: 115 }, at: 2900, dur: 600 }, { id: "bW", to: { o: 1 }, at: 3400, dur: 400 }, { id: "tW", to: { o: 1 }, at: 3400, dur: 400 },
              pulse("bW", 3900, 1.2), { id: "boy.armL", to: { r: 0 }, at: 5800, dur: 500 }] },
            { caption: "شب شد. خورشید رفت و ماه پیدا شد.", key: 3600, hold: 5600, do: [
              { id: "bW", to: { o: 0 }, dur: 400 }, { id: "tW", to: { o: 0 }, dur: 400 },
              { id: "sun", path: "M30 36Q24 50 18 68", dur: 1600, ease: "in" }, { id: "shadow", to: { o: 0, sx: 2.6 }, dur: 1400 },
              { id: "night", to: { o: 1 }, at: 1000, dur: 1600 }, { id: "stars", to: { o: 1 }, at: 1800, dur: 900 },
              { id: "moon", to: { o: 1 }, at: 2000, dur: 300 }, { id: "moon", path: "M124 40Q122 26 114 18", at: 2000, dur: 2200 },
              { id: "stars.s1", to: { s: 1.6 }, at: 3000, dur: 600, yoyo: true, times: 2 }, { id: "stars.s4", to: { s: 1.6 }, at: 3400, dur: 600, yoyo: true, times: 2 }] },
            { caption: "روی نقشه، شمال بالاست و جنوب پایین. شرق طرف راست است و غرب طرف چپ.", hold: 8000, do: D(
              show(["top", "boyT"], 0, 1200),
              show(["bN2", "tN2"], 1500, 400), [pulse("bN2", 1900, 1.2)], show(["bS2", "tS2"], 2700, 400), [pulse("bS2", 3100, 1.2)],
              show(["bE2", "tE2"], 4100, 400), [pulse("bE2", 4500, 1.2)], show(["bW2", "tW2"], 5400, 400), [pulse("bW2", 5800, 1.2)]) },
            { caption: "عقربه قطب‌نما همیشه به طرف شمال است.", key: 2000, hold: 6400, do: D(
              hide(["boyT", "bS2", "tS2", "bE2", "tE2", "bW2", "tW2"]), show(["compass"], 300, 500),
              [{ id: "compass.dial", to: { r: 60 }, at: 1000, dur: 1400 }, { id: "compass.needle", to: { r: 12 }, at: 1000, dur: 1400, yoyo: true, times: 4 },
                { id: "compass.dial", to: { r: -45 }, at: 2600, dur: 1600 }, { id: "compass.needle", to: { r: -10 }, at: 2600, dur: 1600, yoyo: true, times: 4 },
                { id: "compass.dial", to: { r: 0 }, at: 4400, dur: 1000 }, pulse("bN2", 5000, 1.2)]) }
          ] },
        { type: "compass", say: "بالای این تصویر شمال است، مثل نقشه.",
          tasks: [
            { face: "n", prompt: "رو به شمال بچرخ." },
            { face: "e", prompt: "حالا رو به شرق بچرخ." },
            { face: "s", prompt: "رو به جنوب بچرخ." },
            { face: "w", prompt: "رو به غرب بچرخ." }
          ] },
        { type: "compass",
          tasks: [
            { face: "e", sun: "rise", prompt: "صبح است و خورشید بالا می‌آید. رو به خورشید بچرخ!", say: "صبح است و خورشید بالا می‌آید. رو به خورشید بچرخ!" },
            { face: "s", sun: "noon", prompt: "ظهر است. خورشید کجاست؟ رو به آن بچرخ." },
            { face: "w", sun: "set", prompt: "عصر است و خورشید پایین می‌رود. رو به خورشید بچرخ." }
          ] },
        { type: "choose", prompt: "خورشید از کدام طرف بالا می‌آید؟", say: "صبح‌ها، خورشید از کدام طرف بالا می‌آید؟",
          options: ["شمال", "شرق", "غرب"], answer: "شرق" },
        { type: "compass", hide: true, say: "مثل قطب‌نما: فقط شمال را می‌دانیم.",
          tasks: [
            { face: "e", prompt: "شمال بالاست. شرق کجاست؟ رو به شرق بچرخ.", say: "شمال بالاست. شرق کجاست؟ یادت هست؟ رو به شمال، شرق دست راست است." },
            { face: "w", prompt: "حالا رو به غرب بچرخ." },
            { face: "s", prompt: "جنوب کجاست؟ رو به جنوب بچرخ." }
          ] },
        { type: "choose", prompt: "اگر رو به شمال بایستی، شرق کدام طرف است؟", say: "اگر رو به شمال بایستی، شرق کدام طرف است؟", pic: true,
          options: [{ label: "👈", value: "دست چپ" }, { label: "👉", value: "دست راست" }, { label: "🔙", value: "پشت سر" }], answer: "دست راست" },
        home({ pic: "☀️ 🧭", text: "در خانه شمال و جنوب و شرق و غرب را پیدا کن!",
          need: ["چهار کاغذ", "مداد", "نوار چسب"],
          steps: [
            "صبح با کودک از پنجره یا در حیاط ببینید خورشید از کدام طرف بالا آمده: آن طرف شرق است.",
            "روی چهار کاغذ بنویسید: شمال، جنوب، شرق، غرب. کودک کاغذ شرق را روی دیوار طرف خورشید بچسباند.",
            "رو به شمال بایستید (شرق دست راست است) و بقیه را با هم بچسبانید.",
            "بازی کنید: «رو به غرب بچرخ!»، «پنجره کدام طرف است؟» اگر قطب‌نما یا گوشی دارید، با قطب‌نمای آن هم امتحان کنید."
          ],
          ask: "عصر، خورشید از کدام پنجره خانه‌تان دیده می‌شود؟" })
      ]
    },

    /* Sources: the school as a community with places and roles (Iran's third-grade social studies, lessons 18–19
       «مدرسه»; NCSS C3 D2.Civ.2.K–2), and a school plan (Bishop: picture → plan). Roles of an Iranian primary school:
       مدیر، معلم، کتابدار، مربی ورزش، مراقب سلامت، نگهبان. Men and women in every role. */
    {
      id: "world-sprout-15", subject: "world", level: "sprout", emoji: "🏫", title: "مدرسه ما",
      steps: [
        { type: "scene", prompt: "دریا مدرسه را می‌گردد", bg: "#eef1e4",
          parts: {
            hall: { art: "w-corridor" },
            gate: { art: "🚪", at: [520, 62], s: 2.2 }, guard: { art: "👨", at: [498, 70], look: { top: "#2f6f9a", bottom: "#3d2c22" } },
            desk: { art: "w-desk2", at: [416, 62], s: 1.3 }, head: { art: "👩", at: [430, 62], s: 0.95, flip: true, look: { top: "#8a6cc4" } },
            board: { art: "w-blackboard", at: [320, 34], s: 1.1 }, teacher: { art: "👨‍🏫", at: [304, 62], s: 0.95 },
            shelves: { art: "w-shelves", at: [214, 62], s: 1.2 }, lib: { art: "🧍", at: [232, 62], s: 0.85, flip: true, look: { top: "#f59e0b", hair: "auto", kind: "woman", bottom: "dress" } },
            bed: { art: "w-bed2", at: [112, 62], s: 1.3 }, nurse: { art: "👨", at: [130, 62], s: 0.95, flip: true, look: { top: "#fffaf0", bottom: "#5b9bd5" } },
            coach: { art: "🏃", at: [20, 74], s: 0.9 }, kidY: { art: "🧒", at: [40, 76], flip: true }, ball: { art: "w-ball", at: [30, 64], s: 0.8 },
            mom: { art: "w-darya-mom", at: [578, 86], s: 1.2 }, darya: { art: "w-darya", at: [596, 87], s: 1.1 }
          },
          scenes: [
            { caption: "اولین روز مدرسه است. دریا و مادرش به در مدرسه رسیدند. نگهبان مدرسه سلام کرد.", key: 4200, hold: 6000, do: [
              { cam: { x: 540 }, dur: 1 }, { id: "mom", walk: [556, 86], at: 400, dur: 1800 }, { id: "darya", walk: [570, 87], at: 400, dur: 1800 },
              { id: "guard.armF", to: { r: -150 }, at: 2600, dur: 400 }, { id: "guard.armF", to: { r: -125 }, at: 3000, dur: 1400, yoyo: true, times: 4 }, { id: "guard.armF", to: { r: 0 }, at: 4500, dur: 400 }] },
            { caption: "این دفتر مدرسه است. خانم مدیر اینجا کار می‌کند.", key: 4600, hold: 6000, do: [
              { cam: { x: 440 }, dur: 3000, ease: "linear" }, { id: "mom", walk: [452, 86], dur: 3000 }, { id: "darya", walk: [466, 87], dur: 3000 },
              { id: "head.armF", to: { r: -150 }, at: 3400, dur: 400 }, { id: "head.armF", to: { r: -125 }, at: 3800, dur: 1200, yoyo: true, times: 4 }] },
            { caption: "این کلاس دریاست. آقای معلم روی تخته می‌نویسد.", key: 4400, hold: 6000, do: [
              { id: "head.armF", to: { r: 0 }, dur: 400 }, { cam: { x: 330 }, dur: 3000, ease: "linear" }, { id: "mom", walk: [346, 86], dur: 3000 }, { id: "darya", walk: [358, 87], dur: 3000 },
              { id: "teacher.armF", to: { r: -110 }, at: 3200, dur: 400 }, { id: "teacher.armF", to: { r: -95 }, at: 3600, dur: 2000, yoyo: true, times: 6 }] },
            { caption: "این کتابخانه است. کتابدار کتاب‌ها را مرتب می‌کند. بچه‌ها می‌توانند کتاب امانت بگیرند.", key: 4600, hold: 6400, do: [
              { id: "teacher.armF", to: { r: 0 }, dur: 400 }, { cam: { x: 230 }, dur: 3000, ease: "linear" }, { id: "mom", walk: [248, 86], dur: 3000 }, { id: "darya", walk: [260, 87], dur: 3000 },
              { id: "lib.armF", to: { r: -120 }, at: 3200, dur: 600 }, { id: "lib.armF", to: { r: 0 }, at: 4800, dur: 600 }] },
            { caption: "این اتاق بهداشت است. اگر حال کسی بد شود، مراقب سلامت به او کمک می‌کند.", key: 4400, hold: 6200, do: [
              { cam: { x: 130 }, dur: 3000, ease: "linear" }, { id: "mom", walk: [148, 86], dur: 3000 }, { id: "darya", walk: [160, 87], dur: 3000 },
              { id: "nurse.armF", to: { r: -70 }, at: 3400, dur: 600 }, { id: "nurse.armF", to: { r: 0 }, at: 5000, dur: 500 }] },
            { caption: "این حیاط مدرسه است. زنگ تفریح، بچه‌ها با مربی ورزش بازی می‌کنند.", key: 4600, hold: 6400, do: [
              { cam: { x: 50 }, dur: 3000, ease: "linear" }, { id: "darya", walk: [72, 87], dur: 3000 }, { id: "mom", walk: [92, 86], dur: 3000 },
              { id: "ball", path: "M30 64Q36 46 44 62", at: 3200, dur: 900 }, { id: "ball", path: "M44 62Q36 44 24 64", at: 4200, dur: 900 },
              { id: "coach.armF", to: { r: -80 }, at: 3000, dur: 300 }, { id: "coach.armF", to: { r: 0 }, at: 3400, dur: 300 }] }
          ] },
        { type: "map", map: "school", prompt: "این نقشه مدرسه دریاست، از بالا. روی هر جا بزن تا اسمش را بشنوی." },
        { type: "map", map: "school", say: "در نقشه مدرسه پیدا کن.",
          tasks: [
            { find: "class", prompt: "کلاس دریا کجاست؟" },
            { find: "office", prompt: "خانم مدیر کجا کار می‌کند؟" },
            { find: "library", prompt: "برای امانت گرفتن کتاب کجا برویم؟" },
            { find: "health", prompt: "اگر حالمان بد شد، کجا برویم؟" },
            { find: "yard", prompt: "زنگ تفریح کجا بازی می‌کنیم؟" }
          ] },
        { type: "pairs", prompt: "هر کس کجا کار می‌کند؟", say: "هر کس در مدرسه کجا کار می‌کند؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "👨‍🏫", say: "معلم" }, { pic: "✏️", say: "کلاس" }],
            [{ pic: "🧍‍♀️", say: "کتابدار" }, { pic: "📚", say: "کتابخانه" }],
            [{ pic: "🧑‍⚕️", say: "مراقب سلامت" }, { pic: "🩺", say: "اتاق بهداشت" }],
            [{ pic: "🏃", say: "مربی ورزش" }, { pic: "⚽", say: "حیاط مدرسه" }]
          ] },
        home({ pic: "🏫 🖍️", text: "نقشه مدرسه یا مهدت را بکش.",
          need: ["کاغذ و مداد رنگی"],
          steps: [
            "از کودک بخواهید جاهای مدرسه یا مهدکودکش را نام ببرد: کلاس، حیاط، دفتر، کتابخانه.",
            "با هم نقشه‌ای ساده از بالا بکشید و برای هر جا یک نشانه بگذارید.",
            "بپرسید: «آنجا چه کسی کار می‌کند؟ اگر کمک لازم داشتی، پیش چه کسی می‌روی؟»"
          ],
          ask: "در مدرسه یا مهد، کدام جا را از همه بیشتر دوست داری؟" })
      ]
    },

    /* Sources: an address from big to small (Iran's third-grade social studies, lesson 20 «نشانی»; NCSS C3
       D2.Geo.2.K–2). A made-up address in Tabriz. Safety: the child says their address only to a parent here; the
       lesson never asks for it to be typed or stored. */
    {
      id: "world-sprout-16", subject: "world", level: "sprout", emoji: "✉️", title: "نشانی خانه ما",
      steps: [
        { type: "scene", prompt: "نامه پدربزرگ به هستی", bg: "#cdeaf7",
          parts: {
            room: { art: "w-room2" }, gp: { art: "w-grandpa-sit", at: [100, 82], s: 1.25 }, env: { art: "w-envelope", at: [66, 72], s: 0.75 },
            map: { art: "w-map-big", at: [80, 46], o: 0 }, mapE: { art: "w-map-big-eaz", at: [80, 46], o: 0 }, dot: { art: "w-dot", at: [51.7, 19.6], s: 1.4, o: 0 },
            sky: { art: "w-skyband", o: 0 }, far: { art: "w-farline", o: 0 }, ground: { art: "w-street-ground", o: 0 },
            h1: { art: "w-flats2", at: [30, 64], o: 0 }, home: { art: "w-house", at: [80, 64], s: 1.3, o: 0 }, h3: { art: "w-shop1", at: [128, 64], s: 1.2, o: 0 },
            pole: { art: "w-sign-pole", at: [52, 66], o: 0 }, sign1: { art: "w-sign", at: [52, 34], s: 1.2, o: 0 }, st1: { art: "خیابان گلستان", at: [52, 36], s: 0.2, o: 0 },
            sign2: { art: "w-sign", at: [52, 47], s: 1.2, o: 0 }, st2: { art: "کوچه یاس", at: [52, 49], s: 0.2, o: 0 },
            plate: { art: "w-plate", at: [96, 46], s: 1.3, o: 0 }, num: { art: "۱۲", at: [96, 48], s: 0.26, o: 0 },
            postman: { art: "w-postman", at: [176, 72], s: 0.9, o: 0 }, hasti: { art: "w-hasti", at: [80, 74], s: 0.75, o: 0 }
          },
          scenes: [
            { caption: "پدربزرگ هستی در شیراز زندگی می‌کند. برای هستی نامه نوشت و روی پاکت، نشانی خانه هستی را نوشت.", key: 4000, hold: 6400, do: D(
              [{ id: "gp.armL", to: { r: 60 }, at: 600, dur: 500 }, { id: "gp.armL", to: { r: 45 }, at: 1100, dur: 2600, yoyo: true, times: 8 }, pulse("env", 4000, 1.2)]) },
            { caption: "نشانی را از بزرگ به کوچک می‌نویسیم. اول کشور: ایران.", key: 3000, hold: 5200, do: D(
              hide(["room", "gp", "env"]), show(["map"], 300, 700), [pulse("map", 1600, 1.05, 900)]) },
            { caption: "بعد استان و شهر: استان آذربایجان شرقی، شهر تبریز.", key: 3800, hold: 5600, do: D(
              show(["mapE"], 300, 800), show(["dot"], 1800, 400), [pulse("dot", 2200, 1.8, 900), pulse("dot", 3200, 1.8, 900)]) },
            { caption: "بعد خیابان و کوچه: خیابان گلستان، کوچه یاس.", key: 4200, hold: 6000, do: D(
              hide(["map", "mapE", "dot"]), show(["sky", "far", "ground", "h1", "home", "h3", "pole"], 300, 700),
              show(["sign1", "st1"], 1600, 400), [pulse("sign1", 2000, 1.15)], show(["sign2", "st2"], 3000, 400), [pulse("sign2", 3400, 1.15)]) },
            { caption: "آخر از همه، پلاک خانه: پلاک ۱۲.", key: 2400, hold: 4400, do: D(
              show(["plate", "num"], 500, 400), [pulse("plate", 1000, 1.4), pulse("num", 1000, 1.4)]) },
            { caption: "نامه‌رسان با این نشانی خانه را پیدا کرد. هستی نامه پدربزرگ را گرفت!", key: 5400, hold: 6800, do: D(
              show(["postman"], 0, 300), walk("postman", { x: 96 }, 300, 3200), show(["hasti"], 1800, 500),
              [{ id: "postman.armL", to: { r: 60 }, at: 3600, dur: 500 }, { id: "hasti.armR", to: { r: -60 }, at: 3800, dur: 500 },
                { id: "hasti.smile", to: { o: 0 }, at: 4400, dur: 200 }, { id: "hasti.laugh", to: { o: 1 }, at: 4400, dur: 200 }, { id: "hasti", to: { y: "-2" }, at: 4600, dur: 500, yoyo: true, times: 4 }]) }
          ] },
        { type: "order", prompt: "نشانی، از بزرگ به کوچک", say: "نشانی هستی را از بزرگ به کوچک بچین: کشور، استان، شهر، خیابان، کوچه، پلاک.", numbered: true,
          items: [{ pic: "🗺️", label: "ایران", say: "کشور: ایران" }, { label: "آذربایجان شرقی", say: "استان: آذربایجان شرقی" }, { pic: "🏘️", label: "تبریز", say: "شهر: تبریز" },
            { label: "خیابان گلستان", say: "خیابان: گلستان" }, { label: "کوچه یاس", say: "کوچه: یاس" }, { pic: "🏠", label: "پلاک ۱۲", say: "پلاک ۱۲" }] },
        { type: "order", prompt: "از کوچک به بزرگ", say: "حالا برعکس: از کوچک به بزرگ بچین. خانه، کوچه، شهر، کشور.", numbered: true,
          items: [{ pic: "🏠", say: "خانه" }, { pic: "🛣️", say: "کوچه و خیابان" }, { pic: "🏘️", say: "شهر" }, { pic: "🗺️", say: "کشور" }] },
        { type: "map", map: "village", say: "راه خانه تا مدرسه.",
          tasks: [{ route: ["home", "bakery", "school"], walker: "🧒",
            prompt: "از خانه ستاره شروع کن. از کنار نانوایی رد شو و برو مدرسه.",
            say: "از خانه ستاره شروع کن. از کنار نانوایی رد شو و برو مدرسه." }] },
        home({ pic: "🏠 🗣️", text: "نشانی خانه‌ات را یاد بگیر.",
          need: ["یک پاکت یا کارت (اگر خواستید)"],
          steps: [
            "نشانی خانه را از بزرگ به کوچک، آرام و تکه‌تکه با کودک تکرار کنید: کشور، استان، شهر، خیابان، کوچه، پلاک.",
            "این نشانی فقط برای شما و کودک است: آن را در هیچ برنامه یا سایتی ننویسید. به کودک بگویید نشانی را فقط به پدر و مادر، معلم یا پلیس بگوید.",
            "اگر خواستید، با هم برای یکی از اقوام کارتی بنویسید و نشانی را روی پاکت بنویسید."
          ],
          ask: "نشانی را از بزرگ به کوچک بگو: اول کشور، بعد…؟" })
      ]
    },

    /* Sources: fieldwork in the local area and a sketch map with a legend (England KS1 geography, "simple fieldwork …
       use and construct basic symbols in a key"; NCSS C3 D2.Geo.1.K–2; Bishop). B.MAPS.hood is a made-up
       neighbourhood; the child's own map is drawn on paper and never stored. */
    {
      id: "world-sprout-35", subject: "world", level: "sprout", emoji: "🗺️", title: "نقشه محله من",
      steps: [
        { type: "map", map: "hood", labels: true, enough: 6, prompt: "این نقشه محله نیماست، با نشانه‌ها. زیر نقشه، راهنمای نقشه را ببین. روی جاها بزن." },
        { type: "map", map: "hood", say: "با راهنمای نقشه پیدا کن.",
          tasks: [
            { find: "bakery", prompt: "در راهنما، نانوایی دایره زرد است. نانوایی کجاست؟" },
            { find: "school", prompt: "ستاره، نشانه مدرسه است. مدرسه کجاست؟" },
            { find: "clinic", prompt: "به‌علاوه، نشانه درمانگاه است. پیدایش کن." },
            { find: "bus", prompt: "لوزی آبی، ایستگاه اتوبوس است. کجاست؟" }
          ] },
        { type: "map", map: "hood", say: "راه را روی نقشه برو.",
          tasks: [{ route: ["home", "bus", "school"], walker: "🧒",
            prompt: "از خانه نیما شروع کن. برو ایستگاه اتوبوس، بعد مدرسه.",
            say: "از خانه نیما شروع کن. اول برو ایستگاه اتوبوس، بعد مدرسه." }] },
        home({ pic: "🚶 🗺️", text: "در محله قدم بزن و نقشه‌اش را بکش.",
          need: ["کاغذ و مداد رنگی", "یک تخته یا کتاب برای زیر کاغذ"],
          steps: [
            "با کودک در کوچه و محله قدم بزنید. هر جا را که می‌بینید یادداشت کنید: نانوایی، مدرسه، پارک، ایستگاه، درخت بزرگ.",
            "در خانه، خیابان‌ها را با دو خط بکشید. برای هر جا یک نشانه بگذارید: دایره، ستاره، مربع.",
            "پایین نقشه یک «راهنمای نقشه» بکشید: هر نشانه و معنی‌اش.",
            "راه خانه تا یک جای محله را با مداد قرمز روی نقشه بکشید."
          ],
          ask: "در راهنمای نقشه تو، ستاره نشانه چیست؟" }),
        { type: "forparents", guide: "offscreen", guideLabel: "یادگیری بیرون از صفحه، در راهنمای والدین",
          tips: [
            "نقشه کشیدن یک مهارت است: اول بگذارید هر طور دوست دارد بکشد، بعد با سؤال کمک کنید: «نانوایی کنار پارکه یا روبه‌رویش؟»",
            "هنگام قدم زدن، کلمه‌های جهت و جا را به کار ببرید: «روبه‌رو»، «کنار»، «سمت راست».",
            "نشانی و نقشه خانه را فقط روی کاغذ نگه دارید و در فضای مجازی منتشر نکنید."
          ] }
      ]
    },

    /* Sources: the map of Iran (js/maps/iran.js, from Natural Earth, public domain; de facto borders, Iran's 31
       provinces); seas named as in Iran's schools (دریای خزر، خلیج فارس، دریای عمان; Iran's third-grade social studies,
       «ایران، سرزمین ما»). The likeness of Iran's map to a sitting cat is a common Iranian classroom image. Cities are
       provincial centres from Natural Earth's populated places. Finding your own province is never stored, and a child
       abroad can find the province their family comes from. Teacher review: the clues for each city. */
    {
      id: "world-sprout-4", subject: "world", level: "sprout", emoji: "📍", title: "ایران روی نقشه",
      steps: [
        { type: "map", map: "iran", layers: ["iran", "seas"], labels: true,
          prompt: "این نقشه ایران است. شکلش را ببین: بعضی‌ها می‌گویند شبیه یک گربه نشسته است! روی ایران و دریاها بزن." },
        { type: "map", map: "iran", layers: ["iran", "seas"], say: "ایران دریا دارد: هم در شمال، هم در جنوب.",
          tasks: [
            { find: "caspian", prompt: "دریای خزر در شمال ایران است. پیدایش کن." },
            { find: "persian-gulf", prompt: "خلیج فارس در جنوب ایران است. پیدایش کن." },
            { find: "oman-sea", prompt: "دریای عمان هم در جنوب است، کنار خلیج فارس، طرف شرق. پیدایش کن." }
          ] },
        { type: "map", map: "iran", layers: ["seas"], cities: ["tehran", "tabriz", "mashhad", "rasht", "ahvaz", "shiraz", "isfahan", "zahedan"], labels: true,
          say: "این نقطه‌های قرمز چند شهر بزرگ ایران‌اند.",
          tasks: [
            { find: "tehran", prompt: "تهران، پایتخت ایران، کجاست؟", say: "تهران، پایتخت ایران، کجاست؟ کمی پایین‌تر از دریای خزر است." },
            { find: "rasht", prompt: "رشت کنار دریای خزر است. پیدایش کن." },
            { find: "ahvaz", prompt: "اهواز در جنوب غرب ایران است، نزدیک خلیج فارس. پیدایش کن." },
            { find: "mashhad", prompt: "مشهد در شمال شرق ایران است. پیدایش کن." }
          ] },
        { type: "map", map: "iran", layers: ["provinces"], enough: 5,
          prompt: "ایران ۳۱ استان دارد. روی چند استان بزن تا اسمش را بشنوی." },
        { type: "map", map: "iran", layers: ["provinces"],
          tasks: [
            { mine: true, prompt: "استان خودت را پیدا کن و رویش بزن.",
              say: "تو در کدام استان زندگی می‌کنی؟ پیدایش کن و رویش بزن. اگر نمی‌دانی، از پدر و مادرت بپرس. اگر در ایران زندگی نمی‌کنی، استانی را پیدا کن که خانواده‌ات از آنجا هستند." }
          ] },
        home({ pic: "🌍 🗺️", text: "ایران را روی کره زمین یا اطلس پیدا کن!",
          need: ["یک کره جغرافیایی، اطلس یا نقشه دیواری (یا نقشه‌ای در گوشی)"],
          steps: [
            "با کودک ایران را روی کره یا نقشه پیدا کنید. اول دریای خزر و خلیج فارس را نشان بدهید؛ ایران بین این دو است.",
            "شهر یا روستای خودتان را پیدا کنید. اگر خیلی کوچک است و روی نقشه نیست، بگویید نزدیک کدام شهر است.",
            "اگر در کشور دیگری زندگی می‌کنید، آن کشور را هم پیدا کنید و با انگشت از آنجا تا ایران بروید.",
            "بپرسید: «دریای خزر کدام طرف ایران است؟ شمال یا جنوب؟»"
          ],
          ask: "شکل ایران روی نقشه تو را یاد چه چیزی می‌اندازد؟" })
      ]
    },

    /* Sources: the Earth is round, a globe is a model, land and water, continents and oceans (England KS1
       geography, "name and locate the world's seven continents and five oceans"; NCSS C3 D2.Geo.1–2.K–2). About 71% of
       the Earth's surface is water (NOAA). Seven continents as taught in Iranian schools (آسیا، اروپا، آفریقا،
       آمریکای شمالی، آمریکای جنوبی، اقیانوسیه، جنوبگان). The world map is js/maps/world.js (Natural Earth). */
    {
      id: "world-sprout-17", subject: "world", level: "sprout", emoji: "🌍", title: "کره زمین",
      steps: [
        { type: "scene", prompt: "زمین گرد است", bg: "#22305a",
          parts: {
            stars: { art: "w-stars" }, globe: { art: "w-globe", at: [80, 44], s: 1.8 },
            room: { art: "w-room", o: 0 }, stand: { art: "w-globe-stand", at: [104, 54], s: 1, o: 0 }, globe2: { art: "w-globe", at: [104, 54], o: 0 },
            kid: { art: "w-sohrab", at: [70, 86], s: 1.2, o: 0 }, count: { art: "w-counter", at: [36, 30], s: 1.2, o: 0 },
            dot: { art: "w-dot", at: [104, 33], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "زمین ما گرد است، مثل یک توپ خیلی بزرگ. از فضا، این شکلی دیده می‌شود.", key: 4000, hold: 6000, do: [
              { id: "globe.land", to: { x: -150 }, dur: 6000, ease: "linear" }] },
            { caption: "کره جغرافیایی یک زمین کوچک است. سهراب آن را می‌چرخاند.", key: 4000, hold: 6000, do: D(
              hide(["stars", "globe"]), show(["room", "stand", "globe2", "kid"], 300, 700),
              [{ id: "kid.armR", to: { r: -80 }, at: 1600, dur: 500 }, { id: "globe2.land", to: { x: -110 }, at: 2000, dur: 3400, ease: "out" }, { id: "kid.armR", to: { r: 0 }, at: 4200, dur: 500 }]) },
            { caption: "بیشتر زمین را آب پوشانده است. آبی‌ها دریا و اقیانوس‌اند. سبزها خشکی‌اند.", key: 3400, hold: 5600, do: [
              { id: "globe2", to: { x: 100, y: 42, s: 1.7 }, dur: 1400 }, { id: "stand", to: { o: 0 }, dur: 600 }, { id: "kid", to: { o: 0 }, dur: 600 },
              { id: "globe2.land", to: { x: -40 }, at: 1600, dur: 3800, ease: "linear" }] },
            { caption: "خشکی‌های بزرگ را قاره می‌گوییم. زمین هفت قاره دارد.", key: 6400, hold: 7400, do: [
              { id: "count", to: { o: 1 }, dur: 300 }, { count: "count", from: 1, to: 7, at: 600, dur: 5600 },
              { id: "globe2.land", to: { x: -160 }, at: 600, dur: 5600, ease: "linear" }] },
            { caption: "ایران ما در قاره آسیاست.", key: 3400, hold: 5200, do: [
              { id: "count", to: { o: 0 }, dur: 300 }, { id: "globe2.land", to: { x: -77.7 }, at: 300, dur: 1800 },
              { id: "dot", to: { x: 100, y: 23.8 }, dur: 1 }, { id: "dot", to: { o: 1 }, at: 2200, dur: 300 }, pulse("dot", 2600, 2, 900), pulse("dot", 3600, 2, 900)] }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans"], enough: 6, prompt: "این نقشه دنیاست. روی قاره‌ها و اقیانوس‌ها بزن تا اسمشان را بشنوی." },
        { type: "map", map: "world", layers: ["continents", "oceans"], say: "روی نقشه دنیا پیدا کن.",
          tasks: [
            { find: "asia", prompt: "آسیا، قاره ما، کجاست؟", say: "آسیا، قاره ما، کجاست؟ بزرگ‌ترین قاره است." },
            { find: "africa", prompt: "آفریقا کجاست؟ زیر اروپا و کنار آسیاست.", say: "آفریقا کجاست؟ زیر اروپا و کنار آسیاست." },
            { find: "pacific", prompt: "اقیانوس آرام، بزرگ‌ترین اقیانوس، کجاست؟" },
            { find: "antarctica", prompt: "جنوبگان، قاره یخی پایین نقشه، کجاست؟" }
          ] },
        { type: "choose", prompt: "ایران در کدام قاره است؟", say: "ایران در کدام قاره است؟", stack: true,
          options: ["آفریقا", "آسیا", "اروپا"], answer: "آسیا" },
        { type: "choose", prompt: "روی زمین، آب بیشتر است یا خشکی؟", say: "روی زمین، آب بیشتر است یا خشکی؟", pic: true,
          options: [{ label: "🌊", value: "آب" }, { label: "⛰️", value: "خشکی" }], answer: "آب" },
        home({ pic: "🌍 🔍", text: "ایران را روی کره جغرافیایی پیدا کن.",
          need: ["یک کره جغرافیایی، یا یک توپ و ماژیک"],
          steps: [
            "اگر کره دارید، با هم ایران، دریای خزر و خلیج فارس را پیدا کنید. بعد یک اقیانوس.",
            "اگر کره ندارید، روی یک توپ با ماژیک چند خشکی بکشید و بقیه را آبی رنگ کنید: «ببین چقدر آب هست!»",
            "چشم‌بسته کره (یا توپ) را بچرخانید و انگشت بگذارید: آب آمد یا خشکی؟ ده بار امتحان کنید و بشمارید."
          ],
          ask: "انگشتت بیشتر روی آب افتاد یا روی خشکی؟" })
      ]
    },

    /* Sources: hot and cold places, the equator and the poles (England KS1 geography, "hot and cold areas of the world
       in relation to the Equator and the North and South Poles"). Penguins live in the south (Antarctica), not the north.
       Iran lies between about 25° and 40° north: hot summers and cold winters in many places. */
    {
      id: "world-sprout-18", subject: "world", level: "sprout", emoji: "🌡️", title: "جاهای گرم، جاهای سرد",
      steps: [
        { type: "scene", prompt: "گرم و سرد", bg: "#22305a",
          parts: {
            stars: { art: "w-stars" }, globe: { art: "w-globe", at: [80, 44], s: 1.8 }, eq: { art: "w-equator", at: [80, 44], s: 1.8, o: 0 }, poles: { art: "w-poles", at: [80, 44], s: 1.8, o: 0 },
            forest: { art: "w-forest-hot", o: 0 }, sun: { art: "w-sun", at: [80, 10], o: 0 }, hot: { art: "w-kid-hot", at: [80, 86], s: 1.2, o: 0 },
            ice: { art: "w-ice", o: 0 }, p1: { art: "🐧", at: [60, 76], s: 0.8, o: 0 }, p2: { art: "🐧", at: [76, 78], s: 0.7, o: 0 }, p3: { art: "🐧", at: [96, 76], s: 0.8, o: 0, flip: true },
            snowy: { art: "w-ice", sx: 0.5, o: 0 }, split: { art: "w-split", o: 0 }, hot2: { art: "w-kid-hot", at: [120, 86], s: 1.2, o: 0 }, cold2: { art: "w-kid-cold", at: [40, 86], s: 1.2, o: 0 },
            globe2: { art: "w-globe", at: [80, 44], s: 1.8, o: 0 }, dot: { art: "w-dot", at: [80, 24.8], s: 1.2, o: 0 }
          },
          scenes: [
            { caption: "دور وسط زمین یک خط خیالی می‌کشیم: خط استوا.", key: 4200, hold: 5600, do: [
              { id: "globe.land", to: { x: -60 }, dur: 5600, ease: "linear" }, { id: "eq", to: { o: 1 }, at: 1400, dur: 200 }, { id: "eq", draw: true, at: 1400, dur: 1800 }] },
            { caption: "بالا و پایین زمین، قطب شمال و قطب جنوب است. آنجا پر از یخ است.", key: 3600, hold: 5400, do: [
              { id: "poles", to: { o: 1 }, at: 800, dur: 900 }, pulse("poles", 2200, 1.05, 900)] },
            { caption: "نزدیک استوا، خورشید بالای سر است و هوا همیشه گرم است. جنگل‌های بزرگ و پرباران آنجاست.", key: 4600, hold: 6400, do: D(
              hide(["stars", "globe", "eq", "poles"]), show(["forest", "sun", "hot"], 300, 800),
              [{ id: "sun.rays", to: { r: 180 }, dur: 6000, ease: "linear" }, { emit: "drop", where: [80, 16], spread: [140, 4], rise: -40, n: 18, at: 3400, dur: 2600, life: 1200 }],
              wave("hot", 2000, 1600)) },
            { caption: "قطب جنوب خیلی سرد است و همیشه یخ دارد. پنگوئن‌ها آنجا زندگی می‌کنند.", key: 3800, hold: 6000, do: D(
              hide(["forest", "sun", "hot"]), show(["ice", "p1", "p2", "p3"], 0, 800),
              [{ id: "p1", to: { r: 10 }, at: 1400, dur: 3600, yoyo: true, times: 6 }, { id: "p3", to: { x: 110 }, at: 1600, dur: 3000 }, { id: "p3", to: { r: -10 }, at: 1600, dur: 3000, yoyo: true, times: 8 }]) },
            { caption: "در جاهای گرم، لباس نازک می‌پوشند. در جاهای سرد، لباس گرم، کلاه و پالتو.", key: 3600, hold: 5600, do: D(
              hide(["ice", "p1", "p2", "p3"]), show(["forest", "snowy", "split", "hot2", "cold2"], 0, 600),
              [{ id: "forest", to: { o: 1 }, dur: 1 }], wave("hot2", 1400, 1400), wave("cold2", 2600, 1400, "armL")) },
            { caption: "ایران نه خیلی نزدیک استواست، نه خیلی دور. برای همین، بیشتر جاهای ایران تابستان گرم و زمستان سرد دارند.", key: 4800, hold: 7000, do: D(
              hide(["forest", "snowy", "split", "hot2", "cold2"]), show(["stars", "globe2"], 0, 700),
              [{ id: "globe2.land", to: { x: -77.7 }, dur: 1 }, { id: "dot", to: { o: 1 }, at: 1600, dur: 300 }, pulse("dot", 2000, 2, 900), pulse("dot", 3200, 2, 900)]) }
          ],
          question: "پنگوئن‌ها کجا زندگی می‌کنند؟", pic: true,
          options: [{ label: "🌴", value: "نزدیک استوا" }, { label: "🧊", value: "قطب جنوب" }, { label: "🏜️", value: "بیابان" }], answer: "قطب جنوب" },
        { type: "sort", prompt: "جای گرم یا جای سرد؟", say: "هر چیز مال جای گرم است یا جای سرد؟",
          baskets: [{ pic: "☀️", label: "جای گرم", value: "hot" }, { pic: "❄️", label: "جای سرد", value: "cold" }],
          items: [
            { pic: "🩳", say: "شلوارک و لباس نازک", basket: "hot" },
            { pic: "🌴", say: "درخت نخل", basket: "hot" },
            { pic: "🦜", say: "طوطی جنگل گرم", basket: "hot" },
            { pic: "🧤", say: "دستکش و کلاه پشمی", basket: "cold" },
            { pic: "🐧", say: "پنگوئن", basket: "cold" },
            { pic: "⛄", say: "آدم‌برفی", basket: "cold" }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans", "equator"], say: "روی نقشه دنیا پیدا کن.",
          tasks: [
            { find: "equator", prompt: "خط استوا کجاست؟ رویش بزن.", say: "خط استوا کجاست؟ خط قرمز وسط نقشه. رویش بزن." },
            { find: "antarctica", prompt: "سردترین قاره، جنوبگان، کجاست؟" },
            { find: "africa", prompt: "آفریقا کجاست؟ خط استوا از وسطش رد می‌شود." }
          ] },
        { type: "talk", scene: "☀️ 🌍 ❄️", caption: "شهر تو بیشتر گرم است یا سرد؟ اگر به قطب جنوب می‌رفتی، چه لباسی می‌پوشیدی؟" }
      ]
    },

    /* Sources: Iranian festivals of the year as culture: Nowruz (UNESCO Intangible Cultural Heritage, 2009/2016),
       Sizdah Bedar (13 Farvardin), Mehregan (in Mehr; UNESCO list, 2024, Iran and Tajikistan), Yalda (the longest night,
       30 Azar; UNESCO list «یلدا/چله», 2022, Iran and Afghanistan), Chaharshanbe Suri (the last Tuesday night of the
       year): Encyclopaedia Iranica entries "Čahāršanba-sūrī", "Mehragān", "Sizdah Bedar", "Šab-e Yaldā". Told as
       culture, without religion. Fire safety (Iran's Red Crescent and fire service advice): only grown-ups light the
       fire, no firecrackers. Teacher review: how the festivals are kept in different regions. */
    {
      id: "world-sprout-5", subject: "world", level: "sprout", emoji: "🎉", title: "جشن‌های سال",
      steps: [
        { type: "scene", prompt: "یک سال، پنج جشن", bg: "#cdeaf7",
          /* A year wheel in the corner (spring at the top, then summer, autumn, winter, clockwise): its hand moves to
             each festival's day: Nowruz 0°, 13 Farvardin 13°, 10 Mehr 193°, the last night of Azar 272°, the last
             Tuesday night of the year about 355°. */
          parts: {
            meadow: { art: "w-meadow" }, tree: { art: "w-blossom-tree", at: [36, 80], s: 1.3 }, sabzeh: { art: "w-sabzeh", at: [108, 80], s: 1.3 },
            picnic: { art: "w-picnic", at: [84, 82], s: 1.3, o: 0 }, girl: { art: "w-girl", at: [76, 86], s: 1.15 }, boy: { art: "w-boy2", at: [120, 86], s: 1.15, o: 0 },
            ball: { art: "w-ball", at: [80, 64], o: 0 },
            l1: { art: "w-leaf", at: [30, 36], o: 0 }, l2: { art: "w-leaf2", at: [44, 30], o: 0 }, l3: { art: "w-leaf", at: [24, 42], o: 0 },
            fruit: { art: "w-fruit-bowl", at: [104, 80], s: 1.5, o: 0 }, gran: { art: "w-gran", at: [130, 86], s: 1.15, o: 0 }, pom: { art: "w-pomegranate", at: [86, 72], o: 0 },
            room: { art: "w-room", o: 0 }, night: { art: "w-win-night", o: 0 }, dim: { art: "w-night-dim", o: 0 },
            granS: { art: "w-gran-sit", at: [110, 76], s: 1.15, o: 0 }, book: { art: "w-book", at: [110, 68], s: 1.3, o: 0 }, momS: { art: "w-mom-sit", at: [40, 76], s: 1.15, o: 0 },
            girlS: { art: "w-girl-sit", at: [70, 76], s: 1.15, o: 0 }, sofreh: { art: "w-sofreh", at: [80, 84], s: 1.2, o: 0 },
            m1: { art: "w-melon", at: [66, 82], s: 1.3, o: 0 }, m2: { art: "w-melon", at: [78, 83], s: 1.3, o: 0 }, pom2: { art: "w-pomegranate", at: [92, 82], o: 0 },
            yard: { art: "w-night-yard", o: 0 }, fire: { art: "w-fire", at: [134, 84], s: 1.4, o: 0 }, grandpa: { art: "w-grandpa", at: [104, 86], s: 1.15, o: 0 },
            gSpoon: { art: "w-girl-spoon", at: [30, 86], s: 1.15, o: 0 }, bSpoon: { art: "w-boy-spoon", at: [54, 86], s: 1.15, o: 0 },
            cracker: { art: "w-cracker", at: [80, 30], s: 1.6, o: 0 }, no: { art: "w-no", at: [80, 30], s: 1.4, o: 0 },
            year: { art: "w-year", at: [140, 19], s: 0.9 }
          },
          scenes: [
            { caption: "سال نو در اولین روز بهار شروع می‌شود: نوروز!", key: 3600, hold: 5600, do: D(
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b) { return { id: "tree." + b, to: { s: 0.1 }, dur: 1 }; }),
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b, i) { return { id: "tree." + b, to: { o: 1, s: 1 }, at: 600 + i * 200, dur: 500, ease: "back" }; }),
              [{ id: "tree.snow", to: { o: 0 }, dur: 1 }, pulse("year", 2800, 1.15)], wave("girl", 2600, 1800)) },
            { caption: "روز سیزدهم فروردین، سیزده‌به‌در است. روز گردش در دشت و باغ. بچه‌ها کنار سفره توپ‌بازی می‌کنند.", key: 6600, hold: 9600, do: D(
              hide(["sabzeh"]), show(["picnic", "boy", "ball"], 0, 600),
              [{ id: "year.hand", to: { r: 13 }, at: 400, dur: 1200 }, { id: "girl", to: { x: 50 }, at: 400, dur: 1200 },
                { id: "ball", to: { x: 56, y: 66 }, dur: 1 }],
              [0, 1, 2].map(function (i) {
                var t = 4400 + i * 1500, there = i % 2 === 0;
                return { id: "ball", path: there ? "M56 66Q85 34 114 66" : "M114 66Q85 34 56 66", at: t, dur: 1200, ease: "linear" };
              }),
              [{ id: "girl.armR", to: { r: -70 }, at: 4100, dur: 300 }, { id: "girl.armR", to: { r: 0 }, at: 4500, dur: 400 },
                { id: "boy.armL", to: { r: 70 }, at: 5600, dur: 300 }, { id: "boy.armL", to: { r: 0 }, at: 6000, dur: 400 },
                { id: "girl.armR", to: { r: -70 }, at: 7100, dur: 300 }, { id: "girl.armR", to: { r: 0 }, at: 7500, dur: 400 }]) },
            { caption: "در پاییز، در ماه مهر، جشن مهرگان است: جشن مهربانی و میوه‌های پاییز.", key: 5200, hold: 8000, do: D(
              hide(["picnic", "boy", "ball"]), show(["fruit", "gran", "l1", "l2", "l3"], 0, 600),
              [{ id: "year.hand", to: { r: 193 }, at: 300, dur: 1800 }, { id: "girl", to: { x: 80 }, at: 300, dur: 1200 }],
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b) { return { id: "tree." + b, to: { o: 0 }, at: 300, dur: 800 }; }),
              [{ id: "l1", path: "M30 36Q20 56 34 80", at: 800, dur: 2600 }, { id: "l1", to: { r: 200 }, at: 800, dur: 2600 },
                { id: "l2", path: "M44 30Q56 52 46 82", at: 1400, dur: 2800 }, { id: "l2", to: { r: -160 }, at: 1400, dur: 2800 },
                { id: "l3", path: "M24 42Q14 62 22 84", at: 2200, dur: 2400 }, { id: "l3", to: { r: 140 }, at: 2200, dur: 2400 },
                { id: "girl.armR", to: { r: -40 }, at: 3000, dur: 500 }, { id: "pom", to: { o: 1 }, at: 3500, dur: 200 },
                { id: "pom", path: "M86 72Q102 60 116 70", at: 3700, dur: 1200 }, { id: "gran.armL", to: { r: 45 }, at: 4300, dur: 500 },
                { id: "girl.armR", to: { r: 0 }, at: 4900, dur: 400 }, { id: "gran.smile", to: { o: 0 }, at: 5000, dur: 200 }, { id: "gran.laugh", to: { o: 1 }, at: 5000, dur: 200 }]) },
            { caption: "آخرین شب پاییز، شب یلداست: بلندترین شب سال. خانواده دور هم نشسته‌اند. هندوانه هست و کتاب شعر.", key: 6000, hold: 9800, do: D(
              hide(["meadow", "tree", "fruit", "gran", "l1", "l2", "l3", "pom", "girl"]),
              show(["room", "night", "dim", "granS", "book", "momS", "girlS", "sofreh", "m1", "m2", "pom2"], 0, 900),
              [{ id: "year.hand", to: { r: 272 }, at: 600, dur: 1600 }],
              talk("granS", 5200, 3400), [{ id: "book.page", to: { sx: -1 }, at: 6200, dur: 800 }, { id: "granS.head", to: { r: 6 }, at: 5200, dur: 3400, yoyo: true, times: 4 },
                { id: "girlS.head", to: { r: 8 }, at: 5600, dur: 600 }, { id: "momS.head", to: { r: 6 }, at: 5800, dur: 600 }]) },
            { caption: "آخرین سه‌شنبه شب سال، چهارشنبه‌سوری است. بزرگ‌ترها یک آتش کوچک روشن کرده‌اند. بچه‌ها با قاشق به کاسه می‌زنند: قاشق‌زنی!", key: 8600, hold: 12000, do: D(
              hide(["room", "night", "dim", "granS", "book", "momS", "girlS", "sofreh", "m1", "m2", "pom2"]), show(["yard", "grandpa", "fire", "gSpoon", "bSpoon"], 0, 900),
              [{ id: "year.hand", to: { r: 355 }, at: 600, dur: 1600 },
                { id: "fire.fl1", to: { sy: 1.2, r: 4 }, at: 900, dur: 11000, yoyo: true, times: 22 }, { id: "fire.fl2", to: { sy: 1.3, r: -5 }, at: 900, dur: 11000, yoyo: true, times: 30 },
                { emit: "spark", where: [134, 64], spread: [6, 4], n: 10, rise: -10, at: 2000, dur: 9000 },
                { id: "grandpa.armR", to: { r: -60 }, at: 3800, dur: 500 }, { id: "grandpa.armR", to: { r: 0 }, at: 5200, dur: 500 },
                { id: "gSpoon.armL", to: { r: -42 }, at: 6400, dur: 400 }, { id: "gSpoon.armR", to: { r: 40 }, at: 6400, dur: 400 },
                { id: "bSpoon.armL", to: { r: -42 }, at: 6400, dur: 400 }, { id: "bSpoon.armR", to: { r: 40 }, at: 6400, dur: 400 },
                { id: "gSpoon.armR", to: { r: 24 }, at: 6900, dur: 4200, yoyo: true, times: 14 }, { id: "bSpoon.armR", to: { r: 24 }, at: 7000, dur: 4200, yoyo: true, times: 14 },
                { emit: "spark", where: [42, 70], spread: [30, 4], n: 14, rise: -6, at: 7000, dur: 4200, life: 700 }]) },
            { caption: "ترقه خطرناک است. بچه‌ها کنار بزرگ‌ترها و دور از آتش می‌مانند.", key: 3400, hold: 7000, do: D(
              [{ id: "gSpoon.armL", to: { r: 0 }, dur: 300 }, { id: "gSpoon.armR", to: { r: 0 }, dur: 300 }, { id: "bSpoon.armL", to: { r: 0 }, dur: 300 }, { id: "bSpoon.armR", to: { r: 0 }, dur: 300 },
                { id: "fire.fl1", to: { sy: 1.2, r: 4 }, dur: 6800, yoyo: true, times: 14 }, { id: "fire.fl2", to: { sy: 1.3, r: -5 }, dur: 6800, yoyo: true, times: 18 }],
              show(["cracker"], 300, 400), [{ id: "no", to: { o: 1 }, at: 1100, dur: 200 }, { id: "no", draw: true, at: 1100, dur: 1200 }],
              walk("grandpa", { x: 72 }, 2600, 2000), walk("gSpoon", { x: 56 }, 3000, 1600), walk("bSpoon", { x: 88 }, 3000, 2200),
              [{ id: "grandpa.armL", to: { r: 50 }, at: 5000, dur: 500 }, { id: "grandpa.armR", to: { r: -50 }, at: 5000, dur: 500 }]) },
            { caption: "بعد دوباره بهار می‌آید و نوروز. سال دور می‌زند!", hold: 6400, do: D(
              hide(["yard", "fire", "grandpa", "gSpoon", "bSpoon", "cracker", "no"]), show(["meadow", "tree", "sabzeh", "girl"], 0, 900),
              [{ id: "girl", to: { x: 76 }, dur: 1 }, { id: "year", to: { x: 80, y: 40, s: 1.9 }, at: 600, dur: 1200 },
                { id: "year.hand", to: { r: 360 }, at: 2000, dur: 1600 }, { id: "year", to: { x: 140, y: 19, s: 0.9 }, at: 4400, dur: 1200 }],
              ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"].map(function (b, i) { return { id: "tree." + b, to: { o: 1 }, at: 3600 + i * 150, dur: 500 }; }),
              wave("girl", 3800, 1800)) }
          ] },
        { type: "order", prompt: "جشن‌ها به ترتیب سال", say: "از نوروز شروع کن. جشن‌ها را به ترتیبی که در سال می‌آیند بچین.", numbered: true,
          items: [{ pic: "🌱", say: "نوروز" }, { pic: "🧺", say: "سیزده‌به‌در" }, { pic: "🍇", say: "مهرگان" }, { pic: "🍉", say: "شب یلدا" }, { pic: "🔥", say: "چهارشنبه‌سوری" }] },
        { type: "pairs", prompt: "هر جشن و کارش", say: "در هر جشن چه کار می‌کنیم؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "🌱", say: "نوروز" }, { pic: "🪞", say: "سفره هفت‌سین" }],
            [{ pic: "🧺", say: "سیزده‌به‌در" }, { pic: "🌳", say: "رفتن به دشت و باغ" }],
            [{ pic: "🍉", say: "شب یلدا" }, { pic: "📖", say: "شعر و قصه در بلندترین شب" }],
            [{ pic: "🔥", say: "چهارشنبه‌سوری" }, { pic: "🥄", say: "قاشق‌زنی" }]
          ] },
        { type: "choose", prompt: "در چهارشنبه‌سوری، کدام کار درست است؟", say: "در چهارشنبه‌سوری، کدام کار درست است؟", pic: true,
          options: [{ label: "🧨", value: "بازی با ترقه" }, { label: "🧑‍🧒", value: "ماندن کنار بزرگ‌ترها" }, { label: "🔥", value: "روشن کردن آتش تنهایی" }], answer: "ماندن کنار بزرگ‌ترها" },
        { type: "choose", prompt: "شب یلدا چه شبی است؟", say: "شب یلدا چه شبی است؟",
          options: ["کوتاه‌ترین شب سال", "بلندترین شب سال", "اولین شب بهار"], answer: "بلندترین شب سال" },
        { type: "talk", scene: "🌱 🧺 🍇 🍉 🔥", caption: "کدام جشن را از همه بیشتر دوست داری؟ در خانه شما چطور جشن می‌گیرید؟" }
      ]
    },

    /* Sources: the languages of Iran (Encyclopaedia Iranica, "Iran vi. Iranian languages and scripts"; Ethnologue,
       Iran). Every language is valuable (method.html#language; UNESCO, mother-tongue education). Words, written as
       speakers in Iran write them: Azerbaijani «سلام»، «ساغ اول»; Kurdish (Sorani, Sanandaj) «سڵاو»، «سوپاس»;
       Arabic (Khuzestan) «مرحبا»، «شکراً»; Turkmen «سلام»، «ساغ بول»; Balochi «سلام»، «منّت‌وار»; Armenian «Բարև»
       (باریو)، «Շնորհակալություն» (شنورهاکالوتیون). NEEDS RECORDINGS by native speakers (CURRICULUM.md, «Reviewers for
       ایران و جهان»): the device voice never says these words (it is Persian and would say them wrongly). Each word has a
       recording slot in REC below; until a recording exists, the child sees the word and hears only Persian around it.
       Still to add with reviewers: Gilaki, Mazandarani, Luri, Talysh, Assyrian and others. Reviewers: a speaker of each
       language checks its words and the child's name and city. */
    {
      id: "world-sprout-6", subject: "world", level: "sprout", emoji: "👋", title: "سلام به زبان‌های ایران",
      steps: [
        (function () {
          /* Six friends; then each one, big, says hello (a wave) and thank you (a hand on the heart), with the words in
             speech bubbles and the city on a small map. The words are shown, never said by the device voice. */
          var F = [{ id: "az", kid: "w-aylar", map: "w-map-tabriz", hi: "سلام!", th: "ساغ اول!" }, { id: "ku", kid: "w-zhiyar", map: "w-map-sanandaj", hi: "سڵاو!", th: "سوپاس!" },
            { id: "ar", kid: "w-reem", map: "w-map-ahvaz", hi: "مرحبا!", th: "شکراً!" }, { id: "tk", kid: "w-murad", map: "w-map-gonbad", hi: "سلام!", th: "ساغ بول!" },
            { id: "bal", kid: "w-mahgol", map: "w-map-chabahar", hi: "سلام!", th: "منّت‌وار!" }, { id: "hy", kid: "w-ani", map: "w-map-isfahan", hi: "Բարև!", th: "Շնորհակալություն!" }];
          var parts = { meadow: { art: "w-meadow" } };
          F.forEach(function (k, i) { parts["s" + k.id] = { art: k.kid, at: [176, 86], s: 1.05 }; });
          F.forEach(function (k) {
            parts["m" + k.id] = { art: k.map, at: [30, 24], s: 0.8, o: 0 };
            parts["b" + k.id] = { art: k.kid, at: [118, 87], s: 1.45, o: 0 };
            parts["h" + k.id] = { art: "w-bubble-wide", at: [70, 44], o: 0 }; parts["hw" + k.id] = { art: k.hi, at: [70, 46], s: 0.32, o: 0 };
            parts["t" + k.id] = { art: "w-bubble-wide", at: [70, 68], o: 0 }; parts["tw" + k.id] = { art: k.th, at: [70, 70], s: k.id === "hy" ? 0.2 : 0.32, o: 0 };
          });
          parts.heart = { art: "w-heart", at: [80, 26], s: 0.3, o: 0 };
          var X = [140, 116, 92, 68, 44, 20];
          function intro(k, i, prev, say) {
            var b = "b" + k.id;
            return D(prev ? hide(["b" + prev, "m" + prev, "h" + prev, "hw" + prev, "t" + prev, "tw" + prev]) : [],
              show([b, "m" + k.id], 200, 600), [pulse("m" + k.id + ".dot", 1400, 2.2, 1000)],
              wave(b, 2400, 1800), show(["h" + k.id, "hw" + k.id], 2700, 300),
              [{ id: b + ".armR", to: { r: 50 }, at: 4600, dur: 500 }, { id: b + ".head", to: { r: 8 }, at: 5000, dur: 600, yoyo: true, times: 2 }],
              show(["t" + k.id, "tw" + k.id], 5000, 300), [{ id: b + ".armR", to: { r: 0 }, at: 6800, dur: 500 }]);
          }
          return { type: "scene", prompt: "سلام! ساغ اول! سوپاس!", bg: "#cdeaf7", parts: parts,
          scenes: [
            { caption: "در ایران، مردم به زبان‌های زیادی حرف می‌زنند. با این دوست‌ها آشنا شو!", hold: 8600, do: D.apply(null, F.map(function (k, i) {
              return walk("s" + k.id, { x: X[i] }, i * 700, 1600 + (5 - i) * 140).concat(wave("s" + k.id, 2400 + i * 900, 1300, i < 3 ? "armR" : "armL"));
            })) },
            { caption: "آیلار در تبریز به ترکی آذربایجانی حرف می‌زند. سلام می‌کند: «سلام!» و تشکر می‌کند: «ساغ اول!»", key: 5800, hold: 7600,
              say: "آیلار در تبریز به ترکی آذربایجانی حرف می‌زند. ببین او چطور سلام و تشکر می‌کند.", audio: REC.az,
              do: D(hide(F.map(function (k) { return "s" + k.id; })), intro(F[0], 0)) },
            { caption: "ژیار در سنندج به کردی حرف می‌زند. سلام می‌کند: «سڵاو!» و تشکر می‌کند: «سوپاس!»", key: 5800, hold: 7600,
              say: "ژیار در سنندج به کردی حرف می‌زند. ببین او چطور سلام و تشکر می‌کند.", audio: REC.ku, do: intro(F[1], 1, "az") },
            { caption: "ریم در اهواز به عربی حرف می‌زند. سلام می‌کند: «مرحبا!» و تشکر می‌کند: «شکراً!»", key: 5800, hold: 7600,
              say: "ریم در اهواز به عربی حرف می‌زند. ببین او چطور سلام و تشکر می‌کند.", audio: REC.ar, do: intro(F[2], 2, "ku") },
            { caption: "مراد در گنبد به ترکمنی حرف می‌زند. سلام می‌کند: «سلام!» و تشکر می‌کند: «ساغ بول!»", key: 5800, hold: 7600,
              say: "مراد در گنبد به ترکمنی حرف می‌زند. ببین او چطور سلام و تشکر می‌کند.", audio: REC.tk, do: intro(F[3], 3, "ar") },
            { caption: "ماهگل در چابهار به بلوچی حرف می‌زند. سلام می‌کند: «سلام!» و تشکر می‌کند: «منّت‌وار!»", key: 5800, hold: 7600,
              say: "ماهگل در چابهار به بلوچی حرف می‌زند. ببین او چطور سلام و تشکر می‌کند.", audio: REC.bal, do: intro(F[4], 4, "tk") },
            { caption: "آنی در اصفهان به ارمنی هم حرف می‌زند. ارمنی خط خودش را دارد. سلام: «Բարև» (باریو)، تشکر: «Շնորհակալություն» (شنورهاکالوتیون)", key: 5800, hold: 7600,
              say: "آنی در اصفهان به ارمنی هم حرف می‌زند. ارمنی خط خودش را دارد. ببین او چطور سلام و تشکر می‌کند.", audio: REC.hy, do: intro(F[5], 5, "bal") },
            { caption: "همه این بچه‌ها فارسی هم بلدند. هر زبانی ارزشمند است، چون یک خانواده با آن حرف می‌زند و قصه می‌گوید.", hold: 9000, do: D(
              hide(["bhy", "mhy", "hhy", "hwhy", "thy", "twhy"]), show(F.map(function (k) { return "s" + k.id; }), 400, 700),
              F.map(function (k, i) { return { id: "s" + k.id + ".armL", to: { r: i === 5 ? 0 : 55 }, at: 1400, dur: 600 }; }),
              F.map(function (k, i) { return { id: "s" + k.id + ".armR", to: { r: i === 0 ? 0 : -55 }, at: 1400, dur: 600 }; }),
              [{ id: "heart", to: { o: 1, s: 2.2 }, at: 2400, dur: 1000, ease: "back" }, pulse("heart", 3600, 1.15), pulse("heart", 5000, 1.15)]) }
          ] };
        })(),
        { type: "pairs", prompt: "هر دوست چطور تشکر می‌کند؟", say: "هر دوست را با کلمه تشکرش جفت کن. روی هر کارت بزن تا بشنوی.",
          pairs: [
            [{ pic: "👧🏻", say: "آیلار، از تبریز" }, { label: "ساغ اول", say: "تشکر به ترکی آذربایجانی", audio: REC.azThanks }],
            [{ pic: "👦", say: "ژیار، از سنندج" }, { label: "سوپاس", say: "تشکر به کردی", audio: REC.kuThanks }],
            [{ pic: "👧", say: "ریم، از اهواز" }, { label: "شکراً", say: "تشکر به عربی", audio: REC.arThanks }],
            [{ pic: "👧🏽", say: "ماهگل، از چابهار" }, { label: "منّت‌وار", say: "تشکر به بلوچی", audio: REC.balThanks }]
          ] },
        { type: "talk", scene: "👋 🗣️ 👵 👴", caption: "در خانه شما به چه زبان‌هایی حرف می‌زنید؟ تو به چند زبان سلام کردن بلدی؟" },
        home({ pic: "👵 🗣️", text: "از پدربزرگ و مادربزرگ بپرس آن‌ها چطور سلام می‌کنند.",
          need: ["یک تلفن یا یک دیدار"],
          steps: [
            "از پدربزرگ، مادربزرگ یا همسایه‌ای که زبان دیگری دارد بپرسید به زبان خودش چطور سلام و تشکر می‌کند.",
            "اگر خانواده شما به زبانی غیر از فارسی هم حرف می‌زند، چند کلمه از آن را به کودک یاد بدهید و به آن افتخار کنید.",
            "کلمه‌ها را روی کاغذ بنویسید و کنارش اسم زبان را بنویسید.",
            "هر کس به زبان دیگری حرف می‌زند، با احترام گوش می‌دهیم و به لهجه کسی نمی‌خندیم."
          ],
          ask: "امروز چه کلمه تازه‌ای از یک زبان دیگر یاد گرفتی؟" })
      ]
    },

    /* Sources: instruments of Iran's peoples (Encyclopaedia Iranica, "Music in Iran"; During, «موسیقی ایرانی»).
       UNESCO lists: the Radif of Iranian music (2009: tar, setar, ney, kamancheh…), the art of crafting and playing the
       kamancheh (2017, Iran and Azerbaijan), the traditional skills of making and playing the dutar (2019; Khorasan and
       Turkmen Sahra). Qeychak: Baluchestan. ساز و دهل (sorna and dohol) at Lori and Bakhtiari weddings, with the
       handkerchief dance. NEEDS RECORDINGS: a short clip of each instrument (the device voice cannot play music); until
       then the home step asks parents to listen together. Teacher and musician review: each instrument's region. */
    {
      id: "world-sprout-36", subject: "world", level: "sprout", emoji: "🪕", title: "سازهای ایران",
      steps: [
        { type: "scene", prompt: "سازهای ایران", bg: "#fffaf0",
          parts: {
            room: { art: "w-room3" },
            tar: { art: "w-tar-player", at: [104, 84], s: 1.25 }, ney: { art: "w-ney-player", at: [56, 84], s: 1.25 },
            kam: { art: "w-kamancheh-player", at: [80, 84], s: 1.3, o: 0 }, mapA: { art: "w-map-eazarbaijan", at: [136, 22], s: 0.7, o: 0 },
            field: { art: "w-field", o: 0 }, tgp: { art: "w-turkmen-grandpa", at: [80, 86], s: 1.25, o: 0 }, mapKh: { art: "w-map-khorasan", at: [136, 22], s: 0.7, o: 0 },
            beach: { art: "w-beach", o: 0 }, bdad: { art: "w-baluch-dad", at: [80, 86], s: 1.25, o: 0 }, mapC: { art: "w-map-chabahar", at: [136, 22], s: 0.7, o: 0 },
            meadow: { art: "w-meadow", o: 0 }, dohol: { art: "w-dohol-player", at: [116, 86], s: 1.15, o: 0 }, sorna: { art: "w-sorna-player", at: [138, 86], s: 1.15, o: 0 },
            d1: { art: "w-dancer", at: [40, 86], s: 1.1, o: 0 }, d2: { art: "w-dancer2", at: [60, 86], s: 1.1, o: 0 }, d3: { art: "w-dancer", at: [80, 86], s: 1.1, o: 0, flip: true }
          },
          scenes: [
            { caption: "تار و نی را در همه جای ایران می‌زنند. با آن‌ها آهنگ‌های قدیمی ایرانی را می‌نوازند.", key: 3600, hold: 6000, do: D(
              [{ id: "ney.armR", to: { r: 120 }, dur: 1 }, { id: "tar.armR", to: { r: 30 }, at: 600, dur: 5000, yoyo: true, times: 20 }, { id: "ney.head", to: { r: 5 }, at: 600, dur: 5000, yoyo: true, times: 6 },
                { emit: "bubble", where: [80, 30], spread: [50, 6], n: 12, rise: 12, at: 900, dur: 4600 }]) },
            { caption: "کمانچه را با آرشه می‌زنند. در آذربایجان و خیلی جاهای دیگر ایران، کمانچه می‌نوازند.", key: 3800, hold: 6400, do: D(
              hide(["tar", "ney"]), show(["kam", "mapA"], 300, 600), [pulse("mapA.dot", 1400, 2.2, 1000),
                { id: "kam.armR", to: { r: 30 }, at: 1600, dur: 4400, yoyo: true, times: 10 }]) },
            { caption: "دوتار دو سیم دارد. در خراسان و ترکمن‌صحرا دوتار می‌زنند.", key: 3800, hold: 6000, do: D(
              hide(["room", "kam", "mapA"]), show(["field", "tgp", "mapKh"], 0, 700),
              [{ id: "tgp.armL", to: { r: -40 }, at: 1200, dur: 400 }, { id: "tgp.armL", to: { r: -20 }, at: 1600, dur: 4200, yoyo: true, times: 16 }]) },
            { caption: "قیچک ساز بلوچ‌هاست، در سیستان و بلوچستان.", key: 3400, hold: 5600, do: D(
              hide(["field", "tgp", "mapKh"]), show(["beach", "bdad", "mapC"], 0, 700), [pulse("mapC.dot", 1200, 2.2, 1000),
                { id: "bdad.armL", to: { r: 30 }, at: 1200, dur: 400 }, { id: "bdad.armR", to: { r: 40 }, at: 1600, dur: 600, yoyo: true, times: 8 }]) },
            { caption: "در عروسی‌های لرستان و بختیاری، ساز و دهل می‌زنند و همه با دستمال‌های رنگی می‌رقصند.", key: 4600, hold: 7600, do: D(
              hide(["beach", "bdad", "mapC"]), show(["meadow", "dohol", "sorna", "d1", "d2", "d3"], 0, 700),
              [{ id: "dohol.armR", to: { r: 40 }, at: 1200, dur: 400, yoyo: true, times: 16 }, { id: "sorna.armR", to: { r: 160 }, at: 1000, dur: 500 },
                { id: "sorna", to: { sy: 1.03 }, at: 1600, dur: 5000, yoyo: true, times: 10 }],
              ["d1", "d2", "d3"].map(function (d, i) {
                return [{ id: d + ".armR", to: { r: -140 }, at: 1400 + i * 200, dur: 500 }, { id: d + ".armR", to: { r: -110 }, at: 1900 + i * 200, dur: 4600, yoyo: true, times: 10 },
                  { id: d, to: { x: "+4" }, at: 1900 + i * 200, dur: 4600, yoyo: true, times: 4 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) }
          ] },
        { type: "pairs", prompt: "کدام ساز، کجا؟", say: "هر ساز را با جایی که بیشتر آنجا نواخته می‌شود جفت کن.",
          pairs: [
            [{ pic: "🪕", say: "دوتار" }, { label: "خراسان", say: "خراسان و ترکمن‌صحرا" }],
            [{ pic: "🎻", say: "قیچک" }, { label: "بلوچستان", say: "سیستان و بلوچستان" }],
            [{ pic: "🥁", say: "دهل" }, { label: "لرستان", say: "لرستان و بختیاری" }],
            [{ pic: "🪈", say: "نی" }, { label: "همه جای ایران", say: "همه جای ایران" }]
          ] },
        { type: "pairs", prompt: "هر ساز را چطور می‌زنند؟", say: "هر ساز را چطور می‌زنند؟ جفتش را پیدا کن.",
          pairs: [
            [{ pic: "🪕", say: "دوتار" }, { pic: "✋", say: "با انگشت روی سیم‌ها" }],
            [{ pic: "🎻", say: "قیچک و کمانچه" }, { pic: "🏹", say: "با آرشه" }],
            [{ pic: "🥁", say: "دهل" }, { pic: "🥢", say: "با چوب" }],
            [{ pic: "🪈", say: "نی" }, { pic: "💨", say: "با فوت کردن" }]
          ] },
        { type: "talk", scene: "🪕 🎻 🥁 🪈", caption: "در خانه شما چه آهنگی گوش می‌دهید؟ کدام ساز را دوست داری بزنی؟" },
        home({ pic: "🎧 🪕", text: "با هم صدای سازهای ایران را گوش کنید.",
          need: ["رادیو، ضبط یا گوشی برای گوش دادن"],
          steps: [
            "با هم آهنگ کوتاهی از دوتار، کمانچه، نی یا ساز و دهل گوش کنید. بپرسید: «این صدا تند است یا آرام؟ شاد است یا غمگین؟»",
            "از پدربزرگ و مادربزرگ بپرسید در جشن‌های زادگاهشان چه سازی می‌زدند.",
            "با قابلمه، قاشق و لیوان یک «ارکستر خانگی» بسازید و با هم ریتم بزنید."
          ],
          ask: "صدای کدام ساز را بیشتر دوست داشتی؟" })
      ]
    },

    /* Sources: where foods grow and why: rice in Gilan and Mazandaran (rain and rivers; paddies need a lot of water),
       dates in Bushehr, Hormozgan and Kerman (Bam) (palms need long hot summers), pistachios in Kerman (they stand dry
       and salty soil), saffron in Razavi and South Khorasan (little water, cold winters), fish on the coasts (Iran's
       Ministry of Agriculture (Jihad), crop statistics; FAO country profile, Iran). Dishes: میرزاقاسمی (Gilan), قلیه ماهی
       (Bushehr and Khuzestan). Science teaches climate itself (science lessons); here: how people live with it.
       Teacher review: the crops named for each province. */
    {
      id: "world-sprout-7", subject: "world", level: "sprout", emoji: "🍚", title: "سفره‌های ایران",
      steps: [
        { type: "scene", prompt: "غذای ما از کجا می‌آید؟", bg: "#cdeaf7",
          parts: {
            room: { art: "w-room" }, girlT: { art: "w-girl", at: [62, 80], s: 1.3 }, table: { art: "w-table", at: [80, 90], s: 1.7 },
            riceT: { art: "w-rice-bowl", at: [70, 66.4], s: 1.3 }, datesT: { art: "w-dates", at: [86, 66], s: 1.2 }, safT: { art: "w-saffron", at: [98, 66], s: 1.2 }, potT: { art: "🍲", at: [110, 67], s: 0.45 },
            q: { art: "w-qmark", at: [80, 30], s: 0.1, o: 0 },
            paddy: { art: "w-paddy", o: 0 }, cloud1: { art: "w-cloud", at: [30, 18], s: 1.3, o: 0 }, cloud2: { art: "w-cloud", at: [96, 14], s: 1.5, o: 0 },
            bowl: { art: "w-rice-bowl", at: [130, 86], s: 2, o: 0 }, mapN: { art: "w-map-north", at: [136, 24], s: 0.7, o: 0 },
            hot: { art: "w-hot", o: 0 }, sun: { art: "w-sun", at: [124, 20], s: 1.5, o: 0 }, palm1: { art: "w-datepalm", at: [46, 82], s: 1.3, o: 0 }, palm2: { art: "w-datepalm", at: [84, 84], s: 1.1, o: 0 },
            heat1: { art: "w-heat", at: [60, 70], o: 0 }, heat2: { art: "w-heat", at: [110, 66], o: 0 }, mapS: { art: "w-map-south", at: [136, 54], s: 0.7, o: 0 },
            dry: { art: "w-dry", o: 0 }, c1: { art: "w-crocus", at: [30, 80], s: 1.4, o: 0 }, c2: { art: "w-crocus", at: [50, 86], s: 1.4, o: 0 }, c3: { art: "w-crocus", at: [70, 78], s: 1.4, o: 0 },
            c4: { art: "w-crocus", at: [90, 84], s: 1.4, o: 0 }, c5: { art: "w-crocus", at: [110, 79], s: 1.4, o: 0 }, cloud3: { art: "w-cloud", at: [70, 16], s: 0.8, o: 0 },
            mapK: { art: "w-map-khorasan", at: [136, 24], s: 0.7, o: 0 },
            jetty: { art: "w-jetty", o: 0 }, fisher: { art: "w-fisher-rod", at: [40, 49], s: 1.2, o: 0 }, line: { art: "w-line", at: [62.6, 13.8], o: 0 },
            fish: { art: "🐟", at: [68, 64], s: 0.4, o: 0 }, pot: { art: "🍲", at: [128, 86], s: 1.1, o: 0 }, mapB: { art: "w-map-bushehr", at: [136, 24], s: 0.7, o: 0 },
            map: { art: "w-map-big", at: [76, 46], o: 0 },
            iRice: { art: "w-rice-bowl", at: [60.4, 26], s: 0.9, o: 0 }, iDates: { art: "w-datepalm", at: [64, 64], s: 0.35, o: 0 },
            iSaf: { art: "w-crocus", at: [94, 34], s: 0.9, o: 0 }, iFish: { art: "🐟", at: [70, 75], s: 0.3, o: 0 },
            girl: { art: "w-girl", at: [144, 88], s: 1, o: 0 }
          },
          scenes: [
            { caption: "هر غذایی از جایی می‌آید. چرا یک گیاه در یک جا خوب می‌روید و در جای دیگر نه؟", key: 5600, hold: 8400, do: [
              pulse("riceT", 900, 1.25), pulse("datesT", 1300, 1.25), pulse("safT", 1700, 1.25), pulse("potT", 2100, 1.25),
              { id: "girlT.armR", to: { r: -160 }, at: 4200, dur: 600 }, { id: "girlT.armR", to: { r: -150 }, at: 4800, dur: 1600, yoyo: true, times: 4 },
              { id: "q", to: { o: 1, s: 1.4 }, at: 4600, dur: 600, ease: "back" }, { id: "girlT.armR", to: { r: 0 }, at: 6600, dur: 500 }] },
            { caption: "در گیلان و مازندران باران زیاد می‌بارد. برنج آب زیادی می‌خواهد، پس آنجا خوب رشد می‌کند.", key: 5600, hold: 9000, do: D(
              hide(["room", "girlT", "table", "riceT", "datesT", "safT", "potT", "q"]), show(["paddy", "cloud1", "cloud2", "mapN"], 0, 700),
              [{ id: "paddy.rice1", to: { sy: 0.15 }, dur: 1 }, { id: "paddy.rice2", to: { sy: 0.15 }, dur: 1 },
                pulse("mapN", 1000, 1.1), { id: "cloud1", to: { x: 50 }, at: 400, dur: 8000 }, { id: "cloud2", to: { x: 80 }, at: 400, dur: 8000 },
                { emit: "drop", from: "cloud1", where: [0, 6], spread: [18, 2], rise: 30, n: 24, at: 900, dur: 6000, life: 1100 },
                { emit: "drop", from: "cloud2", where: [0, 6], spread: [22, 2], rise: 34, n: 28, at: 1100, dur: 6000, life: 1100 },
                { id: "paddy.rice1", to: { sy: 1 }, at: 3000, dur: 3600, ease: "out" }, { id: "paddy.rice2", to: { sy: 1 }, at: 3200, dur: 3600, ease: "out" },
                { id: "bowl", to: { o: 1 }, at: 7000, dur: 600 }, pulse("bowl", 7600, 1.15)]) },
            { caption: "در بوشهر و هرمزگان تابستان خیلی گرم است. درخت خرما گرما را دوست دارد.", key: 5400, hold: 7800, do: D(
              hide(["paddy", "cloud1", "cloud2", "mapN", "bowl"]), show(["hot", "sun", "palm1", "palm2", "mapS", "heat1", "heat2"], 0, 700),
              [pulse("mapS", 1000, 1.1), { id: "sun.rays", to: { r: 180 }, dur: 7600, ease: "linear" }, pulse("sun", 1600, 1.15, 900),
                { id: "heat1", to: { y: 50, o: 0 }, at: 700, dur: 2600 }, { id: "heat2", to: { y: 46, o: 0 }, at: 1200, dur: 2600 },
                { id: "palm1.ripe", to: { o: 1 }, at: 3600, dur: 2200 }, { id: "palm2.ripe", to: { o: 1 }, at: 4000, dur: 2200 },
                { id: "palm1", to: { r: 2 }, at: 3000, dur: 4000, yoyo: true, times: 4 }]) },
            { caption: "در خراسان مزرعه‌های گل زعفران هست. زعفران آب زیادی نمی‌خواهد.", key: 6000, hold: 7600, do: D(
              hide(["hot", "sun", "palm1", "palm2", "mapS", "heat1", "heat2"]), show(["dry", "mapK", "c1", "c2", "c3", "c4", "c5"], 0, 700),
              ["c1", "c2", "c3", "c4", "c5"].map(function (c) { return { id: c + ".petals", to: { s: 0.25 }, dur: 1 }; }),
              ["c1", "c2", "c3", "c4", "c5"].map(function (c, i) { return { id: c + ".petals", to: { s: 1 }, at: 1600 + i * 400, dur: 1200, ease: "back" }; }),
              [pulse("mapK", 1000, 1.1), { id: "cloud3", to: { o: 1 }, at: 4600, dur: 400 },
                { emit: "drop", from: "cloud3", where: [0, 5], spread: [8, 2], rise: 26, n: 3, at: 5000, dur: 1400, life: 1100 }]) },
            { caption: "این ماهیگیر کنار دریا ماهی گرفته است. قلیه ماهی، غذای بوشهر، با ماهی درست می‌شود.", key: 6600, hold: 9000, do: D(
              hide(["dry", "mapK", "c1", "c2", "c3", "c4", "c5", "cloud3"]), show(["jetty", "fisher", "line", "fish", "mapB"], 0, 700),
              [{ id: "jetty.waves", to: { x: 10 }, dur: 9000, ease: "linear" }, { id: "fish", to: { x: "+3" }, at: 700, dur: 1400, yoyo: true, times: 2 },
                { id: "line", to: { r: -6 }, at: 1800, dur: 400, yoyo: true, times: 4 },
                { id: "fisher.armR", to: { r: -25 }, at: 2600, dur: 600 }, { id: "line", to: { sy: 0.35 }, at: 2600, dur: 600 }, { id: "line", to: { x: "+3", y: "-4" }, at: 2600, dur: 600 },
                { id: "fish", path: "M68 64Q68 40 64 34", at: 2600, dur: 600 }, { id: "fish", to: { r: -40 }, at: 2600, dur: 600 },
                { id: "fish", to: { r: -20 }, at: 3200, dur: 600, yoyo: true, times: 4 },
                { id: "pot", to: { o: 1 }, at: 5600, dur: 600 }, pulse("mapB", 6000, 1.1),
                { emit: "bubble", where: [128, 66], spread: [8, 2], n: 10, rise: -10, at: 6200, dur: 2600 }]) },
            { caption: "هر جای ایران سفره خودش را دارد. سفره شهر تو چه دارد؟", hold: 7600, do: D(
              hide(["jetty", "fisher", "line", "fish", "mapB", "pot"]), show(["map"], 0, 800),
              show(["iRice"], 1200, 400), [pulse("iRice", 1600, 1.3)], show(["iDates"], 1800, 400), [pulse("iDates", 2200, 1.3)],
              show(["iSaf"], 2400, 400), [pulse("iSaf", 2800, 1.3)], show(["iFish"], 3000, 400), [pulse("iFish", 3400, 1.3)],
              show(["girl"], 4200, 500), wave("girl", 4600, 1800)) }
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"], say: "روی نقشه ببینیم هر غذا از کجا می‌آید.",
          tasks: [
            { find: "gilan", prompt: "برنج در گیلان خوب می‌روید. گیلان کنار دریای خزر است، طرف غرب. پیدایش کن.", say: "برنج در گیلان خوب می‌روید. گیلان در شمال، کنار دریای خزر است، طرف غرب. پیدایش کن." },
            { find: "bushehr", prompt: "خرما در بوشهر خوب می‌روید. بوشهر کنار خلیج فارس است. پیدایش کن." },
            { find: "kerman", prompt: "پسته کرمان معروف است. کرمان در جنوب شرق است، یک استان بزرگ دور از دریا. پیدایش کن." },
            { find: "razavi-khorasan", prompt: "زعفران در خراسان رضوی می‌روید، در شمال شرق ایران. پیدایش کن." }
          ] },
        { type: "pairs", prompt: "چرا آنجا می‌روید؟", say: "هر غذا را با جایی که خوب می‌روید جفت کن.",
          pairs: [
            [{ pic: "🍚", say: "برنج" }, { pic: "🌧️", say: "جایی که باران زیاد می‌بارد" }],
            [{ pic: "🌴", say: "خرما" }, { pic: "☀️", say: "جایی که خیلی گرم است" }],
            [{ pic: "🐟", say: "ماهی" }, { pic: "🌊", say: "کنار دریا" }],
            [{ pic: "🪻", say: "زعفران" }, { pic: "🏜️", say: "جایی که آب کم است" }]
          ] },
        { type: "talk", scene: "🍚 🍲 🫓 🧆", caption: "غذای مخصوص شهر یا روستای شما چیست؟ مواد آن از کجا می‌آید؟" },
        home({ pic: "🍳 🍆", text: "با هم یک غذای محلی بپزید!",
          need: ["مواد یک غذای ساده محلی، مثلاً میرزاقاسمی: بادمجان، گوجه، سیر، تخم‌مرغ"],
          steps: [
            "یک غذای محلی انتخاب کنید: غذای شهر خودتان یا شهری که بزرگ‌ترها از آنجا هستند.",
            "با کودک ببینید هر ماده از کجا آمده است: «این برنج گیلانه، این خرما از جنوبه.»",
            "کارهای امن را به کودک بدهید: شستن سبزی، هم زدن، چیدن سفره. اجاق و چاقو با بزرگ‌ترهاست.",
            "سر سفره بپرسید: «این غذا مال کدام استان است؟ روی نقشه کجاست؟»"
          ],
          ask: "اگر به شهر دیگری سفر کنی، دوست داری کدام غذایش را بچشی؟" })
      ]
    },

    /* Sources: unit game practising world-sprout-1 to world-sprout-7 (the seas of Iran, directions, map symbols, city
       and village, festivals, where foods grow). Each step stands on its own for reviews. */
    {
      id: "world-sprout-8", subject: "world", level: "sprout", emoji: "🎲", title: "بازی نقشه",
      steps: [
        { type: "map", map: "iran", layers: ["iran", "seas"],
          tasks: [
            { find: "persian-gulf", prompt: "خلیج فارس کجاست؟" },
            { find: "caspian", prompt: "دریای خزر کجاست؟" },
            { find: "oman-sea", prompt: "دریای عمان کجاست؟" }
          ] },
        { type: "compass", hide: true,
          tasks: [
            { face: "e", sun: "rise", prompt: "خورشید بالا می‌آید. رو به شرق بچرخ." },
            { face: "w", prompt: "حالا رو به غرب بچرخ." },
            { face: "s", prompt: "رو به جنوب بچرخ." }
          ] },
        { type: "map", map: "villageKey", say: "با راهنمای نقشه پیدا کن.",
          tasks: [
            { find: "garden", prompt: "باغ کجاست؟" },
            { find: "home", prompt: "خانه ستاره کجاست؟" }
          ] },
        { type: "sort", prompt: "شهر، روستا یا هر دو؟",
          say: "این‌ها را بیشتر کجا می‌بینیم؟ در شهر، در روستا، یا در هر دو؟",
          baskets: [{ pic: "🏙️", label: "شهر", value: "city" }, { pic: "🏡", label: "روستا", value: "village" }, { pic: "🤝", label: "هر دو", value: "both" }],
          items: [
            { pic: "🚦", say: "چراغ راهنمایی", basket: "city" },
            { pic: "🚌", say: "اتوبوس شهری", basket: "city" },
            { pic: "🐄", say: "گاو و گوسفند", basket: "village" },
            { pic: "🚜", say: "تراکتور در مزرعه", basket: "village" },
            { pic: "👨‍👩‍👧", say: "خانواده", basket: "both" },
            { pic: "🏫", say: "مدرسه", basket: "both" }
          ] },
        { type: "pairs", hidden: true, prompt: "جشن‌ها را جفت کن", say: "کارت‌ها را برگردان. هر جشن را با کارش جفت کن.",
          pairs: [
            [{ pic: "🌱", say: "نوروز" }, { pic: "🪞", say: "سفره هفت‌سین" }],
            [{ pic: "🧺", say: "سیزده‌به‌در" }, { pic: "🌳", say: "رفتن به دشت و باغ" }],
            [{ pic: "🍉", say: "شب یلدا" }, { pic: "📖", say: "شعر و قصه" }],
            [{ pic: "🔥", say: "چهارشنبه‌سوری" }, { pic: "🥄", say: "قاشق‌زنی" }]
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"], say: "غذاها از کجا می‌آیند؟",
          tasks: [
            { find: "gilan", prompt: "برنج کجا خوب می‌روید؟ در گیلان، کنار دریای خزر.", say: "برنج کجا خوب می‌روید؟ گیلان را پیدا کن، کنار دریای خزر." },
            { find: "bushehr", prompt: "خرما کجا خوب می‌روید؟ در بوشهر، کنار خلیج فارس.", say: "خرما کجا خوب می‌روید؟ بوشهر را پیدا کن، کنار خلیج فارس." }
          ] }
      ]
    },

    /* Sources: why rules exist and what makes them fair (NCSS C3 D2.Civ.8–9.K–2: rules and their purposes, fairness;
       Iran's third-grade social studies, lessons 8–9 «قانون و مقررات»). Dodgeball (وسطی), a common Iranian school game.
       Neutral civics: rules at home, at school and in games only. */
    {
      id: "world-sprout-19", subject: "world", level: "sprout", emoji: "📜", title: "چرا قانون داریم؟",
      steps: [
        { type: "scene", prompt: "بازی وسطی", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" },
            a: { art: "w-boy4", at: [20, 86], s: 1.05 }, b: { art: "w-girl4", at: [140, 86], s: 1.05, flip: true },
            m1: { art: "w-girl", at: [64, 86], s: 1 }, m2: { art: "w-boy2", at: [80, 86], s: 1 }, m3: { art: "w-boy3", at: [96, 86], s: 1 },
            ball: { art: "w-ball", at: [80, 82], s: 1.1 },
            paper: { art: "w-rules-paper", at: [80, 44], s: 1.4, o: 0 },
            room: { art: "w-room", o: 0 }, toys: { art: "w-blocks", at: [40, 88], s: 1.5, o: 0 }, tbox: { art: "w-toybox", at: [80, 89], s: 1.3, o: 0 }, kid: { art: "w-mahsa", at: [56, 86], s: 1.2, o: 0 },
            room2: { art: "w-room4", o: 0 }, board: { art: "w-blackboard", at: [80, 32], s: 1.2, o: 0 }, teacher: { art: "w-teacher", at: [126, 86], s: 1.2, o: 0 },
            s1: { art: "w-girl2-sit", at: [40, 86], s: 1.1, o: 0 }, s2: { art: "w-boy-sit", at: [64, 86], s: 1.1, o: 0 }, s3: { art: "w-girl4-sit", at: [88, 86], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "بچه‌ها می‌خواهند وسطی بازی کنند.", key: 2400, hold: 4400, do: D(wave("m2", 600, 1400), wave("a", 900, 1400)) },
            { caption: "ولی قانونی نگذاشته‌اند. همه با هم دنبال توپ می‌دوند. هیچ‌کس نمی‌داند کی باید بیرون برود. دعوا شد!", key: 4800, hold: 7200, do: D(
              walk("a", { x: 70 }, 400, 1400), walk("b", { x: 90 }, 400, 1400),
              [{ id: "ball", path: "M80 82Q60 40 70 66Q90 40 96 64Q80 44 80 60", at: 400, dur: 3200, ease: "linear" }],
              ["m1", "m2", "m3", "a", "b"].map(function (k, i) {
                return [{ id: k, to: { x: "+" + (i % 2 ? 6 : -6) }, at: 600 + i * 120, dur: 900, yoyo: true, times: 4 },
                  { id: k + ".smile", to: { o: 0 }, at: 3800, dur: 200 }, { id: k + ".sad", to: { o: 1 }, at: 3800, dur: 200 }];
              }).reduce(function (x, y) { return x.concat(y); }, [])) },
            { caption: "با هم قانون گذاشتند: دو نفر از دو طرف توپ می‌اندازند. توپ به هر کس خورد، بیرون می‌رود.", key: 5000, hold: 7400, do: D(
              walk("a", { x: 20 }, 0, 1400), walk("b", { x: 140 }, 0, 1400),
              ["m1", "m2", "m3", "a", "b"].map(function (k) { return [{ id: k + ".sad", to: { o: 0 }, dur: 200 }, { id: k + ".smile", to: { o: 1 }, dur: 200 }]; }).reduce(function (x, y) { return x.concat(y); }, []),
              show(["paper"], 1600, 600), [pulse("paper", 2400, 1.1),
                { id: "m1.head", to: { r: 8 }, at: 3600, dur: 500, yoyo: true, times: 4 }, { id: "m2.head", to: { r: -8 }, at: 3700, dur: 500, yoyo: true, times: 4 }, { id: "m3.head", to: { r: 8 }, at: 3800, dur: 500, yoyo: true, times: 4 }]) },
            { caption: "حالا بازی منصفانه است و به همه خوش می‌گذرد. توپ به رضا خورد، او هم بیرون رفت.", key: 5600, hold: 7600, do: D(
              hide(["paper"], 0, 400),
              [{ id: "a.armR", to: { r: -120 }, at: 600, dur: 300 }, { id: "a.armR", to: { r: 0 }, at: 900, dur: 300 },
                { id: "ball", path: "M80 60Q60 50 26 66", at: 1, dur: 400 },
                { id: "ball", path: "M26 66Q60 40 96 70", at: 900, dur: 1200, ease: "in" }, { id: "ball", path: "M96 70Q120 50 136 66", at: 2100, dur: 900, ease: "out" }],
              walk("m3", { x: 118, y: 92 }, 2600, 1600),
              [{ id: "m1.smile", to: { o: 0 }, at: 4400, dur: 200 }, { id: "m1.laugh", to: { o: 1 }, at: 4400, dur: 200 }, { id: "m2.smile", to: { o: 0 }, at: 4400, dur: 200 }, { id: "m2.laugh", to: { o: 1 }, at: 4400, dur: 200 }]) },
            { caption: "در خانه هم قانون داریم: بعد از بازی، اسباب‌بازی‌ها را جمع می‌کنیم.", key: 2400, hold: 5600, do: D(
              hide(["meadow", "a", "b", "m1", "m2", "m3", "ball"]), show(["room", "toys", "tbox", "kid"], 300, 700),
              [{ id: "kid.armR", to: { r: -40 }, at: 1400, dur: 500 }, { id: "toys", path: "M40 88Q60 66 80 80", at: 1800, dur: 1200 }, { id: "toys", to: { o: 0 }, at: 2900, dur: 300 }, { id: "kid.armR", to: { r: 0 }, at: 3200, dur: 400 }]) },
            { caption: "در کلاس هم قانون داریم: برای حرف زدن، دستمان را بالا می‌بریم و صبر می‌کنیم.", key: 3400, hold: 5600, do: D(
              hide(["room", "toys", "tbox", "kid"]), show(["room2", "board", "teacher", "s1", "s2", "s3"], 300, 700),
              [{ id: "s2.armR", to: { r: -160 }, at: 1600, dur: 500 }, { id: "teacher.armL", to: { r: 60 }, at: 3000, dur: 500 }, talk("s2", 3600, 1400)].reduce(function (x, y) { return x.concat(y); }, [])) }
          ],
          question: "بدون قانون، در بازی چه شد؟", pic: true,
          options: [{ label: "😠", value: "دعوا شد" }, { label: "😂", value: "خیلی خوش گذشت" }, { label: "😴", value: "همه خوابیدند" }], answer: "دعوا شد" },
        { type: "sort", prompt: "منصفانه است یا نه؟", say: "این کار منصفانه است، یا منصفانه نیست؟",
          baskets: [{ pic: "⚖️", label: "منصفانه", value: "fair" }, { pic: "💔", label: "منصفانه نیست", value: "unfair" }],
          items: [
            { pic: "🔁", say: "همه به نوبت بازی می‌کنند", basket: "fair" },
            { pic: "📜", say: "قانون برای همه یکی است", basket: "fair" },
            { pic: "👂", say: "قبل از قانون گذاشتن، حرف همه را گوش می‌دهیم", basket: "fair" },
            { pic: "🥇", say: "یک نفر همیشه اول است", basket: "unfair" },
            { pic: "🔀", say: "وسط بازی قانون را به نفع خودم عوض می‌کنم", basket: "unfair" },
            { pic: "🚫", say: "کوچک‌ترها را بازی نمی‌دهیم", basket: "unfair" }
          ] },
        { type: "sort", prompt: "این قانون کجاست؟", say: "این قانون مال خانه است، مدرسه، یا بازی؟",
          baskets: [{ pic: "🏠", label: "خانه", value: "home" }, { pic: "🏫", label: "مدرسه", value: "school" }, { pic: "⚽", label: "بازی", value: "game" }],
          items: [
            { pic: "🧸", say: "اسباب‌بازی‌ها را جمع کن", basket: "home" },
            { pic: "🪥", say: "قبل از خواب مسواک بزن", basket: "home" },
            { pic: "✋", say: "برای حرف زدن دست بالا کن", basket: "school" },
            { pic: "🔔", say: "با زنگ، به کلاس برگرد", basket: "school" },
            { pic: "🔁", say: "به نوبت توپ بینداز", basket: "game" },
            { pic: "🚩", say: "از خط بیرون نرو", basket: "game" }
          ] },
        { type: "talk", scene: "📜 ⚽ 🏠 🏫", caption: "در خانه شما چه قانونی هست؟ اگر یک قانون تازه برای بازی بگذاری، چه می‌گویی؟ آن قانون برای همه منصفانه است؟" },
        home({ pic: "📜 🖍️", text: "قانون‌های خانه را با هم بنویسید.",
          need: ["یک برگ کاغذ بزرگ و مداد رنگی"],
          steps: [
            "با همه اعضای خانواده بنشینید و سه یا چهار قانون ساده برای خانه پیدا کنید (مثلاً: «بعد از بازی جمع می‌کنیم»، «وقتی کسی حرف می‌زند گوش می‌دهیم»).",
            "از کودک بپرسید: «این قانون برای همه است؟ برای بزرگ‌ترها هم؟» قانون خوب برای همه یکی است.",
            "قانون‌ها را بنویسید، کودک کنارشان نقاشی بکشد و روی دیوار بزنید."
          ],
          ask: "کدام قانون خانه را از همه بیشتر دوست داری؟ چرا؟" })
      ]
    },

    /* Sources: working together and sharing a task (NCSS C3 D2.Civ.7.K–2; Iran's third-grade social studies, lesson 9
       «همکاری»). همیاری: neighbours helping each other with the harvest in Iranian villages (Encyclopaedia Iranica,
       "Boneh"; «یاوری»، «همیاری» in rural studies). Apple picking: no sharp tools. */
    {
      id: "world-sprout-20", subject: "world", level: "sprout", emoji: "🍎", title: "با هم کار می‌کنیم",
      steps: [
        { type: "scene", prompt: "همیاری در باغ", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" }, t1: { art: "w-apple-tree", at: [40, 76], s: 1.3 }, t2: { art: "w-apple-tree", at: [118, 74], s: 1.3 },
            ladder: { art: "w-ladder", at: [128, 80], s: 1, o: 0 },
            gp: { art: "w-farmer-grandpa", at: [80, 86], s: 1.2 },
            n1: { art: "w-dad2", at: [176, 86], s: 1.15 }, n2: { art: "w-mom2", at: [190, 86], s: 1.15 }, n3: { art: "w-boy3", at: [204, 86], s: 1 },
            c1: { art: "w-crate", at: [60, 88], s: 1.3 }, c2: { art: "w-crate", at: [96, 89], s: 1.3 },
            girl: { art: "w-girl-jug", at: [-20, 86], s: 1 },
            sofreh: { art: "w-sofreh", at: [80, 84], s: 1.3, o: 0 }
          },
          scenes: [
            { caption: "سیب‌های باغ پدربزرگ رسیده‌اند. کار زیاد است و پدربزرگ تنهاست.", key: 3000, hold: 5000, do: D(
              [{ id: "gp.head", to: { r: 8 }, at: 800, dur: 600 }, { id: "gp.smile", to: { o: 0 }, at: 800, dur: 200 }, { id: "gp.sad", to: { o: 1 }, at: 800, dur: 200 }]) },
            { caption: "همسایه‌ها به کمک آمدند. به این کار همیاری می‌گویند.", key: 4200, hold: 5800, do: D(
              walk("n1", { x: 140 }, 300, 3000), walk("n2", { x: 104 }, 300, 3400), walk("n3", { x: 70 }, 300, 3800),
              [{ id: "gp", to: { x: 54 }, at: 300, dur: 1600 }, { id: "gp.sad", to: { o: 0 }, at: 3000, dur: 200 }, { id: "gp.laugh", to: { o: 1 }, at: 3000, dur: 200 }]) },
            { caption: "هر کس یک کار دارد: یکی از نردبان بالا می‌رود و سیب می‌چیند، یکی سیب‌ها را در جعبه می‌گذارد.", key: 5200, hold: 7600, do: D(
              show(["ladder"], 0, 400), [{ id: "n1", path: "M140 86L132 64", at: 400, dur: 1400 }],
              [1, 2, 3].map(function (k, i) {
                var t = 2000 + i * 1400;
                return [{ id: "n1.armR", to: { r: -150 }, at: t, dur: 400 }, { id: "t2.a" + (k + 1), to: { x: -24 + i * 3, y: 42 }, at: t + 400, dur: 900, ease: "in" },
                  { id: "t2.a" + (k + 1), to: { o: 0 }, at: t + 1200, dur: 200 }, { id: "n1.armR", to: { r: 0 }, at: t + 600, dur: 400 }];
              }).reduce(function (x, y) { return x.concat(y); }, []),
              [{ id: "n2.armL", to: { r: 60 }, at: 3000, dur: 2400, yoyo: true, times: 4 }, { id: "c2.fill", to: { o: 1 }, at: 5200, dur: 400 }]) },
            { caption: "رضا و پدربزرگ سیب‌های درخت دیگر را می‌چینند و در جعبه می‌گذارند.", key: 4400, hold: 6200, do: D(
              [{ id: "n3.armR", to: { r: -150 }, at: 400, dur: 400 }, { id: "t1.a3", to: { x: 27, y: 41 }, at: 900, dur: 900, ease: "in" }, { id: "t1.a3", to: { o: 0 }, at: 1700, dur: 200 },
                { id: "gp.armL", to: { r: 140 }, at: 1400, dur: 400 }, { id: "t1.a1", to: { x: 23, y: 50 }, at: 1900, dur: 900, ease: "in" }, { id: "t1.a1", to: { o: 0 }, at: 2700, dur: 200 },
                { id: "c1.fill", to: { o: 1 }, at: 3000, dur: 400 }, { id: "n3.armR", to: { r: 0 }, at: 3200, dur: 400 }, { id: "gp.armL", to: { r: 0 }, at: 3200, dur: 400 }]) },
            { caption: "نگین برای همه آب آورد.", key: 3200, hold: 5000, do: D(walk("girl", { x: 24 }, 300, 2600), [pulse("girl", 3200, 1.08)]) },
            { caption: "با هم زود تمام شد! بعد همه دور سفره ناهار خوردند. هفته بعد، همه به باغ یک همسایه دیگر کمک می‌کنند.", key: 4000, hold: 7000, do: D(
              show(["sofreh"], 300, 700),
              ["gp", "n2", "n3", "girl"].map(function (k, i) { return [{ id: k + ".smile", to: { o: 0 }, at: 1400 + i * 150, dur: 200 }, { id: k + ".laugh", to: { o: 1 }, at: 1400 + i * 150, dur: 200 }]; }).reduce(function (x, y) { return x.concat(y); }, []),
              eat("n2", 1800, 2, "armL"), eat("gp", 2000, 2, "armR")) }
          ] },
        { type: "order", prompt: "همیاری در باغ", say: "اول چه شد؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🍎", say: "سیب‌ها رسیدند" }, { pic: "🤝", say: "همسایه‌ها به کمک آمدند" }, { pic: "🧺", say: "سیب‌ها را چیدند و در جعبه گذاشتند" }, { pic: "🍲", say: "با هم ناهار خوردند" }] },
        { type: "order", prompt: "کار گروهی", say: "برای یک کار گروهی، اول چه می‌کنیم؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "👂", say: "به حرف همه گوش می‌دهیم" }, { pic: "🗣️", say: "کارها را بین خودمان تقسیم می‌کنیم" }, { pic: "🤝", say: "هر کس کار خودش را انجام می‌دهد" }, { pic: "🎉", say: "نتیجه را با هم می‌بینیم" }] },
        { type: "doit", pic: "🧺 🤝", text: "یک کار خانه را با هم انجام دهید!",
          list: ["یک کار بزرگ انتخاب کنید: مرتب کردن انباری، شستن سبزی، آب دادن به گلدان‌ها.", "کار را تقسیم کنید: هر کس یک تکه.", "آخر کار ببینید: با هم چقدر زود تمام شد!"] },
        { type: "doit", pic: "👵 🤝", text: "به یک همسایه یا یکی از اقوام کمک کنید.",
          list: ["با بزرگ‌تر بپرسید: کسی کمک لازم دارد؟ (آوردن خرید، آب دادن به گل‌ها)", "با هم کمک کنید.", "بعد بپرسید: «کمک کردن چه حسی داشت؟»"] }
      ]
    },

    /* Sources: people who help the neighbourhood and how children can help (Iran's fourth-grade social studies,
       lessons 1–2 «همسایه‌ها و محله»; NCSS C3 D2.Civ.2.K–2). «خسته نباشید»: the usual Iranian thanks to someone at
       work. Children help with a grown-up. */
    {
      id: "world-sprout-21", subject: "world", level: "sprout", emoji: "🏘️", title: "کمک به محله",
      steps: [
        { type: "scene", prompt: "مهسا و محله‌اش", bg: "#cdeaf7",
          parts: {
            alley: { art: "w-alley" }, sweeper: { art: "w-sweeper", at: [120, 84], s: 1.2 }, leaves: { art: "w-leaves-pile", at: [100, 84], s: 1.6 },
            mahsa: { art: "w-mahsa", at: [40, 84], s: 1.1, o: 0 }, dad: { art: "w-dad", at: [22, 84], s: 1.15, o: 0 },
            bub: { art: "w-bubble-wide", at: [52, 34], s: 0.9, o: 0 }, word: { art: "خسته نباشید!", at: [52, 36.2], s: 0.24, o: 0 },
            nb: { art: "w-neighbour", at: [176, 84], s: 1.15, o: 0 }, bag: { art: "w-bag-carry", at: [80, 70], s: 1.3, o: 0 },
            tree: { art: "w-sapling", at: [128, 84], s: 1.3, o: 0 }, can: { art: "w-can", under: "mahsa", at: [6, -12], o: 0 },
            k2: { art: "w-boy4", at: [148, 84], s: 1.05, o: 0 }, h: { art: "w-heart", at: [80, 26], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "صبح زود، رفتگر کوچه را جارو می‌کند.", key: 3000, hold: 5000, do: [
              { id: "sweeper.armR", to: { r: 30 }, at: 400, dur: 4000, yoyo: true, times: 10 }, { id: "leaves", to: { x: 70, sx: 0.6 }, at: 400, dur: 4000 }] },
            { caption: "مهسا و پدرش به او سلام کردند و گفتند: «خسته نباشید!»", key: 3600, hold: 5600, do: D(
              show(["mahsa", "dad"], 0, 600), show(["bub", "word"], 1600, 300), talk("mahsa", 1600, 1600), wave("sweeper", 3400, 1600, "armL")) },
            { caption: "خانم همسایه خرید سنگینی داشت. مهسا و پدرش کمکش کردند و کیسه‌ها را تا خانه‌اش بردند.", key: 5600, hold: 7400, do: D(
              hide(["bub", "word", "sweeper", "leaves"]), show(["nb"], 0, 300), walk("nb", { x: 100 }, 0, 2400),
              [{ id: "dad.armR", to: { r: -60 }, at: 2600, dur: 400 }, { id: "bag", to: { o: 1 }, at: 2600, dur: 200 }, { id: "bag", path: "M100 72Q60 60 40 74", at: 2800, dur: 1000 }, { id: "dad.armR", to: { r: 0 }, at: 3800, dur: 300 }],
              walk("nb", { x: 150 }, 4200, 2000), walk("dad", { x: 108 }, 4200, 2600, true), walk("mahsa", { x: 126 }, 4200, 2600),
              [{ id: "bag", path: "M40 74L118 72", at: 4200, dur: 2600, ease: "linear" }]) },
            { caption: "بچه‌های کوچه به درخت کوچه آب دادند.", key: 3600, hold: 5600, do: D(
              hide(["nb", "bag", "dad"]), show(["tree", "k2", "can"], 0, 500), walk("mahsa", { x: 112 }, 0, 800),
              [{ id: "mahsa.armR", to: { r: -60 }, at: 1000, dur: 400 }, { id: "can", to: { r: 35 }, at: 1400, dur: 400 },
                { emit: "drop", where: [122, 64], spread: [4, 2], rise: 12, n: 12, at: 1600, dur: 2400, life: 800 }, { id: "tree.leaves", to: { s: 1.12 }, at: 2400, dur: 1800 }]) },
            { caption: "وقتی همه به هم کمک کنند، محله جای بهتری برای زندگی است.", key: 2600, hold: 4600, do: D(
              show(["h"], 600, 500), [pulse("h", 1200, 1.2), { id: "mahsa.smile", to: { o: 0 }, at: 800, dur: 200 }, { id: "mahsa.laugh", to: { o: 1 }, at: 800, dur: 200 }], wave("k2", 1000, 1600)) }
          ],
          question: "به کسی که کار می‌کند، چه می‌گوییم؟", stack: true,
          options: ["خسته نباشید!", "برو کنار!", "هیچی"], answer: "خسته نباشید!" },
        { type: "sort", prompt: "به محله کمک می‌کند؟", say: "این کار به محله کمک می‌کند، یا نه؟",
          baskets: [{ pic: "💚", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کمک نمی‌کند", value: "no" }],
          items: [
            { pic: "👋", say: "سلام کردن به همسایه‌ها", basket: "yes" },
            { pic: "💧", say: "آب دادن به درخت کوچه", basket: "yes" },
            { pic: "🛍️", say: "کمک در آوردن خرید همسایه", basket: "yes" },
            { pic: "🗑️", say: "انداختن آشغال در سطل", basket: "yes" },
            { pic: "📢", say: "سر و صدای زیاد وقت استراحت", basket: "no" },
            { pic: "🍬", say: "انداختن کاغذ شکلات در کوچه", basket: "no" }
          ] },
        { type: "sort", prompt: "چه کسانی به محله کمک می‌کنند؟", say: "این‌ها برای محله چه کار می‌کنند؟ هر کدام را به کارش برسان.",
          baskets: [{ pic: "🧹", label: "تمیز نگه می‌دارد", value: "clean" }, { pic: "🫓", label: "غذا می‌دهد", value: "food" }, { pic: "🩺", label: "سلامت", value: "health" }],
          items: [
            { pic: "🧹", say: "رفتگر", basket: "clean" },
            { pic: "🗑️", say: "ماشین زباله", basket: "clean" },
            { pic: "🧑‍🍳", say: "نانوا", basket: "food" },
            { pic: "🍎", say: "میوه‌فروش", basket: "food" },
            { pic: "👩‍⚕️", say: "پزشک درمانگاه", basket: "health" },
            { pic: "💊", say: "داروخانه", basket: "health" }
          ] },
        { type: "talk", scene: "🧹 👋 💧 🏘️", caption: "در محله شما چه کسانی کار می‌کنند؟ تو چطور می‌توانی به محله‌تان کمک کنی؟" },
        home({ pic: "🤝 🏘️", text: "با هم یک کار خوب برای محله بکنید.",
          need: ["یک بزرگ‌تر همراه"],
          steps: [
            "با کودک به یکی از کارکنان محله (رفتگر، نانوا، نگهبان) بگویید: «خسته نباشید!»",
            "اگر درخت یا گلدانی کنار در خانه هست، با هم به آن آب بدهید.",
            "اگر همسایه سالمندی دارید، با هم بپرسید کمکی لازم دارد یا نه."
          ],
          ask: "امروز چه کمکی به محله کردی؟" })
      ]
    },

    /* Sources: unit game practising world-sprout-19 to world-sprout-21 (fair rules, working together, helping the
       neighbourhood). Each step stands on its own for reviews. */
    {
      id: "world-sprout-22", subject: "world", level: "sprout", emoji: "🎲", title: "بازی با هم",
      steps: [
        { type: "sort", prompt: "منصفانه است یا نه؟", say: "این کار منصفانه است، یا منصفانه نیست؟",
          baskets: [{ pic: "⚖️", label: "منصفانه", value: "fair" }, { pic: "💔", label: "منصفانه نیست", value: "unfair" }],
          items: [
            { pic: "🔁", say: "نوبتی بازی کردن", basket: "fair" },
            { pic: "🎲", say: "تاس انداختن برای اینکه چه کسی اول باشد", basket: "fair" },
            { pic: "🥇", say: "من همیشه اول باشم", basket: "unfair" },
            { pic: "🔀", say: "عوض کردن قانون وسط بازی", basket: "unfair" }
          ] },
        { type: "pairs", prompt: "هر کس چه کمکی می‌کند؟", say: "هر کس به محله چه کمکی می‌کند؟ جفتش را پیدا کن.",
          pairs: [
            [{ label: "رفتگر", say: "رفتگر" }, { pic: "🧹", say: "کوچه را تمیز می‌کند" }],
            [{ pic: "🧑‍🍳", say: "نانوا" }, { pic: "🫓", say: "نان می‌پزد" }],
            [{ pic: "👩‍⚕️", say: "پزشک" }, { pic: "🩺", say: "بیماران را درمان می‌کند" }],
            [{ pic: "🧒", say: "بچه‌ها" }, { pic: "💧", say: "به درخت کوچه آب می‌دهند" }]
          ] },
        { type: "order", prompt: "کار گروهی", say: "برای یک کار گروهی، اول چه می‌کنیم؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "👂", say: "به حرف همه گوش می‌دهیم" }, { pic: "🗣️", say: "کارها را تقسیم می‌کنیم" }, { pic: "🤝", say: "هر کس کار خودش را انجام می‌دهد" }, { pic: "🎉", say: "نتیجه را با هم می‌بینیم" }] },
        { type: "sort", prompt: "به محله کمک می‌کند؟", say: "این کار به محله کمک می‌کند، یا نه؟",
          baskets: [{ pic: "💚", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کمک نمی‌کند", value: "no" }],
          items: [
            { pic: "👋", say: "گفتن «خسته نباشید» به رفتگر", basket: "yes" },
            { pic: "🛍️", say: "کمک در آوردن خرید همسایه", basket: "yes" },
            { pic: "🍬", say: "انداختن آشغال در کوچه", basket: "no" },
            { pic: "📢", say: "بوق زدن و داد زدن شب", basket: "no" }
          ] },
        { type: "pairs", hidden: true, prompt: "جفت‌ها را پیدا کن", say: "کارت‌ها را برگردان و جفت‌ها را پیدا کن.",
          pairs: [
            [{ pic: "📜", say: "قانون" }, { pic: "📜", say: "قانون" }],
            [{ pic: "🤝", say: "همیاری" }, { pic: "🤝", say: "همیاری" }],
            [{ pic: "🍎", say: "سیب" }, { pic: "🍎", say: "سیب" }],
            [{ pic: "🧹", say: "جارو" }, { pic: "🧹", say: "جارو" }]
          ] }
      ]
    },

    /* Sources: needs and wants, how a family meets its needs by working (NCSS C3 D2.Eco.1–2.K–2; Iran's third-grade
       social studies, lesson 10 «نیازها و خواسته‌ها»; OECD/INFE core competencies for young children: needs come first,
       saving). Parents' work: a baker father and a doctor mother. */
    {
      id: "world-sprout-23", subject: "world", level: "sprout", emoji: "🛒", title: "نیاز و خواسته",
      steps: [
        { type: "scene", prompt: "خانواده آوین", bg: "#cdeaf7",
          parts: {
            meadow: { art: "w-meadow" }, avin: { art: "w-avin", at: [80, 86], s: 1.2 },
            n1: { art: "🍞", at: [116, 34], s: 0.7, o: 0 }, n2: { art: "🏠", at: [138, 34], s: 0.7, o: 0 }, n3: { art: "👕", at: [116, 58], s: 0.7, o: 0 },
            n4: { art: "💊", at: [138, 58], s: 0.7, o: 0 }, n5: { art: "📚", at: [127, 80], s: 0.7, o: 0 },
            street: { art: "w-street", o: 0 }, bakery: { art: "w-bakery", at: [40, 64], s: 1.3, o: 0 }, dad: { art: "w-baker", at: [40, 72], s: 1, o: 0 },
            clinic: { art: "w-clinic", at: [120, 64], s: 1.3, o: 0 }, mom: { art: "w-doctor", at: [120, 72], s: 1, o: 0 },
            m1: { art: "w-money", at: [40, 24], s: 1.3, o: 0 }, m2: { art: "w-money", at: [120, 24], s: 1.3, o: 0 },
            c1: { art: "🪙", at: [86, 62], s: 0.3, o: 0 }, c2: { art: "🪙", at: [86, 62], s: 0.3, o: 0 }, c3: { art: "🪙", at: [86, 62], s: 0.3, o: 0 }, c4: { art: "🪙", at: [86, 62], s: 0.3, o: 0 }, c5: { art: "🪙", at: [86, 62], s: 0.3, o: 0 },
            c6: { art: "🪙", at: [86, 62], s: 0.3, o: 0 }, c7: { art: "🪙", at: [86, 62], s: 0.3, o: 0 },
            ice: { art: "🍦", at: [24, 60], s: 0.7, o: 0 }, piggy: { art: "w-piggy", at: [44, 86], s: 1.2, o: 0 }
          },
          scenes: [
            { caption: "خانواده آوین چیزهای زیادی لازم دارد: غذا، خانه، لباس، دارو و کتاب مدرسه.", key: 6200, hold: 7200, do: D(
              ["n1", "n2", "n3", "n4", "n5"].map(function (n, i) { return [{ id: n, to: { o: 1 }, at: 1200 + i * 1000, dur: 400 }, pulse(n, 1600 + i * 1000, 1.2)]; }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "پدر و مادر آوین کار می‌کنند. پدر نانواست و مادر پزشک. برای کارشان پول می‌گیرند.", key: 5400, hold: 7000, do: D(
              hide(["meadow", "avin", "n1", "n2", "n3", "n4", "n5"]), show(["street", "bakery", "dad", "clinic", "mom"], 0, 700),
              [{ id: "dad.armR", to: { r: -60 }, at: 1000, dur: 500 }, { id: "dad.armR", to: { r: -40 }, at: 1500, dur: 2000, yoyo: true, times: 4 },
                { id: "mom.armL", to: { r: 60 }, at: 1200, dur: 500 }, { id: "mom.armL", to: { r: 40 }, at: 1700, dur: 2000, yoyo: true, times: 4 }],
              show(["m1", "m2"], 4000, 400), [pulse("m1", 4400, 1.3), pulse("m2", 4600, 1.3)]) },
            { caption: "با این پول، اول چیزهایی را که لازم دارند می‌خرند: غذا، خانه، لباس، دارو، کتاب.", key: 6600, hold: 8000, do: D(
              hide(["street", "bakery", "dad", "clinic", "mom", "m1", "m2"]), show(["meadow", "avin", "n1", "n2", "n3", "n4", "n5"], 0, 700),
              [["c1", 116, 34], ["c2", 138, 34], ["c3", 116, 58], ["c4", 138, 58], ["c5", 127, 80]].map(function (c, i) {
                var t = 1200 + i * 900;
                return [{ id: c[0], to: { o: 1 }, at: t, dur: 200 }, { id: c[0], path: "M86 62Q" + (c[1] - 20) + " 20 " + c[1] + " " + (c[2] - 10), at: t, dur: 800 }, { id: c[0], to: { o: 0 }, at: t + 800, dur: 200 }];
              }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "اگر پولی بماند، کمی را برای چیزی که دوست دارند خرج می‌کنند، مثل بستنی. کمی را هم پس‌انداز می‌کنند.", key: 4800, hold: 7000, do: D(
              show(["ice", "piggy"], 0, 600),
              [{ id: "c6", to: { o: 1 }, at: 1600, dur: 200 }, { id: "c6", path: "M86 62Q50 30 26 50", at: 1600, dur: 900 }, { id: "c6", to: { o: 0 }, at: 2500, dur: 200 },
                { id: "c7", to: { o: 1 }, at: 3000, dur: 200 }, { id: "c7", path: "M86 62Q64 50 44 72", at: 3000, dur: 900 }, { id: "c7", to: { o: 0 }, at: 3900, dur: 200 }, pulse("piggy", 4000, 1.2)]) },
            { caption: "آوین فهمید: نمی‌شود هر چه دوست داریم بخریم. اول نیازها، بعد خواسته‌ها.", key: 3000, hold: 5400, do: [
              { id: "avin.head", to: { r: 8 }, at: 600, dur: 500, yoyo: true, times: 4 }, { id: "avin.smile", to: { o: 0 }, at: 2400, dur: 200 }, { id: "avin.laugh", to: { o: 1 }, at: 2400, dur: 200 }] }
          ] },
        { type: "sort", prompt: "نیاز یا خواسته؟", say: "کدام نیاز است، یعنی برای زندگی لازم است؟ کدام فقط خواسته است؟",
          baskets: [{ pic: "🏠", label: "نیاز", value: "need" }, { pic: "💛", label: "خواسته", value: "want" }],
          items: [
            { pic: "🍞", say: "غذا", basket: "need" },
            { pic: "💊", say: "دارو وقتی بیماریم", basket: "need" },
            { pic: "📚", say: "کتاب مدرسه", basket: "need" },
            { pic: "🧥", say: "پالتو در زمستان", basket: "need" },
            { pic: "🎮", say: "بازی رایانه‌ای تازه", basket: "want" },
            { pic: "🍦", say: "بستنی", basket: "want" },
            { pic: "🧸", say: "عروسک دهم", basket: "want" }
          ] },
        { type: "choose", prompt: "خانواده آوین اول پول را برای چه خرج می‌کند؟", say: "خانواده آوین اول پول را برای چه خرج می‌کند؟", pic: true,
          options: [{ label: "🍦", value: "بستنی" }, { label: "🍞", value: "غذا و چیزهای لازم" }, { label: "🎮", value: "بازی" }], answer: "غذا و چیزهای لازم" },
        { type: "choose", prompt: "خانواده‌ها پول را از کجا می‌آورند؟", say: "خانواده‌ها پول را از کجا می‌آورند؟", pic: true,
          options: [{ label: "🧰", value: "از کار کردن" }, { label: "🌳", value: "از درخت" }, { label: "🎈", value: "از بادکنک" }], answer: "از کار کردن" }
      ]
    },

    /* Sources: work and pay, buying with a little money, choosing, saving (NCSS C3 D2.Eco.2–3.K–2; Iran's third-grade
       social studies, lesson 10; OECD/INFE). Prices in thousands of toman, kept small and round for counting (as in the
       math lessons' money step); not real prices. */
    {
      id: "world-sprout-24", subject: "world", level: "sprout", emoji: "🪙", title: "پول از کجا می‌آید؟",
      steps: [
        { type: "scene", prompt: "سارا خرید می‌کند", bg: "#cdeaf7",
          parts: {
            room: { art: "w-room3" }, loom: { art: "w-loom", at: [60, 86], s: 1.3 }, weaver: { art: "w-weaver", at: [92, 86], s: 1.15 },
            pay: { art: "w-money", at: [140, 40], s: 1.3, o: 0 },
            shop: { art: "w-shop-in", o: 0 }, stall: { art: "w-stall", at: [100, 86], s: 1.2, o: 0 },
            pencil: { art: "✏️", at: [84, 54], s: 0.6, o: 0 }, ball: { art: "w-ball", at: [116, 55], s: 1.2, o: 0 },
            tag1: { art: "w-tag", at: [84, 66], s: 1.2, o: 0 }, p1: { art: "۵", at: [82.4, 67.6], s: 0.2, o: 0 },
            tag2: { art: "w-tag", at: [116, 66], s: 1.2, o: 0 }, p2: { art: "۲۰", at: [114.4, 67.6], s: 0.2, o: 0 },
            room2: { art: "w-room", o: 0 }, table: { art: "w-table", at: [100, 86], s: 1.3, o: 0 }, piggy: { art: "w-piggy", at: [100, 67], s: 1.2, o: 0 },
            sara: { art: "w-sara-m", at: [40, 86], s: 1.15, o: 0 }, bill: { art: "w-money", under: "sara", at: [6, -12], s: 0.7, o: 0 },
            coin: { art: "🪙", at: [70, 60], s: 0.3, o: 0 }, ballT: { art: "w-ball", at: [130, 40], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "مادر سارا در کارگاه فرش‌بافی کار می‌کند. آخر ماه، برای کارش حقوق می‌گیرد.", key: 4800, hold: 6400, do: D(
              [{ id: "loom.rug", to: { sy: 0.4 }, dur: 1 }, { id: "loom.rug", to: { sy: 1 }, at: 600, dur: 3400 }, { id: "weaver.armL", to: { r: 100 }, at: 600, dur: 3400, yoyo: true, times: 8 }],
              show(["pay"], 4000, 300), [{ id: "pay", path: "M140 40Q118 30 100 52", at: 4200, dur: 900 }]) },
            { caption: "سارا ده هزار تومان پول توجیبی دارد. به مغازه می‌رود.", key: 3200, hold: 5400, do: D(
              hide(["room", "loom", "weaver", "pay"]), show(["shop", "stall", "pencil", "ball", "sara", "bill"], 0, 700), walk("sara", { x: 56 }, 900, 1800), [pulse("bill", 3200, 1.4)]) },
            { caption: "مداد پنج هزار تومان است. توپ بیست هزار تومان است.", key: 4200, hold: 6000, do: D(
              show(["tag1", "p1"], 800, 400), [pulse("pencil", 1400, 1.3)], show(["tag2", "p2"], 2800, 400), [pulse("ball", 3400, 1.25)]) },
            { caption: "پول سارا برای توپ کافی نیست. سارا مداد را انتخاب می‌کند و پولش را می‌دهد.", key: 4600, hold: 6800, do: D(
              [{ id: "sara.head", to: { r: 8 }, at: 600, dur: 500, yoyo: true, times: 2 }, { id: "sara.armR", to: { r: -70 }, at: 2400, dur: 500 },
                { id: "bill", to: { o: 0 }, at: 3000, dur: 300 }, { id: "pencil", path: "M84 54Q74 50 64 66", at: 3400, dur: 900 }, { id: "sara.armR", to: { r: 0 }, at: 4400, dur: 400 }]) },
            { caption: "پنج هزار تومان برایش ماند. آن را در قلک می‌گذارد تا چند هفته دیگر بتواند توپ بخرد.", key: 4400, hold: 6600, do: D(
              hide(["shop", "stall", "pencil", "ball", "tag1", "p1", "tag2", "p2"]), show(["room2", "table", "piggy"], 0, 700), walk("sara", { x: 72 }, 600, 1200),
              [{ id: "coin", to: { o: 1 }, at: 2000, dur: 200 }, { id: "coin", path: "M78 58Q92 48 100 56", at: 2200, dur: 900 }, { id: "coin", to: { o: 0 }, at: 3000, dur: 200 }, pulse("piggy", 3200, 1.2)],
              show(["ballT"], 4200, 400), [{ id: "ballT", to: { s: 1.3 }, at: 4600, dur: 600, yoyo: true, times: 2 }]) }
          ] },
        { type: "money", prompt: "مداد را بخر: پول درست را بده.", say: "مداد پنج هزار تومان است. پولش را بده.", items: [{ emoji: "✏️", name: "مداد", price: 5 }], wallet: [2, 2, 1, 5, 10] },
        { type: "money", prompt: "سارا ده هزار تومان داشت و مدادی به پنج هزار تومان خرید. چقدر برایش ماند؟", bills: [5], options: [5, 10, 15], answer: 5 },
        { type: "sort", prompt: "پول را چه کنیم؟", say: "سارا پولش را چه کند؟ این کار خرج کردن است یا پس‌انداز؟",
          baskets: [{ pic: "🛍️", label: "خرج کردن", value: "spend" }, { pic: "🐷", label: "پس‌انداز", value: "save" }],
          items: [
            { pic: "✏️", say: "خریدن مداد", basket: "spend" },
            { pic: "🍦", say: "خریدن بستنی", basket: "spend" },
            { pic: "🪙", say: "گذاشتن پول در قلک", basket: "save" },
            { pic: "⚽", say: "جمع کردن پول برای یک توپ", basket: "save" }
          ] },
        home({ pic: "🐷 🪙", text: "یک قلک برای پس‌انداز درست کن.",
          need: ["یک قوطی یا جعبه در دار", "قیچی (دست بزرگ‌تر) و مداد رنگی"],
          steps: [
            "بالای قوطی یک شکاف برای سکه یا اسکناس ببرید و کودک رویش را تزیین کند.",
            "با کودک یک چیز انتخاب کنید که برایش پس‌انداز کند و عکس یا نقاشی‌اش را روی قلک بچسبانید.",
            "هر بار پولی به دستش رسید، بپرسید: «همه‌اش را خرج کنیم یا کمی در قلک بگذاریم؟»"
          ],
          ask: "برای چه چیزی پس‌انداز می‌کنی؟" })
      ]
    },

    /* Sources: from producer to consumer (NCSS C3 D2.Eco.1–3.K–2; Iran's sixth-grade social studies, lesson 6 «از تولید
       تا مصرف»). Bread: field, combine or harvest, flour mill, lorry, bakery, home. Milk: dairy farm, dairy factory
       (pasteurised), lorry, shop, home. */
    {
      id: "world-sprout-25", subject: "world", level: "sprout", emoji: "🫓", title: "از مزرعه تا سفره",
      steps: [
        { type: "scene", prompt: "سفر نان", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-sky-hills", depth: 0 }, ground: { art: "w-steppe" },
            patch: { art: "w-wheat-patch", at: [60, 82], s: 1.3 }, farmer: { art: "w-farmer", at: [100, 86], s: 1.15 },
            mill: { art: "w-mill", at: [230, 82], s: 1.2 }, truck: { art: "w-truck", at: [282, 86], s: 1.1 },
            bakery: { art: "w-bakery", at: [400, 80], s: 1.3 }, baker: { art: "🧑‍🍳", at: [386, 78], s: 0.95 }, counter: { art: "w-bakery-counter", at: [400, 80], s: 1.3, sy: 2 },
            house: { art: "w-house", at: [540, 80], s: 1.4 }, sofreh: { art: "w-sofreh", at: [540, 88], s: 0.9, o: 0 }, kid: { art: "w-kian2", at: [512, 86], s: 1, o: 0 }
          },
          scenes: [
            { caption: "کشاورز گندم می‌کارد. تابستان، گندم‌ها بلند و طلایی می‌شوند و آن‌ها را درو می‌کند.", key: 4400, hold: 6400, do: [
              { id: "patch.green", to: { sy: 0.3 }, dur: 1 }, { id: "patch.green", to: { sy: 1 }, at: 400, dur: 2200 },
              { id: "patch.gold", to: { o: 1 }, at: 2800, dur: 900 }, { id: "patch.green", to: { o: 0 }, at: 2800, dur: 900 },
              { id: "farmer.armR", to: { r: 40 }, at: 4200, dur: 1600, yoyo: true, times: 4 }] },
            { caption: "گندم را به آسیاب می‌برند. آسیاب گندم را آرد می‌کند.", key: 4600, hold: 6400, do: [
              { cam: { x: 220 }, dur: 2400, ease: "linear" }, { id: "mill.sacks", to: { o: 1 }, at: 3200, dur: 600 }, pulse("mill", 3800, 1.05, 900)] },
            { caption: "کامیون، کیسه‌های آرد را به نانوایی می‌برد.", key: 2600, hold: 6200, do: [
              { id: "mill.sacks", to: { o: 0 }, dur: 400 }, { id: "truck.load", to: { o: 1 }, dur: 400 },
              { id: "truck", to: { x: 448 }, at: 600, dur: 4400, ease: "inout" }, { id: "truck.w1", to: { r: 900 }, at: 600, dur: 4400 }, { id: "truck.w2", to: { r: 900 }, at: 600, dur: 4400 },
              { cam: { x: 400 }, at: 600, dur: 4400, ease: "inout" }] },
            { caption: "نانوا با آرد، خمیر درست می‌کند و نان می‌پزد.", key: 3400, hold: 5600, do: [
              { id: "truck.load", to: { o: 0 }, dur: 400 }, { id: "bakery.glow", to: { s: 1.15 }, dur: 5000, yoyo: true, times: 8 },
              { id: "baker.armF", to: { r: -60 }, at: 600, dur: 600 }, { id: "counter.bread", to: { o: 1 }, at: 2600, dur: 500 }, { id: "baker.armF", to: { r: 0 }, at: 2600, dur: 500 }] },
            { caption: "ما نان را می‌خریم و سر سفره می‌خوریم. نان ما کار خیلی‌هاست!", key: 4200, hold: 6000, do: [
              { cam: { x: 540 }, dur: 2400 }, { id: "sofreh", to: { o: 1 }, at: 1800, dur: 500 }, { id: "kid", to: { o: 1 }, at: 1800, dur: 500 },
              { id: "kid.armR", to: { r: 138 }, at: 2800, dur: 1000, yoyo: true, times: 4 }] }
          ] },
        { type: "order", prompt: "سفر نان", say: "نان چطور به سفره ما می‌رسد؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🌾", say: "کشاورز گندم می‌کارد" }, { pic: "🏭", say: "آسیاب آرد درست می‌کند" }, { pic: "🚚", say: "کامیون آرد را می‌برد" }, { pic: "🧑‍🍳", say: "نانوا نان می‌پزد" }, { pic: "🫓", say: "سر سفره نان می‌خوریم" }] },
        { type: "scene", prompt: "سفر شیر", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-sky-hills", depth: 0 }, ground: { art: "w-steppe" },
            cow: { art: "🐄", at: [60, 84], s: 1.4 }, farmer: { art: "w-farmer-woman", at: [96, 86], s: 1.15 },
            dairy: { art: "w-dairy", at: [230, 82], s: 1.3 }, truck: { art: "w-truck", at: [262, 86], s: 1.1 }, milkload: { art: "w-milk-load", at: [270, 68], s: 1.5, o: 0 },
            shop: { art: "w-shop-small", at: [400, 82], s: 1.4 }, kid: { art: "w-avin", at: [430, 86], s: 1, o: 0 }, bottle: { art: "🥛", at: [420, 78], s: 0.5, o: 0 }
          },
          scenes: [
            { caption: "گاوداری شیر تازه دارد.", key: 2400, hold: 4400, do: [{ id: "cow", to: { r: 4 }, at: 400, dur: 3000, yoyo: true, times: 4 }, { id: "farmer.armL", to: { r: 40 }, at: 1000, dur: 2400, yoyo: true, times: 4 }] },
            { caption: "در کارخانه لبنیات، شیر را جوش می‌دهند تا سالم بماند و در بطری می‌ریزند.", key: 4200, hold: 6000, do: [
              { cam: { x: 220 }, dur: 2400, ease: "linear" }, pulse("dairy", 3000, 1.05, 900), { id: "milkload", to: { o: 1 }, at: 3800, dur: 500 }] },
            { caption: "کامیون یخچال‌دار، شیر را به مغازه‌ها می‌برد. ما شیر را از مغازه می‌خریم.", key: 5600, hold: 7400, do: [
              { id: "milkload", to: { o: 0 }, dur: 300 }, { id: "truck", to: { x: 432 }, at: 400, dur: 4000 }, { id: "truck.w1", to: { r: 900 }, at: 400, dur: 4000 }, { id: "truck.w2", to: { r: 900 }, at: 400, dur: 4000 },
              { cam: { x: 400 }, at: 400, dur: 4000 }, { id: "kid", to: { o: 1 }, at: 4600, dur: 400 }, { id: "bottle", to: { o: 1 }, at: 5000, dur: 300 }, { id: "bottle", path: "M420 78Q426 70 434 74", at: 5200, dur: 800 }] }
          ] },
        { type: "order", prompt: "سفر شیر", say: "شیر چطور به خانه ما می‌رسد؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🐄", say: "گاوداری" }, { pic: "🏭", say: "کارخانه لبنیات" }, { pic: "🚚", say: "کامیون" }, { pic: "🏪", say: "مغازه" }, { pic: "🥛", say: "خانه ما" }] },
        { type: "pairs", prompt: "هر چیز از کجا می‌آید؟", say: "هر چیز را با جایی که از آن می‌آید جفت کن.",
          pairs: [
            [{ pic: "🫓", say: "نان" }, { pic: "🌾", say: "گندم" }],
            [{ pic: "🥛", say: "شیر" }, { pic: "🐄", say: "گاو" }],
            [{ pic: "🍎", say: "سیب" }, { pic: "🌳", say: "درخت" }],
            [{ pic: "🥚", say: "تخم‌مرغ" }, { pic: "🐔", say: "مرغ" }]
          ] }
      ]
    },

    /* Sources: using water, bread and electricity carefully (Iran's third-grade social studies, lessons 11–13 «درست
       مصرف کنیم»; UNESCO ESD). Iran is a dry country: saving water matters everywhere. Stale bread: kept in a bag, used
       again (toasted, in soup), not thrown away. */
    {
      id: "world-sprout-26", subject: "world", level: "sprout", emoji: "💧", title: "درست مصرف کنیم",
      steps: [
        { type: "scene", prompt: "کیان درست مصرف می‌کند", bg: "#e8f3f5",
          parts: {
            bath: { art: "w-clinic-room" }, sink: { art: "w-sink", at: [96, 86], s: 1.3 }, kian: { art: "w-kian2", at: [74, 86], s: 1.15 }, brush: { art: "w-brush", under: "kian", at: [5.4, -10], o: 0 },
            room: { art: "w-room", o: 0 }, dim: { art: "w-night-dim", o: 0 }, lamp: { art: "w-lamp", at: [80, 0], s: 1.3, o: 0 }, sw: { art: "w-switch", at: [128, 42], s: 1.4, o: 0 },
            sofreh: { art: "w-sofreh", at: [80, 84], s: 1.3, o: 0 }, bread: { art: "🫓", at: [80, 76], s: 0.5, o: 0 }, bag: { art: "w-bread-bag", at: [124, 86], s: 1.3, o: 0 },
            kian2: { art: "w-kian2", at: [40, 86], s: 1.15, o: 0 }, heart: { art: "w-heart", at: [80, 22], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "کیان مسواک می‌زند، ولی شیر آب باز مانده و آب بی‌خودی می‌ریزد.", key: 3000, hold: 5000, do: [
              { id: "brush", to: { o: 1 }, dur: 200 }, { id: "kian.armR", to: { r: 150 }, at: 300, dur: 500 }, { id: "kian.armR", to: { r: 140 }, at: 800, dur: 3600, yoyo: true, times: 12 },
              { emit: "drop", where: [104, 46], spread: [1, 1], rise: -6, n: 20, at: 300, dur: 4400, life: 500 }] },
            { caption: "کیان شیر آب را می‌بندد. حالا آب هدر نمی‌رود.", hold: 2000, do: [
              { id: "kian.armR", to: { r: 0 }, dur: 400 }, { id: "brush", to: { o: 0 }, dur: 300 }],
              wait: { tap: ["sink"], hint: "تو کمک کن: روی شیر آب بزن تا بسته شود!",
                each: [{ id: "sink.knob", to: { r: 90 }, dur: 400 }, { id: "sink.water", to: { o: 0 }, dur: 300 }] } },
            { caption: "چراغ اتاقی که کسی در آن نیست روشن مانده. کیان چراغ را خاموش می‌کند.", hold: 2000, do: D(
              [{ id: "sink.water", to: { o: 0 }, dur: 1 }], hide(["bath", "sink", "kian"]), show(["room", "lamp", "sw", "kian2"], 0, 700), [{ id: "lamp.light", to: { o: 1 }, dur: 300 }], walk("kian2", { x: 116 }, 800, 2000)),
              wait: { tap: ["sw"], hint: "روی کلید بزن تا چراغ خاموش شود!",
                each: [{ id: "sw.key", to: { sy: -1 }, dur: 200 }, { id: "lamp.light", to: { o: 0 }, dur: 300 }, { id: "dim", to: { o: 1 }, dur: 400 }] } },
            { caption: "سر سفره، نان را به اندازه برمی‌داریم. نان اضافه را در کیسه می‌گذاریم تا خشک نشود و بعد بخوریم.", key: 3400, hold: 5600, do: D(
              [{ id: "dim", to: { o: 0 }, dur: 400 }, { id: "lamp.light", to: { o: 0 }, dur: 1 }], hide(["lamp", "sw"]), show(["sofreh", "bread", "bag"], 300, 600), walk("kian2", { x: 104 }, 300, 900),
              [{ id: "kian2.armR", to: { r: -50 }, at: 1600, dur: 400 }, { id: "bread", path: "M80 76Q100 62 124 80", at: 2000, dur: 1200 }, { id: "bread", to: { o: 0 }, at: 3100, dur: 200 }, { id: "kian2.armR", to: { r: 0 }, at: 3300, dur: 400 }]) },
            { caption: "آب، نان و برق با کار خیلی‌ها به ما می‌رسد. درست مصرف می‌کنیم تا برای همه بماند.", key: 2600, hold: 4600, do: D(
              show(["heart"], 600, 400), [pulse("heart", 1000, 1.2), { id: "kian2.smile", to: { o: 0 }, at: 1200, dur: 200 }, { id: "kian2.laugh", to: { o: 1 }, at: 1200, dur: 200 }]) }
          ] },
        { type: "sort", prompt: "درست مصرف یا هدر دادن؟", say: "این کار درست مصرف کردن است، یا هدر دادن؟",
          baskets: [{ pic: "💚", label: "درست مصرف", value: "save" }, { pic: "💔", label: "هدر دادن", value: "waste" }],
          items: [
            { pic: "🚰", say: "بستن شیر آب وقت مسواک زدن", basket: "save" },
            { pic: "💡", say: "خاموش کردن چراغ اتاق خالی", basket: "save" },
            { pic: "🫓", say: "گذاشتن نان اضافه در کیسه", basket: "save" },
            { pic: "🚿", say: "حمام خیلی طولانی", basket: "waste" },
            { pic: "📺", say: "تلویزیون روشن وقتی کسی نگاه نمی‌کند", basket: "waste" },
            { pic: "🗑️", say: "دور ریختن نان", basket: "waste" }
          ] },
        { type: "doit", pic: "💧 💡", text: "یک هفته نگهبان آب و برق خانه باش!",
          list: ["هر شب ببین چراغ اتاق خالی روشن نمانده باشد.", "وقت مسواک زدن، شیر آب را ببند.", "نان اضافه را در کیسه بگذار.", "آخر هفته به خانواده بگو چه کارهایی کردی."] }
      ]
    },

    /* Sources: reduce, reuse, recycle (UNESCO ESD; Iran's third-grade social studies, lesson 13 «بازیافت»). In Iran,
       many cities ask families to keep dry rubbish (پسماند خشک) apart from wet (food) rubbish; dry rubbish is sorted
       into paper, plastic and glass. Food scraps become compost. */
    {
      id: "world-sprout-27", subject: "world", level: "sprout", emoji: "♻️", title: "بازیافت",
      steps: [
        { type: "scene", prompt: "زباله‌ها را جدا کنیم", bg: "#fffaf0",
          parts: {
            room: { art: "w-room4" }, girl: { art: "w-avin", at: [24, 86], s: 1.1 },
            b1: { art: "w-bin-paper", at: [56, 88], s: 1.4 }, b2: { art: "w-bin-plastic", at: [84, 88], s: 1.4 }, b3: { art: "w-bin-glass", at: [112, 88], s: 1.4 }, b4: { art: "w-bin-food", at: [140, 88], s: 1.4 },
            i1: { art: "w-paper", at: [56, 50], s: 1.6 }, i2: { art: "w-bottle", at: [84, 50], s: 1.6 }, i3: { art: "w-jar", at: [112, 54], s: 1.6 }, i4: { art: "w-apple-core", at: [140, 54], s: 1.6 },
            meadow: { art: "w-meadow", o: 0 }, compost: { art: "w-compost", at: [60, 86], s: 1.3, o: 0 }, plant: { art: "w-sapling", at: [60, 84], s: 0.4, o: 0 },
            box: { art: "w-box", at: [80, 86], s: 1.2, o: 0 }, car: { art: "w-box-car", at: [80, 86], s: 1.5, o: 0 }
          },
          scenes: [
            { caption: "بعد از ناهار، کلی زباله جمع شده: کاغذ، بطری پلاستیکی، شیشه مربا و پوست میوه.", key: 3400, hold: 5600, do: [
              pulse("i1", 800, 1.3), pulse("i2", 1600, 1.3), pulse("i3", 2400, 1.3), pulse("i4", 3200, 1.3)] },
            { caption: "آوین هر کدام را در سطل خودش می‌اندازد: کاغذ، پلاستیک، شیشه، و پسماند غذا.", hold: 2000, do: [],
              wait: { tap: ["i1", "i2", "i3", "i4"], inOrder: true, hint: "روی زباله‌ها به ترتیب بزن تا هر کدام در سطل خودش برود!",
                each: [{ id: "$", to: { y: 74, s: 0.8 }, dur: 600 }, { id: "$", to: { o: 0 }, at: 600, dur: 200 }] } },
            { caption: "کاغذ و پلاستیک و شیشه را بازیافت می‌کنند: از کاغذ کهنه، کاغذ نو می‌سازند.", key: 3000, hold: 5200, do: [
              { id: "i1", to: { o: 0 }, dur: 1 }, { id: "i2", to: { o: 0 }, dur: 1 }, { id: "i3", to: { o: 0 }, dur: 1 }, { id: "i4", to: { o: 0 }, dur: 1 },
              pulse("b1", 600, 1.2), pulse("b2", 1400, 1.2), pulse("b3", 2200, 1.2)] },
            { caption: "پوست میوه و سبزی کود می‌شود. کود به گیاه‌ها کمک می‌کند بزرگ شوند.", key: 4600, hold: 6400, do: D(
              hide(["room", "girl", "b1", "b2", "b3", "b4"]), show(["meadow", "compost", "plant"], 0, 700),
              [{ id: "plant", to: { s: 1.4 }, at: 1600, dur: 3600, ease: "out" }]) },
            { caption: "بعضی چیزها را دوباره به کار می‌بریم. آوین از یک جعبه، ماشین اسباب‌بازی ساخت!", key: 4400, hold: 6400, do: D(
              hide(["meadow", "compost", "plant"]), show(["room", "girl", "box"], 0, 700), walk("girl", { x: 56 }, 600, 1400),
              [{ id: "girl.armR", to: { r: -60 }, at: 2200, dur: 1600, yoyo: true, times: 4 }, { id: "box", to: { o: 0 }, at: 3600, dur: 400 }, { id: "car", to: { o: 1 }, at: 3600, dur: 400 },
                { id: "car", to: { x: 120 }, at: 4400, dur: 1600 }, { id: "girl.smile", to: { o: 0 }, at: 4400, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 4400, dur: 200 }]) }
          ] },
        { type: "sort", prompt: "هر زباله در کدام سطل؟", say: "هر زباله را در سطل خودش بینداز: کاغذ، پلاستیک، شیشه، یا پسماند غذا.",
          baskets: [{ pic: "📄", label: "کاغذ", value: "paper" }, { pic: "🥤", label: "پلاستیک", value: "plastic" }, { pic: "🫙", label: "شیشه", value: "glass" }, { pic: "🍌", label: "پسماند غذا", value: "food" }],
          items: [
            { pic: "📰", say: "روزنامه کهنه", basket: "paper" },
            { pic: "📦", say: "جعبه مقوایی", basket: "paper" },
            { pic: "🧴", say: "بطری شامپو", basket: "plastic" },
            { pic: "🥤", say: "لیوان پلاستیکی", basket: "plastic" },
            { pic: "🍾", say: "بطری شیشه‌ای", basket: "glass" },
            { pic: "🍏", say: "پوست سیب", basket: "food" },
            { pic: "🥔", say: "پوست سیب‌زمینی", basket: "food" }
          ] },
        home({ pic: "♻️ 📦", text: "در خانه زباله‌ها را جدا کنید و یک اسباب‌بازی بسازید.",
          need: ["دو کیسه یا سطل: خشک و تر", "یک جعبه یا بطری خالی و تمیز", "چسب و مداد رنگی"],
          steps: [
            "با کودک دو سطل درست کنید: زباله خشک (کاغذ، پلاستیک، شیشه) و زباله تر (پسماند غذا). یک هفته با هم جدا کنید.",
            "شیشه شکسته را فقط بزرگ‌تر جابه‌جا کند.",
            "از یک جعبه یا بطری تمیز با هم یک اسباب‌بازی بسازید: ماشین، خانه، گلدان."
          ],
          ask: "از یک جعبه کهنه چه چیزی می‌شود ساخت؟" })
      ]
    },

    /* Sources: unit game practising world-sprout-23 to world-sprout-27 (a pretend market with prices, need and want,
       where food comes from, sorting rubbish). Prices in thousands of toman, small round numbers. */
    {
      id: "world-sprout-28", subject: "world", level: "sprout", emoji: "🎲", title: "بازی بازارچه",
      steps: [
        { type: "money", prompt: "از بازارچه سیب بخر: پول درست را بده.", say: "سیب سه هزار تومان است. پولش را بده.", items: [{ emoji: "🍎", name: "سیب", price: 3 }], wallet: [1, 2, 5, 1] },
        { type: "money", prompt: "نان و شیر بخر: روی هم چقدر می‌شود؟", items: [{ emoji: "🫓", name: "نان", price: 2 }, { emoji: "🥛", name: "شیر", price: 4 }], options: [5, 6, 8] },
        { type: "sort", prompt: "نیاز یا خواسته؟", say: "در بازارچه، کدام نیاز است؟ کدام خواسته؟",
          baskets: [{ pic: "🏠", label: "نیاز", value: "need" }, { pic: "💛", label: "خواسته", value: "want" }],
          items: [
            { pic: "🫓", say: "نان", basket: "need" },
            { pic: "🥛", say: "شیر", basket: "need" },
            { pic: "🧦", say: "جوراب گرم", basket: "need" },
            { pic: "🍭", say: "آب‌نبات", basket: "want" },
            { pic: "🎈", say: "بادکنک", basket: "want" }
          ] },
        { type: "order", prompt: "سفر نان", say: "نان چطور به بازارچه می‌رسد؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🌾", say: "مزرعه گندم" }, { pic: "🏭", say: "آسیاب" }, { pic: "🧑‍🍳", say: "نانوایی" }, { pic: "🛒", say: "بازارچه" }] },
        { type: "pairs", prompt: "هر چیز از کجا می‌آید؟", say: "هر چیز را با جایی که از آن می‌آید جفت کن.",
          pairs: [
            [{ pic: "🧀", say: "پنیر" }, { pic: "🐄", say: "شیر گاو" }],
            [{ pic: "🍯", say: "عسل" }, { pic: "🐝", say: "زنبور" }],
            [{ pic: "🍊", say: "پرتقال" }, { pic: "🌳", say: "درخت" }],
            [{ pic: "🍞", say: "نان" }, { pic: "🌾", say: "گندم" }]
          ] },
        { type: "sort", prompt: "زباله‌های بازارچه", say: "زباله‌های بازارچه را جدا کن: خشک یا تر؟",
          baskets: [{ pic: "📦", label: "خشک: کاغذ، پلاستیک، شیشه", value: "dry" }, { pic: "🍌", label: "تر: پسماند غذا", value: "wet" }],
          items: [
            { pic: "📦", say: "جعبه مقوایی", basket: "dry" },
            { pic: "🧴", say: "بطری پلاستیکی", basket: "dry" },
            { pic: "🍌", say: "پوست موز", basket: "wet" },
            { pic: "🥬", say: "برگ کاهو", basket: "wet" }
          ] }
      ]
    },

    /* Sources: travel then and now (Iran's third-grade social studies, lesson 22 «حمل و نقل در گذشته و امروز»;
       England KS1 history). Caravans of camels and mules, caravanserais about a day's march apart (Encyclopaedia
       Iranica, "Caravansary"); a caravan covered roughly 30 km a day, so Tehran to Mashhad (about 900 km) took about a
       month. Iran's first long railway was built in the 1300s (SH); today about a day by bus and under two hours by
       plane. Periods named by years only. */
    {
      id: "world-sprout-29", subject: "world", level: "sprout", emoji: "🐫", title: "سفر در قدیم و امروز",
      steps: [
        { type: "scene", prompt: "از تهران تا مشهد", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-sky-hills", depth: 0 }, ground: { art: "w-steppe" },
            c1: { art: "🐫", at: [20, 84], s: 1.1, flip: true }, c2: { art: "🐫", at: [0, 84], s: 1.1, flip: true }, mule: { art: "🐴", at: [-18, 84], s: 0.9, flip: true },
            man: { art: "🚶", at: [36, 84], flip: true },
            serai: { art: "w-caravanserai", at: [300, 84], s: 1.2 }, count: { art: "w-calendar", at: [250, 26], s: 1.2, o: 0 },
            rails: { art: "w-rails", o: 0 }, train: { art: "🚂", at: [-30, 84], s: 1.6, o: 0, flip: true },
            bus: { art: "w-bus", at: [600, 84], s: 1.1, o: 0 }, plane: { art: "✈️", at: [-20, 30], s: 1, o: 0 }
          },
          scenes: [
            { caption: "خیلی وقت پیش، مردم پیاده سفر می‌کردند و بارشان را شتر و قاطر می‌برد. به این گروه، کاروان می‌گفتند.", key: 5000, hold: 8000, do: [
              { id: "c1", to: { x: 160 }, dur: 7600, ease: "linear" }, { id: "c2", to: { x: 140 }, dur: 7600, ease: "linear" }, { id: "mule", to: { x: 122 }, dur: 7600, ease: "linear" },
              { id: "man", walk: [176, 84], dur: 7600 }, { cam: { x: 120 }, at: 1000, dur: 6600, ease: "linear" }] },
            { caption: "شب‌ها در کاروانسرا می‌ماندند تا خستگی در کنند.", key: 4600, hold: 6400, do: [
              { id: "c1", to: { x: 296 }, dur: 4400, ease: "linear" }, { id: "c2", to: { x: 280 }, dur: 4400, ease: "linear" }, { id: "mule", to: { x: 266 }, dur: 4400, ease: "linear" },
              { id: "man", walk: [308, 84], dur: 4400 }, { cam: { x: 290 }, dur: 4400, ease: "linear" },
              { id: "c1", to: { o: 0 }, at: 4600, dur: 500 }, { id: "c2", to: { o: 0 }, at: 4700, dur: 500 }, { id: "mule", to: { o: 0 }, at: 4800, dur: 500 }, { id: "man", to: { o: 0 }, at: 4800, dur: 500 }] },
            { caption: "با کاروان، سفر از تهران تا مشهد حدود یک ماه طول می‌کشید!", key: 5400, hold: 6400, do: [
              { id: "count", to: { o: 1 }, dur: 300 }, { count: "count", from: 1, to: 30, at: 400, dur: 5000 }] },
            { caption: "بعد قطار آمد. قطار خیلی تندتر بود و آدم‌ها و بار زیادی را می‌برد.", key: 3200, hold: 5800, do: [
              { id: "count", to: { o: 0 }, dur: 300 }, { cam: { x: 80 }, dur: 1 }, { id: "rails", to: { o: 1 }, dur: 500 },
              { id: "train", to: { o: 1 }, at: 400, dur: 200 }, { id: "train", to: { x: 220 }, at: 400, dur: 4800, ease: "linear" },
              { emit: "bubble", from: "train", where: [0, -32], spread: [4, 2], n: 14, rise: 12, at: 600, dur: 4400 }] },
            { caption: "امروز با اتوبوس حدود یک روز، و با هواپیما کمتر از دو ساعت طول می‌کشد.", key: 3600, hold: 6000, do: [
              { id: "rails", to: { o: 0 }, dur: 400 }, { id: "bus", to: { x: 120, o: 1 }, dur: 1 }, { id: "bus", to: { x: 40 }, at: 300, dur: 2800 },
              { id: "bus.w1", to: { r: -720 }, at: 300, dur: 2800 }, { id: "bus.w2", to: { r: -720 }, at: 300, dur: 2800 },
              { id: "plane", to: { o: 1 }, at: 2400, dur: 200 }, { id: "plane", path: "M-20 40Q80 6 190 20", at: 2400, dur: 2800, ease: "linear" }] }
          ],
          question: "در قدیم، کاروان‌ها شب‌ها کجا می‌ماندند؟", pic: true,
          options: [{ label: "🏨", value: "هتل" }, { label: "🏰", value: "کاروانسرا" }, { label: "🚉", value: "ایستگاه قطار" }], answer: "کاروانسرا" },
        { type: "sort", prompt: "قدیم یا امروز؟", say: "این وسیله سفر مال قدیم است یا امروز؟",
          baskets: [{ pic: "👴", label: "قدیم", value: "then" }, { pic: "🧒", label: "امروز", value: "now" }],
          items: [
            { pic: "🐫", say: "کاروان شتر", basket: "then" },
            { pic: "🐴", say: "قاطر و اسب برای سفر", basket: "then" },
            { pic: "🏰", say: "ماندن در کاروانسرا", basket: "then" },
            { pic: "✈️", say: "هواپیما", basket: "now" },
            { pic: "🚇", say: "مترو", basket: "now" },
            { pic: "🚗", say: "ماشین", basket: "now" }
          ] },
        { type: "order", prompt: "از کند به تند", say: "کدام کندتر است؟ از کندترین تا تندترین به ترتیب بچین.", numbered: true,
          items: [{ pic: "🚶", say: "پیاده" }, { pic: "🐫", say: "کاروان شتر" }, { pic: "🚂", say: "قطار" }, { pic: "✈️", say: "هواپیما" }] }
      ]
    },

    /* Sources: messages then and now (Iran's third-grade social studies, lesson 22; Herodotus, Histories 8.98 on the
       Persian relay riders, «چاپار»; Encyclopaedia Iranica, "Čāpār"). Riders changed to fresh horses at relay
       stations (چاپارخانه). Letters and the post office; the telephone; a message today. */
    {
      id: "world-sprout-30", subject: "world", level: "sprout", emoji: "✉️", title: "از چاپار تا پیام",
      steps: [
        { type: "scene", prompt: "پیام از راه دور", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-sky-hills", depth: 0 }, ground: { art: "w-steppe" },
            rider: { art: "🏇", at: [-10, 84], s: 1.3, flip: true }, house: { art: "w-chapar-house", at: [200, 84], s: 1.2 }, horse2: { art: "🐎", at: [224, 84], s: 1.1 },
            street: { art: "w-street", o: 0 }, box: { art: "w-mailbox", at: [70, 72], s: 1.2, o: 0 }, kid: { art: "w-hasti", at: [50, 74], s: 1, o: 0 }, letter: { art: "✉️", at: [56, 60], s: 0.35, o: 0 },
            postman: { art: "w-postman", at: [110, 74], s: 1, o: 0 }, cal: { art: "w-calendar", at: [136, 22], s: 1.1, o: 0 },
            room: { art: "w-room2", o: 0 }, phone: { art: "☎️", at: [80, 70], s: 0.8, o: 0 }, granS: { art: "w-gran-sit", at: [110, 84], s: 1.2, o: 0 },
            room2: { art: "w-room", o: 0 }, kp: { art: "w-kid-phone", at: [40, 86], s: 1.15, o: 0 }, gp: { art: "w-gran-phone", at: [120, 86], s: 1.15, o: 0 }, split: { art: "w-split", o: 0 },
            msg: { art: "w-bubble", at: [52, 40], s: 0.6, o: 0 }, heart: { art: "w-heart", at: [52, 40], s: 0.6, o: 0 }
          },
          scenes: [
            { caption: "خیلی خیلی وقت پیش، در ایران چاپارها نامه‌ها را می‌بردند. چاپار سوار اسب، تند می‌تاخت.", key: 2600, hold: 6400, do: [
              { id: "rider", to: { x: 186 }, dur: 6000, ease: "linear" }, { cam: { x: 150 }, at: 600, dur: 5400, ease: "linear" }] },
            { caption: "در هر چاپارخانه، یک اسب تازه آماده بود. چاپار سوار اسب تازه می‌شد و دوباره می‌تاخت.", key: 3600, hold: 6000, do: [
              { id: "rider", to: { o: 0 }, dur: 500 }, { id: "horse2", to: { o: 0 }, at: 1600, dur: 1 }, { id: "rider", to: { x: 224, o: 1 }, at: 1600, dur: 1 },
              { id: "rider", to: { x: 360 }, at: 2200, dur: 3400, ease: "in" }, { cam: { x: 280 }, at: 2200, dur: 3400, ease: "in" }] },
            { caption: "بعدها، نامه را در صندوق پست می‌انداختیم. نامه‌رسان آن را می‌برد. چند روز طول می‌کشید.", key: 5000, hold: 6800, do: D(
              [{ cam: { x: 80 }, dur: 1 }, { id: "sky", to: { o: 0 }, dur: 1 }, { id: "ground", to: { o: 0 }, dur: 1 }, { id: "house", to: { o: 0 }, dur: 1 }, { id: "rider", to: { o: 0 }, dur: 1 }, { id: "horse2", to: { o: 0 }, dur: 1 }],
              show(["street", "box", "kid", "letter"], 0, 600),
              [{ id: "letter", path: "M56 60Q64 50 70 52", at: 1000, dur: 800 }, { id: "letter", to: { o: 0 }, at: 1800, dur: 200 }],
              show(["postman", "cal"], 2400, 400), [{ count: "cal", from: 1, to: 4, at: 2800, dur: 3200 }], walk("postman", { x: 140 }, 3000, 2600)) },
            { caption: "بعد تلفن آمد. حالا می‌شد صدای کسی را از راه دور شنید.", key: 3600, hold: 5800, do: D(
              hide(["street", "box", "kid", "postman", "cal"]), show(["room", "phone", "granS"], 0, 700),
              [{ id: "phone", to: { r: 8 }, at: 1000, dur: 1600, yoyo: true, times: 8 }, { id: "granS.armL", to: { r: 70 }, at: 2800, dur: 500 }], talk("granS", 3400, 2000)) },
            { caption: "امروز با یک پیام، همان لحظه عکس و صدایمان را برای مادربزرگ می‌فرستیم.", key: 4600, hold: 6800, do: D(
              hide(["room", "phone", "granS"]), show(["room2", "split", "kp", "gp"], 0, 700),
              [{ id: "kp.armR", to: { r: -120 }, at: 900, dur: 500 }, { id: "gp.armR", to: { r: -120 }, at: 900, dur: 500 },
                { id: "heart", to: { o: 1 }, at: 1800, dur: 200 }, { id: "heart", path: "M52 40Q80 20 120 40", at: 2000, dur: 1600 },
                { id: "gp.smile", to: { o: 0 }, at: 3800, dur: 200 }, { id: "gp.laugh", to: { o: 1 }, at: 3800, dur: 200 }]) }
          ] },
        { type: "order", prompt: "پیام‌ها، از قدیم تا امروز", say: "پیام‌ها چطور فرستاده می‌شدند؟ از قدیم تا امروز به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏇", say: "چاپار سوار اسب" }, { pic: "📮", say: "نامه و صندوق پست" }, { pic: "☎️", say: "تلفن" }, { pic: "📱", say: "پیام با تلفن همراه" }] },
        { type: "sort", prompt: "کدام زودتر می‌رسد؟", say: "این پیام زود می‌رسد یا چند روز طول می‌کشد؟",
          baskets: [{ pic: "⚡", label: "همان لحظه", value: "fast" }, { pic: "🗓️", label: "چند روز", value: "slow" }],
          items: [
            { pic: "📱", say: "پیام با تلفن همراه", basket: "fast" },
            { pic: "☎️", say: "تلفن", basket: "fast" },
            { pic: "✉️", say: "نامه با پست", basket: "slow" },
            { pic: "🏇", say: "نامه با چاپار", basket: "slow" }
          ] },
        home({ pic: "💌 🖍️", text: "برای یکی از اقوام کارت بنویس.",
          need: ["یک برگ کاغذ یا مقوا", "مداد رنگی", "اگر خواستید: پاکت و تمبر"],
          steps: [
            "کودک برای پدربزرگ، مادربزرگ یا یکی از اقوام یک کارت بکشد. شما یک جمله کوتاه برایش بنویسید.",
            "اگر می‌شود، کارت را با پست بفرستید و بشمارید چند روز طول می‌کشد. یا خودتان ببرید.",
            "از پدربزرگ و مادربزرگ بپرسید: «بچه که بودید، چطور برای کسی که دور بود پیغام می‌فرستادید؟»"
          ],
          ask: "کارتت را برای چه کسی فرستادی؟" })
      ]
    },

    /* Sources: oral history, the first step (NCSS C3 D2.His.10.K–2; England KS1 history, "changes within living
       memory"; Iran's third-grade social studies, lessons 1–2). Grandparents' childhood games (الک‌دولک، هفت‌سنگ،
       طناب‌بازی، قصه‌های رادیو) and school. The parent note keeps the interview to everyday life: games, school, food,
       home; no politics or hard times. */
    {
      id: "world-sprout-31", subject: "world", level: "sprout", emoji: "👵", title: "بازی‌های پدربزرگ و مادربزرگ",
      steps: [
        { type: "talk", scene: "👵 👴 🧒 💬", caption: "وقتی پدربزرگ و مادربزرگ بچه بودند، چه بازی‌هایی می‌کردند؟ مدرسه‌شان چه شکلی بود؟ امروز از آن‌ها بپرس!" },
        { type: "timeline", prompt: "قدیم، کمی قدیم، امروز", say: "هر چیز را سر جایش روی خط زمان بگذار: خیلی قدیم، وقتی پدربزرگ و مادربزرگ بچه بودند، یا امروز.",
          bands: [{ label: "خیلی قدیم", en: "long, long ago", pic: "🏰" }, { label: "وقتی پدربزرگ و مادربزرگ بچه بودند", en: "when Grandma and Grandpa were children", pic: "👵" }, { label: "امروز", en: "today", pic: "🧒" }],
          items: [
            { pic: "🏇", say: "چاپار سوار اسب", band: 0 },
            { pic: "🐫", say: "کاروان شتر", band: 0 },
            { pic: "📻", say: "قصه‌های رادیو", band: 1 },
            { pic: "☎️", say: "تلفن سیم‌دار", band: 1 },
            { pic: "📱", say: "تلفن همراه", band: 2 },
            { pic: "💻", say: "رایانه", band: 2 }
          ] },
        { type: "sort", prompt: "بازی‌ها: قدیم، امروز، یا هر دو؟", say: "این بازی را بیشتر بچه‌های قدیم بازی می‌کردند، بچه‌های امروز، یا هر دو؟",
          baskets: [{ pic: "👴", label: "قدیم", value: "then" }, { pic: "🧒", label: "امروز", value: "now" }, { pic: "🤝", label: "هر دو", value: "both" }],
          items: [
            { pic: "🏏", say: "الک‌دولک", basket: "then" },
            { pic: "📻", say: "گوش دادن به قصه رادیو", basket: "then" },
            { pic: "🎮", say: "بازی رایانه‌ای", basket: "now" },
            { pic: "📱", say: "بازی با تبلت", basket: "now" },
            { pic: "🪢", say: "طناب‌بازی", basket: "both" },
            { pic: "🪨", say: "هفت‌سنگ", basket: "both" }
          ] },
        { type: "sort", prompt: "مدرسه: قدیم یا امروز؟", say: "این مال مدرسه‌های قدیم است، یا امروز؟",
          baskets: [{ pic: "👴", label: "قدیم", value: "then" }, { pic: "🧒", label: "امروز", value: "now" }],
          items: [
            { pic: "✒️", say: "قلم و دوات برای نوشتن", basket: "then" },
            { pic: "🪵", say: "نیمکت چوبی بلند برای چند نفر", basket: "then" },
            { pic: "🖥️", say: "رایانه در کلاس", basket: "now" },
            { pic: "🖊️", say: "خودکار", basket: "now" }
          ] },
        home({ pic: "🎤 👵", text: "با پدربزرگ یا مادربزرگ گفت‌وگو کن.",
          need: ["یک وقت آرام با پدربزرگ یا مادربزرگ (یا تلفنی)", "اگر خواستید: گوشی برای ضبط صدا"],
          steps: [
            "کودک این سؤال‌ها را بپرسد: «بچه که بودید چه بازی می‌کردید؟»، «مدرسه‌تان چه شکلی بود؟»، «غذای مورد علاقه‌تان چه بود؟»، «خانه‌تان چطور بود؟»",
            "اگر اجازه دادند، صدایشان را برای خانواده ضبط کنید.",
            "یکی از بازی‌های قدیمی را که تعریف کردند با هم بازی کنید."
          ],
          ask: "پدربزرگ یا مادربزرگت بچه که بودند چه بازی‌ای می‌کردند؟" }),
        { type: "forparents", guide: "offscreen", guideLabel: "یادگیری بیرون از صفحه، در راهنمای والدین",
          tips: [
            "این اولین «تاریخ شفاهی» کودک است: گوش دادن به آدم‌ها و پرسیدن سؤال.",
            "گفت‌وگو را در زندگی روزانه نگه دارید: بازی، مدرسه، غذا، خانه، محله. از سیاست و روزهای سخت نپرسید.",
            "اگر پدربزرگ و مادربزرگ در دسترس نیستند، هر بزرگ‌تر دیگری هم خوب است."
          ] }
      ]
    },

    /* Sources: significant people and what we still have from them (England KS1 history, "the lives of significant
       individuals … who have contributed to national and international achievements"). Ibn Sina (Avicenna, about
       980–1037): «قانون در طب», used in medical schools for centuries; Ferdowsi (about 940–1020): the Shahnameh, finished
       about 1010 (Zal and the Simorgh, a gentle story); Parvin E'tesami (1285–1320 SH), poet, poems of kindness and
       justice for young and old; Karl Drais built the "running machine", the first two-wheeled bicycle, in 1817. No
       politics, no religion, no battles. */
    {
      id: "world-sprout-32", subject: "world", level: "sprout", emoji: "📖", title: "آدم‌هایی که دنیا را بهتر کردند",
      steps: [
        { type: "scene", prompt: "هدیه‌هایی از گذشته", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room3" }, desk: { art: "w-writing-desk", at: [70, 84], s: 1.6 },
            ibn: { art: "w-ibnsina", at: [100, 86], s: 1.2 }, patient: { art: "w-boy-sit", at: [40, 86], s: 1.1 },
            ferd: { art: "w-ferdowsi", at: [100, 86], s: 1.2, o: 0 }, book: { art: "w-simorgh-book", at: [56, 74], s: 1.3, o: 0 },
            parvin: { art: "w-parvin", at: [100, 86], s: 1.2, o: 0 }, kidsR: { art: "w-girl2-sit", at: [40, 86], s: 1.1, o: 0 }, kidsR2: { art: "w-boy3-sit", at: [58, 86], s: 1.1, o: 0 },
            meadow: { art: "w-meadow", o: 0 }, drais: { art: "w-draisine", at: [-20, 86], s: 1.5, o: 0 }, rider: { art: "🧍‍♂️", at: [-20, 82], s: 0.95, o: 0, look: { top: "#5a5f7a" } },
            g1: { art: "📕", at: [24, 50], s: 0.8, o: 0 }, g2: { art: "📖", at: [60, 50], s: 0.8, o: 0 }, g3: { art: "📝", at: [96, 50], s: 0.8, o: 0 }, g4: { art: "🚲", at: [132, 50], s: 0.8, o: 0 }
          },
          scenes: [
            { caption: "هزار سال پیش، ابن‌سینا پزشک بود. بیماران را درمان می‌کرد و کتاب بزرگی درباره پزشکی نوشت. پزشکان صدها سال از آن کتاب یاد می‌گرفتند.", key: 5600, hold: 8400, do: D(
              [{ id: "ibn.armR", to: { r: 60 }, at: 1000, dur: 600 }, { id: "patient.head", to: { r: -8 }, at: 1600, dur: 600 }, { id: "ibn.armR", to: { r: 0 }, at: 3400, dur: 500 },
                { id: "ibn.armL", to: { r: 40 }, at: 4200, dur: 2400, yoyo: true, times: 4 }, pulse("desk", 4600, 1.08)]) },
            { caption: "فردوسی شاهنامه را سرود: کتابی پر از داستان‌های قدیمی ایران، مثل داستان زال و سیمرغ.", key: 4600, hold: 7400, do: D(
              hide(["ibn", "patient"]), show(["ferd"], 300, 600), show(["book"], 1800, 600),
              [{ id: "ferd.armR", to: { r: 50 }, at: 1000, dur: 2400, yoyo: true, times: 6 }, pulse("book", 3600, 1.1)]) },
            { caption: "پروین اعتصامی شاعر بود. شعرهایش برای بچه‌ها و بزرگ‌ترها پر از مهربانی است.", key: 4400, hold: 6800, do: D(
              hide(["ferd", "book"]), show(["parvin", "kidsR", "kidsR2"], 300, 600), talk("parvin", 1400, 3400),
              [{ id: "kidsR.head", to: { r: 8 }, at: 1600, dur: 600 }, { id: "kidsR2.head", to: { r: 8 }, at: 1800, dur: 600 }]) },
            { caption: "حدود دویست سال پیش، مردی به نام دِرِیس اولین دوچرخه را ساخت. رکاب نداشت: سوارش با پا روی زمین هل می‌داد!", key: 4400, hold: 7400, do: D(
              hide(["room", "desk", "parvin", "kidsR", "kidsR2"]), show(["meadow", "drais", "rider"], 0, 700),
              [{ id: "drais", to: { x: 180 }, at: 600, dur: 6400, ease: "linear" }], walk("rider", { x: 180 }, 600, 6400)) },
            { caption: "ما هنوز از کارهای آن‌ها استفاده می‌کنیم: کتاب پزشکی، داستان، شعر و دوچرخه.", key: 4400, hold: 6000, do: D(
              hide(["drais", "rider"]), show(["g1"], 600, 400), show(["g2"], 1400, 400), show(["g3"], 2200, 400), show(["g4"], 3000, 400)) }
          ] },
        { type: "pairs", prompt: "هر کس چه هدیه‌ای به ما داد؟", say: "هر کس را با چیزی که به ما داد جفت کن. روی کارت‌ها بزن تا بشنوی.",
          pairs: [
            [{ label: "ابن‌سینا", say: "ابن‌سینا" }, { pic: "🩺", say: "کتاب پزشکی" }],
            [{ label: "فردوسی", say: "فردوسی" }, { pic: "📖", say: "شاهنامه، داستان‌های ایران" }],
            [{ label: "پروین اعتصامی", say: "پروین اعتصامی" }, { pic: "📝", say: "شعرهای مهربان" }],
            [{ label: "دریس", say: "دریس" }, { pic: "🚲", say: "اولین دوچرخه" }]
          ] },
        { type: "timeline", prompt: "کدام قدیمی‌تر است؟", say: "هر کس را سر جایش روی خط زمان بگذار: خیلی قدیم، قدیم، یا نزدیک‌تر به امروز.",
          bands: [{ label: "هزار سال پیش", en: "a thousand years ago", pic: "🏰" }, { label: "دویست سال پیش", en: "two hundred years ago", pic: "🕯️" }, { label: "صد سال پیش", en: "a hundred years ago", pic: "📻" }],
          items: [
            { pic: "🩺", label: "ابن‌سینا", en: "Ibn Sina", say: "ابن‌سینا", band: 0 },
            { pic: "📖", label: "فردوسی", en: "Ferdowsi", say: "فردوسی", band: 0 },
            { pic: "🚲", label: "دریس", en: "Drais", say: "دریس و اولین دوچرخه", band: 1 },
            { pic: "📝", label: "پروین", en: "Parvin", say: "پروین اعتصامی", band: 2 }
          ] },
        home({ pic: "📖 👂", text: "با هم یک داستان از شاهنامه یا یک شعر کوتاه بخوانید.",
          need: ["یک کتاب داستان‌های شاهنامه برای کودکان، یا شعری از پروین اعتصامی"],
          steps: [
            "داستان زال و سیمرغ یا یک شعر کوتاه پروین را با هم بخوانید یا تعریف کنید.",
            "بپرسید: «این داستان چند سال پیش نوشته شده؟ چرا هنوز آن را می‌خوانیم؟»",
            "کودک یک تصویر از داستان بکشد."
          ],
          ask: "اگر تو چیزی برای آدم‌های آینده می‌ساختی، چه بود؟" })
      ]
    },

    /* Sources: a child's day elsewhere compared with mine (Bishop 1990, windows and mirrors; Derman-Sparks; England KS1
       geography, "compare a small area of the United Kingdom with a small area in a contrasting non-European country").
       Facts: Tokyo first-graders often walk to school in neighbourhood groups and wear yellow hats; Cairo breakfast of
       ful and ta'ameya with bread; Mexico City: tortillas and eggs, the metro; a village in India: roti and dal, walking
       past the fields, cricket. Time zones: 9 pm in Tokyo is 6 am in Mexico City. Teacher review: names and details. */
    {
      id: "world-sprout-33", subject: "world", level: "sprout", emoji: "🕘", title: "یک روز با بچه‌ای در دنیا",
      steps: [
        (function () {
          var K = [{ id: "y", kid: "w-yuki", x: 141, food: "🍚" }, { id: "n", kid: "w-nour", x: 101, food: "🧆" }, { id: "m", kid: "w-mateo", x: 61, food: "🌮" }, { id: "r", kid: "w-raju", x: 21, food: "🫓" }];
          var parts = { meadow: { art: "w-meadow" }, night: { art: "w-sky-night", o: 0 },
            t1: { art: "توکیو", at: [141, 10], s: 0.24 }, t2: { art: "قاهره", at: [101, 10], s: 0.24 }, t3: { art: "مکزیکوسیتی", at: [61, 10], s: 0.24 }, t4: { art: "روستایی در هند", at: [21, 10], s: 0.22 } };
          K.forEach(function (k) {
            parts[k.id + "PH"] = { art: "w-panel-home", at: [k.x, 47], o: 0 };
            parts[k.id + "T"] = { art: "w-table", at: [k.x, 76], s: 0.75, o: 0 };
            parts[k.id + "E"] = { art: k.kid + "-sit", at: [k.x - 6, 68], s: 0.7, o: 0 };
            parts[k.id + "F"] = { art: k.food, at: [k.x, 66], s: 0.3, o: 0 };
            parts[k.id + "PS"] = { art: "w-panel-school", at: [k.x, 47], o: 0 };
            parts[k.id + "B"] = { art: k.kid + "-bag", at: [k.x + 14, 74], s: 0.62, o: 0 };
            parts[k.id + "PP"] = { art: "w-panel-play", at: [k.x, 47], o: 0 };
            parts[k.id + "K"] = { art: k.kid, at: [k.x + 3, 74], s: 0.62, o: 0 };
            parts[k.id + "Z"] = { art: "w-zzz", at: [k.x + 6, 50], s: 1.2, o: 0 };
          });
          parts.yG1 = { art: "w-boy-bag", at: [154, 74], s: 0.55, o: 0 };
          parts.mMetro = { art: "w-metro", at: [75, 72], s: 0.45, o: 0 };
          parts.nBus = { art: "w-schoolbus", at: [115, 72], s: 0.5, o: 0 };
          parts.rope = { art: "🪢", at: [148, 70], s: 0.4, o: 0 };
          parts.ballN = { art: "w-ball", at: [96, 70], s: 0.8, o: 0 }; parts.ballM = { art: "w-ball", at: [56, 70], s: 0.8, o: 0 };
          parts.bat = { art: "🏏", at: [28, 66], s: 0.4, o: 0 };
          parts.sun = { art: "w-sun", at: [21, 26], s: 0.5, o: 0 }; parts.sun2 = { art: "w-sun", at: [61, 26], s: 0.5, o: 0 };
          parts.moon = { art: "w-moon", at: [141, 26], s: 0.7, o: 0 }; parts.sun3 = { art: "w-sun", at: [101, 26], s: 0.5, o: 0 };
          var all = function (f) { return D.apply(null, K.map(f)); };
          return { type: "scene", prompt: "یک روز در چهار جای دنیا", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "این‌ها یوکی از توکیو، نور از قاهره، ماتئو از مکزیکوسیتی و راجو از روستایی در هند هستند.", key: 5000, hold: 7000, do: D(
                all(function (k, i) { return show([k.id + "PP", k.id + "K"], 600 + i * 900, 400).concat(wave(k.id + "K", 1000 + i * 900, 1200)); })) },
              { caption: "صبح، همه صبحانه می‌خورند. یوکی برنج، نور فلافل و فول، ماتئو تورتیا و تخم‌مرغ، و راجو نان و عدس.", key: 5200, hold: 8000, do: D(
                all(function (k) { return hide([k.id + "PP", k.id + "K"]).concat(show([k.id + "PH", k.id + "T", k.id + "E", k.id + "F"], 300, 600)); }),
                all(function (k, i) { return [pulse(k.id + "F", 1600 + i * 1200, 1.3)].concat(eat(k.id + "E", 1800 + i * 1200, 1, "armR")); })) },
              { caption: "یوکی با بچه‌های محله پیاده به مدرسه می‌رود. نور با اتوبوس، ماتئو با مترو، و راجو پیاده از کنار مزرعه‌ها.", key: 5600, hold: 8000, do: D(
                all(function (k) { return hide([k.id + "PH", k.id + "T", k.id + "E", k.id + "F"]).concat(show([k.id + "PS", k.id + "B"], 300, 500)); }),
                show(["yG1", "nBus", "mMetro"], 600, 400),
                walk("yB", { x: 138 }, 1200, 2400), walk("yG1", { x: 148 }, 1200, 2400),
                [{ id: "nBus", to: { x: 104 }, at: 2400, dur: 1600 }, { id: "mMetro", to: { x: 62 }, at: 3600, dur: 1600 }],
                walk("rB", { x: 18 }, 4400, 2400)) },
              { caption: "بعد از مدرسه بازی می‌کنند: یوکی طناب‌بازی، نور و ماتئو فوتبال، و راجو کریکت.", key: 4200, hold: 6600, do: D(
                hide(["yG1", "nBus", "mMetro"]), all(function (k) { return hide([k.id + "PS", k.id + "B"]).concat(show([k.id + "PP", k.id + "K"], 300, 500)); }),
                show(["rope", "ballN", "ballM", "bat"], 600, 400),
                [{ id: "yK", to: { y: "-3" }, at: 1200, dur: 4000, yoyo: true, times: 10 },
                  { id: "ballN", path: "M96 70Q104 56 110 70", at: 1400, dur: 900 }, { id: "ballM", path: "M56 70Q64 54 70 70", at: 1800, dur: 900 },
                  { id: "rK.armR", to: { r: -120 }, at: 1600, dur: 400 }, { id: "rK.armR", to: { r: -40 }, at: 2000, dur: 300 }]) },
              { caption: "وقتی شب است و یوکی در توکیو می‌خوابد، ماتئو در مکزیکوسیتی تازه بیدار شده! زمین می‌چرخد و هر جا یک وقت روز است.", key: 5000, hold: 8000, do: D(
                hide(["rope", "ballN", "ballM", "bat"]), show(["moon", "sun3", "sun", "sun2"], 600, 600),
                [{ id: "yZ", to: { o: 1 }, at: 1800, dur: 400 }, { id: "mK.armL", to: { r: 160 }, at: 3400, dur: 600 }, { id: "mK.armR", to: { r: -160 }, at: 3400, dur: 600 },
                  { id: "yK.eyes", to: { o: 0 }, at: 1600, dur: 300 }, { id: "yK.shut", to: { o: 1 }, at: 1600, dur: 300 },
                 ],
                wave("rK", 4400, 1600)) }
            ],
            question: "یوکی چطور به مدرسه می‌رود؟", pic: true,
            options: [{ label: "🚶", value: "پیاده با بچه‌های محله" }, { label: "🚇", value: "با مترو" }, { label: "🚌", value: "با اتوبوس" }], answer: "پیاده با بچه‌های محله" };
        })(),
        { type: "sort", prompt: "مثل روز من یا فرق دارد؟", say: "روز تو را با روز این بچه‌ها مقایسه کن: این مثل روز توست، یا فرق دارد؟",
          baskets: [{ pic: "🤝", label: "مثل هم", value: "same" }, { pic: "🌈", label: "فرق دارد", value: "diff" }],
          items: [
            { pic: "🍳", say: "صبحانه خوردن", basket: "same" },
            { pic: "🎒", say: "رفتن به مدرسه یا مهد", basket: "same" },
            { pic: "😴", say: "خوابیدن شب", basket: "same" },
            { pic: "🌮", say: "تورتیا خوردن", basket: "diff" },
            { pic: "🏏", say: "کریکت بازی کردن", basket: "diff" },
            { pic: "🟡", say: "کلاه زرد مدرسه", basket: "diff" }
          ] },
        { type: "pairs", prompt: "هر بچه، هر کشور", say: "هر بچه را با پرچم کشورش جفت کن.",
          pairs: [
            [{ pic: "👧🏻", say: "یوکی، از توکیو" }, { flag: "jp" }],
            [{ pic: "👧🏽", say: "نور، از قاهره" }, { flag: "eg" }],
            [{ pic: "👦🏽", say: "ماتئو، از مکزیکوسیتی" }, { flag: "mx" }],
            [{ pic: "👦🏾", say: "راجو، از روستایی در هند" }, { flag: "in" }]
          ] },
        { type: "order", prompt: "روز من", say: "روز خودت را به ترتیب بچین: اول چه کار می‌کنی؟ بعد چه؟", numbered: true,
          items: [{ pic: "🌅", say: "بیدار شدن" }, { pic: "🍳", say: "صبحانه" }, { pic: "🎒", say: "مدرسه یا مهد" }, { pic: "⚽", say: "بازی" }, { pic: "🌙", say: "خواب" }] },
        { type: "talk", scene: "👧🏻 👧🏽 👦🏽 👦🏾 🧒", caption: "روز تو با روز یوکی، نور، ماتئو و راجو چه چیزهایی مثل هم است؟ چه چیزی فرق دارد؟ دوست داری یک روز با کدامشان باشی؟" }
      ]
    },

    /* Sources: unit game practising world-sprout-17, 18, 29, 30 and 33 (continents and oceans, hot and cold places,
       then and now, children of the world). World map js/maps/world.js; flags js/maps/flags.js. */
    {
      id: "world-sprout-34", subject: "world", level: "sprout", emoji: "🎲", title: "بازی دور دنیا",
      steps: [
        { type: "map", map: "world", layers: ["continents", "oceans"], say: "قاره‌ها را پیدا کن.",
          tasks: [
            { find: "asia", prompt: "قاره ما، آسیا، کجاست؟" },
            { find: "europe", prompt: "اروپا کجاست؟ بالای آفریقاست." },
            { find: "south-america", prompt: "آمریکای جنوبی کجاست؟" },
            { find: "indian", prompt: "اقیانوس هند، زیر ایران، کجاست؟" }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans", "equator"], say: "گرم و سرد روی نقشه.",
          tasks: [
            { find: "equator", prompt: "خط استوا، گرم‌ترین جاها، کجاست؟" },
            { find: "antarctica", prompt: "سردترین قاره کجاست؟" }
          ] },
        { type: "sort", prompt: "جای گرم یا جای سرد؟", say: "هر چیز مال جای گرم است یا جای سرد؟",
          baskets: [{ pic: "☀️", label: "جای گرم", value: "hot" }, { pic: "❄️", label: "جای سرد", value: "cold" }],
          items: [
            { pic: "🌴", say: "درخت نخل", basket: "hot" },
            { pic: "🩳", say: "لباس نازک", basket: "hot" },
            { pic: "🐧", say: "پنگوئن", basket: "cold" },
            { pic: "🧤", say: "دستکش پشمی", basket: "cold" }
          ] },
        { type: "sort", prompt: "قدیم یا امروز؟", say: "این مال قدیم است یا امروز؟",
          baskets: [{ pic: "👴", label: "قدیم", value: "then" }, { pic: "🧒", label: "امروز", value: "now" }],
          items: [
            { pic: "🐫", say: "سفر با کاروان", basket: "then" },
            { pic: "🏇", say: "نامه با چاپار", basket: "then" },
            { pic: "✈️", say: "سفر با هواپیما", basket: "now" },
            { pic: "📱", say: "پیام با تلفن همراه", basket: "now" }
          ] },
        { type: "pairs", hidden: true, prompt: "قدیم و امروز را جفت کن", say: "کارت‌ها را برگردان. هر چیز قدیمی را با چیز امروزی که همان کار را می‌کند جفت کن.",
          pairs: [
            [{ pic: "🐫", say: "کاروان شتر" }, { pic: "🚚", say: "کامیون" }],
            [{ pic: "🏇", say: "چاپار" }, { pic: "📱", say: "پیام" }],
            [{ pic: "🐴", say: "سفر با اسب" }, { pic: "🚗", say: "سفر با ماشین" }]
          ] },
        { type: "pairs", prompt: "بچه‌های دنیا", say: "هر بچه را با پرچم کشورش جفت کن.",
          pairs: [
            [{ pic: "👦🏻", say: "هاروتو و یوکی، از ژاپن" }, { flag: "jp" }],
            [{ pic: "👧🏿", say: "وانجیرو، از کنیا" }, { flag: "ke" }],
            [{ pic: "👦🏽", say: "پدرو، از برزیل" }, { flag: "br" }],
            [{ pic: "👦🏾", say: "راجو، از هند" }, { flag: "in" }]
          ] }
      ]
    },

    // ---------------- Iran and the world: Sapling (maps, Iran's land, water, peoples, the town, long ago, the world) ----------------

    /* Sources: the eight compass points (England KS2 geography, "use the eight points of a compass"; Iran's fourth-grade
       social studies, lesson 6 «جهت‌ها»). Directions from Tehran on js/maps/iran.js: Tabriz north-west, Mashhad
       north-east, Zahedan south-east, Ahvaz south-west. */
    {
      id: "world-sapling-10", subject: "world", level: "sapling", emoji: "🧭", title: "هشت جهت",
      steps: [
        { type: "scene", prompt: "هشت جهت", bg: "#cdeaf7",
          parts: {
            rose: { art: "w-rose8", at: [80, 48], s: 1.2 },
            n: { art: "شمال", at: [80, 14], s: 0.24, o: 0 }, s: { art: "جنوب", at: [80, 88], s: 0.24, o: 0 }, e: { art: "شرق", at: [124, 50], s: 0.24, o: 0 }, w: { art: "غرب", at: [36, 50], s: 0.24, o: 0 },
            ne: { art: "شمال‌شرقی", at: [118, 22], s: 0.2, o: 0 }, se: { art: "جنوب‌شرقی", at: [118, 80], s: 0.2, o: 0 }, sw: { art: "جنوب‌غربی", at: [42, 80], s: 0.2, o: 0 }, nw: { art: "شمال‌غربی", at: [42, 22], s: 0.2, o: 0 },
            map: { art: "w-map-big", at: [80, 46], o: 0 }, teh: { art: "w-dot-teh", o: 0 },
            a1: { art: "w-arr-tabriz", o: 0 }, a2: { art: "w-arr-mashhad", o: 0 }, a3: { art: "w-arr-zahedan", o: 0 }, a4: { art: "w-arr-ahvaz", o: 0 },
            l1: { art: "تبریز", at: [46, 15], s: 0.2, o: 0 }, l2: { art: "مشهد", at: [104, 24], s: 0.2, o: 0 }, l3: { art: "زاهدان", at: [112, 64], s: 0.2, o: 0 }, l4: { art: "اهواز", at: [52, 56], s: 0.2, o: 0 },
            lt: { art: "تهران", at: [70, 27], s: 0.2, o: 0 }
          },
          scenes: [
            { caption: "چهار جهت اصلی را می‌شناسیم: شمال، جنوب، شرق و غرب.", key: 4400, hold: 6000, do: D(
              show(["n"], 1000, 400), show(["e"], 1800, 400), show(["s"], 2600, 400), show(["w"], 3400, 400)) },
            { caption: "میان آن‌ها چهار جهت دیگر هست: شمال‌شرقی، جنوب‌شرقی، جنوب‌غربی و شمال‌غربی.", key: 6000, hold: 7400, do: D(
              [{ id: "rose.diag", to: { o: 1 }, at: 800, dur: 600 }], show(["ne"], 1600, 400), show(["se"], 2800, 400), show(["sw"], 4000, 400), show(["nw"], 5200, 400)) },
            { caption: "روی نقشه، شمال بالاست. از تهران، تبریز در شمال‌غربی است.", key: 4400, hold: 6400, do: D(
              hide(["rose", "n", "s", "e", "w", "ne", "se", "sw", "nw"]), show(["map", "teh", "lt"], 300, 700),
              [{ id: "a1", to: { o: 1 }, at: 2000, dur: 100 }, { id: "a1", draw: true, at: 2000, dur: 1400 }], show(["l1"], 3400, 400)) },
            { caption: "مشهد در شمال‌شرقی تهران است.", key: 3000, hold: 4600, do: D(
              [{ id: "a2", to: { o: 1 }, at: 600, dur: 100 }, { id: "a2", draw: true, at: 600, dur: 1400 }], show(["l2"], 2000, 400)) },
            { caption: "زاهدان در جنوب‌شرقی و اهواز در جنوب‌غربی تهران است.", key: 4600, hold: 6200, do: D(
              [{ id: "a3", to: { o: 1 }, at: 600, dur: 100 }, { id: "a3", draw: true, at: 600, dur: 1400 }], show(["l3"], 2000, 400),
              [{ id: "a4", to: { o: 1 }, at: 2800, dur: 100 }, { id: "a4", draw: true, at: 2800, dur: 1400 }], show(["l4"], 4200, 400)) }
          ] },
        { type: "compass", hide: true, say: "اول جهت‌های اصلی را مرور کنیم.",
          tasks: [
            { face: "n", prompt: "رو به شمال بایست." },
            { face: "w", prompt: "حالا رو به غرب." },
            { face: "e", prompt: "خورشید صبح از کدام طرف درمی‌آید؟ رو به آن بایست.", sun: "rise" }
          ] },
        { type: "map", map: "iran", layers: ["iran", "seas"], cities: ["tehran", "tabriz", "mashhad", "zahedan", "ahvaz", "rasht", "bandar-abbas"], labels: true,
          say: "شهر را با جهتش از تهران پیدا کن.",
          tasks: [
            { find: "tabriz", prompt: "از تهران به شمال‌غربی برو. کدام شهر بزرگ آنجاست؟" },
            { find: "mashhad", prompt: "از تهران به شمال‌شرقی برو. کدام شهر؟" },
            { find: "zahedan", prompt: "از تهران به جنوب‌شرقی، نزدیک مرز. کدام شهر؟" },
            { find: "ahvaz", prompt: "از تهران به جنوب‌غربی، نزدیک خلیج فارس. کدام شهر؟" }
          ] },
        { type: "choose", prompt: "بندرعباس، کنار خلیج فارس، از تهران در کدام جهت است؟", say: "بندرعباس، کنار خلیج فارس، از تهران در کدام جهت است؟", stack: true,
          options: ["شمال‌غربی", "جنوب‌شرقی", "شمال"], answer: "جنوب‌شرقی" }
      ]
    },

    /* Sources: grid references with letters and numbers (England KS2 geography, "use … letter/number co-ordinates";
       Iran's fourth-grade social studies, lesson 6). Columns lettered from the left, as the map step draws them. */
    {
      id: "world-sapling-11", subject: "world", level: "sapling", emoji: "🔢", title: "خانه‌های نقشه",
      steps: [
        { type: "scene", prompt: "نقشه خانه‌خانه", bg: "#fffaf0",
          parts: {
            park: { art: "w-park-top" }, grid: { art: "w-grid4x3", o: 0 },
            c1: { art: "الف", at: [38, 9], s: 0.22, o: 0 }, c2: { art: "ب", at: [66, 9], s: 0.22, o: 0 }, c3: { art: "پ", at: [94, 9], s: 0.22, o: 0 }, c4: { art: "ت", at: [122, 9], s: 0.22, o: 0 },
            r1: { art: "۱", at: [18, 26], s: 0.24, o: 0 }, r2: { art: "۲", at: [18, 50], s: 0.24, o: 0 }, r3: { art: "۳", at: [18, 74], s: 0.24, o: 0 },
            colhi: { art: "w-col-hi", at: [80, 0], o: 0 }, rowhi: { art: "w-row-hi", at: [0, 12], o: 0 }, ring: { art: "w-cell-ring", at: [80, 12], o: 0 }, ring2: { art: "w-cell-ring", at: [108, 60], o: 0 }
          },
          scenes: [
            { caption: "روی نقشه پارک خط می‌کشیم و آن را خانه‌خانه می‌کنیم.", key: 3000, hold: 4800, do: [
              { id: "grid", to: { o: 1 }, at: 600, dur: 100 }, { id: "grid", draw: true, at: 600, dur: 2200 }] },
            { caption: "بالای هر ستون یک حرف می‌نویسیم و کنار هر ردیف یک عدد.", key: 4800, hold: 6000, do: D(
              show(["c1"], 600, 300), show(["c2"], 1000, 300), show(["c3"], 1400, 300), show(["c4"], 1800, 300),
              show(["r1"], 2600, 300), show(["r2"], 3000, 300), show(["r3"], 3400, 300)) },
            { caption: "حوض در ستون «پ» و ردیف «۱» است. می‌گوییم: حوض در خانه «پ ۱» است.", key: 4800, hold: 6800, do: D(
              show(["colhi"], 600, 500), show(["rowhi"], 2000, 500), show(["ring"], 3400, 400), [pulse("ring", 3800, 1.05, 900)]) },
            { caption: "حالا اگر کسی بگوید «سرسره در خانه ت ۳ است»، زود پیدایش می‌کنیم!", key: 3600, hold: 5400, do: D(
              hide(["colhi", "rowhi", "ring"]), show(["ring2"], 1600, 400), [pulse("ring2", 2000, 1.05, 900)]) }
          ] },
        { type: "map", map: "park", grid: [4, 3], say: "خانه‌های نقشه.",
          tasks: [
            { cell: [1, 1], prompt: "روی خانه «الف ۱» بزن." },
            { cell: [4, 3], prompt: "روی خانه «ت ۳» بزن." },
            { cellOf: "pond", prompt: "حوض در کدام خانه است؟" },
            { cellOf: "slide", prompt: "سرسره در کدام خانه است؟" }
          ] },
        { type: "choose", prompt: "حرف‌های بالای نقشه، ستون‌ها را نشان می‌دهند یا ردیف‌ها را؟", say: "حرف‌های بالای نقشه، ستون‌ها را نشان می‌دهند یا ردیف‌ها را؟", stack: true,
          options: ["ستون‌ها", "ردیف‌ها"], answer: "ستون‌ها" },
        { type: "choose", prompt: "اگر بگوییم «خانه ب ۲»، اول کجا را نگاه می‌کنیم؟", say: "اگر بگوییم خانه ب دو، اول کجا را نگاه می‌کنیم؟", stack: true,
          options: ["ستون «ب»، بعد ردیف «۲»", "فقط ردیف «۲»", "گوشه نقشه"], answer: "ستون «ب»، بعد ردیف «۲»" }
      ]
    },

    /* Sources: scale, a map is smaller than the land (England KS2 geography, "use … the scale bar"; NCSS C3
       D2.Geo.1.3–5). The park map (B.MAPS.park) with a scale bar of 10 metres. */
    {
      id: "world-sapling-12", subject: "world", level: "sapling", emoji: "📏", title: "نقشه کوچک، زمین بزرگ",
      steps: [
        { type: "scene", prompt: "مقیاس", bg: "#fffaf0",
          parts: {
            park: { art: "w-park-top" }, kid: { art: "🧒", at: [86, 50], s: 0.6, o: 0 }, paper: { art: "paper", o: 0 },
            bar: { art: "w-scale-bar", at: [30, 86], s: 1.2, o: 0 }, b10: { art: "۱۰ متر", at: [37, 82], s: 0.18, o: 0 },
            step1: { art: "w-ruler-step", at: [38, 48], s: 1.2, r: -23, o: 0 }, step2: { art: "w-ruler-step", at: [51.2, 42.3], s: 1.2, r: -23, o: 0 }, step3: { art: "w-ruler-step", at: [64.4, 36.6], s: 1.2, r: -23, o: 0 }, step4: { art: "w-ruler-step", at: [77.6, 30.9], s: 1.2, r: -23, o: 0 }
          },
          scenes: [
            { caption: "این پارک از بالاست. روی زمین، پارک خیلی بزرگ است. بچه‌ها چند دقیقه طول می‌کشد از این سر تا آن سرش بدوند.", key: 3400, hold: 6000, do: D(
              show(["kid"], 400, 400), [{ id: "kid", to: { x: 40 }, at: 1000, dur: 3600, ease: "linear" }]) },
            { caption: "ولی نقشه همان پارک را خیلی کوچک‌تر می‌کشد.", key: 3600, hold: 5400, do: D(
              hide(["kid"]), [{ id: "park", to: { s: 0.6, x: 32, y: 14 }, at: 400, dur: 2400 }]) },
            { caption: "زیر نقشه یک خط‌کش کوچک هست: هر تکه‌اش روی زمین ۱۰ متر است.", key: 3400, hold: 5400, do: D(
              [{ id: "park", to: { s: 1, x: 0, y: 0 }, dur: 1200 }], show(["bar", "b10"], 1400, 500), [pulse("bar", 2200, 1.15)]) },
            { caption: "از درخت بزرگ تا حوض را با خط‌کش نقشه اندازه می‌گیریم: چهار تکه است، یعنی ۴۰ متر.", key: 6000, hold: 7400, do: D(
              show(["step1"], 1000, 400), show(["step2"], 2200, 400), show(["step3"], 3400, 400), show(["step4"], 4600, 400)) }
          ] },
        { type: "map", map: "park", scale: { units: 40, value: 10, unit: "متر", en: "metres" }, say: "با خط‌کش نقشه اندازه بگیر.",
          tasks: [
            { distance: ["gate", "pond"], prompt: "از در پارک تا حوض حدوداً چند متر است؟" },
            { distance: ["gate", "slide"], prompt: "از در پارک تا سرسره حدوداً چند متر است؟" }
          ] },
        { type: "choose", prompt: "کدام بزرگ‌تر است: پارک روی زمین، یا نقشه پارک؟", say: "کدام بزرگ‌تر است: خود پارک، یا نقشه پارک روی کاغذ؟", pic: true,
          options: [{ label: "🌳", value: "خود پارک" }, { label: "🗺️", value: "نقشه پارک" }], answer: "خود پارک" },
        { type: "choose", prompt: "اگر هر تکه خط‌کش ۱۰ متر باشد، چهار تکه چند متر است؟", say: "اگر هر تکه خط‌کش نقشه ده متر باشد، چهار تکه چند متر است؟", stack: true,
          options: ["۱۴ متر", "۴۰ متر", "۴ متر"], answer: "۴۰ متر" }
      ]
    },

    /* Sources: physical and human features (England KS1–2 geography, "use basic geographical vocabulary to refer to
       key physical features … and key human features"; Iran's fourth-grade social studies, lesson 7). */
    {
      id: "world-sapling-13", subject: "world", level: "sapling", emoji: "🏞️", title: "ساخته طبیعت، ساخته آدم",
      steps: [
        { type: "scene", prompt: "طبیعت و آدم‌ها", bg: "#cdeaf7",
          parts: { land: { art: "w-land" } },
          scenes: [
            { caption: "این‌ها را طبیعت ساخته است: کوه، رود، دریا و جنگل.", key: 3600, hold: 5600, do: [
              pulse("land", 600, 1.02, 900)] },
            { caption: "آدم‌ها هم چیزهایی ساخته‌اند: مزرعه و جاده.", key: 3600, hold: 5400, do: [
              { id: "land.farm", to: { o: 1 }, at: 800, dur: 600 }, { id: "land.road", to: { o: 1 }, at: 2200, dur: 600 }] },
            { caption: "روی رود پل ساختند. کنار دریا شهر ساختند. کنار کوه کارخانه ساختند.", key: 5000, hold: 6600, do: [
              { id: "land.bridge", to: { o: 1 }, at: 800, dur: 600 }, { id: "land.town", to: { o: 1 }, at: 2200, dur: 600 }, { id: "land.factory", to: { o: 1 }, at: 3600, dur: 600 }] }
          ],
          question: "کدام را آدم‌ها ساخته‌اند؟", pic: true,
          options: [{ label: "⛰️", value: "کوه" }, { label: "🌉", value: "پل" }, { label: "🌊", value: "دریا" }], answer: "پل" },
        { type: "sort", prompt: "ساخته طبیعت یا ساخته آدم؟", say: "این را طبیعت ساخته، یا آدم‌ها؟",
          baskets: [{ pic: "🏔️", label: "ساخته طبیعت", value: "nature" }, { pic: "🏗️", label: "ساخته آدم", value: "human" }],
          items: [
            { pic: "⛰️", say: "کوه", basket: "nature" },
            { pic: "🏞️", say: "رود", basket: "nature" },
            { pic: "🏜️", say: "کویر", basket: "nature" },
            { pic: "🌊", say: "دریا", basket: "nature" },
            { pic: "🛣️", say: "جاده", basket: "human" },
            { pic: "🌉", say: "پل", basket: "human" },
            { pic: "🏭", say: "کارخانه", basket: "human" },
            { pic: "🌾", say: "مزرعه", basket: "human" }
          ] },
        { type: "map", map: "village", say: "روی نقشه روستا پیدا کن.",
          tasks: [
            { find: "spring", prompt: "روی نقشه، چه چیزی را طبیعت ساخته؟ چشمه را پیدا کن." },
            { find: "school", prompt: "چه چیزی را آدم‌ها ساخته‌اند؟ مدرسه را پیدا کن." },
            { find: "bakery", prompt: "نانوایی هم ساخته آدم است. پیدایش کن." }
          ] }
      ]
    },

    /* Sources: unit game practising world-sapling-10 to world-sapling-13 (eight directions, grid squares, scale,
       physical and human features). */
    {
      id: "world-sapling-14", subject: "world", level: "sapling", emoji: "🎲", title: "بازی نقشه‌خوان",
      steps: [
        { type: "compass", hide: true, say: "جهت‌ها را پیدا کن.",
          tasks: [{ face: "s", prompt: "رو به جنوب بایست." }, { face: "e", prompt: "رو به شرق بایست." }, { face: "w", prompt: "خورشید عصر کجا غروب می‌کند؟", sun: "set" }] },
        { type: "map", map: "park", grid: [4, 3], say: "خانه‌های نقشه.",
          tasks: [{ cell: [2, 2], prompt: "روی خانه «ب ۲» بزن." }, { cellOf: "tree", prompt: "درخت بزرگ در کدام خانه است؟" }, { cellOf: "gate", prompt: "در پارک در کدام خانه است؟" }] },
        { type: "sort", prompt: "ساخته طبیعت یا ساخته آدم؟", say: "این را طبیعت ساخته، یا آدم‌ها؟",
          baskets: [{ pic: "🏔️", label: "ساخته طبیعت", value: "nature" }, { pic: "🏗️", label: "ساخته آدم", value: "human" }],
          items: [
            { pic: "🌋", say: "آتشفشان", basket: "nature" },
            { pic: "🌲", say: "جنگل", basket: "nature" },
            { pic: "🚉", say: "ایستگاه قطار", basket: "human" },
            { pic: "🏘️", say: "شهر", basket: "human" }
          ] },
        { type: "pairs", prompt: "جهت‌ها را جفت کن", say: "هر جهت را با جهت روبه‌رویش جفت کن.",
          pairs: [
            [{ label: "شمال", say: "شمال" }, { label: "جنوب", say: "جنوب" }],
            [{ label: "شرق", say: "شرق" }, { label: "غرب", say: "غرب" }],
            [{ label: "شمال‌شرقی", say: "شمال‌شرقی" }, { label: "جنوب‌غربی", say: "جنوب‌غربی" }],
            [{ label: "شمال‌غربی", say: "شمال‌غربی" }, { label: "جنوب‌شرقی", say: "جنوب‌شرقی" }]
          ] },
        { type: "map", map: "park", scale: { units: 40, value: 10, unit: "متر", en: "metres" }, say: "با خط‌کش نقشه اندازه بگیر.",
          tasks: [{ distance: ["tree", "pond"], prompt: "از درخت بزرگ تا حوض حدوداً چند متر است؟" }] }
      ]
    },

    /* Sources: Iran's landforms (Iran's fourth-grade social studies, lesson 15 «ناهمواری‌های ایران»; Encyclopaedia
       Iranica, "Iran ii. Geography"). Damavand 5,610 m, Iran's highest peak; the Alborz in the north, the Zagros in the
       west and south-west; Dasht-e Kavir and the Lut (one of the hottest places on Earth). Relief map: js/maps/iran-relief.js. */
    {
      id: "world-sapling-1", subject: "world", level: "sapling", emoji: "⛰️", title: "کوه، دشت، کویر، دریا",
      steps: [
        { type: "scene", prompt: "سفر از دریای خزر تا خلیج فارس", bg: "#cdeaf7",
          parts: { land: { art: "w-iran-profile" }, car: { art: "w-car-trip", at: [78, 66], s: 1.2 } },
          scenes: [
            { caption: "سفر را از کنار دریای خزر شروع می‌کنیم. اینجا هوا مرطوب است و جنگل سبز.", key: 3000, hold: 5000, do: [
              { cam: { x: 60 }, dur: 1 }, { id: "car", to: { x: 104 }, at: 400, dur: 3600, ease: "linear" }, { cam: { x: 80 }, at: 400, dur: 3600, ease: "linear" }] },
            { caption: "از رشته‌کوه البرز می‌گذریم. دماوند، بلندترین کوه ایران، این‌جاست. قله‌اش همیشه برف دارد.", key: 4400, hold: 6400, do: [
              { id: "car", to: { x: 220 }, dur: 5000, ease: "linear" }, { cam: { x: 210 }, dur: 5000, ease: "linear" }] },
            { caption: "پایین کوه، دشت صاف است. تهران در این دشت ساخته شده.", key: 3400, hold: 5000, do: [
              { id: "car", to: { x: 300 }, dur: 3600, ease: "linear" }, { cam: { x: 290 }, dur: 3600, ease: "linear" }] },
            { caption: "به لبه دشت کویر می‌رسیم: خشک، کم‌باران و جاهایی پوشیده از نمک.", key: 3800, hold: 5800, do: [
              { id: "car", to: { x: 440 }, dur: 4400, ease: "linear" }, { cam: { x: 430 }, dur: 4400, ease: "linear" }] },
            { caption: "از رشته‌کوه زاگرس می‌گذریم: کوه‌هایی بلند و طولانی با درخت‌های بلوط.", key: 3800, hold: 6000, do: [
              { id: "car", to: { x: 580 }, dur: 4600, ease: "linear" }, { cam: { x: 570 }, dur: 4600, ease: "linear" }] },
            { caption: "و حالا به ساحل گرم خلیج فارس رسیدیم!", key: 3400, hold: 5200, do: [
              { id: "car", to: { x: 680 }, dur: 3400, ease: "out" }, { cam: { x: 680 }, dur: 3400, ease: "out" }] }
          ] },
        { type: "map", map: "iran", layers: ["relief", "landforms", "seas"], enough: 6, prompt: "این نقشه بلندی‌ها و پستی‌های ایران است. روی کوه‌ها، کویرها و دریاها بزن." },
        { type: "map", map: "iran", layers: ["relief", "landforms", "seas"], say: "روی نقشه پیدا کن.",
          tasks: [
            { find: "alborz", prompt: "رشته‌کوه البرز، شمال ایران، کجاست؟" },
            { find: "damavand", prompt: "قله دماوند، بلندترین کوه ایران، کجاست؟" },
            { find: "zagros", prompt: "رشته‌کوه زاگرس، در غرب و جنوب‌غربی، کجاست؟" },
            { find: "kavir", prompt: "دشت کویر کجاست؟" },
            { find: "lut", prompt: "کویر لوت، یکی از گرم‌ترین جاهای زمین، کجاست؟" }
          ] }
      ]
    },

    /* Sources: relief colours on a map (England KS2 geography, "use … maps … to locate … topographical features";
       the relief bands of js/maps/iran-relief.js: low green, then yellow and brown, white for the highest peaks). */
    {
      id: "world-sapling-40", subject: "world", level: "sapling", emoji: "🗻", title: "بلندی و پستی روی نقشه",
      steps: [
        { type: "scene", prompt: "رنگ‌های بلندی", bg: "#cdeaf7",
          parts: {
            ground: { art: "w-ground" }, mt: { art: "w-mountain-bands", at: [80, 78], s: 1.1 },
            eye: { art: "w-eye", at: [80, 8], s: 1.4, o: 0 }, rings: { art: "w-mountain-rings", at: [80, 46], s: 1.3, o: 0 }, relief: { art: "w-map-relief", at: [80, 46], o: 0 }
          },
          scenes: [
            { caption: "این کوه را از کنار ببین. پایینش سبز است: جاهای کم‌ارتفاع، مثل دشت کنار دریا.", key: 3000, hold: 5000, do: [pulse("mt", 1400, 1.05, 900)] },
            { caption: "هر چه بالاتر برویم، رنگ عوض می‌شود: زرد، بعد قهوه‌ای. بلندترین جا، سفید است: برف قله.", key: 3800, hold: 5800, do: [
              { id: "mt.b1", to: { o: 1 }, at: 500, dur: 700 }, { id: "mt.b2", to: { o: 1 }, at: 1500, dur: 700 }, { id: "mt.b3", to: { o: 1 }, at: 2600, dur: 700 }] },
            { caption: "حالا از بالا نگاه می‌کنیم. همان رنگ‌ها حلقه‌حلقه دیده می‌شوند. وسطش، سفید، قله است.", key: 4400, hold: 6400, do: [
              { id: "eye", to: { o: 1 }, dur: 400 }, { id: "mt", to: { sy: 0.05, o: 0 }, at: 1400, dur: 1600 }, { id: "ground", to: { o: 0 }, at: 1400, dur: 1200 },
              { id: "rings", to: { o: 1 }, at: 2600, dur: 1200 }] },
            { caption: "روی نقشه ایران هم همین رنگ‌ها هست: سبز کنار دریاها، قهوه‌ای و سفید روی کوه‌ها.", key: 3000, hold: 5000, do: [
              { id: "eye", to: { o: 0 }, dur: 400 }, { id: "rings", to: { o: 0 }, dur: 600 }, { id: "relief", to: { o: 1 }, at: 400, dur: 900 }, pulse("relief", 1600, 1.04, 900)] }
          ] },
        { type: "map", map: "iran", layers: ["relief", "landforms", "seas"], say: "رنگ‌های نقشه را بخوان.",
          tasks: [
            { find: "damavand", prompt: "بلندترین جا سفید است. قله دماوند را پیدا کن." },
            { find: "caspian", prompt: "کنار کدام دریا، زمین پست و سبز است؟ آن دریا را پیدا کن.", say: "در شمال، کنار کدام دریا زمین پست و سبز است؟ آن دریا را پیدا کن." },
            { find: "sabalan", prompt: "قله سبلان، در شمال‌غربی، کجاست؟" }
          ] },
        { type: "choose", prompt: "روی نقشه ناهمواری، رنگ سفید یعنی چه؟", say: "روی نقشه ناهمواری، رنگ سفید یعنی چه؟", stack: true,
          options: ["بلندترین قله‌ها", "دریا", "دشت کنار دریا"], answer: "بلندترین قله‌ها" },
        { type: "choose", prompt: "رنگ سبز روی نقشه ناهمواری یعنی چه؟", say: "رنگ سبز روی نقشه ناهمواری یعنی چه؟", stack: true,
          options: ["جاهای پست و کم‌ارتفاع", "جنگل", "قله کوه"], answer: "جاهای پست و کم‌ارتفاع" }
      ]
    },

    /* Sources: Iran's rivers and lakes (Iran's fourth-grade social studies, lesson 15). The Karun, Iran's longest and
       fullest river, flows past Ahvaz to the Persian Gulf; the Zayandeh Rud flows through Isfahan to the Gavkhouni
       wetland; the Sefidrud reaches the Caspian; the Aras runs along the northern border; Lake Urmia is a salt lake.
       Rivers on the map are drawn approximately. */
    {
      id: "world-sapling-15", subject: "world", level: "sapling", emoji: "🏞️", title: "رودها و دریاچه‌های ایران",
      steps: [
        { type: "scene", prompt: "رود از کجا می‌آید؟", bg: "#cdeaf7",
          parts: { course: { art: "w-river-course" }, sun: { art: "w-sun", at: [140, 16], s: 0.8, o: 0 }, cl1: { art: "🌨️", at: [28, 22], s: 1.1, o: 0 }, cl2: { art: "🌧️", at: [62, 22], s: 1, o: 0 } },
          scenes: [
            { caption: "رودها از کوه‌ها شروع می‌شوند. برف و باران روی کوه می‌بارد.", key: 3400, hold: 5400, do: [
              { id: "course.river", to: { o: 0 }, dur: 1 }, { id: "cl1", to: { o: 1 }, at: 100, dur: 500 }, { id: "cl2", to: { o: 1 }, at: 300, dur: 500 }, { emit: "drop", where: [46, 28], spread: [30, 4], rise: -10, n: 24, at: 400, dur: 4000, life: 1200 }] },
            { caption: "در بهار، برف آب می‌شود. آب از کوه پایین می‌آید و رود درست می‌شود.", key: 4000, hold: 6000, do: [
              { id: "cl1", to: { o: 0 }, dur: 600 }, { id: "cl2", to: { o: 0 }, dur: 600 }, { id: "sun", to: { o: 1 }, dur: 600 }, { id: "course.river", to: { o: 1 }, at: 800, dur: 100 }, { id: "course.river", draw: true, at: 800, dur: 3600 }] },
            { caption: "رود از کنار شهرها و مزرعه‌ها می‌گذرد و آخرش به دریا یا دریاچه می‌ریزد.", key: 3600, hold: 5400, do: [
              { emit: "bubble", where: [120, 70], spread: [10, 3], n: 10, rise: 4, at: 600, dur: 3600 }] }
          ] },
        { type: "map", map: "rivers", say: "رودها و دریاچه ایران.",
          tasks: [
            { find: "karun", prompt: "کارون، پرآب‌ترین رود ایران، از کنار اهواز می‌گذرد و به خلیج فارس می‌ریزد. پیدایش کن." },
            { find: "zayandeh", prompt: "زاینده‌رود از وسط اصفهان می‌گذرد. پیدایش کن." },
            { find: "sefid", prompt: "سفیدرود به دریای خزر می‌ریزد. پیدایش کن." },
            { find: "aras", prompt: "رود ارس در مرز شمالی ایران است. پیدایش کن." },
            { find: "urmia", prompt: "دریاچه ارومیه، دریاچه‌ای شور در شمال‌غربی، کجاست؟" }
          ] },
        { type: "pairs", prompt: "هر رود، هر شهر", say: "هر رود را با شهری که از کنارش می‌گذرد جفت کن.",
          pairs: [
            [{ label: "کارون", say: "رود کارون" }, { label: "اهواز", say: "اهواز" }],
            [{ label: "زاینده‌رود", say: "زاینده‌رود" }, { label: "اصفهان", say: "اصفهان، با پل‌های قدیمی" }],
            [{ label: "سفیدرود", say: "سفیدرود" }, { label: "گیلان", say: "گیلان، کنار دریای خزر" }],
            [{ label: "ارس", say: "رود ارس" }, { label: "جلفا", say: "جلفا، در مرز شمالی" }]
          ] }
      ]
    },

    /* Sources: weather and climate, Iran's climates (Iran's fourth-grade social studies, lessons 16–17 «آب و هوای
       ایران»). In Dey, Ardabil often has snow and frost while Chabahar is warm (often above 20 °C); Rasht is rainy;
       Yazd is dry. Why: height (mountains are colder), the sea (wet air), and how far south a place is. */
    {
      id: "world-sapling-2", subject: "world", level: "sapling", emoji: "🌦️", title: "چهار فصل در یک روز",
      steps: [
        (function () {
          var K = [{ id: "a", x: 141, bg: "w-panel-play", kid: "w-kid-coat", w: "❄️", city: "اردبیل" }, { id: "r", x: 101, bg: "w-panel-play", kid: "w-boy4", w: "🌧️", city: "رشت" },
            { id: "y", x: 61, bg: "w-panel-play", kid: "w-boy", w: "☀️", city: "یزد" }, { id: "c", x: 21, bg: "w-panel-play", kid: "w-kid-tshirt", w: "☀️", city: "چابهار" }];
          var parts = { meadow: { art: "w-meadow" } };
          K.forEach(function (k) {
            parts[k.id + "P"] = { art: k.bg, at: [k.x, 47] };
            parts[k.id + "W"] = { art: k.w, at: [k.x, 30], s: 0.6, o: 0 };
            parts[k.id + "K"] = { art: k.kid, at: [k.x, 74], s: 0.7, o: 0 };
            parts[k.id + "T"] = { art: k.city, at: [k.x, 12], s: 0.22 };
          });
          parts.umb = { art: "☂️", at: [106, 58], s: 0.5, o: 0 };
          parts.map = { art: "w-map-big", at: [80, 46], o: 0 };
          parts.mA = { art: "❄️", at: [58.9, 19.1], s: 0.7, o: 0 }; parts.mR = { art: "🌧️", at: [66, 22], s: 0.7, o: 0 };
          parts.mY = { art: "☀️", at: [80.5, 47.9], s: 0.7, o: 0 }; parts.mC = { art: "☀️", at: [105, 76], s: 0.7, o: 0 };
          return { type: "scene", prompt: "یک روز زمستان، چهار شهر", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "امروز، یک روز زمستان است. در اردبیل برف می‌بارد. آرمان پالتو و کلاه پوشیده.", key: 3600, hold: 5600, do: D(
                show(["aW", "aK"], 300, 600), [{ emit: "bubble", where: [141, 30], spread: [14, 4], rise: -16, n: 14, at: 800, dur: 4000, life: 1400 }]) },
              { caption: "در همین روز، در رشت باران می‌بارد.", key: 3000, hold: 4800, do: D(
                show(["rW", "rK", "umb"], 300, 600), [{ emit: "drop", where: [101, 30], spread: [12, 4], rise: -16, n: 14, at: 800, dur: 3600, life: 900 }]) },
              { caption: "در یزد آفتابی و خشک است، ولی هوا سرد است.", key: 3000, hold: 4800, do: D(show(["yW", "yK"], 300, 600), [pulse("yW", 1400, 1.2)]) },
              { caption: "و در چابهار، کنار دریا، هوا گرم است. کیان با تی‌شرت بازی می‌کند!", key: 3400, hold: 5400, do: D(show(["cW", "cK"], 300, 600), [pulse("cW", 1400, 1.2)], wave("cK", 2000, 1400)) },
              { caption: "هوای امروز هر جا یک جور است. به هوای همیشگی هر جا، در سال‌های زیاد، آب و هوا می‌گوییم.", key: 5000, hold: 7000, do: D(
                hide(["aP", "rP", "yP", "cP", "aW", "rW", "yW", "cW", "aK", "rK", "yK", "cK", "aT", "rT", "yT", "cT", "umb", "meadow"]), show(["map"], 300, 700),
                show(["mA"], 1800, 300), show(["mR"], 2400, 300), show(["mY"], 3000, 300), show(["mC"], 3600, 300)) },
              { caption: "چرا؟ کوه‌ها سردترند. کنار دریای خزر هوا مرطوب است. جنوب ایران گرم‌تر است.", key: 4400, hold: 6400, do: [
                pulse("mA", 600, 1.6, 900), pulse("mR", 1800, 1.6, 900), pulse("mC", 3000, 1.6, 900)] }
            ] };
        })(),
        { type: "sort", prompt: "آب و هوای هر شهر", say: "هر شهر را به آب و هوایش ببر.",
          baskets: [{ pic: "❄️", label: "سرد و کوهستانی", value: "cold" }, { pic: "🌧️", label: "معتدل و پرباران", value: "wet" }, { pic: "🏜️", label: "گرم و خشک", value: "dry" }, { pic: "🌴", label: "گرم و مرطوب کنار دریا", value: "humid" }],
          items: [
            { label: "اردبیل", say: "اردبیل", basket: "cold" },
            { label: "همدان", say: "همدان", basket: "cold" },
            { label: "رشت", say: "رشت", basket: "wet" },
            { label: "ساری", say: "ساری", basket: "wet" },
            { label: "یزد", say: "یزد", basket: "dry" },
            { label: "کرمان", say: "کرمان", basket: "dry" },
            { label: "بندرعباس", say: "بندرعباس", basket: "humid" },
            { label: "بوشهر", say: "بوشهر", basket: "humid" }
          ] },
        { type: "map", map: "iran", layers: ["iran", "seas"], cities: ["ardabil", "rasht", "yazd", "chabahar"], labels: true, say: "شهرها را پیدا کن.",
          tasks: [
            { find: "ardabil", prompt: "کدام شهر کوهستانی است و زمستان برف زیادی دارد؟ اردبیل را پیدا کن." },
            { find: "chabahar", prompt: "کدام شهر در زمستان هم گرم است؟ چابهار، کنار دریای عمان." }
          ] }
      ]
    },

    /* Sources: reading a weather forecast map with symbols (England KS1 geography, "seasonal and daily weather
       patterns"; Iran's fourth-grade social studies, lesson 16). B.MAPS.weather: a made-up winter day. */
    {
      id: "world-sapling-41", subject: "world", level: "sapling", emoji: "⛅", title: "هوای امروز",
      steps: [
        { type: "scene", prompt: "پیش‌بینی هوا", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, tv: { art: "w-tv", at: [80, 36], s: 1.1 }, imap: { art: "w-map-iran-small", at: [80, 34], s: 0.75 }, fc: { art: "w-forecaster", at: [112, 57], s: 0.5 },
            sun: { art: "☀️", at: [84.7, 50], s: 0.5, o: 0 }, rain: { art: "🌧️", at: [70.7, 24.5], s: 0.5, o: 0 }, snow: { art: "❄️", at: [62.5, 22], s: 0.5, o: 0 }, cloud: { art: "⛅", at: [76, 29], s: 0.5, o: 0 },
            kid: { art: "w-boy", at: [130, 86], s: 1.15 }, kidC: { art: "w-kid-coat", at: [130, 86], s: 1.15, o: 0 }
          },
          scenes: [
            { caption: "گوینده هواشناسی روی نقشه نشانه می‌گذارد. خورشید یعنی آفتابی. ابر و قطره یعنی بارانی.", key: 4000, hold: 6000, do: [
              { id: "fc.armL", to: { r: 70 }, at: 600, dur: 500 }, { id: "sun", to: { o: 1 }, at: 1000, dur: 400 }, pulse("sun", 1400, 1.4), { id: "rain", to: { o: 1 }, at: 2600, dur: 400 }, pulse("rain", 3000, 1.4)] },
            { caption: "دانه برف یعنی برفی. خورشید پشت ابر یعنی نیمه‌ابری.", key: 3400, hold: 5400, do: [
              { id: "snow", to: { o: 1 }, at: 800, dur: 400 }, pulse("snow", 1200, 1.4), { id: "cloud", to: { o: 1 }, at: 2200, dur: 400 }, pulse("cloud", 2600, 1.4)] },
            { caption: "فردا در تبریز برف می‌بارد. علی که در تبریز زندگی می‌کند، فردا پالتو و کلاه می‌پوشد.", key: 3600, hold: 5600, do: [
              pulse("snow", 600, 1.6), { id: "kid", to: { o: 0 }, at: 2400, dur: 500 }, { id: "kidC", to: { o: 1 }, at: 2400, dur: 500 }] }
          ] },
        { type: "map", map: "weather", say: "نقشه هوای امروز. راهنمای زیر نقشه را ببین.",
          tasks: [
            { find: "tabriz", prompt: "امروز کجا برف می‌بارد؟ یکی از شهرهای برفی را پیدا کن: تبریز." },
            { find: "rasht", prompt: "کدام شهر کنار دریای خزر بارانی است؟ رشت را پیدا کن." },
            { find: "bandar-abbas", prompt: "بندرعباس آفتابی است یا برفی؟ پیدایش کن." }
          ] },
        { type: "choose", prompt: "هوا برفی است. چه بپوشیم؟", say: "هوا برفی است. چه بپوشیم؟", pic: true,
          options: [{ label: "🩳", value: "شلوارک" }, { label: "🧥", value: "پالتو و کلاه" }, { label: "🩴", value: "دمپایی" }], answer: "پالتو و کلاه" },
        { type: "choose", prompt: "این نشانه یعنی چه: 🌧️", say: "این نشانه روی نقشه هوا یعنی چه؟", show: "🌧️", stack: true,
          options: ["آفتابی", "بارانی", "برفی"], answer: "بارانی" }
      ]
    },

    /* Sources: why towns grow where they do (Iran's fourth-grade social studies, lessons 8–9 «شهرها و روستاها»; NCSS
       C3 D2.Geo.4–6.3–5). Ahvaz on the Karun; Isfahan on the Zayandeh Rud and a wide plain; Tabriz at a crossroads of old
       trade roads; Bandar Abbas, a port on the Strait of Hormuz. */
    {
      id: "world-sapling-42", subject: "world", level: "sapling", emoji: "🏙️", title: "شهرها کجا ساخته شدند؟",
      steps: [
        { type: "scene", prompt: "شهرها کجا بزرگ می‌شوند؟", bg: "#cdeaf7",
          parts: {
            plain: { art: "w-plain-river" }, cross: { art: "w-crossroads", o: 0 }, port: { art: "w-port", o: 0 }, ship: { art: "w-ship", at: [140, 70], s: 1.3, o: 0 },
            c1: { art: "🐫", at: [-10, 50], s: 0.6, o: 0, flip: true }, c2: { art: "🐫", at: [80, -6], s: 0.6, o: 0 }
          },
          scenes: [
            { caption: "مردم کنار آب خانه می‌ساختند، چون آب برای خوردن و کشاورزی لازم است. اهواز کنار رود کارون است.", key: 4400, hold: 6400, do: [
              { id: "plain.town", to: { o: 1 }, at: 1600, dur: 900 }, pulse("plain", 3200, 1.03, 900)] },
            { caption: "دشت صاف برای مزرعه و خانه خوب است. اصفهان در دشتی کنار زاینده‌رود بزرگ شد.", key: 4000, hold: 6000, do: [
              { id: "plain.fields", to: { o: 1 }, at: 1200, dur: 900 }] },
            { caption: "جایی که راه‌ها به هم می‌رسند، مسافرها و بازرگان‌ها می‌ایستند. تبریز سر چند راه قدیمی بود.", key: 5000, hold: 7000, do: [
              { id: "plain", to: { o: 0 }, dur: 500 }, { id: "cross", to: { o: 1 }, dur: 600 },
              { id: "c1", to: { o: 1 }, at: 800, dur: 200 }, { id: "c1", to: { x: 70 }, at: 800, dur: 3000, ease: "linear" },
              { id: "c2", to: { o: 1 }, at: 1200, dur: 200 }, { id: "c2", to: { y: 40 }, at: 1200, dur: 3000, ease: "linear" },
              { id: "cross.town", to: { o: 1 }, at: 3800, dur: 900 }] },
            { caption: "کنار دریا، بندر ساخته می‌شود و کشتی‌ها بار می‌آورند و می‌برند. بندرعباس یک بندر بزرگ است.", key: 4400, hold: 6400, do: [
              { id: "cross", to: { o: 0 }, dur: 500 }, { id: "c1", to: { o: 0 }, dur: 300 }, { id: "c2", to: { o: 0 }, dur: 300 }, { id: "port", to: { o: 1 }, dur: 600 },
              { id: "port.town", to: { o: 1 }, at: 800, dur: 800 }, { id: "ship", to: { o: 1 }, at: 1600, dur: 300 }, { id: "ship", to: { x: 90 }, at: 1600, dur: 3000, ease: "out" }] }
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"], cities: ["ahvaz", "isfahan", "tabriz", "bandar-abbas"], labels: true, say: "شهرها و دلیل ساخته شدنشان.",
          tasks: [
            { find: "ahvaz", prompt: "کدام شهر کنار رود کارون است؟" },
            { find: "isfahan", prompt: "کدام شهر در دشتی کنار زاینده‌رود است؟" },
            { find: "bandar-abbas", prompt: "کدام شهر بندری کنار خلیج فارس است؟" },
            { find: "tabriz", prompt: "کدام شهر سر راه‌های قدیمی بازرگانی در شمال‌غربی است؟" }
          ] },
        { type: "choose", prompt: "چرا مردم کنار رود شهر می‌ساختند؟", say: "چرا مردم در قدیم کنار رود شهر می‌ساختند؟", stack: true,
          options: ["چون آب برای خوردن و کشاورزی لازم است", "چون رود صدای قشنگی دارد", "چون کنار رود کوه نیست"], answer: "چون آب برای خوردن و کشاورزی لازم است" },
        { type: "choose", prompt: "بندر کجا ساخته می‌شود؟", say: "بندر کجا ساخته می‌شود؟", pic: true,
          options: [{ label: "⛰️", value: "روی کوه" }, { label: "🌊", value: "کنار دریا" }, { label: "🏜️", value: "وسط کویر" }], answer: "کنار دریا" }
      ]
    },

    /* Sources: Iran's provinces and their centres (the Statistical Centre of Iran's list of 31 provinces; Iran's
       fourth-grade social studies, «استان من»; NCSS C3 D2.Geo.2.3–5, "use maps to explain relationships between
       places"). Most centres share the province's name; some don't (فارس: شیراز، گیلان: رشت، خوزستان: اهواز،
       خراسان رضوی: مشهد، آذربایجان شرقی: تبریز، مازندران: ساری، گلستان: گرگان، کردستان: سنندج، لرستان: خرم‌آباد،
       هرمزگان: بندرعباس، سیستان و بلوچستان: زاهدان). */
    {
      id: "world-sapling-3", subject: "world", level: "sapling", emoji: "🗺️", title: "استان‌های ایران",
      steps: [
        { type: "map", map: "iran", layers: ["provinces", "seas"],
          say: "ایران ۳۱ استان دارد. هر استان چند شهر و روستا دارد و یک شهرِ مرکز.",
          tasks: [
            { find: "fars", prompt: "استان فارس در جنوب ایران است. پیدایش کن." },
            { find: "gilan", prompt: "استان گیلان کنار دریای خزر است. پیدایش کن." },
            { find: "khuzestan", prompt: "استان خوزستان در جنوب غربی است، کنار خلیج فارس. پیدایش کن." },
            { find: "razavi-khorasan", prompt: "استان خراسان رضوی در شمال شرقی است. پیدایش کن." },
            { find: "east-azerbaijan", prompt: "استان آذربایجان شرقی در شمال غربی است. پیدایش کن." }
          ] },
        { type: "map", map: "iran", layers: ["seas"], cities: "centres", labels: true,
          say: "هر نقطه قرمز، مرکز یک استان است.",
          tasks: [
            { find: "shiraz", prompt: "مرکز استان فارس، شیراز است. شیراز را پیدا کن." },
            { find: "rasht", prompt: "مرکز استان گیلان، رشت است. رشت را پیدا کن." },
            { find: "ahvaz", prompt: "مرکز استان خوزستان، اهواز است. اهواز را پیدا کن." },
            { find: "mashhad", prompt: "مرکز استان خراسان رضوی، مشهد است. مشهد را پیدا کن." },
            { find: "tabriz", prompt: "مرکز استان آذربایجان شرقی، تبریز است. تبریز را پیدا کن." }
          ] },
        { type: "choose", prompt: "مرکز استان اصفهان کدام شهر است؟", say: "مرکز استان اصفهان کدام شهر است؟ اسم خیلی از استان‌ها با اسم مرکزشان یکی است.",
          options: ["اصفهان", "شیراز", "رشت"], answer: "اصفهان" },
        { type: "pairs", prompt: "هر استان، مرکزش", say: "هر استان را با شهرِ مرکزش جفت کن.",
          pairs: [
            [{ label: "فارس", say: "استان فارس" }, { label: "شیراز", say: "شیراز" }],
            [{ label: "گیلان", say: "استان گیلان" }, { label: "رشت", say: "رشت" }],
            [{ label: "خوزستان", say: "استان خوزستان" }, { label: "اهواز", say: "اهواز" }],
            [{ label: "خراسان رضوی", say: "استان خراسان رضوی" }, { label: "مشهد", say: "مشهد" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر استان و مرکزش",
          say: "کارت‌ها را برگردان و هر استان را با مرکزش پیدا کن.",
          pairs: [
            [{ label: "مازندران", say: "استان مازندران" }, { label: "ساری", say: "ساری" }],
            [{ label: "کردستان", say: "استان کردستان" }, { label: "سنندج", say: "سنندج" }],
            [{ label: "هرمزگان", say: "استان هرمزگان" }, { label: "بندرعباس", say: "بندرعباس" }],
            [{ label: "سیستان و بلوچستان", say: "استان سیستان و بلوچستان" }, { label: "زاهدان", say: "زاهدان" }]
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"],
          tasks: [
            { mine: true, prompt: "استان خودت را پیدا کن و رویش بزن.",
              say: "تو در کدام استان زندگی می‌کنی؟ پیدایش کن و رویش بزن. اگر در ایران زندگی نمی‌کنی، استانی را پیدا کن که خانواده‌ات از آنجا هستند." }
          ] }
      ]
    },

    /* Sources: my province and its neighbours (Iran's fourth-grade social studies, «استان من»; NCSS C3
       D2.Geo.2.3–5). Yazd province borders Isfahan, Semnan, Razavi Khorasan, South Khorasan, Kerman and Fars; Gilan
       borders Ardabil, Zanjan, Qazvin and Mazandaran (Statistical Centre of Iran). What provinces are known for:
       Gilan's rice and tea, Kerman's pistachios, Khuzestan's date palms, Yazd's qanats and windcatchers, Isfahan's
       old bridges, Hormozgan's ports and fishing. */
    {
      id: "world-sapling-16", subject: "world", level: "sapling", emoji: "🏡", title: "استان من و همسایه‌هایش",
      steps: [
        { type: "map", map: "iran", layers: ["provinces", "seas"],
          tasks: [
            { mine: true, prompt: "استان خودت کجاست؟ رویش بزن.",
              say: "استان خودت را پیدا کن و رویش بزن. اگر نمی‌دانی، از بزرگ‌ترت بپرس." }
          ] },
        { type: "talk", scene: "🏡 🗺️ 🏙️", caption: "مرکز استان تو کدام شهر است؟ زمینش بیشتر کوه است، دشت است یا کنار دریا؟" },
        { type: "map", map: "iran", layers: ["provinces"],
          say: "به استان‌های دور و بر یک استان، همسایه‌هایش می‌گوییم. استان یزد شش همسایه دارد.",
          tasks: [
            { find: "yazd", prompt: "اول استان یزد را پیدا کن، در وسط ایران." },
            { find: "isfahan", prompt: "همسایه غربی یزد: استان اصفهان. پیدایش کن." },
            { find: "kerman", prompt: "همسایه جنوب شرقی یزد: استان کرمان. پیدایش کن." },
            { find: "fars", prompt: "همسایه جنوب غربی یزد: استان فارس. پیدایش کن." },
            { find: "south-khorasan", prompt: "همسایه شرقی یزد: استان خراسان جنوبی. پیدایش کن." },
            { find: "semnan", prompt: "همسایه شمالی یزد: استان سمنان. پیدایش کن." },
            { find: "razavi-khorasan", prompt: "همسایه شمال شرقی یزد: استان خراسان رضوی. پیدایش کن." }
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"],
          tasks: [
            { find: "gilan", prompt: "استان گیلان کنار دریای خزر است. پیدایش کن." },
            { find: "mazandaran", prompt: "همسایه شرقی گیلان، کنار همان دریا: مازندران. پیدایش کن." },
            { find: "ardabil", prompt: "همسایه شمال غربی گیلان: اردبیل. پیدایش کن." }
          ] },
        { type: "pairs", prompt: "هر استان به چه معروف است؟", say: "هر استان را با چیزی که به آن معروف است جفت کن.",
          pairs: [
            [{ label: "گیلان", say: "استان گیلان" }, { pic: "🌾", label: "برنج و چای", say: "برنج و چای" }],
            [{ label: "کرمان", say: "استان کرمان" }, { pic: "🥜", label: "پسته", say: "پسته" }],
            [{ label: "خوزستان", say: "استان خوزستان" }, { pic: "🌴", label: "نخل خرما", say: "نخل خرما" }],
            [{ label: "هرمزگان", say: "استان هرمزگان" }, { pic: "⚓", label: "بندر و ماهی‌گیری", say: "بندر و ماهی‌گیری" }]
          ] },
        { type: "talk", scene: "🏡 👵 💬", caption: "استان تو به چه معروف است؟ یک خوراکی، یک جا یا یک کار دستی از آنجا اسم ببر." },
        home({ pic: "🏡 🗺️ 👵", text: "استان ما به چه معروف است؟",
          need: ["یک نقشه ایران (کتاب، دیوار یا گوشی)"],
          steps: [
            "روی نقشه استان خودتان (یا استانی که خانواده از آنجاست) را با کودک پیدا کنید و مرکزش را نشان بدهید.",
            "همسایه‌های استان را با انگشت بشمارید و اسمشان را بخوانید.",
            "از یک بزرگ‌تر بپرسید استان شما به چه معروف است: یک خوراکی، یک جای دیدنی، یک کار دستی.",
            "کودک یکی از آن‌ها را نقاشی کند و زیرش اسم استان را بنویسید."
          ],
          ask: "اگر مهمانی از استان دیگر بیاید، اول کجای استانمان را نشانش می‌دهی؟" })
      ]
    },

    /* Sources: a unit game that brings back world.sap.1 (landforms, world-sapling-1 and 40), world.sap.2 (rivers and
       climate, world-sapling-15 and 2) and world.sap.3 (provinces, world-sapling-3 and 16). The trip by road from
       Tabriz through Tehran, Isfahan and Shiraz to Bandar Abbas follows Iran's main north-west to south road. */
    {
      id: "world-sapling-17", subject: "world", level: "sapling", emoji: "🚗", title: "بازی سفر در ایران",
      steps: [
        { type: "map", map: "iran", layers: ["seas"], cities: ["tabriz", "tehran", "isfahan", "shiraz", "bandar-abbas"], labels: true,
          tasks: [{ route: ["tabriz", "tehran", "isfahan", "shiraz", "bandar-abbas"], walker: "🚗",
            prompt: "از تبریز تا بندرعباس سفر کن: تبریز، تهران، اصفهان، شیراز، بندرعباس.",
            say: "یک سفر بزرگ! از تبریز راه بیفت. بعد به تهران برو، بعد اصفهان، بعد شیراز، و آخر بندرعباس، کنار خلیج فارس." }] },
        { type: "sort", prompt: "کوه، کویر یا دریا؟", say: "هر جا را به سبدش ببر: کوه، کویر یا دریا.",
          baskets: [{ pic: "🏔️", label: "کوه", value: "m" }, { pic: "🏜️", label: "کویر", value: "d" }, { pic: "🌊", label: "دریا", value: "s" }],
          items: [
            { label: "دماوند", say: "دماوند", basket: "m" },
            { label: "زاگرس", say: "زاگرس", basket: "m" },
            { label: "البرز", say: "البرز", basket: "m" },
            { label: "دشت کویر", say: "دشت کویر", basket: "d" },
            { label: "دشت لوت", say: "دشت لوت", basket: "d" },
            { label: "خلیج فارس", say: "خلیج فارس", basket: "s" },
            { label: "دریای خزر", say: "دریای خزر", basket: "s" }
          ] },
        { type: "map", map: "iran", layers: ["relief", "landforms", "seas"], say: "در راه، کوه و کویر می‌بینی.",
          tasks: [
            { find: "damavand", prompt: "از تهران قله دماوند پیداست. دماوند را پیدا کن." },
            { find: "kavir", prompt: "دشت کویر، شرق تهران، کجاست؟" },
            { find: "zagros", prompt: "از اصفهان تا شیراز کنار رشته‌کوه زاگرس می‌رویم. پیدایش کن." }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر رود، هر شهر",
          say: "کارت‌ها را برگردان و هر رود را با شهرش پیدا کن.",
          pairs: [
            [{ label: "زاینده‌رود", say: "زاینده‌رود" }, { label: "اصفهان", say: "اصفهان" }],
            [{ label: "کارون", say: "رود کارون" }, { label: "اهواز", say: "اهواز" }],
            [{ label: "ارس", say: "رود ارس" }, { label: "جلفا", say: "جلفا" }]
          ] },
        { type: "sort", prompt: "هوای کدام شهر؟", say: "هر شهر را به آب و هوایش ببر: سرد و کوهستانی، یا گرم کنار دریا.",
          baskets: [{ pic: "❄️", label: "سرد و کوهستانی", value: "cold" }, { pic: "☀️", label: "گرم کنار دریا", value: "hot" }],
          items: [
            { label: "تبریز", say: "تبریز", basket: "cold" },
            { label: "اردبیل", say: "اردبیل", basket: "cold" },
            { label: "همدان", say: "همدان", basket: "cold" },
            { label: "بندرعباس", say: "بندرعباس", basket: "hot" },
            { label: "بوشهر", say: "بوشهر", basket: "hot" },
            { label: "چابهار", say: "چابهار", basket: "hot" }
          ] },
        { type: "map", map: "iran", layers: ["provinces", "seas"], say: "شهرهای سفرت مرکز کدام استان‌اند؟",
          tasks: [
            { find: "east-azerbaijan", prompt: "تبریز مرکز کدام استان است؟ رویش بزن: آذربایجان شرقی." },
            { find: "fars", prompt: "شیراز مرکز کدام استان است؟ رویش بزن: فارس." },
            { find: "hormozgan", prompt: "بندرعباس مرکز کدام استان است؟ رویش بزن: هرمزگان." }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر استان و مرکزش",
          say: "کارت‌ها را برگردان و هر استان را با مرکزش پیدا کن.",
          pairs: [
            [{ label: "آذربایجان شرقی", say: "استان آذربایجان شرقی" }, { label: "تبریز", say: "تبریز" }],
            [{ label: "فارس", say: "استان فارس" }, { label: "شیراز", say: "شیراز" }],
            [{ label: "هرمزگان", say: "استان هرمزگان" }, { label: "بندرعباس", say: "بندرعباس" }],
            [{ label: "خراسان رضوی", say: "استان خراسان رضوی" }, { label: "مشهد", say: "مشهد" }]
          ] }
      ]
    },

    /* Sources: living with little water in Iran's dry centre (UNESCO World Heritage, "The Persian Qanat", 2016, and
       "Historic City of Yazd", 2017, with its windcatchers and ab-anbars; the yakhchal of Meybod; Iran's
       fourth-grade social studies, «آب و زندگی»; NCSS C3 D2.Geo.5.3–5, how people change and adapt to their
       environment). A qanat is a gently sloping tunnel that brings groundwater from under the mountains to a village,
       with a line of wells to dig and clean it; a windcatcher sends the wind down into the house; an ab-anbar keeps
       water cool under a dome; a yakhchal kept winter ice until summer. */
    {
      id: "world-sapling-4", subject: "world", level: "sapling", emoji: "💧", title: "قنات و بادگیر",
      steps: [
        { type: "scene", prompt: "زندگی با آب کم", bg: "#e4f1f8",
          parts: {
            sand: { art: "w-sand" }, sun: { art: "w-sun", at: [140, 14], s: 0.9 },
            house: { art: "w-yazd-house", at: [62, 80], s: 1.1 }, wind: { art: "w-wind-in", at: [42.2, 20.6], s: 1.1, o: 0 },
            qanat: { art: "sci-qanat", o: 0 }, bucket: { art: "🪣", at: [88, 58], s: 0.55, o: 0 },
            store: { art: "w-abanbar", at: [80, 66], s: 1.2, o: 0 }, yakh: { art: "w-yakhchal", at: [62, 66], s: 1.1, o: 0 },
            h2: { art: "w-yazd-house", at: [22, 80], s: 0.7, o: 0 }, s2: { art: "w-abanbar", at: [70, 66], s: 0.8, o: 0 }, y2: { art: "w-yakhchal", at: [112, 66], s: 0.6, o: 0 }
          },
          scenes: [
            { caption: "یزد کنار کویر است. باران کم می‌بارد و تابستان خیلی گرم است. مردم قدیم برای آب و خنکی چه کردند؟", key: 3600, hold: 6400, do: [
              pulse("sun", 800, 1.3, 1200)] },
            { caption: "قنات: یک راه آب زیر زمین. آب از زیر کوه، آرام‌آرام در یک تونل کم‌شیب تا روستا می‌آید.", key: 5200, hold: 7200, do: [
              { id: "qanat", to: { o: 1 }, dur: 800 }, { id: "qanat.flow", draw: true, at: 1000, dur: 4000 }] },
            { caption: "بالای قنات یک ردیف چاه هست. مقنی‌ها از این چاه‌ها پایین می‌رفتند تا تونل را بکنند و تمیز کنند.", key: 3200, hold: 6400, do: [
              { id: "bucket", to: { o: 1 }, dur: 300 }, { id: "bucket", to: { y: 40 }, at: 400, dur: 2000 }, { id: "bucket", to: { y: 58 }, at: 3600, dur: 2000 }] },
            { caption: "بادگیر: برجی بلند روی خانه. باد را می‌گیرد و پایین، به اتاق‌ها می‌فرستد. اتاق خنک می‌شود.", key: 4400, hold: 6400, do: [
              { id: "qanat", to: { o: 0 }, dur: 700 }, { id: "bucket", to: { o: 0 }, dur: 300 }, pulse("house", 900, 1.04, 700),
              { id: "wind", to: { o: 1 }, at: 1600, dur: 100 }, { id: "wind", draw: true, at: 1600, dur: 2600 }] },
            { caption: "آب‌انبار: حوضی بزرگ زیر زمین، زیر یک گنبد. آب در آن خنک و تمیز می‌ماند. بادگیرهایش هوای آن را خنک می‌کنند.", key: 3800, hold: 6800, do: D(
              hide(["house", "wind"], 0, 600), [{ id: "store", to: { o: 1 }, at: 600, dur: 800 }, { id: "store.water", to: { o: 1 }, at: 2200, dur: 900 }]) },
            { caption: "یخچال قدیمی: در شب‌های زمستان، آب کنار دیوار بلندش یخ می‌زد. یخ را در این گنبد تا تابستان نگه می‌داشتند.", key: 4400, hold: 7000, do: [
              { id: "store", to: { o: 0 }, dur: 600 }, { id: "yakh", to: { o: 1 }, at: 600, dur: 800 },
              { id: "yakh.pool", to: { o: 1 }, at: 1800, dur: 800 }, { id: "yakh.ice", to: { o: 1 }, at: 3200, dur: 900 }] },
            { caption: "مردم با فکر و دانش، در جای کم‌آب و گرم خوب زندگی کردند. هنوز هم در یزد بادگیر، آب‌انبار و یخچال قدیمی می‌بینیم.", key: 3000, hold: 5600, do: D(
              hide(["yakh"], 0, 600), show(["h2", "s2", "y2"], 700, 800)) }
          ] },
        { type: "order", prompt: "آب قنات از کجا تا کجا می‌رود؟", say: "آب قنات اول کجاست؟ بعد کجا می‌رود؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🌨️", label: "برف روی کوه", say: "برف و باران روی کوه" }, { pic: "⛰️", label: "آب زیر کوه", say: "آب به زیر زمینِ کوه می‌رود" },
            { pic: "🕳️", label: "تونل قنات", say: "آب در تونل قنات راه می‌رود" }, { pic: "🏘️", label: "روستا", say: "آب به روستا می‌رسد" }, { pic: "🌾", label: "مزرعه", say: "مزرعه آب می‌خورد" }] },
        { type: "choose", prompt: "چرا مردم یزد بادگیر ساختند؟", say: "چرا مردم یزد روی خانه‌هایشان بادگیر ساختند؟",
          options: ["تا خانه در تابستان خنک شود", "تا باران بیشتر ببارد", "تا خانه بلندتر دیده شود"], answer: "تا خانه در تابستان خنک شود" },
        { type: "choose", prompt: "چرا قنات زیر زمین است؟", say: "چرا آب قنات زیر زمین راه می‌رود، نه روی زمین؟",
          options: ["تا آب در آفتاب داغ بخار نشود", "چون آب از خورشید می‌ترسد", "تا کسی آب را نبیند"], answer: "تا آب در آفتاب داغ بخار نشود" },
        { type: "pairs", prompt: "هر ساختمان، کارش", say: "هر ساختمان را با کاری که می‌کند جفت کن.",
          pairs: [
            [{ label: "قنات", say: "قنات" }, { pic: "💧", label: "آب می‌آورد", say: "آب را از زیر کوه می‌آورد" }],
            [{ label: "بادگیر", say: "بادگیر" }, { pic: "🌬️", label: "خانه را خنک می‌کند", say: "باد را به خانه می‌فرستد" }],
            [{ label: "آب‌انبار", say: "آب‌انبار" }, { pic: "🫙", label: "آب نگه می‌دارد", say: "آب را خنک نگه می‌دارد" }],
            [{ label: "یخچال", say: "یخچال قدیمی" }, { pic: "🧊", label: "یخ نگه می‌دارد", say: "یخ را تا تابستان نگه می‌دارد" }]
          ] },
        home({ pic: "🌬️ 🏠 💧", text: "یک بادگیر کوچک بساز!",
          need: ["یک جعبه کوچک مقوایی یا قوطی دستمال کاغذی", "قیچی و چسب", "یک تکه دستمال یا کاغذ نازک"],
          steps: [
            "روی جعبه یک برج کوچک مقوایی بچسبانید که بالایش باز باشد؛ این بادگیر است.",
            "یک تکه دستمال نازک را داخل جعبه، زیر برج، آویزان کنید.",
            "کنار پنجره یا جلوی پنکه بگذارید و ببینید: باد از بالای برج پایین می‌آید و دستمال تکان می‌خورد.",
            "بپرسید: «مردم قدیم بدون برق و کولر چطور خانه را خنک می‌کردند؟»"
          ],
          ask: "اگر در یک جای خیلی گرم و خشک زندگی می‌کردی، برای آب و خنکی چه می‌ساختی؟" })
      ]
    },

    /* Sources: where a city's water comes from (Iran's fourth-grade social studies, «آب»; NCSS C3 D2.Geo.5.3–5 and
       D2.Eco.1.3–5). Iran gets about a third of the world's average rainfall (about 250 mm a year; Iran Meteorological
       Organization); towns take water from rivers, deep wells and the lakes behind dams, clean it in a treatment works
       and send it under the streets to the taps. A tap dripping once a second wastes about 20 to 30 litres a day, two
       or three buckets (US Geological Survey drip calculator). */
    {
      id: "world-sapling-18", subject: "world", level: "sapling", emoji: "🚰", title: "آب شهر ما از کجا می‌آید؟",
      steps: [
        { type: "scene", prompt: "از سد تا شیر آب", bg: "#cdeaf7",
          parts: {
            pipes: { art: "sci-pipes" }, treat: { art: "w-treat", at: [78, 64], s: 1.1, o: 0 }, cloud: { art: "🌥️", at: [24, 14], s: 1.3 },
            bath: { art: "w-bathroom", o: 0 }, sink: { art: "w-sink", at: [96, 86], s: 1.3, o: 0 }, sara: { art: "w-girl2", at: [64, 86], s: 1.15, o: 0 },
            dad: { art: "w-dad2", at: [180, 86], s: 1.15, o: 0 }, drip: { art: "💧", at: [103.8, 46], s: 0.22, o: 0 }
          },
          scenes: [
            { caption: "در ایران باران و برف کم می‌بارد. آب خیلی از شهرها از دریاچهٔ پشتِ یک سد می‌آید.", key: 3800, hold: 6000, do: [
              { emit: "drop", where: [24, 22], spread: [8, 2], rise: -10, n: 6, at: 600, dur: 3000, life: 900 }, pulse("pipes", 2400, 1.02, 800)] },
            { caption: "آب سد را با لوله‌های بزرگ به تصفیه‌خانه می‌برند. آنجا آب را تمیز و سالم می‌کنند.", key: 3400, hold: 5400, do: [
              { id: "treat", to: { o: 1 }, at: 400, dur: 800 }, pulse("treat", 1600, 1.15, 800)] },
            { caption: "بعد آب از لوله‌های زیر خیابان به خانه‌ها می‌رسد و از شیر آب بیرون می‌آید.", key: 4600, hold: 6600, do: [
              { id: "pipes.flow", draw: true, at: 300, dur: 3800 }, { emit: "drop", where: [127, 50], spread: [1, 1], rise: -6, n: 8, at: 4000, dur: 2400, life: 500 }] },
            { caption: "خانهٔ سارا: شیر آب چکه می‌کند. یک شیر چکه‌کن در یک روز تا دو سه سطل آب هدر می‌دهد!", key: 3600, hold: 6000, do: D(
              hide(["pipes", "treat", "cloud"], 0, 600), show(["bath", "sink", "sara"], 400, 700), [{ id: "sink.water", to: { o: 0 }, dur: 1 },
              { emit: "drop", where: [103.8, 44], spread: [0.3, 0.3], rise: -4, n: 8, at: 1200, dur: 4800, life: 500 }, { id: "sara.armR", to: { r: -60 }, at: 2400, dur: 500 }, { id: "drip", to: { o: 1 }, at: 1000, dur: 300 }, { id: "drip", to: { y: 50 }, at: 1300, dur: 900, yoyo: true, times: 4 }]) },
            { caption: "سارا به پدرش می‌گوید. پدر واشر شیر را عوض می‌کند. دیگر آب چکه نمی‌کند.", key: 4000, hold: 6400, do: D(
              [{ id: "sara.armR", to: { r: 0 }, dur: 400 }, { id: "dad", to: { o: 1 }, dur: 300 }], walk("dad", { x: 120 }, 300, 2400),
              [{ id: "dad.armL", to: { r: 135 }, at: 2900, dur: 500 }, { id: "sink.knob", to: { r: 90 }, at: 3400, dur: 500 }, { id: "drip", to: { o: 0 }, at: 3600, dur: 300 }, { id: "dad.armL", to: { r: 0 }, at: 4400, dur: 500 }]) }
          ] },
        { type: "order", prompt: "آب از کجا تا شیر خانه می‌آید؟", say: "آب اول کجاست؟ بعد کجا می‌رود؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏞️", label: "دریاچهٔ سد", say: "دریاچهٔ پشت سد" }, { pic: "🏭", label: "تصفیه‌خانه", say: "تصفیه‌خانه، که آب را تمیز می‌کند" },
            { pic: "🛣️", label: "لوله‌های زیر خیابان", say: "لوله‌های زیر خیابان" }, { pic: "🚰", label: "شیر آب خانه", say: "شیر آب خانه" }] },
        { type: "choose", prompt: "چرا در ایران باید مواظب آب باشیم؟", say: "چرا در ایران باید خیلی مواظب آب باشیم؟",
          options: ["چون باران کم می‌بارد", "چون آب گران است", "چون آب رنگی است"], answer: "چون باران کم می‌بارد" },
        { type: "sort", prompt: "آب را نگه می‌دارد یا هدر می‌دهد؟", say: "هر کار را به سبدش ببر: آب را نگه می‌دارد، یا آب را هدر می‌دهد.",
          baskets: [{ pic: "💧", label: "آب را نگه می‌دارد", value: "save" }, { pic: "🚱", label: "آب را هدر می‌دهد", value: "waste" }],
          items: [
            { pic: "🪥", label: "بستن شیر هنگام مسواک", say: "شیر را هنگام مسواک زدن می‌بندیم", basket: "save" },
            { pic: "🚿", label: "دوش کوتاه", say: "یک دوش کوتاه می‌گیریم", basket: "save" },
            { pic: "🪴", label: "آب سبزی‌شویی برای گلدان", say: "آب سبزی‌شویی را به گلدان می‌دهیم", basket: "save" },
            { pic: "💧", label: "شیر چکه‌کن", say: "شیر آب چکه می‌کند", basket: "waste" },
            { pic: "🚗", label: "شستن ماشین با شلنگ", say: "ماشین را با شلنگ باز می‌شوییم", basket: "waste" },
            { pic: "🍽️", label: "شیر باز هنگام ظرف‌شستن", say: "شیر آب هنگام ظرف‌شستن همین‌طور باز است", basket: "waste" }
          ] },
        home({ pic: "💧 🥛 ⏱️", text: "یک شیر چکه‌کن چقدر آب هدر می‌دهد؟",
          need: ["یک لیوان یا پیمانهٔ آشپزخانه", "یک ساعت یا گوشی برای زمان گرفتن"],
          steps: [
            "شیر آب را خیلی کم باز کنید تا فقط چکه کند، و لیوان را زیرش بگذارید.",
            "ده دقیقه صبر کنید. بعد ببینید چقدر آب در لیوان جمع شده.",
            "بگویید: یک روز ۱۴۴ تا ده دقیقه دارد! اگر شیر همهٔ روز چکه کند، چند لیوان می‌شود؟ (با هم حساب کنید یا حدس بزنید.)",
            "آب لیوان را دور نریزید: به گلدان بدهید. اگر در خانه شیر چکه‌کنی هست، با هم درستش کنید یا به کسی بگویید."
          ],
          ask: "تو امروز کجا می‌توانی آب را نگه داری؟" })
      ]
    },

    /* Sources: a unit game that brings back world.sap.4 (qanat, windcatcher, ab-anbar, yakhchal; world-sapling-4) and
       world.sap.18 (from the dam to the tap, saving water; world-sapling-18). Old and new ways that do the same job:
       the ab-anbar and a roof water tank, the windcatcher and an air cooler, the yakhchal and a fridge, the qanat and
       the water pipes. */
    {
      id: "world-sapling-19", subject: "world", level: "sapling", emoji: "💧", title: "بازی آب",
      steps: [
        { type: "sort", prompt: "قدیم یا امروز؟", say: "هر چیز را به سبدش ببر: مال قدیم است یا امروز؟",
          baskets: [{ pic: "🏺", label: "قدیم", value: "old" }, { pic: "🏙️", label: "امروز", value: "now" }],
          items: [
            { label: "قنات", say: "قنات", basket: "old" },
            { label: "آب‌انبار", say: "آب‌انبار", basket: "old" },
            { pic: "🏺", label: "کوزهٔ آب", say: "کوزهٔ آب", basket: "old" },
            { label: "یخچال گنبدی", say: "یخچال گنبدیِ قدیمی", basket: "old" },
            { label: "سد", say: "سد", basket: "now" },
            { pic: "🚰", label: "لوله‌کشی آب", say: "لوله‌کشی آب", basket: "now" },
            { label: "یخچال برقی", say: "یخچال برقی", basket: "now" },
            { label: "کولر", say: "کولر", basket: "now" }
          ] },
        { type: "pairs", prompt: "قدیم و امروز: یک کار", say: "هر چیز قدیمی را با چیزی جفت کن که امروز همان کار را می‌کند.",
          pairs: [
            [{ label: "بادگیر", say: "بادگیر" }, { label: "کولر", say: "کولر" }],
            [{ label: "یخچال گنبدی", say: "یخچال گنبدیِ قدیمی" }, { label: "یخچال برقی", say: "یخچال برقی" }],
            [{ label: "آب‌انبار", say: "آب‌انبار" }, { label: "منبع آب", say: "منبع آبِ روی پشت‌بام" }],
            [{ label: "قنات", say: "قنات" }, { label: "لوله‌کشی آب", say: "لوله‌کشی آب" }]
          ] },
        { type: "order", prompt: "آب قنات", say: "آب قنات اول کجاست؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏔️", label: "زیر کوه", say: "آبِ زیر کوه" }, { pic: "🕳️", label: "تونل قنات", say: "تونل قنات" },
            { pic: "🏘️", label: "روستا", say: "روستا" }, { pic: "🌾", label: "مزرعه", say: "مزرعه" }] },
        { type: "order", prompt: "آب لوله‌کشی", say: "آب شهر اول کجاست؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏞️", label: "دریاچهٔ سد", say: "دریاچهٔ سد" }, { pic: "🏭", label: "تصفیه‌خانه", say: "تصفیه‌خانه" },
            { pic: "🛣️", label: "لوله‌های زیر خیابان", say: "لوله‌های زیر خیابان" }, { pic: "🚰", label: "شیر آب خانه", say: "شیر آب خانه" }] },
        { type: "sort", prompt: "نگه‌داشتن آب", say: "کدام کار آب را نگه می‌دارد و کدام هدر می‌دهد؟",
          baskets: [{ pic: "💧", label: "نگه می‌دارد", value: "save" }, { pic: "🚱", label: "هدر می‌دهد", value: "waste" }],
          items: [
            { pic: "🪣", label: "جمع کردن آب باران برای باغچه", say: "آب باران را برای باغچه جمع می‌کنیم", basket: "save" },
            { pic: "🔧", label: "درست کردن شیر چکه‌کن", say: "شیر چکه‌کن را درست می‌کنیم", basket: "save" },
            { pic: "🥛", label: "یک لیوان آب برای مسواک", say: "برای مسواک یک لیوان آب برمی‌داریم", basket: "save" },
            { pic: "🛁", label: "وان پر برای هر حمام", say: "هر بار وان را پر می‌کنیم", basket: "waste" },
            { pic: "🌞", label: "آب دادن به چمن ظهر تابستان", say: "ظهر تابستان، زیر آفتاب داغ، به چمن آب می‌دهیم", basket: "waste" }
          ] }
      ]
    },

    /* Sources: daily life in five regions of Iran (Iran's fourth-grade social studies, «مردم استان‌ها»; Encyclopaedia
       Iranica on the cuisines of Azerbaijan, Kurdistan, Gilan, Khuzestan and Baluchestan; NCSS C3 D2.Geo.6.3–5 and
       D2.Civ.10.3–5). Foods each place is known for: Tabriz's kufteh tabrizi, Kurdistan's kalaneh (a flatbread with
       wild greens), Gilan's mirza ghasemi with rice, Ahvaz's falafel and dates, the mangoes and bananas of Chabahar and
       Baluch needlework (سوزن‌دوزی). The thank-you words and the children are the ones of world-sprout-6 (same
       spelling, same recording slots in REC; never said by the device voice). Shared by everyone: Nowruz and its
       haft-sin, tea and guests. */
    {
      id: "world-sapling-20", subject: "world", level: "sapling", emoji: "🧕", title: "مردم استان‌ها",
      steps: [
        (function () {
          var F = [{ id: "az", kid: "w-aylar", map: "w-map-tabriz", food: "🍲", th: "ساغ اول!" }, { id: "ku", kid: "w-zhiyar", map: "w-map-sanandaj", food: "🫓", th: "سوپاس!" },
            { id: "gi", kid: "w-negar", map: "w-map-rasht", food: "🍆", th: null }, { id: "ar", kid: "w-reem", map: "w-map-ahvaz", food: "🧆", th: "شکراً!" },
            { id: "bal", kid: "w-mahgol", map: "w-map-chabahar", food: "🥭", th: "منّت‌وار!" }];
          var parts = { meadow: { art: "w-meadow" } }, X = [136, 108, 80, 52, 24];
          F.forEach(function (k) { parts["s" + k.id] = { art: k.kid, at: [176, 86], s: 1.05 }; });
          F.forEach(function (k) {
            parts["m" + k.id] = { art: k.map, at: [30, 24], s: 0.8, o: 0 };
            parts["b" + k.id] = { art: k.kid, at: [118, 87], s: 1.45, o: 0 };
            parts["f" + k.id] = { art: k.food, at: [60, 66], s: 1.3, o: 0 };
            if (k.th) { parts["t" + k.id] = { art: "w-bubble-wide", at: [74, 30], o: 0 }; parts["tw" + k.id] = { art: k.th, at: [74, 32], s: 0.32, o: 0 }; }
          });
          parts.rice = { art: "🍚", at: [82, 68], s: 1.1, o: 0 }; parts.dates = { art: "🌴", at: [84, 58], s: 1.5, o: 0 }; parts.banana = { art: "🍌", at: [82, 68], s: 1.1, o: 0 };
          parts.snow = { art: "❄️", at: [80, 14], s: 0.8, o: 0 }; parts.sun = { art: "w-sun", at: [80, 14], s: 0.9, o: 0 };
          parts.rain = { art: "🌧️", at: [80, 14], s: 1.1, o: 0 };
          parts.sofreh = { art: "w-sofreh", at: [80, 84], s: 1.3, o: 0 }; parts.sabzeh = { art: "🌱", at: [70, 76], s: 0.5, o: 0 }; parts.apple = { art: "🍎", at: [80, 77], s: 0.4, o: 0 };
          parts.tea = { art: "🍵", at: [90, 77], s: 0.4, o: 0 };
          function visit(k, prev, extra) {
            var b = "b" + k.id, list = [b, "m" + k.id, "f" + k.id];
            return D(prev ? hide(prev) : [], show(list, 300, 700), [pulse("m" + k.id + ".dot", 1400, 2.2, 1000), pulse("f" + k.id, 2600, 1.2)],
              k.th ? D(wave(b, 3600, 1600), show(["t" + k.id, "tw" + k.id], 3800, 300)) : [], extra || []);
          }
          function all(k) { return ["b" + k.id, "m" + k.id, "f" + k.id].concat(k.th ? ["t" + k.id, "tw" + k.id] : []); }
          return { type: "scene", prompt: "یک روز در پنج استان", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "بیا با بچه‌های پنج استانِ ایران آشنا شویم و ببینیم آن‌ها چه می‌خورند و چطور زندگی می‌کنند.", key: 5400, hold: 7400, do: D.apply(null, F.map(function (k, i) {
                return walk("s" + k.id, { x: X[i] }, i * 600, 1800 + (4 - i) * 160).concat(wave("s" + k.id, 2800 + i * 600, 1200, i < 3 ? "armR" : "armL"));
              })) },
              { caption: "آیلار در تبریز زندگی می‌کند. زمستان‌ها سرد است. ناهار، کوفتهٔ تبریزی می‌خورند. به ترکی آذربایجانی تشکر می‌کند: «ساغ اول!»", key: 5600, hold: 7600,
                audio: REC.azThanks, do: D(hide(F.map(function (k) { return "s" + k.id; })), visit(F[0]), show(["snow"], 1800, 600)) },
              { caption: "ژیار در سنندج، در کردستان، زندگی می‌کند. صبحانه نان کلانه می‌خورند: نانی با سبزی. به کردی تشکر می‌کند: «سوپاس!»", key: 5600, hold: 7600,
                audio: REC.kuThanks, do: visit(F[1], all(F[0]).concat(["snow"])) },
              { caption: "نگار در رشت، در گیلان، زندگی می‌کند. آنجا باران زیاد می‌بارد. میرزاقاسمی را با برنج می‌خورند.", key: 4600, hold: 7000,
                do: visit(F[2], all(F[1]), D(show(["rain"], 1800, 600), show(["rice"], 3000, 600))) },
              { caption: "ریم در اهواز، در خوزستان، زندگی می‌کند. هوا گرم است و نخل خرما زیاد. فلافل اهوازی معروف است. به عربی تشکر می‌کند: «شکراً!»", key: 5600, hold: 7600,
                audio: REC.arThanks, do: visit(F[3], all(F[2]).concat(["rain", "rice"]), show(["dates", "sun"], 2000, 600)) },
              { caption: "ماهگل در چابهار، در سیستان و بلوچستان، زندگی می‌کند. انبه و موز می‌روید. لباسش سوزن‌دوزی دارد. به بلوچی تشکر می‌کند: «منّت‌وار!»", key: 5600, hold: 7600,
                audio: REC.balThanks, do: visit(F[4], all(F[3]).concat(["dates", "sun"]), D(show(["banana"], 2000, 600), [pulse("bbal", 3000, 1.04, 700)])) },
              { caption: "خوراک‌ها و زبان‌هایمان فرق دارد. ولی همه نوروز سفرهٔ هفت‌سین می‌چینیم و مهمان را با چای پذیرایی می‌کنیم.", key: 4600, hold: 7400, do: D(
                hide(all(F[4]).concat(["banana"])), show(["sofreh"], 400, 700), show(["sabzeh", "apple", "tea"], 1200, 600),
                F.map(function (k, i) { return { id: "s" + k.id, to: { x: [144, 126, 34, 16, 52][i] }, dur: 1 }; }),
                show(F.map(function (k) { return "s" + k.id; }), 1600, 800), wave("sgi", 3000, 1400)) }
            ] };
        })(),
        { type: "pairs", prompt: "هر استان، یک خوراک", say: "هر استان را با خوراکی که آنجا معروف است جفت کن.",
          pairs: [
            [{ label: "آذربایجان", say: "آذربایجان، تبریز" }, { pic: "🍲", label: "کوفتهٔ تبریزی", say: "کوفتهٔ تبریزی" }],
            [{ label: "کردستان", say: "کردستان، سنندج" }, { pic: "🫓", label: "نان کلانه", say: "نان کلانه" }],
            [{ label: "گیلان", say: "گیلان، رشت" }, { pic: "🍆", label: "میرزاقاسمی", say: "میرزاقاسمی" }],
            [{ label: "خوزستان", say: "خوزستان، اهواز" }, { pic: "🧆", label: "فلافل اهوازی", say: "فلافل اهوازی" }],
            [{ label: "سیستان و بلوچستان", say: "سیستان و بلوچستان، چابهار" }, { pic: "🥭", label: "انبه", say: "انبه" }]
          ] },
        { type: "pairs", prompt: "هر دوست، کجا؟", say: "هر دوست را با شهرش جفت کن.",
          pairs: [
            [{ label: "آیلار", say: "آیلار" }, { label: "تبریز", say: "تبریز" }],
            [{ label: "ژیار", say: "ژیار" }, { label: "سنندج", say: "سنندج" }],
            [{ label: "نگار", say: "نگار" }, { label: "رشت", say: "رشت" }],
            [{ label: "ریم", say: "ریم" }, { label: "اهواز", say: "اهواز" }],
            [{ label: "ماهگل", say: "ماهگل" }, { label: "چابهار", say: "چابهار" }]
          ] },
        { type: "choose", prompt: "نوروز، همه چه می‌چینند؟", say: "آیلار، ژیار، نگار، ریم و ماهگل، نوروز همه چه می‌چینند؟", pic: true,
          options: [{ label: "🌱", value: "سفرهٔ هفت‌سین" }, { label: "🎂", value: "کیک تولد" }, { label: "🎈", value: "بادکنک" }], answer: "سفرهٔ هفت‌سین" },
        { type: "talk", scene: "🍲 🫓 🍆 🧆 🥭", caption: "خوراک محبوب خانوادهٔ تو چیست؟ مال کدام شهر یا استان است؟ مهمان که می‌آید چه می‌کنید؟" }
      ]
    },

    /* Sources: the languages and scripts of Iran (Encyclopaedia Iranica, "Iran vi. Iranian languages and scripts";
       Ethnologue, Iran; Unicode Standard, the Arabic, Armenian and Syriac scripts). Persian, Azerbaijani Turkish,
       Kurdish (Sorani), Arabic and Balochi are written in Iran with Arabic-based letters, so many letters are shared;
       Armenian has its own alphabet and Assyrian (Neo-Aramaic) is written in Syriac letters. "Water" in each, as
       speakers in Iran write it: Persian «آب»، Azerbaijani «سو»، Kurdish «ئاو»، Arabic «ماء»، Balochi «آپ»، Armenian
       «ջուր» (جور)، Assyrian «ܡܝܐ» (مَیّا). NEEDS REVIEW by a speaker of each language (CURRICULUM.md, «Reviewers for
       ایران و جهان»), and recordings, as in world-sprout-6: the device voice never says these words, the child sees
       them and hears Persian around them (`say`). Shamiram is a new Assyrian friend from Urmia. */
    {
      id: "world-sapling-43", subject: "world", level: "sapling", emoji: "✍️", title: "زبان‌ها و خط‌های ایران",
      steps: [
        (function () {
          var F = [{ id: "fa", kid: "w-kian2", w: "آب" }, { id: "az", kid: "w-aylar", w: "سو" }, { id: "ku", kid: "w-zhiyar", w: "ئاو" },
            { id: "ar", kid: "w-reem", w: "ماء" }, { id: "bal", kid: "w-mahgol", w: "آپ" }];
          var X = [140, 112, 84, 56, 28], parts = { meadow: { art: "w-meadow" } };
          F.forEach(function (k, i) {
            parts["k" + k.id] = { art: k.kid, at: [X[i], 86], s: 1.05, o: 0 };
            parts["c" + k.id] = { art: "w-word-card", at: [X[i], 30], s: 0.85, o: 0 }; parts["w" + k.id] = { art: k.w, at: [X[i], 31], s: 0.5, o: 0 };
          });
          parts.ani = { art: "w-ani", at: [118, 87], s: 1.45, o: 0 }; parts.cani = { art: "w-word-card", at: [62, 34], s: 1.5, o: 0 }; parts.wani = { art: "ջուր", at: [62, 35], s: 0.6, o: 0 };
          parts.sham = { art: "w-shamiram", at: [118, 87], s: 1.45, o: 0 }; parts.csham = { art: "w-word-card", at: [62, 34], s: 1.5, o: 0 }; parts.wsham = { art: "ܡܝܐ", at: [62, 35], s: 0.7, o: 0 };
          parts.drop = { art: "💧", at: [62, 62], s: 1.2, o: 0 }; parts.heart = { art: "w-heart", at: [80, 22], s: 0.3, o: 0 };
          var kids = F.map(function (k) { return "k" + k.id; }), cards = F.map(function (k) { return "c" + k.id; }).concat(F.map(function (k) { return "w" + k.id; }));
          return { type: "scene", prompt: "یک کلمه، چند خط", bg: "#cdeaf7", parts: parts,
            scenes: [
              { caption: "کیان، آیلار، ژیار، ریم و ماهگل هر کدام کلمهٔ «آب» را به زبان خودشان می‌نویسند.", key: 4000, hold: 6400, do: D(
                show(kids, 0, 800), F.map(function (k, i) { return show(["c" + k.id, "w" + k.id], 1200 + i * 600, 500); }).reduce(function (a, b) { return a.concat(b); }, [])) },
              { caption: "فارسی، ترکی آذربایجانی، کردی، عربی و بلوچی را با حرف‌هایی شبیه هم می‌نویسند. «آب» فارسی و «آپ» بلوچی چقدر شبیه‌اند!", key: 3600, hold: 6400, do: [
                pulse("wfa", 800, 1.4, 900), pulse("cfa", 800, 1.2, 900), pulse("wbal", 2000, 1.4, 900), pulse("cbal", 2000, 1.2, 900)] },
              { caption: "آنی ارمنی است و در اصفهان زندگی می‌کند. ارمنی خط خودش را دارد. «آب» به ارمنی این است.", say: "آنی ارمنی است و در اصفهان زندگی می‌کند. ارمنی خط خودش را دارد. ببین «آب» را به ارمنی چطور می‌نویسند.",
                key: 3600, hold: 6400, do: D(hide(kids.concat(cards), 0, 600), show(["ani"], 600, 700), wave("ani", 1400, 1400), show(["cani", "wani", "drop"], 2200, 600)) },
              { caption: "شمیرام آشوری است و در ارومیه زندگی می‌کند. آشوری هم خط خودش را دارد. «آب» به آشوری این است.", say: "شمیرام آشوری است و در ارومیه زندگی می‌کند. آشوری هم خط خودش را دارد. ببین «آب» را به آشوری چطور می‌نویسند.",
                key: 3600, hold: 6400, do: D(hide(["ani", "cani", "wani"], 0, 600), show(["sham"], 600, 700), wave("sham", 1400, 1400), show(["csham", "wsham"], 2200, 600)) },
              { caption: "هفت دوست، هفت جور نوشتن. ولی همه یک چیز را می‌گویند: آب! هر زبان و هر خطی ارزشمند است.", key: 4000, hold: 7000, do: D(
                hide(["sham", "csham", "wsham", "drop"], 0, 600),
                F.map(function (k, i) { return { id: "k" + k.id, to: { x: [148, 126, 104, 82, 60][i] }, at: 600, dur: 1 }; }),
                [{ id: "ani", to: { x: 38, y: 86, s: 1.05 }, at: 600, dur: 1 }, { id: "sham", to: { x: 16, y: 86, s: 1.05 }, at: 600, dur: 1 }],
                show(kids.concat(["ani", "sham"]), 700, 700), [{ id: "heart", to: { o: 1, s: 2.2 }, at: 1600, dur: 1000, ease: "back" }, pulse("heart", 2800, 1.15)]) }
            ] };
        })(),
        { type: "pairs", prompt: "هر دوست، «آب» به زبان خودش", say: "هر دوست را با کلمهٔ «آب» به زبان خودش جفت کن.",
          pairs: [
            [{ label: "آیلار، ترکی آذربایجانی", say: "آیلار، ترکی آذربایجانی" }, { label: "سو", say: "آب، به ترکی آذربایجانی" }],
            [{ label: "ژیار، کردی", say: "ژیار، کردی" }, { label: "ئاو", say: "آب، به کردی" }],
            [{ label: "ریم، عربی", say: "ریم، عربی" }, { label: "ماء", say: "آب، به عربی" }],
            [{ label: "آنی، ارمنی", say: "آنی، ارمنی" }, { label: "ջուր", say: "آب، به ارمنی" }]
          ] },
        { type: "choose", prompt: "کدام با خطی دیگر نوشته شده؟", say: "یکی از این کلمه‌ها با حرف‌هایی کاملاً دیگر نوشته شده. کدام؟",
          options: ["آب", "آپ", "ջուր"], answer: "ջուր" },
        { type: "talk", scene: "✍️ 🗣️ 👵", caption: "در خانواده یا کلاس تو کسی به زبان دیگری هم حرف می‌زند؟ از او بخواه «آب» را به زبانش بگوید و بنویسد." }
      ]
    },

    /* Sources: folk tales told across Iran. Mulla Nasreddin's stories are told in Persian, Azerbaijani Turkish
       (where he is «ملا نصرالدین» of Tabriz's children's books), Kurdish and Arabic (as Joha), all over the region;
       "Eat, my coat!" («بخور ای پالتو / آستین نو بخور پلو») is one of the best known (Encyclopaedia Iranica,
       "Mollā Naṣr-al-Din"). "The elephant in the dark" is Rumi's telling in the Masnavi (book 3) of a tale known in
       many places, retold here in simple words. What they teach: respect people for who they are, not their clothes;
       each of us knows only part of a thing, so we listen to others. NCSS C3 D2.His.2.3–5 (stories from the past). */
    {
      id: "world-sapling-21", subject: "world", level: "sapling", emoji: "📜", title: "قصه‌های مردم ایران",
      steps: [
        { type: "scene", prompt: "بخور، پالتوی من، بخور!", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, sofreh: { art: "w-sofreh", at: [80, 84], s: 1.0 }, ash: { art: "🍲", at: [104, 78], s: 0.5 }, bread: { art: "🫓", at: [70, 79], s: 0.45 },
            g1: { art: "w-mom2", at: [18, 86], s: 1.05 }, g2: { art: "w-dad", at: [36, 86], s: 1.05 }, host: { art: "w-dad2", at: [130, 86], s: 1.05 },
            mulla: { art: "w-mulla", at: [182, 86], s: 1.05 }, mulla2: { art: "w-mulla-coat", at: [182, 86], s: 1.05, o: 0 },
            b1: { art: "w-bubble-wide", at: [96, 36], o: 0 }, b1w: { art: "بخور، پالتو، بخور!", at: [96, 38], s: 0.3, o: 0 },
            b2: { art: "w-bubble-wide", at: [96, 36], s: 1.2, o: 0 }, b2w: { art: "به پالتو احترام گذاشتید!", at: [96, 38], s: 0.28, o: 0 }
          },
          scenes: [
            { caption: "قصه‌های ملانصرالدین را در همه جای ایران می‌گویند: به فارسی، ترکی، کردی و عربی. یک روز ملا را به مهمانی دعوت کردند.", key: 4400, hold: 6800, do: D(
              walk("mulla", { x: 154 }, 600, 3200)) },
            { caption: "ملا با لباس کهنه رفت. کسی به او سلام نکرد و جایی کنار سفره به او ندادند. ملا ناراحت شد.", key: 3200, hold: 5600, do: [
              { id: "host.head", to: { r: -14 }, at: 400, dur: 600 }, { id: "g2.head", to: { r: -14 }, at: 600, dur: 600 },
              { id: "mulla.smile", to: { o: 0 }, at: 1600, dur: 300 }, { id: "mulla.sad", to: { o: 1 }, at: 1600, dur: 300 }] },
            { caption: "ملا به خانه رفت، پالتوی نو و قشنگی پوشید و برگشت.", key: 6000, hold: 7400, do: D(
              walk("mulla", { x: 186 }, 200, 1800), [{ id: "mulla", to: { o: 0 }, at: 2000, dur: 1 }, { id: "mulla2", to: { o: 1 }, at: 2600, dur: 1 },
              { id: "host.head", to: { r: 0 }, at: 2400, dur: 400 }, { id: "g2.head", to: { r: 0 }, at: 2400, dur: 400 }], walk("mulla2", { x: 154 }, 2800, 3000)) },
            { caption: "این بار صاحب‌خانه جلو آمد، سلام کرد و ملا را کنار سفره برد.", key: 5200, hold: 6800, do: D(
              wave("host", 300, 1600), walk("mulla2", { x: 114 }, 2000, 2800)) },
            { caption: "ملا آستینش را جلوی کاسهٔ آش گرفت و گفت: «بخور، پالتوی من، بخور!»", key: 3400, hold: 5600, do: D(
              [{ id: "mulla2.armL", to: { r: 40 }, at: 300, dur: 700 }], show(["b1", "b1w"], 1600, 400)) },
            { caption: "همه تعجب کردند. ملا گفت: «شما به پالتوی من احترام گذاشتید، نه به خودم!» آدم‌ها را برای خودشان دوست داشته باش، نه برای لباسشان.", key: 3600, hold: 7600, do: D(
              hide(["b1", "b1w"], 0, 300), [{ id: "mulla2.armL", to: { r: 0 }, at: 300, dur: 500 }], show(["b2", "b2w"], 900, 400),
              [{ id: "g1.head", to: { r: 10 }, at: 1800, dur: 500, yoyo: true, times: 2 }, { id: "g2.head", to: { r: -10 }, at: 2000, dur: 500, yoyo: true, times: 2 }]) }
          ] },
        { type: "order", prompt: "قصهٔ ملا به ترتیب", say: "اول چه شد؟ بعد چه؟ قصه را به ترتیب بچین.", numbered: true,
          items: [{ pic: "👴", label: "ملا با لباس کهنه رفت", say: "ملا با لباس کهنه به مهمانی رفت" }, { pic: "😔", label: "کسی سلام نکرد", say: "کسی به او سلام نکرد" },
            { pic: "🧥", label: "پالتوی نو پوشید", say: "ملا پالتوی نو پوشید و برگشت" }, { pic: "🍲", label: "بخور، پالتو!", say: "ملا گفت: بخور، پالتوی من، بخور!" }] },
        { type: "choose", prompt: "این قصه چه یادمان می‌دهد؟", say: "قصهٔ ملا و پالتو چه یادمان می‌دهد؟",
          options: ["آدم‌ها را برای خودشان احترام بگذاریم، نه لباسشان", "همیشه پالتوی نو بپوشیم", "آش را با آستین بخوریم"], answer: "آدم‌ها را برای خودشان احترام بگذاریم، نه لباسشان" },
        { type: "passage", prompt: "قصهٔ «فیل در تاریکی» را بخوان. مولوی این قصه را در مثنوی گفته است.",
          text: "چند نفر هیچ‌وقت فیل ندیده بودند. فیلی را در اتاقی تاریک آوردند. یکی دست به خرطومش زد و گفت: «فیل مثل لوله است.» یکی گوشش را لمس کرد و گفت: «فیل مثل بادبزن است.» یکی پایش را گرفت و گفت: «فیل مثل ستون است.» اگر شمعی داشتند، همه با هم فیل را می‌دیدند.",
          question: "چرا هر کس چیز دیگری گفت؟",
          options: ["چون هر کس فقط یک تکه از فیل را لمس کرد", "چون فیل شکلش را عوض کرد", "چون با هم دعوا داشتند"], answer: "چون هر کس فقط یک تکه از فیل را لمس کرد" },
        { type: "choose", prompt: "قصهٔ فیل در تاریکی چه یادمان می‌دهد؟", say: "قصهٔ فیل در تاریکی چه یادمان می‌دهد؟",
          options: ["حرف دیگران را هم گوش کنیم، چون هر کس تکه‌ای را می‌داند", "به اتاق تاریک نرویم", "فیل مثل بادبزن است"], answer: "حرف دیگران را هم گوش کنیم، چون هر کس تکه‌ای را می‌داند" },
        { type: "talk", scene: "📜 👵 🌙", caption: "تو قصه‌ای از شهر خودت یا از پدربزرگ و مادربزرگت بلدی؟ تعریف کن. آن قصه چه یادت می‌دهد؟" }
      ]
    },

    /* Sources: crafts of Iran by region (UNESCO Intangible Cultural Heritage: "Traditional skills of carpet weaving in
       Fars" and "in Kashan", 2010; Tabriz as a World Craft City for carpets, World Crafts Council 2015; Isfahan's
       tilework and qalamkar, Shiraz's khatam and Lalejin's turquoise pottery (World Crafts Council: Lalejin, World
       Pottery City, 2016); Iran's fourth-grade social studies, «صنایع دستی»; NCSS C3 D2.Geo.6.3–5). Khatam is made of
       tiny triangles of wood, bone and metal; here we say wood and metal. Buildings are "old buildings", never named
       as religious ones. */
    {
      id: "world-sapling-6", subject: "world", level: "sapling", emoji: "🧶", title: "دست‌های هنرمند",
      steps: [
        { type: "scene", prompt: "کارگاه‌های هنر دستی", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room3" },
            mTab: { art: "w-map-tabriz", at: [28, 22], s: 0.75, o: 0 }, loom: { art: "w-loom", at: [76, 86], s: 1.4, o: 0 }, weaver: { art: "w-weaver", at: [112, 86], s: 1.15, o: 0 },
            mIsf: { art: "w-map-isfahan", at: [28, 22], s: 0.75, o: 0 }, tiles: { art: "w-tilework", at: [78, 44], s: 1.1, o: 0 }, tiler: { art: "w-tiler", at: [122, 86], s: 1.15, o: 0 },
            cloth: { art: "w-qalamkar", at: [74, 58], s: 1.2, o: 0 }, stamp: { art: "w-stamp", at: [60, 40], s: 1.4, o: 0 }, stamper: { art: "w-stamper", at: [108, 86], s: 1.15, o: 0 },
            mShi: { art: "w-map-shiraz", at: [28, 22], s: 0.75, o: 0 }, box: { art: "w-khatam", at: [76, 66], s: 1.5, o: 0 }, kmaker: { art: "w-khatam-maker", at: [120, 86], s: 1.15, o: 0 },
            mHam: { art: "w-map-hamadan", at: [28, 22], s: 0.75, o: 0 }, wheel: { art: "w-wheel", at: [80, 86], s: 1.6, o: 0 }, potter: { art: "w-potter", at: [106, 86], s: 1.15, o: 0 },
            r1: { art: "w-khatam", at: [22, 80], s: 0.8, o: 0 }, r2: { art: "w-tilework", at: [52, 66], s: 0.7, o: 0 }, r3: { art: "w-qalamkar", at: [88, 68], s: 0.7, o: 0 }, r4: { art: "🧶", at: [120, 70], s: 1.1, o: 0 }, r5: { art: "🏺", at: [144, 70], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "در تبریز فرش می‌بافند. بافنده نخ‌ها را گره به گره می‌زند تا نقش فرش کم‌کم پیدا شود.", key: 5400, hold: 7400, do: D(
              show(["mTab", "loom", "weaver"], 200, 700), [{ id: "loom.rug", to: { sy: 0.1 }, dur: 1 }, { id: "loom.rug", to: { sy: 1 }, at: 1200, dur: 4000 },
              pulse("mTab.dot", 1000, 2.2, 1000), { id: "weaver.armR", to: { r: -50 }, at: 1200, dur: 500 }, { id: "weaver.armR", to: { r: -30 }, at: 1700, dur: 3400, yoyo: true, times: 8 }]) },
            { caption: "در اصفهان کاشی‌های آبی می‌سازند و دیوار بناهای قدیمی را با آن‌ها می‌پوشانند.", key: 6200, hold: 7800, do: D(
              hide(["mTab", "loom", "weaver"], 0, 600), show(["mIsf", "tiles", "tiler"], 600, 700), [pulse("mIsf.dot", 1400, 2.2, 1000), { id: "tiler.armL", to: { r: 120 }, at: 1200, dur: 500 }],
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { return { id: "tiles.t" + i, to: { o: 1 }, at: 1400 + i * 380, dur: 300 }; })) },
            { caption: "قلمکار هم کار اصفهان است: با مُهرهای چوبی، نقش‌ها را یکی‌یکی روی پارچه می‌زنند.", key: 5800, hold: 7400, do: D(
              hide(["tiles", "tiler"], 0, 600), show(["cloth", "stamp", "stamper"], 600, 700), [{ id: "stamper.armL", to: { r: 110 }, at: 1200, dur: 500 }],
              [1, 2, 3].map(function (n, i) { var x = [60, 74, 88][i], t = 1600 + i * 1400;
                return [{ id: "stamp", to: { x: x, y: 50 }, at: t, dur: 400 }, { id: "stamp", to: { y: 56 }, at: t + 400, dur: 250 }, { id: "cloth.p" + n, to: { o: 1 }, at: t + 650, dur: 150 }, { id: "stamp", to: { y: 46 }, at: t + 800, dur: 300 }]; })
                .reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "در شیراز خاتم می‌سازند: تکه‌های خیلی ریز چوب و فلز را کنار هم می‌چینند تا نقش ستاره‌ای درست شود.", key: 3800, hold: 6400, do: D(
              hide(["mIsf", "cloth", "stamp", "stamper"], 0, 600), show(["mShi", "box", "kmaker"], 600, 700), [pulse("mShi.dot", 1400, 2.2, 1000), pulse("box", 2600, 1.12, 900)]) },
            { caption: "در لالجینِ همدان، سفال‌گر گِل را روی چرخ می‌چرخاند و کوزهٔ فیروزه‌ای می‌سازد.", key: 5000, hold: 7000, do: D(
              hide(["mShi", "box", "kmaker"], 0, 600), show(["mHam", "wheel", "potter"], 600, 700), [pulse("mHam.dot", 1400, 2.2, 1000),
              { id: "wheel.pot", to: { sx: 0.6, sy: 0.25 }, dur: 1 }, { id: "wheel.pot", to: { sx: 1, sy: 1 }, at: 1600, dur: 3200 }, { id: "potter.armL", to: { r: 60 }, at: 1400, dur: 500 }]) },
            { caption: "هر کار دستی حوصله و هنر می‌خواهد. فرش، کاشی، قلمکار، خاتم و سفال: هر کدام از یک گوشهٔ ایران.", key: 3400, hold: 6400, do: D(
              hide(["mHam", "wheel", "potter"], 0, 600), show(["r1", "r2", "r3", "r4", "r5"], 700, 600),
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { return { id: "r2.t" + i, to: { o: 1 }, dur: 1 }; }), [1, 2, 3].map(function (n) { return { id: "r3.p" + n, to: { o: 1 }, dur: 1 }; })) }
          ] },
        { type: "pairs", prompt: "هر هنر، کدام شهر؟", say: "هر هنر دستی را با شهرش جفت کن.",
          pairs: [
            [{ pic: "🧶", label: "فرش", say: "فرش" }, { label: "تبریز", say: "تبریز" }],
            [{ pic: "🟦", label: "کاشی", say: "کاشی آبی" }, { label: "اصفهان", say: "اصفهان" }],
            [{ pic: "⭐", label: "خاتم", say: "خاتم" }, { label: "شیراز", say: "شیراز" }],
            [{ pic: "🏺", label: "سفال فیروزه‌ای", say: "سفال فیروزه‌ای" }, { label: "لالجین همدان", say: "لالجینِ همدان" }]
          ] },
        { type: "pairs", prompt: "هر هنر، از چه ساخته می‌شود؟", say: "هر هنر دستی را با چیزی که از آن ساخته می‌شود جفت کن.",
          pairs: [
            [{ label: "فرش", say: "فرش" }, { pic: "🧵", label: "نخ و پشم", say: "نخ و پشم" }],
            [{ label: "سفال", say: "سفال" }, { pic: "🟤", label: "گِل", say: "گِل" }],
            [{ label: "قلمکار", say: "قلمکار" }, { pic: "👕", label: "پارچه", say: "پارچه" }],
            [{ label: "خاتم", say: "خاتم" }, { pic: "🪵", label: "تکه‌های ریز چوب", say: "تکه‌های ریز چوب و فلز" }]
          ] },
        { type: "choose", prompt: "بافنده فرش را چطور می‌سازد؟", say: "بافنده فرش را چطور می‌سازد؟",
          options: ["گره به گره، با حوصله", "با یک مُهر، در یک لحظه", "روی چرخ سفال‌گری"], answer: "گره به گره، با حوصله" },
        home({ pic: "✋ 🎨 🧶", text: "یک کار دستی ایرانی پیدا کن!",
          need: ["یک فرش، گلیم، کاشی، ظرف سفالی، رومیزی قلمکار یا جعبهٔ خاتم در خانه (یا عکسش)", "کاغذ و مداد رنگی"],
          steps: [
            "با کودک در خانه دنبال یک کار دستی بگردید. اگر نیست، عکسش را با هم ببینید.",
            "از نزدیک نگاهش کنید: چه رنگ‌ها و چه نقش‌هایی دارد؟ نقش‌ها تکرار می‌شوند؟",
            "بپرسید: «فکر می‌کنی ساختنش چقدر طول کشیده؟ از چه ساخته شده؟»",
            "کودک یک نقش ساده از آن را روی کاغذ بکشد، یا با کاغذهای رنگی تکه‌تکه کنار هم بچسباند، مثل خاتم."
          ],
          ask: "اگر هنرمند بودی، کدام هنر دستی را یاد می‌گرفتی؟" })
      ]
    },

    /* Sources: a unit game that brings back world.sap.19 (people of the provinces, languages and tales:
       world-sapling-20, 43 and 21) and world.sap.12 (crafts: world-sapling-6). The words are the reviewed-pending ones
       of world-sprout-6 and world-sapling-43, never said by the device voice. */
    {
      id: "world-sapling-22", subject: "world", level: "sapling", emoji: "🧩", title: "بازی مردم ایران",
      steps: [
        { type: "map", map: "iran", layers: ["provinces", "seas"], say: "دوست‌هایمان در کدام استان زندگی می‌کنند؟",
          tasks: [
            { find: "east-azerbaijan", prompt: "آیلار در تبریز زندگی می‌کند. استانش را پیدا کن: آذربایجان شرقی." },
            { find: "kurdistan", prompt: "ژیار در سنندج زندگی می‌کند. استانش را پیدا کن: کردستان." },
            { find: "gilan", prompt: "نگار در رشت زندگی می‌کند. استانش را پیدا کن: گیلان." },
            { find: "khuzestan", prompt: "ریم در اهواز زندگی می‌کند. استانش را پیدا کن: خوزستان." },
            { find: "sistan-baluchestan", prompt: "ماهگل در چابهار زندگی می‌کند. استانش را پیدا کن: سیستان و بلوچستان." }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر دوست، تشکرش", say: "کارت‌ها را برگردان و هر دوست را با کلمهٔ تشکرش پیدا کن.",
          pairs: [
            [{ label: "آیلار", say: "آیلار، از تبریز" }, { label: "ساغ اول", say: "تشکر به ترکی آذربایجانی", audio: REC.azThanks }],
            [{ label: "ژیار", say: "ژیار، از سنندج" }, { label: "سوپاس", say: "تشکر به کردی", audio: REC.kuThanks }],
            [{ label: "ریم", say: "ریم، از اهواز" }, { label: "شکراً", say: "تشکر به عربی", audio: REC.arThanks }],
            [{ label: "ماهگل", say: "ماهگل، از چابهار" }, { label: "منّت‌وار", say: "تشکر به بلوچی", audio: REC.balThanks }]
          ] },
        { type: "sort", prompt: "هنر دستی یا خوراک؟", say: "هر کدام را به سبدش ببر: هنر دستی، یا خوراک.",
          baskets: [{ pic: "🧶", label: "هنر دستی", value: "craft" }, { pic: "🍲", label: "خوراک", value: "food" }],
          items: [
            { label: "فرش", say: "فرش", basket: "craft" }, { label: "خاتم", say: "خاتم", basket: "craft" },
            { label: "قلمکار", say: "قلمکار", basket: "craft" }, { label: "سفال", say: "سفال", basket: "craft" },
            { label: "کوفتهٔ تبریزی", say: "کوفتهٔ تبریزی", basket: "food" }, { label: "نان کلانه", say: "نان کلانه", basket: "food" },
            { label: "میرزاقاسمی", say: "میرزاقاسمی", basket: "food" }, { label: "فلافل اهوازی", say: "فلافل اهوازی", basket: "food" }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر هنر، شهرش", say: "کارت‌ها را برگردان و هر هنر دستی را با شهرش پیدا کن.",
          pairs: [
            [{ pic: "🧶", label: "فرش", say: "فرش" }, { label: "تبریز", say: "تبریز" }],
            [{ pic: "🟦", label: "کاشی", say: "کاشی" }, { label: "اصفهان", say: "اصفهان" }],
            [{ pic: "⭐", label: "خاتم", say: "خاتم" }, { label: "شیراز", say: "شیراز" }],
            [{ pic: "🏺", label: "سفال", say: "سفال فیروزه‌ای" }, { label: "همدان", say: "لالجینِ همدان" }]
          ] },
        { type: "map", map: "iran", layers: ["seas"], cities: ["tabriz", "isfahan", "shiraz", "hamadan"], labels: true, say: "شهرهای هنرهای دستی را پیدا کن.",
          tasks: [
            { find: "tabriz", prompt: "فرش تبریز معروف است. تبریز را پیدا کن." },
            { find: "isfahan", prompt: "کاشی و قلمکار را در کدام شهر می‌سازند؟ اصفهان را پیدا کن." },
            { find: "shiraz", prompt: "خاتم را در شیراز می‌سازند. شیراز را پیدا کن." },
            { find: "hamadan", prompt: "لالجین نزدیک همدان است. همدان را پیدا کن." }
          ] },
        { type: "sort", prompt: "همان حرف‌ها یا خطی دیگر؟", say: "هر کلمهٔ «آب» را به سبدش ببر: با حرف‌هایی مثل فارسی نوشته شده، یا با خطی دیگر.",
          baskets: [{ pic: "آ ب", label: "حرف‌های مثل فارسی", value: "same" }, { pic: "✍️", label: "خطی دیگر", value: "other" }],
          items: [
            { label: "آب", say: "آب، به فارسی", basket: "same" }, { label: "سو", say: "آب، به ترکی آذربایجانی", basket: "same" },
            { label: "ئاو", say: "آب، به کردی", basket: "same" }, { label: "ماء", say: "آب، به عربی", basket: "same" },
            { label: "ջուր", say: "آب، به ارمنی", basket: "other" }, { label: "ܡܝܐ", say: "آب، به آشوری", basket: "other" }
          ] },
        { type: "choose", prompt: "ملا به پالتویش گفت «بخور!». چرا؟", say: "در قصه، ملا به پالتویش گفت: بخور! چرا؟",
          options: ["چون مهمان‌ها به پالتو احترام گذاشتند، نه به خودش", "چون پالتو گرسنه بود", "چون آش سرد بود"], answer: "چون مهمان‌ها به پالتو احترام گذاشتند، نه به خودش" }
      ]
    },

    /* Sources: town services and the people who run them (Iran's third- and fourth-grade social studies,
       «خدمات شهری»; NCSS C3 D2.Civ.6.3–5 and D2.Eco.1.3–5). Street sweepers and rubbish lorries keep the streets
       clean; electricity comes to homes along wires; fire fighters are always ready to help; the librarian helps you
       find a book; the post carries letters and parcels. Nothing frightening is shown (no fire). Water, from the dam
       to the tap, is world-sapling-18. */
    {
      id: "world-sapling-23", subject: "world", level: "sapling", emoji: "🏙️", title: "شهر ما چطور کار می‌کند؟",
      steps: [
        { type: "scene", prompt: "یک صبح در شهر", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            h1: { art: "w-house", at: [596, 64], s: 1.3 }, h2: { art: "w-house", at: [540, 64], s: 1.2 }, bin: { art: "w-rubbish-bin", at: [566, 70], s: 1.2 },
            sweeper: { art: "w-sweeper", at: [516, 72], s: 1.05 }, truck: { art: "w-truck", at: [700, 84], s: 0.9 },
            pole: { art: "w-power-pole", at: [452, 66], s: 1.1 }, h3: { art: "w-house", at: [408, 64], s: 1.1 }, elec: { art: "w-electrician", at: [470, 72], s: 1.05 },
            fire: { art: "w-firestation", at: [336, 64], s: 1.2 }, fireT: { art: "آتش‌نشانی", at: [336, 26.4], s: 0.16 }, ff: { art: "w-firefighter", at: [376, 72], s: 1.05 },
            lib: { art: "w-library", at: [226, 64], s: 1.2 }, libT: { art: "کتابخانه", at: [226, 14.4], s: 0.16 }, libr: { art: "w-librarian", at: [262, 72], s: 1.05 },
            book: { art: "📕", at: [258, 58], s: 0.32, o: 0 },
            post: { art: "w-postoffice", at: [118, 64], s: 1.2 }, postT: { art: "پست", at: [118, 30], s: 0.18 }, postman: { art: "w-postman", at: [128, 72], s: 1.05 },
            parcel: { art: "📦", at: [134, 62], s: 0.4 },
            home: { art: "w-house", at: [24, 64], s: 1.3 }, hbin: { art: "w-rubbish-bin", at: [46, 70], s: 1.2 },
            dad: { art: "👨", at: [612, 71], flip: true, look: { top: "#5aa36a", bottom: "#4b5a78" } },
            hasti: { art: "👧", at: [626, 73], s: 0.9, flip: true, look: { top: "#e46b6b", hairColor: "#6b3f26" } }
          },
          scenes: [
            { caption: "صبح است. هستی و پدرش در شهر قدم می‌زنند. رفتگر کوچه را جارو می‌کند و ماشین زباله، زباله‌ها را می‌برد.", key: 5600, hold: 7400, do: [
              { cam: { x: 560 }, dur: 1 }, { id: "dad", walk: [580, 71], at: 400, dur: 2400 }, { id: "hasti", walk: [594, 73], at: 400, dur: 2400 },
              { id: "sweeper.armR", to: { r: -30 }, at: 600, dur: 600, yoyo: true, times: 6 }, { id: "truck", to: { x: 512 }, at: 1600, dur: 3800 }] },
            { caption: "این تیر برق است. برق با این سیم‌ها به خانه‌ها می‌رسد. برق‌کار مواظب است سیم‌ها سالم باشند.", key: 5600, hold: 7400, do: [
              { cam: { x: 450 }, dur: 3600, ease: "linear" }, { id: "dad", walk: [478, 71], dur: 3600 }, { id: "hasti", walk: [492, 73], dur: 3600 },
              { id: "pole.wires", to: { o: 0.3 }, at: 3800, dur: 400, yoyo: true, times: 4 }, { id: "elec.armR", to: { r: -120 }, at: 4000, dur: 600 }] },
            { caption: "این ایستگاه آتش‌نشانی است. آتش‌نشان‌ها همیشه آماده‌اند تا به مردم کمک کنند.", key: 5200, hold: 7000, do: D(
              [{ cam: { x: 340 }, dur: 3600, ease: "linear" }, { id: "dad", walk: [392, 71], dur: 3600 }, { id: "hasti", walk: [406, 73], dur: 3600 }],
              wave("ff", 3800, 1600)) },
            { caption: "در کتابخانه، کتاب‌دار به هستی کمک می‌کند کتاب دلخواهش را پیدا کند.", key: 6000, hold: 7600, do: [
              { cam: { x: 228 }, dur: 3600, ease: "linear" }, { id: "dad", walk: [290, 71], dur: 3600 }, { id: "hasti", walk: [276, 73], dur: 3600 },
              { id: "libr.armL", to: { r: -70 }, at: 3800, dur: 600 }, { id: "book", to: { o: 1 }, at: 4400, dur: 300 }, { id: "book", to: { x: 270 }, at: 4800, dur: 800 }] },
            { caption: "پستچی بسته‌ها و نامه‌ها را از ادارهٔ پست به خانه‌ها می‌برد.", key: 5600, hold: 7400, do: [
              { id: "book", to: { o: 0 }, dur: 300 },
              { cam: { x: 118 }, dur: 3600, ease: "linear" }, { id: "dad", walk: [176, 71], dur: 3600 }, { id: "hasti", walk: [162, 73], dur: 3600 },
              { id: "postman", to: { x: 92 }, at: 3600, dur: 2000 }, { id: "parcel", to: { x: 98 }, at: 3600, dur: 2000 }] },
            { caption: "این آدم‌ها هر روز برای همهٔ ما کار می‌کنند. ما هم کمک می‌کنیم: زباله را در سطل می‌ریزیم و آب و برق را هدر نمی‌دهیم.", key: 5400, hold: 7800, do: [
              { cam: { x: 60 }, dur: 3400, ease: "linear" }, { id: "dad", walk: [70, 71], dur: 3400 }, { id: "hasti", walk: [56, 73], dur: 3400 },
              { id: "hbin", to: { s: 1.4 }, at: 3800, dur: 400, yoyo: true, times: 2 }] }
          ] },
        { type: "pairs", prompt: "هر کار، کدام آدم؟", say: "هر کار شهر را با آدمی که آن را انجام می‌دهد جفت کن.",
          pairs: [
            [{ pic: "🧹", label: "تمیزی کوچه", say: "تمیز کردن کوچه" }, { label: "رفتگر", say: "رفتگر" }],
            [{ pic: "⚡", label: "برق", say: "برق" }, { label: "برق‌کار", say: "برق‌کار" }],
            [{ pic: "🚒", label: "ایستگاه آتش‌نشانی", say: "ایستگاه آتش‌نشانی" }, { label: "آتش‌نشان", say: "آتش‌نشان" }],
            [{ pic: "📚", label: "کتابخانه", say: "کتابخانه" }, { label: "کتاب‌دار", say: "کتاب‌دار" }],
            [{ pic: "📮", label: "پست", say: "پست" }, { label: "پستچی", say: "پستچی" }]
          ] },
        { type: "choose", prompt: "تو چطور به شهرت کمک می‌کنی؟", say: "تو چطور می‌توانی به آدم‌هایی که برای شهر کار می‌کنند کمک کنی؟", pic: true,
          options: [{ label: "🗑️", value: "زباله را در سطل می‌ریزم" }, { label: "💡", value: "چراغ‌ها را روشن می‌گذارم" }, { label: "🚰", value: "شیر آب را باز می‌گذارم" }], answer: "زباله را در سطل می‌ریزم" },
        { type: "choose", prompt: "اگر بخواهی کتاب قرض بگیری، کجا می‌روی؟", say: "اگر بخواهی کتابی را قرض بگیری و بخوانی، کجا می‌روی؟", pic: true,
          options: [{ label: "📚", value: "کتابخانه" }, { label: "📮", value: "ادارهٔ پست" }, { label: "🚒", value: "ایستگاه آتش‌نشانی" }], answer: "کتابخانه" }
      ]
    },

    /* Sources: deciding together in a group (Iran's third-grade social studies, «تصمیم‌گیری گروهی» and «مشورت»;
       NCSS C3 D2.Civ.9.K–2 and 3–5, "follow agreed-upon rules for discussions while responding attentively to others
       when addressing ideas and making decisions as a group", and D2.Civ.7.3–5; CASEL, responsible decision-making).
       Steps: say your idea, listen, choose together (a show of hands), accept the choice; the smaller side's turn
       can come next time. A class, not anything political. */
    {
      id: "world-sapling-24", subject: "world", level: "sapling", emoji: "✋", title: "با هم تصمیم می‌گیریم",
      steps: [
        { type: "scene", prompt: "کلاس چه بازی کند؟", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room4" }, board: { art: "w-blackboard", at: [86, 30], s: 1.3 },
            bBall: { art: "⚽", at: [74, 26], s: 0.4, o: 0 }, bRope: { art: "🪢", at: [100, 26], s: 0.4, o: 0 },
            nBall: { art: "۳", at: [74, 36.6], s: 0.3, o: 0 }, nRope: { art: "۲", at: [100, 36.6], s: 0.3, o: 0 },
            yard: { art: "w-yard", o: 0 },
            teacher: { art: "w-teacher", at: [140, 86], s: 1.15 },
            k1: { art: "w-boy", at: [18, 86], s: 1.0 }, k2: { art: "w-girl3", at: [38, 86], s: 1.0 }, k3: { art: "w-boy3", at: [58, 86], s: 1.0 },
            k4: { art: "w-girl2", at: [78, 86], s: 1.0 }, k5: { art: "w-boy4", at: [98, 86], s: 1.0 },
            b1: { art: "w-bubble", at: [24, 46], o: 0 }, b1p: { art: "⚽", at: [24, 45], s: 0.4, o: 0 },
            b4: { art: "w-bubble", at: [84, 46], o: 0 }, b4p: { art: "🪢", at: [84, 45], s: 0.4, o: 0 },
            ball: { art: "w-ball", at: [80, 84], s: 1.4, o: 0 }
          },
          scenes: [
            { caption: "زنگ ورزش است. بچه‌های کلاس باید با هم تصمیم بگیرند چه بازی کنند.", key: 3000, hold: 5400, do: [
              { id: "teacher.armL", to: { r: 40 }, at: 600, dur: 600 }, { id: "teacher.armL", to: { r: 0 }, at: 2400, dur: 600 }] },
            { caption: "نیما فکرش را می‌گوید: «بیایید توپ‌بازی کنیم!» سارا می‌گوید: «طناب‌بازی بهتر است!»", key: 4400, hold: 6400, do: D(
              show(["b1", "b1p"], 400, 400), talk("k1", 400, 1400), show(["b4", "b4p"], 2400, 400), talk("k4", 2400, 1400)) },
            { caption: "بقیه گوش می‌دهند. هر کس فکرش را می‌گوید و دیگران حرفش را قطع نمی‌کنند.", key: 3400, hold: 5600, do: [
              { id: "k2.head", to: { r: -10 }, at: 400, dur: 600 }, { id: "k3.head", to: { r: 10 }, at: 600, dur: 600 }, { id: "k5.head", to: { r: -10 }, at: 800, dur: 600 },
              { id: "teacher.head", to: { r: -8 }, at: 1000, dur: 600 }] },
            { caption: "معلم می‌گوید: «رأی می‌گیریم. هر کس توپ‌بازی می‌خواهد، دستش را بالا ببرد.» سه دست بالا می‌رود.", key: 4600, hold: 6600, do: D(
              hide(["b1", "b1p", "b4", "b4p"], 0, 400), show(["bBall"], 800, 400),
              [{ id: "k1.armR", to: { r: -160 }, at: 2000, dur: 500 }, { id: "k3.armR", to: { r: -160 }, at: 2300, dur: 500 }, { id: "k5.armR", to: { r: -160 }, at: 2600, dur: 500 }],
              show(["nBall"], 3600, 400)) },
            { caption: "«هر کس طناب‌بازی می‌خواهد؟» دو دست بالا می‌رود. سه از دو بیشتر است، پس امروز توپ‌بازی می‌کنند.", key: 4600, hold: 6800, do: D(
              [{ id: "k1.armR", to: { r: 0 }, dur: 400 }, { id: "k3.armR", to: { r: 0 }, dur: 400 }, { id: "k5.armR", to: { r: 0 }, dur: 400 }], show(["bRope"], 600, 400),
              [{ id: "k2.armR", to: { r: -160 }, at: 1600, dur: 500 }, { id: "k4.armR", to: { r: -160 }, at: 1900, dur: 500 }], show(["nRope"], 2800, 400),
              [pulse("nBall", 3600, 1.5, 700)]) },
            { caption: "در حیاط، سارا هم با خوشحالی بازی می‌کند، با اینکه رأی دیگری داده بود. معلم می‌گوید: «فردا نوبت طناب‌بازی است!»", key: 3800, hold: 6400, do: D(
              [{ id: "k2.armR", to: { r: 0 }, dur: 400 }, { id: "k4.armR", to: { r: 0 }, dur: 400 }], show(["yard"], 300, 700), show(["ball"], 600, 400),
              [{ id: "ball", to: { y: 70 }, at: 900, dur: 500, yoyo: true, times: 4 }], wave("k4", 1600, 1600), talk("teacher", 2800, 1200)) }
          ] },
        { type: "order", prompt: "با هم تصمیم گرفتن، به ترتیب", say: "برای اینکه با هم تصمیم بگیریم، اول چه کنیم؟ بعد چه؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🗣️", label: "فکرت را بگو", say: "فکرت را بگو" }, { pic: "👂", label: "به بقیه گوش بده", say: "به حرف بقیه گوش بده" },
            { pic: "✋", label: "رأی بگیرید", say: "با هم رأی بگیرید" }, { pic: "🤝", label: "انتخاب را بپذیر", say: "انتخاب گروه را بپذیر" }] },
        { type: "choose", prompt: "اگر رأی تو کمتر بیاورد، چه کار کنی؟", say: "اگر چیزی که تو می‌خواستی رأی کمتری بیاورد، چه کار کنی؟",
          options: ["با بقیه بازی می‌کنم؛ شاید دفعهٔ بعد نوبت فکر من باشد", "قهر می‌کنم و بازی نمی‌کنم", "داد می‌زنم تا همه فکر من را انتخاب کنند"],
          answer: "با بقیه بازی می‌کنم؛ شاید دفعهٔ بعد نوبت فکر من باشد" },
        { type: "choose", prompt: "وقتی دوستت فکرش را می‌گوید، چه کار کنی؟", say: "وقتی دوستت دارد فکرش را می‌گوید، تو چه کار کنی؟",
          options: ["گوش می‌دهم و حرفش را قطع نمی‌کنم", "وسط حرفش حرف می‌زنم", "رویم را برمی‌گردانم"], answer: "گوش می‌دهم و حرفش را قطع نمی‌کنم" },
        { type: "talk", scene: "👨‍👩‍👧 🗣️ ✋", caption: "در خانه شما چطور با هم تصمیم می‌گیرید؟ مثلاً اینکه جمعه کجا برویم یا شام چه بپزیم. یک بار با هم رأی بگیرید!" }
      ]
    },

    /* Sources: a unit game that brings back world.sap.17 (town services and helpers, world-sapling-23) and
       world.sap.22 (deciding together, world-sapling-24). */
    {
      id: "world-sapling-25", subject: "world", level: "sapling", emoji: "🏘️", title: "بازی شهر ما",
      steps: [
        { type: "pairs", prompt: "هر آدم، ابزارش", say: "هر کسی که برای شهر کار می‌کند را با ابزارش جفت کن.",
          pairs: [
            [{ label: "رفتگر", say: "رفتگر" }, { pic: "🧹", label: "جارو", say: "جارو" }],
            [{ label: "آتش‌نشان", say: "آتش‌نشان" }, { pic: "🚒", label: "ماشین آتش‌نشانی", say: "ماشین آتش‌نشانی" }],
            [{ label: "پستچی", say: "پستچی" }, { pic: "📦", label: "بسته", say: "بسته" }],
            [{ label: "کتاب‌دار", say: "کتاب‌دار" }, { pic: "📚", label: "کتاب", say: "کتاب" }],
            [{ label: "برق‌کار", say: "برق‌کار" }, { pic: "⚡", label: "سیم برق", say: "سیم برق" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر جا، چه کار؟", say: "کارت‌ها را برگردان و هر جای شهر را با کاری که آنجا می‌کنیم پیدا کن.",
          pairs: [
            [{ pic: "📚", label: "کتابخانه", say: "کتابخانه" }, { label: "کتاب قرض می‌گیریم", say: "کتاب قرض می‌گیریم" }],
            [{ pic: "📮", label: "ادارهٔ پست", say: "ادارهٔ پست" }, { label: "نامه می‌فرستیم", say: "نامه و بسته می‌فرستیم" }],
            [{ pic: "🗑️", label: "سطل زباله", say: "سطل زباله" }, { label: "زباله می‌ریزیم", say: "زباله را در آن می‌ریزیم" }],
            [{ pic: "🚰", label: "شیر آب", say: "شیر آب" }, { label: "آب برمی‌داریم", say: "آبِ تمیز برمی‌داریم" }]
          ] },
        { type: "sort", prompt: "به شهر کمک می‌کند یا نه؟", say: "هر کار را به سبدش ببر: به شهر و آدم‌هایش کمک می‌کند، یا کار آن‌ها را سخت می‌کند.",
          baskets: [{ pic: "👍", label: "کمک می‌کند", value: "help" }, { pic: "👎", label: "کار را سخت می‌کند", value: "hard" }],
          items: [
            { pic: "🗑️", label: "زباله را در سطل ریختن", say: "زباله را در سطل می‌ریزیم", basket: "help" },
            { pic: "💡", label: "خاموش کردن چراغ اضافه", say: "چراغ اضافه را خاموش می‌کنیم", basket: "help" },
            { pic: "📕", label: "پس دادن کتاب کتابخانه", say: "کتاب کتابخانه را سر وقت پس می‌دهیم", basket: "help" },
            { pic: "🍬", label: "ریختن پوست شکلات در کوچه", say: "پوست شکلات را در کوچه می‌ریزیم", basket: "hard" },
            { pic: "🚰", label: "باز گذاشتن شیر آب", say: "شیر آب را باز می‌گذاریم", basket: "hard" },
            { pic: "✏️", label: "خط کشیدن روی دیوار", say: "روی دیوار کوچه خط می‌کشیم", basket: "hard" }
          ] },
        { type: "sort", prompt: "با هم تصمیم گرفتن: خوب یا نه؟", say: "کدام کار برای با هم تصمیم گرفتن خوب است و کدام نه؟",
          baskets: [{ pic: "😊", label: "خوب است", value: "good" }, { pic: "🙁", label: "خوب نیست", value: "bad" }],
          items: [
            { pic: "👂", label: "گوش دادن", say: "به حرف بقیه گوش می‌دهیم", basket: "good" },
            { pic: "✋", label: "رأی گرفتن", say: "با هم رأی می‌گیریم", basket: "good" },
            { pic: "🔁", label: "نوبتی", say: "نوبتی انتخاب می‌کنیم", basket: "good" },
            { pic: "📢", label: "داد زدن", say: "داد می‌زنیم", basket: "bad" },
            { pic: "🗣️", label: "پریدن وسط حرف", say: "وسط حرف بقیه می‌پریم", basket: "bad" },
            { pic: "😤", label: "قهر کردن", say: "قهر می‌کنیم", basket: "bad" }
          ] },
        { type: "order", prompt: "با هم تصمیم بگیریم", say: "برای اینکه با هم تصمیم بگیریم، به ترتیب چه کنیم؟", numbered: true,
          items: [{ pic: "🗣️", label: "فکرت را بگو", say: "فکرت را بگو" }, { pic: "👂", label: "گوش بده", say: "به بقیه گوش بده" },
            { pic: "✋", label: "رأی بگیرید", say: "رأی بگیرید" }, { pic: "🤝", label: "انتخاب را بپذیر", say: "انتخاب را بپذیر" }] }
      ]
    },

    /* Sources: a first timeline beyond the child's own life (England KS1 history, "changes within living memory" and
       "events beyond living memory"; NCSS C3 D2.His.2.K–2 and 3–5; Iran's third-grade social studies, «گذشته»).
       Fuzzy bands, oldest first, as the timeline step draws them: very long ago (people in caves, thousands of years
       ago), long ago (horses and camel caravans), when grandparents were children (the radio), when parents were
       children (the corded telephone), now. No ages are given. */
    {
      id: "world-sapling-29", subject: "world", level: "sapling", emoji: "⏳", title: "قدیم، خیلی قدیم",
      steps: [
        (function () {
          var C = [{ x: 24, pic: "📱", t: "امروز" }, { x: 52, pic: "☎️", t: "بچگی پدر و مادر" }, { x: 80, pic: "📻", t: "بچگی پدربزرگ" },
            { x: 108, pic: "🐫", t: "خیلی قدیم" }, { x: 136, pic: "🪨", t: "خیلی خیلی قدیم" }];
          var parts = { line: { art: "w-lifeline" } };
          C.forEach(function (c, i) {
            parts["c" + i] = { art: "w-card", at: [c.x, 40], o: 0 }; parts["p" + i] = { art: c.pic, at: [c.x, 36.4], s: 0.85, o: 0 };
            parts["t" + i] = { art: c.t, at: [c.x, 46.8], s: i > 0 && i < 4 ? 0.12 : 0.14, o: 0 };
          });
          parts.fire = { art: "🔥", at: [143, 42], s: 0.32, o: 0 };
          parts.kid = { art: "w-armand", at: [24, 89], s: 0.85 };
          function card(i, at) { return show(["c" + i, "p" + i, "t" + i], at, 600); }
          return { type: "scene", prompt: "سفر روی خط زمان", bg: "#fffaf0", parts: parts,
            scenes: [
              { caption: "این آرمان است. امروز روی خط زمان به گذشته سفر می‌کنیم. اینجا «امروز» است: تلفن همراه داریم.", key: 3200, hold: 5400, do: D(
                card(0, 400), wave("kid", 1400, 1600)) },
              { caption: "سال‌ها پیش، پدر و مادر آرمان بچه بودند. آن وقت تلفن همراه نبود؛ تلفن‌ها سیم داشتند.", key: 3800, hold: 6000, do: D(
                walk("kid", { x: 52 }, 0, 2200), card(1, 2200)) },
              { caption: "خیلی سال پیش‌تر، پدربزرگ و مادربزرگ بچه بودند. آن وقت خانواده‌ها دور رادیو می‌نشستند و قصه گوش می‌دادند.", key: 3800, hold: 6000, do: D(
                walk("kid", { x: 80 }, 0, 2200), card(2, 2200)) },
              { caption: "خیلی قدیم، ماشین نبود. مردم با اسب و کاروانِ شتر سفر می‌کردند.", key: 3800, hold: 6000, do: D(
                walk("kid", { x: 108 }, 0, 2200), card(3, 2200)) },
              { caption: "خیلی خیلی قدیم، هزاران سال پیش، مردم در غار زندگی می‌کردند. از سنگ ابزار می‌ساختند و آتش روشن می‌کردند.", key: 4200, hold: 6400, do: D(
                walk("kid", { x: 136 }, 0, 2200), card(4, 2200), show(["fire"], 3000, 500)) },
              { caption: "هر چه روی خط زمان جلوتر برویم، قدیمی‌تر می‌شود. حالا آرمان دوباره به امروز برمی‌گردد!", key: 5600, hold: 7000, do: D(
                walk("kid", { x: 24 }, 400, 4400), [pulse("p0", 5000, 1.4, 800)]) }
            ] };
        })(),
        { type: "timeline", prompt: "هر چیز، کی؟", say: "هر عکس را سر جایش روی خط زمان بگذار.",
          bands: [{ label: "خیلی خیلی قدیم", en: "very, very long ago", pic: "🪨" }, { label: "خیلی قدیم", en: "long ago", pic: "🐫" },
            { label: "وقتی پدربزرگ و مادربزرگ بچه بودند", en: "when Grandma and Grandpa were children", pic: "👵" },
            { label: "وقتی پدر و مادر بچه بودند", en: "when Mum and Dad were children", pic: "👨" }, { label: "امروز", en: "today", pic: "🧒" }],
          items: [
            { pic: "🔥", say: "آتش روشن کردن در غار", band: 0 },
            { pic: "🏇", say: "سفر با اسب", band: 1 },
            { pic: "📻", say: "رادیوی قدیمی", band: 2 },
            { pic: "☎️", say: "تلفن سیم‌دار", band: 3 },
            { pic: "📱", say: "تلفن همراه", band: 4 }
          ] },
        { type: "order", prompt: "از قدیمی‌ترین تا امروز", say: "این‌ها را به ترتیب بچین: اول قدیمی‌ترین، آخر امروز.", numbered: true,
          items: [{ pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی در غار" }, { pic: "🐫", label: "کاروان شتر", say: "کاروان شتر" },
            { pic: "📻", label: "رادیو", say: "رادیوی قدیمی" }, { pic: "📱", label: "تلفن همراه", say: "تلفن همراه" }] },
        { type: "choose", prompt: "کدام قدیمی‌تر است؟", say: "کدام قدیمی‌تر است: وقتی پدربزرگ بچه بود، یا وقتی پدر بچه بود؟",
          options: ["وقتی پدربزرگ بچه بود", "وقتی پدر بچه بود"], answer: "وقتی پدربزرگ بچه بود" },
        { type: "talk", scene: "👴 📻 ☎️", caption: "از پدربزرگ یا مادربزرگ بپرس: «وقتی بچه بودی، چه چیزهایی نبود که حالا هست؟»" }
      ]
    },

    /* Sources: how archaeologists work (the law of superposition: in undisturbed layers the deeper is older; Society
       for American Archaeology, "Archaeology for kids"; NCSS C3 D2.His.9.3–5 and D2.His.10.3–5, using sources; England
       KS2 history, "how our knowledge of the past is constructed from a range of sources"). The painted shard is in the
       style of Tepe Sialk's pottery (Kashan, about 6,000 years ago), drawn for this lesson, not a real object. */
    {
      id: "world-sapling-46", subject: "world", level: "sapling", emoji: "🧑‍🔬", title: "باستان‌شناس کوچک",
      steps: [
        { type: "scene", prompt: "زیر خاک چه هست؟", bg: "#cdeaf7",
          parts: {
            ground: { art: "w-layers" }, arch: { art: "w-archaeologist", at: [36, 40], s: 0.9 },
            arrow: { art: "w-arrow-down", at: [146, 46], o: 0 }, older: { art: "قدیمی‌تر", at: [136, 84], s: 0.3, o: 0 },
            l1: { art: "امروز", at: [16, 50.6], s: 0.3, o: 0 }, l2: { art: "قدیم", at: [16, 64.6], s: 0.3, o: 0 }, l3: { art: "خیلی قدیم", at: [22, 81.6], s: 0.3, o: 0 },
            q: { art: "w-bubble", at: [52, 14], s: 0.9, o: 0 }, qm: { art: "❓", at: [52, 13], s: 0.4, o: 0 }
          },
          scenes: [
            { caption: "این مینا است. او باستان‌شناس است: دنبال چیزهایی می‌گردد که مردمِ قدیم جا گذاشته‌اند.", key: 3000, hold: 5400, do: D(wave("arch", 600, 1600)) },
            { caption: "زمین لایه‌لایه است، مثل یک کیک چندطبقه. خاکِ هر زمان روی خاکِ زمانِ قبل جمع شده است.", key: 4000, hold: 6400, do: D(
              show(["l1"], 600, 500), show(["l2"], 1600, 500), show(["l3"], 2600, 500)) },
            { caption: "پس هر چه پایین‌تر برویم، لایه قدیمی‌تر است.", key: 3000, hold: 5400, do: D(
              show(["arrow", "older"], 400, 600), [{ id: "arrow", to: { y: 50 }, at: 1200, dur: 600, yoyo: true, times: 2 }]) },
            { caption: "مینا آرام‌آرام خاک را کنار می‌زند. در لایهٔ بالا یک درِ نوشابه پیدا می‌کند: مالِ همین چند سال پیش.", key: 4400, hold: 6600, do: D(
              walk("arch", { x: 62 }, 0, 1600), [{ id: "ground.dig", to: { o: 1 }, at: 1600, dur: 1000 }, { id: "arch.armR", to: { r: -40 }, at: 1800, dur: 400, yoyo: true, times: 4 },
              { id: "ground.cap", to: { o: 1 }, at: 3400, dur: 500 }]) },
            { caption: "پایین‌تر، تکه‌ای از یک کوزهٔ سفالی پیدا می‌کند: مالِ خیلی قدیم.", key: 3200, hold: 5400, do: [
              { id: "arch.armR", to: { r: -40 }, dur: 400, yoyo: true, times: 4 }, { id: "ground.shard", to: { o: 1 }, at: 1800, dur: 500 }, pulse("ground.shard", 2400, 1.3, 600)] },
            { caption: "پایین‌تر از همه، یک ابزار سنگی پیدا می‌کند: قدیمی‌ترین چیز، مالِ هزاران سال پیش!", key: 3200, hold: 5600, do: [
              { id: "arch.armR", to: { r: -40 }, dur: 400, yoyo: true, times: 4 }, { id: "ground.tool", to: { o: 1 }, at: 1800, dur: 500 }, pulse("ground.tool", 2400, 1.3, 600)] },
            { caption: "مینا هر چیزی را با دقت نگاه می‌کند، عکس می‌گیرد و می‌پرسد: «این چیست؟ چه کسی ساخته؟ برای چه؟»", key: 3400, hold: 6000, do: D(
              show(["q", "qm"], 600, 500), [pulse("qm", 1400, 1.3, 700)]) }
          ] },
        { type: "source", img: SRC.shard, caption: "تکه‌ای از یک کوزهٔ سفالی قدیمی، نقاشی‌شده",
          say: "این تکه‌ای از یک کوزهٔ سفالیِ خیلی قدیمی است. خوب نگاهش کن.",
          look: [{ at: [50, 25], say: "این خط‌های زیگزاگ را ببین. شبیه چیست؟" }, { at: [55, 62], say: "این حیوان را ببین: شاخ‌های بلندی دارد. چه حیوانی است؟" }],
          ask: { see: ["رنگ کوزه و خط‌های رویش", "یک حیوان شاخ‌دار، شاید بز کوهی", "لبه‌های شکسته"],
            think: ["کوزه برای آب یا غذا بوده", "کسی که آن را ساخته، نقاشی کردن دوست داشته", "کوزه افتاده و شکسته"],
            wonder: ["چند سال پیش ساخته شده؟", "بقیهٔ کوزه کجاست؟", "چرا روی کوزه بز کشیده‌اند؟"] } },
        { type: "order", prompt: "از بالا تا پایین", say: "مینا این‌ها را از بالا تا پایینِ خاک پیدا کرد. به ترتیب بچین: اول بالایی، آخر پایین‌ترین.", numbered: true,
          items: [{ pic: "🔴", label: "در نوشابه", say: "درِ نوشابه، لایهٔ بالا" }, { pic: "🏺", label: "تکهٔ کوزه", say: "تکهٔ کوزه، لایهٔ وسط" },
            { pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی، پایین‌ترین لایه" }] },
        { type: "choose", prompt: "کدام از همه قدیمی‌تر است؟", say: "کدام از همه قدیمی‌تر است؟ یادت باشد: پایین‌تر یعنی قدیمی‌تر.", pic: true,
          options: [{ label: "🪨", value: "ابزار سنگی، پایین‌ترین لایه" }, { label: "🏺", value: "تکهٔ کوزه، لایهٔ وسط" }, { label: "🔴", value: "در نوشابه، لایهٔ بالا" }],
          answer: "ابزار سنگی، پایین‌ترین لایه" },
        { type: "choose", prompt: "باستان‌شناس وقتی چیزی پیدا می‌کند، چه کار می‌کند؟", say: "باستان‌شناس وقتی چیزی پیدا می‌کند، چه کار می‌کند؟",
          options: ["با دقت نگاهش می‌کند و می‌پرسد: این چیست؟", "زود آن را دور می‌اندازد", "آن را می‌شکند تا داخلش را ببیند"], answer: "با دقت نگاهش می‌کند و می‌پرسد: این چیست؟" }
      ]
    },

    /* Sources: the Old Stone Age on the Iranian plateau (Encyclopaedia Iranica, "Prehistory of Iran"; the caves of the
       Khorramabad valley in the Zagros, such as Yafteh and Kunji, used by hunter-gatherers tens of thousands of years
       ago; Iran's fourth-grade social studies, «ایران در گذشته‌های دور»; NCSS C3 D2.His.2.3–5). People gathered fruit
       and seeds, hunted, made tools by knocking stone on stone, and used fire. The hunting is only said, never shown. */
    {
      id: "world-sapling-30", subject: "world", level: "sapling", emoji: "🪨", title: "شکارچی‌ها و گردآورنده‌ها",
      steps: [
        { type: "scene", prompt: "زندگی در غار", bg: "#cdeaf7",
          parts: {
            valley: { art: "w-cave-valley" }, map: { art: "w-map-khorramabad", at: [28, 22], s: 0.75, o: 0 },
            man: { art: "w-sa-man", at: [80, 86], s: 1.1 }, woman: { art: "w-sa-woman", at: [136, 86], s: 1.1 }, girl: { art: "w-sa-girl", at: [36, 86], s: 1.05 }, boy: { art: "w-sa-boy", at: [58, 86], s: 1.0, o: 0 },
            deer: { art: "🦌", at: [158, 46], s: 1.0, o: 0, flip: true }, basket: { art: "🧺", at: [44, 80], s: 0.5, o: 0 }, berry: { art: "🫐", at: [24, 64], s: 0.4, o: 0 },
            stone1: { art: "🪨", at: [72, 70], s: 0.35, o: 0 }, axe: { art: "w-handaxe", at: [90, 72], s: 0.22, o: 0 },
            fire: { art: "w-fire-small", at: [108, 84], s: 1.4, o: 0 }, night: { art: "w-night-dim", o: 0 }, glow: { art: "w-fire-glow", at: [108, 78], s: 1.4, o: 0 }
          },
          scenes: [
            { caption: "خیلی خیلی قدیم، هزاران سال پیش، در کوه‌های زاگرس مردمی در غار زندگی می‌کردند. نزدیک خرم‌آباد هنوز این غارها هست.", key: 4400, hold: 6800, do: D(
              show(["map"], 400, 600), [pulse("map.dot", 1400, 2.2, 1000), pulse("valley", 3000, 1.02, 800)]) },
            { caption: "آن‌ها خانه و مزرعه نداشتند. میوه و دانه جمع می‌کردند و حیوان شکار می‌کردند.", key: 4000, hold: 6400, do: D(
              hide(["map"], 0, 500), show(["berry", "basket", "deer"], 400, 500), walk("girl", { x: 26 }, 600, 1400), [{ id: "deer", to: { x: 146 }, at: 900, dur: 2600 }],
              [{ id: "girl.armL", to: { r: 120 }, at: 2000, dur: 500 }, { id: "berry", to: { x: 44, y: 76 }, at: 2600, dur: 900 }, { id: "berry", to: { o: 0 }, at: 3500, dur: 200 }]) },
            { caption: "ابزارشان از سنگ بود. سنگی را به سنگ دیگر می‌زدند تا لبه‌اش تیز شود.", key: 4400, hold: 6600, do: D(
              show(["stone1", "axe"], 300, 500), hide(["deer"], 0, 500),
              [{ id: "man.armL", to: { r: 60 }, at: 800, dur: 300, yoyo: true, times: 6 }, { emit: "spark", where: [82, 70], spread: [3, 2], rise: 4, n: 10, at: 900, dur: 2400, life: 500 },
              { id: "axe", to: { s: 0.3 }, at: 3400, dur: 600 }]) },
            { caption: "آتش هم روشن می‌کردند: برای گرم شدن، پختن غذا و دور نگه داشتن حیوان‌ها.", key: 3600, hold: 6000, do: D(
              hide(["stone1", "basket"], 0, 400), show(["fire", "glow"], 600, 800), walk("woman", { x: 124 }, 600, 1200), [pulse("glow", 1600, 1.2, 900)]) },
            { caption: "شب‌ها، خانواده دور آتش جمع می‌شد. شاید آن‌ها هم برای هم قصه می‌گفتند.", key: 4000, hold: 6800, do: D(
              show(["night"], 0, 1200), show(["boy"], 400, 600), walk("girl", { x: 64 }, 400, 2200), [{ id: "boy", to: { x: 48 }, dur: 1 }],
              talk("woman", 2600, 1600), [{ id: "glow", to: { s: 1.7 }, at: 600, dur: 900, yoyo: true, times: 4 }]) }
          ] },
        { type: "source", img: SRC.handaxe, caption: "یک ابزار سنگی، مثل ابزارهایی که در غارهای زاگرس پیدا شده",
          say: "این یک ابزار سنگی است، مثل ابزارهایی که در غارهای زاگرس پیدا شده. خوب نگاهش کن.",
          look: [{ at: [50, 15], say: "سرِ ابزار را ببین: تیز است یا گِرد؟" }, { at: [35, 50], say: "این جاهای صاف را ببین. فکر می‌کنی چطور درست شده‌اند؟" }],
          ask: { see: ["سنگی خاکستری", "یک سرِ تیز و یک تهِ پهن", "تکه‌هایی که از کنارش کنده شده"],
            think: ["با آن چوب یا گوشت می‌بریدند", "سنگ را با سنگ دیگری تراشیده‌اند", "در دست جا می‌شده"],
            wonder: ["ساختنش چقدر طول می‌کشید؟", "چه کسی آن را ساخته؟", "چطور زیر خاک مانده؟"] } },
        { type: "sort", prompt: "مردم غار داشتند یا نه؟", say: "مردمی که هزاران سال پیش در غار زندگی می‌کردند، این را داشتند یا نه؟",
          baskets: [{ pic: "🪨", label: "داشتند", value: "yes" }, { pic: "🚫", label: "نداشتند", value: "no" }],
          items: [
            { pic: "🔥", label: "آتش", say: "آتش", basket: "yes" },
            { pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی", basket: "yes" },
            { pic: "🫐", label: "میوهٔ جنگلی", say: "میوهٔ جنگلی", basket: "yes" },
            { pic: "🧱", label: "خانهٔ آجری", say: "خانهٔ آجری", basket: "no" },
            { pic: "🌾", label: "مزرعهٔ گندم", say: "مزرعهٔ گندم", basket: "no" },
            { pic: "🚗", label: "ماشین", say: "ماشین", basket: "no" }
          ] },
        { type: "choose", prompt: "آتش به مردم غار چه کمکی می‌کرد؟", say: "آتش به مردم غار چه کمکی می‌کرد؟", pic: true,
          options: [{ label: "🔥", value: "گرم می‌شدند و غذا می‌پختند" }, { label: "📺", value: "تلویزیون نگاه می‌کردند" }, { label: "🚗", value: "سفر می‌کردند" }], answer: "گرم می‌شدند و غذا می‌پختند" }
      ]
    },

    /* Sources: the first farmers and herders in the Zagros (Encyclopaedia Iranica, "Ganj Dareh"; Zeder & Hesse,
       Science 287, 2000: goats were herded at Ganj Dareh, near Kermanshah, about 10,000 years ago; Riehl et al.,
       Science 341, 2013: early cultivation in the Zagros foothills at Chogha Golan). Wild wheat was sown, goats were
       kept, and people built villages of mud brick. NCSS C3 D2.His.2.3–5; England KS2, "changes in Britain from the
       Stone Age to the Iron Age" (here, on the Iranian plateau). */
    {
      id: "world-sapling-31", subject: "world", level: "sapling", emoji: "🌾", title: "نخستین کشاورزان",
      steps: [
        { type: "scene", prompt: "اولین روستاها", bg: "#cdeaf7",
          parts: {
            hill: { art: "w-hillside" }, map: { art: "w-map-kermanshah", at: [28, 22], s: 0.75, o: 0 },
            w1: { art: "w-wheat-row", at: [44, 82], s: 1.1 }, w2: { art: "w-wheat-row", at: [88, 84], s: 1.1 },
            pen: { art: "w-pen", at: [128, 74], s: 1.0, o: 0 }, g1: { art: "🐐", at: [168, 68], s: 0.85, o: 0, flip: true }, g2: { art: "🐐", at: [180, 71], s: 0.8, o: 0, flip: true },
            house1: { art: "w-mud-house", at: [66, 58], s: 0.8, o: 0 }, house2: { art: "w-mud-house", at: [88, 56], s: 0.75, o: 0 }, house3: { art: "w-mud-house", at: [110, 57], s: 0.7, o: 0 },
            man: { art: "w-farmer-ne", at: [24, 86], s: 1.05 }, woman: { art: "w-farmer-ne-woman", at: [150, 88], s: 1.0 }
          },
          scenes: [
            { caption: "حدود ده هزار سال پیش، مردم زاگرس کار تازه‌ای یاد گرفتند: دانه‌های گندم وحشی را در خاک کاشتند.", key: 3400, hold: 6000, do: [
              { id: "w1.stalks", to: { sy: 0 }, dur: 1 }, { id: "w2.stalks", to: { sy: 0 }, dur: 1 },
              { id: "man.armL", to: { r: 60 }, at: 600, dur: 400, yoyo: true, times: 4 }, pulse("w1.seeds", 1800, 1.3, 700)] },
            { caption: "گندم سبز شد و بزرگ شد. حالا هر سال، کنار خانه، نان و غذا داشتند.", key: 4400, hold: 6400, do: [
              { id: "w1.stalks", to: { sy: 1 }, at: 400, dur: 3600 }, { id: "w2.stalks", to: { sy: 1 }, at: 800, dur: 3600 }, { id: "w1.seeds", to: { o: 0 }, at: 400, dur: 600 }, { id: "w2.seeds", to: { o: 0 }, at: 800, dur: 600 }] },
            { caption: "بزهای کوهی را رام کردند و نگه داشتند. از بزها شیر و پشم داشتند.", key: 5200, hold: 7000, do: D(
              show(["pen", "g1", "g2"], 0, 500), [{ id: "g1", to: { x: 120 }, at: 400, dur: 3600 }, { id: "g2", to: { x: 134 }, at: 800, dur: 3600 }]) },
            { caption: "دیگر لازم نبود همیشه جابه‌جا شوند. کنار مزرعه‌ها خانه‌های گِلی ساختند. اولین روستاها درست شد!", key: 4000, hold: 6400, do: D(
              show(["house1"], 400, 600), show(["house2"], 1400, 600), show(["house3"], 2400, 600)) },
            { caption: "یکی از قدیمی‌ترین روستاها گنج‌دره است، نزدیک کرمانشاه. باستان‌شناس‌ها آنجا خانه‌های گِلی و استخوان بز پیدا کرده‌اند.", key: 3400, hold: 6400, do: D(
              show(["map"], 300, 600), [pulse("map.dot", 1300, 2.2, 1000)], wave("woman", 2400, 1600)) }
          ] },
        { type: "order", prompt: "از غار تا روستا", say: "زندگی مردم چطور عوض شد؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🪨", label: "زندگی در غار", say: "زندگی در غار و شکار" }, { pic: "🌾", label: "کاشتن گندم", say: "کاشتن دانهٔ گندم" },
            { pic: "🐐", label: "نگه داشتن بز", say: "رام کردن و نگه داشتن بز" }, { pic: "🏘️", label: "روستای گِلی", say: "ساختن روستا با خانه‌های گِلی" }] },
        { type: "timeline", prompt: "کی؟", say: "هر چیز را سر جایش روی خط زمان بگذار.",
          bands: [{ label: "خیلی خیلی قدیم: غارها", en: "very, very long ago: caves", pic: "🪨" }, { label: "خیلی قدیم: اولین روستاها", en: "very long ago: the first villages", pic: "🌾" },
            { label: "قدیم", en: "long ago", pic: "🐫" }, { label: "امروز", en: "today", pic: "🧒" }],
          items: [
            { pic: "🔥", say: "آتش در غار", band: 0 },
            { pic: "🌾", say: "اولین مزرعه‌های گندم", band: 1 },
            { pic: "🐐", say: "اولین بزهایی که مردم نگه داشتند", band: 1 },
            { pic: "🐫", say: "کاروان شتر", band: 2 },
            { pic: "🚜", say: "تراکتور", band: 3 }
          ] },
        { type: "choose", prompt: "چرا مردم در روستا ماندند؟", say: "چرا مردم دیگر جابه‌جا نشدند و در روستا ماندند؟",
          options: ["چون کنار مزرعه و بزهایشان غذا داشتند", "چون غارها پر شده بود", "چون راه رفتن بلد نبودند"], answer: "چون کنار مزرعه و بزهایشان غذا داشتند" }
      ]
    },

    /* Sources: from pottery to metal on the Iranian plateau (Encyclopaedia Iranica, "Sialk" and "Marlik"; Tepe Sialk
       near Kashan, painted pottery with mountain goats and early copper working, about 7,000 to 5,000 years ago;
       Marlik in Gilan, gold cups and bronze tools, about 3,000 years ago; then iron). NCSS C3 D2.His.2.3–5 and
       D2.His.10.3–5. The pots and cups are drawn for this lesson in the style of the finds, not copied from one object. */
    {
      id: "world-sapling-32", subject: "world", level: "sapling", emoji: "🏺", title: "از سفال تا فلز",
      steps: [
        { type: "scene", prompt: "از گِل تا آهن", bg: "#cdeaf7",
          parts: {
            hill: { art: "w-hillside" }, house: { art: "w-mud-house", at: [140, 62], s: 0.9 },
            kiln: { art: "w-kiln", at: [92, 80], s: 1.3 }, potter: { art: "w-potter", at: [56, 86], s: 1.1 },
            pot1: { art: "w-sialk-pot", at: [74, 84], s: 0.9, o: 0 }, pot2: { art: "w-sialk-pot", at: [80, 66], s: 2.2, o: 0 },
            mapK: { art: "w-map-kashan", at: [28, 22], s: 0.75, o: 0 }, mapG: { art: "w-map-rasht", at: [28, 22], s: 0.75, o: 0 },
            furnace: { art: "w-furnace", at: [92, 80], s: 1.4, o: 0 }, smith: { art: "w-smith", at: [124, 86], s: 1.1, o: 0 }, copper: { art: "w-copper", at: [70, 84], s: 1.4, o: 0 },
            cup: { art: "w-gold-cup", at: [80, 70], s: 2.0, o: 0 }, sickle: { art: "w-sickle", at: [118, 72], s: 1.6, o: 0 },
            r1: { art: "w-sialk-pot", at: [40, 70], s: 1.2, o: 0 }, r2: { art: "w-copper", at: [66, 66], s: 1.6, o: 0 }, r3: { art: "w-gold-cup", at: [92, 70], s: 1.2, o: 0 }, r4: { art: "w-sickle", at: [118, 70], s: 1.5, o: 0 }
          },
          scenes: [
            { caption: "مردم روستاها از گِل کوزه و کاسه ساختند و در کوره پختند تا محکم شود.", key: 4200, hold: 6400, do: [
              { id: "potter.armL", to: { r: 60 }, at: 600, dur: 500, yoyo: true, times: 4 }, { id: "pot1", to: { o: 1 }, at: 2400, dur: 600 }, pulse("kiln.fire", 3000, 1.4, 700)] },
            { caption: "در تپهٔ سیلک، نزدیک کاشان، کوزه‌های نقاشی‌شده پیدا شده، با نقشِ بز کوهی.", key: 3800, hold: 6400, do: D(
              hide(["potter", "kiln", "pot1"], 0, 600), show(["mapK", "pot2"], 600, 700), [pulse("mapK.dot", 1600, 2.2, 1000)]) },
            { caption: "بعد مردم یاد گرفتند سنگِ مس را در کوره آن‌قدر داغ کنند تا فلز از آن بیرون بیاید. اول مس، بعد مفرغ.", key: 4600, hold: 6800, do: D(
              hide(["mapK", "pot2"], 0, 600), show(["furnace", "smith"], 600, 700), [pulse("furnace.glow", 1600, 1.3, 800), { id: "copper", to: { o: 1 }, at: 3400, dur: 600 },
              { id: "smith.armL", to: { r: 50 }, at: 2400, dur: 500 }]) },
            { caption: "در مارلیک، در گیلان، جام‌های طلا پیدا شده. صنعتگرها روی جام‌ها نقش حیوان می‌زدند.", key: 3800, hold: 6400, do: D(
              hide(["furnace", "smith", "copper"], 0, 600), show(["mapG", "cup"], 600, 700), [pulse("mapG.dot", 1600, 2.2, 1000), pulse("cup", 2800, 1.1, 800)]) },
            { caption: "بعد آهن آمد. با داسِ آهنی، درو کردن گندم آسان‌تر شد.", key: 3200, hold: 5600, do: D(
              hide(["mapG", "cup"], 0, 600), show(["sickle"], 700, 600), [pulse("sickle", 1800, 1.2, 800)]) },
            { caption: "سفال، مس، مفرغ، آهن: هر چیز تازه، زندگیِ مردم را کمی آسان‌تر کرد.", key: 3600, hold: 6000, do: D(
              hide(["sickle"], 0, 500), show(["r1"], 500, 400), show(["r2"], 1100, 400), show(["r3"], 1700, 400), show(["r4"], 2300, 400)) }
          ] },
        { type: "source", img: SRC.pot, caption: "کوزهٔ سفالیِ نقاشی‌شده، به سبکِ کوزه‌های تپهٔ سیلک",
          say: "این یک کوزهٔ سفالیِ نقاشی‌شده است، مثل کوزه‌های تپهٔ سیلک. خوب نگاهش کن.",
          look: [{ at: [50, 30], say: "بالای کوزه را ببین: پرنده‌ها و خط زیگزاگ." }, { at: [52, 63], say: "این بز کوهی را ببین. شاخ‌هایش چه شکلی است؟" }],
          ask: { see: ["خط زیگزاگ و پرنده‌ها", "یک بز کوهی با شاخ‌های بزرگ و خمیده", "رنگ کوزه و نقش‌های سیاه"],
            think: ["سازنده بز کوهی زیاد دیده بود", "کوزه برای آب یا دانه بوده", "نقش‌ها را با قلم‌مو کشیده‌اند"],
            wonder: ["رنگ سیاه را از چه می‌ساختند؟", "چرا بز کوهی؟", "چند نفر این کوزه را دیده‌اند؟"] } },
        { type: "order", prompt: "کدام زودتر آمد؟", say: "مردم این‌ها را به چه ترتیبی یاد گرفتند؟ از قدیمی‌ترین بچین.", numbered: true,
          items: [{ pic: "🏺", label: "سفال", say: "سفال" }, { pic: "🟠", label: "مس", say: "مس" }, { pic: "🟤", label: "مفرغ", say: "مفرغ" }, { pic: "⚙️", label: "آهن", say: "آهن" }] },
        { type: "pairs", prompt: "هر چیز، کجا پیدا شد؟", say: "هر چیز را با جایی که پیدا شده جفت کن.",
          pairs: [
            [{ pic: "🏺", label: "کوزهٔ نقاشی‌شده", say: "کوزهٔ نقاشی‌شده با بز کوهی" }, { label: "سیلک، کاشان", say: "تپهٔ سیلک، نزدیک کاشان" }],
            [{ pic: "🏆", label: "جام طلا", say: "جام طلا" }, { label: "مارلیک، گیلان", say: "مارلیک، در گیلان" }],
            [{ pic: "🐐", label: "استخوان بز", say: "استخوان بزهای اهلی" }, { label: "گنج‌دره، کرمانشاه", say: "گنج‌دره، نزدیک کرمانشاه" }]
          ] },
        { type: "choose", prompt: "چرا کوزه را در کوره می‌پختند؟", say: "چرا کوزه‌های گِلی را در کوره می‌پختند؟",
          options: ["تا محکم شود و آب نگه دارد", "تا رنگش آبی شود", "تا گرم بماند"], answer: "تا محکم شود و آب نگه دارد" }
      ]
    },

    /* Sources: a unit game that brings back world.sap.14 and world.sap.15 (world-sapling-29, 46, 30, 31 and 32): the
       timeline from caves to villages to metal, layers, and where things were found. */
    {
      id: "world-sapling-33", subject: "world", level: "sapling", emoji: "⏳", title: "بازی خط زمان",
      steps: [
        { type: "timeline", prompt: "از غار تا امروز", say: "هر چیز را سر جایش روی خط زمان بگذار.",
          bands: [{ label: "غارها", en: "caves", pic: "🪨" }, { label: "اولین روستاها", en: "the first villages", pic: "🌾" },
            { label: "سفال و مس", en: "pottery and copper", pic: "🏺" }, { label: "مفرغ و آهن", en: "bronze and iron", pic: "🏆" }, { label: "امروز", en: "today", pic: "🧒" }],
          items: [
            { pic: "🔥", say: "آتش در غار", band: 0 },
            { pic: "🐐", say: "اولین بزهای اهلی", band: 1 },
            { pic: "🏺", say: "کوزهٔ نقاشی‌شدهٔ سیلک", band: 2 },
            { pic: "🏆", say: "جام طلای مارلیک", band: 3 },
            { pic: "📱", say: "تلفن همراه", band: 4 }
          ] },
        { type: "order", prompt: "از پایین‌ترین لایه", say: "باستان‌شناس این‌ها را در لایه‌های خاک پیدا کرد. از پایین‌ترین لایه، یعنی قدیمی‌ترین، بچین.", numbered: true,
          items: [{ pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی" }, { pic: "🏺", label: "تکهٔ کوزه", say: "تکهٔ کوزه" }, { pic: "🔴", label: "در نوشابه", say: "درِ نوشابه" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر چیز، کجا؟", say: "کارت‌ها را برگردان و هر چیز را با جایی که پیدا شده پیدا کن.",
          pairs: [
            [{ pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی" }, { label: "غارهای خرم‌آباد", say: "غارهای درهٔ خرم‌آباد" }],
            [{ pic: "🐐", label: "بز اهلی", say: "استخوان بزهای اهلی" }, { label: "گنج‌دره", say: "گنج‌دره، نزدیک کرمانشاه" }],
            [{ pic: "🏺", label: "کوزهٔ نقاشی‌شده", say: "کوزهٔ نقاشی‌شده" }, { label: "سیلک", say: "تپهٔ سیلک، نزدیک کاشان" }],
            [{ pic: "🏆", label: "جام طلا", say: "جام طلا" }, { label: "مارلیک", say: "مارلیک، در گیلان" }]
          ] },
        { type: "pairs", prompt: "هر چیز، از چه ساخته شده؟", say: "هر چیز را با چیزی که از آن ساخته شده جفت کن.",
          pairs: [
            [{ label: "ابزار قدیمی غار", say: "ابزار قدیمی غار" }, { pic: "🪨", label: "سنگ", say: "سنگ" }],
            [{ label: "کوزه", say: "کوزه" }, { pic: "🟤", label: "گِل", say: "گِل" }],
            [{ label: "جام مارلیک", say: "جام مارلیک" }, { pic: "🟡", label: "طلا", say: "طلا" }],
            [{ label: "داس", say: "داس" }, { pic: "⚙️", label: "آهن", say: "آهن" }]
          ] },
        { type: "order", prompt: "زندگی چطور عوض شد؟", say: "زندگی مردم چطور عوض شد؟ از قدیمی‌ترین بچین.", numbered: true,
          items: [{ pic: "🔥", label: "زندگی در غار", say: "زندگی در غار" }, { pic: "🏘️", label: "روستا و مزرعه", say: "روستا و مزرعه" },
            { pic: "🏺", label: "کوزه‌های سفالی", say: "کوزه‌های سفالی" }, { pic: "⚙️", label: "ابزار آهنی", say: "ابزار آهنی" }] }
      ]
    },

    /* Sources: local history from sources close to home (England KS1 history, "significant historical events, people
       and places in their own locality"; NCSS C3 D2.His.9.K–2 and 3–5, D2.His.10.3–5; Iran's third-grade social
       studies, «محلهٔ ما در گذشته»). Old photos, old buildings, street names and elders' memories are sources. Old
       Iranian doors often have two knockers that sound different. The street «باغ انار» and its photo are made up for
       the lesson, as an example. */
    {
      id: "world-sapling-34", subject: "world", level: "sapling", emoji: "🏚️", title: "شهر من در قدیم",
      steps: [
        { type: "scene", prompt: "محلهٔ مادربزرگ", bg: "#cdeaf7",
          parts: {
            street: { art: "w-street" }, pom: { art: "w-pom-tree", at: [118, 64], s: 1.3, o: 0 },
            flats: { art: "w-flats", at: [24, 64], s: 0.95 }, house: { art: "w-old-house", at: [86, 64], s: 1.2 },
            pole: { art: "w-sign-pole", at: [140, 64] }, sign: { art: "w-sign", at: [140, 32], s: 1.5 }, signT: { art: "کوچهٔ باغ انار", at: [140, 33.4], s: 0.21 },
            gran: { art: "w-gran", at: [-14, 72], s: 1.05 }, nila: { art: "w-nila", at: [-28, 72], s: 0.95 },
            photo: { art: "w-street-photo", at: [104, 27], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "نیلا و مادربزرگش در محله قدم می‌زنند. مادربزرگ می‌گوید: «وقتی من بچه بودم، اینجا خیلی فرق داشت.»", key: 4800, hold: 6800, do: D(
              walk("gran", { x: 56 }, 300, 3600), walk("nila", { x: 40 }, 300, 3600), talk("gran", 4000, 1600)) },
            { caption: "مادربزرگ یک عکس قدیمی نشان می‌دهد: همین کوچه، سال‌ها پیش. آن وقت ساختمانِ بلند نبود و یک دوچرخه کنار در بود.", key: 3600, hold: 6400, do: [
              { id: "gran.armR", to: { r: -70 }, at: 300, dur: 600 }, { id: "photo", to: { o: 1, s: 1.3 }, at: 700, dur: 900 }, pulse("photo", 2400, 1.06, 700)] },
            { caption: "این خانهٔ قدیمی هنوز سر جایش است. درِ چوبی‌اش دو کوبه دارد که صدایشان با هم فرق دارد.", key: 4000, hold: 6400, do: [
              { id: "photo", to: { o: 0 }, dur: 600 }, { id: "gran.armR", to: { r: 0 }, dur: 500 },
              pulse("house.k1", 1200, 1.8, 600), pulse("house.k2", 2400, 1.8, 600)] },
            { caption: "اسم این کوچه «باغ انار» است. مادربزرگ می‌گوید: «چون قدیم اینجا یک باغِ انارِ بزرگ بود!»", key: 4000, hold: 6600, do: [
              pulse("sign", 600, 1.15, 700), pulse("signT", 600, 1.15, 700), { id: "pom", to: { o: 0.75 }, at: 1800, dur: 1400 }] },
            { caption: "عکس‌های قدیمی، ساختمان‌های قدیمی، اسم کوچه‌ها و خاطره‌های بزرگ‌ترها، قصهٔ گذشتهٔ محله را می‌گویند.", key: 3400, hold: 6400, do: D(
              [{ id: "pom", to: { o: 0 }, dur: 800 }], wave("nila", 1200, 1600), [{ id: "gran.head", to: { r: 8 }, at: 1400, dur: 600, yoyo: true, times: 2 }]) }
          ] },
        { type: "source", img: SRC.oldphoto, caption: "یک عکس قدیمی از یک کوچه",
          say: "این یک عکس قدیمی از یک کوچه است. خوب نگاهش کن.",
          look: [{ at: [28, 70], say: "این را ببین: دوچرخه است. شبیه دوچرخه‌های امروز است؟" }, { at: [48, 55], say: "درِ خانه را ببین. چه شکلی است؟" }],
          ask: { see: ["یک خانهٔ قدیمی با درِ کمانی", "یک درخت", "یک دوچرخه"],
            think: ["عکس سیاه و سفید است، پس قدیمی است", "کوچه آرام بوده و ماشین نداشته", "کسی با دوچرخه به خانه آمده"],
            wonder: ["این کوچه حالا چه شکلی است؟", "صاحب دوچرخه که بود؟", "چه کسی این عکس را گرفته؟"] } },
        { type: "choose", prompt: "چطور می‌شود دربارهٔ گذشتهٔ محله چیزی فهمید؟", say: "چطور می‌شود دربارهٔ گذشتهٔ محلهٔ خودمان چیزی فهمید؟",
          options: ["از بزرگ‌ترها بپرسیم و عکس‌های قدیمی را ببینیم", "فقط حدس بزنیم", "کارتون تماشا کنیم"], answer: "از بزرگ‌ترها بپرسیم و عکس‌های قدیمی را ببینیم" },
        { type: "sort", prompt: "منبعِ گذشته یا نه؟", say: "کدام می‌تواند دربارهٔ گذشتهٔ محله چیزی به ما بگوید؟",
          baskets: [{ pic: "🔍", label: "قصهٔ گذشته را می‌گوید", value: "yes" }, { pic: "🚫", label: "چیزی نمی‌گوید", value: "no" }],
          items: [
            { pic: "🖼️", label: "عکس قدیمی", say: "یک عکس قدیمی", basket: "yes" },
            { pic: "🚪", label: "در خانهٔ قدیمی", say: "درِ یک خانهٔ قدیمی", basket: "yes" },
            { pic: "👵", label: "خاطرهٔ مادربزرگ", say: "خاطرهٔ مادربزرگ", basket: "yes" },
            { pic: "🪧", label: "اسم کوچه", say: "اسم کوچه", basket: "yes" },
            { pic: "🎈", label: "بادکنک تازه", say: "یک بادکنک تازه", basket: "no" }
          ] },
        home({ pic: "🏚️ 📷 👵", text: "یک جای قدیمی در شهرت پیدا کن!",
          need: ["یک قدم زدن در محله یا شهر", "اگر شد، یک گوشی برای عکس گرفتن"],
          steps: [
            "با کودک در محله یا شهر بگردید و یک جای قدیمی پیدا کنید: یک خانه، یک حمام، یک بازارچه، یک آب‌انبار یا یک درخت کهنسال.",
            "از نزدیک نگاهش کنید: از چه ساخته شده؟ با ساختمان‌های امروز چه فرقی دارد؟",
            "اسم کوچه یا خیابان را با هم بخوانید و حدس بزنید چرا این اسم را دارد.",
            "از یک بزرگ‌تر بپرسید: «اینجا قدیم چه شکلی بود؟» اگر عکس قدیمی دارد، با هم ببینید."
          ],
          ask: "اگر صد سال بعد، بچه‌ای عکس امروزِ محلهٔ تو را ببیند، چه چیزهایی برایش عجیب است؟" }),
        { type: "forparents", guide: "offscreen", guideLabel: "یادگیری بیرون از صفحه، در راهنمای والدین",
          tips: [
            "عکس‌های قدیمی خانواده یا شهر را با کودک ببینید و بپرسید: «چه فرقی با امروز دارد؟ چه چیزی همان است؟»",
            "اسم کوچه‌ها و محله‌ها اغلب قصه‌ای دارد (باغ، آب‌انبار، یک آدم معروف). با هم دنبال قصهٔ اسم کوچه‌تان بگردید.",
            "اگر بزرگ‌تری از روزهای سخت گذشته حرف زد، آرام و کوتاه به پرسش کودک جواب دهید."
          ] }
      ]
    },

    /* Sources: the traditional Iranian courtyard house (Encyclopaedia Iranica, "Architecture iv. Safavid to Qajar";
       the houses of Kashan and Yazd; Iran's fourth-grade social studies, «خانه‌های قدیمی»). The hashti (an entrance
       room where guests waited, often with benches), the courtyard with its pool and garden beds, the eyvan (a shaded
       porch open to the courtyard) and the basement (cool in summer, for storing food). NCSS C3 D2.His.2.3–5. */
    {
      id: "world-sapling-47", subject: "world", level: "sapling", emoji: "🏡", title: "خانه‌های قدیمی",
      steps: [
        { type: "scene", prompt: "گردش در یک خانهٔ حیاط‌دار", bg: "#cdeaf7",
          parts: {
            house: { art: "w-courtyard" },
            gp: { art: "👴", at: [-30, 72], look: { top: "#5a7fc4", bottom: "#4b5a78" } },
            girl: { art: "👧", at: [-44, 73], s: 0.9, look: { top: "#e46b8a", hairColor: "#4a2f1f" } },
            boy: { art: "👦", at: [-56, 73], s: 0.9, look: { top: "#f2c14e", hairColor: "#1f1712" } },
            tea: { art: "🫖", at: [374, 54], s: 0.4, o: 0 }, cup1: { art: "🍵", at: [386, 55], s: 0.3, o: 0 },
            jar: { art: "🏺", at: [470, 86], s: 0.4, o: 0 }
          },
          scenes: [
            { caption: "پدربزرگ، بچه‌ها را به خانهٔ قدیمیِ خانواده می‌برد: یک خانهٔ حیاط‌دار. اول از درِ چوبی وارد می‌شوند.", key: 4400, hold: 6400, do: [
              { cam: { x: 40 }, dur: 1 }, { id: "gp", walk: [44, 72], at: 300, dur: 3000 }, { id: "girl", walk: [30, 73], at: 300, dur: 3000 }, { id: "boy", walk: [16, 73], at: 300, dur: 3000 }] },
            { caption: "اینجا هشتی است: اتاق کوچکی پشت در. مهمان‌ها روی این سکوها می‌نشستند و منتظر می‌ماندند.", key: 4400, hold: 6400, do: [
              { cam: { x: 115 }, dur: 3000, ease: "linear" }, { id: "gp", walk: [124, 72], dur: 3000 }, { id: "girl", walk: [110, 73], dur: 3000 }, { id: "boy", walk: [96, 73], dur: 3000 }] },
            { caption: "وسط خانه حیاط است، با حوض آب و باغچه و درخت انار. پنجره‌های همهٔ اتاق‌ها رو به حیاط باز می‌شوند.", key: 5000, hold: 7000, do: [
              { cam: { x: 240 }, dur: 3600, ease: "linear" }, { id: "gp", walk: [250, 72], dur: 3600 }, { id: "girl", walk: [236, 73], dur: 3600 }, { id: "boy", walk: [208, 73], dur: 3600 }] },
            { caption: "این ایوان است: جایی سایه‌دار، رو به حیاط. عصرهای تابستان خانواده اینجا چای می‌خورد.", key: 4600, hold: 6800, do: [
              { cam: { x: 375 }, dur: 3400, ease: "linear" }, { id: "gp", walk: [362, 60], dur: 3400 }, { id: "girl", walk: [384, 60], dur: 3400 }, { id: "boy", walk: [398, 60], dur: 3400 },
              { id: "tea", to: { o: 1 }, at: 3400, dur: 400 }, { id: "cup1", to: { o: 1 }, at: 3600, dur: 400 }] },
            { caption: "این پله‌ها به زیرزمین می‌روند. زیرزمین در تابستان خنک است. خوراکی‌ها را در کوزه، اینجا نگه می‌داشتند.", key: 4400, hold: 6600, do: [
              { cam: { x: 460 }, dur: 3000, ease: "linear" }, { id: "gp", walk: [426, 72], dur: 3000 }, { id: "girl", walk: [412, 72], dur: 3000 }, { id: "boy", walk: [398, 72], dur: 3000 },
              { id: "jar", to: { o: 1 }, at: 3000, dur: 500 }, pulse("jar", 3600, 1.3, 600)] },
            { caption: "این خانه رو به حیاط ساخته شده: هشتی، حیاط و حوض، ایوان و زیرزمین. خانهٔ تو کدام‌ها را دارد؟", key: 3400, hold: 6400, do: [
              { cam: { x: 250, y: 46, zoom: 0.3 }, dur: 2800 }] }
          ] },
        { type: "pairs", prompt: "هر جای خانه، کارش", say: "هر جای خانهٔ قدیمی را با کارش جفت کن.",
          pairs: [
            [{ label: "هشتی", say: "هشتی" }, { label: "مهمان منتظر می‌ماند", say: "مهمان‌ها اینجا منتظر می‌ماندند" }],
            [{ label: "حوض", say: "حوض" }, { label: "آب و خنکی حیاط", say: "آب و خنکیِ حیاط" }],
            [{ label: "ایوان", say: "ایوان" }, { label: "چای در سایه", say: "چای خوردن در سایه" }],
            [{ label: "زیرزمین", say: "زیرزمین" }, { label: "خنک نگه داشتن خوراکی", say: "خنک نگه داشتنِ خوراکی‌ها" }]
          ] },
        { type: "sort", prompt: "خانهٔ قدیمی یا آپارتمان امروز؟", say: "هر چیز را به سبدش ببر: بیشتر در خانهٔ حیاط‌دارِ قدیمی بود، یا در آپارتمانِ امروز؟",
          baskets: [{ pic: "🏡", label: "خانهٔ حیاط‌دار قدیمی", value: "then" }, { pic: "🏢", label: "آپارتمان امروز", value: "now" }],
          items: [
            { pic: "⛲", label: "حوض", say: "حوض وسط حیاط", basket: "then" },
            { pic: "🚪", label: "هشتی", say: "هشتی", basket: "then" },
            { pic: "🏺", label: "زیرزمین خنک", say: "زیرزمینِ خنک", basket: "then" },
            { pic: "🛗", label: "آسانسور", say: "آسانسور", basket: "now" },
            { pic: "🅿️", label: "پارکینگ ماشین", say: "پارکینگ ماشین", basket: "now" },
            { pic: "🧊", label: "یخچال برقی", say: "یخچال برقی", basket: "now" }
          ] },
        { type: "choose", prompt: "چرا زیرزمین در تابستان خنک است؟", say: "چرا زیرزمین در تابستان خنک است؟",
          options: ["چون زیر خاک است و آفتاب به آن نمی‌رسد", "چون در آن کولر هست", "چون آنجا برف می‌بارد"], answer: "چون زیر خاک است و آفتاب به آن نمی‌رسد" }
      ]
    },

    /* Sources: events beyond living memory (England KS1 history; NCSS C3 D2.His.2.3–5 and D2.His.10.3–5).
       Printing in Iran: the first press with movable type was set up in Tabriz about two hundred years ago (1817;
       Encyclopaedia Iranica, "Chap" [printing]); before that, books were copied by hand by scribes. The first railway
       in Iran ran from Tehran to Shahr-e Rey and opened in ۱۲۶۷ (1888); people called it «ماشین دودی» (Encyclopaedia
       Iranica, "Railroads"). We know from old photos, newspapers and books printed then. No rulers are named. */
    {
      id: "world-sapling-35", subject: "world", level: "sapling", emoji: "🚂", title: "اولین قطار، اولین چاپخانه",
      steps: [
        { type: "scene", prompt: "از کتابِ دست‌نویس تا قطارِ دودی", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room3" }, desk: { art: "w-scribe-desk", at: [92, 80], s: 1.4 }, scribe: { art: "w-scribe", at: [66, 86], s: 1.1 },
            press: { art: "w-press", at: [80, 86], s: 1.3, o: 0 }, printer: { art: "w-printer", at: [116, 86], s: 1.1, o: 0 }, pages: { art: "w-pages", at: [40, 86], s: 1.4, sy: 0.3, o: 0 },
            mapT: { art: "w-map-tabriz", at: [28, 22], s: 0.75, o: 0 },
            hills: { art: "w-hillside", o: 0 }, rails: { art: "w-rails", at: [0, 76], o: 0 }, train: { art: "w-steam-train", at: [220, 76], s: 1.1, o: 0 },
            p1: { art: "👨", at: [22, 72], o: 0, look: { top: "#5a7fc4", bottom: "#4b5a78" } }, p2: { art: "👧", at: [34, 73], s: 0.9, o: 0, look: { top: "#e46b8a" } },
            paper: { art: "w-newspaper", at: [136, 30], s: 1.0, o: 0 }
          },
          scenes: [
            { caption: "خیلی وقت پیش، کتاب‌ها را با دست می‌نوشتند. کاتب حرف به حرف می‌نوشت و نوشتنِ یک کتاب ماه‌ها طول می‌کشید.", key: 3600, hold: 6400, do: [
              { id: "scribe.armR", to: { r: -40 }, at: 400, dur: 500 }, { id: "scribe.armR", to: { r: -30 }, at: 900, dur: 400, yoyo: true, times: 8 }] },
            { caption: "حدود دویست سال پیش، در تبریز اولین چاپخانهٔ ایران درست شد.", key: 3400, hold: 5800, do: D(
              hide(["desk", "scribe"], 0, 600), show(["press", "printer", "mapT"], 600, 700), [pulse("mapT.dot", 1600, 2.2, 1000)]) },
            { caption: "با چاپ، یک صفحه را در یک لحظه صدها بار می‌شد زد. کتاب‌ها زیاد شدند و آدم‌های بیشتری کتاب خواندند.", key: 4400, hold: 6600, do: D(
              hide(["mapT"], 0, 500), show(["pages"], 400, 400),
              [0, 1, 2].map(function (i) { return [{ id: "press.plate", to: { y: 5 }, at: 600 + i * 1200, dur: 400 }, { id: "press.plate", to: { y: 0 }, at: 1000 + i * 1200, dur: 400 }, { id: "pages", to: { sy: 0.6 + i * 0.6 }, at: 1000 + i * 1200, dur: 300 }]; })
                .reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "در سال ۱۲۶۷، اولین قطار ایران راه افتاد: از تهران تا شهر ری. مردم به آن «ماشین دودی» می‌گفتند.", key: 5000, hold: 7000, do: D(
              hide(["room", "press", "printer", "pages"], 0, 600), show(["hills", "rails", "train", "p1", "p2"], 300, 700),
              [{ id: "train", to: { x: 112 }, at: 700, dur: 4000, ease: "out" }, { emit: "bubble", from: "train", where: [-24, -32], spread: [3, 2], rise: 12, n: 14, at: 900, dur: 3800, life: 1200 }],
              wave("p2", 3200, 1600)) },
            { caption: "از کجا این‌ها را می‌دانیم؟ از عکس‌های قدیمی، روزنامه‌ها و کتاب‌هایی که همان وقت چاپ شد.", key: 3200, hold: 6000, do: D(
              show(["paper"], 400, 700), [pulse("paper", 1600, 1.1, 800)]) }
          ] },
        { type: "source", img: SRC.train, caption: "یک عکس قدیمی از «ماشین دودی»، کشیده‌شده برای این درس، شبیه عکس‌های آن زمان",
          say: "این عکسی قدیمی از ماشین دودی است. خوب نگاهش کن.",
          look: [{ at: [26, 30], say: "دودکش و دود را ببین. قطار با چه کار می‌کرد؟" }, { at: [78, 62], say: "این آدم‌ها را ببین. فکر می‌کنی چه حسی داشتند؟" }],
          ask: { see: ["یک قطار کوچک با دودکش بلند", "یک واگن با پنجره", "چند نفر که تماشا می‌کنند"],
            think: ["عکس سیاه و سفید است، پس قدیمی است", "قطار با آتش و بخار کار می‌کرد", "مردم برای اولین بار قطار می‌دیدند"],
            wonder: ["سوار شدنش چقدر طول می‌کشید؟", "بلیتش چقدر بود؟", "چه کسی این عکس را گرفت؟"] } },
        { type: "order", prompt: "کدام زودتر؟", say: "این‌ها را به ترتیب بچین: اول قدیمی‌ترین، آخر امروز.", numbered: true,
          items: [{ pic: "✍️", label: "کتاب دست‌نویس", say: "کتابی که کاتب با دست نوشت" }, { pic: "📜", label: "اولین چاپخانه", say: "اولین چاپخانه، در تبریز" },
            { pic: "🚂", label: "ماشین دودی", say: "ماشین دودی، اولین قطار" }, { pic: "🚇", label: "مترو", say: "مترو، امروز" }] },
        { type: "choose", prompt: "چاپخانه چه چیزی را عوض کرد؟", say: "چاپخانه چه چیزی را عوض کرد؟",
          options: ["کتاب‌ها زیاد شدند و آدم‌های بیشتری کتاب خواندند", "مردم دیگر کتاب نخواندند", "کتاب‌ها گران‌تر شدند"], answer: "کتاب‌ها زیاد شدند و آدم‌های بیشتری کتاب خواندند" },
        { type: "choose", prompt: "از کجا می‌دانیم ماشین دودی چه شکلی بود؟", say: "از کجا می‌دانیم ماشین دودی چه شکلی بود؟", pic: true,
          options: [{ label: "🖼️", value: "از عکس‌های قدیمی" }, { label: "🎮", value: "از بازی‌های رایانه‌ای" }, { label: "🌙", value: "از خواب‌هایمان" }], answer: "از عکس‌های قدیمی" }
      ]
    },

    /* Sources: a unit game that brings back world.sap.14, 16 and 21 (world-sapling-29, 34, 47 and 35): then and now,
       the courtyard house, the first printing house and train, and sources of the past. */
    {
      id: "world-sapling-48", subject: "world", level: "sapling", emoji: "🧭", title: "بازی شهر من در گذشته",
      steps: [
        { type: "sort", prompt: "قدیم یا امروز؟", say: "هر چیز را به سبدش ببر: قدیم، یا امروز.",
          baskets: [{ pic: "🏚️", label: "قدیم", value: "then" }, { pic: "🏙️", label: "امروز", value: "now" }],
          items: [
            { pic: "🚂", label: "ماشین دودی", say: "ماشین دودی", basket: "then" },
            { pic: "✍️", label: "کتاب دست‌نویس", say: "کتابِ دست‌نویس", basket: "then" },
            { pic: "⛲", label: "حوض حیاط", say: "حوضِ حیاط", basket: "then" },
            { pic: "🚇", label: "مترو", say: "مترو", basket: "now" },
            { pic: "🛗", label: "آسانسور", say: "آسانسور", basket: "now" },
            { pic: "📱", label: "تلفن همراه", say: "تلفن همراه", basket: "now" }
          ] },
        { type: "timeline", prompt: "کی؟", say: "هر چیز را سر جایش روی خط زمان بگذار.",
          bands: [{ label: "حدود دویست سال پیش", en: "about two hundred years ago", pic: "📜" }, { label: "وقتی ماشین دودی آمد", en: "when the smoke train came", pic: "🚂" },
            { label: "وقتی پدربزرگ بچه بود", en: "when Grandpa was a child", pic: "👴" }, { label: "امروز", en: "today", pic: "🧒" }],
          items: [
            { pic: "📜", say: "اولین چاپخانه در تبریز", band: 0 },
            { pic: "🚂", say: "اولین قطار، تا شهر ری", band: 1 },
            { pic: "📻", say: "رادیو در خانه‌ها", band: 2 },
            { pic: "🚇", say: "مترو", band: 3 }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر جای خانه، کارش", say: "کارت‌ها را برگردان و هر جای خانهٔ قدیمی را با کارش پیدا کن.",
          pairs: [
            [{ label: "هشتی", say: "هشتی" }, { label: "مهمان منتظر می‌ماند", say: "مهمان‌ها منتظر می‌ماندند" }],
            [{ label: "ایوان", say: "ایوان" }, { label: "چای در سایه", say: "چای در سایه" }],
            [{ label: "زیرزمین", say: "زیرزمین" }, { label: "خوراکیِ خنک", say: "خوراکی‌ها خنک می‌ماندند" }],
            [{ label: "حوض", say: "حوض" }, { label: "آب در حیاط", say: "آب وسط حیاط" }]
          ] },
        { type: "sort", prompt: "منبعِ گذشته یا نه؟", say: "کدام دربارهٔ گذشته چیزی به ما می‌گوید؟",
          baskets: [{ pic: "🔍", label: "قصهٔ گذشته را می‌گوید", value: "yes" }, { pic: "🚫", label: "چیزی نمی‌گوید", value: "no" }],
          items: [
            { pic: "🖼️", label: "عکس قدیمی", say: "یک عکس قدیمی", basket: "yes" },
            { pic: "📰", label: "روزنامهٔ قدیمی", say: "یک روزنامهٔ قدیمی", basket: "yes" },
            { pic: "🏺", label: "کوزهٔ زیر خاک", say: "کوزه‌ای که زیر خاک پیدا شده", basket: "yes" },
            { pic: "👴", label: "خاطرهٔ پدربزرگ", say: "خاطرهٔ پدربزرگ", basket: "yes" },
            { pic: "🧃", label: "آبمیوهٔ امروز", say: "آبمیوه‌ای که امروز خریدیم", basket: "no" }
          ] },
        { type: "order", prompt: "از قدیمی‌ترین تا امروز", say: "به ترتیب بچین: اول قدیمی‌ترین، آخر امروز.", numbered: true,
          items: [{ pic: "🪨", label: "ابزار سنگی", say: "ابزار سنگی در غار" }, { pic: "📜", label: "اولین چاپخانه", say: "اولین چاپخانه" },
            { pic: "🚂", label: "ماشین دودی", say: "ماشین دودی" }, { pic: "🚇", label: "مترو", say: "مترو" }] }
      ]
    },

    /* Sources: goods and services, producers and consumers (NCSS C3 D2.Eco.1.K–2 and 3–5; Council for Economic
       Education, Voluntary National Content Standards in Economics, standards 1 and 2; Iran's third-grade social
       studies, «کالا و خدمات»). Goods are things you can take with you; services are work someone does for you.
       Producers make goods or give services; consumers use them. */
    {
      id: "world-sapling-26", subject: "world", level: "sapling", emoji: "🛍️", title: "کالا و خدمات",
      steps: [
        { type: "scene", prompt: "یک روز با کیان", bg: "#cdeaf7",
          parts: {
            sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            home: { art: "w-house", at: [40, 64], s: 1.3 }, school: { art: "w-school", at: [168, 64], s: 1.25 }, clinic: { art: "w-clinic", at: [290, 64], s: 1.3 },
            fruit: { art: "w-fruit", at: [414, 64], s: 1.3 }, bakery: { art: "w-bakery", at: [540, 64], s: 1.3 },
            baker: { art: "🧑‍🍳", at: [524, 62], s: 0.95, look: { top: "#fffaf0" } }, fruiter: { art: "w-fruiter", at: [438, 72], s: 1.0 },
            doctor: { art: "w-doctor", at: [312, 72], s: 1.0 }, teacher: { art: "w-teacher", at: [190, 72], s: 1.0 },
            bread: { art: "🫓", at: [530, 50], s: 0.6, o: 0 }, apple: { art: "🍎", at: [420, 52], s: 0.6, o: 0 },
            mom: { art: "🧍", at: [600, 71], flip: true, look: { top: "#3fb0a8", hair: "auto", kind: "woman", bottom: "dress" } },
            kian: { art: "👦", at: [614, 73], s: 0.9, flip: true, look: { top: "#f2c14e", hairColor: "#1f1712" } },
            goods: { art: "w-bubble-wide", at: [470, 24], o: 0 }, goodsT: { art: "کالا", at: [470, 26], s: 0.3, o: 0 },
            serv: { art: "w-bubble-wide", at: [250, 24], o: 0 }, servT: { art: "خدمت", at: [250, 26], s: 0.3, o: 0 }
          },
          scenes: [
            { caption: "کیان و مادرش نان می‌خرند. نانوا نان را پخته است. نان یک «کالا» است: چیزی که می‌شود خرید و با خود برد.", key: 5400, hold: 7400, do: [
              { cam: { x: 548 }, dur: 1 }, { id: "mom", walk: [556, 71], at: 300, dur: 2400 }, { id: "kian", walk: [570, 73], at: 300, dur: 2400 },
              { id: "bread", to: { o: 1 }, at: 2800, dur: 400 }, { id: "bread", to: { x: 566, y: 58 }, at: 3400, dur: 1000 }] },
            { caption: "میوه‌فروش سیب و پرتقال می‌فروشد. میوه هم کالاست.", key: 5600, hold: 7400, do: [
              { id: "bread", to: { o: 0 }, dur: 300 }, { cam: { x: 440 }, dur: 3200, ease: "linear" }, { id: "mom", walk: [454, 71], dur: 3200 }, { id: "kian", walk: [468, 73], dur: 3200 },
              { id: "apple", to: { o: 1 }, at: 3400, dur: 400 }, { id: "goods", to: { o: 1 }, at: 4000, dur: 400 }, { id: "goodsT", to: { o: 1 }, at: 4000, dur: 400 }] },
            { caption: "کیان سرما خورده. دکتر او را معاینه می‌کند. این یک «خدمت» است: کاری که کسی برای ما انجام می‌دهد.", key: 6000, hold: 7800, do: [
              { id: "apple", to: { o: 0 }, dur: 300 }, { id: "goods", to: { o: 0 }, dur: 300 }, { id: "goodsT", to: { o: 0 }, dur: 300 },
              { cam: { x: 290 }, dur: 3600, ease: "linear" }, { id: "mom", walk: [272, 71], dur: 3600 }, { id: "kian", walk: [290, 73], dur: 3600 },
              { id: "doctor.armL", to: { r: 70 }, at: 3800, dur: 500 }, { id: "serv", to: { o: 1 }, at: 4400, dur: 400 }, { id: "servT", to: { o: 1 }, at: 4400, dur: 400 }] },
            { caption: "در مدرسه، معلم درس می‌دهد. درس دادن هم خدمت است.", key: 5000, hold: 7000, do: D(
              [{ id: "serv", to: { o: 0 }, dur: 300 }, { id: "servT", to: { o: 0 }, dur: 300 },
              { cam: { x: 172 }, dur: 3400, ease: "linear" }, { id: "mom", walk: [148, 71], dur: 3400 }, { id: "kian", walk: [166, 73], dur: 3400 }], talk("teacher", 3600, 1400)) },
            { caption: "نانوا نان تولید می‌کند؛ دکتر و معلم خدمت می‌دهند: آن‌ها «تولیدکننده»اند. کیان و مادرش «مصرف‌کننده»اند: از کالا و خدمت استفاده می‌کنند.", key: 5000, hold: 7600, do: [
              { cam: { x: 300, y: 46, zoom: 0.36 }, dur: 3000 }, { id: "mom", walk: [60, 71], dur: 3600 }, { id: "kian", walk: [74, 73], dur: 3600 }] }
          ] },
        { type: "sort", prompt: "کالا یا خدمت؟", say: "هر کدام را به سبدش ببر: کالا، چیزی که می‌شود برد؛ یا خدمت، کاری که کسی برایمان می‌کند.",
          baskets: [{ pic: "🛍️", label: "کالا", value: "goods" }, { pic: "🤝", label: "خدمت", value: "service" }],
          items: [
            { pic: "🫓", label: "نان", say: "نان", basket: "goods" },
            { pic: "👟", label: "کفش", say: "کفش", basket: "goods" },
            { pic: "🍎", label: "سیب", say: "سیب", basket: "goods" },
            { pic: "✂️", label: "کوتاه کردن مو", say: "کوتاه کردن مو در آرایشگاه", basket: "service" },
            { pic: "🩺", label: "معاینهٔ دکتر", say: "معاینهٔ دکتر", basket: "service" },
            { pic: "🚌", label: "راندن اتوبوس", say: "راننده‌ای که ما را با اتوبوس می‌برد", basket: "service" }
          ] },
        { type: "pairs", prompt: "هر تولیدکننده، چه تولید می‌کند؟", say: "هر تولیدکننده را با کالا یا خدمتش جفت کن.",
          pairs: [
            [{ pic: "🧑‍🍳", label: "نانوا", say: "نانوا" }, { label: "نان", say: "نان" }],
            [{ pic: "🧑‍🌾", label: "کشاورز", say: "کشاورز" }, { label: "سیب", say: "سیب" }],
            [{ pic: "🧑‍⚕️", label: "دکتر", say: "دکتر" }, { label: "درمان", say: "درمانِ بیمار" }],
            [{ pic: "🧑‍🏫", label: "معلم", say: "معلم" }, { label: "درس", say: "درس دادن" }]
          ] },
        { type: "choose", prompt: "وقتی تو نان می‌خری، چه هستی؟", say: "وقتی تو نان می‌خری و می‌خوری، تولیدکننده هستی یا مصرف‌کننده؟",
          options: ["مصرف‌کننده", "تولیدکننده"], answer: "مصرف‌کننده" }
      ]
    },

    /* Sources: work in the village and the city (Iran's fourth-grade social studies, «کار و تولید در روستا و شهر»;
       NCSS C3 D2.Eco.1.3–5 and D2.Geo.7.3–5). Farming, herding and fishing in villages; workshops, factories, shops
       and offices in towns; villages send food to towns and towns send tools and goods back. Examples on the map:
       fishing at Bushehr, rice in Gilan (Rasht), factories at Arak, steel at Isfahan. */
    {
      id: "world-sapling-44", subject: "world", level: "sapling", emoji: "🧑‍🌾", title: "کار در روستا، کار در شهر",
      steps: [
        { type: "scene", prompt: "از روستا تا شهر", bg: "#cdeaf7",
          parts: {
            land: { art: "w-village-city" },
            fisher: { art: "w-fisher", at: [-10, 70], s: 0.85 }, boat: { art: "w-boat-hull", at: [-10, 64], s: 1.3 }, fish: { art: "🐟", at: [10, 74], s: 0.5, o: 0 },
            farmer: { art: "w-farmer-m", at: [94, 80], s: 1.05 }, shep: { art: "w-shepherd", at: [190, 82], s: 1.05 },
            sh1: { art: "🐑", at: [170, 76], s: 0.55 }, sh2: { art: "🐑", at: [208, 78], s: 0.55 }, sh3: { art: "🐑", at: [222, 74], s: 0.5 },
            shop1: { art: "w-workshop", at: [300, 72], s: 1.2 }, carp: { art: "w-carpenter", at: [330, 80], s: 1.0 }, chair: { art: "🪑", at: [348, 74], s: 0.5, o: 0 },
            factory: { art: "w-factory", at: [420, 72], s: 1.2 }, truck: { art: "w-truck", at: [180, 86], s: 0.8, o: 0, flip: true }, tom: { art: "🍅", at: [176, 76], s: 0.4, o: 0 },
            store: { art: "w-shop1", at: [510, 72], s: 1.2 }, office: { art: "w-office", at: [570, 72], s: 1.1 }, clerk: { art: "w-clerk", at: [540, 80], s: 1.0 }
          },
          scenes: [
            { caption: "در روستای کنار دریا، ماهیگیر با قایق ماهی می‌گیرد.", key: 3400, hold: 5600, do: [
              { cam: { x: 20 }, dur: 1 }, { id: "boat", to: { x: 0 }, at: 300, dur: 2000 }, { id: "fisher", to: { x: 0 }, at: 300, dur: 2000 }, { id: "fish", to: { o: 1, y: 62 }, at: 2400, dur: 600 }] },
            { caption: "در مزرعه، کشاورز گندم می‌کارد. چوپان گوسفندها را به چرا می‌برد.", key: 4400, hold: 6400, do: [
              { cam: { x: 140 }, dur: 3000, ease: "linear" }, { id: "farmer.armL", to: { r: 60 }, at: 2600, dur: 400, yoyo: true, times: 4 },
              { id: "sh1", to: { x: 162 }, at: 3000, dur: 1600 }, { id: "sh2", to: { x: 200 }, at: 3200, dur: 1600 }] },
            { caption: "در شهر، در کارگاه نجاری، نجار میز و صندلی می‌سازد.", key: 4600, hold: 6600, do: [
              { cam: { x: 310 }, dur: 3400, ease: "linear" }, { id: "carp.armR", to: { r: -40 }, at: 3400, dur: 300, yoyo: true, times: 6 }, { id: "chair", to: { o: 1 }, at: 4200, dur: 400 }] },
            { caption: "کامیون گوجه‌فرنگیِ روستا را به کارخانه می‌برد. در کارخانه از آن رب گوجه می‌سازند.", key: 5000, hold: 7000, do: [
              { cam: { x: 420 }, dur: 2400, ease: "linear" }, { id: "truck", to: { o: 1 }, dur: 1 }, { id: "truck", to: { x: 400 }, at: 400, dur: 4400 }, { id: "tom", to: { o: 1 }, dur: 1 }, { id: "tom", to: { x: 396 }, at: 400, dur: 4400 },
              { emit: "bubble", where: [440, 14], spread: [3, 2], rise: 10, n: 8, at: 2400, dur: 3000, life: 1400 }] },
            { caption: "در فروشگاه و اداره هم مردم کار می‌کنند: فروشنده می‌فروشد و کارمند به کار مردم رسیدگی می‌کند.", key: 4400, hold: 6600, do: D(
              [{ cam: { x: 540 }, dur: 3000, ease: "linear" }], wave("clerk", 3200, 1400)) },
            { caption: "روستا و شهر به هم کمک می‌کنند: روستا غذا می‌فرستد و شهر ابزار و کالا.", key: 3600, hold: 6400, do: [
              { cam: { x: 290, y: 46, zoom: 0.24 }, dur: 3000 }] }
          ] },
        { type: "sort", prompt: "روستا یا شهر؟", say: "این کار را بیشتر در روستا می‌کنند یا در شهر؟",
          baskets: [{ pic: "🏡", label: "روستا", value: "village" }, { pic: "🏙️", label: "شهر", value: "city" }],
          items: [
            { pic: "🌾", label: "کشاورزی", say: "کشاورزی", basket: "village" },
            { pic: "🐑", label: "دامداری", say: "نگه داشتن گوسفند و گاو", basket: "village" },
            { pic: "🎣", label: "ماهیگیری", say: "ماهیگیری", basket: "village" },
            { pic: "🏭", label: "کارخانه", say: "کار در کارخانه", basket: "city" },
            { pic: "🏢", label: "اداره", say: "کار در اداره", basket: "city" },
            { pic: "🏬", label: "فروشگاه بزرگ", say: "کار در فروشگاه بزرگ", basket: "city" }
          ] },
        { type: "map", map: "iran", layers: ["seas"], cities: ["bushehr", "rasht", "arak", "isfahan"], labels: true, say: "در ایران، هر جا کارِ خودش را دارد.",
          tasks: [
            { find: "bushehr", prompt: "در بوشهر، کنار خلیج فارس، ماهیگیری می‌کنند. بوشهر را پیدا کن." },
            { find: "rasht", prompt: "در گیلان برنج می‌کارند. رشت را پیدا کن." },
            { find: "arak", prompt: "در اراک کارخانه‌های بزرگ هست. اراک را پیدا کن." },
            { find: "isfahan", prompt: "در اصفهان کارخانهٔ بزرگِ فولاد هست. اصفهان را پیدا کن." }
          ] },
        { type: "pairs", prompt: "از روستا تا شهر", say: "هر چیزِ روستا را با چیزی که در شهر از آن ساخته می‌شود جفت کن.",
          pairs: [
            [{ pic: "🍅", label: "گوجه‌فرنگی", say: "گوجه‌فرنگی" }, { label: "رب گوجه", say: "رب گوجه" }],
            [{ pic: "🌾", label: "گندم", say: "گندم" }, { label: "نان", say: "نان" }],
            [{ pic: "🐑", label: "پشم", say: "پشم گوسفند" }, { label: "فرش", say: "فرش" }],
            [{ pic: "🥛", label: "شیر", say: "شیر" }, { label: "پنیر", say: "پنیر" }]
          ] }
      ]
    },

    /* Sources: trade then and now (UNESCO World Heritage: "Tabriz Historic Bazaar Complex", 2010, and "The Persian
       Caravanserai", 2023; Iran's fourth-grade social studies, «بازار و داد و ستد»; NCSS C3 D2.Eco.14.3–5 and
       D2.His.2.3–5). Merchants travelled with camel caravans and stopped at caravanserais along the roads; goods reached
       covered bazaars of many shops; today goods come by big ships to ports such as Bandar Abbas and by lorry. */
    {
      id: "world-sapling-5", subject: "world", level: "sapling", emoji: "🐫", title: "بازار و کاروانسرا",
      steps: [
        { type: "scene", prompt: "کالاها چطور به بازار می‌رسیدند؟", bg: "#e4f1f8",
          parts: {
            sand: { art: "w-sand" }, sun: { art: "w-sun", at: [140, 14], s: 0.9 }, inn: { art: "w-caravanserai", at: [40, 66], s: 1.1, o: 0 },
            c1: { art: "🐫", at: [190, 66], s: 1.2, flip: true }, c2: { art: "🐫", at: [218, 67], s: 1.2, flip: true }, c3: { art: "🐫", at: [246, 66], s: 1.2, flip: true },
            load1: { art: "🧶", at: [190, 52], s: 0.45 }, load2: { art: "🧂", at: [218, 53], s: 0.4 },
            bazaar: { art: "w-bazaar", o: 0 },
            g1: { art: "🧶", at: [20, 50], s: 0.6, o: 0 }, g2: { art: "🌶️", at: [60, 50], s: 0.55, o: 0 }, g3: { art: "🫖", at: [100, 50], s: 0.55, o: 0 }, g4: { art: "🧵", at: [140, 50], s: 0.55, o: 0 },
            buyer: { art: "🧍", at: [-12, 86], s: 1.1, o: 0, look: { top: "#e46b8a", hair: "auto", kind: "woman", bottom: "dress" } },
            seller: { art: "w-fruiter", at: [68, 88], s: 1.1, o: 0 },
            port: { art: "w-port", o: 0 }, ship: { art: "w-ship", at: [190, 70], s: 1.5, o: 0 }, truck: { art: "w-truck", at: [40, 58], s: 0.7, o: 0 }
          },
          scenes: [
            { caption: "قدیم، بازرگان‌ها با کاروانِ شتر از شهری به شهر دیگر می‌رفتند و کالا می‌بردند: فرش، ابریشم، ادویه.", key: 5200, hold: 7200, do: [
              { id: "c1", to: { x: 86 }, at: 300, dur: 4600, ease: "linear" }, { id: "c2", to: { x: 114 }, at: 300, dur: 4600, ease: "linear" }, { id: "c3", to: { x: 142 }, at: 300, dur: 4600, ease: "linear" },
              { id: "load1", to: { x: 86 }, at: 300, dur: 4600, ease: "linear" }, { id: "load2", to: { x: 114 }, at: 300, dur: 4600, ease: "linear" }] },
            { caption: "شب‌ها در کاروانسرا می‌ماندند: ساختمانی بزرگ و محکم کنار راه، برای مسافرها و شترهایشان.", key: 5400, hold: 7400, do: D(
              show(["inn"], 0, 800), [{ id: "c1", to: { x: 56 }, at: 400, dur: 3000, ease: "linear" }, { id: "c2", to: { x: 84 }, at: 400, dur: 3000, ease: "linear" }, { id: "c3", to: { x: 112 }, at: 400, dur: 3000, ease: "linear" },
              { id: "load1", to: { x: 56 }, at: 400, dur: 3000, ease: "linear" }, { id: "load2", to: { x: 84 }, at: 400, dur: 3000, ease: "linear" }]) },
            { caption: "کالاها به بازار می‌رسید. بازارِ سرپوشیده پر از دکان بود: فرش‌فروش، ادویه‌فروش، مسگر، پارچه‌فروش.", key: 5200, hold: 7400, do: D(
              show(["bazaar"], 0, 800), show(["g1", "g2", "g3", "g4"], 900, 600), show(["seller", "buyer"], 900, 600),
              walk("buyer", { x: 44 }, 1600, 2400), talk("seller", 4200, 1200)) },
            { caption: "امروز کالاها با کشتی‌های بزرگ به بندرها می‌رسند، مثل بندرعباس، و با کامیون به شهرها می‌روند.", key: 5200, hold: 7200, do: D(
              hide(["bazaar", "g1", "g2", "g3", "g4", "seller", "buyer"], 0, 600), show(["port", "ship"], 400, 800),
              [{ id: "ship", to: { x: 110 }, at: 800, dur: 3200, ease: "out" }, { id: "truck", to: { o: 1 }, at: 3600, dur: 300 }, { id: "truck", to: { x: -20 }, at: 3900, dur: 2600 }]) },
            { caption: "ولی بازارهای قدیمی هنوز زنده‌اند. بازار تبریز یکی از بزرگ‌ترین بازارهای سرپوشیدهٔ دنیاست و مردم هنوز آنجا خرید می‌کنند.", key: 3600, hold: 6600, do: D(
              hide(["port", "ship", "truck"], 0, 600), show(["bazaar", "g1", "g2", "g3", "g4", "seller", "buyer"], 400, 800), wave("buyer", 1800, 1600)) }
          ] },
        { type: "sort", prompt: "قدیم یا امروز؟", say: "هر چیز را به سبدش ببر: داد و ستدِ قدیم، یا امروز.",
          baskets: [{ pic: "🐫", label: "قدیم", value: "then" }, { pic: "🚢", label: "امروز", value: "now" }],
          items: [
            { pic: "🐫", label: "کاروان شتر", say: "کاروان شتر", basket: "then" },
            { pic: "🏰", label: "کاروانسرا", say: "کاروانسرا", basket: "then" },
            { pic: "🚢", label: "کشتی باری بزرگ", say: "کشتی باری بزرگ", basket: "now" },
            { pic: "🚛", label: "کامیون", say: "کامیون", basket: "now" },
            { pic: "🛒", label: "فروشگاه بزرگ", say: "فروشگاه بزرگ", basket: "now" },
            { pic: "📱", label: "خرید با گوشی", say: "خرید با گوشی", basket: "now" }
          ] },
        { type: "order", prompt: "سفرِ فرش", say: "قدیم، یک فرش چطور به بازار می‌رسید؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🧶", label: "بافتن فرش", say: "فرش را در روستا بافتند" }, { pic: "🐫", label: "کاروان", say: "فرش را بار شتر کردند" },
            { pic: "🏰", label: "کاروانسرا", say: "شب در کاروانسرا ماندند" }, { pic: "🏪", label: "بازار", say: "فرش به بازار رسید" }] },
        { type: "map", map: "iran", layers: ["seas"], cities: ["tabriz", "bandar-abbas", "isfahan"], labels: true, say: "بازارها و بندرها را پیدا کن.",
          tasks: [
            { find: "tabriz", prompt: "بازار تبریز یکی از بزرگ‌ترین بازارهای سرپوشیدهٔ دنیاست. تبریز را پیدا کن." },
            { find: "bandar-abbas", prompt: "امروز کشتی‌های بزرگ به بندرعباس می‌آیند. بندرعباس را پیدا کن." },
            { find: "isfahan", prompt: "اصفهان هم بازار قدیمی بزرگی دارد. اصفهان را پیدا کن." }
          ] }
      ]
    },

    /* Sources: the story of money (Council for Economic Education, Voluntary National Content Standards in Economics,
       standard 11, "money makes it easier to trade"; NCSS C3 D2.Eco.1.3–5 and D2.His.2.3–5; Iran's fourth-grade social
       studies, «پول»). Barter works only when each side wants what the other has; coins of gold and silver, then paper
       money, then bank cards and phones made trade easier. */
    {
      id: "world-sapling-45", subject: "world", level: "sapling", emoji: "🪙", title: "پول در قدیم",
      steps: [
        { type: "scene", prompt: "قبل از پول چه می‌کردند؟", bg: "#e9d0a8",
          parts: {
            bazaar: { art: "w-bazaar" }, shop: { art: "w-shop-in", o: 0 },
            farmer: { art: "w-farmer-m", at: [40, 88], s: 1.1 }, shep: { art: "w-shepherd", at: [120, 88], s: 1.1 }, cob: { art: "w-cobbler", at: [180, 88], s: 1.1, o: 0 },
            sack: { art: "w-sack", at: [52, 86], s: 1.1 }, wool: { art: "w-wool", at: [108, 86], s: 1.2 },
            b1: { art: "w-bubble", at: [92, 40], o: 0 }, b1p: { art: "👟", at: [92, 39], s: 0.4, o: 0 },
            b2: { art: "w-bubble", at: [124, 40], o: 0 }, b2p: { art: "🌾", at: [124, 39], s: 0.4, o: 0 }, b2x: { art: "🚫", at: [124, 39], s: 0.5, o: 0 },
            coins: { art: "🪙", at: [80, 60], s: 0.9, o: 0 }, note: { art: "💵", at: [80, 60], s: 1.0, o: 0 },
            card: { art: "💳", at: [60, 72], s: 1.4, o: 0 }, phone: { art: "📱", at: [100, 72], s: 1.3, o: 0 }
          },
          scenes: [
            { caption: "خیلی قدیم پول نبود. مردم کالا را با کالا عوض می‌کردند: کشاورز گندم می‌داد و از چوپان پشم می‌گرفت.", key: 4600, hold: 6600, do: [
              { id: "farmer.armR", to: { r: -50 }, at: 400, dur: 500 }, { id: "sack", to: { x: 104 }, at: 1200, dur: 1800 }, { id: "wool", to: { x: 56 }, at: 1200, dur: 1800 },
              { id: "farmer.armR", to: { r: 0 }, at: 3200, dur: 500 }] },
            { caption: "ولی گاهی سخت بود: کشاورز کفش می‌خواست، ولی کفاش گندم نمی‌خواست!", key: 5400, hold: 7400, do: D(
              hide(["shep", "wool"], 0, 500), [{ id: "sack", to: { x: 52 }, dur: 600 }, { id: "cob", to: { o: 1 }, dur: 1 }], walk("cob", { x: 112 }, 300, 2200),
              show(["b1", "b1p"], 2600, 400), show(["b2", "b2p", "b2x"], 3800, 400), [{ id: "cob.head", to: { r: -12 }, at: 4000, dur: 300, yoyo: true, times: 4 }]) },
            { caption: "برای همین مردم سکه ساختند: تکه‌های کوچکِ طلا و نقره که همه قبولشان داشتند. حالا هر کس هر چه می‌خواست، می‌خرید.", key: 4000, hold: 6600, do: D(
              hide(["b1", "b1p", "b2", "b2p", "b2x", "sack"], 0, 400), show(["coins"], 500, 500), [pulse("coins", 1200, 1.3, 700), { id: "coins", to: { x: 104 }, at: 2400, dur: 1200 }]) },
            { caption: "بعدها پول کاغذی آمد: سبک‌تر بود و آسان‌تر جابه‌جا می‌شد.", key: 3000, hold: 5400, do: D(
              hide(["coins"], 0, 500), show(["note"], 500, 600), [pulse("note", 1400, 1.3, 700)]) },
            { caption: "امروز با کارت بانکی یا گوشی هم خرید می‌کنیم. پول، داد و ستد را آسان کرد.", key: 3800, hold: 6400, do: D(
              hide(["note", "bazaar", "farmer", "cob"], 0, 500), show(["shop"], 300, 700), show(["card"], 1000, 500), show(["phone"], 1800, 500)) }
          ] },
        { type: "order", prompt: "داستان پول", say: "مردم چطور خرید می‌کردند؟ از قدیمی‌ترین بچین.", numbered: true,
          items: [{ pic: "🔁", label: "کالا با کالا", say: "عوض کردن کالا با کالا" }, { pic: "🪙", label: "سکه", say: "سکهٔ طلا و نقره" },
            { pic: "💵", label: "پول کاغذی", say: "پول کاغذی" }, { pic: "💳", label: "کارت بانکی", say: "کارت بانکی" }] },
        { type: "choose", prompt: "چرا پول داد و ستد را آسان کرد؟", say: "چرا پول داد و ستد را آسان کرد؟",
          options: ["چون همه آن را قبول دارند و با آن هر چیزی می‌شود خرید", "چون پول خوشمزه است", "چون پول را می‌شود کاشت"], answer: "چون همه آن را قبول دارند و با آن هر چیزی می‌شود خرید" },
        { type: "choose", prompt: "کشاورز کفش می‌خواهد، ولی کفاش گندم نمی‌خواهد. پول چطور کمک می‌کند؟", say: "کشاورز کفش می‌خواهد، ولی کفاش گندم نمی‌خواهد. پول چطور کمک می‌کند؟",
          options: ["کشاورز گندم را می‌فروشد و با پولش کفش می‌خرد", "کشاورز کفش را برمی‌دارد و می‌رود", "کشاورز دیگر کفش نمی‌خواهد"], answer: "کشاورز گندم را می‌فروشد و با پولش کفش می‌خرد" }
      ]
    },

    /* Sources: choices and saving (Council for Economic Education, Voluntary National Content Standards in Economics,
       standard 1, scarcity and choice, and the idea of opportunity cost, "what you give up"; NCSS C3 D2.Eco.1.3–5 and
       D2.Eco.2.K–2; Iran's fourth-grade social studies, «پس‌انداز»). Prices are in thousands of toman, as in the money
       step. */
    {
      id: "world-sapling-27", subject: "world", level: "sapling", emoji: "🤔", title: "این یا آن؟",
      steps: [
        { type: "scene", prompt: "نیما چه بخرد؟", bg: "#f3e6cf",
          parts: {
            shop: { art: "w-shop-in" }, nima: { art: "w-boy", at: [126, 86], s: 1.25 },
            ball: { art: "⚽", at: [42, 66], s: 0.9 }, book: { art: "📕", at: [84, 66], s: 0.9 },
            tag1: { art: "w-tile", at: [42, 80], s: 0.7 }, tag1T: { art: "۱۰ هزار تومان", at: [42, 81], s: 0.11 },
            tag2: { art: "w-tile", at: [84, 80], s: 0.7 }, tag2T: { art: "۱۰ هزار تومان", at: [84, 81], s: 0.11 },
            money: { art: "💵", at: [140, 66], s: 0.5 },
            think: { art: "w-bubble-wide", at: [112, 30], o: 0 }, tb: { art: "⚽", at: [102, 30], s: 0.35, o: 0 }, tq: { art: "❓", at: [112, 30], s: 0.3, o: 0 }, tk: { art: "📕", at: [122, 30], s: 0.35, o: 0 },
            room: { art: "w-room", o: 0 }, kid2: { art: "w-boy", at: [60, 86], s: 1.25, o: 0 }, pig: { art: "🐷", at: [104, 76], s: 0.9, o: 0 },
            coin: { art: "🪙", at: [104, 50], s: 0.4, o: 0 }, bike: { art: "🚲", at: [118, 72], s: 1.5, o: 0 }, wish: { art: "w-bubble", at: [80, 40], o: 0 }, wishB: { art: "🚲", at: [80, 39], s: 0.4, o: 0 }
          },
          scenes: [
            { caption: "نیما ده هزار تومان دارد. در فروشگاه یک توپ هست و یک کتاب قصه. هر کدام ده هزار تومان است.", key: 3400, hold: 6000, do: [
              pulse("ball", 800, 1.2, 600), pulse("book", 1800, 1.2, 600), pulse("money", 2800, 1.3, 600)] },
            { caption: "پولش فقط برای یکی کافی است. نیما فکر می‌کند: کدام را بیشتر می‌خواهد؟", key: 3400, hold: 6000, do: D(
              show(["think", "tb", "tq", "tk"], 400, 500), [{ id: "nima.head", to: { r: 10 }, at: 1200, dur: 600, yoyo: true, times: 4 }]) },
            { caption: "نیما توپ را می‌خرد. کتاب را نمی‌گیرد. چیزی که به جایش نگرفتی، «هزینهٔ انتخاب» است.", key: 4200, hold: 6600, do: D(
              hide(["think", "tb", "tq", "tk", "tag1", "tag1T"], 0, 400), [{ id: "money", to: { x: 50 }, at: 400, dur: 1200 }, { id: "money", to: { o: 0 }, at: 1600, dur: 300 },
              { id: "ball", to: { x: 112, y: 70 }, at: 1800, dur: 1200 }, { id: "book", to: { o: 0.3 }, at: 2800, dur: 800 }]) },
            { caption: "نیما یک دوچرخه هم دوست دارد، ولی گران است. هر هفته کمی از پولش را در قلک می‌گذارد.", key: 4200, hold: 7400, do: D(
              hide(["shop", "nima", "ball", "book", "tag2", "tag2T"], 0, 600), show(["room", "kid2", "pig", "wish", "wishB"], 400, 700),
              [0, 1, 2].map(function (i) { return [{ id: "coin", to: { o: 1, y: 50 }, at: 1400 + i * 1200, dur: 100 }, { id: "coin", to: { y: 70 }, at: 1500 + i * 1200, dur: 500 }, { id: "coin", to: { o: 0 }, at: 2000 + i * 1200, dur: 100 }]; })
                .reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "چند هفته بعد، پولش کافی شد! با پس‌انداز می‌شود چیزِ بزرگ‌تری خرید.", key: 3200, hold: 6000, do: D(
              hide(["wish", "wishB", "pig"], 0, 500), show(["bike"], 600, 700), wave("kid2", 1600, 1600)) }
          ] },
        { type: "money", prompt: "پول توپ را بده.", say: "توپ ده هزار تومان است. پولش را بده.", items: [{ emoji: "⚽", name: "توپ", price: 10 }], wallet: [5, 2, 2, 1, 5] },
        { type: "choose", prompt: "نیما توپ را خرید. چه چیزی را از دست داد؟", say: "نیما توپ را خرید. چه چیزی را به جایش نگرفت؟", pic: true,
          options: [{ label: "📕", value: "کتاب قصه" }, { label: "⚽", value: "توپ" }, { label: "🚲", value: "دوچرخه" }], answer: "کتاب قصه" },
        { type: "choose", prompt: "برای خریدن چیزی گران، چه کنیم؟", say: "اگر چیزی گران را بخواهیم، چه کار کنیم؟", pic: true,
          options: [{ label: "🐷", value: "کم‌کم پس‌انداز کنیم" }, { label: "😭", value: "گریه کنیم" }, { label: "🍬", value: "همهٔ پول را خوراکی بخریم" }], answer: "کم‌کم پس‌انداز کنیم" },
        home({ pic: "🐷 🎯 🪙", text: "یک هدف پس‌انداز داشته باش!",
          need: ["یک قلک یا یک قوطی", "یک کاغذ و مداد"],
          steps: [
            "با کودک یک چیز کوچک انتخاب کنید که می‌خواهد برایش پس‌انداز کند (یک کتاب، یک توپ، یک هدیه برای کسی).",
            "عکسش را روی کاغذ بکشد و قیمتش را کنارش بنویسید. کاغذ را روی قلک بچسبانید.",
            "هر هفته، کمی از پول توجیبی‌اش را در قلک بگذارد و روی کاغذ یک خط بکشد.",
            "وقتی پول کافی شد، با هم بروید و بخرید. بپرسید: «صبر کردن چه حسی داشت؟»"
          ],
          ask: "اگر امروز ده هزار تومان داشتی، خرجش می‌کردی یا پس‌انداز؟ چرا؟" })
      ]
    },

    /* Sources: a unit game that brings back world.sap.11 (goods and services, producers, trade then and now, money:
       world-sapling-26, 44, 5 and 45) and world.sap.23 (choices and saving: world-sapling-27). Prices are in thousands
       of toman. */
    {
      id: "world-sapling-28", subject: "world", level: "sapling", emoji: "🏪", title: "بازی بازار",
      steps: [
        { type: "sort", prompt: "کالا یا خدمت؟", say: "هر کدام را به سبدش ببر: کالا یا خدمت.",
          baskets: [{ pic: "🛍️", label: "کالا", value: "goods" }, { pic: "🤝", label: "خدمت", value: "service" }],
          items: [
            { pic: "🧀", label: "پنیر", say: "پنیر", basket: "goods" },
            { pic: "🧶", label: "فرش", say: "فرش", basket: "goods" },
            { pic: "🪑", label: "صندلی", say: "صندلی", basket: "goods" },
            { pic: "🚕", label: "رساندن با تاکسی", say: "راننده‌ای که ما را با تاکسی می‌رساند", basket: "service" },
            { pic: "🧑‍🏫", label: "درس دادن", say: "درس دادن معلم", basket: "service" },
            { pic: "🧹", label: "تمیز کردن کوچه", say: "تمیز کردن کوچه", basket: "service" }
          ] },
        { type: "pairs", prompt: "هر تولیدکننده، چه تولید می‌کند؟", say: "هر تولیدکننده را با چیزی که تولید می‌کند جفت کن.",
          pairs: [
            [{ pic: "🎣", label: "ماهیگیر", say: "ماهیگیر" }, { pic: "🐟", label: "ماهی", say: "ماهی" }],
            [{ pic: "🪚", label: "نجار", say: "نجار" }, { pic: "🪑", label: "صندلی", say: "صندلی" }],
            [{ pic: "🐑", label: "چوپان", say: "چوپان" }, { pic: "🧶", label: "پشم", say: "پشم" }],
            [{ pic: "🧑‍⚕️", label: "دکتر", say: "دکتر" }, { pic: "🩺", label: "درمان", say: "درمان" }]
          ] },
        { type: "money", prompt: "نان و پنیر بخر: پول درست را بده.", say: "نان پنج هزار تومان است و پنیر ده هزار تومان. پولش را بده.",
          items: [{ emoji: "🫓", name: "نان", price: 5 }, { emoji: "🧀", name: "پنیر", price: 10 }], wallet: [10, 5, 2, 2, 1] },
        { type: "money", prompt: "نیما بیست هزار تومان داشت و توپی به ده هزار تومان خرید. چقدر برایش ماند؟", bills: [10], options: [10, 20, 30], answer: 10 },
        { type: "order", prompt: "داستان پول", say: "مردم چطور خرید می‌کردند؟ از قدیمی‌ترین بچین.", numbered: true,
          items: [{ pic: "🔁", label: "کالا با کالا", say: "عوض کردن کالا با کالا" }, { pic: "🪙", label: "سکه", say: "سکه" },
            { pic: "💵", label: "پول کاغذی", say: "پول کاغذی" }, { pic: "💳", label: "کارت بانکی", say: "کارت بانکی" }] },
        { type: "sort", prompt: "خرج یا پس‌انداز؟", say: "هر کار را به سبدش ببر: خرج کردن، یا پس‌انداز.",
          baskets: [{ pic: "🛍️", label: "خرج کردن", value: "spend" }, { pic: "🐷", label: "پس‌انداز", value: "save" }],
          items: [
            { pic: "🍦", label: "خریدن بستنی", say: "خریدن بستنی", basket: "spend" },
            { pic: "⚽", label: "خریدن توپ", say: "خریدن توپ", basket: "spend" },
            { pic: "🐷", label: "پول در قلک", say: "گذاشتن پول در قلک", basket: "save" },
            { pic: "🚲", label: "جمع کردن برای دوچرخه", say: "جمع کردن پول برای دوچرخه", basket: "save" }
          ] }
      ]
    },

    /* Sources: continents, oceans, globes and flat maps (England KS1 and KS2 geography, "name and locate the world's
       seven continents and five oceans"; NCSS C3 D2.Geo.1.3–5; National Geographic Education, "Map projections": a flat
       map always stretches the round Earth, like a peeled orange laid flat). Seven continents as taught in Iran; five
       oceans (the Pacific is the largest). The world map is js/maps/world.js (Natural Earth). */
    {
      id: "world-sapling-7", subject: "world", level: "sapling", emoji: "🌍", title: "قاره‌ها و اقیانوس‌ها",
      steps: [
        { type: "scene", prompt: "از کره تا نقشه", bg: "#f6e3c6",
          parts: {
            room: { art: "w-room" }, stand: { art: "w-globe-stand", at: [104, 54] }, globe: { art: "w-globe", at: [104, 54] }, kid: { art: "w-sohrab", at: [70, 86], s: 1.2 },
            orange: { art: "🍊", at: [60, 50], s: 1.4, o: 0 }, peel: { art: "w-peel-flat", at: [100, 46], s: 1.2, o: 0 },
            sea: { art: "w-map-world-big", at: [80, 46], o: 0 },
            o1: { art: "اقیانوس آرام", at: [19.5, 54], s: 0.16, o: 0 }, o2: { art: "اقیانوس اطلس", at: [54, 36], s: 0.16, o: 0 }, o3: { art: "اقیانوس هند", at: [105, 57], s: 0.16, o: 0 },
            o4: { art: "اقیانوس منجمد شمالی", at: [72, 8], s: 0.14, o: 0 }, o5: { art: "اقیانوس منجمد جنوبی", at: [49, 76], s: 0.14, o: 0 }
          },
          scenes: [
            { caption: "سهراب کرهٔ جغرافیایی را می‌چرخاند. روی کره، قاره‌ها و اقیانوس‌ها درست همان شکلی‌اند که روی زمین هستند.", key: 4000, hold: 6000, do: [
              { id: "kid.armR", to: { r: -80 }, at: 600, dur: 500 }, { id: "globe.land", to: { x: -110 }, at: 1000, dur: 3400, ease: "out" }, { id: "kid.armR", to: { r: 0 }, at: 3800, dur: 500 }] },
            { caption: "ولی کره را نمی‌شود لای کتاب گذاشت. برای همین نقشهٔ صافِ دنیا را می‌کشیم، مثل وقتی پوست پرتقال را صاف می‌کنیم.", key: 4400, hold: 6800, do: D(
              hide(["stand", "globe"], 0, 600), show(["orange"], 400, 600), [{ id: "orange", to: { x: 100, y: 46, o: 0 }, at: 1800, dur: 1000 }], show(["peel"], 2400, 800), [pulse("peel", 3400, 1.1, 700)]) },
            { caption: "پوستِ صاف‌شده کمی پاره و کشیده می‌شود. نقشهٔ دنیا هم کمی کشیده است؛ مثلاً جنوبگان روی نقشه خیلی پهن دیده می‌شود.", key: 4400, hold: 6800, do: D(
              hide(["room", "kid", "peel"], 0, 700), show(["sea"], 400, 900), [pulse("sea.antarctica", 2400, 1.12, 900)]) },
            { caption: "روی نقشه هفت قاره هست. ما در آسیا زندگی می‌کنیم؛ آسیا بزرگ‌ترین قاره است.", key: 3000, hold: 5400, do: [
              ["europe", "africa", "north-america", "south-america", "oceania", "antarctica"].map(function (c) { return { id: "sea." + c, to: { o: 0.35 }, at: 300, dur: 600 }; }),
              [pulse("sea.asia", 1000, 1.12, 1000)]].reduce(function (a, b) { return a.concat(b); }, []) },
            { caption: "بقیه: اروپا، آفریقا، آمریکای شمالی، آمریکای جنوبی، اقیانوسیه، و جنوبگان که پوشیده از یخ است.", key: 6400, hold: 8000, do: [
              { id: "sea.europe", to: { o: 1 }, at: 200, dur: 300 }, { id: "sea.africa", to: { o: 1 }, at: 1200, dur: 300 }, { id: "sea.north-america", to: { o: 1 }, at: 2200, dur: 300 },
              { id: "sea.south-america", to: { o: 1 }, at: 3200, dur: 300 }, { id: "sea.oceania", to: { o: 1 }, at: 4200, dur: 300 }, { id: "sea.antarctica", to: { o: 1 }, at: 5200, dur: 300 },
              pulse("sea.europe", 400, 1.18, 700), pulse("sea.africa", 1400, 1.12, 700), pulse("sea.north-america", 2400, 1.1, 700),
              pulse("sea.south-america", 3400, 1.12, 700), pulse("sea.oceania", 4400, 1.15, 700), pulse("sea.antarctica", 5400, 1.08, 700)] },
            { caption: "و پنج اقیانوس: آرام، اطلس، هند، منجمد شمالی و منجمد جنوبی. اقیانوس آرام از همه بزرگ‌تر است.", key: 4600, hold: 7000, do: D(
              show(["o1"], 400, 400), show(["o2"], 1100, 400), show(["o3"], 1800, 400), show(["o4"], 2500, 400), show(["o5"], 3200, 400), [pulse("o1", 4000, 1.4, 700)]) }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans"], say: "قاره‌ها را روی نقشهٔ دنیا پیدا کن.",
          tasks: [
            { find: "asia", prompt: "ما در کدام قاره‌ایم؟ آسیا را پیدا کن." },
            { find: "africa", prompt: "آفریقا را پیدا کن، جنوبِ اروپا." },
            { find: "south-america", prompt: "آمریکای جنوبی را پیدا کن." },
            { find: "oceania", prompt: "اقیانوسیه را پیدا کن، جنوب شرقیِ آسیا." },
            { find: "antarctica", prompt: "جنوبگان، قارهٔ یخی، کجاست؟" }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans"], say: "اقیانوس‌ها را پیدا کن.",
          tasks: [
            { find: "pacific", prompt: "بزرگ‌ترین اقیانوس، اقیانوس آرام، کجاست؟" },
            { find: "atlantic", prompt: "اقیانوس اطلس، بین آمریکا و اروپا و آفریقا، کجاست؟" },
            { find: "indian", prompt: "اقیانوس هند، جنوبِ آسیا، کجاست؟ دریای عمان به آن راه دارد." }
          ] },
        { type: "choose", prompt: "چرا نقشهٔ صافِ دنیا کمی کشیده است؟", say: "چرا نقشهٔ صافِ دنیا کمی کشیده است؟",
          options: ["چون زمین گرد است و گرد را نمی‌شود بی‌کشیدگی صاف کرد", "چون نقاش اشتباه کرده", "چون قاره‌ها جابه‌جا می‌شوند"], answer: "چون زمین گرد است و گرد را نمی‌شود بی‌کشیدگی صاف کرد" },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر قاره، یک حیوان", say: "کارت‌ها را برگردان و هر قاره را با حیوانی که فقط آنجا زندگی می‌کند پیدا کن.",
          pairs: [
            [{ label: "اقیانوسیه", say: "اقیانوسیه" }, { pic: "🦘", say: "کانگورو" }],
            [{ label: "جنوبگان", say: "جنوبگان" }, { pic: "🐧", say: "پنگوئن امپراتور" }],
            [{ label: "آفریقا", say: "آفریقا" }, { pic: "🦒", say: "زرافه" }],
            [{ label: "آمریکای جنوبی", say: "آمریکای جنوبی" }, { pic: "🦙", say: "لاما" }]
          ] }
      ]
    },

    /* Sources: the equator and the hemispheres (England KS2 geography, "identify the position and significance of
       latitude, longitude, Equator, Northern Hemisphere, Southern Hemisphere"; NCSS C3 D2.Geo.1.3–5; National
       Geographic Education, "Season"): when it is summer in the northern half, it is winter in the southern half, so
       Iran's summer is Australia's winter; near the equator it is warm all year. */
    {
      id: "world-sapling-36", subject: "world", level: "sapling", emoji: "🌐", title: "خط استوا و نیم‌کره‌ها",
      steps: [
        { type: "scene", prompt: "بالا و پایینِ خط استوا", bg: "#f6e3c6",
          parts: {
            map: { art: "w-map-world-big", at: [80, 46] }, north: { art: "w-half-north", at: [80, 45.5], o: 0 }, south: { art: "w-half-south", at: [80, 45.5], o: 0 },
            eq: { art: "w-equator-line", at: [80, 45.5], o: 0 }, eqT: { art: "خط استوا", at: [26, 42.6], s: 0.26, o: 0 },
            ir: { art: "w-dot", at: [94.4, 28.2], s: 0.9, o: 0 }, irT: { art: "ایران", at: [94.4, 22.6], s: 0.26, o: 0 },
            au: { art: "w-dot", at: [132.9, 59.5], s: 0.9, o: 0 }, auT: { art: "استرالیا", at: [132.9, 66.4], s: 0.26, o: 0 },
            kid1: { art: "w-kid-tshirt", at: [110, 40], s: 0.7, o: 0 }, sun1: { art: "☀️", at: [124, 12], s: 0.6, o: 0 },
            kid2: { art: "w-kid-coat", at: [148, 86], s: 0.7, o: 0 }, snow2: { art: "❄️", at: [116, 66], s: 0.6, o: 0 },
            band: { art: "w-half-north", at: [80, 52], sy: 0.2, o: 0 }
          },
          scenes: [
            { caption: "خط استوا یک خطِ خیالی است که دورِ وسطِ زمین کشیده‌اند. روی نقشه، این خطِ قرمز است.", key: 3400, hold: 6000, do: D(
              show(["eq"], 400, 400), [{ id: "eq", draw: true, at: 400, dur: 2000 }], show(["eqT"], 2400, 400)) },
            { caption: "بالای خط استوا نیم‌کرهٔ شمالی است. ایران در نیم‌کرهٔ شمالی است.", key: 3400, hold: 5800, do: D(
              show(["north"], 400, 700), show(["ir", "irT"], 1600, 400), [pulse("ir", 2200, 1.6, 700)]) },
            { caption: "پایینِ خط استوا نیم‌کرهٔ جنوبی است. استرالیا در نیم‌کرهٔ جنوبی است.", key: 3400, hold: 5800, do: D(
              hide(["north"], 0, 500), show(["south"], 400, 700), show(["au", "auT"], 1600, 400), [pulse("au", 2200, 1.6, 700)]) },
            { caption: "وقتی در ایران تابستان است، در استرالیا زمستان است! و وقتی ایران زمستان است، آنجا تابستان است.", key: 4000, hold: 7000, do: D(
              hide(["south"], 0, 500), show(["kid1", "sun1"], 600, 600), show(["kid2", "snow2"], 1800, 600)) },
            { caption: "نزدیکِ خط استوا هوا تقریباً همیشه گرم است؛ آنجا جنگل‌های بارانی و گرم هست.", key: 3400, hold: 6000, do: D(
              hide(["kid1", "sun1", "kid2", "snow2"], 0, 500), [{ id: "band", to: { o: 1, sy: 0.4 }, at: 600, dur: 900 }], [pulse("eq", 1800, 1.05, 700)]) }
          ] },
        { type: "map", map: "world", layers: ["continents", "oceans", "equator"], say: "روی نقشهٔ دنیا پیدا کن.",
          tasks: [
            { find: "equator", prompt: "خط استوا را پیدا کن." },
            { find: "europe", prompt: "اروپا در کدام نیم‌کره است؟ پیدایش کن: بالای خط استوا." },
            { find: "oceania", prompt: "استرالیا در اقیانوسیه است، پایینِ خط استوا. اقیانوسیه را پیدا کن." },
            { find: "antarctica", prompt: "دورترین قاره از ایران در نیم‌کرهٔ جنوبی، جنوبگان، کجاست؟" }
          ] },
        { type: "choose", prompt: "ایران بالای خط استواست یا پایینِ آن؟", say: "ایران بالای خط استواست یا پایینِ آن؟",
          options: ["بالای خط استوا، در نیم‌کرهٔ شمالی", "پایینِ خط استوا، در نیم‌کرهٔ جنوبی"], answer: "بالای خط استوا، در نیم‌کرهٔ شمالی" },
        { type: "choose", prompt: "در ایران تابستان است. در استرالیا چه فصلی است؟", say: "حالا در ایران تابستان است. در استرالیا چه فصلی است؟", pic: true,
          options: [{ label: "❄️", value: "زمستان" }, { label: "☀️", value: "تابستان" }, { label: "🌸", value: "بهار" }], answer: "زمستان" },
        { type: "sort", prompt: "شمال یا جنوب؟", say: "این کشور بالای خط استواست یا پایین؟ به سبدش ببر.",
          baskets: [{ pic: "⬆️", label: "نیم‌کرهٔ شمالی", value: "n" }, { pic: "⬇️", label: "نیم‌کرهٔ جنوبی", value: "s" }],
          items: [
            { label: "ایران", say: "ایران", basket: "n" }, { label: "ژاپن", say: "ژاپن", basket: "n" }, { label: "مصر", say: "مصر", basket: "n" },
            { label: "استرالیا", say: "استرالیا", basket: "s" }, { label: "آرژانتین", say: "آرژانتین", basket: "s" }, { label: "آفریقای جنوبی", say: "آفریقای جنوبی", basket: "s" }
          ] }
      ]
    },

    /* Sources: Iran's neighbours by land and sea, their capitals and main languages (CIA World Factbook; Ethnologue;
       the region map is js/maps/region.js, Natural Earth). Nowruz is also a holiday in Afghanistan, Tajikistan,
       Azerbaijan, Turkmenistan, Uzbekistan and Kurdistan of Iraq (UNESCO Intangible Heritage, "Nowruz", 2016,
       inscribed by twelve countries). Nothing political: countries and capitals only; no flags in this lesson. */
    {
      id: "world-sapling-8", subject: "world", level: "sapling", emoji: "🤝", title: "همسایه‌های ایران",
      steps: [
        { type: "map", map: "region", countries: "neighbours", layers: ["countries", "seas"], say: "این کشورها همسایه‌های ایران‌اند. همسایه‌های خشکی را پیدا کن.",
          tasks: [
            { find: "tr", prompt: "ترکیه، در شمال غربی ایران، کجاست؟" },
            { find: "iq", prompt: "عراق، در غرب ایران، کجاست؟" },
            { find: "af", prompt: "افغانستان، در شرق ایران، کجاست؟" },
            { find: "pk", prompt: "پاکستان، در جنوب شرقی ایران، کجاست؟" },
            { find: "tm", prompt: "ترکمنستان، در شمال شرقی ایران، کجاست؟" },
            { find: "am", prompt: "ارمنستان، همسایهٔ کوچکِ شمال غربی، کجاست؟" }
          ] },
        { type: "map", map: "region", countries: "neighbours", layers: ["countries", "seas"], say: "همسایه‌های آبی را پیدا کن: آن طرفِ دریا.",
          tasks: [
            { find: "sa", prompt: "عربستان سعودی، آن طرفِ خلیج فارس، کجاست؟" },
            { find: "ae", prompt: "امارات متحده عربی، آن طرفِ خلیج فارس، کجاست؟" },
            { find: "kz", prompt: "قزاقستان، آن طرفِ دریای خزر، کجاست؟" }
          ] },
        { type: "map", map: "region", countries: "neighbours", layers: ["countries", "seas", "capitals"], labels: true, say: "پایتخت‌ها را پیدا کن.",
          tasks: [
            { find: "capital-iq", prompt: "بغداد، پایتختِ عراق، کجاست؟" },
            { find: "capital-am", prompt: "ایروان، پایتختِ ارمنستان، کجاست؟" },
            { find: "capital-tm", prompt: "عشق‌آباد، پایتختِ ترکمنستان، کجاست؟" },
            { find: "capital-az", prompt: "باکو، پایتختِ جمهوری آذربایجان، کنار دریای خزر کجاست؟" }
          ] },
        { type: "pairs", prompt: "هر کشور، پایتختش", say: "هر کشور را با پایتختش جفت کن.",
          pairs: [
            [{ label: "عراق", say: "عراق" }, { label: "بغداد", say: "بغداد" }],
            [{ label: "ارمنستان", say: "ارمنستان" }, { label: "ایروان", say: "ایروان" }],
            [{ label: "ترکمنستان", say: "ترکمنستان" }, { label: "عشق‌آباد", say: "عشق‌آباد" }],
            [{ label: "پاکستان", say: "پاکستان" }, { label: "اسلام‌آباد", say: "اسلام‌آباد" }],
            [{ label: "جمهوری آذربایجان", say: "جمهوری آذربایجان" }, { label: "باکو", say: "باکو" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر کشور، زبانش", say: "کارت‌ها را برگردان و هر کشور را با زبانِ اصلی‌اش پیدا کن.",
          pairs: [
            [{ label: "ترکیه", say: "ترکیه" }, { label: "ترکی", say: "زبان ترکی" }],
            [{ label: "ارمنستان", say: "ارمنستان" }, { label: "ارمنی", say: "زبان ارمنی" }],
            [{ label: "پاکستان", say: "پاکستان" }, { label: "اردو", say: "زبان اردو" }],
            [{ label: "افغانستان", say: "افغانستان" }, { label: "فارسی دری و پشتو", say: "فارسی دری و پشتو" }]
          ] },
        { type: "choose", prompt: "کدام همسایه‌ها هم نوروز را جشن می‌گیرند؟", say: "کدام همسایه‌ها هم مثل ما نوروز را جشن می‌گیرند؟",
          options: ["افغانستان، تاجیکستان و جمهوری آذربایجان", "هیچ کشور دیگری", "فقط کشورهای خیلی دور"], answer: "افغانستان، تاجیکستان و جمهوری آذربایجان" }
      ]
    },

    /* Sources: comparing a place in Iran with a place abroad (England KS1 geography, "understand geographical
       similarities and differences through studying the human and physical geography of a small area of the United
       Kingdom, and of a small area in a contrasting non-European country"; NCSS C3 D2.Geo.6.3–5). Bandar Abbas (on the
       Persian Gulf) and Mombasa (Kenya, on the Indian Ocean): both hot, humid port cities with palms, ships and fishing;
       Mombasa is near the equator with rainy seasons and people speak Swahili («Jambo» is hello); Bandar Abbas has a
       very hot, dry summer. Rasht and a town in Japan are left for the talk. */
    {
      id: "world-sapling-37", subject: "world", level: "sapling", emoji: "🌴", title: "دو شهر، دو کشور",
      steps: [
        { type: "scene", prompt: "بندرعباس و مومباسا", bg: "#fffaf0",
          parts: {
            pR: { art: "w-coast-panel", at: [118, 46] }, pL: { art: "w-coast-panel", at: [42, 46] },
            tR: { art: "بندرعباس، ایران", at: [118, 16], s: 0.24 }, tL: { art: "مومباسا، کنیا", at: [42, 16], s: 0.24 },
            parisa: { art: "w-parisa", at: [126, 78], s: 0.9 }, amani: { art: "w-amani", at: [50, 78], s: 0.9 },
            shipR: { art: "w-ship", at: [100, 44], s: 0.8, o: 0 }, shipL: { art: "w-ship", at: [24, 44], s: 0.8, o: 0 },
            fishR: { art: "🐟", at: [110, 52], s: 0.4, o: 0 }, fishL: { art: "🐟", at: [34, 52], s: 0.4, o: 0 },
            bR: { art: "w-bubble", at: [112, 52], o: 0 }, bRT: { art: "سلام!", at: [112, 53], s: 0.16, o: 0 },
            bL: { art: "w-bubble", at: [36, 52], o: 0 }, bLT: { art: "Jambo!", at: [36, 53], s: 0.15, o: 0 },
            sunR: { art: "w-sun", at: [140, 24], s: 0.8, o: 0 }, rainL: { art: "🌧️", at: [64, 24], s: 0.7, o: 0 }
          },
          scenes: [
            { caption: "این پریسا است، در بندرعباس، کنار خلیج فارس. و این آمانی است، در مومباسا، در کشور کنیا، کنار اقیانوس هند.", key: 4400, hold: 7000, do: D(
              wave("parisa", 600, 1600), wave("amani", 2400, 1600, "armL")) },
            { caption: "هر دو شهر کنار دریا هستند و هوایشان گرم و شرجی است. در هر دو جا درخت نخل هست.", key: 3000, hold: 5800, do: [
              pulse("pR", 600, 1.04, 800), pulse("pL", 1600, 1.04, 800)] },
            { caption: "هر دو شهر بندرند. کشتی‌ها می‌آیند و می‌روند و خیلی‌ها ماهیگیرند.", key: 4000, hold: 6400, do: D(
              show(["shipR", "shipL"], 300, 600), [{ id: "shipR", to: { x: 92 }, at: 900, dur: 2800 }, { id: "shipL", to: { x: 16 }, at: 900, dur: 2800 }], show(["fishR", "fishL"], 2600, 400)) },
            { caption: "ولی فرق هم دارند. پریسا به فارسی سلام می‌کند: «سلام!» آمانی به سواحیلی: «جامبو!»", say: "ولی فرق هم دارند. پریسا به فارسی سلام می‌کند. آمانی به زبان سواحیلی سلام می‌کند.",
              key: 3600, hold: 6400, do: D(hide(["fishR", "fishL"], 0, 300), show(["bR", "bRT"], 600, 400), talk("parisa", 600, 1200), show(["bL", "bLT"], 2000, 400), talk("amani", 2000, 1200)) },
            { caption: "مومباسا نزدیکِ خط استواست و فصل‌های بارانی دارد. تابستانِ بندرعباس خیلی داغ و خشک است.", key: 3800, hold: 6400, do: D(
              hide(["bR", "bRT", "bL", "bLT"], 0, 400), show(["rainL"], 600, 500), [{ emit: "drop", where: [64, 32], spread: [8, 2], rise: -14, n: 14, at: 900, dur: 3000, life: 800 }],
              show(["sunR"], 1600, 500), [pulse("sunR", 2400, 1.3, 700)]) },
            { caption: "دو شهر، دو کشور: چیزهای زیادی شبیه هم و چیزهایی متفاوت. پریسا و آمانی برای هم دست تکان می‌دهند!", key: 3400, hold: 7000, do: D(
              wave("parisa", 600, 1600), wave("amani", 600, 1600, "armL")) }
          ] },
        { type: "map", map: "world", layers: ["countries", "oceans"], countries: ["iran", "ke"], labels: true, say: "دو کشور را روی نقشهٔ دنیا پیدا کن.",
          tasks: [
            { find: "iran", prompt: "ایران را پیدا کن. بندرعباس کنار خلیج فارس است." },
            { find: "ke", prompt: "کنیا را در آفریقا پیدا کن. مومباسا کنار اقیانوس هند است." },
            { find: "indian", prompt: "اقیانوس هند، که به هر دو کشور راه دارد، کجاست؟" }
          ] },
        { type: "sort", prompt: "شبیه یا متفاوت؟", say: "بندرعباس و مومباسا: در این شبیه هم‌اند یا متفاوت؟",
          baskets: [{ pic: "🤝", label: "شبیه", value: "same" }, { pic: "↔️", label: "متفاوت", value: "diff" }],
          items: [
            { pic: "🌊", label: "کنار دریا", say: "کنار دریا بودن", basket: "same" },
            { pic: "🌴", label: "درخت نخل", say: "درخت نخل", basket: "same" },
            { pic: "🚢", label: "بندر و کشتی", say: "بندر و کشتی", basket: "same" },
            { pic: "🗣️", label: "زبان", say: "زبانی که حرف می‌زنند", basket: "diff" },
            { pic: "🌧️", label: "فصل باران", say: "فصل‌های بارانی", basket: "diff" },
            { pic: "🗺️", label: "قاره", say: "قاره‌ای که در آن‌اند", basket: "diff" }
          ] },
        { type: "choose", prompt: "آمانی به سواحیلی سلام کرد. تو به او چه جواب می‌دهی؟", say: "آمانی به سواحیلی سلام کرد. تو به فارسی چه جواب می‌دهی؟",
          options: ["سلام!", "خداحافظ!", "شب بخیر!"], answer: "سلام!" },
        { type: "talk", scene: "🏙️ ↔️ 🏯", caption: "شهر یا روستای خودت را با یک شهر دور مقایسه کن، مثلاً رشت و یک شهر کوچک در ژاپن. هوا، خانه‌ها و کار مردم چه فرقی دارند؟ چه چیزی شبیه است؟" }
      ]
    },

    /* Sources: a unit game that brings back world.sap.7 (continents, oceans, the equator: world-sapling-7 and 36) and
       world.sap.8 (neighbours and capitals: world-sapling-8). Flags come from js/maps/flags.js; Iran's flag is the one the
       parent chose in «بخش والدین» (B.flagSvg "iran"). The flags of Oman and Afghanistan are left out for now. */
    {
      id: "world-sapling-38", subject: "world", level: "sapling", emoji: "🌐", title: "بازی دنیا",
      steps: [
        { type: "map", map: "world", layers: ["continents", "oceans", "equator"], say: "روی نقشهٔ دنیا پیدا کن.",
          tasks: [
            { find: "europe", prompt: "اروپا را پیدا کن." },
            { find: "equator", prompt: "خط استوا را پیدا کن." },
            { find: "pacific", prompt: "بزرگ‌ترین اقیانوس کجاست؟" },
            { find: "north-america", prompt: "آمریکای شمالی را پیدا کن." }
          ] },
        { type: "map", map: "region", countries: "neighbours", layers: ["countries", "seas"], say: "همسایه‌های ایران را پیدا کن.",
          tasks: [
            { find: "iq", prompt: "عراق کجاست؟" },
            { find: "tm", prompt: "ترکمنستان کجاست؟" },
            { find: "pk", prompt: "پاکستان کجاست؟" }
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر پرچم، کدام کشور؟", say: "کارت‌ها را برگردان و هر پرچم را با کشورش پیدا کن.",
          pairs: [
            [{ flag: "iran", say: "پرچم ایران" }, { label: "ایران", say: "ایران" }],
            [{ flag: "tr", say: "پرچم ترکیه" }, { label: "ترکیه", say: "ترکیه" }],
            [{ flag: "am", say: "پرچم ارمنستان" }, { label: "ارمنستان", say: "ارمنستان" }],
            [{ flag: "pk", say: "پرچم پاکستان" }, { label: "پاکستان", say: "پاکستان" }]
          ] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر کشور، پایتختش", say: "کارت‌ها را برگردان و هر کشور را با پایتختش پیدا کن.",
          pairs: [
            [{ label: "ایران", say: "ایران" }, { label: "تهران", say: "تهران" }],
            [{ label: "عراق", say: "عراق" }, { label: "بغداد", say: "بغداد" }],
            [{ label: "جمهوری آذربایجان", say: "جمهوری آذربایجان" }, { label: "باکو", say: "باکو" }],
            [{ label: "ترکمنستان", say: "ترکمنستان" }, { label: "عشق‌آباد", say: "عشق‌آباد" }]
          ] },
        { type: "sort", prompt: "کدام قاره؟", say: "هر کشور را به قاره‌اش ببر.",
          baskets: [{ label: "آسیا", value: "asia" }, { label: "آفریقا", value: "africa" }, { label: "اروپا", value: "europe" }],
          items: [
            { flag: "jp", label: "ژاپن", say: "ژاپن", basket: "asia" }, { flag: "cn", label: "چین", say: "چین", basket: "asia" },
            { flag: "ke", label: "کنیا", say: "کنیا", basket: "africa" }, { flag: "eg", label: "مصر", say: "مصر", basket: "africa" },
            { flag: "fr", label: "فرانسه", say: "فرانسه", basket: "europe" }, { flag: "it", label: "ایتالیا", say: "ایتالیا", basket: "europe" }
          ] },
        { type: "choose", prompt: "در ایران زمستان است. در استرالیا چه فصلی است؟", say: "در ایران زمستان است. در استرالیا، آن طرفِ خط استوا، چه فصلی است؟", pic: true,
          options: [{ label: "☀️", value: "تابستان" }, { label: "❄️", value: "زمستان" }, { label: "🍂", value: "پاییز" }], answer: "تابستان" }
      ]
    },

    /* Sources: what World Heritage is (UNESCO World Heritage Convention, 1972, and its list; Iran has more than twenty
       World Heritage sites, among them "The Persian Garden", 2011, which includes Eram Garden in Shiraz, and the Lut
       Desert, 2016, a natural site; NCSS C3 D2.Civ.10.3–5 and D2.Geo.10.3–5). Visiting kindly: stay on the paths, don't
       write on walls or take stones, take rubbish home. The UNESCO emblem is not drawn. */
    {
      id: "world-sapling-39", subject: "world", level: "sapling", emoji: "🏛️", title: "میراث جهانی چیست؟",
      steps: [
        { type: "scene", prompt: "جاهایی که مال همهٔ دنیاست", bg: "#cdeaf7",
          parts: {
            stars: { art: "w-stars", o: 0 }, globe: { art: "w-globe", at: [80, 44], s: 1.6 }, heart: { art: "w-heart", at: [80, 44], s: 0.3, o: 0 },
            garden: { art: "w-persian-garden", o: 0 }, lut: { art: "w-lut", o: 0 },
            kid: { art: "w-hasti", at: [40, 86], s: 1.15, o: 0 }, flower: { art: "🌸", at: [52, 72], s: 0.5, o: 0 }, bin: { art: "w-rubbish-bin", at: [128, 86], s: 1.3, o: 0 },
            wrap: { art: "🍬", at: [46, 66], s: 0.4, o: 0 }, path: { art: "w-sign", at: [124, 50], s: 1.6, o: 0 }, pathT: { art: "از مسیر بروید", at: [124, 51.4], s: 0.21, o: 0 }
          },
          scenes: [
            { caption: "بعضی جاها آن‌قدر ارزشمند و زیبایند که مالِ همهٔ مردم دنیا به حساب می‌آیند. به آن‌ها «میراث جهانی» می‌گوییم.", key: 4000, hold: 6600, do: [
              { id: "globe.land", to: { x: -110 }, dur: 6000, ease: "linear" }, { id: "heart", to: { o: 1, s: 1.6 }, at: 1600, dur: 1000, ease: "back" }, pulse("heart", 2800, 1.15, 700)] },
            { caption: "کشورهای دنیا با هم فهرستی از این جاها دارند. ایران بیش از بیست جای میراث جهانی دارد. یکی از آن‌ها باغ ارم در شیراز است که مردم ساخته‌اند.", key: 3600, hold: 6400, do: D(
              hide(["globe", "heart"], 0, 600), show(["garden"], 400, 900)) },
            { caption: "بعضی‌ها طبیعی‌اند، مثل کویر لوت، با تپه‌های عجیبی که باد تراشیده.", key: 4000, hold: 6600, do: D(
              show(["lut"], 1800, 1000)) },
            { caption: "ما از این جاها مراقبت می‌کنیم تا بچه‌های صد سال بعد هم آن‌ها را ببینند. هستی گل‌ها را نمی‌چیند و فقط نگاهشان می‌کند.", key: 4400, hold: 6800, do: D(
              hide(["lut"], 0, 800), show(["kid", "flower"], 600, 600), [{ id: "kid.head", to: { r: 10 }, at: 1800, dur: 600 }, pulse("flower", 2600, 1.3, 700)]) },
            { caption: "هستی پوست شکلاتش را در سطل می‌اندازد و از مسیرِ باغ بیرون نمی‌رود.", key: 4800, hold: 7000, do: D(
              show(["wrap", "bin", "path", "pathT"], 300, 500), walk("kid", { x: 114 }, 900, 2600), [{ id: "wrap", to: { x: 128, y: 72 }, at: 900, dur: 2600 }, { id: "wrap", to: { o: 0, y: 78 }, at: 3700, dur: 500 }]) }
          ] },
        { type: "sort", prompt: "مراقبت یا آسیب؟", say: "در یک جای میراث جهانی، این کار مراقبت است یا آسیب؟",
          baskets: [{ pic: "💚", label: "مراقبت", value: "care" }, { pic: "💔", label: "آسیب", value: "harm" }],
          items: [
            { pic: "👣", label: "رفتن از مسیر", say: "از مسیر می‌رویم", basket: "care" },
            { pic: "🗑️", label: "بردن زباله", say: "زباله را با خودمان می‌بریم یا در سطل می‌اندازیم", basket: "care" },
            { pic: "📷", label: "عکس گرفتن", say: "عکس می‌گیریم و فقط نگاه می‌کنیم", basket: "care" },
            { pic: "✏️", label: "نوشتن روی دیوار", say: "روی دیوار قدیمی یادگاری می‌نویسیم", basket: "harm" },
            { pic: "🪨", label: "برداشتن سنگ", say: "یک سنگ یا کاشی برمی‌داریم", basket: "harm" },
            { pic: "🌸", label: "چیدن گل", say: "گل‌های باغ را می‌چینیم", basket: "harm" }
          ] },
        { type: "sort", prompt: "ساختهٔ مردم یا طبیعی؟", say: "هر جای میراث جهانی ایران را به سبدش ببر: ساختهٔ مردم، یا طبیعی.",
          baskets: [{ pic: "🏡", label: "ساختهٔ مردم", value: "built" }, { pic: "🏞️", label: "طبیعی", value: "nature" }],
          items: [
            { label: "باغ ارم", say: "باغ ارم در شیراز", basket: "built" },
            { label: "بازار تبریز", say: "بازار تبریز", basket: "built" },
            { label: "قنات‌های ایران", say: "قنات‌های ایران", basket: "built" },
            { label: "کویر لوت", say: "کویر لوت", basket: "nature" },
            { label: "جنگل‌های هیرکانی", say: "جنگل‌های هیرکانی، کنار دریای خزر", basket: "nature" }
          ] },
        { type: "choose", prompt: "چرا از میراث جهانی مراقبت می‌کنیم؟", say: "چرا از جاهای میراث جهانی مراقبت می‌کنیم؟",
          options: ["تا مردم آینده هم بتوانند آن‌ها را ببینند", "چون کسی آنجا را دوست ندارد", "تا هیچ‌کس به دیدنشان نرود"], answer: "تا مردم آینده هم بتوانند آن‌ها را ببینند" },
        { type: "choose", prompt: "کدام طبیعی است؟", say: "کدام جای میراث جهانی طبیعی است، نه ساختهٔ مردم؟", pic: true,
          options: [{ label: "🏜️", value: "کویر لوت" }, { label: "🏡", value: "باغ ارم" }, { label: "🏪", value: "بازار تبریز" }], answer: "کویر لوت" }
      ]
    },

    /* Sources: a virtual trip to some of Iran's World Heritage sites (UNESCO World Heritage List: "Tabriz Historic
       Bazaar Complex", 2010; "Hyrcanian Forests", 2019; "Shushtar Historical Hydraulic System", 2009; "The Persian
       Garden", 2011, with Eram Garden in Shiraz; "Historic City of Yazd", 2017; "Lut Desert", 2016). A unit game for
       world.sap.13 with world.sap.1 and 3 (landforms and provinces). Map points: js/maps/iran.js cities (Shushtar a little
       north of Ahvaz; the Lut east of Kerman), on "w-map-big" at 0.85: (52 + 0.204 (x − 200), 46 + 0.204 (y − 168)). */
    {
      id: "world-sapling-9", subject: "world", level: "sapling", emoji: "🧳", title: "ایران‌گردی",
      steps: [
        (function () {
          var P = [{ id: "tab", at: [27.9, 23.6], pic: "w-bazaar" }, { id: "hyr", at: [37.9, 27], pic: "w-forest" }, { id: "shu", at: [35.1, 46.8], pic: "w-shushtar" },
            { id: "shi", at: [46.5, 56.2], pic: "w-persian-garden" }, { id: "yaz", at: [52.4, 47.6], pic: "w-yazd-city" }, { id: "lut", at: [66.3, 52.5], pic: "w-lut" }];
          var parts = { map: { art: "w-map-big", at: [52, 46], s: 0.85 }, frame: { art: "w-postcard", at: [98, 44] } };
          P.forEach(function (p) {
            parts["d" + p.id] = { art: "w-dot", at: p.at, s: 0.7, o: 0 };
            parts["c" + p.id] = { art: p.pic, at: [98, 44], s: 0.36, o: 0 };
          });
          parts.van = { art: "🚐", at: [27.9, 20], s: 0.4, o: 0 };
          function stop(i, prev, caption, key) {
            var p = P[i];
            return { caption: caption, key: key || 4400, hold: 7000, do: D(
              prev != null ? hide(["c" + P[prev].id], 0, 500) : [],
              i ? [{ id: "van", to: { x: p.at[0], y: p.at[1] - 3.6 }, at: 300, dur: 1800 }] : [{ id: "van", to: { o: 1 }, dur: 300 }],
              show(["d" + p.id], 2000, 300), [pulse("d" + p.id, 2300, 1.8, 700)], show(["c" + p.id], 2600, 800)) };
          }
          return { type: "scene", prompt: "سفر به میراث جهانی ایران", bg: "#fffaf0", parts: parts,
            scenes: [
              stop(0, null, "سفرمان از تبریز شروع می‌شود: بازارِ سرپوشیدهٔ تبریز، یکی از بزرگ‌ترین بازارهای دنیا."),
              stop(1, 0, "بعد به گیلان می‌رویم: جنگل‌های هیرکانی، جنگل‌هایی خیلی قدیمی کنار دریای خزر."),
              stop(2, 1, "در شوشتر، آبشارها و آسیاب‌هایی هست که مردم خیلی وقت پیش برای آب ساختند."),
              stop(3, 2, "در شیراز، باغ ارم: درخت‌های سرو، گل‌ها و حوضی بلند."),
              stop(4, 3, "در یزد، شهرِ قدیمیِ خشتی با بادگیرهای بلندش."),
              stop(5, 4, "و آخر، کویر لوت، یکی از داغ‌ترین جاهای زمین."),
              { caption: "این‌ها همه میراث جهانی‌اند: هم مالِ ما، هم مالِ همهٔ مردم دنیا.", key: 3000, hold: 6400, do: D(
                hide(["clut"], 0, 500), P.map(function (p, i) { return pulse("d" + p.id, 600 + i * 300, 1.8, 600); })) }
            ] };
        })(),
        { type: "map", map: "iran", layers: ["seas"], cities: ["tabriz", "rasht", "ahvaz", "shiraz", "yazd", "kerman"], labels: true, say: "شهرهای سفرت را پیدا کن.",
          tasks: [{ route: ["tabriz", "rasht", "ahvaz", "shiraz", "yazd", "kerman"], walker: "🚐",
            prompt: "دوباره سفر کن: تبریز، رشت، اهواز (نزدیکِ شوشتر)، شیراز، یزد و کرمان (نزدیکِ لوت).",
            say: "دوباره سفر کن! از تبریز شروع کن، بعد رشت، بعد اهواز که نزدیکِ شوشتر است، بعد شیراز، بعد یزد، و آخر کرمان که نزدیکِ کویر لوت است." }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان: هر جا، کدام شهر؟", say: "کارت‌ها را برگردان و هر جای میراث جهانی را با شهر یا استانش پیدا کن.",
          pairs: [
            [{ label: "بازار سرپوشیده", say: "بازار سرپوشیده" }, { label: "تبریز", say: "تبریز" }],
            [{ label: "باغ ارم", say: "باغ ارم" }, { label: "شیراز", say: "شیراز" }],
            [{ label: "شهر خشتی و بادگیرها", say: "شهر خشتی با بادگیرها" }, { label: "یزد", say: "یزد" }],
            [{ label: "جنگل‌های هیرکانی", say: "جنگل‌های هیرکانی" }, { label: "گیلان و مازندران", say: "گیلان و مازندران" }]
          ] },
        { type: "order", prompt: "سفرمان به ترتیب", say: "سفرمان به کدام جاها رفت؟ به ترتیب بچین.", numbered: true,
          items: [{ pic: "🏪", label: "بازار تبریز", say: "بازار تبریز" }, { pic: "🌳", label: "جنگل‌های هیرکانی", say: "جنگل‌های هیرکانی" },
            { pic: "🏡", label: "باغ ارم", say: "باغ ارم" }, { pic: "🏜️", label: "کویر لوت", say: "کویر لوت" }] },
        { type: "sort", prompt: "ساختهٔ مردم یا طبیعی؟", say: "هر جای سفرمان را به سبدش ببر: ساختهٔ مردم، یا طبیعی.",
          baskets: [{ pic: "🏡", label: "ساختهٔ مردم", value: "built" }, { pic: "🏞️", label: "طبیعی", value: "nature" }],
          items: [
            { label: "بازار تبریز", say: "بازار تبریز", basket: "built" }, { label: "آبشارهای شوشتر", say: "آبشارها و آسیاب‌های شوشتر", basket: "built" },
            { label: "شهر یزد", say: "شهر قدیمی یزد", basket: "built" }, { label: "کویر لوت", say: "کویر لوت", basket: "nature" },
            { label: "جنگل‌های هیرکانی", say: "جنگل‌های هیرکانی", basket: "nature" }
          ] },
        { type: "talk", scene: "🧳 🗺️ 📷", caption: "اگر می‌توانستی به یکی از این جاها سفر کنی، کدام را انتخاب می‌کردی؟ آنجا چه کار می‌کردی؟" }
      ]
    }
  );
})();
