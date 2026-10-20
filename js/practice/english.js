/* باغچه — practice generators for خواندن و نوشتن انگلیسی (subject english). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English is the subject itself here, so the instructions stay Persian in both app languages
   (js/practice.js plays english practice without an English overlay) and the English is heard with the English voice:
   every step is marked en, as in the lessons, so its English is written left to right and spoken in English.
   Items are made only from what the child has met: the words of the `words` steps of the lessons done (the word
   banks), the letters and letter pairs of the `letter` steps done (phonics), and lists below gated on the lessons
   that teach them (ctx.done). */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  // ---------- Shared helpers ----------
  function en(s) { s.en = true; return s; }
  var GARDENS = ["seed", "sprout", "sapling", "tree", "forest"];
  // The English lessons of a garden, in the order children meet them, from one lesson to another (both included):
  // the `lessons` a generator's practice set belongs to.
  function path(level, from, to) {
    var ids = (B.LESSONS || []).filter(function (l) { return l.subject === "english" && l.level === level; }).map(function (l) { return l.id; });
    var a = from ? ids.indexOf(from) : 0, b = to ? ids.indexOf(to) : ids.length - 1;
    return a < 0 || b < 0 ? [] : ids.slice(a, b + 1);
  }
  function pick(level, nums) { return nums.map(function (k) { return "english-" + level + "-" + k; }); }
  // The lesson whose practice set is being made: the last English lesson done. Its items come first.
  function latest(ctx) {
    var ids = ctx.doneIds.filter(function (id) { return /^english-/.test(id); });
    return ids[ids.length - 1] || null;
  }
  function isNow(x, now) { return !!now && (x.theme === now || x.after === now || (x.lessonsOf || []).indexOf(now) >= 0); }
  function lessons(ctx, upToLevel) {
    var max = GARDENS.indexOf(upToLevel);
    return (B.LESSONS || []).filter(function (l) { return l.subject === "english" && GARDENS.indexOf(l.level) <= max && ctx.done(l.id); });
  }
  /* The word bank: every picture word of the `words` steps of the lessons done, up to a garden (and only that garden
     with only: true). Single words by default (phrases: true keeps "a cold", "bus stop"); a picture used for two
     words in one lesson (big and small, both ⚽) is left out, since the picture cannot tell them apart. */
  function wordBank(ctx, level, opts) {
    opts = opts || {};
    var out = [], seenEn = {}, seenPic = {};
    lessons(ctx, level).forEach(function (l) {
      if (opts.only && l.level !== level) return;
      l.steps.forEach(function (s) {
        if (s.type !== "words") return;
        var pics = {};
        s.words.forEach(function (w) { var p = w.pic || w.color || w.art; pics[p] = (pics[p] || 0) + 1; });
        s.words.forEach(function (w) {
          var p = w.pic || w.color || w.art;
          if (!p || w.scale || w.where || pics[p] > 1 || w.dots) return;
          if (!opts.phrases && !opts.talk && /[\s.!?,']/.test(w.en.replace(/^T-shirt$/, "Tshirt"))) return;
          if (/[.!?]/.test(w.en) && !opts.talk) return;
          if (seenEn[w.en] || seenPic[p]) return;
          seenEn[w.en] = seenPic[p] = true;
          out.push({ en: w.en, pic: w.pic, color: w.color, art: w.art, theme: l.id, level: l.level });
        });
      });
    });
    return out;
  }
  function face(w) { var o = { en: w.en }; if (w.color) o.color = w.color; else if (w.art) o.art = w.art; else o.pic = w.pic; return o; }
  function valueOf(w) { return w.color || w.art || w.pic; }
  // The answer and up to two others from the same lesson's theme when it has enough, else from the whole bank.
  function others(rng, bank, w, k) {
    var same = bank.filter(function (x) { return x.theme === w.theme && x !== w; });
    var from = same.length >= k ? same : bank.filter(function (x) { return x !== w; });
    return rng.sample(from, k);
  }
  // Up to n items from a list of item makers keyed by strings, the missed keys first, no key twice.
  function deal(rng, n, ctx, list, keyOf, makeOne) {
    var out = [], used = {};
    function add(x) { var k = keyOf(x); if (out.length >= n || used[k]) return; used[k] = true; var s = makeOne(x); if (s) { s.key = k; out.push(en(s)); } }
    ctx.again.forEach(function (k) { var x = list.find(function (y) { return keyOf(y) === k; }); if (x) add(x); });
    // Then this lesson's own items (its words, its letters, its sentences), then the rest, each in a fresh order.
    var now = latest(ctx), mixed = rng.shuffle(list);
    mixed.filter(function (x) { return isNow(x, now); }).concat(mixed.filter(function (x) { return !isNow(x, now); })).forEach(add);
    return out;
  }
  // Takes turns between kinds of items: a list of [weight, maker] where maker() returns a step or null.
  function mix(rng, n, makers) {
    var out = [];
    for (var guard = 0; out.length < n && guard < n * 6; guard++) {
      var live = makers.filter(function (m) { return m.left(); });
      if (!live.length) break;
      var s = rng.pick(live).next();
      if (s) out.push(en(s));
    }
    return out;
  }

  /* ================= 🌰 Seed: listening and speaking, no reading ================= */

  /* Word bank by theme — english-seed-p1. Hear a word and tap its picture (pictures from the same theme), and
     memory pairs of pictures that say their word. Only the words of the Seed lessons done. */
  B.PRACTICE.push({
    id: "english-seed-p1", subject: "english", level: "seed", objectives: ["english.seed.3", "english.seed.4"],
    needs: ["english-seed-1"], lessons: path("seed"), emoji: "🖼️", title: "کلمه‌ها و تصویرها",
    words: { listen: "گوش کن. کدام تصویر است؟", pairs: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن" },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "seed", { talk: true });
      if (bank.length < 3) return [];
      var out = deal(rng, n, ctx, bank, function (w) { return w.en; }, function (w) {
        var opts = rng.shuffle([w].concat(others(rng, bank, w, 2)));
        return { type: "listen", say: w.en, prompt: ctx.w("listen"), quiet: true, options: opts.map(face), answer: valueOf(w) };
      });
      // About one item in four: a memory game of three pictures (needs at least six words).
      if (bank.length >= 6 && out.length >= 4) {
        var three = rng.sample(bank.filter(function (w) { return w.pic; }), 3);
        if (three.length === 3) out.splice(2, 1, en({ type: "pairs", hidden: true, key: "pairs:" + three.map(function (w) { return w.en; }).join(","), prompt: ctx.w("pairs"),
          pairs: three.map(function (w) { return [{ pic: w.pic, say: w.en }, { pic: w.pic, say: w.en }]; }) }));
      }
      if (out.length) out[0].quiet = false;
      return out;
    }
  });

  /* «Sara says» — english-seed-p2. An action said in English ("Sara says: touch your nose!"); the child does it and
     taps its picture. Actions of english-seed-10 at first, body parts after english-seed-16, animal moves after
     english-seed-14, more actions after english-seed-30. */
  var ACTIONS = [
    { en: "stand up", pic: "🧍", after: "english-seed-10" }, { en: "sit down", pic: "🪑", after: "english-seed-10" },
    { en: "clap your hands", pic: "👏", after: "english-seed-10" }, { en: "jump", pic: "🦘", after: "english-seed-10" },
    { en: "wave", pic: "👋", after: "english-seed-10" }, { en: "turn around", pic: "🔄", after: "english-seed-10" },
    { en: "touch your nose", pic: "👃", after: "english-seed-16" }, { en: "touch your ears", pic: "👂", after: "english-seed-16" },
    { en: "open your mouth", pic: "👄", after: "english-seed-16" }, { en: "close your eyes", pic: "😌", after: "english-seed-16" },
    { en: "stamp your feet", pic: "🦶", after: "english-seed-16" }, { en: "touch your head", pic: "🙆", after: "english-seed-16" },
    { en: "walk like a duck", pic: "🦆", after: "english-seed-14" }, { en: "fly like a bird", pic: "🐦", after: "english-seed-14" },
    { en: "swim like a fish", pic: "🐟", after: "english-seed-14" }, { en: "run on the spot", pic: "🏃", after: "english-seed-30" },
    { en: "dance", pic: "💃", after: "english-seed-30" }, { en: "sing", pic: "🎵", after: "english-seed-30" }
  ];
  B.PRACTICE.push({
    id: "english-seed-p2", subject: "english", level: "seed", objectives: ["english.seed.2"],
    needs: ["english-seed-10"], lessons: pick("seed", [10, 14, 16, 18, 30, 38, 40]), emoji: "🙋‍♀️", title: "سارا می‌گوید",
    words: { prompt: "سارا می‌گوید! بلند شو و همان کار را بکن. بعد تصویرش را پیدا کن." },
    make: function (rng, n, ctx) {
      var acts = ACTIONS.filter(function (a) { return ctx.done(a.after); });
      if (acts.length < 3) return [];
      var out = deal(rng, n, ctx, acts, function (a) { return a.en; }, function (a) {
        var opts = rng.shuffle([a].concat(rng.sample(acts.filter(function (x) { return x !== a; }), 2)));
        return { type: "listen", say: "Sara says: " + a.en + "!", prompt: ctx.w("prompt"), quiet: true, options: opts.map(function (x) { return { pic: x.pic, en: x.en }; }), answer: a.pic };
      });
      if (out.length) out[0].quiet = false;
      return out;
    }
  });

  /* Sound play — english-seed-p3. Rhymes (after english-seed-20), first sounds (after english-seed-22) and robot
     talk, sounds to blend (after english-seed-27). Every word has a picture; the child hears and taps. */
  var RHYMES = [
    { w: "cat", pic: "🐱", r: { w: "hat", pic: "👒" }, no: [{ w: "dog", pic: "🐶" }, { w: "sun", pic: "☀️" }] },
    { w: "dog", pic: "🐶", r: { w: "frog", pic: "🐸" }, no: [{ w: "cat", pic: "🐱" }, { w: "bee", pic: "🐝" }] },
    { w: "bee", pic: "🐝", r: { w: "tree", pic: "🌳" }, no: [{ w: "fish", pic: "🐟" }, { w: "car", pic: "🚗" }] },
    { w: "car", pic: "🚗", r: { w: "star", pic: "⭐" }, no: [{ w: "bed", pic: "🛏️" }, { w: "cow", pic: "🐮" }] },
    { w: "bed", pic: "🛏️", r: { w: "red", pic: "🟥" }, no: [{ w: "hat", pic: "👒" }, { w: "moon", pic: "🌙" }] },
    { w: "goat", pic: "🐐", r: { w: "boat", pic: "⛵" }, no: [{ w: "duck", pic: "🦆" }, { w: "tree", pic: "🌳" }] },
    { w: "mouse", pic: "🐭", r: { w: "house", pic: "🏠" }, no: [{ w: "bird", pic: "🐦" }, { w: "ball", pic: "⚽" }] },
    { w: "cake", pic: "🎂", r: { w: "snake", pic: "🐍" }, no: [{ w: "egg", pic: "🥚" }, { w: "book", pic: "📖" }] },
    { w: "moon", pic: "🌙", r: { w: "spoon", pic: "🥄" }, no: [{ w: "sock", pic: "🧦" }, { w: "pen", pic: "🖊️" }] },
    { w: "ten", pic: "🔟", r: { w: "hen", pic: "🐔" }, no: [{ w: "cup", pic: "☕" }, { w: "fox", pic: "🦊" }] }
  ];
  // First sounds: a sound (as the voice can say it), a word that starts with it and two that do not.
  var FIRST = [
    { s: "sss", eg: "sun", yes: { w: "sock", pic: "🧦" }, no: [{ w: "moon", pic: "🌙" }, { w: "dog", pic: "🐶" }] },
    { s: "mmm", eg: "moon", yes: { w: "milk", pic: "🥛" }, no: [{ w: "sun", pic: "☀️" }, { w: "cat", pic: "🐱" }] },
    { s: "buh", eg: "ball", yes: { w: "bird", pic: "🐦" }, no: [{ w: "fish", pic: "🐟" }, { w: "hat", pic: "👒" }] },
    { s: "kuh", eg: "cat", yes: { w: "car", pic: "🚗" }, no: [{ w: "bed", pic: "🛏️" }, { w: "egg", pic: "🥚" }] },
    { s: "duh", eg: "dog", yes: { w: "duck", pic: "🦆" }, no: [{ w: "apple", pic: "🍎" }, { w: "sun", pic: "☀️" }] },
    { s: "fff", eg: "fish", yes: { w: "foot", pic: "🦶" }, no: [{ w: "hand", pic: "✋" }, { w: "milk", pic: "🥛" }] },
    { s: "puh", eg: "pen", yes: { w: "pig", pic: "🐷" }, no: [{ w: "cow", pic: "🐮" }, { w: "tree", pic: "🌳" }] },
    { s: "tuh", eg: "ten", yes: { w: "train", pic: "🚂" }, no: [{ w: "doll", pic: "🪆" }, { w: "kite", pic: "🪁" }] }
  ];
  var ROBOT = [
    { w: "cat", pic: "🐱", s: "kuh... ah... tuh" }, { w: "sun", pic: "☀️", s: "sss... uh... nnn" }, { w: "dog", pic: "🐶", s: "duh... aw... guh" },
    { w: "pig", pic: "🐷", s: "puh... ih... guh" }, { w: "bed", pic: "🛏️", s: "buh... eh... duh" }, { w: "hat", pic: "👒", s: "huh... ah... tuh" },
    { w: "fish", pic: "🐟", s: "fff... ih... shh" }, { w: "bus", pic: "🚌", s: "buh... uh... sss" }, { w: "hen", pic: "🐔", s: "huh... eh... nnn" }
  ];
  B.PRACTICE.push({
    id: "english-seed-p3", subject: "english", level: "seed", objectives: ["english.seed.8", "english.seed.9", "english.seed.10"],
    needs: ["english-seed-20"], lessons: pick("seed", [20, 22, 27, 31, 34, 37, 40]), emoji: "🎶", title: "بازی با صداها",
    words: {
      rhyme: "آخر کدام کلمه مثل {w} صدا می‌دهد؟ روی تصویرها بزن و گوش کن.",
      first: "{w} با صدای «{s}» شروع می‌شود. کدام هم با همین صدا شروع می‌شود؟",
      robot: "ربات کلمه را صدا به صدا می‌گوید. صداها را پشت سر هم و تند بگو. کدام تصویر است؟"
    },
    make: function (rng, n, ctx) {
      var items = RHYMES.map(function (x) { return { kind: "rhyme", key: "r:" + x.w, x: x }; });
      if (ctx.done("english-seed-22")) items = items.concat(FIRST.map(function (x) { return { kind: "first", key: "f:" + x.s, x: x }; }));
      if (ctx.done("english-seed-27")) items = items.concat(ROBOT.map(function (x) { return { kind: "robot", key: "b:" + x.w, x: x }; }));
      function opt(o) { return { pic: o.pic, en: o.w }; }
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        var x = it.x;
        if (it.kind === "rhyme") return { type: "listen", show: x.pic, say: x.w, prompt: ctx.w("rhyme", { w: x.w }), options: rng.shuffle([x.r].concat(x.no)).map(opt), answer: x.r.pic };
        if (it.kind === "first") return { type: "listen", say: x.s + "... " + x.eg, prompt: ctx.w("first", { w: x.eg, s: x.s }), options: rng.shuffle([x.yes].concat(x.no)).map(opt), answer: x.yes.pic };
        var no = rng.sample(ROBOT.filter(function (y) { return y !== x; }), 2);
        return { type: "listen", show: "🤖", say: x.s, prompt: ctx.w("robot"), options: rng.shuffle([x].concat(no)).map(opt), answer: x.pic };
      });
    }
  });

  /* Question time — english-seed-p4. Questions about pictures from the word bank: How many? (english-seed-12),
     What colour? (colours of english-seed-2/11 on things of one colour), Who's this? (family, english-seed-15),
     What's this? (english-seed-36): the child hears the question and taps the answer, which says itself. */
  var COLOURED = [{ pic: "🍎", en: "apple", c: "red" }, { pic: "🍌", en: "banana", c: "yellow" }, { pic: "🌳", en: "tree", c: "green" },
    { pic: "🍊", en: "orange", c: "orange" }, { pic: "🌊", en: "sea", c: "blue" }, { pic: "🐷", en: "pig", c: "pink" }, { pic: "🧀", en: "cheese", c: "yellow" }];
  var COUNTABLE = [["🍎", "apples"], ["🐟", "fish"], ["🐦", "birds"], ["⭐", "stars"], ["🐱", "cats"], ["🌸", "flowers"]];
  var NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  B.PRACTICE.push({
    id: "english-seed-p4", subject: "english", level: "seed", objectives: ["english.seed.6"],
    needs: ["english-seed-12"], lessons: pick("seed", [12, 15, 24, 29, 36, 39, 40]), emoji: "❓", title: "وقت سؤال",
    words: { ask: "به سؤال گوش کن و جواب را پیدا کن. روی هر جواب بزن و بشنو." },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "seed"), colours = bank.filter(function (w) { return w.color; }), fam = bank.filter(function (w) { return w.theme === "english-seed-5"; });
      var things = bank.filter(function (w) { return w.pic && ["english-seed-4", "english-seed-7", "english-seed-19"].indexOf(w.theme) !== -1; });
      var items = [];
      COUNTABLE.forEach(function (c) { for (var k = 2; k <= 7; k += 1) items.push({ key: "n:" + c[1] + k, kind: "count", c: c, k: k }); });
      COLOURED.forEach(function (t) { if (colours.some(function (w) { return w.en === t.c; })) items.push({ key: "c:" + t.en, kind: "colour", t: t }); });
      if (ctx.done("english-seed-15")) fam.forEach(function (w) { items.push({ key: "w:" + w.en, kind: "who", w: w }); });
      if (ctx.done("english-seed-36")) things.forEach(function (w) { items.push({ key: "t:" + w.en, kind: "what", w: w }); });
      var picked = [], kinds = {};
      // At most two items of each kind in a session, so the questions vary.
      var out = deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if ((kinds[it.kind] = (kinds[it.kind] || 0) + 1) > 2) return null;
        if (it.kind === "count") {
          var ks = rng.shuffle([it.k, it.k + 1, it.k - 1]);
          return { type: "listen", show: new Array(it.k + 1).join(it.c[0]), say: "How many " + it.c[1] + "?", prompt: ctx.w("ask"), options: ks.map(function (k) { return { dots: k, en: NUM[k] }; }), answer: it.k };
        }
        if (it.kind === "colour") {
          var right = colours.find(function (w) { return w.en === it.t.c; });
          var opts = rng.shuffle([right].concat(rng.sample(colours.filter(function (w) { return w !== right; }), 2)));
          return { type: "listen", show: it.t.pic, say: "What colour is the " + it.t.en + "?", prompt: ctx.w("ask"), options: opts.map(face), answer: right.color };
        }
        if (it.kind === "who") {
          var o2 = rng.shuffle([it.w].concat(rng.sample(fam.filter(function (w) { return w !== it.w; }), 2)));
          return { type: "listen", say: "Who's this? It's my " + it.w.en + ". Where's my " + it.w.en + "?", prompt: ctx.w("ask"), options: o2.map(face), answer: it.w.pic };
        }
        var o3 = rng.shuffle([it.w].concat(rng.sample(things.filter(function (w) { return w !== it.w; }), 2)));
        return { type: "listen", say: "What's this? It's a " + it.w.en + ". Find the " + it.w.en + ".", prompt: ctx.w("ask"), options: o3.map(face), answer: it.w.pic };
      });
      return out;
    }
  });

  /* ================= 🌱 Sprout: letters, sounds, decoding ================= */

  // What the English voice says for each sound (as in js/lessons/english.js; recordings will replace them).
  var SND = { s: "sss", a: "ah", t: "tuh", p: "puh", i: "ih", n: "nnn", m: "mmm", d: "duh", g: "guh", o: "aw", c: "kuh", k: "kuh", ck: "kuh",
    e: "eh", u: "uh", r: "rrr", h: "huh", b: "buh", f: "fff", l: "lll", j: "juh", v: "vvv", w: "wuh", x: "ks", y: "yuh", z: "zzz", qu: "kwuh",
    sh: "shh", ch: "chuh", th: "thh", ng: "ng", nk: "nk", ff: "fff", ll: "lll", ss: "sss", ai: "ay", ee: "ee", igh: "eye", oa: "oh", oo: "oo",
    ar: "ar", or: "or", ur: "er", ow: "ow", oi: "oy", ear: "ear", air: "air", er: "er" };
  // The letters and letter pairs taught so far: the `letter` steps of the Sprout lessons done.
  function taught(ctx) {
    var g = {};
    lessons(ctx, "sprout").forEach(function (l) {
      if (l.level !== "sprout") return;
      l.steps.forEach(function (s) { if (s.type === "letter") g[s.letter] = true; });
    });
    return g;
  }
  /* Decodable words with pictures, written as their sounds (graphemes). A word with two consonants side by side
     (frog, tent) also needs english-sprout-38 (adjacent consonants). */
  var DW = [
    ["tap", "t a p", "🚰"], ["man", "m a n", "👨"], ["tin", "t i n", "🥫"], ["cat", "c a t", "🐱"], ["hat", "h a t", "👒"], ["map", "m a p", "🗺️"], ["pan", "p a n", "🍳"], ["pin", "p i n", "📌"], ["pig", "p i g", "🐷"],
    ["dog", "d o g", "🐶"], ["sun", "s u n", "☀️"], ["bus", "b u s", "🚌"], ["cup", "c u p", "☕"], ["bed", "b e d", "🛏️"], ["hen", "h e n", "🐔"],
    ["ten", "t e n", "🔟"], ["net", "n e t", "🥅"], ["box", "b o x", "📦"], ["fox", "f o x", "🦊"], ["six", "s i x", "6️⃣"], ["jam", "j a m", "🍯"],
    ["van", "v a n", "🚐"], ["web", "w e b", "🕸️"], ["mat", "m a t", "🟫"], ["pot", "p o t", "🍲"], ["mug", "m u g", "☕"], ["leg", "l e g", "🦵"],
    ["bell", "b e ll", "🔔"], ["doll", "d o ll", "🪆"], ["duck", "d u ck", "🦆"], ["sock", "s o ck", "🧦"], ["fish", "f i sh", "🐟"], ["ship", "sh i p", "🚢"],
    ["chip", "ch i p", "🍟"], ["ring", "r i ng", "💍"], ["king", "k i ng", "🤴"], ["rain", "r ai n", "🌧️"], ["bee", "b ee", "🐝"], ["sheep", "sh ee p", "🐑"],
    ["light", "l igh t", "💡"], ["night", "n igh t", "🌃"], ["boat", "b oa t", "⛵"], ["goat", "g oa t", "🐐"], ["moon", "m oo n", "🌙"], ["book", "b oo k", "📖"],
    ["car", "c ar", "🚗"], ["fork", "f or k", "🍴"], ["corn", "c or n", "🌽"], ["cow", "c ow", "🐮"], ["coin", "c oi n", "🪙"], ["ear", "ear", "👂"],
    ["hair", "h air", "💇"], ["frog", "f r o g", "🐸"], ["drum", "d r u m", "🥁"], ["crab", "c r a b", "🦀"], ["flag", "f l a g", "🚩"], ["tent", "t e n t", "⛺"],
    ["hand", "h a n d", "✋"], ["milk", "m i l k", "🥛"], ["star", "s t ar", "⭐"], ["tree", "t r ee", "🌳"], ["queen", "qu ee n", "👸"], ["zip", "z i p", "🤐"]
  ].map(function (x) { return { w: x[0], parts: x[1].split(" "), pic: x[2] }; });
  var VOWEL = /^[aeiou]$/;
  function blend(parts) { for (var i = 1; i < parts.length; i++) if (!VOWEL.test(parts[i]) && !VOWEL.test(parts[i - 1]) && parts[i].length === 1 && parts[i - 1].length === 1) return true; return false; }
  function decodableWords(ctx) {
    var g = taught(ctx), cl = ctx.done("english-sprout-38");
    return DW.filter(function (x) { return x.parts.every(function (p) { return g[p]; }) && (cl || !blend(x.parts)); });
  }

  /* Sound cards — english-sprout-p1. The letters and letter pairs taught, mixed: hear a sound and tap its letter;
     see a letter and tap the picture whose word starts with it (from the decodable words). */
  B.PRACTICE.push({
    id: "english-sprout-p1", subject: "english", level: "sprout", objectives: ["english.spr.1", "english.spr.4", "english.spr.5"],
    needs: ["english-sprout-1"], lessons: path("sprout"), emoji: "🔤", title: "کارت‌های صدا",
    words: { hear: "به صدا گوش کن. کدام حرف است؟", see: "این حرف چه صدایی دارد؟ کدام کلمه با آن شروع می‌شود؟ روی تصویرها بزن و گوش کن." },
    make: function (rng, n, ctx) {
      var g = Object.keys(taught(ctx)).filter(function (x) { return SND[x]; });
      if (g.length < 3) return [];
      var words = decodableWords(ctx);
      return deal(rng, n, ctx, g, function (x) { return x; }, function (x) {
        var starts = words.filter(function (w) { return w.parts[0] === x; });
        if (starts.length && rng() < 0.5) {
          var w = rng.pick(starts), no = rng.sample(words.filter(function (y) { return y.parts[0] !== x && SND[y.parts[0]] !== SND[x]; }), 2);
          if (no.length === 2) return { type: "listen", show: x, prompt: ctx.w("see"), options: rng.shuffle([w].concat(no)).map(function (y) { return { pic: y.pic, en: y.w }; }), answer: w.pic };
        }
        var others2 = rng.sample(g.filter(function (y) { return y !== x && SND[y] !== SND[x]; }), 2);
        return { type: "listen", say: SND[x], prompt: ctx.w("hear"), options: rng.shuffle([x].concat(others2)).map(function (y) { return { label: y, value: y }; }), answer: x };
      });
    }
  });

  /* Decodable words — english-sprout-p2. Words made only of the sounds taught: read a word and tap its picture,
     build a word from its sounds, sort words by their vowel sound. */
  B.PRACTICE.push({
    id: "english-sprout-p2", subject: "english", level: "sprout", objectives: ["english.spr.2", "english.spr.3", "english.spr.6"],
    needs: ["english-sprout-13"], lessons: path("sprout", "english-sprout-13"), emoji: "📖", title: "کلمه بخوان",
    words: { read: "این کلمه را بخوان. تصویرش کدام است؟", build: "به تصویر نگاه کن و گوش کن. کلمه را با صداهایش بساز.", sort: "هر کلمه را بخوان. صدای وسطش کدام است؟" },
    make: function (rng, n, ctx) {
      var words = decodableWords(ctx);
      if (words.length < 3) return [];
      var out = deal(rng, n, ctx, words, function (w) { return w.w; }, function (w) {
        if (rng() < 0.4) {
          var g = Object.keys(taught(ctx)).filter(function (x) { return x.length === 1 && w.parts.indexOf(x) === -1; });
          return { type: "build", word: w.w, parts: w.parts, extra: rng.sample(g, 1), pic: w.pic, say: w.w, prompt: ctx.w("build") };
        }
        var no = rng.sample(words.filter(function (y) { return y !== w; }), 2);
        return { type: "listen", show: w.w, prompt: ctx.w("read"), options: rng.shuffle([w].concat(no)).map(function (y) { return { pic: y.pic, en: y.w }; }), answer: w.pic };
      });
      // One sort by the middle vowel when two vowels have three-letter words to read.
      var byV = {};
      words.forEach(function (w) { if (w.parts.length === 3 && VOWEL.test(w.parts[1])) (byV[w.parts[1]] = byV[w.parts[1]] || []).push(w); });
      var vs = Object.keys(byV).filter(function (v) { return byV[v].length >= 2; });
      if (vs.length >= 2 && out.length >= 3) {
        var two = rng.sample(vs, 2), items = [];
        two.forEach(function (v) { rng.sample(byV[v], 2).forEach(function (w) { items.push({ label: w.w, say: w.w, basket: v }); }); });
        out.splice(1, 1, en({ type: "sort", key: "sort:" + two.join(""), prompt: ctx.w("sort"), baskets: two.map(function (v) { return { label: v }; }), items: rng.shuffle(items) }));
      }
      return out;
    }
  });

  /* Decodable sentences — english-sprout-p3. A sentence of decodable words and the tricky words taught, and three
     pictures: tap the one it says. Each sentence waits for the lessons of its tricky words. */
  var TRICKY = { "english-sprout-8": "I a is my see the to", "english-sprout-29": "all are he her she they was we you", "english-sprout-41": "come do have like one said so some there were what when" };
  var SENT = [
    ["The cat is on the mat.", "🐱🟫", ["🐶🟫", "🐱📦"]], ["The dog is in the box.", "🐶📦", ["🐱📦", "🐶🛏️"]], ["I see a red hen.", "🐔", ["🐷", "🦆"]],
    ["The pig is in the mud.", "🐷🟤", ["🐶🟤", "🐷🛏️"]], ["My hat is on the bed.", "👒🛏️", ["👒📦", "🧦🛏️"]], ["A fish is in the net.", "🐟🥅", ["🐟☕", "🦆🥅"]],
    ["She has a big drum.", "👧🥁", ["👦🥁", "👧🚩"]], ["He is on a ship.", "👦🚢", ["👦🚌", "👧🚢"]], ["They are in the tent.", "👫⛺", ["👫🚌", "🐶⛺"]],
    ["We can see the moon.", "🌙", ["☀️", "⭐"]], ["You have a pink sock.", "🧦", ["👒", "🔔"]], ["The goat is in the boat.", "🐐⛵", ["🐐🚌", "🐮⛵"]],
    ["The king has a ring.", "🤴💍", ["🤴🔔", "👸💍"]], ["There is a frog on the log.", "🐸🪵", ["🦆🪵", "🐸⛵"]], ["Come and see the sheep!", "🐑", ["🐮", "🐐"]]
  ].map(function (x) { return { text: x[0], pic: x[1], no: x[2] }; });
  function sentenceOk(ctx, text) {
    var known = {}, g = taught(ctx);
    Object.keys(TRICKY).forEach(function (id) { if (ctx.done(id)) TRICKY[id].split(" ").forEach(function (w) { known[w.toLowerCase()] = true; }); });
    var words = decodableWords(ctx).map(function (w) { return w.w; });
    words.forEach(function (w) { known[w] = true; });
    // A few more decodable words without pictures, checked letter by letter (two-letter pairs where taught).
    return text.toLowerCase().replace(/[.!?,"]/g, "").split(" ").every(function (w) {
      if (known[w]) return true;
      var parts = w.match(/sh|ch|th|ng|nk|ck|ll|ss|ff|ee|oo|ar|or|[a-z]/g) || [];
      return parts.every(function (p) { return g[p]; }) && (ctx.done("english-sprout-38") || !blend(parts));
    });
  }
  B.PRACTICE.push({
    id: "english-sprout-p3", subject: "english", level: "sprout", objectives: ["english.spr.7", "english.spr.8"],
    needs: ["english-sprout-8"], lessons: path("sprout", "english-sprout-8"), emoji: "📝", title: "جمله بخوان",
    words: { read: "این جمله را بخوان. کدام تصویر است؟" },
    make: function (rng, n, ctx) {
      var ok = SENT.filter(function (x) { return sentenceOk(ctx, x.text); });
      return deal(rng, n, ctx, ok, function (x) { return x.text; }, function (x) {
        return { type: "listen", show: x.text, prompt: ctx.w("read"), options: rng.shuffle([x.pic].concat(x.no)).map(function (p) { return { pic: p }; }), answer: x.pic };
      });
    }
  });

  /* Dictation — english-sprout-p4. Hear a decodable word (the picture waits for the end) and build it from its
     sounds (`build` with hidden), with one sound that does not belong. */
  B.PRACTICE.push({
    id: "english-sprout-p4", subject: "english", level: "sprout", objectives: ["english.spr.3", "english.spr.10"],
    needs: ["english-sprout-13"], lessons: pick("sprout", [13, 15, 18, 20, 24, 34, 38, 39, 52, 53, 56, 59]), emoji: "🎧", title: "دیکته",
    words: { prompt: "گوش کن و کلمه را با صداهایش بساز." },
    make: function (rng, n, ctx) {
      var words = decodableWords(ctx), g = Object.keys(taught(ctx)).filter(function (x) { return x.length === 1; });
      return deal(rng, n, ctx, words, function (w) { return w.w; }, function (w) {
        return { type: "build", hidden: true, word: w.w, parts: w.parts, extra: rng.sample(g.filter(function (x) { return w.parts.indexOf(x) === -1; }), 1), pic: w.pic, say: w.w, prompt: ctx.w("prompt") };
      });
    }
  });

  /* Word bank (Starters) — english-sprout-p5. The Sprout words with their pictures: hear and tap, read and tap;
     numbers to 20 after english-sprout-19. */
  var TEENS = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  B.PRACTICE.push({
    id: "english-sprout-p5", subject: "english", level: "sprout", objectives: ["english.spr.11", "english.spr.16"],
    needs: ["english-sprout-19"], lessons: pick("sprout", [19, 25, 35, 36, 45, 46, 47, 54, 58, 60]), emoji: "🗂️", title: "کلمه‌های جوانه",
    words: { hear: "گوش کن. کدام تصویر است؟", read: "این کلمه را بخوان. تصویرش کدام است؟", num: "گوش کن. کدام عدد است؟" },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "sprout", { only: true }).filter(function (w) { return !/^\d+$/.test(w.pic || ""); });
      var items = bank.map(function (w) { return { key: w.en, w: w }; });
      for (var k = 11; k <= 20; k++) items.push({ key: "n" + k, k: k });
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if (it.k) {
          var ks = rng.shuffle([it.k].concat(rng.sample([11, 12, 13, 14, 15, 16, 17, 18, 19, 20].filter(function (k) { return k !== it.k && k !== it.k + 1 && k !== it.k - 1; }), 1), [it.k === 20 ? 19 : it.k + 1]));
          return { type: "listen", say: TEENS[it.k - 11], prompt: ctx.w("num"), options: ks.map(function (k) { return { label: String(k), en: TEENS[k - 11], value: String(k) }; }), answer: String(it.k) };
        }
        var w = it.w, opts = rng.shuffle([w].concat(others(rng, bank, w, 2)));
        if (bank.length < 3) return null;
        if (rng() < 0.5) return { type: "listen", say: w.en, prompt: ctx.w("hear"), options: opts.map(face), answer: valueOf(w) };
        return { type: "listen", show: w.en, prompt: ctx.w("read"), options: opts.map(function (x) { var f = face(x); delete f.en; return f; }), answer: valueOf(w) };
      });
    }
  });

  /* Listen and do — english-sprout-p6. Instructions made from known words: find a number of things, point to a
     colour, find the big or the small one. */
  var THINGS = [["🍎", "apples"], ["🐟", "fish"], ["🐶", "dogs"], ["🦆", "ducks"], ["⭐", "stars"], ["🎈", "balloons"]];
  B.PRACTICE.push({
    id: "english-sprout-p6", subject: "english", level: "sprout", objectives: ["english.spr.13"],
    needs: ["english-sprout-37"], lessons: pick("sprout", [37, 44, 60]), emoji: "👉", title: "گوش کن و پیدا کن",
    words: { prompt: "گوش کن و همان را پیدا کن." },
    make: function (rng, n, ctx) {
      var colours = wordBank(ctx, "seed").filter(function (w) { return w.color; });
      var items = [];
      THINGS.forEach(function (t) { for (var k = 2; k <= 6; k++) items.push({ key: "f:" + t[1] + k, t: t, k: k }); });
      colours.forEach(function (c) { items.push({ key: "c:" + c.en, c: c }); });
      ["big", "small"].forEach(function (b) { THINGS.forEach(function (t) { items.push({ key: "s:" + b + t[1], b: b, t: t }); }); });
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if (it.c) {
          var o = rng.shuffle([it.c].concat(rng.sample(colours.filter(function (x) { return x !== it.c; }), 2)));
          return { type: "listen", say: "Point to the " + it.c.en + " one.", prompt: ctx.w("prompt"), quiet: true, options: o.map(function (x) { return { color: x.color }; }), answer: it.c.color };
        }
        if (it.b) {
          var one = it.t[1].replace(/s$/, "").replace(/^fish$/, "fish");
          return { type: "listen", say: "Find the " + it.b + " " + one + ".", prompt: ctx.w("prompt"), quiet: true,
            options: rng.shuffle([{ pic: it.t[0], scale: 1.6, value: "big" }, { pic: it.t[0], scale: 0.7, value: "small" }]), answer: it.b };
        }
        var ks = rng.shuffle([it.k, it.k + 1, it.k - 1]);
        return { type: "listen", say: "Find " + NUM[it.k] + " " + it.t[1] + ".", prompt: ctx.w("prompt"), quiet: true,
          options: ks.map(function (k) { return { label: new Array(k + 1).join(it.t[0]), value: String(k) }; }), answer: String(it.k) };
      });
    }
  });

  /* Questions and answers — english-sprout-p7. Have you got …? Do you like …? Can you …? about a picture: the child
     hears the question and chooses the short answer that fits it (Yes, I have. / Yes, I do. / Yes, I can.). */
  var QA = [
    { q: "Have you got a cat?", pic: "🐱", a: "Yes, I have." }, { q: "Have you got a bike?", pic: "🚲", a: "Yes, I have." }, { q: "Have you got a kite?", pic: "🪁", a: "No, I haven't." },
    { q: "Do you like bananas?", pic: "🍌", a: "Yes, I do." }, { q: "Do you like rice?", pic: "🍚", a: "Yes, I do." }, { q: "Do you like spiders?", pic: "🕷️", a: "No, I don't." },
    { q: "Can you swim?", pic: "🏊", a: "Yes, I can." }, { q: "Can you jump?", pic: "🤸", a: "Yes, I can." }, { q: "Can you fly?", pic: "🐦", a: "No, I can't." },
    { q: "Have you got a robot?", pic: "🤖", a: "Yes, I have." }, { q: "Do you like ice cream?", pic: "🍦", a: "Yes, I do." }, { q: "Can you climb?", pic: "🧗", a: "No, I can't." }
  ];
  var FAMILY = { "Yes, I have.": "have", "No, I haven't.": "have", "Yes, I do.": "do", "No, I don't.": "do", "Yes, I can.": "can", "No, I can't.": "can" };
  B.PRACTICE.push({
    id: "english-sprout-p7", subject: "english", level: "sprout", objectives: ["english.spr.12", "english.spr.14"],
    needs: ["english-sprout-50"], lessons: pick("sprout", [50, 54, 60]), emoji: "💬", title: "سؤال و جواب",
    words: { prompt: "به سؤال گوش کن. کدام جواب به این سؤال می‌خورد؟" },
    make: function (rng, n, ctx) {
      var qa = QA.filter(function (x) { return ctx.done("english-sprout-48") || !/^Can/.test(x.q); });
      return deal(rng, n, ctx, qa, function (x) { return x.q; }, function (x) {
        // The wrong answers are short answers of the other two kinds of question.
        var wrong = Object.keys(FAMILY).filter(function (a) { return FAMILY[a] !== FAMILY[x.a] && a.slice(0, 3) === x.a.slice(0, 3); });
        var opts = rng.shuffle([x.a].concat(rng.sample(wrong, 2)));
        return { type: "listen", show: x.pic, say: x.q, prompt: ctx.w("prompt"), options: opts.map(function (a) { return { label: a, en: a }; }), answer: x.a };
      });
    }
  });

  /* ================= 🌿 Sapling: spellings, endings, sentences, short texts ================= */

  // Every spelling taught so far: the `letter` steps of the Sprout and Sapling lessons done ("a-e", "ay", "ee" …).
  function spellings(ctx) {
    var g = {};
    lessons(ctx, "sapling").forEach(function (l) {
      if (l.level !== "sprout" && l.level !== "sapling") return;
      l.steps.forEach(function (s) { if (s.type === "letter") g[s.letter] = true; });
    });
    return g;
  }
  /* One sound, several spellings (Phase 5): each word is written [word, picture, the spelling it uses]. A group is
     used once two of its spellings are taught; only words of taught spellings are shown. */
  var SOUNDS = [
    { sound: "ay", words: [["rain", "🌧️", "ai"], ["snail", "🐌", "ai"], ["tail", "🐕", "ai"], ["play", "⚽", "ay"], ["tray", "🍽️", "ay"], ["day", "☀️", "ay"], ["cake", "🎂", "a-e"], ["gate", "🚪", "a-e"], ["snake", "🐍", "a-e"]] },
    { sound: "ee", words: [["tree", "🌳", "ee"], ["feet", "🦶", "ee"], ["sheep", "🐑", "ee"], ["sea", "🌊", "ea"], ["leaf", "🍃", "ea"], ["tea", "🍵", "ea"], ["key", "🔑", "ey"], ["monkey", "🐒", "ey"]] },
    { sound: "igh", words: [["light", "💡", "igh"], ["night", "🌃", "igh"], ["pie", "🥧", "ie"], ["tie", "👔", "ie"], ["bike", "🚲", "i-e"], ["kite", "🪁", "i-e"], ["five", "5️⃣", "i-e"]] },
    { sound: "oa", words: [["boat", "⛵", "oa"], ["coat", "🧥", "oa"], ["goat", "🐐", "oa"], ["snow", "❄️", "ow"], ["bowl", "🥣", "ow"], ["home", "🏠", "o-e"], ["bone", "🦴", "o-e"], ["rose", "🌹", "o-e"]] },
    { sound: "oo", words: [["moon", "🌙", "oo"], ["spoon", "🥄", "oo"], ["new", "🆕", "ew"], ["blue", "🔵", "ue"], ["glue", "🧴", "ue"], ["tube", "🚇", "u-e"], ["flute", "🪈", "u-e"]] },
    { sound: "ow", words: [["cow", "🐮", "ow"], ["owl", "🦉", "ow"], ["house", "🏠", "ou"], ["mouse", "🐭", "ou"], ["cloud", "☁️", "ou"]] },
    { sound: "oy", words: [["coin", "🪙", "oi"], ["soil", "🪴", "oi"], ["boy", "👦", "oy"], ["toy", "🧸", "oy"]] },
    { sound: "er", words: [["bird", "🐦", "ir"], ["girl", "👧", "ir"], ["nurse", "🧑‍⚕️", "ur"], ["purse", "👛", "ur"], ["burger", "🍔", "ur"]] },
    { sound: "or", words: [["fork", "🍴", "or"], ["horse", "🐴", "or"], ["saw", "🪚", "aw"], ["straw", "🥤", "aw"], ["paw", "🐾", "aw"]] }
  ];
  // Misspellings to choose from: the same word with the sound's other spellings (never a real word, like rows for rose).
  var REAL = { rows: 1, row: 1, tow: 1, toe: 1, tee: 1, bee: 1, see: 1, sea: 1, pea: 1, boy: 1, ties: 1 };
  function misspell(word, from, to) {
    if (from.indexOf("-e") === 1) word = word.slice(0, -1); // a split vowel: take the e off the end first
    var v = from.charAt(0), i = from.indexOf("-e") === 1 ? word.lastIndexOf(v) : word.indexOf(from);
    if (i < 0) return null;
    var tail = word.slice(i + (from.indexOf("-e") === 1 ? 1 : from.length));
    if (to.indexOf("-e") === 1) return word.slice(0, i) + to.charAt(0) + tail + "e";
    return word.slice(0, i) + to + tail;
  }
  B.PRACTICE.push({
    id: "english-sapling-p1", subject: "english", level: "sapling", objectives: ["english.sap.1", "english.sap.2"],
    needs: ["english-sapling-11"], lessons: pick("sapling", [11, 12, 14, 15, 19, 20, 21, 30, 32, 45, 55, 59]), emoji: "🔠", title: "یک صدا، چند املا",
    words: {
      sort: "روی هر کلمه بزن و گوش کن. صدای «{s}» در آن چطور نوشته شده؟",
      spell: "به تصویر نگاه کن و گوش کن. کدام درست نوشته شده؟",
      build: "گوش کن و کلمه را با تکه‌هایش بساز."
    },
    make: function (rng, n, ctx) {
      var g = spellings(ctx);
      var groups = SOUNDS.map(function (grp) {
        return { sound: grp.sound, words: grp.words.filter(function (w) { return g[w[2]]; }) };
      }).filter(function (grp) {
        var sp = {}; grp.words.forEach(function (w) { sp[w[2]] = true; });
        return Object.keys(sp).length >= 2;
      });
      if (!groups.length) return [];
      var items = [];
      groups.forEach(function (grp) {
        items.push({ key: "sort:" + grp.sound, kind: "sort", grp: grp });
        grp.words.forEach(function (w) { items.push({ key: w[0], kind: "spell", grp: grp, w: w }); });
      });
      var sorts = 0;
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if (it.kind === "sort") {
          if (sorts++) return null; // one sorting game a session
          var sp = []; it.grp.words.forEach(function (w) { if (sp.indexOf(w[2]) === -1) sp.push(w[2]); });
          sp = rng.sample(sp, Math.min(3, sp.length));
          var ws = [];
          sp.forEach(function (s) { rng.sample(it.grp.words.filter(function (w) { return w[2] === s; }), 2).forEach(function (w) { ws.push(w); }); });
          return { type: "sort", prompt: ctx.w("sort", { s: it.grp.sound }), baskets: sp.map(function (s) { return { label: s }; }),
            items: rng.shuffle(ws).map(function (w) { return { label: w[0], pic: w[1], say: w[0], basket: w[2] }; }) };
        }
        var w = it.w, other = it.grp.words.map(function (x) { return x[2]; }).filter(function (s, i, a) { return s !== w[2] && a.indexOf(s) === i; });
        var wrong = rng.shuffle(other).map(function (s) { return misspell(w[0], w[2], s); }).filter(function (x) { return x && x !== w[0] && !REAL[x]; }).slice(0, 2);
        if (!wrong.length) return null;
        return { type: "listen", show: w[1], say: w[0], prompt: ctx.w("spell"), options: rng.shuffle([w[0]].concat(wrong)).map(function (x) { return { label: x, value: x }; }), answer: w[0] };
      });
    }
  });

  /* Word endings — english-sapling-p2. -s, -es and -ies (english-sapling-5, english-sapling-16), -ing and -ed
     (english-sapling-33): the right spelling of the word with its ending, from three. */
  var ENDINGS = [
    { base: "cat", form: "cats", wrong: ["cates", "caties"], show: "🐱🐱", after: "english-sapling-5", say: "two cats" },
    { base: "dog", form: "dogs", wrong: ["doges", "dogies"], show: "🐶🐶", after: "english-sapling-5", say: "two dogs" },
    { base: "book", form: "books", wrong: ["bookes", "bookies"], show: "📖📖", after: "english-sapling-5", say: "two books" },
    { base: "box", form: "boxes", wrong: ["boxs", "boxies"], show: "📦📦", after: "english-sapling-16", say: "two boxes" },
    { base: "bus", form: "buses", wrong: ["buss", "busies"], show: "🚌🚌", after: "english-sapling-16", say: "two buses" },
    { base: "dish", form: "dishes", wrong: ["dishs", "dishies"], show: "🍽️🍽️", after: "english-sapling-16", say: "two dishes" },
    { base: "fox", form: "foxes", wrong: ["foxs", "foxies"], show: "🦊🦊", after: "english-sapling-16", say: "two foxes" },
    { base: "baby", form: "babies", wrong: ["babys", "babyes"], show: "👶👶", after: "english-sapling-16", say: "two babies" },
    { base: "cherry", form: "cherries", wrong: ["cherrys", "cherryes"], show: "🍒🍒", after: "english-sapling-16", say: "two cherries" },
    { base: "party", form: "parties", wrong: ["partys", "partyes"], show: "🎉🎉", after: "english-sapling-16", say: "two parties" },
    { base: "run", form: "running", wrong: ["runing", "runeing"], show: "🏃", after: "english-sapling-33", say: "He's running." },
    { base: "swim", form: "swimming", wrong: ["swiming", "swimeing"], show: "🏊", after: "english-sapling-33", say: "She's swimming." },
    { base: "make", form: "making", wrong: ["makeing", "makking"], show: "🎂", after: "english-sapling-33", say: "We're making a cake." },
    { base: "ride", form: "riding", wrong: ["rideing", "ridding"], show: "🚲", after: "english-sapling-33", say: "I'm riding my bike." },
    { base: "play", form: "playing", wrong: ["plaing", "plaiing"], show: "⚽", after: "english-sapling-33", say: "They're playing." },
    { base: "jump", form: "jumped", wrong: ["jumpd", "jumpped"], show: "🤸", after: "english-sapling-33", say: "I jumped." },
    { base: "stop", form: "stopped", wrong: ["stoped", "stopd"], show: "🛑", after: "english-sapling-33", say: "The bus stopped." },
    { base: "like", form: "liked", wrong: ["likeed", "likked"], show: "😋", after: "english-sapling-33", say: "I liked it." },
    { base: "cry", form: "cried", wrong: ["cryed", "cryd"], show: "😢", after: "english-sapling-33", say: "The baby cried." }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p2", subject: "english", level: "sapling", objectives: ["english.sap.3"],
    needs: ["english-sapling-5"], lessons: pick("sapling", [5, 16, 33, 38, 55, 59]), emoji: "✍️", title: "آخر کلمه‌ها",
    words: { prompt: "{base} → ؟ گوش کن. کدام درست نوشته شده؟" },
    make: function (rng, n, ctx) {
      var list = ENDINGS.filter(function (e) { return ctx.done(e.after); });
      return deal(rng, n, ctx, list, function (e) { return e.form; }, function (e) {
        return { type: "listen", show: e.show, say: e.say, prompt: ctx.w("prompt", { base: e.base }), options: rng.shuffle([e.form].concat(e.wrong)).map(function (x) { return { label: x, value: x }; }), answer: e.form };
      });
    }
  });

  /* Sentence builder — english-sapling-p3. Sentences from frames (be, have got, there is, present simple, present
     continuous, can), each with its negative and its question: put the words in order, or choose the negative or
     the question. Each frame waits for the lesson that teaches it. */
  var FRAMES = [
    { after: "english-sapling-9", s: "She is happy.", neg: "She isn't happy.", q: "Is she happy?", bad: ["She not happy.", "Is happy she?"] },
    { after: "english-sapling-9", s: "We are at school.", neg: "We aren't at school.", q: "Are we at school?", bad: ["We not are at school.", "Are at school we?"] },
    { after: "english-sapling-1", s: "I can see a red bus.", neg: "I can't see a red bus.", q: "Can you see a red bus?", bad: ["I not can see a red bus.", "Can see you a red bus?"] },
    { after: "english-sapling-1", s: "I can see two birds.", neg: "I can't see two birds.", q: "Can you see two birds?", bad: ["I don't can see two birds.", "You can see two birds?"] },
    { after: "english-sapling-9", s: "I am tired.", neg: "I'm not tired.", q: "Are you tired?", bad: ["I amn't tired.", "Am tired I?"] },
    { after: "english-sapling-9", s: "You are my friend.", neg: "You aren't my friend.", q: "Are you my friend?", bad: ["You not are my friend.", "Are my friend you?"] },
    { after: "english-sapling-10", s: "He is my brother.", neg: "He isn't my brother.", q: "Is he your brother?", bad: ["He not my brother.", "Is my brother he?"] },
    { after: "english-sapling-17", s: "There is a cat in the garden.", neg: "There isn't a cat in the garden.", q: "Is there a cat in the garden?", bad: ["There not is a cat in the garden.", "There is a cat in the garden?"] },
    { after: "english-sapling-17", s: "There are two books on the table.", neg: "There aren't two books on the table.", q: "Are there two books on the table?", bad: ["There no are two books on the table.", "Is there two books on the table?"] },
    { after: "english-sapling-27", s: "She plays football.", neg: "She doesn't play football.", q: "Does she play football?", bad: ["She don't plays football.", "Do she plays football?"] },
    { after: "english-sapling-26", s: "I get up at seven.", neg: "I don't get up at seven.", q: "Do you get up at seven?", bad: ["I not get up at seven.", "Get you up at seven?"] },
    { after: "english-sapling-27", s: "Reza likes apples.", neg: "Reza doesn't like apples.", q: "Does Reza like apples?", bad: ["Reza not likes apples.", "Do Reza like apples?"] },
    { after: "english-sapling-31", s: "They are playing in the park.", neg: "They aren't playing in the park.", q: "Are they playing in the park?", bad: ["They not playing in the park.", "Do they playing in the park?"] },
    { after: "english-sapling-31", s: "Mina is reading a book.", neg: "Mina isn't reading a book.", q: "Is Mina reading a book?", bad: ["Mina not is reading a book.", "Does Mina reading a book?"] },
    { after: "english-sapling-34", s: "He can swim.", neg: "He can't swim.", q: "Can he swim?", bad: ["He doesn't can swim.", "Does he can swim?"] },
    { after: "english-sapling-34", s: "My sister can ride a bike.", neg: "My sister can't ride a bike.", q: "Can your sister ride a bike?", bad: ["My sister not can ride a bike.", "Do your sister can ride a bike?"] }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p3", subject: "english", level: "sapling", objectives: ["english.sap.6", "english.sap.9", "english.sap.10", "english.sap.11", "english.sap.12", "english.sap.13"],
    needs: ["english-sapling-1"], lessons: path("sapling"), emoji: "🧩", title: "جمله بساز",
    words: { order: "گوش کن و کلمه‌ها را به ترتیب بچین", neg: "این جمله را منفی کن. کدام درست است؟", q: "از این جمله سؤال بساز. کدام درست است؟" },
    make: function (rng, n, ctx) {
      var list = [];
      FRAMES.forEach(function (f) { if (ctx.done(f.after)) ["order", "neg", "q"].forEach(function (k) { list.push({ key: k + ":" + f.s, k: k, f: f }); }); });
      var seen = {};
      return deal(rng, n, ctx, list, function (it) { return it.key; }, function (it) {
        if (seen[it.f.s]) return null; // one item per sentence in a session
        seen[it.f.s] = true;
        var f = it.f;
        if (it.k === "order") {
          var pick = rng.pick([f.s, f.neg, f.q]);
          return { type: "order", prompt: ctx.w("order"), ltr: true, say: pick, items: pick.split(" ") };
        }
        var right = it.k === "neg" ? f.neg : f.q, wrong = it.k === "neg" ? f.bad[0] : f.bad[1];
        return { type: "listen", show: f.s, prompt: ctx.w(it.k), options: rng.shuffle([right, wrong, it.k === "neg" ? f.q : f.neg]).map(function (x) { return { label: x, en: x }; }), answer: right };
      });
    }
  });

  /* Story bank — english-sapling-p4. Short graded stories and fact texts (50–100 words) with questions; each text
     waits for the lesson after which its spellings and words are known. */
  var SAP_TEXTS = [
    { after: "english-sapling-28", key: "kite", text: "Arman has got a red kite. On Friday, he goes to the park with his dad. It is windy, so the kite flies high in the sky. Then the wind stops and the kite comes down in a tree. Dad gets a long stick and helps him. Arman is happy again.",
      qs: [["آرمان کی به پارک می‌رود؟", ["جمعه", "شنبه", "دوشنبه"], "جمعه"], ["بادبادک کجا می‌افتد؟", ["🌳", "🏠", "🌊"], "🌳"]] },
    { after: "english-sapling-28", key: "cat", text: "Mina has got a little grey cat. Its name is Pishi. Every morning, Pishi sleeps on the sofa. In the afternoon, it plays with a ball. In the evening, it sits next to Mina and they read a book together. Pishi likes milk, but it doesn't like water.",
      qs: [["پیشی صبح‌ها کجا می‌خوابد؟", ["🛋️", "🛏️", "📦"], "🛋️"], ["پیشی چه چیزی را دوست ندارد؟", ["💧", "🥛", "⚽"], "💧"]] },
    { after: "english-sapling-47", key: "camel", text: "Camels live in the desert. The desert is very hot and dry. Camels can walk for a long time without water. They have got long legs and big feet, so they don't sink in the sand. People use camels to carry things. A camel can carry two people!",
      qs: [["شترها کجا زندگی می‌کنند؟", ["🏜️", "🌲", "🌊"], "🏜️"], ["چرا در شن فرو نمی‌روند؟", ["پاهای بزرگ دارند", "تند می‌دوند", "آب می‌خورند"], "پاهای بزرگ دارند"]] },
    { after: "english-sapling-47", key: "bees", text: "Bees are small insects. They live together in a hive. Every day, they fly from flower to flower and drink the sweet juice. Then they go back to the hive and make honey. Bees are very busy. They help flowers and fruit trees to grow, too.",
      qs: [["زنبورها کجا زندگی می‌کنند؟", ["در کندو", "زیر زمین", "در آب"], "در کندو"], ["زنبورها چه می‌سازند؟", ["🍯", "🥛", "🍞"], "🍯"]] },
    { after: "english-sapling-48", key: "bike", text: "It is Sara's birthday. Her grandma gives her a big box. Sara opens it. Inside, there is a blue bike! Sara can't ride a bike, so her brother helps her. On the first day, she falls off. On the second day, she rides to the end of the street. Now she rides every day.",
      qs: [["مادربزرگ به سارا چه داد؟", ["🚲", "🪁", "🧸"], "🚲"], ["چه کسی کمکش کرد؟", ["برادرش", "مادربزرگش", "دوستش"], "برادرش"]] },
    { after: "english-sapling-57", key: "rain", text: "On Monday it is rainy. Reza and his sister can't play outside. They are bored. Then Mum has an idea. They make a little house from chairs and a big blanket. They sit inside with a torch and tell stories. \"This is the best rainy day!\" says Reza.",
      qs: [["چرا نمی‌توانند بیرون بازی کنند؟", ["باران می‌آید", "شب است", "سرما خورده‌اند"], "باران می‌آید"], ["با صندلی‌ها چه ساختند؟", ["یک خانه کوچک", "یک ماشین", "یک قایق"], "یک خانه کوچک"]] }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p4", subject: "english", level: "sapling", objectives: ["english.sap.4", "english.sap.5"],
    needs: ["english-sapling-28"], lessons: pick("sapling", [28, 47, 48, 49, 57, 60]), emoji: "📚", title: "قصه‌ها و متن‌های کوتاه",
    words: { read: "این متن را بخوان و جواب بده" },
    make: function (rng, n, ctx) {
      var texts = SAP_TEXTS.filter(function (t) { return ctx.done(t.after); });
      var items = [];
      texts.forEach(function (t) { t.qs.forEach(function (q, i) { items.push({ key: t.key + i, t: t, q: q }); }); });
      // Two texts at most in a session, so there is not too much to read.
      var keep = {}, k = 0;
      return deal(rng, Math.min(n, 4), ctx, items, function (it) { return it.key; }, function (it) {
        if (!keep[it.t.key]) { if (k >= 2) return null; keep[it.t.key] = true; k++; }
        var pic = /^\p{Extended_Pictographic}/u.test(it.q[2]);
        return { type: "passage", prompt: ctx.w("read"), text: it.t.text, question: it.q[0], options: rng.shuffle(it.q[1]), answer: it.q[2], pic: pic };
      });
    }
  });

  /* Word bank (Movers) — english-sapling-p5. The Sapling words and phrases with their pictures: hear and tap, read
     and tap. */
  B.PRACTICE.push({
    id: "english-sapling-p5", subject: "english", level: "sapling", objectives: ["english.sap.8", "english.sap.18"],
    needs: ["english-sapling-18"], lessons: pick("sapling", [18, 37, 39, 40, 41, 42, 43, 44, 45, 59]), emoji: "🗂️", title: "کلمه‌های نهال",
    words: { hear: "گوش کن. کدام تصویر است؟", read: "بخوان. تصویرش کدام است؟" },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "sapling", { only: true, phrases: true }).filter(function (w) { return !/day$|^[A-Z]/.test(w.en); });
      if (bank.length < 3) return [];
      return deal(rng, n, ctx, bank, function (w) { return w.en; }, function (w) {
        var opts = rng.shuffle([w].concat(others(rng, bank, w, 2)));
        if (rng() < 0.5) return { type: "listen", say: w.en, prompt: ctx.w("hear"), options: opts.map(face), answer: valueOf(w) };
        return { type: "listen", show: w.en, prompt: ctx.w("read"), options: opts.map(function (x) { var f = face(x); delete f.en; return f; }), answer: valueOf(w) };
      });
    }
  });

  /* Clocks and calendars — english-sapling-p6. Times (o'clock and half past, english-sapling-23) heard and matched
     to a clock, or set on a clock; the days of the week (english-sapling-24) and the months (english-sapling-25):
     what comes next, put in order. */
  var CLOCKS = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"], HALF = ["🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"];
  var HOURS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  B.PRACTICE.push({
    id: "english-sapling-p6", subject: "english", level: "sapling", objectives: ["english.sap.16"],
    needs: ["english-sapling-23"], lessons: pick("sapling", [23, 24, 25, 26, 27, 29]), emoji: "⏰", title: "ساعت و تقویم",
    words: { time: "گوش کن. کدام ساعت؟", set: "گوش کن و عقربه‌ها را روی همین ساعت بگذار: {say}", next: "گوش کن. بعد از {x} کدام می‌آید؟",
      days: "روزهای هفته را به ترتیب بچین", months: "این ماه‌ها را به ترتیب بچین" },
    make: function (rng, n, ctx) {
      var items = [];
      for (var h = 0; h < 12; h++) { items.push({ key: "t" + (h + 1), h: h, half: false }); items.push({ key: "t" + (h + 1) + "h", h: h, half: true }); }
      if (ctx.done("english-sapling-24")) { DAYS.forEach(function (d, i) { items.push({ key: "d:" + d, list: DAYS, i: i }); }); items.push({ key: "days", order: DAYS }); }
      if (ctx.done("english-sapling-25")) { MONTHS.forEach(function (m, i) { items.push({ key: "m:" + m, list: MONTHS, i: i }); }); items.push({ key: "months", order: MONTHS }); }
      var sets = 0, orders = 0;
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if (it.order) {
          if (orders++) return null;
          var start = rng.int(0, it.order.length - 4), part = it.order.slice(start, start + 4);
          return { type: "order", prompt: ctx.w(it.order === DAYS ? "days" : "months"), ltr: true, items: part };
        }
        if (it.list) {
          var next = it.list[(it.i + 1) % it.list.length];
          var no = rng.sample(it.list.filter(function (x, j) { return j !== it.i && x !== next; }), 2);
          return { type: "listen", say: "What comes after " + it.list[it.i] + "?", prompt: ctx.w("next", { x: it.list[it.i] }), options: rng.shuffle([next].concat(no)).map(function (x) { return { label: x, en: x }; }), answer: next };
        }
        var say = it.half ? "It's half past " + HOURS[it.h] + "." : "It's " + HOURS[it.h] + " o'clock.";
        if (!sets && rng() < 0.25) { sets++; return { type: "clock", time: (it.h + 1) + (it.half ? ":30" : ":00"), say: say, prompt: ctx.w("set", { say: say }) }; }
        var pics = it.half ? HALF : CLOCKS, right = pics[it.h];
        var no2 = [(it.half ? CLOCKS : HALF)[it.h], pics[(it.h + rng.int(2, 9)) % 12]];
        return { type: "listen", say: say, prompt: ctx.w("time"), options: rng.shuffle([right].concat(no2)).map(function (p) { return { pic: p }; }), answer: right };
      });
    }
  });

  /* Dialogue bank — english-sapling-p7. Short dialogues heard, with a picture or an answer to choose. */
  var DIALOGUES = [
    { after: "english-sapling-46", say: "Where's my bag? It's under the chair.", q: "کیف کجاست؟", o: [{ pic: "🎒", ref: "🪑", where: "under", en: "under the chair" }, { pic: "🎒", ref: "🪑", where: "on", en: "on the chair" }, { pic: "🎒", ref: "📦", where: "in", en: "in the box" }], a: "under" },
    { after: "english-sapling-46", say: "What would you like? Some orange juice, please.", q: "چه می‌خواهد؟", o: [{ pic: "🧃", en: "orange juice" }, { pic: "🥛", en: "milk" }, { pic: "🍵", en: "tea" }], a: "🧃" },
    { after: "english-sapling-46", say: "How old is your brother? He's six.", q: "برادرش چند سال دارد؟", o: [{ label: "6", en: "six", value: "6" }, { label: "7", en: "seven", value: "7" }, { label: "16", en: "sixteen", value: "16" }], a: "6" },
    { after: "english-sapling-46", say: "What's the weather like? It's cold and snowy.", q: "هوا چطور است؟", o: [{ pic: "❄️", en: "snowy" }, { pic: "☀️", en: "sunny" }, { pic: "🌧️", en: "rainy" }], a: "❄️" },
    { after: "english-sapling-46", say: "What's your favourite animal? I love horses.", q: "حیوان محبوبش چیست؟", o: [{ pic: "🐴", en: "horses" }, { pic: "🐶", en: "dogs" }, { pic: "🐱", en: "cats" }], a: "🐴" },
    { after: "english-sapling-46", say: "Can you swim? No, I can't, but I can ride a bike.", q: "چه کاری بلد است؟", o: [{ pic: "🚲", en: "ride a bike" }, { pic: "🏊", en: "swim" }, { pic: "🎹", en: "play the piano" }], a: "🚲" },
    { after: "english-sapling-46", say: "What time is it? It's half past three.", q: "ساعت چند است؟", o: [{ pic: "🕞", en: "half past three" }, { pic: "🕒", en: "three o'clock" }, { pic: "🕟", en: "half past four" }], a: "🕞" },
    { after: "english-sapling-52", say: "Who's that? That's my aunt. She's a doctor.", q: "عمه‌اش چه کاره است؟", o: [{ pic: "👩‍⚕️", en: "a doctor" }, { pic: "👩‍🏫", en: "a teacher" }, { pic: "👩‍🍳", en: "a cook" }], a: "👩‍⚕️" },
    { after: "english-sapling-52", say: "Where are you going? I'm going to the library.", q: "کجا می‌رود؟", o: [{ pic: "📚", en: "the library" }, { pic: "🏥", en: "the hospital" }, { pic: "🏪", en: "the shop" }], a: "📚" },
    { after: "english-sapling-53", say: "Hi, I'm Lily. I'm from England. Where are you from? I'm from Iran.", q: "لیلی اهل کجاست؟", o: [{ label: "England", en: "England" }, { label: "Iran", en: "Iran" }, { label: "India", en: "India" }], a: "England" },
    { after: "english-sapling-53", say: "When's your birthday? It's in October.", q: "تولدش کدام ماه است؟", o: [{ label: "October", en: "October" }, { label: "August", en: "August" }, { label: "April", en: "April" }], a: "October" },
    { after: "english-sapling-53", say: "What's the matter? I've got a headache.", q: "چه مشکلی دارد؟", o: [{ pic: "🤕", en: "a headache" }, { pic: "🦷", en: "a toothache" }, { pic: "🤧", en: "a cold" }], a: "🤕" }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p7", subject: "english", level: "sapling", objectives: ["english.sap.14", "english.sap.15", "english.sap.17"],
    needs: ["english-sapling-46"], lessons: pick("sapling", [46, 52, 53, 57, 60]), emoji: "🎧", title: "گفت‌وگو گوش کن",
    words: { prompt: "به گفت‌وگو گوش کن. {q}" },
    make: function (rng, n, ctx) {
      var list = DIALOGUES.filter(function (d) { return ctx.done(d.after); });
      return deal(rng, n, ctx, list, function (d) { return d.say; }, function (d) {
        return { type: "listen", say: d.say, prompt: ctx.w("prompt", { q: d.q }), options: rng.shuffle(d.o), answer: d.a };
      });
    }
  });

  /* ================= More kinds of practice for every lesson (Seed, Sprout, Sapling) ================= */

  // What a theme lesson is about, as a picture for a basket (the Seed lessons whose `words` steps are a theme).
  var THEME_PIC = { "english-seed-4": "🐾", "english-seed-5": "👪", "english-seed-6": "🧍", "english-seed-7": "🍽️", "english-seed-19": "🧸",
    "english-seed-21": "👚", "english-seed-23": "🏠", "english-seed-24": "🙂", "english-seed-28": "🌦️", "english-seed-30": "🏃",
    "english-seed-32": "🏫", "english-seed-35": "🌳" };
  // Words with a picture of their own (no colours, numbers or phrases), by theme.
  function picThemes(bank) {
    var by = {};
    bank.forEach(function (w) { if (w.pic && THEME_PIC[w.theme]) (by[w.theme] = by[w.theme] || []).push(w); });
    return by;
  }
  var SPEAKERS = ["🔈", "🔉", "🔊"];

  /* Memory pairs — english-seed-p5. Face-down cards that say their word: find the pairs. */
  B.PRACTICE.push({
    id: "english-seed-p5", subject: "english", level: "seed", objectives: ["english.seed.3"],
    needs: ["english-seed-1"], lessons: path("seed"), emoji: "🃏", title: "کارت‌های جفت",
    words: { prompt: "کارت‌ها را برگردان. هر کارت اسمش را می‌گوید. جفت‌ها را پیدا کن و تو هم اسمشان را بگو." },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "seed", { talk: true }).filter(function (w) { return w.pic; });
      if (bank.length < 3) return [];
      var now = latest(ctx), mine = bank.filter(function (w) { return w.theme === now; });
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        // The first game uses this lesson's words when it has three or more.
        var from = i === 0 && mine.length >= 3 ? mine : bank, k = Math.min(from.length, bank.length >= 8 ? 4 : 3);
        var cards = rng.sample(from, k);
        var key = "m:" + cards.map(function (w) { return w.en; }).sort().join(",");
        if (out.some(function (s) { return s.key === key; })) continue;
        out.push(en({ type: "pairs", hidden: true, key: key, prompt: ctx.w("prompt"), pairs: cards.map(function (w) { return [{ pic: w.pic, say: w.en }, { pic: w.pic, say: w.en }]; }) }));
      }
      return out;
    }
  });

  /* Odd one out — english-seed-p6. Three pictures of one theme and one of another: which one does not belong? */
  B.PRACTICE.push({
    id: "english-seed-p6", subject: "english", level: "seed", objectives: ["english.seed.3"],
    needs: ["english-seed-5"], lessons: path("seed", "english-seed-5"), emoji: "🔎", title: "کدام جور نیست؟",
    words: { prompt: "روی هر تصویر بزن و گوش کن. کدام با بقیه جور نیست؟" },
    make: function (rng, n, ctx) {
      var by = picThemes(wordBank(ctx, "seed")), themes = Object.keys(by).filter(function (t) { return by[t].length >= 3; });
      if (themes.length < 2) return [];
      var now = latest(ctx), items = [];
      themes.forEach(function (t) { by[t].forEach(function (w) { items.push({ key: "o:" + t + ":" + w.en, theme: t, keep: w }); }); });
      var used = {};
      return deal(rng, n, ctx, items, function (it) { return it.key; }, function (it) {
        if (used[it.theme]) return null;
        used[it.theme] = true;
        var three = [it.keep].concat(rng.sample(by[it.theme].filter(function (w) { return w !== it.keep; }), 2));
        var odd = rng.pick(by[rng.pick(themes.filter(function (t) { return t !== it.theme; }))]);
        return { type: "listen", prompt: ctx.w("prompt"), options: rng.shuffle(three.concat([odd])).map(face), answer: odd.pic };
      });
    }
  });

  /* Say it, then check — english-seed-p7. A picture: the child says its word aloud, then hears three words (sound
     buttons, no writing) and taps the right one. */
  B.PRACTICE.push({
    id: "english-seed-p7", subject: "english", level: "seed", objectives: ["english.seed.3", "english.seed.1"],
    needs: ["english-seed-1"], lessons: path("seed"), emoji: "🗣️", title: "بگو، بعد گوش کن",
    words: { prompt: "اول خودت بلند بگو این چیست. بعد روی بلندگوها بزن و گوش کن: کدام همان است که گفتی؟" },
    make: function (rng, n, ctx) {
      var bank = wordBank(ctx, "seed", { talk: true });
      if (bank.length < 3) return [];
      return deal(rng, n, ctx, bank, function (w) { return "s:" + w.en; }, function (w) {
        var opts = rng.shuffle([w].concat(others(rng, bank, w, 2)));
        var sh = face(w); delete sh.en;
        return { type: "listen", show: sh, prompt: ctx.w("prompt"), options: opts.map(function (x, i) { return { label: SPEAKERS[i], en: x.en, value: x.en }; }), answer: w.en };
      });
    }
  });

  /* Sort by theme — english-seed-p8. Picture cards that say their word, into two theme baskets. */
  B.PRACTICE.push({
    id: "english-seed-p8", subject: "english", level: "seed", objectives: ["english.seed.3"],
    needs: ["english-seed-5"], lessons: path("seed", "english-seed-5"), emoji: "🧺", title: "هر کدام در سبد خودش",
    words: { prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد درست بگذار." },
    make: function (rng, n, ctx) {
      var by = picThemes(wordBank(ctx, "seed")), themes = Object.keys(by).filter(function (t) { return by[t].length >= 2; });
      if (themes.length < 2) return [];
      var now = latest(ctx), out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var first = i === 0 && by[now] && by[now].length >= 2 ? now : rng.pick(themes);
        var second = rng.pick(themes.filter(function (t) { return t !== first; }));
        var key = "t:" + [first, second].sort().join("+");
        if (out.some(function (s) { return s.key === key; })) continue;
        var items = [];
        [first, second].forEach(function (t) { rng.sample(by[t], Math.min(3, by[t].length)).forEach(function (w) { items.push({ pic: w.pic, say: w.en, basket: t }); }); });
        out.push(en({ type: "sort", key: key, prompt: ctx.w("prompt"), baskets: [first, second].map(function (t) { return { pic: THEME_PIC[t], value: t }; }), items: rng.shuffle(items) }));
      }
      return out;
    }
  });

  /* What do you say? — english-seed-p9. Everyday moments: hear what someone says and tap the moment, or see the
     moment and choose (by ear) what to say. Greetings after english-seed-1 and english-seed-9, please and thank you
     after english-seed-17, feelings after english-seed-24. */
  var MOMENTS = [
    { after: "english-seed-1", say: "Good morning!", pic: "☀️🛏️" }, { after: "english-seed-1", say: "Good night!", pic: "🌙🛏️" },
    { after: "english-seed-1", say: "Hello!", pic: "🙂👋" }, { after: "english-seed-1", say: "Goodbye!", pic: "🚪👋" },
    { after: "english-seed-1", say: "Thank you!", pic: "🎁" }, { after: "english-seed-9", say: "I'm fine, thank you!", pic: "😊👍" },
    { after: "english-seed-17", say: "Yes, please!", pic: "🍰😋" }, { after: "english-seed-17", say: "No, thank you.", pic: "🍰🙅" },
    { after: "english-seed-17", say: "Water, please.", pic: "💧🙏" }, { after: "english-seed-24", say: "I'm happy.", pic: "😊" },
    { after: "english-seed-24", say: "I'm sad.", pic: "😢" }, { after: "english-seed-24", say: "I'm tired.", pic: "😴" },
    { after: "english-seed-24", say: "I'm hungry.", pic: "😋🍽️" }
  ];
  B.PRACTICE.push({
    id: "english-seed-p9", subject: "english", level: "seed", objectives: ["english.seed.1", "english.seed.7", "english.seed.12"],
    needs: ["english-seed-1"], lessons: pick("seed", [1, 9, 17, 24, 15, 26, 36, 40]), emoji: "👋", title: "چه می‌گویی؟",
    words: { hear: "گوش کن. این را کی می‌گوییم؟", say: "به تصویر نگاه کن. اینجا چه می‌گویی؟ روی بلندگوها بزن و گوش کن." },
    make: function (rng, n, ctx) {
      var list = MOMENTS.filter(function (m) { return ctx.done(m.after); });
      if (list.length < 3) return [];
      var flip = 0;
      return deal(rng, n, ctx, list, function (m) { return m.say; }, function (m) {
        var no = rng.sample(list.filter(function (x) { return x !== m; }), 2), opts = rng.shuffle([m].concat(no));
        if (flip++ % 2) return { type: "listen", show: m.pic, prompt: ctx.w("say"), options: opts.map(function (x, i) { return { label: SPEAKERS[i], en: x.say, value: x.say }; }), answer: m.say };
        return { type: "listen", say: m.say, prompt: ctx.w("hear"), options: opts.map(function (x) { return { pic: x.pic }; }), answer: m.pic };
      });
    }
  });

  /* Little stories — english-seed-p10. Two or three short sentences heard, a question and pictures to choose. Each
     story waits for the lessons of its words. */
  var LITTLE = [
    { after: "english-seed-4", say: "Look! A cat. It's a black cat.", q: "کدام حیوان بود؟", o: ["🐱", "🐶", "🐦"], a: "🐱" },
    { after: "english-seed-5", say: "This is my grandma. She's my mother's mother.", q: "این کیست؟", o: ["👵", "👴", "👧"], a: "👵" },
    { after: "english-seed-7", say: "Mina is hungry. She eats an apple. Yum!", q: "مینا چه خورد؟", o: ["🍎", "🍞", "🧀"], a: "🍎" },
    { after: "english-seed-7", say: "Reza drinks milk. Mina drinks water.", q: "رضا چه نوشید؟", o: ["🥛", "💧", "🧃"], a: "🥛" },
    { after: "english-seed-19", say: "This is my kite. It's red and yellow. I love my kite!", q: "اسباب‌بازی‌اش چیست؟", o: ["🪁", "⚽", "🚗"], a: "🪁" },
    { after: "english-seed-21", say: "It's cold. Arman puts on his coat and his hat.", q: "آرمان چه پوشید؟", o: ["🧥👒", "👗", "🧦"], a: "🧥👒" },
    { after: "english-seed-25", say: "Where is the cat? Not in the box. Not on the bed. It's under the chair!", q: "گربه کجا بود؟",
      o: [{ pic: "🐱", ref: "🪑", where: "under", value: "under" }, { pic: "🐱", ref: "📦", where: "in", value: "in" }, { pic: "🐱", ref: "🛏️", where: "on", value: "on" }], a: "under" },
    { after: "english-seed-28", say: "It's rainy today. Sara has got her umbrella.", q: "هوا چطور است؟", o: ["🌧️", "☀️", "❄️"], a: "🌧️" },
    { after: "english-seed-33", say: "The bear is hungry. He looks and looks. He finds some honey. Yum!", q: "خرس چه پیدا کرد؟", o: ["🍯", "🍎", "🐟"], a: "🍯" },
    { after: "english-seed-35", say: "In the park there is a big tree. A bird sings in the tree.", q: "پرنده کجا آواز می‌خواند؟", o: ["🌳", "🏠", "🚗"], a: "🌳" },
    { after: "english-seed-39", say: "In the morning, Sara gets up and says: Good morning, Mum!", q: "کی بود؟", o: ["☀️", "🌙"], a: "☀️" },
    { after: "english-seed-39", say: "At night, Sara is tired. She says: Good night! and goes to bed.", q: "سارا چه حالی داشت؟", o: ["😴", "😊", "😠"], a: "😴" }
  ];
  B.PRACTICE.push({
    id: "english-seed-p10", subject: "english", level: "seed", objectives: ["english.seed.11", "english.seed.6"],
    needs: ["english-seed-4"], lessons: pick("seed", [4, 5, 7, 8, 15, 19, 21, 25, 26, 28, 33, 35, 39, 40]), emoji: "📖", title: "قصه‌های کوچولو",
    words: { prompt: "به قصه گوش کن. {q}" },
    make: function (rng, n, ctx) {
      var list = LITTLE.filter(function (x) { return ctx.done(x.after); });
      return deal(rng, Math.min(n, 3), ctx, list, function (x) { return x.say; }, function (x) {
        return { type: "listen", say: x.say, prompt: ctx.w("prompt", { q: x.q }), options: rng.shuffle(x.o.map(function (o) { return typeof o === "object" ? o : { pic: o }; })), answer: x.a };
      });
    }
  });

  /* ---------- Sprout ---------- */
  // Pictures by the sound a word starts with (not only decodable words: the child only hears them).
  var FIRSTPIC = {
    s: [["sun", "☀️"], ["sock", "🧦"], ["snake", "🐍"], ["six", "6️⃣"]], a: [["apple", "🍎"], ["ant", "🐜"]], t: [["tiger", "🐯"], ["tap", "🚰"], ["ten", "🔟"]],
    p: [["pig", "🐷"], ["pen", "🖊️"], ["pizza", "🍕"]], i: [["insect", "🐛"], ["ink", "🖋️"]], n: [["nose", "👃"], ["nest", "🪺"], ["nine", "9️⃣"]],
    m: [["moon", "🌙"], ["milk", "🥛"], ["mouse", "🐭"]], d: [["dog", "🐶"], ["duck", "🦆"], ["door", "🚪"]], g: [["goat", "🐐"], ["girl", "👧"], ["grapes", "🍇"]],
    o: [["octopus", "🐙"], ["orange", "🍊"]], c: [["cat", "🐱"], ["cup", "☕"], ["car", "🚗"]], k: [["kite", "🪁"], ["king", "🤴"], ["key", "🔑"]],
    e: [["egg", "🥚"], ["elephant", "🐘"]], u: [["umbrella", "☂️"], ["up", "⬆️"]], r: [["rabbit", "🐇"], ["ring", "💍"], ["rain", "🌧️"]],
    h: [["hat", "👒"], ["hen", "🐔"], ["house", "🏠"]], b: [["bed", "🛏️"], ["ball", "⚽"], ["bus", "🚌"]], f: [["fish", "🐟"], ["fox", "🦊"], ["frog", "🐸"]],
    l: [["lion", "🦁"], ["leg", "🦵"], ["leaf", "🍃"]], j: [["jam", "🍯"], ["jeans", "👖"]], v: [["van", "🚐"], ["violin", "🎻"]],
    w: [["web", "🕸️"], ["window", "🪟"], ["watch", "⌚"]], y: [["yo-yo", "🪀"], ["yellow", "🟨"]], z: [["zebra", "🦓"], ["zip", "🤐"]],
    qu: [["queen", "👸"]], sh: [["ship", "🚢"], ["sheep", "🐑"], ["shoe", "👟"]], ch: [["chick", "🐥"], ["cheese", "🧀"], ["chair", "🪑"]], th: [["thumb", "👍"], ["three", "3️⃣"]]
  };
  // The letters a lesson teaches (its `letter` steps): its items come first.
  function lessonLetters(id) {
    var l = (B.LESSONS || []).find(function (x) { return x.id === id; }), g = [];
    if (l) l.steps.forEach(function (s) { if (s.type === "letter") g.push(s.letter); });
    return g;
  }
  function letterList(ctx, min) {
    var g = taught(ctx), mine = lessonLetters(latest(ctx));
    return Object.keys(g).filter(function (x) { return FIRSTPIC[x] && FIRSTPIC[x].length >= (min || 1); })
      .map(function (x) { return { l: x, now: mine.indexOf(x) >= 0 }; });
  }

  /* First letters — english-sprout-p8. Pictures that say their word, sorted by the letter they start with. */
  B.PRACTICE.push({
    id: "english-sprout-p8", subject: "english", level: "sprout", objectives: ["english.spr.1"],
    needs: ["english-sprout-1"], lessons: path("sprout"), emoji: "🧺", title: "حرف اول",
    words: { prompt: "روی هر تصویر بزن و گوش کن. با کدام حرف شروع می‌شود؟ در سبد همان حرف بگذار." },
    make: function (rng, n, ctx) {
      var ls = letterList(ctx, 2);
      if (ls.length < 2) return [];
      var out = [];
      for (var i = 0; i < Math.min(n, 2); i++) {
        var nows = ls.filter(function (x) { return x.now; }), k = ls.length >= 3 && i ? 3 : 2;
        var chosen = (i === 0 && nows.length ? [rng.pick(nows)] : []);
        rng.shuffle(ls).forEach(function (x) { if (chosen.length < k && chosen.indexOf(x) < 0) chosen.push(x); });
        var key = "fl:" + chosen.map(function (x) { return x.l; }).sort().join("");
        if (out.some(function (s) { return s.key === key; })) continue;
        var items = [];
        chosen.forEach(function (x) { rng.sample(FIRSTPIC[x.l], 2).forEach(function (w) { items.push({ pic: w[1], say: w[0], basket: x.l }); }); });
        out.push(en({ type: "sort", key: key, prompt: ctx.w("prompt"), baskets: chosen.map(function (x) { return { label: x.l }; }), items: rng.shuffle(items) }));
      }
      return out;
    }
  });

  /* Letter match — english-sprout-p9. Each letter with a picture whose word starts with its sound, and after
     english-sprout-7 each capital with its small letter (pairs). */
  B.PRACTICE.push({
    id: "english-sprout-p9", subject: "english", level: "sprout", objectives: ["english.spr.1", "english.spr.15"],
    needs: ["english-sprout-1"], lessons: path("sprout"), emoji: "🔡", title: "جفت حرف‌ها",
    words: { pic: "هر حرف را با تصویری جفت کن که با صدای آن شروع می‌شود", caps: "هر حرف بزرگ را با حرف کوچکش جفت کن" },
    make: function (rng, n, ctx) {
      var ls = letterList(ctx, 1).filter(function (x) { return x.l.length === 1 || x.l === "sh" || x.l === "ch" || x.l === "th"; });
      if (ls.length < 3) return [];
      var out = [], kinds = ["pic"].concat(ctx.done("english-sprout-7") ? ["caps"] : []);
      for (var i = 0; i < Math.min(n, 2); i++) {
        var kind = kinds[i % kinds.length], nows = ls.filter(function (x) { return x.now; });
        var chosen = nows.slice(0, 2);
        rng.shuffle(ls).forEach(function (x) { if (chosen.length < 4 && chosen.indexOf(x) < 0) chosen.push(x); });
        if (kind === "caps") chosen = chosen.filter(function (x) { return x.l.length === 1; });
        if (chosen.length < 3) continue;
        var key = kind + ":" + chosen.map(function (x) { return x.l; }).sort().join("");
        out.push(en({ type: "pairs", key: key, prompt: ctx.w(kind), pairs: chosen.map(function (x) {
          if (kind === "caps") return [{ label: x.l.toUpperCase() }, { label: x.l }];
          var w = rng.pick(FIRSTPIC[x.l]);
          return [{ label: x.l }, { pic: w[1], say: w[0] }];
        }) }));
      }
      return out;
    }
  });

  /* Word and picture — english-sprout-p10. Words the child can read (decodable ones, and the Starters words of the
     lessons done) matched to their pictures (pairs), and the odd word out of a theme. */
  B.PRACTICE.push({
    id: "english-sprout-p10", subject: "english", level: "sprout", objectives: ["english.spr.2", "english.spr.11"],
    needs: ["english-sprout-13"], lessons: path("sprout", "english-sprout-13"), emoji: "🖇️", title: "کلمه و تصویر",
    words: { pairs: "هر کلمه را بخوان و با تصویرش جفت کن", odd: "این کلمه‌ها را بخوان. کدام با بقیه جور نیست؟" },
    make: function (rng, n, ctx) {
      var words = decodableWords(ctx).map(function (w) { return { en: w.w, pic: w.pic }; });
      var bank = wordBank(ctx, "sprout", { only: true }).filter(function (w) { return w.pic && !/^\d/.test(w.pic); });
      var all = words.concat(bank.filter(function (w) { return !words.some(function (x) { return x.en === w.en || x.pic === w.pic; }); }));
      if (all.length < 3) return [];
      var out = [], now = latest(ctx), mine = bank.filter(function (w) { return w.theme === now; });
      for (var i = 0; i < Math.min(n, 2); i++) {
        var from = i === 0 && mine.length >= 3 ? mine : all, cards = rng.sample(from, Math.min(4, from.length));
        var key = "wp:" + cards.map(function (w) { return w.en; }).sort().join(",");
        if (out.some(function (s) { return s.key === key; })) continue;
        out.push(en({ type: "pairs", key: key, prompt: ctx.w("pairs"), pairs: cards.map(function (w) { return [{ label: w.en, say: w.en }, { pic: w.pic, say: w.en }]; }) }));
      }
      // The odd one out of a theme (three words of one Sprout theme and one of another), once there are two themes.
      var by = {};
      bank.forEach(function (w) { (by[w.theme] = by[w.theme] || []).push(w); });
      var themes = Object.keys(by).filter(function (t) { return by[t].length >= 3; });
      if (themes.length >= 2 && out.length < n) {
        var t = by[now] && by[now].length >= 3 ? now : rng.pick(themes), three = rng.sample(by[t], 3);
        var odd = rng.pick(by[rng.pick(themes.filter(function (x) { return x !== t; }))]);
        out.push(en({ type: "listen", key: "odd:" + odd.en, prompt: ctx.w("odd"), options: rng.shuffle(three.concat([odd])).map(function (w) { return { label: w.en, value: w.en }; }), answer: odd.en }));
      }
      return out;
    }
  });

  /* ---------- Sapling ---------- */

  /* Questions and answers — english-sapling-p8. A question heard: choose the answer that fits (the others answer
     other questions). Each question waits for the lesson that teaches it. */
  var QS = [
    { after: "english-sapling-2", q: "What's your name?", a: "My name's Sara." }, { after: "english-sapling-2", q: "How old are you?", a: "I'm nine." },
    { after: "english-sapling-2", q: "How are you?", a: "I'm fine, thank you." }, { after: "english-sapling-10", q: "Is he your brother?", a: "Yes, he is." },
    { after: "english-sapling-10", q: "Are you hungry?", a: "No, I'm not." }, { after: "english-sapling-6", q: "Where's the cat?", a: "It's under the bed." },
    { after: "english-sapling-13", q: "Do you like grapes?", a: "Yes, I do." }, { after: "english-sapling-17", q: "Is there a park near your house?", a: "Yes, there is." },
    { after: "english-sapling-23", q: "What time is it?", a: "It's half past two." }, { after: "english-sapling-25", q: "When's your birthday?", a: "It's in May." },
    { after: "english-sapling-27", q: "Does she play the piano?", a: "Yes, she does." }, { after: "english-sapling-31", q: "What are you doing?", a: "I'm reading a book." },
    { after: "english-sapling-34", q: "Can you ride a bike?", a: "Yes, I can." }, { after: "english-sapling-36", q: "Whose bag is this?", a: "It's Reza's." },
    { after: "english-sapling-37", q: "What does your dad look like?", a: "He's tall and he's got glasses." }, { after: "english-sapling-41", q: "What's the weather like?", a: "It's sunny and hot." },
    { after: "english-sapling-42", q: "What's the matter?", a: "I've got a headache." }, { after: "english-sapling-52", q: "Where do you live?", a: "I live in Tabriz." },
    { after: "english-sapling-53", q: "Where are you from?", a: "I'm from Iran." }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p8", subject: "english", level: "sapling", objectives: ["english.sap.14", "english.sap.9", "english.sap.10"],
    needs: ["english-sapling-2"], lessons: path("sapling", "english-sapling-2"), emoji: "🙋", title: "سؤال و جواب",
    words: { prompt: "به سؤال گوش کن. کدام جواب درست است؟" },
    make: function (rng, n, ctx) {
      var list = QS.filter(function (x) { return ctx.done(x.after); });
      if (list.length < 3) return [];
      return deal(rng, n, ctx, list, function (x) { return x.q; }, function (x) {
        var no = rng.sample(list.filter(function (y) { return y !== x; }), 2).map(function (y) { return y.a; });
        return { type: "listen", say: x.q, show: x.q, prompt: ctx.w("prompt"), options: rng.shuffle([x.a].concat(no)).map(function (a) { return { label: a, en: a }; }), answer: x.a };
      });
    }
  });

  /* Spell it — english-sapling-p9. A picture and its word said: build it from letter tiles, with one that does not
     belong. Words of the Sprout sounds, the spellings taught in Sapling (english-sapling-p1's list) and the endings. */
  B.PRACTICE.push({
    id: "english-sapling-p9", subject: "english", level: "sapling", objectives: ["english.sap.3", "english.sap.1"],
    needs: ["english-sapling-1"], lessons: path("sapling"), emoji: "🔤", title: "بنویس، حرف به حرف",
    words: { prompt: "گوش کن و کلمه را حرف به حرف بساز." },
    make: function (rng, n, ctx) {
      var g = spellings(ctx), list = decodableWords(ctx).map(function (w) { return { w: w.w, pic: w.pic }; });
      SOUNDS.forEach(function (grp) { grp.words.forEach(function (w) { if (g[w[2]] && !list.some(function (x) { return x.w === w[0]; })) list.push({ w: w[0], pic: w[1], now: (lessonLetters(latest(ctx)).indexOf(w[2]) >= 0) }); }); });
      ENDINGS.forEach(function (e) { if (ctx.done(e.after) && e.form.length <= 8) list.push({ w: e.form, pic: e.show, after: e.after }); });
      var abc = "abcdefghijklmnoprstuvwy";
      return deal(rng, n, ctx, list, function (x) { return "sp:" + x.w; }, function (x) {
        var letters = x.w.split(""), extra = rng.pick(abc.split("").filter(function (c) { return letters.indexOf(c) < 0; }));
        return { type: "build", word: x.w, parts: letters, extra: [extra], pic: x.pic, say: x.w, prompt: ctx.w("prompt") };
      });
    }
  });

  /* Find the mistake — english-sapling-p10. Three sentences, one with a mistake: which one is wrong? Each set of
     sentences waits for the lesson that teaches its point. */
  var MISTAKES = [
    { after: "english-sapling-1", wrong: "i can see a dog.", ok: ["I can see a cat.", "I can see a red bus."] },
    { after: "english-sapling-1", wrong: "I can see a big tree", ok: ["I can see a bird.", "I can see the sun."] },
    { after: "english-sapling-9", wrong: "She are happy.", ok: ["I am happy.", "They are happy."] },
    { after: "english-sapling-9", wrong: "We is at home.", ok: ["We are at home.", "He is at home."] },
    { after: "english-sapling-10", wrong: "Is he your brother.", ok: ["Is he your brother?", "He is my brother."] },
    { after: "english-sapling-5", wrong: "I have got two cat.", ok: ["I have got two cats.", "I have got one cat."] },
    { after: "english-sapling-16", wrong: "There are three boxs.", ok: ["There are three boxes.", "There are two babies."] },
    { after: "english-sapling-17", wrong: "There are a book on the table.", ok: ["There is a book on the table.", "There are two books on the table."] },
    { after: "english-sapling-27", wrong: "She play football.", ok: ["She plays football.", "I play football."] },
    { after: "english-sapling-27", wrong: "He don't like milk.", ok: ["He doesn't like milk.", "I don't like milk."] },
    { after: "english-sapling-31", wrong: "I reading a book.", ok: ["I'm reading a book.", "She's reading a book."] },
    { after: "english-sapling-34", wrong: "He cans swim.", ok: ["He can swim.", "They can swim."] },
    { after: "english-sapling-38", wrong: "I've got a apple.", ok: ["I've got an apple.", "I've got a banana."] },
    { after: "english-sapling-36", wrong: "This is Reza bag.", ok: ["This is Reza's bag.", "This is my bag."] },
    { after: "english-sapling-22", wrong: "where is my pen?", ok: ["Where is my pen?", "My pen is on the desk."] },
    { after: "english-sapling-52", wrong: "Where you live?", ok: ["Where do you live?", "What do you like?"] }
  ];
  B.PRACTICE.push({
    id: "english-sapling-p10", subject: "english", level: "sapling", objectives: ["english.sap.6", "english.sap.9", "english.sap.13"],
    needs: ["english-sapling-1"], lessons: path("sapling"), emoji: "🕵️", title: "اشتباه را پیدا کن",
    words: { prompt: "هر سه جمله را بخوان. کدام یکی اشتباه دارد؟" },
    make: function (rng, n, ctx) {
      var list = MISTAKES.filter(function (x) { return ctx.done(x.after); });
      return deal(rng, Math.min(n, 4), ctx, list, function (x) { return x.wrong; }, function (x) {
        return { type: "listen", prompt: ctx.w("prompt"), options: rng.shuffle([x.wrong].concat(x.ok)).map(function (t) { return { label: t, en: t }; }), answer: x.wrong };
      });
    }
  });
})();
