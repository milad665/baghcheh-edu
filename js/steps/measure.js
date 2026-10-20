/* باغچه — measuring step types for ریاضی: time and mass.
   - clock: read a clock, set its hands, or turn them freely and hear the time.
   - balance: a two-pan balance: see which side is heavier, or put things on it until it balances; or a lever.
   - measure with a tool: read or set a ruler, a measuring jug or a thermometer (the plain measure step is in
     js/engine.js).
   Same rules as the games (js/games.js): no timers or points, a gentle bounce on a miss, the answer shown after
   two misses; tapping, dragging and the keyboard all work. Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function bounce(node) { node.classList.remove("wrong"); void node.getBoundingClientRect(); node.classList.add("wrong"); }
  function feedback(box) {
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    return {
      good: function (t) { fb.className = "feedback good"; fb.textContent = t || E.pick(B.T.praise); B.speak(fb.textContent); },
      tryAgain: function (t) { fb.className = "feedback try"; fb.textContent = t || E.pick(B.T.retry); },
      say: function (t) { fb.className = "feedback"; fb.textContent = t; },
      clear: function () { fb.className = "feedback"; fb.textContent = ""; }
    };
  }
  function row(children) { return el("div", { class: "row", style: "justify-content:center" }, children); }
  // A question asked at the end of a step (scored), or the next button.
  function ending(box, s, done, scored, first) {
    if (s.question) {
      box.appendChild(el("p", { class: "prompt", text: s.question }));
      var sb = E.speakBtn(s.question);
      if (sb) box.appendChild(sb);
      E.choice(box, { options: typeof s.options[0] === "number" ? E.nums(s.options) : s.options, answer: s.answer, pic: s.pic },
        function (sc, f) { done(true, f && (scored ? first : true)); });
      B.speak(s.question);
      return;
    }
    if (scored) { setTimeout(function () { done(true, first); }, 1100); return; }
    box.appendChild(row([E.nextBtn(null, function () { done(false); })]));
  }

  /* ---------- clock ----------
     Times are written "h:mm" ("3:00", "9:30"), on a 12-hour clock. The hands are geared like a real clock: the
     short hand follows the long one, so at half past three it is halfway between ۳ and ۴.
     ask: "read" (time, options: times to choose from), "set" (time; optional start, default "12:00"), or
     "explore" (turn the hands and hear the time; not scored), or "show" (the clock shows start, then the hands turn
     on to time while the child watches, with a replay button; not scored). Optional prompt, say, pic (an emoji beside the clock:
     what happens at that time), snap (minutes the long hand moves by, default 15; 5 for reading minutes). */
  function parse(t) {
    var p = String(t).split(":");
    return ((+p[0] % 12) * 60 + (+p[1] || 0)) % 720;
  }
  function hm(tm) { return { h: Math.floor(tm / 60) || 12, m: tm % 60 }; }
  B.timeText = function (t) {
    var x = hm(typeof t === "number" ? t : parse(t)), next = x.h % 12 + 1;
    if (x.m === 0) return B.t("clockOclock", { h: B.fa(x.h) });
    if (x.m === 30) return B.t("clockHalf", { h: B.fa(x.h) });
    if (x.m === 15) return B.t("clockQuarter", { h: B.fa(x.h) });
    if (x.m === 45) return B.t("clockToQuarter", { h: B.fa(next) });
    return B.t("clockMinutes", { h: B.fa(x.h), m: B.fa(x.m) });
  };

  function clockFace() {
    var svg = svgEl("svg", { viewBox: "0 0 200 200", class: "clock", role: "group", "aria-label": B.t("clockAria") });
    svg.appendChild(svgEl("circle", { cx: 100, cy: 100, r: 94, class: "clock-rim" }));
    svg.appendChild(svgEl("circle", { cx: 100, cy: 100, r: 88, class: "clock-face" }));
    for (var i = 0; i < 60; i++) {
      var a = i * Math.PI / 30, big = i % 5 === 0, r1 = big ? 78 : 83;
      svg.appendChild(svgEl("line", { x1: 100 + r1 * Math.sin(a), y1: 100 - r1 * Math.cos(a), x2: 100 + 87 * Math.sin(a), y2: 100 - 87 * Math.cos(a),
        class: big ? "clock-tick big" : "clock-tick" }));
    }
    for (var n = 1; n <= 12; n++) {
      var b = n * Math.PI / 6;
      var t = svgEl("text", { x: 100 + 66 * Math.sin(b), y: 100 - 66 * Math.cos(b), class: "clock-num", "text-anchor": "middle", "dominant-baseline": "central" });
      t.textContent = B.fa(n);
      svg.appendChild(t);
    }
    function hand(cls, len, w, label) {
      var g = svgEl("g", { class: "clock-hand " + cls, "aria-label": label });
      g.appendChild(svgEl("line", { x1: 100, y1: 112, x2: 100, y2: 100 - len, "stroke-width": w }));
      // A wider see-through line, so a finger can catch the hand easily.
      g.appendChild(svgEl("line", { x1: 100, y1: 100, x2: 100, y2: 100 - len, class: "clock-grip" }));
      svg.appendChild(g);
      return g;
    }
    var hour = hand("hour", 46, 8, B.t("clockHourAria"));
    var minute = hand("minute", 72, 5, B.t("clockMinuteAria"));
    svg.appendChild(svgEl("circle", { cx: 100, cy: 100, r: 6, class: "clock-pin" }));
    return {
      svg: svg, hour: hour, minute: minute,
      set: function (tm) {
        hour.setAttribute("transform", "rotate(" + tm / 2 + " 100 100)");
        minute.setAttribute("transform", "rotate(" + (tm % 60) * 6 + " 100 100)");
      }
    };
  }

  // Turns the hands from the time from by d minutes (both hands move together), then calls then().
  function turn(c, from, d, ms, then) {
    if (B.reducedMotion && B.reducedMotion()) { c.set(((from + d) % 720 + 720) % 720); then(); return; }
    var t0 = null;
    (function frame(now) {
      if (!c.svg.isConnected) return;
      if (t0 == null) t0 = now;
      var k = Math.min(1, (now - t0) / ms);
      c.set(((from + d * (1 - Math.pow(1 - k, 2))) % 720 + 720) % 720);
      if (k < 1) requestAnimationFrame(frame); else then();
    })(performance.now());
  }

  E.steps.clock = function (s, box, done) {
    var ask = s.ask || (s.time == null ? "explore" : s.options ? "read" : "set");
    var target = s.time != null ? parse(s.time) : 0;
    var prompt = s.prompt || B.t(ask === "read" || ask === "show" ? "clockReadPrompt" : ask === "set" ? "clockSetPrompt" : "clockExplore", { time: B.timeText(target) });
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    var sb = E.speakBtn(s.say || prompt, s.audio);
    if (sb) box.appendChild(sb);
    var c = clockFace();
    var wrap = el("div", { class: "clock-wrap" }, [c.svg]);
    if (s.pic) wrap.insertBefore(el("span", { class: "clock-pic", "aria-hidden": "true", text: s.pic }), c.svg);
    box.appendChild(wrap);

    // Show: the clock shows start, then its hands turn on to time while the child watches (an explanation, not scored).
    if (ask === "show") {
      var said = el("p", { class: "clock-out", "aria-live": "polite" });
      var replay = el("button", { class: "btn quiet", type: "button", text: B.t("clockAgain") });
      box.appendChild(said);
      box.appendChild(row([replay, E.nextBtn(null, function () { done(false); })]));
      var from = s.start != null ? parse(s.start) : target;
      var play = function () {
        c.set(from);
        said.textContent = B.timeText(from);
        replay.disabled = true;
        if (sb) B.speak(s.say || prompt, s.audio);
        setTimeout(function () {
          if (!c.svg.isConnected) return;
          turn(c, from, (target - from + 720) % 720, 2600, function () {
            said.textContent = B.timeText(target);
            replay.disabled = false;
          });
        }, from === target ? 0 : 1200);
      };
      replay.addEventListener("click", play);
      replay.hidden = from === target;
      play();
      return;
    }
    if (ask === "read") {
      c.set(target);
      E.choice(box, { options: s.options.map(function (t) { return { label: B.timeText(t), value: parse(t) }; }), answer: target }, done);
      if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
      return;
    }

    // Setting the hands: drag either hand, tap the buttons, or use the arrow keys on a focused hand.
    var tm = ask === "set" ? parse(s.start || "12:00") : parse(s.start || "3:00");
    var snap = s.snap || 15, locked = false;
    var out = el("p", { class: "clock-out", "aria-live": "polite" });
    function update(speak) {
      c.set(tm);
      var text = B.timeText(tm);
      [c.hour, c.minute].forEach(function (h) { h.setAttribute("aria-valuetext", text); });
      if (ask === "explore") { out.textContent = text; if (speak) B.speak(text); }
      if (fb) fb.clear();
    }
    function moveMinute(m) {
      var d = ((m - tm % 60) % 60 + 60) % 60;
      if (d > 30) d -= 60;
      tm = ((tm + d) % 720 + 720) % 720;
    }
    function moveHour(h) { tm = ((h % 12) * 60 + tm % 60) % 720; }
    // The buttons and keys move the long hand by snap minutes; going past ۱۲ moves the short hand on too.
    function stepMinute(k) { tm = ((tm - tm % 60 + Math.round((tm % 60) / snap) * snap + k * snap) % 720 + 720) % 720; }
    function stepHour(k) { tm = (tm + k * 60 + 720) % 720; }

    function angleAt(e) {
      var r = c.svg.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * 200 - 100, y = (e.clientY - r.top) / r.height * 200 - 100;
      return { deg: (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360, dist: Math.hypot(x, y) };
    }
    function gap(a, b) { var d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
    var grabbed = null;
    function follow(p) {
      if (grabbed === "minute") moveMinute(Math.round(p.deg / 6 / snap) * snap % 60);
      else moveHour(Math.round(p.deg / 30 - (tm % 60) / 60 + 12) % 12);
      update(false);
    }
    c.svg.addEventListener("pointerdown", function (e) {
      if (locked) return;
      var p = angleAt(e);
      // The hand nearest the finger; near the middle the short hand wins, further out the long one.
      var gh = gap(p.deg, tm / 2) + (p.dist > 52 ? 25 : 0), gm = gap(p.deg, (tm % 60) * 6) + (p.dist <= 52 ? 25 : 0);
      grabbed = gh < gm ? "hour" : "minute";
      c.svg.classList.add("turning");
      if (c.svg.setPointerCapture) c.svg.setPointerCapture(e.pointerId);
      follow(p);
      e.preventDefault();
    });
    c.svg.addEventListener("pointermove", function (e) { if (grabbed && !locked) follow(angleAt(e)); });
    function release() {
      if (!grabbed) return;
      grabbed = null;
      c.svg.classList.remove("turning");
      update(true);
    }
    c.svg.addEventListener("pointerup", release);
    c.svg.addEventListener("pointercancel", release);
    [[c.hour, stepHour], [c.minute, stepMinute]].forEach(function (h) {
      h[0].setAttribute("tabindex", "0");
      h[0].setAttribute("role", "slider");
      h[0].addEventListener("keydown", function (e) {
        if (locked) return;
        var k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (!k) return;
        h[1](k);
        update(true);
        e.preventDefault();
      });
    });
    // A round arrow: clockwise (forward in time) or, mirrored, back.
    function turnIcon(back) {
      var i = svgEl("svg", { viewBox: "0 0 24 24", width: 26, height: 26, "aria-hidden": "true", class: "clock-icon" });
      var g = svgEl("g", back ? { transform: "translate(24 0) scale(-1 1)" } : {});
      g.appendChild(svgEl("path", { d: "M 19.5 12 A 7.5 7.5 0 1 1 15.5 5.4", fill: "none", stroke: "currentColor", "stroke-width": 2.6, "stroke-linecap": "round" }));
      g.appendChild(svgEl("path", { d: "M 12.5 2.5 L 17.5 5 L 14 9.5 Z", fill: "currentColor" }));
      i.appendChild(g);
      return i;
    }
    function btn(back, label, fn) {
      return el("button", { class: "btn secondary clock-btn", type: "button", "aria-label": label, title: label,
        onclick: function () { if (!locked) { fn(); update(true); } } }, [turnIcon(back)]);
    }
    // Buttons follow the picture: the clockwise arrow moves the hand forward in time, the other one back.
    box.appendChild(el("div", { class: "clock-btns", dir: "ltr" }, [
      el("span", { class: "clock-group hour" }, [btn(true, B.t("clockHourBack"), function () { stepHour(-1); }),
        el("span", { text: B.t("clockHour") }), btn(false, B.t("clockHourOn"), function () { stepHour(1); })]),
      el("span", { class: "clock-group minute" }, [btn(true, B.t("clockMinuteBack"), function () { stepMinute(-1); }),
        el("span", { text: B.t("clockMinute") }), btn(false, B.t("clockMinuteOn"), function () { stepMinute(1); })])
    ]));
    box.appendChild(out);
    var fb = null;
    update(false);
    if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
    if (ask === "explore") { ending(box, s, done, false); return; }

    fb = feedback(box);
    var misses = 0;
    var check = E.nextBtn(B.t("clockDone"), function () {
      if (locked) return;
      if (tm === target) {
        locked = true;
        check.disabled = true;
        fb.good();
        c.svg.classList.add("right");
        setTimeout(function () { done(true, misses === 0); }, 1100);
        return;
      }
      misses++;
      bounce(c.svg);
      var hourRight = Math.floor(tm / 60) === Math.floor(target / 60);
      fb.tryAgain(tm % 60 !== target % 60 ? B.t(target % 60 === 0 ? "clockFixOclock" : target % 60 === 30 ? "clockFixHalf" : "clockFixMinute")
        : hourRight ? undefined : B.t("clockFixHour"));
      if (misses < 2) return;
      // Two misses: the hands turn to the right time, and the child goes on.
      locked = true;
      check.disabled = true;
      fb.say(B.t("clockShow", { time: B.timeText(target) }));
      var d = target - tm;
      if (d > 360) d -= 720;
      if (d < -360) d += 720;
      turn(c, tm, d, 1400, function () {
        tm = target;
        box.appendChild(row([E.nextBtn(null, function () { done(true, false); })]));
      });
    });
    box.appendChild(row([check]));
  };

  /* ---------- balance: a two-pan balance ----------
     Things are a number (a weight of that mass, labelled with unit) or { pic, mass, label, say } (label is written on
     the thing, e.g. "؟" for an unknown). left, right: things on the pans at the start; tray: things the child can
     put on the pans; open: "left", "right" or "both" (where the child may put things, default "both").
     ask: "heavier" or "lighter" (tap that pan; with held: true the balance stays level until the child answers, so
     the weights are added up instead of seen), "balance" (put things on until it balances; putting something on
     the lighter pan that tips it past level is a miss), or "explore" (not scored). The default is "balance" with a tray, else
     "heavier". Optional prompt, say, unit (default کیلو; "" for none), and question, options, answer, pic: asked
     once it balances (e.g. «هندوانه چند کیلو است؟»). The beam turns by the weight on each side.
     lever: true makes it a seesaw: no pans, but seats along the beam (seats: how many on each side, default 3; seat 1
     is nearest the middle). Things on the beam give a seat ({ pic, mass, seat } or { mass, seat }), and each side
     turns the beam by mass × seat, so a light thing far out balances a heavy one near the middle. In a lever the
     child puts things on a seat (tap the thing, then the seat, or drag it); ask is "balance" or "explore". */
  E.steps.balance = function (s, box, done) {
    var ask = s.ask || (s.tray ? "balance" : "heavier");
    var unit = s.unit != null ? s.unit : B.t("balUnit");
    var open = ask === "heavier" || ask === "lighter" ? "" : s.open || "both";
    var prompt = s.prompt || B.t({ heavier: "balHeavier", lighter: "balLighter", balance: "balBalance", explore: "balExplore" }[ask]);
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    var sb = E.speakBtn(s.say || prompt, s.audio);
    if (sb) box.appendChild(sb);

    var stage = el("div", { class: "bal", dir: "ltr" });
    stage.appendChild(el("span", { class: "bal-post", "aria-hidden": "true" }));
    stage.appendChild(el("span", { class: "bal-foot", "aria-hidden": "true" }));
    var beam = el("span", { class: "bal-beam", "aria-hidden": "true" });
    stage.appendChild(beam);
    stage.appendChild(el("span", { class: "bal-knob", "aria-hidden": "true" }));
    var pans = {};
    var lever = !!s.lever, nSeats = s.seats || 3;
    if (lever) stage.classList.add("lever");
    ["left", "right"].forEach(function (side) {
      (lever ? Array.from({ length: nSeats }, function (_, i) { return i + 1; }) : [0]).forEach(function (d) {
        var key = lever ? side + ":" + d : side;
        var items = el("span", { class: "bal-items" });
        var p = lever
          ? el("div", { class: "bal-pan bal-seat " + side, "data-drop": key, "aria-label": B.t(side === "left" ? "balLeft" : "balRight") + " " + B.fa(d) }, [
            items, el("span", { class: "bal-dish", "aria-hidden": "true" })])
          : el("div", { class: "bal-pan " + side, "data-drop": key, "aria-label": B.t(side === "left" ? "balLeft" : "balRight") }, [
            el("span", { class: "bal-strings", "aria-hidden": "true" }), items, el("span", { class: "bal-dish", "aria-hidden": "true" })]);
        p._items = items;
        p._side = side;
        p._dist = lever ? d : 1;
        p._key = key;
        pans[key] = p;
        stage.appendChild(p);
      });
    });
    function seatOf(v, side) { return lever ? side + ":" + Math.max(1, Math.min(nSeats, (v && v.seat) || 1)) : side; }
    box.appendChild(stage);
    var tray = el("div", { class: "tray bal-tray", "data-drop": "tray" });
    var state = el("p", { class: "bal-state", "aria-live": "polite" });
    box.appendChild(state);

    var all = [];
    function thing(v, where) {
      var t = typeof v === "number" ? { mass: v, weight: true } : v;
      var b = el("button", { class: "bal-thing" + (t.weight ? " weight" : ""), type: "button" });
      if (t.weight) b.appendChild(el("span", { class: "bal-w" }, [el("b", { text: B.fa(t.mass) }), unit ? el("small", { text: unit }) : null]));
      else b.appendChild(el("span", { class: "bal-pic", text: t.pic }));
      if (!t.weight && t.label != null) b.appendChild(el("span", { class: "bal-label", text: typeof t.label === "number" ? B.fa(t.label) : t.label }));
      b.setAttribute("aria-label", t.say || (t.weight ? B.fa(t.mass) + (unit ? " " + unit : "") : t.label != null ? String(t.label) : t.pic));
      b._mass = t.mass;
      b._home = where;
      // Things that start on a pan the child may not change stay where they are.
      b._fixed = where !== "tray" && open !== "both" && open !== where;
      if (b._fixed || ask === "heavier" || ask === "lighter") { b.tabIndex = -1; b.classList.add("fixed"); }
      all.push(b);
      return b;
    }
    (s.left || []).forEach(function (v) { pans[seatOf(v, "left")]._items.appendChild(thing(v, "left")); });
    (s.right || []).forEach(function (v) { pans[seatOf(v, "right")]._items.appendChild(thing(v, "right")); });
    (s.tray || []).forEach(function (v) { tray.appendChild(thing(v, "tray")); });

    function where(b) { var p = b.closest(".bal-pan"); return p ? p._side : "tray"; }
    function spot(b) { var p = b.closest(".bal-pan"); return p ? p._key : "tray"; }
    function dist(b) { var p = b.closest(".bal-pan"); return p ? p._dist : 0; }
    function weight(side) {
      return all.reduce(function (sum, b) { return sum + (where(b) === side ? b._mass * dist(b) : 0); }, 0);
    }
    var maxDeg = 14;
    function tilt() {
      var l = weight("left"), r = weight("right"), d = r - l;
      return d === 0 ? 0 : (d > 0 ? 1 : -1) * Math.min(maxDeg, 5 + 9 * Math.abs(d) / Math.max(l, r));
    }
    // Pans hang from the ends of the beam: stage units are percent of its width; the stage is half as high.
    var PX = 50, PY = 16, L = lever ? 37 : 31;
    function draw(deg) {
      var a = deg * Math.PI / 180;
      beam.style.transform = "translate(-50%, -50%) rotate(" + deg + "deg)";
      Object.keys(pans).forEach(function (k) {
        var p = pans[k], f = (p._side === "left" ? -1 : 1) * (lever ? p._dist / nSeats : 1);
        p.style.left = PX + f * L * Math.cos(a) + "%";
        p.style.top = (PY + f * L * Math.sin(a)) * 2 + "%";
      });
      state.textContent = B.t(deg === 0 ? "balLevel" : deg < 0 ? "balLeftDown" : "balRightDown");
    }

    var fb = feedback(box);
    var misses = 0, finished = false;

    // ---- Which side is heavier (or lighter)? Tap the pan. ----
    if (ask === "heavier" || ask === "lighter") {
      draw(0);
      var want = weight("right") > weight("left") === (ask === "heavier") ? "right" : "left";
      var tries = 0;
      ["left", "right"].forEach(function (side) {
        var p = pans[side];
        p.setAttribute("role", "button");
        p.tabIndex = 0;
        var pick = function () {
          if (finished) return;
          if (side === want) {
            finished = true;
            p.classList.add("right");
            fb.good();
            // A held balance is let go once the child has answered.
            if (s.held) draw(tilt());
            setTimeout(function () { if (stage.isConnected) ending(box, s, done, true, tries === 0); }, s.held ? 1500 : 900);
            return;
          }
          tries++;
          bounce(p);
          fb.tryAgain();
          if (tries >= 2) { pans[want].classList.add("show"); fb.say(B.t("balShowSide")); }
        };
        p.addEventListener("click", pick);
        p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { pick(); e.preventDefault(); } });
      });
      // The things are put on level pans; then the balance tips.
      if (!s.held) setTimeout(function () { if (stage.isConnected) draw(tilt()); }, B.reducedMotion && B.reducedMotion() ? 0 : 500);
      if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
      return;
    }

    // ---- Putting things on: tap a thing to move it (to the open pan, or pick a pan when both are open), or drag it. ----
    box.appendChild(el("p", { class: "label", text: B.t("balTray") }));
    box.appendChild(tray);
    var hint = el("p", { class: "hint", text: B.t(lever ? "balHintLever" : open === "both" ? "balHintBoth" : "balHint") });
    box.appendChild(hint);
    var picked = null;
    draw(tilt());
    function move(b, to) {
      if (finished || b._fixed || to === spot(b)) return;
      var toSide = to === "tray" ? "tray" : pans[to]._side;
      if (to !== "tray" && open !== "both" && toSide !== open) { bounce(pans[to]); return; }
      var before = tilt();
      (to === "tray" ? tray : pans[to]._items).appendChild(b);
      unpick();
      draw(tilt());
      after(to, before);
    }
    function unpick() { if (picked) picked.classList.remove("picked"); picked = null; }
    // A miss is putting something on the lighter pan that tips it past level; taking things off never is.
    function after(to, before) {
      var sign = Math.sign(tilt());
      var both = weight("left") > 0 && weight("right") > 0;
      if (ask === "explore") { fb.clear(); return; }
      if (sign === 0 && both) {
        finished = true;
        all.forEach(function (b) { b.disabled = true; });
        fb.good(B.t("balDone"));
        setTimeout(function () { if (stage.isConnected) ending(box, s, done, true, misses === 0); }, 900);
        return;
      }
      var down = toSide === "left" ? -1 : 1;
      if (to !== "tray" && before !== 0 && Math.sign(before) !== down && sign === down) {
        misses++;
        bounce(beam);
        fb.tryAgain(B.t("balOver"));
        if (misses >= 2) showAnswer();
      } else fb.clear();
    }
    // After two misses the things move by themselves into a way that balances.
    function showAnswer() {
      var movable = all.filter(function (b) { return !b._fixed; });
      var sides = ["tray"].concat(Object.keys(pans).filter(function (k) { return open === "both" || pans[k]._side === open; }));
      var best = null, n = movable.length, total = Math.pow(sides.length, n);
      for (var code = 0; code < total && n <= 9; code++) {
        var l = 0, r = 0, changes = 0, c2 = code, plan = [];
        all.forEach(function (b) { if (b._fixed) { if (where(b) === "left") l += b._mass * dist(b); else if (where(b) === "right") r += b._mass * dist(b); } });
        for (var i = 0; i < n; i++) {
          var sd = sides[c2 % sides.length];
          c2 = Math.floor(c2 / sides.length);
          plan.push(sd);
          if (sd !== "tray") { if (pans[sd]._side === "left") l += movable[i]._mass * pans[sd]._dist; else r += movable[i]._mass * pans[sd]._dist; }
          if (sd !== spot(movable[i])) changes++;
        }
        if (l === r && l > 0 && (!best || changes < best.changes)) best = { plan: plan, changes: changes };
      }
      if (!best) return;
      finished = true;
      all.forEach(function (b) { b.disabled = true; });
      fb.say(B.t("balShow"));
      var k = 0;
      (function next() {
        if (!stage.isConnected) return;
        while (k < n && best.plan[k] === spot(movable[k])) k++;
        if (k < n) {
          var b = movable[k], to = best.plan[k];
          (to === "tray" ? tray : pans[to]._items).appendChild(b);
          b.classList.add("show");
          draw(tilt());
          k++;
          setTimeout(next, 700);
          return;
        }
        var go = E.nextBtn(null, function () {
          go.remove();
          if (s.question) ending(box, s, done, true, false);
          else done(true, false);
        });
        box.appendChild(row([go]));
      })();
    }
    all.forEach(function (b) {
      if (b._fixed) return;
      b.addEventListener("click", function () {
        if (finished) return;
        var at = where(b);
        if (at !== "tray") { move(b, "tray"); return; }
        if (open !== "both" && !lever) { move(b, open); return; }
        if (picked === b) { unpick(); return; }
        unpick();
        picked = b;
        b.classList.add("picked");
        fb.say(B.t("balPickPan"));
      });
      if (E.draggable) E.draggable(b, function (t) { move(b, t.getAttribute("data-drop")); });
    });
    Object.keys(pans).forEach(function (side) {
      var p = pans[side];
      if (open !== "both" && open !== p._side) return;
      p.classList.add("open");
      p.addEventListener("click", function (e) {
        if (!picked || e.target.closest(".bal-thing")) return;
        move(picked, side);
      });
      if (open !== "both" && !lever) return;
      p.setAttribute("role", "button");
      p.tabIndex = 0;
      p.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target === p && picked) { move(picked, side); e.preventDefault(); }
      });
    });
    if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
    if (ask === "explore") ending(box, s, done, false);
  };

  /* ---------- measure with a tool: ruler, measuring jug, thermometer ----------
     tool: "ruler" (a thing laid along a ruler, in centimetres), "jug" (water in a measuring jug, in millilitres) or
     "thermometer" (the red line in a thermometer, in degrees Celsius); value: what it shows. ask: "read" (the
     default with options: choose the right number) or "set" (raise or lower the level to value, with the arrows,
     by dragging, or with the keys, then press «درست شد»; after two misses it moves there by itself). Optional
     prompt, say, pic (the thing on the ruler), min, max, step (the numbered marks), snap (how far one move goes),
     unit. Scored. Without tool, measure is the plain step in js/engine.js. */
  var plainMeasure = E.steps.measure;
  var TOOLS = {
    ruler: { min: 0, max: 15, step: 1, snap: 1, unit: "measureCm" },
    jug: { min: 0, max: 1000, step: 100, snap: 50, unit: "measureMl" },
    thermometer: { min: -10, max: 50, step: 10, snap: 1, unit: "measureDeg" }
  };
  E.steps.measure = function (s, box, done) {
    if (!s.tool || !TOOLS[s.tool]) return plainMeasure(s, box, done);
    var d = TOOLS[s.tool], min = s.min != null ? s.min : d.min, max = s.max != null ? s.max : d.max;
    var step = s.step || d.step, snap = s.snap || d.snap, unit = s.unit || B.t(d.unit);
    var ask = s.ask || (s.options ? "read" : "set");
    var prompt = s.prompt || B.t(ask === "read" ? "measureRead" : "measureSet", { n: B.fa(s.value), unit: unit });
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    var sb = E.speakBtn(s.say || prompt, s.audio);
    if (sb) box.appendChild(sb);
    var vertical = s.tool !== "ruler";
    var W = vertical ? 120 : 320, H = vertical ? 240 : 110;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "mtool " + s.tool, role: "img" });
    // The scale runs from a to b (stage px) for min..max.
    var a = vertical ? 214 : 20, b = vertical ? 30 : 300;
    var px = function (v) { return a + (b - a) * (v - min) / (max - min); };
    var level = ask === "set" ? (s.start != null ? s.start : min) : s.value;
    var fill;
    if (s.tool === "jug") {
      svg.appendChild(svgEl("path", { d: "M26 20h68l-6 202H32z", class: "mtool-glass" }));
      svg.appendChild(svgEl("path", { d: "M94 40c18 0 18 60 0 70", class: "mtool-handle" }));
      fill = svgEl("rect", { x: 30, width: 60, class: "mtool-water" });
    } else if (s.tool === "thermometer") {
      svg.appendChild(svgEl("rect", { x: 48, y: 20, width: 24, height: 200, rx: 12, class: "mtool-tube" }));
      svg.appendChild(svgEl("circle", { cx: 60, cy: 222, r: 16, class: "mtool-bulb" }));
      fill = svgEl("rect", { x: 55, width: 10, class: "mtool-red" });
    } else {
      svg.appendChild(svgEl("rect", { x: 10, y: 50, width: 300, height: 44, rx: 4, class: "mtool-ruler" }));
      fill = svgEl("rect", { y: 22, height: 22, rx: 5, class: "mtool-thing" });
    }
    svg.appendChild(fill);
    for (var v = min; v <= max + 1e-9; v += snap) {
      var major = Math.abs((v - min) % step) < 1e-9 || Math.abs((v - min) % step - step) < 1e-9;
      var q = px(v);
      if (vertical) {
        var x1 = s.tool === "jug" ? 32 : 74;
        svg.appendChild(svgEl("line", { x1: x1, y1: q, x2: x1 + (major ? 12 : 6), y2: q, class: "mtool-tick" }));
        if (major) { var t = svgEl("text", { x: s.tool === "jug" ? 48 : 90, y: q + 4, class: "mtool-num" }); t.textContent = B.fa(v); svg.appendChild(t); }
      } else {
        svg.appendChild(svgEl("line", { x1: q, y1: 50, x2: q, y2: 50 + (major ? 16 : 9), class: "mtool-tick" }));
        if (major && (((max - min) / step <= 11) || Math.round((v - min) / step) % 2 === 0)) { var t2 = svgEl("text", { x: q, y: 86, class: "mtool-num", "text-anchor": "middle" }); t2.textContent = B.fa(v); svg.appendChild(t2); }
      }
    }
    if (s.tool === "ruler" && s.pic) {
      var pic = svgEl("text", { y: 18, class: "mtool-pic", "text-anchor": "middle" });
      pic.textContent = s.pic;
      svg.appendChild(pic);
    }
    function draw() {
      var q = px(level);
      if (s.tool === "jug") { fill.setAttribute("y", q); fill.setAttribute("height", Math.max(0, 220 - q)); }
      else if (s.tool === "thermometer") { fill.setAttribute("y", q); fill.setAttribute("height", Math.max(0, 222 - q)); }
      else { fill.setAttribute("x", a); fill.setAttribute("width", Math.max(0, q - a)); var p = svg.querySelector(".mtool-pic"); if (p) p.setAttribute("x", (a + q) / 2); }
      svg.setAttribute("aria-label", B.t("measureShows", { n: B.fa(level), unit: unit }));
    }
    draw();
    box.appendChild(el("div", { class: "mtool-wrap", dir: "ltr" }, [svg]));
    var fb = feedback(box);
    if (ask === "read") {
      E.choice(box, { options: E.nums(s.options), answer: s.value }, done);
      if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
      return;
    }
    // ---- set: move the level to value ----
    var misses = 0, over = false;
    function set(v) { if (over) return; level = Math.max(min, Math.min(max, Math.round(v / snap) * snap)); draw(); fb.clear(); }
    var down = el("button", { class: "btn secondary", type: "button", text: vertical ? "▼" : "◀", "aria-label": B.t("measureLess"), onclick: function () { set(level - snap); } });
    var up = el("button", { class: "btn secondary", type: "button", text: vertical ? "▲" : "▶", "aria-label": B.t("measureMore"), onclick: function () { set(level + snap); } });
    svg.setAttribute("tabindex", "0");
    svg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") { set(level + snap); e.preventDefault(); }
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") { set(level - snap); e.preventDefault(); }
    });
    var dragging = false;
    function fromPointer(e) {
      var r = svg.getBoundingClientRect();
      var pos = vertical ? (e.clientY - r.top) / r.height * H : (e.clientX - r.left) / r.width * W;
      set(min + (pos - a) / (b - a) * (max - min));
    }
    svg.addEventListener("pointerdown", function (e) { dragging = true; if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId); fromPointer(e); e.preventDefault(); });
    svg.addEventListener("pointermove", function (e) { if (dragging) fromPointer(e); });
    svg.addEventListener("pointerup", function () { dragging = false; });
    var check = E.nextBtn(B.t("measureCheck"), function () {
      if (over) return;
      if (Math.abs(level - s.value) < 1e-9) {
        over = true; fb.good();
        setTimeout(function () { if (svg.isConnected) done(true, misses === 0); }, 1000);
        return;
      }
      misses++;
      bounce(svg);
      fb.tryAgain(B.t(level < s.value ? "measureTooLow" : "measureTooHigh"));
      if (misses >= 2) {
        over = true; level = s.value; draw();
        fb.say(B.t("measureShowIt", { n: B.fa(s.value), unit: unit }));
        setTimeout(function () { if (svg.isConnected) done(true, false); }, 1800);
      }
    });
    box.appendChild(row([down, up, check]));
    if (sb) setTimeout(function () { B.speak(s.say || prompt, s.audio); }, 300);
  };
})();
