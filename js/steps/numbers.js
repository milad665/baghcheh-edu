/* باغچه — number steps for ریاضی (math), shared with علوم and ایران و جهان.
   - fraction: cut a shape (a sangak, a cake, a bar) into equal parts and colour some, name a part, pick the shape cut
     into equal parts, or share a set of things (sweets, walnuts) equally between children.
   - chart: read a picture graph (or a bar chart), build one from a pile of pictures, or add to one.
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
})();
