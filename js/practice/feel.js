/* باغچه — practice generators for احساس‌های من (subject feel). The framework and the rules: js/practice.js and README.md,
   "Practice generators". English words: B.EN["<id>"].words in js/en/feel.js.
   The subject's rules hold here too (curriculum/feel.md): nothing the child says about their own feelings is right or
   wrong or kept; the check-in and the calm minute are calm steps (never scored). The games are about everyday
   situations in a story (what happened, what helps, which thought helps), never about the child's own feeling, and
   never frightening. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  // A word list → the item labels for one language (ctx.w returns the table for the session's language).
  function face(pic, label) { return { pic: pic, say: label }; }

  /* «امروز حالم…» — feel-any-p1 (Daily check-in). One `feelings` step: the child picks a face and hears a short
     line back; after worried, sad, angry or scared a calm tool the child has met is offered («می‌خواهی با هم آرام
     شویم؟»). The six feelings and «نمی‌دانم», then all 13 feelings after feel-sprout-1. Nothing is stored or scored. */
  B.PRACTICE.push({
    id: "feel-any-p1", subject: "feel", level: null, objectives: ["feel.any.2", "feel.any.3"],
    needs: ["feel-2"], lessons: ["feel-seed-1", "feel-seed-8", "feel-sprout-1", "feel-sapling-1"], emoji: "🌤️", title: "امروز حالم…",
    words: {
      replies: {
        happy: "چه خوب! ممنون که گفتی.",
        calm: "چه خوب که آرامی. ممنون که گفتی.",
        sad: "ممنون که گفتی. غمگین بودن اشکالی ندارد. شاید یک بغل یا حرف زدن با کسی که دوستش داری کمک کند.",
        angry: "ممنون که گفتی. عصبانی شدن اشکالی ندارد. اول آرام نفس بکشیم.",
        worried: "ممنون که گفتی. نگرانی حس سختی است. می‌توانی به یک بزرگ‌تر که دوستش داری بگویی.",
        scared: "ممنون که گفتی. تو تنها نیستی. به یک بزرگ‌تر که دوستش داری بگو.",
        unsure: "اشکالی ندارد. گاهی آدم نمی‌داند چه حسی دارد."
      }
    },
    make: function (rng, n, ctx) {
      var faces = ctx.done("feel-sprout-1") ? "all" : ["happy", "sad", "angry", "worried", "scared", "calm", "unsure"];
      var breath = { type: "breathe", cycles: 3 };
      var settle = ctx.done("feel-5") ? { type: "ground" } : breath;
      return [{ type: "feelings", key: "checkin", faces: faces, replies: ctx.w("replies"),
        offer: { angry: breath, worried: breath, sad: breath, scared: settle } }];
    }
  });

  /* The calm tools the child has met, as menu items (shared by the calm minute and the calm corner): flower and
     candle (feel-1), box breathing (feel-4), 5-4-3-2-1 (feel-5), shaking and the butterfly hug (feel-15), the calm
     place (feel-13), tense and let go (feel-10). */
  var CALM_WORDS = {
    ask: "کدام را دوست داری؟ یکی را انتخاب کن.",
    names: { flower: "نفس گل و شمع", box: "نفس مربعی", ground: "پنج چیز که می‌بینم", shake: "تکان دادن بدن", place: "جای امن من", relax: "سفت کن و ول کن", tell: "گفتن به یک بزرگ‌تر" },
    relax: "سفت کن و ول کن: هر جای بدنت را اول سفت می‌کنی، بعد ول می‌کنی.",
    parts: [
      { tense: "دست‌هایت را مشت کن، محکم، مثل اینکه یک لیمو را می‌فشاری.", release: "حالا ول کن. دست‌هایت نرم و آرام شدند." },
      { tense: "مثل لاک‌پشت، شانه‌هایت را بالا ببر تا نزدیک گوش‌هایت.", release: "حالا شانه‌هایت را پایین بیاور. آرام شدند." },
      { tense: "صورتت را جمع کن، مثل موشی که بینی‌اش را چین می‌دهد.", release: "حالا صورتت را ول کن. نرم و آرام شد." }
    ],
    shake: "بدنت را تکان بده:",
    shakeList: ["مثل پیشی خیس، دست‌هایت را تکان بده: تکان، تکان، تکان!", "مثل یک درخت قد بکش، بعد آرام پایین بیا.", "بغل پروانه‌ای: دست‌هایت را ضربدری روی سینه بگذار و آرام، یکی‌یکی، ده بار ضربه بزن."],
    place: "چشم‌هایت را ببند و به جای آرامت برو. آنجا چه می‌بینی؟ چه می‌شنوی؟ چه بویی می‌آید؟ سه نفس آرام بکش، بعد چشم‌هایت را باز کن.",
    tell: "پیش یک بزرگ‌تر که دوستش داری برو و بگو چه حسی داری. می‌توانی بگویی: «می‌شود کمی کنارم بمانی؟»"
  };
  function calmMenu(rng, ctx, withTell) {
    var tools = ["flower"];
    if (ctx.done("feel-4")) tools.push("box");
    if (ctx.done("feel-5")) tools.push("ground");
    if (ctx.done("feel-15")) tools.push("shake");
    if (ctx.done("feel-13")) tools.push("place");
    if (ctx.done("feel-10")) tools.push("relax");
    tools = rng.shuffle(tools);
    if (withTell) tools.push("tell");
    var names = ctx.w("names"), parts = ctx.w("parts"), rpics = ["🍋", "🐢", "🐭"];
    var steps = {
      flower: { type: "breathe", cycles: 3 },
      box: { type: "breathe", pattern: [4, 4, 4, 4], cycles: 2 },
      ground: { type: "ground" },
      shake: { type: "doit", pic: "🐈", text: ctx.w("shake"), list: ctx.w("shakeList") },
      place: { type: "doit", pic: "🏡", text: ctx.w("place") },
      relax: { type: "relax", prompt: ctx.w("relax"), parts: parts.map(function (p, i) { return { pic: rpics[i], tense: p.tense, release: p.release }; }) },
      tell: { type: "doit", pic: "💛", text: ctx.w("tell") }
    };
    var pics = { flower: "🌷", box: "🟩", ground: "👀", shake: "🐈", place: "🏡", relax: "🍋", tell: "💛" };
    return { type: "menu", key: "calm", prompt: ctx.w("ask"),
      items: tools.map(function (t) { return { pic: pics[t], label: names[t], say: names[t], step: steps[t] }; }) };
  }

  /* «یک دقیقه آرامش» — feel-any-p2 (Calm minute). A `menu` of the calm tools the child has met (in a new order each
     time): the child picks one and it plays. Never scored. */
  B.PRACTICE.push({
    id: "feel-any-p2", subject: "feel", level: null, objectives: ["feel.any.1", "feel.any.5", "feel.any.6", "feel.any.7"],
    needs: ["feel-1"], lessons: ["feel-seed-2", "feel-sprout-2", "feel-sapling-3"], emoji: "🌷", title: "یک دقیقه آرامش",
    words: CALM_WORDS,
    make: function (rng, n, ctx) { return [calmMenu(rng, ctx, false)]; }
  });

  /* «می‌خواهم آرام شوم» — feel-any-p3 (Calm corner). A button on the child's home screen (home: true), any time,
     outside lessons: the calm tools the child has met, and going to a grown-up. Never scored. */
  B.PRACTICE.push({
    id: "feel-any-p3", subject: "feel", level: null, home: true, objectives: ["feel.any.1", "feel.any.5", "feel.any.6"],
    needs: ["feel-1"], emoji: "🫧", title: "می‌خواهم آرام شوم",
    words: CALM_WORDS,
    make: function (rng, n, ctx) { return [calmMenu(rng, ctx, true)]; }
  });

  /* «صورت‌ها و قصه‌ها» — feel-seed-p1 (Face and situation bank, Seed). `pairs` rounds: a face ↔ what happened in a small
     everyday story (the six feelings); after feel-seed-4 also `sort` rounds: kind things to do, and things that upset
     someone. The key names the round's stories, so a missed round comes back. */
  var SEED_SIT = [
    ["😊", "cake"], ["😊", "gift"], ["😊", "park"], ["😊", "grandma"],
    ["😢", "balloon"], ["😢", "icecream"], ["😢", "friendgone"],
    ["😠", "tower"], ["😠", "toytaken"], ["😟", "school"], ["😟", "lostbear"],
    ["😨", "thunder"], ["😨", "bigdog"], ["😌", "story"], ["😌", "bath"], ["😊", "helped"]
  ];
  var SEED_PICS = { cake: "🎂", gift: "🎁", park: "🛝", grandma: "👵", balloon: "🎈", icecream: "🍦", friendgone: "👋", tower: "🧱", toytaken: "🚗",
    school: "🏫", lostbear: "🧸", thunder: "⛈️", bigdog: "🐕", story: "📖", bath: "🛁", helped: "🍽️" };
  var KIND = [["hug", "🤗", 1], ["help", "🤝", 1], ["share", "🍎", 1], ["wait", "⏳", 1], ["invite", "👋", 1], ["sorry", "🙇", 1],
    ["grab", "✊", 0], ["leaveout", "🚫", 0], ["laugh", "😆", 0], ["push", "💥", 0]];
  B.PRACTICE.push({
    id: "feel-seed-p1", subject: "feel", level: "seed", objectives: ["feel.seed.1", "feel.seed.4"],
    needs: ["feel-seed-1"], lessons: ["feel-seed-1", "feel-seed-4", "feel-seed-5", "feel-seed-8"], emoji: "🎭", title: "صورت‌ها و قصه‌ها",
    words: {
      pairsAsk: "هر صورت را با چیزی که شد جفت کن. هر کارت را بزن تا بشنوی.",
      sortAsk: "کدام کار مهربان است؟ هر کار را بزن تا بشنوی.",
      kind: "مهربان", hurt: "کسی ناراحت می‌شود",
      faces: { "😊": "خوشحال", "😢": "غمگین", "😠": "عصبانی", "😟": "نگران", "😨": "ترسیده", "😌": "آرام" },
      sits: {
        cake: "جشن تولدش است", gift: "یک هدیه گرفت", park: "به پارک رفتند", grandma: "مادربزرگ به خانه‌شان آمد",
        balloon: "بادکنکش رفت", icecream: "بستنی‌اش افتاد", friendgone: "دوستش به خانه‌شان رفت",
        tower: "کسی برجش را خراب کرد", toytaken: "کسی ماشینش را برداشت", school: "فردا روز اول مدرسه است", lostbear: "عروسکش را پیدا نمی‌کند",
        thunder: "صدای رعد بلند آمد", bigdog: "یک سگ بزرگ دید", story: "قصهٔ شب در رختخواب", bath: "یک حمام گرم", helped: "به مامان کمک کرد و مامان گفت «ممنون»"
      },
      acts: { hug: "بغل کردن دوست غمگین", help: "کمک برای ساختن برج", share: "قسمت کردن خوراکی", wait: "صبر کردن تا نوبتم شود",
        invite: "دعوت کردن یک بچه تنها به بازی", sorry: "گفتن «ببخشید» وقتی اشتباه کردم",
        grab: "قاپیدن اسباب‌بازی از دست کسی", leaveout: "بازی ندادن به یک بچه", laugh: "خندیدن به کسی که گریه می‌کند", push: "هل دادن در صف" }
    },
    make: function (rng, n, ctx) {
      var sits = ctx.w("sits"), faces = ctx.w("faces"), acts = ctx.w("acts"), out = [];
      var kinds = ctx.done("feel-seed-4") ? ["pairs", "sort"] : ["pairs"];
      var faceOf = {}, actOf = {};
      SEED_SIT.forEach(function (x) { faceOf[x[1]] = x[0]; });
      KIND.forEach(function (a) { actOf[a[0]] = a; });
      // Missed rounds first, rebuilt from their keys ("p:story,story,story" or "s:act,act,…").
      ctx.again.forEach(function (key) {
        if (out.length >= Math.min(n, 3)) return;
        var ids = key.slice(2).split(",");
        if (key.indexOf("p:") === 0 && ids.every(function (x) { return faceOf[x]; })) {
          out.push({ type: "pairs", key: key, prompt: ctx.w("pairsAsk"),
            pairs: rng.shuffle(ids).map(function (x) { return [face(faceOf[x], faces[faceOf[x]]), { pic: SEED_PICS[x], say: sits[x] }]; }) });
        } else if (key.indexOf("s:") === 0 && kinds.length > 1 && ids.every(function (x) { return actOf[x]; })) {
          out.push({ type: "sort", key: key, prompt: ctx.w("sortAsk"),
            baskets: [{ pic: "💚", label: ctx.w("kind"), value: "kind" }, { pic: "💔", label: ctx.w("hurt"), value: "hurt" }],
            items: rng.shuffle(ids).map(function (x) { var a = actOf[x]; return { pic: a[1], label: acts[a[0]], say: acts[a[0]], basket: a[2] ? "kind" : "hurt" }; }) });
        }
      });
      for (var i = out.length; i < Math.min(n, 3); i++) {
        var k = kinds[i % kinds.length];
        if (k === "pairs") {
          // Three different feelings, one story each.
          var byFace = {};
          rng.shuffle(SEED_SIT).forEach(function (s) { if (!byFace[s[0]]) byFace[s[0]] = s[1]; });
          var chosen = rng.sample(Object.keys(byFace), 3);
          out.push({ type: "pairs", key: "p:" + chosen.map(function (f) { return byFace[f]; }).sort().join(","), prompt: ctx.w("pairsAsk"),
            pairs: chosen.map(function (f) { return [face(f, faces[f]), { pic: SEED_PICS[byFace[f]], say: sits[byFace[f]] }]; }) });
        } else {
          var good = rng.sample(KIND.filter(function (a) { return a[2]; }), 3), bad = rng.sample(KIND.filter(function (a) { return !a[2]; }), 2);
          var items = rng.shuffle(good.concat(bad));
          out.push({ type: "sort", key: "s:" + items.map(function (a) { return a[0]; }).sort().join(","), prompt: ctx.w("sortAsk"),
            baskets: [{ pic: "💚", label: ctx.w("kind"), value: "kind" }, { pic: "💔", label: ctx.w("hurt"), value: "hurt" }],
            items: items.map(function (a) { return { pic: a[1], label: acts[a[0]], say: acts[a[0]], basket: a[2] ? "kind" : "hurt" }; }) });
        }
      }
      return out;
    }
  });

  /* «کلمه‌های حس» — feel-sprout-p1 (Feeling-word bank, Sprout). `pairs` rounds: a small story ↔ the name of its
     feeling, from the 13 feelings (the six of every garden and seven new words from feel-sprout-1). */
  var WORDS13 = ["happy", "sad", "angry", "worried", "scared", "calm", "shy", "excited", "disappointed", "jealous", "proud", "missing", "bored"];
  var WORD_SIT = {
    happy: [["🎂", "w1"], ["🛝", "w2"]], sad: [["🎈", "w3"], ["🍦", "w4"]], angry: [["🧱", "w5"], ["✏️", "w6"]], worried: [["🏫", "w7"], ["🧸", "w8"]],
    scared: [["⛈️", "w9"], ["🐕", "w10"]], calm: [["📖", "w11"], ["🌷", "w12"]], shy: [["🎤", "w13"], ["👋", "w14"]], excited: [["🧳", "w15"], ["🎁", "w16"]],
    disappointed: [["🌧️", "w17"], ["🏆", "w18"]], jealous: [["👶", "w19"], ["🚲", "w20"]], proud: [["🖼️", "w21"], ["🧩", "w22"]],
    missing: [["💌", "w23"], ["📞", "w24"]], bored: [["🕰️", "w25"], ["🛋️", "w26"]]
  };
  B.PRACTICE.push({
    id: "feel-sprout-p1", subject: "feel", level: "sprout", objectives: ["feel.spr.1"],
    needs: ["feel-sprout-1"], lessons: ["feel-sprout-1", "feel-sprout-10"], emoji: "🌈", title: "کلمه‌های حس",
    words: {
      ask: "هر قصه را با اسم حسش جفت کن. هر کارت را بزن تا بشنوی.",
      names: { happy: "خوشحال", sad: "غمگین", angry: "عصبانی", worried: "نگران", scared: "ترسیده", calm: "آرام", shy: "خجالت‌زده", excited: "هیجان‌زده",
        disappointed: "ناامید", jealous: "حسود", proud: "سربلند", missing: "دلتنگ", bored: "بی‌حوصله" },
      sits: {
        w1: "جشن تولدش است", w2: "با دوستش در پارک بازی می‌کند", w3: "بادکنکش در باد رفت", w4: "بستنی‌اش افتاد",
        w5: "کسی برجش را خراب کرد", w6: "برادرش روی نقاشی‌اش خط کشید", w7: "فردا روز اول مدرسه است", w8: "عروسکش را پیدا نمی‌کند",
        w9: "صدای رعد بلند آمد", w10: "یک سگ بزرگ نزدیکش آمد", w11: "مامان برایش قصه می‌خواند", w12: "در باغ گل‌ها را بو می‌کند",
        w13: "باید جلوی همه شعر بخواند", w14: "به یک کلاس تازه رفته و کسی را نمی‌شناسد", w15: "فردا به سفر می‌روند", w16: "منتظر است هدیه‌اش را باز کند",
        w17: "می‌خواست پارک برود، اما باران گرفت", w18: "خیلی تمرین کرد، اما در مسابقه نبرد", w19: "مامان همه‌اش بچه کوچولو را بغل می‌کند", w20: "دوستش یک دوچرخه تازه دارد و او ندارد",
        w21: "نقاشی‌اش را با زحمت تمام کرد", w22: "خودش تنهایی پازل را درست کرد",
        w23: "دوستش به شهر دیگری رفته", w24: "پدربزرگش را مدت‌هاست ندیده", w25: "کاری ندارد و وقت دیر می‌گذرد", w26: "همهٔ روز در خانه مانده و حوصله‌اش سر رفته"
      }
    },
    make: function (rng, n, ctx) {
      var names = ctx.w("names"), sits = ctx.w("sits"), out = [];
      // Missed rounds first: their key lists the stories.
      var again = ctx.again.filter(function (k) { return /^w\d/.test(k); });
      for (var i = 0; i < Math.min(n, 3); i++) {
        var list;
        if (again[i]) list = again[i].split(",").map(function (s) { var f = WORDS13.find(function (w) { return WORD_SIT[w].some(function (x) { return x[1] === s; }); }); return [f, s]; });
        else {
          // Four feelings, at least two of the seven new words.
          var news = rng.sample(WORDS13.slice(6), 2), rest = rng.sample(WORDS13.filter(function (w) { return news.indexOf(w) < 0; }), 2);
          list = news.concat(rest).map(function (w) { return [w, rng.pick(WORD_SIT[w])[1]]; });
        }
        var pic = function (w, s) { return WORD_SIT[w].find(function (x) { return x[1] === s; })[0]; };
        out.push({ type: "pairs", key: list.map(function (x) { return x[1]; }).sort().join(","), prompt: ctx.w("ask"),
          pairs: rng.shuffle(list).map(function (x) { return [{ pic: pic(x[0], x[1]), say: sits[x[1]] }, { label: names[x[0]], say: names[x[0]] }]; }) });
      }
      return out;
    }
  });

  /* «چه کار کنم؟» — feel-sprout-p2 ("What could I do?" bank). `sort` rounds: an everyday situation, then four or five
     things to do, into «کمک می‌کند» and «کمک نمی‌کند». After feel-sprout-8 also «بعدش چه می‌شود؟» rounds about choices.
     Never a frightening situation. */
  var SPR_SIT = {
    tower: { pic: "🧱", good: ["breathe", "sayIt", "rebuild", "askHelp"], bad: ["throw", "shout"] },
    lost: { pic: "✏️", good: ["look", "ask", "borrow"], bad: ["cry", "grabOther"] },
    rain: { pic: "🌧️", good: ["indoorGame", "planTomorrow", "sayIt"], bad: ["kick", "sulk"] },
    leftout: { pic: "⚽", good: ["otherGame", "otherFriend", "askLater"], bad: ["spoil", "shout"] },
    hard: { pic: "🧩", good: ["tryAgain", "breathe", "askHelp"], bad: ["giveUp", "throw"] }
  };
  var SPR_CHOICE = [["askBorrow", "🙋", 1], ["takePencil", "✊", 0], ["stayClose", "🧺", 1], ["runOff", "🏃", 0], ["waitLine", "🧍", 1], ["pushLine", "💥", 0], ["tidy", "🧹", 1], ["mock", "📢", 0]];
  B.PRACTICE.push({
    id: "feel-sprout-p2", subject: "feel", level: "sprout", objectives: ["feel.spr.2", "feel.spr.8"],
    needs: ["feel-sprout-2"], lessons: ["feel-sprout-2", "feel-sprout-3", "feel-sprout-6", "feel-sprout-8", "feel-sprout-10"], emoji: "🤔", title: "چه کار کنم؟",
    words: {
      help: "کمک می‌کند", nohelp: "کمک نمی‌کند", good: "بعدش خوب می‌شود", hurt: "بعدش کسی ناراحت می‌شود",
      choiceAsk: "بعد از هر کار چه می‌شود؟ هر کارت را بزن تا بشنوی.",
      sits: {
        tower: "برجت افتاد و خیلی ناراحتی. کدام کار کمک می‌کند؟", lost: "مدادت گم شده. کدام کار کمک می‌کند؟",
        rain: "می‌خواستی پارک بروی، اما باران گرفت. کدام کار کمک می‌کند؟", leftout: "بچه‌ها گفتند «الان نه». کدام کار کمک می‌کند؟",
        hard: "پازل خیلی سخت است. کدام کار کمک می‌کند؟"
      },
      acts: { breathe: "چند نفس آرام", sayIt: "گفتن حسم با حرف", rebuild: "دوباره ساختن", askHelp: "کمک خواستن از یک بزرگ‌تر",
        throw: "پرت کردن چیزها", shout: "داد زدن", look: "خوب گشتن", ask: "پرسیدن از دیگران", borrow: "قرض گرفتن از دوست",
        cry: "جیغ زدن و گشتن نکردن", grabOther: "برداشتن مداد دیگری بی‌اجازه", indoorGame: "پیدا کردن یک بازی در خانه",
        planTomorrow: "برنامه گذاشتن برای فردا", kick: "لگد زدن به در", sulk: "قهر کردن با همه", otherGame: "یک بازی دیگر",
        otherFriend: "بازی با یک دوست دیگر", askLater: "بعداً دوباره پرسیدن", spoil: "خراب کردن بازی آن‌ها",
        tryAgain: "دوباره امتحان کردن", giveUp: "گفتن «من هیچ‌وقت نمی‌توانم» و ول کردن",
        askBorrow: "اجازه گرفتن پیش از برداشتن مداد دوست", takePencil: "برداشتن مداد دوست بی‌اجازه", stayClose: "کنار مامان ماندن در بازار",
        runOff: "دویدن و دور شدن از مامان در بازار", waitLine: "صبر کردن در صف", pushLine: "هل دادن در صف", tidy: "جمع کردن اسباب‌بازی‌ها", mock: "مسخره کردن یک بچه" }
    },
    make: function (rng, n, ctx) {
      var w = ctx.w("acts"), sits = ctx.w("sits"), out = [];
      var gate = { hard: "feel-sprout-3", leftout: "feel-sprout-6" };
      var keys = Object.keys(SPR_SIT).filter(function (k) { return !gate[k] || ctx.done(gate[k]); });
      var again = ctx.again.filter(function (k) { return keys.indexOf(k) >= 0 || (k === "choice" && ctx.done("feel-sprout-8")); });
      var order = again.concat(rng.shuffle(keys).filter(function (k) { return again.indexOf(k) < 0; }));
      if (ctx.done("feel-sprout-8")) order.splice(1, 0, "choice");
      order.slice(0, Math.min(n, 3)).forEach(function (k) {
        if (k === "choice") {
          var items = rng.shuffle(rng.sample(SPR_CHOICE.filter(function (c) { return c[2]; }), 3).concat(rng.sample(SPR_CHOICE.filter(function (c) { return !c[2]; }), 2)));
          out.push({ type: "sort", key: "choice", prompt: ctx.w("choiceAsk"),
            baskets: [{ pic: "😊", label: ctx.w("good"), value: "good" }, { pic: "😟", label: ctx.w("hurt"), value: "hurt" }],
            items: items.map(function (c) { return { pic: c[1], label: w[c[0]], say: w[c[0]], basket: c[2] ? "good" : "hurt" }; }) });
          return;
        }
        var s = SPR_SIT[k], acts = rng.shuffle(rng.sample(s.good, 3).map(function (a) { return [a, "yes"]; }).concat(rng.sample(s.bad, 2).map(function (a) { return [a, "no"]; })));
        out.push({ type: "sort", key: k, prompt: sits[k],
          baskets: [{ pic: "💚", label: ctx.w("help"), value: "yes" }, { pic: "💔", label: ctx.w("nohelp"), value: "no" }],
          items: acts.map(function (a) { return { pic: s.pic, label: w[a[0]], say: w[a[0]], basket: a[1] }; }) });
      });
      return out;
    }
  });

  /* «یک فکر دیگر» — feel-sapling-p1 (Thought bank, Sapling). `sort` rounds: a situation and four thoughts about it,
     into «کمک می‌کند» and «حالم را بدتر می‌کند»; the child finds the more helpful thoughts. */
  var THOUGHTS = {
    wave: { pic: "👋", good: ["t1", "t2"], bad: ["t3", "t4"] }, drawing: { pic: "🖼️", good: ["t5", "t6"], bad: ["t7", "t8"] },
    laugh: { pic: "😄", good: ["t9", "t10"], bad: ["t11", "t12"] }, race: { pic: "🏆", good: ["t13", "t14"], bad: ["t15", "t16"] },
    teacher: { pic: "🧑‍🏫", good: ["t17", "t18"], bad: ["t19", "t20"] }, rainday: { pic: "🌧️", good: ["t21", "t22"], bad: ["t23", "t24"] }
  };
  B.PRACTICE.push({
    id: "feel-sapling-p1", subject: "feel", level: "sapling", objectives: ["feel.sap.2"],
    needs: ["feel-sapling-2"], lessons: ["feel-sapling-2", "feel-sapling-12"], emoji: "💭", title: "یک فکر دیگر",
    words: {
      help: "کمک می‌کند", worse: "حالم را بدتر می‌کند",
      sits: { wave: "دوستت برایت دست تکان نداد. کدام فکر کمک می‌کند؟", drawing: "نقاشی‌ات آن‌طور که می‌خواستی نشد. کدام فکر کمک می‌کند؟",
        laugh: "وقتی وارد کلاس شدی، یکی خندید. کدام فکر کمک می‌کند؟", race: "در مسابقه دو نفر آخر شدی. کدام فکر کمک می‌کند؟",
        teacher: "معلم امروز صدایت نکرد. کدام فکر کمک می‌کند؟", rainday: "باران آمد و برنامه بیرون رفتن به هم خورد. کدام فکر کمک می‌کند؟" },
      thoughts: {
        t1: "شاید مرا ندید.", t2: "می‌روم و خودم سلام می‌کنم.", t3: "حتماً از من بدش می‌آید.", t4: "هیچ‌کس با من دوست نیست.",
        t5: "دفعه بعد بیشتر تمرین می‌کنم.", t6: "بعضی قسمت‌هایش را دوست دارم.", t7: "من هیچ کاری بلد نیستم.", t8: "همیشه همه‌چیز را خراب می‌کنم.",
        t9: "شاید به چیز دیگری خندید.", t10: "می‌توانم بپرسم چه شده.", t11: "همه به من می‌خندند.", t12: "دیگر نمی‌خواهم به کلاس بیایم.",
        t13: "تمرین کنم، دفعه بعد بهتر می‌شود.", t14: "دویدن را دوست دارم، حتی اگر نبرم.", t15: "من همیشه می‌بازم.", t16: "دیگر هیچ‌وقت مسابقه نمی‌دهم.",
        t17: "امروز وقت کم بود، فردا شاید.", t18: "می‌توانم دستم را بالا ببرم و بپرسم.", t19: "معلم مرا دوست ندارد.", t20: "حرف‌های من مهم نیست.",
        t21: "یک بازی خوب در خانه پیدا می‌کنیم.", t22: "فردا می‌رویم.", t23: "روزم کاملاً خراب شد.", t24: "همیشه بدشانسم."
      }
    },
    make: function (rng, n, ctx) {
      var t = ctx.w("thoughts"), sits = ctx.w("sits"), keys = Object.keys(THOUGHTS);
      var again = ctx.again.filter(function (k) { return THOUGHTS[k]; });
      var order = again.concat(rng.shuffle(keys).filter(function (k) { return again.indexOf(k) < 0; }));
      return order.slice(0, Math.min(n, 3)).map(function (k) {
        var s = THOUGHTS[k], items = rng.shuffle(s.good.map(function (x) { return [x, "help"]; }).concat(s.bad.map(function (x) { return [x, "worse"]; })));
        return { type: "sort", key: k, prompt: sits[k],
          baskets: [{ pic: "💡", label: ctx.w("help"), value: "help" }, { pic: "🌧️", label: ctx.w("worse"), value: "worse" }],
          items: items.map(function (x) { return { pic: s.pic, label: t[x[0]], say: t[x[0]], basket: x[1] }; }) };
      });
    }
  });

  /* «مسئله‌ها» — feel-sapling-p2 (Problem bank). `order` rounds: an everyday problem through the traffic-light steps
     (stop and calm, say the problem, think of ways, choose and try, see how it went); after feel-sapling-9 also the steps
     of a real apology for a small mistake. */
  var PROBLEMS = ["ball", "pencil", "swing", "tv", "promise", "game"];
  var APOLOGIES = ["spill", "tower", "book", "late"];
  B.PRACTICE.push({
    id: "feel-sapling-p2", subject: "feel", level: "sapling", objectives: ["feel.sap.8", "feel.sap.9"],
    needs: ["feel-sapling-8"], lessons: ["feel-sapling-8", "feel-sapling-9", "feel-sapling-12"], emoji: "🚦", title: "مسئله‌ها",
    words: {
      ask: "{p} قدم‌های چراغ راهنمایی را به ترتیب بچین.",
      sorryAsk: "{p} عذرخواهی را به ترتیب بچین.",
      red: "بایست و آرام شو", see: "ببین چطور شد",
      probs: {
        ball: ["دو نفر و یک توپ.", "«دو نفریم و یک توپ.»", "نوبتی، با هم، یا بازی دیگر", "با هم بازی می‌کنند"],
        pencil: ["مدادت گم شده.", "«مدادم گم شده و لازمش دارم.»", "بگردم، بپرسم یا قرض بگیرم", "از دوستم قرض می‌گیرم"],
        swing: ["دو نفر و یک تاب.", "«دو نفریم و یک تاب.»", "نوبتی، هل دادن هم، یا بازی دیگر", "نوبتی سوار می‌شویم"],
        tv: ["تو و خواهرت دو برنامه مختلف می‌خواهید.", "«هر کدام یک برنامه می‌خواهیم.»", "نوبتی، یکی امروز یکی فردا، یا بازی با هم", "امروز برنامه او، فردا برنامه من"],
        promise: ["دوستت قولش را فراموش کرد.", "«قول داده بودی و یادت رفت. ناراحت شدم.»", "بپرسم چه شده، یک روز دیگر بگذاریم", "قرار تازه می‌گذاریم"],
        game: ["هر دو می‌خواهید بازی را انتخاب کنید.", "«هر کدام بازی دیگری می‌خواهیم.»", "رأی بگیریم، نوبتی، یا دو بازی پشت سر هم", "اول بازی او، بعد بازی من"]
      },
      sorries: {
        spill: ["آب را روی نقاشی دوستت ریختی.", "«ببخشید، آب را روی نقاشی‌ات ریختم.»", "«می‌دانم ناراحت شدی.»", "«بیا کمکت کنم دوباره بکشی.»"],
        tower: ["بی‌حواس برج برادرت را خراب کردی.", "«ببخشید، برجت را خراب کردم.»", "«می‌دانم برایش زحمت کشیده بودی.»", "«بیا با هم دوباره بسازیم.»"],
        book: ["کتاب دوستت را پاره کردی.", "«ببخشید، کتابت را پاره کردم.»", "«می‌دانم کتاب محبوبت بود.»", "«بیا با چسب درستش کنیم.»"],
        late: ["قرار بازی با دوستت را فراموش کردی.", "«ببخشید، قرارمان یادم رفت.»", "«می‌دانم منتظرم بودی.»", "«فردا زود می‌آیم.»"]
      },
      makeUp: "آشتی"
    },
    make: function (rng, n, ctx) {
      var probs = ctx.w("probs"), sorries = ctx.w("sorries"), out = [];
      var pool = PROBLEMS.slice(), withSorry = ctx.done("feel-sapling-9");
      if (withSorry) pool = pool.concat(APOLOGIES.map(function (a) { return "s:" + a; }));
      var again = ctx.again.filter(function (k) { return pool.indexOf(k) >= 0; });
      var order = again.concat(rng.shuffle(pool).filter(function (k) { return again.indexOf(k) < 0; }));
      order.slice(0, Math.min(n, 3)).forEach(function (k) {
        if (k.indexOf("s:") === 0) {
          var a = sorries[k.slice(2)];
          out.push({ type: "order", key: k, numbered: true, prompt: ctx.w("sorryAsk", { p: a[0] }),
            items: [{ pic: "🙇", label: a[1], say: a[1] }, { pic: "😢", label: a[2], say: a[2] }, { pic: "🤝", label: a[3], say: a[3] }, { pic: "💛", label: ctx.w("makeUp"), say: ctx.w("makeUp") }] });
          return;
        }
        var p = probs[k];
        out.push({ type: "order", key: k, numbered: true, prompt: ctx.w("ask", { p: p[0] }),
          items: [{ pic: "🔴", label: ctx.w("red"), say: ctx.w("red") }, { pic: "🟡", label: p[1], say: p[1] }, { pic: "💡", label: p[2], say: p[2] },
            { pic: "🟢", label: p[3], say: p[3] }, { pic: "👀", label: ctx.w("see"), say: ctx.w("see") }] });
      });
      return out;
    }
  });

  /* ---------- Generators made from data (feel-seed-p3 and after) ----------
     Each family opens after its lesson (ctx.done) and has its words in `words` under "<family>.<key>" (English in
     js/en/feel.js, the same keys). The newest family the child has met comes first, then the others in a random
     order; missed rounds (ctx.again) are made again first from their keys. Every round is about a story, never about
     the child's own feeling.
       pairs: items [picA, picB or null, lesson or null] → "<f>.a<i>" ↔ "<f>.z<i>"; a round matches 3 or 4 of them.
       sort:  baskets [pic, value] ("<f>.b<i>"), items [pic, value] ("<f>.i<i>"); a round sorts up to 5 (both baskets).
       order: v variants (prompt "<f>.v<k>"), steps [pic, has its own words] ("<f>.s<i>", or "<f>.v<k>.s<i>"). */
  function openFams(fams, ctx) {
    var open = fams.filter(function (f) { return ctx.done(f.lesson); });
    var newest = -1, at = function (f) { return ctx.doneIds.indexOf(f.lesson); };
    open.forEach(function (f) { newest = Math.max(newest, at(f)); });
    return { open: open, first: open.filter(function (f) { return at(f) === newest; }) };
  }
  function rounds(fams, rng, n, ctx, makeOne, fromKey) {
    var o = openFams(fams, ctx), out = [], seen = {};
    if (!o.open.length) return out;
    var max = Math.min(n, 3);
    ctx.again.forEach(function (key) {
      if (out.length >= max || seen[key]) return;
      var f = o.open.find(function (x) { return key.indexOf(x.id + ":") === 0; });
      var s = f && fromKey(f, key.slice(f.id.length + 1));
      if (s) { seen[key] = true; out.push(s); }
    });
    var order = o.first.concat(rng.shuffle(o.open.filter(function (f) { return o.first.indexOf(f) < 0; })));
    for (var tries = 0; out.length < max && tries < max * 4; tries++) {
      var s = makeOne(order[tries % order.length]);
      if (s && !seen[s.key]) { seen[s.key] = true; out.push(s); }
    }
    return out;
  }
  var MAKE = {
    pairs: function (fams) {
      return function (rng, n, ctx) {
        function step(f, ids) {
          var p = f.id + ".";
          return { type: "pairs", key: f.id + ":" + ids.slice().sort(function (a, b) { return a - b; }).join(","), prompt: ctx.w(p + "ask"),
            pairs: rng.shuffle(ids).map(function (i) {
              var it = f.i[i], a = ctx.w(p + "a" + i), z = ctx.w(p + "z" + i);
              return [{ pic: it[0], say: a }, it[1] ? { pic: it[1], say: z } : { label: z, say: z }];
            }) };
        }
        var usable = function (f) { return f.i.map(function (it, i) { return i; }).filter(function (i) { return !f.i[i][2] || ctx.done(f.i[i][2]); }); };
        var ok = fams.filter(function (f) { return usable(f).length >= 3; });
        return rounds(ok, rng, n, ctx, function (f) {
          var u = usable(f);
          return step(f, rng.sample(u, Math.min(4, u.length)));
        }, function (f, rest) {
          var ids = rest.split(",").map(Number), u = usable(f);
          return ids.length >= 3 && ids.every(function (i) { return u.indexOf(i) >= 0; }) ? step(f, ids) : null;
        });
      };
    },
    sort: function (fams) {
      return function (rng, n, ctx) {
        function step(f, ids) {
          var p = f.id + ".";
          return { type: "sort", key: f.id + ":" + ids.slice().sort(function (a, b) { return a - b; }).join(","), prompt: ctx.w(p + "ask"),
            baskets: f.b.map(function (b, i) { return { pic: b[0], label: ctx.w(p + "b" + i), value: b[1] }; }),
            items: rng.shuffle(ids).map(function (i) { var t = ctx.w(p + "i" + i); return { pic: f.i[i][0], label: t, say: t, basket: f.i[i][1] }; }) };
        }
        return rounds(fams, rng, n, ctx, function (f) {
          var by = {};
          f.i.forEach(function (it, i) { (by[it[1]] = by[it[1]] || []).push(i); });
          var vals = f.b.map(function (b) { return b[1]; }), ids = [];
          var counts = vals.length === 2 ? [3, 2] : vals.map(function () { return 2; });
          rng.shuffle(vals).forEach(function (v, k) { ids = ids.concat(rng.sample(by[v] || [], counts[k])); });
          return step(f, ids);
        }, function (f, rest) {
          var ids = rest.split(",").map(Number);
          return ids.every(function (i) { return f.i[i]; }) ? step(f, ids) : null;
        });
      };
    },
    order: function (fams) {
      return function (rng, n, ctx) {
        function step(f, k) {
          var p = f.id + ".";
          return { type: "order", key: f.id + ":" + k, numbered: true, prompt: ctx.w(p + "v" + k),
            items: f.s.map(function (s, i) { var t = ctx.w(s[1] ? p + "s" + i : p + "v" + k + ".s" + i); return { pic: s[0], label: t, say: t }; }) };
        }
        return rounds(fams, rng, n, ctx, function (f) { return step(f, rng.int(0, f.v - 1)); },
          function (f, rest) { var k = Number(rest); return k >= 0 && k < f.v ? step(f, k) : null; });
      };
    }
  };

  B.PRACTICE.push({
    id: "feel-seed-p3", subject: "feel", level: "seed", objectives: ["feel.seed.2", "feel.seed.3", "feel.seed.6", "feel.seed.7"],
    needs: ["feel-seed-2"], lessons: ["feel-seed-2", "feel-seed-3", "feel-seed-6", "feel-seed-7", "feel-seed-8"], emoji: "🪜", title: "قدم به قدم",
    words: {"turtle.v0": "خرگوش عصبانی شد چون توپش را برداشتند. کارهای لاک‌پشت را به ترتیب بچین.", "turtle.v1": "پیشی عصبانی شد چون برجش افتاد. کارهای لاک‌پشت را به ترتیب بچین.", "turtle.v2": "آرش ناراحت شد چون نوبتش نشد. کارهای لاک‌پشت را به ترتیب بچین.", "turtle.s0": "بایست", "turtle.s1": "برو توی لاکت", "turtle.s2": "سه نفس آرام", "turtle.s3": "بیرون بیا و بگو چه حسی داری", "turn.v0": "یک تاب و دو بچه. نوبت گرفتن را به ترتیب بچین.", "turn.v1": "یک توپ و دو بچه. نوبت گرفتن را به ترتیب بچین.", "turn.v2": "یک ماشین اسباب‌بازی و دو بچه. نوبت گرفتن را به ترتیب بچین.", "turn.s0": "می‌پرسم: نوبت من کی است؟", "turn.s1": "صبر می‌کنم و می‌شمارم", "turn.s2": "نوبت من است و بازی می‌کنم", "turn.s3": "بعد به دوستم می‌دهم", "bye.v0": "مامان می‌خواهد سر کار برود. خداحافظی را به ترتیب بچین.", "bye.v1": "بابا می‌خواهد به خرید برود. خداحافظی را به ترتیب بچین.", "bye.v2": "مادربزرگ به خانه‌اش برمی‌گردد. خداحافظی را به ترتیب بچین.", "bye.s0": "یک بغل", "bye.s1": "دست تکان دادن", "bye.s2": "«بعداً می‌بینمت!»", "bye.s3": "بازی تا وقتی برگردد", "again.v0": "شیرین می‌خواهد خودش کفشش را بپوشد. کارهایش را به ترتیب بچین.", "again.v1": "آیدین می‌خواهد خودش دکمه‌اش را ببندد. کارهایش را به ترتیب بچین.", "again.v2": "مینا می‌خواهد خودش جورابش را بپوشد. کارهایش را به ترتیب بچین.", "again.s0": "امتحان می‌کند", "again.s1": "سخت است. نشد!", "again.s2": "یک نفس آرام می‌کشد", "again.s3": "دوباره امتحان می‌کند یا کمک می‌خواهد", "again.s4": "«خودم توانستم!»"},
    make: MAKE.order([{"id": "turtle", "lesson": "feel-seed-2", "v": 3, "s": [["✋", 1], ["🐢", 1], ["🌷", 1], ["🗣️", 1]]}, {"id": "turn", "lesson": "feel-seed-3", "v": 3, "s": [["🙋", 1], ["⏳", 1], ["😊", 1], ["🤝", 1]]}, {"id": "bye", "lesson": "feel-seed-6", "v": 3, "s": [["🤗", 1], ["👋", 1], ["💬", 1], ["🧸", 1]]}, {"id": "again", "lesson": "feel-seed-7", "v": 3, "s": [["👟", 1], ["😕", 1], ["🌷", 1], ["🔁", 1], ["🎉", 1]]}])
  });

  B.PRACTICE.push({
    id: "feel-seed-p4", subject: "feel", level: "seed", objectives: ["feel.seed.2", "feel.seed.3", "feel.seed.4", "feel.seed.5", "feel.seed.6", "feel.seed.7"],
    needs: ["feel-seed-2"], lessons: ["feel-seed-2", "feel-seed-3", "feel-seed-4", "feel-seed-5", "feel-seed-6", "feel-seed-7", "feel-seed-8"], emoji: "💚", title: "چه چیزی کمک می‌کند؟",
    words: {"angry.ask": "وقتی عصبانی هستیم، کدام کار کمک می‌کند؟ هر کار را بزن تا بشنوی.", "angry.b0": "کمک می‌کند", "angry.b1": "کسی ناراحت می‌شود", "angry.i0": "مثل لاک‌پشت بایستم", "angry.i1": "سه نفس آرام", "angry.i2": "گفتن «من عصبانی‌ام»", "angry.i3": "بغل کردن عروسک", "angry.i4": "زدن", "angry.i5": "پرت کردن چیزها", "angry.i6": "داد زدن", "wait.ask": "وقتی منتظر نوبتم هستم، کدام کار خوب است؟ هر کار را بزن تا بشنوی.", "wait.b0": "کار خوب", "wait.b1": "کسی ناراحت می‌شود", "wait.i0": "شمردن", "wait.i1": "آواز خواندن", "wait.i2": "دست زدن و تشویق دوستم", "wait.i3": "پرسیدن «نوبت من کی است؟»", "wait.i4": "قاپیدن اسباب‌بازی", "wait.i5": "هل دادن دوستم", "friend.ask": "دوستت غمگین است. کدام کار مهربان است؟ هر کار را بزن تا بشنوی.", "friend.b0": "مهربان", "friend.b1": "ناراحت‌ترش می‌کند", "friend.i0": "بغلش کنم", "friend.i1": "کمکش کنم", "friend.i2": "خوراکی‌ام را با او قسمت کنم", "friend.i3": "بپرسم «چه شده؟»", "friend.i4": "به او بخندم", "friend.i5": "محلش نگذارم", "jobs.ask": "کدام کار را تو می‌توانی بکنی، و کدام کار بزرگ‌ترهاست؟ هر کار را بزن تا بشنوی.", "jobs.b0": "کار من", "jobs.b1": "کار بزرگ‌ترها", "jobs.i0": "بردن قاشق‌ها سر سفره", "jobs.i1": "آب دادن به گلدان", "jobs.i2": "جفت کردن کفش‌ها", "jobs.i3": "جمع کردن اسباب‌بازی‌ها", "jobs.i4": "گذاشتن جوراب‌ها در سبد", "jobs.i5": "روشن کردن اجاق", "jobs.i6": "بریدن با چاقو", "jobs.i7": "ریختن چای داغ", "jobs.i8": "دادن دارو", "miss.ask": "وقتی دلت برای مامان تنگ می‌شود، کدام کار کمک می‌کند؟ هر کار را بزن تا بشنوی.", "miss.b0": "کمک می‌کند", "miss.b1": "کمک نمی‌کند", "miss.i0": "بازی با مادربزرگ", "miss.i1": "کشیدن یک نقاشی برای مامان", "miss.i2": "گفتن «دلم تنگ شده»", "miss.i3": "یک نفس آرام", "miss.i4": "قایم شدن و حرف نزدن", "miss.i5": "خراب کردن اسباب‌بازی‌ها", "hard.ask": "وقتی کاری سخت است، کدام کار کمک می‌کند؟ هر کار را بزن تا بشنوی.", "hard.b0": "کمک می‌کند", "hard.b1": "کمک نمی‌کند", "hard.i0": "دوباره امتحان کردن", "hard.i1": "یک نفس آرام", "hard.i2": "گفتن «می‌شود کمکم کنی؟»", "hard.i3": "آرام‌آرام کار کردن", "hard.i4": "پرت کردن چیزها", "hard.i5": "ول کردن و گفتن «هیچ‌وقت نمی‌توانم»"},
    make: MAKE.sort([{"id": "angry", "lesson": "feel-seed-2", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🐢", "yes"], ["🌷", "yes"], ["🗣️", "yes"], ["🧸", "yes"], ["👊", "no"], ["🧱", "no"], ["📢", "no"]]}, {"id": "wait", "lesson": "feel-seed-3", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🔢", "yes"], ["🎵", "yes"], ["👏", "yes"], ["🙋", "yes"], ["✊", "no"], ["💥", "no"]]}, {"id": "friend", "lesson": "feel-seed-4", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🤗", "yes"], ["🤝", "yes"], ["🍎", "yes"], ["❓", "yes"], ["😆", "no"], ["🙈", "no"]]}, {"id": "jobs", "lesson": "feel-seed-5", "b": [["🧒", "yes"], ["🧑", "no"]], "i": [["🍽️", "yes"], ["🪴", "yes"], ["👟", "yes"], ["🧸", "yes"], ["🧺", "yes"], ["🔥", "no"], ["🔪", "no"], ["🫖", "no"], ["💊", "no"]]}, {"id": "miss", "lesson": "feel-seed-6", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🧸", "yes"], ["🖍️", "yes"], ["🗣️", "yes"], ["🌷", "yes"], ["🙈", "no"], ["💥", "no"]]}, {"id": "hard", "lesson": "feel-seed-7", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🔁", "yes"], ["🌷", "yes"], ["🙋", "yes"], ["🐢", "yes"], ["🧱", "no"], ["🗑️", "no"]]}])
  });

  B.PRACTICE.push({
    id: "feel-seed-p5", subject: "feel", level: "seed", objectives: ["feel.seed.1", "feel.seed.2", "feel.seed.3", "feel.seed.4", "feel.seed.5", "feel.seed.6", "feel.seed.7"],
    needs: ["feel-seed-1"], lessons: ["feel-seed-1", "feel-seed-2", "feel-seed-3", "feel-seed-4", "feel-seed-5", "feel-seed-6", "feel-seed-7", "feel-seed-8"], emoji: "💬", title: "چه بگویم؟",
    words: {"names.ask": "هر صورت را با اسم حسش جفت کن. هر کارت را بزن تا بشنوی.", "names.a0": "خوشحال", "names.z0": "خوشحال", "names.a1": "غمگین", "names.z1": "غمگین", "names.a2": "عصبانی", "names.z2": "عصبانی", "names.a3": "نگران", "names.z3": "نگران", "names.a4": "ترسیده", "names.z4": "ترسیده", "names.a5": "آرام", "names.z5": "آرام", "say.ask": "در هر موقعیت چه می‌شود گفت؟ جفتشان کن. هر کارت را بزن تا بشنوی.", "say.a0": "وقتی عصبانی هستی", "say.z0": "«من عصبانی‌ام.»", "say.a1": "وقتی نوبت می‌خواهی", "say.z1": "«نوبت من کی است؟»", "say.a2": "وقتی برج دوستت افتاد", "say.z2": "«بیا کمکت کنم.»", "say.a3": "وقتی کسی کمکت کرد", "say.z3": "«ممنون که کمکم کردی.»", "say.a4": "وقتی مامان سر کار می‌رود", "say.z4": "«عصر می‌بینمت!»", "say.a5": "وقتی کاری سخت است", "say.z5": "«می‌شود کمکم کنی؟»", "say.a6": "وقتی خودت کاری را تمام کردی", "say.z6": "«خودم توانستم!»", "say.a7": "وقتی بی‌حواس چیزی را خراب کردی", "say.z7": "«ببخشید.»"},
    make: MAKE.pairs([{"id": "names", "lesson": "feel-seed-1", "i": [["😊", null, null], ["😢", null, null], ["😠", null, null], ["😟", null, null], ["😨", null, null], ["😌", null, null]]}, {"id": "say", "lesson": "feel-seed-2", "i": [["😠", null, null], ["🛝", null, "feel-seed-3"], ["🧱", null, "feel-seed-4"], ["🍽️", null, "feel-seed-5"], ["👋", null, "feel-seed-6"], ["🧩", null, "feel-seed-7"], ["🎉", null, "feel-seed-7"], ["🙇", null, "feel-seed-4"]]}])
  });

  B.PRACTICE.push({
    id: "feel-sprout-p3", subject: "feel", level: "sprout", objectives: ["feel.spr.1", "feel.spr.2", "feel.spr.3", "feel.spr.5", "feel.spr.6", "feel.spr.8", "feel.spr.9"],
    needs: ["feel-sprout-1"], lessons: ["feel-sprout-1", "feel-sprout-2", "feel-sprout-3", "feel-sprout-4", "feel-sprout-5", "feel-sprout-6", "feel-sprout-7", "feel-sprout-8", "feel-sprout-9"], emoji: "💬", title: "چه بگویم؟",
    words: {"help.ask": "برای هر حس، چه چیزی کمک می‌کند؟ جفتشان کن. هر کارت را بزن تا بشنوی.", "help.a0": "ناامید", "help.z0": "یک برنامه تازه برای فردا", "help.a1": "خجالت‌زده", "help.z1": "یک نفس آرام و لبخند یک دوست", "help.a2": "بی‌حوصله", "help.z2": "پیدا کردن یک بازی تازه", "help.a3": "دلتنگ", "help.z3": "تماس یا نقاشی برای او", "help.a4": "حسود", "help.z4": "گفتن «من هم بغل می‌خواهم»", "help.a5": "هیجان‌زده", "help.z5": "چند نفس آرام تا بتوانم صبر کنم", "say.ask": "در هر موقعیت چه می‌شود گفت؟ جفتشان کن. هر کارت را بزن تا بشنوی.", "say.a0": "مدادت گم شده و کمی ناراحتی", "say.z0": "«مدادم را ندیدی؟»", "say.a1": "هنوز دوچرخه‌سواری بلد نیستی", "say.z1": "«هنوز نمی‌توانم. تمرین می‌کنم.»", "say.a2": "دوستت باران را دوست ندارد و تو داری", "say.z2": "«اشکالی ندارد. هر کس یک جور است.»", "say.a3": "دوستت دارد حرف می‌زند", "say.z3": "«بگو، گوش می‌دهم.»", "say.a4": "می‌خواهی وارد بازی شوی", "say.z4": "«می‌شود من هم بازی کنم؟»", "say.a5": "یک بچه تنها ایستاده", "say.z5": "«بیا با ما بازی کن!»", "say.a6": "مداد دوستت را لازم داری", "say.z6": "«می‌شود قرض بگیرم؟»", "say.a7": "یک بچه تازه از شهر دیگری آمده", "say.z7": "«سلام! اسم من … است. اسم تو چیست؟»"},
    make: MAKE.pairs([{"id": "help", "lesson": "feel-sprout-1", "i": [["😞", "📅", null], ["😳", "🌷", null], ["🥱", "🧩", null], ["🥺", "📞", null], ["😒", "🤗", null], ["🤩", "🌷", null]]}, {"id": "say", "lesson": "feel-sprout-2", "i": [["✏️", null, null], ["🚲", null, "feel-sprout-3"], ["🌧️", null, "feel-sprout-4"], ["👂", null, "feel-sprout-5"], ["⚽", null, "feel-sprout-6"], ["🧍", null, "feel-sprout-6"], ["🖍️", null, "feel-sprout-8"], ["🌍", null, "feel-sprout-9"]]}])
  });

  B.PRACTICE.push({
    id: "feel-sprout-p4", subject: "feel", level: "sprout", objectives: ["feel.spr.2", "feel.spr.3", "feel.spr.5", "feel.spr.6", "feel.spr.7", "feel.spr.8"],
    needs: ["feel-sprout-2"], lessons: ["feel-sprout-2", "feel-sprout-3", "feel-sprout-5", "feel-sprout-6", "feel-sprout-7", "feel-sprout-8", "feel-sprout-10"], emoji: "🪜", title: "قدم به قدم",
    words: {"big.v0": "برادرت روی نقاشی‌ات خط کشید و خیلی عصبانی هستی. قدم‌ها را به ترتیب بچین.", "big.v1": "دوستت اسباب‌بازی‌ات را خراب کرد و خیلی ناراحتی. قدم‌ها را به ترتیب بچین.", "big.s0": "می‌ایستم", "big.s1": "چند نفس آرام می‌کشم", "big.s2": "از یک بزرگ‌تر کمک می‌خواهم", "big.s3": "حسم کم‌کم کوچک‌تر می‌شود", "yet.v0": "نیکا دوچرخه‌سواری یاد می‌گیرد. به ترتیب بچین.", "yet.v1": "کیان شنا کردن یاد می‌گیرد. به ترتیب بچین.", "yet.v2": "مینا بستن بند کفش را یاد می‌گیرد. به ترتیب بچین.", "yet.s0": "امتحان می‌کند", "yet.s1": "نمی‌شود", "yet.s2": "می‌گوید «هنوز نمی‌توانم»", "yet.s3": "هر روز تمرین می‌کند", "yet.s4": "یاد می‌گیرد!", "listen.v0": "شیرین از روزش می‌گوید. خوب گوش دادن را به ترتیب بچین.", "listen.v1": "مادربزرگ قصه تعریف می‌کند. خوب گوش دادن را به ترتیب بچین.", "listen.s0": "به او نگاه می‌کنم", "listen.s1": "گوش می‌دهم", "listen.s2": "بدنم را آرام نگه می‌دارم", "listen.s3": "صبر می‌کنم تا حرفش تمام شود", "listen.s4": "حالا نوبت من است", "join.v0": "بچه‌ها توپ‌بازی می‌کنند و تو هم می‌خواهی بازی کنی. به ترتیب بچین.", "join.v1": "بچه‌ها با مکعب‌ها برج می‌سازند و تو هم می‌خواهی بازی کنی. به ترتیب بچین.", "join.s0": "نگاه می‌کنم چه بازی‌ای است", "join.s1": "می‌پرسم «می‌شود من هم بازی کنم؟»", "join.s2": "جوابشان را گوش می‌دهم", "join.s3": "اگر گفتند نه، بازی دیگری پیدا می‌کنم", "i.v0": "برادرت مدادرنگی‌هایت را بی‌اجازه برداشت. جمله «من» را به ترتیب بچین.", "i.v0.s0": "من ناراحت شدم", "i.v0.s1": "وقتی مدادرنگی‌هایم را بی‌اجازه برداشتی", "i.v0.s2": "می‌خواهم اول از من بپرسی", "i.v1": "دوستت در صف هلت داد. جمله «من» را به ترتیب بچین.", "i.v1.s0": "من عصبانی شدم", "i.v1.s1": "وقتی در صف هلم دادی", "i.v1.s2": "می‌خواهم مواظب باشی", "i.v2": "دوستت به بازی دیر آمد. جمله «من» را به ترتیب بچین.", "i.v2.s0": "من ناامید شدم", "i.v2.s1": "وقتی دیر آمدی", "i.v2.s2": "می‌خواهم دفعه بعد سر وقت بیایی", "i.v3": "خواهرت حرفت را قطع کرد. جمله «من» را به ترتیب بچین.", "i.v3.s0": "من ناراحت شدم", "i.v3.s1": "وقتی وسط حرفم حرف زدی", "i.v3.s2": "می‌خواهم صبر کنی تا حرفم تمام شود", "think.v0": "مداد سام شکست و مداد آرش روی میز است. به ترتیب بچین.", "think.v1": "در بازار، مینا یک اسباب‌بازی می‌بیند و مامانش آن طرف است. به ترتیب بچین.", "think.s0": "می‌ایستم", "think.s1": "فکر می‌کنم: بعدش چه می‌شود؟", "think.s2": "کار خوب را انتخاب می‌کنم", "think.s3": "بعدش همه خوشحال‌اند"},
    make: MAKE.order([{"id": "big", "lesson": "feel-sprout-2", "v": 2, "s": [["✋", 1], ["🌷", 1], ["🙋", 1], ["🙂", 1]]}, {"id": "yet", "lesson": "feel-sprout-3", "v": 3, "s": [["🔁", 1], ["😕", 1], ["⏳", 1], ["💪", 1], ["🎉", 1]]}, {"id": "listen", "lesson": "feel-sprout-5", "v": 2, "s": [["👀", 1], ["👂", 1], ["✋", 1], ["⏳", 1], ["🗣️", 1]]}, {"id": "join", "lesson": "feel-sprout-6", "v": 2, "s": [["👀", 1], ["🙋", 1], ["👂", 1], ["🚗", 1]]}, {"id": "i", "lesson": "feel-sprout-7", "v": 4, "s": [["😟", 0], ["📍", 0], ["🙋", 0]]}, {"id": "think", "lesson": "feel-sprout-8", "v": 2, "s": [["✋", 1], ["🤔", 1], ["👍", 1], ["😊", 1]]}])
  });

  B.PRACTICE.push({
    id: "feel-sprout-p5", subject: "feel", level: "sprout", objectives: ["feel.spr.4", "feel.spr.9"],
    needs: ["feel-sprout-4"], lessons: ["feel-sprout-4", "feel-sprout-9", "feel-sprout-10"], emoji: "🌦️", title: "هر کس یک جور",
    words: {"same.ask": "در این قصه، چه کسی دوست داشت و چه کسی نه؟ هر کارت را بزن تا بشنوی.", "same.b0": "دوست داشت", "same.b1": "دوست نداشت", "same.i0": "مینا زیر باران پرید و خندید", "same.i1": "سام زیر باران می‌خواست زود به خانه برود", "same.i2": "آیدین سگ را ناز کرد", "same.i3": "شیرین پشت بابا رفت", "same.i4": "یاسمن با موسیقی بلند رقصید", "same.i5": "آرش گوش‌هایش را گرفت", "same.i6": "کیان غذای تند را با ذوق خورد", "same.i7": "نیکا غذای تند را نخورد", "same.i8": "سام سوار چرخ‌وفلک شد و خندید", "same.i9": "مینا ترجیح داد پایین بماند", "share.ask": "کدام چیز در همه ما یکی است و کدام با هم فرق دارد؟ هر کارت را بزن تا بشنوی.", "share.b0": "در همه ما یکی است", "share.b1": "با هم فرق دارد", "share.i0": "همه حس داریم", "share.i1": "همه بازی را دوست داریم", "share.i2": "همه دوست داریم با ما مهربان باشند", "share.i3": "زبانی که در خانه حرف می‌زنیم", "share.i4": "غذای محبوبمان", "share.i5": "قدمان", "share.i6": "کاری که بیشتر دوست داریم"},
    make: MAKE.sort([{"id": "same", "lesson": "feel-sprout-4", "b": [["😊", "yes"], ["😟", "no"]], "i": [["🌧️", "yes"], ["🌧️", "no"], ["🐕", "yes"], ["🐕", "no"], ["🎶", "yes"], ["🎶", "no"], ["🌶️", "yes"], ["🌶️", "no"], ["🎢", "yes"], ["🎢", "no"]]}, {"id": "share", "lesson": "feel-sprout-9", "b": [["🤝", "yes"], ["🌈", "no"]], "i": [["💛", "yes"], ["⚽", "yes"], ["🤗", "yes"], ["🗣️", "no"], ["🍲", "no"], ["📏", "no"], ["🎨", "no"]]}])
  });

  B.PRACTICE.push({
    id: "feel-sprout-p6", subject: "feel", level: "sprout", objectives: ["feel.spr.4", "feel.spr.5", "feel.spr.6", "feel.spr.7", "feel.spr.9"],
    needs: ["feel-sprout-4"], lessons: ["feel-sprout-4", "feel-sprout-5", "feel-sprout-6", "feel-sprout-7", "feel-sprout-9", "feel-sprout-10"], emoji: "💬", title: "حرف مهربان",
    words: {"feel.ask": "دوستت از سگ می‌ترسد. کدام حرف مهربان است؟ هر کارت را بزن تا بشنوی.", "feel.b0": "مهربان", "feel.b1": "ناراحتش می‌کند", "feel.i0": "«اشکالی ندارد. با هم از این طرف برویم.»", "feel.i1": "«دستم را بگیر.»", "feel.i2": "«ترسو! ترسو!»", "feel.i3": "«این که ترس ندارد!»", "listen.ask": "کدام کار یعنی خوب گوش می‌دهم؟ هر کارت را بزن تا بشنوی.", "listen.b0": "خوب گوش دادن", "listen.b1": "گوش ندادن", "listen.i0": "نگاه کردن به کسی که حرف می‌زند", "listen.i1": "صبر کردن تا حرفش تمام شود", "listen.i2": "پرسیدن «بعدش چه شد؟»", "listen.i3": "نگاه کردن به تلویزیون", "listen.i4": "وسط حرفش حرف زدن", "listen.i5": "بالا و پایین پریدن", "join.ask": "کدام حرف کسی را به بازی می‌آورد و کدام او را بیرون می‌گذارد؟ هر کارت را بزن تا بشنوی.", "join.b0": "به بازی می‌آورد", "join.b1": "بیرونش می‌گذارد", "join.i0": "«بیا با ما بازی کن!»", "join.i1": "«این دور که تمام شد، تو هم بیا.»", "join.i2": "«می‌خواهی تو اول باشی؟»", "join.i3": "«تو نمی‌توانی بیایی.»", "join.i4": "وانمود کنیم او را ندیده‌ایم", "i.ask": "کدام جمله با «من» است و کدام سرزنش می‌کند؟ هر کارت را بزن تا بشنوی.", "i.b0": "با «من»", "i.b1": "سرزنش", "i.i0": "«من ناراحت شدم وقتی برجم را خراب کردی.»", "i.i1": "«من می‌خواهم اول از من بپرسی.»", "i.i2": "«من ناامید شدم وقتی دیر آمدی.»", "i.i3": "«تو بدی!»", "i.i4": "«تو همیشه همه چیز را خراب می‌کنی!»", "fair.ask": "کدام کار منصفانه است؟ هر کارت را بزن تا بشنوی.", "fair.b0": "منصفانه", "fair.b1": "ناعادلانه", "fair.i0": "نوبت دادن به همه", "fair.i1": "بازی دادن به بچه تازه", "fair.i2": "گوش دادن به کسی که زبان دیگری هم بلد است", "fair.i3": "خندیدن به لهجهٔ کسی", "fair.i4": "بازی ندادن به کسی چون شکلش فرق دارد"},
    make: MAKE.sort([{"id": "feel", "lesson": "feel-sprout-4", "b": [["💚", "yes"], ["💔", "no"]], "i": [["🗣️", "yes"], ["🤝", "yes"], ["😆", "no"], ["🙄", "no"]]}, {"id": "listen", "lesson": "feel-sprout-5", "b": [["👂", "yes"], ["🙉", "no"]], "i": [["👀", "yes"], ["⏳", "yes"], ["❓", "yes"], ["📺", "no"], ["🗣️", "no"], ["🤸", "no"]]}, {"id": "join", "lesson": "feel-sprout-6", "b": [["💚", "yes"], ["💔", "no"]], "i": [["👋", "yes"], ["⏳", "yes"], ["🙋", "yes"], ["🚫", "no"], ["🙈", "no"]]}, {"id": "i", "lesson": "feel-sprout-7", "b": [["🗣️", "yes"], ["👉", "no"]], "i": [["😟", "yes"], ["🙋", "yes"], ["😞", "yes"], ["👉", "no"], ["📢", "no"]]}, {"id": "fair", "lesson": "feel-sprout-9", "b": [["⚖️", "yes"], ["💔", "no"]], "i": [["🔄", "yes"], ["👋", "yes"], ["🗣️", "yes"], ["😆", "no"], ["🚫", "no"]]}])
  });

  B.PRACTICE.push({
    id: "feel-sapling-p3", subject: "feel", level: "sapling", objectives: ["feel.sap.1", "feel.sap.4", "feel.sap.6"],
    needs: ["feel-sapling-1"], lessons: ["feel-sapling-1", "feel-sapling-4", "feel-sapling-6", "feel-sapling-12"], emoji: "🎭", title: "جای او بودن",
    words: {"two.ask": "هر موقعیت را با دو حسی که با هم می‌آیند جفت کن. هر کارت را بزن تا بشنوی.", "two.a0": "روز اول در یک مدرسه تازه", "two.z0": "هیجان‌زده و نگران", "two.a1": "مهمانی که دارد می‌رود", "two.z1": "خوشحال و غمگین", "two.a2": "سوار شدن چرخ‌وفلک بزرگ", "two.z2": "ترسیده و هیجان‌زده", "two.a3": "دوستم برنده شد و من نه", "two.z3": "خوشحال و ناامید", "two.a4": "رفتن به یک خانه تازه", "two.z4": "هیجان‌زده و دلتنگ", "two.a5": "به دنیا آمدن یک خواهر کوچک", "two.z5": "خوشحال و کمی حسود", "strong.ask": "هر نقطهٔ قوت را با نمونه‌اش جفت کن. هر کارت را بزن تا بشنوی.", "strong.a0": "صبور", "strong.z0": "هر روز به گیاهش آب می‌دهد تا بزرگ شود", "strong.a1": "بامزه", "strong.z1": "قصه‌ای می‌گوید و همه می‌خندند", "strong.a2": "مهربان", "strong.z2": "کیسهٔ مادربزرگ را برایش می‌برد", "strong.a3": "شجاع", "strong.z3": "با اینکه می‌ترسد، جلوی کلاس حرف می‌زند", "strong.a4": "دقیق", "strong.z4": "چیزهای کوچکی را می‌بیند که بقیه نمی‌بینند", "strong.a5": "شنونده خوب", "strong.z5": "وقتی دوستش ناراحت است، خوب گوش می‌دهد", "place.ask": "اگر جای او بودی، چه حسی داشتی؟ جفتشان کن. هر کارت را بزن تا بشنوی.", "place.a0": "بچه تازه‌ای که هیچ‌کس را نمی‌شناسد", "place.z0": "تنها و کمی نگران", "place.a1": "برادر کوچکی که در بازی باخت", "place.z1": "ناامید و غمگین", "place.a2": "دوستی که نقاشی‌اش خراب شد", "place.z2": "ناراحت", "place.a3": "دوستی که هدیه گرفت", "place.z3": "خوشحال", "place.a4": "بچه‌ای که مدادهایش ریخت", "place.z4": "کلافه و کمی خجالت‌زده"},
    make: MAKE.pairs([{"id": "two", "lesson": "feel-sapling-1", "i": [["🏫", null, null], ["👋", null, null], ["🎢", null, null], ["🏆", null, null], ["🏠", null, null], ["👶", null, null]]}, {"id": "strong", "lesson": "feel-sapling-4", "i": [["🌱", null, null], ["😄", null, null], ["🤝", null, null], ["🦁", null, null], ["🔍", null, null], ["👂", null, null]]}, {"id": "place", "lesson": "feel-sapling-6", "i": [["🧍", null, null], ["🎲", null, null], ["🖍️", null, null], ["🎁", null, null], ["✏️", null, null]]}])
  });

  B.PRACTICE.push({
    id: "feel-sapling-p4", subject: "feel", level: "sapling", objectives: ["feel.sap.3", "feel.sap.4", "feel.sap.5", "feel.sap.6", "feel.sap.7", "feel.sap.8", "feel.sap.9", "feel.sap.10", "feel.sap.11"],
    needs: ["feel-sapling-3"], lessons: ["feel-sapling-3", "feel-sapling-4", "feel-sapling-5", "feel-sapling-6", "feel-sapling-7", "feel-sapling-8", "feel-sapling-9", "feel-sapling-10", "feel-sapling-11", "feel-sapling-12"], emoji: "🗂️", title: "کدام دسته؟",
    words: {"calm.ask": "کدام کار آرامم می‌کند؟ هر کارت را بزن تا بشنوی.", "calm.b0": "آرامم می‌کند", "calm.b1": "آشفته‌ترم می‌کند", "calm.i0": "نفس گل و شمع", "calm.i1": "نفس مربعی", "calm.i2": "پنج چیز که می‌بینم", "calm.i3": "سفت کن و ول کن", "calm.i4": "حرف زدن با یک بزرگ‌تر", "calm.i5": "داد زدن سر همه", "calm.i6": "محکم کوبیدن در", "calm.i7": "پرت کردن چیزها", "strong.ask": "کدام یک نقطهٔ قوت است و کدام چیزی است که فقط داریم؟ هر کارت را بزن تا بشنوی.", "strong.b0": "نقطهٔ قوت", "strong.b1": "چیزی که دارم", "strong.i0": "مهربان بودن", "strong.i1": "شجاع بودن", "strong.i2": "صبور بودن", "strong.i3": "خوب گوش دادن", "strong.i4": "کفش تازه", "strong.i5": "یک تبلت", "strong.i6": "اسباب‌بازی زیاد", "goal.ask": "وقتی رسیدن به هدفم سخت شد، کدام کار کمک می‌کند؟ هر کارت را بزن تا بشنوی.", "goal.b0": "کمک می‌کند", "goal.b1": "کمک نمی‌کند", "goal.i0": "کمی استراحت", "goal.i1": "کمک خواستن", "goal.i2": "کوچک‌تر کردن قدم", "goal.i3": "نگاه کردن به ستاره‌هایی که گرفته‌ام", "goal.i4": "کنار گذاشتن همه‌چیز", "goal.i5": "گفتن «من هیچ‌وقت نمی‌توانم»", "empathy.ask": "کدام کار نشان می‌دهد خودمان را جای او گذاشته‌ایم؟ هر کارت را بزن تا بشنوی.", "empathy.b0": "جای او بودن", "empathy.b1": "ناراحت‌ترش می‌کند", "empathy.i0": "پرسیدن «حالت خوب است؟»", "empathy.i1": "کمک به جمع کردن مدادهای ریخته", "empathy.i2": "گفتن «می‌فهمم سخت است»", "empathy.i3": "خندیدن به کسی که باخت", "empathy.i4": "نگاه نکردن و ادامه دادن بازی خودم", "bully.ask": "شوخی است یا قلدری؟ هر کارت را بزن تا بشنوی.", "bully.b0": "شوخی", "bully.b1": "قلدری", "bully.i0": "هر دو می‌خندیم و خوشحالیم", "bully.i1": "گفت «خوشم نمی‌آید» و دیگر تکرارش نکردیم", "bully.i2": "هر روز اسم بد رویش می‌گذارند", "bully.i3": "از عمد همیشه او را بیرون می‌گذارند", "bully.i4": "بارها وسایلش را قایم می‌کنند تا ناراحت شود", "light.ask": "هر قدم مال کدام چراغ است: قرمز یا سبز؟ هر کارت را بزن تا بشنوی.", "light.b0": "چراغ قرمز: بایست و آرام شو", "light.b1": "چراغ سبز: انتخاب کن و امتحان کن", "light.i0": "ایستادن", "light.i1": "چند نفس آرام", "light.i2": "کمی صبر تا آرام شوم", "light.i3": "انتخاب یک راه", "light.i4": "امتحان کردن آن راه", "light.i5": "دیدن اینکه چطور شد", "sorry.ask": "کدام یک عذرخواهی واقعی است؟ هر کارت را بزن تا بشنوی.", "sorry.b0": "عذرخواهی واقعی", "sorry.b1": "عذرخواهی واقعی نیست", "sorry.i0": "«ببخشید که آب را روی نقاشی‌ات ریختم.»", "sorry.i1": "«ببخشید. بیا کمکت کنم دوباره بکشی.»", "sorry.i2": "«می‌دانم ناراحت شدی. ببخشید.»", "sorry.i3": "«ببخشید دیگه، ول کن!»", "sorry.i4": "«تقصیر خودت بود.»", "team.ask": "کدام کار برای کار گروهی خوب است؟ هر کارت را بزن تا بشنوی.", "team.b0": "کار گروهی خوب", "team.b1": "کار گروهی را سخت می‌کند", "team.i0": "گوش دادن به ایدهٔ همه", "team.i1": "ترکیب کردن ایده‌ها", "team.i2": "رأی گرفتن وقتی موافق نیستیم", "team.i3": "قسمت کردن کارها", "team.i4": "فقط ایدهٔ خودم", "team.i5": "گوش ندادن به بقیه", "trust.ask": "کدام کار اعتماد را بیشتر می‌کند؟ هر کارت را بزن تا بشنوی.", "trust.b0": "اعتماد می‌سازد", "trust.b1": "اعتماد را کم می‌کند", "trust.i0": "گفتن «من گلدان را شکستم»", "trust.i1": "عمل کردن به قولم", "trust.i2": "پس دادن چیزی که قرض گرفتم", "trust.i3": "پنهان کردن تکه‌های شکسته", "trust.i4": "گفتن «من نبودم» وقتی بودم"},
    make: MAKE.sort([{"id": "calm", "lesson": "feel-sapling-3", "b": [["🧰", "yes"], ["🌪️", "no"]], "i": [["🌷", "yes"], ["🟩", "yes"], ["👀", "yes"], ["🍋", "yes"], ["🙋", "yes"], ["📢", "no"], ["🚪", "no"], ["🧱", "no"]]}, {"id": "strong", "lesson": "feel-sapling-4", "b": [["💪", "yes"], ["🎒", "no"]], "i": [["🤝", "yes"], ["🦁", "yes"], ["🌱", "yes"], ["👂", "yes"], ["👟", "no"], ["📱", "no"], ["🧸", "no"]]}, {"id": "goal", "lesson": "feel-sapling-5", "b": [["💚", "yes"], ["💔", "no"]], "i": [["😌", "yes"], ["🙋", "yes"], ["🪜", "yes"], ["⭐", "yes"], ["🗑️", "no"], ["🚫", "no"]]}, {"id": "empathy", "lesson": "feel-sapling-6", "b": [["💚", "yes"], ["💔", "no"]], "i": [["❓", "yes"], ["✏️", "yes"], ["🗣️", "yes"], ["😆", "no"], ["🙈", "no"]]}, {"id": "bully", "lesson": "feel-sapling-7", "b": [["😄", "yes"], ["🛑", "no"]], "i": [["😂", "yes"], ["🙋", "yes"], ["🗓️", "no"], ["🚫", "no"], ["🎒", "no"]]}, {"id": "light", "lesson": "feel-sapling-8", "b": [["🔴", "yes"], ["🟢", "no"]], "i": [["✋", "yes"], ["🌷", "yes"], ["🧊", "yes"], ["👍", "no"], ["▶️", "no"], ["👀", "no"]]}, {"id": "sorry", "lesson": "feel-sapling-9", "b": [["💛", "yes"], ["💔", "no"]], "i": [["💧", "yes"], ["🤝", "yes"], ["😢", "yes"], ["🙄", "no"], ["👉", "no"]]}, {"id": "team", "lesson": "feel-sapling-10", "b": [["🧱", "yes"], ["💔", "no"]], "i": [["👂", "yes"], ["🧩", "yes"], ["🗳️", "yes"], ["🤲", "yes"], ["👑", "no"], ["🙉", "no"]]}, {"id": "trust", "lesson": "feel-sapling-11", "b": [["🤝", "yes"], ["💔", "no"]], "i": [["🗣️", "yes"], ["🤞", "yes"], ["🔁", "yes"], ["🙈", "no"], ["👉", "no"]]}])
  });

  B.PRACTICE.push({
    id: "feel-sapling-p5", subject: "feel", level: "sapling", objectives: ["feel.sap.2", "feel.sap.3", "feel.sap.5", "feel.sap.6", "feel.sap.7", "feel.sap.10", "feel.sap.11"],
    needs: ["feel-sapling-2"], lessons: ["feel-sapling-2", "feel-sapling-3", "feel-sapling-5", "feel-sapling-6", "feel-sapling-7", "feel-sapling-10", "feel-sapling-11", "feel-sapling-12"], emoji: "🪜", title: "قدم به قدم",
    words: {"tfa.v0": "دوستت دست تکان نداد. به ترتیب بچین.", "tfa.v0.s0": "فکر: «شاید مرا ندید»", "tfa.v0.s1": "حس: آرام می‌مانم", "tfa.v0.s2": "کار: جلو می‌روم و سلام می‌کنم", "tfa.v1": "نقاشی‌ات خوب نشد. به ترتیب بچین.", "tfa.v1.s0": "فکر: «دفعه بعد تمرین می‌کنم»", "tfa.v1.s1": "حس: کمی ناامید، اما امیدوار", "tfa.v1.s2": "کار: یک نقاشی تازه شروع می‌کنم", "tfa.v2": "معلم صدایت نکرد. به ترتیب بچین.", "tfa.v2.s0": "فکر: «امروز وقت کم بود»", "tfa.v2.s1": "حس: آرام", "tfa.v2.s2": "کار: فردا دستم را بالا می‌برم", "plan.v0": "وقتی نگرانی، برنامه آرامشت را به ترتیب بچین.", "plan.v1": "وقتی عصبانی هستی، برنامه آرامشت را به ترتیب بچین.", "plan.s0": "می‌فهمم چه حسی دارم", "plan.s1": "یکی از ابزارهایم را انتخاب می‌کنم", "plan.s2": "از آن استفاده می‌کنم", "plan.s3": "اگر لازم بود، از یک بزرگ‌تر کمک می‌خواهم", "goal.v0": "هدف آیدین: یاد گرفتن بستن بند کفش. به ترتیب بچین.", "goal.v1": "هدف مینا: خواندن یک کتاب قصه در یک هفته. به ترتیب بچین.", "goal.v2": "هدف کیان: یاد گرفتن شمردن تا صد. به ترتیب بچین.", "goal.s0": "یک هدف کوچک انتخاب می‌کند", "goal.s1": "آن را چند قدم کوچک می‌کند", "goal.s2": "هر روز یک قدم برمی‌دارد", "goal.s3": "برای هر قدم یک ستاره می‌گذارد", "goal.s4": "به هدفش می‌رسد", "empathy.v0": "یک بچه تازه تنها ایستاده. به ترتیب بچین.", "empathy.v0.s0": "می‌بینم که تنهاست", "empathy.v0.s1": "فکر می‌کنم اگر من بودم، تنها و نگران بودم", "empathy.v0.s2": "دعوتش می‌کنم با ما بازی کند", "empathy.v1": "برادر کوچکت در بازی باخت و گریه می‌کند. به ترتیب بچین.", "empathy.v1.s0": "می‌بینم که گریه می‌کند", "empathy.v1.s1": "فکر می‌کنم باختن سخت است", "empathy.v1.s2": "کنارش می‌روم و می‌گویم «بیا دوباره بازی کنیم»", "empathy.v2": "مدادهای دوستت روی زمین ریخت. به ترتیب بچین.", "empathy.v2.s0": "می‌بینم که مدادهایش ریخت", "empathy.v2.s1": "فکر می‌کنم اگر من بودم، کلافه می‌شدم", "empathy.v2.s2": "کمکش می‌کنم جمعشان کند", "bully.v0": "هر روز چند بچه کیان را مسخره می‌کنند. کارهای کیان را به ترتیب بچین.", "bully.v1": "بارها و بارها چند بچه وسایل مینا را قایم می‌کنند. کارهای مینا را به ترتیب بچین.", "bully.s0": "محکم و آرام می‌گوید «بس کنید!»", "bully.s1": "از آنجا دور می‌شود", "bully.s2": "به یک بزرگ‌تر می‌گوید", "bully.s3": "اگر تکرار شد، باز هم می‌گوید", "team.v0": "سه دوست می‌خواهند با مکعب خانه بسازند. به ترتیب بچین.", "team.v1": "خانواده می‌خواهد با هم یک کاردستی بسازد. به ترتیب بچین.", "team.s0": "هر کس ایده‌اش را می‌گوید", "team.s1": "به همه گوش می‌دهند", "team.s2": "با هم تصمیم می‌گیرند", "team.s3": "کارها را قسمت می‌کنند", "team.s4": "با هم می‌سازند", "truth.v0": "توپ آیدین به گلدان خورد و گلدان شکست. به ترتیب بچین.", "truth.v1": "شیرین بی‌حواس کتاب دوستش را خیس کرد. به ترتیب بچین.", "truth.s0": "یک نفس آرام می‌کشد", "truth.s1": "راستش را می‌گوید", "truth.s2": "عذرخواهی می‌کند", "truth.s3": "کمک می‌کند جبران کند"},
    make: MAKE.order([{"id": "tfa", "lesson": "feel-sapling-2", "v": 3, "s": [["💭", 0], ["💛", 0], ["👣", 0]]}, {"id": "plan", "lesson": "feel-sapling-3", "v": 2, "s": [["🔎", 1], ["🧰", 1], ["🌷", 1], ["🙋", 1]]}, {"id": "goal", "lesson": "feel-sapling-5", "v": 3, "s": [["🎯", 1], ["🪜", 1], ["📅", 1], ["⭐", 1], ["🎉", 1]]}, {"id": "empathy", "lesson": "feel-sapling-6", "v": 3, "s": [["👀", 0], ["💭", 0], ["🤝", 0]]}, {"id": "bully", "lesson": "feel-sapling-7", "v": 2, "s": [["✋", 1], ["🚶", 1], ["🧑‍🏫", 1], ["🔁", 1]]}, {"id": "team", "lesson": "feel-sapling-10", "v": 2, "s": [["💡", 1], ["👂", 1], ["🗳️", 1], ["🤲", 1], ["🧱", 1]]}, {"id": "truth", "lesson": "feel-sapling-11", "v": 2, "s": [["🌷", 1], ["🗣️", 1], ["🙇", 1], ["🤝", 1]]}])
  });

  B.PRACTICE.push({
    id: "feel-sapling-p6", subject: "feel", level: "sapling", objectives: ["feel.sap.1", "feel.sap.2", "feel.sap.3", "feel.sap.4", "feel.sap.5", "feel.sap.7", "feel.sap.8", "feel.sap.9", "feel.sap.10", "feel.sap.11"],
    needs: ["feel-sapling-1"], lessons: ["feel-sapling-1", "feel-sapling-2", "feel-sapling-3", "feel-sapling-4", "feel-sapling-5", "feel-sapling-7", "feel-sapling-8", "feel-sapling-9", "feel-sapling-10", "feel-sapling-11"], emoji: "💬", title: "چه بگویم؟",
    words: {"say.ask": "در هر موقعیت چه می‌شود گفت؟ جفتشان کن. هر کارت را بزن تا بشنوی.", "say.a0": "پسرخاله‌ات دارد می‌رود", "say.z0": "«هم خوشحالم که آمدی، هم غمگینم که می‌روی.»", "say.a1": "دوستت دست تکان نداد", "say.z1": "«شاید مرا ندید. خودم سلام می‌کنم.»", "say.a2": "خیلی نگرانی", "say.z2": "«الان نفس مربعی می‌کشم.»", "say.a3": "می‌خواهی به خواهرت چیز خوبی بگویی", "say.z3": "«تو خیلی صبوری.»", "say.a4": "وسط رسیدن به هدفت خسته شدی", "say.z4": "«کمی استراحت می‌کنم، بعد قدم بعدی.»", "say.a5": "کسی بارها مسخره‌ات می‌کند", "say.z5": "«بس کن!» و به یک بزرگ‌تر می‌گویم", "say.a6": "دو نفرید و یک توپ", "say.z6": "«دو نفریم و یک توپ. چه کار کنیم؟»", "say.a7": "آب را روی نقاشی دوستت ریختی", "say.z7": "«ببخشید. بیا کمکت کنم دوباره بکشی.»", "say.a8": "دوستت از تو عذرخواهی کرد", "say.z8": "«باشد، ممنون که گفتی.»", "say.a9": "در کار گروهی ایده‌ها با هم جور نیست", "say.z9": "«بیایید ایده‌ها را با هم ترکیب کنیم.»", "say.a10": "چیزی را شکستی", "say.z10": "«من شکستمش. ببخشید.»", "say.a11": "دوستت در مسابقه برنده شد و تو نه", "say.z11": "«تبریک! کمی ناامیدم، اما برایت خوشحالم.»", "say.a12": "فردا روز اول تو در مدرسهٔ تازه است", "say.z12": "«هم هیجان دارم، هم کمی نگرانم.»", "say.a13": "وقتی وارد کلاس شدی، کسی خندید", "say.z13": "«شاید به چیز دیگری خندید.»"},
    make: MAKE.pairs([{"id": "say", "lesson": "feel-sapling-1", "i": [["👋", null, null], ["💭", null, "feel-sapling-2"], ["🧰", null, "feel-sapling-3"], ["⭐", null, "feel-sapling-4"], ["🎯", null, "feel-sapling-5"], ["🛑", null, "feel-sapling-7"], ["🚦", null, "feel-sapling-8"], ["💧", null, "feel-sapling-9"], ["🕊️", null, "feel-sapling-9"], ["🧱", null, "feel-sapling-10"], ["🏺", null, "feel-sapling-11"], ["🏆", null, null], ["🏫", null, null], ["😄", null, "feel-sapling-2"]]}])
  });
})();
