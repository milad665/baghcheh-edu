/* باغچه — animated content without video: how a letter is written (stroke order), and short animated picture
   stories or explanations. Everything is SVG/CSS drawn on the device; with "reduce motion" turned on, strokes
   and scenes appear step by step without movement. Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";

  B.reducedMotion = function () {
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  // A dot is drawn as a tiny round-capped line, so dots and strokes are styled the same way.
  function strokePath(st) {
    return typeof st === "string" ? st : "M" + st[0] + " " + st[1] + " l0.01 0";
  }

  /* How a letter is written, drawn on an SVG: a light model of the whole letter, then a pen that draws each
     stroke in order. Returns null when the letter has no strokes in js/strokes.js.
     opts.ghost: stroke width of the light model (wider on the trace step, to write inside it); opts.fade: see below. */
  B.writeLetter = function (ch, opts) {
    opts = opts || {};
    var strokes = B.STROKES && B.STROKES[ch];
    if (!strokes) return null;
    var svg = svgEl("svg", { viewBox: "0 0 200 200", class: "write-svg", role: "img", "aria-label": B.t("writeAria", { letter: ch }) });
    svg.appendChild(svgEl("line", { x1: 20, y1: 130, x2: 180, y2: 130, class: "write-base" }));
    var ghost = svgEl("g", { class: "write-ghost", "stroke-width": opts.ghost || 9 });
    var ink = svgEl("g", { class: "write-ink" });
    var paths = strokes.map(function (st) {
      // Dots stay small in the wide model, so the three dots of «ش» don't run together.
      ghost.appendChild(svgEl("path", typeof st === "string" ? { d: st } : { d: strokePath(st), "stroke-width": Math.min(opts.ghost || 9, 15) }));
      var p = svgEl("path", { d: strokePath(st) });
      p.style.opacity = 0;
      ink.appendChild(p);
      return p;
    });
    var pen = svgEl("circle", { r: 8, class: "write-pen", cx: -50, cy: -50 });
    svg.appendChild(ghost);
    svg.appendChild(ink);
    svg.appendChild(pen);

    var run = 0;
    function hideAll() {
      paths.forEach(function (p) { p.style.opacity = 0; });
      pen.setAttribute("cx", -50);
    }
    function play() {
      var me = ++run;
      hideAll();
      var reduced = B.reducedMotion();
      var i = 0;
      function nextStroke() {
        if (me !== run || !svg.isConnected) return;
        if (i >= paths.length) {
          pen.setAttribute("cx", -50);
          // opts.fade: the drawn strokes fade away again, leaving the light model to write on.
          if (opts.fade) setTimeout(function () { if (me === run) paths.forEach(function (p) { p.style.opacity = 0; }); }, 900);
          return;
        }
        var p = paths[i++], len = p.getTotalLength();
        p.style.opacity = 1;
        // Reduced motion: each stroke appears whole, one after another.
        if (reduced) { setTimeout(nextStroke, 700); return; }
        p.style.strokeDasharray = len + " " + len;
        var dur = Math.max(260, len * 6), t0 = null;
        function frame(t) {
          if (me !== run || !svg.isConnected) return;
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / dur);
          k = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in and out, like a hand
          p.style.strokeDashoffset = len * (1 - k);
          var pt = p.getPointAtLength(len * k);
          pen.setAttribute("cx", pt.x);
          pen.setAttribute("cy", pt.y);
          if (k < 1) requestAnimationFrame(frame);
          else setTimeout(nextStroke, 280);
        }
        requestAnimationFrame(frame);
      }
      setTimeout(nextStroke, 300);
    }
    return { svg: svg, play: play, show: function () { run++; paths.forEach(function (p) { p.style.opacity = 1; p.style.strokeDasharray = ""; }); } };
  };

  // The panel on a letter's intro step: the handwritten letter being written, with a button to watch again.
  B.writePanel = function (ch) {
    var w = B.writeLetter(ch);
    if (!w) return null;
    var again = el("button", { class: "btn quiet", type: "button", text: B.t("writeAgain"), onclick: function () { w.play(); } });
    setTimeout(w.play, 400);
    return el("figure", { class: "write-panel" }, [w.svg, el("figcaption", null, [B.t("writeCaption"), again])]);
  };

  /* ---------- story: a short animated picture story or explanation ----------
     cast: { id: "👧", … } (an emoji or a short text such as "۳ + ۲"). scenes: [{ caption, say, audio, at }], where
     at: { id: [x, y] or [x, y, { size, flip, act }] or null to hide }. x and y are percentages of the stage
     (x from the left). An actor keeps its place until a scene moves it; act is "bounce", "spin", "grow" or "shake".
     Optional question, options, answer, pic: a question about the story at the end (then the step is scored). */
  E.steps.story = function (s, box, done) {
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var stage = el("div", { class: "stage" + (s.tall ? " tall" : ""), role: "img", "aria-label": s.scenes.map(function (sc) { return sc.caption; }).join(" ") });
    if (s.bg) stage.style.background = s.bg;
    var actors = {};
    Object.keys(s.cast).forEach(function (id) {
      // dir auto: «۳ + ۲ = ۵» is written left to right, «۷ فرد» right to left.
      var a = el("span", { class: "actor", "aria-hidden": "true" }, [el("span", { class: "actor-in", dir: "auto", text: s.cast[id] })]);
      a.style.opacity = 0;
      actors[id] = a;
      stage.appendChild(a);
    });
    var caption = el("p", { class: "caption", "aria-live": "polite" });
    var dots = el("div", { class: "scene-dots", "aria-hidden": "true" });
    s.scenes.forEach(function () { dots.appendChild(el("i")); });
    box.appendChild(stage);
    box.appendChild(dots);
    box.appendChild(caption);

    var at = -1, timer = null, seenAll = false;
    function place(id, v) {
      var a = actors[id];
      if (!a) return;
      if (v === null) { a.style.opacity = 0; return; }
      var o = v[2] || {};
      a.style.opacity = 1;
      a.style.left = v[0] + "%";
      a.style.top = v[1] + "%";
      a.style.setProperty("--size", o.size || 1);
      a.style.setProperty("--flip", o.flip ? -1 : 1);
      var inner = a.firstChild;
      inner.className = "actor-in";
      if (o.act) { void inner.offsetWidth; inner.classList.add("act-" + o.act); }
    }
    function showScene(n) {
      at = n;
      // Scene 1 sets everything from scratch (no movement), so replaying gives the same picture.
      if (n === 0) {
        stage.classList.add("snap");
        Object.keys(actors).forEach(function (id) { actors[id].style.opacity = 0; });
      }
      var sc = s.scenes[n];
      Object.keys(sc.at || {}).forEach(function (id) { place(id, sc.at[id]); });
      if (n === 0) { void stage.offsetWidth; stage.classList.remove("snap"); }
      caption.textContent = sc.caption || "";
      Array.prototype.forEach.call(dots.children, function (d, i) { d.className = i === n ? "on" : i < n ? "seen" : ""; });
      if (sc.caption || sc.audio) B.speak(sc.say || sc.caption, sc.audio);
      if (n === s.scenes.length - 1) finished();
    }
    function sceneTime(sc) { return Math.max(3200, (sc.caption || "").length * 110); }
    function playFrom(n) {
      stop();
      playBtn.textContent = B.t("pause");
      showScene(n);
      (function tick() {
        if (at >= s.scenes.length - 1) { stop(); return; }
        timer = setTimeout(function () {
          if (!stage.isConnected) return;
          showScene(at + 1);
          tick();
        }, sceneTime(s.scenes[at]));
      })();
    }
    function stop() { clearTimeout(timer); timer = null; playBtn.textContent = B.t("play"); }
    var playBtn = el("button", { class: "btn secondary", type: "button", text: B.t("play"), onclick: function () {
      if (timer) stop();
      else playFrom(at < 0 || at >= s.scenes.length - 1 ? 0 : at + 1);
    } });
    var replay = el("button", { class: "btn quiet", type: "button", text: B.t("replay"), onclick: function () { playFrom(0); } });
    var ask = el("div");
    var next = E.nextBtn(null, function () { stop(); done(false); });
    next.disabled = true;
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [playBtn, replay]));
    box.appendChild(ask);
    if (!s.question) box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:8px" }, [next]));

    function finished() {
      if (seenAll) return;
      seenAll = true;
      if (!s.question) { next.disabled = false; return; }
      ask.appendChild(el("p", { class: "prompt", text: s.question }));
      E.choice(ask, { options: s.options, answer: s.answer, pic: s.pic }, function (scored, first) { stop(); done(scored, first); });
      if (ask.scrollIntoView) ask.scrollIntoView({ block: "nearest", behavior: B.reducedMotion() ? "auto" : "smooth" });
    }
    setTimeout(function () { if (stage.isConnected && at < 0) playFrom(0); }, 400);
  };
})();
