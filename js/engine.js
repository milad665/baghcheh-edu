/* باغچه — lesson player. Each step renders into `box` and calls done(scored, firstTry) when finished. */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el;

  var PRAISE = B.T.praise;
  var RETRY = B.T.retry;
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  // A step may name a recorded file (s.audio); otherwise the device's Persian voice is used if it has one.
  function speakBtn(text, file) {
    if (!file && (!B.canSpeak() || !text)) return null;
    return el("button", { class: "speak-btn", type: "button", "aria-label": B.t("listen"), onclick: function () { B.speak(text, file); } }, [B.t("listen")]);
  }

  function nextBtn(label, onclick) {
    return el("button", { class: "btn", type: "button", onclick: onclick }, [label || B.t("next")]);
  }

  /* Multiple choice with gentle feedback: a wrong tap can be retried; after two misses the answer is
     shown (worked example) so the child is never stuck. */
  function choice(box, opts, done) {
    var misses = 0;
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    // opts.ltr: options in left-to-right order (math); opts.stack: one option per line.
    var wrap = el("div", { class: "options" + (opts.stack ? " stack" : "") });
    if (opts.ltr) wrap.dir = "ltr";
    var buttons = opts.options.map(function (o) {
      var label = typeof o === "object" ? o.label : o;
      var value = typeof o === "object" ? o.value : o;
      // An option may carry a ready-made picture (o.node) instead of a text label.
      var b = o && o.node
        ? el("button", { class: "opt node", type: "button", "aria-label": o.aria || String(value) }, [o.node])
        : el("button", { class: "opt" + (opts.pic ? " pic" : ""), type: "button", text: label, "aria-label": opts.pic ? String(value) : label });
      b.addEventListener("click", function () {
        if (b.disabled) return;
        if (String(value) === String(opts.answer)) {
          b.classList.add("correct");
          buttons.forEach(function (x) { x.disabled = true; });
          if (opts.onRight) opts.onRight();
          fb.className = "feedback good";
          fb.textContent = pick(PRAISE);
          B.speak(fb.textContent);
          setTimeout(function () { done(true, misses === 0); }, 900);
        } else {
          misses++;
          b.classList.add("wrong");
          b.disabled = true;
          fb.className = "feedback try";
          fb.textContent = pick(RETRY);
          if (misses >= 2) {
            buttons.forEach(function (x, i) {
              var v = opts.options[i];
              if (String(typeof v === "object" ? v.value : v) === String(opts.answer)) x.classList.add("show");
            });
            fb.textContent = B.t("showAnswer");
          }
        }
      });
      return b;
    });
    buttons.forEach(function (b) { wrap.appendChild(b); });
    box.appendChild(wrap);
    box.appendChild(fb);
  }

  var steps = {};

  steps.intro = function (s, box, done) {
    // Beside the printed letter, an animation shows how it is written (s.write names the letter to animate
    // when s.letter is not a plain letter, e.g. «او» → «و»; set write: "" to leave it out).
    var write = B.writePanel && B.writePanel(s.write != null ? s.write : s.letter);
    var big = el("p", { class: "letter-big", text: s.letter });
    box.appendChild(write ? el("div", { class: "intro-letter" }, [big, write]) : big);
    box.appendChild(el("p", { class: "prompt", text: s.text }));
    var forms = el("div", { class: "forms" });
    (s.forms || []).forEach(function (f) { forms.appendChild(el("span", null, [f[0], el("small", { text: f[1] })])); });
    box.appendChild(forms);
    if (s.example) box.appendChild(el("p", { class: "example" }, [el("span", { class: "pic", text: s.example.pic }), el("span", { class: "word", text: s.example.word })]));
    var sb = speakBtn(s.say, s.audio);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb, nextBtn(null, function () { done(false); })]));
    if (sb) setTimeout(function () { B.speak(s.say, s.audio); }, 300);
  };

  steps.choose = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    // s.ltr: the shown text is a math expression, written left to right.
    if (s.show && s.ltr) box.appendChild(el("p", { class: "math-big", dir: "ltr", text: s.show }));
    else if (s.show) box.appendChild(el("p", { class: "letter-big", style: "font-size:5rem", text: s.show }));
    var sb = speakBtn(s.say, s.audio);
    if (sb) box.appendChild(sb);
    choice(box, s, done);
  };

  // Read a short passage, then answer a question about it. The passage is not read aloud: reading it is the task.
  steps.passage = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("passagePrompt") }));
    box.appendChild(el("p", { class: "passage", text: s.text }));
    box.appendChild(el("p", { class: "prompt", text: s.question }));
    var sb = speakBtn(s.question, s.audio);
    if (sb) box.appendChild(sb);
    choice(box, s, done);
  };

  steps.blend = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("blendPrompt") }));
    var parts = el("div", { class: "blend" });
    s.parts.forEach(function (p) { parts.appendChild(el("span", { text: p })); });
    var word = el("p", { class: "blend-word", text: s.word });
    var pic = el("p", { class: "celebrate", style: "visibility:hidden;margin:0", text: s.pic });
    box.appendChild(parts);
    box.appendChild(word);
    box.appendChild(pic);
    var next = nextBtn(null, function () { done(false); });
    next.disabled = true;
    var go = el("button", { class: "btn secondary", type: "button", text: B.t("blendButton") });
    go.addEventListener("click", function () {
      parts.classList.add("joined");
      B.speak(s.say, s.audio);
      setTimeout(function () { word.classList.add("on"); pic.style.visibility = "visible"; next.disabled = false; }, 800);
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [go, next]));
  };

  steps.trace = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    // B.engine.speakBtn, which js/steps/english.js extends: an English word needs the English voice, not the Persian one.
    var sb = s.say ? B.engine.speakBtn(s.say, s.audio) : null;
    if (sb) { box.appendChild(sb); B.speak(s.say, s.audio); }
    var size = window.innerWidth <= 480 ? 260 : window.innerWidth >= 768 ? 400 : 300;
    var canvas = el("canvas", { width: size * 2, height: size * 2, style: "width:" + size + "px;height:" + size + "px" });
    // The handwriting model from js/strokes.js when there is one (the same one the intro animates), else the printed
    // letter. `path` is a pre-writing path from B.PATHS, `strokes` any other shape drawn the same way.
    var strokes = s.strokes || (s.path && B.PATHS && B.PATHS[s.path]);
    // A whole joined word (more than one letter) gets a thinner model, so its teeth stay apart.
    var wide = s.letter && !strokes && s.letter.replace(/[ـًٌٍَُِّْ]/g, "").length > 1;
    var model = B.writeLetter && B.writeLetter(s.letter, { ghost: wide ? 15 : 24, fade: true, strokes: strokes, label: strokes && s.prompt });
    box.appendChild(el("div", { class: "trace-wrap" }, [model ? model.svg : el("div", { class: "ghost", text: s.letter || "" }), canvas]));
    var ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#e8a33d";
    var drawing = false, ink = 0, last = null;
    function pos(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    canvas.addEventListener("pointerdown", function (e) {
      drawing = true; last = pos(e);
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* the pointer is already gone */ }
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!drawing) return;
      var p = pos(e);
      ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
      ink += Math.hypot(p[0] - last[0], p[1] - last[1]);
      last = p;
      if (ink > 150) next.disabled = false;
    });
    canvas.addEventListener("pointerup", function () { drawing = false; });
    canvas.addEventListener("pointercancel", function () { drawing = false; });
    var clear = el("button", { class: "btn quiet", type: "button", text: B.t("clear") });
    clear.addEventListener("click", function () { ctx.clearRect(0, 0, size, size); ink = 0; next.disabled = true; });
    var next = nextBtn(B.t("traceDone"), function () { done(false); });
    next.disabled = true;
    var watch = model ? el("button", { class: "btn quiet", type: "button", text: B.t("writeAgain"), onclick: function () { model.play(); } }) : null;
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:12px" }, [watch, clear, next]));
    if (model) setTimeout(model.play, 300);
  };

  // Concrete: tap each object to count it, then say how many.
  steps.count = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("countPrompt") }));
    var out = el("p", { class: "count-out", "aria-live": "polite" });
    var things = el("div", { class: "things" });
    var counted = 0;
    var ask = el("div");
    for (var i = 0; i < s.n; i++) {
      (function () {
        var t = el("button", { class: "thing", type: "button", text: s.thing, "aria-label": B.t("countAria") });
        t.addEventListener("click", function () {
          if (t.classList.contains("counted")) return;
          counted++;
          t.classList.add("counted");
          t.appendChild(el("span", { class: "n", text: B.fa(counted) }));
          out.textContent = B.fa(counted);
          B.speak(B.NUMBER_WORDS[counted]);
          if (counted === s.n) {
            ask.appendChild(el("p", { class: "prompt", text: B.t("countAsk") }));
            choice(ask, { options: s.options.map(function (n) { return { label: B.fa(n), value: n }; }), answer: s.n }, done);
          }
        });
        things.appendChild(t);
      })();
    }
    box.appendChild(things);
    box.appendChild(out);
    box.appendChild(ask);
  };

  function nums(list) { return list.map(function (n) { return { label: B.fa(n), value: n }; }); }

  // Math expressions are always written left to right, as in Iranian textbooks: «۸ + ۵ = ؟».
  function expr(a, b) { return B.fa(a) + (b >= 0 ? " + " : " − ") + B.fa(Math.abs(b)) + " = ؟"; }
  function mathLine(text) { return el("p", { class: "prompt math", dir: "ltr", text: text }); }

  /* A "build it, then press done" check, shared by steps where the child makes something.
     test() returns "" when it is right, or a hint to show. */
  function doneButton(box, label, test, done) {
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var tries = 0;
    box.appendChild(fb);
    box.appendChild(nextBtn(label, function () {
      tries++;
      var hint = test();
      if (!hint) {
        fb.className = "feedback good";
        fb.textContent = pick(PRAISE);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, tries === 1); }, 900);
      } else {
        fb.className = "feedback try";
        fb.textContent = hint;
      }
    }));
    return function () { fb.textContent = ""; };
  }

  /* One or two ten-frames (two when the number is over ten). states[i] is "" (empty), "on", "add"
     (a second colour, for the number being added) or "gone" (taken away). */
  function frames(states, onTap) {
    var wrap = el("div", { class: "frames" + (states.length > 10 ? " two" : "") });
    var cells = [];
    for (var f = 0; f < states.length / 10; f++) {
      var grid = el("div", { class: "tenframe" + (onTap ? "" : " readonly"), role: "group", "aria-label": B.t("tenframeAria") });
      for (var j = 0; j < 10; j++) {
        (function (i) {
          var c = el("button", { type: "button", class: states[i] || "", "aria-label": B.t("cell", { n: B.fa(i + 1) }) });
          if (!onTap) c.disabled = true;
          else c.addEventListener("click", function () { onTap(c); });
          cells.push(c);
          grid.appendChild(c);
        })(f * 10 + j);
      }
      wrap.appendChild(grid);
    }
    return { node: wrap, cells: cells };
  }

  /* Pictorial: read a quantity from ten-frames, or how many are missing to make ten (missing),
     or add (plus: a second colour that fills the first frame, then spills into the next) or take away (minus). */
  steps.tenframe = function (s, box, done) {
    var plus = s.plus || 0, minus = s.minus || 0, states = [];
    var size = s.n + plus > 10 ? 20 : 10;
    for (var i = 0; i < size; i++) states.push(i < s.n - minus ? "on" : i < s.n ? "gone" : i < s.n + plus ? "add" : "");
    if (plus || minus) box.appendChild(mathLine(expr(s.n, plus || -minus)));
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    else if (plus && s.n < 10 && s.n + plus > 10) box.appendChild(el("p", { class: "hint", text: B.t("makeTenHint") }));
    box.appendChild(frames(states).node);
    var answer = s.missing ? 10 - s.n : s.n + plus - minus;
    choice(box, { options: nums(s.options), answer: answer }, done);
  };

  // Build a quantity in the ten-frame (two frames for numbers over ten).
  steps.make = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("makePrompt", { n: B.fa(s.n) }) }));
    var out = el("p", { class: "count-out", text: B.fa(0) });
    var current = 0, clear;
    var fr = frames(new Array(s.n > 10 ? 20 : 10).fill(""), function (c) {
      c.classList.toggle("on");
      current = fr.cells.filter(function (x) { return x.classList.contains("on"); }).length;
      out.textContent = B.fa(current);
      clear();
    });
    box.appendChild(fr.node);
    box.appendChild(out);
    clear = doneButton(box, B.t("makeDone"), function () {
      return current === s.n ? "" : current < s.n ? B.t("makeMore") : B.t("makeLess");
    }, done);
  };

  // ---------- Place value: loose sticks, bundles of ten, packs of a hundred, boxes of a thousand ----------

  // Place 0 is ones (a stick), 1 tens (a bundle of ten sticks), 2 hundreds (a pack of ten bundles, a flat),
  // 3 thousands (a box of ten packs, a cube).
  var PIECE = ["stick", "bundle", "flat", "cube"];
  var BUNDLED = ["bundled", "bundledHundred", "bundledThousand"];
  var OPENED = [null, "unbundled", "unbundledHundred", "unbundledThousand"];
  var ADD = ["addOne", "addTen", "addHundred", "addThousand"];

  function piece(place, cls) {
    var b = el("span", { class: PIECE[place] + " " + (cls || "") });
    if (place) for (var i = 0; i < 10; i++) b.appendChild(el("i"));
    b.dataset.place = place;
    return b;
  }

  /* The highest place drawn: bundles of ten (1) up to 100, packs of a hundred (2) above 100, boxes of a thousand
     (3) above 1,000. hundreds: true / thousands: true draw them for smaller numbers too, hundreds: false never. */
  function topPlace(s, max) {
    if (s.hundreds === false) return 1;
    var p = max > 1000 ? 3 : max > 100 ? 2 : 1;
    if (s.hundreds) p = Math.max(p, 2);
    if (s.thousands) p = 3;
    return p;
  }
  // n as counts per place, [ones, tens, …]; the top place keeps the rest (100 with top 1 is ten bundles).
  function split(n, top) {
    var c = [];
    for (var i = 0; i < top; i++) { c.push(n % 10); n = Math.floor(n / 10); }
    c.push(n);
    return c;
  }
  function pvLabel(c) {
    var v = { o: B.fa(c[0]), t: B.fa(c[1]), h: B.fa(c[2] || 0), k: B.fa(c[3] || 0) };
    return B.t(c.length > 3 ? "thousandsAll" : c.length > 2 ? "hundredsTensOnes" : "tensOnes", v);
  }

  /* groups: [{ c: [ones, tens, …], cls }], drawn left to right like a written number: the highest place on the
     left, ones on the right. cls is "" (first number), "add" (the number being added) or "gone" (taken away). */
  var PV_CLASS = ["pv-ones", "pv-tens", "pv-hundreds", "pv-thousands"];
  function placeValue(groups) {
    var top = groups[0].c.length - 1, cols = [], total = [];
    for (var p = 0; p <= top; p++) { cols.push(el("div", { class: PV_CLASS[p] })); total.push(0); }
    groups.forEach(function (g) {
      g.c.forEach(function (k, p) {
        for (var i = 0; i < k; i++) cols[p].appendChild(piece(p, g.cls));
        total[p] += k;
      });
    });
    return el("div", { class: "pv" + (top > 1 ? " big" : ""), dir: "ltr", role: "img", "aria-label": pvLabel(total) }, cols.reverse());
  }

  /* Read a number (n), add (b > 0) or take away (b < 0). When taking away needs more of a place than there is,
     one piece of the next place is opened (a bundle into ten sticks, a pack into ten bundles…), and the child is
     told so. With build: true the child makes n; ten of a place are tied into one of the next. */
  steps.tens = function (s, box, done) {
    var b = s.b || 0, top = topPlace(s, Math.max(s.n, s.n + b));
    if (s.build) return buildTens(s, box, done, top);
    var a = split(s.n, top), groups, opened = [];
    if (b > 0) groups = [{ c: a }, { c: split(b, top), cls: "add" }];
    else if (b < 0) {
      var d = split(-b, top);
      for (var i = 0; i < top; i++) {
        if (a[i] >= d[i]) continue;
        var j = i + 1;
        while (!a[j]) j++;
        a[j]--;
        if (opened.indexOf(j) === -1) opened.push(j);
        for (var k = j - 1; k > i; k--) { a[k] += 9; if (opened.indexOf(k) === -1) opened.push(k); }
        a[i] += 10;
      }
      groups = [{ c: a.map(function (v, p) { return v - d[p]; }) }, { c: d, cls: "gone" }];
    } else groups = [{ c: a }];
    if (b) box.appendChild(mathLine(expr(s.n, b)));
    else box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("tensAsk") }));
    box.appendChild(placeValue(groups));
    opened.sort().reverse().forEach(function (p) { box.appendChild(el("p", { class: "hint", text: B.t(OPENED[p]) })); });
    choice(box, { options: nums(s.options), answer: s.n + b }, done);
  };

  function buildTens(s, box, done, top) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t(top > 1 ? "hundredsBuild" : "tensBuild") }));
    box.appendChild(el("p", { class: "math-big", text: B.fa(s.n) }));
    var c = split(0, top), clear;
    var area = el("div", { class: "pv-build" });
    var out = el("p", { class: "hint", "aria-live": "polite" });
    var note = el("p", { class: "hint", "aria-live": "polite" });
    function draw() {
      area.innerHTML = "";
      area.appendChild(placeValue([{ c: c }]));
      out.textContent = pvLabel(c);
      if (clear) clear();
    }
    // Tap a piece to take it away again.
    area.addEventListener("click", function (e) {
      var p = e.target.closest("[data-place]");
      if (!p) return;
      c[+p.dataset.place]--;
      note.textContent = "";
      draw();
    });
    // Ten of a place are tied into one of the next; the top place stops at ten.
    function add(p) {
      note.textContent = "";
      if (p === top) { if (c[p] < 10) c[p]++; }
      else {
        c[p]++;
        while (p < top && c[p] === 10) { c[p] = 0; c[p + 1]++; note.textContent = B.t(BUNDLED[p]); p++; }
      }
      draw();
    }
    var buttons = [];
    for (var p = top; p >= 0; p--) {
      (function (p) {
        buttons.push(el("button", { class: "btn secondary", type: "button", text: B.t(ADD[p]), onclick: function () { add(p); } }));
      })(p);
    }
    box.appendChild(el("div", { class: "row", style: "justify-content:center;flex-wrap:wrap" }, buttons));
    box.appendChild(area);
    box.appendChild(out);
    box.appendChild(note);
    box.appendChild(el("p", { class: "hint", text: B.t(top > 1 ? "removeHintAny" : "removeHint") }));
    draw();
    clear = doneButton(box, B.t("makeDone"), function () {
      var v = c.reduce(function (sum, k, p) { return sum + k * Math.pow(10, p); }, 0);
      return v === s.n ? "" : v < s.n ? B.t("tensMore") : B.t("tensLess");
    }, done);
  }

  // ---------- Comparing two numbers ----------

  /* ask: "more" or "less" (tap the card), or "symbol" (choose <, = or >). pic: "tens" draws bundles under each
     number; thing: an emoji drawn n times (for small numbers). */
  steps.compare = function (s, box, done) {
    function card(n) {
      var pic = null;
      if (s.pic === "tens") pic = placeValue([{ c: split(n, topPlace(s, Math.max(s.a, s.b))) }]);
      else if (s.thing) pic = el("span", { class: "mini", "aria-hidden": "true", text: new Array(n + 1).join(s.thing) });
      return el("span", { class: "card" }, [el("span", { class: "card-n", text: B.fa(n) }), pic]);
    }
    if (s.ask === "symbol") {
      var ans = s.a > s.b ? ">" : s.a < s.b ? "<" : "=";
      var slot = el("span", { class: "slot", text: "؟" });
      box.appendChild(el("p", { class: "prompt", text: B.t("compareSymbol") }));
      box.appendChild(el("div", { class: "compare", dir: "ltr" }, [card(s.a), slot, card(s.b)]));
      box.appendChild(el("p", { class: "hint", text: B.t("symbolHint") }));
      choice(box, { options: ["<", "=", ">"], answer: ans, ltr: true, onRight: function () { slot.textContent = ans; slot.classList.add("on"); } }, done);
      return;
    }
    var more = s.ask !== "less";
    box.appendChild(el("p", { class: "prompt", text: B.t(more ? "compareMore" : "compareLess") }));
    choice(box, {
      options: [{ node: card(s.a), value: s.a, aria: B.fa(s.a) }, { node: card(s.b), value: s.b, aria: B.fa(s.b) }],
      answer: more ? Math.max(s.a, s.b) : Math.min(s.a, s.b), ltr: true
    }, done);
  };

  // ---------- Shapes ----------

  // Drawn shapes (viewBox 0 0 100 100). "-tilt", "-tall" are the same shape turned or stretched.
  var SHAPES = {
    circle: '<circle cx="50" cy="50" r="38"/>',
    square: '<rect x="18" y="18" width="64" height="64"/>',
    "square-tilt": '<polygon points="50,8 92,50 50,92 8,50"/>',
    triangle: '<polygon points="50,12 90,84 10,84"/>',
    "triangle-tilt": '<polygon points="14,22 90,40 34,90"/>',
    rectangle: '<rect x="6" y="28" width="88" height="44"/>',
    "rectangle-tall": '<rect x="30" y="6" width="40" height="88"/>',
    "rectangle-thin": '<rect x="4" y="40" width="92" height="20"/>',
    "square-small": '<rect x="34" y="34" width="32" height="32"/>',
    "triangle-thin": '<polygon points="20,8 34,92 6,92"/>',
    "triangle-small": '<polygon points="50,52 70,86 30,86"/>',
    "triangle-down": '<polygon points="10,16 90,16 50,88"/>',
    // look like triangles but are not: open, or with a curved side
    opentri: '<polyline points="38,22 50,12 90,84 10,84 28,46" fill="none" stroke-width="6"/>',
    curvetri: '<path d="M50 12 Q90 50 90 84 L10 84 Q10 50 50 12z"/>',
    pentagon: '<polygon points="50,8 92,38 76,88 24,88 8,38"/>',
    hexagon: '<polygon points="28,12 72,12 94,50 72,88 28,88 6,50"/>',
    octagon: '<polygon points="34,6 66,6 94,34 94,66 66,94 34,94 6,66 6,34"/>',
    rhombus: '<polygon points="50,6 86,50 50,94 14,50"/>',
    trapezoid: '<polygon points="30,24 70,24 94,80 6,80"/>',
    parallelogram: '<polygon points="30,24 94,24 70,78 6,78"/>',
    kite: '<polygon points="50,6 80,38 50,94 20,38"/>'
  };
  function shapeSvg(id, cls) {
    var wrap = el("span", { class: "shape " + (cls || ""), "aria-hidden": "true" });
    wrap.innerHTML = '<svg viewBox="0 0 100 100">' + SHAPES[id] + "</svg>";
    return wrap;
  }

  /* show: a shape id (or a list of them, to name them: then there is no question). options: shape ids,
     numbers, or {label, value} (emoji pictures, with pic: true). */
  steps.shape = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = speakBtn(s.say || s.prompt, s.audio);
    if (Array.isArray(s.show)) {
      var row = el("div", { class: "shape-names" });
      s.show.forEach(function (id) { row.appendChild(el("span", null, [shapeSvg(id), el("b", { text: B.T.shapeNames[id.split("-")[0]] })])); });
      box.appendChild(row);
      box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb, nextBtn(null, function () { done(false); })]));
      return;
    }
    if (s.show) box.appendChild(shapeSvg(s.show, "big"));
    if (sb) box.appendChild(sb);
    var options = s.options.map(function (o) {
      if (typeof o === "number") return { label: B.fa(o), value: o };
      if (SHAPES[o]) return { node: shapeSvg(o), value: o.split("-")[0], aria: B.T.shapeNames[o.split("-")[0]] };
      return o;
    });
    choice(box, { options: options, answer: s.answer, pic: s.pic }, done);
  };

  // ---------- Measuring with units ----------

  // One object drawn as a strip len units long. Every strip starts at the same line, so lengths can be compared.
  function lengthBar(b) {
    return el("span", { class: "bar-row", dir: "ltr" }, [
      el("span", { class: "bar-thing", "aria-hidden": "true", text: b.thing }),
      el("span", { class: "strip", style: "--len:" + b.len })
    ]);
  }

  /* bars: [{thing, len}]. ask: "longer" / "shorter" (tap one), or "count": tap each unit under the first bar
     to count them, then say how many (prompt, unit, options). */
  steps.measure = function (s, box, done) {
    if (s.ask !== "count") {
      var longer = s.ask === "longer";
      var prompt = s.prompt || B.t(longer ? "measureLonger" : "measureShorter");
      box.appendChild(el("p", { class: "prompt", text: prompt }));
      var sb = speakBtn(prompt, s.audio);
      if (sb) box.appendChild(sb);
      var lens = s.bars.map(function (b) { return b.len; });
      var target = longer ? Math.max.apply(null, lens) : Math.min.apply(null, lens);
      choice(box, {
        options: s.bars.map(function (b) { return { node: lengthBar(b), value: b.thing, aria: b.thing }; }),
        answer: s.bars.find(function (b) { return b.len === target; }).thing, stack: true
      }, done);
      return;
    }
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    box.appendChild(el("p", { class: "hint", text: B.t("countPrompt") }));
    var bar = s.bars[0], counted = 0;
    var out = el("p", { class: "count-out", "aria-live": "polite" });
    var ask = el("div");
    var units = el("span", { class: "units" });
    for (var i = 0; i < bar.len; i++) {
      (function () {
        var u = el("button", { class: "unit", type: "button", text: s.unit, "aria-label": B.t("countAria") });
        u.addEventListener("click", function () {
          if (u.classList.contains("counted")) return;
          counted++;
          u.classList.add("counted");
          out.textContent = B.fa(counted);
          B.speak(B.NUMBER_WORDS[counted]);
          if (counted === bar.len) choice(ask, { options: nums(s.options), answer: bar.len }, done);
        });
        units.appendChild(u);
      })();
    }
    box.appendChild(el("div", { class: "measure" }, [
      lengthBar(bar),
      el("span", { class: "bar-row", dir: "ltr" }, [el("span", { class: "bar-thing" }), units])
    ]));
    box.appendChild(out);
    box.appendChild(ask);
  };

  // ---------- Money (in thousands of toman) ----------

  function bill(v) {
    return el("span", { class: "bill v" + v, role: "img", "aria-label": B.t("price", { n: B.fa(v) }) },
      [el("b", { text: B.fa(v) }), el("small", { text: B.t("moneyUnit") })]);
  }
  function sum(list) { return list.reduce(function (a, b) { return a + b; }, 0); }

  /* items: [{emoji, name, price}] things for sale with a price tag. Then either:
     - bills (money shown) and options: how much? The answer is s.answer, or else the bills added up,
       or else the prices added up;
     - wallet: the child pays exactly the total price by moving bills from the wallet to the counter. */
  steps.money = function (s, box, done) {
    var items = s.items || [];
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    if (items.length) {
      var shop = el("div", { class: "shop" });
      items.forEach(function (it) {
        shop.appendChild(el("span", { class: "item" }, [
          el("span", { class: "pic", "aria-hidden": "true", text: it.emoji }),
          it.name ? el("span", { class: "name", text: it.name }) : null,
          el("span", { class: "tag", text: B.t("price", { n: B.fa(it.price) }) })
        ]));
      });
      box.appendChild(shop);
    }
    var total = sum(items.map(function (it) { return it.price; }));
    if (!s.wallet) {
      if (s.bills) {
        var shown = el("div", { class: "bills" });
        s.bills.forEach(function (v) { shown.appendChild(bill(v)); });
        box.appendChild(shown);
      }
      var answer = s.answer != null ? s.answer : s.bills ? sum(s.bills) : total;
      choice(box, { options: nums(s.options), answer: answer }, done);
      return;
    }
    var wallet = el("div", { class: "bills wallet" }), counter = el("div", { class: "bills counter" });
    var out = el("p", { class: "hint", "aria-live": "polite" });
    var clear;
    function paid() { return sum(Array.prototype.map.call(counter.children, function (b) { return +b.dataset.v; })); }
    function update() { out.textContent = B.t("paid", { n: B.fa(paid()) }); if (clear) clear(); }
    s.wallet.forEach(function (v) {
      var b = el("button", { class: "bill-btn", type: "button" }, [bill(v)]);
      b.dataset.v = v;
      // Tap a bill to put it on the counter; tap it there to take it back.
      b.addEventListener("click", function () { (b.parentNode === wallet ? counter : wallet).appendChild(b); update(); });
      wallet.appendChild(b);
    });
    box.appendChild(el("p", { class: "label", text: B.t("counterLabel") }));
    box.appendChild(counter);
    box.appendChild(out);
    box.appendChild(el("p", { class: "label", text: B.t("walletLabel") }));
    box.appendChild(wallet);
    update();
    clear = doneButton(box, B.t("pay"), function () {
      var p = paid();
      return p === total ? "" : p < total ? B.t("moneyMore") : B.t("moneyLess");
    }, done);
  };

  // Number line: watch the hops, then choose where it landed.
  steps.numline = function (s, box, done) {
    var max = 20, end = s.a + s.b;
    var sign = s.b >= 0 ? " + " : " − ";
    box.appendChild(el("p", { class: "prompt", dir: "ltr", text: B.fa(s.a) + sign + B.fa(Math.abs(s.b)) + " = ؟" }));
    var W = 760, H = 140, pad = 20, step = (W - pad * 2) / max;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "numline");
    function x(n) { return pad + n * step; }
    function add(tag, attrs, text) {
      var e = document.createElementNS(ns, tag);
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      if (text != null) e.textContent = text;
      svg.appendChild(e);
      return e;
    }
    add("line", { x1: pad, y1: 90, x2: W - pad, y2: 90, stroke: "currentColor", "stroke-width": 2 });
    for (var n = 0; n <= max; n++) {
      add("line", { x1: x(n), y1: 84, x2: x(n), y2: 96, stroke: "currentColor", "stroke-width": n % 5 ? 1 : 2.5 });
      add("text", { x: x(n), y: 118, "text-anchor": "middle", "font-size": 14, fill: "currentColor" }, B.fa(n));
    }
    var hopper = svg.appendChild(B.svgArt(s.thing || "🐸", 32));
    hopper.setAttribute("transform", "translate(" + x(s.a) + " 64)");
    box.appendChild(svg);
    var ask = el("div");
    var go = el("button", { class: "btn secondary", type: "button", text: B.t("hop", { thing: s.thing || "🐸" }) });
    box.appendChild(go);
    box.appendChild(ask);
    go.addEventListener("click", function () {
      go.disabled = true;
      var dir = s.b >= 0 ? 1 : -1, pos = s.a, hops = 0;
      var timer = setInterval(function () {
        var from = pos;
        pos += dir;
        hops++;
        add("path", { d: "M" + x(from) + " 84 Q " + (x(from) + x(pos)) / 2 + " 40 " + x(pos) + " 84", fill: "none", stroke: "#e8a33d", "stroke-width": 2.5 });
        hopper.setAttribute("transform", "translate(" + x(pos) + " 64)");
        B.speak(B.NUMBER_WORDS[hops]);
        if (hops === Math.abs(s.b)) {
          clearInterval(timer);
          ask.appendChild(el("p", { class: "prompt", text: B.t("whereLanded") }));
          choice(ask, { options: s.options.map(function (n) { return { label: B.fa(n), value: n }; }), answer: end }, done);
        }
      }, 650);
    });
  };

  // Dialogic reading prompts for the grown-up (PEER sequence).
  steps.talk = function (s, box, done) {
    box.appendChild(el("p", { class: "scene", "aria-hidden": "true", text: s.scene }));
    box.appendChild(el("p", { class: "prompt", text: s.caption }));
    box.appendChild(el("div", { class: "parent-tip" }, [
      el("strong", { text: B.t("talkTipsTitle") }),
      el("ul", null, B.T.talkTips.map(function (t) { return el("li", { text: t }); }))
    ]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [nextBtn(B.t("next"), function () { done(false); })]));
  };

  steps.breathe = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("breatheTitle") }));
    setTimeout(function () { if (box.isConnected) B.speak(B.t("breatheTitle")); }, 300);
    var circle = el("div", { class: "breath-circle", text: "🌷" });
    var say = el("p", { class: "prompt", "aria-live": "polite", text: B.t("ready") });
    box.appendChild(circle);
    box.appendChild(say);
    var next = nextBtn(null, function () { stop(); done(false); });
    var start = el("button", { class: "btn secondary", type: "button", text: B.t("start") });
    var timers = [];
    function stop() { timers.forEach(clearTimeout); }
    start.addEventListener("click", function () {
      start.disabled = true;
      for (var i = 0; i < s.cycles; i++) {
        (function (i) {
          timers.push(setTimeout(function () { circle.textContent = "🌷"; circle.classList.add("in"); say.textContent = B.t("breatheIn"); if (box.isConnected) B.speak(say.textContent); }, i * 9000));
          timers.push(setTimeout(function () { circle.textContent = "🕯️"; circle.classList.remove("in"); say.textContent = B.t("breatheOut"); if (box.isConnected) B.speak(say.textContent); }, i * 9000 + 4000));
        })(i);
      }
      timers.push(setTimeout(function () { circle.textContent = "😌"; say.textContent = B.t("breatheEnd"); if (box.isConnected) B.speak(say.textContent); }, s.cycles * 9000));
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [start, next]));
  };

  // No right answer, and the answer is not saved anywhere.
  steps.feelings = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("feelAsk") }));
    var reply = el("p", { class: "prompt", "aria-live": "polite" });
    var faces = B.T.feelings;
    var wrap = el("div", { class: "options" });
    faces.forEach(function (f) {
      wrap.appendChild(el("button", { class: "opt pic", type: "button", "aria-label": f[1], onclick: function () {
        reply.textContent = B.t("feelReply");
        B.speak(f[1] + ". " + reply.textContent);
      } }, [f[0]]));
    });
    setTimeout(function () { if (box.isConnected) B.speak(B.t("feelAsk")); }, 300);
    box.appendChild(wrap);
    box.appendChild(reply);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [nextBtn(B.t("finish"), function () { done(false); })]));
  };

  /* Shared with the files that add more step types (js/games.js, js/anim.js, …): each does
     B.engine.steps.mytype = function (s, box, done) { … } and calls done(scored, firstTry) when finished. */
  B.engine = { steps: steps, choice: choice, speakBtn: speakBtn, nextBtn: nextBtn, doneButton: doneButton, pick: pick, nums: nums, shapeSvg: shapeSvg };

  /* Runs a lesson. onFinish(result) gets {scored, firstTry, steps}, where steps[i] is {scored, firstTry} for each
     step played (practice uses it to bring missed items back, js/practice.js). start: the step to begin at (the content browser). */
  B.playLesson = function (lesson, root, onFinish, onExit, start) {
    var i = start || 0, scored = 0, firstTry = 0, results = [];
    var bar = el("span", { style: "width:0" });
    var stage = el("div");
    root.innerHTML = "";
    root.appendChild(el("div", { class: "lesson" }, [
      el("div", { class: "row" }, [
        el("strong", { text: lesson.emoji + " " + lesson.title }),
        el("span", { class: "spacer" }),
        el("button", { class: "btn quiet", type: "button", text: B.t("exit"), onclick: onExit })
      ]),
      el("div", { class: "progress", role: "progressbar", "aria-label": B.t("lessonProgress") }, [bar]),
      stage
    ]));
    function show() {
      bar.style.width = (i / lesson.steps.length) * 100 + "%";
      stage.innerHTML = "";
      if (i >= lesson.steps.length) { onFinish({ scored: scored, firstTry: firstTry, steps: results }); return; }
      var s = lesson.steps[i];
      steps[s.type](s, stage, function (isScored, wasFirst) {
        if (isScored) { scored++; if (wasFirst) firstTry++; }
        results[i] = { scored: !!isScored, firstTry: !!(isScored && wasFirst) };
        i++;
        show();
        window.scrollTo(0, 0);
      });
    }
    show();
  };
})();
