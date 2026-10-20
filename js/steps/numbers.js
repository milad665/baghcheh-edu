/* باغچه — number steps for ریاضی (math), shared with علوم and ایران و جهان.
   - fraction: cut a shape (a sangak, a cake, a bar) into equal parts and colour some, name a part, pick the shape cut
     into equal parts, or share a set of things (sweets, walnuts) equally between children.
   - chart: read a picture graph (or a bar chart), build one from a pile of pictures, or add to one.
   - count (more ways than the plain step in js/engine.js): things in a circle or scattered, moved aside as they
     are counted, beats heard and seen, or a picture seen for a moment (flash: dots, a die, fingers, a frame).
   - compare with match: put the things of two groups side by side, one to one: which has more?
   - track: a number board game (Siegler & Ramani), roll a die and move counting each square.
   - tangram: fill an outline with shapes, turning them to fit.
   Game rules (js/games.js): no timers or points, a gentle bounce on a miss, the answer shown after two misses on the
   same thing; everything works by tapping, dragging, and the keyboard (Tab and Enter).
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";
  var uid = 0;

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // An SVG element the keyboard can reach and press like a button.
  function pressable(node, label, onPress) {
    node.setAttribute("tabindex", "0");
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", label);
    node.addEventListener("click", onPress);
    node.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPress(); }
    });
  }

  /* "Check it" with the games' rules: test() returns "" when it is right, or a hint. After two misses reveal()
     shows the answer. */
  function checkButton(box, label, test, reveal, done) {
    var fb = E.feedback(box), tries = 0;
    var btn = E.nextBtn(label, function () {
      tries++;
      var hint = test();
      if (!hint) {
        btn.disabled = true;
        B.speak(fb.good());
        setTimeout(function () { done(tries === 1); }, 1000);
        return;
      }
      fb.tryAgain(hint);
      if (tries >= 2 && reveal) reveal(fb);
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [btn]));
    return { clear: fb.clear, btn: btn };
  }

  function promptLine(box, text, say, audio) {
    if (text) box.appendChild(el("p", { class: "prompt", text: text }));
    var sb = E.speakBtn(say || text, audio);
    if (sb) box.appendChild(sb);
  }

  // ---------- fraction ----------

  /* Shapes, in a viewBox of SIZE[shape]: circle (a round cake), square, rect (a long bar), bread (a sangak).
     cuts: where the shape is cut, from 0 to 1: across a long shape (from the left, so a cut is an up-down line),
     or, in a circle, turns from the centre (0 is straight up), so [0, 0.5] cuts a circle in half. */
  var SIZE = { circle: [220, 220], square: [220, 220], rect: [340, 140], bread: [360, 150] };
  function isRound(shape) { return shape === "circle"; }
  function evenCuts(shape, parts) {
    var c = [];
    for (var i = isRound(shape) ? 0 : 1; i < parts; i++) c.push(i / parts);
    return isRound(shape) && parts < 2 ? [] : c;
  }
  function outline(shape) {
    var w = SIZE[shape][0], h = SIZE[shape][1];
    if (shape === "circle") return svgEl("circle", { cx: w / 2, cy: h / 2, r: w / 2 - 6 });
    if (shape === "bread") {
      // A sangak: long and rounded, with a slightly uneven edge.
      var d = "";
      for (var k = 0; k <= 72; k++) {
        var t = k / 72 * 2 * Math.PI, c = Math.cos(t), sn = Math.sin(t), wob = 1 + 0.02 * Math.sin(7 * t);
        var x = w / 2 + (w / 2 - 8) * wob * Math.sign(c) * Math.pow(Math.abs(c), 0.45);
        var y = h / 2 + (h / 2 - 8) * wob * Math.sign(sn) * Math.pow(Math.abs(sn), 0.45);
        d += (k ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      return svgEl("path", { d: d + " Z" });
    }
    return svgEl("rect", { x: 6, y: 6, width: w - 12, height: h - 12, rx: shape === "rect" ? 10 : 6 });
  }
  function turn(shape, a) {
    var c = SIZE[shape][0] / 2, r = c - 6;
    return [c + r * Math.sin(2 * Math.PI * a), c - r * Math.cos(2 * Math.PI * a)];
  }
  // The pieces between the cuts: [{ from, to, size }] (size as a part of the whole).
  function pieces(shape, cuts) {
    var c = cuts.slice().sort(function (a, b) { return a - b; }), list = [];
    if (isRound(shape)) {
      if (c.length < 2) return [{ from: 0, to: 1, size: 1, whole: true }];
      c.forEach(function (a, i) { var b = i + 1 < c.length ? c[i + 1] : c[0] + 1; list.push({ from: a, to: b, size: b - a }); });
      return list;
    }
    var edges = [0].concat(c, [1]);
    for (var i = 0; i + 1 < edges.length; i++) list.push({ from: edges[i], to: edges[i + 1], size: edges[i + 1] - edges[i] });
    return list;
  }
  function allEqual(list) { return list.every(function (p) { return Math.abs(p.size - list[0].size) < 1e-6; }); }
  function piecePath(shape, p) {
    var w = SIZE[shape][0], h = SIZE[shape][1];
    if (isRound(shape)) {
      if (p.whole) return svgEl("circle", { cx: w / 2, cy: h / 2, r: w / 2 - 6 });
      var a = turn(shape, p.from), b = turn(shape, p.to);
      return svgEl("path", { d: "M" + w / 2 + " " + h / 2 + " L" + a[0] + " " + a[1] + " A" + (w / 2 - 6) + " " + (w / 2 - 6) +
        " 0 " + (p.size > 0.5 ? 1 : 0) + " 1 " + b[0] + " " + b[1] + " Z" });
    }
    return svgEl("rect", { x: p.from * w, y: 0, width: (p.to - p.from) * w, height: h });
  }
  function cutLine(shape, a, cls) {
    var w = SIZE[shape][0], h = SIZE[shape][1];
    if (isRound(shape)) { var e = turn(shape, a); return svgEl("line", { x1: w / 2, y1: h / 2, x2: e[0], y2: e[1], class: cls }); }
    return svgEl("line", { x1: a * w, y1: 2, x2: a * w, y2: h - 2, class: cls });
  }

  /* Draws a shape cut at cuts. opts.on: indices of coloured pieces; opts.tap(i, node): makes pieces pressable. */
  function drawShape(shape, cuts, opts) {
    opts = opts || {};
    var w = SIZE[shape][0], h = SIZE[shape][1], id = "frac-clip-" + (++uid);
    var svg = svgEl("svg", { viewBox: "0 0 " + w + " " + h, class: "frac-svg frac-" + shape, role: "group" });
    var clip = svgEl("clipPath", { id: id });
    clip.appendChild(outline(shape));
    svg.appendChild(clip);
    var base = outline(shape);
    base.setAttribute("class", "frac-base");
    svg.appendChild(base);
    var g = svgEl("g", { "clip-path": "url(#" + id + ")" });
    var nodes = pieces(shape, cuts).map(function (p, i) {
      var n = piecePath(shape, p);
      n.setAttribute("class", "frac-piece" + ((opts.on || []).indexOf(i) !== -1 ? " on" : "") + (i % 2 ? " alt" : ""));
      if (opts.tap) pressable(n, B.t("fracPiece", { n: B.fa(i + 1) }), function () { opts.tap(i, n); });
      g.appendChild(n);
      return n;
    });
    svg.appendChild(g);
    // A sangak's dimples, drawn over the pieces.
    if (shape === "bread") {
      var dots = svgEl("g", { class: "frac-dimples", "clip-path": "url(#" + id + ")" });
      for (var y = 30; y < h - 18; y += 26) for (var x = 28 + (y % 52 ? 13 : 0); x < w - 18; x += 26) {
        dots.appendChild(svgEl("ellipse", { cx: x + (x * 7 % 5) - 2, cy: y + (x * 3 % 5) - 2, rx: 5, ry: 3.5 }));
      }
      svg.appendChild(dots);
    }
    var lines = svgEl("g", { class: "frac-lines" });
    cuts.forEach(function (a) { lines.appendChild(cutLine(shape, a, "frac-cut")); });
    svg.appendChild(lines);
    var edge = outline(shape);
    edge.setAttribute("class", "frac-edge");
    svg.appendChild(edge);
    return { svg: svg, pieces: nodes, lines: lines };
  }

  // An option like { frac: [1, 4] }: written as a fraction, the top number over the bottom one.
  function fracNode(f) {
    return el("span", { class: "frac-num", dir: "ltr" }, [el("span", { text: B.fa(f[0]) }), el("span", { class: "frac-bar" }), el("span", { text: B.fa(f[1]) })]);
  }

  /* shape (circle | square | rect | bread, default circle), parts (equal parts, default 2), and one of:
     - take: the child colours take parts (the default);
     - ask: "name" with take coloured, options (strings, or { frac: [1, 4] }) and answer;
     - ask: "equal" (or "unequal") with shapes [{ shape, cuts } or { shape, parts }]: tap the one cut into equal parts;
     - cut: true: the child cuts the shape into parts equal parts by tapping dotted lines (grid: how many places to
       cut, default 2 × parts);
     - set: n things (thing, an emoji) shared equally between parts children (who: their emoji), optional result
       (said at the end, e.g. «نصف ۸ می‌شود ۴»).
     Optional prompt, say, pic (shown above). */
  E.steps.fraction = function (s, box, done) {
    if (s.set) return share(s, box, done);
    var shape = s.shape || "circle", parts = s.parts || 2, take = s.take || 0;
    if (s.pic) box.appendChild(el("p", { class: "frac-pic", "aria-hidden": "true", text: s.pic }));
    if (s.ask === "equal" || s.ask === "unequal") {
      promptLine(box, s.prompt || B.t(s.ask === "equal" ? "fracEqual" : "fracUnequal"), s.say, s.audio);
      var want = -1;
      var options = s.shapes.map(function (o, i) {
        var sh = o.shape || shape, cuts = o.cuts || evenCuts(sh, o.parts || parts);
        if (want === -1 && allEqual(pieces(sh, cuts)) === (s.ask === "equal")) want = i;
        return { node: drawShape(sh, cuts).svg, value: i, aria: B.t("fracOption", { n: B.fa(i + 1) }) };
      });
      E.choice(box, { options: options, answer: want }, done);
      return;
    }
    if (s.ask === "name") {
      promptLine(box, s.prompt || B.t("fracName"), s.say, s.audio);
      var on = [];
      for (var i = 0; i < take; i++) on.push(i);
      box.appendChild(el("div", { class: "frac-stage" }, [drawShape(shape, evenCuts(shape, parts), { on: on }).svg]));
      E.choice(box, { options: s.options.map(function (o) {
        return o && o.frac ? { node: fracNode(o.frac), value: o.frac.join("/"), aria: B.fa(o.frac[0]) + "/" + B.fa(o.frac[1]) } : o;
      }), answer: s.answer }, done);
      return;
    }
    if (s.cut) return cut(s, box, done, shape, parts);
    // Colour take of the parts.
    promptLine(box, s.prompt || B.t("fracColour", { take: B.fa(take), parts: B.fa(parts) }), s.say, s.audio);
    var stage = el("div", { class: "frac-stage" }), coloured = 0, check;
    var drawn = drawShape(shape, evenCuts(shape, parts), { tap: function (i, n) {
      var onNow = n.classList.toggle("on");
      n.setAttribute("aria-pressed", onNow ? "true" : "false");
      coloured += onNow ? 1 : -1;
      check.clear();
    } });
    drawn.pieces.forEach(function (n) { n.setAttribute("aria-pressed", "false"); });
    stage.appendChild(drawn.svg);
    box.appendChild(stage);
    check = checkButton(box, B.t("makeDone"), function () {
      return coloured === take ? "" : coloured < take ? B.t("fracMore") : B.t("fracLess");
    }, function (fb) {
      // Show the answer: exactly take parts coloured; the child presses the button again.
      fb.say(B.t("fracShowColour", { take: B.fa(take) }));
      drawn.pieces.forEach(function (n, i) {
        n.classList.toggle("on", i < take);
        n.classList.toggle("show", i < take);
        n.setAttribute("aria-pressed", i < take ? "true" : "false");
      });
      coloured = take;
    }, function (first) {
      drawn.pieces.forEach(function (n) { n.setAttribute("tabindex", "-1"); });
      done(true, first);
    });
  };

  // The child cuts: tap a dotted line to cut along it (tap again to take the cut away).
  function cut(s, box, done, shape, parts) {
    promptLine(box, s.prompt || B.t("fracCut", { parts: B.fa(parts) }), s.say, s.audio);
    var grid = s.grid || parts * 2, places = [], chosen = [], check, revealed = false;
    for (var k = isRound(shape) ? 0 : 1; k < grid; k++) places.push(k / grid);
    var stage = el("div", { class: "frac-stage" });
    box.appendChild(stage);
    var hits = [];
    function draw() {
      stage.innerHTML = "";
      var d = drawShape(shape, chosen);
      hits = places.map(function (a, i) {
        var line = cutLine(shape, a, "frac-place" + (chosen.indexOf(a) !== -1 ? " cut" : ""));
        var hit = cutLine(shape, a, "frac-hit");
        var g = svgEl("g", { class: "frac-knife" });
        g.appendChild(line);
        g.appendChild(hit);
        g._a = a;
        pressable(g, B.t("fracLine", { n: B.fa(i + 1) }), function () {
          var at = chosen.indexOf(a), hadFocus = document.activeElement === g;
          if (at === -1) chosen.push(a); else chosen.splice(at, 1);
          check.clear();
          draw();
          // Keep keyboard focus on the same line after the shape is drawn again.
          if (hadFocus) stage.querySelectorAll(".frac-knife")[i].focus();
        });
        g.setAttribute("aria-pressed", chosen.indexOf(a) !== -1 ? "true" : "false");
        if (revealed && right(a)) g.classList.add("show");
        d.svg.appendChild(g);
        return g;
      });
      stage.appendChild(d.svg);
    }
    function right(a) { return Math.abs(a * parts - Math.round(a * parts)) < 1e-6; }
    check = checkButton(box, B.t("fracCutDone"), function () {
      var p = pieces(shape, chosen);
      if (p.length !== parts) return B.t("fracCutFew", { parts: B.fa(parts) });
      return allEqual(p) ? "" : B.t("fracCutUnequal");
    }, function (fb) {
      fb.say(B.t("fracShowCut"));
      revealed = true;
      hits.forEach(function (g) { if (right(g._a)) g.classList.add("show"); });
    }, function (first) {
      hits.forEach(function (g) { g.setAttribute("tabindex", "-1"); });
      done(true, first);
    });
    draw();
  }

  // Share n things equally between parts children: tap a thing, then a plate (or drag it there).
  var WHO = ["👧", "👦", "👧🏽", "👦🏻", "👧🏻", "👦🏽"];
  function share(s, box, done) {
    var n = s.set, parts = s.parts || 2, thing = s.thing || "🍬", who = s.who || WHO, each = n / parts;
    promptLine(box, s.prompt || B.t("fracShare", { n: B.fa(n), parts: B.fa(parts) }), s.say, s.audio);
    var plates = [], picked = null, check;
    var row = el("div", { class: "share-plates" });
    for (var i = 0; i < parts; i++) {
      (function (i) {
        var dish = el("div", { class: "share-dish" });
        var p = el("button", { class: "share-plate", type: "button", "aria-label": B.t("fracPlate", { n: B.fa(i + 1) }) },
          [el("span", { class: "share-who", "aria-hidden": "true", text: who[i % who.length] })]);
        p.dataset.drop = "";
        p._dish = dish;
        p.addEventListener("click", function () {
          var t = picked || table.querySelector("button:not([disabled])");
          if (t) put(t, p);
        });
        plates.push(p);
        row.appendChild(el("div", { class: "share-col" }, [p, dish]));
      })(i);
    }
    box.appendChild(row);
    var table = el("div", { class: "tray table share-table" });
    table.dataset.drop = "";
    box.appendChild(table);
    function put(t, p) {
      if (picked) picked.classList.remove("picked");
      picked = null;
      if (p) { p._dish.appendChild(t); t.setAttribute("aria-label", B.t("fracBack")); }
      else { table.appendChild(t); t.setAttribute("aria-label", B.t("fracPick")); }
      check.clear();
    }
    for (var k = 0; k < n; k++) {
      (function () {
        var t = el("button", { class: "food", type: "button", "aria-label": B.t("fracPick") }, [el("span", { "aria-hidden": "true", text: thing })]);
        t.addEventListener("click", function () {
          if (t.parentNode !== table) { put(t, null); return; }
          if (picked === t) { t.classList.remove("picked"); picked = null; return; }
          if (picked) picked.classList.remove("picked");
          picked = t;
          t.classList.add("picked");
        });
        E.draggable(t, function (target) {
          var p = target.closest(".share-plate");
          if (p) put(t, p);
          else if (target === table && t.parentNode !== table) put(t, null);
        });
        table.appendChild(t);
      })();
    }
    var hint = el("p", { class: "hint", text: B.t("fracShareHint") });
    box.appendChild(hint);
    check = checkButton(box, B.t("fracShareDone"), function () {
      if (table.querySelector(".food")) return B.t("fracShareAll");
      return plates.every(function (p) { return p._dish.children.length === each; }) ? "" : B.t("fracShareEqual");
    }, function (fb) {
      fb.say(B.t("fracShareShow", { n: B.fa(each) }));
    }, function (first) {
      box.querySelectorAll("button.food, .share-plate").forEach(function (b) { b.disabled = true; });
      var line = s.result || B.t("fracEach", { n: B.fa(each) });
      box.insertBefore(el("p", { class: "math-big frac-result", text: line }), hint);
      hint.remove();
      B.speak(line);
      setTimeout(function () { done(true, first); }, 1400);
    });
  }

  // ---------- chart: picture graphs and bar charts ----------

  /* rows: [{ label, pic, n, has }]: one column per row, n pictures high (n is the right number; has is how many are
     already there when the child adds or builds). Optional title, prompt, say, max (the height, default the
     biggest n), bars: true (a bar chart with a number scale instead of pictures), and then one of:
     - read: question, options, answer (a number, or a row's label);
     - make: true: the pictures are in a pile under the graph; the child puts each in its column;
     - add: true: the child adds to (or takes from) columns until each has n; the prompt says what to add.
     After make or add, question, options and answer are asked when given. */
  E.steps.chart = function (s, box, done) {
    var rows = s.rows, building = s.make || s.add;
    // One spare row when the child builds, so the height doesn't give the answer away.
    var max = s.max || Math.max.apply(null, rows.map(function (r) { return Math.max(r.n, r.has || 0); })) + (building ? 1 : 0);
    promptLine(box, s.prompt || (s.make ? B.t("chartMake") : ""), s.say, s.audio);
    var counts = rows.map(function (r) { return building ? r.has || 0 : r.n; });
    var graph = el("div", { class: "chart" + (s.bars ? " bars" : ""), role: "group", "aria-label": s.title || B.t("chartAria") });
    if (s.title) box.appendChild(el("p", { class: "chart-title", text: s.title }));
    var body = el("div", { class: "chart-body" });
    if (s.bars) {
      var scale = el("div", { class: "chart-scale", "aria-hidden": "true" });
      for (var v = max; v >= 1; v--) scale.appendChild(el("span", { text: B.fa(v) }));
      body.appendChild(scale);
    }
    var cols = rows.map(function (r, i) {
      var stack = el("div", { class: "chart-stack" });
      var col = el(s.make ? "button" : "div", { class: "chart-col" }, [stack]);
      if (s.make) { col.type = "button"; col.dataset.drop = ""; }
      col._i = i;
      col._stack = stack;
      body.appendChild(col);
      return col;
    });
    graph.appendChild(body);
    var labels = el("div", { class: "chart-labels" });
    rows.forEach(function (r) {
      labels.appendChild(el("span", { class: "chart-label" }, [r.pic ? el("span", { class: "chart-label-pic", "aria-hidden": "true", text: r.pic }) : null,
        r.label ? el("span", { text: r.label }) : null]));
    });
    graph.appendChild(labels);
    box.appendChild(graph);
    function draw(showTarget) {
      cols.forEach(function (col, i) {
        var r = rows[i], stack = col._stack;
        stack.innerHTML = "";
        for (var k = 0; k < max; k++) {
          var cell = el("span", { class: "chart-cell" + (k < counts[i] ? " on" : "") + (showTarget && k < r.n && k >= counts[i] ? " target" : "") +
            (showTarget && k >= r.n && k < counts[i] ? " extra" : "") });
          if (k < counts[i] && !s.bars) B.setArt(cell, r.pic || "●");
          stack.appendChild(cell);
        }
        var name = r.label || r.pic || "";
        col.setAttribute("aria-label", B.t("chartColumn", { label: name, n: B.fa(counts[i]) }));
      });
    }
    draw();

    function ask(firstBuild) {
      if (!s.question) { setTimeout(function () { done(true, firstBuild); }, 900); return; }
      var q = el("div");
      promptLine(q, s.question);
      box.appendChild(q);
      E.choice(q, { options: s.options.map(function (o) { return typeof o === "number" ? { label: B.fa(o), value: o } : o; }), answer: s.answer },
        function (scored, first) { done(true, firstBuild && first); });
    }
    if (!building) { ask(true); return; }
    if (s.make) return makeChart(s, box, rows, cols, counts, draw, ask);

    // add: + and − under each column.
    var controls = el("div", { class: "chart-controls" });
    var check;
    rows.forEach(function (r, i) {
      var name = r.label || r.pic || "";
      var plus = el("button", { class: "btn secondary chart-btn", type: "button", text: "+", "aria-label": B.t("chartAddOne", { label: name }), onclick: function () {
        if (counts[i] < max) counts[i]++;
        draw();
        check.clear();
      } });
      var minus = el("button", { class: "btn secondary chart-btn", type: "button", text: "−", "aria-label": B.t("chartTakeOne", { label: name }), onclick: function () {
        if (counts[i] > 0) counts[i]--;
        draw();
        check.clear();
      } });
      controls.appendChild(el("span", { class: "chart-control" }, [plus, minus]));
    });
    graph.appendChild(controls);
    var shown = false;
    check = checkButton(box, B.t("makeDone"), function () {
      if (shown) draw(true);
      return rows.every(function (r, i) { return counts[i] === r.n; }) ? "" : B.t("chartCheck");
    }, function (fb) {
      shown = true;
      fb.say(B.t("chartShow"));
      draw(true);
    }, function (first) {
      controls.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
      draw();
      check.btn.parentNode.remove();
      ask(first);
    });
  };

  // make: put every picture from the pile into its own column.
  function makeChart(s, box, rows, cols, counts, draw, ask) {
    var pile = el("div", { class: "tray chart-pile" });
    box.appendChild(pile);
    var fb = E.feedback(box);
    var picked = null, misses = 0, left = 0;
    var items = [];
    rows.forEach(function (r, i) { for (var k = counts[i]; k < r.n; k++) items.push(i); });
    function place(t, col) {
      if (!t || t.disabled) return;
      if (col._i !== t._row) {
        misses++;
        t._miss = (t._miss || 0) + 1;
        E.bounce(col);
        fb.tryAgain();
        if (t._miss >= 2) { cols[t._row].classList.add("show"); fb.say(B.t("gameShowItem")); }
        return;
      }
      cols.forEach(function (c) { c.classList.remove("show"); });
      t.remove();
      if (picked === t) picked = null;
      counts[col._i]++;
      draw();
      fb.clear();
      left--;
      var next = pile.querySelector("button");
      if (next && document.activeElement && document.activeElement !== document.body) next.focus();
      if (!left) {
        cols.forEach(function (c) { c.disabled = true; });
        B.speak(fb.good());
        ask(misses === 0);
      }
    }
    shuffle(items).forEach(function (row) {
      var r = rows[row];
      var t = el("button", { class: "tile-btn", type: "button", "aria-label": r.label || r.pic }, [E.face(r.pic || r.label)]);
      t._row = row;
      left++;
      t.addEventListener("click", function () {
        if (picked) picked.classList.remove("picked");
        picked = picked === t ? null : t;
        if (picked) t.classList.add("picked");
      });
      E.draggable(t, function (target) { var c = target.closest(".chart-col"); if (c) place(t, c); });
      pile.appendChild(t);
    });
    cols.forEach(function (col) {
      col.addEventListener("click", function () {
        if (!picked) { fb.say(B.t("chartPick")); return; }
        place(picked, col);
      });
    });
  }

  // ---------- quick pictures: dots, a die, fingers, a five-frame (subitising) ----------

  /* A small number as a picture the eye takes in at once: "dots" (dice patterns to 6, then a row of five and the
     rest under it), "dice" (a die face, 1 to 6), "fingers" (one hand, then a full hand and the other one), "frame"
     (a ten-frame row of five, then two rows), or an emoji (the thing itself, set out like dots). */
  var DICE = {
    1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]],
    5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]]
  };
  // Where the dots of n go: [x, y] in a box w × h.
  function spots(n) {
    if (n <= 6) return { w: 60, h: 60, at: (DICE[n] || []).map(function (p) { return [p[0] * 15, p[1] * 15]; }) };
    var at = [];
    for (var i = 0; i < n; i++) at.push([12 + (i % 5) * 19, i < 5 ? 14 : 36]);
    return { w: 100, h: 50, at: at };
  }
  // One hand, palm towards us, thumb on the left; up fingers go index, middle, ring, little, then thumb.
  var FINGERS = [[12, 8.5, 10, 36], [21.5, 8.5, 6, 40], [31, 8.5, 10, 36], [40.5, 7.5, 18, 28]];
  function hand(up) {
    var skin = ' fill="#f3c39b" stroke="#3d2c22" stroke-width="2" stroke-linejoin="round"';
    var out = "";
    FINGERS.forEach(function (f, i) {
      var y = i < up ? f[2] : 34, h = i < up ? f[3] : 12;
      out += '<rect x="' + f[0] + '" y="' + y + '" width="' + f[1] + '" height="' + h + '" rx="' + f[1] / 2 + '"' + skin + "/>";
    });
    if (up >= 5) out += '<rect x="0" y="34" width="10" height="26" rx="5" transform="rotate(-28 10 60)"' + skin + "/>";
    out += '<rect x="9" y="40" width="40" height="36" rx="12"' + skin + '/><rect x="16" y="70" width="26" height="14" rx="3"' + skin + "/>";
    out += up >= 5 ? "" : '<rect x="9" y="50" width="22" height="10" rx="5"' + skin + "/>";
    return out;
  }
  function quickPic(kind, n, thing) {
    var svg = svgEl("svg", { class: "quick quick-" + (kind === "fingers" || kind === "dice" || kind === "frame" || kind === "dots" ? kind : "things"),
      role: "img", "aria-label": B.t(kind === "fingers" ? "quickFingers" : "quickDots", { n: B.fa(n) }) });
    var w, h;
    if (kind === "tally") {
      // tally marks: four lines and a fifth across them, then the lines left over
      var groups = Math.floor(n / 5), rest = n % 5, x = 4;
      h = 34;
      for (var gi = 0; gi < groups; gi++) {
        for (var li = 0; li < 4; li++) svg.appendChild(svgEl("path", { d: "M" + (x + li * 6) + " 6v22", stroke: "#3d2c22", "stroke-width": 2.4, "stroke-linecap": "round" }));
        svg.appendChild(svgEl("path", { d: "M" + (x - 3) + " 24L" + (x + 21) + " 10", stroke: "#e5483f", "stroke-width": 2.4, "stroke-linecap": "round" }));
        x += 32;
      }
      for (var ri = 0; ri < rest; ri++) svg.appendChild(svgEl("path", { d: "M" + (x + ri * 6) + " 6v22", stroke: "#3d2c22", "stroke-width": 2.4, "stroke-linecap": "round" }));
      w = Math.max(30, x + rest * 6 + 2);
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.style.width = (w * 3.2) + "px";
      return svg;
    }
    if (kind === "fingers") {
      // Two hands: the full one first (on the left, as numbers are read in sums), thumbs towards each other.
      var hands = n > 5 ? [5, n - 5] : [n];
      w = hands.length === 2 ? 150 : 70; h = 86;
      hands.forEach(function (up, i) {
        var g = svgEl("g", { transform: "translate(" + (i * 80 + 1) + " 1)" + (hands.length === 2 && i === 0 ? " translate(70 0) scale(-1 1)" : "") });
        g.innerHTML = '<g transform="translate(14 0)">' + hand(up) + "</g>";
        svg.appendChild(g);
      });
    } else if (kind === "frame") {
      var rows = n > 5 ? 2 : 1;
      w = 104; h = rows * 20 + 4;
      for (var c = 0; c < rows * 5; c++) {
        svg.appendChild(svgEl("rect", { x: 2 + (c % 5) * 20, y: 2 + Math.floor(c / 5) * 20, width: 20, height: 20, fill: "#fffaf0", stroke: "#3d2c22", "stroke-width": 1.5 }));
        if (c < n) svg.appendChild(svgEl("circle", { cx: 12 + (c % 5) * 20, cy: 12 + Math.floor(c / 5) * 20, r: 7, fill: "#e5483f" }));
      }
    } else {
      // Things are bigger than dots, so they are set out further apart.
      var sp = spots(n), k = kind === "dots" || kind === "dice" ? 1 : 1.5;
      w = sp.w * k; h = sp.h * k;
      if (kind === "dice") svg.appendChild(svgEl("rect", { x: 2, y: 2, width: 56, height: 56, rx: 10, fill: "#fffaf0", stroke: "#3d2c22", "stroke-width": 2 }));
      sp.at.forEach(function (p) {
        if (kind === "dots" || kind === "dice") svg.appendChild(svgEl("circle", { cx: p[0], cy: p[1], r: kind === "dice" ? 5.5 : 7, fill: kind === "dice" ? "#3d2c22" : "#e5483f" }));
        else { var a = B.svgArt(thing, 26); a.setAttribute("transform", "translate(" + p[0] * k + " " + p[1] * k + ")"); svg.appendChild(a); }
      });
    }
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    return svg;
  }
  E.quickPic = quickPic;

  // A soft drum beat, made on the device (no sound file).
  var audio = null;
  function thump() {
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      audio = audio || new C();
      var t = audio.currentTime, o = audio.createOscillator(), g = audio.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(170, t);
      o.frequency.exponentialRampToValueAtTime(55, t + 0.25);
      g.gain.setValueAtTime(0.7, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.connect(g);
      g.connect(audio.destination);
      o.start(t);
      o.stop(t + 0.32);
    } catch (e) { /* no sound: the picture still moves */ }
  }

  // An answer button showing a number, with its dots under it (optDots) for children who do not read numerals yet.
  function numOptions(s) {
    return s.options.map(function (o) {
      if (typeof o === "object") {
        if (o.fingers != null || o.dots != null) return { node: quickPic(o.fingers != null ? "fingers" : "dots", o.fingers != null ? o.fingers : o.dots), value: o.value != null ? o.value : (o.fingers != null ? o.fingers : o.dots), aria: B.fa(o.fingers != null ? o.fingers : o.dots) };
        return o;
      }
      if (!s.optDots) return { label: B.fa(o), value: o };
      return { node: el("span", { class: "num-dots" }, [el("b", { text: B.fa(o) }), quickPic("dots", o)]), value: o, aria: B.fa(o) };
    });
  }

  // ---------- count: arranged, moved aside, heard, or seen for a moment ----------

  /* The plain step (js/engine.js) counts things in a row. These fields add to it:
     prompt, say, ask (the question at the end); layout: "line" | "circle" | "scatter" | "rows" (two rows of five);
     move: true (each thing counted moves to a line below, to keep track); beats: true (the thing, a drum by
     default, beats n times: count what you hear and see); flash: ms or true (show is seen for a moment, then
     covered: say how many without counting; show: "dots" | "dice" | "fingers" | "frame" | an emoji, default
     dots); show without flash: the picture stays (also "tally": tally marks in fives); optDots: answers with their
     dots under the number; options may also be { fingers } or { dots }. */
  var plainCount = E.steps.count;
  var SCATTER = [[14, 20], [40, 12], [68, 22], [88, 10], [24, 50], [54, 44], [84, 52], [10, 82], [40, 80], [70, 84]];
  E.steps.count = function (s, box, done) {
    if (s.flash) return flash(s, box, done);
    if (s.show) return still(s, box, done);
    if (s.beats) return beats(s, box, done);
    if (!s.layout && !s.move && !s.prompt && !s.say && !s.ask && !s.optDots) return plainCount(s, box, done);
    promptLine(box, s.prompt || B.t("countPrompt"), s.say, s.audio);
    var layout = s.layout || "line";
    var things = el("div", { class: "things lay-" + layout + (s.move ? " moving" : "") });
    var aside = s.move ? el("div", { class: "things counted-line", dir: "ltr" }) : null;
    var out = el("p", { class: "count-out", "aria-live": "polite" });
    var ask = el("div"), counted = 0;
    var places = layout === "scatter" ? shuffle(SCATTER) : null;
    for (var i = 0; i < s.n; i++) {
      (function (i) {
        var t = el("button", { class: "thing", type: "button", "aria-label": B.t("countAria") }, B.art(s.thing));
        if (layout === "scatter") { t.style.left = places[i][0] + "%"; t.style.top = places[i][1] + "%"; }
        if (layout === "circle") {
          var a = (i / s.n) * 2 * Math.PI - Math.PI / 2;
          t.style.left = 50 + 38 * Math.cos(a) + "%"; t.style.top = 50 + 38 * Math.sin(a) + "%";
        }
        t.addEventListener("click", function () {
          if (t.classList.contains("counted")) return;
          counted++;
          t.classList.add("counted");
          t.appendChild(el("span", { class: "n", text: B.fa(counted) }));
          if (aside) { t.style.left = t.style.top = ""; aside.appendChild(t); }
          out.textContent = B.fa(counted);
          B.speak(B.NUMBER_WORDS[counted]);
          if (counted === s.n) {
            ask.appendChild(el("p", { class: "prompt", text: s.ask || B.t("countAsk") }));
            E.choice(ask, { options: numOptions(s), answer: s.n }, done);
          }
        });
        things.appendChild(t);
      })(i);
    }
    box.appendChild(things);
    if (aside) box.appendChild(aside);
    box.appendChild(out);
    box.appendChild(ask);
  };

  // Beats: a drum (or a frog, a ball) goes n times while the child counts, then says how many.
  function beats(s, box, done) {
    promptLine(box, s.prompt || B.t("beatsPrompt"), s.say, s.audio);
    var who = el("p", { class: "beat-thing", "aria-hidden": "true" }, B.art(s.thing || "🥁"));
    box.appendChild(who);
    var ask = el("div"), asked = false, busy = false;
    var go = E.nextBtn(B.t("beatsGo"), function () {
      if (busy) return;
      busy = true;
      go.disabled = true;
      for (var i = 0; i < s.n; i++) {
        setTimeout(function () {
          if (!box.isConnected) return;
          who.classList.remove("beat"); void who.offsetWidth; who.classList.add("beat");
          thump();
        }, 700 + i * 950);
      }
      setTimeout(function () {
        busy = false;
        go.disabled = false;
        go.textContent = B.t("beatsAgain");
        if (asked || !box.isConnected) return;
        asked = true;
        ask.appendChild(el("p", { class: "prompt", text: s.ask || B.t("beatsAsk") }));
        E.choice(ask, { options: numOptions(s), answer: s.n }, done);
      }, 700 + s.n * 950);
    });
    go.classList.add("secondary");
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [go]));
    box.appendChild(ask);
  }

  // Still: the picture (show: dots, dice, fingers, frame, tally or an emoji) stays; say how many.
  function still(s, box, done) {
    promptLine(box, s.prompt || B.t("countPrompt"), s.say, s.audio);
    box.appendChild(el("div", { class: "flash-stage open" }, [quickPic(s.show, s.n, s.thing)]));
    box.appendChild(el("p", { class: "prompt", text: s.ask || B.t("countAsk") }));
    E.choice(box, { options: numOptions(s), answer: s.value != null ? s.value : s.n, ltr: true }, done);
  }

  // Flash: the picture shows for a moment (the child presses to see it), then a cover; say how many.
  function flash(s, box, done) {
    promptLine(box, s.prompt || B.t("flashPrompt"), s.say, s.audio);
    var ms = (typeof s.flash === "number" ? s.flash : 1600) * (B.SCENE_PACE || 1);
    var pic = quickPic(s.show || "dots", s.n, s.thing);
    var cover = el("span", { class: "flash-cover", "aria-hidden": "true", text: "؟" });
    var stage = el("div", { class: "flash-stage" }, [pic, cover]);
    box.appendChild(stage);
    var ask = el("div"), asked = false, timer = null, stay = false;
    function show() {
      clearTimeout(timer);
      stage.classList.add("open");
      if (stay) return;
      timer = setTimeout(function () {
        if (!box.isConnected || stay) return;
        stage.classList.remove("open");
        look.disabled = false;
        if (!asked) {
          asked = true;
          ask.appendChild(el("p", { class: "prompt", text: s.ask || B.t("flashAsk") }));
          E.choice(ask, { options: numOptions(s), answer: s.value != null ? s.value : s.n, ltr: true, pic: false }, done);
        }
      }, ms);
    }
    var look = E.nextBtn(B.t("flashShow"), function () {
      look.disabled = true;
      look.textContent = B.t("flashAgain");
      show();
    });
    look.classList.add("secondary");
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [look]));
    box.appendChild(ask);
    // A wrong answer shows the picture once more; after two it stays (the answer is shown too).
    var misses = 0;
    ask.addEventListener("click", function (e) {
      var b = e.target.closest(".opt");
      if (!b || !b.classList.contains("wrong") || b._seen) return;
      b._seen = true;
      misses++;
      if (misses >= 2) { stay = true; look.disabled = true; stage.classList.add("open"); }
      else { look.disabled = true; show(); }
    });
  }

  // ---------- compare by matching one to one ----------

  /* match: true. a things (thing) in a row, b things (thing2, default thing) below, spread out or bunched up
     (spread: "wide" | "tight"). The child taps each thing below and it goes under the next one above that has no
     partner; the ones left over show which group has more. Then: which has more (ask "more") or fewer ("less"),
     or the same. Optional prompt, say, big: "a" | "b" (that group's things drawn bigger: big is not more),
     names [a, b] (said for the answers). Without match the plain step (js/engine.js) compares two numbers. */
  var plainCompare = E.steps.compare;
  E.steps.compare = function (s, box, done) {
    if (!s.match) return plainCompare(s, box, done);
    var tA = s.thing, tB = s.thing2 || s.thing, pairs = Math.min(s.a, s.b), made = 0;
    promptLine(box, s.prompt || B.t("matchPrompt"), s.say, s.audio);
    var top = el("div", { class: "match-row", dir: "ltr" }), cells = [];
    for (var i = 0; i < s.a; i++) {
      var under = el("span", { class: "match-under" });
      var cell = el("span", { class: "match-cell" }, [el("span", { class: "match-thing" + (s.big === "a" ? " big" : ""), "aria-hidden": "true" }, B.art(tA)), under]);
      cell._under = under;
      cells.push(cell);
      top.appendChild(cell);
    }
    var tray = el("div", { class: "match-tray " + (s.spread || ""), dir: "ltr" });
    var bs = [];
    for (var j = 0; j < s.b; j++) {
      (function () {
        var t = el("button", { class: "match-thing tile-btn" + (s.big === "b" ? " big" : ""), type: "button", "aria-label": B.t("matchPut") }, B.art(tB));
        t.addEventListener("click", function () {
          if (t.disabled || made >= pairs) return;
          var c = cells[made++];
          c._under.appendChild(t);
          c.classList.add("paired");
          t.disabled = true;
          B.speak(B.NUMBER_WORDS[made]);
          if (made === pairs) setTimeout(ask, 700);
        });
        bs.push(t);
        tray.appendChild(t);
      })();
    }
    box.appendChild(el("div", { class: "match" }, [top, tray]));
    var q = el("div");
    box.appendChild(q);
    function ask() {
      bs.forEach(function (t) { if (!t.disabled) { t.disabled = true; t.classList.add("left"); } });
      cells.forEach(function (c) { if (!c.classList.contains("paired")) c.classList.add("left"); });
      var more = s.ask !== "less";
      var ans = s.a === s.b ? "same" : (s.a > s.b) === more ? "a" : "b";
      var names = s.names || [];
      q.appendChild(el("p", { class: "prompt", text: B.t(more ? "matchMore" : "matchLess") }));
      E.choice(q, { options: [
        { node: el("span", { class: "face pic" }, B.art(tA)), value: "a", aria: names[0] || tA },
        { node: el("span", { class: "face pic" }, B.art(tB)), value: "b", aria: names[1] || tB },
        { label: B.t("matchSame"), value: "same" }
      ], answer: ans }, done);
    }
  };

  // ---------- numline in words ----------

  /* The plain step (js/engine.js) writes the hop as a sum («۴ + ۱ = ؟»). With prompt (and say), the question is in
     words instead, for children who do not write sums yet: «قورباغه روی ۴ است. یکی جلو می‌پرد…». */
  var plainNumline = E.steps.numline;
  E.steps.numline = function (s, box, done) {
    plainNumline(s, box, done);
    if (!s.prompt) return;
    var p = box.querySelector(".prompt");
    p.textContent = s.prompt;
    p.removeAttribute("dir");
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) p.parentNode.insertBefore(sb, p.nextSibling);
  };

  // ---------- track: a number board game (Siegler & Ramani) ----------

  /* A straight track of squares 1 … to (10 or 20), left to right, each with its number. Roll the die, then move
     the pawn one square at a time by tapping the next square (each number is said as the pawn lands on it); then
     say which number you reached. To the end of the track. Fields: to (default 10), optional start (the square
     the pawn starts on, default 0: before 1), die (the faces it can show, default [1, 2, 3]), rolls (a fixed list
     of rolls, for teaching), pawn (emoji), goal (emoji at the end), prompt, say. A miss is a wrong square or a
     wrong number; after two on the same move the next square glows. */
  E.steps.track = function (s, box, done) {
    var to = s.to || 10, pos = s.start || 0, die = s.die || [1, 2, 3], rolls = (s.rolls || []).slice();
    var misses = 0, missHere = 0, left = 0, state = "roll";
    promptLine(box, s.prompt || B.t("trackPrompt"), s.say, s.audio);
    var board = el("div", { class: "track" + (to > 10 ? " long" : ""), dir: "ltr", role: "group", "aria-label": B.t("trackAria") });
    var pawn = el("span", { class: "track-pawn", "aria-hidden": "true" }, B.art(s.pawn || "🐞"));
    var squares = [el("span", { class: "track-sq track-start" }, [el("span", { class: "track-n", text: B.t("trackStart") })])];
    for (var i = 1; i <= to; i++) {
      (function (i) {
        var b = el("button", { class: "track-sq c" + (i % 5), type: "button", "aria-label": B.t("trackSquare", { n: B.fa(i) }) },
          [el("span", { class: "track-n", text: B.fa(i) })]);
        b.addEventListener("click", function () { tap(i); });
        squares.push(b);
      })(i);
    }
    squares.forEach(function (q) { board.appendChild(q); });
    board.appendChild(el("span", { class: "track-goal", "aria-hidden": "true" }, B.art(s.goal || "🏁")));
    squares[pos].appendChild(pawn);
    box.appendChild(board);
    var face = el("span", { class: "track-die" }, [quickPic("dice", 1)]);
    var roll = E.nextBtn(B.t("trackRoll"), doRoll);
    var status = el("p", { class: "prompt track-status", "aria-live": "polite" });
    box.appendChild(el("div", { class: "row track-controls", style: "justify-content:center" }, [face, roll]));
    box.appendChild(status);
    var fb = E.feedback(box);
    var ask = el("div");
    box.appendChild(ask);

    function setDie(k) { face.innerHTML = ""; face.appendChild(quickPic("dice", k)); }
    function doRoll() {
      if (state !== "roll") return;
      state = "rolling";
      roll.disabled = true;
      fb.clear();
      var k = rolls.length ? rolls.shift() : die[Math.floor(Math.random() * die.length)];
      k = Math.max(1, Math.min(k, to - pos));
      var spins = 6;
      (function spin() {
        if (!box.isConnected) return;
        if (spins-- > 0) { setDie(1 + Math.floor(Math.random() * 6)); face.classList.toggle("tilt"); setTimeout(spin, 110); return; }
        face.classList.remove("tilt");
        setDie(k);
        left = k;
        missHere = 0;
        state = "move";
        status.textContent = B.t("trackMove", { n: B.fa(k) });
        B.speak(status.textContent);
        var next = squares[pos + 1];
        if (next && document.activeElement === roll) next.focus();
      })();
    }
    function tap(i) {
      if (state === "roll") { fb.say(B.t("trackRollFirst")); return; }
      if (state !== "move") return;
      if (i !== pos + 1) {
        misses++;
        missHere++;
        E.bounce(squares[i]);
        fb.tryAgain(B.t("trackNext"));
        if (missHere >= 2) squares[pos + 1].classList.add("show");
        return;
      }
      squares[pos + 1].classList.remove("show");
      pos = i;
      squares[i].appendChild(pawn);
      squares[i].classList.add("been");
      B.speak(B.NUMBER_WORDS[i]);
      fb.clear();
      if (--left === 0) askWhere();
    }
    function askWhere() {
      state = "ask";
      var opts = pos === to ? [to - 2, to - 1, to] : pos === 1 ? [1, 2, 3] : [pos - 1, pos, pos + 1];
      ask.innerHTML = "";
      ask.appendChild(el("p", { class: "prompt", text: B.t("trackAsk") }));
      E.choice(ask, { options: E.nums(opts), answer: pos, ltr: true }, function (scored, first) {
        if (!first) misses++;
        ask.innerHTML = "";
        if (pos >= to) {
          state = "end";
          status.textContent = B.t("trackEnd");
          B.speak(status.textContent);
          setTimeout(function () { done(true, misses === 0); }, 1500);
          return;
        }
        state = "roll";
        status.textContent = B.t("trackAgain");
        roll.disabled = false;
        roll.focus();
      });
    }
    status.textContent = B.t("trackFirst");
  };

  // ---------- tangram: fill an outline with shapes ----------

  /* slots [{ shape, at: [x, y], r, s, color }]: the outline, in a board of view [w, h] (default [100, 80]); shapes
     are square, rect, tri (a roof), rtri (half a square), circle, semi (half a circle); r turns a slot (degrees),
     s makes it bigger. The pieces are one for each slot, plus extra [{ shape, s }] that do not fit, all upright
     at first. The child picks a piece, turns it (↻, by turn degrees, default 90) and taps its place (or drags it
     there). Optional prompt, say, pic and made (the picture and the words at the end: «یک خانه ساختی!»). */
  var TAN = {
    square: { d: "M-10-10h20v20h-20z", sym: 90, color: "#f6b73c" },
    rect: { d: "M-16-7h32v14h-32z", sym: 180, color: "#5b9bd5" },
    tri: { d: "M-15 7.5L0-7.5 15 7.5z", sym: 360, color: "#e5483f" },
    rtri: { d: "M-10 10V-10L10 10z", sym: 360, color: "#9b6ad0" },
    circle: { d: "M-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0z", sym: 1, color: "#5a9a45" },
    semi: { d: "M-12 5a12 12 0 0 1 24 0z", sym: 360, color: "#f28baa" }
  };
  function tanPath(shape, sc, r, color, cls) {
    var p = svgEl("path", { d: TAN[shape].d, class: cls || "", transform: "rotate(" + (r || 0) + ") scale(" + (sc || 1) + ")" });
    if (color) p.setAttribute("fill", color);
    return p;
  }
  function sameTurn(shape, a, b) { var k = TAN[shape].sym; return (((a - b) % k) + k) % k === 0; }
  E.steps.tangram = function (s, box, done) {
    promptLine(box, s.prompt || B.t("tanPrompt"), s.say, s.audio);
    var view = s.view || [100, 80], misses = 0, picked = null, turnBy = s.turn || 90;
    var svg = svgEl("svg", { class: "tan-board", viewBox: "0 0 " + view.join(" "), role: "group", "aria-label": B.t("tanBoard") });
    var slots = s.slots.map(function (sl, i) {
      var g = svgEl("g", { class: "tan-slot", transform: "translate(" + sl.at.join(" ") + ")", "data-drop": "" });
      g.appendChild(tanPath(sl.shape, sl.s, sl.r, null, "tan-hole"));
      g._sl = sl;
      pressable(g, B.t("tanSlot", { n: B.fa(i + 1) }), function () {
        if (!picked) { fb.say(B.t("tanPickFirst")); return; }
        place(picked, g);
      });
      svg.appendChild(g);
      return g;
    });
    box.appendChild(el("div", { class: "tan-stage" }, [svg]));
    var made = el("p", { class: "tan-made", "aria-hidden": "true" });
    box.appendChild(made);
    var tray = el("div", { class: "tray tan-tray" });
    var list = s.slots.map(function (sl) { return { shape: sl.shape, s: sl.s || 1, color: sl.color }; })
      .concat((s.extra || []).map(function (x) { return { shape: x.shape, s: x.s || 1, color: x.color }; }));
    var pieces = shuffle(list).map(function (pc) {
      pc.r = 0;
      var mini = svgEl("svg", { viewBox: "-20 -20 40 40", class: "tan-piece-pic", "aria-hidden": "true" });
      var b = el("button", { class: "tile-btn tan-piece", type: "button", "aria-label": B.T.shapeNames[pc.shape] || pc.shape, "aria-pressed": "false" }, [mini]);
      b._pc = pc;
      b._miss = 0;
      b._draw = function () {
        mini.innerHTML = "";
        // Pieces in the tray are drawn the same size, whatever their size on the board.
        mini.appendChild(tanPath(pc.shape, Math.min(1, 1.15 / pc.s) * pc.s, pc.r, pc.color || TAN[pc.shape].color, "tan-fill"));
      };
      b._draw();
      b.addEventListener("click", function () {
        if (b.disabled) return;
        if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
        picked = picked === b ? null : b;
        if (picked) { b.classList.add("picked"); b.setAttribute("aria-pressed", "true"); fb.say(B.t("tanNow")); }
      });
      E.draggable(b, function (t) { var g = t.closest(".tan-slot"); if (g) { picked = b; place(b, g); } });
      tray.appendChild(b);
      return b;
    });
    var turn = E.nextBtn(B.t("tanTurn"), function () {
      if (!picked) { fb.say(B.t("tanPickFirst")); return; }
      picked._pc.r = (picked._pc.r + turnBy) % 360;
      picked._draw();
    });
    turn.classList.add("secondary");
    box.appendChild(tray);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [turn]));
    var fb = E.feedback(box);
    var left = s.slots.length;

    function place(b, g) {
      if (!b || b.disabled || g._filled) return;
      var pc = b._pc, sl = g._sl;
      if (pc.shape !== sl.shape || pc.s !== (sl.s || 1)) {
        misses++;
        b._miss++;
        E.bounce(b);
        fb.tryAgain(B.t("tanWrong"));
        if (b._miss >= 2) slots.forEach(function (x) { if (!x._filled && x._sl.shape === pc.shape && (x._sl.s || 1) === pc.s) x.classList.add("show"); });
        return;
      }
      if (!sameTurn(pc.shape, pc.r, sl.r || 0)) {
        misses++;
        b._miss++;
        E.bounce(b);
        fb.tryAgain(B.t("tanTurnIt"));
        if (b._miss >= 2) { pc.r = ((sl.r || 0) % 360 + 360) % 360; b._draw(); fb.say(B.t("tanTurned")); }
        return;
      }
      g._filled = true;
      g.classList.remove("show");
      g.classList.add("filled");
      g.appendChild(tanPath(sl.shape, sl.s, sl.r, sl.color || pc.color || TAN[sl.shape].color, "tan-fill"));
      g.removeAttribute("tabindex");
      b.disabled = true;
      b.classList.remove("picked");
      b.classList.add("used");
      picked = null;
      slots.forEach(function (x) { x.classList.remove("show"); });
      if (--left) { fb.good(); return; }
      pieces.forEach(function (x) { x.disabled = true; });
      turn.disabled = true;
      if (s.pic) B.setArt(made, s.pic);
      var t = fb.good(s.made);
      B.speak(t);
      setTimeout(function () { done(true, misses === 0); }, 1600);
    }
  };
})();
