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

    // ---------------- Iran and the world: Sprout (city and village, maps, directions, Iran, festivals, languages) ----------------

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
    }
  );
})();
