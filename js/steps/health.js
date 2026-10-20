/* باغچه — step types for سلامت و ایمنی (health, body and safety).
   - doit: the child does something real with their body, away from the screen (washes their hands, jumps like a
     rabbit, practises «بنشین، پناه بگیر، محکم نگه دار»), then taps «انجام دادم!». Not scored.
     Fields: pic (emoji), text, optional list (short lines, e.g. the moves of a movement break), say.
   - forparents: the parent note that ends each health lesson: how to practise at home and, for body safety and
     emergencies, how to talk about it calmly. Fields: tips (lines), optional text (one line said to the child
     first), pic, guide (the section of guide.html to point to, default health) and guideLabel. Not scored.
   - move: a guided movement routine, one move at a time. A person (a jointed drawing from js/art/rig-health.js)
     shows the move; when the child presses «شروع» the move is done `times` times and counted aloud at a calm pace
     (a count, never a timer or a score). Between moves a rest with one slow breath; the child goes on when ready
     («حرکت بعدی»). Each move can be made easier or harder. Not scored; «انجام دادم!» at the end.
     Fields: moves [{ name, say (how to do it, said aloud), part ("warm" | "calm": warm-up and calm-down, shown as
     such), art (a person in B.RIG, default the step's art, default "h-girl-front"), a, b (the two poses the move
     goes between, as for B.hpose: { armL: [x, y], legL: 20, … }), sink (how far down the person is at a, in the
     drawing's units: for a crouch), hop (how high it lifts at b, in stage units), step (a sideways sway at b), times (default 8), pace (ms for one time, default 1800), easier and harder
     ({ say, times, a, b, hop, pace }: what changes) }], optional prompt, art, beat (a steady beat to move to, in
     beats a minute: one time per beat, with a soft tick), rest (false: no rest between moves).
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";

  // ---- move ----
  function svgEl(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  // A soft tick for the beat (no file to download).
  var audio = null;
  function tick() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
      o.frequency.value = 660;
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.connect(g); g.connect(audio.destination);
      o.start(t); o.stop(t + 0.13);
    } catch (e) { /* no sound: the count still shows */ }
  }

  E.steps.move = function (s, box, done) {
    var moves = s.moves || [], k = 0, level = 0, timers = [], running = false;
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var title = el("p", { class: "mv-title" });
    var stage = el("div", { class: "stage scene-stage mv-stage" });
    var svg = svgEl("svg", { viewBox: "0 0 160 90", preserveAspectRatio: "xMidYMid meet", focusable: "false" });
    stage.appendChild(svg);
    var floor = svgEl("path", { d: "M0 80H160", stroke: "#c9a074", "stroke-width": ".8", fill: "none" });
    svg.appendChild(floor);
    var count = el("p", { class: "mv-count", "aria-live": "polite" });
    var say = el("p", { class: "prompt mv-say" });
    var easier = el("button", { class: "btn quiet", type: "button", text: B.t("mvEasier"), "aria-pressed": "false", onclick: function () { setLevel(level === -1 ? 0 : -1); } });
    var harder = el("button", { class: "btn quiet", type: "button", text: B.t("mvHarder"), "aria-pressed": "false", onclick: function () { setLevel(level === 1 ? 0 : 1); } });
    var start = el("button", { class: "btn", type: "button", text: B.t("mvStart"), onclick: function () { go(); } });
    var next = el("button", { class: "btn", type: "button", text: B.t("mvNext"), hidden: "hidden", onclick: function () { show(k + 1); } });
    var speak = el("button", { class: "speak-btn", type: "button", text: B.t("listen"), onclick: function () { B.speak(cur().say); } });
    [title, stage, count, say, el("div", { class: "row", style: "justify-content:center" }, [easier, harder, speak]),
      el("div", { class: "row", style: "justify-content:center;margin-top:8px" }, [start, next])].forEach(function (n) { box.appendChild(n); });

    // The person: a place group (translate) around the drawing, as in js/scene.js, so pieces turn round their pivots.
    var who = null, whoArt = null, place = null, breath = null;
    function person(art) {
      if (whoArt === art) return;
      if (place) svg.removeChild(place);
      whoArt = art;
      place = svgEl("g", { class: "part" });
      who = svgEl("g", { class: "part-in" });
      var r = B.RIG[art];
      who.innerHTML = typeof r === "function" ? r({}) : r;
      place.appendChild(who);
      svg.appendChild(place);
      place.style.transform = "translate(80px,80px)";
      who.style.transform = "scale(2)";
      Array.prototype.forEach.call(who.querySelectorAll("[data-pivot]"), function (n) {
        var pv = n.getAttribute("data-pivot").split(/[ ,]+/).map(Number);
        n.style.transformOrigin = pv[0] + "px " + pv[1] + "px";
      });
    }
    function piece(name) { return who.querySelector('[data-part="' + name + '"]'); }
    // The angles of a pose, with every joint the other pose moves (so it goes back to 0 there).
    function pose(m, spec, other) {
      var a = B.hposeAngles(m.art, spec || {}), b = B.hposeAngles(m.art, other || {});
      Object.keys(b).forEach(function (j) { if (!(j in a)) a[j] = 0; });
      return a;
    }
    function cur() {
      var m = moves[k], v = level < 0 ? m.easier : level > 0 ? m.harder : null;
      var c = Object.assign({ art: s.art || "h-girl-front", times: 8, pace: 1800 }, m, v || {});
      if (s.beat) c.pace = 60000 / s.beat;
      c.say = (v && v.say) || m.say || "";
      return c;
    }
    function stopAll() {
      timers.forEach(clearTimeout); timers = [];
      if (who) who.getAnimations({ subtree: true }).forEach(function (a) { a.cancel(); });
      if (place) place.getAnimations().forEach(function (a) { a.cancel(); });
      if (breath) { breath.remove(); breath = null; }
      running = false;
    }
    function later(fn, ms) { timers.push(setTimeout(function () { if (box.isConnected) fn(); else stopAll(); }, ms)); }

    // One time through the move: from a to b and back, in ms.
    function once(m, ms, iterations) {
      var A = pose(m, m.a, m.b), Bp = pose(m, m.b, m.a), n = iterations || 1;
      if (B.reducedMotion()) {
        Object.keys(Bp).forEach(function (j) { var p = piece(j); if (p) p.style.transform = "rotate(" + Bp[j] + "deg)"; });
        return;
      }
      Object.keys(Bp).forEach(function (j) {
        var p = piece(j);
        if (p) p.animate([{ transform: "rotate(" + (A[j] || 0) + "deg)" }, { transform: "rotate(" + Bp[j] + "deg)" }, { transform: "rotate(" + (A[j] || 0) + "deg)" }],
          { duration: ms, iterations: n, easing: "ease-in-out" });
      });
      // sink: how far the person goes down at a (in the drawing's units: a crouch), hop: how high it lifts at b.
      var y0 = 80 + (m.sink || 0) * 2, rest = "translate(80px," + y0 + "px)";
      if (m.hop || m.step || m.sink) place.animate([{ transform: rest }, { transform: "translate(" + (80 + (m.step || 0)) + "px," + (80 - (m.hop || 0)) + "px)" }, { transform: rest }],
        { duration: ms, iterations: n, easing: "ease-in-out" });
    }

    function setLevel(n) {
      level = n;
      easier.setAttribute("aria-pressed", String(n < 0));
      harder.setAttribute("aria-pressed", String(n > 0));
      show(k, true);
    }
    // Show move n: its name, how to do it, and the person doing it slowly a few times.
    function show(n, sameMove) {
      stopAll();
      if (n >= moves.length) return;
      k = n;
      var m = moves[k], c = cur();
      easier.hidden = !m.easier;
      harder.hidden = !m.harder;
      if (!sameMove) { level = 0; easier.setAttribute("aria-pressed", "false"); harder.setAttribute("aria-pressed", "false"); c = cur(); }
      person(c.art);
      var tag = m.part === "warm" ? B.t("mvWarm") : m.part === "calm" ? B.t("mvCalm") : "";
      title.textContent = B.t("mvOf", { n: B.fa(k + 1), all: B.fa(moves.length) }) + (tag ? " · " + tag : "") + ": " + c.name;
      say.textContent = c.say + " " + B.t("mvTimes", { n: B.fa(c.times) });
      count.textContent = "";
      start.hidden = false; start.textContent = B.t("mvStart");
      next.hidden = true;
      B.speak(c.name + ". " + c.say);
      once(c, Math.max(c.pace, 1600), 2);
    }
    // Do it, counted aloud: one time per count.
    function go() {
      stopAll();
      running = true;
      var c = cur(), i = 0;
      start.hidden = true;
      next.hidden = true;
      var quiet = c.pace < 900;
      (function step() {
        if (!running) return;
        if (i >= c.times) { finishMove(); return; }
        i++;
        count.textContent = B.fa(i);
        if (s.beat) tick();
        if (!quiet || i === 1 || i % 10 === 0) B.speak(B.NUMBER_WORDS[i] || B.fa(i));
        once(c, c.pace);
        later(step, c.pace);
      })();
    }
    function finishMove() {
      running = false;
      start.hidden = false; start.textContent = B.t("mvAgain");
      if (k >= moves.length - 1) {
        count.textContent = "";
        next.hidden = false;
        next.textContent = B.t("hlDid");
        next.onclick = function () { stopAll(); done(false); };
        return;
      }
      if (s.rest === false) { next.hidden = false; return; }
      // A rest: one slow breath, the ring growing as we breathe in and shrinking as we breathe out.
      count.textContent = "";
      say.textContent = B.t("mvRest");
      B.speak(B.t("mvRest"));
      breath = svgEl("g", { class: "part" });
      var r = B.RIG["h-breath"];
      breath.innerHTML = typeof r === "function" ? r({}) : r || "";
      breath.style.transform = "translate(136px,30px)";
      svg.appendChild(breath);
      if (!B.reducedMotion()) breath.animate([{ transform: "translate(136px,30px) scale(.7)" }, { transform: "translate(136px,30px) scale(1.4)" }, { transform: "translate(136px,30px) scale(.7)" }],
        { duration: 8000, easing: "ease-in-out" });
      later(function () { next.hidden = false; }, 2500);
    }
    show(0);
  };

  E.steps.doit = function (s, box, done) {
    box.appendChild(el("p", { class: "hl-pic", "aria-hidden": "true", text: s.pic || "🙌" }));
    box.appendChild(el("p", { class: "prompt", text: s.text }));
    if (s.list) box.appendChild(el("ol", { class: "hl-list" }, s.list.map(function (t) { return el("li", { text: t }); })));
    var say = s.say || [s.text].concat(s.list || []).join(" ");
    var sb = E.speakBtn(say, s.audio);
    var go = E.nextBtn(B.t("hlDid"), function () { done(false); });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb, go]));
    if (sb) setTimeout(function () { B.speak(say, s.audio); }, 300);
  };

  E.steps.forparents = function (s, box, done) {
    if (s.text) {
      box.appendChild(el("p", { class: "hl-pic", "aria-hidden": "true", text: s.pic || "🏡" }));
      box.appendChild(el("p", { class: "prompt", text: s.text }));
      B.speak(s.text);
    }
    box.appendChild(el("div", { class: "parent-tip hl-note" }, [
      el("strong", { text: B.t("hlParentsTitle") }),
      el("ul", null, s.tips.map(function (t) { return el("li", { text: t }); })),
      el("p", { class: "hint" }, [B.t("hlGuideBefore"), el("a", { href: "guide.html#" + (s.guide || "health"), text: s.guideLabel || B.t("hlGuideLink") })])
    ]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("finish"), function () { done(false); })]));
  };
})();
