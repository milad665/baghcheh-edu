/* باغچه — practice: generators that make endless varied items for fluency, beside the hand-written lessons.
   Each subject registers its generators in js/practice/<subject>.js; this file is the shared part: the registry,
   a seeded random source, the context (what the child has met so far), short mixed practice sessions and the
   spaced repetition of missed items. It touches no page at load, so tools/check-plan.js and tools/check-reading.js
   load it in node too. How to write a generator: README.md, "Practice generators".

   A generator:
     B.PRACTICE.push({
       id: "math-seed-p1",            // permanent: the Id of its row in curriculum/<subject>.md (progress is kept by it)
       subject: "math", level: "seed", // the garden whose «تمرین» it belongs to (null: every garden)
       objectives: ["math.seed.2"],    // the codes in its plan row
       needs: ["math-seed-1"],         // lessons that unlock it (done, or in an earlier garden than the child's)
       home: true,                     // optional: also a button on the child's home screen (the calm corner)
       emoji: "🔢", title: "بشمار",     // what the child and the content browser see
       words: { ask: "پس چند {name} هست؟" }, // its Persian words; English in B.EN["math-seed-p1"].words (js/en/<subject>.js)
       make: function (rng, n, ctx) { return [ …up to n steps… ]; }
     });
   make() returns steps of the existing step types, each optionally with `key` (a short stable string naming the item,
   e.g. "7" or a word: a missed key comes back in ctx.again next time). It must use only rng for chance (never
   Math.random), and the same rng calls in Persian and English, so a session can be replayed in English. */
var B = window.B || {};
window.B = B;
B.PRACTICE = B.PRACTICE || [];

(function () {
  var DAY = 24 * 60 * 60 * 1000;
  var SIZE = 6; // items in a session: about 5 minutes (5 to 9 items)
  var MAX_GENERATORS = 3; // a session mixes up to three generators (interleaved)
  var ITEM_DAYS = [0, 1, 3, 7]; // a missed item: next session, then after 1, 3 and 7 days, then it is let go
  var GEN_DAYS = [0, 1, 2, 4, 7]; // which generators come first: missed recently, then the ones not seen for longest
  var MAX_ITEMS = 30;
  var NO_ENGLISH = { read: true, english: true };

  B.practiceById = function (id) { return B.PRACTICE.find(function (g) { return g.id === id; }) || null; };
  // A garden's generators, in the order they are registered (that is the order of the plan's rows).
  B.practiceFor = function (subject, level) {
    return B.PRACTICE.filter(function (g) { return g.subject === subject && (g.level === level || g.level === null); });
  };

  // ---------- A seeded random source (mulberry32) with helpers ----------
  B.rng = function (seed) {
    var a = (seed >>> 0) || 1;
    function r() {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    r.int = function (lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }; // lo..hi, both included
    r.pick = function (list) { return list[Math.floor(r() * list.length)]; };
    r.shuffle = function (list) {
      var a2 = list.slice();
      for (var i = a2.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a2[i]; a2[i] = a2[j]; a2[j] = t; }
      return a2;
    };
    r.sample = function (list, k) { return r.shuffle(list).slice(0, k); };
    return r;
  };
  function newSeed() { return (Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0; }

  // ---------- Context: what the child has met so far ----------
  function levelIndex(id) { return B.LEVELS.findIndex(function (l) { return l.id === id; }); }
  function fill(s, vars) {
    return typeof s === "string" && vars ? s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }) : s;
  }

  /* B.practiceContext(p, subject, opts) → ctx for a child p (or null in the content browser and the tools).
     opts.lang "fa" | "en"; opts.upTo: a lesson id: every lesson of its subject up to it counts as done (instead of p);
     opts.all: every lesson counts as done. */
  B.practiceContext = function (p, subject, opts) {
    opts = opts || {};
    var done = {}, order = B.LESSONS;
    if (opts.all) order.forEach(function (l) { done[l.id] = true; });
    else if (opts.upTo) {
      var stop = B.lessonById(opts.upTo), seen = false;
      order.forEach(function (l) {
        if (seen || !stop || l.subject !== stop.subject) return;
        done[l.id] = true;
        if (l.id === stop.id) seen = true;
      });
    } else if (p) {
      order.forEach(function (l) {
        var r = p.lessons && p.lessons[l.id];
        // A lesson in an earlier garden than the child's counts as met (placement put the child past it).
        var earlier = l.level && levelIndex(l.level) < levelIndex(B.levelOf(p, l.subject));
        if ((r && r.done) || earlier) done[l.id] = true;
      });
    }
    // Letters taught so far (reading): B.READ_TEACHES in js/practice/read.js, in lesson order.
    var letters = "";
    if (B.READ_TEACHES) order.forEach(function (l) { if (done[l.id] && B.READ_TEACHES[l.id]) letters += B.READ_TEACHES[l.id]; });
    return {
      lang: opts.lang === "en" ? "en" : "fa",
      subject: subject,
      level: p ? B.levelOf(p, subject) : opts.level || null,
      done: function (id) { return !!done[id]; },
      doneIds: order.filter(function (l) { return done[l.id]; }).map(function (l) { return l.id; }),
      letters: letters,
      again: []
    };
  };

  // Lessons a generator still waits for, in this context ([] when it is open).
  B.practiceMissing = function (gen, ctx) {
    return (gen.needs || []).filter(function (id) { return !ctx.done(id); });
  };

  B.practiceHasEnglish = function (gen) { return !NO_ENGLISH[gen.subject] && !!(B.EN && B.EN[gen.id]); };

  // The context one generator sees: its words in the session's language, the player's words, the keys to bring back.
  function genContext(gen, base, again) {
    var c = Object.create(base);
    var en = base.lang === "en" && B.EN && B.EN[gen.id];
    var words = Object.assign({}, gen.words || {}, (en && en.words) || {});
    c.again = again || [];
    c.w = function (key, vars) { return fill(words[key], vars); };
    c.t = function (key, vars) {
      var table = base.lang === "en" && B.T_EN && key in B.T_EN ? B.T_EN : B.T;
      return fill(table[key], vars);
    };
    return c;
  }

  B.practiceGenContext = genContext; // for tools/check-plan.js and tools/check-reading.js

  // Keys of a child's missed items that are due again, most urgent first.
  function dueKeys(p, gen, now) {
    var rec = p && p.practice && p.practice[gen.id];
    if (!rec || !rec.items) return [];
    return Object.keys(rec.items).filter(function (k) { return rec.items[k].due <= now; })
      .sort(function (a, b) { return rec.items[a].due - rec.items[b].due; });
  }

  /* Runs one generator: up to n steps, each stamped with the generator's id (and its key). Steps of a type this
     page does not have are dropped with a warning, so a broken generator never breaks a session. */
  B.makePractice = function (gen, seed, n, base, again) {
    var out = [];
    try { out = gen.make(B.rng(seed), n, genContext(gen, base, again)) || []; }
    catch (e) { if (typeof console !== "undefined") console.warn("practice " + gen.id + ": " + e.message); return []; }
    var known = B.engine && B.engine.steps;
    return out.slice(0, n).filter(function (s) {
      if (s && s.type && (!known || known[s.type])) return true;
      if (typeof console !== "undefined") console.warn("practice " + gen.id + ": no step type " + (s && s.type));
      return false;
    }).map(function (s) { s.gen = gen.id; return s; }); // not `practice`: that makes a game unscored (js/steps/feel.js)
  };

  /* A practice session for child p (or null) in a subject's garden: a lesson-like object for B.playLesson, never
     scored as a lesson. opts.only: one generator's id, or opts.gens: a list of generators (a lesson's practice set, a
     quiz, a review); opts.max: how many generators to mix (default 3); opts.size: items (default 6); opts.ctx: a ready
     context; opts.seed; opts.id, opts.title, opts.emoji, opts.kind ("set", "quiz", "review"), opts.sets: what the
     session is (see B.finishPractice). Returns null when nothing is open yet. */
  B.practiceSession = function (p, subject, level, opts) {
    opts = opts || {};
    var now = Date.now();
    var base = opts.ctx || B.practiceContext(p, subject);
    var size = opts.size || SIZE;
    var gens = (opts.only ? [B.practiceById(opts.only)] : opts.gens || B.practiceFor(subject, level)).filter(function (g) {
      return g && !B.practiceMissing(g, base).length;
    });
    if (!gens.length) return null;
    var rng = B.rng(opts.seed || newSeed());
    // Missed items due first, then the generator not practised for longest; ties by chance.
    var ranked = rng.shuffle(gens).map(function (g) {
      var rec = (p && p.practice && p.practice[g.id]) || {};
      return { gen: g, again: dueKeys(p, g, now), due: rec.due || 0 };
    }).sort(function (a, b) { return (b.again.length ? 1 : 0) - (a.again.length ? 1 : 0) || a.due - b.due; });
    var parts = [], left = size, pool = ranked.slice(0, opts.max || MAX_GENERATORS), spent = {};
    // Share the items; a generator that makes fewer than asked has nothing more to give (so a session can be short
    // when little has been taught), and leaves room for the next one; a second round fills up from the others.
    for (var pass = 0; pass < 2 && left > 0; pass++) {
      pool.forEach(function (r, i) {
        if (left <= 0 || spent[r.gen.id]) return;
        var want = pass ? left : Math.ceil(left / (pool.length - i));
        var part = { gen: r.gen, seed: Math.floor(rng() * 4294967296), n: want, again: pass ? [] : r.again };
        var got = B.makePractice(part.gen, part.seed, part.n, base, part.again).length;
        if (got < want) spent[r.gen.id] = true;
        if (!got) return;
        part.n = got;
        parts.push(part);
        left -= got;
      });
    }
    if (!parts.length) return null;
    function build(lang) {
      var ctx = lang === base.lang ? base : Object.assign({}, base, { lang: lang });
      var lists = parts.map(function (part) { return B.makePractice(part.gen, part.seed, part.n, ctx, part.again); });
      // Interleaved: one item from each generator in turn (Rohrer & Taylor 2007).
      var steps = [];
      for (var i = 0; lists.some(function (l) { return i < l.length; }); i++) lists.forEach(function (l) { if (i < l.length) steps.push(l[i]); });
      return steps;
    }
    var one = opts.only ? gens[0] : null;
    var english = parts.every(function (part) { return B.practiceHasEnglish(part.gen); });
    var title = function (lang) {
      if (opts.title) return opts.title(lang);
      if (one) return lang === "en" && B.EN && B.EN[one.id] && B.EN[one.id].title || one.title;
      return lang === "en" && B.T_EN && B.T_EN.practiceTitle || B.T.practiceTitle;
    };
    function make(lang) {
      return { id: opts.id || "practice-" + subject + "-" + (level || "any"), subject: subject, level: level, practice: true,
        kind: opts.kind || "free", sets: opts.sets || null, emoji: opts.emoji || (one ? one.emoji : "🔁"),
        title: title(lang), steps: build(lang), parts: parts };
    }
    var lesson = make(base.lang);
    if (english && base.lang !== "en") lesson.english = function () { return make("en"); };
    return lesson;
  };

  /* After a session: res.steps[i] = {scored, firstTry} for each step (B.playLesson). A missed item comes back
     next session; an item right again moves on (1, 3, 7 days) and is then let go. Nothing here is a lesson mark. */
  B.recordPractice = function (p, lesson, res) {
    var now = Date.now();
    p.practice = p.practice || {};
    var byGen = {};
    lesson.steps.forEach(function (s, i) {
      var r = res.steps && res.steps[i];
      if (!s.gen || !r || !r.scored) return;
      var g = byGen[s.gen] = byGen[s.gen] || { miss: 0, items: {} };
      if (!r.firstTry) g.miss++;
      // An item that came twice counts as missed if it was missed either time.
      if (s.key != null) g.items[s.key] = g.items[s.key] !== false && r.firstTry;
    });
    var seen = {};
    lesson.parts.forEach(function (part) {
      var id = part.gen.id, g = byGen[id] || { miss: 0, items: {} };
      if (seen[id]) return;
      seen[id] = true;
      var rec = p.practice[id] = p.practice[id] || { box: 0, due: 0, n: 0, items: {} };
      rec.items = rec.items || {};
      rec.n = (rec.n || 0) + 1;
      rec.at = now;
      rec.box = g.miss ? 0 : Math.min((rec.box || 0) + 1, GEN_DAYS.length - 1);
      rec.due = now + GEN_DAYS[rec.box] * DAY;
      Object.keys(g.items).forEach(function (key) {
        var item = rec.items[key];
        if (!g.items[key]) rec.items[key] = { box: 0, due: now };
        else if (item) {
          item.box++;
          if (item.box >= ITEM_DAYS.length) delete rec.items[key];
          else item.due = now + ITEM_DAYS[item.box] * DAY;
        }
      });
      var keys = Object.keys(rec.items);
      if (keys.length > MAX_ITEMS) keys.sort(function (a, b) { return rec.items[b].due - rec.items[a].due; }).slice(MAX_ITEMS)
        .forEach(function (k) { delete rec.items[k]; });
    });
  };

  // Syncing and backups (B.merge in js/common.js): per generator, the record practised last wins.
  B.mergePractice = function (here, theirs) {
    var changed = false;
    Object.keys(theirs || {}).forEach(function (id) {
      var t = theirs[id];
      if (!t || typeof t !== "object") return;
      here.practice = here.practice || {};
      if ((t.at || 0) > ((here.practice[id] || {}).at || 0)) { here.practice[id] = JSON.parse(JSON.stringify(t)); changed = true; }
    });
    return changed;
  };

  // Generators with `home: true` (the calm corner): a button on the child's home screen, outside every garden,
  // once their needs are met.
  B.practiceOnHome = function (p) {
    return B.PRACTICE.filter(function (g) {
      return g.home && !B.practiceMissing(g, B.practiceContext(p, g.subject)).length;
    });
  };

  // How many missed items wait in a child's garden (shown on the practice tile).
  B.practiceDue = function (p, subject, level) {
    var now = Date.now();
    return B.practiceFor(subject, level).reduce(function (n, g) { return n + dueKeys(p, g, now).length; }, 0);
  };

  /* ================= Practice in the course (CURRICULUM.md, "Practice in the course") =================
     In Seed, Sprout and Sapling each garden is one path: lesson → its practice set → next lesson …, with a unit quiz
     every few lessons. A set mixes every generator listed for that lesson (g.lessons, by default g.needs), made from
     that lesson and the ones before it. Finished sets come back for review (SET_DAYS); due sets are mixed into one
     review per subject. Records: p.practice["set:<lesson id>"] = {done, box, due, n, at},
     p.practice["quiz:<lesson id>"] = {done, stars, last, n, at} (the quiz after that lesson). */
  var SET_DAYS = [1, 3, 7, 14, 30, 60, 120];
  var PATH_LEVELS = { seed: true, sprout: true, sapling: true };
  var QUIZ_SPAN = 3, QUIZ_MAX = 6, QUIZ_SIZE = 8, REVIEW_SIZE = 8, REVIEW_SETS = 4;
  B.SET_DAYS = SET_DAYS;
  B.PRACTICE_MIN = 3; // the coverage rule: generators per lesson (tools/check-plan.js warns below it)

  B.inPath = function (level) { return !!PATH_LEVELS[level]; };
  // The lessons whose practice set a generator belongs to.
  B.genLessons = function (g) { return g.lessons || g.needs || []; };

  var memo = { n: -1 };
  B.practiceChanged = function () { memo = { n: -1 }; }; // after changing a registered generator (tools, tests)
  function cached(key, make) {
    if (memo.n !== B.PRACTICE.length) memo = { n: B.PRACTICE.length };
    return key in memo ? memo[key] : (memo[key] = make());
  }
  // The context of a child who has done every lesson of the subject up to this one (and nothing after it).
  function ctxAt(lessonId, lang) {
    var l = B.lessonById(lessonId);
    return B.practiceContext(null, l.subject, { upTo: lessonId, level: l.level, lang: lang });
  }
  function fixedCtx(lessonId) { return cached("ctx:" + lessonId, function () { return ctxAt(lessonId); }); }

  // A lesson's practice set: the generators that list it and are open right after it.
  B.lessonGens = function (lessonId) {
    var l = B.lessonById(lessonId);
    if (!l) return [];
    var by = cached("by", function () {
      var m = {};
      B.PRACTICE.forEach(function (g) { B.genLessons(g).forEach(function (id) { (m[id] = m[id] || []).push(g); }); });
      return m;
    });
    return (by[lessonId] || []).filter(function (g) { return g.subject === l.subject && !B.practiceMissing(g, fixedCtx(lessonId)).length; });
  };

  /* The garden's path, the same for every child: [{kind: "lesson", id, lesson}, {kind: "set", id: "set:<id>", lesson, gens},
     {kind: "quiz", id: "quiz:<id>", after: lesson, lessons: [ids], gens}]. A quiz closes a unit: it comes after a
     lesson where the topic changes (an objective of its set is not in the next set), once QUIZ_SPAN lessons with sets
     have passed since the last quiz, after QUIZ_MAX of them at most, and at the end of the garden. Outside Seed,
     Sprout and Sapling: lessons only. */
  B.practicePath = function (subject, level) {
    return cached("path:" + subject + "/" + level, function () {
      var lessons = B.lessonsFor(subject, level), items = [];
      if (!B.inPath(level)) return lessons.map(function (l) { return { kind: "lesson", id: l.id, lesson: l }; });
      var sets = lessons.map(function (l) { return B.lessonGens(l.id); });
      var objs = function (gens) { var o = []; gens.forEach(function (g) { o = o.concat(g.objectives || []); }); return o; };
      var span = [], spanGens = [], quizzes = 0;
      lessons.forEach(function (l, i) {
        items.push({ kind: "lesson", id: l.id, lesson: l });
        if (!sets[i].length) return;
        items.push({ kind: "set", id: "set:" + l.id, lesson: l, gens: sets[i] });
        span.push(l.id);
        sets[i].forEach(function (g) { if (spanGens.indexOf(g) < 0) spanGens.push(g); });
        // The unit ends where the topic changes: an objective of this set is not practised by the next set.
        var nextSet = sets.slice(i + 1).find(function (g) { return g.length; }), after = objs(nextSet || []);
        var ends = objs(sets[i]).some(function (o) { return after.indexOf(o) < 0; });
        if ((span.length >= QUIZ_SPAN && ends) || span.length >= QUIZ_MAX || (!nextSet && (span.length >= 2 || !quizzes))) {
          items.push({ kind: "quiz", id: "quiz:" + l.id, after: l, lessons: span, gens: spanGens });
          quizzes++;
          span = [];
          spanGens = [];
        }
      });
      return items;
    });
  };

  // The path with a child's state: done, open (the next item opens when the one before it is finished; anything
  // already done stays open), next (the first item to do), stars (quizzes).
  B.gardenPath = function (p, subject, level) {
    var items = B.practicePath(subject, level).map(function (it) { return Object.assign({}, it); });
    var last = -1;
    items.forEach(function (it, i) {
      var r = it.kind === "lesson" ? p.lessons[it.id] : p.practice && p.practice[it.id];
      it.done = !!(r && r.done);
      it.rec = r || null;
      if (it.done) last = i;
    });
    var gated = B.inPath(level);
    items.forEach(function (it, i) { it.open = !gated || it.done || i <= last + 1; });
    var next = items.find(function (it, i) { return i > last && !it.done; }) || items.find(function (it) { return !it.done; });
    if (next) next.next = true;
    return items;
  };

  // What comes after an item (by its id) that the child has not done yet; null at the end of the garden.
  B.pathNext = function (p, subject, level, id) {
    var items = B.gardenPath(p, subject, level), i = items.findIndex(function (it) { return it.id === id; });
    return items.slice(i + 1).find(function (it) { return !it.done; }) || null;
  };
  B.pathHref = function (it) {
    return it.kind === "lesson" ? "#/lesson/" + it.id : it.kind === "set" ? "#/set/" + it.lesson.id
      : it.kind === "quiz" ? "#/quiz/" + it.after.id : "#/review/" + it.subject;
  };

  function lessonTitle(l, lang) { return lang === "en" && B.EN && B.EN[l.id] && B.EN[l.id].title || l.title; }
  function word(key, lang, vars) {
    var t = lang === "en" && B.T_EN && B.T_EN[key] || (B.T || {})[key] || key;
    return fill(t, vars);
  }

  // A lesson's practice set, about 5 minutes: every generator of the set, 6 to 9 items.
  B.setSession = function (p, lessonId, opts) {
    var l = B.lessonById(lessonId), gens = l ? B.lessonGens(lessonId) : [];
    if (!gens.length) return null;
    return B.practiceSession(p, l.subject, l.level, Object.assign({
      gens: gens, max: gens.length, size: Math.max(6, Math.min(9, gens.length * 2)), ctx: ctxAt(lessonId),
      kind: "set", sets: ["set:" + lessonId], id: "set:" + lessonId, emoji: "🔁",
      title: function (lang) { return word("pathSetTitle", lang, { lesson: lessonTitle(l, lang) }); }
    }, opts || {}));
  };

  // The quiz after a lesson: the unit's generators mixed, 8 items.
  B.quizItem = function (lessonId) {
    var l = B.lessonById(lessonId);
    if (!l) return null;
    // A lesson for every garden (level null) is in each garden's path: look in each.
    var levels = l.level ? [l.level] : Object.keys(PATH_LEVELS), found = null;
    levels.forEach(function (lv) {
      found = found || B.practicePath(l.subject, lv).find(function (it) { return it.kind === "quiz" && it.after.id === lessonId; }) || null;
    });
    return found;
  };
  B.quizSession = function (p, lessonId, opts) {
    var q = B.quizItem(lessonId);
    if (!q) return null;
    return B.practiceSession(p, q.after.subject, q.after.level, Object.assign({
      gens: q.gens, max: Math.min(q.gens.length, 6), size: QUIZ_SIZE, ctx: ctxAt(lessonId),
      kind: "quiz", sets: [q.id], id: q.id, emoji: "⭐",
      title: function (lang) { return word("pathQuizTitle", lang); }
    }, opts || {}));
  };

  /* Sets due for review in a subject, most overdue first. A lesson that has a set but was done before sets existed
     follows its old review date (p.lessons[id].due) until its set is first played. */
  B.dueSets = function (p, subject, now) {
    now = now || Date.now();
    var out = [];
    B.LESSONS.forEach(function (l) {
      if (l.subject !== subject || (l.level && !B.inPath(l.level))) return;
      var r = p.practice && p.practice["set:" + l.id], lr = p.lessons[l.id];
      var due = r && r.done ? r.due : lr && lr.mastered && !r ? lr.due : null;
      if (due != null && due <= now && B.lessonGens(l.id).length) out.push({ lesson: l, due: due });
    });
    return out.sort(function (a, b) { return a.due - b.due; });
  };

  // One mixed review of the subject's due sets (the most overdue few), about 5 minutes.
  B.reviewSession = function (p, subject, opts) {
    var due = B.dueSets(p, subject).slice(0, REVIEW_SETS);
    if (!due.length) return null;
    var gens = [], latest = due[0].lesson;
    due.forEach(function (d) {
      B.lessonGens(d.lesson.id).forEach(function (g) { if (gens.indexOf(g) < 0) gens.push(g); });
      if (B.LESSONS.indexOf(d.lesson) > B.LESSONS.indexOf(latest)) latest = d.lesson;
    });
    return B.practiceSession(p, subject, latest.level, Object.assign({
      gens: gens, max: 4, size: REVIEW_SIZE, ctx: ctxAt(latest.id),
      kind: "review", sets: due.map(function (d) { return "set:" + d.lesson.id; }), id: "review-" + subject, emoji: "🔄",
      title: function (lang) { return word("pathReviewTitle", lang); }
    }, opts || {}));
  };

  /* After a set, review or quiz: the generators' records (B.recordPractice), then the set or quiz itself.
     A set is done when finished. A set played when due moves on (1, 3, 7, 14, 30, 60, 120 days), or one step back
     when more than a third was missed. A quiz keeps its best stars: 3 (90% right on the first try), 2 (60%), 1. */
  B.finishPractice = function (p, lesson, res) {
    B.recordPractice(p, lesson, res);
    var now = Date.now(), right = res.scored ? res.firstTry / res.scored : 1, out = {};
    (lesson.sets || []).forEach(function (id) {
      var rec = p.practice[id] = p.practice[id] || {};
      rec.n = (rec.n || 0) + 1;
      rec.at = now;
      if (lesson.kind === "quiz") {
        out.stars = right >= 0.9 ? 3 : right >= 0.6 ? 2 : 1;
        rec.done = true;
        rec.last = out.stars;
        rec.stars = Math.max(rec.stars || 0, out.stars);
        return;
      }
      // First time. A lesson mastered before sets existed keeps its place in the old review schedule (the same days).
      var lr = p.lessons[id.slice(4)];
      if (!rec.done) { rec.done = true; rec.box = lesson.kind === "review" && lr && lr.mastered ? Math.min((lr.box || 0) + 1, SET_DAYS.length - 1) : 0; }
      else if ((rec.due || 0) <= now) rec.box = right < 2 / 3 ? Math.max(0, (rec.box || 0) - 1) : Math.min((rec.box || 0) + 1, SET_DAYS.length - 1);
      else return; // played again before it was due: only the items count
      rec.due = now + SET_DAYS[rec.box] * DAY;
    });
    return out;
  };
})();
