/* باغچه — «زنگ تفریح» (recess): free, creative games outside the lessons, each one a page in games/<id>/.
   The games keep each child's progress in that child's profile (games/shared/profile.js): p.games[id] = { d, t },
   today's minutes in p.recess["2026-10-20"] (seconds), and the games played each day in p.log[day].g.

   Each game here has:
     id       its folder in games/ (permanent: progress is stored by it)
     name     its Persian name; emoji; group (its row on the recess page, see B.GAME_GROUPS)
     about    what it is and what it practises, for parents
     after    lessons it follows in a garden's path (CURRICULUM.md, "Recess games"): once the child has finished
              that lesson, the game shows up after it (and its practice) as an optional extra, never blocking the path
     gardens  the gardens it suits best (shown to parents)
   The plan for these games is in CURRICULUM.md, "Recess games (زنگ تفریح)". */
(function () {
  var el = B.el;
  var DAY = 24 * 60 * 60 * 1000;

  B.GAME_GROUPS = [
    { id: "make", emoji: "🎨", name: "بساز و خیال کن" },
    { id: "think", emoji: "🧠", name: "فکر کن و حل کن" },
    { id: "words", emoji: "🔢", name: "عدد، کلمه و صدا" },
    { id: "pretend", emoji: "💖", name: "نقش‌بازی و مهربانی" }
  ];

  B.GAMES = [
    { id: "magic-doodles", name: "نقاشی جادویی", emoji: "🖍️", group: "make", after: ["read-seed-28"], gardens: ["seed", "sprout", "sapling"],
      about: "هر چه دوست دارد می‌کشد و با یک ضربه، نقاشی‌اش چشم درمی‌آورد و در یکی از پنج دنیا راه می‌رود، می‌پرد، پرواز می‌کند یا شنا می‌کند. خیال‌پردازی، نقاشی آزاد و حرف زدن درباره آنچه کشیده." },
    { id: "mirror-painter", name: "نقاش آینه‌ای", emoji: "🦋", group: "make", after: [], gardens: ["seed", "sprout", "sapling"],
      about: "یک طرف را نقاشی می‌کند و آینه جادویی آن را در طرف دیگر می‌کشد: پروانه، گل و دانه برف. آشنایی بی‌کلام با قرینگی و نقش‌های تکراری." },
    { id: "music-painter", name: "نقاشی آهنگ‌ساز", emoji: "🎨", group: "make", after: ["science-seed-21"], gardens: ["seed", "sprout", "sapling"],
      about: "هر رنگ یک ساز است و هر چه بالاتر بکشد، صدا زیرتر می‌شود. نقاشی‌اش را پخش می‌کند و آهنگ می‌شنود. صدای زیر و بم، ساز و آهنگ‌سازی." },
    { id: "creature-lab", name: "آزمایشگاه موجودات", emoji: "🧪", group: "make", after: [], gardens: ["seed", "sprout", "sapling"],
      about: "از سر، بدن، پا، دم و بال، یک موجود تازه با اسمی خنده‌دار می‌سازد و به او غذا می‌دهد، حمامش می‌کند و با او بازی می‌کند. خیال‌پردازی و مراقبت." },
    { id: "rhythm-copy", name: "گروه موسیقی حیوان‌ها", emoji: "🥁", group: "make", after: ["think-seed-5"], gardens: ["seed", "sprout", "sapling"],
      about: "گروه موسیقی حیوان‌ها آهنگی می‌زند و کودک همان را تکرار می‌کند؛ آهنگ کم‌کم بلندتر می‌شود. گوش دادن دقیق، حافظه و الگوی صدا." },
    { id: "story-theater", name: "تئاتر قصه", emoji: "🎭", group: "pretend", after: ["read-seed-32"], gardens: ["seed", "sprout", "sapling"],
      about: "صحنه‌ای انتخاب می‌کند، شخصیت‌ها و وسیله‌ها را می‌آورد، آن‌ها را به حرکت درمی‌آورد و قصه‌اش را با صدای خودش فیلم می‌کند. قصه‌گویی، ترتیب اتفاق‌ها و حرف زدن. صدای ضبط‌شده فقط روی همین دستگاه می‌ماند." },
    { id: "beep-boop-robot", name: "ربات بیب‌بوپ", emoji: "🤖", group: "think", after: ["think-seed-9"], gardens: ["seed", "sprout", "sapling"],
      about: "ربات خودش را می‌سازد و با کارت‌های فلش برنامه‌اش را می‌چیند تا به باتری برسد؛ اگر نرسید، برنامه را درست می‌کند. اولین قدم برنامه‌نویسی: ترتیب، برنامه‌ریزی و پیدا کردن اشکال." },
    { id: "robot-factory", name: "کارخانه ربات‌سازی", emoji: "🏭", group: "think", after: ["think-seed-12"], gardens: ["seed", "sprout"],
      about: "از روی کارت دستور، ربات می‌سازد یا اشتباه‌های ربات شیطون را پیدا و درست می‌کند. دقت، مقایسه و دنبال کردن دستور." },
    { id: "pattern-train", name: "قطار الگو", emoji: "🚂", group: "think", after: ["think-seed-1"], gardens: ["seed", "sprout"],
      about: "الگوی واگن‌های قطار را کامل می‌کند؛ الگوها کم‌کم سخت‌تر می‌شوند (دوتایی، سه‌تایی، بزرگ و کوچک). پیدا کردن قاعده و ادامه دادن الگو." },
    { id: "shadow-match", name: "سایه‌ها را پیدا کن", emoji: "🔦", group: "think", after: ["think-seed-6"], gardens: ["seed", "sprout"],
      about: "هر تصویر را روی سایه‌اش می‌برد؛ بعدها سایه‌ها چرخیده، کوچک و بزرگ یا شبیه هم می‌شوند. دقت در شکل‌ها و دیدن فضایی." },
    { id: "memory-match", name: "جفت‌ها را پیدا کن", emoji: "🃏", group: "think", after: ["read-seed-18"], gardens: ["seed", "sprout", "sapling"],
      about: "کارت‌ها را برمی‌گرداند تا جفت‌های شبیه هم را پیدا کند؛ از ۶ کارت تا ۱۶ کارت. حافظه و تمرکز." },
    { id: "maze-mouse", name: "موش و پنیر", emoji: "🐭", group: "think", after: ["math-seed-22"], gardens: ["seed", "sprout", "sapling"],
      about: "موش را در هزارتوهایی که کم‌کم بزرگ‌تر می‌شوند به پنیر می‌رساند؛ بعدها کلید و در هم دارند. برنامه‌ریزی، پیدا کردن راه و جهت‌ها." },
    { id: "doodle-puzzles", name: "پازل نقاشی‌ها", emoji: "🧩", group: "think", after: [], gardens: ["seed", "sprout", "sapling"],
      about: "از نقاشی‌های خودش در «نقاشی جادویی» و «نقاش آینه‌ای» پازل ۴ تا ۱۲ تکه می‌سازد و درستش می‌کند. دیدن فضایی و حوصله." },
    { id: "sink-or-float", name: "زیر آب یا روی آب؟", emoji: "🛁", group: "think", after: ["science-sprout-3"], gardens: ["seed", "sprout"],
      about: "حدس می‌زند هر چیز در آب فرو می‌رود یا روی آب می‌ماند، آن را در وان می‌اندازد و می‌بیند. بیست چیز آشنا. حدس زدن، آزمایش کردن و دیدن نتیجه." },
    { id: "counting-garden", name: "باغچه شمارش", emoji: "🌻", group: "words", after: ["math-seed-2"], gardens: ["seed", "sprout"],
      about: "به اندازه عددی که می‌بیند دانه می‌کارد، بعد محصول را می‌چیند و می‌شمارد، از ۱ تا ۱۰. شمردن، شناختن عددها و «آخرین عدد می‌گوید چندتا»." },
    { id: "animal-safari", name: "سافاری حیوان‌ها", emoji: "🦁", group: "words", after: ["science-seed-4"], gardens: ["seed", "sprout"],
      about: "«شیر کجاست؟»، «کی می‌گه ماع؟»: حیوان‌ها را از روی اسم و صدایشان پیدا می‌کند و آلبوم عکسش پر می‌شود. اسم حیوان‌ها، گوش دادن و واژه‌ها." },
    { id: "wheres-teddy", name: "تدی کجاست؟", emoji: "🧸", group: "words", after: ["world-seed-12"], gardens: ["seed", "sprout"],
      about: "تدی را پیدا می‌کند و سر جایش می‌گذارد: روی، زیر، کنار، توی و پشت. واژه‌های جا و مکان و گوش دادن به جمله." },
    { id: "letter-trace", name: "حرف‌های انگلیسی", emoji: "✍️", group: "words", after: ["english-seed-37"], gardens: ["seed", "sprout"],
      about: "۲۶ حرف انگلیسی را، بزرگ و کوچک، با انگشت می‌کشد؛ هر حرف با یک کلمه و تصویر. همراه درس «خواندن و نوشتن انگلیسی». (حرف‌های فارسی را در درس‌های فارسی می‌نویسد.)" },
    { id: "feelings-friends", name: "دوستان و احساس‌ها", emoji: "😊", group: "pretend", after: ["feel-seed-4"], gardens: ["seed", "sprout"],
      about: "قصه‌های کوتاه: حس هر دوست را نام می‌برد، یک راه مهربان برای کمک انتخاب می‌کند و صورت‌های احساس می‌سازد. شناختن احساس‌ها و همدلی." },
    { id: "little-vet", name: "درمانگاه حیوان‌ها", emoji: "🩺", group: "pretend", after: ["health-seed-13"], gardens: ["seed", "sprout"],
      about: "به حیوان‌های مریض کمک می‌کند و برای هر کدام وسیله درست را انتخاب می‌کند: شستن زخم، چسب زخم، دماسنج. مراقبت، مهربانی و آشنایی با کمک‌های ساده." },
    { id: "cake-shop", name: "شیرینی‌فروشی", emoji: "🎂", group: "pretend", after: ["math-seed-1"], gardens: ["seed", "sprout"],
      about: "کیک را طبقه‌طبقه می‌چیند، خامه و تزیین می‌زند، به اندازه سن مهمان شمع می‌گذارد و می‌شمارد، بعد شمع‌ها را فوت می‌کند. شمردن و خیال‌پردازی." },
    { id: "dress-up", name: "اتاق لباس‌پوشی", emoji: "👗", group: "pretend", after: [], gardens: ["seed", "sprout"],
      about: "لباس فضانورد، آتش‌نشان، دکتر، پری دریایی و چند لباس دیگر را می‌پوشد و عکس می‌گیرد. نقش‌بازی و خیال‌پردازی. عکس‌ها فقط روی همین دستگاه می‌مانند." }
  ];

  // Suggested recess time a day, by the child's Persian garden (guide.html#recess). The same numbers are in
  // games/shared/profile.js (DEFAULT_LIMIT), which reminds the child when the time is up.
  B.RECESS_LIMITS = { seed: 15, sprout: 15, sapling: 20, tree: 30, forest: 30 };
  B.RECESS_CHOICES = [10, 15, 20, 30, 45, 0]; // 0: no reminder

  B.gameById = function (id) { return B.GAMES.find(function (g) { return g.id === id; }) || null; };
  B.gamesAfter = function (lessonId) { return B.GAMES.filter(function (g) { return g.after.indexOf(lessonId) >= 0; }); };
  B.gameHref = function (g) { return "games/" + g.id + "/index.html"; };

  function dayKey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  // Minutes a day: the parent's choice (0 = no reminder), or the garden's suggestion.
  B.recessLimit = function (p) {
    if (p.recessLimit === 0) return 0;
    return p.recessLimit || B.RECESS_LIMITS[(p.levels && p.levels.read) || "sprout"] || 15;
  };
  B.recessMinutes = function (p, d) {
    return Math.round(((p.recess && p.recess[dayKey(d || new Date())]) || 0) / 60);
  };

  // A game's tile: its picture and name, and ✓ once the child has played it.
  B.gameTile = function (p, g, cls) {
    var played = p.games && p.games[g.id];
    return el("a", { class: "tile game-tile " + (cls || ""), href: B.gameHref(g) }, [
      el("span", { class: "big", text: g.emoji }),
      el("span", { class: "name", text: g.name }),
      el("span", { class: "sub", text: played ? B.t("recessPlayed") : "" })
    ]);
  };

  // Today's minutes against the day's recess time.
  function meter(p) {
    var lim = B.recessLimit(p), min = B.recessMinutes(p);
    if (!lim) return el("p", { class: "hint", text: B.t("recessTodayNoLimit", { min: B.fa(min) }) });
    var over = min >= lim;
    return el("div", { class: "recess-meter" + (over ? " over" : "") }, [
      el("div", { class: "recess-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(lim), "aria-valuenow": String(Math.min(min, lim)), "aria-label": B.t("recessTodayLabel") }, [
        el("span", { style: "width:" + Math.min(100, Math.round(100 * min / lim)) + "%" })
      ]),
      el("p", { class: "hint", text: over ? B.t("recessTodayOver", { lim: B.fa(lim) }) : B.t("recessToday", { min: B.fa(min), lim: B.fa(lim) }) })
    ]);
  }

  // The tile on the child's home screen.
  B.recessHomeTile = function (p) {
    var lim = B.recessLimit(p), min = B.recessMinutes(p);
    return el("a", { class: "tile recess-tile", href: "#/play" }, [
      el("span", { class: "big", text: "🎈" }),
      el("span", { class: "name", text: B.t("recessTitle") }),
      el("span", { class: "sub", text: lim && min >= lim ? B.t("recessTileOver") : B.t("recessTileSub") })
    ]);
  };

  // ---------- The recess page: #/play ----------
  B.viewRecess = function (app, p) {
    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: "#/home", text: B.t("back") }),
      el("h1", { style: "margin:0", text: "🎈 " + B.t("recessTitle") })
    ]));
    app.appendChild(el("p", { class: "hint", text: B.t("recessLead") }));
    app.appendChild(meter(p));

    // Games that go with lessons the child has finished recently come first.
    var recent = [];
    Object.keys(p.lessons || {}).forEach(function (id) {
      if (p.lessons[id].done) B.gamesAfter(id).forEach(function (g) { if (recent.indexOf(g) < 0) recent.push(g); });
    });
    if (recent.length) {
      app.appendChild(el("h2", { text: "⭐ " + B.t("recessForYou") }));
      var rg = el("div", { class: "grid" });
      recent.slice(-4).reverse().forEach(function (g) { rg.appendChild(B.gameTile(p, g)); });
      app.appendChild(rg);
    }
    B.GAME_GROUPS.forEach(function (gr) {
      app.appendChild(el("h2", { text: gr.emoji + " " + gr.name }));
      var grid = el("div", { class: "grid" });
      B.GAMES.filter(function (g) { return g.group === gr.id; }).forEach(function (g) { grid.appendChild(B.gameTile(p, g)); });
      app.appendChild(grid);
    });

    // For parents: how much to play (the full guide is in guide.html#recess).
    var lim = B.recessLimit(p);
    app.appendChild(el("details", { class: "card recess-guide" }, [
      el("summary", { text: "👪 " + B.t("recessGuideTitle") }),
      el("p", { text: lim ? B.t("recessGuideLimit", { name: p.name, lim: B.fa(lim) }) : B.t("recessGuideNoLimit", { name: p.name }) }),
      el("ul", null, B.T.recessGuideTips.map(function (t) { return el("li", { text: t }); })),
      el("p", null, [el("a", { href: "guide.html#recess", text: B.t("recessGuideLink") }), " · ", el("a", { href: "#/parent", text: B.t("recessGuideChange") })])
    ]));
  };

  // A game after a lesson in a garden's path: shown once the lesson is done, never needed to go on.
  B.pathWithGames = function (p, items) {
    var out = [];
    items.forEach(function (it, i) {
      out.push(it);
      // after the lesson's own practice set, if it has one
      var lesson = it.kind === "set" ? it.lesson.id : it.kind === "lesson" && !(items[i + 1] && items[i + 1].kind === "set") ? it.lesson.id : null;
      if (!lesson) return;
      var done = p.lessons[lesson] && p.lessons[lesson].done;
      B.gamesAfter(lesson).forEach(function (g) { out.push({ kind: "game", game: g, open: !!done, done: !!(p.games && p.games[g.id]) }); });
    });
    return out;
  };

  // The parent's card: the day's recess time and what was played this week.
  B.recessParentCard = function (p) {
    var select = el("select", { "aria-label": B.t("recessLimitLabel"), style: "font:inherit;padding:8px;border-radius:10px" });
    var suggested = B.RECESS_LIMITS[(p.levels && p.levels.read) || "sprout"] || 15;
    [null].concat(B.RECESS_CHOICES).forEach(function (m) {
      var o = el("option", { value: m === null ? "" : String(m), text: m === null ? B.t("recessLimitAuto", { min: B.fa(suggested) }) : m === 0 ? B.t("recessLimitOff") : B.t("recessLimitMin", { min: B.fa(m) }) });
      if ((p.recessLimit === undefined || p.recessLimit === null) ? m === null : p.recessLimit === m) o.selected = true;
      select.appendChild(o);
    });
    select.addEventListener("change", function () {
      if (select.value === "") delete p.recessLimit; else p.recessLimit = +select.value;
      B.touch(p);
      B.save();
    });
    var week = 0, now = new Date();
    for (var i = 0; i < 7; i++) week += B.recessMinutes(p, new Date(now.getTime() - i * DAY));
    return el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: "🎈 " + B.t("recessTitle") }),
      el("p", { class: "hint", text: B.t("recessParentHint") }),
      el("div", { class: "row" }, [el("label", { text: B.t("recessLimitLabel") }), select]),
      el("p", { class: "hint", text: B.t("recessParentWeek", { today: B.fa(B.recessMinutes(p)), week: B.fa(week) }) }),
      el("a", { href: "guide.html#recess", text: B.t("recessGuideLink") })
    ]);
  };
})();
