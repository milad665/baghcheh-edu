/* باغچه — practice generators for علوم (subject science). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/science.js. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  var L = function (n) { return "science-" + n; };

  /* ---------- shared helpers ---------- */

  // The kinds of item open in this context: each kind has an `after` lesson (or a list: open after any of them).
  function open(ctx, kinds) {
    return kinds.filter(function (k) {
      var a = [].concat(k.after);
      return a.some(function (id) { return ctx.done(L(id)); });
    });
  }

  /* Up to n items from `kinds` (each { key, … }), keys missed last time first, then the rest in a fresh order, and
     again round the list if n is larger (make(kind, round) can vary a kind the second time round). */
  function plan(rng, n, ctx, kinds) {
    if (!kinds.length) return [];
    var byKey = {};
    kinds.forEach(function (k) { byKey[k.key] = k; });
    var first = ctx.again.filter(function (k) { return byKey[k]; }).map(function (k) { return byKey[k]; });
    var rest = rng.shuffle(kinds.filter(function (k) { return first.indexOf(k) === -1; }));
    var list = first.concat(rest), out = [];
    for (var i = 0; out.length < n && i < list.length * 2; i++) out.push({ kind: list[i % list.length], round: Math.floor(i / list.length) });
    return out;
  }

  // A sort step: pick `per` things for each basket from a bank of [key, pic, value] (value is the basket).
  function sortStep(rng, ctx, key, values, bank, per, prompt) {
    var n = ctx.w("n"), b = ctx.w("b");
    var items = [];
    values.forEach(function (v) {
      rng.sample(bank.filter(function (t) { return t[2] === v; }), per).forEach(function (t) {
        var it = { say: n[t[0]], basket: v };
        if (t[1]) it.pic = t[1]; else it.label = n[t[0]];
        items.push(it);
      });
    });
    items = rng.shuffle(items);
    return { type: "sort", key: key, prompt: prompt, say: prompt,
      baskets: values.map(function (v) { return { label: b[v], value: v }; }), items: items };
  }

  // Three number options: the answer and two near it (by d), all from lo to hi.
  function near(rng, x, d, lo, hi) {
    var c = [x - d, x + d, x - 2 * d, x + 2 * d].filter(function (v) { return v >= lo && v <= hi; });
    return rng.shuffle([x].concat(c.slice(0, 2)));
  }

  // A choose step whose options are pictures: the answer and up to two others.
  function picChoose(rng, key, prompt, answer, others) {
    return { type: "choose", key: key, prompt: prompt, say: prompt, options: rng.shuffle([answer].concat(rng.sample(others, 2))), answer: answer };
  }

  /* ================= Seed ================= */

  /* «این‌ور یا آن‌ور؟» — science-seed-p1. Sort a few pictures, said aloud, into two baskets: living or not (after
     seed-1), hard or soft (seed-9), weather of a sunny or a rainy day (seed-5), day or night (seed-15), hot or cold
     weather (seed-17), heavy or light (seed-18). The key is the way of sorting. */
  var SEED_SORTS = [
    { key: "living", after: "seed-1", values: ["alive", "notalive"], bank: [
      ["cat", "🐈", "alive"], ["tree", "🌳", "alive"], ["fish", "🐟", "alive"], ["bird", "🐦", "alive"], ["flower", "🌸", "alive"], ["ant", "🐜", "alive"], ["cow", "🐄", "alive"],
      ["stone", "🪨", "notalive"], ["ball", "⚽", "notalive"], ["chair", "🪑", "notalive"], ["car", "🚗", "notalive"], ["teddy", "🧸", "notalive"], ["spoon", "🥄", "notalive"], ["book", "📕", "notalive"]] },
    { key: "hardsoft", after: "seed-9", values: ["hard", "soft"], bank: [
      ["stone", "🪨", "hard"], ["spoon", "🥄", "hard"], ["key", "🔑", "hard"], ["block", "🧱", "hard"], ["walnut", "🌰", "hard"],
      ["teddy", "🧸", "soft"], ["sponge", "🧽", "soft"], ["wool", "🧶", "soft"], ["scarf", "🧣", "soft"], ["bread", "🍞", "soft"]] },
    { key: "weather", after: "seed-5", values: ["sunny", "rainy"], bank: [
      ["sunhat", "👒", "sunny"], ["sunglasses", "🕶️", "sunny"], ["sun", "☀️", "sunny"], ["shorts", "🩳", "sunny"],
      ["umbrella", "☂️", "rainy"], ["boots", "🥾", "rainy"], ["cloud", "🌧️", "rainy"], ["puddle", "💧", "rainy"]] },
    { key: "daynight", after: "seed-15", values: ["day", "night"], bank: [
      ["sun", "☀️", "day"], ["rainbow", "🌈", "day"], ["rooster", "🐓", "day"], ["butterfly", "🦋", "day"],
      ["moon", "🌙", "night"], ["star", "⭐", "night"], ["owl", "🦉", "night"], ["bed", "🛏️", "night"]] },
    { key: "hotcold", after: "seed-17", values: ["hot", "cold"], bank: [
      ["shorts", "🩳", "hot"], ["icecream", "🍦", "hot"], ["sunhat", "👒", "hot"], ["fan", "🪭", "hot"],
      ["gloves", "🧤", "cold"], ["scarf", "🧣", "cold"], ["snowman", "⛄", "cold"], ["coat", "🧥", "cold"]] },
    { key: "heavylight", after: "seed-18", values: ["heavy", "light"], bank: [
      ["watermelon", "🍉", "heavy"], ["car", "🚗", "heavy"], ["stone", "🪨", "heavy"], ["elephant", "🐘", "heavy"], ["table", "🪑", "heavy"],
      ["feather", "🪶", "light"], ["leaf", "🍃", "light"], ["balloon", "🎈", "light"], ["paper", "📄", "light"]] }
  ];
  B.PRACTICE.push({
    id: "science-seed-p1", subject: "science", level: "seed",
    objectives: ["science.seed.1", "science.seed.5", "science.seed.7", "science.seed.11"],
    needs: [L("seed-1")],
    lessons: [L("seed-1"), L("seed-7"), L("seed-9"), L("seed-10"), L("seed-14"), L("seed-5"), L("seed-15"), L("seed-17"), L("seed-18"), L("seed-23")], emoji: "🧺", title: "این‌ور یا آن‌ور؟",
    words: {
      ask: { living: "کدام زنده است و کدام زنده نیست؟", hardsoft: "کدام سفت است و کدام نرم؟", weather: "کدام برای روز آفتابی است و کدام برای روز بارانی؟",
        daynight: "کدام مال روز است و کدام مال شب؟", hotcold: "کدام برای هوای گرم است و کدام برای هوای سرد؟", heavylight: "کدام سنگین است و کدام سبک؟" },
      b: { alive: "زنده", notalive: "زنده نیست", hard: "سفت", soft: "نرم", sunny: "آفتابی", rainy: "بارانی", day: "روز", night: "شب", hot: "گرم", cold: "سرد", heavy: "سنگین", light: "سبک" },
      n: { cat: "گربه", tree: "درخت", fish: "ماهی", bird: "پرنده", flower: "گل", ant: "مورچه", cow: "گاو", stone: "سنگ", ball: "توپ", chair: "صندلی", car: "ماشین",
        teddy: "خرس عروسکی", spoon: "قاشق", book: "کتاب", key: "کلید", block: "آجر", walnut: "گردو", sponge: "اسفنج", wool: "کلاف کاموا", scarf: "شال گردن", bread: "نان",
        sunhat: "کلاه آفتابی", sunglasses: "عینک آفتابی", sun: "خورشید", shorts: "شلوارک", umbrella: "چتر", boots: "چکمه", cloud: "ابر باران‌زا", puddle: "چاله آب",
        rainbow: "رنگین‌کمان", rooster: "خروس", butterfly: "پروانه", moon: "ماه", star: "ستاره", owl: "جغد", bed: "تخت خواب", icecream: "بستنی", fan: "بادبزن",
        gloves: "دستکش", snowman: "آدم‌برفی", coat: "کاپشن", watermelon: "هندوانه", elephant: "فیل", table: "میز", feather: "پر", leaf: "برگ", balloon: "بادکنک", paper: "کاغذ" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SEED_SORTS)).map(function (p) {
        return sortStep(rng, ctx, p.kind.key, p.kind.values, p.kind.bank, 2, ctx.w("ask")[p.kind.key]);
      });
    }
  });

  /* «هر کدام با جفتش» — science-seed-p2. Pairs of three animals with their home or food (after seed-4), their young
     (seed-12) or their sound (seed-21). The key is the kind of pair. */
  var ANIMALS = [
    { k: "bee", pic: "🐝", home: ["hive", ""], food: ["flower", "🌸"] },
    { k: "bird", pic: "🐦", home: ["nest", ""], food: ["seeds", "🌾"], sound: "tweet" },
    { k: "fish", pic: "🐟", home: ["water", "💧"] },
    { k: "rabbit", pic: "🐇", home: ["burrow", ""], food: ["carrot", "🥕"] },
    { k: "cow", pic: "🐄", home: ["stable", ""], food: ["grass", "🌿"], young: "calf", sound: "moo" },
    { k: "squirrel", pic: "🐿️", home: ["treehole", "🌳"], food: ["nut", "🌰"] },
    { k: "hen", pic: "🐔", young: "chick", sound: "cluck" },
    { k: "sheep", pic: "🐑", young: "lamb", sound: "baa" },
    { k: "cat", pic: "🐈", young: "kitten", sound: "meow" },
    { k: "frog", pic: "🐸", young: "tadpole", sound: "croak" },
    { k: "dog", pic: "🐕", young: "puppy", sound: "woof" },
    { k: "horse", pic: "🐎", young: "foal", food: ["hay", "🌾"] }
  ];
  var RELATIONS = [{ key: "home", after: "seed-4" }, { key: "food", after: "seed-4" }, { key: "young", after: "seed-12" }, { key: "sound", after: "seed-21" }];
  B.PRACTICE.push({
    id: "science-seed-p2", subject: "science", level: "seed", objectives: ["science.seed.4", "science.seed.14"],
    needs: [L("seed-4")],
    lessons: [L("seed-4"), L("seed-12"), L("seed-13"), L("seed-14"), L("seed-21"), L("seed-23")], emoji: "🐾", title: "هر کدام با جفتش",
    words: {
      ask: { home: "هر حیوان را به خانه‌اش برسان.", food: "هر حیوان را به غذایش برسان.", young: "هر حیوان را به بچه‌اش برسان.", sound: "هر حیوان را به صدایش برسان." },
      n: { bee: "زنبور", bird: "پرنده", fish: "ماهی", rabbit: "خرگوش", cow: "گاو", squirrel: "سنجاب", hen: "مرغ", sheep: "گوسفند", cat: "گربه", frog: "قورباغه", dog: "سگ", horse: "اسب",
        hive: "کندو", nest: "لانه روی درخت", water: "آب", burrow: "لانه زیر زمین", stable: "طویله", treehole: "سوراخ تنه درخت",
        flower: "گل", seeds: "دانه", carrot: "هویج", grass: "علف", nut: "گردو", hay: "یونجه",
        calf: "گوساله", chick: "جوجه", lamb: "بره", kitten: "بچه‌گربه", tadpole: "بچه‌قورباغه", puppy: "توله‌سگ", foal: "کره‌اسب",
        tweet: "جیک‌جیک", moo: "ماااا", cluck: "قُدقُد", baa: "بع‌بع", meow: "میو", croak: "قور‌قور", woof: "هاپ‌هاپ" }
    },
    make: function (rng, n, ctx) {
      var nm = ctx.w("n");
      return plan(rng, n, ctx, open(ctx, RELATIONS)).map(function (p) {
        var rel = p.kind.key;
        var three = rng.sample(ANIMALS.filter(function (a) { return a[rel]; }), 3);
        var pairs = three.map(function (a) {
          var v = a[rel], k = typeof v === "string" ? v : v[0], pic = typeof v === "string" ? "" : v[1];
          var other = { label: nm[k], say: nm[k] };
          if (pic) other.pic = pic;
          return [{ pic: a.pic, say: nm[a.k] }, other];
        });
        return { type: "pairs", key: rel, prompt: ctx.w("ask")[rel], say: ctx.w("ask")[rel], pairs: pairs };
      });
    }
  });

  /* Guess and see: one thing at a time on the `test` stage (not scored: a guess is never wrong). Shared by
     science-seed-p3 and science-sprout-p3. yes: it floats / the magnet pulls it / it rolls / it keeps water out. */
  var GUESS = {
    roll: { after: "seed-19", bank: [["ball", "⚽", 1], ["orange", "🍊", 1], ["apple", "🍎", 1], ["tin", "🥫", 1], ["marble", "🔮", 1],
      ["book", "📕", 0], ["block", "🧱", 0], ["box", "📦", 0], ["eraser", "", 0], ["spoon", "🥄", 0]] },
    float: { after: "sprout-3", bank: [["wood", "🪵", 1], ["leaf", "🍃", 1], ["duck", "🦆", 1], ["ball", "⚽", 1], ["apple", "🍎", 1], ["cork", "", 1],
      ["stone", "🪨", 0], ["key", "🔑", 0], ["coin", "🪙", 0], ["spoon", "🥄", 0], ["marble", "🔮", 0]] },
    magnet: { after: "sapling-2", bank: [["clip", "📎", 1], ["nail", "🔩", 1], ["pin", "🧷", 1],
      ["paper", "📄", 0], ["pencil", "✏️", 0], ["cup", "🥤", 0], ["wood", "🪵", 0], ["eraser", "", 0], ["leaf", "🍃", 0]] },
    waterproof: { after: "sprout-26", bank: [["raincoat", "🧥", 1], ["umbrella", "☂️", 1], ["bag", "🛍️", 1], ["foil", "", 1],
      ["tissue", "🧻", 0], ["towel", "", 0], ["paper", "📄", 0], ["sock", "🧦", 0]] }
  };
  var GUESS_NAMES = { ball: "توپ", orange: "پرتقال", apple: "سیب", tin: "قوطی کنسرو خوابیده", marble: "تیله", book: "کتاب", block: "آجر", box: "جعبه", eraser: "پاک‌کن",
    spoon: "قاشق", wood: "تکه چوب", leaf: "برگ", duck: "اردک پلاستیکی", cork: "چوب‌پنبه", stone: "سنگ", key: "کلید", coin: "سکه", clip: "گیره کاغذ", nail: "پیچ آهنی",
    pin: "سنجاق قفلی", paper: "کاغذ", pencil: "مداد", cup: "لیوان پلاستیکی", raincoat: "بارانی", umbrella: "چتر", bag: "کیسه پلاستیکی", foil: "فویل", tissue: "دستمال کاغذی",
    towel: "حوله", sock: "جوراب نخی" };
  function guessItems(rng, n, ctx, kinds) {
    var nm = ctx.w("n"), all = [];
    open(ctx, kinds.map(function (k) { return { key: k, after: GUESS[k].after }; })).forEach(function (k) {
      GUESS[k.key].bank.forEach(function (t) { all.push({ key: k.key + ":" + t[0], kind: k.key, t: t }); });
    });
    return plan(rng, n, ctx, all).filter(function (p) { return p.round === 0; }).map(function (p) {
      var t = p.kind.t, item = { pic: t[1] || "❔", say: nm[t[0]], yes: !!t[2] };
      return { type: "test", key: p.kind.key, kind: p.kind.kind, prompt: ctx.w("guess"), items: [item] };
    });
  }

  B.PRACTICE.push({
    id: "science-seed-p3", subject: "science", level: "seed", objectives: ["science.seed.9"],
    needs: [L("seed-19")],
    lessons: [L("seed-19"), L("seed-20"), L("seed-23"), L("seed-24")], emoji: "🔮", title: "حدس بزن، ببین",
    words: { guess: "اول حدس بزن، بعد ببین چه می‌شود.", n: GUESS_NAMES },
    make: function (rng, n, ctx) { return guessItems(rng, n, ctx, ["roll", "float", "magnet"]); }
  });

  /* «کلمه‌های علوم» — science-seed-p4. A word is said and shown; pick its picture. Living (seed-1), the senses
     (seed-2), plants (seed-3, seed-11), weather (seed-5), the sky (seed-15). The key is the word. */
  var SEED_WORDS = [
    { key: "living", after: "seed-1", a: "🐈", o: ["🪨", "🧸", "⚽"] },
    { key: "see", after: "seed-2", a: "👀", o: ["👂", "👃", "👅"] }, { key: "hear", after: "seed-2", a: "👂", o: ["👀", "👃", "✋"] },
    { key: "smell", after: "seed-2", a: "👃", o: ["👀", "👂", "👅"] }, { key: "taste", after: "seed-2", a: "👅", o: ["👂", "👀", "✋"] },
    { key: "touch", after: "seed-2", a: "✋", o: ["👂", "👃", "👅"] },
    { key: "seed", after: "seed-3", a: "🌰", o: ["🍃", "🌸", "🍎"] }, { key: "sprout", after: "seed-3", a: "🌱", o: ["🌳", "🌰", "🍂"] },
    { key: "flower", after: "seed-11", a: "🌸", o: ["🍃", "🌰", "🌵"] }, { key: "leaf", after: "seed-11", a: "🍃", o: ["🌸", "🌰", "🍎"] },
    { key: "fruit", after: "seed-11", a: "🍎", o: ["🍃", "🌱", "🌸"] },
    { key: "sunny", after: "seed-5", a: "☀️", o: ["🌧️", "❄️", "☁️"] }, { key: "rainy", after: "seed-5", a: "🌧️", o: ["☀️", "❄️", "🌈"] },
    { key: "snowy", after: "seed-5", a: "❄️", o: ["☀️", "🌧️", "🌈"] }, { key: "cloudy", after: "seed-5", a: "☁️", o: ["☀️", "❄️", "🌈"] },
    { key: "moon", after: "seed-15", a: "🌙", o: ["☀️", "⭐", "☁️"] }, { key: "star", after: "seed-15", a: "⭐", o: ["🌙", "☀️", "🌈"] }
  ];
  B.PRACTICE.push({
    id: "science-seed-p4", subject: "science", level: "seed", objectives: ["science.seed.2", "science.seed.8"],
    needs: [L("seed-1")],
    lessons: [L("seed-1"), L("seed-2"), L("seed-8"), L("seed-10"), L("seed-3"), L("seed-11"), L("seed-5"), L("seed-15"), L("seed-24")], emoji: "🔤", title: "کلمه‌های علوم",
    words: {
      ask: "کدام عکس «{w}» است؟",
      w: { living: "زنده", see: "دیدن", hear: "شنیدن", smell: "بو کردن", taste: "مزه کردن", touch: "لمس کردن", seed: "دانه", sprout: "جوانه", flower: "گل", leaf: "برگ",
        fruit: "میوه", sunny: "آفتابی", rainy: "بارانی", snowy: "برفی", cloudy: "ابری", moon: "ماه", star: "ستاره" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SEED_WORDS)).filter(function (p) { return p.round === 0; }).map(function (p) {
        return picChoose(rng, p.kind.key, ctx.w("ask", { w: ctx.w("w")[p.kind.key] }), p.kind.a, p.kind.o);
      });
    }
  });

  /* ================= Sprout ================= */

  /* «جانوران و گیاهان ایران» — science-sprout-p1. Sort animals and plants of Iran: how they move (sprout-10), what
     covers them (sprout-11), what they eat (sprout-12), which part of a plant we eat (sprout-1, sprout-15), young
     or grown (sprout-42). Two or three baskets from the open way of sorting; the key is the way. */
  var LIFE = [
    // [key, pic, move, cover, food]
    ["cheetah", "🐆", "walk", "fur", "meat"], ["maral", "🦌", "walk", "fur", "plant"], ["wildgoat", "🐐", "walk", "fur", "plant"], ["wolf", "🐺", "walk", "fur", "meat"],
    ["fox", "🦊", "walk", "fur", "meat"], ["rabbit", "🐇", "walk", "fur", "plant"], ["squirrel", "🐿️", "walk", "fur", "plant"], ["camel", "🐫", "walk", "fur", "plant"],
    ["horse", "🐎", "walk", "fur", "plant"], ["cow", "🐄", "walk", "fur", "plant"], ["sheep", "🐑", "walk", "fur", "plant"], ["cat", "🐈", "walk", "fur", "meat"],
    ["bear", "🐻", "walk", "fur", null], ["mouse", "🐭", "walk", "fur", null], ["owl", "🦉", "fly", "feather", "meat"], ["pigeon", "🕊️", "fly", "feather", "plant"],
    ["sparrow", "🐦", "fly", "feather", null], ["parrot", "🦜", "fly", "feather", "plant"], ["rooster", "🐓", "walk", "feather", null], ["duck", "🦆", "swim", "feather", null],
    ["butterfly", "🦋", "fly", null, "plant"], ["bee", "🐝", "fly", null, "plant"], ["fish", "🐟", "swim", "scale", null], ["sturgeon", "", "swim", "scale", null],
    ["shark", "🦈", "swim", "scale", "meat"], ["dolphin", "🐬", "swim", null, "meat"], ["snake", "🐍", "crawl", "scale", "meat"], ["lizard", "🦎", "walk", "scale", "meat"],
    ["turtle", "🐢", "walk", null, "plant"], ["frog", "🐸", "swim", null, "meat"], ["snail", "🐌", "crawl", null, "plant"], ["worm", "", "crawl", null, null]
  ];
  var EAT = [["carrot", "🥕", "root"], ["radish", "", "root"], ["beet", "", "root"], ["lettuce", "🥬", "leaf"], ["spinach", "", "leaf"], ["herbs", "🌿", "leaf"],
    ["apple", "🍎", "fruit"], ["pomegranate", "", "fruit"], ["grapes", "🍇", "fruit"], ["melon", "🍈", "fruit"], ["cucumber", "🥒", "fruit"], ["tomato", "🍅", "fruit"]];
  var YOUNG = [["chick", "🐥", "young"], ["lamb", "", "young"], ["kitten", "", "young"], ["calf", "", "young"], ["tadpole", "", "young"], ["seedling", "🌱", "young"],
    ["hen", "🐔", "grown"], ["sheep", "🐑", "grown"], ["cat", "🐈", "grown"], ["cow", "🐄", "grown"], ["frog", "🐸", "grown"], ["tree", "🌳", "grown"]];
  var SPROUT_SORTS = [
    { key: "move", after: "sprout-10", col: 2, values: ["walk", "fly", "swim", "crawl"] },
    { key: "cover", after: "sprout-11", col: 3, values: ["fur", "feather", "scale"] },
    { key: "food", after: "sprout-12", col: 4, values: ["plant", "meat"] },
    { key: "eat", after: ["sprout-1", "sprout-15"], values: ["root", "leaf", "fruit"], bank: EAT },
    { key: "young", after: "sprout-42", values: ["young", "grown"], bank: YOUNG }
  ];
  B.PRACTICE.push({
    id: "science-sprout-p1", subject: "science", level: "sprout", objectives: ["science.spr.3", "science.spr.4", "science.spr.22"],
    needs: [L("sprout-10")],
    lessons: [L("sprout-10"), L("sprout-11"), L("sprout-12"), L("sprout-13"), L("sprout-1"), L("sprout-15"), L("sprout-16"), L("sprout-42")], emoji: "🦌", title: "جانوران و گیاهان ایران",
    words: {
      ask: { move: "هر جانور چطور جابه‌جا می‌شود؟", cover: "بدن هر جانور با چه پوشیده شده؟", food: "کدام گیاه‌خوار است و کدام گوشت‌خوار؟",
        eat: "از هر گیاه کدام بخشش را می‌خوریم؟", young: "کدام بچه است و کدام بزرگ؟" },
      b: { walk: "راه می‌رود", fly: "پرواز می‌کند", swim: "شنا می‌کند", crawl: "می‌خزد", fur: "مو", feather: "پر", scale: "فلس", plant: "گیاه‌خوار", meat: "گوشت‌خوار",
        root: "ریشه", leaf: "برگ", fruit: "میوه", young: "بچه", grown: "بزرگ" },
      n: { cheetah: "یوزپلنگ", maral: "مرال", wildgoat: "بز کوهی", wolf: "گرگ", fox: "روباه", rabbit: "خرگوش", squirrel: "سنجاب", camel: "شتر", horse: "اسب",
        cow: "گاو", sheep: "گوسفند", cat: "گربه", bear: "خرس", mouse: "موش", owl: "جغد", pigeon: "کبوتر", sparrow: "گنجشک", parrot: "طوطی", rooster: "خروس",
        duck: "اردک", butterfly: "پروانه", bee: "زنبور", fish: "ماهی", sturgeon: "ماهی خاویاری", shark: "کوسه", dolphin: "دلفین", snake: "مار", lizard: "مارمولک",
        turtle: "لاک‌پشت", frog: "قورباغه", snail: "حلزون", worm: "کرم خاکی",
        carrot: "هویج", radish: "تربچه", beet: "چغندر", lettuce: "کاهو", spinach: "اسفناج", herbs: "سبزی خوردن", apple: "سیب", pomegranate: "انار", grapes: "انگور",
        melon: "خربزه", cucumber: "خیار", tomato: "گوجه‌فرنگی", chick: "جوجه", lamb: "بره", kitten: "بچه‌گربه", calf: "گوساله", tadpole: "بچه‌قورباغه",
        seedling: "نهال", hen: "مرغ", tree: "درخت" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SPROUT_SORTS)).map(function (p) {
        var k = p.kind, bank = k.bank || LIFE.filter(function (t) { return t[k.col]; }).map(function (t) { return [t[0], t[1], t[k.col]]; });
        var values = k.values.length > 3 ? rng.sample(k.values, 3) : k.values;
        return sortStep(rng, ctx, k.key, values, bank, values.length > 2 ? 2 : 3, ctx.w("ask")[k.key]);
      });
    }
  });

  /* «جنس و ویژگی» — science-sprout-p2. Sort things by material (sprout-6), see-through or not (sprout-37),
     shaking to make a sound or still (sprout-38), solid or liquid (sprout-25). */
  var SPROUT_STUFF = [
    { key: "material", after: "sprout-6", values: ["wood", "metal", "plastic", "glass", "cloth"], bank: [
      ["spoonwood", "🥄", "wood"], ["chair", "🪑", "wood"], ["pencil", "✏️", "wood"], ["key", "🔑", "metal"], ["coin", "🪙", "metal"], ["pot", "", "metal"],
      ["bottle", "🧴", "plastic"], ["bucket", "🪣", "plastic"], ["cup", "🥤", "plastic"], ["window", "🪟", "glass"], ["jar", "", "glass"], ["glasses", "👓", "glass"],
      ["shirt", "👕", "cloth"], ["sock", "🧦", "cloth"], ["scarf", "🧣", "cloth"]] },
    { key: "seethrough", after: "sprout-37", values: ["clear", "notclear"], bank: [
      ["window", "🪟", "clear"], ["water", "💧", "clear"], ["glasses", "👓", "clear"], ["jar", "", "clear"],
      ["book", "📕", "notclear"], ["door", "🚪", "notclear"], ["block", "🧱", "notclear"], ["chair", "🪑", "notclear"]] },
    { key: "shake", after: "sprout-38", values: ["shakes", "still"], bank: [
      ["drum", "🥁", "shakes"], ["bell", "🔔", "shakes"], ["guitar", "🎸", "shakes"], ["whistle", "", "shakes"],
      ["book", "📕", "still"], ["pillow", "", "still"], ["stone", "🪨", "still"], ["sleepcat", "🐈", "still"]] },
    { key: "state", after: "sprout-25", values: ["solid", "liquid"], bank: [
      ["ice", "🧊", "solid"], ["stone", "🪨", "solid"], ["chair", "🪑", "solid"], ["key", "🔑", "solid"],
      ["water", "💧", "liquid"], ["milk", "🥛", "liquid"], ["juice", "🧃", "liquid"], ["oil", "", "liquid"]] }
  ];
  B.PRACTICE.push({
    id: "science-sprout-p2", subject: "science", level: "sprout", objectives: ["science.spr.8", "science.spr.11", "science.spr.20"],
    needs: [L("sprout-25")],
    lessons: [L("sprout-25"), L("sprout-37"), L("sprout-38"), L("sprout-45"), L("sprout-6"), L("sprout-26"), L("sprout-27")], emoji: "🪵", title: "جنس و ویژگی",
    words: {
      ask: { material: "هر چیز از چه جنسی است؟", seethrough: "از کدام می‌شود آن طرف را دید و از کدام نه؟", shake: "کدام می‌لرزد و صدا می‌دهد و کدام نه؟", state: "کدام جامد است و کدام مایع؟" },
      b: { wood: "چوب", metal: "فلز", plastic: "پلاستیک", glass: "شیشه", cloth: "پارچه", clear: "پشتش دیده می‌شود", notclear: "پشتش دیده نمی‌شود",
        shakes: "می‌لرزد و صدا می‌دهد", still: "صدا نمی‌دهد", solid: "جامد", liquid: "مایع" },
      n: { spoonwood: "قاشق چوبی", chair: "صندلی چوبی", pencil: "مداد", key: "کلید", coin: "سکه", pot: "قابلمه", bottle: "بطری پلاستیکی", bucket: "سطل پلاستیکی",
        cup: "لیوان پلاستیکی", window: "شیشه پنجره", jar: "شیشه مربا", glasses: "عینک", shirt: "پیراهن", sock: "جوراب", scarf: "شال گردن", water: "آب", book: "کتاب",
        door: "در چوبی", block: "آجر", drum: "طبل زده‌شده", bell: "زنگ زده‌شده", guitar: "سیم گیتار کشیده‌شده", whistle: "سوت در حال سوت زدن", pillow: "بالش",
        stone: "سنگ", sleepcat: "گربه خواب", ice: "یخ", milk: "شیر", juice: "آبمیوه", oil: "روغن" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SPROUT_STUFF)).map(function (p) {
        var k = p.kind, values = k.values.length > 3 ? rng.sample(k.values, 3) : k.values;
        return sortStep(rng, ctx, k.key, values, k.bank, values.length > 2 ? 2 : 3, ctx.w("ask")[k.key]);
      });
    }
  });

  B.PRACTICE.push({
    id: "science-sprout-p3", subject: "science", level: "sprout", objectives: ["science.spr.1", "science.spr.10"],
    needs: [L("sprout-3")],
    lessons: [L("sprout-3"), L("sprout-6"), L("sprout-26"), L("sprout-27")], emoji: "🛟", title: "حدس بزن، ببین",
    words: { guess: "اول حدس بزن، بعد ببین چه می‌شود.", n: GUESS_NAMES },
    make: function (rng, n, ctx) { return guessItems(rng, n, ctx, ["float", "roll", "waterproof", "magnet"]); }
  });

  /* «آسمان، هوا و فصل‌ها» — science-sprout-p4. Put the times of day in order (sprout-4), the moon's shapes (sprout-32),
     the seasons, or continue a pattern of seasons (sprout-5); read a week of weather in a chart (sprout-40). */
  var DAY = [["morning", "🌅"], ["noon", "☀️"], ["evening", "🌇"], ["night", "🌙"]];
  var MOON = [["new", "🌑"], ["crescent", "🌒"], ["half", "🌓"], ["gibbous", "🌔"], ["full", "🌕"]];
  var SEASONS = [["spring", "🌸"], ["summer", "☀️"], ["autumn", "🍂"], ["winter", "⛄"]];
  var SKY = [
    { key: "day", after: "sprout-4" }, { key: "moon", after: "sprout-32" }, { key: "seasons", after: "sprout-5" },
    { key: "seasonpattern", after: "sprout-5" }, { key: "week", after: "sprout-40" }
  ];
  B.PRACTICE.push({
    id: "science-sprout-p4", subject: "science", level: "sprout", objectives: ["science.spr.12", "science.spr.13", "science.spr.21"],
    needs: [L("sprout-4")],
    lessons: [L("sprout-4"), L("sprout-32"), L("sprout-5"), L("sprout-34")], emoji: "🌗", title: "آسمان، هوا و فصل‌ها",
    words: {
      day: "روز را از صبح تا شب بچین.", moon: "شکل‌های ماه را از ماه نو تا ماه کامل بچین.", seasons: "فصل‌ها را از {first} به ترتیب بچین.",
      pattern: "فصل‌ها پشت سر هم می‌آیند. جای خالی چه فصلی است؟", week: "هوای یک هفته", weekAsk: "این هفته چند روز {w} بود؟",
      n: { morning: "صبح", noon: "ظهر", evening: "عصر", night: "شب", new: "ماه نو", crescent: "هلال", half: "نیمه ماه", gibbous: "ماه پر", full: "ماه کامل",
        spring: "بهار", summer: "تابستان", autumn: "پاییز", winter: "زمستان", sunny: "آفتابی", cloudy: "ابری", rainy: "بارانی" }
    },
    make: function (rng, n, ctx) {
      var nm = ctx.w("n");
      var face = function (t) { return { pic: t[1], label: nm[t[0]], say: nm[t[0]] }; };
      // Only the kinds that come out different each time are made twice in a session.
      return plan(rng, n, ctx, open(ctx, SKY)).filter(function (p) { return p.round === 0 || /^(seasons|seasonpattern|week)$/.test(p.kind.key); }).map(function (p) {
        var k = p.kind.key;
        if (k === "day") return { type: "order", key: k, prompt: ctx.w("day"), say: ctx.w("day"), numbered: true, items: DAY.map(face) };
        if (k === "moon") return { type: "order", key: k, prompt: ctx.w("moon"), say: ctx.w("moon"), numbered: true, items: MOON.map(face) };
        if (k === "seasons") {
          var s = rng.int(0, 3), list = SEASONS.slice(s).concat(SEASONS.slice(0, s));
          return { type: "order", key: k, prompt: ctx.w("seasons", { first: nm[list[0][0]] }), say: ctx.w("seasons", { first: nm[list[0][0]] }), numbered: true, items: list.map(face) };
        }
        if (k === "seasonpattern") {
          var st = rng.int(0, 3), seq = [];
          for (var i = 0; i < 6; i++) seq.push(SEASONS[(st + i) % 4][1]);
          var blank = rng.int(2, 5);
          return { type: "pattern", key: k, prompt: ctx.w("pattern"), say: ctx.w("pattern"), seq: seq, blanks: [blank], options: rng.shuffle(SEASONS.map(function (x) { return x[1]; })) };
        }
        var sun = rng.int(1, 5), cloud = rng.int(0, 6 - sun), rain = 7 - sun - cloud;
        var rows = [{ label: nm.sunny, pic: "☀️", n: sun }, { label: nm.cloudy, pic: "☁️", n: cloud }, { label: nm.rainy, pic: "🌧️", n: rain }];
        var r = rng.pick(rows), opts = rng.shuffle([r.n, r.n + 1, r.n > 0 ? r.n - 1 : r.n + 2]);
        return { type: "chart", key: k, title: ctx.w("week"), rows: rows, question: ctx.w("weekAsk", { w: r.label }), options: opts, answer: r.n };
      });
    }
  });

  /* «کلمه‌های علوم» — science-sprout-p5. A word is said and shown; pick its picture. */
  var SPROUT_WORDS = [
    { key: "root", after: "sprout-1", a: "🥕", o: ["🍎", "🌸", "🥬"] }, { key: "leaf", after: "sprout-1", a: "🥬", o: ["🥕", "🍎", "🌰"] },
    { key: "flower", after: "sprout-1", a: "🌸", o: ["🥕", "🌰", "🥬"] }, { key: "seed", after: "sprout-15", a: "🌰", o: ["🌸", "🥬", "🌳"] },
    { key: "fur", after: "sprout-11", a: "🐈", o: ["🐟", "🐦", "🐍"] }, { key: "feather", after: "sprout-11", a: "🐦", o: ["🐟", "🐈", "🐍"] },
    { key: "scale", after: "sprout-11", a: "🐟", o: ["🐦", "🐈", "🐄"] }, { key: "ice", after: "sprout-2", a: "🧊", o: ["💧", "☁️", "🔥"] },
    { key: "liquid", after: "sprout-25", a: "🥛", o: ["🧊", "🪨", "🪑"] }, { key: "shake", after: "sprout-38", a: "🥁", o: ["📕", "🪨", "🧸"] },
    { key: "light", after: "sprout-37", a: "🔦", o: ["📕", "🧸", "🪨"] }, { key: "forecast", after: "sprout-41", a: "📺", o: ["🧸", "🥄", "🪑"] },
    { key: "wind", after: "sprout-20", a: "🌬️", o: ["☀️", "❄️", "🌙"] }
  ];
  B.PRACTICE.push({
    id: "science-sprout-p5", subject: "science", level: "sprout", objectives: ["science.spr.2", "science.spr.4", "science.spr.20"],
    needs: [L("sprout-1")],
    lessons: [L("sprout-1"), L("sprout-14"), L("sprout-15"), L("sprout-16"), L("sprout-41"), L("sprout-2"), L("sprout-20"), L("sprout-37"), L("sprout-38")], emoji: "🔤", title: "کلمه‌های علوم",
    words: {
      ask: { root: "کدام «ریشه» است؟", leaf: "کدام «برگ» است؟", flower: "کدام «گل» است؟", seed: "کدام «دانه» است؟", fur: "کدام «مو» دارد؟", feather: "کدام «پر» دارد؟",
        scale: "کدام «فلس» دارد؟", ice: "کدام «یخ» است؟", liquid: "کدام «مایع» است؟", shake: "کدام «می‌لرزد» و صدا می‌دهد؟", light: "کدام «نور» می‌دهد؟",
        forecast: "«پیش‌بینی هوا» را از کجا می‌بینیم؟", wind: "کدام «باد» است؟" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SPROUT_WORDS)).filter(function (p) { return p.round === 0; }).map(function (p) {
        return picChoose(rng, p.kind.key, ctx.w("ask")[p.kind.key], p.kind.a, p.kind.o);
      });
    }
  });

  /* ================= Sapling ================= */

  /* «دسته‌بندی کن» — science-sapling-p1. Sort by vertebrate group (sapling-32, sapling-33), state of matter (sapling-41),
     change that can or cannot be undone (sapling-43), how much light passes (sapling-22), force with or without touching
     (sapling-26), light source or not (sapling-19), rock or fossil (sapling-55). */
  var SAPLING_SORTS = [
    { key: "vert1", after: "sapling-32", values: ["fish", "amph"], bank: [["sturgeon", "", "fish"], ["shark", "🦈", "fish"], ["trout", "🐟", "fish"],
      ["frog", "🐸", "amph"], ["toad", "", "amph"], ["salamander", "", "amph"]] },
    { key: "vert2", after: "sapling-33", values: ["rep", "bird", "mam"], bank: [["snake", "🐍", "rep"], ["lizard", "🦎", "rep"], ["turtle", "🐢", "rep"],
      ["owl", "🦉", "bird"], ["pigeon", "🕊️", "bird"], ["parrot", "🦜", "bird"], ["camel", "🐫", "mam"], ["cheetah", "🐆", "mam"], ["bat", "", "mam"], ["dolphin", "🐬", "mam"]] },
    { key: "states", after: "sapling-41", values: ["solid", "liquid", "gas"], bank: [["ice", "🧊", "solid"], ["stone", "🪨", "solid"], ["coin", "🪙", "solid"],
      ["water", "💧", "liquid"], ["milk", "🥛", "liquid"], ["oil", "", "liquid"], ["steam", "", "gas"], ["air", "🎈", "gas"], ["smoke", "", "gas"]] },
    { key: "undo", after: "sapling-43", values: ["back", "noback"], bank: [["melt", "🧊", "back"], ["freeze", "", "back"], ["chocolate", "🍫", "back"], ["candlewax", "", "back"],
      ["egg", "🍳", "noback"], ["bread", "🍞", "noback"], ["rice", "🍚", "noback"], ["burnt", "", "noback"]] },
    { key: "light", after: "sapling-22", values: ["all", "some", "none"], bank: [["window", "🪟", "all"], ["clearwater", "💧", "all"], ["glasses", "👓", "all"],
      ["thinpaper", "📄", "some"], ["tissue", "🧻", "some"], ["curtain", "", "some"], ["board", "🪵", "none"], ["book", "📕", "none"], ["wall", "🧱", "none"]] },
    { key: "force", after: "sapling-26", values: ["touch", "far"], bank: [["kick", "⚽", "touch"], ["push", "🛒", "touch"], ["tug", "🪢", "touch"], ["broom", "🧹", "touch"],
      ["fall", "🍎", "far"], ["magnet", "🧲", "far"], ["balloon", "🎈", "far"], ["leaffall", "🍂", "far"]] },
    { key: "source", after: "sapling-19", values: ["yes", "no"], bank: [["sun", "☀️", "yes"], ["candle", "🕯️", "yes"], ["torch", "🔦", "yes"], ["lamp", "💡", "yes"], ["firefly", "", "yes"],
      ["moon", "🌕", "no"], ["mirror", "🪞", "no"], ["apple", "🍎", "no"], ["teddy", "🧸", "no"]] },
    { key: "fossil", after: "sapling-55", values: ["rock", "fossil"], bank: [["pebble", "🪨", "rock"], ["granite", "", "rock"], ["sandstone", "", "rock"], ["marble", "", "rock"],
      ["shellfossil", "🐚", "fossil"], ["leaffossil", "", "fossil"], ["fishfossil", "", "fossil"], ["bonefossil", "🦴", "fossil"]] }
  ];
  B.PRACTICE.push({
    id: "science-sapling-p1", subject: "science", level: "sapling",
    objectives: ["science.sap.3", "science.sap.8", "science.sap.10", "science.sap.14", "science.sap.26"],
    needs: [L("sapling-41")],
    lessons: [L("sapling-41"), L("sapling-43"), L("sapling-45"), L("sapling-19"), L("sapling-22"), L("sapling-26"), L("sapling-28"), L("sapling-32"), L("sapling-33"), L("sapling-35"), L("sapling-55")], emoji: "🗂️", title: "دسته‌بندی کن",
    words: {
      ask: { vert1: "ماهی است یا دوزیست؟", vert2: "خزنده، پرنده یا پستاندار؟", states: "جامد، مایع یا گاز؟", undo: "این تغییر برمی‌گردد یا نه؟",
        light: "نور از آن کاملاً رد می‌شود، کمی، یا اصلاً؟", force: "این نیرو با تماس است یا بدون تماس؟", source: "خودش نور دارد یا نه؟", fossil: "سنگ ساده است یا فسیل؟" },
      b: { fish: "ماهی", amph: "دوزیست", rep: "خزنده", bird: "پرنده", mam: "پستاندار", solid: "جامد", liquid: "مایع", gas: "گاز", back: "برمی‌گردد", noback: "برنمی‌گردد",
        all: "کاملاً رد می‌شود", some: "کمی رد می‌شود", none: "رد نمی‌شود", touch: "با تماس", far: "بدون تماس", yes: "خودش نور دارد", no: "خودش نور ندارد",
        rock: "سنگ", fossil: "فسیل" },
      n: { sturgeon: "ماهی خاویاری", shark: "کوسه", trout: "قزل‌آلا", frog: "قورباغه", toad: "وزغ سبز", salamander: "سمندر", snake: "مار", lizard: "مارمولک", turtle: "لاک‌پشت",
        owl: "جغد", pigeon: "کبوتر", parrot: "طوطی", camel: "شتر", cheetah: "یوزپلنگ", bat: "خفاش", dolphin: "دلفین", ice: "یخ", stone: "سنگ", coin: "سکه", water: "آب",
        milk: "شیر", oil: "روغن", steam: "بخار آب", air: "هوای بادکنک", smoke: "دود", melt: "یخی که آب شد", freeze: "آبی که یخ زد", chocolate: "شکلاتی که آب شد",
        candlewax: "موم شمعی که نرم شد", egg: "تخم‌مرغ پخته", bread: "نان پخته", rice: "برنج پخته", burnt: "کاغذ سوخته", window: "شیشه پنجره", clearwater: "آب زلال",
        glasses: "عینک", thinpaper: "کاغذ نازک", tissue: "دستمال کاغذی", curtain: "پرده نازک", board: "تخته چوبی", book: "کتاب", wall: "دیوار آجری",
        kick: "ضربه به توپ", push: "هل دادن چرخ‌دستی", tug: "طناب‌کشی", broom: "جارو کشیدن", fall: "افتادن سیب", magnet: "آهنربا گیره را می‌کشد",
        balloon: "بادکنک مالیده کاغذ را می‌کشد", leaffall: "افتادن برگ", sun: "خورشید", candle: "شمع روشن", torch: "چراغ‌قوه روشن", lamp: "لامپ روشن",
        firefly: "کرم شب‌تاب", moon: "ماه", mirror: "آینه", apple: "سیب", teddy: "خرس عروسکی", pebble: "سنگ‌ریزه رود", granite: "سنگ خال‌خالی کوه",
        sandstone: "ماسه‌سنگ", marble: "سنگ مرمر", shellfossil: "جای صدف در سنگ", leaffossil: "جای برگ در سنگ", fishfossil: "جای ماهی در سنگ", bonefossil: "استخوان سنگ‌شده" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SAPLING_SORTS)).map(function (p) {
        var k = p.kind;
        return sortStep(rng, ctx, k.key, k.values, k.bank, k.values.length > 2 ? 2 : 3, ctx.w("ask")[k.key]);
      });
    }
  });

  /* «فقط یک چیز را عوض کن» — science-sapling-p2. A question and two or three set-ups; pick the fair test, the one
     where only the thing asked about is different. Plants, ramps and magnets after sapling-9; ice, dissolving and
     paper bridges after the lessons that tried them. The key is the question. */
  var FAIR = [
    { key: "plantlight", after: "sapling-9" }, { key: "plantwater", after: "sapling-9" }, { key: "ramp", after: "sapling-9" },
    { key: "magnet", after: ["sapling-9", "sapling-2"] }, { key: "sugar", after: "sapling-14" }, { key: "ice", after: "sapling-49" }, { key: "bridge", after: "sapling-48" }
  ];
  B.PRACTICE.push({
    id: "science-sapling-p2", subject: "science", level: "sapling", objectives: ["science.sap.1"],
    needs: [L("sapling-9")],
    lessons: [L("sapling-9"), L("sapling-12"), L("sapling-30"), L("sapling-14"), L("sapling-48"), L("sapling-49"), L("sapling-54")], emoji: "⚖️", title: "فقط یک چیز را عوض کن",
    words: {
      q: {
        plantlight: ["می‌خواهیم ببینیم گیاه به نور نیاز دارد یا نه. کدام آزمایش منصفانه است؟", "دو گلدان یکسان با آب یکسان: یکی در نور، یکی در تاریکی",
          "یکی در نور با آب زیاد، یکی در تاریکی بی‌آب", "یکی گلدان بزرگ در نور، یکی گلدان کوچک در تاریکی"],
        plantwater: ["می‌خواهیم ببینیم آب بیشتر گیاه را بلندتر می‌کند یا نه. کدام منصفانه است؟", "دو گلدان یکسان کنار پنجره: یکی کم آب، یکی بیشتر",
          "یکی کنار پنجره با آب زیاد، یکی در کمد با آب کم", "یک دانه لوبیا و یک دانه گندم، با آب‌های متفاوت"],
        ramp: ["می‌خواهیم ببینیم سرسره بلندتر ماشین را دورتر می‌برد یا نه. کدام منصفانه است؟", "یک ماشین، یک بار از سرسره بلند و یک بار از سرسره کوتاه",
          "ماشین بزرگ از سرسره بلند، ماشین کوچک از سرسره کوتاه", "یک بار هل بدهیم، یک بار ول کنیم، از دو سرسره"],
        magnet: ["می‌خواهیم ببینیم کدام آهنربا قوی‌تر است. کدام منصفانه است؟", "هر دو آهنربا را به یک جور گیره نزدیک کنیم و بشمریم چند گیره می‌گیرند",
          "یکی را به گیره و یکی را به میخ بزرگ نزدیک کنیم", "یکی را از نزدیک و یکی را از دور امتحان کنیم"],
        sugar: ["می‌خواهیم ببینیم شکر در آب گرم زودتر حل می‌شود یا در آب سرد. کدام منصفانه است؟", "در هر لیوان یک قاشق شکر و یک جور هم زدن؛ فقط دمای آب فرق دارد",
          "در آب گرم یک قاشق، در آب سرد دو قاشق", "آب گرم را هم بزنیم، آب سرد را هم نزنیم"],
        ice: ["می‌خواهیم ببینیم یخ در پشم دیرتر آب می‌شود یا در فویل. کدام منصفانه است؟", "دو تکه یخ هم‌اندازه، کنار هم در یک اتاق: یکی در پشم، یکی در فویل",
          "یخ بزرگ در پشم، یخ کوچک در فویل", "یخ در پشم در یخچال، یخ در فویل کنار بخاری"],
        bridge: ["می‌خواهیم ببینیم پل تاشده محکم‌تر است یا پل صاف. کدام منصفانه است؟", "دو کاغذ یکسان روی یک فاصله، با یک جور سکه",
          "پل تاشده با کاغذ کلفت، پل صاف با کاغذ نازک", "پل تاشده روی فاصله کوتاه، پل صاف روی فاصله بلند"]
      }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, FAIR)).filter(function (p) { return p.round === 0; }).map(function (p) {
        var q = ctx.w("q")[p.kind.key];
        return { type: "choose", key: p.kind.key, prompt: q[0], say: q[0], options: rng.shuffle(q.slice(1)), answer: q[1] };
      });
    }
  });

  /* «حدس بزن و ببین» — science-sapling-p3. Guess, then see: the magnet through a card (sapling-2), which material soaks
     up a puddle (sapling-42), what dissolves (sapling-13) on the `test` stage; which shadow is longer (sapling-3) and
     which side of a tug-of-war wins (sapling-25) as questions whose answer is shown after the guess. */
  var PREDICT_TESTS = {
    magnet: { after: "sapling-2", bank: [["clipcard", "📎", 1], ["nailpaper", "🔩", 1], ["pinbook", "🧷", 1], ["pencil", "✏️", 0], ["coinplastic", "🪙", 0], ["eraser", "", 0]] },
    absorbs: { after: "sapling-42", bank: [["towel", "", 1], ["sponge", "🧽", 1], ["tissue", "🧻", 1], ["bag", "🛍️", 0], ["foil", "", 0], ["spoon", "🥄", 0]] },
    dissolve: { after: "sapling-13", bank: [["salt", "🧂", 1], ["sugar", "🍬", 1], ["sand", "", 0], ["pebble", "🪨", 0], ["rice", "🍚", 0]] }
  };
  var PREDICT_ASK = [
    { key: "shadow", after: "sapling-3" }, { key: "noonshadow", after: "sapling-3" }, { key: "tug", after: "sapling-25" }, { key: "seesaw", after: "sapling-27" }
  ];
  B.PRACTICE.push({
    id: "science-sapling-p3", subject: "science", level: "sapling",
    objectives: ["science.sap.3", "science.sap.8", "science.sap.10", "science.sap.11"],
    needs: [L("sapling-2")],
    lessons: [L("sapling-2"), L("sapling-18"), L("sapling-3"), L("sapling-22"), L("sapling-25"), L("sapling-27"), L("sapling-28")], emoji: "🔍", title: "حدس بزن و ببین",
    words: {
      guess: "اول حدس بزن، بعد ببین چه می‌شود.",
      n: { clipcard: "گیره پشت یک مقوا", nailpaper: "پیچ آهنی زیر کاغذ", pinbook: "سنجاق روی جلد کتاب نازک", pencil: "مداد", coinplastic: "دکمه پلاستیکی", eraser: "پاک‌کن",
        towel: "حوله", sponge: "اسفنج", tissue: "دستمال کاغذی", bag: "کیسه پلاستیکی", foil: "فویل", spoon: "قاشق فلزی", salt: "نمک", sugar: "شکر", sand: "ماسه",
        pebble: "سنگ‌ریزه", rice: "برنج" },
      q: {
        shadow: ["حدس بزن: سایه درخت کی بلندتر است؟", "صبح زود", "ظهر"],
        noonshadow: ["حدس بزن: ظهر که خورشید بالای آسمان است، سایه ما چطور است؟", "کوتاه", "خیلی بلند"],
        tug: ["حدس بزن: سه بچه هم‌قد با دو بچه طناب‌کشی می‌کنند. طناب کدام طرف می‌رود؟", "طرف سه نفر", "طرف دو نفر"],
        seesaw: ["حدس بزن: بابا یک سر الاکلنگ نشسته و یک بچه سر دیگر. کدام طرف پایین می‌رود؟", "طرف بابا", "طرف بچه"]
      }
    },
    make: function (rng, n, ctx) {
      var nm = ctx.w("n"), all = [];
      Object.keys(PREDICT_TESTS).forEach(function (kind) {
        var g = PREDICT_TESTS[kind];
        if (ctx.done(L(g.after))) g.bank.forEach(function (t) { all.push({ key: kind + ":" + t[0], kind: kind, t: t }); });
      });
      open(ctx, PREDICT_ASK).forEach(function (k) { all.push({ key: k.key, ask: true }); });
      return plan(rng, n, ctx, all).filter(function (p) { return p.round === 0; }).map(function (p) {
        var k = p.kind;
        if (k.ask) {
          var q = ctx.w("q")[k.key];
          return { type: "choose", key: k.key, prompt: q[0], say: q[0], options: rng.shuffle(q.slice(1)), answer: q[1] };
        }
        return { type: "test", key: k.key, kind: k.kind, prompt: ctx.w("guess"), items: [{ pic: k.t[1] || "❔", say: nm[k.t[0]], yes: !!k.t[2] }] };
      });
    }
  });

  /* «بخوان و اندازه بگیر» — science-sapling-p4. Read a ruler or find the heavier pan (sapling-10), read or fill a jug,
     read or set a thermometer (sapling-11), with fresh values each time. The key is the tool and the value. */
  B.PRACTICE.push({
    id: "science-sapling-p4", subject: "science", level: "sapling", objectives: ["science.sap.2"],
    needs: [L("sapling-10")],
    lessons: [L("sapling-10"), L("sapling-11"), L("sapling-12"), L("sapling-30"), L("sapling-51")], emoji: "📏", title: "بخوان و اندازه بگیر",
    words: {
      ruler: "این مداد چند سانتی‌متر است؟", jug: "در پیمانه چند میلی‌لیتر آب هست؟", jugSet: "{v} میلی‌لیتر آب در پیمانه بریز.",
      therm: "دماسنج چند درجه را نشان می‌دهد؟", thermSet: "دماسنج را روی {v} درجه ببر.", heavier: "کدام طرف سنگین‌تر است؟"
    },
    make: function (rng, n, ctx) {
      var kinds = ["ruler", "balance"];
      if (ctx.done(L("sapling-11"))) kinds.push("jug", "jugset", "therm", "thermset");
      var steps = [], used = {};
      for (var i = 0; steps.length < n && i < n * 4; i++) {
        var k = rng.pick(kinds), v, key;
        if (k === "ruler") { v = rng.int(3, 14); key = "ruler:" + v; }
        else if (k === "balance") { var a0 = rng.int(1, 5), b0 = rng.int(1, 4); if (b0 >= a0) b0++; v = a0 + "-" + b0; key = "balance:" + v; }
        else if (k === "jug" || k === "jugset") { v = rng.int(1, 9) * 100; key = k + ":" + v; }
        else { v = rng.int(0, 4) * 10; key = k + ":" + v; }
        if (used[key]) continue;
        used[key] = true;
        if (k === "ruler") steps.push({ type: "measure", key: key, tool: "ruler", value: v, pic: "✏️", options: near(rng, v, 1, 1, 15), prompt: ctx.w("ruler"), say: ctx.w("ruler") });
        else if (k === "balance") {
          var a = +v.split("-")[0], b = +v.split("-")[1];
          steps.push({ type: "balance", key: key, left: [a], right: [b], ask: "heavier", prompt: ctx.w("heavier") });
        }
        else if (k === "jug") steps.push({ type: "measure", key: key, tool: "jug", value: v, options: near(rng, v, 100, 100, 1000), prompt: ctx.w("jug"), say: ctx.w("jug") });
        else if (k === "jugset") steps.push({ type: "measure", key: key, tool: "jug", value: v, ask: "set", prompt: ctx.w("jugSet", { v: v }), say: ctx.w("jugSet", { v: v }) });
        else if (k === "therm") steps.push({ type: "measure", key: key, tool: "thermometer", value: v, options: near(rng, v, 10, -10, 50), prompt: ctx.w("therm"), say: ctx.w("therm") });
        else steps.push({ type: "measure", key: key, tool: "thermometer", value: v, ask: "set", prompt: ctx.w("thermSet", { v: v }), say: ctx.w("thermSet", { v: v }) });
      }
      return steps;
    }
  });

  /* «چرخه‌ها و ویژگی‌ها» — science-sapling-p5. Put a life cycle in order (sapling-6, sapling-29), or match young and
     parents (sapling-31). The key is the cycle, or "parents". */
  var CYCLES = [
    { key: "frog", after: "sapling-6", steps: [["frogegg", ""], ["tadpole", ""], ["froglet", ""], ["frog", "🐸"]] },
    { key: "butterfly", after: "sapling-6", steps: [["butteregg", ""], ["caterpillar", "🐛"], ["chrysalis", ""], ["butterfly", "🦋"]] },
    { key: "hen", after: "sapling-6", steps: [["hegg", "🥚"], ["hatch", "🐣"], ["chick", "🐥"], ["hen", "🐔"]] },
    { key: "bean", after: "sapling-29", steps: [["seed", "🫘"], ["sprout", "🌱"], ["plant", "🌿"], ["pod", ""]] },
    { key: "tree", after: "sapling-29", steps: [["pip", ""], ["seedling", "🌱"], ["blossom", "🌸"], ["fruit", "🍎"]] }
  ];
  var PARENTS = [["kitten", "", "cat", "🐈"], ["lamb", "", "sheep", "🐑"], ["calf", "", "cow", "🐄"], ["chick", "🐥", "hen", "🐔"], ["fawn", "", "maral", "🦌"],
    ["puppy", "", "dog", "🐕"], ["seedling", "🌱", "tree", "🌳"], ["tadpole", "", "frog", "🐸"]];
  B.PRACTICE.push({
    id: "science-sapling-p5", subject: "science", level: "sapling", objectives: ["science.sap.13", "science.sap.24"],
    needs: [L("sapling-6")],
    lessons: [L("sapling-6"), L("sapling-31"), L("sapling-38")], emoji: "🔄", title: "چرخه‌ها و ویژگی‌ها",
    words: {
      order: "چرخه زندگی {name} را از اول بچین.", pairs: "هر بچه را به پدر یا مادرش برسان.",
      name: { frog: "قورباغه", butterfly: "پروانه", hen: "مرغ", bean: "لوبیا", tree: "درخت سیب" },
      n: { frogegg: "تخم قورباغه", tadpole: "بچه‌قورباغه", froglet: "قورباغه کوچک", frog: "قورباغه", butteregg: "تخم پروانه", caterpillar: "کرم پروانه", chrysalis: "پیله",
        butterfly: "پروانه", hegg: "تخم‌مرغ", hatch: "جوجه از تخم درمی‌آید", chick: "جوجه", hen: "مرغ", seed: "دانه لوبیا", sprout: "جوانه", plant: "بوته لوبیا", pod: "غلاف لوبیا",
        pip: "دانه سیب", seedling: "نهال", blossom: "شکوفه", fruit: "سیب", kitten: "بچه‌گربه", cat: "گربه", lamb: "بره", sheep: "گوسفند", calf: "گوساله", cow: "گاو",
        fawn: "بچه‌مرال", maral: "مرال", puppy: "توله‌سگ", dog: "سگ", tree: "درخت" }
    },
    make: function (rng, n, ctx) {
      var nm = ctx.w("n"), kinds = open(ctx, CYCLES);
      if (ctx.done(L("sapling-31"))) kinds = kinds.concat([{ key: "parents" }]);
      return plan(rng, n, ctx, kinds).filter(function (p) { return p.round === 0 || p.kind.key === "parents"; }).map(function (p) {
        var k = p.kind;
        if (k.key === "parents") {
          var pairs = rng.sample(PARENTS, 4).map(function (t) {
            var a = { label: nm[t[0]], say: nm[t[0]] }, b = { label: nm[t[2]], say: nm[t[2]] };
            if (t[1]) a.pic = t[1];
            if (t[3]) b.pic = t[3];
            return [a, b];
          });
          return { type: "pairs", key: "parents", prompt: ctx.w("pairs"), say: ctx.w("pairs"), pairs: pairs };
        }
        var text = ctx.w("order", { name: ctx.w("name")[k.key] });
        return { type: "order", key: k.key, prompt: text, say: text, numbered: true, items: k.steps.map(function (s) { var it = { label: nm[s[0]], say: nm[s[0]] }; if (s[1]) it.pic = s[1]; return it; }) };
      });
    }
  });

  /* «آب و هوای ایران در نمودار» — science-sapling-p6. Bar charts of real weather in one month in four cities: average
     temperature (°C) in Farvardin, Mehr or Dey (months when no city here is above 20 degrees, so the chart, a square
     per degree, stays small), or average rain (cm) in Tir, Aban or Dey. Read a value, or find the most or least.
     Rounded long-term averages (Iran Meteorological Organization normals). After sapling-52. The key is the chart. */
  var WEATHER = {
    temp: { far: { tehran: 15, rasht: 13, shiraz: 16, yazd: 19, tabriz: 12 }, mehr: { tehran: 18, rasht: 17, shiraz: 19, yazd: 20, tabriz: 14 },
      dey: { tehran: 4, rasht: 7, bandar: 18, shiraz: 6, yazd: 5 } },
    rain: { tir: { rasht: 4, tehran: 0, yazd: 0, bandar: 0, tabriz: 1, shiraz: 0 }, aban: { rasht: 20, tehran: 3, yazd: 1, bandar: 1, tabriz: 4, shiraz: 3 },
      dey: { rasht: 14, tehran: 4, yazd: 1, bandar: 5, tabriz: 2, shiraz: 9 } }
  };
  B.PRACTICE.push({
    id: "science-sapling-p6", subject: "science", level: "sapling", objectives: ["science.sap.23"],
    needs: [L("sapling-52")],
    lessons: [L("sapling-52"), L("sapling-53"), L("sapling-54")], emoji: "📊", title: "آب و هوای ایران در نمودار",
    words: {
      title: { temp: "میانگین دما در ماه {month} (درجه)", rain: "میانگین باران در ماه {month} (سانتی‌متر)" },
      most: { temp: "در ماه {month} کدام شهر گرم‌تر از همه است؟", rain: "در ماه {month} کدام شهر باران بیشتری دارد؟" },
      least: { temp: "در ماه {month} کدام شهر سردتر از همه است؟", rain: "در ماه {month} کدام شهر باران کمتری دارد؟" },
      read: { temp: "در ماه {month} دمای {city} چند درجه است؟", rain: "در ماه {month} در {city} چند سانتی‌متر باران می‌آید؟" },
      city: { tehran: "تهران", rasht: "رشت", bandar: "بندرعباس", shiraz: "شیراز", tabriz: "تبریز", yazd: "یزد" },
      month: { far: "فروردین", tir: "تیر", mehr: "مهر", aban: "آبان", dey: "دی" }
    },
    make: function (rng, n, ctx) {
      var ci = ctx.w("city"), mo = ctx.w("month"), kinds = [];
      Object.keys(WEATHER).forEach(function (what) { Object.keys(WEATHER[what]).forEach(function (m) { kinds.push({ key: what + ":" + m, what: what, m: m }); }); });
      return plan(rng, n, ctx, kinds).filter(function (p) { return p.round === 0; }).map(function (p) {
        var k = p.kind, data = WEATHER[k.what][k.m], month = mo[k.m], ask = rng.int(0, 2), q, answer, options;
        var rows = rng.sample(Object.keys(data), 4).map(function (c) { return { label: ci[c], pic: k.what === "rain" ? "🌧️" : "🌡️", n: data[c] }; });
        var v = rows.map(function (r) { return r.n; }), hi = Math.max.apply(null, v), lo = Math.min.apply(null, v);
        var only = function (x) { return v.filter(function (y) { return y === x; }).length === 1; };
        var names = rows.map(function (r) { return { label: r.label, value: r.label }; });
        if (ask === 0 && only(hi)) { q = ctx.w("most")[k.what]; answer = rows[v.indexOf(hi)].label; options = names; }
        else if (ask === 1 && only(lo)) { q = ctx.w("least")[k.what]; answer = rows[v.indexOf(lo)].label; options = names; }
        else { var r = rng.pick(rows); q = ctx.w("read")[k.what]; answer = r.n; options = near(rng, r.n, 2, 0, 30); q = q.replace("{city}", r.label); }
        q = q.replace("{month}", month);
        return { type: "chart", key: k.key, bars: true, title: ctx.w("title")[k.what].replace("{month}", month), rows: rows, question: q, options: options, answer: answer };
      });
    }
  });

  /* «واژه‌های علوم» — science-sapling-p7. A word is shown and said; pick its picture (vertebrates, light, magnets,
     habitats, fossils, climate…). The key is the word. */
  var SAPLING_WORDS = [
    { key: "vertebrate", after: "sapling-32", a: "🐟", o: ["🐛", "🐌", "🐝"] }, { key: "amphibian", after: "sapling-32", a: "🐸", o: ["🐟", "🦎", "🐦"] },
    { key: "reptile", after: "sapling-33", a: "🦎", o: ["🐸", "🐦", "🐄"] }, { key: "mammal", after: "sapling-33", a: "🐄", o: ["🦎", "🐦", "🐟"] },
    { key: "transparent", after: "sapling-22", a: "🪟", o: ["🧱", "📕", "🪵"] }, { key: "source", after: "sapling-19", a: "🕯️", o: ["🌕", "🪞", "🍎"] },
    { key: "compass", after: "sapling-18", a: "🧭", o: ["🧲", "⏰", "🔦"] }, { key: "magnet", after: "sapling-2", a: "🧲", o: ["🧭", "🔑", "🪵"] },
    { key: "habitat", after: "sapling-57", a: "🏞️", o: ["🧸", "🥄", "📕"] }, { key: "fossil", after: "sapling-55", a: "🐚", o: ["🍎", "🧊", "🎈"] },
    { key: "climate", after: "sapling-52", a: "🗺️", o: ["🥄", "🧸", "✏️"] }, { key: "gas", after: "sapling-41", a: "🎈", o: ["🧊", "🥛", "🪨"] },
    { key: "thermometer", after: "sapling-11", a: "🌡️", o: ["📏", "⚖️", "🧭"] }, { key: "lever", after: "sapling-27", a: "🥄", o: ["🎈", "🧊", "🌕"] }
  ];
  B.PRACTICE.push({
    id: "science-sapling-p7", subject: "science", level: "sapling", objectives: ["science.sap.8", "science.sap.14", "science.sap.23"],
    needs: [L("sapling-11")],
    lessons: [L("sapling-11"), L("sapling-41"), L("sapling-2"), L("sapling-18"), L("sapling-19"), L("sapling-22"), L("sapling-32"), L("sapling-33"), L("sapling-57"), L("sapling-55"), L("sapling-52")], emoji: "📖", title: "واژه‌های علوم",
    words: {
      ask: { vertebrate: "«مهره‌دار»: کدام ستون مهره دارد؟", amphibian: "«دوزیست»: کدام است؟", reptile: "«خزنده»: کدام است؟", mammal: "«پستاندار»: کدام است؟",
        transparent: "«شفاف»: نور از کدام کاملاً رد می‌شود؟", source: "«منبع نور»: کدام خودش نور می‌دهد؟", compass: "«قطب‌نما» کدام است؟",
        magnet: "«آهنربا» کدام است؟", habitat: "«زیستگاه» یعنی جای زندگی جانوران. کدام زیستگاه است؟", fossil: "«فسیل»: کدام می‌تواند فسیل شود؟",
        climate: "«آب و هوا»ی شهرها را در کدام می‌بینیم؟", gas: "«گاز»: کدام پر از گاز است؟", thermometer: "با «دماسنج» دما را اندازه می‌گیریم. کدام است؟",
        lever: "«اهرم»: با کدام می‌شود در قوطی را راحت باز کرد؟" }
    },
    make: function (rng, n, ctx) {
      return plan(rng, n, ctx, open(ctx, SAPLING_WORDS)).filter(function (p) { return p.round === 0; }).map(function (p) {
        return picChoose(rng, p.kind.key, ctx.w("ask")[p.kind.key], p.kind.a, p.kind.o);
      });
    }
  });

  /* ================= Every lesson: three ways to check what it taught =================
     One bank of short sentences per lesson (FACTS: t, two true sentences; f, one false one; p, two sentences in two
     halves, often cause and effect), used three ways: sort the sentences into true or false, find the one wrong
     sentence, match each start to its end. Items come from the lessons done so far: the newest lesson first, then
     earlier ones for review. English: FACTS_EN in js/en/science.js. */
  var FACTS = {
    seed: {
      "seed-1": { t: ["گربه زنده است؛ غذا می‌خورد و بزرگ می‌شود.", "سنگ زنده نیست."], f: ["توپ زنده است، چون قِل می‌خورد."],
        p: [["درخت زنده است،", "چون آب می‌خورد و بزرگ می‌شود."], ["عروسک زنده نیست،", "چون نه غذا می‌خورد و نه بزرگ می‌شود."]] },
      "seed-7": { t: ["بچه‌گربه بزرگ می‌شود و گربه می‌شود.", "نهال کوچک کم‌کم درخت می‌شود."], f: ["توپ هم مثل بچه‌ها بزرگ می‌شود."],
        p: [["نوزاد", "بزرگ می‌شود و کودک می‌شود."], ["دانه را که بکاریم،", "کم‌کم گیاه می‌شود."]] },
      "seed-2": { t: ["با گوش صدا را می‌شنویم.", "با بینی بوی گل را می‌فهمیم."], f: ["با زبان رنگ‌ها را می‌بینیم."],
        p: [["با چشم", "رنگین‌کمان را می‌بینیم."], ["با زبان", "مزه لیمو را می‌فهمیم."]] },
      "seed-8": { t: ["با پاها راه می‌رویم و می‌دویم.", "با دست‌ها چیزها را برمی‌داریم."], f: ["با گوش‌ها غذا می‌خوریم."],
        p: [["با دهان", "غذا می‌خوریم و حرف می‌زنیم."], ["مثل خرگوش", "با پاها می‌پریم."]] },
      "seed-9": { t: ["سنگ سفت است و بالش نرم.", "با دست می‌فهمیم چیزی زبر است یا صاف."], f: ["پنبه سفت و زبر است."],
        p: [["دست در کیسه بردیم و", "فقط با لمس حدس زدیم چیست."], ["لیوان چای داغ", "گرم است؛ یخ سرد است."]] },
      "seed-10": { t: ["گوش و صدا با هم جفت‌اند.", "چشم و رنگ با هم جفت‌اند."], f: ["بینی و موسیقی با هم جفت‌اند."],
        p: [["بینی", "بو را می‌فهمد."], ["دست", "نرمی و سفتی را حس می‌کند."]] },
      "seed-3": { t: ["دانه برای سبز شدن آب می‌خواهد.", "گیاه برای بزرگ شدن نور می‌خواهد."], f: ["گیاه بدون آب هم خوب بزرگ می‌شود."],
        p: [["دانه را کاشتیم و آب دادیم،", "جوانه زد."], ["ریشه زیر خاک می‌رود و", "ساقه بالا می‌آید."]] },
      "seed-11": { t: ["برگ درخت‌ها شکل‌های مختلف دارند.", "برگ چنار پهن است و برگ نخل بلند و باریک."], f: ["همه برگ‌ها یک شکل‌اند."],
        p: [["درخت انار", "انار می‌دهد."], ["چمن و گل و درخت", "همه گیاه‌اند."]] },
      "seed-4": { t: ["زنبور در کندو زندگی می‌کند.", "خرگوش هویج و علف می‌خورد."], f: ["ماهی روی درخت لانه می‌سازد."],
        p: [["پرنده", "روی درخت لانه می‌سازد."], ["گاو", "علف می‌خورد."]] },
      "seed-12": { t: ["بچه مرغ جوجه است.", "بچه گوسفند بره است."], f: ["بچه قورباغه جوجه است."],
        p: [["قورباغه", "بچه‌قورباغه دارد که در آب شنا می‌کند."], ["مادرها", "از بچه‌هایشان مراقبت می‌کنند."]] },
      "seed-13": { t: ["به گلدان آب می‌دهیم تا خشک نشود.", "مورچه را نگاه می‌کنیم، ولی اذیتش نمی‌کنیم."], f: ["کندن برگ‌ها به گیاه کمک می‌کند."],
        p: [["در تابستان برای پرنده‌ها", "ظرف آب می‌گذاریم."], ["اگر به گل آب ندهیم،", "پژمرده می‌شود."]] },
      "seed-14": { t: ["جوجه بچه مرغ است.", "دانه کم‌کم گل می‌شود."], f: ["صندلی زنده است."],
        p: [["زنبور", "از گل شهد می‌خورد."], ["خرگوش", "در لانه زیر زمین زندگی می‌کند."]] },
      "seed-5": { t: ["روز بارانی چتر برمی‌داریم.", "روز برفی کلاه و دستکش می‌پوشیم."], f: ["روز خیلی گرم کاپشن کلفت می‌پوشیم."],
        p: [["آسمان ابری است و", "شاید باران ببارد."], ["باد می‌آید و", "برگ‌ها تکان می‌خورند."]] },
      "seed-15": { t: ["روز خورشید در آسمان است.", "شب ماه و ستاره‌ها پیدا می‌شوند."], f: ["شب خورشید وسط آسمان است."],
        p: [["شب که تاریک می‌شود،", "می‌خوابیم."], ["صبح خورشید بالا می‌آید و", "هوا روشن می‌شود."]] },
      "seed-16": { t: ["آب از بالا به پایین می‌ریزد.", "لباس خیس در آفتاب خشک می‌شود."], f: ["آب خودش از پایین به بالای سرسره می‌رود."],
        p: [["چاله آب در آفتاب", "کم‌کم کوچک می‌شود."], ["لیوان آب را کج کنیم،", "آب بیرون می‌ریزد."]] },
      "seed-6": { t: ["زرد و آبی را قاطی کنیم، سبز می‌شود.", "قرمز و زرد را قاطی کنیم، نارنجی می‌شود."], f: ["قرمز و آبی را قاطی کنیم، زرد می‌شود."],
        p: [["قرمز و آبی", "بنفش می‌شوند."], ["اول حدس می‌زنیم،", "بعد رنگ‌ها را قاطی می‌کنیم."]] },
      "seed-17": { t: ["یخ در دست گرم آب می‌شود.", "آب در فریزر یخ می‌زند."], f: ["کره در آفتاب سفت‌تر می‌شود."],
        p: [["بستنی را بیرون بگذاریم،", "آب می‌شود."], ["آب را در فریزر گذاشتیم و", "یخ شد."]] },
      "seed-18": { t: ["هندوانه از سیب سنگین‌تر است.", "پر خیلی سبک است."], f: ["چیز بزرگ همیشه سنگین است؛ بادکنک بزرگ هم سنگین است."],
        p: [["دو چیز را در دو دست گرفتیم و", "فهمیدیم کدام سنگین‌تر است."], ["فیل", "از موش خیلی بزرگ‌تر است."]] },
      "seed-19": { t: ["توپ گرد است و قِل می‌خورد.", "کتاب صاف است و سُر می‌خورد."], f: ["آجر روی سرسره قِل می‌خورد."],
        p: [["پرتقال گرد", "از سراشیبی قِل می‌خورد."], ["اول حدس زدیم،", "بعد امتحان کردیم."]] },
      "seed-20": { t: ["با هل دادن، تاب را تکان می‌دهیم.", "کشو را می‌کشیم تا باز شود."], f: ["هل آرام توپ را دورتر از هل محکم می‌برد."],
        p: [["توپ را محکم به دیوار بزنیم،", "برمی‌گردد."], ["چرخ‌دستی را هل بدهیم،", "راه می‌افتد."]] },
      "seed-21": { t: ["صدای رعد بلند است.", "پچ‌پچ صدای آهسته است."], f: ["صدای پای مورچه خیلی بلند است."],
        p: [["جیک‌جیک", "صدای گنجشک است."], ["سوت کتری", "می‌گوید آب جوش آمده."]] },
      "seed-22": { t: ["برجی که پایینش پهن است بهتر می‌ایستد.", "اگر برج افتاد، دوباره می‌سازیم."], f: ["برج با پایین باریک محکم‌تر است."],
        p: [["قطعه‌های بزرگ را پایین گذاشتیم و", "برج محکم شد."], ["برج خیلی کج شد و", "افتاد."]] },
      "seed-23": { t: ["توپ قِل می‌خورد، کتاب سُر می‌خورد.", "در را با هل دادن می‌بندیم."], f: ["پر از سنگ سنگین‌تر است."],
        p: [["طبل", "صدای بلند می‌دهد."], ["سورتمه را", "با طناب می‌کشیم."]] },
      "seed-24": { t: ["دانشمند با دقت نگاه می‌کند.", "اول حدس می‌زنیم، بعد نگاه می‌کنیم."], f: ["دانشمند هیچ‌وقت سؤال نمی‌پرسد."],
        p: [["برگ را از نزدیک دیدیم و", "رگ‌هایش را دیدیم."], ["چیزی که دیدیم را", "برای بزرگ‌ترها تعریف کردیم."]] }
    },
    sprout: {
      "sprout-7": { t: ["ذره‌بین چیزهای کوچک را بزرگ نشان می‌دهد.", "دانشمند می‌پرسد «چرا؟» و امتحان می‌کند."], f: ["دانشمند هیچ‌وقت چیزی را که دیده نمی‌کشد."],
        p: [["با ذره‌بین", "پاهای مورچه را دیدیم."], ["اول حدس زدیم،", "بعد امتحان کردیم تا ببینیم درست بود یا نه."]] },
      "sprout-10": { t: ["پرنده با بال پرواز می‌کند.", "ماهی با باله شنا می‌کند."], f: ["مار با پاهایش راه می‌رود."],
        p: [["قورباغه با پاهای بلندش", "می‌پرد."], ["کرم خاکی", "روی زمین می‌خزد."]] },
      "sprout-11": { t: ["بدن پرنده پر دارد.", "بدن ماهی فلس دارد."], f: ["بدن گربه فلس دارد."],
        p: [["لاک‌پشت", "لاک سفتی دارد."], ["گوسفند", "پشم دارد و گرم می‌ماند."]] },
      "sprout-12": { t: ["خرگوش گیاه‌خوار است.", "یوزپلنگ گوشت‌خوار است و دندان‌های تیز دارد."], f: ["گاو گوشت‌خوار است."],
        p: [["نوک تیز عقاب", "برای پاره کردن گوشت است."], ["همه جانوران", "به آب و غذا نیاز دارند."]] },
      "sprout-13": { t: ["اردک هم شنا می‌کند، هم راه می‌رود.", "بدن مارمولک فلس دارد."], f: ["کبوتر شنا می‌کند و فلس دارد."],
        p: [["زنبور", "پرواز می‌کند و شهد گل می‌خورد."], ["گرگ", "گوشت‌خوار است."]] },
      "sprout-1": { t: ["ریشه گیاه زیر خاک است.", "گل گیاه بعداً میوه و دانه می‌دهد."], f: ["ریشه گیاه بالای برگ‌هاست."],
        p: [["ریشه", "آب را از خاک می‌گیرد."], ["ساقه", "آب را به برگ‌ها می‌رساند."]] },
      "sprout-14": { t: ["لوبیای گلدان تاریک کم‌رنگ و ضعیف شد.", "گیاه برای سبز ماندن نور می‌خواهد."], f: ["گیاه در تاریکی سبزتر می‌شود."],
        p: [["گلدانی که آب نگرفت", "پژمرده شد."], ["اول حدس زدیم،", "بعد صبر کردیم و نگاه کردیم."]] },
      "sprout-15": { t: ["انار دانه‌های زیادی دارد.", "خرما فقط یک هسته دارد."], f: ["سیب هیچ دانه‌ای ندارد."],
        p: [["از هویج", "ریشه‌اش را می‌خوریم."], ["دانه را در خاک بکاریم،", "گیاه تازه سبز می‌شود."]] },
      "sprout-16": { t: ["کاهو برگ گیاه است.", "گیاه آب و نور می‌خواهد."], f: ["دانه در میوه نیست، در ریشه است."],
        p: [["گل", "میوه می‌دهد."], ["برگ", "نور خورشید را می‌گیرد."]] },
      "sprout-40": { t: ["هر روز هوا را در جدول می‌نویسیم.", "از جدول می‌فهمیم کدام هوا بیشتر بود."], f: ["جدول هوا فقط یک روز را نشان می‌دهد."],
        p: [["ستون بلندتر", "یعنی روزهای بیشتر."], ["روزهای آفتابی را شمردیم و", "در جدول کشیدیم."]] },
      "sprout-41": { t: ["پیش‌بینی هوا می‌گوید فردا چطور است.", "اگر پیش‌بینی برف گفت، لباس گرم آماده می‌کنیم."], f: ["پیش‌بینی هوا را فقط بعد از باران می‌گویند."],
        p: [["پیش‌بینی گفت باد شدید می‌آید،", "پس چیزهای سبک بالکن را جمع کردیم."], ["پیش‌بینی گفت باران می‌آید،", "پس چتر برداشتیم."]] },
      "sprout-28": { t: ["هل محکم‌تر، توپ را تندتر و دورتر می‌برد.", "هل از کنار، جهت توپ را عوض می‌کند."], f: ["توپی که قِل می‌خورد هیچ‌وقت نمی‌ایستد."],
        p: [["دست را جلوی توپ گرفتیم و", "ایستاد."], ["ماشین را آرام هل دادیم،", "کمی رفت."]] },
      "sprout-29": { t: ["تاب جلو و عقب می‌رود.", "فرفره دور خودش می‌چرخد."], f: ["سرسره دور خودش می‌چرخد."],
        p: [["توپ از سراشیبی", "قِل می‌خورد."], ["بچه از سرسره", "سُر می‌خورد."]] },
      "sprout-33": { t: ["سنگی که در آفتاب است گرم‌تر از سنگ سایه است.", "آفتاب آب را گرم می‌کند."], f: ["سایه از آفتاب گرم‌تر است."],
        p: [["برای عروسک سایه درست کردیم،", "تا گرم نشود."], ["ظرف آب در آفتاب", "گرم شد."]] },
      "sprout-35": { t: ["مورچه‌ها زیر خاک لانه می‌کنند.", "ریشه درخت می‌تواند سنگ را بشکند."], f: ["جانوران هیچ‌وقت جایی را تغییر نمی‌دهند."],
        p: [["پرنده با شاخه", "لانه می‌سازد."], ["آدم‌ها", "خانه و سد می‌سازند."]] },
      "sprout-18": { t: ["ایران کم‌باران است و باید آب را نگه داریم.", "وقت مسواک زدن شیر آب را می‌بندیم."], f: ["شیلنگ باز کمتر از سطل آب مصرف می‌کند."],
        p: [["ماشین را با سطل شستیم،", "آب کمتری مصرف شد."], ["شیر آب چکه می‌کرد،", "پس محکم بستیمش."]] },
      "sprout-36": { t: ["بطری پلاستیکی در سطل پلاستیک می‌رود.", "شیشه مربا را می‌شود دوباره استفاده کرد."], f: ["پوست میوه در سطل شیشه می‌رود."],
        p: [["روزنامه", "در سطل کاغذ می‌رود."], ["جعبه خالی را", "جای اسباب‌بازی کردیم."]] },
      "sprout-30": { t: ["پیش از ساختن، نقشه می‌کشیم.", "قایق را امتحان می‌کنیم و بهترش می‌کنیم."], f: ["سازنده‌ها هیچ‌وقت چیزی را امتحان نمی‌کنند."],
        p: [["قایق فویلی لبه‌دار", "سنگ‌ریزه بیشتری نگه داشت."], ["قایق غرق شد،", "پس دوباره ساختیمش."]] },
      "sprout-2": { t: ["آب در سرما یخ می‌زند.", "یخ در گرما آب می‌شود."], f: ["یخ در آفتاب سفت‌تر می‌شود."],
        p: [["آب را گرم کنیم،", "بخار می‌شود."], ["آب را در فریزر بگذاریم،", "یخ می‌شود."]] },
      "sprout-24": { t: ["چای داغ کم‌کم سرد می‌شود.", "فلاسک چای را گرم نگه می‌دارد."], f: ["پتو ما را سرد می‌کند."],
        p: [["در زمستان", "لباس پشمی گرممان می‌کند."], ["لیوان شیر داغ روی میز", "کم‌کم خنک شد."]] },
      "sprout-25": { t: ["سنگ جامد است و شکلش را نگه می‌دارد.", "آب مایع است و شکل لیوان را می‌گیرد."], f: ["آب در هر ظرفی شکل خودش را نگه می‌دارد."],
        p: [["ماسه را می‌شود ریخت،", "ولی هر دانه‌اش جامد است."], ["شیر را در کاسه ریختیم و", "شکل کاسه را گرفت."]] },
      "sprout-3": { t: ["تکه چوب روی آب می‌ماند.", "سنگ در آب فرو می‌رود."], f: ["کلید روی آب می‌ماند."],
        p: [["برگ", "روی آب می‌ماند."], ["سکه", "ته آب می‌رود."]] },
      "sprout-17": { t: ["آب دریا شور است.", "آب رود و چشمه شیرین است."], f: ["آب دریا را می‌شود همین‌طوری نوشید."],
        p: [["قنات", "آب زیر زمین را به روستا می‌آورد."], ["آب رود", "با لوله به شیر خانه می‌رسد."]] },
      "sprout-19": { t: ["هوا بادکنک را پر می‌کند.", "هوا را نمی‌بینیم، ولی همه جا هست."], f: ["کیسه خالی هیچ هوایی ندارد."],
        p: [["لیوان را برعکس در آب فرو کردیم،", "داخلش خشک ماند."], ["هوای بادکنک را ول کردیم و", "بادکنک پرید."]] },
      "sprout-20": { t: ["باد هوایی است که حرکت می‌کند.", "باد فرفره را می‌چرخاند."], f: ["باد لباس خیس را خیس‌تر می‌کند."],
        p: [["باد", "دانه قاصدک را دور می‌برد."], ["روز بادی", "لباس‌ها زودتر خشک می‌شوند."]] },
      "sprout-21": { t: ["سنگ‌ها رنگ‌ها و اندازه‌های مختلف دارند.", "فیروزه نیشابور سنگی آبی و زیباست."], f: ["همه سنگ‌ها یک رنگ‌اند."],
        p: [["سنگ سخت‌تر", "روی سنگ نرم‌تر خط می‌اندازد."], ["آدم‌ها با سنگ", "خانه و پل می‌سازند."]] },
      "sprout-22": { t: ["خاک ریزه‌سنگ و تکه‌های برگ دارد.", "کرم خاکی به خاک کمک می‌کند."], f: ["خاک فقط از آب درست شده."],
        p: [["خاک و آب را در شیشه تکان دادیم و", "لایه‌لایه ته نشست."], ["سنگ‌ریزه‌های سنگین", "زودتر از همه ته نشستند."]] },
      "sprout-23": { t: ["آب دریا شور است.", "باد همان هوای در حرکت است."], f: ["خاک زنده است و راه می‌رود."],
        p: [["بادکنک", "پر از هواست."], ["کرم خاکی", "در خاک زندگی می‌کند."]] },
      "sprout-4": { t: ["صبح خورشید از یک طرف آسمان بالا می‌آید.", "ظهر خورشید بالای آسمان است."], f: ["خورشید شب‌ها وسط آسمان است."],
        p: [["عصر خورشید", "پایین می‌رود."], ["وقتی آن طرف زمین روز است،", "اینجا شب است."]] },
      "sprout-32": { t: ["شکل ماه در یک ماه کم‌کم عوض می‌شود.", "بعد از ماه کامل، ماه دوباره باریک می‌شود."], f: ["ماه هر شب همان شکل است."],
        p: [["هلال باریک", "کم‌کم پر می‌شود."], ["در دفترچه ماه", "هر شب شکل ماه را کشیدیم."]] },
      "sprout-5": { t: ["در پاییز برگ درخت‌ها زرد می‌شوند و می‌ریزند.", "در بهار درخت‌ها شکوفه می‌دهند."], f: ["در زمستان هوا از تابستان گرم‌تر است."],
        p: [["بعد از زمستان", "بهار می‌آید."], ["در تابستان", "روزها بلندتر و گرم‌ترند."]] },
      "sprout-34": { t: ["فصل‌ها پشت سر هم می‌آیند و دوباره تکرار می‌شوند.", "ماه کامل گرد است."], f: ["بعد از بهار، زمستان می‌آید."],
        p: [["بعد از تابستان", "پاییز می‌آید."], ["ماه نو", "کم‌کم هلال می‌شود."]] },
      "sprout-37": { t: ["در اتاق کاملاً تاریک چیزی نمی‌بینیم.", "نور از شیشه رد می‌شود."], f: ["نور از تخته چوبی رد می‌شود."],
        p: [["جلوی نور چراغ‌قوه دست گرفتیم و", "سایه افتاد."], ["از کاغذ نازک", "کمی نور رد می‌شود."]] },
      "sprout-38": { t: ["طبل وقتی صدا می‌دهد می‌لرزد.", "لرزش صدا درست می‌کند."], f: ["چیزی که صدا می‌دهد هیچ‌وقت نمی‌لرزد."],
        p: [["روی طبل برنج ریختیم و زدیم،", "برنج‌ها پریدند."], ["خط‌کش را روی میز لرزاندیم و", "صدا داد."]] },
      "sprout-39": { t: ["با چراغ‌قوه می‌شود از دور پیام فرستاد.", "صدا از نخ تلفن لیوانی رد می‌شود."], f: ["تلفن لیوانی با نخ شل بهتر کار می‌کند."],
        p: [["نخ را کشیده نگه داشتیم و", "صدا را شنیدیم."], ["دو بار طبل زدن", "یعنی «بیا!»"]] },
      "sprout-45": { t: ["نور از شیشه پنجره رد می‌شود.", "سیم گیتار وقتی صدا می‌دهد می‌لرزد."], f: ["در تاریکی کامل همه چیز را خوب می‌بینیم."],
        p: [["زنگ را زدیم و", "لرزید و صدا داد."], ["دیوار نور را رد نمی‌کند،", "پس پشتش سایه است."]] },
      "sprout-8": { t: ["قلب ما خون را در بدن می‌چرخاند.", "ما با شش‌ها نفس می‌کشیم."], f: ["زانو هیچ‌وقت خم نمی‌شود."],
        p: [["بعد از پریدن", "قلبمان تندتر می‌زند."], ["استخوان‌ها", "بدن ما را نگه می‌دارند."]] },
      "sprout-9": { t: ["ما اول نوزاد بودیم، بعد کودک شدیم.", "دست ما حالا از وقتی نوزاد بودیم بزرگ‌تر است."], f: ["پدربزرگ‌ها هیچ‌وقت کودک نبوده‌اند."],
        p: [["کودک", "بزرگ می‌شود و نوجوان می‌شود."], ["وقتی بزرگ می‌شویم،", "قدمان بلندتر می‌شود."]] },
      "sprout-42": { t: ["بچه‌گربه شبیه پدر و مادرش است.", "بچه‌گربه‌های یک گربه عین هم نیستند."], f: ["بچه‌گربه شبیه مرغ است."],
        p: [["دانه‌های یک گیاه", "گیاه‌های شبیه هم می‌شوند."], ["بره", "شبیه گوسفند مادرش است."]] },
      "sprout-43": { t: ["پرنده به جوجه‌هایش غذا می‌دهد.", "جوجه گرسنه جیک‌جیک می‌کند و نوکش را باز می‌کند."], f: ["پدر و مادرها هیچ‌وقت از بچه‌ها مراقبت نمی‌کنند."],
        p: [["مرغ", "جوجه‌ها را زیر بالش گرم نگه می‌دارد."], ["بره ترسید و", "مادرش را صدا کرد."]] },
      "sprout-44": { t: ["کلاه ایمنی را از روی لاک لاک‌پشت ساخته‌اند.", "کاکتوس آب را در تنه‌اش نگه می‌دارد."], f: ["چسب لباس را از روی سنگ ساخته‌اند."],
        p: [["دانه‌های خاردار", "به پشم حیوان می‌چسبند."], ["آدم‌ها از طبیعت", "ایده می‌گیرند."]] },
      "sprout-6": { t: ["قاشق چوبی از چوب است.", "کلید از فلز است."], f: ["پنجره از پارچه ساخته شده."],
        p: [["پیراهن", "از پارچه است."], ["بطری آب معدنی", "از پلاستیک است."]] },
      "sprout-26": { t: ["پلاستیک آب را بیرون نگه می‌دارد.", "برای پنجره شیشه خوب است، چون نور رد می‌شود."], f: ["کاغذ برای بارانی بهترین جنس است."],
        p: [["روی دستمال کاغذی آب ریختیم و", "آب رد شد."], ["کش را کشیدیم و", "دراز شد."]] },
      "sprout-27": { t: ["شیر مایع است.", "فلاسک چای را گرم نگه می‌دارد."], f: ["یخ مایع است."],
        p: [["سکه فلزی", "در آب فرو می‌رود."], ["کیسه پلاستیکی", "آب را نگه می‌دارد."]] },
      "sprout-31": { t: ["قدیم با چراغ روغنی اتاق را روشن می‌کردند.", "امروز ماشین لباسشویی لباس‌ها را می‌شوید."], f: ["قدیم همه با ماشین سفر می‌کردند."],
        p: [["گاری اسبی قدیم", "حالا جایش را به ماشین داده."], ["چراغ روغنی", "جایش را به لامپ داد."]] }
    },
    sapling: {
      "sapling-9": { t: ["در آزمایش منصفانه فقط یک چیز را عوض می‌کنیم.", "بقیه چیزها باید یکسان بمانند."], f: ["در آزمایش منصفانه همه چیز را با هم عوض می‌کنیم."],
        p: [["به هر حوله یک قاشق آب دادیم،", "تا مقایسه منصفانه باشد."], ["حوله‌ای که آب بیشتری جذب کرد،", "برای خشک کردن بهتر است."]] },
      "sapling-10": { t: ["طول را با خط‌کش و سانتی‌متر اندازه می‌گیریم.", "جرم را با ترازو و گرم اندازه می‌گیریم."], f: ["خط‌کش را از وسطش می‌گذاریم و می‌خوانیم."],
        p: [["دو بار اندازه گرفتیم،", "تا مطمئن شویم."], ["کفه سنگین‌تر ترازو", "پایین می‌رود."]] },
      "sapling-11": { t: ["با پیمانه حجم آب را اندازه می‌گیریم.", "دماسنج نشان می‌دهد چقدر گرم یا سرد است."], f: ["دماسنج طول میز را اندازه می‌گیرد."],
        p: [["خط قرمز دماسنج بالا رفت،", "یعنی هوا گرم‌تر شد."], ["سطح آب را از روبه‌رو", "و هم‌سطح چشم می‌خوانیم."]] },
      "sapling-12": { t: ["نتیجه آزمایش را در جدول می‌نویسیم.", "نمودار نشان می‌دهد کدام بیشتر بود."], f: ["نتیجه را نمی‌نویسیم تا یادمان برود."],
        p: [["ستون بلندتر نمودار", "یعنی عدد بزرگ‌تر."], ["نتیجه را نوشتیم", "تا بعداً با هم مقایسه کنیم."]] },
      "sapling-41": { t: ["ماده سه حالت دارد: جامد، مایع و گاز.", "گاز همه جای ظرفش را پر می‌کند."], f: ["هوای داخل بادکنک جامد است."],
        p: [["بوی نان تازه", "در همه اتاق پخش شد."], ["یخ جامد است،", "آب مایع است."]] },
      "sapling-42": { t: ["اسفنج آب را جذب می‌کند.", "شیشه شفاف است و نور از آن رد می‌شود."], f: ["کیسه پلاستیکی آب را مثل حوله جذب می‌کند."],
        p: [["برای سقف", "جنسی می‌خواهیم که آب را رد نکند."], ["حوله", "باید آب را خوب جذب کند."]] },
      "sapling-43": { t: ["یخ آب می‌شود و دوباره می‌شود یخ زد.", "تخم‌مرغ پخته دیگر خام نمی‌شود."], f: ["نان پخته دوباره خمیر می‌شود."],
        p: [["شکلات آب‌شده را در یخچال گذاشتیم و", "دوباره سفت شد."], ["برنج را پختیم و", "دیگر برنج خام نشد."]] },
      "sapling-44": { t: ["دیوار خشتی از تکه‌های کوچک ساخته شده.", "قطعه‌ها را می‌شود جدا کرد و چیز تازه ساخت."], f: ["چیزی که از تکه‌ها ساخته شده هیچ‌وقت جدا نمی‌شود."],
        p: [["خانه لگویی را خراب کردیم و", "یک ماشین ساختیم."], ["با خشت‌های زیاد", "دیوار بلند می‌سازند."]] },
      "sapling-45": { t: ["آب‌شدن یخ برمی‌گردد.", "اسفنج آب را جذب می‌کند."], f: ["بخار آب جامد است."],
        p: [["شیر", "مایع است."], ["سوختن کاغذ", "برنمی‌گردد."]] },
      "sapling-29": { t: ["داخل دانه لوبیا یک گیاه خیلی کوچک هست.", "دانه برای سبز شدن آب، گرما و هوا می‌خواهد."], f: ["دانه در یخچال زودتر سبز می‌شود."],
        p: [["پوسته دانه", "از دانه محافظت می‌کند."], ["انبار غذای دانه", "به گیاه کوچک غذا می‌دهد."]] },
      "sapling-30": { t: ["هر هفته قد گیاه را با خط‌کش اندازه می‌گیریم.", "در آزمایش گیاه فقط نور را عوض کردیم."], f: ["برای مقایسه منصفانه، به یک گلدان آب ندادیم و دیگری را در کمد گذاشتیم."],
        p: [["گلدان آفتابی", "بلندتر و سبزتر شد."], ["قد گیاه را در جدول", "هر هفته نوشتیم."]] },
      "sapling-36": { t: ["زنبور گرده را از گلی به گل دیگر می‌برد.", "باد دانه قاصدک را دور می‌برد."], f: ["دانه‌ها هیچ‌وقت جابه‌جا نمی‌شوند."],
        p: [["پرنده میوه را خورد و", "دانه‌اش را جای دیگری ریخت."], ["دانه بال‌دار افرا", "چرخ‌چرخان دور می‌رود."]] },
      "sapling-13": { t: ["شکر در آب حل می‌شود.", "روغن روی آب می‌ماند."], f: ["ماسه در آب حل می‌شود و ناپدید می‌شود."],
        p: [["نمک را در آب هم زدیم و", "ناپدید شد."], ["آب کم است،", "پس باید آن را هدر ندهیم."]] },
      "sapling-14": { t: ["شکر در آب گرم زودتر حل می‌شود.", "هم زدن به حل شدن کمک می‌کند."], f: ["شکر در آب یخ زودتر از آب گرم حل می‌شود."],
        p: [["در هر لیوان یک قاشق شکر ریختیم،", "تا آزمایش منصفانه باشد."], ["چای داغ را هم زدیم و", "قند زود حل شد."]] },
      "sapling-1": { t: ["آفتاب آب را گرم می‌کند و آب بخار می‌شود.", "از قطره‌های ریز آب، ابر درست می‌شود."], f: ["باران از خورشید می‌بارد."],
        p: [["ابر سنگین شد و", "باران بارید."], ["آب باران", "به رود و دریا برمی‌گردد."]] },
      "sapling-15": { t: ["قنات آب زیر زمین را به روستا می‌آورد.", "پشت سد آب رود جمع می‌شود."], f: ["بیشتر جاهای ایران پرباران است."],
        p: [["در روستا", "از چاه آب برمی‌دارند."], ["آب سد", "با لوله به خانه‌ها می‌رسد."]] },
      "sapling-16": { t: ["درخت‌ها گرد و خاک هوا را می‌گیرند.", "دود ماشین هوا را کثیف می‌کند."], f: ["آبی که از صافی ماسه رد شد را می‌شود نوشید."],
        p: [["زباله را در رود انداختند و", "آب کثیف شد."], ["آب گل‌آلود از صافی رد شد و", "زلال‌تر شد."]] },
      "sapling-17": { t: ["نمک در آب حل می‌شود.", "آب گرم می‌شود، بالا می‌رود و ابر می‌شود."], f: ["ریختن روغن در جوی آب را تمیز نگه می‌دارد."],
        p: [["ابر", "باران می‌دهد."], ["زباله را در سطل انداختیم", "تا آب تمیز بماند."]] },
      "sapling-2": { t: ["آهنربا گیره فلزی را می‌کشد.", "آهنربا مداد چوبی را نمی‌کشد."], f: ["آهنربا پاک‌کن را می‌کشد."],
        p: [["آهنربا از پشت مقوا هم", "گیره را می‌کشد."], ["میخ آهنی", "به آهنربا می‌چسبد."]] },
      "sapling-18": { t: ["قطب شمال و قطب جنوب همدیگر را می‌کشند.", "عقربه قطب‌نما رو به شمال می‌ایستد."], f: ["دو قطب شمال همدیگر را می‌کشند."],
        p: [["گیره را با آهنربا مالیدیم و", "گیره هم آهنربا شد."], ["آهنربا را روی فرش کشیدیم و", "سوزن گم‌شده را پیدا کردیم."]] },
      "sapling-3": { t: ["سایه طرف دیگرِ خورشید می‌افتد.", "ظهر سایه کوتاه است."], f: ["صبح زود سایه‌ها از همه کوتاه‌ترند."],
        p: [["خورشید پایین آسمان است،", "سایه بلند است."], ["چیزی جلوی نور را گرفت،", "پس سایه افتاد."]] },
      "sapling-19": { t: ["خورشید و چراغ خودشان نور دارند.", "ماه خودش نور ندارد و نور خورشید را برمی‌گرداند."], f: ["از چشم ما نور بیرون می‌آید و چیزها را روشن می‌کند."],
        p: [["نور به سیب خورد و", "به چشم ما رسید."], ["چراغ را خاموش کردیم و", "دیگر چیزی ندیدیم."]] },
      "sapling-20": { t: ["زمین دور خودش می‌چرخد.", "طرفی از زمین که رو به خورشید است روز است."], f: ["شب می‌شود چون خورشید خاموش می‌شود."],
        p: [["زمین چرخید و خانه ما", "رو به خورشید آمد: صبح شد."], ["خورشید فقط به نظر می‌رسد راه می‌رود،", "در واقع ما با زمین می‌چرخیم."]] },
      "sapling-21": { t: ["با سایه چوب می‌شود فهمید ساعت چند است.", "سایه در طول روز جابه‌جا می‌شود."], f: ["ساعت آفتابی در روز ابری بهتر کار می‌کند."],
        p: [["فردا ساعت ۹ صبح", "سایه دوباره روی سنگ اول افتاد."], ["ظهر", "سایه چوب از همه کوتاه‌تر شد."]] },
      "sapling-22": { t: ["شمع روشن منبع نور است.", "از کاغذ نازک کمی نور رد می‌شود."], f: ["آینه خودش نور درست می‌کند."],
        p: [["دست را به چراغ‌قوه نزدیک کردیم و", "سایه بزرگ‌تر شد."], ["عصر خورشید طرف غرب است و", "سایه طرف شرق می‌افتد."]] },
      "sapling-4": { t: ["مرال در جنگل‌های شمال زندگی می‌کند.", "یوزپلنگ ایرانی در کویر زندگی می‌کند."], f: ["دلفین در کویر لوت زندگی می‌کند."],
        p: [["بز کوهی", "در کوه‌های زاگرس بالا می‌رود."], ["دلفین‌ها", "در خلیج فارس شنا می‌کنند."]] },
      "sapling-23": { t: ["دماوند بلندترین کوه ایران است.", "برف آبِ جامد است."], f: ["کویر لوت پر از آب و دریاچه است."],
        p: [["برف قله آب شد و", "رود راه افتاد."], ["دریاچه ارومیه", "آب شور دارد."]] },
      "sapling-24": { t: ["رود در هزاران سال دره را گود می‌کند.", "ریشه درخت‌ها خاک را نگه می‌دارند."], f: ["سیل خیلی آرام و در هزاران سال می‌آید."],
        p: [["باد ماسه را آورد و", "کم‌کم کلوت‌ها را ساخت."], ["روی تپه بی‌درخت", "باران خاک را شست و برد."]] },
      "sapling-57": { t: ["وقتی دریاچه ارومیه کوچک شد، آرتمیاها کم شدند.", "فلامینگو می‌تواند پرواز کند و جای دیگری برود."], f: ["گیاه‌ها می‌توانند راه بروند و از خطر فرار کنند."],
        p: [["آب رودها را برداشتند و", "دریاچه کوچک شد."], ["مردم آب را هدر ندادند و", "دریاچه کمی پر شد."]] },
      "sapling-5": { t: ["هل دادن چیزی را از ما دور می‌کند.", "کشیدن چیزی را به طرف ما می‌آورد."], f: ["کشیدن سورتمه آن را از ما دور می‌کند."],
        p: [["توپ را محکم هل دادیم و", "خیلی دور رفت."], ["در کشو را کشیدیم و", "باز شد."]] },
      "sapling-25": { t: ["نیروی بیشتر، تغییر بیشتری درست می‌کند.", "نیرو می‌تواند شکل چیزی را عوض کند."], f: ["وقتی دو طرف طناب‌کشی هم‌زورند، طناب تند جابه‌جا می‌شود."],
        p: [["خمیر را محکم فشار دادیم و", "خیلی پهن شد."], ["مریم توپ را به طرف دیگر زد و", "جهتش عوض شد."]] },
      "sapling-26": { t: ["سیب می‌افتد چون زمین آن را می‌کشد.", "آهنربا بدون تماس هم گیره را می‌کشد."], f: ["توپی که بالا بیندازیم همیشه بالا می‌ماند."],
        p: [["بادکنک را به مو مالیدیم و", "تکه‌های کاغذ را کشید."], ["توپ را بالا انداختیم و", "زمین آن را پایین کشید."]] },
      "sapling-27": { t: ["سنگین نزدیک وسط با سبک دور از وسط هم‌وزن می‌شود.", "دسته بلند بلند کردن را آسان‌تر می‌کند."], f: ["قاشق با دسته کوتاه در قوطی را راحت‌تر باز می‌کند."],
        p: [["بابا نزدیک وسط الاکلنگ نشست و", "الاکلنگ صاف شد."], ["دسته قاشق را پایین دادیم و", "در قوطی باز شد."]] },
      "sapling-28": { t: ["هل دادن چرخ‌دستی نیروی با تماس است.", "افتادن برگ نیروی بدون تماس است."], f: ["سه نفر در برابر دو نفر، طناب را به طرف دو نفر می‌برد."],
        p: [["یک طرف زورش بیشتر شد و", "طناب به طرف او رفت."], ["آهنربا", "میخ را از دور کشید."]] },
      "sapling-6": { t: ["قورباغه اول تخم است، بعد بچه‌قورباغه.", "کرم پروانه پیله می‌سازد و پروانه می‌شود."], f: ["جوجه اول مرغ است، بعد تخم می‌شود."],
        p: [["دانه سبز شد و", "گیاه بزرگ شد و گل داد."], ["از تخم‌مرغ", "جوجه بیرون آمد."]] },
      "sapling-31": { t: ["بچه‌ها ویژگی‌ها را از پدر و مادر می‌گیرند.", "گیاه در سایه بلند و کم‌رنگ می‌شود."], f: ["همه بچه‌گربه‌های یک گربه عین هم‌اند."],
        p: [["بوته خارهای بلند داشت،", "پس بز آن را نخورد."], ["مادر نارنجی و پدر خاکستری بود،", "بچه‌ها رنگ‌های مختلف شدند."]] },
      "sapling-32": { t: ["ماهی با آبشش نفس می‌کشد.", "قورباغه دوزیست است."], f: ["کرم خاکی ستون مهره دارد."],
        p: [["وزغ تخم را در آب می‌گذارد و", "نوزادش در آب شنا می‌کند."], ["ماهی خاویاری", "در دریای خزر زندگی می‌کند."]] },
      "sapling-33": { t: ["پرنده پر دارد و تخم می‌گذارد.", "خفاش پستاندار است و به بچه‌اش شیر می‌دهد."], f: ["خفاش پرنده است چون پرواز می‌کند."],
        p: [["مارمولک", "پوست خشک و فلس‌دار دارد."], ["بره", "از مادرش شیر می‌خورد."]] },
      "sapling-35": { t: ["مار خزنده است.", "شتر پستاندار است."], f: ["کوسه پستاندار است چون شنا می‌کند."],
        p: [["دوزیست", "پوست نرم و خیس دارد."], ["پرنده", "با پر پوشیده شده."]] },
      "sapling-34": { t: ["لک‌لک لانه‌اش را بالای مناره می‌سازد.", "زنبورخوار در دیواره خاکی تونل می‌کند."], f: ["روباه لانه‌اش را روی درخت می‌سازد."],
        p: [["پرنده روی تخم‌ها نشست", "تا گرم بمانند."], ["لانه پرنده را دیدیم و", "از دور نگاهش کردیم."]] },
      "sapling-56": { t: ["بزهای کوهی یک نگهبان دارند.", "در کندو هر زنبوری کاری دارد."], f: ["درناها تک‌تک و دور از هم پرواز می‌کنند."],
        p: [["نگهبان پلنگ را دید و", "گله فرار کرد."], ["مورچه‌ها با هم", "دانه بزرگ را بردند."]] },
      "sapling-55": { t: ["فسیل جای جانور یا گیاهی است که در سنگ مانده.", "در کوه‌های ایران فسیل صدف پیدا می‌شود."], f: ["فسیل در یک روز درست می‌شود."],
        p: [["گل روی صدف سفت شد و", "سنگ شد."], ["در کوه فسیل صدف دیدیم،", "پس روزگاری آنجا دریا بوده."]] },
      "sapling-7": { t: ["زنجیره غذایی با گیاه شروع می‌شود.", "ملخ علف می‌خورد."], f: ["زنجیره غذایی با جغد شروع می‌شود."],
        p: [["گنجشک ملخ را می‌خورد و", "جغد گنجشک را."], ["گیاه", "با نور خورشید غذا می‌سازد."]] },
      "sapling-37": { t: ["غذا به ما انرژی می‌دهد.", "غذا مصالح رشد بدن را می‌دهد."], f: ["کفش ما هم با ما رشد می‌کند."],
        p: [["پای ما رشد کرد،", "پس کفش پارسال تنگ شد."], ["صبحانه خوردیم و", "انرژی بازی کردن داشتیم."]] },
      "sapling-38": { t: ["زنبور گرده را جابه‌جا می‌کند.", "دلفین در خلیج فارس زندگی می‌کند."], f: ["زنجیره غذایی دریا با دلفین شروع می‌شود."],
        p: [["سنجاب دانه را زیر خاک چال کرد و", "درخت تازه سبز شد."], ["ماهی کوچک گیاهان ریز دریا را می‌خورد و", "ماهی بزرگ ماهی کوچک را."]] },
      "sapling-8": { t: ["صدا از لرزیدن درست می‌شود.", "صدا از هوا، آب و چیزهای سفت رد می‌شود."], f: ["صدا فقط از هوا رد می‌شود، نه از دیوار."],
        p: [["گوش را روی میز گذاشتیم و", "صدای ضربه را بهتر شنیدیم."], ["سیم را لمس کردیم و", "لرزش آن ایستاد و صدا قطع شد."]] },
      "sapling-39": { t: ["کش نازک صدای زیر می‌دهد.", "شیشه پرآب‌تر صدای بم‌تری می‌دهد."], f: ["کش را آرام بکشیم، صدا بلندتر می‌شود."],
        p: [["کش را محکم کشیدیم و", "صدا بلند شد."], ["کش کلفت آرام لرزید و", "صدای بم داد."]] },
      "sapling-51": { t: ["دماسنج دمای هوا را نشان می‌دهد.", "با دیدن تکان خوردن برگ‌ها می‌فهمیم باد می‌آید."], f: ["ظهر معمولاً از صبح زود سردتر است."],
        p: [["هر روز دما را نوشتیم و", "آخر هفته نمودار کشیدیم."], ["ستون سه‌شنبه از همه کوتاه‌تر بود،", "پس آن روز سردتر بود."]] },
      "sapling-52": { t: ["رشت پرباران است.", "یزد خشک و کم‌باران است."], f: ["بندرعباس زمستان‌های پربرف و خیلی سرد دارد."],
        p: [["هوا یعنی امروز چطور است؛", "آب و هوا یعنی هر سال معمولاً چطور است."], ["زمستان به اردبیل می‌رویم،", "پس لباس گرم برمی‌داریم."]] },
      "sapling-53": { t: ["در تگرگ زیر سقف می‌مانیم.", "ردیف درخت‌ها جلوی باد و خاک را می‌گیرند."], f: ["وقتی آب رود بالا می‌آید، کنار رود می‌رویم تا تماشا کنیم."],
        p: [["پیش‌بینی هوا گفت تگرگ می‌آید،", "پس آماده شدیم."], ["طوفان گرد و خاک آمد،", "پس پنجره‌ها را بستیم."]] },
      "sapling-46": { t: ["نفت و گاز از اعماق زمین می‌آیند.", "خاموش کردن چراغ اتاق خالی صرفه‌جویی است."], f: ["اگر نفت تمام شود، فردا دوباره درست می‌شود."],
        p: [["گاز از لوله", "به بخاری خانه می‌رسد."], ["ژاکت پوشیدیم", "به جای اینکه بخاری را زیاد کنیم."]] },
      "sapling-47": { t: ["پوست میوه روی تپه کود خاک خوب می‌شود.", "لیوان شستنی زباله کمتری درست می‌کند."], f: ["بشقاب کاغذی در سطل شیشه می‌رود."],
        p: [["بطری شیشه‌ای را دور نینداختیم و", "گلدان کردیم."], ["کیسه پارچه‌ای برای خرید", "کیسه پلاستیکی را کم می‌کند."]] },
      "sapling-48": { t: ["سازنده‌ها اول می‌پرسند چه می‌خواهیم.", "پل کاغذی تاشده سکه‌های بیشتری نگه داشت."], f: ["وقتی پل اول افتاد، دست کشیدیم."],
        p: [["طرح را روی کاغذ کشیدیم،", "بعد ساختیم."], ["پل خم شد،", "پس بهترش کردیم."]] },
      "sapling-49": { t: ["یخِ داخل جوراب پشمی دیرتر آب شد.", "پشم گرما را دیر رد می‌کند."], f: ["برای مقایسه منصفانه یک یخ بزرگ و یک یخ کوچک برمی‌داریم."],
        p: [["دو راه را امتحان کردیم و", "زمان آب شدن را اندازه گرفتیم."], ["یخ در لیوان فلزی", "زودتر آب شد."]] },
      "sapling-50": { t: ["قدیم گندم را با داس درو می‌کردند.", "در نشتیفان آسیاب‌های بادی خیلی قدیمی هست."], f: ["آسیاب آبی با زور باد می‌چرخد."],
        p: [["گندم را آسیاب کردند و", "آرد شد."], ["آب رود", "چرخ آسیاب را می‌چرخاند."]] },
      "sapling-54": { t: ["در آزمایش منصفانه فقط یک چیز فرق دارد.", "رنگ چشم را از پدر و مادر می‌گیریم."], f: ["افتادن سیب نیروی با تماس است."],
        p: [["رشت هر سال پرباران است:", "این آب و هوای رشت است."], ["هر دو توپ را از یک ارتفاع ول کردیم", "تا آزمایش منصفانه باشد."]] }
    }
  };

  // The lessons of this garden's bank that are done: the newest first, then the rest in a fresh order; keys missed
  // last time (prefix + lesson) before all of them.
  function doneFacts(rng, ctx, bank, prefix) {
    var done = ctx.doneIds.filter(function (id) { return bank[id.replace(/^science-/, "")]; }).map(function (id) { return id.replace(/^science-/, ""); });
    if (!done.length) return [];
    var newest = done[done.length - 1];
    var again = ctx.again.filter(function (k) { return k.indexOf(prefix) === 0 && done.indexOf(k.slice(prefix.length)) >= 0; }).map(function (k) { return k.slice(prefix.length); });
    var rest = rng.shuffle(done.filter(function (id) { return id !== newest && again.indexOf(id) < 0; }));
    return again.concat(again.indexOf(newest) < 0 ? [newest] : [], rest);
  }

  function factGens(garden, ids, objectives) {
    var all = Object.keys(FACTS[garden]).map(L);
    // Sort into true or false: the lesson's three sentences and one from another lesson done.
    B.PRACTICE.push({
      id: ids[0], subject: "science", level: garden, objectives: objectives, needs: [all[0]], lessons: all,
      emoji: "✅", title: "درست یا نادرست؟",
      words: { ask: "هر جمله را بشنو. درست است یا نادرست؟", yes: "درست", no: "نادرست", f: FACTS[garden] },
      make: function (rng, n, ctx) {
        var f = ctx.w("f"), list = doneFacts(rng, ctx, f, "tf:");
        return list.slice(0, n).map(function (id) {
          // The lesson's two true sentences, and a false one and one more from other lessons done (so the lesson's own
          // false sentence is left for «اشتباه را پیدا کن» in the same set); the lesson's own when it is the only one.
          var e = f[id], other = list.filter(function (x) { return x !== id; });
          var item = function (s, yes) { return { label: s, say: s, basket: yes ? "yes" : "no" }; };
          var items = e.t.map(function (s) { return item(s, true); });
          if (!other.length) items.push(item(e.f[0], false));
          else {
            var o = rng.sample(other, 2), yes = rng() < 0.5;
            items.push(item(f[o[0]].f[0], false));
            if (o[1]) items.push(yes ? item(rng.pick(f[o[1]].t), true) : item(f[o[1]].f[0], false));
          }
          return { type: "sort", key: "tf:" + id, prompt: ctx.w("ask"), say: ctx.w("ask"),
            baskets: [{ label: ctx.w("yes"), pic: "✅", value: "yes" }, { label: ctx.w("no"), pic: "❌", value: "no" }], items: rng.shuffle(items) };
        });
      }
    });
    // Find the mistake: the lesson's false sentence, one of its true ones and a true one from another lesson done.
    B.PRACTICE.push({
      id: ids[1], subject: "science", level: garden, objectives: objectives, needs: [all[0]], lessons: all,
      emoji: "🔎", title: "اشتباه را پیدا کن",
      words: { ask: "یکی از این جمله‌ها اشتباه است. کدام؟", f: FACTS[garden] },
      make: function (rng, n, ctx) {
        var f = ctx.w("f"), list = doneFacts(rng, ctx, f, "err:");
        return list.slice(0, n).map(function (id) {
          var e = f[id], other = list.filter(function (x) { return x !== id; });
          var truths = other.length ? [rng.pick(e.t), rng.pick(f[rng.pick(other)].t)] : e.t;
          return { type: "choose", key: "err:" + id, prompt: ctx.w("ask"), say: ctx.w("ask"), options: rng.shuffle(truths.concat(e.f)), answer: e.f[0] };
        });
      }
    });
    // Match each start to its end: the lesson's two sentences and one from another lesson done.
    B.PRACTICE.push({
      id: ids[2], subject: "science", level: garden, objectives: objectives, needs: [all[0]], lessons: all,
      emoji: "🔗", title: "اول و آخر جمله",
      words: { ask: "اول هر جمله را به آخرش برسان.", f: FACTS[garden] },
      make: function (rng, n, ctx) {
        var f = ctx.w("f"), list = doneFacts(rng, ctx, f, "pair:");
        return list.slice(0, n).map(function (id) {
          var pairs = f[id].p.slice(), other = list.filter(function (x) { return x !== id; });
          if (other.length) pairs.push(rng.pick(f[rng.pick(other)].p));
          return { type: "pairs", key: "pair:" + id, prompt: ctx.w("ask"), say: ctx.w("ask"),
            pairs: rng.shuffle(pairs).map(function (p) { return [{ label: p[0], say: p[0] }, { label: p[1], say: p[1] }]; }) };
        });
      }
    });
  }
  factGens("seed", ["science-seed-p5", "science-seed-p6", "science-seed-p7"],
    ["science.seed.1", "science.seed.2", "science.seed.3", "science.seed.4", "science.seed.5", "science.seed.6", "science.seed.7", "science.seed.8",
      "science.seed.9", "science.seed.10", "science.seed.11", "science.seed.12", "science.seed.13", "science.seed.14", "science.seed.15"]);
  factGens("sprout", ["science-sprout-p6", "science-sprout-p7", "science-sprout-p8"],
    ["science.spr.1", "science.spr.2", "science.spr.3", "science.spr.4", "science.spr.5", "science.spr.6", "science.spr.7", "science.spr.8", "science.spr.9",
      "science.spr.10", "science.spr.11", "science.spr.12", "science.spr.13", "science.spr.14", "science.spr.15", "science.spr.16", "science.spr.17",
      "science.spr.18", "science.spr.19", "science.spr.20", "science.spr.21", "science.spr.22", "science.spr.23"]);
  factGens("sapling", ["science-sapling-p8", "science-sapling-p9", "science-sapling-p10"],
    ["science.sap.1", "science.sap.2", "science.sap.3", "science.sap.4", "science.sap.5", "science.sap.6", "science.sap.7", "science.sap.8", "science.sap.9",
      "science.sap.10", "science.sap.11", "science.sap.12", "science.sap.13", "science.sap.14", "science.sap.15", "science.sap.16", "science.sap.17",
      "science.sap.18", "science.sap.19", "science.sap.20", "science.sap.21", "science.sap.22", "science.sap.23", "science.sap.24", "science.sap.25",
      "science.sap.26", "science.sap.27", "science.sap.28"]);
})();
