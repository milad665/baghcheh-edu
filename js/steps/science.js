/* باغچه — step types for science (علوم): inquiry steps where the child guesses, tries and sees.
   - test: guess what will happen to each thing (floats or sinks, does the magnet pull it), then watch it happen.
     Guesses are never marked wrong: guessing, then checking, is the skill. Not scored.
   - shadow: move the sun across the sky and watch a tree's shadow change; small tasks, then an optional question.
   - home: a safe experiment to do at home with everyday things, written for the parent. Not scored.
   Step types are added to B.engine.steps (js/engine.js). */
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

  /* ---------- test: guess, then see ----------
     kind: "float" (a basin of water) or "magnet". items: [{ pic, say, yes }] where yes means it floats / the
     magnet pulls it. Optional prompt; ask (the question for each thing), yesLabel/noLabel (the two guesses),
     yesSaw/noSaw (what happened). Defaults for each kind are in js/strings.js. */
  E.steps.test = function (s, box, done) {
    var kind = s.kind === "magnet" ? "magnet" : "float";
    var T = function (k) { return s[k] || B.t("sci_" + kind + "_" + k); };
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var stage = el("div", { class: "sci-test " + kind, "aria-hidden": "true" });
    if (kind === "float") stage.appendChild(el("div", { class: "sci-water" }));
    else stage.appendChild(el("span", { class: "sci-magnet", text: "🧲" }));
    var thing = el("span", { class: "sci-thing" });
    stage.appendChild(thing);
    box.appendChild(stage);
    var ask = el("p", { class: "prompt", "aria-live": "polite" });
    var guesses = el("div", { class: "options" });
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var groups = el("div", { class: "sci-groups" });
    var yesBox = el("div", { class: "sci-group" }, [el("strong", { text: T("yesSaw") }), el("span", { class: "sci-group-in" })]);
    var noBox = el("div", { class: "sci-group" }, [el("strong", { text: T("noSaw") }), el("span", { class: "sci-group-in" })]);
    groups.appendChild(yesBox);
    groups.appendChild(noBox);
    var next = E.nextBtn(null, function () { done(false); });
    var row = el("div", { class: "row", style: "justify-content:center" }, [next]);
    box.appendChild(fb);
    box.appendChild(ask);
    box.appendChild(guesses);
    box.appendChild(groups);
    box.appendChild(row);
    next.style.visibility = "hidden";

    var i = 0;
    function show() {
      var it = s.items[i];
      stage.className = "sci-test " + kind;
      // The next thing appears at the top at once, without flying back up.
      thing.style.transition = "none";
      thing.className = "sci-thing";
      thing.textContent = it.pic;
      void thing.offsetWidth;
      thing.style.transition = "";
      ask.textContent = T("ask");
      fb.className = "feedback";
      fb.textContent = it.say || "";
      B.speak((it.say ? it.say + ". " : "") + T("ask"));
      guesses.innerHTML = "";
      [[T("yesLabel"), true], [T("noLabel"), false]].forEach(function (g) {
        guesses.appendChild(el("button", { class: "opt", type: "button", text: g[0], onclick: function () { tryIt(g[1]); } }));
      });
    }
    function tryIt(guess) {
      var it = s.items[i];
      Array.prototype.forEach.call(guesses.children, function (b) { b.disabled = true; });
      fb.textContent = B.t("sciWatch");
      void thing.offsetWidth;
      thing.classList.add(it.yes ? "yes" : "no");
      setTimeout(function () {
        if (!thing.isConnected) return;
        var saw = it.yes ? T("yesSaw") : T("noSaw");
        ask.textContent = "";
        fb.className = "feedback good";
        fb.textContent = saw + "! " + B.t(guess === !!it.yes ? "sciGuessRight" : "sciGuessNew");
        B.speak(fb.textContent);
        (it.yes ? yesBox : noBox).lastChild.appendChild(el("span", { text: it.pic }));
        guesses.innerHTML = "";
        i++;
        if (i < s.items.length) {
          guesses.appendChild(E.nextBtn(null, show));
        } else {
          ask.textContent = "";
          next.style.visibility = "";
        }
      }, B.reducedMotion() ? 300 : 1500);
    }
    show();
  };

  /* ---------- shadow: move the sun, watch the shadow ----------
     tasks: [{ prompt, want }] where want is "short", "long", "left" or "right" (a long shadow on that side).
     Optional thing (emoji, default a tree), prompt, and question, options, answer, pic: asked at the end (scored). */
  E.steps.shadow = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("sciShadowPrompt") }));
    var GROUND = 128, X = 160, H = 46;
    var svg = svgEl("svg", { viewBox: "0 0 320 170", class: "sci-sky", tabindex: "0", role: "slider",
      "aria-label": B.t("sciSunAria"), "aria-valuemin": "0", "aria-valuemax": "100" });
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 320, height: GROUND, class: "sci-sky-bg" }));
    svg.appendChild(svgEl("rect", { x: 0, y: GROUND, width: 320, height: 170 - GROUND, class: "sci-ground" }));
    svg.appendChild(svgEl("path", { d: "M 290 " + GROUND + " A 130 112 0 0 0 30 " + GROUND, class: "sci-arc" }));
    var shade = svgEl("ellipse", { class: "sci-shade", cy: GROUND + 6, ry: 7 });
    svg.appendChild(shade);
    var tree = svgEl("text", { x: X, y: GROUND + 4, class: "sci-tree", "text-anchor": "middle" });
    tree.textContent = s.thing || "🌳";
    svg.appendChild(tree);
    var sun = svgEl("text", { class: "sci-sun", "text-anchor": "middle", "dominant-baseline": "central" });
    sun.textContent = "☀️";
    svg.appendChild(sun);
    [["sciMorning", 292, "end"], ["sciNoon", 160, "middle"], ["sciEvening", 28, "start"]].forEach(function (l) {
      var t = svgEl("text", { x: l[1], y: 162, class: "sci-sky-label", "text-anchor": l[2] });
      t.textContent = B.t(l[0]);
      svg.appendChild(t);
    });

    // t: 0 = morning (sun low on the right, in the east) … 1 = evening (low on the left).
    var t = 0.12, len = 0, side = "";
    function draw() {
      var a = Math.PI * t;
      var sx = X + 130 * Math.cos(a), sy = GROUND - 112 * Math.sin(a);
      sun.setAttribute("x", sx);
      sun.setAttribute("y", sy);
      var elev = Math.max(0.12, 1.25 * Math.sin(a));
      len = Math.min(150, H / Math.tan(elev));
      side = Math.cos(a) > 0 ? "left" : "right"; // the shadow falls away from the sun
      var dir = side === "left" ? -1 : 1;
      shade.setAttribute("cx", X + dir * len / 2);
      shade.setAttribute("rx", len / 2 + 9);
      svg.setAttribute("aria-valuenow", Math.round(t * 100));
      svg.setAttribute("aria-valuetext", B.t(len < 25 ? "sciShadowShort" : len > 90 ? "sciShadowLong" : "sciShadowMid"));
      check();
    }
    function setT(v) { t = Math.max(0.03, Math.min(0.97, v)); draw(); }
    function fromPointer(e) {
      var r = svg.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * 320;
      setT(Math.acos(Math.max(-1, Math.min(1, (x - X) / 130))) / Math.PI);
    }
    var dragging = false;
    svg.addEventListener("pointerdown", function (e) { dragging = true; if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId); fromPointer(e); e.preventDefault(); });
    svg.addEventListener("pointermove", function (e) { if (dragging) fromPointer(e); });
    svg.addEventListener("pointerup", function () { dragging = false; });
    svg.addEventListener("pointercancel", function () { dragging = false; });
    // Keys follow the picture: the left arrow moves the sun to the left (later in the day).
    svg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { setT(t + 0.05); e.preventDefault(); }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { setT(t - 0.05); e.preventDefault(); }
    });
    box.appendChild(svg);
    var earlier = el("button", { class: "btn secondary", type: "button", "aria-label": B.t("sciSunEarlier"), dir: "ltr", text: "☀️ →", onclick: function () { setT(t - 0.08); } });
    var later = el("button", { class: "btn secondary", type: "button", "aria-label": B.t("sciSunLater"), dir: "ltr", text: "← ☀️", onclick: function () { setT(t + 0.08); } });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [earlier, later]));
    var task = el("p", { class: "prompt", "aria-live": "polite" });
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var ask = el("div");
    var next = E.nextBtn(null, function () { done(false); });
    next.style.visibility = "hidden";
    box.appendChild(task);
    box.appendChild(fb);
    box.appendChild(ask);
    if (!s.question) box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [next]));

    var tasks = s.tasks || [], k = 0, waiting = false, ended = false;
    function meets(w) {
      if (w === "short") return len < 22;
      if (w === "long") return len > 95;
      return len > 95 && side === w;
    }
    function showTask() {
      if (k >= tasks.length) { end(); return; }
      task.textContent = tasks[k].prompt;
      B.speak(tasks[k].prompt);
      waiting = false;
    }
    function check() {
      if (waiting || ended || k >= tasks.length || !meets(tasks[k].want)) return;
      waiting = true;
      fb.className = "feedback good";
      fb.textContent = E.pick(B.T.praise);
      B.speak(fb.textContent);
      setTimeout(function () {
        if (!svg.isConnected) return;
        fb.textContent = "";
        k++;
        showTask();
      }, 1400);
    }
    function end() {
      ended = true;
      task.textContent = "";
      if (!s.question) { next.style.visibility = ""; return; }
      ask.appendChild(el("p", { class: "prompt", text: s.question }));
      E.choice(ask, { options: s.options, answer: s.answer, pic: s.pic }, done);
    }
    draw();
    setTimeout(function () { if (svg.isConnected) showTask(); }, 300);
  };

  /* ---------- home: an experiment to do at home, for the parent ----------
     pic (emoji), text (one short line for the child, read aloud), need [things], steps [what to do],
     optional ask (a question to ask the child at the end). Only safe, everyday things. */
  E.steps.home = function (s, box, done) {
    box.appendChild(el("p", { class: "scene", "aria-hidden": "true", text: s.pic }));
    box.appendChild(el("p", { class: "prompt", text: s.text }));
    var sb = E.speakBtn(s.say || s.text, s.audio);
    if (sb) box.appendChild(sb);
    var tip = el("div", { class: "parent-tip sci-home" }, [
      el("strong", { text: B.t("sciHomeTitle") }),
      el("p", { class: "hint", text: B.t("sciHomeNote") }),
      el("p", null, [el("strong", { text: B.t("sciHomeNeed") }), " " + s.need.join("، ")]),
      el("strong", { text: B.t("sciHomeDo") }),
      el("ol", null, s.steps.map(function (x) { return el("li", { text: x }); }))
    ]);
    if (s.ask) tip.appendChild(el("p", null, [el("strong", { text: B.t("sciHomeAsk") }), " " + s.ask]));
    box.appendChild(tip);
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("finish"), function () { done(false); })]));
    if (sb) setTimeout(function () { B.speak(s.say || s.text, s.audio); }, 300);
  };
})();
