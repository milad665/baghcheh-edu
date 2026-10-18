/* باغچه — the parent's weekly plan, learning log and calendar. Everything stays on this device
   (and travels with backups and home sync; see B.merge in js/common.js).

   p.plan = { days: [0..6] (0 = Saturday, the first day of the Iranian week), time: "17:00", minutes: 20, updatedAt }
   p.log  = { "2026-10-18": { l: [lesson ids finished that day], a: [activity ids done that day] } } */
(function () {
  var el = B.el;
  var DAY = 24 * 60 * 60 * 1000;
  var ICS_DAYS = ["SA", "SU", "MO", "TU", "WE", "TH", "FR"];

  // ---------- Dates ----------
  function key(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fromKey(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function midnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function weekIndex(d) { return (d.getDay() + 1) % 7; } // Saturday = 0
  function weekStart(d) { return addDays(midnight(d), -weekIndex(d)); }

  // Solar Hijri (Persian) calendar via Intl; browsers without it fall back to the Gregorian one.
  var partsFmt = new Intl.DateTimeFormat("en-US-u-ca-persian", { year: "numeric", month: "numeric", day: "numeric" });
  function solar(d) {
    var o = {};
    partsFmt.formatToParts(d).forEach(function (p) { if (p.type === "year" || p.type === "month" || p.type === "day") o[p.type] = parseInt(p.value, 10); });
    return o;
  }
  var dayMonthFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { day: "numeric", month: "long" });
  var monthYearFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "long", year: "numeric" });
  var fullFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { weekday: "long", day: "numeric", month: "long" });

  // ---------- Log ----------
  function entry(p, k, create) {
    p.log = p.log || {};
    if (!p.log[k] && create) p.log[k] = { l: [], a: [] };
    return p.log[k] || { l: [], a: [] };
  }

  B.logLesson = function (p, lessonId) {
    var e = entry(p, key(new Date()), true);
    if (e.l.indexOf(lessonId) < 0) e.l.push(lessonId);
  };

  function learnedOn(p, k) { var e = entry(p, k); return e.l.length > 0 || e.a.length > 0; }

  // ---------- Plan ----------
  function lowestLevel(p) {
    var order = B.LEVELS.map(function (l) { return l.id; });
    return B.SUBJECTS.filter(function (s) { return s.leveled; })
      .map(function (s) { return B.levelOf(p, s.id); })
      .sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); })[0] || "sprout";
  }

  function suggestedPlan(p) {
    return lowestLevel(p) === "seed"
      ? { days: [0, 2, 4], time: "17:00", minutes: 15 }
      : { days: [0, 1, 2, 3, 4], time: "17:00", minutes: 20 };
  }

  function planned(p, d) { return !!(p.plan && p.plan.days.indexOf(weekIndex(d)) >= 0); }

  function slots(p) { return Math.max(1, Math.round(((p.plan && p.plan.minutes) || 20) / 8)); }

  function activityFor(p, d) {
    var list = B.ACTIVITIES && B.ACTIVITIES[lowestLevel(p)];
    if (!list || !list.length) return null;
    var n = Math.floor(midnight(d).getTime() / DAY);
    return list[((n % list.length) + list.length) % list.length];
  }

  /* The agenda for each day of a week. Past days show what was actually done; today and the planned days
     ahead get suggestions from the child's real progress (due reviews first, then the next lessons in each
     subject, taking turns), as if each earlier day's plan had been followed. */
  function weekAgenda(p, start) {
    var today = midnight(new Date());
    var used = {};          // lessons already suggested earlier in the week
    var turn = 0;           // which subject goes first
    var feelGiven = false;  // the calm-down lesson, once a week
    var days = [];
    for (var i = 0; i < 7; i++) {
      var d = addDays(start, i), k = key(d), isPlanned = planned(p, d);
      var done = entry(p, k).l.filter(function (id) { return B.lessonById(id); });
      var items = done.map(function (id) { return { lesson: B.lessonById(id), done: true, review: false }; });
      // Lessons finished today aren't suggested again today; ones from earlier days can still come back as reviews.
      if (d >= today) done.forEach(function (id) { used[id] = true; });
      if (done.some(function (id) { return B.lessonById(id).subject === "feel"; })) feelGiven = true;

      if (d >= today && isPlanned) {
        var size = slots(p), endOfDay = addDays(d, 1).getTime();
        // 1. Reviews that will be due by that day.
        var reviews = Object.keys(p.lessons).filter(function (id) {
          var r = p.lessons[id];
          return r.mastered && r.due < endOfDay && !used[id] && B.lessonById(id);
        }).slice(0, Math.ceil(size / 2));
        reviews.forEach(function (id) { used[id] = true; items.push({ lesson: B.lessonById(id), done: false, review: true }); });
        // 2. New lessons, subjects taking turns.
        var subjects = B.SUBJECTS.filter(function (s) { return s.leveled; });
        var queues = subjects.map(function (s) {
          return B.lessonsFor(s.id, B.levelOf(p, s.id)).filter(function (l) {
            return l.level !== null && !(p.lessons[l.id] && p.lessons[l.id].mastered) && !used[l.id];
          });
        });
        var j = 0, stuck = 0;
        while (items.length < size && stuck < subjects.length) {
          var q = queues[(turn + j) % subjects.length];
          var next = q.shift();
          j++;
          if (!next) { stuck++; continue; }
          stuck = 0;
          used[next.id] = true;
          items.push({ lesson: next, done: false, review: false });
        }
        turn++;
        // 3. Once a week, the calm-down lesson.
        if (!feelGiven) {
          var feel = B.lessonsFor("feel", null)[0];
          if (feel) { items.push({ lesson: feel, done: false, review: false }); feelGiven = true; }
        }
      }
      var act = (isPlanned || done.length) ? activityFor(p, d) : null;
      days.push({
        date: d, key: k, planned: isPlanned, items: items,
        activity: act, activityDone: !!(act && entry(p, k).a.indexOf(act.id) >= 0),
        learned: learnedOn(p, k)
      });
    }
    return days;
  }

  // Today's agenda, for the child's home screen (null when there is no plan and nothing done today).
  B.todayAgenda = function (p) {
    if (!p.plan && !learnedOn(p, key(new Date()))) return null;
    var day = weekAgenda(p, weekStart(new Date()))[weekIndex(new Date())];
    return (day.planned || day.items.length) ? day : null;
  };

  // ---------- Calendar file (.ics) with weekly reminders ----------
  function icsText(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  // Lines longer than 75 bytes are folded, without splitting a multi-byte (Persian) character.
  function fold(line) {
    var out = [], cur = "", bytes = 0;
    Array.from(line).forEach(function (ch) {
      var b = new TextEncoder().encode(ch).length;
      if (bytes + b > 73) { out.push(cur); cur = " "; bytes = 1; }
      cur += ch;
      bytes += b;
    });
    out.push(cur);
    return out.join("\r\n");
  }
  function stamp(d, utc) {
    function z(n) { return String(n).padStart(2, "0"); }
    return utc
      ? d.getUTCFullYear() + z(d.getUTCMonth() + 1) + z(d.getUTCDate()) + "T" + z(d.getUTCHours()) + z(d.getUTCMinutes()) + z(d.getUTCSeconds()) + "Z"
      : d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + "T" + z(d.getHours()) + z(d.getMinutes()) + "00";
  }

  function downloadIcs(p) {
    var hm = p.plan.time.split(":");
    var first = midnight(new Date());
    while (!planned(p, first)) first = addDays(first, 1);
    first.setHours(+hm[0], +hm[1]);
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Baghcheh//Plan//FA", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:baghcheh-" + p.id + "-" + Date.now() + "@baghcheh",
      "DTSTAMP:" + stamp(new Date(), true),
      "DTSTART:" + stamp(first, false),
      "DURATION:PT" + p.plan.minutes + "M",
      "RRULE:FREQ=WEEKLY;BYDAY=" + p.plan.days.slice().sort().map(function (i) { return ICS_DAYS[i]; }).join(","),
      "SUMMARY:" + icsText(B.t("icsTitle", { name: p.name })),
      "DESCRIPTION:" + icsText(B.t("icsBody", { name: p.name, minutes: B.fa(p.plan.minutes) })),
      "BEGIN:VALARM", "TRIGGER:-PT10M", "ACTION:DISPLAY",
      "DESCRIPTION:" + icsText(B.t("icsAlarm", { name: p.name })),
      "END:VALARM", "END:VEVENT", "END:VCALENDAR"
    ];
    var blob = new Blob([lines.map(fold).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    var a = el("a", { href: URL.createObjectURL(blob), download: "baghcheh-" + p.name + ".ics" });
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ---------- Screen ----------
  B.viewPlan = function (app, p, back) {
    app.innerHTML = "";
    window.scrollTo(0, 0);
    var weekdays = B.T.weekdays;

    app.appendChild(el("div", { class: "row no-print" }, [
      el("a", { class: "btn quiet", href: back, text: B.t("back") }),
      el("h1", { style: "margin:0", text: B.t("planTitle", { name: p.name }) })
    ]));

    // --- Weekly plan settings ---
    var draft = JSON.parse(JSON.stringify(p.plan || suggestedPlan(p)));
    var saved = el("p", { class: "feedback", "aria-live": "polite" });
    var dayButtons = el("div", { class: "day-picks", role: "group", "aria-label": B.t("planDays") });
    weekdays.forEach(function (name, i) {
      var b = el("button", { type: "button", class: "day-pick", "aria-pressed": draft.days.indexOf(i) >= 0 ? "true" : "false", text: name });
      b.addEventListener("click", function () {
        var at = draft.days.indexOf(i);
        if (at >= 0) draft.days.splice(at, 1); else draft.days.push(i);
        b.setAttribute("aria-pressed", at >= 0 ? "false" : "true");
      });
      dayButtons.appendChild(b);
    });
    var time = el("input", { type: "time", value: draft.time, "aria-label": B.t("planTime"), class: "plan-input" });
    var minutes = el("select", { "aria-label": B.t("planMinutes"), class: "plan-input" });
    [10, 15, 20, 30, 45].forEach(function (m) {
      var o = el("option", { value: String(m), text: B.t("minutesOpt", { n: B.fa(m) }) });
      if (m === draft.minutes) o.selected = true;
      minutes.appendChild(o);
    });
    var save = el("button", { class: "btn", type: "button", text: B.t("planSave"), onclick: function () {
      if (!draft.days.length) { saved.className = "feedback try"; saved.textContent = B.t("planPickDays"); return; }
      p.plan = { days: draft.days.slice().sort(), time: time.value || "17:00", minutes: +minutes.value, updatedAt: Date.now() };
      B.save();
      B.viewPlan(app, p, back);
    } });
    app.appendChild(el("div", { class: "card no-print", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("planSetupTitle") }),
      el("p", { class: "hint", text: B.t("planSetupHint") }),
      el("p", { class: "hint", text: B.t(lowestLevel(p) === "seed" ? "planSuggestSeed" : "planSuggest") }),
      el("h3", { text: B.t("planDays") }), dayButtons,
      el("div", { class: "row", style: "margin-top:12px" }, [
        el("label", { class: "plan-field" }, [B.t("planTime"), time]),
        el("label", { class: "plan-field" }, [B.t("planMinutes"), minutes])
      ]),
      el("div", { class: "row", style: "margin-top:14px" }, [save, saved])
    ]));

    if (!p.plan) {
      app.appendChild(el("p", { class: "note", text: B.t("planNone") }));
    } else {
      renderWeek(app, p);
    }
    renderProgress(app, p);
    renderMonth(app, p, new Date());
  };

  function renderWeek(app, p) {
    var start = weekStart(new Date()), days = weekAgenda(p, start), today = key(new Date());
    var plannedCount = days.filter(function (d) { return d.planned; }).length;
    var doneCount = days.filter(function (d) { return d.learned; }).length;
    var summary = doneCount >= plannedCount && plannedCount > 0
      ? B.t("weekComplete")
      : B.t("weekSummary", { done: B.fa(doneCount), planned: B.fa(plannedCount) });

    var list = el("div", { class: "week" });
    days.forEach(function (d, i) {
      var head = el("div", { class: "day-head" }, [
        el("strong", { text: B.T.weekdays[i] }),
        el("span", { class: "hint", text: dayMonthFmt.format(d.date) }),
        d.key === today ? el("span", { class: "today-tag", text: B.t("today") }) : null
      ]);
      var body = el("ul", { class: "day-items" });
      if (!d.planned && !d.items.length) body.appendChild(el("li", { class: "hint", text: B.t("noSession") }));
      d.items.forEach(function (it) {
        body.appendChild(el("li", { class: it.done ? "is-done" : "" }, [
          el("span", { class: "check", "aria-hidden": "true", text: it.done ? "✓" : "" }),
          el("span", { text: it.lesson.emoji + " " + it.lesson.title }),
          el("span", { class: "hint", text: " · " + (it.review ? B.t("reviewTag") : B.subjectById(it.lesson.subject).name) })
        ]));
      });
      if (d.activity) {
        var box = el("input", { type: "checkbox", "aria-label": B.t("markActivity") });
        box.checked = d.activityDone;
        box.disabled = d.key > today;
        box.addEventListener("change", function () {
          var e = entry(p, d.key, true);
          var at = e.a.indexOf(d.activity.id);
          if (box.checked && at < 0) e.a.push(d.activity.id);
          if (!box.checked && at >= 0) e.a.splice(at, 1);
          B.save();
        });
        body.appendChild(el("li", { class: "activity" }, [
          el("label", null, [box, el("span", { text: " 🏡 " + B.t("offscreenTag") + ": " + d.activity.text })])
        ]));
      }
      list.appendChild(el("div", { class: "day-card" + (d.planned ? " planned" : "") + (d.key === today ? " is-today" : "") }, [head, body]));
    });

    var end = addDays(start, 6);
    app.appendChild(el("section", { class: "card print-area", style: "margin:14px 0" }, [
      el("div", { class: "print-only" }, [
        el("h1", { text: B.t("printHeader", { name: p.name }) }),
        el("p", { text: B.t("printWeek", { from: dayMonthFmt.format(start), to: dayMonthFmt.format(end) }) + " · " +
          B.t("printTime", { time: B.fa(p.plan.time), minutes: B.fa(p.plan.minutes) }) }),
        el("p", { class: "hint", text: B.t("printNote") })
      ]),
      el("h2", { class: "no-print", style: "margin-top:0", text: B.t("weekTitle") }),
      el("p", { class: "no-print", text: summary }),
      el("p", { class: "hint no-print", text: B.t("weekHint") }),
      list,
      el("div", { class: "row no-print", style: "margin-top:14px" }, [
        el("button", { class: "btn secondary", type: "button", text: B.t("planPrint"), onclick: function () { window.print(); } }),
        el("button", { class: "btn secondary", type: "button", text: B.t("planReminders"), onclick: function () { downloadIcs(p); } })
      ]),
      el("p", { class: "hint no-print", text: B.t("planRemindersHint") })
    ]));
  }

  function renderProgress(app, p) {
    var rows = B.SUBJECTS.filter(function (s) { return s.leveled; }).map(function (s) {
      var level = B.levelById(B.levelOf(p, s.id));
      var lessons = B.lessonsFor(s.id, level.id).filter(function (l) { return l.level !== null; });
      var learned = lessons.filter(function (l) { return p.lessons[l.id] && p.lessons[l.id].mastered; }).length;
      var text = !lessons.length ? B.t("progressNone")
        : learned === lessons.length ? B.t("progressAllDone")
        : B.t("progressGarden", { learned: B.fa(learned), total: B.fa(lessons.length) });
      return el("div", { class: "progress-row" }, [
        el("div", { class: "row" }, [el("strong", { text: s.emoji + " " + s.name }), el("span", { class: "garden-badge lvl-" + level.id, text: level.emoji + " " + B.t("garden", { name: level.name }) })]),
        lessons.length ? el("div", { class: "progress", role: "img", "aria-label": text }, [el("span", { style: "width:" + Math.round(100 * learned / lessons.length) + "%" })]) : null,
        el("p", { class: "hint", style: "margin:0", text: text })
      ]);
    });
    var days30 = 0;
    for (var i = 0; i < 30; i++) if (learnedOn(p, key(addDays(new Date(), -i)))) days30++;
    app.appendChild(el("section", { class: "card no-print", style: "margin:14px 0" }, [
      el("h2", { style: "margin-top:0", text: B.t("progressTitle") })
    ].concat(rows, [el("p", { text: B.t("learnedDays", { n: B.fa(days30) }) })])));
  }

  function renderMonth(app, p, anchor) {
    var section = el("section", { class: "card no-print", style: "margin:14px 0" });
    var details = el("div", { class: "day-details", "aria-live": "polite" });
    var m = solar(anchor).month;
    var first = midnight(anchor);
    while (solar(addDays(first, -1)).month === m) first = addDays(first, -1);
    var title = el("h2", { style: "margin:0", text: monthYearFmt.format(first) });
    var grid = el("div", { class: "cal", role: "grid" });
    B.T.weekdaysShort.forEach(function (n, i) { grid.appendChild(el("div", { class: "cal-head", title: B.T.weekdays[i], text: n })); });
    for (var b = 0; b < weekIndex(first); b++) grid.appendChild(el("div", { class: "cal-blank" }));
    var today = key(new Date());
    for (var d = first; solar(d).month === m; d = addDays(d, 1)) {
      (function (d) {
        var k = key(d), e = entry(p, k);
        var cls = "cal-day" + (planned(p, d) && k >= today ? " planned" : "") + (k === today ? " is-today" : "") + (e.l.length ? " learned" : "");
        var cell = el("button", { type: "button", class: cls, "aria-label": fullFmt.format(d) }, [
          el("span", { class: "n", text: B.fa(solar(d).day) }),
          el("span", { class: "dots", "aria-hidden": "true" }, [
            e.l.length ? el("i", { class: "dot learn" }) : null,
            e.a.length ? el("i", { class: "dot act" }) : null
          ])
        ]);
        cell.addEventListener("click", function () { showDay(details, p, d); });
        grid.appendChild(cell);
      })(d);
    }
    section.appendChild(el("div", { class: "row" }, [
      el("button", { class: "btn quiet", type: "button", text: B.t("prevMonth"), onclick: function () { section.replaceWith(renderMonthInto(p, addDays(first, -1))); } }),
      el("span", { class: "spacer" }), title, el("span", { class: "spacer" }),
      el("button", { class: "btn quiet", type: "button", text: B.t("nextMonth"), onclick: function () { section.replaceWith(renderMonthInto(p, addDays(first, 32))); } })
    ]));
    section.appendChild(grid);
    section.appendChild(el("div", { class: "cal-legend hint" }, [
      el("span", null, [el("i", { class: "dot learn" }), " " + B.t("legendLearned")]),
      el("span", null, [el("i", { class: "dot act" }), " " + B.t("legendActivity")]),
      el("span", null, [el("i", { class: "box planned" }), " " + B.t("legendPlanned")])
    ]));
    section.appendChild(details);
    app.appendChild(section);
    return section;
  }

  function renderMonthInto(p, anchor) {
    var holder = el("div");
    return renderMonth(holder, p, anchor);
  }

  function showDay(box, p, d) {
    var e = entry(p, key(d));
    box.innerHTML = "";
    box.appendChild(el("h3", { text: fullFmt.format(d) }));
    if (!e.l.length && !e.a.length) { box.appendChild(el("p", { class: "hint", text: B.t("dayEmpty") })); return; }
    var ul = el("ul");
    e.l.forEach(function (id) { var l = B.lessonById(id); if (l) ul.appendChild(el("li", { text: "✓ " + l.emoji + " " + l.title })); });
    var acts = [].concat.apply([], Object.keys(B.ACTIVITIES || {}).map(function (k) { return B.ACTIVITIES[k]; }));
    e.a.forEach(function (id) { var a = acts.find(function (x) { return x.id === id; }); if (a) ul.appendChild(el("li", { text: "🏡 " + a.text })); });
    box.appendChild(ul);
  }
})();
