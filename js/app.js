/* باغچه — the children's app: profiles, gardens, lessons, spaced review, placement. Hash routes, no server. */
(function () {
  var el = B.el;
  var app = document.getElementById("app");
  var AVATARS = ["🦊", "🐢", "🦁", "🐼", "🐧", "🦋", "🐬", "🦉", "🐝", "🐿️", "🦄", "🐞"];
  var DAY = 24 * 60 * 60 * 1000;
  var REVIEW_DAYS = [1, 3, 7, 14, 30]; // spaced review intervals
  var MASTERY = 0.8; // share of answers right on the first try

  function go(hash) { location.hash = hash; }
  function clear() { app.innerHTML = ""; window.scrollTo(0, 0); }
  function badge(levelId) {
    var l = B.levelById(levelId);
    return el("span", { class: "garden-badge lvl-" + l.id }, [l.emoji + " " + B.t("garden", { name: l.name })]);
  }

  // Paired with the home hub, or the hub itself (js/sync.js).
  function synced() { return !!(B.sync && B.sync.available && B.sync.paired()); }

  // Whole-lesson reviews, for lessons that have no practice set yet (the others come back as practice: js/practice.js).
  function dueReviews(p) {
    var now = Date.now();
    return Object.keys(p.lessons).filter(function (id) {
      var r = p.lessons[id];
      return r.mastered && r.due <= now && B.lessonById(id) && !(B.lessonGens && B.lessonGens(id).length);
    });
  }
  // Subjects with practice sets due for review: one mixed «مرور» each.
  function dueReviewSubjects(p) {
    return B.dueSets ? B.SUBJECTS.filter(function (s) { return B.dueSets(p, s.id).length; }) : [];
  }
  function reviewTile(p, s) {
    return el("a", { class: "tile review-tile", href: "#/review/" + s.id }, [
      el("span", { class: "big", text: "🔄" }),
      el("span", { class: "name", text: B.t("pathReviewTitle") + ": " + s.name }),
      el("span", { class: "sub", text: B.t("pathReviewSub", { n: B.fa(Math.min(B.dueSets(p, s.id).length, 4)) }) })
    ]);
  }

  // ---------- Profiles ----------
  function viewProfiles() {
    clear();
    var s = B.load();
    if (!s.profiles.length) return viewNewProfile(true);
    if (B.backupDue()) {
      app.appendChild(el("p", { class: "note warn" }, ["💾 " + B.t("backupReminder") + " ", el("a", { href: "#/backup", text: B.t("backupReminderLink") })]));
    }
    app.appendChild(el("h1", { text: B.t("whoIsLearning") }));
    var grid = el("div", { class: "grid" });
    s.profiles.forEach(function (p) {
      grid.appendChild(el("button", { class: "tile", type: "button", onclick: function () { s.current = p.id; B.save(); go("#/home"); } }, [
        el("span", { class: "big", text: p.avatar }), el("span", { class: "name", text: p.name })
      ]));
    });
    grid.appendChild(el("a", { class: "tile", href: "#/new" }, [el("span", { class: "big", text: "➕" }), el("span", { class: "name", text: B.t("addChild") })]));
    app.appendChild(grid);
    app.appendChild(el("p", { class: "hint" }, [B.t(synced() ? "privacyNoteSynced" : "privacyNote"), el("a", { href: "policies.html#privacy", text: B.t("aboutPrivacy") })]));
    app.appendChild(el("p", { class: "row" }, [
      el("a", { href: "#/backup", text: B.t("backupLink") }),
      B.sync && B.sync.available ? el("a", { href: "#/sync", text: B.t("syncLink") }) : null
    ]));
  }

  function viewNewProfile(first) {
    clear();
    var avatar = AVATARS[0];
    if (first) {
      app.appendChild(el("div", { class: "card prose", style: "margin-bottom:20px" }, [
        el("h1", { text: B.t("welcomeTitle") }),
        el("p", { class: "lead", text: B.t("welcomeLead") }),
        el("p", null, [B.t("welcomeGuideBefore"), el("a", { href: "guide.html", text: B.t("welcomeGuideLink") }), B.t("welcomeGuideAfter")]),
        el("p", { class: "hint" }, [B.t("backupHaveOne"), el("a", { href: "#/backup", text: B.t("backupRestoreHere") })]),
        B.sync && B.sync.available && !B.sync.isHub ? el("p", { class: "hint" }, [B.t("syncHaveHub"), el("a", { href: "#/sync", text: B.t("syncConnectHere") })]) : null
      ]));
    }
    app.appendChild(el("h2", { text: B.t("childName") }));
    var name = el("input", { type: "text", maxlength: "20", placeholder: B.t("childNamePlaceholder"), "aria-label": B.t("childName") });
    app.appendChild(name);
    app.appendChild(el("p", { class: "hint", text: B.t("childNameHint") }));
    app.appendChild(el("h2", { text: B.t("pickPicture") }));
    var av = el("div", { class: "avatars" });
    AVATARS.forEach(function (a) {
      av.appendChild(el("button", { type: "button", "aria-pressed": a === avatar ? "true" : "false", text: a, onclick: function (e) {
        avatar = a;
        Array.prototype.forEach.call(av.children, function (b) { b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"); });
      } }));
    });
    app.appendChild(av);
    app.appendChild(el("div", { class: "row", style: "margin-top:24px" }, [
      el("button", { class: "btn", type: "button", text: B.t("create"), onclick: function () {
        var s = B.load();
        var p = { id: String(Date.now()), name: name.value.trim() || avatar, avatar: avatar, levels: { read: "sprout", math: "sprout" }, lessons: {}, updatedAt: Date.now() };
        s.profiles.push(p);
        s.current = p.id;
        B.save();
        B.persist();
        go("#/start");
      } }),
      first ? null : el("a", { class: "btn quiet", href: "#/", text: B.t("cancel") })
    ]));
  }

  // After creating a profile: offer the short placement check, or let the parent pick.
  function viewStart() {
    clear();
    var p = B.currentProfile();
    if (!p) return go("#/");
    app.appendChild(el("div", { class: "card prose" }, [
      el("h1", { text: B.t("startTitle") }),
      el("p", { text: B.t("startText") }),
      el("div", { class: "row" }, [
        el("a", { class: "btn", href: "#/place/read", text: B.t("startPlacement") }),
        el("a", { class: "btn secondary", href: "#/parent", text: B.t("chooseMyself") }),
        el("a", { class: "btn quiet", href: "#/home", text: B.t("later") })
      ])
    ]));
  }

  // ---------- Child home ----------
  function viewHome() {
    clear();
    var p = B.currentProfile();
    if (!p) return go("#/");
    app.appendChild(el("div", { class: "row" }, [
      el("h1", { style: "margin:0", text: p.avatar + " " + B.t("hello", { name: p.name }) }),
      el("span", { class: "spacer" }),
      el("a", { class: "btn quiet", href: "#/", text: B.t("switchChild") }),
      el("a", { class: "btn quiet", href: "#/parent", text: B.t("parents") })
    ]));
    // Practice that is there any time, outside the gardens (the calm corner, js/practice.js `home: true`).
    var corner = B.practiceOnHome ? B.practiceOnHome(p) : [];
    if (corner.length) app.appendChild(el("div", { class: "row home-practice" }, corner.map(function (g) {
      return el("a", { class: "btn secondary", href: "#/practice/" + g.subject + "/" + g.id + "/home", text: g.emoji + " " + g.title });
    })));
    // With a weekly plan, today's lessons come first (reviews are already part of them).
    var today = B.todayAgenda(p);
    if (today && today.items.length) {
      app.appendChild(el("h2", { text: B.t("todayPlanTitle") }));
      app.appendChild(el("p", { class: "hint", text: B.t("todayPlanHint") }));
      app.appendChild(agendaGrid(p, today.items));
      if (today.activity) app.appendChild(el("p", { class: "note", text: "🏡 " + B.t("todayActivity", { text: today.activity.text }) }));
    }
    // Mixed reviews of practice sets show whenever they are due, unless today's plan already has them.
    var planned = today ? today.items.map(function (it) { return it.id; }) : [];
    var due = today ? [] : dueReviews(p), dueSubjects = dueReviewSubjects(p).filter(function (s) { return planned.indexOf("review-" + s.id) < 0; });
    if (due.length || dueSubjects.length) {
      app.appendChild(el("h2", { text: B.t("reviewTitle") }));
      app.appendChild(el("p", { class: "hint", text: B.t("reviewHint") }));
      var rg = lessonGrid(p, due.map(B.lessonById));
      dueSubjects.forEach(function (s) { rg.insertBefore(reviewTile(p, s), rg.firstChild); });
      app.appendChild(rg);
    }
    app.appendChild(el("h2", { text: B.t("whatToday") }));
    var grid = el("div", { class: "grid" });
    B.SUBJECTS.forEach(function (sub) {
      grid.appendChild(el("a", { class: "tile", href: "#/subject/" + sub.id }, [
        el("span", { class: "big", text: sub.emoji }),
        el("span", { class: "name", text: sub.name }),
        sub.leveled ? el("span", { class: "sub" }, [badge(B.levelOf(p, sub.id))]) : null
      ]));
    });
    app.appendChild(grid);
  }

  // Today's plan: lessons, practice sets, quizzes and reviews (js/plan.js).
  function agendaGrid(p, items) {
    var grid = el("div", { class: "grid" });
    items.forEach(function (it) {
      var done = it.done || (it.kind === "lesson" && p.lessons[it.id] && p.lessons[it.id].done && !it.review);
      grid.appendChild(el("a", { class: "tile" + (it.done ? " done" : ""), href: it.href }, [
        el("span", { class: "big", text: it.emoji }),
        el("span", { class: "name", text: it.title }),
        el("span", { class: "sub", text: it.done ? "✓" : it.review ? B.t("reviewTag") : done ? B.t("stateDone") : "" })
      ]));
    });
    return grid;
  }

  function lessonGrid(p, lessons) {
    var grid = el("div", { class: "grid" });
    lessons.forEach(function (l) {
      var r = p.lessons[l.id];
      var state = !r ? "" : r.mastered ? B.t("stateMastered") : r.done ? B.t("stateDone") : B.t("statePracticing");
      grid.appendChild(el("a", { class: "tile" + (r && (r.mastered || r.done) ? " done" : ""), href: "#/lesson/" + l.id }, [
        el("span", { class: "big", text: l.emoji }),
        el("span", { class: "name", text: l.title }),
        el("span", { class: "sub", text: state })
      ]));
    });
    return grid;
  }

  function viewSubject(id) {
    clear();
    var p = B.currentProfile();
    var sub = B.subjectById(id);
    if (!p || !sub) return go("#/");
    var level = sub.leveled ? B.levelOf(p, id) : null;
    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: "#/home", text: B.t("back") }),
      el("h1", { style: "margin:0", text: sub.emoji + " " + sub.name }),
      level ? badge(level) : null
    ]));
    var lessons = B.lessonsFor(id, level);
    // Seed, Sprout and Sapling: one path, lesson → its practice → … → a unit quiz (js/practice.js).
    if (lessons.length && B.gardenPath && B.inPath(level)) {
      if (B.dueSets(p, id).length) app.appendChild(el("div", { class: "grid", style: "margin-top:14px" }, [reviewTile(p, sub)]));
      app.appendChild(pathGrid(p, B.gardenPath(p, id, level)));
      var free = practiceArea(p, id, level);
      if (free) app.appendChild(el("details", { class: "free-practice" }, [el("summary", { text: B.t("pathFreePractice") }), free]));
      return;
    }
    var practice = practiceArea(p, id, level);
    if (practice) app.appendChild(practice);
    if (!lessons.length) {
      app.appendChild(el("div", { class: "card", style: "margin-top:16px" }, [
        el("p", { class: "prompt", text: B.t("comingSoonTitle") }),
        el("p", { class: "hint", text: B.t("comingSoonHint") })
      ]));
      return;
    }
    app.appendChild(lessonGrid(p, lessons));
  }

  // ---------- The garden's path ----------
  function stars(n) { return "⭐".repeat(n || 0) + "☆".repeat(3 - (n || 0)); }
  function pathGrid(p, items) {
    var grid = el("div", { class: "grid path-grid" });
    items.forEach(function (it) {
      var face, sub;
      if (it.kind === "lesson") {
        var r = it.rec;
        face = [it.lesson.emoji, it.lesson.title];
        sub = !r ? "" : r.mastered ? B.t("stateMastered") : r.done ? B.t("stateDone") : B.t("statePracticing");
      } else if (it.kind === "set") {
        face = ["🔁", B.t("pathSet")];
        sub = it.done ? (it.rec.due <= Date.now() ? B.t("pathSetDue") : "✓") : "";
      } else {
        face = ["⭐", B.t("pathQuizTitle")];
        sub = it.done ? stars(it.rec.stars) : "";
      }
      var cls = "tile path-" + it.kind + (it.done ? " done" : "") + (it.next ? " next" : "");
      grid.appendChild(it.open
        ? el("a", it.next ? { class: cls, href: B.pathHref(it), "aria-current": "step" } : { class: cls, href: B.pathHref(it) }, [
          el("span", { class: "big", text: face[0] }), el("span", { class: "name", text: face[1] }), el("span", { class: "sub", text: it.next ? B.t("pathNextTag") : sub })
        ])
        : el("span", { class: cls + " locked", "aria-disabled": "true" }, [
          el("span", { class: "big", text: "🔒" }), el("span", { class: "name", text: face[1] }), el("span", { class: "sub", text: "" })
        ]));
    });
    return grid;
  }

  // The «ادامه» button: the next thing in the garden's path that the child has not done.
  function nextButton(p, subject, id, primary) {
    var sub = B.subjectById(subject), level = sub && sub.leveled ? B.levelOf(p, subject) : null;
    if (!B.gardenPath || !B.inPath(level)) return null;
    var next = B.pathNext(p, subject, level, id);
    return next ? el("a", { class: primary ? "btn" : "btn secondary", href: B.pathHref(next), text: B.t("pathContinue") }) : null;
  }

  /* Plays a practice session (a lesson's set, a unit quiz, a review, free practice), records it and shows a gentle
     end: thanks, the stars of a quiz, «ادامه» to the next thing in the path. */
  function runPractice(p, lesson, back, again) {
    clear();
    B.playLesson(lesson, app, function (res) {
      var out = B.finishPractice(p, lesson, res);
      if (lesson.kind !== "free") B.logPractice(p, lesson.kind === "review" ? lesson.id : lesson.sets[0]);
      B.save();
      B.noteProgress();
      clear();
      var msg = lesson.kind === "quiz" ? B.t("pathQuizDone", { stars: B.fa(out.stars) })
        : B.t(!res.scored ? "practiceDoneQuiet" : res.firstTry < res.scored ? "practiceDoneMissed" : "practiceDone");
      var next = lesson.kind === "set" || lesson.kind === "quiz" ? nextButton(p, lesson.subject, lesson.sets[0], true) : null;
      app.appendChild(el("div", { class: "lesson" }, [
        el("p", { class: "celebrate", text: lesson.kind === "quiz" ? stars(out.stars) : res.scored ? "💪" : "🌷" }),
        el("p", { class: "prompt", text: msg }),
        el("div", { class: "row", style: "justify-content:center" }, [
          next,
          el("button", { class: next ? "btn secondary" : "btn", type: "button", text: B.t(lesson.kind === "quiz" ? "pathQuizAgain" : "practiceAgain"), onclick: again }),
          el("a", { class: "btn secondary", href: back, text: B.t(back === "#/home" ? "back" : "otherLessons") })
        ])
      ]));
      B.speak(msg.replace(/[⭐☆]/g, ""));
    }, function () { go(back); });
  }

  function viewSet(lessonId) {
    var p = B.currentProfile(), l = B.lessonById(lessonId);
    if (!p || !l) return go("#/");
    if (B.leaveEnglish) B.leaveEnglish();
    var lesson = B.setSession(p, lessonId);
    if (!lesson) return go("#/subject/" + l.subject);
    runPractice(p, lesson, "#/subject/" + l.subject, function () { viewSet(lessonId); });
  }
  function viewQuiz(lessonId) {
    var p = B.currentProfile(), l = B.lessonById(lessonId);
    if (!p || !l) return go("#/");
    if (B.leaveEnglish) B.leaveEnglish();
    var lesson = B.quizSession(p, lessonId);
    if (!lesson) return go("#/subject/" + l.subject);
    runPractice(p, lesson, "#/subject/" + l.subject, function () { viewQuiz(lessonId); });
  }
  function viewReview(subject) {
    var p = B.currentProfile();
    if (!p || !B.subjectById(subject)) return go("#/");
    if (B.leaveEnglish) B.leaveEnglish();
    var lesson = B.reviewSession(p, subject);
    if (!lesson) return go("#/subject/" + subject);
    runPractice(p, lesson, "#/subject/" + subject, function () {
      if (B.dueSets(p, subject).length) viewReview(subject); else go("#/subject/" + subject);
    });
  }

  // ---------- Practice (js/practice.js): fresh items every time, never scored as a lesson ----------
  function practiceArea(p, subject, level) {
    var gens = B.practiceFor ? B.practiceFor(subject, level) : [];
    if (!gens.length) return null;
    var ctx = B.practiceContext(p, subject);
    var open = gens.filter(function (g) { return !B.practiceMissing(g, ctx).length; });
    var grid = el("div", { class: "grid practice-grid" });
    if (open.length > 1) {
      var due = B.practiceDue(p, subject, level);
      grid.appendChild(el("a", { class: "tile practice-mix", href: "#/practice/" + subject }, [
        el("span", { class: "big", text: "🔁" }),
        el("span", { class: "name", text: B.t("practiceStart") }),
        el("span", { class: "sub", text: due ? B.t("practiceDue", { n: B.fa(due) }) : B.t("practiceMix") })
      ]));
    }
    gens.forEach(function (g) {
      var missing = B.practiceMissing(g, ctx), need = missing.length && B.lessonById(missing[0]);
      grid.appendChild(missing.length
        ? el("span", { class: "tile locked", "aria-disabled": "true" }, [
          el("span", { class: "big", text: "🔒" }),
          el("span", { class: "name", text: g.title }),
          el("span", { class: "sub", text: need ? B.t("practiceLocked", { lesson: need.title }) : "" })
        ])
        : el("a", { class: "tile", href: "#/practice/" + subject + "/" + g.id }, [
          el("span", { class: "big", text: g.emoji }),
          el("span", { class: "name", text: g.title })
        ]));
    });
    return el("section", { class: "practice-area" }, [
      el("h2", { text: B.t("practiceArea") }),
      el("p", { class: "hint", text: open.length ? B.t("practiceHint") : B.t("practiceNothing") }),
      grid
    ]);
  }

  function viewPractice(subject, genId, from) {
    var p = B.currentProfile();
    var sub = B.subjectById(subject);
    if (!p || !sub) return go("#/");
    var gen = genId ? B.practiceById(genId) : null;
    var level = gen && gen.level ? gen.level : sub.leveled ? B.levelOf(p, subject) : null;
    var back = from === "home" ? "#/home" : "#/subject/" + subject;
    // A new session is made in Persian (the English switch remakes the same items in English).
    if (B.leaveEnglish) B.leaveEnglish();
    var lesson = B.practiceSession(p, subject, level, { only: genId || null });
    if (!lesson) return go(back);
    // Nothing scored (a check-in, a calm tool) ends with thanks, not praise for practising (runPractice).
    runPractice(p, lesson, back, function () { viewPractice(subject, genId, from); });
  }

  function viewLesson(id) {
    var p = B.currentProfile();
    var lesson = B.lessonById(id);
    if (!p || !lesson) return go("#/");
    clear();
    var back = "#/subject/" + lesson.subject;
    B.playLesson(lesson, app, function (res) {
      var rec = p.lessons[id] || { box: -1 };
      var mastered = res.scored === 0 || res.firstTry / res.scored >= MASTERY;
      rec.done = true;
      if (mastered && res.scored > 0) {
        rec.mastered = true;
        rec.box = Math.min((rec.box || 0) + 1, REVIEW_DAYS.length - 1);
        rec.due = Date.now() + REVIEW_DAYS[rec.box] * DAY;
      } else if (res.scored > 0) {
        rec.mastered = false;
        rec.box = -1;
      }
      p.lessons[id] = rec;
      B.logLesson(p, id);
      B.save();
      B.noteProgress();
      clear();
      // In a garden's path «ادامه» leads on, usually to this lesson's practice.
      var next = nextButton(p, lesson.subject, id, true);
      var msg = mastered ? B.t("mastered") : B.t(next ? "pathPracticed" : "practiced");
      app.appendChild(el("div", { class: "lesson" }, [
        el("p", { class: "celebrate", text: mastered ? "🎉" : "💪" }),
        el("p", { class: "prompt", text: msg }),
        el("div", { class: "row", style: "justify-content:center" }, [
          next,
          mastered ? null : el("button", { class: next ? "btn secondary" : "btn", type: "button", text: B.t("again"), onclick: function () { viewLesson(id); } }),
          el("a", { class: mastered && !next ? "btn" : "btn secondary", href: back, text: B.t("otherLessons") })
        ])
      ]));
      B.speak(msg);
    }, function () { go(back); });
  }

  // ---------- Parent zone ----------
  function viewParent() {
    clear();
    var p = B.currentProfile();
    if (!p) return go("#/");
    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: "#/home", text: B.t("back") }),
      el("h1", { style: "margin:0", text: B.t("parentTitle", { name: p.name }) })
    ]));
    app.appendChild(el("p", { class: "hint" }, [
      B.t("parentHintBefore"), el("a", { href: "guide.html#levels", text: B.t("parentHintLink") }), B.t("parentHintAfter")
    ]));
    B.SUBJECTS.filter(function (s) { return s.leveled; }).forEach(function (sub) {
      var select = el("select", { "aria-label": B.t("levelOf", { subject: sub.name }), style: "font:inherit;padding:8px;border-radius:10px" });
      B.LEVELS.forEach(function (l) {
        var o = el("option", { value: l.id, text: l.emoji + " " + l.name });
        if (B.levelOf(p, sub.id) === l.id) o.selected = true;
        select.appendChild(o);
      });
      select.addEventListener("change", function () { p.levels[sub.id] = select.value; B.touch(p); B.save(); });
      app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
        el("h2", { style: "margin-top:0", text: sub.emoji + " " + sub.name }),
        el("div", { class: "row" }, [select, B.PLACEMENT[sub.id] ? el("a", { class: "btn secondary", href: "#/place/" + sub.id, text: B.t("placement") }) : null])
      ]));
    });
    // Iran's flag in «ایران و جهان»: the family's choice, side by side with plain names (js/steps/world.js).
    if (B.flagSvg) {
      var chosen = B.family().flag || null;
      app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
        el("h2", { style: "margin-top:0", text: B.t("parentFlagTitle") }),
        el("p", { class: "hint", text: B.t("parentFlagHint") }),
        el("div", { class: "row flag-choice", role: "group", "aria-label": B.t("parentFlagTitle") }, [["current", "parentFlagCurrent"], ["lion-sun", "parentFlagLionSun"], [null, "parentFlagNone"]].map(function (o) {
          return el("button", { class: "flag-option", type: "button", "aria-pressed": chosen === o[0] ? "true" : "false", onclick: function (e) {
            B.setFamily("flag", o[0]);
            Array.prototype.forEach.call(e.currentTarget.parentNode.children, function (b) { b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"); });
          } }, [o[0] ? B.flagSvg("iran-" + o[0]) : B.flagSvg("none"), el("span", { text: B.t(o[1]) })]);
        }))
      ]));
    }
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("planCardTitle") }),
      el("p", { class: "hint", text: B.t("planCardHint", { name: p.name }) }),
      el("a", { class: "btn", href: "#/plan", text: B.t("planOpen") })
    ]));
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("backupTitle") }),
      el("p", { class: "hint", text: lastBackupText() }),
      el("div", { class: "row" }, [
        el("a", { class: "btn secondary", href: "#/backup", text: B.t("backupLink") }),
        B.sync && B.sync.available ? el("a", { class: "btn secondary", href: "#/sync", text: B.t("syncLink") }) : null
      ])
    ]));
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("eraseTitle") }),
      el("p", { class: "hint", text: B.t("eraseHint") }),
      el("div", { class: "row" }, [
        el("button", { class: "btn secondary", type: "button", text: B.t("eraseChild", { name: p.name }), onclick: function () {
          if (!confirm(B.t(synced() ? "eraseChildConfirmSynced" : "eraseChildConfirm", { name: p.name }))) return;
          B.removeProfile(p.id);
          B.save();
          go("#/");
        } }),
        el("button", { class: "btn quiet", type: "button", text: B.t("eraseAll"), onclick: function () {
          if (!confirm(B.t("eraseAllConfirm"))) return;
          B.eraseAll();
          go("#/");
        } })
      ])
    ]));
  }

  // ---------- Backup and restore (all children on this device) ----------
  function lastBackupText() {
    var s = B.load();
    if (!s.lastBackup) return B.t("backupNever");
    var days = Math.floor((Date.now() - s.lastBackup) / DAY);
    return B.t("backupLast", { when: days < 1 ? B.t("today") : B.t("daysAgo", { n: B.fa(days) }) });
  }

  function viewBackup() {
    clear();
    var msg = el("p", { class: "feedback", "aria-live": "polite" });
    function say(text, good) { msg.className = "feedback " + (good ? "good" : "try"); msg.textContent = text; }
    function restored(data) {
      try {
        var r = B.restore(data);
        say([B.t("backupRestored"),
          r.added ? B.t("backupRestoredAdded", { n: B.fa(r.added) }) : "",
          r.updated ? B.t("backupRestoredUpdated", { n: B.fa(r.updated) }) : ""].filter(Boolean).join(" "), true);
        var s = B.load();
        if (!s.current && s.profiles.length) { s.current = s.profiles[0].id; B.save(); }
        status.textContent = lastBackupText();
      } catch (e) { say(B.t("backupBad"), false); }
    }
    var hasData = B.load().profiles.length > 0;
    var status = el("p", { class: "hint", text: lastBackupText() });

    var download = el("button", { class: "btn", type: "button", text: B.t("backupDownload"), onclick: function () {
      var blob = new Blob([JSON.stringify(B.backup())], { type: "application/json" });
      var a = el("a", { href: URL.createObjectURL(blob), download: "baghcheh-backup-" + new Date().toISOString().slice(0, 10) + ".json" });
      document.body.appendChild(a);
      a.click();
      a.remove();
      B.markBackedUp();
      status.textContent = lastBackupText();
    } });
    var fileInput = el("input", { type: "file", accept: ".json,application/json", style: "display:none" });
    fileInput.addEventListener("change", function () {
      var f = fileInput.files[0];
      if (!f) return;
      f.text().then(function (t) {
        var data;
        try { data = JSON.parse(t); } catch (e) { return say(B.t("backupBad"), false); }
        restored(data);
      });
      fileInput.value = "";
    });
    var restoreFile = el("button", { class: "btn secondary", type: "button", text: B.t("backupRestoreFile"), onclick: function () { fileInput.click(); } });

    var codeBox = el("textarea", { rows: "4", dir: "ltr", "aria-label": B.t("backupPasteLabel"), placeholder: B.t("backupPasteLabel"),
      style: "width:100%;font:0.85rem monospace;padding:10px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink)" });
    var copy = el("button", { class: "btn", type: "button", text: B.t("backupCopyCode"), onclick: function () {
      var code = B.toCode(B.backup());
      codeBox.value = code;
      B.markBackedUp();
      status.textContent = lastBackupText();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () { say(B.t("backupCopied"), true); }, function () { codeBox.select(); say(B.t("backupCopyFailed"), false); });
      } else { codeBox.select(); say(B.t("backupCopyFailed"), false); }
    } });
    var restoreCode = el("button", { class: "btn secondary", type: "button", text: B.t("backupRestoreCode"), onclick: function () {
      var data;
      try { data = B.fromCode(codeBox.value); } catch (e) { return say(B.t("backupBad"), false); }
      restored(data);
    } });

    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: B.currentProfile() ? "#/parent" : "#/", text: B.t("back") }),
      el("h1", { style: "margin:0", text: B.t("backupTitle") })
    ]));
    app.appendChild(el("div", { class: "prose" }, [el("p", { text: B.t("backupIntro") }), status]));
    app.appendChild(msg);
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("backupFileTitle") }),
      el("div", { class: "row" }, [hasData ? download : null, restoreFile, fileInput])
    ]));
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("backupCodeTitle") }),
      el("p", { class: "hint", text: B.t("backupCodeHint") }),
      codeBox,
      el("div", { class: "row", style: "margin-top:10px" }, [hasData ? copy : null, restoreCode])
    ]));
  }

  // ---------- Placement (parent-administered, ASER-style) ----------
  function viewPlacement(subject) {
    var p = B.currentProfile();
    var stages = B.PLACEMENT[subject];
    if (!p || !stages) return go("#/");
    var i = 0;
    function finish(levelId) {
      p.levels[subject] = levelId;
      B.touch(p);
      B.save();
      clear();
      var other = subject === "read" ? "math" : null;
      app.appendChild(el("div", { class: "card prose" }, [
        el("h1", { text: B.t("placeResult") }),
        el("p", null, [B.subjectById(subject).name + ": ", badge(levelId)]),
        el("p", { text: B.t("placeResultText") }),
        el("div", { class: "row" }, [
          other ? el("a", { class: "btn", href: "#/place/" + other, text: B.t("placeMath") }) : null,
          el("a", { class: other ? "btn secondary" : "btn", href: "#/home", text: B.t("goToGarden") })
        ])
      ]));
    }
    function show() {
      clear();
      if (i >= stages.length) return finish(B.PLACEMENT[subject + "Top"]);
      var st = stages[i];
      var items = st.text
        ? el("p", { class: "place-items text", text: st.text })
        : el("div", { class: "place-items" }, st.items.map(function (t) { return el("span", { dir: "ltr", text: t }); }));
      app.appendChild(el("div", { class: "lesson" }, [
        el("p", { class: "hint", text: B.t("placeHeader", { subject: B.subjectById(subject).name, i: B.fa(i + 1), n: B.fa(stages.length) }) }),
        el("h2", { text: st.title }),
        el("p", { class: "hint", text: B.t("placeHint") }),
        items,
        el("p", { class: "prompt", text: st.ask }),
        el("div", { class: "row", style: "justify-content:center" }, [
          el("button", { class: "btn", type: "button", text: B.t("yes"), onclick: function () { i++; show(); } }),
          el("button", { class: "btn secondary", type: "button", text: B.t("notYet"), onclick: function () { finish(st.ifNot); } })
        ])
      ]));
    }
    show();
  }

  function route() {
    var parts = (location.hash || "#/").slice(2).split("/");
    switch (parts[0]) {
      case "": return viewProfiles();
      case "new": return viewNewProfile(false);
      case "start": return viewStart();
      case "home": return viewHome();
      case "subject": return viewSubject(parts[1]);
      case "lesson": return viewLesson(parts[1]);
      case "practice": return viewPractice(parts[1], parts[2], parts[3]);
      case "set": return viewSet(parts[1]);
      case "quiz": return viewQuiz(parts[1]);
      case "review": return viewReview(parts[1]);
      case "parent": return viewParent();
      case "place": return viewPlacement(parts[1]);
      case "backup": return viewBackup();
      case "plan": return B.currentProfile() ? B.viewPlan(app, B.currentProfile(), "#/parent") : go("#/");
      case "sync":
      case "pair":
        if (!B.sync || !B.sync.available) return go("#/");
        clear();
        return B.sync.view(app, parts[0] === "pair" ? parts[1] : null);
      default: return viewProfiles();
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
