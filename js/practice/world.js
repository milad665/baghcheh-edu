/* باغچه — practice generators for ایران و جهان (subject world). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/world.js. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  // ---------- helpers shared by the generators ----------
  // Again-keys first (if make() can still make them), then fresh ones, never the same key twice.
  function keysFirst(again, pool, n, rng) {
    var out = [];
    again.forEach(function (k) { if (pool.indexOf(k) !== -1 && out.indexOf(k) === -1) out.push(k); });
    rng.shuffle(pool).forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    return out.slice(0, n);
  }
  function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
  function byId(list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; }
  // A sort step from a bank of { id, pic, basket } with names in words: two to three of each basket.
  function sortStep(rng, ctx, kind, bank, baskets, k) {
    var names = ctx.w(kind + "Items"), bn = ctx.w(kind + "Baskets"), items = [];
    baskets.forEach(function (b) {
      rng.sample(bank.filter(function (x) { return x.basket === b.value; }), k).forEach(function (x) {
        items.push({ pic: x.pic, label: names[x.id], say: names[x.id], basket: b.value });
      });
    });
    return { type: "sort", key: kind, prompt: ctx.w(kind + "Prompt"), say: ctx.w(kind + "Say"),
      baskets: baskets.map(function (b) { return { pic: b.pic, label: bn[b.value], value: b.value }; }), items: rng.shuffle(items) };
  }
  // A pairs step from [{ id, a: pic, b: pic }] with words kind+"A" and kind+"B" (names of each side).
  function pairsStep(rng, ctx, kind, bank, k, hidden) {
    var an = ctx.w(kind + "A"), bnames = ctx.w(kind + "B");
    var step = { type: "pairs", key: kind, prompt: ctx.w(kind + "Prompt"), say: ctx.w(kind + "Say"),
      pairs: rng.sample(bank, k).map(function (x) {
        return [{ pic: x.a, label: an[x.id], say: an[x.id] }, { pic: x.b, label: bnames[x.id], say: bnames[x.id] }];
      }) };
    if (hidden) step.hidden = true;
    return step;
  }
  // An order step from a list of { id, pic } in their right order, with names in words[kind].
  function orderStep(ctx, kind, list, prompt, key) {
    var names = ctx.w(kind);
    return { type: "order", key: key || kind, prompt: prompt, say: prompt, numbered: true,
      items: list.map(function (x) { return { pic: x.pic, label: names[x.id], say: names[x.id] }; }) };
  }
  function findStep(map, id, prompt, extra) {
    var s = { type: "map", key: (typeof map === "string" ? map : "pic") + ":" + id, map: map, tasks: [{ find: id, prompt: prompt, say: prompt }] };
    if (extra) Object.keys(extra).forEach(function (k) { s[k] = extra[k]; });
    return s;
  }

  /* ================= Seed ================= */

  /* «روی نقشه پیدا کن» — world-seed-p1 (Picture-map finder). A room seen from above with toys in new places each time
     (after world-seed-2), the rooms of the home, the neighbourhood street (world-seed-3) and the park (world-seed-20);
     after world-seed-12 a room from the side: "what is under the table?". Key: map and thing. */
  var ROOM_SPOTS = [[150, 160], [250, 200], [60, 150], [200, 260], [290, 110], [120, 250], [300, 255], [240, 140]];
  var TOYS = [{ id: "ball", pic: "⚽" }, { id: "teddy", pic: "🧸" }, { id: "car", pic: "🚗" }, { id: "book", pic: "📕" },
    { id: "shoe", pic: "👟" }, { id: "drum", pic: "🥁" }, { id: "blocks", pic: "🧱" }, { id: "kite", pic: "🪁" }];
  var SIDE_SPOTS = [{ id: "onBed", at: [326, 130] }, { id: "underTable", at: [70, 200] }, { id: "nextBox", at: [160, 200] },
    { id: "onShelf", at: [205, 46] }, { id: "underBed", at: [336, 208] }, { id: "frontBox", at: [215, 232] }, { id: "onTable", at: [52, 116] }];
  var SEED_MAPS = [{ map: "home", ids: ["yard", "kitchen", "bedroom", "hall", "bath", "door"], needs: "world-seed-2" },
    { map: "street", ids: ["bakery", "fruit", "park", "school", "clinic", "home"], needs: "world-seed-3" },
    { map: "park", ids: ["gate", "tree", "pond", "slide", "bench", "flowers"], needs: "world-seed-20" }];

  B.PRACTICE.push({
    id: "world-seed-p1", subject: "world", level: "seed", objectives: ["world.seed.2", "world.seed.8"],
    needs: ["world-seed-12"], lessons: ["world-seed-12", "world-seed-2", "world-seed-8", "world-seed-20", "world-seed-24"], emoji: "🗺️", title: "روی نقشه پیدا کن",
    words: {
      find: "{name} را روی نقشه پیدا کن.",
      roomSay: "اتاق را از بالا ببین. {name} کجاست؟ رویش بزن.",
      sideAsk: "چه چیزی {pos} است؟ رویش بزن.",
      toys: { ball: "توپ", teddy: "عروسک خرسی", car: "ماشین", book: "کتاب", shoe: "کفش", drum: "طبل", blocks: "مکعب‌ها", kite: "بادبادک" },
      pos: { onBed: "روی تخت", underTable: "زیر میز", nextBox: "کنار جعبه", onShelf: "روی قفسه", underBed: "زیر تخت", frontBox: "جلوی جعبه", onTable: "روی میز" },
      places: { yard: "حیاط", kitchen: "آشپزخانه", bedroom: "اتاق خواب", hall: "هال", bath: "حمام", door: "در خانه",
        bakery: "نانوایی", fruit: "میوه‌فروشی", park: "پارک", school: "مدرسه", clinic: "درمانگاه", home: "خانه ما",
        gate: "در پارک", tree: "درخت بزرگ", pond: "حوض", slide: "سرسره", bench: "نیمکت", flowers: "باغچهٔ گل" }
    },
    make: function (rng, n, ctx) {
      var toyName = ctx.w("toys"), pos = ctx.w("pos"), places = ctx.w("places"), out = [];
      var kinds = ctx.done("world-seed-2") ? ["room"] : [];
      SEED_MAPS.forEach(function (m) { if (ctx.done(m.needs)) kinds.push(m.map); });
      if (ctx.done("world-seed-12")) kinds.push("side");
      for (var i = 0; i < n; i++) {
        var kind = kinds[i % kinds.length];
        if (kind === "room") {
          var room = B.MAPS && B.MAPS.room, spots = rng.sample(ROOM_SPOTS, 3), toys = rng.sample(TOYS, 3);
          var placesR = toys.map(function (t, j) { return { id: t.id, name: toyName[t.id], pic: t.pic, at: spots[j] }; });
          var target = rng.pick(toys);
          out.push({ type: "map", key: "room:" + target.id, map: { bg: "wall", shapes: room ? room.shapes : [], deco: room ? room.places.filter(function (p) { return ["bed", "window", "door", "desk", "plant"].indexOf(p.id) !== -1; })
            .map(function (p) { return { pic: p.pic, at: p.at, size: p.size }; }) : [], places: placesR },
            tasks: [{ find: target.id, prompt: ctx.w("roomSay", { name: toyName[target.id] }) }] });
        } else if (kind === "side") {
          var toys2 = rng.sample(TOYS, 3), spots2 = rng.sample(SIDE_SPOTS, 3), t2 = rng.int(0, 2);
          var toysMap = B.MAPS && B.MAPS.toys;
          out.push({ type: "map", key: "side:" + spots2[t2].id, map: { bg: "wall", shapes: toysMap ? toysMap.shapes : [],
            places: toys2.map(function (t, j) { return { id: t.id, name: toyName[t.id], pic: t.pic, at: spots2[j].at }; }) },
            tasks: [{ find: toys2[t2].id, prompt: ctx.w("sideAsk", { pos: pos[spots2[t2].id] }) }] });
        } else {
          var m = SEED_MAPS.filter(function (x) { return x.map === kind; })[0], id = rng.pick(m.ids);
          out.push(findStep(kind, id, ctx.w("find", { name: places[id] })));
        }
      }
      return out;
    }
  });

  /* «راه را پیدا کن» — world-seed-p2 (Route maker). On the neighbourhood street (B.MAPS.street): go from home to two
     places in order; near or far: which of two places is nearer to home (only when one is clearly nearer). */
  var STREET = { bakery: [56, 66], fruit: [136, 66], park: [308, 68], school: [92, 234], clinic: [266, 234], home: [350, 234] };
  B.PRACTICE.push({
    id: "world-seed-p2", subject: "world", level: "seed", objectives: ["world.seed.4"],
    needs: ["world-seed-4"], lessons: ["world-seed-4", "world-seed-20"], emoji: "🚶", title: "راه را پیدا کن",
    words: {
      route: "از خانه راه بیفت. اول به {a} برو، بعد به {b}.",
      near: "کدام به خانهٔ ما نزدیک‌تر است؟",
      nearSay: "کدام به خانهٔ ما نزدیک‌تر است: {a} یا {b}؟ روی نقشه نگاه کن.",
      places: { bakery: "نانوایی", fruit: "میوه‌فروشی", park: "پارک", school: "مدرسه", clinic: "درمانگاه" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("places"), out = [], ids = Object.keys(names), seen = {};
      for (var i = 0; out.length < n && i < 30; i++) {
        if (i % 2 === 0) {
          var two = rng.sample(ids, 2), key = "route:" + two.join("-");
          if (seen[key]) continue;
          seen[key] = true;
          var p = ctx.w("route", { a: names[two[0]], b: names[two[1]] });
          out.push({ type: "map", key: key, map: "street", tasks: [{ route: ["home", two[0], two[1]], walker: "🧒", prompt: p, say: p }] });
        } else {
          var pair = rng.sample(ids, 2), da = dist(STREET[pair[0]], STREET.home), db = dist(STREET[pair[1]], STREET.home);
          if (Math.max(da, db) / Math.min(da, db) < 1.5) continue;
          var k2 = "near:" + pair.slice().sort().join("-");
          if (seen[k2]) continue;
          seen[k2] = true;
          out.push({ type: "map", key: k2, map: "street", tasks: [{ find: da < db ? pair[0] : pair[1], prompt: ctx.w("near"),
            say: ctx.w("nearSay", { a: names[pair[0]], b: names[pair[1]] }) }] });
        }
      }
      return out;
    }
  });

  /* «جور کن، دسته کن» — world-seed-p3 (Sorting bank). helps / doesn't help (world-seed-11), worker ↔ place
     (world-seed-3), need / want (world-seed-13), old / new (world-seed-19), home ↔ place (world-seed-17); a few items
     from a bigger bank each time. Key: the kind. */
  var HELPS = [{ id: "turn", pic: "🙋", basket: "yes" }, { id: "share", pic: "🧸", basket: "yes" }, { id: "tidy", pic: "🧹", basket: "yes" },
    { id: "sorry", pic: "🤗", basket: "yes" }, { id: "help", pic: "🍽️", basket: "yes" }, { id: "grab", pic: "✋", basket: "no" },
    { id: "push", pic: "🏃", basket: "no" }, { id: "shout", pic: "📢", basket: "no" }, { id: "mess", pic: "🧦", basket: "no" }];
  var WORKERS = [{ id: "baker", a: "🧑‍🍳", b: "🫓" }, { id: "doctor", a: "🧑‍⚕️", b: "🏥" }, { id: "teacher", a: "🧑‍🏫", b: "🏫" },
    { id: "farmer", a: "🧑‍🌾", b: "🌾" }, { id: "fruit", a: "🧑", b: "🍎" }, { id: "post", a: "🧑‍✈️", b: "📮" }];
  var NEEDS = [{ id: "water", pic: "💧", basket: "need" }, { id: "bread", pic: "🫓", basket: "need" }, { id: "coat", pic: "🧥", basket: "need" },
    { id: "home", pic: "🏠", basket: "need" }, { id: "toy", pic: "🧸", basket: "want" }, { id: "sweets", pic: "🍬", basket: "want" },
    { id: "balloon", pic: "🎈", basket: "want" }, { id: "icecream", pic: "🍦", basket: "want" }];
  var OLDNEW = [{ id: "lamp", pic: "🪔", basket: "old" }, { id: "radio", pic: "📻", basket: "old" }, { id: "phoneOld", pic: "☎️", basket: "old" },
    { id: "jug", pic: "🏺", basket: "old" }, { id: "mobile", pic: "📱", basket: "new" }, { id: "tablet", pic: "💻", basket: "new" },
    { id: "car", pic: "🚗", basket: "new" }, { id: "bulb", pic: "💡", basket: "new" }];
  var HOMES = [{ id: "igloo", a: "🧊", b: "❄️" }, { id: "tent", a: "⛺", b: "🐑" }, { id: "stilts", a: "🛖", b: "🌊" }, { id: "yazd", a: "🏠", b: "🏜️" }];
  B.PRACTICE.push({
    id: "world-seed-p3", subject: "world", level: "seed",
    objectives: ["world.seed.3", "world.seed.10", "world.seed.11", "world.seed.12", "world.seed.14"],
    needs: ["world-seed-11"], lessons: ["world-seed-11", "world-seed-3", "world-seed-13", "world-seed-17", "world-seed-8", "world-seed-19", "world-seed-21", "world-seed-23", "world-seed-24"], emoji: "🧺", title: "جور کن، دسته کن",
    words: {
      helpsPrompt: "کمک می‌کند یا نه؟", helpsSay: "این کار به دیگران کمک می‌کند یا نه؟ به سبدش ببر.",
      helpsBaskets: { yes: "کمک می‌کند", no: "کمک نمی‌کند" },
      helpsItems: { turn: "نوبت گرفتن", share: "قسمت کردن اسباب‌بازی", tidy: "جمع کردن اتاق", sorry: "ببخشید گفتن", help: "کمک در چیدن سفره",
        grab: "قاپیدن اسباب‌بازی", push: "هل دادن در صف", shout: "داد زدن", mess: "ریخت‌وپاش کردن" },
      workersPrompt: "هر کس کجا کار می‌کند؟", workersSay: "هر کس را با جایی که کار می‌کند جفت کن.",
      workersA: { baker: "نانوا", doctor: "دکتر", teacher: "معلم", farmer: "کشاورز", fruit: "میوه‌فروش", post: "پستچی" },
      workersB: { baker: "نانوایی", doctor: "درمانگاه", teacher: "مدرسه", farmer: "مزرعه", fruit: "میوه‌فروشی", post: "پست" },
      needsPrompt: "لازم داریم یا دوست داریم؟", needsSay: "این را لازم داریم، یا فقط دوست داریم داشته باشیم؟",
      needsBaskets: { need: "لازم داریم", want: "دوست داریم" },
      needsItems: { water: "آب", bread: "نان", coat: "لباس گرم", home: "خانه", toy: "اسباب‌بازی تازه", sweets: "شکلات", balloon: "بادکنک", icecream: "بستنی" },
      oldnewPrompt: "قدیم یا جدید؟", oldnewSay: "این قدیمی است یا جدید؟ به سبدش ببر.",
      oldnewBaskets: { old: "قدیمی", "new": "جدید" },
      oldnewItems: { lamp: "چراغ نفتی", radio: "رادیوی قدیمی", phoneOld: "تلفن سیم‌دار", jug: "کوزه", mobile: "تلفن همراه", tablet: "رایانه", car: "ماشین", bulb: "لامپ" },
      homesPrompt: "هر خانه، کجا؟", homesSay: "هر خانه را با جایی که در آن ساخته می‌شود جفت کن.",
      homesA: { igloo: "خانهٔ یخی", tent: "چادر عشایر", stilts: "خانه روی پایه", yazd: "خانهٔ گِلی با بادگیر" },
      homesB: { igloo: "جای خیلی سرد", tent: "کوچ با گوسفندها", stilts: "کنار آب", yazd: "کویر گرم" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["helps"];
      if (ctx.done("world-seed-3")) kinds.push("workers");
      if (ctx.done("world-seed-13")) kinds.push("needs");
      if (ctx.done("world-seed-17")) kinds.push("homes");
      if (ctx.done("world-seed-19")) kinds.push("oldnew");
      // Missed kinds first, then every kind in turn (fresh items each time) to fill the session.
      var order = keysFirst(ctx.again, kinds, kinds.length, rng);
      kinds = [];
      for (var i = 0; kinds.length < Math.min(n, 2 * order.length + 1); i++) kinds.push(order[i % order.length]);
      return kinds.map(function (k) {
        if (k === "helps") return sortStep(rng, ctx, k, HELPS, [{ value: "yes", pic: "👍" }, { value: "no", pic: "👎" }], 2);
        if (k === "needs") return sortStep(rng, ctx, k, NEEDS, [{ value: "need", pic: "✅" }, { value: "want", pic: "💭" }], 2);
        if (k === "oldnew") return sortStep(rng, ctx, k, OLDNEW, [{ value: "old", pic: "👴" }, { value: "new", pic: "🧒" }], 2);
        if (k === "workers") return pairsStep(rng, ctx, k, WORKERS, 3);
        return pairsStep(rng, ctx, k, HOMES, 3);
      });
    }
  });

  /* «اول چه، بعد چه؟» — world-seed-p4 (Day and year in order). The parts of a day (world-seed-10), getting ready for
     Nowruz (world-seed-5) and Yalda night (world-seed-15): three or four in order, picked from a longer list. */
  var DAY = [{ id: "wake", pic: "🌅" }, { id: "breakfast", pic: "🍳" }, { id: "school", pic: "🎒" }, { id: "lunch", pic: "🍲" }, { id: "play", pic: "⚽" }, { id: "dinner", pic: "🍽️" }, { id: "sleep", pic: "🌙" }];
  var NOWRUZ = [{ id: "clean", pic: "🧹" }, { id: "sabzeh", pic: "🌱" }, { id: "haftsin", pic: "🍎" }, { id: "new", pic: "🎉" }, { id: "visit", pic: "👵" }, { id: "picnic", pic: "🧺" }];
  var YALDA = [{ id: "sunset", pic: "🌇" }, { id: "gather", pic: "👨‍👩‍👧" }, { id: "fruit", pic: "🍉" }, { id: "story", pic: "📖" }, { id: "sleep", pic: "🌙" }];
  B.PRACTICE.push({
    id: "world-seed-p4", subject: "world", level: "seed", objectives: ["world.seed.5", "world.seed.9"],
    needs: ["world-seed-10"], lessons: ["world-seed-10", "world-seed-5", "world-seed-15", "world-seed-8"], emoji: "🌅", title: "اول چه، بعد چه؟",
    words: {
      dayPrompt: "یک روز: اول چه، بعد چه؟ به ترتیب بچین.",
      nowruzPrompt: "نوروز: اول چه، بعد چه؟ به ترتیب بچین.",
      yaldaPrompt: "شب یلدا: اول چه، بعد چه؟ به ترتیب بچین.",
      day: { wake: "بیدار شدن", breakfast: "صبحانه", school: "رفتن به مدرسه", lunch: "ناهار", play: "بازی بعد از ظهر", dinner: "شام", sleep: "خوابیدن" },
      nowruz: { clean: "خانه‌تکانی", sabzeh: "سبزه سبز کردن", haftsin: "چیدن هفت‌سین", "new": "تحویل سال", visit: "دید و بازدید", picnic: "سیزده‌به‌در" },
      yalda: { sunset: "خورشید زود غروب می‌کند", gather: "خانواده دور هم جمع می‌شود", fruit: "هندوانه و انار می‌خوریم", story: "بزرگ‌ترها قصه می‌گویند", sleep: "دیر می‌خوابیم" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["day"];
      if (ctx.done("world-seed-5")) kinds.push("nowruz");
      if (ctx.done("world-seed-15")) kinds.push("yalda");
      var lists = { day: DAY, nowruz: NOWRUZ, yalda: YALDA }, out = [], seen = {};
      for (var i = 0; out.length < n && i < 20; i++) {
        var kind = kinds[i % kinds.length], list = lists[kind], k = rng.int(3, 4);
        var pick = rng.sample(list.map(function (x, j) { return j; }), k).sort(function (a, b) { return a - b; });
        var key = kind + ":" + pick.join("");
        if (seen[key]) continue;
        seen[key] = true;
        out.push(orderStep(ctx, kind, pick.map(function (j) { return list[j]; }), ctx.w(kind + "Prompt"), key));
      }
      return out;
    }
  });

  /* ================= Sprout ================= */

  /* «جهت‌ها» — world-sprout-p1 (Direction drill). Turn to a direction with the sun at a new time of day
     (world-sprout-3); after world-sprout-35 on the neighbourhood map with north at the top: "from Nima's home go
     north: where do you get to?" (only where one place is clearly that way). */
  var HOOD = { home: [60, 230], bakery: [80, 70], school: [340, 230], clinic: [180, 70], park: [343, 68], bus: [200, 230] };
  var VEC = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0] };
  function firstThatWay(from, dir) {
    var best = null, bd = 1e9;
    Object.keys(HOOD).forEach(function (id) {
      if (id === from) return;
      var dx = HOOD[id][0] - HOOD[from][0], dy = HOOD[id][1] - HOOD[from][1], v = VEC[dir];
      var along = dx * v[0] + dy * v[1], across = Math.abs(dx * v[1] - dy * v[0]);
      if (along > 0 && across < along * 0.3 && along < bd) { bd = along; best = id; }
    });
    return best;
  }
  B.PRACTICE.push({
    id: "world-sprout-p1", subject: "world", level: "sprout", objectives: ["world.spr.3"],
    needs: ["world-sprout-3"], lessons: ["world-sprout-3", "world-sprout-8"], emoji: "🧭", title: "شمال، جنوب، شرق، غرب",
    words: {
      face: "رو به {dir} بچرخ.",
      sun: { rise: "صبح است و خورشید بالا می‌آید. رو به خورشید بچرخ.", noon: "ظهر است. رو به خورشید بچرخ.", set: "عصر است و خورشید پایین می‌رود. رو به خورشید بچرخ." },
      dirs: { n: "شمال", s: "جنوب", e: "شرق", w: "غرب" },
      go: "روی نقشه، شمال بالاست. از {from} به طرف {dir} برو. اول به کجا می‌رسی؟",
      places: { home: "خانهٔ نیما", bakery: "نانوایی", school: "مدرسه", clinic: "درمانگاه", park: "پارک", bus: "ایستگاه اتوبوس" }
    },
    make: function (rng, n, ctx) {
      var dirs = ctx.w("dirs"), out = [], seen = {};
      var useMap = ctx.done("world-sprout-35");
      for (var i = 0; out.length < n && i < 40; i++) {
        if (useMap && i % 2 === 1) {
          var from = rng.pick(Object.keys(HOOD)), d = rng.pick(["n", "s", "e", "w"]), to = firstThatWay(from, d), key = "go:" + from + d;
          if (!to || seen[key]) continue;
          seen[key] = true;
          var p = ctx.w("go", { from: ctx.w("places")[from], dir: dirs[d] });
          out.push({ type: "map", key: key, map: "hood", tasks: [{ find: to, prompt: p, say: p }] });
        } else {
          var time = rng.pick(["rise", "noon", "set", "none", "none"]), face = time === "none" ? rng.pick(["n", "s", "e", "w"]) : { rise: "e", noon: "s", set: "w" }[time];
          var k = "face:" + time + face;
          if (seen[k]) continue;
          seen[k] = true;
          var task = { face: face, prompt: time === "none" ? ctx.w("face", { dir: dirs[face] }) : ctx.w("sun")[time] };
          if (time !== "none") task.sun = time;
          out.push({ type: "compass", key: k, hide: rng() < 0.5, tasks: [task] });
        }
      }
      return out;
    }
  });

  /* «نشانه‌ها و راهنما» — world-sprout-p2 (Symbol and legend bank). A small map with a legend, new symbols and places
     each time (world-sprout-2): find a place by reading the legend; after world-sprout-15, find a room on the school
     plan. Key: what to find. */
  var SYMBOLS = ["🟥", "🟡", "⭐", "➕", "🟢", "🔷", "🟣", "🔺"];
  var LEGEND_PLACES = ["home", "bakery", "school", "clinic", "park", "bus", "library", "shop"];
  var SPOTS = [[70, 70], [200, 70], [330, 70], [70, 230], [200, 230], [330, 230]];
  B.PRACTICE.push({
    id: "world-sprout-p2", subject: "world", level: "sprout", objectives: ["world.spr.2", "world.spr.14"],
    needs: ["world-sprout-2"], lessons: ["world-sprout-2", "world-sprout-15", "world-sprout-35", "world-sprout-8"], emoji: "🔣", title: "نشانه‌ها و راهنما",
    words: {
      find: "راهنمای زیر نقشه را ببین. {name} کجاست؟",
      school: "روی نقشهٔ مدرسه، {name} را پیدا کن.",
      places: { home: "خانه", bakery: "نانوایی", school: "مدرسه", clinic: "درمانگاه", park: "پارک", bus: "ایستگاه اتوبوس", library: "کتابخانه", shop: "فروشگاه" },
      schoolRooms: { office: "دفتر مدرسه", class: "کلاس دریا", library: "کتابخانه", health: "اتاق بهداشت", yard: "حیاط مدرسه", gate: "در مدرسه" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("places"), rooms = ctx.w("schoolRooms"), out = [], seen = {};
      for (var i = 0; out.length < n && i < 30; i++) {
        if (ctx.done("world-sprout-15") && i % 3 === 2) {
          var r = rng.pick(Object.keys(rooms));
          if (seen["school:" + r]) continue;
          seen["school:" + r] = true;
          out.push(findStep("school", r, ctx.w("school", { name: rooms[r] })));
          continue;
        }
        var ids = rng.sample(LEGEND_PLACES, 5), syms = rng.sample(SYMBOLS, 5), spots = rng.sample(SPOTS, 5), target = rng.pick(ids);
        if (seen["legend:" + target]) continue;
        seen["legend:" + target] = true;
        var places = ids.map(function (id, j) { return { id: id, name: names[id], pic: syms[j], at: spots[j], size: 0.8 }; });
        out.push({ type: "map", key: "legend:" + target, map: { bg: "grass",
          shapes: [{ rect: [0, 135, 400, 30], kind: "road" }, { rect: [135, 0, 30, 300], kind: "road" }, { rect: [265, 0, 30, 300], kind: "road" }],
          legend: places.map(function (p) { return { pic: p.pic, name: p.name }; }), places: places },
          tasks: [{ find: target, prompt: ctx.w("find", { name: names[target] }) }] });
      }
      return out;
    }
  });

  /* «ایران روی نقشه» — world-sprout-p3 (Iran map quiz, first). A sea, Tehran, a big city by its direction, and the
     child's own province (any answer is right), on the map of Iran (world-sprout-4). */
  var IRAN_FIRST = [{ id: "caspian", kind: "sea" }, { id: "persian-gulf", kind: "sea" }, { id: "oman-sea", kind: "sea" },
    { id: "tehran", kind: "city" }, { id: "mashhad", kind: "city" }, { id: "tabriz", kind: "city" }, { id: "ahvaz", kind: "city" },
    { id: "shiraz", kind: "city" }, { id: "rasht", kind: "city" }, { id: "zahedan", kind: "city" }, { id: "mine", kind: "mine" }];
  B.PRACTICE.push({
    id: "world-sprout-p3", subject: "world", level: "sprout", objectives: ["world.spr.4"],
    needs: ["world-sprout-4"], lessons: ["world-sprout-4", "world-sprout-8"], emoji: "🇮🇷", title: "ایران روی نقشه",
    words: {
      ask: {
        caspian: "دریای خزر، در شمال ایران، کجاست؟", "persian-gulf": "خلیج فارس، در جنوب ایران، کجاست؟", "oman-sea": "دریای عمان، در جنوب شرقی، کجاست؟",
        tehran: "تهران، پایتخت ایران، کجاست؟", mashhad: "شهری بزرگ در شمال شرقی ایران: مشهد. پیدایش کن.", tabriz: "شهری بزرگ در شمال غربی ایران: تبریز. پیدایش کن.",
        ahvaz: "شهری در جنوب غربی، نزدیک خلیج فارس: اهواز. پیدایش کن.", shiraz: "شهری در جنوب ایران: شیراز. پیدایش کن.",
        rasht: "شهری کنار دریای خزر: رشت. پیدایش کن.", zahedan: "شهری در جنوب شرقی ایران: زاهدان. پیدایش کن.",
        mine: "استان خودت را پیدا کن و رویش بزن. اگر نمی‌دانی، از بزرگ‌ترت بپرس."
      }
    },
    make: function (rng, n, ctx) {
      var ask = ctx.w("ask"), keys = keysFirst(ctx.again, IRAN_FIRST.map(function (x) { return x.id; }), n, rng);
      var kinds = byId(IRAN_FIRST);
      return keys.map(function (id) {
        var k = kinds[id].kind;
        if (k === "mine") return { type: "map", key: "mine", map: "iran", layers: ["provinces", "seas"], tasks: [{ mine: true, prompt: ask.mine, say: ask.mine }] };
        if (k === "sea") return { type: "map", key: id, map: "iran", layers: ["iran", "seas"], tasks: [{ find: id, prompt: ask[id], say: ask[id] }] };
        return { type: "map", key: id, map: "iran", layers: ["seas"], cities: ["tehran", "mashhad", "tabriz", "ahvaz", "shiraz", "rasht", "zahedan", "isfahan"],
          tasks: [{ find: id, prompt: ask[id], say: ask[id] }] };
      });
    }
  });

  /* «چرخ سال» — world-sprout-p4 (Year wheel). Four days of the week, months or seasons in order from a random point
     (world-sprout-10), and the festivals of the year from a random one (world-sprout-5); the list goes round. */
  var CYCLES = {
    week: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
    months: ["far", "ord", "kho", "tir", "mor", "sha", "meh", "aba", "aza", "dey", "bah", "esf"],
    seasons: ["spring", "summer", "autumn", "winter"],
    fests: ["nowruz", "sizdah", "mehregan", "yalda", "chahar"]
  };
  var CYCLE_PIC = { spring: "🌸", summer: "☀️", autumn: "🍂", winter: "❄️", nowruz: "🌱", sizdah: "🧺", mehregan: "🍎", yalda: "🍉", chahar: "🔥" };
  B.PRACTICE.push({
    id: "world-sprout-p4", subject: "world", level: "sprout", objectives: ["world.spr.5", "world.spr.21"],
    needs: ["world-sprout-10"], lessons: ["world-sprout-10", "world-sprout-12", "world-sprout-5", "world-sprout-8"], emoji: "🔄", title: "چرخ سال",
    words: {
      prompt: "از «{first}» شروع کن و به ترتیب بچین.",
      names: { sat: "شنبه", sun: "یکشنبه", mon: "دوشنبه", tue: "سه‌شنبه", wed: "چهارشنبه", thu: "پنجشنبه", fri: "جمعه",
        far: "فروردین", ord: "اردیبهشت", kho: "خرداد", tir: "تیر", mor: "مرداد", sha: "شهریور", meh: "مهر", aba: "آبان", aza: "آذر", dey: "دی", bah: "بهمن", esf: "اسفند",
        spring: "بهار", summer: "تابستان", autumn: "پاییز", winter: "زمستان",
        nowruz: "نوروز", sizdah: "سیزده‌به‌در", mehregan: "مهرگان", yalda: "شب یلدا", chahar: "چهارشنبه‌سوری" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["week", "months", "seasons"];
      if (ctx.done("world-sprout-5")) kinds.push("fests");
      var names = ctx.w("names"), out = [], seen = {};
      for (var i = 0; out.length < n && i < 30; i++) {
        var kind = rng.pick(kinds), list = CYCLES[kind], start = rng.int(0, list.length - 1), key = kind + ":" + start;
        if (seen[key]) continue;
        seen[key] = true;
        var k = Math.min(4, list.length), items = [];
        for (var j = 0; j < k; j++) items.push(list[(start + j) % list.length]);
        out.push({ type: "order", key: key, numbered: true, prompt: ctx.w("prompt", { first: names[items[0]] }), say: ctx.w("prompt", { first: names[items[0]] }),
          items: items.map(function (id) { return { pic: CYCLE_PIC[id], label: names[id], say: names[id] }; }) });
      }
      return out;
    }
  });

  /* «روی کرهٔ زمین» — world-sprout-p5 (Globe finder). Find a continent or an ocean on the world map (world-sprout-17);
     hot and cold places sorted after world-sprout-18. */
  var CONTS = ["asia", "europe", "africa", "north-america", "south-america", "oceania", "antarctica"];
  var OCEANS = ["pacific", "atlantic", "indian", "arctic", "southern"];
  var HOTCOLD = [{ id: "rainforest", pic: "🌴", basket: "hot" }, { id: "sahara", pic: "🏜️", basket: "hot" }, { id: "equator", pic: "☀️", basket: "hot" },
    { id: "lut", pic: "🔥", basket: "hot" }, { id: "antarctica", pic: "🐧", basket: "cold" }, { id: "north", pic: "🐻‍❄️", basket: "cold" },
    { id: "mountain", pic: "🏔️", basket: "cold" }, { id: "igloo", pic: "🧊", basket: "cold" }];
  B.PRACTICE.push({
    id: "world-sprout-p5", subject: "world", level: "sprout", objectives: ["world.spr.18"],
    needs: ["world-sprout-17"], lessons: ["world-sprout-17", "world-sprout-18", "world-sprout-34"], emoji: "🌍", title: "روی کرهٔ زمین",
    words: {
      find: "{name} را روی نقشهٔ دنیا پیدا کن.",
      names: { asia: "آسیا", europe: "اروپا", africa: "آفریقا", "north-america": "آمریکای شمالی", "south-america": "آمریکای جنوبی", oceania: "اقیانوسیه", antarctica: "جنوبگان",
        pacific: "اقیانوس آرام", atlantic: "اقیانوس اطلس", indian: "اقیانوس هند", arctic: "اقیانوس منجمد شمالی", southern: "اقیانوس منجمد جنوبی" },
      hotPrompt: "گرم یا سرد؟", hotSay: "این جا گرم است یا سرد؟ به سبدش ببر.",
      hotBaskets: { hot: "گرم", cold: "سرد" },
      hotItems: { rainforest: "جنگل بارانی", sahara: "صحرای آفریقا", equator: "نزدیک خط استوا", lut: "کویر لوت", antarctica: "جنوبگان", north: "قطب شمال", mountain: "قلهٔ کوه بلند", igloo: "جای خانه‌های یخی" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), pool = CONTS.concat(OCEANS);
      var keys = keysFirst(ctx.again, pool, ctx.done("world-sprout-18") ? n - 1 : n, rng);
      var out = keys.map(function (id) { return findStep("world", id, ctx.w("find", { name: names[id] }), { layers: ["continents", "oceans"] }); });
      if (ctx.done("world-sprout-18")) out.splice(rng.int(0, out.length), 0, sortStep(rng, ctx, "hot", HOTCOLD, [{ value: "hot", pic: "🔥" }, { value: "cold", pic: "❄️" }], 2));
      return out;
    }
  });

  /* «قدیم و امروز» — world-sprout-p6 (Then and now bank). My life in order (world-sprout-9); then / now for travel
     (world-sprout-29), messages (world-sprout-30) and games (world-sprout-31), a few from a bigger bank each time. */
  var LIFE = [{ id: "baby", pic: "👶" }, { id: "crawl", pic: "🧸" }, { id: "walk", pic: "👣" }, { id: "talk", pic: "🗣️" }, { id: "school", pic: "🎒" }];
  var THEN_NOW = [{ id: "caravan", pic: "🐫", basket: "then", lesson: "world-sprout-29" }, { id: "horse", pic: "🐎", basket: "then", lesson: "world-sprout-29" },
    { id: "plane", pic: "✈️", basket: "now", lesson: "world-sprout-29" }, { id: "metro", pic: "🚇", basket: "now", lesson: "world-sprout-29" },
    { id: "chapar", pic: "🏇", basket: "then", lesson: "world-sprout-30" }, { id: "letter", pic: "✉️", basket: "then", lesson: "world-sprout-30" },
    { id: "message", pic: "📱", basket: "now", lesson: "world-sprout-30" }, { id: "video", pic: "💻", basket: "now", lesson: "world-sprout-30" },
    { id: "alak", pic: "🏏", basket: "then", lesson: "world-sprout-31" }, { id: "hopscotch", pic: "🔢", basket: "then", lesson: "world-sprout-31" },
    { id: "tablet", pic: "🎮", basket: "now", lesson: "world-sprout-31" }];
  B.PRACTICE.push({
    id: "world-sprout-p6", subject: "world", level: "sprout", objectives: ["world.spr.8", "world.spr.17"],
    needs: ["world-sprout-9"], lessons: ["world-sprout-9", "world-sprout-12", "world-sprout-29", "world-sprout-30", "world-sprout-31", "world-sprout-34"], emoji: "⏳", title: "قدیم و امروز",
    words: {
      lifePrompt: "یک بچه چطور بزرگ می‌شود؟ به ترتیب بچین.",
      life: { baby: "نوزاد بود", crawl: "چهار دست و پا رفت", walk: "راه افتاد", talk: "حرف زد", school: "به مدرسه رفت" },
      thenPrompt: "قدیم یا امروز؟", thenSay: "این را بیشتر قدیم می‌دیدیم یا امروز؟ به سبدش ببر.",
      thenBaskets: { then: "قدیم", now: "امروز" },
      thenItems: { caravan: "کاروان شتر", horse: "سفر با اسب", plane: "هواپیما", metro: "مترو", chapar: "چاپار", letter: "نامه با پست",
        message: "پیام با گوشی", video: "تماس تصویری", alak: "الک‌دولک", hopscotch: "لی‌لی", tablet: "بازی رایانه‌ای" }
    },
    make: function (rng, n, ctx) {
      var bank = THEN_NOW.filter(function (x) { return ctx.done(x.lesson); }), out = [];
      var hasThen = bank.some(function (x) { return x.basket === "then"; }) && bank.some(function (x) { return x.basket === "now"; });
      for (var i = 0; out.length < n && i < n * 2; i++) {
        if (hasThen && i % 2 === 1) {
          var s = sortStep(rng, ctx, "then", bank, [{ value: "then", pic: "👴" }, { value: "now", pic: "🧒" }], 2);
          s.key = "then";
          out.push(s);
        } else {
          var k = rng.int(3, 4), pick = rng.sample([0, 1, 2, 3, 4], k).sort();
          out.push(orderStep(ctx, "life", pick.map(function (j) { return LIFE[j]; }), ctx.w("lifePrompt"), "life:" + pick.join("")));
        }
      }
      return out;
    }
  });

  /* «خرید و انتخاب» — world-sprout-p7 (Shop and choose). Prices in thousands of toman (world-sprout-24): pay for a
     thing with the right bills; with a little money, which thing can you buy; what is left to save. */
  var GOODS = [{ id: "pencil", emoji: "✏️", price: 2 }, { id: "bread", emoji: "🫓", price: 3 }, { id: "apple", emoji: "🍎", price: 4 },
    { id: "book", emoji: "📕", price: 8 }, { id: "ball", emoji: "⚽", price: 9 }, { id: "notebook", emoji: "📒", price: 5 }, { id: "juice", emoji: "🧃", price: 6 }];
  B.PRACTICE.push({
    id: "world-sprout-p7", subject: "world", level: "sprout", objectives: ["world.spr.11"],
    needs: ["world-sprout-24"], lessons: ["world-sprout-24", "world-sprout-28"], emoji: "🛒", title: "خرید و انتخاب",
    words: {
      pay: "{name} را بخر: پول درست را بده.",
      paySay: "{name} {price} هزار تومان است. پولش را بده.",
      can: "{money} هزار تومان داری. کدام را می‌توانی بخری؟",
      opt: "{name}، {price} هزار تومان",
      left: "{money} هزار تومان داشتی و {name} را به {price} هزار تومان خریدی. چقدر برای قلکت ماند؟",
      names: { pencil: "مداد", bread: "نان", apple: "سیب", book: "کتاب", ball: "توپ", notebook: "دفتر", juice: "آبمیوه" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), out = [], seen = {};
      for (var i = 0; out.length < n && i < 30; i++) {
        var kind = ["pay", "can", "left"][i % 3], g = rng.pick(GOODS), key = kind + ":" + g.id;
        if (seen[key]) continue;
        seen[key] = true;
        if (kind === "pay") {
          var wallet = rng.shuffle([1, 2, 2, 5, 5]);
          out.push({ type: "money", key: key, prompt: ctx.w("pay", { name: names[g.id] }), say: ctx.w("paySay", { name: names[g.id], price: g.price }),
            items: [{ emoji: g.emoji, name: names[g.id], price: g.price }], wallet: wallet });
        } else if (kind === "can") {
          var money = g.price + rng.int(0, 1), dearer = rng.sample(GOODS.filter(function (x) { return x.price > money; }), 2);
          if (dearer.length < 2) continue;
          var opts = [g].concat(dearer).map(function (x) { return ctx.w("opt", { name: names[x.id], price: x.price }); });
          out.push({ type: "choose", key: key, prompt: ctx.w("can", { money: money }), say: ctx.w("can", { money: money }), options: rng.shuffle(opts), answer: opts[0] });
        } else {
          var have = 10, rest = have - g.price;
          var o2 = rng.shuffle([rest, rest + 1, rest > 1 ? rest - 1 : rest + 2]);
          out.push({ type: "money", key: key, prompt: ctx.w("left", { money: have, name: names[g.id], price: g.price }), bills: [], options: o2, answer: rest });
        }
      }
      return out;
    }
  });

  /* «دسته کن» — world-sprout-p8 (Sorting bank). City / village / nomads (world-sprout-1, world-sprout-13), fair / not
     fair rules (world-sprout-19), need / want (world-sprout-23) and the recycling bins (world-sprout-27). */
  var PLACES3 = [{ id: "tower", pic: "🏢", basket: "city" }, { id: "metro", pic: "🚇", basket: "city" }, { id: "traffic", pic: "🚦", basket: "city" },
    { id: "farm", pic: "🌾", basket: "village" }, { id: "cow", pic: "🐄", basket: "village" }, { id: "orchard", pic: "🍎", basket: "village" },
    { id: "tent", pic: "⛺", basket: "nomad" }, { id: "flock", pic: "🐑", basket: "nomad" }, { id: "move", pic: "🐎", basket: "nomad" }];
  var FAIR = [{ id: "turns", pic: "🔁", basket: "fair" }, { id: "same", pic: "⚖️", basket: "fair" }, { id: "listen", pic: "👂", basket: "fair" },
    { id: "always", pic: "👑", basket: "unfair" }, { id: "change", pic: "🔀", basket: "unfair" }, { id: "leave", pic: "🚫", basket: "unfair" }];
  var NEED2 = [{ id: "food", pic: "🍲", basket: "need" }, { id: "home", pic: "🏠", basket: "need" }, { id: "doctor", pic: "🩺", basket: "need" },
    { id: "clothes", pic: "👕", basket: "need" }, { id: "game", pic: "🎮", basket: "want" }, { id: "sweets", pic: "🍭", basket: "want" }, { id: "toy", pic: "🧸", basket: "want" }];
  var BINS = [{ id: "paper", pic: "📰", basket: "paper" }, { id: "box", pic: "📦", basket: "paper" }, { id: "bottle", pic: "🧴", basket: "plastic" },
    { id: "bag", pic: "🛍️", basket: "plastic" }, { id: "jar", pic: "🫙", basket: "glass" }, { id: "glassb", pic: "🍾", basket: "glass" },
    { id: "peel", pic: "🍌", basket: "food" }, { id: "bread", pic: "🫓", basket: "food" }];
  B.PRACTICE.push({
    id: "world-sprout-p8", subject: "world", level: "sprout", objectives: ["world.spr.1", "world.spr.10", "world.spr.11", "world.spr.12"],
    needs: ["world-sprout-1"], lessons: ["world-sprout-1", "world-sprout-13", "world-sprout-19", "world-sprout-20", "world-sprout-22", "world-sprout-23", "world-sprout-24", "world-sprout-26", "world-sprout-27", "world-sprout-28"], emoji: "🗂️", title: "دسته کن",
    words: {
      placesPrompt: "شهر، روستا یا عشایر؟", placesSay: "این را بیشتر در شهر می‌بینیم، در روستا، یا با عشایر؟",
      placesBaskets: { city: "شهر", village: "روستا", nomad: "عشایر" },
      placesItems: { tower: "ساختمان بلند", metro: "مترو", traffic: "چراغ راهنمایی", farm: "مزرعه", cow: "گاو در طویله", orchard: "باغ میوه", tent: "چادر سیاه", flock: "گله در کوچ", move: "کوچ با اسب" },
      fairPrompt: "قانون منصفانه است یا نه؟", fairSay: "این قانون بازی منصفانه است یا نه؟",
      fairBaskets: { fair: "منصفانه", unfair: "منصفانه نیست" },
      fairItems: { turns: "همه نوبتی بازی کنند", same: "قانون برای همه یکی باشد", listen: "حرف همه را بشنویم", always: "همیشه یک نفر برنده شود", change: "وسط بازی قانون عوض شود", leave: "کوچک‌ترها بازی نکنند" },
      needPrompt: "نیاز یا خواسته؟", needSay: "این نیاز است یا خواسته؟",
      needBaskets: { need: "نیاز", want: "خواسته" },
      needItems: { food: "غذا", home: "خانه", doctor: "دکتر وقتی بیماریم", clothes: "لباس", game: "بازی رایانه‌ای", sweets: "آبنبات", toy: "عروسک تازه" },
      binsPrompt: "به کدام سطل؟", binsSay: "هر چیز را در سطل بازیافت خودش بینداز.",
      binsBaskets: { paper: "کاغذ", plastic: "پلاستیک", glass: "شیشه", food: "پسماند غذا" },
      binsItems: { paper: "روزنامه", box: "جعبهٔ مقوایی", bottle: "بطری پلاستیکی", bag: "کیسهٔ پلاستیکی", jar: "شیشهٔ مربا", glassb: "بطری شیشه‌ای", peel: "پوست موز", bread: "نان مانده" }
    },
    make: function (rng, n, ctx) {
      var kinds = [];
      kinds.push("places");
      if (ctx.done("world-sprout-19")) kinds.push("fair");
      if (ctx.done("world-sprout-23")) kinds.push("need");
      if (ctx.done("world-sprout-27")) kinds.push("bins");
      var order = keysFirst(ctx.again, kinds, kinds.length, rng);
      kinds = [];
      for (var i = 0; kinds.length < Math.min(n, 2 * order.length + 1); i++) kinds.push(order[i % order.length]);
      return kinds.map(function (k) {
        if (k === "places") {
          var b = [{ value: "city", pic: "🏙️" }, { value: "village", pic: "🏡" }];
          if (ctx.done("world-sprout-13")) b.push({ value: "nomad", pic: "⛺" });
          return sortStep(rng, ctx, k, PLACES3, b, 2);
        }
        if (k === "fair") return sortStep(rng, ctx, k, FAIR, [{ value: "fair", pic: "⚖️" }, { value: "unfair", pic: "🙁" }], 2);
        if (k === "need") return sortStep(rng, ctx, k, NEED2, [{ value: "need", pic: "✅" }, { value: "want", pic: "💭" }], 2);
        return sortStep(rng, ctx, k, BINS, [{ value: "paper", pic: "📄" }, { value: "plastic", pic: "🧴" }, { value: "glass", pic: "🫙" }, { value: "food", pic: "🍂" }], 1);
      });
    }
  });

  /* ================= Sapling ================= */

  /* «استان‌ها» — world-sapling-p1 (Province quiz). Find a province (all 31; the ones children know less come more
     often), match provinces to their centres (world-sapling-3); after world-sapling-16, find a neighbour of a
     province (a curated list of borders). Key: the province (or "centres"). */
  var PROVS = ["ardabil", "east-azerbaijan", "north-khorasan", "golestan", "gilan", "west-azerbaijan", "zanjan", "mazandaran", "qazvin", "alborz",
    "kurdistan", "razavi-khorasan", "tehran", "semnan", "hamadan", "kermanshah", "qom", "markazi", "lorestan", "ilam", "isfahan", "yazd",
    "south-khorasan", "chaharmahal-bakhtiari", "khuzestan", "kohgiluyeh-boyerahmad", "kerman", "bushehr", "fars", "hormozgan", "sistan-baluchestan"];
  var KNOWN = ["tehran", "isfahan", "fars", "khuzestan", "gilan", "razavi-khorasan", "east-azerbaijan", "mazandaran", "yazd", "kerman"];
  var NEIGH = { yazd: ["isfahan", "semnan", "razavi-khorasan", "south-khorasan", "kerman", "fars"], gilan: ["ardabil", "zanjan", "qazvin", "mazandaran"],
    tehran: ["mazandaran", "alborz", "semnan", "qom", "markazi"], kerman: ["yazd", "south-khorasan", "sistan-baluchestan", "hormozgan", "fars"],
    fars: ["isfahan", "yazd", "kerman", "hormozgan", "bushehr", "kohgiluyeh-boyerahmad"], golestan: ["mazandaran", "semnan", "north-khorasan"],
    bushehr: ["khuzestan", "kohgiluyeh-boyerahmad", "fars", "hormozgan"], mazandaran: ["gilan", "qazvin", "alborz", "tehran", "semnan", "golestan"] };
  B.PRACTICE.push({
    id: "world-sapling-p1", subject: "world", level: "sapling", objectives: ["world.sap.3"],
    needs: ["world-sapling-3"], lessons: ["world-sapling-3", "world-sapling-16", "world-sapling-17", "world-sapling-9"], emoji: "🗺️", title: "استان‌ها",
    words: {
      find: "استان {name} را پیدا کن.",
      neigh: "یکی از همسایه‌های استان {a}، استان {b} است. {b} را پیدا کن.",
      centresPrompt: "هر استان، مرکزش", centresSay: "هر استان را با شهرِ مرکزش جفت کن.",
      prov: { ardabil: "اردبیل", "east-azerbaijan": "آذربایجان شرقی", "north-khorasan": "خراسان شمالی", golestan: "گلستان", gilan: "گیلان", "west-azerbaijan": "آذربایجان غربی",
        zanjan: "زنجان", mazandaran: "مازندران", qazvin: "قزوین", alborz: "البرز", kurdistan: "کردستان", "razavi-khorasan": "خراسان رضوی", tehran: "تهران", semnan: "سمنان",
        hamadan: "همدان", kermanshah: "کرمانشاه", qom: "قم", markazi: "مرکزی", lorestan: "لرستان", ilam: "ایلام", isfahan: "اصفهان", yazd: "یزد", "south-khorasan": "خراسان جنوبی",
        "chaharmahal-bakhtiari": "چهارمحال و بختیاری", khuzestan: "خوزستان", "kohgiluyeh-boyerahmad": "کهگیلویه و بویراحمد", kerman: "کرمان", bushehr: "بوشهر", fars: "فارس",
        hormozgan: "هرمزگان", "sistan-baluchestan": "سیستان و بلوچستان" },
      centre: { ardabil: "اردبیل", "east-azerbaijan": "تبریز", "north-khorasan": "بجنورد", golestan: "گرگان", gilan: "رشت", "west-azerbaijan": "ارومیه", zanjan: "زنجان",
        mazandaran: "ساری", qazvin: "قزوین", alborz: "کرج", kurdistan: "سنندج", "razavi-khorasan": "مشهد", tehran: "تهران", semnan: "سمنان", hamadan: "همدان",
        kermanshah: "کرمانشاه", qom: "قم", markazi: "اراک", lorestan: "خرم‌آباد", ilam: "ایلام", isfahan: "اصفهان", yazd: "یزد", "south-khorasan": "بیرجند",
        "chaharmahal-bakhtiari": "شهرکرد", khuzestan: "اهواز", "kohgiluyeh-boyerahmad": "یاسوج", kerman: "کرمان", bushehr: "بوشهر", fars: "شیراز",
        hormozgan: "بندرعباس", "sistan-baluchestan": "زاهدان" }
    },
    make: function (rng, n, ctx) {
      var prov = ctx.w("prov"), centre = ctx.w("centre"), out = [];
      // Less known provinces twice in the pool: they come more often.
      var pool = PROVS.concat(PROVS.filter(function (p) { return KNOWN.indexOf(p) === -1; }));
      var picks = [], seen = {};
      ctx.again.forEach(function (k) { if (PROVS.indexOf(k) !== -1 && !seen[k]) { seen[k] = true; picks.push(k); } });
      while (picks.length < n) { var p = rng.pick(pool); if (!seen[p]) { seen[p] = true; picks.push(p); } }
      var neighOk = ctx.done("world-sapling-16");
      picks.slice(0, n).forEach(function (id, i) {
        if (i % 3 === 1) {
          // centres: pairs of three provinces whose centre has a different name
          var diff = rng.sample(PROVS.filter(function (x) { return prov[x] !== centre[x]; }), 3);
          out.push({ type: "pairs", key: "centres", prompt: ctx.w("centresPrompt"), say: ctx.w("centresSay"),
            pairs: diff.map(function (x) { return [{ label: prov[x], say: prov[x] }, { label: centre[x], say: centre[x] }]; }) });
        } else if (neighOk && i % 3 === 2) {
          var a = rng.pick(Object.keys(NEIGH)), b = rng.pick(NEIGH[a]);
          out.push({ type: "map", key: "n:" + a + ":" + b, map: "iran", layers: ["provinces", "seas"], tasks: [{ find: b, prompt: ctx.w("neigh", { a: prov[a], b: prov[b] }) }] });
        } else {
          out.push({ type: "map", key: id, map: "iran", layers: ["provinces", "seas"], tasks: [{ find: id, prompt: ctx.w("find", { name: prov[id] }) }] });
        }
      });
      return out;
    }
  });

  /* «سرزمین ایران» — world-sapling-p2 (Iran's land). Find a mountain range, a peak, a desert (world-sapling-1), a
     river or Lake Urmia (world-sapling-15), a sea; which climate fits a city (world-sapling-2). */
  var LANDFORMS = ["alborz", "zagros", "kavir", "lut", "damavand", "sabalan"];
  var RIVERS = ["karun", "zayandeh", "sefid", "aras", "urmia"];
  var SEAS = ["caspian", "persian-gulf", "oman-sea"];
  var CLIMATE = { ardabil: "cold", hamadan: "cold", tabriz: "cold", rasht: "wet", sari: "wet", yazd: "dry", kerman: "dry", "bandar-abbas": "humid", bushehr: "humid", chabahar: "humid" };
  B.PRACTICE.push({
    id: "world-sapling-p2", subject: "world", level: "sapling", objectives: ["world.sap.1", "world.sap.2"],
    needs: ["world-sapling-1"], lessons: ["world-sapling-1", "world-sapling-40", "world-sapling-15", "world-sapling-2", "world-sapling-41", "world-sapling-17", "world-sapling-9"], emoji: "🏔️", title: "سرزمین ایران",
    words: {
      find: "{name} را روی نقشه پیدا کن.",
      climate: "آب و هوای {city} بیشتر چطور است؟",
      names: { alborz: "رشته‌کوه البرز", zagros: "رشته‌کوه زاگرس", kavir: "دشت کویر", lut: "دشت لوت", damavand: "قله دماوند", sabalan: "کوه سبلان",
        karun: "رود کارون", zayandeh: "زاینده‌رود", sefid: "سفیدرود", aras: "رود ارس", urmia: "دریاچه ارومیه",
        caspian: "دریای خزر", "persian-gulf": "خلیج فارس", "oman-sea": "دریای عمان" },
      cities: { ardabil: "اردبیل", hamadan: "همدان", tabriz: "تبریز", rasht: "رشت", sari: "ساری", yazd: "یزد", kerman: "کرمان", "bandar-abbas": "بندرعباس", bushehr: "بوشهر", chabahar: "چابهار" },
      climates: { cold: "سرد و کوهستانی", wet: "معتدل و پرباران", dry: "گرم و خشک", humid: "گرم و مرطوب کنار دریا" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), pool = LANDFORMS.concat(SEAS);
      if (ctx.done("world-sapling-15")) pool = pool.concat(RIVERS);
      if (ctx.done("world-sapling-2")) pool = pool.concat(Object.keys(CLIMATE).map(function (c) { return "climate:" + c; }));
      var keys = keysFirst(ctx.again, pool, n, rng), cl = ctx.w("climates"), cities = ctx.w("cities");
      return keys.map(function (k) {
        if (k.indexOf("climate:") === 0) {
          var c = k.slice(8), opts = ["cold", "wet", "dry", "humid"].map(function (x) { return cl[x]; });
          return { type: "choose", key: k, prompt: ctx.w("climate", { city: cities[c] }), say: ctx.w("climate", { city: cities[c] }), options: opts, answer: cl[CLIMATE[c]] };
        }
        if (RIVERS.indexOf(k) !== -1) return findStep("rivers", k, ctx.w("find", { name: names[k] }));
        if (SEAS.indexOf(k) !== -1) return findStep("iran", k, ctx.w("find", { name: names[k] }), { layers: ["iran", "seas"] });
        return findStep("iran", k, ctx.w("find", { name: names[k] }), { layers: ["relief", "landforms", "seas"] });
      });
    }
  });

  /* «خانه‌های نقشه» — world-sapling-p3 (Grid and compass). A new picture map with a 4 × 3 grid each round
     (world-sapling-11): tap a square, say a thing's square, or go one square north-east (or another of the eight
     directions, world-sapling-10) from a thing and tap what is there. */
  var GRID_THINGS = [{ id: "tree", pic: "🌳" }, { id: "pond", pic: "⛲" }, { id: "slide", pic: "🛝" }, { id: "bench", pic: "🪑" },
    { id: "flowers", pic: "🌷" }, { id: "swing", pic: "🎠" }, { id: "kiosk", pic: "🍦" }, { id: "ball", pic: "⚽" }];
  var D8 = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0], ne: [1, -1], nw: [-1, -1], se: [1, 1], sw: [-1, 1] };
  B.PRACTICE.push({
    id: "world-sapling-p3", subject: "world", level: "sapling", objectives: ["world.sap.5"],
    needs: ["world-sapling-11"], lessons: ["world-sapling-11", "world-sapling-14"], emoji: "🔲", title: "خانه‌های نقشه",
    words: {
      tap: "روی خانهٔ «{cell}» بزن.",
      which: "{name} در کدام خانه است؟",
      go: "شمال بالای نقشه است. از {name} یک خانه به طرف {dir} برو. آنجا چیست؟ رویش بزن.",
      things: { tree: "درخت", pond: "حوض", slide: "سرسره", bench: "نیمکت", flowers: "باغچهٔ گل", swing: "چرخ‌وفلک", kiosk: "بستنی‌فروشی", ball: "توپ" },
      dirs: { n: "شمال", s: "جنوب", e: "شرق", w: "غرب", ne: "شمال شرقی", nw: "شمال غربی", se: "جنوب شرقی", sw: "جنوب غربی" }
    },
    make: function (rng, n, ctx) {
      var things = ctx.w("things"), dirs = ctx.w("dirs"), letters = (ctx.t("gridLetters") || "A,B,C,D").split(","), out = [];
      for (var i = 0; i < n; i++) {
        var cells = [];
        for (var r = 1; r <= 3; r++) for (var c = 1; c <= 4; c++) cells.push([c, r]);
        var used = rng.sample(cells, 6), ts = rng.sample(GRID_THINGS, 6);
        var places = ts.map(function (t, j) { return { id: t.id, name: things[t.id], pic: t.pic, at: [(used[j][0] - 0.5) * 100, (used[j][1] - 0.5) * 100] }; });
        var map = { bg: "grass", shapes: [{ rect: [20, 140, 360, 24], r: 12, kind: "sand" }, { rect: [190, 20, 24, 260], kind: "sand" }], places: places };
        var kind = i % 3, task, key;
        if (kind === 0) {
          var cell = rng.pick(cells);
          key = "cell:" + cell.join("");
          task = { cell: cell, prompt: ctx.w("tap", { cell: letters[cell[0] - 1] + " " + cell[1] }) };
        } else if (kind === 1) {
          var t = rng.int(0, 5);
          key = "of:" + ts[t].id;
          task = { cellOf: ts[t].id, prompt: ctx.w("which", { name: things[ts[t].id] }) };
        } else {
          // a thing and a direction whose next square holds another thing
          var found = null;
          rng.shuffle([0, 1, 2, 3, 4, 5]).forEach(function (a) {
            if (found) return;
            rng.shuffle(Object.keys(D8)).forEach(function (d) {
              if (found) return;
              var to = [used[a][0] + D8[d][0], used[a][1] + D8[d][1]];
              var b = used.findIndex(function (u) { return u[0] === to[0] && u[1] === to[1]; });
              if (b !== -1) found = { a: a, b: b, d: d };
            });
          });
          if (!found) { i--; continue; }
          key = "go:" + found.d;
          task = { find: ts[found.b].id, prompt: ctx.w("go", { name: things[ts[found.a].id], dir: dirs[found.d] }) };
        }
        task.say = task.prompt;
        out.push({ type: "map", key: key, map: map, grid: [4, 3], tasks: [task] });
      }
      return out;
    }
  });

  /* «مقیاس» — world-sapling-p4 (Scale). How far between two places on the park map with its scale bar
     (world-sapling-12), and which of two places is further from a third. */
  var PARK = { gate: [200, 278], tree: [90, 70], pond: [312, 82], slide: [315, 224], bench: [142, 92], flowers: [106, 228] };
  B.PRACTICE.push({
    id: "world-sapling-p4", subject: "world", level: "sapling", objectives: ["world.sap.6"],
    needs: ["world-sapling-12"], lessons: ["world-sapling-12", "world-sapling-14", "world-sapling-40"], emoji: "📏", title: "مقیاس",
    words: {
      how: "از {a} تا {b} حدوداً چند متر است؟",
      far: "کدام از {a} دورتر است: {b} یا {c}؟ با خط‌کش نقشه اندازه بگیر و رویش بزن.",
      metre: "متر",
      places: { gate: "در پارک", tree: "درخت بزرگ", pond: "حوض", slide: "سرسره", bench: "نیمکت", flowers: "باغچهٔ گل" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("places"), ids = Object.keys(PARK), out = [], seen = {};
      var scale = { units: 40, value: 10, unit: ctx.w("metre"), en: ctx.w("metre") };
      for (var i = 0; out.length < n && i < 40; i++) {
        var three = rng.sample(ids, 3);
        if (i % 2 === 0) {
          var key = "d:" + three.slice(0, 2).sort().join("-");
          if (seen[key] || dist(PARK[three[0]], PARK[three[1]]) < 80) continue;
          seen[key] = true;
          var p = ctx.w("how", { a: names[three[0]], b: names[three[1]] });
          out.push({ type: "map", key: key, map: "park", scale: scale, tasks: [{ distance: [three[0], three[1]], prompt: p, say: p }] });
        } else {
          var db = dist(PARK[three[0]], PARK[three[1]]), dc = dist(PARK[three[0]], PARK[three[2]]);
          if (Math.max(db, dc) / Math.min(db, dc) < 1.4) continue;
          var k2 = "f:" + three[0] + ":" + three.slice(1).sort().join("-");
          if (seen[k2]) continue;
          seen[k2] = true;
          var q = ctx.w("far", { a: names[three[0]], b: names[three[1]], c: names[three[2]] });
          out.push({ type: "map", key: k2, map: "park", scale: scale, tasks: [{ find: db > dc ? three[1] : three[2], prompt: q, say: q }] });
        }
      }
      return out;
    }
  });

  /* «دنیا و همسایه‌ها» — world-sapling-p5 (World and neighbours). Find a continent or an ocean (world-sapling-7), the
     equator (world-sapling-36), a neighbour of Iran (world-sapling-8); neighbour ↔ capital; flags of the neighbours
     (world-sapling-38), Iran's flag the one the parent chose. The flags of Oman and Afghanistan are not used. */
  var NB = ["tr", "iq", "af", "pk", "tm", "am", "az", "kw", "sa", "ae", "qa", "bh", "om", "kz", "ru"];
  var CAPS = ["iq", "am", "az", "tm", "pk", "kw", "qa", "bh", "sa", "ae"];
  var FLAGS = ["tr", "iq", "pk", "tm", "am", "az", "kw", "sa", "ae", "qa"];
  B.PRACTICE.push({
    id: "world-sapling-p5", subject: "world", level: "sapling", objectives: ["world.sap.7", "world.sap.8"],
    needs: ["world-sapling-7"], lessons: ["world-sapling-7", "world-sapling-36", "world-sapling-8", "world-sapling-38"], emoji: "🌐", title: "دنیا و همسایه‌ها",
    words: {
      find: "{name} را روی نقشه پیدا کن.",
      equator: "خط استوا را پیدا کن.",
      nb: "{name}، همسایهٔ ایران، کجاست؟",
      capsPrompt: "هر کشور، پایتختش", capsSay: "هر کشور را با پایتختش جفت کن.",
      flagsPrompt: "هر پرچم، کدام کشور؟", flagsSay: "هر پرچم را با کشورش جفت کن.",
      iran: "ایران", flagOf: "پرچم {name}",
      world: { asia: "آسیا", europe: "اروپا", africa: "آفریقا", "north-america": "آمریکای شمالی", "south-america": "آمریکای جنوبی", oceania: "اقیانوسیه", antarctica: "جنوبگان",
        pacific: "اقیانوس آرام", atlantic: "اقیانوس اطلس", indian: "اقیانوس هند", arctic: "اقیانوس منجمد شمالی", southern: "اقیانوس منجمد جنوبی" },
      countries: { tr: "ترکیه", iq: "عراق", af: "افغانستان", pk: "پاکستان", tm: "ترکمنستان", am: "ارمنستان", az: "جمهوری آذربایجان", kw: "کویت", sa: "عربستان سعودی",
        ae: "امارات متحده عربی", qa: "قطر", bh: "بحرین", om: "عمان", kz: "قزاقستان", ru: "روسیه" },
      capitals: { iq: "بغداد", am: "ایروان", az: "باکو", tm: "عشق‌آباد", pk: "اسلام‌آباد", kw: "کویت", qa: "دوحه", bh: "منامه", sa: "ریاض", ae: "ابوظبی" }
    },
    make: function (rng, n, ctx) {
      var world = ctx.w("world"), cn = ctx.w("countries"), caps = ctx.w("capitals");
      var pool = CONTS.concat(OCEANS);
      if (ctx.done("world-sapling-36")) pool.push("equator");
      if (ctx.done("world-sapling-8")) pool = pool.concat(NB.map(function (c) { return "nb:" + c; }), ["caps", "caps"]);
      if (ctx.done("world-sapling-38")) pool = pool.concat(["flags", "flags"]);
      var keys = keysFirst(ctx.again, pool, n, rng);
      return keys.map(function (k) {
        if (k === "equator") return findStep("world", "equator", ctx.w("equator"), { layers: ["continents", "oceans", "equator"] });
        if (k.indexOf("nb:") === 0) {
          var c = k.slice(3);
          return { type: "map", key: k, map: "region", countries: "neighbours", layers: ["countries", "seas"], tasks: [{ find: c, prompt: ctx.w("nb", { name: cn[c] }) }] };
        }
        if (k === "caps") return { type: "pairs", key: k, prompt: ctx.w("capsPrompt"), say: ctx.w("capsSay"),
          pairs: rng.sample(CAPS, 4).map(function (c) { return [{ label: cn[c], say: cn[c] }, { label: caps[c], say: caps[c] }]; }) };
        if (k === "flags") {
          var fl = rng.sample(FLAGS, 3).map(function (c) { return [{ flag: c, say: ctx.w("flagOf", { name: cn[c] }) }, { label: cn[c], say: cn[c] }]; });
          fl.splice(rng.int(0, 3), 0, [{ flag: "iran", say: ctx.w("flagOf", { name: ctx.w("iran") }) }, { label: ctx.w("iran"), say: ctx.w("iran") }]);
          return { type: "pairs", key: k, hidden: true, prompt: ctx.w("flagsPrompt"), say: ctx.w("flagsSay"), pairs: fl };
        }
        return findStep("world", k, ctx.w("find", { name: world[k] }), { layers: ["continents", "oceans"] });
      });
    }
  });

  /* «خط زمان» — world-sapling-p6 (Timeline ordering, first). Four to five pictures to place on now / when grandparents
     were children / long ago / very long ago (world-sapling-29); caves and first farmers come after world-sapling-30
     and world-sapling-31. */
  var TL = [{ id: "phone", pic: "📱", band: 3 }, { id: "metro", pic: "🚇", band: 3 }, { id: "laptop", pic: "💻", band: 3 },
    { id: "radio", pic: "📻", band: 2 }, { id: "phoneOld", pic: "☎️", band: 2 }, { id: "bw", pic: "📺", band: 2 },
    { id: "caravan", pic: "🐫", band: 1 }, { id: "train", pic: "🚂", band: 1 }, { id: "scribe", pic: "✍️", band: 1 }, { id: "chapar", pic: "🏇", band: 1 },
    { id: "cave", pic: "🔥", band: 0, lesson: "world-sapling-30" }, { id: "stone", pic: "🪨", band: 0, lesson: "world-sapling-30" },
    { id: "wheat", pic: "🌾", band: 0, lesson: "world-sapling-31" }, { id: "goat", pic: "🐐", band: 0, lesson: "world-sapling-31" }];
  B.PRACTICE.push({
    id: "world-sapling-p6", subject: "world", level: "sapling", objectives: ["world.sap.14", "world.sap.15"],
    needs: ["world-sapling-29"], lessons: ["world-sapling-29", "world-sapling-46", "world-sapling-30", "world-sapling-31", "world-sapling-32", "world-sapling-33", "world-sapling-48"], emoji: "⏳", title: "خط زمان",
    words: {
      prompt: "هر عکس را سر جایش روی خط زمان بگذار.",
      bands: ["خیلی خیلی قدیم", "قدیم", "وقتی پدربزرگ و مادربزرگ بچه بودند", "امروز"],
      items: { phone: "تلفن همراه", metro: "مترو", laptop: "رایانه", radio: "رادیوی قدیمی", phoneOld: "تلفن سیم‌دار", bw: "تلویزیون سیاه و سفید",
        caravan: "کاروان شتر", train: "ماشین دودی", scribe: "کتاب دست‌نویس", chapar: "چاپار",
        cave: "آتش در غار", stone: "ابزار سنگی", wheat: "اولین مزرعه‌های گندم", goat: "اولین بزهای اهلی" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("items"), bands = ctx.w("bands"), pics = ["🪨", "🐫", "👵", "🧒"], out = [];
      var bank = TL.filter(function (x) { return !x.lesson || ctx.done(x.lesson); });
      var hasOld = bank.some(function (x) { return x.band === 0; });
      var useBands = hasOld ? [0, 1, 2, 3] : [1, 2, 3];
      for (var i = 0; i < Math.min(n, 4); i++) {
        var items = useBands.map(function (b) { return rng.pick(bank.filter(function (x) { return x.band === b; })); });
        if (rng() < 0.5) { var extra = rng.pick(bank.filter(function (x) { return items.indexOf(x) === -1; })); items.push(extra); }
        out.push({ type: "timeline", key: "tl:" + items.map(function (x) { return x.id; }).sort().join(","), prompt: ctx.w("prompt"), say: ctx.w("prompt"),
          bands: useBands.map(function (b) { return { label: bands[b], pic: pics[b] }; }),
          items: rng.shuffle(items).map(function (x) { return { pic: x.pic, say: names[x.id], band: useBands.indexOf(x.band) }; }) });
      }
      return out;
    }
  });

  /* «میراث و هنر» — world-sapling-p7 (Heritage and crafts match). Craft ↔ city (world-sapling-6); World Heritage site ↔
     city or region (world-sapling-39, world-sapling-9). */
  var CRAFTS = [{ id: "carpet", a: "🧶", b: "📍" }, { id: "tile", a: "🟦", b: "📍" }, { id: "qalamkar", a: "🖌️", b: "📍" }, { id: "khatam", a: "⭐", b: "📍" }, { id: "pottery", a: "🏺", b: "📍" }];
  var SITES = [{ id: "bazaar", a: "🏪", b: "📍" }, { id: "eram", a: "🌳", b: "📍" }, { id: "yazd", a: "🏘️", b: "📍" }, { id: "lut", a: "🏜️", b: "📍" },
    { id: "shushtar", a: "💧", b: "📍" }, { id: "hyrcanian", a: "🌲", b: "📍" }];
  B.PRACTICE.push({
    id: "world-sapling-p7", subject: "world", level: "sapling", objectives: ["world.sap.12", "world.sap.13"],
    needs: ["world-sapling-6"], lessons: ["world-sapling-6", "world-sapling-22", "world-sapling-39", "world-sapling-9"], emoji: "🏛️", title: "میراث و هنر",
    words: {
      craftsPrompt: "هر هنر، کدام شهر؟", craftsSay: "هر هنر دستی را با شهرش جفت کن.",
      craftsA: { carpet: "فرش", tile: "کاشی آبی", qalamkar: "قلمکار", khatam: "خاتم", pottery: "سفال فیروزه‌ای" },
      craftsB: { carpet: "تبریز", tile: "اصفهان", qalamkar: "اصفهان", khatam: "شیراز", pottery: "لالجین همدان" },
      sitesPrompt: "هر جای میراث جهانی، کجا؟", sitesSay: "هر جای میراث جهانی را با شهر یا استانش جفت کن.",
      sitesA: { bazaar: "بازار سرپوشیده", eram: "باغ ارم", yazd: "شهر خشتی با بادگیر", lut: "کویر لوت", shushtar: "آبشارها و آسیاب‌های قدیمی", hyrcanian: "جنگل‌های هیرکانی" },
      sitesB: { bazaar: "تبریز", eram: "شیراز", yazd: "یزد", lut: "کرمان", shushtar: "شوشتر", hyrcanian: "گیلان و مازندران" }
    },
    make: function (rng, n, ctx) {
      var kinds = ["crafts"], out = [];
      if (ctx.done("world-sapling-39")) kinds.push("sites");
      for (var i = 0; i < Math.min(n, 4); i++) {
        var k = kinds[i % kinds.length];
        // tile and qalamkar are both Isfahan: never in the same set
        var bank = k === "crafts" ? (rng() < 0.5 ? CRAFTS.filter(function (x) { return x.id !== "tile"; }) : CRAFTS.filter(function (x) { return x.id !== "qalamkar"; })) : SITES;
        var s = pairsStep(rng, ctx, k, bank, 3, i >= kinds.length);
        s.pairs.forEach(function (p) { delete p[1].pic; });
        s.key = k + ":" + i;
        out.push(s);
      }
      return out;
    }
  });

  /* «بازار» — world-sapling-p8 (Market sort). Goods or services, producer or consumer (world-sapling-26); with a
     budget, which two things can you buy together (world-sapling-27). Prices in thousands of toman. */
  var GS = [{ id: "bread", pic: "🫓", basket: "goods" }, { id: "shoes", pic: "👟", basket: "goods" }, { id: "carpet", pic: "🧶", basket: "goods" },
    { id: "cheese", pic: "🧀", basket: "goods" }, { id: "haircut", pic: "✂️", basket: "service" }, { id: "doctor", pic: "🩺", basket: "service" },
    { id: "taxi", pic: "🚕", basket: "service" }, { id: "teach", pic: "🧑‍🏫", basket: "service" }];
  var PC = [{ id: "baker", role: "producer" }, { id: "farmer", role: "producer" }, { id: "carpenter", role: "producer" },
    { id: "buyer", role: "consumer" }, { id: "eater", role: "consumer" }, { id: "reader", role: "consumer" }];
  var SHOP = [{ id: "pencil", price: 2 }, { id: "notebook", price: 3 }, { id: "ball", price: 6 }, { id: "book", price: 5 }, { id: "juice", price: 4 }, { id: "kite", price: 7 }];
  B.PRACTICE.push({
    id: "world-sapling-p8", subject: "world", level: "sapling", objectives: ["world.sap.11", "world.sap.23"],
    needs: ["world-sapling-26"], lessons: ["world-sapling-26", "world-sapling-44", "world-sapling-5", "world-sapling-45", "world-sapling-27", "world-sapling-28"], emoji: "🏪", title: "بازار",
    words: {
      gsPrompt: "کالا یا خدمت؟", gsSay: "هر کدام را به سبدش ببر: کالا، یا خدمت.",
      gsBaskets: { goods: "کالا", service: "خدمت" },
      gsItems: { bread: "نان", shoes: "کفش", carpet: "فرش", cheese: "پنیر", haircut: "کوتاه کردن مو", doctor: "معاینهٔ دکتر", taxi: "رساندن با تاکسی", teach: "درس دادن" },
      role: "{who}: تولیدکننده است یا مصرف‌کننده؟",
      roles: { producer: "تولیدکننده", consumer: "مصرف‌کننده" },
      who: { baker: "نانوایی که نان می‌پزد", farmer: "کشاورزی که گندم می‌کارد", carpenter: "نجاری که صندلی می‌سازد",
        buyer: "کیان که نان می‌خرد", eater: "سارا که سیب می‌خورد", reader: "نیما که کتاب امانت می‌گیرد" },
      budget: "{money} هزار تومان داری. کدام دو تا را با هم می‌توانی بخری؟",
      two: "{a} و {b} ({sum} هزار تومان)",
      shop: { pencil: "مداد", notebook: "دفتر", ball: "توپ", book: "کتاب", juice: "آبمیوه", kite: "بادبادک" }
    },
    make: function (rng, n, ctx) {
      var out = [], roles = ctx.w("roles"), who = ctx.w("who"), shop = ctx.w("shop"), seen = {};
      for (var i = 0; out.length < n && i < 40; i++) {
        var kind = ["gs", "role", "budget"][i % (ctx.done("world-sapling-27") ? 3 : 2)];
        if (kind === "gs") {
          if (seen.gs) continue;
          seen.gs = true;
          out.push(sortStep(rng, ctx, "gs", GS, [{ value: "goods", pic: "🛍️" }, { value: "service", pic: "🤝" }], 2));
        } else if (kind === "role") {
          var w = rng.pick(PC);
          if (seen["r:" + w.id]) continue;
          seen["r:" + w.id] = true;
          out.push({ type: "choose", key: "r:" + w.id, prompt: ctx.w("role", { who: who[w.id] }), say: ctx.w("role", { who: who[w.id] }),
            options: [roles.producer, roles.consumer], answer: roles[w.role] });
        } else {
          var money = rng.int(8, 11), pairs = [];
          SHOP.forEach(function (a, x) { SHOP.forEach(function (b, y) { if (x < y) pairs.push([a, b]); }); });
          var ok = pairs.filter(function (p) { return p[0].price + p[1].price <= money; }), no = pairs.filter(function (p) { return p[0].price + p[1].price > money; });
          if (!ok.length || no.length < 2) continue;
          var good = rng.pick(ok), bad = rng.sample(no, 2), key = "b:" + money + good[0].id + good[1].id;
          if (seen[key]) continue;
          seen[key] = true;
          var label = function (p) { return ctx.w("two", { a: shop[p[0].id], b: shop[p[1].id], sum: p[0].price + p[1].price }); };
          var opts = [good].concat(bad).map(label);
          out.push({ type: "choose", key: key, prompt: ctx.w("budget", { money: money }), say: ctx.w("budget", { money: money }), options: rng.shuffle(opts), answer: opts[0] });
        }
      }
      return out;
    }
  });
})();

/* The lessons whose sets each lesson-review generator is in: the lessons that have that kind of content themselves. */
B.WORLD_REVIEW_LESSONS = {
  "world-seed-p5": ["world-seed-11", "world-seed-3", "world-seed-13", "world-seed-14", "world-seed-5", "world-seed-7", "world-seed-8", "world-seed-19", "world-seed-22", "world-seed-24"],
  "world-seed-p6": ["world-seed-11", "world-seed-3", "world-seed-13", "world-seed-14", "world-seed-5", "world-seed-7", "world-seed-8", "world-seed-19", "world-seed-22", "world-seed-24"],
  "world-seed-p7": ["world-seed-11", "world-seed-13", "world-seed-14", "world-seed-5", "world-seed-7", "world-seed-19", "world-seed-22", "world-seed-24"],
  "world-seed-p8": ["world-seed-1", "world-seed-3", "world-seed-5", "world-seed-15", "world-seed-16", "world-seed-7", "world-seed-17", "world-seed-8", "world-seed-19", "world-seed-21", "world-seed-22", "world-seed-24"],
  "world-seed-p9": ["world-seed-1", "world-seed-3", "world-seed-5", "world-seed-15", "world-seed-16", "world-seed-7", "world-seed-17", "world-seed-8", "world-seed-19", "world-seed-21", "world-seed-22", "world-seed-24"],
  "world-seed-p10": ["world-seed-9", "world-seed-10", "world-seed-4", "world-seed-8", "world-seed-23"],
  "world-seed-p11": ["world-seed-12", "world-seed-2", "world-seed-4", "world-seed-18", "world-seed-20", "world-seed-24"],
  "world-seed-p12": ["world-seed-10", "world-seed-12", "world-seed-2", "world-seed-3", "world-seed-13", "world-seed-5", "world-seed-18", "world-seed-20"],
  "world-sprout-p9": ["world-sprout-11", "world-sprout-12", "world-sprout-1", "world-sprout-13", "world-sprout-18", "world-sprout-8", "world-sprout-19", "world-sprout-21", "world-sprout-22", "world-sprout-23", "world-sprout-24", "world-sprout-26", "world-sprout-27", "world-sprout-28", "world-sprout-29", "world-sprout-30", "world-sprout-31", "world-sprout-33", "world-sprout-34"],
  "world-sprout-p10": ["world-sprout-11", "world-sprout-12", "world-sprout-1", "world-sprout-13", "world-sprout-18", "world-sprout-8", "world-sprout-19", "world-sprout-21", "world-sprout-22", "world-sprout-23", "world-sprout-24", "world-sprout-26", "world-sprout-27", "world-sprout-28", "world-sprout-29", "world-sprout-30", "world-sprout-31", "world-sprout-33", "world-sprout-34"],
  "world-sprout-p11": ["world-sprout-11", "world-sprout-12", "world-sprout-18", "world-sprout-19", "world-sprout-21", "world-sprout-23", "world-sprout-26", "world-sprout-28", "world-sprout-29", "world-sprout-33"],
  "world-sprout-p12": ["world-sprout-12", "world-sprout-1", "world-sprout-14", "world-sprout-2", "world-sprout-15", "world-sprout-5", "world-sprout-6", "world-sprout-36", "world-sprout-7", "world-sprout-8", "world-sprout-22", "world-sprout-25", "world-sprout-28", "world-sprout-32", "world-sprout-33", "world-sprout-34"],
  "world-sprout-p13": ["world-sprout-12", "world-sprout-1", "world-sprout-14", "world-sprout-2", "world-sprout-15", "world-sprout-5", "world-sprout-6", "world-sprout-36", "world-sprout-7", "world-sprout-8", "world-sprout-22", "world-sprout-25", "world-sprout-28", "world-sprout-32", "world-sprout-34"],
  "world-sprout-p14": ["world-sprout-9", "world-sprout-10", "world-sprout-12", "world-sprout-16", "world-sprout-5", "world-sprout-20", "world-sprout-22", "world-sprout-25", "world-sprout-28", "world-sprout-29", "world-sprout-30", "world-sprout-31", "world-sprout-32", "world-sprout-33"],
  "world-sprout-p15": ["world-sprout-2", "world-sprout-15", "world-sprout-16", "world-sprout-35", "world-sprout-4", "world-sprout-17", "world-sprout-18", "world-sprout-7", "world-sprout-8", "world-sprout-34"],
  "world-sprout-p16": ["world-sprout-10", "world-sprout-2", "world-sprout-3", "world-sprout-17", "world-sprout-5", "world-sprout-23"],
  "world-sapling-p9": ["world-sapling-13", "world-sapling-14", "world-sapling-2", "world-sapling-17", "world-sapling-18", "world-sapling-19", "world-sapling-22", "world-sapling-25", "world-sapling-30", "world-sapling-34", "world-sapling-47", "world-sapling-48", "world-sapling-26", "world-sapling-44", "world-sapling-5", "world-sapling-28", "world-sapling-36", "world-sapling-37", "world-sapling-38", "world-sapling-39", "world-sapling-9"],
  "world-sapling-p10": ["world-sapling-13", "world-sapling-14", "world-sapling-2", "world-sapling-17", "world-sapling-18", "world-sapling-19", "world-sapling-22", "world-sapling-25", "world-sapling-30", "world-sapling-34", "world-sapling-47", "world-sapling-48", "world-sapling-26", "world-sapling-44", "world-sapling-5", "world-sapling-28", "world-sapling-36", "world-sapling-37", "world-sapling-38", "world-sapling-39", "world-sapling-9"],
  "world-sapling-p11": ["world-sapling-13", "world-sapling-17", "world-sapling-18", "world-sapling-19", "world-sapling-22", "world-sapling-25", "world-sapling-30", "world-sapling-34", "world-sapling-47", "world-sapling-48", "world-sapling-26", "world-sapling-44", "world-sapling-5", "world-sapling-28", "world-sapling-36", "world-sapling-37", "world-sapling-39", "world-sapling-9"],
  "world-sapling-p12": ["world-sapling-14", "world-sapling-15", "world-sapling-3", "world-sapling-16", "world-sapling-17", "world-sapling-4", "world-sapling-19", "world-sapling-20", "world-sapling-43", "world-sapling-6", "world-sapling-22", "world-sapling-23", "world-sapling-25", "world-sapling-32", "world-sapling-33", "world-sapling-47", "world-sapling-48", "world-sapling-26", "world-sapling-44", "world-sapling-28", "world-sapling-7", "world-sapling-8", "world-sapling-38", "world-sapling-9"],
  "world-sapling-p13": ["world-sapling-14", "world-sapling-15", "world-sapling-3", "world-sapling-16", "world-sapling-17", "world-sapling-4", "world-sapling-19", "world-sapling-20", "world-sapling-43", "world-sapling-6", "world-sapling-22", "world-sapling-23", "world-sapling-25", "world-sapling-32", "world-sapling-33", "world-sapling-47", "world-sapling-48", "world-sapling-26", "world-sapling-44", "world-sapling-28", "world-sapling-7", "world-sapling-8", "world-sapling-38", "world-sapling-9"],
  "world-sapling-p14": ["world-sapling-4", "world-sapling-18", "world-sapling-19", "world-sapling-21", "world-sapling-24", "world-sapling-25", "world-sapling-29", "world-sapling-46", "world-sapling-31", "world-sapling-32", "world-sapling-33", "world-sapling-35", "world-sapling-48", "world-sapling-5", "world-sapling-45", "world-sapling-28", "world-sapling-9"],
  "world-sapling-p15": ["world-sapling-10", "world-sapling-11", "world-sapling-12", "world-sapling-13", "world-sapling-14", "world-sapling-1", "world-sapling-40", "world-sapling-15", "world-sapling-2", "world-sapling-41", "world-sapling-42", "world-sapling-3", "world-sapling-16", "world-sapling-17", "world-sapling-22", "world-sapling-44", "world-sapling-5", "world-sapling-7", "world-sapling-36", "world-sapling-8", "world-sapling-37", "world-sapling-38", "world-sapling-9"],
  "world-sapling-p16": ["world-sapling-10", "world-sapling-11", "world-sapling-12", "world-sapling-40", "world-sapling-41", "world-sapling-42", "world-sapling-3", "world-sapling-4", "world-sapling-18", "world-sapling-20", "world-sapling-43", "world-sapling-21", "world-sapling-6", "world-sapling-22", "world-sapling-23", "world-sapling-24", "world-sapling-29", "world-sapling-46", "world-sapling-30", "world-sapling-31", "world-sapling-32", "world-sapling-34", "world-sapling-47", "world-sapling-35", "world-sapling-26", "world-sapling-45", "world-sapling-27", "world-sapling-7", "world-sapling-36", "world-sapling-8", "world-sapling-37", "world-sapling-38", "world-sapling-39"]
};

/* ---------- Lesson review: the lesson's own content, asked again in other ways ----------
   For each garden, eight generators that make items from the lessons the child has just done: the lesson whose set
   this is (the last one done) first, then the two before it in the same garden. Their words are the lessons' own
   (in English, the lessons' English versions); only the questions around them are the generators' words.
   sort: sort again with other items · which: which basket does this go in? · odd: which one is different? ·
   pairs: find the pairs again (sometimes as a memory game) · goes: what goes with this? · order: put in order again
   (or on the timeline again) · find: find it on the map again · ask: answer the lesson's question again. */
(function () {
  var GARDENS = {
    seed: { first: "world-seed-1", from: 5, objectives: ["world.seed.1", "world.seed.2", "world.seed.3", "world.seed.4", "world.seed.5", "world.seed.6", "world.seed.7", "world.seed.8",
      "world.seed.9", "world.seed.10", "world.seed.11", "world.seed.12", "world.seed.13", "world.seed.14", "world.seed.15", "world.seed.16"] },
    sprout: { first: "world-sprout-9", from: 9, objectives: ["world.spr.1", "world.spr.2", "world.spr.3", "world.spr.4", "world.spr.5", "world.spr.6", "world.spr.7", "world.spr.8",
      "world.spr.9", "world.spr.10", "world.spr.11", "world.spr.12", "world.spr.13", "world.spr.14", "world.spr.15", "world.spr.16", "world.spr.17", "world.spr.18",
      "world.spr.19", "world.spr.20", "world.spr.21", "world.spr.22"] },
    sapling: { first: "world-sapling-10", from: 9, objectives: ["world.sap.1", "world.sap.2", "world.sap.3", "world.sap.4", "world.sap.5", "world.sap.6", "world.sap.7", "world.sap.8",
      "world.sap.9", "world.sap.10", "world.sap.11", "world.sap.12", "world.sap.13", "world.sap.14", "world.sap.15", "world.sap.16", "world.sap.17", "world.sap.18",
      "world.sap.19", "world.sap.20", "world.sap.21", "world.sap.22", "world.sap.23", "world.sap.24"] }
  };
  // The lessons to take items from: the set's lesson, then the two before it in the garden (in the session's language).
  function recent(ctx, level) {
    var ids = ctx.doneIds.filter(function (id) { var l = B.lessonById(id); return l && l.subject === "world" && l.level === level; }).slice(-3).reverse();
    return ids.map(function (id) {
      var l = B.lessonById(id);
      return ctx.lang === "en" && B.englishLesson && B.hasEnglish && B.hasEnglish(l) ? B.englishLesson(l) : l;
    });
  }
  // Steps of a kind from those lessons: [{ l, i, s }], the set's own lesson first.
  function stepsOf(ctx, level, test) {
    var out = [];
    recent(ctx, level).forEach(function (l) { l.steps.forEach(function (s, i) { if (test(s)) out.push({ l: l, i: i, s: s }); }); });
    return out;
  }
  function nameOf(c) { return c ? (c.label || c.say || c.pic || "") : ""; }
  // Takes sources in turn (the set's own lesson first), at most n items, skipping repeats.
  function take(rng, srcs, n, one) {
    var out = [], seen = {};
    for (var i = 0; out.length < n && i < n * 4 && srcs.length; i++) {
      var src = srcs[i % srcs.length], step = one(src, rng);
      if (!step || seen[step.key]) continue;
      seen[step.key] = true;
      out.push(step);
    }
    return out;
  }
  function basketItems(s) {
    var by = {};
    (s.items || []).forEach(function (it) { (by[it.basket] = by[it.basket] || []).push(it); });
    return by;
  }

  var KINDS = {
    sort: { emoji: "🧺", title: "دوباره دسته کن", needType: function (s) { return s.type === "sort" && (s.items || []).length >= 4 && (s.baskets || []).length >= 2; },
      make: function (src, rng, ctx) {
        var s = src.s, by = basketItems(s), items = [];
        s.baskets.forEach(function (b) { items = items.concat(rng.sample(by[b.value] || [], Math.min(3, (by[b.value] || []).length))); });
        if (items.length < 3) return null;
        return { type: "sort", key: src.l.id + ":" + src.i, prompt: ctx.w("sort"), say: s.say || ctx.w("sort"), baskets: s.baskets, items: rng.shuffle(items) };
      } },
    which: { emoji: "🗂️", title: "به کدام دسته؟", needType: function (s) { return s.type === "sort" && (s.baskets || []).length >= 2 && (s.baskets || []).every(function (b) { return b.label; }); },
      make: function (src, rng, ctx) {
        var s = src.s, it = rng.pick(s.items), b = s.baskets.filter(function (x) { return x.value === it.basket; })[0];
        if (!b) return null;
        var q = ctx.w("which", { name: nameOf(it) }), step = { type: "choose", key: src.l.id + ":" + src.i + ":" + nameOf(it), prompt: q, say: q,
          options: rng.shuffle(s.baskets.map(function (x) { return x.label; })), answer: b.label };
        if (it.pic) step.show = it.pic;
        return step;
      } },
    odd: { emoji: "🔍", title: "کدام فرق دارد؟", needType: function (s) {
        if (s.type !== "sort") return false;
        var by = basketItems(s), keys = Object.keys(by);
        return keys.length >= 2 && keys.some(function (k) { return by[k].length >= 3; });
      },
      make: function (src, rng, ctx) {
        var by = basketItems(src.s), big = rng.pick(Object.keys(by).filter(function (k) { return by[k].length >= 3; }));
        var other = rng.pick(Object.keys(by).filter(function (k) { return k !== big; }));
        var same = rng.sample(by[big], 3), odd = rng.pick(by[other]);
        var opts = same.concat([odd]).map(nameOf);
        if (opts.filter(function (o, i) { return opts.indexOf(o) === i; }).length < 4) return null;
        return { type: "choose", key: src.l.id + ":" + src.i + ":" + nameOf(odd), prompt: ctx.w("odd"), say: ctx.w("odd"), options: rng.shuffle(opts), answer: nameOf(odd) };
      } },
    pairs: { emoji: "🃏", title: "جفت‌ها را پیدا کن", needType: function (s) { return s.type === "pairs" && (s.pairs || []).length >= 3; },
      make: function (src, rng, ctx) {
        var s = src.s, k = Math.min(4, s.pairs.length), hidden = rng() < 0.5;
        var step = { type: "pairs", key: src.l.id + ":" + src.i, prompt: ctx.w(hidden ? "pairsHidden" : "pairs"), say: s.say || ctx.w("pairs"), pairs: rng.sample(s.pairs, k) };
        if (hidden) step.hidden = true;
        return step;
      } },
    goes: { emoji: "🔗", title: "با کدام جفت می‌شود؟", needType: function (s) {
        return s.type === "pairs" && (s.pairs || []).length >= 3 && s.pairs.every(function (p) { return nameOf(p[1]) && !p[1].flag; });
      },
      make: function (src, rng, ctx) {
        var s = src.s, three = rng.sample(s.pairs, 3), p = three[0], names = three.map(function (x) { return nameOf(x[1]); });
        if (names.filter(function (o, i) { return names.indexOf(o) === i; }).length < 3) return null;
        var left = p[0], q = ctx.w("goes", { name: left.flag ? ctx.w("thisFlag") : nameOf(left) });
        var step = { type: "choose", key: src.l.id + ":" + src.i + ":" + nameOf(left), prompt: q, say: q, options: rng.shuffle(names), answer: names[0] };
        if (left.pic) step.show = left.pic;
        return step;
      } },
    order: { emoji: "🔢", title: "دوباره به ترتیب", needType: function (s) { return (s.type === "order" && (s.items || []).length >= 3) || (s.type === "timeline" && (s.items || []).length >= 3 && s.bands); },
      make: function (src, rng, ctx) {
        var s = src.s;
        if (s.type === "timeline") {
          var it = rng.sample(s.items, Math.min(s.items.length, rng.int(3, 4)));
          return { type: "timeline", key: src.l.id + ":" + src.i + ":" + it.length, prompt: ctx.w("timeline"), say: s.say || ctx.w("timeline"), bands: s.bands, items: it };
        }
        var k = Math.min(s.items.length, rng.int(3, 5)), pick = rng.sample(s.items.map(function (x, j) { return j; }), k).sort(function (a, b) { return a - b; });
        return { type: "order", key: src.l.id + ":" + src.i + ":" + pick.join(""), prompt: ctx.w("order"), say: s.say || s.prompt || ctx.w("order"), numbered: true,
          items: pick.map(function (j) { return s.items[j]; }) };
      } },
    find: { emoji: "📍", title: "دوباره روی نقشه", needType: function (s) {
        return s.type === "map" && (s.tasks || []).some(function (t) { return t.find || t.route || t.cell || t.cellOf || t.distance; });
      },
      make: function (src, rng) {
        var s = src.s, ts = s.tasks.filter(function (t) { return t.find || t.route || t.cell || t.cellOf || t.distance; }), j = rng.int(0, ts.length - 1);
        var step = {};
        Object.keys(s).forEach(function (k) { if (k !== "tasks" && k !== "prompt" && k !== "say") step[k] = s[k]; });
        step.key = src.l.id + ":" + src.i + ":" + j;
        step.tasks = [ts[j]];
        return step;
      } },
    ask: { emoji: "❓", title: "دوباره جواب بده", needType: function (s) { return (s.type === "choose" && (s.options || []).length >= 2 && s.answer != null) || (s.type === "passage" && s.answer != null); },
      make: function (src, rng) {
        var s = src.s, step = {};
        Object.keys(s).forEach(function (k) { step[k] = s[k]; });
        step.options = rng.shuffle(s.options);
        step.key = src.l.id + ":" + src.i;
        return step;
      } }
  };
  var WORDS = {
    sort: "دوباره دسته کن: هر کدام را به سبدش ببر.",
    which: "«{name}» به کدام دسته می‌رود؟",
    odd: "کدام با بقیه فرق دارد؟",
    pairs: "جفت‌ها را پیدا کن.",
    pairsHidden: "کارت‌ها را برگردان و جفت‌ها را پیدا کن.",
    goes: "«{name}» با کدام جفت می‌شود؟",
    thisFlag: "این پرچم",
    order: "دوباره به ترتیب بچین.",
    timeline: "هر چیز را سر جایش روی خط زمان بگذار."
  };
  var ORDER = ["sort", "which", "odd", "pairs", "goes", "order", "find", "ask"];
  Object.keys(GARDENS).forEach(function (level) {
    var gd = GARDENS[level];
    ORDER.forEach(function (kind, k) {
      var K = KINDS[kind];
      B.PRACTICE.push({
        id: "world-" + level + "-p" + (gd.from + k), subject: "world", level: level, objectives: gd.objectives,
        needs: [gd.first], lessons: (B.WORLD_REVIEW_LESSONS || {})["world-" + level + "-p" + (gd.from + k)] || [gd.first],
        emoji: K.emoji, title: K.title, words: WORDS,
        make: function (rng, n, ctx) {
          var srcs = stepsOf(ctx, level, K.needType);
          // the set's own lesson more often: its steps twice in the list
          var own = srcs.filter(function (x) { return x.l.id === srcs[0].l.id; });
          return take(rng, srcs.length ? own.concat(srcs) : [], Math.min(n, 4), function (src, r) { return K.make(src, r, ctx); });
        }
      });
    });
  });
})();

/* ---------- More kinds of items for lessons that had fewer than three ----------
   Most are short questions from a bank (choose): each question is { id, show, gate }, its words in words.q[id]
   = { q, o: [right, wrong, wrong] }. Some sort, order or count. */
(function () {
  function pickQs(rng, n, ctx, bank) {
    var open = bank.filter(function (b) { return !b.gate || ctx.done(b.gate); }).map(function (b) { return b.id; });
    var out = [];
    ctx.again.forEach(function (k) { if (open.indexOf(k) !== -1 && out.indexOf(k) === -1) out.push(k); });
    rng.shuffle(open).forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    return out.slice(0, n);
  }
  function quiz(rng, n, ctx, bank) {
    var qs = ctx.w("q"), by = {};
    bank.forEach(function (b) { by[b.id] = b; });
    return pickQs(rng, Math.min(n, 4), ctx, bank).map(function (id) {
      var w = qs[id], step = { type: "choose", key: id, prompt: w.q, say: w.q, options: rng.shuffle(w.o), answer: w.o[0] };
      if (by[id].show) step.show = by[id].show;
      if (w.o.some(function (o) { return o.length > 18; })) step.stack = true;
      return step;
    });
  }
  function qGen(o) {
    B.PRACTICE.push({ id: o.id, subject: "world", level: o.level, objectives: o.objectives, needs: o.needs, lessons: o.lessons,
      emoji: o.emoji, title: o.title, words: o.words, make: function (rng, n, ctx) { return quiz(rng, n, ctx, o.bank); } });
  }

  // ===== Seed =====
  qGen({ id: "world-seed-p13", level: "seed", objectives: ["world.seed.1"], needs: ["world-seed-1"], lessons: ["world-seed-1", "world-seed-8"],
    emoji: "👨‍👩‍👧", title: "این کیست؟",
    bank: [{ id: "dad", show: "👨" }, { id: "mum", show: "👩" }, { id: "gran", show: "👵" }, { id: "grandpa", show: "👴" }, { id: "baby", show: "👶" }, { id: "family", show: "👨‍👩‍👧‍👦" }],
    words: { q: {
      dad: { q: "این در خانوادهٔ کیان کیست؟", o: ["پدر", "مادربزرگ", "خواهر کوچک"] },
      mum: { q: "این در خانوادهٔ کیان کیست؟", o: ["مادر", "پدربزرگ", "برادر"] },
      gran: { q: "چه کسی شب برای بچه‌ها قصه گفت؟", o: ["مادربزرگ", "نازنین", "کیان"] },
      grandpa: { q: "مراد با پدر و مادر و چه کسانی زندگی می‌کند؟", o: ["پدربزرگ و مادربزرگ", "فقط برادرش", "دوستانش"] },
      baby: { q: "نازنین، خواهر کوچک کیان، چه می‌خورد؟", o: ["شیر", "کباب", "قهوه"] },
      family: { q: "خانواده‌ها با هم فرق دارند: کوچک و بزرگ. چه چیزی در همه هست؟", o: ["همدیگر را دوست دارند", "همه پنج نفرند", "همه در شیرازند"] } } } });

  // I was small: a baby could / I can now (sort), and growing up in order (order)
  var GROW = [{ id: "milk", pic: "🍼", basket: "baby" }, { id: "cry", pic: "😭", basket: "baby" }, { id: "crawl", pic: "🧸", basket: "baby" }, { id: "sleepAll", pic: "😴", basket: "baby" },
    { id: "run", pic: "🏃", basket: "now" }, { id: "ball", pic: "⚽", basket: "now" }, { id: "spoon", pic: "🥄", basket: "now" }, { id: "talk", pic: "🗣️", basket: "now" }];
  B.PRACTICE.push({ id: "world-seed-p14", subject: "world", level: "seed", objectives: ["world.seed.10"], needs: ["world-seed-9"], lessons: ["world-seed-9", "world-seed-19"],
    emoji: "👶", title: "وقتی نوزاد بودم",
    words: { prompt: "نوزاد بودم یا حالا؟", say: "این را وقتی نوزاد بودم می‌کردم، یا حالا می‌توانم؟ به سبدش ببر.",
      baskets: { baby: "وقتی نوزاد بودم", now: "حالا" },
      items: { milk: "شیر با شیشه", cry: "گریه برای غذا", crawl: "چهار دست و پا", sleepAll: "خیلی خواب", run: "دویدن", ball: "توپ گرفتن", spoon: "با قاشق غذا خوردن", talk: "حرف زدن" } },
    make: function (rng, n, ctx) {
      var it = ctx.w("items"), b = ctx.w("baskets"), out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var items = rng.sample(GROW.filter(function (x) { return x.basket === "baby"; }), 2).concat(rng.sample(GROW.filter(function (x) { return x.basket === "now"; }), 2));
        out.push({ type: "sort", key: "grow" + i, prompt: ctx.w("prompt"), say: ctx.w("say"),
          baskets: [{ pic: "👶", label: b.baby, value: "baby" }, { pic: "🧒", label: b.now, value: "now" }],
          items: rng.shuffle(items).map(function (x) { return { pic: x.pic, label: it[x.id], say: it[x.id], basket: x.basket }; }) });
      }
      return out;
    } });
  var AGES = [{ id: "baby", pic: "👶" }, { id: "child", pic: "🧒" }, { id: "adult", pic: "👨" }, { id: "old", pic: "👴" }];
  var STEPS9 = [{ id: "milk", pic: "🍼" }, { id: "walk", pic: "👣" }, { id: "run", pic: "⚽" }];
  B.PRACTICE.push({ id: "world-seed-p15", subject: "world", level: "seed", objectives: ["world.seed.10"], needs: ["world-seed-9"], lessons: ["world-seed-9"],
    emoji: "📏", title: "بزرگ شدن، به ترتیب",
    words: { agesPrompt: "آدم‌ها چطور بزرگ می‌شوند؟ به ترتیب بچین.", stepsPrompt: "ترانه چطور بزرگ شد؟ به ترتیب بچین.",
      ages: { baby: "نوزاد", child: "بچه", adult: "بزرگ", old: "پیر، مثل پدربزرگ" }, steps: { milk: "فقط شیر می‌خورد", walk: "تاتی‌تاتی راه رفت", run: "دوید و توپ گرفت" } },
    make: function (rng, n, ctx) {
      var a = ctx.w("ages"), s = ctx.w("steps"), out = [];
      var k = rng.int(3, 4), pick = rng.sample([0, 1, 2, 3], k).sort();
      out.push({ type: "order", key: "ages" + pick.join(""), numbered: true, prompt: ctx.w("agesPrompt"), say: ctx.w("agesPrompt"),
        items: pick.map(function (j) { return { pic: AGES[j].pic, label: a[AGES[j].id], say: a[AGES[j].id] }; }) });
      out.push({ type: "order", key: "steps", numbered: true, prompt: ctx.w("stepsPrompt"), say: ctx.w("stepsPrompt"),
        items: STEPS9.map(function (x) { return { pic: x.pic, label: s[x.id], say: s[x.id] }; }) });
      return rng.shuffle(out).slice(0, n);
    } });

  // Games of Iran's children (world-seed-6): game ↔ what you need (pairs), count, and questions
  var GAMES = [{ id: "hop", a: "🦶", b: "⬜" }, { id: "haftsang", a: "🪨", b: "⚽" }, { id: "yeqol", a: "✋", b: "🪨" }, { id: "hide", a: "🙈", b: "🔟" }, { id: "rope", a: "🪢", b: "🤸" }];
  B.PRACTICE.push({ id: "world-seed-p16", subject: "world", level: "seed", objectives: ["world.seed.6"], needs: ["world-seed-6"], lessons: ["world-seed-6"],
    emoji: "🪨", title: "هر بازی، چه لازم دارد؟",
    words: { prompt: "هر بازی، چه لازم دارد؟", say: "هر بازی را با چیزی که برایش لازم است جفت کن.",
      a: { hop: "لی‌لی", haftsang: "هفت‌سنگ", yeqol: "یه‌قل‌دوقل", hide: "قایم‌موشک", rope: "طناب‌بازی" },
      b: { hop: "خانه‌هایی روی زمین", haftsang: "هفت سنگ و یک توپ", yeqol: "پنج سنگ کوچک", hide: "یکی تا ده بشمارد", rope: "یک طناب" } },
    make: function (rng, n, ctx) {
      var a = ctx.w("a"), b = ctx.w("b"), out = [];
      for (var i = 0; i < Math.min(n, 2); i++) out.push({ type: "pairs", key: "games" + i, hidden: i === 1, prompt: ctx.w("prompt"), say: ctx.w("say"),
        pairs: rng.sample(GAMES, 3).map(function (g) { return [{ pic: g.a, label: a[g.id], say: a[g.id] }, { pic: g.b, label: b[g.id], say: b[g.id] }]; }) });
      return out;
    } });
  B.PRACTICE.push({ id: "world-seed-p17", subject: "world", level: "seed", objectives: ["world.seed.6"], needs: ["world-seed-6"], lessons: ["world-seed-6"],
    emoji: "🔢", title: "بشمار و بازی کن",
    words: { stones: "سنگ‌های هفت‌سنگ را بشمار. چندتاست؟", cups: "لیوان‌های هفت‌سنگ خانگی را بشمار. چندتاست؟", squares: "خانه‌های لی‌لی را بشمار. چندتاست؟", small: "سنگ‌های یه‌قل‌دوقل را بشمار. چندتاست؟" },
    make: function (rng, n, ctx) {
      var kinds = [{ k: "stones", thing: "🪨", n: 7 }, { k: "cups", thing: "🥤", n: rng.int(5, 7) }, { k: "squares", thing: "⬜", n: rng.int(6, 8) }, { k: "small", thing: "🪨", n: 5 }];
      return rng.sample(kinds, Math.min(n, 3)).map(function (x) {
        return { type: "count", key: x.k + x.n, thing: x.thing, n: x.n, prompt: ctx.w(x.k), options: rng.shuffle([x.n, x.n + 1, x.n - 1]) };
      });
    } });
  qGen({ id: "world-seed-p18", level: "seed", objectives: ["world.seed.6"], needs: ["world-seed-6"], lessons: ["world-seed-6"],
    emoji: "🙈", title: "کدام بازی؟",
    bank: [{ id: "hide", show: "🙈" }, { id: "hop", show: "🦶" }, { id: "haft", show: "🪨" }, { id: "safe" }],
    words: { q: {
      hide: { q: "در کدام بازی یکی چشمش را می‌بندد و بقیه قایم می‌شوند؟", o: ["قایم‌موشک", "لی‌لی", "هفت‌سنگ"] },
      hop: { q: "در کدام بازی با یک پا از روی خانه‌ها می‌پریم؟", o: ["لی‌لی", "قایم‌موشک", "یه‌قل‌دوقل"] },
      haft: { q: "در کدام بازی سنگ‌ها را روی هم می‌چینیم و با توپ می‌اندازیم؟", o: ["هفت‌سنگ", "لی‌لی", "قایم‌موشک"] },
      safe: { q: "در قایم‌موشک، کجا قایم نشویم؟", o: ["در یخچال یا صندوق", "پشت درخت", "پشت پرده"] } } } });

  qGen({ id: "world-seed-p19", level: "seed", objectives: ["world.seed.15"], needs: ["world-seed-16"], lessons: ["world-seed-16"],
    emoji: "🪘", title: "کدام ساز؟",
    bank: [{ id: "daf", show: "🪘" }, { id: "dutar", show: "🪕" }, { id: "laleva", show: "🪈" }, { id: "karna", show: "🎺" }, { id: "drum", show: "🥁" }, { id: "same" }],
    words: { q: {
      daf: { q: "پدر ژینا در کردستان کدام ساز را می‌زند؟", o: ["دف", "کرنا", "لله‌وا"] },
      dutar: { q: "پدربزرگ آیناز در گنبد کدام ساز را می‌زند؟", o: ["دوتار", "طبل", "دف"] },
      laleva: { q: "پدربزرگ نگار در گیلان کدام ساز را می‌زند؟", o: ["لله‌وا", "دوتار", "قیچک"] },
      karna: { q: "دایی بهادرِ قشقایی کدام ساز را می‌زند؟", o: ["کرنا", "دف", "لله‌وا"] },
      drum: { q: "پدر عادل در اهواز کدام ساز را می‌زند؟", o: ["طبل", "دوتار", "کرنا"] },
      same: { q: "لباس‌ها، آهنگ‌ها و زبان‌های مردم ایران با هم فرق دارد. ولی همه…", o: ["ایرانی هستیم", "یک ساز می‌زنیم", "یک لباس داریم"] } } } });

  qGen({ id: "world-seed-p20", level: "seed", objectives: ["world.seed.11"], needs: ["world-seed-11"], lessons: ["world-seed-11", "world-seed-23"],
    emoji: "🤝", title: "با هم بهتر است",
    bank: [{ id: "slide", show: "🛝" }, { id: "spill", show: "💧" }, { id: "pencils", show: "🖍️" }, { id: "tidy", show: "🧸" }, { id: "castle", show: "🏰", gate: "world-seed-23" }, { id: "sofreh", show: "🍽️", gate: "world-seed-23" }],
    words: { q: {
      slide: { q: "همه می‌خواهند سرسره‌بازی کنند. چه کنیم؟", o: ["نوبتی برویم", "هل بدهیم", "قهر کنیم"] },
      spill: { q: "اشتباهی آب را روی نقاشی دوستت ریختی. چه می‌گویی؟", o: ["ببخشید!", "به من چه!", "هیچ چیز"] },
      pencils: { q: "یک جعبه مداد رنگی دارید و دو نفرید. چه کنید؟", o: ["با هم شریک شوید", "یکی همه را بردارد", "مدادها را قایم کنید"] },
      tidy: { q: "بازی تمام شد. اسباب‌بازی‌ها چه شوند؟", o: ["همه با هم جمعشان کنیم", "همان‌جا بمانند", "فقط یکی جمع کند"] },
      castle: { q: "چهار دوست چطور قلعهٔ شنی بزرگ را ساختند؟", o: ["با هم، هر کس یک کار", "یکی به تنهایی", "اصلاً نساختند"] },
      sofreh: { q: "برای چیدن سفره، بچه‌ها چه کمکی می‌کنند؟", o: ["بشقاب و نان می‌آورند", "تماشا می‌کنند", "قایم می‌شوند"] } } } });

  var CC = [{ id: "kerman", basket: "city" }, { id: "shiraz", basket: "city" }, { id: "tabriz", basket: "city" }, { id: "rasht", basket: "city" }, { id: "yazd", basket: "city" },
    { id: "iran", basket: "country" }, { id: "turkey", basket: "country" }, { id: "japan", basket: "country" }, { id: "kenya", basket: "country" }];
  var NEST = [{ id: "home", pic: "🏠" }, { id: "street", pic: "🛣️" }, { id: "city", pic: "🏙️" }, { id: "country", pic: "🗺️" }];
  B.PRACTICE.push({ id: "world-seed-p21", subject: "world", level: "seed", objectives: ["world.seed.13"], needs: ["world-seed-18"], lessons: ["world-seed-18", "world-seed-24"],
    emoji: "🏙️", title: "شهر یا کشور؟",
    words: { sortPrompt: "شهر یا کشور؟", sortSay: "این یک شهر است یا یک کشور؟ به سبدش ببر.", baskets: { city: "شهر", country: "کشور" },
      items: { kerman: "کرمان", shiraz: "شیراز", tabriz: "تبریز", rasht: "رشت", yazd: "یزد", iran: "ایران", turkey: "ترکیه", japan: "ژاپن", kenya: "کنیا" },
      nestPrompt: "از کوچک تا بزرگ بچین: خانه در کوچه، کوچه در شهر، شهر در کشور.",
      nest: { home: "خانه", street: "کوچه", city: "شهر", country: "کشور ایران" } },
    make: function (rng, n, ctx) {
      var it = ctx.w("items"), b = ctx.w("baskets"), ns = ctx.w("nest");
      var items = rng.sample(CC.filter(function (x) { return x.basket === "city"; }), 3).concat(rng.sample(CC.filter(function (x) { return x.basket === "country"; }), 2));
      return [{ type: "sort", key: "cc", prompt: ctx.w("sortPrompt"), say: ctx.w("sortSay"),
        baskets: [{ pic: "🏙️", label: b.city, value: "city" }, { pic: "🗺️", label: b.country, value: "country" }],
        items: rng.shuffle(items).map(function (x) { return { label: it[x.id], say: it[x.id], basket: x.basket }; }) },
        { type: "order", key: "nest", numbered: true, prompt: ctx.w("nestPrompt"), say: ctx.w("nestPrompt"),
          items: NEST.map(function (x) { return { pic: x.pic, label: ns[x.id], say: ns[x.id] }; }) }].slice(0, n);
    } });

  // ===== Sprout =====
  qGen({ id: "world-sprout-p17", level: "sprout", objectives: ["world.spr.8"], needs: ["world-sprout-9"], lessons: ["world-sprout-9", "world-sprout-12"],
    emoji: "⏮️", title: "قبل، بعد، حالا",
    bank: [{ id: "walkWord" }, { id: "wordSchool" }, { id: "first", show: "👶" }, { id: "now", show: "⚽" }, { id: "spoon", show: "🥄" }],
    words: { q: {
      walkWord: { q: "بردیا اول راه رفت یا اول اولین کلمه‌اش را گفت؟", o: ["اول راه رفت", "اول حرف زد", "هر دو با هم"] },
      wordSchool: { q: "بعد از اولین کلمه، بردیا کجا رفت؟", o: ["مهدکودک", "دانشگاه", "سرِ کار"] },
      first: { q: "اولِ خط زندگی هر کس چیست؟", o: ["به دنیا آمدن", "مدرسه رفتن", "توپ‌بازی"] },
      now: { q: "«حالا» بردیا چه کار می‌کند؟", o: ["با دوستانش توپ‌بازی می‌کند", "فقط شیر می‌خورد", "تاتی‌تاتی راه می‌رود"] },
      spoon: { q: "کدام زودتر یاد گرفتی: با قاشق غذا خوردن یا دوچرخه‌سواری؟", o: ["با قاشق غذا خوردن", "دوچرخه‌سواری", "هر دو با هم"] } } } });

  qGen({ id: "world-sprout-p18", level: "sprout", objectives: ["world.spr.13"], needs: ["world-sprout-14"], lessons: ["world-sprout-14"],
    emoji: "🏡", title: "چرا خانه این شکلی است؟",
    bank: [{ id: "roof", show: "🏡" }, { id: "wind", show: "🏠" }, { id: "masuleh", show: "🏘️" }, { id: "kandovan", show: "🪨" }],
    words: { q: {
      roof: { q: "چرا سقف خانه‌های گیلان شیب‌دار است؟", o: ["تا آب باران زود پایین برود", "تا برف بماند", "تا قشنگ‌تر باشد"] },
      wind: { q: "بادگیرِ خانه‌های یزد چه کار می‌کند؟", o: ["باد خنک را به خانه می‌آورد", "باران را جمع می‌کند", "خانه را گرم می‌کند"] },
      masuleh: { q: "در ماسوله، پشت‌بام هر خانه چیست؟", o: ["حیاط خانهٔ بالایی", "یک باغچهٔ برنج", "یک حوض"] },
      kandovan: { q: "خانه‌های کندوان را کجا ساخته‌اند؟", o: ["در دل سنگ", "روی آب", "روی درخت"] } } } });

  qGen({ id: "world-sprout-p19", level: "sprout", objectives: ["world.spr.3"], needs: ["world-sprout-3"], lessons: ["world-sprout-3", "world-sprout-8"],
    emoji: "☀️", title: "خورشید و جهت‌ها",
    bank: [{ id: "rise", show: "🌅" }, { id: "set", show: "🌇" }, { id: "noon", show: "☀️" }, { id: "right" }, { id: "back" }, { id: "map" }],
    words: { q: {
      rise: { q: "خورشید صبح از کدام طرف بالا می‌آید؟", o: ["شرق", "غرب", "شمال"] },
      set: { q: "خورشید عصر در کدام طرف پایین می‌رود؟", o: ["غرب", "شرق", "جنوب"] },
      noon: { q: "در ایران، ظهر خورشید در کدام طرف آسمان است؟", o: ["جنوب", "شمال", "شرق"] },
      right: { q: "اگر رو به شمال بایستی، شرق کدام طرفِ توست؟", o: ["دست راست", "دست چپ", "پشت سر"] },
      back: { q: "اگر رو به شمال بایستی، پشت سرت کدام جهت است؟", o: ["جنوب", "شرق", "غرب"] },
      map: { q: "روی نقشه، شمال معمولاً کجاست؟", o: ["بالا", "پایین", "سمت راست"] } } } });

  // An address in order, with made-up names (world-sprout-16)
  var ADDR = { provinces: ["fars", "gilan", "isfahan", "kerman"], parts: ["country", "province", "city", "street", "alley", "number"] };
  B.PRACTICE.push({ id: "world-sprout-p20", subject: "world", level: "sprout", objectives: ["world.spr.15"], needs: ["world-sprout-16"], lessons: ["world-sprout-16", "world-sprout-35"],
    emoji: "📮", title: "نشانی به ترتیب",
    words: { prompt: "نشانی را از بزرگ به کوچک بچین: اول کشور.",
      country: "کشور ایران", province: { fars: "استان فارس", gilan: "استان گیلان", isfahan: "استان اصفهان", kerman: "استان کرمان" },
      city: { fars: "شهر شیراز", gilan: "شهر رشت", isfahan: "شهر اصفهان", kerman: "شهر کرمان" },
      street: ["خیابان بهار", "خیابان لاله", "خیابان باغ"], alley: ["کوچهٔ نرگس", "کوچهٔ اقاقیا", "کوچهٔ سرو"], number: "پلاک {n}" },
    make: function (rng, n, ctx) {
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var p = rng.pick(ADDR.provinces), k = rng.int(4, 6), parts = ADDR.parts.slice(0, k);
        var label = { country: ctx.w("country"), province: ctx.w("province")[p], city: ctx.w("city")[p], street: rng.pick(ctx.w("street")), alley: rng.pick(ctx.w("alley")), number: ctx.w("number", { n: rng.int(2, 40) }) };
        var pics = { country: "🗺️", province: "🧭", city: "🏙️", street: "🛣️", alley: "🏘️", number: "🔢" };
        out.push({ type: "order", key: "addr" + p + k, numbered: true, prompt: ctx.w("prompt"), say: ctx.w("prompt"),
          items: parts.map(function (x) { return { pic: pics[x], label: label[x], say: label[x] }; }) });
      }
      return out;
    } });

  qGen({ id: "world-sprout-p21", level: "sprout", objectives: ["world.spr.4"], needs: ["world-sprout-4"], lessons: ["world-sprout-4", "world-sprout-8"],
    emoji: "🗺️", title: "ایران: کدام؟",
    bank: [{ id: "north", show: "🌊" }, { id: "south", show: "🌊" }, { id: "capital", show: "🏙️" }, { id: "count" }, { id: "rasht" }, { id: "mashhad" }],
    words: { q: {
      north: { q: "کدام دریا در شمال ایران است؟", o: ["دریای خزر", "خلیج فارس", "دریای عمان"] },
      south: { q: "کدام دریا در جنوب ایران است؟", o: ["خلیج فارس", "دریای خزر", "دریاچهٔ ارومیه"] },
      capital: { q: "پایتخت ایران کدام شهر است؟", o: ["تهران", "شیراز", "تبریز"] },
      count: { q: "ایران چند استان دارد؟", o: ["۳۱", "۷", "۱۰۰"] },
      rasht: { q: "رشت کنار کدام دریاست؟", o: ["دریای خزر", "خلیج فارس", "دریای عمان"] },
      mashhad: { q: "مشهد در کدام طرف ایران است؟", o: ["شمال شرقی", "جنوب غربی", "شمال غربی"] } } } });

  qGen({ id: "world-sprout-p22", level: "sprout", objectives: ["world.spr.6"], needs: ["world-sprout-6"], lessons: ["world-sprout-6", "world-sprout-36"],
    emoji: "🗣️", title: "زبان‌ها و سازها",
    bank: [{ id: "sagh" }, { id: "supas" }, { id: "shukran" }, { id: "many" }, { id: "value" },
      { id: "tar", gate: "world-sprout-36" }, { id: "kamancheh", gate: "world-sprout-36" }, { id: "ney", gate: "world-sprout-36" }],
    words: { q: {
      sagh: { q: "آیلار در تبریز می‌گوید «ساغ اول!». یعنی چه؟", o: ["ممنون", "خداحافظ", "شب بخیر"] },
      supas: { q: "ژیار در سنندج به کردی تشکر می‌کند. چه می‌گوید؟", o: ["سوپاس", "مرحبا", "ساغ بول"] },
      shukran: { q: "ریم در اهواز به عربی تشکر می‌کند. چه می‌گوید؟", o: ["شکراً", "سوپاس", "منّت‌وار"] },
      many: { q: "در ایران مردم به چند زبان حرف می‌زنند؟", o: ["به زبان‌های زیاد", "فقط به یک زبان", "به هیچ زبانی"] },
      value: { q: "کدام زبان ارزشمند است؟", o: ["همهٔ زبان‌ها", "فقط فارسی", "فقط انگلیسی"] },
      tar: { q: "کدام ساز را با مضراب و سیم می‌نوازند و تنه‌اش شبیه دو قلب است؟", o: ["تار", "نی", "دهل"] },
      kamancheh: { q: "کدام ساز را با کمان می‌نوازند؟", o: ["کمانچه", "دهل", "نی"] },
      ney: { q: "در کدام ساز فوت می‌کنیم؟", o: ["نی", "تار", "دهل"] } } } });

  qGen({ id: "world-sprout-p23", level: "sprout", objectives: ["world.spr.10"], needs: ["world-sprout-19"], lessons: ["world-sprout-19", "world-sprout-20", "world-sprout-22"],
    emoji: "⚖️", title: "قانون و کار گروهی",
    bank: [{ id: "noRules" }, { id: "fair" }, { id: "class" }, { id: "apples", gate: "world-sprout-20" }, { id: "listen", gate: "world-sprout-20" }, { id: "part", gate: "world-sprout-20" }],
    words: { q: {
      noRules: { q: "اگر یک بازی هیچ قانونی نداشته باشد، چه می‌شود؟", o: ["همه دعوا می‌کنند و بازی خراب می‌شود", "بازی بهتر می‌شود", "همه برنده می‌شوند"] },
      fair: { q: "یک قانون منصفانه کدام است؟", o: ["قانون برای همه یکی باشد", "فقط بزرگ‌ترها بازی کنند", "وسط بازی قانون عوض شود"] },
      "class": { q: "چرا در کلاس دست بلند می‌کنیم تا حرف بزنیم؟", o: ["تا حرف همه شنیده شود", "تا خسته شویم", "تا معلم نبیند"] },
      apples: { q: "همسایه‌ها در روستا با هم سیب‌های پدربزرگ را چیدند. اسم این کار چیست؟", o: ["همیاری", "قهر", "بازی"] },
      listen: { q: "وقتی با هم کار می‌کنیم، به حرف دیگران چه کنیم؟", o: ["گوش بدهیم", "بخندیم", "کار را ول کنیم"] },
      part: { q: "در کار گروهی، هر کس…", o: ["یک بخش از کار را انجام می‌دهد", "همهٔ کار را تنها می‌کند", "فقط تماشا می‌کند"] } } } });

  // ===== Sapling =====
  var ARROWS = [{ id: "n", show: "⬆️" }, { id: "ne", show: "↗️" }, { id: "e", show: "➡️" }, { id: "se", show: "↘️" }, { id: "s", show: "⬇️" }, { id: "sw", show: "↙️" }, { id: "w", show: "⬅️" }, { id: "nw", show: "↖️" }];
  B.PRACTICE.push({ id: "world-sapling-p17", subject: "world", level: "sapling", objectives: ["world.sap.5"], needs: ["world-sapling-10"], lessons: ["world-sapling-10", "world-sapling-14"],
    emoji: "🧭", title: "هشت جهت",
    words: { q: "شمال بالاست. این پیکان به کدام جهت است؟",
      dirs: { n: "شمال", ne: "شمال شرقی", e: "شرق", se: "جنوب شرقی", s: "جنوب", sw: "جنوب غربی", w: "غرب", nw: "شمال غربی" },
      between: "میان {a} و {b} کدام جهت است؟" },
    make: function (rng, n, ctx) {
      var d = ctx.w("dirs"), out = [];
      rng.sample(ARROWS, Math.min(n, 4)).forEach(function (a, i) {
        if (i % 2 === 0) {
          var wrong = rng.sample(ARROWS.filter(function (x) { return x !== a; }), 2).map(function (x) { return d[x.id]; });
          out.push({ type: "choose", key: "arrow:" + a.id, show: a.show, prompt: ctx.w("q"), say: ctx.w("q"), options: rng.shuffle([d[a.id]].concat(wrong)), answer: d[a.id] });
        } else if (a.id.length === 2) {
          var q = ctx.w("between", { a: d[a.id[0]], b: d[a.id[1]] });
          var w2 = rng.sample(ARROWS.filter(function (x) { return x.id.length === 2 && x !== a; }), 2).map(function (x) { return d[x.id]; });
          out.push({ type: "choose", key: "between:" + a.id, prompt: q, say: q, options: rng.shuffle([d[a.id]].concat(w2)), answer: d[a.id] });
        } else {
          var w3 = rng.sample(ARROWS.filter(function (x) { return x !== a; }), 2).map(function (x) { return d[x.id]; });
          out.push({ type: "choose", key: "arrow:" + a.id, show: a.show, prompt: ctx.w("q"), say: ctx.w("q"), options: rng.shuffle([d[a.id]].concat(w3)), answer: d[a.id] });
        }
      });
      return out;
    } });

  qGen({ id: "world-sapling-p18", level: "sapling", objectives: ["world.sap.1"], needs: ["world-sapling-1"], lessons: ["world-sapling-1", "world-sapling-40", "world-sapling-17"],
    emoji: "🏔️", title: "این چه جور زمینی است؟",
    bank: [{ id: "mountain", show: "🏔️" }, { id: "desert", show: "🏜️" }, { id: "sea", show: "🌊" }, { id: "plain", show: "🌾" }, { id: "damavand" }, { id: "white", gate: "world-sapling-40" }, { id: "green", gate: "world-sapling-40" }],
    words: { q: {
      mountain: { q: "این چه جور زمینی است؟", o: ["کوه", "کویر", "دشت"] },
      desert: { q: "این چه جور زمینی است؟", o: ["کویر", "دریا", "جنگل"] },
      sea: { q: "این چیست؟", o: ["دریا", "کوه", "دشت"] },
      plain: { q: "زمینی صاف و هموار برای مزرعه را چه می‌گوییم؟", o: ["دشت", "قله", "کویر"] },
      damavand: { q: "بلندترین کوه ایران کدام است؟", o: ["دماوند", "سبلان", "دنا"] },
      white: { q: "روی نقشهٔ ناهمواری، رنگ سفید یعنی چه؟", o: ["بلندترین قله‌ها", "دریا", "دشت"] },
      green: { q: "روی نقشهٔ ناهمواری، رنگ سبز یعنی چه؟", o: ["جاهای پست و کم‌ارتفاع", "قله‌ها", "کویر"] } } } });

  qGen({ id: "world-sapling-p19", level: "sapling", objectives: ["world.sap.24"], needs: ["world-sapling-42"], lessons: ["world-sapling-42"],
    emoji: "🏙️", title: "چرا اینجا شهر شد؟",
    bank: [{ id: "river", show: "🏞️" }, { id: "plain", show: "🌾" }, { id: "roads", show: "🛣️" }, { id: "port", show: "⚓" }, { id: "ahvaz" }, { id: "tabriz" }],
    words: { q: {
      river: { q: "چرا مردم کنار رود شهر می‌ساختند؟", o: ["چون آب برای خوردن و کشاورزی لازم است", "چون رود صدای قشنگی دارد", "چون کنار رود کوه نیست"] },
      plain: { q: "چرا دشت صاف برای شهر خوب است؟", o: ["برای مزرعه و ساختن خانه", "چون همیشه برف دارد", "چون کسی آنجا نمی‌رود"] },
      roads: { q: "جایی که چند راه به هم می‌رسند، چه کسانی می‌ایستند؟", o: ["مسافرها و بازرگان‌ها", "فقط پرنده‌ها", "هیچ‌کس"] },
      port: { q: "بندر کجا ساخته می‌شود؟", o: ["کنار دریا", "روی کوه", "وسط کویر"] },
      ahvaz: { q: "اهواز کنار کدام رود است؟", o: ["کارون", "زاینده‌رود", "ارس"] },
      tabriz: { q: "تبریز در قدیم چرا بزرگ شد؟", o: ["سر چند راه قدیمی بود", "کنار دریا بود", "وسط کویر بود"] } } } });

  qGen({ id: "world-sapling-p20", level: "sapling", objectives: ["world.sap.19"], needs: ["world-sapling-21"], lessons: ["world-sapling-21", "world-sapling-22"],
    emoji: "📜", title: "قصه‌ها چه می‌گویند؟",
    bank: [{ id: "coat", show: "🧥" }, { id: "why", show: "🍲" }, { id: "elephant", show: "🐘" }, { id: "dark" }, { id: "lesson" }],
    words: { q: {
      coat: { q: "ملا بار دوم با چه لباسی به مهمانی رفت؟", o: ["پالتوی نو", "لباس کهنه", "لباس کار"] },
      why: { q: "ملا گفت «بخور، پالتوی من، بخور!». چرا؟", o: ["چون به پالتو احترام گذاشتند، نه به خودش", "چون پالتو گرسنه بود", "چون آش سرد بود"] },
      elephant: { q: "در قصهٔ «فیل در تاریکی»، کسی که خرطوم را لمس کرد، فیل را شبیه چه دانست؟", o: ["لوله", "ستون", "بادبزن"] },
      dark: { q: "اگر در اتاقِ فیل شمع بود، چه می‌شد؟", o: ["همه فیل را با هم می‌دیدند", "فیل فرار می‌کرد", "هیچ فرقی نمی‌کرد"] },
      lesson: { q: "قصهٔ «فیل در تاریکی» چه یادمان می‌دهد؟", o: ["حرف دیگران را هم گوش کنیم", "به اتاق تاریک نرویم", "فیل مثل بادبزن است"] } } } });

  qGen({ id: "world-sapling-p21", level: "sapling", objectives: ["world.sap.22"], needs: ["world-sapling-24"], lessons: ["world-sapling-24", "world-sapling-25"],
    emoji: "✋", title: "با هم تصمیم بگیریم",
    bank: [{ id: "first" }, { id: "vote", show: "✋" }, { id: "lose" }, { id: "count" }, { id: "interrupt" }],
    words: { q: {
      first: { q: "برای تصمیم گرفتن با هم، اول چه کنیم؟", o: ["هر کس فکرش را بگوید", "زود رأی بگیریم", "قهر کنیم"] },
      vote: { q: "سه نفر توپ‌بازی می‌خواهند و دو نفر طناب‌بازی. با رأی‌گیری چه بازی می‌کنند؟", o: ["توپ‌بازی", "طناب‌بازی", "هیچ بازی"] },
      lose: { q: "اگر فکر تو رأی کمتری بیاورد، چه کنی؟", o: ["با بقیه بازی کنم؛ شاید دفعهٔ بعد نوبت فکر من باشد", "قهر کنم", "داد بزنم"] },
      count: { q: "در رأی‌گیری با دست بالا، چه کار می‌کنیم؟", o: ["دست‌ها را می‌شماریم", "قد آدم‌ها را می‌سنجیم", "سکه می‌اندازیم"] },
      interrupt: { q: "وقتی دوستت دارد فکرش را می‌گوید، چه کنی؟", o: ["گوش بدهم و حرفش را قطع نکنم", "وسط حرفش حرف بزنم", "رویم را برگردانم"] } } } });

  var EVENTS = [{ id: "cave", rank: 0, gate: "world-sapling-30" }, { id: "village", rank: 1, gate: "world-sapling-31" }, { id: "pot", rank: 2, gate: "world-sapling-32" },
    { id: "scribe", rank: 3, gate: "world-sapling-35" }, { id: "print", rank: 4, gate: "world-sapling-35" }, { id: "train", rank: 5, gate: "world-sapling-35" },
    { id: "radio", rank: 6 }, { id: "mobile", rank: 7 }, { id: "caravan", rank: 4.5 }];
  B.PRACTICE.push({ id: "world-sapling-p22", subject: "world", level: "sapling", objectives: ["world.sap.14", "world.sap.21"], needs: ["world-sapling-29"],
    lessons: ["world-sapling-29", "world-sapling-33", "world-sapling-35", "world-sapling-48"],
    emoji: "⌛", title: "کدام زودتر بود؟",
    words: { q: "کدام زودتر بود؟", names: { cave: "زندگی در غار", village: "اولین روستاها", pot: "کوزه‌های سیلک", scribe: "کتاب‌های دست‌نویس", print: "اولین چاپخانه",
      train: "ماشین دودی", radio: "رادیو در خانه‌ها", mobile: "تلفن همراه", caravan: "کاروان شتر" } },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), open = EVENTS.filter(function (e) { return !e.gate || ctx.done(e.gate); }), out = [], seen = {};
      for (var i = 0; out.length < Math.min(n, 4) && i < 30; i++) {
        var two = rng.sample(open, 2);
        if (Math.abs(two[0].rank - two[1].rank) < 1) continue;
        var key = [two[0].id, two[1].id].sort().join("-");
        if (seen[key]) continue;
        seen[key] = true;
        var early = two[0].rank < two[1].rank ? two[0] : two[1];
        out.push({ type: "choose", key: key, prompt: ctx.w("q"), say: ctx.w("q"), options: rng.shuffle([names[two[0].id], names[two[1].id]]), answer: names[early.id] });
      }
      return out;
    } });

  B.PRACTICE.push({ id: "world-sapling-p23", subject: "world", level: "sapling", objectives: ["world.sap.23"], needs: ["world-sapling-27"], lessons: ["world-sapling-27", "world-sapling-28"],
    emoji: "🐷", title: "پس‌انداز",
    words: { weeks: "{thing} {price} هزار تومان است. اگر هر هفته {save} هزار تومان پس‌انداز کنی، چند هفته طول می‌کشد؟",
      cost: "{money} هزار تومان داری. اگر {a} را بخری، دیگر نمی‌توانی {b} را بخری. «هزینهٔ انتخابِ» تو چیست؟",
      things: { ball: "توپ", book: "کتاب", bike: "دوچرخهٔ کوچک", kite: "بادبادک" } },
    make: function (rng, n, ctx) {
      var t = ctx.w("things"), out = [];
      for (var i = 0; i < Math.min(n, 3); i++) {
        if (i % 2 === 0) {
          var save = rng.pick([2, 3, 5]), wk = rng.int(2, 5), thing = rng.pick(Object.keys(t)), price = save * wk;
          out.push({ type: "choose", key: "w" + save + wk, prompt: ctx.w("weeks", { thing: t[thing], price: price, save: save }), say: ctx.w("weeks", { thing: t[thing], price: price, save: save }),
            options: rng.shuffle([wk, wk + 1, wk > 2 ? wk - 1 : wk + 2]).map(String), answer: String(wk) });
        } else {
          var two = rng.sample(["ball", "book", "kite"], 2);
          var q = ctx.w("cost", { money: 10, a: t[two[0]], b: t[two[1]] });
          out.push({ type: "choose", key: "c" + two.join(""), prompt: q, say: q, options: rng.shuffle([t[two[1]], t[two[0]]]), answer: t[two[1]] });
        }
      }
      return out;
    } });
})();
