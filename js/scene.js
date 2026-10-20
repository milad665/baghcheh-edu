/* باغچه — animated scenes (step type `scene`): picture explanations where the drawing really does what the words
   say. A scene is one SVG stage (viewBox 160 × 90) with parts drawn from js/art/rig.js, and a list of beats; each
   beat has a caption (said aloud) and a timeline of tracks that move, turn, squash, fade, draw, emit and count,
   all at once or one after another. Animation is the browser's own Web Animations API: no library, nothing to
   download. With "reduce motion" on, each beat jumps straight to its end picture, still one beat at a time.
   Step types are added to B.engine.steps (js/engine.js).

   { type: "scene", prompt, bg: "#colour" (behind everything, default the page's sky),
     parts: { id: { art, at: [x, y], s, sx, sy, r, o, flip, z, under } },
     scenes: [ { caption, say, audio, hold, key, do: [tracks], wait } ],   (key: the ms that shows the beat best,
                                                                            for the storyboard; default its end)
     question, options, answer, pic (a question at the end: then the step is scored) }

   parts. art is the name of a drawing in B.RIG (js/art/rig.js) or an emoji (drawn from js/art like everywhere
   else). Every drawing has its own origin (0, 0), usually where it stands on the floor, and at is where that
   origin goes on the stage. s scales it (sx, sy separately), r turns it (degrees), o is its opacity (0 hides it,
   default 1), flip mirrors it. Parts are drawn in the order they are listed; under: id puts a part inside
   another, so it moves with it (a cat on a wardrobe). depth: how far away it is, for scenery that slides by more
   slowly when the camera moves (parallax): 1 is the ground the characters walk on (the default), 0.3 far hills,
   0 the sky (does not move), 1.3 things close in front. look: options for drawings that take them (B.RIG.walker). A drawing may have named pieces (data-part="thumb" with
   data-pivot="x y"); tracks reach them as "hands.left" or "tap.handle".

   tracks (all optional fields; at = start in ms from the beat's start, dur = length, default 900):
     { id, to: { x, y, s, sx, sy, r, o }, at, dur, ease, times, yoyo }   move/turn/scale/fade; times repeats,
                                                                          yoyo goes back and forth; "+3" or
                                                                          "-0.2" change a value by that much
     { id, path: "M… C…", at, dur, ease }                                 move along a path (stage units)
     { id, draw: true, oneByOne, at, dur }                                draw its lines, like a pencil (all at
                                                                          once, or oneByOne in order)
     { emit: "bubble" | "drop" | "spark", where: [x, y] (or from: id, where then an offset), n, spread: [w, h],
       rise (how far they drift up; negative falls), life, keep, at, dur }  little things that appear and drift
     { count: id, from, to, at, dur }                                     a number counting (Persian digits)
     { cam: { x, y, zoom }, at, dur }                                     the camera: centre and zoom. The world
                                                                          can be wider than the stage (parts at
                                                                          x > 160): pan along it to travel
     { id, walk: [x, y], at, dur, steps }                                 walk there: moves in a straight line
                                                                          while the drawing's legs and arms swing
                                                                          (pieces legF, legB, armF, armB, body:
                                                                          the "walker" drawing has them)
   A beat lasts until its last track ends and its caption has been said (hold: at least that many ms), then rests
   a moment before the next one. Children need time to take each step in: B.SCENE_PACE (default 1.3) stretches
   every time in a scene, and a beat never moves on while its caption is still being spoken.

   wait: the child does it, then the scene goes on («ادامه» skips).
     { rub: true, n, hint, each: [tracks] }: the child rubs back and forth over the stage (mouse, finger, or ← → keys);
       every stroke plays `each`; after n strokes the scene goes on.
     { tap: [ids], hint, each: [tracks], counter, inOrder }: the child taps each of those parts once (mouse, finger,
       or Tab and Enter), to count them or to pick them one by one. Every tap plays `each`, where "$" stands for the
       part just tapped ({ id: "$", to: { y: "-4" }, yoyo: true, times: 2 }); counter: a part with a number
       (data-count) that shows how many have been tapped. inOrder: they must be tapped in the order given (a wrong
       one just wobbles). After the last one the scene goes on.
     { choose: [lines], answer, hint, each: [tracks] }: the child picks what to say (a role play, used by the
       `dialogue` step in js/steps/english.js): the lines are shown as buttons under the stage; the right one is
       then shown as the caption and said aloud while `each` plays (the child's character talking), and the child
       says it too. Misses are counted in box.sceneFirst (false once a line was missed). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";
  var W = 160, H = 90;

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  var EASE = { "in": "ease-in", out: "ease-out", inout: "ease-in-out", linear: "linear",
    back: "cubic-bezier(.34,1.56,.64,1)", soft: "cubic-bezier(.45,.05,.55,.95)" };
  function ease(e) { return EASE[e] || e || "ease-in-out"; }

  // A part's drawing: B.RIG[name] (a string, or a function returning one), or an emoji drawn by js/art.
  /* People in a scene are drawn whole. The person emoji pictures (js/art/people.js) are head-and-shoulders portraits
     for cards and tiles, so in a scene each one becomes the full-body "walker" drawing (it can walk, too). A part's
     own look changes any of these; grown-ups are drawn bigger (size). */
  var PEOPLE = {
    "👧": { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#6b3f26" }, "👦": { hair: "short", top: "#4f8fd6" },
    "🧒": { hair: "short", top: "#f59e0b" },
    "👩": { hair: "auto", kind: "woman", top: "#5a9a45", bottom: "dress", size: 1.28 }, "👨": { hair: "short", top: "#3f6f8f", bottom: "#5b4636", size: 1.32 },
    "👵": { hair: "auto", kind: "grandma", top: "#b5523b", bottom: "dress", cane: true, size: 1.22 },
    "👴": { hair: "short", hairColor: "#d9d9d9", top: "#8a6f52", bottom: "#5b4636", cane: true, size: 1.26 },
    "🧑‍🍳": { hair: "short", top: "#fffaf0", bottom: "#3d2c22", size: 1.3 }, "👨‍🏫": { hair: "short", top: "#5a9a45", bottom: "#3f3a33", size: 1.32 },
    "🧑‍🌾": { hair: "short", top: "#a0683f", bottom: "#3f6f8f", size: 1.3 }, "👩‍⚕️": { hair: "auto", kind: "woman", top: "#fffaf0", bottom: "#5b9bd5", size: 1.28 },
    "🧍": { hair: "short", size: 1.3 }, "🧍‍♀️": { hair: "auto", kind: "woman", bottom: "dress", top: "#e5483f", size: 1.28 }, "🧍‍♂️": { hair: "short", size: 1.32 },
    "🚶": { hair: "short", size: 1.3 }, "🏃": { hair: "short", top: "#e5483f", size: 1.3 }
  };
  // Keys without the emoji variation selector (U+FE0F), as person() looks them up (👩‍⚕️ has one).
  Object.keys(PEOPLE).forEach(function (k) { var b = k.replace(/\uFE0F/g, ""); if (b !== k) { PEOPLE[b] = PEOPLE[k]; delete PEOPLE[k]; } });
  var TONE = { "\u{1F3FB}": "#f7d7bb", "\u{1F3FC}": "#e9bb92", "\u{1F3FD}": "#c98f63", "\u{1F3FE}": "#9a6442", "\u{1F3FF}": "#6a432b" };
  function person(name) {
    var tone = null, key = String(name).replace(/[\u{1F3FB}-\u{1F3FF}]/gu, function (t) { tone = TONE[t]; return ""; }).replace(/️/g, "");
    var look = PEOPLE[key];
    if (!look || !(B.RIG && B.RIG.walker)) return null;
    look = Object.assign({}, look);
    if (tone) look.skin = tone;
    return look;
  }

  function artNode(name, part) {
    var g = svgEl("g");
    var who = person(name);
    if (who) {
      var lk = Object.assign(who, (part && part.look) || {});
      if (lk.hair === "auto" && !lk.key) lk.key = [part && part.id, name, lk.top].join("|");
      g.innerHTML = B.RIG.walker(lk);
      return g;
    }
    var r = B.RIG && B.RIG[name];
    if (r) {
      var look = Object.assign({}, (part && part.look) || {});
      if (look.hair === "auto" && !look.key) look.key = [part && part.id, name, look.top].join("|");
      g.innerHTML = typeof r === "function" ? r(look) : r;
      return g;
    }
    // An emoji: its drawing from js/art (a 100 × 100 picture), 20 units wide, standing on the origin.
    var src = B.ART && B.ART[String(name).replace(/️/g, "")];
    if (src) {
      g.innerHTML = '<g transform="translate(-10 -20) scale(.2)" stroke="#3d2c22" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + src + "</g>";
    } else {
      var t = svgEl("text", { y: -2, "text-anchor": "middle", "font-size": 18 });
      t.textContent = name;
      g.appendChild(t);
    }
    return g;
  }

  E.steps.scene = function (s, box, done) {
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var stage = el("div", { class: "stage scene-stage", role: "img",
      "aria-label": s.scenes.map(function (sc) { return sc.caption; }).join(" ") });
    if (s.bg) stage.style.background = s.bg;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, preserveAspectRatio: "xMidYMid meet", focusable: "false" });
    var cam = svgEl("g", { class: "scene-cam" });
    var fx = svgEl("g", { class: "scene-fx" });
    svg.appendChild(cam);
    stage.appendChild(svg);
    var PACE = B.SCENE_PACE || 1.3, REST = 1100;
    // One camera group per depth: far layers are drawn behind the ground, near ones in front.
    var layers = [{ d: 1, g: cam }];
    function layer(d) {
      var L = layers.filter(function (l) { return l.d === d; })[0];
      if (L) return L.g;
      var g = svgEl("g", { class: "scene-cam" });
      var after = layers.filter(function (l) { return l.d > d; }).sort(function (a, b) { return a.d - b.d; })[0];
      svg.insertBefore(g, after ? after.g : null);
      layers.push({ d: d, g: g });
      return g;
    }

    /* Each part is two nested groups: the outer one carries its place (x, y; paths move it), the inner one its
       turn, scale and opacity, so a part can walk and wobble at the same time. */
    var parts = {}, start = {};
    Object.keys(s.parts).forEach(function (id) {
      var p = s.parts[id];
      var outer = svgEl("g", { class: "part", "data-id": id });
      var inner = svgEl("g", { class: "part-in" });
      inner.appendChild(artNode(p.art, Object.assign({ id: id }, p)));
      outer.appendChild(inner);
      (p.under && parts[p.under] ? parts[p.under].inner : layer(p.depth == null ? 1 : p.depth)).appendChild(outer);
      parts[id] = { outer: outer, inner: inner };
      start[id] = { x: p.at ? p.at[0] : 0, y: p.at ? p.at[1] : 0, s: p.s == null ? 1 : p.s, sx: p.sx == null ? 1 : p.sx,
        sy: p.sy == null ? 1 : p.sy, r: p.r || 0, o: p.o == null ? 1 : p.o, flip: p.flip ? -1 : 1 };
      var who = person(p.art);
      if (who && who.size) start[id].s *= who.size;
    });
    cam.appendChild(fx);
    var state = {}, pieces = {};

    // "hands.left": a named piece inside a part's drawing, turning around its data-pivot.
    function target(id) {
      var dot = id.indexOf(".");
      if (dot < 0) return parts[id] ? { kind: "part", id: id } : null;
      var host = parts[id.slice(0, dot)];
      var n = host && host.inner.querySelector('[data-part="' + id.slice(dot + 1) + '"]');
      if (!n) return null;
      var pv = (n.getAttribute("data-pivot") || "0 0").split(/[ ,]+/).map(Number);
      n.style.transformOrigin = pv[0] + "px " + pv[1] + "px";
      // A piece starts as its drawing has it (style="opacity:0" hides it until a track shows it).
      if (!pieces[id]) pieces[id] = { node: n, o: n.style.opacity === "" ? 1 : +n.style.opacity, t: n.style.transform };
      if (!state[id]) state[id] = { x: 0, y: 0, s: 1, sx: 1, sy: 1, r: 0, o: pieces[id].o, flip: 1 };
      return { kind: "piece", id: id, node: n };
    }
    function blank(id) { return state[id] || (state[id] = { x: 0, y: 0, s: 1, sx: 1, sy: 1, r: 0, o: 1, flip: 1 }); }
    function outerT(v) { return "translate(" + v.x + "px," + v.y + "px)"; }
    function innerT(v) { return "rotate(" + v.r + "deg) scale(" + (v.s * v.sx * v.flip) + "," + (v.s * v.sy) + ")"; }
    function apply(id) {
      var t = target(id), v = blank(id);
      if (!t) return;
      if (t.kind === "part") {
        parts[id].outer.style.transform = outerT(v);
        parts[id].inner.style.transform = innerT(v);
        parts[id].inner.style.opacity = v.o;
      } else {
        t.node.style.transform = outerT(v) + " " + innerT(v);
        t.node.style.opacity = v.o;
      }
    }
    function reset() {
      stage.getAnimations({ subtree: true }).forEach(function (a) { a.cancel(); });
      while (fx.firstChild) fx.removeChild(fx.firstChild);
      state = {};
      Object.keys(pieces).forEach(function (id) { pieces[id].node.style.opacity = pieces[id].o === 1 ? "" : pieces[id].o; pieces[id].node.style.transform = pieces[id].t; });
      Object.keys(start).forEach(function (id) { state[id] = Object.assign({}, start[id]); apply(id); });
      Object.keys(counters).forEach(function (id) { setCount(id, null); });
      camState = { x: W / 2, y: H / 2, zoom: 1 };
      layers.forEach(function (l) { l.g.style.transform = camT(camState, l.d); });
      Array.prototype.forEach.call(svg.querySelectorAll(".drawn"), function (n) { n.style.strokeDashoffset = ""; n.style.strokeDasharray = ""; n.classList.remove("drawn"); });
    }

    // ---- the camera ----
    var camState;
    // A layer at depth d sees the camera move d times as far (and zoom d times as much).
    function camT(c, d) {
      d = d == null ? 1 : d;
      var x = W / 2 + (c.x - W / 2) * d, y = H / 2 + (c.y - H / 2) * d, z = 1 + (c.zoom - 1) * d;
      return "translate(" + (W / 2) + "px," + (H / 2) + "px) scale(" + z + ") translate(" + (-x) + "px," + (-y) + "px)";
    }

    // ---- counters: a number shown inside a part (a <text data-count> in its drawing) ----
    var counters = {};
    Object.keys(parts).forEach(function (id) {
      var t = parts[id].inner.querySelector("[data-count]");
      if (t) counters[id] = t;
    });
    function setCount(id, n) { if (counters[id]) counters[id].textContent = n == null ? "" : B.fa(n); }

    // ---- particles ----
    var DOT = {
      bubble: function () { return svgEl("circle", { r: 1.4 + Math.random() * 1.6, class: "fx-bubble" }); },
      drop: function () { return svgEl("path", { d: "M0-2c-1 1.6-1.4 2.4-1.4 3a1.4 1.4 0 0 0 2.8 0c0-.6-.4-1.4-1.4-3z", class: "fx-drop" }); },
      spark: function () { return svgEl("path", { d: "M0-2.4l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z", class: "fx-spark" }); },
      dash: function () { return svgEl("path", { d: "M0 0h3", class: "fx-dash" }); }
    };

    /* An animation that, when it ends, leaves its own end picture in the element's style and goes away. (Each one
       keeps its own end: two moves queued in one beat must not jump to the last one's end when the first ends.)
       Tracks queued on the same piece and property must not overlap in time: the later one wins. */
    function anim(node, kf, opt, end) {
      var a = node.animate(kf, Object.assign({}, opt, { fill: "forwards" }));
      a.onfinish = function () { Object.keys(end).forEach(function (k) { node.style[k] = end[k]; }); a.cancel(); };
      return a;
    }

    /* Plays one track, from `state`, and leaves `state` at its end. instant: no animation (reduce motion, or
       jumping to a later beat). Returns when it ends (ms from the beat's start). */
    function run(tr, instant, quick) {
      // quick: the child's own strokes answer at once, unstretched.
      var k = quick ? 1 : PACE;
      var at = (tr.at || 0) * k, dur = instant ? 0 : (tr.dur == null ? 900 : tr.dur) * k;
      var opt = { duration: Math.max(dur, 1), delay: instant ? 0 : at, easing: ease(tr.ease), fill: "both" };
      if (tr.cam) {
        var c0 = Object.assign({}, camState), c1 = Object.assign({}, camState, tr.cam);
        camState = c1;
        layers.forEach(function (l) {
          if (instant) l.g.style.transform = camT(c1, l.d);
          else anim(l.g, [{ transform: camT(c0, l.d) }, { transform: camT(c1, l.d) }], opt, { transform: camT(c1, l.d) });
        });
        return at + dur;
      }
      if (tr.walk) {
        // Walk: a straight move, and the legs and arms swing a step at a time (front and back in turn).
        var steps = tr.steps || Math.max(2, Math.round((tr.dur || 900) / 450));
        var whole = run({ id: tr.id, to: { x: tr.walk[0], y: tr.walk[1] }, at: tr.at, dur: tr.dur, ease: "linear" }, instant, quick);
        if (instant) return whole;
        [["legF", 24], ["legB", -24], ["armF", -18], ["armB", 18], ["body", 0]].forEach(function (pc) {
          var t = target(tr.id + "." + pc[0]);
          if (!t) return;
          var kf = pc[0] === "body"
            ? [{ transform: "translate(0,0)" }, { transform: "translate(0,-.7px)" }, { transform: "translate(0,0)" }]
            : [0, pc[1], 0, -pc[1], 0].map(function (a) { return { transform: "rotate(" + a + "deg)" }; });
          var a = t.node.animate(kf, { duration: Math.max(1, dur / steps) * (pc[0] === "body" ? 0.5 : 1),
            iterations: pc[0] === "body" ? steps * 2 : steps, delay: at, easing: "ease-in-out" });
          a.onfinish = function () { a.cancel(); };
        });
        return whole;
      }
      if (tr.emit) {
        if (instant) return at;
        var n = tr.n || 6, sp = tr.spread || [10, 6], o = tr.from;
        var lifeK = (tr.life || 1400) * k;
        var base = Array.isArray(tr.where) ? tr.where : [0, 0];
        if (typeof o === "string" && state[o]) base = [state[o].x + base[0], state[o].y + base[1]];
        for (var i = 0; i < n; i++) {
          var d = (DOT[tr.emit] || DOT.bubble)();
          var x = base[0] + (Math.random() - 0.5) * sp[0], y = base[1] + (Math.random() - 0.5) * sp[1];
          var rise = tr.rise == null ? -8 : tr.rise;
          fx.appendChild(d);
          var life = lifeK, delay = at + (dur * i) / n;
          d.style.opacity = 0;
          d.animate([
            { transform: "translate(" + x + "px," + y + "px) scale(.3)", opacity: 0 },
            { transform: "translate(" + (x + (Math.random() - 0.5) * 3) + "px," + (y + rise * 0.3) + "px) scale(1)", opacity: 1, offset: 0.25 },
            { transform: "translate(" + (x + (Math.random() - 0.5) * 6) + "px," + (y + rise) + "px) scale(" + (tr.keep ? 1 : 0.6) + ")", opacity: tr.keep ? 1 : 0 }
          ], { duration: life, delay: delay, easing: "ease-out", fill: "both" });
        }
        return at + dur + lifeK;
      }
      if (tr.count) {
        var from = tr.from || 0, to = tr.to;
        if (instant) { setCount(tr.count, to); return at; }
        var ticker = stage.animate([{ opacity: 1 }, { opacity: 1 }], { duration: Math.max(dur, 1), delay: at, fill: "none" });
        ticker.id = "count";
        (function loop() {
          if (!stage.isConnected || ticker.playState === "idle") return;
          var t = ticker.currentTime == null ? 0 : ticker.currentTime - at;
          if (t >= 0) setCount(tr.count, Math.min(to, Math.floor(from + (to - from + 1) * Math.min(1, t / dur))));
          if (ticker.playState !== "finished") requestAnimationFrame(loop); else setCount(tr.count, to);
        })();
        return at + dur;
      }
      var tg = target(tr.id);
      if (!tg) return at;
      if (tr.draw) {
        var lines = Array.prototype.slice.call((tg.kind === "part" ? parts[tr.id].inner : tg.node).querySelectorAll("path, rect, circle, ellipse, line, polyline"));
        // A line that is not on the screen yet cannot be measured: it then counts as 100 long.
        var lens = lines.map(function (ln) { try { return ln.getTotalLength(); } catch (e) { return 100; } });
        var total = lens.reduce(function (a, b) { return a + b; }, 0) || 1, done_ = 0;
        lines.forEach(function (ln, i) {
          var len = lens[i];
          ln.classList.add("drawn");
          ln.style.strokeDasharray = len + " " + len;
          if (instant) { ln.style.strokeDashoffset = 0; return; }
          // oneByOne: one line after another, like a hand drawing (each takes time by its length).
          var o3 = tr.oneByOne ? Object.assign({}, opt, { delay: at + dur * done_ / total, duration: Math.max(1, dur * len / total), easing: "linear" }) : opt;
          done_ += len;
          ln.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], o3).onfinish = function () { ln.style.strokeDashoffset = 0; };
        });
        return at + dur;
      }
      var v0 = Object.assign({}, blank(tr.id)), v1 = Object.assign({}, v0);
      if (tr.path) {
        var pth = svgEl("path", { d: tr.path });
        svg.appendChild(pth);
        var frames = [];
        try {
          var len = pth.getTotalLength();
          for (var k = 0; k <= 24; k++) { var pt = pth.getPointAtLength(len * k / 24); frames.push({ x: pt.x, y: pt.y }); }
        } catch (e) {
          // Not on the screen (no layout): go straight to the path's last point.
          var nums = tr.path.match(/-?[\d.]+/g).map(Number);
          for (var j = 0; j <= 24; j++) frames.push({ x: nums[nums.length - 2], y: nums[nums.length - 1] });
        }
        svg.removeChild(pth);
        v1.x = frames[24].x; v1.y = frames[24].y;
        state[tr.id] = v1;
        var node = tg.kind === "part" ? parts[tr.id].outer : tg.node;
        if (instant) { apply(tr.id); return at; }
        var kf = frames.map(function (f) {
          var v = Object.assign({}, v0, { x: f.x, y: f.y });
          return { transform: tg.kind === "part" ? outerT(v) : outerT(v) + " " + innerT(v) };
        });
        anim(node, kf, opt, { transform: kf[kf.length - 1].transform });
        return at + dur;
      }
      Object.keys(tr.to || {}).forEach(function (k) {
        var v = tr.to[k];
        v1[k] = typeof v === "string" ? v0[k] + parseFloat(v) : v;
        if (k === "o") v1.o = Math.max(0, Math.min(1, v1.o));
      });
      var times = tr.times || 1, back = tr.yoyo && times % 2 === 0;
      state[tr.id] = back ? v0 : v1;
      if (instant) { apply(tr.id); return at; }
      var o2 = Object.assign({}, opt, { iterations: times, direction: tr.yoyo ? "alternate" : "normal", duration: Math.max(dur / times, 1) });
      var e = back ? v0 : v1;
      if (tg.kind === "part") {
        var P = parts[tr.id];
        // Only what changes is animated, so a walk and a wobble on the same part can run at the same time.
        if (v0.x !== v1.x || v0.y !== v1.y) anim(P.outer, [{ transform: outerT(v0) }, { transform: outerT(v1) }], o2, { transform: outerT(e) });
        if (innerT(v0) !== innerT(v1)) anim(P.inner, [{ transform: innerT(v0) }, { transform: innerT(v1) }], o2, { transform: innerT(e) });
        if (v0.o !== v1.o) anim(P.inner, [{ opacity: v0.o }, { opacity: v1.o }], o2, { opacity: e.o });
      } else {
        anim(tg.node, [{ transform: outerT(v0) + " " + innerT(v0), opacity: v0.o }, { transform: outerT(v1) + " " + innerT(v1), opacity: v1.o }], o2,
          { transform: outerT(e) + " " + innerT(e), opacity: e.o });
      }
      return at + dur;
    }

    // ---- playing beats ----
    var caption = el("p", { class: "caption", "aria-live": "polite" });
    var dots = el("div", { class: "scene-dots", "aria-hidden": "true" });
    s.scenes.forEach(function () { dots.appendChild(el("i")); });
    var hint = el("p", { class: "scene-hint", hidden: "hidden" });
    box.appendChild(stage);
    box.appendChild(dots);
    box.appendChild(caption);
    box.appendChild(hint);

    var at = -1, clock = null, playing = false, waiting = null, seenAll = false;
    function speakTime(sc) { return Math.max(2600, (sc.caption || "").length * 105); }

    function showBeat(n, instant) {
      at = n;
      var sc = s.scenes[n], end = 0;
      (sc.do || []).forEach(function (tr) { end = Math.max(end, run(tr, instant)); });
      caption.textContent = sc.caption || "";
      Array.prototype.forEach.call(dots.children, function (d, i) { d.className = i === n ? "on" : i < n ? "seen" : ""; });
      if (sc.caption || sc.audio) B.speak(sc.say || sc.caption, sc.audio);
      return Math.max(end, speakTime(sc), (sc.hold || 0) * PACE) + (instant ? 0 : REST);
    }
    // Jump to beat n: every earlier beat is applied at once, so replaying or skipping gives the same picture.
    function goTo(n) {
      stopClock();
      reset();
      for (var i = 0; i < n; i++) (s.scenes[i].do || []).forEach(function (tr) { run(tr, true); });
      play(n);
    }
    function play(n) {
      playing = true;
      playBtn.textContent = B.t("pause");
      var len = showBeat(n, B.reducedMotion());
      // The beat's clock is an animation too, so pausing the stage pauses it with everything else.
      clock = stage.animate([{ outlineColor: "transparent" }, { outlineColor: "transparent" }], { duration: len });
      clock.onfinish = function beatEnd() {
        clock = null;
        if (!stage.isConnected) return;
        // Never move on while the caption is still being said (slow voices, long sentences).
        if (window.speechSynthesis && speechSynthesis.speaking && !speechSynthesis.paused) {
          clock = stage.animate([{ outlineColor: "transparent" }, { outlineColor: "transparent" }], { duration: 300 });
          clock.onfinish = beatEnd;
          return;
        }
        var sc = s.scenes[n];
        if (sc.wait && sc.wait.rub) { startRub(sc.wait, n); return; }
        if (sc.wait && sc.wait.tap) { startTap(sc.wait, n); return; }
        if (sc.wait && sc.wait.choose) { startChoose(sc.wait, n); return; }
        afterBeat(n);
      };
    }
    function afterBeat(n) {
      if (n >= s.scenes.length - 1) { playing = false; playBtn.textContent = B.t("play"); finished(); return; }
      play(n + 1);
    }
    function stopClock() { if (clock) { clock.cancel(); clock = null; } endRub(); }
    function pause() {
      playing = false;
      playBtn.textContent = B.t("play");
      stage.getAnimations({ subtree: true }).forEach(function (a) { if (a.playState === "running") a.pause(); });
    }
    function resume() {
      playing = true;
      playBtn.textContent = B.t("pause");
      stage.getAnimations({ subtree: true }).forEach(function (a) { if (a.playState === "paused") a.play(); });
    }

    // ---- wait: rub ----
    function startRub(w, n) {
      var strokes = 0, lastX = null, dir = 0, travel = 0;
      hint.hidden = false;
      hint.textContent = w.hint || B.t("sceneRub");
      if (w.hint) B.speak(w.hint);
      var go = el("button", { class: "btn quiet", type: "button", text: B.t("sceneGoOn"), onclick: function () { finish(); } });
      hint.appendChild(document.createTextNode(" "));
      hint.appendChild(go);
      stage.classList.add("rub-me");
      stage.tabIndex = 0;
      function stroke() {
        strokes++;
        (w.each || []).forEach(function (tr) { run(Object.assign({}, tr, { at: 0 }), B.reducedMotion(), true); });
        if (strokes >= (w.n || 6)) setTimeout(finish, 500);
      }
      function move(e) {
        var x = e.clientX;
        if (lastX === null) { lastX = x; return; }
        var dx = x - lastX;
        lastX = x;
        if (!dx) return;
        var d = dx > 0 ? 1 : -1;
        travel += Math.abs(dx);
        if (d !== dir) { if (dir !== 0 && travel > 18) stroke(); dir = d; travel = 0; }
      }
      function key(e) { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); stroke(); } }
      function down(e) { lastX = e.clientX; dir = 0; travel = 0; stage.setPointerCapture && stage.setPointerCapture(e.pointerId); }
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerdown", down);
      stage.addEventListener("keydown", key);
      function finish() {
        if (!waiting) return;
        endRub();
        afterBeat(n);
      }
      waiting = { stop: function () {
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerdown", down);
        stage.removeEventListener("keydown", key);
        stage.classList.remove("rub-me");
        hint.hidden = true;
        hint.textContent = "";
      } };
      stage.focus({ preventScroll: true });
    }
    function endRub() { if (waiting) { waiting.stop(); waiting = null; } }

    // ---- wait: tap each one ----
    function startTap(w, n) {
      var ids = w.tap.filter(function (id) { return parts[id]; }), done_ = {}, k = 0;
      hint.hidden = false;
      hint.textContent = w.hint || B.t("sceneTap");
      if (w.hint) B.speak(w.hint);
      var go = el("button", { class: "btn quiet", type: "button", text: B.t("sceneGoOn"), onclick: function () { finish(); } });
      hint.appendChild(document.createTextNode(" "));
      hint.appendChild(go);
      if (w.counter) setCount(w.counter, 0);
      function tap(id) {
        if (done_[id] || !waiting) return;
        if (w.inOrder && id !== ids[k]) {
          parts[id].outer.animate([{ transform: outerT(blank(id)) }, { transform: outerT(Object.assign({}, blank(id), { x: blank(id).x + 1.5 })) }, { transform: outerT(blank(id)) }],
            { duration: 160, iterations: 3 });
          return;
        }
        done_[id] = true;
        k++;
        parts[id].outer.classList.add("tapped");
        parts[id].outer.removeAttribute("tabindex");
        (w.each || []).forEach(function (tr) {
          var t = Object.assign({}, tr, { at: 0 });
          if (t.id === "$") t.id = id;
          if (t.from === "$") t.from = id;
          run(t, B.reducedMotion(), true);
        });
        if (w.counter) setCount(w.counter, k);
        if (k >= ids.length) setTimeout(finish, 700);
      }
      var handlers = ids.map(function (id) {
        var g = parts[id].outer;
        var click = function (e) { e.stopPropagation(); tap(id); };
        var key = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(id); } };
        g.classList.add("tap-me");
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.addEventListener("click", click);
        g.addEventListener("keydown", key);
        return function () {
          g.removeEventListener("click", click);
          g.removeEventListener("keydown", key);
          g.classList.remove("tap-me", "tapped");
          g.removeAttribute("tabindex");
          g.removeAttribute("role");
        };
      });
      function finish() {
        if (!waiting) return;
        endRub();
        afterBeat(n);
      }
      waiting = { stop: function () {
        handlers.forEach(function (h) { h(); });
        hint.hidden = true;
        hint.textContent = "";
      } };
    }

    // ---- wait: choose what to say ----
    function startChoose(w, n) {
      var box2 = el("div", { class: "scene-choose" }), over = false;
      hint.hidden = false;
      hint.textContent = w.hint || B.t("sceneChoose");
      B.speak(hint.textContent);
      hint.parentNode.insertBefore(box2, hint.nextSibling);
      var options = w.choose.map(function (t) { return { label: t, value: t }; });
      E.choice(box2, { options: options, answer: w.answer, stack: true, ltr: true, onRight: function () {
        caption.textContent = w.answer;
        (w.each || []).forEach(function (tr) { run(tr, B.reducedMotion(), true); });
      } }, function (scored, first) {
        if (!first) box.sceneFirst = false;
        if (!waiting) return;
        B.speak(w.answer);
        hint.textContent = B.t("sceneSayToo");
        setTimeout(function () { if (!over) B.speak(B.t("sceneSayToo")); }, speakTime({ caption: w.answer }));
        setTimeout(finish, speakTime({ caption: w.answer }) + 2600);
      });
      function finish() {
        if (!waiting || over) return;
        over = true;
        endRub();
        afterBeat(n);
      }
      waiting = { stop: function () {
        over = true;
        if (box2.parentNode) box2.parentNode.removeChild(box2);
        hint.hidden = true;
        hint.textContent = "";
      } };
    }

    var playBtn = el("button", { class: "btn secondary", type: "button", text: B.t("play"), onclick: function () {
      if (waiting) return;
      if (playing) pause();
      else if (at >= 0 && at < s.scenes.length - 1 && stage.getAnimations({ subtree: true }).some(function (a) { return a.playState === "paused"; })) resume();
      else goTo(at < 0 || at >= s.scenes.length - 1 ? 0 : at + 1);
    } });
    var replay = el("button", { class: "btn quiet", type: "button", text: B.t("replay"), onclick: function () { goTo(0); } });
    var ask = el("div");
    var next = E.nextBtn(null, function () { stopClock(); done(false); });
    next.disabled = true;
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [playBtn, replay]));
    box.appendChild(ask);
    if (!s.question) box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:8px" }, [next]));

    function finished() {
      if (seenAll) return;
      seenAll = true;
      if (!s.question) { next.disabled = false; return; }
      ask.appendChild(el("p", { class: "prompt", text: s.question }));
      var qb = E.speakBtn(s.question);
      if (qb) { ask.appendChild(qb); setTimeout(function () { if (ask.isConnected) B.speak(s.question); }, 2600); }
      E.choice(ask, { options: s.options, answer: s.answer, pic: s.pic }, function (scored, first) { done(scored, first); });
    }

    reset();
    // The storyboard (tools/storyboard.html) asks for a still picture of each beat.
    box.sceneStill = function (n) {
      stopClock(); reset();
      for (var i = 0; i <= n; i++) (s.scenes[i].do || []).forEach(function (tr) { run(tr, true); });
      at = n;
      caption.textContent = s.scenes[n].caption || (s.scenes[n].wait && s.scenes[n].wait.answer) || "";
      Array.prototype.forEach.call(dots.children, function (d, i) { d.className = i === n ? "on" : i < n ? "seen" : ""; });
    };
    box.scenePlay = goTo;
    // A still at ms into beat n (the storyboard uses a beat's `key` moment, for actions that end where they began).
    box.sceneAt = function (n, ms) {
      goTo(n);
      speechSynthesis && speechSynthesis.cancel && speechSynthesis.cancel();
      stage.getAnimations({ subtree: true }).forEach(function (a) { a.pause(); a.currentTime = ms * PACE; });
      playing = false;
    };
    if (!box.noAutoplay) setTimeout(function () { if (stage.isConnected && at < 0) goTo(0); }, 400);
  };
})();
