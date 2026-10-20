/* باغچه — practice generators for فکر و برنامه‌نویسی (subject think). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/thinking.js.
   Coding boards are made at random and checked here before they are used: a board is kept only when a search (or the
   program it was built from) shows it can be solved within its block limit, and a "fix it" program only when it
   really fails. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  // Persian digits for numbers in prompts and choose labels (English shows them as 0–9 by itself).
  // A sentence's first letter in capitals (English clues start with "the dog…"; Persian has no capitals).
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function fa(n) { return String(n).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  // ---------------- boards: moving, searching, checking ----------------
  var MOVE = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] }, CLOCK = ["up", "right", "down", "left"];
  var ARROWS = ["up", "down", "left", "right"], TURNS = ["fwd", "cw", "ccw"];
  function wallSet(b) { var w = {}; (b.walls || []).forEach(function (p) { w[p[0] + "," + p[1]] = true; }); return w; }
  // Runs a program (with repeat blocks) on a board: "goal", "bump" or "short".
  function sim(b, prog) {
    var w = wallSet(b), cols = b.size[0], rows = b.size[1];
    var st = { x: b.start[0], y: b.start[1], h: b.face || "right" }, out = "short", steps = 0;
    (function run(list) {
      for (var i = 0; i < list.length && out === "short"; i++) {
        var op = list[i];
        if (typeof op !== "string") { for (var k = 0; k < op.repeat && out === "short"; k++) run(op.body); continue; }
        if (++steps > 200) { out = "bump"; return; }
        if (op === "cw" || op === "ccw") { st.h = CLOCK[(CLOCK.indexOf(st.h) + (op === "cw" ? 1 : 3)) % 4]; continue; }
        var d = MOVE[op === "fwd" ? st.h : op], nx = st.x + d[0], ny = st.y + d[1];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || w[nx + "," + ny]) { out = "bump"; return; }
        st.x = nx; st.y = ny;
        if (nx === b.goal[0] && ny === b.goal[1]) out = "goal";
      }
    })(prog);
    return out;
  }
  // The shortest plain program (no repeats) from start to goal, or null.
  function shortest(b, turn, cap) {
    var w = wallSet(b), cols = b.size[0], rows = b.size[1], ops = turn ? TURNS : ARROWS;
    var s0 = { x: b.start[0], y: b.start[1], h: b.face || "right", p: [] }, seen = {}, q = [s0];
    function key(s) { return s.x + "," + s.y + (turn ? s.h : ""); }
    seen[key(s0)] = true;
    while (q.length) {
      var s = q.shift();
      if (s.p.length >= (cap || 16)) continue;
      for (var i = 0; i < ops.length; i++) {
        var op = ops[i], n = { x: s.x, y: s.y, h: s.h, p: s.p.concat([op]) };
        if (op === "cw" || op === "ccw") n.h = CLOCK[(CLOCK.indexOf(s.h) + (op === "cw" ? 1 : 3)) % 4];
        else {
          var d = MOVE[op === "fwd" ? s.h : op];
          n.x += d[0]; n.y += d[1];
          if (n.x < 0 || n.y < 0 || n.x >= cols || n.y >= rows || w[n.x + "," + n.y]) continue;
          if (n.x === b.goal[0] && n.y === b.goal[1]) return n.p;
        }
        if (seen[key(n)]) continue;
        seen[key(n)] = true;
        q.push(n);
      }
    }
    return null;
  }
  // Is there a program of at most max blocks (counting a repeat block and its inside) that solves the board?
  function solvableWithin(b, turn, max) {
    var ops = turn ? TURNS : ARROWS, found = false;
    for (var n = 1; n <= max && !found; n++) {
      (function gen(prog, used) {
        if (found) return;
        if (used === n) { if (sim(b, prog) === "goal") found = true; return; }
        ops.forEach(function (op) { gen(prog.concat([op]), used + 1); });
        for (var k = 2; k <= 5; k++) for (var bl = 1; used + 1 + bl <= n; bl++) {
          (function body(bd) {
            if (found) return;
            if (bd.length === bl) { gen(prog.concat([{ repeat: k, body: bd }]), used + 1 + bl); return; }
            ops.forEach(function (op) { body(bd.concat([op])); });
          })([]);
        }
      })([], 0);
    }
    return found;
  }
  function count(prog) { return prog.reduce(function (n, b) { return n + (typeof b === "string" ? 1 : 1 + count(b.body)); }, 0); }
  // A random board: start, goal and some rocks, none on top of each other.
  function randomBoard(rng, cols, rows, rocks) {
    var cells = [];
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) cells.push([x, y]);
    var pick = rng.sample(cells, 2 + rocks);
    return { size: [cols, rows], start: pick[0], goal: pick[1], walls: pick.slice(2) };
  }
  function sig(b) { return [b.size, b.start, b.goal, b.face || "", (b.walls || []).map(String).sort().join(";")].join("|"); }
  var FRUIT = ["🍓", "🥕", "🍎", "🍐", "🍇"];

  /* «الگو را ادامه بده» — think-seed-p1. AB, AAB, ABB and ABC patterns from one picture set, 1 to 3 places to fill
     (more than one after think-seed-5). Key: kind and set. */
  var SETS = [["🍎", "🍌", "🍇"], ["🐱", "🐶", "🐰"], ["🔴", "🔵", "🟡"], ["⭐", "🌙", "☀️"], ["🟥", "🟩", "🟦"], ["🐟", "🐢", "🐸"]];
  var KINDS = { AB: [0, 1], AAB: [0, 0, 1], ABB: [0, 1, 1], ABC: [0, 1, 2] };
  B.PRACTICE.push({
    id: "think-seed-p1", subject: "think", level: "seed", objectives: ["think.seed.1"], needs: ["think-seed-1"], lessons: ["think-seed-1", "think-seed-5"],
    emoji: "🔴", title: "الگو را ادامه بده",
    words: { next: "بعدی کدام است؟", fill: "جاهای خالی را پر کن" },
    make: function (rng, n, ctx) {
      var kinds = ["AB", "AAB", "ABB", "ABC"], out = [], seen = {};
      for (var t = 0; t < 40 && out.length < n; t++) {
        var kind = rng.pick(kinds), si = rng.int(0, SETS.length - 1), set = SETS[si], unit = KINDS[kind];
        var key = kind + "-" + si;
        if (seen[key]) continue;
        seen[key] = true;
        var len = unit.length * (unit.length === 2 ? 3 : 2), seq = [];
        for (var i = 0; i < len; i++) seq.push(set[unit[i % unit.length]]);
        var gaps = ctx.done("think-seed-5") ? rng.int(1, 3) : 1;
        var blanks = gaps === 1 ? [len - 1] : rng.sample(seq.map(function (x, i) { return i; }).slice(unit.length), gaps).sort(function (a, b) { return a - b; });
        out.push({ type: "pattern", key: key, prompt: ctx.w(gaps === 1 ? "next" : "fill"), say: ctx.w(gaps === 1 ? "next" : "fill"), seq: seq, blanks: blanks, options: rng.shuffle(set) });
      }
      return out;
    }
  });

  /* «دسته‌بندی کن» — think-seed-p2. 6 to 8 pictures into baskets by one rule: colour, kind, or (after think-seed-7) size;
     after think-seed-7 also putting things in order from small to big. Key: the rule. */
  var BY_COLOUR = { red: ["🍎", "🍓", "🍒", "🌹", "🚗"], yellow: ["🍌", "🌻", "⭐", "🍋", "🐥"], green: ["🥒", "🍐", "🐸", "🌳", "🥦"], blue: ["🐳", "💧", "🫐", "🦋", "👖"] };
  var BY_KIND = { fruit: ["🍎", "🍌", "🍇", "🍐", "🍓", "🍊"], animal: ["🐱", "🐶", "🐰", "🐮", "🐔", "🐟"], vehicle: ["🚗", "🚌", "🚲", "✈️", "🚂", "🚕"] };
  var SIZED = ["🐘", "🐱", "🐭", "🍉", "🍎", "🍒", "🌳", "🌷"];
  B.PRACTICE.push({
    id: "think-seed-p2", subject: "think", level: "seed", objectives: ["think.seed.2", "think.seed.8"], needs: ["think-seed-2"], lessons: ["think-seed-2", "think-seed-7"],
    emoji: "🧺", title: "دسته‌بندی کن",
    words: {
      colour: "هر چیز را در سبد رنگ خودش بگذار", kind: "هر چیز را در سبد درستش بگذار", size: "بزرگ‌ها در یک سبد، کوچک‌ها در سبد دیگر",
      order: "از کوچک به بزرگ بچین",
      labels: { red: "قرمز", yellow: "زرد", green: "سبز", blue: "آبی", fruit: "میوه", animal: "حیوان", vehicle: "وسیله نقلیه", big: "بزرگ", small: "کوچک" }
    },
    make: function (rng, n, ctx) {
      var rules = ["colour", "kind"];
      if (ctx.done("think-seed-7")) rules.push("size", "order");
      var L = ctx.w("labels"), out = [], order = rng.shuffle(rules);
      for (var i = 0; i < n && i < 4; i++) {
        var rule = order[i % order.length];
        if (rule === "order") {
          var big = rng.sample([1, 2, 3, 4, 5], rng.int(3, 4)).sort(), pic = rng.pick(["🍎", "🐟", "⭐", "🌸"]);
          out.push({ type: "order", key: "order", prompt: ctx.w("order"), say: ctx.w("order"), ltr: true, items: big.map(function (s) { return { pic: pic, size: 0.5 + s * 0.25 }; }) });
          continue;
        }
        if (rule === "size") {
          var things = rng.sample(SIZED, 4), items = [];
          things.forEach(function (t) { items.push({ pic: t, size: 1.6, basket: "big" }, { pic: t, size: 0.7, basket: "small" }); });
          out.push({ type: "sort", key: "size", prompt: ctx.w("size"), say: ctx.w("size"),
            baskets: [{ pic: "🐘", label: L.big, value: "big" }, { pic: "🐭", label: L.small, value: "small" }], items: rng.shuffle(items).slice(0, 8) });
          continue;
        }
        var table = rule === "colour" ? BY_COLOUR : BY_KIND, groups = rng.sample(Object.keys(table), rng.int(2, 3)), its = [];
        groups.forEach(function (g) { rng.sample(table[g], groups.length === 2 ? 3 : 2).forEach(function (p) { its.push({ pic: p, basket: g }); }); });
        out.push({ type: "sort", key: rule + "-" + groups.join("-"), prompt: ctx.w(rule), say: ctx.w(rule),
          baskets: groups.map(function (g) { return { pic: table[g][0], label: L[g], value: g }; }), items: rng.shuffle(its) });
      }
      return out;
    }
  });

  /* «اول چه، بعد چه؟» — think-seed-p3. The steps of a home task, 3 or 4 pictures, to put in order. Key: the task. */
  var TASKS = {
    hands: [["🚰", "tap"], ["🧼", "soap"], ["💧", "rinse"], ["🧻", "dry"]],
    sandwich: [["🍞", "bread"], ["🧀", "cheese"], ["🥒", "cucumber"], ["😋", "eat"]],
    plant: [["🪣", "fillCan"], ["🌱", "water"], ["🌷", "flower"]],
    teeth: [["🪥", "paste"], ["😁", "brush"], ["💧", "rinseMouth"]],
    dress: [["🧦", "socks"], ["👟", "shoes"], ["🎒", "bag"], ["🚪", "door"]],
    tea: [["🫖", "kettle"], ["🔥", "boil"], ["🍵", "pour"]]
  };
  B.PRACTICE.push({
    id: "think-seed-p3", subject: "think", level: "seed", objectives: ["think.seed.4"], needs: ["think-seed-3"], lessons: ["think-seed-3", "think-seed-8"],
    emoji: "🌻", title: "اول چه، بعد چه؟",
    words: {
      prompt: "کارها را به ترتیب بچین: اول، بعد، آخر",
      steps: { tap: "شیر آب را باز کن", soap: "صابون بزن", rinse: "آب بکش", dry: "خشک کن", bread: "نان", cheese: "پنیر بگذار", cucumber: "خیار بگذار", eat: "بخور",
        fillCan: "آب‌پاش را پر کن", water: "به گیاه آب بده", flower: "گل باز می‌شود", paste: "خمیردندان بزن", brush: "مسواک بزن", rinseMouth: "دهان را آب بکش",
        socks: "جوراب بپوش", shoes: "کفش بپوش", bag: "کیف را بردار", door: "از در برو", kettle: "کتری را آب کن", boil: "آب جوش بیاید", pour: "چای بریز" }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("steps");
      return rng.sample(Object.keys(TASKS), Math.min(n, 4)).map(function (t) {
        return { type: "order", key: t, prompt: ctx.w("prompt"), say: ctx.w("prompt"), numbered: true,
          items: TASKS[t].map(function (s) { return { pic: s[0], label: names[s[1]], say: names[s[1]] }; }) };
      });
    }
  });

  /* «راه را با فلش بساز» — think-seed-p4. Arrow boards 3×3 (4×4 after think-seed-11), 0 or 1 rock, 1 to 4 arrows on
     the shortest way (found by search, so every board can be solved). Key: the board. */
  function arrowBoard(rng, size, rocks, lo, hi) {
    for (var t = 0; t < 200; t++) {
      var b = randomBoard(rng, size, size, rocks), p = shortest(b, false, 8);
      if (p && p.length >= lo && p.length <= hi) { b.solution = p; return b; }
    }
    return null;
  }
  B.PRACTICE.push({
    id: "think-seed-p4", subject: "think", level: "seed", objectives: ["think.seed.6", "think.seed.5"], needs: ["think-seed-4"], lessons: ["think-seed-4", "think-seed-10", "think-seed-11"],
    emoji: "🐢", title: "راه را با فلش بساز",
    words: { prompt: "لاک‌پشت را با فلش‌ها به {name} برسان", names: { "🍓": "توت‌فرنگی", "🥕": "هویج", "🍎": "سیب", "🍐": "گلابی", "🍇": "انگور" } },
    make: function (rng, n, ctx) {
      var big = ctx.done("think-seed-11"), out = [], seen = {}, names = ctx.w("names");
      for (var t = 0; t < 30 && out.length < n; t++) {
        var b = arrowBoard(rng, big && rng() < 0.5 ? 4 : 3, rng.int(0, 1), 1, 4), fruit = rng.pick(FRUIT);
        if (!b || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), size: b.size, start: b.start, goal: b.goal, walls: b.walls, goalPic: fruit, prompt: ctx.w("prompt", { name: names[fruit] }) });
      }
      return out;
    }
  });

  /* «فلش اشتباه را درست کن» — think-seed-p5. A solved arrow board with one arrow changed: run it, see where it goes
     wrong, fix it. Kept only when the changed program really misses. Key: the board. */
  B.PRACTICE.push({
    id: "think-seed-p5", subject: "think", level: "seed", objectives: ["think.seed.7"], needs: ["think-seed-10"], lessons: ["think-seed-10", "think-seed-11"],
    emoji: "🪨", title: "فلش اشتباه را درست کن",
    words: { prompt: "یکی از فلش‌ها اشتباه است. اجرا کن، ببین لاک‌پشت کجا می‌رود و درستش کن." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 40 && out.length < n; t++) {
        var b = arrowBoard(rng, rng() < 0.5 ? 4 : 3, rng.int(0, 1), 2, 4);
        if (!b || seen[sig(b)]) continue;
        var given = b.solution.slice(), i = rng.int(0, given.length - 1);
        given[i] = rng.pick(ARROWS.filter(function (a) { return a !== given[i]; }));
        if (sim(b, given) === "goal") continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), size: b.size, start: b.start, goal: b.goal, walls: b.walls, goalPic: rng.pick(FRUIT), given: given, prompt: ctx.w("prompt") });
      }
      return out;
    }
  });

  /* «مثل هم، فرق دارد» — think-seed-p6. Which one is different (three the same, one changed), and which one is the same
     as this picture; the cat's shadow after think-seed-12. Key: the set. */
  var DIFF = [["🍎", "🍏"], ["🐶", "🐱"], ["🔴", "🟠"], ["⭐", "🌟"], ["🌷", "🌹"], ["🚗", "🚕"], ["🐟", "🐠"], ["🍐", "🍋"]];
  B.PRACTICE.push({
    id: "think-seed-p6", subject: "think", level: "seed", objectives: ["think.seed.3", "think.seed.11"], needs: ["think-seed-6"], lessons: ["think-seed-6", "think-seed-12"],
    emoji: "👀", title: "مثل هم، فرق دارد",
    words: { diff: "کدام فرق دارد؟", same: "کدام درست مثل این است؟", shadow: "سایه گربه کدام است؟" },
    make: function (rng, n, ctx) {
      var out = [];
      rng.sample(DIFF.map(function (d, i) { return i; }), Math.min(n, 5)).forEach(function (i, k) {
        var d = DIFF[i];
        if (k % 2 === 0) {
          // Three the same and one different: tapping any of the three is wrong, so they can share a value.
          out.push({ type: "choose", key: "diff-" + i, prompt: ctx.w("diff"), say: ctx.w("diff"), pic: true, options: rng.shuffle([d[0], d[0], d[0], d[1]]), answer: d[1] });
        } else {
          var other = DIFF[(i + 1) % DIFF.length];
          out.push({ type: "choose", key: "same-" + i, prompt: ctx.w("same"), say: ctx.w("same"), show: d[0], pic: true, options: rng.shuffle([d[0], d[1], other[0]]), answer: d[0] });
        }
      });
      if (ctx.done("think-seed-12") && out.length < n) out.push({ type: "choose", key: "shadow", prompt: ctx.w("shadow"), say: ctx.w("shadow"), show: "🐱", pic: true, options: rng.shuffle(["🐱‍⬛", "🐶", "🐰"]), answer: "🐱‍⬛" });
      return out;
    }
  });

  /* «کدام جور نیست؟» — think-sprout-p1. Four pictures, one does not share the rule (kind, colour, use, where it lives);
     after think-sprout-6 also sorting by two rules at once. Key: the set. */
  var ODD = [
    { same: ["🍎", "🍐", "🍌"], odd: ["🚗", "🪑", "⚽"], rule: "fruit" }, { same: ["🐄", "🐑", "🐔"], odd: ["🪑", "🍌", "🚲"], rule: "animal" },
    { same: ["✏️", "🖍️", "🖌️"], odd: ["🥄", "🍎", "🐟"], rule: "draw" }, { same: ["🐟", "🐳", "🦀"], odd: ["🐦", "🐶", "🐫"], rule: "water" },
    { same: ["🚗", "🚌", "🚲"], odd: ["🍌", "🐔", "🌳"], rule: "ride" }, { same: ["🍓", "🍎", "🍒"], odd: ["🍌", "🥒", "🫐"], rule: "red" }
  ];
  var TWO = [{ pic: "🍎", red: 1, round: 1 }, { pic: "🍓", red: 1, round: 0 }, { pic: "🔵", red: 0, round: 1 }, { pic: "🟥", red: 1, round: 0 }, { pic: "🍊", red: 0, round: 1 },
    { pic: "🍒", red: 1, round: 1 }, { pic: "🍌", red: 0, round: 0 }, { pic: "⚽", red: 0, round: 1 }];
  B.PRACTICE.push({
    id: "think-sprout-p1", subject: "think", level: "sprout", objectives: ["think.spr.1"], needs: ["think-sprout-1"], lessons: ["think-sprout-1", "think-sprout-6", "think-sprout-8"],
    emoji: "🔍", title: "کدام جور نیست؟",
    words: { odd: "کدام جور نیست؟", two: "در سبد اول فقط چیزهایی که هم قرمزند و هم گرد. بقیه در سبد دوم.", yes: "قرمز و گرد", no: "بقیه" },
    make: function (rng, n, ctx) {
      var out = [];
      rng.sample(ODD.map(function (o, i) { return i; }), Math.min(n, 4)).forEach(function (i) {
        var o = ODD[i], odd = rng.pick(o.odd);
        out.push({ type: "choose", key: "odd-" + i + "-" + odd, prompt: ctx.w("odd"), say: ctx.w("odd"), pic: true, options: rng.shuffle(o.same.concat([odd])), answer: odd });
      });
      if (ctx.done("think-sprout-6") && out.length < n) {
        out.push({ type: "sort", key: "two", prompt: ctx.w("two"), say: ctx.w("two"),
          baskets: [{ pic: "🍎", label: ctx.w("yes"), value: "yes" }, { pic: "📦", label: ctx.w("no"), value: "no" }],
          items: rng.sample(TWO, 6).map(function (t) { return { pic: t.pic, basket: t.red && t.round ? "yes" : "no" }; }) });
      }
      return out;
    }
  });

  /* «اگر… آن‌وقت…» — think-sprout-p2. A rule and a situation: what do we do? After think-sprout-7 also rules with
     "not". Key: the rule. */
  var RULES = [["rain", "☂️", ["🕶️", "🏖️"]], ["cold", "🧥", ["🩳", "🩴"]], ["dark", "💡", ["🕶️", "🍦"]], ["thirsty", "💧", ["🍰", "🧸"]],
    ["dirty", "🧼", ["🍫", "🎈"]], ["bell", "🚪", ["🛏️", "🍝"]]];
  B.PRACTICE.push({
    id: "think-sprout-p2", subject: "think", level: "sprout", objectives: ["think.spr.2"], needs: ["think-sprout-2"], lessons: ["think-sprout-2", "think-sprout-7", "think-sprout-8"],
    emoji: "☔", title: "اگر… آن‌وقت…",
    words: {
      rules: { rain: "اگر باران بیاید، چه برداریم؟", cold: "اگر هوا سرد باشد، چه بپوشیم؟", dark: "اگر اتاق تاریک باشد، چه کار کنیم؟", thirsty: "اگر گیاه تشنه باشد، به آن چه بدهیم؟",
        dirty: "اگر دست‌هایمان کثیف باشد، با چه بشوییم؟", bell: "اگر زنگ در را بزنند، کجا برویم؟" },
      not: "قانون: «اگر باران نمی‌آید، چتر لازم نیست.» امروز آفتابی است. چتر برداریم؟", yes: "بله، چتر برمی‌داریم", no: "نه، چتر لازم نیست",
      not2: "قانون: «اگر چیزی میوه نیست، در سبد میوه نمی‌گذاریم.» این را در سبد میوه بگذاریم؟"
    },
    make: function (rng, n, ctx) {
      var R = ctx.w("rules"), out = rng.sample(RULES, Math.min(n, 4)).map(function (r) {
        return { type: "choose", key: r[0], prompt: R[r[0]], say: R[r[0]], pic: true, options: rng.shuffle([r[1]].concat(r[2])), answer: r[1] };
      });
      if (ctx.done("think-sprout-7") && out.length < n) {
        if (rng() < 0.5) out.push({ type: "choose", key: "not", prompt: ctx.w("not"), say: ctx.w("not"), options: [{ label: "☂️ " + ctx.w("yes"), value: "yes" }, { label: "🙂 " + ctx.w("no"), value: "no" }], answer: "no" });
        else {
          var thing = rng.pick(["🚗", "🧦", "🪑"]);
          out.push({ type: "choose", key: "not2", prompt: ctx.w("not2"), say: ctx.w("not2"), show: thing, pic: true, options: [{ label: "✅", value: "yes" }, { label: "❌", value: "no" }], answer: "no" });
        }
      }
      return out;
    }
  });

  /* «الگوی رشد» — think-sprout-p3. Picture patterns that grow by one, and number patterns +1, +2, +10, with one or two
     gaps. Key: the kind and start. */
  B.PRACTICE.push({
    id: "think-sprout-p3", subject: "think", level: "sprout", objectives: ["think.spr.3"], needs: ["think-sprout-3"], lessons: ["think-sprout-3", "think-sprout-8"],
    emoji: "📶", title: "الگوی رشد",
    words: { grow: "هر بار یکی بیشتر. جای خالی را پر کن.", num: "قانون را پیدا کن و جای خالی را پر کن." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < n; t++) {
        if (rng() < 0.4) {
          var p = rng.pick(["🟩", "⭐", "🍎", "🔵"]), a = rng.int(1, 2), seq = [];
          for (var i = 0; i < 4; i++) seq.push(new Array(a + i + 1).join(p));
          var key = "grow-" + p + a;
          if (seen[key]) continue;
          seen[key] = true;
          var blank = rng.int(1, 3);
          out.push({ type: "pattern", key: key, prompt: ctx.w("grow"), say: ctx.w("grow"), ltr: true, seq: seq, blanks: [blank],
            options: rng.shuffle([seq[blank], new Array(a + blank + 2).join(p), new Array(Math.max(2, a + blank)).join(p)]) });
        } else {
          var step = rng.pick([1, 2, 10]), start = step === 10 ? rng.int(1, 9) * 10 : rng.int(1, 12), nums = [];
          for (var j = 0; j < 5; j++) nums.push(start + step * j);
          var k = "num-" + step + "-" + start;
          if (seen[k]) continue;
          seen[k] = true;
          var b = rng.int(2, 4), opts = rng.shuffle([nums[b], nums[b] + step, nums[b] - 1]).filter(function (v, i, a) { return a.indexOf(v) === i; });
          out.push({ type: "pattern", key: k, prompt: ctx.w("num"), say: ctx.w("num"), ltr: true, seq: nums, blanks: [b], options: opts });
        }
      }
      return out;
    }
  });

  /* «برنامه با فلش و دیوار» — think-sprout-p4. 5×5 boards with 1 to 5 walls, 3 to 8 arrows on the shortest way, and a
     block limit of the shortest way plus one (search shows every board can be solved). Key: the board. */
  B.PRACTICE.push({
    id: "think-sprout-p4", subject: "think", level: "sprout", objectives: ["think.spr.4"], needs: ["think-sprout-4"], lessons: ["think-sprout-4", "think-sprout-11", "think-sprout-5", "think-sprout-12"],
    emoji: "🐰", title: "برنامه با فلش و دیوار",
    words: { prompt: "خرگوش را به هویج برسان. حداکثر {n} فلش داری." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 40 && out.length < n; t++) {
        var b = null;
        for (var u = 0; u < 200 && !b; u++) {
          var c = randomBoard(rng, 5, 5, rng.int(1, 5)), p = shortest(c, false, 9);
          if (p && p.length >= 3 && p.length <= 8) { c.solution = p; b = c; }
        }
        if (!b || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        var max = b.solution.length + 1;
        out.push({ type: "code", key: sig(b), hero: "🐰", goalPic: "🥕", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: max, prompt: ctx.w("prompt", { n: fa(max) }) });
      }
      return out;
    }
  });

  /* «اشکال را پیدا کن» — think-sprout-p5. A correct arrow program with one block changed, taken out or added: run it and
     fix it. Kept only when it really misses. Key: the board and the kind of bug. */
  B.PRACTICE.push({
    id: "think-sprout-p5", subject: "think", level: "sprout", objectives: ["think.spr.5"], needs: ["think-sprout-5"], lessons: ["think-sprout-5", "think-sprout-12"],
    emoji: "🐞", title: "اشکال را پیدا کن",
    words: { change: "یک فلش اشتباه است. درستش کن.", gone: "یک فلش کم است. کدام؟", extra: "یک فلش اضافه است. کدام؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 60 && out.length < n; t++) {
        var b = null;
        for (var u = 0; u < 200 && !b; u++) {
          var c = randomBoard(rng, 5, 5, rng.int(1, 4)), p = shortest(c, false, 8);
          if (p && p.length >= 3 && p.length <= 6) { c.solution = p; b = c; }
        }
        if (!b) continue;
        var kind = rng.pick(["change", "gone", "extra"]), g = b.solution.slice(), i = rng.int(0, g.length - 1);
        if (kind === "change") g[i] = rng.pick(ARROWS.filter(function (a) { return a !== g[i]; }));
        else if (kind === "gone") g.splice(i, 1);
        else g.splice(i, 0, rng.pick(ARROWS));
        var key = sig(b) + "#" + kind;
        if (seen[key] || sim(b, g) === "goal") continue;
        seen[key] = true;
        out.push({ type: "code", key: key, hero: "🐰", goalPic: "🥕", size: b.size, start: b.start, goal: b.goal, walls: b.walls, given: g, prompt: ctx.w(kind) });
      }
      return out;
    }
  });

  /* «رمز تصویری» — think-sprout-p6. The code table of think-sprout-13 (🍎 up, 🍌 right, 🍇 down, 🍓 left): read a 3 to 5
     picture message as arrows, or write arrows as pictures. Key: the message. */
  var CODE = { "🍎": "⬆️", "🍌": "➡️", "🍇": "⬇️", "🍓": "⬅️" }, FRUITS = Object.keys(CODE);
  B.PRACTICE.push({
    id: "think-sprout-p6", subject: "think", level: "sprout", objectives: ["think.spr.7"], needs: ["think-sprout-13"], lessons: ["think-sprout-13"],
    emoji: "🗝️", title: "رمز تصویری",
    words: { read: "رمز: 🍎 بالا، 🍌 راست، 🍇 پایین، 🍓 چپ. این پیام کدام برنامه است؟", write: "رمز: 🍎 بالا، 🍌 راست، 🍇 پایین، 🍓 چپ. این برنامه با میوه چه می‌شود؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < n; t++) {
        var len = rng.int(3, 5), msg = [];
        for (var i = 0; i < len; i++) msg.push(rng.pick(FRUITS));
        var key = msg.join("");
        if (seen[key]) continue;
        seen[key] = true;
        // Two wrong answers: one picture changed, and the same pictures in another order (or two changed).
        var w1 = msg.slice(), j = rng.int(0, len - 1);
        w1[j] = rng.pick(FRUITS.filter(function (f) { return f !== msg[j]; }));
        var w2 = msg.slice().reverse();
        if (w2.join("") === key) { w2 = msg.slice(); w2[(j + 1) % len] = rng.pick(FRUITS.filter(function (f) { return f !== msg[(j + 1) % len]; })); }
        var asArrows = function (m) { return m.map(function (f) { return CODE[f]; }).join(""); };
        var read = rng() < 0.5, opts = [msg, w1, w2];
        out.push({ type: "choose", key: key, prompt: ctx.w(read ? "read" : "write"), say: ctx.w(read ? "read" : "write"), show: read ? msg.join("") : asArrows(msg), ltr: true,
          options: rng.shuffle(opts.map(function (m, k) { return { label: read ? asArrows(m) : m.join(""), value: k === 0 ? "right" : "wrong" + k }; })), answer: "right" });
      }
      return out;
    }
  });

  /* «معمای سرنخ» — think-sprout-p7. Three children, three pets, two clues: whose pet is which? Key: the puzzle. */
  var KIDS = ["sara", "arash", "leila", "reza", "mina", "omid"], PETS = ["🐱", "🐶", "🐟", "🐰", "🐦"];
  B.PRACTICE.push({
    id: "think-sprout-p7", subject: "think", level: "sprout", objectives: ["think.spr.13"], needs: ["think-sprout-19"], lessons: ["think-sprout-19"],
    emoji: "🕵️", title: "معمای سرنخ",
    words: {
      names: { sara: "سارا", arash: "آرش", leila: "لیلا", reza: "رضا", mina: "مینا", omid: "امید" },
      pets: { "🐱": "گربه", "🐶": "سگ", "🐟": "ماهی", "🐰": "خرگوش", "🐦": "پرنده" },
      ask: "{a}، {b} و {c} هر کدام یک حیوان دارند: {p}. سرنخ ۱: {k1}. سرنخ ۲: {k2}. حیوان {c} کدام است؟",
      has: "حیوان {who} {pet} است", hasnot: "حیوان {who} {pet} نیست", comma: "، "
    },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), P = ctx.w("pets"), out = [], seen = {};
      for (var t = 0; t < 30 && out.length < n; t++) {
        var kids = rng.sample(KIDS, 3), pets = rng.sample(PETS, 3), key = kids.join("") + pets.join("");
        if (seen[key]) continue;
        seen[key] = true;
        // kid i has pets[i]. Clue 1 says what kid 0 has; clue 2 says what kid 1 doesn't have (so it must be the other).
        var k1 = ctx.w("has", { who: N[kids[0]], pet: P[pets[0]] }), k2 = ctx.w("hasnot", { who: N[kids[1]], pet: P[pets[2]] });
        var ask = ctx.w("ask", { a: N[kids[0]], b: N[kids[1]], c: N[kids[2]], p: pets.map(function (p) { return P[p]; }).join(ctx.w("comma")), k1: k1, k2: k2 });
        out.push({ type: "choose", key: key, prompt: ask, say: ask, pic: true, options: rng.shuffle(pets), answer: pets[2] });
      }
      return out;
    }
  });

  // ---------------- Sapling ----------------
  /* «جلو برو، بچرخ» — think-sapling-p1. Boards for forward and turn blocks, the robot facing any way, walls, a block
     limit (the shortest program plus two). 5×5, and 6×6 after think-sapling-6. Key: the board. */
  B.PRACTICE.push({
    id: "think-sapling-p1", subject: "think", level: "sapling", objectives: ["think.sap.1"], needs: ["think-sapling-2"], lessons: ["think-sapling-2", "think-sapling-6"],
    emoji: "🤖", title: "جلو برو، بچرخ",
    words: { prompt: "ربات {face} است. به ستاره برسانش. حداکثر {n} قطعه داری.", faces: { up: "رو به بالا", down: "رو به پایین", left: "رو به چپ", right: "رو به راست" } },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, F = ctx.w("faces");
      for (var t = 0; t < 40 && out.length < n; t++) {
        var size = ctx.done("think-sapling-6") && rng() < 0.5 ? 6 : 5, b = null;
        for (var u = 0; u < 200 && !b; u++) {
          var c = randomBoard(rng, size, size, rng.int(2, 6));
          c.face = rng.pick(CLOCK);
          var p = shortest(c, true, 12);
          if (p && p.length >= 4 && p.length <= 10) { c.solution = p; b = c; }
        }
        if (!b || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        var max = b.solution.length + 2;
        out.push({ type: "code", key: sig(b), blocks: "turn", face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: max,
          prompt: ctx.w("prompt", { face: F[b.face], n: fa(max) }) });
      }
      return out;
    }
  });

  /* Paths built from a repeating piece: the piece (forward and turn blocks), how many times, a start and a facing. The
     path's squares stay free; some other squares become rocks, and the block limit is the repeat program's size.
     A board is kept only if the repeat program solves it and the plain program does not fit in the limit. */
  var UNITS = [
    { name: "stairs", face: "up", body: ["fwd", "cw", "fwd", "ccw"] },
    { name: "stairs2", face: "up", body: ["fwd", "fwd", "cw", "fwd", "fwd", "ccw"] },
    { name: "down", face: "right", body: ["fwd", "cw", "fwd", "ccw"] },
    { name: "side4", face: "up", body: ["fwd", "fwd", "fwd", "fwd", "cw"] },
    { name: "side3", face: "up", body: ["fwd", "fwd", "fwd", "cw"] },
    { name: "zig", face: "right", body: ["fwd", "fwd", "cw", "fwd", "ccw"] }
  ];
  function trace(b, prog) {
    var st = { x: b.start[0], y: b.start[1], h: b.face }, cells = [b.start.join(",")], ok = true;
    (function run(list) {
      list.forEach(function (op) {
        if (!ok) return;
        if (typeof op !== "string") { for (var k = 0; k < op.repeat; k++) run(op.body); return; }
        if (op === "cw" || op === "ccw") { st.h = CLOCK[(CLOCK.indexOf(st.h) + (op === "cw" ? 1 : 3)) % 4]; return; }
        var d = MOVE[st.h];
        st.x += d[0]; st.y += d[1];
        if (st.x < 0 || st.y < 0 || st.x >= b.size[0] || st.y >= b.size[1]) ok = false;
        cells.push(st.x + "," + st.y);
      });
    })(prog);
    return ok ? { cells: cells, end: [st.x, st.y] } : null;
  }
  function repeatBoard(rng, size) {
    for (var t = 0; t < 100; t++) {
      var u = rng.pick(UNITS), reps = rng.int(2, 4), prog = [{ repeat: reps, body: u.body }];
      var b = { size: [size, size], face: u.face, start: [rng.int(0, size - 1), rng.int(0, size - 1)] };
      var tr = trace(b, prog);
      if (!tr) continue;
      // The goal is where the last forward block ends (a trailing turn changes nothing).
      b.goal = tr.end;
      if (b.goal[0] === b.start[0] && b.goal[1] === b.start[1]) continue;
      var free = {};
      tr.cells.forEach(function (c) { free[c] = true; });
      var others = [];
      for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) if (!free[x + "," + y]) others.push([x, y]);
      b.walls = rng.sample(others, Math.floor(others.length * (0.35 + rng() * 0.3)));
      var max = 1 + u.body.length, plain = shortest(b, true, 16);
      if (sim(b, prog) !== "goal" || (plain && plain.length <= max)) continue;
      b.max = max; b.prog = prog; b.unit = u.name;
      return b;
    }
    return null;
  }
  B.PRACTICE.push({
    id: "think-sapling-p2", subject: "think", level: "sapling", objectives: ["think.sap.2"], needs: ["think-sapling-3"], lessons: ["think-sapling-3", "think-sapling-7", "think-sapling-5", "think-sapling-10", "think-sapling-12"],
    emoji: "🪜", title: "تکه تکراری",
    words: { prompt: "تکه تکراری راه را پیدا کن و داخل «تکرار» بگذار. حداکثر {n} قطعه داری." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < n; t++) {
        var b = repeatBoard(rng, rng() < 0.5 ? 6 : 5);
        if (!b || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), blocks: "turn", repeat: true, face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: b.max,
          prompt: ctx.w("prompt", { n: fa(b.max) }) });
      }
      return out;
    }
  });

  /* «کارآگاه اشکال» — think-sapling-p3. A repeat program that solves its board, with one fault: a wrong turn, a wrong
     count, or a block left outside the repeat. Kept only when it really misses. Key: the board and the fault. */
  B.PRACTICE.push({
    id: "think-sapling-p3", subject: "think", level: "sapling", objectives: ["think.sap.3"], needs: ["think-sapling-5"], lessons: ["think-sapling-5", "think-sapling-11", "think-sapling-12"],
    emoji: "🐛", title: "کارآگاه اشکال",
    words: { turn: "یک چرخش اشتباه است. پیدایش کن و درستش کن.", count: "تعداد تکرار درست نیست. درستش کن.", outside: "یک قطعه جایش اشتباه است. درستش کن." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < n; t++) {
        var b = repeatBoard(rng, 5);
        if (!b) continue;
        var body = b.prog[0].body.slice(), reps = b.prog[0].repeat, kind = rng.pick(["turn", "count", "outside"]), given;
        if (kind === "turn") {
          var turns = body.map(function (op, i) { return op !== "fwd" ? i : -1; }).filter(function (i) { return i >= 0; });
          var i = rng.pick(turns);
          body[i] = body[i] === "cw" ? "ccw" : "cw";
          given = [{ repeat: reps, body: body }];
        } else if (kind === "count") given = [{ repeat: rng() < 0.5 && reps > 2 ? reps - 1 : reps + 1, body: body }];
        else given = [{ repeat: reps, body: body.slice(0, -1) }, body[body.length - 1]];
        var key = sig(b) + "#" + kind;
        if (seen[key] || sim(b, given) === "goal") continue;
        seen[key] = true;
        out.push({ type: "code", key: key, blocks: "turn", repeat: true, face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls,
          max: Math.max(b.max, count(given)), given: given, prompt: ctx.w(kind) });
      }
      return out;
    }
  });

  /* «مرتب کن، پیدا کن» — think-sapling-p4. Numbers to put in order; which two neighbours to swap first; and (after
     think-sapling-8) which card to look at first, or next, in a sorted row. Key: the kind and the numbers. */
  B.PRACTICE.push({
    id: "think-sapling-p4", subject: "think", level: "sapling", objectives: ["think.sap.4", "think.sap.5"], needs: ["think-sapling-4"], lessons: ["think-sapling-4", "think-sapling-8", "think-sapling-9"],
    emoji: "🃏", title: "مرتب کن، پیدا کن",
    words: {
      order: "از کوچک به بزرگ بچین", swap: "با جابه‌جا کردن دوتای کنار هم مرتب می‌کنیم و از اول ردیف شروع می‌کنیم. اولین دو عددی که باید جایشان عوض شود کدام‌اند؟",
      and: "{a} و {b}", first: "این کارت‌ها مرتب‌اند و دنبال {x} هستیم. اول کدام کارت را نگاه کنیم؟",
      next: "دنبال {x} هستیم. کارت وسط {m} بود. حالا کدام کارت را نگاه کنیم؟"
    },
    make: function (rng, n, ctx) {
      var out = [], kinds = ["order", "swap"];
      if (ctx.done("think-sapling-8")) kinds.push("first", "next");
      for (var i = 0; i < n && i < 5; i++) {
        var kind = kinds[i % kinds.length];
        if (kind === "order") {
          var nums = rng.sample([2, 3, 5, 7, 8, 11, 13, 15, 18, 20, 24, 27, 31, 36, 40], 5).sort(function (a, b) { return a - b; });
          out.push({ type: "order", key: "order-" + nums.join("-"), prompt: ctx.w("order"), ltr: true, items: nums });
        } else if (kind === "swap") {
          var row = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4), first = -1;
          for (var j = 0; j < 3; j++) if (row[j] > row[j + 1]) { first = j; break; }
          if (first < 0) { row = [row[1], row[0]].concat(row.slice(2)); first = row[0] > row[1] ? 0 : -1; if (first < 0) continue; }
          var opts = [0, 1, 2].map(function (k) { return { label: ctx.w("and", { a: fa(row[k]), b: fa(row[k + 1]) }), value: String(k) }; });
          out.push({ type: "choose", key: "swap-" + row.join(""), prompt: ctx.w("swap"), say: ctx.w("swap"), show: row.map(fa).join("  "), ltr: true, options: opts, answer: String(first) });
        } else {
          var start = rng.int(1, 5), stp = rng.int(2, 4), sorted = [];
          for (var k = 0; k < 7; k++) sorted.push(start + stp * k);
          var mid = sorted[3], x = rng.pick(sorted.filter(function (v) { return v !== mid; }));
          if (kind === "first") {
            out.push({ type: "choose", key: "first-" + sorted.join("-"), prompt: ctx.w("first", { x: fa(x) }), say: ctx.w("first", { x: fa(x) }), show: sorted.map(fa).join("  "), ltr: true,
              options: rng.shuffle([sorted[0], mid, sorted[6]]).map(function (v) { return { label: fa(v), value: v }; }), answer: mid });
          } else {
            var half = x > mid ? sorted.slice(4) : sorted.slice(0, 3), m2 = half[1];
            out.push({ type: "choose", key: "next-" + sorted.join("-") + "-" + x, prompt: ctx.w("next", { x: fa(x), m: fa(mid) }), say: ctx.w("next", { x: fa(x), m: fa(mid) }),
              show: sorted.map(fa).join("  "), ltr: true, options: rng.shuffle([half[0], m2, half[2]]).map(function (v) { return { label: fa(v), value: v }; }), answer: m2 });
          }
        }
      }
      return out;
    }
  });

  /* «و، یا» — think-sapling-p5. Pictures with two properties and an "and" or "or" rule: sort them. Key: the rule. */
  var THINGS = [
    { pic: "🍎", c: "red", k: "fruit" }, { pic: "🍓", c: "red", k: "fruit" }, { pic: "🍒", c: "red", k: "fruit" }, { pic: "🚗", c: "red", k: "toy" },
    { pic: "🍌", c: "yellow", k: "fruit" }, { pic: "🍋", c: "yellow", k: "fruit" }, { pic: "⭐", c: "yellow", k: "toy" }, { pic: "🐥", c: "yellow", k: "animal" },
    { pic: "🍐", c: "green", k: "fruit" }, { pic: "🐸", c: "green", k: "animal" }, { pic: "🦖", c: "green", k: "toy" }, { pic: "🐳", c: "blue", k: "animal" },
    { pic: "🧸", c: "brown", k: "toy" }, { pic: "🐶", c: "brown", k: "animal" }
  ];
  B.PRACTICE.push({
    id: "think-sapling-p5", subject: "think", level: "sapling", objectives: ["think.sap.15"], needs: ["think-sapling-13"], lessons: ["think-sapling-13"],
    emoji: "🟥", title: "«و» و «یا»",
    words: {
      prompt: "سبد اول: چیزهایی که «{rule}»اند. بقیه در جعبه.", and: "{a} و {b}", or: "{a} یا {b}", rest: "بقیه",
      props: { red: "قرمز", yellow: "زرد", green: "سبز", blue: "آبی", brown: "قهوه‌ای", fruit: "میوه", animal: "حیوان", toy: "اسباب‌بازی" }
    },
    make: function (rng, n, ctx) {
      var P = ctx.w("props"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < n && out.length < 4; t++) {
        var c = rng.pick(["red", "yellow", "green"]), k = rng.pick(["fruit", "animal", "toy"]), op = rng.pick(["and", "or"]), key = op + "-" + c + "-" + k;
        if (seen[key]) continue;
        seen[key] = true;
        var fits = function (th) { return op === "and" ? th.c === c && th.k === k : th.c === c || th.k === k; };
        var yes = rng.shuffle(THINGS.filter(fits)), no = rng.shuffle(THINGS.filter(function (th) { return !fits(th); }));
        if (!yes.length || no.length < 2) continue;
        var items = yes.slice(0, 3).concat(no.slice(0, 6 - Math.min(3, yes.length)));
        var rule = ctx.w(op, { a: P[c], b: P[k] }), prompt = ctx.w("prompt", { rule: rule });
        out.push({ type: "sort", key: key, prompt: prompt, say: prompt,
          baskets: [{ pic: "🧺", label: rule, value: "yes" }, { pic: "📦", label: ctx.w("rest"), value: "no" }],
          items: rng.shuffle(items).map(function (th) { return { pic: th.pic, basket: fits(th) ? "yes" : "no" }; }) });
      }
      return out;
    }
  });

  /* «معمای جدول» — think-sapling-p6. Who eats what, three animals and three foods and two clues, in a logic grid; and
     the river crossing with other animals, its moves to put in order. Key: the puzzle. */
  var EATERS = [["🐰", "🥕"], ["🐱", "🐟"], ["🐔", "🌾"], ["🐶", "🦴"], ["🐒", "🍌"], ["🐮", "🌿"]];
  var RIVERS = [["🐺", "🐐", "🥬"], ["🐶", "🐔", "🌾"], ["🦊", "🐥", "🌽"]];
  B.PRACTICE.push({
    id: "think-sapling-p6", subject: "think", level: "sapling", objectives: ["think.sap.14"], needs: ["think-sapling-14"], lessons: ["think-sapling-14", "think-sapling-24"],
    emoji: "🐐", title: "معمای جدول",
    words: {
      names: { "🐰": "خرگوش", "🐱": "گربه", "🐔": "مرغ", "🐶": "سگ", "🐒": "میمون", "🐮": "گاو", "🥕": "هویج", "🐟": "ماهی", "🌾": "دانه", "🦴": "استخوان", "🍌": "موز", "🌿": "علف",
        "🐺": "گرگ", "🐐": "بز", "🥬": "کلم", "🦊": "روباه", "🐥": "جوجه", "🌽": "ذرت" },
      grid: "هر حیوان یکی از این خوراکی‌ها را می‌خورد. با سرنخ‌ها جدول را پر کن: ✓ برای «می‌خورد» و ✗ برای «نمی‌خورد».",
      eats: "{a} {f} می‌خورد.", noteats: "{a} {f} نمی‌خورد.",
      river: "کشاورز باید {x}، {y} و {z} را با قایق ببرد. {x} را نباید با {y} تنها گذاشت و {y} را نباید با {z}. کارها را به ترتیب بچین.",
      take: "{t} را می‌برد", swap: "{t} را می‌برد و {u} را برمی‌گرداند", again: "{t} را دوباره می‌برد"
    },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < n && out.length < 4; t++) {
        if (rng() < 0.7) {
          var three = rng.sample(EATERS, 3), key = three.map(function (e) { return e[0]; }).join("");
          if (seen[key]) continue;
          seen[key] = true;
          // Animal 0 eats food 0 (clue 1); animal 1 doesn't eat food 2 (clue 2), so it eats food 1; animal 2 eats food 2.
          // The foods are shown in a shuffled order, so the answer is not always the diagonal.
          var cols = rng.shuffle([0, 1, 2]), q = ctx.w("grid");
          out.push({ type: "logicgrid", key: key, prompt: q, say: q,
            rows: three.map(function (e) { return { pic: e[0], label: N[e[0]] }; }), cols: cols.map(function (j) { return { pic: three[j][1], label: N[three[j][1]] }; }),
            clues: [cap(ctx.w("eats", { a: N[three[0][0]], f: N[three[0][1]] })), cap(ctx.w("noteats", { a: N[three[1][0]], f: N[three[2][1]] }))],
            answer: [0, 1, 2].map(function (i) { return cols.indexOf(i); }) });
        } else {
          var r = rng.pick(RIVERS), rk = "river-" + r[0];
          if (seen[rk]) continue;
          seen[rk] = true;
          var x = N[r[0]], y = N[r[1]], z = N[r[2]], s = ctx.w("river", { x: x, y: y, z: z });
          out.push({ type: "order", key: rk, prompt: s, say: s, numbered: true, items: [
            { pic: r[1], label: cap(ctx.w("take", { t: y })) }, { pic: r[0], label: cap(ctx.w("swap", { t: x, u: y })) },
            { pic: r[2], label: cap(ctx.w("take", { t: z })) }, { pic: r[1], label: cap(ctx.w("again", { t: y })) }] });
        }
      }
      return out;
    }
  });

  /* «تصویر با مربع» — think-sapling-p7. 8 × 8 pictures and their number codes: colour the picture from the code, or
     pick the code of a marked row. Key: the picture and the kind. */
  var PICS = {
    heart: ["01100110", "11111111", "11111111", "11111111", "01111110", "00111100", "00011000", "00000000"],
    house: ["00011000", "00111100", "01111110", "11111111", "01111110", "01100110", "01100110", "01111110"],
    smile: ["00111100", "01000010", "10100101", "10000001", "10100101", "10011001", "01000010", "00111100"],
    tree: ["00011000", "00111100", "01111110", "11111111", "00111100", "01111110", "00011000", "00011000"],
    arrow: ["00011000", "00111100", "01111110", "11011011", "00011000", "00011000", "00011000", "00011000"],
    boat: ["00010000", "00011000", "00011100", "00011110", "00010000", "11111111", "01111110", "00111100"],
    cat: ["10000001", "11000011", "11111111", "10111101", "11111111", "11100111", "01111110", "00111100"],
    key: ["01110000", "10001000", "10001000", "01111111", "00010101", "00000000", "00000000", "00000000"]
  };
  var PCOL = { heart: "#e03131", house: "#c4673a", smile: "#f2c14e", tree: "#2f9e44", arrow: "#1c7ed6", boat: "#5b6b9a", cat: "#3d2c22", key: "#c9a227" };
  B.PRACTICE.push({
    id: "think-sapling-p7", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-15"], lessons: ["think-sapling-15", "think-sapling-16"],
    emoji: "🖼️", title: "تصویر با مربع",
    words: { paint: "این رمز یک تصویر است: ۰ سفید، ۱ رنگی. مربع‌ها را رنگ کن.", read: "رمز ردیف نشان‌دار کدام است؟", white: "سفید", colour: "رنگی" },
    make: function (rng, n, ctx) {
      return rng.sample(Object.keys(PICS), Math.min(n, 3)).map(function (k) {
        var pic = PICS[k], colors = ["#ffffff", PCOL[k]], names = [ctx.w("white"), ctx.w("colour")];
        if (rng() < 0.4) return { type: "pixels", key: "paint-" + k, prompt: ctx.w("paint"), say: ctx.w("paint"), colors: colors, names: names, pic: pic, done: [0, 1, 2, 3] };
        var rows = pic.map(function (r, i) { return i; }).filter(function (i) { return /1/.test(pic[i]) && pic.indexOf(pic[i]) === i; });
        var row = rng.pick(rows), others = rng.sample(pic.filter(function (r) { return r !== pic[row]; }).filter(function (r, i, a) { return a.indexOf(r) === i; }), 2);
        return { type: "pixels", mode: "read", key: "read-" + k + "-" + row, prompt: ctx.w("read"), say: ctx.w("read"), colors: colors, pic: pic, row: row, options: rng.shuffle([pic[row]].concat(others)) };
      });
    }
  });

  /* «امن بمان» — think-sapling-p8. Short situations (a site asks for your address, a friend asks your password, the
     screen time is over…) and what to do; passwords after think-sapling-22, screen time after think-sapling-23.
     Key: the situation. */
  var SAFE = [["address", "think-sapling-21"], ["school", "think-sapling-21"], ["photo", "think-sapling-21"], ["prize", "think-sapling-21"],
    ["friendpw", "think-sapling-22"], ["logout", "think-sapling-22"], ["weakpw", "think-sapling-22"], ["timeup", "think-sapling-23"], ["tired", "think-sapling-23"]];
  B.PRACTICE.push({
    id: "think-sapling-p8", subject: "think", level: "sapling", objectives: ["think.sap.12"], needs: ["think-sapling-21"], lessons: ["think-sapling-21", "think-sapling-22", "think-sapling-23", "think-sapling-27"],
    emoji: "🛡️", title: "امن بمان",
    words: {
      q: { address: "یک بازی نشانی خانه‌ات را می‌خواهد. چه کار کنیم؟", school: "کسی در یک بازی می‌پرسد مدرسه‌ات کجاست. چه کار کنیم؟", photo: "می‌خواهی عکسی بفرستی که جلوی خانه‌تان در آن پیداست. چه کار کنیم؟",
        prize: "یک سایت می‌گوید: «اسم کاملت را بنویس تا جایزه ببری!» چه کار کنیم؟", friendpw: "دوستت رمز تبلتت را می‌خواهد. چه کار کنیم؟", logout: "کارت با رایانه کتابخانه تمام شد. آخرش چه کار کنیم؟",
        weakpw: "کدام رمز را سخت‌تر می‌شود حدس زد؟", timeup: "وقت صفحه‌ات تمام شد ولی بازی نیمه‌کاره است. چه کار کنیم؟", tired: "مدت زیادی به صفحه نگاه کرده‌ای و چشم‌هایت خسته است. چه کار کنیم؟" },
      good: { address: "اول از پدر یا مادر می‌پرسیم", school: "نمی‌گوییم و به پدر یا مادر خبر می‌دهیم", photo: "اول با پدر یا مادر حرف می‌زنیم", prize: "نمی‌نویسیم و از پدر یا مادر می‌پرسیم",
        friendpw: "رمز را فقط پدر و مادرم می‌دانند", logout: "«خروج» را می‌زنیم", weakpw: "حرف‌های اول جمله‌ای که فقط خودم می‌دانم", timeup: "صفحه را خاموش می‌کنیم و فردا ادامه می‌دهیم", tired: "صفحه را خاموش می‌کنیم و بازی دیگری می‌کنیم" },
      bad: { address: "زود نشانی را می‌نویسیم", school: "اسم مدرسه را می‌گوییم", photo: "زود می‌فرستیم", prize: "زود اسم کامل را می‌نویسیم", friendpw: "رمز را به او می‌گوییم",
        logout: "همین‌طور می‌رویم", weakpw: "۱۲۳۴", timeup: "یواشکی ادامه می‌دهیم", tired: "یک بازی دیگر شروع می‌کنیم" }
    },
    make: function (rng, n, ctx) {
      var Q = ctx.w("q"), G = ctx.w("good"), W = ctx.w("bad");
      var open = SAFE.filter(function (s) { return ctx.done(s[1]); }).map(function (s) { return s[0]; });
      return rng.sample(open, Math.min(n, 4)).map(function (k) {
        return { type: "choose", key: k, prompt: Q[k], say: Q[k], options: rng.shuffle([{ label: G[k], value: "good" }, { label: W[k], value: "bad" }]), answer: "good" };
      });
    }
  });

  // ---------------- Tree ----------------
  /* Boards for one program with a condition: the robot starts in a bottom corner facing up and goes forward until the
     way ahead is blocked, then turns right ("if blocked ahead: turn right, else forward"), or turns left (from the
     other corner: "if open ahead: forward, else turn left"). The goal is a square that program reaches, so the same
     program solves every board. iters: how many times the condition box runs before the robot gets there. */
  function followBoards(rng, k, left, size) {
    var boards = [];
    for (var t = 0; t < 200 && boards.length < k; t++) {
      var b = { size: [size, size], start: [left ? size - 1 : 0, size - 1], face: "up", walls: [] };
      var cells = [];
      for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) if (x !== b.start[0] || y !== b.start[1]) cells.push([x, y]);
      b.walls = rng.sample(cells, rng.int(1, 3));
      var w = wallSet(b), st = { x: b.start[0], y: b.start[1], h: "up" }, visits = [], moves = 0;
      for (var i = 0; i < 14; i++) {
        var d = MOVE[st.h], nx = st.x + d[0], ny = st.y + d[1];
        if (nx < 0 || ny < 0 || nx >= size || ny >= size || w[nx + "," + ny]) st.h = CLOCK[(CLOCK.indexOf(st.h) + (left ? 3 : 1)) % 4];
        else { st.x = nx; st.y = ny; moves++; visits.push({ x: nx, y: ny, i: i, moves: moves }); }
      }
      // A square first reached after at least four moves (the run stops the first time it gets there).
      var firsts = visits.filter(function (v, j) { return v.moves >= 4 && !visits.slice(0, j).some(function (o) { return o.x === v.x && o.y === v.y; }); });
      if (!firsts.length) continue;
      var g = rng.pick(firsts);
      b.goal = [g.x, g.y];
      b.iters = g.i + 1;
      if (boards.some(function (o) { return sig(o) === sig(b); })) continue;
      boards.push(b);
    }
    return boards.length === k ? boards : null;
  }
  B.PRACTICE.push({
    id: "think-tree-p1", subject: "think", level: "tree", objectives: ["think.tree.1", "think.tree.3"], needs: ["think-tree-1"],
    emoji: "🧱", title: "یک برنامه، چند زمین",
    words: { right: "یک برنامه برای همه زمین‌ها بساز: وقتی جلو بسته بود، به راست بچرخ؛ وگرنه جلو برو.", left: "یک برنامه برای همه زمین‌ها بساز: وقتی جلو باز بود، جلو برو؛ وگرنه به چپ بچرخ." },
    make: function (rng, n, ctx) {
      var out = [], until = ctx.done("think-tree-5");
      for (var t = 0; t < 10 && out.length < Math.min(n, 3); t++) {
        var left = rng() < 0.4, size = rng.int(4, 5), boards = followBoards(rng, 3, left, size);
        if (!boards) continue;
        var step = { type: "code", key: boards.map(sig).join("/"), blocks: "turn", "if": left ? "open" : "wall", nest: true, goalPic: "⭐", size: [size, size],
          boards: boards.map(function (b) { return { start: b.start, face: "up", goal: b.goal, walls: b.walls }; }), prompt: ctx.w(left ? "left" : "right") };
        // Before think-tree-5 a repeat box (its count can go up to the longest board's need); after it, "repeat until".
        if (until) step.until = "goal";
        else { step.repeat = true; step.maxRepeat = Math.max(9, Math.max.apply(null, boards.map(function (b) { return b.iters; }))); }
        out.push(step);
      }
      return out;
    }
  });

  /* «دستور تازه» — think-tree-p2. Boards made of one shape repeated (a step of stairs, a corner): a new block for the
     shape, used several times, meets the block limit; the plain program does not. Key: the board. */
  B.PRACTICE.push({
    id: "think-tree-p2", subject: "think", level: "tree", objectives: ["think.tree.5"], needs: ["think-tree-2"],
    emoji: "⭐", title: "دستور تازه",
    words: { prompt: "تکه‌ای را که تکرار می‌شود «دستور تازه» (⭐) کن و چند بار به کار ببر. حداکثر {n} قطعه داری." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < n && out.length < 3; t++) {
        var b = repeatBoard(rng, rng() < 0.5 ? 6 : 5);
        if (!b || seen[sig(b)]) continue;
        var reps = b.prog[0].repeat, unit = b.prog[0].body.length, max = unit + reps;
        var plain = shortest(b, true, 20);
        if (plain && plain.length <= max) continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), blocks: "turn", fn: true, face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: max,
          prompt: ctx.w("prompt", { n: fa(max) }) });
      }
      return out;
    }
  });

  /* «شمارنده» — think-tree-p3. Pick exactly n apples and count them: apples in a row, or scattered with gaps (then «اگر
     اینجا سیب بود» helps). Key: the row. */
  B.PRACTICE.push({
    id: "think-tree-p3", subject: "think", level: "tree", objectives: ["think.tree.4"], needs: ["think-tree-6"],
    emoji: "🔢", title: "شمارنده",
    words: { row: "ربات باید دقیقاً {n} سیب بردارد و درست بشمارد.", gaps: "سیب‌ها پراکنده‌اند. ربات باید دقیقاً {n} سیب بردارد و درست بشمارد." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < n && out.length < 3; t++) {
        var len = rng.int(6, 8), target = rng.int(2, 4), gaps = rng() < 0.5, apples = [];
        if (gaps) { var xs = rng.sample([1, 2, 3, 4, 5, 6, 7].filter(function (x) { return x < len; }), Math.min(len - 1, target + rng.int(1, 2))); xs.sort(function (a, b) { return a - b; }); apples = xs.map(function (x) { return [x, 0]; }); }
        else for (var x = 1; x < len; x++) apples.push([x, 0]);
        if (apples.length < target) continue;
        var key = len + ":" + apples.map(function (a) { return a[0]; }).join(",") + ":" + target;
        if (seen[key]) continue;
        seen[key] = true;
        var step = { type: "code", key: key, blocks: "turn", pick: true, counter: true, until: "count", target: target, size: [len, 1],
          boards: [{ start: [0, 0], face: "right", apples: apples }], prompt: ctx.w(gaps ? "gaps" : "row", { n: fa(target) }) };
        if (gaps) { step["if"] = "apple"; step.nest = true; }
        out.push(step);
      }
      return out;
    }
  });

  /* «قلم و زاویه» — think-tree-p4. Shapes to draw with the turtle: polygons of 3 to 8 sides, a star, rosettes of
     squares or triangles; finding the angle is the puzzle. Key: the shape. */
  var SHAPES = {
    tri: [{ repeat: 3, body: [["fd", 80], ["rt", 120]] }], square: [{ repeat: 4, body: [["fd", 60], ["rt", 90]] }], pent: [{ repeat: 5, body: [["fd", 60], ["rt", 72]] }],
    hex: [{ repeat: 6, body: [["fd", 40], ["rt", 60]] }], oct: [{ repeat: 8, body: [["fd", 30], ["rt", 45]] }], star: [{ repeat: 5, body: [["fd", 80], ["rt", 144]] }],
    rose4: [{ repeat: 4, body: [{ repeat: 4, body: [["fd", 40], ["rt", 90]] }, ["rt", 90]] }],
    rose6: [{ repeat: 6, body: [{ repeat: 4, body: [["fd", 40], ["rt", 90]] }, ["rt", 60]] }],
    tri8: [{ repeat: 8, body: [{ repeat: 3, body: [["fd", 40], ["rt", 120]] }, ["rt", 45]] }]
  };
  var STARTS = { tri: [60, 150], square: [70, 150], pent: [70, 160], hex: [80, 150], oct: [80, 170], star: [70, 140], rose4: [100, 100], rose6: [100, 100], tri8: [100, 100] };
  B.PRACTICE.push({
    id: "think-tree-p4", subject: "think", level: "tree", objectives: ["think.tree.6"], needs: ["think-tree-7"],
    emoji: "🐢", title: "قلم و زاویه",
    words: { prompt: "شکل کم‌رنگ را با لاک‌پشت بکش. زاویه چرخش را پیدا کن." },
    make: function (rng, n, ctx) {
      return rng.sample(Object.keys(SHAPES), Math.min(n, 3)).map(function (k) {
        return { type: "turtle", key: k, prompt: ctx.w("prompt"), say: ctx.w("prompt"), goal: SHAPES[k], start: STARTS[k] };
      });
    }
  });

  /* «روندنما» — think-tree-p5. Flowcharts to follow (with how many times the question answers "no" chosen at random)
     and flowcharts with one or two gaps to fill. Key: the chart and the kind. */
  var CHARTS = {
    tea: { nodes: ["start", "fill", "boil?", "pour", "end"], facts: ["notYet", "steam"] },
    plant: { nodes: ["start", "look", "dry?", "water", "end"], facts: ["wet", "dry"] },
    street: { nodes: ["start", "stop", "green?", "cross", "end"], facts: ["red", "green"] },
    count: { nodes: ["start", "add", "ten?", "say", "end"], facts: ["less", "ten"] }
  };
  B.PRACTICE.push({
    id: "think-tree-p5", subject: "think", level: "tree", objectives: ["think.tree.7"], needs: ["think-tree-8"],
    emoji: "🫖", title: "روندنما",
    words: {
      follow: "این روندنما را دنبال کن و به سؤال‌ها با توجه به چیزی که اتفاق می‌افتد جواب بده.", fill: "جاهای خالی روندنما را پر کن.", other: "کفش‌ها را بپوش",
      text: { start: "شروع", end: "پایان", fill: "کتری را آب کن و روی گاز بگذار", "boil?": "آب جوش آمد؟", pour: "چای را دم کن", look: "به خاک گلدان دست بزن", "dry?": "خاک خشک است؟",
        water: "به گلدان آب بده", stop: "کنار خیابان بایست", "green?": "چراغ عابر سبز است؟", cross: "با دقت از خیابان رد شو", add: "یکی به عدد اضافه کن", "ten?": "عدد ۱۰ شد؟", say: "بگو «رسیدم!»" },
      facts: { notYet: "هنوز بخاری بلند نشده.", steam: "بخار بلند شد و کتری قل‌قل می‌کند.", wet: "خاک هنوز خیس است؛ فردا دوباره نگاه می‌کنیم.", dry: "خاک خشک و ترک‌خورده است.",
        red: "چراغ عابر قرمز است.", green: "چراغ عابر سبز شد.", less: "عدد هنوز کمتر از ۱۰ است.", ten: "عدد ۱۰ شد." }
    },
    make: function (rng, n, ctx) {
      var X = ctx.w("text"), F = ctx.w("facts");
      return rng.sample(Object.keys(CHARTS), Math.min(n, 3)).map(function (k) {
        var c = CHARTS[k], ids = c.nodes;
        // The question loops: for "plant", "no" means "wet: look again tomorrow" (back to look); otherwise wait and ask again.
        var nodes = ids.map(function (id, i) {
          var nd = { id: "n" + i, kind: id === "start" ? "start" : id === "end" ? "end" : /\?$/.test(id) ? "ask" : "do", text: X[id] };
          if (nd.kind === "ask") nd.no = k === "plant" || k === "count" ? "n1" : "n" + i;
          return nd;
        });
        if (k === "plant") { nodes[2].no = "n4"; nodes[2].yes = "n3"; nodes[3].next = "n4"; }
        if (rng() < 0.5) {
          var blanks = rng.sample([1, 3], rng.int(1, 2));
          blanks.forEach(function (i) { nodes[i].blank = true; });
          return { type: "flowchart", mode: "fill", key: "fill-" + k + "-" + blanks.join(""), prompt: ctx.w("fill"), say: ctx.w("fill"), nodes: nodes,
            options: rng.shuffle(blanks.map(function (i) { return nodes[i].text; }).concat([ctx.w("other")])) };
        }
        var nos = k === "plant" ? 0 : rng.int(0, 3), visits = [];
        for (var i = 0; i < nos; i++) visits.push({ answer: "no", fact: F[c.facts[0]] });
        if (k === "plant") visits = [{ answer: rng() < 0.5 ? "yes" : "no", fact: "" }], visits[0].fact = visits[0].answer === "yes" ? F.dry : F.wet;
        else visits.push({ answer: "yes", fact: F[c.facts[1]] });
        return { type: "flowchart", key: "follow-" + k + "-" + nos, prompt: ctx.w("follow"), say: ctx.w("follow"), nodes: nodes, visits: visits };
      });
    }
  });

  /* «عددهای دودویی» — think-tree-p6. Numbers to make with the dot cards, cards to read, and a short secret word in binary
     (a number for each letter). Key: the kind and the number or word. */
  var WORDS_FA = ["باد", "سرد", "نان", "دود", "مار", "سبد"], WORDS_EN = ["BAD", "CAT", "DOG", "SUN", "HAT", "BED"];
  var FA_ABC = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوه";
  B.PRACTICE.push({
    id: "think-tree-p6", subject: "think", level: "tree", objectives: ["think.tree.11"], needs: ["think-tree-11"],
    emoji: "💡", title: "عددهای دودویی",
    words: { make: "کارت‌ها را رو یا پشت کن تا {n} شود.", read: "این کارت‌ها چه عددی را نشان می‌دهند؟", secret: "رمز: ا = ۱، ب = ۲، پ = ۳، … (به ترتیب الفبا). هر حرف یک عدد دودویی است؛ از چپ به راست بخوان. این پیام چه کلمه‌ای است؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, en = ctx.lang === "en";
      for (var t = 0; t < 30 && out.length < n && out.length < 4; t++) {
        var kind = rng.pick(["make", "read", "read", "secret"]);
        if (kind === "secret") {
          var wi = rng.int(0, WORDS_FA.length - 1), word = en ? WORDS_EN[wi] : WORDS_FA[wi], abc = en ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : FA_ABC;
          var others = rng.sample([0, 1, 2, 3, 4, 5].filter(function (j) { return j !== wi; }), 2);
          if (seen["s" + wi]) continue;
          seen["s" + wi] = true;
          var code = Array.from(word).map(function (ch) { var v = abc.indexOf(ch) + 1; return ("00000" + v.toString(2)).slice(-5); }).join("  ");
          out.push({ type: "choose", key: "secret-" + wi, prompt: ctx.w("secret"), say: ctx.w("secret"), show: code, ltr: true,
            options: rng.shuffle([wi].concat(others)).map(function (j) { return { label: en ? WORDS_EN[j] : WORDS_FA[j], value: j }; }), answer: wi });
          continue;
        }
        var v = rng.int(1, 31), key = kind + "-" + v;
        if (seen[key]) continue;
        seen[key] = true;
        if (kind === "make") out.push({ type: "binary", key: key, prompt: ctx.w("make", { n: fa(v) }), say: ctx.w("make", { n: fa(v) }), target: v, bits: true, sum: v < 16 });
        else {
          var bits = ("00000" + v.toString(2)).slice(-5), wrong = rng.sample([1, 2, 3, 4, 5, 6, 7, 8].map(function (d) { return v + (rng() < 0.5 ? d : -d); }).filter(function (x) { return x > 0 && x < 32 && x !== v; }), 2);
          out.push({ type: "binary", mode: "read", key: key, prompt: ctx.w("read"), say: ctx.w("read"), bits: bits, options: rng.shuffle([v].concat(wrong)) });
        }
      }
      return out;
    }
  });

  /* «سودوکو و جدول منطقی» — think-tree-p7. 4×4 and 6×6 sudoku (a valid grid, shuffled, with cells taken away while the
     answer stays the only one) and 4×4 logic grids whose clues allow only one answer. Key: the puzzle. */
  function sudokuBase(size) {
    var bw = size === 6 ? 3 : 2, bh = 2, g = [];
    for (var r = 0; r < size; r++) { var row = []; for (var c = 0; c < size; c++) row.push(((r % bh) * bw + Math.floor(r / bh) + c) % size + 1); g.push(row); }
    return g;
  }
  function solveCount(g, size, limit) {
    var bw = size === 6 ? 3 : 2, bh = 2, found = 0;
    (function go() {
      if (found >= limit) return;
      for (var r = 0; r < size; r++) for (var c = 0; c < size; c++) if (!g[r][c]) {
        for (var v = 1; v <= size; v++) {
          var ok = true;
          for (var i = 0; i < size && ok; i++) if (g[r][i] === v || g[i][c] === v) ok = false;
          var r0 = r - r % bh, c0 = c - c % bw;
          for (var a = 0; a < bh && ok; a++) for (var b2 = 0; b2 < bw && ok; b2++) if (g[r0 + a][c0 + b2] === v) ok = false;
          if (ok) { g[r][c] = v; go(); g[r][c] = 0; }
        }
        return;
      }
      found++;
    })();
    return found;
  }
  var LG_KIDS = ["sara", "reza", "mina", "arash", "leila", "omid"], LG_PETS = ["🐱", "🐶", "🐟", "🐰", "🐦"];
  B.PRACTICE.push({
    id: "think-tree-p7", subject: "think", level: "tree", objectives: ["think.tree.22"], needs: ["think-tree-22"],
    emoji: "🧮", title: "سودوکو و جدول منطقی",
    words: {
      s4: "سودوکو ۴ در ۴: در هر ردیف، هر ستون و هر قسمت، ۱ تا ۴ هر کدام یک بار می‌آیند.", s6: "سودوکو ۶ در ۶: در هر ردیف، هر ستون و هر قسمت، ۱ تا ۶ هر کدام یک بار می‌آیند.",
      grid: "چهار بچه، چهار حیوان. با سرنخ‌ها جدول را پر کن.",
      has: "{who} {pet} دارد.", hasnot: "{who} {pet} ندارد.",
      names: { sara: "سارا", reza: "رضا", mina: "مینا", arash: "آرش", leila: "لیلا", omid: "امید" },
      pets: { "🐱": "گربه", "🐶": "سگ", "🐟": "ماهی", "🐰": "خرگوش", "🐦": "پرنده" }
    },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 10 && out.length < n && out.length < 3; t++) {
        var kind = rng.pick(["s4", "s6", "grid"]);
        if (kind === "grid") {
          var kids = rng.sample(LG_KIDS, 4), pets = rng.sample(LG_PETS, 4), ans = rng.shuffle([0, 1, 2, 3]), key = "g" + kids.join("") + pets.join("") + ans.join("");
          if (seen[key]) continue;
          // Clues until one answer is left: true facts, "has" or "has not".
          var clues = [], perms = [];
          (function perm(a, rest) { if (!rest.length) { perms.push(a); return; } rest.forEach(function (x, i) { perm(a.concat([x]), rest.slice(0, i).concat(rest.slice(i + 1))); }); })([], [0, 1, 2, 3]);
          var facts = [];
          for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) facts.push({ i: i, j: j, has: ans[i] === j });
          facts = rng.shuffle(facts);
          var left = perms, N = ctx.w("names"), P = ctx.w("pets");
          for (var f = 0; f < facts.length && left.length > 1; f++) {
            var fc = facts[f], next = left.filter(function (p) { return (p[fc.i] === fc.j) === fc.has; });
            if (next.length < left.length && (fc.has ? clues.filter(function (c) { return c.has; }).length < 2 : true)) { left = next; clues.push(fc); }
          }
          if (left.length !== 1 || clues.length > 5) continue;
          seen[key] = true;
          out.push({ type: "logicgrid", key: key, prompt: ctx.w("grid"), say: ctx.w("grid"),
            rows: kids.map(function (k) { return { pic: k === "sara" || k === "mina" || k === "leila" ? "👧" : "👦", label: N[k] }; }), cols: pets.map(function (p) { return { pic: p }; }),
            clues: clues.map(function (c) { return ctx.w(c.has ? "has" : "hasnot", { who: N[kids[c.i]], pet: P[pets[c.j]] }); }), answer: ans });
          continue;
        }
        var size = kind === "s4" ? 4 : 6, g = sudokuBase(size), digits = rng.shuffle([1, 2, 3, 4, 5, 6].slice(0, size));
        g = g.map(function (row) { return row.map(function (v) { return digits[v - 1]; }); });
        // Swap rows inside a band and the two columns' order inside a stack keeps the grid valid.
        for (var band = 0; band < size; band += 2) if (rng() < 0.5) { var tmp = g[band]; g[band] = g[band + 1]; g[band + 1] = tmp; }
        var solution = g.map(function (r) { return r.slice(); }), puzzle = g.map(function (r) { return r.slice(); });
        var cells = rng.shuffle(Array.from({ length: size * size }, function (_, i) { return i; })), removed = 0, aim = size === 4 ? 9 : 18;
        cells.forEach(function (ci) {
          if (removed >= aim) return;
          var r = Math.floor(ci / size), c = ci % size, keep = puzzle[r][c];
          puzzle[r][c] = 0;
          if (solveCount(puzzle.map(function (x) { return x.slice(); }), size, 2) === 1) removed++; else puzzle[r][c] = keep;
        });
        var sk = kind + puzzle.map(function (r) { return r.join(""); }).join("");
        if (seen[sk]) continue;
        seen[sk] = true;
        out.push({ type: "logicgrid", key: sk, prompt: ctx.w(kind), say: ctx.w(kind),
          sudoku: puzzle.map(function (r) { return r.map(function (v) { return v ? String(v) : "."; }).join(" "); }), solution: solution.map(function (r) { return r.join(" "); }) });
      }
      return out;
    }
  });

  /* «تایپ» — think-tree-p8. Persian or English words to type, from the home row first, then with the row above. Typing
     practice is not scored (the type step). Key: the language and the stage. */
  var TYPE_FA = [["با", "تاب", "سیب", "بابا", "نان", "ماست", "کتاب", "لب"], ["باغ", "عسل", "قفل", "خانه", "صبح", "ثانیه", "صاف", "فیل"]];
  var TYPE_EN = [["dad", "sad", "add", "ask", "all", "lad", "fall", "salad"], ["red", "top", "pie", "dog", "your", "tree", "water", "quiet"]];
  B.PRACTICE.push({
    id: "think-tree-p8", subject: "think", level: "tree", objectives: ["think.tree.16"], needs: ["think-tree-16"],
    emoji: "⌨️", title: "تایپ",
    words: { fa: "انگشت‌ها روی ردیف خانه. این کلمه‌های فارسی را تایپ کن.", en: "انگشت‌ها روی ردیف خانه. این کلمه‌های انگلیسی را تایپ کن." },
    make: function (rng, n, ctx) {
      return ["fa", "en"].map(function (lang) {
        var stage = rng.int(0, 1), pool = lang === "fa" ? TYPE_FA[stage] : TYPE_EN[stage];
        return { type: "type", key: lang + "-" + stage, lang: lang, prompt: ctx.w(lang), say: ctx.w(lang), words: rng.sample(pool, 4) };
      }).slice(0, n);
    }
  });

  /* «درست است؟» — think-tree-p9. A headline, a photo or a message with clues to check (who wrote it, when, an ad), and
     (after think-tree-18) safe and unsafe requests. Key: the situation. */
  var CHECK = [["ad", "think-tree-17"], ["noname", "think-tree-17"], ["photo", "think-tree-17"], ["old", "think-tree-17"], ["keywords", "think-tree-17"],
    ["prize", "think-tree-18"], ["download", "think-tree-18"], ["samepw", "think-tree-18"], ["closed", "think-tree-18"]];
  B.PRACTICE.push({
    id: "think-tree-p9", subject: "think", level: "tree", objectives: ["think.tree.17", "think.tree.18"], needs: ["think-tree-17"],
    emoji: "🔎", title: "درست است؟",
    words: {
      q: { ad: "اولین نتیجه جست‌وجو برچسب «آگهی» دارد. یعنی چه؟", noname: "پیامی می‌گوید «فردا مدرسه‌ها تعطیل است!» ولی اسم نویسنده و تاریخ ندارد. چه کار کنیم؟",
        photo: "عکسی از «گربه‌ای با بال» دیدی. چه فکری می‌کنیم؟", old: "یک خبر درباره هوای امروز پیدا کردی، ولی تاریخش پنج سال پیش است. چه کار کنیم؟",
        keywords: "می‌خواهی بدانی پلنگ ایرانی چه می‌خورد. کدام کلمه‌ها برای جست‌وجو بهترند؟",
        prize: "پیامی می‌گوید: «برنده شدی! رمزت را بنویس.» چیست؟", download: "سایتی می‌گوید: «برای دیدن ادامه، این برنامه را دانلود کن.» چه کار کنیم؟",
        samepw: "برای بازی، مدرسه و ایمیل چه رمزی بهتر است؟", closed: "پیامی می‌گوید: «حسابت بسته می‌شود! زود رمزت را بفرست.» چه کار کنیم؟" },
      good: { ad: "کسی پول داده تا بالا بیاید", noname: "می‌گردیم ببینیم منبع درستی هم این را گفته یا نه", photo: "عکس را شاید دستکاری کرده‌اند", old: "دنبال خبر تازه‌تری می‌گردیم",
        keywords: "«خوراک پلنگ ایرانی»", prize: "یک فریب", download: "پیش از دانلود از پدر یا مادر می‌پرسیم", samepw: "برای هر کدام یک رمز جدا و قوی", closed: "جواب نمی‌دهیم و به پدر یا مادر نشان می‌دهیم" },
      bad: { ad: "بهترین و درست‌ترین نتیجه است", noname: "زود برای همه می‌فرستیم", photo: "حتماً واقعی است", old: "همان را باور می‌کنیم", keywords: "«حیوان»",
        prize: "یک جایزه واقعی", download: "زود دانلود می‌کنیم", samepw: "یک رمز برای همه", closed: "زود رمز را می‌فرستیم" }
    },
    make: function (rng, n, ctx) {
      var Q = ctx.w("q"), G = ctx.w("good"), W = ctx.w("bad");
      var open = CHECK.filter(function (c) { return ctx.done(c[1]); }).map(function (c) { return c[0]; });
      return rng.sample(open, Math.min(n, 4)).map(function (k) {
        return { type: "choose", key: k, prompt: Q[k], say: Q[k], options: rng.shuffle([{ label: G[k], value: "good" }, { label: W[k], value: "bad" }]), answer: "good" };
      });
    }
  });

  // ================ More practice for every lesson (Seed, Sprout, Sapling) ================
  /* Each lesson's practice set mixes at least three generators (CURRICULUM.md, "Practice in the course"). Most of the
     generators below are small banks; their text is in words, so English swaps whole tables. Keys are chosen from the
     Persian table, so both languages make the same items. */

  // k of keys: the ones this child missed first (if they are still here), then the rest at random.
  function pickKeys(rng, keys, k, ctx) {
    var first = (ctx.again || []).filter(function (x) { return keys.indexOf(x) >= 0; });
    var rest = rng.shuffle(keys.filter(function (x) { return first.indexOf(x) < 0; }));
    return first.concat(rest).slice(0, k);
  }
  /* Questions from a bank: words.items = { key: [question, right answer, wrong answer, …] }. opts.after: { key: lesson }
     for items that need a later lesson; opts.pics: { key: picture } shown with the question; opts.per: items a session. */
  function askBank(words, opts) {
    opts = opts || {};
    return function (rng, n, ctx) {
      var items = ctx.w("items"), keys = Object.keys(words.items).filter(function (k) { return !opts.after || !opts.after[k] || ctx.done(opts.after[k]); });
      return pickKeys(rng, keys, Math.min(n, opts.per || 3), ctx).map(function (k) {
        var it = items[k], order = rng.shuffle(it.slice(1).map(function (x, i) { return i; }));
        var s = { type: "choose", key: k, prompt: it[0], say: it[0], options: order.map(function (i) { return { label: it[i + 1], value: String(i) }; }), answer: "0" };
        if (opts.pics && opts.pics[k]) s.show = opts.pics[k];
        return s;
      });
    };
  }
  /* Sorting rounds: [{ id, prompt (a words key), baskets: [{ v, pic }], items: { key: [picture, basket] }, after }]; basket
     labels in words.labels, and words.things[key] for things that need words. One or two rounds a session. */
  function sortBank(rounds) {
    return function (rng, n, ctx) {
      var L = ctx.w("labels"), T = ctx.w("things") || {}, open = rounds.filter(function (r) { return !r.after || ctx.done(r.after); });
      // With one round and room for two steps, the round's things are split between two steps (none shown twice).
      var plan = rng.sample(open, Math.min(n, 2)).map(function (r) { return { r: r, part: 0, of: 1 }; });
      if (plan.length === 1 && n >= 2) plan.push({ r: plan[0].r, part: 1, of: 2 }), plan[0].of = 2;
      return plan.map(function (pl) {
        var r = pl.r, per = Math.floor(6 / r.baskets.length), picked = [];
        r.baskets.forEach(function (bk) {
          var mine = rng.shuffle(Object.keys(r.items).filter(function (k) { return r.items[k][1] === bk.v; }).sort());
          if (pl.of === 2) { var half = Math.ceil(mine.length / 2); mine = pl.part ? mine.slice(half) : mine.slice(0, half); }
          picked = picked.concat(mine.slice(0, per));
        });
        var prompt = ctx.w(r.prompt || "prompt");
        return { type: "sort", key: r.id + (pl.of === 2 ? "-" + pl.part : ""), prompt: prompt, say: prompt,
          baskets: r.baskets.map(function (bk) { return { pic: bk.pic, label: L[bk.v], value: bk.v }; }),
          items: rng.shuffle(picked).map(function (k) { var it = r.items[k], o = { pic: it[0], basket: it[1] }; if (T[k]) { o.label = T[k]; o.say = T[k]; } return o; }) };
      });
    };
  }
  // A generator that is a bank of questions (askBank on its own words).
  function pushAsk(def, opts) { def.make = askBank(def.words, opts); B.PRACTICE.push(def); }
  // A picture card, with its words when it has some.
  function card(pic, label) { return label ? { pic: pic, label: label, say: label } : pic; }
  /* Matching: table { key: [picture, picture] }, words.a / words.b the cards' words (optional), per pairs a step. */
  function pairsBank(table, per) {
    return function (rng, n, ctx) {
      var A = ctx.w("a") || {}, Bw = ctx.w("b") || {}, all = rng.shuffle(Object.keys(table)), prompt = ctx.w("prompt");
      // Room for two steps: the table split in two (three pairs or more each), so no pair comes twice.
      var size = n >= 2 && all.length >= 6 ? Math.min(per || 4, Math.floor(all.length / 2)) : per || 4;
      var groups = n >= 2 && all.length >= 6 ? [all.slice(0, size), all.slice(size, size * 2)] : [all.slice(0, size)];
      return groups.map(function (ks) {
        return { type: "pairs", key: ks.slice().sort().join(","), prompt: prompt, say: prompt,
          pairs: ks.map(function (k) { return [card(table[k][0], A[k]), card(table[k][1], Bw[k])]; }) };
      });
    };
  }
  /* Putting steps in order: seqs { key: [picture, …] }, words.steps { key: [words, …] }; words.jobs { key: name } fills
     {job} in the prompt. */
  function orderBank(seqs, per) {
    return function (rng, n, ctx) {
      var S = ctx.w("steps"), J = ctx.w("jobs") || {};
      return pickKeys(rng, Object.keys(seqs), Math.min(n, per || 2), ctx).map(function (k) {
        var prompt = ctx.w("prompt", { job: J[k] });
        return { type: "order", key: k, prompt: prompt, say: prompt, numbered: true,
          items: seqs[k].map(function (p, i) { return { pic: p, label: S[k][i], say: S[k][i] }; }) };
      });
    };
  }
  // A row of squares for the arrow puzzles on one line: who at i, what at j (or -1), the rest empty.
  function rowOf(len, i, who, j, what) {
    var r = [];
    for (var x = 0; x < len; x++) r.push(x === i ? who : x === j ? what : "⬜");
    return r.join("");
  }
  function arrowsFor(d) { var a = []; for (var i = 0; i < Math.abs(d); i++) a.push(d > 0 ? "➡️" : "⬅️"); return a.join(""); }

  // ---------------- Seed ----------------
  /* «کدام تکه تکرار می‌شود؟» — think-seed-p7. A pattern, and the piece that repeats in it. Key: kind and set. */
  B.PRACTICE.push({
    id: "think-seed-p7", subject: "think", level: "seed", objectives: ["think.seed.1"], needs: ["think-seed-1"], lessons: ["think-seed-1", "think-seed-5"],
    emoji: "🔁", title: "کدام تکه تکرار می‌شود؟",
    words: { prompt: "در این الگو کدام تکه دوباره و دوباره می‌آید؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < Math.min(n, 3); t++) {
        var kind = rng.pick(Object.keys(KINDS)), si = rng.int(0, SETS.length - 1), set = SETS[si], key = kind + "-" + si;
        if (seen[key]) continue;
        seen[key] = true;
        var unit = KINDS[kind], seq = [];
        for (var i = 0; i < unit.length * (unit.length === 2 ? 3 : 2); i++) seq.push(set[unit[i % unit.length]]);
        var right = unit.map(function (u) { return set[u]; }).join("");
        // Wrong pieces: the other kinds of piece made from the same pictures, and one picture alone.
        var wrong = Object.keys(KINDS).filter(function (k) { return k !== kind; }).map(function (k) { return KINDS[k].map(function (u) { return set[u]; }).join(""); })
          .concat([set[unit[0]]]).filter(function (w, i, a) { return w !== right && a.indexOf(w) === i; });
        var opts = [right].concat(rng.sample(wrong, 2));
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: seq.join(" "), ltr: true, pic: true,
          options: rng.shuffle(opts).map(function (o) { return { label: o, value: o }; }), answer: right });
      }
      return out;
    }
  });

  /* «الگو درست است؟» — think-seed-p8. Six rows of pictures: three real patterns and three with one picture changed, to
     sort. A changed row is kept only if it is no pattern at all. Key: the round. */
  function isPattern(seq) {
    return [1, 2, 3].some(function (p) {
      if (p === 1) return false;
      for (var i = p; i < seq.length; i++) if (seq[i] !== seq[i - p]) return false;
      return true;
    });
  }
  B.PRACTICE.push({
    id: "think-seed-p8", subject: "think", level: "seed", objectives: ["think.seed.1"], needs: ["think-seed-1"], lessons: ["think-seed-1", "think-seed-5"],
    emoji: "✅", title: "الگو درست است؟",
    words: { prompt: "الگوهای درست در یک سبد، الگوهایی که اشتباه دارند در سبد دیگر", good: "الگوی درست", bad: "اشتباه دارد" },
    make: function (rng, n, ctx) {
      var rows = [], seen = {};
      for (var t = 0; t < 60 && rows.length < 6; t++) {
        var good = rows.filter(function (r) { return r.ok; }).length < 3, kind = rng.pick(Object.keys(KINDS)), set = SETS[rng.int(0, SETS.length - 1)], unit = KINDS[kind], seq = [];
        for (var i = 0; i < 6; i++) seq.push(set[unit[i % unit.length]]);
        if (!good) {
          var at = rng.int(2, 5), others = set.filter(function (p) { return p !== seq[at]; });
          seq[at] = rng.pick(others);
          if (isPattern(seq)) continue;
        }
        var key = seq.join("");
        if (seen[key]) continue;
        seen[key] = true;
        rows.push({ ok: good, label: key });
      }
      return [{ type: "sort", key: "rows", prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        baskets: [{ pic: "✅", label: ctx.w("good"), value: "ok" }, { pic: "❌", label: ctx.w("bad"), value: "no" }],
        items: rng.shuffle(rows).map(function (r) { return { label: r.label, basket: r.ok ? "ok" : "no" }; }) }];
    }
  });

  /* «چه چیزهایی با هم‌اند؟» — think-seed-p9. Four pairs of things that go together, to match. Key: the pairs. */
  var TOGETHER = { sock: ["🧦", "👟"], bee: ["🐝", "🌼"], teeth: ["🪥", "🦷"], key: ["🔑", "🚪"], pencil: ["✏️", "📒"], fish: ["🐟", "🫧"], tea: ["🫖", "🍵"],
    rain: ["☔", "🌧️"], dog: ["🐶", "🦴"], bird: ["🐦", "🪺"], cow: ["🐄", "🥛"], hen: ["🐔", "🥚"], bread: ["🧈", "🍞"], ball: ["⚽", "🥅"] };
  B.PRACTICE.push({
    id: "think-seed-p9", subject: "think", level: "seed", objectives: ["think.seed.3"], needs: ["think-seed-2"], lessons: ["think-seed-2", "think-seed-6"],
    emoji: "🧦", title: "چه چیزهایی با هم‌اند؟",
    words: { prompt: "هر چیز را به چیزی که با آن است برسان" },
    make: pairsBank(TOGETHER, 4)
  });

  /* «قانون سبد چیست؟» — think-seed-p10. Three pictures from one basket: what do they all share, a colour or a kind? The
     wrong answers are rules not all three share. Key: the rule. */
  var PROPS = [["🍎", "red", "fruit"], ["🍓", "red", "fruit"], ["🍒", "red", "fruit"], ["🚗", "red", "vehicle"], ["🌹", "red", "flower"], ["🍌", "yellow", "fruit"],
    ["🍋", "yellow", "fruit"], ["🌻", "yellow", "flower"], ["🐥", "yellow", "animal"], ["🚕", "yellow", "vehicle"], ["🐸", "green", "animal"], ["🍐", "green", "fruit"],
    ["🐢", "green", "animal"], ["🐳", "blue", "animal"], ["🚙", "blue", "vehicle"], ["🫐", "blue", "fruit"], ["🐶", "brown", "animal"], ["🐮", "white", "animal"],
    ["🌷", "pink", "flower"], ["🚌", "yellow", "vehicle"], ["🦋", "blue", "animal"], ["🌼", "white", "flower"]];
  B.PRACTICE.push({
    id: "think-seed-p10", subject: "think", level: "seed", objectives: ["think.seed.2"], needs: ["think-seed-2"], lessons: ["think-seed-2", "think-seed-7"],
    emoji: "🧺", title: "قانون سبد چیست؟",
    words: { prompt: "این سه تا در یک سبدند. قانون سبد چیست؟",
      rules: { red: "همه قرمزند", yellow: "همه زردند", green: "همه سبزند", blue: "همه آبی‌اند", fruit: "همه میوه‌اند", animal: "همه حیوان‌اند", vehicle: "همه وسیله نقلیه‌اند", flower: "همه گل‌اند" } },
    make: function (rng, n, ctx) {
      var R = ctx.w("rules"), rules = ["red", "yellow", "green", "blue", "fruit", "animal", "vehicle", "flower"], out = [];
      function has(p, r) { return p[1] === r || p[2] === r; }
      pickKeys(rng, rules, Math.min(n, 3), ctx).forEach(function (r) {
        var three = rng.sample(PROPS.filter(function (p) { return has(p, r); }), 3);
        if (three.length < 3) return;
        var wrong = rng.sample(rules.filter(function (q) { return q !== r && !three.every(function (p) { return has(p, q); }); }), 2);
        out.push({ type: "choose", key: r, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: three.map(function (p) { return p[0]; }).join(" "),
          options: rng.shuffle([r].concat(wrong)).map(function (q) { return { label: R[q], value: q }; }), answer: r });
      });
      return out;
    }
  });

  /* «از کم به زیاد» — think-seed-p11. Three or four dot cards (up to 6, up to 9 after think-seed-7) in order from fewest to
     most. Key: the numbers. */
  B.PRACTICE.push({
    id: "think-seed-p11", subject: "think", level: "seed", objectives: ["think.seed.8"], needs: ["think-seed-2"], lessons: ["think-seed-2", "think-seed-7"],
    emoji: "🔢", title: "از کم به زیاد",
    words: { prompt: "کارت‌ها را از کم به زیاد بچین" },
    make: function (rng, n, ctx) {
      var top = ctx.done("think-seed-7") ? 9 : 6, out = [], seen = {};
      for (var t = 0; t < 10 && out.length < Math.min(n, 2); t++) {
        var nums = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, top), rng.int(3, 4)).sort(function (a, b) { return a - b; }), key = nums.join("-");
        if (seen[key]) continue;
        seen[key] = true;
        out.push({ type: "order", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true, items: nums.map(function (d) { return { dots: d }; }) });
      }
      return out;
    }
  });

  /* «چه چیزی عوض شد؟» — think-seed-p12. A row of pictures, then the same row with one picture swapped for one that looks
     like it: which picture is new? Four pictures after think-seed-12. Key: the swap. */
  var LOOKALIKE = [["🌳", "🌲"], ["🍎", "🍏"], ["🐶", "🐱"], ["⭐", "🌙"], ["🚗", "🚕"], ["🌷", "🌹"], ["🐟", "🐠"], ["🍐", "🍋"], ["🐔", "🐥"], ["⚽", "🏀"]];
  B.PRACTICE.push({
    id: "think-seed-p12", subject: "think", level: "seed", objectives: ["think.seed.3", "think.seed.11"], needs: ["think-seed-6"], lessons: ["think-seed-6", "think-seed-12"],
    emoji: "🔄", title: "چه چیزی عوض شد؟",
    words: { prompt: "ردیف اول را ببین، بعد ردیف دوم را. کدام تصویر تازه است؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, len = ctx.done("think-seed-12") ? 4 : 3;
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var idx = rng.sample(LOOKALIKE.map(function (x, i) { return i; }), len), at = rng.int(0, len - 1), key = idx.join("") + ":" + at;
        if (seen[key]) continue;
        seen[key] = true;
        var before = idx.map(function (i) { return LOOKALIKE[i][0]; }), after = before.slice();
        after[at] = LOOKALIKE[idx[at]][1];
        var others = rng.sample(after.filter(function (p, i) { return i !== at; }), 2);
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: before.join("") + "  ➜  " + after.join(""), ltr: true, pic: true,
          options: rng.shuffle([after[at]].concat(others)), answer: after[at] });
      }
      return out;
    }
  });

  /* «اول کدام، آخر کدام؟» — think-seed-p13. A home task (the tasks of think-seed-p3): which step comes first, which last?
     Key: the task and first or last. */
  var STEP_WORDS = { tap: "شیر آب را باز کن", soap: "صابون بزن", rinse: "آب بکش", dry: "خشک کن", bread: "نان", cheese: "پنیر بگذار", cucumber: "خیار بگذار", eat: "بخور",
    fillCan: "آب‌پاش را پر کن", water: "به گیاه آب بده", flower: "گل باز می‌شود", paste: "خمیردندان بزن", brush: "مسواک بزن", rinseMouth: "دهان را آب بکش",
    socks: "جوراب بپوش", shoes: "کفش بپوش", bag: "کیف را بردار", door: "از در برو", kettle: "کتری را آب کن", boil: "آب جوش بیاید", pour: "چای بریز" };
  B.PRACTICE.push({
    id: "think-seed-p13", subject: "think", level: "seed", objectives: ["think.seed.4"], needs: ["think-seed-3"], lessons: ["think-seed-3", "think-seed-8"],
    emoji: "1️⃣", title: "اول کدام، آخر کدام؟",
    words: { first: "{task}: اول کدام کار را می‌کنیم؟", last: "{task}: آخر کدام کار را می‌کنیم؟", steps: STEP_WORDS,
      tasks: { hands: "شستن دست‌ها", sandwich: "درست کردن لقمه", plant: "آب دادن به گیاه", teeth: "مسواک زدن", dress: "رفتن به مدرسه", tea: "درست کردن چای" } },
    make: function (rng, n, ctx) {
      var S = ctx.w("steps"), T = ctx.w("tasks");
      return pickKeys(rng, Object.keys(TASKS).map(function (k) { return k + ":first"; }).concat(Object.keys(TASKS).map(function (k) { return k + ":last"; })), Math.min(n, 3), ctx).map(function (key) {
        var k = key.split(":")[0], last = /last$/.test(key), steps = TASKS[k], right = last ? steps[steps.length - 1] : steps[0];
        var wrong = rng.sample(steps.filter(function (s) { return s !== right; }), 2), q = ctx.w(last ? "last" : "first", { task: T[k] });
        return { type: "choose", key: key, prompt: q, say: q, options: rng.shuffle([right].concat(wrong)).map(function (s) { return { label: s[0] + " " + S[s[1]], value: s[1] }; }), answer: right[1] };
      });
    }
  });

  /* «کدام کار جا افتاده؟» — think-seed-p14. A home task in pictures with one step missing: which picture goes in the gap?
     The wrong pictures come from other tasks. Key: the task and the gap. */
  B.PRACTICE.push({
    id: "think-seed-p14", subject: "think", level: "seed", objectives: ["think.seed.4"], needs: ["think-seed-3"], lessons: ["think-seed-3", "think-seed-8"],
    emoji: "🧩", title: "کدام کار جا افتاده؟",
    words: { prompt: "یک کار جا افتاده. کدام تصویر جای خالی را پر می‌کند؟", steps: STEP_WORDS },
    make: function (rng, n, ctx) {
      var S = ctx.w("steps"), all = [];
      Object.keys(TASKS).forEach(function (k) { TASKS[k].forEach(function (s) { all.push([k].concat(s)); }); });
      return rng.sample(Object.keys(TASKS), Math.min(n, 2)).map(function (k) {
        var steps = TASKS[k], gap = rng.int(0, steps.length - 1), face = function (s) { return { pic: s[0], label: S[s[1]] }; };
        var wrong = rng.sample(all.filter(function (s) { return s[0] !== k; }), 2).map(function (s) { return { pic: s[1], label: S[s[2]] }; });
        return { type: "pattern", key: k + ":" + gap, prompt: ctx.w("prompt"), say: ctx.w("prompt"), seq: steps.map(face), blanks: [gap], options: rng.shuffle([face(steps[gap])].concat(wrong)) };
      });
    }
  });

  /* «چند فلش؟» — think-seed-p15. A row with the cat and the milk: which arrows take the cat there? Rows of 3 to 5 squares
     (6 after think-seed-11). Key: the row. */
  B.PRACTICE.push({
    id: "think-seed-p15", subject: "think", level: "seed", objectives: ["think.seed.5", "think.seed.6"], needs: ["think-seed-9"], lessons: ["think-seed-9", "think-seed-4", "think-seed-11"],
    emoji: "➡️", title: "چند فلش؟",
    words: { prompt: "کدام فلش‌ها گربه را به شیر می‌رساند؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, top = ctx.done("think-seed-11") ? 6 : 5;
      for (var t = 0; t < 30 && out.length < Math.min(n, 3); t++) {
        var len = rng.int(3, top), ij = rng.sample(Array.from({ length: len }, function (x, i) { return i; }), 2), i = ij[0], j = ij[1], key = len + ":" + i + ":" + j;
        if (seen[key]) continue;
        seen[key] = true;
        var d = j - i, right = arrowsFor(d), wrong = [arrowsFor(-d), arrowsFor(d > 0 ? d + 1 : d - 1)];
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: rowOf(len, i, "🐱", j, "🥛"), ltr: true,
          options: rng.shuffle([right].concat(wrong)).map(function (o) { return { label: o, value: o }; }), answer: right });
      }
      return out;
    }
  });

  /* «گربه کجا می‌ایستد؟» — think-seed-p16. A row and a short arrow program (one way; both ways after think-seed-10):
     which picture shows where the cat stops? Key: the row and the program. */
  B.PRACTICE.push({
    id: "think-seed-p16", subject: "think", level: "seed", objectives: ["think.seed.5"], needs: ["think-seed-9"], lessons: ["think-seed-9", "think-seed-4", "think-seed-10", "think-seed-11"],
    emoji: "🐱", title: "گربه کجا می‌ایستد؟",
    words: { prompt: "گربه این فلش‌ها را یکی‌یکی انجام می‌دهد. کجا می‌ایستد؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, both = ctx.done("think-seed-10");
      for (var t = 0; t < 40 && out.length < Math.min(n, 3); t++) {
        var len = rng.int(4, 5), i = rng.int(0, len - 1), steps = rng.int(1, 3), dir = rng.pick([1, -1]), at = i, prog = [], ok = true;
        for (var k = 0; k < steps; k++) {
          var d = both && rng() < 0.4 ? -dir : dir;
          at += d;
          if (at < 0 || at >= len) { ok = false; break; }
          prog.push(d > 0 ? "➡️" : "⬅️");
        }
        var key = len + ":" + i + ":" + prog.join("");
        if (!ok || at === i || seen[key]) continue;
        seen[key] = true;
        var spots = rng.sample(Array.from({ length: len }, function (x, k) { return k; }).filter(function (k) { return k !== at; }), 2);
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: rowOf(len, i, "🐱", -1) + "   " + prog.join(""), ltr: true,
          options: rng.shuffle([at].concat(spots)).map(function (k) { return { label: rowOf(len, k, "🐱", -1), value: String(k) }; }), answer: String(at) });
      }
      return out;
    }
  });

  /* «فلش و جهت» — think-seed-p17. Each arrow to a picture that goes that way. Key: the pictures. */
  var GOES = { up: ["🎈", "🚀", "🐦", "🪁"], down: ["🍂", "🌧️", "⚓", "🍎"], right: ["👉"], left: ["👈"] };
  B.PRACTICE.push({
    id: "think-seed-p17", subject: "think", level: "seed", objectives: ["think.seed.5"], needs: ["think-seed-9"], lessons: ["think-seed-9", "think-seed-4"],
    emoji: "⬆️", title: "فلش و جهت",
    words: { prompt: "هر فلش را به تصویری برسان که به همان طرف می‌رود", dirs: { up: "بالا", down: "پایین", right: "راست", left: "چپ" } },
    make: function (rng, n, ctx) {
      var D = ctx.w("dirs"), ARROW = { up: "⬆️", down: "⬇️", right: "➡️", left: "⬅️" }, pics = {};
      ["up", "down", "right", "left"].forEach(function (d) { pics[d] = rng.pick(GOES[d]); });
      return [{ type: "pairs", key: pics.up + pics.down, prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        pairs: ["up", "down", "right", "left"].map(function (d) { return [ARROW[d], card(pics[d], D[d])]; }) }];
    }
  });

  /* «چه چیزی کم شد؟» — think-seed-p18. A set of pictures, then the same set with one gone: which is missing? Five
     pictures after think-seed-12. Key: the set and the missing one. */
  var MISSING = ["🍎", "🍌", "🍇", "🍐", "🍓", "🐱", "🐶", "🐰", "🐟", "⭐", "🌙", "☀️", "🚗", "🎈", "⚽", "🌷"];
  B.PRACTICE.push({
    id: "think-seed-p18", subject: "think", level: "seed", objectives: ["think.seed.11"], needs: ["think-seed-6"], lessons: ["think-seed-6", "think-seed-12"],
    emoji: "❓", title: "چه چیزی کم شد؟",
    words: { prompt: "ردیف اول را ببین. در ردیف دوم کدام نیست؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, len = ctx.done("think-seed-12") ? 5 : 4;
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var set = rng.sample(MISSING, len), gone = rng.int(0, len - 1), key = set.join("") + ":" + gone;
        if (seen[key]) continue;
        seen[key] = true;
        var after = rng.shuffle(set.filter(function (p, i) { return i !== gone; }));
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: set.join("") + "  ➜  " + after.join(""), ltr: true, pic: true,
          options: rng.shuffle([set[gone]].concat(rng.sample(after, 2))), answer: set[gone] });
      }
      return out;
    }
  });

  /* think-seed-p19 to p21: devices at home (think-seed-13). */
  B.PRACTICE.push({
    id: "think-seed-p19", subject: "think", level: "seed", objectives: ["think.seed.9"], needs: ["think-seed-13"],
    emoji: "📱", title: "هر دستگاه برای چه؟",
    words: { prompt: "هر دستگاه را به کاری برسان که با آن می‌کنیم",
      a: { phone: "گوشی", tv: "تلویزیون", camera: "دوربین", computer: "رایانه", headphones: "هدفون", printer: "چاپگر", watch: "ساعت" },
      b: { phone: "حرف زدن با مادربزرگ", tv: "دیدن کارتون", camera: "عکس گرفتن", computer: "نوشتن و نقاشی", headphones: "گوش دادن به آهنگ", printer: "چاپ روی کاغذ", watch: "دیدن ساعت" } },
    make: pairsBank({ phone: ["📱", "👵"], tv: ["📺", "🎬"], camera: ["📷", "🖼️"], computer: ["💻", "✍️"], headphones: ["🎧", "🎵"], printer: ["🖨️", "📄"], watch: ["⌚", "⏰"] }, 4)
  });
  B.PRACTICE.push({
    id: "think-seed-p20", subject: "think", level: "seed", objectives: ["think.seed.9"], needs: ["think-seed-13"],
    emoji: "📺", title: "دستگاه است یا نه؟",
    words: { prompt: "دستگاه‌ها در یک سبد، چیزهای دیگر در سبد دیگر", labels: { yes: "دستگاه", no: "دستگاه نیست" } },
    make: sortBank([{ id: "devices", baskets: [{ v: "yes", pic: "🔌" }, { v: "no", pic: "🧺" }],
      items: { phone: ["📱", "yes"], laptop: ["💻", "yes"], tv: ["📺", "yes"], watch: ["⌚", "yes"], printer: ["🖨️", "yes"], camera: ["📷", "yes"], mouse: ["🖱️", "yes"], radio: ["📻", "yes"],
        chair: ["🪑", "no"], bear: ["🧸", "no"], books: ["📚", "no"], apple: ["🍎", "no"], plant: ["🪴", "no"], spoon: ["🥄", "no"], scissors: ["✂️", "no"], sock: ["🧦", "no"] } }])
  });
  pushAsk({
    id: "think-seed-p21", subject: "think", level: "seed", objectives: ["think.seed.9"], needs: ["think-seed-13"],
    emoji: "☎️", title: "کدام دستگاه؟",
    words: { items: {
      grandma: ["مادربزرگ در شهر دیگری است. با چه با او حرف بزنیم؟", "📱 گوشی", "📺 تلویزیون", "🖨️ چاپگر"],
      cartoon: ["می‌خواهیم با هم کارتون ببینیم. از چه استفاده کنیم؟", "📺 تلویزیون", "🖱️ موشواره", "📷 دوربین"],
      photo: ["می‌خواهیم از گل باغچه عکس بگیریم. با چه؟", "📷 دوربین", "🎧 هدفون", "🖨️ چاپگر"],
      music: ["می‌خواهیم آهنگ گوش بدهیم و کسی بیدار نشود. با چه؟", "🎧 هدفون", "📷 دوربین", "⌨️ صفحه‌کلید"],
      paper: ["نقاشی را روی کاغذ می‌خواهیم. از چه استفاده کنیم؟", "🖨️ چاپگر", "🎧 هدفون", "⌚ ساعت"],
      type: ["می‌خواهیم اسممان را روی رایانه بنویسیم. با چه؟", "⌨️ صفحه‌کلید", "📺 تلویزیون", "🎧 هدفون"],
      time: ["می‌خواهیم بدانیم ساعت چند است. به چه نگاه کنیم؟", "⌚ ساعت", "🖱️ موشواره", "🖨️ چاپگر"] } }
  });

  /* think-seed-p22 to p24: screens with grown-ups (think-seed-14). */
  B.PRACTICE.push({
    id: "think-seed-p22", subject: "think", level: "seed", objectives: ["think.seed.10"], needs: ["think-seed-14"],
    emoji: "👍", title: "عادت خوب",
    words: { prompt: "کارهای خوب در یک سبد، کارهایی که باید عوضشان کنیم در سبد دیگر", labels: { good: "کار خوب", change: "باید عوضش کنیم" },
      things: { ask: "اول از بزرگ‌ترها می‌پرسم", timer: "وقتی زنگ ساعت زد، بازی را تمام می‌کنم", tell: "اگر چیز ترسناکی دیدم، به بزرگ‌ترها می‌گویم", far: "کمی دورتر از صفحه می‌نشینم",
        outside: "بعد از بازی، بیرون بازی می‌کنم", night: "تا دیروقت بازی می‌کنم", grab: "بدون پرسیدن، بازی تازه برمی‌دارم", dinner: "موقع غذا به صفحه نگاه می‌کنم",
        close: "صورتم را خیلی نزدیک صفحه می‌برم", secret: "چیز ترسناک را به کسی نمی‌گویم" } },
    make: sortBank([{ id: "habits", baskets: [{ v: "good", pic: "👍" }, { v: "change", pic: "✋" }],
      items: { ask: ["🙋", "good"], timer: ["⏰", "good"], tell: ["🗣️", "good"], far: ["🛋️", "good"], outside: ["🌳", "good"],
        night: ["🌙", "change"], grab: ["🎮", "change"], dinner: ["🍝", "change"], close: ["👀", "change"], secret: ["🙈", "change"] } }])
  });
  pushAsk({
    id: "think-seed-p23", subject: "think", level: "seed", objectives: ["think.seed.10"], needs: ["think-seed-14"],
    emoji: "⏰", title: "با صفحه چه کنیم؟",
    words: { items: {
      timer: ["زنگ ساعت زد ولی بازی تمام نشده. چه کار کنیم؟", "بازی را تمام می‌کنیم", "زنگ را خاموش می‌کنیم و ادامه می‌دهیم"],
      scary: ["در یک فیلم چیز ترسناکی دیدی. چه کار کنیم؟", "به پدر یا مادر می‌گوییم", "به کسی نمی‌گوییم"],
      newgame: ["یک بازی تازه دیدی که دوست داری. چه کار کنیم؟", "اول از بزرگ‌ترها می‌پرسیم", "خودمان زود برش می‌داریم"],
      tired: ["چشم‌هایت خسته شده. چه کار کنیم؟", "صفحه را کنار می‌گذاریم و بیرون بازی می‌کنیم", "نزدیک‌تر به صفحه می‌نشینیم"],
      dinner: ["وقت شام است. چه کار کنیم؟", "صفحه را خاموش می‌کنیم و با خانواده غذا می‌خوریم", "سر سفره بازی می‌کنیم"],
      button: ["روی صفحه یک دکمه بزرگ آمد که نمی‌دانی چیست. چه کار کنیم؟", "از بزرگ‌ترها می‌پرسیم", "زود رویش می‌زنیم"] } }
  }, { per: 4 });
  B.PRACTICE.push({
    id: "think-seed-p24", subject: "think", level: "seed", objectives: ["think.seed.10"], needs: ["think-seed-14"],
    emoji: "🙋", title: "اگر این شد، آن کار",
    words: { prompt: "هر اتفاق را به کاری برسان که آن موقع می‌کنیم",
      a: { timer: "زنگ ساعت", scary: "چیز ترسناک", newgame: "بازی تازه", tired: "چشم خسته", dinner: "وقت شام", bed: "وقت خواب" },
      b: { timer: "بازی را تمام می‌کنم", scary: "به بزرگ‌ترها می‌گویم", newgame: "اول می‌پرسم", tired: "بیرون بازی می‌کنم", dinner: "صفحه را خاموش می‌کنم", bed: "صفحه را کنار می‌گذارم" } },
    make: pairsBank({ timer: ["⏰", "✋"], scary: ["😨", "🗣️"], newgame: ["🎮", "🙋"], tired: ["🥱", "🌳"], dinner: ["🍽️", "📴"], bed: ["🛏️", "🌙"] }, 4)
  });

  // ---------------- Sprout ----------------
  // Things by what they share; no picture is in two groups.
  var GROUPS = {
    water: ["🐟", "🐳", "🦀", "🐙", "🐬", "🦈"], fly: ["🐦", "🦋", "🐝", "✈️", "🦅", "🪁"], wear: ["👕", "👖", "🧦", "🧢", "👗", "🧤"],
    write: ["✏️", "🖍️", "🖊️", "🖌️"], food: ["🍞", "🧀", "🥕", "🍚", "🥚", "🍉"], round: ["⚽", "🏀", "🌕", "🔵", "🪀", "🍊"],
    ride: ["🚗", "🚲", "🚌", "🚂", "🛴", "🚜"], music: ["🎸", "🥁", "🎺", "🎹", "🎻"]
  };
  // Lets a run of arrows or pictures read left to right inside Persian text.
  function ltrRun(t) { return "⁦" + t + "⁩"; }

  /* «چه چیزی مشترک است؟» — think-sprout-p8. Four pictures with one thing in common: what is it? Key: the group. */
  B.PRACTICE.push({
    id: "think-sprout-p8", subject: "think", level: "sprout", objectives: ["think.spr.1"], needs: ["think-sprout-1"], lessons: ["think-sprout-1", "think-sprout-6", "think-sprout-8"],
    emoji: "🔎", title: "چه چیزی مشترک است؟",
    words: { prompt: "این چهار تا در چه چیزی مثل هم‌اند؟",
      rules: { water: "همه در آب زندگی می‌کنند", fly: "همه پرواز می‌کنند", wear: "همه را می‌پوشیم", write: "با همه می‌نویسیم یا نقاشی می‌کنیم", food: "همه را می‌خوریم",
        round: "همه گردند", ride: "همه را سوار می‌شویم", music: "همه ساز موسیقی‌اند" } },
    make: function (rng, n, ctx) {
      var R = ctx.w("rules"), gs = Object.keys(GROUPS);
      return pickKeys(rng, gs, Math.min(n, 3), ctx).map(function (g) {
        var opts = [g].concat(rng.sample(gs.filter(function (x) { return x !== g; }), 2));
        return { type: "choose", key: g, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: rng.sample(GROUPS[g], 4).join(" "),
          options: rng.shuffle(opts).map(function (x) { return { label: R[x], value: x }; }), answer: g };
      });
    }
  });

  /* «مثل نمونه‌ها بچین» — think-sprout-p9. Baskets shown only by an example picture: find each basket's rule and sort.
     Three baskets after think-sprout-6. Key: the groups. */
  B.PRACTICE.push({
    id: "think-sprout-p9", subject: "think", level: "sprout", objectives: ["think.spr.1"], needs: ["think-sprout-1"], lessons: ["think-sprout-1", "think-sprout-6", "think-sprout-8"],
    emoji: "🧺", title: "مثل نمونه‌ها بچین",
    words: { prompt: "در هر سبد یک نمونه هست. قانون هر سبد را پیدا کن و بقیه را بچین." },
    make: function (rng, n, ctx) {
      var gs = rng.sample(Object.keys(GROUPS), ctx.done("think-sprout-6") ? 3 : 2), items = [], baskets = [];
      gs.forEach(function (g) {
        var some = rng.sample(GROUPS[g], gs.length === 2 ? 4 : 3);
        baskets.push({ pic: some[0], value: g });
        some.slice(1).forEach(function (p) { items.push({ pic: p, basket: g }); });
      });
      return [{ type: "sort", key: gs.slice().sort().join("-"), prompt: ctx.w("prompt"), say: ctx.w("prompt"), baskets: baskets, items: rng.shuffle(items) }];
    }
  });

  /* «هر دو را دارد» — think-sprout-p10. Which picture is red and round (and, after think-sprout-7, red but not round, or
     round but not red)? Key: the question. */
  B.PRACTICE.push({
    id: "think-sprout-p10", subject: "think", level: "sprout", objectives: ["think.spr.1"], needs: ["think-sprout-6"], lessons: ["think-sprout-6", "think-sprout-8"],
    emoji: "🍒", title: "هر دو را دارد",
    words: { both: "کدام هم قرمز است و هم گرد؟", redOnly: "کدام قرمز است ولی گرد نیست؟", roundOnly: "کدام گرد است ولی قرمز نیست؟" },
    make: function (rng, n, ctx) {
      var asks = ["both"].concat(ctx.done("think-sprout-7") ? ["redOnly", "roundOnly"] : []), out = [];
      var fits = { both: function (t) { return t.red && t.round; }, redOnly: function (t) { return t.red && !t.round; }, roundOnly: function (t) { return !t.red && t.round; } };
      rng.sample(asks, Math.min(n, asks.length)).forEach(function (a) {
        var right = rng.pick(TWO.filter(fits[a])), wrong = [];
        Object.keys(fits).forEach(function (b) { if (b !== a) wrong.push(rng.pick(TWO.filter(fits[b]))); });
        out.push({ type: "choose", key: a, prompt: ctx.w(a), say: ctx.w(a), pic: true, options: rng.shuffle([right.pic].concat(wrong.map(function (t) { return t.pic; }))), answer: right.pic });
      });
      return out;
    }
  });

  /* «اگر این، آن‌وقت آن» — think-sprout-p11. Conditions and what we do, to match. Key: the pairs. */
  B.PRACTICE.push({
    id: "think-sprout-p11", subject: "think", level: "sprout", objectives: ["think.spr.2"], needs: ["think-sprout-2"], lessons: ["think-sprout-2", "think-sprout-7", "think-sprout-8"],
    emoji: "☂️", title: "اگر این، آن‌وقت آن",
    words: { prompt: "اگر این شد، چه کار می‌کنیم؟ هر کدام را به کارش برسان",
      a: { rain: "اگر باران بیاید", night: "اگر شب شد", cold: "اگر هوا سرد شد", red: "اگر چراغ قرمز شد", dry: "اگر خاک گلدان خشک شد", hungry: "اگر گرسنه شدیم", ate: "اگر غذا خوردیم", dark: "اگر اتاق تاریک شد" },
      b: { rain: "چتر برمی‌داریم", night: "می‌خوابیم", cold: "کاپشن می‌پوشیم", red: "می‌ایستیم", dry: "آب می‌دهیم", hungry: "غذا می‌خوریم", ate: "مسواک می‌زنیم", dark: "چراغ را روشن می‌کنیم" } },
    make: pairsBank({ rain: ["🌧️", "☂️"], night: ["🌙", "🛏️"], cold: ["🥶", "🧥"], red: ["🚦", "✋"], dry: ["🪴", "💧"], hungry: ["😋", "🍽️"], ate: ["🍝", "🪥"], dark: ["🌑", "💡"] }, 4)
  });

  /* «درست یا نادرست؟» — think-sprout-p12. Four pictures and a sentence about them: all of them, one of them, or (after
     think-sprout-7) none of them. Made true or false at random. Key: the sentence. */
  var TF_GROUPS = ["water", "fly", "wear", "food", "ride"];
  B.PRACTICE.push({
    id: "think-sprout-p12", subject: "think", level: "sprout", objectives: ["think.spr.2"], needs: ["think-sprout-2"], lessons: ["think-sprout-2", "think-sprout-7", "think-sprout-8"],
    emoji: "✔️", title: "درست یا نادرست؟",
    words: { ask: "به تصویرها نگاه کن: «{s}» درست است یا نادرست؟", yes: "درست", no: "نادرست",
      all: { water: "همه‌شان در آب زندگی می‌کنند", fly: "همه‌شان پرواز می‌کنند", wear: "همه‌شان را می‌پوشیم", food: "همه‌شان را می‌خوریم", ride: "همه‌شان را سوار می‌شویم" },
      one: { water: "یکی‌شان در آب زندگی می‌کند", fly: "یکی‌شان پرواز می‌کند", wear: "یکی‌شان را می‌پوشیم", food: "یکی‌شان را می‌خوریم", ride: "یکی‌شان را سوار می‌شویم" },
      none: { water: "هیچ‌کدامشان در آب زندگی نمی‌کند", fly: "هیچ‌کدامشان پرواز نمی‌کند", wear: "هیچ‌کدامشان را نمی‌پوشیم", food: "هیچ‌کدامشان را نمی‌خوریم", ride: "هیچ‌کدامشان را سوار نمی‌شویم" } },
    make: function (rng, n, ctx) {
      var kinds = ["all", "one"].concat(ctx.done("think-sprout-7") ? ["none"] : []), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var g = rng.pick(TF_GROUPS), kind = rng.pick(kinds), truth = rng() < 0.5, key = kind + "-" + g + "-" + truth;
        if (seen[key]) continue;
        seen[key] = true;
        var other = [];
        Object.keys(GROUPS).forEach(function (x) { if (x !== g) other = other.concat(GROUPS[x]); });
        var inG = kind === "all" ? (truth ? 4 : 3) : kind === "one" ? (truth ? 1 : 0) : (truth ? 0 : 1);
        var pics = rng.shuffle(rng.sample(GROUPS[g], inG).concat(rng.sample(other, 4 - inG)));
        var q = ctx.w("ask", { s: ctx.w(kind)[g] });
        out.push({ type: "choose", key: key, prompt: q, say: q, show: pics.join(" "), options: [{ label: "✅ " + ctx.w("yes"), value: "yes" }, { label: "❌ " + ctx.w("no"), value: "no" }], answer: truth ? "yes" : "no" });
      }
      return out;
    }
  });

  /* «قانون را اجرا کن» — think-sprout-p13. Sort by an if-rule; rules with "not" after think-sprout-7. Key: the rule. */
  var IF_RULES = [{ id: "fly", g: "fly", yes: "☁️", no: "🌱" }, { id: "water", g: "water", yes: "🫙", no: "🏞️" }, { id: "food", g: "food", yes: "🍽️", no: "📦" },
    { id: "notWear", g: "wear", not: true, yes: "📦", no: "🗄️", after: "think-sprout-7" }, { id: "notRide", g: "ride", not: true, yes: "🏠", no: "🅿️", after: "think-sprout-7" }];
  B.PRACTICE.push({
    id: "think-sprout-p13", subject: "think", level: "sprout", objectives: ["think.spr.2"], needs: ["think-sprout-2"], lessons: ["think-sprout-2", "think-sprout-7"],
    emoji: "📋", title: "قانون را اجرا کن",
    words: { rules: { fly: "قانون: اگر پرواز می‌کند، در سبد آسمان؛ وگرنه در سبد زمین.", water: "قانون: اگر در آب زندگی می‌کند، در تنگ آب؛ وگرنه بیرون.", food: "قانون: اگر خوردنی است، در بشقاب؛ وگرنه در جعبه.",
      notWear: "قانون: اگر آن را نمی‌پوشیم، در جعبه؛ وگرنه در کمد.", notRide: "قانون: اگر سوارش نمی‌شویم، در خانه؛ وگرنه در پارکینگ." },
      labels: { fly: ["آسمان", "زمین"], water: ["تنگ آب", "بیرون"], food: ["بشقاب", "جعبه"], notWear: ["جعبه", "کمد"], notRide: ["خانه", "پارکینگ"] } },
    make: function (rng, n, ctx) {
      var R = ctx.w("rules"), L = ctx.w("labels");
      return rng.sample(IF_RULES.filter(function (r) { return !r.after || ctx.done(r.after); }), Math.min(n, 2)).map(function (r) {
        var other = [];
        Object.keys(GROUPS).forEach(function (x) { if (x !== r.g) other = other.concat(GROUPS[x]); });
        var items = rng.sample(GROUPS[r.g], 3).map(function (p) { return { pic: p, basket: r.not ? "no" : "yes" }; })
          .concat(rng.sample(other, 3).map(function (p) { return { pic: p, basket: r.not ? "yes" : "no" }; }));
        return { type: "sort", key: r.id, prompt: R[r.id], say: R[r.id],
          baskets: [{ pic: r.yes, label: L[r.id][0], value: "yes" }, { pic: r.no, label: L[r.id][1], value: "no" }], items: rng.shuffle(items) };
      });
    }
  });

  /* «قانون الگو چیست؟» — think-sprout-p14. Five numbers: what is the rule? Key: the step and start. */
  B.PRACTICE.push({
    id: "think-sprout-p14", subject: "think", level: "sprout", objectives: ["think.spr.3"], needs: ["think-sprout-3"], lessons: ["think-sprout-3", "think-sprout-8"],
    emoji: "📈", title: "قانون الگو چیست؟",
    words: { prompt: "قانون این الگو چیست؟", more: "هر بار {n} تا بیشتر", less: "هر بار {n} تا کمتر" },
    make: function (rng, n, ctx) {
      var steps = [1, 2, 5, 10, -1, -2], out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var d = rng.pick(steps), start = d < 0 ? rng.int(8, 15) : d === 10 ? rng.int(1, 5) * 10 : rng.int(1, 9), key = d + ":" + start;
        if (seen[key]) continue;
        seen[key] = true;
        var nums = [0, 1, 2, 3, 4].map(function (i) { return start + d * i; });
        var lab = function (x) { return ctx.w(x > 0 ? "more" : "less", { n: fa(Math.abs(x)) }); };
        var opts = [d].concat(rng.sample(steps.filter(function (x) { return x !== d; }), 2));
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: nums.map(fa).join("، "), ltr: true,
          options: rng.shuffle(opts).map(function (x) { return { label: lab(x), value: String(x) }; }), answer: String(d) });
      }
      return out;
    }
  });

  /* «عدد اشتباه» — think-sprout-p15. A number pattern with one wrong number: which one? Key: the pattern. */
  B.PRACTICE.push({
    id: "think-sprout-p15", subject: "think", level: "sprout", objectives: ["think.spr.3"], needs: ["think-sprout-3"], lessons: ["think-sprout-3", "think-sprout-8"],
    emoji: "🐞", title: "عدد اشتباه",
    words: { prompt: "در این الگو یک عدد اشتباه است. کدام؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var d = rng.pick([1, 2, 5, 10]), start = d === 10 ? rng.int(1, 5) * 10 : rng.int(1, 10), nums = [0, 1, 2, 3, 4, 5].map(function (i) { return start + d * i; });
        var at = rng.int(1, 5), key = d + ":" + start + ":" + at;
        if (seen[key]) continue;
        seen[key] = true;
        nums[at] += rng.pick([1, -1]) * (d === 1 ? 2 : 1);
        if (nums.indexOf(nums[at]) !== at || nums.lastIndexOf(nums[at]) !== at) continue;
        var others = rng.sample(nums.filter(function (x, i) { return i !== at; }), 2);
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: nums.map(fa).join("، "), ltr: true,
          options: rng.shuffle([nums[at]].concat(others)).map(function (x) { return { label: fa(x), value: String(x) }; }), answer: String(nums[at]) });
      }
      return out;
    }
  });

  /* think-sprout-p16 to p18: a big job in small jobs (think-sprout-9). */
  var JOBS = {
    school: ["⏰", "🧼", "👕", "🎒"], plants: ["🪣", "🚰", "🪴", "🧽"], table: ["🧺", "🍽️", "🥄", "🍲"],
    cake: ["🥚", "🥣", "🔥", "🎂"], drawing: ["📄", "✏️", "🖍️", "🖼️"], laundry: ["🧦", "🫧", "👕", "🧺"]
  };
  var JOB_WORDS = {
    jobs: { school: "آماده شدن برای مدرسه", plants: "آب دادن به گلدان‌ها", table: "چیدن سفره", cake: "پختن کیک", drawing: "کشیدن یک نقاشی", laundry: "شستن لباس‌ها" },
    steps: { school: ["از خواب بیدار شو", "صورتت را بشوی", "لباس بپوش", "کیفت را بردار"], plants: ["آب‌پاش را بردار", "آب‌پاش را پر کن", "به گلدان‌ها آب بده", "آب ریخته را پاک کن"],
      table: ["سفره را پهن کن", "بشقاب‌ها را بگذار", "قاشق‌ها را بگذار", "غذا را بیاور"], cake: ["تخم‌مرغ‌ها را بشکن", "همه را هم بزن", "در فر بپز", "کیک را تزیین کن"],
      drawing: ["کاغذ بردار", "با مداد بکش", "رنگش کن", "به دیوار بزن"], laundry: ["لباس‌های کثیف را جمع کن", "در لباسشویی بگذار", "روی بند پهن کن", "تا کن و در کمد بگذار"] }
  };
  B.PRACTICE.push({
    id: "think-sprout-p16", subject: "think", level: "sprout", objectives: ["think.spr.6"], needs: ["think-sprout-9"], lessons: ["think-sprout-9", "think-sprout-10"],
    emoji: "🪜", title: "کارهای کوچک به ترتیب",
    words: { prompt: "کار بزرگ: {job}. کارهای کوچکش را به ترتیب بچین.", jobs: JOB_WORDS.jobs, steps: JOB_WORDS.steps },
    make: orderBank(JOBS, 2)
  });
  B.PRACTICE.push({
    id: "think-sprout-p17", subject: "think", level: "sprout", objectives: ["think.spr.6"], needs: ["think-sprout-9"], lessons: ["think-sprout-9", "think-sprout-10"],
    emoji: "🙅", title: "این کار مال آن نیست",
    words: { prompt: "کار بزرگ: {job}. کدام کار کوچک مال آن نیست؟", jobs: JOB_WORDS.jobs, steps: JOB_WORDS.steps },
    make: function (rng, n, ctx) {
      var J = ctx.w("jobs"), S = ctx.w("steps"), keys = Object.keys(JOBS);
      return pickKeys(rng, keys, Math.min(n, 3), ctx).map(function (k) {
        var other = rng.pick(keys.filter(function (x) { return x !== k; })), oi = rng.int(0, 3), mine = rng.sample([0, 1, 2, 3], 2), q = ctx.w("prompt", { job: J[k] });
        var opts = mine.map(function (i) { return { label: JOBS[k][i] + " " + S[k][i], value: k + i }; }).concat([{ label: JOBS[other][oi] + " " + S[other][oi], value: "x" }]);
        return { type: "choose", key: k, prompt: q, say: q, options: rng.shuffle(opts), answer: "x" };
      });
    }
  });
  B.PRACTICE.push({
    id: "think-sprout-p18", subject: "think", level: "sprout", objectives: ["think.spr.6"], needs: ["think-sprout-9"],
    emoji: "🗂️", title: "مال کدام کار بزرگ؟",
    words: { prompt: "هر کار کوچک را در سبد کار بزرگ خودش بگذار", jobs: JOB_WORDS.jobs, steps: JOB_WORDS.steps },
    make: function (rng, n, ctx) {
      var J = ctx.w("jobs"), S = ctx.w("steps"), two = rng.sample(Object.keys(JOBS), 2), items = [];
      two.forEach(function (k) { rng.sample([0, 1, 2, 3], 3).forEach(function (i) { items.push({ pic: JOBS[k][i], label: S[k][i], say: S[k][i], basket: k }); }); });
      return [{ type: "sort", key: two.slice().sort().join("-"), prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        baskets: two.map(function (k) { return { pic: JOBS[k][3], label: J[k], value: k }; }), items: rng.shuffle(items) }];
    }
  });

  /* «راه کوتاه‌تر» — think-sprout-p19. Two arrow programs that both take the rabbit to the carrot (the second goes out
     of its way and back): which is shorter? Both are checked on a board. Key: the programs. */
  var ARROW_GLYPH = { up: "⬆️", down: "⬇️", left: "⬅️", right: "➡️" }, BACK = { up: "down", down: "up", left: "right", right: "left" };
  B.PRACTICE.push({
    id: "think-sprout-p19", subject: "think", level: "sprout", objectives: ["think.spr.6", "think.spr.4"], needs: ["think-sprout-10"], lessons: ["think-sprout-10", "think-sprout-11"],
    emoji: "📏", title: "راه کوتاه‌تر",
    words: { prompt: "هر دو برنامه خرگوش را به هویج می‌رسانند. کدام کوتاه‌تر است؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 40 && out.length < Math.min(n, 2); t++) {
        var b = randomBoard(rng, 5, 5, 0), p = shortest(b, false, 8);
        if (!p || p.length < 2 || p.length > 5) continue;
        var at = rng.int(0, p.length), d = rng.pick(ARROWS), long = p.slice(0, at).concat([d, BACK[d]], p.slice(at));
        if (sim(b, long) !== "goal" || sim(b, long.slice(0, at + 1)) === "goal") continue;
        var a = p.map(function (x) { return ARROW_GLYPH[x]; }).join(""), l = long.map(function (x) { return ARROW_GLYPH[x]; }).join("");
        if (seen[a + l]) continue;
        seen[a + l] = true;
        out.push({ type: "choose", key: a + "|" + l, prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true,
          options: rng.shuffle([{ label: a, value: "short" }, { label: l, value: "long" }]), answer: "short" });
      }
      return out;
    }
  });

  /* «کوتاه‌ترین برنامه» — think-sprout-p20. 4×4 and 5×5 boards with walls where the block limit is exactly the shortest
     way (found by search). Key: the board. */
  B.PRACTICE.push({
    id: "think-sprout-p20", subject: "think", level: "sprout", objectives: ["think.spr.4"], needs: ["think-sprout-10"], lessons: ["think-sprout-10", "think-sprout-4", "think-sprout-11", "think-sprout-12"],
    emoji: "🥕", title: "کوتاه‌ترین برنامه",
    words: { prompt: "کوتاه‌ترین راه را پیدا کن: فقط {n} فلش داری." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 30 && out.length < Math.min(n, 2); t++) {
        var size = rng.int(4, 5), b = randomBoard(rng, size, size, rng.int(2, 5)), p = shortest(b, false, 9);
        if (!p || p.length < 3 || p.length > 7 || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), hero: "🐰", goalPic: "🥕", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: p.length, prompt: ctx.w("prompt", { n: fa(p.length) }) });
      }
      return out;
    }
  });

  /* «خرگوش کجا می‌رسد؟» — think-sprout-p21. A row of 6 or 7 squares and 3 to 5 arrows both ways: where does the rabbit
     end? Key: the row and the program. */
  B.PRACTICE.push({
    id: "think-sprout-p21", subject: "think", level: "sprout", objectives: ["think.spr.4"], needs: ["think-sprout-4"], lessons: ["think-sprout-4", "think-sprout-11", "think-sprout-5", "think-sprout-12"],
    emoji: "🔮", title: "خرگوش کجا می‌رسد؟",
    words: { prompt: "اول فکر کن: خرگوش این فلش‌ها را یکی‌یکی انجام می‌دهد. کجا می‌رسد؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 40 && out.length < Math.min(n, 3); t++) {
        var len = rng.int(6, 7), i = rng.int(0, len - 1), at = i, prog = [], ok = true, steps = rng.int(3, 5);
        for (var k = 0; k < steps && ok; k++) {
          var d = rng.pick([1, -1]);
          at += d;
          if (at < 0 || at >= len) ok = false;
          prog.push(d > 0 ? "➡️" : "⬅️");
        }
        var key = len + ":" + i + ":" + prog.join("");
        if (!ok || at === i || seen[key]) continue;
        seen[key] = true;
        var spots = rng.sample(Array.from({ length: len }, function (x, k) { return k; }).filter(function (k) { return k !== at; }), 2);
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: rowOf(len, i, "🐰", -1) + "   " + prog.join(""), ltr: true,
          options: rng.shuffle([at].concat(spots)).map(function (k) { return { label: rowOf(len, k, "🐰", -1), value: String(k) }; }), answer: String(at) });
      }
      return out;
    }
  });

  /* «کدام فلش اشتباه است؟» — think-sprout-p22. A row, the carrot 3 or 4 squares away, and a program with one arrow the
     wrong way: which one? Key: the row and the wrong place. */
  B.PRACTICE.push({
    id: "think-sprout-p22", subject: "think", level: "sprout", objectives: ["think.spr.5"], needs: ["think-sprout-5"], lessons: ["think-sprout-5", "think-sprout-12"],
    emoji: "🔧", title: "کدام فلش اشتباه است؟",
    words: { prompt: "این برنامه خرگوش را به هویج نمی‌رساند. کدام فلش اشتباه است؟", nth: ["فلش اول", "فلش دوم", "فلش سوم", "فلش چهارم"] },
    make: function (rng, n, ctx) {
      var N = ctx.w("nth"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var d = rng.int(3, 4) * rng.pick([1, -1]), len = Math.abs(d) + rng.int(1, 2), i = d > 0 ? rng.int(0, len - 1 - d) : rng.int(-d, len - 1), bad = rng.int(0, Math.abs(d) - 1);
        var key = len + ":" + i + ":" + d + ":" + bad;
        if (seen[key]) continue;
        seen[key] = true;
        var prog = Array.from({ length: Math.abs(d) }, function (x, k) { return k === bad ? (d > 0 ? "⬅️" : "➡️") : d > 0 ? "➡️" : "⬅️"; });
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: rowOf(len, i, "🐰", i + d, "🥕") + "   " + prog.join(""), ltr: true,
          options: prog.map(function (a, k) { return { label: N[k] + " " + a, value: String(k) }; }), answer: String(bad) });
      }
      return out;
    }
  });

  /* «جدول رمز» — think-sprout-p23. A code table (fruit, animals or shapes) in the prompt; match each picture to its arrow.
     Key: the table. */
  var CODE_TABLES = { fruit: ["🍎", "🍌", "🍇", "🍓"], animals: ["🐱", "🐶", "🐭", "🐰"], shapes: ["🔴", "🟦", "🔺", "⭐"] }, CODE_DIRS = ["up", "right", "down", "left"];
  B.PRACTICE.push({
    id: "think-sprout-p23", subject: "think", level: "sprout", objectives: ["think.spr.7"], needs: ["think-sprout-13"],
    emoji: "🗝️", title: "جدول رمز",
    words: { prompt: "رمز: {table}. هر تصویر را به فلشش برسان.", dirs: { up: "بالا", right: "راست", down: "پایین", left: "چپ" }, sep: "، " },
    make: function (rng, n, ctx) {
      var D = ctx.w("dirs"), k = rng.pick(Object.keys(CODE_TABLES)), pics = CODE_TABLES[k];
      var table = pics.map(function (p, i) { return p + " " + D[CODE_DIRS[i]]; }).join(ctx.w("sep")), q = ctx.w("prompt", { table: table });
      return [{ type: "pairs", key: k, prompt: q, say: q, pairs: pics.map(function (p, i) { return [p, ARROW_GLYPH[CODE_DIRS[i]]]; }) }];
    }
  });

  /* «پیام را بنویس» — think-sprout-p24. An arrow program of three or four different arrows: put the fruit cards in order to
     write it in the code of think-sprout-13. Key: the program. */
  B.PRACTICE.push({
    id: "think-sprout-p24", subject: "think", level: "sprout", objectives: ["think.spr.7"], needs: ["think-sprout-13"],
    emoji: "✉️", title: "پیام را بنویس",
    words: { prompt: "رمز: 🍎 بالا، 🍌 راست، 🍇 پایین، 🍓 چپ. این برنامه را با کارت‌های میوه بنویس: {prog}" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 10 && out.length < Math.min(n, 2); t++) {
        var dirs = rng.sample(CODE_DIRS, rng.int(3, 4)), key = dirs.join("-");
        if (seen[key]) continue;
        seen[key] = true;
        var q = ctx.w("prompt", { prog: ltrRun(dirs.map(function (d) { return ARROW_GLYPH[d]; }).join("")) });
        out.push({ type: "order", key: key, prompt: q, say: q, ltr: true, items: dirs.map(function (d) { return CODE_TABLES.fruit[CODE_DIRS.indexOf(d)]; }) });
      }
      return out;
    }
  });

  /* think-sprout-p25 to p27: counting what was sorted (think-sprout-14). */
  B.PRACTICE.push({
    id: "think-sprout-p25", subject: "think", level: "sprout", objectives: ["think.spr.8"], needs: ["think-sprout-14"],
    emoji: "📊", title: "کدام بیشتر است؟",
    words: { most: "کدام از همه بیشتر است؟", fewest: "کدام از همه کمتر است؟", more: "{a} چندتا از {b} بیشتر است؟" },
    make: function (rng, n, ctx) {
      var out = [];
      for (var t = 0; t < Math.min(n, 3); t++) {
        var kinds = rng.sample(["🍎", "🍌", "🍇", "🐟", "⭐", "🌷"], 3), counts = rng.sample([1, 2, 3, 4, 5, 6], 3), pics = [];
        kinds.forEach(function (k, i) { for (var j = 0; j < counts[i]; j++) pics.push(k); });
        var show = rng.shuffle(pics).join(""), ask = rng.pick(["most", "fewest", "more"]), key = ask + ":" + kinds.join("") + counts.join("");
        if (ask === "more") {
          var hi = counts.indexOf(Math.max.apply(null, counts)), lo = counts.indexOf(Math.min.apply(null, counts)), diff = counts[hi] - counts[lo];
          var q = ctx.w("more", { a: kinds[hi], b: kinds[lo] }), opts = [diff, diff + 1, Math.max(0, diff - 1) === diff ? diff + 2 : diff - 1].filter(function (v, i, a) { return v > 0 && a.indexOf(v) === i; });
          out.push({ type: "choose", key: key, prompt: q, say: q, show: show, options: rng.shuffle(opts).map(function (v) { return { label: fa(v), value: String(v) }; }), answer: String(diff) });
        } else {
          var best = (ask === "most" ? Math.max : Math.min).apply(null, counts);
          out.push({ type: "choose", key: key, prompt: ctx.w(ask), say: ctx.w(ask), show: show, pic: true, options: rng.shuffle(kinds.slice()), answer: kinds[counts.indexOf(best)] });
        }
      }
      return out;
    }
  });
  // Tally marks: bundles of five, then the rest.
  function tally(v) { var s = []; for (; v >= 5; v -= 5) s.push("||||̸"); if (v) s.push(new Array(v + 1).join("|")); return s.join(" "); }
  B.PRACTICE.push({
    id: "think-sprout-p26", subject: "think", level: "sprout", objectives: ["think.spr.8"], needs: ["think-sprout-14"],
    emoji: "✏️", title: "چوب‌خط",
    words: { read: "این چوب‌خط چندتا را نشان می‌دهد؟ (هر دسته پنج تاست.)", compare: "کدام بیشتر است؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        if (rng() < 0.6) {
          var v = rng.int(3, 14), key = "read-" + v;
          if (seen[key]) continue;
          seen[key] = true;
          var opts = [v, v + 1, v - 1, v + 5].filter(function (x) { return x > 0; }).slice(0, 3);
          out.push({ type: "choose", key: key, prompt: ctx.w("read"), say: ctx.w("read"), show: tally(v), ltr: true, options: rng.shuffle(opts).map(function (x) { return { label: fa(x), value: String(x) }; }), answer: String(v) });
        } else {
          var two = rng.sample(["🍎", "🍌", "🍇", "🐟"], 2), vals = rng.sample([3, 4, 6, 7, 8, 9, 11, 12], 2), k2 = "cmp-" + vals.join("-");
          if (seen[k2]) continue;
          seen[k2] = true;
          out.push({ type: "choose", key: k2, prompt: ctx.w("compare"), say: ctx.w("compare"), show: two[0] + " " + tally(vals[0]) + "    " + two[1] + " " + tally(vals[1]), ltr: true, pic: true,
            options: two.slice(), answer: two[vals[0] > vals[1] ? 0 : 1] });
        }
      }
      return out;
    }
  });
  B.PRACTICE.push({
    id: "think-sprout-p27", subject: "think", level: "sprout", objectives: ["think.spr.8"], needs: ["think-sprout-14"],
    emoji: "📶", title: "دسته‌ها را بچین",
    words: { prompt: "دسته‌ها را از کم به زیاد بچین" },
    make: function (rng, n, ctx) {
      var out = [];
      for (var t = 0; t < Math.min(n, 2); t++) {
        var pic = rng.pick(["🍎", "⭐", "🐟", "🌷", "🍪"]), nums = rng.sample([1, 2, 3, 4, 5, 6, 7], rng.int(3, 4)).sort(function (a, b) { return a - b; });
        out.push({ type: "order", key: pic + nums.join("-"), prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true, items: nums.map(function (v) { return { label: new Array(v + 1).join(pic) }; }) });
      }
      return out;
    }
  });

  /* think-sprout-p28 to p30: the parts of a computer (think-sprout-15). */
  var PART_PICS = { keyboard: "⌨️", mouse: "🖱️", mic: "🎤", camera: "📷", joystick: "🕹️", screen: "🖥️", speaker: "🔈", printer: "🖨️", headphones: "🎧", battery: "🔋" };
  var PART_NAMES = { keyboard: "صفحه‌کلید", mouse: "موشواره", mic: "میکروفون", camera: "دوربین", joystick: "دسته بازی", screen: "صفحه نمایش", speaker: "بلندگو", printer: "چاپگر", headphones: "هدفون", battery: "باتری" };
  B.PRACTICE.push({
    id: "think-sprout-p28", subject: "think", level: "sprout", objectives: ["think.spr.9"], needs: ["think-sprout-15"],
    emoji: "🖥️", title: "ورودی یا خروجی؟",
    words: { prompt: "چیزهایی که به رایانه چیزی می‌دهند در یک سبد، چیزهایی که از رایانه بیرون می‌آورند در سبد دیگر", labels: { in: "می‌رود تو", out: "می‌آید بیرون" }, things: PART_NAMES },
    make: sortBank([{ id: "inout", baskets: [{ v: "in", pic: "📥" }, { v: "out", pic: "📤" }],
      items: { keyboard: ["⌨️", "in"], mouse: ["🖱️", "in"], mic: ["🎤", "in"], camera: ["📷", "in"], joystick: ["🕹️", "in"],
        screen: ["🖥️", "out"], speaker: ["🔈", "out"], printer: ["🖨️", "out"], headphones: ["🎧", "out"] } }])
  });
  B.PRACTICE.push({
    id: "think-sprout-p29", subject: "think", level: "sprout", objectives: ["think.spr.9"], needs: ["think-sprout-15"],
    emoji: "🔌", title: "هر قسمت چه کار می‌کند؟",
    words: { prompt: "هر قسمت را به کارش برسان", a: PART_NAMES,
      b: { keyboard: "حرف نوشتن", mouse: "جابه‌جا کردن نشانگر", mic: "گرفتن صدا", camera: "گرفتن عکس", screen: "دیدن تصویر", speaker: "پخش صدا", printer: "چاپ روی کاغذ", battery: "نگه داشتن برق" } },
    make: pairsBank({ keyboard: ["⌨️", "🔤"], mouse: ["🖱️", "↖️"], mic: ["🎤", "🗣️"], camera: ["📷", "🖼️"], screen: ["🖥️", "👀"], speaker: ["🔈", "🎵"], printer: ["🖨️", "📄"], battery: ["🔋", "⚡"] }, 4)
  });
  pushAsk({
    id: "think-sprout-p30", subject: "think", level: "sprout", objectives: ["think.spr.9"], needs: ["think-sprout-15"],
    emoji: "🎤", title: "کدام قسمت؟",
    words: { items: {
      music: ["می‌خواهیم صدای آهنگ را بشنویم. کدام قسمت؟", "🔈 بلندگو", "🎤 میکروفون", "⌨️ صفحه‌کلید"],
      name: ["می‌خواهیم اسممان را بنویسیم. کدام قسمت؟", "⌨️ صفحه‌کلید", "🔈 بلندگو", "📷 دوربین"],
      sing: ["می‌خواهیم صدای آوازمان را ضبط کنیم. کدام قسمت؟", "🎤 میکروفون", "🖨️ چاپگر", "🖥️ صفحه نمایش"],
      video: ["می‌خواهیم در تماس تصویری مادربزرگ ما را ببیند. کدام قسمت؟", "📷 دوربین", "🔈 بلندگو", "🖱️ موشواره"],
      paper: ["می‌خواهیم نقاشی روی کاغذ بیاید. کدام قسمت؟", "🖨️ چاپگر", "🎤 میکروفون", "📷 دوربین"],
      click: ["می‌خواهیم روی یک تصویر بزنیم. کدام قسمت؟", "🖱️ موشواره", "🔈 بلندگو", "🔋 باتری"] } }
  });

  /* think-sprout-p31 to p33: when a device doesn't work (think-sprout-16). */
  B.PRACTICE.push({
    id: "think-sprout-p31", subject: "think", level: "sprout", objectives: ["think.spr.10"], needs: ["think-sprout-16"],
    emoji: "🔇", title: "اول چه را امتحان کنیم؟",
    words: { prompt: "هر مشکل را به اولین چیزی که امتحان می‌کنیم برسان",
      a: { sound: "صدا نمی‌آید", battery: "باتری تمام شده", dark: "صفحه سیاه است", paper: "چاپگر چاپ نمی‌کند", mouse: "موشواره کار نمی‌کند", net: "اینترنت قطع است" },
      b: { sound: "صدا را زیاد کن", battery: "به شارژ بزن", dark: "دکمه روشن را نگه دار", paper: "ببین کاغذ دارد؟", mouse: "ببین وصل است؟", net: "به بزرگ‌ترها بگو" } },
    make: pairsBank({ sound: ["🔇", "🔊"], battery: ["🪫", "🔌"], dark: ["⬛", "🔘"], paper: ["🖨️", "📄"], mouse: ["🖱️", "🔗"], net: ["📶", "🧑"] }, 4)
  });
  pushAsk({
    id: "think-sprout-p32", subject: "think", level: "sprout", objectives: ["think.spr.10"], needs: ["think-sprout-16"],
    emoji: "🪫", title: "کار نمی‌کند!",
    words: { items: {
      tablet: ["تبلت روشن نمی‌شود. اول چه کار کنیم؟", "ببینیم شارژ دارد یا نه", "محکم تکانش می‌دهیم", "بازش می‌کنیم"],
      sound: ["کارتون صدا ندارد. اول چه کار کنیم؟", "ببینیم صدا بسته است یا نه", "تبلت را می‌اندازیم", "گریه می‌کنیم"],
      smoke: ["از شارژر بو و دود می‌آید. چه کار کنیم؟", "دست نمی‌زنیم و زود به بزرگ‌ترها می‌گوییم", "خودمان از پریز درش می‌آوریم", "کاری نمی‌کنیم"],
      water: ["آب روی گوشی ریخت. چه کار کنیم؟", "به بزرگ‌ترها می‌گوییم", "روشنش می‌کنیم ببینیم کار می‌کند", "در یخچال می‌گذاریم"],
      stuck: ["بازی گیر کرده و هیچ چیز تکان نمی‌خورد. چه کار کنیم؟", "کمی صبر می‌کنیم و بعد به بزرگ‌ترها می‌گوییم", "صد بار روی صفحه می‌زنیم", "صفحه را فشار می‌دهیم"],
      message: ["روی صفحه پیامی آمد که نمی‌فهمیم. چه کار کنیم؟", "از بزرگ‌ترها می‌پرسیم", "روی همه دکمه‌ها می‌زنیم", "رایانه را خاموش می‌کنیم و نمی‌گوییم"] } }
  });
  B.PRACTICE.push({
    id: "think-sprout-p33", subject: "think", level: "sprout", objectives: ["think.spr.10"], needs: ["think-sprout-16"],
    emoji: "🛠️", title: "قدم‌های درست کردن",
    words: { prompt: "{job}. کارهایی را که امتحان می‌کنیم به ترتیب بچین.",
      jobs: { tablet: "تبلت روشن نمی‌شود", sound: "صدا نمی‌آید", printer: "چاپگر چاپ نمی‌کند" },
      steps: { tablet: ["ببین شارژ دارد؟", "دکمه روشن را نگه دار", "کمی صبر کن", "اگر نشد، به بزرگ‌ترها بگو"], sound: ["ببین صدا بسته است؟", "صدا را زیاد کن", "ببین هدفون درست وصل است؟", "اگر نشد، به بزرگ‌ترها بگو"],
        printer: ["ببین کاغذ دارد؟", "ببین به برق وصل است؟", "روشنش کن", "اگر نشد، به بزرگ‌ترها بگو"] } },
    make: orderBank({ tablet: ["🔌", "🔘", "⏳", "🧑"], sound: ["🔇", "🔊", "🎧", "🧑"], printer: ["📄", "🔌", "🔘", "🧑"] }, 2)
  });

  /* think-sprout-p34 to p36: passwords (think-sprout-17). */
  B.PRACTICE.push({
    id: "think-sprout-p34", subject: "think", level: "sprout", objectives: ["think.spr.11"], needs: ["think-sprout-17"],
    emoji: "🔑", title: "چه کسی رمز را بداند؟",
    words: { prompt: "چه کسی می‌تواند رمز تبلت تو را بداند؟", labels: { may: "می‌تواند بداند", not: "نباید بداند" },
      things: { mum: "مادر", dad: "پدر", friend: "دوست صمیمی", classmate: "هم‌کلاسی", online: "کسی در بازی اینترنتی", neighbour: "همسایه", cousin: "پسرخاله", shop: "فروشنده مغازه" } },
    make: sortBank([{ id: "who", baskets: [{ v: "may", pic: "🔓" }, { v: "not", pic: "🔒" }],
      items: { mum: ["👩", "may"], dad: ["👨", "may"], friend: ["🧒", "not"], classmate: ["👧", "not"], online: ["👤", "not"], neighbour: ["🧓", "not"], cousin: ["👦", "not"], shop: ["🧑‍💼", "not"] } }])
  });
  pushAsk({
    id: "think-sprout-p35", subject: "think", level: "sprout", objectives: ["think.spr.11"], needs: ["think-sprout-17"],
    emoji: "🚪", title: "رمز و خروج",
    words: { items: {
      friend: ["دوستت می‌گوید: «رمزت را بگو تا با هم بازی کنیم.» چه می‌گویی؟", "«رمزم را فقط پدر و مادرم می‌دانند.»", "رمز را آهسته در گوشش می‌گویم"],
      done: ["بازی‌ات با رایانه مدرسه تمام شد. چه کار می‌کنی؟", "«خروج» را می‌زنم", "همین‌طور بلند می‌شوم و می‌روم"],
      paper: ["رمزت را کجا نگه داریم؟", "در ذهنم، و پدر و مادرم هم می‌دانند", "روی کاغذی روی میز مدرسه"],
      game: ["در یک بازی، کسی رمزت را می‌خواهد تا «جایزه» بدهد. چه کار می‌کنی؟", "نمی‌دهم و به پدر یا مادر می‌گویم", "رمز را می‌دهم"],
      saw: ["فکر می‌کنی کسی رمزت را دیده. چه کار می‌کنی؟", "به پدر یا مادر می‌گویم تا رمز را عوض کنیم", "کاری نمی‌کنم"] } }
  });
  pushAsk({
    id: "think-sprout-p36", subject: "think", level: "sprout", objectives: ["think.spr.11"], needs: ["think-sprout-17"],
    emoji: "❔", title: "رمز: درست یا نادرست؟",
    words: { items: {
      key: ["درست یا نادرست: «رمز مثل کلید در خانه است.»", "✅ درست", "❌ نادرست"],
      friend: ["درست یا نادرست: «رمز را به دوست صمیمی‌مان می‌گوییم.»", "❌ نادرست", "✅ درست"],
      logout: ["درست یا نادرست: «وقتی کارمان با رایانه دیگران تمام شد، خارج می‌شویم.»", "✅ درست", "❌ نادرست"],
      parents: ["درست یا نادرست: «پدر و مادر می‌توانند رمز ما را بدانند.»", "✅ درست", "❌ نادرست"],
      wall: ["درست یا نادرست: «رمز را روی دیوار کلاس می‌نویسیم تا یادمان نرود.»", "❌ نادرست", "✅ درست"],
      stranger: ["درست یا نادرست: «اگر کسی در بازی رمزمان را خواست، می‌دهیم.»", "❌ نادرست", "✅ درست"] } }
  });

  /* think-sprout-p37 to p39: kind messages (think-sprout-18). */
  B.PRACTICE.push({
    id: "think-sprout-p37", subject: "think", level: "sprout", objectives: ["think.spr.12"], needs: ["think-sprout-18"],
    emoji: "💌", title: "مهربان یا نامهربان؟",
    words: { prompt: "پیام‌های مهربان در یک سبد، پیام‌های نامهربان در سبد دیگر", labels: { kind: "مهربان", unkind: "نامهربان" },
      things: { well: "نقاشی‌ات خیلی قشنگ بود!", thanks: "ممنون که کمکم کردی.", miss: "دلم برایت تنگ شده.", play: "فردا با هم بازی کنیم؟", sorry: "ببخشید، اشتباه کردم.",
        ugly: "نقاشی‌ات زشت است.", dumb: "تو هیچ چیز بلد نیستی.", noplay: "هیچ‌کس با تو بازی نمی‌کند.", laugh: "همه به تو می‌خندند.", go: "از گروه ما برو بیرون." } },
    make: sortBank([{ id: "messages", baskets: [{ v: "kind", pic: "😊" }, { v: "unkind", pic: "😟" }],
      items: { well: ["🎨", "kind"], thanks: ["🙏", "kind"], miss: ["💛", "kind"], play: ["⚽", "kind"], sorry: ["🤝", "kind"],
        ugly: ["👎", "unkind"], dumb: ["😠", "unkind"], noplay: ["🚫", "unkind"], laugh: ["😂", "unkind"], go: ["👉", "unkind"] } }])
  });
  pushAsk({
    id: "think-sprout-p38", subject: "think", level: "sprout", objectives: ["think.spr.12"], needs: ["think-sprout-18"],
    emoji: "🛑", title: "پیام ترسناک",
    words: { items: {
      scary: ["پیامی آمد که ترسیدی. چه کار کنیم؟", "دست نگه می‌داریم، جواب نمی‌دهیم و به بزرگ‌ترها می‌گوییم", "جواب بدی می‌دهیم", "پاکش می‌کنیم و به کسی نمی‌گوییم"],
      unkind: ["کسی برایت پیام نامهربان فرستاد. چه کار کنیم؟", "جواب نمی‌دهیم و به بزرگ‌ترها نشان می‌دهیم", "ما هم پیام نامهربان می‌فرستیم", "برای همه می‌فرستیمش"],
      stranger: ["کسی که نمی‌شناسی پیام داد: «بیا دوست شویم، به کسی نگو.» چه کار کنیم؟", "به بزرگ‌ترها می‌گوییم", "جواب می‌دهیم و راز نگه می‌داریم"],
      photo: ["عکس ترسناکی برایت فرستادند. چه کار کنیم؟", "صفحه را کنار می‌گذاریم و به بزرگ‌ترها می‌گوییم", "باز هم نگاهش می‌کنیم", "برای دوستانمان می‌فرستیم"],
      friend: ["دوستت می‌گوید برایش پیام بدی فرستاده‌اند و ناراحت است. چه کار کنیم؟", "به او می‌گوییم به بزرگ‌ترها بگوید و کنارش می‌مانیم", "به او می‌خندیم"] } }
  });
  pushAsk({
    id: "think-sprout-p39", subject: "think", level: "sprout", objectives: ["think.spr.12"], needs: ["think-sprout-18"],
    emoji: "🌸", title: "مهربان‌تر بگو",
    words: { items: {
      ugly: ["«نقاشی‌ات زشت است.» کدام مهربان‌تر است؟", "«رنگ‌های نقاشی‌ات را دوست دارم. این قسمتش را چطور کشیدی؟»", "«نقاشی‌ات خیلی زشت است.»"],
      slow: ["«تو خیلی کندی!» کدام مهربان‌تر است؟", "«صبر می‌کنم تا تو هم برسی.»", "«همیشه آخری!»"],
      lost: ["«تو باختی، هیچی بلد نیستی!» کدام مهربان‌تر است؟", "«بازی خوبی بود! یک دور دیگر؟»", "«من از تو بهترم!»"],
      noplay: ["«با تو بازی نمی‌کنم!» کدام مهربان‌تر است؟", "«الان این بازی را تمام می‌کنم، بعد با هم بازی کنیم؟»", "«برو، تو را نمی‌خواهیم!»"],
      wrong: ["«جوابت غلط است، چقدر بد!» کدام مهربان‌تر است؟", "«فکر کنم این یکی فرق دارد. با هم ببینیم؟»", "«باز هم غلط گفتی!»"] } }
  });

  /* «چه کسی اول صف است؟» — think-sprout-p40. Three children in a line and two clues: who is first, who is last? Key:
     the line and the question. */
  var KID_NAMES = ["sara", "arash", "leila", "reza", "mina", "omid"];
  var KID_WORDS = { sara: "سارا", arash: "آرش", leila: "لیلا", reza: "رضا", mina: "مینا", omid: "امید" };
  B.PRACTICE.push({
    id: "think-sprout-p40", subject: "think", level: "sprout", objectives: ["think.spr.13"], needs: ["think-sprout-19"],
    emoji: "🚶", title: "چه کسی اول صف است؟",
    words: { names: KID_WORDS, front: "{a} جلوی {b} ایستاده است", ask: "سه بچه در صف‌اند. سرنخ ۱: {k1}. سرنخ ۲: {k2}. {q}", first: "چه کسی اول صف است؟", last: "چه کسی آخر صف است؟" },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var line = rng.sample(KID_NAMES, 3), q = rng.pick(["first", "last"]), key = line.join("") + q;
        if (seen[key]) continue;
        seen[key] = true;
        var clues = rng.shuffle([ctx.w("front", { a: N[line[0]], b: N[line[1]] }), ctx.w("front", { a: N[line[1]], b: N[line[2]] })]);
        var s = ctx.w("ask", { k1: clues[0], k2: clues[1], q: ctx.w(q) }), right = q === "first" ? line[0] : line[2];
        out.push({ type: "choose", key: key, prompt: s, say: s, options: rng.shuffle(line.slice()).map(function (k) { return { label: N[k], value: k }; }), answer: right });
      }
      return out;
    }
  });
  pushAsk({
    id: "think-sprout-p41", subject: "think", level: "sprout", objectives: ["think.spr.13"], needs: ["think-sprout-19"],
    emoji: "❓", title: "من چی‌ام؟",
    words: { items: {
      cherry: ["قرمزم، کوچکم و دوتا دوتا از درخت آویزانم. من چی‌ام؟", "🍒", "🍎", "🍓"],
      fish: ["در آب زندگی می‌کنم، باله دارم و پا ندارم. من چی‌ام؟", "🐟", "🦆", "🐸"],
      bee: ["زرد و سیاهم، پرواز می‌کنم و عسل می‌سازم. من چی‌ام؟", "🐝", "🦋", "🐦"],
      umbrella: ["وقتی باران می‌آید بازم می‌کنند و بالای سرشان می‌گیرند. من چی‌ام؟", "☂️", "🧢", "🧥"],
      moon: ["شب‌ها در آسمانم و گاهی گردم و گاهی باریک. من چی‌ام؟", "🌙", "☀️", "⭐"],
      watermelon: ["از بیرون سبزم، از تو قرمز، و دانه‌های سیاه دارم. من چی‌ام؟", "🍉", "🍏", "🥒"],
      snail: ["خیلی آهسته راه می‌روم و خانه‌ام را روی پشتم می‌برم. من چی‌ام؟", "🐌", "🐢", "🐛"],
      key: ["کوچکم، از فلزم و در را باز می‌کنم. من چی‌ام؟", "🔑", "🔨", "🥄"] } }
  });

  // ---------------- Sapling ----------------
  var FACE_WORDS = { up: "بالا", right: "راست", down: "پایین", left: "چپ" };
  function turned(face, op) { return CLOCK[(CLOCK.indexOf(face) + (op === "cw" ? 1 : 3)) % 4]; }

  /* «حالا رو به کجاست؟» — think-sapling-p9. A robot facing one way and one turn (two or three after think-sapling-2):
     which way does it face now? Key: the facing and the turns. */
  B.PRACTICE.push({
    id: "think-sapling-p9", subject: "think", level: "sapling", objectives: ["think.sap.1"], needs: ["think-sapling-1"], lessons: ["think-sapling-1", "think-sapling-2", "think-sapling-6"],
    emoji: "🧭", title: "حالا رو به کجاست؟",
    words: { prompt: "ربات رو به {face} است. {turns}. حالا رو به کجاست؟", faces: FACE_WORDS, cw: "به راست می‌چرخد", ccw: "به چپ می‌چرخد", then: "، بعد " },
    make: function (rng, n, ctx) {
      var F = ctx.w("faces"), out = [], seen = {}, most = ctx.done("think-sapling-2") ? 3 : 1;
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var face = rng.pick(CLOCK), turns = [], end = face;
        for (var k = rng.int(1, most); k > 0; k--) { var op = rng.pick(["cw", "ccw"]); turns.push(op); end = turned(end, op); }
        var key = face + ":" + turns.join(",");
        if (seen[key]) continue;
        seen[key] = true;
        var q = ctx.w("prompt", { face: F[face], turns: turns.map(function (op) { return ctx.w(op); }).join(ctx.w("then")) });
        var opts = [end].concat(rng.sample(CLOCK.filter(function (f) { return f !== end; }), 2));
        out.push({ type: "choose", key: key, prompt: q, say: q, show: "🤖" + ARROW_GLYPH[face],
          options: rng.shuffle(opts).map(function (f) { return { label: ARROW_GLYPH[f] + " " + F[f], value: f }; }), answer: end });
      }
      return out;
    }
  });

  /* «کدام چرخش؟» — think-sapling-p10. The robot faces one way and must face another: turn right, turn left or turn
     around? Key: the two facings. */
  B.PRACTICE.push({
    id: "think-sapling-p10", subject: "think", level: "sapling", objectives: ["think.sap.1"], needs: ["think-sapling-1"], lessons: ["think-sapling-1", "think-sapling-2", "think-sapling-6"],
    emoji: "↪️", title: "کدام چرخش؟",
    words: { prompt: "ربات رو به {face} است و باید رو به {to} بشود. چه کار کند؟", faces: FACE_WORDS, cw: "به راست بچرخد", ccw: "به چپ بچرخد", around: "دو بار بچرخد" },
    make: function (rng, n, ctx) {
      var F = ctx.w("faces"), keys = [];
      CLOCK.forEach(function (a) { CLOCK.forEach(function (b) { if (a !== b) keys.push(a + ":" + b); }); });
      return pickKeys(rng, keys, Math.min(n, 3), ctx).map(function (key) {
        var a = key.split(":")[0], b = key.split(":")[1], d = (CLOCK.indexOf(b) - CLOCK.indexOf(a) + 4) % 4, right = d === 1 ? "cw" : d === 3 ? "ccw" : "around";
        var q = ctx.w("prompt", { face: F[a], to: F[b] });
        return { type: "choose", key: key, prompt: q, say: q, show: "🤖" + ARROW_GLYPH[a] + "  ➜  " + ARROW_GLYPH[b], ltr: true,
          options: ["cw", "ccw", "around"].map(function (o) { return { label: ctx.w(o), value: o }; }), answer: right };
      });
    }
  });

  /* «اولین برنامه چرخشی» — think-sapling-p11. 3×3 and 4×4 boards where the shortest forward-and-turn program has exactly
     one turn (found by search); the limit is that program plus one. Key: the board. */
  B.PRACTICE.push({
    id: "think-sapling-p11", subject: "think", level: "sapling", objectives: ["think.sap.1"], needs: ["think-sapling-1"], lessons: ["think-sapling-1", "think-sapling-2"],
    emoji: "🤖", title: "اولین برنامه چرخشی",
    words: { prompt: "ربات {face} است. با «جلو» و یک چرخش به ستاره برسانش.", faces: { up: "رو به بالا", down: "رو به پایین", left: "رو به چپ", right: "رو به راست" } },
    make: function (rng, n, ctx) {
      var F = ctx.w("faces"), out = [], seen = {};
      for (var t = 0; t < 200 && out.length < Math.min(n, 2); t++) {
        var size = rng.int(3, 4), b = randomBoard(rng, size, size, rng.int(0, 1));
        b.face = rng.pick(CLOCK);
        var p = shortest(b, true, 8);
        if (!p || p.filter(function (op) { return op !== "fwd"; }).length !== 1 || seen[sig(b)]) continue;
        seen[sig(b)] = true;
        out.push({ type: "code", key: sig(b), blocks: "turn", face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls, max: p.length + 1,
          prompt: ctx.w("prompt", { face: F[b.face] }) });
      }
      return out;
    }
  });

  /* «برنامه چرخشی را درست کن» — think-sapling-p12. A shortest forward-and-turn program with one block wrong (a turn the
     other way, or a forward made a turn); kept only when it really misses. Key: the board and the change. */
  B.PRACTICE.push({
    id: "think-sapling-p12", subject: "think", level: "sapling", objectives: ["think.sap.3"], needs: ["think-sapling-6"], lessons: ["think-sapling-6", "think-sapling-11", "think-sapling-12"],
    emoji: "🪛", title: "برنامه چرخشی را درست کن",
    words: { prompt: "این برنامه ربات را به ستاره نمی‌رساند. اجرا کن، ببین کجا اشتباه می‌رود و یک قطعه را درست کن." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 200 && out.length < Math.min(n, 2); t++) {
        var b = randomBoard(rng, 5, 5, rng.int(2, 4));
        b.face = rng.pick(CLOCK);
        var p = shortest(b, true, 10);
        if (!p || p.length < 4 || p.length > 8 || p.indexOf("cw") < 0 && p.indexOf("ccw") < 0) continue;
        var g = p.slice(), i = rng.int(0, g.length - 1);
        g[i] = g[i] === "fwd" ? rng.pick(["cw", "ccw"]) : g[i] === "cw" ? "ccw" : "cw";
        var key = sig(b) + "#" + i;
        if (seen[key] || sim(b, g) === "goal") continue;
        seen[key] = true;
        out.push({ type: "code", key: key, blocks: "turn", face: b.face, goalPic: "⭐", size: b.size, start: b.start, goal: b.goal, walls: b.walls, given: g, max: p.length + 1, prompt: ctx.w("prompt") });
      }
      return out;
    }
  });

  /* think-sapling-p13 and p14: repeat blocks written as text (👣 forward, ↻ turn right, ↺ turn left). */
  var MOVE_GLYPH = { fwd: "👣", cw: "↻", ccw: "↺" };
  var PIECES = [["fwd"], ["fwd", "cw"], ["fwd", "fwd", "ccw"], ["fwd", "cw", "fwd", "ccw"], ["fwd", "fwd", "cw"], ["cw", "fwd"]];
  function piece(p) { return p.map(function (op) { return MOVE_GLYPH[op]; }).join(""); }
  function repeatText(k, p) { return "🔁 " + fa(k) + " × [" + piece(p) + "]"; }
  function longText(k, p) { var s = ""; for (var i = 0; i < k; i++) s += piece(p); return s; }
  B.PRACTICE.push({
    id: "think-sapling-p13", subject: "think", level: "sapling", objectives: ["think.sap.2"], needs: ["think-sapling-3"], lessons: ["think-sapling-3", "think-sapling-7", "think-sapling-5", "think-sapling-10", "think-sapling-11", "think-sapling-12"],
    emoji: "🔁", title: "چند بار؟",
    words: { times: "در این برنامه تکه {p} چند بار تکرار شده است؟", same: "کدام «تکرار» همین کار را می‌کند؟", legend: "(👣 جلو، ↻ به راست، ↺ به چپ)" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var pi = rng.int(0, PIECES.length - 1), p = PIECES[pi], k = rng.int(2, 5), same = ctx.done("think-sapling-7") && rng() < 0.5, key = (same ? "same" : "times") + pi + ":" + k;
        if (seen[key]) continue;
        seen[key] = true;
        if (!same) {
          var q = ctx.w("times", { p: ltrRun(piece(p)) }) + " " + ctx.w("legend");
          var opts = [k, k + 1, k - 1 > 1 ? k - 1 : k + 2];
          out.push({ type: "choose", key: key, prompt: q, say: q, show: longText(k, p), ltr: true, options: rng.shuffle(opts).map(function (x) { return { label: fa(x), value: String(x) }; }), answer: String(k) });
        } else {
          var other = PIECES[(pi + 1) % PIECES.length], q2 = ctx.w("same") + " " + ctx.w("legend");
          var o = [repeatText(k, p), repeatText(k === 5 ? 4 : k + 1, p), repeatText(k, other)];
          out.push({ type: "choose", key: key, prompt: q2, say: q2, show: longText(k, p), ltr: true, options: rng.shuffle(o).map(function (x, i) { return { label: x, value: x }; }), answer: o[0] });
        }
      }
      return out;
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p14", subject: "think", level: "sapling", objectives: ["think.sap.2"], needs: ["think-sapling-3"], lessons: ["think-sapling-3", "think-sapling-7", "think-sapling-5"],
    emoji: "📜", title: "تکرار را باز کن",
    words: { prompt: "این «تکرار» را باز کن: کدام برنامه بلند همین کار را می‌کند؟ (👣 جلو، ↻ به راست، ↺ به چپ)" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 3); t++) {
        var pi = rng.int(1, PIECES.length - 1), p = PIECES[pi], k = rng.int(2, 4), key = pi + ":" + k;
        if (seen[key]) continue;
        seen[key] = true;
        var swapped = p.slice().reverse(), o = [longText(k, p), longText(k + 1, p), piece(swapped) === piece(p) ? longText(k, PIECES[0]) : longText(k, swapped)];
        if (o[2] === o[0]) continue;
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), show: repeatText(k, p), ltr: true,
          options: rng.shuffle(o).map(function (x) { return { label: x, value: x }; }), answer: o[0] });
      }
      return out;
    }
  });

  /* «الگوی حرکت» — think-sapling-p15. Moves in a repeating pattern to continue (arrows or forward-and-turn). Key: the
     piece and the gaps. */
  var MOVE_UNITS = [["⬆️", "➡️"], ["⬆️", "⬆️", "➡️"], ["➡️", "⬇️", "➡️"], ["👣", "↻"], ["👣", "👣", "↺"], ["👣", "↻", "👣", "↺"]];
  B.PRACTICE.push({
    id: "think-sapling-p15", subject: "think", level: "sapling", objectives: ["think.sap.2"], needs: ["think-sapling-3"], lessons: ["think-sapling-3", "think-sapling-7"],
    emoji: "👣", title: "الگوی حرکت",
    words: { prompt: "حرکت‌ها یک الگو دارند. جاهای خالی را پر کن." },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var ui = rng.int(0, MOVE_UNITS.length - 1), u = MOVE_UNITS[ui], seq = [];
        for (var i = 0; i < Math.max(6, u.length * 3); i++) seq.push(u[i % u.length]);
        var blanks = rng.sample(seq.map(function (x, i) { return i; }).slice(u.length), rng.int(1, 2)).sort(function (a, b) { return a - b; }), key = ui + ":" + blanks.join(",");
        if (seen[key]) continue;
        seen[key] = true;
        var glyphs = u.filter(function (g, i, a) { return a.indexOf(g) === i; }), extra = rng.pick(["⬅️", "⬇️", "↺", "↻", "⬆️"].filter(function (g) { return glyphs.indexOf(g) < 0; }));
        out.push({ type: "pattern", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true, seq: seq, blanks: blanks, options: rng.shuffle(glyphs.concat([extra])) });
      }
      return out;
    }
  });

  /* «مرتب است یا نه؟» — think-sapling-p16. Rows of five numbers: in order from small to big, or with two neighbours
     swapped. Key: the round. */
  B.PRACTICE.push({
    id: "think-sapling-p16", subject: "think", level: "sapling", objectives: ["think.sap.4"], needs: ["think-sapling-4"], lessons: ["think-sapling-4", "think-sapling-8", "think-sapling-9"],
    emoji: "🔢", title: "مرتب است یا نه؟",
    words: { prompt: "ردیف‌هایی که از کوچک به بزرگ مرتب‌اند در یک سبد، بقیه در سبد دیگر", yes: "مرتب", no: "نامرتب" },
    make: function (rng, n, ctx) {
      var items = [];
      for (var r = 0; r < 6; r++) {
        var row = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 5).sort(function (a, b) { return a - b; }), ok = r % 2 === 0;
        if (!ok) { var i = rng.int(0, 3), x = row[i]; row[i] = row[i + 1]; row[i + 1] = x; }
        items.push({ label: row.map(fa).join(" "), basket: ok ? "yes" : "no" });
      }
      return [{ type: "sort", key: "rows", prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        baskets: [{ pic: "✅", label: ctx.w("yes"), value: "yes" }, { pic: "🔀", label: ctx.w("no"), value: "no" }], items: rng.shuffle(items) }];
    }
  });

  /* «روزها و ماه‌ها» — think-sapling-p17. Four days of the week, or four months, to put in order. Key: the names. */
  B.PRACTICE.push({
    id: "think-sapling-p17", subject: "think", level: "sapling", objectives: ["think.sap.4"], needs: ["think-sapling-4"], lessons: ["think-sapling-4", "think-sapling-9"],
    emoji: "🗓️", title: "روزها و ماه‌ها",
    words: { days: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"], months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
      dayPrompt: "این روزها را به ترتیب هفته بچین (هفته از شنبه شروع می‌شود)", monthPrompt: "این ماه‌ها را به ترتیب سال بچین (سال از فروردین شروع می‌شود)" },
    make: function (rng, n, ctx) {
      return ["days", "months"].map(function (k) {
        var list = ctx.w(k), idx = rng.sample(list.map(function (x, i) { return i; }), 4).sort(function (a, b) { return a - b; }), q = ctx.w(k === "days" ? "dayPrompt" : "monthPrompt");
        return { type: "order", key: k + idx.join("-"), prompt: q, say: q, numbered: true, items: idx.map(function (i) { return { label: list[i], say: list[i] }; }) };
      }).slice(0, n);
    }
  });

  /* «عدد مرا حدس بزن» — think-sapling-p18. A number between 1 and 20 (1 and 50 after think-sapling-9), a guess and the
     answer "bigger" or "smaller": the best next guess is the middle of what is left. Key: the numbers. */
  B.PRACTICE.push({
    id: "think-sapling-p18", subject: "think", level: "sapling", objectives: ["think.sap.5"], needs: ["think-sapling-8"], lessons: ["think-sapling-8", "think-sapling-9"],
    emoji: "🤔", title: "عدد مرا حدس بزن",
    words: { prompt: "عددی بین {lo} و {hi} در ذهن من است. تو گفتی {g}. گفتم: «{hint}». بهترین حدس بعدی کدام است؟", bigger: "بزرگ‌تر است", smaller: "کوچک‌تر است" },
    make: function (rng, n, ctx) {
      var out = [], seen = {}, hi = ctx.done("think-sapling-9") ? 50 : 20;
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var g = Math.floor((1 + hi) / 2), s = rng.int(1, hi);
        if (s === g) continue;
        var big = s > g, lo2 = big ? g + 1 : 1, hi2 = big ? hi : g - 1, mid = Math.floor((lo2 + hi2) / 2), key = hi + ":" + (big ? "b" : "s");
        if (seen[key]) continue;
        seen[key] = true;
        var wrong = [big ? lo2 : hi2, big ? rng.int(2, g - 1) : rng.int(g + 1, hi - 1)].filter(function (x) { return x !== mid; });
        var q = ctx.w("prompt", { lo: fa(1), hi: fa(hi), g: fa(g), hint: ctx.w(big ? "bigger" : "smaller") });
        out.push({ type: "choose", key: key, prompt: q, say: q, options: rng.shuffle([mid].concat(wrong)).map(function (x) { return { label: fa(x), value: String(x) }; }), answer: String(mid) });
      }
      return out;
    }
  });

  /* «یکی‌یکی نگاه کن» — think-sapling-p19. A mixed row of cards: looking one by one from the left, how many cards do you
     look at to find the number? Key: the row and the number. */
  B.PRACTICE.push({
    id: "think-sapling-p19", subject: "think", level: "sapling", objectives: ["think.sap.5"], needs: ["think-sapling-8"], lessons: ["think-sapling-8", "think-sapling-9"],
    emoji: "🃏", title: "یکی‌یکی نگاه کن",
    words: { prompt: "کارت‌ها مرتب نیستند. از چپ یکی‌یکی نگاه می‌کنیم تا {x} را پیدا کنیم. چند کارت را نگاه می‌کنیم؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var row = rng.sample([2, 3, 5, 7, 8, 11, 12, 14, 16, 19, 21, 25], 7), at = rng.int(1, 6), key = row.join("-") + ":" + at;
        if (seen[key]) continue;
        seen[key] = true;
        var q = ctx.w("prompt", { x: fa(row[at]) }), right = at + 1, opts = [right, right === 7 ? 6 : right + 1, row[at] <= 7 && row[at] !== right ? row[at] : right - 1];
        opts = opts.filter(function (v, i, a) { return v > 0 && a.indexOf(v) === i; });
        out.push({ type: "choose", key: key, prompt: q, say: q, show: row.map(fa).join("\u2003"), ltr: true, options: rng.shuffle(opts).map(function (v) { return { label: fa(v), value: String(v) }; }), answer: String(right) });
      }
      return out;
    }
  });

  /* think-sapling-p20 to p22: precise instructions (think-sapling-25). */
  pushAsk({
    id: "think-sapling-p20", subject: "think", level: "sapling", objectives: ["think.sap.6"], needs: ["think-sapling-25"], lessons: ["think-sapling-25", "think-sapling-10", "think-sapling-12"],
    emoji: "📝", title: "دستور دقیق‌تر",
    words: { items: {
      bread: ["کدام دستور دقیق‌تر است؟", "«دو تکه نان از کیسه بیرون بیاور و روی بشقاب بگذار.»", "«نان را درست کن.»"],
      water: ["کدام دستور دقیق‌تر است؟", "«لیوان را زیر شیر بگیر و تا نیمه آب کن.»", "«آب بیاور.»"],
      walk: ["کدام دستور دقیق‌تر است؟", "«سه قدم جلو برو، بعد به راست بچرخ.»", "«برو آن طرف.»"],
      draw: ["کدام دستور دقیق‌تر است؟", "«وسط کاغذ یک دایره زرد بکش.»", "«یک چیزی بکش.»"],
      shoes: ["کدام دستور دقیق‌تر است؟", "«کفش‌ها را از کنار در بردار و در جاکفشی بگذار.»", "«کفش‌ها را جمع کن.»"],
      plant: ["کدام دستور دقیق‌تر است؟", "«هر روز صبح یک لیوان آب به گلدان کنار پنجره بده.»", "«به گل آب بده.»"],
      tea: ["کدام دستور دقیق‌تر است؟", "«یک قاشق چای خشک در قوری بریز، بعد آب جوش.»", "«چای درست کن.»"] } }
  });
  var RECIPES = { sandwich: ["🍞", "🧈", "🧀", "🥪"], tea: ["🫖", "🔥", "🍃", "💧"], fruit: ["🍎", "🚰", "🔪", "🍽️"], teeth: ["🪥", "🧴", "😁", "💧"], seed: ["🪴", "👆", "🌱", "💧"] };
  var RECIPE_WORDS = {
    jobs: { sandwich: "لقمه نان و پنیر", tea: "دم کردن چای", fruit: "آماده کردن سیب", teeth: "مسواک زدن", seed: "کاشتن دانه" },
    steps: { sandwich: ["دو تکه نان بردار", "روی یک تکه کره بمال", "پنیر را روی کره بگذار", "تکه دیگر نان را رویش بگذار"],
      tea: ["کتری را آب کن", "کتری را روی گاز بگذار تا جوش بیاید", "یک قاشق چای خشک در قوری بریز", "آب جوش را در قوری بریز"],
      fruit: ["یک سیب بردار", "سیب را زیر آب بشوی", "از یک بزرگ‌تر بخواه آن را تکه کند", "تکه‌ها را در بشقاب بگذار"],
      teeth: ["مسواک را خیس کن", "به اندازه یک نخود خمیردندان بزن", "دو دقیقه مسواک بزن", "دهانت را آب بکش"],
      seed: ["گلدان را از خاک پر کن", "با انگشت یک چاله کوچک بکن", "دانه را در چاله بگذار", "رویش خاک بریز و آب بده"] }
  };
  B.PRACTICE.push({
    id: "think-sapling-p21", subject: "think", level: "sapling", objectives: ["think.sap.6"], needs: ["think-sapling-25"],
    emoji: "🕳️", title: "قدم جاافتاده",
    words: { prompt: "دستور «{job}»: {steps}. کدام قدم جا افتاده است؟", then: "، بعد ", jobs: RECIPE_WORDS.jobs, steps: RECIPE_WORDS.steps },
    make: function (rng, n, ctx) {
      var J = ctx.w("jobs"), S = ctx.w("steps"), keys = Object.keys(RECIPES);
      return pickKeys(rng, keys, Math.min(n, 2), ctx).map(function (k) {
        var gap = rng.int(0, 3), shown = S[k].filter(function (x, i) { return i !== gap; }), others = rng.sample(keys.filter(function (x) { return x !== k; }), 2);
        var q = ctx.w("prompt", { job: J[k], steps: shown.join(ctx.w("then")) });
        var opts = [{ label: RECIPES[k][gap] + " " + S[k][gap], value: "right" }].concat(others.map(function (o, i) { var j = rng.int(0, 3); return { label: RECIPES[o][j] + " " + S[o][j], value: "w" + i }; }));
        return { type: "choose", key: k + ":" + gap, prompt: q, say: q, options: rng.shuffle(opts), answer: "right" };
      });
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p22", subject: "think", level: "sapling", objectives: ["think.sap.6"], needs: ["think-sapling-25"],
    emoji: "🥪", title: "دستور به ترتیب",
    words: { prompt: "دستور «{job}» را به ترتیب بچین", jobs: RECIPE_WORDS.jobs, steps: RECIPE_WORDS.steps },
    make: orderBank(RECIPES, 2)
  });

  /* «قطعه کمتر» — think-sapling-p23. A long program and a repeat that does the same: which uses fewer blocks? Sometimes
     the long one is shorter (a piece done only twice, with nothing to save). Key: the programs. */
  B.PRACTICE.push({
    id: "think-sapling-p23", subject: "think", level: "sapling", objectives: ["think.sap.6", "think.sap.2"], needs: ["think-sapling-10"], lessons: ["think-sapling-10", "think-sapling-12"],
    emoji: "✂️", title: "قطعه کمتر",
    words: { prompt: "این دو برنامه یک کار را می‌کنند. کدام قطعه کمتری دارد؟ («تکرار» هم یک قطعه است.)" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var pi = rng.int(0, PIECES.length - 1), p = PIECES[pi], k = rng.int(2, 5), plain = k * p.length, rep = 1 + p.length, key = pi + ":" + k;
        if (plain === rep || seen[key]) continue;
        seen[key] = true;
        var o = [{ label: longText(k, p), value: plain < rep ? "right" : "long" }, { label: repeatText(k, p), value: rep < plain ? "right" : "rep" }];
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true, stack: true, options: rng.shuffle(o), answer: "right" });
      }
      return out;
    }
  });

  /* think-sapling-p24 and p25: "and" and "or" (think-sapling-13), with the things of think-sapling-p5. */
  var AND_PROPS = { red: "قرمز", yellow: "زرد", green: "سبز", blue: "آبی", brown: "قهوه‌ای", fruit: "میوه", animal: "حیوان", toy: "اسباب‌بازی" };
  B.PRACTICE.push({
    id: "think-sapling-p24", subject: "think", level: "sapling", objectives: ["think.sap.15"], needs: ["think-sapling-13"],
    emoji: "⚖️", title: "«و»، «یا»: درست است؟",
    words: { and: "در این تصویرها چیزی هست که هم {c} باشد و هم {k}. درست است؟", or: "هر کدام از این‌ها یا {c} است یا {k}. درست است؟", yes: "درست", no: "نادرست", props: AND_PROPS },
    make: function (rng, n, ctx) {
      var P = ctx.w("props"), out = [], seen = {};
      for (var t = 0; t < 30 && out.length < Math.min(n, 3); t++) {
        var four = rng.sample(THINGS, 4), op = rng.pick(["and", "or"]), th = rng.pick(four), c = th.c, k = rng.pick(["fruit", "animal", "toy"]);
        var truth = op === "and" ? four.some(function (x) { return x.c === c && x.k === k; }) : four.every(function (x) { return x.c === c || x.k === k; });
        var key = op + ":" + four.map(function (x) { return x.pic; }).join("") + c + k;
        if (seen[key]) continue;
        seen[key] = true;
        var q = ctx.w(op, { c: P[c], k: P[k] });
        out.push({ type: "choose", key: key, prompt: q, say: q, show: four.map(function (x) { return x.pic; }).join(" "),
          options: [{ label: "✅ " + ctx.w("yes"), value: "yes" }, { label: "❌ " + ctx.w("no"), value: "no" }], answer: truth ? "yes" : "no" });
      }
      return out;
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p25", subject: "think", level: "sapling", objectives: ["think.sap.15"], needs: ["think-sapling-13"],
    emoji: "🎯", title: "کدام جور است؟",
    words: { and: "کدام هم {c} است و هم {k}؟", or: "کدام یا {c} است یا {k}؟", props: AND_PROPS },
    make: function (rng, n, ctx) {
      var P = ctx.w("props"), out = [], seen = {};
      for (var t = 0; t < 40 && out.length < Math.min(n, 3); t++) {
        var op = rng.pick(["and", "or"]), right = rng.pick(THINGS), c = right.c, k = right.k, key = op + ":" + c + k;
        var fits = function (x) { return op === "and" ? x.c === c && x.k === k : x.c === c || x.k === k; };
        // For "or", ask about a colour or kind the right one has, and the other one it doesn't.
        if (op === "or") { if (rng() < 0.5) k = rng.pick(["fruit", "animal", "toy"].filter(function (z) { return z !== right.k; })); else c = rng.pick(["red", "yellow", "green", "blue", "brown"].filter(function (z) { return z !== right.c; })); key = op + ":" + c + k; }
        var wrong = THINGS.filter(function (x) { return !fits(x); });
        // "And" is harder with near misses: one of each property.
        var near = op === "and" ? wrong.filter(function (x) { return x.c === c || x.k === k; }) : wrong;
        if (seen[key] || near.length < 2) continue;
        seen[key] = true;
        var q = ctx.w(op, { c: P[c], k: P[k] });
        out.push({ type: "choose", key: key, prompt: q, say: q, pic: true, options: rng.shuffle([right.pic].concat(rng.sample(near, 2).map(function (x) { return x.pic; }))), answer: right.pic });
      }
      return out;
    }
  });

  /* «چه کسی از همه بلندتر است؟» — think-sapling-p26. Four children and three clues, each "taller than": who is tallest,
     who is shortest? Key: the order and the question. */
  B.PRACTICE.push({
    id: "think-sapling-p26", subject: "think", level: "sapling", objectives: ["think.sap.14"], needs: ["think-sapling-14"], lessons: ["think-sapling-14", "think-sapling-24"],
    emoji: "📏", title: "چه کسی از همه بلندتر است؟",
    words: { names: KID_WORDS, taller: "{a} از {b} بلندتر است", ask: "سرنخ‌ها: {clues}. {q}", sep: "؛ ", tallest: "چه کسی از همه بلندتر است؟", shortest: "چه کسی از همه کوتاه‌تر است؟" },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var kids = rng.sample(KID_NAMES, 4), q = rng.pick(["tallest", "shortest"]), key = kids.join("") + q;
        if (seen[key]) continue;
        seen[key] = true;
        var clues = rng.shuffle([0, 1, 2].map(function (i) { return ctx.w("taller", { a: N[kids[i]], b: N[kids[i + 1]] }); }));
        var s = ctx.w("ask", { clues: clues.join(ctx.w("sep")), q: ctx.w(q) });
        out.push({ type: "choose", key: key, prompt: s, say: s, options: rng.shuffle(kids.slice()).map(function (k) { return { label: N[k], value: k }; }), answer: q === "tallest" ? kids[0] : kids[3] });
      }
      return out;
    }
  });

  /* «معمای عدد» — think-sapling-p27. A number from 1 to 20 and clues (between two numbers, even or odd, and "it is not …"
     when two are left). Checked: exactly one number fits all the clues. Key: the number and range. */
  B.PRACTICE.push({
    id: "think-sapling-p27", subject: "think", level: "sapling", objectives: ["think.sap.14"], needs: ["think-sapling-14"], lessons: ["think-sapling-14", "think-sapling-24"],
    emoji: "🔢", title: "معمای عدد",
    words: { prompt: "من یک عددم. {clues}. من کدام عددم؟", between: "بیشتر از {a} و کمتر از {b}‌ام", even: "زوجم", odd: "فردم", not: "{x} نیستم", sep: "، " },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 40 && out.length < Math.min(n, 2); t++) {
        var x = rng.int(3, 18), a = x - rng.int(1, 4), b = x + rng.int(1, 4), key = x + ":" + a + ":" + b;
        if (seen[key]) continue;
        var left = [];
        for (var v = a + 1; v < b; v++) if (v % 2 === x % 2) left.push(v);
        if (left.length > 2) continue;
        seen[key] = true;
        var clues = [ctx.w("between", { a: fa(a), b: fa(b) }), ctx.w(x % 2 ? "odd" : "even")];
        left.filter(function (v) { return v !== x; }).forEach(function (v) { clues.push(ctx.w("not", { x: fa(v) })); });
        var wrong = [x + 1, left.length > 1 ? left.filter(function (v) { return v !== x; })[0] : x + 2].filter(function (v) { return v !== x; });
        var q = ctx.w("prompt", { clues: clues.join(ctx.w("sep")) });
        out.push({ type: "choose", key: key, prompt: q, say: q, options: rng.shuffle([x].concat(wrong)).map(function (v) { return { label: fa(v), value: String(v) }; }), answer: String(x) });
      }
      return out;
    }
  });

  /* «چندتا در رمز؟» — think-sapling-p28. A row of a three-colour code: how many squares of one colour? Key: the row. */
  var COLOUR_NAMES = { 0: "white", 1: "red", 2: "blue" };
  B.PRACTICE.push({
    id: "think-sapling-p28", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-15"], lessons: ["think-sapling-15", "think-sapling-16"],
    emoji: "🟥", title: "چندتا در رمز؟",
    words: { prompt: "رمز: ۰ سفید، ۱ قرمز، ۲ آبی. در این ردیف چند مربع {c} است؟", colours: { white: "سفید", red: "قرمز", blue: "آبی" } },
    make: function (rng, n, ctx) {
      var C = ctx.w("colours"), out = [], seen = {};
      for (var t = 0; t < 20 && out.length < Math.min(n, 2); t++) {
        var row = Array.from({ length: 8 }, function () { return rng.int(0, 2); }), c = rng.int(0, 2), cnt = row.filter(function (v) { return v === c; }).length, key = row.join("") + c;
        if (!cnt || seen[key]) continue;
        seen[key] = true;
        var q = ctx.w("prompt", { c: C[COLOUR_NAMES[c]] }), opts = [cnt, cnt + 1, cnt > 1 ? cnt - 1 : cnt + 2];
        out.push({ type: "choose", key: key, prompt: q, say: q, show: row.map(fa).join("\u2003"), ltr: true, options: rng.shuffle(opts).map(function (v) { return { label: fa(v), value: String(v) }; }), answer: String(cnt) });
      }
      return out;
    }
  });

  /* «تصویر سه‌رنگ» — think-sapling-p29. 5×5 pictures with a three-colour code, to paint. Key: the picture. */
  var SMALL_PICS = {
    flower: [["01010", "11111", "01110", "00200", "00200"], ["#ffffff", "#e64980", "#2f9e44"]],
    mushroom: [["01110", "10101", "11111", "00200", "00200"], ["#ffffff", "#e03131", "#c4a484"]],
    tree: [["01110", "11111", "01110", "00200", "00200"], ["#ffffff", "#2f9e44", "#8b5a2b"]],
    sun: [["10101", "01110", "11211", "01110", "10101"], ["#ffffff", "#f59f00", "#e8590c"]],
    house: [["00100", "01110", "11111", "12121", "11211"], ["#ffffff", "#c4673a", "#1c7ed6"]],
    boat: [["00100", "00110", "00100", "22222", "02220"], ["#ffffff", "#e03131", "#1c7ed6"]]
  };
  B.PRACTICE.push({
    id: "think-sapling-p29", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-15"], lessons: ["think-sapling-15", "think-sapling-16"],
    emoji: "🎨", title: "تصویر سه‌رنگ",
    words: { prompt: "رمز این تصویر سه رنگ دارد. مربع‌ها را با رنگ هر عدد رنگ کن.",
      names: { flower: ["سفید", "صورتی", "سبز"], mushroom: ["سفید", "قرمز", "کرم"], tree: ["سفید", "سبز", "قهوه‌ای"], sun: ["سفید", "زرد", "نارنجی"], house: ["سفید", "آجری", "آبی"], boat: ["سفید", "قرمز", "آبی"] } },
    make: function (rng, n, ctx) {
      var N = ctx.w("names");
      return pickKeys(rng, Object.keys(SMALL_PICS), 1, ctx).map(function (k) {
        return { type: "pixels", key: k, prompt: ctx.w("prompt"), say: ctx.w("prompt"), colors: SMALL_PICS[k][1], names: N[k], pic: SMALL_PICS[k][0] };
      });
    }
  });

  /* think-sapling-p30 to p32: a number for each letter (think-sapling-16). The letters in alphabet order: ا = 1, ب = 2, …
     (A = 1, B = 2, … in English); the words of think-tree-p6. */
  function letterCode(ch, en) { return (en ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : FA_ABC).indexOf(ch) + 1; }
  function legendFor(words, en) {
    var abc = en ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : FA_ABC, used = {};
    words.forEach(function (w) { Array.from(w).forEach(function (ch) { used[ch] = true; }); });
    return Array.from(abc).filter(function (ch) { return used[ch]; }).map(function (ch) { return ch + " = " + fa(letterCode(ch, en)); }).join(en ? ", " : "، ");
  }
  B.PRACTICE.push({
    id: "think-sapling-p30", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-16"],
    emoji: "🔐", title: "کلمه رمزی",
    words: { prompt: "رمز: {legend}. این پیام چه کلمه‌ای است؟" },
    make: function (rng, n, ctx) {
      var en = ctx.lang === "en", W = en ? WORDS_EN : WORDS_FA;
      return pickKeys(rng, ["0", "1", "2", "3", "4", "5"], Math.min(n, 2), ctx).map(function (wi) {
        var i = +wi, others = rng.sample([0, 1, 2, 3, 4, 5].filter(function (j) { return j !== i; }), 2), all = [i].concat(others);
        var q = ctx.w("prompt", { legend: legendFor(all.map(function (j) { return W[j]; }), en) });
        return { type: "choose", key: wi, prompt: q, say: q, show: Array.from(W[i]).map(function (ch) { return fa(letterCode(ch, en)); }).join(" - "),
          options: rng.shuffle(all).map(function (j) { return { label: W[j], value: String(j) }; }), answer: String(i) };
      });
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p31", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-16"],
    emoji: "✍️", title: "با رمز بنویس",
    words: { prompt: "رمز: {legend}. کلمه «{w}» با رمز کدام است؟" },
    make: function (rng, n, ctx) {
      var en = ctx.lang === "en", W = en ? WORDS_EN : WORDS_FA;
      return pickKeys(rng, ["0", "1", "2", "3", "4", "5"], Math.min(n, 2), ctx).map(function (wi) {
        var w = W[+wi], codes = Array.from(w).map(function (ch) { return letterCode(ch, en); }), txt = function (c) { return c.map(fa).join(" - "); };
        var swapped = codes.slice().reverse(), bumped = codes.slice(), j = rng.int(0, codes.length - 1);
        bumped[j] += 1;
        var opts = [txt(codes), txt(bumped)].concat(txt(swapped) !== txt(codes) ? [txt(swapped)] : []);
        var q = ctx.w("prompt", { legend: legendFor([w, en ? "ABCDE" : "ابپتث"], en), w: w });
        return { type: "choose", key: wi, prompt: q, say: q, options: rng.shuffle(opts).map(function (o) { return { label: o, value: o }; }), answer: txt(codes) };
      });
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p32", subject: "think", level: "sapling", objectives: ["think.sap.7"], needs: ["think-sapling-16"],
    emoji: "🔤", title: "حرف و عدد",
    words: { prompt: "به ترتیب الفبا هر حرف یک عدد دارد: اولین حرف ۱، دومی ۲، … هر حرف را به عددش برسان." },
    make: function (rng, n, ctx) {
      var en = ctx.lang === "en", abc = en ? "ABCDEFGHIJKL" : "ابپتثجچحخدذر", idx = rng.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4);
      return [{ type: "pairs", key: idx.slice().sort(function (a, b) { return a - b; }).join("-"), prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        pairs: idx.map(function (i) { return [abc.charAt(i), fa(i + 1)]; }) }];
    }
  });

  /* think-sapling-p33 to p35: asking and counting (think-sapling-17). */
  var VOTE_PICS = ["🍎", "🍌", "🍇", "🍉", "🍊"];
  B.PRACTICE.push({
    id: "think-sapling-p33", subject: "think", level: "sapling", objectives: ["think.sap.8"], needs: ["think-sapling-17"],
    emoji: "🏆", title: "بیشترین و کمترین",
    words: { most: "از خانواده پرسیدیم میوه محبوبشان چیست. کدام از همه بیشتر رأی آورد؟", fewest: "از خانواده پرسیدیم میوه محبوبشان چیست. کدام از همه کمتر رأی آورد؟" },
    make: function (rng, n, ctx) {
      var out = [];
      ["most", "fewest"].forEach(function (q) {
        var kinds = rng.sample(VOTE_PICS, 3), votes = rng.sample([1, 2, 3, 4, 5, 6, 7], 3), best = (q === "most" ? Math.max : Math.min).apply(null, votes);
        out.push({ type: "choose", key: q + kinds.join("") + votes.join(""), prompt: ctx.w(q), say: ctx.w(q), show: kinds.map(function (k, i) { return k + " " + fa(votes[i]); }).join("    "), ltr: true, pic: true,
          options: rng.shuffle(kinds.slice()), answer: kinds[votes.indexOf(best)] });
      });
      return out.slice(0, n);
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p34", subject: "think", level: "sapling", objectives: ["think.sap.8"], needs: ["think-sapling-17"],
    emoji: "➕", title: "چندتا بیشتر؟",
    words: { more: "در این نمودار تصویری، {a} چندتا از {b} بیشتر است؟", total: "در این نمودار تصویری، روی هم چند نفر جواب داده‌اند؟" },
    make: function (rng, n, ctx) {
      var out = [];
      ["more", "total"].forEach(function (q) {
        var kinds = rng.sample(VOTE_PICS, q === "more" ? 2 : 3), votes = rng.sample([1, 2, 3, 4, 5, 6], kinds.length).sort(function (a, b) { return b - a; });
        var right = q === "more" ? votes[0] - votes[1] : votes.reduce(function (s, v) { return s + v; }, 0);
        var show = kinds.map(function (k, i) { return new Array(votes[i] + 1).join(k); }).join("  |  "), s = ctx.w(q, { a: kinds[0], b: kinds[1] });
        var opts = [right, right + 1, right > 1 ? right - 1 : right + 2];
        out.push({ type: "choose", key: q + kinds.join("") + votes.join(""), prompt: s, say: s, show: show, ltr: true, options: rng.shuffle(opts).map(function (v) { return { label: fa(v), value: String(v) }; }), answer: String(right) });
      });
      return out.slice(0, n);
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p35", subject: "think", level: "sapling", objectives: ["think.sap.8"], needs: ["think-sapling-17"],
    emoji: "🗳️", title: "رأی‌ها را بشمار",
    words: { prompt: "هر کس میوه محبوبش را گفت. هر رأی را در ردیف میوه‌اش بگذار.", names: KID_WORDS },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), fruit = rng.shuffle(VOTE_PICS);
      // Two rounds with different fruit (the first three, then the last two and the first).
      return [fruit.slice(0, 3), fruit.slice(3).concat(fruit[0])].slice(0, n).map(function (kinds) {
        var kids = rng.shuffle(KID_NAMES.slice());
        return { type: "sort", key: kinds.join(""), prompt: ctx.w("prompt"), say: ctx.w("prompt"),
          baskets: kinds.map(function (k) { return { pic: k, value: k }; }),
          items: kids.map(function (kid, i) { var f = kinds[i < 3 ? i : rng.int(0, 2)]; return { pic: f, label: N[kid], say: N[kid], basket: f }; }) };
      });
    }
  });

  /* think-sapling-p36 to p38: computers and programs (think-sapling-18). */
  B.PRACTICE.push({
    id: "think-sapling-p36", subject: "think", level: "sapling", objectives: ["think.sap.10"], needs: ["think-sapling-18"], lessons: ["think-sapling-18", "think-sapling-26"],
    emoji: "🧰", title: "سخت‌افزار یا نرم‌افزار؟",
    words: { prompt: "چیزهایی که می‌شود دست زد (سخت‌افزار) در یک سبد، برنامه‌ها (نرم‌افزار) در سبد دیگر", labels: { hard: "سخت‌افزار", soft: "نرم‌افزار" },
      things: { keyboard: "صفحه‌کلید", mouse: "موشواره", screen: "صفحه نمایش", printer: "چاپگر", battery: "باتری", game: "بازی", paint: "برنامه نقاشی", calc: "ماشین‌حساب روی صفحه", browser: "مرورگر", writer: "برنامه نوشتن" } },
    make: sortBank([{ id: "hardsoft", baskets: [{ v: "hard", pic: "🔧" }, { v: "soft", pic: "💾" }],
      items: { keyboard: ["⌨️", "hard"], mouse: ["🖱️", "hard"], screen: ["🖥️", "hard"], printer: ["🖨️", "hard"], battery: ["🔋", "hard"],
        game: ["🎮", "soft"], paint: ["🎨", "soft"], calc: ["🧮", "soft"], browser: ["🌐", "soft"], writer: ["📝", "soft"] } }])
  });
  B.PRACTICE.push({
    id: "think-sapling-p37", subject: "think", level: "sapling", objectives: ["think.sap.10"], needs: ["think-sapling-18"], lessons: ["think-sapling-18", "think-sapling-26"],
    emoji: "🚦", title: "رایانه دارد؟",
    words: { prompt: "چیزهایی که یک رایانه کوچک در خودشان دارند در یک سبد، بقیه در سبد دیگر", labels: { yes: "رایانه دارد", no: "رایانه ندارد" },
      things: { light: "چراغ راهنمایی", washer: "ماشین لباسشویی", atm: "خودپرداز", watch: "ساعت هوشمند", lift: "آسانسور", phone: "گوشی", oven: "فر نانوایی",
        chair: "صندلی", spoon: "قاشق", bear: "عروسک", books: "کتاب", scissors: "قیچی", bike: "دوچرخه", hammer: "چکش" } },
    make: sortBank([{ id: "inside", baskets: [{ v: "yes", pic: "💻" }, { v: "no", pic: "📦" }],
      items: { light: ["🚦", "yes"], washer: ["🫧", "yes"], atm: ["🏧", "yes"], watch: ["⌚", "yes"], lift: ["🛗", "yes"], phone: ["📱", "yes"], oven: ["🍞", "yes"],
        chair: ["🪑", "no"], spoon: ["🥄", "no"], bear: ["🧸", "no"], books: ["📚", "no"], scissors: ["✂️", "no"], bike: ["🚲", "no"], hammer: ["🔨", "no"] } }])
  });
  pushAsk({
    id: "think-sapling-p38", subject: "think", level: "sapling", objectives: ["think.sap.10"], needs: ["think-sapling-18"],
    emoji: "👩‍💻", title: "برنامه‌ها",
    words: { items: {
      who: ["برنامه‌های رایانه را چه کسی می‌نویسد؟", "آدم‌ها، برنامه‌نویس‌ها", "خود رایانه از اول می‌داند", "هیچ‌کس"],
      light: ["رایانه کوچک چراغ راهنمایی چه کار می‌کند؟", "طبق برنامه، رنگ چراغ را عوض می‌کند", "خودش فکر می‌کند کی خسته است", "به ماشین‌ها زنگ می‌زند"],
      wrong: ["اگر برنامه اشتباه داشته باشد چه می‌شود؟", "رایانه همان اشتباه را انجام می‌دهد", "رایانه خودش اشتباه را می‌فهمد و درست می‌کند", "رایانه گریه می‌کند"],
      touch: ["کدام را می‌شود با دست لمس کرد؟", "صفحه‌کلید", "برنامه نقاشی", "یک بازی"],
      oven: ["فر نانوایی با رایانه‌اش چه کار می‌کند؟", "دما و زمان پختن را طبق برنامه نگه می‌دارد", "نان را خودش می‌خورد", "آرد می‌خرد"],
      follow: ["رایانه دستورها را چطور انجام می‌دهد؟", "دقیقاً همان‌طور که نوشته شده، قدم به قدم", "هر طور که دوست دارد", "فقط وقتی حوصله دارد"] } }
  });

  /* think-sapling-p39 to p41: files and folders (think-sapling-19). */
  B.PRACTICE.push({
    id: "think-sapling-p39", subject: "think", level: "sapling", objectives: ["think.sap.9"], needs: ["think-sapling-19"],
    emoji: "📁", title: "در پوشه بگذار",
    words: { prompt: "هر پرونده را در پوشه درستش بگذار", labels: { draw: "نقاشی‌ها", photo: "عکس‌ها", song: "آهنگ‌ها" },
      things: { cat: "نقاشی گربه", house: "نقاشی خانه", rainbow: "نقاشی رنگین‌کمان", party: "عکس تولد", sea: "عکس دریا", grandma: "عکس با مادربزرگ",
        rain: "آهنگ باران", lullaby: "لالایی", spring: "آهنگ بهار" } },
    make: sortBank([{ id: "files", baskets: [{ v: "draw", pic: "🎨" }, { v: "photo", pic: "📷" }, { v: "song", pic: "🎵" }],
      items: { cat: ["🖍️", "draw"], house: ["🖍️", "draw"], rainbow: ["🖍️", "draw"], party: ["🖼️", "photo"], sea: ["🖼️", "photo"], grandma: ["🖼️", "photo"],
        rain: ["🎶", "song"], lullaby: ["🎶", "song"], spring: ["🎶", "song"] } }])
  });
  B.PRACTICE.push({
    id: "think-sapling-p40", subject: "think", level: "sapling", objectives: ["think.sap.9"], needs: ["think-sapling-19"],
    emoji: "🗂️", title: "پرونده کجاست؟",
    words: { prompt: "«{file}» در پوشه «{sub}» است و پوشه «{sub}» در پوشه «{kid}». از کدام راه به آن می‌رسیم؟", arrow: " ← ", names: KID_WORDS,
      subs: { draw: "نقاشی‌ها", photo: "عکس‌ها", song: "آهنگ‌ها" }, files: { draw: "نقاشی گربه", photo: "عکس دریا", song: "آهنگ باران" } },
    make: function (rng, n, ctx) {
      var N = ctx.w("names"), S = ctx.w("subs"), F = ctx.w("files"), a = ctx.w("arrow"), out = [], seen = {};
      for (var t = 0; t < 10 && out.length < Math.min(n, 2); t++) {
        var kids = rng.sample(KID_NAMES, 2), sub = rng.pick(["draw", "photo", "song"]), key = kids[0] + sub;
        if (seen[key]) continue;
        seen[key] = true;
        var path = function (x, y) { return "📁 " + x + a + "📁 " + y + a + "📄 " + F[sub]; };
        var q = ctx.w("prompt", { file: F[sub], sub: S[sub], kid: N[kids[0]] });
        out.push({ type: "choose", key: key, prompt: q, say: q, stack: true,
          options: rng.shuffle([{ label: path(N[kids[0]], S[sub]), value: "right" }, { label: path(S[sub], N[kids[0]]), value: "flip" }, { label: path(N[kids[1]], S[sub]), value: "other" }]), answer: "right" });
      }
      return out;
    }
  });
  pushAsk({
    id: "think-sapling-p41", subject: "think", level: "sapling", objectives: ["think.sap.9"], needs: ["think-sapling-19"],
    emoji: "🗑️", title: "ذخیره، پیدا کردن، سطل",
    words: { items: {
      save: ["نقاشی‌ات روی رایانه تمام شد و می‌خواهی فردا ادامه بدهی. چه کار کنیم؟", "ذخیره‌اش می‌کنیم و اسم خوبی برایش می‌گذاریم", "رایانه را خاموش می‌کنیم", "پنجره را می‌بندیم"],
      name: ["کدام اسم برای پرونده نقاشی گربه بهتر است؟", "«نقاشی گربه»", "«پرونده ۷»", "«بی‌نام»"],
      bin: ["پرونده‌ای را اشتباهی در سطل زباله انداختی. چه می‌شود؟", "هنوز در سطل است و می‌شود برش گرداند", "برای همیشه رفته", "به رایانه دیگری رفته"],
      find: ["عکس تولدت را گم کرده‌ای. کجا را اول نگاه کنیم؟", "در پوشه «عکس‌ها»", "در پوشه «آهنگ‌ها»", "در سطل زباله"],
      folder: ["پوشه در رایانه شبیه چیست؟", "جعبه‌ای در کمد که چیزها را در آن می‌گذاریم", "یک بازی", "یک صدا"],
      many: ["پرونده‌های زیادی داری و پیدا کردنشان سخت شده. چه کار کنیم؟", "برای هر نوع یک پوشه می‌سازیم", "همه را پاک می‌کنیم", "رایانه را عوض می‌کنیم"] } }
  });

  /* think-sapling-p42 to p44: the internet (think-sapling-20). */
  B.PRACTICE.push({
    id: "think-sapling-p42", subject: "think", level: "sapling", objectives: ["think.sap.11"], needs: ["think-sapling-20"], lessons: ["think-sapling-20", "think-sapling-26"],
    emoji: "📨", title: "سفر پیام",
    words: { prompt: "سفر {job} را به ترتیب بچین", jobs: { message: "پیام سارا به خاله", photo: "عکس رضا برای پدربزرگ", call: "تماس تصویری مینا با عمه" },
      steps: { message: ["سارا پیام را می‌نویسد", "گوشی پیام را می‌فرستد", "پیام از ایستگاه‌های زیادی می‌گذرد", "گوشی خاله پیام را می‌گیرد", "خاله پیام را می‌خواند"],
        photo: ["رضا عکس می‌گیرد", "تبلت عکس را می‌فرستد", "عکس از شهرهای زیادی می‌گذرد", "رایانه پدربزرگ عکس را می‌گیرد", "پدربزرگ عکس را می‌بیند"],
        call: ["مینا تماس می‌گیرد", "صدا و تصویر مینا از گوشی می‌رود", "از ایستگاه‌های زیادی می‌گذرد", "گوشی عمه آن را می‌گیرد", "عمه مینا را می‌بیند و صدایش را می‌شنود"] } },
    make: orderBank({ message: ["👧", "📱", "📡", "📲", "👩"], photo: ["📷", "💻", "🏙️", "🖥️", "👴"], call: ["📞", "📱", "📡", "📲", "👩"] }, 2)
  });
  pushAsk({
    id: "think-sapling-p43", subject: "think", level: "sapling", objectives: ["think.sap.11"], needs: ["think-sapling-20"], lessons: ["think-sapling-20", "think-sapling-26"],
    emoji: "🌐", title: "اینترنت: درست یا نادرست؟",
    words: { items: {
      joined: ["درست یا نادرست: «اینترنت یعنی رایانه‌های زیادی در شهرهای مختلف که به هم وصل‌اند.»", "✅ درست", "❌ نادرست"],
      shared: ["درست یا نادرست: «عکسی که در اینترنت گذاشتیم را فقط خودمان می‌بینیم.»", "❌ نادرست", "✅ درست"],
      back: ["درست یا نادرست: «چیزی که در اینترنت پخش شد، همیشه می‌شود کامل پسش گرفت.»", "❌ نادرست", "✅ درست"],
      stops: ["درست یا نادرست: «پیام ما برای رسیدن به شهر دیگر از ایستگاه‌های زیادی می‌گذرد.»", "✅ درست", "❌ نادرست"],
      ask: ["درست یا نادرست: «پیش از گذاشتن عکس در اینترنت از پدر یا مادر می‌پرسیم.»", "✅ درست", "❌ نادرست"],
      magic: ["درست یا نادرست: «اینترنت در آسمان است و به هیچ سیم و دستگاهی نیاز ندارد.»", "❌ نادرست", "✅ درست"] } }
  });
  B.PRACTICE.push({
    id: "think-sapling-p44", subject: "think", level: "sapling", objectives: ["think.sap.11"], needs: ["think-sapling-20"],
    emoji: "📶", title: "اینترنت لازم دارد؟",
    words: { prompt: "کارهایی که اینترنت لازم دارند در یک سبد، بقیه در سبد دیگر", labels: { yes: "اینترنت لازم دارد", no: "بدون اینترنت هم می‌شود" },
      things: { videocall: "تماس تصویری با خاله", message: "فرستادن پیام برای دوست", online: "دیدن کارتون از سایت", search: "جست‌وجو درباره پلنگ", map: "دیدن نقشه راه",
        paint: "نقاشی با برنامه نقاشی", calc: "حساب کردن با ماشین‌حساب", photo: "عکس گرفتن با دوربین", saved: "گوش دادن به آهنگ ذخیره‌شده", clock: "دیدن ساعت" } },
    make: sortBank([{ id: "net", baskets: [{ v: "yes", pic: "📶" }, { v: "no", pic: "📴" }],
      items: { videocall: ["📹", "yes"], message: ["💬", "yes"], online: ["📺", "yes"], search: ["🔎", "yes"], map: ["🗺️", "yes"],
        paint: ["🎨", "no"], calc: ["🧮", "no"], photo: ["📷", "no"], saved: ["🎵", "no"], clock: ["⏰", "no"] } }])
  });

  /* think-sapling-p45 to p48: my information and passwords (think-sapling-21, 22). */
  B.PRACTICE.push({
    id: "think-sapling-p45", subject: "think", level: "sapling", objectives: ["think.sap.12"], needs: ["think-sapling-21"], lessons: ["think-sapling-21", "think-sapling-27"],
    emoji: "🪪", title: "خصوصی یا گفتنی؟",
    words: { prompt: "چیزهای خصوصی در یک سبد، چیزهایی که گفتنش اشکالی ندارد در سبد دیگر", labels: { private: "خصوصی", fine: "گفتنش اشکالی ندارد" },
      things: { fullname: "اسم و فامیل کامل", address: "نشانی خانه", school: "اسم مدرسه", phone: "شماره تلفن", homephoto: "عکس جلوی خانه", password: "رمز",
        colour: "رنگ محبوب", animal: "حیوان محبوب", drawing: "نقاشی یک گل", book: "کتاب محبوب", fruit: "میوه محبوب" } },
    make: sortBank([{ id: "info", baskets: [{ v: "private", pic: "🔒" }, { v: "fine", pic: "😊" }],
      items: { fullname: ["🪪", "private"], address: ["🏠", "private"], school: ["🏫", "private"], phone: ["📞", "private"], homephoto: ["📸", "private"], password: ["🔑", "private"],
        colour: ["🎨", "fine"], animal: ["🐱", "fine"], drawing: ["🌷", "fine"], book: ["📖", "fine"], fruit: ["🍎", "fine"] } }])
  });
  var STRONG = ["Mb7!sGh2", "Kz9#pLr4", "Tg5$wNq8", "Hy3@dRm6", "Pq8&vLs3", "Dn4!rKz9"], WEAK = ["1234", "123456", "1111", "abcd", "sara", "qwerty", "0000", "reza1"];
  B.PRACTICE.push({
    id: "think-sapling-p46", subject: "think", level: "sapling", objectives: ["think.sap.12"], needs: ["think-sapling-22"], lessons: ["think-sapling-22", "think-sapling-27"],
    emoji: "💪", title: "رمز قوی‌تر",
    words: { prompt: "کدام رمز را سخت‌تر می‌شود حدس زد؟" },
    make: function (rng, n, ctx) {
      var out = [], seen = {};
      for (var t = 0; t < 10 && out.length < Math.min(n, 2); t++) {
        var s = rng.pick(STRONG), w = rng.sample(WEAK, 2), key = s + w.join("");
        if (seen[key]) continue;
        seen[key] = true;
        out.push({ type: "choose", key: key, prompt: ctx.w("prompt"), say: ctx.w("prompt"), ltr: true, options: rng.shuffle([s].concat(w)).map(function (x) { return { label: x, value: x }; }), answer: s });
      }
      return out;
    }
  });
  B.PRACTICE.push({
    id: "think-sapling-p47", subject: "think", level: "sapling", objectives: ["think.sap.12"], needs: ["think-sapling-22"], lessons: ["think-sapling-22", "think-sapling-27"],
    emoji: "🔑", title: "قوی یا ضعیف؟",
    words: { prompt: "رمزهای قوی در یک سبد، رمزهای ضعیف در سبد دیگر", strong: "قوی", weak: "ضعیف" },
    make: function (rng, n, ctx) {
      var items = rng.sample(STRONG, 3).map(function (x) { return { label: x, basket: "strong" }; }).concat(rng.sample(WEAK, 3).map(function (x) { return { label: x, basket: "weak" }; }));
      return [{ type: "sort", key: "pw", prompt: ctx.w("prompt"), say: ctx.w("prompt"),
        baskets: [{ pic: "💪", label: ctx.w("strong"), value: "strong" }, { pic: "🥱", label: ctx.w("weak"), value: "weak" }], items: rng.shuffle(items) }];
    }
  });
  pushAsk({
    id: "think-sapling-p48", subject: "think", level: "sapling", objectives: ["think.sap.12"], needs: ["think-sapling-21"],
    emoji: "🙊", title: "اطلاعات من: درست یا نادرست؟",
    words: { items: {
      address: ["درست یا نادرست: «نشانی خانه را در بازی اینترنتی می‌نویسیم.»", "❌ نادرست", "✅ درست"],
      ask: ["درست یا نادرست: «پیش از گفتن چیزی درباره خودمان در اینترنت از پدر یا مادر می‌پرسیم.»", "✅ درست", "❌ نادرست"],
      colour: ["درست یا نادرست: «گفتن رنگ محبوبمان اشکالی ندارد.»", "✅ درست", "❌ نادرست"],
      photo: ["درست یا نادرست: «عکسی که اسم مدرسه‌مان در آن پیداست را برای همه می‌فرستیم.»", "❌ نادرست", "✅ درست"],
      stranger: ["درست یا نادرست: «اگر کسی که نمی‌شناسیم شماره تلفنمان را خواست، می‌دهیم.»", "❌ نادرست", "✅ درست"],
      nickname: ["درست یا نادرست: «در بازی‌ها به جای اسم کامل، یک اسم بازی می‌گذاریم.»", "✅ درست", "❌ نادرست"] } }
  });

  /* think-sapling-p49 and p50: screen time (think-sapling-23). */
  B.PRACTICE.push({
    id: "think-sapling-p49", subject: "think", level: "sapling", objectives: ["think.sap.13"], needs: ["think-sapling-23"], lessons: ["think-sapling-23", "think-sapling-27"],
    emoji: "🌳", title: "با صفحه یا بی‌صفحه؟",
    words: { prompt: "کارهایی که با صفحه است در یک سبد، کارهای بی‌صفحه در سبد دیگر", labels: { screen: "با صفحه", away: "بی‌صفحه" },
      things: { cartoon: "دیدن کارتون", game: "بازی روی تبلت", video: "دیدن فیلم روی گوشی", typing: "بازی تایپ روی رایانه",
        ball: "توپ‌بازی در پارک", book: "خواندن کتاب", draw: "نقاشی با مداد رنگی", bake: "کمک در پختن کیک", bike: "دوچرخه‌سواری", puzzle: "پازل" } },
    make: sortBank([{ id: "screen", baskets: [{ v: "screen", pic: "📱" }, { v: "away", pic: "🌳" }],
      items: { cartoon: ["📺", "screen"], game: ["🎮", "screen"], video: ["📱", "screen"], typing: ["⌨️", "screen"],
        ball: ["⚽", "away"], book: ["📖", "away"], draw: ["🖍️", "away"], bake: ["🎂", "away"], bike: ["🚲", "away"], puzzle: ["🧩", "away"] } }])
  });
  pushAsk({
    id: "think-sapling-p50", subject: "think", level: "sapling", objectives: ["think.sap.13"], needs: ["think-sapling-23"],
    emoji: "🥱", title: "بعد از مدت زیاد با صفحه",
    words: { items: {
      eyes: ["بعد از مدت زیادی بازی با تبلت، چشم‌هایت می‌سوزد. چه کار کنیم؟", "صفحه را کنار می‌گذاریم و دور را نگاه می‌کنیم", "نزدیک‌تر به صفحه می‌نشینیم", "نور صفحه را بیشتر می‌کنیم"],
      grumpy: ["بعد از بازی طولانی کمی بداخلاق شده‌ای. چه کار کمک می‌کند؟", "کمی بیرون بازی کنیم یا راه برویم", "یک بازی دیگر شروع کنیم", "تا شب بازی کنیم"],
      plan: ["خانواده برای وقت صفحه برنامه دارد. چرا؟", "تا برای بازی، خواب و کارهای دیگر هم وقت بماند", "تا هیچ‌وقت بازی نکنیم", "چون صفحه بد است و همیشه ممنوع است"],
      bed: ["کمی پیش از خواب است. کدام بهتر است؟", "کتاب خواندن با پدر یا مادر", "بازی روی گوشی در رختخواب", "دیدن فیلم ترسناک"],
      sit: ["مدت زیادی پشت رایانه نشسته‌ای. بدنت چه می‌خواهد؟", "بلند شویم، کش و قوس بیاییم و راه برویم", "بیشتر بنشینیم", "سرمان را پایین‌تر ببریم"],
      bored: ["وقت صفحه تمام شد و حوصله‌ات سر رفته. چه کار کنیم؟", "از فهرست کارهای بی‌صفحه یکی را انتخاب کنیم", "یواشکی دوباره روشن کنیم", "غر بزنیم تا وقت بیشتری بدهند"] } }
  });

  // For the content browser and the tools: the board helpers, to check generated boards.
  B.thinkBoards = { sim: sim, shortest: shortest, solvableWithin: solvableWithin, count: count };
})();
