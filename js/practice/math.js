/* باغچه — practice generators for ریاضی (subject math). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/math.js. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  /* ---------- shared helpers ---------- */

  var L = function (n) { return "math-" + n; };

  // Persian digits for numbers written into prompts and choose options (English shows them as 0–9 by itself).
  function fa(n) { return String(n).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }

  /* Up to n items: the keys missed last time first (build(key) gives null when a key does not fit this child any
     more), then fresh keys from pick(), never the same key twice. build(key) makes the step; it may use rng. */
  function run(n, ctx, pick, build) {
    var out = [], seen = {};
    function add(k) {
      if (k == null || out.length >= n || seen[k]) return;
      var s = build(String(k));
      if (!s) return;
      seen[k] = true;
      s.key = String(k);
      out.push(s);
    }
    ctx.again.forEach(add);
    for (var t = 0; out.length < n && t < n * 25; t++) add(pick());
    return out;
  }

  // Three number options: the answer and two near it (by d), all from lo to hi. Numbers, for steps that write them.
  function near(rng, x, d, lo, hi) {
    d = d || 1;
    var c = rng.shuffle([x - d, x + d]).concat(rng.shuffle([x - 2 * d, x + 2 * d]))
      .filter(function (v) { return v >= (lo == null ? 0 : lo) && (hi == null || v <= hi); });
    return rng.shuffle([x].concat(c.slice(0, 2)));
  }
  // The same as Persian-digit strings, for choose steps (the answer is fa(x)).
  function nearFa(rng, x, d, lo, hi) { return near(rng, x, d, lo, hi).map(fa); }
  // Three options from a list of wrong answers (distinct, not the answer, not below 0); optsFa as Persian-digit strings.
  function optsNum(rng, x, wrong) {
    var list = [x];
    rng.shuffle(wrong).forEach(function (w) { if (list.length < 3 && w >= 0 && list.indexOf(w) === -1) list.push(w); });
    return rng.shuffle(list);
  }
  function optsFa(rng, x, wrong) { return optsNum(rng, x, wrong).map(fa); }
  // A choose step with a number answer; `show` is a math expression (drawn left to right) when given.
  function ask(prompt, x, options, show) {
    var s = { type: "choose", prompt: prompt, say: prompt, options: options, answer: fa(x) };
    if (show) { s.show = show; s.ltr = true; }
    return s;
  }
  // A choose step with a picture (emoji) shown big above the question.
  function askPic(prompt, x, options, pic) {
    var s = ask(prompt, x, options);
    s.show = pic;
    return s;
  }
  function range(lo, hi) { var a = []; for (var i = lo; i <= hi; i++) a.push(i); return a; }
  function times(s, k) { var o = ""; for (var i = 0; i < k; i++) o += s; return o; }

  /* ================= Seed ================= */

  /* «بشمار، چندتا؟» — math-seed-p1 (Count it). Groups of things to tap and count, then «چندتا؟» with the last number.
     Up to 5 after math-seed-1, up to 10 after math-seed-2; in a circle and scattered after math-seed-12; scattered
     things move aside as they are counted after math-seed-14. The key is the number: a missed number comes back. */
  var THINGS = ["🍎", "🐟", "🐥", "🌸", "⚽", "🍊", "🐞", "🥕", "🧸", "🍐"];

  B.PRACTICE.push({
    id: "math-seed-p1", subject: "math", level: "seed", objectives: ["math.seed.2", "math.seed.4"],
    needs: ["math-seed-1"], emoji: "🍎", title: "بشمار، چندتا؟",
    lessons: ["math-seed-1", "math-seed-11", "math-seed-12", "math-seed-13", "math-seed-2", "math-seed-3",
      "math-seed-14", "math-seed-5", "math-seed-9", "math-seed-10", "math-seed-42", "math-seed-43", "math-seed-47",
      "math-seed-50"],
    words: {
      ask: "پس چند {name} هست؟",
      names: { "🍎": "سیب", "🐟": "ماهی", "🐥": "جوجه", "🌸": "گل", "⚽": "توپ", "🍊": "پرتقال", "🐞": "کفشدوزک", "🥕": "هویج", "🧸": "عروسک", "🍐": "گلابی" },
      circle: "این‌ها دور هم هستند. از یکی شروع کن، روی هر کدام بزن و بشمار.",
      scatter: "این‌ها پخش شده‌اند. روی هر کدام بزن و بشمار؛ هر کدام را که شمردی کنار می‌رود."
    },
    make: function (rng, n, ctx) {
      var max = ctx.done("math-seed-2") ? 10 : 5;
      var layouts = ["line"];
      if (ctx.done("math-seed-12")) layouts.push("circle", "scatter");
      var names = ctx.w("names");
      // Numbers missed last time first, then new ones (never the same number twice in a row).
      var nums = ctx.again.map(Number).filter(function (k) { return k >= 1 && k <= max; });
      while (nums.length < n) {
        var k = rng.int(2, max);
        if (k !== nums[nums.length - 1]) nums.push(k);
      }
      var things = rng.shuffle(THINGS);
      return nums.slice(0, n).map(function (k, i) {
        var thing = things[i % things.length], layout = rng.pick(layouts);
        var options = rng.shuffle([k, k + 1, k > 1 ? k - 1 : k + 2]);
        var step = { type: "count", key: String(k), thing: thing, n: k, layout: layout, options: options, ask: ctx.w("ask", { name: names[thing] }) };
        if (layout === "circle") step.prompt = ctx.w("circle");
        if (layout === "scatter" && ctx.done("math-seed-14")) { step.move = true; step.prompt = ctx.w("scatter"); }
        return step;
      });
    }
  });

  /* «یک نگاه، چندتا؟» — math-seed-p2 (Quick look). Dots, a die, things and (after math-seed-13) fingers flashed for a
     moment, 1–5; after math-seed-28 also five-and-more: a ten-frame and two hands to 10, a die to 6. Before the
     numerals (math-seed-9) the answers show their dots too. Key: the picture and the number, "dice4". */
  B.PRACTICE.push({
    id: "math-seed-p2", subject: "math", level: "seed", objectives: ["math.seed.3"],
    needs: ["math-seed-11"], emoji: "🎲", title: "یک نگاه، چندتا؟",
    lessons: ["math-seed-11", "math-seed-13", "math-seed-14", "math-seed-20", "math-seed-28", "math-seed-43",
      "math-seed-48"],
    words: {
      dice: "این یک تاس است. خوب نگاه کن! فقط یک لحظه پیدا می‌شود.",
      fingers: "این دست‌ها چند انگشت بالا برده‌اند؟ خوب نگاه کن!",
      askFingers: "چند انگشت دیدی؟",
      frame: "قاب ده‌تایی فقط یک لحظه پیدا می‌شود. نشمار، نگاه کن!",
      askFrame: "چندتا مهره دیدی؟",
      thing: "فقط یک لحظه پیدا می‌شوند. نشمار، فقط نگاه کن!",
      askThing: "چند {name} دیدی؟",
      names: { "🐥": "جوجه", "🐞": "کفشدوزک", "⭐": "ستاره", "🍓": "توت‌فرنگی", "🦋": "پروانه", "🍪": "شیرینی" }
    },
    make: function (rng, n, ctx) {
      var five = ctx.done(L("seed-28"));
      var kinds = { dots: [1, 5], dice: [1, five ? 6 : 5], thing: [1, 5] };
      if (ctx.done(L("seed-13"))) kinds.fingers = [1, five ? 10 : 5];
      if (five) kinds.frame = [5, 10];
      var names = ctx.w("names"), list = Object.keys(kinds);
      return run(n, ctx, function () {
        var k = rng.pick(list);
        return k + rng.int(kinds[k][0], kinds[k][1]);
      }, function (key) {
        var m = /^([a-z]+)(\d+)$/.exec(key), r = m && kinds[m[1]], x = m && +m[2];
        if (!r || x < r[0] || x > r[1]) return null;
        var s = { type: "count", flash: true, show: m[1], n: x, options: near(rng, x, 1, 1, r[1]) };
        if (!ctx.done(L("seed-9"))) s.optDots = true;
        if (m[1] === "dice") s.prompt = ctx.w("dice");
        if (m[1] === "fingers") { s.prompt = ctx.w("fingers"); s.ask = ctx.w("askFingers"); }
        if (m[1] === "frame") { s.prompt = ctx.w("frame"); s.ask = ctx.w("askFrame"); }
        if (m[1] === "thing") {
          var t = rng.pick(["🐥", "🐞", "⭐", "🍓", "🦋", "🍪"]); // listed here, so both languages pick the same
          s.show = t; s.prompt = ctx.w("thing"); s.ask = ctx.w("askThing", { name: names[t] });
        }
        return s;
      });
    }
  });

  /* «عدد و تعداد» — math-seed-p3 (Numeral match). Numerals to pair with dots or fingers; a numeral and the group that
     has that many; a numeral on the sign and that many to feed; after math-seed-28 the memory game with the cards
     face down and numbers to 10; after math-seed-29 zero, an empty nest or plate. Keys: "p:1-3-4", "m:2-6-9", "f4",
     "g3", "z1". */
  var FEED = [["🐰", "🥕"], ["🐈", "🐟"], ["🐔", "🌽"], ["🐿️", "🌰"], ["🐒", "🍌"], ["🐦", "🍒"]];
  var EMPTY = [["🪹", "🥚"], ["🍽️", "🍪"], ["🧺", "🍎"]];
  B.PRACTICE.push({
    id: "math-seed-p3", subject: "math", level: "seed", objectives: ["math.seed.6"],
    needs: ["math-seed-9"], emoji: "🔢", title: "عدد و تعداد",
    lessons: ["math-seed-9", "math-seed-10", "math-seed-28", "math-seed-29", "math-seed-30", "math-seed-31",
      "math-seed-32", "math-seed-33", "math-seed-48"],
    words: {
      pairs: "هر عدد را با همان‌قدر جفت کن",
      memory: "کارت‌ها را دوتا دوتا برگردان. هر عدد را با همان‌قدر جفت کن.",
      feed: "عدد را ببین. همان‌قدر {food} به {animal} بده.",
      group: "کدام دسته به اندازه این عدد است؟",
      zero: "در {place} چندتا {thing} هست؟",
      animals: { "🐰": "خرگوش", "🐈": "گربه", "🐔": "مرغ", "🐿️": "سنجاب", "🐒": "میمون", "🐦": "گنجشک" },
      foods: { "🥕": "هویج", "🐟": "ماهی", "🌽": "ذرت", "🌰": "فندق", "🍌": "موز", "🍒": "گیلاس" },
      places: { "🪹": "لانه", "🍽️": "بشقاب", "🧺": "سبد" },
      things: { "🥚": "تخم", "🍪": "شیرینی", "🍎": "سیب" }
    },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("seed-28")) ? 10 : 5;
      var kinds = ["p", "f", "g"];
      if (ctx.done(L("seed-28"))) kinds.push("m");
      if (ctx.done(L("seed-29"))) kinds.push("z");
      function nums(k) { return rng.sample(range(1, max), k).sort(function (a, b) { return a - b; }).join("-"); }
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "p" || k === "m") return k + ":" + nums(k === "m" ? 3 : 4);
        if (k === "z") return "z" + rng.int(1, EMPTY.length);
        return k + rng.int(1, max);
      }, function (key) {
        var k = key[0];
        if (kinds.indexOf(k) === -1) return null;
        if (k === "p" || k === "m") {
          var list = key.slice(2).split("-").map(Number);
          if (list.some(function (x) { return !(x >= 1 && x <= max); })) return null;
          var face = rng.pick(["dots", "fingers"]);
          var pairs = rng.shuffle(list).map(function (x) { var o = {}; o[face] = x; return [x, o]; });
          return k === "m" ? { type: "pairs", hidden: true, say: ctx.w("memory"), pairs: pairs }
            : { type: "pairs", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: pairs };
        }
        if (k === "z") {
          var e = EMPTY[+key.slice(1) - 1];
          if (!e) return null;
          var zp = ctx.w("zero", { place: ctx.w("places")[e[0]], thing: ctx.w("things")[e[1]] });
          return { type: "choose", show: e[0], prompt: zp, say: zp, options: rng.shuffle(["۰", "۱", "۲"]), answer: "۰" };
        }
        var x = +key.slice(1);
        if (!(x >= 1 && x <= max)) return null;
        if (k === "f") {
          var a = rng.pick(FEED);
          return { type: "feed", animal: a[0], food: a[1], n: x, max: Math.min(x + 3, 12),
            prompt: ctx.w("feed", { food: ctx.w("foods")[a[1]], animal: ctx.w("animals")[a[0]] }) };
        }
        var thing = rng.pick(["🐞", "🍓", "⭐", "🐟", "🌸"]);
        var opts = near(rng, x, 1, 1, max).map(function (v) { return { label: times(thing, v), value: String(v) }; });
        return { type: "choose", show: fa(x), prompt: ctx.w("group"), say: ctx.w("group"), pic: true, options: opts, answer: String(x) };
      });
    }
  });

  /* «بازی مارپله» — math-seed-p4 (Board game). The number track of 10 squares with a die (1–2, then 1–3 after
     math-seed-32) and a new theme each time; after math-seed-47 also the track to 20, starting near 10. Board games
     are long, so at most two in a session. Key: the track and the theme, "10-2". */
  var TRACKS = [["🐞", "🌸"], ["🦆", "🪷"], ["🐇", "🥕"], ["🐢", "🍓"], ["🐜", "🍉"], ["🐌", "🍃"]];
  B.PRACTICE.push({
    id: "math-seed-p4", subject: "math", level: "seed", objectives: ["math.seed.1", "math.seed.7"],
    needs: ["math-seed-31"], emoji: "🎲", title: "بازی مسیر عددها",
    lessons: ["math-seed-31", "math-seed-32", "math-seed-38", "math-seed-39", "math-seed-47", "math-seed-48"],
    words: {
      themes: [
        "کفشدوزک از راه باغ به گل می‌رود. تاس بینداز و جلو برو.",
        "اردک در رودخانه شنا می‌کند تا به گل نیلوفر برسد. تاس بینداز و جلو برو.",
        "خرگوش از راه مزرعه به هویج می‌رود. تاس بینداز و جلو برو.",
        "لاک‌پشت آرام‌آرام به توت‌فرنگی می‌رود. تاس بینداز و جلو برو.",
        "مورچه از راه حیاط به هندوانه می‌رود. تاس بینداز و جلو برو.",
        "حلزون از روی سنگ‌ها به برگ می‌رود. تاس بینداز و جلو برو."
      ],
      from: "این بار از خانه {n} شروع می‌کنیم. "
    },
    make: function (rng, n, ctx) {
      var tos = ctx.done(L("seed-47")) ? [10, 20] : [10];
      var die = ctx.done(L("seed-32")) ? [1, 2, 3] : [1, 2];
      return run(Math.min(n, 2), ctx, function () {
        return rng.pick(tos) + "-" + rng.int(1, TRACKS.length);
      }, function (key) {
        var m = /^(\d+)-(\d+)$/.exec(key), th = m && TRACKS[+m[2] - 1];
        if (!th || tos.indexOf(+m[1]) === -1) return null;
        var s = { type: "track", to: +m[1], die: die, pawn: th[0], goal: th[1], prompt: ctx.w("themes")[+m[2] - 1] };
        if (s.to === 20) { s.start = rng.int(8, 11); s.prompt = ctx.w("from", { n: fa(s.start) }) + s.prompt; }
        return s;
      });
    }
  });

  /* «چندتا پنهان شد؟» — math-seed-p5 (Hidden part). Some things are seen, the rest are under a bowl: how many are
     hidden («h»), or how many in all («a»). Totals to 5, to 10 after math-seed-37. Key: "h6-4" (the total, the
     number seen). */
  var HIDE = ["🍎", "🥚", "🌰", "🍓", "🍪", "🍊"];
  B.PRACTICE.push({
    id: "math-seed-p5", subject: "math", level: "seed", objectives: ["math.seed.8"],
    needs: ["math-seed-34"], emoji: "🥣", title: "چندتا پنهان شد؟",
    lessons: ["math-seed-34", "math-seed-35", "math-seed-36", "math-seed-37", "math-seed-38", "math-seed-50"],
    words: {
      hidden: "{all} {name} داشتیم. {seen} تا پیداست. چندتا زیر کاسه است؟",
      all: "{seen} {name} پیداست و {hid} تا زیر کاسه است. روی هم چندتا {name} هست؟",
      names: { "🍎": "سیب", "🥚": "تخم‌مرغ", "🌰": "فندق", "🍓": "توت‌فرنگی", "🍪": "شیرینی", "🍊": "نارنگی" }
    },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("seed-37")) ? 10 : 5;
      return run(n, ctx, function () {
        var all = rng.int(2, max);
        return rng.pick(["h", "h", "a"]) + all + "-" + rng.int(1, all - 1);
      }, function (key) {
        var m = /^([ha])(\d+)-(\d+)$/.exec(key), all = m && +m[2], seen = m && +m[3];
        if (!m || all > max || seen < 1 || seen >= all) return null;
        var t = rng.pick(HIDE), name = ctx.w("names")[t], hid = all - seen;
        var show = times(t, seen) + " 🥣";
        if (m[1] === "h") return askPic(ctx.w("hidden", { all: fa(all), seen: fa(seen), name: name }), hid, nearFa(rng, hid, 1, 1, all), show);
        return askPic(ctx.w("all", { seen: fa(seen), hid: fa(hid), name: name }), all, nearFa(rng, all, 1, 1, max + 1), show);
      });
    }
  });

  /* «قصه‌های عددی» — math-seed-p6 (Story maker). Short stories told by the voice: some animals are somewhere, more
     come; after math-seed-36 some also go away. Totals to 5, to 10 after math-seed-37. The first group is shown.
     Key: "c3+2" (come) or "g5-2" (go). */
  var STORY = ["🐦", "🦆", "🐞", "🐑", "🐥", "🦋"];
  B.PRACTICE.push({
    id: "math-seed-p6", subject: "math", level: "seed", objectives: ["math.seed.9"],
    needs: ["math-seed-35"], emoji: "📖", title: "قصه‌های عددی",
    lessons: ["math-seed-35", "math-seed-36", "math-seed-37", "math-seed-38", "math-seed-50"],
    words: {
      come: "{a} {name} {place} بودند. {b} {name} دیگر هم آمدند. حالا چند {name} {place} هستند؟",
      go: "{a} {name} {place} بودند. {b} تا رفتند. چند {name} {place} ماندند؟",
      comeOne: "{a} {name} {place} بودند. یک {name} دیگر هم آمد. حالا چند {name} {place} هستند؟",
      goOne: "{a} {name} {place} بودند. یکی رفت. چند {name} {place} ماندند؟",
      names: { "🐦": "گنجشک", "🦆": "اردک", "🐞": "کفشدوزک", "🐑": "بره", "🐥": "جوجه", "🦋": "پروانه" },
      places: { "🐦": "روی درخت", "🦆": "در حوض", "🐞": "روی برگ", "🐑": "در چمنزار", "🐥": "در حیاط", "🦋": "روی گل‌ها" }
    },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("seed-37")) ? 10 : 5, go = ctx.done(L("seed-36"));
      return run(n, ctx, function () {
        if (go && rng() < 0.5) { var t = rng.int(3, max); return "g" + t + "-" + rng.int(1, t - 1); }
        var a = rng.int(2, max - 1);
        return "c" + a + "+" + rng.int(1, max - a);
      }, function (key) {
        var m = /^([cg])(\d+)[+-](\d+)$/.exec(key), a = m && +m[2], b = m && +m[3];
        if (!m || (m[1] === "g" && !go) || a < 2 || b < 1) return null;
        var x = m[1] === "c" ? a + b : a - b;
        if ((m[1] === "c" ? x : a) > max || x < 1) return null;
        var t = rng.pick(STORY);
        var words = { a: fa(a), b: fa(b), name: ctx.w("names")[t], place: ctx.w("places")[t] };
        return askPic(ctx.w((m[1] === "c" ? "come" : "go") + (b === 1 ? "One" : ""), words), x, nearFa(rng, x, 1, 1, max), times(t, a));
      });
    }
  });

  /* «کدام بیشتر است؟» — math-seed-p7 (Compare). Two groups matched one to one, then which has more or fewer (after
     math-seed-4 one group may be drawn bigger: big is not more); after math-seed-16 two or three things to compare by
     length; after math-seed-17 two things on a balance. Keys: "m4-3-more", "l:0.6_2.4-longer" (things in LONG and their
     lengths), "w:0-6-heavier" (things in MASSES). */
  var MATCH = [["🧒", "🪑"], ["🐰", "🥕"], ["🐝", "🌸"], ["🍽️", "🥄"], ["🐶", "🦴"], ["☕", "🍪"]];
  var LONG = ["✏️", "🖍️", "🥕", "🌽", "🐍", "🥖", "🖌️", "🥒"];
  var MASS = { "🍉": 5, "🎃": 4, "🍍": 3, "🪨": 3, "🍎": 2, "📕": 2, "🍒": 1, "🪶": 1, "🎈": 1 };
  var MASSES = ["🍉", "🎃", "🍍", "🪨", "🍎", "📕", "🍒", "🪶", "🎈"];
  B.PRACTICE.push({
    id: "math-seed-p7", subject: "math", level: "seed", objectives: ["math.seed.5", "math.seed.10"],
    needs: ["math-seed-15"], emoji: "⚖️", title: "مقایسه کن",
    lessons: ["math-seed-15", "math-seed-4", "math-seed-16", "math-seed-17", "math-seed-18", "math-seed-19",
      "math-seed-44", "math-seed-45", "math-seed-50", "math-sprout-47"],
    words: {
      match: "زیر هر {a} یک {b} بگذار: روی {bs} بزن.",
      plural: { "🧒": "بچه‌ها", "🪑": "صندلی‌ها", "🐰": "خرگوش‌ها", "🥕": "هویج‌ها", "🐝": "زنبورها", "🌸": "گل‌ها", "🍽️": "بشقاب‌ها", "🥄": "قاشق‌ها", "🐶": "سگ‌ها", "🦴": "استخوان‌ها", "☕": "استکان‌ها", "🍪": "شیرینی‌ها" },
      one: { "🧒": "بچه", "🪑": "صندلی", "🐰": "خرگوش", "🥕": "هویج", "🐝": "زنبور", "🌸": "گل", "🍽️": "بشقاب", "🥄": "قاشق", "🐶": "سگ", "🦴": "استخوان", "☕": "استکان", "🍪": "شیرینی" },
      longer: "کدام درازتر است؟ رویش بزن.",
      shorter: "کدام کوتاه‌تر است؟ رویش بزن.",
      heavier: "کدام طرف سنگین‌تر است؟ روی آن کفه بزن.",
      lighter: "کدام طرف سبک‌تر است؟ روی آن کفه بزن.",
      things: { "🍉": "هندوانه", "🎃": "کدو تنبل", "🍍": "آناناس", "🪨": "سنگ", "🍎": "سیب", "📕": "کتاب", "🍒": "گیلاس", "🪶": "پر", "🎈": "بادکنک" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["m"];
      if (ctx.done(L("seed-16"))) kinds.push("l");
      if (ctx.done(L("seed-17"))) kinds.push("w");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "m") {
          var a = rng.int(2, 6), b = rng.int(2, 6);
          return "m" + a + "-" + b + "-" + rng.pick(["more", "more", "less"]);
        }
        if (k === "l") {
          var things = rng.sample(range(0, LONG.length - 1), rng.pick([2, 2, 3])), lens = rng.sample([2, 3, 4, 5, 6, 7, 8, 9], things.length);
          return "l:" + things.map(function (t, i) { return t + "." + lens[i]; }).join("_") + "-" + rng.pick(["longer", "shorter"]);
        }
        var two = rng.sample(range(0, MASSES.length - 1), 2);
        return MASS[MASSES[two[0]]] === MASS[MASSES[two[1]]] ? null : "w:" + two.join("-") + "-" + rng.pick(["heavier", "lighter"]);
      }, function (key) {
        var m = /^m(\d)-(\d)-(more|less)$/.exec(key);
        if (m && (+m[1] > 6 || +m[2] > 6 || +m[1] < 2 || +m[2] < 2)) return null;
        if (m) {
          var pair = rng.pick(MATCH), pl = ctx.w("plural"), one = ctx.w("one");
          var s = { type: "compare", match: true, a: +m[1], thing: pair[0], b: +m[2], thing2: pair[1], ask: m[3],
            names: [pl[pair[0]], pl[pair[1]]], prompt: ctx.w("match", { a: one[pair[0]], b: one[pair[1]], bs: pl[pair[1]] }) };
          s.say = s.prompt;
          if (ctx.done(L("seed-4")) && rng() < 0.4) s.big = "a";
          return s;
        }
        m = /^l:([\d._]+)-(longer|shorter)$/.exec(key);
        if (m) {
          if (kinds.indexOf("l") === -1) return null;
          var bars = m[1].split("_").map(function (p) { var d = p.split("."); return { thing: LONG[+d[0]], len: +d[1] }; });
          if (bars.some(function (b) { return !b.thing || !(b.len >= 1 && b.len <= 10); })) return null;
          return { type: "measure", ask: m[2], bars: bars, prompt: ctx.w(m[2]), say: ctx.w(m[2]) };
        }
        m = /^w:(\d+)-(\d+)-(heavier|lighter)$/.exec(key);
        var wa = m && MASSES[+m[1]], wb = m && MASSES[+m[2]];
        if (!m || kinds.indexOf("w") === -1 || !wa || !wb || MASS[wa] === MASS[wb]) return null;
        var th = ctx.w("things");
        return { type: "balance", ask: m[3], left: [{ pic: wa, mass: MASS[wa], say: th[wa] }],
          right: [{ pic: wb, mass: MASS[wb], say: th[wb] }], prompt: ctx.w(m[3]), say: ctx.w(m[3]) };
      });
    }
  });

  /* «الگو بساز» — math-seed-p8 (Pattern maker). Repeating patterns of colours, shapes, animals or fruit: AB, then
     AAB and ABB after math-seed-26, and ABC after math-seed-27; what comes next, or what goes in a gap. Key: the unit,
     the theme and the kind, "AAB-c-gap". */
  var PAT = { c: ["🔴", "🔵", "🟡", "🟢"], s: ["🔺", "🟦", "⚪", "⭐"], a: ["🐱", "🐶", "🐰", "🐥"], f: ["🍎", "🍌", "🍇", "🍊"] };
  B.PRACTICE.push({
    id: "math-seed-p8", subject: "math", level: "seed", objectives: ["math.seed.13"],
    needs: ["math-seed-8"], emoji: "🔴", title: "الگو بساز",
    lessons: ["math-seed-8", "math-seed-26", "math-seed-27", "math-seed-40", "math-seed-50"],
    words: { next: "بعدی کدام است؟", gap: "یکی جا افتاده. جای خالی را پر کن." },
    make: function (rng, n, ctx) {
      var units = ["AB"];
      if (ctx.done(L("seed-26"))) units.push("AAB", "ABB");
      if (ctx.done(L("seed-27"))) units.push("ABC");
      return run(n, ctx, function () {
        return rng.pick(units) + "-" + rng.pick(["c", "s", "a", "f"]) + "-" + rng.pick(["next", "gap"]);
      }, function (key) {
        var m = /^([ABC]+)-([csaf])-(next|gap)$/.exec(key);
        if (!m || units.indexOf(m[1]) === -1) return null;
        var pics = rng.shuffle(PAT[m[2]]), unit = m[1].split("").map(function (c) { return pics["ABC".indexOf(c)]; });
        var len = unit.length === 2 ? 6 : 8, seq = [];
        for (var i = 0; i < len; i++) seq.push(unit[i % unit.length]);
        var blank = m[3] === "next" ? len - 1 : rng.int(unit.length, len - 2);
        var opts = pics.filter(function (p) { return unit.indexOf(p) !== -1; });
        if (opts.length < 3) opts.push(pics[3]);
        return { type: "pattern", prompt: ctx.w(m[3]), say: ctx.w(m[3]), seq: seq, blanks: [blank], options: rng.shuffle(opts) };
      });
    }
  });

  /* «دسته کن» — math-seed-p9 (Sort it). Mixed things to sort into two baskets by colour or by kind; after
     math-seed-20 also the odd one out. Keys: "c:red-green", "k:fruit-animal", "o:fruit-vehicle". */
  var COLOR = { red: ["🍎", "🍓", "🍒", "🚒", "🌹", "🍅"], green: ["🥒", "🍏", "🥬", "🐸", "🌵", "🥦"], yellow: ["🍌", "🍋", "🐥", "🌻", "🚕", "🧀"] };
  var KIND = { fruit: ["🍎", "🍌", "🍇", "🍊", "🍐", "🍓", "🍉"], animal: ["🐶", "🐱", "🐰", "🐄", "🐑", "🐟", "🐸"],
    vehicle: ["🚗", "🚕", "🚌", "🚲", "🚒", "✈️", "🚂"], clothes: ["👕", "👗", "🧦", "🧢", "👟", "🧤"] };
  var SWATCH = { red: "🔴", green: "🟢", yellow: "🟡" };
  B.PRACTICE.push({
    id: "math-seed-p9", subject: "math", level: "seed", objectives: ["math.seed.12"],
    needs: ["math-seed-5"], emoji: "🧺", title: "دسته کن",
    lessons: ["math-seed-5", "math-seed-20", "math-seed-6", "math-seed-21", "math-seed-27", "math-seed-42",
      "math-seed-46", "math-seed-49"],
    words: {
      color: "{a}ها یک طرف، {b}ها یک طرف",
      kind: "هر چیز را در سبد خودش بگذار: {a} یا {b}؟",
      odd: "کدام جور نیست؟",
      colors: { red: "قرمز", green: "سبز", yellow: "زرد" },
      kinds: { fruit: "میوه", animal: "حیوان", vehicle: "وسیله نقلیه", clothes: "لباس" },
      names: {
        "🍎": "سیب", "🍓": "توت‌فرنگی", "🍒": "گیلاس", "🚒": "ماشین آتش‌نشانی", "🌹": "گل سرخ", "🍅": "گوجه‌فرنگی",
        "🥒": "خیار", "🍏": "سیب سبز", "🥬": "کاهو", "🐸": "قورباغه", "🌵": "کاکتوس", "🥦": "کلم بروکلی",
        "🍌": "موز", "🍋": "لیمو", "🐥": "جوجه", "🌻": "آفتابگردان", "🚕": "تاکسی", "🧀": "پنیر",
        "🍇": "انگور", "🍊": "پرتقال", "🍐": "گلابی", "🍉": "هندوانه", "🐶": "سگ", "🐱": "گربه", "🐰": "خرگوش",
        "🐄": "گاو", "🐑": "گوسفند", "🐟": "ماهی", "🚗": "ماشین", "🚌": "اتوبوس", "🚲": "دوچرخه", "✈️": "هواپیما",
        "🚂": "قطار", "👕": "پیراهن", "👗": "دامن", "🧦": "جوراب", "🧢": "کلاه", "👟": "کفش", "🧤": "دستکش"
      }
    },
    make: function (rng, n, ctx) {
      var kinds = ["c", "k"];
      if (ctx.done(L("seed-20"))) kinds.push("o");
      var names = ctx.w("names");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), two = rng.sample(k === "c" ? ["red", "green", "yellow"] : ["fruit", "animal", "vehicle", "clothes"], 2);
        return k + ":" + two.join("-");
      }, function (key) {
        var m = /^([cko]):(\w+)-(\w+)$/.exec(key), bank = m && (m[1] === "c" ? COLOR : KIND);
        if (!m || kinds.indexOf(m[1]) === -1 || !bank[m[2]] || !bank[m[3]]) return null;
        if (m[1] === "o") {
          var same = rng.sample(KIND[m[2]], 3), odd = rng.pick(KIND[m[3]]);
          return { type: "choose", prompt: ctx.w("odd"), say: ctx.w("odd"), pic: true, answer: odd,
            options: rng.shuffle(same.concat([odd])).map(function (e) { return { label: e, value: e }; }) };
        }
        var lab = ctx.w(m[1] === "c" ? "colors" : "kinds"), items = [], used = {};
        [m[2], m[3]].forEach(function (v) {
          rng.sample(bank[v].filter(function (e) { return !used[e]; }), 3).forEach(function (e) {
            used[e] = true;
            items.push({ pic: e, say: names[e], basket: v });
          });
        });
        var prompt = ctx.w(m[1] === "c" ? "color" : "kind", { a: lab[m[2]], b: lab[m[3]] });
        return { type: "sort", prompt: prompt, say: prompt, items: rng.shuffle(items),
          baskets: [m[2], m[3]].map(function (v) { return { label: lab[v], pic: SWATCH[v] || bank[v][0], value: v }; }) };
      });
    }
  });

  /* «شکل‌ها را پیدا کن» — math-seed-p10 (Shape hunt). Find the circle, square or triangle among other shapes, in
     different sizes and turns; the odd one out; after math-seed-23 also rectangles, thin and upside-down shapes,
     shapes that are almost triangles (open, or with a curved side), and sorting triangles from the rest.
     Keys: "f:triangle", "o:square-circle", "s". */
  var SHAPE_FORMS = {
    circle: ["circle"], square: ["square", "square-tilt", "square-small"],
    triangle: ["triangle", "triangle-tilt", "triangle-small", "triangle-thin", "triangle-down"],
    rectangle: ["rectangle", "rectangle-tall", "rectangle-thin"]
  };
  B.PRACTICE.push({
    id: "math-seed-p10", subject: "math", level: "seed", objectives: ["math.seed.14"],
    needs: ["math-seed-7"], emoji: "🔺", title: "شکل‌ها را پیدا کن",
    lessons: ["math-seed-7", "math-seed-23", "math-seed-24", "math-seed-25", "math-seed-8", "math-seed-27",
      "math-seed-46", "math-seed-49", "math-sprout-7", "math-sprout-19"],
    words: {
      find: "{name} کدام است؟",
      odd: "به شکل‌ها نگاه کن، نه به اندازه‌شان. کدام جور نیست؟",
      sort: "مثلث‌ها یک طرف، شکل‌های دیگر یک طرف. بزرگ یا کوچک، چرخیده یا نچرخیده، فرقی ندارد.",
      tri: "مثلث", notTri: "مثلث نیست",
      names: { circle: "دایره", square: "مربع", triangle: "مثلث", rectangle: "مستطیل" }
    },
    make: function (rng, n, ctx) {
      var late = ctx.done(L("seed-23"));
      var bases = late ? ["circle", "square", "triangle", "rectangle"] : ["circle", "square", "triangle"];
      function forms(b) { return late ? SHAPE_FORMS[b] : SHAPE_FORMS[b].slice(0, 3); }
      var kinds = late ? ["f", "f", "o", "s"] : ["f", "f", "o"];
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "s") return "s";
        if (k === "f") return "f:" + rng.pick(bases);
        var two = rng.sample(bases.filter(function (b) { return b !== "circle"; }), 1).concat([null]);
        two[1] = rng.pick(bases.filter(function (b) { return b !== two[0]; }));
        return "o:" + two.join("-");
      }, function (key) {
        if (key === "s") {
          if (!late) return null;
          var tris = rng.sample(SHAPE_FORMS.triangle, 3), others = rng.shuffle(["opentri", "curvetri"].concat([rng.pick(SHAPE_FORMS.square), rng.pick(SHAPE_FORMS.rectangle)])).slice(0, 3);
          return { type: "sort", prompt: ctx.w("sort"), say: ctx.w("sort"),
            baskets: [{ label: ctx.w("tri"), shape: "triangle", value: "tri" }, { label: ctx.w("notTri"), shape: "opentri", value: "no" }],
            items: rng.shuffle(tris.map(function (s) { return { shape: s, basket: "tri" }; }).concat(others.map(function (s) { return { shape: s, basket: "no" }; }))) };
        }
        var m = /^f:(\w+)$/.exec(key);
        if (m) {
          if (bases.indexOf(m[1]) === -1) return null;
          var wrong = bases.filter(function (b) { return b !== m[1]; }).map(function (b) { return rng.pick(forms(b)); });
          if (late && m[1] === "triangle") wrong = [rng.pick(["opentri", "curvetri"])].concat(wrong);
          // a square is a kind of rectangle: never ask for one with the other among the options
          wrong = wrong.filter(function (w) { var b = w.split("-")[0]; return !((m[1] === "rectangle" && b === "square") || (m[1] === "square" && b === "rectangle")); });
          var p = ctx.w("find", { name: ctx.w("names")[m[1]] });
          return { type: "shape", prompt: p, say: p, options: rng.shuffle([rng.pick(forms(m[1]))].concat(rng.sample(wrong, 2))), answer: m[1] };
        }
        m = /^o:(\w+)-(\w+)$/.exec(key);
        if (!m || bases.indexOf(m[1]) === -1 || bases.indexOf(m[2]) === -1) return null;
        if ((m[1] === "square" && m[2] === "rectangle") || (m[1] === "rectangle" && m[2] === "square")) return null;
        var same = rng.sample(forms(m[1]), Math.min(3, forms(m[1]).length));
        while (same.length < 3) same.push(same[0]);
        return { type: "shape", prompt: ctx.w("odd"), say: ctx.w("odd"), options: rng.shuffle(same.concat([rng.pick(forms(m[2]))])), answer: m[2] };
      });
    }
  });

  /* ================= Sprout ================= */

  // A fact "a+b" or "a-b" as numbers, and the sum written left to right with «؟» for the answer.
  function fact(key) {
    var m = /^(\d+)([+-])(\d+)$/.exec(key);
    if (!m) return null;
    var a = +m[1], b = +m[3], plus = m[2] === "+";
    return { a: a, b: b, plus: plus, x: plus ? a + b : a - b, show: fa(a) + (plus ? " + " : " − ") + fa(b) + " = ؟" };
  }

  /* «جمع و تفریق تا ده» — math-sprout-p1 (Facts to 10). Facts in strategy groups, each open after its lesson: +0, +1,
     +2 and other sums to 10 (math-sprout-5), taking away 1 or 2 (math-sprout-6), pairs that make ten (math-sprout-2),
     doubles (math-sprout-26), any take-away by thinking of the sum (math-sprout-32). Shown on a ten-frame first;
     after math-sprout-31 mostly as numbers only. Key: the fact, "3+4", "7-2", or "t3" (3 and what make ten). */
  B.PRACTICE.push({
    id: "math-sprout-p1", subject: "math", level: "sprout", objectives: ["math.spr.7", "math.spr.4"],
    needs: ["math-sprout-5"], emoji: "➕", title: "جمع و تفریق تا ده",
    lessons: ["math-sprout-5", "math-sprout-17", "math-sprout-6", "math-sprout-18", "math-sprout-8",
      "math-sprout-11", "math-sprout-22", "math-sprout-26", "math-sprout-27", "math-sprout-30", "math-sprout-31",
      "math-sprout-32", "math-sprout-50", "math-sprout-60"],
    words: { ask: "جواب چند است؟", ten: "چندتا دیگر لازم است تا ده بشود؟", tenSum: "چند با {a} می‌شود ده؟" },
    make: function (rng, n, ctx) {
      var groups = ["small", "sum", "ten"];
      if (ctx.done(L("sprout-6"))) groups.push("take");
      if (ctx.done(L("sprout-26"))) groups.push("double");
      if (ctx.done(L("sprout-32"))) groups.push("think", "think");
      var bare = ctx.done(L("sprout-31")), anyTake = ctx.done(L("sprout-32"));
      return run(n, ctx, function () {
        var g = rng.pick(groups), a, b;
        if (g === "small") { b = rng.int(0, 2); a = rng.int(1, 10 - b); return rng() < 0.5 ? a + "+" + b : b + "+" + a; }
        if (g === "sum") { a = rng.int(2, 7); return a + "+" + rng.int(2, 10 - a); }
        if (g === "ten") return "t" + rng.int(1, 9);
        if (g === "take") { a = rng.int(3, 10); return a + "-" + rng.int(1, 2); }
        if (g === "double") { a = rng.int(1, 5); return a + "+" + a; }
        a = rng.int(5, 10);
        return a + "-" + rng.int(3, a - 1);
      }, function (key) {
        var t = /^t(\d)$/.exec(key);
        if (t) {
          var a = +t[1], x = 10 - a;
          if (bare && rng() < 0.6) return ask(ctx.w("tenSum", { a: fa(a) }), x, nearFa(rng, x, 1, 0, 10), fa(a) + " + ؟ = ۱۰");
          return { type: "tenframe", n: a, missing: true, prompt: ctx.w("ten"), options: near(rng, x, 1, 0, 10) };
        }
        var f = fact(key);
        if (!f || f.x < 0 || (f.plus && f.x > 10) || (!f.plus && f.a > 10)) return null;
        if (!f.plus && (groups.indexOf("take") === -1 || (f.b > 2 && !anyTake))) return null;
        if (bare && rng() < 0.7) return ask(ctx.w("ask"), f.x, nearFa(rng, f.x, 1, 0, 11), f.show);
        var s = { type: "tenframe", n: f.a, options: near(rng, f.x, 1, 0, 11) };
        if (f.plus) s.plus = f.b; else s.minus = f.b;
        return s;
      });
    }
  });

  /* «جمع و تفریق تا بیست» — math-sprout-p2 (Facts to 20). Counting on 1–3 from a number to 17 on the number line
     (math-sprout-24), counting back (math-sprout-25), doubles to 10 + 10 (math-sprout-26) and near doubles
     (math-sprout-28). After math-sprout-28 the line fades: most facts are numbers only. Key: the fact, "14+3". */
  B.PRACTICE.push({
    id: "math-sprout-p2", subject: "math", level: "sprout", objectives: ["math.spr.8"],
    needs: ["math-sprout-24"], emoji: "🐸", title: "جمع و تفریق تا بیست",
    lessons: ["math-sprout-24", "math-sprout-25", "math-sprout-26", "math-sprout-27", "math-sprout-28",
      "math-sprout-29", "math-sprout-32", "math-sprout-34", "math-sprout-36", "math-sprout-60", "math-sapling-3"],
    words: { ask: "جواب چند است؟", on: "قورباغه روی {a} است و {b} خانه جلو می‌پرد. به کجا می‌رسد؟", back: "قورباغه روی {a} است و {b} خانه عقب می‌پرد. به کجا می‌رسد؟", double: "دوتایی‌ها: جواب چند است؟", near: "یکی بیشتر از دوتایی: جواب چند است؟" },
    make: function (rng, n, ctx) {
      var groups = ["on"];
      if (ctx.done(L("sprout-25"))) groups.push("back");
      if (ctx.done(L("sprout-26"))) groups.push("double");
      if (ctx.done(L("sprout-28"))) groups.push("near", "near");
      var fade = ctx.done(L("sprout-28"));
      return run(n, ctx, function () {
        var g = rng.pick(groups), a;
        if (g === "on") return rng.int(5, 17) + "+" + rng.int(1, 3);
        if (g === "back") { a = rng.int(6, 20); return a + "-" + rng.int(1, 3); }
        a = rng.int(g === "double" ? 3 : 3, g === "double" ? 10 : 9);
        return g === "double" ? a + "+" + a : (rng() < 0.5 ? a + "+" + (a + 1) : (a + 1) + "+" + a);
      }, function (key) {
        var f = fact(key);
        if (!f || f.x < 0 || f.x > 20 || (f.plus ? f.a + f.b > 20 : f.a > 20)) return null;
        var d = f.a - f.b;
        if (f.plus && (d === 0 || d === 1 || d === -1) && f.b > 3) {
          if (d === 0 && groups.indexOf("double") === -1) return null;
          if (d !== 0 && groups.indexOf("near") === -1) return null;
          return ask(ctx.w(d === 0 ? "double" : "near"), f.x, nearFa(rng, f.x, 1, 0, 21), f.show);
        }
        if (f.b > 3 || (!f.plus && groups.indexOf("back") === -1)) return null;
        if (fade && rng() < 0.6) return ask(ctx.w("ask"), f.x, nearFa(rng, f.x, 1, 0, 21), f.show);
        return { type: "numline", a: f.a, b: f.plus ? f.b : -f.b, options: near(rng, f.x, 1, 0, 20) };
      });
    }
  });

  /* «جزء و کل» — math-sprout-p3 (Number bonds). A whole to 10 and one part: the rest are under a bowl; the ten-frame
     and how many more make ten; two cards that make the same whole, to pair. Keys: "h7-3" (whole, part seen),
     "t3", "b8:1-2-3" (the whole and the smaller parts). */
  B.PRACTICE.push({
    id: "math-sprout-p3", subject: "math", level: "sprout", objectives: ["math.spr.4"],
    needs: ["math-sprout-2"], emoji: "🥣", title: "جزء و کل",
    lessons: ["math-sprout-2", "math-sprout-15", "math-sprout-16", "math-sprout-3", "math-sprout-5",
      "math-sprout-17", "math-sprout-18", "math-sprout-8", "math-sprout-30", "math-sprout-31"],
    words: {
      hidden: "{all} مهره داریم. {seen} تا بیرون است. چندتا زیر کاسه است؟",
      ten: "چندتا دیگر لازم است تا ده بشود؟",
      bonds: "هر دو عددی را که با هم {all} می‌شوند جفت کن"
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var k = rng.pick(["h", "h", "t", "b"]), all = rng.int(5, 10);
        if (k === "h") return "h" + all + "-" + rng.int(1, all - 1);
        if (k === "t") return "t" + rng.int(1, 9);
        var small = rng.sample(range(1, Math.ceil(all / 2) - 1), 3).sort(function (a, b) { return a - b; });
        return small.length === 3 ? "b" + all + ":" + small.join("-") : null;
      }, function (key) {
        var m = /^h(\d+)-(\d+)$/.exec(key);
        if (m) {
          var all = +m[1], seen = +m[2], hid = all - seen;
          if (all > 10 || seen < 1 || hid < 1) return null;
          return askPic(ctx.w("hidden", { all: fa(all), seen: fa(seen) }), hid, nearFa(rng, hid, 1, 1, all), times("🔵", seen) + " 🥣");
        }
        m = /^t(\d)$/.exec(key);
        if (m) return { type: "tenframe", n: +m[1], missing: true, prompt: ctx.w("ten"), options: near(rng, 10 - m[1], 1, 0, 10) };
        m = /^b(\d+):(\d+)-(\d+)-(\d+)$/.exec(key);
        if (!m || +m[1] > 10) return null;
        var w = +m[1], parts = [+m[2], +m[3], +m[4]];
        if (parts.some(function (p) { return p < 1 || 2 * p >= w; })) return null;
        var p = ctx.w("bonds", { all: fa(w) });
        return { type: "pairs", prompt: p, say: p, pairs: rng.shuffle(parts).map(function (a) { return [a, w - a]; }) };
      });
    }
  });

  /* «عدد گم‌شده» — math-sprout-p4 (Missing number). ۳ + ؟ = ۷، ؟ + ۲ = ۵، ؟ − ۲ = ۵، ۹ − ؟ = ۴ to 20, and number
     sentences to call true or false: «۴ + ۲ = ۵ + ۱», «۷ = ۳ + ۴». Keys: "3+?=7", "?-2=5", "tf:4+2=5+1". */
  B.PRACTICE.push({
    id: "math-sprout-p4", subject: "math", level: "sprout", objectives: ["math.spr.10"],
    needs: ["math-sprout-30"], emoji: "❓", title: "عدد گم‌شده",
    lessons: ["math-sprout-30", "math-sprout-35", "math-sprout-36", "math-sprout-37"],
    words: { missing: "کدام عدد جای «؟» می‌آید؟", tf: "«=» یعنی دو طرف به یک اندازه‌اند. این جمله درست است یا نادرست؟", yes: "درست", no: "نادرست" },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var k = rng.int(0, 5), a = rng.int(1, 10), b = rng.int(1, 10);
        if (k === 0) return a + "+?=" + (a + b);
        if (k === 1) return "?+" + b + "=" + (a + b);
        if (k === 2) return "?-" + b + "=" + a;
        if (k === 3) return (a + b) + "-?=" + a;
        var c = rng.int(1, 9), d = a + b - c, wrong = rng() < 0.5;
        if (d < 1) return null;
        if (wrong) d += rng.pick([1, -1]);
        return d < 1 ? null : k === 4 ? "tf:" + a + "+" + b + "=" + c + "+" + d : "tf:" + (wrong ? a + b + 1 : a + b) + "=" + a + "+" + b;
      }, function (key) {
        var m = /^tf:(\d+)(?:\+(\d+))?=(\d+)\+(\d+)$/.exec(key);
        if (m) {
          var left = +m[1] + (m[2] ? +m[2] : 0), right = +m[3] + +m[4];
          var show = fa(m[1]) + (m[2] ? " + " + fa(m[2]) : "") + " = " + fa(m[3]) + " + " + fa(m[4]);
          return { type: "choose", ltr: true, show: show, prompt: ctx.w("tf"), say: ctx.w("tf"), pic: true,
            options: [{ label: "✅", value: "yes" }, { label: "❌", value: "no" }], answer: left === right ? "yes" : "no" };
        }
        m = /^(\?|\d+)([+-])(\?|\d+)=(\d+)$/.exec(key);
        if (!m || (m[1] === "?") === (m[3] === "?")) return null;
        var c = +m[4], plus = m[2] === "+", known = +(m[1] === "?" ? m[3] : m[1]);
        var x = plus ? c - known : m[1] === "?" ? c + known : known - c;
        if (x < 0 || c > 20 || x > 20 || known > 20) return null;
        var show = (m[1] === "?" ? "؟" : fa(m[1])) + (plus ? " + " : " − ") + (m[3] === "?" ? "؟" : fa(m[3])) + " = " + fa(c);
        return ask(ctx.w("missing"), x, optsFa(rng, x, [x + 1, x - 1, c, known, x + 2]), show);
      });
    }
  });

  /* «قصه‌های جمع و تفریق» — math-sprout-p5 (Story problems). Word problems from templates: adding to, taking from,
     putting together (math-sprout-11), comparing (math-sprout-33), the change unknown (math-sprout-34) and the start
     unknown (math-sprout-35); to 10, to 20 after math-sprout-34. Names and things from children's lives here.
     Key: the kind and the numbers, "add:5+3", "cmp:9-4". */
  var KIDS = 14;
  var STUFF = ["🍬", "📕", "✏️", "🎈", "🍪", "🌰", "🥚", "🐟"];
  B.PRACTICE.push({
    id: "math-sprout-p5", subject: "math", level: "sprout", objectives: ["math.spr.9", "math.spr.11"],
    needs: ["math-sprout-11"], emoji: "📖", title: "قصه‌های جمع و تفریق",
    lessons: ["math-sprout-11", "math-sprout-22", "math-sprout-33", "math-sprout-34", "math-sprout-35",
      "math-sprout-36", "math-sprout-37", "math-sprout-50", "math-sprout-60"],
    words: {
      add: "{p} {a} {t} داشت. {q} {b} {t} دیگر به او داد. حالا {p} چند {t} دارد؟",
      take: "{p} {a} {t} داشت. {b} تا را به {q} داد. چند {t} برایش ماند؟",
      tog: "{p} {a} {t} دارد و {q} {b} {t}. روی هم چند {t} دارند؟",
      cmp: "{p} {a} {t} دارد و {q} {b} {t}. {p} چندتا بیشتر از {q} دارد؟",
      chg: "{p} {a} {t} داشت. {q} چندتا دیگر به او داد. حالا {p} {c} {t} دارد. {q} چندتا داد؟",
      start: "{p} چندتا {t} داشت. {b} تا دیگر هم خرید. حالا {c} {t} دارد. اول چندتا داشت؟",
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه", "ترانه", "پرهام", "شیرین", "بابک", "دلارام", "امید"],
      things: { "🍬": "آب‌نبات", "📕": "کتاب", "✏️": "مداد", "🎈": "بادکنک", "🍪": "شیرینی", "🌰": "گردو", "🥚": "تخم‌مرغ رنگی", "🐟": "ماهی قرمز" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["add", "take", "tog"], max = ctx.done(L("sprout-34")) ? 20 : 10;
      if (ctx.done(L("sprout-33"))) kinds.push("cmp");
      if (ctx.done(L("sprout-34"))) kinds.push("chg");
      if (ctx.done(L("sprout-35"))) kinds.push("start");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), a = rng.int(3, max - 2), b = rng.int(2, Math.min(a - 1, max - a));
        return b < 2 ? null : k + ":" + a + (k === "take" || k === "cmp" ? "-" : "+") + b;
      }, function (key) {
        var m = /^([a-z]+):(\d+)([+-])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[4], k = m[1], plus = m[3] === "+";
        if (plus === (k === "take" || k === "cmp") || a + b > max || b >= a + (plus ? 99 : 0) || b < 2) return null;
        var who = rng.sample(range(0, KIDS - 1), 2), people = ctx.w("people"), t = rng.pick(STUFF);
        var x = k === "add" || k === "tog" ? a + b : k === "take" || k === "cmp" ? a - b : k === "chg" ? b : a;
        var c = a + b;
        var p = ctx.w(k, { p: people[who[0]], q: people[who[1]], a: fa(a), b: fa(b), c: fa(c), t: ctx.w("things")[t] });
        return askPic(p, x, nearFa(rng, x, 1, 0, max), t);
      });
    }
  });

  /* «قاب ده‌تایی، یک نگاه» — math-sprout-p6 (Ten-frame flash). A ten-frame (1–10) or two hands (6–10, after
     math-sprout-14) shown for a moment: how many? After math-sprout-3 also 11–20 on two ten-frames (they stay: the
     flash picture has one frame). Keys: "f7", "h8", "t14". */
  B.PRACTICE.push({
    id: "math-sprout-p6", subject: "math", level: "sprout", objectives: ["math.spr.3", "math.spr.5"],
    needs: ["math-sprout-1"], emoji: "🔟", title: "قاب ده‌تایی، یک نگاه",
    lessons: ["math-sprout-1", "math-sprout-14", "math-sprout-2", "math-sprout-16", "math-sprout-3",
      "math-sprout-13", "math-sprout-23"],
    words: {
      frame: "قاب ده‌تایی فقط یک لحظه پیدا می‌شود. نشمار، نگاه کن!", askFrame: "چندتا مهره دیدی؟",
      hands: "دو دست را زود ببین. یک دست کامل و چند انگشت دیگر!", askHands: "روی هم چند انگشت؟",
      two: "یک قاب پر یعنی ده. در قاب‌ها روی هم چندتا مهره هست؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["f", "f"];
      if (ctx.done(L("sprout-14"))) kinds.push("h");
      if (ctx.done(L("sprout-3"))) kinds.push("t", "t");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        return k + (k === "f" ? rng.int(1, 10) : k === "h" ? rng.int(6, 10) : rng.int(11, 20));
      }, function (key) {
        var m = /^([fht])(\d+)$/.exec(key), x = m && +m[2];
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "f" && x <= 10) return { type: "count", flash: true, show: "frame", n: x, options: near(rng, x, 1, 1, 10), prompt: ctx.w("frame"), ask: ctx.w("askFrame") };
        if (m[1] === "h" && x >= 6 && x <= 10) return { type: "count", flash: true, show: "fingers", n: x, options: near(rng, x, 1, 5, 10), prompt: ctx.w("hands"), ask: ctx.w("askHands") };
        if (m[1] === "t" && x > 10 && x <= 20) return { type: "tenframe", n: x, prompt: ctx.w("two"), options: near(rng, x, 1, 10, 20) };
        return null;
      });
    }
  });

  /* «قبل، بعد، بین» — math-sprout-p7 (Number track). The number before, after or between, numbers missing from a
     run, and which of two is more or less, to 20; to 100 after math-sprout-40; after math-sprout-42 the number above
     or below on the hundred chart. Keys: "after:14", "run:31", "cmp:12-15-more", "below:34". */
  B.PRACTICE.push({
    id: "math-sprout-p7", subject: "math", level: "sprout", objectives: ["math.spr.1", "math.spr.6"],
    needs: ["math-sprout-10"], emoji: "🔢", title: "قبل، بعد، بین",
    lessons: ["math-sprout-10", "math-sprout-13", "math-sprout-25", "math-sprout-38", "math-sprout-39",
      "math-sprout-40", "math-sprout-42", "math-sprout-43", "math-sprout-44", "math-sprout-58", "math-sprout-60"],
    words: {
      after: "کدام عدد درست بعد از {a} می‌آید؟", before: "کدام عدد درست قبل از {a} می‌آید؟",
      between: "کدام عدد بین {a} و {b} است؟", run: "عددها به ترتیب‌اند. جاهای خالی را پر کن.",
      below: "در جدول صدتایی، عدد زیر {a} کدام است؟", above: "در جدول صدتایی، عدد بالای {a} کدام است؟"
    },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sprout-40")) ? 100 : 20;
      var kinds = ["after", "before", "between", "run", "cmp"];
      if (ctx.done(L("sprout-42"))) kinds.push("below", "above");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "cmp") { var two = rng.sample(range(max > 20 ? 10 : 1, max), 2); return "cmp:" + two.join("-") + "-" + rng.pick(["more", "less"]); }
        if (k === "below") return "below:" + rng.int(1, 90);
        if (k === "above") return "above:" + rng.int(11, 100);
        if (k === "run") return "run:" + rng.int(0, max - 5);
        return k + ":" + rng.int(1, max - 1);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:-(\d+)-(more|less))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], k = m[1];
        if (k === "cmp") return +m[3] > max || a > max || a === +m[3] ? null : { type: "compare", a: a, b: +m[3], ask: m[4] };
        if (k === "run") {
          if (a + 5 > max) return null;
          var seq = range(a, a + 5), blanks = rng.sample([1, 2, 3, 4, 5], 2).sort();
          var opts = blanks.map(function (i) { return seq[i]; });
          var bad = rng.shuffle([seq[blanks[0]] + 10, seq[blanks[1]] - 2, a + 7].filter(function (v) { return v >= 0 && opts.indexOf(v) === -1; })).slice(0, 2);
          return { type: "pattern", prompt: ctx.w("run"), say: ctx.w("run"), ltr: true, seq: seq, blanks: blanks, options: rng.shuffle(opts.concat(bad)) };
        }
        if (a < 1 || a > max) return null;
        var x = k === "after" ? a + 1 : k === "before" ? a - 1 : k === "between" ? a + 1 : k === "below" ? a + 10 : a - 10;
        if (x < 0 || x > 100) return null;
        var p = ctx.w(k, { a: fa(a), b: fa(a + 2) });
        var wrong = k === "below" || k === "above" ? [a + 1, a - 1, k === "below" ? a - 10 : a + 10] : [x + 1, x - 1, x + 2, x - 2, x + 10];
        return ask(p, x, optsFa(rng, x, wrong.filter(function (v) { return v !== a && v <= 100; })), k === "below" || k === "above" ? fa(a) : null);
      });
    }
  });

  /* «بشنو و پیدا کن» — math-sprout-p8 (Read and write). Hear a number (🔊) and pick it among numbers that look alike
     (۲۳ and ۳۲); after math-sprout-41 also two-digit numbers to read: the number and its name. To 20, to 100 after
     math-sprout-41. Keys: "hear:23", "read:47". Writing a number is not here yet: practice has no writing step. */
  function numWord(ctx, x) {
    var ones = ctx.w("ones"), tens = ctx.w("tens");
    if (x < 20) return ones[x];
    if (x === 100) return ctx.w("hundred");
    return tens[Math.floor(x / 10)] + (x % 10 ? ctx.w("join") + ones[x % 10] : "");
  }
  var NUM_WORDS = {
    ones: ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه", "ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"],
    tens: ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
    hundred: "صد", join: " و "
  };
  B.PRACTICE.push({
    id: "math-sprout-p8", subject: "math", level: "sprout", objectives: ["math.spr.2"],
    needs: ["math-sprout-9"], emoji: "👂", title: "بشنو و پیدا کن",
    lessons: ["math-sprout-9", "math-sprout-23", "math-sprout-41", "math-sprout-44"],
    words: Object.assign({
      hear: "روی 🔊 بزن و گوش کن. کدام عدد را شنیدی؟",
      read: "این عدد را چطور می‌خوانیم؟"
    }, NUM_WORDS),
    make: function (rng, n, ctx) {
      var big = ctx.done(L("sprout-41")), max = big ? 100 : 20;
      var kinds = big ? ["hear", "hear", "read"] : ["hear"];
      return run(n, ctx, function () {
        return rng.pick(kinds) + ":" + rng.int(big ? 11 : 0, max);
      }, function (key) {
        var m = /^(hear|read):(\d+)$/.exec(key), x = m && +m[2];
        if (!m || x > max || kinds.indexOf(m[1]) === -1) return null;
        var rev = x >= 10 && x < 100 && x % 10 ? (x % 10) * 10 + Math.floor(x / 10) : null;
        var wrong = [rev, x + 10, x - 10, x + 1, x - 1].filter(function (v) { return v != null && v !== x && v >= 0 && v <= max; });
        if (m[1] === "hear") {
          var s = ask(ctx.w("hear"), x, optsFa(rng, x, wrong.slice(0, 3)));
          s.say = numWord(ctx, x);
          return s;
        }
        var opts = [x].concat(rng.shuffle(wrong.slice(0, 3)).slice(0, 2));
        return { type: "choose", ltr: true, show: fa(x), prompt: ctx.w("read"), stack: true, answer: String(x),
          options: rng.shuffle(opts).map(function (v) { return { label: numWord(ctx, v), value: String(v) }; }) };
      });
    }
  });

  /* «دوتا دوتا، پنج‌تا پنج‌تا» — math-sprout-p9 (Skip count). Counting by 2 (to 30), 5 (to 60) and 10 (to 100),
     forwards and back, with one or two gaps to fill. Key: step, direction and start, "2f:6", "10b:90". */
  B.PRACTICE.push({
    id: "math-sprout-p9", subject: "math", level: "sprout", objectives: ["math.spr.21"],
    needs: ["math-sprout-39"], emoji: "🦘", title: "دوتا دوتا، پنج‌تا پنج‌تا",
    lessons: ["math-sprout-39", "math-sprout-42", "math-sprout-44", "math-sprout-56", "math-sprout-57"],
    words: {
      f: "{by} جلو برو. جاهای خالی را پر کن.",
      b: "{by} عقب برو. جاهای خالی را پر کن.",
      by: { 2: "دوتا دوتا", 5: "پنج‌تا پنج‌تا", 10: "ده‌تا ده‌تا" }
    },
    make: function (rng, n, ctx) {
      var top = { 2: 30, 5: 60, 10: 100 };
      return run(n, ctx, function () {
        var d = rng.pick([2, 5, 10]), dir = rng() < 0.7 ? "f" : "b", k = rng.int(0, top[d] / d - 6);
        return d + dir + ":" + (dir === "f" ? k * d : (k + 6) * d);
      }, function (key) {
        var m = /^(2|5|10)([fb]):(\d+)$/.exec(key), d = m && +m[1], a = m && +m[3];
        if (!m || a % d) return null;
        var seq = range(0, 5).map(function (i) { return m[2] === "f" ? a + i * d : a - i * d; });
        if (seq[5] < 0 || seq[5] > top[d]) return null;
        var blanks = rng.sample([2, 3, 4, 5], rng.pick([1, 2])).sort();
        var right = blanks.map(function (i) { return seq[i]; });
        var bad = rng.shuffle([right[0] + 1, right[0] - 1, right[0] + 3, right[0] + 10])
          .filter(function (v) { return v >= 0 && right.indexOf(v) === -1 && seq.indexOf(v) === -1; }).slice(0, 2);
        var p = ctx.w(m[2], { by: ctx.w("by")[d] });
        return { type: "pattern", prompt: p, say: p, ltr: true, seq: seq, blanks: blanks, options: rng.shuffle(right.concat(bad)) };
      });
    }
  });

  /* «شکل‌ها و الگوها» — math-sprout-p10 (Shapes and patterns). Name a shape; after math-sprout-19 find it by its sides
     and corners; after math-sprout-20 the solid a thing looks like; repeating patterns (AABB, ABC, ABB); after
     math-sprout-56 growing patterns (dots, then numbers). Keys: "n:triangle", "d:square", "s:cube", "r:AABB",
     "g:1-2" (start and step). */
  var SOLIDS = { cube: ["🎲", "🧊"], sphere: ["⚽", "🍊"], cylinder: ["🥫", "🕯️"], cone: ["🍦", "🎉"], cuboid: ["📦", "🧱"] };
  B.PRACTICE.push({
    id: "math-sprout-p10", subject: "math", level: "sprout", objectives: ["math.spr.12", "math.spr.14"],
    needs: ["math-sprout-7"], emoji: "🔷", title: "شکل‌ها و الگوها",
    lessons: ["math-sprout-7", "math-sprout-19", "math-sprout-20", "math-sprout-21", "math-sprout-56",
      "math-sprout-57", "math-sprout-59"],
    words: {
      name: "{name} کدام است؟",
      desc: { triangle: "کدام شکل سه ضلع و سه گوشه دارد؟", square: "کدام شکل چهار ضلع برابر و چهار گوشه دارد؟", rectangle: "کدام شکل چهار ضلع دارد، دوتا بلند و دوتا کوتاه؟", circle: "کدام شکل هیچ ضلع و گوشه‌ای ندارد؟" },
      solid: "کدام شبیه {name} است؟",
      names: { circle: "دایره", square: "مربع", triangle: "مثلث", rectangle: "مستطیل" },
      solids: { cube: "مکعب", sphere: "کره", cylinder: "استوانه", cone: "مخروط", cuboid: "مکعب مستطیل" },
      next: "بعدی کدام است؟", grow: "این الگو هر بار بزرگ‌تر می‌شود. بعدی کدام است؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["n", "r"];
      if (ctx.done(L("sprout-19"))) kinds.push("d");
      if (ctx.done(L("sprout-20"))) kinds.push("s");
      if (ctx.done(L("sprout-56"))) kinds.push("g", "g");
      var bases = ["circle", "square", "triangle", "rectangle"];
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "n" || k === "d") return k + ":" + rng.pick(bases);
        if (k === "s") return "s:" + rng.pick(Object.keys(SOLIDS));
        if (k === "r") return "r:" + rng.pick(["AABB", "ABC", "ABB", "AAB"]);
        return "g:" + rng.int(1, 4) + "-" + rng.int(1, 3);
      }, function (key) {
        var m = /^([ndsrg]):(.+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], v = m[2], p;
        if (k === "n" || k === "d") {
          if (bases.indexOf(v) === -1) return null;
          var others = bases.filter(function (b) { return b !== v && !((v === "square" && b === "rectangle") || (v === "rectangle" && b === "square")); });
          var opts = [rng.pick(SHAPE_FORMS[v])].concat(rng.sample(others, 2).map(function (b) { return rng.pick(SHAPE_FORMS[b]); }));
          if (k === "d" && v === "rectangle") opts[0] = "rectangle";
          p = k === "n" ? ctx.w("name", { name: ctx.w("names")[v] }) : ctx.w("desc")[v];
          return { type: "shape", prompt: p, say: p, options: rng.shuffle(opts), answer: v };
        }
        if (k === "s") {
          if (!SOLIDS[v]) return null;
          var right = rng.pick(SOLIDS[v]), wrong = rng.sample(Object.keys(SOLIDS).filter(function (o) { return o !== v; }), 2).map(function (o) { return rng.pick(SOLIDS[o]); });
          p = ctx.w("solid", { name: ctx.w("solids")[v] });
          return { type: "choose", prompt: p, say: p, pic: true, answer: right, options: rng.shuffle([right].concat(wrong)).map(function (e) { return { label: e, value: e }; }) };
        }
        if (k === "r") {
          if (!/^[ABC]+$/.test(v)) return null;
          var pics = rng.shuffle(rng.pick([PAT.c, PAT.s, PAT.a, PAT.f])), unit = v.split("").map(function (c) { return pics["ABC".indexOf(c)]; });
          var seq = [];
          for (var i = 0; i < unit.length * 2 + 2; i++) seq.push(unit[i % unit.length]);
          var ro = pics.slice(0, 3);
          return { type: "pattern", prompt: ctx.w("next"), say: ctx.w("next"), seq: seq, blanks: [seq.length - 1], options: rng.shuffle(ro) };
        }
        var g = /^(\d)-(\d)$/.exec(v);
        if (!g) return null;
        var a = +g[1], d = +g[2], vals = range(0, 4).map(function (j) { return a + j * d; });
        var dots = vals[4] <= 10, face = function (x) { return dots ? { dots: x } : x; };
        var gOpts = [vals[4], vals[4] + 1, vals[4] - 1 === vals[3] ? vals[4] + d : vals[4] - 1].map(face);
        return { type: "pattern", prompt: ctx.w("grow"), say: ctx.w("grow"), ltr: true, seq: vals.map(face), blanks: [4], options: rng.shuffle(gOpts) };
      });
    }
  });

  /* «ساعت و تقویم» — math-sprout-p11 (Clock and calendar). The day before or after (math-sprout-12); after
     math-sprout-48 o'clock to read or set; after math-sprout-49 the season of a month. Keys: "da:2" (the day after
     the third day), "db:4", "r:7", "set:3", "m:6" (the seventh month). */
  var SEASON = ["spring", "summer", "autumn", "winter"], SEASON_PIC = { spring: "🌸", summer: "☀️", autumn: "🍂", winter: "❄️" };
  B.PRACTICE.push({
    id: "math-sprout-p11", subject: "math", level: "sprout", objectives: ["math.spr.16"],
    needs: ["math-sprout-12"], emoji: "🕒", title: "ساعت و تقویم",
    lessons: ["math-sprout-12", "math-sprout-48", "math-sprout-49", "math-sprout-51"],
    words: {
      after: "بعد از {day} چه روزی است؟", before: "قبل از {day} چه روزی بود؟",
      read: "ساعت چند است؟", set: "عقربه‌ها را روی ساعت {h} بگذار.",
      month: "{month} در کدام فصل است؟",
      days: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
      months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
      seasons: { spring: "بهار", summer: "تابستان", autumn: "پاییز", winter: "زمستان" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["da", "db"];
      if (ctx.done(L("sprout-48"))) kinds.push("r", "r", "set");
      if (ctx.done(L("sprout-49"))) kinds.push("m", "m");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        return k + ":" + (k === "m" ? rng.int(0, 11) : k === "r" || k === "set" ? rng.int(1, 12) : rng.int(0, 6));
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key), k = m && m[1], v = m && +m[2];
        if (!m || kinds.indexOf(k) === -1) return null;
        if (k === "da" || k === "db") {
          var days = ctx.w("days"), x = (v + (k === "da" ? 1 : 6)) % 7, back = (v + (k === "da" ? 6 : 1)) % 7;
          var o = [x, back, (v + 3) % 7].map(function (i) { return days[i]; });
          var p = ctx.w(k === "da" ? "after" : "before", { day: days[v] });
          return { type: "choose", prompt: p, say: p, options: rng.shuffle(o), answer: days[x] };
        }
        if (k === "r") {
          if (v < 1 || v > 12) return null;
          var hs = rng.shuffle([v % 12 + 1, (v + 10) % 12 + 1, 12 - v || 12, (v + 5) % 12 + 1].filter(function (h) { return h !== v; }));
          return { type: "clock", time: v + ":00", options: rng.shuffle([v].concat(hs.filter(function (h, i) { return hs.indexOf(h) === i; }).slice(0, 2))).map(function (h) { return h + ":00"; }), prompt: ctx.w("read") };
        }
        if (k === "set") return v < 1 || v > 12 ? null : { type: "clock", ask: "set", time: v + ":00", start: "12:00", prompt: ctx.w("set", { h: fa(v) }) };
        if (v > 11) return null;
        var mp = ctx.w("month", { month: ctx.w("months")[v] }), seasons = ctx.w("seasons");
        return { type: "choose", prompt: mp, say: mp, stack: true, answer: SEASON[Math.floor(v / 3)],
          options: SEASON.map(function (s) { return { label: SEASON_PIC[s] + " " + seasons[s], value: s }; }) };
      });
    }
  });

  /* ================= Sapling ================= */

  // An expression written left to right in Persian digits: ex(45, "+", 30) → «۴۵ + ۳۰ = ؟».
  function ex(a, op, b) { return fa(a) + " " + { "+": "+", "-": "−", "x": "×", "/": "÷" }[op] + " " + fa(b) + " = ؟"; }
  function calc(a, op, b) { return op === "+" ? a + b : op === "-" ? a - b : op === "x" ? a * b : a / b; }
  // "45+30" → [45, "+", 30]
  function parse(key) {
    var m = /^(\d+)([-+x/])(\d+)$/.exec(key);
    return m && [+m[1], m[2], +m[3]];
  }

  /* «جمع و تفریق تا بیست» — math-sapling-p1 (Facts to 20). Facts in strategy groups, interleaved: making ten
     (8 + 5, math-sapling-3), doubles and near doubles, taking away through ten (13 − 5, math-sapling-22) and the
     rest by thinking of the sum (math-sapling-23). Making ten is sometimes shown on two ten-frames. Key: "8+5". */
  B.PRACTICE.push({
    id: "math-sapling-p1", subject: "math", level: "sapling", objectives: ["math.sap.1"],
    needs: ["math-sapling-3"], emoji: "⚡", title: "جمع و تفریق تا بیست",
    lessons: ["math-sapling-3", "math-sapling-1", "math-sapling-2", "math-sapling-22", "math-sapling-23",
      "math-sapling-13"],
    words: { ask: "جواب چند است؟", ten: "اول ده را پر کن. {a} + {b} چند می‌شود؟" },
    make: function (rng, n, ctx) {
      var groups = ["ten", "ten", "double", "near"];
      if (ctx.done(L("sapling-22"))) groups.push("through", "through");
      if (ctx.done(L("sapling-23"))) groups.push("any");
      return run(n, ctx, function () {
        var g = rng.pick(groups), a, b;
        if (g === "ten") { a = rng.int(6, 9); b = rng.int(11 - a, 9); return rng() < 0.7 ? a + "+" + b : b + "+" + a; }
        if (g === "double") { a = rng.int(4, 10); return a + "+" + a; }
        if (g === "near") { a = rng.int(4, 9); return a + "+" + (a + 1); }
        if (g === "through") { a = rng.int(11, 18); return a + "-" + rng.int(a - 9, 9); }
        a = rng.int(11, 20);
        return a + "-" + rng.int(2, a - 2);
      }, function (key) {
        var f = parse(key);
        if (!f || (f[1] !== "+" && f[1] !== "-")) return null;
        var x = calc(f[0], f[1], f[2]);
        if (x < 0 || x > 20 || f[0] > 20 || (f[1] === "-" && groups.indexOf("through") === -1)) return null;
        var big = Math.max(f[0], f[2]), small = Math.min(f[0], f[2]);
        if (f[1] === "+" && big >= 6 && big <= 9 && x > 10 && rng() < 0.35)
          return { type: "tenframe", n: big, plus: small, prompt: ctx.w("ten", { a: fa(big), b: fa(small) }), options: near(rng, x, 1, 0, 20) };
        return ask(ctx.w("ask"), x, nearFa(rng, x, 1, 0, 21), ex(f[0], f[1], f[2]));
      });
    }
  });

  /* «ارزش مکانی» — math-sapling-p2 (Place value). Read a number from bundles and sticks (to 100, then 1,000 after
     math-sapling-40, then 10,000 after math-sapling-52), build one, ten more or less (math-sapling-24) and a hundred
     more or less (math-sapling-40), expanded form (math-sapling-40), compare with < = > (math-sapling-6) and round
     (math-sapling-54). Keys: "r:56", "b:47", "x:345", "m:35+10", "c:61-58", "rd:47-10". */
  B.PRACTICE.push({
    id: "math-sapling-p2", subject: "math", level: "sapling", objectives: ["math.sap.2", "math.sap.3"],
    needs: ["math-sapling-4"], emoji: "🧮", title: "ارزش مکانی",
    lessons: ["math-sapling-4", "math-sapling-5", "math-sapling-6", "math-sapling-24", "math-sapling-7",
      "math-sapling-17", "math-sapling-40", "math-sapling-43", "math-sapling-52", "math-sapling-53",
      "math-sapling-54", "math-sapling-55", "math-sapling-98"],
    words: {
      read: "این چند است؟", build: "عدد {n} را با دسته‌ها و چوب‌ها بساز.",
      more: "{n} و {b} تا بیشتر. چند می‌شود؟", less: "{n} و {b} تا کمتر. چند می‌شود؟",
      expand: "این‌ها روی هم چه عددی می‌شوند؟",
      round: "{n} را به نزدیک‌ترین {to} گرد کن.", to: { 10: "ده", 100: "صد", 1000: "هزار" }
    },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sapling-52")) ? 9999 : ctx.done(L("sapling-40")) ? 999 : 100;
      var kinds = ["r", "r", "b"];
      if (ctx.done(L("sapling-6"))) kinds.push("c");
      if (ctx.done(L("sapling-24"))) kinds.push("m");
      if (ctx.done(L("sapling-40"))) kinds.push("x");
      if (ctx.done(L("sapling-54"))) kinds.push("rd");
      function num() { return rng.int(11, max); }
      return run(n, ctx, function () {
        var k = rng.pick(kinds), a = num();
        if (k === "m") return "m:" + a + (rng() < 0.5 ? "+" : "-") + (max > 100 && rng() < 0.5 ? 100 : 10);
        if (k === "c") return "c:" + a + "-" + (rng() < 0.6 ? Math.max(1, a + rng.pick([-10, -1, 1, 9, 10, -9])) : num());
        if (k === "rd") return "rd:" + a + "-" + rng.pick([10, 100, 1000].filter(function (t) { return t < a; }));
        if (k === "b") return "b:" + rng.int(11, Math.min(max, 999));
        return k + ":" + a;
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:([-+])(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2], b = m[4] != null ? +m[4] : null;
        if (a > max || a < 1) return null;
        if (k === "r") return { type: "tens", n: a, options: optsNum(rng, a, [swap(a), a + 10, a - 10, a + 1, a + 100]), prompt: ctx.w("read") };
        if (k === "b") return a > 999 ? null : { type: "tens", n: a, build: true, prompt: ctx.w("build", { n: fa(a) }) };
        if (k === "x") {
          var parts = String(a).split("").map(function (d, i, all) { return +d * Math.pow(10, all.length - 1 - i); }).filter(function (v) { return v; });
          if (parts.length < 2) return null;
          return ask(ctx.w("expand"), a, optsFa(rng, a, [swap(a), a + 10, a - 1, a + 100]), parts.map(fa).join(" + ") + " = ؟");
        }
        if (k === "m") {
          if (b !== 10 && b !== 100) return null;
          var x = m[3] === "+" ? a + b : a - b;
          if (x < 0 || x > max || (b === 100 && max < 999)) return null;
          return { type: "tens", n: a, b: m[3] === "+" ? b : -b, options: optsNum(rng, x, [m[3] === "+" ? a + 1 : a - 1, m[3] === "+" ? a - b : a + b, x + (b === 10 ? 100 : 10)]),
            prompt: ctx.w(m[3] === "+" ? "more" : "less", { n: fa(a), b: fa(b) }) };
        }
        if (k === "c") return b == null || b > max ? null : { type: "compare", a: a, b: b, ask: "symbol" };
        if (k === "rd") {
          if ([10, 100, 1000].indexOf(b) === -1 || b >= a) return null;
          var r = Math.round(a / b) * b, lo = Math.floor(a / b) * b, hi = lo + b;
          return ask(ctx.w("round", { n: fa(a), to: ctx.w("to")[b] }), r, optsFa(rng, r, [lo === r ? hi : lo, Math.round(a / (b * 10)) * b * 10, r + b]), null);
        }
        return null;
      });
      // the last two digits swapped (the commonest slip): 47 → 74, 352 → 325
      function swap(v) { var s = String(v); return +(s.slice(0, -2) + s.slice(-1) + s.slice(-2, -1)); }
    }
  });

  /* «حساب ذهنی» — math-sapling-p3 (Mental sums). Sums and differences to do in the head: tens on and off
     (math-sapling-24), adding or taking 9 or 11 (one ten, then one back) and two-digit numbers (math-sapling-25),
     differences by counting up (math-sapling-26), hundreds and three-digit numbers (math-sapling-81).
     Key: the sum, "45+30". */
  B.PRACTICE.push({
    id: "math-sapling-p3", subject: "math", level: "sapling", objectives: ["math.sap.25"],
    needs: ["math-sapling-25"], emoji: "🧠", title: "حساب ذهنی",
    lessons: ["math-sapling-25", "math-sapling-26", "math-sapling-27", "math-sapling-28", "math-sapling-29",
      "math-sapling-10", "math-sapling-11", "math-sapling-14", "math-sapling-42", "math-sapling-81"],
    words: {
      ask: "در ذهنت حساب کن. جواب چند است؟",
      less: "{b} یعنی {c}، یکی کمتر. در ذهنت حساب کن.", more: "{b} یعنی {c} و یکی بیشتر. در ذهنت حساب کن.",
      up: "از {b} تا {a} رو به بالا بشمار. فاصله چقدر است؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["tens", "near", "two"];
      if (ctx.done(L("sapling-26"))) kinds.push("up");
      if (ctx.done(L("sapling-81"))) kinds.push("hund", "three");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), a, b, plus = rng() < 0.5;
        if (k === "tens") { a = rng.int(12, 89); b = 10 * rng.int(1, plus ? Math.floor((99 - a) / 10) || 1 : Math.floor(a / 10)); }
        else if (k === "near") { a = rng.int(20, 85); b = rng.pick([9, 11, 19, 21]); }
        else if (k === "two") { a = rng.int(21, 69); b = rng.int(12, plus ? 99 - a : a - 5); }
        else if (k === "up") { b = rng.int(20, 90); a = b + rng.int(3, 9); plus = false; }
        else if (k === "hund") { a = rng.int(110, 799); b = 100 * rng.int(1, 2); }
        else { a = rng.int(120, 600); b = rng.int(20, 99); }
        return a + (plus ? "+" : "-") + b;
      }, function (key) {
        var f = parse(key);
        if (!f || (f[1] !== "+" && f[1] !== "-")) return null;
        var a = f[0], b = f[2], x = calc(a, f[1], b);
        if (x < 0 || (a > 100 && kinds.indexOf("hund") === -1) || x > 999) return null;
        var p = ctx.w("ask");
        if (b % 10 === 9 && b < 30) p = ctx.w("less", { b: fa(b), c: fa(b + 1) });
        if (b % 10 === 1 && b < 30) p = ctx.w("more", { b: fa(b), c: fa(b - 1) });
        if (f[1] === "-" && x < 10 && b > 15 && kinds.indexOf("up") !== -1) p = ctx.w("up", { a: fa(a), b: fa(b) });
        return ask(p, x, optsFa(rng, x, [x + 10, x - 10, x + 1, x - 1].concat(a > 100 ? [x + 100, x - 100] : [])), ex(a, f[1], b));
      });
    }
  });

  /* «جمع و تفریق ستونی» — math-sapling-p4 (Column sums). Written + and − with and without carrying and borrowing:
     two-digit numbers (math-sapling-27), three-digit (math-sapling-41, −: math-sapling-42), four-digit
     (math-sapling-55); after math-sapling-28 an estimate first, on its own: which round number is it near?
     Keys: "47+35", "e:47+35". */
  B.PRACTICE.push({
    id: "math-sapling-p4", subject: "math", level: "sapling", objectives: ["math.sap.4", "math.sap.5"],
    needs: ["math-sapling-27"], emoji: "📝", title: "جمع و تفریق ستونی",
    lessons: ["math-sapling-27", "math-sapling-28", "math-sapling-29", "math-sapling-41", "math-sapling-42",
      "math-sapling-43", "math-sapling-55", "math-sapling-80", "math-sapling-88", "math-sapling-98"],
    words: { column: "ستونی حساب کن: از یکان شروع کن.", estimate: "اول حدس بزن: جواب به کدام نزدیک‌تر است؟" },
    make: function (rng, n, ctx) {
      var sizes = [2];
      if (ctx.done(L("sapling-41"))) sizes.push(3, 3);
      if (ctx.done(L("sapling-55"))) sizes.push(4);
      var sub3 = ctx.done(L("sapling-42")), est = ctx.done(L("sapling-28"));
      return run(n, ctx, function () {
        var d = rng.pick(sizes), plus = rng() < 0.5 || (d === 3 && !sub3);
        var lo = Math.pow(10, d - 1), hi = Math.pow(10, d) - 1, a, b;
        if (plus) { a = rng.int(lo, hi - lo); b = rng.int(lo, Math.min(hi - a, hi)); }
        else { a = rng.int(lo + lo, hi); b = rng.int(lo, a - lo); }
        if (b < lo) return null;
        return (est && rng() < 0.3 ? "e:" : "") + a + (plus ? "+" : "-") + b;
      }, function (key) {
        var e = key.indexOf("e:") === 0, f = parse(e ? key.slice(2) : key);
        if (!f || (f[1] !== "+" && f[1] !== "-") || (e && !est)) return null;
        var d = String(Math.max(f[0], f[2])).length;
        if (sizes.indexOf(d) === -1 || (d === 3 && f[1] === "-" && !sub3) || calc(f[0], f[1], f[2]) < 0) return null;
        if (!e) return { type: "column", op: f[1], a: f[0], b: f[2], prompt: ctx.w("column") };
        var u = d >= 3 ? 100 : 10, r = function (v) { return Math.round(v / u) * u; };
        var x = calc(r(f[0]), f[1], r(f[2]));
        return ask(ctx.w("estimate"), x, optsFa(rng, x, [x + u, x - u, x + 2 * u]), ex(f[0], f[1], f[2]).replace(" = ؟", " ≈ ؟"));
      });
    }
  });

  /* «جدول ضرب» — math-sapling-p5 (Times tables). Facts of the tables in the order taught: 2, 5 and 10
     (math-sapling-64), 4, 3 and 6 (math-sapling-65), 9, 8 and 7 (math-sapling-66), 0 and 1 (math-sapling-67);
     as arrays to count at first, then (after math-sapling-68) mostly as numbers only; division facts mixed in after
     math-sapling-72. Keys: "6x4" (six fours), "24/4". */
  B.PRACTICE.push({
    id: "math-sapling-p5", subject: "math", level: "sapling", objectives: ["math.sap.8", "math.sap.9"],
    needs: ["math-sapling-64"], emoji: "✖️", title: "جدول ضرب",
    lessons: ["math-sapling-64", "math-sapling-65", "math-sapling-66", "math-sapling-67", "math-sapling-68",
      "math-sapling-69", "math-sapling-70", "math-sapling-71", "math-sapling-72", "math-sapling-73",
      "math-sapling-75", "math-sapling-98"],
    words: { ask: "جواب چند است؟", array: "{a} ردیف، در هر ردیف {b} تا: {a} × {b} = ؟", div: "{a} را {b}تا {b}تا دسته کن. چند دسته می‌شود؟" },
    make: function (rng, n, ctx) {
      var tables = [2, 5, 10];
      if (ctx.done(L("sapling-65"))) tables.push(4, 3, 6);
      if (ctx.done(L("sapling-66"))) tables.push(9, 8, 7);
      var zero = ctx.done(L("sapling-67")), fade = ctx.done(L("sapling-68")), div = ctx.done(L("sapling-72"));
      return run(n, ctx, function () {
        var b = rng.pick(zero && rng() < 0.1 ? [0, 1] : tables), a = rng.int(zero ? 0 : 1, 10);
        if (div && b > 0 && a > 0 && rng() < 0.35) return (a * b) + "/" + b;
        return a + "x" + b;
      }, function (key) {
        var f = parse(key);
        if (!f || (f[1] !== "x" && f[1] !== "/")) return null;
        var b = f[2], ok = tables.indexOf(b) !== -1 || (zero && b <= 1);
        if (!ok || f[0] > (f[1] === "x" ? 10 : 10 * b) || (f[1] === "/" && (!div || b === 0 || f[0] % b))) return null;
        var x = calc(f[0], f[1], b);
        if (f[1] === "/") return ask(ctx.w("ask"), x, optsFa(rng, x, [x + 1, x - 1, b, x + 2]), ex(f[0], "/", b));
        var wrong = [x + b, x - b, f[0] + b, x + 1, (f[0] + 1) * (b + 1)];
        if (!fade && f[0] >= 1 && b >= 1 && f[0] <= 10)
          return { type: "array", rows: f[0], cols: b, prompt: ctx.w("array", { a: fa(f[0]), b: fa(b) }), options: optsNum(rng, x, wrong) };
        return ask(ctx.w("ask"), x, optsFa(rng, x, wrong), ex(f[0], "x", b));
      });
    }
  });

  /* «ضرب و تقسیم» — math-sapling-p6 (Multiply and share). Sharing equally (math-sapling-70), with a remainder
     (math-sapling-73); tens times a number (3 × 40, math-sapling-86); a two-digit number times a one-digit number
     with the area model (math-sapling-87) and written (math-sapling-88), and three-digit numbers after
     math-sapling-89. Keys: "sh:15/3", "rm:17/5", "t:3x40", "a:24x3", "c:124x3". */
  B.PRACTICE.push({
    id: "math-sapling-p6", subject: "math", level: "sapling", objectives: ["math.sap.10", "math.sap.9"],
    needs: ["math-sapling-70"], emoji: "🍪", title: "ضرب و تقسیم",
    lessons: ["math-sapling-70", "math-sapling-71", "math-sapling-72", "math-sapling-73", "math-sapling-74",
      "math-sapling-75", "math-sapling-86", "math-sapling-87", "math-sapling-88", "math-sapling-89"],
    words: {
      share: "{n} {t} را بین {p} نفر مساوی تقسیم کن.",
      rem: "{n} {t} را بین {p} نفر مساوی تقسیم کن. به هر نفر چندتا می‌رسد و چندتا باقی می‌ماند؟",
      remLabel: "{q}، باقی‌مانده {r}",
      tens: "اگر {a} × {b} = {c}، پس {a} × {d}؟",
      area: "اول با مستطیل: {a} × {b}. هر تکه را جدا حساب کن.",
      column: "ضرب نوشتنی: از یکان شروع کن.",
      things: { "🍪": "شیرینی", "🍬": "آب‌نبات", "🍎": "سیب", "✏️": "مداد", "🌰": "گردو" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["sh"];
      if (ctx.done(L("sapling-73"))) kinds.push("rm", "rm");
      if (ctx.done(L("sapling-86"))) kinds.push("t");
      if (ctx.done(L("sapling-87"))) kinds.push("a");
      if (ctx.done(L("sapling-88"))) kinds.push("c", "c");
      var three = ctx.done(L("sapling-89"));
      var KIDS3 = ["👧", "👦", "🧒", "👧", "👦"];
      return run(n, ctx, function () {
        var k = rng.pick(kinds), p = rng.int(2, 5), b = rng.int(2, 9);
        if (k === "sh") return "sh:" + p * rng.int(2, 5) + "/" + p;
        if (k === "rm") return "rm:" + (p * rng.int(2, 6) + rng.int(1, p - 1)) + "/" + p;
        if (k === "t") return "t:" + b + "x" + 10 * rng.int(2, 9);
        if (k === "a") return "a:" + rng.int(12, 49) + "x" + rng.int(2, 6);
        return "c:" + (three && rng() < 0.4 ? rng.int(102, 499) : rng.int(12, 99)) + "x" + b;
      }, function (key) {
        var m = /^([a-z]+):(\d+)([x/])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2], b = +m[4];
        var th = ctx.w("things"), t = rng.pick(["🍪", "🍬", "🍎", "✏️", "🌰"]);
        if (k === "sh") return b < 2 || b > 5 || a % b || a > 25 ? null : { type: "feed", n: a, who: KIDS3.slice(0, b), food: t, prompt: ctx.w("share", { n: fa(a), t: th[t], p: fa(b) }) };
        if (k === "rm") {
          var q = Math.floor(a / b), r = a % b;
          if (!r || b < 2 || b > 9) return null;
          var lab = function (qq, rr) { return { label: ctx.w("remLabel", { q: fa(qq), r: fa(rr) }), value: qq + "r" + rr }; };
          var opts = [lab(q, r), lab(q - 1, r + b), lab(q + 1, Math.max(0, r - 1))];
          if (rng() < 0.3 && a <= 20) return { type: "feed", n: a, plates: b, food: t, prompt: ctx.w("rem", { n: fa(a), t: th[t], p: fa(b) }) };
          var pr = ctx.w("rem", { n: fa(a), t: th[t], p: fa(b) });
          return { type: "choose", ltr: true, show: ex(a, "/", b), prompt: pr, say: pr, stack: true, options: rng.shuffle(opts), answer: q + "r" + r };
        }
        if (k === "t") {
          if (b % 10 || a > 9) return null;
          var x = a * b;
          return ask(ctx.w("tens", { a: fa(a), b: fa(b / 10), c: fa(a * b / 10), d: fa(b) }), x, optsFa(rng, x, [x / 10, x * 10, x + 10]), ex(a, "x", b));
        }
        if (k === "a") return a > 99 || b > 9 ? null : { type: "array", ask: "area", rows: b, cols: [a - a % 10, a % 10].filter(function (v) { return v; }), prompt: ctx.w("area", { a: fa(b), b: fa(a) }) };
        if (b > 9 || (a > 99 && !three)) return null;
        return { type: "column", op: "×", a: a, b: b, prompt: ctx.w("column") };
      });
    }
  });

  /* «عدد مجهول» — math-sapling-p7 (Missing numbers). ؟ + a = b and a − ؟ = b to 20 (math-sapling-13), to 100 after
     math-sapling-34; a × ؟ = b and ؟ ÷ a = b after math-sapling-72. Key: the sentence, "?+7=15", "6x?=42". */
  B.PRACTICE.push({
    id: "math-sapling-p7", subject: "math", level: "sapling", objectives: ["math.sap.12"],
    needs: ["math-sapling-13"], emoji: "❓", title: "عدد مجهول",
    lessons: ["math-sapling-13", "math-sapling-14", "math-sapling-32", "math-sapling-33", "math-sapling-34",
      "math-sapling-72"],
    words: { ask: "کدام عدد جای «؟» می‌آید؟" },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sapling-34")) ? 100 : 20, times = ctx.done(L("sapling-72"));
      var forms = ["?+a", "a+?", "?-a", "a-?"];
      if (times) forms.push("ax?", "?xa", "?/a", "a/?");
      return run(n, ctx, function () {
        var f = rng.pick(forms), a, b;
        if (/[x/]/.test(f)) { a = rng.int(2, 10); b = rng.int(2, 10); var p = a * b;
          return { "ax?": a + "x?=" + p, "?xa": "?x" + a + "=" + p, "?/a": "?/" + a + "=" + b, "a/?": p + "/?=" + b }[f]; }
        a = rng.int(2, max - 2); b = rng.int(1, max - a);
        return { "?+a": "?+" + a + "=" + (a + b), "a+?": a + "+?=" + (a + b), "?-a": "?-" + a + "=" + b, "a-?": (a + b) + "-?=" + b }[f];
      }, function (key) {
        var m = /^(\?|\d+)([-+x/])(\?|\d+)=(\d+)$/.exec(key);
        if (!m || (m[1] === "?") === (m[3] === "?")) return null;
        var op = m[2], c = +m[4], k = +(m[1] === "?" ? m[3] : m[1]), left = m[1] === "?", x;
        if ((op === "x" || op === "/") && !times) return null;
        if (op === "+" || op === "x") x = op === "+" ? c - k : c / k;
        else if (left) x = op === "-" ? c + k : c * k;
        else x = op === "-" ? k - c : k / c;
        if (x < 0 || x !== Math.floor(x) || x > 100 || ((op === "+" || op === "-") && Math.max(c, k, x) > max)) return null;
        var sym = { "+": " + ", "-": " − ", "x": " × ", "/": " ÷ " }[op];
        var show = (left ? "؟" : fa(m[1])) + sym + (left ? fa(m[3]) : "؟") + " = " + fa(c);
        return ask(ctx.w("ask"), x, optsFa(rng, x, [x + 1, x - 1, c + k, Math.abs(c - k), x + 10]), show);
      });
    }
  });

  /* «مسئله‌های قصه‌ای» — math-sapling-p8 (Word problems). Problems from templates with names, shops, prices and
     places here: part and whole and change (math-sapling-14), with a bar model after math-sapling-32, comparing
     with a bar model (math-sapling-33), two steps (math-sapling-35), equal groups (math-sapling-74) and times as many
     (math-sapling-89). Key: the kind and the numbers, "pw:35+48". */
  B.PRACTICE.push({
    id: "math-sapling-p8", subject: "math", level: "sapling", objectives: ["math.sap.11"],
    needs: ["math-sapling-14"], emoji: "📖", title: "مسئله‌های قصه‌ای",
    lessons: ["math-sapling-14", "math-sapling-32", "math-sapling-33", "math-sapling-34", "math-sapling-35",
      "math-sapling-18", "math-sapling-21", "math-sapling-63", "math-sapling-74", "math-sapling-80",
      "math-sapling-89", "math-sapling-90", "math-sapling-91", "math-sapling-97", "math-sapling-98"],
    words: {
      pw: "{p} {a} {t} دارد و {q} {b} {t}. روی هم چند {t} دارند؟",
      part: "در کلاس {c} بچه هستند. {a} نفر دخترند. چند نفر پسرند؟",
      off: "در اتوبوس {a} نفر بودند. در ایستگاه {b} نفر پیاده شدند. چند نفر در اتوبوس ماندند؟",
      on: "در اتوبوس {a} نفر بودند. در ایستگاه {b} نفر سوار شدند. حالا چند نفرند؟",
      cmp: "{p} {a} {t} دارد و {q} {b} {t}. {p} چندتا بیشتر دارد؟",
      two: "{p} {c} هزار تومان داشت. از نانوایی {a} هزار تومان نان خرید و از میوه‌فروشی {b} هزار تومان میوه. چقدر برایش ماند؟",
      groups: "{g} جعبه داریم. در هر جعبه {k} {t} است. روی هم چند {t} داریم؟",
      timesAs: "یک دفتر {a} هزار تومان است. یک کتاب {k} برابر دفتر قیمت دارد. کتاب چند هزار تومان است؟",
      kids: "بچه‌ها", money: "پول", boxes: "{g} جعبه",
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه", "ترانه", "پرهام", "شیرین", "بابک", "دلارام", "امید"],
      things: { "🔵": "تیله", "📕": "کتاب", "✏️": "مداد", "🌰": "گردو", "🍬": "آب‌نبات", "🖍️": "مداد رنگی" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["pw", "part", "off", "on"], bars = ctx.done(L("sapling-32"));
      if (ctx.done(L("sapling-33"))) kinds.push("cmp", "cmp");
      if (ctx.done(L("sapling-35"))) kinds.push("two");
      if (ctx.done(L("sapling-74"))) kinds.push("groups");
      if (ctx.done(L("sapling-89"))) kinds.push("timesAs");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), a = rng.int(12, 59), b = rng.int(11, 40);
        if (k === "groups") return "groups:" + rng.int(3, 6) + "x" + rng.int(3, 9);
        if (k === "timesAs") return "timesAs:" + rng.int(3, 15) + "x" + rng.int(2, 4);
        if (k === "two") return "two:" + 10 * rng.int(6, 10) + ":" + rng.int(10, 25) + "+" + rng.int(10, 25);
        if (k === "part") { var all = rng.int(24, 38); return "part:" + all + "-" + rng.int(10, all - 9); }
        if (k === "cmp" || k === "off") return k + ":" + (a + b) + "-" + b;
        return k + ":" + a + "+" + b;
      }, function (key) {
        var m = /^([a-zA-Z]+):(?:(\d+):)?(\d+)([-+x])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[3], b = +m[5], c = m[2] ? +m[2] : null, op = m[4];
        var people = ctx.w("people"), who = rng.sample(range(0, people.length - 1), 2), t = rng.pick(["🔵", "📕", "✏️", "🌰", "🍬", "🖍️"]);
        var w = { p: people[who[0]], q: people[who[1]], t: ctx.w("things")[t] }, x, s;
        if (k === "groups" || k === "timesAs") {
          if (op !== "x" || a > 15 || b > 9) return null;
          x = a * b;
          if (k === "groups") {
            w.g = fa(a); w.k = fa(b);
            return { type: "bar", prompt: ctx.w("groups", w), bars: [{ label: ctx.w("boxes", { g: fa(a) }), parts: range(1, a).map(function () { return b; }) }],
              whole: "?", options: optsNum(rng, x, [a + b, x + b, x - b]), answer: x, result: fa(a) + " × " + fa(b) + " = " + fa(x) };
          }
          w.a = fa(a); w.k = fa(b);
          return ask(ctx.w("timesAs", w), x, optsFa(rng, x, [a + b, x + a, x - a]));
        }
        if (k === "two") {
          if (op !== "+" || c == null || a + b >= c) return null;
          x = c - a - b; w.a = fa(a); w.b = fa(b); w.c = fa(c);
          if (!bars) return ask(ctx.w("two", w), x, optsFa(rng, x, [c - a, a + b, x + 10]));
          return { type: "bar", prompt: ctx.w("two", w), bars: [{ label: ctx.w("money"), parts: [a, b, "?"] }], whole: c,
            options: optsNum(rng, x, [c - a, a + b, x + 10]), answer: x, result: fa(a) + " + " + fa(b) + " = " + fa(a + b) + " ، " + fa(c) + " − " + fa(a + b) + " = " + fa(x) };
        }
        // "pw:a+b" and "on:a+b" add; "off:P-Q", "part:P-Q" and "cmp:P-Q" take Q from P.
        var plus = op === "+";
        if (plus !== (k === "pw" || k === "on") || a > 120 || (!plus && b >= a)) return null;
        x = plus ? a + b : a - b;
        w.a = fa(a); w.b = fa(b); w.c = fa(a);
        if (k === "part") w.a = fa(b);
        s = ctx.w(k, w);
        var wrong = [plus ? Math.abs(a - b) : a + b, x + 10, x - 10, x + 1];
        if (!bars || k === "off" || k === "on") return ask(s, x, optsFa(rng, x, wrong));
        var res = fa(a) + (plus ? " + " : " − ") + fa(b) + " = " + fa(x);
        if (k === "pw") return { type: "bar", prompt: s, bars: [{ label: "", parts: [a, b] }], whole: "?", options: optsNum(rng, x, wrong), answer: x, result: res };
        if (k === "part") return { type: "bar", prompt: s, bars: [{ label: ctx.w("kids"), parts: [b, "?"] }], whole: a, options: optsNum(rng, x, wrong), answer: x, result: res };
        return { type: "bar", prompt: s, bars: [{ label: w.p, parts: [a] }, { label: w.q, parts: [b] }], diff: "?", options: optsNum(rng, x, wrong), answer: x, result: res };
      });
    }
  });

  /* «کسرها» — math-sapling-p9 (Fractions). Name the fraction coloured (halves and quarters after math-sapling-19,
     any after math-sapling-57), colour one (math-sapling-57), pick the shape cut into equal parts (math-sapling-19,
     then thirds and quarters after math-sapling-56), a fraction of a set (math-sapling-58), on the number line
     (math-sapling-59), which is bigger (math-sapling-60), equal fractions (math-sapling-61).
     Cut a shape into equal parts yourself, too. Keys: "n:3/4", "c:2/3", "e:3", "x:2", "s:3/4" (a third of 12: 3 each for 4… the parts and the share), "l:1/4",
     "ln:3/4", "cmp:1/3-1/4", "eq:1/2-4". */
  var UNEQUAL = { 2: [[0.3], [0.65]], 3: [[0.2, 0.5], [0.4, 0.75]], 4: [[0.15, 0.4, 0.7], [0.3, 0.5, 0.85]] };
  function fracName(ctx, a, b) { return ctx.w("frac", { n: ctx.w("nums")[a], d: ctx.w("dens")[b][a === 1 ? 0 : 1] }); }
  B.PRACTICE.push({
    id: "math-sapling-p9", subject: "math", level: "sapling", objectives: ["math.sap.13", "math.sap.14"],
    needs: ["math-sapling-19"], emoji: "🍕", title: "کسرها",
    lessons: ["math-sapling-19", "math-sapling-56", "math-sapling-57", "math-sapling-58", "math-sapling-59",
      "math-sapling-60", "math-sapling-61", "math-sapling-62", "math-sapling-98"],
    words: {
      name: "چه کسری رنگ شده است؟", colour: "{f} را رنگ کن.", equal: "کدام به {p} تکه مساوی بریده شده است؟",
      cut: "این را به {p} تکه مساوی ببر. روی خط‌چین‌ها بزن.",
      set: "{n} {t} را بین {p} نفر مساوی تقسیم کن. {f} {n} چندتاست؟", result: "{f} {n} می‌شود {k}.",
      place: "{f} را روی محور پیدا کن.", lineName: "این نقطه چه کسری است؟", bigger: "کدام بزرگ‌تر است؟",
      eq: "کدام عدد جای «؟» می‌آید تا دو کسر مساوی شوند؟",
      parts: { 2: "دو", 3: "سه", 4: "چهار" },
      things: { "🍬": "آب‌نبات", "🍓": "توت‌فرنگی", "🌰": "گردو", "🍪": "شیرینی" },
      nums: ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت"],
      dens: { 2: ["دوم", "دوم"], 3: ["سوم", "سوم"], 4: ["چهارم", "چهارم"], 5: ["پنجم", "پنجم"], 6: ["ششم", "ششم"], 8: ["هشتم", "هشتم"] },
      frac: "{n}‌{d}"
    },
    make: function (rng, n, ctx) {
      var any = ctx.done(L("sapling-57")), dens = any ? [2, 3, 4, 5, 6, 8] : [2, 4];
      var kinds = ["n", "n", "e", "x"], cuts = ctx.done(L("sapling-56")) ? [2, 3, 4] : [2];
      if (any) kinds.push("c");
      if (ctx.done(L("sapling-58"))) kinds.push("s");
      if (ctx.done(L("sapling-59"))) kinds.push("l", "ln");
      if (ctx.done(L("sapling-60"))) kinds.push("cmp");
      if (ctx.done(L("sapling-61"))) kinds.push("eq");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), b = rng.pick(dens), a = any ? rng.int(1, b - 1) : 1;
        if (k === "e" || k === "x") return k + ":" + rng.pick(cuts);
        if (k === "s") return "s:" + rng.int(2, 4) + "/" + rng.int(2, 4);
        if (k === "cmp") {
          if (rng() < 0.5) { var two = rng.sample([2, 3, 4, 5, 6, 8], 2); return "cmp:1/" + two[0] + "-1/" + two[1]; }
          var d = rng.pick([4, 5, 6, 8]), ab = rng.sample(range(1, d - 1), 2);
          return "cmp:" + ab[0] + "/" + d + "-" + ab[1] + "/" + d;
        }
        if (k === "eq") { var e = rng.pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4]]), m = rng.int(2, 4); return "eq:" + e[0] + "/" + e[1] + "-" + e[1] * m; }
        if (k === "l" || k === "ln") b = rng.pick([2, 3, 4, 5, 6, 8]), a = rng.int(1, b - 1);
        return k + ":" + a + "/" + b;
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:\/(\d+))?(?:-(\d+)(?:\/(\d+))?)?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2], b = m[3] ? +m[3] : null;
        var ok = function (x, y) { return y && [2, 3, 4, 5, 6, 8].indexOf(y) !== -1 && x >= 1 && x < y; };
        if (k === "x") return cuts.indexOf(a) === -1 ? null : { type: "fraction", cut: true, shape: rng.pick(["bread", "rect"]), parts: a, prompt: ctx.w("cut", { p: ctx.w("parts")[a] }) };
        if (k === "e") {
          if (!UNEQUAL[a] || cuts.indexOf(a) === -1) return null;
          var shapes = rng.shuffle([{ shape: "rect", parts: a }].concat(UNEQUAL[a].map(function (c) { return { shape: "rect", cuts: c }; })));
          return { type: "fraction", ask: "equal", shape: "rect", shapes: shapes, prompt: ctx.w("equal", { p: ctx.w("parts")[a] }) };
        }
        if (k === "s") {
          if (a < 2 || a > 4 || b < 2 || b > 4) return null;
          var t = rng.pick(["🍬", "🍓", "🌰", "🍪"]), f1 = fracName(ctx, 1, b), all = a * b;
          return { type: "fraction", set: all, thing: t, parts: b, who: ["👧", "👦", "🧒", "👧"].slice(0, b),
            prompt: ctx.w("set", { n: fa(all), t: ctx.w("things")[t], p: fa(b), f: f1 }), result: ctx.w("result", { f: f1, n: fa(all), k: fa(a) }) };
        }
        if (k === "cmp") {
          var c = +m[4], d = +m[5];
          if (!ok(a, b) || !ok(c, d) || a / b === c / d) return null;
          var big = a / b > c / d ? [a, b] : [c, d];
          return { type: "choose", prompt: ctx.w("bigger"), say: ctx.w("bigger"), answer: big[0] + "/" + big[1],
            options: rng.shuffle([[a, b], [c, d]]).map(function (f) { return { label: fracName(ctx, f[0], f[1]), value: f[0] + "/" + f[1] }; }) };
        }
        if (k === "eq") {
          var to = +m[4];
          if (!ok(a, b) || !to || to % b) return null;
          var x = a * to / b;
          return ask(ctx.w("eq"), x, optsFa(rng, x, [x + 1, x - 1, a + to - b, to - x]), fa(a) + "/" + fa(b) + " = ؟/" + fa(to));
        }
        if (!ok(a, b) || (!any && (b > 4 || a !== 1))) return null;
        var fo = function (x, y) { return { frac: [x, y] }; };
        var wrong = [fo(b - a, b), fo(b, a), fo(a, b + 1)].filter(function (f) { return f.frac[0] !== a || f.frac[1] !== b; });
        var options = rng.shuffle([fo(a, b)].concat(wrong.slice(0, 2)));
        if (k === "n") return { type: "fraction", ask: "name", shape: rng.pick(["circle", "rect", "square"]), parts: b, take: a, options: options, answer: a + "/" + b, prompt: ctx.w("name") };
        if (k === "c") return { type: "fraction", shape: rng.pick(["circle", "rect", "square"]), parts: b, take: a, prompt: ctx.w("colour", { f: fracName(ctx, a, b) }) };
        if (k === "l") return { type: "numline", denom: b, max: 1, ask: "place", at: [a, b], prompt: ctx.w("place", { f: fracName(ctx, a, b) }) };
        return { type: "numline", denom: b, max: 1, ask: "name", mark: [a, b], options: options, answer: a + "/" + b, prompt: ctx.w("lineName") };
      });
    }
  });

  /* «زمان» — math-sapling-p10 (Time). Read and set a clock on the hour and half hour (math-sapling-15), then to five
     minutes (math-sapling-36); how long something took, in hours or minutes (math-sapling-93); the calendar: the
     month after or before, the days in a month, a week later (math-sapling-37). Keys: "r:7:30", "s:4:15", "dh:5-7",
     "dm:10-45" (minutes past the same hour), "ma:6", "mb:6", "dn:3", "wk:5-6". */
  B.PRACTICE.push({
    id: "math-sapling-p10", subject: "math", level: "sapling", objectives: ["math.sap.17"],
    needs: ["math-sapling-15"], emoji: "⏰", title: "ساعت و تقویم",
    lessons: ["math-sapling-15", "math-sapling-36", "math-sapling-37", "math-sapling-93", "math-sapling-95"],
    words: {
      read: "ساعت چند است؟", set: "عقربه‌ها را روی این ساعت بگذار.",
      hours: "فیلم ساعت {a} شروع شد و ساعت {b} تمام شد. چند ساعت طول کشید؟",
      minutes: "کلاس نقاشی ساعت {h} و {a} دقیقه شروع شد و ساعت {h} و {b} دقیقه تمام شد. چند دقیقه طول کشید؟",
      after: "بعد از {m} چه ماهی است؟", before: "قبل از {m} چه ماهی است؟", days: "{m} چند روز دارد؟",
      week: "امروز {d} {m} است. یک هفته بعد چندم {m} است؟",
      months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    },
    make: function (rng, n, ctx) {
      var five = ctx.done(L("sapling-36")), kinds = ["r", "r", "s"];
      if (ctx.done(L("sapling-93"))) kinds.push("dh", "dm");
      if (ctx.done(L("sapling-37"))) kinds.push("ma", "mb", "dn", "wk");
      function mins() { return five ? 5 * rng.int(0, 11) : rng.pick([0, 30]); }
      function pad(mm) { return (mm < 10 ? "0" : "") + mm; }
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "r" || k === "s") return k + ":" + rng.int(1, 12) + ":" + pad(mins());
        if (k === "dh") { var a = rng.int(1, 8); return "dh:" + a + "-" + (a + rng.int(1, 4)); }
        if (k === "dm") { var s = 5 * rng.int(0, 6); return "dm:" + s + "-" + (s + 5 * rng.int(3, 11 - s / 5)); }
        if (k === "wk") return "wk:" + rng.int(1, 22) + "-" + rng.int(0, 11);
        return k + ":" + rng.int(0, k === "dn" ? 10 : 11);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:[:-](\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2], b = m[3] != null ? +m[3] : null, months = ctx.w("months");
        if (k === "r" || k === "s") {
          if (a < 1 || a > 12 || b == null || b > 55 || b % 5 || (!five && b % 30)) return null;
          var t = a + ":" + pad(b);
          if (k === "s") return { type: "clock", ask: "set", time: t, start: "12:00", snap: five ? 5 : 15, prompt: ctx.w("set") };
          var w = [(a % 12 + 1) + ":" + pad(b), a + ":" + pad((b + 30) % 60), (b / 5 || 12) + ":" + pad(a % 12 * 5)];
          var opts = [t];
          rng.shuffle(w).forEach(function (o) { if (opts.indexOf(o) === -1 && opts.length < 3) opts.push(o); });
          return { type: "clock", time: t, options: rng.shuffle(opts), snap: five ? 5 : 15, prompt: ctx.w("read") };
        }
        if (k === "dh") return b == null || b <= a || b > 12 ? null : ask(ctx.w("hours", { a: fa(a), b: fa(b) }), b - a, optsFa(rng, b - a, [b - a + 1, b - a - 1, a + b]));
        if (k === "dm") {
          if (b == null || b <= a || b > 55 || a % 5 || b % 5) return null;
          var h = rng.int(2, 6), x = b - a;
          return ask(ctx.w("minutes", { h: fa(h), a: fa(a), b: fa(b) }), x, optsFa(rng, x, [x + 5, x - 5, x + 10, b]));
        }
        if (k === "wk") {
          if (b == null || b > 11 || a < 1 || a > 22) return null;
          return ask(ctx.w("week", { d: fa(a), m: months[b] }), a + 7, optsFa(rng, a + 7, [a + 1, a + 6, a + 8, a + 14]));
        }
        if (a > 11) return null;
        if (k === "dn") return a > 10 ? null : ask(ctx.w("days", { m: months[a] }), a < 6 ? 31 : 30, rng.shuffle(["۲۹", "۳۰", "۳۱"]));
        var right = months[(a + (k === "ma" ? 1 : 11)) % 12], wrongM = months[(a + (k === "ma" ? 11 : 1)) % 12], other = months[(a + 6) % 12];
        var p = ctx.w(k === "ma" ? "after" : "before", { m: months[a] });
        return { type: "choose", prompt: p, say: p, options: rng.shuffle([right, wrongM, other]), answer: right };
      });
    }
  });

  /* «اندازه‌گیری» — math-sapling-p11 (Measures). Count the units along a thing (math-sapling-9) and read a ruler in
     centimetres (math-sapling-30); choose the unit: centimetre or metre (math-sapling-31), gram or kilogram
     (math-sapling-38), litre (math-sapling-39), millimetre and kilometre (math-sapling-94); change metres to
     centimetres (math-sapling-31), kilograms to grams (math-sapling-38), centimetres to millimetres and kilometres to
     metres (math-sapling-94); weigh on a balance with kilogram weights (math-sapling-38).
     Keys: "cnt:7", "ru:9", "u:2" (a thing from the list), "cv:3-m", "sc:4". */
  var UNIT_OF = [["✏️", "cm", 31], ["🚪", "m", 31], ["🏫", "m", 31], ["📱", "cm", 31], ["🍉", "kg", 38], ["🍎", "g", 38], ["🧈", "g", 38], ["🧳", "kg", 38],
    ["🍼", "l", 39], ["🪣", "l", 39], ["🐜", "mm", 94], ["🛣️", "km", 94]];
  var UNIT_SET = { cm: ["cm", "m", "km"], m: ["m", "cm", "km"], mm: ["mm", "cm", "m"], km: ["km", "m", "cm"], kg: ["kg", "g", "l"], g: ["g", "kg", "l"], l: ["l", "kg", "m"] };
  var CONVERT = { m: [100, "cm", 31], kg: [1000, "g", 38], cm: [10, "mm", 94], km: [1000, "m", 94] };
  B.PRACTICE.push({
    id: "math-sapling-p11", subject: "math", level: "sapling", objectives: ["math.sap.15", "math.sap.16"],
    needs: ["math-sapling-9"], emoji: "📏", title: "اندازه‌گیری",
    lessons: ["math-sapling-9", "math-sapling-30", "math-sapling-31", "math-sapling-16", "math-sapling-38",
      "math-sapling-39", "math-sapling-76", "math-sapling-79", "math-sapling-99", "math-sapling-94",
      "math-sapling-95"],
    words: {
      count: "هر خانه یک سانتی‌متر است. {t} چند سانتی‌متر است؟ روی هر خانه بزن.",
      ruler: "{t} چند سانتی‌متر است؟",
      unit: "{t} را با کدام واحد اندازه می‌گیریم؟",
      convert: "{n} {from} چند {to} است؟",
      scale: "{t} را با وزنه‌های کیلویی وزن کن.", scaleQ: "{t} چند کیلوگرم است؟", kilo: "کیلو",
      weighed: { "🍉": "هندوانه", "🎃": "کدو", "🍍": "آناناس" },
      things: { "✏️": "مداد", "🖍️": "مداد شمعی", "🥕": "هویج", "🍃": "برگ", "🚪": "بلندی در", "🏫": "درازی حیاط مدرسه", "📱": "تلفن", "🍉": "وزن هندوانه", "🍎": "وزن یک سیب", "🧈": "وزن یک تکه کره", "🧳": "وزن چمدان", "🍼": "آب یک بطری بزرگ", "🪣": "آب یک سطل", "🐜": "درازی مورچه", "🛣️": "راه تهران تا قم" },
      units: { mm: "میلی‌متر", cm: "سانتی‌متر", m: "متر", km: "کیلومتر", g: "گرم", kg: "کیلوگرم", l: "لیتر" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["cnt"];
      if (ctx.done(L("sapling-30"))) kinds.push("ru", "ru");
      if (ctx.done(L("sapling-31"))) kinds.push("u", "cv");
      if (ctx.done(L("sapling-38"))) kinds.push("sc");
      var units = UNIT_OF.map(function (u, i) { return i; }).filter(function (i) { return ctx.done(L("sapling-" + UNIT_OF[i][2])); });
      var conv = Object.keys(CONVERT).filter(function (u) { return ctx.done(L("sapling-" + CONVERT[u][2])); });
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "cnt") return "cnt:" + rng.int(3, 9);
        if (k === "ru") return "ru:" + rng.int(2, 14);
        if (k === "u") return "u:" + rng.pick(units);
        if (k === "cv") return "cv:" + rng.int(2, 9) + "-" + rng.pick(conv);
        return "sc:" + rng.int(2, 7);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:-([a-z]+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], v = +m[2], th = ctx.w("things"), un = ctx.w("units");
        if (k === "cnt") { var tc = rng.pick(["✏️", "🖍️", "🥕"]); return v > 12 ? null : { type: "measure", ask: "count", unit: "📏", bars: [{ thing: tc, len: v }], options: near(rng, v, 1, 1), prompt: ctx.w("count", { t: th[tc] }) }; }
        if (k === "ru") { var tr = rng.pick(["✏️", "🍃", "🥕"]); return v < 1 || v > 14 ? null : { type: "measure", tool: "ruler", value: v, pic: tr, max: 15, options: near(rng, v, 1, 1, 15), prompt: ctx.w("ruler", { t: th[tr] }) }; }
        if (k === "u") {
          var u = UNIT_OF[v];
          if (!u || units.indexOf(v) === -1) return null;
          var set = UNIT_SET[u[1]].filter(function (x) { return x !== "km" && x !== "mm" || ctx.done(L("sapling-94")); });
          if (set.length < 2) return null;
          var p = ctx.w("unit", { t: th[u[0]] });
          return { type: "choose", show: u[0], prompt: p, say: p, options: rng.shuffle(set).map(function (x) { return { label: un[x], value: x }; }), answer: u[1] };
        }
        if (k === "cv") {
          var c = CONVERT[m[3]];
          if (!c || conv.indexOf(m[3]) === -1 || v > 9) return null;
          var x = v * c[0];
          return ask(ctx.w("convert", { n: fa(v), from: un[m[3]], to: un[c[1]] }), x, optsFa(rng, x, [x / 10, x * 10, v + c[0]]));
        }
        if (v < 2 || v > 7) return null;
        var ts = rng.pick(["🍉", "🎃", "🍍"]), wt = ctx.w("weighed")[ts], tray = rng.shuffle([1, 1, 2, 5].concat(v > 5 ? [2] : []));
        return { type: "balance", left: [{ pic: ts, mass: v, say: wt }], open: "right", tray: tray, unit: ctx.w("kilo"),
          prompt: ctx.w("scale", { t: wt }), question: ctx.w("scaleQ", { t: wt }), options: near(rng, v, 1, 1), answer: v };
      });
    }
  });

  /* «پول» — math-sapling-p12 (Money). How much money is shown (math-sapling-10); two prices added, and paying the
     exact price from a wallet (math-sapling-11); the change from a bill (math-sapling-21). Amounts in thousands of
     toman. Keys: "b:20-5-2" (the notes), "p:0-2", "w:1" and "ch:50-2" (goods by their place in GOODS). */
  var PRICE = { "🍞": 6, "🥛": 18, "🧀": 35, "🍎": 25, "🍊": 30, "📒": 15, "✏️": 5, "🍯": 45, "🥜": 40, "🥚": 12 };
  var GOODS = ["🍞", "🥛", "🧀", "🍎", "🍊", "📒", "✏️", "🍯", "🥜", "🥚"];
  B.PRACTICE.push({
    id: "math-sapling-p12", subject: "math", level: "sapling", objectives: ["math.sap.18"],
    needs: ["math-sapling-10"], emoji: "💵", title: "پول",
    lessons: ["math-sapling-10", "math-sapling-11", "math-sapling-21"],
    words: {
      bills: "این پول روی هم چند هزار تومان است؟", sum: "{a} و {b} خریدیم. روی هم چقدر شد؟", pay: "پول {a} را درست بده.",
      change: "{p} یک اسکناس {m} هزار تومانی داد و {a} خرید که {c} هزار تومان بود. چقدر پس گرفت؟",
      goods: { "🍞": "نان سنگک", "🥛": "شیر", "🧀": "پنیر", "🍎": "سیب", "🍊": "پرتقال", "📒": "دفتر", "✏️": "مداد", "🍯": "عسل", "🥜": "پسته", "🥚": "تخم‌مرغ" },
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه", "ترانه", "پرهام", "شیرین", "بابک", "دلارام", "امید"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["b", "b"];
      if (ctx.done(L("sapling-11"))) kinds.push("p", "w");
      if (ctx.done(L("sapling-21"))) kinds.push("ch", "ch");
      var goods = ctx.w("goods");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "b") return "b:" + rng.sample([50, 20, 20, 10, 10, 5, 5, 2, 1], rng.int(2, 4)).sort(function (a, b) { return b - a; }).join("-");
        if (k === "p") return "p:" + rng.sample(range(0, GOODS.length - 1), 2).join("-");
        if (k === "w") return "w:" + rng.int(0, GOODS.length - 1);
        var gi = rng.int(0, GOODS.length - 1), price = PRICE[GOODS[gi]];
        return "ch:" + (price < 20 ? 20 : price < 50 ? 50 : 100) + "-" + gi;
      }, function (key) {
        var m = /^([a-z]+):(.+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], parts = m[2].split("-");
        if (k === "b") {
          var bills = parts.map(Number), s = bills.reduce(function (a, b) { return a + b; }, 0);
          if (bills.some(function (v) { return [1, 2, 5, 10, 20, 50].indexOf(v) === -1; })) return null;
          return { type: "money", prompt: ctx.w("bills"), bills: bills, options: optsNum(rng, s, [s + 10, s - 1, s + 5, s - 10]) };
        }
        // goods are given by their place in GOODS ("p:0-2"); the change also starts with the note ("ch:50-2")
        if (k !== "b") parts = parts.map(function (v, i) { return k === "ch" && i === 0 ? v : GOODS[+v]; });
        if (parts.some(function (v) { return !v; })) return null;
        var item = function (g) { return { emoji: g, name: goods[g], price: PRICE[g] }; };
        if (k === "p") {
          if (parts.length !== 2 || !PRICE[parts[0]] || !PRICE[parts[1]]) return null;
          var tot = PRICE[parts[0]] + PRICE[parts[1]];
          return { type: "money", prompt: ctx.w("sum", { a: goods[parts[0]], b: goods[parts[1]] }), items: parts.map(item), options: optsNum(rng, tot, [tot + 10, tot - 10, tot + 1]) };
        }
        if (k === "w") {
          var g = parts[0], pr = PRICE[g];
          if (!pr) return null;
          // a wallet that can pay it exactly: the bills that make the price, and a few more
          var need = [], left = pr;
          [50, 20, 10, 5, 2, 1].forEach(function (b) { while (left >= b) { need.push(b); left -= b; } });
          return { type: "money", prompt: ctx.w("pay", { a: goods[g] }), items: [item(g)], wallet: rng.shuffle(need.concat(rng.sample([1, 2, 5, 10, 20], 2))) };
        }
        var paid = +parts[0], gc = parts[1];
        if (!PRICE[gc] || [20, 50, 100].indexOf(paid) === -1 || PRICE[gc] >= paid) return null;
        var x = paid - PRICE[gc], people = ctx.w("people");
        var p = ctx.w("change", { p: people[rng.int(0, people.length - 1)], m: fa(paid), a: goods[gc], c: fa(PRICE[gc]) });
        return askPic(p, x, optsFa(rng, x, [x + 10, x - 5, x + 5, PRICE[gc]]), gc);
      });
    }
  });

  /* «محیط و مساحت» — math-sapling-p13 (Perimeter and area). The perimeter of a rectangle from its sides
     (math-sapling-76); squares on a grid to count for the area, and a shape to draw with a given area
     (math-sapling-77); the area of a rectangle as rows × columns (math-sapling-78); the sides around a shape on the
     grid to count for the perimeter (math-sapling-79). Keys: "ps:5-3", "ac:4-3", "ad:8", "ar:6-4", "pc:4-2". */
  B.PRACTICE.push({
    id: "math-sapling-p13", subject: "math", level: "sapling", objectives: ["math.sap.19"],
    needs: ["math-sapling-76"], emoji: "📐", title: "محیط و مساحت",
    lessons: ["math-sapling-76", "math-sapling-77", "math-sapling-78", "math-sapling-79", "math-sapling-95",
      "math-sapling-98"],
    words: {
      perSides: "یک مستطیل {w} سانتی‌متر در {h} سانتی‌متر. محیطش چند سانتی‌متر است؟",
      areaCount: "مساحت این شکل چند مربع است؟ روی هر مربع بزن.",
      draw: "یک شکل بکش که مساحتش {n} مربع باشد. هر شکلی که دوست داری.",
      rows: "یک فرش {h} ردیف دارد و در هر ردیف {w} مربع. مساحتش چند مربع است؟",
      perCount: "محیط این مستطیل را بشمار: روی هر ضلع کوچک دورش بزن."
    },
    make: function (rng, n, ctx) {
      var kinds = ["ps"];
      if (ctx.done(L("sapling-77"))) kinds.push("ac", "ad");
      if (ctx.done(L("sapling-78"))) kinds.push("ar", "ar");
      if (ctx.done(L("sapling-79"))) kinds.push("pc", "pc");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "ad") return "ad:" + rng.int(5, 12);
        return k + ":" + rng.int(2, k === "ar" || k === "ps" ? 9 : 5) + "-" + rng.int(1, k === "ar" || k === "ps" ? 8 : 4);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:-(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], w = +m[2], h = m[3] ? +m[3] : 0, per = 2 * (w + h), area = w * h;
        if (k === "ad") return w > 12 ? null : { type: "grid", ask: "draw", size: [6, 5], area: w, prompt: ctx.w("draw", { n: fa(w) }) };
        if (!h || w === h && k === "ps") return null;
        if (k === "ps") return ask(ctx.w("perSides", { w: fa(w), h: fa(h) }), per, optsFa(rng, per, [w + h, area, per + 2]));
        if (k === "ar") return ask(ctx.w("rows", { w: fa(w), h: fa(h) }), area, optsFa(rng, area, [w + h, per, area + w]));
        if (w > 6 || h > 4) return null;
        var x0 = 1 + Math.floor((8 - w) / 2), y0 = 1 + Math.floor((6 - h) / 2), cells = [];
        for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) cells.push([x0 + x, y0 + y]);
        if (k === "ac") return { type: "grid", ask: "area", size: [8, 6], cells: cells, prompt: ctx.w("areaCount"), options: optsNum(rng, area, [per, area + 1, area - 1]) };
        return { type: "grid", ask: "perimeter", size: [8, 6], cells: cells, prompt: ctx.w("perCount"), options: optsNum(rng, per, [area, per + 2, per - 2]) };
      });
    }
  });

  /* «نمودار» — math-sapling-p14 (Graphs). A picture graph (math-sapling-20), the same data to sort into a picture
     graph first (math-sapling-82), and bar charts (math-sapling-83), about fruit, how children come to school and
     the weather; then a question: how many, how many more, or which is most. Key: the graph, the theme and the
     question, "bar:school:more"; the numbers are new each time. */
  var GRAPH = { fruit: ["🍎", "🍌", "🍇", "🍊"], school: ["🚶", "🚌", "🚗", "🚲"], weather: ["☀️", "🌧️", "☁️", "❄️"] };
  B.PRACTICE.push({
    id: "math-sapling-p14", subject: "math", level: "sapling", objectives: ["math.sap.22"],
    needs: ["math-sapling-20"], emoji: "📊", title: "نمودار",
    lessons: ["math-sapling-20", "math-sapling-82", "math-sapling-83", "math-sapling-99", "math-sapling-84",
      "math-sapling-85"],
    words: {
      make: "هر تصویر را در ستون خودش بگذار.",
      most: "کدام از همه بیشتر است؟",
      themes: {
        fruit: { title: "میوه دلخواه بچه‌های کلاس", labels: ["سیب", "موز", "انگور", "پرتقال"], n: "چند نفر {a} را دوست دارند؟", more: "چند نفر بیشتر {a} را دوست دارند تا {b}؟" },
        school: { title: "بچه‌ها چطور به مدرسه می‌آیند؟", labels: ["پیاده", "با اتوبوس", "با ماشین", "با دوچرخه"], n: "چند نفر {a} می‌آیند؟", more: "چند نفر بیشتر {a} می‌آیند تا {b}؟" },
        weather: { title: "هوای روزهای یک ماه", labels: ["آفتابی", "بارانی", "ابری", "برفی"], n: "چند روز {a} بود؟", more: "روزهای {a} چندتا بیشتر از روزهای {b} بود؟" }
      }
    },
    make: function (rng, n, ctx) {
      var kinds = ["pic"];
      if (ctx.done(L("sapling-82"))) kinds.push("make");
      if (ctx.done(L("sapling-83"))) kinds.push("bar", "bar");
      return run(n, ctx, function () {
        return rng.pick(kinds) + ":" + rng.pick(["fruit", "school", "weather"]) + ":" + rng.pick(["n", "more", "most"]);
      }, function (key) {
        var m = /^([a-z]+):([a-z]+):([a-z]+)$/.exec(key), th = m && ctx.w("themes")[m[2]];
        if (!m || kinds.indexOf(m[1]) === -1 || !th || ["n", "more", "most"].indexOf(m[3]) === -1) return null;
        var max = m[1] === "bar" ? 10 : 7, ns = rng.sample(range(1, max), 4);
        var rows = GRAPH[m[2]].map(function (pic, i) { return { label: th.labels[i], pic: pic, n: ns[i] }; });
        var s = { type: "chart", title: th.title, rows: rows };
        if (m[1] === "bar") { s.bars = true; s.max = 10; }
        if (m[1] === "make") { s.make = true; s.prompt = ctx.w("make"); }
        var two = rng.sample([0, 1, 2, 3], 2).sort(function (a, b) { return ns[b] - ns[a]; });
        if (m[3] === "most") {
          var top = ns.indexOf(Math.max.apply(null, ns));
          s.question = ctx.w("most");
          s.options = rows.map(function (r, i) { return { label: r.pic + " " + r.label, value: String(i) }; });
          s.answer = String(top);
          return s;
        }
        var x = m[3] === "n" ? ns[two[0]] : ns[two[0]] - ns[two[1]];
        s.question = m[3] === "n" ? th.n.replace("{a}", th.labels[two[0]]) : th.more.replace("{a}", th.labels[two[0]]).replace("{b}", th.labels[two[1]]);
        s.options = optsNum(rng, x, [x + 1, x - 1, ns[two[0]] + ns[two[1]], x + 2]);
        s.answer = x;
        return s;
      });
    }
  });

  /* «الگوها» — math-sapling-p15 (Patterns). Number sequences that grow or shrink by the same step, to fill
     (math-sapling-12, and zoj and fard), the rule of a sequence and doubling (math-sapling-50), growing shape
     patterns made of sticks (math-sapling-51), and times-table sequences (math-sapling-68).
     Keys: "up:4+3", "down:50-5", "oe:37", "rule:6+4", "dbl:3", "st:sq-4", "tt:7". */
  var STICKS = { sq: [4, 3], tri: [3, 2], hex: [6, 5] };
  B.PRACTICE.push({
    id: "math-sapling-p15", subject: "math", level: "sapling", objectives: ["math.sap.6"],
    needs: ["math-sapling-12"], emoji: "🔁", title: "الگوها",
    lessons: ["math-sapling-12", "math-sapling-46", "math-sapling-47", "math-sapling-18", "math-sapling-50",
      "math-sapling-51", "math-sapling-63", "math-sapling-68", "math-sapling-90", "math-sapling-92",
      "math-sapling-96"],
    words: {
      fill: "الگو را پیدا کن و جاهای خالی را پر کن.",
      oe: "{n} زوج است یا فرد؟", even: "زوج", odd: "فرد",
      rule: "قانون این الگو چیست؟", plus: "هر بار {d} تا بیشتر", minus: "هر بار {d} تا کمتر", double: "هر بار دو برابر",
      sticks: "با چوب کبریت {shape} می‌سازیم: یک {shape} {a} چوب، دو {shape} {b} چوب، سه {shape} {c} چوب. {k} {shape} چند چوب می‌خواهد؟",
      shapes: { sq: "مربع", tri: "مثلث", hex: "شش‌ضلعی" }, count: { 4: "چهار", 5: "پنج" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["up", "up", "down", "oe"];
      if (ctx.done(L("sapling-50"))) kinds.push("rule", "dbl");
      if (ctx.done(L("sapling-51"))) kinds.push("st");
      if (ctx.done(L("sapling-68"))) kinds.push("tt");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), d = rng.pick([2, 3, 4, 5, 10]);
        if (k === "up" || k === "rule") return k + ":" + rng.int(1, 30) + (k === "rule" && rng() < 0.3 ? "-" : "+") + d;
        if (k === "down") return "down:" + (d * 5 + rng.int(0, 40)) + "-" + d;
        if (k === "oe") return "oe:" + rng.int(11, 99);
        if (k === "dbl") return "dbl:" + rng.int(1, 6);
        if (k === "st") return "st:" + rng.pick(Object.keys(STICKS)) + "-" + rng.int(4, 5);
        return "tt:" + rng.int(3, 9);
      }, function (key) {
        var m = /^([a-z]+):([a-z]+-)?(\d+)(?:([-+])(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[3], d = m[5] ? +m[5] : 0, seq, blanks, right;
        function fill(seq2, nb) {
          var bl = rng.sample([2, 3, 4, 5].slice(0, seq2.length - 2), nb).sort();
          var rt = bl.map(function (i) { return seq2[i]; });
          var bad = [rt[0] + 1, rt[0] - 1, rt[0] + 10, rt[0] * 2].filter(function (v) { return v >= 0 && seq2.indexOf(v) === -1; });
          return { type: "pattern", prompt: ctx.w("fill"), say: ctx.w("fill"), ltr: true, seq: seq2, blanks: bl, options: rng.shuffle(rt.concat(rng.sample(bad, 2))) };
        }
        if (k === "up" || k === "down") {
          if (!d || (k === "down") !== (m[4] === "-")) return null;
          seq = range(0, 5).map(function (i) { return k === "up" ? a + i * d : a - i * d; });
          return seq[5] < 0 ? null : fill(seq, rng.pick([1, 2]));
        }
        if (k === "tt") return a < 2 || a > 10 ? null : fill(range(1, 6).map(function (i) { return i * a; }), 2);
        if (k === "dbl") return a > 6 ? null : fill(range(0, 4).map(function (i) { return a * Math.pow(2, i); }), 1);
        if (k === "oe") {
          var p = ctx.w("oe", { n: fa(a) });
          return { type: "choose", ltr: true, show: fa(a), prompt: p, say: p, options: [{ label: ctx.w("even"), value: "even" }, { label: ctx.w("odd"), value: "odd" }], answer: a % 2 ? "odd" : "even" };
        }
        if (k === "rule") {
          if (!d) return null;
          var minus = m[4] === "-", start = minus ? a + 4 * d : a;
          seq = range(0, 3).map(function (i) { return minus ? start - i * d : start + i * d; });
          var opt = function (t, dd) { return { label: ctx.w(t, { d: fa(dd) }), value: t + dd }; };
          var opts = [opt(minus ? "minus" : "plus", d), opt(minus ? "plus" : "minus", d), opt(minus ? "minus" : "plus", d + 1)];
          return { type: "choose", ltr: true, show: seq.map(fa).join(" ، ") + " ، …", prompt: ctx.w("rule"), say: ctx.w("rule"), stack: true,
            options: rng.shuffle(opts), answer: (minus ? "minus" : "plus") + d };
        }
        var sh = m[2] && m[2].slice(0, -1), st = STICKS[sh];
        if (!st || (a !== 4 && a !== 5)) return null;
        var val = function (i) { return st[0] + (i - 1) * st[1]; }, xs = val(a);
        var sp = ctx.w("sticks", { shape: ctx.w("shapes")[sh], a: fa(val(1)), b: fa(val(2)), c: fa(val(3)), k: ctx.w("count")[a] });
        return ask(sp, xs, optsFa(rng, xs, [xs + 1, xs - 1, st[0] * a, xs + st[1]]));
      });
    }
  });

  /* ================= More practice for each lesson's set (CURRICULUM.md, "Practice in the course") ================= */

  /* «بده و بشمار» — math-seed-p11 (Give me n). Which group has as many as the number said (math-seed-1); give an
     animal as many as it asks for (math-seed-3); count the beats of a drum or the hops of a frog (math-seed-14); after
     math-seed-35 feed «۲ + ۳» (the sign shows a sum). Keys: "g4", "f7", "b5", "ab:2+3". */
  B.PRACTICE.push({
    id: "math-seed-p11", subject: "math", level: "seed", objectives: ["math.seed.4", "math.seed.2"],
    needs: ["math-seed-1"], emoji: "🥕", title: "بده و بشمار",
    lessons: ["math-seed-1", "math-seed-11", "math-seed-12", "math-seed-2", "math-seed-3", "math-seed-14",
      "math-seed-15", "math-seed-16", "math-seed-10", "math-seed-29", "math-seed-30", "math-seed-34", "math-seed-35",
      "math-seed-37", "math-seed-38", "math-seed-48", "math-seed-50"],
    words: {
      group: "کدام دسته {n} تا دارد؟ بشمار و رویش بزن.",
      feed: "{animal} {n} تا {food} می‌خواهد. به او بده.",
      sum: "روی تابلو را ببین: {a} و {b}. همه را به {animal} بده.",
      drum: "گوش کن و بشمار. طبل چند بار زد؟", frog: "نگاه کن و بشمار. قورباغه چند بار پرید؟",
      animals: { "🐰": "خرگوش", "🐈": "گربه", "🐔": "مرغ", "🐿️": "سنجاب", "🐒": "میمون", "🐦": "گنجشک" },
      foods: { "🥕": "هویج", "🐟": "ماهی", "🌽": "ذرت", "🌰": "فندق", "🍌": "موز", "🍒": "گیلاس" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["g"], max = ctx.done(L("seed-2")) ? 10 : 5;
      if (ctx.done(L("seed-3"))) kinds.push("f", "f");
      if (ctx.done(L("seed-14"))) kinds.push("b");
      if (ctx.done(L("seed-35"))) kinds.push("ab");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "ab") { var a = rng.int(1, 4); return "ab:" + a + "+" + rng.int(1, 5 - a); }
        return k + rng.int(2, k === "b" ? Math.min(max, 8) : max);
      }, function (key) {
        var m = /^(f|b|g)(\d+)$/.exec(key), A = rng.pick(FEED), an = ctx.w("animals")[A[0]], fo = ctx.w("foods")[A[1]];
        if (m) {
          var x = +m[2];
          if (x > max || kinds.indexOf(m[1]) === -1) return null;
          if (m[1] === "g") {
            var th = rng.pick(["🐞", "🍓", "⭐", "🐟", "🌸"]), gp = ctx.w("group", { n: fa(x) });
            return { type: "choose", prompt: gp, say: gp, pic: true, stack: x > 5, answer: String(x),
              options: near(rng, x, 1, 1, max).map(function (v) { return { label: times(th, v), value: String(v) }; }) };
          }
          if (m[1] === "f") return { type: "feed", animal: A[0], food: A[1], n: x, max: Math.min(x + 3, 12), prompt: ctx.w("feed", { animal: an, n: fa(x), food: fo }) };
          var frog = rng() < 0.5;
          return { type: "count", beats: true, thing: frog ? "🐸" : undefined, n: x, options: near(rng, x, 1, 1, 10), ask: ctx.w(frog ? "frog" : "drum") };
        }
        m = /^ab:(\d)\+(\d)$/.exec(key);
        if (!m || kinds.indexOf("ab") === -1 || +m[1] + +m[2] > 5) return null;
        return { type: "feed", a: +m[1], b: +m[2], animal: A[0], food: A[1], max: 8, prompt: ctx.w("sum", { a: fa(m[1]), b: fa(m[2]), animal: an }) };
      });
    }
  });

  /* «عددها به ترتیب» — math-seed-p12 (Number order). Dot cards from fewest to most (math-seed-1); numerals in order
     (math-seed-9, with ۰ after math-seed-29) and the next number; one more and one less on the number line
     (math-seed-30); counting back (math-seed-32). Keys: "d4", "n:3-5" (from 3, five cards), "nx:4", "m:6+1", "bk:5". */
  B.PRACTICE.push({
    id: "math-seed-p12", subject: "math", level: "seed", objectives: ["math.seed.1", "math.seed.7"],
    needs: ["math-seed-1"], emoji: "🪜", title: "عددها به ترتیب",
    lessons: ["math-seed-1", "math-seed-11", "math-seed-12", "math-seed-2", "math-seed-3", "math-seed-14",
      "math-seed-15", "math-seed-4", "math-seed-17", "math-seed-19", "math-seed-22", "math-seed-26", "math-seed-9",
      "math-seed-10", "math-seed-29", "math-seed-30", "math-seed-31", "math-seed-32", "math-seed-33", "math-seed-39",
      "math-seed-40", "math-seed-41", "math-seed-47", "math-seed-48", "math-sprout-4", "math-sprout-10"],
    words: {
      dots: "از کم به زیاد بچین.", nums: "عددها را از کوچک به بزرگ بچین.", next: "بعدی کدام عدد است؟",
      more: "قورباغه روی {a} است. یک خانه جلو می‌پرد. به کجا می‌رسد؟", less: "قورباغه روی {a} است. یک خانه عقب می‌پرد. به کجا می‌رسد؟",
      back: "از {a} برعکس بشمار و بچین."
    },
    make: function (rng, n, ctx) {
      var nums = ctx.done(L("seed-9")), max = ctx.done(L("seed-2")) ? 10 : 5, lo = ctx.done(L("seed-29")) ? 0 : 1;
      var kinds = ["d"];
      if (nums) kinds.push("n", "nx", "nx");
      if (ctx.done(L("seed-30"))) kinds.push("m", "m");
      if (ctx.done(L("seed-32"))) kinds.push("bk");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "d") return "d" + rng.int(3, 5);
        if (k === "n") { var c = rng.int(4, 5); return "n:" + rng.int(lo, max - c + 1) + "-" + c; }
        if (k === "nx") return "nx:" + rng.int(lo, max - 4);
        if (k === "m") return "m:" + rng.int(1, max - 1) + rng.pick(["+1", "-1"]);
        return "bk:" + rng.int(4, max);
      }, function (key) {
        var m = /^([a-z]+):?(\d+)(?:([-+])1|-(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2];
        if (k === "d") return a > 5 ? null : { type: "order", prompt: ctx.w("dots"), say: ctx.w("dots"), ltr: true, items: range(1, a).map(function (v) { return { dots: v }; }) };
        if (k === "n") { var c = +m[4]; return !c || a < lo || a + c - 1 > max ? null : { type: "order", prompt: ctx.w("nums"), say: ctx.w("nums"), ltr: true, items: range(a, a + c - 1) }; }
        if (k === "nx") { if (a < lo || a + 4 > max) return null; var seq = range(a, a + 4); return { type: "pattern", prompt: ctx.w("next"), say: ctx.w("next"), ltr: true, seq: seq, blanks: [4], options: rng.shuffle([a + 4, a + 3, a + 5 <= 10 ? a + 5 : a + 2]) }; }
        if (k === "m") {
          var x = m[3] === "+" ? a + 1 : a - 1;
          if (x < 0 || x > 10 || !m[3]) return null;
          var p = ctx.w(m[3] === "+" ? "more" : "less", { a: fa(a) });
          return { type: "numline", a: a, b: m[3] === "+" ? 1 : -1, options: near(rng, x, 1, 0, 10), prompt: p, say: p };
        }
        if (a < 3 || a > max) return null;
        var bp = ctx.w("back", { a: fa(a) });
        return { type: "order", prompt: bp, say: bp, ltr: true, items: range(lo, a).reverse() };
      });
    }
  });

  /* «دو دست، ده انگشت» — math-seed-p13 (Parts of five and ten). Fingers held up to count (they stay), how many are
     down when some are up, dots to pair with fingers (math-seed-13); after math-seed-33 making a number on a frame.
     Keys: "h7", "dn:5-3" (fingers on the hands, fingers up), "pr:1-3-4", "mk6". */
  B.PRACTICE.push({
    id: "math-seed-p13", subject: "math", level: "seed", objectives: ["math.seed.3", "math.seed.8"],
    needs: ["math-seed-13"], emoji: "🖐️", title: "دو دست، ده انگشت",
    lessons: ["math-seed-13", "math-seed-2", "math-seed-18", "math-seed-28", "math-seed-33", "math-seed-34",
      "math-seed-36", "math-seed-48", "math-seed-50", "math-sprout-1", "math-sprout-14", "math-sprout-15"],
    words: {
      hands: "چند انگشت بالاست؟", down: "{all} انگشت داری. {up} انگشت بالا ببر. چند انگشت پایین مانده است؟",
      pairs: "هر دسته نقطه را با دستی جفت کن که همان‌قدر انگشت دارد", make: "{n} را در قاب بساز."
    },
    make: function (rng, n, ctx) {
      var ten = ctx.done(L("seed-28")), kinds = ["h", "dn", "pr"];
      if (ctx.done(L("seed-33"))) kinds.push("mk");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "h") return "h" + rng.int(1, ten ? 10 : 5);
        if (k === "dn") { var all = ten && rng() < 0.5 ? 10 : 5; return "dn:" + all + "-" + rng.int(1, all - 1); }
        if (k === "pr") return "pr:" + rng.sample(range(1, 5), 3).sort().join("-");
        return "mk" + rng.int(3, ten ? 10 : 5);
      }, function (key) {
        var m = /^(h|mk)(\d+)$/.exec(key);
        if (m) {
          var x = +m[2];
          if (kinds.indexOf(m[1]) === -1 || x > (ten ? 10 : 5) || x < 1) return null;
          if (m[1] === "mk") return { type: "make", n: x, prompt: ctx.w("make", { n: fa(x) }) };
          return { type: "count", show: "fingers", n: x, options: near(rng, x, 1, 1, 10), ask: ctx.w("hands") };
        }
        m = /^dn:(\d+)-(\d+)$/.exec(key);
        if (m) {
          var all = +m[1], up = +m[2];
          if ((all !== 5 && all !== 10) || (all === 10 && !ten) || up < 1 || up >= all) return null;
          return ask(ctx.w("down", { all: fa(all), up: fa(up) }), all - up, nearFa(rng, all - up, 1, 0, all));
        }
        m = /^pr:(\d)-(\d)-(\d)$/.exec(key);
        if (!m) return null;
        return { type: "pairs", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: rng.shuffle([+m[1], +m[2], +m[3]]).map(function (v) { return [{ dots: v }, { fingers: v }]; }) };
      });
    }
  });

  /* «بزرگ‌تر، درازتر، جادارتر» — math-seed-p14 (Size and order). The biggest or smallest of three animals
     (math-seed-4); what holds more (math-seed-18); the same thing in three or four sizes, and strips, to put in order
     (math-seed-19). Keys: "big:0-2-5-b", "cap:1", "ord:🐻-4" … as indexes: "ord:3-4", "bar:4". */
  var SIZES = ["🐘", "🐎", "🐕", "🐈", "🐭", "🐜"]; // biggest first
  var HOLDS = [["🪣", "☕"], ["🛁", "🥣"], ["🫖", "🥄"], ["🧺", "👜"], ["🚌", "🚗"]]; // holds more first
  var ORDER_PICS = ["🐻", "🌳", "🎈", "⭐", "🍎", "🐟"];
  B.PRACTICE.push({
    id: "math-seed-p14", subject: "math", level: "seed", objectives: ["math.seed.10", "math.seed.11"],
    needs: ["math-seed-4"], emoji: "🐘", title: "بزرگ و کوچک",
    lessons: ["math-seed-4", "math-seed-16", "math-seed-17", "math-seed-18", "math-seed-19", "math-seed-5",
      "math-seed-20", "math-seed-6", "math-seed-21", "math-seed-22", "math-seed-7", "math-seed-23", "math-seed-24",
      "math-seed-41", "math-seed-44", "math-seed-45", "math-seed-50", "math-sprout-45", "math-sprout-46",
      "math-sprout-47"],
    words: {
      biggest: "کدام از همه بزرگ‌تر است؟", smallest: "کدام از همه کوچک‌تر است؟", holds: "در کدام آب بیشتری جا می‌شود؟",
      order: "از کوچک به بزرگ بچین.", bars: "نوارها را از کوتاه به بلند بچین.",
      names: { "🐘": "فیل", "🐎": "اسب", "🐕": "سگ", "🐈": "گربه", "🐭": "موش", "🐜": "مورچه", "🪣": "سطل", "☕": "استکان", "🛁": "وان", "🥣": "کاسه", "🫖": "قوری", "🥄": "قاشق", "🧺": "سبد", "👜": "کیف", "🚌": "اتوبوس", "🚗": "ماشین" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["big", "big"];
      if (ctx.done(L("seed-18"))) kinds.push("cap");
      if (ctx.done(L("seed-19"))) kinds.push("ord", "bar");
      var names = ctx.w("names");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "big") return "big:" + rng.sample(range(0, SIZES.length - 1), 3).sort().join("-") + "-" + rng.pick(["b", "s"]);
        if (k === "cap") return "cap:" + rng.int(0, HOLDS.length - 1);
        if (k === "ord") return "ord:" + rng.int(0, ORDER_PICS.length - 1) + "-" + rng.int(3, 4);
        return "bar:" + rng.int(3, 5);
      }, function (key) {
        var m = /^big:(\d)-(\d)-(\d)-([bs])$/.exec(key);
        var opt = function (e) { return { label: e, value: e }; };
        if (m) {
          var three = [SIZES[+m[1]], SIZES[+m[2]], SIZES[+m[3]]];
          if (three.some(function (e) { return !e; })) return null;
          var right = m[4] === "b" ? three[0] : three[2], p = ctx.w(m[4] === "b" ? "biggest" : "smallest");
          return { type: "choose", prompt: p, say: p, pic: true, options: rng.shuffle(three).map(opt), answer: right };
        }
        m = /^cap:(\d)$/.exec(key);
        if (m) {
          var h = HOLDS[+m[1]];
          if (!h || kinds.indexOf("cap") === -1) return null;
          return { type: "choose", prompt: ctx.w("holds"), say: ctx.w("holds"), pic: true, options: rng.shuffle(h).map(opt), answer: h[0] };
        }
        m = /^ord:(\d)-(\d)$/.exec(key);
        if (m) {
          var pic = ORDER_PICS[+m[1]], c = +m[2];
          if (!pic || kinds.indexOf("ord") === -1 || c < 3 || c > 4) return null;
          return { type: "order", prompt: ctx.w("order"), say: ctx.w("order"), ltr: true, items: [0.6, 0.85, 1.1, 1.4].slice(0, c).map(function (z) { return { pic: pic, size: z }; }) };
        }
        m = /^bar:(\d)$/.exec(key);
        if (!m || kinds.indexOf("bar") === -1 || +m[1] < 3 || +m[1] > 5) return null;
        var lens = rng.sample([1, 2, 3, 4, 5, 6, 7], +m[1]).sort(function (a, b) { return a - b; });
        return { type: "order", prompt: ctx.w("bars"), say: ctx.w("bars"), ltr: true, items: lens.map(function (v) { return { bar: v }; }) };
      });
    }
  });

  /* «کجاست؟» — math-seed-p15 (Where is it?). On the picture of a room: what is on, under, next to or in front of
     something (math-seed-6); on the park map, a way to walk from place to place (math-seed-22). Keys: "w:ball",
     "r:pond-slide". */
  var WHERE = ["teddy", "ball", "cat", "book", "shoes", "car", "plant"];
  var PARK_STOPS = ["tree", "pond", "slide", "bench", "flowers"];
  B.PRACTICE.push({
    id: "math-seed-p15", subject: "math", level: "seed", objectives: ["math.seed.16", "math.seed.17"],
    needs: ["math-seed-6"], emoji: "🧸", title: "کجاست؟",
    lessons: ["math-seed-6", "math-seed-21", "math-seed-22", "math-seed-7", "math-seed-23", "math-seed-24",
      "math-seed-25", "math-seed-49", "math-seed-50", "math-sprout-54", "math-sprout-55"],
    words: {
      where: { teddy: "چه چیزی روی تخت است؟ رویش بزن.", ball: "چه چیزی زیر میز است؟ رویش بزن.", cat: "چه کسی کنار جعبه است؟ رویش بزن.",
        book: "چه چیزی روی قفسه است؟ رویش بزن.", shoes: "چه چیزی زیر تخت است؟ رویش بزن.", car: "چه چیزی جلوی جعبه است؟ رویش بزن.", plant: "چه چیزی روی میز است؟ رویش بزن." },
      route: "از در پارک راه بیفت. اول برو کنار {a}، بعد برو کنار {b}.",
      park: { tree: "درخت بزرگ", pond: "حوض", slide: "سرسره", bench: "نیمکت", flowers: "باغچه گل" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["w", "w"];
      if (ctx.done(L("seed-22"))) kinds.push("r");
      return run(Math.min(n, 4), ctx, function () {
        return rng.pick(kinds) === "w" ? "w:" + rng.pick(WHERE) : "r:" + rng.sample(PARK_STOPS, 2).join("-");
      }, function (key) {
        var m = /^w:(\w+)$/.exec(key);
        if (m) {
          if (WHERE.indexOf(m[1]) === -1) return null;
          var p = ctx.w("where")[m[1]];
          return { type: "map", map: "toys", tasks: [{ find: m[1], prompt: p, say: p }] };
        }
        m = /^r:(\w+)-(\w+)$/.exec(key);
        if (!m || kinds.indexOf("r") === -1 || PARK_STOPS.indexOf(m[1]) === -1 || PARK_STOPS.indexOf(m[2]) === -1 || m[1] === m[2]) return null;
        var rp = ctx.w("route", { a: ctx.w("park")[m[1]], b: ctx.w("park")[m[2]] });
        return { type: "map", map: "park", tasks: [{ route: ["gate", m[1], m[2]], prompt: rp, say: rp, walker: "🧒" }] };
      });
    }
  });

  /* «اول، بعد، آخر» — math-seed-p16 (First, next, last). Who came first, second, third in a race, and which one in a
     line is third (math-seed-39); what happened first, next and last (math-seed-40); the parts of a day and when we
     do things (math-seed-41). Keys: "race:0-3-5", "q:3-2" (place asked, the line's animals), "st:1", "day:2". */
  var RACERS = ["🐇", "🐕", "🐢", "🐈", "🐿️", "🦆"];
  var STORIES = [["🌰", "💧", "🌱", "🌻"], ["🥚", "🐣", "🐥", "🐔"], ["🛏️", "🪥", "🥣", "🎒"], ["🌅", "☀️", "🌇", "🌙"]];
  var WHEN = [["🥣", 0], ["🛏️", 3], ["🍲", 1], ["🪥", 3]]; // breakfast in the morning, sleep at night, lunch at noon, brush at night
  var DAY_PARTS = ["🌅", "☀️", "🌇", "🌙"];
  B.PRACTICE.push({
    id: "math-seed-p16", subject: "math", level: "seed", objectives: ["math.seed.18", "math.seed.19"],
    needs: ["math-seed-39"], emoji: "🏁", title: "اول، بعد، آخر",
    lessons: ["math-seed-39", "math-seed-40", "math-seed-41", "math-seed-50", "math-sprout-12", "math-sprout-48",
      "math-sprout-49", "math-sprout-58"],
    words: {
      race: "حیوان‌ها مسابقه دادند. اول {a} رسید، دوم {b}، سوم {c}. به همین ترتیب بچین.",
      line: "حیوان‌ها پشت پرچم صف کشیده‌اند. از پرچم بشمار. کدام {nth} است؟",
      nth: ["", "اول", "دوم", "سوم", "چهارم", "پنجم"],
      story: ["دانه کاشتیم. به ترتیب بچین: اول چه شد، بعد چه شد، آخر چه شد؟", "مرغ تخم گذاشت. به ترتیب بچین: اول چه شد، بعد چه شد، آخر چه شد؟",
        "صبح مدرسه. به ترتیب بچین: اول چه کار می‌کنیم، بعد چه، آخر چه؟", "یک روز از صبح تا شب. به ترتیب بچین."],
      says: { "🌰": "دانه را کاشتیم", "💧": "آبش دادیم", "🌱": "جوانه زد", "🌻": "گل داد", "🥚": "تخم", "🐣": "جوجه از تخم بیرون آمد", "🐥": "جوجه بزرگ شد", "🐔": "مرغ شد",
        "🛏️": "از خواب بیدار شدیم", "🪥": "مسواک زدیم", "🥣": "صبحانه خوردیم", "🎒": "به مدرسه رفتیم", "🌅": "صبح", "☀️": "ظهر", "🌇": "عصر", "🌙": "شب" },
      when: { "🥣": "کی صبحانه می‌خوریم؟", "🛏️": "کی می‌خوابیم؟", "🍲": "کی ناهار می‌خوریم؟", "🪥": "کی مسواک می‌زنیم و به رختخواب می‌رویم؟" },
      animals: { "🐇": "خرگوش", "🐕": "سگ", "🐢": "لاک‌پشت", "🐈": "گربه", "🐿️": "سنجاب", "🦆": "اردک" },
      parts: ["صبح", "ظهر", "عصر", "شب"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["race", "q"];
      if (ctx.done(L("seed-40"))) kinds.push("st", "st");
      if (ctx.done(L("seed-41"))) kinds.push("day");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "race") return "race:" + rng.sample(range(0, RACERS.length - 1), 3).join("-");
        if (k === "q") return "q:" + rng.int(1, 5) + "-" + rng.int(0, 9);
        if (k === "st") return "st:" + rng.int(0, STORIES.length - 1);
        return "day:" + rng.int(0, WHEN.length - 1);
      }, function (key) {
        var m = /^([a-z]+):([\d-]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], v = m[2].split("-").map(Number), names = ctx.w("animals"), says = ctx.w("says"), p;
        if (k === "race") {
          var three = v.map(function (i) { return RACERS[i]; });
          if (three.length !== 3 || three.some(function (e) { return !e; })) return null;
          p = ctx.w("race", { a: names[three[0]], b: names[three[1]], c: names[three[2]] });
          return { type: "order", numbered: true, prompt: p, say: p, items: three.map(function (e) { return { pic: e, say: names[e] }; }) };
        }
        if (k === "q") {
          var at = v[0];
          if (at < 1 || at > 5) return null;
          var line = rng.sample(RACERS, 5);
          p = ctx.w("line", { nth: ctx.w("nth")[at] });
          return { type: "choose", show: "🏁" + line.join(""), prompt: p, say: p, pic: true, answer: line[at - 1],
            options: rng.shuffle([line[at - 1], line[at % 5], line[(at + 2) % 5]]).map(function (e) { return { label: e, value: e }; }) };
        }
        if (k === "st") {
          var st = STORIES[v[0]];
          if (!st) return null;
          p = ctx.w("story")[v[0]];
          return { type: "order", numbered: true, prompt: p, say: p, items: st.map(function (e) { return { pic: e, say: says[e] }; }) };
        }
        var wh = WHEN[v[0]];
        if (!wh) return null;
        p = ctx.w("when")[wh[0]];
        return { type: "choose", prompt: p, say: p, pic: true, answer: String(wh[1]),
          options: [0, 1, 3].map(function (i) { return { label: DAY_PARTS[i], value: String(i) }; }) };
      });
    }
  });

  /* «نمودار تصویری» — math-seed-p17 (Picture graph). A small picture graph to read: how many, which has most or
     fewest; or the things to put in their columns first (math-seed-42). Key: "r:fruit:most" (read) or "m:pets:n". */
  var SEED_GRAPH = { fruit: ["🍎", "🍌", "🍇"], pets: ["🐈", "🐕", "🐟"], toys: ["⚽", "🧸", "🚗"] };
  B.PRACTICE.push({
    id: "math-seed-p17", subject: "math", level: "seed", objectives: ["math.seed.20", "math.seed.12"],
    needs: ["math-seed-42"], emoji: "📊", title: "نمودار تصویری",
    lessons: ["math-seed-42", "math-seed-48", "math-seed-50", "math-sprout-52", "math-sprout-53"],
    words: {
      make: "هر تصویر را در ستون خودش بگذار.", most: "کدام از همه بیشتر است؟", fewest: "کدام از همه کمتر است؟", howMany: "چندتا {name} هست؟",
      titles: { fruit: "میوه‌های سبد", pets: "حیوان‌های خانه بچه‌ها", toys: "اسباب‌بازی‌های جعبه" },
      names: { "🍎": "سیب", "🍌": "موز", "🍇": "انگور", "🐈": "گربه", "🐕": "سگ", "🐟": "ماهی", "⚽": "توپ", "🧸": "عروسک", "🚗": "ماشین" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names");
      return run(n, ctx, function () {
        return rng.pick(["r", "r", "m"]) + ":" + rng.pick(["fruit", "pets", "toys"]) + ":" + rng.pick(["most", "fewest", "n"]);
      }, function (key) {
        var m = /^([rm]):(\w+):(most|fewest|n)$/.exec(key), pics = m && SEED_GRAPH[m[2]];
        if (!pics) return null;
        var ns = rng.sample([1, 2, 3, 4, 5], 3);
        var s = { type: "chart", title: ctx.w("titles")[m[2]], rows: pics.map(function (p, i) { return { label: names[p], pic: p, n: ns[i] }; }) };
        if (m[1] === "m") { s.make = true; s.prompt = ctx.w("make"); }
        if (m[3] === "n") { var i = rng.int(0, 2); s.question = ctx.w("howMany", { name: names[pics[i]] }); s.options = near(rng, ns[i], 1, 1, 6); s.answer = ns[i]; return s; }
        var best = ns.indexOf(m[3] === "most" ? Math.max.apply(null, ns) : Math.min.apply(null, ns));
        s.question = ctx.w(m[3]);
        s.options = pics.map(function (p, i) { return { label: p, value: String(i) }; });
        s.answer = String(best);
        return s;
      });
    }
  });

  /* «حدس بزن چندتا» — math-seed-p18 (Guess how many). Which jar has many and which few, and about how many are there
     (about 5, about 10, about 20), without counting (math-seed-43). Keys: "fm:3-12", "ab:14". */
  B.PRACTICE.push({
    id: "math-seed-p18", subject: "math", level: "seed", objectives: ["math.seed.22"],
    needs: ["math-seed-43"], emoji: "🫙", title: "حدس بزن چندتا",
    lessons: ["math-seed-43", "math-seed-47", "math-seed-50"],
    words: { many: "در کدام شیشه مهره زیاد هست؟ نشمار، فقط نگاه کن.", few: "در کدام شیشه مهره کم هست؟ نشمار، فقط نگاه کن.", about: "نشمار، فقط نگاه کن. حدوداً چندتا هست؟", aboutN: "حدود {n}" },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        if (rng() < 0.5) return "fm:" + rng.int(2, 4) + "-" + rng.int(10, 16) + "-" + rng.pick(["many", "few"]);
        return "ab:" + rng.pick([rng.int(4, 6), rng.int(9, 11), rng.int(18, 22)]);
      }, function (key) {
        var m = /^fm:(\d+)-(\d+)-(many|few)$/.exec(key), t = rng.pick(["🔴", "🔵", "🟡", "🟢"]);
        if (m) {
          var a = { label: times(t, +m[1]), value: "few" }, b = { label: times(t, +m[2]), value: "many" };
          return { type: "choose", prompt: ctx.w(m[3]), say: ctx.w(m[3]), pic: true, stack: true, options: rng.shuffle([a, b]), answer: m[3] };
        }
        m = /^ab:(\d+)$/.exec(key);
        if (!m || +m[1] < 3 || +m[1] > 25) return null;
        var x = +m[1], right = x < 8 ? 5 : x < 15 ? 10 : 20;
        return { type: "choose", show: times(rng.pick(["🐞", "🌸", "⭐", "🍓"]), x), prompt: ctx.w("about"), say: ctx.w("about"), answer: String(right),
          options: [5, 10, 20].map(function (v) { return { label: ctx.w("aboutN", { n: fa(v) }), value: String(v) }; }) };
      });
    }
  });

  /* «با وجب و قدم» — math-seed-p19 (Hands and feet). Measure a thing in hand spans, footsteps or paper clips by tapping
     each one; who counts more steps, a grown-up with big steps or a child with small ones (math-seed-44).
     Keys: "u:0-6" (the unit and the length), "who:1". */
  var UNITS = [["✋", ["🛏️", "🚪", "🪑"]], ["👣", ["🛋️", "🚪", "🛏️"]], ["📎", ["✏️", "📕", "🥄"]]];
  B.PRACTICE.push({
    id: "math-seed-p19", subject: "math", level: "seed", objectives: ["math.seed.23"],
    needs: ["math-seed-44"], emoji: "✋", title: "با وجب و قدم",
    lessons: ["math-seed-44", "math-seed-45", "math-seed-50", "math-sprout-45", "math-sprout-46"],
    words: {
      unit: { "✋": "{t} را با وجب اندازه بگیر. روی هر وجب بزن و بشمار.", "👣": "{t} را با قدم اندازه بگیر. روی هر قدم بزن و بشمار.", "📎": "{t} را با گیره کاغذ اندازه بگیر. روی هر گیره بزن و بشمار." },
      things: { "🛏️": "تخت", "🚪": "در", "🪑": "صندلی", "🛋️": "مبل", "✏️": "مداد", "📕": "کتاب", "🥄": "قاشق" },
      who: "{a} و {b} یک اتاق را با قدم اندازه گرفتند. قدم‌های {a} بزرگ است و قدم‌های {b} کوچک. کدام قدم‌های بیشتری شمرد؟",
      grown: ["بابا", "مامان", "عمو"], kid: ["نرگس", "آرین", "سارا"]
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        return rng() < 0.75 ? "u:" + rng.int(0, 2) + "-" + rng.int(3, 8) : "who:" + rng.int(0, 2);
      }, function (key) {
        var m = /^u:(\d)-(\d+)$/.exec(key);
        if (m) {
          var u = UNITS[+m[1]], len = +m[2];
          if (!u || len < 2 || len > 10) return null;
          var t = rng.pick(u[1]);
          return { type: "measure", ask: "count", unit: u[0], bars: [{ thing: t, len: len }], options: near(rng, len, 1, 1), prompt: ctx.w("unit")[u[0]].replace("{t}", ctx.w("things")[t]) };
        }
        m = /^who:(\d)$/.exec(key);
        if (!m || +m[1] > 2) return null;
        var g = ctx.w("grown")[+m[1]], k = ctx.w("kid")[+m[1]], pics = [["👨", "👧"], ["👩", "👦"], ["👨", "👧"]][+m[1]];
        var p = ctx.w("who", { a: g, b: k });
        return { type: "choose", prompt: p, say: p, pic: true, options: rng.shuffle([{ label: pics[0], value: "big" }, { label: pics[1], value: "small" }]), answer: "small" };
      });
    }
  });

  /* «با شکل‌ها بساز» — math-seed-p20 (Build with shapes). A house, a tree, a boat or a fish made of shapes
     (math-seed-24); things that roll and things that don't, and what is like a ball, a box or a can (math-seed-25).
     Keys: "t:2", "roll", "like:box". */
  var TANGRAMS = [
    { pic: "🏠", slots: [{ shape: "square", at: [50, 58], s: 1.6 }, { shape: "tri", at: [50, 34], s: 1.1 }], extra: [{ shape: "circle" }] },
    { pic: "🌲", slots: [{ shape: "tri", at: [50, 28], s: 1.4 }, { shape: "rect", at: [50, 56], r: 90 }], extra: [{ shape: "square" }] },
    { pic: "⛵", slots: [{ shape: "semi", at: [50, 56], s: 1.6, r: 180 }, { shape: "rtri", at: [52, 34], s: 1.1 }], extra: [{ shape: "circle" }] },
    { pic: "🐟", slots: [{ shape: "square", at: [58, 40], s: 1.4, r: 45 }, { shape: "tri", at: [28, 40], r: 90 }], extra: [{ shape: "rect" }], turn: 45 }
  ];
  var ROLL = [["🍊", 1], ["⚽", 1], ["🥫", 1], ["🏀", 1], ["🎁", 0], ["📚", 0], ["🧊", 0], ["🎲", 0], ["🍉", 1], ["📦", 0]];
  var LIKE = { ball: ["⚽", ["🍊", "🏀", "🍉"]], box: ["📦", ["🎁", "🎲", "🧊"]], can: ["🥫", ["🕯️", "🥛", "🧻"]] };
  B.PRACTICE.push({
    id: "math-seed-p20", subject: "math", level: "seed", objectives: ["math.seed.15", "math.seed.21"],
    needs: ["math-seed-24"], emoji: "🏠", title: "با شکل‌ها بساز",
    lessons: ["math-seed-24", "math-seed-25", "math-seed-8", "math-seed-26", "math-seed-46", "math-seed-50",
      "math-sprout-7", "math-sprout-20"],
    words: {
      build: "یک {name} بساز: هر شکل را در جای خودش بگذار. اگر لازم است، بچرخانش.", made: "یک {name} ساختی!",
      names: { "🏠": "خانه", "🌲": "درخت", "⛵": "قایق", "🐟": "ماهی" },
      roll: "کدام قل می‌خورد؟ کدام قل نمی‌خورد؟", rolls: "قل می‌خورد", noRoll: "قل نمی‌خورد",
      like: "کدام شبیه {name} است؟", likes: { ball: "توپ", box: "جعبه", can: "قوطی" },
      says: { "🍊": "پرتقال", "⚽": "توپ", "🥫": "قوطی", "🏀": "توپ بسکتبال", "🎁": "جعبه کادو", "📚": "کتاب‌ها", "🧊": "یخ", "🎲": "تاس", "🍉": "هندوانه", "📦": "جعبه" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["t"];
      if (ctx.done(L("seed-25"))) kinds.push("roll", "like");
      return run(Math.min(n, 4), ctx, function () {
        var k = rng.pick(kinds);
        return k === "t" ? "t:" + rng.int(0, TANGRAMS.length - 1) : k === "like" ? "like:" + rng.pick(["ball", "box", "can"]) : "roll";
      }, function (key) {
        var m = /^t:(\d)$/.exec(key);
        if (m) {
          var t = TANGRAMS[+m[1]];
          if (!t) return null;
          var nm = ctx.w("names")[t.pic], s = { type: "tangram", prompt: ctx.w("build", { name: nm }), slots: t.slots, extra: t.extra, pic: t.pic, made: ctx.w("made", { name: nm }) };
          s.say = s.prompt;
          if (t.turn) s.turn = t.turn;
          return s;
        }
        if (kinds.indexOf("roll") === -1) return null;
        if (key === "roll") {
          var items = rng.sample(ROLL.filter(function (r) { return r[1]; }), 3).concat(rng.sample(ROLL.filter(function (r) { return !r[1]; }), 3));
          return { type: "sort", prompt: ctx.w("roll"), say: ctx.w("roll"), baskets: [{ label: ctx.w("rolls"), pic: "⚽", value: "roll" }, { label: ctx.w("noRoll"), pic: "📦", value: "no" }],
            items: rng.shuffle(items).map(function (r) { return { pic: r[0], say: ctx.w("says")[r[0]], basket: r[1] ? "roll" : "no" }; }) };
        }
        m = /^like:(\w+)$/.exec(key);
        var lk = m && LIKE[m[1]];
        if (!lk) return null;
        var right = rng.pick(lk[1]), wrong = Object.keys(LIKE).filter(function (o) { return o !== m[1]; }).map(function (o) { return rng.pick(LIKE[o][1]); });
        var p = ctx.w("like", { name: ctx.w("likes")[m[1]] });
        return { type: "choose", show: lk[0], prompt: p, say: p, pic: true, answer: right, options: rng.shuffle([right].concat(wrong)).map(function (e) { return { label: e, value: e }; }) };
      });
    }
  });

  /* «قاب ده‌تایی و ده و چندتا» — math-sprout-p12 (Ten-frames and teens). Make a number on the frames, read a full
     and a part frame (math-sprout-1); ten and some more (math-sprout-3); a bundle of ten and sticks (math-sprout-38).
     Keys: "mk:7", "tf:14", "teen:6" (ten and 6), "tb:15". */
  B.PRACTICE.push({
    id: "math-sprout-p12", subject: "math", level: "sprout", objectives: ["math.spr.3", "math.spr.5", "math.spr.4"],
    needs: ["math-sprout-1"], emoji: "🔟", title: "ده و چندتا",
    lessons: ["math-sprout-1", "math-sprout-14", "math-sprout-2", "math-sprout-15", "math-sprout-16",
      "math-sprout-3", "math-sprout-4", "math-sprout-9", "math-sprout-13", "math-sprout-23", "math-sprout-24",
      "math-sprout-28", "math-sprout-38"],
    words: { make: "{n} را در قاب بساز.", read: "در قاب‌ها چندتا مهره هست؟", teen: "ده و {k} می‌شود چند؟", bundle: "یک دسته ده‌تایی و چند چوب. روی هم چندتا؟" },
    make: function (rng, n, ctx) {
      var teens = ctx.done(L("sprout-3")), kinds = ["mk", "tf"];
      if (teens) kinds.push("teen", "teen");
      if (ctx.done(L("sprout-38"))) kinds.push("tb");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "teen") return "teen:" + rng.int(1, 9);
        return k + ":" + (k === "tb" ? rng.int(11, 19) : rng.int(teens ? 6 : 3, teens ? 20 : 10));
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key), x = m && +m[2];
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "teen") return x > 9 ? null : ask(ctx.w("teen", { k: fa(x) }), 10 + x, optsFa(rng, 10 + x, [x, 10 + x + 1, x * 10 + 1, 10 + x - 1]), "۱۰ + " + fa(x) + " = ؟");
        if (x > (teens ? 20 : 10)) return null;
        if (m[1] === "mk") return { type: "make", n: x, prompt: ctx.w("make", { n: fa(x) }) };
        if (m[1] === "tf") return { type: "tenframe", n: x, prompt: ctx.w("read"), options: near(rng, x, 1, 1, 20) };
        return x < 11 || x > 19 ? null : { type: "tens", n: x, hundreds: false, prompt: ctx.w("bundle"), options: optsNum(rng, x, [x - 10, x + 10, x + 1, x - 1]) };
      });
    }
  });

  /* «کدام بیشتر است؟» — math-sprout-p13 (Compare numbers). Which of two numbers is more or less (to 20, to 100 after
     math-sprout-40, with bundles after math-sprout-38), the biggest of three, and four numbers to put in order.
     Keys: "c:12-15-more", "big:3-17-9", "o:4-11-7-16". */
  B.PRACTICE.push({
    id: "math-sprout-p13", subject: "math", level: "sprout", objectives: ["math.spr.6"],
    needs: ["math-sprout-4"], emoji: "⚖️", title: "کدام بیشتر است؟",
    lessons: ["math-sprout-4", "math-sprout-6", "math-sprout-9", "math-sprout-10", "math-sprout-33",
      "math-sprout-40", "math-sprout-41", "math-sprout-43", "math-sprout-44", "math-sprout-52", "math-sprout-53",
      "math-sprout-60"],
    words: { big: "کدام عدد از همه بزرگ‌تر است؟", small: "کدام عدد از همه کوچک‌تر است؟", order: "عددها را از کوچک به بزرگ بچین." },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sprout-40")) ? 100 : 20, tens = ctx.done(L("sprout-38"));
      return run(n, ctx, function () {
        var k = rng.pick(["c", "c", "big", "o"]), nums = rng.sample(range(1, max), k === "o" ? 4 : k === "big" ? 3 : 2);
        return k === "c" ? "c:" + nums.join("-") + "-" + rng.pick(["more", "less"]) : k === "big" ? "big:" + nums.join("-") + "-" + rng.pick(["b", "s"]) : "o:" + nums.join("-");
      }, function (key) {
        var m = /^([a-z]+):([\d-]+?)(?:-(more|less|b|s))?$/.exec(key);
        if (!m) return null;
        var v = m[2].split("-").map(Number);
        if (v.some(function (x) { return x > max || x < 0; }) || new Set(v).size !== v.length) return null;
        if (m[1] === "c" && v.length === 2 && (m[3] === "more" || m[3] === "less")) {
          var s = { type: "compare", a: v[0], b: v[1], ask: m[3] };
          if (tens && Math.max(v[0], v[1]) > 20 && rng() < 0.5) s.pic = "tens";
          return s;
        }
        if (m[1] === "big" && v.length === 3 && (m[3] === "b" || m[3] === "s")) {
          var x = m[3] === "b" ? Math.max.apply(null, v) : Math.min.apply(null, v);
          return ask(ctx.w(m[3] === "b" ? "big" : "small"), x, rng.shuffle(v).map(fa));
        }
        if (m[1] === "o" && v.length === 4) return { type: "order", prompt: ctx.w("order"), say: ctx.w("order"), ltr: true, items: v.slice().sort(function (a, b) { return a - b; }) };
        return null;
      });
    }
  });

  /* «جمله‌های عددی» — math-sprout-p14 (Number sentences). The sentence that fits a picture of two groups, sums to
     sort by their answer, and sentences to pair with their answers (to 10 after math-sprout-5, take-aways after
     math-sprout-6, to 20 after math-sprout-24). Keys: "pic:3+2", "sort:7-9", "pr:6". */
  B.PRACTICE.push({
    id: "math-sprout-p14", subject: "math", level: "sprout", objectives: ["math.spr.11", "math.spr.7"],
    needs: ["math-sprout-5"], emoji: "🟰", title: "جمله‌های عددی",
    lessons: ["math-sprout-5", "math-sprout-17", "math-sprout-6", "math-sprout-18", "math-sprout-8",
      "math-sprout-11", "math-sprout-22", "math-sprout-24", "math-sprout-25", "math-sprout-26", "math-sprout-27",
      "math-sprout-28", "math-sprout-29", "math-sprout-31", "math-sprout-32", "math-sprout-33", "math-sprout-34",
      "math-sprout-35", "math-sprout-37"],
    words: { pic: "کدام جمله این تصویر را می‌گوید؟", sort: "جواب هر کدام {a} می‌شود یا {b}؟ در سبد جوابش بگذار.", pairs: "هر جمله را با جوابش جفت کن" },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sprout-24")) ? 20 : 10, take = ctx.done(L("sprout-6"));
      function sent(x) { // a sentence with answer x, as text and a key part
        var minus = take && rng() < 0.4, b;
        if (minus) { b = rng.int(1, Math.min(9, max - x)); return fa(x + b) + " − " + fa(b); }
        b = rng.int(0, x); return fa(x - b) + " + " + fa(b);
      }
      return run(n, ctx, function () {
        var k = rng.pick(["pic", "sort", "pr"]);
        if (k === "pic") { var a = rng.int(1, Math.min(9, max - 1)); return "pic:" + a + "+" + rng.int(1, Math.min(9, max - a)); }
        if (k === "sort") { var two = rng.sample(range(4, max), 2).sort(function (x, y) { return x - y; }); return "sort:" + two.join("-"); }
        return "pr:" + rng.int(3, max - 3);
      }, function (key) {
        var m = /^pic:(\d+)\+(\d+)$/.exec(key);
        if (m) {
          var a = +m[1], b = +m[2], th = rng.pick([["🍎", "🍐"], ["🐟", "🐠"], ["🔴", "🔵"], ["🐥", "🐤"]]);
          if (a + b > max) return null;
          var right = fa(a) + " + " + fa(b) + " = " + fa(a + b);
          var opts = [right, fa(a) + " + " + fa(b + 1) + " = " + fa(a + b + 1), fa(a + b) + " − " + fa(b) + " = " + fa(a)];
          if (!take) opts[2] = fa(a + 1) + " + " + fa(b) + " = " + fa(a + b + 1);
          return { type: "choose", show: times(th[0], a) + "  " + times(th[1], b), prompt: ctx.w("pic"), say: ctx.w("pic"), stack: true, ltr: true, options: rng.shuffle(opts), answer: right };
        }
        m = /^sort:(\d+)-(\d+)$/.exec(key);
        if (m) {
          var x = +m[1], y = +m[2];
          if (x >= y || y > max) return null;
          var items = [x, x, x, y, y, y].map(function (v) { return { label: sent(v), basket: String(v) }; });
          var sp = ctx.w("sort", { a: fa(x), b: fa(y) });
          return { type: "sort", prompt: sp, say: sp, baskets: [{ label: fa(x), value: String(x) }, { label: fa(y), value: String(y) }], items: rng.shuffle(items) };
        }
        m = /^pr:(\d+)$/.exec(key);
        if (!m || +m[1] > max - 2) return null;
        var c = +m[1], ans = [c - 1, c, c + 2];
        return { type: "pairs", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: ans.map(function (v) { return [{ label: sent(v) }, v]; }) };
      });
    }
  });

  /* «ترازوی عددها» — math-sprout-p15 (Number balance). Put weights on until both pans are level, then say what makes
     the two sides equal; which pan goes down when two numbers are on each side (math-sprout-29).
     Keys: "bal:4+3=5", "hv:6+2-3+4". */
  B.PRACTICE.push({
    id: "math-sprout-p15", subject: "math", level: "sprout", objectives: ["math.spr.10"],
    needs: ["math-sprout-29"], emoji: "⚖️", title: "ترازوی عددها",
    lessons: ["math-sprout-29", "math-sprout-30"],
    words: {
      bal: "در یک کفه {a} و {b} است و در کفه دیگر {c}. وزنه بگذار تا دو کفه برابر شوند.", balQ: "پس {a} + {b} = {c} + چند؟",
      hv: "کدام کفه پایین می‌رود؟ اول عددهای هر کفه را با هم جمع کن. روی آن کفه بزن."
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var a = rng.int(2, 9), b = rng.int(1, 9);
        if (rng() < 0.6) return "bal:" + a + "+" + b + "=" + rng.int(1, a + b - 1);
        var c = rng.int(2, 9), d = rng.int(1, 9);
        return a + b === c + d ? null : "hv:" + a + "+" + b + "-" + c + "+" + d;
      }, function (key) {
        var m = /^bal:(\d+)\+(\d+)=(\d+)$/.exec(key);
        if (m) {
          var a = +m[1], b = +m[2], c = +m[3], x = a + b - c;
          if (x < 1 || x > 9) return null;
          var tray = rng.shuffle([x].concat(rng.sample([1, 2, 3, 4, 5].filter(function (v) { return v !== x; }), 2)));
          return { type: "balance", left: [a, b], right: [c], open: "right", tray: tray, unit: "", prompt: ctx.w("bal", { a: fa(a), b: fa(b), c: fa(c) }),
            question: ctx.w("balQ", { a: fa(a), b: fa(b), c: fa(c) }), options: near(rng, x, 1, 1, 10), answer: x };
        }
        m = /^hv:(\d+)\+(\d+)-(\d+)\+(\d+)$/.exec(key);
        if (!m || +m[1] + +m[2] === +m[3] + +m[4]) return null;
        return { type: "balance", ask: "heavier", held: true, left: [+m[1], +m[2]], right: [+m[3], +m[4]], unit: "", prompt: ctx.w("hv") };
      });
    }
  });

  /* «نصف و چهار قسمت» — math-sprout-p16 (Halves and quarters). Which is cut into equal parts, cut one yourself, name
     the part coloured, and half of a few things shared by two (math-sprout-21). Keys: "eq:2", "cut:4", "nm:2", "set:6". */
  B.PRACTICE.push({
    id: "math-sprout-p16", subject: "math", level: "sprout", objectives: ["math.spr.13"],
    needs: ["math-sprout-21"], emoji: "🍕", title: "نصف و چهار قسمت",
    lessons: ["math-sprout-21", "math-sprout-59", "math-sapling-19", "math-sapling-56", "math-sapling-57",
      "math-sapling-59", "math-sapling-61"],
    words: {
      eq: { 2: "کدام درست از وسط نصف شده است؟", 4: "کدام به چهار قسمت مساوی بریده شده است؟" },
      cut: { 2: "این را از وسط نصف کن. روی خط‌چین بزن.", 4: "این را به چهار قسمت مساوی ببر. روی خط‌چین‌ها بزن." },
      name: "چه مقدار رنگ شده است؟", half: "نصف", quarter: "یک‌چهارم", whole: "همه‌اش",
      set: "{n} {t} را بین دو نفر نصف کن.", result: "نصف {n} می‌شود {k}.",
      things: { "🍪": "شیرینی", "🍓": "توت‌فرنگی", "🍬": "آب‌نبات" }
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var k = rng.pick(["eq", "cut", "nm", "set"]);
        return k + ":" + (k === "set" ? 2 * rng.int(2, 5) : rng.pick([2, 4]));
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key), v = m && +m[2];
        if (!m) return null;
        if (m[1] === "set") {
          if (v % 2 || v < 4 || v > 10) return null;
          var t = rng.pick(["🍪", "🍓", "🍬"]);
          return { type: "fraction", set: v, thing: t, parts: 2, who: ["👧", "👦"], prompt: ctx.w("set", { n: fa(v), t: ctx.w("things")[t] }), result: ctx.w("result", { n: fa(v), k: fa(v / 2) }) };
        }
        if (v !== 2 && v !== 4) return null;
        var shape = rng.pick(v === 2 ? ["bread", "rect", "circle"] : ["rect", "square", "circle"]);
        if (m[1] === "eq") {
          var shapes = v === 2 ? [{ parts: 2 }, { cuts: [0.3] }, { cuts: [0.7] }] : [{ parts: 4 }, { cuts: [0.15, 0.4, 0.7] }, { cuts: [0.25, 0.5, 0.9] }];
          return { type: "fraction", ask: "equal", shape: shape === "square" ? "rect" : shape, shapes: rng.shuffle(shapes), prompt: ctx.w("eq")[v] };
        }
        if (m[1] === "cut") return { type: "fraction", cut: true, shape: shape, parts: v, prompt: ctx.w("cut")[v] };
        if (m[1] !== "nm") return null;
        var right = ctx.w(v === 2 ? "half" : "quarter");
        return { type: "fraction", ask: "name", shape: shape, parts: v, take: 1, prompt: ctx.w("name"), options: rng.shuffle([ctx.w("half"), ctx.w("quarter"), ctx.w("whole")]), answer: right };
      });
    }
  });

  /* «با چه اندازه بگیریم؟» — math-sprout-p17 (Measure length). Measure with clips or cubes laid end to end
     (math-sprout-45), the longest or shortest of three (math-sprout-46), and why the same thing is more clips than
     pencils long. Keys: "u:0-7", "lg:3-longer", "why:1". */
  var LEN_UNITS = [["📎", ["✏️", "🥄", "🖍️"]], ["🟫", ["📕", "🥕", "🍌"]]];
  var LEN_THINGS = ["✏️", "🖍️", "🥕", "🌽", "🐍", "🥖", "🖌️", "🥒", "🍌"];
  B.PRACTICE.push({
    id: "math-sprout-p17", subject: "math", level: "sprout", objectives: ["math.spr.15"],
    needs: ["math-sprout-45"], emoji: "📏", title: "درازی را اندازه بگیر",
    lessons: ["math-sprout-45", "math-sprout-46", "math-sprout-51", "math-sapling-9", "math-sapling-30",
      "math-sapling-31", "math-sapling-94"],
    words: {
      unit: { "📎": "{t} چند گیره است؟ روی هر گیره بزن و بشمار.", "🟫": "{t} چند مکعب است؟ روی هر مکعب بزن و بشمار." },
      things: { "✏️": "مداد", "🥄": "قاشق", "🖍️": "مداد شمعی", "📕": "کتاب", "🥕": "هویج", "🍌": "موز" },
      longer: "کدام از همه درازتر است؟ رویش بزن.", shorter: "کدام از همه کوتاه‌تر است؟ رویش بزن.",
      why: "میز را یک بار با مداد و یک بار با گیره کاغذ اندازه گرفتیم. کدام عدد بزرگ‌تر شد؟", pencils: "با مداد", clips: "با گیره"
    },
    make: function (rng, n, ctx) {
      var kinds = ["u", "u"];
      if (ctx.done(L("sprout-46"))) kinds.push("lg", "why");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "u") return "u:" + rng.int(0, 1) + "-" + rng.int(3, 9);
        if (k === "lg") return "lg:" + rng.sample(range(0, LEN_THINGS.length - 1), 3).join(".") + "-" + rng.pick(["longer", "shorter"]);
        return "why";
      }, function (key) {
        var m = /^u:(\d)-(\d+)$/.exec(key);
        if (m) {
          var u = LEN_UNITS[+m[1]], len = +m[2];
          if (!u || len > 10) return null;
          var t = rng.pick(u[1]);
          return { type: "measure", ask: "count", unit: u[0], bars: [{ thing: t, len: len }], options: near(rng, len, 1, 1), prompt: ctx.w("unit")[u[0]].replace("{t}", ctx.w("things")[t]) };
        }
        if (kinds.indexOf("lg") === -1) return null;
        if (key === "why") return { type: "choose", prompt: ctx.w("why"), say: ctx.w("why"), options: rng.shuffle([{ label: "✏️ " + ctx.w("pencils"), value: "p" }, { label: "📎 " + ctx.w("clips"), value: "c" }]), answer: "c" };
        m = /^lg:(\d)\.(\d)\.(\d)-(longer|shorter)$/.exec(key);
        if (!m) return null;
        var lens = rng.sample([2, 3, 4, 5, 6, 7, 8, 9], 3);
        return { type: "measure", ask: m[4], bars: [1, 2, 3].map(function (i, j) { return { thing: LEN_THINGS[+m[i]], len: lens[j] }; }), prompt: ctx.w(m[4]), say: ctx.w(m[4]) };
      });
    }
  });

  /* «سنگین‌تر و جادارتر» — math-sprout-p18 (Mass and capacity). Which pan goes down, or which is lighter; how many
     cubes balance a thing; what holds more (math-sprout-47). Keys: "w:0-6-heavier", "cu:2", "cap:1". */
  var CUBE_THINGS = [["🍎", 4], ["🍐", 5], ["📱", 3], ["🧸", 6], ["🥚", 2]];
  B.PRACTICE.push({
    id: "math-sprout-p18", subject: "math", level: "sprout", objectives: ["math.spr.17"],
    needs: ["math-sprout-47"], emoji: "🪣", title: "سنگین‌تر و جادارتر",
    lessons: ["math-sprout-47", "math-sprout-51", "math-sapling-16", "math-sapling-38", "math-sapling-39"],
    words: {
      heavier: "کدام طرف سنگین‌تر است؟ روی آن کفه بزن.", lighter: "کدام طرف سبک‌تر است؟ روی آن کفه بزن.",
      cubes: "{t} را با مکعب‌ها وزن کن: مکعب بگذار تا دو کفه برابر شوند.", cubesQ: "{t} هم‌وزن چند مکعب است؟",
      holds: "در کدام آب بیشتری جا می‌شود؟",
      things: { "🍉": "هندوانه", "🎃": "کدو تنبل", "🍍": "آناناس", "🪨": "سنگ", "🍎": "سیب", "📕": "کتاب", "🍒": "گیلاس", "🪶": "پر", "🎈": "بادکنک", "🍐": "گلابی", "📱": "تلفن", "🧸": "عروسک", "🥚": "تخم‌مرغ" }
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var k = rng.pick(["w", "w", "cu", "cap"]);
        if (k === "cu") return "cu:" + rng.int(0, CUBE_THINGS.length - 1);
        if (k === "cap") return "cap:" + rng.int(0, HOLDS.length - 1);
        var two = rng.sample(range(0, MASSES.length - 1), 2);
        return MASS[MASSES[two[0]]] === MASS[MASSES[two[1]]] ? null : "w:" + two.join("-") + "-" + rng.pick(["heavier", "lighter"]);
      }, function (key) {
        var th = ctx.w("things"), m = /^w:(\d+)-(\d+)-(heavier|lighter)$/.exec(key);
        if (m) {
          var a = MASSES[+m[1]], b = MASSES[+m[2]];
          if (!a || !b || MASS[a] === MASS[b]) return null;
          return { type: "balance", ask: m[3], left: [{ pic: a, mass: MASS[a], say: th[a] }], right: [{ pic: b, mass: MASS[b], say: th[b] }], prompt: ctx.w(m[3]) };
        }
        m = /^cu:(\d)$/.exec(key);
        if (m) {
          var c = CUBE_THINGS[+m[1]];
          if (!c) return null;
          return { type: "balance", left: [{ pic: c[0], mass: c[1], say: th[c[0]] }], open: "right", tray: range(1, c[1] + 2).map(function () { return { pic: "🟫", mass: 1 }; }),
            prompt: ctx.w("cubes", { t: th[c[0]] }), question: ctx.w("cubesQ", { t: th[c[0]] }), options: near(rng, c[1], 1, 1), answer: c[1] };
        }
        m = /^cap:(\d)$/.exec(key);
        var h = m && HOLDS[+m[1]];
        if (!h) return null;
        return { type: "choose", prompt: ctx.w("holds"), say: ctx.w("holds"), pic: true, options: rng.shuffle(h).map(function (e) { return { label: e, value: e }; }), answer: h[0] };
      });
    }
  });

  /* «پول ما» — math-sprout-p19 (Our money). How much money is shown, pay the exact price, and is the money enough
     (math-sprout-50). Notes of 1, 2, 5 and 10 thousand toman, to 20. Keys: "b:5-2-1", "w:3", "en:12-15". */
  var SMALL_GOODS = [["🍞", 6], ["🥛", 9], ["✏️", 3], ["🍎", 8], ["📒", 7], ["🍬", 2], ["🥚", 5]];
  B.PRACTICE.push({
    id: "math-sprout-p19", subject: "math", level: "sprout", objectives: ["math.spr.18"],
    needs: ["math-sprout-50"], emoji: "💵", title: "پول ما",
    lessons: ["math-sprout-50"],
    words: {
      bills: "این پول روی هم چند هزار تومان است؟", pay: "پول {a} را درست بده.",
      enough: "{p} {m} هزار تومان دارد. {a} {c} هزار تومان است. پولش کافی است؟", yes: "بله، کافی است", no: "نه، کم است",
      goods: { "🍞": "نان", "🥛": "شیر", "✏️": "مداد", "🍎": "سیب", "📒": "دفتر", "🍬": "آب‌نبات", "🥚": "تخم‌مرغ" },
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه"]
    },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () {
        var k = rng.pick(["b", "b", "w", "en"]);
        if (k === "b") return "b:" + rng.sample([10, 5, 5, 2, 2, 1, 1], rng.int(2, 3)).sort(function (a, b) { return b - a; }).join("-");
        if (k === "w") return "w:" + rng.int(0, SMALL_GOODS.length - 1);
        var g = rng.int(0, SMALL_GOODS.length - 1);
        return "en:" + g + "-" + Math.max(1, SMALL_GOODS[g][1] + rng.pick([-3, -1, 1, 3]));
      }, function (key) {
        var m = /^b:([\d-]+)$/.exec(key), goods = ctx.w("goods");
        if (m) {
          var bills = m[1].split("-").map(Number), s = bills.reduce(function (a, b) { return a + b; }, 0);
          if (bills.some(function (b) { return [1, 2, 5, 10].indexOf(b) === -1; }) || s > 20) return null;
          return { type: "money", prompt: ctx.w("bills"), bills: bills, options: optsNum(rng, s, [s + 1, s - 1, s + 5, bills.length]) };
        }
        m = /^w:(\d)$/.exec(key);
        if (m) {
          var g = SMALL_GOODS[+m[1]];
          if (!g) return null;
          var need = [], left = g[1];
          [5, 2, 1].forEach(function (b) { while (left >= b) { need.push(b); left -= b; } });
          return { type: "money", prompt: ctx.w("pay", { a: goods[g[0]] }), items: [{ emoji: g[0], name: goods[g[0]], price: g[1] }], wallet: rng.shuffle(need.concat(rng.sample([1, 2, 5, 10], 2))) };
        }
        m = /^en:(\d)-(\d+)$/.exec(key);
        var eg = m && SMALL_GOODS[+m[1]];
        if (!eg || +m[2] === eg[1]) return null;
        var people = ctx.w("people"), p = ctx.w("enough", { p: people[rng.int(0, people.length - 1)], m: fa(m[2]), a: goods[eg[0]], c: fa(eg[1]) });
        return { type: "choose", show: eg[0], prompt: p, say: p, options: [{ label: ctx.w("yes"), value: "y" }, { label: ctx.w("no"), value: "n" }], answer: +m[2] >= eg[1] ? "y" : "n" };
      });
    }
  });

  /* «چوب‌خط و نمودار» — math-sprout-p20 (Tally and picture graph). Tally marks to read, a picture graph to read (how
     many, how many more, how many in all) or to fill first (math-sprout-52, math-sprout-53). Keys: "t:13",
     "g:weather:more", "m:fruit:all". */
  var SPROUT_GRAPH = { fruit: ["🍎", "🍌", "🍇", "🍊"], weather: ["☀️", "🌧️", "☁️"], pets: ["🐈", "🐕", "🐟", "🐦"] };
  B.PRACTICE.push({
    id: "math-sprout-p20", subject: "math", level: "sprout", objectives: ["math.spr.19"],
    needs: ["math-sprout-52"], emoji: "📊", title: "چوب‌خط و نمودار",
    lessons: ["math-sprout-52", "math-sprout-53", "math-sapling-20", "math-sapling-82", "math-sapling-83"],
    words: {
      tally: "هر دسته پنج‌تایی است. چندتا شمرده‌اند؟", make: "هر تصویر را در ستون خودش بگذار.",
      n: "چندتا {a} هست؟", more: "{a} چندتا بیشتر از {b} است؟", all: "روی هم چندتا هست؟",
      titles: { fruit: "میوه دلخواه بچه‌ها", weather: "هوای روزهای این ماه", pets: "حیوان‌های خانه بچه‌ها" },
      names: { "🍎": "سیب", "🍌": "موز", "🍇": "انگور", "🍊": "پرتقال", "☀️": "روز آفتابی", "🌧️": "روز بارانی", "☁️": "روز ابری", "🐈": "گربه", "🐕": "سگ", "🐟": "ماهی", "🐦": "پرنده" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), kinds = ["t", "g", "g"];
      if (ctx.done(L("sprout-53"))) kinds.push("m");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        return k === "t" ? "t:" + rng.int(4, 18) : k + ":" + rng.pick(["fruit", "weather", "pets"]) + ":" + rng.pick(["n", "more", "all"]);
      }, function (key) {
        var m = /^t:(\d+)$/.exec(key);
        if (m) return +m[1] > 20 ? null : { type: "count", show: "tally", n: +m[1], options: near(rng, +m[1], 1, 1, 25), ask: ctx.w("tally") };
        m = /^([gm]):(\w+):(n|more|all)$/.exec(key);
        var pics = m && SPROUT_GRAPH[m[2]];
        if (!pics || kinds.indexOf(m[1]) === -1) return null;
        var ns = rng.sample(range(1, 7), pics.length), two = rng.sample(range(0, pics.length - 1), 2).sort(function (a, b) { return ns[b] - ns[a]; });
        var s = { type: "chart", title: ctx.w("titles")[m[2]], rows: pics.map(function (p, i) { return { label: names[p], pic: p, n: ns[i] }; }) };
        if (m[1] === "m") { s.make = true; s.prompt = ctx.w("make"); }
        var x = m[3] === "n" ? ns[two[0]] : m[3] === "more" ? ns[two[0]] - ns[two[1]] : ns.reduce(function (a, b) { return a + b; }, 0);
        s.question = ctx.w(m[3], { a: names[pics[two[0]]], b: names[pics[two[1]]] });
        s.options = optsNum(rng, x, [x + 1, x - 1, x + 2]);
        s.answer = x;
        return s;
      });
    }
  });

  /* «چپ، راست، بالا، پایین» — math-sprout-p21 (Directions). Which arrow points right or left (math-sprout-54); move a
     tortoise to its strawberry with the arrows; on the neighbourhood map, walk from home to two places; turn to face
     north, east, south or west (math-sprout-55). Keys: "ar:r", "mv:4-2", "rt:bakery-school", "cp:n-r". */
  var STREET = ["bakery", "fruit", "park", "school", "clinic"];
  var FACES = ["n", "e", "s", "w"];
  B.PRACTICE.push({
    id: "math-sprout-p21", subject: "math", level: "sprout", objectives: ["math.spr.20"],
    needs: ["math-sprout-54"], emoji: "🧭", title: "چپ، راست، بالا، پایین",
    lessons: ["math-sprout-54", "math-sprout-55", "math-sprout-60"],
    words: {
      arrow: { r: "کدام فلش به طرف راست است؟", l: "کدام فلش به طرف چپ است؟", u: "کدام فلش به طرف بالاست؟", d: "کدام فلش به طرف پایین است؟" },
      move: "لاک‌پشت را با فلش‌ها به توت‌فرنگی برسان: {x} خانه به راست و {y} خانه به بالا.",
      route: "از خانه راه بیفت. اول برو به {a}، بعد برو به {b}.",
      street: { bakery: "نانوایی", fruit: "میوه‌فروشی", park: "پارک", school: "مدرسه", clinic: "درمانگاه" },
      face: { n: "رو به شمال بچرخ.", e: "رو به شرق بچرخ.", s: "رو به جنوب بچرخ.", w: "رو به غرب بچرخ." },
      turn: { r: "حالا یک بار به راست بچرخ.", l: "حالا یک بار به چپ بچرخ." }
    },
    make: function (rng, n, ctx) {
      var kinds = ["ar", "mv"];
      if (ctx.done(L("sprout-55"))) kinds.push("rt", "cp");
      return run(Math.min(n, 5), ctx, function () {
        var k = rng.pick(kinds);
        if (k === "ar") return "ar:" + rng.pick(["r", "l", "u", "d"]);
        if (k === "mv") return "mv:" + rng.int(2, 5) + "-" + rng.int(1, 3);
        if (k === "rt") return "rt:" + rng.sample(STREET, 2).join("-");
        return "cp:" + rng.pick(FACES) + "-" + rng.pick(["r", "l"]);
      }, function (key) {
        var m = /^([a-z]+):([a-z\d]+)(?:-([a-z\d]+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "ar") {
          var arrows = { r: "➡️", l: "⬅️", u: "⬆️", d: "⬇️" };
          if (!arrows[m[2]]) return null;
          var p = ctx.w("arrow")[m[2]];
          return { type: "choose", prompt: p, say: p, pic: true, options: rng.shuffle(Object.keys(arrows)).map(function (k) { return { label: arrows[k], value: k }; }), answer: m[2] };
        }
        if (m[1] === "mv") {
          var x = +m[2], y = +m[3];
          if (!(x >= 1 && x <= 6 && y >= 0 && y <= 4)) return null;
          return { type: "grid", ask: "move", size: [7, 5], piece: { at: [1, 1], pic: "🐢" }, goal: { at: [1 + x, 1 + y], pic: "🍓" }, prompt: ctx.w("move", { x: fa(x), y: fa(y) }) };
        }
        if (m[1] === "rt") {
          if (STREET.indexOf(m[2]) === -1 || STREET.indexOf(m[3]) === -1 || m[2] === m[3]) return null;
          var rp = ctx.w("route", { a: ctx.w("street")[m[2]], b: ctx.w("street")[m[3]] });
          return { type: "map", map: "street", tasks: [{ route: ["home", m[2], m[3]], prompt: rp, say: rp, walker: "🧒" }] };
        }
        var i = FACES.indexOf(m[2]);
        if (i === -1 || (m[3] !== "r" && m[3] !== "l")) return null;
        var to = FACES[(i + (m[3] === "r" ? 1 : 3)) % 4];
        return { type: "compass", tasks: [{ face: m[2], prompt: ctx.w("face")[m[2]] }, { face: to, prompt: ctx.w("turn")[m[3]] }] };
      });
    }
  });

  /* «اول تا دهم» — math-sprout-p22 (Ordinals). Which animal in the line is fifth (to tenth), what place an animal is
     in, and the floors of a building to put in order (math-sprout-58). Keys: "q:7", "pl:4", "fl:6". */
  var LINE_UP = ["🐇", "🐕", "🐢", "🐈", "🐿️", "🦆", "🐑", "🐄", "🐓", "🐖"];
  B.PRACTICE.push({
    id: "math-sprout-p22", subject: "math", level: "sprout", objectives: ["math.spr.22"],
    needs: ["math-sprout-58"], emoji: "🏁", title: "اول تا دهم",
    lessons: ["math-sprout-58", "math-sprout-60"],
    words: {
      which: "حیوان‌ها پشت پرچم صف کشیده‌اند. از پرچم بشمار. کدام {nth} است؟",
      place: "از پرچم بشمار. {a} چندم است؟", floors: "طبقه‌های ساختمان را از پایین بچین: اول، دوم، سوم…",
      nth: ["", "اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم", "نهم", "دهم"],
      animals: { "🐇": "خرگوش", "🐕": "سگ", "🐢": "لاک‌پشت", "🐈": "گربه", "🐿️": "سنجاب", "🦆": "اردک", "🐑": "گوسفند", "🐄": "گاو", "🐓": "خروس", "🐖": "خوک" }
    },
    make: function (rng, n, ctx) {
      var nth = ctx.w("nth");
      return run(n, ctx, function () {
        var k = rng.pick(["q", "q", "pl", "fl"]);
        return k + ":" + (k === "fl" ? rng.int(4, 6) : rng.int(1, 10));
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key), v = m && +m[2];
        if (!m || v < 1 || v > 10) return null;
        if (m[1] === "fl") return v < 3 || v > 6 ? null : { type: "order", numbered: true, prompt: ctx.w("floors"), say: ctx.w("floors"), items: range(1, v).map(function (i) { return { label: nth[i], say: nth[i] }; }) };
        var line = rng.shuffle(LINE_UP), show = "🏁" + line.join("");
        if (m[1] === "q") {
          var p = ctx.w("which", { nth: nth[v] });
          return { type: "choose", show: show, prompt: p, say: p, pic: true, answer: line[v - 1],
            options: rng.shuffle([line[v - 1], line[v % 10], line[(v + 8) % 10]]).map(function (e) { return { label: e, value: e }; }) };
        }
        if (m[1] !== "pl") return null;
        var pp = ctx.w("place", { a: ctx.w("animals")[line[v - 1]] }), wrong = [v - 1, v + 1, 11 - v].filter(function (w) { return w >= 1 && w <= 10 && w !== v; });
        return { type: "choose", show: show, prompt: pp, say: pp, answer: String(v),
          options: rng.shuffle([v].concat(wrong.slice(0, 2))).map(function (i) { return { label: nth[i], value: String(i) }; }) };
      });
    }
  });

  /* «روز، هفته، فصل» — math-sprout-p23 (Day and year). A day's doings from morning to night (math-sprout-12); how long
     things take, a minute, an hour or a day (math-sprout-48); the seasons and four months in order (math-sprout-49).
     Keys: "ev:1", "dur:2", "se:3" (starting season), "mo:5" (starting month). */
  var ROUTINES = [["🛏️", "🪥", "🥣", "🎒"], ["🏫", "🍲", "⚽", "🛏️"], ["🌅", "☀️", "🌇", "🌙"]];
  var DURATIONS = [["🪥", "m"], ["🎬", "h"], ["🌱", "d"], ["🥚", "m"], ["🚌", "h"], ["🏖️", "d"]];
  B.PRACTICE.push({
    id: "math-sprout-p23", subject: "math", level: "sprout", objectives: ["math.spr.16"],
    needs: ["math-sprout-12"], emoji: "🗓️", title: "روز، هفته، فصل",
    lessons: ["math-sprout-12", "math-sprout-48", "math-sprout-49", "math-sprout-51"],
    words: {
      ev: "کارهای یک روز را به ترتیب بچین: از صبح تا شب.",
      says: { "🛏️": "خواب", "🪥": "مسواک", "🥣": "صبحانه", "🎒": "رفتن به مدرسه", "🏫": "کلاس", "🍲": "ناهار", "⚽": "بازی", "🌅": "صبح", "☀️": "ظهر", "🌇": "عصر", "🌙": "شب" },
      dur: { "🪥": "مسواک زدن چقدر طول می‌کشد؟", "🎬": "دیدن یک فیلم چقدر طول می‌کشد؟", "🌱": "تا یک دانه جوانه بزند چقدر طول می‌کشد؟", "🥚": "پختن یک تخم‌مرغ چقدر طول می‌کشد؟", "🚌": "سفر با اتوبوس به شهر دیگر چقدر طول می‌کشد؟", "🏖️": "یک سفر تعطیلات چقدر طول می‌کشد؟" },
      units: { m: "چند دقیقه", h: "چند ساعت", d: "چند روز" },
      seasons: "فصل‌ها را به ترتیب بچین، از {a}.", months: "این ماه‌ها را به ترتیب بچین، از {a}.",
      seasonNames: ["بهار", "تابستان", "پاییز", "زمستان"],
      monthNames: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["ev"];
      if (ctx.done(L("sprout-48"))) kinds.push("dur");
      if (ctx.done(L("sprout-49"))) kinds.push("se", "mo");
      var says = ctx.w("says"), pics = ["🌸", "☀️", "🍂", "❄️"];
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        return k + ":" + rng.int(0, k === "ev" ? ROUTINES.length - 1 : k === "dur" ? DURATIONS.length - 1 : k === "se" ? 3 : 11);
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key), v = m && +m[2];
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "ev") { var r = ROUTINES[v]; return r ? { type: "order", numbered: true, prompt: ctx.w("ev"), say: ctx.w("ev"), items: r.map(function (e) { return { pic: e, say: says[e] }; }) } : null; }
        if (m[1] === "dur") {
          var d = DURATIONS[v];
          if (!d) return null;
          var p = ctx.w("dur")[d[0]], u = ctx.w("units");
          return { type: "choose", show: d[0], prompt: p, say: p, options: ["m", "h", "d"].map(function (k) { return { label: u[k], value: k }; }), answer: d[1] };
        }
        if (m[1] === "se") {
          if (v > 3) return null;
          var sn = ctx.w("seasonNames"), sp = ctx.w("seasons", { a: sn[v] });
          return { type: "order", numbered: true, prompt: sp, say: sp, items: [0, 1, 2, 3].map(function (i) { var j = (v + i) % 4; return { pic: pics[j], label: sn[j], say: sn[j] }; }) };
        }
        if (v > 11) return null;
        var mn = ctx.w("monthNames"), mp = ctx.w("months", { a: mn[v] });
        return { type: "order", numbered: true, prompt: mp, say: mp, items: [0, 1, 2, 3].map(function (i) { var j = (v + i) % 12; return { label: mn[j], say: mn[j] }; }) };
      });
    }
  });

  /* «ده‌تا ده‌تا تا صد» — math-sprout-p24 (Tens to 100). Read a number of bundles and sticks to 100
     (math-sprout-38), tens and ones said as a number, and ten more or ten less with bundles (math-sprout-43).
     Keys: "r:47", "tu:4-3", "m:35+10". */
  B.PRACTICE.push({
    id: "math-sprout-p24", subject: "math", level: "sprout", objectives: ["math.spr.1"],
    needs: ["math-sprout-38"], emoji: "🥢", title: "ده‌تا ده‌تا تا صد",
    lessons: ["math-sprout-38", "math-sprout-39", "math-sprout-40", "math-sprout-41", "math-sprout-42",
      "math-sprout-43", "math-sprout-44", "math-sprout-60"],
    words: { read: "دسته‌ها ده‌تایی‌اند. روی هم چند چوب هست؟", tu: "{t} دسته ده‌تایی و {u} چوب تنها. این چه عددی است؟", more: "{n} و یک دسته ده‌تایی دیگر. چند می‌شود؟", less: "{n} منهای یک دسته ده‌تایی. چند می‌شود؟" },
    make: function (rng, n, ctx) {
      var kinds = ["r", "r", "tu"];
      if (ctx.done(L("sprout-43"))) kinds.push("m", "m");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "tu") return "tu:" + rng.int(1, 9) + "-" + rng.int(0, 9);
        if (k === "m") return "m:" + rng.int(11, 89) + rng.pick(["+", "-"]) + "10";
        return "r:" + rng.int(11, 99);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:([-+])10|-(\d))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2];
        if (m[1] === "r") return a > 100 ? null : { type: "tens", n: a, hundreds: false, prompt: ctx.w("read"), options: optsNum(rng, a, [(a % 10) * 10 + Math.floor(a / 10), a + 10, a - 1, a + 1]) };
        if (m[1] === "tu") {
          var u = +m[4], x = a * 10 + u;
          if (m[4] == null || a > 9) return null;
          return ask(ctx.w("tu", { t: fa(a), u: fa(u) }), x, optsFa(rng, x, [u * 10 + a, a + u, x + 10, x + 1]));
        }
        if (!m[3]) return null;
        var y = m[3] === "+" ? a + 10 : a - 10;
        if (y < 0 || y > 100) return null;
        return { type: "tens", n: a, b: m[3] === "+" ? 10 : -10, hundreds: false, prompt: ctx.w(m[3] === "+" ? "more" : "less", { n: fa(a) }), options: optsNum(rng, y, [m[3] === "+" ? a + 1 : a - 1, y + 10, m[3] === "+" ? a - 10 : a + 10]) };
      });
    }
  });

  /* «ضلع، گوشه، شکل فضایی» — math-sprout-p25 (Sides and corners). How many sides or corners a shape has, shapes to
     sort by three sides or four (math-sprout-19), solids to pair with things that look like them (math-sprout-20).
     Keys: "sd:triangle", "cn:square", "sort", "sol:2". */
  var SOLID_PAIRS = [["cube", "🎲"], ["sphere", "⚽"], ["cylinder", "🥫"], ["cone", "🍦"], ["cuboid", "📦"]];
  B.PRACTICE.push({
    id: "math-sprout-p25", subject: "math", level: "sprout", objectives: ["math.spr.12"],
    needs: ["math-sprout-19"], emoji: "🔺", title: "ضلع و گوشه",
    lessons: ["math-sprout-19", "math-sprout-20", "math-sprout-21", "math-sprout-54", "math-sprout-55",
      "math-sprout-59", "math-sapling-44", "math-sapling-45"],
    words: {
      sides: "این شکل چند ضلع دارد؟", corners: "این شکل چند گوشه دارد؟",
      sort: "شکل‌های سه‌ضلعی یک طرف، چهارضلعی یک طرف.", three: "سه ضلع", four: "چهار ضلع",
      pairs: "هر شکل فضایی را با چیزی جفت کن که شبیه آن است",
      solids: { cube: "مکعب", sphere: "کره", cylinder: "استوانه", cone: "مخروط", cuboid: "مکعب مستطیل" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["sd", "cn", "sort"], sides = { triangle: 3, square: 4, rectangle: 4, circle: 0 };
      if (ctx.done(L("sprout-20"))) kinds.push("sol");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "sort") return "sort";
        if (k === "sol") return "sol:" + rng.sample([0, 1, 2, 3, 4], 3).sort().join("-");
        return k + ":" + rng.pick(Object.keys(sides));
      }, function (key) {
        if (key === "sort") {
          var tri = rng.sample(SHAPE_FORMS.triangle, 3), quad = rng.sample(SHAPE_FORMS.square.concat(SHAPE_FORMS.rectangle), 3);
          return { type: "sort", prompt: ctx.w("sort"), say: ctx.w("sort"), baskets: [{ label: ctx.w("three"), shape: "triangle", value: "3" }, { label: ctx.w("four"), shape: "square", value: "4" }],
            items: rng.shuffle(tri.map(function (s) { return { shape: s, basket: "3" }; }).concat(quad.map(function (s) { return { shape: s, basket: "4" }; }))) };
        }
        var m = /^(sd|cn|sol):([\w-]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "sol") {
          var idx = m[2].split("-").map(Number).map(function (i) { return SOLID_PAIRS[i]; });
          if (idx.length !== 3 || idx.some(function (x) { return !x; })) return null;
          var names = ctx.w("solids");
          return { type: "pairs", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: idx.map(function (s) { return [{ label: names[s[0]], say: names[s[0]] }, s[1]]; }) };
        }
        var x = sides[m[2]];
        if (x == null) return null;
        var p = ctx.w(m[1] === "sd" ? "sides" : "corners");
        return { type: "shape", show: rng.pick(SHAPE_FORMS[m[2]]), prompt: p, say: p, options: rng.shuffle(x === 0 ? [0, 1, 4] : x === 3 ? [3, 4, 5] : [3, 4, 5]), answer: x };
      });
    }
  });

  /* «کارآگاه الگو» — math-sprout-p26 (Pattern detective). Which part of a repeating pattern repeats, the rule of a
     number pattern, and the next numbers of a pattern that grows by 3 or 4 (math-sprout-56, math-sprout-57).
     Keys: "u:ABB", "rule:2-5", "g:1-3". */
  B.PRACTICE.push({
    id: "math-sprout-p26", subject: "math", level: "sprout", objectives: ["math.spr.14"],
    needs: ["math-sprout-56"], emoji: "🔍", title: "کارآگاه الگو",
    lessons: ["math-sprout-56", "math-sprout-57"],
    words: { unit: "کدام تکه در این الگو تکرار می‌شود؟", rule: "قانون این الگو چیست؟", plus: "هر بار {d} تا بیشتر", fill: "الگو را پیدا کن و جاهای خالی را پر کن." },
    make: function (rng, n, ctx) {
      var kinds = ["u", "rule"];
      if (ctx.done(L("sprout-57"))) kinds.push("g", "g");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "u") return "u:" + rng.pick(["AB", "AAB", "ABB", "ABC"]);
        if (k === "rule") return "rule:" + rng.int(1, 10) + "-" + rng.pick([1, 2, 5, 10]);
        return "g:" + rng.int(1, 10) + "-" + rng.pick([3, 4]);
      }, function (key) {
        var m = /^([a-z]+):([ABC]+|\d+)(?:-(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "u") {
          if (!/^[ABC]+$/.test(m[2])) return null;
          var pics = rng.shuffle(rng.pick([PAT.c, PAT.a, PAT.f])), unit = m[2].split("").map(function (c) { return pics["ABC".indexOf(c)]; });
          var seq = "";
          for (var i = 0; i < unit.length * 3; i++) seq += unit[i % unit.length];
          var right = unit.join(""), wrong = [unit.slice(0, -1).join("") || pics[2], unit.concat(unit[0]).join(""), unit.slice().reverse().join("")].filter(function (w) { return w !== right; });
          var opts = [right];
          wrong.forEach(function (w) { if (opts.length < 3 && opts.indexOf(w) === -1) opts.push(w); });
          return { type: "choose", show: seq, prompt: ctx.w("unit"), say: ctx.w("unit"), pic: true, stack: true, options: rng.shuffle(opts).map(function (o) { return { label: o, value: o }; }), answer: right };
        }
        var a = +m[2], d = +m[3];
        if (!d) return null;
        var vals = range(0, 5).map(function (j) { return a + j * d; });
        if (m[1] === "rule") {
          if ([1, 2, 5, 10].indexOf(d) === -1) return null;
          var others = [1, 2, 5, 10].filter(function (x) { return x !== d; });
          return { type: "choose", ltr: true, show: vals.slice(0, 4).map(fa).join(" ، ") + " ، …", prompt: ctx.w("rule"), say: ctx.w("rule"), stack: true,
            options: rng.shuffle([d].concat(rng.sample(others, 2))).map(function (x) { return { label: ctx.w("plus", { d: fa(x) }), value: String(x) }; }), answer: String(d) };
        }
        if (d !== 3 && d !== 4) return null;
        var blanks = rng.sample([2, 3, 4, 5], 2).sort(), rt = blanks.map(function (i) { return vals[i]; });
        return { type: "pattern", prompt: ctx.w("fill"), say: ctx.w("fill"), ltr: true, seq: vals, blanks: blanks, options: rng.shuffle(rt.concat([rt[0] + 1, rt[1] - 1].filter(function (v) { return vals.indexOf(v) === -1; }))) };
      });
    }
  });

  /* «خانواده عددها» — math-sapling-p16 (Fact families). Sums and differences to sort by their answer, each fact to
     pair with the one that undoes it (8 + 5 and 13 − 5), and the wrong fact among three. Facts to 20.
     Keys: "s:12-15", "f:8+5", "w:3". */
  B.PRACTICE.push({
    id: "math-sapling-p16", subject: "math", level: "sapling", objectives: ["math.sap.1", "math.sap.12"],
    needs: ["math-sapling-3"], emoji: "👨‍👩‍👧", title: "خانواده عددها",
    lessons: ["math-sapling-3", "math-sapling-1", "math-sapling-2", "math-sapling-22", "math-sapling-23",
      "math-sapling-12", "math-sapling-8", "math-sapling-13", "math-sapling-34"],
    words: { sort: "جواب هر کدام {a} می‌شود یا {b}؟ در سبد جوابش بگذار.", fam: "هر جمع را با تفریقی جفت کن که از همان خانواده است", wrong: "یکی از این جمله‌ها اشتباه است. کدام؟" },
    make: function (rng, n, ctx) {
      function fact(x) { var b = rng.int(2, 9); return rng() < 0.5 && x - b >= 0 ? fa(x - b) + " + " + fa(b) : fa(x + b) + " − " + fa(b); }
      return run(n, ctx, function () {
        var k = rng.pick(["s", "f", "w"]);
        if (k === "s") { var two = rng.sample(range(11, 18), 2).sort(function (a, b) { return a - b; }); return "s:" + two.join("-"); }
        if (k === "f") return "f:" + rng.int(11, 17);
        return "w:" + rng.int(1, 99);
      }, function (key) {
        var m = /^([sfw]):(\d+)(?:-(\d+))?$/.exec(key);
        if (!m) return null;
        if (m[1] === "s") {
          var x = +m[2], y = +m[3];
          if (!y || x >= y || y > 20) return null;
          var sp = ctx.w("sort", { a: fa(x), b: fa(y) });
          return { type: "sort", prompt: sp, say: sp, baskets: [{ label: fa(x), value: String(x) }, { label: fa(y), value: String(y) }],
            items: rng.shuffle([x, x, x, y, y, y].map(function (v) { return { label: fact(v), basket: String(v) }; })) };
        }
        if (m[1] === "f") {
          var c = +m[2];
          if (c < 11 || c > 20) return null;
          var parts = rng.sample(range(c - 9, 9), 3);
          return { type: "pairs", prompt: ctx.w("fam"), say: ctx.w("fam"), pairs: parts.map(function (a) { return [{ label: fa(a) + " + " + fa(c - a) }, { label: fa(c) + " − " + fa(c - a) }]; }) };
        }
        var sents = [0, 1, 2].map(function () { var a = rng.int(4, 9), b = rng.int(4, 9); return [a, b, a + b]; }), bad = rng.int(0, 2);
        sents[bad][2] += rng.pick([1, -1]);
        var opts = sents.map(function (s, i) { return { label: fa(s[0]) + " + " + fa(s[1]) + " = " + fa(s[2]), value: String(i) }; });
        return { type: "choose", prompt: ctx.w("wrong"), say: ctx.w("wrong"), stack: true, ltr: true, options: opts, answer: String(bad) };
      });
    }
  });

  /* «پرش روی خط عددی» — math-sapling-p17 (Number line jumps). Jumps that pass ten on the number line (math-sapling-1),
     tens jumps and +9 as ten and one back (math-sapling-24, math-sapling-25), and runs of numbers ten apart to fill.
     Keys: "nl:8+7", "j:45+3" (three jumps of ten), "q:36+10", "n9:47+9". */
  B.PRACTICE.push({
    id: "math-sapling-p17", subject: "math", level: "sapling", objectives: ["math.sap.25", "math.sap.1"],
    needs: ["math-sapling-1"], emoji: "🐸", title: "پرش روی خط عددی",
    lessons: ["math-sapling-1", "math-sapling-2", "math-sapling-22", "math-sapling-23", "math-sapling-4",
      "math-sapling-5", "math-sapling-24", "math-sapling-12", "math-sapling-7", "math-sapling-8", "math-sapling-25",
      "math-sapling-26", "math-sapling-50", "math-sapling-51", "math-sapling-54", "math-sapling-81",
      "math-sapling-92"],
    words: {
      nl: "روی خط عددی: اول تا ده بپر، بعد بقیه.", jumps: "قورباغه روی {a} است و {k} پرش ده‌تایی جلو می‌رود. به کجا می‌رسد؟",
      run: "عددها ده‌تا ده‌تا {dir} می‌روند. جاهای خالی را پر کن.", up: "بالا", down: "پایین",
      n9: "{a} + ۹: ده‌تا جلو برو، بعد یکی برگرد. جواب چند است؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["nl", "nl"];
      if (ctx.done(L("sapling-24"))) kinds.push("j", "q");
      if (ctx.done(L("sapling-25"))) kinds.push("n9");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "nl") { var a = rng.int(6, 9); return "nl:" + a + (rng() < 0.7 ? "+" + rng.int(11 - a, 9) : "-" + rng.int(1, a - 1)); }
        if (k === "j") return "j:" + rng.int(11, 59) + "+" + rng.int(2, 4);
        if (k === "q") return "q:" + rng.int(1, 49) + rng.pick(["+", "-"]) + "10";
        return "n9:" + rng.int(21, 80) + "+9";
      }, function (key) {
        var m = /^([a-z\d]+):(\d+)([-+])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[4], plus = m[3] === "+";
        if (m[1] === "nl") { var x = plus ? a + b : a - b; return x < 0 || x > 20 || a > 20 ? null : { type: "numline", a: a, b: plus ? b : -b, options: near(rng, x, 1, 0, 20), prompt: ctx.w("nl") }; }
        if (m[1] === "j") { var y = a + 10 * b; return b > 5 || y > 100 ? null : ask(ctx.w("jumps", { a: fa(a), k: fa(b) }), y, optsFa(rng, y, [a + b, y - 10, y + 10, y + 1])); }
        if (m[1] === "q") {
          if (b !== 10) return null;
          var seq = range(0, 5).map(function (i) { return plus ? a + 10 * i : a + 50 - 10 * i; });
          if (seq.some(function (v) { return v < 0 || v > 100; })) return null;
          var bl = rng.sample([1, 2, 3, 4, 5], 2).sort(), rt = bl.map(function (i) { return seq[i]; });
          var p = ctx.w("run", { dir: ctx.w(plus ? "up" : "down") });
          return { type: "pattern", prompt: p, say: p, ltr: true, seq: seq, blanks: bl, options: rng.shuffle(rt.concat([rt[0] + 1, rt[1] - 1])) };
        }
        if (b !== 9 || !plus) return null;
        return ask(ctx.w("n9", { a: fa(a) }), a + 9, optsFa(rng, a + 9, [a + 10, a + 8, a + 19]), ex(a, "+", 9));
      });
    }
  });

  /* «با دسته‌ها جمع و تفریق کن» — math-sapling-p18 (Add and take with bundles). Read and build two-digit numbers with
     bundles (math-sapling-4); add a two-digit number with bundles, tying ten sticks into a bundle (math-sapling-7);
     take one away, opening a bundle when needed (math-sapling-8). Keys: "r:47", "a:36+27", "t:52-18". */
  B.PRACTICE.push({
    id: "math-sapling-p18", subject: "math", level: "sapling", objectives: ["math.sap.4", "math.sap.2"],
    needs: ["math-sapling-4"], emoji: "🥢", title: "با دسته‌ها جمع و تفریق کن",
    lessons: ["math-sapling-4", "math-sapling-5", "math-sapling-6", "math-sapling-24", "math-sapling-7",
      "math-sapling-8", "math-sapling-25", "math-sapling-26", "math-sapling-27", "math-sapling-17",
      "math-sapling-40"],
    words: { read: "چند دسته ده‌تایی و چند چوب تنها؟ این چه عددی است؟", add: "{a} و {b} را با دسته‌ها جمع کن. چند می‌شود؟", take: "از {a} تا {b} تا بردار. اگر لازم شد یک دسته را باز کن. چند می‌ماند؟" },
    make: function (rng, n, ctx) {
      var kinds = ["r"];
      if (ctx.done(L("sapling-7"))) kinds.push("a", "a");
      if (ctx.done(L("sapling-8"))) kinds.push("t", "t");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "r") return "r:" + rng.int(11, 99);
        if (k === "a") { var a = rng.int(12, 69); return "a:" + a + "+" + rng.int(11, 99 - a); }
        var c = rng.int(31, 99); return "t:" + c + "-" + rng.int(11, c - 10);
      }, function (key) {
        var m = /^([rat]):(\d+)(?:([-+])(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[4];
        if (m[1] === "r") return a > 99 ? null : { type: "tens", n: a, hundreds: false, prompt: ctx.w("read"), options: optsNum(rng, a, [(a % 10) * 10 + Math.floor(a / 10), a + 10, a - 10]) };
        var x = m[1] === "a" ? a + b : a - b;
        if (!b || x < 0 || x > 100 || (m[1] === "a") !== (m[3] === "+")) return null;
        return { type: "tens", n: a, b: m[1] === "a" ? b : -b, hundreds: false, prompt: ctx.w(m[1] === "a" ? "add" : "take", { a: fa(a), b: fa(b) }),
          options: optsNum(rng, x, [x + 10, x - 10, m[1] === "a" ? x - 1 : x + 1]) };
      });
    }
  });

  /* «حدس بزن و بررسی کن» — math-sapling-p19 (Estimate and check). Which round number a sum or difference is near;
     whether a worked answer is right; which of three answers makes sense (math-sapling-28; three digits after
     math-sapling-41, four after math-sapling-55). Keys: "e:47+38", "ok:256+137-1" (-1: a slip), "sense:48+31". */
  B.PRACTICE.push({
    id: "math-sapling-p19", subject: "math", level: "sapling", objectives: ["math.sap.4", "math.sap.5", "math.sap.24"],
    needs: ["math-sapling-28"], emoji: "🤔", title: "حدس بزن و بررسی کن",
    lessons: ["math-sapling-28", "math-sapling-29", "math-sapling-32", "math-sapling-33", "math-sapling-35",
      "math-sapling-41", "math-sapling-42", "math-sapling-43", "math-sapling-52", "math-sapling-53",
      "math-sapling-55", "math-sapling-80", "math-sapling-81", "math-sapling-91", "math-sapling-98"],
    words: { est: "حدس بزن: جواب به کدام نزدیک‌تر است؟", ok: "آرش این را حساب کرده است. درست است؟", yes: "درست است", no: "اشتباه است", sense: "بدون حساب دقیق: کدام جواب درست است؟" },
    make: function (rng, n, ctx) {
      var sizes = [2];
      if (ctx.done(L("sapling-41"))) sizes.push(3);
      if (ctx.done(L("sapling-55"))) sizes.push(4);
      return run(n, ctx, function () {
        var d = rng.pick(sizes), lo = Math.pow(10, d - 1), hi = Math.pow(10, d) - 1, a = rng.int(lo, hi), plus = rng() < 0.6;
        var b = plus ? rng.int(lo, Math.max(lo, hi - a)) : rng.int(lo, a);
        if (plus && a + b > hi * 1.5) return null;
        var k = rng.pick(["e", "ok", "sense"]);
        return k + ":" + a + (plus ? "+" : "-") + b + (k === "ok" ? "-" + rng.pick([0, 1, 10, 100]) : "");
      }, function (key) {
        var m = /^([a-z]+):(\d+)([-+])(\d+)(?:-(\d+))?$/.exec(key);
        if (!m) return null;
        var a = +m[2], b = +m[4], plus = m[3] === "+", x = plus ? a + b : a - b, d = String(Math.max(a, b)).length;
        if (x < 0 || sizes.indexOf(d) === -1) return null;
        var u = d >= 3 ? 100 : 10, r = function (v) { return Math.round(v / u) * u; }, show = ex(a, m[3], b);
        if (m[1] === "e") { var e = plus ? r(a) + r(b) : r(a) - r(b); return ask(ctx.w("est"), e, optsFa(rng, e, [e + u, e - u, e + 2 * u]), show.replace(" = ؟", " ≈ ؟")); }
        if (m[1] === "ok") {
          var slip = +m[5];
          if ([0, 1, 10, 100].indexOf(slip) === -1 || (slip === 100 && d < 3)) return null;
          var shown = x + slip;
          return { type: "choose", ltr: true, show: show.replace("؟", fa(shown)), prompt: ctx.w("ok"), say: ctx.w("ok"), options: [{ label: ctx.w("yes"), value: "y" }, { label: ctx.w("no"), value: "n" }], answer: slip ? "n" : "y" };
        }
        if (m[1] !== "sense") return null;
        return ask(ctx.w("sense"), x, optsFa(rng, x, [x * 10, Math.max(1, Math.round(x / 10)), x + 10 * u]), show);
      });
    }
  });

  /* «ترتیب عددهای بزرگ» — math-sapling-p20 (Order big numbers). Four numbers to put in order (to 100, to 1,000 after
     math-sapling-17, to 10,000 after math-sapling-53); the biggest number made from three digits (math-sapling-40);
     which two hundreds a number is between (math-sapling-54). Keys: "o:47-74-40-70", "dg:3-7-1", "bt:347". */
  B.PRACTICE.push({
    id: "math-sapling-p20", subject: "math", level: "sapling", objectives: ["math.sap.2", "math.sap.3"],
    needs: ["math-sapling-6"], emoji: "📶", title: "ترتیب عددهای بزرگ",
    lessons: ["math-sapling-6", "math-sapling-24", "math-sapling-17", "math-sapling-40", "math-sapling-41",
      "math-sapling-43", "math-sapling-50", "math-sapling-52", "math-sapling-53", "math-sapling-54",
      "math-sapling-60", "math-sapling-62"],
    words: { order: "از کوچک به بزرگ بچین.", digits: "با این سه رقم، بزرگ‌ترین عدد کدام است؟ {d}", between: "{n} بین کدام دو صدتایی است؟", and: "و" },
    make: function (rng, n, ctx) {
      var max = ctx.done(L("sapling-53")) ? 9999 : ctx.done(L("sapling-17")) ? 999 : 100, kinds = ["o", "o"];
      if (ctx.done(L("sapling-40"))) kinds.push("dg");
      if (ctx.done(L("sapling-54"))) kinds.push("bt");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "o") { var a = rng.int(10, max), s = String(a); var alt = +(s.split("").reverse().join("")); return "o:" + rng.shuffle([a, alt === a ? a + 1 : alt, Math.min(max, a + rng.int(1, 20)), Math.max(1, a - rng.int(1, 30))]).join("-"); }
        if (k === "dg") return "dg:" + rng.sample(range(1, 9), 3).join("-");
        return "bt:" + rng.int(101, 999);
      }, function (key) {
        var m = /^([a-z]+):([\d-]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var v = m[2].split("-").map(Number);
        if (m[1] === "o") {
          if (v.length !== 4 || new Set(v).size !== 4 || v.some(function (x) { return x > max || x < 1; })) return null;
          return { type: "order", prompt: ctx.w("order"), say: ctx.w("order"), ltr: true, items: v.slice().sort(function (a, b) { return a - b; }) };
        }
        if (m[1] === "dg") {
          if (v.length !== 3 || new Set(v).size !== 3 || v.some(function (x) { return x < 1 || x > 9; })) return null;
          var desc = v.slice().sort(function (a, b) { return b - a; }), big = +desc.join("");
          var wrong = [+v.join(""), +desc.slice().reverse().join(""), +[desc[0], desc[2], desc[1]].join("")];
          return ask(ctx.w("digits", { d: v.map(fa).join(" ، ") }), big, optsFa(rng, big, wrong));
        }
        var nn = v[0];
        if (v.length !== 1 || nn < 101 || nn > 999 || nn % 100 === 0) return null;
        var lo = Math.floor(nn / 100) * 100, lab = function (a) { return fa(a) + " " + ctx.w("and") + " " + fa(a + 100); };
        return { type: "choose", prompt: ctx.w("between", { n: fa(nn) }), say: ctx.w("between", { n: fa(nn) }), answer: String(lo),
          options: rng.shuffle([lo, lo - 100 >= 0 ? lo - 100 : lo + 200, lo + 100]).map(function (a) { return { label: lab(a), value: String(a) }; }) };
      });
    }
  });

  /* «دسته‌های مساوی» — math-sapling-p21 (Equal groups). Share things on plates equally (math-sapling-18), a repeated
     sum written as a times sentence, and arrays to count or build (math-sapling-63). Keys: "sh:12-3", "rep:4x3",
     "ac:3x5", "ab:4x2". */
  B.PRACTICE.push({
    id: "math-sapling-p21", subject: "math", level: "sapling", objectives: ["math.sap.7"],
    needs: ["math-sapling-18"], emoji: "🍽️", title: "دسته‌های مساوی",
    lessons: ["math-sapling-18", "math-sapling-58", "math-sapling-63", "math-sapling-64", "math-sapling-65",
      "math-sapling-66", "math-sapling-67", "math-sapling-69", "math-sapling-70", "math-sapling-71",
      "math-sapling-77", "math-sapling-78"],
    words: {
      share: "{n} {t} را مساوی روی {p} بشقاب بگذار.", rep: "این جمع را با ضرب بنویس:", count: "چند ردیف و در هر ردیف چندتا؟ روی هم چندتا؟",
      build: "یک آرایه {r} در {c} بساز: {r} ردیف، در هر ردیف {c} تا.", things: { "🍪": "شیرینی", "🍎": "سیب", "🍬": "آب‌نبات", "🥚": "تخم‌مرغ" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["sh", "sh", "rep"];
      if (ctx.done(L("sapling-63"))) kinds.push("ac", "ab");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), r = rng.int(2, 5), c = rng.int(2, 5);
        return k === "sh" ? "sh:" + r * c + "-" + r : k + ":" + r + "x" + c;
      }, function (key) {
        var m = /^([a-z]+):(\d+)([-x])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[4], t = rng.pick(["🍪", "🍎", "🍬", "🥚"]);
        if (m[1] === "sh") return a % b || b < 2 || b > 5 || a > 25 ? null : { type: "feed", n: a, plates: b, food: t, prompt: ctx.w("share", { n: fa(a), t: ctx.w("things")[t], p: fa(b) }) };
        if (a < 2 || a > 6 || b < 2 || b > 6) return null;
        if (m[1] === "rep") {
          var right = fa(a) + " × " + fa(b), sum = range(1, a).map(function () { return fa(b); }).join(" + ");
          return { type: "choose", ltr: true, show: sum, prompt: ctx.w("rep"), say: ctx.w("rep"), options: rng.shuffle([right, fa(a) + " + " + fa(b), fa(a + b) + " × " + fa(b)]), answer: right };
        }
        if (m[1] === "ac") return { type: "array", rows: a, cols: b, thing: t, prompt: ctx.w("count"), options: optsNum(rng, a * b, [a + b, a * b + b, a * b - 1]) };
        return { type: "array", ask: "build", rows: a, cols: b, max: [6, 8], prompt: ctx.w("build", { r: fa(a), c: fa(b) }) };
      });
    }
  });

  /* «بازی جدول ضرب» — math-sapling-p22 (Times-table games). Facts to pair with their answers in a memory game,
     numbers to sort into a table or not, and the division that undoes a times fact (math-sapling-72). Tables in the
     order taught. Keys: "mem:5", "in:4", "dv:3x4". */
  B.PRACTICE.push({
    id: "math-sapling-p22", subject: "math", level: "sapling", objectives: ["math.sap.8", "math.sap.9"],
    needs: ["math-sapling-64"], emoji: "🃏", title: "بازی جدول ضرب",
    lessons: ["math-sapling-64", "math-sapling-65", "math-sapling-66", "math-sapling-67", "math-sapling-68",
      "math-sapling-69", "math-sapling-72", "math-sapling-75", "math-sapling-86", "math-sapling-87"],
    words: { mem: "کارت‌ها را دوتا دوتا برگردان. هر ضرب را با جوابش جفت کن.", inT: "کدام عددها در جدول {k} هستند؟", yes: "در جدول {k}", no: "در جدول {k} نیست", dv: "اگر {a} × {b} = {c}، پس {c} ÷ {b} چند است؟" },
    make: function (rng, n, ctx) {
      var tables = [2, 5, 10], kinds = ["mem", "in"];
      if (ctx.done(L("sapling-65"))) tables.push(4, 3, 6);
      if (ctx.done(L("sapling-66"))) tables.push(9, 8, 7);
      if (ctx.done(L("sapling-72"))) kinds.push("dv", "dv");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), t = rng.pick(tables);
        return k === "dv" ? "dv:" + rng.int(2, 10) + "x" + t : k + ":" + t;
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:x(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "dv") {
          var a = +m[2], b = +m[3];
          if (tables.indexOf(b) === -1 || a > 10) return null;
          return ask(ctx.w("dv", { a: fa(a), b: fa(b), c: fa(a * b) }), a, optsFa(rng, a, [a + 1, a - 1, b, a * b - b]), ex(a * b, "/", b));
        }
        var k = +m[2];
        if (tables.indexOf(k) === -1) return null;
        if (m[1] === "mem") {
          var as = rng.sample(range(2, 10), 3);
          return { type: "pairs", hidden: true, say: ctx.w("mem"), pairs: as.map(function (a) { return [{ label: fa(a) + " × " + fa(k) }, a * k]; }) };
        }
        var yes = rng.sample(range(2, 10), 3).map(function (a) { return a * k; }), no = [];
        while (no.length < 3) { var v = rng.int(5, 10 * k); if (v % k && no.indexOf(v) === -1) no.push(v); }
        var p = ctx.w("inT", { k: fa(k) });
        return { type: "sort", prompt: p, say: p, baskets: [{ label: ctx.w("yes", { k: fa(k) }), pic: "✅", value: "y" }, { label: ctx.w("no", { k: fa(k) }), pic: "❌", value: "n" }],
          items: rng.shuffle(yes.map(function (v2) { return { label: fa(v2), basket: "y" }; }).concat(no.map(function (v2) { return { label: fa(v2), basket: "n" }; }))) };
      });
    }
  });

  /* «مسئله‌های ضرب و تقسیم» — math-sapling-p23 (Times and sharing stories). Equal groups and sharing (math-sapling-70),
     how many groups (math-sapling-71), what is left over (math-sapling-73), and a two-digit price times a number
     (math-sapling-89). Keys: "g:6x4", "sh:24/3", "gr:20/5", "rm:23/4", "big:3x35". */
  B.PRACTICE.push({
    id: "math-sapling-p23", subject: "math", level: "sapling", objectives: ["math.sap.11", "math.sap.9", "math.sap.10"],
    needs: ["math-sapling-70"], emoji: "📦", title: "مسئله‌های ضرب و تقسیم",
    lessons: ["math-sapling-70", "math-sapling-71", "math-sapling-72", "math-sapling-73", "math-sapling-74",
      "math-sapling-86", "math-sapling-87", "math-sapling-88", "math-sapling-89", "math-sapling-97"],
    words: {
      g: "{a} بشقاب داریم و در هر بشقاب {b} {t} است. روی هم چند {t} داریم؟",
      sh: "{p} {a} {t} را مساوی بین {b} دوستش تقسیم کرد. به هر کدام چندتا رسید؟",
      gr: "{a} {t} داریم. در هر جعبه {b} تا جا می‌شود. چند جعبه لازم است؟",
      rm: "{a} {t} را در جعبه‌های {b}تایی می‌چینیم. چند جعبه پر می‌شود و چندتا بیرون می‌ماند؟", remLabel: "{q} جعبه، {r} تا بیرون",
      big: "هر بلیت قطار {b} هزار تومان است. {a} بلیت چند هزار تومان می‌شود؟",
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه"],
      things: { "🍪": "شیرینی", "🍎": "سیب", "✏️": "مداد", "🥚": "تخم‌مرغ", "🍊": "پرتقال" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["g", "sh"];
      if (ctx.done(L("sapling-71"))) kinds.push("gr");
      if (ctx.done(L("sapling-73"))) kinds.push("rm");
      if (ctx.done(L("sapling-89"))) kinds.push("big");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), a = rng.int(2, 9), b = rng.int(2, 9);
        if (k === "g") return "g:" + a + "x" + b;
        if (k === "sh" || k === "gr") return k + ":" + a * b + "/" + b;
        if (k === "rm") return "rm:" + (a * b + rng.int(1, b - 1)) + "/" + b;
        return "big:" + rng.int(2, 5) + "x" + rng.int(12, 45);
      }, function (key) {
        var m = /^([a-z]+):(\d+)([x/])(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var k = m[1], a = +m[2], b = +m[4], t = rng.pick(["🍪", "🍎", "✏️", "🥚", "🍊"]), people = ctx.w("people");
        var w = { a: fa(a), b: fa(b), t: ctx.w("things")[t], p: people[rng.int(0, people.length - 1)] }, x;
        if (k === "g" || k === "big") { x = a * b; return k === "big" && b < 10 ? null : askPic(ctx.w(k, w), x, optsFa(rng, x, [a + b, x + b, x - a]), k === "big" ? "🎫" : t); }
        if (b < 2 || b > 9) return null;
        if (k === "rm") {
          var q = Math.floor(a / b), r = a % b;
          if (!r) return null;
          var lab = function (qq, rr) { return { label: ctx.w("remLabel", { q: fa(qq), r: fa(rr) }), value: qq + "r" + rr }; };
          return { type: "choose", prompt: ctx.w("rm", w), say: ctx.w("rm", w), stack: true, options: rng.shuffle([lab(q, r), lab(q + 1, 0), lab(q - 1, r + b)]), answer: q + "r" + r };
        }
        if (a % b) return null;
        x = a / b;
        return askPic(ctx.w(k, w), x, optsFa(rng, x, [x + 1, x - 1, a - b, b]), t);
      });
    }
  });

  /* «کسر چندتا؟» — math-sapling-p24 (Fractions in words). Half or a quarter of a number (math-sapling-19), a fraction
     of a set (math-sapling-58), unit fractions to order (math-sapling-60) and fractions to sort by more or less than a
     half (math-sapling-62). Keys: "of:1/4-12", "ord:2-3-4-8", "half". */
  B.PRACTICE.push({
    id: "math-sapling-p24", subject: "math", level: "sapling", objectives: ["math.sap.13", "math.sap.14"],
    needs: ["math-sapling-19"], emoji: "🍰", title: "کسر چندتا؟",
    lessons: ["math-sapling-19", "math-sapling-56", "math-sapling-57", "math-sapling-58", "math-sapling-59",
      "math-sapling-60", "math-sapling-61", "math-sapling-62", "math-sapling-98"],
    words: {
      of: "{f} {n} {t} چندتاست؟", order: "از کوچک به بزرگ بچین.", half: "کمتر از نصف یا بیشتر از نصف؟", less: "کمتر از نصف", more: "بیشتر از نصف",
      things: { "🍬": "آب‌نبات", "🍓": "توت‌فرنگی", "🌰": "گردو", "🍪": "شیرینی" },
      nums: ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت"],
      dens: { 2: ["دوم", "دوم"], 3: ["سوم", "سوم"], 4: ["چهارم", "چهارم"], 5: ["پنجم", "پنجم"], 6: ["ششم", "ششم"], 8: ["هشتم", "هشتم"] },
      frac: "{n}‌{d}"
    },
    make: function (rng, n, ctx) {
      var any = ctx.done(L("sapling-58")), kinds = ["of", "of"];
      if (ctx.done(L("sapling-60"))) kinds.push("ord");
      if (ctx.done(L("sapling-62"))) kinds.push("half");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "of") { var d = rng.pick(any ? [2, 3, 4, 5, 6] : [2, 4]), a = any ? rng.int(1, d - 1) : 1; return "of:" + a + "/" + d + "-" + d * rng.int(2, 5); }
        if (k === "ord") return "ord:" + rng.sample([2, 3, 4, 5, 6, 8], 4).sort().join("-");
        return "half";
      }, function (key) {
        if (key === "half") {
          if (kinds.indexOf("half") === -1) return null;
          var pool = [[1, 4], [3, 4], [1, 3], [2, 3], [1, 6], [5, 6], [1, 8], [7, 8], [2, 5], [3, 5]];
          var pick = rng.sample(pool.filter(function (f) { return f[0] * 2 < f[1]; }), 3).concat(rng.sample(pool.filter(function (f) { return f[0] * 2 > f[1]; }), 3));
          return { type: "sort", prompt: ctx.w("half"), say: ctx.w("half"), baskets: [{ label: ctx.w("less"), pic: "◔", value: "less" }, { label: ctx.w("more"), pic: "◕", value: "more" }],
            items: rng.shuffle(pick).map(function (f) { return { label: fracName(ctx, f[0], f[1]), basket: f[0] * 2 < f[1] ? "less" : "more" }; }) };
        }
        var m = /^of:(\d)\/(\d)-(\d+)$/.exec(key);
        if (m) {
          var a = +m[1], d = +m[2], all = +m[3];
          if (all % d || a >= d || (!any && (a !== 1 || (d !== 2 && d !== 4)))) return null;
          var x = all / d * a, t = rng.pick(["🍬", "🍓", "🌰", "🍪"]);
          return askPic(ctx.w("of", { f: fracName(ctx, a, d), n: fa(all), t: ctx.w("things")[t] }), x, optsFa(rng, x, [all / d, all - x, x + d, all / a]), t);
        }
        m = /^ord:([\d-]+)$/.exec(key);
        if (!m || kinds.indexOf("ord") === -1) return null;
        var ds = m[1].split("-").map(Number).sort(function (p, q) { return q - p; });
        return { type: "order", prompt: ctx.w("order"), say: ctx.w("order"), ltr: true, items: ds.map(function (dd) { var nm = fracName(ctx, 1, dd); return { label: nm, say: nm }; }) };
      });
    }
  });

  /* «ساعت به زبان ما» — math-sapling-p25 (Clock words and time passing). A time in numbers to match with its words
     (math-sapling-15, quarters after math-sapling-36), minutes in an hour, half and quarter hour (math-sapling-36),
     and the time some minutes later (math-sapling-93). Keys: "w:7:30", "f:2", "lt:3:50+20". */
  B.PRACTICE.push({
    id: "math-sapling-p25", subject: "math", level: "sapling", objectives: ["math.sap.17"],
    needs: ["math-sapling-15"], emoji: "🕰️", title: "ساعت به زبان ما",
    lessons: ["math-sapling-15", "math-sapling-36", "math-sapling-37", "math-sapling-93", "math-sapling-95"],
    words: {
      words: "ساعت {t} را چطور می‌گوییم؟", oclock: "ساعت {h}", half: "{h} و نیم", quarter: "{h} و ربع", toQ: "یک ربع به {h}",
      facts: ["یک ساعت چند دقیقه است؟", "نیم ساعت چند دقیقه است؟", "یک ربع ساعت چند دقیقه است؟", "یک روز چند ساعت است؟"],
      later: "ساعت {t} است. {m} دقیقه بعد ساعت چند می‌شود؟"
    },
    make: function (rng, n, ctx) {
      var q = ctx.done(L("sapling-36")), kinds = ["w", "w", "f"];
      if (ctx.done(L("sapling-93"))) kinds.push("lt", "lt");
      function pad(m) { return (m < 10 ? "0" : "") + m; }
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "w") return "w:" + rng.int(1, 12) + ":" + pad(rng.pick(q ? [0, 30, 15, 45] : [0, 30]));
        if (k === "f") return "f:" + rng.int(0, q ? 3 : 1);
        return "lt:" + rng.int(1, 11) + ":" + pad(5 * rng.int(6, 11)) + "+" + 5 * rng.int(2, 6);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?::(\d+))?(?:\+(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var h = +m[2], mm = m[3] != null ? +m[3] : null;
        if (m[1] === "f") {
          var ans = [60, 30, 15, 24][h];
          if (ans == null || (h > 1 && !q)) return null;
          return ask(ctx.w("facts")[h], ans, optsFa(rng, ans, [100, 60, 30, 15, 24, 12, 10].filter(function (v) { return v !== ans; })));
        }
        if (h < 1 || h > 12) return null;
        var nx = h % 12 + 1, say = function (hh, m2) {
          if (m2 === 0) return ctx.w("oclock", { h: fa(hh) });
          if (m2 === 30) return ctx.w("half", { h: fa(hh) });
          if (m2 === 15) return ctx.w("quarter", { h: fa(hh) });
          return ctx.w("toQ", { h: fa(hh % 12 + 1) });
        };
        if (m[1] === "w") {
          if ([0, 30, 15, 45].indexOf(mm) === -1 || (!q && mm % 30)) return null;
          var right = say(h, mm), opts = [right];
          [say(nx, mm), say(h, (mm + 30) % 60), say((h + 10) % 12 + 1, mm)].forEach(function (o) { if (opts.indexOf(o) === -1 && opts.length < 3) opts.push(o); });
          return { type: "choose", ltr: false, show: fa(h) + ":" + fa(pad(mm)), prompt: ctx.w("words", { t: fa(h) + ":" + fa(pad(mm)) }), say: ctx.w("words", { t: fa(h) + ":" + fa(pad(mm)) }), options: rng.shuffle(opts), answer: right };
        }
        var add = +m[4];
        if (!add || mm == null) return null;
        var tot = mm + add, H = tot >= 60 ? nx : h, M = tot % 60, t2 = H + ":" + pad(M), wrong = [h + ":" + pad(M), H + ":" + pad((M + 10) % 60), (H % 12 + 1) + ":" + pad(M)];
        var o2 = [t2];
        wrong.forEach(function (o) { if (o2.indexOf(o) === -1 && o2.length < 3) o2.push(o); });
        var lp = ctx.w("later", { t: fa(h) + ":" + fa(pad(mm)), m: fa(add) });
        return { type: "choose", prompt: lp, say: lp, ltr: true, options: rng.shuffle(o2).map(function (o) { return { label: o.split(":").map(fa).join(":"), value: o }; }), answer: t2 };
      });
    }
  });

  /* «تقویم و واحدهای زمان» — math-sapling-p26 (Calendar and units of time). Days in a week and hours in a day, the
     days of the week in order (math-sapling-15); months in order, which season, and a date a few days later
     (math-sapling-37). Keys: "u:1", "wk:3", "mo:5", "dt:28-0+5". */
  B.PRACTICE.push({
    id: "math-sapling-p26", subject: "math", level: "sapling", objectives: ["math.sap.17"],
    needs: ["math-sapling-15"], emoji: "📅", title: "تقویم و واحدهای زمان",
    lessons: ["math-sapling-15", "math-sapling-36", "math-sapling-37", "math-sapling-93"],
    words: {
      units: ["یک هفته چند روز است؟", "یک سال چند ماه است؟", "یک فصل چند ماه است؟", "دو هفته چند روز است؟"],
      week: "روزهای هفته را به ترتیب بچین، از {d}.", months: "این ماه‌ها را به ترتیب بچین، از {m}.",
      date: "امروز {d} {m} است. {k} روز بعد چندم {m} است؟",
      days: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
      monthNames: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["u", "wk"];
      if (ctx.done(L("sapling-37"))) kinds.push("mo", "dt", "dt");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "u") return "u:" + rng.int(0, 3);
        if (k === "wk") return "wk:" + rng.int(0, 6);
        if (k === "mo") return "mo:" + rng.int(0, 11);
        return "dt:" + rng.int(1, 20) + "-" + rng.int(0, 11) + "+" + rng.int(2, 9);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:-(\d+)\+(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var v = +m[2];
        if (m[1] === "u") { var ans = [7, 12, 3, 14][v]; return ans == null ? null : ask(ctx.w("units")[v], ans, optsFa(rng, ans, [7, 12, 3, 14, 10, 30].filter(function (x) { return x !== ans; }))); }
        if (m[1] === "wk") {
          if (v > 6) return null;
          var days = ctx.w("days"), wp = ctx.w("week", { d: days[v] });
          return { type: "order", numbered: true, prompt: wp, say: wp, items: range(0, 4).map(function (i) { var d = days[(v + i) % 7]; return { label: d, say: d }; }) };
        }
        var mn = ctx.w("monthNames");
        if (m[1] === "mo") {
          if (v > 11) return null;
          var mp = ctx.w("months", { m: mn[v] });
          return { type: "order", numbered: true, prompt: mp, say: mp, items: range(0, 3).map(function (i) { var x = mn[(v + i) % 12]; return { label: x, say: x }; }) };
        }
        var mo = +m[3], k = +m[4], x2 = v + k;
        if (mo > 11 || x2 > 29) return null;
        return ask(ctx.w("date", { d: fa(v), m: mn[mo], k: fa(k) }), x2, optsFa(rng, x2, [x2 + 1, x2 - 1, v + k + 7]));
      });
    }
  });

  /* «مسئله‌های اندازه» — math-sapling-p27 (Measure problems). Two lengths added or compared (math-sapling-9), which is
     longer in mixed units, a metre or 90 centimetres (math-sapling-31), which is heavier in mixed units
     (math-sapling-38), and three things to put in order by mass or length. Keys: "ad:12+8", "lm:1", "wm:2". */
  var MIXED_LEN = [[[1, "m"], [90, "cm"]], [[150, "cm"], [1, "m"]], [[2, "m"], [250, "cm"]], [[30, "mm"], [2, "cm"]], [[1, "km"], [900, "m"]]];
  var MIXED_MASS = [[[1, "kg"], [800, "g"]], [[1500, "g"], [2, "kg"]], [[3, "kg"], [2900, "g"]], [[500, "g"], [1, "kg"]]];
  var TO_BASE = { mm: 1, cm: 10, m: 1000, km: 1000000, g: 1, kg: 1000 };
  B.PRACTICE.push({
    id: "math-sapling-p27", subject: "math", level: "sapling", objectives: ["math.sap.15", "math.sap.16"],
    needs: ["math-sapling-9"], emoji: "📐", title: "مسئله‌های اندازه",
    lessons: ["math-sapling-9", "math-sapling-30", "math-sapling-31", "math-sapling-16", "math-sapling-38",
      "math-sapling-39", "math-sapling-94", "math-sapling-95"],
    words: {
      add: "یک تکه نخ {a} سانتی‌متر است و تکه دیگر {b} سانتی‌متر. اگر به هم ببندیمشان، چند سانتی‌متر می‌شود؟",
      diff: "مداد {a} سانتی‌متر است و پاک‌کن {b} سانتی‌متر. مداد چند سانتی‌متر درازتر است؟",
      longer: "کدام درازتر است؟", heavier: "کدام سنگین‌تر است؟", same: "به یک اندازه‌اند",
      units: { mm: "میلی‌متر", cm: "سانتی‌متر", m: "متر", km: "کیلومتر", g: "گرم", kg: "کیلوگرم" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["ad", "df"];
      var lens = MIXED_LEN.map(function (p, i) { return i; }).filter(function (i) { var u = MIXED_LEN[i].map(function (q) { return q[1]; }); return ctx.done(L("sapling-31")) && (u.indexOf("mm") === -1 && u.indexOf("km") === -1 || ctx.done(L("sapling-94"))); });
      if (lens.length) kinds.push("lm");
      if (ctx.done(L("sapling-38"))) kinds.push("wm");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "ad") return "ad:" + rng.int(5, 40) + "+" + rng.int(5, 40);
        if (k === "df") { var a = rng.int(10, 19); return "df:" + a + "-" + rng.int(3, a - 2); }
        return k + ":" + (k === "lm" ? rng.pick(lens) : rng.int(0, MIXED_MASS.length - 1));
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:([-+])(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[4];
        if (m[1] === "ad") return !b || m[3] !== "+" ? null : ask(ctx.w("add", { a: fa(a), b: fa(b) }), a + b, optsFa(rng, a + b, [a + b + 10, a + b - 1, Math.abs(a - b)]));
        if (m[1] === "df") return !b || m[3] !== "-" || b >= a ? null : ask(ctx.w("diff", { a: fa(a), b: fa(b) }), a - b, optsFa(rng, a - b, [a + b, a - b + 1, a - b - 1]));
        var pair = (m[1] === "lm" ? MIXED_LEN : MIXED_MASS)[a];
        if (!pair || (m[1] === "lm" && lens.indexOf(a) === -1)) return null;
        var un = ctx.w("units"), lab = function (q) { return fa(q[0]) + " " + un[q[1]]; };
        var v0 = pair[0][0] * TO_BASE[pair[0][1]], v1 = pair[1][0] * TO_BASE[pair[1][1]];
        var right = v0 === v1 ? "same" : v0 > v1 ? "a" : "b", p = ctx.w(m[1] === "lm" ? "longer" : "heavier");
        return { type: "choose", prompt: p, say: p, stack: true, answer: right,
          options: [{ label: lab(pair[0]), value: "a" }, { label: lab(pair[1]), value: "b" }, { label: ctx.w("same"), value: "same" }] };
      });
    }
  });

  /* «خرید» — math-sapling-p28 (Shopping problems). Is the money enough (math-sapling-10), the cost of two things and
     the change (math-sapling-11), and how many of one thing the money buys (math-sapling-21). Keys: "en:40-3",
     "two:1-4-50", "many:30-2". Goods by their place in GOODS. */
  B.PRACTICE.push({
    id: "math-sapling-p28", subject: "math", level: "sapling", objectives: ["math.sap.18", "math.sap.11"],
    needs: ["math-sapling-10"], emoji: "🛒", title: "خرید",
    lessons: ["math-sapling-10", "math-sapling-11", "math-sapling-35", "math-sapling-21"],
    words: {
      enough: "{p} {m} هزار تومان دارد. {a} {c} هزار تومان است. پولش کافی است؟", yes: "بله، کافی است", no: "نه، کم است",
      two: "{p} {a} و {b} خرید و یک اسکناس {m} هزار تومانی داد. چقدر پس گرفت؟",
      many: "هر {a} {c} هزار تومان است. با {m} هزار تومان چندتا می‌شود خرید؟",
      goods: { "🍞": "نان سنگک", "🥛": "شیر", "🧀": "پنیر", "🍎": "سیب", "🍊": "پرتقال", "📒": "دفتر", "✏️": "مداد", "🍯": "عسل", "🥜": "پسته", "🥚": "تخم‌مرغ" },
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا", "یاسمن", "کاوه"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["en"];
      if (ctx.done(L("sapling-11"))) kinds.push("two", "two");
      if (ctx.done(L("sapling-21"))) kinds.push("many");
      return run(n, ctx, function () {
        var k = rng.pick(kinds), g = rng.int(0, GOODS.length - 1), pr = PRICE[GOODS[g]];
        if (k === "en") return "en:" + Math.max(5, pr + rng.pick([-10, -5, 5, 10])) + "-" + g;
        if (k === "two") { var h = rng.int(0, GOODS.length - 1), tot = pr + PRICE[GOODS[h]]; return h === g ? null : "two:" + g + "-" + h + "-" + (tot < 50 ? 50 : 100); }
        var c = [5, 6, 12, 15, 18].indexOf(pr) >= 0 ? pr : 5, gi = GOODS.indexOf(c === pr ? GOODS[g] : "✏️");
        return "many:" + c * rng.int(2, 6) + "-" + gi;
      }, function (key) {
        var m = /^([a-z]+):([\d-]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var v = m[2].split("-").map(Number), goods = ctx.w("goods"), people = ctx.w("people"), p = people[rng.int(0, people.length - 1)];
        if (m[1] === "en") {
          var g = GOODS[v[1]];
          if (!g || v[0] === PRICE[g]) return null;
          var ep = ctx.w("enough", { p: p, m: fa(v[0]), a: goods[g], c: fa(PRICE[g]) });
          return { type: "choose", show: g, prompt: ep, say: ep, options: [{ label: ctx.w("yes"), value: "y" }, { label: ctx.w("no"), value: "n" }], answer: v[0] >= PRICE[g] ? "y" : "n" };
        }
        if (m[1] === "two") {
          var a = GOODS[v[0]], b = GOODS[v[1]], paid = v[2];
          if (!a || !b || a === b || PRICE[a] + PRICE[b] >= paid) return null;
          var x = paid - PRICE[a] - PRICE[b];
          return { type: "money", prompt: ctx.w("two", { p: p, a: goods[a], b: goods[b], m: fa(paid) }), items: [a, b].map(function (e) { return { emoji: e, name: goods[e], price: PRICE[e] }; }), bills: [paid], answer: x, options: optsNum(rng, x, [PRICE[a] + PRICE[b], x + 10, x - 5]) };
        }
        var e = GOODS[v[1]];
        if (!e || v[0] % PRICE[e]) return null;
        var k2 = v[0] / PRICE[e];
        return askPic(ctx.w("many", { a: goods[e], c: fa(PRICE[e]), m: fa(v[0]) }), k2, optsFa(rng, k2, [k2 + 1, k2 - 1, v[0] - PRICE[e]]), e);
      });
    }
  });

  /* «چندضلعی‌ها» — math-sapling-p29 (Polygons). Find a pentagon, hexagon or octagon (math-sapling-44), count a shape's
     sides, count its right angles (math-sapling-45), and sort four-sided shapes from the rest (math-sapling-46).
     Keys: "f:hexagon", "sd:pentagon", "ra:rectangle", "q". */
  var POLY = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, octagon: 8 };
  var QUADS = ["square", "rectangle", "rhombus", "trapezoid", "parallelogram", "kite"];
  B.PRACTICE.push({
    id: "math-sapling-p29", subject: "math", level: "sapling", objectives: ["math.sap.20"],
    needs: ["math-sapling-44"], emoji: "⬡", title: "چندضلعی‌ها",
    lessons: ["math-sapling-44", "math-sapling-45", "math-sapling-46", "math-sapling-47", "math-sapling-48",
      "math-sapling-49", "math-sapling-51", "math-sapling-96"],
    words: {
      find: "{name} کدام است؟", sides: "این شکل چند ضلع دارد؟", right: "این شکل چند گوشه راست دارد؟",
      quad: "چهارضلعی‌ها یک طرف، بقیه یک طرف.", isQuad: "چهارضلعی", notQuad: "چهارضلعی نیست",
      names: { triangle: "مثلث", square: "مربع", rectangle: "مستطیل", pentagon: "پنج‌ضلعی", hexagon: "شش‌ضلعی", octagon: "هشت‌ضلعی" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["f", "sd"];
      if (ctx.done(L("sapling-45"))) kinds.push("ra");
      if (ctx.done(L("sapling-46"))) kinds.push("q");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "q") return "q";
        if (k === "ra") return "ra:" + rng.pick(["square", "rectangle", "triangle", "pentagon", "rhombus"]);
        return k + ":" + rng.pick(Object.keys(POLY));
      }, function (key) {
        if (key === "q") {
          if (kinds.indexOf("q") === -1) return null;
          var q = rng.sample(QUADS, 3), o = rng.sample(["triangle", "pentagon", "hexagon", "octagon", "circle", "triangle-tilt"], 3);
          return { type: "sort", prompt: ctx.w("quad"), say: ctx.w("quad"), baskets: [{ label: ctx.w("isQuad"), shape: "trapezoid", value: "q" }, { label: ctx.w("notQuad"), shape: "pentagon", value: "n" }],
            items: rng.shuffle(q.map(function (s) { return { shape: s, basket: "q" }; }).concat(o.map(function (s) { return { shape: s, basket: "n" }; }))) };
        }
        var m = /^([a-z]+):([a-z]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "ra") {
          var ra = { square: 4, rectangle: 4, triangle: 0, pentagon: 0, rhombus: 0 }[m[2]];
          return ra == null ? null : { type: "shape", show: m[2], prompt: ctx.w("right"), say: ctx.w("right"), options: [0, 2, 4], answer: ra };
        }
        var x = POLY[m[2]];
        if (x == null) return null;
        if (m[1] === "sd") return { type: "shape", show: m[2], prompt: ctx.w("sides"), say: ctx.w("sides"), options: rng.shuffle(near(rng, x, 1, 3, 9)), answer: x };
        var others = Object.keys(POLY).filter(function (o) { return o !== m[2] && POLY[o] !== x; });
        var p = ctx.w("find", { name: ctx.w("names")[m[2]] });
        return { type: "shape", prompt: p, say: p, options: rng.shuffle([m[2]].concat(rng.sample(others, 2))), answer: m[2] };
      });
    }
  });

  /* «شکل‌های فضایی» — math-sapling-p30 (Solids). Solids to pair with things (math-sapling-44), and how many faces,
     edges or corners a cube or a box has, and which have a curved face (math-sapling-47). Keys: "pr:0-2-4", "fev:cube-f",
     "cv". */
  var SOLID_FACTS = { cube: { f: 6, e: 12, v: 8 }, cuboid: { f: 6, e: 12, v: 8 }, pyramid: { f: 5, e: 8, v: 5 } };
  B.PRACTICE.push({
    id: "math-sapling-p30", subject: "math", level: "sapling", objectives: ["math.sap.20"],
    needs: ["math-sapling-44"], emoji: "🎲", title: "شکل‌های فضایی",
    lessons: ["math-sapling-44", "math-sapling-45", "math-sapling-46", "math-sapling-47", "math-sapling-48"],
    words: {
      pairs: "هر شکل فضایی را با چیزی جفت کن که شبیه آن است",
      fev: "{name} چند {what} دارد؟", what: { f: "وجه", e: "یال", v: "رأس" },
      solids: { cube: "مکعب", sphere: "کره", cylinder: "استوانه", cone: "مخروط", cuboid: "مکعب مستطیل", pyramid: "هرم" },
      curved: "کدام وجه خمیده دارد؟", flat: "همه وجه‌ها صاف", round: "وجه خمیده دارد", says: { "🎲": "تاس", "📦": "جعبه", "🧊": "یخ", "⚽": "توپ", "🥫": "قوطی", "🍦": "بستنی قیفی", "🕯️": "شمع", "🍊": "پرتقال", "🎁": "جعبه کادو" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["pr", "cv"];
      if (ctx.done(L("sapling-47"))) kinds.push("fev", "fev");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "pr") return "pr:" + rng.sample([0, 1, 2, 3, 4], 3).sort().join("-");
        if (k === "cv") return "cv";
        return "fev:" + rng.pick(Object.keys(SOLID_FACTS)) + "-" + rng.pick(["f", "e", "v"]);
      }, function (key) {
        var sol = ctx.w("solids");
        if (key === "cv") {
          var flat = rng.sample(["🎲", "📦", "🧊", "🎁"], 3), round = rng.sample(["⚽", "🥫", "🍦", "🕯️", "🍊"], 3), says = ctx.w("says");
          return { type: "sort", prompt: ctx.w("curved"), say: ctx.w("curved"), baskets: [{ label: ctx.w("flat"), pic: "📦", value: "f" }, { label: ctx.w("round"), pic: "🥫", value: "c" }],
            items: rng.shuffle(flat.map(function (e) { return { pic: e, say: says[e], basket: "f" }; }).concat(round.map(function (e) { return { pic: e, say: says[e], basket: "c" }; }))) };
        }
        var m = /^pr:(\d)-(\d)-(\d)$/.exec(key);
        if (m) return { type: "pairs", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: [m[1], m[2], m[3]].map(function (i) { var s = SOLID_PAIRS[+i]; return [{ label: sol[s[0]], say: sol[s[0]] }, s[1]]; }) };
        m = /^fev:([a-z]+)-([fev])$/.exec(key);
        if (!m || !SOLID_FACTS[m[1]] || kinds.indexOf("fev") === -1) return null;
        var x = SOLID_FACTS[m[1]][m[2]], p = ctx.w("fev", { name: sol[m[1]], what: ctx.w("what")[m[2]] });
        return ask(p, x, optsFa(rng, x, [4, 5, 6, 8, 12].filter(function (y) { return y !== x; })));
      });
    }
  });

  /* «تقارن» — math-sapling-p31 (Symmetry). Find every line of symmetry of a shape, colour the mirror half of a tile
     pattern, and how many lines a square, a rectangle or a circle has (math-sapling-48). Keys: "ln:heart", "mr:3",
     "ct:square". */
  var SYM_SHAPES = ["square", "rect", "triangle", "isosceles", "pentagon", "hexagon", "star", "heart", "butterfly", "kite", "parallelogram"];
  B.PRACTICE.push({
    id: "math-sapling-p31", subject: "math", level: "sapling", objectives: ["math.sap.21"],
    needs: ["math-sapling-48"], emoji: "🦋", title: "تقارن",
    lessons: ["math-sapling-48", "math-sapling-49", "math-sapling-96"],
    words: {
      lines: "همه خط‌های تقارن این شکل را پیدا کن. اگر هیچ خطی ندارد، «هیچ‌کدام» را بزن.",
      mirror: "نیمه دیگر این نقش را رنگ کن، طوری که دو طرف خط مثل هم باشند.",
      count: "{name} چند خط تقارن دارد؟", many: "بی‌شمار", names: { square: "مربع", rectangle: "مستطیل", circle: "دایره" }
    },
    make: function (rng, n, ctx) {
      return run(Math.min(n, 5), ctx, function () {
        var k = rng.pick(["ln", "ln", "mr", "ct"]);
        if (k === "ln") return "ln:" + rng.pick(SYM_SHAPES);
        if (k === "mr") return "mr:" + rng.int(1, 99);
        return "ct:" + rng.pick(["square", "rectangle", "circle"]);
      }, function (key) {
        var m = /^([a-z]+):(\w+)$/.exec(key);
        if (!m) return null;
        if (m[1] === "ln") return SYM_SHAPES.indexOf(m[2]) === -1 ? null : { type: "mirror", ask: "lines", shape: m[2], lines: ["v", "h", "d1", "d2"], prompt: ctx.w("lines") };
        if (m[1] === "mr") {
          var cells = [], seen = {};
          for (var i = 0; i < 7; i++) { var c = rng.int(2, 4), r = rng.int(1, 8), id = c + "-" + r; if (!seen[id]) { seen[id] = 1; cells.push([c, r, rng.int(1, 3)]); } }
          return { type: "mirror", size: [8, 8], line: "v", cells: cells, prompt: ctx.w("mirror") };
        }
        var x = { square: "4", rectangle: "2", circle: "many" }[m[2]];
        if (!x) return null;
        var p = ctx.w("count", { name: ctx.w("names")[m[2]] });
        return { type: "choose", prompt: p, say: p, stack: true, answer: x, options: [{ label: "۲", value: "2" }, { label: "۴", value: "4" }, { label: ctx.w("many"), value: "many" }] };
      });
    }
  });

  /* «خانه‌های جدول» — math-sapling-p32 (Grid squares). Find the square in a column and a row, and move a piece to a
     square with the arrows (math-sapling-49). Keys: "f:3-2", "mv:4-3". */
  B.PRACTICE.push({
    id: "math-sapling-p32", subject: "math", level: "sapling", objectives: ["math.sap.26"],
    needs: ["math-sapling-49"], emoji: "🔲", title: "خانه‌های جدول",
    lessons: ["math-sapling-49"],
    words: { find: "خانه ستون {c}، ردیف {r} را پیدا کن. اول ستون (از چپ)، بعد ردیف (از پایین).", move: "ربات را به خانه ستون {c}، ردیف {r} ببر." },
    make: function (rng, n, ctx) {
      return run(n, ctx, function () { return rng.pick(["f", "f", "mv"]) + ":" + rng.int(1, 6) + "-" + rng.int(1, 5); }, function (key) {
        var m = /^(f|mv):(\d)-(\d)$/.exec(key), c = m && +m[2], r = m && +m[3];
        if (!m || c > 6 || r > 5 || c < 1 || r < 1) return null;
        if (m[1] === "f") return { type: "grid", size: [6, 5], labels: true, at: [c, r], prompt: ctx.w("find", { c: fa(c), r: fa(r) }) };
        if (c === 1 && r === 1) return null;
        return { type: "grid", ask: "move", size: [6, 5], labels: true, piece: { at: [1, 1], pic: "🤖" }, goal: { at: [c, r], pic: "⭐" }, prompt: ctx.w("move", { c: fa(c), r: fa(r) }) };
      });
    }
  });

  /* «حتمی، ممکن، غیرممکن» — math-sapling-p33 (Chance). Sentences to sort as certain, possible or impossible
     (math-sapling-84), which colour is more likely from a bag, and a spinner to try (math-sapling-85).
     Keys: "s:1-4-7" (sentences), "bag:3-1", "sp:3". */
  var CHANCE = [["sun", "c"], ["rain", "p"], ["catfly", "i"], ["dice7", "i"], ["dice6", "p"], ["night", "c"], ["snowSummer", "i"], ["coin", "p"], ["fish", "i"], ["week", "c"]];
  B.PRACTICE.push({
    id: "math-sapling-p33", subject: "math", level: "sapling", objectives: ["math.sap.23"],
    needs: ["math-sapling-84"], emoji: "🎲", title: "حتمی، ممکن، غیرممکن",
    lessons: ["math-sapling-84", "math-sapling-85"],
    words: {
      sort: "هر جمله را در سبد خودش بگذار: حتمی، ممکن یا غیرممکن.", c: "حتمی", p: "ممکن", i: "غیرممکن",
      says: { sun: "فردا آفتاب طلوع می‌کند", rain: "امروز باران می‌بارد", catfly: "گربه پرواز می‌کند", dice7: "تاس ۷ می‌آورد", dice6: "تاس ۶ می‌آورد",
        night: "بعد از روز، شب می‌شود", snowSummer: "در تهران وسط تابستان برف سنگین می‌بارد", coin: "سکه رو می‌آید", fish: "ماهی از درخت بالا می‌رود", week: "بعد از جمعه، شنبه است" },
      bag: "در کیسه {a} تیله {x} و {b} تیله {y} است. بدون نگاه یکی برمی‌داریم. کدام بیشتر احتمال دارد؟",
      colors: { "🔴": "قرمز", "🔵": "آبی", "🟢": "سبز", "🟡": "زرد" },
      spin: "فرفره {a} قسمت {x} دارد و یک قسمت {y}. ۱۲ بار بچرخان و هر بار یک خط بکش.", spinQ: "کدام بیشتر آمد؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["s", "s", "bag"];
      if (ctx.done(L("sapling-85"))) kinds.push("sp");
      var col = ctx.w("colors");
      return run(Math.min(n, 5), ctx, function () {
        var k = rng.pick(kinds);
        if (k === "s") return "s:" + rng.sample(range(0, CHANCE.length - 1), 5).sort(function (a, b) { return a - b; }).join("-");
        if (k === "bag") { var a = rng.int(1, 5), b = rng.int(1, 5); return a === b ? null : "bag:" + a + "-" + b; }
        return "sp:" + rng.int(2, 4);
      }, function (key) {
        var m = /^([a-z]+):([\d-]+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var v = m[2].split("-").map(Number), two = rng.sample(["🔴", "🔵", "🟢", "🟡"], 2);
        if (m[1] === "s") {
          var ss = v.map(function (i) { return CHANCE[i]; });
          if (ss.some(function (s) { return !s; })) return null;
          var says = ctx.w("says");
          return { type: "sort", prompt: ctx.w("sort"), say: ctx.w("sort"), baskets: ["c", "p", "i"].map(function (b) { return { label: ctx.w(b), pic: { c: "✅", p: "🤔", i: "❌" }[b], value: b }; }),
            items: rng.shuffle(ss).map(function (s) { return { label: says[s[0]], say: says[s[0]], basket: s[1] }; }) };
        }
        if (m[1] === "bag") {
          if (v.length !== 2 || v[0] === v[1]) return null;
          var bp = ctx.w("bag", { a: fa(v[0]), x: col[two[0]], b: fa(v[1]), y: col[two[1]] });
          return { type: "choose", show: times(two[0], v[0]) + " " + times(two[1], v[1]), prompt: bp, say: bp, pic: true, answer: v[0] > v[1] ? two[0] : two[1],
            options: two.map(function (e) { return { label: e, value: e }; }) };
        }
        var a = v[0];
        if (a < 2 || a > 4) return null;
        var colors = { "🔴": "#e5483f", "🔵": "#3c7fc4", "🟢": "#3aa55b", "🟡": "#f2c230" };
        return { type: "spinner", spinner: [{ label: col[two[0]], color: colors[two[0]], size: a }, { label: col[two[1]], color: colors[two[1]], size: 1 }], tries: 12,
          prompt: ctx.w("spin", { a: fa(a), x: col[two[0]], y: col[two[1]] }), question: ctx.w("spinQ"), answer: "most" };
      });
    }
  });

  /* «جدول و نمودار نقطه‌ای» — math-sapling-p34 (Tables and line plots). Tally marks to read (math-sapling-82), a bar
     chart to read with a question about the difference (math-sapling-83), and a line plot to make from measurements
     (math-sapling-99). Keys: "t:17", "b:books", "lp:3". */
  B.PRACTICE.push({
    id: "math-sapling-p34", subject: "math", level: "sapling", objectives: ["math.sap.22", "math.sap.27"],
    needs: ["math-sapling-20"], emoji: "📈", title: "جدول و نمودار نقطه‌ای",
    lessons: ["math-sapling-20", "math-sapling-82", "math-sapling-83", "math-sapling-99", "math-sapling-84",
      "math-sapling-85"],
    words: {
      tally: "هر دسته پنج‌تایی است. چندتا شمرده‌اند؟",
      books: "تعداد کتاب‌هایی که بچه‌ها در یک ماه خواندند", booksQ: "{a} چند کتاب بیشتر از {b} خواند؟",
      people: ["آرین", "سوگند", "پرهام", "ترانه", "کاوه"],
      plot: "درازی مدادهای کلاس (سانتی‌متر)", plotP: "مدادها را اندازه گرفتیم: {list}. برای هر مداد یک ✖ بالای عدد درازی‌اش بگذار.", plotQ: "بیشتر مدادها چند سانتی‌متر بودند؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["b"];
      if (ctx.done(L("sapling-82"))) kinds.push("t");
      if (ctx.done(L("sapling-99"))) kinds.push("lp");
      return run(Math.min(n, 5), ctx, function () {
        var k = rng.pick(kinds);
        return k === "t" ? "t:" + rng.int(8, 29) : k === "b" ? "b:" + rng.int(1, 99) : "lp:" + rng.int(1, 99);
      }, function (key) {
        var m = /^([a-z]+):(\d+)$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        if (m[1] === "t") return +m[2] > 30 ? null : { type: "count", show: "tally", n: +m[2], options: near(rng, +m[2], 1, 1, 35), ask: ctx.w("tally") };
        if (m[1] === "b") {
          var ppl = ctx.w("people"), ns = rng.sample(range(1, 10), 4), two = rng.sample([0, 1, 2, 3], 2).sort(function (a, b) { return ns[b] - ns[a]; }), x = ns[two[0]] - ns[two[1]];
          return { type: "chart", bars: true, max: 10, title: ctx.w("books"), rows: ns.map(function (v, i) { return { label: ppl[i], n: v }; }),
            question: ctx.w("booksQ", { a: ppl[two[0]], b: ppl[two[1]] }), options: optsNum(rng, x, [x + 1, x - 1, ns[two[0]] + ns[two[1]]]), answer: x };
        }
        var top = rng.int(7, 9), data = [];
        [6, 7, 8, 9, 10].forEach(function (len) { var c = len === top ? 4 : rng.int(0, 2); for (var i = 0; i < c; i++) data.push(len); });
        data = rng.shuffle(data);
        var rows = [10, 9, 8, 7, 6].map(function (len) { return { label: fa(len), pic: "✖️", has: 0, n: data.filter(function (d) { return d === len; }).length }; });
        return { type: "chart", add: true, title: ctx.w("plot"), prompt: ctx.w("plotP", { list: data.map(fa).join("، ") }), rows: rows,
          question: ctx.w("plotQ"), options: optsNum(rng, top, [top + 1, top - 1, 10]), answer: top };
      });
    }
  });

  /* «راه حل پیدا کن» — math-sapling-p35 (Problem solving). Guess and check: two numbers from their sum and difference
     (math-sapling-91); a table that grows: legs of chickens, wheels of bikes (math-sapling-90); working backwards from
     the end (math-sapling-92). Keys: "gc:12-2", "tb:2-7", "bk:5-3-10". */
  B.PRACTICE.push({
    id: "math-sapling-p35", subject: "math", level: "sapling", objectives: ["math.sap.24"],
    needs: ["math-sapling-90"], emoji: "🧩", title: "راه حل پیدا کن",
    lessons: ["math-sapling-90", "math-sapling-91", "math-sapling-92", "math-sapling-97"],
    words: {
      gc: "دو عدد که جمعشان {s} است و یکی {d} تا بیشتر از دیگری است. کدام‌اند؟ حدس بزن و امتحان کن.", and: "و",
      tb: "هر {t} {k} {part} دارد. یک جدول بساز: ۱ {t}، ۲ {t}، … {n} {t} چند {part} دارند؟",
      things: { 2: ["مرغ", "پا"], 3: ["سه‌چرخه", "چرخ"], 4: ["گربه", "پا"], 6: ["مورچه", "پا"] },
      bk: "{p} چندتا تیله داشت. {a} تا برد، بعد {b} تا به دوستش داد. حالا {c} تا دارد. اول چندتا داشت؟ از آخر به اول فکر کن.",
      people: ["سارا", "علی", "مینا", "آرش", "نگار", "رضا"]
    },
    make: function (rng, n, ctx) {
      var kinds = ["tb", "gc"];
      if (ctx.done(L("sapling-92"))) kinds.push("bk");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        if (k === "gc") { var d = rng.pick([2, 4, 6]), small = rng.int(2, 15); return "gc:" + (2 * small + d) + "-" + d; }
        if (k === "tb") return "tb:" + rng.pick([2, 3, 4, 6]) + "-" + rng.int(5, 9);
        return "bk:" + rng.int(3, 9) + "-" + rng.int(2, 6) + "-" + rng.int(5, 20);
      }, function (key) {
        var m = /^([a-z]+):(\d+)-(\d+)(?:-(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[3], lab = function (x, y) { return fa(x) + " " + ctx.w("and") + " " + fa(y); };
        if (m[1] === "gc") {
          if ((a - b) % 2 || a <= b) return null;
          var s = (a - b) / 2, right = lab(s + b, s);
          var opts = [right, lab(a / 2 + (a % 2 ? 0.5 : 0), a - (a / 2 + (a % 2 ? 0.5 : 0))), lab(s + b + 1, s - 1)];
          if (opts[1] === right || /\./.test(opts[1])) opts[1] = lab(s + b + 2, s - 2);
          return { type: "choose", prompt: ctx.w("gc", { s: fa(a), d: fa(b) }), say: ctx.w("gc", { s: fa(a), d: fa(b) }), stack: true, ltr: true, options: rng.shuffle(opts), answer: right };
        }
        if (m[1] === "tb") {
          var th = ctx.w("things")[a];
          if (!th || b > 10) return null;
          return ask(ctx.w("tb", { t: th[0], part: th[1], k: fa(a), n: fa(b) }), a * b, optsFa(rng, a * b, [a + b, a * b + a, a * b - a]));
        }
        var c = +m[4], x = c - a + b, people = ctx.w("people");
        if (x < 1) return null;
        return ask(ctx.w("bk", { p: people[rng.int(0, people.length - 1)], a: fa(a), b: fa(b), c: fa(c) }), x, optsFa(rng, x, [c + a + b, c + a - b, x + 2]));
      });
    }
  });

  /* «محیط یا مساحت؟» — math-sapling-p36 (Perimeter and area problems). The perimeter of a square from its side
     (math-sapling-76), a room's floor in rows of tiles (math-sapling-78), and whether a job needs the perimeter or the
     area (math-sapling-79). Keys: "sq:6", "fl:4-5", "which:2". */
  var WHICH = [["fence", "p"], ["carpet", "a"], ["frame", "p"], ["paint", "a"], ["ribbon", "p"], ["tiles", "a"]];
  B.PRACTICE.push({
    id: "math-sapling-p36", subject: "math", level: "sapling", objectives: ["math.sap.19"],
    needs: ["math-sapling-76"], emoji: "🧱", title: "محیط یا مساحت؟",
    lessons: ["math-sapling-76", "math-sapling-77", "math-sapling-78", "math-sapling-79", "math-sapling-98"],
    words: {
      sq: "هر ضلع یک کاشی مربعی {s} سانتی‌متر است. محیطش چند سانتی‌متر است؟",
      fl: "کف اتاق را با کاشی‌های مربعی پوشاندیم: {r} ردیف، در هر ردیف {c} کاشی. چند کاشی لازم شد؟",
      which: { fence: "می‌خواهیم دور باغچه نرده بکشیم.", carpet: "می‌خواهیم کف اتاق را فرش کنیم.", frame: "می‌خواهیم دور عکس قاب بگذاریم.", paint: "می‌خواهیم دیوار را رنگ کنیم.", ribbon: "می‌خواهیم دور جعبه کادو روبان بچسبانیم.", tiles: "می‌خواهیم کف حمام را کاشی کنیم." },
      ask: "محیط لازم است یا مساحت؟", p: "محیط", a: "مساحت"
    },
    make: function (rng, n, ctx) {
      var kinds = ["sq"];
      if (ctx.done(L("sapling-78"))) kinds.push("fl");
      if (ctx.done(L("sapling-79"))) kinds.push("which", "which");
      return run(n, ctx, function () {
        var k = rng.pick(kinds);
        return k === "sq" ? "sq:" + rng.int(2, 12) : k === "fl" ? "fl:" + rng.int(3, 8) + "-" + rng.int(3, 9) : "which:" + rng.int(0, WHICH.length - 1);
      }, function (key) {
        var m = /^([a-z]+):(\d+)(?:-(\d+))?$/.exec(key);
        if (!m || kinds.indexOf(m[1]) === -1) return null;
        var a = +m[2], b = +m[3];
        if (m[1] === "sq") return ask(ctx.w("sq", { s: fa(a) }), 4 * a, optsFa(rng, 4 * a, [a * a, 2 * a, 4 * a + 4]));
        if (m[1] === "fl") return !b ? null : ask(ctx.w("fl", { r: fa(a), c: fa(b) }), a * b, optsFa(rng, a * b, [a + b, 2 * (a + b), a * b + a]));
        var w = WHICH[a];
        if (!w) return null;
        var p = ctx.w("which")[w[0]] + " " + ctx.w("ask");
        return { type: "choose", prompt: p, say: p, options: [{ label: ctx.w("p"), value: "p" }, { label: ctx.w("a"), value: "a" }], answer: w[1] };
      });
    }
  });
})();
