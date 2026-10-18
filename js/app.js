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

  function dueReviews(p) {
    var now = Date.now();
    return Object.keys(p.lessons).filter(function (id) {
      var r = p.lessons[id];
      return r.mastered && r.due <= now && B.lessonById(id);
    });
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
    var due = dueReviews(p);
    if (due.length) {
      app.appendChild(el("h2", { text: B.t("reviewTitle") }));
      app.appendChild(el("p", { class: "hint", text: B.t("reviewHint") }));
      app.appendChild(lessonGrid(p, due.map(B.lessonById)));
    }
    app.appendChild(el("h2", { text: B.t("whatToday") }));
    var grid = el("div", { class: "grid" });
    B.SUBJECTS.forEach(function (sub) {
      grid.appendChild(el("a", { class: "tile", href: "#/subject/" + sub.id }, [
        el("span", { class: "big", text: sub.emoji }),
        el("span", { class: "name", text: sub.name }),
        sub.leveled ? el("span", { class: "sub" }, [badge(p.levels[sub.id])]) : null
      ]));
    });
    app.appendChild(grid);
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
    var level = sub.leveled ? p.levels[id] : null;
    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: "#/home", text: B.t("back") }),
      el("h1", { style: "margin:0", text: sub.emoji + " " + sub.name }),
      level ? badge(level) : null
    ]));
    var lessons = B.lessonsFor(id, level);
    if (!lessons.length) {
      app.appendChild(el("div", { class: "card", style: "margin-top:16px" }, [
        el("p", { class: "prompt", text: B.t("comingSoonTitle") }),
        el("p", { class: "hint", text: B.t("comingSoonHint") })
      ]));
      return;
    }
    app.appendChild(lessonGrid(p, lessons));
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
      B.save();
      B.noteProgress();
      clear();
      var msg = mastered ? B.t("mastered") : B.t("practiced");
      app.appendChild(el("div", { class: "lesson" }, [
        el("p", { class: "celebrate", text: mastered ? "🎉" : "💪" }),
        el("p", { class: "prompt", text: msg }),
        el("div", { class: "row", style: "justify-content:center" }, [
          mastered ? null : el("button", { class: "btn", type: "button", text: B.t("again"), onclick: function () { viewLesson(id); } }),
          el("a", { class: mastered ? "btn" : "btn secondary", href: back, text: B.t("otherLessons") })
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
        if (p.levels[sub.id] === l.id) o.selected = true;
        select.appendChild(o);
      });
      select.addEventListener("change", function () { p.levels[sub.id] = select.value; B.touch(p); B.save(); });
      app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
        el("h2", { style: "margin-top:0", text: sub.emoji + " " + sub.name }),
        el("div", { class: "row" }, [select, el("a", { class: "btn secondary", href: "#/place/" + sub.id, text: B.t("placement") })])
      ]));
    });
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
      case "parent": return viewParent();
      case "place": return viewPlacement(parts[1]);
      case "backup": return viewBackup();
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
