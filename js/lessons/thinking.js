/* باغچه — فکر و برنامه‌نویسی (thinking and coding): patterns, sorting and classifying, steps in order, simple
   logic, turning left and right, and block coding on a grid (step type `code`, js/steps/coding.js).
   Modelled on ScratchJr, Code.org's early courses and "unplugged" computer science activities.
   Every lesson ends with an `unplugged` step: a game for home, without a screen, written for the parent.
   Lessons are plain data; step types are listed in README.md. Content: CC BY-SA 4.0. Follow STYLE.md. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "think", name: "فکر و برنامه‌نویسی", emoji: "🧩", leveled: true });

/* Moves for the Seed animations (step type `scene`), as plain tracks so this file needs no drawing to load. People
   seen from the front ("en-…" in js/art/rig-english.js) turn each arm at the shoulder and the elbow: side "R" is the
   arm on the right of the picture, and a pose is a name in POSE or [shoulder, elbow] turns for the right arm (the
   left arm turns the other way). */
var TK = (function () {
  var POSE = { down: [0, 0], chest: [13, 106], clapOpen: [-11, 50], point: [-84, -4], give: [-62, -4] };
  function pose(id, side, name, at, dur) {
    var p = POSE[name] || name, k = side === "L" ? -1 : 1;
    return [{ id: id + ".arm" + side, to: { r: k * p[0] }, at: at, dur: dur }, { id: id + ".fore" + side, to: { r: k * p[1] }, at: at, dur: dur }];
  }
  function both(id, name, at, dur) { return pose(id, "R", name, at, dur).concat(pose(id, "L", name, at, dur)); }
  return {
    pose: pose, both: both,
    // One clap: the hands open, meet in front of the chest (a little spark at where), open again and go down.
    clap: function (id, at, where) {
      return both(id, "clapOpen", at, 400).concat([
        { id: id + ".foreR", to: { r: 110 }, at: at + 450, dur: 800, yoyo: true, times: 2 },
        { id: id + ".foreL", to: { r: -110 }, at: at + 450, dur: 800, yoyo: true, times: 2 },
        { emit: "spark", where: where, spread: [8, 4], n: 5, at: at + 800, dur: 300, life: 700 }
      ], both(id, "down", at + 1350, 400));
    },
    // One stamp: the foot goes up and comes down hard, and the lines of a thud (a part) show at the floor.
    stamp: function (id, side, at, thud) {
      return [{ id: id + ".leg" + side, to: { sy: 0.55 }, at: at, dur: 450 }, { id: id + ".leg" + side, to: { sy: 1 }, at: at + 500, dur: 180, ease: "in" },
        { id: thud, to: { o: 1 }, at: at + 650, dur: 80 }, { id: thud, to: { o: 0 }, at: at + 1150, dur: 400 }];
    },
    // The mouth opens and closes while the person speaks.
    talk: function (id, at, dur) {
      return [{ id: id + ".mouth", to: { o: 1 }, at: at, dur: 60 }, { id: id + ".mouth", to: { sy: 0.3 }, at: at + 60, dur: dur - 120, yoyo: true, times: 2 * Math.max(1, Math.round(dur / 500)) },
        { id: id + ".mouth", to: { o: 0 }, at: at + dur - 60, dur: 60 }];
    },
    // Smiling or frowning.
    face: function (id, happy, at) {
      return [{ id: id + ".smile", to: { o: happy ? 1 : 0 }, at: at, dur: 300 }, { id: id + ".frown", to: { o: happy ? 0 : 1 }, at: at, dur: 300 }];
    }
  };
})();

B.LESSONS.push(
  // ---------------- Thinking: Seed (patterns, sorting, steps in order, first program) ----------------
  {
    id: "think-seed-1", subject: "think", level: "seed", emoji: "🔴", title: "الگوها",
    steps: [
      { type: "pattern", prompt: "بعدی کدام است؟", say: "بعدی کدام است؟",
        seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], blanks: [5], options: ["🔵", "🔴", "🟡"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "بعدی کدام است؟",
        seq: ["🐱", "🐶", "🐱", "🐶", "🐱", "🐶"], blanks: [4, 5], options: ["🐱", "🐶", "🐰"] },
      { type: "pattern", prompt: "جای خالی را پر کن", say: "جای خالی را پر کن",
        seq: ["☀️", "🌙", "☀️", "🌙", "☀️", "🌙"], blanks: [2], options: ["🌙", "☀️", "⭐"] },
      { type: "pattern", prompt: "خوب نگاه کن: یکی، دو تا. بعدی کدام است؟", say: "خوب نگاه کن. بعدی کدام است؟",
        seq: ["🍎", "🍌", "🍌", "🍎", "🍌", "🍌"], blanks: [5], options: ["🍎", "🍌", "🍇"] },
      { type: "pattern", prompt: "دو تا جای خالی هست. پرشان کن", say: "دو تا جای خالی هست. پرشان کن",
        seq: ["🟢", "🟢", "🟡", "🟢", "🟢", "🟡"], blanks: [3, 5], options: ["🟢", "🟡", "🔴"] },
      { type: "unplugged", text: "با دست و پا یک الگو بسازید: دست بزنید، پا بکوبید، دست بزنید، پا بکوبید… و بگذارید کودک ادامه‌اش را بزند. بعد جایتان را عوض کنید: او الگو بسازد و شما ادامه دهید. گاهی عمداً اشتباه کنید تا خودش اشتباه را پیدا کند." }
    ]
  },
  {
    id: "think-seed-5", subject: "think", level: "seed", emoji: "👏", title: "الگوی صدا و حرکت",
    steps: [
      /* Clap, stamp, clap, stamp: each move puts its card in the row above, so the pattern is seen as well as heard.
         The first card is on the right (read right to left); js/en/thinking.js moves the cards for English.
         Drawings: js/art/rig-think.js, the boy from js/art/rig-english.js. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } },
          c1: { art: "tk-card", at: [133, 31], o: 0 }, c2: { art: "tk-card", at: [107, 31], o: 0 }, c3: { art: "tk-card", at: [81, 31], o: 0 },
          c4: { art: "tk-card", at: [55, 31], o: 0 }, c5: { art: "tk-card", at: [29, 31], o: 0 },
          p1: { art: "👏", at: [133, 29], s: 0.8, o: 0 }, p2: { art: "🦶", at: [107, 29], s: 0.8, o: 0 }, p3: { art: "👏", at: [81, 29], s: 0.8, o: 0 },
          p4: { art: "🦶", at: [55, 29], s: 0.8, o: 0 }, p5: { art: "👏", at: [29, 29], s: 0.8, o: 0 }, q: { art: "tk-qmark", at: [29, 29], o: 0 },
          b1: { art: "tk-bracket", at: [120, 35], o: 0 }, b2: { art: "tk-bracket", at: [68, 35], o: 0 },
          kid: { art: "en-reza", at: [80, 88], s: 1.2 }, thud: { art: "tk-thud", at: [84, 88], o: 0 }
        },
        scenes: [
          { caption: "آرش دست می‌زند: دست!", key: 950, do: TK.clap("kid", 0, [80, 69]).concat([
            { id: "c1", to: { o: 1 }, at: 350, dur: 300 }, { id: "p1", to: { o: 1 }, at: 350, dur: 300 }]) },
          { caption: "بعد پا می‌کوبد: پا!", key: 900, do: TK.stamp("kid", "R", 0, "thud").concat([
            { id: "c2", to: { o: 1 }, at: 400, dur: 300 }, { id: "p2", to: { o: 1 }, at: 400, dur: 300 }]) },
          { caption: "باز هم: دست… پا!", key: 3100, do: TK.clap("kid", 0, [80, 69]).concat(TK.stamp("kid", "R", 2200, "thud"), [
            { id: "c3", to: { o: 1 }, at: 350, dur: 300 }, { id: "p3", to: { o: 1 }, at: 350, dur: 300 },
            { id: "c4", to: { o: 1 }, at: 2600, dur: 300 }, { id: "p4", to: { o: 1 }, at: 2600, dur: 300 }]) },
          { caption: "دست، پا، دست، پا. «دست، پا» هر بار تکرار می‌شود. این یک الگوست.", do: [
            { id: "b1", to: { o: 1 }, at: 300, dur: 500 }, { id: "p1", to: { y: "-3" }, at: 300, dur: 500, yoyo: true, times: 2 }, { id: "p2", to: { y: "-3" }, at: 300, dur: 500, yoyo: true, times: 2 },
            { id: "b2", to: { o: 1 }, at: 1600, dur: 500 }, { id: "p3", to: { y: "-3" }, at: 1600, dur: 500, yoyo: true, times: 2 }, { id: "p4", to: { y: "-3" }, at: 1600, dur: 500, yoyo: true, times: 2 }] },
          { caption: "بعدش چه می‌آید؟", do: [
            { id: "c5", to: { o: 1 }, dur: 400 }, { id: "q", to: { o: 1 }, at: 300, dur: 400 },
            { id: "kid.head", to: { r: 10 }, at: 800, dur: 600 }, { id: "q", to: { s: 1.15 }, at: 1400, dur: 500, yoyo: true, times: 2 }] },
          { caption: "دست! آرش باز دست می‌زند.", key: 1950, do: [
            { id: "kid.head", to: { r: 0 }, dur: 400 }, { id: "q", to: { o: 0 }, at: 200, dur: 300 }, { id: "p5", to: { o: 1 }, at: 400, dur: 400 }].concat(TK.clap("kid", 1000, [80, 69])) }
        ] },
      { type: "pattern", prompt: "دست، پا، دست، پا… بعدی کدام است؟", say: "دست، پا، دست، پا. بعدی کدام است؟",
        seq: ["👏", "🦶", "👏", "🦶", "👏", "🦶"], blanks: [5], options: ["👏", "🦶", "🔔"] },
      { type: "pattern", prompt: "این حاشیه یک فرش است. جاهای خالی را پر کن", say: "این حاشیه یک فرش است. جاهای خالی را پر کن",
        seq: ["🟥", "🟨", "🟨", "🟥", "🟨", "🟨", "🟥", "🟨", "🟨"], blanks: [3, 7], options: ["🟥", "🟨", "🟦"] },
      { type: "pattern", prompt: "مهره‌های گردنبند: بعدی‌ها کدام‌اند؟", say: "مهره‌های گردنبند. بعدی‌ها کدام‌اند؟",
        seq: ["🔴", "🔴", "🔵", "🔴", "🔴", "🔵", "🔴", "🔴", "🔵"], blanks: [7, 8], options: ["🔴", "🔵", "🟢"] },
      { type: "pattern", prompt: "زنگ، آواز، دست. بعدی کدام است؟", say: "زنگ، آواز، دست. زنگ، آواز، دست. بعدی کدام است؟",
        seq: ["🔔", "🎵", "👏", "🔔", "🎵", "👏", "🔔"], blanks: [6], options: ["👏", "🔔", "🎵"] },
      { type: "pattern", prompt: "دست، دست، بپر! جاهای خالی را پر کن", say: "دست، دست، بپر. جاهای خالی را پر کن",
        seq: ["👏", "👏", "🦘", "👏", "👏", "🦘", "👏", "👏", "🦘"], blanks: [5, 7], options: ["👏", "🦘", "🦶"] },
      { type: "unplugged", text: "نوبتی الگو بسازید. اول شما: «دست، پا، دست، پا…» و کودک ادامه دهد. بعد نوبت کودک است که یک الگو بسازد، با صدا (دست زدن، پا کوبیدن، زدن روی میز)، با حرکت (بپر، بنشین) یا با چیزهای خانه (قاشق، چنگال، قاشق، چنگال)، و شما ادامه دهید. گاهی عمداً اشتباه کنید و بپرسید: «درست بود؟ کجایش اشتباه شد؟» از او بخواهید تکه‌ای را که تکرار می‌شود بگوید." }
    ]
  },
  {
    id: "think-seed-2", subject: "think", level: "seed", emoji: "🧺", title: "دسته‌بندی",
    steps: [
      { type: "sort", prompt: "هر کدام را در سبد هم‌رنگش بگذار",
        baskets: [{ pic: "🔴", value: "red" }, { pic: "🟡", value: "yellow" }],
        items: [{ pic: "🍎", basket: "red" }, { pic: "🍌", basket: "yellow" }, { pic: "🍓", basket: "red" },
          { pic: "🌽", basket: "yellow" }, { pic: "🍒", basket: "red" }, { pic: "🍋", basket: "yellow" }] },
      { type: "pairs", prompt: "جفت هر کدام را پیدا کن", say: "جفت هر کدام را پیدا کن",
        pairs: [["🧦", "🧦"], ["🧤", "🧤"], ["👟", "👟"], ["🧢", "🧢"]] },
      { type: "sort", prompt: "حیوان‌ها در یک سبد، میوه‌ها در سبد دیگر",
        baskets: [{ pic: "🐾", label: "حیوان", value: "animal" }, { pic: "🧺", label: "میوه", value: "fruit" }],
        items: [{ pic: "🐱", basket: "animal" }, { pic: "🍐", basket: "fruit" }, { pic: "🐄", basket: "animal" },
          { pic: "🍇", basket: "fruit" }, { pic: "🐔", basket: "animal" }, { pic: "🍉", basket: "fruit" }] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "از کم به زیاد بچین", ltr: true,
        items: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }] },
      { type: "unplugged", text: "موقع جمع کردن لباس‌های شسته، از کودک بخواهید جوراب‌ها را جفت کند. بعد بپرسید: «این لباس‌ها را چطور دسته کنیم؟» شاید بگوید بر اساس رنگ، اندازه یا اینکه مال چه کسی است. هر راهی که خودش پیشنهاد بدهد خوب است، به شرطی که بتواند بگوید چرا." }
    ]
  },
  {
    id: "think-seed-6", subject: "think", level: "seed", emoji: "👀", title: "مثل هم، فرق دارد",
    steps: [
      { type: "choose", prompt: "کدام با بقیه فرق دارد؟", say: "کدام با بقیه فرق دارد؟", pic: true,
        options: ["🍎", "🍎", "🍏", "🍎"], answer: "🍏" },
      { type: "choose", prompt: "کدام با بقیه فرق دارد؟", say: "کدام با بقیه فرق دارد؟", pic: true,
        options: ["🐔", "🐔", "🐔", "🐥"], answer: "🐥" },
      { type: "choose", prompt: "کدام درست مثل این است؟", say: "خوب نگاه کن. کدام درست مثل این است؟",
        show: "🐶🌳", pic: true, options: ["🐶🌲", "🐱🌳", "🐶🌳"], answer: "🐶🌳" },
      { type: "choose", prompt: "یک چیز عوض شده. کدام درست مثل این است؟", say: "یک چیز عوض شده. کدام درست مثل این است؟",
        show: "🍎🍌🍇", pic: true, options: ["🍎🍐🍇", "🍎🍌🍇", "🍓🍌🍇"], answer: "🍎🍌🍇" },
      // Shadows are drawn in js/art/rig-think.js ("🐘‍⬛" is the elephant's shadow).
      { type: "pairs", prompt: "هر حیوان را به سایه‌اش برسان", say: "هر حیوان را به سایه‌اش برسان",
        pairs: [["🐘", "🐘‍⬛"], ["🦒", "🦒‍⬛"], ["🐢", "🐢‍⬛"], ["🐔", "🐔‍⬛"]] },
      { type: "choose", prompt: "سیب و توت‌فرنگی: چه چیزشان مثل هم است؟", say: "سیب و توت‌فرنگی. چه چیزشان مثل هم است؟",
        show: "🍎🍓", pic: true, options: ["🟢", "🔴", "🔵"], answer: "🔴" },
      { type: "choose", prompt: "توپ و پرتقال: شکلشان چطور است؟", say: "توپ و پرتقال. شکلشان چطور است؟",
        show: "⚽🍊", pic: true, options: ["⬜", "🔺", "⚪"], answer: "⚪" },
      { type: "unplugged", text: "بازی «چه فرقی کرد؟»: سه یا چهار چیز را روی میز بچینید، مثلاً یک قاشق، یک سیب و یک مداد. کودک خوب نگاه کند و چشم‌هایش را ببندد. یکی را عوض کنید یا جایش را تغییر دهید. بپرسید: «چه فرقی کرد؟» بعد جایتان را عوض کنید. سر سفره هم بپرسید: «این دو تا چه چیزشان مثل هم است و چه چیزشان فرق دارد؟» (مثلاً لیوان و فنجان)." }
    ]
  },
  {
    id: "think-seed-7", subject: "think", level: "seed", emoji: "🟢", title: "بازی دسته‌بندی",
    steps: [
      { type: "sort", prompt: "هر کدام را در سبد هم‌رنگش بگذار",
        baskets: [{ pic: "🔴", value: "red" }, { pic: "🟡", value: "yellow" }, { pic: "🟢", value: "green" }],
        items: [{ pic: "🍓", basket: "red" }, { pic: "🍋", basket: "yellow" }, { pic: "🥒", basket: "green" },
          { pic: "🍎", basket: "red" }, { pic: "🌽", basket: "yellow" }, { pic: "🍏", basket: "green" }] },
      { type: "sort", prompt: "این بار رنگ مهم نیست: گردها در یک سبد، چهارگوش‌ها در سبد دیگر",
        baskets: [{ pic: "⚪", label: "گرد", value: "round" }, { pic: "⬜", label: "چهارگوش", value: "square" }],
        items: [{ pic: "🔴", basket: "round" }, { pic: "🟦", basket: "square" }, { pic: "🟢", basket: "round" },
          { pic: "🟥", basket: "square" }, { pic: "🔵", basket: "round" }, { pic: "🟨", basket: "square" }] },
      { type: "sort", prompt: "حالا اندازه: بزرگ‌ها در یک سبد، کوچک‌ها در سبد دیگر",
        baskets: [{ pic: "🐘", label: "بزرگ", value: "big" }, { pic: "🐜", label: "کوچک", value: "small" }],
        items: [{ pic: "🐄", basket: "big" }, { pic: "🐞", basket: "small" }, { pic: "🦒", basket: "big" },
          { pic: "🐭", basket: "small" }, { pic: "🐫", basket: "big" }, { pic: "🐝", basket: "small" }] },
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "از کوچک به بزرگ بچین",
        items: ["🐜", "🐭", "🐶", "🐘"] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "از کم به زیاد بچین", ltr: true,
        items: [{ dots: 2 }, { dots: 3 }, { dots: 5 }, { dots: 6 }] },
      { type: "pairs", prompt: "هر کدام را به رنگش برسان", say: "هر کدام را به رنگش برسان",
        pairs: [["🍓", "🔴"], ["🍋", "🟡"], ["🥒", "🟢"], ["🫐", "🔵"]] },
      { type: "unplugged", text: "یک مشت دکمه، مهره یا اسباب‌بازی کوچک روی زمین بریزید. اول کودک آن‌ها را بر اساس رنگ دسته کند، بعد بر اساس شکل یا اندازه. بعد شما یواشکی با یک قانون دسته کنید (مثلاً «بزرگ‌ها این‌جا، کوچک‌ها آن‌جا») و بپرسید: «قانون من چه بود؟» آخر هم از کوچک به بزرگ بچینید." }
    ]
  },
  {
    id: "think-seed-3", subject: "think", level: "seed", emoji: "🌻", title: "قدم به قدم",
    steps: [
      /* One step after another: plant, water, sprout, flower. The number in the corner counts the steps.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین گل چطور بزرگ می‌شود", bg: "#d6eef8",
        parts: {
          sun: { art: "sun", at: [140, 16] }, bed: { art: "garden-bed" }, wet: { art: "wet-soil", at: [80, 66], o: 0 },
          stem: { art: "stem", at: [80, 63], sy: 0 }, leaves: { art: "leaves", at: [80, 52], s: 0 },
          flower: { art: "flower-head", at: [80, 23], s: 0, r: -120 },
          seed: { art: "seed", at: [80, -14], s: 1.5 }, heap: { art: "soil-heap", at: [80, 67], s: 0 },
          hand: { art: "pinch-hand", at: [80, -14], s: 1.4 }, can: { art: "watering-can", at: [200, 30], s: 1.5 },
          step: { art: "counter", at: [16, 14], o: 0 }
        },
        scenes: [
          { caption: "اول دانه را در خاک می‌کاریم.", key: 1800, do: [
            { id: "step", to: { o: 1 }, dur: 300 }, { count: "step", from: 1, to: 1, dur: 1 },
            { id: "hand", to: { y: 52 }, at: 300, dur: 1000 }, { id: "seed", to: { y: 52 }, at: 300, dur: 1000 },
            { id: "seed", to: { y: 66 }, at: 1500, dur: 500, ease: "in" },
            { id: "hand", to: { y: -14 }, at: 1900, dur: 900 },
            { id: "heap", to: { s: 1 }, at: 2700, dur: 700, ease: "out" }
          ] },
          { caption: "بعد به آن آب می‌دهیم.", key: 2700, do: [
            { count: "step", from: 2, to: 2, dur: 1 },
            { id: "can", path: "M200 30Q150 16 108 40", dur: 1000 },
            { id: "can", to: { r: -35 }, at: 1000, dur: 500 },
            { emit: "drop", where: [83, 48], spread: [4, 2], rise: 15, n: 24, at: 1500, dur: 2000, life: 700 },
            { id: "wet", to: { o: 1 }, at: 1800, dur: 1600 },
            { id: "can", to: { r: 0 }, at: 3700, dur: 400 },
            { id: "can", path: "M108 40Q150 16 200 30", at: 4100, dur: 900 }
          ] },
          { caption: "کم‌کم جوانه می‌زند.", hold: 3800, do: [
            { count: "step", from: 3, to: 3, dur: 1 },
            { id: "stem", to: { sy: 0.3 }, at: 300, dur: 2600, ease: "out" },
            { id: "leaves", to: { s: 1 }, at: 1200, dur: 1800, ease: "out" },
            { id: "leaves", to: { r: 6 }, at: 3000, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "آخر سر گل می‌دهد.", do: [
            { count: "step", from: 4, to: 4, dur: 1 },
            { id: "stem", to: { sy: 1 }, dur: 2200, ease: "out" },
            { id: "flower", to: { s: 1, r: 0 }, at: 1900, dur: 1200, ease: "back" },
            { id: "sun.rays", to: { r: 45 }, at: 1900, dur: 1600 },
            { emit: "spark", where: [80, 23], spread: [26, 20], n: 8, at: 2800, dur: 900 }
          ] }
        ] },
      { type: "order", prompt: "به ترتیب بچین: اول چه بود؟", say: "به ترتیب بچین. اول چه بود؟", numbered: true,
        items: [{ pic: "🌰", label: "دانه", say: "دانه" }, { pic: "💧", label: "آب", say: "آب" },
          { pic: "🌱", label: "جوانه", say: "جوانه" }, { pic: "🌻", label: "گل", say: "گل" }] },
      { type: "order", prompt: "اول چه بود، بعد چه شد؟", say: "اول چه بود، بعد چه شد؟", numbered: true,
        items: [{ pic: "🥚", say: "تخم" }, { pic: "🐣", say: "جوجه از تخم بیرون می‌آید" }, { pic: "🐥", say: "جوجه" }, { pic: "🐔", say: "مرغ" }] },
      { type: "order", prompt: "دست‌هایت را چطور می‌شویی؟ به ترتیب بچین", say: "دست‌هایت را چطور می‌شویی؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "💧", label: "خیس کن", say: "دست‌ها را خیس کن" }, { pic: "🧼", label: "صابون بزن", say: "صابون بزن" },
          { pic: "🚿", label: "آب بکش", say: "آب بکش" }, { pic: "🧻", label: "خشک کن", say: "خشک کن" }] },
      { type: "unplugged", text: "با هم یک لقمه نان و پنیر درست کنید، اما کودک قدم‌ها را یکی‌یکی بگوید و شما دقیقاً همان را انجام دهید، نه بیشتر. اگر بگوید «پنیر را بگذار» و هنوز نان را باز نکرده‌اید، بپرسید: «کجا بگذارم؟» تا ببیند ترتیب کارها مهم است. برنامه‌نویسی هم همین است: گفتن کارها، دقیق و به ترتیب." }
    ]
  },
  {
    id: "think-seed-8", subject: "think", level: "seed", emoji: "⛄", title: "اول، بعد، آخر",
    steps: [
      /* A short story in order: snow falls, a snowman is made, the sun comes out, the snowman melts. The snowballs
         roll (they turn as they move) and the big one grows. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "یک قصه کوتاه: اول چه شد؟ بعد چه شد؟ آخر چه شد؟", bg: "#d5dde6",
        parts: {
          sky: { art: "tk-sky" }, blue: { art: "tk-sky-blue", o: 0 }, sun: { art: "sun", at: [132, 72], s: 1.3 },
          hills: { art: "tk-hills" }, cover: { art: "tk-snow-cover", o: 0 }, puddle: { art: "tk-puddle", at: [88, 84], s: 0 },
          big: { art: "tk-snowball", at: [40, 80.5], s: 0.35, o: 0 }, small: { art: "tk-snowball", at: [138, 78], s: 0.6, o: 0 },
          face: { art: "tk-snowface", at: [88, 58], s: 0 }, scarf: { art: "tk-scarf", at: [88, 64], s: 0 },
          boy: { art: "👦", at: [24, 84], look: { top: "#4f8fd6" } }, girl: { art: "👧", at: [152, 84], flip: true, look: { top: "#e46b8a" } },
          flakes: { art: "tk-flakes" }
        },
        scenes: [
          { caption: "اول، برف می‌بارد. همه‌جا سفید می‌شود.", key: 4000, do: [
            { id: "flakes", to: { y: 90 }, dur: 5200, ease: "linear" },
            { id: "cover", to: { o: 1 }, at: 1000, dur: 3600 }
          ] },
          { caption: "بعد، آرش یک گلوله برفی بزرگ می‌غلتاند.", key: 4400, do: [
            { id: "flakes", to: { o: 0 }, dur: 700 },
            { id: "big", to: { o: 1 }, at: 300, dur: 400 },
            { id: "boy", walk: [74, 84], at: 700, dur: 4200, steps: 9 },
            { id: "big", to: { x: 88, y: 74, s: 1, r: 420 }, at: 700, dur: 4200, ease: "linear" }
          ] },
          { caption: "بعد، سارا یک گلوله کوچک رویش می‌گذارد. آدم‌برفی درست شد!", key: 5400, do: [
            { id: "small", to: { o: 1 }, dur: 400 },
            { id: "girl", walk: [106, 84], at: 400, dur: 2600, steps: 6 },
            { id: "small", to: { x: 96, r: -320 }, at: 400, dur: 2600, ease: "linear" },
            { id: "girl.armF", to: { r: -150 }, at: 3100, dur: 600 },
            { id: "small", path: "M96 78Q96 52 88 58", at: 3300, dur: 1200 },
            { id: "girl.armF", to: { r: 0 }, at: 4600, dur: 500 },
            { id: "face", to: { s: 1 }, at: 4600, dur: 600, ease: "back" }, { id: "scarf", to: { s: 1 }, at: 5000, dur: 600, ease: "back" },
            { emit: "spark", where: [88, 58], spread: [26, 22], n: 7, at: 5400, dur: 700 }
          ] },
          { caption: "بعد، خورشید درمی‌آید و هوا گرم می‌شود.", key: 3200, do: [
            { id: "sun", to: { y: 18 }, dur: 2800 },
            { id: "blue", to: { o: 1 }, at: 400, dur: 2600 },
            { id: "sun.rays", to: { r: 90 }, at: 2400, dur: 2000 }
          ] },
          { caption: "آخر سر، آدم‌برفی آب می‌شود.", key: 4400, do: [
            { id: "face", to: { o: 0 }, dur: 1200 },
            { id: "scarf", path: "M88 64Q96 70 92 83", at: 300, dur: 1400 },
            { id: "big", to: { s: 0.25, y: 81.5 }, at: 600, dur: 4400, ease: "linear" },
            { id: "small", to: { s: 0.12, y: 77.8 }, at: 600, dur: 4400, ease: "linear" },
            { emit: "drop", where: [88, 70], spread: [18, 8], rise: 10, n: 14, at: 900, dur: 3600, life: 800 },
            { id: "puddle", to: { s: 1 }, at: 1200, dur: 3800 }
          ] }
        ] },
      { type: "order", prompt: "قصه را به ترتیب بچین: اول، بعد، آخر", say: "قصه را به ترتیب بچین. اول چه شد؟ بعد چه شد؟ آخر چه شد؟", numbered: true,
        items: [{ pic: "❄️", say: "برف می‌بارد" }, { pic: "⛄", say: "آدم‌برفی درست می‌کنیم" }, { pic: "☀️", say: "خورشید درمی‌آید" }, { pic: "💧", say: "آدم‌برفی آب می‌شود" }] },
      { type: "order", prompt: "صبح: اول چه کار می‌کنی؟ بعد؟ آخر؟", say: "صبح. اول چه کار می‌کنی؟ بعد؟ آخر؟", numbered: true,
        items: [{ pic: "🛏️", say: "از خواب بیدار می‌شوم" }, { pic: "🧦", say: "جوراب می‌پوشم" }, { pic: "👟", say: "کفش می‌پوشم" }, { pic: "🚪", say: "از خانه بیرون می‌روم" }] },
      { type: "order", prompt: "یک دانه سیب را کاشتیم. اول چه شد؟ بعد؟ آخر؟", say: "یک دانه سیب را کاشتیم. اول چه شد؟ بعد؟ آخر؟", numbered: true,
        items: [{ pic: "🌰", say: "دانه را می‌کاریم" }, { pic: "🌱", say: "جوانه می‌زند" }, { pic: "🌳", say: "درخت می‌شود" }, { pic: "🍎", say: "سیب می‌دهد" }] },
      { type: "order", prompt: "برای مادربزرگ چای درست می‌کنیم. به ترتیب بچین", say: "برای مادربزرگ چای درست می‌کنیم. به ترتیب بچین", numbered: true,
        items: [{ pic: "💧", say: "آب را در کتری می‌ریزیم" }, { pic: "🔥", say: "آب جوش می‌آید" }, { pic: "🫖", say: "چای را دم می‌کنیم" }, { pic: "☕", say: "چای را برای مادربزرگ می‌بریم" }] },
      { type: "unplugged", text: "یک کار روزانه را با هم قدم به قدم بگویید، مثلاً لباس پوشیدن یا مسواک زدن، و از کلمه‌های «اول»، «بعد» و «آخر» استفاده کنید. بعد چند قدم را جابه‌جا بگویید («اول کفش، بعد جوراب!») و بپرسید: «این‌طوری می‌شود؟» یک قصه کوتاه را هم در سه نقاشی بکشید، نقاشی‌ها را قاطی کنید و بگذارید کودک به ترتیب بچیند و قصه را تعریف کند." }
    ]
  },
  {
    id: "think-seed-9", subject: "think", level: "seed", emoji: "🤖", title: "ربات‌بازی",
    steps: [
      /* Leila guides her father, who plays a robot, one step at a time; the robot does exactly what she says, even a
         wrong step back, and she fixes it. Forward is to the right, the way he faces. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ربات‌بازی: لیلا به ربات می‌گوید چه کار کند", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, tiles: { art: "tk-tiles" },
          ball: { art: "ball-side", at: [118, 86], s: 1.6 },
          dad: { art: "👨", at: [40, 86], look: { top: "#3f6f8f" } }, ant: { art: "tk-antenna", under: "dad", at: [0.6, -24.4] },
          girl: { art: "👧", at: [16, 86], look: { top: "#f2a65a" } },
          bubble: { art: "tk-bubble", at: [22, 57], o: 0 },
          fwd: { art: "➡️", under: "bubble", at: [0, -6.5], s: 0.55 }, back: { art: "⬅️", under: "bubble", at: [0, -6.5], s: 0.55, o: 0 },
          two1: { art: "➡️", under: "bubble", at: [-5, -8], s: 0.42, o: 0 }, two2: { art: "➡️", under: "bubble", at: [5, -8], s: 0.42, o: 0 }
        },
        scenes: [
          { caption: "بابا ربات شده است. ربات باید به توپ برسد.", key: 1500, do: [
            { id: "ant.light", to: { o: 1 }, at: 200, dur: 400, yoyo: true, times: 4 },
            { id: "dad", to: { y: "-1.2" }, at: 200, dur: 400, yoyo: true, times: 4 },
            { id: "ball", to: { y: "-6" }, at: 1900, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "لیلا می‌گوید: «یک قدم جلو.» ربات یک قدم جلو می‌رود.", key: 3200, do: [
            { id: "bubble", to: { o: 1 }, dur: 400 }, { id: "bubble", to: { s: 1.12 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "ant.light", to: { o: 1 }, at: 1700, dur: 200 },
            { id: "dad", walk: [60, 86], at: 1900, dur: 1400, steps: 2 },
            { id: "ant.light", to: { o: 0 }, at: 3400, dur: 200 }, { id: "bubble", to: { o: 0 }, at: 3600, dur: 400 }
          ] },
          { caption: "باز می‌گوید: «یک قدم جلو.» ربات یک قدم دیگر جلو می‌رود.", key: 3200, do: [
            { id: "bubble", to: { o: 1 }, dur: 400 }, { id: "bubble", to: { s: 1.12 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "ant.light", to: { o: 1 }, at: 1700, dur: 200 },
            { id: "dad", walk: [80, 86], at: 1900, dur: 1400, steps: 2 },
            { id: "ant.light", to: { o: 0 }, at: 3400, dur: 200 }, { id: "bubble", to: { o: 0 }, at: 3600, dur: 400 }
          ] },
          { caption: "این بار لیلا اشتباهی می‌گوید: «یک قدم عقب.» ربات یک قدم عقب می‌رود!", key: 3400, do: [
            { id: "fwd", to: { o: 0 }, dur: 1 }, { id: "back", to: { o: 1 }, dur: 1 },
            { id: "bubble", to: { o: 1 }, dur: 400 }, { id: "bubble", to: { s: 1.12 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "ant.light", to: { o: 1 }, at: 1700, dur: 200 },
            { id: "dad", walk: [60, 86], at: 1900, dur: 1600, steps: 2 },
            { id: "ant.light", to: { o: 0 }, at: 3600, dur: 200 }, { id: "bubble", to: { o: 0 }, at: 3800, dur: 400 }
          ] },
          { caption: "لیلا برنامه را درست می‌کند: «دو قدم جلو.» ربات به توپ رسید!", key: 4900, do: [
            { id: "back", to: { o: 0 }, dur: 1 }, { id: "two1", to: { o: 1 }, dur: 1 }, { id: "two2", to: { o: 1 }, dur: 1 },
            { id: "bubble", to: { o: 1 }, dur: 400 }, { id: "bubble", to: { s: 1.12 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "ant.light", to: { o: 1 }, at: 1700, dur: 200 },
            { id: "dad", walk: [100, 86], at: 1900, dur: 2800, steps: 4 },
            { id: "ball", to: { y: "-6" }, at: 4700, dur: 600, yoyo: true, times: 2 },
            { emit: "spark", where: [114, 74], spread: [16, 12], n: 7, at: 4800, dur: 700 }
          ] }
        ] },
      /* The cat on a mat seen from above: one square up, one square right, and each move adds its arrow to the
         program (first card on the right; js/en/thinking.js moves the cards for English). */
      { type: "scene", prompt: "گربه می‌خواهد به شیر برسد", bg: "#f4ecdf",
        parts: {
          mat: { art: "tk-grid3" }, milk: { art: "🥛", at: [80, 40], s: 0.65 },
          cat: { art: "cat-top", at: [62, 51], s: 1.7 },
          c1: { art: "tk-card", at: [130, 86], o: 0 }, c2: { art: "tk-card", at: [104, 86], o: 0 },
          a1: { art: "⬆️", at: [130, 84], s: 0.75, o: 0 }, a2: { art: "➡️", at: [104, 84], s: 0.75, o: 0 }
        },
        scenes: [
          { caption: "گربه شیر می‌خواهد. شیر کجاست؟", do: [
            { id: "cat", to: { r: -30 }, at: 300, dur: 700 }, { id: "cat", to: { r: -60 }, at: 1100, dur: 500 },
            { id: "milk", to: { y: "-3" }, at: 1700, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "گربه یک خانه بالا می‌رود: فلش بالا.", key: 2400, do: [
            { id: "cat", to: { r: -90 }, dur: 500 },
            { id: "cat", to: { y: 33 }, at: 600, dur: 1200 },
            { id: "c1", to: { o: 1 }, at: 1900, dur: 400 }, { id: "a1", to: { o: 1 }, at: 1900, dur: 400 }
          ] },
          { caption: "بعد یک خانه به راست می‌رود: فلش راست. به شیر رسید!", key: 2800, do: [
            { id: "cat", to: { r: 0 }, dur: 500 },
            { id: "cat", to: { x: 74 }, at: 600, dur: 1000 },
            { id: "c2", to: { o: 1 }, at: 1700, dur: 400 }, { id: "a2", to: { o: 1 }, at: 1700, dur: 400 },
            { emit: "spark", where: [80, 32], spread: [18, 14], n: 6, at: 2200, dur: 600 }
          ] }
        ],
        question: "برنامه گربه با کدام فلش شروع شد؟", options: ["⬇️", "⬆️", "➡️"], answer: "⬆️" },
      { type: "choose", prompt: "گربه می‌خواهد به شیر برسد. کدام فلش او را می‌برد؟", say: "گربه می‌خواهد به شیر برسد. کدام فلش او را می‌برد؟",
        show: "🐱⬜🥛", ltr: true, pic: true, options: ["⬅️", "⬆️", "➡️"], answer: "➡️" },
      { type: "choose", prompt: "حالا شیر آن طرف است. کدام فلش؟", say: "حالا شیر آن طرف است. کدام فلش؟",
        show: "🥛⬜⬜🐱", ltr: true, pic: true, options: ["⬅️", "⬇️", "➡️"], answer: "⬅️" },
      { type: "unplugged", text: "ربات‌بازی: اول شما فرمان بدهید و کودک ربات باشد: «یک قدم جلو»، «یک قدم عقب»، «یک قدم به چپ»، «یک قدم به راست»، «دست‌ها بالا»، «دست‌ها پایین». بعد جایتان را عوض کنید: شما ربات شوید و کودک شما را تا یک اسباب‌بازی ببرد، فقط یک قدم با هر فرمان. هر فرمان را دقیقاً اجرا کنید، حتی اگر اشتباه باشد، تا خودش درستش کند." }
    ]
  },
  {
    id: "think-seed-4", subject: "think", level: "seed", emoji: "🐢", title: "راه لاک‌پشت",
    steps: [
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان. فلش‌ها را بچین و «اجرا» را بزن.",
        size: [3, 3], start: [0, 1], goal: [2, 1] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [3, 3], start: [1, 2], goal: [1, 0] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [3, 3], start: [0, 0], goal: [2, 2] },
      { type: "code", prompt: "سنگ سر راه است! از کنارش برو",
        size: [4, 3], start: [0, 1], goal: [3, 1], walls: [[1, 1], [2, 1]] },
      { type: "unplugged", text: "ربات‌بازی: شما ربات شوید و کودک برنامه‌نویس. یک عروسک یا میوه را آن طرف اتاق بگذارید. فقط وقتی حرکت کنید که کودک دستور بدهد: «یک قدم جلو»، «یک قدم عقب»، «یک قدم به چپ»، «یک قدم به راست». هر دستور را دقیقاً اجرا کنید، حتی اگر اشتباه باشد، تا خودش برنامه را درست کند. بعد جایتان را عوض کنید." }
    ]
  },
  {
    id: "think-seed-10", subject: "think", level: "seed", emoji: "🪨", title: "لاک‌پشت گیر کرد",
    steps: [
      { type: "code", prompt: "این برنامه یک فلش اشتباه دارد. اول «اجرا» را بزن و ببین لاک‌پشت کجا می‌رود. بعد آن فلش را درست کن.",
        say: "این برنامه یک فلش اشتباه دارد. اول اجرا را بزن و ببین لاک‌پشت کجا می‌رود. بعد آن فلش را درست کن.",
        size: [3, 3], start: [0, 1], goal: [2, 1], given: ["right", "up"] },
      { type: "code", prompt: "یک فلش اشتباه است. اجرا کن، پیدایش کن و درستش کن.", say: "یک فلش اشتباه است. اجرا کن، پیدایش کن و درستش کن.",
        size: [3, 3], start: [1, 2], goal: [1, 0], given: ["up", "left"] },
      { type: "code", prompt: "یک فلش اشتباه است. اجرا کن، پیدایش کن و درستش کن.", say: "یک فلش اشتباه است. اجرا کن، پیدایش کن و درستش کن.",
        size: [3, 3], start: [2, 2], goal: [0, 0], given: ["up", "up", "left", "right"] },
      { type: "code", prompt: "لاک‌پشت از کنار سنگ رد شد، اما آخرش گیر کرد! کدام فلش اشتباه است؟", say: "لاک‌پشت از کنار سنگ رد شد، اما آخرش گیر کرد. کدام فلش اشتباه است؟",
        size: [3, 3], start: [0, 1], goal: [2, 1], walls: [[1, 1]], given: ["up", "right", "right", "up"] },
      { type: "code", prompt: "لاک‌پشت به سنگ می‌خورد! اجرا کن و فلش اشتباه را درست کن.", say: "لاک‌پشت به سنگ می‌خورد. اجرا کن و فلش اشتباه را درست کن.",
        size: [3, 3], start: [0, 0], goal: [2, 2], walls: [[1, 1]], given: ["right", "right", "down", "left"] },
      { type: "unplugged", text: "یک برنامه با یک اشتباه: روی کاغذ فلش‌هایی بکشید که کودک را از جلوی در به یک اسباب‌بازی برساند، اما یکی از فلش‌ها را عمداً اشتباه بکشید. کودک قدم به قدم برنامه را اجرا کند. وقتی به جای اسباب‌بازی جای دیگری رسید، بپرسید: «کجا راه را اشتباه رفتیم؟ کدام فلش را باید عوض کنیم؟» بگذارید خودش فلش را پاک کند و درستش را بکشد. به او بگویید پیدا کردن اشتباه یعنی برنامه‌نویس خوبی هستی." }
    ]
  },
  {
    id: "think-seed-11", subject: "think", level: "seed", emoji: "🧀", title: "بازی راه",
    steps: [
      { type: "code", prompt: "موش را به پنیر برسان", say: "موش را به پنیر برسان", hero: "🐭", goalPic: "🧀",
        size: [3, 3], start: [0, 2], goal: [2, 0] },
      { type: "code", prompt: "سنگ سر راه است! موش را از کنارش به پنیر برسان", say: "سنگ سر راه است. موش را از کنارش به پنیر برسان", hero: "🐭", goalPic: "🧀",
        size: [3, 3], start: [0, 0], goal: [2, 0], walls: [[1, 0]] },
      { type: "code", prompt: "زمین بزرگ‌تر شد! موش را به پنیر برسان", say: "زمین بزرگ‌تر شد. موش را به پنیر برسان", hero: "🐭", goalPic: "🧀",
        size: [4, 4], start: [0, 3], goal: [3, 3] },
      { type: "code", prompt: "دو تا سنگ! موش را به پنیر برسان", say: "دو تا سنگ. موش را به پنیر برسان", hero: "🐭", goalPic: "🧀",
        size: [4, 4], start: [0, 0], goal: [2, 2], walls: [[1, 0], [0, 2]] },
      { type: "code", prompt: "این برنامه یک اشتباه دارد. اجرا کن و درستش کن.", say: "این برنامه یک اشتباه دارد. اجرا کن و درستش کن.", hero: "🐭", goalPic: "🧀",
        size: [4, 4], start: [3, 3], goal: [1, 1], walls: [[2, 3]], given: ["up", "left", "left", "down"] },
      { type: "unplugged", text: "با نوار چسب روی فرش، یا با گچ در حیاط، یک جدول ۳ در ۳ بکشید. یک اسباب‌بازی را در یک خانه بگذارید و یک بالش را «سنگ» کنید. کودک با کارت‌های فلش (روی کاغذ بکشید) برنامه را بچیند، بعد یکی از شما روی جدول همان را قدم به قدم اجرا کند. اگر نرسید، با هم فلشی را که اشتباه بود پیدا و عوض کنید. بعد جدول را بزرگ‌تر کنید یا یک سنگ دیگر بگذارید." }
    ]
  },
  {
    id: "think-seed-12", subject: "think", level: "seed", emoji: "🧩", title: "معما",
    steps: [
      /* Puzzle pictures and shadows are drawn in js/art/rig-think.js: "🙂‍❓" a face with no mouth, "🏠‍❓" a house
         with no door, "🧩‍🔺" a board with a triangle-shaped hole, "🐱‍⬛" the cat's shadow. */
      { type: "choose", prompt: "در این تصویر چه چیزی نیست؟", say: "خوب نگاه کن. در این تصویر چه چیزی نیست؟",
        show: "🙂‍❓", pic: true, options: ["👃", "👄", "👂"], answer: "👄" },
      { type: "choose", prompt: "این خانه چه چیزی کم دارد؟", say: "این خانه چه چیزی کم دارد؟",
        show: "🏠‍❓", pic: true, options: ["🪟", "🔑", "🚪"], answer: "🚪" },
      { type: "choose", prompt: "کدام تکه در این سوراخ جا می‌شود؟", say: "کدام تکه در این سوراخ جا می‌شود؟",
        show: "🧩‍🔺", pic: true, options: ["🔴", "🔺", "🟥"], answer: "🔺" },
      { type: "choose", prompt: "سایه گربه کدام است؟", say: "سایه گربه کدام است؟",
        show: "🐱", pic: true, options: ["🐰‍⬛", "🐔‍⬛", "🐱‍⬛"], answer: "🐱‍⬛" },
      { type: "choose", prompt: "این سایه کدام حیوان است؟", say: "این سایه کدام حیوان است؟",
        show: "🦒‍⬛", pic: true, options: ["🐘", "🦒", "🐌"], answer: "🦒" },
      { type: "pairs", prompt: "هر تکه را به سوراخ خودش برسان", say: "هر تکه را به سوراخ خودش برسان",
        pairs: [["🔴", "🧩‍🔴"], ["🟥", "🧩‍🟥"], ["⭐", "🧩‍⭐"], ["🔺", "🧩‍🔺"]] },
      { type: "unplugged", text: "بازی سایه‌ها: شب، با چراغ‌قوه یا نور تلفن، سایه چند چیز را روی دیوار بیندازید (یک لیوان، یک قاشق، یک عروسک، دستتان) و کودک حدس بزند سایه چیست. بعد بازی «چه چیزی نیست؟»: یک صورت یا یک خانه بکشید و یک چیزش را نکشید (دهان، در، دودکش) تا کودک پیدا کند. اگر پازل دارید، یک تکه را بردارید و بپرسید کدام تکه جای خالی را پر می‌کند. از او بپرسید: «چطور فهمیدی؟»" }
    ]
  },
  {
    id: "think-seed-13", subject: "think", level: "seed", emoji: "📱", title: "دستگاه‌ها",
    steps: [
      /* Devices at home, one after another along a wall (the camera pans): a phone that calls grandma and takes a
         photo, a tablet to draw on, a computer (screen, keyboard, mouse) and a television. Drawings:
         js/art/rig-think.js; the pencil from js/art/rig.js. */
      { type: "scene", prompt: "دستگاه‌های خانه را ببین", bg: "#f6e3c6",
        parts: {
          wall: { art: "tk-wall" },
          t1: { art: "tk-table", at: [80, 86] }, flower: { art: "🌻", at: [54, 66], s: 0.9 }, phone: { art: "tk-phone", at: [84, 66] },
          waves: { art: "en-sound", at: [97, 42], s: 1.3, o: 0 },
          t2: { art: "tk-table", at: [240, 86] }, tablet: { art: "tk-tablet", at: [240, 66] }, pencil: { art: "pencil", at: [262, 26], o: 0 },
          t3: { art: "tk-table", at: [400, 86], sx: 1.15 }, monitor: { art: "tk-monitor", at: [394, 64] }, keys: { art: "tk-keyboard", at: [394, 67] },
          mouse: { art: "tk-mouse", at: [422, 66] },
          tv: { art: "tk-tv", at: [560, 86], s: 1.1 }
        },
        scenes: [
          { caption: "این تلفن همراه است. با آن به مادربزرگ زنگ می‌زنیم.", key: 3000, do: [
            { id: "phone", to: { r: 4 }, at: 200, dur: 1000, yoyo: true, times: 6 },
            { id: "phone.call", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "waves", to: { o: 1 }, at: 1800, dur: 500, yoyo: true, times: 5 }
          ] },
          { caption: "با دوربین تلفن هم عکس می‌گیریم: عکس گل!", key: 3400, do: [
            { id: "phone.call", to: { o: 0 }, dur: 400 }, { id: "waves", to: { o: 0 }, dur: 400 },
            { id: "phone", to: { x: 74, r: -8 }, at: 500, dur: 900 },
            { id: "phone.flash", to: { o: 1 }, at: 1700, dur: 120 },
            { emit: "spark", where: [62, 50], spread: [14, 10], n: 6, at: 1700, dur: 300, life: 700 },
            { id: "phone.photo", to: { o: 1 }, at: 1820, dur: 1 }, { id: "phone.flash", to: { o: 0 }, at: 1850, dur: 600 },
            { id: "phone", to: { x: 84, r: 0 }, at: 2700, dur: 800 }
          ] },
          { caption: "این تبلت است. با آن نقاشی می‌کشیم.", key: 5600, do: [
            { cam: { x: 240 }, dur: 1800 },
            { id: "pencil", to: { o: 1 }, at: 1900, dur: 300 }, { id: "tablet.lines", to: { o: 1 }, at: 2100, dur: 1 },
            { id: "pencil", path: "M262 26C252 32 244 38 240 47V36C243 32 245 29 240 29 235 29 237 33 240 36", at: 2100, dur: 1800 },
            { id: "tablet.lines", draw: true, oneByOne: true, at: 2100, dur: 3000 },
            { id: "pencil", path: "M240 36C232 40 232 44 240 52", at: 3900, dur: 1200 },
            { id: "tablet.paint", to: { o: 1 }, at: 5200, dur: 700 },
            { id: "pencil", to: { o: 0 }, at: 5400, dur: 400 }
          ] },
          { caption: "این رایانه است. صفحه‌نمایش دارد…", key: 2600, do: [
            { cam: { x: 400 }, dur: 1800 },
            { id: "monitor.on", to: { o: 1 }, at: 2000, dur: 500 },
            { id: "monitor", to: { s: 1.08 }, at: 2500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "…صفحه‌کلید، که با آن می‌نویسیم…", key: 3600, do: [
            { id: "keys", to: { s: 1.12 }, dur: 500, yoyo: true, times: 2 },
            { id: "keys.k1", to: { y: 0.8 }, at: 1100, dur: 200, yoyo: true, times: 2 }, { id: "monitor.t1", to: { o: 1 }, at: 1250, dur: 300 },
            { id: "keys.k3", to: { y: 0.8 }, at: 1900, dur: 200, yoyo: true, times: 2 }, { id: "monitor.t2", to: { o: 1 }, at: 2050, dur: 300 },
            { id: "keys.k2", to: { y: 0.8 }, at: 2700, dur: 200, yoyo: true, times: 2 }, { id: "monitor.t3", to: { o: 1 }, at: 2850, dur: 300 },
            { id: "keys.k4", to: { y: 0.8 }, at: 3400, dur: 200, yoyo: true, times: 2 }
          ] },
          { caption: "…و موس. موس را تکان می‌دهیم و فلش روی صفحه هم تکان می‌خورد.", key: 2200, do: [
            { id: "mouse", to: { s: 1.2 }, dur: 500, yoyo: true, times: 2 },
            { id: "monitor.cursor", to: { o: 1 }, at: 900, dur: 300 },
            { id: "mouse", to: { x: 428 }, at: 1300, dur: 900, yoyo: true, times: 4 },
            { id: "monitor.cursor", to: { x: 6 }, at: 1300, dur: 900, yoyo: true, times: 4 }
          ] },
          { caption: "این تلویزیون است. با آن کارتون و برنامه تماشا می‌کنیم.", key: 4200, do: [
            { cam: { x: 560 }, dur: 1800 },
            { id: "tv.fish", to: { x: -14 }, at: 1600, dur: 1 }, { id: "tv.fish", to: { x: 14 }, at: 1700, dur: 3600, yoyo: true, times: 2 }
          ] }
        ] },
      // A memory game: each card says its device's name when it is turned over.
      { type: "pairs", hidden: true, prompt: "جفت‌ها را پیدا کن", say: "کارت‌ها را برگردان و جفت‌ها را پیدا کن",
        pairs: [[{ pic: "📱", say: "تلفن همراه" }, { pic: "📱", say: "تلفن همراه" }], [{ pic: "💻", say: "رایانه" }, { pic: "💻", say: "رایانه" }],
          [{ pic: "📺", say: "تلویزیون" }, { pic: "📺", say: "تلویزیون" }], [{ pic: "🖱️", say: "موس" }, { pic: "🖱️", say: "موس" }]] },
      { type: "choose", prompt: "با کدام به مادربزرگ زنگ می‌زنیم؟", say: "با کدام به مادربزرگ زنگ می‌زنیم؟", pic: true,
        options: ["📺", "📱", "⌨️"], answer: "📱" },
      { type: "choose", prompt: "کدام صفحه‌کلید است؟ با آن می‌نویسیم.", say: "کدام صفحه‌کلید است؟ با آن می‌نویسیم.", pic: true,
        options: ["🖱️", "📺", "⌨️"], answer: "⌨️" },
      { type: "choose", prompt: "کدام موس است؟", say: "کدام موس است؟", pic: true,
        options: ["⌨️", "🖱️", "📱"], answer: "🖱️" },
      { type: "choose", prompt: "روی کدام کارتون تماشا می‌کنیم؟", say: "روی کدام کارتون تماشا می‌کنیم؟", pic: true,
        options: ["📺", "🖱️", "⌨️"], answer: "📺" },
      { type: "unplugged", text: "در خانه بگردید و دستگاه‌ها را پیدا کنید: تلفن، تلویزیون، رایانه، تبلت، و حتی رادیو، ماشین لباسشویی یا یخچال. برای هر کدام بپرسید: «اسمش چیست؟ با آن چه کار می‌کنیم؟ کی از آن استفاده می‌کند؟» صفحه، دکمه‌ها، صفحه‌کلید و موس را نشانش بدهید. یادآوری کنید که دست زدن به دستگاه‌ها با اجازه بزرگ‌ترهاست. اگر می‌شود، با هم به مادربزرگ یا یکی از اقوام زنگ بزنید." }
    ]
  },
  {
    id: "think-seed-14", subject: "think", level: "seed", emoji: "⏰", title: "با بزرگ‌ترها",
    steps: [
      /* Screen rules, shown: Sara asks first, her mother gives her the tablet, a clock on the table will ring when
         time is up; something strange appears and Sara shows it to her mother, who closes it; the clock rings and
         Sara switches the tablet off and gives it back. Drawings: js/art/rig-think.js; Sara and her mother from
         js/art/rig-english.js (whether they wear a headscarf is chosen by B.headscarf). */
      { type: "scene", prompt: "سارا و تبلت", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } },
          table: { art: "tk-table", at: [140, 86], s: 0.8 }, clock: { art: "⏰", at: [140, 69.5], s: 0.7, o: 0 },
          waves: { art: "en-sound", at: [149, 62], o: 0 },
          mom: { art: "en-mother", at: [104, 88], s: 1.2 }, sara: { art: "en-sara", at: [56, 88], s: 1.25 },
          pad: { art: "tk-pad", at: [104, 61] },
          ask: { art: "en-ask", at: [64, 44], o: 0 }
        },
        scenes: [
          { caption: "سارا می‌خواهد با تبلت بازی کند. اول از مامان می‌پرسد.", key: 2200, do: TK.both("mom", "chest", 0, 1).concat([
            { id: "ask", to: { o: 1 }, at: 400, dur: 400 }, { id: "ask", to: { s: 1.15 }, at: 800, dur: 400, yoyo: true, times: 2 }
          ], TK.talk("sara", 500, 2000)) },
          { caption: "مامان می‌گوید: «باشه.» و تبلت را به سارا می‌دهد.", key: 3600, do: [
            { id: "ask", to: { o: 0 }, dur: 400 },
            { id: "mom.head", to: { y: 1.2 }, at: 300, dur: 350, yoyo: true, times: 4 }
          ].concat(TK.talk("mom", 300, 1200), TK.pose("mom", "L", "give", 1500, 700), TK.pose("mom", "R", "down", 1500, 700), TK.both("sara", "chest", 2400, 700), [
            { id: "pad", path: "M104 61Q82 56 56 69", at: 1500, dur: 1500 }
          ], TK.both("mom", "down", 3300, 600)) },
          { caption: "ساعت روی میز است. وقتی زنگ بزند، یعنی وقت بازی تمام است.", key: 2400, do: TK.pose("mom", "R", "point", 300, 700).concat([
            { id: "clock", to: { o: 1 }, at: 700, dur: 400 }, { id: "clock", to: { s: 0.8 }, at: 1100, dur: 400, yoyo: true, times: 2 }
          ], TK.talk("mom", 300, 2200), TK.pose("mom", "R", "down", 3000, 600)) },
          { caption: "سارا بازی می‌کند. یک‌دفعه یک چیز عجیب روی صفحه می‌آید.", key: 4000, do: [
            { id: "pad.ball", to: { x: 3, y: -3 }, dur: 600 }, { id: "pad.ball", to: { x: 6, y: 0 }, at: 600, dur: 600 },
            { id: "pad.ball", to: { x: 3, y: -3 }, at: 1200, dur: 600 }, { id: "pad.ball", to: { x: 0, y: 0 }, at: 1800, dur: 600 },
            { id: "pad.odd", to: { o: 1 }, at: 2800, dur: 200 }, { id: "pad", to: { r: 4 }, at: 2900, dur: 300, yoyo: true, times: 2 }
          ].concat(TK.face("sara", false, 3200)) },
          { caption: "سارا آن را به مامان نشان می‌دهد.", key: 2600, do: TK.pose("sara", "L", "down", 0, 600).concat(TK.pose("sara", "R", "point", 0, 1000), [
            { id: "pad", path: "M56 69Q66 60 76 64", dur: 1000 },
            { id: "mom.eyes", to: { x: -1 }, at: 1000, dur: 400 }
          ], TK.talk("sara", 1200, 1600)) },
          { caption: "مامان کمک می‌کند و آن را می‌بندد. کار خوبی کردی که گفتی!", key: 1450, do: TK.pose("mom", "L", "give", 0, 900).concat([
            { id: "pad.odd", to: { o: 0 }, at: 900, dur: 300 },
            { emit: "spark", where: [76, 62], spread: [14, 10], n: 6, at: 1000, dur: 500 }
          ], TK.pose("mom", "L", "down", 1800, 600), TK.talk("mom", 1800, 1800), TK.face("sara", true, 2000), [
            { id: "mom.eyes", to: { x: 0 }, at: 3600, dur: 300 },
            { id: "pad", path: "M76 64Q66 60 56 69", at: 3700, dur: 900 }
          ], TK.pose("sara", "R", "chest", 3700, 900), TK.pose("sara", "L", "chest", 3700, 900)) },
          { caption: "دینگ! ساعت زنگ زد. وقت بازی تمام شد.", key: 1400, do: [
            { id: "clock", to: { r: 10 }, dur: 2400, yoyo: true, times: 10 },
            { id: "waves", to: { o: 1 }, at: 100, dur: 400 }, { id: "waves", to: { o: 0 }, at: 2400, dur: 400 }
          ] },
          { caption: "سارا تبلت را خاموش می‌کند و به مامان پس می‌دهد.", key: 3800, do: [
            { id: "pad.dark", to: { o: 1 }, at: 400, dur: 500 },
            { id: "pad", path: "M56 69Q82 56 104 61", at: 1600, dur: 1500 }
          ].concat(TK.pose("sara", "R", "give", 1500, 700), TK.pose("sara", "L", "down", 1500, 700), TK.both("mom", "chest", 2400, 700), TK.both("sara", "down", 3300, 600)) }
        ] },
      { type: "sort", prompt: "کار خوب یا کار نه‌چندان خوب؟ هر تصویر را بزن تا بشنوی، بعد در سبدش بگذار.",
        baskets: [{ pic: "👍", label: "کار خوب", value: "good" }, { pic: "✋", label: "این کار نه", value: "no" }],
        items: [{ pic: "🙋", label: "اول می‌پرسم", say: "اول از بزرگ‌ترها اجازه می‌گیرم", basket: "good" },
          { pic: "🤫", label: "بی‌اجازه", say: "بی‌اجازه تبلت را برمی‌دارم", basket: "no" },
          { pic: "⏰", label: "زنگ زد، خاموش", say: "ساعت که زنگ زد، خاموشش می‌کنم", basket: "good" },
          { pic: "🌙", label: "تا شب", say: "تا شب بازی می‌کنم", basket: "no" },
          { pic: "🗣️", label: "به مامان می‌گویم", say: "اگر چیزی ترساندم، به مامان یا بابا می‌گویم", basket: "good" },
          { pic: "🙈", label: "پنهان می‌کنم", say: "چیز عجیب را از بزرگ‌ترها پنهان می‌کنم", basket: "no" }] },
      { type: "choose", prompt: "ساعت زنگ زد! وقت بازی تمام شد. چه کار کنیم؟", say: "ساعت زنگ زد. وقت بازی تمام شد. خاموشش می‌کنیم، یا باز هم بازی می‌کنیم؟",
        options: [{ label: "🎮 باز هم بازی می‌کنیم", value: "more" }, { label: "📴 خاموشش می‌کنیم", value: "off" }], answer: "off" },
      { type: "choose", prompt: "روی صفحه چیزی دیدی که ترسیدی. چه کار کنیم؟", say: "روی صفحه چیزی دیدی که ترسیدی. به مامان یا بابا می‌گوییم، یا به کسی نمی‌گوییم؟",
        options: [{ label: "🗣️ به مامان یا بابا می‌گوییم", value: "tell" }, { label: "🙈 به کسی نمی‌گوییم", value: "hide" }], answer: "tell" },
      { type: "choose", prompt: "می‌خواهی با تلفن بابا بازی کنی. اول چه کار کنیم؟", say: "می‌خواهی با تلفن بابا بازی کنی. اول از بابا می‌پرسیم، یا خودمان برش می‌داریم؟",
        options: [{ label: "🤫 خودمان برش می‌داریم", value: "take" }, { label: "🙋 از بابا می‌پرسیم", value: "ask" }], answer: "ask" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["قانون‌های صفحه را کوتاه و همیشگی نگه دارید: «اول بپرس»، «زنگ که زد، خاموش»، «چیز عجیب را به ما بگو».",
          "برای وقت بازی یک ساعت یا زنگ بگذارید تا تمام شدن وقت را زنگ اعلام کند، نه شما؛ چند دقیقه پیش از آن هم خبر بدهید.",
          "دستگاه‌ها را در اتاقی که همه هستند به کار ببرید، نه در اتاق خواب.",
          "وقتی کودک چیزی را به شما نشان داد یا گفت، اول از او تشکر کنید، حتی اگر کار اشتباهی کرده باشد، تا دفعه بعد هم بگوید."] },
      { type: "unplugged", text: "بازی «زنگ که زد»: یک بازی بدون صفحه را شروع کنید (مثلاً برج‌سازی یا نقاشی) و یک زنگ بگذارید. وقتی زنگ زد، همه دست از کار می‌کشند و «تمام!» می‌گویند. بعد با عروسک‌ها نمایش بازی کنید: عروسک می‌خواهد بی‌اجازه تلفن بردارد، یا چیز ترسناکی دیده. کودک به عروسک بگوید چه کار کند." }
    ]
  },

  // ---------------- Thinking: Sprout (which doesn't belong, if… then…, harder patterns, arrows, fixing) ----------------
  {
    id: "think-sprout-1", subject: "think", level: "sprout", emoji: "🔍", title: "کدام جور نیست؟",
    steps: [
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🍎", "🍐", "🚗", "🍌"], answer: "🚗" },
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🐄", "🪑", "🐑", "🐔"], answer: "🪑" },
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🟥", "🟥", "🟦", "🟥"], answer: "🟦" },
      { type: "choose", prompt: "با سه تایش می‌شود نقاشی کشید. کدام جور نیست؟", say: "با سه تایش می‌شود نقاشی کشید. کدام جور نیست؟", pic: true,
        options: ["✏️", "🖍️", "🥄", "🖌️"], answer: "🥄" },
      { type: "sort", prompt: "کدام در آب زندگی می‌کند و کدام پرواز می‌کند؟",
        baskets: [{ pic: "🌊", label: "در آب", value: "water" }, { pic: "☁️", label: "در آسمان", value: "sky" }],
        items: [{ pic: "🐟", basket: "water" }, { pic: "🐦", basket: "sky" }, { pic: "🐙", basket: "water" },
          { pic: "🦋", basket: "sky" }, { pic: "🦀", basket: "water" }, { pic: "🐝", basket: "sky" }] },
      { type: "unplugged", text: "چهار چیز روی میز بگذارید که سه تایش با هم جورند، مثلاً سه قاشق و یک جوراب. بپرسید: «کدام جور نیست؟ چرا؟» بعد نوبت کودک است که شما را امتحان کند. گاهی بیش از یک جواب درست هست؛ اگر دلیل خوبی بیاورد، قبول کنید." }
    ]
  },
  {
    id: "think-sprout-6", subject: "think", level: "sprout", emoji: "🍎", title: "دو قانون",
    steps: [
      { type: "choose", prompt: "کدام هم قرمز است و هم گرد؟", say: "کدام هم قرمز است و هم گرد؟", pic: true,
        options: ["🟥", "🍌", "🍎", "🔵"], answer: "🍎" },
      { type: "choose", prompt: "کدام هم حیوان است و هم پرواز می‌کند؟", say: "کدام هم حیوان است و هم پرواز می‌کند؟", pic: true,
        options: ["🐶", "🐦", "🎈", "🐟"], answer: "🐦" },
      { type: "choose", prompt: "کدام هم میوه است و هم زرد؟", say: "کدام هم میوه است و هم زرد؟", pic: true,
        options: ["🌽", "🍎", "🍌", "🍇"], answer: "🍌" },
      { type: "sort", prompt: "در سبد اول فقط چیزهایی که هم قرمزند و هم گرد. بقیه در سبد دوم.",
        baskets: [{ pic: "🔴", label: "قرمز و گرد", value: "both" }, { pic: "📦", label: "بقیه", value: "rest" }],
        items: [{ pic: "🍎", basket: "both" }, { pic: "🟥", basket: "rest" }, { pic: "🍒", basket: "both" },
          { pic: "🔵", basket: "rest" }, { pic: "🔴", basket: "both" }, { pic: "🍌", basket: "rest" }] },
      { type: "sort", prompt: "سبد اول: حیوان‌هایی که در آب زندگی می‌کنند و پا ندارند. بقیه در سبد دوم.",
        baskets: [{ pic: "🌊", label: "در آب و بی‌پا", value: "both" }, { pic: "📦", label: "بقیه", value: "rest" }],
        items: [{ pic: "🐟", basket: "both" }, { pic: "🦆", basket: "rest" }, { pic: "🐙", basket: "both" },
          { pic: "🐸", basket: "rest" }, { pic: "🐬", basket: "both" }, { pic: "🐄", basket: "rest" }] },
      { type: "choose", prompt: "یک سبد برای میوه‌ها داریم و یک سبد برای چیزهای قرمز. کدام در هر دو سبد جا می‌شود؟",
        say: "یک سبد برای میوه‌ها داریم و یک سبد برای چیزهای قرمز. کدام در هر دو سبد جا می‌شود؟", pic: true,
        options: ["🍌", "🚗", "🍓"], answer: "🍓" },
      { type: "unplugged", text: "بازی «دو قانون»: چند چیز از خانه جمع کنید (قاشق، توپ، جوراب، سیب، مداد) و بگویید: «چیزی به من بده که هم قرمز باشد و هم بشود خوردش.» بعد قانون‌ها را عوض کنید: «هم نرم باشد و هم آبی»، «هم گرد باشد و هم سبک». بعد نوبت کودک است که برای شما دو قانون بگذارد. اگر چیزی پیدا نشد، بپرسید: «کدام قانون را نمی‌شود با هم داشت؟»" }
    ]
  },
  {
    id: "think-sprout-2", subject: "think", level: "sprout", emoji: "☔", title: "اگر… آن‌وقت…",
    steps: [
      { type: "choose", prompt: "اگر باران ببارد، کدام را برمی‌داریم؟", say: "اگر باران ببارد، کدام را برمی‌داریم؟",
        show: "🌧️", pic: true, options: ["🕶️", "☂️", "🏖️"], answer: "☂️" },
      { type: "choose", prompt: "اگر هوا سرد باشد، چه می‌پوشیم؟", say: "اگر هوا سرد باشد، چه می‌پوشیم؟",
        show: "❄️", pic: true, options: ["🩳", "🩴", "🧥"], answer: "🧥" },
      { type: "choose", prompt: "اگر گلدان تشنه باشد، به آن چه می‌دهیم؟", say: "اگر گلدان تشنه باشد، به آن چه می‌دهیم؟",
        show: "🥀", pic: true, options: ["💧", "🍰", "🧸"], answer: "💧" },
      { type: "choose", prompt: "قانون بازی: اگر زنگ بزند، می‌پریم. زنگ زد! چه کار کنیم؟", say: "قانون بازی: اگر زنگ بزند، می‌پریم. زنگ زد! چه کار کنیم؟",
        show: "🔔", options: [{ label: "🧍 می‌ایستیم", value: "stand" }, { label: "🦘 می‌پریم", value: "jump" }, { label: "🪑 می‌نشینیم", value: "sit" }], answer: "jump" },
      { type: "sort", prompt: "قانون: اگر قرمز است، در سبد؛ اگر قرمز نیست، در بشقاب.",
        baskets: [{ pic: "🧺", label: "قرمز", value: "red" }, { pic: "🍽️", label: "قرمز نیست", value: "other" }],
        items: [{ pic: "🍎", basket: "red" }, { pic: "🍌", basket: "other" }, { pic: "🍓", basket: "red" },
          { pic: "🍐", basket: "other" }, { pic: "🍒", basket: "red" }, { pic: "🍇", basket: "other" }] },
      { type: "unplugged", text: "بازی «اگر… آن‌وقت…»: یک قانون بگذارید، مثلاً «اگر دست زدم، بپر. اگر پا کوبیدم، بنشین.» بعد گاهی دست بزنید و گاهی پا بکوبید. کم‌کم قانون‌ها را عوض کنید، یا بگذارید خودش قانون بگذارد و شما اجرا کنید. «اگر» در برنامه‌نویسی هم همین کار را می‌کند." }
    ]
  },
  {
    id: "think-sprout-7", subject: "think", level: "sprout", emoji: "✅", title: "درست یا نادرست؟",
    steps: [
      { type: "choose", prompt: "«همه سیب‌ها قرمزند.» درست است یا نادرست؟", say: "خوب نگاه کن. همه سیب‌ها قرمزند. درست است یا نادرست؟",
        show: "🍎🍎🍏", options: [{ label: "✅ درست", value: "yes" }, { label: "❌ نادرست", value: "no" }], answer: "no" },
      { type: "choose", prompt: "«سه سگ در تصویر هست.» درست است یا نادرست؟", say: "سه سگ در تصویر هست. درست است یا نادرست؟",
        show: "🐶🐶🐶", options: [{ label: "✅ درست", value: "yes" }, { label: "❌ نادرست", value: "no" }], answer: "yes" },
      { type: "choose", prompt: "«همه در آب زندگی می‌کنند.» درست است یا نادرست؟", say: "همه در آب زندگی می‌کنند. درست است یا نادرست؟",
        show: "🐟🐙🐦", options: [{ label: "✅ درست", value: "yes" }, { label: "❌ نادرست", value: "no" }], answer: "no" },
      { type: "choose", prompt: "«این تصویر شب است.» درست است یا نادرست؟", say: "این تصویر شب است. درست است یا نادرست؟",
        show: "🌙⭐", options: [{ label: "✅ درست", value: "yes" }, { label: "❌ نادرست", value: "no" }], answer: "yes" },
      { type: "sort", prompt: "میوه‌ها در سبد. چیزهایی که میوه نیستند در جعبه.",
        baskets: [{ pic: "🧺", label: "میوه", value: "fruit" }, { pic: "📦", label: "میوه نیست", value: "not" }],
        items: [{ pic: "🍐", basket: "fruit" }, { pic: "⚽", basket: "not" }, { pic: "🍇", basket: "fruit" },
          { pic: "🧦", basket: "not" }, { pic: "🍉", basket: "fruit" }, { pic: "🔑", basket: "not" }] },
      { type: "choose", prompt: "کدام حیوان نیست؟", say: "کدام حیوان نیست؟", pic: true,
        options: ["🐄", "🌳", "🐔"], answer: "🌳" },
      { type: "choose", prompt: "قانون: «اگر هوا سرد نیست، کلاه نمی‌خواهیم.» امروز آفتابی و گرم است. کلاه بگذاریم؟",
        say: "قانون این است: اگر هوا سرد نیست، کلاه نمی‌خواهیم. امروز آفتابی و گرم است. کلاه بگذاریم؟", show: "☀️",
        options: [{ label: "🧢 بله، کلاه می‌گذاریم", value: "yes" }, { label: "🙂 نه، لازم نیست", value: "no" }], answer: "no" },
      { type: "unplugged", text: "بازی «درست یا نادرست»: جمله‌هایی درباره چیزهای دور و بر بگویید و کودک بگوید درست است یا نادرست: «همه صندلی‌های این اتاق چهار پا دارند»، «بابا عینک زده»، «گربه پرواز می‌کند». اگر جمله نادرست بود، بپرسید: «چطور درستش کنیم؟» بعد بازی «نه»: «همه چیزهایی را که خوراکی نیستند روی میز بگذار.»" }
    ]
  },
  {
    id: "think-sprout-3", subject: "think", level: "sprout", emoji: "🔷", title: "الگوهای سخت‌تر",
    steps: [
      { type: "pattern", prompt: "بعدی‌ها کدام‌اند؟", say: "بعدی‌ها کدام‌اند؟",
        seq: ["🔺", "🟦", "🟡", "🔺", "🟦", "🟡", "🔺", "🟦", "🟡"], blanks: [7, 8], options: ["🔺", "🟦", "🟡"] },
      { type: "pattern", prompt: "جاهای خالی را پر کن", say: "جاهای خالی را پر کن",
        seq: ["🐟", "🐟", "🐢", "🐢", "🐟", "🐟", "🐢", "🐢"], blanks: [5, 6], options: ["🐟", "🐢", "🐸"] },
      { type: "pattern", prompt: "عددها را ادامه بده", ltr: true,
        seq: [5, 4, 3, 2, 1], blanks: [3, 4], options: [1, 2, 6] },
      { type: "pattern", prompt: "هر بار یکی بیشتر می‌شود. بعدی کدام است؟", say: "هر بار یکی بیشتر می‌شود. بعدی کدام است؟", ltr: true,
        seq: ["🟩", "🟩🟩", "🟩🟩🟩", "🟩🟩🟩🟩"], blanks: [3], options: ["🟩🟩", "🟩🟩🟩🟩", "🟩🟩🟩"] },
      { type: "pattern", prompt: "عددها را ادامه بده", ltr: true,
        seq: [1, 2, 3, 1, 2, 3, 1, 2, 3], blanks: [7, 8], options: [1, 2, 3, 4] },
      { type: "unplugged", text: "با ماکارونی، دکمه یا مهره یک گردنبند الگودار درست کنید: دو تا قرمز، یکی آبی، دو تا قرمز، یکی آبی… بپرسید: «بعدی چیست؟ چطور فهمیدی؟» بعد بگذارید خودش یک الگوی تازه بسازد و از شما بپرسد." }
    ]
  },
  {
    id: "think-sprout-8", subject: "think", level: "sprout", emoji: "🧩", title: "بازی الگو و قانون",
    steps: [
      { type: "choose", prompt: "کدام با بقیه جور نیست؟", say: "کدام با بقیه جور نیست؟", pic: true,
        options: ["🚗", "🚌", "🍌", "🚲"], answer: "🍌" },
      { type: "sort", prompt: "گرم‌ها یک طرف، سردها طرف دیگر",
        baskets: [{ pic: "🔥", label: "گرم", value: "hot" }, { pic: "❄️", label: "سرد", value: "cold" }],
        items: [{ pic: "☕", basket: "hot" }, { pic: "🧊", basket: "cold" }, { pic: "🍲", basket: "hot" },
          { pic: "⛄", basket: "cold" }, { pic: "☀️", basket: "hot" }, { pic: "🍦", basket: "cold" }] },
      { type: "pattern", prompt: "هر بار دو تا بیشتر می‌شود. بعدی کدام است؟", say: "هر بار دو تا بیشتر می‌شود. بعدی کدام است؟", ltr: true,
        seq: [2, 4, 6, 8, 10], blanks: [4], options: [9, 10, 12] },
      { type: "pattern", prompt: "بعدی‌ها کدام‌اند؟", say: "بعدی‌ها کدام‌اند؟",
        seq: ["🐱", "🐶", "🐰", "🐱", "🐶", "🐰", "🐱", "🐶", "🐰"], blanks: [7, 8], options: ["🐱", "🐶", "🐰"] },
      { type: "pattern", prompt: "هر بار یک ستاره بیشتر. جای خالی را پر کن", say: "هر بار یک ستاره بیشتر. جای خالی را پر کن", ltr: true,
        seq: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐"], blanks: [2], options: ["⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐"] },
      { type: "choose", prompt: "«همه موزها زردند.» درست است یا نادرست؟", say: "همه موزها زردند. درست است یا نادرست؟",
        show: "🍌🍌🍌", options: [{ label: "✅ درست", value: "yes" }, { label: "❌ نادرست", value: "no" }], answer: "yes" },
      { type: "choose", prompt: "همه پرواز می‌کنند. کدام پرنده نیست؟", say: "همه پرواز می‌کنند. کدام پرنده نیست؟", pic: true,
        options: ["🦆", "🐝", "🐦"], answer: "🐝" },
      { type: "unplugged", text: "یک «بازی قانون» بسازید: شما در دلتان یک قانون انتخاب کنید (مثلاً «فقط چیزهای گرد») و چیزهایی را که با قانون جورند یکی‌یکی روی میز بگذارید. کودک حدس بزند قانون چیست و یک چیز دیگر که جور است بیاورد. بعد با قاشق و چنگال یک الگوی رشدکننده بچینید: ۱ قاشق، ۲ قاشق، ۳ قاشق… و بپرسید بعدی چند تاست." }
    ]
  },
  {
    id: "think-sprout-9", subject: "think", level: "sprout", emoji: "🎒", title: "کار بزرگ، کارهای کوچک",
    steps: [
      /* One big job (a big card) breaks into four small cards, which are put in order, ticked one by one, and the
         child goes out ready. The first card is on the right; js/en/thinking.js moves the cards for English.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "یک کار بزرگ را کوچک‌کوچک می‌کنیم", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } },
          big: { art: "tk-card", at: [80, 46], s: 0 }, bigpic: { art: "🎒", at: [80, 44], s: 0 },
          c1: { art: "tk-card", at: [80, 46], s: 0 }, c2: { art: "tk-card", at: [80, 46], s: 0 }, c3: { art: "tk-card", at: [80, 46], s: 0 }, c4: { art: "tk-card", at: [80, 46], s: 0 },
          p1: { art: "🍞", at: [80, 44], s: 0 }, p2: { art: "🪥", at: [80, 44], s: 0 }, p3: { art: "👕", at: [80, 44], s: 0 }, p4: { art: "🎒", at: [80, 44], s: 0 },
          n1: { art: "counter", at: [125, 44], o: 0 }, n2: { art: "counter", at: [99, 44], o: 0 }, n3: { art: "counter", at: [73, 44], o: 0 }, n4: { art: "counter", at: [47, 44], o: 0 },
          t1: { art: "tick", at: [125, 13], o: 0 }, t2: { art: "tick", at: [99, 13], o: 0 }, t3: { art: "tick", at: [73, 13], o: 0 }, t4: { art: "tick", at: [47, 13], o: 0 },
          kid: { art: "👦", at: [26, 86], look: { top: "#4f8fd6" } }
        },
        scenes: [
          { caption: "«آماده شدن برای مدرسه» یک کار بزرگ است.", do: [
            { id: "big", to: { s: 2 }, dur: 700, ease: "back" }, { id: "bigpic", to: { s: 1.6 }, at: 200, dur: 700, ease: "back" }
          ] },
          { caption: "آن را به چند کار کوچک‌تر تقسیم می‌کنیم.", key: 2600, do: [
            { id: "big", to: { s: 0 }, at: 300, dur: 500 }, { id: "bigpic", to: { s: 0 }, at: 300, dur: 500 },
            { id: "c1", to: { s: 1, x: 125, y: 32 }, at: 600, dur: 900 }, { id: "p1", to: { s: 0.8, x: 125, y: 30 }, at: 600, dur: 900 },
            { id: "c2", to: { s: 1, x: 99, y: 32 }, at: 900, dur: 900 }, { id: "p2", to: { s: 0.8, x: 99, y: 30 }, at: 900, dur: 900 },
            { id: "c3", to: { s: 1, x: 73, y: 32 }, at: 1200, dur: 900 }, { id: "p3", to: { s: 0.8, x: 73, y: 30 }, at: 1200, dur: 900 },
            { id: "c4", to: { s: 1, x: 47, y: 32 }, at: 1500, dur: 900 }, { id: "p4", to: { s: 0.8, x: 47, y: 30 }, at: 1500, dur: 900 }
          ] },
          { caption: "به ترتیب: اول صبحانه، بعد مسواک، بعد لباس، آخر کیف.", key: 4200, do: [
            { id: "n1", to: { o: 1 }, dur: 300 }, { count: "n1", from: 1, to: 1, dur: 1 }, { id: "c1", to: { y: 29 }, dur: 400, yoyo: true, times: 2 }, { id: "p1", to: { y: 27 }, dur: 400, yoyo: true, times: 2 },
            { id: "n2", to: { o: 1 }, at: 1100, dur: 300 }, { count: "n2", from: 2, to: 2, at: 1100, dur: 1 }, { id: "c2", to: { y: 29 }, at: 1100, dur: 400, yoyo: true, times: 2 }, { id: "p2", to: { y: 27 }, at: 1100, dur: 400, yoyo: true, times: 2 },
            { id: "n3", to: { o: 1 }, at: 2200, dur: 300 }, { count: "n3", from: 3, to: 3, at: 2200, dur: 1 }, { id: "c3", to: { y: 29 }, at: 2200, dur: 400, yoyo: true, times: 2 }, { id: "p3", to: { y: 27 }, at: 2200, dur: 400, yoyo: true, times: 2 },
            { id: "n4", to: { o: 1 }, at: 3300, dur: 300 }, { count: "n4", from: 4, to: 4, at: 3300, dur: 1 }, { id: "c4", to: { y: 29 }, at: 3300, dur: 400, yoyo: true, times: 2 }, { id: "p4", to: { y: 27 }, at: 3300, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "هر کار کوچک که تمام شد، یک تیک می‌خورد.", key: 3800, do: [
            { id: "t1", to: { o: 1 }, at: 300, dur: 400 }, { id: "t2", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "t3", to: { o: 1 }, at: 2300, dur: 400 }, { id: "t4", to: { o: 1 }, at: 3300, dur: 400 }
          ] },
          { caption: "همه کارهای کوچک تمام شد: کار بزرگ هم تمام شد! آرش آماده است.", key: 3200, do: [
            { emit: "spark", where: [86, 22], spread: [90, 14], n: 10, dur: 900 },
            { id: "kid", walk: [138, 86], at: 900, dur: 3000, steps: 6 }
          ] }
        ] },
      { type: "order", prompt: "صبح مدرسه: کارهای کوچک را به ترتیب بچین", say: "صبح مدرسه. کارهای کوچک را به ترتیب بچین.", numbered: true,
        items: [{ pic: "🛏️", say: "بیدار می‌شوم" }, { pic: "🍞", say: "صبحانه می‌خورم" }, { pic: "🪥", say: "مسواک می‌زنم" }, { pic: "👟", say: "کفش می‌پوشم" }] },
      { type: "order", prompt: "الگوریتم آب دادن به گلدان: قدم‌ها را به ترتیب بچین", say: "الگوریتم آب دادن به گلدان. قدم‌ها را به ترتیب بچین.", numbered: true,
        items: [{ pic: "🚰", say: "آب‌پاش را پر می‌کنیم" }, { pic: "🪴", say: "کنار گلدان می‌رویم" }, { pic: "💧", say: "به گلدان آب می‌دهیم" }, { pic: "🪣", say: "آب‌پاش را سر جایش می‌گذاریم" }] },
      { type: "order", prompt: "لقمه نان و پنیر: کار بزرگ را کوچک کن و به ترتیب بچین", say: "لقمه نان و پنیر. کار بزرگ را کوچک کن و به ترتیب بچین.", numbered: true,
        items: [{ pic: "🫓", say: "نان را باز می‌کنیم" }, { pic: "🧀", say: "پنیر را رویش می‌گذاریم" }, { pic: "🌯", say: "نان را لوله می‌کنیم" }] },
      { type: "unplugged", text: "یک کار بزرگ خانه را انتخاب کنید، مثلاً «جمع کردن اتاق» یا «چیدن سفره». از کودک بپرسید: «این کار از چه کارهای کوچکی درست شده؟» کارهای کوچک را با هم روی کاغذ بکشید (هر کدام یک تصویر کوچک) و به ترتیب شماره بزنید. بعد همان «الگوریتم» را اجرا کنید و هر کار که تمام شد تیک بزنید." }
    ]
  },
  {
    id: "think-sprout-10", subject: "think", level: "sprout", emoji: "📏", title: "راه کوتاه‌تر",
    steps: [
      { type: "choose", prompt: "از خانه تا مدرسه دو راه هست. خانه‌هایشان را بشمار. کدام راه کوتاه‌تر است؟",
        say: "از خانه تا مدرسه دو راه هست. خانه‌هایشان را بشمار. کدام راه کوتاه‌تر است؟", ltr: true, stack: true,
        options: [{ label: "🏠🟥🟥🟥🟥🟥🟥🏫", value: "red" }, { label: "🏠🟦🟦🟦🟦🏫", value: "blue" }], answer: "blue" },
      { type: "choose", prompt: "هر دو برنامه لاک‌پشت را به توت‌فرنگی می‌رسانند. کدام کوتاه‌تر است؟",
        say: "هر دو برنامه لاک‌پشت را به توت‌فرنگی می‌رسانند. کدام کوتاه‌تر است؟", ltr: true, stack: true,
        options: [{ label: "➡️⬇️➡️⬆️➡️⬇️", value: "long" }, { label: "➡️➡️➡️⬇️", value: "short" }], answer: "short" },
      { type: "code", prompt: "دیوار سر راه است! با ۸ فلش یا کمتر لاک‌پشت را برسان.", say: "دیوار سر راه است. با هشت فلش یا کمتر لاک‌پشت را برسان.",
        size: [5, 5], start: [0, 4], goal: [4, 4], walls: [[2, 4], [2, 3]], max: 8 },
      { type: "code", prompt: "کوتاه‌ترین راه را پیدا کن: فقط ۴ فلش داری.", say: "کوتاه‌ترین راه را پیدا کن. فقط چهار فلش داری.",
        size: [4, 4], start: [0, 0], goal: [2, 2], walls: [[1, 1]], max: 4 },
      { type: "code", prompt: "از روی سنگ نمی‌شود رفت. با ۶ فلش برسان.", say: "از روی سنگ نمی‌شود رفت. با شش فلش برسان.",
        size: [5, 3], start: [0, 1], goal: [4, 1], walls: [[2, 1]], max: 6 },
      { type: "unplugged", text: "در خانه یا کوچه دو راه برای رسیدن به یک جا پیدا کنید (مثلاً از اتاق تا آشپزخانه). هر کدام را بروید و قدم‌ها را با هم بشمارید. کدام کوتاه‌تر بود؟ بعد دو «دستور» برای یک کار بگویید، یکی کوتاه و یکی دراز («برو، بایست، برو، بایست، برو» یا «سه قدم برو»)، و بپرسید کدام بهتر است و چرا." }
    ]
  },
  {
    id: "think-sprout-4", subject: "think", level: "sprout", emoji: "🐰", title: "برنامه با فلش",
    steps: [
      { type: "code", prompt: "خرگوش را به هویج برسان. فلش‌ها را بچین و «اجرا» را بزن.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 2], goal: [4, 2] },
      { type: "code", prompt: "خرگوش را به هویج برسان. از کنار درخت‌ها برو.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 4], goal: [4, 0], walls: [[1, 3], [1, 2], [3, 2], [3, 1]] },
      { type: "code", prompt: "خرگوش را به هویج برسان", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[1, 0], [1, 1], [1, 2], [3, 2], [3, 3], [3, 4]] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [5, 5], start: [2, 4], goal: [2, 0], walls: [[2, 2], [1, 2], [3, 1], [2, 3]] },
      { type: "unplugged", text: "با گچ در حیاط، یا با نوار چسب روی فرش، یک جدول ۴ در ۴ بکشید و یک اسباب‌بازی را در یکی از خانه‌ها بگذارید. کودک روی کاغذ با فلش‌های بالا، پایین، چپ و راست برنامه بنویسد. بعد یکی از شما روی جدول بایستد و قدم به قدم همان برنامه را اجرا کند. آیا به اسباب‌بازی رسید؟" }
    ]
  },
  {
    id: "think-sprout-11", subject: "think", level: "sprout", emoji: "🔮", title: "اول فکر کن",
    steps: [
      // The boards are drawn in js/art/rig-think.js ("🐰‍🥕" is the board whose answer is the carrot).
      { type: "choose", prompt: "خرگوش این برنامه را اجرا می‌کند: ➡️ ➡️ ⬇️. به کدام می‌رسد؟", say: "خرگوش این برنامه را اجرا می‌کند: راست، راست، پایین. به کدام می‌رسد؟",
        show: "🐰‍🥕", pic: true, options: ["🍓", "🥕", "🍎"], answer: "🥕" },
      { type: "choose", prompt: "این بار برنامه این است: ⬆️ ➡️ ➡️. خرگوش به کدام می‌رسد؟", say: "این بار برنامه این است: بالا، راست، راست. خرگوش به کدام می‌رسد؟",
        show: "🐰‍🍎", pic: true, options: ["🥕", "🍓", "🍎"], answer: "🍎" },
      { type: "choose", prompt: "برنامه: ⬅️ ⬅️ ⬆️. اول در ذهنت راه برو. خرگوش به کدام می‌رسد؟", say: "برنامه: چپ، چپ، بالا. اول در ذهنت راه برو. خرگوش به کدام می‌رسد؟",
        show: "🐰‍🍓", pic: true, options: ["🍓", "🍎", "🥕"], answer: "🍓" },
      { type: "code", prompt: "اول همه فلش‌ها را بچین، بعد فقط یک بار «اجرا» را بزن.", say: "اول همه فلش‌ها را بچین، بعد فقط یک بار اجرا را بزن.",
        hero: "🐰", goalPic: "🥕", wall: "🌳", size: [5, 5], start: [0, 4], goal: [4, 0], walls: [[1, 3], [2, 1], [3, 3]] },
      { type: "code", prompt: "درخت‌ها راه را بسته‌اند. اول در ذهنت راه را برو، بعد برنامه را بچین.", say: "درخت‌ها راه را بسته‌اند. اول در ذهنت راه را برو، بعد برنامه را بچین.",
        hero: "🐰", goalPic: "🥕", wall: "🌳", size: [5, 5], start: [2, 4], goal: [2, 0], walls: [[1, 2], [2, 2], [3, 2]] },
      { type: "unplugged", text: "بازی «حدس بزن کجا می‌رسم»: روی زمین یک جدول بکشید یا از کاشی‌ها استفاده کنید. شما یک برنامه بگویید («دو قدم جلو، یک قدم راست») و پیش از اینکه راه بیفتید، کودک جایی را که می‌رسید با یک اسباب‌بازی نشان دهد. بعد اجرا کنید: درست حدس زده بود؟ بعد جایتان را عوض کنید." }
    ]
  },
  {
    id: "think-sprout-5", subject: "think", level: "sprout", emoji: "🐞", title: "اشکال را پیدا کن",
    steps: [
      { type: "code", prompt: "این برنامه اشکال دارد. اول «اجرا» را بزن و ببین چه می‌شود. بعد درستش کن.",
        size: [5, 3], start: [0, 1], goal: [3, 1], given: ["right", "right"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [2, 4], goal: [4, 2], given: ["up", "up", "left", "left"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [3, 3], start: [0, 0], goal: [2, 2], walls: [[1, 0]], given: ["right", "down", "down", "right"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [0, 4], goal: [4, 4], walls: [[2, 4]], given: ["right", "up", "right", "right", "down", "down", "right"] },
      { type: "unplugged", text: "گاهی عمداً دستور اشتباه بدهید، مثلاً «برای رسیدن به در، سه قدم به چپ برو» وقتی در سمت راست است. بگذارید کودک اشکال را پیدا کند و درستش کند. به او بگویید برنامه‌نویس‌ها هم هر روز اشکال پیدا و درست می‌کنند؛ اشتباه بخشی از کار است." }
    ]
  },
  {
    id: "think-sprout-12", subject: "think", level: "sprout", emoji: "🏁", title: "بازی برنامه",
    steps: [
      { type: "code", prompt: "خرگوش را به هویج برسان. حداکثر ۸ فلش داری.", say: "خرگوش را به هویج برسان. حداکثر هشت فلش داری.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 2], goal: [4, 2], walls: [[2, 1], [2, 2], [2, 3]], max: 8 },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان. حداکثر ۸ فلش داری.", say: "لاک‌پشت را به توت‌فرنگی برسان. حداکثر هشت فلش داری.",
        size: [5, 5], start: [4, 4], goal: [0, 0], walls: [[1, 0], [1, 1], [3, 3], [3, 4]], max: 8 },
      { type: "code", prompt: "این برنامه اشکال دارد. اجرا کن، اشکال را پیدا کن و درستش کن.", say: "این برنامه اشکال دارد. اجرا کن، اشکال را پیدا کن و درستش کن.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[1, 1], [2, 1], [3, 3], [3, 2]], given: ["right", "right", "right", "right", "down", "down", "down", "right"] },
      { type: "code", prompt: "این یکی هم اشکال دارد. درستش کن.", say: "این یکی هم اشکال دارد. درستش کن.",
        size: [5, 5], start: [0, 4], goal: [3, 0], walls: [[1, 4], [1, 3], [3, 2]], given: ["up", "up", "up", "up", "right", "right", "left"] },
      { type: "unplugged", text: "یک «مسابقه بدون برنده» برای کل خانواده: یک جدول ۵ در ۵ با نوار چسب یا گچ بکشید و چند بالش را دیوار کنید. هر کس روی کاغذ برنامه‌ای با حداکثر ۸ فلش بنویسد تا یک اسباب‌بازی را به هدف برساند. بعد برنامه‌ها را عوض کنید و برنامه دیگری را اجرا کنید. اگر برنامه‌ای اشکال داشت، با هم درستش کنید." }
    ]
  },
  {
    id: "think-sprout-13", subject: "think", level: "sprout", emoji: "🗝️", title: "رمز تصویری",
    steps: [
      // The code table is drawn in js/art/rig-think.js ("🗝‍🧺"): 🍎 up, 🍌 right, 🍇 down, 🍓 left.
      { type: "choose", prompt: "این جدول رمز است: هر میوه یعنی یک فلش. «سیب» یعنی کدام فلش؟", say: "این جدول رمز است. هر میوه یعنی یک فلش. سیب یعنی کدام فلش؟",
        show: "🗝‍🧺", pic: true, options: ["⬇️", "⬆️", "➡️"], answer: "⬆️" },
      { type: "pairs", prompt: "هر میوه را به فلشش برسان", say: "هر میوه را به فلشش برسان. سیب یعنی بالا، موز یعنی راست، انگور یعنی پایین، توت‌فرنگی یعنی چپ.",
        pairs: [["🍎", "⬆️"], ["🍌", "➡️"], ["🍇", "⬇️"], ["🍓", "⬅️"]] },
      { type: "choose", prompt: "پیام رمزی: سیب، سیب، موز. یعنی کدام برنامه؟", say: "پیام رمزی: سیب، سیب، موز. یعنی کدام برنامه؟",
        show: "🍎🍎🍌", ltr: true, pic: true, options: ["➡️⬆️⬆️", "⬆️⬆️➡️", "⬇️⬇️➡️"], answer: "⬆️⬆️➡️" },
      { type: "choose", prompt: "حالا تو رمز بنویس: این برنامه با میوه چه می‌شود؟", say: "حالا تو رمز بنویس. این برنامه، چپ و پایین، با میوه چه می‌شود؟",
        show: "⬅️⬇️", ltr: true, pic: true, options: ["🍇🍓", "🍓🍇", "🍌🍇"], answer: "🍓🍇" },
      { type: "choose", prompt: "این پیام تصویری چه می‌گوید؟", say: "این پیام تصویری چه می‌گوید؟ سلام مادربزرگ، دوستت دارم. یا: خداحافظ بابا، فردا می‌بینمت.",
        show: "👋👵❤️", options: [{ label: "👋👵❤️ سلام مادربزرگ، دوستت دارم", value: "hi" }, { label: "👋👨🌙 خداحافظ بابا، فردا می‌بینمت", value: "bye" }], answer: "hi" },
      { type: "unplugged", text: "با هم یک رمز بسازید: مثلاً «یک بار دست زدن یعنی بیا»، «دو بار یعنی بنشین»، یا شکل‌هایی روی کاغذ که هر کدام یک کلمه است (⭐ یعنی «بازی»، 🌙 یعنی «خواب»). یک پیام رمزی برای کودک بنویسید و بگذارید بخواند. بعد او برای شما پیام رمزی بنویسد و شما بخوانید. رایانه‌ها هم همه‌چیز را با رمز نگه می‌دارند." }
    ]
  },
  {
    id: "think-sprout-14", subject: "think", level: "sprout", emoji: "🐔", title: "بشمار و بگو",
    steps: [
      { type: "sort", prompt: "حیوان‌های مزرعه را دسته کن: مرغ‌ها، گاوها، گوسفندها",
        baskets: [{ pic: "🐔", value: "hen" }, { pic: "🐄", value: "cow" }, { pic: "🐑", value: "sheep" }],
        items: [{ pic: "🐔", basket: "hen" }, { pic: "🐑", basket: "sheep" }, { pic: "🐄", basket: "cow" }, { pic: "🐔", basket: "hen" },
          { pic: "🐑", basket: "sheep" }, { pic: "🐔", basket: "hen" }, { pic: "🐄", basket: "cow" }, { pic: "🐑", basket: "sheep" }, { pic: "🐔", basket: "hen" }] },
      /* Tally marks: one stroke for each apple as it is counted, the fifth across the first four. The strokes are
         drawn like a pencil line. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "با خط شمردن", bg: "#eef5e8",
        parts: {
          a1: { art: "🍎", at: [30, 38], s: 0.9 }, a2: { art: "🍎", at: [50, 38], s: 0.9 }, a3: { art: "🍎", at: [70, 38], s: 0.9 },
          a4: { art: "🍎", at: [90, 38], s: 0.9 }, a5: { art: "🍎", at: [110, 38], s: 0.9 }, a6: { art: "🍎", at: [130, 38], s: 0.9 },
          k1: { art: "tick", at: [30, 47], s: 0.7, o: 0 }, k2: { art: "tick", at: [50, 47], s: 0.7, o: 0 }, k3: { art: "tick", at: [70, 47], s: 0.7, o: 0 },
          k4: { art: "tick", at: [90, 47], s: 0.7, o: 0 }, k5: { art: "tick", at: [110, 47], s: 0.7, o: 0 }, k6: { art: "tick", at: [130, 47], s: 0.7, o: 0 },
          sheet: { art: "tk-sheet", at: [80, 70], s: 1.3 },
          s1: { art: "tk-stroke", o: 0, at: [60, 78] }, s2: { art: "tk-stroke", o: 0, at: [65, 78] }, s3: { art: "tk-stroke", o: 0, at: [70, 78] }, s4: { art: "tk-stroke", o: 0, at: [75, 78] },
          s5: { art: "tk-slash", o: 0, at: [56, 74] }, s6: { art: "tk-stroke", o: 0, at: [92, 78] }
        },
        scenes: [
          { caption: "سیب‌ها را می‌شمریم. برای هر سیب یک خط می‌کشیم: یک.", key: 2000, do: [
            { id: "a1", to: { y: 34 }, dur: 400, yoyo: true, times: 2 }, { id: "k1", to: { o: 1 }, at: 400, dur: 300 }, { id: "s1", to: { o: 1 }, at: 800, dur: 1 }, { id: "s1", draw: true, at: 800, dur: 900 }
          ] },
          { caption: "دو، سه، چهار.", key: 4300, do: [
            { id: "a2", to: { y: 34 }, dur: 400, yoyo: true, times: 2 }, { id: "k2", to: { o: 1 }, at: 400, dur: 300 }, { id: "s2", to: { o: 1 }, at: 600, dur: 1 }, { id: "s2", draw: true, at: 600, dur: 700 },
            { id: "a3", to: { y: 34 }, at: 1400, dur: 400, yoyo: true, times: 2 }, { id: "k3", to: { o: 1 }, at: 1800, dur: 300 }, { id: "s3", to: { o: 1 }, at: 2000, dur: 1 }, { id: "s3", draw: true, at: 2000, dur: 700 },
            { id: "a4", to: { y: 34 }, at: 2800, dur: 400, yoyo: true, times: 2 }, { id: "k4", to: { o: 1 }, at: 3200, dur: 300 }, { id: "s4", to: { o: 1 }, at: 3400, dur: 1 }, { id: "s4", draw: true, at: 3400, dur: 700 }
          ] },
          { caption: "پنجمی را کج روی چهار خط می‌کشیم: یک دسته پنج‌تایی!", key: 2400, do: [
            { id: "a5", to: { y: 34 }, dur: 400, yoyo: true, times: 2 }, { id: "k5", to: { o: 1 }, at: 400, dur: 300 }, { id: "s5", to: { o: 1 }, at: 800, dur: 1 }, { id: "s5", draw: true, at: 800, dur: 1200 }
          ] },
          { caption: "یکی دیگر: پنج و یک می‌شود شش.", key: 2000, do: [
            { id: "a6", to: { y: 34 }, dur: 400, yoyo: true, times: 2 }, { id: "k6", to: { o: 1 }, at: 400, dur: 300 }, { id: "s6", to: { o: 1 }, at: 800, dur: 1 }, { id: "s6", draw: true, at: 800, dur: 900 }
          ] }
        ],
        question: "چند سیب بود؟", options: [{ label: "۵", value: 5 }, { label: "۶", value: 6 }, { label: "۷", value: 7 }], answer: 6 },
      { type: "count", thing: "🐔", n: 4, options: [3, 4, 5] },
      { type: "count", thing: "🐑", n: 3, options: [2, 3, 4] },
      { type: "choose", prompt: "کدام بیشتر است؟", say: "مرغ‌ها چهار تا، گاوها دو تا، گوسفندها سه تا. کدام بیشتر است؟",
        show: "🐔🐔🐔🐔 🐄🐄 🐑🐑🐑", pic: true, options: ["🐄", "🐔", "🐑"], answer: "🐔" },
      { type: "choose", prompt: "مرغ‌ها چند تا از گاوها بیشترند؟", say: "مرغ‌ها چهار تا هستند و گاوها دو تا. مرغ‌ها چند تا از گاوها بیشترند؟",
        show: "🐔🐔🐔🐔 🐄🐄", options: [{ label: "۱", value: 1 }, { label: "۲", value: 2 }, { label: "۳", value: 3 }], answer: 2 },
      { type: "unplugged", text: "یک سؤال بپرسید که با شمردن جواب می‌گیرد: «در خانه ما کدام بیشتر است، قاشق یا چنگال؟» یا «امروز از پنجره چند ماشین قرمز و چند ماشین سفید رد شد؟» برای هر چیز روی کاغذ یک خط بکشید و پنجمی را کج روی چهار تا. آخر بپرسید: «کدام بیشتر بود؟ چند تا بیشتر؟»" }
    ]
  },
  {
    id: "think-sprout-15", subject: "think", level: "sprout", emoji: "🖥️", title: "اجزای رایانه",
    steps: [
      /* Inputs on the left send a dot along their wire into the computer; the computer sends dots out to the
         screen and the speaker on the right. Drawings: js/art/rig-think.js (and the keyboard and screen of
         think-seed-13). */
      { type: "scene", prompt: "چه چیزی به رایانه می‌رود و چه چیزی بیرون می‌آید؟", bg: "#f4ecdf",
        parts: {
          links: { art: "tk-links" }, pc: { art: "tk-pc", at: [80, 46], s: 1.1 },
          keys: { art: "tk-keyboard", at: [28, 28], s: 0.9 }, mic: { art: "tk-mic", at: [30, 60] }, cam: { art: "📷", at: [30, 86], s: 0.7 },
          screen: { art: "tk-monitor", at: [132, 38], s: 0.62 }, spk: { art: "tk-speaker", at: [132, 86] },
          d1: { art: "tk-dot", at: [44, 26], o: 0 }, d2: { art: "tk-dot", at: [40, 52], o: 0 }, d3: { art: "tk-dot", at: [40, 76], o: 0 },
          d4: { art: "tk-dot", at: [96, 42], o: 0 }, d5: { art: "tk-dot", at: [96, 50], o: 0 },
          voice: { art: "en-sound", at: [23, 46], o: 0, flip: true }, out: { art: "en-sound", at: [142, 72], o: 0 },
          gin: { art: "tk-group", at: [12, 56], o: 0, s: 1.1 }, gout: { art: "tk-group", at: [152, 56], o: 0, s: 1.1, flip: true }
        },
        scenes: [
          { caption: "صفحه‌کلید چیزی به رایانه می‌دهد: حرف‌هایی که می‌زنیم.", key: 2000, do: [
            { id: "keys.k1", to: { y: 0.8 }, dur: 200, yoyo: true, times: 2 }, { id: "keys.k3", to: { y: 0.8 }, at: 400, dur: 200, yoyo: true, times: 2 },
            { id: "d1", to: { o: 1 }, at: 700, dur: 200 }, { id: "d1", path: "M44 26L64 40", at: 800, dur: 1300 },
            { id: "d1", to: { o: 0 }, at: 2100, dur: 300 }, { id: "pc", to: { s: 1.2 }, at: 2000, dur: 300, yoyo: true, times: 2 }
          ] },
          { caption: "میکروفون صدای ما را به رایانه می‌دهد.", key: 2000, do: [
            { id: "voice", to: { o: 1 }, dur: 300 }, { id: "voice", to: { s: 1.2 }, at: 300, dur: 400, yoyo: true, times: 4 },
            { id: "d2", to: { o: 1 }, at: 700, dur: 200 }, { id: "d2", path: "M40 52H64", at: 800, dur: 1300 },
            { id: "d2", to: { o: 0 }, at: 2100, dur: 300 }, { id: "voice", to: { o: 0 }, at: 2100, dur: 300 }, { id: "pc", to: { s: 1.2 }, at: 2000, dur: 300, yoyo: true, times: 2 }
          ] },
          { caption: "دوربین تصویر ما را به رایانه می‌دهد.", key: 2000, do: [
            { emit: "spark", where: [30, 76], spread: [8, 6], n: 5, dur: 300, life: 700 },
            { id: "d3", to: { o: 1 }, at: 700, dur: 200 }, { id: "d3", path: "M40 76L64 54", at: 800, dur: 1300 },
            { id: "d3", to: { o: 0 }, at: 2100, dur: 300 }, { id: "pc", to: { s: 1.2 }, at: 2000, dur: 300, yoyo: true, times: 2 }
          ] },
          { caption: "صفحه‌نمایش از رایانه تصویر می‌گیرد و به ما نشان می‌دهد.", key: 2600, do: [
            { id: "d4", to: { o: 1 }, dur: 200 }, { id: "d4", path: "M96 42L118 30", at: 100, dur: 1300 },
            { id: "d4", to: { o: 0 }, at: 1400, dur: 300 }, { id: "screen.on", to: { o: 1 }, at: 1500, dur: 500 }
          ] },
          { caption: "بلندگو از رایانه صدا می‌گیرد و به گوش ما می‌رساند.", key: 2200, do: [
            { id: "d5", to: { o: 1 }, dur: 200 }, { id: "d5", path: "M96 50L118 72", at: 100, dur: 1300 },
            { id: "d5", to: { o: 0 }, at: 1400, dur: 300 }, { id: "out", to: { o: 1 }, at: 1500, dur: 300 }, { id: "out", to: { s: 1.2 }, at: 1800, dur: 400, yoyo: true, times: 4 }
          ] },
          { caption: "این‌ها که چیزی به رایانه می‌دهند «ورودی»اند. این‌ها که از رایانه چیزی به ما می‌دهند «خروجی»اند.", key: 3200, do: [
            { id: "gin", to: { o: 1 }, dur: 500 }, { id: "keys", to: { s: 1 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "mic", to: { s: 1.1 }, at: 300, dur: 400, yoyo: true, times: 2 }, { id: "cam", to: { s: 0.8 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "gout", to: { o: 1 }, at: 1800, dur: 500 }, { id: "screen", to: { s: 0.7 }, at: 2100, dur: 400, yoyo: true, times: 2 },
            { id: "spk", to: { s: 1.1 }, at: 2100, dur: 400, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "pairs", prompt: "هر قسمت را به کارش برسان", say: "هر قسمت را به کارش برسان: نوشتن، شنیدن، دیدن، عکس گرفتن.",
        pairs: [[{ pic: "⌨️", say: "صفحه‌کلید" }, { pic: "✏️", say: "نوشتن" }], [{ pic: "🎤", say: "میکروفون" }, { pic: "🗣️", say: "حرف زدن" }],
          [{ pic: "📷", say: "دوربین" }, { pic: "🙂", say: "عکس ما" }], [{ pic: "🖥️", say: "صفحه‌نمایش" }, { pic: "👀", say: "دیدن" }]] },
      { type: "sort", prompt: "کدام به رایانه چیزی می‌دهد (ورودی)؟ کدام از رایانه به ما چیزی می‌دهد (خروجی)؟",
        baskets: [{ pic: "📥", label: "ورودی", value: "in" }, { pic: "📤", label: "خروجی", value: "out" }],
        items: [{ pic: "⌨️", say: "صفحه‌کلید", basket: "in" }, { pic: "🖥️", say: "صفحه‌نمایش", basket: "out" }, { pic: "🎤", say: "میکروفون", basket: "in" },
          { pic: "🔈", say: "بلندگو", basket: "out" }, { pic: "📷", say: "دوربین", basket: "in" }, { pic: "🖱️", say: "موس", basket: "in" }] },
      { type: "choose", prompt: "روی تلفن، با کدام عکس می‌گیریم؟", say: "روی تلفن، با کدام عکس می‌گیریم؟", pic: true,
        options: ["🔈", "📷", "🖥️"], answer: "📷" },
      { type: "unplugged", text: "رایانه یا تلفن خانه را با هم نگاه کنید و قسمت‌هایش را پیدا کنید: صفحه، دکمه‌ها یا صفحه‌کلید، بلندگو (جایی که صدا بیرون می‌آید)، میکروفون (سوراخ کوچکی که صدا را می‌گیرد) و دوربین. برای هر کدام بپرسید: «این چیزی به دستگاه می‌دهد یا از دستگاه چیزی به ما می‌دهد؟» بازی کنید: شما «رایانه» شوید؛ کودک با حرف زدن (میکروفون) یا نشان دادن کاغذ (دوربین) به شما چیزی بدهد و شما با حرف یا نقاشی (بلندگو، صفحه) جواب بدهید." }
    ]
  },
  {
    id: "think-sprout-16", subject: "think", level: "sprout", emoji: "🔋", title: "دستگاه کار نمی‌کند!",
    steps: [
      /* Two everyday problems with a tablet and their first fixes: the sound is off (turn it up), the screen is dark
         (the battery is empty: Mum plugs the charger in). Then: if it still does not work, tell a grown-up.
         Drawings: js/art/rig-think.js; Sara and her mother from js/art/rig-english.js. */
      { type: "scene", prompt: "تبلت کار نمی‌کند. چه کار کنیم؟", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, table: { art: "tk-table", at: [80, 89], sx: 0.9 },
          pad: { art: "tk-bigpad", at: [80, 68], s: 0.75 },
          plug: { art: "tk-charger", at: [150, 50], o: 0 }, waves: { art: "en-sound", at: [106, 46], o: 0 },
          sara: { art: "en-sara", at: [28, 88], s: 1.15 }, mom: { art: "en-mother", at: [136, 88], s: 1.1, o: 0 }
        },
        scenes: [
          { caption: "تبلت صدا ندارد. نگاه کن: علامت «بی‌صدا» روی صفحه است.", key: 2200, do: [
            { id: "pad.mute", to: { o: 1 }, at: 300, dur: 400 }, { id: "pad.mute", to: { s: 1.15 }, at: 900, dur: 400, yoyo: true, times: 4 }
          ].concat(TK.face("sara", false, 1200)) },
          { caption: "دکمه صدا را می‌زنیم و صدا را بلند می‌کنیم. حالا صدا می‌آید!", key: 3400, do: [
            { id: "pad.volbtn", to: { x: 1 }, dur: 250, yoyo: true, times: 4 },
            { id: "pad.mute", to: { o: 0 }, at: 900, dur: 300 }, { id: "pad.vol", to: { o: 1 }, at: 900, dur: 300 },
            { id: "pad.volfill", to: { sx: 0.15 }, at: 900, dur: 1 }, { id: "pad.volfill", to: { sx: 0.85 }, at: 1100, dur: 1400 },
            { id: "waves", to: { o: 1 }, at: 2400, dur: 300 }, { id: "waves", to: { s: 1.2 }, at: 2700, dur: 400, yoyo: true, times: 4 }
          ].concat(TK.face("sara", true, 2600)) },
          { caption: "یک روز دیگر صفحه سیاه است و روشن نمی‌شود.", key: 2200, do: [
            { id: "waves", to: { o: 0 }, dur: 300 }, { id: "pad.vol", to: { o: 0 }, dur: 300 },
            { id: "pad.dark", to: { o: 1 }, at: 500, dur: 600 }
          ].concat(TK.face("sara", false, 1300)) },
          { caption: "شاید باتری تمام شده است. مامان شارژر را وصل می‌کند.", key: 3100, do: [
            { id: "pad.batt", to: { o: 1 }, dur: 400 }, { id: "pad.level", to: { sx: 0.12 }, dur: 1 },
            { id: "pad.low", to: { o: 0.2 }, at: 400, dur: 400, yoyo: true, times: 4 },
            { id: "mom", to: { o: 1 }, at: 600, dur: 600 },
            { id: "plug", to: { o: 1 }, at: 1600, dur: 300 }
          ].concat(TK.pose("mom", "L", "give", 1600, 800), [{ id: "plug", to: { x: 103.5 }, at: 1900, dur: 1300 }], TK.pose("mom", "L", "down", 3400, 600)) },
          { caption: "باتری کم‌کم پر می‌شود و تبلت دوباره روشن می‌شود.", key: 2700, do: [
            { id: "pad.low", to: { o: 0 }, dur: 300 }, { id: "pad.level", to: { sx: 1 }, at: 200, dur: 2400 },
            { id: "pad.batt", to: { o: 0 }, at: 2900, dur: 400 }, { id: "pad.dark", to: { o: 0 }, at: 2900, dur: 500 }
          ].concat(TK.face("sara", true, 3000)) },
          { caption: "اگر باز هم درست نشد، خودمان دست نمی‌زنیم و به یک بزرگ‌تر می‌گوییم.", key: 2400, do: TK.pose("sara", "R", "point", 0, 800).concat(TK.talk("sara", 400, 1800), [
            { id: "mom.head", to: { y: 1.2 }, at: 2300, dur: 350, yoyo: true, times: 4 }
          ], TK.talk("mom", 2300, 1200)) }
        ] },
      { type: "choose", prompt: "صدای تلفن نمی‌آید. اول چه کار کنیم؟", say: "صدای تلفن نمی‌آید. اول چه کار کنیم؟ صدا را بلند کنیم، یا تلفن را تکان بدهیم؟",
        options: [{ label: "🔊 صدا را بلند می‌کنیم", value: "vol" }, { label: "🫨 تکانش می‌دهیم", value: "shake" }], answer: "vol" },
      { type: "choose", prompt: "صفحه تبلت سیاه است و روشن نمی‌شود. شاید چه شده؟", say: "صفحه تبلت سیاه است و روشن نمی‌شود. شاید چه شده؟ باتری تمام شده، یا تبلت خوابش می‌آید؟",
        options: [{ label: "🪫 باتری تمام شده", value: "batt" }, { label: "😴 تبلت خوابش می‌آید", value: "sleep" }], answer: "batt" },
      { type: "choose", prompt: "کدام باتری خالی است؟", say: "کدام باتری خالی است؟", pic: true,
        options: ["🔋", "🪫"], answer: "🪫" },
      { type: "choose", prompt: "شارژر را وصل کردیم ولی باز هم کار نمی‌کند. حالا چه کار کنیم؟", say: "شارژر را وصل کردیم ولی باز هم کار نمی‌کند. حالا چه کار کنیم؟ بازش کنیم و درونش را ببینیم، یا به یک بزرگ‌تر بگوییم؟",
        options: [{ label: "🔧 بازش می‌کنیم", value: "open" }, { label: "🗣️ به یک بزرگ‌تر می‌گوییم", value: "tell" }], answer: "tell" },
      { type: "unplugged", text: "با هم «دکتر دستگاه» بازی کنید: شما بگویید «دستگاه من مریض است: صدا ندارد» یا «روشن نمی‌شود» یا «تصویرش تکان نمی‌خورد»، و کودک بگوید اول چه کار کنیم (صدا را بلند کنیم، شارژ کنیم، صبر کنیم). یادآوری کنید که شارژر و پریز کار بزرگ‌ترهاست، و اگر دستگاهی داغ شد یا بوی سوختگی داد، نباید دست زد و باید فوراً به بزرگ‌ترها گفت." }
    ]
  },
  {
    id: "think-sprout-17", subject: "think", level: "sprout", emoji: "🔑", title: "رمز عبور",
    steps: [
      /* A password is a key to a door: the key opens the door to our photos and games; only Mum and Dad are given
         the key; when we finish we close the door and lock it (logging out). Drawings: js/art/rig-think.js; the
         people from js/art/rig-english.js. */
      { type: "scene", prompt: "رمز عبور چیست؟", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, doorway: { art: "tk-doorway" }, leaf: { art: "tk-leaf", at: [60, 30] },
          sara: { art: "en-sara", at: [28, 88], s: 1.1 }, key: { art: "tk-key", at: [36, 64] },
          mom: { art: "en-mother", at: [122, 88], s: 0.95 }, dad: { art: "en-father", at: [146, 88], s: 0.95 }
        },
        scenes: [
          { caption: "رمز عبور مثل کلید یک در است.", key: 2600, do: TK.pose("sara", "R", "point", 0, 700).concat([
            { id: "key", path: "M36 64Q60 50 92 58", at: 700, dur: 1500 }, { id: "key", to: { r: 90 }, at: 2300, dur: 500 }
          ]) },
          { caption: "با کلید، در باز می‌شود. پشت در، عکس‌ها و بازی‌های ما هستند.", key: 2600, do: [
            { id: "key", to: { o: 0 }, dur: 300 }, { id: "leaf", to: { sx: 0.12 }, at: 400, dur: 1500 }
          ].concat(TK.face("sara", true, 1600)) },
          { caption: "این کلید را به هر کسی نمی‌دهیم. فقط مامان و بابا رمز را می‌دانند.", key: 3200, do: TK.pose("sara", "R", "down", 0, 600).concat([
            { id: "key", to: { x: 134, y: 40, r: 0 }, at: 300, dur: 1 }, { id: "key", to: { o: 1 }, at: 400, dur: 400 },
            { id: "key", to: { y: 34 }, at: 900, dur: 500, yoyo: true, times: 4 }
          ], TK.face("mom", true, 1000), TK.face("dad", true, 1000), [
            { id: "mom.head", to: { y: 1.2 }, at: 2200, dur: 350, yoyo: true, times: 2 }, { id: "dad.head", to: { y: 1.2 }, at: 2200, dur: 350, yoyo: true, times: 2 }
          ]) },
          { caption: "کارمان که تمام شد، در را می‌بندیم و قفل می‌کنیم. به این می‌گویند «خروج».", key: 3200, do: [
            { id: "key", to: { o: 0 }, dur: 300 },
            { id: "leaf", to: { sx: 1 }, at: 300, dur: 1400 }, { id: "leaf.locked", to: { o: 1 }, at: 2000, dur: 400 },
            { id: "leaf.locked", to: { s: 1.15 }, at: 2400, dur: 300, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "sort", prompt: "چه کسی می‌تواند رمز تبلت تو را بداند؟",
        baskets: [{ pic: "✅", label: "می‌تواند بداند", value: "yes" }, { pic: "🚫", label: "نباید بداند", value: "no" }],
        items: [{ pic: "👩", label: "مامان", say: "مامان", basket: "yes" }, { pic: "🧒", label: "دوستم", say: "دوستم", basket: "no" },
          { pic: "👨", label: "بابا", say: "بابا", basket: "yes" }, { pic: "🧍", label: "همسایه", say: "همسایه", basket: "no" },
          { pic: "💬", label: "کسی در اینترنت", say: "کسی که در اینترنت پیام می‌دهد", basket: "no" }] },
      { type: "choose", prompt: "دوستت می‌پرسد: «رمز تبلتت چیست؟» چه کار کنیم؟", say: "دوستت می‌پرسد: رمز تبلتت چیست؟ رمز را به او می‌گوییم، یا می‌گوییم رمز مال خودم و مامان و باباست؟",
        options: [{ label: "🤐 رمز مال من و مامان و باباست", value: "keep" }, { label: "🗣️ رمز را به او می‌گوییم", value: "tell" }], answer: "keep" },
      { type: "choose", prompt: "بازی‌ات روی تبلت تمام شد. آخرش چه کار کنیم؟", say: "بازی‌ات روی تبلت تمام شد. آخرش چه کار کنیم؟ خروج را می‌زنیم، یا همین‌طور باز می‌گذاریم؟",
        options: [{ label: "🔓 همین‌طور باز می‌گذاریم", value: "open" }, { label: "🚪 «خروج» را می‌زنیم", value: "logout" }], answer: "logout" },
      { type: "choose", prompt: "رمز عبور مثل کدام است؟", say: "رمز عبور مثل کدام است؟", pic: true,
        options: ["🔑", "🎈", "🍎"], answer: "🔑" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["رمز دستگاه‌های کودک را خودتان بسازید و نگه دارید؛ کودک می‌تواند بداند، اما یاد بگیرد که به هیچ‌کس جز شما نگوید.",
          "اگر کودک روی دستگاه مشترک یا در مدرسه وارد حسابی می‌شود، با هم «خروج» را تمرین کنید.",
          "اگر کسی (حتی یک دوست) رمز را خواست، کودک بداند که می‌تواند بگوید «رمز مال من و پدر و مادرم است» و به شما خبر بدهد."] },
      { type: "unplugged", text: "یک «در رمزدار» بسازید: یک جعبه یا کشو که فقط با یک کلمه رمز باز می‌شود. شما و کودک یک رمز بسازید (مثلاً «هندوانه آبی») و فقط وقتی کسی رمز را درست گفت، در را باز کنید. بعد یک عروسک بیاید و رمز را بپرسد؛ کودک چه می‌گوید؟ آخر بازی، در را «قفل» کنید و بگویید: «خروج!»" }
    ]
  },
  {
    id: "think-sprout-18", subject: "think", level: "sprout", emoji: "💌", title: "پیام مهربان",
    steps: [
      /* Messages fly between two homes (a wall in between): Sara sends grandma a heart, grandma answers with a
         flower; an unkind message comes, Sara does not answer, puts the phone down and tells her mother.
         Drawings: js/art/rig-think.js; the people from js/art/rig-english.js. */
      { type: "scene", prompt: "پیام‌ها", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, split: { art: "tk-split" },
          table: { art: "tk-table", at: [40, 89], s: 0.6 },
          sara: { art: "en-sara", at: [60, 88], s: 1.15 }, phone: { art: "tk-phone-s", at: [60, 71], s: 0.8 },
          gran: { art: "en-grandma", at: [134, 88], s: 1 }, gphone: { art: "tk-phone-s", at: [134, 67], s: 0.8 },
          heart: { art: "tk-msg-heart", at: [74, 46], o: 0 }, rose: { art: "tk-msg-rose", at: [118, 38], o: 0 }, mean: { art: "tk-msg-mean", at: [86, 20], o: 0 },
          mom: { art: "en-mother", at: [20, 88], s: 1.05, o: 0 }
        },
        scenes: [
          { caption: "سارا برای مادربزرگ یک پیام مهربان می‌فرستد: یک قلب.", key: 3000, do: TK.both("sara", "chest", 0, 1).concat(TK.both("gran", "chest", 0, 1), [
            { id: "phone.lit", to: { o: 1 }, at: 300, dur: 300 }, { id: "heart", to: { o: 1 }, at: 700, dur: 300 },
            { id: "heart", path: "M74 46Q98 10 118 38", at: 1100, dur: 1800 }, { id: "gphone.lit", to: { o: 1 }, at: 2800, dur: 300 }
          ]) },
          { caption: "مادربزرگ خوشحال می‌شود و با یک گل جواب می‌دهد.", key: 3000, do: [
            { id: "heart", to: { o: 0 }, dur: 300 }
          ].concat(TK.talk("gran", 300, 1200), [
            { id: "rose", to: { o: 1 }, at: 1400, dur: 300 }, { id: "rose", path: "M118 38Q98 10 76 44", at: 1700, dur: 1800 }
          ], TK.face("sara", true, 3300)) },
          { caption: "یک روز یک پیام زشت و ناراحت‌کننده می‌آید.", key: 2600, do: [
            { id: "rose", to: { o: 0 }, dur: 300 }, { id: "mean", to: { o: 1 }, at: 600, dur: 300 },
            { id: "mean", path: "M90 18Q84 30 77 44", at: 900, dur: 1300 }
          ].concat(TK.face("sara", false, 2200)) },
          { caption: "سارا جواب نمی‌دهد. تلفن را کنار می‌گذارد.", key: 2600, do: [
            { id: "mean", to: { o: 0 }, dur: 300 }, { id: "phone.lit", to: { o: 0 }, at: 300, dur: 300 },
            { id: "phone", path: "M60 71Q50 66 40 74", at: 600, dur: 1200 }, { id: "phone", to: { r: -90 }, at: 1300, dur: 500 }
          ].concat(TK.both("sara", "down", 700, 800)) },
          { caption: "بعد به مامان می‌گوید. مامان کمک می‌کند.", key: 3000, do: [
            { id: "mom", to: { o: 1 }, dur: 600 }
          ].concat(TK.talk("sara", 600, 1600), TK.pose("mom", "R", "give", 2100, 700), TK.talk("mom", 2300, 1200), TK.face("sara", true, 2800)) }
        ] },
      { type: "sort", prompt: "پیام مهربان یا پیام نامهربان؟ هر کدام را بزن تا بشنوی.",
        baskets: [{ pic: "💛", label: "مهربان", value: "kind" }, { pic: "💔", label: "نامهربان", value: "unkind" }],
        items: [{ pic: "❤️", label: "دوستت دارم", say: "دوستت دارم", basket: "kind" }, { pic: "😠", label: "تو بدی", say: "تو بدی", basket: "unkind" },
          { pic: "🎂", label: "تولدت مبارک", say: "تولدت مبارک", basket: "kind" }, { pic: "👎", label: "نقاشیت زشت است", say: "نقاشیت زشت است", basket: "unkind" },
          { pic: "👏", label: "آفرین!", say: "آفرین", basket: "kind" }, { pic: "🙊", label: "با تو بازی نمی‌کنیم", say: "با تو بازی نمی‌کنیم", basket: "unkind" }] },
      { type: "choose", prompt: "یک پیام ترسناک آمد. اول چه کار کنیم؟", say: "یک پیام ترسناک آمد. اول چه کار کنیم؟ جوابش را می‌دهیم، یا دست نگه می‌داریم و جواب نمی‌دهیم؟",
        options: [{ label: "✋ دست نگه می‌داریم و جواب نمی‌دهیم", value: "stop" }, { label: "⌨️ جوابش را می‌دهیم", value: "reply" }], answer: "stop" },
      { type: "choose", prompt: "بعد چه کار کنیم؟", say: "بعد چه کار کنیم؟ به مامان یا بابا می‌گوییم، یا پیام را پنهان می‌کنیم؟",
        options: [{ label: "🙈 پیام را پنهان می‌کنیم", value: "hide" }, { label: "🗣️ به مامان یا بابا می‌گوییم", value: "tell" }], answer: "tell" },
      { type: "choose", prompt: "دوستت نقاشی‌اش را برایت فرستاده. کدام جواب مهربان است؟", say: "دوستت نقاشی‌اش را برایت فرستاده. کدام جواب مهربان است؟ چه قشنگ! یا: این چیه؟",
        options: [{ label: "😍 چه قشنگ!", value: "kind" }, { label: "🙄 این چیه؟", value: "unkind" }], answer: "kind" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["پیام‌ها را با کودک با هم بفرستید و بخوانید؛ کودک در این سن نباید تنهایی با کسی پیام‌بازی کند.",
          "قانون سه‌قدمی را با هم تکرار کنید: «دست نگه دار، جواب نده، به بزرگ‌تر بگو.»",
          "اگر کودک پیام بدی را به شما نشان داد، آرام بمانید و از او تشکر کنید؛ سرزنش نکنید و دستگاه را از او نگیرید، تا دفعه بعد هم بگوید.",
          "درباره امنیت با آدم‌ها در اینترنت، درس‌های «سلامت و ایمنی» را هم ببینید."] },
      { type: "unplugged", text: "با هم برای یکی از اقوام یک پیام مهربان بفرستید (یک نقاشی، یک صدای ضبط‌شده یا یک جمله) و ببینید چه جوابی می‌دهد و چه حسی دارد. بعد با عروسک‌ها نمایش بدهید: یک عروسک پیام نامهربان می‌فرستد. کودک سه قدم را نشان بدهد: دست نگه دار، جواب نده، به بزرگ‌تر بگو." }
    ]
  },
  {
    id: "think-sprout-19", subject: "think", level: "sprout", emoji: "🕵️", title: "معمای سرنخ",
    steps: [
      { type: "choose", prompt: "سارا، آرش و لیلا هر کدام یک حیوان دارند: گربه، سگ، ماهی. سرنخ ۱: حیوان سارا در آب زندگی می‌کند. سرنخ ۲: حیوان آرش میو نمی‌کند. حیوان لیلا کدام است؟",
        say: "سارا، آرش و لیلا هر کدام یک حیوان دارند: گربه، سگ، ماهی. سرنخ یک: حیوان سارا در آب زندگی می‌کند. سرنخ دو: حیوان آرش میو نمی‌کند. حیوان لیلا کدام است؟",
        pic: true, options: ["🐟", "🐶", "🐱"], answer: "🐱" },
      { type: "choose", prompt: "در همین معما، اول حیوان چه کسی معلوم شد؟", say: "در همین معما، اول حیوان چه کسی معلوم شد؟",
        options: [{ label: "سارا 🐟", value: "sara" }, { label: "آرش 🐶", value: "arash" }, { label: "لیلا 🐱", value: "leila" }], answer: "sara" },
      { type: "choose", prompt: "سه بچه، سه میوه: سیب، موز، انگور. سرنخ ۱: رضا میوه زرد دارد. سرنخ ۲: مریم انگور ندارد. میوه نگار کدام است؟",
        say: "سه بچه، سه میوه: سیب، موز، انگور. سرنخ یک: رضا میوه زرد دارد. سرنخ دو: مریم انگور ندارد. میوه نگار کدام است؟",
        pic: true, options: ["🍎", "🍇", "🍌"], answer: "🍇" },
      { type: "choose", prompt: "لیلا از آرش بلندتر است. سارا از لیلا بلندتر است. چه کسی از همه بلندتر است؟", say: "لیلا از آرش بلندتر است. سارا از لیلا بلندتر است. چه کسی از همه بلندتر است؟",
        options: [{ label: "آرش", value: "arash" }, { label: "سارا", value: "sara" }, { label: "لیلا", value: "leila" }], answer: "sara" },
      // Mazes drawn in js/art/rig-think.js ("🐭‍🧀", "🐝‍🌼").
      { type: "choose", prompt: "کدام راه موش را به پنیر می‌رساند؟ با انگشت دنبالش کن.", say: "کدام راه موش را به پنیر می‌رساند؟ با انگشت دنبالش کن.",
        show: "🐭‍🧀", pic: true, options: ["🔵", "🟢", "🔴"], answer: "🔴" },
      { type: "choose", prompt: "کدام راه زنبور را به گل می‌رساند؟", say: "کدام راه زنبور را به گل می‌رساند؟",
        show: "🐝‍🌼", pic: true, options: ["🔴", "🔵", "🟢"], answer: "🔵" },
      { type: "unplugged", text: "یک معمای سرنخ برای کودک بسازید: سه اسباب‌بازی را زیر سه لیوان پنهان کنید و دو سرنخ بدهید («ماشین زیر لیوان قرمز نیست»، «توپ وسط است»). کودک حدس بزند هر کدام کجاست و بگوید از کدام سرنخ فهمید. بعد او برای شما معما بسازد. روی کاغذ هم یک راه‌پیچ ساده بکشید و بگذارید راه درست را با مداد پیدا کند." }
    ]
  },

  // ---------------- Thinking: Sapling (turning, forward-and-turn coding, repeat, sorting) ----------------
  {
    id: "think-sapling-1", subject: "think", level: "sapling", emoji: "🧭", title: "به چپ بچرخ، به راست بچرخ",
    steps: [
      { type: "choose", prompt: "ربات رو به بالاست. اگر به راست بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به بالاست. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬆️", pic: true, options: ["⬅️", "➡️", "⬇️"], answer: "➡️" },
      { type: "choose", prompt: "ربات رو به راست است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به راست است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖➡️", pic: true, options: ["⬆️", "⬇️", "⬅️"], answer: "⬇️" },
      { type: "choose", prompt: "ربات رو به پایین است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟ (فکر کن خودت جای او هستی.)", say: "ربات رو به پایین است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬇️", pic: true, options: ["➡️", "⬅️", "⬆️"], answer: "⬅️" },
      { type: "choose", prompt: "ربات رو به چپ است. اگر دو بار به چپ بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به چپ است. اگر دو بار به چپ بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬅️", pic: true, options: ["⬆️", "➡️", "⬇️"], answer: "➡️" },
      { type: "code", blocks: "turn", face: "up",
        prompt: "مثلث روی ربات نشان می‌دهد رو به کجاست. ربات را به ستاره برسان.", goalPic: "⭐",
        size: [3, 3], start: [0, 2], goal: [2, 2] },
      { type: "unplugged", text: "بازی «ربات بچرخ»: کودک بایستد. بگویید «به راست بچرخ»، «به چپ بچرخ»، «دو قدم جلو برو» و بعد بپرسید: «حالا رو به کجا هستی؟ پنجره؟ در؟» بعد جایتان را عوض کنید. اگر چپ و راست را گم می‌کند، یک کش یا روبان به مچ دست راستش ببندید." }
    ]
  },
  {
    id: "think-sapling-2", subject: "think", level: "sapling", emoji: "🤖", title: "جلو برو، بچرخ",
    steps: [
      { type: "code", blocks: "turn", face: "up", prompt: "ربات را به ستاره برسان", goalPic: "⭐",
        size: [4, 4], start: [0, 3], goal: [0, 0] },
      { type: "code", blocks: "turn", face: "up", prompt: "ربات اول باید بچرخد. به ستاره برسانش.", goalPic: "⭐",
        size: [4, 4], start: [0, 3], goal: [3, 3] },
      { type: "code", blocks: "turn", face: "right", prompt: "ربات را به ستاره برسان", goalPic: "⭐",
        size: [4, 4], start: [0, 0], goal: [3, 3], walls: [[1, 1], [1, 2], [1, 3], [2, 1]] },
      { type: "code", blocks: "turn", face: "down", prompt: "ربات را از میان سنگ‌ها به ستاره برسان", goalPic: "⭐",
        size: [5, 3], start: [0, 0], goal: [4, 2], walls: [[1, 0], [1, 1], [3, 1], [3, 2]] },
      { type: "unplugged", text: "حالا شما ربات هستید و فقط سه دستور را می‌فهمید: «یک قدم جلو»، «به راست بچرخ» و «به چپ بچرخ». کودک باید شما را از اتاق به آشپزخانه ببرد. هر دستور را دقیقاً اجرا کنید. اگر جلویتان دیوار یا مبل بود، بایستید و بگویید «بوق! راه بسته است.»" }
    ]
  },
  {
    id: "think-sapling-6", subject: "think", level: "sapling", emoji: "🕹️", title: "بازی ربات",
    steps: [
      { type: "code", blocks: "turn", face: "left", goalPic: "⭐",
        prompt: "ربات رو به چپ است. از کنار سنگ رد شو و به ستاره برس.",
        size: [5, 5], start: [4, 2], goal: [0, 2], walls: [[2, 2]] },
      { type: "code", blocks: "turn", face: "down", goalPic: "⭐",
        prompt: "ربات رو به پایین است. به ستاره برسانش.",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[0, 3], [2, 1], [3, 1], [4, 1]] },
      { type: "code", blocks: "turn", face: "up", goalPic: "⭐",
        prompt: "ربات رو به بالاست، ولی سنگ‌ها راه را بسته‌اند. دورشان بزن.",
        size: [5, 5], start: [2, 4], goal: [2, 0], walls: [[1, 2], [2, 2], [3, 2]] },
      { type: "code", blocks: "turn", face: "right", goalPic: "⭐",
        prompt: "این برنامه اشکال دارد. اجرایش کن، ببین ربات کجا اشتباه رفت و درستش کن.",
        size: [5, 5], start: [0, 4], goal: [4, 0], given: ["fwd", "fwd", "fwd", "fwd", "cw", "fwd", "fwd", "fwd", "fwd"] },
      { type: "code", blocks: "turn", face: "left", goalPic: "⭐",
        prompt: "این برنامه هم اشکال دارد. درستش کن.",
        size: [5, 5], start: [4, 0], goal: [0, 4], given: ["fwd", "fwd", "fwd", "fwd", "ccw", "fwd", "fwd", "fwd"] },
      { type: "unplugged", text: "بازی «ربات‌های چرخان»: روی کف اتاق با نوار چسب یا با کاشی‌ها یک جدول ۵ در ۵ بسازید. کودک رو به یک طرف بایستد، هر بار یک طرف تازه (نه همیشه رو به جلو!). شما برنامه را با «جلو»، «به راست بچرخ» و «به چپ بچرخ» بگویید و او اجرا کند. بعد جایتان را عوض کنید. هر بار که به هدف نرسید، با هم دنبال قطعه‌ای بگردید که اشتباه بود." }
    ]
  },
  {
    id: "think-sapling-3", subject: "think", level: "sapling", emoji: "🔁", title: "تکرار",
    steps: [
      /* The same «جلو» four times, then one repeat block that does it four times, with a counter. The program
         board looks like the coding game's (first block on the right). Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین ربات چطور به پرچم می‌رسد", bg: "#e4f2e0",
        parts: {
          board: { art: "code-board" }, row: { art: "cell-row" },
          flag: { art: "🚩", at: [125, 71], s: 0.8 }, bot: { art: "🤖", at: [40, 71], s: 0.85 },
          f1: { art: "block-fwd", at: [128, 18], s: 0 }, f2: { art: "block-fwd", at: [108, 18], s: 0 },
          f3: { art: "block-fwd", at: [88, 18], s: 0 }, f4: { art: "block-fwd", at: [68, 18], s: 0 },
          loop: { art: "block-repeat", at: [100, 18], s: 0 }, body: { art: "block-fwd", at: [100, 18], s: 0 },
          now: { art: "block-now", at: [128, 18], o: 0 }, times: { art: "counter", at: [142, 62], o: 0 }
        },
        scenes: [
          { caption: "ربات می‌خواهد به پرچم برسد.", do: [
            { id: "bot", to: { y: "-3" }, at: 400, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "جلو، جلو، جلو، جلو. چهار قطعه، همه مثل هم!", do: [
            { id: "f1", to: { s: 1 }, dur: 350, ease: "back" }, { id: "f2", to: { s: 1 }, at: 600, dur: 350, ease: "back" },
            { id: "f3", to: { s: 1 }, at: 1200, dur: 350, ease: "back" }, { id: "f4", to: { s: 1 }, at: 1800, dur: 350, ease: "back" },
            { id: "now", to: { o: 1 }, at: 2600, dur: 200 },
            { id: "bot", path: "M40 71Q50 63 60 71", at: 2800, dur: 600 },
            { id: "now", to: { x: 108 }, at: 3500, dur: 300 }, { id: "bot", path: "M60 71Q70 63 80 71", at: 3800, dur: 600 },
            { id: "now", to: { x: 88 }, at: 4500, dur: 300 }, { id: "bot", path: "M80 71Q90 63 100 71", at: 4800, dur: 600 },
            { id: "now", to: { x: 68 }, at: 5500, dur: 300 }, { id: "bot", path: "M100 71Q110 63 120 71", at: 5800, dur: 600 }
          ] },
          { caption: "به جای آن، می‌شود گفت: «۴ بار تکرار کن: جلو.»", do: [
            { id: "now", to: { o: 0 }, dur: 300 },
            { id: "bot", to: { o: 0 }, dur: 400 }, { id: "bot", to: { x: 40 }, at: 450, dur: 1 }, { id: "bot", to: { o: 1 }, at: 500, dur: 400 },
            { id: "f1", to: { x: 100 }, at: 1000, dur: 700 }, { id: "f2", to: { x: 100 }, at: 1000, dur: 700 },
            { id: "f3", to: { x: 100 }, at: 1000, dur: 700 }, { id: "f4", to: { x: 100 }, at: 1000, dur: 700 },
            { id: "f1", to: { o: 0 }, at: 1500, dur: 400 }, { id: "f2", to: { o: 0 }, at: 1500, dur: 400 },
            { id: "f3", to: { o: 0 }, at: 1500, dur: 400 }, { id: "f4", to: { o: 0 }, at: 1500, dur: 400 },
            { id: "body", to: { s: 1 }, at: 1700, dur: 400 }, { id: "loop", to: { s: 1 }, at: 1700, dur: 600, ease: "back" }
          ] },
          { caption: "ربات همان «جلو» را ۴ بار تکرار می‌کند: ۱، ۲، ۳، ۴!", do: [
            { id: "now", to: { x: 100 }, dur: 1 }, { id: "now", to: { o: 1 }, dur: 300 }, { id: "times", to: { o: 1 }, dur: 300 },
            { count: "times", from: 1, to: 4, at: 400, dur: 3600 },
            { id: "bot", path: "M40 71Q50 63 60 71", at: 400, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M60 71Q70 63 80 71", at: 1300, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 1300, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M80 71Q90 63 100 71", at: 2200, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 2200, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M100 71Q110 63 120 71", at: 3100, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 3100, dur: 400, yoyo: true, times: 2 },
            { emit: "spark", where: [122, 58], spread: [16, 10], n: 6, at: 3700, dur: 600 }
          ] },
          { caption: "این همان قطعه «تکرار» است. برنامه کوتاه‌تر شد!", do: [
            { id: "now", to: { o: 0 }, dur: 300 }, { id: "times", to: { o: 0 }, dur: 300 },
            { id: "f1", to: { x: 128, y: 42, s: 0.8 }, dur: 1 }, { id: "f2", to: { x: 108, y: 42, s: 0.8 }, dur: 1 },
            { id: "f3", to: { x: 88, y: 42, s: 0.8 }, dur: 1 }, { id: "f4", to: { x: 68, y: 42, s: 0.8 }, dur: 1 },
            { id: "f1", to: { o: 0.5 }, at: 400, dur: 500 }, { id: "f2", to: { o: 0.5 }, at: 400, dur: 500 },
            { id: "f3", to: { o: 0.5 }, at: 400, dur: 500 }, { id: "f4", to: { o: 0.5 }, at: 400, dur: 500 },
            { id: "loop", to: { s: 1.12 }, at: 1400, dur: 700, yoyo: true, times: 2 }, { id: "body", to: { s: 1.12 }, at: 1400, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "با «تکرار»، برنامه کوتاه‌تر شد یا بلندتر؟", options: ["کوتاه‌تر", "بلندتر"], answer: "کوتاه‌تر" },
      { type: "code", blocks: "turn", repeat: true, max: 2, face: "right", goalPic: "🚩",
        prompt: "فقط دو قطعه داری! «تکرار» را بگذار، «جلو» را داخلش بگذار و بزن تا تعدادش درست شود.",
        size: [5, 3], start: [0, 1], goal: [4, 1] },
      { type: "code", blocks: "turn", repeat: true, face: "right", goalPic: "🚩",
        prompt: "این برنامه اشکال دارد. تعداد تکرار را درست کن.",
        size: [5, 5], start: [0, 4], goal: [0, 0], given: ["ccw", { repeat: 3, body: ["fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "پله‌ها را بالا برو! با پنج قطعه به ستاره برس.",
        size: [5, 5], start: [0, 4], goal: [3, 1], walls: [[0, 2], [1, 1], [2, 0], [2, 4], [3, 3], [4, 2]] },
      { type: "unplugged", text: "یک «رقص تکراری» بسازید: «۳ بار تکرار کن: دست بزن، بپر.» کودک برنامه را بگوید و شما اجرا کنید، بعد برعکس. بپرسید: «اگر بخواهیم ۱۰ بار دست بزنیم، کدام کوتاه‌تر است: ده بار گفتن «دست بزن»، یا یک بار گفتن «۱۰ بار تکرار کن: دست بزن»؟»" }
    ]
  },
  {
    id: "think-sapling-7", subject: "think", level: "sapling", emoji: "🪜", title: "تکه تکراری",
    steps: [
      /* The robot climbs stairs; each step of the stairs is the same piece of path (two squares, framed in purple),
         three times; that piece is four blocks, and the program becomes «۳ بار تکرار کن» round them. The program
         reads right to left, like the coding game (js/en/thinking.js moves the blocks for English). Drawings:
         js/art/rig-think.js. */
      { type: "scene", prompt: "ربات از پله‌ها بالا می‌رود", bg: "#e4f2e0",
        parts: {
          stairs: { art: "ts-stairs" }, flag: { art: "🚩", at: [57, 41], s: 0.55 }, bot: { art: "🤖", at: [15, 83], s: 0.55 },
          h1: { art: "ts-hl", at: [22, 63], o: 0 }, h2: { art: "ts-hl", at: [36, 49], o: 0 }, h3: { art: "ts-hl", at: [50, 35], o: 0 },
          times: { art: "counter", at: [36, 16], o: 0 },
          loop: { art: "ts-loop", look: { n: 3, k: 4 }, at: [105, 60], o: 0 },
          b1: { art: "block-fwd", at: [132, 60], s: 0 }, b2: { art: "ts-cw", at: [114, 60], s: 0 },
          b3: { art: "block-fwd", at: [96, 60], s: 0 }, b4: { art: "ts-ccw", at: [78, 60], s: 0 }
        },
        scenes: [
          { caption: "ربات باید از این پله‌ها بالا برود و به پرچم برسد.", do: [
            { id: "bot", to: { y: "-3" }, at: 300, dur: 600, yoyo: true, times: 2 }, { id: "flag", to: { s: 0.52 }, at: 1200, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "ربات پله‌به‌پله بالا می‌رود تا به پرچم برسد.", key: 6000, do: [
            { id: "bot", path: "M15 83V69", at: 200, dur: 700 }, { id: "bot", path: "M15 69H29", at: 1100, dur: 700 },
            { id: "bot", path: "M29 69V55", at: 2000, dur: 700 }, { id: "bot", path: "M29 55H43", at: 2900, dur: 700 },
            { id: "bot", path: "M43 55V41", at: 3800, dur: 700 }, { id: "bot", path: "M43 41H57", at: 4700, dur: 700 },
            { emit: "spark", where: [57, 28], spread: [10, 6], n: 6, at: 5500, dur: 500 }
          ] },
          { caption: "خوب نگاه کن: هر پله مثل پله قبلی است. یک تکه از راه تکرار می‌شود.", key: 3600, do: [
            { id: "bot", to: { o: 0 }, dur: 300 }, { id: "bot", to: { x: 15, y: 83 }, at: 350, dur: 1 }, { id: "bot", to: { o: 1 }, at: 400, dur: 300 },
            { id: "h1", to: { o: 1 }, at: 800, dur: 400 }, { id: "h2", to: { o: 1 }, at: 1800, dur: 400 }, { id: "h3", to: { o: 1 }, at: 2800, dur: 400 }
          ] },
          { caption: "این تکه چند بار تکرار شد؟ یک، دو، سه: سه بار!", key: 4200, do: [
            { id: "times", to: { o: 1 }, dur: 300 }, { count: "times", from: 1, to: 3, at: 300, dur: 2600 },
            { id: "h1", to: { s: 1.15 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "h2", to: { s: 1.15 }, at: 1300, dur: 400, yoyo: true, times: 2 },
            { id: "h3", to: { s: 1.15 }, at: 2300, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "هر تکه چهار قطعه است: جلو، به راست بچرخ، جلو، به چپ بچرخ.", key: 3400, do: [
            { id: "b1", to: { s: 1 }, dur: 350, ease: "back" }, { id: "b2", to: { s: 1 }, at: 700, dur: 350, ease: "back" },
            { id: "b3", to: { s: 1 }, at: 1400, dur: 350, ease: "back" }, { id: "b4", to: { s: 1 }, at: 2100, dur: 350, ease: "back" },
            { id: "h1", to: { s: 1.15 }, at: 2800, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "پس برنامه کوتاه می‌شود: «۳ بار تکرار کن» و آن چهار قطعه داخلش.", key: 2600, do: [
            { id: "loop", to: { o: 1 }, dur: 600 }, { id: "loop", to: { s: 1.06 }, at: 900, dur: 500, yoyo: true, times: 2 },
            { id: "times", to: { o: 0 }, at: 900, dur: 400 }
          ] }
        ],
        question: "تکه تکراری چند بار تکرار شد؟", options: [{ label: "۲", value: 2 }, { label: "۳", value: 3 }, { label: "۴", value: 4 }], answer: 3 },
      { type: "pattern", prompt: "ربات پله‌ها را این‌طور بالا می‌رود. بعدی‌ها کدام‌اند؟", say: "ربات پله‌ها را این‌طور بالا می‌رود. بعدی‌ها کدام‌اند؟",
        seq: ["👣", "↻", "👣", "↺", "👣", "↻", "👣", "↺"], blanks: [6, 7], options: ["👣", "↻", "↺"] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "پله‌ها را بالا برو! تکه تکراری را پیدا کن و داخل «تکرار» بگذار. حداکثر پنج قطعه داری.",
        size: [5, 5], start: [0, 4], goal: [4, 0],
        walls: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [0, 2], [1, 4], [2, 4], [3, 4], [4, 4], [2, 3], [3, 3], [4, 3], [3, 2], [4, 2], [4, 1]] },
      { type: "code", blocks: "turn", repeat: true, max: 6, face: "up", goalPic: "⭐", wall: "🌊",
        prompt: "دور دریاچه برو و به ستاره برس. هر طرف دریاچه مثل طرف دیگر است! حداکثر شش قطعه داری.",
        size: [5, 5], start: [0, 4], goal: [4, 4],
        walls: [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3], [1, 4], [2, 4], [3, 4]] },
      { type: "code", blocks: "turn", repeat: true, max: 7, face: "up", goalPic: "⭐",
        prompt: "این پله‌ها بزرگ‌ترند: هر پله دو خانه بالا و دو خانه جلو است. حداکثر هفت قطعه داری.",
        size: [5, 5], start: [0, 4], goal: [4, 0],
        walls: [[1, 4], [2, 4], [3, 4], [4, 4], [1, 3], [2, 3], [3, 3], [4, 3], [3, 2], [4, 2], [3, 1], [4, 1], [0, 0], [1, 0], [0, 1], [1, 1]] },
      { type: "unplugged", text: "با بدن یک «تکه تکراری» بسازید: «دو قدم جلو، یک بار بپر» را سه بار تکرار کنید. بعد یک حرکت طولانی نشان دهید (مثلاً قدم، چرخش، قدم، چرخش، قدم، چرخش) و بپرسید: «تکه‌ای که تکرار می‌شود کدام است؟ چند بار تکرار شد؟» در خانه هم دنبال تکه‌های تکراری بگردید: کاشی‌های دیوار، نقش فرش، پله‌ها." }
    ]
  },
  {
    id: "think-sapling-4", subject: "think", level: "sapling", emoji: "📏", title: "مرتب کردن",
    steps: [
      { type: "order", prompt: "از کوچک به بزرگ بچین", ltr: true, items: [2, 5, 7, 9, 12] },
      /* Sorting by swapping neighbours: the frame shows the two being compared, and the cards really swap places.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین چطور می‌شود عددها را دوتادوتا مرتب کرد", bg: "#f4ecdf",
        parts: {
          a: { art: "card-5", at: [41, 40], o: 0 }, b: { art: "card-2", at: [67, 40], o: 0 },
          c: { art: "card-8", at: [93, 40], o: 0 }, d: { art: "card-3", at: [119, 40], o: 0 },
          frame: { art: "pair-frame", at: [54, 50], o: 0 },
          swap: { art: "swap-arrows", at: [54, 15], o: 0 }, tick: { art: "tick", at: [80, 26], o: 0 }
        },
        scenes: [
          { caption: "می‌خواهیم این عددها را از کوچک به بزرگ بچینیم.", do: [
            { id: "a", to: { y: 50, o: 1 }, dur: 500 }, { id: "b", to: { y: 50, o: 1 }, at: 250, dur: 500 },
            { id: "c", to: { y: 50, o: 1 }, at: 500, dur: 500 }, { id: "d", to: { y: 50, o: 1 }, at: 750, dur: 500 }
          ] },
          { caption: "دو تای اول را با هم مقایسه می‌کنیم: ۵ از ۲ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", key: 5400, do: [
            { id: "frame", to: { o: 1 }, dur: 400 },
            { id: "swap", to: { o: 1 }, at: 4400, dur: 300 },
            { id: "a", path: "M41 50Q54 22 67 50", at: 5000, dur: 1100 }, { id: "b", path: "M67 50Q54 78 41 50", at: 5000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 6300, dur: 300 }
          ] },
          { caption: "حالا ۵ و ۸: ترتیبشان درست است. عوضشان نمی‌کنیم.", do: [
            { id: "frame", to: { x: 80 }, dur: 600 },
            { id: "tick", to: { o: 1 }, at: 1800, dur: 400 }
          ] },
          { caption: "۸ و ۳: ۸ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", key: 3400, do: [
            { id: "tick", to: { o: 0 }, dur: 300 },
            { id: "frame", to: { x: 106 }, dur: 600 },
            { id: "swap", to: { x: 106 }, dur: 1 }, { id: "swap", to: { o: 1 }, at: 2400, dur: 300 },
            { id: "c", path: "M93 50Q106 22 119 50", at: 3000, dur: 1100 }, { id: "d", path: "M119 50Q106 78 93 50", at: 3000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 4300, dur: 300 }
          ] },
          { caption: "یک دور دیگر از اول: ۲ و ۵ درست‌اند. ۵ و ۳ را عوض می‌کنیم.", key: 4400, do: [
            { id: "frame", to: { x: 54 }, dur: 700 },
            { id: "tick", to: { x: 54 }, dur: 1 }, { id: "tick", to: { o: 1 }, at: 1100, dur: 300 }, { id: "tick", to: { o: 0 }, at: 2500, dur: 300 },
            { id: "frame", to: { x: 80 }, at: 2700, dur: 600 },
            { id: "swap", to: { x: 80 }, dur: 1 }, { id: "swap", to: { o: 1 }, at: 3500, dur: 300 },
            { id: "a", path: "M67 50Q80 22 93 50", at: 4000, dur: 1100 }, { id: "d", path: "M93 50Q80 78 67 50", at: 4000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 5300, dur: 300 }
          ] },
          { caption: "همه مرتب شدند: ۲، ۳، ۵، ۸.", do: [
            { id: "frame", to: { o: 0 }, dur: 400 },
            { id: "b.ok", to: { o: 1 }, at: 300, dur: 300 }, { id: "b", to: { y: "-4" }, at: 300, dur: 500, yoyo: true, times: 2 },
            { id: "d.ok", to: { o: 1 }, at: 900, dur: 300 }, { id: "d", to: { y: "-4" }, at: 900, dur: 500, yoyo: true, times: 2 },
            { id: "a.ok", to: { o: 1 }, at: 1500, dur: 300 }, { id: "a", to: { y: "-4" }, at: 1500, dur: 500, yoyo: true, times: 2 },
            { id: "c.ok", to: { o: 1 }, at: 2100, dur: 300 }, { id: "c", to: { y: "-4" }, at: 2100, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "در این روش، هر بار چند عدد را با هم مقایسه می‌کنیم؟", options: [{ label: "۲", value: 2 }, { label: "۳", value: 3 }, { label: "۴", value: 4 }], answer: 2 },
      { type: "order", prompt: "روزهای هفته را به ترتیب بچین. هفته با شنبه شروع می‌شود.", say: "روزهای هفته را به ترتیب بچین. هفته با شنبه شروع می‌شود.", numbered: true,
        items: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه"] },
      { type: "order", prompt: "از کوچک به بزرگ بچین", ltr: true, items: [14, 23, 31, 40, 52] },
      { type: "choose", prompt: "با روش جابه‌جا کردن دوتای کنار هم مرتب می‌کنیم. از اول ردیف شروع می‌کنیم: اولین دو عددی که باید جایشان عوض شود کدام‌اند؟",
        say: "با روش جابه‌جا کردن دوتای کنار هم مرتب می‌کنیم. از اول ردیف شروع می‌کنیم. اولین دو عددی که باید جایشان عوض شود کدام‌اند؟",
        show: "۳  ۶  ۴  ۸", ltr: true,
        options: [{ label: "۳ و ۶", value: "36" }, { label: "۶ و ۴", value: "64" }, { label: "۴ و ۸", value: "48" }], answer: "64" },
      { type: "choose", prompt: "۶ و ۴ را جابه‌جا کردیم. حالا ردیف این است. مرتب شد؟", say: "شش و چهار را جابه‌جا کردیم. حالا ردیف این است. مرتب شد؟",
        show: "۳  ۴  ۶  ۸", ltr: true,
        options: [{ label: "✅ بله، همه به ترتیب‌اند", value: "yes" }, { label: "❌ نه، هنوز نه", value: "no" }], answer: "yes" },
      { type: "unplugged", text: "چند کارت عدد، یا چند قاشق و لیوان با اندازه‌های مختلف، را درهم روی میز بچینید. قانون این است: هر بار فقط دو تای کنار هم را مقایسه کنید و اگر لازم بود جایشان را عوض کنید. آن‌قدر ادامه دهید تا همه مرتب شوند. کامپیوترها هم با روش‌هایی مثل همین مرتب می‌کنند." }
    ]
  },
  {
    id: "think-sapling-8", subject: "think", level: "sapling", emoji: "🔎", title: "پیدا کردن",
    steps: [
      /* Guess my number: Reza thinks of 11; Sara always says the middle of the numbers that are left, and the
         numbers it rules out fade (8: bigger, 12: smaller, 10: bigger, 11). The cards run left to right, like a
         number line. Drawings: js/art/rig-think.js; Sara and Reza from js/art/rig-english.js. */
      { type: "scene", prompt: "بازی «عددم را حدس بزن»", bg: "#f4ecdf",
        parts: {
          c1: { art: "ts-num", look: { n: 1 }, at: [10, 22] }, c2: { art: "ts-num", look: { n: 2 }, at: [20, 22] }, c3: { art: "ts-num", look: { n: 3 }, at: [30, 22] }, c4: { art: "ts-num", look: { n: 4 }, at: [40, 22] }, c5: { art: "ts-num", look: { n: 5 }, at: [50, 22] },
          c6: { art: "ts-num", look: { n: 6 }, at: [60, 22] }, c7: { art: "ts-num", look: { n: 7 }, at: [70, 22] }, c8: { art: "ts-num", look: { n: 8 }, at: [80, 22] }, c9: { art: "ts-num", look: { n: 9 }, at: [90, 22] }, c10: { art: "ts-num", look: { n: 10 }, at: [100, 22] },
          c11: { art: "ts-num", look: { n: 11 }, at: [110, 22] }, c12: { art: "ts-num", look: { n: 12 }, at: [120, 22] }, c13: { art: "ts-num", look: { n: 13 }, at: [130, 22] }, c14: { art: "ts-num", look: { n: 14 }, at: [140, 22] }, c15: { art: "ts-num", look: { n: 15 }, at: [150, 22] },
          sara: { art: "en-sara", at: [24, 88], s: 0.9 }, reza: { art: "en-reza", at: [136, 88], s: 0.9 },
          q: { art: "ts-say", look: { w: "q" }, at: [136, 54], o: 0 },
          w1: { art: "ts-say", look: { w: "big" }, at: [136, 54], o: 0 }, w2: { art: "ts-say", look: { w: "small" }, at: [136, 54], o: 0 },
          w3: { art: "ts-say", look: { w: "big" }, at: [136, 54], o: 0 }, w4: { art: "ts-say", look: { w: "yes" }, at: [136, 54], o: 0 }
        },
        scenes: [
          { caption: "رضا یک عدد از ۱ تا ۱۵ در ذهنش دارد. سارا باید با کمترین حدس پیدایش کند.", key: 2400, do: [
            { id: "q", to: { o: 1 }, at: 300, dur: 400 }, { id: "q", to: { s: 1.2 }, at: 800, dur: 400, yoyo: true, times: 2 }
          ].concat(TK.face("sara", true, 1200)) },
          { caption: "سارا عدد وسط را می‌گوید: ۸. رضا می‌گوید: «بزرگ‌تر!» پس ۱ تا ۸ کنار می‌روند.", key: 4200, do: TK.talk("sara", 0, 900).concat([
            { id: "c8", to: { s: 1.35 }, at: 200, dur: 500, yoyo: true, times: 2 },
            { id: "q", to: { o: 0 }, at: 1200, dur: 300 }, { id: "w1", to: { o: 1 }, at: 1300, dur: 300 }
          ], TK.talk("reza", 1300, 900), [{ id: "c1", to: { o: 0.15 }, at: 2600, dur: 500 }, { id: "c2", to: { o: 0.15 }, at: 2660, dur: 500 }, { id: "c3", to: { o: 0.15 }, at: 2720, dur: 500 }, { id: "c4", to: { o: 0.15 }, at: 2780, dur: 500 }, { id: "c5", to: { o: 0.15 }, at: 2840, dur: 500 }, { id: "c6", to: { o: 0.15 }, at: 2900, dur: 500 }, { id: "c7", to: { o: 0.15 }, at: 2960, dur: 500 }, { id: "c8", to: { o: 0.15 }, at: 3020, dur: 500 }
          ]) },
          { caption: "از عددهای باقی‌مانده، وسطی ۱۲ است. «کوچک‌تر!» پس ۱۲ تا ۱۵ هم کنار می‌روند.", key: 4000, do: TK.talk("sara", 0, 900).concat([
            { id: "c12", to: { s: 1.35 }, at: 200, dur: 500, yoyo: true, times: 2 },
            { id: "w1", to: { o: 0 }, at: 1200, dur: 300 }, { id: "w2", to: { o: 1 }, at: 1300, dur: 300 }
          ], TK.talk("reza", 1300, 900), [{ id: "c12", to: { o: 0.15 }, at: 2600, dur: 500 }, { id: "c13", to: { o: 0.15 }, at: 2660, dur: 500 }, { id: "c14", to: { o: 0.15 }, at: 2720, dur: 500 }, { id: "c15", to: { o: 0.15 }, at: 2780, dur: 500 }
          ]) },
          { caption: "حالا ۹، ۱۰ و ۱۱ مانده‌اند. وسطی ۱۰ است. «بزرگ‌تر!»", key: 3600, do: TK.talk("sara", 0, 900).concat([
            { id: "c10", to: { s: 1.35 }, at: 200, dur: 500, yoyo: true, times: 2 },
            { id: "w2", to: { o: 0 }, at: 1200, dur: 300 }, { id: "w3", to: { o: 1 }, at: 1300, dur: 300 }
          ], TK.talk("reza", 1300, 900), [{ id: "c9", to: { o: 0.15 }, at: 2600, dur: 500 }, { id: "c10", to: { o: 0.15 }, at: 2660, dur: 500 }
          ]) },
          { caption: "فقط ۱۱ ماند. «همین است!» سارا با چهار حدس پیدایش کرد.", key: 3000, do: TK.talk("sara", 0, 900).concat([
            { id: "c11", to: { s: 1.35 }, at: 200, dur: 500, yoyo: true, times: 2 }, { id: "c11.ok", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "w3", to: { o: 0 }, at: 1200, dur: 300 }, { id: "w4", to: { o: 1 }, at: 1300, dur: 300 },
            { emit: "spark", where: [110, 22], spread: [12, 8], n: 7, at: 1600, dur: 600 }
          ], TK.talk("reza", 1300, 900), TK.face("reza", true, 1500)) }
        ],
        question: "سارا هر بار کدام عدد را می‌گفت؟",
        options: [{ label: "عدد وسط عددهای باقی‌مانده", value: "mid" }, { label: "اولین عدد", value: "first" }, { label: "هر عددی که دلش خواست", value: "any" }], answer: "mid" },
      { type: "choose", prompt: "این کارت‌ها به هم ریخته‌اند. می‌خواهیم ۹ را پیدا کنیم. چه کار کنیم؟", say: "این کارت‌ها به هم ریخته‌اند. می‌خواهیم نُه را پیدا کنیم. چه کار کنیم؟",
        show: "۷  ۲  ۹  ۴  ۱  ۸", ltr: true,
        options: [{ label: "یکی‌یکی از اول نگاه می‌کنیم", value: "one" }, { label: "فقط کارت وسط را نگاه می‌کنیم", value: "mid" }], answer: "one" },
      { type: "choose", prompt: "این کارت‌ها به ترتیب‌اند و دنبال ۸ هستیم. کارت وسط ۵ است. ۸ کدام طرف ۵ است؟", say: "این کارت‌ها به ترتیب‌اند و دنبال هشت هستیم. کارت وسط پنج است. هشت کدام طرف پنج است؟",
        show: "۱  ۲  ۳  ۴  ۵  ۶  ۷  ۸  ۹", ltr: true,
        options: [{ label: "طرف عددهای بزرگ‌تر از ۵", value: "after" }, { label: "طرف عددهای کوچک‌تر از ۵", value: "before" }], answer: "after" },
      { type: "choose", prompt: "بازی «عددم را حدس بزن»: عدد من از ۱ تا ۲۰ است. بهترین حدس اول کدام است؟", say: "بازی عددم را حدس بزن: عدد من از یک تا بیست است. بهترین حدس اول کدام است؟",
        options: [{ label: "۱", value: 1 }, { label: "۱۰", value: 10 }, { label: "۲۰", value: 20 }], answer: 10 },
      { type: "choose", prompt: "حدس زدی ۱۰. جواب آمد: «کوچک‌تر!» حالا عدد کدام است؟", say: "حدس زدی ده. جواب آمد: کوچک‌تر! حالا عدد کدام است؟",
        options: [{ label: "یکی از ۱ تا ۹", value: "low" }, { label: "یکی از ۱۱ تا ۲۰", value: "high" }], answer: "low" },
      { type: "choose", prompt: "در یک ردیف مرتب، کدام راه زودتر پیدا می‌کند؟", say: "در یک ردیف مرتب، کدام راه زودتر پیدا می‌کند؟",
        options: [{ label: "از وسط شروع کنیم و هر بار نصف را کنار بگذاریم", value: "mid" }, { label: "یکی‌یکی از اول نگاه کنیم", value: "one" }], answer: "mid" },
      { type: "unplugged", text: "بازی «عددم را حدس بزن»: یک عدد از ۱ تا ۲۰ در ذهنتان نگه دارید. کودک حدس بزند و شما فقط بگویید «بزرگ‌تر»، «کوچک‌تر» یا «همین است». حدس‌ها را با هم بشمارید. بعد بپرسید: «اگر همیشه وسط عددهای باقی‌مانده را بگویی، چند حدس لازم است؟» جایتان را عوض کنید. با یک کتاب هم می‌شود همین را دید: برای پیدا کردن صفحه ۸۰، کتاب را از وسط باز می‌کنیم، نه از صفحه اول." }
    ]
  },
  {
    id: "think-sapling-9", subject: "think", level: "sapling", emoji: "🃏", title: "بازی مرتب کن، پیدا کن",
    steps: [
      { type: "order", prompt: "از کوچک به بزرگ بچین", ltr: true, items: [3, 8, 11, 15, 20, 27] },
      { type: "choose", prompt: "با جابه‌جا کردن دوتای کنار هم مرتب می‌کنیم و از اول ردیف شروع می‌کنیم. اولین دو عددی که باید جایشان عوض شود کدام‌اند؟",
        say: "با جابه‌جا کردن دوتای کنار هم مرتب می‌کنیم و از اول ردیف شروع می‌کنیم. اولین دو عددی که باید جایشان عوض شود کدام‌اند؟",
        show: "۴  ۲  ۶  ۵", ltr: true,
        options: [{ label: "۴ و ۲", value: "42" }, { label: "۲ و ۶", value: "26" }, { label: "۶ و ۵", value: "65" }], answer: "42" },
      { type: "order", prompt: "نوارها را از کوتاه به بلند بچین", say: "نوارها را از کوتاه به بلند بچین", ltr: true,
        items: [{ bar: 2, say: "۲" }, { bar: 3, say: "۳" }, { bar: 5, say: "۵" }, { bar: 6, say: "۶" }, { bar: 8, say: "۸" }] },
      { type: "choose", prompt: "این کارت‌ها مرتب‌اند و دنبال ۱۷ هستیم. اول کدام کارت را نگاه کنیم؟", say: "این کارت‌ها مرتب‌اند و دنبال هفده هستیم. اول کدام کارت را نگاه کنیم؟",
        show: "۲  ۵  ۸  ۱۱  ۱۴  ۱۷  ۲۰", ltr: true,
        options: [{ label: "۲", value: 2 }, { label: "۱۱", value: 11 }, { label: "۲۰", value: 20 }], answer: 11 },
      { type: "choose", prompt: "کارت وسط ۱۱ بود و ۱۷ از ۱۱ بزرگ‌تر است. حالا ۱۴، ۱۷ و ۲۰ مانده‌اند. کدام را نگاه کنیم؟", say: "کارت وسط یازده بود و هفده از یازده بزرگ‌تر است. حالا چهارده، هفده و بیست مانده‌اند. کدام را نگاه کنیم؟",
        options: [{ label: "۱۴", value: 14 }, { label: "۱۷", value: 17 }, { label: "۲۰", value: 20 }], answer: 17 },
      { type: "sort", prompt: "قانون: عددهای کمتر از ۱۰ در یک سبد، بقیه در سبد دیگر",
        baskets: [{ pic: "🔽", label: "کمتر از ۱۰", value: "lo" }, { pic: "🔼", label: "۱۰ یا بیشتر", value: "hi" }],
        items: [{ label: 3, basket: "lo" }, { label: 12, basket: "hi" }, { label: 7, basket: "lo" }, { label: 15, basket: "hi" }, { label: 10, basket: "hi" }, { label: 9, basket: "lo" }] },
      { type: "unplugged", text: "با کارت‌های عدد (یا کاغذهای کوچکی که رویشان عدد نوشته‌اید) دو بازی کنید. اول کارت‌ها را درهم بچینید و کودک فقط با جابه‌جا کردن دوتای کنار هم مرتبشان کند. بعد کارت‌ها را مرتب و رو به پایین بچینید و یک عدد را بخواهید؛ کودک باید با کمترین برگرداندن پیدایش کند. شمردن برگرداندن‌ها را فراموش نکنید!" }
    ]
  },
  {
    id: "think-sapling-25", subject: "think", level: "sapling", emoji: "📝", title: "دستور دقیق",
    steps: [
      /* Dad follows Sara's instructions word for word: "put the cheese on the bread" puts the whole cheese box on the
         bag of bread; the exact instructions open the box, take one piece, take one bread out, put the cheese on it
         and roll it. Drawings: js/art/rig-think.js; Sara and her father from js/art/rig-english.js. */
      { type: "scene", prompt: "بابا دقیقاً همان کاری را می‌کند که نوشته شده", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "kitchen" } },
          dad: { art: "en-father", at: [94, 86], s: 0.95 }, table: { art: "tk-table", at: [92, 89], sx: 0.9 },
          bag: { art: "ts-breadbag", at: [74, 68] }, box: { art: "ts-cheesebox", at: [110, 68] },
          bread: { art: "ts-bread", at: [74, 63], o: 0 }, cheese: { art: "ts-cheese", at: [110, 64], o: 0 },
          wrap: { art: "ts-wrap", at: [92, 65], o: 0 }, oops: { art: "ts-oops", at: [94, 30], o: 0 },
          sara: { art: "en-sara", at: [28, 88] }, note: { art: "ts-note", at: [37, 66], s: 0.9 }
        },
        scenes: [
          { caption: "سارا برای بابا دستور درست کردن لقمه نان و پنیر را نوشته است. بابا قول داده دقیقاً همان را انجام دهد.", key: 2800, do: [
            { id: "note", to: { s: 1.1 }, at: 200, dur: 400, yoyo: true, times: 2 }, { id: "dad.head", to: { y: 1.2 }, at: 1600, dur: 350, yoyo: true, times: 4 }
          ].concat(TK.face("sara", true, 600)) },
          { caption: "سارا می‌خواند: «پنیر را روی نان بگذار.» بابا جعبه پنیر را برمی‌دارد و روی کیسه نان می‌گذارد!", key: 4600, do: TK.talk("sara", 0, 1800).concat(
            TK.pose("dad", "R", "give", 2000, 600), [{ id: "box", path: "M110 68Q96 44 74 54", at: 2600, dur: 1500 }], TK.pose("dad", "R", "down", 4200, 600)) },
          { caption: "سارا می‌خندد: «نه! منظورم این نبود. دستورم دقیق نبود.»", key: 2400, do: [
            { id: "oops", to: { o: 1 }, dur: 400 }, { id: "oops", to: { r: 20 }, at: 400, dur: 400, yoyo: true, times: 2 }
          ].concat(TK.talk("sara", 400, 1600), TK.face("sara", true, 300)) },
          { caption: "سارا دستور دقیق‌تری می‌خواند: «در جعبه پنیر را باز کن. یک تکه پنیر بردار.»", key: 4200, do: [
            { id: "oops", to: { o: 0 }, dur: 300 }, { id: "box", path: "M74 54Q92 44 110 68", at: 300, dur: 1300 },
            { id: "box.lid", to: { r: -120 }, at: 1900, dur: 700 },
            { id: "cheese", to: { o: 1 }, at: 2700, dur: 300 }, { id: "cheese", to: { y: 58 }, at: 2900, dur: 700 }
          ].concat(TK.talk("sara", 0, 1600)) },
          { caption: "«یک نان از کیسه بیرون بیاور. پنیر را روی نان بگذار.»", key: 3800, do: TK.talk("sara", 0, 1400).concat([
            { id: "bread", to: { o: 1 }, at: 300, dur: 300 }, { id: "bread", path: "M74 63Q82 52 92 66", at: 500, dur: 1300 },
            { id: "cheese", path: "M110 58Q100 50 92 63.4", at: 2100, dur: 1200 }
          ]) },
          { caption: "«نان را لوله کن.» حالا لقمه درست شد!", key: 2400, do: TK.talk("sara", 0, 900).concat([
            { id: "bread", to: { sx: 0.3, o: 0 }, at: 600, dur: 700 }, { id: "cheese", to: { o: 0 }, at: 600, dur: 700 },
            { id: "wrap", to: { o: 1 }, at: 900, dur: 600 }, { emit: "spark", where: [92, 58], spread: [12, 6], n: 6, at: 1500, dur: 500 }
          ], TK.face("dad", true, 1600)) }
        ],
        question: "چرا بار اول لقمه درست نشد؟",
        options: [{ label: "دستور دقیق نبود", value: "vague" }, { label: "بابا پنیر دوست ندارد", value: "like" }], answer: "vague" },
      { type: "choose", prompt: "کدام دستور دقیق‌تر است؟", say: "کدام دستور دقیق‌تر است؟ آب بریز، یا یک لیوان را تا نصفه آب کن؟",
        options: [{ label: "«آب بریز.»", value: "vague" }, { label: "«یک لیوان را تا نصفه آب کن.»", value: "exact" }], answer: "exact" },
      { type: "choose", prompt: "دستور مسواک زدن: ۱. خمیردندان را روی مسواک بزن. ۲. دندان‌ها را مسواک بزن. ۳. دهانت را آب بکش. پیش از قدم ۱، کدام قدم جا افتاده؟",
        say: "دستور مسواک زدن: یک، خمیردندان را روی مسواک بزن. دو، دندان‌ها را مسواک بزن. سه، دهانت را آب بکش. پیش از قدم یک، کدام قدم جا افتاده؟",
        options: [{ label: "در خمیردندان را باز کن", value: "open" }, { label: "چراغ را خاموش کن", value: "light" }, { label: "کفش‌هایت را بپوش", value: "shoes" }], answer: "open" },
      { type: "order", prompt: "دستور شستن دست‌ها را به ترتیب بچین", say: "دستور شستن دست‌ها را به ترتیب بچین", numbered: true,
        items: [{ pic: "🚰", label: "شیر آب را باز کن", say: "شیر آب را باز کن" }, { pic: "🧼", label: "دست‌ها را صابون بزن", say: "دست‌ها را صابون بزن" },
          { pic: "💧", label: "صابون را آب بکش", say: "صابون را آب بکش" }, { pic: "🧻", label: "دست‌ها را خشک کن", say: "دست‌ها را خشک کن" }] },
      { type: "choose", prompt: "ربات فقط دستور دقیق را می‌فهمد. کدام را به ربات بگوییم؟", say: "ربات فقط دستور دقیق را می‌فهمد. کدام را به ربات بگوییم؟",
        options: [{ label: "«۳ قدم جلو برو، بعد به راست بچرخ.»", value: "exact" }, { label: "«برو آن طرف.»", value: "vague" }], answer: "exact" },
      { type: "unplugged", text: "بازی «بابای ربات»: کودک دستور درست کردن یک لقمه نان و پنیر (یا چیدن یک بشقاب و لیوان روی میز) را بگوید یا بنویسد، و شما دقیقاً همان کاری را بکنید که گفت، نه آنچه منظورش بود. اگر گفت «نان را بردار»، کل کیسه را بردارید! با هم بخندید و دستور را دقیق‌تر کنید. برنامه‌نویس‌ها هم همین کار را می‌کنند: رایانه فقط همان را انجام می‌دهد که نوشته‌ایم." }
    ]
  },
  {
    id: "think-sapling-5", subject: "think", level: "sapling", emoji: "🏆", title: "برنامه‌های بزرگ‌تر",
    steps: [
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "right", goalPic: "⭐",
        prompt: "پله‌ها را پایین برو! این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 0], [3, 1], [4, 2]],
        given: [{ repeat: 4, body: ["fwd", "ccw", "fwd", "cw"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 8, face: "down", goalPic: "⭐",
        prompt: "دور دیوار برو و به ستاره برس. حداکثر هشت قطعه داری.",
        size: [5, 5], start: [0, 0], goal: [4, 0], walls: [[2, 0], [2, 1], [2, 2], [2, 3]] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "🍎",
        prompt: "ربات را به سیب برسان. حداکثر پنج قطعه داری.",
        size: [5, 5], start: [0, 4], goal: [4, 0], walls: [[0, 2], [1, 1], [2, 0], [1, 4], [2, 3], [3, 2], [4, 1]] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "این برنامه اشکال دارد: ربات به ستاره نمی‌رسد. تعداد تکرار را درست کن.",
        size: [6, 4], start: [0, 3], goal: [5, 1], given: ["fwd", "fwd", "cw", { repeat: 3, body: ["fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 6, face: "right", goalPic: "🍓", wall: "🌳",
        prompt: "دور باغ برو و توت‌فرنگی را بردار. حداکثر شش قطعه داری.",
        size: [5, 5], start: [0, 0], goal: [0, 4], walls: [[0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3]] },
      { type: "unplugged", text: "روی کاغذ برنامه‌ای بنویسید تا یکی از اعضای خانواده، که ربات شده، دور میز بچرخد؛ مثلاً «۴ بار تکرار کن: ۳ قدم جلو، به راست بچرخ». اول کودک حدس بزند ربات کجا می‌رسد، بعد اجرا کنید. اگر نرسید، با هم دنبال اشکال بگردید و برنامه را درست کنید." }
    ]
  },
  {
    id: "think-sapling-10", subject: "think", level: "sapling", emoji: "🗺️", title: "اول نقشه بکش",
    steps: [
      { type: "choose", prompt: "اول با انگشت راه ربات را روی تصویر دنبال کن. کدام برنامه همین راه را می‌رود؟", say: "اول با انگشت راه ربات را روی تصویر دنبال کن: دو خانه بالا، بعد دو خانه به راست. کدام برنامه همین راه را می‌رود؟",
        show: "🤖‍⭐", pic: true, stack: true,
        options: [{ label: "👣 👣 ↻ 👣 👣", value: "a" }, { label: "👣 👣 ↺ 👣 👣", value: "b" }, { label: "↻ 👣 👣 ↺ 👣", value: "c" }], answer: "a" },
      { type: "code", blocks: "turn", face: "up", goalPic: "⭐",
        prompt: "حالا همان برنامه را بساز و اجرا کن.",
        size: [3, 3], start: [0, 2], goal: [2, 0] },
      { type: "choose", prompt: "این دو برنامه هر دو ربات را به ستاره می‌رسانند. کدام کوتاه‌تر است؟", say: "این دو برنامه هر دو ربات را به ستاره می‌رسانند. کدام کوتاه‌تر است؟",
        stack: true, options: [{ label: "👣 👣 👣 👣 👣 👣", value: "long" }, { label: "🔁 ۶ بار: 👣", value: "loop" }], answer: "loop" },
      { type: "choose", prompt: "کدام برنامه را راحت‌تر می‌شود خواند و اگر اشکال داشت، درست کرد؟", say: "کدام برنامه را راحت‌تر می‌شود خواند و اگر اشکال داشت، درست کرد؟",
        stack: true, options: [{ label: "👣 ↻ 👣 ↺ 👣 ↻ 👣 ↺ 👣 ↻ 👣 ↺", value: "long" }, { label: "🔁 ۳ بار: 👣 ↻ 👣 ↺", value: "loop" }], answer: "loop" },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "down", goalPic: "⭐",
        prompt: "اول نقشه بکش: راه را با انگشت دنبال کن و تکه تکراری را پیدا کن. بعد برنامه را بساز. حداکثر پنج قطعه داری.",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[0, 2], [0, 3], [0, 4], [1, 3], [1, 4], [2, 4], [2, 0], [3, 0], [4, 0], [3, 1], [4, 1], [4, 2]] },
      { type: "code", blocks: "turn", repeat: true, max: 6, face: "right", goalPic: "🍎",
        prompt: "این راه بلند است. اول با انگشت نقشه‌اش را بکش، بعد برنامه بساز. حداکثر شش قطعه داری.",
        size: [7, 4], start: [0, 3], goal: [6, 0],
        walls: [[3, 3], [4, 3], [5, 3], [6, 3], [5, 2], [6, 2], [0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2]] },
      { type: "unplugged", text: "پیش از هر کار، «نقشه» بکشید: روی کاغذ راه اتاق تا آشپزخانه را بکشید و قسمت‌هایی را که تکرار می‌شوند رنگ کنید. بعد کودک برنامه را بنویسد و یک نفر اجرا کند. دو برنامه برای یک کار بنویسید، یکی بلند و یکی با «تکرار»، و بپرسید: «کدام را راحت‌تر می‌شود خواند؟ اگر اشتباه داشت، کدام را زودتر درست می‌کنیم؟»" }
    ]
  },
  {
    id: "think-sapling-11", subject: "think", level: "sapling", emoji: "🐛", title: "کارآگاه اشکال",
    steps: [
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "کارآگاه اشکال! اول اجرا کن و ببین ربات کجا اشتباه می‌رود. فقط یک چیز را عوض کن و دوباره اجرا کن.",
        size: [5, 5], start: [0, 4], goal: [4, 0], given: [{ repeat: 3, body: ["fwd", "cw", "fwd", "ccw"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "این بار اشکال داخل «تکرار» است. اجرا کن، نگاه کن و درستش کن.",
        size: [5, 5], start: [0, 4], goal: [4, 0], given: [{ repeat: 4, body: ["fwd", "ccw", "fwd", "cw"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 6, face: "up", goalPic: "⭐", wall: "🌊",
        prompt: "یک قطعه جای اشتباهی است. پیدایش کن.",
        size: [5, 5], start: [0, 4], goal: [4, 4],
        walls: [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3], [1, 4], [2, 4], [3, 4]],
        given: [{ repeat: 3, body: ["fwd", "fwd", "fwd", "fwd"] }, "cw"] },
      { type: "code", blocks: "turn", repeat: true, max: 3, face: "right", goalPic: "⭐",
        prompt: "این برنامه یک قطعه کم دارد. کدام؟",
        size: [5, 5], start: [0, 4], goal: [0, 0], given: [{ repeat: 4, body: ["fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 6, face: "right", goalPic: "⭐",
        prompt: "این برنامه یک قطعه اضافه دارد. کدام؟",
        size: [5, 5], start: [0, 0], goal: [4, 4], given: ["fwd", { repeat: 4, body: ["fwd", "cw", "fwd", "ccw"] }] },
      { type: "unplugged", text: "یک «برنامه اشکال‌دار» روی کاغذ بنویسید، مثلاً برای رفتن از در اتاق تا تخت، و یکی از قطعه‌ها را عمداً اشتباه بنویسید. کودک برنامه را قدم‌به‌قدم اجرا کند، جایی را که اشتباه شد پیدا کند، فقط همان یک چیز را عوض کند و دوباره اجرا کند. به او بگویید: «برنامه‌نویس‌ها هم همین‌طور کار می‌کنند: اجرا، نگاه، درست کردن، دوباره اجرا.»" }
    ]
  },
  {
    id: "think-sapling-12", subject: "think", level: "sapling", emoji: "🏅", title: "بازی برنامه‌های بزرگ",
    steps: [
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "پله‌های بلند! با پنج قطعه به ستاره برس.",
        size: [6, 6], start: [0, 5], goal: [5, 0] },
      { type: "code", blocks: "turn", repeat: true, max: 7, face: "up", goalPic: "⭐", wall: "🌊",
        prompt: "دور دریاچه بزرگ برو. حداکثر هفت قطعه داری.",
        size: [6, 6], start: [0, 5], goal: [5, 5],
        walls: [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3], [1, 4], [2, 4], [3, 4], [4, 4], [1, 5], [2, 5], [3, 5], [4, 5]] },
      { type: "code", blocks: "turn", repeat: true, max: 4, face: "up", goalPic: "🍎",
        prompt: "این برنامه اشکال دارد. اجرا کن و درستش کن.",
        size: [6, 6], start: [0, 5], goal: [5, 0], given: [{ repeat: 4, body: ["fwd"] }, "cw", { repeat: 5, body: ["fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐", wall: "🌳",
        prompt: "این برنامه هم اشکال دارد. دور درخت‌ها برو.",
        size: [6, 6], start: [0, 5], goal: [3, 5],
        walls: [[1, 3], [2, 3], [1, 4], [2, 4], [1, 5], [2, 5]], given: [{ repeat: 3, body: ["fwd", "fwd", "cw", "fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "right", goalPic: "⭐",
        prompt: "پله‌ها را پایین برو. حداکثر پنج قطعه داری.",
        size: [6, 6], start: [0, 0], goal: [5, 5], walls: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 0], [3, 1], [4, 2], [5, 3]] },
      { type: "unplugged", text: "یک «زمین بازی بزرگ» برای همه خانواده بسازید: با نوار چسب یا گچ یک جدول ۶ در ۶ بکشید و با کوسن‌ها دیوار بگذارید. هر کس روی کاغذ برنامه‌ای با «تکرار» بنویسد که یک اسباب‌بازی را به هدف برساند، و کوتاه‌ترین برنامه‌ای را که می‌شود پیدا کند. بعد برنامه‌ها را عوض کنید و اجرا کنید. اگر برنامه‌ای اشکال داشت، با هم درستش کنید." }
    ]
  },
  {
    id: "think-sapling-13", subject: "think", level: "sapling", emoji: "🟥", title: "«و» و «یا»",
    steps: [
      { type: "choose", prompt: "قانون: «قرمز و گرد». یعنی هم قرمز باشد، هم گرد. کدام با این قانون جور است؟", say: "قانون: قرمز و گرد. یعنی هم قرمز باشد، هم گرد. کدام با این قانون جور است؟",
        pic: true, options: ["🟥", "🍎", "🔵", "🍌"], answer: "🍎" },
      { type: "choose", prompt: "قانون: «قرمز یا گرد». یعنی قرمز باشد، یا گرد باشد، یا هر دو. کدام با این قانون جور نیست؟", say: "قانون: قرمز یا گرد. یعنی قرمز باشد، یا گرد باشد، یا هر دو. کدام با این قانون جور نیست؟",
        pic: true, options: ["🟥", "🍎", "🔵", "🍌"], answer: "🍌" },
      { type: "sort", prompt: "سبد اول: چیزهایی که «میوه و زرد»ند. بقیه در جعبه.",
        baskets: [{ pic: "🧺", label: "میوه و زرد", value: "yes" }, { pic: "📦", label: "بقیه", value: "no" }],
        items: [{ pic: "🍌", say: "موز", basket: "yes" }, { pic: "🍋", say: "لیمو", basket: "yes" }, { pic: "🍎", say: "سیب", basket: "no" },
          { pic: "🌻", say: "گل آفتابگردان", basket: "no" }, { pic: "⭐", say: "ستاره", basket: "no" }, { pic: "🍐", say: "گلابی", basket: "no" }] },
      { type: "sort", prompt: "سبد اول: چیزهایی که «حیوان یا سبز»ند. بقیه در جعبه.",
        baskets: [{ pic: "🧺", label: "حیوان یا سبز", value: "yes" }, { pic: "📦", label: "بقیه", value: "no" }],
        items: [{ pic: "🐶", say: "سگ", basket: "yes" }, { pic: "🌳", say: "درخت", basket: "yes" }, { pic: "🐸", say: "قورباغه", basket: "yes" },
          { pic: "🚗", say: "ماشین قرمز", basket: "no" }, { pic: "🥒", say: "خیار", basket: "yes" }, { pic: "🎈", say: "بادکنک قرمز", basket: "no" }] },
      { type: "choose", prompt: "«این شکل آبی است و گرد است.» درست است یا نادرست؟", say: "این شکل آبی است و گرد است. درست است یا نادرست؟",
        show: "🟦", options: [{ label: "✅ درست", value: "t" }, { label: "❌ نادرست", value: "f" }], answer: "f" },
      { type: "choose", prompt: "«این شکل آبی است یا گرد است.» درست است یا نادرست؟", say: "این شکل آبی است یا گرد است. درست است یا نادرست؟",
        show: "🟦", options: [{ label: "✅ درست", value: "t" }, { label: "❌ نادرست", value: "f" }], answer: "t" },
      { type: "unplugged", text: "بازی «و، یا»: با هم قانون بگذارید و دنبال چیزها بگردید: «چیزی بیاور که نرم و آبی باشد»، بعد «چیزی بیاور که نرم یا آبی باشد». بپرسید: «با کدام قانون چیزهای بیشتری پیدا کردیم؟ چرا؟» بازی دیگر: «هر کس عینک دارد یا جوراب قرمز پوشیده، بایستد.» بعد «هر کس عینک دارد و جوراب قرمز پوشیده، بایستد.»" }
    ]
  },
  {
    id: "think-sapling-14", subject: "think", level: "sapling", emoji: "🐐", title: "معمای جدول",
    steps: [
      /* The river crossing: the boat takes the farmer and one more. Goat over; back alone; wolf over, goat back;
         cabbage over; back alone; goat over. The boat, the farmer and what it carries move together. Drawings:
         js/art/rig-think.js. */
      { type: "scene", prompt: "معمای گرگ، بز و کلم", bg: "#dff0fb",
        parts: {
          river: { art: "ts-river" }, boat: { art: "ts-boat", at: [56, 70] }, man: { art: "👨", at: [50, 67], s: 0.42 },
          wolf: { art: "🐺", at: [12, 64], s: 0.55 }, goat: { art: "🐐", at: [24, 64], s: 0.5 }, cab: { art: "🥬", at: [35, 64], s: 0.42 }
        },
        scenes: [
          { caption: "کشاورز باید گرگ، بز و کلم را با قایق به آن طرف رودخانه ببرد. در قایق فقط برای خودش و یکی دیگر جا هست.", do: [
            { id: "boat", to: { y: "-1" }, dur: 700, yoyo: true, times: 4 }, { id: "man", to: { y: "-1" }, dur: 700, yoyo: true, times: 4 }
          ] },
          { caption: "اگر گرگ و بز تنها بمانند، گرگ بز را اذیت می‌کند. اگر بز و کلم تنها بمانند، بز کلم را می‌خورد!", key: 2400, do: [
            { id: "wolf", to: { x: 16 }, at: 300, dur: 600, yoyo: true, times: 2 }, { id: "goat", to: { x: 22 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "goat", to: { x: 28 }, at: 1800, dur: 600, yoyo: true, times: 2 }, { id: "cab", to: { r: 10 }, at: 1800, dur: 300, yoyo: true, times: 4 }
          ] },
          { caption: "اول، بز را می‌برد و تنها برمی‌گردد.", key: 6000, do: [
            { id: "goat", path: "M24 64Q42 52 61 67", dur: 900 },
            { id: "boat", to: { x: 104 }, at: 1100, dur: 2000 }, { id: "man", to: { x: 98 }, at: 1100, dur: 2000 }, { id: "goat", to: { x: 109 }, at: 1100, dur: 2000 },
            { id: "goat", path: "M109 67Q120 52 128 64", at: 3300, dur: 900 },
            { id: "boat", to: { x: 56 }, at: 4400, dur: 2000 }, { id: "man", to: { x: 50 }, at: 4400, dur: 2000 }
          ] },
          { caption: "بعد، گرگ را می‌برد. ولی بز را با خودش برمی‌گرداند!", key: 6200, do: [
            { id: "wolf", path: "M12 64Q38 48 61 67", dur: 1000 },
            { id: "boat", to: { x: 104 }, at: 1200, dur: 2000 }, { id: "man", to: { x: 98 }, at: 1200, dur: 2000 }, { id: "wolf", to: { x: 109 }, at: 1200, dur: 2000 },
            { id: "wolf", path: "M109 67Q126 50 140 64", at: 3400, dur: 900 }, { id: "goat", path: "M128 64Q118 52 109 67", at: 3400, dur: 900 },
            { id: "boat", to: { x: 56 }, at: 4500, dur: 2000 }, { id: "man", to: { x: 50 }, at: 4500, dur: 2000 }, { id: "goat", to: { x: 61 }, at: 4500, dur: 2000 },
            { id: "goat", path: "M61 67Q42 52 24 64", at: 6700, dur: 900 }
          ] },
          { caption: "کلم را می‌برد و کنار گرگ می‌گذارد. بعد تنها برمی‌گردد.", key: 5400, do: [
            { id: "cab", path: "M35 64Q48 54 61 67", dur: 900 },
            { id: "boat", to: { x: 104 }, at: 1100, dur: 2000 }, { id: "man", to: { x: 98 }, at: 1100, dur: 2000 }, { id: "cab", to: { x: 109 }, at: 1100, dur: 2000 },
            { id: "cab", path: "M109 67Q132 50 151 64", at: 3300, dur: 900 },
            { id: "boat", to: { x: 56 }, at: 4400, dur: 2000 }, { id: "man", to: { x: 50 }, at: 4400, dur: 2000 }
          ] },
          { caption: "آخر سر، بز را می‌برد. همه سالم به آن طرف رسیدند!", key: 5000, do: [
            { id: "goat", path: "M24 64Q42 52 61 67", dur: 900 },
            { id: "boat", to: { x: 104 }, at: 1100, dur: 2000 }, { id: "man", to: { x: 98 }, at: 1100, dur: 2000 }, { id: "goat", to: { x: 109 }, at: 1100, dur: 2000 },
            { id: "goat", path: "M109 67Q120 52 128 64", at: 3300, dur: 900 },
            { emit: "spark", where: [138, 52], spread: [16, 8], n: 8, at: 4300, dur: 700 }
          ] }
        ],
        question: "کشاورز اول کدام را برد؟", pic: true, options: ["🐺", "🐐", "🥬"], answer: "🐐" },
      { type: "choose", prompt: "یک معمای جدول: سرنخ ۱: خرگوش هویج می‌خورد. سرنخ ۲: مرغ ماهی نمی‌خورد. در جدول، تیک یعنی «بله» و ضربدر یعنی «نه». مرغ چه می‌خورد؟",
        say: "یک معمای جدول. سرنخ یک: خرگوش هویج می‌خورد. سرنخ دو: مرغ ماهی نمی‌خورد. در جدول، تیک یعنی بله و ضربدر یعنی نه. مرغ چه می‌خورد؟",
        show: "🧩‍1", pic: true, options: ["🌾", "🥕", "🐟"], answer: "🌾" },
      { type: "choose", prompt: "همان جدول: پس گربه چه می‌خورد؟", say: "همان جدول. پس گربه چه می‌خورد؟",
        show: "🧩‍1", pic: true, options: ["🌾", "🥕", "🐟"], answer: "🐟" },
      { type: "order", prompt: "کارهای کشاورز را به ترتیب بچین", say: "کارهای کشاورز را به ترتیب بچین", numbered: true,
        items: [{ pic: "🐐", label: "بز را می‌برد", say: "بز را می‌برد" }, { pic: "🐺", label: "گرگ را می‌برد و بز را برمی‌گرداند", say: "گرگ را می‌برد و بز را برمی‌گرداند" },
          { pic: "🥬", label: "کلم را می‌برد", say: "کلم را می‌برد" }, { pic: "🐐", label: "بز را دوباره می‌برد", say: "بز را دوباره می‌برد" }] },
      { type: "choose", prompt: "اگر کشاورز اول گرگ را ببرد، چه می‌شود؟", say: "اگر کشاورز اول گرگ را ببرد، چه می‌شود؟",
        options: [{ label: "بز و کلم تنها می‌مانند و بز کلم را می‌خورد", value: "cab" }, { label: "همه سالم می‌مانند", value: "ok" }], answer: "cab" },
      { type: "unplugged", text: "معمای رودخانه را با سه اسباب‌بازی (مثلاً یک حیوان عروسکی، یک بز پلاستیکی و یک برگ کاهو) و یک جعبه کفش به جای قایق بازی کنید. کودک قانون‌ها را بگوید و با جابه‌جا کردن اسباب‌بازی‌ها حلش کند. یک جدول هم روی کاغذ بکشید: سه حیوان در ردیف‌ها و سه خوراکی در ستون‌ها، و با دو سرنخ آن را با تیک و ضربدر پر کنید. بعد بپرسید: «از کدام سرنخ اول فهمیدی؟»" }
    ]
  },
  {
    id: "think-sapling-15", subject: "think", level: "sapling", emoji: "🖼️", title: "تصویر با مربع",
    steps: [
      /* The heart on a tablet seen up close: the camera zooms in, the smooth heart turns into squares, the grid shows,
         then each square's number (0 white, 1 red) along the top row. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "یک تصویر روی صفحه از چه ساخته شده؟", bg: "#efe9f6",
        parts: { pad: { art: "ts-pad", at: [80, 45] }, heart: { art: "ts-heart", at: [80, 46] }, pix: { art: "ts-pixheart", at: [80, 46], o: 0 } },
        scenes: [
          { caption: "روی صفحه تبلت یک قلب قرمز هست.", do: [{ id: "heart", to: { s: 1.12 }, at: 300, dur: 500, yoyo: true, times: 4 }] },
          { caption: "بیا از خیلی نزدیک نگاهش کنیم…", key: 2600, do: [
            { cam: { x: 80, y: 46, zoom: 2.6 }, dur: 2200 }, { id: "pix", to: { o: 1 }, at: 1400, dur: 900 }, { id: "heart", to: { o: 0 }, at: 1600, dur: 900 }
          ] },
          { caption: "تصویر از مربع‌های خیلی کوچک ساخته شده است. هر مربع فقط یک رنگ دارد.", key: 1600, do: [{ id: "pix.lines", to: { o: 1 }, dur: 900 }] },
          { caption: "رایانه رنگ هر مربع را با یک عدد نگه می‌دارد: ۰ یعنی سفید، ۱ یعنی قرمز.", key: 2000, do: [
            { cam: { x: 80, y: 40, zoom: 3.2 }, dur: 1200 }, { id: "pix.nums", to: { o: 1 }, at: 600, dur: 900 }
          ] },
          { caption: "از دور، مربع‌ها آن‌قدر ریزند که ما فقط یک قلب می‌بینیم.", key: 2600, do: [
            { id: "pix.nums", to: { o: 0 }, dur: 500 }, { id: "pix.lines", to: { o: 0 }, dur: 500 },
            { cam: { x: 80, y: 45, zoom: 1 }, at: 400, dur: 2000 },
            { id: "heart", to: { o: 1 }, at: 1400, dur: 900 }, { id: "pix", to: { o: 0 }, at: 1600, dur: 900 }
          ] }
        ],
        question: "هر مربع کوچک چند رنگ دارد؟", options: [{ label: "یک رنگ", value: 1 }, { label: "دو رنگ", value: 2 }, { label: "همه رنگ‌ها", value: 9 }], answer: 1 },
      { type: "pixels", prompt: "این رمز یک تصویر است: ۰ یعنی سفید، ۱ یعنی سیاه. مربع‌ها را رنگ کن تا تصویر پیدا شود.", say: "این رمز یک تصویر است. صفر یعنی سفید، یک یعنی سیاه. مربع‌ها را رنگ کن تا تصویر پیدا شود.",
        colors: ["#ffffff", "#2b2b2b"], names: ["سفید", "سیاه"], pic: ["00100", "01110", "11111", "00100", "00100"] },
      { type: "pixels", prompt: "این بار سه رنگ داریم: ۰ سفید، ۱ قرمز، ۲ سبز. ردیف اول را رنگ کرده‌ایم. بقیه را تو رنگ کن.", say: "این بار سه رنگ داریم. صفر سفید، یک قرمز، دو سبز. ردیف اول را رنگ کرده‌ایم. بقیه را تو رنگ کن.",
        colors: ["#ffffff", "#e03131", "#2f9e44"], names: ["سفید", "قرمز", "سبز"], pic: ["10101", "11111", "01110", "00200", "22222", "00200"], done: [0] },
      { type: "pixels", mode: "read", prompt: "رمز ردیف نشان‌دار این قلب کدام است؟", say: "رمز ردیف نشان‌دار این قلب کدام است؟",
        colors: ["#ffffff", "#e03131"], pic: ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"], row: 3,
        options: ["0011100", "0111110", "1111111"] },
      { type: "pixels", mode: "read", prompt: "رمز ردیف نشان‌دار این گل کدام است؟", say: "رمز ردیف نشان‌دار این گل کدام است؟",
        colors: ["#ffffff", "#e03131", "#2f9e44"], pic: ["10101", "11111", "01110", "00200", "22222", "00200"], row: 0,
        options: ["01010", "10101", "11111"] },
      { type: "unplugged", text: "یک کاغذ شطرنجی بردارید (یا خودتان روی کاغذ یک جدول بکشید). یک تصویر ساده را با عدد بنویسید: ۰ یعنی سفید بماند، ۱ یعنی سیاه کن. کودک رمز را به تصویر تبدیل کند. بعد جایتان را عوض کنید: او یک تصویر بکشد و رمزش را برای شما بنویسد. بپرسید: «اگر مربع‌ها ریزتر و بیشتر باشند، تصویر چطور می‌شود؟»" }
    ]
  },
  {
    id: "think-sapling-16", subject: "think", level: "sapling", emoji: "🔢", title: "رمز و پیام",
    steps: [
      { type: "choose", prompt: "در این رمز، هر حرف یک عدد دارد: ب = ۱، ا = ۲، غ = ۳. رمز «۱ ۲ ۳» چه کلمه‌ای است؟", say: "در این رمز، هر حرف یک عدد دارد. ب یک است، الف دو، غ سه. رمز یک، دو، سه چه کلمه‌ای است؟",
        options: [{ label: "باغ", value: "a" }, { label: "غاب", value: "b" }, { label: "آبی", value: "c" }], answer: "a" },
      { type: "pairs", prompt: "هر عدد را به حرفش برسان: ب = ۱، ا = ۲، غ = ۳، چ = ۴، ه = ۵", say: "هر عدد را به حرفش برسان. ب یک، الف دو، غ سه، چ چهار، ه پنج.",
        pairs: [[1, "ب"], [2, "ا"], [3, "غ"], [4, "چ"], [5, "ه"]] },
      { type: "choose", prompt: "با همین رمز (ب = ۱، ا = ۲، غ = ۳، چ = ۴، ه = ۵)، «۱ ۲ ۳ ۴ ۵» چه می‌شود؟", say: "با همین رمز، یک، دو، سه، چهار، پنج چه می‌شود؟",
        options: [{ label: "باغچه", value: "a" }, { label: "باغبان", value: "b" }, { label: "چاه", value: "c" }], answer: "a" },
      { type: "choose", prompt: "حالا تو با رمز بنویس: «آب» چه می‌شود؟ (آ را مثل ا بنویس.)", say: "حالا تو با رمز بنویس. آب چه می‌شود؟",
        options: [{ label: "۲ ۱", value: "a" }, { label: "۱ ۲", value: "b" }, { label: "۳ ۱", value: "c" }], answer: "a" },
      { type: "choose", prompt: "رمز را بزرگ‌تر کرده‌ایم: ب = ۱، ا = ۲، غ = ۳، چ = ۴، ه = ۵، م = ۶، ن = ۷. پیام «۶ ۲ ۶ ۲ ۷» چیست؟", say: "رمز را بزرگ‌تر کرده‌ایم. م شش است و ن هفت. پیام شش، دو، شش، دو، هفت چیست؟",
        options: [{ label: "مامان", value: "a" }, { label: "بابا", value: "b" }, { label: "نان", value: "c" }], answer: "a" },
      { type: "unplugged", text: "با هم یک «جدول رمز» بسازید: به هر حرف الفبا یک عدد بدهید (ا = ۱، ب = ۲، …) یا یک شکل. کودک اسمش را با رمز بنویسد و شما بخوانید. بعد برای هم پیام رمزی بنویسید و زیر بالش یا روی یخچال بگذارید. بپرسید: «اگر کسی جدول رمز را نداشته باشد، می‌تواند پیام را بخواند؟»" }
    ]
  },
  {
    id: "think-sapling-17", subject: "think", level: "sapling", emoji: "📋", title: "پرسیدن و شمردن",
    steps: [
      { type: "chart", title: "میوه محبوب خانواده", prompt: "از همه اعضای خانواده پرسیدیم: «کدام میوه را بیشتر دوست داری؟» جواب‌ها در این نمودار است.",
        say: "از همه اعضای خانواده پرسیدیم: کدام میوه را بیشتر دوست داری؟ جواب‌ها در این نمودار است.",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "موز", pic: "🍌", n: 2 }, { label: "انگور", pic: "🍇", n: 3 }],
        question: "بیشتر اعضای خانواده کدام میوه را دوست دارند؟", options: [{ label: "سیب", value: "a" }, { label: "موز", value: "b" }, { label: "انگور", value: "c" }], answer: "a" },
      { type: "chart", title: "میوه محبوب خانواده", prompt: "همان نمودار.",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "موز", pic: "🍌", n: 2 }, { label: "انگور", pic: "🍇", n: 3 }],
        question: "چند نفر انگور را دوست دارند؟", options: [2, 3, 4], answer: 3 },
      { type: "chart", title: "نوشیدنی صبحانه", make: true, prompt: "این بار پرسیدیم: «صبحانه چه می‌نوشی؟» هر جواب را در ستون خودش بگذار.",
        say: "این بار پرسیدیم: صبحانه چه می‌نوشی؟ هر جواب را در ستون خودش بگذار.",
        rows: [{ label: "چای", pic: "🍵", n: 3 }, { label: "شیر", pic: "🥛", n: 2 }, { label: "آب", pic: "💧", n: 1 }],
        question: "چند نفر بیشتر از شیر، چای می‌نوشند؟", options: [1, 2, 3], answer: 1 },
      { type: "choose", prompt: "یک مهمان تازه می‌آید. با نگاه به نمودار میوه‌ها، بهترین حدس این است که او کدام میوه را دوست دارد؟", say: "یک مهمان تازه می‌آید. با نگاه به نمودار میوه‌ها، بهترین حدس این است که او کدام میوه را دوست دارد؟",
        pic: true, options: ["🍎", "🍌", "🍇"], answer: "🍎" },
      { type: "choose", prompt: "با این نمودار می‌توانیم بگوییم همه مردم دنیا سیب را از همه بیشتر دوست دارند؟", say: "با این نمودار می‌توانیم بگوییم همه مردم دنیا سیب را از همه بیشتر دوست دارند؟",
        options: [{ label: "نه، ما فقط از خانواده خودمان پرسیدیم", value: "no" }, { label: "بله", value: "yes" }], answer: "no" },
      { type: "unplugged", text: "یک سؤال با هم انتخاب کنید (مثلاً «کدام رنگ را بیشتر دوست داری؟» یا «صبحانه چه دوست داری؟») و از همه اعضای خانواده، و اگر شد از اقوام پشت تلفن، بپرسید. کودک برای هر جواب یک خط (چوب‌خط) در جدول بکشد. بعد با هم بشمارید و یک نمودار تصویری بکشید. بپرسید: «کدام بیشتر بود؟ اگر خاله هم جواب بدهد، فکر می‌کنی چه می‌گوید؟»" }
    ]
  },
  {
    id: "think-sapling-18", subject: "think", level: "sapling", emoji: "🧺", title: "رایانه دستور می‌گیرد",
    steps: [
      /* A washing machine has a small computer (its chip glows) that runs a program people wrote, one step at a time:
         water in, turn, water out. A traffic light's computer runs its program too. Then: the machines can be
         touched (hardware), the program can't (software). Drawings: js/art/rig-think.js; Sara from
         js/art/rig-english.js. */
      { type: "scene", prompt: "رایانه‌های کوچک دور و بر ما", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, washer: { art: "ts-washer", at: [36, 86], s: 1.1 },
          prog: { art: "ts-prog", at: [90, 28], o: 0 }, pencil: { art: "pencil", at: [104, 30], o: 0 },
          light: { art: "ts-light", at: [140, 88], s: 0.85, o: 0 }, sara: { art: "en-sara", at: [88, 88], o: 0 }
        },
        scenes: [
          { caption: "این ماشین لباس‌شویی است. درونش یک رایانه کوچک هست.", key: 2200, do: [
            { id: "washer.water", to: { sy: 0 }, dur: 1 },
            { id: "washer.chip", to: { o: 1 }, at: 500, dur: 500 }, { id: "washer.chip", to: { s: 1.3 }, at: 1100, dur: 400, yoyo: true, times: 4 }
          ] },
          { caption: "آدم‌ها برای این رایانه برنامه نوشته‌اند: ۱. آب بریز. ۲. بچرخان. ۳. آب را خالی کن.", key: 4400, do: [
            { id: "prog", to: { o: 1 }, dur: 500 }, { id: "pencil", to: { o: 1 }, at: 300, dur: 300 },
            { id: "pencil", path: "M104 21Q92 19 80 21", at: 600, dur: 1000 }, { id: "pencil", path: "M104 30Q92 28 80 30", at: 1800, dur: 1000 },
            { id: "pencil", path: "M104 39Q92 37 80 39", at: 3000, dur: 1000 }, { id: "pencil", to: { o: 0 }, at: 4200, dur: 300 }
          ] },
          { caption: "رایانه برنامه را قدم‌به‌قدم اجرا می‌کند.", key: 4400, do: [
            { id: "prog.h1", to: { o: 1 }, dur: 300 }, { id: "washer.water", to: { sy: 1 }, at: 300, dur: 1500 },
            { id: "prog.h1", to: { o: 0 }, at: 1900, dur: 200 }, { id: "prog.h2", to: { o: 1 }, at: 1900, dur: 200 },
            { id: "washer.drum", to: { r: 720 }, at: 2100, dur: 2200 },
            { id: "prog.h2", to: { o: 0 }, at: 4400, dur: 200 }, { id: "prog.h3", to: { o: 1 }, at: 4400, dur: 200 },
            { id: "washer.water", to: { sy: 0 }, at: 4600, dur: 1500 }, { id: "prog.h3", to: { o: 0 }, at: 6300, dur: 300 }
          ] },
          { caption: "چراغ راهنمایی هم یک رایانه دارد. برنامه‌اش می‌گوید کی سبز شود، کی زرد و کی قرمز.", key: 3400, do: [
            { id: "light", to: { o: 1 }, dur: 500 }, { id: "light.chip", to: { o: 1 }, at: 500, dur: 400 },
            { id: "light.green", to: { o: 1 }, at: 1000, dur: 200 }, { id: "light.green", to: { o: 0 }, at: 2400, dur: 200 },
            { id: "light.yellow", to: { o: 1 }, at: 2400, dur: 200 }, { id: "light.yellow", to: { o: 0 }, at: 3600, dur: 200 },
            { id: "light.red", to: { o: 1 }, at: 3600, dur: 200 }
          ] },
          { caption: "ماشین و چراغ را می‌شود لمس کرد: این‌ها «سخت‌افزار»ند. برنامه را نمی‌شود لمس کرد: برنامه «نرم‌افزار» است.", key: 3600, do: [
            { id: "sara", to: { o: 1 }, dur: 500 }
          ].concat(TK.pose("sara", "L", "point", 600, 700), [
            { id: "washer", to: { s: 1.15 }, at: 1300, dur: 400, yoyo: true, times: 2 }, { id: "light", to: { s: 0.95 }, at: 1300, dur: 400, yoyo: true, times: 2 },
            { id: "prog", to: { s: 1.12 }, at: 2900, dur: 400, yoyo: true, times: 2 }, { emit: "spark", where: [90, 28], spread: [18, 12], n: 7, at: 2900, dur: 600 }
          ]) }
        ],
        question: "برنامه ماشین لباس‌شویی را چه کسی نوشته است؟",
        options: [{ label: "آدم‌ها", value: "people" }, { label: "خود ماشین", value: "machine" }], answer: "people" },
      { type: "sort", prompt: "کدام درونش رایانه دارد؟",
        baskets: [{ pic: "💻", label: "رایانه دارد", value: "yes" }, { pic: "🧺", label: "رایانه ندارد", value: "no" }],
        items: [{ pic: "📱", say: "تلفن همراه", basket: "yes" }, { pic: "🚦", say: "چراغ راهنمایی", basket: "yes" }, { pic: "📺", say: "تلویزیون", basket: "yes" },
          { pic: "🥄", say: "قاشق", basket: "no" }, { pic: "🪑", say: "صندلی", basket: "no" }, { pic: "🧸", say: "خرس عروسکی", basket: "no" }] },
      { type: "sort", prompt: "کدام سخت‌افزار است (می‌شود لمسش کرد) و کدام نرم‌افزار (برنامه)؟",
        baskets: [{ pic: "✋", label: "سخت‌افزار", value: "hard" }, { pic: "📝", label: "نرم‌افزار", value: "soft" }],
        items: [{ pic: "⌨️", label: "صفحه‌کلید", basket: "hard" }, { pic: "🖱️", label: "موس", basket: "hard" }, { pic: "🖥️", label: "صفحه‌نمایش", basket: "hard" },
          { pic: "🎨", label: "برنامه نقاشی", basket: "soft" }, { pic: "🧩", label: "بازی پازل روی تبلت", basket: "soft" }, { pic: "🧮", label: "ماشین‌حساب تلفن", basket: "soft" }] },
      { type: "choose", prompt: "رایانه چطور کار تازه‌ای انجام می‌دهد؟", say: "رایانه چطور کار تازه‌ای انجام می‌دهد؟",
        options: [{ label: "یک نفر برایش برنامه تازه‌ای می‌نویسد", value: "prog" }, { label: "خودش یک‌دفعه بلد می‌شود", value: "self" }], answer: "prog" },
      { type: "choose", prompt: "در نانوایی، رایانه کوچک فر چه کاری می‌کند؟", say: "در نانوایی، رایانه کوچک فر چه کاری می‌کند؟",
        options: [{ label: "فر را به اندازه درست گرم نگه می‌دارد", value: "heat" }, { label: "خمیر را با دست ورز می‌دهد", value: "dough" }], answer: "heat" },
      { type: "unplugged", text: "در خانه دنبال چیزهایی بگردید که درونشان یک رایانه کوچک هست: ماشین لباس‌شویی، مایکروویو، کنترل تلویزیون، ساعت دیجیتال، تلفن. برای هر کدام بپرسید: «برنامه‌اش چه می‌گوید؟ اول چه می‌کند، بعد چه؟» بعد شما رایانه شوید و کودک برای شما یک «برنامه صبحانه» بنویسد که دقیقاً همان را اجرا کنید." }
    ]
  },
  {
    id: "think-sapling-19", subject: "think", level: "sapling", emoji: "🗂️", title: "پوشه‌ها",
    steps: [
      /* On a computer screen: the drawing is saved (it becomes a file), the file goes into the «نقاشی‌ها» folder
         (🎨), that folder into the bigger «کارهای من» folder (⭐); the next day both are opened and the drawing is
         found; an old drawing goes into the bin. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "نقاشی‌مان را کجا نگه داریم؟", bg: "#eef1f4",
        parts: {
          screen: { art: "ts-screen", at: [80, 42] }, drawing: { art: "ts-drawing", at: [80, 38] }, file: { art: "ts-file", at: [80, 38], o: 0 },
          old: { art: "ts-file", at: [44, 26], o: 0 },
          art: { art: "ts-folder", look: { icon: "🎨", c: "#f2c14e" }, at: [52, 64] }, mine: { art: "ts-folder", look: { icon: "⭐", c: "#7cc4e4" }, at: [100, 64], s: 1.3 },
          bin: { art: "ts-bin", at: [122, 64] }, cursor: { art: "ts-cursor", at: [112, 50] }
        },
        scenes: [
          { caption: "روی صفحه یک نقاشی کشیده‌ایم. حالا «ذخیره»اش می‌کنیم تا گم نشود.", key: 2600, do: [
            { id: "cursor", path: "M112 50L92 46", at: 200, dur: 800 }, { id: "cursor", to: { s: 0.85 }, at: 1100, dur: 150, yoyo: true, times: 2 },
            { id: "drawing", to: { s: 0.3, o: 0 }, at: 1500, dur: 900 }, { id: "file", to: { o: 1 }, at: 1700, dur: 700 }
          ] },
          { caption: "فایل نقاشی را در پوشه «نقاشی‌ها» می‌گذاریم.", key: 2400, do: [
            { id: "art.flap", to: { sy: 0.4 }, dur: 400 },
            { id: "file", path: "M80 38Q64 38 52 58", at: 400, dur: 1200 }, { id: "cursor", path: "M92 46Q70 44 56 60", at: 400, dur: 1200 },
            { id: "file", to: { o: 0, s: 0.6 }, at: 1600, dur: 400 }, { id: "art.flap", to: { sy: 1 }, at: 1900, dur: 400 }
          ] },
          { caption: "پوشه «نقاشی‌ها» را در پوشه بزرگ‌تر «کارهای من» می‌گذاریم، مثل جعبه‌ای که داخل یک جعبه بزرگ‌تر است.", key: 3000, do: [
            { id: "mine.flap", to: { sy: 0.4 }, dur: 400 },
            { id: "art", path: "M52 64Q76 50 100 62", at: 400, dur: 1500 }, { id: "cursor", path: "M56 60Q80 48 104 58", at: 400, dur: 1500 },
            { id: "art", to: { s: 0.6, o: 0 }, at: 1900, dur: 400 }, { id: "mine.flap", to: { sy: 1 }, at: 2300, dur: 400 }
          ] },
          { caption: "فردا پوشه‌ها را باز می‌کنیم و نقاشی‌مان را پیدا می‌کنیم.", key: 4600, do: [
            { id: "cursor", to: { s: 0.85 }, dur: 150, yoyo: true, times: 2 }, { id: "mine.flap", to: { sy: 0.4 }, at: 300, dur: 400 },
            { id: "art", to: { o: 1, s: 1 }, at: 700, dur: 500 }, { id: "art", path: "M100 62Q80 50 66 64", at: 900, dur: 1100 },
            { id: "mine.flap", to: { sy: 1 }, at: 2000, dur: 400 }, { id: "art.flap", to: { sy: 0.4 }, at: 2300, dur: 400 },
            { id: "file", to: { x: 66, y: 58, o: 1, s: 1 }, at: 2700, dur: 400 }, { id: "file", path: "M66 58Q72 42 80 38", at: 3100, dur: 900 },
            { id: "art.flap", to: { sy: 1 }, at: 3300, dur: 400 }, { id: "file", to: { o: 0 }, at: 4000, dur: 400 }, { id: "drawing", to: { s: 1, o: 1 }, at: 4000, dur: 700 }
          ] },
          { caption: "یک نقاشی قدیمی را دیگر نمی‌خواهیم. آن را در «سطل زباله» می‌اندازیم.", key: 2500, do: [
            { id: "drawing", to: { o: 0 }, dur: 500 }, { id: "old", to: { o: 1 }, at: 300, dur: 400 },
            { id: "bin.lid", to: { r: -70 }, at: 900, dur: 400 },
            { id: "old", path: "M44 26Q90 8 122 56", at: 1100, dur: 1500 }, { id: "old", to: { s: 0.5, o: 0 }, at: 2500, dur: 300 },
            { id: "bin.lid", to: { r: 0 }, at: 2900, dur: 400 }
          ] }
        ],
        question: "پوشه به چه دردی می‌خورد؟",
        options: [{ label: "کارها را مرتب نگه می‌دارد تا راحت پیدا شوند", value: "tidy" }, { label: "نقاشی را رنگی می‌کند", value: "colour" }], answer: "tidy" },
      { type: "sort", prompt: "هر فایل را در پوشه درستش بگذار",
        baskets: [{ pic: "🎨", label: "نقاشی‌ها", value: "art" }, { pic: "📷", label: "عکس‌ها", value: "photo" }, { pic: "🎵", label: "آهنگ‌ها", value: "music" }],
        items: [{ pic: "🖍️", label: "نقاشی خانه", basket: "art" }, { pic: "✏️", label: "نقاشی درخت", basket: "art" }, { pic: "🎂", label: "عکس تولد", basket: "photo" },
          { pic: "👵", label: "عکس مادربزرگ", basket: "photo" }, { pic: "🎵", label: "آهنگ «باران»", basket: "music" }, { pic: "🔔", label: "صدای زنگ", basket: "music" }] },
      { type: "choose", prompt: "دیروز نقاشی‌ات را در پوشه «نقاشی‌ها» گذاشتی. امروز کجا دنبالش بگردی؟", say: "دیروز نقاشی‌ات را در پوشه نقاشی‌ها گذاشتی. امروز کجا دنبالش بگردی؟",
        options: [{ label: "در پوشه «نقاشی‌ها»", value: "art" }, { label: "در سطل زباله", value: "bin" }, { label: "در پوشه «آهنگ‌ها»", value: "music" }], answer: "art" },
      { type: "choose", prompt: "اشتباهی یک عکس خوب را در سطل زباله انداختی. چه کار کنیم؟", say: "اشتباهی یک عکس خوب را در سطل زباله انداختی. چه کار کنیم؟",
        options: [{ label: "با کمک بزرگ‌تر، آن را از سطل زباله برمی‌گردانیم", value: "restore" }, { label: "دیگر هیچ کاری نمی‌شود کرد", value: "lost" }], answer: "restore" },
      { type: "choose", prompt: "پوشه‌ای که داخل یک پوشه دیگر است مثل کدام است؟", say: "پوشه‌ای که داخل یک پوشه دیگر است مثل کدام است؟",
        options: [{ label: "📦 جعبه‌ای داخل یک جعبه بزرگ‌تر", value: "box" }, { label: "🎈 بادکنکی که باد می‌شود", value: "balloon" }], answer: "box" },
      { type: "unplugged", text: "اسباب‌بازی‌ها یا نقاشی‌های کودک را با چند جعبه یا پاکت «پوشه‌بندی» کنید: یک جعبه بزرگ «کارهای من» و داخلش پاکت‌های «نقاشی‌ها»، «کاردستی‌ها» و… روی هر کدام برچسب بزنید. بعد یک چیز را بخواهید و ببینید کودک چقدر زود پیدایش می‌کند. اگر رایانه یا تبلت دارید، با هم یک نقاشی را ذخیره کنید، در یک پوشه بگذارید و فردا دوباره پیدایش کنید." }
    ]
  },
  {
    id: "think-sapling-20", subject: "think", level: "sapling", emoji: "🌍", title: "اینترنت چیست؟",
    steps: [
      /* Two cities joined by a network of stops. Sara's message (an envelope) goes stop to stop to her aunt in the other
         city; then a photo she shares goes to every stop and stays. Drawings: js/art/rig-think.js; Sara and her aunt
         (the "en-teacher" drawing) from js/art/rig-english.js. */
      { type: "scene", prompt: "پیام سارا چطور به خاله می‌رسد؟", bg: "#eaf4fb",
        parts: {
          net: { art: "ts-net" }, cityL: { art: "ts-city", at: [18, 40] }, cityR: { art: "ts-city", at: [142, 40] },
          sara: { art: "en-sara", at: [16, 88], s: 0.85 }, aunt: { art: "en-teacher", at: [146, 88], s: 0.7 },
          phoneS: { art: "tk-phone-s", at: [16, 66], s: 0.36 }, phoneA: { art: "tk-phone-s", at: [146, 64], s: 0.32 },
          ring: { art: "ts-ring", at: [42, 24], o: 0 }, env: { art: "ts-env", at: [16, 62], o: 0 },
          p1: { art: "ts-photo", at: [16, 62], o: 0 }, p2: { art: "ts-photo", at: [16, 62], o: 0 }, p3: { art: "ts-photo", at: [16, 62], o: 0 },
          p4: { art: "ts-photo", at: [16, 62], o: 0 }, p5: { art: "ts-photo", at: [16, 62], o: 0 }, p6: { art: "ts-photo", at: [16, 62], o: 0 }
        },
        scenes: [
          { caption: "رایانه‌ها و تلفن‌های شهرهای مختلف، با سیم و بی‌سیم، به هم وصل‌اند. به این شبکه بزرگ «اینترنت» می‌گویند.", key: 3000, do: [
            { id: "net.lines", draw: true, dur: 2800 }
          ] },
          { caption: "سارا برای خاله‌اش که در شهر دیگری زندگی می‌کند، یک پیام می‌فرستد.", key: 2000, do: TK.pose("sara", "R", "chest", 0, 600).concat([
            { id: "env", to: { o: 1 }, at: 900, dur: 400 }, { id: "env", to: { s: 1.3 }, at: 1300, dur: 300, yoyo: true, times: 2 }
          ]) },
          { caption: "پیام از چند ایستگاه می‌گذرد تا برسد.", key: 5200, do: [
            { id: "env", path: "M16 62L24 30L42 24L64 36L98 40L120 30L136 30L146 60", dur: 6000, ease: "linear" },
            { id: "ring", to: { o: 1 }, at: 1500, dur: 200 }, { id: "ring", to: { o: 0 }, at: 2000, dur: 300 },
            { id: "ring", to: { x: 64, y: 36 }, at: 2300, dur: 1 }, { id: "ring", to: { o: 1 }, at: 2350, dur: 200 }, { id: "ring", to: { o: 0 }, at: 2900, dur: 300 },
            { id: "ring", to: { x: 98, y: 40 }, at: 3300, dur: 1 }, { id: "ring", to: { o: 1 }, at: 3350, dur: 200 }, { id: "ring", to: { o: 0 }, at: 3900, dur: 300 },
            { id: "ring", to: { x: 120, y: 30 }, at: 4300, dur: 1 }, { id: "ring", to: { o: 1 }, at: 4350, dur: 200 }, { id: "ring", to: { o: 0 }, at: 4900, dur: 300 }
          ] },
          { caption: "خاله پیام را می‌گیرد و خوشحال می‌شود.", key: 1800, do: [
            { id: "env", to: { s: 1.3 }, dur: 300, yoyo: true, times: 2 }, { id: "env", to: { o: 0 }, at: 900, dur: 400 }
          ].concat(TK.face("aunt", true, 600), [{ id: "aunt.head", to: { y: 1.2 }, at: 900, dur: 350, yoyo: true, times: 2 }]) },
          { caption: "اما چیزی که در اینترنت می‌گذاریم، به خیلی جاها می‌رسد و خیلی‌ها می‌توانند ببینندش. بعداً هم می‌ماند.", key: 3400, do: [
            { id: "p1", to: { o: 1 }, dur: 300 }, { id: "p1", path: "M16 62L24 30L42 24L60 16", at: 300, dur: 1600 },
            { id: "p2", to: { o: 1 }, at: 300, dur: 300 }, { id: "p2", path: "M16 62L24 30L42 24L64 40", at: 500, dur: 1600 },
            { id: "p3", to: { o: 1 }, at: 600, dur: 300 }, { id: "p3", path: "M16 62L24 30L42 24L60 12L84 26", at: 800, dur: 1800 },
            { id: "p4", to: { o: 1 }, at: 900, dur: 300 }, { id: "p4", path: "M16 62L24 30L42 24L64 36L98 44", at: 1100, dur: 1800 },
            { id: "p5", to: { o: 1 }, at: 1200, dur: 300 }, { id: "p5", path: "M16 62L24 30L42 24L60 12L84 22L110 16", at: 1400, dur: 2000 },
            { id: "p6", to: { o: 1 }, at: 1500, dur: 300 }, { id: "p6", path: "M16 62L24 30L42 24L64 36L98 40L120 34", at: 1700, dur: 2000 }
          ] }
        ],
        question: "پیام سارا چطور به خاله رسید؟",
        options: [{ label: "از چند ایستگاه گذشت", value: "stops" }, { label: "با کبوتر نامه‌رسان", value: "bird" }], answer: "stops" },
      { type: "order", prompt: "سفر پیام را به ترتیب بچین", say: "سفر پیام را به ترتیب بچین", numbered: true,
        items: [{ pic: "📱", label: "سارا پیام را می‌نویسد", say: "سارا پیام را می‌نویسد" }, { pic: "✉️", label: "پیام از ایستگاه‌ها می‌گذرد", say: "پیام از ایستگاه‌ها می‌گذرد" },
          { pic: "👩", label: "خاله پیام را می‌خواند", say: "خاله پیام را می‌خواند" }, { pic: "💌", label: "خاله جواب می‌دهد", say: "خاله جواب می‌دهد" }] },
      { type: "choose", prompt: "اینترنت چیست؟", say: "اینترنت چیست؟",
        options: [{ label: "رایانه‌های دور و نزدیک که به هم وصل‌اند", value: "net" }, { label: "یک رایانه خیلی بزرگ در یک اتاق", value: "one" }], answer: "net" },
      { type: "choose", prompt: "کسی عکس خانه‌شان را در اینترنت گذاشت. چه کسانی ممکن است آن را ببینند؟", say: "کسی عکس خانه‌شان را در اینترنت گذاشت. چه کسانی ممکن است آن را ببینند؟",
        options: [{ label: "خیلی از آدم‌ها، حتی کسانی که نمی‌شناسیم", value: "many" }, { label: "فقط خاله", value: "aunt" }], answer: "many" },
      { type: "choose", prompt: "پیش از گذاشتن هر چیزی در اینترنت، چه کار کنیم؟", say: "پیش از گذاشتن هر چیزی در اینترنت، چه کار کنیم؟",
        options: [{ label: "از پدر یا مادر می‌پرسیم", value: "ask" }, { label: "زود می‌فرستیم", value: "send" }], answer: "ask" },
      { type: "unplugged", text: "بازی «پیام‌رسان»: چند نفر از اعضای خانواده در جاهای مختلف خانه «ایستگاه» شوند. کودک یک پیام روی کاغذ بنویسد و آن را دست‌به‌دست از ایستگاه‌ها به «خاله» در آخرین اتاق برساند. بعد بپرسید: «همه ایستگاه‌ها پیام را دیدند؟ اگر پیام خصوصی بود چه؟» یادآوری کنید که چیزی که در اینترنت می‌گذاریم، به خیلی جاها می‌رسد و می‌ماند." }
    ]
  },
  {
    id: "think-sapling-26", subject: "think", level: "sapling", emoji: "🔌", title: "بازی رایانه و اینترنت",
    steps: [
      { type: "sort", prompt: "کدام درونش رایانه دارد؟",
        baskets: [{ pic: "💻", label: "رایانه دارد", value: "yes" }, { pic: "🧺", label: "رایانه ندارد", value: "no" }],
        items: [{ pic: "🚗", say: "ماشین", basket: "yes" }, { pic: "🧱", say: "آجر", basket: "no" }, { pic: "📷", say: "دوربین", basket: "yes" },
          { pic: "📚", say: "کتاب", basket: "no" }, { pic: "⏰", say: "ساعت زنگ‌دار دیجیتال", basket: "yes" }, { pic: "🍞", say: "نان", basket: "no" }] },
      { type: "sort", prompt: "سخت‌افزار یا نرم‌افزار؟",
        baskets: [{ pic: "✋", label: "سخت‌افزار", value: "hard" }, { pic: "📝", label: "نرم‌افزار", value: "soft" }],
        items: [{ pic: "💻", label: "رایانه کیفی", basket: "hard" }, { pic: "📷", label: "دوربین", basket: "hard" }, { pic: "📱", label: "تلفن", basket: "hard" },
          { pic: "🗺️", label: "برنامه نقشه", basket: "soft" }, { pic: "🎵", label: "برنامه آهنگ", basket: "soft" }, { pic: "🎨", label: "برنامه نقاشی", basket: "soft" }] },
      { type: "order", prompt: "سفر پیام به پدربزرگ را به ترتیب بچین", say: "سفر پیام به پدربزرگ را به ترتیب بچین", numbered: true,
        items: [{ pic: "⌨️", label: "پیام را می‌نویسیم", say: "پیام را می‌نویسیم" }, { pic: "👆", label: "«فرستادن» را می‌زنیم", say: "فرستادن را می‌زنیم" },
          { pic: "✉️", label: "پیام از ایستگاه‌ها می‌گذرد", say: "پیام از ایستگاه‌ها می‌گذرد" }, { pic: "👴", label: "پدربزرگ پیام را می‌خواند", say: "پدربزرگ پیام را می‌خواند" }] },
      { type: "pairs", prompt: "هر چیز را به رایانه کوچکی که دارد برسان: آن رایانه چه کار می‌کند؟", say: "هر چیز را به کاری که رایانه کوچکش می‌کند برسان.",
        pairs: [[{ pic: "🚦", say: "چراغ راهنمایی" }, { label: "رنگ چراغ را عوض می‌کند" }], [{ pic: "⏰", say: "ساعت زنگ‌دار" }, { label: "سر وقت زنگ می‌زند" }],
          [{ pic: "🧺", say: "ماشین لباس‌شویی" }, { label: "لباس‌ها را می‌چرخاند" }], [{ pic: "📷", say: "دوربین" }, { label: "عکس را نگه می‌دارد" }]] },
      { type: "choose", prompt: "پیام از تهران به شیراز چطور می‌رود؟", say: "پیام از تهران به شیراز چطور می‌رود؟",
        options: [{ label: "از ایستگاه‌های اینترنت، یکی پس از دیگری", value: "net" }, { label: "یک نفر آن را با دوچرخه می‌برد", value: "bike" }], answer: "net" },
      { type: "unplugged", text: "یک «نقشه اینترنت» روی کاغذ بکشید: خانه شما در یک گوشه، خانه یکی از اقوام در گوشه دیگر، و چند ایستگاه بین آن‌ها که با خط به هم وصل‌اند. کودک با انگشت چند راه مختلف برای رسیدن یک پیام پیدا کند. بپرسید: «اگر یکی از راه‌ها بسته شود، پیام باز هم می‌رسد؟» بعد در خانه دنبال سه چیز بگردید که درونشان رایانه دارند." }
    ]
  },
  {
    id: "think-sapling-21", subject: "think", level: "sapling", emoji: "🤐", title: "اطلاعات من",
    steps: [
      /* A game on a tablet asks for Sara's full name, address, school and a photo; each row gets a padlock (private);
         Sara asks her mother first, who says no, and they close it. Drawings: js/art/rig-think.js; Sara and her
         mother from js/art/rig-english.js. */
      { type: "scene", prompt: "یک بازی از سارا چیزهایی می‌پرسد", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, form: { art: "ts-form", at: [80, 36], s: 0.9 },
          sara: { art: "en-sara", at: [24, 88] }, mom: { art: "en-mother", at: [138, 88], s: 0.95 }
        },
        scenes: [
          { caption: "یک بازی روی تبلت از سارا می‌پرسد: اسم و فامیلی‌ات چیست؟ خانه‌ات کجاست؟ مدرسه‌ات کجاست؟ یک عکس از خودت بفرست.", key: 2600, do: [
            { id: "form", to: { s: 0.98 }, at: 300, dur: 500, yoyo: true, times: 2 }
          ].concat(TK.face("sara", false, 1600)) },
          { caption: "این‌ها «اطلاعات خصوصی» سارا هستند. آن‌ها را به هر کسی نمی‌دهیم.", key: 3200, do: [
            { id: "form.lock1", to: { o: 1 }, at: 300, dur: 400 }, { id: "form.lock2", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "form.lock3", to: { o: 1 }, at: 1700, dur: 400 }, { id: "form.lock4", to: { o: 1 }, at: 2400, dur: 400 }
          ] },
          { caption: "سارا پیش از نوشتن هر چیزی، از مامان می‌پرسد.", key: 2400, do: TK.pose("sara", "R", "point", 0, 700).concat(TK.talk("sara", 600, 1600)) },
          { caption: "مامان می‌گوید: «لازم نیست. این‌ها خصوصی می‌مانند.» با هم صفحه را می‌بندند.", key: 3000, do: TK.pose("sara", "R", "down", 0, 600).concat(
            TK.talk("mom", 200, 1600), [{ id: "mom.head", to: { y: 1.2 }, at: 1800, dur: 350, yoyo: true, times: 2 }, { id: "form", to: { o: 0, s: 0.6 }, at: 2200, dur: 800 }],
            TK.face("sara", true, 2600)) }
        ],
        question: "کدام اطلاعات خصوصی است؟",
        options: [{ label: "🏠 نشانی خانه", value: "addr" }, { label: "🌈 رنگی که دوست دارم", value: "colour" }], answer: "addr" },
      { type: "sort", prompt: "خصوصی است یا گفتنش اشکالی ندارد؟",
        baskets: [{ pic: "🤐", label: "خصوصی", value: "private" }, { pic: "🙂", label: "اشکالی ندارد", value: "ok" }],
        items: [{ pic: "🏠", label: "نشانی خانه", basket: "private" }, { pic: "🏫", label: "اسم مدرسه‌ام", basket: "private" }, { pic: "📷", label: "عکس جلوی خانه‌مان", basket: "private" },
          { pic: "🧒", label: "اسم و فامیلی کاملم", basket: "private" }, { pic: "🌈", label: "رنگی که دوست دارم", basket: "ok" }, { pic: "🐱", label: "حیوانی که دوست دارم", basket: "ok" }] },
      { type: "choose", prompt: "یک سایت می‌گوید: «نشانی خانه‌ات را بنویس تا برایت جایزه بفرستیم.» چه کار کنیم؟", say: "یک سایت می‌گوید: نشانی خانه‌ات را بنویس تا برایت جایزه بفرستیم. چه کار کنیم؟",
        options: [{ label: "اول از پدر یا مادر می‌پرسیم", value: "ask" }, { label: "زود نشانی را می‌نویسیم", value: "write" }], answer: "ask" },
      { type: "choose", prompt: "می‌خواهی عکسی را که لباس مدرسه‌ات در آن پیداست برای همه بفرستی. چه کار کنیم؟", say: "می‌خواهی عکسی را که لباس مدرسه‌ات در آن پیداست برای همه بفرستی. چه کار کنیم؟",
        options: [{ label: "اول با پدر یا مادر حرف می‌زنیم", value: "ask" }, { label: "می‌فرستیم؛ فقط یک عکس است", value: "send" }], answer: "ask" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["با کودک بگویید کدام اطلاعات خصوصی است: اسم و فامیلی کامل، نشانی، مدرسه، شماره تلفن، و عکس‌هایی که خانه یا مدرسه را نشان می‌دهند.",
          "یک قانون ساده با هم بگذارید: «پیش از نوشتن یا فرستادن هر چیزی، از پدر یا مادر می‌پرسم.»",
          "درباره آدم‌هایی که در اینترنت پیام می‌دهند، درس‌های «سلامت و ایمنی» را هم ببینید."] }
    ]
  },
  {
    id: "think-sapling-22", subject: "think", level: "sapling", emoji: "🔑", title: "رمز قوی",
    steps: [
      /* 1234 is guessed after a few tries (the lock opens); a strong password is made from the first letters of a
         sentence only we know, and the same guesses don't open it. The sentence reads right to left (left to right
         in English: js/en/thinking.js moves the letter tiles). Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "رمز قوی چطور ساخته می‌شود؟", bg: "#eef1f4",
        parts: {
          lock: { art: "ts-lock", look: { code: "weak" }, at: [80, 74], s: 1.3 },
          g1: { art: "ts-guess", look: { t: "0000" }, at: [44, 46], o: 0 }, g2: { art: "ts-guess", look: { t: "1111" }, at: [118, 44], o: 0 },
          g3: { art: "ts-guess", look: { t: "1234" }, at: [58, 30], o: 0 },
          words: { art: "ts-words", o: 0 }, box: { art: "ts-pwbox", at: [80, 46], o: 0 },
          t0: { art: "ts-tile", look: { i: 0 }, at: [124, 17.5], o: 0 }, t1: { art: "ts-tile", look: { i: 1 }, at: [102, 17.5], o: 0 },
          t2: { art: "ts-tile", look: { i: 2 }, at: [80, 17.5], o: 0 }, t3: { art: "ts-tile", look: { i: 3 }, at: [58, 17.5], o: 0 },
          t4: { art: "ts-tile", look: { i: 4 }, at: [36, 17.5], o: 0 },
          lock2: { art: "ts-lock", look: { code: "strong" }, at: [80, 88], o: 0 }
        },
        scenes: [
          { caption: "رمز «۱۲۳۴» خیلی ساده است. خیلی‌ها اول همین را امتحان می‌کنند، و قفل باز می‌شود!", key: 4400, do: [
            { id: "g1", to: { o: 1 }, at: 300, dur: 300 }, { id: "lock", to: { r: 6 }, at: 700, dur: 150, yoyo: true, times: 4 },
            { id: "g2", to: { o: 1 }, at: 1500, dur: 300 }, { id: "lock", to: { r: 6 }, at: 1900, dur: 150, yoyo: true, times: 4 },
            { id: "g3", to: { o: 1 }, at: 2700, dur: 300 }, { id: "lock.shackle", to: { y: -5 }, at: 3300, dur: 600 }
          ] },
          { caption: "رمز قوی را از یک جمله می‌سازیم که فقط خودمان می‌دانیم: «من ۲ گربه سفید دارم».", key: 2000, do: [
            { id: "lock", to: { o: 0 }, dur: 500 }, { id: "g1", to: { o: 0 }, dur: 500 }, { id: "g2", to: { o: 0 }, dur: 500 }, { id: "g3", to: { o: 0 }, dur: 500 },
            { id: "words", to: { o: 1 }, at: 600, dur: 700 }
          ] },
          { caption: "از هر کلمه، حرف اولش را برمی‌داریم و کنار هم می‌گذاریم.", key: 5200, do: [
            { id: "box", to: { o: 1 }, dur: 500 },
            { id: "t0", to: { o: 1 }, at: 500, dur: 200 }, { id: "t0", path: "M124 17.5Q112 34 94 46", at: 700, dur: 800 },
            { id: "t1", to: { o: 1 }, at: 1500, dur: 200 }, { id: "t1", path: "M102 17.5Q96 34 87 46", at: 1700, dur: 800 },
            { id: "t2", to: { o: 1 }, at: 2500, dur: 200 }, { id: "t2", path: "M80 17.5Q80 34 80 46", at: 2700, dur: 800 },
            { id: "t3", to: { o: 1 }, at: 3500, dur: 200 }, { id: "t3", path: "M58 17.5Q64 34 73 46", at: 3700, dur: 800 },
            { id: "t4", to: { o: 1 }, at: 4500, dur: 200 }, { id: "t4", path: "M36 17.5Q48 34 66 46", at: 4700, dur: 800 }
          ] },
          { caption: "این رمز ما شد. همان حدس‌ها دیگر قفل را باز نمی‌کنند!", key: 4000, do: [
            { id: "lock2", to: { o: 1 }, dur: 500 },
            { id: "g1", to: { x: 48, y: 68, o: 1 }, at: 700, dur: 300 }, { id: "lock2", to: { r: 6 }, at: 1100, dur: 150, yoyo: true, times: 4 },
            { id: "g2", to: { x: 112, y: 68, o: 1 }, at: 1800, dur: 300 }, { id: "lock2", to: { r: 6 }, at: 2200, dur: 150, yoyo: true, times: 4 },
            { id: "g3", to: { x: 128, y: 84, o: 1 }, at: 2900, dur: 300 }, { id: "lock2", to: { r: 6 }, at: 3300, dur: 150, yoyo: true, times: 4 }
          ] }
        ],
        question: "کدام رمز قوی‌تر است؟",
        options: [{ label: "«م۲گسد»", value: "strong" }, { label: "«۱۲۳۴»", value: "weak" }], answer: "strong" },
      { type: "choose", prompt: "کدام را حدس زدنش سخت‌تر است؟", say: "کدام را حدس زدنش سخت‌تر است؟",
        options: [{ label: "اسم گربه‌مان", value: "pet" }, { label: "حرف‌های اول جمله‌ای که فقط خودمان می‌دانیم", value: "sentence" }], answer: "sentence" },
      { type: "sort", prompt: "رمز قوی یا رمز ضعیف؟",
        baskets: [{ pic: "💪", label: "قوی", value: "strong" }, { pic: "🥚", label: "ضعیف", value: "weak" }],
        items: [{ label: "۱۲۳۴", basket: "weak" }, { label: "۱۱۱۱", basket: "weak" }, { label: "سارا", basket: "weak" },
          { label: "م۲گسد", basket: "strong" }, { label: "ب۵کتس۸ن", basket: "strong" }, { label: "گربه", basket: "weak" }] },
      { type: "choose", prompt: "دوستت می‌گوید: «رمزت را بگو، من هم رمزم را می‌گویم.» چه کار کنیم؟", say: "دوستت می‌گوید: رمزت را بگو، من هم رمزم را می‌گویم. چه کار کنیم؟",
        options: [{ label: "رمزم را به هیچ‌کس جز پدر و مادرم نمی‌گویم", value: "keep" }, { label: "رمزها را با هم عوض می‌کنیم", value: "swap" }], answer: "keep" },
      { type: "choose", prompt: "در کتابخانه مدرسه با رایانه کار کردی. آخر کار چه کار کنیم؟", say: "در کتابخانه مدرسه با رایانه کار کردی. آخر کار چه کار کنیم؟",
        options: [{ label: "«خروج» را می‌زنیم", value: "out" }, { label: "همین‌طور بلند می‌شویم و می‌رویم", value: "leave" }], answer: "out" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["رمز دستگاه‌ها و حساب‌های کودک را خودتان بسازید و جایی امن نگه دارید.",
          "برای ساختن رمز، یک جمله بسازید که کودک به خاطر بسپارد و فقط شما بدانید؛ حرف‌های اول کلمه‌ها با یک عدد، رمز خوبی می‌شود. هرچه بلندتر، بهتر.",
          "به کودک یاد بدهید رمز را به هیچ‌کس، حتی بهترین دوستش، نگوید و روی رایانه‌های مشترک همیشه «خروج» را بزند."] }
    ]
  },
  {
    id: "think-sapling-23", subject: "think", level: "sapling", emoji: "⚽", title: "وقت صفحه، وقت بازی",
    steps: [
      /* Reza plays on a tablet for a long time (the clock's hands go round), gets tired and bored, puts it down and
         plays with a ball, and feels better; the family's screen plan is on the fridge. Drawings: js/art/rig-think.js;
         Reza from js/art/rig-english.js. */
      { type: "scene", prompt: "رضا و تبلت", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, clock: { art: "ts-clock", at: [30, 22] }, fridge: { art: "ts-fridge", at: [136, 88] },
          reza: { art: "en-reza", at: [72, 88] }, pad: { art: "tk-phone-s", at: [72, 72], s: 0.48 }, ball: { art: "en-ball", at: [100, 88], s: 1.8, o: 0 }
        },
        scenes: [
          { caption: "رضا مدت خیلی زیادی است که با تبلت بازی می‌کند. عقربه‌های ساعت را ببین!", key: 3400, do: TK.both("reza", "chest", 0, 500).concat([
            { id: "clock.min", to: { r: 720 }, at: 400, dur: 3200, ease: "linear" }, { id: "clock.hour", to: { r: 60 }, at: 400, dur: 3200, ease: "linear" }
          ]) },
          { caption: "چشم‌هایش خسته شده و حوصله‌اش سر رفته است.", key: 2000, do: TK.face("reza", false, 0).concat([
            { id: "reza.shut", to: { o: 1 }, at: 500, dur: 200, yoyo: true, times: 4 }, { id: "reza.brows", to: { o: 1 }, at: 900, dur: 300 },
            { id: "reza.head", to: { r: 8 }, at: 1400, dur: 600 }
          ]) },
          { caption: "تبلت را کنار می‌گذارد و با توپ بازی می‌کند.", key: 3600, do: [
            { id: "reza.head", to: { r: 0 }, dur: 400 }, { id: "reza.brows", to: { o: 0 }, dur: 300 },
            { id: "pad", path: "M72 72Q62 74 50 86", at: 300, dur: 1100 }
          ].concat(TK.both("reza", "down", 900, 500), [
            { id: "ball", to: { o: 1 }, at: 1500, dur: 300 }, { id: "ball", to: { y: 70 }, at: 1800, dur: 450, yoyo: true, times: 6, ease: "out" }
          ], TK.pose("reza", "R", "give", 1800, 500)) },
          { caption: "حالا حالش خیلی بهتر است!", key: 1800, do: TK.face("reza", true, 0).concat([
            { id: "reza", to: { y: 84 }, at: 300, dur: 300, yoyo: true, times: 4 }, { id: "ball", to: { y: 74 }, at: 300, dur: 300, yoyo: true, times: 4 }
          ]) },
          { caption: "خانواده با هم «برنامه صفحه» نوشته‌اند و روی یخچال گذاشته‌اند: کمی وقت صفحه، و بقیه وقت بازی، کتاب و خواب.", key: 2400, do: [
            { id: "fridge.plan", to: { o: 1 }, dur: 600 }, { id: "fridge", to: { s: 1.06 }, at: 900, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "بعد از مدت زیادی بازی با صفحه، کدام کار حال آدم را بهتر می‌کند؟",
        options: [{ label: "⚽ بازی و جنب‌وجوش", value: "play" }, { label: "📱 باز هم صفحه", value: "screen" }], answer: "play" },
      { type: "sort", prompt: "با صفحه یا بدون صفحه؟",
        baskets: [{ pic: "📱", label: "با صفحه", value: "screen" }, { pic: "🌳", label: "بدون صفحه", value: "off" }],
        items: [{ pic: "🚲", say: "دوچرخه‌سواری", basket: "off" }, { pic: "📚", say: "کتاب خواندن", basket: "off" }, { pic: "📺", say: "تماشای تلویزیون", basket: "screen" },
          { pic: "💻", say: "بازی با رایانه", basket: "screen" }, { pic: "🧩", say: "پازل", basket: "off" }, { pic: "🎨", say: "نقاشی روی کاغذ", basket: "off" }] },
      { type: "choose", prompt: "وقتی مدت زیادی به صفحه نگاه کنیم، چشم‌ها چه می‌شوند؟", say: "وقتی مدت زیادی به صفحه نگاه کنیم، چشم‌ها چه می‌شوند؟",
        options: [{ label: "خسته می‌شوند", value: "tired" }, { label: "قوی‌تر می‌شوند", value: "strong" }], answer: "tired" },
      { type: "choose", prompt: "وقت صفحه‌ات تمام شد ولی بازی نیمه‌کاره است. چه کار کنیم؟", say: "وقت صفحه‌ات تمام شد ولی بازی نیمه‌کاره است. چه کار کنیم؟",
        options: [{ label: "صفحه را خاموش می‌کنیم و فردا ادامه می‌دهیم", value: "stop" }, { label: "یواشکی ادامه می‌دهیم", value: "more" }], answer: "stop" },
      { type: "choose", prompt: "کدام برای شب بهتر است؟", say: "کدام برای شب بهتر است؟",
        options: [{ label: "🛏️ از مدتی پیش از خواب، صفحه خاموش", value: "off" }, { label: "📱 تا لحظه خواب، صفحه روشن", value: "on" }], answer: "off" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["با هم یک «برنامه صفحه» برای خانواده بنویسید: کی و کجا صفحه داریم، و کی و کجا نه (سر سفره، پیش از خواب، در اتاق خواب)، و آن را جایی بزنید که همه ببینند.",
          "بعد از وقت صفحه، بدون سرزنش بپرسید: «الان چه حسی داری؟» این‌طور کودک یاد می‌گیرد خستگی و بی‌حوصلگی را خودش بشناسد.",
          "خودتان هم برنامه را رعایت کنید؛ کودک از کار شما بیشتر یاد می‌گیرد تا از حرف شما."] }
    ]
  },
  {
    id: "think-sapling-27", subject: "think", level: "sapling", emoji: "🛡️", title: "بازی امن بمان",
    steps: [
      { type: "sort", prompt: "خصوصی است یا گفتنش اشکالی ندارد؟",
        baskets: [{ pic: "🤐", label: "خصوصی", value: "private" }, { pic: "🙂", label: "اشکالی ندارد", value: "ok" }],
        items: [{ pic: "🔑", label: "رمز تبلتم", basket: "private" }, { pic: "🏫", label: "مدرسه‌ام کجاست", basket: "private" }, { pic: "⚽", label: "ورزشی که دوست دارم", basket: "ok" },
          { pic: "🍕", label: "غذایی که دوست دارم", basket: "ok" }, { pic: "🏠", label: "نشانی خانه‌مان", basket: "private" }, { pic: "📚", label: "کتابی که دوست دارم", basket: "ok" }] },
      { type: "pairs", prompt: "هر موقعیت را به کار درستش برسان", say: "هر موقعیت را به کار درستش برسان.",
        pairs: [[{ pic: "🔑", label: "کسی رمزت را می‌خواهد" }, { label: "نمی‌گویم" }], [{ pic: "🏠", label: "سایتی نشانی‌ات را می‌خواهد" }, { label: "از پدر و مادرم می‌پرسم" }],
          [{ pic: "⏰", label: "وقت صفحه تمام شد" }, { label: "بازی دیگری می‌کنم" }], [{ pic: "🖥️", label: "کارم با رایانه مدرسه تمام شد" }, { label: "«خروج» را می‌زنم" }]] },
      { type: "sort", prompt: "رمز قوی یا رمز ضعیف؟",
        baskets: [{ pic: "💪", label: "قوی", value: "strong" }, { pic: "🥚", label: "ضعیف", value: "weak" }],
        items: [{ label: "۰۰۰۰", basket: "weak" }, { label: "۱۲۳۴۵۶", basket: "weak" }, { label: "رضا", basket: "weak" },
          { label: "د۳خبسم", basket: "strong" }, { label: "آ۷گدرپ", basket: "strong" }] },
      { type: "choose", prompt: "یک پیام می‌گوید: «تو برنده شدی! رمزت را بنویس تا جایزه‌ات را بفرستیم.» چه کار کنیم؟", say: "یک پیام می‌گوید: تو برنده شدی! رمزت را بنویس تا جایزه‌ات را بفرستیم. چه کار کنیم؟",
        options: [{ label: "رمز را نمی‌نویسیم و پیام را به پدر یا مادر نشان می‌دهیم", value: "tell" }, { label: "رمز را می‌نویسیم", value: "write" }], answer: "tell" },
      { type: "choose", prompt: "بعد از مدت زیادی بازی با تبلت، سرت درد گرفته. چه کار کنیم؟", say: "بعد از مدت زیادی بازی با تبلت، سرت درد گرفته. چه کار کنیم؟",
        options: [{ label: "صفحه را خاموش می‌کنیم و استراحت می‌کنیم", value: "rest" }, { label: "یک بازی دیگر شروع می‌کنیم", value: "more" }], answer: "rest" },
      { type: "unplugged", text: "بازی «چه کار کنم؟»: شما موقعیت‌ها را بگویید و کودک بگوید چه می‌کند: «یک بازی اسم مدرسه‌ات را می‌پرسد»، «دوستت رمزت را می‌خواهد»، «وقت صفحه‌ات تمام شده ولی بازی نیمه‌کاره است». بعد جایتان را عوض کنید. هر جواب خوب را با یک «آفرین، امن ماندی!» جشن بگیرید." }
    ]
  },
  {
    id: "think-sapling-24", subject: "think", level: "sapling", emoji: "🎲", title: "بازی معما",
    steps: [
      { type: "choose", prompt: "مینا، آرش و لیلا در یک صف ایستاده‌اند. مینا اول نیست. آرش آخر است. چه کسی اول است؟", say: "مینا، آرش و لیلا در یک صف ایستاده‌اند. مینا اول نیست. آرش آخر است. چه کسی اول است؟",
        options: [{ label: "مینا", value: "m" }, { label: "آرش", value: "a" }, { label: "لیلا", value: "l" }], answer: "l" },
      { type: "choose", prompt: "توپ زیر یکی از سه لیوان است. سرنخ ۱: زیر لیوان قرمز نیست. سرنخ ۲: زیر لیوان آبی هم نیست. توپ کجاست؟", say: "توپ زیر یکی از سه لیوان است. سرنخ یک: زیر لیوان قرمز نیست. سرنخ دو: زیر لیوان آبی هم نیست. توپ کجاست؟",
        pic: true, options: ["🔴", "🔵", "🟢"], answer: "🟢" },
      { type: "choose", prompt: "آرش از لیلا بلندتر است. لیلا از مینا بلندتر است. کوتاه‌ترین کیست؟", say: "آرش از لیلا بلندتر است. لیلا از مینا بلندتر است. کوتاه‌ترین کیست؟",
        options: [{ label: "آرش", value: "a" }, { label: "لیلا", value: "l" }, { label: "مینا", value: "m" }], answer: "m" },
      { type: "order", prompt: "معمای سگ، مرغ و دانه: کشاورز باید هر سه را با قایق ببرد. سگ را نباید با مرغ تنها گذاشت و مرغ را نباید با دانه. کارها را به ترتیب بچین.",
        say: "معمای سگ، مرغ و دانه. کشاورز باید هر سه را با قایق ببرد. سگ را نباید با مرغ تنها گذاشت و مرغ را نباید با دانه. کارها را به ترتیب بچین.", numbered: true,
        items: [{ pic: "🐔", label: "مرغ را می‌برد", say: "مرغ را می‌برد" }, { pic: "🐶", label: "سگ را می‌برد و مرغ را برمی‌گرداند", say: "سگ را می‌برد و مرغ را برمی‌گرداند" },
          { pic: "🌾", label: "دانه را می‌برد", say: "دانه را می‌برد" }, { pic: "🐔", label: "مرغ را دوباره می‌برد", say: "مرغ را دوباره می‌برد" }] },
      { type: "choose", prompt: "عدد رضا زوج است، از ۵ بزرگ‌تر است و از ۸ کوچک‌تر. عددش چند است؟", say: "عدد رضا زوج است، از پنج بزرگ‌تر است و از هشت کوچک‌تر. عددش چند است؟",
        options: [{ label: "۶", value: 6 }, { label: "۷", value: 7 }, { label: "۸", value: 8 }], answer: 6 },
      { type: "choose", prompt: "برای حل یک معما، کدام راه بهتر است؟", say: "برای حل یک معما، کدام راه بهتر است؟",
        options: [{ label: "سرنخ‌ها را یکی‌یکی می‌خوانم و جواب‌هایی را که جور نیستند خط می‌زنم", value: "clues" }, { label: "بدون خواندن سرنخ‌ها حدس می‌زنم", value: "guess" }], answer: "clues" },
      { type: "unplugged", text: "یک «شب معما» بگذارید! هر کس یک معما بگوید: معمای سرنخ («چیزی در آشپزخانه است، گرد است و نمی‌شود خوردش»)، معمای رودخانه با اسباب‌بازی‌ها، یا یک راه‌پیچ روی کاغذ. بعد از حل هر معما، کودک بگوید چطور فهمید: «اول کدام سرنخ را خواندی؟ کدام جواب‌ها را خط زدی؟»" }
    ]
  },

  // ---------------- Thinking: Tree (inside the computer, flowcharts, conditions, loops, functions, variables,
  // turtle drawing, events, binary, data, the internet, staying safe, AI, puzzles) ----------------
  {
    id: "think-tree-13", subject: "think", level: "tree", emoji: "🧠", title: "درون رایانه",
    steps: [
      /* A key press on its way: keyboard (input) → processor → memory → screen (output), then saved to storage.
         Drawings: js/art/rig-think.js (the keyboard and screen of think-seed-13). */
      { type: "scene", prompt: "وقتی یک کلید را می‌زنی، درون رایانه چه می‌گذرد؟", bg: "#f4ecdf",
        parts: {
          wires: { art: "tw-wires" }, keys: { art: "tk-keyboard", at: [22, 74], s: 1.1 }, cpu: { art: "tw-cpu", at: [80, 52] },
          ram: { art: "tw-ram", at: [80, 20] }, screen: { art: "tk-monitor", at: [138, 58], s: 0.62 }, letter: { art: "tw-letter", at: [138, 43], o: 0 },
          disk: { art: "tw-disk", at: [136, 78] }, d1: { art: "tk-dot", at: [32, 70], o: 0 }, d2: { art: "tk-dot", at: [80, 40], o: 0 },
          d3: { art: "tk-dot", at: [92, 48], o: 0 }, d4: { art: "tk-dot", at: [92, 57], o: 0 }
        },
        scenes: [
          { caption: "وقتی کلید «ب» را می‌زنی، صفحه‌کلید که «ورودی» است، یک پیام به رایانه می‌فرستد.", key: 1500, do: [
            { id: "keys.k2", to: { y: 0.8 }, dur: 200, yoyo: true, times: 2 },
            { id: "d1", to: { o: 1 }, at: 400, dur: 200 }, { id: "d1", path: "M32 70L68 57", at: 500, dur: 1500 }, { id: "d1", to: { o: 0 }, at: 2000, dur: 300 }
          ] },
          { caption: "«پردازنده» که مغز رایانه است، پیام را می‌گیرد و می‌فهمد کدام حرف است.", key: 1800, do: [
            { id: "cpu.glow", to: { o: 1 }, dur: 400 }, { id: "cpu", to: { s: 1.12 }, at: 400, dur: 400, yoyo: true, times: 4 }
          ] },
          { caption: "حرف در «حافظه» نگه داشته می‌شود تا رایانه با آن کار کند.", key: 2400, do: [
            { id: "d2", to: { o: 1 }, dur: 200 }, { id: "d2", path: "M80 40V26", at: 100, dur: 1100 }, { id: "d2", to: { o: 0 }, at: 1200, dur: 300 },
            { id: "ram.glow", to: { o: 1 }, at: 1200, dur: 400 }, { id: "ram.letter", to: { o: 1 }, at: 1400, dur: 500 }
          ] },
          { caption: "پردازنده به صفحه‌نمایش که «خروجی» است می‌گوید حرف را نشان بدهد.", key: 2600, do: [
            { id: "ram.glow", to: { o: 0 }, dur: 300 },
            { id: "d3", to: { o: 1 }, dur: 200 }, { id: "d3", path: "M92 48L124 45", at: 100, dur: 1300 }, { id: "d3", to: { o: 0 }, at: 1400, dur: 300 },
            { id: "screen.on", to: { o: 1 }, at: 1500, dur: 400 }, { id: "letter", to: { o: 1 }, at: 1700, dur: 500 }
          ] },
          { caption: "وقتی «ذخیره» را می‌زنیم، نوشته در «ذخیره‌سازی» می‌ماند؛ حتی وقتی رایانه خاموش شود.", key: 2400, do: [
            { id: "d4", to: { o: 1 }, dur: 200 }, { id: "d4", path: "M92 57L124 75", at: 100, dur: 1300 }, { id: "d4", to: { o: 0 }, at: 1400, dur: 300 },
            { id: "disk.led", to: { o: 1 }, at: 1500, dur: 200 }, { id: "disk.led", to: { o: 0.2 }, at: 1800, dur: 200, yoyo: true, times: 4 }
          ] }
        ],
        question: "کدام قسمت «مغز» رایانه است و کارها را انجام می‌دهد؟",
        options: [{ label: "پردازنده", value: "cpu" }, { label: "صفحه‌کلید", value: "keys" }, { label: "صفحه‌نمایش", value: "screen" }], answer: "cpu" },
      { type: "order", prompt: "سفر یک حرف را به ترتیب بچین", say: "سفر یک حرف را به ترتیب بچین", numbered: true,
        items: [{ pic: "⌨️", label: "کلید را می‌زنیم", say: "کلید را می‌زنیم" }, { label: "پردازنده می‌فهمد کدام حرف است", say: "پردازنده می‌فهمد کدام حرف است" },
          { label: "حافظه حرف را نگه می‌دارد", say: "حافظه حرف را نگه می‌دارد" }, { pic: "🖥️", label: "صفحه حرف را نشان می‌دهد", say: "صفحه حرف را نشان می‌دهد" }] },
      { type: "sort", prompt: "ورودی (چیزی به رایانه می‌دهد) یا خروجی (چیزی از رایانه به ما می‌دهد)؟",
        baskets: [{ pic: "📥", label: "ورودی", value: "in" }, { pic: "📤", label: "خروجی", value: "out" }],
        items: [{ pic: "⌨️", label: "صفحه‌کلید", basket: "in" }, { pic: "🖱️", label: "موس", basket: "in" }, { pic: "📷", label: "دوربین", basket: "in" },
          { pic: "🖥️", label: "صفحه‌نمایش", basket: "out" }, { pic: "🖨️", label: "چاپگر", basket: "out" }, { pic: "🔈", label: "بلندگو", basket: "out" }] },
      { type: "choose", prompt: "رایانه را خاموش کردی. فردا نوشته‌ات کجا هنوز هست؟", say: "رایانه را خاموش کردی. فردا نوشته‌ات کجا هنوز هست؟",
        options: [{ label: "در ذخیره‌سازی، اگر ذخیره‌اش کرده باشیم", value: "disk" }, { label: "در حافظه؛ حافظه همه چیز را همیشه نگه می‌دارد", value: "ram" }], answer: "disk" },
      { type: "choose", prompt: "سخت‌افزار و نرم‌افزار با هم کار می‌کنند. کدام جمله درست است؟", say: "سخت‌افزار و نرم‌افزار با هم کار می‌کنند. کدام جمله درست است؟",
        options: [{ label: "پردازنده (سخت‌افزار) دستورهای برنامه (نرم‌افزار) را یکی‌یکی اجرا می‌کند", value: "both" }, { label: "برنامه بدون رایانه هم خودش کار می‌کند", value: "alone" }], answer: "both" },
      { type: "unplugged", text: "بازی «رایانه انسانی»: هر کس یک قسمت شود. «صفحه‌کلید» یک حرف را روی کاغذ می‌نویسد و به «پردازنده» می‌دهد؛ پردازنده آن را در «حافظه» (یک جعبه) می‌گذارد و به «صفحه‌نمایش» می‌گوید آن را بزرگ روی تخته بکشد. آخر کار، «ذخیره‌سازی» کاغذ را در یک پوشه می‌گذارد. بعد جاها را عوض کنید. بپرسید: «اگر حافظه را خالی کنیم، کاغذی که در پوشه است هنوز هست؟»" }
    ]
  },
  {
    id: "think-tree-16", subject: "think", level: "tree", emoji: "⌨️", title: "تایپ با ده انگشت",
    steps: [
      { type: "choose", prompt: "انگشت‌ها روی «ردیف خانه» صفحه‌کلید می‌نشینند. روی کلیدهای «ب» و «ت» (در صفحه‌کلید انگلیسی F و J) یک برجستگی کوچک هست. برای چه؟",
        say: "انگشت‌ها روی ردیف خانه صفحه‌کلید می‌نشینند. روی دو کلید یک برجستگی کوچک هست. برای چه؟",
        options: [{ label: "تا انگشت‌های اشاره بدون نگاه کردن جایشان را پیدا کنند", value: "home" }, { label: "برای قشنگی", value: "pretty" }], answer: "home" },
      { type: "type", lang: "fa", prompt: "انگشت‌ها را روی ردیف خانه بگذار و این کلمه‌ها را تایپ کن. کلید روشن را بزن.", say: "انگشت‌ها را روی ردیف خانه بگذار و این کلمه‌ها را تایپ کن.",
        words: ["با", "تاب", "سیب", "بابا", "کتاب", "نان", "ماست"] },
      { type: "type", lang: "en", prompt: "حالا با حرف‌های انگلیسی ردیف خانه تایپ کن.", say: "حالا با حرف‌های انگلیسی ردیف خانه تایپ کن.",
        words: ["dad", "sad", "add", "ask", "all", "salad"] },
      { type: "choose", prompt: "یک نامه برای مادربزرگ تایپ کردی. فردا می‌خواهی باز هم رویش کار کنی. چه کار کنیم؟", say: "یک نامه برای مادربزرگ تایپ کردی. فردا می‌خواهی باز هم رویش کار کنی. چه کار کنیم؟",
        options: [{ label: "با یک اسم روشن مثل «نامه به مادربزرگ» در پوشه‌اش ذخیره می‌کنیم", value: "save" }, { label: "صفحه را می‌بندیم؛ خودش می‌ماند", value: "close" }], answer: "save" },
      { type: "choose", prompt: "کدام اسم برای فایل بهتر است تا بعداً زود پیدایش کنیم؟", say: "کدام اسم برای فایل بهتر است تا بعداً زود پیدایش کنیم؟",
        options: [{ label: "«گزارش گردش مدرسه»", value: "clear" }, { label: "«سند ۱»", value: "vague" }], answer: "clear" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["تایپ با ده انگشت با تمرین کوتاه و هر روزه یاد گرفته می‌شود: روزی پنج تا ده دقیقه، نه یک ساعت در هفته.",
          "کمک کنید کودک به صفحه‌کلید نگاه نکند و به جای سرعت، دقت را تمرین کند؛ سرعت خودش می‌آید.",
          "اگر رایانه دارید، با هم یک نوشته کوتاه تایپ کنید، با اسمی روشن در پوشه‌ای ذخیره کنید و فردا دوباره پیدایش کنید."] }
    ]
  },
  {
    id: "think-tree-8", subject: "think", level: "tree", emoji: "🫖", title: "الگوریتم و روندنما",
    steps: [
      /* Making tea by a flowchart: each box lights up as the kitchen does it; the question «آب جوش آمد؟» says no and
         loops (wait) until the steam rises, then yes. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "یک الگوریتم برای دم کردن چای", bg: "#f6e3c6",
        parts: {
          flow: { art: "tw-flow" }, counter: { art: "tk-table", at: [42, 89], sx: 1.3 },
          tea: { art: "tw-teaset", at: [18, 68] }, stove: { art: "tw-stove", at: [50, 68], s: 0.9 }, kettle: { art: "tw-kettle", at: [72, 68] }
        },
        scenes: [
          { caption: "این یک «روندنما» است: هر کار در یک جعبه و هر سؤال در یک لوزی. از «شروع» تا «پایان» فلش‌ها را دنبال می‌کنیم.", key: 3400, do: [
            { id: "flow.n1", to: { o: 1 }, dur: 300 }, { id: "flow.n1", to: { o: 0 }, at: 700, dur: 300 },
            { id: "flow.n2", to: { o: 1 }, at: 900, dur: 300 }, { id: "flow.n2", to: { o: 0 }, at: 1500, dur: 300 },
            { id: "flow.n3", to: { o: 1 }, at: 1700, dur: 300 }, { id: "flow.n3", to: { o: 0 }, at: 2300, dur: 300 },
            { id: "flow.n4", to: { o: 1 }, at: 2500, dur: 300 }, { id: "flow.n4", to: { o: 0 }, at: 3100, dur: 300 },
            { id: "flow.n5", to: { o: 1 }, at: 3300, dur: 300 }, { id: "flow.n5", to: { o: 0 }, at: 3900, dur: 300 }
          ] },
          { caption: "شروع. کتری را آب می‌کنیم و روی گاز می‌گذاریم.", key: 2600, do: [
            { id: "flow.n1", to: { o: 1 }, dur: 300 }, { id: "flow.n1", to: { o: 0 }, at: 700, dur: 300 }, { id: "flow.n2", to: { o: 1 }, at: 800, dur: 300 },
            { id: "kettle", path: "M72 68Q62 48 50 54", at: 1000, dur: 1300 }, { id: "stove.flame", to: { o: 1 }, at: 2300, dur: 400 }
          ] },
          { caption: "سؤال: «آب جوش آمد؟» نه. پس صبر می‌کنیم و دوباره نگاه می‌کنیم.", key: 2400, do: [
            { id: "flow.n2", to: { o: 0 }, dur: 300 }, { id: "flow.n3", to: { o: 1 }, at: 300, dur: 300 },
            { id: "flow.loop", to: { s: 1.15 }, at: 800, dur: 400, yoyo: true, times: 4 }, { id: "kettle", to: { r: 3 }, at: 900, dur: 300, yoyo: true, times: 4 }
          ] },
          { caption: "حالا بخار بلند می‌شود. «آب جوش آمد؟» بله! چای را دم می‌کنیم.", key: 3600, do: [
            { emit: "bubble", where: [44, 42], spread: [4, 2], n: 14, rise: 16, dur: 3600, life: 1600 },
            { id: "flow.n3", to: { o: 0 }, at: 1500, dur: 300 }, { id: "flow.n4", to: { o: 1 }, at: 1600, dur: 300 },
            { id: "kettle", path: "M50 54Q46 44 42 50", at: 1900, dur: 1100 }, { id: "kettle", to: { r: -35 }, at: 3000, dur: 500 },
            { id: "tea.tea", to: { o: 1 }, at: 3400, dur: 700 }
          ] },
          { caption: "پایان: چای آماده است!", key: 1600, do: [
            { id: "kettle", to: { r: 0 }, dur: 400 }, { id: "flow.n4", to: { o: 0 }, dur: 300 }, { id: "flow.n5", to: { o: 1 }, at: 300, dur: 300 },
            { emit: "spark", where: [28, 54], spread: [8, 5], n: 5, at: 700, dur: 500 }
          ] }
        ],
        question: "در روندنما، سؤال در کدام شکل نوشته می‌شود؟",
        options: [{ label: "◇ لوزی", value: "ask" }, { label: "▭ مستطیل", value: "do" }, { label: "⬭ بیضی", value: "end" }], answer: "ask" },
      { type: "flowchart", prompt: "این روندنما را دنبال کن. هر بار که به سؤال رسیدی، با توجه به چیزی که اتفاق افتاده جواب بده.",
        say: "این روندنما را دنبال کن. هر بار که به سؤال رسیدی، با توجه به چیزی که اتفاق افتاده جواب بده.",
        nodes: [{ id: "s", kind: "start", text: "شروع" }, { id: "a", kind: "do", text: "کتری را آب کن و روی گاز بگذار" },
          { id: "q", kind: "ask", text: "آب جوش آمد؟", no: "q" }, { id: "b", kind: "do", text: "چای را دم کن" }, { id: "e", kind: "end", text: "پایان" }],
        visits: [{ answer: "no", fact: "کتری تازه روی گاز رفته و هنوز صدایی نمی‌دهد." }, { answer: "no", fact: "کمی گرم شده، ولی هنوز بخاری نیست." },
          { answer: "yes", fact: "بخار بلند شده و کتری قل‌قل می‌کند." }] },
      { type: "flowchart", mode: "fill", prompt: "روندنمای شستن دست‌ها دو جای خالی دارد. روی هر جای خالی بزن و کار درستش را انتخاب کن.",
        say: "روندنمای شستن دست‌ها دو جای خالی دارد. روی هر جای خالی بزن و کار درستش را انتخاب کن.",
        nodes: [{ id: "s", kind: "start", text: "شروع" }, { id: "a", kind: "do", text: "دست‌ها را خیس کن و صابون بزن", blank: true },
          { id: "b", kind: "do", text: "بیست ثانیه دست‌ها را به هم بمال" }, { id: "c", kind: "do", text: "آب بکش", blank: true },
          { id: "q", kind: "ask", text: "کف صابون رفت؟", no: "c" }, { id: "d", kind: "do", text: "با حوله خشک کن" }, { id: "e", kind: "end", text: "پایان" }],
        options: ["آب بکش", "دست‌ها را خیس کن و صابون بزن", "کفش‌ها را بپوش"] },
      { type: "order", prompt: "الگوریتم را به شکل فهرست شماره‌دار بنویس: قدم‌ها را به ترتیب بچین", say: "قدم‌های دم کردن چای را به ترتیب بچین", numbered: true,
        items: [{ label: "کتری را آب کن", say: "کتری را آب کن" }, { label: "کتری را روی گاز بگذار", say: "کتری را روی گاز بگذار" },
          { label: "صبر کن تا آب جوش بیاید", say: "صبر کن تا آب جوش بیاید" }, { label: "چای را دم کن", say: "چای را دم کن" }] },
      { type: "unplugged", text: "روی کاغذ با هم روندنمای یک کار روزانه را بکشید، مثلاً «آماده شدن برای خواب» یا «آب دادن به گلدان»: بیضی برای شروع و پایان، مستطیل برای کارها، لوزی برای سؤال‌ها («خاک خشک است؟ بله: آب بده. نه: فردا دوباره نگاه کن»). بعد یک نفر روندنما را دقیقاً دنبال کند. اگر جایی گیر کرد، روندنما را درست کنید." }
    ]
  },
  {
    id: "think-tree-1", subject: "think", level: "tree", emoji: "🧱", title: "اگر دیوار بود",
    steps: [
      { type: "code", blocks: "turn", repeat: true, "if": "wall", nest: true, maxRepeat: 9, goalPic: "⭐",
        prompt: "این برنامه «اگر» دارد: ربات هر بار نگاه می‌کند؛ اگر جلویش بسته بود، می‌چرخد، وگرنه جلو می‌رود. اجرایش کن و ببین.",
        size: [4, 4], start: [0, 3], face: "up", goal: [3, 0], given: [{ repeat: 7, body: [{ "if": "wall", body: ["cw"], "else": ["fwd"] }] }] },
      { type: "code", blocks: "turn", repeat: true, "if": "wall", nest: true, maxRepeat: 9, max: 4, goalPic: "⭐",
        prompt: "یک برنامه برای هر دو زمین بساز: «تکرار» و داخلش «اگر جلو بسته بود». حداکثر چهار قطعه داری.",
        size: [4, 4], boards: [{ start: [0, 3], face: "up", goal: [3, 0] }, { start: [0, 3], face: "up", goal: [3, 2], walls: [[0, 1]] }] },
      { type: "code", blocks: "turn", repeat: true, "if": "wall", nest: true, maxRepeat: 9, max: 4, goalPic: "⭐",
        prompt: "حالا سه زمین! سنگ‌ها جای دیگری‌اند، ولی یک برنامه باید روی هر سه کار کند.",
        size: [4, 4], boards: [{ start: [0, 3], face: "up", goal: [3, 0] }, { start: [0, 3], face: "up", goal: [3, 2], walls: [[0, 1]] },
          { start: [0, 3], face: "up", goal: [3, 1], walls: [[0, 0]] }] },
      { type: "code", blocks: "turn", repeat: true, "if": "open", nest: true, maxRepeat: 9, max: 4, goalPic: "🍎",
        prompt: "این بار ربات باید به چپ بپیچد. «اگر جلو باز بود: جلو، وگرنه: به چپ بچرخ».",
        size: [4, 4], boards: [{ start: [3, 3], face: "up", goal: [0, 0] }, { start: [3, 3], face: "up", goal: [0, 2], walls: [[3, 1]] }] },
      { type: "unplugged", text: "بازی «ربات اگر»: یک نفر ربات شود و فقط این قانون را بداند: «اگر جلویت دیوار یا مبل بود، به راست بچرخ؛ وگرنه یک قدم جلو برو.» کودک، ربات را از جاهای مختلف اتاق راه بیندازد و ببیند به کجا می‌رسد. بپرسید: «همین یک قانون در همه جای اتاق کار می‌کند؟ کجا گیر می‌کند؟»" }
    ]
  },
  {
    id: "think-tree-5", subject: "think", level: "tree", emoji: "🔂", title: "تا وقتی که…",
    steps: [
      { type: "code", blocks: "turn", until: "goal", goalPic: "🚩",
        prompt: "قطعه «تکرار کن تا برسی» لازم نیست بداند چند بار: آن‌قدر تکرار می‌کند تا ربات برسد. «جلو» را داخلش بگذار.",
        size: [6, 1], start: [0, 0], face: "right", goal: [5, 0] },
      { type: "code", blocks: "turn", until: "goal", max: 2, goalPic: "🚩",
        prompt: "دو زمین با دو اندازه، یک برنامه! با «تکرار کن تا برسی»، حداکثر دو قطعه.",
        size: [6, 1], boards: [{ start: [0, 0], face: "right", goal: [5, 0] }, { start: [0, 0], face: "right", goal: [2, 0] }] },
      { type: "code", blocks: "turn", until: "goal", "if": "wall", nest: true, max: 4, goalPic: "⭐",
        prompt: "«تکرار کن تا برسی» و «اگر جلو بسته بود» با هم! یک برنامه برای هر دو زمین.",
        size: [4, 4], boards: [{ start: [0, 3], face: "up", goal: [3, 0] }, { start: [0, 3], face: "up", goal: [3, 2], walls: [[0, 1]] }] },
      { type: "code", blocks: "turn", repeat: true, nest: true, max: 4, goalPic: "⭐", wall: "🌊",
        prompt: "یک «تکرار» داخل یک «تکرار» دیگر: هر ضلع پنج «جلو» است. دور دریاچه برو. حداکثر چهار قطعه.",
        size: [6, 6], start: [0, 5], face: "up", goal: [5, 5],
        walls: [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3], [1, 4], [2, 4], [3, 4], [4, 4], [1, 5], [2, 5], [3, 5], [4, 5]] },
      { type: "code", blocks: "turn", until: "wall", max: 5, goalPic: "🍓",
        prompt: "«تکرار کن تا جلو بسته شود» ربات را تا دیوار می‌برد. با دو تا از این قطعه، و یک چرخش، به توت‌فرنگی برس.",
        size: [5, 4], start: [0, 3], face: "up", goal: [4, 0] },
      { type: "unplugged", text: "«تا وقتی که…» را در خانه پیدا کنید: «تا وقتی لیوان پر نشده، آب بریز»، «تا وقتی به در نرسیده‌ای، قدم بردار». یک بازی: کودک با چشم‌های بسته قدم بردارد «تا وقتی دستش به دیوار بخورد». بپرسید: «اگر شرط هیچ‌وقت درست نشود چه می‌شود؟» (برنامه هیچ‌وقت تمام نمی‌شود!)" }
    ]
  },
  {
    id: "think-tree-9", subject: "think", level: "tree", emoji: "⏯️", title: "قدم به قدم اجرا کن",
    steps: [
      { type: "choose", prompt: "ربات رو به راست است. این برنامه را در ذهنت اجرا کن: «به راست بچرخ، جلو، جلو، به چپ بچرخ». آخرش رو به کجاست؟",
        say: "ربات رو به راست است. این برنامه را در ذهنت اجرا کن: به راست بچرخ، جلو، جلو، به چپ بچرخ. آخرش رو به کجاست؟",
        pic: true, options: ["⬆️", "➡️", "⬇️"], answer: "➡️" },
      { type: "code", blocks: "turn", repeat: true, step: true, max: 5, goalPic: "⭐",
        prompt: "این برنامه اشکال دارد. «قدم بعدی» را بزن تا ربات فقط یک قطعه را اجرا کند. قطعه‌ای را که از آن‌جا اشتباه شد پیدا کن و درستش کن.",
        size: [5, 5], start: [0, 4], face: "up", goal: [4, 0], given: [{ repeat: 4, body: ["fwd", "cw", "fwd", "cw"] }] },
      { type: "code", blocks: "turn", repeat: true, "if": "wall", nest: true, maxRepeat: 12, step: true, goalPic: "⭐",
        prompt: "این برنامه روی زمین ۱ کار می‌کند. روی زمین ۲ هم امتحانش کن: راهش بلندتر است! قدم‌به‌قدم ببین کجا کم می‌آورد و درستش کن.",
        size: [4, 4], boards: [{ start: [0, 3], face: "up", goal: [3, 0] }, { start: [0, 3], face: "up", goal: [3, 3] }],
        given: [{ repeat: 7, body: [{ "if": "wall", body: ["cw"], "else": ["fwd"] }] }] },
      { type: "choose", prompt: "چرا برنامه را روی یک زمین عجیب و نامعمول هم امتحان می‌کنیم؟", say: "چرا برنامه را روی یک زمین عجیب و نامعمول هم امتحان می‌کنیم؟",
        options: [{ label: "تا اشکال‌هایی را پیدا کنیم که روی زمین معمولی دیده نمی‌شوند", value: "edge" }, { label: "چون زمین معمولی خسته‌کننده است", value: "bored" }], answer: "edge" },
      { type: "code", blocks: "turn", until: "goal", step: true, max: 3, goalPic: "🍎",
        prompt: "اول حدس بزن این برنامه چه می‌کند، بعد قدم‌به‌قدم اجرایش کن. چرا هیچ‌وقت نمی‌رسد؟ درستش کن.",
        size: [5, 3], start: [0, 1], face: "right", goal: [4, 1], given: [{ until: "goal", body: ["cw"] }] },
      { type: "unplugged", text: "«قدم‌به‌قدم» یک دستور آشپزی یا یک برنامه روی کاغذ را اجرا کنید: کودک با انگشت روی هر خط بگذارد و فقط همان یک کار را انجام دهد، بعد بگوید «حالا وضع چطور است؟» (کجا ایستاده‌ام؟ رو به کجا؟). پیش از هر قدم بپرسید: «حدس می‌زنی بعدی چه می‌شود؟» این همان کاری است که برنامه‌نویس‌ها برای پیدا کردن اشکال می‌کنند." }
    ]
  },
  {
    id: "think-tree-2", subject: "think", level: "tree", emoji: "⭐", title: "دستور تازه بساز",
    steps: [
      { type: "code", blocks: "turn", fn: true, max: 8, goalPic: "⭐",
        prompt: "«دستور تازه من» (⭐) چهار قطعه دارد: یک پله. حالا در برنامه فقط ⭐ بگذار، هر چند بار که لازم است.",
        size: [5, 5], start: [0, 4], face: "up", goal: [4, 0], fnGiven: ["fwd", "cw", "fwd", "ccw"] },
      { type: "code", blocks: "turn", fn: true, max: 6, goalPic: "⭐", wall: "🌳",
        prompt: "خودت «دستور تازه» را بساز: هر ضلع باغ «جلو، جلو، به راست بچرخ» است. بعد از آن در برنامه استفاده کن. حداکثر شش قطعه.",
        size: [3, 3], start: [0, 2], face: "up", goal: [2, 2], walls: [[1, 1], [1, 2]] },
      { type: "code", blocks: "turn", fn: true, repeat: true, max: 6, goalPic: "⭐",
        prompt: "⭐ را بساز (یک پله) و در «تکرار» بگذار. حداکثر شش قطعه.",
        size: [5, 5], start: [0, 4], face: "up", goal: [4, 0],
        walls: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [0, 2], [1, 4], [2, 4], [3, 4], [4, 4], [2, 3], [3, 3], [4, 3], [3, 2], [4, 2], [4, 1]] },
      { type: "code", blocks: "turn", fn: true, repeat: true, max: 12, goalPic: "🍓",
        prompt: "دو سنگ سر راه است. «دستور تازه» را برای رد شدن از یک سنگ بساز و دو بار به کار ببر. حداکثر دوازده قطعه.",
        size: [7, 3], start: [0, 2], face: "right", goal: [6, 2], walls: [[1, 2], [4, 2]] },
      { type: "unplugged", text: "یک «دستور تازه» برای خانواده بسازید و اسم بگذارید، مثلاً «سلام ربات» یعنی «دست تکان بده، بچرخ، بپر». بعد برنامه‌های بلندتر را با همین اسم بگویید: «دو قدم جلو، سلام ربات، دو قدم جلو، سلام ربات». بپرسید: «اگر بخواهیم سلام ربات را عوض کنیم، کجا را باید درست کنیم؟» (فقط یک جا!)" }
    ]
  },
  {
    id: "think-tree-6", subject: "think", level: "tree", emoji: "🔢", title: "شمارنده",
    steps: [
      /* The robot picks exactly three apples: it sets its counter to 0, adds one for each apple it puts in the basket,
         and checks the counter before each apple. Drawings: js/art/rig.js ("counter") and js/art/rig-think.js. */
      { type: "scene", prompt: "ربات و شمارنده‌اش", bg: "#e4f2e0",
        parts: {
          table: { art: "tk-table", at: [80, 89], sx: 1.95 },
          a1: { art: "🍎", at: [42, 68], s: 0.42 }, a2: { art: "🍎", at: [60, 68], s: 0.42 }, a3: { art: "🍎", at: [78, 68], s: 0.42 },
          a4: { art: "🍎", at: [96, 68], s: 0.42 }, a5: { art: "🍎", at: [114, 68], s: 0.42 },
          basket: { art: "🧺", at: [146, 88], s: 0.7 }, bot: { art: "🤖", at: [24, 68], s: 0.6 },
          cnt: { art: "counter", at: [24, 34], s: 2, o: 0 }, word: { art: "tw-label", look: { w: "counter" }, at: [24, 14], o: 0 },
          ok: { art: "tw-tick", at: [42, 28], o: 0 }
        },
        scenes: [
          { caption: "ربات باید دقیقاً ۳ سیب در سبد بگذارد.", do: [
            { id: "bot", to: { y: "-3" }, at: 300, dur: 500, yoyo: true, times: 2 }, { id: "basket", to: { s: 0.78 }, at: 1200, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "ربات یک «شمارنده» دارد: جعبه‌ای که یک عدد را نگه می‌دارد. اول آن را صفر می‌کند.", key: 2000, do: [
            { id: "cnt", to: { o: 1 }, dur: 500 }, { id: "word", to: { o: 1 }, dur: 500 }, { count: "cnt", from: 0, to: 0, at: 600, dur: 300 },
            { id: "cnt", to: { s: 2.3 }, at: 900, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "هر سیبی که در سبد می‌گذارد، شمارنده را یکی بیشتر می‌کند: ۱، ۲، ۳.", key: 6600, do: [
            { id: "bot", to: { x: 42 }, dur: 700 }, { id: "a1", path: "M42 68Q96 30 146 80", at: 800, dur: 1200 }, { id: "a1", to: { o: 0 }, at: 2000, dur: 200 },
            { count: "cnt", from: 1, to: 1, at: 2100, dur: 200 }, { id: "cnt", to: { s: 2.3 }, at: 2100, dur: 300, yoyo: true, times: 2 },
            { id: "bot", to: { x: 60 }, at: 2500, dur: 600 }, { id: "a2", path: "M60 68Q104 32 146 80", at: 3200, dur: 1100 }, { id: "a2", to: { o: 0 }, at: 4300, dur: 200 },
            { count: "cnt", from: 2, to: 2, at: 4400, dur: 200 }, { id: "cnt", to: { s: 2.3 }, at: 4400, dur: 300, yoyo: true, times: 2 },
            { id: "bot", to: { x: 78 }, at: 4800, dur: 600 }, { id: "a3", path: "M78 68Q112 34 146 80", at: 5500, dur: 1000 }, { id: "a3", to: { o: 0 }, at: 6500, dur: 200 },
            { count: "cnt", from: 3, to: 3, at: 6600, dur: 200 }, { id: "cnt", to: { s: 2.3 }, at: 6600, dur: 300, yoyo: true, times: 2 }
          ] },
          { caption: "پیش از سیب بعدی نگاه می‌کند: شمارنده ۳ شده؟ بله! پس دست نگه می‌دارد. دو سیب روی میز می‌ماند.", key: 2400, do: [
            { id: "bot", to: { x: 96 }, dur: 700 }, { id: "cnt", to: { s: 2.3 }, at: 900, dur: 400, yoyo: true, times: 2 },
            { id: "ok", to: { o: 1 }, at: 1500, dur: 400 }, { id: "bot", to: { y: "-3" }, at: 1800, dur: 400, yoyo: true, times: 2 }
          ] }
        ],
        question: "شمارنده چه کار می‌کند؟",
        options: [{ label: "یک عدد را نگه می‌دارد که ربات می‌تواند عوضش کند", value: "var" }, { label: "سیب‌ها را می‌خورد", value: "eat" }], answer: "var" },
      { type: "code", blocks: "turn", pick: true, counter: true, until: "count", target: 3, goalPic: "⭐",
        prompt: "این برنامه شمارنده را صفر می‌کند و «تکرار می‌کند تا شمارنده ۳ شود». اجرایش کن و شمارنده را نگاه کن.",
        size: [6, 1], boards: [{ start: [0, 0], face: "right", apples: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] }],
        given: ["set", { until: "count", body: ["fwd", "pick", "inc"] }] },
      { type: "code", blocks: "turn", pick: true, counter: true, until: "count", target: 2, max: 5,
        prompt: "حالا تو بساز: ربات باید دقیقاً ۲ سیب بردارد و درست بشمارد. حداکثر پنج قطعه.",
        size: [6, 1], boards: [{ start: [0, 0], face: "right", apples: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] }] },
      { type: "code", blocks: "turn", pick: true, counter: true, repeat: true, target: 3,
        prompt: "این برنامه ۳ سیب برمی‌دارد، ولی شمارنده چیز دیگری می‌گوید! اجرا کن و درستش کن.",
        size: [6, 1], boards: [{ start: [0, 0], face: "right", apples: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] }],
        given: ["set", { repeat: 3, body: ["fwd", "pick"] }] },
      { type: "code", blocks: "turn", pick: true, counter: true, until: "count", "if": "apple", nest: true, target: 3, max: 7,
        prompt: "سیب‌ها پراکنده‌اند! «اگر اینجا سیب بود: بردار و بشمار». ربات باید دقیقاً ۳ سیب بردارد. حداکثر هفت قطعه.",
        size: [8, 1], boards: [{ start: [0, 0], face: "right", apples: [[2, 0], [3, 0], [5, 0], [7, 0]] }] },
      { type: "unplugged", text: "یک «شمارنده» واقعی بسازید: یک کاغذ که رویش یک عدد نوشته می‌شود و پاک می‌شود. کودک ربات شود و فقط سه دستور بداند: «شمارنده را صفر کن»، «یک قاشق در کاسه بگذار و شمارنده را یکی بیشتر کن»، «اگر شمارنده ۵ شد، بایست». ببینید آخرش چند قاشق در کاسه است و شمارنده چه می‌گوید. بعد عمداً یک بار شمردن را جا بیندازید و بپرسید: «حالا شمارنده درست می‌گوید؟»" }
    ]
  },
  {
    id: "think-tree-7", subject: "think", level: "tree", emoji: "🐢", title: "قلم و زاویه",
    steps: [
      { type: "turtle", prompt: "لاک‌پشت قلم دارد و هر جا برود خط می‌کشد. شکل کم‌رنگ را بکش: یک مربع. روی عددها بزن تا عوض شوند.",
        say: "لاک‌پشت قلم دارد و هر جا برود خط می‌کشد. شکل کم‌رنگ را بکش: یک مربع.",
        goal: [{ repeat: 4, body: [["fd", 60], ["rt", 90]] }], start: [70, 150] },
      { type: "turtle", prompt: "حالا یک مثلث با ضلع‌های برابر. در هر گوشه، لاک‌پشت چقدر باید بچرخد؟", say: "حالا یک مثلث با ضلع‌های برابر. در هر گوشه، لاک‌پشت چقدر باید بچرخد؟",
        goal: [{ repeat: 3, body: [["fd", 80], ["rt", 120]] }], start: [60, 150] },
      { type: "turtle", prompt: "یک شش‌ضلعی! شش ضلع و شش چرخش. همه چرخش‌ها با هم یک دور کامل، یعنی ۳۶۰ درجه، می‌شوند.", say: "یک شش‌ضلعی! شش ضلع و شش چرخش. همه چرخش‌ها با هم یک دور کامل می‌شوند.",
        goal: [{ repeat: 6, body: [["fd", 40], ["rt", 60]] }], start: [80, 150] },
      { type: "turtle", prompt: "یک ستاره پنج‌پر: ضلع‌های بلند و چرخش‌های تند. ۱۴۴ درجه را امتحان کن.", say: "یک ستاره پنج‌پر: ضلع‌های بلند و چرخش‌های تند.",
        goal: [{ repeat: 5, body: [["fd", 80], ["rt", 144]] }], start: [70, 140] },
      { type: "turtle", prompt: "یک گل از مربع‌ها: «تکرار» داخل «تکرار». شش بار یک مربع بکش و هر بار ۶۰ درجه بچرخ.", say: "یک گل از مربع‌ها: تکرار داخل تکرار. شش بار یک مربع بکش و هر بار شصت درجه بچرخ.",
        goal: [{ repeat: 6, body: [{ repeat: 4, body: [["fd", 40], ["rt", 90]] }, ["rt", 60]] }], start: [100, 100] },
      { type: "unplugged", text: "روی زمین «لاک‌پشت» شوید: کودک دستور بدهد «۵ قدم جلو، ۹۰ درجه به راست بچرخ» و شما با یک تکه گچ یا با نخ، راه را بکشید. با هم مربع و مثلث بسازید. بپرسید: «برای مثلث در هر گوشه چقدر چرخیدیم؟ همه چرخش‌ها روی هم چقدر شد؟» یک نقاله یا کاغذی که چهار بار تا شده (یک گوشه راست) هم کمک می‌کند." }
    ]
  },
  {
    id: "think-tree-4", subject: "think", level: "tree", emoji: "🚩", title: "وقتی پرچم را زدی",
    steps: [
      { type: "stage", prompt: "یک برنامه برای گربه بساز: «وقتی پرچم را زدی» و بعد «بگو: سلام!». بعد «اجرا» را بزن.", say: "یک برنامه برای گربه بساز: وقتی پرچم را زدی، بگو سلام. بعد اجرا را بزن.",
        sprites: [{ id: "cat", pic: "🐱", name: "گربه", at: [25, 62] }, { id: "dog", pic: "🐶", name: "سگ", at: [70, 62] }],
        blocks: ["say", "move", "jump"], lines: ["سلام!", "بیا بازی کنیم!", "به به!"],
        need: [{ sprite: "cat", event: "flag", op: "say", arg: "سلام!", hint: "گربه هنوز با پرچم «سلام!» نمی‌گوید." }] },
      { type: "stage", prompt: "حالا دو رویداد: وقتی روی گربه زدی، بپرد. وقتی پرچم را زدی، سگ جلو برود. هر دو را امتحان کن.", say: "حالا دو رویداد: وقتی روی گربه زدی، بپرد. وقتی پرچم را زدی، سگ جلو برود.",
        sprites: [{ id: "cat", pic: "🐱", name: "گربه", at: [25, 62] }, { id: "dog", pic: "🐶", name: "سگ", at: [55, 62] }],
        blocks: ["say", "move", "back", "jump"], lines: ["سلام!", "بیا بازی کنیم!"],
        need: [{ sprite: "cat", event: "tap", op: "jump", hint: "وقتی روی گربه می‌زنی، هنوز نمی‌پرد." }, { sprite: "dog", event: "flag", op: "move", hint: "با پرچم، سگ هنوز جلو نمی‌رود." }] },
      { type: "stage", prompt: "یک چراغ راهنمایی بساز: هر بار روی چراغ زدی، رنگ بعدی روشن شود. با پرچم، ماشین جلو برود.", say: "یک چراغ راهنمایی بساز: هر بار روی چراغ زدی، رنگ بعدی روشن شود. با پرچم، ماشین جلو برود.",
        sprites: [{ id: "light", pic: "🚦", name: "چراغ", at: [75, 40], light: true }, { id: "car", pic: "🚗", name: "ماشین", at: [15, 75] }],
        blocks: ["move", "light", "wait"],
        need: [{ sprite: "light", event: "tap", op: "light", hint: "وقتی روی چراغ می‌زنی، رنگش هنوز عوض نمی‌شود." }, { sprite: "car", event: "flag", op: "move", hint: "با پرچم، ماشین هنوز جلو نمی‌رود." }] },
      { type: "stage", prompt: "یک قصه دونفره بساز: با پرچم، گربه بگوید «سلام!» و جلو برود؛ سگ کمی صبر کند و بعد بگوید «بیا بازی کنیم!».",
        say: "یک قصه دونفره بساز: با پرچم، گربه سلام بگوید و جلو برود؛ سگ کمی صبر کند و بعد بگوید بیا بازی کنیم.",
        sprites: [{ id: "cat", pic: "🐱", name: "گربه", at: [20, 62] }, { id: "dog", pic: "🐶", name: "سگ", at: [78, 62] }],
        blocks: ["say", "move", "back", "jump", "wait"], lines: ["سلام!", "بیا بازی کنیم!", "باشه!"],
        need: [{ sprite: "cat", event: "flag", op: "say", arg: "سلام!", hint: "گربه هنوز با پرچم «سلام!» نمی‌گوید." }, { sprite: "cat", event: "flag", op: "move", hint: "گربه هنوز با پرچم جلو نمی‌رود." },
          { sprite: "dog", event: "flag", op: "wait", hint: "سگ اول باید کمی صبر کند." }, { sprite: "dog", event: "flag", op: "say", arg: "بیا بازی کنیم!", hint: "سگ هنوز «بیا بازی کنیم!» نمی‌گوید." }] },
      { type: "unplugged", text: "بازی «رویداد»: با هم قانون بگذارید: «وقتی دست زدم، بپر»، «وقتی اسمت را گفتم، بنشین»، «وقتی چراغ را خاموش کردم، چشم‌هایت را ببند». کودک منتظر رویداد بماند و فقط وقتی آن اتفاق افتاد کارش را بکند. بعد او رویدادها و کارها را تعیین کند. بپرسید: «در یک بازی رایانه‌ای، چه رویدادهایی هست؟» (زدن یک دکمه، رسیدن به یک جا، تمام شدن وقت)" }
    ]
  },
  {
    id: "think-tree-10", subject: "think", level: "tree", emoji: "🔄", title: "برنامه دیگران",
    steps: [
      { type: "stage", prompt: "مینا این برنامه را ساخته است: گربه با پرچم سلام می‌کند و جلو می‌رود. اول اجرایش کن. بعد چیزی به آن اضافه کن: وقتی روی سگ زدی، سگ بگوید «سلام گربه!».",
        say: "مینا این برنامه را ساخته است. اول اجرایش کن. بعد چیزی به آن اضافه کن: وقتی روی سگ زدی، سگ بگوید سلام گربه.",
        sprites: [{ id: "cat", pic: "🐱", name: "گربه", at: [20, 62] }, { id: "dog", pic: "🐶", name: "سگ", at: [75, 62] }],
        blocks: ["say", "move", "back", "jump"], lines: ["سلام!", "سلام گربه!", "بیا بازی کنیم!"],
        given: { cat: [{ event: "flag", body: [["say", "سلام!"], ["move"]] }] },
        need: [{ sprite: "dog", event: "tap", op: "say", arg: "سلام گربه!", hint: "وقتی روی سگ می‌زنی، هنوز «سلام گربه!» نمی‌گوید." }] },
      { type: "stage", prompt: "برنامه رضا: ماشین با پرچم جلو می‌رود. تو یک صحنه تازه اضافه کن: وقتی روی چراغ زدی، رنگش عوض شود.",
        say: "برنامه رضا: ماشین با پرچم جلو می‌رود. تو یک صحنه تازه اضافه کن: وقتی روی چراغ زدی، رنگش عوض شود.",
        sprites: [{ id: "car", pic: "🚗", name: "ماشین", at: [15, 75] }, { id: "light", pic: "🚦", name: "چراغ", at: [75, 40], light: true }],
        blocks: ["move", "light", "wait"], given: { car: [{ event: "flag", body: [["move"], ["move"]] }] },
        need: [{ sprite: "light", event: "tap", op: "light", hint: "وقتی روی چراغ می‌زنی، رنگش هنوز عوض نمی‌شود." }] },
      { type: "choose", prompt: "تو برنامه مینا را تغییر دادی و چیزی به آن اضافه کردی. وقتی آن را به دیگران نشان می‌دهی، چه بنویسیم؟", say: "تو برنامه مینا را تغییر دادی و چیزی به آن اضافه کردی. وقتی آن را به دیگران نشان می‌دهی، چه بنویسیم؟",
        options: [{ label: "«برنامه اول را مینا ساخت؛ من سگ را اضافه کردم.»", value: "credit" }, { label: "«این برنامه را خودم ساختم.»", value: "mine" }], answer: "credit" },
      { type: "choose", prompt: "چرا تغییر دادن برنامه دیگران، به شرط گفتن اسمشان، کار خوبی است؟", say: "چرا تغییر دادن برنامه دیگران، به شرط گفتن اسمشان، کار خوبی است؟",
        options: [{ label: "از کار هم یاد می‌گیریم و چیزهای تازه‌تر می‌سازیم", value: "learn" }, { label: "چون دیگر لازم نیست خودمان فکر کنیم", value: "lazy" }], answer: "learn" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["برنامه‌نویس‌ها خیلی وقت‌ها کار دیگران را تغییر می‌دهند و بهتر می‌کنند؛ این کار خوبی است، به شرط این‌که بگوییم کار اول مال چه کسی بوده.",
          "اگر کودک از یک بازی یا نقاشی یا متن کس دیگری ایده گرفت، کمکش کنید زیرش بنویسد «بر پایه کار …».",
          "از کودک بپرسید چه چیزی به برنامه اضافه کرد و چرا؛ توضیح دادن انتخاب‌ها هم بخشی از برنامه‌نویسی است."] }
    ]
  },
  {
    id: "think-tree-23", subject: "think", level: "tree", emoji: "🎬", title: "پروژه من",
    steps: [
      { type: "paper", text: "نقشه پروژه‌ات را روی کاغذ بکش: یک قصه یا بازی کوچک با دو شخصیت. بنویس: هدف چیست؟ شخصیت‌ها چه کسانی‌اند؟ وقتی پرچم را می‌زنیم چه می‌شود؟ وقتی روی هر شخصیت می‌زنیم چه می‌شود؟",
        lang: "fa", check: ["هدف پروژه را نوشته؟", "دو شخصیت را کشیده یا نام برده؟", "گفته با پرچم چه می‌شود؟", "گفته با زدن روی شخصیت‌ها چه می‌شود؟"] },
      { type: "stage", prompt: "حالا پروژه‌ات را بساز! شخصیت‌ها را برنامه بده، اجرا کن و هر جا لازم بود درستش کن. وقتی کارت تمام شد «تمام شد» را بزن.",
        say: "حالا پروژه‌ات را بساز. شخصیت‌ها را برنامه بده، اجرا کن و هر جا لازم بود درستش کن.",
        sprites: [{ id: "girl", pic: "👧", name: "دختر", at: [20, 62] }, { id: "cat", pic: "🐱", name: "گربه", at: [55, 62] }, { id: "ball", pic: "⚽", name: "توپ", at: [82, 70] }],
        blocks: ["say", "move", "back", "jump", "wait"], lines: ["سلام!", "بیا بازی کنیم!", "توپ کجاست؟", "پیدایش کردم!", "آفرین!"] },
      { type: "paper", text: "پروژه‌ات را به یک نفر از خانواده نشان بده و بگذار امتحانش کند. بنویس او چه گفت و تو چه چیزی را بهتر کردی.",
        lang: "fa", check: ["یک نفر پروژه را امتحان کرده؟", "نظر او را نوشته؟", "یک چیز را بعد از آن بهتر کرده؟"] },
      { type: "choose", prompt: "کسی پروژه‌ات را امتحان کرد و گفت: «وقتی روی گربه زدم، هیچ اتفاقی نیفتاد.» چه کار کنیم؟", say: "کسی پروژه‌ات را امتحان کرد و گفت: وقتی روی گربه زدم، هیچ اتفاقی نیفتاد. چه کار کنیم؟",
        options: [{ label: "تشکر می‌کنیم، برنامه گربه را نگاه می‌کنیم و درستش می‌کنیم", value: "fix" }, { label: "می‌گوییم «تو بد بازی کردی»", value: "blame" }], answer: "fix" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["پروژه چند جلسه طول می‌کشد: نقشه، ساختن، امتحان کردن با یک نفر دیگر، و بهتر کردن. لازم نیست همه در یک روز تمام شود.",
          "وقتی پروژه کودک را امتحان می‌کنید، اول بگویید چه چیزی را دوست داشتید، بعد یک پیشنهاد بدهید.",
          "از کودک بخواهید انتخاب‌هایش را توضیح دهد: «چرا این شخصیت را گذاشتی؟ اگر وقت بیشتری داشتی چه اضافه می‌کردی؟»"] }
    ]
  },
  {
    id: "think-tree-3", subject: "think", level: "tree", emoji: "🎯", title: "جست‌وجو",
    steps: [
      /* Guessing a number from 1 to 16 by halving: each yes-or-no question puts half the numbers aside (they fade);
         the counter counts the questions. The cards run left to right, like a number line. Drawings:
         js/art/rig-think.js and js/art/rig.js ("counter"). */
      { type: "scene", prompt: "با کمترین سؤال پیدایش کن", bg: "#f4ecdf",
        parts: {
          c1: { art: "ts-num", look: { n: 1 }, at: [6.5, 30] }, c2: { art: "ts-num", look: { n: 2 }, at: [16.3, 30] }, c3: { art: "ts-num", look: { n: 3 }, at: [26.1, 30] }, c4: { art: "ts-num", look: { n: 4 }, at: [35.9, 30] }, c5: { art: "ts-num", look: { n: 5 }, at: [45.7, 30] }, c6: { art: "ts-num", look: { n: 6 }, at: [55.5, 30] },
          c7: { art: "ts-num", look: { n: 7 }, at: [65.3, 30] }, c8: { art: "ts-num", look: { n: 8 }, at: [75.1, 30] }, c9: { art: "ts-num", look: { n: 9 }, at: [84.9, 30] }, c10: { art: "ts-num", look: { n: 10 }, at: [94.7, 30] }, c11: { art: "ts-num", look: { n: 11 }, at: [104.5, 30] }, c12: { art: "ts-num", look: { n: 12 }, at: [114.3, 30] },
          c13: { art: "ts-num", look: { n: 13 }, at: [124.1, 30] }, c14: { art: "ts-num", look: { n: 14 }, at: [133.9, 30] }, c15: { art: "ts-num", look: { n: 15 }, at: [143.7, 30] }, c16: { art: "ts-num", look: { n: 16 }, at: [153.5, 30] },
          qs: { art: "counter", at: [80, 66], s: 1.8, o: 0 }, word: { art: "tw-label", look: { w: "questions" }, at: [80, 46], o: 0 }
        },
        scenes: [
          { caption: "عددی از ۱ تا ۱۶ را حدس می‌زنیم. فقط می‌شود پرسید «از … بزرگ‌تر است؟» و جواب «بله» یا «نه» است.", key: 1600, do: [
            { id: "qs", to: { o: 1 }, dur: 400 }, { id: "word", to: { o: 1 }, dur: 400 }, { count: "qs", from: 0, to: 0, at: 400, dur: 200 }
          ] },
          { caption: "سؤال ۱: «از ۸ بزرگ‌تر است؟» «بله.» پس ۱ تا ۸ کنار می‌روند و ۸ عدد می‌ماند.", key: 2600, do: [
            { id: "c8", to: { s: 1.35 }, dur: 400, yoyo: true, times: 2 }, { count: "qs", from: 1, to: 1, at: 300, dur: 200 }, { id: "c1", to: { o: 0.15 }, at: 1200, dur: 400 }, { id: "c2", to: { o: 0.15 }, at: 1250, dur: 400 }, { id: "c3", to: { o: 0.15 }, at: 1300, dur: 400 }, { id: "c4", to: { o: 0.15 }, at: 1350, dur: 400 }, { id: "c5", to: { o: 0.15 }, at: 1400, dur: 400 }, { id: "c6", to: { o: 0.15 }, at: 1450, dur: 400 }, { id: "c7", to: { o: 0.15 }, at: 1500, dur: 400 }, { id: "c8", to: { o: 0.15 }, at: 1550, dur: 400 }
          ] },
          { caption: "سؤال ۲: «از ۱۲ بزرگ‌تر است؟» «بله.» ۴ عدد می‌ماند.", key: 2200, do: [
            { id: "c12", to: { s: 1.35 }, dur: 400, yoyo: true, times: 2 }, { count: "qs", from: 2, to: 2, at: 300, dur: 200 }, { id: "c9", to: { o: 0.15 }, at: 1200, dur: 400 }, { id: "c10", to: { o: 0.15 }, at: 1250, dur: 400 }, { id: "c11", to: { o: 0.15 }, at: 1300, dur: 400 }, { id: "c12", to: { o: 0.15 }, at: 1350, dur: 400 }
          ] },
          { caption: "سؤال ۳: «از ۱۴ بزرگ‌تر است؟» «نه.» سؤال ۴: «از ۱۳ بزرگ‌تر است؟» «نه.» پس عدد ۱۳ است!", key: 4200, do: [
            { id: "c14", to: { s: 1.35 }, dur: 400, yoyo: true, times: 2 }, { count: "qs", from: 3, to: 3, at: 300, dur: 200 }, { id: "c15", to: { o: 0.15 }, at: 1100, dur: 400 }, { id: "c16", to: { o: 0.15 }, at: 1150, dur: 400 },
            { id: "c13", to: { s: 1.35 }, at: 2200, dur: 400, yoyo: true, times: 2 }, { count: "qs", from: 4, to: 4, at: 2500, dur: 200 }, { id: "c14", to: { o: 0.15 }, at: 3200, dur: 400 },
            { id: "c13.ok", to: { o: 1 }, at: 3600, dur: 400 }
          ] },
          { caption: "با ۴ سؤال پیدا شد! اگر یکی‌یکی می‌پرسیدیم «۱ است؟ ۲ است؟…»، شاید ۱۶ سؤال لازم بود.", key: 2000, do: [
            { id: "qs", to: { s: 2.1 }, dur: 400, yoyo: true, times: 2 }, { emit: "spark", where: [124, 30], spread: [8, 6], n: 6, at: 300, dur: 500 }
          ] }
        ],
        question: "هر سؤال خوب چند تا از عددها را کنار می‌گذاشت؟",
        options: [{ label: "نصف آن‌ها", value: "half" }, { label: "فقط یکی", value: "one" }], answer: "half" },
      { type: "choose", prompt: "حالا عدد از ۱ تا ۳۲ است. با همین روش نصف کردن، چند سؤال لازم است؟", say: "حالا عدد از یک تا سی‌ودو است. با همین روش نصف کردن، چند سؤال لازم است؟",
        options: [{ label: "۵", value: 5 }, { label: "۱۶", value: 16 }, { label: "۳۲", value: 32 }], answer: 5 },
      { type: "choose", prompt: "دنبال کلمه «ماه» در فرهنگ لغت می‌گردیم. فرهنگ را از وسط باز کردیم و به «ش» رسیدیم. حالا کدام طرف را نگاه کنیم؟",
        say: "دنبال کلمه ماه در فرهنگ لغت می‌گردیم. فرهنگ را از وسط باز کردیم و به حرف شین رسیدیم. حالا کدام طرف را نگاه کنیم؟",
        options: [{ label: "صفحه‌های بعد، چون «م» بعد از «ش» می‌آید", value: "after" }, { label: "صفحه‌های قبل", value: "before" }], answer: "after" },
      { type: "order", prompt: "این کارت‌ها را از کوچک به بزرگ بچین", ltr: true, items: [2, 4, 5, 7, 9] },
      { type: "choose", prompt: "دو روش برای مرتب کردن ۵ کارت: «هر بار کوچک‌ترین را پیدا کن و جلو بگذار» یا «دوتای کنار هم را مقایسه و جابه‌جا کن». روش اول در هر دور چند کارت را جابه‌جا می‌کند؟",
        say: "دو روش برای مرتب کردن کارت‌ها. در روش اول، هر بار کوچک‌ترین را پیدا می‌کنیم و جلو می‌گذاریم. در هر دور چند کارت جابه‌جا می‌شود؟",
        options: [{ label: "فقط یک کارت (کوچک‌ترین)", value: "one" }, { label: "همه کارت‌ها", value: "all" }], answer: "one" },
      { type: "unplugged", text: "بازی «عددم را با کمترین سؤال پیدا کن»: عددی از ۱ تا ۱۰۰ در ذهن بگیرید. کودک فقط بپرسد «از … بزرگ‌تر است؟». سؤال‌ها را بشمارید. اگر هر بار نصف کند، با ۷ سؤال پیدا می‌شود! بعد با ۸ کارت عدد، دو روش مرتب کردن را امتحان کنید و بشمارید هر کدام چند بار مقایسه یا جابه‌جایی لازم دارد." }
    ]
  },
  {
    id: "think-tree-11", subject: "think", level: "tree", emoji: "💡", title: "عددهای دودویی",
    steps: [
      /* Five dot cards, 16 8 4 2 1 from left to right (binary is written left to right, like other numbers): 11 is
         8 + 2 + 1, the cards face up are 1 and face down 0, so 01011; then a row of lamps on and off the same way.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "عددها با کارت‌های نقطه‌دار", bg: "#efe9f6",
        parts: {
          k16: { art: "tw-bcard", look: { v: 16 }, at: [24, 30], o: 0 }, k8: { art: "tw-bcard", look: { v: 8 }, at: [52, 30], o: 0 },
          k4: { art: "tw-bcard", look: { v: 4 }, at: [80, 30], o: 0 }, k2: { art: "tw-bcard", look: { v: 2 }, at: [108, 30], o: 0 },
          k1: { art: "tw-bcard", look: { v: 1 }, at: [136, 30], o: 0 }, sum: { art: "tw-sum", at: [80, 68], o: 0 },
          l1: { art: "tw-lamp", at: [24, 86], o: 0 }, l2: { art: "tw-lamp", at: [52, 86], o: 0 }, l3: { art: "tw-lamp", at: [80, 86], o: 0 },
          l4: { art: "tw-lamp", at: [108, 86], o: 0 }, l5: { art: "tw-lamp", at: [136, 86], o: 0 }
        },
        scenes: [
          { caption: "این پنج کارت را ببین: ۱، ۲، ۴، ۸ و ۱۶ نقطه. هر کارت دو برابر کارت کناری‌اش نقطه دارد.", key: 2600, do: [
            { id: "k1", to: { o: 1 }, dur: 400 }, { id: "k2", to: { o: 1 }, at: 500, dur: 400 }, { id: "k4", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "k8", to: { o: 1 }, at: 1500, dur: 400 }, { id: "k16", to: { o: 1 }, at: 2000, dur: 400 }
          ] },
          { caption: "هر کارت یا رو است یا پشت. برای ۱۱، کارت‌های ۸ و ۲ و ۱ رو می‌مانند و بقیه پشت می‌شوند.", key: 3000, do: [
            { id: "k16", to: { sx: 0.1 }, at: 300, dur: 300 }, { id: "k16.back", to: { o: 1 }, at: 600, dur: 1 }, { id: "k16", to: { sx: 1 }, at: 600, dur: 300 },
            { id: "k4", to: { sx: 0.1 }, at: 1100, dur: 300 }, { id: "k4.back", to: { o: 1 }, at: 1400, dur: 1 }, { id: "k4", to: { sx: 1 }, at: 1400, dur: 300 },
            { id: "sum", to: { o: 1 }, at: 2100, dur: 500 }
          ] },
          { caption: "کارت رو یعنی ۱ و کارت پشت یعنی ۰. پس ۱۱ را با صفر و یک این‌طور می‌نویسیم: ۰۱۰۱۱.", key: 2600, do: [
            { id: "k16.zero", to: { o: 1 }, dur: 300 }, { id: "k8.one", to: { o: 1 }, at: 400, dur: 300 }, { id: "k4.zero", to: { o: 1 }, at: 800, dur: 300 },
            { id: "k2.one", to: { o: 1 }, at: 1200, dur: 300 }, { id: "k1.one", to: { o: 1 }, at: 1600, dur: 300 }
          ] },
          { caption: "رایانه هم همه چیز را با ۰ و ۱ نگه می‌دارد، مثل لامپ‌هایی که خاموش یا روشن‌اند.", key: 2800, do: [
            { id: "sum", to: { o: 0 }, dur: 300 },
            { id: "l1", to: { o: 1 }, dur: 300 }, { id: "l2", to: { o: 1 }, dur: 300 }, { id: "l3", to: { o: 1 }, dur: 300 }, { id: "l4", to: { o: 1 }, dur: 300 }, { id: "l5", to: { o: 1 }, dur: 300 },
            { id: "l2.on", to: { o: 1 }, at: 900, dur: 300 }, { id: "l4.on", to: { o: 1 }, at: 1300, dur: 300 }, { id: "l5.on", to: { o: 1 }, at: 1700, dur: 300 }
          ] }
        ],
        question: "در عدد دودویی، کارت رو یعنی چه؟", options: [{ label: "۱", value: 1 }, { label: "۰", value: 0 }], answer: 1 },
      { type: "binary", prompt: "کارت‌ها را بزن تا رو یا پشت شوند. ۵ را بساز.", say: "کارت‌ها را بزن تا رو یا پشت شوند. پنج را بساز.", target: 5, bits: true, sum: true },
      { type: "binary", prompt: "حالا ۱۳ را بساز. از بزرگ‌ترین کارت شروع کن.", say: "حالا سیزده را بساز. از بزرگ‌ترین کارت شروع کن.", target: 13, bits: true, sum: true },
      { type: "binary", mode: "read", prompt: "این کارت‌ها چه عددی را نشان می‌دهند؟", say: "این کارت‌ها چه عددی را نشان می‌دهند؟", bits: "10110", options: [22, 13, 26] },
      { type: "binary", prompt: "بزرگ‌ترین عددی که با این پنج کارت می‌شود ساخت چند است؟ آن را بساز.", say: "بزرگ‌ترین عددی که با این پنج کارت می‌شود ساخت چند است؟ آن را بساز.", target: 31, bits: true },
      { type: "choose", prompt: "چرا رایانه‌ها فقط با ۰ و ۱ کار می‌کنند؟", say: "چرا رایانه‌ها فقط با صفر و یک کار می‌کنند؟",
        options: [{ label: "چون درونشان میلیون‌ها کلید کوچک است که فقط روشن یا خاموش‌اند", value: "switch" }, { label: "چون عددهای دیگر را دوست ندارند", value: "like" }], answer: "switch" },
      { type: "unplugged", text: "پنج کارت بسازید: روی یکی ۱ نقطه، بعد ۲، ۴، ۸ و ۱۶ نقطه بکشید و از بزرگ به کوچک کنار هم بچینید. یک عدد بگویید و کودک فقط کارت‌هایی را رو کند که روی هم آن عدد می‌شوند. بعد او کارت‌ها را بچیند و شما عدد را بگویید. با چراغ قوه هم می‌شود پیام فرستاد: روشن یعنی ۱ و خاموش یعنی ۰!" }
    ]
  },
  {
    id: "think-tree-12", subject: "think", level: "tree", emoji: "📝", title: "پرسش‌نامه",
    steps: [
      { type: "chart", bars: true, title: "راه رفتن به مدرسه", prompt: "از ۱۲ بچه پرسیدیم: «چطور به مدرسه می‌روی؟» جواب‌ها را با چوب‌خط شمردیم و نمودار ستونی کشیدیم.",
        say: "از دوازده بچه پرسیدیم: چطور به مدرسه می‌روی؟ جواب‌ها را شمردیم و نمودار ستونی کشیدیم.",
        rows: [{ label: "پیاده", pic: "🚶", n: 5 }, { label: "سرویس", pic: "🚌", n: 4 }, { label: "ماشین", pic: "🚗", n: 2 }, { label: "دوچرخه", pic: "🚲", n: 1 }],
        question: "بیشتر بچه‌ها چطور به مدرسه می‌روند؟", options: [{ label: "پیاده", value: "walk" }, { label: "سرویس", value: "bus" }, { label: "ماشین", value: "car" }], answer: "walk" },
      { type: "chart", bars: true, title: "راه رفتن به مدرسه", prompt: "همان نمودار.",
        rows: [{ label: "پیاده", pic: "🚶", n: 5 }, { label: "سرویس", pic: "🚌", n: 4 }, { label: "ماشین", pic: "🚗", n: 2 }, { label: "دوچرخه", pic: "🚲", n: 1 }],
        question: "چند بچه بیشتر از ماشین، با سرویس می‌روند؟", options: [1, 2, 3], answer: 2 },
      { type: "chart", bars: true, add: true, title: "میوه زنگ تفریح", prompt: "سه بچه دیگر هم جواب دادند: دو نفر «سیب» و یک نفر «پرتقال». با دکمه‌های + و − نمودار را درست کن.",
        say: "سه بچه دیگر هم جواب دادند: دو نفر سیب و یک نفر پرتقال. نمودار را درست کن.",
        rows: [{ label: "سیب", pic: "🍎", n: 6, has: 4 }, { label: "پرتقال", pic: "🍊", n: 3, has: 2 }, { label: "موز", pic: "🍌", n: 2, has: 2 }] },
      { type: "choose", prompt: "از ۱۲ بچه یک کلاس پرسیدیم و بیشترشان پیاده می‌روند. کدام جمله را با اطمینان می‌توانیم بگوییم؟", say: "از دوازده بچه یک کلاس پرسیدیم و بیشترشان پیاده می‌روند. کدام جمله را با اطمینان می‌توانیم بگوییم؟",
        options: [{ label: "«در کلاس ما، بیشتر بچه‌ها پیاده می‌آیند.»", value: "careful" }, { label: "«همه بچه‌های ایران پیاده به مدرسه می‌روند.»", value: "big" }], answer: "careful" },
      { type: "choose", prompt: "می‌خواهیم بدانیم بچه‌ها چه ورزشی دوست دارند. کدام سؤال برای پرسش‌نامه بهتر است؟", say: "می‌خواهیم بدانیم بچه‌ها چه ورزشی دوست دارند. کدام سؤال برای پرسش‌نامه بهتر است؟",
        options: [{ label: "«کدام را بیشتر دوست داری: فوتبال، والیبال، شنا یا دوچرخه؟»", value: "clear" }, { label: "«فوتبال بهترین ورزش است، نه؟»", value: "leading" }], answer: "clear" },
      { type: "unplugged", text: "یک پرسش‌نامه کوچک خانوادگی بسازید: کودک یک سؤال روشن با چند جواب بنویسد (مثلاً «کدام غذا را برای شام جمعه دوست داری؟»)، از همه بپرسد، با چوب‌خط بشمارد و یک نمودار ستونی روی کاغذ بکشد. بعد با هم حرف بزنید: «نمودار چه می‌گوید؟ چه چیزی را نمی‌توانیم از آن بفهمیم؟ اگر از همسایه‌ها هم می‌پرسیدیم، شاید فرق می‌کرد؟»" }
    ]
  },
  {
    id: "think-tree-14", subject: "think", level: "tree", emoji: "🛠️", title: "عیب‌یابی",
    steps: [
      /* No internet: one thing at a time. The laptop says there is no internet; the modem's lights show one red;
         Sara turns the modem off and on and waits; the lights go green and the page comes back. If not, tell a
         grown-up clearly. Drawings: js/art/rig-think.js; Sara and her mother from js/art/rig-english.js. */
      { type: "scene", prompt: "اینترنت وصل نیست! چه کار کنیم؟", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, table: { art: "tk-table", at: [70, 89], sx: 1.1 },
          laptop: { art: "tw-laptop", at: [56, 68] }, router: { art: "tw-router", at: [92, 68] },
          sara: { art: "en-sara", at: [22, 88] }, mom: { art: "en-mother", at: [140, 88], s: 0.95, o: 0 }
        },
        scenes: [
          { caption: "صفحه می‌گوید اینترنت وصل نیست. اول یک چیز را نگاه می‌کنیم: علامت اینترنت روی صفحه خط خورده است.", key: 2400, do: [
            { id: "laptop.nonet", to: { s: 1.2 }, at: 400, dur: 400, yoyo: true, times: 4 }
          ].concat(TK.face("sara", false, 600), TK.pose("sara", "R", "point", 1000, 600)) },
          { caption: "بعد چراغ‌های مودم را نگاه می‌کنیم. یکی قرمز است.", key: 2200, do: TK.pose("sara", "R", "down", 0, 500).concat([
            { id: "router.bad", to: { s: 1.6 }, at: 600, dur: 400, yoyo: true, times: 4 }
          ]) },
          { caption: "مودم را خاموش و روشن می‌کنیم و کمی صبر می‌کنیم.", key: 3400, do: [
            { id: "router.btn", to: { s: 0.7 }, dur: 200, yoyo: true, times: 2 },
            { id: "router.l1", to: { o: 0 }, at: 300, dur: 200 }, { id: "router.l2", to: { o: 0 }, at: 300, dur: 200 }, { id: "router.bad", to: { o: 0 }, at: 300, dur: 200 },
            { id: "router.l1", to: { o: 1 }, at: 1700, dur: 300 }, { id: "router.l2", to: { o: 1 }, at: 2300, dur: 300 }, { id: "router.l3", to: { o: 1 }, at: 2900, dur: 300 }
          ] },
          { caption: "همه چراغ‌ها سبز شد و صفحه دوباره باز شد!", key: 1800, do: [
            { id: "laptop.nonet", to: { o: 0 }, dur: 300 }, { id: "laptop.net", to: { o: 1 }, at: 200, dur: 600 }
          ].concat(TK.face("sara", true, 600)) },
          { caption: "اگر درست نمی‌شد، به یک بزرگ‌تر دقیق می‌گفتیم چه دیدیم و چه کردیم.", key: 2400, do: [
            { id: "mom", to: { o: 1 }, dur: 500 }
          ].concat(TK.talk("sara", 600, 1600), [{ id: "mom.head", to: { y: 1.2 }, at: 2200, dur: 350, yoyo: true, times: 2 }]) }
        ],
        question: "در عیب‌یابی، چند چیز را با هم عوض می‌کنیم؟",
        options: [{ label: "هر بار فقط یک چیز", value: "one" }, { label: "همه چیز را با هم", value: "all" }], answer: "one" },
      { type: "choose", prompt: "یک برنامه روی رایانه «یخ زده» و هیچ دکمه‌ای کار نمی‌کند. اول چه کار کنیم؟", say: "یک برنامه روی رایانه یخ زده و هیچ دکمه‌ای کار نمی‌کند. اول چه کار کنیم؟",
        options: [{ label: "کمی صبر می‌کنیم، بعد برنامه را می‌بندیم و دوباره باز می‌کنیم", value: "restart" }, { label: "پشت سر هم روی همه جا می‌زنیم", value: "bash" }], answer: "restart" },
      { type: "order", prompt: "رایانه صدا ندارد. قدم‌های عیب‌یابی را به ترتیب بچین", say: "رایانه صدا ندارد. قدم‌های عیب‌یابی را به ترتیب بچین", numbered: true,
        items: [{ label: "ببین علامت بی‌صدا روشن است یا نه", say: "ببین علامت بی‌صدا روشن است یا نه" }, { label: "صدا را بلند کن", say: "صدا را بلند کن" },
          { label: "ببین سیم بلندگو یا هدفون وصل است", say: "ببین سیم بلندگو یا هدفون وصل است" }, { label: "اگر نشد، به بزرگ‌تر بگو", say: "اگر نشد، به بزرگ‌تر بگو" }] },
      { type: "choose", prompt: "کدام پیام برای کمک خواستن بهتر است؟", say: "کدام پیام برای کمک خواستن بهتر است؟",
        options: [{ label: "«بعد از روشن کردن تبلت، صفحه سیاه می‌ماند. شارژ کردم و دکمه را ده ثانیه نگه داشتم.»", value: "clear" }, { label: "«خراب شد!»", value: "vague" }], answer: "clear" },
      { type: "choose", prompt: "چرا هر بار فقط یک چیز را عوض می‌کنیم؟", say: "چرا هر بار فقط یک چیز را عوض می‌کنیم؟",
        options: [{ label: "تا بفهمیم کدام کار مشکل را حل کرد", value: "know" }, { label: "چون عوض کردن خسته‌کننده است", value: "tired" }], answer: "know" },
      { type: "unplugged", text: "بازی «عیب‌یاب»: یک چراغ‌قوه را بدون اینکه کودک ببیند خراب کنید (باتری را برعکس بگذارید یا کمی شل کنید). کودک باید با یک قدم در هر بار مشکل را پیدا کند: کلید را امتحان کند، باتری‌ها را نگاه کند، درپوش را سفت کند. بعد بگوید چه کرد و از کجا فهمید. نکته ایمنی: پریز برق، شارژر و سیم‌ها کار بزرگ‌ترهاست." }
    ]
  },
  {
    id: "think-tree-15", subject: "think", level: "tree", emoji: "📦", title: "بسته‌های پیام",
    steps: [
      /* Sara's message is cut into three numbered packets with the address on them; they take different roads through
         the network, arrive mixed up (2, 3, 1), and are put back in order by their numbers above the aunt (right to
         left in Persian: js/en/thinking.js moves them for English). Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "پیام در اینترنت چطور سفر می‌کند؟", bg: "#eaf4fb",
        parts: {
          net: { art: "ts-net" }, cityL: { art: "ts-city", at: [18, 40] }, cityR: { art: "ts-city", at: [142, 40] },
          sara: { art: "en-sara", at: [16, 88], s: 0.85 }, aunt: { art: "en-teacher", at: [146, 88], s: 0.7 },
          msg: { art: "tw-msg", at: [24, 54], o: 0 },
          p1: { art: "tw-pkt", look: { n: 1 }, at: [24, 50], o: 0 }, p2: { art: "tw-pkt", look: { n: 2 }, at: [24, 50], o: 0 }, p3: { art: "tw-pkt", look: { n: 3 }, at: [24, 50], o: 0 }
        },
        scenes: [
          { caption: "سارا برای خاله‌اش یک پیام می‌فرستد: «سلام خاله جان!»", key: 1600, do: [{ id: "msg", to: { o: 1 }, dur: 500 }].concat(TK.talk("sara", 200, 1200)) },
          { caption: "اینترنت پیام را به چند «بسته» کوچک تقسیم می‌کند. روی هر بسته یک شماره و نشانی خانه خاله هست.", key: 2600, do: [
            { id: "msg", to: { o: 0 }, dur: 400 },
            { id: "p1", to: { o: 1 }, at: 400, dur: 300 }, { id: "p1", to: { x: 44, y: 40 }, at: 600, dur: 600 },
            { id: "p2", to: { o: 1 }, at: 900, dur: 300 }, { id: "p2", to: { x: 44, y: 52 }, at: 1100, dur: 600 },
            { id: "p3", to: { o: 1 }, at: 1400, dur: 300 }, { id: "p3", to: { x: 44, y: 64 }, at: 1600, dur: 600 }
          ] },
          { caption: "بسته‌ها از راه‌های مختلف می‌روند و ممکن است به‌هم‌ریخته برسند: اول ۲، بعد ۳، آخر ۱.", key: 5200, do: [
            { id: "p2", path: "M44 52L42 24L64 36L98 40L120 30L118 48", dur: 2400, ease: "linear" },
            { id: "p3", path: "M44 64L42 24L64 36L84 22L98 40L120 30L118 60", dur: 3400, ease: "linear" },
            { id: "p1", path: "M44 40L42 24L60 12L84 22L110 12L120 30L118 72", dur: 4600, ease: "linear" }
          ] },
          { caption: "رایانه خاله بسته‌ها را با شماره‌هایشان مرتب می‌کند و پیام کامل می‌شود.", key: 2600, do: [
            { id: "p1", to: { x: 136, y: 20 }, dur: 900 }, { id: "p2", to: { x: 112, y: 20 }, at: 300, dur: 900 }, { id: "p3", to: { x: 88, y: 20 }, at: 600, dur: 900 }
          ].concat(TK.face("aunt", true, 1600)) }
        ],
        question: "بسته‌ها به‌هم‌ریخته رسیدند. خاله از کجا فهمید ترتیب درست چیست؟",
        options: [{ label: "از شماره روی هر بسته", value: "number" }, { label: "از رنگ بسته‌ها", value: "colour" }], answer: "number" },
      { type: "order", prompt: "این بسته‌ها به‌هم‌ریخته رسیده‌اند. با شماره‌هایشان به ترتیب بچین تا پیام خوانده شود.", say: "این بسته‌ها به‌هم‌ریخته رسیده‌اند. با شماره‌هایشان به ترتیب بچین.", numbered: true,
        items: [{ label: "۱. فردا", say: "یک، فردا" }, { label: "۲. به خانه", say: "دو، به خانه" }, { label: "۳. شما", say: "سه، شما" }, { label: "۴. می‌آییم", say: "چهار، می‌آییم" }] },
      { type: "choose", prompt: "روی هر بسته، «نشانی» چه کاری می‌کند؟", say: "روی هر بسته، نشانی چه کاری می‌کند؟",
        options: [{ label: "می‌گوید بسته باید به کدام رایانه برسد", value: "where" }, { label: "می‌گوید پیام چقدر بلند است", value: "long" }], answer: "where" },
      { type: "choose", prompt: "اگر یکی از راه‌های اینترنت بسته شود، چه می‌شود؟", say: "اگر یکی از راه‌های اینترنت بسته شود، چه می‌شود؟",
        options: [{ label: "بسته‌ها از راه دیگری می‌روند", value: "other" }, { label: "دیگر هیچ پیامی نمی‌رسد", value: "none" }], answer: "other" },
      { type: "unplugged", text: "بازی «بسته‌ها»: یک جمله روی یک نوار کاغذ بنویسید، آن را چند تکه کنید و پشت هر تکه یک شماره و اسم «گیرنده» را بنویسید. تکه‌ها را به چند نفر بدهید تا از راه‌های مختلف خانه (از آشپزخانه، از راهرو…) به گیرنده برسانند. گیرنده باید با شماره‌ها جمله را دوباره بسازد. بپرسید: «اگر یک تکه گم شود، گیرنده از کجا می‌فهمد؟»" }
    ]
  },
  {
    id: "think-tree-17", subject: "think", level: "tree", emoji: "🔎", title: "از کجا بدانم؟",
    steps: [
      /* A search: good words in the box; results in the order the search engine chooses, the first one an ad; a photo
         that someone edited (wings on a cat); three questions to ask before believing. Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "جست‌وجو و درستی", bg: "#eef1f4",
        parts: { page: { art: "tw-search", at: [80, 35] }, photo: { art: "tw-catphoto", at: [80, 40], s: 1.6, o: 0 }, asks: { art: "tw-asks", at: [80, 80], o: 0 } },
        scenes: [
          { caption: "در جعبه جست‌وجو چند کلمه روشن می‌نویسیم: «غذای بچه گربه».", key: 1600, do: [
            { id: "page.results", to: { o: 0 }, dur: 1 }, { id: "page.words", to: { o: 0 }, dur: 1 }, { id: "page.words", to: { o: 1 }, at: 400, dur: 900 }
          ] },
          { caption: "موتور جست‌وجو نتیجه‌ها را به ترتیبی که خودش انتخاب می‌کند نشان می‌دهد. اولی «آگهی» است: کسی پول داده تا بالا بیاید.", key: 2800, do: [
            { id: "page.results", to: { o: 1 }, dur: 600 }, { id: "page.ad", to: { o: 1 }, at: 1400, dur: 300 }, { id: "page.ad", to: { s: 1.2 }, at: 1700, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "این عکس را ببین: گربه بال دارد! عکس‌ها را می‌شود با برنامه دستکاری کرد.", key: 2600, do: [
            { id: "page", to: { o: 0.25 }, dur: 400 }, { id: "photo", to: { o: 1 }, at: 300, dur: 500 }, { id: "photo.wings", to: { o: 1 }, at: 1400, dur: 800 }
          ] },
          { caption: "پیش از باور کردن می‌پرسیم: چه کسی نوشته؟ کی؟ منبع دیگری هم همین را می‌گوید؟", key: 2800, do: [
            { id: "photo", to: { o: 0 }, dur: 400 }, { id: "page", to: { o: 1 }, at: 300, dur: 400 }, { id: "asks", to: { o: 1 }, at: 500, dur: 1 },
            { id: "asks.q1", to: { o: 1 }, at: 700, dur: 400 }, { id: "asks.q2", to: { o: 1 }, at: 1500, dur: 400 }, { id: "asks.q3", to: { o: 1 }, at: 2300, dur: 400 }
          ] }
        ],
        question: "نتیجه اول جست‌وجو همیشه بهترین و درست‌ترین است؟",
        options: [{ label: "نه؛ ترتیب را موتور جست‌وجو انتخاب می‌کند و بعضی آگهی‌اند", value: "no" }, { label: "بله، همیشه", value: "yes" }], answer: "no" },
      { type: "choose", prompt: "می‌خواهی بدانی پلنگ ایرانی کجا زندگی می‌کند. کدام کلمه‌ها برای جست‌وجو بهترند؟", say: "می‌خواهی بدانی پلنگ ایرانی کجا زندگی می‌کند. کدام کلمه‌ها برای جست‌وجو بهترند؟",
        options: [{ label: "«زیستگاه پلنگ ایرانی»", value: "good" }, { label: "«حیوان»", value: "vague" }, { label: "«من یک سؤال دارم»", value: "chat" }], answer: "good" },
      { type: "sort", prompt: "کدام منبع را بیشتر می‌شود باور کرد، و کدام را باید بیشتر بررسی کرد؟",
        baskets: [{ pic: "✅", label: "قابل اعتمادتر", value: "trust" }, { pic: "🔍", label: "باید بررسی کنیم", value: "check" }],
        items: [{ pic: "🏛️", label: "سایت یک موزه درباره دایناسورها", basket: "trust" }, { pic: "📚", label: "کتاب درسی علوم", basket: "trust" },
          { pic: "💬", label: "پیامی بدون اسم نویسنده", basket: "check" }, { pic: "📢", label: "آگهی «این قرص قدت را بلند می‌کند!»", basket: "check" },
          { pic: "🗓️", label: "خبری که تاریخ ندارد", basket: "check" }, { pic: "🌍", label: "سایت سازمان هواشناسی", basket: "trust" }] },
      { type: "choose", prompt: "دوستت عکسی فرستاده: «یک ماهی پرنده بزرگ در دریای خزر!». اول چه کار کنیم؟", say: "دوستت عکسی فرستاده: یک ماهی پرنده بزرگ در دریای خزر! اول چه کار کنیم؟",
        options: [{ label: "می‌گردیم ببینیم منبع دیگری هم این را گفته یا نه", value: "check" }, { label: "زود برای همه می‌فرستیم", value: "share" }], answer: "check" },
      { type: "unplugged", text: "بازی «کارآگاه خبر»: یک خبر یا عکس عجیب از اینترنت (یا از یک مجله) با هم پیدا کنید و سه سؤال را بپرسید: «چه کسی نوشته؟ کی نوشته؟ منبع دیگری هم همین را می‌گوید؟» یک عکس خانوادگی را هم با یک برنامه ساده دستکاری کنید (مثلاً یک کلاه به آن اضافه کنید) تا کودک ببیند عکس‌ها چقدر راحت تغییر می‌کنند." }
    ]
  },
  {
    id: "think-tree-18", subject: "think", level: "tree", emoji: "🔐", title: "حساب امن",
    steps: [
      /* A "you won a prize, type your password" message is a trick: we don't type it, we show a grown-up. Then one
         key for each door: a different password for each account. Drawings: js/art/rig-think.js; Sara and her mother
         from js/art/rig-english.js. */
      { type: "scene", prompt: "یک پیام عجیب", bg: "#f6e3c6",
        parts: {
          room: { art: "tk-bg", look: { place: "room" } }, trick: { art: "tw-trick", at: [80, 36] },
          sara: { art: "en-sara", at: [24, 88] }, mom: { art: "en-mother", at: [138, 88], s: 0.95, o: 0 },
          d1: { art: "tw-door", look: { c: "#f2c14e" }, at: [56, 76], o: 0 }, d2: { art: "tw-door", look: { c: "#5b9bd5" }, at: [80, 76], o: 0 },
          d3: { art: "tw-door", look: { c: "#e46b8a" }, at: [104, 76], o: 0 }
        },
        scenes: [
          { caption: "یک پیام روی تبلت می‌آید: «برنده شدی! برای گرفتن جایزه، رمزت را بنویس.»", key: 2000, do: [
            { id: "trick", to: { s: 1.06 }, at: 300, dur: 400, yoyo: true, times: 4 }
          ].concat(TK.face("sara", false, 1200)) },
          { caption: "این یک فریب است. هیچ جای درستی رمز تو را برای جایزه نمی‌خواهد.", key: 1800, do: [{ id: "trick.no", to: { o: 1 }, dur: 500 }] },
          { caption: "سارا چیزی نمی‌نویسد و پیام را به مامان نشان می‌دهد.", key: 2800, do: [
            { id: "mom", to: { o: 1 }, dur: 500 }
          ].concat(TK.pose("sara", "R", "point", 500, 600), TK.talk("sara", 900, 1200), [{ id: "mom.head", to: { y: 1.2 }, at: 2200, dur: 350, yoyo: true, times: 2 }]) },
          { caption: "برای هر حساب یک رمز جدا داریم، مثل کلیدهای جدا برای درهای جدا. اگر یک کلید گم شود، درهای دیگر باز نمی‌شوند.", key: 3000, do: [
            { id: "trick", to: { o: 0 }, dur: 500 },
            { id: "d1", to: { o: 1 }, at: 500, dur: 400 }, { id: "d2", to: { o: 1 }, at: 1000, dur: 400 }, { id: "d3", to: { o: 1 }, at: 1500, dur: 400 }
          ].concat(TK.pose("sara", "R", "down", 0, 500), TK.face("sara", true, 1800)) }
        ],
        question: "پیام «برنده شدی، رمزت را بنویس» چیست؟",
        options: [{ label: "یک فریب", value: "trick" }, { label: "یک جایزه واقعی", value: "prize" }], answer: "trick" },
      { type: "sort", prompt: "امن است یا فریب؟",
        baskets: [{ pic: "🙂", label: "امن", value: "safe" }, { pic: "⚠️", label: "فریب", value: "trick" }],
        items: [{ pic: "🎁", label: "«گوشی رایگان! فقط رمزت را بفرست»", basket: "trick" }, { pic: "👵", label: "مادربزرگ عکس تولد فرستاده", basket: "safe" },
          { pic: "⚠️", label: "«حسابت بسته می‌شود! زود رمزت را بنویس»", basket: "trick" }, { pic: "🏫", label: "معلم تکلیف فردا را نوشته", basket: "safe" },
          { pic: "🎮", label: "«سکه رایگان بازی! این برنامه را دانلود کن»", basket: "trick" }] },
      { type: "choose", prompt: "یک سایت می‌گوید: «برای دیدن ادامه، این برنامه را دانلود کن.» چه کار کنیم؟", say: "یک سایت می‌گوید: برای دیدن ادامه، این برنامه را دانلود کن. چه کار کنیم؟",
        options: [{ label: "پیش از دانلود از پدر یا مادر می‌پرسیم", value: "ask" }, { label: "زود دانلود می‌کنیم", value: "download" }], answer: "ask" },
      { type: "choose", prompt: "برای بازی، مدرسه و ایمیل یک رمز داری. کدام بهتر است؟", say: "برای بازی، مدرسه و ایمیل یک رمز داری. کدام بهتر است؟",
        options: [{ label: "برای هر کدام یک رمز جدا و قوی", value: "diff" }, { label: "یک رمز برای همه، که یادم بماند", value: "same" }], answer: "diff" },
      { type: "choose", prompt: "فکر می‌کنی کسی رمزت را فهمیده. چه کار کنیم؟", say: "فکر می‌کنی کسی رمزت را فهمیده. چه کار کنیم؟",
        options: [{ label: "با پدر یا مادر زود رمز را عوض می‌کنیم", value: "change" }, { label: "کاری نمی‌کنیم", value: "nothing" }], answer: "change" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["با کودک قرار بگذارید: هیچ پیامی که رمز، کد یا اطلاعات خانه را می‌خواهد جواب داده نمی‌شود؛ اول به شما نشان داده می‌شود.",
          "برای هر حساب کودک یک رمز جدا بسازید و آن‌ها را جایی امن (یک دفترچه در خانه یا یک برنامه نگهداری رمز) نگه دارید.",
          "دانلود و نصب برنامه‌ها را با هم انجام دهید و به کودک نشان دهید چطور برنامه‌های واقعی را از فروشگاه رسمی تشخیص بدهد."] }
    ]
  },
  {
    id: "think-tree-19", subject: "think", level: "tree", emoji: "👣", title: "ردپای دیجیتال",
    steps: [
      /* Footprints in the snow stay behind a walking boy, like what we post; a posted photo is copied to other phones;
         and the three steps for online bullying: keep it, block, tell. Drawings: js/art/rig-think.js (the walking boy
         is a full-body walker from js/scene.js). */
      { type: "scene", prompt: "رد پایی که می‌ماند", bg: "#e8f1f8",
        parts: {
          snow: { art: "tk-bg", look: { place: "snow" } }, f1: { art: "tw-foot", at: [22, 80], o: 0 }, f2: { art: "tw-foot", at: [34, 84], o: 0 }, f3: { art: "tw-foot", at: [46, 80], o: 0 }, f4: { art: "tw-foot", at: [58, 84], o: 0 }, f5: { art: "tw-foot", at: [70, 80], o: 0 }, f6: { art: "tw-foot", at: [82, 84], o: 0 }, f7: { art: "tw-foot", at: [94, 80], o: 0 }, f8: { art: "tw-foot", at: [106, 84], o: 0 },
          boy: { art: "🧒", at: [14, 86], s: 0.9 },
          phone: { art: "tk-phone-s", at: [40, 40], s: 0.8, o: 0 }, ph1: { art: "tk-phone-s", at: [104, 20], s: 0.55, o: 0 }, ph2: { art: "tk-phone-s", at: [128, 40], s: 0.55, o: 0 },
          ph3: { art: "tk-phone-s", at: [104, 60], s: 0.55, o: 0 }, ph4: { art: "tk-phone-s", at: [148, 64], s: 0.55, o: 0 },
          p1: { art: "ts-photo", at: [40, 40], o: 0 }, p2: { art: "ts-photo", at: [40, 40], o: 0 }, p3: { art: "ts-photo", at: [40, 40], o: 0 }, p4: { art: "ts-photo", at: [40, 40], o: 0 },
          three: { art: "tw-three", at: [80, 46], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "هر چیزی که در اینترنت می‌گذاریم، مثل رد پا روی برف پشت سرمان می‌ماند.", key: 4400, do: [
            { id: "boy", walk: [118, 86], dur: 4200 }, { id: "f1", to: { o: 1 }, at: 500, dur: 200 }, { id: "f2", to: { o: 1 }, at: 1000, dur: 200 }, { id: "f3", to: { o: 1 }, at: 1500, dur: 200 }, { id: "f4", to: { o: 1 }, at: 2000, dur: 200 }, { id: "f5", to: { o: 1 }, at: 2500, dur: 200 }, { id: "f6", to: { o: 1 }, at: 3000, dur: 200 }, { id: "f7", to: { o: 1 }, at: 3500, dur: 200 }, { id: "f8", to: { o: 1 }, at: 4000, dur: 200 }
          ] },
          { caption: "عکسی که در اینترنت می‌گذاریم به تلفن‌های دیگر هم می‌رسد. حتی اگر بعداً پاکش کنیم، شاید کسی آن را نگه داشته باشد.", key: 3600, do: [
            { id: "boy", to: { o: 0 }, dur: 400 }, { id: "f1", to: { o: 0 }, dur: 400 }, { id: "f2", to: { o: 0 }, dur: 400 }, { id: "f3", to: { o: 0 }, dur: 400 }, { id: "f4", to: { o: 0 }, dur: 400 }, { id: "f5", to: { o: 0 }, dur: 400 }, { id: "f6", to: { o: 0 }, dur: 400 }, { id: "f7", to: { o: 0 }, dur: 400 }, { id: "f8", to: { o: 0 }, dur: 400 },
            { id: "phone", to: { o: 1 }, at: 400, dur: 400 }, { id: "p1", to: { o: 1 }, at: 800, dur: 200 }, { id: "p2", to: { o: 1 }, at: 800, dur: 200 },
            { id: "p3", to: { o: 1 }, at: 800, dur: 200 }, { id: "p4", to: { o: 1 }, at: 800, dur: 200 },
            { id: "ph1", to: { o: 1 }, at: 900, dur: 300 }, { id: "ph2", to: { o: 1 }, at: 900, dur: 300 }, { id: "ph3", to: { o: 1 }, at: 900, dur: 300 }, { id: "ph4", to: { o: 1 }, at: 900, dur: 300 },
            { id: "p1", to: { x: 104, y: 19 }, at: 1200, dur: 1000 }, { id: "p2", to: { x: 128, y: 39 }, at: 1400, dur: 1000 },
            { id: "p3", to: { x: 104, y: 59 }, at: 1600, dur: 1000 }, { id: "p4", to: { x: 148, y: 63 }, at: 1800, dur: 1000 }
          ] },
          { caption: "اگر کسی در اینترنت اذیتمان کرد: پیام را نگه می‌داریم، او را مسدود می‌کنیم و به یک بزرگ‌تر می‌گوییم.", key: 3400, do: [
            { id: "phone", to: { o: 0 }, dur: 400 }, { id: "ph1", to: { o: 0 }, dur: 400 }, { id: "ph2", to: { o: 0 }, dur: 400 }, { id: "ph3", to: { o: 0 }, dur: 400 }, { id: "ph4", to: { o: 0 }, dur: 400 },
            { id: "p1", to: { o: 0 }, dur: 400 }, { id: "p2", to: { o: 0 }, dur: 400 }, { id: "p3", to: { o: 0 }, dur: 400 }, { id: "p4", to: { o: 0 }, dur: 400 },
            { id: "three", to: { o: 1 }, at: 400, dur: 1 }, { id: "three.c1", to: { o: 1 }, at: 600, dur: 400 }, { id: "three.c2", to: { o: 1 }, at: 1500, dur: 400 }, { id: "three.c3", to: { o: 1 }, at: 2400, dur: 400 }
          ] }
        ],
        question: "چیزی که در اینترنت می‌گذاریم مثل کدام است؟",
        options: [{ label: "👣 رد پا روی برف که می‌ماند", value: "foot" }, { label: "💨 بادی که زود می‌رود", value: "wind" }], answer: "foot" },
      { type: "sort", prompt: "پیش از فرستادن: این را بفرستیم یا نه؟",
        baskets: [{ pic: "👍", label: "می‌شود فرستاد", value: "ok" }, { pic: "✋", label: "نمی‌فرستیم", value: "no" }],
        items: [{ pic: "🎨", label: "نقاشی خودم برای مادربزرگ", basket: "ok" }, { pic: "😠", label: "مسخره کردن یک همکلاسی", basket: "no" },
          { pic: "📷", label: "عکس دوستم، بدون اجازه‌اش", basket: "no" }, { pic: "🎂", label: "تبریک تولد به دخترخاله", basket: "ok" },
          { pic: "🏠", label: "عکس نشانی خانه‌مان", basket: "no" }, { pic: "📚", label: "خلاصه کتابی که خواندم برای کلاس", basket: "ok" }] },
      { type: "choose", prompt: "کسی در بازی آنلاین پشت سر هم پیام‌های بد برایت می‌فرستد. اول چه کار کنیم؟", say: "کسی در بازی آنلاین پشت سر هم پیام‌های بد برایت می‌فرستد. اول چه کار کنیم؟",
        options: [{ label: "جواب نمی‌دهیم، پیام‌ها را نگه می‌داریم و به بزرگ‌تر می‌گوییم", value: "tell" }, { label: "ما هم پیام بد می‌فرستیم", value: "back" }], answer: "tell" },
      { type: "choose", prompt: "دوستت را در یک گروه مسخره می‌کنند. کدام کار مهربان و درست است؟", say: "دوستت را در یک گروه مسخره می‌کنند. کدام کار مهربان و درست است؟",
        options: [{ label: "به او پیام دلگرمی می‌دهم و به یک بزرگ‌تر خبر می‌دهم", value: "help" }, { label: "من هم می‌خندم تا از گروه بیرونم نکنند", value: "join" }], answer: "help" },
      { type: "choose", prompt: "پیش از گذاشتن یک عکس یا پیام، کدام سؤال را از خودمان بپرسیم؟", say: "پیش از گذاشتن یک عکس یا پیام، کدام سؤال را از خودمان بپرسیم؟",
        options: [{ label: "«اگر سال‌ها بعد دوباره ببینمش، خوشحال می‌شوم؟»", value: "later" }, { label: "«چند نفر لایکش می‌کنند؟»", value: "likes" }], answer: "later" },
      { type: "forparents", guide: "thinking", guideLabel: "فکر و برنامه‌نویسی در راهنمای والدین",
        tips: ["با کودک درباره «ردپای دیجیتال» حرف بزنید: چیزی که در اینترنت گذاشته می‌شود، حتی اگر پاک شود، ممکن است جایی مانده باشد.",
          "سه قدم را با هم تمرین کنید: پیام بد را نگه دار (عکس از صفحه)، فرستنده را مسدود کن، به یک بزرگ‌تر بگو. هرگز سرزنش نکنید که چرا گفته است.",
          "برای امنیت با آدم‌های ناشناس در اینترنت، درس‌های «سلامت و ایمنی» را هم ببینید."] }
    ]
  },
  {
    id: "think-tree-20", subject: "think", level: "tree", emoji: "🤖", title: "ماشینی که یاد می‌گیرد",
    steps: [
      /* The robot is shown apples and oranges with their names and keeps them in its memory; a new orange: it guesses
         right. Then one orange is wrongly called an apple (red ring), and the next orange is guessed wrong. Drawings:
         js/art/rig-think.js; the robot from js/art/rig-english.js. */
      { type: "scene", prompt: "ربات چطور یاد می‌گیرد؟", bg: "#efe9f6",
        parts: {
          bot: { art: "en-robot", at: [24, 86], s: 1.2 }, mem: { art: "tw-memory", at: [96, 26] },
          e1: { art: "🍎", at: [58, 70], s: 0.4, o: 0 }, e2: { art: "🍊", at: [58, 70], s: 0.4, o: 0 }, e3: { art: "🍎", at: [58, 70], s: 0.4, o: 0 },
          e4: { art: "🍊", at: [58, 70], s: 0.4, o: 0 }, e5: { art: "🍊", at: [58, 70], s: 0.4, o: 0 }, ring: { art: "tw-wrongring", at: [126, 26], o: 0 },
          t1: { art: "🍊", at: [100, 78], s: 0.6, o: 0 }, g1: { art: "tw-guess", look: { fruit: "🍊" }, at: [36, 46], o: 0 },
          t2: { art: "🍊", at: [100, 78], s: 0.6, o: 0 }, g2: { art: "tw-guess", look: { fruit: "🍎" }, at: [36, 46], o: 0 }
        },
        scenes: [
          { caption: "به ربات تصویرهای زیادی نشان می‌دهیم و می‌گوییم کدام سیب است و کدام پرتقال. ربات همه را در حافظه‌اش نگه می‌دارد.", key: 4600, do: [
            { id: "e1", to: { o: 1 }, dur: 200 }, { id: "e1", path: "M58 70Q60 30 70 30", at: 200, dur: 900 },
            { id: "e2", to: { o: 1 }, at: 1000, dur: 200 }, { id: "e2", path: "M58 70Q100 40 116 30", at: 1200, dur: 900 },
            { id: "e3", to: { o: 1 }, at: 2000, dur: 200 }, { id: "e3", path: "M58 70Q66 34 80 30", at: 2200, dur: 900 },
            { id: "e4", to: { o: 1 }, at: 3000, dur: 200 }, { id: "e4", path: "M58 70Q104 40 126 30", at: 3200, dur: 900 }
          ] },
          { caption: "یک میوه تازه نشانش می‌دهیم. ربات آن را با نمونه‌هایی که یاد گرفته مقایسه می‌کند و حدس می‌زند: «پرتقال!» درست است.", key: 2800, do: [
            { id: "t1", to: { o: 1 }, dur: 400 }, { id: "bot.head", to: { r: 10 }, at: 500, dur: 400, yoyo: true, times: 2 },
            { id: "g1", to: { o: 1 }, at: 1500, dur: 400 }, { id: "g1.yes", to: { o: 1 }, at: 2100, dur: 300 }
          ] },
          { caption: "حالا یک نمونه غلط یاد می‌دهیم: یک پرتقال را «سیب» می‌نامیم.", key: 2200, do: [
            { id: "t1", to: { o: 0 }, dur: 300 }, { id: "g1", to: { o: 0 }, dur: 300 },
            { id: "e5", to: { o: 1 }, at: 300, dur: 200 }, { id: "e5", path: "M58 70Q66 40 88 30", at: 500, dur: 1000 },
            { id: "ring", to: { x: 88, y: 26, o: 1 }, at: 1600, dur: 400 }
          ] },
          { caption: "یک پرتقال تازه شبیه همان نمونه غلط است. ربات حدس می‌زند: «سیب!» اشتباه کرد. ماشین فقط به خوبی نمونه‌هایش یاد می‌گیرد.", key: 2600, do: [
            { id: "t2", to: { o: 1 }, dur: 400 }, { id: "bot.head", to: { r: 10 }, at: 500, dur: 400, yoyo: true, times: 2 },
            { id: "g2", to: { o: 1 }, at: 1500, dur: 400 }, { id: "g2.wrong", to: { o: 1 }, at: 2100, dur: 300 }
          ] }
        ],
        question: "چرا ربات بار دوم اشتباه کرد؟",
        options: [{ label: "چون یک نمونه غلط به او یاد دادیم", value: "bad" }, { label: "چون ربات پرتقال دوست ندارد", value: "like" }], answer: "bad" },
      { type: "train", prompt: "به ربات یاد بده: هر میوه را که نشانت می‌دهد، بگو سیب است یا پرتقال. بعد ببین ربات میوه‌های تازه را چطور حدس می‌زند.",
        say: "به ربات یاد بده: هر میوه سیب است یا پرتقال؟ بعد ببین ربات میوه‌های تازه را چطور حدس می‌زند.",
        labels: [{ value: "apple", label: "سیب", pic: "🍎" }, { value: "orange", label: "پرتقال", pic: "🍊" }],
        examples: [{ pic: "🍎", label: "apple", f: [0, 0] }, { pic: "🍊", label: "orange", f: [2, 3] }, { pic: "🍏", label: "apple", f: [3, 0] }, { pic: "🍊", label: "orange", f: [2, 3] }],
        tests: [{ pic: "🍊", f: [2, 3] }, { pic: "🍏", f: [3, 0] }, { pic: "🍎", f: [0, 0] }],
        question: "ربات چند تا از سه میوه تازه را درست حدس زد؟", options: [{ label: "هر سه", value: 3 }, { label: "یکی", value: 1 }], answer: 3 },
      { type: "train", prompt: "این بار کسی به ربات نمونه‌های اشتباه یاد داده است (با خط قرمز). ببین ربات چه حدس می‌زند.", say: "این بار کسی به ربات نمونه‌های اشتباه یاد داده است. ببین ربات چه حدس می‌زند.",
        labels: [{ value: "apple", label: "سیب", pic: "🍎" }, { value: "orange", label: "پرتقال", pic: "🍊" }],
        trained: [{ pic: "🍎", label: "apple", f: [0, 0] }, { pic: "🍏", label: "apple", f: [3, 0] }, { pic: "🍊", label: "apple", f: [2, 3], wrong: true }],
        tests: [{ pic: "🍊", f: [2, 3] }, { pic: "🍎", f: [0, 0] }],
        question: "ربات پرتقال تازه را چه نامید؟", options: [{ label: "سیب؛ اشتباه کرد", value: "apple" }, { label: "پرتقال", value: "orange" }], answer: "apple" },
      { type: "choose", prompt: "کدام جمله درباره هوش مصنوعی درست است؟", say: "کدام جمله درباره هوش مصنوعی درست است؟",
        options: [{ label: "از نمونه‌های زیادی یاد می‌گیرد و گاهی هم اشتباه می‌کند", value: "learns" }, { label: "همه چیز را می‌داند و هیچ‌وقت اشتباه نمی‌کند", value: "perfect" }], answer: "learns" },
      { type: "unplugged", text: "بازی «ربات یادگیرنده»: شما ربات شوید و فقط از نمونه‌ها یاد بگیرید. کودک چند چیز را به شما نشان دهد و اسم دسته‌اش را بگوید («این میوه است»، «این میوه نیست»). بعد یک چیز تازه نشان دهد و شما فقط با نگاه به نمونه‌ها حدس بزنید. یک بار عمداً یک نمونه را اشتباه یاد بگیرید و ببینید حدس‌هایتان چطور خراب می‌شود. بپرسید: «اگر نمونه‌ها کم یا اشتباه باشند، هوش مصنوعی چه می‌کند؟»" }
    ]
  },
  {
    id: "think-tree-21", subject: "think", level: "tree", emoji: "🕰️", title: "قبل و بعد از رایانه",
    steps: [
      /* A letter by post took days (the van drives slowly, the calendar counts the days); now a message arrives in a
         moment; a grandfather who cannot see hears his phone read the screen aloud; a grandmother who cannot hear reads
         the subtitles. Drawings: js/art/rig-think.js, js/art/rig-english.js. */
      { type: "scene", prompt: "رایانه زندگی را چطور عوض کرد؟", bg: "#f4ecdf",
        parts: {
          van: { art: "tw-van", at: [10, 82] }, letter: { art: "ts-env", at: [-3, -14], s: 1.3, under: "van" }, cal: { art: "tw-cal", at: [80, 24], s: 1.6, o: 0 }, env: { art: "ts-env", at: [16, 60], s: 1.4, o: 0 },
          pa: { art: "tk-phone-s", at: [16, 60], o: 0 }, pb: { art: "tk-phone-s", at: [144, 60], o: 0 },
          gpa: { art: "en-grandpa", at: [40, 88], o: 0 }, rphone: { art: "tw-readphone", at: [56, 60], o: 0 }, waves: { art: "en-sound", at: [64, 50], o: 0 },
          tv: { art: "tw-tv", at: [118, 72], o: 0 }, gma: { art: "en-grandma", at: [150, 88], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "قدیم: نامه را با پست می‌فرستادند و چند روز در راه بود.", key: 4400, do: [
            { id: "cal", to: { o: 1 }, dur: 300 }, { id: "van", to: { x: 150 }, at: 300, dur: 4600, ease: "linear" },
            { count: "cal", from: 1, to: 4, at: 300, dur: 4400 }
          ] },
          { caption: "امروز: پیام با اینترنت در چند ثانیه می‌رسد.", key: 1250, do: [
            { id: "van", to: { o: 0 }, dur: 300 }, { id: "cal", to: { o: 0 }, dur: 300 },
            { id: "pa", to: { o: 1 }, at: 300, dur: 300 }, { id: "pb", to: { o: 1 }, at: 300, dur: 300 },
            { id: "env", to: { o: 1 }, at: 600, dur: 200 }, { id: "env", path: "M16 60Q80 30 144 60", at: 800, dur: 700 }, { id: "pb.lit", to: { o: 1 }, at: 1500, dur: 200 }
          ] },
          { caption: "پدربزرگ نمی‌بیند. برنامه‌ای در تلفنش نوشته‌های صفحه را بلند برایش می‌خواند.", key: 2400, do: [
            { id: "pa", to: { o: 0 }, dur: 300 }, { id: "pb", to: { o: 0 }, dur: 300 }, { id: "env", to: { o: 0 }, dur: 300 },
            { id: "gpa", to: { o: 1 }, at: 300, dur: 500 }, { id: "gpa.shut", to: { o: 1 }, at: 300, dur: 1 }, { id: "gpa.eyes", to: { o: 0 }, at: 300, dur: 1 },
            { id: "rphone", to: { o: 1 }, at: 600, dur: 400 }
          ].concat(TK.pose("gpa", "R", "give", 600, 600), [{ id: "waves", to: { o: 1 }, at: 1400, dur: 300 }, { id: "waves", to: { s: 1.2 }, at: 1700, dur: 400, yoyo: true, times: 4 }]) },
          { caption: "مادربزرگ نمی‌شنود. او زیرنویس فیلم را می‌خواند.", key: 2000, do: [
            { id: "tv", to: { o: 1 }, dur: 500 }, { id: "gma", to: { o: 1 }, dur: 500 }, { id: "tv.sub", to: { o: 1 }, at: 900, dur: 500 }
          ].concat(TK.face("gma", true, 1300)) }
        ],
        question: "زیرنویس فیلم به چه کسی کمک می‌کند؟",
        options: [{ label: "به کسی که نمی‌شنود", value: "deaf" }, { label: "به کسی که گرسنه است", value: "hungry" }], answer: "deaf" },
      { type: "sort", prompt: "قبل از رایانه یا امروز؟",
        baskets: [{ pic: "🕰️", label: "قدیم", value: "then" }, { pic: "📱", label: "امروز", value: "now" }],
        items: [{ pic: "✉️", label: "نامه با پست", basket: "then" }, { pic: "📱", label: "پیام با تلفن", basket: "now" },
          { pic: "🗺️", label: "نقشه کاغذی", basket: "then" }, { pic: "🧭", label: "برنامه مسیریاب", basket: "now" },
          { pic: "📚", label: "دانشنامه کاغذی", basket: "then" }, { pic: "💻", label: "جست‌وجو در اینترنت", basket: "now" }] },
      { type: "choose", prompt: "در نانوایی امروزی، رایانه کوچک فر چه کمکی می‌کند؟", say: "در نانوایی امروزی، رایانه کوچک فر چه کمکی می‌کند؟",
        options: [{ label: "گرمای فر را درست نگه می‌دارد تا نان نسوزد", value: "heat" }, { label: "به جای نانوا خمیر می‌خرد", value: "buy" }], answer: "heat" },
      { type: "choose", prompt: "یک دکمه روی صفحه خیلی کوچک و کم‌رنگ است. برای چه کسی سخت است؟ چه کار کنیم؟", say: "یک دکمه روی صفحه خیلی کوچک و کم‌رنگ است. برای چه کسی سخت است؟ چه کار کنیم؟",
        options: [{ label: "برای کسی که خوب نمی‌بیند؛ دکمه را بزرگ‌تر و پررنگ‌تر کنیم", value: "access" }, { label: "برای هیچ‌کس؛ کوچک قشنگ‌تر است", value: "small" }], answer: "access" },
      { type: "unplugged", text: "با پدربزرگ یا مادربزرگ (یا یک بزرگ‌تر دیگر) گفت‌وگو کنید: «وقتی بچه بودید، چطور نامه می‌فرستادید؟ راه را چطور پیدا می‌کردید؟ چیزی را که نمی‌دانستید از کجا یاد می‌گرفتید؟» کودک جواب‌ها را در دو ستون «قدیم» و «امروز» بنویسد. بعد با هم یک برنامه یا دستگاه را پیدا کنید که به کسی که خوب نمی‌بیند یا نمی‌شنود کمک می‌کند." }
    ]
  },
  {
    id: "think-tree-22", subject: "think", level: "tree", emoji: "🧮", title: "معمای بزرگ",
    steps: [
      { type: "logicgrid", prompt: "چهار بچه، چهار حیوان. با سرنخ‌ها جدول را پر کن: روی خانه بزن تا ✗ (نه) یا ✓ (بله) بگذاری.",
        say: "چهار بچه، چهار حیوان. با سرنخ‌ها جدول را پر کن.",
        rows: [{ pic: "👧", label: "سارا" }, { pic: "👦", label: "رضا" }, { pic: "🧒", label: "مینا" }, { pic: "👦🏽", label: "آرش" }],
        cols: [{ pic: "🐱" }, { pic: "🐶" }, { pic: "🐟" }, { pic: "🐰" }],
        clues: ["سارا ماهی دارد.", "حیوان رضا پارس می‌کند.", "مینا گربه ندارد."],
        answer: [2, 1, 3, 0] },
      { type: "choose", prompt: "در همان معما، کدام سرنخ را اول به کار بردی تا یک خانه را مطمئن ✓ بزنی؟", say: "در همان معما، کدام سرنخ را اول به کار بردی تا یک خانه را مطمئن تیک بزنی؟",
        options: [{ label: "«سارا ماهی دارد.» چون مستقیم جواب را می‌گوید", value: "direct" }, { label: "«مینا گربه ندارد.» چون فقط یک ✗ می‌دهد", value: "neg" }], answer: "direct" },
      { type: "logicgrid", prompt: "سودوکو ۴ در ۴: در هر ردیف، هر ستون و هر قسمت ۲ در ۲، عددهای ۱ تا ۴ هر کدام یک بار می‌آیند. روی خانه خالی بزن تا عددش عوض شود.",
        say: "سودوکو چهار در چهار. در هر ردیف، هر ستون و هر قسمت، عددهای یک تا چهار هر کدام یک بار می‌آیند.",
        sudoku: ["1 . . 4", ". 4 1 .", "4 . . 2", ". 2 4 ."], solution: ["1 3 2 4", "2 4 1 3", "4 1 3 2", "3 2 4 1"] },
      { type: "logicgrid", prompt: "سودوکو ۶ در ۶: هر ردیف، هر ستون و هر قسمت ۲ در ۳، عددهای ۱ تا ۶ را یک بار دارد. اول خانه‌هایی را پیدا کن که فقط یک عدد در آن‌ها جا می‌شود.",
        say: "سودوکو شش در شش. اول خانه‌هایی را پیدا کن که فقط یک عدد در آن‌ها جا می‌شود.",
        sudoku: ["1 2 . 4 5 6", "4 . 6 1 . 3", ". 3 1 . 6 4", "5 6 . 2 3 .", "3 . 5 6 1 2", "6 1 2 . 4 5"],
        solution: ["1 2 3 4 5 6", "4 5 6 1 2 3", "2 3 1 5 6 4", "5 6 4 2 3 1", "3 4 5 6 1 2", "6 1 2 3 4 5"] },
      { type: "choose", prompt: "یک معمای بزرگ و سخت داری. کدام راه بهتر است؟", say: "یک معمای بزرگ و سخت داری. کدام راه بهتر است؟",
        options: [{ label: "آن را تکه‌تکه می‌کنم و اول تکه‌ای را حل می‌کنم که مطمئنم", value: "parts" }, { label: "همه را یک‌جا حدس می‌زنم", value: "guess" }], answer: "parts" },
      { type: "unplugged", text: "با هم یک سودوکوی ۴ در ۴ روی کاغذ بسازید: اول جدول کامل را خودتان پر کنید، بعد چند عدد را پاک کنید و به کودک بدهید. بعد جایتان را عوض کنید. یک «معمای جدول» هم بسازید: سه نفر از خانواده، سه غذای محبوب، و دو یا سه سرنخ. بپرسید: «از کدام خانه مطمئن بودی؟ چطور فهمیدی؟»" }
    ]
  }
);
