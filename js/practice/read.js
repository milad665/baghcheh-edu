/* باغچه — practice generators for فارسی (subject read). The framework and the rules: js/practice.js and README.md,
   "Practice generators". Every word a child decodes in a generated item uses only the letters taught so far
   (ctx.letters); tools/check-reading.js generates items at every point of the lesson sequence and checks them. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

/* What each reading lesson teaches, in lesson order: the letters a child knows after it. «V» = «و» and «Y» = «ی»
   as consonants. Used for the practice context (ctx.letters) and by tools/check-reading.js: a new reading lesson
   gets its line here (an empty string when it teaches no new letter). */
B.READ_TEACHES = 
{
  // A taste of «آ ب م» in Seed (full depth only): a child at core depth never sees it, so Sprout still teaches them.
  "read-seed-37": "",
  "read-sprout-7": "", "read-sprout-8": "", "read-sprout-9": "", "read-sprout-10": "", "read-sprout-11": "", "read-sprout-12": "",
  "read-sprout-13": "", "read-sprout-14": "", "read-sprout-15": "", "read-sprout-16": "", "read-sprout-17": "", "read-sprout-18": "",
  "read-sprout-19": "", "read-sprout-20": "", "read-sprout-21": "", "read-sprout-22": "",
  "read-sprout-1": "آاب", "read-sprout-2": "دم", "read-sprout-3": "سَ", "read-sprout-4": "", "read-sprout-5": "", "read-sprout-6": "", "read-sprout-23": "", "read-sprout-24": "", "read-sprout-25": "", "read-sprout-26": "", "read-sprout-27": "",
  "read-sapling-1": "وت", "read-sapling-2": "ری", "read-sapling-3": "نز", "read-sapling-4": "شِ", "read-sapling-5": "کُ", "read-sapling-29": "V", "read-sapling-18": "",
  "read-sapling-6": "",
  "read-sapling-7": "ه", "read-sapling-8": "پل", "read-sapling-9": "جگ", "read-sapling-10": "چخ", "read-sapling-11": "فق", "read-sapling-19": "",
  "read-sapling-12": "Yژ", "read-sapling-30": "", "read-sapling-13": "صث", "read-sapling-14": "ذضظ", "read-sapling-15": "طح", "read-sapling-16": "عغ",
  "read-sapling-17": "ًّ", "read-sapling-20": "ءئ", "read-sapling-21": "", "read-sapling-22": "", "read-sapling-23": "",
  "read-sapling-24": "", "read-sapling-25": "", "read-sapling-26": "", "read-sapling-27": "", "read-sapling-28": "", "read-sapling-31": "", "read-sapling-32": "", "read-sapling-33": "", "read-sapling-34": "", "read-sapling-35": "", "read-sapling-36": "", "read-sapling-37": "", "read-sapling-38": "", "read-sapling-39": "", "read-sapling-40": "", "read-sapling-41": "", "read-sapling-42": "", "read-sapling-43": "", "read-sapling-44": "", "read-sapling-45": "", "read-sapling-46": "", "read-sapling-47": "", "read-sapling-48": "", "read-sapling-49": "", "read-sapling-50": "", "read-sapling-51": "", "read-sapling-52": "", "read-sapling-53": "", "read-sapling-54": "", "read-sapling-55": "", "read-sapling-56": "", "read-sapling-57": "", "read-sapling-58": "", "read-sapling-59": "", "read-sapling-60": "", "read-sapling-61": "", "read-sapling-62": "", "read-sapling-63": "", "read-sapling-64": "", "read-sapling-65": "", "read-sapling-66": "", "read-sapling-67": "", "read-sapling-68": "", "read-sapling-69": "", "read-sapling-70": "", "read-sapling-71": "", "read-sapling-72": "", "read-sapling-73": "", "read-sapling-74": "", "read-sapling-75": "", "read-sapling-76": "", "read-sapling-77": "", "read-sapling-78": "", "read-sapling-79": "", "read-sapling-80": "", "read-sapling-81": "", "read-sapling-82": "", "read-sapling-83": "", "read-sapling-84": "", "read-sapling-85": "", "read-sapling-86": "", "read-sapling-87": "", "read-sapling-88": "", "read-sapling-89": ""
};

/* ---------------- Seed and Sprout before letters: pictures and sound only (no word is shown to read) ---------------- */
(function () {
  // Rough guesses for «و» = v and «ی» = y, as tools/check-reading.js makes them: a text using them needs «V» or «Y».
  function consonants(w) {
    var bare = w.replace(/[ّْ]/g, ""), out = [];
    for (var i = 0; i < bare.length; i++) {
      var c = bare[i], prev = bare[i - 1], next = bare[i + 1];
      if ((c !== "و" && c !== "ی") || bare === "و") continue;
      var vowelNext = next === "ا" || next === "آ" || next === "َ" || next === "ِ" || next === "ُ" || (c === "ی" && next === "و");
      var afterLong = prev === "ا" || prev === "آ" || (c === "ی" && prev === "و") || (c === "و" && prev === "ی" && i > 1);
      if (i === 0 || vowelNext || (c === "ی" && afterLong)) out.push(c === "ی" ? "Y" : "V");
    }
    return out;
  }
  // A text a child can read: every letter taught, and «و»/«ی» as consonants only once they are taught.
  B.readable = function (text, letters) {
    if (!B.decodable(text, letters)) return false;
    return String(text).split(/[\s‌]+/).every(function (w) {
      return consonants(w.replace(/[«».،؛:؟!?()]/g, "")).every(function (h) { return letters.indexOf(h) !== -1; });
    });
  };
  // Shared helpers for every reading generator.
  B.readGen = {
    // Missed keys first (if still possible), then fresh ones, never the same key twice: up to n steps.
    collect: function (rng, n, again, makers) {
      var out = [], used = {};
      function add(s) { if (s && out.length < n && !used[s.key]) { used[s.key] = true; out.push(s); } }
      again.forEach(function (k) { makers.forEach(function (m) { if (m.byKey) add(m.byKey(k)); }); });
      var open = makers.filter(function (m) { return m.ok; });
      for (var guard = 0; out.length < n && open.length && guard < 80; guard++) add(rng.pick(open).make());
      return out;
    },
    pics: function (rng, ans, others, k) {
      return rng.shuffle([ans].concat(rng.sample(others, k || 2))).map(function (x) { return { label: x.pic, value: x.w }; });
    }
  };
  var G = B.readGen;

  /* read-seed-p1 «با هم ببینیم و بگوییم»: picture-talk cards, a scene and three open questions for the grown-up. */
  var TALK = [
    { k: "home", scene: "🏡 👵 👧 🐈 🌳", cap: "حیاط خانه مادربزرگ", q: ["چه کسانی در حیاط هستند؟", "گربه چه کار می‌کند؟", "تو در حیاط چه بازی‌ای دوست داری؟"] },
    { k: "bazaar", scene: "🧺 🍎 🍊 👨 👦", cap: "میوه‌فروشی در بازار", q: ["چه میوه‌هایی می‌بینی؟", "پسر چه می‌خرد؟", "تو کدام میوه را دوست داری؟ چرا؟"] },
    { k: "park", scene: "🌳 🛝 👧 👦 🐕", cap: "پارک محله", q: ["بچه‌ها چه بازی می‌کنند؟", "سگ کجاست؟", "بعدش چه می‌شود؟"] },
    { k: "kitchen", scene: "🍳 🫖 🍞 👩 👶", cap: "صبح در آشپزخانه", q: ["مامان چه کار می‌کند؟", "سر سفره چه چیزهایی هست؟", "تو صبحانه چه دوست داری؟"] },
    { k: "village", scene: "🏡 🐄 🐑 🧑‍🌾 🌾", cap: "یک روستا", q: ["کشاورز چه کار می‌کند؟", "چه حیوان‌هایی می‌بینی؟", "روستا با شهر چه فرقی دارد؟"] },
    { k: "sea", scene: "🏖️ 🌊 ⛵ 👧 🦀", cap: "کنار دریا", q: ["دختر چه کار می‌کند؟", "روی آب چه هست؟", "اگر کنار دریا بودی چه کار می‌کردی؟"] },
    { k: "snow", scene: "❄️ ⛄ 👦 🧣 🏔️", cap: "یک روز برفی", q: ["پسر چه ساخته است؟", "چرا شال‌گردن بسته؟", "تو در برف چه کار می‌کنی؟"] },
    { k: "school", scene: "🏫 🎒 👨‍🏫 👧 👦", cap: "حیاط مدرسه", q: ["بچه‌ها کجا هستند؟", "معلم چه می‌گوید؟", "تو در مدرسه چه کاری دوست داری؟"] },
    { k: "rain", scene: "🌧️ ☂️ 👵 👦 🌈", cap: "بعد از باران", q: ["هوا چطور است؟", "آن رنگ‌ها در آسمان چیست؟", "باران که می‌آید چه حسی داری؟"] },
    { k: "bakery", scene: "🫓 🧑‍🍳 🔥 👴 👧", cap: "نانوایی سنگکی", q: ["نانوا چه کار می‌کند؟", "بوی نان چطور است؟", "نان را برای چه کسی می‌برند؟"] },
    { k: "garden", scene: "🌷 🐝 🦋 🧒 🪣", cap: "باغچه بهاری", q: ["چه حشره‌هایی می‌بینی؟", "بچه با سطل چه می‌کند؟", "گل‌ها چه رنگی‌اند؟"] },
    { k: "night", scene: "🌙 ⭐ 🏠 🛏️ 📖", cap: "شب، وقت قصه", q: ["چه وقتی از روز است؟", "از کجا فهمیدی؟", "پیش از خواب چه کار می‌کنی؟"] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p1", subject: "read", level: "seed", objectives: ["read.seed.2", "read.seed.6"],
    needs: ["read-seed-2"], emoji: "🗣️", title: "با هم ببینیم و بگوییم",
    words: { tip1: "بگذارید اول هرچه می‌بیند بگوید؛ بعد این‌ها را بپرسید:", tip2: "جوابش را کامل‌تر برگردانید و بخواهید با شما تکرار کند." },
    make: function (rng, n, ctx) {
      return rng.sample(TALK, Math.min(n, 3)).map(function (c) {
        return { type: "talk", key: c.k, scene: c.scene, caption: c.cap + ". " + c.q[0], tips: [ctx.w("tip1")].concat(c.q, [ctx.w("tip2")]) };
      });
    }
  });

  /* read-seed-p2 «اسم چیزها»: everyday words heard and found, sorted by group; opposites in pairs. */
  var GROUPS = {
    fruit: { icon: "🧺", items: [["🍎", "سیب"], ["🍌", "موز"], ["🍇", "انگور"], ["🍐", "گلابی"], ["🍊", "پرتقال"], ["🍓", "توت‌فرنگی"], ["🍉", "هندوانه"]] },
    animal: { icon: "🐾", items: [["🐈", "گربه"], ["🐄", "گاو"], ["🐑", "گوسفند"], ["🐓", "خروس"], ["🐇", "خرگوش"], ["🐢", "لاک‌پشت"], ["🐟", "ماهی"]] },
    clothes: { icon: "👕", items: [["🧦", "جوراب"], ["🧢", "کلاه"], ["🧥", "کاپشن"], ["🧤", "دستکش"], ["🧣", "شال‌گردن"], ["👟", "کفش"]] },
    home: { icon: "🏠", items: [["🪑", "صندلی"], ["🛏️", "تخت"], ["🚪", "در"], ["🛋️", "مبل"], ["🪟", "پنجره"], ["🧸", "عروسک"]] },
    body: { icon: "🧍", items: [["👂", "گوش"], ["👃", "بینی"], ["👁️", "چشم"], ["✋", "دست"], ["🦶", "پا"], ["🦷", "دندان"]] }
  };
  var OPPOSITES = [
    { k: "big", q: "big", yes: ["🐘", "فیل"], no: ["🐭", "موش"] }, { k: "small", q: "small", yes: ["🌱", "جوانه"], no: ["🌳", "درخت"] },
    { k: "full", q: "full", yes: ["🥛", "لیوان پر"], no: ["🍽️", "بشقاب خالی"] }, { k: "empty", q: "empty", yes: ["🍽️", "بشقاب خالی"], no: ["🍲", "قابلمه آش"] },
    { k: "cold", q: "cold", yes: ["⛄", "آدم‌برفی"], no: ["🔥", "آتش"] }, { k: "hot", q: "hot", yes: ["☀️", "خورشید"], no: ["🧊", "یخ"] },
    { k: "fast", q: "fast", yes: ["🐆", "یوزپلنگ"], no: ["🐢", "لاک‌پشت"] }, { k: "slow", q: "slow", yes: ["🐌", "حلزون"], no: ["🐎", "اسب"] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p2", subject: "read", level: "seed", objectives: ["read.seed.3", "read.seed.4"],
    needs: ["read-seed-12"], emoji: "🧺", title: "اسم چیزها",
    words: {
      find: "{name} کدام است؟", sort: "روی هر تصویر بزن و اسمش را بشنو. هر کدام را در سبد خودش بگذار.",
      groups: { fruit: "میوه‌ها", animal: "حیوان‌ها", clothes: "لباس‌ها", home: "وسیله‌های خانه", body: "بدن" },
      big: "کدام بزرگ است؟", small: "کدام کوچک است؟", full: "کدام پر است؟", empty: "کدام خالی است؟",
      cold: "کدام سرد است؟", hot: "کدام گرم است؟", fast: "کدام تند می‌دود؟", slow: "کدام آرام راه می‌رود؟",
      pairs: "روی هر تصویر بزن و بشنو. هر تصویر را با برعکسش جفت کن."
    },
    make: function (rng, n, ctx) {
      var all = [];
      Object.keys(GROUPS).forEach(function (g) { GROUPS[g].items.forEach(function (x) { all.push({ pic: x[0], w: x[1], g: g }); }); });
      function find(x) {
        var others = all.filter(function (y) { return y.w !== x.w; });
        return { type: "choose", key: "find-" + x.w, prompt: ctx.w("find", { name: x.w }), say: ctx.w("find", { name: x.w }), pic: true,
          options: G.pics(rng, x, others), answer: x.w };
      }
      function sort() {
        var gs = rng.sample(Object.keys(GROUPS), 2), items = [];
        gs.forEach(function (g) { rng.sample(GROUPS[g].items, 3).forEach(function (x) { items.push({ pic: x[0], say: x[1], basket: g }); }); });
        return { type: "sort", key: "sort-" + gs.slice().sort().join("-"), prompt: ctx.w("sort"), say: ctx.w("sort"),
          baskets: gs.map(function (g) { return { pic: GROUPS[g].icon, value: g, say: ctx.w("groups")[g] }; }), items: rng.shuffle(items) };
      }
      function opp(o) {
        return { type: "choose", key: "opp-" + o.k, prompt: ctx.w(o.q), say: ctx.w(o.q), pic: true,
          options: rng.shuffle([{ label: o.yes[0], value: o.yes[1] }, { label: o.no[0], value: o.no[1] }]), answer: o.yes[1] };
      }
      function oppPairs() {
        var four = rng.sample(OPPOSITES.filter(function (o, i) { return i % 2 === 0; }), 3);
        return { type: "pairs", key: "opp-pairs-" + four.map(function (o) { return o.k; }).sort().join("-"), prompt: ctx.w("pairs"), say: ctx.w("pairs"),
          pairs: four.map(function (o) { return [{ pic: o.yes[0], say: o.yes[1] }, { pic: o.no[0], say: o.no[1] }]; }) };
      }
      var opps = ctx.done("read-seed-13");
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return find(rng.pick(all)); }, byKey: function (k) { var x = all.find(function (y) { return "find-" + y.w === k; }); return x && find(x); } },
        { ok: true, make: sort },
        { ok: opps, make: function () { return opp(rng.pick(OPPOSITES)); }, byKey: function (k) { var o = opps && OPPOSITES.find(function (y) { return "opp-" + y.k === k; }); return o && opp(o); } },
        { ok: opps, make: oppPairs }
      ]);
    }
  });

  /* read-seed-p3 «بازی صداها»: same or different, rhyme, syllables, first and last sounds, blending; by ear only. */
  var SAME = [["توپ", "توت"], ["نان", "نان"], ["کلاه", "کلاغ"], ["ماه", "ماه"], ["شیر", "سیر"], ["دست", "دست"], ["موش", "گوش"], ["سیب", "سیب"], ["تار", "دار"], ["گل", "گل"]];
  var RHYMES = [[["🐭", "موش"], ["👂", "گوش"], ["🐰", "خرگوش"]], [["🌙", "ماه"], ["🧢", "کلاه"]], [["🐍", "مار"], ["🥒", "خیار"]],
    [["🦁", "شیر"], ["🧀", "پنیر"], ["🧄", "سیر"]], [["🌳", "درخت"], ["🛏️", "تخت"]], [["🌸", "گل"], ["🌉", "پل"]], [["🍞", "نان"], ["🦷", "دندان"]]];
  var SYL = [["⚽", "توپ", 1], ["🍎", "سیب", 1], ["🐭", "موش", 1], ["🌙", "ماه", 1], ["🐟", "ماهی", 2], ["🐈", "گربه", 2], ["🚗", "ماشین", 2], ["👨", "بابا", 2],
    ["🦋", "پروانه", 3], ["🦒", "زرافه", 3], ["⭐", "ستاره", 3], ["🍉", "هندوانه", 4]];
  var FIRST = { "م": [["🐟", "ماهی"], ["🐭", "موش"], ["🍌", "موز"], ["🚗", "ماشین"], ["🌙", "ماه"]], "س": [["🍎", "سیب"], ["🧺", "سبد"], ["⭐", "ستاره"], ["🧄", "سیر"]],
    "ب": [["👨", "بابا"], ["🌧️", "باران"], ["🐑", "بره"], ["🍆", "بادمجان"]], "ت": [["⚽", "توپ"], ["🛏️", "تخت"], ["🥚", "تخم‌مرغ"]],
    "د": [["🚪", "در"], ["✋", "دست"], ["🦷", "دندان"], ["🌊", "دریا"]], "پ": [["🦋", "پروانه"], ["🧀", "پنیر"], ["🐧", "پنگوئن"]] };
  var LAST = { "م": [["👁️", "چشم"], ["🥬", "کلم"], ["🖊️", "قلم"], ["🌾", "گندم"]], "س": [["🐓", "خروس"], ["🚌", "اتوبوس"], ["👕", "لباس"], ["🍒", "گیلاس"]],
    "ب": [["🍎", "سیب"], ["💧", "آب"], ["📖", "کتاب"]], "ر": [["🦁", "شیر"], ["🐍", "مار"], ["🥒", "خیار"], ["🧀", "پنیر"]], "ت": [["✋", "دست"], ["🛏️", "تخت"], ["🌳", "درخت"], ["⏰", "ساعت"]] };
  var BLEND = [["🐭", "موش", "مو ... ش"], ["⚽", "توپ", "تو ... پ"], ["🐟", "ماهی", "ما ... هی"], ["🐈", "گربه", "گر ... به"], ["🌸", "گل", "گُ ... ل"],
    ["🍞", "نان", "نا ... ن"], ["🌙", "ماه", "مـ ... آ ... ه"], ["✋", "دست", "دَ ... سْ ... تْ"], ["🍎", "سیب", "سـ ... ای ... ب"]];
  var obj = function (x) { return { pic: x[0], w: x[1] }; };
  B.PRACTICE.push({
    id: "read-seed-p3", subject: "read", level: "seed",
    objectives: ["read.seed.9", "read.seed.10", "read.seed.11", "read.seed.12", "read.seed.13", "read.seed.14"],
    needs: ["read-seed-11"], emoji: "🎶", title: "بازی صداها",
    words: {
      same: "این دو کلمه مثل هم بودند یا فرق داشتند؟", sameSay: "خوب گوش بده: {a} ... {b}. اگر مثل هم بودند، دو سیب را بزن. اگر فرق داشتند، سیب و گلابی را بزن.",
      rhyme: "کدام با «{name}» هم‌قافیه است؟", syl: "«{name}» چند تکه دارد؟", sylSay: "{name}. با هر تکه دست بزن. چند تکه دارد؟",
      first: "کدام هم مثل «{name}» شروع می‌شود؟", last: "آخر کدام مثل آخر «{name}» است؟", blend: "تکه‌ها را بشنو و به هم بچسبان. چه شد؟", blendSay: "گوش بده: {name}. به هم بچسبان. چه شد؟"
    },
    make: function (rng, n, ctx) {
      function same(p) {
        return { type: "choose", key: "same-" + p.join("-"), prompt: ctx.w("same"), say: ctx.w("sameSay", { a: p[0], b: p[1] }), pic: true,
          options: [{ label: "🍎🍎", value: "same" }, { label: "🍎🍐", value: "diff" }], answer: p[0] === p[1] ? "same" : "diff" };
      }
      function rhyme(gi) {
        var g = RHYMES[gi].map(obj), x = g[0], ans = rng.pick(g.slice(1));
        var others = []; RHYMES.forEach(function (h, j) { if (j !== gi) h.forEach(function (y) { others.push(obj(y)); }); });
        return { type: "choose", key: "rhyme-" + x.w, show: x.pic, prompt: ctx.w("rhyme", { name: x.w }), say: ctx.w("rhyme", { name: x.w }), pic: true,
          options: G.pics(rng, ans, others), answer: ans.w };
      }
      function syl(x) {
        return { type: "choose", key: "syl-" + x[1], show: x[0], pic: true, prompt: ctx.w("syl", { name: x[1] }), say: ctx.w("sylSay", { name: x[1] }),
          options: [1, 2, 3, 4].slice(0, x[2] > 3 ? 4 : 3).map(function (k) { return { label: "👏".repeat(k), value: String(k) }; }), answer: String(x[2]) };
      }
      function sound(table, kind, letter) {
        var g = table[letter].map(obj), pair = rng.sample(g, 2), others = [];
        Object.keys(table).forEach(function (l) { if (l !== letter) table[l].forEach(function (y) { others.push(obj(y)); }); });
        return { type: "choose", key: kind + "-" + pair[0].w, show: pair[0].pic, prompt: ctx.w(kind, { name: pair[0].w }), say: ctx.w(kind, { name: pair[0].w }), pic: true,
          options: G.pics(rng, pair[1], others), answer: pair[1].w };
      }
      function blend(x) {
        var others = BLEND.filter(function (y) { return y !== x; }).map(obj);
        return { type: "choose", key: "blend-" + x[1], prompt: ctx.w("blend"), say: ctx.w("blendSay", { name: x[2] }), pic: true, options: G.pics(rng, obj(x), others), answer: x[1] };
      }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return same(rng.pick(SAME)); } },
        { ok: ctx.done("read-seed-4"), make: function () { return rhyme(rng.int(0, RHYMES.length - 1)); } },
        { ok: ctx.done("read-seed-5"), make: function () { return syl(rng.pick(SYL)); } },
        { ok: ctx.done("read-seed-6"), make: function () { return sound(FIRST, "first", rng.pick(Object.keys(FIRST))); } },
        { ok: ctx.done("read-seed-21"), make: function () { return sound(LAST, "last", rng.pick(Object.keys(LAST))); } },
        { ok: ctx.done("read-seed-22"), make: function () { return blend(rng.pick(BLEND)); } }
      ]);
    }
  });

  /* read-seed-p4 «قصه گوش کن»: a short story heard (the voice reads it), then one question about it, with pictures. */
  var STORIES = [
    { k: "rain", say: "ترانه چترش را باز کرد و به حیاط رفت. باران بند آمد و رنگین‌کمان پیدا شد. ترانه خندید.", q: "آخر قصه چه چیزی در آسمان پیدا شد؟", o: [["🌈", "رنگین‌کمان"], ["🌙", "ماه"], ["🪁", "بادبادک"]] },
    { k: "bakery", say: "نیما و مادربزرگ صبح زود به نانوایی رفتند. نان سنگک گرم خریدند و سر سفره صبحانه خوردند.", q: "نیما و مادربزرگ چه خریدند؟", o: [["🫓", "نان"], ["🍎", "سیب"], ["🧸", "عروسک"]] },
    { k: "kite", say: "بادبادک آرش روی درخت گیر کرد. آرش ناراحت شد. پدربزرگ با یک چوب بلند آن را پایین آورد.", q: "وقتی بادبادک گیر کرد، آرش چه حسی داشت؟", o: [["😢", "ناراحت"], ["😄", "خوشحال"], ["😴", "خواب‌آلود"]] },
    { k: "cat", say: "گربه علی گم شده بود. علی زیر تخت و پشت مبل را گشت. آخر، گربه را توی سبد لباس‌ها پیدا کرد.", q: "گربه کجا بود؟", o: [["🧺", "توی سبد"], ["🌳", "روی درخت"], ["🛏️", "زیر تخت"]] },
    { k: "hen", say: "مرغ روی تخم‌هایش نشسته بود. یک روز یکی از تخم‌ها تکان خورد و تَق‌تَق صدا داد.", q: "فکر می‌کنی بعدش چه می‌شود؟", o: [["🐥", "جوجه بیرون می‌آید"], ["🍳", "نیمرو می‌شود"], ["⚽", "توپ می‌شود"]] },
    { k: "tower", say: "رضا یک برج بلند ساخت. گربه از کنارش رد شد و برج افتاد. رضا ناراحت شد، ولی دوباره ساخت.", q: "چرا برج افتاد؟", o: [["🐈", "گربه به آن خورد"], ["🌧️", "باران آمد"], ["🌬️", "باد آمد"]] },
    { k: "pumpkin", say: "پیرزن توی کدو نشست. کدو قل خورد و قل خورد و از کنار گرگ رد شد. پیرزن سالم به خانه رسید.", q: "پیرزن توی چه چیزی نشست؟", o: [["🎃", "کدو"], ["🧺", "سبد"], ["🚗", "ماشین"]] },
    { k: "beetle", say: "خاله سوسکه کنار حوض بازی می‌کرد و توی آب افتاد. آقا موشه با یک نردبان آمد و او را بیرون آورد.", q: "چه کسی خاله سوسکه را بیرون آورد؟", o: [["🐭", "آقا موشه"], ["🐈", "گربه"], ["🐔", "مرغ"]] },
    { k: "flowers", say: "گل‌های حیاط تشنه بودند و سرشان پایین بود. مینا به آن‌ها آب داد و گل‌ها سرشان را بالا آوردند.", q: "چرا مینا به گل‌ها آب داد؟", o: [["🥀", "گل‌ها تشنه بودند"], ["🌧️", "باران می‌آمد"], ["🌙", "شب بود"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p4", subject: "read", level: "seed", objectives: ["read.seed.8", "read.seed.20"],
    needs: ["read-seed-7"], emoji: "👂", title: "قصه گوش کن",
    words: { listen: "به قصه گوش کن." },
    make: function (rng, n, ctx) {
      var open = STORIES.filter(function (s) { return ctx.done("read-seed-23") || s.k !== "pumpkin"; }).filter(function (s) { return ctx.done("read-seed-31") || s.k !== "beetle"; });
      function item(s) {
        var opts = s.o.map(function (x) { return { label: x[0], value: x[1] }; });
        return { type: "choose", key: s.k, prompt: s.q, say: ctx.w("listen") + " " + s.say + " " + s.q, pic: true, options: rng.shuffle(opts), answer: s.o[0][1] };
      }
      return G.collect(rng, n, ctx.again, [{ ok: true, make: function () { return item(rng.pick(open)); }, byKey: function (k) { var s = open.find(function (x) { return x.k === k; }); return s && item(s); } }]);
    }
  });

  /* read-seed-p5 «شعر و ترانه»: a line of a rhyme said aloud; the child picks the picture of the word that ends it. */
  var POEM = [
    { k: "fish", say: "ماهی قرمز در آب، بازی می‌کند با ...", ans: ["🫧", "حباب"], o: [["🐈", "گربه"], ["⭐", "ستاره"]] },
    { k: "rabbit", say: "خرگوش من بازیگوش، تکان می‌دهد دو ...", ans: ["👂", "گوش"], o: [["✋", "دست"], ["🦶", "پا"]] },
    { k: "gran", say: "مادربزرگ مهربان، می‌پزد برایم ...", ans: ["🫓", "نان"], o: [["🍰", "کیک"], ["🍲", "آش"]] },
    { k: "sun", say: "خورشید خانوم آفتاب کن، یه مشت برنج تو ... کن", ans: ["💧", "آب"], o: [["🍞", "نان"], ["🔥", "آتش"]] },
    { k: "chick", say: "یک جوجه زرد و ناز، پیدا کرده یک ...", ans: ["🧅", "پیاز"], o: [["🍎", "سیب"], ["🌽", "ذرت"]] },
    { k: "mouse", say: "یک موش کوچک و زرنگ، رفته بالای یک ...", ans: ["🪨", "سنگ"], o: [["🌳", "درخت"], ["🪑", "صندلی"]] },
    { k: "sparrow", say: "گنجشک کوچک من، نشسته روی ...", ans: ["🌱", "چمن"], o: [["🌳", "درخت"], ["🏠", "بام"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p5", subject: "read", level: "seed", objectives: ["read.seed.19"],
    needs: ["read-seed-19"], emoji: "🎵", title: "شعر و ترانه",
    words: { ask: "شعر را با هم بگوییم. آخرش چه می‌آید؟", say: "گوش بده و با من بگو: {line} ... کدام با قافیه شعر جور است؟" },
    make: function (rng, n, ctx) {
      function item(p) {
        var opts = [p.ans].concat(p.o).map(function (x) { return { label: x[0], value: x[1] }; });
        return { type: "choose", key: p.k, prompt: ctx.w("ask"), say: ctx.w("say", { line: p.say }), pic: true, options: rng.shuffle(opts), answer: p.ans[1] };
      }
      return G.collect(rng, n, ctx.again, [{ ok: true, make: function () { return item(rng.pick(POEM)); }, byKey: function (k) { var p = POEM.find(function (x) { return x.k === k; }); return p && item(p); } }]);
    }
  });

  /* read-seed-p6 «خط‌های رنگی»: paths to trace, growing with the lessons (lines, curves, then bowls, teeth, loops and
     dots), and now and then a task on paper. */
  var SHAPES = [
    { k: "down", path: "down", after: null, p: "از بالا به پایین خط بکش." }, { k: "across", path: "across", after: null, p: "از راست به چپ خط بکش." },
    { k: "slant", path: "slant", after: null, p: "کج خط بکش." }, { k: "bowl", path: "bowl", after: null, p: "یک کاسه بکش." },
    { k: "hills", path: "hills", after: null, p: "از روی تپه‌ها بپر." }, { k: "wave", path: "wave", after: null, p: "موج‌ها را بکش." },
    { k: "zigzag", path: "zigzag", after: null, p: "کوه‌ها را بکش." }, { k: "circle", path: "circle", after: null, p: "یک دایره بکش." },
    { k: "square", strokes: ["M144 48 L56 48 L56 152 L144 152 L144 48"], after: "read-seed-27", p: "یک مربع بکش." },
    { k: "roof", strokes: ["M100 36 L36 150 L164 150 L100 36"], after: "read-seed-27", p: "یک مثلث بکش، مثل سقف." },
    { k: "teeth", strokes: ["M178 96 Q179 128 162 128 Q148 128 148 104 Q149 128 132 128 Q118 128 118 104 Q119 128 102 128 Q88 128 88 104 Q89 128 72 128 L30 128"], after: "read-seed-35", p: "دندانه‌ها را بکش." },
    { k: "loop", strokes: ["M106 112 Q82 112 84 90 Q88 70 108 72 Q126 76 124 98 Q122 140 78 156"], after: "read-seed-35", p: "یک حلقه بکش و دمش را پایین بیاور." },
    { k: "dots", strokes: ["M168 112 L32 112", [100, 76], [100, 148]], after: "read-seed-35", p: "یک خط بکش و یک نقطه بالا و یک نقطه پایین بگذار." }
  ];
  B.PRACTICE.push({
    id: "read-seed-p6", subject: "read", level: "seed", objectives: ["read.seed.17"],
    needs: ["read-seed-9"], emoji: "🖍️", title: "خط‌های رنگی",
    words: { paper: "حالا روی کاغذ، با مداد، یک ردیف از همین شکل بکش: {name}", check: ["از جای درست شروع کرد؟", "مداد را با سه انگشت گرفته بود؟"] },
    make: function (rng, n, ctx) {
      var open = SHAPES.filter(function (s) { return !s.after || ctx.done(s.after); });
      var out = rng.sample(open, Math.min(n, 4)).map(function (s) {
        var st = { type: "trace", key: s.k, prompt: s.p, say: s.p };
        if (s.path) st.path = s.path; else st.strokes = s.strokes;
        return st;
      });
      if (out.length && out.length < n) out.push({ type: "paper", key: "paper-" + out[0].key, lang: "fa", text: ctx.w("paper", { name: out[0].prompt }), check: ctx.w("check") });
      return out;
    }
  });
})();
/* ---------------- Sprout: sounds, pictures, then the first letters ---------------- */
(function () {
  var G = B.readGen, ok = function (t, ctx) { return B.readable(t, ctx.letters); };
  // A word's letters, each with its vowel marks: the tiles of a build step.
  B.readLetters = function (word) {
    var out = [];
    for (var i = 0; i < word.length; i++) {
      var c = word[i];
      if (/[ًٌٍَُِّْ‌]/.test(c) && out.length) out[out.length - 1] += c; else out.push(c);
    }
    return out;
  };
  var obj = function (x) { return { pic: x[0], w: x[1] }; };

  /* read-sprout-p1 «صداها را بشمار»: count a word's sounds, where a sound is, join sounds, change a sound. */
  var COUNT = [["💧", "آب", 2], ["🦶", "پا", 2], ["🍲", "آش", 2], ["🌬️", "باد", 3], ["🍎", "سیب", 3], ["🌙", "ماه", 3], ["🐭", "موش", 3], ["🦁", "شیر", 3], ["✋", "دست", 4], ["🧺", "سبد", 5]];
  var WHERE = [["س", "سیب", "start"], ["س", "کاسه", "mid"], ["س", "خروس", "end"], ["م", "ماهی", "start"], ["م", "بادام", "end"], ["م", "سماور", "mid"],
    ["ب", "باران", "start"], ["ب", "کتاب", "end"], ["ب", "کبوتر", "mid"], ["د", "دست", "start"], ["د", "سبد", "end"], ["د", "بادام", "mid"]];
  var JOIN = [["🐭", "موش", "مـ ... او ... ش"], ["⚽", "توپ", "تـ ... او ... پ"], ["🌙", "ماه", "مـ ... آ ... ه"], ["✋", "دست", "دَ ... سْ ... تْ"],
    ["🍎", "سیب", "سـ ... ای ... ب"], ["🌬️", "باد", "بـ ... آ ... د"], ["🦁", "شیر", "شـ ... ای ... ر"], ["🍞", "نان", "نـ ... آ ... ن"]];
  var CHANGE = [["ماه", "به جای هـ بگو ر", ["🐍", "مار"], ["🌙", "ماه"]], ["موش", "به جای مـ بگو گـ", ["👂", "گوش"], ["🐭", "موش"]],
    ["شیر", "به جای شـ بگو سـ", ["🧄", "سیر"], ["🦁", "شیر"]], ["دست", "به جای د بگو شـ", ["👍", "شست"], ["✋", "دست"]],
    ["سیب", "به جای ب بگو ر", ["🧄", "سیر"], ["🍎", "سیب"]], ["بادام", "ام آخرش را نگو", ["🌬️", "باد"], ["🌰", "بادام"]],
    ["گوشت", "ت آخرش را نگو", ["👂", "گوش"], ["🥩", "گوشت"]], ["توت", "به جای ت آخر بگو پ", ["⚽", "توپ"], ["🍓", "توت"]]];
  var EXTRA = [["🐈", "گربه"], ["🚪", "در"], ["🌳", "درخت"], ["⭐", "ستاره"]].map(obj);
  var POS = [{ label: "🟥⬜⬜", value: "start" }, { label: "⬜🟥⬜", value: "mid" }, { label: "⬜⬜🟥", value: "end" }];
  B.PRACTICE.push({
    id: "read-sprout-p1", subject: "read", level: "sprout", objectives: ["read.spr.1", "read.spr.2", "read.spr.3", "read.spr.4"],
    needs: ["read-sprout-7"], emoji: "🔴", title: "بازی صداها",
    words: {
      count: "«{name}» چند صدا دارد؟", countSay: "{name}. آرام بگو و صداهایش را بشمار. چند صدا دارد؟",
      where: "صدای «{s}» کجای «{name}» است؟", whereSay: "{name}. صدای {s} کجای {name} است؟ اول؟ وسط؟ یا آخر؟ مربع قرمز جای صداست.",
      join: "صداها را به هم بچسبان. چه شد؟", joinSay: "گوش بده: {name}. به هم بچسبان. چه شد؟",
      change: "«{name}» را بگو، ولی {how}. چه شد؟"
    },
    make: function (rng, n, ctx) {
      function count(x) {
        return { type: "choose", key: "count-" + x[1], show: x[0], pic: true, prompt: ctx.w("count", { name: x[1] }), say: ctx.w("countSay", { name: x[1] }),
          options: [2, 3, 4, 5].map(function (k) { return { label: "🔴".repeat(k), value: String(k) }; }), answer: String(x[2]) };
      }
      function where(x) {
        return { type: "choose", key: "where-" + x[0] + x[1], pic: true, prompt: ctx.w("where", { s: x[0], name: x[1] }), say: ctx.w("whereSay", { s: x[0], name: x[1] }), options: POS, answer: x[2] };
      }
      function join(x) {
        var others = JOIN.filter(function (y) { return y !== x; }).map(obj);
        return { type: "choose", key: "join-" + x[1], pic: true, prompt: ctx.w("join"), say: ctx.w("joinSay", { name: x[2] }), options: G.pics(rng, obj(x), others), answer: x[1] };
      }
      function change(x) {
        var opts = rng.shuffle([x[2], x[3], rng.pick(EXTRA.map(function (e) { return [e.pic, e.w]; }))]).map(function (y) { return { label: y[0], value: y[1] }; });
        var t = ctx.w("change", { name: x[0], how: x[1] });
        return { type: "choose", key: "change-" + x[0], pic: true, prompt: t, say: t, options: opts, answer: x[2][1] };
      }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return count(rng.pick(COUNT)); } },
        { ok: true, make: function () { return join(rng.pick(JOIN)); } },
        { ok: ctx.done("read-sprout-8"), make: function () { return where(rng.pick(WHERE)); } },
        { ok: ctx.done("read-sprout-10"), make: function () { return change(rng.pick(CHANGE)); } }
      ]);
    }
  });

})();

(function () {
  var IGNORE = /[\s‌‍«».،؛:؟!?\-–—…()0-9۰-۹ـ]/;
  // True when every letter of text is in letters (the same test as tools/check-reading.js).
  B.decodable = function (text, letters) {
    for (var i = 0; i < text.length; i++) if (!IGNORE.test(text[i]) && letters.indexOf(text[i]) === -1) return false;
    return true;
  };

  /* «کتابخانه کلمه‌ها: حرف‌های اول» — read-sprout-p2. Words and short sentences of آ ب د م س ـَ, matched to pictures:
     read a word and tap its picture, see a picture and tap its word, read a sentence and answer with a picture.
     Only what the child's letters allow; with the letters of read-sprout-1 alone that is آب and بابا. */
  var WORDS = [
    { w: "آب", pic: "💧" }, { w: "بابا", pic: "👨" }, { w: "باد", pic: "🌬️" }, { w: "بام", pic: "🏠" },
    { w: "بادام", pic: "🌰" }, { w: "اَسب", pic: "🐴" }, { w: "سَبَد", pic: "🧺" }, { w: "مَداد", pic: "✏️" }
  ];
  // Sentences: who came, or what was given. `ask` is read by the grown-up; `who`/`what` are the picture answers.
  var SENTENCES = [
    { text: "بابا آمَد.", ask: "who", ans: "بابا" },
    { text: "اَسب آمَد.", ask: "who", ans: "اَسب" },
    { text: "سام آمَد.", ask: "who", ans: "سام" },
    { text: "بابا آب داد.", ask: "whatBaba", ans: "آب" },
    { text: "بابا بادام داد.", ask: "whatBaba", ans: "بادام" },
    { text: "بابا مَداد داد.", ask: "whatBaba", ans: "مَداد" },
    { text: "سام سَبَد داد.", ask: "whatSam", ans: "سَبَد" },
    { text: "سام آب داد.", ask: "whatSam", ans: "آب" }
  ];
  var WHO = [{ w: "بابا", pic: "👨" }, { w: "اَسب", pic: "🐴" }, { w: "سام", pic: "👦" }];
  var WHAT = WORDS.filter(function (x) { return ["آب", "بادام", "مَداد", "سَبَد", "بام"].indexOf(x.w) !== -1; });

  B.PRACTICE.push({
    id: "read-sprout-p2", subject: "read", level: "sprout", objectives: ["read.spr.6", "read.spr.7"],
    needs: ["read-sprout-1"], emoji: "📚", title: "کلمه‌ها و جمله‌های اول",
    words: {
      readWord: "بخوان. تصویرش کدام است؟",
      findWord: "کلمه این تصویر کدام است؟",
      who: "چه کسی آمد؟", whatBaba: "بابا چه داد؟", whatSam: "سام چه داد؟"
    },
    make: function (rng, n, ctx) {
      var ok = function (t) { return B.decodable(t, ctx.letters); };
      var words = WORDS.filter(function (x) { return ok(x.w); });
      if (words.length < 2) return [];
      var sentences = SENTENCES.filter(function (x) { return ok(x.text); });
      // Pictures to choose from: the answer and one or two others the child can tell apart.
      function pics(ans, from) {
        var others = rng.sample(from.filter(function (x) { return x.w !== ans.w; }), 2);
        return rng.shuffle([ans].concat(others)).map(function (x) { return { label: x.pic, value: x.w }; });
      }
      function wordItem(x, kind) {
        if (kind === "read") return { type: "choose", key: x.w, show: x.w, prompt: ctx.w("readWord"), options: pics(x, words), answer: x.w, pic: true };
        var others = rng.sample(words.filter(function (y) { return y.w !== x.w; }), 2).map(function (y) { return y.w; });
        return { type: "choose", key: x.w, show: x.pic, prompt: ctx.w("findWord"), options: rng.shuffle([x.w].concat(others)), answer: x.w };
      }
      function sentenceItem(x) {
        var from = x.ask === "who" ? WHO.filter(function (y) { return ok(y.w); }) : WHAT;
        var ans = from.find(function (y) { return y.w === x.ans; });
        return { type: "passage", key: x.text, text: x.text, question: ctx.w(x.ask), options: pics(ans, from), answer: x.ans, pic: true };
      }
      var out = [], used = {};
      // The same word may come twice in a session, once each way (read it, find it), never twice the same way.
      function add(step) {
        var tag = (step.show === step.key ? "r" : "f") + step.key;
        if (out.length < n && !used[tag]) { used[tag] = true; out.push(step); }
      }
      // Missed items first, then a mix: about one sentence in three once sentences can be read.
      ctx.again.forEach(function (k) {
        var x = words.find(function (y) { return y.w === k; });
        var sn = sentences.find(function (y) { return y.text === k; });
        if (x) add(wordItem(x, rng.pick(["read", "find"])));
        else if (sn) add(sentenceItem(sn));
      });
      var deck = rng.shuffle(words), sdeck = rng.shuffle(sentences);
      for (var guard = 0; out.length < n && guard < 40; guard++) {
        if (sdeck.length && (out.length % 3 === 2 || !deck.length)) add(sentenceItem(sdeck.shift()));
        else if (deck.length) add(wordItem(deck.shift(), rng.pick(["read", "find"])));
        else deck = rng.shuffle(words);
      }
      return out;
    }
  });
})();

(function () {
  var G = B.readGen, ok = function (t, ctx) { return B.readable(t, ctx.letters); };
  /* Words with pictures for dictation and handwriting, from the first letters on; each is used only once its
     letters are taught. */
  var DICT = [["💧", "آب"], ["🌬️", "باد"], ["🏠", "بام"], ["👨", "بابا"], ["🌰", "بادام"], ["🐴", "اَسب"], ["🧺", "سَبَد"], ["✏️", "مَداد"],
    ["🍓", "توت"], ["🍞", "نان"], ["🍎", "سیب"], ["✋", "دَست"], ["🐭", "موش"], ["🧄", "سیر"], ["🦁", "شیر"], ["📖", "کِتاب"], ["🌙", "ماه"],
    ["🌸", "گُل"], ["🐟", "ماهی"], ["🍉", "هِندِوانه"], ["🐄", "گاو"], ["🦷", "دَندان"], ["⭐", "سِتاره"], ["🌳", "دِرَخت"], ["🐓", "خُروس"]];

  /* read-sprout-p3 «املا»: a word said aloud, built letter by letter (nothing shown until the end); now and then
     the same words on paper, the answers for the grown-up. */
  B.PRACTICE.push({
    id: "read-sprout-p3", subject: "read", level: "sprout", objectives: ["read.spr.8", "read.spr.9"],
    needs: ["read-sprout-6"], emoji: "📝", title: "املا",
    words: { paper: "املا روی کاغذ: بزرگ‌ترت سه کلمه می‌گوید. آن‌ها را در دفترت بنویس.", check: ["هر کلمه را بعد از شنیدن نوشت؟", "از راست شروع کرد؟", "بعد با جواب‌ها مقایسه کرد؟"],
      note: "کلمه‌ها (برای شما): {list}. هر کلمه را دو بار بگویید، بعد جواب‌ها را نشانش بدهید." },
    make: function (rng, n, ctx) {
      var words = DICT.filter(function (x) { return ok(x[1], ctx); });
      if (words.length < 3) return [];
      var letters = ctx.letters.replace(/[َُِّ ًVYءئ]/g, "").split("").filter(function (c) { return (c !== "ی" || ctx.letters.indexOf("Y") !== -1) && (c !== "و" || ctx.letters.indexOf("V") !== -1); });
      function item(x) {
        // «ی» and «و» inside a word shown in their joined form, so a tile is never mistaken for a consonant.
        var parts = B.readLetters(x[1]).map(function (c, i, a) {
          if (i === 0 || (c[0] !== "ی" && c[0] !== "و")) return c;
          var joins = /[^اآدذرزژو]/.test(a[i - 1][0]);
          return (joins ? "ـ" : "") + c + (c[0] === "ی" && i < a.length - 1 ? "ـ" : "");
        });
        var extra = rng.pick(letters.filter(function (c) { return parts.indexOf(c) === -1; }));
        return { type: "build", key: x[1], hidden: true, pic: x[0], word: x[1], parts: parts, extra: extra ? [extra] : [], say: x[1].replace(/[َُِ]/g, "") };
      }
      var out = G.collect(rng, n - 1, ctx.again, [{ ok: true, make: function () { return item(rng.pick(words)); },
        byKey: function (k) { var x = words.find(function (y) { return y[1] === k; }); return x && item(x); } }]);
      var three = rng.sample(words, 3).map(function (x) { return x[1]; });
      out.push({ type: "paper", key: "paper", lang: "fa", text: ctx.w("paper"), check: ctx.w("check"), note: ctx.w("note", { list: three.join("، ") }) });
      return out;
    }
  });

  /* read-sprout-p4 «خوش‌خط بنویس»: letters taught, then whole words with a model, to trace; then a line to copy on paper. */
  var MODEL_WORDS = ["بابا", "نان", "لب", "سیب", "دست"];
  B.PRACTICE.push({
    id: "read-sprout-p4", subject: "read", level: "sprout", objectives: ["read.spr.9", "read.spr.10", "read.spr.18"],
    needs: ["read-sprout-1"], emoji: "✍️", title: "خوش‌خط بنویس",
    words: { letter: "«{name}» را بنویس. از جای درست شروع کن و نقطه‌ها را آخر بگذار.", word: "«{name}» را بنویس: هر تکه یک‌جا، نقطه‌ها آخر.",
      paper: "این کلمه‌ها را از روی سرمشق در دفترت بنویس، هر کدام دو بار.", check: ["از راست شروع کرد؟", "حرف‌ها روی خط بودند؟", "نقطه‌ها سر جایشان بودند؟"] },
    make: function (rng, n, ctx) {
      var letters = ctx.letters.replace(/[َُِّ ًVYءئ]/g, "").split("").filter(function (c, i, a) { return a.indexOf(c) === i; });
      if (!letters.length) return [];
      var models = MODEL_WORDS.filter(function (w) { return ok(w, ctx); });
      var makers = [{ ok: true, make: function () { var c = rng.pick(letters); return { type: "trace", key: "l" + c, letter: c, prompt: ctx.w("letter", { name: c }), say: ctx.w("letter", { name: c }) }; } },
        { ok: models.length > 0, make: function () { var w = rng.pick(models); return { type: "trace", key: "w" + w, letter: w, prompt: ctx.w("word", { name: w }), say: ctx.w("word", { name: w }) }; } }];
      var out = G.collect(rng, Math.min(n - 1, 4), [], makers);
      var copy = rng.sample(DICT.filter(function (x) { return ok(x[1], ctx); }), 3).map(function (x) { return x[1]; });
      if (copy.length) out.push({ type: "paper", key: "copy", lang: "fa", text: ctx.w("paper"), example: copy.join("   "), check: ctx.w("check") });
      return out;
    }
  });

  /* read-sprout-p5 «تصویر را بخوان»: four-picture stories to put in order, and picture cards to talk about. */
  var SERIES = [["☀️", "☁️", "🌧️", "☂️"], ["🚰", "🫖", "🔥", "☕"], ["🥚", "🐣", "🐥", "🐔"], ["❄️", "⛄", "☀️", "💧"], ["🥕", "🔪", "🍲", "🥣"],
    ["🌰", "🌱", "🌿", "🌳"], ["🛏️", "🧼", "🍞", "⚽"], ["👟", "🚶", "🛝", "🏠"], ["🛒", "🍎", "🧺", "🏠"]];
  var CARDS = [
    { k: "street", scene: "🏘️ 🚗 🚦 👵 👦", q: ["چه کسانی در کوچه هستند؟", "چه اتفاقی دارد می‌افتد؟", "بعدش چه می‌شود؟"] },
    { k: "fruit", scene: "🍎 🍊 🍇 🧺 👨 👧", q: ["میوه‌فروش چه می‌فروشد؟", "دختر چه می‌خرد؟", "چرا آن را انتخاب کرد؟"] },
    { k: "village", scene: "🏡 🌾 🐄 🧑‍🌾 ⛰️", q: ["کشاورز چه کار می‌کند؟", "چه فصلی است؟ از کجا فهمیدی؟", "در روستا چه صداهایی می‌شنوی؟"] },
    { k: "river", scene: "🌊 🐟 🦆 🌳 🪨", q: ["چه حیوان‌هایی آن‌جا زندگی می‌کنند؟", "آب از کجا می‌آید؟", "اگر آن‌جا بودی چه می‌کردی؟"] },
    { k: "morning", scene: "🌅 🏠 👩 🍳 👧 🪥", q: ["صبح در خانه چه کسی چه کار می‌کند؟", "دختر بعدش کجا می‌رود؟", "صبح‌های تو چطور است؟"] }
  ];
  B.PRACTICE.push({
    id: "read-sprout-p5", subject: "read", level: "sprout", objectives: ["read.spr.11", "read.spr.13", "read.spr.17"],
    needs: ["read-sprout-12"], emoji: "🖼️", title: "تصویر را بخوان",
    words: { order: "این قصه کلمه ندارد. تصویرها را به ترتیب بچین.", talk: "این تصویر را بخوان: چه کسی؟ کجا؟ چه کار می‌کند؟",
      tip: "بخواهید با جمله کامل جواب دهد و قصه اول، وسط و آخر داشته باشد." },
    make: function (rng, n, ctx) {
      var series = ctx.done("read-sprout-15") ? SERIES : SERIES.slice(0, 4);
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var s = rng.pick(series); return { type: "order", key: "s-" + s.join(""), prompt: ctx.w("order"), say: ctx.w("order"), numbered: true, items: s.slice() }; } },
        { ok: true, make: function () { var c = rng.pick(CARDS); return { type: "talk", key: "c-" + c.k, scene: c.scene, caption: ctx.w("talk"), tips: c.q.concat([ctx.w("tip")]) }; } }
      ]);
    }
  });

  /* read-sprout-p6 «کلمه‌های تازه»: theme words heard and found, matched in memory games, sorted by theme. */
  var THEMES = {
    body: [["🦵", "زانو"], ["👁️", "چشم"], ["👂", "گوش"], ["🦷", "دندان"], ["✋", "دست"], ["🦶", "پا"]],
    jobs: [["👩‍⚕️", "پزشک"], ["🧑‍🌾", "کشاورز"], ["🧑‍🍳", "نانوا"], ["👨‍🏫", "معلم"], ["🚒", "آتش‌نشان"]],
    feelings: [["😄", "خوشحال"], ["😢", "غمگین"], ["😠", "عصبانی"], ["😟", "نگران"], ["😴", "خواب‌آلود"]],
    weather: [["☀️", "آفتابی"], ["☁️", "ابری"], ["🌧️", "بارانی"], ["❄️", "برفی"], ["🌬️", "بادی"]],
    nature: [["⛰️", "کوه"], ["🌊", "دریا"], ["🌳", "جنگل"], ["🌾", "مزرعه"], ["🏜️", "بیابان"]]
  };
  var ICON = { body: "🧍", jobs: "🧰", feelings: "💭", weather: "🌦️", nature: "🏞️" };
  B.PRACTICE.push({
    id: "read-sprout-p6", subject: "read", level: "sprout", objectives: ["read.spr.12"],
    needs: ["read-sprout-13"], emoji: "🗂️", title: "کلمه‌های تازه",
    words: { find: "«{name}» کدام است؟", pairs: "کارت‌ها را برگردان و گوش بده. هر کلمه را با تصویرش جفت کن.",
      sort: "روی هر تصویر بزن و اسمش را بشنو. هر کدام را در سبد خودش بگذار.", themes: { body: "بدن", jobs: "شغل‌ها", feelings: "حس‌ها", weather: "هوا", nature: "طبیعت" } },
    make: function (rng, n, ctx) {
      var all = []; Object.keys(THEMES).forEach(function (t) { THEMES[t].forEach(function (x) { all.push({ pic: x[0], w: x[1], t: t }); }); });
      function find(x) {
        return { type: "choose", key: "find-" + x.w, pic: true, prompt: ctx.w("find", { name: x.w }), say: ctx.w("find", { name: x.w }),
          options: G.pics(rng, x, all.filter(function (y) { return y.t === x.t && y.w !== x.w; })), answer: x.w };
      }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return find(rng.pick(all)); }, byKey: function (k) { var x = all.find(function (y) { return "find-" + y.w === k; }); return x && find(x); } },
        { ok: true, make: function () { var four = rng.sample(all, 4); return { type: "pairs", key: "pairs-" + four.map(function (x) { return x.w; }).sort().join(","), hidden: true, prompt: ctx.w("pairs"), say: ctx.w("pairs"),
          pairs: four.map(function (x) { return [{ pic: "🔊", say: x.w }, { pic: x.pic, say: x.w }]; }) }; } },
        { ok: true, make: function () {
          var ts = rng.sample(Object.keys(THEMES), 2), items = [];
          ts.forEach(function (t) { rng.sample(THEMES[t], 3).forEach(function (x) { items.push({ pic: x[0], say: x[1], basket: t }); }); });
          return { type: "sort", key: "sort-" + ts.slice().sort().join("-"), prompt: ctx.w("sort"), say: ctx.w("sort"),
            baskets: ts.map(function (t) { return { pic: ICON[t], value: t, say: ctx.w("themes")[t] }; }), items: rng.shuffle(items) };
        } }
      ]);
    }
  });

  /* read-sprout-p7 «شنیدیم، یاد گرفتیم»: longer heard stories (the problem, how it was solved, what next), short
     information texts and poems, each said aloud with one question answered with pictures. */
  var HEARD = [
    { k: "crow", say: "کلاغ تشنه بود. آب ته کوزه بود و نوکش به آب نمی‌رسید. کلاغ سنگ‌ریزه‌ها را یکی‌یکی توی کوزه انداخت. آب بالا آمد و کلاغ آب خورد.", q: "کلاغ چطور آب خورد؟", o: [["🪨", "سنگ‌ریزه انداخت"], ["🥤", "با نی"], ["🌧️", "صبر کرد تا باران بیاید"]] },
    { k: "ball", say: "توپ بچه‌ها از روی دیوار پرید و افتاد توی حیاط همسایه. آرش بلند گفت: «ببخشید!» پدربزرگ همسایه توپ را برایشان انداخت.", q: "مشکل بچه‌ها چه بود؟", o: [["⚽", "توپشان آن طرف دیوار افتاد"], ["🌧️", "باران آمد"], ["🍦", "بستنی‌شان افتاد"]] },
    { k: "bees", say: "زنبورها روی گل‌ها می‌نشینند و شهد گل‌ها را می‌مکند. بعد شهد را به کندو می‌برند و از آن عسل درست می‌کنند.", q: "عسل را چه کسی درست می‌کند؟", o: [["🐝", "زنبور"], ["🐄", "گاو"], ["🐔", "مرغ"]] },
    { k: "bread", say: "کشاورز گندم می‌کارد. گندم را آسیاب می‌کنند و آرد درست می‌شود. آرد را با آب مخلوط می‌کنند و در تنور می‌پزند.", q: "نان را از چه درست می‌کنند؟", o: [["🌾", "گندم"], ["🍎", "سیب"], ["🥛", "شیر"]] },
    { k: "seed", say: "دانه را در خاک می‌کاریم و به آن آب می‌دهیم. دانه ریشه می‌دهد و یک جوانه از خاک بیرون می‌آید.", q: "دانه برای سبز شدن به چه نیاز دارد؟", o: [["💧", "آب"], ["🍬", "آبنبات"], ["🧸", "عروسک"]] },
    { k: "sparrow", say: "گنجشک کوچک من، نشسته روی چمن. دانه می‌چیند تند تند، جیک جیک می‌کند بلند.", q: "در شعر، گنجشک کجا نشسته است؟", o: [["🌱", "روی چمن"], ["🌳", "روی درخت"], ["🏠", "روی بام"]] },
    { k: "snowman", say: "برف بارید و بچه‌ها یک آدم‌برفی ساختند. فردا خورشید درآمد و هوا گرم شد.", q: "فکر می‌کنی آدم‌برفی چه شد؟", o: [["💧", "آب شد"], ["⛄", "بزرگ‌تر شد"], ["🚶", "راه رفت"]] }
  ];
  B.PRACTICE.push({
    id: "read-sprout-p7", subject: "read", level: "sprout", objectives: ["read.spr.14", "read.spr.15", "read.spr.16"],
    needs: ["read-sprout-18"], emoji: "👂", title: "شنیدیم، یاد گرفتیم",
    words: { listen: "خوب گوش کن." },
    make: function (rng, n, ctx) {
      var open = HEARD.filter(function (h) { return ["bees", "bread"].indexOf(h.k) === -1 || ctx.done("read-sprout-19"); }).filter(function (h) { return h.k !== "sparrow" || ctx.done("read-sprout-20"); });
      function item(h) {
        return { type: "choose", key: h.k, pic: true, prompt: h.q, say: ctx.w("listen") + " " + h.say + " " + h.q,
          options: rng.shuffle(h.o.map(function (x) { return { label: x[0], value: x[1] }; })), answer: h.o[0][1] };
      }
      return G.collect(rng, n, ctx.again, [{ ok: true, make: function () { return item(rng.pick(open)); }, byKey: function (k) { var h = open.find(function (x) { return x.k === k; }); return h && item(h); } }]);
    }
  });
})();

/* ---------------- Sapling: reading grows with the letters, then words, grammar and writing ---------------- */
(function () {
  var G = B.readGen, ok = function (t, ctx) { return B.readable(t, ctx.letters); };
  var opt = function (list) { return list.map(function (x) { return typeof x === "string" ? x : { label: x[0], value: x[1] }; }); };

  /* read-sapling-p1 «کتابخانه کوچک»: sentences and short texts with vowel marks, only the letters taught so far, each
     with a question; once marks are faded (read-sapling-39), short texts without them. */
  var TEXTS = [
    { t: "بابا آب داد.", q: "بابا چه داد؟", o: [["💧", "آب"], ["🌰", "بادام"]] },
    { t: "سارا توت دارَد.", q: "سارا چه دارد؟", o: [["🍓", "توت"], ["💧", "آب"]] },
    { t: "تینا نان دارَد.", q: "تینا چه دارد؟", o: [["🍞", "نان"], ["🍓", "توت"]] },
    { t: "آرش سیب دارَد. سیب سُرخ اَست.", q: "سیب چه رنگی است؟", o: [["🟥", "سرخ"], ["🟦", "آبی"]] },
    { t: "بابا موز آوَرد. سارا موز را دوست دارَد.", q: "بابا چه آورد؟", o: [["🍌", "موز"], ["🍎", "سیب"]] },
    { t: "نیما دَر دَریا شِنا کَرد.", q: "نیما کجا شنا کرد؟", o: [["🌊", "دریا"], ["🏠", "خانه"]] },
    { t: "سامان کِتاب دارَد. کِتاب روی میز اَست.", q: "کتاب کجاست؟", o: [["🪑", "روی میز"], ["🛏️", "روی تخت"]] },
    { t: "ماه دَر آسِمان اَست. شَب اَست.", q: "در آسمان چه هست؟", o: [["🌙", "ماه"], ["☀️", "خورشید"]] },
    { t: "پِدَر لِباس پوشید وَ بیرون رَفت.", q: "پدر چه پوشید؟", o: [["👕", "لباس"], ["🧦", "جوراب"]] },
    { t: "گُل‌ها دَر باغچه رُشد کَردَند.", q: "گل‌ها کجا رشد کردند؟", o: [["🌷", "باغچه"], ["🌊", "دریا"]] },
    { t: "جوجه زَرد اَست. جوجه جیک‌جیک کَرد.", q: "جوجه چه رنگی است؟", o: [["🟨", "زرد"], ["🟥", "سرخ"]] },
    { t: "خورشید بالا آمَد. هَوا گَرم شُد.", q: "هوا چطور شد؟", o: [["☀️", "گرم"], ["❄️", "سرد"]] },
    { t: "فاطِمه قاشُق وَ چَنگال آوَرد.", q: "فاطمه چه آورد؟", o: [["🥄", "قاشق"], ["🧺", "سبد"]] },
    { t: "یاسَمَن یِک ژاکَت زَرد پوشید.", q: "یاسمن چه پوشید؟", o: [["🧥", "ژاکت"], ["🧢", "کلاه"]] },
    { t: "صُبح شُد. پَرَنده‌ها آواز خواندَند.", q: "پرنده‌ها چه کار کردند؟", o: [["🎶", "آواز خواندند"], ["🛌", "خوابیدند"]] },
    { t: "طوطی سَبز روی دِرَخت نِشَسته اَست.", q: "طوطی کجاست؟", o: [["🌳", "روی درخت"], ["🏠", "در خانه"]] },
    { t: "حَسَن با عَمو به باغ رَفت.", q: "حسن با چه کسی رفت؟", o: [["👨", "عمو"], ["👵", "مادربزرگ"]] },
    { t: "زهرا هر صبح با برادرش به مدرسه می‌رود. آن‌ها با هم راه می‌روند و حرف می‌زنند.", q: "زهرا با چه کسی به مدرسه می‌رود؟", o: ["با برادرش", "با پدربزرگ", "تنها"], plain: true },
    { t: "باران تند شد. بچه‌ها به خانه دویدند و از پنجره بیرون را تماشا کردند.", q: "بچه‌ها چرا به خانه دویدند؟", o: ["چون باران تند شد", "چون گرسنه بودند", "چون شب شد"], plain: true },
    { t: "پدربزرگ یک درخت سیب در حیاط کاشت. حالا آن درخت بزرگ شده و هر تابستان سیب می‌دهد.", q: "درخت سیب کجاست؟", o: ["در حیاط", "در پارک", "در مدرسه"], plain: true }
  ];
  B.PRACTICE.push({
    id: "read-sapling-p1", subject: "read", level: "sapling", objectives: ["read.sap.6", "read.sap.10", "read.sap.11"],
    needs: ["read-sapling-1"], emoji: "📚", title: "کتابخانه کوچک",
    words: { read: "بخوان. بعد جواب بده." },
    make: function (rng, n, ctx) {
      var faded = ctx.done("read-sapling-39");
      var open = TEXTS.filter(function (x) { return ok(x.t, ctx) && (!x.plain || faded) && x.o.every(function (o) { return typeof o !== "string" || ok(o, ctx); }); });
      function item(x) {
        var options = opt(x.o);
        return { type: "passage", key: x.t, prompt: ctx.w("read"), text: x.t, question: x.q, options: rng.shuffle(options), answer: typeof x.o[0] === "string" ? x.o[0] : x.o[0][1], pic: !x.plain };
      }
      return G.collect(rng, n, ctx.again, [{ ok: open.length > 0, make: function () { return item(rng.pick(open)); }, byKey: function (k) { var x = open.find(function (y) { return y.t === k; }); return x && item(x); } }]);
    }
  });

  /* read-sapling-p2 «املا»: a word said aloud and built letter by letter, with a same-sound letter among the tiles
     once both are taught; later a sentence on paper with the answer for the grown-up. */
  var DICT = [["🍓", "توت"], ["🍞", "نان"], ["🍎", "سیب"], ["✋", "دست"], ["🐭", "موش"], ["🦁", "شیر"], ["📖", "کتاب"], ["🌙", "ماه"], ["🌸", "گل"],
    ["🐟", "ماهی"], ["⭐", "ستاره"], ["🌳", "درخت"], ["🐓", "خروس"], ["🌅", "صبح"], ["🏡", "حیاط"], ["🍲", "غذا"], ["🦜", "طوطی"], ["🧼", "صابون"],
    ["🌞", "ظهر"], ["🍯", "عسل"], ["🐸", "قورباغه"], ["🌹", "گل سرخ"], ["🏫", "مدرسه"], ["🍞", "صبحانه"], ["🌅", "طلوع"], ["🌳", "باغ"]];
  var TWINS = [["ت", "ط"], ["س", "ص", "ث"], ["ز", "ذ", "ض", "ظ"], ["ه", "ح"], ["ق", "غ"], ["ا", "ع"]];
  var SENT = ["صبح زود خورشید طلوع کرد.", "ما در حیاط صبحانه خوردیم.", "طوطی روی درخت نشست.", "ظهر غذا خوردیم و استراحت کردیم.", "مادر با صابون دست‌هایش را شست."];
  B.PRACTICE.push({
    id: "read-sapling-p2", subject: "read", level: "sapling", objectives: ["read.sap.7", "read.sap.21"],
    needs: ["read-sapling-24"], emoji: "📝", title: "املا",
    words: { paper: "املا روی کاغذ: بزرگ‌ترت یک جمله می‌گوید. آن را در دفترت بنویس و بعد با جواب مقایسه کن.",
      check: ["جمله را کامل نوشت؟", "نقطه آخر جمله را گذاشت؟", "خودش با جواب مقایسه کرد؟"], note: "جمله (برای شما): «{s}» آن را آرام و دو بار بگویید." },
    make: function (rng, n, ctx) {
      var words = DICT.filter(function (x) { return ok(x[1], ctx) && x[1].indexOf(" ") === -1; });
      function twin(parts) {
        for (var i = 0; i < parts.length; i++) {
          var g = TWINS.find(function (t) { return t.indexOf(parts[i]) !== -1; });
          if (g) { var o = g.filter(function (c) { return c !== parts[i] && ctx.letters.indexOf(c) !== -1; }); if (o.length) return rng.pick(o); }
        }
        return null;
      }
      function item(x) {
        var parts = B.readLetters(x[1]), t = twin(parts);
        var spare = ctx.letters.replace(/[َُِّ ًVYءئ]/g, "").split("").filter(function (c) { return parts.indexOf(c) === -1 && c !== "ی" && c !== "و"; });
        var extra = t ? [t] : spare.length ? [rng.pick(spare)] : [];
        return { type: "build", key: x[1], hidden: true, pic: x[0], word: x[1], parts: parts, extra: extra, say: x[1] };
      }
      var out = G.collect(rng, ctx.done("read-sapling-38") ? n - 1 : n, ctx.again, [{ ok: words.length > 0, make: function () { return item(rng.pick(words)); },
        byKey: function (k) { var x = words.find(function (y) { return y[1] === k; }); return x && item(x); } }]);
      if (ctx.done("read-sapling-38") && out.length) out.push({ type: "paper", key: "paper", lang: "fa", text: ctx.w("paper"), check: ctx.w("check"), note: ctx.w("note", { s: rng.pick(SENT) }) });
      return out;
    }
  });

  /* read-sapling-p3 «سرمشق»: letters and joined words to trace, then a model line copied on paper. */
  var ALL = "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی".split(" ");
  var MODELS = ["بابا", "نان", "لب", "سیب", "دست", "بـ", "ـبـ", "ـب"];
  var LINES = ["دانا توانا بود.", "هر که دانا بود توانا بود.", "باران آمد. گل‌ها شاد شدند.", "درخت سبز در باغ است.", "کتاب دوست خوب ماست."];
  B.PRACTICE.push({
    id: "read-sapling-p3", subject: "read", level: "sapling", objectives: ["read.sap.8", "read.sap.33"],
    needs: ["read-sapling-26"], emoji: "🖋️", title: "سرمشق",
    words: { trace: "«{name}» را خوش‌خط بنویس.", paper: "این سرمشق را با دقت و بدون عجله سه بار در دفترت بنویس.",
      check: ["حرف‌ها هم‌اندازه و روی خط بودند؟", "بین کلمه‌ها فاصله یکسان بود؟", "نقطه‌ها سر جایشان بودند؟"] },
    make: function (rng, n, ctx) {
      var out = G.collect(rng, Math.min(4, n - 1), [], [
        { ok: true, make: function () { var c = rng.pick(ALL); return { type: "trace", key: "l" + c, letter: c, prompt: ctx.w("trace", { name: c }), say: ctx.w("trace", { name: c }) }; } },
        { ok: true, make: function () { var w = rng.pick(MODELS); return { type: "trace", key: "w" + w, letter: w, prompt: ctx.w("trace", { name: w }), say: ctx.w("trace", { name: w }) }; } }
      ]);
      out.push({ type: "paper", key: "line", lang: "fa", text: ctx.w("paper"), example: rng.pick(LINES), check: ctx.w("check") });
      return out;
    }
  });

  /* read-sapling-p4 «خانواده کلمه‌ها»: word families sorted, words built with a suffix, compound words. */
  var FAM = { "دان": ["دانا", "دانش", "دانشمند", "دانشگاه"], "کار": ["کارگر", "کارخانه", "کاری", "بیکار"], "گل": ["گلدان", "گلستان", "گلفروش", "گلبرگ"],
    "باغ": ["باغبان", "باغچه", "باغ‌وحش"], "خوان": ["خواندن", "خواننده", "کتاب‌خوان"] };
  var SUF = [["باغ", "بان", "باغبان", "کسی که از باغ نگه‌داری می‌کند"], ["نمک", "دان", "نمکدان", "ظرف نمک"], ["باغ", "چه", "باغچه", "باغ کوچک"],
    ["ایران", "ی", "ایرانی", "کسی که از ایران است"], ["گل", "ستان", "گلستان", "جای پر از گل"], ["آهن", "گر", "آهنگر", "کسی که با آهن کار می‌کند"],
    ["دانش", "مند", "دانشمند", "کسی که دانش زیادی دارد"], ["کار", "گر", "کارگر", "کسی که کار می‌کند"], ["کتاب", "چه", "کتابچه", "کتاب کوچک"]];
  var COMP = [["گل", "‌فروش", "گل‌فروش", "کسی که گل می‌فروشد"], ["کتاب", "‌خانه", "کتاب‌خانه", "جای کتاب‌ها"], ["دست", "‌کش", "دست‌کش", "برای گرم کردن دست"],
    ["آب", "‌پاش", "آب‌پاش", "برای آب دادن به گل‌ها"], ["مداد", "‌تراش", "مدادتراش", "برای تیز کردن مداد"]];
  B.PRACTICE.push({
    id: "read-sapling-p4", subject: "read", level: "sapling", objectives: ["read.sap.17", "read.sap.18"],
    needs: ["read-sapling-54"], emoji: "👨‍👩‍👧", title: "خانواده کلمه‌ها",
    words: { sort: "از کدام خانواده است؟", build: "کلمه بساز: {name}" },
    make: function (rng, n, ctx) {
      function famSort() {
        var two = rng.sample(Object.keys(FAM), 2), items = [];
        two.forEach(function (r) { rng.sample(FAM[r], 3).forEach(function (w) { items.push({ label: w, basket: r }); }); });
        return { type: "sort", key: "fam-" + two.slice().sort().join("-"), prompt: ctx.w("sort"), baskets: two.map(function (r) { return { label: r }; }), items: rng.shuffle(items) };
      }
      function build(x, list) {
        var other = rng.pick(list.filter(function (y) { return y[1] !== x[1]; }));
        return { type: "build", key: x[2], word: x[2], parts: [x[0], x[1]], extra: [other[1]], prompt: ctx.w("build", { name: x[3] }) };
      }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: famSort },
        { ok: ctx.done("read-sapling-55"), make: function () { return build(rng.pick(SUF), SUF); } },
        { ok: ctx.done("read-sapling-56"), make: function () { return build(rng.pick(COMP), COMP); } }
      ]);
    }
  });

  /* read-sapling-p5 «هم‌معنی، مخالف، جمع»: synonyms and opposites to match and to put in a sentence; singular and plural. */
  var SYN = [["شاد", "خوشحال"], ["زیبا", "قشنگ"], ["تند", "سریع"], ["شروع", "آغاز"], ["خانه", "منزل"], ["دوست", "رفیق"], ["بزرگ", "درشت"], ["آرام", "آهسته"]];
  var OPP = [["بالا", "پایین"], ["روز", "شب"], ["زود", "دیر"], ["گرم", "سرد"], ["پر", "خالی"], ["باز", "بسته"], ["بزرگ", "کوچک"], ["آمد", "رفت"], ["تند", "آرام"]];
  var FILL = [{ s: "سارا امروز خیلی … است. (هم‌معنی شاد)", a: "خوشحال", o: ["خوشحال", "خسته", "گرسنه"] }, { s: "پرنده بالای درخت است، گربه … درخت.", a: "پایین", o: ["پایین", "بالای", "کنار"] },
    { s: "روز خورشید می‌تابد، … ماه پیدا می‌شود.", a: "شب", o: ["شب", "صبح", "ظهر"] }, { s: "لیوان پر است، بشقاب … است.", a: "خالی", o: ["خالی", "پر", "گرم"] },
    { s: "باغ مادربزرگ خیلی … است. (هم‌معنی زیبا)", a: "قشنگ", o: ["قشنگ", "سرد", "کوچک"] }];
  var PLUR = [["کتاب", "کتاب‌ها", "ها"], ["گل", "گل‌ها", "ها"], ["مداد", "مدادها", "ها"], ["میز", "میزها", "ها"], ["درخت", "درختان", "ان"], ["دانش‌آموز", "دانش‌آموزان", "ان"], ["پرنده", "پرندگان", "ان"], ["کودک", "کودکان", "ان"]];
  B.PRACTICE.push({
    id: "read-sapling-p5", subject: "read", level: "sapling", objectives: ["read.sap.16", "read.sap.20"],
    needs: ["read-sapling-42"], emoji: "🟰", title: "هم‌معنی، مخالف، جمع",
    words: { syn: "هر کلمه را با هم‌معنی‌اش جفت کن.", opp: "هر کلمه را با مخالفش جفت کن.", fill: "کدام کلمه جمله را کامل می‌کند؟",
      plural: "جمع «{name}» کدام است؟", sortPl: "یکی است یا چندتا؟", one: "یکی", many: "چندتا" },
    make: function (rng, n, ctx) {
      function pairs(list, kind) { var three = rng.sample(list, 3); return { type: "pairs", key: kind + three.map(function (p) { return p[0]; }).sort().join(","), prompt: ctx.w(kind), pairs: three.map(function (p) { return [p[0], p[1]]; }) }; }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return pairs(SYN, "syn"); } },
        { ok: ctx.done("read-sapling-43"), make: function () { return pairs(OPP, "opp"); } },
        { ok: ctx.done("read-sapling-43"), make: function () { var f = rng.pick(FILL); return { type: "choose", key: f.s, show: f.s, prompt: ctx.w("fill"), options: rng.shuffle(f.o), answer: f.a }; } },
        { ok: ctx.done("read-sapling-44"), make: function () {
          var p = rng.pick(PLUR), wrong = p[0] + (p[2] === "ها" ? "ان" : "‌ها");
          return { type: "choose", key: "pl-" + p[0], prompt: ctx.w("plural", { name: p[0] }), options: rng.shuffle([p[1], wrong]), answer: p[1] };
        } },
        { ok: ctx.done("read-sapling-44"), make: function () {
          var four = rng.sample(PLUR, 3), items = [];
          four.forEach(function (p, i) { items.push({ label: i % 2 ? p[1] : p[0], basket: i % 2 ? "many" : "one" }); });
          items.push({ label: four[0][1], basket: "many" });
          return { type: "sort", key: "sortpl-" + four.map(function (p) { return p[0]; }).join(","), prompt: ctx.w("sortPl"),
            baskets: [{ label: ctx.w("one"), value: "one" }, { label: ctx.w("many"), value: "many" }], items: rng.shuffle(items) };
        } }
      ]);
    }
  });

  /* read-sapling-p6 «بلند بخوان»: short texts read aloud, the grown-up marks the hard words, then a re-read; with marks
     first, without them once marks are faded. */
  var FLUENT = [
    { pic: "⚽", t: "سارا وَ نیما دَر حَیاط هَستَند. سارا توپ را بِه نیما می‌دَهَد. نیما توپ را می‌گیرَد." },
    { pic: "🍎", t: "تینا با مادَرَش بِه بازار رَفت. آن‌ها سیب وَ اَنار خَریدَند." },
    { pic: "🌸", t: "سامان یِک باغچه کوچَک دارَد. او هَر روز بِه گُل‌ها آب می‌دَهَد." },
    { pic: "🚂", t: "قطار از تونل بیرون آمد. بچه‌ها از پنجره کوه‌ها را تماشا کردند. یکی پرسید: «کی می‌رسیم؟»", plain: true },
    { pic: "🐈", t: "گربه آرام روی دیوار راه رفت. ناگهان پرید و توپ را گرفت. چه گربه بازیگوشی!", plain: true },
    { pic: "🌊", t: "دریا آرام بود. ناگهان یک دلفین از آب بیرون پرید! بچه‌ها فریاد زدند: «دلفین!»", plain: true },
    { pic: "🐻", t: "خرس گفت: «من خیلی گرسنه‌ام!» موش گفت: «بیا، این عسل مال تو!»", plain: true },
    { pic: "📚", t: "زهرا به کتابخانه رفت. او یک کتاب درباره ستاره‌ها برداشت و امشب آن را برای برادرش می‌خواند.", plain: true }
  ];
  B.PRACTICE.push({
    id: "read-sapling-p6", subject: "read", level: "sapling", objectives: ["read.sap.10", "read.sap.12"],
    needs: ["read-sapling-28"], emoji: "🗣️", title: "بلند بخوان",
    words: {},
    make: function (rng, n, ctx) {
      var faded = ctx.done("read-sapling-39");
      var open = FLUENT.filter(function (x) { return ok(x.t, ctx) && (!x.plain || faded); });
      return rng.sample(open, Math.min(n, 3)).map(function (x) { return { type: "readaloud", key: x.t.slice(0, 20), pic: x.pic, text: x.t }; });
    }
  });

  /* read-sapling-p7 «بخوان و بفهم»: stories, حکایت and information texts with who / what / why / what next questions. */
  var READS = [
    { k: "hat", t: "علی با کلاه قرمزش در پارک بود. باد تندی آمد و کلاه را برد. یک سگ مهربان کلاه را برایش آورد.", qs: [["چه کسی کلاه را آورد؟", "سگ", ["گربه", "پدر"]], ["چرا کلاه رفت؟", "باد آمد", ["علی آن را انداخت", "باران آمد"]]] },
    { k: "rain", t: "مینا چترش را برداشت و چکمه‌هایش را پوشید. آسمان پر از ابرهای سیاه بود.", qs: [["فکر می‌کنی هوا چطور بود؟", "بارانی", ["آفتابی", "برفی"]]] },
    { k: "egg", t: "رضا تخم‌مرغ را از دستش انداخت. تخم‌مرغ روی زمین افتاد.", qs: [["فکر می‌کنی بعدش چه شد؟", "تخم‌مرغ شکست", ["تخم‌مرغ پرواز کرد", "تخم‌مرغ بزرگ شد"]]] },
    { k: "lion", t: "شیری موشی را گرفت و رها کرد. چند روز بعد شیر در دام افتاد. موش آمد و طناب‌ها را جوید.", qs: [["موش چطور به شیر کمک کرد؟", "طناب‌ها را جوید", ["برایش غذا آورد", "او را بیدار کرد"]], ["پیام این حکایت چیست؟", "کوچک‌ها هم می‌توانند کمک کنند", ["شیر از همه قوی‌تر است", "نباید خوابید"]]], after: "read-sapling-48" },
    { k: "turtle", t: "دو مرغابی لاک‌پشت را با یک چوب به برکه دیگر بردند. لاک‌پشت در راه حرف زد و افتاد.", qs: [["چرا لاک‌پشت افتاد؟", "چون حرف زد", ["چون چوب شکست", "چون باد آمد"]], ["پیام این قصه چیست؟", "اول فکر کن، بعد حرف بزن", ["همیشه پرواز کن", "در آب بازی نکن"]]], after: "read-sapling-79" },
    { k: "cloud", t: "خورشید آب دریا را گرم می‌کند. آب بخار می‌شود و بالا می‌رود. بخار سرد می‌شود و ابر درست می‌شود.", qs: [["ابر از چه درست می‌شود؟", "از بخار آب", ["از دود", "از برف"]]], after: "read-sapling-58" },
    { k: "cheetah", t: "یوزپلنگ ایرانی در دشت‌های مرکز ایران زندگی می‌کند. او سریع‌ترین جانور خشکی است.", qs: [["یوزپلنگ ایرانی کجا زندگی می‌کند؟", "در دشت‌های مرکز ایران", ["در دریا", "در جنگل‌های شمال"]]], after: "read-sapling-58" },
    { k: "sea", t: "آب دریا شور است و نمی‌شود آن را نوشید. در دریا ماهی، خرچنگ و دلفین زندگی می‌کنند.", qs: [["چرا آب دریا را نمی‌نوشیم؟", "چون شور است", ["چون داغ است", "چون شیرین است"]]], after: "read-sapling-58" }
  ];
  B.PRACTICE.push({
    id: "read-sapling-p7", subject: "read", level: "sapling", objectives: ["read.sap.13", "read.sap.14", "read.sap.15"],
    needs: ["read-sapling-46"], emoji: "🔎", title: "بخوان و بفهم",
    words: {},
    make: function (rng, n, ctx) {
      var items = [];
      READS.forEach(function (c) { if (!c.after || ctx.done(c.after)) c.qs.forEach(function (q, i) { items.push({ c: c, q: q, key: c.k + i }); }); });
      function item(x) { return { type: "passage", key: x.key, text: x.c.t, question: x.q[0], options: rng.shuffle([x.q[1]].concat(x.q[2])), answer: x.q[1] }; }
      return G.collect(rng, n, ctx.again, [{ ok: true, make: function () { return item(rng.pick(items)); }, byKey: function (k) { var x = items.find(function (y) { return y.key === k; }); return x && item(x); } }]);
    }
  });

  /* read-sapling-p8 «بازی دستور»: names, verbs and describing words sorted and marked in sentences; tenses and persons. */
  var CLASS = { noun: ["درخت", "مادر", "کتاب", "پرنده", "مدرسه", "کوه", "سارا", "تبریز"], verb: ["دوید", "نوشت", "می‌خواند", "رفتیم", "خندید", "می‌پزد"], adj: ["بلند", "شیرین", "سرد", "کوچک", "سبز", "قشنگ"] };
  var MARK = [{ t: "سارا یک کتاب و یک مداد خرید.", kind: "noun", a: ["سارا", "کتاب", "مداد"] }, { t: "گربه روی دیوار حیاط نشست.", kind: "noun", a: ["گربه", "دیوار", "حیاط"] },
    { t: "پسر توپ را انداخت.", kind: "verb", a: ["انداخت"] }, { t: "مادربزرگ برای ما آش پخت.", kind: "verb", a: ["پخت"] }, { t: "سارا خندید. برادرش دوید.", kind: "verb", a: ["خندید", "دوید"] },
    { t: "من یک سیب سرخ خوردم.", kind: "adj", a: ["سرخ"] }, { t: "پرنده کوچک روی شاخه سبز نشست.", kind: "adj", a: ["کوچک", "سبز"] }];
  var TENSE = [["رفت", "past"], ["می‌رود", "now"], ["خواهد رفت", "future"], ["نوشتم", "past"], ["می‌نویسم", "now"], ["خواهم نوشت", "future"], ["خورد", "past"], ["می‌خورد", "now"], ["خواهد خورد", "future"]];
  var PERSON = [["من", "دیدم"], ["تو", "دیدی"], ["او", "دید"], ["ما", "دیدیم"], ["شما", "دیدید"], ["آن‌ها", "دیدند"]];
  B.PRACTICE.push({
    id: "read-sapling-p8", subject: "read", level: "sapling", objectives: ["read.sap.23", "read.sap.24"],
    needs: ["read-sapling-64"], emoji: "🏷️", title: "بازی دستور",
    words: { sort: "اسم است، فعل یا صفت؟", names: { noun: "اسم", verb: "فعل", adj: "صفت" }, mark: { noun: "اسم‌ها را علامت بزن.", verb: "فعل‌ها را علامت بزن.", adj: "صفت‌ها را علامت بزن." },
      tense: "گذشته است، حالا یا آینده؟", tenses: { past: "گذشته", now: "حالا", future: "آینده" }, person: "هر کس را با فعلش جفت کن." },
    make: function (rng, n, ctx) {
      var kinds = ["noun"].concat(ctx.done("read-sapling-65") ? ["verb"] : [], ctx.done("read-sapling-66") ? ["adj"] : []);
      function sort() {
        var items = [];
        kinds.forEach(function (k) { rng.sample(CLASS[k], kinds.length > 1 ? 2 : 3).forEach(function (w) { items.push({ label: w, basket: k }); }); });
        return { type: "sort", key: "sort-" + kinds.join(), prompt: ctx.w("sort"), baskets: kinds.map(function (k) { return { label: ctx.w("names")[k], value: k }; }), items: rng.shuffle(items) };
      }
      var marks = MARK.filter(function (m) { return kinds.indexOf(m.kind) !== -1; });
      function mark(m) { return { type: "mark", key: m.t, prompt: ctx.w("mark")[m.kind], text: m.t, answer: m.a }; }
      return G.collect(rng, n, ctx.again, [
        { ok: kinds.length > 1, make: sort },
        { ok: true, make: function () { return mark(rng.pick(marks)); }, byKey: function (k) { var m = marks.find(function (x) { return x.t === k; }); return m && mark(m); } },
        { ok: ctx.done("read-sapling-67"), make: function () {
          var three = rng.sample(TENSE, 6);
          return { type: "sort", key: "tense-" + three.map(function (t) { return t[0]; }).join(), prompt: ctx.w("tense"),
            baskets: ["past", "now", "future"].map(function (k) { return { label: ctx.w("tenses")[k], value: k }; }), items: three.map(function (t) { return { label: t[0], basket: t[1] }; }) };
        } },
        { ok: ctx.done("read-sapling-68"), make: function () { var p = rng.sample(PERSON, 4); return { type: "pairs", key: "person-" + p.map(function (x) { return x[0]; }).join(), prompt: ctx.w("person"), pairs: p.map(function (x) { return [x[0], x[1]]; }) }; } }
      ]);
    }
  });

  /* read-sapling-p9 «بنویسیم»: a writing task on paper with a model and a short checklist for the grown-up; the kinds
     grow with the lessons (sentences, a paragraph, a story, a letter, a diary entry, an opinion, an information text). */
  var PROMPTS = [
    { k: "picture", after: "read-sapling-52", text: "یک تصویر یا عکس انتخاب کن و درباره‌اش سه جمله بنویس: چه کسی؟ کجا؟ چه کار می‌کند؟", ex: "در عکس، پدربزرگ در باغ است. او سیب می‌چیند. هوا آفتابی است.", check: ["گفت چه کسی، کجا و چه کار؟", "هر جمله با نقطه تمام شد؟"] },
    { k: "answer", after: "read-sapling-50", text: "به این سؤال با یک جمله کامل جواب بده: «دیروز چه کار کردی؟»", ex: "من دیروز با برادرم به پارک رفتم.", check: ["جواب یک جمله کامل بود؟", "با نقطه تمام شد؟"] },
    { k: "para", after: "read-sapling-74", text: "یک بند درباره حیوان مورد علاقه‌ات بنویس: جمله اول بگوید درباره چیست، بعد سه جمله دیگر.", ex: "گربه ما خیلی بازیگوش است. صبح‌ها دنبال توپ می‌دود. ظهرها با کاموا بازی می‌کند. شب‌ها کنار بخاری می‌خوابد.", check: ["جمله اول گفت بند درباره چیست؟", "جمله‌های بعدی درباره همان بودند؟"] },
    { k: "story", after: "read-sapling-75", text: "یک قصه کوتاه بنویس که اول، وسط و آخر داشته باشد.", ex: "مینا یک دانه کاشت. دانه بزرگ شد و یک گل زرد شد. پرنده‌ها آمدند و از دانه‌هایش خوردند.", check: ["قصه اول، وسط و آخر داشت؟", "قهرمان قصه اسم داشت؟"] },
    { k: "letter", after: "read-sapling-76", text: "یک نامه کوتاه برای یکی از خانواده‌ات بنویس.", ex: "سلام خاله جان،\nامروز یک کتاب درباره دلفین‌ها خواندم. دوستت دارم.\nسینا", check: ["با سلام شروع کرد؟", "در آخر اسمش را نوشت؟"] },
    { k: "diary", after: "read-sapling-77", text: "در دفتر خاطراتت بنویس: تاریخ، چه اتفاقی افتاد و چه حسی داشتی.", ex: "سه‌شنبه\nامروز با خواهرم کیک پختیم. کیک خوشمزه شد. خیلی شاد بودم.", check: ["تاریخ را نوشت؟", "گفت چه حسی داشت؟"] },
    { k: "opinion", after: "read-sapling-86", text: "نظرت را بنویس: کدام فصل را بیشتر دوست داری؟ چرا؟", ex: "من بهار را بیشتر دوست دارم، چون گل‌ها باز می‌شوند. پس بهار بهترین فصل است.", check: ["نظرش را گفت؟", "دلیلی با «چون» آورد؟", "یک جمله پایانی نوشت؟"] },
    { k: "info", after: "read-sapling-87", text: "درباره یک میوه بنویس: یک جمله که بگوید درباره چیست، سه واقعیت، و یک جمله پایانی.", ex: "انار میوه پاییز است. دانه‌های قرمز زیادی دارد. پوستش سفت است. در ایران انار زیاد کاشته می‌شود. انار میوه خوشمزه‌ای است.", check: ["جمله اول گفت درباره چیست؟", "سه واقعیت نوشت؟", "یک جمله پایانی داشت؟"] }
  ];
  B.PRACTICE.push({
    id: "read-sapling-p9", subject: "read", level: "sapling", objectives: ["read.sap.25", "read.sap.26", "read.sap.27", "read.sap.28"],
    needs: ["read-sapling-50"], emoji: "✏️", title: "بنویسیم",
    words: {},
    make: function (rng, n, ctx) {
      var open = PROMPTS.filter(function (p) { return ctx.done(p.after); });
      return rng.sample(open, Math.min(n, 2)).map(function (p) { return { type: "paper", key: p.k, lang: "fa", text: p.text, example: p.ex, check: p.check }; });
    }
  });
})();

/* ---------------- More Seed practice: each lesson's set mixes at least three different kinds ---------------- */
(function () {
  var G = B.readGen;
  var P = function (x) { return { label: x[0], value: x[1] }; };
  // One kind of item chosen from a bank (missed keys first): the simplest generator.
  function bank(rng, n, ctx, list, keyOf, make) {
    return G.collect(rng, n, ctx.again, [{ ok: list.length > 0, make: function () { return make(rng.pick(list)); },
      byKey: function (k) { var x = list.find(function (y) { return keyOf(y) === k; }); return x && make(x); } }]);
  }
  function choosePics(rng, prompt, say, ans, others, key, extra) {
    return Object.assign({ type: "choose", key: key, prompt: prompt, say: say, pic: true,
      options: rng.shuffle([P(ans)].concat(rng.sample(others, 2).map(P))), answer: ans[1] }, extra || {});
  }

  /* read-seed-p7 «کدام شبیه است؟»: the same shape (then a letter's shape) among others that differ in one detail. */
  var LOOK = [["▲", "●", "■"], ["⭐", "🌙", "☀️"], ["🔺", "🔷", "🟡"], ["⬆️", "⬇️", "⬅️"], ["🟥", "🟦", "🟨"], ["🍎", "🍏", "🍅"], ["🐟", "🐠", "🐬"]];
  var LETTERS = [["ب", "ن", "ت"], ["م", "ه", "و"], ["س", "ش", "ص"], ["د", "ر", "ز"], ["ج", "چ", "خ"], ["آ", "ا", "ل"], ["ف", "ق", "غ"]];
  B.PRACTICE.push({
    id: "read-seed-p7", subject: "read", level: "seed", objectives: ["read.seed.1"],
    needs: ["read-seed-1"], emoji: "🔍", title: "کدام شبیه است؟",
    words: { ask: "کدام شبیه این است؟", say: "به این خوب نگاه کن. کدام درست شبیه آن است؟" },
    make: function (rng, n, ctx) {
      var all = LOOK.map(function (g) { return { g: g, letters: false }; }).concat(LETTERS.map(function (g) { return { g: g, letters: true }; }));
      return bank(rng, n, ctx, all, function (x) { return x.g[0] + (x.letters ? "L" : ""); }, function (x) {
        var t = rng.pick(x.g);
        return { type: "choose", key: x.g[0] + (x.letters ? "L" : ""), show: t, prompt: ctx.w("ask"), say: ctx.w("say"), pic: true, options: rng.shuffle(x.g), answer: t };
      });
    }
  });

  /* read-seed-p8 «کارت‌های جفت»: memory games: two cards the same; later things and their opposites. */
  var CARDS = ["🐈", "🌳", "☀️", "🍎", "🐟", "⭐", "🚗", "🌸", "🧺", "⚽", "🌙", "🐑"];
  var OPP = [["🐘", "فیل بزرگ", "🐭", "موش کوچک"], ["🔥", "آتش گرم", "🧊", "یخ سرد"], ["🐆", "یوزپلنگ تند", "🐢", "لاک‌پشت آرام"], ["🥛", "لیوان پر", "🍽️", "بشقاب خالی"], ["☀️", "روز", "🌙", "شب"]];
  B.PRACTICE.push({
    id: "read-seed-p8", subject: "read", level: "seed", objectives: ["read.seed.21", "read.seed.4"],
    needs: ["read-seed-1"], emoji: "🎴", title: "کارت‌های جفت",
    words: { same: "کارت‌ها را برگردان و دو کارت مثل هم را پیدا کن.", opp: "کارت‌ها را برگردان و بشنو. هر کدام را با برعکسش جفت کن." },
    make: function (rng, n, ctx) {
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        if (ctx.done("read-seed-13") && i === 1) {
          var o = rng.sample(OPP, 3);
          out.push({ type: "pairs", key: "opp" + i, hidden: true, prompt: ctx.w("opp"), say: ctx.w("opp"), pairs: o.map(function (x) { return [{ pic: x[0], say: x[1] }, { pic: x[2], say: x[3] }]; }) });
        } else {
          var c = rng.sample(CARDS, 3 + i);
          out.push({ type: "pairs", key: "same" + i, hidden: true, prompt: ctx.w("same"), say: ctx.w("same"), pairs: c.map(function (x) { return [x, x]; }) });
        }
      }
      return out;
    }
  });

  /* read-seed-p9 «بعدی کدام است؟»: patterns to continue, and growing things put in order. */
  var PAT = [["🔴", "🔵"], ["🍎", "🍌"], ["⭐", "🌙"], ["🐈", "🐕"], ["🔺", "🟦", "🟡"], ["☀️", "☁️", "🌧️"]];
  var GROW = [["🥚", "🐣", "🐥", "🐔"], ["🌰", "🌱", "🌿", "🌳"], ["🐛", "🦋"], ["☀️", "☁️", "🌧️", "🌈"], ["🍞", "🍞🧀", "😋"]];
  B.PRACTICE.push({
    id: "read-seed-p9", subject: "read", level: "seed", objectives: ["read.seed.21"],
    needs: ["read-seed-1"], emoji: "🧩", title: "بعدی کدام است؟",
    words: { next: "بعدی کدام است؟", order: "اول کدام بود؟ بعد؟ به ترتیب بچین." },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () {
          var p = rng.pick(PAT), seq = [];
          for (var i = 0; i < 6; i++) seq.push(p[i % p.length]);
          var extra = ["🟢", "🍇", "🐸"].find(function (e) { return p.indexOf(e) === -1; });
          return { type: "pattern", key: "pat" + p.join(""), prompt: ctx.w("next"), say: ctx.w("next"), seq: seq, options: p.concat([extra]) };
        } },
        { ok: true, make: function () { var g = rng.pick(GROW.filter(function (x) { return x.length > 2; })); return { type: "order", key: "grow" + g[0], prompt: ctx.w("order"), say: ctx.w("order"), numbered: true, items: g.slice() }; } }
      ]);
    }
  });

  /* read-seed-p10 «این صدای کیست؟»: everyday sounds and animal voices heard, the picture that makes them found. */
  var SOUNDS = [["میو میو", ["🐈", "گربه"]], ["هاپ هاپ", ["🐕", "سگ"]], ["قوقولی‌قوقو", ["🐓", "خروس"]], ["بع بع", ["🐑", "گوسفند"]], ["ماااا", ["🐄", "گاو"]],
    ["قور قور", ["🐸", "قورباغه"]], ["جیک جیک", ["🐦", "گنجشک"]], ["تیک‌تاک", ["⏰", "ساعت"]], ["دینگ دینگ", ["🔔", "زنگ"]], ["بوق بوق", ["🚗", "ماشین"]],
    ["شُرشُر", ["🌧️", "باران"]], ["وز وز", ["🐝", "زنبور"]]];
  B.PRACTICE.push({
    id: "read-seed-p10", subject: "read", level: "seed", objectives: ["read.seed.9"],
    needs: ["read-seed-11"], emoji: "🔔", title: "این صدای کیست؟",
    words: { ask: "این صدای کیست؟", say: "گوش بده: {s}! این صدای کیست؟" },
    make: function (rng, n, ctx) {
      var all = SOUNDS.map(function (s) { return s[1]; });
      return bank(rng, n, ctx, SOUNDS, function (s) { return s[0]; }, function (s) {
        return choosePics(rng, ctx.w("ask"), ctx.w("say", { s: s[0] }), s[1], all.filter(function (y) { return y !== s[1]; }), s[0]);
      });
    }
  });

  /* read-seed-p11 «گوش کن و جواب بده»: a little scene heard, then who / where / what / why. */
  var MINI = [
    { k: "ball", say: "سارا در حیاط توپ‌بازی می‌کند.", q: "چه کسی توپ‌بازی می‌کند؟", a: ["👧", "سارا"], o: [["👴", "پدربزرگ"], ["🐈", "گربه"]] },
    { k: "cat", say: "گربه زیر میز خوابیده است.", q: "گربه کجا خوابیده؟", a: ["🪑", "زیر میز"], o: [["🌳", "روی درخت"], ["🛏️", "روی تخت"]] },
    { k: "gran", say: "مادربزرگ در آشپزخانه آش می‌پزد.", q: "مادربزرگ چه کار می‌کند؟", a: ["🍲", "آش می‌پزد"], o: [["📖", "کتاب می‌خواند"], ["🧹", "جارو می‌کند"]] },
    { k: "umbrella", say: "باران می‌آید. کاوه چترش را باز کرد.", q: "چرا کاوه چترش را باز کرد؟", a: ["🌧️", "باران می‌آمد"], o: [["☀️", "آفتاب بود"], ["🌙", "شب بود"]] },
    { k: "baker", say: "نانوا صبح زود نان می‌پزد.", q: "چه کسی نان می‌پزد؟", a: ["🧑‍🍳", "نانوا"], o: [["👩‍⚕️", "پزشک"], ["🧑‍🌾", "کشاورز"]] },
    { k: "duck", say: "اردک‌ها در حوض شنا می‌کنند.", q: "اردک‌ها کجا شنا می‌کنند؟", a: ["🌊", "در حوض"], o: [["🏠", "در خانه"], ["🌳", "روی درخت"]] },
    { k: "coat", say: "هوا سرد است. مینا کاپشنش را پوشید.", q: "چرا مینا کاپشن پوشید؟", a: ["❄️", "هوا سرد بود"], o: [["☀️", "هوا گرم بود"], ["🍎", "گرسنه بود"]] },
    { k: "dog", say: "سگ دنبال توپ دوید.", q: "سگ دنبال چه دوید؟", a: ["⚽", "توپ"], o: [["🐈", "گربه"], ["🍖", "استخوان"]] },
    { k: "milk", say: "آرش تشنه بود. یک لیوان شیر خورد.", q: "آرش چه خورد؟", a: ["🥛", "شیر"], o: [["🍎", "سیب"], ["🍞", "نان"]] },
    { k: "park", say: "بابا و نیما به پارک رفتند و سرسره بازی کردند.", q: "آن‌ها کجا رفتند؟", a: ["🛝", "پارک"], o: [["🏫", "مدرسه"], ["🏥", "بیمارستان"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p11", subject: "read", level: "seed", objectives: ["read.seed.6", "read.seed.2"],
    needs: ["read-seed-2"], emoji: "❓", title: "گوش کن و جواب بده",
    words: { say: "گوش کن: {s} {q}" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, MINI, function (x) { return x.k; }, function (x) {
        return { type: "choose", key: x.k, prompt: x.q, say: ctx.w("say", { s: x.say, q: x.q }), pic: true, options: rng.shuffle([x.a].concat(x.o)).map(P), answer: x.a[1] };
      });
    }
  });

  /* read-seed-p12 «در تصویر پیدا کن»: a picture made of things; which of these is in it? */
  var SCENES = ["🏡 🌳 👧 🐈 ☀️", "🧺 🍎 🍊 🍇 👵", "🌳 🛝 👦 🐕 🎈", "🍳 🫖 🍞 🧀 👩", "🏖️ 🌊 ⛵ 🦀 👧", "❄️ ⛄ 👦 🧣 🏔️", "🌙 ⭐ 🏠 🛏️ 📖", "🌾 🐄 🐑 🧑‍🌾 🏡", "🌷 🐝 🦋 🪣 🧒"];
  var NOT = ["🚗", "🐘", "🍕", "🎸", "🚀", "🦒", "🍉", "🚂", "🐧", "🌵"];
  B.PRACTICE.push({
    id: "read-seed-p12", subject: "read", level: "seed", objectives: ["read.seed.2", "read.seed.3"],
    needs: ["read-seed-2"], emoji: "🔎", title: "در تصویر پیدا کن",
    words: { ask: "خوب نگاه کن. کدام در این تصویر هست؟" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, SCENES, function (s) { return s; }, function (s) {
        var inside = rng.pick(s.split(" "));
        return { type: "choose", key: s, show: s, prompt: ctx.w("ask"), say: ctx.w("ask"), pic: true,
          options: rng.shuffle([inside].concat(rng.sample(NOT, 2))), answer: inside };
      });
    }
  });

  /* read-seed-p13 «کدام جور نیست؟»: three of a group and one that does not belong; later, opposites. */
  var KIND = [["🍎", "🍌", "🍇", "🐈"], ["🐄", "🐑", "🐓", "🍐"], ["🧦", "🧢", "🧥", "🪑"], ["🪑", "🛏️", "🚪", "🐟"], ["👂", "👃", "👁️", "🧀"], ["🚗", "🚌", "🚂", "🌸"], ["🌸", "🌷", "🌻", "⚽"]];
  var TEMP = [["🔥", "☀️", "☕", "⛄"], ["🧊", "❄️", "⛄", "🔥"], ["🐘", "🦒", "🐻", "🐭"]];
  B.PRACTICE.push({
    id: "read-seed-p13", subject: "read", level: "seed", objectives: ["read.seed.3", "read.seed.4"],
    needs: ["read-seed-12"], emoji: "🙃", title: "کدام جور نیست؟",
    words: { ask: "کدام با بقیه جور نیست؟", say: "به این چهار تصویر نگاه کن. کدام با بقیه جور نیست؟" },
    make: function (rng, n, ctx) {
      var list = KIND.concat(ctx.done("read-seed-13") ? TEMP : []);
      return bank(rng, n, ctx, list, function (g) { return g.join(""); }, function (g) {
        return { type: "choose", key: g.join(""), prompt: ctx.w("ask"), say: ctx.w("say"), pic: true, options: rng.shuffle(g), answer: g[3] };
      });
    }
  });

  /* read-seed-p14 «گوش کن و انجام بده»: a two- or three-step instruction heard; what first, what next, what last. */
  var DO = [
    { k: "book", say: "کتابت را بردار و به بابا بده.", steps: [["📖", "کتاب را برمی‌دارم"], ["👨", "به بابا می‌دهم"]] },
    { k: "spoon", say: "قاشق را بیاور و روی سفره بگذار.", steps: [["🥄", "قاشق را می‌آورم"], ["🍽️", "روی سفره می‌گذارم"]] },
    { k: "ball", say: "توپ را بردار، در سبد بگذار و در را ببند.", steps: [["⚽", "توپ را برمی‌دارم"], ["🧺", "در سبد می‌گذارم"], ["🚪", "در را می‌بندم"]] },
    { k: "hands", say: "شیر آب را باز کن، دست‌هایت را با صابون بشوی و بعد سر سفره بیا.", steps: [["🚰", "شیر آب را باز می‌کنم"], ["🧼", "با صابون می‌شویم"], ["🍽️", "سر سفره می‌آیم"]] },
    { k: "shoes", say: "کفش‌هایت را بپوش و کلاهت را سرت بگذار.", steps: [["👟", "کفش می‌پوشم"], ["🧢", "کلاه می‌گذارم"]] },
    { k: "bed", say: "مسواک بزن، کتاب قصه‌ات را بیاور و به تختت برو.", steps: [["🪥", "مسواک می‌زنم"], ["📖", "کتاب را می‌آورم"], ["🛏️", "به تخت می‌روم"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p14", subject: "read", level: "seed", objectives: ["read.seed.5"],
    needs: ["read-seed-14"], emoji: "👂", title: "گوش کن و انجام بده",
    words: { first: "اول چه کار می‌کنی؟", last: "آخر از همه چه کار می‌کنی؟", say: "گوش کن: {s} {q}" },
    make: function (rng, n, ctx) {
      var items = []; DO.forEach(function (d) { items.push({ d: d, q: "first" }, { d: d, q: "last" }); });
      return bank(rng, n, ctx, items, function (x) { return x.d.k + x.q; }, function (x) {
        var a = x.q === "first" ? x.d.steps[0] : x.d.steps[x.d.steps.length - 1];
        var others = x.d.steps.filter(function (s) { return s !== a; });
        if (others.length < 2) others = others.concat([["🧸", "عروسک‌بازی می‌کنم"]]);
        return { type: "choose", key: x.d.k + x.q, prompt: ctx.w(x.q), say: ctx.w("say", { s: x.d.say, q: ctx.w(x.q) }), pic: true,
          options: rng.shuffle([a].concat(others)).map(P), answer: a[1] };
      });
    }
  });

  /* read-seed-p15 «به ترتیب بچین»: what the voice said, a morning, a story: put the pictures in order. */
  var SEQ = [
    { k: "morning", say: "صبح: اول از خواب بیدار می‌شویم، بعد دست و صورت را می‌شوییم، بعد صبحانه می‌خوریم.", items: [["🛏️", "بیدار می‌شویم"], ["🧼", "می‌شوییم"], ["🍞", "صبحانه می‌خوریم"]] },
    { k: "night", say: "شب: اول شام می‌خوریم، بعد مسواک می‌زنیم، بعد می‌خوابیم.", items: [["🍲", "شام"], ["🪥", "مسواک"], ["🛌", "خواب"]] },
    { k: "park", say: "کفش پوشیدیم، تا پارک راه رفتیم، سرسره بازی کردیم و به خانه برگشتیم.", items: [["👟", "کفش"], ["🚶", "راه رفتیم"], ["🛝", "سرسره"], ["🏠", "خانه"]] },
    { k: "bakery", say: "به نانوایی رفتیم، نان گرم خریدیم و سر سفره خوردیم.", items: [["🏪", "نانوایی"], ["🫓", "نان"], ["😋", "خوردیم"]] },
    { k: "tea", say: "آب را در کتری ریختیم، روی اجاق گذاشتیم و چای دم کردیم.", items: [["🚰", "آب"], ["🔥", "اجاق"], ["☕", "چای"]] },
    { k: "snow", say: "برف بارید، آدم‌برفی ساختیم، خورشید درآمد و آدم‌برفی آب شد.", items: [["❄️", "برف"], ["⛄", "آدم‌برفی"], ["☀️", "خورشید"], ["💧", "آب شد"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p15", subject: "read", level: "seed", objectives: ["read.seed.5", "read.seed.7"],
    needs: ["read-seed-14"], emoji: "🔢", title: "به ترتیب بچین",
    words: { ask: "گوش کن و به همان ترتیب بچین.", say: "گوش کن: {s} حالا به همان ترتیب بچین." },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, SEQ, function (x) { return x.k; }, function (x) {
        return { type: "order", key: x.k, prompt: ctx.w("ask"), say: ctx.w("say", { s: x.say }), numbered: true, items: x.items.map(function (i) { return { pic: i[0], say: i[1] }; }) };
      });
    }
  });

  /* read-seed-p16 «اول کدام بود؟»: two moments of a story or a day; which came first (or last)? */
  var PAIRS2 = [["🥚", "🐥"], ["🌰", "🌳"], ["🌧️", "🌈"], ["🛏️", "🍞"], ["⛄", "💧"], ["🍳", "😋"], ["🛒", "🧺"], ["🐛", "🦋"], ["🪁", "🌳"], ["🎃", "🏡"]];
  B.PRACTICE.push({
    id: "read-seed-p16", subject: "read", level: "seed", objectives: ["read.seed.7", "read.seed.8"],
    needs: ["read-seed-17"], emoji: "⏮️", title: "اول کدام بود؟",
    words: { first: "کدام اول بود؟", last: "کدام بعد بود؟" },
    make: function (rng, n, ctx) {
      var items = []; PAIRS2.forEach(function (p) { if (p[0] !== "🎃" || ctx.done("read-seed-23")) items.push({ p: p, q: "first" }, { p: p, q: "last" }); });
      return bank(rng, n, ctx, items, function (x) { return x.p.join("") + x.q; }, function (x) {
        return { type: "choose", key: x.p.join("") + x.q, prompt: ctx.w(x.q), say: ctx.w(x.q), pic: true, options: rng.shuffle(x.p), answer: x.q === "first" ? x.p[0] : x.p[1] };
      });
    }
  });

  /* read-seed-p17 «چه حسی داشت؟»: a moment heard; how did the child (or animal) feel? */
  var FEEL = [
    { k: "kite", say: "بادبادک آرش روی درخت گیر کرد.", a: ["😢", "ناراحت"] }, { k: "gift", say: "مادربزرگ برای ترانه یک عروسک آورد.", a: ["😄", "خوشحال"] },
    { k: "tower", say: "برادر کوچک رضا برجش را خراب کرد.", a: ["😠", "عصبانی"] }, { k: "late", say: "ساعت نه شب بود و نیلوفر خمیازه کشید.", a: ["😴", "خواب‌آلود"] },
    { k: "lost", say: "گربه علی گم شده بود و پیدا نمی‌شد.", a: ["😟", "نگران"] }, { k: "found", say: "علی گربه‌اش را توی سبد پیدا کرد.", a: ["😄", "خوشحال"] },
    { k: "rainbow", say: "باران بند آمد و رنگین‌کمان پیدا شد. ترانه خندید.", a: ["😄", "خوشحال"] }, { k: "icecream", say: "بستنی سارا روی زمین افتاد.", a: ["😢", "ناراحت"] }
  ];
  var FACES = [["😄", "خوشحال"], ["😢", "ناراحت"], ["😠", "عصبانی"], ["😴", "خواب‌آلود"], ["😟", "نگران"]];
  B.PRACTICE.push({
    id: "read-seed-p17", subject: "read", level: "seed", objectives: ["read.seed.8"],
    needs: ["read-seed-16"], emoji: "😊", title: "چه حسی داشت؟",
    words: { ask: "چه حسی داشت؟", say: "گوش کن: {s} چه حسی داشت؟" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, FEEL, function (x) { return x.k; }, function (x) {
        return choosePics(rng, ctx.w("ask"), ctx.w("say", { s: x.say }), x.a, FACES.filter(function (f) { return f[1] !== x.a[1]; }), x.k);
      });
    }
  });

  /* read-seed-p18 «کتاب و نوشته»: writing or picture; where reading starts; what a sign by a shop might say. */
  var WRITE = [["🐈", "گربه"], ["🍎", "سیب"], ["🌳", "درخت"], ["🐟", "ماهی"], ["⚽", "توپ"]];
  var SIGNS = [{ k: "bakery", say: "این تابلو بالای در یک مغازه است. بوی نان تازه می‌آید.", a: ["🫓", "نانوایی"], o: [["🐟", "ماهی‌فروشی"], ["🧸", "اسباب‌بازی"]] },
    { k: "pharmacy", say: "این تابلو روی مغازه‌ای است که دارو می‌فروشد.", a: ["💊", "داروخانه"], o: [["🍞", "نانوایی"], ["⚽", "توپ"]] },
    { k: "school", say: "این را بالای در ساختمانی نوشته‌اند که بچه‌ها صبح با کیف به آن‌جا می‌روند.", a: ["🏫", "مدرسه"], o: [["🏥", "بیمارستان"], ["🌊", "دریا"]] },
    { k: "fruit", say: "این تابلو روی مغازه‌ای است پر از سیب و پرتقال و انار.", a: ["🍎", "میوه‌فروشی"], o: [["🧱", "مصالح"], ["📚", "کتاب‌فروشی"]] },
    { k: "milk", say: "این نوشته روی جعبه‌ای است در یخچال که از آن یک چیز سفید می‌نوشیم.", a: ["🥛", "شیر"], o: [["🍊", "آب پرتقال"], ["🧀", "پنیر"]] }];
  B.PRACTICE.push({
    id: "read-seed-p18", subject: "read", level: "seed", objectives: ["read.seed.15", "read.seed.16"],
    needs: ["read-seed-8"], emoji: "📖", title: "کتاب و نوشته",
    words: { which: "کدام نوشته است؟", whichSay: "یکی نوشته است و بقیه تصویر. کدام نوشته است؟", dir: "در کتاب فارسی، از کدام طرف شروع به خواندن می‌کنیم؟",
      dirSay: "در کتاب فارسی، از کدام طرف شروع می‌کنیم؟ فلش جهت خواندن را نشان می‌دهد.", sign: "فکر می‌کنی چه نوشته؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () {
          var w = rng.pick(WRITE), pics = rng.sample(WRITE.filter(function (x) { return x !== w; }), 2);
          return { type: "choose", key: "w" + w[1], prompt: ctx.w("which"), say: ctx.w("whichSay"), pic: true,
            options: rng.shuffle([{ label: w[1], value: "word" }].concat(pics.map(function (p) { return { label: p[0], value: p[1] }; }))), answer: "word" };
        } },
        { ok: true, make: function () { return { type: "choose", key: "dir", prompt: ctx.w("dir"), say: ctx.w("dirSay"), pic: true, options: rng.shuffle([{ label: "⬅️", value: "right" }, { label: "➡️", value: "left" }]), answer: "right" }; } },
        { ok: ctx.done("read-seed-25"), make: function () {
          var s = rng.pick(SIGNS);
          return { type: "choose", key: s.k, show: "🪧", prompt: ctx.w("sign"), say: s.say + " " + ctx.w("sign"), pic: true, options: rng.shuffle([s.a].concat(s.o)).map(P), answer: s.a[1] };
        } }
      ]);
    }
  });

  /* read-seed-p19 «صداها را جدا کن»: picture words sorted by ear: rhyme, number of claps, first sound, last sound. */
  var RH = [[["🐭", "موش"], ["👂", "گوش"], ["🐰", "خرگوش"]], [["🦁", "شیر"], ["🧀", "پنیر"], ["🧄", "سیر"]], [["🐍", "مار"], ["🥒", "خیار"]], [["🌙", "ماه"], ["🧢", "کلاه"]], [["🌸", "گل"], ["🌉", "پل"]]];
  var CL = { 1: [["⚽", "توپ"], ["🍎", "سیب"], ["🐭", "موش"], ["🌙", "ماه"]], 2: [["🐟", "ماهی"], ["🐈", "گربه"], ["🚗", "ماشین"], ["👨", "بابا"]], 3: [["🦋", "پروانه"], ["🦒", "زرافه"], ["⭐", "ستاره"]] };
  var FS = { "م": [["🐟", "ماهی"], ["🐭", "موش"], ["🍌", "موز"]], "س": [["🍎", "سیب"], ["🧺", "سبد"], ["⭐", "ستاره"]], "ب": [["🌧️", "باران"], ["🐑", "بره"], ["🍆", "بادمجان"]], "د": [["🚪", "در"], ["✋", "دست"], ["🌊", "دریا"]] };
  var LS = { "م": [["👁️", "چشم"], ["🥬", "کلم"], ["🖊️", "قلم"]], "س": [["🐓", "خروس"], ["🚌", "اتوبوس"], ["👕", "لباس"]], "ر": [["🐍", "مار"], ["🥒", "خیار"], ["🧀", "پنیر"]], "ت": [["✋", "دست"], ["🛏️", "تخت"], ["🌳", "درخت"]] };
  function sortOf(rng, prompt, groups, key) {
    var items = [];
    groups.forEach(function (g, i) { rng.sample(g.items.slice(1), Math.min(3, g.items.length - 1)).forEach(function (x) { items.push({ pic: x[0], say: x[1], basket: String(i) }); }); });
    return { type: "sort", key: key, prompt: prompt, say: prompt, baskets: groups.map(function (g, i) { return { pic: g.icon || g.items[0][0], label: g.label, value: String(i), say: g.items[0][1] }; }), items: rng.shuffle(items) };
  }
  B.PRACTICE.push({
    id: "read-seed-p19", subject: "read", level: "seed", objectives: ["read.seed.10", "read.seed.11", "read.seed.12", "read.seed.13"],
    needs: ["read-seed-4"], emoji: "🧺", title: "صداها را جدا کن",
    words: { rhyme: "روی هر تصویر بزن و بشنو. هر کدام با کدام هم‌قافیه است؟", claps: "روی هر تصویر بزن و بشنو. چند بار دست می‌زنی؟",
      first: "روی هر تصویر بزن و بشنو. اولش مثل کدام است؟", last: "روی هر تصویر بزن و بشنو. آخرش مثل کدام است؟" },
    make: function (rng, n, ctx) {
      function two(table) { return rng.sample(Object.keys(table), 2); }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var g = rng.sample(RH.filter(function (r) { return r.length > 2; }), 2); return sortOf(rng, ctx.w("rhyme"), g.map(function (r) { return { items: r }; }), "rh" + g[0][0][1] + g[1][0][1]); } },
        { ok: ctx.done("read-seed-5"), make: function () { var ks = two(CL).sort(); return sortOf(rng, ctx.w("claps"), ks.map(function (k) { return { icon: "👏".repeat(+k), items: [["", ""]].concat(CL[k]) }; }), "cl" + ks.join("")); } },
        { ok: ctx.done("read-seed-6"), make: function () { var ks = two(FS); return sortOf(rng, ctx.w("first"), ks.map(function (k) { return { items: FS[k] }; }), "fs" + ks.join("")); } },
        { ok: ctx.done("read-seed-21"), make: function () { var ks = two(LS); return sortOf(rng, ctx.w("last"), ks.map(function (k) { return { items: LS[k] }; }), "ls" + ks.join("")); } }
      ]);
    }
  });

  /* read-seed-p20 «جفت صداها»: memory pairs by ear: a voice and who makes it, rhyming pictures, pictures that start
     alike, sounds that join into a word. */
  var BL = [["مو ... ش", ["🐭", "موش"]], ["تو ... پ", ["⚽", "توپ"]], ["ما ... هی", ["🐟", "ماهی"]], ["گُ ... ل", ["🌸", "گل"]], ["نا ... ن", ["🍞", "نان"]], ["ما ... ه", ["🌙", "ماه"]]];
  B.PRACTICE.push({
    id: "read-seed-p20", subject: "read", level: "seed", objectives: ["read.seed.9", "read.seed.10", "read.seed.12", "read.seed.14"],
    needs: ["read-seed-11"], emoji: "🃏", title: "جفت صداها",
    words: { voice: "کارت‌ها را برگردان و گوش بده. هر صدا را با صاحبش جفت کن.", rhyme: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را جفت کن.",
      first: "کارت‌ها را برگردان. دو تصویری را جفت کن که اولشان مثل هم است.", blend: "کارت‌ها را برگردان. تکه‌ها را بشنو و تصویرش را پیدا کن." },
    make: function (rng, n, ctx) {
      var c = function (x) { return { pic: x[0], say: x[1] }; };
      function deck(kind, list) { return { type: "pairs", key: kind + list.map(function (p) { return p[0].say; }).join(","), hidden: true, prompt: ctx.w(kind), say: ctx.w(kind), pairs: list }; }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return deck("voice", rng.sample(SOUNDS, 3).map(function (s) { return [{ pic: "🔊", say: s[0] }, c(s[1])]; })); } },
        { ok: ctx.done("read-seed-4"), make: function () { return deck("rhyme", rng.sample(RH, 3).map(function (r) { return [c(r[0]), c(r[1])]; })); } },
        { ok: ctx.done("read-seed-6"), make: function () { return deck("first", rng.sample(Object.keys(FS), 3).map(function (k) { var two = rng.sample(FS[k], 2); return [c(two[0]), c(two[1])]; })); } },
        { ok: ctx.done("read-seed-22"), make: function () { return deck("blend", rng.sample(BL, 3).map(function (b) { return [{ pic: "🔊", say: b[0] }, c(b[1])]; })); } }
      ]);
    }
  });

  /* read-seed-p21 «دست بزن»: clap a word's parts; later, clap the words of a short sentence (not scored). */
  var CLAPW = [["🦋", "پروانه", ["پَر", "وا", "نه"]], ["👨", "بابا", ["با", "با"]], ["⚽", "توپ", ["توپ"]], ["🦒", "زرافه", ["زَ", "را", "فه"]], ["🐈", "گربه", ["گُر", "به"]],
    ["🚗", "ماشین", ["ما", "شین"]], ["🍉", "هندوانه", ["هِن", "دِ", "وا", "نه"]], ["🌙", "ماه", ["ماه"]], ["⭐", "ستاره", ["سِ", "تا", "ره"]]];
  var CLAPS = [["سارا آمد", ["سارا", "آمد"]], ["بابا نان خرید", ["بابا", "نان", "خرید"]], ["گربه روی فرش خوابید", ["گربه", "روی", "فرش", "خوابید"]], ["من سیب دوست دارم", ["من", "سیب", "دوست", "دارم"]], ["ماه آمد", ["ماه", "آمد"]]];
  B.PRACTICE.push({
    id: "read-seed-p21", subject: "read", level: "seed", objectives: ["read.seed.11"],
    needs: ["read-seed-5"], emoji: "👏", title: "دست بزن",
    words: { word: "اسمش را بگو. با هر تکه یک بار دست بزن.", sentence: "این جمله را بشنو. برای هر کلمه یک بار دست بزن." },
    make: function (rng, n, ctx) {
      return G.collect(rng, Math.min(n, 4), ctx.again, [
        { ok: true, make: function () { var w = rng.pick(CLAPW); return { type: "clap", key: w[1], pic: w[0], word: w[1], parts: w[2], prompt: ctx.w("word") }; } },
        { ok: ctx.done("read-seed-20"), make: function () { var s = rng.pick(CLAPS); return { type: "clap", key: s[0], words: true, pic: "🗨️", word: s[0], parts: s[1], prompt: ctx.w("sentence"), say: s[0] }; } }
      ]);
    }
  });

  /* read-seed-p22 «از کجا شروع کنیم؟»: the way lines go: down, right to left, where a circle starts. */
  var WAY = [{ k: "rain", q: "باران را از کدام طرف می‌کشیم؟", a: ["⬇️", "از بالا به پایین"], o: [["⬆️", "از پایین به بالا"]] },
    { k: "write", q: "فارسی را از کدام طرف می‌نویسیم؟", a: ["⬅️", "از راست به چپ"], o: [["➡️", "از چپ به راست"]] },
    { k: "road", q: "خط راه را مثل نوشتن فارسی می‌کشیم. از کدام طرف؟", a: ["⬅️", "از راست به چپ"], o: [["➡️", "از چپ به راست"]] },
    { k: "line", q: "در دفتر، بعد از خط اول کجا می‌رویم؟", a: ["⬇️", "خط پایین"], o: [["⬆️", "خط بالا"]] },
    { k: "pencil", q: "مداد را با چند انگشت می‌گیریم؟", a: ["🤌", "سه انگشت"], o: [["✊", "همه انگشت‌ها"]], after: "read-seed-27" }];
  B.PRACTICE.push({
    id: "read-seed-p22", subject: "read", level: "seed", objectives: ["read.seed.17", "read.seed.15"],
    needs: ["read-seed-8"], emoji: "↩️", title: "از کجا شروع کنیم؟",
    words: {},
    make: function (rng, n, ctx) {
      var list = WAY.filter(function (w) { return !w.after || ctx.done(w.after); });
      return bank(rng, n, ctx, list, function (w) { return w.k; }, function (w) {
        return { type: "choose", key: w.k, prompt: w.q, say: w.q, pic: true, options: rng.shuffle([w.a].concat(w.o)).map(P), answer: w.a[1] };
      });
    }
  });

  /* read-seed-p23 «روی کاغذ»: a task on paper for the grown-up to tick: lines and shapes, then a drawing to tell about. */
  var PAPER = [{ k: "rows", text: "روی کاغذ یک ردیف باران، یک ردیف موج و یک ردیف کوه بکش.", check: ["از بالا یا از راست شروع کرد؟", "مداد را درست گرفته بود؟"] },
    { k: "sun", text: "یک خورشید گرد با پرتوهایش بکش و دور آن یک قاب بکش.", check: ["دایره را بست؟", "آرام و با دقت کشید؟"] },
    { k: "shapes", text: "یک ردیف کاسه، یک ردیف دندانه و چند حلقه با دم بکش.", check: ["شکل‌ها از راست به چپ رفتند؟", "هم‌اندازه بودند؟"], after: "read-seed-35" },
    { k: "story", text: "چیزی را که امروز اتفاق افتاد نقاشی کن. بعد برای بزرگ‌ترت تعریف کن تا زیرش بنویسد.", check: ["نقاشی کشید و درباره‌اش حرف زد؟", "جمله‌اش زیر نقاشی نوشته شد و با هم خواندید؟"], after: "read-seed-28" },
    { k: "find", text: "در خانه سه نوشته پیدا کن (روی جعبه، کتاب یا تابلو) و یکی را روی کاغذ بکش.", check: ["سه نوشته پیدا کرد؟", "پرسید هر کدام چه می‌گوید؟"], after: "read-seed-25" }];
  B.PRACTICE.push({
    id: "read-seed-p23", subject: "read", level: "seed", objectives: ["read.seed.17", "read.seed.18"],
    needs: ["read-seed-25"], emoji: "📄", title: "روی کاغذ",
    words: {},
    make: function (rng, n, ctx) {
      var list = PAPER.filter(function (p) { return !p.after || ctx.done(p.after); });
      return rng.sample(list, Math.min(n, 2)).map(function (p) { return { type: "paper", key: p.k, lang: "fa", text: p.text, check: p.check }; });
    }
  });

  /* read-seed-p24 «حرف اول»: the first sound of names, and (after the taste of letters) آ ب م found among others. */
  var NAMES = [["سارا", ["🍎", "سیب"]], ["مریم", ["🐟", "ماهی"]], ["بابک", ["🌧️", "باران"]], ["مینا", ["🐭", "موش"]], ["سینا", ["⭐", "ستاره"]], ["بهار", ["🐑", "بره"]], ["دارا", ["🚪", "در"]], ["تینا", ["⚽", "توپ"]]];
  var FIRSTS = NAMES.map(function (x) { return x[1]; });
  var LET = [["آ", "آب"], ["ب", "بابا"], ["م", "ماهی"]];
  B.PRACTICE.push({
    id: "read-seed-p24", subject: "read", level: "seed", objectives: ["read.seed.23", "read.seed.16", "read.seed.12"],
    needs: ["read-seed-25"], emoji: "🔤", title: "حرف اول",
    words: { name: "اسم «{name}» مثل کدام شروع می‌شود؟", nameSay: "{name}. اسم {name} مثل کدام شروع می‌شود؟", find: "«{l}» را پیدا کن. مثل اول «{w}».", findSay: "{l} را پیدا کن. مثل اول {w}." },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var x = rng.pick(NAMES); return choosePics(rng, ctx.w("name", { name: x[0] }), ctx.w("nameSay", { name: x[0] }), x[1], FIRSTS.filter(function (f) { return f !== x[1]; }), "n" + x[0]); } },
        { ok: ctx.done("read-seed-37"), make: function () {
          var l = rng.pick(LET), others = rng.sample(["ب", "م", "آ", "د", "س", "ن", "ر"].filter(function (c) { return c !== l[0]; }), 2);
          return { type: "choose", key: "l" + l[0], prompt: ctx.w("find", { l: l[0], w: l[1] }), say: ctx.w("findSay", { l: l[0], w: l[1] }), options: rng.shuffle([l[0]].concat(others)), answer: l[0] };
        } }
      ]);
    }
  });

  /* read-seed-p25 «شنیدیم، یاد گرفتیم»: a short fact heard (how a seed grows, where animals live); one question. */
  var FACTS = [
    { k: "seed", say: "دانه را در خاک می‌کاریم و به آن آب می‌دهیم. دانه ریشه می‌دهد و جوانه می‌زند.", q: "دانه برای سبز شدن به چه نیاز دارد؟", a: ["💧", "آب"], o: [["🍬", "آبنبات"], ["🧸", "عروسک"]] },
    { k: "nest", say: "پرنده با شاخه‌های کوچک روی درخت لانه می‌سازد.", q: "پرنده لانه‌اش را کجا می‌سازد؟", a: ["🌳", "روی درخت"], o: [["🌊", "در آب"], ["🏠", "زیر تخت"]] },
    { k: "fish", say: "ماهی در آب زندگی می‌کند و با باله‌هایش شنا می‌کند.", q: "ماهی کجا زندگی می‌کند؟", a: ["🌊", "در آب"], o: [["🌳", "روی درخت"], ["🏜️", "در بیابان"]] },
    { k: "bee", say: "زنبورها در کندو زندگی می‌کنند و از شهد گل‌ها عسل درست می‌کنند.", q: "زنبورها از چه عسل درست می‌کنند؟", a: ["🌸", "شهد گل‌ها"], o: [["🍞", "نان"], ["🥛", "شیر"]] },
    { k: "rabbit", say: "خرگوش زیر زمین لانه می‌کند و هویج دوست دارد.", q: "خرگوش کجا لانه می‌کند؟", a: ["🕳️", "زیر زمین"], o: [["🌳", "روی درخت"], ["🌊", "در آب"]] },
    { k: "sun", say: "خورشید به گیاه‌ها نور و گرما می‌دهد تا بزرگ شوند.", q: "گیاه‌ها از خورشید چه می‌گیرند؟", a: ["☀️", "نور و گرما"], o: [["🌧️", "برف"], ["🌙", "شب"]] }
  ];
  B.PRACTICE.push({
    id: "read-seed-p25", subject: "read", level: "seed", objectives: ["read.seed.22"],
    needs: ["read-seed-34"], emoji: "🌱", title: "شنیدیم، یاد گرفتیم",
    words: { say: "گوش کن: {s} {q}" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, FACTS, function (x) { return x.k; }, function (x) {
        return { type: "choose", key: x.k, prompt: x.q, say: ctx.w("say", { s: x.say, q: x.q }), pic: true, options: rng.shuffle([x.a].concat(x.o)).map(P), answer: x.a[1] };
      });
    }
  });
})();

/* ---------------- More Sprout practice ---------------- */
(function () {
  var G = B.readGen, ok = function (t, ctx) { return B.readable(t, ctx.letters); };
  var P = function (x) { return { label: x[0], value: x[1] }; };
  function bank(rng, n, ctx, list, keyOf, make) {
    return G.collect(rng, n, ctx.again, [{ ok: list.length > 0, make: function () { return make(rng.pick(list)); },
      byKey: function (k) { var x = list.find(function (y) { return keyOf(y) === k; }); return x && make(x); } }]);
  }
  // Letters the child can see as tiles and options: no vowel marks, no «و»/«ی» as consonant markers.
  function shownLetters(ctx) {
    var out = [];
    ctx.letters.replace(/[َُِّ ًVYءئ]/g, "").split("").forEach(function (c) { if (out.indexOf(c) === -1) out.push(c); });
    return out;
  }

  /* read-sprout-p8 «خانه‌های صدا»: sound boxes: a counter for each sound of a heard word (not scored). */
  var BOXW = [["🌬️", "باد", ["بـ", "آ", "د"]], ["🍎", "سیب", ["سـ", "ای", "ب"]], ["🐭", "موش", ["مـ", "او", "ش"]], ["💧", "آب", ["آ", "ب"]], ["🌙", "ماه", ["مـ", "آ", "ه"]],
    ["✋", "دست", ["دَ", "سْ", "تْ"]], ["🦁", "شیر", ["شـ", "ای", "ر"]], ["🍞", "نان", ["نـ", "آ", "ن"]], ["🦶", "پا", ["پـ", "آ"]], ["⚽", "توپ", ["تـ", "او", "پ"]]];
  B.PRACTICE.push({
    id: "read-sprout-p8", subject: "read", level: "sprout", objectives: ["read.spr.1"],
    needs: ["read-sprout-7"], emoji: "🔴", title: "خانه‌های صدا",
    words: {},
    make: function (rng, n, ctx) {
      return rng.sample(BOXW, Math.min(n, 3)).map(function (w) { return { type: "boxes", key: w[1], pic: w[0], word: w[1], parts: w[2] }; });
    }
  });

  /* read-sprout-p9 «صداها را جدا کن»: picture words sorted by how many sounds, or by where a sound is. */
  var NS = { 2: [["💧", "آب"], ["🦶", "پا"], ["🍲", "آش"]], 3: [["🌬️", "باد"], ["🍎", "سیب"], ["🌙", "ماه"], ["🐭", "موش"]], 4: [["✋", "دست"], ["🧺", "سبد"], ["🐍", "مار"]] };
  var POSN = { "س": { start: [["⭐", "ستاره"], ["🧺", "سبد"], ["🧄", "سیر"]], end: [["🐓", "خروس"], ["🚌", "اتوبوس"], ["👕", "لباس"]] },
    "م": { start: [["🐟", "ماهی"], ["🍌", "موز"], ["🚗", "ماشین"]], end: [["🌰", "بادام"], ["👁️", "چشم"], ["🥬", "کلم"]] },
    "ب": { start: [["🌧️", "باران"], ["🐑", "بره"], ["🍆", "بادمجان"]], end: [["🍎", "سیب"], ["💧", "آب"], ["📖", "کتاب"]] } };
  B.PRACTICE.push({
    id: "read-sprout-p9", subject: "read", level: "sprout", objectives: ["read.spr.1", "read.spr.2"],
    needs: ["read-sprout-7"], emoji: "🧺", title: "صداها را جدا کن",
    words: { count: "روی هر تصویر بزن و بشنو. چند صدا دارد؟", where: "روی هر تصویر بزن و بشنو. صدای «{s}» اول کلمه است یا آخر؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () {
          var ks = rng.sample(Object.keys(NS), 2).sort(), items = [];
          ks.forEach(function (k) { rng.sample(NS[k], 3).forEach(function (x) { items.push({ pic: x[0], say: x[1], basket: k }); }); });
          return { type: "sort", key: "n" + ks.join(""), prompt: ctx.w("count"), say: ctx.w("count"), baskets: ks.map(function (k) { return { label: "🔴".repeat(+k), value: k }; }), items: rng.shuffle(items) };
        } },
        { ok: ctx.done("read-sprout-8"), make: function () {
          var s = rng.pick(Object.keys(POSN)), items = [];
          ["start", "end"].forEach(function (p) { rng.sample(POSN[s][p], 3).forEach(function (x) { items.push({ pic: x[0], say: x[1], basket: p }); }); });
          return { type: "sort", key: "p" + s, prompt: ctx.w("where", { s: s }), say: ctx.w("where", { s: s }),
            baskets: [{ label: "🟥⬜⬜", value: "start" }, { label: "⬜⬜🟥", value: "end" }], items: rng.shuffle(items) };
        } }
      ]);
    }
  });

  /* read-sprout-p10 «یک صدا فرق دارد»: memory pairs of two pictures whose names differ in one sound. */
  var MINIMAL = [[["🍎", "سیب"], ["🧄", "سیر"]], [["🌙", "ماه"], ["🐍", "مار"]], [["🐭", "موش"], ["👂", "گوش"]], [["🦁", "شیر"], ["🧄", "سیر"]], [["✋", "دست"], ["👍", "شست"]],
    [["🍓", "توت"], ["⚽", "توپ"]], [["🌰", "بادام"], ["🌬️", "باد"]], [["🥩", "گوشت"], ["👂", "گوش"]], [["🍞", "نان"], ["🌙", "ماه"]]];
  B.PRACTICE.push({
    id: "read-sprout-p10", subject: "read", level: "sprout", objectives: ["read.spr.3"],
    needs: ["read-sprout-10"], emoji: "🔁", title: "یک صدا فرق دارد",
    words: { ask: "روی هر تصویر بزن و بشنو. دو تصویری را جفت کن که اسمشان فقط یک صدا فرق دارد." },
    make: function (rng, n, ctx) {
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var three = [], used = {};
        rng.shuffle(MINIMAL).forEach(function (m) { if (three.length < 3 && !used[m[0][1]] && !used[m[1][1]]) { used[m[0][1]] = used[m[1][1]] = true; three.push(m); } });
        out.push({ type: "pairs", key: "m" + i + three.map(function (m) { return m[0][1]; }).join(), prompt: ctx.w("ask"), say: ctx.w("ask"),
          pairs: three.map(function (m) { return [{ pic: m[0][0], say: m[0][1] }, { pic: m[1][0], say: m[1][1] }]; }) });
      }
      return out;
    }
  });

  /* read-sprout-p11 «چرا؟»: something that happened, heard; why did it happen? (explaining, causes). */
  var WHY = [
    { k: "ice", say: "بستنی بیرون زیر آفتاب ماند و آب شد.", a: ["☀️", "چون هوا گرم بود"], o: [["❄️", "چون هوا سرد بود"], ["🌙", "چون شب بود"]] },
    { k: "plant", say: "گلدان کنار پنجره بود و هر روز آب خورد. گیاه بزرگ شد.", a: ["💧", "چون آب و نور داشت"], o: [["🧸", "چون عروسک داشت"], ["🌑", "چون تاریک بود"]] },
    { k: "coat", say: "آرش کاپشن و شال‌گردنش را پوشید.", a: ["❄️", "چون هوا سرد بود"], o: [["☀️", "چون هوا گرم بود"], ["🛁", "چون حمام بود"]] },
    { k: "hands", say: "مینا پیش از غذا دست‌هایش را با صابون شست.", a: ["🦠", "تا میکروب‌ها بروند"], o: [["🎨", "تا رنگی شوند"], ["🧊", "تا سرد شوند"]] },
    { k: "umbrella", say: "بابا چترش را باز کرد.", a: ["🌧️", "چون باران می‌آمد"], o: [["☀️", "چون آفتابی بود"], ["⭐", "چون شب بود"]] },
    { k: "crow", say: "کلاغ سنگ‌ریزه‌ها را توی کوزه انداخت.", a: ["💧", "تا آب بالا بیاید"], o: [["🎶", "تا آواز بخواند"], ["🏠", "تا خانه بسازد"]] },
    { k: "sleep", say: "نیلوفر زود خوابید.", a: ["😴", "چون خسته بود"], o: [["🍎", "چون گرسنه بود"], ["⚽", "چون می‌خواست بازی کند"]] },
    { k: "tower", say: "برج رضا افتاد.", a: ["🐈", "چون گربه به آن خورد"], o: [["🌈", "چون رنگین‌کمان آمد"], ["🎵", "چون آواز خواند"]] }
  ];
  B.PRACTICE.push({
    id: "read-sprout-p11", subject: "read", level: "sprout", objectives: ["read.spr.17", "read.spr.14"],
    needs: ["read-sprout-17"], emoji: "🤔", title: "چرا؟",
    words: { ask: "چرا این‌طور شد؟", say: "گوش کن: {s} چرا؟" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, WHY, function (x) { return x.k; }, function (x) {
        return { type: "choose", key: x.k, prompt: ctx.w("ask"), say: ctx.w("say", { s: x.say }), pic: true, options: rng.shuffle([x.a].concat(x.o)).map(P), answer: x.a[1] };
      });
    }
  });

  /* read-sprout-p12 «حرف را پیدا کن»: a letter taught, heard and found among letters that look alike. */
  var LIKE = { "آ": ["ا", "ل", "ک"], "ا": ["آ", "ل", "د"], "ب": ["ن", "ت", "پ"], "د": ["ر", "ذ", "و"], "م": ["ه", "و", "ق"], "س": ["ش", "ص", "ب"],
    "و": ["ر", "د", "م"], "ت": ["ب", "ث", "ن"], "ر": ["ز", "د", "و"], "ی": ["ن", "ب", "پ"], "ن": ["ب", "ت", "ی"], "ز": ["ر", "ژ", "د"], "ش": ["س", "ص", "ث"], "ک": ["گ", "ل", "ق"] };
  var SAYL = { "آ": "آ، مثل آب", "ا": "الف", "ب": "ب، مثل بابا", "د": "د، مثل باد", "م": "م، مثل ماه", "س": "س، مثل سبد", "و": "او، مثل توت", "ت": "ت، مثل توت", "ر": "ر، مثل مار",
    "ی": "ای، مثل سیب", "ن": "ن، مثل نان", "ز": "ز، مثل زنبور", "ش": "ش، مثل شیر", "ک": "ک، مثل کتاب" };
  B.PRACTICE.push({
    id: "read-sprout-p12", subject: "read", level: "sprout", objectives: ["read.spr.5"],
    needs: ["read-sprout-1"], emoji: "🔍", title: "حرف را پیدا کن",
    words: { ask: "«{l}» را پیدا کن.", say: "{s}. این حرف را پیدا کن." },
    make: function (rng, n, ctx) {
      var known = shownLetters(ctx).filter(function (c) { return LIKE[c]; });
      return bank(rng, n, ctx, known, function (c) { return c; }, function (c) {
        return { type: "choose", key: c, prompt: ctx.w("ask", { l: c }), say: ctx.w("say", { s: SAYL[c] }), options: rng.shuffle([c].concat(rng.sample(LIKE[c], 2))), answer: c };
      });
    }
  });

  /* read-sprout-p13 «حرف و تصویر»: letters matched to the pictures whose names start with their sound. */
  var START = { "آ": [["💧", "آب"], ["🔥", "آتش"]], "ب": [["👨", "بابا"], ["🌬️", "باد"], ["🌧️", "باران"]], "د": [["✋", "دست"], ["🚪", "در"], ["🦷", "دندان"]],
    "م": [["🐟", "ماهی"], ["🌙", "ماه"], ["🐭", "موش"]], "س": [["🍎", "سیب"], ["🧺", "سبد"], ["⭐", "ستاره"]], "ت": [["⚽", "توپ"], ["🍓", "توت"]],
    "ر": [["🌈", "رنگین‌کمان"], ["🦊", "روباه"]], "ن": [["🍞", "نان"], ["🍊", "نارنگی"]], "ز": [["🐝", "زنبور"], ["🦒", "زرافه"]], "ش": [["🦁", "شیر"], ["🌙", "شب"]], "ک": [["📖", "کتاب"], ["👟", "کفش"]] };
  B.PRACTICE.push({
    id: "read-sprout-p13", subject: "read", level: "sprout", objectives: ["read.spr.5"],
    needs: ["read-sprout-1"], emoji: "🃏", title: "حرف و تصویر",
    words: { ask: "هر حرف را با تصویری جفت کن که اسمش با صدای آن حرف شروع می‌شود.", hidden: "کارت‌ها را برگردان. هر حرف را با تصویری جفت کن که با صدای آن شروع می‌شود." },
    make: function (rng, n, ctx) {
      var known = shownLetters(ctx).filter(function (c) { return START[c]; });
      if (known.length < 2) return [];
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var ls = rng.sample(known, Math.min(4, known.length));
        out.push({ type: "pairs", key: (i ? "h" : "o") + ls.slice().sort().join(""), hidden: i === 1, prompt: ctx.w(i ? "hidden" : "ask"),
          pairs: ls.map(function (c) { var x = rng.pick(START[c]); return [c, { pic: x[0], say: x[1] }]; }) });
      }
      return out;
    }
  });

  /* read-sprout-p14 «کلمه بساز»: a picture and its word built from letter or syllable tiles (shown, not dictation). */
  var BUILD = [["💧", "آب", ["آ", "ب"]], ["👨", "بابا", ["با", "با"]], ["🌬️", "باد", ["با", "د"]], ["🏠", "بام", ["با", "م"]], ["🌰", "بادام", ["با", "دام"]], ["🧺", "سَبَد", ["سَ", "بَد"]],
    ["🐴", "اَسب", ["اَ", "س", "ب"]], ["✏️", "مَداد", ["مَ", "داد"]], ["🍓", "توت", ["تو", "ت"]], ["🍞", "نان", ["نا", "ن"]], ["🍎", "سیب", ["سی", "ب"]], ["🐭", "موش", ["مو", "ش"]],
    ["📖", "کِتاب", ["کِ", "تاب"]], ["🦁", "شیر", ["شی", "ر"]], ["🐝", "زَنبور", ["زَن", "بور"]]];
  B.PRACTICE.push({
    id: "read-sprout-p14", subject: "read", level: "sprout", objectives: ["read.spr.6", "read.spr.4"],
    needs: ["read-sprout-1"], emoji: "🧱", title: "کلمه بساز",
    words: { ask: "تکه‌ها را بچین و کلمه این تصویر را بساز." },
    make: function (rng, n, ctx) {
      var list = BUILD.filter(function (b) { return ok(b[1], ctx); });
      var pieces = []; list.forEach(function (b) { b[2].forEach(function (p) { if (pieces.indexOf(p) === -1) pieces.push(p); }); });
      return bank(rng, n, ctx, list, function (b) { return b[1]; }, function (b) {
        var extra = pieces.filter(function (p) { return b[2].indexOf(p) === -1; });
        return { type: "build", key: b[1], pic: b[0], word: b[1], parts: b[2], extra: extra.length ? [rng.pick(extra)] : [], prompt: ctx.w("ask"), say: b[1].replace(/[َُِ]/g, "") };
      });
    }
  });

  /* read-sprout-p15 «کدام بخش را شنیدی؟»: a syllable heard; the child finds it among others. */
  var SYLS = ["با", "بَ", "دا", "دَ", "ما", "مَ", "سا", "سَ", "آ", "اَ", "تو", "تا", "را", "رَ", "نا", "نَ", "زا", "زَ", "شا", "شَ", "شِ", "سی", "می", "بی", "کا", "کُ"];
  B.PRACTICE.push({
    id: "read-sprout-p15", subject: "read", level: "sprout", objectives: ["read.spr.4", "read.spr.6"],
    needs: ["read-sprout-24"], emoji: "🔊", title: "کدام بخش را شنیدی؟",
    words: { ask: "کدام بخش را شنیدی؟", say: "گوش بده: {s}. کدام بخش را شنیدی؟" },
    make: function (rng, n, ctx) {
      var list = SYLS.filter(function (s) { return ok(s, ctx); });
      if (list.length < 3) return [];
      return bank(rng, n, ctx, list, function (s) { return s; }, function (s) {
        // Distractors that look or sound close: same first letter or same vowel when possible.
        var near = list.filter(function (t) { return t !== s && (t[0] === s[0] || t.slice(1) === s.slice(1)); });
        var others = rng.sample(near.length >= 2 ? near : list.filter(function (t) { return t !== s; }), 2);
        return { type: "choose", key: s, prompt: ctx.w("ask"), say: ctx.w("say", { s: s }), options: rng.shuffle([s].concat(others)), answer: s };
      });
    }
  });

  /* read-sprout-p16 «جمله بساز»: words put in order to make a sentence (each word decodable). */
  var SENTS = [["بابا", "آمَد."], ["سام", "آمَد."], ["بابا", "آب", "داد."], ["سام", "سَبَد", "داد."], ["ماما", "بادام", "داد."], ["اَسب", "آب", "دارَد."], ["سارا", "توت", "دارَد."],
    ["نیما", "نان", "دارَد."], ["آرش", "سیب", "دارَد."], ["بابا", "موز", "آوَرد."]];
  B.PRACTICE.push({
    id: "read-sprout-p16", subject: "read", level: "sprout", objectives: ["read.spr.7"],
    needs: ["read-sprout-5"], emoji: "🔤", title: "جمله بساز",
    words: { ask: "کلمه‌ها را به ترتیب بچین تا جمله شود. از راست شروع کن." },
    make: function (rng, n, ctx) {
      var list = SENTS.filter(function (s) { return ok(s.join(" "), ctx); });
      return bank(rng, n, ctx, list, function (s) { return s.join(" "); }, function (s) {
        return { type: "order", key: s.join(" "), prompt: ctx.w("ask"), items: s.slice() };
      });
    }
  });

  /* read-sprout-p17 «بلند بخوان»: a short decodable line read aloud, the grown-up marks the hard words (not scored). */
  var LINES = ["بابا آمَد. بابا آب داد.", "سام آمَد. سام سَبَد داد.", "اَسب آمَد. سام آب داد.", "ماما آمَد. ماما بادام داد.", "بابا مَداد داد. سام سَبَد داد.",
    "سارا توت دارَد. بابا نان دارَد.", "آرش سیب دارَد. سیب سُرخ اَست."];
  B.PRACTICE.push({
    id: "read-sprout-p17", subject: "read", level: "sprout", objectives: ["read.spr.7", "read.spr.6"],
    needs: ["read-sprout-5"], emoji: "🗣️", title: "بلند بخوان",
    words: {},
    make: function (rng, n, ctx) {
      var list = LINES.filter(function (t) { return ok(t, ctx); });
      return rng.sample(list, Math.min(n, 2)).map(function (t) { return { type: "readaloud", key: t, pic: "📖", text: t }; });
    }
  });
})();

/* ---------------- More Sapling practice ---------------- */
(function () {
  var G = B.readGen, ok = function (t, ctx) { return B.readable(t, ctx.letters); };
  var P = function (x) { return { label: x[0], value: x[1] }; };
  function bank(rng, n, ctx, list, keyOf, make) {
    return G.collect(rng, n, ctx.again, [{ ok: list.length > 0, make: function () { return make(rng.pick(list)); },
      byKey: function (k) { var x = list.find(function (y) { return keyOf(y) === k; }); return x && make(x); } }]);
  }
  function shownLetters(ctx) {
    var out = [];
    ctx.letters.replace(/[َُِّ ًVYءئ]/g, "").split("").forEach(function (c) { if (out.indexOf(c) === -1) out.push(c); });
    return out;
  }
  // Picture words, vowelled where a beginner needs it; each is used once its letters are taught.
  var WORDS = [["💧", "آب"], ["🌬️", "باد"], ["🏠", "بام"], ["🌰", "بادام"], ["🐴", "اَسب"], ["🧺", "سَبَد"], ["✏️", "مَداد"], ["🍓", "توت"], ["🍞", "نان"], ["🍎", "سیب"],
    ["✋", "دَست"], ["🐭", "موش"], ["🧄", "سیر"], ["🦁", "شیر"], ["📖", "کِتاب"], ["🍌", "موز"], ["🐝", "زَنبور"], ["🦷", "دَندان"], ["⭐", "سِتاره"], ["🌙", "ماه"],
    ["🐟", "ماهی"], ["🌸", "گُل"], ["🐄", "گاو"], ["🌳", "دِرَخت"], ["🐓", "خُروس"], ["🌉", "پُل"], ["🧀", "پَنیر"], ["🐈", "گُربه"], ["🐸", "قورباغه"], ["🚗", "ماشین"],
    ["☂️", "چَتر"], ["🍉", "هِندِوانه"], ["🥕", "هَویج"], ["🧥", "ژاکَت"], ["🧼", "صابون"], ["🦜", "طوطی"], ["🍯", "عَسَل"], ["🍲", "غَذا"], ["🌅", "صُبح"], ["🐢", "لاک‌پُشت"],
    ["🦒", "زَرّافه"], ["🍆", "بادِمجان"], ["🧦", "جوراب"], ["🧤", "دَستکِش"], ["🐑", "گوسفَند"], ["👂", "گوش"], ["🦶", "پا"], ["🌾", "گَندُم"], ["🦊", "روباه"], ["🍊", "پُرتِقال"]];
  var bare = function (w) { return w.replace(/[َُِّ]/g, ""); };

  /* read-sapling-p10 «حرف تازه»: a letter taught, found among letters that look alike, or the letter a picture starts with. */
  var LIKE = { "ا": ["ل", "آ"], "ب": ["ن", "ت", "پ"], "پ": ["ب", "ت", "ث"], "ت": ["ب", "ث", "ن"], "ث": ["ت", "پ", "ش"], "ج": ["چ", "ح", "خ"], "چ": ["ج", "ح", "خ"], "ح": ["ج", "چ", "خ"],
    "خ": ["ح", "ج", "چ"], "د": ["ذ", "ر", "ز"], "ذ": ["د", "ز", "ر"], "ر": ["ز", "ژ", "د"], "ز": ["ر", "ژ", "ذ"], "ژ": ["ز", "ر", "ش"], "س": ["ش", "ص", "ث"], "ش": ["س", "ث", "ض"],
    "ص": ["ض", "س", "ط"], "ض": ["ص", "ظ", "ش"], "ط": ["ظ", "ص", "ک"], "ظ": ["ط", "ض", "ز"], "ع": ["غ", "ح", "ه"], "غ": ["ع", "ف", "خ"], "ف": ["ق", "غ", "و"], "ق": ["ف", "و", "غ"],
    "ک": ["گ", "ل", "ط"], "گ": ["ک", "ل", "ق"], "ل": ["ا", "ک", "ن"], "م": ["ه", "و", "ق"], "ن": ["ب", "ت", "ی"], "و": ["ر", "د", "م"], "ه": ["م", "ح", "ع"], "ی": ["ن", "ب", "ت"] };
  B.PRACTICE.push({
    id: "read-sapling-p10", subject: "read", level: "sapling", objectives: ["read.sap.1", "read.sap.30"],
    needs: ["read-sapling-1"], emoji: "🔍", title: "حرف را پیدا کن",
    words: { find: "«{l}» را پیدا کن.", start: "اسم این تصویر با کدام حرف شروع می‌شود؟ پیدا کن.", startSay: "{w}. با کدام حرف شروع می‌شود؟" },
    make: function (rng, n, ctx) {
      var known = shownLetters(ctx).filter(function (c) { return LIKE[c]; });
      var pics = WORDS.filter(function (w) { return ok(w[1], ctx) && known.indexOf(bare(w[1])[0]) !== -1; });
      return G.collect(rng, n, ctx.again, [
        { ok: known.length > 0, make: function () { var c = rng.pick(known); return { type: "choose", key: "f" + c, prompt: ctx.w("find", { l: c }), say: ctx.w("find", { l: c }), options: rng.shuffle([c].concat(rng.sample(LIKE[c], 2))), answer: c }; } },
        { ok: pics.length > 0, make: function () {
          var w = rng.pick(pics), c = bare(w[1])[0], others = rng.sample(known.filter(function (k) { return k !== c; }), 2);
          if (others.length < 2) others = rng.sample(LIKE[c], 2);
          return { type: "choose", key: "s" + w[1], show: w[0], prompt: ctx.w("start"), say: ctx.w("startSay", { w: bare(w[1]) }), options: rng.shuffle([c].concat(others)), answer: c };
        } }
      ]);
    }
  });

  /* read-sapling-p11 «بخوان و پیدا کن»: read a word and tap its picture, or see a picture and tap its word. */
  B.PRACTICE.push({
    id: "read-sapling-p11", subject: "read", level: "sapling", objectives: ["read.sap.1", "read.sap.6"],
    needs: ["read-sapling-1"], emoji: "📖", title: "بخوان و پیدا کن",
    words: { read: "بخوان. تصویرش کدام است؟", find: "کلمه این تصویر کدام است؟" },
    make: function (rng, n, ctx) {
      var list = WORDS.filter(function (w) { return ok(w[1], ctx); });
      if (list.length < 3) return [];
      var items = []; list.forEach(function (w) { items.push({ w: w, k: "r" }, { w: w, k: "f" }); });
      return bank(rng, n, ctx, items, function (x) { return x.k + x.w[1]; }, function (x) {
        var others = rng.sample(list.filter(function (y) { return y !== x.w; }), 2);
        if (x.k === "r") return { type: "choose", key: "r" + x.w[1], show: x.w[1], prompt: ctx.w("read"), pic: true, options: rng.shuffle([x.w].concat(others)).map(function (y) { return { label: y[0], value: y[1] }; }), answer: x.w[1] };
        return { type: "choose", key: "f" + x.w[1], show: x.w[0], prompt: ctx.w("find"), options: rng.shuffle([x.w[1]].concat(others.map(function (y) { return y[1]; }))), answer: x.w[1] };
      });
    }
  });

  /* read-sapling-p12 «حرف به حرف بساز»: the picture's word built from letter tiles, with one tile too many. */
  B.PRACTICE.push({
    id: "read-sapling-p12", subject: "read", level: "sapling", objectives: ["read.sap.1", "read.sap.7"],
    needs: ["read-sapling-1"], emoji: "🧱", title: "حرف به حرف بساز",
    words: { ask: "کلمه این تصویر را حرف به حرف بساز." },
    make: function (rng, n, ctx) {
      var list = WORDS.filter(function (w) { return ok(w[1], ctx) && w[1].indexOf("‌") === -1; });
      var spare = shownLetters(ctx).filter(function (c) { return c !== "ی" && c !== "و"; });
      return bank(rng, n, ctx, list, function (w) { return w[1]; }, function (w) {
        var parts = B.readLetters(bare(w[1])).map(function (c, i, a) {
          if (i === 0 || (c !== "ی" && c !== "و")) return c;
          return (/[^اآدذرزژو]/.test(a[i - 1]) ? "ـ" : "") + c + (c === "ی" && i < a.length - 1 ? "ـ" : "");
        });
        var extra = spare.filter(function (c) { return parts.indexOf(c) === -1; });
        return { type: "build", key: w[1], pic: w[0], word: bare(w[1]), parts: parts, extra: extra.length ? [rng.pick(extra)] : [], prompt: ctx.w("ask"), say: bare(w[1]) };
      });
    }
  });

  /* read-sapling-p13 «کلمه و تصویر»: memory pairs and open pairs: each written word with its picture. */
  B.PRACTICE.push({
    id: "read-sapling-p13", subject: "read", level: "sapling", objectives: ["read.sap.6"],
    needs: ["read-sapling-18"], emoji: "🃏", title: "کلمه و تصویر",
    words: { open: "هر کلمه را بخوان و با تصویرش جفت کن.", hidden: "کارت‌ها را برگردان. هر کلمه را با تصویرش جفت کن." },
    make: function (rng, n, ctx) {
      var list = WORDS.filter(function (w) { return ok(w[1], ctx); });
      if (list.length < 4) return [];
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var four = rng.sample(list, 4);
        out.push({ type: "pairs", key: (i ? "h" : "o") + four.map(function (w) { return w[1]; }).sort().join(), hidden: i === 1, prompt: ctx.w(i ? "hidden" : "open"),
          pairs: four.map(function (w) { return [w[1], { pic: w[0], say: bare(w[1]) }]; }) });
      }
      return out;
    }
  });

  /* read-sapling-p14 «جمله بساز»: words (or phrases) put in order to make a sentence; the full stop goes last. */
  var ORDER = [["سارا", "توت", "دارَد."], ["نیما", "نان", "دارَد."], ["بابا", "موز", "آوَرد."], ["پرنده", "روی", "شاخه", "نشست."], ["من", "هر", "شب", "کتاب", "می‌خوانم."],
    ["بچه‌ها", "در", "حیاط", "بازی", "می‌کنند."], ["مادربزرگ", "برای", "ما", "آش", "پخت."], ["گربه", "زیر", "میز", "خوابید."], ["ما", "صبح", "به", "مدرسه", "رفتیم."], ["تو", "کجا", "رفتی؟"]];
  B.PRACTICE.push({
    id: "read-sapling-p14", subject: "read", level: "sapling", objectives: ["read.sap.9", "read.sap.25"],
    needs: ["read-sapling-6"], emoji: "🔤", title: "جمله بساز",
    words: { ask: "کلمه‌ها را به ترتیب بچین تا جمله شود." },
    make: function (rng, n, ctx) {
      var list = ORDER.filter(function (s) { return ok(s.join(" "), ctx); });
      return bank(rng, n, ctx, list, function (s) { return s.join(" "); }, function (s) { return { type: "order", key: s.join(" "), prompt: ctx.w("ask"), items: s.slice() }; });
    }
  });

  /* read-sapling-p15 «شکل‌های حرف»: a letter alone and its form at the start of a word; letters that join or not. */
  var FORMS = [["ب", "بـ"], ["ن", "نـ"], ["س", "سـ"], ["ع", "عـ"], ["ه", "هـ"], ["ی", "یـ"], ["ج", "جـ"], ["ک", "کـ"], ["م", "مـ"], ["ف", "فـ"], ["غ", "غـ"], ["ل", "لـ"]];
  var JOIN = ["ب", "س", "م", "ن", "ک", "ل", "ف", "ت"], NOJOIN = ["ا", "د", "ذ", "ر", "ز", "ژ", "و"];
  B.PRACTICE.push({
    id: "read-sapling-p15", subject: "read", level: "sapling", objectives: ["read.sap.5", "read.sap.8"],
    needs: ["read-sapling-22"], emoji: "🔠", title: "شکل‌های حرف",
    words: { pairs: "هر حرف را با شکل اولش جفت کن.", sort: "این حرف به حرف بعدی می‌چسبد یا نه؟", yes: "می‌چسبد", no: "نمی‌چسبد" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var f = rng.sample(FORMS, 4); return { type: "pairs", key: "f" + f.map(function (x) { return x[0]; }).join(""), prompt: ctx.w("pairs"), pairs: f.map(function (x) { return [x[0], x[1]]; }) }; } },
        { ok: ctx.done("read-sapling-35") || true, make: function () {
          var a = rng.sample(JOIN, 3), b = rng.sample(NOJOIN, 3);
          return { type: "sort", key: "j" + a.join("") + b.join(""), prompt: ctx.w("sort"), baskets: [{ label: ctx.w("yes"), value: "y" }, { label: ctx.w("no"), value: "n" }],
            items: rng.shuffle(a.map(function (c) { return { label: c, basket: "y" }; }).concat(b.map(function (c) { return { label: c, basket: "n" }; }))) };
        } }
      ]);
    }
  });

  /* read-sapling-p16 «کدام درست است؟»: a picture and two spellings with a same-sound letter; later homophones in a sentence. */
  var SPELL = [["🧼", "صابون", "سابون"], ["🦜", "طوطی", "توتی"], ["🍯", "عسل", "اسل"], ["🍲", "غذا", "قذا"], ["🌅", "صبح", "سبح"], ["🏡", "حیاط", "حیات"], ["🌞", "ظهر", "زهر"],
    ["🐸", "قورباغه", "غورباغه"], ["🥚", "تخم‌مرغ", "تخم‌مرق"], ["🍞", "صبحانه", "سبحانه"], ["📚", "درس", "درص"], ["🎒", "مدرسه", "مدرصه"], ["🧃", "آب‌میوه", "عب‌میوه"], ["⏰", "ساعت", "ساعط"]];
  var HOMO = [["در بیابان، گل‌ها … دارند.", "خار", "خوار"], ["پلنگ گوشت‌… است.", "خوار", "خار"], ["مادربزرگ … تا گردو دارد.", "صد", "سد"], ["پشت … رود، دریاچه بزرگی است.", "سد", "صد"],
    ["من … که کتاب بخوانم.", "می‌خواهم", "می‌خاهم"], ["او از جایش … و رفت.", "برخاست", "برخواست"]];
  B.PRACTICE.push({
    id: "read-sapling-p16", subject: "read", level: "sapling", objectives: ["read.sap.7", "read.sap.21"],
    needs: ["read-sapling-23"], emoji: "✔️", title: "کدام درست است؟",
    words: { pic: "اسم این تصویر کدام درست نوشته شده است؟", sent: "کدام کلمه در این جمله درست است؟" },
    make: function (rng, n, ctx) {
      var pics = SPELL.filter(function (s) { return ok(s[1], ctx); });
      return G.collect(rng, n, ctx.again, [
        { ok: pics.length > 0, make: function () { var s = rng.pick(pics); return { type: "choose", key: s[1], show: s[0], prompt: ctx.w("pic"), options: rng.shuffle([s[1], s[2]]), answer: s[1] }; } },
        { ok: ctx.done("read-sapling-70"), make: function () { var h = rng.pick(HOMO); return { type: "choose", key: h[0], show: h[0], prompt: ctx.w("sent"), options: rng.shuffle([h[1], h[2]]), answer: h[1] }; } }
      ]);
    }
  });

  /* read-sapling-p17 «نشانه بگذار»: which mark ends a sentence (. ؟ !), the comma, and «» for what someone says. */
  var MARKS = [["امروز هوا آفتابی است", "."], ["اسم تو چیست", "؟"], ["کجا رفتی", "؟"], ["ما نان خریدیم", "."], ["وای، چه برف قشنگی", "!"], ["آفرین، چه خوب نوشتی", "!"], ["گربه زیر میز خوابید", "."], ["کی می‌آیی", "؟"]];
  var QUOTE = [{ k: "q1", o: ["مادر گفت: «بیا غذا بخور.»", "مادر گفت بیا: غذا «بخور.»"] }, { k: "q2", o: ["نیما پرسید: «کجا می‌روی؟»", "نیما «پرسید» کجا می‌روی؟"] }];
  B.PRACTICE.push({
    id: "read-sapling-p17", subject: "read", level: "sapling", objectives: ["read.sap.9", "read.sap.22"],
    needs: ["read-sapling-25"], emoji: "❗", title: "نشانه بگذار",
    words: { end: "آخر این جمله کدام نشانه می‌آید؟", quote: "حرف کسی را کدام درست نوشته است؟", comma: "کدام جمله ویرگول (،) را درست دارد؟" },
    make: function (rng, n, ctx) {
      var marks = ctx.done("read-sapling-51") ? MARKS : MARKS.filter(function (m) { return m[1] !== "!"; });
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var m = rng.pick(marks); return { type: "choose", key: m[0], show: m[0] + " …", prompt: ctx.w("end"), options: ctx.done("read-sapling-51") ? [".", "؟", "!"] : [".", "؟"], answer: m[1] }; } },
        { ok: ctx.done("read-sapling-51"), make: function () { var q = rng.pick(QUOTE); return { type: "choose", key: q.k, prompt: ctx.w("quote"), options: rng.shuffle(q.o), answer: q.o[0] }; } },
        { ok: ctx.done("read-sapling-51"), make: function () { return { type: "choose", key: "comma", prompt: ctx.w("comma"), options: rng.shuffle(["من سیب، موز و انار خریدم.", "من، سیب موز و انار خریدم."]), answer: "من سیب، موز و انار خریدم." }; } }
      ]);
    }
  });

  /* read-sapling-p18 «اول، بعد، آخر»: the sentences of a short story put in order. */
  var TALES = [["علی با کلاهش در پارک بود.", "باد کلاه را برد.", "سگ کلاه را آورد."], ["باران آمد.", "ترانه چترش را باز کرد.", "رنگین‌کمان پیدا شد."],
    ["نیما و مادربزرگ به نانوایی رفتند.", "نانوا نان پخت.", "همه سر سفره صبحانه خوردند."], ["شیر موش را گرفت و رها کرد.", "شیر در دام افتاد.", "موش طناب‌ها را جوید."],
    ["مینا یک دانه کاشت.", "دانه سبز شد.", "یک گل زرد باز شد."], ["کلاغ تشنه بود.", "سنگ‌ریزه‌ها را توی کوزه انداخت.", "آب بالا آمد و آب خورد."],
    ["مریم یک گلدان دارد.", "هر روز به گل‌ها آب می‌دهد.", "گل‌ها سرخ و زرد شدند."]];
  B.PRACTICE.push({
    id: "read-sapling-p18", subject: "read", level: "sapling", objectives: ["read.sap.13", "read.sap.27"],
    needs: ["read-sapling-27"], emoji: "📜", title: "اول، بعد، آخر",
    words: { ask: "جمله‌های قصه را بخوان و به ترتیب بچین." },
    make: function (rng, n, ctx) {
      var list = TALES.filter(function (t) { return ok(t.join(" "), ctx); });
      return bank(rng, n, ctx, list, function (t) { return t[0]; }, function (t) { return { type: "order", key: t[0], prompt: ctx.w("ask"), numbered: true, items: t.slice() }; });
    }
  });

  /* read-sapling-p19 «الفبا»: letters in alphabet order, a letter's name, words by their first letter. */
  var ALEF = "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی".split(" ");
  var NAMEOF = { "ب": "بِ", "ج": "جیم", "د": "دال", "س": "سین", "ش": "شین", "ص": "صاد", "ع": "عین", "ق": "قاف", "ک": "کاف", "ل": "لام", "م": "میم", "ن": "نون" };
  var DWORDS = ["انار", "بادام", "پسته", "توت", "خرگوش", "روباه", "شیر", "گاو", "ماه", "نان", "سیب", "زنبور", "کتاب", "درخت", "عسل"];
  B.PRACTICE.push({
    id: "read-sapling-p19", subject: "read", level: "sapling", objectives: ["read.sap.30"],
    needs: ["read-sapling-36"], emoji: "🔡", title: "الفبا",
    words: { letters: "حرف‌ها را به ترتیب الفبا بچین.", words: "کلمه‌ها را به ترتیب الفبا بچین.", name: "اسم این حرف چیست؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var i = rng.int(0, ALEF.length - 4); var s = ALEF.slice(i, i + 4); return { type: "order", key: "l" + s.join(""), prompt: ctx.w("letters"), items: s }; } },
        { ok: true, make: function () { var l = rng.pick(Object.keys(NAMEOF)); var o = rng.sample(Object.keys(NAMEOF).filter(function (k) { return k !== l; }), 2).map(function (k) { return NAMEOF[k]; });
          return { type: "choose", key: "n" + l, show: l, prompt: ctx.w("name"), options: rng.shuffle([NAMEOF[l]].concat(o)), answer: NAMEOF[l] }; } },
        { ok: ctx.done("read-sapling-80"), make: function () {
          var w = rng.sample(DWORDS, 4).sort(function (a, b) { return ALEF.indexOf(a[0]) - ALEF.indexOf(b[0]) || (a < b ? -1 : 1); });
          if (new Set(w.map(function (x) { return x[0]; })).size < 4) w = ["انار", "بادام", "توت", "شیر"];
          return { type: "order", key: "w" + w.join(), prompt: ctx.w("words"), items: w };
        } }
      ]);
    }
  });

  /* read-sapling-p20 «کدام خوانده می‌شود؟»: a word with no marks in a sentence; which way is it read here? */
  var VOW = [["پسر با گِل بازی کرد و دست‌هایش کثیف شد.", "گِل", "گُل"], ["مادربزرگ یک گل سرخ در گلدان گذاشت.", "گُل", "گِل"], ["کرم از زیر خاک بیرون آمد.", "کِرم", "کَرَم"],
    ["لیوان پر از آب است.", "پُر", "پَر"], ["کبوتر یک پر سفید انداخت.", "پَر", "پُر"], ["او با سر به توپ ضربه زد.", "سَر", "سِر"], ["برادرم کتاب را باز کرد.", "باز", "بازِ"]];
  B.PRACTICE.push({
    id: "read-sapling-p20", subject: "read", level: "sapling", objectives: ["read.sap.11"],
    needs: ["read-sapling-39"], emoji: "🧐", title: "کدام خوانده می‌شود؟",
    words: { ask: "در این جمله، کلمه بی‌نشانه چطور خوانده می‌شود؟" },
    make: function (rng, n, ctx) {
      var list = VOW.filter(function (v) { return v[1] !== "بازِ" && v[2] !== "بازِ"; });
      return bank(rng, n, ctx, list, function (v) { return v[0]; }, function (v) { return { type: "choose", key: v[0], show: v[0], prompt: ctx.w("ask"), options: rng.shuffle([v[1], v[2]]), answer: v[1] }; });
    }
  });

  /* read-sapling-p21 «کلمه‌های پرکاربرد»: common words found fast in a sentence, and memory pairs of them. */
  var SIGHT = ["است", "این", "آن", "که", "را", "با", "از", "بود", "می‌رود", "به", "در", "هم"];
  var SSENT = ["این کتاب مال من است.", "سارا از مدرسه آمد.", "نیما نان را به مادر داد.", "آن گربه که در حیاط بود رفت.", "من هم با تو می‌آیم.", "او به پارک می‌رود."];
  B.PRACTICE.push({
    id: "read-sapling-p21", subject: "read", level: "sapling", objectives: ["read.sap.11", "read.sap.10"],
    needs: ["read-sapling-40"], emoji: "👀", title: "کلمه‌های پرکاربرد",
    words: { find: "در این جمله، کلمه «{w}» کدام است؟", pairs: "کارت‌ها را برگردان. دو کلمه مثل هم را پیدا کن و بلند بخوان." },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () {
          var s = rng.pick(SSENT), ws = s.replace(/[.،]/g, "").split(" "), t = rng.pick(ws.filter(function (w) { return SIGHT.indexOf(w) !== -1; }));
          var others = rng.sample(ws.filter(function (w) { return w !== t; }), 2);
          return { type: "choose", key: s + t, show: s, prompt: ctx.w("find", { w: t }), options: rng.shuffle([t].concat(others)), answer: t };
        } },
        { ok: true, make: function () { var four = rng.sample(SIGHT, 4); return { type: "pairs", key: "p" + four.slice().sort().join(), hidden: true, prompt: ctx.w("pairs"), pairs: four.map(function (w) { return [w, w]; }) }; } }
      ]);
    }
  });

  /* read-sapling-p22 «اشتباه را پیدا کن»: which pair is not synonyms / opposites; which sentence uses a word wrongly. */
  var SYN = [["شاد", "خوشحال"], ["زیبا", "قشنگ"], ["تند", "سریع"], ["خانه", "منزل"], ["دوست", "رفیق"], ["شروع", "آغاز"]];
  var OPP = [["بالا", "پایین"], ["روز", "شب"], ["زود", "دیر"], ["گرم", "سرد"], ["پر", "خالی"], ["باز", "بسته"]];
  var MISUSE = [{ k: "m1", ok: "یخ خیلی سرد است.", bad: "آتش خیلی سرد است." }, { k: "m2", ok: "شب، آسمان تاریک است.", bad: "شب، خورشید می‌تابد." },
    { k: "m3", ok: "دو گربه روی دیوار نشسته‌اند.", bad: "دو گربه‌ها روی دیوار نشسته‌اند." }, { k: "m4", ok: "لیوان پر از آب است.", bad: "لیوان خالی پر از آب است." }];
  B.PRACTICE.push({
    id: "read-sapling-p22", subject: "read", level: "sapling", objectives: ["read.sap.16", "read.sap.20"],
    needs: ["read-sapling-42"], emoji: "🕵️", title: "اشتباه را پیدا کن",
    words: { syn: "کدام جفت هم‌معنی نیست؟", opp: "کدام جفت مخالف هم نیست؟", sent: "کدام جمله اشتباه دارد؟" },
    make: function (rng, n, ctx) {
      function odd(good, bad, kind) {
        var two = rng.sample(good, 2), b = rng.pick(bad);
        var label = function (p) { return p[0] + " — " + p[1]; };
        return { type: "choose", key: kind + b[0], prompt: ctx.w(kind), options: rng.shuffle(two.map(label).concat([label(b)])), answer: label(b) };
      }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return odd(SYN, OPP, "syn"); } },
        { ok: ctx.done("read-sapling-43"), make: function () { return odd(OPP, SYN, "opp"); } },
        { ok: ctx.done("read-sapling-44"), make: function () { var m = rng.pick(MISUSE); return { type: "choose", key: m.k, prompt: ctx.w("sent"), options: rng.shuffle([m.ok, m.bad]), answer: m.bad }; } }
      ]);
    }
  });

  /* read-sapling-p23 «کلمه‌ها را جدا کن»: words sorted: same meaning or opposite, one or many, family, compound or simple. */
  var FAMILY = { "دان": ["دانا", "دانش", "دانشمند"], "کار": ["کارگر", "کارخانه", "کاری"], "گل": ["گلدان", "گلستان", "گلبرگ"] };
  B.PRACTICE.push({
    id: "read-sapling-p23", subject: "read", level: "sapling", objectives: ["read.sap.16", "read.sap.17", "read.sap.20"],
    needs: ["read-sapling-42"], emoji: "🗂️", title: "کلمه‌ها را جدا کن",
    words: { big: "هم‌معنی «بزرگ» است یا مخالف آن؟", same: "هم‌معنی", opp: "مخالف", num: "یکی است یا چندتا؟", one: "یکی", many: "چندتا",
      fam: "از کدام خانواده است؟", comp: "کلمه مرکب است یا ساده؟", c: "مرکب", s: "ساده" },
    make: function (rng, n, ctx) {
      function sort(key, prompt, baskets, items) { return { type: "sort", key: key, prompt: prompt, baskets: baskets, items: rng.shuffle(items) }; }
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { return sort("big", ctx.w("big"), [{ label: ctx.w("same"), value: "s" }, { label: ctx.w("opp"), value: "o" }],
          rng.sample([["گنده", "s"], ["درشت", "s"], ["کلان", "s"], ["کوچک", "o"], ["ریز", "o"], ["کوچولو", "o"]], 4).map(function (x) { return { label: x[0], basket: x[1] }; })); } },
        { ok: ctx.done("read-sapling-44"), make: function () { return sort("num", ctx.w("num"), [{ label: ctx.w("one"), value: "1" }, { label: ctx.w("many"), value: "m" }],
          rng.sample([["گل", "1"], ["گل‌ها", "m"], ["درختان", "m"], ["کتاب", "1"], ["پرندگان", "m"], ["دریا", "1"]], 4).map(function (x) { return { label: x[0], basket: x[1] }; })); } },
        { ok: ctx.done("read-sapling-54"), make: function () { var ks = rng.sample(Object.keys(FAMILY), 2), items = [];
          ks.forEach(function (k) { FAMILY[k].forEach(function (w) { items.push({ label: w, basket: k }); }); });
          return sort("fam" + ks.join(), ctx.w("fam"), ks.map(function (k) { return { label: k }; }), items); } },
        { ok: ctx.done("read-sapling-56"), make: function () { return sort("comp", ctx.w("comp"), [{ label: ctx.w("c"), value: "c" }, { label: ctx.w("s"), value: "s" }],
          rng.sample([["گل‌فروش", "c"], ["کتاب‌خانه", "c"], ["دست‌کش", "c"], ["میز", "s"], ["کتاب", "s"], ["درخت", "s"]], 4).map(function (x) { return { label: x[0], basket: x[1] }; })); } }
      ]);
    }
  });

  /* read-sapling-p24 «درست یا نادرست؟»: a short text read, then a sentence about it: true or false? */
  var TF = [
    { t: "علی با کلاه قرمزش در پارک بود. باد تندی آمد و کلاه را برد.", s: [["کلاه علی قرمز بود.", true], ["علی در مدرسه بود.", false]] },
    { t: "پرستو در پاییز به جاهای گرم می‌رود و در بهار برمی‌گردد.", s: [["پرستو در بهار برمی‌گردد.", true], ["پرستو در پاییز به جاهای سرد می‌رود.", false]] },
    { t: "آب دریا شور است و نمی‌شود آن را نوشید.", s: [["آب دریا شور است.", true], ["آب دریا را می‌نوشیم.", false]] },
    { t: "شیر موش را رها کرد. چند روز بعد موش طناب‌های دام را جوید و شیر آزاد شد.", s: [["موش به شیر کمک کرد.", true], ["شیر موش را خورد.", false]], after: "read-sapling-48" },
    { t: "سلام مادربزرگ عزیز، تابستان به دیدنتان می‌آییم. نوه شما، آیدا", s: [["آیدا این نامه را نوشته است.", true], ["نامه برای معلم است.", false]], after: "read-sapling-76" },
    { t: "یوزپلنگ ایرانی در دشت‌های مرکز ایران زندگی می‌کند. او سریع‌ترین جانور خشکی است.", s: [["یوزپلنگ خیلی تند می‌دود.", true], ["یوزپلنگ در دریا زندگی می‌کند.", false]], after: "read-sapling-58" }
  ];
  B.PRACTICE.push({
    id: "read-sapling-p24", subject: "read", level: "sapling", objectives: ["read.sap.13", "read.sap.15"],
    needs: ["read-sapling-46"], emoji: "✅", title: "درست یا نادرست؟",
    words: { ask: "این جمله درباره متن درست است یا نادرست؟ «{s}»", yes: "درست", no: "نادرست" },
    make: function (rng, n, ctx) {
      var items = []; TF.forEach(function (x, i) { if (!x.after || ctx.done(x.after)) x.s.forEach(function (s, j) { items.push({ x: x, s: s, k: i + "-" + j }); }); });
      return bank(rng, n, ctx, items, function (y) { return y.k; }, function (y) {
        return { type: "passage", key: y.k, text: y.x.t, question: ctx.w("ask", { s: y.s[0] }), options: [ctx.w("yes"), ctx.w("no")], answer: y.s[1] ? ctx.w("yes") : ctx.w("no") };
      });
    }
  });

  /* read-sapling-p25 «هم‌قافیه‌ها»: written words matched with the word that rhymes. */
  var RHY = [["باران", "ناودان"], ["شاد", "باد"], ["پنجره", "دره"], ["ماه", "راه"], ["شب", "لب"], ["گوش", "موش"], ["نان", "مهربان"], ["آب", "حباب"], ["گل", "پل"], ["خیار", "مار"]];
  B.PRACTICE.push({
    id: "read-sapling-p25", subject: "read", level: "sapling", objectives: ["read.sap.29"],
    needs: ["read-sapling-49"], emoji: "🎵", title: "هم‌قافیه‌ها",
    words: { pairs: "هر کلمه را با هم‌قافیه‌اش جفت کن.", choose: "کدام با «{w}» هم‌قافیه است؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var r = rng.sample(RHY, 4); return { type: "pairs", key: "p" + r.map(function (x) { return x[0]; }).sort().join(), prompt: ctx.w("pairs"), pairs: r.map(function (x) { return [x[0], x[1]]; }) }; } },
        { ok: true, make: function () { var r = rng.pick(RHY), o = rng.sample(RHY.filter(function (x) { return x !== r; }), 2).map(function (x) { return x[1]; });
          return { type: "choose", key: "c" + r[0], prompt: ctx.w("choose", { w: r[0] }), options: rng.shuffle([r[1]].concat(o)), answer: r[1] }; } }
      ]);
    }
  });

  /* read-sapling-p26 «جمله را کامل کن»: the word that completes a sentence: a verb, a joining word (و، امّا، چون، بعد). */
  var FILL = [["مادر در آشپزخانه غذا …", "می‌پزد", ["می‌خوابد", "می‌پرد"]], ["بچه‌ها در حیاط مدرسه …", "بازی می‌کنند", ["پرواز می‌کنند", "شنا می‌کنند"]],
    ["پرنده روی شاخه …", "نشست", ["خورد", "نوشت"]], ["من هر شب پیش از خواب کتاب …", "می‌خوانم", ["می‌پزم", "می‌شویم"]]];
  var JOINW = [["من سیب دوست دارم … خواهرم پرتقال.", "و", ["چون", "امّا"]], ["می‌خواستم بازی کنم، … باران آمد.", "امّا", ["و", "چون"]], ["نیما چترش را برداشت، … باران می‌آمد.", "چون", ["امّا", "بعد"]],
    ["اول مسواک زدم، … خوابیدم.", "بعد", ["چون", "امّا"]], ["گرسنه بودم، … نان و پنیر خوردم.", "پس", ["امّا", "چون"]]];
  B.PRACTICE.push({
    id: "read-sapling-p26", subject: "read", level: "sapling", objectives: ["read.sap.25", "read.sap.34"],
    needs: ["read-sapling-50"], emoji: "🧩", title: "جمله را کامل کن",
    words: { ask: "کدام جمله را کامل می‌کند؟" },
    make: function (rng, n, ctx) {
      var list = FILL.concat(ctx.done("read-sapling-73") ? JOINW : []);
      return bank(rng, n, ctx, list, function (f) { return f[0]; }, function (f) { return { type: "choose", key: f[0], show: f[0], prompt: ctx.w("ask"), options: rng.shuffle([f[1]].concat(f[2])), answer: f[1] }; });
    }
  });

  /* read-sapling-p27 «کدام از این خانواده نیست؟»: four words, one not in the family; or the word a suffix makes. */
  var ODD = [[["دانا", "دانش", "دانشمند"], "دانه"], [["کارگر", "کارخانه", "کاری"], "کاشی"], [["گلدان", "گلستان", "گلبرگ"], "گلابی"], [["باغبان", "باغچه", "باغ‌وحش"], "بادام"], [["خواندن", "خواننده", "کتاب‌خوان"], "خواهر"]];
  var MEAN = [["گلستان", "جایی که گل زیاد دارد", ["گل کوچک", "کسی که گل می‌فروشد"]], ["آهنگر", "کسی که با آهن کار می‌کند", ["ظرف آهن", "آهن کوچک"]], ["نمکدان", "ظرف نمک", ["کسی که نمک می‌فروشد", "نمک زیاد"]],
    ["باغچه", "باغ کوچک", ["کسی که در باغ کار می‌کند", "جای پر از باغ"]], ["ایرانی", "کسی که از ایران است", ["شهر ایران", "ایران کوچک"]]];
  B.PRACTICE.push({
    id: "read-sapling-p27", subject: "read", level: "sapling", objectives: ["read.sap.17", "read.sap.18"],
    needs: ["read-sapling-54"], emoji: "🏠", title: "کدام از این خانواده نیست؟",
    words: { odd: "کدام کلمه از این خانواده نیست؟", mean: "«{w}» یعنی چه؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var o = rng.pick(ODD); return { type: "choose", key: "o" + o[1], prompt: ctx.w("odd"), options: rng.shuffle(o[0].concat([o[1]])), answer: o[1] }; } },
        { ok: ctx.done("read-sapling-55"), make: function () { var m = rng.pick(MEAN); return { type: "choose", key: "m" + m[0], show: m[0], prompt: ctx.w("mean", { w: m[0] }), options: rng.shuffle([m[1]].concat(m[2])), answer: m[1] }; } }
      ]);
    }
  });

  /* read-sapling-p28 «واقعیت یا نظر؟»: sentences sorted into facts and opinions; the sentence that is a fact. */
  var FACT = ["آب دریا شور است.", "زنبورها عسل درست می‌کنند.", "یوزپلنگ تند می‌دود.", "ایران در شمال دریای خزر دارد.", "درخت‌ها سایه می‌دهند."];
  var OPIN = ["زمستان بهترین فصل است.", "گربه‌ها از سگ‌ها بامزه‌ترند.", "آش رشته خوشمزه‌ترین غذاست.", "کتاب خواندن از همه کارها بهتر است.", "رنگ آبی قشنگ‌ترین رنگ است."];
  B.PRACTICE.push({
    id: "read-sapling-p28", subject: "read", level: "sapling", objectives: ["read.sap.15", "read.sap.34", "read.sap.36"],
    needs: ["read-sapling-58"], emoji: "⚖️", title: "واقعیت یا نظر؟",
    words: { sort: "واقعیت است (درست یا غلطش را می‌شود فهمید) یا نظر (فکر یک نفر)؟", f: "واقعیت", o: "نظر", which: "کدام جمله یک واقعیت است؟" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var f = rng.sample(FACT, 2), o = rng.sample(OPIN, 2);
          return { type: "sort", key: "s" + f.concat(o).join(""), prompt: ctx.w("sort"), baskets: [{ label: ctx.w("f"), value: "f" }, { label: ctx.w("o"), value: "o" }],
            items: rng.shuffle(f.map(function (x) { return { label: x, basket: "f" }; }).concat(o.map(function (x) { return { label: x, basket: "o" }; }))) }; } },
        { ok: true, make: function () { var f = rng.pick(FACT); return { type: "choose", key: "w" + f, prompt: ctx.w("which"), options: rng.shuffle([f].concat(rng.sample(OPIN, 2))), answer: f }; } }
      ]);
    }
  });

  /* read-sapling-p29 «معنی از جمله»: a new word met in a sentence; its meaning chosen from the sentence. */
  var MEANING = [["مادر گفت: «مواظب باش، زمین خیس است!»", "مواظب", "با دقت", ["تند", "شاد"]], ["آرش فکر کرد و تصمیم گرفت اول تکالیفش را بنویسد.", "تصمیم گرفت", "انتخاب کرد", ["فراموش کرد", "خسته شد"]],
    ["آب لیوان آن‌قدر داغ بود که بخار از آن بلند می‌شد.", "بخار", "هوای گرم آب داغ", ["یک میوه", "یک رنگ"]], ["لاک‌پشت آهسته راه می‌رفت.", "آهسته", "آرام", ["تند", "بلند"]],
    ["پسر شجاع از تاریکی نترسید.", "شجاع", "نترس", ["خسته", "گرسنه"]], ["آب دریا شور است.", "شور", "پرنمک", ["شیرین", "سرد"]], ["جنگل خانه جانوران است.", "جانوران", "حیوان‌ها", ["درخت‌ها", "آدم‌ها"]]];
  B.PRACTICE.push({
    id: "read-sapling-p29", subject: "read", level: "sapling", objectives: ["read.sap.19", "read.sap.14"],
    needs: ["read-sapling-47"], emoji: "💡", title: "معنی از جمله",
    words: { ask: "از جمله بفهم: «{w}» یعنی چه؟" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, MEANING, function (m) { return m[1]; }, function (m) { return { type: "choose", key: m[1], show: m[0], prompt: ctx.w("ask", { w: m[1] }), options: rng.shuffle([m[2]].concat(m[3])), answer: m[2] }; });
    }
  });

  /* read-sapling-p30 «تعریف کن»: something to tell the family, with questions for the grown-up (not scored). */
  var TELL = [{ k: "day", scene: "🌞 🧒 🌙", cap: "امروزت را برای خانواده تعریف کن: اول، بعد، آخرش.", tips: ["بپرسید: «اول چه شد؟ بعدش؟»", "دو سؤال بپرسید: «چرا؟» و «چه حسی داشتی؟»"] },
    { k: "book", scene: "📖 💬", cap: "کتابی که خواندی را برای ما تعریف کن: چه کسانی بودند؟ چه شد؟", tips: ["بپرسید: «کدام قسمتش را دوست داشتی؟ چرا؟»", "اسم کتاب و نویسنده را بپرسید."] },
    { k: "learn", scene: "💡 🧒 👂", cap: "یک چیز تازه که یاد گرفتی را به کسی یاد بده.", tips: ["نقش شاگرد را بازی کنید و سؤال بپرسید.", "بگذارید به ترتیب و واضح توضیح دهد."] },
    { k: "trip", scene: "🚶 🏪 👀", cap: "جایی که امروز رفتی را گزارش بده: کجا؟ چه دیدی؟ چه چیز جالبی بود؟", tips: ["بخواهید فقط چیزهایی را بگوید که واقعاً دید.", "یک کلمه تازه که گفت را تکرار کنید."] }];
  B.PRACTICE.push({
    id: "read-sapling-p30", subject: "read", level: "sapling", objectives: ["read.sap.31", "read.sap.32"],
    needs: ["read-sapling-60"], emoji: "🗣️", title: "تعریف کن",
    words: {},
    make: function (rng, n, ctx) {
      return rng.sample(TELL, Math.min(n, 2)).map(function (t) { return { type: "talk", key: t.k, scene: t.scene, caption: t.cap, tips: t.tips }; });
    }
  });

  /* read-sapling-p32 «کدام کلمه؟»: the noun, the verb or the describing word in a sentence, chosen. */
  var WC = [["مریم یک کتاب قشنگ خرید.", { noun: "کتاب", verb: "خرید", adj: "قشنگ" }], ["پرنده کوچک آواز خواند.", { noun: "پرنده", verb: "خواند", adj: "کوچک" }],
    ["پدر چای داغ ریخت.", { noun: "چای", verb: "ریخت", adj: "داغ" }], ["گربه سفید خوابید.", { noun: "گربه", verb: "خوابید", adj: "سفید" }], ["کیان توپ قرمز را انداخت.", { noun: "توپ", verb: "انداخت", adj: "قرمز" }]];
  B.PRACTICE.push({
    id: "read-sapling-p32", subject: "read", level: "sapling", objectives: ["read.sap.23"],
    needs: ["read-sapling-64"], emoji: "🏷️", title: "کدام کلمه؟",
    words: { noun: "در این جمله، کدام کلمه اسم یک چیز است؟", verb: "در این جمله، فعل (کاری که انجام شد) کدام است؟", adj: "در این جمله، صفت (کلمه‌ای که می‌گوید چطور است) کدام است؟" },
    make: function (rng, n, ctx) {
      var kinds = ["noun"].concat(ctx.done("read-sapling-65") ? ["verb"] : [], ctx.done("read-sapling-66") ? ["adj"] : []);
      var items = []; WC.forEach(function (w) { kinds.forEach(function (k) { items.push({ w: w, k: k }); }); });
      return bank(rng, n, ctx, items, function (x) { return x.k + x.w[0]; }, function (x) {
        var words = x.w[0].replace(".", "").split(" "), a = x.w[1][x.k], o = rng.sample(words.filter(function (y) { return y !== a; }), 2);
        return { type: "choose", key: x.k + x.w[0], show: x.w[0], prompt: ctx.w(x.k), options: rng.shuffle([a].concat(o)), answer: a };
      });
    }
  });

  /* read-sapling-p33 «فعل درست»: the right verb form for a person or a time. */
  var VF = [["من دیروز به پارک …", "رفتم", ["رفتی", "رفتند"]], ["تو کتابت را …؟", "آوردی", ["آوردم", "آوردیم"]], ["ما با هم ناهار …", "خوردیم", ["خورد", "خوردی"]],
    ["آن‌ها در حیاط بازی …", "کردند", ["کردم", "کردید"]], ["شما کی …؟", "آمدید", ["آمدم", "آمد"]], ["او نامه را …", "نوشت", ["نوشتیم", "نوشتی"]]];
  var VT = [["دیروز باران …", "آمد", ["می‌آید", "خواهد آمد"]], ["الان من کتاب …", "می‌خوانم", ["خواندم", "خواهم خواند"]], ["فردا به دیدن مادربزرگ …", "خواهیم رفت", ["رفتیم", "می‌رویم"]], ["هفته پیش یک گربه …", "دیدم", ["می‌بینم", "خواهم دید"]]];
  B.PRACTICE.push({
    id: "read-sapling-p33", subject: "read", level: "sapling", objectives: ["read.sap.24", "read.sap.23"],
    needs: ["read-sapling-64"], emoji: "🔧", title: "فعل درست",
    words: { ask: "کدام فعل جمله را درست می‌کند؟", proper: "کدام اسم خاص است (اسم یک نفر یا یک جای خاص)؟" },
    make: function (rng, n, ctx) {
      var list = [].concat(ctx.done("read-sapling-67") ? VT : [], ctx.done("read-sapling-68") ? VF : []);
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var s = rng.pick([["تبریز", ["شهر", "رود"]], ["سارا", ["دختر", "معلم"]], ["کارون", ["رود", "کوه"]], ["دماوند", ["کوه", "دریا"]]]);
          return { type: "choose", key: "p" + s[0], prompt: ctx.w("proper"), options: rng.shuffle([s[0]].concat(s[1])), answer: s[0] }; } },
        { ok: list.length > 0, make: function () { var v = rng.pick(list); return { type: "choose", key: v[0], show: v[0], prompt: ctx.w("ask"), options: rng.shuffle([v[1]].concat(v[2])), answer: v[1] }; } }
      ]);
    }
  });

  /* read-sapling-p35 «غلط املایی»: three words, one misspelled with a same-sound letter: find it. */
  var MIS = [["صابون", "حیاط", "ظهر", "سبح"], ["عسل", "طوطی", "غذا", "قورباقه"], ["صبحانه", "مدرسه", "ساعت", "حیات"], ["طلوع", "آماده", "غذا", "تلوع"], ["خواهر", "خواب", "خاندن", "خوش"]];
  B.PRACTICE.push({
    id: "read-sapling-p35", subject: "read", level: "sapling", objectives: ["read.sap.21", "read.sap.7"],
    needs: ["read-sapling-53"], emoji: "🔎", title: "غلط املایی",
    words: { ask: "کدام کلمه غلط نوشته شده است؟" },
    make: function (rng, n, ctx) {
      return bank(rng, n, ctx, MIS, function (m) { return m[3]; }, function (m) { return { type: "choose", key: m[3], prompt: ctx.w("ask"), options: rng.shuffle(m), answer: m[3] }; });
    }
  });

  /* read-sapling-p36 «فرهنگ لغت»: a dictionary line read; the meaning that fits a sentence; which word comes first. */
  var DICT = [{ k: "shir", entry: "شیر: ۱. حیوانی بزرگ و قوی. ۲. نوشیدنی سفید. ۳. وسیله‌ای که آب از آن می‌آید.", s: "شیر آشپزخانه چکه می‌کند.", a: "معنی ۳" },
    { k: "shir2", entry: "شیر: ۱. حیوانی بزرگ و قوی. ۲. نوشیدنی سفید. ۳. وسیله‌ای که آب از آن می‌آید.", s: "صبحانه نان و شیر خوردم.", a: "معنی ۲" },
    { k: "tour", entry: "تور: ۱. توری که با آن ماهی می‌گیرند. ۲. سفری که با هم می‌روند.", s: "ماهی‌گیر با تور ماهی گرفت.", a: "معنی ۱" },
    { k: "dast", entry: "دست: ۱. عضوی از بدن. ۲. یک دسته از چیزها، مثل یک دست لباس.", s: "مادر یک دست لباس نو خرید.", a: "معنی ۲" }];
  var FIRSTW = [["بابا", "برف"], ["ماه", "موز"], ["سبد", "سیب"], ["کتاب", "کیف"], ["دریا", "دست"]];
  B.PRACTICE.push({
    id: "read-sapling-p36", subject: "read", level: "sapling", objectives: ["read.sap.30", "read.sap.19"],
    needs: ["read-sapling-80"], emoji: "📕", title: "فرهنگ لغت",
    words: { fit: "در جمله «{s}» کدام معنی درست است؟", first: "در فرهنگ لغت، کدام اول می‌آید؟ (به حرف دوم نگاه کن.)" },
    make: function (rng, n, ctx) {
      return G.collect(rng, n, ctx.again, [
        { ok: true, make: function () { var d = rng.pick(DICT); return { type: "passage", key: d.k, text: d.entry, question: ctx.w("fit", { s: d.s }), options: ["معنی ۱", "معنی ۲", "معنی ۳"].slice(0, d.entry.indexOf("۳.") > 0 ? 3 : 2), answer: d.a }; } },
        { ok: true, make: function () { var f = rng.pick(FIRSTW); return { type: "choose", key: "f" + f[0], prompt: ctx.w("first"), options: rng.shuffle(f), answer: f[0] }; } }
      ]);
    }
  });
})();

/* ---------------- Practice sets: the lessons whose set each generator is in (CURRICULUM.md, "Practice in the course").
   Every Seed, Sprout and Sapling lesson gets at least three different kinds; a generator is listed only where it is open. */
(function () {
  var SETS = {
    "read-seed-p7": ["read-seed-1", "read-seed-3", "read-seed-37"],
    "read-seed-p8": ["read-seed-1", "read-seed-3", "read-seed-13", "read-seed-18", "read-sprout-16"],
    "read-seed-p9": ["read-seed-1", "read-seed-3"],
    "read-seed-p3": ["read-seed-11", "read-seed-4", "read-seed-6", "read-seed-29", "read-seed-5", "read-seed-20", "read-seed-10", "read-seed-36", "read-seed-21", "read-seed-22"],
    "read-seed-p10": ["read-seed-11"],
    "read-seed-p20": ["read-seed-11", "read-seed-4", "read-seed-6", "read-seed-29", "read-seed-19", "read-seed-24", "read-seed-10", "read-seed-36", "read-seed-21", "read-seed-22"],
    "read-seed-p1": ["read-seed-2", "read-seed-15", "read-seed-33", "read-seed-16", "read-seed-17", "read-seed-32", "read-seed-28"],
    "read-seed-p11": ["read-seed-2", "read-seed-15", "read-seed-33", "read-seed-14", "read-seed-16", "read-seed-34", "read-sprout-12", "read-sprout-13"],
    "read-seed-p12": ["read-seed-2", "read-seed-15", "read-seed-33", "read-seed-12", "read-sprout-12", "read-sprout-14"],
    "read-seed-p2": ["read-seed-12", "read-seed-13", "read-seed-18", "read-seed-36"],
    "read-seed-p13": ["read-seed-12", "read-seed-13", "read-seed-18", "read-sprout-16"],
    "read-seed-p14": ["read-seed-14"],
    "read-seed-p15": ["read-seed-14", "read-seed-17", "read-seed-32", "read-seed-31", "read-seed-28", "read-sprout-15", "read-sprout-17"],
    "read-seed-p17": ["read-seed-16", "read-seed-7", "read-seed-23", "read-seed-30", "read-sprout-18"],
    "read-seed-p16": ["read-seed-17", "read-seed-32", "read-seed-7", "read-seed-23", "read-seed-30", "read-seed-31", "read-sprout-15"],
    "read-seed-p19": ["read-seed-4", "read-seed-6", "read-seed-29", "read-seed-19", "read-seed-5", "read-seed-20", "read-seed-10", "read-seed-36", "read-seed-21", "read-sprout-8"],
    "read-seed-p5": ["read-seed-19", "read-seed-24", "read-sprout-20"],
    "read-seed-p21": ["read-seed-5", "read-seed-20", "read-seed-24", "read-seed-8", "read-seed-10", "read-seed-36", "read-seed-22", "read-sprout-9", "read-sprout-20"],
    "read-seed-p4": ["read-seed-7", "read-seed-23", "read-seed-30", "read-seed-31", "read-seed-34"],
    "read-seed-p18": ["read-seed-8", "read-seed-25", "read-seed-26", "read-seed-37", "read-sprout-22"],
    "read-seed-p22": ["read-seed-8", "read-seed-9", "read-seed-27", "read-seed-35", "read-sprout-21"],
    "read-seed-p24": ["read-seed-25", "read-seed-26", "read-seed-37", "read-sprout-22"],
    "read-seed-p23": ["read-seed-25", "read-seed-26", "read-seed-9", "read-seed-27", "read-seed-35", "read-seed-28", "read-sprout-21", "read-sprout-22"],
    "read-seed-p6": ["read-seed-9", "read-seed-27", "read-seed-35", "read-sprout-21"],
    "read-seed-p25": ["read-seed-34", "read-sprout-19"],
    "read-sprout-p1": ["read-sprout-7", "read-sprout-8", "read-sprout-9", "read-sprout-10", "read-sprout-11"],
    "read-sprout-p8": ["read-sprout-7", "read-sprout-9", "read-sprout-11"],
    "read-sprout-p9": ["read-sprout-7", "read-sprout-8", "read-sprout-10", "read-sprout-11"],
    "read-sprout-p10": ["read-sprout-10", "read-sprout-11"],
    "read-sprout-p5": ["read-sprout-12", "read-sprout-13", "read-sprout-14", "read-sprout-15", "read-sprout-17"],
    "read-sprout-p6": ["read-sprout-13", "read-sprout-14", "read-sprout-16"],
    "read-sprout-p11": ["read-sprout-17", "read-sprout-18", "read-sprout-19"],
    "read-sprout-p7": ["read-sprout-18", "read-sprout-19", "read-sprout-20"],
    "read-sprout-p2": ["read-sprout-1", "read-sprout-2", "read-sprout-3", "read-sprout-4", "read-sprout-24", "read-sprout-5", "read-sprout-25", "read-sprout-27"],
    "read-sprout-p12": ["read-sprout-1", "read-sprout-2", "read-sprout-3", "read-sprout-23"],
    "read-sprout-p13": ["read-sprout-1", "read-sprout-2", "read-sprout-23", "read-sprout-4", "read-sprout-27"],
    "read-sprout-p4": ["read-sprout-1", "read-sprout-23"],
    "read-sprout-p14": ["read-sprout-3", "read-sprout-4", "read-sprout-24", "read-sprout-6", "read-sprout-26"],
    "read-sprout-p15": ["read-sprout-24", "read-sprout-26"],
    "read-sprout-p16": ["read-sprout-5", "read-sprout-6", "read-sprout-25", "read-sprout-27"],
    "read-sprout-p17": ["read-sprout-5", "read-sprout-25"],
    "read-sprout-p3": ["read-sprout-6", "read-sprout-26", "read-sprout-27"],
    "read-sapling-p1": ["read-sapling-1", "read-sapling-2", "read-sapling-3", "read-sapling-4", "read-sapling-5", "read-sapling-29", "read-sapling-7", "read-sapling-8", "read-sapling-9", "read-sapling-10", "read-sapling-11", "read-sapling-12", "read-sapling-30", "read-sapling-13", "read-sapling-14", "read-sapling-15", "read-sapling-16", "read-sapling-17", "read-sapling-20", "read-sapling-6", "read-sapling-25", "read-sapling-27", "read-sapling-28", "read-sapling-37", "read-sapling-39", "read-sapling-40", "read-sapling-41", "read-sapling-49", "read-sapling-60", "read-sapling-62", "read-sapling-63", "read-sapling-78", "read-sapling-85"],
    "read-sapling-p10": ["read-sapling-1", "read-sapling-2", "read-sapling-3", "read-sapling-4", "read-sapling-5", "read-sapling-29", "read-sapling-7", "read-sapling-8", "read-sapling-9", "read-sapling-10", "read-sapling-11", "read-sapling-12", "read-sapling-30", "read-sapling-13", "read-sapling-14", "read-sapling-15", "read-sapling-16", "read-sapling-17", "read-sapling-20", "read-sapling-22", "read-sapling-36", "read-sapling-80"],
    "read-sapling-p11": ["read-sapling-1", "read-sapling-2", "read-sapling-3", "read-sapling-4", "read-sapling-5", "read-sapling-29", "read-sapling-7", "read-sapling-8", "read-sapling-9", "read-sapling-10", "read-sapling-11", "read-sapling-12", "read-sapling-30", "read-sapling-13", "read-sapling-14", "read-sapling-15", "read-sapling-16", "read-sapling-17", "read-sapling-20", "read-sapling-18", "read-sapling-19", "read-sapling-21", "read-sapling-6", "read-sapling-27"],
    "read-sapling-p12": ["read-sapling-1", "read-sapling-2", "read-sapling-3", "read-sapling-4", "read-sapling-5", "read-sapling-29", "read-sapling-7", "read-sapling-8", "read-sapling-9", "read-sapling-10", "read-sapling-11", "read-sapling-12", "read-sapling-30", "read-sapling-13", "read-sapling-14", "read-sapling-15", "read-sapling-16", "read-sapling-17", "read-sapling-20", "read-sapling-18", "read-sapling-19", "read-sapling-21", "read-sapling-22", "read-sapling-23", "read-sapling-24", "read-sapling-26", "read-sapling-31", "read-sapling-32", "read-sapling-33", "read-sapling-34", "read-sapling-35", "read-sapling-82"],
    "read-sapling-p13": ["read-sapling-18", "read-sapling-19", "read-sapling-21"],
    "read-sapling-p14": ["read-sapling-6", "read-sapling-25", "read-sapling-38", "read-sapling-50", "read-sapling-52", "read-sapling-73", "read-sapling-74", "read-sapling-75"],
    "read-sapling-p15": ["read-sapling-22", "read-sapling-23", "read-sapling-26", "read-sapling-31", "read-sapling-32", "read-sapling-33", "read-sapling-34", "read-sapling-35", "read-sapling-82", "read-sapling-36"],
    "read-sapling-p16": ["read-sapling-23", "read-sapling-24", "read-sapling-38", "read-sapling-53", "read-sapling-70", "read-sapling-71", "read-sapling-72", "read-sapling-85"],
    "read-sapling-p2": ["read-sapling-24", "read-sapling-38", "read-sapling-53", "read-sapling-70", "read-sapling-71", "read-sapling-72", "read-sapling-85"],
    "read-sapling-p17": ["read-sapling-25", "read-sapling-51", "read-sapling-63"],
    "read-sapling-p3": ["read-sapling-26", "read-sapling-31", "read-sapling-32", "read-sapling-33", "read-sapling-34", "read-sapling-35", "read-sapling-82"],
    "read-sapling-p18": ["read-sapling-27", "read-sapling-28", "read-sapling-37", "read-sapling-46", "read-sapling-47", "read-sapling-48", "read-sapling-60", "read-sapling-74", "read-sapling-75", "read-sapling-79"],
    "read-sapling-p6": ["read-sapling-28", "read-sapling-37", "read-sapling-39", "read-sapling-41", "read-sapling-49", "read-sapling-61", "read-sapling-63", "read-sapling-78"],
    "read-sapling-p19": ["read-sapling-36", "read-sapling-80", "read-sapling-81"],
    "read-sapling-p20": ["read-sapling-39", "read-sapling-40", "read-sapling-62"],
    "read-sapling-p21": ["read-sapling-40", "read-sapling-41", "read-sapling-62"],
    "read-sapling-p5": ["read-sapling-42", "read-sapling-43", "read-sapling-44", "read-sapling-45", "read-sapling-59"],
    "read-sapling-p22": ["read-sapling-42", "read-sapling-43", "read-sapling-44", "read-sapling-45"],
    "read-sapling-p23": ["read-sapling-42", "read-sapling-43", "read-sapling-44", "read-sapling-45", "read-sapling-54", "read-sapling-55", "read-sapling-56", "read-sapling-57"],
    "read-sapling-p7": ["read-sapling-46", "read-sapling-47", "read-sapling-48", "read-sapling-58", "read-sapling-79", "read-sapling-83", "read-sapling-87", "read-sapling-88"],
    "read-sapling-p24": ["read-sapling-46", "read-sapling-47", "read-sapling-48", "read-sapling-58", "read-sapling-76", "read-sapling-77", "read-sapling-79", "read-sapling-88"],
    "read-sapling-p29": ["read-sapling-47", "read-sapling-59", "read-sapling-81", "read-sapling-83"],
    "read-sapling-p25": ["read-sapling-49", "read-sapling-78"],
    "read-sapling-p26": ["read-sapling-50", "read-sapling-51", "read-sapling-52", "read-sapling-59", "read-sapling-73", "read-sapling-76", "read-sapling-77", "read-sapling-86"],
    "read-sapling-p9": ["read-sapling-50", "read-sapling-51", "read-sapling-52", "read-sapling-61", "read-sapling-73", "read-sapling-74", "read-sapling-75", "read-sapling-76", "read-sapling-77", "read-sapling-84", "read-sapling-86", "read-sapling-87", "read-sapling-89"],
    "read-sapling-p35": ["read-sapling-53", "read-sapling-70", "read-sapling-71", "read-sapling-72"],
    "read-sapling-p4": ["read-sapling-54", "read-sapling-55", "read-sapling-56", "read-sapling-57", "read-sapling-85"],
    "read-sapling-p27": ["read-sapling-54", "read-sapling-55", "read-sapling-56", "read-sapling-57"],
    "read-sapling-p28": ["read-sapling-58", "read-sapling-83", "read-sapling-84", "read-sapling-86", "read-sapling-87", "read-sapling-88", "read-sapling-89"],
    "read-sapling-p30": ["read-sapling-60", "read-sapling-61", "read-sapling-84", "read-sapling-89"],
    "read-sapling-p8": ["read-sapling-64", "read-sapling-65", "read-sapling-66", "read-sapling-67", "read-sapling-68", "read-sapling-69", "read-sapling-85"],
    "read-sapling-p32": ["read-sapling-64", "read-sapling-65", "read-sapling-66", "read-sapling-67", "read-sapling-68", "read-sapling-69"],
    "read-sapling-p33": ["read-sapling-64", "read-sapling-65", "read-sapling-66", "read-sapling-67", "read-sapling-68", "read-sapling-69"],
    "read-sapling-p36": ["read-sapling-80", "read-sapling-81"]
  };
  B.PRACTICE.forEach(function (g) { if (SETS[g.id]) g.lessons = SETS[g.id]; });
})();
