/* باغچه — practice generators for سلامت و ایمنی (subject health). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/health.js. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  /* Shared helpers. Every bank entry has an id (its key and its word), a picture, and optionally `after`: the lesson
     that teaches it (it is used only once that lesson is done). Words are looked up by id in the generator's words
     (ctx.w("t")[id]), so the same rng calls make the same items in Persian and English. */
  function open(bank, ctx) { return bank.filter(function (x) { return !x.after || ctx.done(x.after); }); }
  function byId(bank) { var m = {}; bank.forEach(function (x) { m[x.id] = x; }); return m; }

  /* Sort: steps of `per` items into baskets, with at least two items in each basket. The key is the mix ("a+b+c"):
     a missed mix comes back as it was. Up to `most` steps. */
  function sortMaker(o) {
    return function (rng, n, ctx) {
      var bank = open(o.bank, ctx), t = ctx.w("t"), labels = ctx.w("baskets"), map = byId(o.bank);
      var values = o.baskets.map(function (b) { return b.value; });
      var have = values.filter(function (v) { return bank.filter(function (x) { return x.b === v; }).length >= 2; });
      if (have.length < 2) return [];
      var mixes = ctx.again.map(function (k) { return k.split("+"); }).filter(function (ids) {
        return ids.every(function (id) { return map[id] && bank.indexOf(map[id]) >= 0; });
      });
      var steps = [], seen = {}, most = Math.min(n, o.most || 2);
      for (var tries = 0; steps.length < most && tries < 12; tries++) {
        var ids = mixes.length ? mixes.shift() : null;
        if (!ids) {
          var each = Math.max(2, Math.floor((o.per || 6) / have.length)), pick = [];
          have.forEach(function (v) { pick = pick.concat(rng.sample(bank.filter(function (x) { return x.b === v; }), each)); });
          ids = pick.map(function (x) { return x.id; }).sort();
        }
        var key = ids.join("+");
        if (seen[key]) continue;
        seen[key] = true;
        var used = have.filter(function (v) { return ids.some(function (id) { return map[id].b === v; }); });
        steps.push({ type: "sort", key: key, prompt: ctx.w("prompt"),
          baskets: o.baskets.filter(function (b) { return used.indexOf(b.value) >= 0; }).map(function (b) { return { label: labels[b.value], pic: b.pic, value: b.value }; }),
          items: rng.shuffle(ids).map(function (id) { return { pic: map[id].pic, say: t[id], basket: map[id].b }; }) });
      }
      return steps;
    };
  }

  /* Order: each sequence is an item (key: its id), its steps in the right order; the player mixes them. */
  function orderMaker(o) {
    return function (rng, n, ctx) {
      var seqs = open(o.seqs, ctx), t = ctx.w("t"), asks = ctx.w("asks");
      var first = ctx.again.filter(function (k) { return seqs.some(function (s) { return s.id === k; }); });
      var ids = first.concat(rng.shuffle(seqs.map(function (s) { return s.id; })).filter(function (k) { return first.indexOf(k) < 0; }));
      return ids.slice(0, n).map(function (id) {
        var s = seqs.filter(function (x) { return x.id === id; })[0];
        return { type: "order", key: id, prompt: asks[id], numbered: true,
          items: s.steps.map(function (st) { return { pic: st[0], label: t[st[1]] }; }) };
      });
    };
  }

  /* Pairs: `per` pairs from the bank (key: the ids, sorted). Left: a picture and its word; right: the other side's
     word as a label, or (pics) a picture with its word for children who do not read yet. */
  function pairsMaker(o) {
    return function (rng, n, ctx) {
      var bank = open(o.bank, ctx), t = ctx.w("t"), r = ctx.w("r"), map = byId(o.bank);
      if (bank.length < 3) return [];
      var steps = [], seen = {}, most = Math.min(n, o.most || 2);
      var again = ctx.again.map(function (k) { return k.split("+"); }).filter(function (ids) {
        return ids.every(function (id) { return map[id] && bank.indexOf(map[id]) >= 0; });
      });
      for (var tries = 0; steps.length < most && tries < 12; tries++) {
        var ids = again.length ? again.shift() : rng.sample(bank, Math.min(o.per || 4, bank.length)).map(function (x) { return x.id; }).sort();
        var key = ids.join("+");
        if (seen[key]) continue;
        seen[key] = true;
        steps.push({ type: "pairs", key: key, prompt: ctx.w("prompt"), pairs: ids.map(function (id) {
          var x = map[id];
          return [{ pic: x.pic, say: t[id] }, o.pics ? { pic: x.right, say: r[id] } : { label: r[id], say: r[id] }];
        }) });
      }
      return steps;
    };
  }

  /* Choose: each situation is an item (key: its id). words.q[id] is the question, words.o[id] the options, the right
     one first; the player shows them in the order rng gives. */
  function chooseMaker(o) {
    return function (rng, n, ctx) {
      var bank = open(o.bank, ctx), q = ctx.w("q"), opts = ctx.w("o");
      var first = ctx.again.filter(function (k) { return bank.some(function (s) { return s.id === k; }); });
      var ids = first.concat(rng.shuffle(bank.map(function (s) { return s.id; })).filter(function (k) { return first.indexOf(k) < 0; }));
      return ids.slice(0, n).map(function (id) {
        var order = rng.shuffle([0, 1, 2]), all = opts[id];
        return { type: "choose", key: id, prompt: q[id], say: q[id], stack: true,
          options: order.map(function (i) { return all[i]; }), answer: all[0] };
      });
    };
  }

  /* Daily movement routines: one `move` step (a guided routine away from the screen, done with «انجام دادم!»).
     The moves and their poses; their words are in B.HEALTH_MOVES (Persian, below) and B.EN_HEALTH_MOVES (English,
     js/en/health.js). People: js/art/rig-health.js. */
  var MOVES = {
    march: { part: "warm", art: "h-girl", times: 16, pace: 1300, a: { legF: -60, shinF: 70, armB: -35 }, b: { legB: -60, shinB: 70, armF: -35 },
      easier: { a: { legF: -30, shinF: 40 }, b: { legB: -30, shinB: 40 } } },
    arms: { part: "warm", times: 8, a: { armL: [-11, -22], armR: [11, -22] }, b: { armL: [-9, -36], armR: [9, -36] } },
    hops: { part: "warm", times: 12, pace: 1000, a: {}, b: {}, hop: 3, easier: { hop: 1 } },
    frog: { art: "h-girl", times: 6, pace: 2200, sink: 10, hop: 8,
      a: { upper: 40, head: -30, legF: -80, shinF: 160, legB: -80, shinB: 160, armF: [9, -11.3], armB: [7.5, -11.3] },
      b: { upper: 0, head: 0, armF: [3, -33.5], armB: [1, -33.5] }, easier: { hop: 0 }, harder: { times: 10 } },
    bunny: { times: 8, pace: 1200, a: { armL: [-2, -34], armR: [2, -34] }, b: { armL: [-2, -34], armR: [2, -34] }, hop: 4, easier: { hop: 2 } },
    stork: { times: 5, pace: 1000, a: { armL: [-11, -22], armR: [11, -22], legR: -28 }, b: { armL: [-11, -24], armR: [11, -24], legR: -28 }, harder: { times: 10 } },
    runstop: { art: "h-girl", times: 8, pace: 1600, a: { legF: -50, shinF: 60, armB: -35, armF: 30 }, b: {}, hop: 2 },
    ball: { times: 8, pace: 1800, a: { armL: [-2, -34], armR: [2, -34] }, b: { armL: [-6.4, -18], armR: [6.4, -18] } },
    star: { times: 10, pace: 1400, a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -36], armR: [9, -36], legL: 14, legR: -14 }, hop: 4,
      easier: { hop: 0, b: { armL: [-9, -36], armR: [9, -36], legL: 14 } }, harder: { times: 20, pace: 1000 } },
    run: { art: "h-girl", times: 30, pace: 800, a: { legF: -50, shinF: 60, armB: -35, armF: 30 }, b: { legB: -50, shinB: 60, armF: -35, armB: 30 }, hop: 3,
      easier: { hop: 0, pace: 1100, times: 20 } },
    hop1: { art: "h-girl", times: 10, pace: 1200, a: { legB: -70, shinB: 100, armF: [8, -22] }, b: { legB: -70, shinB: 100, armF: [8, -22] }, hop: 4,
      easier: { times: 2, pace: 5000, hop: 0 } },
    gallop: { art: "h-girl", times: 12, pace: 1100, a: { legF: -50, shinF: 60, armB: -30 }, b: { legB: -50, shinB: 60, armF: -30 }, hop: 3 },
    rope: { times: 10, pace: 1100, a: { armL: [-9, -13], armR: [9, -13] }, b: { armL: [-9, -13], armR: [9, -13] }, hop: 4, easier: { hop: 1 } },
    throw: { art: "h-girl", times: 8, pace: 1800, a: { armF: [-5, -29], legF: -16, legB: 10 }, b: { armF: [8, -27], legF: -16, legB: 10 } },
    wall: { art: "h-girl-wall", times: 10, pace: 2400, a: { upper: 22, armF: [14.2, -26], armB: [13.8, -26.4], head: -10 }, b: { upper: 35, armF: [14.2, -26], armB: [13.8, -26.4], head: -14 },
      easier: { b: { upper: 28, armF: [14.2, -26], armB: [13.8, -26.4], head: -12 } }, harder: { times: 15 } },
    squat: { art: "h-girl", times: 10, pace: 2400, sink: 4.5, a: { upper: 30, head: -20, legF: -70, shinF: 95, legB: -70, shinB: 95, armF: [14, -20], armB: [13.6, -20.4] },
      b: { armF: [9, -21], armB: [8.6, -21.4] }, easier: { times: 6 }, harder: { times: 15 } },
    plank: { art: "h-girl", times: 10, pace: 1000, sink: 9.4, hop: -18.8, a: { upper: 60, head: -40, legF: 60, shinF: 30, legB: 60, shinB: 30, armF: [8.2, -9.8], armB: [7.8, -9.8] },
      b: { upper: 60, head: -36, legF: 60, shinF: 30, legB: 60, shinB: 30, armF: [8.2, -9.8], armB: [7.8, -9.8] }, easier: { times: 5 }, harder: { times: 20 } },
    tall: { part: "calm", times: 4, pace: 3600, a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-9, -38], armR: [9, -38] } },
    fold: { part: "calm", art: "h-girl", times: 4, pace: 4000, a: {}, b: { upper: 80, head: 10, armF: [7.5, -6], armB: [7, -6] } },
    cat: { part: "calm", art: "h-girl", times: 5, pace: 4000, sink: 6.4, hop: -12.8,
      a: { upper: 88, head: -50, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10.5, -6.6], armB: [9.6, -6.6] },
      b: { upper: 78, head: -30, legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [10.5, -6.6], armB: [9.6, -6.6] } },
    walk: { part: "calm", art: "h-girl", times: 12, pace: 1600, a: { legF: -25, shinF: 30, armB: -15 }, b: { legB: -25, shinB: 30, armF: -15 } },
    breath: { part: "calm", times: 3, pace: 6000, a: { armL: [-7, -12], armR: [7, -12] }, b: { armL: [-12, -26], armR: [12, -26] } }
  };

  B.HEALTH_MOVES = {
    march: { name: "رژه سر جا", say: "زانوها را بالا بیاور و دست‌ها را تاب بده.", easier: "آرام راه برو و زانوها را کمی بالا بیاور." },
    arms: { name: "چرخاندن دست‌ها", say: "دست‌ها را باز کن و بزرگ و آرام بالا و پایین ببر." },
    hops: { name: "پرش‌های کوچک", say: "روی پنجه‌ها، کوچک و نرم بپر.", easier: "بدون پریدن: روی پنجه‌ها بلند شو و پایین بیا." },
    frog: { name: "پرش قورباغه", say: "پایین بنشین، دست‌ها روی زمین، بعد بلند بپر و نرم فرود بیا.", easier: "پایین بنشین و بلند شو، بدون پریدن.", harder: "بیشتر و نرم‌تر!" },
    bunny: { name: "پرش خرگوش", say: "دست‌ها بالای سر مثل گوش خرگوش، و کوچک بپر.", easier: "آرام و خیلی کوچک بپر." },
    stork: { name: "لک‌لک", say: "روی یک پا بایست، دست‌ها باز، و تا پنج بشمار. بعد پای دیگر.", harder: "تا ده بشمار!" },
    runstop: { name: "بدو و بایست!", say: "سر جایت بدو… و بایست، مثل مجسمه! دوباره." },
    ball: { name: "توپ بالا", say: "توپ نرم را آرام بالا بینداز و با دو دست بگیر." },
    star: { name: "پرش ستاره", say: "با هر پرش، دست‌ها بالا و پاها باز؛ بعد دوباره جمع.", easier: "بدون پریدن: یک پا به پهلو و دست‌ها بالا، بعد برگرد.", harder: "تندتر و بیشتر!" },
    run: { name: "دویدن سر جا", say: "سر جایت بدو و دست‌ها را تاب بده.", easier: "تند رژه برو، بدون پریدن." },
    hop1: { name: "لی‌لی", say: "روی یک پا بپر. بعد روی پای دیگر.", easier: "روی یک پا بایست و تا پنج بشمار. بعد پای دیگر." },
    gallop: { name: "یورتمه", say: "یک پا جلو، پای دیگر دنبالش، با یک پرش کوچک." },
    rope: { name: "طناب‌بازی", say: "دست‌ها را بچرخان، انگار طناب داری، و با دو پای جفت بپر.", easier: "آرام و کوچک بپر." },
    throw: { name: "پرتاب از بالای شانه", say: "دست را عقب و بالا ببر و توپ نرم را به سمت نشانه پرتاب کن." },
    wall: { name: "شنا روی دیوار", say: "دست‌ها روی دیوار، بدن صاف. آرنج‌ها را خم کن و دوباره صاف کن.", easier: "نزدیک‌تر به دیوار بایست و کم خم شو.", harder: "پانزده بار!" },
    squat: { name: "اسکات", say: "پاها باز، دست‌ها جلو. مثل نشستن روی صندلی پایین برو و بلند شو.", easier: "کمی پایین برو، فقط تا جایی که راحتی.", harder: "پانزده بار!" },
    plank: { name: "پلانک روی زانو", say: "روی زانوها و دست‌ها، بدن مثل یک خط صاف. نگه دار و بشمار.", easier: "تا پنج نگه دار.", harder: "تا بیست نگه دار." },
    tall: { name: "قد کشیدن", say: "دست‌ها را بالا ببر، قد بکش و آرام پایین بیاور." },
    fold: { name: "خم شدن به جلو", say: "زانوها کمی نرم. آرام به جلو خم شو و دست‌ها را به طرف پا ببر. فقط تا جایی که درد ندارد." },
    cat: { name: "حرکت گربه", say: "روی دست‌ها و زانوها: پشت را گرد کن، بعد آرام گود کن." },
    walk: { name: "راه رفتن آهسته", say: "آهسته و آرام سر جایت راه برو." },
    breath: { name: "نفس آرام", say: "با دم دست‌ها را باز کن، با بازدم آرام پایین بیاور." }
  };

  // One move for the step, its words in the session's language.
  function move(key, ctx) {
    var m = MOVES[key], w = ctx.w("moves")[key], out = {};
    Object.keys(m).forEach(function (k) { out[k] = m[k]; });
    out.name = w.name; out.say = w.say;
    if (m.easier) out.easier = Object.assign({}, m.easier, w.easier ? { say: w.easier } : {});
    if (m.harder) out.harder = Object.assign({}, m.harder, w.harder ? { say: w.harder } : {});
    return out;
  }
  // plan(rng, ctx) → list of move keys; the routine is one move step (no key: it is not scored).
  function routineMaker(plan) {
    return function (rng, n, ctx) {
      var keys = plan(rng, ctx);
      if (!n || !keys.length) return [];
      return [{ type: "move", prompt: ctx.w("prompt"), moves: keys.map(function (k) { return move(k, ctx); }) }];
    };
  }
  function avail(list, ctx) { return list.filter(function (x) { return !x[1] || ctx.done(x[1]); }).map(function (x) { return x[0]; }); }

  // ================= Seed =================

  B.PRACTICE.push({
    id: "health-seed-p1", subject: "health", level: "seed", objectives: ["health.seed.8", "health.seed.9", "health.seed.10"],
    needs: ["health-seed-7"], lessons: [], emoji: "🐸", title: "نرمش هر روز",
    words: { prompt: "نرمش امروز: با بزرگ‌ترت، دور از صفحه", moves: B.HEALTH_MOVES },
    // Animal moves after health-seed-7; run and stop after -8; the ball after -9; a warm-up march after -10.
    // Three moves picked anew each day, then a stretch, and always slow breaths last.
    make: routineMaker(function (rng, ctx) {
      var main = avail([["frog"], ["bunny"], ["stork"], ["hops"], ["runstop", "health-seed-8"], ["ball", "health-seed-9"]], ctx);
      var keys = (ctx.done("health-seed-10") ? ["march"] : []).concat(rng.sample(main, 3));
      return keys.concat(["tall", "breath"]);
    })
  });

  B.PRACTICE.push({
    id: "health-seed-p2", subject: "health", level: "seed", objectives: ["health.seed.12", "health.seed.13", "health.seed.15", "health.seed.16"],
    needs: ["health-seed-14"], lessons: ["health-seed-14", "health-seed-15", "health-seed-16", "health-seed-17", "health-seed-18", "health-seed-19"], emoji: "🤔", title: "امن است یا از بزرگ‌تر می‌پرسم؟",
    words: {
      prompt: "کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
      baskets: { ok: "امن است", ask: "از بزرگ‌تر می‌پرسم" },
      t: { teddy: "خرس عروسکی", book: "کتاب قصه", puzzle: "پازل", blocks: "مکعب‌ها", crayons: "مداد شمعی", apple: "سیب", water: "یک لیوان آب", sand: "خاک‌بازی با سطل",
        tea: "چای داغ", stove: "اجاق", knife: "چاقو", scissors: "قیچی بزرگ", socket: "پریز برق", iron: "اتو", pills: "قرص", bleach: "مایع سفیدکننده",
        juice: "بطری رنگی که شبیه آبمیوه است", candy: "قرص رنگی که شبیه آب‌نبات است", pool: "رفتن به استخر", sea: "رفتن به دریا", bucket: "سطل پر از آب",
        dog: "سگی که نمی‌شناسیم", cat: "گربه کوچه", street: "رد شدن از خیابان", car: "دویدن کنار ماشین‌ها" }
    },
    make: sortMaker({ baskets: [{ value: "ok", pic: "👍" }, { value: "ask", pic: "🙋" }], per: 6, most: 2, bank: [
      { id: "teddy", pic: "🧸", b: "ok" }, { id: "book", pic: "📖", b: "ok" }, { id: "puzzle", pic: "🧩", b: "ok" }, { id: "blocks", pic: "🧱", b: "ok" },
      { id: "crayons", pic: "🖍️", b: "ok" }, { id: "apple", pic: "🍎", b: "ok" }, { id: "water", pic: "🥛", b: "ok" }, { id: "sand", pic: "🪣", b: "ok", after: "health-seed-17" },
      { id: "tea", pic: "☕", b: "ask" }, { id: "stove", pic: "🔥", b: "ask" }, { id: "knife", pic: "🔪", b: "ask" }, { id: "scissors", pic: "✂️", b: "ask" },
      { id: "socket", pic: "🔌", b: "ask" }, { id: "iron", pic: "👕", b: "ask" }, { id: "pills", pic: "💊", b: "ask" },
      { id: "bleach", pic: "🧴", b: "ask", after: "health-seed-15" }, { id: "juice", pic: "🍹", b: "ask", after: "health-seed-15" }, { id: "candy", pic: "🍬", b: "ask", after: "health-seed-15" },
      { id: "pool", pic: "🏊", b: "ask", after: "health-seed-17" }, { id: "sea", pic: "🌊", b: "ask", after: "health-seed-17" }, { id: "bucket", pic: "🪣", b: "ask", after: "health-seed-17" },
      { id: "dog", pic: "🐕", b: "ask", after: "health-seed-18" }, { id: "cat", pic: "🐈", b: "ask", after: "health-seed-18" },
      { id: "street", pic: "🚸", b: "ask", after: "health-seed-19" }, { id: "car", pic: "🚗", b: "ask", after: "health-seed-19" }
    ] })
  });

  B.PRACTICE.push({
    id: "health-seed-p3", subject: "health", level: "seed", objectives: ["health.seed.1", "health.seed.2", "health.seed.3", "health.seed.7"],
    needs: ["health-seed-1"], lessons: ["health-seed-1", "health-seed-2", "health-seed-5", "health-seed-6", "health-seed-12"], emoji: "🧼", title: "به ترتیب بچین",
    words: {
      asks: { hands: "کارهای شستن دست را به ترتیب بچین", teeth: "کارهای مسواک زدن را به ترتیب بچین", toilet: "بعد از دستشویی چه کار می‌کنیم؟ به ترتیب بچین",
        bath: "حمام کردن را به ترتیب بچین", night: "کارهای شب را به ترتیب بچین", food: "پیش از غذا و بعد از آن: به ترتیب بچین" },
      t: { wet: "خیس کردن", soap: "صابون زدن", rub: "مالیدن", rinse: "آب کشیدن", dry: "خشک کردن", paste: "خمیردندان، اندازه یک نخود",
        brush: "مسواک زدن جلو و پشت دندان‌ها", spit: "تف کردن", flush: "سیفون را می‌کشیم", wash: "دست‌ها را با صابون می‌شوییم", towel: "خشک می‌کنیم",
        shower: "خیس کردن", shampoo: "شامپو و صابون", clean: "خشک کردن و لباس تمیز", dinner: "شام", teethN: "مسواک", story: "قصه", sleep: "خواب",
        washF: "شستن دست‌ها", eat: "غذا خوردن", teethF: "مسواک" }
    },
    make: orderMaker({ seqs: [
      { id: "hands", steps: [["💧", "wet"], ["🧼", "soap"], ["🫧", "rub"], ["🚰", "rinse"], ["👐", "dry"]] },
      { id: "food", steps: [["🧼", "washF"], ["🍲", "eat"], ["🪥", "teethF"]], after: "health-seed-2" },
      { id: "teeth", steps: [["🪥", "paste"], ["🦷", "brush"], ["💦", "spit"]], after: "health-seed-2" },
      { id: "toilet", steps: [["🚽", "flush"], ["🧼", "wash"], ["🚰", "rinse"], ["👐", "towel"]], after: "health-seed-5" },
      { id: "bath", steps: [["🚿", "shower"], ["🧴", "shampoo"], ["💧", "rinse"], ["🧺", "clean"]], after: "health-seed-5" },
      { id: "night", steps: [["🍲", "dinner"], ["🪥", "teethN"], ["📖", "story"], ["😴", "sleep"]], after: "health-seed-12" }
    ] })
  });

  B.PRACTICE.push({
    id: "health-seed-p4", subject: "health", level: "seed", objectives: ["health.seed.5"],
    needs: ["health-seed-4"], lessons: ["health-seed-4", "health-seed-11"], emoji: "🍎", title: "هر روز یا گاهی؟",
    words: {
      prompt: "کدام را هر روز می‌خوریم و می‌نوشیم و کدام را فقط گاهی و کم؟",
      baskets: { often: "هر روز", sometimes: "گاهی، کم" },
      t: { bread: "نان", apple: "سیب", cucumber: "خیار", cheese: "پنیر", water: "آب", milk: "شیر", rice: "برنج", yoghurt: "ماست", carrot: "هویج", egg: "تخم‌مرغ",
        lentils: "عدسی", orange: "پرتقال", tomato: "گوجه", walnut: "گردو", grapes: "انگور", dates: "خرما",
        candy: "آب‌نبات", soda: "نوشابه", cake: "کیک", chips: "چیپس", lolly: "پاستیل", chocolate: "شکلات", icecream: "بستنی", juicebox: "آبمیوه پاکتی" }
    },
    make: sortMaker({ baskets: [{ value: "often", pic: "🌞" }, { value: "sometimes", pic: "🎈" }], per: 6, most: 2, bank: [
      { id: "bread", pic: "🍞", b: "often" }, { id: "apple", pic: "🍎", b: "often" }, { id: "cucumber", pic: "🥒", b: "often" }, { id: "cheese", pic: "🧀", b: "often" },
      { id: "water", pic: "💧", b: "often" }, { id: "milk", pic: "🥛", b: "often" }, { id: "rice", pic: "🍚", b: "often" }, { id: "yoghurt", pic: "🥣", b: "often" },
      { id: "carrot", pic: "🥕", b: "often", after: "health-seed-11" }, { id: "egg", pic: "🥚", b: "often" }, { id: "lentils", pic: "🍲", b: "often" },
      { id: "orange", pic: "🍊", b: "often", after: "health-seed-11" }, { id: "tomato", pic: "🍅", b: "often", after: "health-seed-11" }, { id: "walnut", pic: "🌰", b: "often" },
      { id: "grapes", pic: "🍇", b: "often", after: "health-seed-11" }, { id: "dates", pic: "🟤", b: "often" },
      { id: "candy", pic: "🍬", b: "sometimes" }, { id: "soda", pic: "🥤", b: "sometimes" }, { id: "cake", pic: "🍰", b: "sometimes" }, { id: "chips", pic: "🍟", b: "sometimes" },
      { id: "lolly", pic: "🍭", b: "sometimes" }, { id: "chocolate", pic: "🍫", b: "sometimes" }, { id: "icecream", pic: "🍦", b: "sometimes" }, { id: "juicebox", pic: "🧃", b: "sometimes" }
    ] })
  });

  B.PRACTICE.push({
    id: "health-seed-p5", subject: "health", level: "seed", objectives: ["health.seed.4"],
    needs: ["health-seed-3"], lessons: ["health-seed-3"], emoji: "👂", title: "بدن من",
    words: {
      prompt: "هر کدام را با کاری که می‌کند جفت کن",
      t: { eye: "چشم", ear: "گوش", nose: "بینی", mouth: "دهان", hand: "دست", foot: "پا", teeth: "دندان", tongue: "زبان" },
      r: { eye: "رنگین‌کمان را می‌بیند", ear: "زنگ را می‌شنود", nose: "بوی گل را حس می‌کند", mouth: "حرف می‌زند و می‌خورد", hand: "توپ را می‌گیرد",
        foot: "راه می‌رود و می‌دود", teeth: "سیب را گاز می‌زند", tongue: "مزه بستنی را می‌چشد" }
    },
    make: pairsMaker({ pics: true, per: 3, most: 3, bank: [
      { id: "eye", pic: "👁️", right: "🌈" }, { id: "ear", pic: "👂", right: "🔔" }, { id: "nose", pic: "👃", right: "🌹" }, { id: "mouth", pic: "👄", right: "🗣️" },
      { id: "hand", pic: "✋", right: "⚽" }, { id: "foot", pic: "🦶", right: "🏃" }, { id: "teeth", pic: "🦷", right: "🍎" }, { id: "tongue", pic: "👅", right: "🍦" }
    ] })
  });

  // ================= Sprout =================

  B.PRACTICE.push({
    id: "health-sprout-p1", subject: "health", level: "sprout", objectives: ["health.spr.6", "health.spr.7"],
    needs: ["health-sprout-11"], lessons: [], emoji: "🌅", title: "نرمش هر روز",
    words: { prompt: "نرمش امروز: اول گرم کردن، آخر آرام شدن", moves: B.HEALTH_MOVES },
    // Warm-up first, four moves picked anew each day (throwing after health-sprout-12), calm-down last.
    make: routineMaker(function (rng, ctx) {
      var main = avail([["hop1"], ["gallop"], ["rope"], ["frog"], ["star"], ["stork"], ["bunny"], ["throw", "health-sprout-12"], ["run", "health-sprout-13"]], ctx);
      return ["march", "arms"].concat(rng.sample(main, 4), [rng.pick(["tall", "fold"]), "breath"]);
    })
  });

  B.PRACTICE.push({
    id: "health-sprout-p2", subject: "health", level: "sprout", objectives: ["health.spr.8"],
    needs: ["health-sprout-14"], lessons: [], emoji: "🪨", title: "بازی این هفته",
    words: {
      ask: "بازی این هفته: «{game}». با خانواده یا دوستانت بازی کنید:",
      games: {
        haftsang: { name: "هفت‌سنگ", rules: ["🪨 هفت سنگ صاف را روی هم بچینید.", "⚽ دو گروه شوید. یک گروه با توپ نرم سنگ‌ها را می‌اندازد.", "🏃 همان گروه سنگ‌ها را دوباره می‌چیند، و گروه دیگر سعی می‌کند با توپ به پایشان بزند، نه به سر."] },
        lili: { name: "لی‌لی", rules: ["✏️ خانه‌های لی‌لی را با گچ روی زمین بکشید.", "🪨 یک سنگ در خانه اول بینداز.", "🦶 لی‌لی کن و سنگ را خانه به خانه جلو ببر، بی‌آن‌که پایت روی خط برود."] },
        gorgam: { name: "گرگم به هوا", rules: ["🐺 یک نفر گرگ می‌شود.", "🏃 بقیه می‌دوند. هر کس جای بلند بایستد (روی پله یا سکو)، گرگ نمی‌تواند بگیردش.", "🔁 گرگ هر کس را گرفت، او گرگ بعدی است."] },
        amoo: { name: "عمو زنجیرباف", rules: ["🤝 دست هم را بگیرید و یک زنجیر بلند بسازید.", "🎵 شعر عمو زنجیرباف را با هم بخوانید.", "🌀 با شعر، زنجیر می‌پیچد و دوباره باز می‌شود."] },
        hide: { name: "قایم‌باشک", rules: ["🙈 یک نفر چشم می‌گذارد و تا بیست می‌شمارد.", "🏠 بقیه جای امن قایم می‌شوند: نه در کمد، یخچال یا ماشین.", "🔎 او همه را پیدا می‌کند. اولین کسی که پیدا شد، دفعه بعد چشم می‌گذارد."] },
        statue: { name: "مجسمه", rules: ["🎵 یک نفر آهنگ می‌خواند یا دست می‌زند و بقیه می‌رقصند.", "🛑 آهنگ که قطع شد، همه مثل مجسمه می‌ایستند.", "😄 هر کس تکان خورد، دور بعد آهنگ را می‌خواند."] },
        rope: { name: "طناب‌بازی گروهی", rules: ["🪢 دو نفر سر طناب بلند را آرام می‌چرخانند.", "🦘 یکی‌یکی وارد شوید و بپرید؛ با هر پرش بشمارید.", "🔁 هر کس پایش به طناب خورد، جایش را با کسی که می‌چرخاند عوض می‌کند."] },
        ball: { name: "توپ وسطی", rules: ["⚽ دو نفر دو طرف می‌ایستند و بقیه وسط.", "🎯 توپ نرم را به پای بچه‌های وسط می‌زنند، نه به سر.", "🔁 هر کس توپ خورد، می‌رود کنار و توپ‌انداز می‌شود."] }
      },
      include: "🤝 یادت باشد: همه را بازی بدهید، نوبت را نگه دارید، و آخر بازی بگویید: «بازی خوبی بود!»"
    },
    // One game card (not scored); the game for the week comes from rng.
    make: function (rng, n, ctx) {
      if (!n) return [];
      var games = ctx.w("games"), id = rng.pick(["haftsang", "lili", "gorgam", "amoo", "hide", "statue", "rope", "ball"]), g = games[id];
      return [{ type: "doit", pic: "🪨", text: ctx.w("ask", { game: g.name }), list: g.rules.concat([ctx.w("include")]) }];
    }
  });

  B.PRACTICE.push({
    id: "health-sprout-p3", subject: "health", level: "sprout", objectives: ["health.spr.11", "health.spr.12", "health.spr.13", "health.spr.14"],
    needs: ["health-sprout-2"], lessons: ["health-sprout-2", "health-sprout-18", "health-sprout-3", "health-sprout-19", "health-sprout-20"], emoji: "🤔", title: "امن است یا از بزرگ‌تر می‌پرسم؟",
    words: {
      prompt: "در خانه و بیرون: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
      baskets: { ok: "امن است", ask: "از بزرگ‌تر می‌پرسم" },
      t: { book: "خواندن کتاب", draw: "نقاشی", blocks: "بازی با مکعب‌ها", fruit: "خوردن میوه شسته", water: "نوشیدن آب", toothbrush: "مسواک زدن", tidy: "جمع کردن اسباب‌بازی‌ها",
        pills: "قرص در کمد", cleaner: "مایع شوینده", tea: "چای داغ", knife: "چاقوی آشپزخانه", socket: "پریز برق", window: "خم شدن از پنجره باز",
        balcony: "بالا رفتن از نرده بالکن", shelf: "بالا رفتن از قفسه", gas: "بوی گاز", heater: "بازی کنار بخاری", crosswalk: "رد شدن از خط عابر با بزرگ‌تر",
        cars: "رد شدن از پشت ماشین‌های پارک‌شده", ball: "دویدن دنبال توپ در خیابان", belt: "بستن کمربند در ماشین", backseat: "نشستن روی صندلی عقب",
        front: "نشستن جلو، روی پای بزرگ‌تر", helmet: "موتورسواری بدون کلاه ایمنی" }
    },
    make: sortMaker({ baskets: [{ value: "ok", pic: "👍" }, { value: "ask", pic: "🙋" }], per: 6, most: 2, bank: [
      { id: "book", pic: "📖", b: "ok" }, { id: "draw", pic: "🖍️", b: "ok" }, { id: "blocks", pic: "🧱", b: "ok" }, { id: "fruit", pic: "🍎", b: "ok" },
      { id: "water", pic: "💧", b: "ok" }, { id: "toothbrush", pic: "🪥", b: "ok" }, { id: "tidy", pic: "🧸", b: "ok" },
      { id: "pills", pic: "💊", b: "ask" }, { id: "cleaner", pic: "🧴", b: "ask" }, { id: "tea", pic: "☕", b: "ask" }, { id: "knife", pic: "🔪", b: "ask" }, { id: "socket", pic: "🔌", b: "ask" },
      { id: "window", pic: "🪟", b: "ask", after: "health-sprout-18" }, { id: "balcony", pic: "🏢", b: "ask", after: "health-sprout-18" }, { id: "shelf", pic: "📚", b: "ask", after: "health-sprout-18" },
      { id: "gas", pic: "👃", b: "ask", after: "health-sprout-18" }, { id: "heater", pic: "🔥", b: "ask", after: "health-sprout-18" },
      { id: "crosswalk", pic: "🚸", b: "ok", after: "health-sprout-3" }, { id: "cars", pic: "🚙", b: "ask", after: "health-sprout-3" }, { id: "ball", pic: "⚽", b: "ask", after: "health-sprout-3" },
      { id: "belt", pic: "🚗", b: "ok", after: "health-sprout-19" }, { id: "backseat", pic: "💺", b: "ok", after: "health-sprout-19" },
      { id: "front", pic: "🚘", b: "ask", after: "health-sprout-19" }, { id: "helmet", pic: "🏍️", b: "ask", after: "health-sprout-19" }
    ] })
  });

  // «میکروب و مراقبت»: sorting what spreads or stops germs, and self-care steps in order (after health-sprout-5).
  var germSort = sortMaker({ baskets: [{ value: "stop", pic: "🛡️" }, { value: "spread", pic: "🦠" }], per: 6, most: 1, bank: [
    { id: "wash", pic: "🧼", b: "stop" }, { id: "tissue", pic: "🧻", b: "stop" }, { id: "elbow", pic: "💪", b: "stop" }, { id: "bin", pic: "🗑️", b: "stop" },
    { id: "home", pic: "🛌", b: "stop" }, { id: "ownCup", pic: "🥛", b: "stop" }, { id: "nails", pic: "✂️", b: "stop", after: "health-sprout-5" },
    { id: "hands", pic: "🤧", b: "spread" }, { id: "air", pic: "😮‍💨", b: "spread" }, { id: "shareCup", pic: "🥤", b: "spread" }, { id: "noWash", pic: "🍪", b: "spread" },
    { id: "nose", pic: "👃", b: "spread" }, { id: "school", pic: "🏫", b: "spread" }
  ] });
  var careOrder = orderMaker({ seqs: [
    { id: "sneeze", steps: [["🧻", "cover"], ["🤧", "sneeze"], ["🗑️", "throw"], ["🧼", "washH"]] },
    { id: "morning", steps: [["🧻", "toilet"], ["🧼", "face"], ["👕", "clothes"], ["🍞", "breakfast"], ["🪥", "teeth"]], after: "health-sprout-5" },
    { id: "teeth", steps: [["🪥", "paste"], ["😁", "front"], ["🦷", "back"], ["👅", "tongue"], ["💦", "spit"]], after: "health-sprout-5" },
    { id: "bath", steps: [["🚿", "wet"], ["🧴", "shampoo"], ["🫧", "rub"], ["💧", "rinse"], ["🧺", "dry"]], after: "health-sprout-5" }
  ] });
  B.PRACTICE.push({
    id: "health-sprout-p4", subject: "health", level: "sprout", objectives: ["health.spr.1", "health.spr.2"],
    needs: ["health-sprout-1"], lessons: ["health-sprout-1", "health-sprout-5", "health-sprout-7"], emoji: "🦠", title: "میکروب و مراقبت",
    words: {
      prompt: "کدام کار جلوی میکروب را می‌گیرد و کدام پخشش می‌کند؟",
      baskets: { stop: "جلوی میکروب را می‌گیرد", spread: "میکروب را پخش می‌کند" },
      asks: { sneeze: "عطسه می‌آید! به ترتیب بچین", morning: "کارهای صبح را به ترتیب بچین", teeth: "مسواک زدن را به ترتیب بچین", bath: "حمام کردن را به ترتیب بچین" },
      t: { wash: "شستن دست‌ها با صابون", tissue: "عطسه در دستمال", elbow: "سرفه در آرنج", bin: "انداختن دستمال در سطل", home: "ماندن در خانه وقتی مریضیم",
        ownCup: "لیوان خودم", nails: "ناخن‌های کوتاه و تمیز", hands: "عطسه در دست و دست دادن", air: "سرفه بدون پوشاندن دهان", shareCup: "نوشیدن از لیوان دیگران",
        noWash: "خوردن خوراکی با دست نشسته", nose: "دست زدن به بینی و بعد به خوراکی", school: "رفتن به مدرسه با تب",
        cover: "دستمال جلوی دهان و بینی", sneeze: "عطسه", throw: "دستمال در سطل", washH: "شستن دست‌ها", toilet: "دستشویی", face: "شستن دست و صورت",
        clothes: "پوشیدن لباس تمیز", breakfast: "صبحانه", teeth: "مسواک", paste: "خمیردندان، اندازه یک نخود", front: "جلوی دندان‌ها", back: "پشت و روی دندان‌ها",
        tongue: "زبان", spit: "تف کردن", wet: "خیس کردن", shampoo: "شامپو و صابون", rub: "مالیدن", rinse: "آب کشیدن", dry: "خشک کردن و لباس تمیز" }
    },
    // One sort and the rest steps in order, alternating; the keys of both kinds come back.
    make: function (rng, n, ctx) {
      var a = germSort(rng, 1, ctx), b = careOrder(rng, Math.max(0, n - a.length), ctx), out = [];
      while (a.length || b.length) { if (b.length) out.push(b.shift()); if (a.length) out.push(a.shift()); }
      return out.slice(0, n);
    }
  });

  var plateSort = sortMaker({ baskets: [{ value: "grain", pic: "🍞" }, { value: "fruit", pic: "🍎" }, { value: "protein", pic: "🥚" }, { value: "dairy", pic: "🥛" }], per: 8, most: 1, bank: [
    { id: "rice", pic: "🍚", b: "grain" }, { id: "bread", pic: "🥖", b: "grain" }, { id: "lavash", pic: "🫓", b: "grain" }, { id: "potato", pic: "🥔", b: "grain" },
    { id: "pear", pic: "🍐", b: "fruit" }, { id: "lettuce", pic: "🥬", b: "fruit" }, { id: "carrot", pic: "🥕", b: "fruit" }, { id: "orange", pic: "🍊", b: "fruit" }, { id: "cucumber", pic: "🥒", b: "fruit" },
    { id: "fish", pic: "🐟", b: "protein" }, { id: "lentils", pic: "🍲", b: "protein" }, { id: "egg", pic: "🥚", b: "protein" }, { id: "chicken", pic: "🍗", b: "protein" }, { id: "beans", pic: "🫘", b: "protein" },
    { id: "cheese", pic: "🧀", b: "dairy" }, { id: "milk", pic: "🥛", b: "dairy" }, { id: "yoghurt", pic: "🥣", b: "dairy" }
  ] });
  var plateChoose = chooseMaker({ bank: [
    { id: "lunch1" }, { id: "lunch2" }, { id: "breakfast1" }, { id: "dinner1" },
    { id: "snack1", after: "health-sprout-9" }, { id: "snack2", after: "health-sprout-9" }, { id: "drink1", after: "health-sprout-9" }, { id: "breakfast2", after: "health-sprout-9" }
  ] });
  B.PRACTICE.push({
    id: "health-sprout-p5", subject: "health", level: "sprout", objectives: ["health.spr.4", "health.spr.5"],
    needs: ["health-sprout-8"], lessons: ["health-sprout-8", "health-sprout-9", "health-sprout-10"], emoji: "🍽️", title: "بشقاب من",
    words: {
      prompt: "هر خوراکی را در گروه خودش بگذار",
      baskets: { grain: "نان و برنج", fruit: "میوه و سبزی", protein: "تخم‌مرغ، حبوبات، گوشت", dairy: "شیر و لبنیات" },
      t: { rice: "برنج", bread: "نان", lavash: "نان لواش", potato: "سیب‌زمینی", pear: "گلابی", lettuce: "کاهو", carrot: "هویج", orange: "پرتقال", cucumber: "خیار",
        fish: "ماهی", lentils: "عدسی", egg: "تخم‌مرغ", chicken: "مرغ", beans: "لوبیا", cheese: "پنیر", milk: "شیر", yoghurt: "ماست" },
      q: { lunch1: "بشقاب ناهار: 🍚 برنج و 🍗 مرغ. چه چیزی کنارش بگذاریم تا کامل شود؟", lunch2: "بشقاب ناهار: 🍲 خورش لوبیا و 🥗 سالاد. چه چیزی کنارش بگذاریم؟",
        breakfast1: "صبحانه: 🫓 نان و 🧀 پنیر. چه چیزی کنارش بگذاریم؟", dinner1: "شام: 🍳 تخم‌مرغ و 🥖 نان. چه چیزی کنارش بگذاریم؟",
        snack1: "میان‌وعده زنگ تفریح. کدام بهتر است؟", snack2: "عصر، بعد از بازی گرسنه‌ای. کدام میان‌وعده بهتر است؟",
        drink1: "تشنه‌ای. چه بنوشی بهتر است؟", breakfast2: "صبح دیرت شده. صبحانه چه کار کنی؟" },
      o: { lunch1: ["🥗 سالاد و یک کاسه ماست", "🍬 آب‌نبات", "🥤 نوشابه"], lunch2: ["🍚 برنج یا 🥖 نان", "🍰 کیک", "🍟 چیپس"],
        breakfast1: ["🥒 خیار و 🌰 گردو", "🍫 شکلات", "🥤 نوشابه"], dinner1: ["🍅 گوجه و 🥒 خیار", "🍭 پاستیل", "🍦 بستنی"],
        snack1: ["🍎 یک سیب و چند گردو", "🍬 یک مشت آب‌نبات", "🍟 یک بسته چیپس"], snack2: ["🥪 نان و پنیر", "🍫 شکلات", "🥤 نوشابه"],
        drink1: ["💧 آب", "🥤 نوشابه", "🧃 آبمیوه پاکتی"], breakfast2: ["🥛 یک لیوان شیر و لقمه نان و پنیر، تند و ساده", "🚫 بدون صبحانه می‌روم", "🍬 یک آب‌نبات می‌خورم"] }
    },
    make: function (rng, n, ctx) {
      var a = plateSort(rng, 1, ctx), b = plateChoose(rng, Math.max(0, n - a.length), ctx), out = [];
      while (a.length || b.length) { if (a.length) out.push(a.shift()); if (b.length) out.push(b.shift()); }
      return out.slice(0, n);
    }
  });

  B.PRACTICE.push({
    id: "health-sprout-p6", subject: "health", level: "sprout", objectives: ["health.spr.18"],
    needs: ["health-sprout-23"], lessons: ["health-sprout-23"], emoji: "🔒", title: "خصوصی یا گفتنی؟",
    words: {
      prompt: "کدام را می‌شود در اینترنت گفت و برای کدام از بزرگ‌تر می‌پرسیم؟",
      baskets: { ok: "می‌شود گفت", ask: "از بزرگ‌تر می‌پرسم" },
      t: { colour: "رنگ محبوبم", animal: "حیوان محبوبم", game: "بازی‌ای که دوست دارم", food: "غذای محبوبم", sport: "ورزشی که دوست دارم", book: "کتابی که خواندم",
        address: "نشانی خانه", photo: "عکس خودم", school: "اسم مدرسه‌ام", phone: "شماره تلفن", fullname: "نام کامل", password: "رمز" }
    },
    make: sortMaker({ baskets: [{ value: "ok", pic: "💬" }, { value: "ask", pic: "🔒" }], per: 6, most: 2, bank: [
      { id: "colour", pic: "🎨", b: "ok" }, { id: "animal", pic: "🐱", b: "ok" }, { id: "game", pic: "⚽", b: "ok" }, { id: "food", pic: "🍕", b: "ok" },
      { id: "sport", pic: "🏊", b: "ok" }, { id: "book", pic: "📖", b: "ok" },
      { id: "address", pic: "🏠", b: "ask" }, { id: "photo", pic: "📷", b: "ask" }, { id: "school", pic: "🏫", b: "ask" }, { id: "phone", pic: "📞", b: "ask" },
      { id: "fullname", pic: "🪪", b: "ask" }, { id: "password", pic: "🔑", b: "ask" }
    ] })
  });

  // ================= Sapling =================

  B.PRACTICE.push({
    id: "health-sapling-p1", subject: "health", level: "sapling", objectives: ["health.sap.8", "health.sap.9", "health.sap.10"],
    needs: ["health-sapling-13"], lessons: [], emoji: "⏱️", title: "نرمش ده‌دقیقه‌ای هر روز",
    words: { prompt: "نرمش امروز: گرم کردن، قلب، قدرت یا تعادل، کشش، آرام شدن", moves: B.HEALTH_MOVES },
    // About ten minutes: warm-up, two heart moves, strength on three days a week (Saturday, Monday, Wednesday) and a
    // balance on the others, a skill move after health-sapling-15, two stretches and the calm-down. Each move has an
    // easier and a harder version (the buttons of the move step).
    make: routineMaker(function (rng, ctx) {
      var day = new Date().getDay(), strong = day === 6 || day === 1 || day === 3;
      var keys = [rng.pick(["march", "hops"]), "arms"].concat(rng.sample(["star", "run", "frog"], 2));
      keys = keys.concat(strong ? rng.sample(["wall", "squat", "plank"], 2) : ["stork", "hop1"]);
      if (ctx.done("health-sapling-15")) keys.push(rng.pick(["rope", "throw"]));
      return keys.concat(rng.sample(["tall", "fold", "cat"], 2), ["walk", "breath"]);
    })
  });

  B.PRACTICE.push({
    id: "health-sapling-p2", subject: "health", level: "sapling", objectives: ["health.sap.4", "health.sap.16", "health.sap.17", "health.sap.21"],
    needs: ["health-sapling-8"], lessons: ["health-sapling-8", "health-sapling-20", "health-sapling-4", "health-sapling-23", "health-sapling-24", "health-sapling-25"], emoji: "🤔", title: "چه کار می‌کنی؟",
    words: {
      q: { medicine: "💊 دوستت یک قرص رنگی به تو تعارف می‌کند و می‌گوید: «مزه آب‌نبات می‌دهد!» چه کار می‌کنی؟",
        fever: "🤒 تب داری و سرت درد می‌کند. چه کار می‌کنی؟",
        allergy: "🥜 دوستت به بادام‌زمینی حساسیت دارد و تو خوراکی بادام‌زمینی داری. چه کار می‌کنی؟",
        tease: "😢 یکی از بچه‌ها هر روز به تو حرف زشت می‌زند. چه کار می‌کنی؟",
        bystander: "👀 می‌بینی چند بچه یک بچه را بازی نمی‌دهند و مسخره‌اش می‌کنند. چه کار می‌کنی؟",
        smoke: "💨 در خانه بوی دود می‌آید و دود زیر سقف است. چه کار می‌کنی؟",
        matches: "🔥 زیر مبل یک کبریت پیدا کردی. چه کار می‌کنی؟",
        teapot: "🫖 کتری روی اجاق می‌جوشد. چه کار می‌کنی؟",
        stranger: "🎮 در یک بازی اینترنتی، کسی که نمی‌شناسی می‌پرسد خانه‌ات کجاست. چه کار می‌کنی؟",
        photo: "📷 در بازی، کسی می‌گوید: «عکست را بفرست و به کسی نگو.» چه کار می‌کنی؟",
        app: "⬇️ می‌خواهی یک بازی تازه نصب کنی. اول چه کار می‌کنی؟",
        hot: "☀️ روز خیلی گرمی است و می‌خواهی بیرون بازی کنی. چه کار می‌کنی؟" },
      o: { medicine: ["🙅 نمی‌خورم و به بزرگ‌تر می‌گویم؛ دارو را فقط بزرگ‌تر می‌دهد", "😋 می‌خورم، مزه آب‌نبات دارد", "🤐 قایمش می‌کنم برای بعد"],
        fever: ["🗣️ به بزرگ‌تر می‌گویم، استراحت می‌کنم و آب می‌نوشم", "🏃 می‌روم بیرون می‌دوم", "💊 خودم از کمد قرص برمی‌دارم"],
        allergy: ["🙅 خوراکی‌ام را به او نمی‌دهم", "🎁 به او تعارف می‌کنم", "🤫 قایمکی در غذایش می‌ریزم"],
        tease: ["🛑 محکم می‌گویم «بس کن!»، دور می‌شوم و به بزرگ‌تر می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "😔 فکر می‌کنم تقصیر خودم است"],
        bystander: ["🤝 کنارش می‌ایستم، با هم دور می‌شویم و به بزرگ‌تر می‌گوییم", "😂 من هم می‌خندم", "👊 با آن‌ها دعوا می‌کنم"],
        smoke: ["🧎 خم و پایین، زیر دود، از خانه بیرون می‌روم و بزرگ‌تر را خبر می‌کنم", "🛏️ زیر تخت قایم می‌شوم", "🧸 اول اسباب‌بازی‌هایم را جمع می‌کنم"],
        matches: ["🙋 به آن دست نمی‌زنم و به بزرگ‌تر می‌گویم", "🔥 روشنش می‌کنم ببینم چه می‌شود", "🎒 در کیفم می‌گذارم"],
        teapot: ["↩️ یک قدم بزرگ دور می‌ایستم و به آن دست نمی‌زنم", "🤲 خودم برش می‌دارم", "👀 نزدیک می‌روم و بخارش را تماشا می‌کنم"],
        stranger: ["🙅 جواب نمی‌دهم، صفحه را می‌بندم و به بزرگ‌تر می‌گویم", "🏠 نشانی را می‌نویسم", "🤫 جواب می‌دهم ولی به کسی نمی‌گویم"],
        photo: ["🙋 عکس نمی‌فرستم و فوراً به بزرگ‌تر نشان می‌دهم", "📷 عکسم را می‌فرستم", "🤐 می‌فرستم و رازش را نگه می‌دارم"],
        app: ["👨‍👩‍👧 اول از بزرگ‌تر می‌پرسم", "⬇️ خودم نصبش می‌کنم", "🔑 رمز بزرگ‌ترها را حدس می‌زنم"],
        hot: ["🧢 کلاه، بطری آب، و بازی در سایه، صبح زود یا عصر", "☀️ ظهر زیر آفتاب می‌دوم", "🚗 در ماشین بسته منتظر می‌مانم"] }
    },
    make: chooseMaker({ bank: [
      { id: "medicine" }, { id: "fever" }, { id: "allergy" },
      { id: "tease", after: "health-sapling-20" }, { id: "bystander", after: "health-sapling-20" },
      { id: "smoke", after: "health-sapling-4" }, { id: "matches", after: "health-sapling-4" }, { id: "teapot", after: "health-sapling-4" },
      { id: "hot", after: "health-sapling-23" },
      { id: "stranger", after: "health-sapling-24" }, { id: "photo", after: "health-sapling-24" }, { id: "app", after: "health-sapling-24" }
    ] })
  });

  B.PRACTICE.push({
    id: "health-sapling-p3", subject: "health", level: "sapling", objectives: ["health.sap.22", "health.sap.24"],
    needs: ["health-sapling-26"], lessons: ["health-sapling-26", "health-sapling-28", "health-sapling-29"], emoji: "🧰", title: "کمک‌های اولیه به ترتیب",
    words: {
      asks: { call: "زنگ به اورژانس: به ترتیب بچین", nosebleed: "خون دماغ: به ترتیب بچین", cut: "بریدگی کوچک: به ترتیب بچین", burn: "سوختگی کوچک: به ترتیب بچین",
        sting: "نیش زنبور: به ترتیب بچین" },
      t: { dial: "شماره ۱۱۵ را می‌گیرم", who: "می‌گویم کی هستم", what: "می‌گویم چه شده", where: "می‌گویم کجا هستیم", listen: "گوش می‌دهم و قطع نمی‌کنم",
        sit: "می‌نشینم", lean: "کمی به جلو خم می‌شوم", pinch: "نرمی بینی را فشار می‌دهم", count: "تا ده می‌شمارم", tell: "به بزرگ‌تر می‌گویم",
        press: "فشار با پارچه تمیز", wash: "شستن با آب تمیز", plaster: "چسب زخم", cool: "مدت زیادی زیر آب خنک", cover: "پوشاندن با پارچه تمیز",
        away: "از زنبور دور می‌شوم", washS: "جای نیش را می‌شویم", cloth: "پارچه سرد رویش می‌گذارم" }
    },
    make: orderMaker({ seqs: [
      { id: "call", steps: [["📞", "dial"], ["👧", "who"], ["❗", "what"], ["🏠", "where"], ["👂", "listen"]] },
      { id: "nosebleed", steps: [["🗣️", "tell"], ["🪑", "sit"], ["🙇", "lean"], ["👃", "pinch"], ["🔟", "count"]] },
      { id: "cut", steps: [["🧻", "press"], ["💧", "wash"], ["🩹", "plaster"]], after: "health-sapling-28" },
      { id: "burn", steps: [["🗣️", "tell"], ["🚰", "cool"], ["🩹", "cover"]], after: "health-sapling-28" },
      { id: "sting", steps: [["🐝", "away"], ["💧", "washS"], ["🧊", "cloth"]], after: "health-sapling-28" }
    ] })
  });

  var daySort = sortMaker({ baskets: [{ value: "little", pic: "💧" }, { value: "lots", pic: "🍬" }], per: 6, most: 1, bank: [
    { id: "water", pic: "💧", b: "little" }, { id: "milk", pic: "🥛", b: "little" }, { id: "tea", pic: "🍵", b: "little" }, { id: "doogh", pic: "🥛", b: "little" },
    { id: "fruit", pic: "🍎", b: "little" }, { id: "soda", pic: "🥤", b: "lots" }, { id: "juicebox", pic: "🧃", b: "lots" }, { id: "chocmilk", pic: "🍫", b: "lots" },
    { id: "sharbat", pic: "🍹", b: "lots" }, { id: "energy", pic: "⚡", b: "lots" }
  ] });
  var dayChoose = chooseMaker({ bank: [{ id: "breakfast" }, { id: "lunch" }, { id: "dinner" }, { id: "snack" }, { id: "drink", after: "health-sapling-11" }, { id: "label", after: "health-sapling-11" }] });
  B.PRACTICE.push({
    id: "health-sapling-p4", subject: "health", level: "sapling", objectives: ["health.sap.5", "health.sap.6"],
    needs: ["health-sapling-10"], lessons: ["health-sapling-10", "health-sapling-11", "health-sapling-12"], emoji: "🍽️", title: "یک روز خوراک خوب",
    words: {
      prompt: "کدام نوشیدنی قند کمی دارد و کدام قند زیاد؟",
      baskets: { little: "قند کم یا بی‌قند", lots: "قند زیاد" },
      t: { water: "آب", milk: "شیر", tea: "چای بی‌قند", doogh: "دوغ", fruit: "یک سیب به‌جای آبمیوه", soda: "نوشابه", juicebox: "آبمیوه پاکتی", chocmilk: "شیرکاکائو",
        sharbat: "شربت", energy: "نوشیدنی انرژی‌زا" },
      q: { breakfast: "صبحانه امروز: 🍞 نان و 🧀 پنیر. چه چیزی کنارش بگذاریم تا روز خوب شروع شود؟", lunch: "ناهار امروز: 🍚 برنج و 🍲 خورش. چه کنارش بگذاریم؟",
        dinner: "شام سبک امروز: 🥣 آش. چه کنارش بگذاریم؟", snack: "میان‌وعده عصر کدام بهتر است؟",
        drink: "سر ناهار چه بنوشیم بهتر است؟", label: "روی یک نوشیدنی برچسب قرمز «قند زیاد» دارد. یعنی چه؟" },
      o: { breakfast: ["🥒 خیار، 🌰 گردو و یک لیوان شیر", "🍰 کیک و نوشابه", "🚫 هیچ‌چیز، گرسنه می‌مانیم"], lunch: ["🥗 سالاد و ماست", "🍟 چیپس", "🍫 شکلات"],
        dinner: ["🍞 نان و 🥬 سبزی", "🍬 آب‌نبات", "🥤 نوشابه"], snack: ["🍊 یک پرتقال یا 🥪 نان و پنیر", "🍭 پاستیل", "🍟 یک بسته چیپس"],
        drink: ["💧 آب یا دوغ کم‌نمک", "🥤 نوشابه", "🧃 آبمیوه پاکتی"], label: ["🔴 فقط گاهی و کم", "✅ هر روز زیاد", "🎁 برای جایزه"] }
    },
    // The days of meals to complete (choose) and, after health-sapling-11, one sort of drinks by sugar.
    make: function (rng, n, ctx) {
      var a = ctx.done("health-sapling-11") ? daySort(rng, 1, ctx) : [], b = dayChoose(rng, Math.max(0, n - a.length), ctx), out = [];
      while (a.length || b.length) { if (b.length) out.push(b.shift()); if (a.length) out.push(a.shift()); }
      return out.slice(0, n);
    }
  });

  B.PRACTICE.push({
    id: "health-sapling-p5", subject: "health", level: "sapling", objectives: ["health.sap.21"],
    needs: ["health-sapling-24"], lessons: ["health-sapling-24", "health-sapling-25"], emoji: "🔐", title: "خصوصی یا گفتنی؟",
    words: {
      prompt: "کدام را می‌شود در اینترنت گفت و کدام خصوصی است؟",
      baskets: { ok: "می‌شود گفت", private: "خصوصی" },
      t: { colour: "رنگ محبوبم", animal: "حیوان محبوبم", game: "بازی‌ای که دوست دارم", book: "کتابی که دوست دارم", sport: "ورزش محبوبم", kind: "یک پیام مهربان",
        address: "نشانی خانه", school: "اسم مدرسه‌ام", password: "رمز", photo: "عکس خودم", phone: "شماره تلفن", fullname: "نام کامل", where: "جایی که الان هستم", birthday: "تاریخ تولد کامل" }
    },
    make: sortMaker({ baskets: [{ value: "ok", pic: "💬" }, { value: "private", pic: "🔒" }], per: 6, most: 2, bank: [
      { id: "colour", pic: "🎨", b: "ok" }, { id: "animal", pic: "🐱", b: "ok" }, { id: "game", pic: "⚽", b: "ok" }, { id: "book", pic: "📖", b: "ok" },
      { id: "sport", pic: "🏊", b: "ok" }, { id: "kind", pic: "👍", b: "ok" },
      { id: "address", pic: "🏠", b: "private" }, { id: "school", pic: "🏫", b: "private" }, { id: "password", pic: "🔑", b: "private" }, { id: "photo", pic: "📷", b: "private" },
      { id: "phone", pic: "📞", b: "private" }, { id: "fullname", pic: "🪪", b: "private" }, { id: "where", pic: "📍", b: "private" }, { id: "birthday", pic: "🎂", b: "private" }
    ] })
  });

  B.PRACTICE.push({
    id: "health-sapling-p6", subject: "health", level: "sapling", objectives: ["health.sap.18", "health.sap.19", "health.sap.20"],
    needs: ["health-sapling-21"], lessons: ["health-sapling-21", "health-sapling-22", "health-sapling-23", "health-sapling-25"], emoji: "🌉", title: "بیرون، امن",
    words: {
      prompt: "بیرون از خانه: کدام امن است و برای کدام از بزرگ‌تر می‌پرسیم؟",
      baskets: { ok: "امن است", ask: "از بزرگ‌تر می‌پرسم" },
      t: { bridge: "رد شدن از پل عابر با بزرگ‌تر", helmet: "دوچرخه در پارک با کلاه ایمنی", wait: "منتظر ماندن روی پیاده‌رو", belt: "بستن کمربند در سرویس",
        green: "رد شدن از خط عابر با چراغ سبز و بزرگ‌تر", ball: "برداشتن توپ از وسط خیابان", stranger: "سوار شدن به ماشین یک غریبه", newway: "رفتن از یک راه تازه به مدرسه",
        roadbike: "دوچرخه‌سواری در خیابان شلوغ", rail: "رد شدن از روی نرده وسط خیابان",
        pool: "شنا در استخر وقتی نجات‌غریق نگاه می‌کند", float: "شناور ماندن در کلاس شنا", river: "آب‌تنی در رودخانه", dam: "شنا پشت سد", jump: "پریدن در آب برای کمک به دوست",
        water: "آب نوشیدن در روز گرم", coat: "پوشیدن کاپشن در روز سرد", indoor: "بازی در خانه وقتی هوا آلوده است",
        noon: "بازی بیرون ظهر تابستان", dust: "دویدن بیرون در گرد و خاک", heater: "روشن کردن بخاری" }
    },
    make: sortMaker({ baskets: [{ value: "ok", pic: "👍" }, { value: "ask", pic: "🙋" }], per: 6, most: 2, bank: [
      { id: "bridge", pic: "🌉", b: "ok" }, { id: "helmet", pic: "🚲", b: "ok" }, { id: "wait", pic: "🚸", b: "ok" }, { id: "belt", pic: "🚌", b: "ok" }, { id: "green", pic: "🚦", b: "ok" },
      { id: "ball", pic: "⚽", b: "ask" }, { id: "stranger", pic: "🚗", b: "ask" }, { id: "newway", pic: "🛣️", b: "ask" }, { id: "roadbike", pic: "🚴", b: "ask" }, { id: "rail", pic: "🚧", b: "ask" },
      { id: "pool", pic: "🏊", b: "ok", after: "health-sapling-22" }, { id: "float", pic: "🛟", b: "ok", after: "health-sapling-22" },
      { id: "river", pic: "🏞️", b: "ask", after: "health-sapling-22" }, { id: "dam", pic: "🌊", b: "ask", after: "health-sapling-22" }, { id: "jump", pic: "🤽", b: "ask", after: "health-sapling-22" },
      { id: "water", pic: "💧", b: "ok", after: "health-sapling-23" }, { id: "coat", pic: "🧥", b: "ok", after: "health-sapling-23" }, { id: "indoor", pic: "📚", b: "ok", after: "health-sapling-23" },
      { id: "noon", pic: "☀️", b: "ask", after: "health-sapling-23" }, { id: "dust", pic: "🌫️", b: "ask", after: "health-sapling-23" }, { id: "heater", pic: "🔥", b: "ask", after: "health-sapling-23" }
    ] })
  });
})();

/* Every lesson's own items, for three generators per garden that are in every lesson's practice set:
   «چه کار می‌کنی؟» (choose: a situation, the right answer first in the data), «درست یا نادرست؟» (choose: a sentence to
   judge) and «کار درست، کار نادرست» (sort: things to do and not to do). Each lesson's items: sc [[question, right,
   wrong, wrong]], tf [[sentence, 1 true | 0 not]], dd [[picture, thing, 1 do | 0 don't]]. In a lesson's set the items
   of that lesson come first and earlier lessons' items come back for review. English: the same tables in
   js/en/health.js (B.EN["health-<garden>-p…"].words.data), the same shape. */
(function () {
  var D = B.HEALTH_DATA = B.HEALTH_DATA || {};

  // The lessons with items that the child has done, newest last (ctx.doneIds is in lesson order).
  function doneOf(data, ctx) { return ctx.doneIds.filter(function (id) { return data[id]; }); }
  // Ids of one kind of item (sc, tf or dd): the newest lesson's first (shuffled), then earlier ones (shuffled).
  function pool(data, kind, ctx, rng) {
    var done = doneOf(data, ctx), last = done[done.length - 1];
    if (!last) return [];
    var ids = function (l) { return (data[l][kind] || []).map(function (x, i) { return l + "~" + kind + i; }); };
    var older = [];
    done.slice(0, -1).forEach(function (l) { older = older.concat(ids(l)); });
    return { fresh: rng.shuffle(ids(last)), older: rng.shuffle(older) };
  }
  function item(data, id) { var p = id.split("~"), k = p[1].slice(0, 2); return { lesson: p[0], kind: k, i: +p[1].slice(2), fa: data[p[0]][k][+p[1].slice(2)] }; }
  function againFirst(ctx, data, kind) {
    return ctx.again.filter(function (k) { var p = k.split("~"); return p.length === 2 && data[p[0]] && ctx.done(p[0]) && p[1].slice(0, 2) === kind && data[p[0]][kind][+p[1].slice(2)]; });
  }

  // «چه کار می‌کنی؟»: up to 3 situations, two from the newest lesson and one from before.
  B.healthScenarios = function (data) {
    return function (rng, n, ctx) {
      var p = pool(data, "sc", ctx, rng);
      if (!p.fresh) return [];
      var ids = againFirst(ctx, data, "sc").concat(p.fresh.slice(0, 2), p.older.slice(0, 1), p.fresh.slice(2), p.older.slice(1));
      var seen = {}, words = ctx.w("data"), out = [];
      ids.forEach(function (id) {
        if (seen[id] || out.length >= Math.min(n, 3)) return;
        seen[id] = true;
        var it = item(data, id), w = words[it.lesson].sc[it.i], order = rng.shuffle([1, 2, 3]);
        out.push({ type: "choose", key: id, prompt: w[0], say: w[0], stack: true, options: order.map(function (j) { return w[j]; }), answer: w[1] });
      });
      return out;
    };
  };

  // «درست یا نادرست؟»: up to 3 sentences, the newest lesson's first.
  B.healthTrue = function (data) {
    return function (rng, n, ctx) {
      var p = pool(data, "tf", ctx, rng);
      if (!p.fresh) return [];
      var ids = againFirst(ctx, data, "tf").concat(p.fresh.slice(0, 2), p.older.slice(0, 1), p.fresh.slice(2), p.older.slice(1));
      var seen = {}, words = ctx.w("data"), yes = ctx.w("yes"), no = ctx.w("no"), out = [];
      ids.forEach(function (id) {
        if (seen[id] || out.length >= Math.min(n, 3)) return;
        seen[id] = true;
        var it = item(data, id), w = words[it.lesson].tf[it.i];
        out.push({ type: "choose", key: id, prompt: ctx.w("ask", { s: w[0] }), say: w[0] + " " + ctx.w("say"), options: [yes, no], answer: it.fa[1] ? yes : no });
      });
      return out;
    };
  };

  // «کار درست، کار نادرست»: one sort of the newest lesson's things and two from before (at least two in each basket).
  B.healthDoDont = function (data) {
    return function (rng, n, ctx) {
      var p = pool(data, "dd", ctx, rng);
      if (!p.fresh || !n) return [];
      var again = againFirst(ctx, data, "dd").slice(0, 2);
      var ids = again.concat(p.fresh, p.older).filter(function (id, i, a) { return a.indexOf(id) === i; });
      var goods = ids.filter(function (id) { return item(data, id).fa[2]; }), bads = ids.filter(function (id) { return !item(data, id).fa[2]; });
      if (goods.length < 2 || bads.length < 2) return [];
      var pick = rng.shuffle(goods.slice(0, 3).concat(bads.slice(0, 3)));
      var words = ctx.w("data");
      return [{ type: "sort", key: pick.slice().sort().join("+"), prompt: ctx.w("prompt"),
        baskets: [{ label: ctx.w("good"), pic: "✅", value: "do" }, { label: ctx.w("bad"), pic: "🚫", value: "dont" }],
        items: pick.map(function (id) { var it = item(data, id); return { pic: it.fa[0], say: words[it.lesson].dd[it.i][1], basket: it.fa[2] ? "do" : "dont" }; }) }];
    };
  };

  // The three generators of a garden, in every lesson's set.
  B.healthEveryLesson = function (garden, first, objectives, data, emoji) {
    var lessons = Object.keys(data);
    var common = { subject: "health", level: garden, objectives: objectives, needs: [first], lessons: lessons };
    var num = { seed: 6, sprout: 7, sapling: 7 }[garden];
    B.PRACTICE.push(Object.assign({}, common, { id: "health-" + garden + "-p" + num, emoji: "🤔", title: "چه کار می‌کنی؟",
      words: { data: data }, make: B.healthScenarios(data) }));
    B.PRACTICE.push(Object.assign({}, common, { id: "health-" + garden + "-p" + (num + 1), emoji: "✅", title: "درست یا نادرست؟",
      words: { data: data, ask: "«{s}» درست است یا نادرست؟", say: "درست است یا نادرست؟", yes: "✅ درست", no: "❌ نادرست" }, make: B.healthTrue(data) }));
    B.PRACTICE.push(Object.assign({}, common, { id: "health-" + garden + "-p" + (num + 2), emoji: emoji, title: "کار درست، کار نادرست",
      words: { data: data, prompt: "کدام کار درست است و کدام نادرست؟", good: "کار درست", bad: "کار نادرست" }, make: B.healthDoDont(data) }));
  };
})();

// ---------- Seed: every lesson's own items ----------
B.healthEveryLesson("seed", "health-seed-1",
  ["health.seed.1", "health.seed.2", "health.seed.3", "health.seed.4", "health.seed.5", "health.seed.6", "health.seed.7", "health.seed.8", "health.seed.9",
    "health.seed.10", "health.seed.11", "health.seed.12", "health.seed.13", "health.seed.14", "health.seed.15", "health.seed.16", "health.seed.17", "health.seed.18"], {
  "health-seed-1": {
    sc: [["🍲 وقت ناهار است. اول چه کار می‌کنی؟", "🧼 دست‌هایم را با آب و صابون می‌شویم", "🍲 با دست نشسته غذا می‌خورم", "🧸 می‌روم بازی کنم"],
      ["🐕 با سگ بازی کردی. حالا چه کار می‌کنی؟", "🧼 دست‌هایم را می‌شویم", "🍪 بیسکویت می‌خورم", "👃 دستم را به بینی‌ام می‌زنم"]],
    tf: [["دست‌ها را با آب و صابون می‌شوییم.", 1], ["پیش از غذا لازم نیست دست بشوییم.", 0], ["بعد از دستشویی دست‌ها را می‌شوییم.", 1]],
    dd: [["🧼", "صابون زدن به دست‌ها", 1], ["🫧", "مالیدن لای انگشت‌ها", 1], ["🍪", "خوراکی خوردن با دست کثیف", 0], ["🚰", "شستن دست فقط با کمی آب، بی‌صابون", 0]] },
  "health-seed-2": {
    sc: [["🌙 شب است و می‌خواهی بخوابی. اول چه کار می‌کنی؟", "🪥 مسواک می‌زنم", "🍬 آب‌نبات می‌خورم", "😴 بی‌مسواک می‌خوابم"],
      ["🪥 چقدر خمیردندان روی مسواک بگذاریم؟", "🫛 اندازه یک نخود", "🐍 تا آخر مسواک", "🚫 هیچ"]],
    tf: [["صبح و شب مسواک می‌زنیم.", 1], ["خمیردندان را قورت می‌دهیم.", 0], ["جلو و پشت دندان‌ها را مسواک می‌زنیم.", 1]],
    dd: [["🪥", "مسواک صبح", 1], ["🌙", "مسواک شب", 1], ["🍬", "آب‌نبات خوردن پیش از خواب", 0], ["😝", "قورت دادن خمیردندان", 0]] },
  "health-seed-5": {
    sc: [["🚽 کارت در دستشویی تمام شد. بعد چه کار می‌کنی؟", "🧼 سیفون را می‌کشم و دست‌هایم را می‌شویم", "🏃 زود می‌روم بازی", "🙈 هیچ کاری نمی‌کنم"],
      ["🛁 وقت حمام است. با چه کسی می‌روی؟", "👩 با یک بزرگ‌تر", "🧸 تنهایی، با عروسکم", "🚫 حمام نمی‌روم"]],
    tf: [["بعد از دستشویی سیفون را می‌کشیم.", 1], ["در حمام تنها می‌مانیم و بزرگ‌تر نمی‌آید.", 0], ["بعد از حمام لباس تمیز می‌پوشیم.", 1]],
    dd: [["🚽", "کشیدن سیفون", 1], ["👕", "پوشیدن لباس تمیز بعد از حمام", 1], ["🏃", "بیرون آمدن از دستشویی بی‌آن‌که دست بشوییم", 0], ["🛁", "تنها ماندن در وان", 0]] },
  "health-seed-6": {
    sc: [["🍎 می‌خواهی سیب بخوری. اول چه کار می‌کنیم؟", "💧 سیب را می‌شوییم", "🍎 همین‌طور می‌خوریم", "🧹 روی زمین می‌گذاریم"],
      ["😁 صبح بیدار شدی. کدام کار مال صبح است؟", "🪥 مسواک و شستن دست و صورت", "🍬 آب‌نبات خوردن", "😴 دوباره خوابیدن"]],
    tf: [["دست تمیز یعنی میکروب کمتر.", 1], ["مسواکمان را به دوستمان می‌دهیم.", 0], ["هر کس مسواک خودش را دارد.", 1]],
    dd: [["🧼", "شستن دست پیش از غذا", 1], ["🪥", "مسواک زدن با مسواک خودم", 1], ["👫", "یک مسواک برای دو نفر", 0], ["🍪", "خوردن خوراکی‌ای که روی زمین افتاده", 0]] },
  "health-seed-3": {
    sc: [["🔔 صدای زنگ را با کدام می‌شنوی؟", "👂 گوش", "👁️ چشم", "👃 بینی"],
      ["🌹 بوی گل را با کدام حس می‌کنی؟", "👃 بینی", "✋ دست", "👂 گوش"]],
    tf: [["با چشم می‌بینیم.", 1], ["با گوش مزه می‌چشیم.", 0], ["با زبان مزه را حس می‌کنیم.", 1]],
    dd: [["🙌", "شستن دست و صورت", 1], ["😴", "خواب کافی برای بدن", 1], ["✏️", "فرو کردن مداد در گوش", 0], ["🫘", "گذاشتن چیز کوچک در بینی", 0]] },
  "health-seed-7": {
    sc: [["🐸 قورباغه چطور حرکت می‌کند؟", "🐸 پایین می‌نشیند و بلند می‌پرد", "🐢 آرام راه می‌رود", "🐍 روی زمین می‌خزد"],
      ["🦩 لک‌لک چطور می‌ایستد؟", "🦩 روی یک پا", "🐻 روی دست‌ها و پاها", "🐸 پایین، قوز کرده"]],
    tf: [["خرس روی دست‌ها و پاها راه می‌رود.", 1], ["خرگوش بی‌پرش و آرام راه می‌رود.", 0], ["حرکت کردن بدن را قوی می‌کند.", 1]],
    dd: [["🏃", "بازی و حرکت هر روز", 1], ["🧸", "جای خالی و نرم برای پریدن", 1], ["🛋️", "پریدن روی مبل و میز", 0], ["🪑", "بالا رفتن از صندلی بلند", 0]] },
  "health-seed-8": {
    sc: [["🛑 در بازی «بدو، بایست!» بزرگ‌تر گفت: «بایست!» چه کار می‌کنی؟", "🗿 مثل مجسمه می‌ایستم", "🏃 همین‌طور می‌دوم", "🦘 می‌پرم"],
      ["🏃 کجا بدویم بهتر است؟", "🌳 در پارک یا حیاط، جای باز", "🚗 در خیابان", "🔪 در آشپزخانه"]],
    tf: [["دویدن در جای باز امن‌تر است.", 1], ["با شنیدن «بایست!» تندتر می‌دویم.", 0], ["بعد از دویدن، نفسمان تند می‌شود.", 1]],
    dd: [["🌳", "دویدن در پارک", 1], ["🗿", "ایستادن مثل مجسمه با «بایست!»", 1], ["🚗", "دویدن در خیابان", 0], ["🪜", "دویدن روی پله", 0]] },
  "health-seed-9": {
    sc: [["⚽ با کدام توپ‌بازی کنیم؟", "🧦 توپ نرم", "🪨 سنگ", "🍶 بطری شیشه‌ای"],
      ["⚽ توپ را به کجا پرتاب می‌کنی؟", "🙌 آرام، به دست‌های دوستم", "🙂 به صورت دوستم", "💥 محکم به سرش"]],
    tf: [["توپ را آرام به دست‌های دوستمان پرتاب می‌کنیم.", 1], ["توپ سنگین را به سر کسی پرتاب می‌کنیم.", 0], ["برای گرفتن توپ، دست‌ها را باز می‌کنیم.", 1]],
    dd: [["🧦", "بازی با توپ جورابی نرم", 1], ["🙌", "گرفتن توپ با دو دست", 1], ["🪟", "توپ‌بازی کنار پنجره", 0], ["🎯", "پرتاب توپ به صورت", 0]] },
  "health-seed-10": {
    sc: [["🌅 نرمش را چطور تمام می‌کنیم؟", "😮‍💨 با چند نفس آرام", "🏃 با تندترین دویدن", "📺 با تلویزیون"],
      ["🙆 اول نرمش چه کار می‌کنیم؟", "🚶 آرام حرکت می‌کنیم و بدن را گرم می‌کنیم", "🤸 بلندترین پرش", "😴 می‌خوابیم"]],
    tf: [["نرمش را با نفس آرام تمام می‌کنیم.", 1], ["نرمش فقط با صفحه است.", 0], ["هر روز کمی نرمش خوب است.", 1]],
    dd: [["🙆", "کش آمدن", 1], ["😮‍💨", "نفس آرام", 1], ["😖", "ادامه دادن وقتی جایی درد می‌کند", 0], ["🛋️", "نرمش روی مبل بلند", 0]] },
  "health-seed-22": {
    sc: [["🐢 بزرگ‌تر گفت: «مثل لاک‌پشت!» چطور حرکت می‌کنی؟", "🐢 آرام آرام", "🐇 تند تند", "🗿 هیچ حرکتی نمی‌کنم"],
      ["🎈 «خیلی بالا!» یعنی چه؟", "🙌 دست‌ها بالا و روی پنجه", "🐛 روی زمین دراز می‌کشیم", "🦆 پایین قوز می‌کنیم"]],
    tf: [["لاک‌پشت آرام راه می‌رود.", 1], ["«پایین» یعنی روی پنجه بلند شویم.", 0], ["خرگوش تند می‌پرد.", 1]],
    dd: [["🐢", "آرام حرکت کردن وقتی می‌گویند «آرام»", 1], ["🙌", "روی پنجه رفتن وقتی می‌گویند «بالا»", 1], ["🛋️", "بالا رفتن از مبل", 0], ["💥", "هل دادن دیگران در بازی", 0]] },
  "health-seed-23": {
    sc: [["🥁 صدای طبل آرام شد. چطور حرکت می‌کنی؟", "🐢 آرام", "🐇 تندتر", "🗿 هیچ"],
      ["🥁 طبل ایستاد. چه کار می‌کنی؟", "🗿 می‌ایستم", "🏃 می‌دوم", "🦘 می‌پرم"]],
    tf: [["با ضرب تند، تند حرکت می‌کنیم.", 1], ["وقتی ضرب قطع شد، می‌دویم.", 0], ["با ضرب آرام، آرام حرکت می‌کنیم.", 1]],
    dd: [["👏", "دست زدن با ضرب", 1], ["🦶", "پا کوبیدن با ضرب", 1], ["🔊", "داد زدن در گوش کسی", 0], ["💥", "تند دویدن در اتاق شلوغ", 0]] },
  "health-seed-4": {
    sc: [["🥤 بعد از بازی تشنه‌ای. چه می‌نوشی؟", "💧 آب", "🥤 نوشابه", "🍬 آب‌نبات"],
      ["🍎 میان‌وعده چه بخوریم؟", "🍎 یک میوه", "🍫 شکلات زیاد", "🍟 چیپس"]],
    tf: [["آب بهترین نوشیدنی است.", 1], ["هر روز نوشابه زیاد می‌نوشیم.", 0], ["میوه میان‌وعده خوبی است.", 1]],
    dd: [["💧", "آب نوشیدن", 1], ["🍎", "میوه برای میان‌وعده", 1], ["🥤", "نوشابه هر روز", 0], ["🍬", "آب‌نبات زیاد", 0]] },
  "health-seed-11": {
    sc: [["🌈 کدام بشقاب رنگارنگ‌تر است؟", "🥗 گوجه، خیار، هویج و نان", "🍞 فقط نان", "🍬 فقط آب‌نبات"],
      ["🥕 هویج چه رنگی است؟", "🟠 نارنجی", "🔵 آبی", "⚫ سیاه"]],
    tf: [["میوه و سبزی رنگ‌های زیادی دارند.", 1], ["هویج آبی است.", 0], ["هر روز چند رنگ میوه و سبزی می‌خوریم.", 1]],
    dd: [["🍅", "خوردن گوجه قرمز", 1], ["🥒", "خوردن خیار سبز", 1], ["🍭", "خوردن پاستیل رنگی زیاد", 0], ["🥤", "نوشیدن نوشابه رنگی", 0]] },
  "health-seed-12": {
    sc: [["🌙 وقت خواب است. چه کار می‌کنی؟", "😴 مسواک، دستشویی، قصه و خواب", "📺 کارتون تا دیروقت", "🍫 شکلات می‌خورم"],
      ["🛏️ پیش از خواب صفحه را چه کار کنیم؟", "📴 خاموش می‌کنیم", "📱 به تخت می‌بریم", "🔊 صدایش را بلند می‌کنیم"]],
    tf: [["خواب کافی بدن را قوی می‌کند.", 1], ["پیش از خواب کارتون تند می‌بینیم.", 0], ["هر شب سر یک ساعت می‌خوابیم.", 1]],
    dd: [["📖", "قصه پیش از خواب", 1], ["🪥", "مسواک شب", 1], ["📱", "تبلت در تخت", 0], ["🍬", "آب‌نبات پیش از خواب", 0]] },
  "health-seed-13": {
    sc: [["🤒 سرت درد می‌کند. چه کار می‌کنی؟", "🗣️ به بزرگ‌تر می‌گویم", "🤐 به کسی نمی‌گویم", "💊 خودم قرص می‌خورم"],
      ["💊 دارو را چه کسی می‌دهد؟", "👩 فقط بزرگ‌تر", "🧒 خودم", "👫 دوستم"]],
    tf: [["دارو را فقط بزرگ‌تر به ما می‌دهد.", 1], ["وقتی مریضیم، به کسی نمی‌گوییم.", 0], ["وقتی مریضیم، استراحت می‌کنیم.", 1]],
    dd: [["🗣️", "گفتن به بزرگ‌تر", 1], ["🛌", "استراحت", 1], ["💊", "برداشتن قرص از کمد", 0], ["🤐", "پنهان کردن درد", 0]] },
  "health-seed-14": {
    sc: [["☕ چای داغ روی میز است. چه کار می‌کنی؟", "↩️ دور می‌ایستم و دست نمی‌زنم", "✋ برش می‌دارم", "👅 می‌چشمش"],
      ["🔪 چاقو روی میز است. چه کار می‌کنی؟", "🙋 به آن دست نمی‌زنم و به بزرگ‌تر می‌گویم", "🤲 با آن بازی می‌کنم", "🏃 برش می‌دارم و می‌دوم"]],
    tf: [["اجاق و چای داغ می‌سوزانند.", 1], ["با چاقو بازی می‌کنیم.", 0], ["از چیز داغ دور می‌ایستیم.", 1]],
    dd: [["↩️", "دور ایستادن از اجاق", 1], ["🙋", "خبر دادن به بزرگ‌تر درباره چیز تیز", 1], ["🔌", "دست زدن به پریز", 0], ["✂️", "بازی با قیچی بزرگ", 0]] },
  "health-seed-15": {
    sc: [["🍹 یک بطری رنگی شبیه آبمیوه پیدا کردی. چه کار می‌کنی؟", "🙋 نمی‌نوشم و به بزرگ‌تر می‌گویم", "😋 می‌نوشم", "👃 بو می‌کنم و می‌چشم"],
      ["🍬 قرص‌های رنگی شبیه آب‌نبات روی میز است. چه کار می‌کنی؟", "🙋 دست نمی‌زنم و به بزرگ‌تر می‌گویم", "😋 یکی می‌خورم", "🎁 به دوستم می‌دهم"]],
    tf: [["هر چیزی که شبیه خوراکی است، خوراکی نیست.", 1], ["قرص رنگی آب‌نبات است.", 0], ["پیش از خوردن چیزی ناآشنا، از بزرگ‌تر می‌پرسیم.", 1]],
    dd: [["🙋", "پرسیدن پیش از خوردن", 1], ["🍎", "خوردن خوراکی‌ای که بزرگ‌تر داده", 1], ["🧴", "نوشیدن از بطری مایع شوینده", 0], ["💊", "خوردن قرص رنگی", 0]] },
  "health-seed-16": {
    sc: [["🤔 مطمئن نیستی چیزی امن است. چه کار می‌کنی؟", "🙋 می‌ایستم و از بزرگ‌تر می‌پرسم", "🤲 امتحانش می‌کنم", "🙈 قایمش می‌کنم"],
      ["🧩 پازل امن است یا باید بپرسیم؟", "👍 امن است", "🙋 باید بپرسیم", "🚫 خطرناک است"]],
    tf: [["اگر مطمئن نیستیم، از بزرگ‌تر می‌پرسیم.", 1], ["قرص اسباب‌بازی است.", 0], ["کتاب قصه برای بازی امن است.", 1]],
    dd: [["🙋", "پرسیدن از بزرگ‌تر", 1], ["🧸", "بازی با عروسک", 1], ["🔌", "بازی با سیم برق", 0], ["💊", "باز کردن قوطی دارو", 0]] },
  "health-seed-17": {
    sc: [["💦 می‌خواهی کنار حوض بازی کنی. چه کسی باید آن‌جا باشد؟", "👵 یک بزرگ‌تر که نگاهت کند", "🧸 هیچ‌کس", "🐈 گربه"],
      ["🌊 بزرگ‌تر از کنار آب رفت. چه کار می‌کنی؟", "↩️ از آب دور می‌شوم و صبر می‌کنم", "💦 تنهایی بازی می‌کنم", "🏊 توی آب می‌روم"]],
    tf: [["آب‌بازی فقط وقتی بزرگ‌تر نگاهمان می‌کند.", 1], ["کنار دریا تنهایی بازی می‌کنیم.", 0], ["سطل پر از آب هم خطر دارد.", 1]],
    dd: [["👵", "آب‌بازی کنار بزرگ‌تر", 1], ["🤝", "دست در دست بزرگ‌تر کنار دریا", 1], ["🪣", "بازی تنها با سطل پر از آب", 0], ["🌊", "رفتن تنها به آب", 0]] },
  "health-seed-18": {
    sc: [["🐕 سگی که نمی‌شناسی جلو می‌آید. چه کار می‌کنی؟", "🗿 آرام می‌ایستم و بزرگ‌تر را صدا می‌زنم", "🏃 جیغ می‌زنم و می‌دوم", "✋ نازش می‌کنم"],
      ["🐈 می‌خواهی گربه دوستت را ناز کنی. اول چه کار می‌کنی؟", "🙋 از صاحبش می‌پرسم", "✋ دمش را می‌کشم", "🏃 به طرفش می‌دوم"]],
    tf: [["پیش از ناز کردن حیوان، از صاحبش می‌پرسیم.", 1], ["دم گربه را می‌کشیم.", 0], ["بعد از بازی با حیوان، دست‌ها را می‌شوییم.", 1]],
    dd: [["🙋", "پرسیدن از صاحب حیوان", 1], ["🧼", "شستن دست بعد از ناز کردن", 1], ["🐕", "دست زدن به سگ غریبه", 0], ["🦴", "گرفتن غذا از دهان حیوان", 0]] },
  "health-seed-19": {
    sc: [["🚸 می‌خواهید از خیابان رد شوید. چه کار می‌کنی؟", "🤝 دست بزرگ‌تر را می‌گیرم", "🏃 تند جلو می‌دوم", "⚽ دنبال توپم می‌روم"],
      ["🚗 کنار خیابان کجا می‌ایستی؟", "🤝 روی پیاده‌رو، دست در دست بزرگ‌تر", "🚧 لب خیابان", "🚙 پشت ماشین پارک‌شده"]],
    tf: [["در خیابان دست بزرگ‌تر را می‌گیریم.", 1], ["تنهایی از خیابان رد می‌شویم.", 0], ["پیش از رد شدن، می‌ایستیم و نگاه می‌کنیم.", 1]],
    dd: [["🤝", "دست بزرگ‌تر را گرفتن", 1], ["👀", "ایستادن و نگاه کردن", 1], ["⚽", "دویدن دنبال توپ در خیابان", 0], ["🏃", "تنها جلو دویدن", 0]] },
  "health-seed-20": {
    sc: [["🛒 در فروشگاه بزرگ‌ترت را گم کردی. چه کار می‌کنی؟", "🧍 همان‌جا می‌ایستم و از فروشنده کمک می‌خواهم", "🚪 تنها بیرون می‌روم", "🚗 با یک غریبه می‌روم"],
      ["🎁 یک غریبه می‌گوید: «بیا، برایت خوراکی دارم.» چه کار می‌کنی؟", "🙅 نمی‌روم و به بزرگ‌ترم می‌گویم", "😋 می‌روم", "🤫 می‌روم و به کسی نمی‌گویم"]],
    tf: [["اگر گم شدیم، همان‌جا می‌ایستیم.", 1], ["با هر کسی که خوراکی داد، می‌رویم.", 0], ["بزرگ‌ترهای مهربانمان را می‌شناسیم.", 1]],
    dd: [["🧍", "همان‌جا ایستادن وقتی گم شدیم", 1], ["🏪", "کمک خواستن از فروشنده", 1], ["🚗", "سوار شدن به ماشین غریبه", 0], ["🎁", "رفتن با غریبه برای خوراکی", 0]] },
  "health-seed-21": {
    sc: [["📺 کارتون تمام شد. حالا چه کار می‌کنی؟", "⚽ خاموشش می‌کنیم و بازی می‌کنیم", "📺 یکی دیگر و یکی دیگر", "😠 گریه می‌کنم"],
      ["📱 کارتون را با چه کسی می‌بینی؟", "👩 با یک بزرگ‌تر", "🧒 تنهایی در اتاق", "🌙 شب در تخت"]],
    tf: [["کمی صفحه، کلی بازی.", 1], ["تمام روز کارتون می‌بینیم.", 0], ["سر غذا صفحه را خاموش می‌کنیم.", 1]],
    dd: [["⚽", "بازی بیرون", 1], ["📖", "کتاب خواندن با بزرگ‌تر", 1], ["📱", "تبلت سر غذا", 0], ["🌙", "کارتون در تخت", 0]] }
}, "🧼");

// ---------- Sprout: every lesson's own items ----------
B.healthEveryLesson("sprout", "health-sprout-1",
  ["health.spr.1", "health.spr.2", "health.spr.3", "health.spr.4", "health.spr.5", "health.spr.6", "health.spr.7", "health.spr.8", "health.spr.9", "health.spr.10", "health.spr.11",
    "health.spr.12", "health.spr.13", "health.spr.14", "health.spr.15", "health.spr.16", "health.spr.17", "health.spr.18", "health.spr.19", "health.spr.20", "health.spr.21", "health.spr.22"], {
  "health-sprout-1": {
    sc: [["🤧 عطسه‌ات می‌آید و دستمال نداری. چه کار می‌کنی؟", "💪 در آرنجم عطسه می‌کنم", "🤲 در دستم عطسه می‌کنم", "👫 رو به دوستم عطسه می‌کنم"],
      ["🤒 تب داری. فردا مدرسه است. چه کار می‌کنیم؟", "🛌 در خانه می‌مانم و استراحت می‌کنم", "🏫 با تب به مدرسه می‌روم", "⚽ می‌روم فوتبال"]],
    tf: [["در دستمال یا آرنج عطسه می‌کنیم.", 1], ["دستمال را بعد از عطسه در جیبمان نگه می‌داریم.", 0], ["وقتی مریضیم، در خانه می‌مانیم.", 1]],
    dd: [["🧻", "عطسه در دستمال", 1], ["🗑️", "انداختن دستمال در سطل", 1], ["🤲", "سرفه در دست و بعد دست دادن", 0], ["🏫", "رفتن به مدرسه با تب", 0]] },
  "health-sprout-5": {
    sc: [["🪥 چند دقیقه مسواک می‌زنیم؟", "⏱️ دو دقیقه", "⚡ دو ثانیه", "🚫 اصلاً"],
      ["💅 ناخن‌هایت بلند و کثیف شده. چه کار می‌کنی؟", "✂️ از بزرگ‌تر می‌خواهم کوتاهشان کند", "😬 با دندان می‌جوم", "🙈 ولشان می‌کنم"]],
    tf: [["بعد از حمام لباس تمیز می‌پوشیم.", 1], ["ناخن بلند و کثیف میکروب ندارد.", 0], ["دو دقیقه مسواک می‌زنیم.", 1]],
    dd: [["🛁", "حمام کردن", 1], ["✂️", "ناخن‌های کوتاه", 1], ["👕", "پوشیدن دوباره لباس کثیف", 0], ["😬", "جویدن ناخن", 0]] },
  "health-sprout-6": {
    sc: [["💉 امروز واکسن داری. چه کار می‌کنی؟", "🤝 دست بزرگ‌تر را می‌گیرم و آرام نفس می‌کشم", "🏃 فرار می‌کنم", "😱 جیغ می‌زنم و تکان می‌خورم"],
      ["🦷 دندان‌پزشک می‌خواهد دندان‌هایت را ببیند. چه کار می‌کنی؟", "😮 دهانم را باز نگه می‌دارم", "🤐 دهانم را می‌بندم", "🙈 قایم می‌شوم"]],
    tf: [["واکسن به بدن کمک می‌کند بیمار نشود.", 1], ["در معاینه سؤال نمی‌پرسیم.", 0], ["دکتر چشم‌هایمان را با یک تابلو امتحان می‌کند.", 1]],
    dd: [["🙋", "پرسیدن سؤال از دکتر", 1], ["😮‍💨", "آرام نفس کشیدن موقع واکسن", 1], ["🏃", "فرار کردن از معاینه", 0], ["🤥", "پنهان کردن درد دندان", 0]] },
  "health-sprout-7": {
    sc: [["🍪 دوستت می‌خواهد از لیوان تو آب بخورد. چه کار می‌کنی؟", "🥛 به او یک لیوان دیگر می‌دهم", "🥤 لیوانم را به او می‌دهم", "😠 دعوا می‌کنم"],
      ["🦠 میکروب از کجا راحت پخش می‌شود؟", "🤧 عطسه بدون پوشاندن دهان", "🧼 دست‌های شسته", "🧻 دستمال در سطل"]],
    tf: [["شستن دست جلوی پخش میکروب را می‌گیرد.", 1], ["میکروب‌ها را با چشم می‌بینیم.", 0], ["هر کس لیوان خودش را دارد.", 1]],
    dd: [["🧼", "شستن دست‌ها با صابون", 1], ["🥛", "نوشیدن از لیوان خودم", 1], ["🥤", "نوشیدن از لیوان دیگران", 0], ["👃", "دست زدن به بینی و بعد به خوراکی", 0]] },
  "health-sprout-8": {
    sc: [["🍽️ بشقابت برنج و مرغ دارد. چه چیزی کنارش بگذاریم؟", "🥗 سالاد و ماست", "🍬 آب‌نبات", "🥤 نوشابه"],
      ["🧀 پنیر در کدام گروه است؟", "🥛 شیر و لبنیات", "🍞 نان و برنج", "🍎 میوه و سبزی"]],
    tf: [["در بشقاب خوب، چند گروه خوراکی هست.", 1], ["عدس و لوبیا در گروه میوه‌اند.", 0], ["نان و برنج به ما انرژی می‌دهند.", 1]],
    dd: [["🥗", "سبزی کنار غذا", 1], ["🍲", "خوردن عدسی و حبوبات", 1], ["🍟", "فقط چیپس برای ناهار", 0], ["🍰", "فقط کیک برای شام", 0]] },
  "health-sprout-9": {
    sc: [["🌅 صبح است و می‌خواهی به مدرسه بروی. چه کار می‌کنی؟", "🍞 صبحانه می‌خورم", "🚫 بی‌صبحانه می‌روم", "🍬 فقط آب‌نبات می‌خورم"],
      ["🎒 برای زنگ تفریح چه میان‌وعده‌ای برداریم؟", "🍎 میوه یا نان و پنیر", "🍟 چیپس", "🥤 نوشابه"]],
    tf: [["صبحانه به ما انرژی می‌دهد.", 1], ["در روز اصلاً آب نمی‌نوشیم.", 0], ["گردو و میوه میان‌وعده خوبی است.", 1]],
    dd: [["🍞", "خوردن صبحانه", 1], ["💧", "آب نوشیدن در روز", 1], ["🍫", "شکلات به‌جای صبحانه", 0], ["🥤", "نوشابه برای تشنگی", 0]] },
  "health-sprout-10": {
    sc: [["🍽️ سفره را می‌چینی. کدام سفره کامل‌تر است؟", "🍚 برنج، خورش، سبزی و ماست", "🍟 فقط چیپس", "🍰 فقط کیک"],
      ["🥛 یک لیوان شیر در کدام گروه است؟", "🥛 شیر و لبنیات", "🍞 نان و برنج", "🥚 تخم‌مرغ و گوشت"]],
    tf: [["سبزی‌خوردن در گروه میوه و سبزی است.", 1], ["ماست در گروه نان است.", 0], ["خوب است سر سفره از چند گروه بخوریم.", 1]],
    dd: [["🥗", "سبزی سر سفره", 1], ["🥛", "یک کاسه ماست", 1], ["🥤", "نوشابه سر سفره", 0], ["🍬", "شیرینی به‌جای غذا", 0]] },
  "health-sprout-11": {
    sc: [["🦶 لی‌لی یعنی چه؟", "🦶 پریدن روی یک پا", "🛌 دراز کشیدن", "🚶 راه رفتن آرام"],
      ["🪢 برای طناب‌بازی کجا بهتر است؟", "🌳 زمین صاف، با کفش، جای باز", "🪟 کنار پنجره", "🍽️ روی میز"]],
    tf: [["لی‌لی را با هر دو پا تمرین می‌کنیم.", 1], ["طناب‌بازی را کنار میز شیشه‌ای می‌کنیم.", 0], ["یورتمه یعنی یک پا جلو و پای دیگر دنبالش.", 1]],
    dd: [["🦶", "لی‌لی با هر دو پا", 1], ["🌳", "طناب‌بازی در جای باز", 1], ["🧦", "طناب‌بازی با جوراب روی سرامیک", 0], ["🪢", "پیچیدن طناب دور گردن", 0]] },
  "health-sprout-12": {
    sc: [["⚽ برای پرتاب از بالای شانه، دستت را چطور می‌بری؟", "💪 عقب و بالا، بعد جلو", "👇 پایین و پشت سر", "🙈 اصلاً تکان نمی‌دهم"],
      ["🥅 توپ به طرفت می‌آید. چطور می‌گیری؟", "🙌 دست‌ها را باز می‌کنم و به توپ نگاه می‌کنم", "🙈 چشمم را می‌بندم", "🏃 فرار می‌کنم"]],
    tf: [["موقع گرفتن، به توپ نگاه می‌کنیم.", 1], ["توپ را به سر دوستمان می‌زنیم.", 0], ["با هر دو دست و هر دو پا تمرین می‌کنیم.", 1]],
    dd: [["🙌", "گرفتن توپ با دو دست", 1], ["🧦", "پرتاب توپ نرم", 1], ["🪨", "پرتاب سنگ", 0], ["🪟", "شوت کردن به طرف پنجره", 0]] },
  "health-sprout-13": {
    sc: [["❤️ تند دویدی. قلبت چه می‌کند؟", "💓 تندتر می‌زند", "🛑 می‌ایستد", "🧊 سرد می‌شود"],
      ["🥵 بعد از بازی گرمت شده و عرق کرده‌ای. چه کار می‌کنی؟", "💧 آب می‌نوشم و کمی آرام راه می‌روم", "🥤 نوشابه می‌نوشم", "😴 زود دراز می‌کشم"]],
    tf: [["وقتی می‌دویم، قلب تندتر می‌زند.", 1], ["عرق کردن یعنی مریض شده‌ایم.", 0], ["هر روز بازی پرتحرک برای بدن خوب است.", 1]],
    dd: [["🏃", "بازی پرتحرک هر روز", 1], ["💧", "آب نوشیدن بعد از بازی", 1], ["🛋️", "تمام روز نشستن", 0], ["😖", "ادامه دادن وقتی حالمان بد است", 0]] },
  "health-sprout-14": {
    sc: [["🧒 بچه‌ای تنها ایستاده و بازی را نگاه می‌کند. چه کار می‌کنی؟", "👋 صدایش می‌کنم بیاید بازی", "🙅 بازی‌اش نمی‌دهیم", "😶 نگاهش نمی‌کنم"],
      ["🎲 در بازی باختی. چه کار می‌کنی؟", "🤝 می‌گویم: «بازی خوبی بود!»", "😤 قهر می‌کنم", "🗯️ داد می‌زنم"]],
    tf: [["در بازی نوبت را نگه می‌داریم.", 1], ["کوچک‌ترها را بازی نمی‌دهیم.", 0], ["باختن هم بخشی از بازی است.", 1]],
    dd: [["⏳", "صبر کردن برای نوبت", 1], ["👋", "دعوت کردن بچه تنها", 1], ["😤", "قهر کردن بعد از باختن", 0], ["🙈", "تقلب در بازی", 0]] },
  "health-sprout-15": {
    sc: [["🌅 نرمش صبح را با چه شروع می‌کنیم؟", "🚶 رژه سر جا و گرم کردن", "🦘 بلندترین پرش", "😴 خواب"],
      ["😮‍💨 آخر نرمش چه کار می‌کنیم؟", "🙆 کش آمدن و نفس آرام", "🏃 تندترین دویدن", "📺 تلویزیون"]],
    tf: [["اول نرمش بدن را گرم می‌کنیم.", 1], ["نرمش را با دویدن تند تمام می‌کنیم.", 0], ["نرمش صبح سرحالمان می‌کند.", 1]],
    dd: [["🚶", "گرم کردن اول نرمش", 1], ["😮‍💨", "نفس آرام آخر نرمش", 1], ["🪑", "پریدن از روی صندلی", 0], ["😖", "ادامه دادن با درد", 0]] },
  "health-sprout-26": {
    sc: [["⭐ شکل ستاره چطور است؟", "⭐ دست‌ها و پاها باز", "⚽ جمع شدن و بغل کردن زانو", "✏️ صاف و کشیده"],
      ["🤸 غلت چوبی را کجا می‌زنیم؟", "🛏️ روی فرش یا تشک نرم", "🪨 روی زمین سنگی", "🪜 روی پله"]],
    tf: [["شکل مداد یعنی صاف و کشیده.", 1], ["پشتک و بالانس دست را تنها در خانه می‌زنیم.", 0], ["برای فرود نرم، زانوها را خم می‌کنیم.", 1]],
    dd: [["🛏️", "غلت روی تشک نرم", 1], ["🦵", "فرود با زانوی خم", 1], ["🤸", "پشتک زدن تنهایی", 0], ["🪑", "پریدن از میز", 0]] },
  "health-sprout-27": {
    sc: [["🎵 رقص کوچک می‌سازی. اول چه کار می‌کنی؟", "🔢 چند حرکت انتخاب می‌کنم و به ترتیب می‌چینم", "😶 می‌ایستم", "🏃 تند می‌دوم"],
      ["👏 آهنگ تند شد. چه کار می‌کنی؟", "🐇 تندتر حرکت می‌کنم", "🐢 آرام‌تر می‌شوم", "🗿 می‌ایستم"]],
    tf: [["با آهنگ، حرکت‌ها را پشت سر هم انجام می‌دهیم.", 1], ["رقص فقط یک حرکت دارد.", 0], ["می‌شود با خانواده با هم رقصید.", 1]],
    dd: [["👏", "دست زدن با آهنگ", 1], ["🔢", "به ترتیب انجام دادن حرکت‌ها", 1], ["💥", "هل دادن دیگران موقع رقص", 0], ["🛋️", "رقصیدن روی مبل", 0]] },
  "health-sprout-16": {
    sc: [["🌙 ساعت خواب است، ولی کارتونت تمام نشده. چه کار می‌کنی؟", "📴 خاموشش می‌کنم و آماده خواب می‌شوم", "📺 تا آخر می‌بینم", "📱 گوشی را به تخت می‌برم"],
      ["😴 پیش از خواب چه کاری آرام است؟", "📖 قصه شنیدن", "🎮 بازی کامپیوتری", "🍫 شکلات خوردن"]],
    tf: [["هر شب سر یک ساعت می‌خوابیم.", 1], ["پیش از خواب بازی کامپیوتری هیجانی خوب است.", 0], ["پیش از خواب صفحه‌ها را خاموش می‌کنیم.", 1]],
    dd: [["📴", "خاموش کردن صفحه پیش از خواب", 1], ["📖", "قصه آرام", 1], ["📱", "گوشی زیر بالش", 0], ["🥤", "نوشابه شب", 0]] },
  "health-sprout-17": {
    sc: [["🎮 می‌خواهی یک بازی تازه نصب کنی. چه کار می‌کنی؟", "🙋 اول از بزرگ‌تر می‌پرسم", "⬇️ خودم نصبش می‌کنم", "🤫 قایمکی نصبش می‌کنم"],
      ["📱 یک ساعت با تبلت بازی کردی. حالا چه کار می‌کنی؟", "⚽ خاموشش می‌کنم و بیرون بازی می‌کنم", "📱 یک ساعت دیگر", "😠 قهر می‌کنم"]],
    tf: [["وقتمان را بین صفحه و بازی بیرون تقسیم می‌کنیم.", 1], ["پیش از نصب بازی تازه لازم نیست بپرسیم.", 0], ["بازی بیرون بدن را قوی می‌کند.", 1]],
    dd: [["🙋", "پرسیدن پیش از نصب بازی", 1], ["⚽", "بازی بیرون بعد از صفحه", 1], ["🌙", "بازی با تبلت تا نیمه‌شب", 0], ["🍽️", "تبلت سر غذا", 0]] },
  "health-sprout-2": {
    sc: [["🧴 یک بطری مایع شوینده روی زمین است. چه کار می‌کنی؟", "🙋 دست نمی‌زنم و به بزرگ‌تر می‌گویم", "😋 بو می‌کنم و می‌چشم", "🧸 با آن بازی می‌کنم"],
      ["🔌 پریز برق جلوی توست. چه کار می‌کنی؟", "↩️ به آن دست نمی‌زنم", "📎 چیزی تویش می‌کنم", "💧 با دست خیس دست می‌زنم"]],
    tf: [["دارو و مایع شوینده مال بزرگ‌ترهاست.", 1], ["با چاقوی آشپزخانه بازی می‌کنیم.", 0], ["از چای داغ و اجاق دور می‌مانیم.", 1]],
    dd: [["↩️", "دور ماندن از اجاق", 1], ["🙋", "خبر دادن درباره دارو", 1], ["🔌", "دست زدن به پریز", 0], ["🧴", "باز کردن بطری شوینده", 0]] },
  "health-sprout-18": {
    sc: [["🪟 پنجره باز است و می‌خواهی بیرون را ببینی. چه کار می‌کنی؟", "↩️ دور می‌ایستم و از بزرگ‌تر می‌خواهم کنارم باشد", "🧗 روی صندلی می‌روم و خم می‌شوم", "🪟 از لبه پنجره آویزان می‌شوم"],
      ["👃 بوی گاز می‌آید. چه کار می‌کنی؟", "🗣️ فوراً به بزرگ‌تر می‌گویم", "🔥 کبریت روشن می‌کنم", "🙈 کاری نمی‌کنم"]],
    tf: [["از نرده بالکن بالا نمی‌رویم.", 1], ["بالا رفتن از قفسه کتاب امن است.", 0], ["اگر بوی گاز آمد، به بزرگ‌تر می‌گوییم.", 1]],
    dd: [["↩️", "دور ایستادن از پنجره باز", 1], ["🗣️", "خبر دادن بوی گاز", 1], ["🧗", "بالا رفتن از قفسه", 0], ["🔥", "بازی کنار بخاری", 0]] },
  "health-sprout-3": {
    sc: [["🚸 کنار خیابان هستید. پیش از رد شدن چه کار می‌کنید؟", "👀 می‌ایستیم، نگاه می‌کنیم و گوش می‌دهیم", "🏃 تند می‌دویم", "📱 به گوشی نگاه می‌کنیم"],
      ["🚦 چراغ عابر قرمز است. چه کار می‌کنی؟", "🛑 صبر می‌کنم تا سبز شود", "🏃 تند رد می‌شوم", "⚽ توپ‌بازی می‌کنم"]],
    tf: [["از خط عابر پیاده رد می‌شویم.", 1], ["از بین ماشین‌های پارک‌شده بیرون می‌پریم.", 0], ["پیش از رد شدن، چپ و راست را نگاه می‌کنیم.", 1]],
    dd: [["🦓", "رد شدن از خط عابر", 1], ["🚦", "صبر برای چراغ سبز", 1], ["🚙", "بیرون آمدن از بین ماشین‌های پارک‌شده", 0], ["🎧", "رد شدن با هدفون و بی‌حواسی", 0]] },
  "health-sprout-19": {
    sc: [["🚗 سوار ماشین شدی. اول چه کار می‌کنی؟", "🔒 کمربندم را می‌بندم", "🪟 سرم را از پنجره بیرون می‌برم", "🦘 روی صندلی می‌ایستم"],
      ["🏍️ کسی می‌خواهد تو را با موتور ببرد، بی‌کلاه ایمنی. چه کار می‌کنی؟", "🙅 سوار نمی‌شوم", "🏍️ سوار می‌شوم", "🙈 جلوی موتور می‌نشینم"]],
    tf: [["بچه‌ها روی صندلی عقب می‌نشینند.", 1], ["دست را از پنجره ماشین بیرون می‌بریم.", 0], ["روی موتور کلاه ایمنی لازم است.", 1]],
    dd: [["🔒", "بستن کمربند", 1], ["💺", "نشستن روی صندلی عقب", 1], ["🪟", "سر بیرون بردن از پنجره", 0], ["👶", "نشستن جلو، روی پای بزرگ‌تر", 0]] },
  "health-sprout-4": {
    sc: [["🧍 در بازار بزرگ‌ترت را گم کردی. اول چه کار می‌کنی؟", "🧍 همان‌جا می‌ایستم", "🚶 تنها راه می‌افتم و می‌روم خانه", "🙈 قایم می‌شوم"],
      ["🏪 از چه کسی کمک می‌خواهی؟", "🏪 فروشنده‌ای که در مغازه است", "🚗 کسی که از توی ماشین صدایم می‌کند", "🚶 از هیچ‌کس"]],
    tf: [["اسم و شماره تلفن بزرگ‌ترمان را بلدیم.", 1], ["اگر گم شدیم، تنها به خانه می‌رویم.", 0], ["اگر گم شدیم، آرام نفس می‌کشیم.", 1]],
    dd: [["🧍", "همان‌جا ایستادن", 1], ["📞", "گفتن شماره بابا یا مامان به فروشنده", 1], ["🚗", "سوار شدن به ماشین یک غریبه", 0], ["🚶", "تنها راه افتادن", 0]] },
  "health-sprout-20": {
    sc: [["🤔 دوستت می‌گوید: «بیا از روی نرده بالکن رد شویم!» چه کار می‌کنی؟", "🙅 نمی‌روم و به بزرگ‌تر می‌گویم", "🧗 من هم می‌روم", "👀 فقط نگاه می‌کنم"],
      ["⚽ توپت به خیابان رفت. چه کار می‌کنی؟", "🙋 روی پیاده‌رو می‌مانم و به بزرگ‌تر می‌گویم", "🏃 دنبالش می‌دوم", "🚗 جلوی ماشین می‌ایستم"]],
    tf: [["اگر مطمئن نیستیم، از بزرگ‌تر می‌پرسیم.", 1], ["دارو را خودمان برمی‌داریم.", 0], ["کمربند در ماشین امن است.", 1]],
    dd: [["🙋", "پرسیدن از بزرگ‌تر", 1], ["🔒", "بستن کمربند", 1], ["⚽", "دویدن دنبال توپ در خیابان", 0], ["🪟", "خم شدن از پنجره", 0]] },
  "health-sprout-21": {
    sc: [["🙅 کسی بخواهد به جاهای خصوصی‌ات دست بزند. چه کار می‌کنی؟", "🗣️ محکم می‌گویم «نه!»، دور می‌شوم و به بزرگ‌ترم می‌گویم", "🤐 به کسی نمی‌گویم", "😔 فکر می‌کنم تقصیر من است"],
      ["🤫 کسی گفت: «به هیچ‌کس نگو.» چه کار می‌کنی؟", "🗣️ باز هم به پدر یا مادرم می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "🙈 فراموشش می‌کنم"]],
    tf: [["جاهایی که لباس زیر می‌پوشاند، جاهای خصوصی بدن است.", 1], ["اگر کسی لمس ناامنی کرد، تقصیر ما است.", 0], ["پزشک وقتی پدر یا مادرمان کنارمان است معاینه‌مان می‌کند.", 1]],
    dd: [["🤝", "دست دادن", 1], ["🙌", "بزن قدش", 1], ["🤫", "نگه داشتن رازی که حالمان را بد کرده", 0], ["😶", "ساکت ماندن وقتی لمسی حالمان را بد کرد", 0]] },
  "health-sprout-22": {
    sc: [["😢 یکی از بچه‌ها هر روز مسخره‌ات می‌کند. چه کار می‌کنی؟", "🛑 محکم می‌گویم «بس کن!»، دور می‌شوم و به بزرگ‌تر می‌گویم", "🤐 به کسی نمی‌گویم", "👊 کتکش می‌زنم"],
      ["🧒 بچه‌ای تنهاست و کسی بازی‌اش نمی‌دهد. چه کار می‌کنی؟", "👋 دعوتش می‌کنم بازی کند", "😂 به او می‌خندم", "😶 نگاهش نمی‌کنم"]],
    tf: [["اذیت شدن هیچ‌وقت تقصیر کسی که اذیت می‌شود نیست.", 1], ["وقتی کسی اذیتمان می‌کند، به کسی نمی‌گوییم.", 0], ["معلم و پدر و مادر کمکمان می‌کنند.", 1]],
    dd: [["🗣️", "گفتن به معلم", 1], ["👋", "دعوت بچه تنها به بازی", 1], ["😂", "خندیدن به کسی", 0], ["👊", "کتک زدن", 0]] },
  "health-sprout-23": {
    sc: [["💻 می‌خواهی در اینترنت چیزی ببینی. با چه کسی؟", "👩 با یک بزرگ‌تر، کنارم", "🧒 تنهایی در اتاق", "🌙 شب، قایمکی"],
      ["😟 در گوشی چیزی دیدی که ترساندت. چه کار می‌کنی؟", "🗣️ فوراً به بزرگ‌ترم می‌گویم", "🙈 قایمش می‌کنم", "📱 باز هم نگاه می‌کنم"]],
    tf: [["نشانی خانه‌مان خصوصی است.", 1], ["عکسمان را برای هر کسی در اینترنت می‌فرستیم.", 0], ["اینترنت کمکمان می‌کند خانواده دور را ببینیم.", 1]],
    dd: [["👩", "اینترنت کنار بزرگ‌تر", 1], ["🗣️", "گفتن چیز ترسناک به بزرگ‌تر", 1], ["🏠", "گفتن نشانی خانه در بازی", 0], ["📷", "فرستادن عکس برای غریبه", 0]] },
  "health-sprout-24": {
    sc: [["🦵 زمین خوردی و زانویت خراش برداشت. اول چه کار می‌کنی؟", "🗣️ به بزرگ‌تر می‌گویم", "🙈 قایمش می‌کنم", "🧹 خاک رویش می‌ریزم"],
      ["👃 دماغت خون آمد. چه کار می‌کنی؟", "🙇 می‌نشینم، کمی جلو خم می‌شوم و نرمی بینی را فشار می‌دهم", "🙃 سرم را عقب می‌برم", "🏃 می‌دوم"]],
    tf: [["خراش را با آب تمیز می‌شوییم.", 1], ["برای خون دماغ سر را عقب می‌بریم.", 0], ["روی برآمدگی سر، پارچه سرد می‌گذاریم.", 1]],
    dd: [["💧", "شستن خراش با آب تمیز", 1], ["🩹", "چسب زخم روی خراش", 1], ["🙃", "عقب بردن سر برای خون دماغ", 0], ["🙈", "پنهان کردن زخم", 0]] },
  "health-sprout-25": {
    sc: [["☀️ روز گرمی است و می‌خواهی بیرون بازی کنی. چه کار می‌کنی؟", "🧢 کلاه سر می‌گذارم، آب می‌نوشم و در سایه بازی می‌کنم", "🏃 ظهر زیر آفتاب می‌دوم", "🚫 هیچ آب نمی‌نوشم"],
      ["💧 کی آب بنوشیم؟", "💧 پیش از آن‌که تشنه شویم", "⏳ فقط وقتی خیلی تشنه‌ایم", "🚫 هیچ‌وقت"]],
    tf: [["ظهر که آفتاب داغ است، در سایه استراحت می‌کنیم.", 1], ["در گرما کلاه لازم نیست.", 0], ["در روزهای گرم زیاد آب می‌نوشیم.", 1]],
    dd: [["🧢", "کلاه در آفتاب", 1], ["🌳", "بازی در سایه", 1], ["☀️", "دویدن ظهر زیر آفتاب داغ", 0], ["🥤", "نوشابه به‌جای آب", 0]] }
}, "🛡️");

// ---------- Sapling: every lesson's own items ----------
B.healthEveryLesson("sapling", "health-sapling-5",
  ["health.sap.1", "health.sap.2", "health.sap.3", "health.sap.4", "health.sap.5", "health.sap.6", "health.sap.7", "health.sap.8", "health.sap.9", "health.sap.10", "health.sap.11", "health.sap.12",
    "health.sap.13", "health.sap.14", "health.sap.15", "health.sap.16", "health.sap.17", "health.sap.18", "health.sap.19", "health.sap.20", "health.sap.21", "health.sap.22", "health.sap.23", "health.sap.25", "health.sap.24"], {
  "health-sapling-5": {
    sc: [["🤧 دوستت سرما خورده و سرفه می‌کند. کدام کار جلوی پخش میکروب را می‌گیرد؟", "💪 سرفه در آرنج و شستن دست‌ها", "🤲 سرفه در دست و دست دادن", "🥤 نوشیدن از یک لیوان"],
      ["🍎 میوه را از بازار آورده‌اید. پیش از خوردن چه کار می‌کنیم؟", "💧 با آب تمیز می‌شوییم", "🍎 همین‌طور می‌خوریم", "👕 با لباسمان پاک می‌کنیم"]],
    tf: [["میکروب‌ها از راه دست‌ها از یک نفر به دیگری می‌روند.", 1], ["میکروب‌ها آن‌قدر بزرگ‌اند که با چشم دیده می‌شوند.", 0], ["با عطسه و سرفه، میکروب در هوا پخش می‌شود.", 1]],
    dd: [["🧼", "شستن دست با آب و صابون", 1], ["💪", "سرفه در آرنج", 1], ["🤲", "عطسه در دست و دست دادن", 0], ["🚰", "نوشیدن آب آلوده", 0]] },
  "health-sapling-6": {
    sc: [["🍲 غذا از ناهار مانده است. چه کارش کنیم؟", "🧊 زود در یخچال می‌گذاریم", "☀️ تا شب بیرون می‌گذاریم", "🪟 کنار پنجره آفتابی می‌گذاریم"],
      ["💧 در گردش تشنه‌ای و کنار یک جوی آب هستی. چه کار می‌کنی؟", "🥤 از آب بطری خودمان می‌نوشم", "🏞️ از آب جوی می‌نوشم", "🙈 تشنه می‌مانم و هیچ نمی‌گویم"]],
    tf: [["روی غذا را می‌پوشانیم تا گرد و خاک و حشره رویش ننشیند.", 1], ["آب رودخانه را بی‌جوشاندن می‌نوشیم.", 0], ["میوه و سبزی را پیش از خوردن با آب تمیز می‌شوییم.", 1]],
    dd: [["🧊", "غذای مانده در یخچال", 1], ["🍲", "پوشاندن روی غذا", 1], ["☀️", "غذای مانده زیر آفتاب", 0], ["🍎", "خوردن میوه نشسته", 0]] },
  "health-sapling-7": {
    sc: [["🦷 دندان شیری‌ات لق شده. چه کار می‌کنی؟", "🙂 صبر می‌کنم تا خودش بیفتد و به بزرگ‌تر می‌گویم", "🔨 محکم می‌کشمش", "🍬 آب‌نبات سفت می‌جوم"],
      ["🍫 بین وعده‌ها شیرینی خوردی. بعدش چه کار می‌کنی؟", "💧 آب می‌نوشم و دهانم را آب می‌کشم", "🍬 یکی دیگر می‌خورم", "😴 می‌خوابم"]],
    tf: [["دندان‌های تازه تا آخر عمر با ما می‌مانند.", 1], ["فقط جلوی دندان‌ها را مسواک می‌زنیم.", 0], ["سالی یک یا دو بار به دندان‌پزشک می‌رویم.", 1]],
    dd: [["🪥", "مسواک زدن همه طرف دندان‌ها", 1], ["🧵", "نخ دندان با کمک بزرگ‌تر", 1], ["🍬", "شیرینی خوردن بین وعده‌ها", 0], ["🥤", "نوشابه پیش از خواب", 0]] },
  "health-sapling-8": {
    sc: [["🤒 تب داری و سرت درد می‌کند. چه کار می‌کنی؟", "🗣️ به بزرگ‌تر می‌گویم، استراحت می‌کنم و آب می‌نوشم", "💊 خودم از کمد قرص برمی‌دارم", "🏃 بیرون می‌روم و می‌دوم"],
      ["🥜 دوستت به بادام‌زمینی حساسیت دارد. چه کار می‌کنی؟", "🙅 خوراکی بادام‌زمینی‌ام را به او نمی‌دهم", "🎁 به او تعارف می‌کنم", "🤫 قایمکی در غذایش می‌ریزم"]],
    tf: [["دارو را فقط بزرگ‌تر می‌دهد، با پیمانه خودش و همان اندازه که پزشک گفته.", 1], ["داروی دوستمان را هم می‌خوریم.", 0], ["وقتی مریضیم، استراحت می‌کنیم و آب و مایعات می‌نوشیم.", 1]],
    dd: [["🛌", "استراحت وقتی مریضیم", 1], ["🗣️", "گفتن به بزرگ‌تر", 1], ["💊", "خوردن داروی کس دیگر", 0], ["🥜", "تعارف خوراکی به دوستی که حساسیت دارد", 0]] },
  "health-sapling-9": {
    sc: [["🍽️ دست‌هایت را کی می‌شویی؟", "🧼 پیش از غذا و بعد از دستشویی", "🌙 فقط شب‌ها", "🚫 هیچ‌وقت"],
      ["🧊 کدام غذا سالم می‌ماند؟", "🧊 غذای مانده که زود در یخچال گذاشتیم", "☀️ غذایی که تمام روز بیرون مانده", "🪰 غذای بی‌سرپوش"]],
    tf: [["آب سالم و دست تمیز جلوی میکروب را می‌گیرد.", 1], ["دستمال کاغذی را بعد از عطسه دوباره استفاده می‌کنیم.", 0], ["پوشاندن دهان موقع سرفه، دیگران را سالم نگه می‌دارد.", 1]],
    dd: [["🧻", "دستمال کاغذی را در سطل انداختن", 1], ["🧼", "دست شستن پیش از غذا", 1], ["🪰", "غذای بی‌سرپوش", 0], ["👃", "دست زدن به بینی و بعد به نان", 0]] },
  "health-sapling-10": {
    sc: [["🍽️ ناهارت برنج و خورش است. چه کنارش بگذاریم تا کامل شود؟", "🥗 سالاد و ماست", "🍟 چیپس", "🍫 شکلات"],
      ["🌅 صبحانه کدام بهتر است؟", "🍞 نان، پنیر، گردو و یک لیوان شیر", "🍰 کیک و نوشابه", "🚫 بی‌صبحانه"]],
    tf: [["یک روز خوب سه وعده و یکی دو میان‌وعده دارد.", 1], ["شام باید سنگین‌ترین غذای روز باشد.", 0], ["در هر وعده از چند گروه خوراکی می‌خوریم.", 1]],
    dd: [["🍞", "خوردن صبحانه", 1], ["🍎", "میوه برای میان‌وعده", 1], ["🍟", "چیپس به‌جای ناهار", 0], ["🚫", "نخوردن صبحانه", 0]] },
  "health-sapling-11": {
    sc: [["🥤 تشنه‌ای. کدام نوشیدنی بهتر است؟", "💧 آب", "🥤 نوشابه", "🧃 آبمیوه پاکتی"],
      ["🧃 در یک پاکت کوچک آبمیوه صنعتی چقدر قند هست؟", "🧊 حدود شش حبه قند", "🚫 هیچ قند", "1️⃣ نصف حبه"]],
    tf: [["در یک قوطی نوشابه حدود هشت حبه قند هست.", 1], ["آبمیوه پاکتی قند ندارد.", 0], ["شیر بدون قند اضافه، نوشیدنی خوبی است.", 1]],
    dd: [["💧", "آب برای تشنگی", 1], ["🥛", "یک لیوان شیر", 1], ["🥤", "نوشابه هر روز", 0], ["🧃", "چند آبمیوه پاکتی در روز", 0]] },
  "health-sapling-12": {
    sc: [["🍽️ شام سبک کدام است؟", "🥣 آش یا تخم‌مرغ با نان و سبزی", "🍰 فقط کیک", "🍟 فقط سیب‌زمینی سرخ‌کرده"],
      ["🍎 میان‌وعده عصر کدام است؟", "🍊 یک پرتقال یا نان و پنیر", "🍭 یک مشت پاستیل", "🥤 یک نوشابه"]],
    tf: [["شیر و دوغ نوشیدنی‌های کم‌قندند.", 1], ["شکلات‌شیر قند ندارد.", 0], ["یک روز خوب آب کافی هم دارد.", 1]],
    dd: [["🥗", "سبزی در هر وعده", 1], ["💧", "آب در طول روز", 1], ["🍬", "شیرینی جایزه بعد از غذا هر روز", 0], ["🥤", "نوشابه سر هر وعده", 0]] },
  "health-sapling-1": {
    sc: [["🌙 فردا مدرسه داری و ساعت خوابت شده. چه کار می‌کنی؟", "😴 صفحه را خاموش می‌کنم و می‌خوابم", "🎮 تا نیمه‌شب بازی می‌کنم", "📺 فیلم می‌بینم"],
      ["⚽ بعد از کلی بازی خسته‌ای. بدنت چه می‌خواهد؟", "🛋️ کمی استراحت", "🏃 دویدن بیشتر", "🍬 آب‌نبات"]],
    tf: [["بچه‌های هم‌سن ما شبی ۹ تا ۱۲ ساعت خواب لازم دارند.", 1], ["خواب هیچ کمکی به یادگیری نمی‌کند.", 0], ["بدن هم تکان خوردن می‌خواهد و هم استراحت.", 1]],
    dd: [["⚽", "بازی پرتحرک هر روز", 1], ["😴", "خوابیدن سر یک ساعت", 1], ["📱", "گوشی در تخت", 0], ["🛋️", "تمام روز نشستن", 0]] },
  "health-sapling-13": {
    sc: [["❤️ کدام حرکت قلب و ریه‌ها را قوی می‌کند؟", "🏃 دویدن", "🧘 نشستن آرام", "📺 تماشای تلویزیون"],
      ["⚖️ کدام حرکت برای تعادل است؟", "🦩 ایستادن روی یک پا", "💪 شنا روی دیوار", "🐈 حرکت گربه"]],
    tf: [["شنا روی دیوار ماهیچه‌های دست و شانه را قوی می‌کند.", 1], ["کشش باید درد داشته باشد.", 0], ["آمادگی بدن چند بخش دارد: قلب، قدرت، کشش و تعادل.", 1]],
    dd: [["🏃", "دویدن برای قلب", 1], ["🦩", "تمرین تعادل روی یک پا", 1], ["🏋️", "بلند کردن وزنه سنگین بزرگ‌ترها", 0], ["😖", "کشش با درد", 0]] },
  "health-sapling-14": {
    sc: [["⚽ می‌خواهی فوتبال بازی کنی. پیش از بازی چه کار می‌کنی؟", "🚶 رژه سر جا و چرخاندن دست‌ها", "🏃 بی‌گرم کردن تندترین شوت", "😴 می‌خوابم"],
      ["🏁 بازی تمام شد. حالا چه کار می‌کنی؟", "🐢 آهسته راه می‌روم، کش می‌آیم و آرام نفس می‌کشم", "🛑 یک‌دفعه می‌نشینم و تکان نمی‌خورم", "🏃 تندتر می‌دوم"]],
    tf: [["گرم کردن بدن را برای بازی آماده می‌کند.", 1], ["کشش‌ها را تند و با تکان دادن انجام می‌دهیم.", 0], ["بعد از بازی آهسته راه می‌رویم تا نفسمان آرام شود.", 1]],
    dd: [["🚶", "گرم کردن پیش از بازی", 1], ["😮‍💨", "آرام کردن بعد از بازی", 1], ["⚡", "شروع بازی بدون گرم کردن", 0], ["🥶", "ایستادن یک‌دفعه بعد از دویدن تند", 0]] },
  "health-sapling-15": {
    sc: [["🎯 پرتاب به نشانه: کجا را نگاه می‌کنی؟", "🎯 وسط نشانه", "👟 کفش‌هایم", "☁️ آسمان"],
      ["⚽ برای جاخالی با چه توپی بازی می‌کنیم؟", "🧽 توپ نرم", "🏐 توپ سفت و سنگین", "🪨 سنگ"]],
    tf: [["در جاخالی توپ را به سر کسی نمی‌زنیم.", 1], ["در طناب بلند، طناب را از اول خیلی تند می‌چرخانیم.", 0], ["هر حرکت را با هر دو دست و هر دو پا تمرین می‌کنیم.", 1]],
    dd: [["🧽", "توپ نرم برای جاخالی", 1], ["🏀", "دریبل کردن با یک دست", 1], ["🎯", "نشانه گرفتن صورت کسی", 0], ["🪢", "طناب‌بازی کنار پله", 0]] },
  "health-sapling-16": {
    sc: [["🙈 یکی از هم‌تیمی‌هایت تقلب می‌کند. چه کار می‌کنی؟", "🗣️ آرام می‌گویم این قانون نبود، و اگر ادامه داد به بزرگ‌تر می‌گویم", "😠 داد می‌زنم و هلش می‌دهم", "🙈 من هم تقلب می‌کنم"],
      ["🏆 تیم شما برد. چه کار می‌کنی؟", "🤝 با تیم دیگر دست می‌دهم و می‌گویم: «بازی خوبی بود!»", "😝 مسخره‌شان می‌کنم", "🏃 بی‌خداحافظی می‌روم"]],
    tf: [["پیش از بازی، قانون‌ها را با هم می‌گوییم.", 1], ["وقتی کسی خوب بازی می‌کند، ساکت می‌مانیم.", 0], ["آخر بازی، برنده باشیم یا بازنده، دست می‌دهیم.", 1]],
    dd: [["👏", "تشویق هم‌تیمی", 1], ["👋", "بازی دادن تازه‌وارد", 1], ["🙈", "تقلب", 0], ["😤", "قهر بعد از باختن", 0]] },
  "health-sapling-17": {
    sc: [["🎒 کیفت را چطور برمی‌داری؟", "🎒 روی هر دو شانه، با بندهای سفت", "👜 روی یک شانه", "🧳 پر از اسباب‌بازی"],
      ["🪑 سر مشق، چطور می‌نشینی؟", "🪑 پاها روی زمین و پشت به صندلی", "🛋️ کج و خم روی مبل", "🦵 یک پا زیرم، قوز کرده"]],
    tf: [["بعد از مدتی نشستن، بلند می‌شویم و کش می‌آییم.", 1], ["کیف هر چه سنگین‌تر، بهتر.", 0], ["کار با صفحه که طول کشید، گاهی دور را نگاه می‌کنیم.", 1]],
    dd: [["🎒", "کیف روی هر دو شانه", 1], ["🙆", "کش آمدن بعد از نشستن", 1], ["🧳", "کیف پر از چیزهایی که لازم نداریم", 0], ["📱", "ساعت‌ها نشستن پای صفحه", 0]] },
  "health-sapling-18": {
    sc: [["⏱️ نرمش ده‌دقیقه‌ای را با چه شروع می‌کنیم؟", "🚶 گرم کردن", "🏋️ سخت‌ترین حرکت", "😴 خواب"],
      ["😖 وسط نرمش جایی درد گرفت. چه کار می‌کنی؟", "🛑 دست نگه می‌دارم و به بزرگ‌تر می‌گویم", "💪 تندتر ادامه می‌دهم", "🙈 به کسی نمی‌گویم"]],
    tf: [["هر حرکت یک نسخه آسان‌تر و یک نسخه سخت‌تر دارد.", 1], ["نرمش را روی زمین لیز با جوراب انجام می‌دهیم.", 0], ["آخر نرمش آرام می‌شویم و آرام نفس می‌کشیم.", 1]],
    dd: [["👟", "نرمش با کفش یا پای برهنه", 1], ["🔁", "انتخاب نسخه آسان‌تر وقتی سخت است", 1], ["🧦", "پریدن با جوراب روی سرامیک", 0], ["🪑", "نرمش کنار لبه میز", 0]] },
  "health-sapling-30": {
    sc: [["🔗 زنجیره حرکت را چطور شروع می‌کنیم؟", "🧍 صاف و بی‌حرکت، مثل یک مداد", "🏃 با دویدن تند", "🛋️ روی مبل"],
      ["🪞 در بازی آینه چه کار می‌کنی؟", "🪞 همان حرکت دوستم را مثل آینه انجام می‌دهم", "🙈 چشمم را می‌بندم", "🏃 فرار می‌کنم"]],
    tf: [["زنجیره حرکت یک شروع، چند حرکت و یک پایان دارد.", 1], ["پشتک و وارو را تنهایی در خانه تمرین می‌کنیم.", 0], ["می‌شود زنجیره را با موسیقی یا در سکوت انجام داد.", 1]],
    dd: [["⭐", "پایان با یک شکل بی‌حرکت", 1], ["🛏️", "غلت فقط روی تشک نرم", 1], ["🤸", "بالانس دست تنهایی", 0], ["🪑", "پریدن از روی صندلی", 0]] },
  "health-sapling-2": {
    sc: [["😠 خیلی عصبانی هستی و دست‌هایت مشت شده. چه کار به بدنت کمک می‌کند؟", "🌷 آرام و عمیق نفس می‌کشم", "😤 نفسم را نگه می‌دارم", "👊 به چیزی مشت می‌زنم"],
      ["😢 غمگینی و گلویت سنگین شده. چه کار می‌کنی؟", "🗣️ به کسی که دوستش دارم می‌گویم", "🤐 به هیچ‌کس نمی‌گویم", "😠 سر بقیه داد می‌زنم"]],
    tf: [["وقتی می‌ترسیم، قلبمان تند تند می‌زند.", 1], ["بعضی حس‌ها بد و ممنوع‌اند.", 0], ["هر حسی که داریم طبیعی است.", 1]],
    dd: [["🌷", "نفس آرام وقتی حسی بزرگ است", 1], ["🗣️", "گفتن حس به کسی که دوستش داریم", 1], ["👊", "زدن دیگران وقتی عصبانی هستیم", 0], ["🤐", "پنهان کردن همه حس‌ها", 0]] },
  "health-sapling-19": {
    sc: [["📏 یکی از بچه‌ها به قد کوتاه دوستت می‌خندد. چه کار می‌کنی؟", "🙋 می‌گویم این کار درست نیست و کنار دوستم می‌ایستم", "😂 من هم می‌خندم", "🙈 وانمود می‌کنم ندیدم"],
      ["🧑‍🦽 بچه تازه‌ای با ویلچر به کلاس آمده. چه کار می‌کنی؟", "👋 سلام می‌کنم و می‌پرسم دوست دارد با هم چه بازی کنیم", "👀 از دور خیره می‌شوم", "🚫 فکر می‌کنم نمی‌تواند بازی کند"]],
    tf: [["بچه‌ها با سرعت‌های مختلف بزرگ می‌شوند.", 1], ["فقط یک جور بدن خوب است.", 0], ["کسی را برای بدنش مسخره نمی‌کنیم.", 1]],
    dd: [["👋", "بازی با همه بچه‌ها", 1], ["💛", "حرف خوب درباره بدن خودم", 1], ["😂", "لقب گذاشتن روی بدن کسی", 0], ["👀", "خیره شدن و پچ‌پچ درباره ظاهر کسی", 0]] },
  "health-sapling-3": {
    sc: [["🎁 قرار است هدیه تولد مامان را تا فردا به او نگویی. این چه رازی است؟", "😊 راز خوب: زود گفته می‌شود و همه را شاد می‌کند", "😟 راز بد", "🤐 رازی که هیچ‌وقت نباید گفت"],
      ["🗣️ به بزرگ‌تری گفتی، ولی گوش نداد. حالا چه کار می‌کنی؟", "🗣️ به یک بزرگ‌تر دیگر می‌گویم", "🤐 دیگر به هیچ‌کس نمی‌گویم", "😔 فکر می‌کنم تقصیر من است"]],
    tf: [["کسی نباید به جاهای خصوصی تو دست بزند.", 1], ["رازی که نگرانت می‌کند را باید نگه داشت.", 0], ["هر وقت بگویی، دیر نیست.", 1]],
    dd: [["🗣️", "گفتن راز بد به یک بزرگ‌تر مورد اعتماد", 1], ["🎁", "نگه داشتن راز هدیه تا فردا", 1], ["🤐", "نگه داشتن رازی که نگرانم می‌کند", 0], ["😶", "ساکت ماندن چون کسی گفت «به کسی نگو»", 0]] },
  "health-sapling-20": {
    sc: [["👀 می‌بینی چند بچه یک بچه را مسخره می‌کنند. چه کار می‌کنی؟", "🤝 کنارش می‌ایستم، با هم دور می‌شویم و به بزرگ‌تر می‌گوییم", "😂 من هم می‌خندم", "👊 با آن‌ها دعوا می‌کنم"],
      ["🔁 کدام یکی قلدری است؟", "🔁 کسی هر روز از عمد به یک بچه حرف زشت می‌زند", "⚽ دو دوست یک بار سر نوبت بحث می‌کنند و آشتی می‌کنند", "😄 دو دوست با هم شوخی می‌کنند و هر دو می‌خندند"]],
    tf: [["قلدری هیچ‌وقت تقصیر کسی که اذیت می‌شود نیست.", 1], ["گفتن به بزرگ‌تر خبرچینی است.", 0], ["با هم، محکم و آرام می‌گوییم: «بس کن!»", 1]],
    dd: [["🤝", "ایستادن کنار کسی که اذیت می‌شود", 1], ["🗣️", "خبر دادن به معلم", 1], ["😂", "خندیدن با قلدر", 0], ["👊", "دعوا کردن", 0]] },
  "health-sapling-4": {
    sc: [["💨 در خانه دود زیر سقف است. چه کار می‌کنی؟", "🧎 خم و پایین، زیر دود، بیرون می‌روم", "🛏️ زیر تخت قایم می‌شوم", "🧸 اول اسباب‌بازی‌هایم را جمع می‌کنم"],
      ["🛑 در تمرین آتش‌نشانی: اگر لباس آتش بگیرد، چه کار می‌کنیم؟", "🛑 بایست، بخواب، غلت بزن", "🏃 می‌دوم", "💨 فوت می‌کنم"]],
    tf: [["کبریت و فندک مال بزرگ‌ترهاست، نه برای بازی.", 1], ["در آتش‌سوزی زیر تخت قایم می‌شویم.", 0], ["آتش‌نشانی شماره ۱۲۵ است.", 1]],
    dd: [["↩️", "یک قدم بزرگ دور از اجاق و سماور", 1], ["🙋", "خبر دادن درباره کبریت", 1], ["🔥", "بازی با فندک", 0], ["🛏️", "قایم شدن در آتش‌سوزی", 0]] },
  "health-sapling-21": {
    sc: [["🛣️ از خیابان پهن چطور رد می‌شوی؟", "🌉 از پل عابر پیاده، با بزرگ‌تر", "🚧 از روی نرده وسط خیابان", "🏃 دوان دوان از بین ماشین‌ها"],
      ["🚌 منتظر سرویس مدرسه هستی. کجا می‌ایستی؟", "🚸 روی پیاده‌رو، دور از لبه خیابان", "🚗 لب خیابان", "🛣️ وسط خیابان"]],
    tf: [["سوار و پیاده شدن فقط وقتی سرویس کامل ایستاده.", 1], ["دوچرخه را در خیابان شلوغ می‌رانیم.", 0], ["در سرویس هم کمربند می‌بندیم.", 1]],
    dd: [["🌉", "رد شدن از پل عابر", 1], ["🪖", "کلاه ایمنی روی دوچرخه", 1], ["🚌", "رد شدن از جلوی سرویس", 0], ["🚴", "دوچرخه‌سواری در خیابان شلوغ", 0]] },
  "health-sapling-22": {
    sc: [["🏞️ روز گرمی است و بچه‌ها می‌گویند در رودخانه شنا کنیم. چه کار می‌کنی؟", "🙅 نمی‌روم؛ آب رودخانه تند می‌کشد", "🏊 می‌پرم توی آب", "👀 اول نگاه می‌کنم عمیق است یا نه، بعد می‌روم"],
      ["🛟 دوستت در استخر خسته شده و کمک می‌خواهد. چه کار می‌کنی؟", "📣 نجات‌غریق را صدا می‌زنم و یک حلقه برایش می‌اندازم", "🤽 خودم می‌پرم توی آب", "🏃 می‌روم"]],
    tf: [["فقط جایی شنا می‌کنیم که نجات‌غریق یا بزرگ‌تر نگاهمان می‌کند.", 1], ["پشت سد برای شنا امن است.", 0], ["شناور ماندن به پشت را یاد می‌گیریم.", 1]],
    dd: [["🏊", "شنا در استخر با نجات‌غریق", 1], ["🛟", "انداختن حلقه برای کمک", 1], ["🏞️", "آب‌تنی در رودخانه", 0], ["🤽", "پریدن در آب برای نجات دوست", 0]] },
  "health-sapling-23": {
    sc: [["🌫️ امروز هوا آلوده است. چه کار می‌کنی؟", "🏠 در خانه می‌مانم، پنجره را می‌بندم و آرام بازی می‌کنم", "🏃 بیرون می‌دوم", "🪟 پنجره را باز می‌گذارم"],
      ["❄️ برف می‌آید و می‌خواهی بیرون بروی. چه می‌پوشی؟", "🧥 چند لایه لباس گرم و کلاه", "👕 یک تی‌شرت نازک", "🩴 دمپایی"]],
    tf: [["روزهای گرم آب زیاد می‌نوشیم و در سایه بازی می‌کنیم.", 1], ["در هوای آلوده بیرون ورزش تند می‌کنیم.", 0], ["چند لایه لباس نازک بهتر از یک لباس کلفت است.", 1]],
    dd: [["🧢", "کلاه در آفتاب", 1], ["🪟", "بستن پنجره در هوای آلوده", 1], ["☀️", "دویدن ظهر تابستان", 0], ["👕", "لباس نازک در برف", 0]] },
  "health-sapling-24": {
    sc: [["🎮 در بازی، کسی می‌پرسد خانه‌ات کجاست. چه کار می‌کنی؟", "🙅 جواب نمی‌دهم، صفحه را می‌بندم و به بزرگ‌تر می‌گویم", "🏠 نشانی را می‌نویسم", "🤫 جواب می‌دهم ولی به کسی نمی‌گویم"],
      ["📷 کسی می‌گوید: «عکست را بفرست و به کسی نگو.» چه کار می‌کنی؟", "🙋 نمی‌فرستم و فوراً به بزرگ‌تر نشان می‌دهم", "📷 می‌فرستم", "🤐 می‌فرستم و رازش را نگه می‌دارم"]],
    tf: [["رمز را به هیچ دوستی در اینترنت نمی‌گوییم.", 1], ["در گروه کلاس می‌شود کسی را مسخره کرد.", 0], ["پیش از نصب بازی تازه، از بزرگ‌تر می‌پرسیم.", 1]],
    dd: [["👍", "فرستادن پیام مهربان", 1], ["🙋", "پرسیدن پیش از نصب", 1], ["🔑", "گفتن رمز به دوست", 0], ["📍", "نوشتن جایی که الان هستم", 0]] },
  "health-sapling-25": {
    sc: [["🛣️ می‌خواهی از یک راه تازه به مدرسه بروی. چه کار می‌کنی؟", "🙋 اول از بزرگ‌تر می‌پرسم", "🚶 تنها می‌روم", "🤫 به کسی نمی‌گویم"],
      ["🔗 یک پیوند عجیب در پیام آمده. چه کار می‌کنی؟", "🙋 بازش نمی‌کنم و به بزرگ‌تر نشان می‌دهم", "👆 بازش می‌کنم", "🔁 برای دوستانم می‌فرستم"]],
    tf: [["اگر مطمئن نیستیم، می‌ایستیم و از بزرگ‌تر می‌پرسیم.", 1], ["سوار شدن به ماشین غریبه امن است.", 0], ["آب نوشیدن در روز گرم امن است.", 1]],
    dd: [["🙋", "پرسیدن از بزرگ‌تر", 1], ["💧", "آب نوشیدن در گرما", 1], ["🚗", "سوار شدن به ماشین غریبه", 0], ["🔗", "باز کردن پیوند عجیب", 0]] },
  "health-sapling-26": {
    sc: [["🔥 خانه آتش گرفته. به کدام شماره زنگ می‌زنیم؟", "🚒 ۱۲۵", "🚑 ۱۱۵", "🚓 ۱۱۰"],
      ["📞 به اورژانس زنگ زدی. چه می‌گویی؟", "👧 کی هستم، چه شده و کجا هستیم", "🎵 یک آهنگ", "🙊 هیچ؛ قطع می‌کنم"]],
    tf: [["اورژانس ۱۱۵ است.", 1], ["برای شوخی به ۱۱۵ زنگ می‌زنیم.", 0], ["گوشی را قطع نمی‌کنیم تا خودشان بگویند.", 1]],
    dd: [["🏠", "از حفظ دانستن نشانی خانه", 1], ["👂", "گوش دادن و قطع نکردن", 1], ["😜", "زنگ الکی به اورژانس", 0], ["😱", "جیغ زدن به‌جای گفتن نشانی", 0]] },
  "health-sapling-27": {
    sc: [["🎒 کدام در کیف اضطراری می‌رود؟", "💧 آب، چراغ‌قوه و سوت", "🎮 بازی کامپیوتری", "🪴 گلدان"],
      ["🌳 جای دیدار خانواده کجاست؟", "🌳 یک جای امن بیرون از خانه، مثل زیر درخت بزرگ پارک", "🛏️ زیر تخت", "🚗 داخل ماشین در خیابان"]],
    tf: [["خانواده یک جای دیدار بیرون از خانه انتخاب می‌کند.", 1], ["کیف اضطراری پر از اسباب‌بازی است.", 0], ["فهرست شماره‌ها در کیف اضطراری است.", 1]],
    dd: [["📝", "فهرست شماره‌ها در کیف", 1], ["🔦", "چراغ‌قوه در کیف", 1], ["🧸", "همه اسباب‌بازی‌ها در کیف", 0], ["🙈", "ندانستن جای دیدار", 0]] },
  "health-sapling-28": {
    sc: [["🔥 دستت به قوری داغ خورد و کمی سوخت. چه کار می‌کنی؟", "🚰 مدت زیادی زیر آب خنک شیر می‌گیرم و به بزرگ‌تر می‌گویم", "🧊 یخ رویش می‌گذارم", "🧈 کره یا خمیردندان می‌زنم"],
      ["🩸 انگشتت کمی برید. اول چه کار می‌کنی؟", "🧻 با یک پارچه تمیز رویش را فشار می‌دهم", "🙈 قایمش می‌کنم", "🧹 خاک رویش می‌ریزم"]],
    tf: [["روی سوختگی یخ، کره یا خمیردندان نمی‌زنیم.", 1], ["زخم بزرگی که خونش بند نمی‌آید را خودمان درست می‌کنیم.", 0], ["روی جای نیش زنبور پارچه سرد می‌گذاریم.", 1]],
    dd: [["🚰", "آب خنک روی سوختگی", 1], ["🩹", "چسب زخم روی بریدگی شسته", 1], ["🧊", "یخ روی سوختگی", 0], ["🧈", "کره روی سوختگی", 0]] },
  "health-sapling-29": {
    sc: [["🐝 زنبور دوستت را نیش زد و حالا سخت نفس می‌کشد. چه کار می‌کنی؟", "📣 فوراً بزرگ‌تر را صدا می‌زنم تا به ۱۱۵ زنگ بزند", "🧻 فقط پارچه سرد می‌گذارم", "⏳ صبر می‌کنم"],
      ["👃 خون دماغ: اول چه کار می‌کنیم؟", "🙇 می‌نشینیم و کمی جلو خم می‌شویم", "🙃 سر را عقب می‌بریم", "🏃 می‌دویم"]],
    tf: [["آرام ماندن و خبر کردن بزرگ‌تر، بزرگ‌ترین کمک است.", 1], ["بوی گاز را با ۱۲۵ خبر می‌دهیم.", 0], ["خراش کوچک را خودمان با کمک‌های اولیه درست می‌کنیم.", 1]],
    dd: [["🧰", "دانستن جای جعبه کمک‌های اولیه", 1], ["🗣️", "خبر کردن بزرگ‌تر", 1], ["🙃", "عقب بردن سر برای خون دماغ", 0], ["🧊", "یخ مستقیم روی سوختگی", 0]] }
}, "🛡️");
