/* باغچه — ریاضی (math) lessons.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

(function () {
  /* Moves the math scenes share (step type `scene`, js/scene.js; drawings in js/art/rig.js and js/art/rig-math.js).
     Things to count really arrive, leave, join and get shared out; numbers and signs come after the things. */
  // Jump from a to b in one arc, h above the higher end.
  function hop(id, a, b, at, dur, h) {
    var top = Math.min(a[1], b[1]) - (h == null ? 10 : h);
    return { id: id, path: "M" + a.join(" ") + "Q" + (a[0] + b[0]) / 2 + " " + top + " " + b.join(" "), at: at || 0, dur: dur || 700 };
  }
  // Little hops along the ground from a to b (a chick, a shoe).
  function hops(id, a, b, n, at, dur, h) {
    var d = "M" + a.join(" "), dx = (b[0] - a[0]) / n, dy = (b[1] - a[1]) / n;
    for (var i = 0; i < n; i++) {
      var x = a[0] + dx * i, y = a[1] + dy * i;
      d += "Q" + (x + dx / 2) + " " + (y + dy / 2 - (h || 3)) + " " + (x + dx) + " " + (y + dy);
    }
    return { id: id, path: d, at: at || 0, dur: dur || 2000, ease: "linear" };
  }
  // Fly from a to b, flapping (a drawing with a "wing" piece, like the sparrow).
  function fly(id, a, b, at, dur, h) {
    return [hop(id, a, b, at, dur, h), { id: id + ".wing", to: { r: -70 }, at: at || 0, dur: dur, yoyo: true, times: 2 * Math.max(1, Math.round(dur / 260)) }];
  }
  // Show something with a little bounce (grow: how much bigger it gets for a moment).
  function pop(id, at, grow) {
    return [{ id: id, to: { o: 1 }, at: at || 0, dur: 250 }, { id: id, to: { s: "+" + (grow || 0.25) }, at: at || 0, dur: 500, yoyo: true, times: 2 }];
  }
  // A little jump on the spot, for something standing still.
  function jump(id, at, h) { return { id: id, to: { y: "-" + (h || 3) }, at: at || 0, dur: 500, yoyo: true, times: 2 }; }
  // A counter shows n from that moment: one more each time a thing arrives (a running total).
  function tally(id, n, at) { return { count: id, from: n, to: n, at: at, dur: 1 }; }
  // All the tracks given, as one list (lists inside are flattened; used on every beat at the end of this file).
  function all() {
    var out = [];
    (function add(x) { if (Array.isArray(x)) x.forEach(add); else if (x) out.push(x); })([].slice.call(arguments));
    return out;
  }

  /* Picture maps for the map step (js/steps/world.js; viewBox 400 × 300). A room seen from the front, for position
     words (math-seed-21, math-seed-49), and a park seen from above, for following a way (math-seed-22, math-seed-49). */
  var ROOM_FRONT = {
    bg: "block",
    shapes: [
      { rect: [0, 230, 400, 70], kind: "floor" },
      { rect: [30, 30, 110, 80], r: 4, kind: "water" },
      { rect: [230, 62, 150, 10], kind: "wood" },
      { rect: [244, 24, 70, 38], r: 3, kind: "sand" },
      { rect: [210, 150, 150, 14], r: 3, kind: "wood" },
      { rect: [222, 164, 10, 66], kind: "wood" },
      { rect: [338, 164, 10, 66], kind: "wood" }
    ],
    deco: [{ pic: "🪑", at: [40, 206], size: 1.5 }, { pic: "🪑", at: [134, 206], size: 1.5 }],
    places: [
      { id: "cat", name: "گربه، روی میز", en: "the cat, on the table", pic: "🐈", at: [285, 126] },
      { id: "ball", name: "توپ، زیر میز", en: "the ball, under the table", pic: "⚽", at: [285, 208], size: 0.9 },
      { id: "teddy", name: "عروسک خرسی، بین دو صندلی", en: "the teddy bear, between the two chairs", pic: "🧸", at: [87, 206] },
      { id: "car", name: "ماشین، داخل جعبه", en: "the car, in the box", pic: "🚗", at: [279, 46], size: 0.8 },
      { id: "apple", name: "سیب، بیرون جعبه", en: "the apple, outside the box", pic: "🍎", at: [350, 44], size: 0.8 }
    ]
  };
  var PARK = {
    bg: "grass",
    shapes: [
      { rect: [0, 134, 400, 32], kind: "road" },
      { rect: [184, 0, 32, 300], kind: "road" },
      { rect: [16, 16, 150, 100], r: 10, kind: "park" },
      { circle: [318, 64, 42], kind: "water" },
      { rect: [236, 196, 150, 92], r: 10, kind: "sand" }
    ],
    deco: [{ pic: "🌷", at: [60, 50], size: 0.7 }, { pic: "🌼", at: [120, 84], size: 0.7 }, { pic: "🌲", at: [30, 260], size: 0.9 }, { pic: "🌲", at: [140, 230], size: 0.9 }],
    places: [
      { id: "gate", name: "در پارک", en: "the park gate", pic: "🚪", at: [26, 150], size: 0.9 },
      { id: "pool", name: "حوض", en: "the fountain", pic: "⛲", at: [200, 150] },
      { id: "tree", name: "درخت بزرگ", en: "the big tree", pic: "🌳", at: [200, 42], size: 1.2 },
      { id: "bench", name: "نیمکت", en: "the bench", pic: "🪑", at: [374, 150], size: 0.9 },
      { id: "slide", name: "سرسره", en: "the slide", pic: "🛝", at: [310, 242] },
      { id: "ducks", name: "اردک‌ها در آب", en: "the ducks in the pond", pic: "🦆", at: [318, 64], size: 0.9 },
      { id: "flowers", name: "باغچه گل", en: "the flower bed", pic: "🌷", at: [90, 66], size: 0.9 }
    ]
  };

B.LESSONS.push(
  // ---------------- Math: Seed (counting real things) ----------------
  {
    id: "math-seed-1", subject: "math", level: "seed", emoji: "🍎", title: "شمردن تا پنج",
    steps: [
      { type: "count", thing: "🍎", n: 2, options: [1, 2, 3] },
      { type: "count", thing: "🐟", n: 3, options: [2, 3, 4] },
      { type: "count", thing: "⭐", n: 4, options: [3, 4, 5] },
      { type: "count", thing: "🎈", n: 5, options: [5, 4, 6] }
    ]
  },
  {
    id: "math-seed-11", subject: "math", level: "seed", emoji: "👀", title: "یک نگاه، چندتا؟",
    steps: [
      /* Subitising: each picture shows for a moment and is covered, so the child says how many without counting.
         First 2 and 3, then 4 and 5; dots, a die, fingers and things. The answers show their dots too (numerals
         come later, in math-seed-9). */
      { type: "count", flash: true, show: "dots", n: 2, options: [1, 2, 3], optDots: true },
      { type: "count", flash: true, show: "dots", n: 3, options: [2, 3, 4], optDots: true },
      { type: "choose", prompt: "زود نگاه کن! کدام دسته سه تا دارد؟", say: "زود نگاه کن! کدام دسته سه تا دارد؟", pic: true,
        options: [{ label: "🐞🐞", value: 2 }, { label: "🐞🐞🐞🐞", value: 4 }, { label: "🐞🐞🐞", value: 3 }], answer: 3 },
      { type: "count", flash: true, show: "dice", n: 4, options: [3, 4, 5], optDots: true,
        prompt: "این یک تاس است. خوب نگاه کن! فقط یک لحظه پیدا می‌شود." },
      { type: "count", flash: true, show: "fingers", n: 2, options: [1, 2, 3], optDots: true,
        prompt: "این دست چند انگشتش را بالا برده؟ خوب نگاه کن!", ask: "چند انگشت دیدی؟" },
      { type: "count", flash: true, show: "dots", n: 5, options: [3, 4, 5], optDots: true },
      { type: "pairs", prompt: "هر دسته نقطه را با دستی جفت کن که همان‌قدر انگشت دارد",
        say: "هر دسته نقطه را با دستی جفت کن که همان‌قدر انگشت دارد.",
        pairs: [[{ dots: 1 }, { fingers: 1 }], [{ dots: 3 }, { fingers: 3 }], [{ dots: 2 }, { fingers: 2 }], [{ dots: 4 }, { fingers: 4 }]] },
      { type: "count", flash: true, show: "🐥", n: 4, options: [3, 4, 5], optDots: true,
        prompt: "جوجه‌ها فقط یک لحظه پیدا می‌شوند. نشمار، فقط نگاه کن!", ask: "چند جوجه دیدی؟" }
    ]
  },
  {
    id: "math-seed-12", subject: "math", level: "seed", emoji: "🍎", title: "آخرین عدد می‌گوید چندتا",
    steps: [
      /* Cardinality: five apples on a sofreh are counted (a ring goes round each one as its number is said), then
         set out in a circle and counted again, then scattered and counted again: still five. */
      (function () {
        var LINE = [[40, 74], [60, 74], [80, 74], [100, 74], [120, 74]];
        var ROUND = [0, 1, 2, 3, 4].map(function (k) {
          var a = (-90 + 72 * k) * Math.PI / 180;
          return [80 + 34 * Math.cos(a), 75 + 9 * Math.sin(a)];
        });
        var SCATTER = [[34, 70], [66, 79], [92, 68], [126, 77], [112, 66]];
        var parts = { bg: { art: "day-room" }, sofreh: { art: "sofreh", at: [80, 74], s: 2 } };
        LINE.forEach(function (p, k) { parts["a" + k] = { art: "🍎", at: p, s: 0.85 }; });
        parts.ring = { art: "ring", at: [40, 66], s: 0.9, o: 0 };
        // The ring goes to each apple in turn, and the apple jumps as its number is said.
        function countAt(places, at0) {
          var out = [{ id: "ring", to: { x: places[0][0], y: places[0][1] - 8 }, at: at0, dur: 1 }, { id: "ring", to: { o: 1 }, at: at0, dur: 200 }];
          places.forEach(function (p, k) {
            var at = at0 + 300 + k * 950;
            if (k) out.push({ id: "ring", to: { x: p[0], y: p[1] - 8 }, at: at - 400, dur: 400 });
            out.push(jump("a" + k, at, 4));
          });
          out.push({ id: "ring", to: { o: 0 }, at: at0 + 300 + places.length * 950, dur: 300 });
          return out;
        }
        // hop() needs the start: each apple starts where the last beat left it.
        function moveFrom(from, to) { return to.map(function (p, k) { return hop("a" + k, from[k], p, k * 350, 900, 8); }); }
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "سیب‌ها را بشماریم: یک، دو، سه، چهار، پنج.", key: 2800, do: countAt(LINE, 600) },
            { caption: "آخرین عدد پنج بود. پس پنج سیب داریم.", do: [0, 1, 2, 3, 4].map(function (k) { return jump("a" + k, 300, 3); }) },
            { caption: "حالا سیب‌ها را دور هم چیدیم.", do: moveFrom(LINE, ROUND) },
            { caption: "دوباره بشماریم: یک، دو، سه، چهار، پنج. باز هم پنج تا!", key: 2500, do: countAt(ROUND, 300) },
            { caption: "این بار سیب‌ها را این‌طرف و آن‌طرف گذاشتیم.", do: moveFrom(ROUND, SCATTER) },
            { caption: "بشماریم: یک، دو، سه، چهار، پنج. جایشان عوض شد، ولی باز هم پنج سیب است.", key: 2500, do: countAt(SCATTER, 300) }
          ],
          question: "چند سیب روی سفره است؟", options: [4, 5, 6], answer: 5 };
      })(),
      { type: "count", layout: "line", thing: "🍊", n: 4, options: [3, 4, 5], ask: "پس چند پرتقال هست؟" },
      { type: "count", layout: "circle", thing: "🌸", n: 5, options: [4, 5, 6], prompt: "گل‌ها دور هم هستند. روی هر کدام بزن و بشمار.", ask: "پس چند گل هست؟" },
      { type: "choose", prompt: "مینا گل‌ها را شمرد: یک، دو، سه، چهار، پنج، شش. چند گل دارد؟",
        say: "مینا گل‌ها را شمرد: یک، دو، سه، چهار، پنج، شش. چند گل دارد؟", options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "count", layout: "scatter", thing: "🐞", n: 6, options: [5, 6, 7], prompt: "کفشدوزک‌ها پراکنده‌اند. روی هر کدام بزن و بشمار.", ask: "پس چند کفشدوزک هست؟" },
      { type: "choose", show: "⭐⭐⭐⭐⭐", prompt: "این ستاره‌ها را شمردیم: پنج تا بود. اگر دوباره بشماریم، چندتا می‌شود؟",
        say: "این ستاره‌ها را شمردیم: پنج تا بود. اگر دوباره بشماریم، چندتا می‌شود؟", options: ["۴", "۵", "۶"], answer: "۵" },
      { type: "count", layout: "scatter", thing: "🐟", n: 7, options: [6, 7, 8], prompt: "ماهی‌ها را بشمار.", ask: "پس چند ماهی هست؟" }
    ]
  },
  {
    id: "math-seed-13", subject: "math", level: "seed", emoji: "✋", title: "انگشت‌های من",
    steps: [
      /* Fingers as a quick picture of a number: 1–5 on one hand, then a full hand and some more (6–10). Fingers go
         up in the order index, middle, ring, little, thumb. */
      { type: "count", flash: true, show: "fingers", n: 3, options: [2, 3, 4], optDots: true,
        prompt: "این دست چند انگشتش را بالا برده؟ زود نگاه کن!", ask: "چند انگشت دیدی؟" },
      { type: "count", flash: true, show: "fingers", n: 5, options: [4, 5, 6], optDots: true,
        prompt: "حالا این دست را ببین!", ask: "چند انگشت دیدی؟" },
      { type: "choose", show: "✋", prompt: "یک دست چند انگشت دارد؟", say: "انگشت‌هایت را بشمار. یک دست چند انگشت دارد؟",
        options: ["۴", "۵", "۶"], answer: "۵" },
      { type: "choose", prompt: "یک دست پنج انگشت دارد. اگر سه انگشت بالا باشد، چند انگشت پایین است؟",
        say: "یک دست پنج انگشت دارد. اگر سه انگشت بالا باشد، چند انگشت پایین است؟ با دست خودت امتحان کن.",
        options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "count", flash: true, show: "fingers", n: 6, options: [5, 6, 7], optDots: true,
        prompt: "یک دست کامل و چند انگشت دیگر. خوب نگاه کن!", ask: "روی هم چند انگشت؟" },
      { type: "count", flash: true, show: "fingers", n: 7, options: [6, 7, 8], optDots: true,
        prompt: "یک دست کامل و چند انگشت دیگر. خوب نگاه کن!", ask: "روی هم چند انگشت؟" },
      { type: "count", flash: true, show: "fingers", n: 10, options: [8, 9, 10], optDots: true,
        prompt: "این بار دو دست را ببین!", ask: "روی هم چند انگشت؟" },
      { type: "doit", pic: "✋🤚", text: "با انگشت‌هایت عددها را نشان بده:",
        list: ["سه انگشت بالا ببر.", "یک دست کامل نشان بده: پنج.", "یک دست کامل و دو انگشت دیگر: هفت.",
          "از پدر یا مادرت بخواه عددی بگوید و تو با انگشت‌هایت نشانش بده."] }
    ]
  },
  {
    id: "math-seed-2", subject: "math", level: "seed", emoji: "🐞", title: "شمردن تا ده",
    steps: [
      { type: "count", thing: "🍓", n: 6, options: [5, 6, 7] },
      { type: "count", thing: "🐞", n: 7, options: [8, 6, 7] },
      { type: "count", thing: "🌸", n: 8, options: [7, 8, 9] },
      { type: "count", thing: "🐥", n: 10, options: [9, 10, 8] }
    ]
  },

  {
    id: "math-seed-3", subject: "math", level: "seed", emoji: "🐰", title: "بازی غذا دادن",
    steps: [
      /* The hen pecks the grain; three chicks hop in one at a time, then the child counts them by tapping each one
         (one tap, one chick). No numbers on the stage: numerals come in math-seed-9. */
      { type: "scene", prompt: "به قصه نگاه کن و بشمار",
        parts: {
          bg: { art: "bg-garden" }, seeds: { art: "seeds", at: [84, 86], s: 1.8 }, hen: { art: "🐔", at: [110, 86], s: 2.3 },
          c1: { art: "🐥", at: [-12, 87], s: 1.05, flip: true }, c2: { art: "🐥", at: [-12, 87], s: 1.05, flip: true },
          c3: { art: "🐥", at: [-12, 87], s: 1.05, flip: true }
        },
        scenes: [
          { caption: "مرغ در حیاط دانه می‌خورد.", key: 700, do: [
            { id: "hen", to: { r: -26 }, at: 300, dur: 2800, yoyo: true, times: 8 },
            { id: "seeds.s5", to: { o: 0 }, at: 650, dur: 150 }, { id: "seeds.s4", to: { o: 0 }, at: 1350, dur: 150 },
            { id: "seeds.s6", to: { o: 0 }, at: 2050, dur: 150 }, { id: "seeds.s3", to: { o: 0 }, at: 2750, dur: 150 }
          ] },
          { caption: "یک جوجه آمد.", do: [hops("c1", [-12, 87], [68, 87], 8, 0, 2400)] },
          { caption: "باز هم یک جوجه آمد.", do: [hops("c2", [-12, 87], [48, 87], 7, 0, 2100)] },
          { caption: "باز هم یک جوجه آمد.", do: [hops("c3", [-12, 87], [28, 87], 6, 0, 1800),
            { id: "hen", to: { r: 10 }, at: 2000, dur: 800, yoyo: true, times: 2 }],
            wait: { tap: ["c3", "c2", "c1"], hint: "حالا تو جوجه‌ها را بشمار: روی هر جوجه بزن.", each: [jump("$", 0, 5)] } }
        ],
        question: "چند جوجه پیش مرغ آمد؟", pic: true,
        options: [{ label: "🐥🐥", value: 2 }, { label: "🐥🐥🐥", value: 3 }, { label: "🐥🐥🐥🐥", value: 4 }], answer: 3 },
      { type: "feed", animal: "🐰", food: "🥕", n: 3, prompt: "خرگوش گرسنه است. سه تا هویج به او بده." },
      { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
        pairs: [[{ dots: 2 }, "🍎🍎"], [{ dots: 4 }, "🐟🐟🐟🐟"], [{ dots: 1 }, "⭐"], [{ dots: 3 }, "🎈🎈🎈"]] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 5, prompt: "سنجاب گرسنه است. پنج تا به او بده." },
      { type: "pattern", prompt: "بعدی کدام است؟", seq: ["🍎", "🍌", "🍎", "🍌", "🍎", "🍌"], blanks: [5], options: ["🍌", "🍎", "🍇"] },
      { type: "order", prompt: "از کم به زیاد بچین", ltr: true, items: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }] }
    ]
  },
  {
    id: "math-seed-14", subject: "math", level: "seed", emoji: "🥁", title: "چیزهای پراکنده را بشمار",
    steps: [
      /* Keeping track: scattered things move aside as they are counted, so none is counted twice; then counting
         what is heard (drum beats) and seen moving (jumps); then counting out from a bigger pile. */
      { type: "count", layout: "scatter", move: true, thing: "🌰", n: 6, options: [5, 6, 7],
        prompt: "فندق‌ها پراکنده‌اند. روی هر کدام بزن تا کنار برود. این‌طوری هیچ‌کدام را دو بار نمی‌شماری.",
        ask: "چند فندق بود؟" },
      { type: "count", layout: "scatter", move: true, thing: "🐞", n: 8, options: [7, 8, 9],
        prompt: "کفشدوزک‌ها را بشمار. هر کدام را که شمردی، کنار بگذار.", ask: "چند کفشدوزک بود؟" },
      { type: "count", beats: true, thing: "🥁", n: 4, options: [3, 4, 5],
        prompt: "طبل چند بار می‌زند؟ گوش کن و بشمار.", ask: "طبل چند بار زد؟" },
      { type: "count", beats: true, thing: "🐸", n: 5, options: [4, 5, 6],
        prompt: "قورباغه چند بار می‌پرد؟ ببین و بشمار.", ask: "قورباغه چند بار پرید؟" },
      { type: "feed", animal: "🐑", food: "🌿", n: 6, max: 10, prompt: "گوسفند شش تا علف می‌خواهد. شش تا به او بده." },
      { type: "count", layout: "scatter", move: true, thing: "⭐", n: 9, options: [8, 9, 10],
        prompt: "ستاره‌ها را بشمار. هر کدام را که شمردی، کنار بگذار.", ask: "چند ستاره بود؟" },
      { type: "feed", animal: "🐔", food: "🌽", n: 8, max: 10, prompt: "مرغ هشت تا ذرت می‌خواهد. هشت تا به او بده." },
      { type: "doit", pic: "👏🦘", text: "با هم بشمارید:",
        list: ["چند بار دست بزن. مامان یا بابا بشمارند. بعد جایتان را عوض کنید.", "پنج بار بپر و بلند بشمار.",
          "از یک کاسه نخود، هفت تا بردار. هر کدام را که برمی‌داری، بشمار."] }
    ]
  },
  {
    id: "math-seed-15", subject: "math", level: "seed", emoji: "🍵", title: "بیشتر، کمتر، به اندازه",
    steps: [
      /* One to one: a saucer goes under each glass of tea until the saucers run out; the glass left over shows
         there are more glasses. Then the child matches (children and chairs, plates and spoons, big watermelons
         and small cherries: big is not more). */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 88], s: 1.9 },
          s1: { art: "saucer", at: [134, 54], s: 1.8 }, s2: { art: "saucer", at: [134, 52.4], s: 1.8 }, s3: { art: "saucer", at: [134, 50.8], s: 1.8 },
          g1: { art: "estekan", at: [28, 54], s: 1.6 }, g2: { art: "estekan", at: [52, 54], s: 1.6 },
          g3: { art: "estekan", at: [76, 54], s: 1.6 }, g4: { art: "estekan", at: [100, 54], s: 1.6 },
          ring: { art: "ring", at: [100, 45], s: 1.1, o: 0 }
        },
        scenes: [
          { caption: "روی میز چهار استکان چای هست، و سه نعلبکی.", do: [
            jump("g1", 300, 3), jump("g2", 800, 3), jump("g3", 1300, 3), jump("g4", 1800, 3),
            jump("s3", 2800, 2), jump("s2", 3300, 2), jump("s1", 3800, 2)
          ] },
          { caption: "زیر هر استکان یک نعلبکی می‌گذاریم.", do: [
            hop("s3", [134, 50.8], [28, 54], 300, 1300, 12), { id: "g1", to: { y: 51.8 }, at: 1500, dur: 300 },
            hop("s2", [134, 52.4], [52, 54], 2100, 1200, 12), { id: "g2", to: { y: 51.8 }, at: 3200, dur: 300 },
            hop("s1", [134, 54], [76, 54], 3800, 1000, 12), { id: "g3", to: { y: 51.8 }, at: 4700, dur: 300 }
          ] },
          { caption: "این استکان نعلبکی ندارد!", do: [
            { id: "ring", to: { o: 1 }, at: 300, dur: 150 }, { id: "ring", draw: true, at: 300, dur: 900 }, jump("g4", 1400, 3)
          ] },
          { caption: "پس استکان‌ها بیشترند. نعلبکی‌ها کمترند.", do: [
            { id: "ring", to: { o: 0 }, dur: 300 },
            jump("g1", 400, 2), jump("g2", 400, 2), jump("g3", 400, 2), jump("g4", 400, 2)
          ] }
        ],
        question: "کدام بیشتر است؟",
        options: [{ label: "استکان‌ها", value: "استکان" }, { label: "نعلبکی‌ها", value: "نعلبکی" }], answer: "استکان" },
      { type: "compare", match: true, a: 4, thing: "🧒", b: 3, thing2: "🪑", ask: "more", names: ["بچه‌ها", "صندلی‌ها"],
        prompt: "برای هر بچه یک صندلی بگذار: روی صندلی‌ها بزن.", say: "برای هر بچه یک صندلی بگذار. روی صندلی‌ها بزن." },
      { type: "compare", match: true, a: 5, thing: "🍽️", b: 5, thing2: "🥄", ask: "more", spread: "wide", names: ["بشقاب‌ها", "قاشق‌ها"],
        prompt: "کنار هر بشقاب یک قاشق بگذار: روی قاشق‌ها بزن.", say: "کنار هر بشقاب یک قاشق بگذار. روی قاشق‌ها بزن." },
      { type: "compare", match: true, a: 3, thing: "🍉", big: "a", b: 5, thing2: "🍒", spread: "tight", ask: "more", names: ["هندوانه‌ها", "گیلاس‌ها"],
        prompt: "زیر هر هندوانه یک گیلاس بگذار: روی گیلاس‌ها بزن.", say: "زیر هر هندوانه یک گیلاس بگذار. روی گیلاس‌ها بزن." },
      { type: "choose", prompt: "فیل‌ها بزرگ‌اند و موش‌ها کوچک. ولی تعداد کدام بیشتر است؟",
        say: "فیل‌ها بزرگ‌اند و موش‌ها کوچک. ولی تعداد کدام بیشتر است؟", pic: true,
        options: [{ label: "🐘🐘", value: "فیل" }, { label: "🐭🐭🐭🐭", value: "موش" }], answer: "موش" },
      { type: "compare", match: true, a: 4, thing: "🐰", b: 6, thing2: "🥕", spread: "wide", ask: "less", names: ["خرگوش‌ها", "هویج‌ها"],
        prompt: "به هر خرگوش یک هویج بده: روی هویج‌ها بزن.", say: "به هر خرگوش یک هویج بده. روی هویج‌ها بزن." },
      { type: "choose", prompt: "چهار بچه و چهار بادکنک. به هر بچه یک بادکنک رسید و هیچ بادکنکی نماند. کدام بیشتر است؟",
        say: "چهار بچه و چهار بادکنک. به هر بچه یک بادکنک رسید و هیچ بادکنکی نماند. کدام بیشتر است؟",
        options: [{ label: "بچه‌ها", value: "بچه" }, { label: "بادکنک‌ها", value: "بادکنک" }, { label: "به یک اندازه", value: "یک اندازه" }], answer: "یک اندازه" }
    ]
  },
  {
    id: "math-seed-4", subject: "math", level: "seed", emoji: "🐘", title: "بزرگ و کوچک",
    steps: [
      /* At a fruit stall: Maryam points at the big watermelon, then the small apple, and the apple is set next to
         the watermelon to compare them. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          bg: { art: "bg-street" }, table: { art: "counter-table", at: [52, 86] }, awning: { art: "awning", at: [52, 34] },
          melon: { art: "🍉", at: [34, 68], s: 1.8 }, apple: { art: "🍎", at: [72, 68], s: 0.55 },
          ring: { art: "ring", at: [34, 57], s: 1.6, o: 0 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [176, 88], flip: true },
          mom: { art: "walker", look: { hair: "auto", kind: "woman", scarf: "#3f6f8f", top: "#7b5ea7", bottom: "dress" }, at: [194, 88], s: 1.3, flip: true }
        },
        scenes: [
          { caption: "مریم با مادرش به بازار رفته است.", do: [
            { id: "girl", walk: [108, 88], dur: 2600 }, { id: "mom", walk: [126, 88], dur: 2600 }
          ] },
          { caption: "این هندوانه بزرگ است.", do: [
            { id: "girl.armF", to: { r: -100 }, dur: 500 },
            { id: "ring", to: { o: 1 }, at: 500, dur: 150 }, { id: "ring", draw: true, at: 500, dur: 900 }
          ] },
          { caption: "این سیب کوچک است.", do: [
            { id: "ring", to: { x: 72, y: 63, s: 0.7 }, dur: 900 }, { id: "girl.armF", to: { r: -80 }, dur: 900 }
          ] },
          { caption: "هندوانه از سیب بزرگ‌تر است. سیب از هندوانه کوچک‌تر است.", do: [
            { id: "ring", to: { o: 0 }, dur: 300 }, { id: "girl.armF", to: { r: 0 }, dur: 500 },
            hop("apple", [72, 68], [53, 68], 300, 800, 8),
            jump("melon", 1600, 2), jump("apple", 2600, 3)
          ] }
        ],
        question: "کدام کوچک‌تر است؟", pic: true,
        options: [{ label: "🍉", value: "هندوانه" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "کدام بزرگ‌تر است؟", say: "کدام بزرگ‌تر است؟ فیل یا موش؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🐘", value: "فیل" }], answer: "فیل" },
      { type: "choose", prompt: "کدام از همه کوچک‌تر است؟", say: "کدام از همه کوچک‌تر است؟ گاو، مورچه یا اسب؟", pic: true,
        options: [{ label: "🐄", value: "گاو" }, { label: "🐜", value: "مورچه" }, { label: "🐎", value: "اسب" }], answer: "مورچه" },
      { type: "measure", ask: "longer", bars: [{ thing: "🖍️", len: 3 }, { thing: "✏️", len: 7 }] },
      { type: "measure", ask: "shorter", bars: [{ thing: "🐍", len: 8 }, { thing: "🐛", len: 2 }, { thing: "🦎", len: 5 }] },
      { type: "measure", ask: "longer", bars: [{ thing: "🥄", len: 3 }, { thing: "🧣", len: 8 }, { thing: "🔑", len: 2 }] },
      /* Narges and Arash stand in the yard; a dashed line from the top of each head shows who is taller, and a
         third from the top of the tree shows it is taller than both. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [126, 86] },
          girl: { art: "walker", look: { hair: "long", top: "#f6b73c", bottom: "dress" }, at: [-12, 87], s: 1.25 },
          boy: { art: "walker", look: { top: "#5a9a45" }, at: [-30, 87], s: 0.95 },
          lineG: { art: "level", at: [30, 56.8], sx: 0.62, o: 0 }, lineB: { art: "level", at: [30, 64], sx: 0.62, o: 0 },
          lineT: { art: "level", at: [30, 9.5], sx: 1, o: 0 }
        },
        scenes: [
          { caption: "نرگس و برادرش آرش در حیاط هستند.", do: [
            { id: "girl", walk: [44, 87], dur: 2400 }, { id: "boy", walk: [70, 87], dur: 3000 }
          ] },
          { caption: "قد نرگس بلندتر است.", do: [
            { id: "lineG", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineG", draw: true, at: 300, dur: 1200 }
          ] },
          { caption: "قد آرش کوتاه‌تر است.", do: [
            { id: "lineB", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineB", draw: true, at: 300, dur: 1200 }
          ] },
          { caption: "درخت حیاط از هر دو بلندتر است!", do: [
            { id: "lineT", to: { o: 1 }, at: 300, dur: 100 }, { id: "lineT", draw: true, at: 300, dur: 1600 },
            { id: "tree", to: { r: 2 }, at: 2000, dur: 1600, yoyo: true, times: 4 }
          ] }
        ],
        question: "کدام از همه بلندتر است؟", pic: true,
        options: [{ label: "🧍‍♀️", value: "نرگس" }, { label: "🧍‍♂️", value: "آرش" }, { label: "🌳", value: "درخت" }], answer: "درخت" }
    ]
  },
  {
    id: "math-seed-16", subject: "math", level: "seed", emoji: "✏️", title: "دراز و کوتاه",
    steps: [
      /* Comparing lengths fairly: two pencils, one further along, look the wrong way round until their ends are put
         against the same line. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#f3e3c3",
        parts: {
          line: { art: "start-line", at: [30, 16], s: 1.3, o: 0 },
          blue: { art: "pencil-h", look: { len: 46, color: "#5b9bd5" }, at: [-80, 32], s: 1.6 },
          yellow: { art: "pencil-h", look: { len: 34, color: "#fcd34d" }, at: [-80, 58], s: 1.6 }
        },
        scenes: [
          { caption: "دو مداد روی میز است.", do: [
            { id: "blue", to: { x: 14 }, dur: 1600, ease: "out" }, { id: "yellow", to: { x: 92 }, at: 600, dur: 1800, ease: "out" }
          ] },
          { caption: "مداد زرد درازتر به نظر می‌رسد. ولی ته مدادها کنار هم نیست.", do: [jump("yellow", 300, 3), jump("blue", 1300, 3)] },
          { caption: "ته هر دو مداد را کنار این خط می‌گذاریم.", do: [
            { id: "line", to: { o: 1 }, dur: 200 }, { id: "line", draw: true, dur: 900 },
            { id: "blue", to: { x: 30 }, at: 1200, dur: 900 }, { id: "yellow", to: { x: 30 }, at: 2200, dur: 1600 }
          ] },
          { caption: "حالا معلوم است: مداد آبی درازتر است. مداد زرد کوتاه‌تر است.", do: [jump("blue", 300, 3), jump("yellow", 1300, 2)] }
        ] },
      /* A rope lying in waves looks short; pulled straight, it is longer than the stick. */
      { type: "scene", prompt: "ببین و جواب بده", bg: "#d8ecc4",
        parts: {
          stick: { art: "stick", look: { len: 40 }, at: [26, 64], s: 1.6 },
          bent: { art: "rope-bent", at: [26, 32], s: 1.6 },
          straight: { art: "rope-straight", at: [26, 32], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "این یک طناب است، و این یک چوب.", do: [jump("bent", 300, 2), jump("stick", 1300, 2)] },
          { caption: "طناب پیچ و تاب خورده است. کوتاه‌تر از چوب به نظر می‌رسد.", do: [{ id: "bent", to: { sy: 1.3 }, at: 300, dur: 700, yoyo: true, times: 2 }] },
          { caption: "طناب را صاف می‌کنیم.", do: [
            { id: "bent", to: { sy: 0.1, sx: 1.87 }, at: 300, dur: 1500 }, { id: "bent", to: { o: 0 }, at: 1300, dur: 500 },
            { id: "straight", to: { o: 1 }, at: 1300, dur: 500 }
          ] },
          { caption: "طناب صاف از چوب درازتر است!", do: [jump("straight", 300, 2)] }
        ],
        question: "کدام درازتر است؟", pic: true,
        options: [{ label: "🪢", value: "طناب" }, { label: "🪵", value: "چوب" }], answer: "طناب" },
      { type: "measure", ask: "longer", bars: [{ thing: "🖍️", len: 4 }, { thing: "✏️", len: 6 }] },
      { type: "measure", ask: "shorter", bars: [{ thing: "🥕", len: 5 }, { thing: "🌽", len: 7 }, { thing: "🫛", len: 3 }] },
      { type: "choose", prompt: "کدام درازتر است؟", say: "کدام درازتر است؟ قطار یا دوچرخه؟", pic: true,
        options: [{ label: "🚲", value: "دوچرخه" }, { label: "🚆", value: "قطار" }], answer: "قطار" },
      { type: "measure", ask: "longer", bars: [{ thing: "🐛", len: 2 }, { thing: "🐍", len: 9 }, { thing: "🦎", len: 5 }] },
      { type: "choose", prompt: "کدام کوتاه‌تر است؟", say: "کدام کوتاه‌تر است؟ مداد یا خط‌کش؟", pic: true,
        options: [{ label: "📏", value: "خط‌کش" }, { label: "✏️", value: "مداد" }], answer: "مداد" }
    ]
  },
  {
    id: "math-seed-17", subject: "math", level: "seed", emoji: "🪨", title: "سنگین و سبک",
    steps: [
      { type: "choose", prompt: "اگر این دو را در دست‌هایت بگیری، کدام سنگین‌تر است؟",
        say: "اگر یک هندوانه و یک توت‌فرنگی را در دست‌هایت بگیری، کدام سنگین‌تر است؟", pic: true,
        options: [{ label: "🍓", value: "توت‌فرنگی" }, { label: "🍉", value: "هندوانه" }], answer: "هندوانه" },
      { type: "choose", prompt: "کدام سبک‌تر است؟", say: "یک پر و یک کتاب. کدام سبک‌تر است؟", pic: true,
        options: [{ label: "📕", value: "کتاب" }, { label: "🪶", value: "پر" }], answer: "پر" },
      { type: "balance", left: [{ pic: "🍉", mass: 5, say: "هندوانه" }], right: [{ pic: "🍒", mass: 1, say: "گیلاس" }],
        prompt: "این ترازو است. چیز سنگین‌تر پایین می‌رود. کدام طرف سنگین‌تر است؟ روی آن کفه بزن." },
      { type: "choose", prompt: "در ترازو، کفه‌ای که پایین رفته سنگین‌تر است یا سبک‌تر؟",
        say: "در ترازو، کفه‌ای که پایین رفته سنگین‌تر است یا سبک‌تر؟", pic: true,
        options: [{ label: "⬇️", value: "سنگین‌تر" }, { label: "⬆️", value: "سبک‌تر" }], answer: "سنگین‌تر" },
      { type: "balance", left: [{ pic: "🎈", mass: 1, say: "بادکنک بزرگ" }], right: [{ pic: "🪨", mass: 3, say: "سنگ کوچک" }],
        prompt: "بادکنک بزرگ است و سنگ کوچک. ولی کدام سنگین‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "lighter", left: [{ pic: "🍎", mass: 2, say: "سیب" }], right: [{ pic: "🪶", mass: 1, say: "پر" }],
        prompt: "کدام طرف سبک‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "explore", tray: [{ pic: "🍉", mass: 5, say: "هندوانه" }, { pic: "🎈", mass: 1, say: "بادکنک" }, { pic: "🪨", mass: 3, say: "سنگ" },
        { pic: "🪶", mass: 1, say: "پر" }, { pic: "🍎", mass: 2, say: "سیب" }],
        prompt: "چیزها را روی ترازو بگذار و ببین کدام طرف پایین می‌رود." },
      { type: "doit", pic: "🤲", text: "در خانه دو چیز بردار، یکی در هر دست:",
        list: ["یک بالش و یک لیوان آب. کدام سنگین‌تر است؟", "یک کتاب و یک قاشق. کدام سبک‌تر است؟", "یک چیز بزرگ پیدا کن که سبک باشد."] }
    ]
  },
  {
    id: "math-seed-18", subject: "math", level: "seed", emoji: "🥛", title: "پر و خالی",
    steps: [
      /* Full, empty and half full: the jug really pours into two of the glasses. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9",
        parts: {
          table: { art: "counter-table", at: [80, 92], s: 2 },
          g1: { art: "glass", look: { level: 0 }, at: [40, 56], s: 1.6 }, g2: { art: "glass", look: { level: 0 }, at: [80, 56], s: 1.6 },
          g3: { art: "glass", look: { level: 0 }, at: [120, 56], s: 1.6 },
          jug: { art: "jug", at: [178, 50], s: 1.4 }
        },
        scenes: [
          { caption: "سه لیوان روی میز است. هر سه خالی‌اند.", do: [jump("g1", 300, 2), jump("g2", 900, 2), jump("g3", 1500, 2)] },
          { caption: "در لیوان اول آب ریختیم، تا بالا. لیوان پر است.", key: 3300, do: [
            { id: "g1.water", to: { sy: 0 }, dur: 1 },
            { id: "jug", to: { x: 28, y: 36 }, at: 200, dur: 1400 }, { id: "jug", to: { r: 70 }, at: 1600, dur: 600 },
            { emit: "drop", where: [40, 34], n: 14, spread: [2, 2], rise: -8, at: 2000, dur: 1800 },
            { id: "g1.water", to: { sy: 1 }, at: 2100, dur: 1800 }, { id: "jug", to: { r: 0 }, at: 4000, dur: 500 }
          ] },
          { caption: "در لیوان سوم تا نصفه آب ریختیم. نیمه‌پر است.", do: [
            { id: "g3.water", to: { sy: 0 }, dur: 1 },
            { id: "jug", to: { x: 108, y: 36 }, at: 200, dur: 1400 }, { id: "jug", to: { r: 70 }, at: 1600, dur: 600 },
            { emit: "drop", where: [120, 34], n: 8, spread: [2, 2], rise: -8, at: 2000, dur: 1000 },
            { id: "g3.water", to: { sy: 0.5 }, at: 2100, dur: 1000 }, { id: "jug", to: { r: 0 }, at: 3200, dur: 500 },
            { id: "jug", to: { x: 178, y: 50 }, at: 3800, dur: 1200 }
          ] },
          { caption: "لیوان وسطی خالی ماند. هیچ آبی ندارد.", do: [jump("g2", 300, 3)],
            wait: { tap: ["g2"], hint: "روی لیوان خالی بزن.", each: [jump("$", 0, 3)] } }
        ] },
      /* Which holds more: the thin glass is full; poured into the bowl, it fills only part of it. */
      { type: "scene", prompt: "ببین و جواب بده", bg: "#f7ecd9",
        parts: {
          table: { art: "counter-table", at: [80, 92], s: 2 },
          bowl: { art: "bowl", look: { level: 0 }, at: [104, 56], s: 1.5 },
          tall: { art: "glass-tall", look: { level: 1 }, at: [40, 56], s: 1.4 }
        },
        scenes: [
          { caption: "این لیوان باریک پر از آب است. این کاسه خالی است.", do: [jump("tall", 300, 2), jump("bowl", 1300, 2)] },
          { caption: "آب لیوان را در کاسه می‌ریزیم.", key: 3300, do: [
            { id: "bowl.water", to: { sy: 0 }, dur: 1 }, { id: "tall.water", to: { sy: 1 }, dur: 1 },
            hop("tall", [40, 56], [70, 22], 200, 1400, 6), { id: "tall", to: { r: 110 }, at: 1600, dur: 700 },
            { emit: "drop", where: [104, 32], n: 16, spread: [3, 2], rise: -8, at: 2100, dur: 2200 },
            { id: "tall.water", to: { sy: 0 }, at: 2100, dur: 2200 }, { id: "bowl.water", to: { sy: 0.45 }, at: 2300, dur: 2200 }
          ] },
          { caption: "همه آب لیوان در کاسه رفت، ولی کاسه پر نشد!", do: [
            { id: "tall", to: { r: 0 }, dur: 600 }, hop("tall", [70, 22], [40, 56], 600, 1200, 6), jump("bowl", 2200, 2)
          ] },
          { caption: "پس کاسه از لیوان بیشتر جا دارد." }
        ],
        question: "کدام بیشتر جا دارد؟", pic: true,
        options: [{ label: "🥛", value: "لیوان" }, { label: "🥣", value: "کاسه" }], answer: "کاسه" },
      { type: "choose", prompt: "کدام بیشتر آب جا دارد؟", say: "کدام بیشتر آب جا دارد؟ قاشق یا سطل؟", pic: true,
        options: [{ label: "🥄", value: "قاشق" }, { label: "🪣", value: "سطل" }], answer: "سطل" },
      { type: "choose", prompt: "کدام کمتر آب جا دارد؟", say: "کدام کمتر آب جا دارد؟ وان حمام، استکان یا کتری؟", pic: true,
        options: [{ label: "🛁", value: "وان" }, { label: "🍵", value: "استکان" }, { label: "🫖", value: "کتری" }], answer: "استکان" },
      { type: "doit", pic: "🥛💧", text: "با آب و چند ظرف بازی کن (کنار ظرفشویی یا در حمام):",
        list: ["یک لیوان را پر کن، یکی را نیمه‌پر، و یکی را خالی بگذار.", "یک لیوان آب را در یک کاسه بریز. کاسه پر شد؟",
          "حدس بزن کدام ظرف بیشتر جا دارد. بعد با آب امتحان کن."] }
    ]
  },
  {
    id: "math-seed-19", subject: "math", level: "seed", emoji: "🪆", title: "از کوچک تا بزرگ",
    steps: [
      { type: "order", prompt: "کاسه‌ها را از کوچک تا بزرگ بچین", say: "کاسه‌ها را از کوچک تا بزرگ بچین.", ltr: true,
        items: [{ pic: "🥣", size: 0.55, say: "کاسه کوچک" }, { pic: "🥣", size: 0.85, say: "کاسه وسطی" }, { pic: "🥣", size: 1.25, say: "کاسه بزرگ" }] },
      { type: "order", prompt: "روبان‌ها را از کوتاه تا دراز بچین", say: "روبان‌ها را از کوتاه تا دراز بچین.", ltr: true,
        items: [{ bar: 2, say: "روبان کوتاه" }, { bar: 4, say: "روبان وسطی" }, { bar: 7, say: "روبان دراز" }] },
      { type: "order", prompt: "حیوان‌ها را از کوچک تا بزرگ بچین", say: "حیوان‌ها را از کوچک تا بزرگ بچین: مورچه، موش، گربه، اسب، فیل.", ltr: true,
        items: ["🐜", "🐭", "🐈", "🐎", "🐘"] },
      { type: "order", prompt: "بچه‌ها در صف ایستاده‌اند: از کوتاه تا بلند بچین", say: "بچه‌ها را از قد کوتاه تا قد بلند بچین.", ltr: true,
        items: [{ pic: "🧍", size: 0.55, say: "کوتاه‌ترین" }, { pic: "🧍‍♀️", size: 0.75 }, { pic: "🧍", size: 0.95 }, { pic: "🧍‍♀️", size: 1.15 }, { pic: "🧍", size: 1.35, say: "بلندترین" }] },
      { type: "order", prompt: "مدادها را از کوتاه تا دراز بچین", say: "مدادها را از کوتاه تا دراز بچین.", ltr: true,
        items: [{ bar: 2 }, { bar: 3 }, { bar: 5 }, { bar: 6 }, { bar: 8 }] },
      { type: "order", prompt: "میوه‌ها را از بزرگ تا کوچک بچین", say: "میوه‌ها را از بزرگ تا کوچک بچین: هندوانه، خربزه، سیب، گیلاس.", ltr: true,
        items: ["🍉", "🍈", "🍎", "🍒"] }
    ]
  },
  {
    id: "math-seed-5", subject: "math", level: "seed", emoji: "🧺", title: "دسته کن",
    steps: [
      { type: "sort", prompt: "قرمزها یک طرف، سبزها یک طرف",
        say: "میوه‌ها و سبزی‌های قرمز را در یک سبد بگذار و سبزها را در سبد دیگر.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "سبز", pic: "🟢", value: "green" }],
        items: [
          { pic: "🍎", say: "سیب", basket: "red" },
          { pic: "🍅", say: "گوجه‌فرنگی", basket: "red" },
          { pic: "🍓", say: "توت‌فرنگی", basket: "red" },
          { pic: "🥒", say: "خیار", basket: "green" },
          { pic: "🍏", say: "سیب سبز", basket: "green" },
          { pic: "🥬", say: "کاهو", basket: "green" }
        ] },
      { type: "sort", prompt: "اسباب‌بازی‌ها را جمع کن",
        say: "اسباب‌بازی‌های قرمز را در یک جعبه بگذار و آبی‌ها را در جعبه دیگر.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "آبی", pic: "🔵", value: "blue" }],
        items: [
          { pic: "🚗", say: "ماشین قرمز", basket: "red" },
          { pic: "🚙", say: "ماشین آبی", basket: "blue" },
          { pic: "🎈", say: "بادکنک قرمز", basket: "red" },
          { pic: "🧢", say: "کلاه آبی", basket: "blue" },
          { pic: "🚒", say: "ماشین آتش‌نشانی", basket: "red" },
          { pic: "🐳", say: "نهنگ آبی", basket: "blue" }
        ] },
      { type: "sort", prompt: "هر چیز را در سبد رنگ خودش بگذار",
        say: "قرمزها، زردها و آبی‌ها. هر چیز را در سبد رنگ خودش بگذار.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "زرد", pic: "🟡", value: "yellow" }, { label: "آبی", pic: "🔵", value: "blue" }],
        items: [
          { pic: "🍒", say: "گیلاس", basket: "red" },
          { pic: "🍋", say: "لیمو", basket: "yellow" },
          { pic: "💧", say: "قطره آب", basket: "blue" },
          { pic: "🌹", say: "گل سرخ", basket: "red" },
          { pic: "🌻", say: "گل آفتابگردان", basket: "yellow" },
          { pic: "👖", say: "شلوار", basket: "blue" }
        ] },
      { type: "sort", prompt: "گردها یک طرف، چهارگوش‌ها یک طرف",
        say: "به شکل‌شان نگاه کن، نه به رنگ‌شان. گردها را در یک سبد بگذار و چهارگوش‌ها را در سبد دیگر.",
        baskets: [{ label: "گرد", pic: "⚪", value: "round" }, { label: "چهارگوش", pic: "⬜", value: "square" }],
        items: [
          { pic: "🔴", say: "گرد قرمز", basket: "round" },
          { pic: "🟥", say: "چهارگوش قرمز", basket: "square" },
          { pic: "🔵", say: "گرد آبی", basket: "round" },
          { pic: "🟦", say: "چهارگوش آبی", basket: "square" },
          { pic: "🟡", say: "گرد زرد", basket: "round" },
          { pic: "🟨", say: "چهارگوش زرد", basket: "square" }
        ] },
      { type: "sort", prompt: "بزرگ‌ها یک طرف، کوچک‌ها یک طرف",
        say: "چیزهای بزرگ را در یک سبد بگذار و چیزهای کوچک را در سبد دیگر.",
        baskets: [{ label: "بزرگ", pic: "🐘", value: "big" }, { label: "کوچک", pic: "🐜", value: "small" }],
        items: [
          { pic: "🚌", say: "اتوبوس", basket: "big" },
          { pic: "🔑", say: "کلید", basket: "small" },
          { pic: "🌳", say: "درخت", basket: "big" },
          { pic: "🐞", say: "کفشدوزک", basket: "small" },
          { pic: "🏠", say: "خانه", basket: "big" },
          { pic: "🍒", say: "گیلاس", basket: "small" }
        ] }
    ]
  },
  {
    id: "math-seed-20", subject: "math", level: "seed", emoji: "🧐", title: "کدام جور نیست؟",
    steps: [
      { type: "choose", prompt: "کدام جور نیست؟", say: "سیب، موز، انگور، ماشین. کدام جور نیست؟ چرا؟ به پدر یا مادرت بگو.", pic: true,
        options: [{ label: "🍎", value: "سیب" }, { label: "🍌", value: "موز" }, { label: "🚗", value: "ماشین" }, { label: "🍇", value: "انگور" }], answer: "ماشین" },
      { type: "choose", prompt: "کدام جور نیست؟", say: "سگ، گربه، درخت، گاو. کدام جور نیست؟ چرا؟", pic: true,
        options: [{ label: "🐕", value: "سگ" }, { label: "🌳", value: "درخت" }, { label: "🐈", value: "گربه" }, { label: "🐄", value: "گاو" }], answer: "درخت" },
      { type: "choose", prompt: "کدام جور نیست؟", say: "به رنگ‌ها نگاه کن. کدام جور نیست؟", pic: true,
        options: [{ label: "🔴", value: "قرمز ۱" }, { label: "🔴", value: "قرمز ۲" }, { label: "🔵", value: "آبی" }, { label: "🔴", value: "قرمز ۳" }], answer: "آبی" },
      { type: "shape", prompt: "کدام جور نیست؟", say: "به شکل‌ها نگاه کن، نه به اندازه‌شان. کدام جور نیست؟",
        options: ["square", "square-small", "triangle", "square-tilt"], answer: "triangle" },
      { type: "sort", prompt: "یک بار بر اساس رنگ دسته کن", say: "قرمزها را در یک سبد بگذار و زردها را در سبد دیگر.",
        baskets: [{ label: "قرمز", pic: "🔴", value: "red" }, { label: "زرد", pic: "🟡", value: "yellow" }],
        items: [{ pic: "🍎", say: "سیب", basket: "red" }, { pic: "🚒", say: "ماشین آتش‌نشانی", basket: "red" }, { pic: "🍓", say: "توت‌فرنگی", basket: "red" },
          { pic: "🍌", say: "موز", basket: "yellow" }, { pic: "🚕", say: "تاکسی", basket: "yellow" }, { pic: "🐥", say: "جوجه", basket: "yellow" }] },
      { type: "sort", prompt: "همان‌ها را یک جور دیگر دسته کن: خوردنی‌ها و نخوردنی‌ها", say: "حالا همان چیزها را یک جور دیگر دسته کن: چیزهایی که می‌خوریم، و چیزهایی که نمی‌خوریم.",
        baskets: [{ label: "خوردنی", pic: "🍽️", value: "eat" }, { label: "نخوردنی", pic: "🚫", value: "no" }],
        items: [{ pic: "🍎", say: "سیب", basket: "eat" }, { pic: "🚒", say: "ماشین آتش‌نشانی", basket: "no" }, { pic: "🍓", say: "توت‌فرنگی", basket: "eat" },
          { pic: "🍌", say: "موز", basket: "eat" }, { pic: "🚕", say: "تاکسی", basket: "no" }, { pic: "🐥", say: "جوجه", basket: "no" }] },
      { type: "choose", show: "🐟🐙 | 🐦🦋", prompt: "این‌ها را چطور دسته کرده‌اند؟",
        say: "این حیوان‌ها را دو دسته کرده‌اند. چطور؟ به رنگ؟ به اندازه؟ یا به جایی که زندگی می‌کنند: در آب یا در هوا؟", pic: true,
        options: [{ label: "🔴🔵", value: "رنگ" }, { label: "🌊☁️", value: "آب و هوا" }, { label: "🐘🐜", value: "اندازه" }], answer: "آب و هوا" }
    ]
  },
  {
    id: "math-seed-6", subject: "math", level: "seed", emoji: "🐈", title: "کجاست؟",
    steps: [
      /* Position words, each shown by something going there: the sparrow flies up to the top of the tree, the cat
         walks to its foot, the ball rolls up next to it. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [70, 86], s: 0.85 },
          bird: { art: "sparrow", at: [-20, 10], s: 1.6 }, cat: { art: "cat-side", at: [-16, 88], s: 1.6 },
          ball: { art: "ball-roll", at: [178, 81], s: 1.6 }
        },
        scenes: [
          { caption: "این درخت حیاط است." },
          { caption: "گنجشک آمد و بالای درخت نشست.", do: [fly("bird", [-20, 10], [70, 21.5], 0, 2200, 8)] },
          { caption: "گربه آمد و پایین درخت نشست.", do: [hops("cat", [-16, 88], [64, 88], 9, 0, 2600, 1.5)] },
          { caption: "توپ قل خورد و کنار درخت ایستاد.", do: [
            { id: "ball", to: { x: 112 }, dur: 2200, ease: "out" }, { id: "ball", to: { r: -900 }, dur: 2200, ease: "out" }
          ] }
        ] },
      /* Hide-and-seek: Kamran really goes behind the wide trunk (only his edge peeks out), and Sara comes in front
         of it. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [140, 86], s: 1.1, flip: true },
          tree: { art: "plane-tree", at: [80, 87], s: 0.95 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [20, 88], s: 1.1 }
        },
        scenes: [
          { caption: "سارا و کامران قایم‌باشک بازی می‌کنند.", do: [
            jump("girl", 0, 3), jump("boy", 500, 3),
            { id: "girl", to: { flip: -1 }, at: 1600, dur: 300 }, { id: "girl.armF", to: { r: -150 }, at: 1900, dur: 500 }
          ] },
          { caption: "کامران پشت درخت قایم شد.", do: [{ id: "boy", walk: [88, 84], dur: 2400 }] },
          { caption: "سارا جلوی درخت آمد.", do: [
            { id: "girl.armF", to: { r: 0 }, dur: 400 }, { id: "girl", to: { flip: 1 }, at: 400, dur: 300 },
            { id: "girl", walk: [72, 89], at: 800, dur: 2200 }
          ] },
          { caption: "پیدات کردم!", do: [
            { id: "boy", walk: [106, 87], dur: 900 }, { id: "girl.armF", to: { r: -95 }, at: 900, dur: 400 },
            jump("girl", 1300, 4), jump("boy", 1300, 4)
          ] }
        ],
        question: "چه کسی پشت درخت قایم شد؟", pic: true,
        options: [{ label: "👧", value: "سارا" }, { label: "👦", value: "کامران" }], answer: "کامران" },
      // The sun comes up from behind the house and stays above it; the dog trots up next to the house.
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          sky: { art: "sky-day" }, sun: { art: "sun", at: [72, 62], s: 1.2 }, ground: { art: "ground" },
          house: { art: "🏠", at: [72, 84], s: 2.6 }, dog: { art: "🐕", at: [178, 86], s: 1.4 }
        },
        scenes: [
          { caption: "یک خانه، یک خورشید و یک سگ. کدام بالای خانه است؟", do: [
            { id: "sun", to: { y: 16 }, dur: 2600, ease: "out" }, hops("dog", [178, 86], [122, 86], 6, 1200, 2000, 2)
          ] }
        ],
        question: "کدام بالای خانه است؟", pic: true,
        options: [{ label: "🐕", value: "سگ" }, { label: "☀️", value: "خورشید" }, { label: "🏠", value: "خانه" }], answer: "خورشید" },
      /* Grandma comes home with a bag of fruit; the apple goes into the basket (between its back and front, so it
         is really inside) and the pear stays next to it. */
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          bg: { art: "bg-kitchen" }, basketB: { art: "basket-back", at: [56, 86], s: 1.6 },
          apple: { art: "🍎", at: [126, 80], s: 0.9, o: 0 }, basketF: { art: "basket-front", at: [56, 86], s: 1.6 },
          pear: { art: "🍐", at: [126, 80], s: 0.95, o: 0 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#c4673a", top: "#8a6f9e", bottom: "dress" }, at: [184, 88], s: 1.5, flip: true },
          bag: { art: "🛍️", at: [177, 88] }
        },
        scenes: [
          { caption: "مادربزرگ از بازار میوه خریده است.", do: [
            { id: "gran", walk: [140, 88], dur: 2600 }, { id: "bag", to: { x: 133 }, dur: 2600, ease: "linear" },
            { id: "bag", to: { x: 126 }, at: 2700, dur: 400 },
            { id: "apple", to: { o: 1 }, at: 3200, dur: 150 }, hop("apple", [126, 80], [112, 88], 3200, 700, 10),
            { id: "pear", to: { o: 1 }, at: 4000, dur: 150 }, hop("pear", [126, 80], [98, 88], 4000, 700, 10)
          ] },
          { caption: "سیب را داخل سبد گذاشت. گلابی کنار سبد است.", do: [
            { id: "gran.armF", to: { r: -60 }, dur: 500 }, hop("apple", [112, 88], [56, 77], 400, 1000, 18),
            { id: "gran.armF", to: { r: 0 }, at: 1500, dur: 500 }, jump("pear", 2600, 3)
          ] }
        ],
        question: "چه چیزی داخل سبد است؟", pic: true,
        options: [{ label: "🍐", value: "گلابی" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "دستت را بالا ببر! بالا کدام طرف است؟", say: "دستت را بالا ببر! بالا کدام طرف است؟", pic: true,
        options: [{ label: "⬇️", value: "پایین" }, { label: "⬆️", value: "بالا" }], answer: "بالا" },
      { type: "choose", prompt: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", say: "حالا دستت را پایین بیاور. پایین کدام طرف است؟", pic: true,
        options: [{ label: "⬆️", value: "بالا" }, { label: "⬇️", value: "پایین" }], answer: "پایین" },
      // The sparrow sits next to the cat, then flies up to the top of the tree; the cat looks up after it.
      { type: "scene", prompt: "ببین و جواب بده",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [104, 87], s: 0.85 },
          cat: { art: "cat-side", at: [26, 88], s: 1.6 }, bird: { art: "sparrow", at: [46, 88], s: 1.5, flip: true }
        },
        scenes: [
          { caption: "گنجشک کنار گربه نشسته بود. پرید و رفت بالای درخت.", key: 1200, do: [
            { id: "bird", to: { flip: 1 }, at: 2200, dur: 200 }, fly("bird", [46, 88], [104, 22.5], 2400, 2200, 14),
            { id: "cat.head", to: { r: -30 }, at: 3200, dur: 800 }
          ] },
          { caption: "حالا گنجشک کجاست؟", do: [jump("bird", 300, 2)] }
        ],
        question: "گنجشک کجاست؟", pic: true,
        options: [{ label: "⬆️", value: "بالای درخت" }, { label: "⬇️", value: "پایین درخت" }], answer: "بالای درخت" }
    ]
  },
  {
    id: "math-seed-21", subject: "math", level: "seed", emoji: "🧸", title: "بین، روی، زیر",
    steps: [
      { type: "map", map: ROOM_FRONT, prompt: "این اتاق را ببین. روی هر چیز بزن تا بشنوی کجاست." },
      { type: "map", map: ROOM_FRONT, say: "در اتاق پیدا کن.",
        tasks: [{ find: "cat", prompt: "چه چیزی روی میز است؟ رویش بزن." }, { find: "ball", prompt: "چه چیزی زیر میز است؟ رویش بزن." }] },
      { type: "map", map: ROOM_FRONT, say: "در اتاق پیدا کن.",
        tasks: [{ find: "teddy", prompt: "چه چیزی بین دو صندلی است؟ رویش بزن." }, { find: "car", prompt: "چه چیزی داخل جعبه است؟ رویش بزن." },
          { find: "apple", prompt: "چه چیزی بیرون جعبه است؟ رویش بزن." }] },
      { type: "choose", prompt: "در کدام، سیب بین دو موز است؟", say: "در کدام، سیب بین دو موز است؟", pic: true,
        options: [{ label: "🍎🍌🍌", value: "کنار" }, { label: "🍌🍎🍌", value: "بین" }, { label: "🍌🍌🍎", value: "آخر" }], answer: "بین" },
      { type: "choose", prompt: "کتاب روی میز بود. آن را زیر میز گذاشتیم. حالا کتاب بالاتر است یا پایین‌تر؟",
        say: "کتاب روی میز بود. آن را زیر میز گذاشتیم. حالا کتاب بالاتر است یا پایین‌تر؟", pic: true,
        options: [{ label: "⬆️", value: "بالاتر" }, { label: "⬇️", value: "پایین‌تر" }], answer: "پایین‌تر" },
      { type: "doit", pic: "🙈🧸", text: "قایم‌باشک با اسباب‌بازی:",
        list: ["پدر یا مادرت یک اسباب‌بازی را قایم کنند و بگویند کجاست: «زیر میز»، «روی کمد»، «بین دو بالش».",
          "تو پیدایش کن. بعد جایتان را عوض کنید: تو قایم کن و بگو کجاست."] }
    ]
  },
  {
    id: "math-seed-22", subject: "math", level: "seed", emoji: "🧭", title: "راه را پیدا کن",
    steps: [
      { type: "map", map: PARK, prompt: "این نقشه پارک است، از بالا. روی هر جا بزن تا اسمش را بشنوی." },
      { type: "map", map: PARK, say: "با سارا راه برو.",
        tasks: [{ route: ["gate", "pool", "tree"], walker: "👧",
          prompt: "سارا از در پارک راه می‌افتد. مستقیم جلو برو تا حوض. بعد بپیچ و برو تا درخت. روی جاها به ترتیب بزن." }] },
      { type: "map", map: PARK, say: "با آرمان راه برو.",
        tasks: [{ route: ["tree", "pool", "bench"], walker: "👦",
          prompt: "آرمان کنار درخت است. برو پایین تا حوض. بعد بپیچ و مستقیم برو تا نیمکت." }] },
      { type: "map", map: PARK, say: "با مادربزرگ راه برو.",
        tasks: [{ route: ["gate", "pool", "slide"], walker: "👵",
          prompt: "مادربزرگ می‌خواهد سرسره‌بازی تو را ببیند. از در پارک برو تا حوض، بعد برو تا سرسره." }] },
      { type: "map", map: PARK, say: "با بابا راه برو.",
        tasks: [{ route: ["bench", "pool", "tree", "flowers"], walker: "👨",
          prompt: "بابا روی نیمکت است. برو تا حوض. بعد بپیچ و برو تا درخت. از آن‌جا برو تا باغچه گل." }] },
      { type: "doit", pic: "🚶‍♀️🧭", text: "راه را به یک نفر بگو:",
        list: ["راه اتاقت تا آشپزخانه را به پدر یا مادرت بگو: چند قدم جلو، کجا بپیچد، تا کجا برود.",
          "آن‌ها همان‌طور که گفتی راه بروند. به آشپزخانه رسیدند؟", "حالا جایتان را عوض کنید."] }
    ]
  },
  {
    id: "math-seed-7", subject: "math", level: "seed", emoji: "⚽", title: "شکل‌های دور و بر ما",
    steps: [
      { type: "shape", show: ["circle", "square", "triangle"], prompt: "این دایره است، این مربع و این مثلث." },
      { type: "shape", prompt: "دایره کدام است؟", options: ["square", "circle", "triangle"], answer: "circle" },
      { type: "shape", prompt: "مثلث کدام است؟", options: ["circle", "square", "triangle-tilt"], answer: "triangle" },
      { type: "shape", prompt: "مربع کدام است؟", options: ["triangle", "square-tilt", "circle"], answer: "square" },
      { type: "shape", show: "circle", prompt: "کدام شبیه دایره است؟", say: "کدام شبیه دایره است؟ توپ، کتاب یا موز؟", pic: true,
        options: [{ label: "📕", value: "کتاب" }, { label: "⚽", value: "توپ" }, { label: "🍌", value: "موز" }], answer: "توپ" },
      { type: "shape", show: "square", prompt: "کدام شبیه مربع است؟", say: "کدام شبیه مربع است؟ ماه، جعبه کادو یا موز؟", pic: true,
        options: [{ label: "🌙", value: "ماه" }, { label: "🍌", value: "موز" }, { label: "🎁", value: "جعبه" }], answer: "جعبه" },
      { type: "shape", show: "triangle", prompt: "کدام شبیه مثلث است؟", say: "کدام شبیه مثلث است؟ چادر عشایر، توپ یا جعبه؟", pic: true,
        options: [{ label: "⚽", value: "توپ" }, { label: "⛺", value: "چادر" }, { label: "🎁", value: "جعبه" }], answer: "چادر" },
      { type: "doit", pic: "🏠 🔍", text: "در خانه بگرد و این شکل‌ها را پیدا کن:",
        list: ["یک چیز گرد، مثل بشقاب یا نان تافتون", "یک چیز مربع، مثل کاشی یا دستمال", "یک چیز مثلث، مثل یک تکه هندوانه"] }
    ]
  },
  {
    id: "math-seed-23", subject: "math", level: "seed", emoji: "🔷", title: "مستطیل، و شکل‌های چرخیده",
    steps: [
      { type: "shape", show: ["rectangle", "square"], prompt: "این مستطیل است و این مربع. هر دو چهار ضلع و چهار گوشه دارند. مستطیل کشیده است." },
      { type: "shape", prompt: "مستطیل کدام است؟", options: ["square", "rectangle-tall", "circle"], answer: "rectangle" },
      { type: "shape", prompt: "مثلث کدام است؟", say: "مثلث کدام است؟ شکل‌ها چرخیده‌اند.", options: ["square-tilt", "rectangle", "triangle-down"], answer: "triangle" },
      { type: "shape", prompt: "مربع کدام است؟", say: "مربع کدام است؟ شکل‌ها چرخیده‌اند.", options: ["triangle-tilt", "square-tilt", "rectangle-thin"], answer: "square" },
      { type: "shape", prompt: "مثلث کدام است؟", say: "مثلث سه ضلع صاف دارد و ضلع‌هایش به هم وصل‌اند. مثلث کدام است؟",
        options: ["opentri", "curvetri", "triangle-thin"], answer: "triangle" },
      { type: "sort", prompt: "مثلث‌ها یک طرف، شکل‌های دیگر یک طرف", say: "مثلث‌ها را در یک سبد بگذار و شکل‌های دیگر را در سبد دیگر. بزرگ و کوچک، چرخیده یا نچرخیده، فرقی ندارد.",
        baskets: [{ label: "مثلث", shape: "triangle", value: "tri" }, { label: "مثلث نیست", shape: "opentri", value: "no" }],
        items: [{ shape: "triangle-small", say: "مثلث کوچک", basket: "tri" }, { shape: "triangle-tilt", say: "مثلث چرخیده", basket: "tri" },
          { shape: "triangle-thin", say: "مثلث باریک", basket: "tri" }, { shape: "curvetri", say: "شکلی با ضلع خمیده", basket: "no" },
          { shape: "opentri", say: "شکل باز", basket: "no" }, { shape: "square-tilt", say: "مربع چرخیده", basket: "no" }] },
      { type: "sort", prompt: "مستطیل‌ها یک طرف، مربع‌ها یک طرف", say: "مستطیل‌ها کشیده‌اند. مربع‌ها همه ضلع‌هایشان یک اندازه است. هر کدام را در سبد خودش بگذار.",
        baskets: [{ label: "مستطیل", shape: "rectangle", value: "rect" }, { label: "مربع", shape: "square", value: "square" }],
        items: [{ shape: "rectangle-tall", say: "مستطیل ایستاده", basket: "rect" }, { shape: "rectangle-thin", say: "مستطیل باریک", basket: "rect" },
          { shape: "square-small", say: "مربع کوچک", basket: "square" }, { shape: "square-tilt", say: "مربع چرخیده", basket: "square" },
          { shape: "rectangle", say: "مستطیل", basket: "rect" }, { shape: "square", say: "مربع", basket: "square" }] },
      { type: "shape", show: "rectangle", prompt: "کدام شبیه مستطیل است؟", say: "کدام شبیه مستطیل است؟ در، توپ یا تکه هندوانه؟", pic: true,
        options: [{ label: "⚽", value: "توپ" }, { label: "🚪", value: "در" }, { label: "🍉", value: "هندوانه" }], answer: "در" }
    ]
  },
  {
    id: "math-seed-24", subject: "math", level: "seed", emoji: "🏠", title: "با شکل‌ها بساز",
    steps: [
      /* Shapes really come together into pictures: a square and a triangle make a house, a circle and a triangle an
         ice-cream cone. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          sq: { art: "sh-square", at: [40, 46], s: 1.4, o: 0 }, tri: { art: "sh-tri", at: [120, 46], s: 1, o: 0 },
          door: { art: "sh-door", at: [80, 72], s: 1.3, o: 0 },
          ball: { art: "sh-circle", at: [40, 46], s: 0.9, o: 0 }, cone: { art: "sh-tri", at: [120, 46], s: 0.65, r: 180, o: 0 }
        },
        scenes: [
          { caption: "این یک مربع است، و این یک مثلث.", do: [pop("sq", 300), pop("tri", 1500)] },
          { caption: "مربع را پایین می‌گذاریم، و مثلث را رویش.", do: [
            { id: "sq", to: { x: 80, y: 66 }, at: 300, dur: 1300 }, { id: "tri", to: { x: 80, y: 41.5, s: 1.4 }, at: 1700, dur: 1500 }
          ] },
          { caption: "یک در کوچک هم گذاشتیم. یک خانه ساختیم!", do: [pop("door", 300)] },
          { caption: "حالا یک دایره و یک مثلث.", do: [
            { id: "sq", to: { o: 0 }, dur: 500 }, { id: "tri", to: { o: 0 }, dur: 500 }, { id: "door", to: { o: 0 }, dur: 500 },
            pop("ball", 900), pop("cone", 1900)
          ] },
          { caption: "دایره را روی مثلث برعکس می‌گذاریم: یک بستنی!", do: [
            { id: "cone", to: { x: 80, y: 62 }, at: 300, dur: 1300 }, { id: "ball", to: { x: 80, y: 49 }, at: 1700, dur: 1300 }
          ] }
        ] },
      { type: "tangram", prompt: "یک خانه بساز: هر شکل را در جای خودش بگذار.", say: "یک خانه بساز. روی یک شکل بزن، بعد روی جایش.",
        slots: [{ shape: "square", at: [50, 58], s: 1.6 }, { shape: "tri", at: [50, 34], s: 1.1 }], extra: [{ shape: "circle" }],
        pic: "🏠", made: "یک خانه ساختی!" },
      { type: "tangram", prompt: "یک درخت بساز. تنه درخت را باید بچرخانی.", say: "یک درخت بساز. تنه درخت را باید بچرخانی: روی دکمه بچرخان بزن.",
        slots: [{ shape: "tri", at: [50, 28], s: 1.4 }, { shape: "rect", at: [50, 56], r: 90 }], extra: [{ shape: "square" }],
        pic: "🌲", made: "یک درخت ساختی!" },
      { type: "tangram", prompt: "یک قایق بساز. بدنه قایق برعکس است.", say: "یک قایق بساز. نیم‌دایره را بچرخان تا بدنه قایق شود.",
        slots: [{ shape: "semi", at: [50, 56], s: 1.6, r: 180 }, { shape: "rtri", at: [52, 34], s: 1.1 }], extra: [{ shape: "circle" }],
        pic: "⛵", made: "یک قایق ساختی!" },
      { type: "tangram", prompt: "یک ماهی بساز. شکل‌ها را بچرخان تا جا بیفتند.", say: "یک ماهی بساز. شکل‌ها را بچرخان تا جا بیفتند.", turn: 45,
        slots: [{ shape: "square", at: [58, 40], s: 1.4, r: 45 }, { shape: "tri", at: [28, 40], r: 90 }], extra: [{ shape: "rect" }],
        pic: "🐟", made: "یک ماهی ساختی!" },
      { type: "doit", pic: "🔺🟦", text: "با شکل‌ها تصویر بساز:",
        list: ["از کاغذ رنگی چند مربع، مثلث و دایره ببرید (یا از درِ قوطی‌ها و قاشق‌ها استفاده کنید).",
          "با آن‌ها یک خانه، یک آدم یا یک گل بساز.", "بگو در تصویرت چند مثلث و چند دایره هست."] }
    ]
  },
  {
    id: "math-seed-25", subject: "math", level: "seed", emoji: "📦", title: "توپ، جعبه، قوطی",
    steps: [
      /* What rolls, what slides, what stacks: a ball and a can lying down really roll down the board (they turn), a
         box slides down without turning; boxes stand on each other, a ball on a box rolls off. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          room: { art: "day-room" }, ramp: { art: "ramp", at: [110, 82], s: 1 },
          ball: { art: "ball-3d", at: [46, 46], s: 1.2, o: 0 }, box: { art: "cube", at: [50, 56], s: 1.2, r: 22, o: 0 },
          can: { art: "can-end", at: [46, 46], s: 1.2, o: 0 },
          b1: { art: "cube", at: [40, 82], s: 1.4, o: 0 }, b2: { art: "cube", at: [40, 62.4], s: 1.4, o: 0 },
          ball2: { art: "ball-3d", at: [42, 49], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "توپ را بالای تخته گذاشتیم. توپ قل خورد و پایین رفت.", do: [
            { id: "ball", to: { o: 1 }, dur: 300 },
            { id: "ball", path: "M46 46L110 72L146 73", at: 700, dur: 2600, ease: "in" }, { id: "ball", to: { r: 900 }, at: 700, dur: 2600, ease: "in" }
          ] },
          { caption: "جعبه را گذاشتیم. جعبه قل نخورد. سُر خورد و پایین رفت.", do: [
            { id: "ball", to: { o: 0 }, dur: 400 }, { id: "box", to: { o: 1 }, at: 400, dur: 300 },
            { id: "box", path: "M50 56L104 77.6", at: 1100, dur: 2200, ease: "in" }, { id: "box", to: { r: 0, x: 120, y: 82 }, at: 3300, dur: 500 }
          ] },
          { caption: "قوطی را خواباندیم. قوطی خوابیده قل خورد!", do: [
            { id: "box", to: { o: 0 }, dur: 400 }, { id: "can", to: { o: 1 }, at: 400, dur: 300 },
            { id: "can", path: "M46 46L110 72L146 73", at: 1100, dur: 2600, ease: "in" }, { id: "can", to: { r: 900 }, at: 1100, dur: 2600, ease: "in" }
          ] },
          { caption: "دو جعبه را روی هم گذاشتیم. خوب می‌ایستند.", do: [
            { id: "can", to: { o: 0 }, dur: 400 }, { id: "ramp", to: { o: 0 }, dur: 600 },
            pop("b1", 800), { id: "b2", to: { o: 1 }, at: 1800, dur: 200 }, hop("b2", [80, 82], [40, 62.4], 1800, 1000, 14)
          ] },
          { caption: "یک توپ را روی جعبه‌ها گذاشتیم. توپ قل خورد و افتاد!", do: [
            { id: "ball2", to: { o: 1 }, dur: 300 }, { id: "ball2", path: "M42 49Q58 46 70 73.6L96 73.6", at: 1000, dur: 1800, ease: "in" },
            { id: "ball2", to: { r: 700 }, at: 1000, dur: 1800, ease: "in" }
          ] }
        ],
        question: "کدام قل نمی‌خورد؟", pic: true,
        options: [{ label: "⚽", value: "توپ" }, { label: "📦", value: "جعبه" }, { label: "🥫", value: "قوطی" }], answer: "جعبه" },
      { type: "sort", prompt: "کدام قل می‌خورد؟ کدام قل نمی‌خورد؟", say: "هر چیز را که قل می‌خورد در یک سبد بگذار و هر چیز را که قل نمی‌خورد در سبد دیگر.",
        baskets: [{ label: "قل می‌خورد", pic: "⚽", value: "roll" }, { label: "قل نمی‌خورد", pic: "📦", value: "no" }],
        items: [{ pic: "🍊", say: "پرتقال", basket: "roll" }, { pic: "🎁", say: "جعبه کادو", basket: "no" }, { pic: "🏀", say: "توپ", basket: "roll" },
          { pic: "📚", say: "کتاب‌ها", basket: "no" }, { pic: "🎲", say: "تاس", basket: "no" }, { pic: "🍉", say: "هندوانه", basket: "roll" }] },
      { type: "sort", prompt: "شبیه توپ، شبیه جعبه، یا شبیه قوطی؟", say: "هر چیز شبیه کدام است؟ توپ، جعبه یا قوطی؟ در سبد خودش بگذار.",
        baskets: [{ label: "توپ", pic: "⚽", value: "ball" }, { label: "جعبه", pic: "📦", value: "box" }, { label: "قوطی", pic: "🥫", value: "can" }],
        items: [{ pic: "🍊", say: "پرتقال", basket: "ball" }, { pic: "🎲", say: "تاس", basket: "box" }, { pic: "🕯️", say: "شمع", basket: "can" },
          { pic: "🌍", say: "کره زمین", basket: "ball" }, { pic: "🎁", say: "جعبه کادو", basket: "box" }, { pic: "🧻", say: "دستمال کاغذی لوله‌ای", basket: "can" }] },
      { type: "choose", prompt: "کدام را می‌شود روی هم چید تا بلند شود؟", say: "کدام را می‌شود روی هم چید تا بلند شود؟ جعبه‌ها یا توپ‌ها؟", pic: true,
        options: [{ label: "⚽⚽", value: "توپ" }, { label: "📦📦", value: "جعبه" }], answer: "جعبه" },
      { type: "doit", pic: "🍳🔍", text: "در آشپزخانه بگرد (با اجازه پدر یا مادرت):",
        list: ["یک چیز پیدا کن که شبیه توپ است، مثل پرتقال.", "یک چیز شبیه جعبه، مثل جعبه چای.", "یک چیز شبیه قوطی، مثل قوطی رب.",
          "روی زمین امتحان کن: کدام قل می‌خورد؟ کدام را می‌شود روی هم گذاشت؟"] }
    ]
  },
  {
    id: "math-seed-8", subject: "math", level: "seed", emoji: "🔁", title: "الگو بساز",
    steps: [
      { type: "pattern", prompt: "بعدی کدام است؟", say: "قرمز، آبی، قرمز، آبی. بعدی کدام است؟",
        seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], blanks: [5], options: ["🔴", "🔵", "🟡"] },
      { type: "pattern", prompt: "سالاد شیرازی! خیار، گوجه، خیار، گوجه…", say: "خیار، گوجه، خیار، گوجه. جاهای خالی را پر کن.",
        seq: ["🥒", "🍅", "🥒", "🍅", "🥒", "🍅"], blanks: [4, 5], options: ["🍅", "🥒", "🧅"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "گل، گل، برگ. گل، گل، برگ. بعدی کدام است؟",
        seq: ["🌸", "🌸", "🍃", "🌸", "🌸", "🍃", "🌸", "🌸", "🍃"], blanks: [8], options: ["🌸", "🍃"] },
      { type: "pattern", prompt: "دست بزن، دست بزن، پا بکوب!", say: "دست، دست، پا. دست، دست، پا. با من دست بزن و پا بکوب، بعد جاهای خالی را پر کن.",
        seq: ["👏", "👏", "🦶", "👏", "👏", "🦶", "👏", "👏", "🦶"], blanks: [5, 8], options: ["👏", "🦶"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "قرمز، زرد، آبی. قرمز، زرد، آبی. بعدی کدام است؟",
        seq: ["🔴", "🟡", "🔵", "🔴", "🟡", "🔵", "🔴", "🟡"], blanks: [7], options: ["🔵", "🔴", "🟡"] },
      { type: "pattern", prompt: "مرغ، جوجه، تخم‌مرغ…", say: "مرغ، جوجه، تخم‌مرغ. مرغ، جوجه، تخم‌مرغ. جاهای خالی را پر کن.",
        seq: ["🐔", "🐥", "🥚", "🐔", "🐥", "🥚", "🐔"], blanks: [5, 6], options: ["🥚", "🐔", "🐥"] },
      { type: "pattern", prompt: "فرش را تمام کن", say: "این فرش نقش دارد: قرمز، زرد، قرمز، زرد. بقیه‌اش را تو بباف.",
        seq: ["🟥", "🟨", "🟥", "🟨", "🟥", "🟨"], blanks: [3, 4, 5], options: ["🟥", "🟨", "🟦"] }
    ]
  },
  {
    id: "math-seed-26", subject: "math", level: "seed", emoji: "👏", title: "الگو با صدا و حرکت",
    steps: [
      { type: "pattern", prompt: "دست بزن، پا بکوب، دست بزن، پا بکوب…", say: "دست، پا، دست، پا. با من دست بزن و پا بکوب. بعدی کدام است؟",
        seq: ["👏", "🦶", "👏", "🦶", "👏", "🦶"], blanks: [5], options: ["👏", "🦶"] },
      { type: "pattern", prompt: "دست، دست، پا…", say: "دست، دست، پا. دست، دست، پا. با من انجام بده، بعد جاهای خالی را پر کن.",
        seq: ["👏", "👏", "🦶", "👏", "👏", "🦶", "👏", "👏", "🦶"], blanks: [7, 8], options: ["👏", "🦶"] },
      { type: "pattern", prompt: "طبل، زنگ، زنگ…", say: "دام، دینگ، دینگ. دام، دینگ، دینگ. بعدی‌ها کدام‌اند؟",
        seq: ["🥁", "🔔", "🔔", "🥁", "🔔", "🔔", "🥁", "🔔", "🔔"], blanks: [6, 7, 8], options: ["🥁", "🔔"] },
      { type: "pattern", prompt: "همان الگوی دست و پا، این بار با رنگ‌ها: قرمز به جای دست، آبی به جای پا", say: "دست، پا، دست، پا. همین الگو را با رنگ بساز: قرمز به جای دست، آبی به جای پا.",
        seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], blanks: [2, 3, 4, 5], options: ["🔴", "🔵"] },
      { type: "pattern", prompt: "همان الگوی دست، دست، پا، این بار با شکل‌ها", say: "دست، دست، پا. همین الگو با شکل‌ها: مثلث، مثلث، دایره.",
        seq: ["🔺", "🔺", "⚪", "🔺", "🔺", "⚪", "🔺", "🔺", "⚪"], blanks: [5, 6, 7, 8], options: ["🔺", "⚪"] },
      { type: "pattern", prompt: "دست بالا، دست بزن، پا بکوب…", say: "دست بالا، دست بزن، پا بکوب. دست بالا، دست بزن، پا بکوب. با من انجام بده. بعدی کدام است؟",
        seq: ["🙌", "👏", "🦶", "🙌", "👏", "🦶", "🙌", "👏"], blanks: [7], options: ["🙌", "👏", "🦶"] },
      { type: "doit", pic: "👏🦶", text: "با بدنت الگو بساز:",
        list: ["پدر یا مادرت یک الگو بسازند، مثل «دست، دست، پا». تو ادامه‌اش بده.", "حالا تو یک الگو بساز و آن‌ها ادامه بدهند.",
          "همان الگو را با قاشق و چنگال روی میز بچین."] }
    ]
  },
  {
    id: "math-seed-27", subject: "math", level: "seed", emoji: "🧶", title: "الگوی خودت را بساز",
    steps: [
      { type: "choose", prompt: "در کدام ردیف یک اشتباه هست؟", say: "این ردیف‌ها الگو دارند. ولی یکی از آن‌ها یک اشتباه دارد. کدام؟", stack: true, ltr: true,
        options: [{ label: "🔴🔵🔴🔵🔴🔵", value: "درست ۱" }, { label: "🔴🔵🔵🔵🔴🔵", value: "اشتباه" }, { label: "🟡🟢🟡🟢🟡🟢", value: "درست ۲" }], answer: "اشتباه" },
      { type: "pattern", prompt: "یک جای این گلیم اشتباه بافته شده بود. نخ را بیرون کشیدیم. با رنگ درست پرش کن.", say: "یک جای این گلیم اشتباه بافته شده بود. با رنگ درست پرش کن.",
        seq: ["🟥", "🟨", "🟥", "🟨", "🟥", "🟨", "🟥", "🟨"], blanks: [5], options: ["🟥", "🟨", "🟦"] },
      { type: "choose", prompt: "در کدام ردیف یک اشتباه هست؟", say: "یکی از این ردیف‌ها یک اشتباه دارد. کدام؟", stack: true, ltr: true,
        options: [{ label: "🌸🌸🍃🌸🌸🍃🌸🌸🍃", value: "درست" }, { label: "🌸🌸🍃🌸🍃🍃🌸🌸🍃", value: "اشتباه" }], answer: "اشتباه" },
      { type: "pattern", prompt: "کاشی‌های حوض را تمام کن", say: "این کاشی‌ها الگو دارند: آبی، سفید، آبی، سفید. بقیه را تو بگذار.",
        seq: ["🟦", "⬜", "🟦", "⬜", "🟦", "⬜", "🟦", "⬜"], blanks: [4, 5, 6, 7], options: ["🟦", "⬜", "🟩"] },
      { type: "pattern", prompt: "فرش را ببین: قرمز، سبز، زرد… ادامه‌اش بده", say: "قرمز، سبز، زرد. قرمز، سبز، زرد. بقیه فرش را تو بباف.",
        seq: ["🟥", "🟩", "🟨", "🟥", "🟩", "🟨", "🟥", "🟩", "🟨"], blanks: [5, 6, 7, 8], options: ["🟥", "🟩", "🟨"] },
      { type: "pattern", prompt: "یک گردنبند با مهره‌ها: زرد، قرمز، قرمز…", say: "مهره زرد، مهره قرمز، مهره قرمز. ادامه بده.",
        seq: ["🟡", "🔴", "🔴", "🟡", "🔴", "🔴", "🟡", "🔴", "🔴"], blanks: [4, 5, 6, 7, 8], options: ["🟡", "🔴"] },
      { type: "doit", pic: "📿🥄", text: "الگوی خودت را بساز:",
        list: ["با چیزهای خانه یک الگو بچین: قاشق، چنگال، قاشق، چنگال… یا دکمه‌های رنگی، یا لوبیا و نخود.", "الگویت را به پدر یا مادرت نشان بده. آن‌ها ادامه‌اش بدهند.",
          "در فرش، کاشی‌ها یا پرده‌های خانه الگو پیدا کن."] }
    ]
  },
  {
    id: "math-seed-9", subject: "math", level: "seed", emoji: "🔢", title: "عددها را بشناسیم",
    steps: [
      /* Concrete first: the things come onto the table one at a time and the number counts up with them (a running
         total), so the numeral is the last number said. Then they leave and the next number starts from one. */
      (function () {
        var things = ["🍎", "🍐", "🍊", "🍓", "🥚"];
        var captions = ["یک سیب. این عدد یک است.", "دو گلابی. این عدد دو است.", "سه پرتقال. این عدد سه است.",
          "چهار توت‌فرنگی. این عدد چهار است.", "پنج تخم‌مرغ. این عدد پنج است."];
        var parts = { table: { art: "counter-table", at: [80, 90], s: 1.6 },
          num: { art: "count:big", at: [80, 42], s: 1.7, o: 0 } };
        var scenes = things.map(function (t, k) {
          var n = k + 1, tracks = [{ id: "num", to: { o: 0 }, dur: 200 }];
          // the last number's things slide away
          for (var j = 0; j < k; j++) tracks.push({ id: "f" + k + j, to: { x: "-120", o: 0 }, dur: 700, ease: "in" });
          for (var i = 0; i < n; i++) {
            var id = "f" + n + i, at = 800 + i * 900, x = 80 + (i - (n - 1) / 2) * 22;
            parts[id] = { art: t, at: [178, 40], s: 0.9, o: 0 };
            tracks.push({ id: id, to: { o: 1 }, at: at, dur: 100 }, hop(id, [178, 40], [x, 61], at, 700, 6), tally("num", i + 1, at + 700));
          }
          tracks.push({ id: "num", to: { o: 1 }, at: 1500, dur: 200 }, pop("num", 900 + n * 900, 0.3));
          return { caption: captions[k], do: tracks };
        });
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts, scenes: scenes };
      })(),
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 1, say: "یک" }, { dots: 1 }], [{ label: 2, say: "دو" }, { dots: 2 }], [{ label: 3, say: "سه" }, { dots: 3 }]] },
      { type: "choose", show: "۳", prompt: "این عدد را ببین. کدام دسته همین‌قدر است؟", say: "این عدد را ببین. کدام دسته همین‌قدر است؟", pic: true,
        options: [{ label: "🐟🐟", value: 2 }, { label: "🐟🐟🐟", value: 3 }, { label: "🐟🐟🐟🐟", value: 4 }], answer: 3 },
      { type: "pairs", prompt: "هر عدد را با دسته‌اش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. بشمار و هر عدد را با دسته‌اش جفت کن.",
        pairs: [[{ label: 2, say: "دو" }, "🍎🍎"], [{ label: 4, say: "چهار" }, "🍓🍓🍓🍓"], [{ label: 1, say: "یک" }, "🍐"], [{ label: 5, say: "پنج" }, "🥚🥚🥚🥚🥚"]] },
      { type: "choose", show: "۵", prompt: "این عدد را ببین. کدام دسته همین‌قدر است؟", say: "این عدد را ببین. کدام دسته همین‌قدر است؟", pic: true,
        options: [{ label: "🎈🎈🎈🎈🎈", value: 5 }, { label: "🎈🎈🎈", value: 3 }, { label: "🎈🎈🎈🎈", value: 4 }], answer: 5 },
      { type: "feed", animal: "🐦", food: "🌾", n: 4, prompt: "عدد را ببین. همان‌قدر دانه به گنجشک بده." },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 3, say: "سه" }, { dots: 3 }], [{ label: 5, say: "پنج" }, { dots: 5 }], [{ label: 4, say: "چهار" }, { dots: 4 }], [{ label: 2, say: "دو" }, { dots: 2 }]] },
      { type: "order", prompt: "عددها را از یک تا پنج بچین", say: "عددها را از یک تا پنج بچین: یک، دو، سه، چهار، پنج.", ltr: true,
        items: [{ label: 1, say: "یک" }, { label: 2, say: "دو" }, { label: 3, say: "سه" }, { label: 4, say: "چهار" }, { label: 5, say: "پنج" }] }
    ]
  },
  {
    id: "math-seed-10", subject: "math", level: "seed", emoji: "🎲", title: "بازی شمردن",
    steps: [
      { type: "feed", animal: "🐔", food: "🌽", n: 3, prompt: "مرغ گرسنه است. سه تا ذرت به او بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 2, say: "دو" }, { dots: 2 }], [{ label: 4, say: "چهار" }, { dots: 4 }], [{ label: 1, say: "یک" }, { dots: 1 }]] },
      { type: "order", prompt: "از کم به زیاد بچین", ltr: true, items: ["🍓", "🍓🍓", "🍓🍓🍓", "🍓🍓🍓🍓", "🍓🍓🍓🍓🍓"] },
      { type: "feed", animal: "🐐", food: "🌿", n: 5, prompt: "بزغاله گرسنه است. پنج تا علف به او بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با دسته‌اش جفت کن.",
        pairs: [[{ label: 3, say: "سه" }, "🐟🐟🐟"], [{ label: 5, say: "پنج" }, "🎈🎈🎈🎈🎈"], [{ label: 1, say: "یک" }, "⭐"], [{ label: 4, say: "چهار" }, "🍎🍎🍎🍎"]] },
      { type: "feed", animal: "🐈", food: "🐟", n: 4, prompt: "عدد را ببین. همان‌قدر ماهی به گربه بده." },
      { type: "order", prompt: "از پنج تا یک برعکس بشمار و بچین", say: "از پنج تا یک برعکس بشمار: پنج، چهار، سه، دو، یک.", ltr: true,
        items: [{ label: 5, say: "پنج" }, { label: 4, say: "چهار" }, { label: 3, say: "سه" }, { label: 2, say: "دو" }, { label: 1, say: "یک" }] }
    ]
  },
  {
    id: "math-seed-28", subject: "math", level: "seed", emoji: "🥚", title: "عددهای ۶ تا ۱۰",
    steps: [
      /* Five and some more: eggs fill an egg tray, a row of five and then the row under it, and the number counts up
         with them (a running total). */
      (function () {
        var parts = { tray: { art: "egg-tray", at: [80, 86], s: 2 }, num: { art: "count:big", at: [80, 32], s: 1.7, o: 0 } };
        var at = function (i) { return [32 + (i % 5) * 24, i < 5 ? 57 : 77]; };
        for (var i = 0; i < 10; i++) parts["e" + i] = { art: "🥚", at: [178, 40], s: 0.7, o: 0 };
        function come(i, t) {
          return [{ id: "e" + i, to: { o: 1 }, at: t, dur: 100 }, hop("e" + i, [178, 40], at(i), t, 800, 10), tally("num", i + 1, t + 800)];
        }
        var first = [{ id: "num", to: { o: 1 }, at: 1300, dur: 200 }];
        for (var k = 0; k < 6; k++) first.push(come(k, 500 + k * 800));
        first.push(pop("num", 500 + 6 * 800 + 300, 0.3));
        var more = ["یکی دیگر: هفت. پنج تا و دو تا. این عدد هفت است.", "یکی دیگر: هشت. پنج تا و سه تا. این عدد هشت است.",
          "یکی دیگر: نه. پنج تا و چهار تا. این عدد نه است.", "یکی دیگر: ده. دو ردیف پنج‌تایی، پر! این عدد ده است."];
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts,
          scenes: [{ caption: "تخم‌مرغ‌ها را در شانه می‌گذاریم. پنج تا در ردیف بالا، و یکی پایین: شش. این عدد شش است.", do: first }]
            .concat(more.map(function (c, j) { return { caption: c, do: [come(6 + j, 400), pop("num", 1400, 0.3)] }; })) };
      })(),
      { type: "count", layout: "rows", thing: "🍓", n: 7, options: [6, 7, 8], prompt: "توت‌فرنگی‌ها در دو ردیف‌اند. بشمار.", ask: "چند توت‌فرنگی هست؟" },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 6, say: "شش" }, { dots: 6 }], [{ label: 8, say: "هشت" }, { dots: 8 }], [{ label: 7, say: "هفت" }, { dots: 7 }]] },
      { type: "count", flash: true, show: "frame", n: 9, options: [8, 9, 10],
        prompt: "یک ردیف پنج‌تایی و چندتا دیگر. زود نگاه کن!", ask: "روی هم چندتا؟" },
      { type: "choose", show: "۹", prompt: "این عدد نه است. نه یعنی پنج تا و چندتا؟", say: "این عدد نه است. نه یعنی پنج تا و چندتا؟",
        options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "pairs", prompt: "هر عدد را با انگشت‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با دست‌هایی جفت کن که همان‌قدر انگشت دارند.",
        pairs: [[{ label: 10, say: "ده" }, { fingers: 10 }], [{ label: 6, say: "شش" }, { fingers: 6 }], [{ label: 9, say: "نه" }, { fingers: 9 }]] },
      { type: "choose", show: "۱۰", prompt: "این عدد ده است. کدام ده تاست؟", say: "این عدد ده است. کدام دسته ده تاست؟", pic: true, stack: true,
        options: [{ label: "🐟🐟🐟🐟🐟 🐟🐟🐟", value: 8 }, { label: "🐟🐟🐟🐟🐟 🐟🐟🐟🐟🐟", value: 10 }, { label: "🐟🐟🐟🐟🐟 🐟🐟🐟🐟", value: 9 }], answer: 10 }
    ]
  },
  {
    id: "math-seed-29", subject: "math", level: "seed", emoji: "0️⃣", title: "صفر یعنی هیچ",
    steps: [
      /* Five sparrows on a wire fly off one by one; the number counts down to zero. */
      (function () {
        var X = [36, 56, 76, 96, 116];
        var parts = { sky: { art: "sky-day" }, ground: { art: "ground" }, wire: { art: "wire", at: [20, 34] }, num: { art: "count:big", at: [80, 76], s: 1.8 } };
        X.forEach(function (x, i) { parts["b" + i] = { art: "sparrow", at: [x, 34], s: 1.3, flip: i % 2 === 1 }; });
        var left = ["یک گنجشک پرید و رفت. چهار تا ماند.", "یکی دیگر پرید. سه تا ماند.", "یکی دیگر پرید. دو تا ماند.", "یکی دیگر پرید. یکی ماند."];
        var scenes = [{ caption: "پنج گنجشک روی سیم نشسته‌اند.", do: [tally("num", 5, 0), X.map(function (x, i) { return jump("b" + i, 400 + i * 300, 2); })] }];
        left.forEach(function (c, k) {
          var i = 4 - k;
          scenes.push({ caption: c, do: [{ id: "b" + i, to: { flip: 1 }, dur: 1 }, fly("b" + i, [X[i], 34], [190, -10 - k * 4], 300, 1800, 10), tally("num", 4 - k, 2100)] });
        });
        scenes.push({ caption: "آخری هم پرید. هیچ گنجشکی نماند: صفر گنجشک.", do: [fly("b0", [X[0], 34], [190, -26], 300, 2200, 10), tally("num", 0, 2500)] });
        scenes.push({ caption: "این عدد صفر است. صفر یعنی هیچ.", do: [pop("num", 300, 0.4)] });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts, scenes: scenes,
          question: "حالا چند گنجشک روی سیم است؟", options: [0, 1, 5], answer: 0 };
      })(),
      { type: "choose", show: "۰", prompt: "این عدد صفر است. کدام بشقاب صفر سیب دارد؟", say: "این عدد صفر است. کدام بشقاب صفر سیب دارد؟", pic: true,
        options: [{ label: "🍎", value: 1 }, { label: "🍽️", value: 0 }, { label: "🍎🍎", value: 2 }], answer: 0 },
      { type: "choose", prompt: "یک ماهی در تنگ بود. پرید و رفت در حوض! حالا چند ماهی در تنگ است؟",
        say: "یک ماهی در تنگ بود. پرید و رفت در حوض! حالا چند ماهی در تنگ است؟", options: ["۰", "۱", "۲"], answer: "۰" },
      { type: "feed", animal: "🐈", food: "🐟", n: 0, max: 4, prompt: "گربه سیر است. صفر ماهی به او بده: هیچ ماهی نده. فقط «بفرما» را بزن." },
      { type: "feed", animal: "🐿️", food: "🌰", n: 3, prompt: "سنجاب گرسنه است. سه تا فندق به او بده." },
      { type: "choose", prompt: "کدام عدد یعنی هیچ؟", say: "کدام عدد یعنی هیچ؟", options: ["۶", "۰", "۱"], answer: "۰" }
    ]
  },
  {
    id: "math-seed-30", subject: "math", level: "seed", emoji: "🐸", title: "یکی بیشتر، یکی کمتر",
    steps: [
      { type: "numline", a: 4, b: 1, options: [3, 5, 6], prompt: "قورباغه روی ۴ است. یک خانه جلو می‌پرد. به کجا می‌رسد؟",
        say: "قورباغه روی چهار است. یک خانه جلو می‌پرد. دکمه را بزن و ببین به کجا می‌رسد." },
      { type: "choose", show: "🍎🍎🍎", prompt: "سه سیب داریم. یکی دیگر هم می‌آید. چندتا می‌شود؟", say: "سه سیب داریم. یکی دیگر هم می‌آید. چندتا می‌شود؟",
        options: ["۲", "۳", "۴"], answer: "۴" },
      { type: "numline", a: 7, b: -1, options: [6, 7, 8], prompt: "قورباغه روی ۷ است. یک خانه عقب می‌پرد. به کجا می‌رسد؟",
        say: "قورباغه روی هفت است. یک خانه عقب می‌پرد. دکمه را بزن و ببین به کجا می‌رسد." },
      { type: "choose", prompt: "شش گنجشک روی سیم بودند. یکی پرید و رفت. چندتا ماند؟", say: "شش گنجشک روی سیم بودند. یکی پرید و رفت. چندتا ماند؟",
        options: ["۵", "۶", "۷"], answer: "۵" },
      { type: "feed", animal: "🐰", food: "🥕", n: 6, max: 9, prompt: "خرگوش دیروز پنج هویج خورد. امروز یکی بیشتر می‌خواهد. به او بده." },
      { type: "numline", a: 9, b: 1, options: [8, 10, 11], prompt: "یکی بیشتر از ۹ چند است؟ قورباغه روی ۹ است و یکی جلو می‌پرد.",
        say: "یکی بیشتر از نه چند است؟ قورباغه روی نه است و یکی جلو می‌پرد." },
      { type: "choose", prompt: "یکی کمتر از ۸ چند است؟", say: "یکی کمتر از هشت چند است؟", options: ["۷", "۹", "۶"], answer: "۷" },
      { type: "feed", animal: "🐔", food: "🌽", n: 3, max: 8, prompt: "مرغ چهار ذرت می‌خواست. حالا یکی کمتر می‌خواهد. به او بده." }
    ]
  },
  {
    id: "math-seed-31", subject: "math", level: "seed", emoji: "🎲", title: "بازی مارپله",
    steps: [
      /* The linear number board game (Siegler & Ramani 2008, 2009): playing it, moving one square at a time and
         saying each number, helps children see that numbers grow along a line. 1–10, then 1–20. */
      { type: "track", to: 10, die: [1, 2], pawn: "🐞", goal: "🌸",
        prompt: "کفشدوزک می‌خواهد به گل برسد. تاس بینداز، بعد روی خانه‌ها یکی‌یکی بزن و عددشان را بلند بگو.",
        say: "کفشدوزک می‌خواهد به گل برسد. تاس بینداز. بعد روی خانه‌ها یکی‌یکی بزن و عددشان را بلند بگو." },
      { type: "choose", prompt: "کفشدوزک روی ۶ است. تاس ۲ آمد. به کدام خانه می‌رسد؟", say: "کفشدوزک روی شش است. تاس دو آمد. به کدام خانه می‌رسد؟",
        options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "track", to: 10, die: [1, 2, 3], pawn: "🐢", goal: "🥬",
        prompt: "لاک‌پشت دنبال کاهو است. تاس بینداز و جلو برو. عددها را بلند بگو." },
      { type: "choose", prompt: "لاک‌پشت روی ۳ است. تاس ۳ آمد. به کدام خانه می‌رسد؟", say: "لاک‌پشت روی سه است. تاس سه آمد. به کدام خانه می‌رسد؟",
        options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "track", to: 20, start: 10, die: [1, 2, 3], pawn: "🐇", goal: "🥕",
        prompt: "این بار صفحه تا ۲۰ است. خرگوش از ۱۰ شروع می‌کند. تاس بینداز و جلو برو.",
        say: "این بار صفحه تا بیست است. خرگوش از ده شروع می‌کند. تاس بینداز و جلو برو. عددها را بلند بگو." },
      { type: "doit", pic: "🎲📝", text: "یک صفحه بازی بسازید:",
        list: ["روی یک کاغذ دراز، ۱۰ خانه پشت سر هم بکشید و در آن‌ها عدد ۱ تا ۱۰ را بنویسید.",
          "با یک تاس (یا دو تکه کاغذ که رویش ۱ و ۲ نوشته‌اید) نوبتی بازی کنید.", "هر بار که مهره جلو می‌رود، عدد هر خانه را بلند بگویید."] }
    ]
  },
  {
    id: "math-seed-32", subject: "math", level: "seed", emoji: "🔢", title: "عددها به ترتیب",
    steps: [
      { type: "order", prompt: "عددها را از ۱ تا ۵ بچین", say: "عددها را از یک تا پنج بچین.", ltr: true,
        items: [{ label: 1, say: "یک" }, { label: 2, say: "دو" }, { label: 3, say: "سه" }, { label: 4, say: "چهار" }, { label: 5, say: "پنج" }] },
      { type: "order", prompt: "عددها را از ۶ تا ۱۰ بچین", say: "عددها را از شش تا ده بچین.", ltr: true,
        items: [{ label: 6, say: "شش" }, { label: 7, say: "هفت" }, { label: 8, say: "هشت" }, { label: 9, say: "نه" }, { label: 10, say: "ده" }] },
      { type: "choose", show: "۴  ؟  ۶", prompt: "کدام عدد جا افتاده است؟", say: "چهار، چی، شش. کدام عدد جا افتاده است؟", options: ["۳", "۵", "۷"], answer: "۵" },
      { type: "choose", show: "🏠۵  🏠؟", prompt: "خانه سارا شماره ۵ است. شماره خانه بعدی چند است؟", say: "خانه سارا شماره پنج است. شماره خانه بعدی چند است؟",
        options: ["۴", "۶", "۷"], answer: "۶" },
      { type: "choose", show: "🏠؟  🏠۹", prompt: "خانه کاوه شماره ۹ است. شماره خانه قبلی چند است؟", say: "خانه کاوه شماره نه است. شماره خانه قبلی چند است؟",
        options: ["۸", "۱۰", "۷"], answer: "۸" },
      { type: "numline", a: 5, b: 3, options: [7, 8, 9], prompt: "قورباغه روی ۵ است. سه خانه جلو می‌پرد. بشمار: شش، هفت، … به کجا می‌رسد؟",
        say: "قورباغه روی پنج است. سه خانه جلو می‌پرد. با من بشمار. به کجا می‌رسد؟" },
      { type: "choose", show: "۷  ۸  ؟  ۱۰", prompt: "کدام عدد جا افتاده است؟", say: "هفت، هشت، چی، ده. کدام عدد جا افتاده است؟", options: ["۹", "۶", "۱۱"], answer: "۹" },
      { type: "order", prompt: "از ۱۰ برعکس بشمار و بچین", say: "از ده برعکس بشمار: ده، نه، هشت، هفت، شش.", ltr: true,
        items: [{ label: 10, say: "ده" }, { label: 9, say: "نه" }, { label: 8, say: "هشت" }, { label: 7, say: "هفت" }, { label: 6, say: "شش" }] }
    ]
  },
  {
    id: "math-seed-33", subject: "math", level: "seed", emoji: "🫘", title: "پنج تا در دو دست",
    steps: [
      /* Parts of five: five two-colour counters are shaken out of a cup, then thrown up again; each time some land
         red and some yellow, and there are still five. */
      (function () {
        var X = [40, 54, 68, 82, 96], Y = 51;
        var parts = { table: { art: "counter-table", at: [80, 96], s: 2.2 }, cup: { art: "cup", at: [134, 56], s: 1.4 } };
        X.forEach(function (x, i) {
          parts["r" + i] = { art: "counter-r", at: [128, 40], s: 1.5, o: 0 };
          parts["y" + i] = { art: "counter-y", at: [128, 40], s: 1.5, o: 0 };
        });
        // Show these colours (r or y for each counter): the others turn over.
        function land(cols, at) {
          var out = [];
          cols.split("").forEach(function (c, i) {
            var on = c === "r" ? "r" : "y", off = c === "r" ? "y" : "r";
            out.push({ id: on + i, to: { o: 1, sx: 1 }, at: at, dur: 300 }, { id: off + i, to: { o: 0 }, at: at, dur: 200 });
          });
          return out;
        }
        function toss(at) {
          var out = [];
          X.forEach(function (x, i) { out.push(hop("r" + i, [x, Y], [x, Y], at + i * 80, 700, 14), hop("y" + i, [x, Y], [x, Y], at + i * 80, 700, 14)); });
          return out;
        }
        var pour = [{ id: "cup", to: { r: -8 }, dur: 250, yoyo: true, times: 6 }, { id: "cup", to: { r: -110 }, at: 1600, dur: 600 }];
        X.forEach(function (x, i) {
          var c = i < 3 ? "r" : "y", t = 2200 + i * 250;
          pour.push({ id: c + i, to: { o: 1 }, at: t, dur: 100 }, hop(c + i, [128, 40], [x, Y], t, 800, 8));
          pour.push({ id: (c === "r" ? "y" : "r") + i, to: { x: x, y: Y }, at: t + 800, dur: 1 });
        });
        pour.push({ id: "cup", to: { r: 0 }, at: 3800, dur: 600 });
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts,
          scenes: [
            { caption: "در این لیوان پنج مهره هست. هر مهره یک طرفش قرمز است و یک طرفش زرد.", do: [{ id: "cup", to: { r: 8 }, at: 300, dur: 300, yoyo: true, times: 4 }] },
            { caption: "تکانش دادیم و مهره‌ها را ریختیم: سه قرمز و دو زرد. سه و دو، می‌شود پنج.", do: pour },
            { caption: "مهره‌ها را بالا انداختیم: چهار قرمز و یک زرد. چهار و یک، باز هم پنج.", do: [toss(300), land("rrrry", 900)] },
            { caption: "یک بار دیگر: یک قرمز و چهار زرد. یک و چهار، باز هم پنج!", do: [toss(300), land("ryyyy", 900)] }
          ],
          question: "سه مهره قرمز و دو مهره زرد. روی هم چندتا؟", options: [4, 5, 6], answer: 5 };
      })(),
      { type: "make", n: 5 },
      { type: "choose", show: "🔴🔴🔴 ؟", prompt: "پنج مهره داریم. سه تا قرمز است. بقیه زرد است. چندتا زرد است؟",
        say: "پنج مهره داریم. سه تا قرمز است. بقیه زرد است. چندتا زرد است؟", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", prompt: "چهار لوبیا را در دو دستم گذاشتم. در یک دست یکی است. در دست دیگر چندتا؟",
        say: "چهار لوبیا را در دو دستم گذاشتم. در یک دست یکی است. در دست دیگر چندتا است؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", prompt: "سه سیب در دو بشقاب است. در یک بشقاب دو سیب است. در بشقاب دیگر چندتا؟",
        say: "سه سیب در دو بشقاب است. در یک بشقاب دو سیب است. در بشقاب دیگر چندتا است؟", options: ["۱", "۲", "۳"], answer: "۱" },
      { type: "choose", prompt: "کدام دو دسته روی هم پنج تا می‌شوند؟", say: "کدام دو دسته روی هم پنج تا می‌شوند؟", stack: true, ltr: true,
        options: [{ label: "🔴🔴 و 🟡🟡", value: 4 }, { label: "🔴🔴🔴🔴 و 🟡", value: 5 }, { label: "🔴🔴🔴🔴 و 🟡🟡", value: 6 }], answer: 5 },
      { type: "doit", pic: "🫘✊", text: "بازی «در کدام دست؟»:",
        list: ["پدر یا مادرت پنج لوبیا را بین دو دستشان تقسیم کنند و یک دست را باز کنند.", "تو بگو در دست بسته چند لوبیا هست. بعد دست را باز کنید و ببینید.",
          "همه راه‌ها را امتحان کنید: پنج و صفر، چهار و یک، سه و دو…"] }
    ]
  },
  {
    id: "math-seed-34", subject: "math", level: "seed", emoji: "🥣", title: "چندتا پنهان شد؟",
    steps: [
      /* The hidden part: five apples, a bowl comes down over two of them; three still show. */
      (function () {
        var X = [32, 50, 68, 104, 122];
        var parts = { bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 92], s: 2.1 } };
        X.forEach(function (x, i) { parts["a" + i] = { art: "🍎", at: [x, 54], s: 0.8 }; });
        parts.bowl = { art: "bowl-cover", at: [113, -4], s: 1.3 };
        return { type: "scene", prompt: "ببین و جواب بده", parts: parts,
          scenes: [
            { caption: "روی میز پنج سیب هست. بشماریم: یک، دو، سه، چهار، پنج.", do: X.map(function (x, i) { return jump("a" + i, 400 + i * 800, 4); }) },
            { caption: "یک کاسه آمد و روی چند سیب را پوشاند.", do: [{ id: "bowl", to: { y: 55 }, at: 400, dur: 1800, ease: "inout" }] },
            { caption: "حالا سه سیب پیداست: یک، دو، سه. بقیه زیر کاسه پنهان‌اند.", do: [jump("a0", 400, 4), jump("a1", 1200, 4), jump("a2", 2000, 4)] }
          ],
          question: "چند سیب زیر کاسه پنهان است؟", options: [1, 2, 3], answer: 2 };
      })(),
      { type: "choose", show: "🍎🍎🍎🍎 🥣", prompt: "شش سیب داشتیم. چهار تا پیداست. چندتا زیر کاسه است؟",
        say: "شش سیب داشتیم. چهار تا پیداست. چندتا زیر کاسه است؟", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", show: "🍎 🥣", prompt: "پنج سیب داشتیم. فقط یکی پیداست. چندتا زیر کاسه است؟",
        say: "پنج سیب داشتیم. فقط یکی پیداست. چندتا زیر کاسه است؟", options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "choose", show: "🌰🌰🌰🌰🌰 🥣", prompt: "هفت فندق داشتیم. پنج تا پیداست. چندتا زیر کاسه است؟",
        say: "هفت فندق داشتیم. پنج تا پیداست. چندتا زیر کاسه است؟", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", show: "🥣", prompt: "چهار توت‌فرنگی داشتیم. هیچ‌کدام پیدا نیست! چندتا زیر کاسه است؟",
        say: "چهار توت‌فرنگی داشتیم. هیچ‌کدام پیدا نیست! چندتا زیر کاسه است؟", options: ["۰", "۳", "۴"], answer: "۴" },
      { type: "doit", pic: "🥣🫘", text: "بازی «چندتا پنهان شد؟»:",
        list: ["پنج تا نخود یا دکمه را بشمارید.", "تو چشم‌هایت را ببند. پدر یا مادرت چندتا را زیر یک کاسه پنهان کنند.",
          "چشم‌هایت را باز کن و آن‌هایی را که پیداست بشمار. چندتا زیر کاسه است؟ کاسه را بردار و ببین.", "بعد با شش و هفت تا بازی کنید."] }
    ]
  },
  {
    id: "math-seed-35", subject: "math", level: "seed", emoji: "🐦", title: "قصه آمدن",
    steps: [
      /* Adding as joining: more really arrive in each story (birds fly in, guests walk in, a new egg is laid). */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [80, 88] },
          b1: { art: "sparrow", at: [62, 31], s: 1.3 }, b2: { art: "sparrow", at: [96, 27], s: 1.3, flip: true },
          b3: { art: "sparrow", at: [-20, 10], s: 1.3 }
        },
        scenes: [
          { caption: "دو گنجشک روی درخت نشسته بودند.", do: [jump("b1", 400, 2), jump("b2", 1000, 2)] },
          { caption: "یک گنجشک دیگر پرواز کرد و آمد.", do: [fly("b3", [-20, 10], [78, 21], 300, 2400, 6)] }
        ],
        question: "حالا چند گنجشک روی درخت است؟", options: [2, 3, 4], answer: 3 },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          room: { art: "day-room" },
          g1: { art: "👵", at: [26, 86], s: 1.05 }, g2: { art: "👨", at: [48, 86], s: 1.05 }, g3: { art: "👧", at: [68, 86], s: 1.05 },
          g4: { art: "👩", at: [190, 86], s: 1.05, flip: true }, g5: { art: "👦", at: [210, 86], s: 1.05, flip: true }
        },
        scenes: [
          { caption: "سه مهمان در خانه بودند.", do: [jump("g1", 400, 2), jump("g2", 1000, 2), jump("g3", 1600, 2)] },
          { caption: "دو مهمان دیگر هم آمدند.", do: [{ id: "g4", walk: [92, 86], at: 300, dur: 2800 }, { id: "g5", walk: [116, 86], at: 600, dur: 3000 }] }
        ],
        question: "حالا چند مهمان در خانه است؟", options: [4, 5, 6], answer: 5 },
      { type: "scene", prompt: "به قصه گوش کن", bg: "#f3e3c3",
        parts: {
          ground: { art: "ground" }, nest: { art: "nest", at: [72, 80], s: 2 },
          e1: { art: "🥚", at: [62, 76], s: 0.6 }, e2: { art: "🥚", at: [74, 76], s: 0.6 }, e3: { art: "🥚", at: [86, 76], s: 0.6, o: 0 },
          hen: { art: "🐔", at: [120, 84], s: 1.9 }
        },
        scenes: [
          { caption: "در لانه مرغ دو تخم‌مرغ بود.", do: [jump("e1", 400, 2), jump("e2", 1000, 2)] },
          { caption: "روز بعد، مرغ یک تخم دیگر گذاشت.", do: [
            { id: "hen", to: { x: 80, y: 78 }, at: 300, dur: 1400 }, { id: "hen", to: { y: 74 }, at: 1800, dur: 500, yoyo: true, times: 2 },
            { id: "e3", to: { o: 1 }, at: 2400, dur: 300 }, { id: "hen", to: { x: 124, y: 84 }, at: 3000, dur: 1400 }
          ] }
        ],
        question: "حالا چند تخم‌مرغ در لانه است؟", options: [2, 3, 4], answer: 3 },
      { type: "choose", prompt: "دو انگشت بالا ببر. حالا دو تای دیگر هم بالا ببر. چند انگشت بالاست؟",
        say: "دو انگشت بالا ببر. حالا دو تای دیگر هم بالا ببر. چند انگشت بالاست؟", options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "feed", animal: "🧒", food: "🍪", n: 5, max: 8, prompt: "دو بچه آمدند، بعد سه بچه دیگر آمدند. برای هر بچه یک شیرینی بگذار." },
      { type: "choose", show: "⚽", prompt: "آرمان یک توپ داشت. بابا یکی دیگر برایش خرید. حالا چند توپ دارد؟",
        say: "آرمان یک توپ داشت. بابا یکی دیگر برایش خرید. حالا چند توپ دارد؟", options: ["۱", "۲", "۳"], answer: "۲" }
    ]
  },
  {
    id: "math-seed-36", subject: "math", level: "seed", emoji: "🐥", title: "قصه رفتن",
    steps: [
      /* Taking away: some really leave in each story (a chick runs after a butterfly, cars drive off, apples are
         eaten). */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "bg-garden" }, hen: { art: "🐔", at: [36, 86], s: 2 },
          c1: { art: "🐥", at: [64, 87], s: 1.05, flip: true }, c2: { art: "🐥", at: [82, 87], s: 1.05, flip: true },
          c3: { art: "🐥", at: [100, 87], s: 1.05, flip: true }, c4: { art: "🐥", at: [118, 87], s: 1.05, flip: true },
          fly: { art: "🦋", at: [190, 50], s: 0.8 }
        },
        scenes: [
          { caption: "چهار جوجه کنار مرغ بودند.", do: [jump("c1", 400, 3), jump("c2", 900, 3), jump("c3", 1400, 3), jump("c4", 1900, 3)] },
          { caption: "یک پروانه آمد. یک جوجه دنبالش رفت.", key: 2000, do: [
            { id: "fly", path: "M190 50Q150 30 128 62", dur: 1600 }, { id: "fly", path: "M128 62Q160 40 196 20", at: 1700, dur: 1800 },
            { id: "c4", to: { flip: 1 }, at: 1600, dur: 1 }, hops("c4", [118, 87], [180, 87], 6, 1800, 1800)
          ] }
        ],
        question: "حالا چند جوجه کنار مرغ است؟", options: [2, 3, 4], answer: 3 },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "bg-street" }, car1: { art: "🚗", at: [40, 86], s: 1.2 }, car2: { art: "🚙", at: [80, 86], s: 1.2 }, car3: { art: "🚕", at: [120, 86], s: 1.2 }
        },
        scenes: [
          { caption: "سه ماشین در خیابان ایستاده بودند.", do: [jump("car1", 400, 2), jump("car2", 1000, 2), jump("car3", 1600, 2)] },
          { caption: "دو ماشین رفتند.", key: 1900, do: [{ id: "car1", to: { x: -40 }, at: 300, dur: 2000, ease: "in" }, { id: "car2", to: { x: -40 }, at: 1400, dur: 2400, ease: "in" }] }
        ],
        question: "حالا چند ماشین مانده است؟", options: [1, 2, 3], answer: 1 },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [70, 92], s: 1.8 },
          a1: { art: "🍎", at: [34, 58], s: 0.75 }, a2: { art: "🍎", at: [52, 58], s: 0.75 }, a3: { art: "🍎", at: [70, 58], s: 0.75 },
          a4: { art: "🍎", at: [88, 58], s: 0.75 }, a5: { art: "🍎", at: [106, 58], s: 0.75 },
          girl: { art: "👧", at: [140, 90], s: 1.5, flip: true }
        },
        scenes: [
          { caption: "پنج سیب روی میز بود.", do: [1, 2, 3, 4, 5].map(function (k) { return jump("a" + k, 300 + k * 400, 3); }) },
          { caption: "نرگس دو سیب برداشت و خورد.", key: 1300, do: [
            { id: "girl.armF", to: { r: -80 }, at: 300, dur: 500 }, hop("a5", [106, 58], [130, 50], 600, 700, 6), { id: "a5", to: { o: 0, s: 0.3 }, at: 1500, dur: 600 },
            hop("a4", [88, 58], [130, 50], 2300, 900, 8), { id: "a4", to: { o: 0, s: 0.3 }, at: 3400, dur: 600 }, { id: "girl.armF", to: { r: 0 }, at: 4100, dur: 500 }
          ] }
        ],
        question: "چند سیب روی میز مانده است؟", options: [2, 3, 4], answer: 3 },
      { type: "choose", prompt: "پنج انگشت بالا ببر. حالا دو تا را پایین بیاور. چند انگشت بالا مانده است؟",
        say: "پنج انگشت بالا ببر. حالا دو تا را پایین بیاور. چند انگشت بالا مانده است؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", show: "🎈🎈🎈🎈", prompt: "چهار بادکنک داشتیم. یکی ترکید. چندتا ماند؟", say: "چهار بادکنک داشتیم. یکی ترکید. چندتا ماند؟",
        options: ["۲", "۳", "۴"], answer: "۳" }
    ]
  },
  {
    id: "math-seed-37", subject: "math", level: "seed", emoji: "🎈", title: "قصه‌های تا ده",
    steps: [
      /* Stories to ten: birds fly in to a wire, balloons fly away. */
      (function () {
        var parts = { sky: { art: "sky-day" }, ground: { art: "ground" }, wire: { art: "wire", at: [16, 34], sx: 1.07 } };
        var X = [26, 40, 54, 68, 82, 96, 110, 124, 138];
        X.forEach(function (x, i) { parts["b" + i] = i < 7 ? { art: "sparrow", at: [x, 34], s: 0.95, flip: i % 2 === 1 } : { art: "sparrow", at: [-20, 6 + i], s: 0.95 }; });
        return { type: "scene", prompt: "به قصه گوش کن", parts: parts,
          scenes: [
            { caption: "هفت گنجشک روی سیم نشسته بودند.", do: X.slice(0, 7).map(function (x, i) { return jump("b" + i, 300 + i * 250, 2); }) },
            { caption: "دو گنجشک دیگر هم آمدند.", do: [fly("b7", [-20, 13], [X[7], 34], 300, 2200, 8), fly("b8", [-20, 14], [X[8], 34], 1100, 2600, 8)] }
          ],
          question: "حالا چند گنجشک روی سیم است؟", options: [8, 9, 10], answer: 9 };
      })(),
      (function () {
        var parts = { bg: { art: "bg-garden" }, girl: { art: "👧", at: [80, 88], s: 1.2 } };
        var at = [[60, 42], [67, 36], [74, 32], [81, 30], [88, 32], [95, 36], [102, 42], [66, 48], [81, 45], [96, 48]];
        at.forEach(function (p, i) { parts["l" + i] = { art: "🎈", at: p, s: 0.7 }; });
        var away = [7, 8, 9];
        return { type: "scene", prompt: "به قصه گوش کن", parts: parts,
          scenes: [
            { caption: "مهتاب ده بادکنک داشت.", do: [{ id: "girl.armF", to: { r: -150 }, dur: 600 }].concat(at.map(function (p, i) { return { id: "l" + i, to: { r: 6 }, at: 200 + i * 120, dur: 600, yoyo: true, times: 2 }; })) },
            { caption: "باد آمد و سه بادکنک را برد.", do: away.map(function (i, k) { return { id: "l" + i, to: { x: 180 + k * 8, y: -20 - k * 6, r: 30 }, at: 400 + k * 600, dur: 2600, ease: "in" }; }) }
          ],
          question: "چند بادکنک برای مهتاب ماند؟", options: [6, 7, 8], answer: 7 };
      })(),
      { type: "choose", prompt: "شش انگشت بالا ببر. حالا دو تای دیگر هم بالا ببر. چند انگشت بالاست؟",
        say: "شش انگشت بالا ببر: یک دست کامل و یکی. حالا دو تای دیگر هم بالا ببر. چند انگشت بالاست؟", options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "choose", show: "🍪🍪🍪🍪🍪 🍪🍪🍪🍪🍪", prompt: "ده شیرینی در بشقاب بود. بچه‌ها چهار تا خوردند. چندتا ماند؟",
        say: "ده شیرینی در بشقاب بود. بچه‌ها چهار تا خوردند. چندتا ماند؟", options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "choose", prompt: "پنج ماهی در حوض بود. سه ماهی کوچک دیگر هم به دنیا آمدند. حالا چند ماهی در حوض است؟",
        say: "پنج ماهی در حوض بود. سه ماهی کوچک دیگر هم به دنیا آمدند. حالا چند ماهی در حوض است؟", options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "talk", scene: "🐔 🐥🐥🐥🐥 🐥🐥 🌾", caption: "یک قصه عددی بگو: چند جوجه بودند؟ چندتا آمدند یا رفتند؟",
        tips: ["با هم جوجه‌ها را بشمارید.", "از کودک بخواهید یک قصه بگوید: «… جوجه پیش مرغ بودند، … تا رفتند دنبال دانه.»",
          "بپرسید: «حالا چندتا ماند؟» و با انگشت یا نخود نشانش دهید.", "شما هم یک قصه بگویید و کودک جواب را پیدا کند."] }
    ]
  },
  {
    id: "math-seed-38", subject: "math", level: "seed", emoji: "🎯", title: "بازی قصه‌های عددی",
    steps: [
      { type: "feed", animal: "🐰", food: "🥕", n: 3, max: 7, prompt: "خرگوش پنج هویج می‌خواست. دو تا را خورده است. بقیه را به او بده." },
      { type: "pairs", prompt: "هر دسته را با دسته‌ای جفت کن که یکی بیشتر دارد", say: "هر دسته را با دسته‌ای جفت کن که یکی بیشتر دارد.",
        pairs: [[{ dots: 2 }, { dots: 3 }], [{ dots: 4 }, { dots: 5 }], [{ dots: 1 }, { dots: 2 }]] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "از کم به زیاد بچین.", ltr: true,
        items: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }, { dots: 5 }, { dots: 6 }] },
      { type: "feed", animal: "🐔", food: "🌽", n: 4, max: 8, prompt: "مرغ سه ذرت خورد. یکی دیگر هم می‌خواهد. همه ذرت‌هایی را که می‌خورد روی بشقاب بگذار." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با دسته‌ای جفت کن که یکی کمتر دارد.",
        prompt: "هر عدد را با دسته‌ای جفت کن که یکی کمتر دارد",
        pairs: [[{ label: 4, say: "چهار" }, { dots: 3 }], [{ label: 6, say: "شش" }, { dots: 5 }], [{ label: 2, say: "دو" }, { dots: 1 }]] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 2, max: 6, prompt: "سنجاب پنج فندق داشت. سه تا را زیر خاک قایم کرد. بقیه را به او بده." },
      { type: "order", prompt: "از ۵ برعکس بشمار و بچین", say: "از پنج برعکس بشمار: پنج، چهار، سه، دو، یک، صفر.", ltr: true,
        items: [{ label: 5, say: "پنج" }, { label: 4, say: "چهار" }, { label: 3, say: "سه" }, { label: 2, say: "دو" }, { label: 1, say: "یک" }, { label: 0, say: "صفر" }] }
    ]
  },
  {
    id: "math-seed-39", subject: "math", level: "seed", emoji: "🥇", title: "اول، دوم، سوم",
    steps: [
      /* Ordinal numbers: people really come to the bakery one after another and stand in the queue in that order. */
      (function () {
        var who = [["👵", "مادربزرگ اول از همه آمد. او اول صف است."], ["👦", "بعد آرش آمد. او دوم است."],
          ["👩", "بعد خانم رضایی آمد. او سوم است."], ["👨", "بعد آقای کریمی آمد. او چهارم است."], ["👧", "آخر از همه سارا آمد. او پنجم است، آخر صف."]];
        var parts = { bg: { art: "bg-street" }, bakery: { art: "w-bakery", at: [24, 75], s: 1.4 } };
        who.forEach(function (w, i) { parts["p" + i] = { art: w[0], at: [196 + i * 6, 76], s: 0.95, flip: true }; });
        var scenes = [{ caption: "صبح زود است. نانوایی باز شده.", do: [jump("bakery", 400, 2)] }];
        who.forEach(function (w, i) { scenes.push({ caption: w[1], do: [{ id: "p" + i, walk: [54 + i * 22, 76], dur: 3200 - i * 300 }] }); });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts, scenes: scenes,
          question: "چه کسی سوم است؟", pic: true,
          options: [{ label: "👵", value: "مادربزرگ" }, { label: "👩", value: "خانم رضایی" }, { label: "👧", value: "سارا" }], answer: "خانم رضایی" };
      })(),
      { type: "order", numbered: true, prompt: "مسابقه دو! به ترتیب رسیدن بچین: اول، دوم، سوم", say: "حیوان‌ها مسابقه دادند. اول خرگوش رسید، دوم سگ، سوم لاک‌پشت. به همین ترتیب بچین.",
        items: [{ pic: "🐇", say: "خرگوش" }, { pic: "🐕", say: "سگ" }, { pic: "🐢", say: "لاک‌پشت" }] },
      { type: "choose", prompt: "در صف نانوایی، تو چهارمی هستی. چند نفر جلوی تو هستند؟", say: "در صف نانوایی، تو چهارمی هستی. چند نفر جلوی تو هستند؟",
        options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "order", numbered: true, prompt: "حشره‌ها از لانه بیرون آمدند. به ترتیب بچین", say: "اول مورچه بیرون آمد، دوم کفشدوزک، سوم زنبور، چهارم پروانه، و پنجم کرم. به همین ترتیب بچین.",
        items: [{ pic: "🐜", say: "مورچه" }, { pic: "🐞", say: "کفشدوزک" }, { pic: "🐝", say: "زنبور" }, { pic: "🦋", say: "پروانه" }, { pic: "🐛", say: "کرم" }] },
      { type: "choose", show: "🚗🚌🚲🛵", prompt: "از راست بشمار. سومی کدام است؟", say: "از راست بشمار: اولی، دومی، سومی. سومی کدام است؟", pic: true,
        options: [{ label: "🚌", value: "اتوبوس" }, { label: "🚲", value: "دوچرخه" }, { label: "🛵", value: "موتور" }], answer: "دوچرخه" }
    ]
  },
  {
    id: "math-seed-40", subject: "math", level: "seed", emoji: "🌱", title: "اول، بعد، آخر",
    steps: [
      { type: "order", numbered: true, prompt: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ به ترتیب بچین", say: "دانه کاشتیم. به ترتیب بچین: اول چه شد، بعد چه شد، آخر چه شد؟",
        items: [{ pic: "🌰", say: "دانه را در خاک کاشتیم" }, { pic: "💧", say: "آبش دادیم" }, { pic: "🌱", say: "جوانه زد" }, { pic: "🌻", say: "گل داد" }] },
      { type: "order", numbered: true, prompt: "چای درست کردن: به ترتیب بچین", say: "مادربزرگ چای درست کرد. به ترتیب بچین.",
        items: [{ pic: "🚰", say: "کتری را آب کرد" }, { pic: "🔥", say: "آب جوش آمد" }, { pic: "🫖", say: "چای را دم کرد" }, { pic: "🍵", say: "چای را در استکان ریخت" }] },
      { type: "order", numbered: true, prompt: "لباس پوشیدن: اول کدام؟ آخر کدام؟", say: "می‌خواهی بیرون بروی. اول چه کار می‌کنی؟ بعد؟ آخر؟",
        items: [{ pic: "🧦", say: "جوراب می‌پوشم" }, { pic: "👟", say: "کفش می‌پوشم" }, { pic: "🚪", say: "از در بیرون می‌روم" }] },
      { type: "order", numbered: true, prompt: "از تخم تا مرغ: به ترتیب بچین", say: "از تخم‌مرغ تا مرغ. به ترتیب بچین.",
        items: [{ pic: "🥚", say: "تخم‌مرغ" }, { pic: "🐣", say: "جوجه از تخم بیرون آمد" }, { pic: "🐥", say: "جوجه" }, { pic: "🐔", say: "مرغ" }] },
      { type: "talk", scene: "🛏️ 🪥 🍳 🎒", caption: "امروز صبح چه کار کردی؟ اول…، بعد…، آخر…",
        tips: ["از کودک بپرسید امروز صبح اول چه کرد، بعد چه، و آخر چه.", "کلمه‌های «اول»، «بعد» و «آخر» را خودتان هم به کار ببرید.",
          "بپرسید: «اگر اول کفش بپوشی و بعد جوراب، چه می‌شود؟» و با هم بخندید."] },
      { type: "order", numbered: true, prompt: "نقاشی کشیدن: به ترتیب بچین", say: "دلارام نقاشی کشید. به ترتیب بچین.",
        items: [{ pic: "📄", say: "کاغذ برداشت" }, { pic: "✏️", say: "با مداد کشید" }, { pic: "🖍️", say: "رنگش کرد" }, { pic: "🖼️", say: "به دیوار زد" }] }
    ]
  },
  {
    id: "math-seed-41", subject: "math", level: "seed", emoji: "🌅", title: "صبح تا شب",
    steps: [
      /* One day over a house: the sky and the sun really change, from sunrise to night. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          dawn: { art: "sky-dawn" }, day: { art: "sky-day", o: 0 }, dusk: { art: "sky-dusk", o: 0 }, night: { art: "sky-night", o: 0 },
          sun: { art: "sun", at: [22, 70], s: 1.2 }, moon: { art: "moon", at: [120, 18], s: 1.6, o: 0 },
          ground: { art: "ground" }, house: { art: "🏠", at: [80, 84], s: 2.4 }
        },
        scenes: [
          { caption: "صبح است. خورشید بالا می‌آید.", do: [{ id: "sun", to: { x: 30, y: 40 }, at: 300, dur: 2600, ease: "out" }] },
          { caption: "ظهر است. خورشید بالای آسمان است.", do: [{ id: "day", to: { o: 1 }, dur: 1500 }, { id: "sun", path: "M30 40Q50 14 80 12", at: 200, dur: 2800 }] },
          { caption: "عصر است. خورشید پایین می‌رود.", do: [{ id: "dusk", to: { o: 1 }, dur: 1800 }, { id: "sun", path: "M80 12Q118 16 136 52", at: 200, dur: 2800 }] },
          { caption: "شب است. خورشید رفته. ماه و ستاره‌ها پیدا شده‌اند.", do: [
            { id: "sun", to: { y: 80 }, dur: 1200 }, { id: "night", to: { o: 1 }, at: 600, dur: 1800 }, { id: "moon", to: { o: 1 }, at: 1800, dur: 1000 }
          ] }
        ] },
      { type: "choose", prompt: "صبحانه را کِی می‌خوریم؟", say: "صبحانه را کِی می‌خوریم؟ صبح، ظهر یا شب؟", pic: true,
        options: [{ label: "🌙", value: "شب" }, { label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }], answer: "صبح" },
      { type: "choose", prompt: "کِی می‌خوابیم؟", say: "کِی می‌خوابیم؟ صبح، ظهر یا شب؟", pic: true,
        options: [{ label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }, { label: "🌅", value: "صبح" }], answer: "شب" },
      { type: "choose", prompt: "ناهار را کِی می‌خوریم؟", say: "ناهار را کِی می‌خوریم؟ صبح، ظهر یا شب؟", pic: true,
        options: [{ label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }], answer: "ظهر" },
      { type: "order", numbered: true, prompt: "صبح، ظهر، عصر، شب: به ترتیب بچین", say: "یک روز از صبح تا شب. به ترتیب بچین: صبح، ظهر، عصر، شب.",
        items: [{ pic: "🌅", say: "صبح" }, { pic: "☀️", say: "ظهر" }, { pic: "🌇", say: "عصر" }, { pic: "🌙", say: "شب" }] }
    ]
  },
  {
    id: "math-seed-42", subject: "math", level: "seed", emoji: "📊", title: "کدام بیشتر است؟",
    steps: [
      { type: "chart", make: true, title: "میوه‌های سبد", prompt: "میوه‌ها را از سبد بردار و هر کدام را در ستون خودش بگذار.",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "موز", pic: "🍌", n: 2 }, { label: "پرتقال", pic: "🍊", n: 3 }],
        question: "از کدام میوه بیشتر از همه هست؟", options: [{ label: "سیب", value: "🍎" }, { label: "موز", value: "🍌" }, { label: "پرتقال", value: "🍊" }], answer: "🍎" },
      { type: "chart", title: "میوه‌های سبد",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "موز", pic: "🍌", n: 2 }, { label: "پرتقال", pic: "🍊", n: 3 }],
        question: "چند موز هست؟", options: [1, 2, 3], answer: 2 },
      { type: "chart", make: true, title: "حیوان‌های حیاط", prompt: "حیوان‌های حیاط را بشمار: هر کدام را در ستون خودش بگذار.",
        rows: [{ label: "مرغ", pic: "🐔", n: 3 }, { label: "گربه", pic: "🐈", n: 1 }, { label: "جوجه", pic: "🐥", n: 5 }],
        question: "از کدام حیوان کمتر از همه هست؟", options: [{ label: "مرغ", value: "🐔" }, { label: "گربه", value: "🐈" }, { label: "جوجه", value: "🐥" }], answer: "🐈" },
      { type: "chart", title: "حیوان‌های حیاط",
        rows: [{ label: "مرغ", pic: "🐔", n: 3 }, { label: "گربه", pic: "🐈", n: 1 }, { label: "جوجه", pic: "🐥", n: 5 }],
        question: "چند جوجه هست؟", options: [4, 5, 6], answer: 5 },
      { type: "chart", make: true, title: "گل‌های باغچه", prompt: "گل‌ها را بچین: هر رنگ در ستون خودش.",
        rows: [{ label: "سرخ", pic: "🌹", n: 2 }, { label: "زرد", pic: "🌼", n: 2 }, { label: "بنفش", pic: "🪻", n: 4 }],
        question: "از کدام دو گل به یک اندازه هست؟", options: [{ label: "سرخ و زرد", value: "سرخ و زرد" }, { label: "زرد و بنفش", value: "زرد و بنفش" }, { label: "سرخ و بنفش", value: "سرخ و بنفش" }], answer: "سرخ و زرد" }
    ]
  },
  {
    id: "math-seed-43", subject: "math", level: "seed", emoji: "🫙", title: "حدس بزن چندتا",
    steps: [
      { type: "choose", prompt: "در کدام شیشه مهره زیاد هست؟", say: "در کدام شیشه مهره زیاد هست؟ نشمار، فقط نگاه کن.", pic: true, stack: true,
        options: [{ label: "🔴🔴", value: "کم" }, { label: "🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴", value: "زیاد" }], answer: "زیاد" },
      { type: "choose", show: "🐦🐦🐦🐦🐦 🐦🐦🐦🐦", prompt: "روی سیم چند گنجشک هست؟ نشمار، حدس بزن: حدود سه تا یا حدود ده تا؟",
        say: "روی سیم چند گنجشک هست؟ نشمار، حدس بزن: حدود سه تا، یا حدود ده تا؟", options: ["۳", "۱۰"], answer: "۱۰" },
      { type: "count", layout: "scatter", thing: "🐦", n: 9, options: [8, 9, 10], prompt: "حالا بشمار و ببین حدست نزدیک بود یا نه.", ask: "چند گنجشک بود؟" },
      { type: "choose", show: "🍓🍓", prompt: "در کاسه چند توت‌فرنگی هست؟ حدس بزن: حدود دو تا یا حدود ده تا؟",
        say: "در کاسه چند توت‌فرنگی هست؟ حدس بزن: حدود دو تا، یا حدود ده تا؟", options: ["۲", "۱۰"], answer: "۲" },
      { type: "choose", show: "🌰🌰🌰🌰🌰🌰", prompt: "حدس بزن: این فندق‌ها کم‌اند یا زیاد؟ حدود سه تا، شش تا یا ده تا؟",
        say: "حدس بزن، نشمار: حدود سه تا، شش تا یا ده تا؟", options: ["۳", "۶", "۱۰"], answer: "۶" },
      { type: "count", layout: "scatter", move: true, thing: "🌰", n: 6, options: [5, 6, 7], prompt: "حالا بشمار. حدست درست بود؟", ask: "چند فندق بود؟" },
      { type: "doit", pic: "🫙🤔", text: "بازی حدس زدن:",
        list: ["یک مشت نخود یا ماکارونی در کاسه بریزید.", "هر کدام حدس بزنید چندتاست.", "با هم بشمارید. حدس چه کسی نزدیک‌تر بود؟"] }
    ]
  },
  {
    id: "math-seed-44", subject: "math", level: "seed", emoji: "✋", title: "با دست اندازه بگیر",
    steps: [
      /* Measuring by laying the same unit again and again: a hand span really goes along the bench, each one starting
         where the last ended; laid with gaps, the count comes out wrong. */
      (function () {
        var parts = { room: { art: "day-room" }, bench: { art: "bench", look: { len: 100 }, at: [30, 72] }, num: { art: "count:big", at: [134, 40], s: 1.8, o: 0 } };
        for (var i = 0; i < 5; i++) parts["h" + i] = { art: "span-hand", at: [30 + i * 20, 68], o: 0 };
        for (var j = 0; j < 3; j++) parts["g" + j] = { art: "span-hand", at: [30 + j * 36, 68], o: 0 };
        var lay = [{ id: "num", to: { o: 1 }, at: 600, dur: 200 }];
        for (var k = 0; k < 5; k++) lay.push(pop("h" + k, 600 + k * 900, 0.15), tally("num", k + 1, 600 + k * 900));
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "این نیمکت چقدر دراز است؟ با وجب اندازه می‌گیریم.", do: [jump("bench", 400, 2)] },
            { caption: "یک وجب، دو، سه، چهار، پنج. هر وجب درست از جایی شروع می‌شود که وجب قبلی تمام شد.", do: lay },
            { caption: "نیمکت پنج وجب است.", do: [pop("num", 300, 0.3)] },
            { caption: "اگر بین وجب‌ها جای خالی بگذاریم، فقط سه وجب می‌شود. این درست نیست!", do: [
              [0, 1, 2, 3, 4].map(function (k) { return { id: "h" + k, to: { o: 0 }, dur: 400 }; }), { id: "num", to: { o: 0 }, dur: 300 },
              pop("g0", 800, 0.15), pop("g1", 1700, 0.15), pop("g2", 2600, 0.15)
            ] }
          ],
          question: "نیمکت درست چند وجب است؟", options: [3, 5, 6], answer: 5 };
      })(),
      { type: "measure", ask: "count", unit: "✋", bars: [{ thing: "🛏️", len: 6 }], options: [5, 6, 7],
        prompt: "تخت را با وجب اندازه بگیر. روی هر وجب بزن و بشمار." },
      { type: "measure", ask: "count", unit: "👣", bars: [{ thing: "🧶", len: 4 }], options: [3, 4, 5],
        prompt: "این فرش چند قدم است؟ روی هر قدم بزن و بشمار." },
      { type: "measure", ask: "count", unit: "🥄", bars: [{ thing: "🍞", len: 5 }], options: [4, 5, 6],
        prompt: "این نان چند قاشق است؟ روی هر قاشق بزن و بشمار." },
      { type: "choose", prompt: "بابا و نرگس اتاق را با قدم اندازه گرفتند. کدام قدم‌های بیشتری شمرد؟",
        say: "بابا و نرگس یک اتاق را با قدم اندازه گرفتند. قدم‌های بابا بزرگ است و قدم‌های نرگس کوچک. کدام قدم‌های بیشتری شمرد؟", pic: true,
        options: [{ label: "👨", value: "بابا" }, { label: "👧", value: "نرگس" }], answer: "نرگس" },
      { type: "doit", pic: "✋👣", text: "در خانه اندازه بگیر:",
        list: ["میز را با وجب اندازه بگیر. هر وجب را درست بعد از قبلی بگذار.", "اتاقت را با قدم اندازه بگیر: پاشنه را جلوی پنجه بگذار.",
          "پدر یا مادرت هم همین را اندازه بگیرند. چرا عددشان فرق دارد؟"] }
    ]
  },
  {
    id: "math-seed-45", subject: "math", level: "seed", emoji: "📏", title: "بازی اندازه‌ها",
    steps: [
      { type: "sort", prompt: "سنگین‌ها یک طرف، سبک‌ها یک طرف", say: "چیزهای سنگین را در یک سبد بگذار و چیزهای سبک را در سبد دیگر.",
        baskets: [{ label: "سنگین", pic: "🪨", value: "heavy" }, { label: "سبک", pic: "🪶", value: "light" }],
        items: [{ pic: "🍉", say: "هندوانه", basket: "heavy" }, { pic: "🎈", say: "بادکنک", basket: "light" }, { pic: "🧱", say: "آجر", basket: "heavy" },
          { pic: "🍃", say: "برگ", basket: "light" }, { pic: "📚", say: "کتاب‌ها", basket: "heavy" }, { pic: "🧻", say: "دستمال کاغذی", basket: "light" }] },
      { type: "order", prompt: "کاسه‌ها را از کوچک تا بزرگ بچین", say: "کاسه‌ها را از کوچک تا بزرگ بچین.", ltr: true,
        items: [{ pic: "🥣", size: 0.5 }, { pic: "🥣", size: 0.7 }, { pic: "🥣", size: 0.95 }, { pic: "🥣", size: 1.25 }] },
      { type: "pairs", prompt: "هر چیز را با چیزی جفت کن که همان‌قدر دراز است", say: "هر چیز را با چیزی جفت کن که همان‌قدر دراز است.",
        pairs: [[{ pic: "✏️", bar: 3 }, { pic: "🥄", bar: 3 }], [{ pic: "🧣", bar: 7 }, { pic: "🪢", bar: 7 }], [{ pic: "🥕", bar: 5 }, { pic: "🌽", bar: 5 }]] },
      { type: "sort", prompt: "کدام زیاد جا دارد؟ کدام کم جا دارد؟", say: "ظرف‌هایی که زیاد آب جا دارند در یک سبد، و آن‌هایی که کم جا دارند در سبد دیگر.",
        baskets: [{ label: "زیاد جا دارد", pic: "🪣", value: "big" }, { label: "کم جا دارد", pic: "🥄", value: "small" }],
        items: [{ pic: "🛁", say: "وان حمام", basket: "big" }, { pic: "🍵", say: "استکان", basket: "small" }, { pic: "🫖", say: "کتری", basket: "big" },
          { pic: "🥚", say: "پوست تخم‌مرغ", basket: "small" }, { pic: "🪣", say: "سطل", basket: "big" }, { pic: "🥄", say: "قاشق", basket: "small" }] },
      { type: "order", prompt: "از دراز تا کوتاه بچین", say: "روبان‌ها را از دراز تا کوتاه بچین.", ltr: true,
        items: [{ bar: 8 }, { bar: 6 }, { bar: 4 }, { bar: 2 }] },
      { type: "order", prompt: "از کوتاه تا بلند بچین", say: "این‌ها را از قد کوتاه تا قد بلند بچین.", ltr: true,
        items: [{ pic: "🧍", size: 0.5 }, { pic: "🧍‍♀️", size: 0.8 }, { pic: "🧍", size: 1.1 }, { pic: "🧍‍♀️", size: 1.4 }] }
    ]
  },
  {
    id: "math-seed-46", subject: "math", level: "seed", emoji: "🔺", title: "بازی شکل‌ها",
    steps: [
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر شکل را با چیزی جفت کن که شبیه آن است.",
        pairs: [[{ shape: "circle" }, "⚽"], [{ shape: "triangle" }, "⛺"], [{ shape: "rectangle-tall" }, "🚪"], [{ shape: "square" }, "🎁"]] },
      { type: "pairs", prompt: "هر شکل را با همان شکل، چرخیده یا کوچک، جفت کن", say: "هر شکل را با همان شکل جفت کن، حتی اگر چرخیده یا کوچک باشد.",
        pairs: [[{ shape: "square" }, { shape: "square-tilt" }], [{ shape: "triangle" }, { shape: "triangle-down" }], [{ shape: "rectangle" }, { shape: "rectangle-tall" }]] },
      { type: "sort", prompt: "هر شکل را در سبد خودش بگذار", say: "دایره‌ها، مثلث‌ها و مربع‌ها. هر شکل را در سبد خودش بگذار.",
        baskets: [{ label: "دایره", shape: "circle", value: "circle" }, { label: "مثلث", shape: "triangle", value: "tri" }, { label: "مربع", shape: "square", value: "square" }],
        items: [{ shape: "triangle-thin", say: "مثلث باریک", basket: "tri" }, { shape: "square-tilt", say: "مربع چرخیده", basket: "square" }, { shape: "circle", say: "دایره", basket: "circle" },
          { shape: "triangle-small", say: "مثلث کوچک", basket: "tri" }, { shape: "square-small", say: "مربع کوچک", basket: "square" }, { pic: "🍪", say: "شیرینی گرد", basket: "circle" }] },
      { type: "sort", prompt: "شبیه توپ، شبیه جعبه، یا شبیه قوطی؟", say: "هر چیز شبیه کدام است؟ توپ، جعبه یا قوطی؟",
        baskets: [{ label: "توپ", pic: "⚽", value: "ball" }, { label: "جعبه", pic: "📦", value: "box" }, { label: "قوطی", pic: "🥫", value: "can" }],
        items: [{ pic: "🍊", say: "پرتقال", basket: "ball" }, { pic: "🧊", say: "یخ", basket: "box" }, { pic: "🥫", say: "قوطی رب", basket: "can" },
          { pic: "🏀", say: "توپ بسکتبال", basket: "ball" }, { pic: "🎲", say: "تاس", basket: "box" }, { pic: "🕯️", say: "شمع", basket: "can" }] },
      { type: "sort", prompt: "مثلث‌ها یک طرف، شکل‌های دیگر یک طرف", say: "مثلث‌ها را در یک سبد بگذار و شکل‌های دیگر را در سبد دیگر.",
        baskets: [{ label: "مثلث", shape: "triangle", value: "tri" }, { label: "مثلث نیست", shape: "curvetri", value: "no" }],
        items: [{ shape: "triangle-tilt", say: "مثلث چرخیده", basket: "tri" }, { shape: "opentri", say: "شکل باز", basket: "no" }, { shape: "triangle-down", say: "مثلث برعکس", basket: "tri" },
          { shape: "curvetri", say: "شکلی با ضلع خمیده", basket: "no" }, { shape: "rectangle-thin", say: "مستطیل", basket: "no" }] }
    ]
  },
  {
    id: "math-seed-47", subject: "math", level: "seed", emoji: "🚀", title: "شمردن تا بیست",
    steps: [
      /* Counting back from ten: the number counts down beside a toy rocket, and at zero it really takes off. */
      { type: "scene", prompt: "ببین و با هم بشمارید",
        parts: { sky: { art: "sky-day" }, ground: { art: "ground" }, rocket: { art: "rocket", at: [56, 78], s: 1.4 }, num: { art: "count:big", at: [112, 52], s: 2.2 } },
        scenes: [
          { caption: "موشک آماده است. با هم از ده برعکس بشماریم.", do: [tally("num", 10, 0), jump("rocket", 600, 2)] },
          { caption: "ده، نه، هشت، هفت، شش، پنج، چهار، سه، دو، یک، صفر!", do: [{ count: "num", from: 10, to: 0, at: 300, dur: 9000 }] },
          { caption: "موشک به آسمان رفت!", key: 2000, do: [
            { id: "rocket.flame", to: { o: 1 }, dur: 300 }, { id: "rocket", to: { x: "-1" }, dur: 120, yoyo: true, times: 6 },
            { id: "rocket", to: { y: -40 }, at: 800, dur: 2600, ease: "in" }
          ] }
        ] },
      { type: "count", layout: "rows", thing: "⭐", n: 12, options: [11, 12, 13], prompt: "ستاره‌ها را بشمار. بعد از ده: یازده، دوازده…", ask: "چند ستاره هست؟" },
      { type: "numline", a: 10, b: 4, options: [13, 14, 15], prompt: "قورباغه روی ۱۰ است. چهار خانه جلو می‌پرد. با هم بشمار: یازده، دوازده، … به کجا می‌رسد؟",
        say: "قورباغه روی ده است. چهار خانه جلو می‌پرد. با هم بشمار: یازده، دوازده، سیزده، چهارده." },
      { type: "count", layout: "rows", thing: "🐟", n: 15, options: [14, 15, 16], prompt: "ماهی‌ها را بشمار.", ask: "چند ماهی هست؟" },
      { type: "choose", prompt: "بعد از ۱۵ کدام عدد می‌آید؟", say: "سیزده، چهارده، پانزده، … بعد از پانزده کدام عدد می‌آید؟", options: ["۱۴", "۱۶", "۱۷"], answer: "۱۶" },
      { type: "numline", a: 18, b: 2, options: [19, 20, 21], prompt: "قورباغه روی ۱۸ است. دو خانه جلو می‌پرد. به کجا می‌رسد؟", say: "قورباغه روی هجده است. دو خانه جلو می‌پرد. به کجا می‌رسد؟" },
      { type: "numline", a: 10, b: -3, options: [6, 7, 8], prompt: "قورباغه روی ۱۰ است. سه خانه عقب می‌پرد. برعکس بشمار: نه، هشت، …",
        say: "قورباغه روی ده است. سه خانه عقب می‌پرد. برعکس بشمار: نه، هشت، هفت." }
    ]
  },
  {
    id: "math-seed-48", subject: "math", level: "seed", emoji: "🔟", title: "بازی عددها تا ده",
    steps: [
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با نقطه‌هایش جفت کن.",
        pairs: [[{ label: 7, say: "هفت" }, { dots: 7 }], [{ label: 0, say: "صفر" }, { pic: "🍽️", say: "بشقاب خالی" }], [{ label: 9, say: "نه" }, { dots: 9 }], [{ label: 6, say: "شش" }, { dots: 6 }]] },
      { type: "order", prompt: "عددها را از کم به زیاد بچین", say: "عددها را از کم به زیاد بچین.", ltr: true,
        items: [{ label: 0, say: "صفر" }, { label: 3, say: "سه" }, { label: 5, say: "پنج" }, { label: 8, say: "هشت" }, { label: 10, say: "ده" }] },
      { type: "count", flash: true, show: "frame", n: 8, options: [7, 8, 9], prompt: "یک ردیف پنج‌تایی و چندتا دیگر. زود نگاه کن!", ask: "چندتا دیدی؟" },
      { type: "feed", animal: "🐑", food: "🌿", n: 9, max: 12, prompt: "گوسفند یکی بیشتر از هشت تا علف می‌خواهد. به او بده." },
      { type: "pairs", prompt: "هر عدد را با انگشت‌هایش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. هر عدد را با دست‌هایی جفت کن که همان‌قدر انگشت دارند.",
        pairs: [[{ label: 8, say: "هشت" }, { fingers: 8 }], [{ label: 5, say: "پنج" }, { fingers: 5 }], [{ label: 7, say: "هفت" }, { fingers: 7 }]] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 10, max: 13, prompt: "عدد را ببین. همان‌قدر فندق به سنجاب بده." },
      { type: "order", prompt: "از ۱۰ تا ۰ برعکس بچین", say: "از ده برعکس بشمار: ده، هشت، شش، چهار، دو، صفر. از زیاد به کم بچین.", ltr: true,
        items: [{ label: 10, say: "ده" }, { label: 8, say: "هشت" }, { label: 6, say: "شش" }, { label: 4, say: "چهار" }, { label: 2, say: "دو" }, { label: 0, say: "صفر" }] }
    ]
  },
  {
    id: "math-seed-49", subject: "math", level: "seed", emoji: "🧹", title: "بازی جای چیزها",
    steps: [
      { type: "sort", prompt: "اتاق را مرتب کن: هر چیز را جایی بگذار که صدا می‌گوید", say: "اسباب‌بازی‌ها داخل جعبه، کتاب‌ها روی قفسه، و کفش‌ها زیر تخت.",
        baskets: [{ label: "داخل جعبه", pic: "📦", value: "box" }, { label: "روی قفسه", pic: "🗄️", value: "shelf" }, { label: "زیر تخت", pic: "🛏️", value: "bed" }],
        items: [{ pic: "🧸", say: "عروسک خرسی: داخل جعبه", basket: "box" }, { pic: "📚", say: "کتاب‌ها: روی قفسه", basket: "shelf" }, { pic: "👟", say: "کفش: زیر تخت", basket: "bed" },
          { pic: "🚗", say: "ماشین: داخل جعبه", basket: "box" }, { pic: "🪴", say: "گلدان: روی قفسه", basket: "shelf" }, { pic: "🩴", say: "دمپایی: زیر تخت", basket: "bed" }] },
      { type: "map", map: ROOM_FRONT, say: "در اتاق پیدا کن.",
        tasks: [{ find: "ball", prompt: "چه چیزی زیر میز است؟ رویش بزن." }, { find: "teddy", prompt: "چه چیزی بین دو صندلی است؟ رویش بزن." },
          { find: "apple", prompt: "چه چیزی بیرون جعبه است؟ رویش بزن." }, { find: "cat", prompt: "چه چیزی روی میز است؟ رویش بزن." }] },
      { type: "map", map: PARK, say: "با رضا راه برو.",
        tasks: [{ route: ["slide", "pool", "gate"], walker: "👦", prompt: "رضا کنار سرسره است. برو تا حوض، بعد بپیچ و برو تا در پارک." }] },
      { type: "map", map: PARK, say: "با مادر راه برو.",
        tasks: [{ route: ["gate", "pool", "tree", "ducks"], walker: "👩", prompt: "از در پارک برو تا حوض. بعد بپیچ و برو تا درخت. از آن‌جا برو پیش اردک‌ها." }] },
      { type: "choose", prompt: "گربه بین کدام است؟", say: "در کدام، گربه بین سگ و خرگوش است؟", pic: true,
        options: [{ label: "🐈🐕🐇", value: "کنار" }, { label: "🐕🐈🐇", value: "بین" }, { label: "🐕🐇🐈", value: "آخر" }], answer: "بین" }
    ]
  },
  {
    id: "math-seed-50", subject: "math", level: "seed", emoji: "🎉", title: "جشن عددها",
    steps: [
      { type: "feed", animal: "🐰", food: "🥕", n: 7, max: 10, prompt: "جشن خرگوش است! هفت هویج روی بشقابش بگذار." },
      { type: "choose", prompt: "به هر بچه یک بادکنک دادیم. بادکنک اضافه آمد. کدام بیشتر بود؟", say: "به هر بچه یک بادکنک دادیم و بادکنک اضافه آمد. کدام بیشتر بود؟ بچه‌ها یا بادکنک‌ها؟", pic: true,
        options: [{ label: "🧒", value: "بچه‌ها" }, { label: "🎈", value: "بادکنک‌ها" }], answer: "بادکنک‌ها" },
      { type: "choose", show: "🍬🍬🍬 🥣", prompt: "پنج شیرینی داشتیم. سه تا پیداست. چندتا زیر کاسه است؟", say: "پنج شیرینی داشتیم. سه تا پیداست. چندتا زیر کاسه است؟",
        options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", prompt: "چهار مهمان آمده بودند. یک مهمان دیگر هم آمد. حالا چند مهمان داریم؟", say: "چهار مهمان آمده بودند. یک مهمان دیگر هم آمد. حالا چند مهمان داریم؟",
        options: ["۳", "۴", "۵"], answer: "۵" },
      { type: "pattern", prompt: "پرچم‌های جشن را تمام کن", say: "قرمز، زرد، سبز. قرمز، زرد، سبز. بقیه را تو بگذار.",
        seq: ["🟥", "🟨", "🟩", "🟥", "🟨", "🟩", "🟥", "🟨", "🟩"], blanks: [6, 7, 8], options: ["🟥", "🟨", "🟩"] },
      { type: "pairs", prompt: "هر عدد را با دسته‌اش جفت کن", say: "روی عدد بزن تا اسمش را بشنوی. بشمار و هر عدد را با دسته‌اش جفت کن.",
        pairs: [[{ label: 3, say: "سه" }, "🎁🎁🎁"], [{ label: 5, say: "پنج" }, { fingers: 5 }], [{ label: 8, say: "هشت" }, { dots: 8 }], [{ label: 2, say: "دو" }, "🧁🧁"]] },
      { type: "choose", prompt: "پنج شمع روی کیک بود. دو تا را فوت کردی. چند شمع روشن ماند؟", say: "پنج شمع روی کیک بود. دو تا را فوت کردی و خاموش شد. چند شمع روشن ماند؟",
        options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "feed", animal: "🐔", food: "🌽", n: 4, max: 8, prompt: "مرغ شش ذرت می‌خواست. دو تا را خورده است. بقیه را به او بده." }
    ]
  },

  // ---------------- Math: Sprout (from objects, to pictures, to numbers) ----------------
  {
    id: "math-sprout-1", subject: "math", level: "sprout", emoji: "🔟", title: "قاب ده‌تایی",
    steps: [
      { type: "count", thing: "🍊", n: 5, options: [4, 5, 6] },
      { type: "tenframe", n: 5, prompt: "در قاب چندتا مهره هست؟", options: [5, 6, 4] },
      { type: "tenframe", n: 7, prompt: "در قاب چندتا مهره هست؟", options: [6, 8, 7] },
      { type: "make", n: 4 },
      { type: "make", n: 9 },
      { type: "tenframe", n: 10, prompt: "در قاب چندتا مهره هست؟", options: [9, 10, 8] }
    ]
  },
  {
    id: "math-sprout-14", subject: "math", level: "sprout", emoji: "🖐️", title: "پنج و چندتا",
    steps: [
      { type: "tenframe", n: 7, prompt: "یک ردیف پر، یعنی پنج تا. روی هم چندتا مهره هست؟", options: [6, 7, 8] },
      { type: "count", flash: true, show: "fingers", n: 8, options: [7, 8, 9], prompt: "یک دست کامل و چند انگشت دیگر. زود نگاه کن!", ask: "روی هم چند انگشت؟" },
      { type: "count", flash: true, show: "frame", n: 6, options: [5, 6, 7], prompt: "قاب ده‌تایی فقط یک لحظه پیدا می‌شود. نشمار، نگاه کن!", ask: "چندتا مهره دیدی؟" },
      { type: "choose", ltr: true, show: "۸ = ۵ + ؟", prompt: "هشت یعنی پنج و چندتا؟", say: "هشت یعنی پنج و چندتا؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "tenframe", n: 9, missing: true, prompt: "نه یکی کمتر از ده است. چندتا جای خالی هست؟", options: [1, 2, 0] },
      { type: "count", flash: true, show: "fingers", n: 9, options: [8, 9, 10], prompt: "دو دست را ببین. فقط یک انگشت پایین است!", ask: "چند انگشت بالاست؟" },
      { type: "count", flash: true, show: "frame", n: 8, options: [7, 8, 9], prompt: "یک ردیف پر و چندتا دیگر؟ زود نگاه کن!", ask: "چندتا مهره دیدی؟" },
      { type: "choose", ltr: true, show: "۷ = ۱۰ − ؟", prompt: "در قاب هفت مهره هست. چندتا کمتر از ده است؟", say: "در قاب هفت مهره هست. هفت، چندتا کمتر از ده است؟", options: ["۲", "۳", "۴"], answer: "۳" }
    ]
  },
  {
    id: "math-sprout-2", subject: "math", level: "sprout", emoji: "🤝", title: "چندتا تا ده؟",
    steps: [
      { type: "tenframe", n: 8, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [1, 2, 3] },
      { type: "tenframe", n: 6, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [4, 3, 5] },
      { type: "tenframe", n: 3, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [6, 8, 7] },
      { type: "tenframe", n: 5, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [5, 4, 6] },
      { type: "tenframe", n: 9, missing: true, prompt: "چندتا دیگر لازم است تا ده بشود؟", options: [2, 1, 0] }
    ]
  },
  {
    id: "math-sprout-15", subject: "math", level: "sprout", emoji: "🔴", title: "همه راه‌های ساختن",
    steps: [
      /* All the ways to make six, in order: six counters, and each time one more turns over from red to yellow. */
      (function () {
        var X = [35, 53, 71, 89, 107, 125], Y = 52;
        var parts = { table: { art: "counter-table", at: [80, 96], s: 2.2 } };
        X.forEach(function (x, i) {
          parts["r" + i] = { art: "counter-r", at: [x, Y], s: 1.8 };
          parts["y" + i] = { art: "counter-y", at: [x, Y], s: 1.8, o: 0 };
        });
        var words = ["شش و صفر", "پنج و یک", "چهار و دو", "سه و سه", "دو و چهار", "یک و پنج", "صفر و شش"];
        var scenes = [{ caption: "شش مهره داریم، همه قرمز: شش قرمز و صفر زرد.", do: X.map(function (x, i) { return jump("r" + i, 300 + i * 200, 2); }) }];
        for (var k = 1; k <= 6; k++) {
          var i = 6 - k;
          scenes.push({ caption: "یکی را برگرداندیم: " + words[k] + ". باز هم شش.", do: [
            { id: "r" + i, to: { sx: 0.05 }, at: 300, dur: 300 }, { id: "r" + i, to: { o: 0 }, at: 600, dur: 1 },
            { id: "y" + i, to: { sx: 0.05 }, at: 0, dur: 1 }, { id: "y" + i, to: { o: 1 }, at: 600, dur: 1 }, { id: "y" + i, to: { sx: 1 }, at: 600, dur: 300 }
          ] });
        }
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts, scenes: scenes,
          question: "شش را به چند راه ساختیم؟", options: [5, 6, 7], answer: 7 };
      })(),
      { type: "make", n: 7 },
      { type: "choose", ltr: true, show: "۷ = ۴ + ؟", prompt: "هفت یعنی چهار و چندتا؟", say: "هفت یعنی چهار و چندتا؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", prompt: "کدام راه، هشت را درست می‌سازد؟", say: "کدام راه، هشت را درست می‌سازد؟", stack: true, ltr: true,
        options: ["۴ + ۳", "۵ + ۳", "۶ + ۱"], answer: "۵ + ۳" },
      { type: "choose", ltr: true, show: "۹ = ؟ + ۲", prompt: "نه لوبیا در دو دست است. در یک دست دو تاست. در دست دیگر چندتا؟", say: "نه لوبیا در دو دست است. در یک دست دو تاست. در دست دیگر چندتا؟",
        options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "order", prompt: "راه‌های ساختن پنج را به ترتیب بچین", say: "راه‌های ساختن پنج را به ترتیب بچین: پنج و صفر، چهار و یک، سه و دو، دو و سه، یک و چهار، صفر و پنج.", ltr: true,
        items: ["۵ + ۰", "۴ + ۱", "۳ + ۲", "۲ + ۳", "۱ + ۴", "۰ + ۵"] },
      { type: "choose", ltr: true, show: "۶ = ۳ + ؟", prompt: "شش یعنی سه و چندتا؟", say: "شش یعنی سه و چندتا؟", options: ["۲", "۳", "۴"], answer: "۳" }
    ]
  },
  {
    id: "math-sprout-16", subject: "math", level: "sprout", emoji: "🔟", title: "بازی ده‌تایی",
    steps: [
      { type: "pairs", prompt: "هر عدد را با عددی جفت کن که با آن ده می‌شود", say: "هر عدد را با عددی جفت کن که با آن ده می‌شود.",
        pairs: [[{ dots: 7 }, 3], [{ dots: 4 }, 6], [{ dots: 9 }, 1], [{ dots: 5 }, 5]] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 4, max: 8, prompt: "سنجاب شش فندق دارد و ده تا می‌خواهد. چندتا دیگر لازم دارد؟ همان‌قدر به او بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. دو عددی را پیدا کن که با هم ده می‌شوند.",
        pairs: [[2, 8], [3, 7], [4, 6], [1, 9]] },
      { type: "feed", animal: "🐰", food: "🥕", n: 7, max: 10, prompt: "خرگوش سه هویج خورده است و ده تا می‌خواهد. بقیه را به او بده." },
      { type: "pairs", prompt: "هر قاب را با عددی جفت کن که آن را پر می‌کند", say: "هر قاب ده‌تایی را با عددی جفت کن که جاهای خالی‌اش را پر می‌کند.",
        pairs: [[{ dots: 8 }, 2], [{ dots: 6 }, 4], [{ dots: 10 }, 0]] },
      { type: "feed", animal: "🐔", food: "🌽", n: 5, max: 9, prompt: "مرغ پنج ذرت دارد و ده تا می‌خواهد. بقیه را به او بده." }
    ]
  },
  {
    id: "math-sprout-3", subject: "math", level: "sprout", emoji: "🥚", title: "عددهای ۱۱ تا ۲۰",
    steps: [
      { type: "count", thing: "🥚", n: 12, options: [11, 12, 13] },
      { type: "tenframe", n: 13, prompt: "یک قاب پر، یعنی ده تا. روی هم چندتا مهره هست؟", options: [12, 13, 3] },
      { type: "tenframe", n: 16, prompt: "روی هم چندتا مهره هست؟", options: [16, 6, 15] },
      { type: "make", n: 14 },
      { type: "tenframe", n: 19, prompt: "روی هم چندتا مهره هست؟", options: [18, 20, 19] },
      { type: "make", n: 20 },
      { type: "choose", prompt: "ده و هفت می‌شود چند؟", say: "ده و هفت می‌شود چند؟", options: ["۷۱", "۱۷", "۱۰"], answer: "۱۷" }
    ]
  },
  {
    id: "math-sprout-4", subject: "math", level: "sprout", emoji: "⚖️", title: "بیشتر یا کمتر؟",
    steps: [
      { type: "compare", a: 7, b: 4, thing: "🍎", ask: "more" },
      { type: "compare", a: 5, b: 9, thing: "🐟", ask: "more" },
      { type: "compare", a: 8, b: 6, thing: "⭐", ask: "less" },
      { type: "compare", a: 12, b: 15, ask: "more" },
      { type: "compare", a: 19, b: 11, ask: "less" },
      { type: "compare", a: 17, b: 14, ask: "more" }
    ]
  },
  {
    id: "math-sprout-5", subject: "math", level: "sprout", emoji: "🍐", title: "جمع تا ده",
    steps: [
      { type: "count", thing: "🍐", n: 5, options: [4, 5, 6] },
      { type: "tenframe", n: 3, plus: 2, options: [4, 5, 6] },
      { type: "tenframe", n: 4, plus: 3, options: [7, 6, 8] },
      { type: "tenframe", n: 5, plus: 4, options: [8, 10, 9] },
      { type: "tenframe", n: 6, plus: 4, options: [10, 9, 11] },
      { type: "choose", ltr: true, show: "۲ + ۵ = ؟", prompt: "جواب چند است؟", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۳ + ۳ = ؟", prompt: "جواب چند است؟", options: ["۶", "۵", "۳"], answer: "۶" }
    ]
  },
  {
    id: "math-sprout-17", subject: "math", level: "sprout", emoji: "✍️", title: "جمله‌های عددی",
    steps: [
      { type: "choose", show: "🐥🐥🐥 🐥🐥", prompt: "سه جوجه بودند. دو جوجه دیگر آمدند. کدام جمله درست است؟", say: "سه جوجه بودند. دو جوجه دیگر آمدند. کدام جمله درست است؟",
        stack: true, ltr: true, options: ["۳ + ۲ = ۵", "۳ − ۲ = ۱", "۵ + ۲ = ۷"], answer: "۳ + ۲ = ۵" },
      { type: "choose", show: "🍎🍎🍎🍎🍎🍎", prompt: "شش سیب بود. بچه‌ها دو تا خوردند. کدام جمله درست است؟", say: "شش سیب بود. بچه‌ها دو تا خوردند. کدام جمله درست است؟",
        stack: true, ltr: true, options: ["۶ + ۲ = ۸", "۶ − ۲ = ۴", "۴ − ۲ = ۲"], answer: "۶ − ۲ = ۴" },
      { type: "choose", ltr: true, show: "۴ + ۳ = ۷", prompt: "کدام قصه با این جمله جور است؟", say: "چهار به اضافه سه، مساوی هفت. کدام قصه با این جمله جور است؟", stack: true,
        options: [{ label: "چهار گنجشک بودند، سه تا رفتند.", value: "رفتن" }, { label: "چهار گنجشک بودند، سه تای دیگر آمدند.", value: "آمدن" }, { label: "هفت گنجشک بودند، چهار تا رفتند.", value: "هفت" }], answer: "آمدن" },
      { type: "pairs", prompt: "هر جمله را با جوابش جفت کن", say: "هر جمله را با جوابش جفت کن.",
        pairs: [["۵ + ۴", 9], ["۸ − ۳", 5], ["۲ + ۲", 4], ["۷ − ۰", 7]] },
      { type: "choose", ltr: true, show: "۹ − ۴ = ۵", prompt: "کدام قصه با این جمله جور است؟", say: "نه منهای چهار، مساوی پنج. کدام قصه با این جمله جور است؟", stack: true,
        options: [{ label: "نه بادکنک بود، چهار تا ترکید.", value: "ترکید" }, { label: "پنج بادکنک بود، چهار تا خریدیم.", value: "خرید" }, { label: "نه بادکنک بود، چهار تا خریدیم.", value: "نه" }], answer: "ترکید" },
      { type: "pairs", prompt: "هر تصویر را با جمله‌اش جفت کن", say: "هر تصویر را با جمله‌اش جفت کن.",
        pairs: [["🐟🐟 + 🐟", "۲ + ۱ = ۳"], ["🎈🎈🎈 + 🎈🎈", "۳ + ۲ = ۵"], ["🍪🍪🍪🍪 + 🍪🍪", "۴ + ۲ = ۶"]] },
      { type: "choose", prompt: "این جمله را بخوان و جوابش را پیدا کن.", ltr: true, show: "۱۰ − ۳ = ؟", say: "ده منهای سه، مساوی چند؟", options: ["۶", "۷", "۱۳"], answer: "۷" }
    ]
  },
  {
    id: "math-sprout-6", subject: "math", level: "sprout", emoji: "🍪", title: "کم کردن تا ده",
    steps: [
      { type: "tenframe", n: 5, minus: 2, options: [2, 3, 4] },
      { type: "tenframe", n: 7, minus: 3, options: [4, 3, 5] },
      { type: "tenframe", n: 9, minus: 4, options: [6, 4, 5] },
      { type: "tenframe", n: 10, minus: 6, options: [4, 5, 3] },
      { type: "choose", ltr: true, show: "۸ − ۵ = ؟", prompt: "جواب چند است؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", ltr: true, show: "۶ − ۶ = ؟", prompt: "جواب چند است؟", options: ["۶", "۱", "۰"], answer: "۰" }
    ]
  },
  {
    id: "math-sprout-18", subject: "math", level: "sprout", emoji: "📦", title: "جزء، جزء، کل",
    steps: [
      /* Part-part-whole: three red and four yellow counters sit in the two part boxes, join in the whole box (adding),
         then the four yellow ones go back out (taking away): the same picture both ways. */
      (function () {
        var parts = { bg: { art: "day-room" }, box: { art: "pw-box", at: [80, 6], s: 1.6 },
          add: { art: "n:۳ + ۴ = ۷", at: [80, 88], s: 1.1, o: 0 }, sub: { art: "n:۷ − ۴ = ۳", at: [80, 88], s: 1.1, o: 0 } };
        // the part boxes: left from x 32 to 78, right from 82 to 128, y 41 to 70 (stage); the whole: y 6 to 35
        var PR = [[40, 50], [52, 50], [64, 50]], PY = [[90, 50], [102, 50], [114, 50], [96, 61]];
        var WH = [[44, 20], [56, 20], [68, 20], [80, 20], [92, 20], [104, 20], [116, 20]];
        PR.forEach(function (p, i) { parts["r" + i] = { art: "counter-r", at: p, s: 1.4 }; });
        PY.forEach(function (p, i) { parts["y" + i] = { art: "counter-y", at: p, s: 1.4 }; });
        var join = [], back = [];
        PR.forEach(function (p, i) { join.push(hop("r" + i, p, WH[i], 300 + i * 250, 800, 6)); });
        PY.forEach(function (p, i) { join.push(hop("y" + i, p, WH[3 + i], 1300 + i * 250, 800, 6)); back.push(hop("y" + i, WH[3 + i], p, 300 + i * 250, 800, 6)); });
        join.push({ id: "add", to: { o: 1 }, at: 2600, dur: 400 });
        back.push({ id: "add", to: { o: 0 }, dur: 300 }, { id: "sub", to: { o: 1 }, at: 1800, dur: 400 });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "در یک جعبه کوچک سه مهره قرمز هست، در دیگری چهار مهره زرد.", do: [PR.map(function (p, i) { return jump("r" + i, 300 + i * 200, 2); }), PY.map(function (p, i) { return jump("y" + i, 1200 + i * 200, 2); })] },
            { caption: "همه را در جعبه بزرگ می‌ریزیم: سه و چهار، هفت. سه به اضافه چهار مساوی هفت.", do: join },
            { caption: "حالا زردها را برمی‌گردانیم: از هفت، چهار تا رفت، سه تا ماند. هفت منهای چهار مساوی سه.", do: back }
          ],
          question: "اگر قرمزها را برگردانیم، چندتا در جعبه بزرگ می‌ماند؟", options: [3, 4, 7], answer: 4 };
      })(),
      { type: "tenframe", n: 7, minus: 4, options: [2, 3, 4] },
      { type: "choose", ltr: true, show: "۲ + ۶ = ۸", prompt: "دو و شش می‌شود هشت. پس هشت منهای شش چند است؟", say: "دو و شش می‌شود هشت. پس هشت منهای شش چند است؟", options: ["۲", "۶", "۸"], answer: "۲" },
      { type: "choose", ltr: true, show: "کل: ۹ ، جزء: ۵ ، جزء: ؟", prompt: "کل نه است. یک جزء پنج است. جزء دیگر چند است؟", say: "کل نه است. یک جزء پنج است. جزء دیگر چند است؟", options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "choose", prompt: "کدام جمله‌ها همان تصویر را می‌گویند؟", show: "🔴🔴🔴🔴🔴 🟡", say: "پنج قرمز و یک زرد. کدام جمله‌ها همان تصویر را می‌گویند؟", stack: true, ltr: true,
        options: ["۵ + ۱ = ۶ و ۶ − ۱ = ۵", "۵ + ۱ = ۶ و ۶ + ۱ = ۷", "۵ − ۱ = ۴ و ۴ + ۱ = ۵"], answer: "۵ + ۱ = ۶ و ۶ − ۱ = ۵" },
      { type: "tenframe", n: 6, plus: 3, options: [8, 9, 10] },
      { type: "choose", ltr: true, show: "۶ + ۳ = ۹", prompt: "شش و سه می‌شود نه. پس نه منهای سه چند است؟", say: "شش و سه می‌شود نه. پس نه منهای سه چند است؟", options: ["۳", "۶", "۹"], answer: "۶" }
    ]
  },
  {
    id: "math-sprout-7", subject: "math", level: "sprout", emoji: "🔺", title: "شکل‌ها",
    steps: [
      { type: "shape", show: ["circle", "square", "triangle", "rectangle"], prompt: "این‌ها دایره، مربع، مثلث و مستطیل‌اند." },
      { type: "shape", prompt: "دایره کدام است؟", options: ["square", "circle", "triangle"], answer: "circle" },
      { type: "shape", prompt: "مثلث کدام است؟", options: ["circle", "rectangle", "triangle-tilt"], answer: "triangle" },
      { type: "shape", prompt: "مربع کدام است؟", options: ["rectangle", "triangle", "square-tilt"], answer: "square" },
      { type: "shape", prompt: "مستطیل کدام است؟", options: ["rectangle-tall", "circle", "triangle"], answer: "rectangle" },
      { type: "shape", show: "triangle", prompt: "مثلث چند ضلع دارد؟", options: [4, 3, 5], answer: 3 },
      { type: "shape", show: "rectangle", prompt: "مستطیل چند ضلع دارد؟", options: [3, 5, 4], answer: 4 },
      { type: "shape", show: "circle", prompt: "کدام شبیه این شکل است؟", pic: true,
        options: [{ label: "🚪", value: "در" }, { label: "🍪", value: "شیرینی" }, { label: "🍕", value: "پیتزا" }], answer: "شیرینی" },
      { type: "shape", show: "triangle", prompt: "کدام شبیه این شکل است؟", pic: true,
        options: [{ label: "🍕", value: "پیتزا" }, { label: "⚽", value: "توپ" }, { label: "🚪", value: "در" }], answer: "پیتزا" }
    ]
  },
  {
    id: "math-sprout-19", subject: "math", level: "sprout", emoji: "📐", title: "ضلع و گوشه",
    steps: [
      { type: "shape", show: ["triangle", "square"], prompt: "خط‌های صاف دور یک شکل، ضلع‌های آن هستند. جایی که دو ضلع به هم می‌رسند، گوشه است. مثلث سه ضلع و سه گوشه دارد. مربع چهار ضلع و چهار گوشه." },
      { type: "shape", show: "triangle-tilt", prompt: "این شکل چند ضلع دارد؟", options: [3, 4, 5], answer: 3 },
      { type: "shape", show: "rectangle-tall", prompt: "این شکل چند گوشه دارد؟", options: [3, 4, 5], answer: 4 },
      { type: "shape", show: "circle", prompt: "دایره چند گوشه دارد؟", say: "دایره چند گوشه دارد؟ دورش را با انگشتت دنبال کن.", options: [0, 1, 4], answer: 0 },
      { type: "sort", prompt: "شکل‌ها را بر اساس ضلع‌هایشان دسته کن", say: "شکل‌های سه‌ضلعی در یک سبد، چهارضلعی‌ها در سبد دیگر، و شکل‌های بی‌ضلع در سبد سوم.",
        baskets: [{ label: "۳ ضلع", shape: "triangle", value: "3" }, { label: "۴ ضلع", shape: "square", value: "4" }, { label: "بی‌ضلع", shape: "circle", value: "0" }],
        items: [{ shape: "triangle-thin", say: "مثلث باریک", basket: "3" }, { shape: "rectangle", say: "مستطیل", basket: "4" }, { shape: "square-tilt", say: "مربع چرخیده", basket: "4" },
          { shape: "triangle-down", say: "مثلث برعکس", basket: "3" }, { shape: "circle", say: "دایره", basket: "0" }, { shape: "rectangle-thin", say: "مستطیل باریک", basket: "4" }] },
      { type: "shape", prompt: "من چهار ضلع دارم و همه ضلع‌هایم یک اندازه‌اند. من کدامم؟", options: ["rectangle", "square-tilt", "triangle"], answer: "square" },
      { type: "shape", prompt: "من سه گوشه دارم. من کدامم؟", options: ["square", "circle", "triangle-thin"], answer: "triangle" },
      { type: "shape", prompt: "من چهار ضلع دارم. دو ضلعم بلند است و دو ضلعم کوتاه. من کدامم؟", options: ["square", "rectangle-tall", "triangle-tilt"], answer: "rectangle" }
    ]
  },
  {
    id: "math-sprout-20", subject: "math", level: "sprout", emoji: "🧊", title: "شکل‌های فضایی",
    steps: [
      /* The five solids, one at a time; the ones with a curved face really roll. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          room: { art: "day-room" }, cube: { art: "cube", at: [22, 80], s: 1.6, o: 0 }, cuboid: { art: "cuboid", at: [58, 80], s: 1.4, o: 0 },
          ball: { art: "ball-3d", at: [90, 72], s: 1.4, o: 0 }, can: { art: "can", at: [112, 80], s: 1.3, o: 0 }, cone: { art: "cone", at: [138, 80], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "این مکعب است. همه وجه‌هایش صاف و مربع است، مثل تاس.", do: [pop("cube", 300)] },
          { caption: "این مکعب مستطیل است، مثل جعبه کفش. وجه‌هایش صاف است.", do: [pop("cuboid", 300)] },
          { caption: "این کره است، مثل توپ. همه جایش خمیده است و قل می‌خورد.", do: [pop("ball", 300), { id: "ball", to: { x: 98, r: 200 }, at: 900, dur: 1200, yoyo: true, times: 2 }] },
          { caption: "این استوانه است، مثل قوطی. دو وجه صاف دارد و یک وجه خمیده.", do: [pop("can", 300)] },
          { caption: "این مخروط است، مثل بستنی قیفی. یک وجه صاف دارد و یک نوک.", do: [pop("cone", 300)] }
        ],
        question: "کدام قل می‌خورد؟", pic: true,
        options: [{ label: "🎲", value: "مکعب" }, { label: "⚽", value: "کره" }, { label: "📦", value: "مکعب مستطیل" }], answer: "کره" },
      { type: "pairs", prompt: "هر شکل فضایی را با چیزی جفت کن که شبیه آن است", say: "روی اسم بزن تا آن را بشنوی. هر شکل فضایی را با چیزی جفت کن که شبیه آن است.",
        pairs: [[{ label: "مکعب", say: "مکعب" }, "🎲"], [{ label: "کره", say: "کره" }, "⚽"], [{ label: "استوانه", say: "استوانه" }, "🥫"], [{ label: "مخروط", say: "مخروط" }, "🍦"], [{ label: "مکعب مستطیل", say: "مکعب مستطیل" }, "📦"]] },
      { type: "sort", prompt: "همه وجه‌هایش صاف است، یا وجه خمیده دارد؟", say: "چیزهایی که همه وجه‌هایشان صاف است در یک سبد، و چیزهایی که وجه خمیده دارند در سبد دیگر.",
        baskets: [{ label: "همه صاف", pic: "📦", value: "flat" }, { label: "خمیده دارد", pic: "🥫", value: "curved" }],
        items: [{ pic: "🎲", say: "تاس", basket: "flat" }, { pic: "🍊", say: "پرتقال", basket: "curved" }, { pic: "🎁", say: "جعبه کادو", basket: "flat" },
          { pic: "🕯️", say: "شمع", basket: "curved" }, { pic: "🧊", say: "یخ", basket: "flat" }, { pic: "🍦", say: "بستنی قیفی", basket: "curved" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر شکل فضایی را با چیزی جفت کن که شبیه آن است.",
        pairs: [[{ label: "استوانه", say: "استوانه" }, "🧻"], [{ label: "کره", say: "کره" }, "🌍"], [{ label: "مکعب", say: "مکعب" }, "🧊"]] },
      { type: "doit", pic: "📦🥫⚽", text: "در خانه شکل‌های فضایی پیدا کن:",
        list: ["یک مکعب، یک مکعب مستطیل، یک کره و یک استوانه پیدا کن.", "کدام‌ها قل می‌خورند؟ کدام‌ها را می‌شود روی هم گذاشت؟", "انگشتت را روی وجه‌های صاف و خمیده بکش."] }
    ]
  },
  {
    id: "math-sprout-21", subject: "math", level: "sprout", emoji: "🍕", title: "نصف و چهار قسمت مساوی",
    steps: [
      { type: "fraction", ask: "equal", prompt: "نان را برای دو نفر نصف کرده‌اند. کدام نصف درست است؟ سهم‌ها باید مساوی باشد.",
        shapes: [{ shape: "bread", cuts: [0.3] }, { shape: "bread", cuts: [0.5] }, { shape: "bread", cuts: [0.7] }] },
      { type: "fraction", shape: "bread", parts: 2, cut: true, prompt: "این سنگک را نصف کن: به دو تکه مساوی. روی خط‌چین بزن." },
      { type: "fraction", shape: "square", parts: 2, take: 1, prompt: "نصف این کیک مربعی را رنگ کن." },
      { type: "fraction", ask: "equal", prompt: "کدام به چهار تکه مساوی بریده شده است؟",
        shapes: [{ shape: "circle", cuts: [0, 0.25, 0.5, 0.75] }, { shape: "circle", cuts: [0, 0.2, 0.5, 0.6] }, { shape: "rect", cuts: [0.1, 0.4, 0.8] }] },
      { type: "fraction", shape: "square", parts: 4, cut: true, prompt: "این کاغذ مربعی را به چهار تکه مساوی ببر." },
      { type: "fraction", ask: "unequal", prompt: "کدام را نامساوی بریده‌اند؟ آن سهم‌ها منصفانه نیست.",
        shapes: [{ shape: "circle", cuts: [0, 0.5] }, { shape: "rect", cuts: [0.25] }, { shape: "square", parts: 4 }] },
      { type: "fraction", shape: "circle", parts: 4, take: 1, prompt: "یک قسمت از چهار قسمت این کیک را رنگ کن: یک‌چهارم." },
      { type: "choose", prompt: "یک سیب را برای دو نفر نصف کردیم. هر نفر چند تکه می‌گیرد؟", say: "یک سیب را برای دو نفر نصف کردیم. هر نفر چند تکه می‌گیرد؟", options: ["۱", "۲", "۴"], answer: "۱" }
    ]
  },

  {
    id: "math-sprout-8", subject: "math", level: "sprout", emoji: "🥕", title: "بازی جمع",
    steps: [
      /* Three red apples hop onto the table, then two green ones; each group gets its number after it has
         arrived. The green ones move up next to the red ones, the child counts every apple by tapping it (the total
         counts up), and the numbers go up into a row to make the sum, left to right as in the schoolbook. */
      { type: "scene", prompt: "ببین سیب‌ها چه می‌شوند", bg: "#f7ecd9",
        parts: {
          table: { art: "counter-table", at: [80, 90], s: 1.6 },
          a1: { art: "🍎", at: [-14, 61], s: 0.9 }, a2: { art: "🍎", at: [-14, 61], s: 0.9 }, a3: { art: "🍎", at: [-14, 61], s: 0.9 },
          b1: { art: "🍏", at: [176, 61], s: 0.9 }, b2: { art: "🍏", at: [176, 61], s: 0.9 },
          n3: { art: "n:۳", at: [46, 47], o: 0 }, n2: { art: "n:۲", at: [114, 47], o: 0 },
          plus: { art: "n:+", at: [58, 25], o: 0 }, eq: { art: "n:=", at: [82, 25], o: 0 },
          total: { art: "count:big", at: [95, 25], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "اینجا سه سیب قرمز هست.", do: [
            hops("a1", [-14, 61], [62, 61], 4, 0, 1500, 5), hops("a2", [-14, 61], [46, 61], 3, 600, 1300, 5),
            hops("a3", [-14, 61], [30, 61], 3, 1200, 1100, 5), pop("n3", 2600)
          ] },
          { caption: "آنجا دو سیب سبز هست.", do: [
            hops("b1", [176, 61], [106, 61], 4, 0, 1300, 5), hops("b2", [176, 61], [122, 61], 3, 600, 1100, 5), pop("n2", 2000)
          ] },
          { caption: "سیب‌ها را کنار هم می‌گذاریم.", do: [
            hops("b1", [106, 61], [78, 61], 2, 0, 900, 4), hops("b2", [122, 61], [94, 61], 2, 300, 900, 4),
            { id: "n2", to: { x: 86 }, at: 300, dur: 900 }, { id: "total", to: { o: 1 }, at: 1300, dur: 200 }
          ],
            wait: { tap: ["a3", "a2", "a1", "b1", "b2"], counter: "total", hint: "حالا همه سیب‌ها را بشمار: روی هر سیب بزن.",
              each: [jump("$", 0, 4)] } },
          { caption: "روی هم پنج سیب شد. سه به‌علاوه دو می‌شود پنج.", do: [
            { id: "total", to: { o: 1 }, dur: 200 }, tally("total", 5, 0), pop("total", 300, 0.2),
            { id: "n3", to: { y: 25 }, at: 1300, dur: 800 }, { id: "n2", to: { x: 70, y: 25 }, at: 1300, dur: 800 },
            pop("plus", 2200), pop("eq", 2200)
          ] }
        ] },
      { type: "feed", animal: "🐰", food: "🥕", a: 3, b: 2, prompt: "جواب این جمع را حساب کن و همان‌قدر هویج به خرگوش بده." },
      { type: "feed", animal: "🐿️", food: "🌰", a: 4, b: 3, prompt: "جواب این جمع را حساب کن و همان‌قدر به سنجاب بده." },
      { type: "pairs", prompt: "هر عدد را با نقطه‌هایش جفت کن",
        pairs: [[3, { dots: 3 }], [5, { dots: 5 }], [7, { dots: 7 }], [9, { dots: 9 }]] },
      { type: "feed", animal: "🐔", food: "🌽", a: 5, b: 4, prompt: "جواب این جمع را حساب کن و همان‌قدر ذرت به مرغ بده." },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [3, 6, 8, 12, 15] },
      { type: "pattern", prompt: "دوتا دوتا بشمار. جای خالی را پر کن.", ltr: true, seq: [2, 4, 6, 8, 10], blanks: [3], options: [7, 8, 9] }
    ]
  },

  {
    id: "math-sprout-9", subject: "math", level: "sprout", emoji: "✏️", title: "نوشتن عددها",
    steps: [
      { type: "trace", letter: "۱", prompt: "«۱» را بنویس. از بالا به پایین.", say: "یک. از بالا شروع کن و صاف پایین بیا." },
      { type: "trace", letter: "۲", prompt: "«۲» را بنویس. اول دندانه، بعد پایین.", say: "دو. از بالا، سمت راست شروع کن. یک دندانه بکش و بعد پایین بیا." },
      { type: "trace", letter: "۳", prompt: "«۳» را بنویس. دو دندانه، بعد پایین.", say: "سه. از بالا، سمت راست شروع کن. دو دندانه بکش و بعد پایین بیا." },
      { type: "trace", letter: "۴", prompt: "«۴» را بنویس.", say: "چهار. از بالا، سمت راست شروع کن. دو بار دور بزن و پایین بیا." },
      { type: "trace", letter: "۵", prompt: "«۵» را بنویس. از نوک بالا شروع کن.", say: "پنج. از نوک بالا شروع کن، دور بزن و به همان نوک برگرد." },
      { type: "trace", letter: "۶", prompt: "«۶» را بنویس.", say: "شش. از بالا شروع کن، یک کلاه کوچک بکش و کج پایین بیا." },
      { type: "trace", letter: "۷", prompt: "«۷» و «۸» برعکس هم‌اند. «۷» را بنویس.", say: "هفت. از بالا، سمت راست شروع کن. پایین بیا و دوباره بالا برو." },
      { type: "trace", letter: "۸", prompt: "حالا «۸» را بنویس.", say: "هشت. از پایین، سمت راست شروع کن. بالا برو و دوباره پایین بیا." },
      { type: "trace", letter: "۹", prompt: "«۹» را بنویس. اول سرش، بعد پایین.", say: "نه. اول سر گرد نه را بکش، بعد صاف پایین بیا." },
      { type: "trace", letter: "۰", prompt: "«۰» را بنویس. یک دایره کوچک.", say: "صفر. یک دایره کوچک بکش." }
    ]
  },
  {
    id: "math-sprout-10", subject: "math", level: "sprout", emoji: "👣", title: "قبل و بعد",
    steps: [
      /* Three houses in an alley get their numbers one after another; Zahra walks to her house (۷), back one house
         to ۶ (before) and on past hers to ۸ (after), then home again, between the two. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          bg: { art: "bg-street" },
          h1: { art: "🏠", at: [36, 76], s: 2.3 }, h2: { art: "🏠", at: [80, 76], s: 2.3 }, h3: { art: "🏠", at: [124, 76], s: 2.3 },
          t1: { art: "tag:۶", at: [36, 59], o: 0 }, t2: { art: "tag:۷", at: [80, 59], o: 0 }, t3: { art: "tag:۸", at: [124, 59], o: 0 },
          ring: { art: "ring", at: [80, 54.3], s: 0.75, o: 0 },
          girl: { art: "walker", look: { hair: "long", top: "#5a9a45", bottom: "dress" }, at: [-12, 88], s: 1.3 }
        },
        scenes: [
          { caption: "در کوچه ما هر خانه یک شماره دارد.", do: [pop("t1", 400), pop("t2", 1300), pop("t3", 2200)] },
          { caption: "خانه زهرا شماره هفت است.", do: [
            { id: "girl", walk: [94, 88], dur: 3000 },
            { id: "ring", to: { o: 1 }, at: 3100, dur: 100 }, { id: "ring", draw: true, at: 3100, dur: 800 }
          ] },
          { caption: "قبل از هفت، شش می‌آید.", do: [
            { id: "ring", to: { o: 0 }, dur: 300 }, { id: "girl", to: { flip: -1 }, dur: 300 },
            { id: "girl", walk: [50, 88], at: 300, dur: 2200 }, pop("t1", 2600, 0.3)
          ] },
          { caption: "بعد از هفت، هشت می‌آید.", do: [
            { id: "girl", to: { flip: 1 }, dur: 300 }, { id: "girl", walk: [138, 88], at: 300, dur: 3600 }, pop("t3", 4000, 0.3)
          ] },
          { caption: "هفت بین شش و هشت است.", do: [
            { id: "girl", to: { flip: -1 }, dur: 300 }, { id: "girl", walk: [94, 88], at: 300, dur: 2000 },
            pop("t1", 2500, 0.3), pop("t3", 2500, 0.3),
            { id: "ring", to: { o: 1 }, at: 3200, dur: 100 }, { id: "ring", draw: true, at: 3200, dur: 800 }
          ] }
        ],
        question: "بعد از هفت کدام عدد می‌آید؟", options: ["۶", "۸", "۹"], answer: "۸" },
      { type: "numline", a: 9, b: 1, options: [8, 10, 11] },
      { type: "numline", a: 14, b: -1, thing: "🐇", options: [13, 15, 12] },
      { type: "choose", prompt: "بعد از ۱۲ کدام عدد می‌آید؟", say: "بعد از دوازده کدام عدد می‌آید؟", options: ["۱۱", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "choose", prompt: "قبل از ۱۰ کدام عدد است؟", say: "قبل از ده کدام عدد است؟", options: ["۱۱", "۸", "۹"], answer: "۹" },
      { type: "choose", prompt: "کدام عدد بین ۱۶ و ۱۸ است؟", say: "کدام عدد بین شانزده و هجده است؟", options: ["۱۷", "۱۵", "۱۹"], answer: "۱۷" },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [11, 12, 13, 14, 15] },
      { type: "order", prompt: "از ۱۵ تا ۲۰ پشت سر هم بچین", say: "از پانزده تا بیست پشت سر هم بچین.", ltr: true, items: [15, 16, 17, 18, 19, 20] }
    ]
  },
  {
    id: "math-sprout-11", subject: "math", level: "sprout", emoji: "📖", title: "قصه جمع و تفریق",
    steps: [
      /* Nazanin pulls up three tulips one by one and stands them in the flower box; Arash walks in with two more,
         and they go into the box next to hers. The child counts the box (the question asks how many). */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-garden" },
          f1: { art: "🌷", at: [114, 87], s: 1.1 }, f2: { art: "🌷", at: [128, 87], s: 1.1 }, f3: { art: "🌷", at: [142, 87], s: 1.1 },
          f4: { art: "🌷", at: [184, 82], s: 1.1 }, f5: { art: "🌷", at: [191, 82], s: 1.1 },
          box: { art: "planter", at: [48, 89], s: 1.2 },
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [100, 88], s: 1.2 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [196, 88], s: 1.25, flip: true }
        },
        scenes: [
          { caption: "نازنین سه گل لاله چید.", do: [
            { id: "girl.armF", to: { r: -60 }, at: 200, dur: 400, yoyo: true, times: 2 },
            { id: "f1", to: { y: "-8" }, at: 500, dur: 400 }, hop("f1", [114, 79], [18, 87], 900, 900, 8),
            { id: "girl.armF", to: { r: -60 }, at: 1900, dur: 400, yoyo: true, times: 2 },
            { id: "f2", to: { y: "-8" }, at: 2200, dur: 400 }, hop("f2", [128, 79], [32, 87], 2600, 900, 8),
            { id: "girl.armF", to: { r: -60 }, at: 3600, dur: 400, yoyo: true, times: 2 },
            { id: "f3", to: { y: "-8" }, at: 3900, dur: 400 }, hop("f3", [142, 79], [46, 87], 4300, 900, 8)
          ] },
          { caption: "برادرش آرش دو گل دیگر آورد.", do: [
            { id: "boy", walk: [146, 88], dur: 2400 },
            { id: "f4", to: { x: 134 }, dur: 2400, ease: "linear" }, { id: "f5", to: { x: 141 }, dur: 2400, ease: "linear" }
          ] },
          { caption: "گل‌ها را کنار هم گذاشتند.", do: [
            hop("f4", [134, 82], [60, 87], 300, 1000, 8), hop("f5", [141, 82], [74, 87], 1000, 1000, 8),
            { id: "boy.armF", to: { r: -60 }, at: 200, dur: 500, yoyo: true, times: 4 }
          ] }
        ],
        question: "حالا روی هم چند گل دارند؟", options: ["۴", "۵", "۶"], answer: "۵" },
      // Six sparrows sit in the tree; two flap their wings and fly off the stage; four stay and look round.
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [80, 88], s: 0.95 },
          b1: { art: "sparrow", at: [54, 36], s: 1.3 }, b2: { art: "sparrow", at: [68, 23], s: 1.3, flip: true },
          b3: { art: "sparrow", at: [88, 21], s: 1.3 }, b4: { art: "sparrow", at: [104, 30], s: 1.3, flip: true },
          b5: { art: "sparrow", at: [66, 44], s: 1.3 }, b6: { art: "sparrow", at: [96, 44], s: 1.3 }
        },
        scenes: [
          { caption: "شش گنجشک روی درخت حیاط نشسته بودند." },
          { caption: "دو گنجشک پریدند و رفتند.", do: [
            fly("b6", [96, 44], [176, 6], 300, 1800, 6), fly("b5", [66, 44], [178, -6], 900, 2200, 10)
          ] },
          { caption: "بقیه روی درخت ماندند.", do: [
            { id: "b1", to: { flip: -1 }, at: 200, dur: 300, yoyo: true, times: 2 }, { id: "b4", to: { flip: 1 }, at: 900, dur: 300, yoyo: true, times: 2 },
            jump("b2", 1500, 2), jump("b3", 2000, 2)
          ] }
        ],
        question: "چند گنجشک روی درخت ماند؟", options: ["۳", "۴", "۵"], answer: "۴" },
      /* Grandma's four apples are in the basket; she goes off to the bazaar and comes back with a bag, three apples
         come out of it, and she puts them into the basket with the others. */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-kitchen" }, basketB: { art: "basket-back", at: [56, 87], s: 2 },
          p1: { art: "🍎", at: [23, 69], s: 0.7 }, p2: { art: "🍎", at: [34, 69], s: 0.7 }, p3: { art: "🍎", at: [45, 69], s: 0.7 }, p4: { art: "🍎", at: [56, 69], s: 0.7 },
          p5: { art: "🍎", at: [130, 80], s: 0.7, o: 0 }, p6: { art: "🍎", at: [130, 80], s: 0.7, o: 0 }, p7: { art: "🍎", at: [130, 80], s: 0.7, o: 0 },
          basketF: { art: "basket-front", at: [56, 87], s: 2 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#5a9a45", top: "#b5523b", bottom: "dress" }, at: [140, 88], s: 1.5, flip: true },
          bag: { art: "🛍️", at: [200, 88] }
        },
        scenes: [
          { caption: "مادربزرگ چهار سیب داشت.", do: [jump("p1", 300, 3), jump("p2", 900, 3), jump("p3", 1500, 3), jump("p4", 2100, 3)] },
          { caption: "از بازار سه سیب دیگر هم خرید.", do: [
            { id: "gran", to: { flip: 1 }, dur: 300 }, { id: "gran", walk: [188, 88], at: 300, dur: 1500 },
            { id: "gran", to: { flip: -1 }, at: 2000, dur: 100 },
            { id: "gran", walk: [140, 88], at: 2300, dur: 1800 }, { id: "bag", to: { x: 132 }, at: 2100, dur: 2000, ease: "linear" },
            { id: "bag", to: { x: 124 }, at: 4200, dur: 400 },
            { id: "p5", to: { o: 1 }, at: 4800, dur: 100 }, hop("p5", [124, 80], [116, 88], 4800, 600, 8),
            { id: "p6", to: { o: 1 }, at: 5300, dur: 100 }, hop("p6", [124, 80], [106, 88], 5300, 600, 8),
            { id: "p7", to: { o: 1 }, at: 5800, dur: 100 }, hop("p7", [124, 80], [96, 88], 5800, 600, 8)
          ] },
          { caption: "همه سیب‌ها را در سبد گذاشت.", do: [
            { id: "gran.armF", to: { r: -60 }, dur: 400 },
            hop("p7", [96, 88], [67, 69], 300, 800, 12), hop("p6", [106, 88], [78, 69], 1200, 800, 12), hop("p5", [116, 88], [89, 69], 2100, 800, 12),
            { id: "gran.armF", to: { r: 0 }, at: 3000, dur: 400 }
          ] }
        ],
        question: "حالا مادربزرگ چند سیب دارد؟", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۸ − ۳ = ؟", prompt: "آیلین هشت شیرینی داشت. سه تا را به دوستش داد. چندتا برایش ماند؟",
        say: "آیلین هشت شیرینی داشت. سه تا را به دوستش داد. چندتا برایش ماند؟", options: ["۵", "۶", "۱۱"], answer: "۵" },
      { type: "choose", ltr: true, show: "۴ + ۵ = ؟", prompt: "در اتوبوس چهار نفر بودند. در ایستگاه پنج نفر دیگر سوار شدند. حالا چند نفر در اتوبوس‌اند؟",
        say: "در اتوبوس چهار نفر بودند. در ایستگاه پنج نفر دیگر سوار شدند. حالا چند نفر در اتوبوس‌اند؟", options: ["۸", "۱", "۹"], answer: "۹" },
      { type: "choose", prompt: "هژار ده تیله داشت. چهار تیله را در بازی به برادرش داد. چندتا تیله برایش ماند؟",
        say: "هژار ده تیله داشت. چهار تیله را در بازی به برادرش داد. چندتا تیله برایش ماند؟", options: ["۶", "۱۴", "۷"], answer: "۶" }
    ]
  },
  {
    id: "math-sprout-12", subject: "math", level: "sprout", emoji: "🗓️", title: "صبح، ظهر، شب",
    steps: [
      /* One day of Omid's, in his room: the sky in the window goes from dawn to noon, the sun climbs, and at night
         the moon is out. He gets up and has bread and cheese with his family, comes back from school with his bag
         and has lunch, plays ball with his sister in the park late in the afternoon (orange sky, low sun),
         brushes his teeth and goes to bed. */
      { type: "scene", prompt: "یک روز امید را ببین",
        parts: {
          dawn: { art: "sky-dawn" }, day: { art: "sky-day", o: 0 }, night: { art: "sky-night", o: 0 },
          sun: { art: "sun", at: [64, 52], s: 0.9 }, moon: { art: "moon", at: [92, 18], o: 0 },
          room: { art: "day-room" }, bed: { art: "bed-side", at: [28, 84] },
          sofreh: { art: "sofreh", at: [112, 80], s: 0.9 },
          bread: { art: "🫓", at: [104, 80], s: 0.55 }, cheese: { art: "🧀", at: [119, 80], s: 0.5 }, pot: { art: "🍲", at: [112, 80], s: 0.7, o: 0 },
          dad: { art: "walker", look: { top: "#3f6f8f", bottom: "#5c4a3a" }, at: [80, 86], s: 1.35 },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [146, 86], s: 1.3, flip: true },
          park: { art: "sky-dusk", o: 0 }, lowSun: { art: "sun", at: [118, 52], s: 0.9, o: 0 }, grass: { art: "ground", o: 0 },
          tree1: { art: "plane-tree", at: [16, 66], s: 0.5, o: 0 }, tree2: { art: "plane-tree", at: [146, 64], s: 0.45, o: 0 },
          sister: { art: "walker", look: { hair: "long", top: "#f6b73c", bottom: "dress" }, at: [40, 88], s: 1.1, o: 0 },
          ball: { art: "ball-roll", at: [46, 72], s: 1.1, o: 0 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [46, 71], s: 1.2, r: -90 },
          bag: { art: "🎒", under: "boy", at: [-5, -9], s: 0.45, o: 0 },
          brush: { art: "🪥", at: [86, 67], s: 0.35, o: 0 }, z1: { art: "zz", at: [16, 58], o: 0 }, z2: { art: "zz", at: [22, 54], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "صبح است. امید بیدار می‌شود و با خانواده نان و پنیر می‌خورد.", key: 5300, do: [
            { id: "sun", to: { x: 68, y: 30 }, dur: 2400, ease: "out" },
            { id: "boy", to: { x: 52, y: 88, r: 0 }, at: 1600, dur: 800 }, { id: "boy", walk: [98, 88], at: 2500, dur: 2000 },
            hop("bread", [104, 80], [101, 70], 4700, 500, 3), { id: "bread", to: { s: 0.4 }, at: 5400, dur: 300 },
            hop("bread", [101, 70], [104, 80], 5900, 500, 3)
          ] },
          { caption: "ظهر است. امید از مدرسه برمی‌گردد و ناهار می‌خورد.", hold: 6000, do: [
            { id: "day", to: { o: 1 }, dur: 1400 }, { id: "sun", to: { x: 80, y: 16 }, dur: 2400 },
            { id: "bread", to: { o: 0 }, dur: 400 }, { id: "cheese", to: { o: 0 }, dur: 400 }, { id: "dad", to: { o: 0 }, dur: 400 },
            { id: "boy", to: { o: 0 }, dur: 300 }, { id: "boy", to: { x: 176, flip: -1 }, at: 300, dur: 1 },
            { id: "boy", to: { o: 1 }, at: 400, dur: 100 }, { id: "bag", to: { o: 1 }, at: 400, dur: 100 },
            { id: "boy", walk: [100, 88], at: 500, dur: 2600 }, { id: "bag", to: { o: 0 }, at: 3300, dur: 300 },
            { id: "boy", to: { flip: 1 }, at: 3500, dur: 300 },
            { id: "pot", to: { o: 1 }, at: 3300, dur: 400 }, { emit: "bubble", where: [112, 66], spread: [8, 2], rise: -10, n: 8, at: 3600, dur: 2400 }
          ] },
          { caption: "عصر است. امید با خواهرش در پارک بازی می‌کند.", key: 1800, do: [
            { id: "park", to: { o: 1 }, dur: 900 }, { id: "lowSun", to: { o: 1 }, dur: 900 }, { id: "grass", to: { o: 1 }, dur: 900 },
            { id: "tree1", to: { o: 1 }, dur: 900 }, { id: "tree2", to: { o: 1 }, dur: 900 }, { id: "pot", to: { o: 0 }, dur: 300 },
            { id: "mom", to: { o: 0 }, dur: 300 },
            { id: "boy", to: { x: 110, flip: -1 }, dur: 900 }, { id: "sister", to: { o: 1 }, at: 400, dur: 500 },
            { id: "ball", to: { o: 1 }, at: 700, dur: 200 },
            hop("ball", [46, 72], [104, 72], 1000, 1100, 16), hop("ball", [104, 72], [46, 72], 2400, 1100, 16),
            hop("ball", [46, 72], [104, 72], 3800, 1100, 16)
          ] },
          { caption: "شب است. امید مسواک می‌زند و می‌خوابد.", key: 2600, hold: 7000, do: [
            { id: "park", to: { o: 0 }, dur: 900 }, { id: "lowSun", to: { o: 0 }, dur: 900 }, { id: "grass", to: { o: 0 }, dur: 900 },
            { id: "tree1", to: { o: 0 }, dur: 900 }, { id: "tree2", to: { o: 0 }, dur: 900 },
            { id: "sister", to: { o: 0 }, dur: 400 }, { id: "ball", to: { o: 0 }, dur: 400 },
            { id: "night", to: { o: 1 }, dur: 900 }, { id: "sun", to: { o: 0 }, dur: 600 }, { id: "moon", to: { o: 1 }, at: 600, dur: 600 },
            { id: "boy", to: { x: 80, flip: 1 }, dur: 900 },
            { id: "brush", to: { o: 1 }, at: 1200, dur: 200 }, { id: "brush", to: { x: "+2.5" }, at: 1300, dur: 2400, yoyo: true, times: 10 },
            { id: "brush", to: { o: 0 }, at: 3800, dur: 200 },
            { id: "boy", to: { flip: -1 }, at: 4000, dur: 300 }, { id: "boy", walk: [52, 88], at: 4300, dur: 1200 },
            { id: "boy", to: { x: 46, y: 71, r: -90 }, at: 5600, dur: 800 },
            { id: "z1", to: { o: 1 }, at: 6400, dur: 300 }, { id: "z1", to: { y: "-8" }, at: 6400, dur: 1400 },
            { id: "z2", to: { o: 1 }, at: 6900, dur: 300 }, { id: "z2", to: { y: "-8" }, at: 6900, dur: 1400 }
          ] }
        ],
        question: "امید ناهار را کی خورد؟", pic: true,
        options: [{ label: "🌅", value: "صبح" }, { label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }], answer: "ظهر" },
      { type: "order", prompt: "کارهای امید را از صبح تا شب بچین", say: "کارهای امید را از صبح تا شب به ترتیب بچین.", numbered: true,
        items: [{ pic: "🧀", label: "صبحانه" }, { pic: "🍲", label: "ناهار" }, { pic: "⚽", label: "بازی" }, { pic: "🛏️", label: "خواب" }] },
      { type: "choose", prompt: "کی مسواک می‌زنیم و می‌خوابیم؟", say: "کی مسواک می‌زنیم و می‌خوابیم؟", pic: true,
        options: [{ label: "☀️", value: "ظهر" }, { label: "🌙", value: "شب" }, { label: "🌅", value: "صبح" }], answer: "شب" },
      /* The seven days appear one under another and are counted (seven); an arrow goes down them day by day, and
         on Friday the school's gate slides shut. The column reads the same in English. */
      { type: "scene", prompt: "روزهای هفته", bg: "#fdf3e1",
        parts: {
          school: { art: "🏫", at: [44, 82], s: 2.4, o: 0 }, gate: { art: "gate", at: [72, 82], s: 1.5, o: 0 },
          d1: { art: "day:شنبه", at: [122, 14], o: 0 }, d2: { art: "day:یکشنبه", at: [122, 25], o: 0 },
          d3: { art: "day:دوشنبه", at: [122, 36], o: 0 }, d4: { art: "day:سه‌شنبه", at: [122, 47], o: 0 },
          d5: { art: "day:چهارشنبه", at: [122, 58], o: 0 }, d6: { art: "day:پنجشنبه", at: [122, 69], o: 0 },
          d7: { art: "day:جمعه", at: [122, 80], o: 0 },
          seven: { art: "count:big", at: [60, 50], s: 2, o: 0 }, arrow: { art: "pointer", at: [100, 9.3], o: 0 }
        },
        scenes: [
          { caption: "هفته هفت روز دارد. هفته از شنبه شروع می‌شود.", do: [
            { id: "seven", to: { o: 1 }, at: 300, dur: 200 },
            pop("d1", 300), tally("seven", 1, 300), pop("d2", 800), tally("seven", 2, 800), pop("d3", 1300), tally("seven", 3, 1300),
            pop("d4", 1800), tally("seven", 4, 1800), pop("d5", 2300), tally("seven", 5, 2300), pop("d6", 2800), tally("seven", 6, 2800),
            pop("d7", 3300), tally("seven", 7, 3300),
            { id: "arrow", to: { o: 1 }, at: 4300, dur: 300 }, pop("d1", 4500, 0.15)
          ] },
          { caption: "بعد یکشنبه، دوشنبه و سه‌شنبه می‌آیند.", do: [
            { id: "seven", to: { o: 0 }, dur: 400 },
            { id: "arrow", to: { y: 20.3 }, at: 300, dur: 500 }, pop("d2", 800, 0.15),
            { id: "arrow", to: { y: 31.3 }, at: 1700, dur: 500 }, pop("d3", 2200, 0.15),
            { id: "arrow", to: { y: 42.3 }, at: 3100, dur: 500 }, pop("d4", 3600, 0.15)
          ] },
          { caption: "بعد چهارشنبه و پنجشنبه.", do: [
            { id: "arrow", to: { y: 53.3 }, at: 300, dur: 500 }, pop("d5", 800, 0.15),
            { id: "arrow", to: { y: 64.3 }, at: 1700, dur: 500 }, pop("d6", 2200, 0.15)
          ] },
          { caption: "روز آخر هفته جمعه است. جمعه مدرسه‌ها تعطیل‌اند.", do: [
            { id: "arrow", to: { y: 75.3 }, at: 300, dur: 500 }, pop("d7", 800, 0.15),
            { id: "school", to: { o: 1 }, at: 1600, dur: 500 }, { id: "gate", to: { o: 1 }, at: 2200, dur: 200 },
            { id: "gate", to: { x: 44 }, at: 2400, dur: 1400, ease: "out" }
          ] }
        ] },
      { type: "order", prompt: "روزهای هفته را از شنبه بچین", say: "روزهای هفته را از شنبه به ترتیب بچین.", numbered: true,
        items: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه"] },
      { type: "choose", prompt: "بعد از دوشنبه چه روزی است؟", say: "بعد از دوشنبه چه روزی است؟", options: ["یکشنبه", "سه‌شنبه", "جمعه"], answer: "سه‌شنبه" },
      { type: "choose", prompt: "قبل از جمعه چه روزی است؟", say: "قبل از جمعه چه روزی است؟", options: ["پنجشنبه", "شنبه", "چهارشنبه"], answer: "پنجشنبه" }
    ]
  },
  {
    id: "math-sprout-13", subject: "math", level: "sprout", emoji: "🎈", title: "بازی عددها تا بیست",
    steps: [
      { type: "feed", animal: "🐑", food: "🌿", n: 12, prompt: "گوسفند گرسنه است. دوازده تا علف به او بده." },
      { type: "pairs", prompt: "دو دست یعنی ده انگشت. هر عدد را با دست‌ها و نقطه‌هایش جفت کن.",
        pairs: [[13, { pic: "🙌", dots: 3, say: "ده و سه" }], [16, { pic: "🙌", dots: 6, say: "ده و شش" }],
          [11, { pic: "🙌", dots: 1, say: "ده و یک" }], [18, { pic: "🙌", dots: 8, say: "ده و هشت" }]] },
      { type: "pattern", prompt: "یکی یکی بشمار. جای خالی را پر کن.", ltr: true, seq: [11, 12, 13, 14, 15], blanks: [2], options: [12, 13, 14] },
      { type: "feed", animal: "🐴", food: "🥕", a: 10, b: 5, prompt: "جواب این جمع را حساب کن و همان‌قدر هویج به اسب بده." },
      { type: "pattern", prompt: "از بیست برعکس بشمار. جاهای خالی را پر کن.", ltr: true, seq: [20, 19, 18, 17, 16], blanks: [1, 3], options: [17, 19, 15] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با دست‌ها و نقطه‌هایش جفت کن.",
        pairs: [[{ label: 12, say: "دوازده" }, { pic: "🙌", dots: 2, say: "ده و دو" }], [{ label: 15, say: "پانزده" }, { pic: "🙌", dots: 5, say: "ده و پنج" }],
          [{ label: 17, say: "هفده" }, { pic: "🙌", dots: 7, say: "ده و هفت" }]] },
      { type: "pattern", prompt: "دوتا دوتا تا بیست بشمار. جاهای خالی را پر کن.", ltr: true, seq: [10, 12, 14, 16, 18, 20], blanks: [2, 4], options: [14, 15, 18, 19] }
    ]
  },
  {
    id: "math-sprout-22", subject: "math", level: "sprout", emoji: "🍪", title: "بازی تفریق",
    steps: [
      { type: "feed", animal: "🐰", food: "🥕", n: 5, max: 9, prompt: "خرگوش هشت هویج داشت. سه تا را صبح خورد. بقیه را برای شب در بشقابش بگذار." },
      { type: "pairs", prompt: "هر تفریق را با جوابش جفت کن", say: "هر تفریق را با جوابش جفت کن.", pairs: [["۹ − ۴", 5], ["۷ − ۵", 2], ["۶ − ۳", 3], ["۱۰ − ۱", 9]] },
      { type: "sort", prompt: "جواب کدام ۳ می‌شود؟ کدام ۵؟", say: "هر تفریق را در سبد جوابش بگذار: سه یا پنج.",
        baskets: [{ label: 3, value: "3" }, { label: 5, value: "5" }],
        items: [{ label: "۸ − ۵", basket: "3" }, { label: "۷ − ۲", basket: "5" }, { label: "۴ − ۱", basket: "3" }, { label: "۱۰ − ۵", basket: "5" }, { label: "۹ − ۶", basket: "3" }, { label: "۶ − ۱", basket: "5" }] },
      { type: "feed", animal: "🐔", food: "🌽", n: 4, max: 8, prompt: "مرغ هفت ذرت می‌خواست. سه تا را خورده است. چندتا مانده؟ همان‌قدر بده." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر تفریق را با جوابش جفت کن.", pairs: [["۸ − ۴", 4], ["۵ − ۵", 0], ["۱۰ − ۳", 7]] },
      { type: "feed", animal: "🐑", food: "🌿", n: 6, max: 10, prompt: "ده تا علف بود. بزغاله چهار تا را خورد. بقیه را به گوسفند بده." }
    ]
  },
  {
    id: "math-sprout-23", subject: "math", level: "sprout", emoji: "🔢", title: "نوشتن عددهای تا بیست",
    steps: [
      { type: "trace", letter: "۱", prompt: "ده را می‌نویسیم: اول «۱» برای یک دسته ده‌تایی. «۱» را بنویس.", say: "ده را می‌نویسیم. اول یک، برای یک دسته ده‌تایی." },
      { type: "trace", letter: "۰", prompt: "بعد «۰»، چون یکی تنها نداریم: ۱۰.", say: "بعد صفر، چون یکی تنها نداریم. یک و صفر: ده." },
      { type: "choose", ltr: true, show: "🔟 + 🍎🍎🍎🍎", prompt: "یک دسته ده‌تایی و چهار تا. کدام عدد است؟", say: "یک دسته ده‌تایی و چهار تا. کدام عدد است؟", options: ["۴۱", "۱۴", "۱۰۴"], answer: "۱۴" },
      { type: "trace", letter: "۱", prompt: "هفده را بنویس: اول «۱» برای ده.", say: "هفده را بنویس. اول یک، برای ده." },
      { type: "trace", letter: "۷", prompt: "بعد «۷» برای هفت تا: ۱۷.", say: "بعد هفت، برای هفت تا. یک و هفت: هفده." },
      { type: "choose", ltr: true, prompt: "گوش کن: کدام عدد را گفتم؟", say: "هجده. کدام عدد را گفتم؟", options: ["۸", "۸۱", "۱۸"], answer: "۱۸" },
      { type: "choose", ltr: true, prompt: "گوش کن: کدام عدد را گفتم؟", say: "دوازده. کدام عدد را گفتم؟", options: ["۱۲", "۲۱", "۲"], answer: "۱۲" },
      { type: "paper", text: "عددهای ۱۰ تا ۲۰ را به ترتیب در دفترت بنویس.", example: "۱۰  ۱۱  ۱۲  ۱۳  ۱۴  ۱۵  ۱۶  ۱۷  ۱۸  ۱۹  ۲۰", lang: "fa",
        check: ["همه عددها به ترتیب نوشته شده‌اند؟", "در هر عدد، اول «۱» آمده و بعد رقم یکان؟", "«۲۰» درست نوشته شده است؟"] }
    ]
  },
  {
    id: "math-sprout-24", subject: "math", level: "sprout", emoji: "🛍️", title: "شمردن رو به جلو",
    steps: [
      /* Counting on: eight apples are already in the bag (the number stays in our head), three more go in one at a time
         and the count goes on from eight. */
      (function () {
        var parts = { bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 92], s: 2.1 },
          bag: { art: "🛍️", at: [52, 56], s: 2 }, tag: { art: "tag:۸", at: [52, 22], s: 1.6 }, num: { art: "count:big", at: [120, 30], s: 1.8, o: 0 } };
        var A = [[104, 54], [120, 54], [136, 54]];
        A.forEach(function (p, i) { parts["a" + i] = { art: "🍎", at: p, s: 0.8 }; });
        var on = [tally("num", 8, 0), { id: "num", to: { o: 1 }, dur: 300 }];
        A.forEach(function (p, i) { on.push(hop("a" + i, p, [52, 38], 1200 + i * 1300, 900, 10), { id: "a" + i, to: { o: 0 }, at: 2100 + i * 1300, dur: 200 }, tally("num", 9 + i, 2100 + i * 1300)); });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "در کیسه هشت سیب هست. سه سیب دیگر هم روی میز است.", do: [jump("bag", 300, 2), jump("a0", 1200, 3), jump("a1", 1600, 3), jump("a2", 2000, 3)] },
            { caption: "لازم نیست از یک بشماریم. هشت را در ذهن نگه می‌داریم و جلو می‌شماریم: هشت… نه، ده، یازده.", key: 3600, do: on },
            { caption: "هشت به اضافه سه می‌شود یازده." }
          ],
          question: "حالا چند سیب در کیسه است؟", options: [10, 11, 12], answer: 11 };
      })(),
      { type: "numline", a: 8, b: 3, options: [10, 11, 12] },
      { type: "numline", a: 6, b: 4, options: [9, 10, 11] },
      { type: "choose", ltr: true, show: "۲ + ۹ = ؟", prompt: "برای جمع، از کدام عدد شروع کنیم که زودتر برسیم؟", say: "دو به اضافه نه. از کدام عدد شروع کنیم که زودتر برسیم؟", options: ["۲", "۹"], answer: "۹" },
      { type: "choose", ltr: true, show: "۹ + ۴ = ؟", prompt: "از نه جلو بشمار: ده، یازده، … جواب چند است؟", say: "از نه جلو بشمار: ده، یازده، دوازده، سیزده. جواب چند است؟", options: ["۱۲", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "numline", a: 12, b: 5, options: [16, 17, 18] },
      { type: "choose", ltr: true, show: "۳ + ۱۵ = ؟", prompt: "از عدد بزرگ‌تر جلو بشمار. جواب چند است؟", say: "سه به اضافه پانزده. از عدد بزرگ‌تر جلو بشمار. جواب چند است؟", options: ["۱۷", "۱۸", "۱۹"], answer: "۱۸" }
    ]
  },
  {
    id: "math-sprout-25", subject: "math", level: "sprout", emoji: "🐇", title: "شمردن رو به عقب",
    steps: [
      { type: "numline", a: 12, b: -3, options: [8, 9, 10] },
      { type: "choose", ltr: true, show: "۱۵ − ۲ = ؟", prompt: "از پانزده عقب بشمار: چهارده، سیزده. جواب چند است؟", say: "از پانزده دو تا عقب بشمار: چهارده، سیزده. جواب چند است؟", options: ["۱۲", "۱۳", "۱۷"], answer: "۱۳" },
      { type: "numline", a: 17, b: -4, options: [12, 13, 14] },
      { type: "choose", ltr: true, show: "۱۲ − ۹ = ؟", prompt: "۹ به ۱۲ نزدیک است. از ۹ جلو بشمار تا ۱۲: ده، یازده، دوازده. چند قدم شد؟", say: "نه به دوازده نزدیک است. از نه جلو بشمار تا دوازده: ده، یازده، دوازده. چند قدم شد؟",
        options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "numline", a: 9, b: 3, options: [11, 12, 13], prompt: "قورباغه روی ۹ است و سه خانه جلو می‌پرد. به کجا می‌رسد؟ پس از ۹ تا آن‌جا سه خانه است.", say: "قورباغه روی نه است و سه خانه جلو می‌پرد. به کجا می‌رسد؟" },
      { type: "choose", ltr: true, show: "۱۴ − ۱۱ = ؟", prompt: "از یازده جلو بشمار تا چهارده. جواب چند است؟", say: "چهارده منهای یازده. از یازده جلو بشمار تا چهارده. جواب چند است؟", options: ["۲", "۳", "۵"], answer: "۳" },
      { type: "choose", ltr: true, show: "۱۱ − ۲ = ؟", prompt: "دو تا عقب بشمار. جواب چند است؟", say: "یازده منهای دو. دو تا عقب بشمار: ده، نه. جواب چند است؟", options: ["۸", "۹", "۱۳"], answer: "۹" }
    ]
  },
  {
    id: "math-sprout-26", subject: "math", level: "sprout", emoji: "🦋", title: "دوتایی‌ها تا بیست",
    steps: [
      /* Doubles: a butterfly's two wings get the same spots, three and three, then four and four. */
      (function () {
        var L = [[68, 36], [60, 42], [68, 54], [64, 61]], Rt = L.map(function (p) { return [160 - p[0], p[1]]; });
        var parts = { bg: { art: "bg-garden" }, fly: { art: "🦋", at: [80, 78], s: 3.4 } };
        L.forEach(function (p, i) { parts["l" + i] = { art: "counter-b", at: p, s: 1.3, o: 0 }; parts["r" + i] = { art: "counter-b", at: Rt[i], s: 1.3, o: 0 }; });
        function spots(n, at) { var o = []; for (var i = 0; i < n; i++) o.push(pop("l" + i, at + i * 400, 0.2), pop("r" + i, at + i * 400 + 200, 0.2)); return o; }
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "پروانه دو بال دارد. روی هر بال سه خال هست: سه و سه، شش.", do: spots(3, 400) },
            { caption: "یک خال دیگر روی هر بال: چهار و چهار، هشت. وقتی دو عدد یکی‌اند، به آن دوتایی می‌گوییم.", do: [pop("l3", 400, 0.2), pop("r3", 800, 0.2)] }
          ],
          question: "چهار و چهار چند می‌شود؟", options: [6, 8, 9], answer: 8 };
      })(),
      { type: "tenframe", n: 5, plus: 5, options: [9, 10, 11] },
      { type: "pairs", prompt: "هر دوتایی را با جوابش جفت کن", say: "هر دوتایی را با جوابش جفت کن.", pairs: [["۶ + ۶", 12], ["۲ + ۲", 4], ["۷ + ۷", 14], ["۹ + ۹", 18]] },
      { type: "tenframe", n: 8, plus: 8, options: [15, 16, 17] },
      { type: "choose", ltr: true, show: "۶ + ۷ = ۶ + ۶ + ۱", prompt: "شش و شش می‌شود دوازده. پس شش و هفت چند می‌شود؟", say: "شش و شش می‌شود دوازده. شش و هفت یکی بیشتر است. چند می‌شود؟", options: ["۱۲", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "choose", ltr: true, show: "۱۰ + ۱۰ = ؟", prompt: "ده انگشت تو و ده انگشت مامان: روی هم چندتا؟", say: "ده انگشت تو و ده انگشت مامان. روی هم چندتا؟", options: ["۱۰", "۲۰", "۱۱۰"], answer: "۲۰" },
      { type: "choose", ltr: true, show: "۸ + ۹ = ؟", prompt: "هشت و هشت شانزده است. هشت و نه چند است؟", say: "هشت و هشت شانزده است. هشت و نه چند است؟", options: ["۱۶", "۱۷", "۱۸"], answer: "۱۷" }
    ]
  },
  {
    id: "math-sprout-27", subject: "math", level: "sprout", emoji: "🔄", title: "جابه‌جا کن، فرقی نمی‌کند",
    steps: [
      { type: "choose", ltr: true, show: "🍎🍎 + 🍐🍐🍐🍐🍐🍐🍐", prompt: "دو سیب و هفت گلابی، یا هفت گلابی و دو سیب: روی هم فرقی دارد؟", say: "دو سیب و هفت گلابی، یا هفت گلابی و دو سیب. روی هم چندتاست؟", options: ["۸", "۹", "۱۰"], answer: "۹" },
      { type: "choose", ltr: true, show: "۲ + ۷ = ۷ + ؟", prompt: "جای عددها را عوض کردیم. جای «؟» چه عددی است؟", say: "دو به اضافه هفت، مساوی هفت به اضافه چند؟", options: ["۲", "۵", "۹"], answer: "۲" },
      { type: "choose", ltr: true, show: "۳ + ۱۰ = ؟", prompt: "از ده شروع کن و سه تا جلو برو. جواب چند است؟", say: "سه به اضافه ده. از ده شروع کن و سه تا جلو برو.", options: ["۱۲", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "tenframe", n: 6, plus: 4, prompt: "شش و چهار، ده می‌شود. یک قاب پر!", options: [9, 10, 11] },
      { type: "choose", ltr: true, show: "۷ + ۵ + ۳ = ؟", prompt: "اول دو عددی را جمع کن که ده می‌شوند: ۷ و ۳. بعد ۵ را اضافه کن.", say: "هفت و پنج و سه. اول هفت و سه را جمع کن، ده می‌شود. بعد پنج را اضافه کن.", options: ["۱۴", "۱۵", "۱۶"], answer: "۱۵" },
      { type: "choose", ltr: true, show: "۴ + ۸ + ۶ = ؟", prompt: "کدام دو عدد ده می‌شوند؟ با آن‌ها شروع کن.", say: "چهار و هشت و شش. کدام دو عدد ده می‌شوند؟ با آن‌ها شروع کن.", options: ["۱۶", "۱۸", "۲۰"], answer: "۱۸" },
      { type: "choose", ltr: true, show: "۵ + ۴ = ۴ + ۵", prompt: "این جمله درست است یا نادرست؟", say: "پنج به اضافه چهار، مساوی چهار به اضافه پنج. درست است یا نادرست؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "درست" }
    ]
  },
  {
    id: "math-sprout-28", subject: "math", level: "sprout", emoji: "🎯", title: "بازی جمع تا بیست",
    steps: [
      { type: "pairs", prompt: "هر جمع را با جوابش جفت کن", say: "هر جمع را با جوابش جفت کن. از عدد بزرگ‌تر جلو بشمار.", pairs: [["۸ + ۳", 11], ["۱۰ + ۷", 17], ["۱۲ + ۴", 16], ["۵ + ۱۴", 19]] },
      { type: "sort", prompt: "دوتایی‌ها یک طرف، بقیه یک طرف", say: "جمع‌هایی که دو عدد یکسان دارند را در یک سبد بگذار، و بقیه را در سبد دیگر.",
        baskets: [{ label: "دوتایی", pic: "🦋", value: "double" }, { label: "دوتایی نیست", pic: "🔀", value: "no" }],
        items: [{ label: "۶ + ۶", basket: "double" }, { label: "۷ + ۸", basket: "no" }, { label: "۹ + ۹", basket: "double" }, { label: "۵ + ۳", basket: "no" }, { label: "۸ + ۸", basket: "double" }, { label: "۴ + ۲", basket: "no" }] },
      { type: "feed", animal: "🐿️", food: "🌰", n: 12, max: 15, prompt: "سنجاب نه فندق خورد و سه تای دیگر می‌خواهد. همه فندق‌هایی را که می‌خورد روی بشقاب بگذار: نه و سه." },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر جمع را با جمعی جفت کن که همان جواب را دارد.", pairs: [["۳ + ۸", "۸ + ۳"], ["۷ + ۷", "۱۰ + ۴"], ["۹ + ۱", "۵ + ۵"]] },
      { type: "sort", prompt: "جواب کدام ۱۲ می‌شود؟ کدام ۱۵؟", say: "هر جمع را در سبد جوابش بگذار: دوازده یا پانزده.",
        baskets: [{ label: 12, value: "12" }, { label: 15, value: "15" }],
        items: [{ label: "۶ + ۶", basket: "12" }, { label: "۸ + ۷", basket: "15" }, { label: "۹ + ۳", basket: "12" }, { label: "۱۰ + ۵", basket: "15" }, { label: "۴ + ۸", basket: "12" }, { label: "۱۳ + ۲", basket: "15" }] },
      { type: "feed", animal: "🐔", food: "🌽", n: 14, max: 17, prompt: "مرغ هفت ذرت صبح و هفت ذرت عصر می‌خورد. همه را روی بشقاب بگذار: هفت و هفت." }
    ]
  },
  {
    id: "math-sprout-29", subject: "math", level: "sprout", emoji: "⚖️", title: "ترازوی برابر",
    steps: [
      { type: "balance", left: [5], right: [2], open: "right", tray: [3, 1, 2], unit: "",
        prompt: "در یک کفه ۵ است و در کفه دیگر ۲. وزنه بگذار تا دو کفه برابر شوند.", question: "پس ۵ مساوی ۲ به اضافه چند است؟", options: [2, 3, 4], answer: 3 },
      { type: "choose", ltr: true, show: "۵ = ۲ + ۳", prompt: "«=» یعنی دو طرف به یک اندازه‌اند. این جمله درست است یا نادرست؟", say: "پنج مساوی دو به اضافه سه. درست است یا نادرست؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "درست" },
      { type: "balance", left: [4, 1], right: [3], open: "right", tray: [2, 1, 1], unit: "",
        prompt: "در یک کفه ۴ و ۱ است. در کفه دیگر ۳. وزنه بگذار تا برابر شوند.", question: "۴ + ۱ مساوی ۳ به اضافه چند است؟", options: [1, 2, 3], answer: 2 },
      { type: "choose", ltr: true, show: "۵ + ۲ = ۸", prompt: "این جمله درست است یا نادرست؟", say: "پنج به اضافه دو مساوی هشت. درست است یا نادرست؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "نادرست" },
      { type: "choose", ltr: true, show: "۶ = ۶", prompt: "این جمله درست است یا نادرست؟", say: "شش مساوی شش. درست است یا نادرست؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "درست" },
      { type: "choose", ltr: true, show: "۴ + ۱ = ۳ + ۲", prompt: "این جمله درست است یا نادرست؟", say: "چهار به اضافه یک، مساوی سه به اضافه دو. درست است یا نادرست؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "درست" }
    ]
  },
  {
    id: "math-sprout-30", subject: "math", level: "sprout", emoji: "❓", title: "عدد گم‌شده",
    steps: [
      { type: "balance", left: [3, { pic: "🎁", mass: 4, label: "؟", say: "جعبه" }], right: [], open: "right", tray: [5, 2, 1, 1, 1, 1], unit: "",
        prompt: "در یک کفه ۳ و یک جعبه است. وزن جعبه را نمی‌دانیم. وزنه بگذار تا ترازو صاف شود.",
        question: "روی هم ۷ شد. پس جعبه چقدر است؟", options: [3, 4, 7], answer: 4 },
      { type: "choose", ltr: true, show: "۳ + ؟ = ۷", prompt: "سه و چند می‌شود هفت؟", say: "سه و چند می‌شود هفت؟", options: ["۳", "۴", "۱۰"], answer: "۴" },
      { type: "tenframe", n: 6, missing: true, prompt: "۶ + ؟ = ۱۰ : چندتا لازم است تا قاب پر شود؟", options: [3, 4, 5] },
      { type: "choose", ltr: true, show: "؟ − ۲ = ۵", prompt: "از یک عدد دو تا برداشتیم و پنج تا ماند. اول چندتا بود؟", say: "از یک عدد دو تا برداشتیم و پنج تا ماند. اول چندتا بود؟", options: ["۳", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "🍎🍎🍎🍎🍎 🥣", prompt: "هشت سیب بود. پنج تا پیداست. چندتا زیر کاسه است؟ ۵ + ؟ = ۸", say: "هشت سیب بود. پنج تا پیداست. پنج و چند می‌شود هشت؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "balance", left: [{ pic: "🎁", mass: 6, label: "؟", say: "جعبه" }, 2], right: [], open: "right", tray: [5, 2, 1, 1, 1], unit: "",
        prompt: "یک جعبه و ۲. وزنه بگذار تا ترازو صاف شود.", question: "روی هم ۸ شد. پس جعبه چقدر است؟", options: [5, 6, 8], answer: 6 },
      { type: "choose", ltr: true, show: "؟ + ۴ = ۹", prompt: "چند و چهار می‌شود نه؟", say: "چند و چهار می‌شود نه؟", options: ["۴", "۵", "۱۳"], answer: "۵" }
    ]
  },
  {
    id: "math-sprout-31", subject: "math", level: "sprout", emoji: "⚡", title: "زود و درست تا ده",
    steps: [
      { type: "choose", ltr: true, show: "۷ + ۰ = ؟", prompt: "صفر چیزی اضافه نمی‌کند. جواب چند است؟", say: "هفت به اضافه صفر.", options: ["۰", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۶ + ۱ = ؟", prompt: "به اضافه یک، یعنی عدد بعدی. جواب چند است؟", say: "شش به اضافه یک. عدد بعد از شش.", options: ["۵", "۷", "۸"], answer: "۷" },
      { type: "choose", ltr: true, show: "۵ + ۲ = ؟", prompt: "به اضافه دو، یعنی دو عدد جلوتر. جواب چند است؟", say: "پنج به اضافه دو. شش، هفت.", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "sort", prompt: "کدام ده می‌شود؟", say: "جمع‌هایی که ده می‌شوند در یک سبد، و بقیه در سبد دیگر.",
        baskets: [{ label: "ده می‌شود", pic: "🔟", value: "ten" }, { label: "ده نمی‌شود", pic: "❌", value: "no" }],
        items: [{ label: "۷ + ۳", basket: "ten" }, { label: "۶ + ۳", basket: "no" }, { label: "۸ + ۲", basket: "ten" }, { label: "۵ + ۴", basket: "no" }, { label: "۴ + ۶", basket: "ten" }, { label: "۹ + ۲", basket: "no" }] },
      { type: "pairs", prompt: "هر جمع را با جوابش جفت کن، زود و درست", say: "هر جمع را با جوابش جفت کن.", pairs: [["۴ + ۴", 8], ["۹ + ۱", 10], ["۳ + ۲", 5], ["۶ + ۰", 6]] },
      { type: "choose", ltr: true, show: "۸ − ۲ = ؟", prompt: "دو تا عقب: هفت، شش. جواب چند است؟", say: "هشت منهای دو.", options: ["۵", "۶", "۱۰"], answer: "۶" },
      { type: "choose", ltr: true, show: "۱۰ − ۴ = ؟", prompt: "چهار و چند می‌شود ده؟", say: "ده منهای چهار. چهار و چند می‌شود ده؟", options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر حساب را با جوابش جفت کن.", pairs: [["۵ + ۵", 10], ["۹ − ۱", 8], ["۳ + ۳", 6]] }
    ]
  },
  {
    id: "math-sprout-32", subject: "math", level: "sprout", emoji: "🧠", title: "تفریق با فکر جمع",
    steps: [
      { type: "choose", ltr: true, show: "۹ − ۶ = ؟", prompt: "به جای کم کردن فکر کن: شش و چند می‌شود نه؟", say: "نه منهای شش. فکر کن: شش و چند می‌شود نه؟", options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "tenframe", n: 7, missing: true, prompt: "۱۰ − ۷ = ؟ : هفت و چند می‌شود ده؟", options: [2, 3, 4] },
      { type: "choose", ltr: true, show: "۸ − ۵ = ؟", prompt: "پنج و چند می‌شود هشت؟", say: "هشت منهای پنج. پنج و چند می‌شود هشت؟", options: ["۲", "۳", "۱۳"], answer: "۳" },
      { type: "choose", prompt: "این سه عدد یک خانواده‌اند: ۳، ۴ و ۷. کدام جمله از این خانواده نیست؟", say: "سه، چهار و هفت یک خانواده‌اند. کدام جمله از این خانواده نیست؟", stack: true, ltr: true,
        options: ["۳ + ۴ = ۷", "۷ − ۳ = ۴", "۷ + ۴ = ۱۱"], answer: "۷ + ۴ = ۱۱" },
      { type: "tenframe", n: 4, missing: true, prompt: "۱۰ − ۴ = ؟ : چهار و چند می‌شود ده؟", options: [5, 6, 7] },
      { type: "choose", ltr: true, show: "۲ + ۶ = ۸", prompt: "از این جمع، کدام تفریق را می‌شود فهمید؟", say: "دو به اضافه شش مساوی هشت. کدام تفریق درست است؟", stack: true, options: ["۸ − ۶ = ۲", "۸ − ۶ = ۴", "۶ − ۲ = ۸"], answer: "۸ − ۶ = ۲" },
      { type: "choose", ltr: true, show: "۱۳ − ۹ = ؟", prompt: "نه و چند می‌شود سیزده؟ (نه و یک، ده؛ ده و سه، سیزده)", say: "سیزده منهای نه. نه و چند می‌شود سیزده؟", options: ["۳", "۴", "۵"], answer: "۴" }
    ]
  },
  {
    id: "math-sprout-33", subject: "math", level: "sprout", emoji: "🔵", title: "چندتا بیشتر؟",
    steps: [
      /* Comparing: Ali's seven marbles and Sara's four are put in two rows, one under the other; the three left over
         are how many more Ali has. */
      (function () {
        var parts = { bg: { art: "day-room" }, rug: { art: "rug-side", at: [80, 88], s: 1.6 } };
        var top = [], bot = [];
        for (var i = 0; i < 7; i++) { top.push([30 + i * 15, 66]); parts["a" + i] = { art: "counter-b", at: [20 + (i % 4) * 9, 50 + Math.floor(i / 4) * 8], s: 1.3 }; }
        for (var j = 0; j < 4; j++) { bot.push([30 + j * 15, 80]); parts["s" + j] = { art: "counter-r", at: [130 + (j % 2) * 9, 50 + Math.floor(j / 2) * 8], s: 1.3 }; }
        parts.ring = { art: "ring", at: [105, 66], s: 1.2, sx: 2.2, o: 0 };
        var line = [];
        top.forEach(function (p, i) { line.push(hop("a" + i, [20 + (i % 4) * 9, 50 + Math.floor(i / 4) * 8], p, 300 + i * 250, 700, 6)); });
        bot.forEach(function (p, j) { line.push(hop("s" + j, [130 + (j % 2) * 9, 50 + Math.floor(j / 2) * 8], p, 2300 + j * 300, 800, 6)); });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "این‌جا تیله‌های آبی هست و تیله‌های قرمز. کدام بیشتر است؟ چندتا بیشتر؟", do: [jump("a0", 400, 2), jump("s0", 900, 2)] },
            { caption: "تیله‌ها را در دو ردیف می‌چینیم: زیر هر تیله آبی، یک تیله قرمز.", do: line },
            { caption: "سه تیله آبی تنها مانده‌اند. پس آبی‌ها سه تا بیشترند: هفت منهای چهار، سه.", do: [{ id: "ring", to: { o: 1 }, dur: 200 }, { id: "ring", draw: true, dur: 900 }] }
          ],
          question: "تیله‌های قرمز چندتا کمترند؟", options: [3, 4, 7], answer: 3 };
      })(),
      { type: "compare", match: true, a: 8, thing: "🧒", b: 5, thing2: "🍎", ask: "more", names: ["بچه‌ها", "سیب‌ها"],
        prompt: "به هر بچه یک سیب بده: روی سیب‌ها بزن.", say: "به هر بچه یک سیب بده. روی سیب‌ها بزن." },
      { type: "choose", ltr: true, show: "۸ − ۵ = ؟", prompt: "هشت بچه و پنج سیب. چند بچه بی‌سیب ماندند؟", say: "هشت بچه و پنج سیب. چند بچه بی‌سیب ماندند؟", options: ["۲", "۳", "۱۳"], answer: "۳" },
      { type: "compare", match: true, a: 4, thing: "🐶", b: 9, thing2: "🦴", spread: "tight", ask: "less", names: ["سگ‌ها", "استخوان‌ها"],
        prompt: "به هر سگ یک استخوان بده: روی استخوان‌ها بزن.", say: "به هر سگ یک استخوان بده. روی استخوان‌ها بزن." },
      { type: "choose", ltr: true, prompt: "چهار سگ و نه استخوان. چندتا استخوان اضافه آمد؟", say: "چهار سگ و نه استخوان. چندتا استخوان اضافه آمد؟", options: ["۴", "۵", "۱۳"], answer: "۵" },
      { type: "choose", prompt: "نیما ۱۲ کارت دارد و مینا ۹ کارت. مینا چندتا کمتر دارد؟", say: "نیما دوازده کارت دارد و مینا نه کارت. مینا چندتا کمتر دارد؟", options: ["۲", "۳", "۲۱"], answer: "۳" },
      { type: "choose", prompt: "کدام جمله می‌گوید «چندتا بیشتر»؟ آرش ۱۰ گردو دارد و رها ۶ گردو.", say: "آرش ده گردو دارد و رها شش گردو. آرش چندتا بیشتر دارد؟ کدام جمله درست است؟", stack: true, ltr: true,
        options: ["۱۰ + ۶ = ۱۶", "۱۰ − ۶ = ۴", "۶ − ۴ = ۲"], answer: "۱۰ − ۶ = ۴" }
    ]
  },
  {
    id: "math-sprout-34", subject: "math", level: "sprout", emoji: "📚", title: "قصه‌های تا بیست",
    steps: [
      /* Twelve ducks are in the pool (two rows of six) and two more really swim in. */
      (function () {
        var parts = { bg: { art: "bg-garden" } };
        for (var i = 0; i < 12; i++) parts["d" + i] = { art: "🦆", at: [22 + (i % 6) * 15, i < 6 ? 72 : 86], s: 0.75 };
        parts.d12 = { art: "🦆", at: [190, 72], s: 0.75, flip: true }; parts.d13 = { art: "🦆", at: [204, 86], s: 0.75, flip: true };
        var hello = []; for (var k = 0; k < 12; k++) hello.push(jump("d" + k, 300 + k * 150, 2));
        return { type: "scene", prompt: "به قصه گوش کن و جواب بده", parts: parts,
          scenes: [
            { caption: "دوازده اردک در باغ بودند: دو ردیف شش‌تایی.", do: hello },
            { caption: "دو اردک دیگر هم آمدند.", do: [{ id: "d12", to: { x: 124 }, dur: 2600 }, { id: "d13", to: { x: 124 }, at: 400, dur: 2800 }] }
          ],
          question: "حالا چند اردک در باغ است؟", options: [13, 14, 10], answer: 14 };
      })(),
      { type: "choose", ltr: true, prompt: "در قفسه ۱۵ کتاب بود. مریم ۶ کتاب برداشت. چند کتاب ماند؟ اول یک شکل بکش: ۱۵ دایره، ۶ تا را خط بزن.", say: "در قفسه پانزده کتاب بود. مریم شش کتاب برداشت. چند کتاب ماند؟", options: ["۸", "۹", "۲۱"], answer: "۹" },
      { type: "choose", ltr: true, prompt: "۷ دختر و ۸ پسر در حیاط بازی می‌کنند. روی هم چند بچه؟", say: "هفت دختر و هشت پسر در حیاط بازی می‌کنند. روی هم چند بچه؟", options: ["۱۴", "۱۵", "۱"], answer: "۱۵" },
      { type: "choose", ltr: true, prompt: "سامان ۱۳ تیله دارد و برادرش ۹ تیله. سامان چندتا بیشتر دارد؟", say: "سامان سیزده تیله دارد و برادرش نه تیله. سامان چندتا بیشتر دارد؟", options: ["۴", "۵", "۲۲"], answer: "۴" },
      { type: "choose", ltr: true, prompt: "در ظرف چند گیلاس بود. ۵ تا خوردیم و ۱۱ تا ماند. اول چندتا بود؟", say: "در ظرف چند گیلاس بود. پنج تا خوردیم و یازده تا ماند. اول چندتا بود؟", options: ["۶", "۱۵", "۱۶"], answer: "۱۶" },
      { type: "choose", ltr: true, prompt: "هستی ۸ مداد رنگی داشت. بابا چندتا دیگر برایش خرید. حالا ۱۲ تا دارد. بابا چندتا خرید؟", say: "هستی هشت مداد رنگی داشت. بابا چندتا دیگر برایش خرید. حالا دوازده تا دارد. بابا چندتا خرید؟", options: ["۳", "۴", "۲۰"], answer: "۴" }
    ]
  },
  {
    id: "math-sprout-35", subject: "math", level: "sprout", emoji: "🗨️", title: "یک جمله، چند قصه",
    steps: [
      { type: "choose", ltr: true, show: "۶ + ۳ = ۹", prompt: "کدام قصه با این جمله جور است؟", say: "شش به اضافه سه مساوی نه. کدام قصه جور است؟", stack: true,
        options: [{ label: "شش مرغ بودند، سه مرغ دیگر آمدند.", value: "آمدن" }, { label: "شش مرغ بودند، سه مرغ رفتند.", value: "رفتن" }, { label: "نه مرغ بودند، شش مرغ رفتند.", value: "نه" }], answer: "آمدن" },
      { type: "choose", ltr: true, show: "۶ + ۳ = ۹", prompt: "این قصه هم با همان جمله جور است؟ «شش مداد قرمز و سه مداد آبی داریم.»", say: "شش مداد قرمز و سه مداد آبی داریم. این قصه هم با جمله شش به اضافه سه جور است؟", pic: true,
        options: [{ label: "✅", value: "بله" }, { label: "❌", value: "نه" }], answer: "بله" },
      { type: "choose", ltr: true, show: "۱۰ − ۴ = ۶", prompt: "کدام قصه با این جمله جور است؟", say: "ده منهای چهار مساوی شش. کدام قصه جور است؟", stack: true,
        options: [{ label: "ده شیرینی بود، چهار تا خوردیم.", value: "خوردن" }, { label: "ده شیرینی بود، چهار تا خریدیم.", value: "خریدن" }, { label: "چهار شیرینی بود، شش تا خریدیم.", value: "چهار" }], answer: "خوردن" },
      { type: "choose", prompt: "«۵ ماهی قرمز و ۷ ماهی سیاه در حوض است.» کدام سؤال را با جمع جواب می‌دهیم؟", say: "پنج ماهی قرمز و هفت ماهی سیاه در حوض است. کدام سؤال را با جمع جواب می‌دهیم؟", stack: true,
        options: [{ label: "روی هم چند ماهی در حوض است؟", value: "جمع" }, { label: "ماهی‌های سیاه چندتا بیشترند؟", value: "تفریق" }], answer: "جمع" },
      { type: "choose", prompt: "همان حوض: کدام سؤال را با تفریق جواب می‌دهیم؟", say: "همان حوض. کدام سؤال را با تفریق جواب می‌دهیم؟", stack: true,
        options: [{ label: "روی هم چند ماهی در حوض است؟", value: "جمع" }, { label: "ماهی‌های سیاه چندتا بیشترند؟", value: "تفریق" }], answer: "تفریق" },
      { type: "talk", scene: "🧺 🍎🍎🍎🍎🍎 🍐🍐🍐", caption: "برای جمله «۵ + ۳ = ۸» یک قصه بگو. بعد برای «۸ − ۳ = ۵».",
        tips: ["جمله را با هم بخوانید و بپرسید: «چه قصه‌ای با این جور است؟»", "قصه‌ها را درباره خانه و کوچه خودتان بگویید: نان، میوه، بچه‌های همسایه.",
          "شما یک قصه بگویید که با جمله جور نیست. کودک پیدا کند چرا جور نیست."] }
    ]
  },
  {
    id: "math-sprout-36", subject: "math", level: "sprout", emoji: "✏️", title: "بکش و حل کن",
    steps: [
      /* Drawing to solve a story: thirteen circles are drawn on paper, five are crossed out, the rest are counted. */
      (function () {
        var parts = { bg: { art: "bg-garden" }, paper: { art: "paper-sheet", at: [80, 40], s: 1.05 } };
        var P = [];
        for (var h = 0; h < 13; h++) parts["h" + h] = { art: "🐔", at: [11 + h * 11.5, 88], s: 0.7 };
        for (var i = 0; i < 13; i++) { P.push([30 + (i % 7) * 16, i < 7 ? 32 : 48]); parts["o" + i] = { art: "o-mark", at: P[i], s: 1.5, o: 0 }; }
        for (var j = 0; j < 5; j++) parts["x" + j] = { art: "cross", at: P[12 - j], s: 1.3, o: 0 };
        var draw = [], cross = [];
        P.forEach(function (p, i) { draw.push({ id: "o" + i, to: { o: 1 }, at: 300 + i * 260, dur: 1 }, { id: "o" + i, draw: true, at: 300 + i * 260, dur: 300 }); });
        for (var k = 0; k < 5; k++) cross.push({ id: "h" + (12 - k), to: { x: 190 + k * 10 }, at: 200 + k * 300, dur: 2200, ease: "in" },
          { id: "x" + k, to: { o: 1 }, at: 600 + k * 600, dur: 1 }, { id: "x" + k, draw: true, at: 600 + k * 600, dur: 400 });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "در حیاط سیزده مرغ هست. پنج مرغ به لانه می‌روند. چند مرغ می‌ماند؟ روی کاغذ حلش می‌کنیم.", do: [jump("h0", 300, 2), jump("h6", 600, 2), jump("h12", 900, 2)] },
            { caption: "برای هر مرغ یک دایره می‌کشیم: سیزده دایره.", do: draw },
            { caption: "پنج مرغ رفتند: پنج دایره را خط می‌زنیم.", key: 2600, do: cross },
            { caption: "دایره‌هایی را که خط نخورده‌اند می‌شماریم: هشت. سیزده منهای پنج، هشت. با جمع امتحان می‌کنیم: هشت و پنج، سیزده. درست است!", do: P.slice(0, 8).map(function (p, i) { return jump("o" + i, 300 + i * 300, 2); }) }
          ],
          question: "چند مرغ در حیاط ماند؟", options: [7, 8, 18], answer: 8 };
      })(),
      { type: "choose", ltr: true, show: "⚪⚪⚪⚪⚪⚪⚪⚪⚪ ⚪⚪⚪", prompt: "سفره ۱۲ بشقاب دارد. برای هر نفر یک بشقاب. ۹ نفر نشسته‌اند. چند بشقاب خالی است؟ دایره‌ها را بشمار.", say: "سفره دوازده بشقاب دارد. نه نفر نشسته‌اند. چند بشقاب خالی است؟", options: ["۳", "۴", "۲۱"], answer: "۳" },
      { type: "choose", ltr: true, prompt: "یک شکل در ذهنت بکش: ۶ گل سرخ و ۸ گل زرد در گلدان است. روی هم چند گل؟", say: "شش گل سرخ و هشت گل زرد در گلدان است. روی هم چند گل؟", options: ["۱۲", "۱۴", "۲"], answer: "۱۴" },
      { type: "choose", ltr: true, prompt: "جوابت را امتحان کن: «۱۱ − ۴ = ۷». با کدام جمع می‌شود امتحانش کرد؟", say: "یازده منهای چهار مساوی هفت. با کدام جمع می‌شود امتحانش کرد؟", stack: true,
        options: ["۷ + ۴ = ۱۱", "۷ + ۱۱ = ۱۸", "۴ + ۴ = ۸"], answer: "۷ + ۴ = ۱۱" },
      { type: "paper", text: "این قصه را با کشیدن حل کن: «در کوچه ۱۴ بادکنک بود. ۶ تا ترکید. چندتا ماند؟» برای هر بادکنک یک دایره بکش و ترکیده‌ها را خط بزن.",
        example: "○○○○○○○○○○○○○○", lang: "fa", check: ["۱۴ دایره کشیده؟", "۶ تا را خط زده؟", "جواب را درست شمرده (۸)؟", "با جمع امتحان کرده: ۸ + ۶ = ۱۴؟"] }
    ]
  },
  {
    id: "math-sprout-37", subject: "math", level: "sprout", emoji: "🎲", title: "بازی قصه‌ها",
    steps: [
      { type: "pairs", prompt: "هر قصه را با جمله‌اش جفت کن", say: "روی هر قصه بزن تا آن را بشنوی. هر قصه را با جمله‌اش جفت کن.",
        pairs: [[{ label: "۵ پرنده، ۲ تا آمدند", say: "پنج پرنده بودند، دو تا آمدند." }, "۵ + ۲ = ۷"], [{ label: "۵ پرنده، ۲ تا رفتند", say: "پنج پرنده بودند، دو تا رفتند." }, "۵ − ۲ = ۳"],
          [{ label: "۹ سیب، ۴ تا خوردیم", say: "نه سیب بود، چهار تا خوردیم." }, "۹ − ۴ = ۵"]] },
      { type: "sort", prompt: "کدام قصه جمع است؟ کدام تفریق؟", say: "قصه‌هایی که چیزی اضافه می‌شود در یک سبد، و قصه‌هایی که چیزی کم می‌شود در سبد دیگر.",
        baskets: [{ label: "جمع", pic: "➕", value: "add" }, { label: "تفریق", pic: "➖", value: "sub" }],
        items: [{ label: "۳ مهمان دیگر آمدند", say: "سه مهمان دیگر آمدند.", basket: "add" }, { label: "۲ بادکنک ترکید", say: "دو بادکنک ترکید.", basket: "sub" },
          { label: "مرغ ۴ تخم دیگر گذاشت", say: "مرغ چهار تخم دیگر گذاشت.", basket: "add" }, { label: "۵ گنجشک پریدند", say: "پنج گنجشک پریدند.", basket: "sub" },
          { label: "بابا ۶ نان دیگر خرید", say: "بابا شش نان دیگر خرید.", basket: "add" }, { label: "۳ شیرینی خوردیم", say: "سه شیرینی خوردیم.", basket: "sub" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر جمله را با جوابش جفت کن.", pairs: [["۱۲ − ۵", 7], ["۸ + ۶", 14], ["۱۵ − ۹", 6]] },
      { type: "sort", prompt: "جواب این قصه‌ها ۸ است یا ۱۰؟", say: "هر قصه را در سبد جوابش بگذار: هشت یا ده.",
        baskets: [{ label: 8, value: "8" }, { label: 10, value: "10" }],
        items: [{ label: "۵ پسر و ۳ دختر", say: "پنج پسر و سه دختر. روی هم؟", basket: "8" }, { label: "۱۲ نان، ۲ تا خوردیم", say: "دوازده نان بود، دو تا خوردیم.", basket: "10" },
          { label: "علی ۱۱ و سارا ۳: چندتا بیشتر؟", say: "علی یازده تیله دارد و سارا سه تا. علی چندتا بیشتر دارد؟", basket: "8" }, { label: "۶ ماهی و ۴ ماهی دیگر", say: "شش ماهی بود و چهار ماهی دیگر آمد.", basket: "10" }] },
      { type: "pairs", prompt: "هر قصه را با جمله‌اش جفت کن", say: "هر قصه را با جمله‌اش جفت کن.",
        pairs: [[{ label: "۷ مداد و ۳ مداد دیگر", say: "هفت مداد بود و سه مداد دیگر خریدیم." }, "۷ + ۳ = ۱۰"], [{ label: "۷ مداد، ۳ تا گم شد", say: "هفت مداد بود، سه تا گم شد." }, "۷ − ۳ = ۴"]] }
    ]
  },
  {
    id: "math-sprout-38", subject: "math", level: "sprout", emoji: "🪵", title: "دسته‌های ده‌تایی تا صد",
    steps: [
      /* Counting a big pile by tens: loose sticks are tied into bundles of ten, then the bundles are counted ten,
         twenty, thirty. */
      (function () {
        var parts = { bg: { art: "day-room" }, num: { art: "count:big", at: [126, 30], s: 1.8, o: 0 } };
        for (var i = 0; i < 10; i++) parts["s" + i] = { art: "pstick", at: [20 + i * 6, 84], s: 1.4, r: (i % 3 - 1) * 8 };
        parts.b0 = { art: "bundle10", at: [50, 84], s: 1.8, o: 0 };
        parts.b1 = { art: "bundle10", at: [72, 84], s: 1.8, o: 0 }; parts.b2 = { art: "bundle10", at: [94, 84], s: 1.8, o: 0 };
        var tie = [];
        for (var k = 0; k < 10; k++) tie.push({ id: "s" + k, to: { x: 50, r: 0 }, at: 300 + k * 120, dur: 600 });
        tie.push({ id: "b0", to: { o: 1 }, at: 1800, dur: 300 });
        for (k = 0; k < 10; k++) tie.push({ id: "s" + k, to: { o: 0 }, at: 1900, dur: 200 });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "شمردن چوب‌های زیاد یکی‌یکی سخت است. ده تا را با یک کش می‌بندیم: یک دسته ده‌تایی.", key: 1100, do: tie },
            { caption: "دو دسته ده‌تایی دیگر هم داریم. حالا دسته‌ها را می‌شماریم: ده، بیست، سی.", do: [
              { id: "num", to: { o: 1 }, dur: 200 }, pop("b0", 300), tally("num", 10, 300), pop("b1", 1300), tally("num", 20, 1300), pop("b2", 2300), tally("num", 30, 2300)
            ] },
            { caption: "سه دسته ده‌تایی، یعنی سی چوب.", do: [pop("num", 300, 0.3)] }
          ],
          question: "پنج دسته ده‌تایی چند چوب است؟", options: [5, 15, 50], answer: 50 };
      })(),
      { type: "tens", n: 20, hundreds: false, options: [2, 12, 20] },
      { type: "tens", n: 40, hundreds: false, options: [4, 40, 14] },
      { type: "count", layout: "rows", thing: "🥚", n: 20, options: [18, 20, 22], prompt: "تخم‌مرغ‌ها را بشمار. شانه‌ها ده‌تایی‌اند.", ask: "چند تخم‌مرغ هست؟" },
      { type: "tens", build: true, n: 30, hundreds: false, prompt: "سی چوب بساز: ده تا که شد، دسته می‌شود." },
      { type: "tens", n: 70, hundreds: false, options: [7, 70, 17] },
      { type: "tens", n: 100, hundreds: false, options: [10, 100, 1000] }
    ]
  },
  {
    id: "math-sprout-39", subject: "math", level: "sprout", emoji: "🧦", title: "دوتا دوتا، پنج‌تا پنج‌تا",
    steps: [
      { type: "choose", show: "🧦🧦 🧦🧦 🧦🧦 🧦🧦", prompt: "جوراب‌ها جفت جفت‌اند. دوتا دوتا بشمار: دو، چهار، شش، … چندتاست؟", say: "جوراب‌ها جفت جفت‌اند. دوتا دوتا بشمار: دو، چهار، شش، هشت. چندتاست؟", options: ["۴", "۸", "۱۰"], answer: "۸" },
      { type: "pattern", prompt: "دوتا دوتا بشمار. جاهای خالی را پر کن", say: "دو، چهار، شش، … جاهای خالی را پر کن.", ltr: true,
        seq: [2, 4, 6, 8, 10, 12, 14], blanks: [3, 5, 6], options: [8, 9, 12, 13, 14] },
      { type: "numline", a: 6, b: 2, options: [7, 8, 9], prompt: "دوتا دوتا جلو برو: قورباغه روی ۶ است و دو خانه می‌پرد. به کجا می‌رسد؟", say: "قورباغه روی شش است و دو خانه می‌پرد. به کجا می‌رسد؟" },
      { type: "choose", show: "✋✋✋✋", prompt: "هر دست پنج انگشت دارد. پنج‌تا پنج‌تا بشمار: پنج، ده، … چند انگشت؟", say: "هر دست پنج انگشت دارد. پنج‌تا پنج‌تا بشمار: پنج، ده، پانزده، بیست. چند انگشت؟", options: ["۴", "۲۰", "۲۵"], answer: "۲۰" },
      { type: "pattern", prompt: "پنج‌تا پنج‌تا بشمار", say: "پنج، ده، پانزده، … جاهای خالی را پر کن.", ltr: true,
        seq: [5, 10, 15, 20, 25, 30, 35], blanks: [2, 4, 6], options: [15, 16, 25, 30, 35] },
      { type: "choose", prompt: "در خانه ما چهار نفریم. هر کدام ده انگشت داریم. ده‌تا ده‌تا بشمار: ده، بیست، … چند انگشت؟", say: "در خانه ما چهار نفریم. هر کدام ده انگشت داریم. ده‌تا ده‌تا بشمار: ده، بیست، سی، چهل. چند انگشت؟", options: ["۱۴", "۴۰", "۴۴"], answer: "۴۰" },
      { type: "pattern", prompt: "ده‌تا ده‌تا بشمار", say: "ده، بیست، سی، … جاهای خالی را پر کن.", ltr: true,
        seq: [10, 20, 30, 40, 50, 60, 70, 80], blanks: [3, 5, 7], options: [40, 41, 60, 80, 90] }
    ]
  },
  {
    id: "math-sprout-40", subject: "math", level: "sprout", emoji: "💯", title: "شمردن تا صد",
    steps: [
      { type: "numline", a: 18, b: 3, options: [20, 21, 22], prompt: "از ۱۸ سه تا جلو بشمار: نوزده، بیست، … به کجا می‌رسی؟", say: "از هجده سه تا جلو بشمار: نوزده، بیست، بیست و یک." },
      { type: "order", prompt: "بعد از ۲۹ چه می‌آید؟ به ترتیب بچین", say: "بیست و هفت، بیست و هشت، بیست و نه، … به ترتیب بچین.", ltr: true,
        items: [{ label: 27, say: "بیست و هفت" }, { label: 28, say: "بیست و هشت" }, { label: 29, say: "بیست و نه" }, { label: 30, say: "سی" }, { label: 31, say: "سی و یک" }] },
      { type: "order", prompt: "اسم دهگان‌ها را به ترتیب بچین: ده، بیست، سی…", say: "ده، بیست، سی، چهل، پنجاه، شصت، هفتاد، هشتاد، نود، صد. به ترتیب بچین.", ltr: true,
        items: [{ label: 10, say: "ده" }, { label: 20, say: "بیست" }, { label: 30, say: "سی" }, { label: 40, say: "چهل" }, { label: 50, say: "پنجاه" }, { label: 60, say: "شصت" }] },
      { type: "order", prompt: "۶۸، ۶۹، … بعدش چه می‌آید؟", say: "شصت و هشت، شصت و نه، … بعدش؟ به ترتیب بچین.", ltr: true,
        items: [{ label: 67, say: "شصت و هفت" }, { label: 68, say: "شصت و هشت" }, { label: 69, say: "شصت و نه" }, { label: 70, say: "هفتاد" }, { label: 71, say: "هفتاد و یک" }] },
      { type: "order", prompt: "از ۴۵ برعکس بشمار و بچین", say: "از چهل و پنج برعکس بشمار: چهل و پنج، چهل و چهار، … به ترتیب بچین.", ltr: true,
        items: [{ label: 45, say: "چهل و پنج" }, { label: 44, say: "چهل و چهار" }, { label: 43, say: "چهل و سه" }, { label: 42, say: "چهل و دو" }, { label: 41, say: "چهل و یک" }, { label: 40, say: "چهل" }] },
      { type: "numline", a: 14, b: -5, options: [8, 9, 10], prompt: "از ۱۴ پنج تا عقب بشمار. به کجا می‌رسی؟", say: "از چهارده پنج تا عقب بشمار." },
      { type: "doit", pic: "🫘🔟", text: "یک کپه بزرگ را بشمار:",
        list: ["یک مشت بزرگ نخود، دکمه یا ماکارونی بیاورید.", "ده تا ده تا جدا کن و هر ده‌تا را در یک کاسه یا روی یک دستمال بگذار.",
          "دسته‌ها را بشمار: ده، بیست، سی… و بعد تکی‌ها را. روی هم چندتا شد؟"] }
    ]
  },
  {
    id: "math-sprout-41", subject: "math", level: "sprout", emoji: "🔤", title: "خواندن و نوشتن عددهای تا صد",
    steps: [
      { type: "choose", ltr: true, prompt: "«بیست و سه» را چطور می‌نویسیم؟ اول دهگان (۲)، بعد یکان (۳).", say: "بیست و سه. اول دو، برای دو دسته ده‌تایی. بعد سه.", options: ["۳۲", "۲۳", "۲۰۳"], answer: "۲۳" },
      { type: "trace", letter: "۲", prompt: "«۲۳» را بنویس. اول «۲» برای بیست.", say: "بیست و سه را بنویس. اول دو، برای بیست." },
      { type: "trace", letter: "۳", prompt: "بعد «۳» برای سه تا.", say: "بعد سه، برای سه تا. دو و سه: بیست و سه." },
      { type: "pairs", prompt: "هر عدد را با اسمش جفت کن", say: "روی اسم بزن تا آن را بشنوی. هر عدد را با اسمش جفت کن.",
        pairs: [[{ label: "سی و دو", say: "سی و دو" }, "۳۲"], [{ label: "بیست و سه", say: "بیست و سه" }, "۲۳"], [{ label: "پنجاه و یک", say: "پنجاه و یک" }, "۵۱"], [{ label: "پانزده", say: "پانزده" }, "۱۵"]] },
      { type: "choose", ltr: true, show: "۴۷", prompt: "این عدد چند دسته ده‌تایی دارد؟", say: "چهل و هفت. چند دسته ده‌تایی دارد؟", options: ["۴", "۷", "۴۷"], answer: "۴" },
      { type: "choose", ltr: true, prompt: "گوش کن: کدام عدد را گفتم؟", say: "شصت و هشت. کدام عدد را گفتم؟", options: ["۸۶", "۶۸", "۶۰۸"], answer: "۶۸" },
      { type: "trace", letter: "۹", prompt: "«۹۰» را بنویس. اول «۹».", say: "نود را بنویس. اول نه، برای نه دسته ده‌تایی." },
      { type: "trace", letter: "۰", prompt: "بعد «۰»، چون یکی تنها نداریم: ۹۰.", say: "بعد صفر، چون یکی تنها نداریم. نود." }
    ]
  },
  {
    id: "math-sprout-42", subject: "math", level: "sprout", emoji: "🔲", title: "جدول صدتایی",
    steps: [
      { type: "pattern", prompt: "این یک ردیف از جدول صدتایی است. در ردیف، هر عدد یکی بیشتر است. جاهای خالی را پر کن", say: "در هر ردیف جدول صدتایی، عددها یکی‌یکی بیشتر می‌شوند. جاهای خالی را پر کن.", ltr: true,
        seq: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], blanks: [3, 6, 9], options: [44, 47, 50, 54, 57] },
      { type: "pattern", prompt: "این یک ستون از جدول صدتایی است، خوابیده. در ستون، هر عدد ده تا بیشتر است. پر کن", say: "در هر ستون جدول صدتایی، عددها ده‌تا ده‌تا بیشتر می‌شوند. جاهای خالی را پر کن.", ltr: true,
        seq: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93], blanks: [2, 5, 8], options: [23, 24, 53, 63, 83] },
      { type: "choose", ltr: true, show: "۳۴", prompt: "در جدول صدتایی، عدد زیر ۳۴ کدام است؟", say: "در جدول صدتایی، عدد زیر سی و چهار کدام است؟ ده تا بیشتر.", options: ["۳۵", "۴۴", "۲۴"], answer: "۴۴" },
      { type: "choose", ltr: true, show: "۶۷", prompt: "عدد بالای ۶۷ کدام است؟", say: "در جدول صدتایی، عدد بالای شصت و هفت کدام است؟ ده تا کمتر.", options: ["۵۷", "۶۶", "۷۷"], answer: "۵۷" },
      { type: "choose", ltr: true, show: "۲۹ ؟ ۳۱", prompt: "یک عدد زیر برگه پنهان شده. کدام است؟", say: "بیست و نه، چی، سی و یک. کدام عدد پنهان شده؟", options: ["۲۰", "۳۰", "۳۹"], answer: "۳۰" },
      { type: "pattern", prompt: "قطعه‌ای از جدول: ۵۵، ۵۶، ۵۷ … پر کن", say: "پنجاه و پنج، پنجاه و شش، پنجاه و هفت. جاهای خالی را پر کن.", ltr: true,
        seq: [55, 56, 57, 58, 59, 60], blanks: [3, 5], options: [58, 59, 60, 68] },
      { type: "choose", ltr: true, show: "۷۸", prompt: "عدد سمت راست ۷۸ در جدول کدام است؟", say: "در جدول صدتایی، عدد بعد از هفتاد و هشت در همان ردیف کدام است؟", options: ["۷۷", "۷۹", "۸۸"], answer: "۷۹" }
    ]
  },
  {
    id: "math-sprout-43", subject: "math", level: "sprout", emoji: "➕", title: "ده‌تا بیشتر، ده‌تا کمتر",
    steps: [
      { type: "tens", n: 24, b: 10, hundreds: false, options: [25, 34, 44], prompt: "۲۴ چوب داریم. یک دسته ده‌تایی دیگر اضافه می‌کنیم. چندتا می‌شود؟" },
      { type: "tens", n: 56, b: -10, hundreds: false, options: [46, 55, 66], prompt: "۵۶ چوب داریم. یک دسته ده‌تایی برمی‌داریم. چندتا می‌ماند؟" },
      { type: "choose", ltr: true, show: "۳۷ + ۱۰ = ؟", prompt: "ده‌تا بیشتر: فقط رقم دهگان یکی بیشتر می‌شود. جواب چند است؟", say: "سی و هفت به اضافه ده.", options: ["۳۸", "۴۷", "۱۳۷"], answer: "۴۷" },
      { type: "choose", ltr: true, show: "۸۲ − ۱۰ = ؟", prompt: "ده‌تا کمتر: رقم دهگان یکی کمتر می‌شود. جواب چند است؟", say: "هشتاد و دو منهای ده.", options: ["۷۲", "۸۱", "۹۲"], answer: "۷۲" },
      { type: "tens", n: 61, b: 10, hundreds: false, options: [62, 71, 81] },
      { type: "choose", ltr: true, show: "۴۵ ← ؟ → ۶۵", prompt: "کدام عدد ده‌تا بیشتر از ۴۵ و ده‌تا کمتر از ۶۵ است؟", say: "کدام عدد ده‌تا بیشتر از چهل و پنج و ده‌تا کمتر از شصت و پنج است؟", options: ["۴۶", "۵۵", "۶۴"], answer: "۵۵" },
      { type: "choose", ltr: true, show: "۹۰ + ۱۰ = ؟", prompt: "نود و ده چند می‌شود؟", say: "نود به اضافه ده.", options: ["۱۰۰", "۹۱", "۱۹۰"], answer: "۱۰۰" }
    ]
  },
  {
    id: "math-sprout-44", subject: "math", level: "sprout", emoji: "🧩", title: "بازی عددها تا صد",
    steps: [
      { type: "order", prompt: "ده‌تا ده‌تا: از کم به زیاد بچین", say: "ده، بیست، سی، … از کم به زیاد بچین.", ltr: true,
        items: [{ label: 30, say: "سی" }, { label: 40, say: "چهل" }, { label: 50, say: "پنجاه" }, { label: 60, say: "شصت" }, { label: 70, say: "هفتاد" }] },
      { type: "pairs", prompt: "هر عدد را با اسمش جفت کن", say: "روی اسم بزن تا آن را بشنوی. هر عدد را با اسمش جفت کن.",
        pairs: [[{ label: "هشتاد و چهار", say: "هشتاد و چهار" }, "۸۴"], [{ label: "چهل و هشت", say: "چهل و هشت" }, "۴۸"], [{ label: "نود و نه", say: "نود و نه" }, "۹۹"]] },
      { type: "pattern", prompt: "قطعه گم‌شده جدول صدتایی را پیدا کن", say: "این یک ستون از جدول صدتایی است. جاهای خالی را پر کن.", ltr: true,
        seq: [7, 17, 27, 37, 47, 57], blanks: [2, 4], options: [27, 28, 47, 37] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با عددی جفت کن که ده‌تا بیشتر است.", pairs: [[23, 33], [58, 68], [90, 100]] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "این عددها را از کم به زیاد بچین.", ltr: true, items: [19, 32, 45, 54, 91] },
      { type: "pattern", prompt: "پنج‌تا پنج‌تا: پر کن", say: "پنج‌تا پنج‌تا بشمار و جاهای خالی را پر کن.", ltr: true,
        seq: [50, 55, 60, 65, 70, 75], blanks: [1, 3, 5], options: [55, 56, 65, 75, 80] }
    ]
  },
  {
    id: "math-sprout-45", subject: "math", level: "sprout", emoji: "🧊", title: "اندازه با واحد",
    steps: [
      /* Measuring with units: cubes are laid end to end along a pencil (five cubes), then smaller paper clips (ten):
         a smaller unit gives a bigger number. */
      (function () {
        var parts = {};
        parts.pen1 = { art: "pencil-h", look: { len: 40, color: "#5b9bd5" }, at: [40, 30], s: 1.6 };
        parts.pen2 = { art: "pencil-h", look: { len: 40, color: "#5b9bd5" }, at: [40, 64], s: 1.6 };
        for (var i = 0; i < 4; i++) parts["c" + i] = { art: "unit-cube", at: [40 + i * 16, 50], s: 2, o: 0 };
        for (var j = 0; j < 8; j++) parts["k" + j] = { art: "clip", at: [40 + j * 8, 80], s: 2, o: 0 };
        parts.n1 = { art: "count:big", at: [134, 46], s: 1.4, o: 0 }; parts.n2 = { art: "count:big", at: [134, 80], s: 1.4, o: 0 };
        var cubes = [{ id: "n1", to: { o: 1 }, dur: 200 }], clips = [{ id: "n2", to: { o: 1 }, dur: 200 }];
        for (i = 0; i < 4; i++) cubes.push(pop("c" + i, 300 + i * 800, 0.15), tally("n1", i + 1, 300 + i * 800));
        for (j = 0; j < 8; j++) clips.push(pop("k" + j, 300 + j * 500, 0.15), tally("n2", j + 1, 300 + j * 500));
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f3e3c3", parts: parts,
          scenes: [
            { caption: "این مداد چقدر دراز است؟ مکعب‌ها را پشت سر هم کنارش می‌گذاریم، بی‌فاصله و بی‌آن‌که روی هم بیفتند.", do: cubes },
            { caption: "مداد چهار مکعب است.", do: [pop("n1", 300, 0.3)] },
            { caption: "حالا همان مداد را با گیره کاغذ اندازه می‌گیریم. گیره‌ها کوچک‌ترند.", do: clips },
            { caption: "مداد هشت گیره است. واحد کوچک‌تر، عدد بزرگ‌تر!", do: [pop("n2", 300, 0.3)] }
          ],
          question: "چرا عدد گیره‌ها بیشتر شد؟", pic: true,
          options: [{ label: "📎", value: "گیره کوچک‌تر است" }, { label: "✏️", value: "مداد درازتر شد" }], answer: "گیره کوچک‌تر است" };
      })(),
      { type: "measure", ask: "count", unit: "🟧", bars: [{ thing: "🥄", len: 3 }], options: [2, 3, 4], prompt: "قاشق چند مکعب است؟ روی هر مکعب بزن و بشمار." },
      { type: "measure", ask: "count", unit: "📎", bars: [{ thing: "🖍️", len: 5 }], options: [4, 5, 6], prompt: "مداد شمعی چند گیره است؟ روی هر گیره بزن و بشمار." },
      { type: "measure", ask: "count", unit: "🟧", bars: [{ thing: "📕", len: 7 }], options: [6, 7, 8], prompt: "کتاب چند مکعب است؟" },
      { type: "choose", prompt: "سارا میز را با مکعب اندازه گرفت و کاوه با گیره. کدام عدد بزرگ‌تری گفت؟", say: "سارا میز را با مکعب اندازه گرفت و کاوه با گیره. گیره‌ها کوچک‌ترند. کدام عدد بزرگ‌تری گفت؟", pic: true,
        options: [{ label: "🧊", value: "سارا" }, { label: "📎", value: "کاوه" }], answer: "کاوه" },
      { type: "choose", prompt: "نیما مکعب‌ها را با فاصله گذاشت. عددش درست است؟", say: "نیما مکعب‌ها را با فاصله کنار مداد گذاشت. عددش درست است؟", pic: true,
        options: [{ label: "✅", value: "بله" }, { label: "❌", value: "نه" }], answer: "نه" }
    ]
  },
  {
    id: "math-sprout-46", subject: "math", level: "sprout", emoji: "🧵", title: "کدام درازتر است؟",
    steps: [
      { type: "choose", prompt: "میز را نمی‌شود کنار در برد. با یک نخ، درازی میز را گرفتیم. نخ از در کوتاه‌تر بود. کدام درازتر است؟", say: "میز را نمی‌شود کنار در برد. با یک نخ درازی میز را گرفتیم. نخ از در کوتاه‌تر بود. کدام درازتر است، میز یا در؟", pic: true,
        options: [{ label: "🪑", value: "میز" }, { label: "🚪", value: "در" }], answer: "در" },
      { type: "choose", prompt: "مداد از پاک‌کن درازتر است. خط‌کش از مداد درازتر است. کدام از همه درازتر است؟", say: "مداد از پاک‌کن درازتر است. خط‌کش از مداد درازتر است. کدام از همه درازتر است؟", pic: true,
        options: [{ label: "✏️", value: "مداد" }, { label: "📏", value: "خط‌کش" }, { label: "🧽", value: "پاک‌کن" }], answer: "خط‌کش" },
      { type: "order", prompt: "از کوتاه تا دراز بچین", say: "این سه نوار را از کوتاه تا دراز بچین.", ltr: true, items: [{ bar: 3 }, { bar: 5 }, { bar: 8 }] },
      { type: "measure", ask: "longer", bars: [{ thing: "🐍", len: 9 }, { thing: "🪱", len: 4 }, { thing: "🐛", len: 2 }] },
      { type: "measure", ask: "count", unit: "👣", bars: [{ thing: "🛋️", len: 4 }], options: [3, 4, 5], prompt: "مبل چند قدم است؟ روی هر قدم بزن." },
      { type: "order", prompt: "از دراز تا کوتاه بچین", say: "از دراز تا کوتاه بچین.", ltr: true, items: [{ pic: "🚂", bar: 9 }, { pic: "🚌", bar: 6 }, { pic: "🚗", bar: 3 }] },
      { type: "doit", pic: "🧵🥄👣", text: "در خانه اندازه بگیر و مقایسه کن:",
        list: ["با یک نخ، پهنای یک میز را بگیر. نخ را کنار در ببر: کدام درازتر است؟", "قاب پنجره را با قاشق اندازه بگیر.", "راهرو را با قدم اندازه بگیر. پدر یا مادرت هم بگیرند. عددها فرق دارد؟"] }
    ]
  },
  {
    id: "math-sprout-47", subject: "math", level: "sprout", emoji: "🫖", title: "سنگین‌تر، جادارتر",
    steps: [
      { type: "balance", left: [{ pic: "🍎", mass: 3, say: "سیب" }], open: "right", tray: [1, 1, 1, 1, 1], unit: "مکعب",
        prompt: "سیب را با مکعب وزن کن: مکعب بگذار تا ترازو صاف شود.", question: "سیب چند مکعب است؟", options: [2, 3, 4], answer: 3 },
      { type: "balance", left: [{ pic: "🍊", mass: 4, say: "پرتقال" }], open: "right", tray: [1, 1, 1, 1, 1, 1], unit: "مکعب",
        prompt: "حالا پرتقال را وزن کن.", question: "پرتقال چند مکعب است؟", options: [3, 4, 5], answer: 4 },
      { type: "choose", prompt: "سیب ۳ مکعب بود و پرتقال ۴ مکعب. کدام سنگین‌تر است؟", say: "سیب سه مکعب بود و پرتقال چهار مکعب. کدام سنگین‌تر است؟", pic: true,
        options: [{ label: "🍎", value: "سیب" }, { label: "🍊", value: "پرتقال" }], answer: "پرتقال" },
      { type: "balance", ask: "lighter", left: [{ pic: "🥔", mass: 2, say: "سیب‌زمینی" }], right: [{ pic: "🧅", mass: 1, say: "پیاز" }], prompt: "کدام سبک‌تر است؟ روی آن کفه بزن." },
      { type: "choose", show: "🫖 → 🍵🍵🍵🍵🍵", prompt: "آب قوری را در استکان‌ها ریختیم. پنج استکان پر شد. قوری چند استکان آب جا دارد؟", say: "آب قوری را در استکان‌ها ریختیم. پنج استکان پر شد. قوری چند استکان آب جا دارد؟",
        options: ["۴", "۵", "۶"], answer: "۵" },
      { type: "choose", prompt: "پارچ ۷ لیوان آب جا دارد و بطری ۴ لیوان. کدام جادارتر است؟", say: "پارچ هفت لیوان آب جا دارد و بطری چهار لیوان. کدام جادارتر است؟", pic: true,
        options: [{ label: "🫗", value: "پارچ" }, { label: "🍼", value: "بطری" }], answer: "پارچ" },
      { type: "choose", prompt: "پارچ ۷ لیوان و بطری ۴ لیوان. پارچ چند لیوان بیشتر جا دارد؟", say: "پارچ هفت لیوان و بطری چهار لیوان. پارچ چند لیوان بیشتر جا دارد؟", options: ["۳", "۴", "۱۱"], answer: "۳" }
    ]
  },
  {
    id: "math-sprout-48", subject: "math", level: "sprout", emoji: "🕐", title: "ساعت کامل",
    steps: [
      { type: "clock", ask: "show", start: "12:00", time: "3:00",
        prompt: "عقربه کوتاه ساعت را می‌گوید. عقربه بلند وقتی ساعت کامل است، رو به بالا روی ۱۲ است. ببین: حالا ساعت ۳ است.",
        say: "عقربه کوتاه ساعت را می‌گوید. عقربه بلند وقتی ساعت کامل است، رو به بالا روی دوازده است. ببین: حالا ساعت سه است." },
      { type: "clock", time: "7:00", options: ["7:00", "12:00", "6:00"], pic: "🌅", prompt: "مهسا صبح این ساعت بیدار می‌شود. ساعت چند است؟" },
      { type: "clock", time: "1:00", options: ["1:00", "12:00", "2:00"], pic: "🍲", prompt: "ناهار این ساعت است. ساعت چند است؟" },
      { type: "clock", time: "5:00", start: "12:00", pic: "⚽", prompt: "آرمان ساعت ۵ فوتبال بازی می‌کند. عقربه کوتاه را روی ۵ بگذار." },
      { type: "clock", time: "9:00", options: ["9:00", "3:00", "12:00"], pic: "🛏️", prompt: "شب‌ها این ساعت می‌خوابیم. ساعت چند است؟" },
      { type: "choose", prompt: "وقتی ساعت کامل است، عقربه بلند کجاست؟", say: "وقتی ساعت کامل است، عقربه بلند کجاست؟", pic: true,
        options: [{ label: "⬆️", value: "روی ۱۲" }, { label: "⬇️", value: "روی ۶" }], answer: "روی ۱۲" },
      { type: "clock", time: "10:00", start: "12:00", pic: "🏫", prompt: "ساعت ۱۰ زنگ تفریح است. عقربه‌ها را روی ساعت ۱۰ بگذار." }
    ]
  },
  {
    id: "math-sprout-49", subject: "math", level: "sprout", emoji: "🍂", title: "فصل‌ها و ماه‌ها",
    steps: [
      /* One tree in the yard through the year: blossom in spring, green in summer, leaves falling in autumn, bare in
         winter with snow on the ground. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, snow: { art: "snow-ground", o: 0 },
          spring: { art: "tree-season", look: { season: "spring" }, at: [80, 84], s: 1.6 }, summer: { art: "tree-season", look: { season: "summer" }, at: [80, 84], s: 1.6, o: 0 },
          autumn: { art: "tree-season", look: { season: "autumn" }, at: [80, 84], s: 1.6, o: 0 }, winter: { art: "tree-season", look: { season: "winter" }, at: [80, 84], s: 1.6, o: 0 },
          leaf1: { art: "🍂", at: [72, 40], s: 0.5, o: 0 }, leaf2: { art: "🍂", at: [90, 44], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "بهار است: فروردین، اردیبهشت، خرداد. درخت شکوفه داده.", do: [{ id: "spring", to: { s: "+0.05" }, at: 300, dur: 800, yoyo: true, times: 2 }] },
          { caption: "تابستان می‌آید: تیر، مرداد، شهریور. برگ‌ها سبز و پرپشت‌اند.", do: [{ id: "summer", to: { o: 1 }, dur: 1500 }, { id: "spring", to: { o: 0 }, at: 1200, dur: 600 }] },
          { caption: "پاییز است: مهر، آبان، آذر. برگ‌ها نارنجی می‌شوند و می‌ریزند.", do: [
            { id: "autumn", to: { o: 1 }, dur: 1500 }, { id: "summer", to: { o: 0 }, at: 1200, dur: 600 },
            { id: "leaf1", to: { o: 1 }, at: 1600, dur: 200 }, { id: "leaf1", path: "M72 40Q60 60 66 84", at: 1600, dur: 2400 },
            { id: "leaf2", to: { o: 1 }, at: 2200, dur: 200 }, { id: "leaf2", path: "M90 44Q104 62 96 84", at: 2200, dur: 2400 }
          ] },
          { caption: "زمستان است: دی، بهمن، اسفند. درخت بی‌برگ است و برف آمده.", do: [
            { id: "winter", to: { o: 1 }, dur: 1200 }, { id: "autumn", to: { o: 0 }, at: 900, dur: 600 }, { id: "leaf1", to: { o: 0 }, dur: 600 }, { id: "leaf2", to: { o: 0 }, dur: 600 },
            { id: "snow", to: { o: 1 }, at: 900, dur: 1500 }, { emit: "bubble", where: [80, 10], n: 20, spread: [140, 10], rise: -60, life: 2600, at: 600, dur: 3000 }
          ] }
        ],
        question: "بعد از زمستان کدام فصل می‌آید؟", pic: true,
        options: [{ label: "🌸", value: "بهار" }, { label: "☀️", value: "تابستان" }, { label: "🍂", value: "پاییز" }], answer: "بهار" },
      { type: "order", numbered: true, prompt: "فصل‌ها را به ترتیب بچین، از بهار", say: "فصل‌ها را به ترتیب بچین: بهار، تابستان، پاییز، زمستان.",
        items: [{ pic: "🌸", label: "بهار", say: "بهار" }, { pic: "☀️", label: "تابستان", say: "تابستان" }, { pic: "🍂", label: "پاییز", say: "پاییز" }, { pic: "❄️", label: "زمستان", say: "زمستان" }] },
      { type: "sort", prompt: "هر ماه را در فصل خودش بگذار", say: "هر ماه را در فصل خودش بگذار. روی ماه بزن تا اسمش را بشنوی.",
        baskets: [{ label: "بهار", pic: "🌸", value: "spring" }, { label: "تابستان", pic: "☀️", value: "summer" }, { label: "پاییز", pic: "🍂", value: "autumn" }, { label: "زمستان", pic: "❄️", value: "winter" }],
        items: [{ label: "فروردین", say: "فروردین", basket: "spring" }, { label: "تیر", say: "تیر", basket: "summer" }, { label: "مهر", say: "مهر", basket: "autumn" },
          { label: "دی", say: "دی", basket: "winter" }, { label: "خرداد", say: "خرداد", basket: "spring" }, { label: "شهریور", say: "شهریور", basket: "summer" },
          { label: "آذر", say: "آذر", basket: "autumn" }, { label: "اسفند", say: "اسفند", basket: "winter" }] },
      { type: "order", numbered: true, prompt: "ماه‌های بهار را به ترتیب بچین", say: "ماه‌های بهار: فروردین، اردیبهشت، خرداد. به ترتیب بچین.",
        items: [{ label: "فروردین", say: "فروردین" }, { label: "اردیبهشت", say: "اردیبهشت" }, { label: "خرداد", say: "خرداد" }] },
      { type: "order", numbered: true, prompt: "روزهای هفته را به ترتیب بچین، از شنبه", say: "روزهای هفته: شنبه، یکشنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنجشنبه، جمعه. به ترتیب بچین.",
        items: [{ label: "شنبه", say: "شنبه" }, { label: "یکشنبه", say: "یکشنبه" }, { label: "دوشنبه", say: "دوشنبه" }, { label: "سه‌شنبه", say: "سه‌شنبه" }, { label: "چهارشنبه", say: "چهارشنبه" }] },
      { type: "sort", prompt: "این‌ها مال کدام فصل‌اند؟", say: "هر چیز را در فصل خودش بگذار.",
        baskets: [{ label: "تابستان", pic: "☀️", value: "summer" }, { label: "زمستان", pic: "❄️", value: "winter" }],
        items: [{ pic: "🍉", say: "هندوانه", basket: "summer" }, { pic: "⛄", say: "آدم برفی", basket: "winter" }, { pic: "🩱", say: "لباس شنا", basket: "summer" }, { pic: "🧤", say: "دستکش", basket: "winter" }] }
    ]
  },
  {
    id: "math-sprout-50", subject: "math", level: "sprout", emoji: "💵", title: "پول ما",
    steps: [
      { type: "money", prompt: "این‌ها اسکناس‌های ما هستند، به هزار تومان. این پول روی هم چقدر است؟", bills: [2, 1], options: [2, 3, 21] },
      { type: "choose", prompt: "کدام اسکناس پول بیشتری است؟", say: "اسکناس پنج هزار تومانی یا دو هزار تومانی؟ کدام پول بیشتری است؟", options: [{ label: "۵ هزار", value: 5 }, { label: "۲ هزار", value: 2 }], answer: 5 },
      { type: "money", prompt: "این پول روی هم چقدر است؟", bills: [5, 2, 1], options: [7, 8, 9] },
      { type: "money", prompt: "پول نان را بده.", items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }], wallet: [5, 1, 2, 2] },
      { type: "money", prompt: "یک کیسه سیب و یک خیار. روی هم چقدر می‌شود؟", items: [{ emoji: "🍎", name: "سیب", price: 10 }, { emoji: "🥒", name: "خیار", price: 5 }], options: [10, 15, 105] },
      { type: "choose", prompt: "یک اسکناس ده هزار تومانی، با چند اسکناس پنج هزار تومانی برابر است؟", say: "یک اسکناس ده هزار تومانی، با چند اسکناس پنج هزار تومانی برابر است؟", options: ["۲", "۵", "۱۰"], answer: "۲" },
      { type: "money", prompt: "پول گلابی‌ها را با دو اسکناس بده.", items: [{ emoji: "🍐", name: "گلابی", price: 12 }], wallet: [10, 2, 5, 1] }
    ]
  },
  {
    id: "math-sprout-51", subject: "math", level: "sprout", emoji: "📅", title: "بازی اندازه و زمان",
    steps: [
      { type: "order", prompt: "از کوتاه تا دراز بچین", say: "این نوارها را از کوتاه تا دراز بچین.", ltr: true, items: [{ bar: 2 }, { bar: 4 }, { bar: 6 }, { bar: 9 }] },
      { type: "pairs", prompt: "هر کار را با وقتش جفت کن", say: "هر کار را با وقتش جفت کن: صبح، ظهر یا شب.",
        pairs: [[{ pic: "🍳", say: "صبحانه" }, { pic: "🌅", say: "صبح" }], [{ pic: "🍲", say: "ناهار" }, { pic: "☀️", say: "ظهر" }], [{ pic: "🛏️", say: "خواب" }, { pic: "🌙", say: "شب" }]] },
      { type: "order", numbered: true, prompt: "روزهای هفته را به ترتیب بچین", say: "از سه‌شنبه شروع کن و به ترتیب بچین: سه‌شنبه، چهارشنبه، پنجشنبه، جمعه.",
        items: [{ label: "سه‌شنبه", say: "سه‌شنبه" }, { label: "چهارشنبه", say: "چهارشنبه" }, { label: "پنجشنبه", say: "پنجشنبه" }, { label: "جمعه", say: "جمعه" }] },
      { type: "sort", prompt: "هر ماه را در فصلش بگذار", say: "هر ماه را در فصلش بگذار.",
        baskets: [{ label: "بهار", pic: "🌸", value: "spring" }, { label: "پاییز", pic: "🍂", value: "autumn" }],
        items: [{ label: "اردیبهشت", say: "اردیبهشت", basket: "spring" }, { label: "آبان", say: "آبان", basket: "autumn" }, { label: "فروردین", say: "فروردین", basket: "spring" }, { label: "مهر", say: "مهر", basket: "autumn" }] },
      { type: "order", numbered: true, prompt: "فصل‌ها را از تابستان به ترتیب بچین", say: "از تابستان شروع کن: تابستان، پاییز، زمستان، بهار.",
        items: [{ pic: "☀️", say: "تابستان" }, { pic: "🍂", say: "پاییز" }, { pic: "❄️", say: "زمستان" }, { pic: "🌸", say: "بهار" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر روز را با روز بعدش جفت کن.",
        pairs: [[{ label: "شنبه", say: "شنبه" }, { label: "یکشنبه", say: "یکشنبه" }], [{ label: "دوشنبه", say: "دوشنبه" }, { label: "سه‌شنبه", say: "سه‌شنبه" }], [{ label: "پنجشنبه", say: "پنجشنبه" }, { label: "جمعه", say: "جمعه" }]] }
    ]
  },
  {
    id: "math-sprout-52", subject: "math", level: "sprout", emoji: "📝", title: "چوب‌خط",
    steps: [
      { type: "count", show: "tally", n: 5, options: [4, 5, 6], prompt: "این چوب‌خط است. برای هر چیز یک خط می‌کشیم. پنجمی را کج روی چهار تای قبلی می‌کشیم: یک دسته پنج‌تایی.", ask: "چندتا شمرده‌اند؟" },
      { type: "count", show: "tally", n: 8, options: [7, 8, 9], prompt: "یک دسته پنج‌تایی و چند خط دیگر.", ask: "روی هم چندتا؟" },
      { type: "count", show: "tally", n: 12, options: [10, 12, 13], prompt: "دسته‌ها را پنج‌تا پنج‌تا بشمار، بعد خط‌های تنها را.", ask: "روی هم چندتا؟" },
      { type: "chart", make: true, title: "میوه‌ای که بچه‌ها دوست دارند", prompt: "از بچه‌ها پرسیدیم چه میوه‌ای دوست دارند. هر جواب را در ستونش بگذار.",
        rows: [{ label: "سیب", pic: "🍎", n: 3 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "موز", pic: "🍌", n: 2 }],
        question: "چند نفر انگور دوست دارند؟", options: [4, 5, 6], answer: 5 },
      { type: "chart", title: "میوه‌ای که بچه‌ها دوست دارند", rows: [{ label: "سیب", pic: "🍎", n: 3 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "موز", pic: "🍌", n: 2 }],
        question: "کدام میوه را بیشتر دوست دارند؟", options: [{ label: "سیب", value: "🍎" }, { label: "انگور", value: "🍇" }, { label: "موز", value: "🍌" }], answer: "🍇" },
      { type: "choose", prompt: "چند نفر روی هم جواب دادند؟ ۳ و ۵ و ۲", say: "سه نفر سیب، پنج نفر انگور، دو نفر موز. روی هم چند نفر جواب دادند؟", options: ["۸", "۱۰", "۱۲"], answer: "۱۰" },
      { type: "doit", pic: "📝✋", text: "یک نظرسنجی در خانه:",
        list: ["از هر کس در خانه (یا تلفنی از فامیل) بپرس: «کدام را بیشتر دوست داری: چای، شیر یا آب‌میوه؟»", "برای هر جواب یک خط در ستون همان نوشیدنی بکش. پنجمی را کج بکش.",
          "خط‌ها را بشمار. کدام بیشتر بود؟"] }
    ]
  },
  {
    id: "math-sprout-53", subject: "math", level: "sprout", emoji: "📊", title: "نمودار تصویری بخوان",
    steps: [
      { type: "chart", title: "پرنده‌هایی که در حیاط دیدیم", rows: [{ label: "گنجشک", pic: "🐦", n: 6 }, { label: "کبوتر", pic: "🕊️", n: 3 }, { label: "کلاغ", pic: "🐦‍⬛", n: 2 }],
        question: "چند گنجشک دیدیم؟", options: [5, 6, 7], answer: 6 },
      { type: "chart", title: "پرنده‌هایی که در حیاط دیدیم", rows: [{ label: "گنجشک", pic: "🐦", n: 6 }, { label: "کبوتر", pic: "🕊️", n: 3 }, { label: "کلاغ", pic: "🐦‍⬛", n: 2 }],
        question: "کدام پرنده را کمتر از همه دیدیم؟", options: [{ label: "گنجشک", value: "🐦" }, { label: "کبوتر", value: "🕊️" }, { label: "کلاغ", value: "🐦‍⬛" }], answer: "🐦‍⬛" },
      { type: "chart", title: "پرنده‌هایی که در حیاط دیدیم", rows: [{ label: "گنجشک", pic: "🐦", n: 6 }, { label: "کبوتر", pic: "🕊️", n: 3 }, { label: "کلاغ", pic: "🐦‍⬛", n: 2 }],
        question: "گنجشک‌ها چندتا بیشتر از کبوترها بودند؟", options: [2, 3, 9], answer: 3 },
      { type: "chart", title: "بازی محبوب بچه‌های کلاس", rows: [{ label: "توپ", pic: "⚽", n: 5 }, { label: "طناب", pic: "🪢", n: 4 }, { label: "قایم‌باشک", pic: "🙈", n: 7 }, { label: "لی‌لی", pic: "🦶", n: 3 }],
        question: "کدام بازی را بیشتر از همه دوست دارند؟", options: [{ label: "توپ", value: "⚽" }, { label: "قایم‌باشک", value: "🙈" }, { label: "لی‌لی", value: "🦶" }], answer: "🙈" },
      { type: "chart", title: "بازی محبوب بچه‌های کلاس", rows: [{ label: "توپ", pic: "⚽", n: 5 }, { label: "طناب", pic: "🪢", n: 4 }, { label: "قایم‌باشک", pic: "🙈", n: 7 }, { label: "لی‌لی", pic: "🦶", n: 3 }],
        question: "چند نفر توپ یا طناب دوست دارند؟", options: [8, 9, 10], answer: 9 },
      { type: "chart", title: "بازی محبوب بچه‌های کلاس", rows: [{ label: "توپ", pic: "⚽", n: 5 }, { label: "طناب", pic: "🪢", n: 4 }, { label: "قایم‌باشک", pic: "🙈", n: 7 }, { label: "لی‌لی", pic: "🦶", n: 3 }],
        question: "لی‌لی چندتا کمتر از قایم‌باشک است؟", options: [3, 4, 10], answer: 4 }
    ]
  },
  {
    id: "math-sprout-54", subject: "math", level: "sprout", emoji: "👈", title: "چپ و راست",
    steps: [
      /* Left and right of a thing, from where we look: a ball rolls to the left of the tree, an apple falls to its
         right; a cat walks from the right side to the left side. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: { sky: { art: "sky-day" }, ground: { art: "ground" }, tree: { art: "plane-tree", at: [80, 86], s: 0.9 },
          arrowL: { art: "pointer", at: [44, 30], s: 1.4, flip: true, o: 0 }, arrowR: { art: "pointer", at: [116, 30], s: 1.4, o: 0 },
          ball: { art: "ball-roll", at: [80, 82], s: 1.6, o: 0 }, apple: { art: "🍎", at: [96, 36], s: 0.7, o: 0 }, cat: { art: "cat-side", at: [140, 88], s: 1.5, flip: true } },
        scenes: [
          { caption: "از جایی که ما نگاه می‌کنیم، این طرف چپ است و آن طرف راست.", do: [{ id: "arrowL", to: { o: 1 }, at: 300, dur: 300 }, { id: "arrowR", to: { o: 1 }, at: 1400, dur: 300 }] },
          { caption: "توپ قل خورد و رفت سمت چپ درخت.", do: [{ id: "arrowL", to: { o: 0 }, dur: 300 }, { id: "arrowR", to: { o: 0 }, dur: 300 },
            { id: "ball", to: { o: 1 }, dur: 200 }, { id: "ball", to: { x: 36 }, at: 300, dur: 2000, ease: "out" }, { id: "ball", to: { r: -800 }, at: 300, dur: 2000, ease: "out" }] },
          { caption: "یک سیب از درخت افتاد، سمت راست درخت.", do: [{ id: "apple", to: { o: 1 }, dur: 200 }, { id: "apple", to: { y: 86 }, at: 300, dur: 900, ease: "in" }] },
          { caption: "گربه از سمت راست آمد و رفت کنار توپ، سمت چپ.", do: [hops("cat", [140, 88], [52, 88], 9, 0, 3200, 1.5)] }
        ],
        question: "توپ کدام طرف درخت است؟", pic: true,
        options: [{ label: "⬅️", value: "چپ" }, { label: "➡️", value: "راست" }], answer: "چپ" },
      { type: "choose", prompt: "دست راستت را بالا ببر. کدام فلش طرف دست راست تو را نشان می‌دهد؟", say: "دست راستت را بالا ببر. کدام فلش طرف دست راست تو را نشان می‌دهد؟", pic: true,
        options: [{ label: "⬅️", value: "چپ" }, { label: "➡️", value: "راست" }], answer: "راست" },
      { type: "choose", show: "🍎🌳🍐", prompt: "سیب کدام طرف درخت است؟", say: "به تصویر نگاه کن. سیب کدام طرف درخت است؟", pic: true,
        options: [{ label: "⬅️", value: "چپ" }, { label: "➡️", value: "راست" }], answer: "راست" },
      { type: "choose", prompt: "سارا روبه‌روی تو ایستاده و دست راستش را بالا برده. دست او کدام طرف تو است؟", say: "سارا روبه‌روی تو ایستاده و دست راستش را بالا برده. از نگاه تو، دستش کدام طرف است؟", pic: true,
        options: [{ label: "⬅️", value: "چپ" }, { label: "➡️", value: "راست" }], answer: "چپ" },
      { type: "doit", pic: "🙋👟", text: "بازی چپ و راست:",
        list: ["دست راستت را بالا ببر. پای چپت را تکان بده.", "روبه‌روی پدر یا مادرت بایستید و هر دو دست راست‌تان را بالا ببرید. دست‌ها روبه‌روی هم‌اند؟",
          "در اتاق بگو: «سمت چپ من چیست؟ سمت راستم چیست؟»"] }
    ]
  },
  {
    id: "math-sprout-55", subject: "math", level: "sprout", emoji: "🏫", title: "راه خانه تا مدرسه",
    steps: [
      { type: "map", map: "street", prompt: "این نقشه محله است. روی هر جا بزن تا اسمش را بشنوی." },
      { type: "map", map: "street", say: "با نسترن به مدرسه برو.",
        tasks: [{ route: ["home", "clinic", "school"], walker: "👧", prompt: "نسترن از خانه راه می‌افتد. مستقیم برو، از کنار درمانگاه بگذر و برو تا مدرسه. روی جاها به ترتیب بزن." }] },
      { type: "map", map: "street", say: "با پدربزرگ نان بخر.",
        tasks: [{ route: ["home", "park", "fruit", "bakery"], walker: "👴", prompt: "از خانه برو بالا تا پارک. بعد بپیچ و برو تا میوه‌فروشی. نانوایی کنار میوه‌فروشی است: برو تا نانوایی." }] },
      { type: "map", map: "street", say: "کجاست؟", tasks: [{ find: "bakery", prompt: "کدام مغازه کنار میوه‌فروشی است؟ رویش بزن." }, { find: "clinic", prompt: "کدام جا بین خانه و مدرسه است؟ رویش بزن." }] },
      { type: "compass", say: "بالای این تصویر شمال است، مثل نقشه.",
        tasks: [{ face: "n", prompt: "رو به شمال بچرخ." }, { face: "e", prompt: "حالا به راست بچرخ: رو به شرق." }, { face: "s", prompt: "باز هم به راست بچرخ: رو به جنوب." }] },
      { type: "map", map: "street", say: "با کامران به پارک برو.",
        tasks: [{ route: ["school", "clinic", "home", "park"], walker: "👦", prompt: "کامران مدرسه است. برو تا درمانگاه، بعد تا خانه، بعد بپیچ و برو بالا تا پارک." }] }
    ]
  },
  {
    id: "math-sprout-56", subject: "math", level: "sprout", emoji: "📶", title: "الگوهای رشد",
    steps: [
      /* A growing pattern: stairs of 1, 2, 3, 4 blocks really get built, one column at a time. */
      (function () {
        var parts = { bg: { art: "day-room" } };
        var cols = [1, 2, 3, 4], out = [];
        cols.forEach(function (h, c) {
          for (var k = 0; k < h; k++) parts["b" + c + k] = { art: "unit-cube", at: [34 + c * 24, 82 - k * 12], s: 1.5, o: 0 };
        });
        var scenes = [];
        var words = ["یک مکعب.", "دو مکعب: یکی بیشتر.", "سه مکعب: باز یکی بیشتر.", "چهار مکعب. هر پله یکی بیشتر از قبلی است."];
        cols.forEach(function (h, c) {
          var tr = [];
          for (var k = 0; k < h; k++) tr.push(pop("b" + c + k, 300 + k * 500, 0.15));
          scenes.push({ caption: (c ? "پله بعدی: " : "پله اول: ") + words[c], do: tr });
        });
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts, scenes: scenes,
          question: "پله بعدی چند مکعب دارد؟", options: [4, 5, 6], answer: 5 };
      })(),
      { type: "pattern", prompt: "بعدی کدام است؟", say: "یک، دو، سه، چهار. هر بار یکی بیشتر. بعدی کدام است؟", ltr: true,
        seq: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }, { dots: 5 }], blanks: [4], options: [{ dots: 4 }, { dots: 5 }, { dots: 6 }] },
      { type: "choose", show: "🔺 ، 🔺🔺 ، 🔺🔺🔺", prompt: "با چوب کبریت مثلث می‌سازیم. یک مثلث ۳ چوب می‌خواهد، دو مثلث ۵ چوب، سه مثلث ۷ چوب. چهار مثلث چند چوب می‌خواهد؟",
        say: "یک مثلث سه چوب، دو مثلث پنج چوب، سه مثلث هفت چوب. هر بار دو چوب بیشتر. چهار مثلث چند چوب می‌خواهد؟", options: ["۸", "۹", "۱۰"], answer: "۹" },
      { type: "pattern", prompt: "هر بار دو تا بیشتر. پر کن", say: "دو، چهار، شش، … هر بار دو تا بیشتر.", ltr: true,
        seq: [{ dots: 2 }, { dots: 4 }, { dots: 6 }, { dots: 8 }], blanks: [3], options: [{ dots: 7 }, { dots: 8 }, { dots: 10 }] },
      { type: "choose", prompt: "این الگو چطور بزرگ می‌شود؟ ۱، ۳، ۵، ۷", say: "یک، سه، پنج، هفت. این الگو چطور بزرگ می‌شود؟", stack: true,
        options: [{ label: "هر بار یکی بیشتر", value: "1" }, { label: "هر بار دو تا بیشتر", value: "2" }, { label: "هر بار ده تا بیشتر", value: "10" }], answer: "2" },
      { type: "pattern", prompt: "برج‌ها بلندتر می‌شوند. بعدی کدام است؟", say: "یک طبقه، دو طبقه، سه طبقه. بعدی؟", ltr: true,
        seq: [{ bar: 1 }, { bar: 2 }, { bar: 3 }, { bar: 4 }], blanks: [3], options: [{ bar: 2 }, { bar: 4 }, { bar: 6 }] }
    ]
  },
  {
    id: "math-sprout-57", subject: "math", level: "sprout", emoji: "🔢", title: "الگوهای عددی",
    steps: [
      { type: "pattern", prompt: "۲، ۴، ۶ … جاهای خالی را پر کن", say: "دو، چهار، شش، … جاهای خالی را پر کن.", ltr: true,
        seq: [2, 4, 6, 8, 10, 12], blanks: [3, 5], options: [7, 8, 11, 12] },
      { type: "pattern", prompt: "۵، ۱۰، ۱۵ … پر کن", say: "پنج، ده، پانزده، … پر کن.", ltr: true, seq: [5, 10, 15, 20, 25, 30], blanks: [3, 4, 5], options: [16, 20, 25, 30] },
      { type: "pattern", prompt: "۲۰، ۱۸، ۱۶ … این بار عددها کم می‌شوند. پر کن", say: "بیست، هجده، شانزده، … عددها دو تا دو تا کم می‌شوند.", ltr: true,
        seq: [20, 18, 16, 14, 12, 10], blanks: [3, 5], options: [14, 15, 10, 11] },
      { type: "numline", a: 10, b: 2, options: [11, 12, 13], prompt: "الگوی «دو تا دو تا»: قورباغه روی ۱۰ است و دو خانه می‌پرد. به کجا می‌رسد؟", say: "قورباغه روی ده است و دو خانه می‌پرد. به کجا می‌رسد؟" },
      { type: "choose", ltr: true, show: "۳ ، ۶ ، ۹ ، ۱۲", prompt: "قاعده این الگو چیست؟", say: "سه، شش، نه، دوازده. قاعده‌اش چیست؟", stack: true,
        options: [{ label: "هر بار ۳ تا بیشتر", value: "3" }, { label: "هر بار ۲ تا بیشتر", value: "2" }, { label: "هر بار ۳ تا کمتر", value: "-3" }], answer: "3" },
      { type: "choose", ltr: true, show: "۳۰ ، ۴۰ ، ۵۰ ، ؟", prompt: "بعدی چیست؟", say: "سی، چهل، پنجاه، بعدی؟", options: ["۵۱", "۶۰", "۵۵"], answer: "۶۰" },
      { type: "pattern", prompt: "۱، ۳، ۵ … اعداد فرد. پر کن", say: "یک، سه، پنج، … پر کن.", ltr: true, seq: [1, 3, 5, 7, 9, 11], blanks: [3, 5], options: [6, 7, 10, 11] }
    ]
  },
  {
    id: "math-sprout-58", subject: "math", level: "sprout", emoji: "🚃", title: "اول تا دهم",
    steps: [
      { type: "choose", show: "🚂🚃🚃🚃🚃🚃", prompt: "قطار یک لوکوموتیو و پنج واگن دارد. واگن‌ها را از لوکوموتیو بشمار: اول، دوم، … واگن آخر چندم است؟", say: "قطار پنج واگن دارد. از لوکوموتیو بشمار: اولی، دومی، سومی، چهارمی، پنجمی. واگن آخر چندم است؟",
        options: [{ label: "چهارم", value: 4 }, { label: "پنجم", value: 5 }, { label: "ششم", value: 6 }], answer: 5 },
      { type: "order", numbered: true, prompt: "طبقه‌های ساختمان را از پایین بچین: اول، دوم، سوم…", say: "طبقه اول، طبقه دوم، طبقه سوم، طبقه چهارم، طبقه پنجم، طبقه ششم. به ترتیب بچین.",
        items: [{ label: "اول", say: "اول" }, { label: "دوم", say: "دوم" }, { label: "سوم", say: "سوم" }, { label: "چهارم", say: "چهارم" }, { label: "پنجم", say: "پنجم" }, { label: "ششم", say: "ششم" }] },
      { type: "choose", prompt: "خانه ریحانه در طبقه هفتم است. آسانسور از طبقه پنجم بالا می‌رود. چند طبقه دیگر مانده؟", say: "خانه ریحانه در طبقه هفتم است. آسانسور در طبقه پنجم است. چند طبقه دیگر بالا برود؟", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "order", numbered: true, prompt: "هفتم، هشتم، نهم، دهم: به ترتیب بچین", say: "هفتم، هشتم، نهم، دهم. به ترتیب بچین.",
        items: [{ label: "هفتم", say: "هفتم" }, { label: "هشتم", say: "هشتم" }, { label: "نهم", say: "نهم" }, { label: "دهم", say: "دهم" }] },
      { type: "choose", prompt: "ده بچه در صف‌اند. تو آخر صف هستی. چندمی؟", say: "ده بچه در صف‌اند. تو آخر صف هستی. چندمی؟", options: [{ label: "نهم", value: 9 }, { label: "دهم", value: 10 }, { label: "اول", value: 1 }], answer: 10 },
      { type: "choose", show: "🔴🟡🔵🟢🟣🟠", prompt: "از راست بشمار. پنجمی چه رنگی است؟", say: "از راست بشمار. پنجمی چه رنگی است؟", pic: true,
        options: [{ label: "🟣", value: "بنفش" }, { label: "🟢", value: "سبز" }, { label: "🟠", value: "نارنجی" }], answer: "بنفش" }
    ]
  },
  {
    id: "math-sprout-59", subject: "math", level: "sprout", emoji: "🔷", title: "بازی شکل‌ها",
    steps: [
      { type: "sort", prompt: "شکل‌ها را بر اساس گوشه‌هایشان دسته کن", say: "شکل‌های سه‌گوش در یک سبد، چهارگوش‌ها در سبد دیگر.",
        baskets: [{ label: "۳ گوشه", shape: "triangle", value: "3" }, { label: "۴ گوشه", shape: "square", value: "4" }],
        items: [{ shape: "rectangle-tall", basket: "4" }, { shape: "triangle-tilt", basket: "3" }, { shape: "square-small", basket: "4" }, { shape: "triangle-down", basket: "3" }, { shape: "rectangle-thin", basket: "4" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر شکل فضایی را با چیزی جفت کن که شبیه آن است.",
        pairs: [[{ label: "کره", say: "کره" }, "⚽"], [{ label: "استوانه", say: "استوانه" }, "🥫"], [{ label: "مخروط", say: "مخروط" }, "🍦"], [{ label: "مکعب", say: "مکعب" }, "🎲"]] },
      { type: "fraction", ask: "equal", prompt: "کدام درست نصف شده است؟ دو تکه باید مساوی باشند.",
        shapes: [{ shape: "square", cuts: [0.3] }, { shape: "circle", cuts: [0, 0.5] }, { shape: "rect", cuts: [0.7] }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر شکل را با همان شکل جفت کن، حتی اگر چرخیده باشد.",
        pairs: [[{ shape: "square" }, { shape: "square-tilt" }], [{ shape: "triangle" }, { shape: "triangle-tilt" }], [{ shape: "rectangle" }, { shape: "rectangle-tall" }]] },
      { type: "sort", prompt: "شکل صاف یا شکل فضایی؟", say: "شکل‌های صاف، مثل کاغذ، در یک سبد، و شکل‌های فضایی، مثل توپ، در سبد دیگر.",
        baskets: [{ label: "صاف", shape: "circle", value: "flat" }, { label: "فضایی", pic: "⚽", value: "solid" }],
        items: [{ shape: "triangle", basket: "flat" }, { pic: "🎲", say: "تاس", basket: "solid" }, { shape: "square", basket: "flat" }, { pic: "🥫", say: "قوطی", basket: "solid" }, { pic: "🍊", say: "پرتقال", basket: "solid" }] }
    ]
  },
  {
    id: "math-sprout-60", subject: "math", level: "sprout", emoji: "🎉", title: "جشن جوانه",
    steps: [
      { type: "pairs", prompt: "هر حساب را با جوابش جفت کن", say: "هر حساب را با جوابش جفت کن.", pairs: [["۷ + ۳", 10], ["۹ − ۴", 5], ["۸ + ۵", 13], ["۶ + ۶", 12]] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "این عددها را از کم به زیاد بچین.", ltr: true, items: [8, 15, 23, 41, 70, 99] },
      { type: "choose", prompt: "در جشن ۱۴ بادکنک بود. ۵ تا ترکید. چندتا ماند؟", say: "در جشن چهارده بادکنک بود. پنج تا ترکید. چندتا ماند؟", options: ["۸", "۹", "۱۹"], answer: "۹" },
      { type: "pattern", prompt: "پرچم‌های جشن: بعدی‌ها کدام‌اند؟", say: "قرمز، زرد، زرد، قرمز، زرد، زرد. بعدی‌ها؟", seq: ["🟥", "🟨", "🟨", "🟥", "🟨", "🟨", "🟥", "🟨", "🟨"], blanks: [6, 7, 8], options: ["🟥", "🟨"] },
      { type: "shape", prompt: "من چهار ضلع برابر دارم. کدامم؟", options: ["rectangle", "square-tilt", "triangle"], answer: "square" },
      { type: "clock", time: "4:00", options: ["4:00", "12:00", "5:00"], pic: "🎂", prompt: "جشن تولد این ساعت شروع می‌شود. ساعت چند است؟" },
      { type: "choose", ltr: true, show: "۹ + ۸ = ؟", prompt: "از نه جلو بشمار. جواب چند است؟", say: "نه به اضافه هشت.", options: ["۱۶", "۱۷", "۱۸"], answer: "۱۷" },
      { type: "pattern", prompt: "ده‌تا ده‌تا تا صد", say: "ده‌تا ده‌تا بشمار تا صد.", ltr: true, seq: [60, 70, 80, 90, 100], blanks: [2, 4], options: [80, 81, 100, 110] }
    ]
  },

  // ---------------- Math: Sapling (to 100: making ten, tens and ones, comparing, adding and taking away, measuring, money) ----------------
  // Lessons are listed in teaching order; ids are only names, so new ones keep counting up.
  {
    id: "math-sapling-3", subject: "math", level: "sapling", emoji: "🧩", title: "جمع با ساختن ده",
    steps: [
      { type: "tenframe", n: 9, plus: 3, options: [11, 12, 13] },
      { type: "tenframe", n: 8, plus: 5, options: [12, 14, 13] },
      { type: "tenframe", n: 7, plus: 6, options: [13, 12, 14] },
      { type: "tenframe", n: 9, plus: 6, options: [16, 15, 14] },
      { type: "choose", ltr: true, show: "۸ + ۴ = ؟", prompt: "اول ده بساز. جواب چند است؟", options: ["۱۱", "۱۲", "۱۳"], answer: "۱۲" },
      { type: "choose", ltr: true, show: "۹ + ۸ = ؟", prompt: "اول ده بساز. جواب چند است؟", options: ["۱۸", "۱۶", "۱۷"], answer: "۱۷" }
    ]
  },
  {
    id: "math-sapling-1", subject: "math", level: "sapling", emoji: "🐸", title: "جمع با پرش قورباغه",
    steps: [
      { type: "numline", a: 8, b: 5, options: [12, 13, 14] },
      { type: "numline", a: 6, b: 7, options: [13, 12, 14] },
      { type: "numline", a: 9, b: 4, options: [14, 12, 13] },
      { type: "numline", a: 12, b: 5, options: [17, 16, 18] },
      { type: "numline", a: 7, b: 8, options: [14, 15, 16] }
    ]
  },
  {
    id: "math-sapling-2", subject: "math", level: "sapling", emoji: "🐇", title: "تفریق با پرش خرگوش",
    steps: [
      { type: "numline", a: 13, b: -5, thing: "🐇", options: [7, 8, 9] },
      { type: "numline", a: 15, b: -7, thing: "🐇", options: [8, 9, 7] },
      { type: "numline", a: 11, b: -4, thing: "🐇", options: [6, 8, 7] },
      { type: "numline", a: 18, b: -9, thing: "🐇", options: [9, 10, 8] }
    ]
  },
  {
    id: "math-sapling-22", subject: "math", level: "sapling", emoji: "🔟", title: "تفریق تا بیست با ده",
    steps: [
      { type: "tenframe", n: 13, minus: 5, prompt: "۱۳ − ۵: اول ۳ تا برمی‌داریم تا ده بماند، بعد ۲ تای دیگر.", options: [7, 8, 9] },
      { type: "choose", ltr: true, show: "۱۴ − ۶ = ۱۴ − ۴ − ؟", prompt: "۶ را دو تکه کن: اول ۴ تا (تا ده)، بعد چندتا؟", say: "چهارده منهای شش. اول چهار تا برمی‌داریم تا ده بماند. بعد چندتای دیگر؟", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "numline", a: 15, b: -7, options: [7, 8, 9], prompt: "از ۱۵ هفت تا عقب: اول تا ۱۰، بعد بقیه. به کجا می‌رسی؟", say: "از پانزده هفت تا عقب برو. اول تا ده، بعد بقیه." },
      { type: "choose", ltr: true, show: "۱۲ − ۸ = ؟", prompt: "اول ۲ تا تا ده، بعد ۶ تای دیگر. جواب؟", say: "دوازده منهای هشت.", options: ["۳", "۴", "۵"], answer: "۴" },
      { type: "tenframe", n: 16, minus: 9, prompt: "۱۶ − ۹: شش تا تا ده، بعد سه تای دیگر.", options: [6, 7, 8] },
      { type: "choose", ltr: true, show: "۱۱ − ۳ = ؟", prompt: "یکی تا ده، بعد دو تای دیگر. جواب؟", say: "یازده منهای سه.", options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "choose", ltr: true, show: "۱۷ − ۹ = ؟", prompt: "به هر روشی که دوست داری حساب کن.", say: "هفده منهای نه.", options: ["۷", "۸", "۹"], answer: "۸" }
    ]
  },
  {
    id: "math-sapling-23", subject: "math", level: "sapling", emoji: "⚡", title: "بازی واقعیت‌های عددی",
    steps: [
      { type: "pairs", prompt: "هر حساب را با جوابش جفت کن", say: "هر حساب را با جوابش جفت کن.", pairs: [["۸ + ۷", 15], ["۱۰ + ۴", 14], ["۱۳ − ۸", 5], ["۶ + ۶", 12]] },
      { type: "sort", prompt: "جواب کدام ۱۱ است؟ کدام ۱۴؟", say: "هر حساب را در سبد جوابش بگذار.",
        baskets: [{ label: 11, value: "11" }, { label: 14, value: "14" }],
        items: [{ label: "۸ + ۳", basket: "11" }, { label: "۷ + ۷", basket: "14" }, { label: "۲۰ − ۹", basket: "11" }, { label: "۹ + ۵", basket: "14" }, { label: "۶ + ۵", basket: "11" }, { label: "۱۸ − ۴", basket: "14" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر حساب را با جوابش جفت کن.", pairs: [["۹ + ۸", 17], ["۱۵ − ۷", 8], ["۴ + ۹", 13]] },
      { type: "sort", prompt: "کدام با «ساختن ده» آسان است؟ کدام «دوتایی» است؟", say: "حساب‌هایی که دو عدد یکسان دارند در سبد دوتایی، و بقیه در سبد ساختن ده.",
        baskets: [{ label: "دوتایی", pic: "🦋", value: "double" }, { label: "ساختن ده", pic: "🔟", value: "ten" }],
        items: [{ label: "۸ + ۸", basket: "double" }, { label: "۹ + ۴", basket: "ten" }, { label: "۷ + ۷", basket: "double" }, { label: "۸ + ۵", basket: "ten" }] },
      { type: "pairs", prompt: "هر حساب را با حساب هم‌خانواده‌اش جفت کن", say: "هر جمع را با تفریقی جفت کن که از همان خانواده است.", pairs: [["۷ + ۶ = ۱۳", "۱۳ − ۶ = ۷"], ["۸ + ۹ = ۱۷", "۱۷ − ۹ = ۸"], ["۵ + ۹ = ۱۴", "۱۴ − ۵ = ۹"]] }
    ]
  },
  {
    id: "math-sapling-4", subject: "math", level: "sapling", emoji: "🧮", title: "دسته‌های ده‌تایی",
    steps: [
      { type: "tens", build: true, n: 13 },
      { type: "tens", n: 20, options: [2, 20, 12] },
      { type: "tens", n: 30, options: [13, 3, 30] },
      { type: "tens", n: 24, options: [42, 24, 6] },
      { type: "tens", build: true, n: 35 },
      { type: "tens", n: 47, options: [47, 74, 11] },
      { type: "tens", n: 60, options: [16, 60, 6] }
    ]
  },
  {
    id: "math-sapling-5", subject: "math", level: "sapling", emoji: "💯", title: "عددها تا ۱۰۰",
    steps: [
      { type: "tens", n: 56, options: [65, 11, 56] },
      { type: "tens", build: true, n: 72 },
      { type: "choose", prompt: "۳ دسته ده‌تایی و ۸ چوب. روی هم چندتاست؟", options: ["۸۳", "۳۸", "۱۱"], answer: "۳۸" },
      { type: "choose", show: "۶۴", prompt: "در این عدد چند دسته ده‌تایی هست؟", options: ["۴", "۱۰", "۶"], answer: "۶" },
      { type: "choose", prompt: "بعد از ۳۹ کدام عدد می‌آید؟", options: ["۳۸", "۴۰", "۵۰"], answer: "۴۰" },
      { type: "choose", prompt: "قبل از ۷۰ کدام عدد است؟", options: ["۶۹", "۷۱", "۶۰"], answer: "۶۹" },
      { type: "tens", n: 100, options: [10, 90, 100] }
    ]
  },
  {
    id: "math-sapling-6", subject: "math", level: "sapling", emoji: "⚖️", title: "مقایسه عددها",
    steps: [
      { type: "compare", a: 34, b: 43, pic: "tens", ask: "more" },
      { type: "compare", a: 52, b: 25, pic: "tens", ask: "less" },
      { type: "compare", a: 61, b: 58, pic: "tens", ask: "symbol" },
      { type: "compare", a: 27, b: 72, pic: "tens", ask: "symbol" },
      { type: "compare", a: 45, b: 45, pic: "tens", ask: "symbol" },
      { type: "compare", a: 89, b: 98, ask: "symbol" },
      { type: "compare", a: 70, b: 69, ask: "symbol" }
    ]
  },
  {
    id: "math-sapling-24", subject: "math", level: "sapling", emoji: "🔟", title: "ده‌تا بیشتر، ده‌تا کمتر",
    steps: [
      { type: "tens", n: 35, b: 10, hundreds: false, options: [36, 45, 135], prompt: "۳۵ و یک دسته ده‌تایی دیگر. چندتا می‌شود؟" },
      { type: "tens", n: 72, b: -10, hundreds: false, options: [62, 71, 82], prompt: "از ۷۲ یک دسته ده‌تایی برمی‌داریم. چندتا می‌ماند؟" },
      { type: "numline", a: 7, b: 10, options: [8, 17, 70], prompt: "قورباغه روی ۷ است و ده خانه جلو می‌پرد. به کجا می‌رسد؟", say: "قورباغه روی هفت است و ده خانه جلو می‌پرد." },
      { type: "choose", ltr: true, show: "۴۶ + ۳۰ = ؟", prompt: "سه دسته ده‌تایی اضافه کن: ۵۶، ۶۶، ۷۶. جواب؟", say: "چهل و شش به اضافه سی. ده‌تا ده‌تا جلو برو.", options: ["۴۹", "۷۶", "۷۹"], answer: "۷۶" },
      { type: "choose", ltr: true, show: "۹۳ − ۴۰ = ؟", prompt: "چهار دسته ده‌تایی کم کن. جواب؟", say: "نود و سه منهای چهل.", options: ["۵۳", "۸۹", "۴۳"], answer: "۵۳" },
      { type: "choose", ltr: true, show: "؟ + ۱۰ = ۶۸", prompt: "کدام عدد با ده تا بیشتر می‌شود ۶۸؟", say: "چه عددی به اضافه ده می‌شود شصت و هشت؟", options: ["۵۸", "۶۷", "۷۸"], answer: "۵۸" },
      { type: "choose", ltr: true, show: "۲۵ ← ۳۵ ← ۴۵ ← ؟", prompt: "هر بار ده‌تا بیشتر. بعدی؟", say: "بیست و پنج، سی و پنج، چهل و پنج، بعدی؟", options: ["۴۶", "۵۵", "۵۰"], answer: "۵۵" }
    ]
  },
  {
    id: "math-sapling-12", subject: "math", level: "sapling", emoji: "👟", title: "زوج و فرد، الگوی عددها",
    steps: [
      /* The child counts six odd shoes by tapping them, then they move into pairs (a ring round each pair): none is left over, so six is
         even. A seventh comes, looks for a partner, finds none and stays alone: seven is odd. */
      { type: "scene", prompt: "ببین زوج و فرد یعنی چه", bg: "#f6e3c6",
        parts: {
          s1: { art: "shoe", at: [14, 62], s: 1.3, r: -20, flip: true, o: 0 }, s2: { art: "shoe", at: [34, 64], s: 1.3, r: 15, o: 0 },
          s3: { art: "shoe", at: [54, 60], s: 1.3, r: 25, flip: true, o: 0 }, s4: { art: "shoe", at: [74, 63], s: 1.3, r: -10, o: 0 },
          s5: { art: "shoe", at: [94, 61], s: 1.3, r: -15, flip: true, o: 0 }, s6: { art: "shoe", at: [114, 64], s: 1.3, r: 30, o: 0 },
          s7: { art: "shoe", at: [178, 62], s: 1.3 },
          r1: { art: "pair-ring", at: [34, 62], s: 1.25, o: 0 }, r2: { art: "pair-ring", at: [70, 62], s: 1.25, o: 0 },
          r3: { art: "pair-ring", at: [106, 62], s: 1.25, o: 0 }, r7: { art: "pair-ring", at: [142, 62], s: 1.25, o: 0 },
          count: { art: "count:big", at: [142, 30], o: 0 },
          even: { art: "tag:۶ زوج", at: [70, 34], s: 1.3, o: 0 }, odd: { art: "tag:۷ فرد", at: [70, 34], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "شش لنگه کفش داریم.", do: [
            { id: "count", to: { o: 1 }, at: 300, dur: 200 },
            pop("s1", 300), pop("s2", 700), pop("s3", 1100), pop("s4", 1500), pop("s5", 1900), pop("s6", 2300)
          ],
            wait: { tap: ["s1", "s2", "s3", "s4", "s5", "s6"], counter: "count", hint: "بشمار: روی هر لنگه کفش بزن.",
              each: [{ id: "$", to: { s: "+0.3" }, dur: 300, yoyo: true, times: 2 }] } },
          { caption: "لنگه‌ها را دوتا دوتا جفت می‌کنیم.", do: [
            tally("count", 6, 0),
            { id: "s1", to: { x: 28, y: 62, r: 0 }, at: 200, dur: 800 }, { id: "s2", to: { x: 40, y: 62, r: 0 }, at: 200, dur: 800 },
            { id: "r1", to: { o: 1 }, at: 1100, dur: 100 }, { id: "r1", draw: true, at: 1100, dur: 600 },
            { id: "s3", to: { x: 64, y: 62, r: 0 }, at: 1900, dur: 800 }, { id: "s4", to: { x: 76, y: 62, r: 0 }, at: 1900, dur: 800 },
            { id: "r2", to: { o: 1 }, at: 2800, dur: 100 }, { id: "r2", draw: true, at: 2800, dur: 600 },
            { id: "s5", to: { x: 100, y: 62, r: 0 }, at: 3600, dur: 800 }, { id: "s6", to: { x: 112, y: 62, r: 0 }, at: 3600, dur: 800 },
            { id: "r3", to: { o: 1 }, at: 4500, dur: 100 }, { id: "r3", draw: true, at: 4500, dur: 600 }
          ] },
          { caption: "همه جفت شدند و هیچ لنگه‌ای تنها نماند. پس شش زوج است.", do: [
            pop("even", 1200, 0.2), { emit: "spark", where: [70, 62], spread: [90, 20], n: 10, at: 1200, dur: 1200 }
          ] },
          { caption: "حالا یک لنگه کفش دیگر می‌آید.", do: [
            { id: "even", to: { o: 0 }, dur: 400 }, hops("s7", [178, 62], [142, 62], 3, 300, 1400, 4), tally("count", 7, 1700),
            pop("count", 1700, 0.2)
          ] },
          { caption: "این یکی جفت ندارد و تنها می‌ماند. پس هفت فرد است.", do: [
            { id: "s7", to: { x: 126 }, at: 200, dur: 700 }, { id: "s7", to: { r: -12 }, at: 900, dur: 600, yoyo: true, times: 2 },
            { id: "s7", to: { x: 142 }, at: 1600, dur: 700 },
            { id: "r7", to: { o: 1 }, at: 2400, dur: 100 }, { id: "r7", draw: true, at: 2400, dur: 600 },
            pop("odd", 3300, 0.2)
          ] }
        ] },
      { type: "sort", prompt: "زوج‌ها را در یک سبد و فردها را در سبد دیگر بگذار.",
        baskets: [{ label: "زوج", value: "even" }, { label: "فرد", value: "odd" }],
        items: [{ dots: 4, basket: "even" }, { dots: 7, basket: "odd" }, { label: 6, basket: "even" }, { label: 9, basket: "odd" },
          { label: 12, basket: "even" }, { label: 15, basket: "odd" }] },
      { type: "pattern", prompt: "ده‌تا ده‌تا بشمار. جای خالی را پر کن.", ltr: true, seq: [10, 20, 30, 40, 50], blanks: [3], options: [35, 40, 41] },
      { type: "pattern", prompt: "پنج‌تا پنج‌تا بشمار. جاهای خالی را پر کن.", ltr: true, seq: [5, 10, 15, 20, 25, 30], blanks: [2, 4], options: [15, 25, 20, 11] },
      { type: "order", prompt: "عددها را از کوچک به بزرگ بچین", ltr: true, items: [27, 45, 54, 72, 90] }
    ]
  },
  {
    id: "math-sapling-7", subject: "math", level: "sapling", emoji: "➕", title: "جمع عددهای دورقمی",
    steps: [
      { type: "tens", n: 20, b: 30, options: [5, 50, 23] },
      { type: "tens", n: 34, b: 25, options: [59, 58, 69] },
      { type: "tens", n: 41, b: 16, options: [56, 67, 57] },
      { type: "tens", n: 38, b: 25, options: [53, 63, 64] },
      { type: "choose", ltr: true, show: "۵۲ + ۳۶ = ؟", prompt: "جواب چند است؟", options: ["۸۸", "۸۷", "۷۸"], answer: "۸۸" },
      { type: "choose", ltr: true, show: "۴۷ + ۲۸ = ؟", prompt: "جواب چند است؟", options: ["۶۵", "۷۴", "۷۵"], answer: "۷۵" }
    ]
  },
  {
    id: "math-sapling-8", subject: "math", level: "sapling", emoji: "➖", title: "تفریق عددهای دورقمی",
    steps: [
      { type: "tens", n: 50, b: -20, options: [30, 70, 3] },
      { type: "tens", n: 47, b: -23, options: [25, 24, 14] },
      { type: "tens", n: 68, b: -35, options: [33, 32, 43] },
      { type: "tens", n: 42, b: -17, options: [35, 24, 25] },
      { type: "choose", ltr: true, show: "۷۹ − ۴۶ = ؟", prompt: "جواب چند است؟", options: ["۳۳", "۳۲", "۴۳"], answer: "۳۳" },
      { type: "choose", ltr: true, show: "۶۰ − ۲۴ = ؟", prompt: "جواب چند است؟", options: ["۴۴", "۳۶", "۳۴"], answer: "۳۶" }
    ]
  },
  {
    id: "math-sapling-25", subject: "math", level: "sapling", emoji: "➰", title: "جمع روی خط خالی",
    steps: [
      /* The empty number line: 38 + 25 drawn as a hop of 20 and a hop of 5. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          line: { art: "eline", look: { len: 140 }, at: [10, 60] },
          t0: { art: "nl-tick", at: [22, 60] }, t1: { art: "nl-tick", at: [102, 60], o: 0 }, t2: { art: "nl-tick", at: [122, 60], o: 0 },
          a0: { art: "tag:۳۸", at: [22, 76] }, a1: { art: "tag:۵۸", at: [102, 76], o: 0 }, a2: { art: "tag:۶۳", at: [122, 76], o: 0 },
          h1: { art: "hop-arc", look: { w: 80, h: 14 }, at: [22, 58], o: 0 }, h2: { art: "hop-arc", look: { w: 20, h: 8 }, at: [102, 58], o: 0 },
          j1: { art: "tag:+۲۰", at: [62, 36], o: 0 }, j2: { art: "tag:+۵", at: [112, 46], o: 0 },
          frog: { art: "🐸", at: [22, 56], s: 0.6 }
        },
        scenes: [
          { caption: "۳۸ + ۲۵ را روی یک خط خالی حساب می‌کنیم. فقط ۳۸ را می‌نویسیم.", do: [jump("frog", 300, 3)] },
          { caption: "۲۵ یعنی ۲۰ و ۵. اول یک پرش بزرگ ۲۰تایی: ۳۸، ۵۸.", do: [
            { id: "h1", to: { o: 1 }, dur: 1 }, { id: "h1", draw: true, dur: 1600 }, hop("frog", [22, 56], [102, 56], 0, 1600, 28),
            { id: "j1", to: { o: 1 }, at: 800, dur: 300 }, { id: "t1", to: { o: 1 }, at: 1600, dur: 200 }, { id: "a1", to: { o: 1 }, at: 1600, dur: 300 }
          ] },
          { caption: "بعد یک پرش کوچک ۵تایی: ۵۸، ۶۳.", do: [
            { id: "h2", to: { o: 1 }, dur: 1 }, { id: "h2", draw: true, dur: 1000 }, hop("frog", [102, 56], [122, 56], 0, 1000, 16),
            { id: "j2", to: { o: 1 }, at: 500, dur: 300 }, { id: "t2", to: { o: 1 }, at: 1000, dur: 200 }, { id: "a2", to: { o: 1 }, at: 1000, dur: 300 }
          ] },
          { caption: "پس ۳۸ + ۲۵ = ۶۳.", do: [pop("a2", 300, 0.3)] }
        ],
        question: "۴۵ + ۳۰ چند می‌شود؟ (یک پرش ۳۰تایی)", options: [48, 75, 85], answer: 75 },
      { type: "choose", ltr: true, show: "۲۷ + ۴۰ = ؟", prompt: "یک پرش ۴۰تایی از ۲۷. به کجا می‌رسی؟", say: "بیست و هفت به اضافه چهل.", options: ["۳۱", "۶۷", "۷۷"], answer: "۶۷" },
      { type: "choose", ltr: true, show: "۵۴ + ۲۳ = ؟", prompt: "اول ۲۰ تا بپر، بعد ۳ تا. جواب؟", say: "پنجاه و چهار به اضافه بیست و سه. اول بیست، بعد سه.", options: ["۷۴", "۷۷", "۸۷"], answer: "۷۷" },
      { type: "numline", a: 8, b: 7, options: [14, 15, 16], prompt: "روی خط عددی: ۸ + ۷. اول تا ۱۰، بعد بقیه.", say: "هشت به اضافه هفت. اول دو تا تا ده، بعد پنج تای دیگر." },
      { type: "choose", ltr: true, show: "۳۶ + ۲۸ = ؟", prompt: "۲۰ تا بپر، بعد ۸ تا (اول ۴ تا تا ۶۰، بعد ۴ تا). جواب؟", say: "سی و شش به اضافه بیست و هشت.", options: ["۵۴", "۶۴", "۶۸"], answer: "۶۴" },
      { type: "choose", ltr: true, show: "۶۸ + ۱۵ = ؟", prompt: "یک راه: ۶۸ تا ۷۰ دو تا، بعد ۱۳ تای دیگر. جواب؟", say: "شصت و هشت به اضافه پانزده.", options: ["۷۳", "۸۳", "۸۵"], answer: "۸۳" }
    ]
  },
  {
    id: "math-sapling-26", subject: "math", level: "sapling", emoji: "⬆️", title: "تفریق با شمردن رو به بالا",
    steps: [
      { type: "choose", ltr: true, show: "۵۲ − ۴۷ = ؟", prompt: "۴۷ به ۵۲ نزدیک است. از ۴۷ بالا برو: ۳ تا تا ۵۰، ۲ تا تا ۵۲. روی هم؟", say: "پنجاه و دو منهای چهل و هفت. از چهل و هفت سه تا تا پنجاه، دو تا تا پنجاه و دو.", options: ["۵", "۶", "۹۹"], answer: "۵" },
      { type: "numline", a: 17, b: 3, options: [19, 20, 21], prompt: "از ۱۷ رو به بالا بشمار تا ۲۰: چند پرش؟ (۲۰ − ۱۷)", say: "از هفده سه پرش جلو برو. به بیست می‌رسی؟" },
      { type: "choose", ltr: true, show: "۶۱ − ۵۸ = ؟", prompt: "از ۵۸ بالا برو تا ۶۱. چندتا؟", say: "شصت و یک منهای پنجاه و هشت.", options: ["۲", "۳", "۱۳"], answer: "۳" },
      { type: "choose", ltr: true, show: "۷۰ − ۶۴ = ؟", prompt: "از ۶۴ تا ۷۰ چندتاست؟", say: "هفتاد منهای شصت و چهار.", options: ["۴", "۶", "۱۶"], answer: "۶" },
      { type: "choose", prompt: "کدام تفریق را با «شمردن رو به بالا» آسان‌تر حساب می‌کنی؟", say: "کدام تفریق را با شمردن رو به بالا آسان‌تر حساب می‌کنی؟ وقتی دو عدد به هم نزدیک‌اند.", stack: true, ltr: true,
        options: ["۸۳ − ۷۹", "۸۳ − ۵", "۸۳ − ۱۰"], answer: "۸۳ − ۷۹" },
      { type: "choose", ltr: true, show: "۴۲ − ۳۵ = ؟", prompt: "از ۳۵: ۵ تا تا ۴۰، ۲ تا تا ۴۲. جواب؟", say: "چهل و دو منهای سی و پنج.", options: ["۷", "۸", "۱۳"], answer: "۷" },
      { type: "choose", ltr: true, show: "۱۰۰ − ۹۶ = ؟", prompt: "از ۹۶ تا ۱۰۰ چندتاست؟", say: "صد منهای نود و شش.", options: ["۳", "۴", "۶"], answer: "۴" }
    ]
  },
  {
    id: "math-sapling-27", subject: "math", level: "sapling", emoji: "🧾", title: "جمع و تفریق ستونی",
    steps: [
      { type: "tens", n: 47, b: 35, hundreds: false, options: [72, 82, 712], prompt: "اول با چوب‌ها: ۴۷ + ۳۵. یکی‌ها که ده تا شوند، یک دسته می‌شوند." },
      { type: "column", op: "+", a: 47, b: 35, prompt: "حالا ستونی بنویس: از یکان شروع کن. ۷ + ۵ = ۱۲: ۲ را بنویس و ۱ دهگان را بالای دهگان‌ها ببر." },
      { type: "column", op: "+", a: 28, b: 46, prompt: "ستونی جمع کن. از یکان شروع کن." },
      { type: "tens", n: 62, b: -28, hundreds: false, options: [34, 44, 46], prompt: "با چوب‌ها: ۶۲ − ۲۸. یکان کافی نیست، پس یک دسته را باز می‌کنیم." },
      { type: "column", op: "-", a: 62, b: 28, prompt: "حالا ستونی: ۲ − ۸ نمی‌شود. یک دهگان قرض می‌گیریم: ۱۲ − ۸." },
      { type: "column", op: "-", a: 81, b: 37, prompt: "ستونی تفریق کن." },
      { type: "column", op: "+", a: 59, b: 33, prompt: "یک جمع دیگر: ستونی حساب کن." }
    ]
  },
  {
    id: "math-sapling-28", subject: "math", level: "sapling", emoji: "🔍", title: "حدس بزن، حساب کن، بررسی کن",
    steps: [
      { type: "choose", ltr: true, show: "۴۸ + ۳۱ ≈ ؟", prompt: "اول حدس بزن: ۴۸ نزدیک ۵۰ است و ۳۱ نزدیک ۳۰. جواب حدوداً چند است؟", say: "چهل و هشت به اضافه سی و یک. حدوداً چند می‌شود؟", options: ["۶۰", "۸۰", "۱۰۰"], answer: "۸۰" },
      { type: "choose", ltr: true, show: "۴۸ + ۳۱ = ؟", prompt: "حالا دقیق حساب کن. به حدست نزدیک است؟", say: "حالا دقیق حساب کن.", options: ["۷۹", "۸۹", "۷۸"], answer: "۷۹" },
      { type: "choose", ltr: true, show: "۷۹ − ۳۱ = ؟", prompt: "بررسی کن: اگر ۴۸ + ۳۱ = ۷۹ درست باشد، ۷۹ − ۳۱ چند است؟", say: "بررسی کن: هفتاد و نه منهای سی و یک چند است؟", options: ["۴۸", "۵۸", "۱۱۰"], answer: "۴۸" },
      { type: "choose", ltr: true, show: "۶۲ − ۱۹ = ۵۳", prompt: "شیرین این جواب را نوشته. حدس بزن: ۶۰ − ۲۰ = ۴۰. جوابش درست به نظر می‌رسد؟", say: "شیرین نوشته شصت و دو منهای نوزده، پنجاه و سه. حدس بزن: شصت منهای بیست، چهل. جوابش درست است؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "نادرست" },
      { type: "choose", ltr: true, show: "۶۲ − ۱۹ = ؟", prompt: "جواب درست چیست؟", say: "شصت و دو منهای نوزده.", options: ["۴۳", "۴۷", "۵۳"], answer: "۴۳" },
      { type: "numline", a: 9, b: 6, options: [14, 15, 16], prompt: "حساب کن: ۹ + ۶. بعد با تفریق بررسی کن: ۱۵ − ۶ = ۹.", say: "نه به اضافه شش." },
      { type: "choose", ltr: true, show: "؟ + ۲۷ = ۵۰", prompt: "عدد گم‌شده را پیدا کن و با جمع بررسی کن.", say: "چه عددی به اضافه بیست و هفت می‌شود پنجاه؟", options: ["۲۳", "۳۳", "۷۷"], answer: "۲۳" }
    ]
  },
  {
    id: "math-sapling-29", subject: "math", level: "sapling", emoji: "🎯", title: "بازی جمع و تفریق دورقمی",
    steps: [
      { type: "pairs", prompt: "هر حساب را با جوابش جفت کن", say: "هر حساب را با جوابش جفت کن.", pairs: [["۳۵ + ۲۰", 55], ["۸۰ − ۳۰", 50], ["۴۶ + ۲۴", 70], ["۷۲ − ۱۸", 54]] },
      { type: "sort", prompt: "جواب کدام بیشتر از ۵۰ است؟", say: "حساب‌هایی که جوابشان بیشتر از پنجاه است در یک سبد، و بقیه در سبد دیگر. اول حدس بزن.",
        baskets: [{ label: "بیشتر از ۵۰", pic: "⬆️", value: "more" }, { label: "کمتر از ۵۰", pic: "⬇️", value: "less" }],
        items: [{ label: "۳۹ + ۲۸", basket: "more" }, { label: "۷۱ − ۴۵", basket: "less" }, { label: "۲۲ + ۱۹", basket: "less" }, { label: "۹۰ − ۳۰", basket: "more" }, { label: "۴۴ + ۴۴", basket: "more" }, { label: "۶۰ − ۲۵", basket: "less" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر حساب را با جوابش جفت کن.", pairs: [["۵۸ + ۱۲", 70], ["۹۳ − ۴۰", 53], ["۲۷ + ۲۷", 54]] },
      { type: "sort", prompt: "جواب کدام زوج است؟ کدام فرد؟", say: "هر حساب را در سبد زوج یا فرد بگذار.",
        baskets: [{ label: "زوج", pic: "👟", value: "even" }, { label: "فرد", pic: "🧦", value: "odd" }],
        items: [{ label: "۲۰ + ۱۴", basket: "even" }, { label: "۳۳ + ۱۰", basket: "odd" }, { label: "۵۰ − ۱", basket: "odd" }, { label: "۴۵ + ۵", basket: "even" }] },
      { type: "pairs", prompt: "هر جمع را با تفریق بررسی‌اش جفت کن", say: "هر جمع را با تفریقی جفت کن که آن را بررسی می‌کند.", pairs: [["۳۴ + ۲۶ = ۶۰", "۶۰ − ۲۶ = ۳۴"], ["۴۵ + ۱۸ = ۶۳", "۶۳ − ۱۸ = ۴۵"]] }
    ]
  },
  {
    id: "math-sapling-9", subject: "math", level: "sapling", emoji: "📏", title: "اندازه‌گیری",
    steps: [
      { type: "measure", ask: "longer", bars: [{ thing: "🖍️", len: 4 }, { thing: "✏️", len: 6 }] },
      { type: "measure", ask: "shorter", bars: [{ thing: "🐍", len: 8 }, { thing: "🐛", len: 3 }, { thing: "🦎", len: 5 }] },
      { type: "measure", ask: "longer", bars: [{ thing: "🥄", len: 4 }, { thing: "🍴", len: 5 }, { thing: "🔑", len: 2 }] },
      { type: "measure", ask: "count", bars: [{ thing: "✏️", len: 5 }], unit: "📎", prompt: "مداد چند گیره است؟", options: [4, 5, 6] },
      { type: "measure", ask: "count", bars: [{ thing: "🥄", len: 3 }], unit: "📎", prompt: "قاشق چند گیره است؟", options: [3, 4, 2] },
      { type: "measure", ask: "count", bars: [{ thing: "🧣", len: 6 }], unit: "✋", prompt: "شال‌گردن چند وجب است؟", options: [7, 5, 6] }
    ]
  },
  {
    id: "math-sapling-30", subject: "math", level: "sapling", emoji: "📏", title: "سانتی‌متر و خط‌کش",
    steps: [
      { type: "measure", ask: "count", unit: "📏", bars: [{ thing: "✏️", len: 7 }], options: [6, 7, 8], prompt: "هر خانه یک سانتی‌متر است. مداد چند سانتی‌متر است؟ روی هر خانه بزن." },
      { type: "choose", prompt: "برای اندازه گرفتن با خط‌کش، سر چیز را کجا می‌گذاریم؟", say: "برای اندازه گرفتن با خط‌کش، سر چیز را کجا می‌گذاریم؟", stack: true,
        options: [{ label: "روی صفر", value: "0" }, { label: "روی یک", value: "1" }, { label: "هر جا که شد", value: "any" }], answer: "0" },
      { type: "choose", prompt: "سر مداد روی ۲ است و تهش روی ۹. مداد چند سانتی‌متر است؟", say: "سر مداد روی دو است و تهش روی نه. مداد چند سانتی‌متر است؟", options: ["۷", "۹", "۱۱"], answer: "۷" },
      { type: "measure", ask: "count", unit: "📏", bars: [{ thing: "🖍️", len: 4 }], options: [3, 4, 5], prompt: "مداد شمعی چند سانتی‌متر است؟" },
      { type: "choose", prompt: "کدام حدوداً یک سانتی‌متر پهنا دارد؟", say: "کدام حدوداً یک سانتی‌متر پهنا دارد؟", pic: true,
        options: [{ label: "🤏", value: "ناخن انگشت" }, { label: "📕", value: "کتاب" }, { label: "🚪", value: "در" }], answer: "ناخن انگشت" },
      { type: "measure", ask: "longer", bars: [{ thing: "🥄", len: 12 }, { thing: "🍴", len: 15 }], prompt: "قاشق ۱۲ سانتی‌متر است و چنگال ۱۵. کدام درازتر است؟" },
      { type: "doit", pic: "📏✏️", text: "با خط‌کش اندازه بگیر:",
        list: ["مداد، پاک‌کن و انگشت‌هایت را اندازه بگیر. سر هر چیز را روی صفر بگذار.", "اول حدس بزن، بعد اندازه بگیر. حدست چقدر نزدیک بود؟", "یک خط ۱۰ سانتی‌متری روی کاغذ بکش."] }
    ]
  },
  {
    id: "math-sapling-31", subject: "math", level: "sapling", emoji: "📐", title: "متر",
    steps: [
      { type: "choose", prompt: "یک متر چند سانتی‌متر است؟", say: "یک متر چند سانتی‌متر است؟", options: ["۱۰", "۱۰۰", "۱۰۰۰"], answer: "۱۰۰" },
      { type: "choose", prompt: "کدام را با متر اندازه می‌گیریم و کدام را با سانتی‌متر؟ درازی حیاط را با…", say: "درازی حیاط را با متر اندازه می‌گیریم یا با سانتی‌متر؟", options: [{ label: "متر", value: "m" }, { label: "سانتی‌متر", value: "cm" }], answer: "m" },
      { type: "choose", prompt: "درازی یک مداد را با…", say: "درازی یک مداد را با متر اندازه می‌گیریم یا با سانتی‌متر؟", options: [{ label: "متر", value: "m" }, { label: "سانتی‌متر", value: "cm" }], answer: "cm" },
      { type: "measure", ask: "count", unit: "👣", bars: [{ thing: "🛏️", len: 2 }], options: [1, 2, 3], prompt: "هر قدم بزرگ بابا حدود یک متر است. تخت چند قدم است؟ پس حدوداً چند متر؟" },
      { type: "choose", prompt: "قد تو حدوداً چقدر است؟", say: "قد یک بچه حدوداً چقدر است؟", stack: true,
        options: [{ label: "۱۲۰ سانتی‌متر", value: "120" }, { label: "۱۲ سانتی‌متر", value: "12" }, { label: "۱۲ متر", value: "12m" }], answer: "120" },
      { type: "measure", ask: "longer", bars: [{ thing: "🚌", len: 10 }, { thing: "🚗", len: 4 }, { thing: "🚲", len: 2 }], prompt: "اتوبوس ۱۰ متر، ماشین ۴ متر و دوچرخه ۲ متر است. کدام درازتر است؟" },
      { type: "doit", pic: "📐🧵", text: "یک متر بساز:",
        list: ["با خط‌کش یک نخ ۱۰۰ سانتی‌متری (یک متر) ببرید.", "با نخ اندازه بگیر: در اتاق، میز و تخت چند متر است؟", "حدس بزن کدام از یک متر درازتر است، بعد امتحان کن."] }
    ]
  },
  {
    id: "math-sapling-10", subject: "math", level: "sapling", emoji: "🍞", title: "خرید از نانوایی",
    steps: [
      { type: "money", prompt: "این پول روی هم چقدر است؟", bills: [5, 1, 1], options: [6, 7, 8] },
      { type: "money", prompt: "این پول روی هم چقدر است؟", bills: [10, 5, 2], options: [17, 16, 15] },
      { type: "money", prompt: "پول نان را بده.", items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }], wallet: [5, 2, 1, 1, 10] },
      { type: "money", prompt: "دو تا نان سنگک روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }, { emoji: "🍞", name: "نان سنگک", price: 6 }], options: [6, 12, 11] },
      { type: "money", prompt: "پول دو تا نان را بده.",
        items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }, { emoji: "🍞", name: "نان سنگک", price: 6 }], wallet: [10, 5, 1, 1, 2] },
      { type: "money", prompt: "۱۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍞", name: "نان سنگک", price: 6 }],
        bills: [10], answer: 4, options: [5, 4, 3] }
    ]
  },
  {
    id: "math-sapling-11", subject: "math", level: "sapling", emoji: "🧺", title: "خرید از بازار",
    steps: [
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍎", name: "سیب", price: 30 }, { emoji: "🍊", name: "پرتقال", price: 20 }], options: [40, 50, 60] },
      { type: "money", prompt: "پول خیار را بده.", items: [{ emoji: "🥒", name: "خیار", price: 15 }], wallet: [10, 2, 5, 5, 1] },
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🧀", name: "پنیر", price: 35 }, { emoji: "🥛", name: "شیر", price: 25 }], options: [50, 60, 70] },
      { type: "money", prompt: "۵۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍉", name: "هندوانه", price: 45 }],
        bills: [50], answer: 5, options: [15, 10, 5] },
      { type: "money", prompt: "پول انگور را بده.", items: [{ emoji: "🍇", name: "انگور", price: 28 }], wallet: [20, 10, 5, 2, 1, 1] },
      { type: "money", prompt: "روی هم چقدر می‌شود؟",
        items: [{ emoji: "🍅", name: "گوجه‌فرنگی", price: 24 }, { emoji: "🥔", name: "سیب‌زمینی", price: 18 }], options: [32, 42, 41] }
    ]
  },
  {
    id: "math-sapling-13", subject: "math", level: "sapling", emoji: "🥚", title: "دوتایی‌ها و خانواده عددها",
    steps: [
      { type: "choose", ltr: true, show: "🥚🥚🥚 + 🥚🥚🥚", prompt: "مادربزرگ در هر ظرف سه تخم‌مرغ گذاشت. دو ظرف روی هم چند تخم‌مرغ دارد؟",
        say: "مادربزرگ در هر ظرف سه تخم‌مرغ گذاشت. دو ظرف روی هم چند تخم‌مرغ دارد؟", options: ["۵", "۶", "۷"], answer: "۶" },
      { type: "choose", ltr: true, show: "۴ + ۴ = ؟", prompt: "وقتی عددی را با خودش جمع می‌کنیم، به آن دوتایی می‌گوییم. ۴ و ۴ چند می‌شود؟",
        say: "وقتی عددی را با خودش جمع می‌کنیم، به آن دوتایی می‌گوییم. چهار و چهار چند می‌شود؟", options: ["۷", "۸", "۹"], answer: "۸" },
      { type: "pairs", prompt: "هر دوتایی را با جوابش جفت کن",
        pairs: [[{ label: "۲ + ۲", say: "دو و دو" }, 4], [{ label: "۳ + ۳", say: "سه و سه" }, 6], [{ label: "۵ + ۵", say: "پنج و پنج" }, 10],
          [{ label: "۶ + ۶", say: "شش و شش" }, 12]] },
      { type: "choose", ltr: true, show: "۶ + ۷ = ؟", prompt: "۶ و ۶ می‌شود ۱۲. ۷ یکی از ۶ بیشتر است. پس ۶ و ۷ چند می‌شود؟",
        say: "شش و شش می‌شود دوازده. هفت یکی از شش بیشتر است. پس شش و هفت چند می‌شود؟", options: ["۱۲", "۱۳", "۱۴"], answer: "۱۳" },
      { type: "choose", ltr: true, show: "۸ + ۹ = ؟", prompt: "اول ۸ و ۸ را حساب کن، بعد یکی اضافه کن. جواب چند است؟",
        say: "اول هشت و هشت را حساب کن، بعد یکی اضافه کن. جواب چند است؟", options: ["۱۶", "۱۷", "۱۸"], answer: "۱۷" },
      { type: "sort", prompt: "دوتایی‌ها را در یک سبد و نزدیک دوتایی‌ها را در سبد دیگر بگذار.",
        baskets: [{ label: "دوتایی", value: "double" }, { label: "نزدیک دوتایی", value: "near" }],
        items: [{ label: "⁦۵ + ۵⁩", say: "پنج و پنج", basket: "double" }, { label: "⁦۵ + ۶⁩", say: "پنج و شش", basket: "near" },
          { label: "⁦۷ + ۷⁩", say: "هفت و هفت", basket: "double" }, { label: "⁦۷ + ۸⁩", say: "هفت و هشت", basket: "near" },
          { label: "⁦۹ + ۹⁩", say: "نه و نه", basket: "double" }, { label: "⁦۳ + ۴⁩", say: "سه و چهار", basket: "near" }] },
      { type: "choose", ltr: true, show: "۷ − ۴ = ؟", prompt: "۳ و ۴ و ۷ یک خانواده‌اند: ۳ و ۴ می‌شود ۷. پس ۷ منهای ۴ چند می‌شود؟",
        say: "سه و چهار و هفت یک خانواده‌اند: سه و چهار می‌شود هفت. پس هفت منهای چهار چند می‌شود؟", options: ["۳", "۴", "۱۱"], answer: "۳" },
      { type: "choose", ltr: true, show: "۹ − ۵ = ؟", prompt: "می‌دانیم ۴ و ۵ می‌شود ۹. پس ۹ منهای ۵ چند است؟",
        say: "می‌دانیم چهار و پنج می‌شود نه. پس نه منهای پنج چند است؟", options: ["۴", "۵", "۱۴"], answer: "۴" },
      { type: "sort", prompt: "هر جمع و تفریق را در سبد خانواده‌اش بگذار.",
        baskets: [{ label: "خانواده ۳، ۵، ۸", value: "358" }, { label: "خانواده ۲، ۷، ۹", value: "279" }],
        items: [{ label: "⁦۳ + ۵⁩", say: "سه و پنج", basket: "358" }, { label: "⁦۸ − ۵⁩", say: "هشت منهای پنج", basket: "358" },
          { label: "⁦۲ + ۷⁩", say: "دو و هفت", basket: "279" }, { label: "⁦۸ − ۳⁩", say: "هشت منهای سه", basket: "358" },
          { label: "⁦۹ − ۷⁩", say: "نه منهای هفت", basket: "279" }, { label: "⁦۹ − ۲⁩", say: "نه منهای دو", basket: "279" }] }
    ]
  },
  {
    id: "math-sapling-14", subject: "math", level: "sapling", emoji: "🃏", title: "مسئله‌های قصه‌ای",
    steps: [
      /* Place value you can see, laid out like adding in columns: Mina's 24 cards (two bundles of ten, four single
         cards) on the top row, tens on the left and ones on the right; Grandma's 13 go on the row under them, then
         her bundle joins the tens and her singles join the ones. (No sign on the stage: the question is whether to
         add or take away.) */
      { type: "scene", prompt: "به قصه گوش کن", bg: "#f6e3c6",
        parts: {
          girl: { art: "walker", look: { hair: "long", top: "#7b5ea7", bottom: "dress" }, at: [8, 89], s: 1.15 },
          m1: { art: "pcard-ten", at: [38, 58], s: 1.7, o: 0 }, m2: { art: "pcard-ten", at: [52, 58], s: 1.7, o: 0 },
          m3: { art: "pcard", at: [82, 58], s: 1.7, o: 0 }, m4: { art: "pcard", at: [91.8, 58], s: 1.7, o: 0 },
          m5: { art: "pcard", at: [101.6, 58], s: 1.7, o: 0 }, m6: { art: "pcard", at: [111.4, 58], s: 1.7, o: 0 },
          tagA: { art: "tag:۲۴", at: [22, 52], o: 0 }, tagB: { art: "tag:۱۳", at: [22, 80], o: 0 },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#3f6f8f", top: "#5a9a45", bottom: "dress" }, at: [194, 89], s: 1.3, flip: true },
          g1: { art: "pcard-ten", at: [184, 80], s: 1.7 }, g2: { art: "pcard", at: [188, 80], s: 1.7 },
          g3: { art: "pcard", at: [191, 80], s: 1.7 }, g4: { art: "pcard", at: [194, 80], s: 1.7 }
        },
        scenes: [
          { caption: "مینا ۲۴ کارت داشت.", do: [
            pop("m1", 300), pop("m2", 800), pop("m3", 1500), pop("m4", 1900), pop("m5", 2300), pop("m6", 2700), pop("tagA", 3400)
          ] },
          { caption: "مادربزرگ ۱۳ کارت آورد.", do: [
            { id: "gran", walk: [152, 89], dur: 2400 },
            { id: "g1", to: { x: 142 }, dur: 2400, ease: "linear" }, { id: "g2", to: { x: 146 }, dur: 2400, ease: "linear" },
            { id: "g3", to: { x: 149 }, dur: 2400, ease: "linear" }, { id: "g4", to: { x: 152 }, dur: 2400, ease: "linear" },
            hop("g1", [142, 80], [38, 84], 2600, 900, 6), hop("g2", [146, 80], [82, 84], 3100, 700, 5),
            hop("g3", [149, 80], [91.8, 84], 3500, 700, 5), hop("g4", [152, 80], [101.6, 84], 3900, 700, 5),
            pop("tagB", 4800)
          ] },
          { caption: "مادربزرگ کارت‌ها را به مینا داد.", do: [
            hop("g1", [38, 84], [66, 58], 300, 900, 8),
            hop("g2", [82, 84], [121.2, 58], 1400, 700, 8), hop("g3", [91.8, 84], [131, 58], 1900, 700, 8), hop("g4", [101.6, 84], [140.8, 58], 2400, 700, 8),
            { id: "tagB", to: { o: 0 }, at: 3200, dur: 400 }, { id: "tagA", to: { o: 0 }, at: 3200, dur: 400 }, jump("girl", 3400, 3)
          ] }
        ],
        question: "برای پیدا کردن همه کارت‌ها، جمع کنیم یا تفریق؟", options: ["جمع", "تفریق"], answer: "جمع" },
      { type: "choose", ltr: true, show: "۲۴ + ۱۳ = ؟", prompt: "مینا روی هم چند کارت دارد؟", say: "مینا روی هم چند کارت دارد؟",
        options: ["۳۷", "۱۱", "۳۶"], answer: "۳۷" },
      /* The baker's 45 sangak breads are four piles of ten and five single breads, counted on the stage by tens and
         then ones (a running total). Two piles (۲۰) go to the customers and leave with them; what is left gets «؟». */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "bg-street" }, table: { art: "counter-table", at: [62, 88], s: 1.25 },
          baker: { art: "walker", look: { top: "#fff", bottom: "#3f6f8f" }, at: [9, 89], s: 1.35 },
          k1: { art: "sangak-ten", at: [30, 65.5], s: 0.75 }, k2: { art: "sangak-ten", at: [47, 65.5], s: 0.75 },
          k3: { art: "sangak-ten", at: [64, 65.5], s: 0.75 }, k4: { art: "sangak-ten", at: [81, 65.5], s: 0.75 },
          o1: { art: "sangak", at: [101, 65.5], s: 0.75 }, o2: { art: "sangak", at: [101, 64.4], s: 0.75 }, o3: { art: "sangak", at: [101, 63.3], s: 0.75 },
          o4: { art: "sangak", at: [101, 62.2], s: 0.75 }, o5: { art: "sangak", at: [101, 61.1], s: 0.75 },
          total: { art: "count:big", at: [62, 46], o: 0 }, tag20: { art: "tag:۲۰", at: [128, 48], o: 0 }, rest: { art: "tag:؟", at: [48, 48], o: 0 },
          boy: { art: "walker", look: { top: "#e5483f" }, at: [178, 88], s: 1.15, flip: true },
          mom: { art: "walker", look: { hair: "auto", kind: "woman", scarf: "#8a6f9e", top: "#3f6f8f", bottom: "dress" }, at: [196, 88], s: 1.35, flip: true }
        },
        scenes: [
          { caption: "نانوای محله ۴۵ نان سنگک دارد.", do: [
            { id: "total", to: { o: 1 }, at: 300, dur: 200 },
            jump("k1", 300, 2), tally("total", 10, 300), jump("k2", 900, 2), tally("total", 20, 900),
            jump("k3", 1500, 2), tally("total", 30, 1500), jump("k4", 2100, 2), tally("total", 40, 2100),
            jump("o5", 2900, 2), tally("total", 41, 2900), tally("total", 42, 3300), tally("total", 43, 3700),
            tally("total", 44, 4100), tally("total", 45, 4500)
          ] },
          { caption: "دو مشتری آمدند.", do: [{ id: "boy", walk: [124, 88], dur: 2600 }, { id: "mom", walk: [140, 88], dur: 2600 }] },
          { caption: "نانوا ۲۰ نان به مشتری‌ها داد.", do: [
            { id: "total", to: { o: 0 }, dur: 300 },
            hop("k4", [81, 65.5], [118, 75], 300, 900, 8), hop("k3", [64, 65.5], [134, 72], 1300, 1000, 10),
            pop("tag20", 2500), pop("rest", 3300)
          ] },
          { caption: "مشتری‌ها نان‌ها را بردند. بقیه نان‌ها پیش نانوا ماند.", do: [
            { id: "boy", to: { flip: 1 }, dur: 300 }, { id: "mom", to: { flip: 1 }, dur: 300 },
            { id: "boy", walk: [186, 88], at: 300, dur: 2400 }, { id: "mom", walk: [202, 88], at: 300, dur: 2400 },
            { id: "k4", to: { x: 180 }, at: 300, dur: 2400, ease: "linear" }, { id: "k3", to: { x: 196 }, at: 300, dur: 2400, ease: "linear" },
            { id: "tag20", to: { x: 190 }, at: 300, dur: 2400, ease: "linear" },
            { id: "o1", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o2", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o3", to: { x: 66 }, at: 2900, dur: 700 },
            { id: "o4", to: { x: 66 }, at: 2900, dur: 700 }, { id: "o5", to: { x: 66 }, at: 2900, dur: 700 },
            jump("rest", 3800, 2)
          ] }
        ],
        question: "چند نان پیش نانوا مانده است؟", options: ["۲۵", "۶۵", "۲۰"], answer: "۲۵" },
      { type: "choose", prompt: "در کلاس ۱۸ دختر و ۱۵ پسر هستند. برای پیدا کردن همه بچه‌های کلاس، جمع کنیم یا تفریق؟",
        say: "در کلاس هجده دختر و پانزده پسر هستند. برای پیدا کردن همه بچه‌های کلاس، جمع کنیم یا تفریق؟", options: ["جمع", "تفریق"], answer: "جمع" },
      { type: "choose", ltr: true, show: "۱۸ + ۱۵ = ؟", prompt: "در کلاس روی هم چند بچه هست؟", say: "در کلاس روی هم چند بچه هست؟",
        options: ["۳۳", "۲۳", "۳"], answer: "۳۳" },
      { type: "choose", prompt: "آرمان ۵۰ هزار تومان داشت و یک کتاب قصه ۳۵ هزار تومانی خرید. برای پیدا کردن پولی که برایش ماند، جمع کنیم یا تفریق؟",
        say: "آرمان پنجاه هزار تومان داشت و یک کتاب قصه سی و پنج هزار تومانی خرید. برای پیدا کردن پولی که برایش ماند، جمع کنیم یا تفریق؟",
        options: ["جمع", "تفریق"], answer: "تفریق" },
      { type: "choose", ltr: true, show: "۵۰ − ۳۵ = ؟", prompt: "چند هزار تومان برای آرمان ماند؟", say: "چند هزار تومان برای آرمان ماند؟",
        options: ["۱۵", "۲۵", "۸۵"], answer: "۱۵" },
      { type: "choose", prompt: "در باغ پدربزرگ گلاره ۳۲ درخت سیب و ۲۶ درخت گلابی هست. درخت‌های سیب چندتا از درخت‌های گلابی بیشترند؟",
        say: "در باغ پدربزرگ گلاره سی و دو درخت سیب و بیست و شش درخت گلابی هست. درخت‌های سیب چندتا از درخت‌های گلابی بیشترند؟",
        options: ["۶", "۵۸", "۱۴"], answer: "۶" }
    ]
  },
  {
    id: "math-sapling-32", subject: "math", level: "sapling", emoji: "▬", title: "مدل نواری: جزء و کل",
    steps: [
      /* The bar model is drawn for a story: the whole bar (45), the known part (18, red) and the unknown part (?),
         which turns out to be 27. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          jar: { art: "🫙", at: [146, 30], s: 0.9 }, jtag: { art: "tag:۴۵", at: [146, 40] },
          whole: { art: "bar-rect", look: { w: 120, color: "#9fd3f0" }, at: [20, 50] },
          red: { art: "bar-rect", look: { w: 48, color: "#f28b82" }, at: [20, 50], sx: 0.01 },
          brace: { art: "brace", look: { w: 120 }, at: [20, 38], o: 0 }, t45: { art: "tag:۴۵", at: [80, 34], o: 0 },
          t18: { art: "tag:۱۸", at: [44, 70], o: 0 }, tq: { art: "tag:؟", at: [104, 70], o: 0 }, t27: { art: "tag:۲۷", at: [104, 70], o: 0 }
        },
        scenes: [
          { caption: "نرگس ۴۵ مهره دارد. یک نوار می‌کشیم برای همه مهره‌ها: ۴۵.", do: [{ id: "brace", to: { o: 1 }, at: 300, dur: 300 }, { id: "brace", draw: true, at: 300, dur: 900 }, { id: "t45", to: { o: 1 }, at: 1100, dur: 300 }] },
          { caption: "۱۸ تا قرمزند. یک تکه از نوار را برای قرمزها جدا می‌کنیم.", do: [{ id: "red", to: { sx: 1 }, at: 300, dur: 1500 }, { id: "t18", to: { o: 1 }, at: 1800, dur: 300 }] },
          { caption: "بقیه آبی‌اند. چندتا؟ این تکه را نمی‌دانیم: علامت سؤال.", do: [{ id: "tq", to: { o: 1 }, at: 300, dur: 300 }, jump("tq", 700, 2)] },
          { caption: "کل منهای جزء: ۴۵ − ۱۸ = ۲۷. بیست و هفت مهره آبی است.", do: [{ id: "tq", to: { o: 0 }, dur: 300 }, { id: "t27", to: { o: 1 }, at: 300, dur: 300 }, pop("t27", 300, 0.3)] }
        ],
        question: "اگر کل را بدانیم و یک جزء را، جزء دیگر را چطور پیدا می‌کنیم؟", stack: true,
        options: [{ label: "کل منهای جزء", value: "sub" }, { label: "کل به اضافه جزء", value: "add" }], answer: "sub" },
      { type: "bar", prompt: "در کلاس ۳۲ بچه هستند. ۱۵ نفر دخترند. چند نفر پسرند؟", bars: [{ label: "بچه‌ها", parts: [15, "?"] }], whole: 32, options: [17, 27, 47], answer: 17, result: "۳۲ − ۱۵ = ۱۷" },
      { type: "bar", prompt: "مریم ۲۴ تمبر دارد و آرش ۱۹ تمبر. روی هم چندتا دارند؟", bars: [{ label: "تمبرها", parts: [24, 19] }], whole: "?", options: [33, 43, 5], answer: 43, result: "۲۴ + ۱۹ = ۴۳" },
      { type: "bar", mark: true, prompt: "یک کیسه ۵۰ گردو دارد. ۲۳ تا را شکستیم. چندتا شکسته نشده؟ اول عددها را در جای خودشان بگذار.", bars: [{ label: "گردوها", parts: [23, "?"] }], whole: 50, options: [27, 33, 73], answer: 27, result: "۵۰ − ۲۳ = ۲۷" },
      { type: "bar", prompt: "در یک قفسه ۳۶ کتاب داستان و ۲۸ کتاب علمی است. روی هم چند کتاب؟", bars: [{ label: "کتاب‌ها", parts: [36, 28] }], whole: "?", options: [54, 64, 8], answer: 64, result: "۳۶ + ۲۸ = ۶۴" }
    ]
  },
  {
    id: "math-sapling-33", subject: "math", level: "sapling", emoji: "⚖️", title: "مدل نواری: مقایسه",
    steps: [
      { type: "bar", prompt: "علی ۳۵ تیله دارد و سارا ۲۳ تیله. علی چندتا بیشتر دارد؟", bars: [{ label: "علی", parts: [35] }, { label: "سارا", parts: [23] }], diff: "?", options: [12, 22, 58], answer: 12, result: "۳۵ − ۲۳ = ۱۲" },
      { type: "bar", prompt: "درخت گردو ۴۲ گردو داد و درخت بادام ۱۷ بادام کمتر. درخت بادام چندتا داد؟", bars: [{ label: "گردو", parts: [42] }, { label: "بادام", parts: ["?"] }], diff: 17, options: [25, 35, 59], answer: 25, result: "۴۲ − ۱۷ = ۲۵" },
      { type: "choose", prompt: "در مسئله «چندتا بیشتر؟» کدام کار را می‌کنیم؟", say: "در مسئله چندتا بیشتر، کدام کار را می‌کنیم؟", stack: true,
        options: [{ label: "عدد بزرگ منهای عدد کوچک", value: "sub" }, { label: "دو عدد را جمع می‌کنیم", value: "add" }], answer: "sub" },
      { type: "bar", prompt: "کیان ۲۸ کارت دارد. خواهرش ۱۵ کارت بیشتر دارد. خواهرش چندتا دارد؟", bars: [{ label: "کیان", parts: [28] }, { label: "خواهر", parts: [28, 15] }], braces: [{ bar: 1, text: "؟" }], options: [13, 43, 33], answer: 43, result: "۲۸ + ۱۵ = ۴۳" },
      { type: "choose", ltr: true, prompt: "یک مرغ ۶۰ تخم گذاشت و دیگری ۴۵. اولی چندتا بیشتر گذاشت؟", say: "یک مرغ شصت تخم گذاشت و دیگری چهل و پنج. اولی چندتا بیشتر گذاشت؟", options: ["۱۵", "۲۵", "۱۰۵"], answer: "۱۵" },
      { type: "bar", models: [
          { bars: [{ label: "علی", parts: [30] }, { label: "رضا", parts: [18] }], diff: "?" },
          { bars: [{ label: "همه", parts: [30, 18] }], whole: "?" }
        ], prompt: "علی ۳۰ تومان دارد و رضا ۱۸ تومان. علی چقدر بیشتر دارد؟ کدام مدل با مسئله جور است؟", answer: 0 }
    ]
  },
  {
    id: "math-sapling-34", subject: "math", level: "sapling", emoji: "❓", title: "عدد مجهول",
    steps: [
      { type: "balance", left: [{ pic: "📦", mass: 27, label: "؟", say: "جعبه" }, 18], right: [], open: "right", tray: [20, 20, 5, 10, 2, 1], unit: "",
        prompt: "□ + ۱۸ = ۴۵ : یک جعبه و ۱۸ در یک کفه است. وزنه بگذار تا ترازو صاف شود و ۴۵ بشود.", question: "جعبه چقدر است؟", options: [27, 37, 63], answer: 27 },
      { type: "choose", ltr: true, show: "□ + ۱۸ = ۴۵", prompt: "با تفریق پیدایش کن: ۴۵ − ۱۸. بعد با جمع بررسی کن.", say: "چه عددی به اضافه هجده می‌شود چهل و پنج؟", options: ["۲۷", "۳۳", "۶۳"], answer: "۲۷" },
      { type: "bar", prompt: "۵۲ − □ = ۲۰ : از ۵۲ چندتا برداشتیم که ۲۰ ماند؟", bars: [{ label: "", parts: [20, "?"] }], whole: 52, options: [22, 32, 72], answer: 32, result: "۵۲ − ۳۲ = ۲۰" },
      { type: "choose", ltr: true, show: "□ − ۱۵ = ۳۰", prompt: "از یک عدد ۱۵ تا برداشتیم و ۳۰ ماند. آن عدد چند بود؟", say: "چه عددی منهای پانزده می‌شود سی؟", options: ["۱۵", "۴۵", "۳۵"], answer: "۴۵" },
      { type: "bar", prompt: "□ + ۲۶ = ۶۰ : جزء دیگر چند است؟", bars: [{ label: "", parts: ["?", 26] }], whole: 60, options: [34, 44, 86], answer: 34, result: "۶۰ − ۲۶ = ۳۴" },
      { type: "choose", ltr: true, show: "۷۰ = □ + ۴۵", prompt: "جای □ چه عددی است؟", say: "هفتاد مساوی چه عددی به اضافه چهل و پنج؟", options: ["۲۵", "۳۵", "۱۱۵"], answer: "۲۵" }
    ]
  },
  {
    id: "math-sapling-35", subject: "math", level: "sapling", emoji: "🛒", title: "مسئله‌های دو مرحله‌ای",
    steps: [
      /* A two-step problem drawn as a bar: the whole (50), two known parts (15 and 20), the change unknown; first the
         two parts are added (35), then taken from the whole (15). */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          money: { art: "💵", at: [10, 30], s: 0.8 }, bread: { art: "🫓", at: [10, 66], s: 0.7, o: 0 }, fruit: { art: "🍎", at: [150, 66], s: 0.7, o: 0 },
          whole: { art: "bar-rect", look: { w: 120, color: "#d7efc6" }, at: [20, 50] },
          p1: { art: "bar-rect", look: { w: 36, color: "#f6b73c" }, at: [20, 50], sx: 0.01 }, p2: { art: "bar-rect", look: { w: 48, color: "#f28b82" }, at: [56, 50], sx: 0.01 },
          brace: { art: "brace", look: { w: 120 }, at: [20, 38] }, t50: { art: "tag:۵۰", at: [80, 34] },
          t15: { art: "tag:۱۵", at: [38, 70], o: 0 }, t20: { art: "tag:۲۰", at: [80, 70], o: 0 }, tq: { art: "tag:؟", at: [122, 70], o: 0 },
          t35: { art: "tag:۳۵", at: [56, 84], o: 0 }, ans: { art: "tag:۱۵", at: [122, 70], o: 0 }
        },
        scenes: [
          { caption: "مادر ۵۰ هزار تومان داشت. این نوار همه پولش است.", do: [jump("t50", 300, 2)] },
          { caption: "۱۵ هزار تومان نان خرید و ۲۰ هزار تومان میوه.", do: [
            pop("bread", 0), pop("fruit", 1700),
            { id: "p1", to: { sx: 1 }, at: 300, dur: 1200 }, { id: "t15", to: { o: 1 }, at: 1500, dur: 300 },
            { id: "p2", to: { sx: 1 }, at: 2000, dur: 1400 }, { id: "t20", to: { o: 1 }, at: 3400, dur: 300 }, { id: "tq", to: { o: 1 }, at: 3900, dur: 300 }
          ] },
          { caption: "مرحله اول: چقدر خرج کرد؟ ۱۵ + ۲۰ = ۳۵.", do: [{ id: "t35", to: { o: 1 }, at: 300, dur: 300 }, pop("t35", 300, 0.3)] },
          { caption: "مرحله دوم: چقدر ماند؟ ۵۰ − ۳۵ = ۱۵.", do: [{ id: "tq", to: { o: 0 }, dur: 300 }, { id: "ans", to: { o: 1 }, at: 300, dur: 300 }, pop("ans", 300, 0.3)] }
        ],
        question: "مادر چقدر پول برایش ماند؟ (هزار تومان)", options: [15, 35, 85], answer: 15 },
      { type: "bar", prompt: "رضا ۸۰ هزار تومان داشت. کتابی ۳۵ هزار تومانی و دفتری ۱۵ هزار تومانی خرید. چقدر ماند؟", bars: [{ label: "پول", parts: [35, 15, "?"] }], whole: 80, options: [30, 50, 130], answer: 30, result: "۳۵ + ۱۵ = ۵۰ ، ۸۰ − ۵۰ = ۳۰" },
      { type: "choose", prompt: "در اتوبوس ۲۵ نفر بودند. در ایستگاه ۸ نفر پیاده و ۱۲ نفر سوار شدند. حالا چند نفرند؟", say: "در اتوبوس بیست و پنج نفر بودند. در ایستگاه هشت نفر پیاده و دوازده نفر سوار شدند. حالا چند نفرند؟", options: ["۲۱", "۲۹", "۴۵"], answer: "۲۹" },
      { type: "bar", prompt: "سیما ۴۲ برگه داشت و مینا ۱۸ برگه کمتر. روی هم چند برگه دارند؟ (اول برگه‌های مینا را پیدا کن)", bars: [{ label: "سیما", parts: [42] }, { label: "مینا", parts: [{ n: 24, text: "" }] }], diff: 18, total: "?", options: [24, 60, 66], answer: 66, result: "۴۲ − ۱۸ = ۲۴ ، ۴۲ + ۲۴ = ۶۶" },
      { type: "choose", prompt: "پدربزرگ ۶۰ گردو داشت. ۲۰ تا به نوه‌ها داد و ۱۵ تا شکست. چندتا ماند؟", say: "پدربزرگ شصت گردو داشت. بیست تا به نوه‌ها داد و پانزده تا شکست. چندتا ماند؟", options: ["۲۵", "۳۵", "۴۵"], answer: "۲۵" }
    ]
  },
  {
    id: "math-sapling-15", subject: "math", level: "sapling", emoji: "🕒", title: "ساعت",
    steps: [
      { type: "clock", ask: "show", time: "3:00",
        prompt: "ساعت دو عقربه دارد. عقربه کوتاه ساعت را نشان می‌دهد و عقربه بلند دقیقه را. عقربه بلند روی ۱۲ است و عقربه کوتاه روی ۳. پس ساعت ۳ است.",
        say: "ساعت دو عقربه دارد. عقربه کوتاه ساعت را نشان می‌دهد و عقربه بلند دقیقه را. عقربه بلند روی دوازده است و عقربه کوتاه روی سه. پس ساعت سه است." },
      { type: "clock", ask: "show", start: "3:00", time: "3:30",
        prompt: "ببین: عقربه بلند نیم دور می‌چرخد و روی ۶ می‌رود. عقربه کوتاه هم کمی جلو می‌رود و بین ۳ و ۴ می‌ایستد. حالا ساعت ۳ و نیم است.",
        say: "ببین: عقربه بلند نیم دور می‌چرخد و روی شش می‌رود. عقربه کوتاه هم کمی جلو می‌رود و بین سه و چهار می‌ایستد. حالا ساعت سه و نیم است." },
      { type: "clock", start: "3:00", prompt: "حالا خودت عقربه‌ها را بچرخان و ببین ساعت چند می‌شود.", say: "حالا خودت عقربه‌ها را بچرخان و ببین ساعت چند می‌شود." },
      { type: "clock", time: "7:00", options: ["7:00", "12:00", "8:00"], pic: "⏰", prompt: "آرش صبح‌ها این ساعت بیدار می‌شود. ساعت چند است؟" },
      { type: "clock", time: "9:30", options: ["9:00", "9:30", "10:30"] },
      { type: "clock", time: "4:00", pic: "🎨", prompt: "زهرا ساعت ۴ به کلاس نقاشی می‌رود. عقربه‌ها را روی ساعت ۴ بگذار." },
      { type: "clock", time: "1:30", options: ["1:30", "1:00", "2:30"], pic: "🍲", prompt: "ناهار آماده است. ساعت چند است؟" },
      { type: "clock", time: "7:30", pic: "🏫", prompt: "کاوه ساعت ۷ و نیم به مدرسه می‌رود. عقربه‌ها را روی ساعت ۷ و نیم بگذار." },
      { type: "clock", time: "9:00", start: "8:00", pic: "🛏️", prompt: "شب‌ها نیلوفر ساعت ۹ می‌خوابد. عقربه‌ها را روی ساعت ۹ بگذار." }
    ]
  },
  {
    id: "math-sapling-36", subject: "math", level: "sapling", emoji: "🕓", title: "ربع و پنج دقیقه",
    steps: [
      { type: "clock", ask: "show", start: "4:00", time: "4:15", snap: 5, prompt: "عقربه بلند هر عدد را که رد می‌کند، پنج دقیقه گذشته. ببین: ۵، ۱۰، ۱۵. ساعت ۴ و ربع است.", say: "عقربه بلند هر عدد را که رد می‌کند، پنج دقیقه گذشته. پنج، ده، پانزده. ساعت چهار و ربع است." },
      { type: "clock", time: "7:45", options: ["7:45", "8:45", "7:09"], snap: 5, prompt: "ساعت چند است؟ (یک ربع به ۸)" },
      { type: "clock", time: "2:05", options: ["2:05", "2:01", "1:05"], snap: 5 },
      { type: "clock", time: "9:20", snap: 5, start: "9:00", pic: "🚌", prompt: "سرویس ساعت ۹ و ۲۰ دقیقه می‌آید. عقربه بلند را روی ۴ بگذار." },
      { type: "choose", prompt: "وقتی عقربه بلند روی ۶ است، چند دقیقه از ساعت گذشته؟", say: "وقتی عقربه بلند روی شش است، چند دقیقه از ساعت گذشته؟", options: ["۶", "۳۰", "۶۰"], answer: "۳۰" },
      { type: "clock", time: "11:50", options: ["11:50", "10:50", "11:10"], snap: 5, pic: "🍞", prompt: "نانوایی این ساعت شلوغ است. ساعت چند است؟" },
      { type: "clock", time: "6:35", snap: 5, start: "6:00", pic: "📺", prompt: "ساعت ۶ و ۳۵ دقیقه را نشان بده." }
    ]
  },
  {
    id: "math-sapling-37", subject: "math", level: "sapling", emoji: "📆", title: "تقویم",
    steps: [
      { type: "choose", prompt: "سال ما چند ماه دارد؟", say: "سال چند ماه دارد؟", options: ["۱۰", "۱۲", "۷"], answer: "۱۲" },
      { type: "order", numbered: true, prompt: "ماه‌های تابستان و پاییز را به ترتیب بچین", say: "تیر، مرداد، شهریور، مهر، آبان، آذر. به ترتیب بچین.",
        items: [{ label: "تیر" }, { label: "مرداد" }, { label: "شهریور" }, { label: "مهر" }, { label: "آبان" }, { label: "آذر" }] },
      { type: "choose", prompt: "شش ماه اول سال چند روز دارند؟", say: "فروردین تا شهریور، هر ماه چند روز دارد؟", options: ["۲۹", "۳۰", "۳۱"], answer: "۳۱" },
      { type: "choose", prompt: "امروز سه‌شنبه ۵ مهر است. یک هفته بعد چه روزی است؟", say: "امروز سه‌شنبه پنجم مهر است. یک هفته بعد چه روزی است؟", stack: true,
        options: [{ label: "سه‌شنبه ۱۲ مهر", value: "12" }, { label: "چهارشنبه ۶ مهر", value: "6" }, { label: "سه‌شنبه ۱۰ مهر", value: "10" }], answer: "12" },
      { type: "choose", prompt: "نوروز، اول کدام ماه است؟", say: "نوروز، اولین روز کدام ماه است؟", options: [{ label: "فروردین", value: "farvardin" }, { label: "مهر", value: "mehr" }, { label: "دی", value: "dey" }], answer: "farvardin" },
      { type: "choose", prompt: "تولد هومن ۱۸ آبان است و امروز ۱۰ آبان. چند روز مانده؟", say: "تولد هومن هجدهم آبان است و امروز دهم آبان. چند روز مانده؟", options: ["۷", "۸", "۲۸"], answer: "۸" },
      { type: "doit", pic: "📆✏️", text: "با تقویم خانه:",
        list: ["تاریخ امروز را پیدا کن: روز، ماه و سال.", "تولد خودت و یکی از اعضای خانواده را روی تقویم پیدا کن. چند روز مانده؟", "بشمار این ماه چند جمعه دارد."] }
    ]
  },
  {
    id: "math-sapling-16", subject: "math", level: "sapling", emoji: "⚖️", title: "سنگین و سبک",
    steps: [
      { type: "balance", left: [{ pic: "🍉", mass: 5, say: "هندوانه" }], right: [{ pic: "🍎", mass: 1, say: "سیب" }],
        prompt: "در میوه‌فروشی، یک هندوانه و یک سیب را روی ترازو گذاشتیم. کدام طرف سنگین‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "lighter", left: [{ pic: "🎈", mass: 1, say: "بادکنک" }], right: [{ pic: "🔑", mass: 2, say: "کلید" }],
        prompt: "بادکنک از کلید بزرگ‌تر است. ولی کدام سبک‌تر است؟ روی آن کفه بزن." },
      { type: "balance", ask: "explore", tray: [{ pic: "🍉", mass: 5, say: "هندوانه" }, { pic: "🍎", mass: 1, say: "سیب" }, { pic: "🍈", mass: 3, say: "طالبی" },
        { pic: "🥕", mass: 1, say: "هویج" }, { pic: "📚", mass: 4, say: "کتاب‌ها" }],
        prompt: "چیزها را روی دو کفه ترازو بگذار. کدام از همه سنگین‌تر است؟" },
      { type: "balance", left: [{ pic: "🍈", mass: 3, say: "طالبی" }], open: "right", tray: [1, 1, 1, 1, 1],
        prompt: "رها و مادرش یک طالبی خریدند. وزنه‌های یک کیلویی را روی کفه راست بگذار تا ترازو صاف شود.",
        question: "طالبی چند کیلو است؟", options: [2, 3, 4], answer: 3 },
      { type: "balance", left: [{ pic: "🍉", mass: 6, say: "هندوانه" }], open: "right", tray: [5, 2, 1, 1],
        prompt: "امید می‌خواهد هندوانه را وزن کند. وزنه بگذار تا ترازو صاف شود.",
        question: "هندوانه چند کیلو است؟", options: [5, 6, 7], answer: 6 },
      { type: "balance", held: true, left: [2, 2, 1], right: [5, 1],
        prompt: "دست فروشنده ترازو را نگه داشته است. وزنه‌های هر طرف را جمع کن. کدام طرف سنگین‌تر است؟" },
      { type: "balance", left: [10, 5], right: [10], open: "right", tray: [1, 2, 2, 5],
        prompt: "کفه راست چقدر کم دارد؟ وزنه بگذار تا ترازو صاف شود." }
    ]
  },
  {
    id: "math-sapling-38", subject: "math", level: "sapling", emoji: "🧂", title: "کیلوگرم و گرم",
    steps: [
      { type: "choose", prompt: "یک کیلوگرم چند گرم است؟", say: "یک کیلوگرم چند گرم است؟", options: ["۱۰", "۱۰۰", "۱۰۰۰"], answer: "۱۰۰۰" },
      { type: "balance", left: [{ pic: "🍉", mass: 4, say: "هندوانه" }], open: "right", tray: [2, 1, 1, 1, 5], unit: "کیلو",
        prompt: "هندوانه را با وزنه‌های کیلویی وزن کن.", question: "هندوانه چند کیلوگرم است؟", options: [3, 4, 5], answer: 4 },
      { type: "balance", left: [{ pic: "🧈", mass: 250, say: "کره" }], open: "right", tray: [100, 100, 50, 200], unit: "گرم",
        prompt: "کره را با وزنه‌های گرمی وزن کن.", question: "کره چند گرم است؟", options: [150, 250, 350], answer: 250 },
      { type: "choose", prompt: "کدام را با گرم وزن می‌کنیم؟", say: "کدام را با گرم وزن می‌کنیم؟ یک کیسه برنج، یک بسته زعفران، یا یک گوسفند؟", pic: true,
        options: [{ label: "🍚", value: "برنج" }, { label: "🌸", value: "زعفران" }, { label: "🐑", value: "گوسفند" }], answer: "زعفران" },
      { type: "balance", ask: "heavier", left: [{ pic: "📦", mass: 2, label: "۲ کیلو", say: "جعبه دو کیلویی" }], right: [{ pic: "🛍️", mass: 1.5, label: "۱۵۰۰ گرم", say: "کیسه هزار و پانصد گرمی" }], held: true,
        prompt: "یک جعبه ۲ کیلوگرمی و یک کیسه ۱۵۰۰ گرمی. کدام سنگین‌تر است؟ (۲ کیلو یعنی ۲۰۰۰ گرم)" },
      { type: "choose", prompt: "نیم کیلو گوجه چند گرم است؟", say: "نیم کیلو گوجه چند گرم است؟", options: ["۵۰", "۵۰۰", "۵۰۰۰"], answer: "۵۰۰" },
      { type: "choose", prompt: "یک کیسه ۳ کیلویی برنج و یک کیسه ۲ کیلویی. روی هم چند کیلوگرم؟", say: "یک کیسه سه کیلویی برنج و یک کیسه دو کیلویی. روی هم چند کیلوگرم؟", options: ["۱", "۵", "۶"], answer: "۵" }
    ]
  },
  {
    id: "math-sapling-39", subject: "math", level: "sapling", emoji: "🥛", title: "لیتر",
    steps: [
      { type: "choose", prompt: "یک بطری بزرگ آب حدوداً چقدر جا دارد؟", say: "یک بطری بزرگ آب حدوداً چقدر جا دارد؟", stack: true,
        options: [{ label: "۱ لیتر", value: "1" }, { label: "۱۰۰ لیتر", value: "100" }, { label: "۱ قاشق", value: "spoon" }], answer: "1" },
      { type: "choose", prompt: "کدام بیشتر از یک لیتر جا دارد؟", say: "کدام بیشتر از یک لیتر جا دارد؟ استکان، سطل یا قاشق؟", pic: true,
        options: [{ label: "🍵", value: "استکان" }, { label: "🪣", value: "سطل" }, { label: "🥄", value: "قاشق" }], answer: "سطل" },
      { type: "choose", prompt: "یک لیتر چند میلی‌لیتر است؟", say: "یک لیتر چند میلی‌لیتر است؟", options: ["۱۰", "۱۰۰", "۱۰۰۰"], answer: "۱۰۰۰" },
      { type: "choose", prompt: "یک پارچ ۲ لیتر آب دارد. چهار لیوان نیم‌لیتری از آن پر می‌شود؟", say: "یک پارچ دو لیتر آب دارد. با آن چند لیوان نیم‌لیتری پر می‌شود؟", options: ["۲", "۴", "۸"], answer: "۴" },
      { type: "choose", prompt: "یک کتری ۳ لیتر آب دارد. ۱ لیتر را برای چای برداشتیم. چند لیتر ماند؟", say: "یک کتری سه لیتر آب دارد. یک لیتر را برای چای برداشتیم. چند لیتر ماند؟", options: ["۱", "۲", "۴"], answer: "۲" },
      { type: "choose", prompt: "یک وان حمام حدوداً چقدر آب جا دارد؟", say: "یک وان حمام حدوداً چقدر آب جا دارد؟", stack: true,
        options: [{ label: "۲ لیتر", value: "2" }, { label: "۲۰۰ لیتر", value: "200" }, { label: "۲۰۰۰۰ لیتر", value: "20000" }], answer: "200" },
      { type: "doit", pic: "🫗🥛", text: "یک لیتر را ببین:",
        list: ["یک بطری یک‌لیتری آب پیدا کن (روی برچسبش نوشته).", "آن را در لیوان‌ها بریز. یک لیتر چند لیوان شد؟", "حدس بزن کتری یا قابلمه چند لیتر جا دارد، بعد با بطری امتحان کن."] }
    ]
  },
  {
    id: "math-sapling-17", subject: "math", level: "sapling", emoji: "📦", title: "عددهای سه‌رقمی",
    steps: [
      { type: "tens", n: 100, prompt: "ده دسته ده‌تایی. روی هم چند تا چوب است؟", options: [10, 100, 1000] },
      { type: "tens", build: true, n: 100, hundreds: true, prompt: "ده دسته ده‌تایی بگذار و ببین چه می‌شود." },
      { type: "tens", n: 234, options: [234, 432, 9] },
      { type: "tens", n: 305, options: [35, 350, 305] },
      { type: "tens", build: true, n: 142 },
      { type: "choose", show: "۴۷۶", prompt: "در این عدد چند بسته صدتایی هست؟", options: ["۷", "۴", "۶"], answer: "۴" },
      { type: "tens", n: 130, b: -50, options: [80, 180, 70] },
      { type: "compare", a: 352, b: 325, pic: "tens", ask: "symbol" },
      { type: "choose", prompt: "بعد از ۹۹۹ کدام عدد می‌آید؟", options: ["۱۰۰۰", "۹۹۸", "۱۰۰"], answer: "۱۰۰۰" }
    ]
  },
  {
    id: "math-sapling-40", subject: "math", level: "sapling", emoji: "🔢", title: "ارزش مکانی تا هزار",
    steps: [
      { type: "tens", n: 345, options: [345, 354, 543], prompt: "این عدد چند است؟ ۳ بسته صدتایی، ۴ دسته ده‌تایی و ۵ تا." },
      { type: "choose", ltr: true, show: "۳۴۵ = ۳۰۰ + ۴۰ + ؟", prompt: "جای ؟ چه عددی است؟", say: "سیصد و چهل و پنج مساوی سیصد به اضافه چهل به اضافه چند؟", options: ["۴", "۵", "۵۰"], answer: "۵" },
      { type: "tens", build: true, n: 208, prompt: "۲۰۸ را بساز: دو بسته صدتایی، هیچ دسته ده‌تایی، و هشت تا." },
      { type: "choose", ltr: true, show: "۶۰۷", prompt: "رقم ۰ در ۶۰۷ چه می‌گوید؟", say: "رقم صفر در ششصد و هفت چه می‌گوید؟", stack: true,
        options: [{ label: "هیچ دهگانی ندارد", value: "0" }, { label: "هیچ صدگانی ندارد", value: "h" }, { label: "عدد صفر است", value: "z" }], answer: "0" },
      { type: "choose", ltr: true, prompt: "«چهارصد و نود و دو» را چطور می‌نویسیم؟", say: "چهارصد و نود و دو را چطور می‌نویسیم؟", options: ["۴۹۲", "۴۰۹۲", "۹۴۲"], answer: "۴۹۲" },
      { type: "tens", n: 560, b: 100, options: [570, 660, 1560], prompt: "۵۶۰ و یک بسته صدتایی دیگر. چندتا می‌شود؟" },
      { type: "choose", ltr: true, show: "۸۹۹ + ۱ = ؟", prompt: "یکی بیشتر از ۸۹۹ چند است؟", say: "هشتصد و نود و نه به اضافه یک.", options: ["۸۱۰", "۹۰۰", "۹۰۹"], answer: "۹۰۰" },
      { type: "numline", a: 10, b: 10, options: [11, 20, 100], prompt: "قورباغه روی ۱۰ است و ده خانه جلو می‌پرد. ده تا ده تا: به کجا می‌رسد؟", say: "قورباغه روی ده است و ده خانه جلو می‌پرد." }
    ]
  },
  {
    id: "math-sapling-41", subject: "math", level: "sapling", emoji: "➕", title: "جمع سه‌رقمی",
    steps: [
      { type: "tens", n: 245, b: 132, options: [377, 367, 477], prompt: "با بسته‌ها: ۲۴۵ + ۱۳۲. صدها با صدها، ده‌ها با ده‌ها، یکی‌ها با یکی‌ها." },
      { type: "column", op: "+", a: 245, b: 132, prompt: "حالا ستونی بنویس. از یکان شروع کن." },
      { type: "tens", n: 368, b: 254, options: [512, 622, 612], prompt: "۳۶۸ + ۲۵۴: یکی‌ها ده تا می‌شوند و یک دسته می‌سازند؛ ده‌ها هم ده تا می‌شوند و یک بسته صدتایی می‌سازند." },
      { type: "column", op: "+", a: 368, b: 254, prompt: "ستونی جمع کن. یکی به دهگان، یکی به صدگان می‌رود." },
      { type: "choose", ltr: true, show: "۴۹۸ + ۲۰۳ ≈ ؟", prompt: "اول حدس بزن: ۵۰۰ و ۲۰۰. جواب حدوداً چند است؟", say: "چهارصد و نود و هشت به اضافه دویست و سه. حدوداً چند است؟", options: ["۵۰۰", "۷۰۰", "۹۰۰"], answer: "۷۰۰" },
      { type: "column", op: "+", a: 498, b: 203, prompt: "حالا دقیق حساب کن. به حدست نزدیک است؟" },
      { type: "column", op: "+", a: 175, b: 389, prompt: "یک جمع دیگر: ستونی حساب کن." }
    ]
  },
  {
    id: "math-sapling-42", subject: "math", level: "sapling", emoji: "➖", title: "تفریق سه‌رقمی",
    steps: [
      { type: "tens", n: 465, b: -132, options: [333, 323, 597], prompt: "با بسته‌ها: ۴۶۵ − ۱۳۲." },
      { type: "column", op: "-", a: 465, b: 132, prompt: "ستونی تفریق کن. از یکان شروع کن." },
      { type: "tens", n: 352, b: -128, options: [224, 236, 234], prompt: "۳۵۲ − ۱۲۸: یکی‌ها کم است، یک دسته ده‌تایی را باز می‌کنیم." },
      { type: "column", op: "-", a: 352, b: 128, prompt: "ستونی: یک دهگان قرض بگیر." },
      { type: "tens", n: 403, b: -178, options: [225, 235, 375], prompt: "۴۰۳ − ۱۷۸: دهگان صفر است! اول یک بسته صدتایی را باز می‌کنیم، بعد یک دسته ده‌تایی را." },
      { type: "column", op: "-", a: 403, b: 178, prompt: "ستونی: از صفر نمی‌شود قرض گرفت، پس از صدگان قرض می‌گیریم." },
      { type: "choose", ltr: true, show: "۶۰۰ − ۲۴۵ = ؟", prompt: "حساب کن و با جمع بررسی کن.", say: "ششصد منهای دویست و چهل و پنج.", options: ["۳۵۵", "۴۶۵", "۳۶۵"], answer: "۳۵۵" }
    ]
  },
  {
    id: "math-sapling-43", subject: "math", level: "sapling", emoji: "🎲", title: "بازی عددهای سه‌رقمی",
    steps: [
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "این عددها را از کوچک به بزرگ بچین.", ltr: true, items: [199, 290, 302, 320, 913] },
      { type: "pairs", prompt: "هر عدد را با شکل گسترده‌اش جفت کن", say: "هر عدد را با شکل گسترده‌اش جفت کن.", pairs: [["۳۰۰ + ۴۰ + ۵", 345], ["۵۰۰ + ۴", 504], ["۴۰۰ + ۵۰", 450]] },
      { type: "sort", prompt: "جواب کدام بیشتر از ۵۰۰ است؟", say: "جمع‌ها و تفریق‌هایی که جوابشان بیشتر از پانصد است در یک سبد، بقیه در سبد دیگر. اول حدس بزن.",
        baskets: [{ label: "بیشتر از ۵۰۰", pic: "⬆️", value: "more" }, { label: "کمتر از ۵۰۰", pic: "⬇️", value: "less" }],
        items: [{ label: "۳۰۰ + ۲۵۰", basket: "more" }, { label: "۹۰۰ − ۵۰۰", basket: "less" }, { label: "۲۴۹ + ۱۰۰", basket: "less" }, { label: "۴۵۰ + ۱۰۰", basket: "more" }, { label: "۷۰۰ − ۱۵۰", basket: "more" }, { label: "۶۰۰ − ۲۰۰", basket: "less" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر حساب را با جوابش جفت کن.", pairs: [["۲۵۰ + ۲۵۰", 500], ["۸۰۰ − ۳۷۵", 425], ["۱۲۰ + ۳۰۰", 420]] },
      { type: "order", prompt: "از بزرگ به کوچک بچین", say: "این عددها را از بزرگ به کوچک بچین.", ltr: true, items: [876, 867, 786, 768] }
    ]
  },
  {
    id: "math-sapling-44", subject: "math", level: "sapling", emoji: "⬠", title: "چندضلعی‌ها",
    steps: [
      { type: "shape", show: ["triangle", "square", "pentagon", "hexagon"], prompt: "شکلی که با ضلع‌های صاف بسته شده، چندضلعی است. اسمش از تعداد ضلع‌هایش می‌آید: سه‌ضلعی (مثلث)، چهارضلعی، پنج‌ضلعی، شش‌ضلعی." },
      { type: "shape", show: "pentagon", prompt: "این شکل چند ضلع دارد؟", options: [4, 5, 6], answer: 5 },
      { type: "shape", show: "hexagon", prompt: "این شکل چند رأس (گوشه) دارد؟", options: [5, 6, 8], answer: 6 },
      { type: "shape", prompt: "شش‌ضلعی کدام است؟", say: "شش‌ضلعی کدام است؟ ضلع‌ها را بشمار.", options: ["pentagon", "octagon", "hexagon"], answer: "hexagon" },
      { type: "sort", prompt: "شکل‌ها را بر اساس تعداد ضلع دسته کن", say: "پنج‌ضلعی‌ها، شش‌ضلعی‌ها و هشت‌ضلعی‌ها را جدا کن.",
        baskets: [{ label: "۵ ضلع", shape: "pentagon", value: "5" }, { label: "۶ ضلع", shape: "hexagon", value: "6" }, { label: "۸ ضلع", shape: "octagon", value: "8" }],
        items: [{ shape: "octagon", basket: "8" }, { shape: "pentagon", basket: "5" }, { shape: "hexagon", basket: "6" }, { pic: "🛑", say: "تابلوی ایست", basket: "8" }] },
      { type: "choose", prompt: "خانه‌های کندوی زنبور عسل چه شکلی‌اند؟", say: "خانه‌های کندوی زنبور عسل چه شکلی‌اند؟", options: [{ label: "شش‌ضلعی", value: "6" }, { label: "دایره", value: "0" }, { label: "مثلث", value: "3" }], answer: "6" },
      { type: "shape", prompt: "کدام چندضلعی نیست؟", say: "کدام چندضلعی نیست؟ یادت باشد: ضلع‌ها باید صاف باشند و شکل بسته باشد.", options: ["pentagon", "circle", "triangle"], answer: "circle" }
    ]
  },
  {
    id: "math-sapling-45", subject: "math", level: "sapling", emoji: "📐", title: "گوشه راست",
    steps: [
      { type: "shape", show: "square", prompt: "گوشه‌های مربع «راست»اند، مثل گوشه کتاب یا کاغذ. مربع چند گوشه راست دارد؟", options: [2, 3, 4], answer: 4 },
      { type: "shape", show: "rectangle", prompt: "مستطیل چند گوشه راست دارد؟", options: [0, 2, 4], answer: 4 },
      { type: "shape", show: "triangle", prompt: "این مثلث گوشه راست دارد؟", options: [{ label: "بله", value: "yes" }, { label: "نه", value: "no" }], answer: "no" },
      { type: "choose", prompt: "کدام گوشه راست دارد؟", say: "کدام گوشه راست دارد؟ کتاب، توپ یا ماه؟", pic: true,
        options: [{ label: "📕", value: "کتاب" }, { label: "⚽", value: "توپ" }, { label: "🌙", value: "ماه" }], answer: "کتاب" },
      { type: "shape", prompt: "کدام شکل هیچ گوشه راستی ندارد؟", options: ["rectangle", "square-tilt", "rhombus"], answer: "rhombus" },
      { type: "choose", prompt: "یک گوشه از گوشه راست تیزتر است. به آن چه می‌گوییم؟", say: "گوشه‌ای که از گوشه راست تیزتر و بسته‌تر است، به آن چه می‌گوییم؟", options: [{ label: "تیز", value: "acute" }, { label: "باز", value: "obtuse" }], answer: "acute" },
      { type: "doit", pic: "📄📐", text: "یک گوشه‌سنج بساز:",
        list: ["یک کاغذ را دو بار تا کن (یک بار از وسط، یک بار دوباره از وسط). گوشه تاخورده، گوشه راست است.", "با آن در خانه گوشه‌های راست پیدا کن: میز، در، کاشی.", "یک گوشه پیدا کن که از گوشه راست تیزتر است، و یکی که بازتر است."] }
    ]
  },
  {
    id: "math-sapling-46", subject: "math", level: "sapling", emoji: "▱", title: "چهارضلعی‌ها",
    steps: [
      { type: "shape", show: ["square", "rectangle", "rhombus", "parallelogram", "trapezoid"], prompt: "همه این‌ها چهارضلعی‌اند: مربع، مستطیل، لوزی، متوازی‌الاضلاع و ذوزنقه." },
      { type: "shape", prompt: "لوزی کدام است؟ (چهار ضلع برابر، ولی گوشه‌ها راست نیستند)", options: ["square", "rhombus", "trapezoid"], answer: "rhombus" },
      { type: "shape", prompt: "ذوزنقه کدام است؟ (فقط دو ضلعش موازی‌اند)", options: ["parallelogram", "rectangle", "trapezoid"], answer: "trapezoid" },
      { type: "shape", prompt: "متوازی‌الاضلاع کدام است؟ (ضلع‌های روبه‌رو موازی، گوشه‌ها کج)", options: ["parallelogram", "rhombus", "kite"], answer: "parallelogram" },
      { type: "sort", prompt: "چهار گوشه راست دارد یا ندارد؟", say: "چهارضلعی‌هایی که چهار گوشه راست دارند در یک سبد، و بقیه در سبد دیگر.",
        baskets: [{ label: "۴ گوشه راست", shape: "rectangle", value: "yes" }, { label: "گوشه کج دارد", shape: "parallelogram", value: "no" }],
        items: [{ shape: "square", basket: "yes" }, { shape: "rhombus", basket: "no" }, { shape: "rectangle-tall", basket: "yes" }, { shape: "trapezoid", basket: "no" }, { shape: "square-tilt", basket: "yes" }, { shape: "kite", basket: "no" }] },
      { type: "shape", show: "square", prompt: "مربع هم مستطیل است؟ (چهار گوشه راست دارد)", options: [{ label: "بله", value: "yes" }, { label: "نه", value: "no" }], answer: "yes" }
    ]
  },
  {
    id: "math-sapling-47", subject: "math", level: "sapling", emoji: "🎲", title: "وجه، یال، رأس",
    steps: [
      /* A cube with its faces, edges and corners lit up one kind at a time; hidden ones are drawn dashed. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: { cube: { art: "cube-big", at: [58, 76], s: 1.4 } },
        scenes: [
          { caption: "این مکعب است. سطح‌های صافش را «وجه» می‌گوییم. سه وجه را می‌بینیم: جلو، بالا و کنار.", do: [
            { id: "cube.front", to: { o: 1 }, at: 300, dur: 400 }, { id: "cube.front", to: { o: 0 }, at: 1300, dur: 300 },
            { id: "cube.top", to: { o: 1 }, at: 1600, dur: 400 }, { id: "cube.top", to: { o: 0 }, at: 2600, dur: 300 },
            { id: "cube.side", to: { o: 1 }, at: 2900, dur: 400 }
          ] },
          { caption: "سه وجه دیگر پشت مکعب‌اند. پس مکعب شش وجه دارد.", do: [{ id: "cube.side", to: { o: 0 }, dur: 300 }, { id: "cube", to: { r: -4 }, at: 300, dur: 800, yoyo: true, times: 2 }] },
          { caption: "جایی که دو وجه به هم می‌رسند، «یال» است. مکعب دوازده یال دارد. یال‌های پشتی خط‌چین‌اند.", do: [{ id: "cube.edges", to: { o: 1 }, at: 300, dur: 600 }] },
          { caption: "گوشه‌ها «رأس»اند. مکعب هشت رأس دارد؛ یکی پشت است و پیدا نیست.", do: [{ id: "cube.edges", to: { o: 0 }, dur: 400 }, { id: "cube.corners", to: { o: 1 }, at: 400, dur: 600 }] }
        ],
        question: "مکعب چند وجه دارد؟", options: [3, 6, 8], answer: 6 },
      { type: "choose", prompt: "مکعب چند رأس دارد؟", say: "مکعب چند رأس دارد؟", options: ["۶", "۸", "۱۲"], answer: "۸" },
      { type: "choose", prompt: "مکعب چند یال دارد؟", say: "مکعب چند یال دارد؟", options: ["۸", "۱۰", "۱۲"], answer: "۱۲" },
      { type: "choose", prompt: "یک جعبه کفش (مکعب مستطیل) چند وجه دارد؟", say: "یک جعبه کفش چند وجه دارد؟", options: ["۴", "۶", "۸"], answer: "۶" },
      { type: "choose", prompt: "کدام شکل فضایی هیچ رأسی ندارد؟", say: "کدام شکل فضایی هیچ رأسی ندارد؟", pic: true,
        options: [{ label: "🎲", value: "مکعب" }, { label: "⚽", value: "کره" }, { label: "📦", value: "مکعب مستطیل" }], answer: "کره" },
      { type: "choose", prompt: "یک هرم با کف مربع: کف ۱ وجه، و دورش ۴ وجه مثلث. روی هم چند وجه؟", say: "یک هرم با کف مربع. یک وجه کف است و چهار وجه مثلث دورش. روی هم چند وجه؟", options: ["۴", "۵", "۶"], answer: "۵" },
      { type: "doit", pic: "📦✋", text: "با یک جعبه:",
        list: ["یک جعبه بردار. وجه‌هایش را بشمار و روی هر کدام یک تکه کاغذ بچسبان.", "با انگشت روی یال‌ها بکش و بشمار.", "رأس‌ها را بشمار. با عددهای مکعب یکی است؟"] }
    ]
  },
  {
    id: "math-sapling-48", subject: "math", level: "sapling", emoji: "🦋", title: "تقارن",
    steps: [
      { type: "mirror", ask: "lines", shape: "butterfly", lines: ["v", "h"], prompt: "اگر این شکل را از یک خط تا کنیم و دو نیمه درست روی هم بیفتند، آن خط «خط تقارن» است. خط تقارن پروانه را پیدا کن." },
      { type: "mirror", ask: "lines", shape: "rect", lines: ["v", "h", "d1", "d2"], prompt: "مستطیل چند خط تقارن دارد؟ همه را پیدا کن." },
      { type: "mirror", size: [8, 8], line: "v", cells: [[2, 6, 1], [3, 6, 1], [3, 5, 2], [4, 5, 2], [4, 4, 2], [2, 3, 3], [3, 3, 3], [4, 3, 3], [4, 2, 1]], prompt: "نیمه دیگر این نقش کاشی را رنگ کن، طوری که دو طرف خط مثل هم باشند." },
      { type: "mirror", ask: "lines", shape: "heart", lines: ["v", "h"], prompt: "خط تقارن قلب را پیدا کن." },
      { type: "choose", prompt: "دایره چند خط تقارن دارد؟", say: "دایره را از هر خطی که از وسطش بگذرد تا کنی، دو نیمه روی هم می‌افتند. دایره چند خط تقارن دارد؟", stack: true,
        options: [{ label: "۲", value: "2" }, { label: "۴", value: "4" }, { label: "بی‌شمار", value: "many" }], answer: "many" },
      { type: "mirror", ask: "lines", shape: "square", lines: ["v", "h", "d1", "d2"], prompt: "مربع چند خط تقارن دارد؟ همه را پیدا کن." },
      { type: "mirror", size: [8, 8], line: "v", cells: [[1, 4, 4], [2, 4, 4], [3, 5, 1], [3, 3, 1], [4, 6, 2], [4, 2, 2], [4, 4, 3]], prompt: "یک گل قالی: نیمه دیگرش را رنگ کن." }
    ]
  },
  {
    id: "math-sapling-49", subject: "math", level: "sapling", emoji: "🗺️", title: "خانه‌های جدول",
    steps: [
      { type: "grid", size: [6, 5], at: [3, 2], prompt: "هر خانه با ستون و ردیفش پیدا می‌شود: اول ستون (از چپ)، بعد ردیف (از پایین). خانه ستون ۳، ردیف ۲ را پیدا کن." },
      { type: "grid", size: [6, 5], at: [5, 4], prompt: "خانه ستون ۵، ردیف ۴ را پیدا کن." },
      { type: "grid", size: [6, 5], mark: [2, 4], pic: "🍎", options: [{ label: "ستون ۲، ردیف ۴", value: "2,4" }, { label: "ستون ۴، ردیف ۲", value: "4,2" }], answer: "2,4", prompt: "سیب در کدام خانه است؟" },
      { type: "grid", size: [6, 5], piece: { at: [1, 1], pic: "🐢" }, goal: { at: [4, 3], pic: "🥬" }, prompt: "لاک‌پشت را به کاهو برسان: سه خانه به راست و دو خانه بالا." },
      { type: "grid", size: [6, 5], piece: { at: [2, 2], pic: "🚗", dir: "up" }, goal: { at: [2, 2], dir: "right" }, turn: true, prompt: "ماشین رو به بالاست. یک ربع دور بچرخانش تا رو به راست شود." },
      { type: "map", map: PARK, say: "با نگار راه برو.", tasks: [{ route: ["gate", "pool", "slide"], walker: "👧", prompt: "از در پارک مستقیم برو تا حوض، بعد بپیچ و برو تا سرسره." }] }
    ]
  },
  {
    id: "math-sapling-18", subject: "math", level: "sapling", emoji: "🍽️", title: "دسته‌های مساوی",
    steps: [
      /* Mum deals the biscuits out one plate at a time, round and round, until each plate has two; then a «۲»
         comes over each plate and the plus signs join them: ۲ + ۲ + ۲ (the total is the question). */
      { type: "scene", prompt: "به قصه گوش کن و بشمار",
        parts: {
          bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [70, 90], s: 1.5 },
          p1: { art: "plate", at: [32, 63], s: 1.3, o: 0 }, p2: { art: "plate", at: [58, 63], s: 1.3, o: 0 }, p3: { art: "plate", at: [84, 63], s: 1.3, o: 0 },
          c1: { art: "🍪", at: [101, 63], s: 0.5 }, c2: { art: "🍪", at: [111, 63], s: 0.5 }, c3: { art: "🍪", at: [121, 63], s: 0.5 },
          c4: { art: "🍪", at: [101, 55], s: 0.5 }, c5: { art: "🍪", at: [111, 55], s: 0.5 }, c6: { art: "🍪", at: [121, 55], s: 0.5 },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [142, 88], s: 1.45, flip: true },
          n1: { art: "n:۲", at: [32, 50], o: 0 }, n2: { art: "n:۲", at: [58, 50], o: 0 }, n3: { art: "n:۲", at: [84, 50], o: 0 },
          plus1: { art: "n:+", at: [45, 50], o: 0 }, plus2: { art: "n:+", at: [71, 50], o: 0 }
        },
        scenes: [
          { caption: "مادر سه بشقاب و شش شیرینی دارد.", do: [
            pop("p1", 300), pop("p2", 800), pop("p3", 1300),
            jump("c1", 2100, 2), jump("c2", 2500, 2), jump("c3", 2900, 2), jump("c4", 3300, 2), jump("c5", 3700, 2), jump("c6", 4100, 2)
          ] },
          { caption: "در هر بشقاب دو شیرینی گذاشت.", do: [
            { id: "mom.armF", to: { r: -70 }, dur: 400 },
            hop("c4", [101, 55], [27, 60.1], 300, 800, 10), hop("c5", [111, 55], [53, 60.1], 1200, 800, 10), hop("c6", [121, 55], [79, 60.1], 2100, 800, 10),
            hop("c1", [101, 63], [37, 60.1], 3000, 800, 10), hop("c2", [111, 63], [63, 60.1], 3900, 800, 10), hop("c3", [121, 63], [89, 60.1], 4800, 800, 10),
            { id: "mom.armF", to: { r: 0 }, at: 5700, dur: 400 }
          ] },
          { caption: "سه دسته دوتایی داریم: دو، و دو، و دو.", do: [
            pop("n1", 1600), pop("n2", 2600), pop("n3", 3600), pop("plus1", 4400), pop("plus2", 4400)
          ] }
        ],
        question: "روی هم چند شیرینی است؟", options: ["۵", "۶", "۸"], answer: "۶" },
      { type: "feed", a: 3, b: 3, animal: "🐿️", food: "🌰", prompt: "سنجاب دو دسته سه‌تایی بلوط می‌خواهد. به او بده." },
      { type: "feed", a: 5, b: 5, animal: "🐰", food: "🥕", max: 13, prompt: "خرگوش دو دسته پنج‌تایی هویج می‌خواهد. به او بده." },
      { type: "choose", ltr: true, show: "۳ + ۳ + ۳ + ۳ = ؟", prompt: "چهار بشقاب داریم. در هر بشقاب سه خرما هست. روی هم چند خرما است؟",
        say: "چهار بشقاب داریم. در هر بشقاب سه خرما هست. روی هم چند خرما است؟", options: ["۷", "۱۲", "۱۵"], answer: "۱۲" },
      { type: "choose", ltr: true, prompt: "سه دسته پنج‌تایی کدام است؟", options: ["۳ + ۵", "۵ + ۵ + ۵", "۳ + ۳ + ۳"], answer: "۵ + ۵ + ۵" },
      { type: "choose", ltr: true, show: "۵ + ۵ + ۵ = ؟", prompt: "سه دسته پنج‌تایی روی هم چندتاست؟", options: ["۱۵", "۸", "۲۰"], answer: "۱۵" },
      { type: "choose", prompt: "مادربزرگ به هر کدام از سه نوه‌اش چهار گردو داد. روی هم چند گردو داد؟",
        say: "مادربزرگ به هر کدام از سه نوه‌اش چهار گردو داد. روی هم چند گردو داد؟", options: ["۷", "۱۲", "۱۶"], answer: "۱۲" },
      { type: "choose", prompt: "یاسمن و کاوه هر کدام هفت تیله دارند. روی هم چند تیله دارند؟",
        say: "یاسمن و کاوه هر کدام هفت تیله دارند. روی هم چند تیله دارند؟", options: ["۱۴", "۹", "۱۲"], answer: "۱۴" }
    ]
  },
  {
    id: "math-sapling-19", subject: "math", level: "sapling", emoji: "🍰", title: "نصف و یک‌چهارم",
    steps: [
      /* Sharing out, one at a time: Mum gives the eight biscuits to Sara and Reza in turn, so each share is half.
         Dad and Grandma come, the biscuits go back to the middle, and she deals them round the four of them: each
         share is a quarter (two biscuits). The sangak halves come in the fraction steps after this. */
      (function () {
        var parts = {
          bg: { art: "bg-kitchen" },
          mom: { art: "walker", look: { hair: "long", top: "#e5483f", bottom: "dress" }, at: [80, 47], s: 1.3 },
          sofreh: { art: "sofreh", at: [80, 50], sx: 2.1, sy: 1.2 }
        };
        var middle = [59, 65, 71, 77, 83, 89, 95, 101], tracks2 = [], tracks4 = [], back = [];
        // halves: Sara's pile near her (left), Reza's near him (right); quarters: two at each of the four places
        var half = [[12, 19, 26, 33], [128, 135, 142, 149]], quarter = [[19, 26], [59, 66], [99, 106], [139, 146]];
        middle.forEach(function (x, i) {
          parts["c" + i] = { art: "🍪", at: [x, 49], s: 0.38 };
          var h = half[i % 2][Math.floor(i / 2)], q = quarter[i % 4][Math.floor(i / 4)];
          tracks2.push(hop("c" + i, [x, 49], [h, 56], 500 + i * 650, 600, 8));
          back.push(hop("c" + i, [h, 56], [x, 49], 2600, 900, 6));
          tracks4.push(hop("c" + i, [x, 49], [q, 56], 500 + i * 650, 600, 8));
        });
        Object.assign(parts, {
          girl: { art: "walker", look: { hair: "long", top: "#f28baa", bottom: "dress" }, at: [22, 90], s: 1.15 },
          boy: { art: "walker", look: { top: "#5b9bd5" }, at: [138, 90], s: 1.15, flip: true },
          dad: { art: "walker", look: { top: "#3f6f8f", bottom: "#5c4a3a" }, at: [184, 91], s: 1.3, flip: true },
          gran: { art: "walker", look: { hair: "auto", kind: "grandma", scarf: "#c4673a", top: "#8a6f9e", bottom: "dress", cane: true }, at: [204, 91], s: 1.25, flip: true },
          t1: { art: "tag:نصف", at: [22.5, 42], o: 0 }, t2: { art: "tag:نصف", at: [138.5, 42], o: 0 }, t3: { art: "tag:یک‌چهارم", at: [22.5, 42], o: 0 }
        });
        return { type: "scene", prompt: "ببین نصف و یک‌چهارم یعنی چه", parts: parts,
          scenes: [
            { caption: "مادر هشت شیرینی دارد. سارا و رضا هر دو شیرینی می‌خواهند.", do: [
              middle.map(function (x, i) { return jump("c" + i, 300 + i * 350, 2); }), jump("girl", 3500, 3), jump("boy", 3900, 3)
            ] },
            { caption: "مادر شیرینی‌ها را بین سارا و رضا تقسیم کرد.", do: [
              { id: "mom.armF", to: { r: -70 }, dur: 400 }, tracks2, { id: "mom.armF", to: { r: 0 }, at: 5800, dur: 400 }
            ] },
            { caption: "سهم هر دو یک اندازه است. به سهم هر کدام می‌گوییم نصف شیرینی‌ها.", do: [pop("t1", 1500), pop("t2", 1500)] },
            { caption: "پدر و مادربزرگ هم آمدند. شیرینی‌ها را دوباره وسط گذاشتیم.", do: [
              { id: "t1", to: { o: 0 }, dur: 300 }, { id: "t2", to: { o: 0 }, dur: 300 },
              { id: "boy", walk: [62, 90], dur: 2200 }, { id: "dad", walk: [102, 91], dur: 2600 }, { id: "gran", walk: [142, 91], dur: 2800 },
              back
            ] },
            { caption: "مادر شیرینی‌ها را مساوی بین چهار نفر تقسیم کرد. به هر نفر دو شیرینی رسید.", do: [
              { id: "mom.armF", to: { r: -70 }, dur: 400 }, tracks4, { id: "mom.armF", to: { r: 0 }, at: 5800, dur: 400 }
            ] },
            { caption: "به سهم هر نفر می‌گوییم یک‌چهارم شیرینی‌ها.", do: [pop("t3", 1000)] }
          ],
          question: "هشت شیرینی را مساوی بین چهار نفر تقسیم کردیم. به سهم هر نفر چه می‌گوییم؟",
          options: ["نصف", "یک‌چهارم", "همه شیرینی‌ها"], answer: "یک‌چهارم" };
      })(),
      { type: "fraction", ask: "equal", shape: "bread", prompt: "کدام نان درست از وسط نصف شده است؟",
        shapes: [{ cuts: [0.3] }, { parts: 2 }, { cuts: [0.65] }] },
      { type: "fraction", cut: true, shape: "bread", parts: 2, prompt: "نان سنگک را به دو تکه مساوی ببر. روی خط‌چین‌ها بزن." },
      { type: "fraction", shape: "circle", parts: 4, take: 1, prompt: "کیک به چهار تکه مساوی بریده شده. یک‌چهارم آن را رنگ کن." },
      { type: "fraction", ask: "name", shape: "circle", parts: 2, take: 1, prompt: "چه مقدار از کیک رنگ شده است؟",
        options: ["نصف", "یک‌چهارم", "همه کیک"], answer: "نصف" },
      { type: "fraction", cut: true, shape: "circle", parts: 4, prompt: "این کیک را به چهار تکه مساوی ببر. روی خط‌چین‌ها بزن." },
      { type: "fraction", set: 8, parts: 2, thing: "🍬", who: ["👦", "👧"], prompt: "هشت آب‌نبات را مساوی بین آرش و نازنین تقسیم کن.",
        result: "نصف ۸ می‌شود ۴." },
      { type: "fraction", set: 8, parts: 4, thing: "🍪", who: ["👧", "👦", "👧🏽", "👦🏻"], prompt: "هشت شیرینی را مساوی بین چهار دوست تقسیم کن.",
        result: "یک‌چهارم ۸ می‌شود ۲." }
    ]
  },
  {
    id: "math-sapling-20", subject: "math", level: "sapling", emoji: "📊", title: "نمودار تصویری",
    steps: [
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "چند نفر انگور دوست دارند؟", options: [4, 5, 6], answer: 5 },
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "کدام میوه را کمتر از همه دوست دارند؟",
        options: [{ label: "سیب", value: "🍎" }, { label: "انگور", value: "🍇" }, { label: "پرتقال", value: "🍊" }], answer: "🍊" },
      { type: "chart", title: "میوه‌ای که بچه‌های کلاس دوست دارند",
        rows: [{ label: "سیب", pic: "🍎", n: 4 }, { label: "انگور", pic: "🍇", n: 5 }, { label: "پرتقال", pic: "🍊", n: 2 }],
        question: "انگور را چند نفر بیشتر از پرتقال دوست دارند؟", options: [2, 3, 7], answer: 3 },
      { type: "chart", make: true, title: "حیوان‌های مزرعه پدربزرگ", prompt: "حیوان‌های مزرعه را بشمار: هر کدام را در ستون خودش بگذار.",
        rows: [{ label: "مرغ", pic: "🐔", n: 5 }, { label: "گوسفند", pic: "🐑", n: 3 }, { label: "گاو", pic: "🐄", n: 2 }],
        question: "از کدام حیوان بیشتر از همه هست؟",
        options: [{ label: "مرغ", value: "🐔" }, { label: "گوسفند", value: "🐑" }, { label: "گاو", value: "🐄" }], answer: "🐔" },
      { type: "chart", add: true, title: "هوای این هفته", prompt: "دو روز دیگر هوا آفتابی بود و یک روز دیگر ابری. به نمودار اضافه کن.",
        rows: [{ label: "آفتابی", pic: "☀️", has: 2, n: 4 }, { label: "ابری", pic: "☁️", has: 1, n: 2 }, { label: "بارانی", pic: "🌧️", has: 1, n: 1 }],
        question: "این هفته چند روز هوا آفتابی بود؟", options: [2, 4, 3], answer: 4 },
      { type: "chart", title: "بچه‌ها چطور به مدرسه می‌آیند؟",
        rows: [{ label: "پیاده", pic: "🚶", n: 6 }, { label: "سرویس", pic: "🚌", n: 4 }, { label: "ماشین", pic: "🚗", n: 2 }, { label: "دوچرخه", pic: "🚲", n: 1 }],
        question: "روی هم چند نفر پیاده یا با دوچرخه می‌آیند؟", options: [6, 7, 8], answer: 7 }
    ]
  },
  {
    id: "math-sapling-21", subject: "math", level: "sapling", emoji: "🏪", title: "بازی بازار",
    steps: [
      { type: "pairs", prompt: "هر قیمت را به پولی که همان‌قدر است وصل کن.",
        pairs: [[{ pic: "🍉", label: 25 }, "۲۰ + ۵"], [{ pic: "🍇", label: 17 }, "۱۰ + ۵ + ۲"], [{ pic: "🍎", label: 8 }, "۵ + ۲ + ۱"], [{ pic: "🍊", label: 12 }, "۱۰ + ۲"]] },
      { type: "money", prompt: "یاسمن پسته و عسل خرید. روی هم چقدر شد؟",
        items: [{ emoji: "🥜", name: "پسته", price: 40 }, { emoji: "🍯", name: "عسل", price: 35 }], options: [65, 75, 85] },
      { type: "sort", prompt: "آراز ۳۰ هزار تومان دارد. کدام را می‌تواند بخرد؟",
        baskets: [{ label: "می‌تواند بخرد", pic: "👍", value: "yes" }, { label: "پولش کم است", pic: "✋", value: "no" }],
        items: [{ pic: "🍎", label: 12, basket: "yes" }, { pic: "🍉", label: 45, basket: "no" }, { pic: "🥒", label: 25, basket: "yes" },
          { pic: "🧀", label: 38, basket: "no" }, { pic: "🍞", label: 6, basket: "yes" }, { pic: "🍯", label: 30, basket: "yes" }] },
      { type: "money", prompt: "پول گلابی‌ها را بده.", items: [{ emoji: "🍐", name: "گلابی", price: 27 }], wallet: [20, 5, 10, 2, 1, 1] },
      { type: "money", prompt: "۵۰ هزار تومان دادی. چقدر پس می‌گیری؟", items: [{ emoji: "🍉", name: "هندوانه", price: 36 }],
        bills: [50], answer: 14, options: [24, 14, 16] },
      { type: "pairs", prompt: "هر تفریق را به جوابش وصل کن.", pairs: [["۲۰ − ۱۵", 5], ["۵۰ − ۳۵", 15], ["۱۰۰ − ۶۰", 40]] },
      { type: "money", prompt: "مهسا گوجه‌فرنگی، خیار و پیاز خرید. روی هم چقدر شد؟",
        items: [{ emoji: "🍅", name: "گوجه‌فرنگی", price: 15 }, { emoji: "🥒", name: "خیار", price: 12 }, { emoji: "🧅", name: "پیاز", price: 8 }], options: [33, 35, 45] }
    ]
  },
  {
    id: "math-sapling-50", subject: "math", level: "sapling", emoji: "🔁", title: "قانون الگو",
    steps: [
      { type: "pattern", prompt: "قانون: هر بار ۳ تا بیشتر. پر کن", say: "شروع از چهار، هر بار سه تا بیشتر.", ltr: true, seq: [4, 7, 10, 13, 16, 19], blanks: [3, 5], options: [12, 13, 18, 19] },
      { type: "choose", ltr: true, show: "۵ ، ۱۰ ، ۲۰ ، ۴۰ ، …", prompt: "قانون این الگو چیست؟", say: "پنج، ده، بیست، چهل. قانون این الگو چیست؟", stack: true,
        options: [{ label: "هر بار ۵ تا بیشتر", value: "+5" }, { label: "هر بار دو برابر", value: "x2" }, { label: "هر بار ۱۰ تا بیشتر", value: "+10" }], answer: "x2" },
      { type: "pattern", prompt: "قانون: هر بار ۴ تا کمتر. پر کن", say: "سی، بیست و شش، … هر بار چهار تا کمتر.", ltr: true, seq: [30, 26, 22, 18, 14, 10], blanks: [2, 4, 5], options: [22, 14, 10, 12] },
      { type: "choose", ltr: true, show: "۱۰۰ ، ۹۰ ، ۸۰ ، ؟", prompt: "بعدی چیست؟", say: "صد، نود، هشتاد، بعدی؟", options: ["۷۰", "۷۹", "۶۰"], answer: "۷۰" },
      { type: "choose", ltr: true, show: "۲ ، ۵ ، ۸ ، ۱۱", prompt: "این عددها زوج‌اند یا فرد، یکی در میان؟ عدد بعدی زوج است یا فرد؟", say: "دو، پنج، هشت، یازده. عدد بعدی چهارده است. زوج است یا فرد؟", options: [{ label: "زوج", value: "even" }, { label: "فرد", value: "odd" }], answer: "even" },
      { type: "pattern", prompt: "قانون را خودت پیدا کن و پر کن", say: "قانون را پیدا کن و جاهای خالی را پر کن.", ltr: true, seq: [11, 22, 33, 44, 55, 66], blanks: [3, 5], options: [43, 44, 65, 66, 77] }
    ]
  },
  {
    id: "math-sapling-51", subject: "math", level: "sapling", emoji: "🔥", title: "الگوهای شکلی",
    steps: [
      /* A growing shape pattern: squares of match sticks in a row, 4 sticks, then 3 more for each new square. */
      (function () {
        var parts = { bg: { art: "day-room" }, s0: { art: "msq-first", at: [14, 82], s: 2.4, o: 0 } };
        for (var i = 1; i < 4; i++) parts["s" + i] = { art: "msq-next", at: [14 + i * 33.6, 82], s: 2.4, o: 0 };
        var cnt = ["یک مربع با ۴ چوب کبریت.", "دو مربع: ۳ چوب دیگر اضافه شد. روی هم ۷ چوب.", "سه مربع: باز ۳ چوب دیگر. ۱۰ چوب.", "چهار مربع: ۱۳ چوب. هر مربع تازه ۳ چوب می‌خواهد."];
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: cnt.map(function (c, i) { return { caption: c, do: [{ id: "s" + i, to: { o: 1 }, dur: 1 }, { id: "s" + i, draw: true, at: 100, dur: 1400 }] }; }),
          question: "پنج مربع چند چوب می‌خواهد؟", options: [15, 16, 17], answer: 16 };
      })(),
      { type: "pattern", prompt: "تعداد چوب‌ها: ۴، ۷، ۱۰، … پر کن", say: "چهار، هفت، ده، … هر بار سه تا بیشتر.", ltr: true, seq: [4, 7, 10, 13, 16, 19], blanks: [3, 4, 5], options: [13, 14, 16, 19] },
      { type: "choose", prompt: "اگر بخواهیم ۱۰ مربع بسازیم، کدام راه درست است؟", say: "اگر بخواهیم ده مربع بسازیم، چطور تعداد چوب‌ها را پیدا کنیم؟", stack: true,
        options: [{ label: "۴ و ۹ بار ۳ تا: ۳۱", value: "31" }, { label: "۱۰ بار ۴ تا: ۴۰", value: "40" }, { label: "۱۰ بار ۳ تا: ۳۰", value: "30" }], answer: "31" },
      { type: "pattern", prompt: "الگوی شکل‌ها: بعدی کدام است؟", say: "مثلث، مربع، پنج‌ضلعی، … هر بار یک ضلع بیشتر. بعدی؟", seq: [{ shape: "triangle" }, { shape: "square" }, { shape: "pentagon" }, { shape: "hexagon" }], blanks: [3], options: [{ shape: "hexagon" }, { shape: "octagon" }, { shape: "circle" }] },
      { type: "choose", show: "🔺 ، 🔺🔺🔺 ، 🔺🔺🔺🔺🔺", prompt: "هر بار ۲ مثلث اضافه می‌شود. شکل پنجم چند مثلث دارد؟", say: "یک، سه، پنج مثلث. هر بار دو تا بیشتر. شکل پنجم چند مثلث دارد؟", options: ["۷", "۹", "۱۰"], answer: "۹" },
      { type: "pattern", prompt: "برج‌های مکعبی: ۱، ۳، ۶، ۱۰، … (هر بار یکی بیشتر از قبل اضافه می‌شود)", say: "یک، سه، شش، ده. اول دو تا اضافه شد، بعد سه تا، بعد چهار تا. بعدی؟", ltr: true, seq: [1, 3, 6, 10, 15], blanks: [4], options: [14, 15, 16] }
    ]
  },
  {
    id: "math-sapling-52", subject: "math", level: "sapling", emoji: "📦", title: "عددهای چهاررقمی",
    steps: [
      { type: "tens", n: 1000, thousands: true, options: [100, 1000, 10000], prompt: "ده بسته صدتایی یک جعبه هزارتایی می‌شود. این چند است؟" },
      { type: "tens", n: 2345, thousands: true, options: [2345, 3245, 23045], prompt: "۲ جعبه هزارتایی، ۳ بسته صدتایی، ۴ دسته ده‌تایی و ۵ تا. چند است؟" },
      { type: "choose", ltr: true, show: "۴۰۶۸ = ۴۰۰۰ + ؟ + ۶۰ + ۸", prompt: "جای ؟ چه عددی است؟", say: "چهار هزار و شصت و هشت. صدگان چند است؟", options: ["۰", "۶", "۶۰۰"], answer: "۰" },
      { type: "choose", ltr: true, prompt: "«سه هزار و پانصد و هفت» را چطور می‌نویسیم؟", say: "سه هزار و پانصد و هفت را چطور می‌نویسیم؟", options: ["۳۵۷", "۳۵۰۷", "۳۰۵۰۷"], answer: "۳۵۰۷" },
      { type: "tens", build: true, n: 1203, thousands: true, prompt: "۱۲۰۳ را بساز: یک جعبه هزارتایی، دو بسته صدتایی، هیچ دسته ده‌تایی، و سه تا." },
      { type: "choose", ltr: true, show: "۵۹۹۹ + ۱ = ؟", prompt: "یکی بیشتر از ۵۹۹۹؟", say: "پنج هزار و نهصد و نود و نه به اضافه یک.", options: ["۵۱۰۰۰", "۶۰۰۰", "۵۰۰۰"], answer: "۶۰۰۰" },
      { type: "choose", ltr: true, show: "۷۲۳۸", prompt: "رقم ۷ در این عدد چند می‌ارزد؟", say: "رقم هفت در هفت هزار و دویست و سی و هشت چند می‌ارزد؟", options: ["۷", "۷۰۰", "۷۰۰۰"], answer: "۷۰۰۰" }
    ]
  },
  {
    id: "math-sapling-53", subject: "math", level: "sapling", emoji: "⚖️", title: "مقایسه و ترتیب تا ده‌هزار",
    steps: [
      { type: "compare", a: 3452, b: 3425, ask: "symbol" },
      { type: "compare", a: 6099, b: 6100, ask: "symbol" },
      { type: "compare", a: 8000, b: 7999, ask: "more" },
      { type: "numline", a: 18, b: 2, options: [19, 20, 21], prompt: "روی خط عددی، عدد بزرگ‌تر سمت راست است. از ۱۸ دو خانه به راست: کدام عدد؟", say: "قورباغه روی هجده است و دو خانه به راست می‌پرد." },
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "این عددها را از کوچک به بزرگ بچین. اول هزارگان‌ها را مقایسه کن.", ltr: true, items: [1999, 2099, 2109, 2190, 9012] },
      { type: "order", prompt: "از بزرگ به کوچک بچین", say: "از بزرگ به کوچک بچین.", ltr: true, items: [5430, 5403, 5340, 4530] },
      { type: "compare", a: 4500, b: 4050, ask: "less" }
    ]
  },
  {
    id: "math-sapling-54", subject: "math", level: "sapling", emoji: "🎯", title: "گرد کردن",
    steps: [
      { type: "numline", a: 14, b: 1, options: [14, 15, 16], prompt: "۱۴ بین ۱۰ و ۲۰ است. ببین: ۱۵ درست وسط است. قورباغه از ۱۴ یک خانه می‌پرد: به وسط رسید؟", say: "چهارده بین ده و بیست است. پانزده درست وسط است." },
      { type: "choose", ltr: true, show: "۱۴ ← ۱۰ یا ۲۰؟", prompt: "۱۴ به کدام ده نزدیک‌تر است؟", say: "چهارده به ده نزدیک‌تر است یا بیست؟", options: ["۱۰", "۲۰"], answer: "۱۰" },
      { type: "choose", ltr: true, show: "۶۷", prompt: "۶۷ را به نزدیک‌ترین ده گرد کن.", say: "شصت و هفت را به نزدیک‌ترین ده گرد کن.", options: ["۶۰", "۷۰", "۱۰۰"], answer: "۷۰" },
      { type: "choose", ltr: true, show: "۳۵", prompt: "۳۵ درست وسط ۳۰ و ۴۰ است. قرار: وسطی‌ها را بالا گرد می‌کنیم.", say: "سی و پنج درست وسط است. وسطی‌ها را بالا گرد می‌کنیم. چند می‌شود؟", options: ["۳۰", "۴۰"], answer: "۴۰" },
      { type: "choose", ltr: true, show: "۴۲۸", prompt: "۴۲۸ را به نزدیک‌ترین صد گرد کن.", say: "چهارصد و بیست و هشت را به نزدیک‌ترین صد گرد کن.", options: ["۴۰۰", "۴۳۰", "۵۰۰"], answer: "۴۰۰" },
      { type: "choose", ltr: true, show: "۳۶۸۰", prompt: "۳۶۸۰ را به نزدیک‌ترین هزار گرد کن.", say: "سه هزار و ششصد و هشتاد را به نزدیک‌ترین هزار گرد کن.", options: ["۳۰۰۰", "۳۷۰۰", "۴۰۰۰"], answer: "۴۰۰۰" },
      { type: "choose", ltr: true, show: "۳۹۸ + ۲۱۰ ≈ ؟", prompt: "با گرد کردن حدس بزن: حدوداً چند؟", say: "سیصد و نود و هشت به اضافه دویست و ده. با گرد کردن حدس بزن.", options: ["۵۰۰", "۶۰۰", "۷۰۰"], answer: "۶۰۰" }
    ]
  },
  {
    id: "math-sapling-55", subject: "math", level: "sapling", emoji: "🧮", title: "جمع و تفریق چهاررقمی",
    steps: [
      { type: "choose", ltr: true, show: "۲۴۸۰ + ۱۳۱۵ ≈ ؟", prompt: "اول حدس بزن: ۲۵۰۰ و ۱۳۰۰.", say: "دو هزار و چهارصد و هشتاد به اضافه هزار و سیصد و پانزده. حدوداً چند؟", options: ["۲۸۰۰", "۳۸۰۰", "۴۸۰۰"], answer: "۳۸۰۰" },
      { type: "column", op: "+", a: 2480, b: 1315, prompt: "حالا ستونی جمع کن، از یکان." },
      { type: "column", op: "+", a: 3768, b: 1457, prompt: "ستونی جمع کن. حواست به انتقال‌ها باشد." },
      { type: "column", op: "-", a: 5634, b: 2418, prompt: "ستونی تفریق کن." },
      { type: "column", op: "-", a: 7005, b: 2368, prompt: "۷۰۰۵ − ۲۳۶۸: صفرها! از هزارگان قرض بگیر." },
      { type: "choose", ltr: true, show: "۴۶۳۷ − ۲۳۶۸ = ۲۲۶۹", prompt: "بررسی کن: کدام جمع جواب را بررسی می‌کند؟", say: "بررسی کن: کدام جمع این تفریق را بررسی می‌کند؟", stack: true,
        options: ["۲۲۶۹ + ۲۳۶۸ = ۴۶۳۷", "۲۲۶۹ + ۴۶۳۷ = ۶۹۰۶", "۴۶۳۷ + ۲۳۶۸ = ۷۰۰۵"], answer: "۲۲۶۹ + ۲۳۶۸ = ۴۶۳۷" }
    ]
  },
  {
    id: "math-sapling-56", subject: "math", level: "sapling", emoji: "🍞", title: "قسمت‌های مساوی",
    steps: [
      /* A sangak shared by three: the baker really cuts it into three equal pieces, and each piece goes to one child. */
      (function () {
        var parts = { b0: { art: "sangak-third", at: [52, 40] }, b1: { art: "sangak-third", at: [80, 40] }, b2: { art: "sangak-third", at: [108, 40] },
          k1: { art: "level", at: [66, 18], sx: 0.44, r: 90, o: 0 }, k2: { art: "level", at: [94, 18], sx: 0.44, r: 90, o: 0 },
          p0: { art: "plate", at: [30, 84], s: 1.8 }, p1: { art: "plate", at: [80, 84], s: 1.8 }, p2: { art: "plate", at: [130, 84], s: 1.8 } };
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#f7ecd9", parts: parts,
          scenes: [
            { caption: "یک نان سنگک داریم و سه بشقاب، برای سه بچه.", do: [jump("b1", 300, 2)] },
            { caption: "نان را به سه تکه مساوی می‌بریم.", do: [{ id: "k1", to: { o: 1 }, at: 300, dur: 100 }, { id: "k1", draw: true, at: 300, dur: 900 }, { id: "k2", to: { o: 1 }, at: 1400, dur: 100 }, { id: "k2", draw: true, at: 1400, dur: 900 }] },
            { caption: "هر تکه در یک بشقاب: هر بشقاب یک‌سوم نان را دارد.", do: [{ id: "k1", to: { o: 0 }, dur: 300 }, { id: "k2", to: { o: 0 }, dur: 300 },
              { id: "b0", to: { x: 30, y: 74, s: 0.6 }, at: 400, dur: 1400 }, { id: "b1", to: { y: 74, s: 0.6 }, at: 900, dur: 1400 }, { id: "b2", to: { x: 130, y: 74, s: 0.6 }, at: 1400, dur: 1400 }] }
          ],
          question: "اگر تکه‌ها مساوی نباشند، سهم‌ها منصفانه است؟", options: [{ label: "بله", value: "yes" }, { label: "نه", value: "no" }], answer: "no" };
      })(),
      { type: "fraction", ask: "equal", prompt: "کدام به سه تکه مساوی بریده شده؟", shapes: [{ shape: "rect", parts: 3 }, { shape: "rect", cuts: [0.2, 0.5] }, { shape: "rect", cuts: [0.4, 0.7] }] },
      { type: "fraction", shape: "rect", parts: 3, cut: true, prompt: "این شکلات را به سه تکه مساوی ببر." },
      { type: "fraction", shape: "circle", parts: 6, take: 1, prompt: "این کیک را شش تکه مساوی کرده‌اند. یک‌ششم آن را رنگ کن." },
      { type: "fraction", ask: "equal", prompt: "کدام به هشت تکه مساوی بریده شده؟", shapes: [{ shape: "circle", parts: 8 }, { shape: "circle", cuts: [0, 0.1, 0.25, 0.4, 0.5, 0.6, 0.8, 0.9] }] },
      { type: "fraction", shape: "bread", parts: 4, cut: true, prompt: "سنگک را برای چهار نفر به تکه‌های مساوی ببر." }
    ]
  },
  {
    id: "math-sapling-57", subject: "math", level: "sapling", emoji: "➗", title: "صورت و مخرج",
    steps: [
      { type: "fraction", shape: "rect", parts: 4, take: 3, ask: "name", options: [{ frac: [3, 4] }, { frac: [4, 3] }, { frac: [1, 4] }], answer: "3/4",
        prompt: "کسر دو عدد دارد: پایینی (مخرج) می‌گوید کل را به چند تکه مساوی کرده‌ایم؛ بالایی (صورت) می‌گوید چند تکه را برداشته‌ایم. چه کسری رنگ شده؟" },
      { type: "fraction", shape: "circle", parts: 3, take: 2, ask: "name", options: [{ frac: [2, 3] }, { frac: [1, 3] }, { frac: [3, 2] }], answer: "2/3", prompt: "چه کسری رنگ شده؟" },
      { type: "fraction", shape: "square", parts: 8, take: 5, prompt: "پنج‌هشتم را رنگ کن: کل هشت تکه است، پنج تا را رنگ کن." },
      { type: "choose", prompt: "در کسر «سه‌چهارم» مخرج چند است؟", say: "در کسر سه‌چهارم، مخرج چند است؟", options: ["۳", "۴", "۷"], answer: "۴" },
      { type: "fraction", shape: "rect", parts: 6, take: 1, ask: "name", options: [{ frac: [1, 6] }, { frac: [6, 1] }, { frac: [5, 6] }], answer: "1/6", prompt: "چه کسری رنگ شده؟" },
      { type: "choose", prompt: "یک پیتزا را ۸ تکه کردیم و ۳ تکه را خوردیم. چه کسری از پیتزا را خوردیم؟", say: "یک پیتزا را هشت تکه کردیم و سه تکه را خوردیم. چه کسری را خوردیم؟", options: [{ label: "سه‌هشتم", value: "3/8" }, { label: "هشت‌سوم", value: "8/3" }, { label: "پنج‌هشتم", value: "5/8" }], answer: "3/8" },
      { type: "fraction", shape: "circle", parts: 4, take: 4, ask: "name", options: [{ frac: [4, 4] }, { frac: [1, 4] }, { frac: [0, 4] }], answer: "4/4", prompt: "همه تکه‌ها رنگ شده. چه کسری؟ (چهار‌چهارم یعنی یک واحد کامل)" }
    ]
  },
  {
    id: "math-sapling-58", subject: "math", level: "sapling", emoji: "🍬", title: "کسری از چند چیز",
    steps: [
      { type: "fraction", set: 8, thing: "🍬", parts: 2, who: ["👧", "👦"], result: "نصف ۸ می‌شود ۴.", prompt: "هشت آب‌نبات را بین دو نفر مساوی تقسیم کن. نصف هشت چندتاست؟" },
      { type: "fraction", set: 12, thing: "🌰", parts: 3, who: ["👧", "👦", "🧒"], result: "یک‌سوم ۱۲ می‌شود ۴.", prompt: "دوازده فندق بین سه نفر. یک‌سوم دوازده چندتاست؟" },
      { type: "choose", prompt: "یک‌چهارم ۲۰ تومان چقدر است؟", say: "بیست تومان را چهار قسمت مساوی کن. یک قسمت چقدر است؟", options: ["۴", "۵", "۱۶"], answer: "۵" },
      { type: "fraction", set: 10, thing: "🍪", parts: 5, who: ["👧", "👦", "🧒", "👧🏽", "👦🏻"], result: "یک‌پنجم ۱۰ می‌شود ۲.", prompt: "ده شیرینی بین پنج نفر. یک‌پنجم ده چندتاست؟" },
      { type: "choose", show: "🐑🐑🐑🐑🐑🐑", prompt: "شش گوسفند داریم. نصف آن‌ها سیاه‌اند. چند گوسفند سیاه است؟", say: "شش گوسفند داریم. نصف آن‌ها سیاه‌اند. چند گوسفند سیاه است؟", options: ["۲", "۳", "۶"], answer: "۳" },
      { type: "choose", prompt: "سه‌چهارم ۱۲ چقدر است؟ (اول یک‌چهارم را پیدا کن)", say: "سه‌چهارم دوازده چقدر است؟ اول یک‌چهارم را پیدا کن: سه. بعد سه تا از آن‌ها.", options: ["۳", "۹", "۴"], answer: "۹" }
    ]
  },
  {
    id: "math-sapling-59", subject: "math", level: "sapling", emoji: "📏", title: "کسر روی محور",
    steps: [
      { type: "numline", denom: 2, max: 1, ask: "place", at: [1, 2], prompt: "فاصله صفر تا یک را دو قسمت مساوی کرده‌ایم. یک‌دوم را روی محور پیدا کن." },
      { type: "numline", denom: 4, max: 1, ask: "place", at: [3, 4], prompt: "این بار چهار قسمت مساوی. سه‌چهارم را پیدا کن." },
      { type: "numline", denom: 4, max: 1, ask: "name", mark: [1, 4], options: [{ frac: [1, 4] }, { frac: [1, 2] }, { frac: [4, 1] }], answer: "1/4", prompt: "این نقطه چه کسری است؟" },
      { type: "numline", denom: 3, max: 1, ask: "cut", prompt: "فاصله صفر تا یک را به سه قسمت مساوی ببر." },
      { type: "numline", denom: 3, max: 2, ask: "place", at: [4, 3], prompt: "حالا تا ۲ می‌رویم. چهارسوم را پیدا کن (یک و یک‌سوم)." },
      { type: "choose", prompt: "یک‌دوم روی محور، به صفر نزدیک‌تر است یا وسط صفر و یک است؟", say: "یک‌دوم روی محور کجاست؟", options: [{ label: "درست وسط", value: "mid" }, { label: "نزدیک صفر", value: "zero" }, { label: "بعد از یک", value: "after" }], answer: "mid" }
    ]
  },
  {
    id: "math-sapling-60", subject: "math", level: "sapling", emoji: "⚖️", title: "کدام کسر بزرگ‌تر است؟",
    steps: [
      { type: "fraction", ask: "name", shape: "rect", parts: 2, take: 1, options: [{ frac: [1, 2] }, { frac: [1, 4] }], answer: "1/2", prompt: "این کسر را نام ببر. بعد با یک‌چهارم مقایسه می‌کنیم." },
      { type: "choose", prompt: "یک‌دوم بزرگ‌تر است یا یک‌چهارم؟ (هر چه تکه‌ها بیشتر، هر تکه کوچک‌تر)", say: "یک‌دوم یک نان بزرگ‌تر است یا یک‌چهارم همان نان؟", options: [{ label: "یک‌دوم", value: "1/2" }, { label: "یک‌چهارم", value: "1/4" }], answer: "1/2" },
      { type: "choose", prompt: "سه‌هشتم یا پنج‌هشتم؟ کدام بزرگ‌تر است؟ (تکه‌ها یک اندازه‌اند)", say: "سه‌هشتم یا پنج‌هشتم؟ کدام بزرگ‌تر است؟", options: [{ label: "سه‌هشتم", value: "3/8" }, { label: "پنج‌هشتم", value: "5/8" }], answer: "5/8" },
      { type: "fraction", shape: "circle", parts: 3, take: 2, prompt: "دوسوم را رنگ کن. بعد بگو از نصف بیشتر است یا کمتر." },
      { type: "choose", prompt: "دوسوم از نصف بیشتر است یا کمتر؟", say: "دوسوم از نصف بیشتر است یا کمتر؟", options: [{ label: "بیشتر", value: "more" }, { label: "کمتر", value: "less" }], answer: "more" },
      { type: "choose", prompt: "یک‌ششم یا یک‌سوم؟ کدام کوچک‌تر است؟", say: "یک‌ششم یا یک‌سوم؟ کدام کوچک‌تر است؟", options: [{ label: "یک‌ششم", value: "1/6" }, { label: "یک‌سوم", value: "1/3" }], answer: "1/6" }
    ]
  },
  {
    id: "math-sapling-61", subject: "math", level: "sapling", emoji: "🟰", title: "کسرهای مساوی",
    steps: [
      { type: "numline", denom: 4, max: 1, strips: [1, 2, 4], ask: "place", at: [2, 4], prompt: "نوارهای کسر را ببین: یک‌دوم با دوچهارم یک اندازه است. دوچهارم را روی محور پیدا کن." },
      { type: "fraction", shape: "rect", parts: 4, take: 2, prompt: "دوچهارم را رنگ کن. ببین: همان نصف است." },
      { type: "choose", prompt: "کدام با یک‌دوم مساوی است؟", say: "کدام با یک‌دوم مساوی است؟", options: [{ label: "دوچهارم", value: "2/4" }, { label: "یک‌چهارم", value: "1/4" }, { label: "دوسوم", value: "2/3" }], answer: "2/4" },
      { type: "numline", denom: 6, max: 1, strips: [1, 3, 6], ask: "place", at: [2, 6], prompt: "یک‌سوم با دوششم یک اندازه است. دوششم را پیدا کن." },
      { type: "fraction", shape: "circle", parts: 8, take: 4, prompt: "چهارهشتم را رنگ کن. با نصف مساوی است؟" },
      { type: "choose", prompt: "دوسوم با کدام مساوی است؟", say: "دوسوم با کدام مساوی است؟", options: [{ label: "چهارششم", value: "4/6" }, { label: "دوششم", value: "2/6" }, { label: "سه‌سوم", value: "3/3" }], answer: "4/6" }
    ]
  },
  {
    id: "math-sapling-62", subject: "math", level: "sapling", emoji: "🎲", title: "بازی کسرها",
    steps: [
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. کسرهای مساوی را جفت کن.", pairs: [[{ label: "یک‌دوم", say: "یک‌دوم" }, { label: "دوچهارم", say: "دوچهارم" }], [{ label: "یک‌سوم", say: "یک‌سوم" }, { label: "دوششم", say: "دوششم" }], [{ label: "چهارچهارم", say: "چهارچهارم" }, { label: "یک واحد", say: "یک واحد" }]] },
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "یک‌هشتم، یک‌چهارم، یک‌دوم، یک واحد. از کوچک به بزرگ بچین.", ltr: true,
        items: [{ label: "یک‌هشتم", say: "یک‌هشتم" }, { label: "یک‌چهارم", say: "یک‌چهارم" }, { label: "یک‌دوم", say: "یک‌دوم" }, { label: "یک واحد", say: "یک واحد" }] },
      { type: "sort", prompt: "کمتر از نصف یا بیشتر از نصف؟", say: "کسرهای کمتر از نصف در یک سبد، بیشتر از نصف در سبد دیگر.",
        baskets: [{ label: "کمتر از نصف", pic: "◔", value: "less" }, { label: "بیشتر از نصف", pic: "◕", value: "more" }],
        items: [{ label: "یک‌چهارم", basket: "less" }, { label: "سه‌چهارم", basket: "more" }, { label: "یک‌ششم", basket: "less" }, { label: "دوسوم", basket: "more" }, { label: "دوهشتم", basket: "less" }, { label: "پنج‌هشتم", basket: "more" }] },
      { type: "pairs", prompt: "هر کسر را با اسمش جفت کن", say: "هر کسر را با اسمش جفت کن.", pairs: [[{ label: "سه‌چهارم" }, "۳ تا از ۴ تکه"], [{ label: "دوپنجم" }, "۲ تا از ۵ تکه"], [{ label: "یک‌هشتم" }, "۱ تا از ۸ تکه"]] },
      { type: "order", prompt: "از کوچک به بزرگ بچین (هشتم‌ها)", say: "یک‌هشتم، سه‌هشتم، پنج‌هشتم، هفت‌هشتم. از کوچک به بزرگ بچین.", ltr: true,
        items: [{ label: "یک‌هشتم" }, { label: "سه‌هشتم" }, { label: "پنج‌هشتم" }, { label: "هفت‌هشتم" }] }
    ]
  },
  {
    id: "math-sapling-63", subject: "math", level: "sapling", emoji: "🪑", title: "آرایه‌ها",
    steps: [
      /* An array: chairs for a school show are set out in 3 rows of 4; counting by rows gives 4, 8, 12. */
      (function () {
        var parts = { bg: { art: "bg-school" } };
        for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) parts["c" + r + c] = { art: "🪑", at: [52 + c * 22, 56 + r * 15], s: 0.7, o: 0 };
        parts.num = { art: "count:big", at: [22, 80], s: 1.6, o: 0 };
        var rows = [{ id: "num", to: { o: 1 }, dur: 200 }];
        for (r = 0; r < 3; r++) { for (c = 0; c < 4; c++) rows.push(pop("c" + r + c, 300 + r * 1400 + c * 250, 0.15)); rows.push(tally("num", (r + 1) * 4, 300 + r * 1400 + 900)); }
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "برای جشن مدرسه صندلی می‌چینیم: ردیف به ردیف، هر ردیف چهار صندلی.", key: 2400, do: rows },
            { caption: "سه ردیف، هر ردیف چهار تا: چهار، هشت، دوازده. به این چیدمان آرایه می‌گوییم: ۳ × ۴ = ۱۲.", do: [pop("num", 300, 0.3)] }
          ],
          question: "اگر یک ردیف دیگر بچینیم، چند صندلی می‌شود؟", options: [13, 15, 16], answer: 16 };
      })(),
      { type: "array", rows: 2, cols: 5, thing: "🍎", prompt: "دو ردیف، هر ردیف پنج سیب. روی هم چندتا؟", options: [7, 10, 12] },
      { type: "array", rows: 3, cols: 4, thing: "🌷", turn: true, prompt: "آرایه را بچرخان: ۳ × ۴ همان ۴ × ۳ است؟ بعد بگو چندتاست.", options: [7, 12, 14] },
      { type: "array", ask: "build", rows: 4, cols: 3, prompt: "یک آرایه چهار ردیف سه‌تایی بساز." },
      { type: "choose", ltr: true, show: "۵ + ۵ + ۵ = ۳ × ۵", prompt: "جمع تکراری را با ضرب می‌نویسیم. این درست است؟", say: "پنج به اضافه پنج به اضافه پنج، مساوی سه ضرب در پنج. درست است؟", pic: true,
        options: [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }], answer: "درست" },
      { type: "array", ask: "build", n: 6, prompt: "شش مهره را به شکل یک آرایه بچین. هر جور آرایه‌ای که بشود." }
    ]
  },
  {
    id: "math-sapling-64", subject: "math", level: "sapling", emoji: "✋", title: "ضرب در ۲، ۵ و ۱۰",
    steps: [
      { type: "array", rows: 4, cols: 2, thing: "🧦", prompt: "چهار جفت جوراب. دوتا دوتا بشمار: ۴ × ۲ = ؟", options: [6, 8, 10] },
      { type: "numline", a: 4, b: 2, options: [5, 6, 7], prompt: "دوتا دوتا: ۲، ۴، … قورباغه از ۴ دو خانه می‌پرد. ۳ × ۲ چند است؟", say: "قورباغه روی چهار است و دو خانه می‌پرد. سه ضرب در دو چند است؟" },
      { type: "array", rows: 3, cols: 5, thing: "✋", prompt: "سه دست، هر دست پنج انگشت: ۳ × ۵ = ؟", options: [8, 15, 35] },
      { type: "choose", ltr: true, show: "۷ × ۵ = ؟", prompt: "پنج‌تا پنج‌تا هفت بار: ۵، ۱۰، ۱۵، … جواب؟", say: "هفت ضرب در پنج.", options: ["۳۰", "۳۵", "۴۰"], answer: "۳۵" },
      { type: "choose", ltr: true, show: "۶ × ۱۰ = ؟", prompt: "شش دسته ده‌تایی چندتاست؟", say: "شش ضرب در ده.", options: ["۱۶", "۶۰", "۶۰۰"], answer: "۶۰" },
      { type: "choose", ltr: true, show: "۹ × ۲ = ؟", prompt: "دو برابر نه چند است؟", say: "نه ضرب در دو.", options: ["۱۱", "۱۸", "۲۹"], answer: "۱۸" },
      { type: "choose", ltr: true, show: "۸ × ۵ = ؟", prompt: "نصف ۸ × ۱۰ است. جواب؟", say: "هشت ضرب در پنج. نصف هشت ضرب در ده است.", options: ["۴۰", "۸۰", "۱۳"], answer: "۴۰" }
    ]
  },
  {
    id: "math-sapling-65", subject: "math", level: "sapling", emoji: "🧮", title: "ضرب در ۴، ۳ و ۶",
    steps: [
      { type: "array", rows: 4, cols: 6, thing: "🥚", prompt: "ضرب در ۴ یعنی دو برابرِ دو برابر: ۲ × ۶ = ۱۲، پس ۴ × ۶ = ۲۴. بشمار و ببین.", options: [20, 24, 28] },
      { type: "choose", ltr: true, show: "۴ × ۷ = ؟", prompt: "۲ × ۷ = ۱۴. دو برابرش؟", say: "چهار ضرب در هفت. دو ضرب در هفت چهارده است. دو برابرش چند است؟", options: ["۲۱", "۲۸", "۱۸"], answer: "۲۸" },
      { type: "array", rows: 3, cols: 6, thing: "🍪", prompt: "ضرب در ۳: سه ردیف شش‌تایی. چندتاست؟", options: [15, 18, 21] },
      { type: "array", ask: "split", rows: 6, cols: 4, split: 5, prompt: "۶ × ۴ را دو تکه کن: ۵ × ۴ و ۱ × ۴. روی خط بین ردیف پنجم و ششم بزن.", question: "۶ × ۴ چند است؟", options: [20, 24, 28], answer: 24 },
      { type: "choose", ltr: true, show: "۶ × ۷ = ؟", prompt: "۳ × ۷ = ۲۱. شش یعنی دو برابر سه. جواب؟", say: "شش ضرب در هفت. سه ضرب در هفت بیست و یک است. دو برابرش؟", options: ["۴۲", "۳۶", "۴۸"], answer: "۴۲" },
      { type: "choose", ltr: true, show: "۳ × ۸ = ؟", prompt: "جواب؟", say: "سه ضرب در هشت.", options: ["۲۱", "۲۴", "۲۷"], answer: "۲۴" },
      { type: "choose", ltr: true, show: "۶ × ۶ = ؟", prompt: "جواب؟", say: "شش ضرب در شش.", options: ["۳۲", "۳۶", "۴۲"], answer: "۳۶" }
    ]
  },
  {
    id: "math-sapling-66", subject: "math", level: "sapling", emoji: "9️⃣", title: "ضرب در ۹، ۸ و ۷",
    steps: [
      { type: "array", ask: "split", rows: 9, cols: 6, split: 5, prompt: "۹ × ۶ = ۱۰ × ۶ منهای یک ردیف. یا: ۵ × ۶ و ۴ × ۶. بین ردیف پنجم و ششم بزن.", question: "۹ × ۶ چند است؟", options: [48, 54, 56], answer: 54 },
      { type: "choose", ltr: true, show: "۹ × ۷ = ؟", prompt: "۱۰ × ۷ = ۷۰. یک هفت کم کن. جواب؟", say: "نه ضرب در هفت. ده هفت‌تا هفتاد است. یک هفت کم کن.", options: ["۶۳", "۶۷", "۷۷"], answer: "۶۳" },
      { type: "choose", ltr: true, show: "۸ × ۶ = ؟", prompt: "۴ × ۶ = ۲۴. دو برابرش؟", say: "هشت ضرب در شش. چهار ضرب در شش بیست و چهار است. دو برابرش؟", options: ["۴۲", "۴۸", "۵۴"], answer: "۴۸" },
      { type: "array", ask: "split", rows: 7, cols: 8, split: 5, prompt: "۷ × ۸ = ۵ × ۸ + ۲ × ۸. بین ردیف پنجم و ششم بزن.", question: "۷ × ۸ چند است؟", options: [54, 56, 64], answer: 56 },
      { type: "choose", ltr: true, show: "۹ × ۹ = ؟", prompt: "جواب؟", say: "نه ضرب در نه.", options: ["۷۲", "۸۱", "۹۰"], answer: "۸۱" },
      { type: "choose", ltr: true, show: "۷ × ۷ = ؟", prompt: "جواب؟", say: "هفت ضرب در هفت.", options: ["۴۲", "۴۹", "۵۶"], answer: "۴۹" },
      { type: "choose", ltr: true, show: "۸ × ۸ = ؟", prompt: "جواب؟", say: "هشت ضرب در هشت.", options: ["۵۶", "۶۴", "۷۲"], answer: "۶۴" }
    ]
  },
  {
    id: "math-sapling-67", subject: "math", level: "sapling", emoji: "0️⃣", title: "ضرب در صفر و یک",
    steps: [
      /* Four plates with one apple each (4 × 1), then the apples are eaten and four empty plates are left (4 × 0). */
      (function () {
        var parts = { bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 94], s: 2.2 } };
        for (var i = 0; i < 4; i++) { parts["p" + i] = { art: "plate", at: [38 + i * 28, 56], s: 1.6 }; parts["a" + i] = { art: "🍎", at: [38 + i * 28, 54], s: 0.6, o: 0 }; }
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "چهار بشقاب، در هر بشقاب یک سیب: ۴ × ۱ = ۴. ضرب در یک، خود عدد را می‌دهد.", do: [0, 1, 2, 3].map(function (i) { return pop("a" + i, 300 + i * 500); }) },
            { caption: "بچه‌ها سیب‌ها را خوردند. حالا چهار بشقاب، در هر کدام صفر سیب: ۴ × ۰ = ۰.", do: [0, 1, 2, 3].map(function (i) { return { id: "a" + i, to: { o: 0, s: 0.2 }, at: 300 + i * 500, dur: 500 }; }) }
          ],
          question: "۷ × ۰ چند است؟", options: [0, 1, 7], answer: 0 };
      })(),
      { type: "choose", ltr: true, show: "۹ × ۱ = ؟", prompt: "جواب؟", say: "نه ضرب در یک.", options: ["۰", "۱", "۹"], answer: "۹" },
      { type: "choose", ltr: true, show: "۰ × ۵ = ؟", prompt: "صفر بار پنج تا: جواب؟", say: "صفر ضرب در پنج.", options: ["۰", "۵", "۵۰"], answer: "۰" },
      { type: "choose", ltr: true, show: "۱ × ۸ = ؟", prompt: "یک بار هشت تا. جواب؟", say: "یک ضرب در هشت.", options: ["۱", "۸", "۹"], answer: "۸" },
      { type: "choose", prompt: "سه کیسه داریم و هیچ‌کدام سیب ندارد. روی هم چند سیب؟", say: "سه کیسه داریم و هیچ‌کدام سیب ندارد. روی هم چند سیب؟", options: ["۰", "۱", "۳"], answer: "۰" },
      { type: "choose", ltr: true, show: "۱۲۳ × ۱ = ؟", prompt: "حتی برای عدد بزرگ: جواب؟", say: "صد و بیست و سه ضرب در یک.", options: ["۱", "۱۲۳", "۱۲۴"], answer: "۱۲۳" }
    ]
  },
  {
    id: "math-sapling-68", subject: "math", level: "sapling", emoji: "🔢", title: "جدول ضرب",
    steps: [
      { type: "pattern", prompt: "ستون ۳ در جدول ضرب: پر کن", say: "سه، شش، نه، … جاهای خالی را پر کن.", ltr: true, seq: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], blanks: [3, 6, 8], options: [12, 13, 21, 27, 28] },
      { type: "choose", prompt: "در جدول ضرب، ۴ × ۶ و ۶ × ۴ را پیدا کن. چه می‌بینی؟", say: "چهار ضرب در شش و شش ضرب در چهار. هر دو یکی‌اند؟", options: [{ label: "هر دو ۲۴", value: "same" }, { label: "فرق دارند", value: "diff" }], answer: "same" },
      { type: "pattern", prompt: "ستون ۹: رقم دهگان یکی بالا می‌رود، یکان یکی پایین. پر کن", say: "نه، هجده، بیست و هفت، … پر کن.", ltr: true, seq: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90], blanks: [4, 7], options: [45, 46, 72, 73] },
      { type: "choose", prompt: "جواب‌های ستون ۵ همیشه به چه رقمی ختم می‌شوند؟", say: "جواب‌های ضرب در پنج همیشه به چه رقمی ختم می‌شوند؟", stack: true, options: [{ label: "۰ یا ۵", value: "05" }, { label: "۲ یا ۴", value: "24" }, { label: "هر رقمی", value: "any" }], answer: "05" },
      { type: "pattern", prompt: "ستون ۶: پر کن", say: "شش، دوازده، هجده، … پر کن.", ltr: true, seq: [6, 12, 18, 24, 30, 36, 42, 48], blanks: [3, 5, 7], options: [24, 26, 36, 48, 49] },
      { type: "choose", prompt: "ستون ۲ زوج است یا فرد؟", say: "جواب‌های ضرب در دو، زوج‌اند یا فرد؟", options: [{ label: "همه زوج", value: "even" }, { label: "همه فرد", value: "odd" }], answer: "even" },
      { type: "choose", ltr: true, show: "۷ × ۶ = ؟", prompt: "از جدول به یاد بیاور.", say: "هفت ضرب در شش.", options: ["۴۲", "۴۸", "۳۶"], answer: "۴۲" }
    ]
  },
  {
    id: "math-sapling-69", subject: "math", level: "sapling", emoji: "🎴", title: "بازی جدول ضرب",
    steps: [
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر ضرب را با جوابش جفت کن.", pairs: [["۳ × ۷", 21], ["۴ × ۸", 32], ["۶ × ۹", 54], ["۵ × ۵", 25]] },
      { type: "sort", prompt: "جواب کدام ۲۴ است؟ کدام ۳۶؟", say: "هر ضرب را در سبد جوابش بگذار.",
        baskets: [{ label: 24, value: "24" }, { label: 36, value: "36" }],
        items: [{ label: "۴ × ۶", basket: "24" }, { label: "۹ × ۴", basket: "36" }, { label: "۳ × ۸", basket: "24" }, { label: "۶ × ۶", basket: "36" }, { label: "۲ × ۱۲", basket: "24" }, { label: "۱۲ × ۳", basket: "36" }] },
      { type: "pattern", prompt: "ستون ۸: پر کن", say: "هشت، شانزده، … پر کن.", ltr: true, seq: [8, 16, 24, 32, 40, 48, 56], blanks: [2, 4, 6], options: [24, 26, 40, 56, 58] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر ضرب را با جوابش جفت کن.", pairs: [["۷ × ۷", 49], ["۸ × ۹", 72], ["۶ × ۸", 48]] },
      { type: "sort", prompt: "جواب زوج است یا فرد؟", say: "هر ضرب را در سبد زوج یا فرد بگذار.",
        baskets: [{ label: "زوج", pic: "👟", value: "even" }, { label: "فرد", pic: "🧦", value: "odd" }],
        items: [{ label: "۳ × ۵", basket: "odd" }, { label: "۴ × ۷", basket: "even" }, { label: "۹ × ۳", basket: "odd" }, { label: "۶ × ۵", basket: "even" }] },
      { type: "pattern", prompt: "ستون ۷: پر کن", say: "هفت، چهارده، … پر کن.", ltr: true, seq: [7, 14, 21, 28, 35, 42, 49], blanks: [3, 5], options: [28, 27, 42, 43] }
    ]
  },
  {
    id: "math-sapling-70", subject: "math", level: "sapling", emoji: "🍬", title: "تقسیم: سهم مساوی",
    steps: [
      /* Sharing: twelve sweets are dealt out one at a time, round and round, onto three plates; each plate gets four. */
      (function () {
        var parts = { bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 94], s: 2.2 } };
        var PX = [40, 80, 120];
        PX.forEach(function (x, i) { parts["p" + i] = { art: "plate", at: [x, 58], s: 1.8 }; });
        for (var k = 0; k < 12; k++) parts["s" + k] = { art: "🍬", at: [148, 30], s: 0.7 };
        var deal = [];
        for (k = 0; k < 12; k++) { var pl = k % 3, n = Math.floor(k / 3); deal.push(hop("s" + k, [148, 30], [PX[pl] - 10.5 + n * 7, 55], 300 + k * 450, 700, 8)); }
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "دوازده آب‌نبات را بین سه نفر مساوی تقسیم می‌کنیم: یکی به این، یکی به آن، یکی به سومی، و باز از اول.", key: 3500, do: deal },
            { caption: "هر بشقاب چهار آب‌نبات دارد. دوازده تقسیم بر سه، چهار: ۱۲ ÷ ۳ = ۴.", do: PX.map(function (x, i) { return jump("p" + i, 300 + i * 400, 2); }) }
          ],
          question: "اگر همان ۱۲ آب‌نبات را بین ۴ نفر تقسیم کنیم، به هر نفر چندتا می‌رسد؟", options: [3, 4, 8], answer: 3 };
      })(),
      { type: "feed", n: 15, who: ["👧", "👦", "🧒"], food: "🍪", prompt: "پانزده شیرینی را بین سه نفر مساوی تقسیم کن." },
      { type: "choose", ltr: true, show: "۱۸ ÷ ۶ = ؟", prompt: "هجده سیب را بین شش نفر تقسیم کن. به هر نفر چندتا؟", say: "هجده تقسیم بر شش.", options: ["۲", "۳", "۱۲"], answer: "۳" },
      { type: "feed", n: 20, plates: 4, food: "🥕", prompt: "بیست هویج بین چهار خرگوش." },
      { type: "choose", ltr: true, show: "۲۴ ÷ ۴ = ؟", prompt: "جواب؟", say: "بیست و چهار تقسیم بر چهار.", options: ["۴", "۶", "۸"], answer: "۶" },
      { type: "choose", ltr: true, show: "۳۵ ÷ ۵ = ؟", prompt: "جواب؟", say: "سی و پنج تقسیم بر پنج.", options: ["۵", "۷", "۳۰"], answer: "۷" }
    ]
  },
  {
    id: "math-sapling-71", subject: "math", level: "sapling", emoji: "📦", title: "تقسیم: چندتا گروه؟",
    steps: [
      { type: "array", rows: 4, cols: 5, thing: "🥚", prompt: "۲۰ تخم‌مرغ را پنج‌تا پنج‌تا در جعبه‌ها می‌گذاریم. چند جعبه پر می‌شود؟ (۲۰ ÷ ۵)", question: "چند ردیف پنج‌تایی است؟", options: [4, 5, 15], answer: 4 },
      { type: "numline", a: 0, b: 3, options: [2, 3, 4], prompt: "از صفر سه خانه سه خانه می‌پریم: ۳، ۶، ۹، ۱۲. ۱۲ ÷ ۳ یعنی چند پرش؟ (اول یک پرش سه‌تایی را ببین)", say: "قورباغه از صفر سه خانه می‌پرد." },
      { type: "choose", prompt: "۱۲ ÷ ۳: از صفر سه‌تا سه‌تا تا ۱۲ چند پرش است؟", say: "دوازده تقسیم بر سه. سه، شش، نه، دوازده. چند پرش؟", options: ["۳", "۴", "۹"], answer: "۴" },
      { type: "array", ask: "build", n: 18, prompt: "۱۸ مهره را در ردیف‌های ششتایی بچین. چند ردیف شد؟", question: "۱۸ ÷ ۶ چند است؟", options: [2, 3, 12], answer: 3 },
      { type: "choose", ltr: true, show: "۳۰ ÷ ۱۰ = ؟", prompt: "۳۰ نان را در کیسه‌های ده‌تایی می‌گذاریم. چند کیسه؟", say: "سی تقسیم بر ده.", options: ["۳", "۲۰", "۳۰۰"], answer: "۳" },
      { type: "choose", ltr: true, show: "۲۸ ÷ ۷ = ؟", prompt: "چند هفت‌تا در ۲۸ هست؟", say: "بیست و هشت تقسیم بر هفت.", options: ["۳", "۴", "۵"], answer: "۴" }
    ]
  },
  {
    id: "math-sapling-72", subject: "math", level: "sapling", emoji: "👨‍👩‍👧", title: "ضرب و تقسیم، یک خانواده",
    steps: [
      { type: "choose", ltr: true, show: "۴ × ۶ = ۲۴", prompt: "از این ضرب، کدام تقسیم را می‌شود فهمید؟", say: "چهار ضرب در شش، بیست و چهار. کدام تقسیم درست است؟", stack: true, options: ["۲۴ ÷ ۶ = ۴", "۲۴ ÷ ۶ = ۶", "۶ ÷ ۴ = ۲۴"], answer: "۲۴ ÷ ۶ = ۴" },
      { type: "choose", ltr: true, show: "۳ × □ = ۲۱", prompt: "جای □ چه عددی است؟", say: "سه ضرب در چه عددی می‌شود بیست و یک؟", options: ["۶", "۷", "۱۸"], answer: "۷" },
      { type: "sort", prompt: "کدام از خانواده ۵، ۸ و ۴۰ است؟", say: "جمله‌هایی که از خانواده پنج، هشت و چهل‌اند در یک سبد، و بقیه در سبد دیگر.",
        baskets: [{ label: "از خانواده", pic: "👨‍👩‍👧", value: "yes" }, { label: "نه", pic: "❌", value: "no" }],
        items: [{ label: "۵ × ۸ = ۴۰", basket: "yes" }, { label: "۴۰ ÷ ۵ = ۸", basket: "yes" }, { label: "۸ × ۵ = ۴۰", basket: "yes" }, { label: "۴۰ ÷ ۸ = ۵", basket: "yes" }, { label: "۴۰ − ۸ = ۳۲", basket: "no" }, { label: "۵ + ۸ = ۱۳", basket: "no" }] },
      { type: "choose", ltr: true, show: "□ ÷ ۴ = ۹", prompt: "جای □ چه عددی است؟ (با ضرب بررسی کن)", say: "چه عددی تقسیم بر چهار می‌شود نه؟", options: ["۱۳", "۳۶", "۵"], answer: "۳۶" },
      { type: "choose", ltr: true, show: "۵۴ ÷ ۶ = ؟", prompt: "به ضرب فکر کن: شش ضرب در چند می‌شود ۵۴؟", say: "پنجاه و چهار تقسیم بر شش. شش ضرب در چند می‌شود پنجاه و چهار؟", options: ["۸", "۹", "۴۸"], answer: "۹" },
      { type: "sort", prompt: "جواب کدام ۶ است؟ کدام ۸؟", say: "هر تقسیم را در سبد جوابش بگذار.",
        baskets: [{ label: 6, value: "6" }, { label: 8, value: "8" }],
        items: [{ label: "۴۲ ÷ ۷", basket: "6" }, { label: "۵۶ ÷ ۷", basket: "8" }, { label: "۳۶ ÷ ۶", basket: "6" }, { label: "۷۲ ÷ ۹", basket: "8" }] }
    ]
  },
  {
    id: "math-sapling-73", subject: "math", level: "sapling", emoji: "🥣", title: "باقی‌مانده",
    steps: [
      /* Fourteen walnuts dealt onto three plates: four each, and two that cannot be shared go into the bowl. */
      (function () {
        var parts = { bg: { art: "bg-kitchen" }, table: { art: "counter-table", at: [80, 94], s: 2.2 }, bowl: { art: "bowl", look: { level: 0 }, at: [142, 58], s: 0.9 } };
        var PX = [30, 66, 102];
        PX.forEach(function (x, i) { parts["p" + i] = { art: "plate", at: [x, 58], s: 1.7 }; });
        for (var k = 0; k < 14; k++) parts["w" + k] = { art: "🌰", at: [80, 20], s: 0.6 };
        var deal = [];
        for (k = 0; k < 12; k++) { var pl = k % 3, n = Math.floor(k / 3); deal.push(hop("w" + k, [80, 20], [PX[pl] - 10 + n * 6.7, 55], 300 + k * 400, 650, 8)); }
        var rest = [hop("w12", [80, 20], [138, 52], 300, 900, 8), hop("w13", [80, 20], [146, 52], 900, 900, 8)];
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "چهارده گردو را بین سه نفر مساوی تقسیم می‌کنیم. به هر نفر چهار تا رسید.", key: 4000, do: deal },
            { caption: "دو گردو ماند. برای همه نمی‌رسد، پس در کاسه می‌گذاریم: باقی‌مانده دو.", do: rest },
            { caption: "۱۴ ÷ ۳ = ۴، باقی‌مانده ۲. باقی‌مانده همیشه از تعداد نفرها کمتر است." }
          ],
          question: "اگر ۱۶ گردو بین ۳ نفر تقسیم کنیم، چندتا باقی می‌ماند؟", options: [0, 1, 4], answer: 1 };
      })(),
      { type: "feed", n: 11, plates: 2, food: "🍪", prompt: "یازده شیرینی بین دو نفر. چندتا باقی می‌ماند؟" },
      { type: "choose", ltr: true, show: "۱۷ ÷ ۵ = ؟", prompt: "به هر نفر چندتا می‌رسد و چندتا باقی می‌ماند؟", say: "هفده تقسیم بر پنج.", stack: true,
        options: ["۳، باقی‌مانده ۲", "۲، باقی‌مانده ۷", "۴، باقی‌مانده ۳"], answer: "۳، باقی‌مانده ۲" },
      { type: "feed", n: 22, plates: 4, food: "🥕", prompt: "بیست و دو هویج بین چهار خرگوش." },
      { type: "choose", prompt: "۲۵ نفر می‌خواهند با ماشین‌های ۴ نفره به گردش بروند. چند ماشین لازم است؟", say: "بیست و پنج نفر می‌خواهند با ماشین‌های چهارنفره بروند. چند ماشین لازم است؟ حواست به باقی‌مانده باشد.", options: ["۶", "۷", "۵"], answer: "۷" }
    ]
  },
  {
    id: "math-sapling-74", subject: "math", level: "sapling", emoji: "🧺", title: "مسئله‌های ضرب و تقسیم",
    steps: [
      /* Times as many, drawn as bars: Reza has 8 stamps; Narges has 3 times as many, three bars of 8. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          rl: { art: "tag:رضا", at: [14, 34] }, nl: { art: "tag:نرگس", at: [14, 62] },
          r: { art: "bar-rect", look: { w: 32, color: "#9fd3f0" }, at: [30, 30] },
          n0: { art: "bar-rect", look: { w: 32, color: "#f6b73c" }, at: [30, 58], sx: 0.01, o: 0 }, n1: { art: "bar-rect", look: { w: 32, color: "#f6b73c" }, at: [62, 58], sx: 0.01, o: 0 },
          n2: { art: "bar-rect", look: { w: 32, color: "#f6b73c" }, at: [94, 58], sx: 0.01, o: 0 },
          t8: { art: "tag:۸", at: [46, 22] }, brace: { art: "brace", look: { w: 96 }, at: [30, 72], sy: -1, o: 0 }, tq: { art: "tag:۲۴", at: [78, 86], o: 0 }
        },
        scenes: [
          { caption: "رضا ۸ تمبر دارد. نوار آبی تمبرهای رضاست.", do: [jump("r", 300, 2)] },
          { caption: "نرگس سه برابر رضا تمبر دارد: سه نوار به اندازه نوار رضا.", do: [{ id: "n0", to: { sx: 1, o: 1 }, at: 300, dur: 800 }, { id: "n1", to: { sx: 1, o: 1 }, at: 1200, dur: 800 }, { id: "n2", to: { sx: 1, o: 1 }, at: 2100, dur: 800 }] },
          { caption: "سه تا هشت‌تا: ۳ × ۸ = ۲۴. نرگس ۲۴ تمبر دارد.", do: [{ id: "brace", to: { o: 1 }, dur: 300 }, { id: "tq", to: { o: 1 }, at: 500, dur: 300 }, pop("tq", 500, 0.3)] }
        ],
        question: "روی هم چند تمبر دارند؟ (۸ + ۲۴)", options: [24, 32, 40], answer: 32 },
      { type: "bar", prompt: "یک کتاب ۶ هزار تومان است. ۴ کتاب چقدر می‌شود؟", bars: [{ label: "۴ کتاب", parts: [6, 6, 6, 6] }], whole: "?", options: [10, 24, 30], answer: 24, result: "۴ × ۶ = ۲۴" },
      { type: "bar", prompt: "۲۰ مداد را در ۵ جعبه مساوی گذاشتیم. هر جعبه چند مداد دارد؟", bars: [{ label: "مدادها", parts: ["?", "?", "?", "?", "?"] }], whole: 20, options: [4, 5, 15], answer: 4, result: "۲۰ ÷ ۵ = ۴" },
      { type: "bar", prompt: "سارا ۵ گل دارد و مینا ۴ برابر سارا. مینا چند گل دارد؟", bars: [{ label: "سارا", parts: [5] }, { label: "مینا", parts: [5, 5, 5, 5] }], braces: [{ bar: 1, text: "؟" }], options: [9, 20, 25], answer: 20, result: "۴ × ۵ = ۲۰" },
      { type: "bar", prompt: "۳۲ نفر در ۴ ردیف مساوی نشسته‌اند. هر ردیف چند نفر است؟", bars: [{ label: "۳۲ نفر", parts: ["?", "?", "?", "?"] }], whole: 32, options: [6, 8, 28], answer: 8, result: "۳۲ ÷ ۴ = ۸" }
    ]
  },
  {
    id: "math-sapling-75", subject: "math", level: "sapling", emoji: "🎯", title: "بازی ضرب و تقسیم",
    steps: [
      { type: "pairs", prompt: "هر ضرب را با تقسیم هم‌خانواده‌اش جفت کن", say: "هر ضرب را با تقسیمی جفت کن که از همان خانواده است.", pairs: [["۶ × ۷ = ۴۲", "۴۲ ÷ ۷ = ۶"], ["۸ × ۳ = ۲۴", "۲۴ ÷ ۳ = ۸"], ["۹ × ۵ = ۴۵", "۴۵ ÷ ۵ = ۹"]] },
      { type: "sort", prompt: "ضرب است یا تقسیم؟", say: "هر قصه را در سبد ضرب یا تقسیم بگذار.",
        baskets: [{ label: "ضرب", pic: "✖️", value: "x" }, { label: "تقسیم", pic: "➗", value: "d" }],
        items: [{ label: "۵ کیسه، هر کیسه ۶ سیب", say: "پنج کیسه، هر کیسه شش سیب. روی هم چندتا؟", basket: "x" }, { label: "۱۸ مداد بین ۳ نفر", say: "هجده مداد بین سه نفر. به هر نفر چندتا؟", basket: "d" },
          { label: "۴ ردیف ۷تایی", say: "چهار ردیف هفت‌تایی. چندتا؟", basket: "x" }, { label: "۳۰ تخم‌مرغ در شانه‌های ۱۰تایی", say: "سی تخم‌مرغ در شانه‌های ده‌تایی. چند شانه؟", basket: "d" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر حساب را با جوابش جفت کن.", pairs: [["۶۳ ÷ ۹", 7], ["۸ × ۶", 48], ["۴۸ ÷ ۸", 6]] },
      { type: "sort", prompt: "باقی‌مانده دارد یا ندارد؟", say: "تقسیم‌هایی که باقی‌مانده دارند در یک سبد، بقیه در سبد دیگر.",
        baskets: [{ label: "بی‌باقی‌مانده", pic: "✅", value: "no" }, { label: "باقی‌مانده دارد", pic: "🥣", value: "yes" }],
        items: [{ label: "۲۰ ÷ ۴", basket: "no" }, { label: "۲۳ ÷ ۴", basket: "yes" }, { label: "۱۵ ÷ ۲", basket: "yes" }, { label: "۲۷ ÷ ۳", basket: "no" }] },
      { type: "pairs", prompt: "هر ضرب را با جوابش جفت کن", say: "هر ضرب را با جوابش جفت کن.", pairs: [["۷ × ۸", 56], ["۹ × ۶", 54], ["۴ × ۹", 36]] }
    ]
  },
  {
    id: "math-sapling-76", subject: "math", level: "sapling", emoji: "🌷", title: "محیط",
    steps: [
      /* Perimeter: a fence is really drawn all the way round a flower bed, side by side: 6, 3, 6 and 3 metres. */
      { type: "scene", prompt: "ببین و گوش کن",
        parts: {
          sky: { art: "sky-day" }, ground: { art: "ground" }, bed: { art: "bed-top", look: { w: 90, h: 36 }, at: [35, 30] },
          fence: { art: "rect-line", look: { w: 90, h: 36 }, at: [35, 30], o: 0 },
          w1: { art: "tag:۶ متر", at: [80, 28] }, h1: { art: "tag:۳ متر", at: [142, 52] }, w2: { art: "tag:۶ متر", at: [80, 80], o: 0 }, h2: { art: "tag:۳ متر", at: [18, 52], o: 0 },
          tot: { art: "tag:۱۸ متر", at: [80, 52], o: 0 }
        },
        scenes: [
          { caption: "این باغچه شش متر دراز است و سه متر پهن.", do: [jump("w1", 300, 2), jump("h1", 1000, 2)] },
          { caption: "دور باغچه حصار می‌کشیم. ضلع روبه‌رو هم همان‌قدر است: شش و سه، و باز شش و سه.", key: 3000, do: [
            { id: "fence", to: { o: 1 }, dur: 1 }, { id: "fence", draw: true, dur: 4000, ease: "linear" },
            { id: "w2", to: { o: 1 }, at: 2200, dur: 300 }, { id: "h2", to: { o: 1 }, at: 3600, dur: 300 }
          ] },
          { caption: "۶ + ۳ + ۶ + ۳ = ۱۸. اندازه دور یک شکل را «محیط» می‌گوییم. محیط باغچه ۱۸ متر است.", do: [{ id: "tot", to: { o: 1 }, at: 300, dur: 300 }, pop("tot", 300, 0.3)] }
        ],
        question: "اگر باغچه ۵ متر دراز و ۲ متر پهن باشد، محیطش چند متر است؟", options: [7, 10, 14], answer: 14 },
      { type: "measure", ask: "count", unit: "📏", bars: [{ thing: "🟦", len: 4 }], options: [3, 4, 5], prompt: "یک ضلع این کاشی مربعی چند سانتی‌متر است؟ بشمار." },
      { type: "choose", prompt: "کاشی مربعی ۴ سانتی‌متری. محیطش؟ (چهار ضلع برابر)", say: "یک مربع که هر ضلعش چهار سانتی‌متر است. محیطش چند است؟", options: ["۸", "۱۲", "۱۶"], answer: "۱۶" },
      { type: "choose", ltr: true, show: "۷ + ۷ + ۷", prompt: "یک مثلث با سه ضلع ۷ سانتی‌متری. محیطش؟", say: "یک مثلث که هر سه ضلعش هفت سانتی‌متر است. محیطش چند است؟", options: ["۱۴", "۲۱", "۲۸"], answer: "۲۱" },
      { type: "measure", ask: "count", unit: "👣", bars: [{ thing: "🏠", len: 6 }], options: [5, 6, 7], prompt: "یک ضلع حیاط را با قدم اندازه گرفتیم. چند قدم است؟" },
      { type: "choose", prompt: "حیاط مستطیل است: ۶ قدم و ۴ قدم. دور حیاط چند قدم است؟", say: "حیاط مستطیل است: شش قدم و چهار قدم. دور حیاط چند قدم است؟", options: ["۱۰", "۲۰", "۲۴"], answer: "۲۰" }
    ]
  },
  {
    id: "math-sapling-77", subject: "math", level: "sapling", emoji: "🟩", title: "مساحت با مربع",
    steps: [
      { type: "grid", ask: "area", size: [6, 4], cells: [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2]], prompt: "مساحت یعنی چقدر جا را می‌پوشاند. مربع‌های این شکل را بشمار: روی هر کدام بزن.", options: [5, 6, 9] },
      { type: "grid", ask: "area", size: [6, 5], cells: [[2, 1], [3, 1], [4, 1], [2, 2], [3, 2], [4, 2], [3, 3]], prompt: "مساحت این شکل چند مربع است؟", options: [6, 7, 8] },
      { type: "choose", prompt: "یک فرش ۴ مربع دارد و فرش دیگر ۶ مربع. کدام جای بیشتری می‌گیرد؟", say: "یک فرش چهار مربع و فرش دیگر شش مربع است. کدام جای بیشتری می‌گیرد؟", options: [{ label: "۴ مربع", value: "4" }, { label: "۶ مربع", value: "6" }], answer: "6" },
      { type: "grid", ask: "draw", size: [6, 5], area: 8, prompt: "یک شکل بکش که مساحتش ۸ مربع باشد. هر شکلی که دوست داری." },
      { type: "grid", ask: "area", size: [7, 5], cells: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [5, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]], prompt: "مساحت این قاب چند مربع است؟ (وسطش خالی است)", options: [12, 15, 17] },
      { type: "choose", prompt: "دو شکل هر کدام ۶ مربع دارند ولی شکل‌شان فرق دارد. مساحت‌شان؟", say: "دو شکل هر کدام شش مربع دارند ولی شکل‌شان فرق دارد. مساحت‌شان برابر است؟", options: [{ label: "برابر است", value: "same" }, { label: "فرق دارد", value: "diff" }], answer: "same" }
    ]
  },
  {
    id: "math-sapling-78", subject: "math", level: "sapling", emoji: "▦", title: "مساحت مستطیل",
    steps: [
      { type: "array", rows: 3, cols: 5, thing: "🟩", prompt: "یک مستطیل ۳ ردیف و ۵ ستون. لازم نیست یکی‌یکی بشماری: ۳ × ۵.", options: [8, 15, 18] },
      { type: "grid", ask: "draw", size: [8, 6], rect: [4, 3], prompt: "یک مستطیل ۴ در ۳ بکش. مساحتش ۴ × ۳ است." },
      { type: "choose", ltr: true, show: "۶ × ۴ = ؟", prompt: "یک فرش ۶ متر در ۴ متر است. مساحتش چند متر مربع؟", say: "یک فرش شش متر در چهار متر است. مساحتش چند متر مربع است؟", options: ["۱۰", "۲۰", "۲۴"], answer: "۲۴" },
      { type: "grid", ask: "area", size: [8, 6], cells: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]], prompt: "مساحت؟ (ردیف × ستون)", options: [8, 12, 14] },
      { type: "grid", ask: "draw", size: [8, 6], area: 12, rect: [6, 2], prompt: "یک مستطیل با مساحت ۱۲ بکش که ۲ ردیف داشته باشد." },
      { type: "choose", prompt: "کاشی‌های کف آشپزخانه ۵ ردیف ۸تایی‌اند. چند کاشی؟", say: "کاشی‌های کف آشپزخانه پنج ردیف هشت‌تایی‌اند. چند کاشی؟", options: ["۱۳", "۳۵", "۴۰"], answer: "۴۰" }
    ]
  },
  {
    id: "math-sapling-79", subject: "math", level: "sapling", emoji: "❓", title: "محیط یا مساحت؟",
    steps: [
      { type: "choose", prompt: "می‌خواهیم دور حیاط را نرده بکشیم. محیط را حساب کنیم یا مساحت؟", say: "می‌خواهیم دور حیاط را نرده بکشیم. محیط لازم است یا مساحت؟", options: [{ label: "محیط", value: "p" }, { label: "مساحت", value: "a" }], answer: "p" },
      { type: "choose", prompt: "می‌خواهیم کف اتاق را فرش کنیم. محیط یا مساحت؟", say: "می‌خواهیم کف اتاق را فرش کنیم. محیط لازم است یا مساحت؟", options: [{ label: "محیط", value: "p" }, { label: "مساحت", value: "a" }], answer: "a" },
      { type: "grid", ask: "perimeter", size: [6, 5], cells: [[2, 2], [3, 2], [4, 2], [2, 3], [3, 3], [4, 3]], prompt: "محیط این مستطیل را بشمار: روی هر ضلع کوچک دورش بزن.", options: [6, 10, 12] },
      { type: "grid", ask: "area", size: [6, 5], cells: [[2, 2], [3, 2], [4, 2], [2, 3], [3, 3], [4, 3]], prompt: "حالا مساحت همان مستطیل را بشمار.", options: [6, 10, 12] },
      { type: "choose", prompt: "دور قاب عکس روبان می‌چسبانیم. کدام را اندازه می‌گیریم؟", say: "دور قاب عکس روبان می‌چسبانیم. محیط یا مساحت؟", options: [{ label: "محیط", value: "p" }, { label: "مساحت", value: "a" }], answer: "p" },
      { type: "grid", ask: "draw", size: [8, 6], rect: [3, 3], show: "perimeter", prompt: "یک مربع ۳ در ۳ بکش. محیط و مساحتش را ببین." },
      { type: "choose", prompt: "مربع ۳ در ۳: محیطش ۱۲ و مساحتش؟", say: "مربع سه در سه. محیطش دوازده است. مساحتش چند است؟", options: ["۶", "۹", "۱۲"], answer: "۹" }
    ]
  },
  {
    id: "math-sapling-80", subject: "math", level: "sapling", emoji: "🧾", title: "جمع و تفریق در مسئله",
    steps: [
      { type: "bar", prompt: "در کتابخانه مدرسه ۴۲۵ کتاب داستان و ۲۳۸ کتاب علمی هست. روی هم چند کتاب؟", bars: [{ label: "کتاب‌ها", parts: [425, 238] }], whole: "?", options: [563, 663, 187], answer: 663, result: "۴۲۵ + ۲۳۸ = ۶۶۳" },
      { type: "column", op: "+", a: 425, b: 238, prompt: "حالا ستونی حساب کن و جوابت را بررسی کن." },
      { type: "bar", prompt: "یک کشاورز ۸۰۰ نهال داشت. ۳۴۵ تا را کاشت. چندتا مانده؟", bars: [{ label: "نهال‌ها", parts: [345, "?"] }], whole: 800, options: [455, 545, 1145], answer: 455, result: "۸۰۰ − ۳۴۵ = ۴۵۵" },
      { type: "column", op: "-", a: 800, b: 345, prompt: "ستونی حساب کن." },
      { type: "choose", prompt: "قطار ۶۱۲ مسافر داشت. در ایستگاه ۱۵۸ نفر پیاده شدند و ۹۰ نفر سوار شدند. حالا چند نفرند؟", say: "قطار ششصد و دوازده مسافر داشت. در ایستگاه صد و پنجاه و هشت نفر پیاده و نود نفر سوار شدند. حالا چند نفرند؟", options: ["۵۴۴", "۴۵۴", "۸۶۰"], answer: "۵۴۴" },
      { type: "bar", prompt: "ارتفاع دماوند حدود ۵۶۱۰ متر است و ارتفاع سبلان حدود ۴۸۱۱ متر. دماوند چقدر بلندتر است؟", bars: [{ label: "دماوند", parts: [5610] }, { label: "سبلان", parts: [4811] }], diff: "?", options: [799, 899, 1799], answer: 799, result: "۵۶۱۰ − ۴۸۱۱ = ۷۹۹" }
    ]
  },
  {
    id: "math-sapling-81", subject: "math", level: "sapling", emoji: "🧠", title: "حساب ذهنی",
    steps: [
      { type: "choose", ltr: true, show: "۴۹ + ۲۶ = ؟", prompt: "۴۹ نزدیک ۵۰ است. ۵۰ + ۲۶، بعد یکی کم کن.", say: "چهل و نه به اضافه بیست و شش. پنجاه به اضافه بیست و شش، بعد یکی کم کن.", options: ["۷۴", "۷۵", "۷۶"], answer: "۷۵" },
      { type: "choose", ltr: true, show: "۳۰۰ + ۵۰۰ = ؟", prompt: "صدها را مثل یکی‌ها جمع کن: ۳ و ۵.", say: "سیصد به اضافه پانصد.", options: ["۸۰", "۸۰۰", "۸۰۰۰"], answer: "۸۰۰" },
      { type: "numline", a: 9, b: 9, options: [17, 18, 19], prompt: "۹ + ۹: یک دوتایی! روی خط ببین.", say: "نه به اضافه نه." },
      { type: "choose", ltr: true, show: "۷۲ − ۱۹ = ؟", prompt: "۱۹ نزدیک ۲۰ است. ۷۲ − ۲۰، بعد یکی برگردان.", say: "هفتاد و دو منهای نوزده. هفتاد و دو منهای بیست، بعد یکی اضافه کن.", options: ["۵۲", "۵۳", "۵۴"], answer: "۵۳" },
      { type: "choose", ltr: true, show: "۶۵ + ۳۵ = ؟", prompt: "پنج و پنج، ده می‌شود. جواب؟", say: "شصت و پنج به اضافه سی و پنج.", options: ["۹۰", "۱۰۰", "۱۱۰"], answer: "۱۰۰" },
      { type: "choose", ltr: true, show: "۲۵۰ + ۲۵۰ = ؟", prompt: "جواب؟", say: "دویست و پنجاه به اضافه دویست و پنجاه.", options: ["۴۰۰", "۵۰۰", "۵۵۰"], answer: "۵۰۰" },
      { type: "choose", ltr: true, show: "۹۹ + ۴۷ = ؟", prompt: "۹۹ یکی کمتر از ۱۰۰ است. جواب؟", say: "نود و نه به اضافه چهل و هفت.", options: ["۱۴۵", "۱۴۶", "۱۴۷"], answer: "۱۴۶" }
    ]
  },
  {
    id: "math-sapling-82", subject: "math", level: "sapling", emoji: "📋", title: "جدول و چوب‌خط",
    steps: [
      { type: "count", show: "tally", n: 13, options: [12, 13, 14], prompt: "در جدول چوب‌خط، هر دسته پنج‌تایی است. این چوب‌خط چندتا را نشان می‌دهد؟", ask: "چندتا؟" },
      { type: "chart", make: true, title: "رنگ ماشین‌هایی که از کوچه گذشتند", prompt: "از پنجره ماشین‌ها را شمردیم. هر ماشین را در ستون رنگش بگذار.",
        rows: [{ label: "سفید", pic: "🚙", n: 6 }, { label: "قرمز", pic: "🚗", n: 3 }, { label: "زرد", pic: "🚕", n: 4 }],
        question: "چند ماشین سفید بود؟", options: [5, 6, 7], answer: 6 },
      { type: "chart", title: "رنگ ماشین‌هایی که از کوچه گذشتند", rows: [{ label: "سفید", pic: "🚙", n: 6 }, { label: "قرمز", pic: "🚗", n: 3 }, { label: "زرد", pic: "🚕", n: 4 }],
        question: "روی هم چند ماشین شمردیم؟", options: [12, 13, 14], answer: 13 },
      { type: "count", show: "tally", n: 17, options: [15, 17, 22], prompt: "این چوب‌خط چندتاست؟ پنج‌تا پنج‌تا بشمار: ۵، ۱۰، ۱۵، …", ask: "چندتا؟" },
      { type: "choose", prompt: "برای نشان دادن ۸، چند دسته پنج‌تایی و چند خط تنها می‌کشیم؟", say: "برای نشان دادن هشت با چوب‌خط، چند دسته پنج‌تایی و چند خط تنها؟", stack: true,
        options: [{ label: "۱ دسته و ۳ خط", value: "1-3" }, { label: "۸ خط تنها", value: "8" }, { label: "۲ دسته", value: "2" }], answer: "1-3" },
      { type: "doit", pic: "📋✏️", text: "یک جدول چوب‌خط بساز:",
        list: ["از ده نفر از فامیل یا همسایه‌ها بپرس: «کدام فصل را بیشتر دوست داری؟»", "یک جدول چهار ستونه بکش (بهار، تابستان، پاییز، زمستان) و برای هر جواب یک خط بکش.", "بشمار. کدام فصل محبوب‌تر بود؟ چندتا بیشتر از کمترین؟"] }
    ]
  },
  {
    id: "math-sapling-83", subject: "math", level: "sapling", emoji: "📊", title: "نمودار ستونی",
    steps: [
      { type: "chart", bars: true, title: "تعداد کتاب‌هایی که بچه‌ها در یک ماه خواندند", rows: [{ label: "آرین", n: 4 }, { label: "سوگند", n: 7 }, { label: "پرهام", n: 5 }, { label: "ترانه", n: 3 }],
        question: "سوگند چند کتاب خواند؟", options: [6, 7, 8], answer: 7 },
      { type: "chart", bars: true, title: "تعداد کتاب‌هایی که بچه‌ها در یک ماه خواندند", rows: [{ label: "آرین", n: 4 }, { label: "سوگند", n: 7 }, { label: "پرهام", n: 5 }, { label: "ترانه", n: 3 }],
        question: "سوگند چند کتاب بیشتر از ترانه خواند؟", options: [3, 4, 10], answer: 4 },
      { type: "chart", bars: true, add: true, title: "هوای هفته", prompt: "دو روز دیگر آفتابی بود و یک روز دیگر بارانی. نمودار را درست کن.",
        rows: [{ label: "آفتابی", has: 2, n: 4 }, { label: "ابری", has: 1, n: 1 }, { label: "بارانی", has: 1, n: 2 }],
        question: "چند روز آفتابی بود؟", options: [2, 3, 4], answer: 4 },
      { type: "chart", bars: true, title: "میوه‌های فروخته شده (کیلو)", rows: [{ label: "سیب", n: 8 }, { label: "پرتقال", n: 6 }, { label: "انار", n: 9 }, { label: "موز", n: 2 }],
        question: "کدام میوه بیشتر فروش رفت؟", options: [{ label: "سیب", value: "سیب" }, { label: "انار", value: "انار" }, { label: "پرتقال", value: "پرتقال" }], answer: "انار" },
      { type: "chart", bars: true, title: "میوه‌های فروخته شده (کیلو)", rows: [{ label: "سیب", n: 8 }, { label: "پرتقال", n: 6 }, { label: "انار", n: 9 }, { label: "موز", n: 2 }],
        question: "روی هم چند کیلو سیب و پرتقال فروخته شد؟", options: [12, 14, 16], answer: 14 }
    ]
  },
  {
    id: "math-sapling-99", subject: "math", level: "sapling", emoji: "📍", title: "نمودار نقطه‌ای",
    steps: [
      { type: "measure", ask: "count", unit: "📏", bars: [{ thing: "✏️", len: 6 }], options: [5, 6, 7], prompt: "مداد اول چند سانتی‌متر است؟" },
      { type: "measure", ask: "count", unit: "📏", bars: [{ thing: "✏️", len: 8 }], options: [7, 8, 9], prompt: "مداد دوم چند سانتی‌متر است؟" },
      { type: "chart", add: true, title: "درازی مدادهای کلاس (سانتی‌متر)", prompt: "ده مداد را اندازه گرفتیم: ۶، ۸، ۷، ۸، ۹، ۸، ۶، ۱۰، ۸، ۹. برای هر مداد یک ✖ بالای عدد درازی‌اش بگذار.", say: "ده مداد را اندازه گرفتیم: شش، هشت، هفت، هشت، نه، هشت، شش، ده، هشت، نه. برای هر مداد یک ضربدر بالای عدد درازی‌اش بگذار.",
        rows: [{ label: "۱۰", pic: "✖️", has: 0, n: 1 }, { label: "۹", pic: "✖️", has: 0, n: 2 }, { label: "۸", pic: "✖️", has: 0, n: 4 }, { label: "۷", pic: "✖️", has: 0, n: 1 }, { label: "۶", pic: "✖️", has: 0, n: 2 }],
        question: "بیشتر مدادها چند سانتی‌متر بودند؟", options: [{ label: "۶", value: "6" }, { label: "۸", value: "8" }, { label: "۱۰", value: "10" }], answer: "8" },
      { type: "chart", title: "درازی مدادهای کلاس (سانتی‌متر)", rows: [{ label: "۱۰", pic: "✖️", n: 1 }, { label: "۹", pic: "✖️", n: 2 }, { label: "۸", pic: "✖️", n: 4 }, { label: "۷", pic: "✖️", n: 1 }, { label: "۶", pic: "✖️", n: 2 }],
        question: "روی هم چند مداد اندازه گرفتیم؟", options: [8, 10, 12], answer: 10 },
      { type: "chart", title: "درازی مدادهای کلاس (سانتی‌متر)", rows: [{ label: "۱۰", pic: "✖️", n: 1 }, { label: "۹", pic: "✖️", n: 2 }, { label: "۸", pic: "✖️", n: 4 }, { label: "۷", pic: "✖️", n: 1 }, { label: "۶", pic: "✖️", n: 2 }],
        question: "بلندترین مداد چند سانتی‌متر از کوتاه‌ترین درازتر است؟", options: [2, 4, 16], answer: 4 }
    ]
  },
  {
    id: "math-sapling-84", subject: "math", level: "sapling", emoji: "🎒", title: "حتمی، ممکن، غیرممکن",
    steps: [
      /* Chance: a bag of four red marbles: taking one out, red is certain and blue impossible; then a blue one goes
         in, and blue becomes possible. */
      (function () {
        var parts = { bg: { art: "day-room" }, bag: { art: "marble-bag", at: [80, 82], s: 1.6 } };
        for (var i = 0; i < 4; i++) parts["r" + i] = { art: "counter-r", at: [44 + i * 10, 40], s: 1.2 };
        parts.b = { art: "counter-b", at: [130, 40], s: 1.2, o: 0 };
        var inn = [];
        for (i = 0; i < 4; i++) inn.push(hop("r" + i, [44 + i * 10, 40], [68 + i * 6, 58 + (i % 2) * 4], 300 + i * 400, 700, 10));
        return { type: "scene", prompt: "ببین و گوش کن", parts: parts,
          scenes: [
            { caption: "چهار تیله قرمز را در کیسه می‌ریزیم.", do: inn },
            { caption: "اگر بی‌نگاه یک تیله برداریم، حتماً قرمز است. آبی؟ غیرممکن است، چون آبی در کیسه نیست.", do: [{ id: "bag", to: { r: 6 }, at: 300, dur: 400, yoyo: true, times: 4 }] },
            { caption: "حالا یک تیله آبی هم می‌ریزیم. حالا آبی آمدن ممکن است، ولی قرمز بیشتر احتمال دارد.", do: [{ id: "b", to: { o: 1 }, dur: 200 }, hop("b", [130, 40], [92, 56], 300, 900, 10)] }
          ],
          question: "حالا کدام بیشتر احتمال دارد؟", pic: true, options: [{ label: "🔴", value: "red" }, { label: "🔵", value: "blue" }], answer: "red" };
      })(),
      { type: "sort", prompt: "حتمی، ممکن یا غیرممکن؟", say: "هر جمله را در سبد خودش بگذار: حتمی، ممکن یا غیرممکن.",
        baskets: [{ label: "حتمی", pic: "✅", value: "c" }, { label: "ممکن", pic: "🤔", value: "p" }, { label: "غیرممکن", pic: "❌", value: "i" }],
        items: [{ label: "فردا آفتاب طلوع می‌کند", say: "فردا آفتاب طلوع می‌کند.", basket: "c" }, { label: "امروز باران می‌بارد", say: "امروز باران می‌بارد.", basket: "p" },
          { label: "گربه پرواز می‌کند", say: "گربه پرواز می‌کند.", basket: "i" }, { label: "تاس ۶ می‌آید", say: "تاس شش می‌آید.", basket: "p" },
          { label: "تاس ۷ می‌آید", say: "تاس هفت می‌آید.", basket: "i" }, { label: "بعد از شنبه یکشنبه است", say: "بعد از شنبه یکشنبه است.", basket: "c" }] },
      { type: "choose", prompt: "در کیسه ۳ تیله سبز و ۱ تیله زرد است. کدام بیشتر احتمال دارد؟", say: "در کیسه سه تیله سبز و یک تیله زرد است. کدام بیشتر احتمال دارد؟", pic: true,
        options: [{ label: "🟢", value: "g" }, { label: "🟡", value: "y" }], answer: "g" },
      { type: "choose", prompt: "یک سکه را می‌اندازیم. «شیر» آمدن…", say: "یک سکه را می‌اندازیم. شیر آمدن حتمی است، ممکن است، یا غیرممکن؟", options: [{ label: "حتمی", value: "c" }, { label: "ممکن", value: "p" }, { label: "غیرممکن", value: "i" }], answer: "p" },
      { type: "choose", prompt: "در یک فرفره نصفش قرمز و نصفش آبی است. کدام بیشتر می‌آید؟", say: "نصف فرفره قرمز و نصفش آبی است. کدام بیشتر می‌آید؟", stack: true,
        options: [{ label: "قرمز", value: "r" }, { label: "آبی", value: "b" }, { label: "شانس‌شان برابر است", value: "eq" }], answer: "eq" }
    ]
  },
  {
    id: "math-sapling-85", subject: "math", level: "sapling", emoji: "🌀", title: "آزمایش شانس",
    steps: [
      { type: "spinner", spinner: [{ label: "قرمز", color: "#e5483f", size: 3 }, { label: "آبی", color: "#3c7fc4", size: 1 }], tries: 12,
        prompt: "فرفره سه قسمت قرمز دارد و یک قسمت آبی. ۱۲ بار بچرخان و هر بار یک خط بکش.", question: "کدام بیشتر آمد؟", answer: "most" },
      { type: "spinner", bag: { "🔴": 2, "🔵": 2 }, tries: 10, prompt: "در کیسه ۲ تیله قرمز و ۲ آبی است. یکی بردار، ببین و برگردان. ۱۰ بار.", question: "کدام کمتر آمد؟", answer: "least" },
      { type: "chart", bars: true, title: "نتیجه پرتاب تاس ۳۰ بار", rows: [{ label: "۱", n: 5 }, { label: "۲", n: 6 }, { label: "۳", n: 4 }, { label: "۴", n: 5 }, { label: "۵", n: 6 }, { label: "۶", n: 4 }],
        question: "هر عدد تاس شانس برابری دارد. آیا تقریباً برابر آمدند؟", options: [{ label: "بله، تقریباً", value: "yes" }, { label: "نه، خیلی فرق دارند", value: "no" }], answer: "yes" },
      { type: "spinner", coin: true, tries: 10, prompt: "یک سکه را ۱۰ بار بینداز. شیر یا خط؟" },
      { type: "choose", prompt: "اگر فرفره‌ای ۳ قسمت قرمز و ۱ قسمت آبی داشته باشد، در ۴۰ بار چرخاندن حدوداً چند بار قرمز می‌آید؟", say: "اگر فرفره سه قسمت قرمز و یک قسمت آبی داشته باشد، در چهل بار حدوداً چند بار قرمز می‌آید؟", options: ["۱۰", "۲۰", "۳۰"], answer: "۳۰" }
    ]
  },
  {
    id: "math-sapling-86", subject: "math", level: "sapling", emoji: "🔟", title: "ضرب ده‌تایی‌ها",
    steps: [
      { type: "tens", n: 120, options: [12, 120, 1200], prompt: "۳ × ۴۰: سه بار چهار دسته ده‌تایی، یعنی ۱۲ دسته ده‌تایی. این چند است؟" },
      { type: "choose", ltr: true, show: "۳ × ۴ = ۱۲  ←  ۳ × ۴۰ = ؟", prompt: "اگر ۳ × ۴ = ۱۲، پس ۳ × ۴۰؟", say: "اگر سه ضرب در چهار دوازده است، سه ضرب در چهل چند است؟", options: ["۱۲", "۱۲۰", "۱۲۰۰"], answer: "۱۲۰" },
      { type: "choose", ltr: true, show: "۵ × ۶۰ = ؟", prompt: "۵ × ۶ = ۳۰. پس ۵ × ۶۰؟", say: "پنج ضرب در شصت.", options: ["۳۰", "۳۰۰", "۳۶۰"], answer: "۳۰۰" },
      { type: "choose", ltr: true, show: "۸ × ۲۰۰ = ؟", prompt: "۸ × ۲ = ۱۶. پس ۸ × ۲۰۰؟", say: "هشت ضرب در دویست.", options: ["۱۶۰", "۱۶۰۰", "۱۶۰۰۰"], answer: "۱۶۰۰" },
      { type: "tens", n: 200, options: [20, 200, 2000], prompt: "۴ × ۵۰ = ۲۰ دسته ده‌تایی. چند است؟" },
      { type: "choose", prompt: "یک دفتر ۹۰ برگ دارد. ۷ دفتر چند برگ دارد؟", say: "یک دفتر نود برگ دارد. هفت دفتر چند برگ دارد؟", options: ["۶۳", "۶۳۰", "۹۷"], answer: "۶۳۰" }
    ]
  },
  {
    id: "math-sapling-87", subject: "math", level: "sapling", emoji: "🔲", title: "ضرب با مستطیل",
    steps: [
      /* The area model: a rectangle 6 by 23 is split into 6 × 20 and 6 × 3; the two parts are added. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          a: { art: "bar-rect", look: { w: 100, color: "#9fd3f0" }, at: [20, 50], sy: 4 }, b: { art: "bar-rect", look: { w: 15, color: "#f6b73c" }, at: [120, 50], sy: 4 },
          t6: { art: "tag:۶", at: [12, 54] }, t20: { art: "tag:۲۰", at: [70, 26] }, t3: { art: "tag:۳", at: [128, 26] },
          p1: { art: "tag:۱۲۰", at: [70, 54], o: 0 }, p2: { art: "tag:۱۸", at: [128, 54], o: 0 }, tot: { art: "tag:۱۳۸", at: [80, 86], o: 0 }
        },
        scenes: [
          { caption: "۶ × ۲۳ را با یک مستطیل حساب می‌کنیم: ۶ ردیف و ۲۳ ستون. ۲۳ را دو تکه می‌کنیم: ۲۰ و ۳.", do: [jump("t20", 300, 2), jump("t3", 900, 2)] },
          { caption: "تکه بزرگ: ۶ × ۲۰ = ۱۲۰.", do: [{ id: "p1", to: { o: 1 }, at: 300, dur: 300 }, pop("p1", 300, 0.2)] },
          { caption: "تکه کوچک: ۶ × ۳ = ۱۸.", do: [{ id: "p2", to: { o: 1 }, at: 300, dur: 300 }, pop("p2", 300, 0.2)] },
          { caption: "دو تکه را جمع می‌کنیم: ۱۲۰ + ۱۸ = ۱۳۸.", do: [{ id: "tot", to: { o: 1 }, at: 300, dur: 300 }, pop("tot", 300, 0.3)] }
        ],
        question: "۴ × ۱۲ را همین‌طور حساب کن: ۴ × ۱۰ و ۴ × ۲. جواب؟", options: [42, 48, 52], answer: 48 },
      { type: "array", ask: "area", rows: 4, cols: [10, 3], prompt: "۴ × ۱۳ را با مستطیل حساب کن: هر تکه را بنویس، بعد جمع کن." },
      { type: "array", ask: "area", rows: 5, cols: [20, 4], prompt: "۵ × ۲۴ را با مستطیل حساب کن." },
      { type: "array", ask: "area", rows: 3, cols: [100, 20, 5], prompt: "۳ × ۱۲۵ را با مستطیل حساب کن: صدها، ده‌ها و یکی‌ها." },
      { type: "array", ask: "area", rows: 7, cols: [30, 6], prompt: "۷ × ۳۶ را حساب کن." }
    ]
  },
  {
    id: "math-sapling-88", subject: "math", level: "sapling", emoji: "✍️", title: "ضرب نوشتنی",
    steps: [
      { type: "array", ask: "area", rows: 3, cols: [20, 4], prompt: "اول با مستطیل: ۳ × ۲۴." },
      { type: "column", op: "×", a: 24, b: 3, prompt: "حالا نوشتنی: از یکان شروع کن. ۳ × ۴ = ۱۲: ۲ را بنویس، ۱ به دهگان می‌رود." },
      { type: "column", op: "×", a: 36, b: 4, prompt: "۳۶ × ۴ را نوشتنی حساب کن." },
      { type: "column", op: "×", a: 125, b: 3, prompt: "۱۲۵ × ۳ را نوشتنی حساب کن." },
      { type: "array", ask: "area", rows: 6, cols: [40, 7], prompt: "با مستطیل بررسی کن: ۶ × ۴۷." },
      { type: "column", op: "×", a: 47, b: 6, prompt: "حالا ۴۷ × ۶ را نوشتنی حساب کن. جوابت با مستطیل یکی است؟" }
    ]
  },
  {
    id: "math-sapling-89", subject: "math", level: "sapling", emoji: "🧺", title: "مسئله‌های ضرب",
    steps: [
      /* A multiplication problem drawn as bars: one crate holds 24 pomegranates; 4 crates are 4 bars of 24. */
      { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0",
        parts: {
          crate: { art: "📦", at: [14, 44], s: 0.8 },
          b0: { art: "bar-rect", look: { w: 30, color: "#f28b82" }, at: [24, 50], o: 0 }, b1: { art: "bar-rect", look: { w: 30, color: "#f28b82" }, at: [54, 50], o: 0 },
          b2: { art: "bar-rect", look: { w: 30, color: "#f28b82" }, at: [84, 50], o: 0 }, b3: { art: "bar-rect", look: { w: 30, color: "#f28b82" }, at: [114, 50], o: 0 },
          t0: { art: "tag:۲۴", at: [39, 64], o: 0 }, t1: { art: "tag:۲۴", at: [69, 64], o: 0 }, t2: { art: "tag:۲۴", at: [99, 64], o: 0 }, t3: { art: "tag:۲۴", at: [129, 64], o: 0 },
          brace: { art: "brace", look: { w: 120 }, at: [24, 38], o: 0 }, tot: { art: "tag:؟", at: [84, 32], o: 0 }, ans: { art: "tag:۹۶", at: [84, 32], o: 0 }
        },
        scenes: [
          { caption: "باغبان سیب‌ها را در جعبه‌ها می‌گذارد. هر جعبه ۲۴ سیب دارد. ۴ جعبه چند سیب است؟", do: [jump("crate", 300, 2)] },
          { caption: "برای هر جعبه یک نوار ۲۴تایی می‌کشیم: چهار نوار هم‌اندازه.", do: [0, 1, 2, 3].map(function (i) { return [{ id: "b" + i, to: { o: 1 }, at: 300 + i * 700, dur: 300 }, { id: "t" + i, to: { o: 1 }, at: 500 + i * 700, dur: 300 }]; }) },
          { caption: "همه را می‌خواهیم: ۴ × ۲۴ = ۹۶ سیب.", do: [{ id: "brace", to: { o: 1 }, dur: 300 }, { id: "brace", draw: true, dur: 900 }, { id: "tot", to: { o: 1 }, at: 900, dur: 300 }, { id: "tot", to: { o: 0 }, at: 1800, dur: 300 }, { id: "ans", to: { o: 1 }, at: 1900, dur: 300 }, pop("ans", 1900, 0.3)] }
        ],
        question: "۴ × ۲۴ چند است؟", options: [86, 96, 28], answer: 96 },
      { type: "bar", prompt: "هر بلیت سینما ۳۵ هزار تومان است. ۳ بلیت چقدر می‌شود؟", bars: [{ label: "۳ بلیت", parts: [35, 35, 35] }], whole: "?", options: [95, 105, 38], answer: 105, result: "۳ × ۳۵ = ۱۰۵" },
      { type: "bar", prompt: "ماهان ۱۵ کارت دارد. برادرش ۴ برابر او کارت دارد. برادرش چند کارت دارد؟", bars: [{ label: "ماهان", parts: [15] }, { label: "برادر", parts: [15, 15, 15, 15] }], braces: [{ bar: 1, text: "؟" }], options: [19, 45, 60], answer: 60, result: "۴ × ۱۵ = ۶۰" },
      { type: "bar", prompt: "یک کتاب ۱۲۸ صفحه دارد. ۲ نسخه از آن روی هم چند صفحه است؟", bars: [{ label: "", parts: [128, 128] }], whole: "?", options: [130, 246, 256], answer: 256, result: "۲ × ۱۲۸ = ۲۵۶" },
      { type: "choose", prompt: "یک اتوبوس ۴۵ صندلی دارد. ۶ اتوبوس برای اردو. روی هم چند صندلی؟", say: "یک اتوبوس چهل و پنج صندلی دارد. شش اتوبوس روی هم چند صندلی دارند؟", options: ["۲۴۰", "۲۷۰", "۵۱"], answer: "۲۷۰" }
    ]
  },
  {
    id: "math-sapling-90", subject: "math", level: "sapling", emoji: "✏️", title: "بکش، جدول بساز",
    steps: [
      /* Make a table: each bicycle has 2 wheels; the table grows row by row: 1 → 2, 2 → 4, 3 → 6, 4 → 8. */
      (function () {
        var parts = {};
        for (var r = 0; r < 4; r++) {
          parts["k" + r] = { art: "tag:" + "۱۲۳۴"[r], at: [70, 36 + r * 15], s: 1.4, o: 0 };
          parts["w" + r] = { art: "tag:" + "۲۴۶۸"[r], at: [120, 36 + r * 15], s: 1.4, o: 0 };
          parts["t" + r] = { art: "🚲", at: [22, 36 + r * 15], s: 0.6, o: 0 };
        }
        parts.h1 = { art: "🚲", at: [70, 16], s: 0.8 }; parts.h2 = { art: "🛞", at: [120, 16], s: 0.8 };
        var scenes = [{ caption: "هر دوچرخه دو چرخ دارد. چهار دوچرخه چند چرخ دارند؟ یک جدول می‌سازیم: یک ستون دوچرخه‌ها، یک ستون چرخ‌ها.", do: [jump("h1", 300, 2), jump("h2", 900, 2)] }];
        ["یک دوچرخه، دو چرخ.", "دو دوچرخه، چهار چرخ.", "سه دوچرخه، شش چرخ.", "چهار دوچرخه، هشت چرخ. جدول نشان می‌دهد هر بار دو تا اضافه می‌شود."].forEach(function (c, r) {
          scenes.push({ caption: c, do: [{ id: "t" + r, to: { o: 1 }, dur: 300 }, { id: "k" + r, to: { o: 1 }, at: 300, dur: 300 }, { id: "w" + r, to: { o: 1 }, at: 800, dur: 300 }] });
        });
        return { type: "scene", prompt: "ببین و گوش کن", bg: "#fffaf0", parts: parts, scenes: scenes,
          question: "پنج دوچرخه چند چرخ دارند؟", options: [9, 10, 12], answer: 10 };
      })(),
      { type: "choose", prompt: "یک شکل بکش: ۳ ردیف درخت، هر ردیف ۵ درخت. چند درخت؟", say: "در ذهنت یا روی کاغذ بکش: سه ردیف درخت، هر ردیف پنج درخت. چند درخت؟", options: ["۸", "۱۵", "۳۵"], answer: "۱۵" },
      { type: "choose", prompt: "جدول را ادامه بده: هر روز ۴ صفحه کتاب می‌خوانم. روز ۱: ۴، روز ۲: ۸، روز ۳: ۱۲. روز ۵؟", say: "هر روز چهار صفحه می‌خوانم. روز اول چهار، روز دوم هشت، روز سوم دوازده. روز پنجم چند صفحه خوانده‌ام؟", options: ["۱۶", "۲۰", "۲۴"], answer: "۲۰" },
      { type: "choose", prompt: "با کشیدن شکل حل کن: یک قورباغه در چاه ۱۰ متری است. هر روز ۳ متر بالا می‌رود. بعد از چند روز به لبه چاه می‌رسد؟", say: "یک قورباغه در چاه ده متری است. هر روز سه متر بالا می‌رود. چند روز طول می‌کشد تا به لبه برسد؟ شکل بکش: سه، شش، نه، دوازده.", options: ["۳", "۴", "۱۰"], answer: "۴" },
      { type: "paper", text: "این مسئله را با جدول حل کن: «هر مرغ ۲ پا دارد. ۷ مرغ چند پا دارند؟» یک جدول دو ستونه بکش: مرغ‌ها و پاها.",
        example: "مرغ: ۱ ۲ ۳ … ۷\nپا: ۲ ۴ ۶ … ؟", lang: "fa", check: ["جدول دو ستون دارد؟", "هر ردیف ۲ تا بیشتر شده؟", "جواب ۱۴ است؟"] }
    ]
  },
  {
    id: "math-sapling-91", subject: "math", level: "sapling", emoji: "🎯", title: "حدس بزن و آزمایش کن",
    steps: [
      { type: "choose", prompt: "دو عدد که جمعشان ۱۲ و تفاضلشان ۲ است. حدس بزن و امتحان کن.", say: "دو عدد که جمعشان دوازده است و یکی دو تا بیشتر از دیگری است. کدام‌اند؟", stack: true, ltr: true,
        options: ["۶ و ۶", "۷ و ۵", "۸ و ۴"], answer: "۷ و ۵" },
      { type: "choose", prompt: "در حیاط مرغ و گوسفند هست. ۵ سر و ۱۴ پا. چند گوسفند؟ (حدس بزن: ۲ گوسفند = ۸ پا، ۳ مرغ = ۶ پا)", say: "در حیاط مرغ و گوسفند هست. روی هم پنج سر و چهارده پا. چند گوسفند هست؟ حدس بزن و پاها را بشمار.", options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", prompt: "کدام عدد را اگر در ۳ ضرب کنیم و ۴ تا اضافه کنیم، ۲۵ می‌شود؟", say: "یک عدد را در سه ضرب کردیم و چهار اضافه کردیم، شد بیست و پنج. آن عدد چه بود؟ حدس بزن و امتحان کن.", options: ["۶", "۷", "۸"], answer: "۷" },
      { type: "choose", prompt: "با ۳۰ هزار تومان، کدام دو چیز را می‌شود خرید و ۵ هزار تومان باقی بماند؟ (کتاب ۱۵، دفتر ۱۰، مداد ۵، کیف ۲۰)", say: "سی هزار تومان داری. کدام دو چیز را بخری که پنج هزار تومان بماند؟", stack: true,
        options: [{ label: "کتاب و دفتر", value: "bn" }, { label: "کیف و دفتر", value: "bagn" }, { label: "کتاب و مداد", value: "bp" }], answer: "bn" },
      { type: "choose", prompt: "یک عدد دو رقمی: جمع رقم‌هایش ۹ است و رقم دهگانش ۳ تا بیشتر از یکان. کدام است؟", say: "یک عدد دو رقمی. جمع رقم‌هایش نه است و دهگانش سه تا بیشتر از یکانش است. کدام است؟", ltr: true, options: ["۶۳", "۳۶", "۵۴"], answer: "۶۳" },
      { type: "paper", text: "حدس بزن و امتحان کن: «سه عدد پشت سر هم که جمعشان ۲۱ است.» حدس‌هایت را بنویس، امتحان کن و درستش را پیدا کن.",
        example: "حدس: ۵، ۶، ۷ → ۱۸ (کم است)\nحدس: ۶، ۷، ۸ → ۲۱ ✓", lang: "fa", check: ["حدس‌ها را نوشته؟", "هر حدس را امتحان کرده؟", "جواب ۶، ۷، ۸ را پیدا کرده؟"] }
    ]
  },
  {
    id: "math-sapling-92", subject: "math", level: "sapling", emoji: "🔍", title: "الگو پیدا کن",
    steps: [
      { type: "choose", prompt: "در یک دست‌دادن، اگر ۲ نفر باشند ۱ دست‌دادن، ۳ نفر ۳، ۴ نفر ۶. الگو را پیدا کن. ۵ نفر؟", say: "دو نفر یک دست‌دادن، سه نفر سه تا، چهار نفر شش تا. هر بار یکی بیشتر اضافه می‌شود. پنج نفر چند دست‌دادن؟", options: ["۸", "۹", "۱۰"], answer: "۱۰" },
      { type: "pattern", prompt: "الگو را پیدا کن و پر کن: ۱، ۲، ۴، ۸، …", say: "یک، دو، چهار، هشت، … هر بار دو برابر.", ltr: true, seq: [1, 2, 4, 8, 16, 32], blanks: [4, 5], options: [12, 16, 24, 32] },
      { type: "choose", prompt: "روی پله‌ها: پله اول ۱ گلدان، پله دوم ۳، پله سوم ۵. پله ششم؟", say: "پله اول یک گلدان، دوم سه، سوم پنج. پله ششم چند گلدان دارد؟", options: ["۹", "۱۱", "۱۲"], answer: "۱۱" },
      { type: "pattern", prompt: "الگوی شکل: پر کن", say: "دایره، مربع، مربع، دایره، مربع، مربع، … پر کن.", seq: [{ shape: "circle" }, { shape: "square" }, { shape: "square" }, { shape: "circle" }, { shape: "square" }, { shape: "square" }, { shape: "circle" }], blanks: [5, 6], options: [{ shape: "circle" }, { shape: "square" }] },
      { type: "choose", prompt: "در الگوی «قرمز، آبی، آبی» شکل بیستم چه رنگی است؟ (هر ۳ تا تکرار می‌شود)", say: "قرمز، آبی، آبی، قرمز، آبی، آبی… بیستمی چه رنگی است؟", pic: true, options: [{ label: "🔴", value: "r" }, { label: "🔵", value: "b" }], answer: "b" },
      { type: "pattern", prompt: "۱۰۰، ۹۵، ۹۰، … پر کن", say: "صد، نود و پنج، نود، … پر کن.", ltr: true, seq: [100, 95, 90, 85, 80, 75], blanks: [3, 5], options: [80, 85, 75, 70] }
    ]
  },
  {
    id: "math-sapling-93", subject: "math", level: "sapling", emoji: "⏱️", title: "چقدر طول کشید؟",
    steps: [
      { type: "clock", ask: "show", start: "3:00", time: "3:40", snap: 5, prompt: "کلاس نقاشی ساعت ۳ شروع شد و ساعت ۳ و ۴۰ دقیقه تمام شد. ببین عقربه بلند چقدر رفت: ۴۰ دقیقه.", say: "کلاس نقاشی ساعت سه شروع شد و ساعت سه و چهل دقیقه تمام شد. چهل دقیقه طول کشید." },
      { type: "choose", prompt: "فیلم ساعت ۵ شروع شد و ساعت ۷ تمام شد. چند ساعت طول کشید؟", say: "فیلم ساعت پنج شروع شد و ساعت هفت تمام شد. چند ساعت طول کشید؟", options: ["۲", "۵", "۱۲"], answer: "۲" },
      { type: "clock", ask: "show", start: "8:15", time: "9:00", snap: 5, prompt: "از ۸ و ربع تا ساعت ۹: عقربه بلند از ۳ تا ۱۲ می‌رود.", say: "از هشت و ربع تا ساعت نه. چهل و پنج دقیقه." },
      { type: "choose", prompt: "از ۸ و ربع تا ۹ چند دقیقه است؟", say: "از هشت و ربع تا ساعت نه چند دقیقه است؟", options: ["۱۵", "۴۵", "۷۵"], answer: "۴۵" },
      { type: "clock", time: "4:30", start: "4:00", snap: 5, prompt: "شیر را ساعت ۴ روی گاز گذاشتیم. نیم ساعت بعد آماده است. عقربه‌ها را روی آن ساعت بگذار." },
      { type: "choose", prompt: "یک ساعت چند دقیقه است؟", say: "یک ساعت چند دقیقه است؟", options: ["۳۰", "۶۰", "۱۰۰"], answer: "۶۰" },
      { type: "choose", prompt: "از ساعت ۱۰ و ۵۰ دقیقه تا ۱۱ و ۱۰ دقیقه چقدر است؟", say: "از ساعت ده و پنجاه دقیقه تا یازده و ده دقیقه چند دقیقه است؟", options: ["۲۰", "۴۰", "۶۰"], answer: "۲۰" }
    ]
  },
  {
    id: "math-sapling-94", subject: "math", level: "sapling", emoji: "📏", title: "میلی‌متر و کیلومتر",
    steps: [
      { type: "choose", prompt: "یک سانتی‌متر چند میلی‌متر است؟", say: "یک سانتی‌متر چند میلی‌متر است؟ روی خط‌کش، خط‌های کوچک بین دو عدد را بشمار.", options: ["۵", "۱۰", "۱۰۰"], answer: "۱۰" },
      { type: "measure", ask: "count", unit: "▫️", bars: [{ thing: "🐜", len: 6 }], options: [5, 6, 7], prompt: "هر خانه یک میلی‌متر است. مورچه چند میلی‌متر است؟" },
      { type: "choose", prompt: "یک کیلومتر چند متر است؟", say: "یک کیلومتر چند متر است؟", options: ["۱۰۰", "۱۰۰۰", "۱۰۰۰۰"], answer: "۱۰۰۰" },
      { type: "choose", prompt: "کدام را با کیلومتر اندازه می‌گیریم؟", say: "کدام را با کیلومتر اندازه می‌گیریم؟ درازی مداد، قد بچه، یا راه تهران تا قم؟", stack: true,
        options: [{ label: "درازی مداد", value: "p" }, { label: "قد بچه", value: "h" }, { label: "راه تهران تا قم", value: "r" }], answer: "r" },
      { type: "choose", prompt: "کلفتی یک سکه حدوداً چقدر است؟", say: "کلفتی یک سکه حدوداً چقدر است؟", stack: true,
        options: [{ label: "۲ میلی‌متر", value: "2mm" }, { label: "۲ سانتی‌متر", value: "2cm" }, { label: "۲ متر", value: "2m" }], answer: "2mm" },
      { type: "measure", ask: "longer", bars: [{ thing: "🚶", len: 3 }, { thing: "🚲", len: 8 }], prompt: "سارا ۳ کیلومتر پیاده رفت و آرش ۸ کیلومتر دوچرخه سواری کرد. کدام راه درازتر بود؟" },
      { type: "choose", prompt: "۴ سانتی‌متر چند میلی‌متر است؟", say: "چهار سانتی‌متر چند میلی‌متر است؟", options: ["۱۴", "۴۰", "۴۰۰"], answer: "۴۰" }
    ]
  },
  {
    id: "math-sapling-95", subject: "math", level: "sapling", emoji: "🎲", title: "بازی اندازه‌گیری",
    steps: [
      { type: "pairs", prompt: "هر واحد را با چیزی جفت کن که با آن اندازه می‌گیریم", say: "هر واحد را با چیزی جفت کن که با آن اندازه می‌گیریم.",
        pairs: [[{ label: "کیلوگرم", say: "کیلوگرم" }, "🍉"], [{ label: "لیتر", say: "لیتر" }, "🥛"], [{ label: "متر", say: "متر" }, "🏠"], [{ label: "دقیقه", say: "دقیقه" }, "⏱️"]] },
      { type: "sort", prompt: "درازی، وزن یا گنجایش؟", say: "هر واحد را در سبد خودش بگذار.",
        baskets: [{ label: "درازی", pic: "📏", value: "l" }, { label: "وزن", pic: "⚖️", value: "m" }, { label: "گنجایش", pic: "🥛", value: "c" }],
        items: [{ label: "سانتی‌متر", basket: "l" }, { label: "گرم", basket: "m" }, { label: "لیتر", basket: "c" }, { label: "کیلومتر", basket: "l" }, { label: "کیلوگرم", basket: "m" }, { label: "میلی‌لیتر", basket: "c" }] },
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "این طول‌ها را از کوچک به بزرگ بچین.", ltr: true,
        items: [{ label: "۱ میلی‌متر" }, { label: "۱ سانتی‌متر" }, { label: "۱ متر" }, { label: "۱ کیلومتر" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. اندازه‌های برابر را جفت کن.", pairs: [[{ label: "۱ متر" }, { label: "۱۰۰ سانتی‌متر" }], [{ label: "۱ کیلوگرم" }, { label: "۱۰۰۰ گرم" }], [{ label: "۱ ساعت" }, { label: "۶۰ دقیقه" }]] },
      { type: "sort", prompt: "محیط یا مساحت؟", say: "هر کار را در سبد محیط یا مساحت بگذار.",
        baskets: [{ label: "محیط", pic: "🔲", value: "p" }, { label: "مساحت", pic: "🟩", value: "a" }],
        items: [{ label: "نرده دور باغچه", basket: "p" }, { label: "فرش کف اتاق", basket: "a" }, { label: "روبان دور قاب", basket: "p" }, { label: "کاشی کف حمام", basket: "a" }] },
      { type: "order", prompt: "از کوتاه به طولانی بچین", say: "این زمان‌ها را از کوتاه به طولانی بچین.", ltr: true, items: [{ label: "۱ ثانیه" }, { label: "۱ دقیقه" }, { label: "۱ ساعت" }, { label: "۱ روز" }] }
    ]
  },
  {
    id: "math-sapling-96", subject: "math", level: "sapling", emoji: "🔷", title: "بازی شکل‌ها و الگوها",
    steps: [
      { type: "sort", prompt: "چندضلعی‌ها را بر اساس ضلع دسته کن", say: "هر شکل را در سبد تعداد ضلع‌هایش بگذار.",
        baskets: [{ label: "۴ ضلع", shape: "square", value: "4" }, { label: "۵ ضلع", shape: "pentagon", value: "5" }, { label: "۶ ضلع", shape: "hexagon", value: "6" }],
        items: [{ shape: "rhombus", basket: "4" }, { shape: "pentagon", basket: "5" }, { shape: "trapezoid", basket: "4" }, { shape: "hexagon", basket: "6" }, { shape: "parallelogram", basket: "4" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر شکل را با اسمش جفت کن.",
        pairs: [[{ shape: "rhombus" }, { label: "لوزی" }], [{ shape: "trapezoid" }, { label: "ذوزنقه" }], [{ shape: "hexagon" }, { label: "شش‌ضلعی" }]] },
      { type: "pattern", prompt: "قانون الگو را پیدا کن و پر کن", say: "هر بار چهار تا بیشتر. پر کن.", ltr: true, seq: [3, 7, 11, 15, 19, 23], blanks: [3, 5], options: [15, 16, 22, 23] },
      { type: "sort", prompt: "گوشه راست دارد یا ندارد؟", say: "شکل‌هایی که گوشه راست دارند در یک سبد، بقیه در سبد دیگر.",
        baskets: [{ label: "گوشه راست دارد", shape: "rectangle", value: "yes" }, { label: "ندارد", shape: "rhombus", value: "no" }],
        items: [{ shape: "square-tilt", basket: "yes" }, { shape: "hexagon", basket: "no" }, { shape: "rectangle-tall", basket: "yes" }, { shape: "triangle", basket: "no" }] },
      { type: "pattern", prompt: "الگوی شکل‌ها: پر کن", say: "شش‌ضلعی، مثلث، شش‌ضلعی، مثلث… پر کن.", seq: [{ shape: "hexagon" }, { shape: "triangle" }, { shape: "hexagon" }, { shape: "triangle" }, { shape: "hexagon" }, { shape: "triangle" }], blanks: [4, 5], options: [{ shape: "hexagon" }, { shape: "triangle" }] }
    ]
  },
  {
    id: "math-sapling-97", subject: "math", level: "sapling", emoji: "🧩", title: "بازی مسئله‌ها",
    steps: [
      { type: "pairs", prompt: "هر مسئله را با جمله‌اش جفت کن", say: "روی هر مسئله بزن تا آن را بشنوی. هر مسئله را با جمله‌اش جفت کن.",
        pairs: [[{ label: "۴ جعبه، هر جعبه ۶ مداد", say: "چهار جعبه، هر جعبه شش مداد. روی هم چندتا؟" }, "۴ × ۶"], [{ label: "۲۴ مداد بین ۴ نفر", say: "بیست و چهار مداد بین چهار نفر. به هر نفر چندتا؟" }, "۲۴ ÷ ۴"],
          [{ label: "۲۴ مداد، ۴ تا گم شد", say: "بیست و چهار مداد بود، چهار تا گم شد. چندتا ماند؟" }, "۲۴ − ۴"], [{ label: "۲۴ مداد و ۴ مداد دیگر", say: "بیست و چهار مداد بود و چهار تا دیگر خریدیم." }, "۲۴ + ۴"]] },
      { type: "sort", prompt: "این مسئله با کدام کار حل می‌شود؟", say: "هر مسئله را در سبد کاری بگذار که با آن حل می‌شود.",
        baskets: [{ label: "جمع", pic: "➕", value: "+" }, { label: "تفریق", pic: "➖", value: "-" }, { label: "ضرب", pic: "✖️", value: "x" }, { label: "تقسیم", pic: "➗", value: "/" }],
        items: [{ label: "چندتا بیشتر؟", say: "علی چندتا بیشتر از سارا دارد؟", basket: "-" }, { label: "روی هم چندتا؟", say: "سیب‌ها و گلابی‌ها روی هم چندتاست؟", basket: "+" },
          { label: "۵ برابر", say: "مینا پنج برابر نیما کارت دارد.", basket: "x" }, { label: "به هر نفر چندتا؟", say: "سی گردو بین شش نفر. به هر نفر چندتا؟", basket: "/" }] },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر مسئله را با جوابش جفت کن.",
        pairs: [[{ label: "۳ کیسه، هر کیسه ۸ سیب", say: "سه کیسه، هر کیسه هشت سیب." }, 24], [{ label: "۴۰ ÷ ۵", say: "چهل تقسیم بر پنج" }, 8], [{ label: "۶۰ − ۲۵", say: "شصت منهای بیست و پنج" }, 35]] },
      { type: "sort", prompt: "یک مرحله‌ای یا دو مرحله‌ای؟", say: "مسئله‌هایی که با یک حساب حل می‌شوند در یک سبد، و آن‌هایی که دو حساب لازم دارند در سبد دیگر.",
        baskets: [{ label: "یک مرحله", pic: "1️⃣", value: "1" }, { label: "دو مرحله", pic: "2️⃣", value: "2" }],
        items: [{ label: "۱۵ سیب و ۸ گلابی: روی هم؟", basket: "1" }, { label: "۵۰ تومان، ۱۲ و ۱۸ خرج: چقدر ماند؟", basket: "2" }, { label: "۳ دسته ۷تایی: چندتا؟", basket: "1" }, { label: "۲۰ نفر، ۵ پیاده، ۸ سوار: چند نفر؟", basket: "2" }] }
    ]
  },
  {
    id: "math-sapling-98", subject: "math", level: "sapling", emoji: "🎉", title: "جشن نهال",
    steps: [
      { type: "order", prompt: "از کوچک به بزرگ بچین", say: "این عددها را از کوچک به بزرگ بچین.", ltr: true, items: [987, 1203, 2310, 3021, 9870] },
      { type: "pairs", prompt: "هر حساب را با جوابش جفت کن", say: "هر حساب را با جوابش جفت کن.", pairs: [["۴۵۶ + ۲۷۸", 734], ["۹۰۰ − ۳۶۵", 535], ["۷ × ۸", 56], ["۶۳ ÷ ۷", 9]] },
      { type: "choose", prompt: "کدام کسر بزرگ‌تر است؟", say: "سه‌چهارم یا یک‌دوم؟ کدام بزرگ‌تر است؟", options: [{ label: "سه‌چهارم", value: "3/4" }, { label: "یک‌دوم", value: "1/2" }], answer: "3/4" },
      { type: "choose", prompt: "مستطیلی ۵ در ۴: مساحتش؟", say: "مستطیلی پنج در چهار. مساحتش چند مربع است؟", options: ["۹", "۱۸", "۲۰"], answer: "۲۰" },
      { type: "choose", prompt: "مستطیل ۵ در ۴: محیطش؟", say: "همان مستطیل پنج در چهار. محیطش چند است؟", options: ["۹", "۱۸", "۲۰"], answer: "۱۸" },
      { type: "choose", prompt: "برای جشن ۶ میز گذاشتیم. دور هر میز ۸ صندلی است. چند نفر می‌توانند بنشینند؟", say: "برای جشن شش میز گذاشتیم. دور هر میز هشت صندلی است. چند نفر می‌توانند بنشینند؟", options: ["۱۴", "۴۲", "۴۸"], answer: "۴۸" },
      { type: "pairs", hidden: true, say: "کارت‌ها را دوتا دوتا برگردان. هر عدد گرد شده را با عددش جفت کن.", pairs: [[{ label: "۴۷۰" }, { label: "۴۶۸ (به نزدیک‌ترین ده)" }], [{ label: "۳۰۰۰" }, { label: "۲۹۵۰ (به نزدیک‌ترین هزار)" }], [{ label: "۶۰۰" }, { label: "۶۲۳ (به نزدیک‌ترین صد)" }]] }
    ]
  }
);

  // Tracks can be given in little lists (fly, pop): each beat gets one flat list.
  B.LESSONS.forEach(function (l) {
    if (l.subject === "math") l.steps.forEach(function (st) {
      if (st.type === "scene") st.scenes.forEach(function (sc) { if (sc.do) sc.do = all(sc.do); });
    });
  });
})();
