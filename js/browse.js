/* باغچه — content browser (browse.html): every subject, garden, lesson and step, for teachers, parents and
   reviewers. It is separate from the children's app: there are no profiles, nothing is saved, and playing a
   lesson here never changes any child's progress. Planned lessons come from CURRICULUM.md when the mirror
   serves it (it is read the same way as tools/check-plan.js); without it only built lessons are shown. */
(function () {
  var el = B.el;
  var side = document.getElementById("browse-side");
  var pane = document.getElementById("browse-main");

  // No child is ever loaded here: the player gets a stand-in with only the lesson language, and saving is off.
  var viewer = { lessonLang: null };
  B.currentProfile = function () { return viewer; };
  B.save = function () {};

  var state = { subject: "", level: "", type: "", q: "", planned: true, en: false };
  var plan = null; // { rows: {id: row}, order: [ids], subjects: [{id, name}] }
  var STATUS = { "✅": "built", "🔨": "building", "⬜": "planned" };
  var ANY = "any"; // lessons for every garden (level null)

  // ---------- The plan (CURRICULUM.md and the subject files in curriculum/, read as one text) ----------
  function readPlan(text) {
    var p = { rows: {}, order: [], subjects: [], practice: {}, practiceOrder: [] }, subject = null, level = null, part = null;
    text.split("\n").forEach(function (line) {
      // "#### Objectives | Lessons | Practice": practice rows are not lessons.
      var h4 = /^#### (.*)$/.exec(line);
      if (h4) { part = h4[1].trim().toLowerCase(); return; }
      var h = /^(#{2,3}) (.*)$/.exec(line);
      if (h) {
        var tick = /`([^`]+)`\s*$/.exec(h[2]);
        if (h[1] === "##") {
          subject = tick && /subject `/.test(h[2]) ? tick[1] : null;
          level = null;
          part = null;
          if (subject) p.subjects.push({ id: subject, name: h[2].split(" — ")[0].trim() });
        } else { level = tick ? tick[1] : undefined; part = null; }
        return;
      }
      var row = /^\|\s*(✅|🔨|⬜)\s*\|\s*`([^`]+)`\s*\|/.exec(line);
      if (!row || !subject || level === undefined) return;
      var cells = line.split("|").map(function (c) { return c.trim(); });
      // "| St | Id | Practice | What it makes | Objectives |": a practice generator (js/practice.js).
      if (part === "practice") {
        if (!p.practice[row[2]]) p.practiceOrder.push(row[2]);
        p.practice[row[2]] = { status: STATUS[row[1]], subject: subject, level: level || ANY, title: cells[3], makes: cells[4] || "", objectives: cells[5] || "" };
        return;
      }
      if (p.rows[row[2]]) return;
      p.rows[row[2]] = { status: STATUS[row[1]], subject: subject, level: level || ANY, title: cells[3], covers: cells[4] || "", types: cells[5] || "",
        objectives: cells[6] || "", depth: cells[7] || "" };
      p.order.push(row[2]);
    });
    return p.order.length ? p : null;
  }

  // ---------- Entries: built lessons and planned rows, in the order children see them ----------
  function levelKey(l) { return l.level || ANY; }
  function subjects() {
    var list = B.SUBJECTS.slice();
    if (plan) plan.subjects.forEach(function (s) {
      if (!B.subjectById(s.id)) list.push({ id: s.id, name: s.name, emoji: "📋", leveled: true, planned: true });
    });
    return list;
  }
  function levelKeys() { return B.LEVELS.map(function (l) { return l.id; }).concat([ANY]); }

  var ENTRIES = null;
  function entries() {
    if (ENTRIES) return ENTRIES;
    var list = [];
    subjects().forEach(function (sub) {
      levelKeys().forEach(function (lv) {
        var seen = {};
        if (plan) plan.order.forEach(function (id) {
          var r = plan.rows[id];
          if (r.subject !== sub.id || r.level !== lv) return;
          seen[id] = true;
          list.push(entry(id, sub.id, lv, B.lessonById(id), r));
        });
        B.LESSONS.forEach(function (l) {
          if (l.subject === sub.id && levelKey(l) === lv && !seen[l.id]) list.push(entry(l.id, sub.id, lv, l, null));
        });
        // Then the garden's practice generators: the plan's rows, and any registered generator not in it.
        if (plan) plan.practiceOrder.forEach(function (id) {
          var r = plan.practice[id];
          if (r.subject !== sub.id || r.level !== lv) return;
          seen[id] = true;
          list.push(practiceEntry(id, sub.id, lv, B.practiceById(id), r));
        });
        B.PRACTICE.forEach(function (g) {
          if (g.subject === sub.id && (g.level || ANY) === lv && !seen[g.id]) list.push(practiceEntry(g.id, sub.id, lv, g, null));
        });
      });
    });
    ENTRIES = list;
    return list;
  }
  function entry(id, subject, level, lesson, row) {
    var words = [id, row ? row.title + " " + row.covers + " " + row.types : ""];
    if (lesson) {
      collect(lesson.title, words);
      collect(lesson.steps, words);
      if (B.hasEnglish(lesson)) collect(B.EN[lesson.id], words);
    }
    return { id: id, subject: subject, level: level, lesson: lesson || null, row: row,
      title: lesson ? lesson.title : row.title, emoji: lesson ? lesson.emoji : "⬜", text: norm(words.join(" ")) };
  }
  // Off-screen activities that build a practice row (js/activities.js, `practice: "<row id>"`).
  function activitiesFor(id) {
    return [].concat.apply([], Object.keys(B.ACTIVITIES || {}).map(function (k) { return B.ACTIVITIES[k]; }))
      .filter(function (a) { return a.practice === id; });
  }
  function practiceEntry(id, subject, level, gen, row) {
    var acts = activitiesFor(id);
    var words = [id, row ? row.title + " " + row.makes : "", gen ? gen.title : ""].concat(acts.map(function (a) { return a.text; }));
    return { id: id, kind: "practice", subject: subject, level: level, lesson: null, gen: gen || null, row: row, acts: acts,
      built: !!gen || acts.length > 0,
      title: gen ? gen.title : row.title, emoji: gen ? gen.emoji : acts.length ? "🏡" : "⬜", text: norm(words.join(" ")) };
  }
  function collect(v, out) {
    if (v == null) return;
    if (typeof v !== "object") { out.push(String(v)); return; }
    Object.keys(v).forEach(function (k) { if (k !== "type") collect(v[k], out); });
  }
  // Search ignores short vowels, half-spaces and Arabic forms of ی and ک.
  function norm(s) {
    return String(s).toLowerCase().replace(/[ً-ْٰ]/g, "").replace(/‌/g, " ")
      .replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); });
  }

  function matches(e) {
    if (!state.planned && !e.lesson && !e.built) return false;
    if (state.subject && e.subject !== state.subject) return false;
    if (state.level && e.level !== state.level && e.level !== ANY) return false;
    if (state.type && !(e.lesson && e.lesson.steps.some(function (s) { return s.type === state.type; }))) return false;
    if (state.type && e.kind === "practice") return false;
    if (state.q) return norm(state.q).split(/\s+/).filter(Boolean).every(function (w) { return e.text.indexOf(w) !== -1; });
    return true;
  }

  function subjectOf(id) { return subjects().find(function (s) { return s.id === id; }) || { id: id, name: id, emoji: "📋" }; }
  function levelName(lv) {
    if (lv === ANY) return B.t("browseEveryGarden");
    var l = B.levelById(lv);
    return l ? l.emoji + " " + l.name : lv;
  }
  function badge(lv) { return el("span", { class: "garden-badge lvl-" + lv, text: levelName(lv) }); }
  function statusOf(e) { return e.row ? e.row.status : "built"; }
  function statusMark(e) { return { built: "✅", building: "🔨", planned: "⬜" }[statusOf(e)]; }
  function statusName(e) { return B.t({ built: "browseBuilt", building: "browseBuilding", planned: "browsePlannedOne" }[statusOf(e)]); }
  function code(t) { return el("code", { dir: "ltr", text: t }); }
  function stop() { if ("speechSynthesis" in window) speechSynthesis.cancel(); B.leaveEnglish(); }

  // ---------- Side: filters and the list ----------
  var list = el("nav", { class: "browse-list", "aria-label": B.t("browseTitle") });
  var count = el("p", { class: "hint", "aria-live": "polite" });

  function select(label, value, options, onchange) {
    var s = el("select", { "aria-label": label });
    options.forEach(function (o) {
      var opt = el("option", { value: o[0], text: o[1] });
      if (o[0] === value) opt.selected = true;
      s.appendChild(opt);
    });
    s.addEventListener("change", function () { onchange(s.value); renderList(); });
    return s;
  }

  function stepTypes() {
    var n = {};
    B.LESSONS.forEach(function (l) { l.steps.forEach(function (s) { n[s.type] = (n[s.type] || 0) + 1; }); });
    return n;
  }

  function renderSide() {
    side.innerHTML = "";
    var q = el("input", { type: "search", value: state.q, placeholder: B.t("browseSearchPlaceholder"), "aria-label": B.t("browseSearch") });
    q.addEventListener("input", function () { state.q = q.value; renderList(); });
    var types = stepTypes();
    var planned = el("input", { type: "checkbox" });
    planned.checked = state.planned;
    planned.addEventListener("change", function () { state.planned = planned.checked; renderList(); });
    side.appendChild(el("div", { class: "browse-filters" }, [
      q,
      select(B.t("browseAllSubjects"), state.subject, [["", B.t("browseAllSubjects")]].concat(subjects().map(function (s) { return [s.id, s.emoji + " " + s.name]; })),
        function (v) { state.subject = v; }),
      select(B.t("browseAllGardens"), state.level, [["", B.t("browseAllGardens")]].concat(B.LEVELS.map(function (l) { return [l.id, l.emoji + " " + l.name]; })),
        function (v) { state.level = v; }),
      select(B.t("browseAllTypes"), state.type, [["", B.t("browseAllTypes")]].concat(Object.keys(types).sort().map(function (t) { return [t, t + " (" + B.fa(types[t]) + ")"]; })),
        function (v) { state.type = v; }),
      plan ? el("label", { class: "browse-check" }, [planned, " " + B.t("browsePlanned")]) : null
    ]));
    side.appendChild(count);
    side.appendChild(list);
    renderList();
  }

  function renderList() {
    list.innerHTML = "";
    var shown = entries().filter(matches), steps = 0, group = null, sub = null;
    var current = currentId();
    shown.forEach(function (e) {
      if (e.subject !== sub) {
        sub = e.subject; group = null;
        var s = subjectOf(sub);
        list.appendChild(el("h2", { text: s.emoji + " " + s.name }));
      }
      if (e.level !== group) {
        group = e.level;
        list.appendChild(el("h3", { text: levelName(group) }));
      }
      if (e.lesson) steps += e.lesson.steps.length;
      var practice = e.kind === "practice";
      var a = el("a", { href: (practice ? "#/practice/" : "#/lesson/") + e.id, class: (e.lesson || e.built ? "" : "planned") + (practice ? " practice" : "") }, [
        el("span", { class: "emoji", text: e.emoji }),
        el("span", { class: "t", text: e.title }),
        el("small", { dir: "ltr", text: e.id })
      ]);
      if (e.id === current) a.setAttribute("aria-current", "page");
      list.appendChild(a);
    });
    var built = shown.filter(function (e) { return e.lesson; }).length;
    var gens = shown.filter(function (e) { return e.built; }).length;
    count.textContent = shown.length ? B.t("browseCount", { n: B.fa(built), s: B.fa(steps) }) + (gens ? " · " + B.t("browsePracticeList") + " " + B.fa(gens) : "") : B.t("browseNone");
  }

  function currentId() {
    var m = /^#\/(?:lesson|practice)\/(.+)$/.exec(location.hash);
    return m ? decodeURIComponent(m[1]) : null;
  }

  // ---------- Overview ----------
  function viewOverview() {
    pane.innerHTML = "";
    pane.appendChild(el("h1", { text: B.t("browseTitle") }));
    pane.appendChild(el("p", { class: "lead", text: B.t("browseLead") }));
    if (!plan) pane.appendChild(el("p", { class: "note warn", text: B.t("browseNoPlan") }));

    pane.appendChild(el("h2", { text: B.t("browseOverview") }));
    pane.appendChild(el("p", { class: "hint", text: B.t("browseOverviewHint") }));
    var all = entries().filter(function (e) { return e.kind !== "practice"; }), keys = levelKeys().filter(function (lv) { return all.some(function (e) { return e.level === lv; }); });
    var head = el("tr", null, [el("th")].concat(keys.map(function (lv) { return el("th", { text: levelName(lv) }); })));
    var body = subjects().map(function (s) {
      return el("tr", null, [el("th", { text: s.emoji + " " + s.name })].concat(keys.map(function (lv) {
        var here = all.filter(function (e) { return e.subject === s.id && e.level === lv; });
        if (!here.length) return el("td", { class: "empty", text: "·" });
        var built = here.filter(function (e) { return e.lesson; }).length, planned = here.length - built;
        return el("td", null, [el("button", { type: "button", onclick: function () {
          state.subject = s.id; state.level = lv === ANY ? "" : lv; state.type = ""; state.q = "";
          renderSide();
          list.scrollIntoView({ block: "start" });
        } }, [el("strong", { text: B.fa(built) }), planned ? el("small", { text: " + " + B.fa(planned) }) : null])]);
      })));
    });
    pane.appendChild(el("div", { class: "browse-table" }, [el("table", null, [el("thead", null, [head]), el("tbody", null, body)])]));

    var types = stepTypes();
    pane.appendChild(el("h2", { text: B.t("browseAllTypes") }));
    pane.appendChild(el("div", { class: "chips" }, Object.keys(types).sort().map(function (t) {
      return el("button", { type: "button", class: "chip", onclick: function () {
        state.type = t; renderSide(); list.scrollIntoView({ block: "start" });
      } }, [code(t), " " + B.fa(types[t])]);
    })));

    pane.appendChild(el("h2", { text: B.t("browseOther") }));
    pane.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn secondary", href: "#/placement", text: "🧭 " + B.t("browsePlacement") }),
      el("a", { class: "btn secondary", href: "#/activities", text: "🏡 " + B.t("browseActivities") })
    ]));
  }

  // ---------- One lesson ----------
  function viewLesson(id) {
    var e = entries().find(function (x) { return x.id === id; });
    if (!e) return viewOverview();
    pane.innerHTML = "";
    var sub = subjectOf(e.subject);
    var hasEn = e.lesson && B.hasEnglish(e.lesson);
    var en = hasEn && state.en;
    var lesson = e.lesson && (en ? B.englishLesson(e.lesson) : e.lesson);

    pane.appendChild(el("div", { class: "row" }, [el("a", { class: "btn quiet", href: "#/", text: B.t("browseBack") })]));
    pane.appendChild(el("h1", { class: "browse-h1" }, [e.emoji + " ", el("span", en ? { lang: "en", dir: "ltr", text: lesson.title } : { text: e.title })]));
    pane.appendChild(el("p", { class: "row browse-meta" }, [
      code(e.id), el("span", { text: sub.emoji + " " + sub.name }), badge(e.level),
      el("span", { text: statusMark(e) + " " + statusName(e) }),
      e.lesson ? el("span", { text: B.t("browseSteps", { n: B.fa(e.lesson.steps.length) }) }) : null
    ]));
    if (e.row) {
      pane.appendChild(el("dl", { class: "fields plan" }, [
        el("dt", { text: B.t("browseCovers") }), el("dd", { dir: "auto", text: e.row.covers }),
        el("dt", { text: B.t("browseTypes") }), el("dd", { dir: "auto", text: e.row.types.replace(/`/g, "") })
      ]));
    }
    if (!e.lesson) {
      pane.appendChild(el("p", { class: "note", text: B.t("browseNotBuilt") }));
      return;
    }
    var copied = el("span", { class: "hint", "aria-live": "polite" });
    pane.appendChild(el("div", { class: "row" }, [
      el("button", { class: "btn", type: "button", text: B.t("browsePlay"), onclick: function () { play(e, 0); } }),
      hasEn ? el("button", { class: "btn secondary", type: "button", "aria-pressed": en ? "true" : "false",
        text: B.t(en ? "browseShowPersian" : "browseShowEnglish"),
        onclick: function () { state.en = !en; viewLesson(id); } }) : null,
      el("button", { class: "btn quiet", type: "button", text: "🔗 " + B.t("browseCopyLink"), onclick: function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(location.href).then(function () { copied.textContent = B.t("browseCopied"); }, function () {});
        }
      } }),
      copied
    ]));

    var stepsBox = el("ol", { class: "browse-steps" });
    if (en) { stepsBox.setAttribute("lang", "en"); stepsBox.setAttribute("dir", "ltr"); }
    lesson.steps.forEach(function (s, i) {
      stepsBox.appendChild(el("li", { class: "card browse-step" }, [
        el("div", { class: "row" }, [
          el("strong", { text: B.t("browseStep", { n: B.fa(i + 1) }) }), code(s.type),
          el("span", { class: "spacer" }),
          el("button", { class: "btn quiet", type: "button", text: B.t("browsePlayFrom"), onclick: function () { play(e, i); } })
        ]),
        fields(s),
        el("details", null, [el("summary", { text: B.t("browseRaw") }), el("pre", { dir: "ltr", text: JSON.stringify(s, null, 2) })])
      ]));
    });
    pane.appendChild(stepsBox);
    pathParts(e);
  }

  /* In Seed, Sprout and Sapling: the lesson's practice set (every generator listed for it, made from this lesson and
     the ones before it) and, when one comes after it, the unit quiz (js/practice.js, "Practice in the course"). */
  function pathParts(e) {
    var l = e.lesson;
    if (!B.lessonGens || !(B.inPath(l.level) || (!l.level && e.level === ANY))) return;
    var gens = B.lessonGens(l.id), back = function () { viewLesson(e.id); };
    var genLink = function (g) { return el("li", null, [el("a", { href: "#/practice/" + g.id, text: g.emoji + " " + g.title }), " ", el("small", { dir: "ltr", text: g.id })]); };
    pane.appendChild(el("h2", { text: "🔁 " + B.t("browsePathSet") }));
    if (!gens.length) pane.appendChild(el("p", { class: "note warn", text: B.t("browsePathNoSet") }));
    else {
      pane.appendChild(el("p", { class: gens.length < B.PRACTICE_MIN ? "note warn" : "hint", text: B.t("browsePathSetHint", { min: B.fa(B.PRACTICE_MIN) }) }));
      pane.appendChild(el("ul", { class: "browse-activities" }, gens.map(genLink)));
      pane.appendChild(el("button", { class: "btn secondary", type: "button", text: B.t("browsePlaySet"), onclick: function () {
        play(e, 0, B.setSession(null, l.id), back);
      } }));
    }
    var q = B.quizItem(l.id);
    if (!q) return;
    pane.appendChild(el("h2", { text: "⭐ " + B.t("browsePathQuiz") }));
    pane.appendChild(el("p", { class: "hint", text: B.t("browsePathQuizHint", { list: q.lessons.map(function (id) { return B.lessonById(id).title; }).join("، ") }) }));
    pane.appendChild(el("ul", { class: "browse-activities" }, q.gens.map(genLink)));
    pane.appendChild(el("button", { class: "btn secondary", type: "button", text: B.t("browsePlayQuiz"), onclick: function () {
      play(e, 0, B.quizSession(null, l.id), back);
    } }));
  }

  // ---------- One practice generator (js/practice.js): a fresh sample, made for a chosen point in the lessons ----------
  var sample = { id: null, seed: 0, upTo: "" };
  function viewPractice(id) {
    var e = entries().find(function (x) { return x.kind === "practice" && x.id === id; });
    if (!e) return viewOverview();
    if (sample.id !== id) sample = { id: id, seed: 0, upTo: "" };
    if (!sample.seed) sample.seed = Math.floor(Math.random() * 4294967296);
    pane.innerHTML = "";
    var sub = subjectOf(e.subject), gen = e.gen;
    var hasEn = gen && B.practiceHasEnglish(gen), en = hasEn && state.en;
    var title = en && B.EN[gen.id].title || e.title;
    pane.appendChild(el("div", { class: "row" }, [el("a", { class: "btn quiet", href: "#/", text: B.t("browseBack") })]));
    pane.appendChild(el("h1", { class: "browse-h1" }, [e.emoji + " ", el("span", en ? { lang: "en", dir: "ltr", text: title } : { text: title })]));
    pane.appendChild(el("p", { class: "row browse-meta" }, [
      code(e.id), el("span", { text: sub.emoji + " " + sub.name }), badge(e.level),
      el("span", { text: statusMark(e) + " " + statusName(e) }), el("span", { text: !gen && e.acts.length ? "🏡 " + B.t("browseActivities") : "🔁 " + B.t("browsePracticeKind") })
    ]));
    var lessonTitle = function (lid) { var l = B.lessonById(lid); return l ? l.title + " (" + lid + ")" : lid; };
    pane.appendChild(el("dl", { class: "fields plan" }, [
      e.row ? el("dt", { text: B.t("browseMakes") }) : null, e.row ? el("dd", { dir: "auto", text: e.row.makes.replace(/`/g, "") }) : null,
      el("dt", { text: B.t("browseObjectives") }), el("dd", { dir: "ltr", text: e.row ? e.row.objectives : gen.objectives.join(", ") }),
      gen && gen.needs && gen.needs.length ? el("dt", { text: B.t("browseNeeds") }) : null,
      gen && gen.needs && gen.needs.length ? el("dd", { text: gen.needs.map(lessonTitle).join("، ") }) : null
    ]));
    if (e.acts.length) {
      pane.appendChild(el("h2", { text: "🏡 " + B.t("browseActivities") }));
      pane.appendChild(el("ul", { class: "browse-activities" }, e.acts.map(function (a) {
        return el("li", null, [a.text, " ", el("small", { dir: "ltr", text: a.id })]);
      })));
    }
    if (!gen) { if (!e.acts.length) pane.appendChild(el("p", { class: "note", text: B.t("browsePracticeNotBuilt") })); return; }
    pane.appendChild(el("p", { class: "hint", text: B.t("browsePracticeLead") }));

    // What the child has done: every lesson of the subject up to a chosen one (by default, to the end of this garden).
    var top = gen.level ? B.LEVELS.findIndex(function (l) { return l.id === gen.level; }) : B.LEVELS.length;
    var upTo = B.LESSONS.filter(function (l) {
      return l.subject === gen.subject && (!l.level || B.LEVELS.findIndex(function (x) { return x.id === l.level; }) <= top);
    });
    var pickUpTo = el("select", { "aria-label": B.t("browseUpTo") });
    [["", B.t("browseUpToAll")]].concat(upTo.map(function (l) { return [l.id, l.id + " · " + l.title]; })).forEach(function (o) {
      var opt = el("option", { value: o[0], text: o[1] });
      if (o[0] === sample.upTo) opt.selected = true;
      pickUpTo.appendChild(opt);
    });
    pickUpTo.addEventListener("change", function () { sample.upTo = pickUpTo.value; viewPractice(id); });
    pane.appendChild(el("label", { class: "browse-upto" }, [B.t("browseUpTo") + ": ", pickUpTo]));

    var last = upTo.length ? upTo[upTo.length - 1].id : null;
    var ctx = B.practiceContext(null, gen.subject, { upTo: sample.upTo || last, level: gen.level });
    var missing = B.practiceMissing(gen, ctx);
    if (missing.length) { pane.appendChild(el("p", { class: "note warn", text: B.t("browseLockedHere", { list: missing.map(lessonTitle).join("، ") }) })); return; }
    var lesson = B.practiceSession(null, gen.subject, gen.level, { only: id, ctx: ctx, seed: sample.seed });
    if (!lesson) { pane.appendChild(el("p", { class: "note warn", text: B.t("browseNoItems") })); return; }
    var shown = en ? lesson.english() : lesson;
    pane.appendChild(el("div", { class: "row" }, [
      el("button", { class: "btn", type: "button", text: B.t("browseSample"), onclick: function () { play(e, 0, lesson); } }),
      el("button", { class: "btn secondary", type: "button", text: B.t("browseSampleNew"), onclick: function () { sample.seed = 0; viewPractice(id); } }),
      hasEn ? el("button", { class: "btn secondary", type: "button", "aria-pressed": en ? "true" : "false",
        text: B.t(en ? "browseShowPersian" : "browseShowEnglish"), onclick: function () { state.en = !en; viewPractice(id); } }) : null
    ]));
    pane.appendChild(el("h2", { text: B.t("browseSampleSteps") }));
    var stepsBox = el("ol", { class: "browse-steps" });
    if (en) { stepsBox.setAttribute("lang", "en"); stepsBox.setAttribute("dir", "ltr"); }
    shown.steps.forEach(function (s, i) {
      stepsBox.appendChild(el("li", { class: "card browse-step" }, [
        el("div", { class: "row" }, [el("strong", { text: B.t("browseStep", { n: B.fa(i + 1) }) }), code(s.type)]),
        fields(s),
        el("details", null, [el("summary", { text: B.t("browseRaw") }), el("pre", { dir: "ltr", text: JSON.stringify(s, null, 2) })])
      ]));
    });
    pane.appendChild(stepsBox);
  }

  // ---------- Showing a step's data ----------
  var HIDE = { type: 1, en: 1, at: 1, bg: 1, tall: 1, stack: 1 };
  var FACE = { label: 1, pic: 1, dots: 1, say: 1, basket: 1, color: 1, en: 1, value: 1, emoji: 1, name: 1, price: 1, len: 1, thing: 1, yes: 1, audio: 1, show: 1 };

  function label(k) {
    var name = (B.T.browseFields || {})[k];
    return el("dt", { title: k, text: name || k });
  }
  function prim(v) { return v == null || typeof v !== "object"; }
  function txt(v) { return typeof v === "number" ? (state.en ? String(v) : B.fa(v)) : String(v); }
  function isFace(o) { return o && typeof o === "object" && !Array.isArray(o) && Object.keys(o).every(function (k) { return FACE[k]; }); }
  function isAnswer(o, ans) {
    if (ans === undefined) return false;
    if (prim(o)) return String(o) === String(ans);
    if ("value" in o) return String(o.value) === String(ans);
    return ["label", "pic", "color", "dots"].some(function (f) { return o[f] != null && String(o[f]) === String(ans); });
  }

  function face(o) {
    if (prim(o)) return el("span", { dir: "auto", text: txt(o) });
    var parts = [];
    if (o.color) parts.push(el("span", { class: "swatch", style: "background:" + o.color, title: o.color }));
    if (o.pic || o.emoji || o.thing) parts.push(el("span", { class: "pic", text: o.pic || o.emoji || o.thing }));
    if (o.label != null) parts.push(el("span", { dir: "auto", text: txt(o.label) }));
    if (o.name) parts.push(el("span", { dir: "auto", text: o.name }));
    if (o.en) parts.push(el("span", { lang: "en", dir: "ltr", text: o.en }));
    if (o.show) parts.push(el("span", { dir: "auto", text: txt(o.show) }));
    if (o.dots) parts.push(el("span", { class: "dots", text: "●".repeat(Math.min(o.dots, 20)) }));
    if (o.price != null) parts.push(el("small", { text: txt(o.price) }));
    if (o.len != null) parts.push(el("small", { text: "↔ " + txt(o.len) }));
    if (o.yes !== undefined) parts.push(el("small", { text: o.yes ? "✓" : "✗" }));
    if (o.basket != null) parts.push(el("small", { text: "← " + txt(o.basket) }));
    if (o.value != null && o.value !== o.label) parts.push(el("small", { dir: "auto", text: "= " + txt(o.value) }));
    if (o.say) parts.push(el("small", { dir: "auto", text: "🔊 " + o.say }));
    if (o.audio) parts.push(el("small", { dir: "ltr", text: "🎵 " + o.audio }));
    return el("span", { class: "face" }, parts);
  }

  function chips(arr, mark) {
    return el("span", { class: "chips" }, arr.map(function (v, i) {
      return el("span", { class: "chip" + (mark && mark(v, i) ? " answer" : "") }, [
        Array.isArray(v) ? el("span", { dir: "auto", text: v.map(function (x) { return prim(x) ? txt(x) : (x.pic || x.label || x.en || JSON.stringify(x)); }).join(" ↔ ") }) : face(v)
      ]);
    }));
  }

  function value(v, k, owner) {
    if (typeof v === "boolean") return document.createTextNode(v ? "✓" : "✗");
    if (prim(v)) return el("span", { dir: "auto", class: k === "text" || k === "caption" ? "long" : null, text: txt(v) });
    if (Array.isArray(v)) {
      var mark = null;
      if (k === "options") mark = function (o) { return isAnswer(o, owner.answer); };
      if (k === "seq" && owner.type === "pattern") {
        var blanks = owner.blanks || [v.length - 1];
        mark = function (o, i) { return blanks.indexOf(i) !== -1; };
      }
      if (v.every(function (x) { return prim(x) || Array.isArray(x) || isFace(x); })) return chips(v, mark);
      // A list of bigger things (scenes, tasks, a program to fix): one block each.
      return el("ol", { class: "sub" }, v.map(function (x) { return el("li", null, [prim(x) ? value(x, k, owner) : fields(x)]); }));
    }
    if (k === "cast") return chips(Object.keys(v).map(function (id) { return id + " = " + v[id]; }));
    if (isFace(v)) return face(v);
    return fields(v);
  }

  function fields(obj) {
    var dl = el("dl", { class: "fields" });
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (HIDE[k] || v == null || v === "") return;
      dl.appendChild(label(k));
      dl.appendChild(el("dd", { class: k === "answer" ? "answer" : null }, [value(v, k, obj)]));
    });
    return dl;
  }

  // ---------- Playing a lesson (nothing is saved) ----------
  function play(e, start, lesson, onBack) {
    stop();
    viewer.lessonLang = state.en ? "en" : null;
    var stage = el("div", { class: "browse-play" });
    pane.innerHTML = "";
    pane.appendChild(stage);
    function back() { stop(); state.en = viewer.lessonLang === "en"; if (onBack) onBack(); else if (lesson) viewPractice(e.id); else viewLesson(e.id); }
    B.playLesson(lesson || e.lesson, stage, function (res) {
      stop();
      stage.innerHTML = "";
      var done = lesson ? "browsePracticeFinished" : "browseFinished";
      stage.appendChild(el("div", { class: "lesson" }, [
        el("p", { class: "celebrate", text: "🎉" }),
        el("p", { class: "prompt", text: res.scored ? B.t(done, { first: B.fa(res.firstTry), scored: B.fa(res.scored) }) : B.t("browseFinishedNoScore") }),
        el("div", { class: "row", style: "justify-content:center" }, [
          el("button", { class: "btn", type: "button", text: B.t(lesson ? "browseSampleNew" : "browsePlay"), onclick: function () {
            if (onBack) back(); else if (lesson) { sample.seed = 0; state.en = viewer.lessonLang === "en"; viewPractice(e.id); } else play(e, 0);
          } }),
          el("button", { class: "btn secondary", type: "button", text: B.t("browseBack"), onclick: back })
        ])
      ]));
    }, back, start);
    pane.scrollIntoView({ block: "start" });
  }

  // ---------- Outside lessons: placement check and daily activities ----------
  function viewPlacement() {
    pane.innerHTML = "";
    pane.appendChild(el("div", { class: "row" }, [el("a", { class: "btn quiet", href: "#/", text: B.t("browseBack") })]));
    pane.appendChild(el("h1", { text: "🧭 " + B.t("browsePlacement") }));
    pane.appendChild(el("p", { class: "hint", text: B.t("browsePlacementHint") }));
    Object.keys(B.PLACEMENT).forEach(function (sid) {
      var stages = B.PLACEMENT[sid];
      if (!Array.isArray(stages)) return;
      var sub = subjectOf(sid);
      pane.appendChild(el("h2", { text: sub.emoji + " " + sub.name }));
      pane.appendChild(el("ol", { class: "browse-steps" }, stages.map(function (st) {
        return el("li", { class: "card browse-step" }, [
          el("strong", { text: st.title }),
          el("p", { text: st.ask }),
          st.text ? el("p", { class: "passage", text: st.text }) : chips(st.items || []),
          el("p", { class: "hint" }, [B.t("browseIfNot", { garden: "" }), badge(st.ifNot)])
        ]);
      })));
    });
  }

  function viewActivities() {
    pane.innerHTML = "";
    pane.appendChild(el("div", { class: "row" }, [el("a", { class: "btn quiet", href: "#/", text: B.t("browseBack") })]));
    pane.appendChild(el("h1", { text: "🏡 " + B.t("browseActivities") }));
    pane.appendChild(el("p", { class: "hint", text: B.t("browseActivitiesHint") }));
    B.LEVELS.map(function (l) { return l.id; }).concat([ANY]).forEach(function (lv) {
      var items = (B.ACTIVITIES || {})[lv];
      if (!items || !items.length) return;
      pane.appendChild(el("h2", null, [badge(lv)]));
      pane.appendChild(el("ul", { class: "browse-activities" }, items.map(function (a) {
        return el("li", null, [a.text, " ", el("small", { dir: "ltr", text: a.id })]);
      })));
    });
  }

  // ---------- Routes ----------
  function route() {
    stop();
    var h = location.hash, id = currentId();
    if (id && /^#\/practice\//.test(h)) viewPractice(id);
    else if (id) viewLesson(id);
    else if (h === "#/placement") viewPlacement();
    else if (h === "#/activities") viewActivities();
    else viewOverview();
    renderList();
    var cur = list.querySelector('[aria-current="page"]');
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
    window.scrollTo(0, 0);
  }

  function start() {
    ENTRIES = null;
    renderSide();
    route();
  }
  window.addEventListener("hashchange", route);
  // The plan is optional: a mirror or app without CURRICULUM.md (or a page opened from a file) shows built lessons only.
  if (location.protocol === "file:" || !window.fetch) start();
  else {
    var get = function (f) { return fetch(f).then(function (r) { return r.ok ? r.text() : ""; }, function () { return ""; }); };
    // CURRICULUM.md links each subject's plan file (curriculum/<subject>.md) from its subjects table.
    get("CURRICULUM.md").then(function (main) {
      var files = [], m, re = /\]\((curriculum\/[\w-]+\.md)\)/g;
      while ((m = re.exec(main))) if (files.indexOf(m[1]) === -1) files.push(m[1]);
      return Promise.all(files.map(get)).then(function (parts) { return [main].concat(parts).join("\n"); });
    }).then(function (t) { plan = t ? readPlan(t) : null; }, function () {}).then(start);
  }
})();
