/* باغچه — more step types for «فکر و برنامه‌نویسی» (the block-coding game and the screen-free game are in
   js/steps/coding.js).

   pixels: a picture on a screen is made of small squares, and each square's colour is kept as a number.
     colors: the palette, by number (0, 1, 2…), e.g. ["#ffffff", "#2b2b2b", "#e03131"]; names (optional): the
       colours' names, said and shown on the palette buttons.
     pic: the picture's code, one string of digits per row, top to bottom, e.g. ["0110", "1111", "0110"]. Rows are
       read left to right, like numbers.
     mode "paint" (the default): the code is shown as a grid of numbers beside an empty grid; the child picks a
       colour and taps squares to paint them, then presses «ببین درست شد؟». Right on the first try when the first
       check is right. After two checks that miss, the wrong squares are marked. Optional done: [row, …] rows
       already painted.
     mode "read": the picture is shown in colour with one row marked (row: its number from the top, from 0);
       the child picks that row's code from options (strings of digits, like pic's rows; the answer is the row).
     prompt, say. */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  function digits(code) { return code.split("").map(Number); }
  // White numbers on dark squares, dark ones on light squares.
  function inkOn(col) {
    var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(col || "");
    if (!m) return "";
    var l = 0.299 * parseInt(m[1], 16) + 0.587 * parseInt(m[2], 16) + 0.114 * parseInt(m[3], 16);
    return l < 120 ? "color:#fff;" : "";
  }

  // A grid of squares, `rows` arrays of colour numbers (null = empty), drawn left to right whatever the page's
  // direction. Each square is a span, or a button when onTap is given.
  function pixelGrid(rows, colors, opts) {
    opts = opts || {};
    var cols = rows[0].length;
    var grid = el("div", { class: "px-grid" + (opts.numbers ? " numbers" : ""), dir: "ltr", role: opts.onTap ? "group" : "img",
      "aria-label": opts.label || "" });
    grid.style.setProperty("--cols", cols);
    var cells = [];
    rows.forEach(function (row, y) {
      row.forEach(function (v, x) {
        var c = el(opts.onTap ? "button" : "span", { class: "px-cell" });
        if (opts.onTap) {
          c.type = "button";
          c.setAttribute("aria-label", B.t("pxCellAria", { row: B.fa(y + 1), col: B.fa(x + 1) }));
          c.addEventListener("click", function () { opts.onTap(x, y, c); });
        }
        if (opts.numbers) c.textContent = B.fa(v);
        else if (v != null) c.style.background = colors[v];
        if (opts.mark === y) c.classList.add("marked");
        cells.push(c);
        grid.appendChild(c);
      });
    });
    grid.cells = cells;
    return grid;
  }

  /* mode "rgb": a screen mixes red, green and blue light. target: [r, g, b] (each 0 to 255, in steps of 51); the child
     turns each light up or down until the two squares match. */
  function rgb(s, root, done) {
    var v = [0, 0, 0], step = 51, names = ["pxRed", "pxGreen", "pxBlue"], tries = 0;
    var mine = el("span", { class: "px-swatch big" }), want = el("span", { class: "px-swatch big", style: "background:rgb(" + s.target.join(",") + ")" });
    root.appendChild(el("div", { class: "px-pair" }, [el("figure", null, [want, el("figcaption", { text: B.t("pxTarget") })]), el("figure", null, [mine, el("figcaption", { text: B.t("pxMine") })])]));
    var nums = [];
    var rows = el("div", { class: "px-rgb", dir: "ltr" });
    [0, 1, 2].forEach(function (i) {
      var n = el("b", { class: "px-num" });
      nums.push(n);
      var minus = el("button", { class: "btn quiet", type: "button", text: "−", "aria-label": B.t("pxLess", { c: B.t(names[i]) }) });
      var plus = el("button", { class: "btn quiet", type: "button", text: "+", "aria-label": B.t("pxMore", { c: B.t(names[i]) }) });
      minus.addEventListener("click", function () { v[i] = Math.max(0, v[i] - step); paint(); });
      plus.addEventListener("click", function () { v[i] = Math.min(255, v[i] + step); paint(); });
      rows.appendChild(el("div", { class: "px-rgb-row c" + i }, [el("span", { class: "px-rgb-name", text: B.t(names[i]) }), minus, n, plus]));
    });
    root.appendChild(rows);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    function paint() { mine.style.background = "rgb(" + v.join(",") + ")"; nums.forEach(function (n, i) { n.textContent = B.fa(v[i]); }); fb.textContent = ""; }
    root.appendChild(fb);
    var check = E.nextBtn(B.t("pxCheck"), function () {
      tries++;
      if (v.every(function (x, i) { return x === s.target[i]; })) {
        check.disabled = true;
        fb.className = "feedback good";
        fb.textContent = B.t("pxRgbRight", { r: B.fa(v[0]), g: B.fa(v[1]), b: B.fa(v[2]) }) + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, tries === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = B.t("pxRgbWrong");
    });
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [check]));
    paint();
  }

  E.steps.pixels = function (s, box, done) {
    var colors = s.colors || [], names = s.names || [];
    var code = (s.pic || []).map(digits);
    var root = el("div", { class: "px-game" });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt || B.t(s.mode === "read" ? "pxReadPrompt" : "pxPaintPrompt") }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);

    if (s.mode === "rgb") return rgb(s, root, done);
    if (s.mode === "read") {
      root.appendChild(el("div", { class: "px-pair" }, [pixelGrid(code, colors, { mark: s.row, label: B.t("pxPictureAria") })]));
      // The palette as a key: which number is which colour.
      root.appendChild(key(false));
      var opts = s.options.map(function (o) {
        var row = el("span", { class: "px-row", dir: "ltr" });
        digits(o).forEach(function (v) { row.appendChild(el("span", { class: "px-cell", style: inkOn(colors[v]) + "background:" + colors[v], text: B.fa(v) })); });
        return { node: row, value: o, aria: B.fa(o.split("").join(" ")) };
      });
      E.choice(root, { options: opts, answer: s.pic[s.row], stack: true }, done);
      return;
    }

    // ---------- Painting by the code ----------
    var paint = code.map(function (row, y) {
      return row.map(function (v) { return (s.done || []).indexOf(y) !== -1 ? v : 0; });
    });
    var current = 1;
    var picture = pixelGrid(paint, colors, { onTap: tap, label: B.t("pxPaintAria") });
    var numbers = pixelGrid(code, colors, { numbers: true, label: B.t("pxCodeAria") });
    root.appendChild(el("div", { class: "px-pair", dir: "ltr" }, [
      el("figure", null, [numbers, el("figcaption", { text: B.t("pxCode") })]),
      el("figure", null, [picture, el("figcaption", { text: B.t("pxPicture") })])
    ]));
    picture.cells.forEach(function (c, i) { c.style.background = colors[paint[Math.floor(i / code[0].length)][i % code[0].length]]; });
    var palette = key(true);
    root.appendChild(palette);

    function tap(x, y, c) {
      paint[y][x] = paint[y][x] === current && current !== 0 ? 0 : current;
      c.style.background = colors[paint[y][x]];
      c.classList.remove("bad");
      fb.className = "feedback";
      fb.textContent = "";
    }
    function key(pickable) {
      var row = el("div", { class: "px-palette", role: pickable ? "radiogroup" : null, "aria-label": B.t("pxPaletteAria") });
      colors.forEach(function (col, i) {
        var label = [el("span", { class: "px-swatch", style: "background:" + col }), el("b", { text: B.fa(i) })];
        if (names[i]) label.push(el("small", { text: names[i] }));
        if (!pickable) { row.appendChild(el("span", { class: "px-key" }, label)); return; }
        var b = el("button", { class: "px-key", type: "button", role: "radio", "aria-checked": i === current ? "true" : "false",
          "aria-label": B.t("pxColourAria", { n: B.fa(i), name: names[i] || "" }) }, label);
        b.addEventListener("click", function () {
          current = i;
          row.querySelectorAll(".px-key").forEach(function (k, j) { k.setAttribute("aria-checked", j === i ? "true" : "false"); });
          if (names[i]) B.speak(B.fa(i) + "، " + names[i]);
        });
        row.appendChild(b);
      });
      return row;
    }

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);
    var checks = 0;
    var check = E.nextBtn(B.t("pxCheck"), function () {
      checks++;
      var bad = [];
      code.forEach(function (row, y) { row.forEach(function (v, x) { if (paint[y][x] !== v) bad.push(y * row.length + x); }); });
      if (!bad.length) {
        check.disabled = true;
        picture.cells.forEach(function (c) { c.disabled = true; });
        root.querySelectorAll(".px-palette button").forEach(function (b) { b.disabled = true; });
        picture.classList.add("px-done");
        fb.className = "feedback good";
        fb.textContent = B.t("pxRight") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, checks === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = B.t("pxWrong", { n: B.fa(bad.length) });
      // After two checks that miss, show which squares are wrong.
      if (checks >= 2) bad.forEach(function (i) { picture.cells[i].classList.add("bad"); });
      B.speak(fb.textContent);
    });
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [check]));
  };
})();

/* binary: dot cards, each with twice the dots of the one on its right (… 16, 8, 4, 2, 1), face up (1) or face down (0).
     cards: how many (default 5). mode "make" (the default): flip cards to show target; "read": the cards show bits
     (a string such as "10110", left to right) and the child picks the number from options. Optional bits: true
     shows 1 or 0 under each card; sum: true shows the total as the child flips. prompt, say. Scored. */
(function () {
  var el = B.el, E = B.engine;
  function dots(v) {
    var d = el("span", { class: "bn-dots" + (v > 16 ? " many" : ""), "aria-hidden": "true" });
    if (v > 32) { d.textContent = B.fa(v); return d; }
    for (var i = 0; i < v; i++) d.appendChild(el("i"));
    return d;
  }
  E.steps.binary = function (s, box, done) {
    var n = s.cards || 5, vals = [];
    for (var i = n - 1; i >= 0; i--) vals.push(Math.pow(2, i));
    var on = vals.map(function (v, i) { return s.mode === "read" ? s.bits.charAt(i) === "1" : false; });
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var row = el("div", { class: "bn-row", dir: "ltr" });
    var sum = el("p", { class: "bn-sum", "aria-live": "polite" });
    var cards = vals.map(function (v, i) {
      var c = el(s.mode === "read" ? "span" : "button", { class: "bn-card", type: s.mode === "read" ? null : "button" }, [dots(v), el("small", { class: "bn-val", text: B.fa(v) })]);
      var bit = el("span", { class: "bn-bit" });
      function show() {
        c.classList.toggle("down", !on[i]);
        c.setAttribute("aria-label", B.t(on[i] ? "bnUp" : "bnDown", { n: B.fa(v) }));
        bit.textContent = s.bits || s.mode === "read" ? B.fa(on[i] ? 1 : 0) : "";
      }
      if (s.mode !== "read") c.addEventListener("click", function () { if (c.disabled) return; on[i] = !on[i]; show(); total(); fb.textContent = ""; fb.className = "feedback"; });
      show();
      row.appendChild(el("span", { class: "bn-slot" }, [c, bit]));
      return c;
    });
    box.appendChild(row);
    function value() { return vals.reduce(function (t, v, i) { return t + (on[i] ? v : 0); }, 0); }
    function total() { if (s.sum) sum.textContent = B.t("bnSum", { n: B.fa(value()) }); }
    box.appendChild(sum);
    total();
    if (s.mode === "read") {
      E.choice(box, { options: s.options.map(function (o) { return { label: B.fa(o), value: o }; }), answer: parseInt(s.bits, 2) }, done);
      return;
    }
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    var tries = 0;
    var check = E.nextBtn(B.t("pxCheck"), function () {
      tries++;
      if (value() === s.target) {
        check.disabled = true;
        cards.forEach(function (c) { c.disabled = true; });
        fb.className = "feedback good";
        fb.textContent = B.t("bnRight", { n: B.fa(s.target) }) + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, tries === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = B.t(value() > s.target ? "bnTooMany" : "bnTooFew", { n: B.fa(value()) });
      if (tries >= 2) fb.textContent += " " + B.t("bnHint");
      B.speak(fb.textContent);
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [check]));
  };
})();

/* logicgrid: a logic-grid puzzle or a small sudoku.
     Logic grid: rows and cols ([{ pic, label }]), clues (lines of text), answer (for each row, the column that goes
       with it), optional given ([[row, col, "x" | "v"], …] marks already made). Tapping a square cycles: empty, ✗, ✓.
     Sudoku: sudoku: ["1 . . 4", …] (rows; "." empty), the solution as rows of digits. Tapping an empty square
       cycles through 1 to the size. prompt, say. Checked with «ببین درست شد؟». Scored. */
(function () {
  var el = B.el, E = B.engine;
  E.steps.logicgrid = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    if (s.clues) box.appendChild(el("ol", { class: "lg-clues" }, s.clues.map(function (c) { return el("li", { text: c }); })));
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var check, isRight, cells = [];
    if (s.sudoku) {
      var grid0 = s.sudoku.map(function (r) { return r.split(" "); }), size = grid0.length;
      var table = el("div", { class: "lg-sudoku", dir: "ltr" });
      table.style.setProperty("--n", size);
      var bw = size === 6 ? 3 : 2, bh = 2;
      grid0.forEach(function (row, r) {
        row.forEach(function (v, c) {
          var fixed = v !== ".";
          var cell = el(fixed ? "span" : "button", { class: "lg-cell" + (fixed ? " fixed" : ""), type: fixed ? null : "button", text: fixed ? B.fa(v) : "" });
          if ((c + 1) % bw === 0 && c < size - 1) cell.classList.add("edge-r");
          if ((r + 1) % bh === 0 && r < size - 1) cell.classList.add("edge-b");
          cell._v = fixed ? +v : 0;
          if (!fixed) {
            cell.setAttribute("aria-label", B.t("lgSquare", { r: B.fa(r + 1), c: B.fa(c + 1) }));
            cell.addEventListener("click", function () {
              if (cell.disabled) return;
              cell._v = (cell._v % size) + 1;
              cell.textContent = B.fa(cell._v);
              cell.classList.remove("bad");
            });
          }
          cell._want = +s.solution[r].replace(/ /g, "").charAt(c);
          cells.push(cell);
          table.appendChild(cell);
        });
      });
      box.appendChild(table);
      isRight = function () { return cells.filter(function (c) { return c._v !== c._want; }); };
    } else {
      var t = el("table", { class: "lg-table" });
      var head = el("tr", null, [el("th")].concat(s.cols.map(function (c) { return el("th", null, [B.setArt(el("span", { class: "lg-pic" }), c.pic), c.label ? el("small", { text: c.label }) : null]); })));
      t.appendChild(head);
      s.rows.forEach(function (rw, r) {
        var tr = el("tr", null, [el("th", null, [B.setArt(el("span", { class: "lg-pic" }), rw.pic), rw.label ? el("small", { text: rw.label }) : null])]);
        s.cols.forEach(function (cl, c) {
          var b = el("button", { class: "lg-mark", type: "button" });
          b._m = "";
          (s.given || []).forEach(function (g) { if (g[0] === r && g[1] === c) b._m = g[2]; });
          function show() {
            b.textContent = b._m === "x" ? "✗" : b._m === "v" ? "✓" : "";
            b.className = "lg-mark" + (b._m ? " " + b._m : "");
            b.setAttribute("aria-label", B.t("lgMark", { row: rw.label || rw.pic, col: cl.label || cl.pic, mark: B.t(b._m === "x" ? "lgNo" : b._m === "v" ? "lgYes" : "lgEmpty") }));
          }
          b.addEventListener("click", function () { if (b.disabled) return; b._m = b._m === "" ? "x" : b._m === "x" ? "v" : ""; show(); fb.textContent = ""; });
          show();
          b._r = r; b._c = c;
          cells.push(b);
          tr.appendChild(el("td", null, [b]));
        });
        t.appendChild(tr);
      });
      box.appendChild(el("div", { class: "lg-wrap" }, [t]));
      isRight = function () {
        return cells.filter(function (b) { var want = s.answer[b._r] === b._c; return want ? b._m !== "v" : b._m === "v"; });
      };
    }
    box.appendChild(fb);
    var tries = 0;
    check = E.nextBtn(B.t("pxCheck"), function () {
      tries++;
      var bad = isRight();
      cells.forEach(function (c) { c.classList.remove("bad"); });
      if (!bad.length) {
        check.disabled = true;
        cells.forEach(function (c) { c.disabled = true; });
        fb.className = "feedback good";
        fb.textContent = B.t("lgRight") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, tries === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = B.t(s.sudoku ? "lgSudokuWrong" : "lgWrong");
      if (tries >= 2) bad.forEach(function (c) { c.classList.add("bad"); });
      B.speak(fb.textContent);
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [check]));
  };
})();

/* flowchart: a flowchart drawn top to bottom: nodes [{ id, kind: "start" | "do" | "ask" | "end", text, next, yes, no }]
     (next, yes and no name other nodes; without next, a node goes on to the one after it in the list; an ask node's
     yes goes on, its no goes back up or elsewhere).
     mode "follow" (the default): a marker walks through it; at each question the child picks the way to go, by the
       facts given in visits ([{ answer: "yes" | "no", fact }, …], one per question reached, in order). Scored: right
       the first time when no way was picked wrong.
     mode "fill": the nodes with blank: true are empty; the child taps one, then the right text from options. Scored. */
(function () {
  var el = B.el, E = B.engine;
  E.steps.flowchart = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var byId = {}, nodes = {};
    s.nodes.forEach(function (n, i) { byId[n.id] = n; n._i = i; });
    function nextOf(n) { return n.next || (s.nodes[n._i + 1] || {}).id; }
    var chart = el("div", { class: "fc-chart" });
    s.nodes.forEach(function (n, i) {
      var shape = el("div", { class: "fc-node fc-" + n.kind + (n.blank ? " blank" : "") }, [el("span", { class: "fc-text", text: n.blank ? "" : n.text })]);
      nodes[n.id] = shape;
      var wrap = el("div", { class: "fc-step" }, [shape]);
      if (n.kind === "ask") {
        var noTo = byId[n.no];
        wrap.appendChild(el("p", { class: "fc-no" }, [el("b", { text: B.t("fcNo") }), " ↩ " + (n.no === n.id ? B.t("fcWaitAsk")
          : B.t("fcBackTo", { what: noTo ? (noTo.blank ? "…" : noTo.text) : "" }))]));
      }
      chart.appendChild(wrap);
      if (i < s.nodes.length - 1 && n.kind !== "end") chart.appendChild(el("div", { class: "fc-arrow", "aria-hidden": "true" }, [n.kind === "ask" ? el("b", { text: B.t("fcYes") }) : "", "↓"]));
    });
    box.appendChild(chart);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var misses = 0;

    if (s.mode === "fill") {
      var picked = null, filled = {};
      var opts = el("div", { class: "options" });
      s.nodes.forEach(function (n) {
        if (!n.blank) return;
        var sh = nodes[n.id];
        sh.setAttribute("role", "button");
        sh.tabIndex = 0;
        sh.setAttribute("aria-label", B.t("fcBlank"));
        function pick() { picked = n.id; s.nodes.forEach(function (m) { if (m.blank) nodes[m.id].classList.toggle("on", m.id === picked); }); }
        sh.addEventListener("click", pick);
        sh.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
      });
      var first = s.nodes.filter(function (n) { return n.blank; })[0];
      if (first) { picked = first.id; nodes[first.id].classList.add("on"); }
      s.options.forEach(function (o) {
        var b = el("button", { class: "opt", type: "button", text: o });
        b.addEventListener("click", function () {
          if (!picked || b.disabled) return;
          var n = byId[picked];
          if (o === n.text) {
            filled[picked] = true;
            nodes[picked].classList.remove("on");
            nodes[picked].classList.add("filled");
            nodes[picked].querySelector(".fc-text").textContent = o;
            b.disabled = true;
            b.classList.add("correct");
            var left = s.nodes.filter(function (m) { return m.blank && !filled[m.id]; });
            if (!left.length) {
              fb.className = "feedback good";
              fb.textContent = E.pick(B.T.praise);
              B.speak(fb.textContent);
              setTimeout(function () { done(true, misses === 0); }, 1200);
              return;
            }
            picked = left[0].id;
            nodes[picked].classList.add("on");
            fb.textContent = "";
          } else {
            misses++;
            fb.className = "feedback try";
            fb.textContent = E.pick(B.T.retry);
            b.classList.add("wrong");
            setTimeout(function () { b.classList.remove("wrong"); }, 700);
          }
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      box.appendChild(fb);
      return;
    }

    // ---------- Following it ----------
    var at = s.nodes[0].id, visit = 0;
    var fact = el("p", { class: "fc-fact", "aria-live": "polite" });
    var ctl = el("div", { class: "row", style: "justify-content:center" });
    box.appendChild(fact);
    box.appendChild(ctl);
    box.appendChild(fb);
    function show() {
      Object.keys(nodes).forEach(function (k) { nodes[k].classList.toggle("now", k === at); });
      nodes[at].scrollIntoView && nodes[at].scrollIntoView({ block: "nearest", behavior: B.reducedMotion && B.reducedMotion() ? "auto" : "smooth" });
      var n = byId[at];
      ctl.innerHTML = "";
      fact.textContent = "";
      if (n.kind === "end") {
        fb.className = "feedback good";
        fb.textContent = B.t("fcDone") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        ctl.appendChild(E.nextBtn(null, function () { done(true, misses === 0); }));
        return;
      }
      if (n.kind === "ask") {
        var v = (s.visits || [])[visit] || { answer: "yes" };
        fact.textContent = v.fact || "";
        if (v.fact) B.speak(n.text + " " + v.fact);
        ["yes", "no"].forEach(function (a) {
          var b = el("button", { class: "btn secondary", type: "button", text: B.t(a === "yes" ? "fcYes" : "fcNo") });
          b.addEventListener("click", function () {
            if (a !== v.answer) {
              misses++;
              fb.className = "feedback try";
              fb.textContent = B.t("fcLookAgain");
              B.speak(fb.textContent);
              return;
            }
            fb.textContent = "";
            visit++;
            at = a === "yes" ? (n.yes || nextOf(n)) : n.no;
            show();
          });
          ctl.appendChild(b);
        });
        return;
      }
      B.speak(n.text);
      ctl.appendChild(E.nextBtn(B.t("fcNext"), function () { at = nextOf(n); show(); }));
    }
    show();
  };
})();

/* turtle: a pen character draws as it moves. Blocks: «جلو» by a length, «به راست بچرخ» / «به چپ بچرخ» by an angle
     (tap the number on a block to change it), «قلم بالا» / «قلم پایین», and «تکرار» round other blocks.
     goal: a program in the same form whose drawing is shown faint, to copy (e.g. [{ repeat: 4, body: [["fd", 60],
       ["rt", 90]] }]); lengths and angles: the numbers a block can take (defaults below); max: most blocks;
     given: a program to start from; start: [x, y] on the 200 × 200 paper (default [70, 150]), heading up.
     Right when the drawn lines are exactly the goal's lines (in any order or direction). prompt, say. Scored. */
(function () {
  var el = B.el, E = B.engine, NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, a) { var e = document.createElementNS(NS, tag); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  function parse(list) {
    return (list || []).map(function (b) {
      if (Array.isArray(b)) return { op: b[0], arg: b[1] };
      if (typeof b === "string") return { op: b };
      return { op: "repeat", n: b.repeat, body: parse(b.body) };
    });
  }
  // The lines a program draws, each as "x1,y1,x2,y2" with the ends in a fixed order, rounded.
  function trace(prog, start) {
    var x = start[0], y = start[1], h = 0, pen = true, segs = [], steps = 0;
    (function run(list) {
      list.forEach(function (b) {
        if (steps > 400) return;
        if (b.op === "repeat") { for (var k = 0; k < b.n; k++) run(b.body); return; }
        steps++;
        if (b.op === "fd") {
          var nx = x + b.arg * Math.sin(h * Math.PI / 180), ny = y - b.arg * Math.cos(h * Math.PI / 180);
          if (pen) segs.push([x, y, nx, ny]);
          x = nx; y = ny;
        } else if (b.op === "rt") h += b.arg;
        else if (b.op === "lt") h -= b.arg;
        else if (b.op === "up") pen = false;
        else if (b.op === "down") pen = true;
      });
    })(prog);
    return segs;
  }
  function key(sg) {
    var r = function (v) { return Math.round(v); };
    var a = r(sg[0]) + "," + r(sg[1]), b = r(sg[2]) + "," + r(sg[3]);
    return a < b ? a + "|" + b : b + "|" + a;
  }
  function keys(segs) { var o = {}; segs.forEach(function (sg) { if (Math.hypot(sg[2] - sg[0], sg[3] - sg[1]) > 0.5) o[key(sg)] = true; }); return o; }

  E.steps.turtle = function (s, box, done) {
    var lengths = s.lengths || [20, 30, 40, 60, 80], angles = s.angles || [30, 45, 60, 72, 90, 120, 144];
    var start = s.start || [70, 150];
    var root = el("div", { class: "tt-game" });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);
    var svg = svgEl("svg", { viewBox: "0 0 200 200", class: "tt-paper", role: "img", "aria-label": B.t("ttPaperAria") });
    var goalG = svgEl("g", { class: "tt-goal" }), inkG = svgEl("g", { class: "tt-ink" });
    var goalSegs = s.goal ? trace(parse(s.goal), start) : [];
    goalSegs.forEach(function (sg) { goalG.appendChild(svgEl("line", { x1: sg[0], y1: sg[1], x2: sg[2], y2: sg[3] })); });
    var turtle = svgEl("g", { class: "tt-turtle" });
    turtle.innerHTML = '<circle r="7" fill="#7cc457" stroke="#3d2c22" stroke-width="1.2"/><circle cy="-9" r="3.4" fill="#7cc457" stroke="#3d2c22" stroke-width="1.2"/>' +
      '<path d="M-2.6-2.4l2.6-4 2.6 4z" fill="#3d2c22"/>';
    svg.appendChild(goalG); svg.appendChild(inkG); svg.appendChild(turtle);
    root.appendChild(el("div", { class: "tt-wrap" }, [svg]));
    function put(x, y, h) { turtle.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + h + ")"); }
    put(start[0], start[1], 0);

    // ---------- The program: a column of blocks; a repeat holds blocks inside it ----------
    var program = parse(s.given), target = program;
    var list = el("div", { class: "tt-program", role: "group", "aria-label": B.t("codeProgramAria") });
    root.appendChild(list);
    var countP = s.max ? el("p", { class: "hint" }) : null;
    if (countP) root.appendChild(countP);
    function count(l) { return l.reduce(function (n, b) { return n + 1 + (b.body ? count(b.body) : 0); }, 0); }
    var NAMES = { fd: "ttForward", rt: "ttRight", lt: "ttLeft", up: "ttPenUp", down: "ttPenDown", repeat: "codeRepeat" };
    var GLYPH = { fd: "⬆", rt: "↻", lt: "↺", up: "✏️⤴", down: "✏️⤵", repeat: "🔁" };
    function cycle(arr, v) { var i = arr.indexOf(v); return arr[(i + 1) % arr.length]; }
    function render() {
      list.innerHTML = "";
      (function draw(l, into, depth) {
        l.forEach(function (b, i) {
          var row = el("div", { class: "tt-block op-" + b.op });
          var name = el("button", { class: "tt-name", type: "button", "aria-label": B.t("codeBlockAria", { name: B.t(NAMES[b.op]) }) },
            [el("span", { "aria-hidden": "true", text: GLYPH[b.op] + " " }), B.t(NAMES[b.op])]);
          name.addEventListener("click", function () { if (busy) return; l.splice(i, 1); if (target === b.body) target = program; render(); });
          row.appendChild(name);
          if (b.op === "fd" || b.op === "rt" || b.op === "lt" || b.op === "repeat") {
            var chip = el("button", { class: "tt-chip", type: "button" });
            var show = function () {
              chip.textContent = b.op === "repeat" ? B.t("codeTimes", { n: B.fa(b.n) }) : b.op === "fd" ? B.fa(b.arg) : B.fa(b.arg) + "°";
              chip.setAttribute("aria-label", B.t("ttChange", { v: chip.textContent }));
            };
            chip.addEventListener("click", function () {
              if (busy) return;
              if (b.op === "repeat") b.n = b.n >= 9 ? 2 : b.n + 1;
              else if (b.op === "fd") b.arg = cycle(lengths, b.arg);
              else b.arg = cycle(angles, b.arg);
              show();
            });
            show();
            row.appendChild(chip);
          }
          into.appendChild(row);
          if (b.op === "repeat") {
            var inner = el("div", { class: "tt-inner" + (target === b.body ? " on" : "") });
            var pickIn = el("button", { class: "tt-target" + (target === b.body ? " on" : ""), type: "button", text: target === b.body ? B.t("ttAddingHere") : B.t("ttAddHere") });
            pickIn.addEventListener("click", function () { target = b.body; render(); });
            row.appendChild(pickIn);
            draw(b.body, inner, depth + 1);
            into.appendChild(inner);
          }
        });
      })(program, list, 0);
      var pickMain = el("button", { class: "tt-target" + (target === program ? " on" : ""), type: "button", text: target === program ? B.t("ttAddingHere") : B.t("ttAddEnd") });
      pickMain.addEventListener("click", function () { target = program; render(); });
      list.appendChild(pickMain);
      if (countP) countP.textContent = B.t("codeUsed", { used: B.fa(count(program)), max: B.fa(s.max) });
      fb.textContent = "";
      fb.className = "feedback";
    }

    var palette = el("div", { class: "code-palette tt-palette", role: "group", "aria-label": B.t("codePaletteAria") });
    (s.blocks || ["fd", "rt", "lt", "repeat"]).forEach(function (op) {
      var b = el("button", { class: "tt-pal op-" + op, type: "button", text: GLYPH[op] + " " + B.t(NAMES[op]) });
      b.addEventListener("click", function () {
        if (busy) return;
        if (s.max && count(program) + 1 > s.max) { fb.className = "feedback try"; fb.textContent = B.t("codeFullRepeat"); return; }
        var nb = op === "repeat" ? { op: "repeat", n: 4, body: [] } : op === "fd" ? { op: "fd", arg: lengths[Math.min(2, lengths.length - 1)] }
          : op === "rt" || op === "lt" ? { op: op, arg: 90 } : { op: op };
        target.push(nb);
        if (op === "repeat") target = nb.body;
        render();
      });
      palette.appendChild(b);
    });
    root.appendChild(palette);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);
    var busy = false, tries = 0, misses = 0;
    var runBtn = E.nextBtn(B.t("codeRun"), function () {
      if (busy || !count(program)) return;
      tries++;
      busy = true;
      runBtn.disabled = true;
      inkG.innerHTML = "";
      var segs = trace(program, start), i = 0, wait = B.reducedMotion && B.reducedMotion() ? 0 : 260;
      // Walks the moves again, drawing each line as the turtle gets to it.
      var x = start[0], y = start[1], h = 0, moves = [];
      (function run(l) { l.forEach(function (b) { if (moves.length > 400) return; if (b.op === "repeat") { for (var k = 0; k < b.n; k++) run(b.body); } else moves.push(b); }); })(program);
      var pen = true;
      (function step() {
        if (!root.isConnected) return;
        if (i >= moves.length) return judge(segs);
        var b = moves[i++];
        if (b.op === "fd") {
          var nx = x + b.arg * Math.sin(h * Math.PI / 180), ny = y - b.arg * Math.cos(h * Math.PI / 180);
          if (pen) inkG.appendChild(svgEl("line", { x1: x, y1: y, x2: nx, y2: ny }));
          x = nx; y = ny;
        } else if (b.op === "rt") h += b.arg;
        else if (b.op === "lt") h -= b.arg;
        else if (b.op === "up") pen = false;
        else if (b.op === "down") pen = true;
        put(x, y, h);
        setTimeout(step, wait);
      })();
    });
    function judge(segs) {
      busy = false;
      runBtn.disabled = false;
      if (!s.goal) { fb.className = "feedback good"; fb.textContent = E.pick(B.T.praise); setTimeout(function () { done(false); }, 1200); return; }
      var a = keys(segs), g = keys(goalSegs);
      var same = Object.keys(a).length === Object.keys(g).length && Object.keys(g).every(function (k) { return a[k]; });
      if (same) {
        fb.className = "feedback good";
        fb.textContent = B.t("ttDone") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        svg.classList.add("done");
        runBtn.disabled = true;
        setTimeout(function () { done(true, tries === 1); }, 1500);
        return;
      }
      misses++;
      fb.className = "feedback try";
      fb.textContent = B.t("ttWrong") + (misses >= 2 ? " " + B.t("ttHint") : "");
      B.speak(fb.textContent);
    }
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [
      el("button", { class: "btn secondary", type: "button", text: B.t("ttClear"), onclick: function () { if (busy) return; inkG.innerHTML = ""; put(start[0], start[1], 0); } }), runBtn]));
    render();
  };
})();

/* train: teach a program with examples, then see what it guesses. labels: the two kinds [{ value, label, pic }];
     examples: [{ pic, label (the right kind), f: [numbers] }] that the child sorts into the two kinds to teach it
       (a wrong kind is bounced back); or trained: examples already taught, some perhaps wrongly ({ pic, label, f }):
       then the step only tests.
     tests: [{ pic, f }]: the program guesses each by the taught example nearest to it (f: a few numbers that describe
       the picture, e.g. [colour, size]); the child sees each guess.
     question, options, answer: asked at the end (scored). prompt, say. */
(function () {
  var el = B.el, E = B.engine;
  E.steps.train = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var taught = (s.trained || []).slice();
    var bins = el("div", { class: "tr-bins" });
    var binNodes = {};
    s.labels.forEach(function (l) {
      var inner = el("div", { class: "tr-items" });
      binNodes[l.value] = inner;
      bins.appendChild(el("div", { class: "tr-bin" }, [el("p", { class: "tr-head" }, [B.setArt(el("span", { class: "tr-pic" }), l.pic), " " + l.label]), inner]));
    });
    box.appendChild(el("p", { class: "tr-title", text: "🤖 " + B.t("trMemory") }));
    box.appendChild(bins);
    function showTaught() {
      Object.keys(binNodes).forEach(function (k) { binNodes[k].innerHTML = ""; });
      taught.forEach(function (t) { binNodes[t.label].appendChild(B.setArt(el("span", { class: "tr-item" + (t.wrong ? " wrong" : "") }), t.pic)); });
    }
    showTaught();
    var stage = el("div", { class: "tr-stage" });
    box.appendChild(stage);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    function guess(f) {
      var best = null, bd = Infinity;
      taught.forEach(function (t) {
        var d = t.f.reduce(function (a, v, i) { return a + (v - f[i]) * (v - f[i]); }, 0);
        if (d < bd) { bd = d; best = t; }
      });
      return best ? best.label : s.labels[0].value;
    }
    function labelOf(v) { return s.labels.filter(function (l) { return l.value === v; })[0]; }

    // Teaching: each example in turn, the child taps the kind it is.
    var queue = (s.examples || []).slice();
    function teach() {
      stage.innerHTML = "";
      if (!queue.length) return testAll();
      var ex = queue[0];
      stage.appendChild(el("p", { class: "tr-ask", text: B.t("trTeach") }));
      stage.appendChild(B.setArt(el("p", { class: "tr-big" }), ex.pic));
      var row = el("div", { class: "options" });
      s.labels.forEach(function (l) {
        var b = el("button", { class: "opt", type: "button" }, [B.setArt(el("span", { class: "tr-pic" }), l.pic), " " + l.label]);
        b.addEventListener("click", function () {
          if (l.value !== ex.label) { fb.className = "feedback try"; fb.textContent = B.t("trSure"); return; }
          fb.textContent = "";
          taught.push(ex);
          queue.shift();
          showTaught();
          teach();
        });
        row.appendChild(b);
      });
      stage.appendChild(row);
    }
    // Testing: the program guesses each new picture, one after another.
    function testAll() {
      stage.innerHTML = "";
      stage.appendChild(el("p", { class: "tr-ask", text: B.t("trTest") }));
      var row = el("div", { class: "tr-tests" });
      stage.appendChild(row);
      var i = 0, wait = B.reducedMotion && B.reducedMotion() ? 200 : 1300;
      (function next() {
        if (!box.isConnected) return;
        if (i >= s.tests.length) return ask();
        var t = s.tests[i++], g = labelOf(guess(t.f));
        row.appendChild(el("div", { class: "tr-test" }, [B.setArt(el("span", { class: "tr-big" }), t.pic),
          el("span", { class: "tr-guess" }, ["🤖 ", B.t("trGuess"), " ", B.setArt(el("span", { class: "tr-pic" }), g.pic), " " + g.label])]));
        setTimeout(next, wait);
      })();
    }
    function ask() {
      if (!s.question) { stage.appendChild(el("div", { class: "row", style: "justify-content:center" }, [E.nextBtn(null, function () { done(false); })])); return; }
      stage.appendChild(el("p", { class: "prompt", text: s.question }));
      B.speak(s.question);
      E.choice(stage, s, done);
    }
    teach();
  };
})();

/* type: touch typing on an on-screen keyboard. lang: "fa" (the standard Persian layout) or "en"; words: what to type,
     one after another. The next key is lit, with the finger that presses it; the child types on the real keyboard
     (any layout: keys are matched by their place) or taps the keys on the screen. Not scored: it is practice. */
(function () {
  var el = B.el, E = B.engine;
  var ROWS = {
    fa: [["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ"], ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ"], ["ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و", ".", "/"]],
    en: [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"], ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]]
  };
  var CODES = [["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight"],
    ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
    ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"]];
  // Fingers by column (0 = left little finger … 3 = left index, 4 = right index … 7 = right little finger).
  var FINGER = [0, 1, 2, 3, 3, 4, 4, 5, 6, 7, 7, 7];
  E.steps.type = function (s, box, done) {
    var lang = s.lang || "fa", rows = ROWS[lang], words = s.words.slice(), w = 0, c = 0;
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var word = el("p", { class: "ty-word", dir: lang === "fa" ? "rtl" : "ltr", lang: lang });
    var fingerP = el("p", { class: "ty-finger hint", "aria-live": "polite" });
    var kb = el("div", { class: "ty-kb", dir: "ltr" });
    var keys = {};
    rows.forEach(function (r, ri) {
      var row = el("div", { class: "ty-row r" + ri });
      r.forEach(function (ch, ci) {
        var k = el("button", { class: "ty-key f" + FINGER[ci] + (ri === 1 ? " home" : ""), type: "button", text: ch, lang: lang });
        k._code = CODES[ri][ci];
        k._finger = FINGER[ci];
        k.addEventListener("click", function () { press(ch); });
        keys[ch] = k;
        row.appendChild(k);
      });
      kb.appendChild(row);
    });
    var space = el("button", { class: "ty-key space", type: "button", text: " " });
    space.addEventListener("click", function () { press(" "); });
    kb.appendChild(el("div", { class: "ty-row" }, [space]));
    box.appendChild(word);
    box.appendChild(fingerP);
    box.appendChild(kb);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    function show() {
      var t = words[w];
      word.innerHTML = "";
      t.split("").forEach(function (ch, i) { word.appendChild(el("span", { class: i < c ? "typed" : i === c ? "next" : "", text: ch })); });
      Object.keys(keys).forEach(function (k) { keys[k].classList.remove("next"); });
      var want = t.charAt(c), k = keys[want];
      if (k) { k.classList.add("next"); fingerP.textContent = B.t("tyFinger" + k._finger); }
    }
    function press(ch) {
      if (w >= words.length) return;
      var t = words[w];
      if (ch !== t.charAt(c)) {
        var k = keys[ch];
        if (k) { k.classList.remove("miss"); void k.offsetWidth; k.classList.add("miss"); }
        return;
      }
      c++;
      if (c >= t.length) {
        w++; c = 0;
        if (w >= words.length) {
          word.textContent = "";
          fingerP.textContent = "";
          Object.keys(keys).forEach(function (k) { keys[k].classList.remove("next"); });
          fb.className = "feedback good";
          fb.textContent = B.t("tyDone") + " " + E.pick(B.T.praise);
          B.speak(fb.textContent);
          document.removeEventListener("keydown", onKey);
          box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [E.nextBtn(null, function () { done(false); })]));
          return;
        }
        B.speak(words[w], null);
      }
      show();
    }
    function onKey(e) {
      if (!box.isConnected) { document.removeEventListener("keydown", onKey); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var ch = null;
      Object.keys(keys).forEach(function (k) { if (keys[k]._code === e.code) ch = k; });
      if (e.code === "Space") ch = " ";
      if (!ch && e.key && e.key.length === 1) ch = e.key.toLowerCase();
      if (ch) { e.preventDefault(); press(ch); }
    }
    document.addEventListener("keydown", onKey);
    show();
  };
})();

/* stage: events, like ScratchJr. Characters on a stage each have scripts: an event block («وقتی پرچم را زدی» or
     «وقتی رویش زدی») with action blocks after it. The child picks a character, adds an event, then actions; the
     green flag runs every flag script at once, and tapping a character on the stage runs its tap scripts.
     sprites: [{ id, pic, name, at: [x%, y%], light: true (a traffic light: «رنگ بعدی» changes it) }];
     blocks: the action blocks offered, from say (with lines: what can be said), move, back, jump, wait, light;
     given: { spriteId: [{ event: "flag" | "tap", body: [["say", "سلام"], ["move"], …] }] } (a friend's program, to
       change); need: [{ sprite, event, op, arg, hint }] — what the finished program must have (the child must also
       run it once); without need it is free play (a project), not scored. prompt, say. */
(function () {
  var el = B.el, E = B.engine;
  var OPS = { say: { g: "💬", n: "stSay" }, move: { g: "➡", n: "stMove" }, back: { g: "⬅", n: "stBack" }, jump: { g: "⤴", n: "stJump" },
    wait: { g: "⏱", n: "stWait" }, light: { g: "🚦", n: "stLight" } };
  var COLORS = ["green", "yellow", "red"];
  E.steps.stage = function (s, box, done) {
    var root = el("div", { class: "st-game" });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);
    var lines = s.lines || [];
    var scripts = {}, sprites = {}, current = s.sprites[0].id, ranSince = false;
    s.sprites.forEach(function (sp) {
      scripts[sp.id] = ((s.given || {})[sp.id] || []).map(function (sc) {
        return { event: sc.event, body: sc.body.map(function (b) { return { op: b[0], arg: b[1] }; }) };
      });
    });

    // ---------- The stage ----------
    var stage = el("div", { class: "st-stage", dir: "ltr", role: "group", "aria-label": B.t("stStageAria") });
    s.sprites.forEach(function (sp) {
      var pic = B.setArt(el("span", { class: "st-pic" }), sp.pic);
      var node = el("button", { class: "st-sprite" + (sp.light ? " light" : ""), type: "button", "aria-label": B.t("stTapAria", { name: sp.name || sp.pic }) }, [pic]);
      var bubble = el("span", { class: "st-bubble" });
      node.appendChild(bubble);
      var st = { x: sp.at[0], y: sp.at[1], dir: 1, color: 0, node: node, bubble: bubble };
      sprites[sp.id] = st;
      if (sp.light) { node.classList.add("c-" + COLORS[0]); }
      place(st);
      node.addEventListener("click", function () { fire("tap", sp.id); });
      stage.appendChild(node);
    });
    root.appendChild(stage);
    function place(st) { st.node.style.left = st.x + "%"; st.node.style.top = st.y + "%"; st.node.classList.toggle("flip", st.dir < 0); }
    function reset() {
      s.sprites.forEach(function (sp) {
        var st = sprites[sp.id];
        st.x = sp.at[0]; st.y = sp.at[1]; st.dir = 1; st.color = 0;
        st.bubble.textContent = ""; st.bubble.classList.remove("on");
        if (sp.light) { st.node.className = "st-sprite light c-green"; }
        place(st);
      });
    }

    // ---------- Running ----------
    var runs = 0;
    function act(id, b) {
      var st = sprites[id], t = B.reducedMotion && B.reducedMotion() ? 300 : 900;
      if (b.op === "say") { st.bubble.textContent = b.arg; st.bubble.classList.add("on"); B.speak(b.arg); return t * 1.6; }
      if (b.op === "move" || b.op === "back") { st.x = Math.max(4, Math.min(92, st.x + (b.op === "move" ? 14 : -14))); st.dir = b.op === "move" ? 1 : -1; place(st); return t; }
      if (b.op === "jump") { st.node.classList.remove("hop"); void st.node.offsetWidth; st.node.classList.add("hop"); return t; }
      if (b.op === "wait") return t * 1.2;
      if (b.op === "light") { st.color = (st.color + 1) % 3; st.node.className = "st-sprite light c-" + COLORS[st.color]; return t; }
      return t;
    }
    function play(id, body) {
      var i = 0;
      runs++;
      (function next() {
        if (!root.isConnected) return;
        if (i >= body.length) { runs--; setTimeout(function () { if (!runs) sprites[id].bubble.classList.remove("on"); }, 900); return; }
        var wait = act(id, body[i++]);
        setTimeout(function () { if (body[i - 1].op === "say") sprites[id].bubble.classList.remove("on"); next(); }, wait);
      })();
    }
    function fire(event, only) {
      var any = false;
      Object.keys(scripts).forEach(function (id) {
        if (only && id !== only) return;
        scripts[id].forEach(function (sc) { if (sc.event === event) { any = true; play(id, sc.body); } });
      });
      if (any) ranSince = true;
      if (only && !any) { var st = sprites[only]; st.node.classList.remove("wobble"); void st.node.offsetWidth; st.node.classList.add("wobble"); }
    }
    var flag = el("button", { class: "btn st-flag", type: "button", text: "🚩 " + B.t("stFlag") });
    flag.addEventListener("click", function () { reset(); fire("flag"); });
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [flag]));

    // ---------- Editing the selected character's scripts ----------
    var tabs = el("div", { class: "st-tabs", role: "tablist" });
    s.sprites.forEach(function (sp) {
      var t = el("button", { class: "st-tab", type: "button", role: "tab" }, [B.setArt(el("span", { class: "st-tabpic" }), sp.pic), sp.name ? " " + sp.name : ""]);
      t._id = sp.id;
      t.addEventListener("click", function () { current = sp.id; target = null; render(); });
      tabs.appendChild(t);
    });
    root.appendChild(tabs);
    var area = el("div", { class: "st-scripts" });
    root.appendChild(area);
    var target = null; // the script the next action goes into (default: the last one)
    function render() {
      tabs.querySelectorAll(".st-tab").forEach(function (t) { t.setAttribute("aria-selected", t._id === current ? "true" : "false"); });
      area.innerHTML = "";
      var list = scripts[current];
      if (!list.length) area.appendChild(el("p", { class: "hint", text: B.t("stEmpty") }));
      if (target && list.indexOf(target) === -1) target = null;
      var into = target || list[list.length - 1];
      list.forEach(function (sc, si) {
        var head = el("div", { class: "st-event" }, [el("span", { text: sc.event === "flag" ? "🚩 " + B.t("stWhenFlag") : "👆 " + B.t("stWhenTap") })]);
        var rm = el("button", { class: "code-loop-rm", type: "button", "aria-label": B.t("stRemoveScript"), text: "✕" });
        rm.addEventListener("click", function () { list.splice(si, 1); edited(); });
        head.appendChild(rm);
        var body = el("div", { class: "st-body" });
        sc.body.forEach(function (b, bi) {
          var blk = el("div", { class: "st-block op-" + b.op });
          var name = el("button", { class: "tt-name", type: "button", "aria-label": B.t("codeBlockAria", { name: B.t(OPS[b.op].n) }) }, [OPS[b.op].g + " " + B.t(OPS[b.op].n)]);
          name.addEventListener("click", function () { sc.body.splice(bi, 1); edited(); });
          blk.appendChild(name);
          if (b.op === "say") {
            var chip = el("button", { class: "tt-chip", type: "button", text: "«" + b.arg + "»" });
            chip.addEventListener("click", function () { b.arg = lines[(lines.indexOf(b.arg) + 1) % lines.length]; edited(); });
            blk.appendChild(chip);
          }
          body.appendChild(blk);
        });
        var pick = el("button", { class: "tt-target" + (sc === into ? " on" : ""), type: "button", text: sc === into ? B.t("ttAddingHere") : B.t("ttAddHere") });
        pick.addEventListener("click", function () { target = sc; render(); });
        body.appendChild(pick);
        area.appendChild(el("div", { class: "st-script" + (sc === into ? " on" : "") }, [head, body]));
      });
      fb.textContent = "";
      fb.className = "feedback";
    }
    function edited() { ranSince = false; render(); }
    var palette = el("div", { class: "code-palette st-palette", role: "group", "aria-label": B.t("codePaletteAria") });
    [["flag", "🚩 " + B.t("stWhenFlag")], ["tap", "👆 " + B.t("stWhenTap")]].forEach(function (e) {
      var b = el("button", { class: "tt-pal st-ev", type: "button", text: e[1] });
      b.addEventListener("click", function () { var sc = { event: e[0], body: [] }; scripts[current].push(sc); target = sc; edited(); });
      palette.appendChild(b);
    });
    (s.blocks || ["say", "move", "jump"]).forEach(function (op) {
      var b = el("button", { class: "tt-pal op-" + op, type: "button", text: OPS[op].g + " " + B.t(OPS[op].n) });
      b.addEventListener("click", function () {
        var list = scripts[current], sc = target || list[list.length - 1];
        if (!sc) { fb.className = "feedback try"; fb.textContent = B.t("stNeedEvent"); return; }
        sc.body.push({ op: op, arg: op === "say" ? lines[0] : undefined });
        target = sc;
        edited();
      });
      palette.appendChild(b);
    });
    root.appendChild(palette);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);

    // ---------- Done ----------
    var tries = 0;
    function has(n) {
      return (scripts[n.sprite] || []).some(function (sc) {
        return sc.event === n.event && sc.body.some(function (b) { return b.op === n.op && (n.arg == null || b.arg === n.arg); });
      });
    }
    var finish = E.nextBtn(B.t("stDone"), function () {
      if (!s.need) { done(false); return; }
      tries++;
      var missing = s.need.filter(function (n) { return !has(n); });
      if (!missing.length && !ranSince) { fb.className = "feedback try"; fb.textContent = B.t("stRunFirst"); tries--; return; }
      if (!missing.length) {
        finish.disabled = true;
        fb.className = "feedback good";
        fb.textContent = B.t("stRight") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, tries === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = missing[0].hint || B.t("stMissing");
      B.speak(fb.textContent);
    });
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [finish]));
    render();
  };
})();

/* sheet: a small spreadsheet. cols (how many, A, B, …), rows (how many), cells { A1: "روز", B2: 18, C9: "=SUM(B2:B8)" }
     (a formula starts with =: SUM, AVERAGE, MAX, MIN of a range like B2:B8, or + − * / of cells and numbers),
     editable: the cells the child may type in (or "all"); tasks: [{ cell, value, fn }] (the cell must show value,
     and with fn its formula must use that function) or [{ sorted: "B" }] (rows 2 to the last sorted by column B,
     smallest first; a «مرتب کن» button sorts by sortCol); chart: { labels: "A2:A8", values: "B2:B8" } draws a bar
     chart of the values, updated as they change. prompt, say. Scored with «ببین درست شد؟». */
(function () {
  var el = B.el, E = B.engine, NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, a) { var e = document.createElementNS(NS, tag); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  var LET = "ABCDEFGH";
  function latin(s) { return String(s).replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/٫/g, "."); }
  E.steps.sheet = function (s, box, done) {
    var cols = s.cols || 3, rows = s.rows || 8, raw = {};
    Object.keys(s.cells || {}).forEach(function (k) { raw[k] = String(s.cells[k]); });
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    function editable(k) { return s.editable === "all" || (s.editable || []).indexOf(k) !== -1; }
    function cellsIn(range) {
      var m = /^([A-H])(\d+):([A-H])(\d+)$/.exec(range), out = [];
      if (!m) return out;
      for (var c = LET.indexOf(m[1]); c <= LET.indexOf(m[3]); c++) for (var r = +m[2]; r <= +m[4]; r++) out.push(LET[c] + r);
      return out;
    }
    // A cell's value: a number, a piece of text, or what its formula gives (null for an error).
    function value(k, seen) {
      seen = seen || {};
      if (seen[k]) return null;
      seen[k] = true;
      var v = raw[k];
      if (v == null || v === "") return "";
      v = latin(v).trim();
      if (v.charAt(0) !== "=") return /^-?\d+(\.\d+)?$/.test(v) ? parseFloat(v) : raw[k];
      var f = v.slice(1).toUpperCase().replace(/\s+/g, "");
      var fm = /^(SUM|AVERAGE|MAX|MIN)\(([A-H]\d+:[A-H]\d+)\)$/.exec(f);
      if (fm) {
        var nums = cellsIn(fm[2]).map(function (c) { return value(c, Object.assign({}, seen)); }).filter(function (x) { return typeof x === "number"; });
        if (!nums.length) return fm[1] === "SUM" ? 0 : null;
        if (fm[1] === "SUM") return nums.reduce(function (a, b) { return a + b; }, 0);
        if (fm[1] === "AVERAGE") return nums.reduce(function (a, b) { return a + b; }, 0) / nums.length;
        return Math[fm[1].toLowerCase()].apply(null, nums);
      }
      if (!/^[A-H0-9+\-*/().]+$/.test(f)) return null;
      var bad = false;
      var expr = f.replace(/[A-H]\d+/g, function (ref) { var x = value(ref, Object.assign({}, seen)); if (typeof x !== "number") { bad = x === "" ? false : true; return "0"; } return "(" + x + ")"; });
      if (bad) return null;
      try { var r = Function("return (" + expr + ")")(); return isFinite(r) ? r : null; } catch (e) { return null; }
    }
    function show(v) {
      if (v === null) return "#؟";
      if (typeof v === "number") return B.fa(Math.round(v * 100) / 100);
      return v;
    }
    // Like a spreadsheet program: right to left in Persian (column A on the right), left to right in English.
    var table = el("table", { class: "sh-table" });
    var head = el("tr", null, [el("th")]);
    for (var c = 0; c < cols; c++) head.appendChild(el("th", { text: LET[c] }));
    table.appendChild(head);
    var tds = {};
    for (var r = 1; r <= rows; r++) {
      var tr = el("tr", null, [el("th", { text: B.fa(r) })]);
      for (var c2 = 0; c2 < cols; c2++) {
        (function (k) {
          var td = el("td", { class: "sh-cell" + (editable(k) ? " edit" : ""), tabindex: "0", dir: "auto" });
          td.addEventListener("click", function () { select(k); });
          td.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); select(k); bar.focus(); } });
          tds[k] = td;
          tr.appendChild(td);
        })(LET[c2] + r);
      }
      table.appendChild(tr);
    }
    var nameBox = el("span", { class: "sh-name", dir: "ltr" });
    var bar = el("input", { class: "sh-bar", dir: "ltr", type: "text", "aria-label": B.t("shBarAria") });
    var cur = null;
    function select(k) {
      cur = k;
      Object.keys(tds).forEach(function (x) { tds[x].classList.toggle("on", x === k); });
      nameBox.textContent = k;
      bar.value = raw[k] || "";
      bar.disabled = !editable(k);
    }
    function commit() {
      if (!cur || !editable(cur)) return;
      raw[cur] = bar.value;
      paint();
      fb.textContent = "";
    }
    bar.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); commit(); } });
    bar.addEventListener("change", commit);
    box.appendChild(el("div", { class: "sh-barrow", dir: "ltr" }, [nameBox, el("span", { class: "sh-fx", text: "fx" }), bar]));
    box.appendChild(el("div", { class: "sh-wrap" }, [table]));
    var chartSvg = null;
    if (s.chart) { chartSvg = svgEl("svg", { viewBox: "0 0 200 110", class: "sh-chart", role: "img", "aria-label": B.t("shChartAria") }); box.appendChild(el("div", { class: "tt-wrap" }, [chartSvg])); }
    function paint() {
      Object.keys(tds).forEach(function (k) {
        var v = value(k);
        tds[k].textContent = show(v);
        tds[k].classList.toggle("num", typeof v === "number");
        tds[k].classList.toggle("formula", /^=/.test(raw[k] || ""));
      });
      if (chartSvg) {
        chartSvg.innerHTML = "";
        var labs = cellsIn(s.chart.labels).map(function (k) { return show(value(k)); });
        var vals = cellsIn(s.chart.values).map(function (k) { var v = value(k); return typeof v === "number" ? v : 0; });
        var mx = Math.max.apply(null, vals.concat([1])), w = 180 / vals.length;
        chartSvg.appendChild(svgEl("line", { x1: 10, y1: 92, x2: 192, y2: 92, stroke: "#3d2c22", "stroke-width": ".8" }));
        vals.forEach(function (v, i) {
          var h = 78 * v / mx, x = 12 + i * w;
          chartSvg.appendChild(svgEl("rect", { x: x + w * 0.15, y: 92 - h, width: w * 0.7, height: h, fill: "#5b9bd5", stroke: "#3d2c22", "stroke-width": ".5" }));
          var t = svgEl("text", { x: x + w / 2, y: 102, "font-size": 6, "text-anchor": "middle", fill: "#3d2c22" }); t.textContent = labs[i]; chartSvg.appendChild(t);
          var tv = svgEl("text", { x: x + w / 2, y: 90 - h, "font-size": 6, "text-anchor": "middle", fill: "#3d2c22" }); tv.textContent = show(v); chartSvg.appendChild(tv);
        });
      }
    }
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var btns = [];
    if (s.sortCol) {
      btns.push(el("button", { class: "btn secondary", type: "button", text: B.t("shSort", { col: s.sortCol }), onclick: function () {
        var rowsData = [];
        for (var r2 = 2; r2 <= (s.sortTo || rows); r2++) { var row = {}; for (var c3 = 0; c3 < cols; c3++) row[LET[c3]] = raw[LET[c3] + r2]; rowsData.push(row); }
        rowsData.sort(function (a, b) { var x = parseFloat(latin(a[s.sortCol] || "")), y = parseFloat(latin(b[s.sortCol] || "")); return (isNaN(x) ? Infinity : x) - (isNaN(y) ? Infinity : y); });
        rowsData.forEach(function (row, i) { for (var c4 = 0; c4 < cols; c4++) raw[LET[c4] + (i + 2)] = row[LET[c4]]; });
        paint();
        if (cur) select(cur);
      } }));
    }
    var checks = 0;
    var check = E.nextBtn(B.t("pxCheck"), function () {
      commit();
      checks++;
      var problem = null;
      (s.tasks || []).forEach(function (t) {
        if (problem) return;
        if (t.sorted) {
          var prev = -Infinity;
          for (var r3 = 2; r3 <= (s.sortTo || rows); r3++) { var v = value(t.sorted + r3); if (typeof v === "number") { if (v < prev) problem = B.t("shNotSorted", { col: t.sorted }); prev = v; } }
          return;
        }
        var got = value(t.cell);
        if (typeof got !== "number" || Math.abs(got - t.value) > 0.01) { problem = B.t("shWrongValue", { cell: t.cell }); return; }
        if (t.fn && !new RegExp("^=\\s*" + t.fn, "i").test(latin(raw[t.cell] || ""))) problem = B.t("shNeedFormula", { cell: t.cell, fn: t.fn });
      });
      if (!problem) {
        check.disabled = true;
        fb.className = "feedback good";
        fb.textContent = B.t("shRight") + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { done(true, checks === 1); }, 1400);
        return;
      }
      fb.className = "feedback try";
      fb.textContent = problem;
    });
    box.appendChild(fb);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, btns.concat([check])));
    paint();
    var first = Object.keys(tds).filter(editable)[0];
    if (first) select(first);
  };
})();

/* graph: towns and roads as dots and lines. nodes [{ id, x, y, label }] on a 200 × 130 map, edges [[a, b, length]].
     mode "path": tap towns from `from` to `to`, one road at a time; right when the way is a shortest one.
     mode "tree": tap roads to choose them; right when every town is joined, with no loop and the least total length.
     mode "color": tap a town to change its colour (colors: how many); right when no two neighbours share a colour.
     prompt, say. Scored. */
(function () {
  var el = B.el, E = B.engine, NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, a) { var e = document.createElementNS(NS, tag); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  var PALETTE = ["#e5483f", "#5b9bd5", "#f2c14e", "#5a9a45"];
  E.steps.graph = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var byId = {}, adj = {};
    s.nodes.forEach(function (n) { byId[n.id] = n; adj[n.id] = []; });
    s.edges.forEach(function (e, i) { adj[e[0]].push({ to: e[1], w: e[2], i: i }); adj[e[1]].push({ to: e[0], w: e[2], i: i }); });
    function shortest(a, b) {
      var d = {}, q = Object.keys(byId);
      q.forEach(function (k) { d[k] = Infinity; });
      d[a] = 0;
      while (q.length) {
        q.sort(function (x, y) { return d[x] - d[y]; });
        var u = q.shift();
        adj[u].forEach(function (e) { if (d[u] + e.w < d[e.to]) d[e.to] = d[u] + e.w; });
      }
      return d[b];
    }
    function mst() {
      var parent = {};
      function find(x) { while (parent[x] !== x) x = parent[x] = parent[parent[x]]; return x; }
      Object.keys(byId).forEach(function (k) { parent[k] = k; });
      return s.edges.map(function (e, i) { return [e[2], i]; }).sort(function (a, b) { return a[0] - b[0]; }).reduce(function (t, x) {
        var e = s.edges[x[1]], ra = find(e[0]), rb = find(e[1]);
        if (ra === rb) return t;
        parent[ra] = rb;
        return t + e[2];
      }, 0);
    }
    var svg = svgEl("svg", { viewBox: "0 0 200 130", class: "gr-map", role: "group", "aria-label": B.t("grAria") });
    var edgeG = svgEl("g"), nodeG = svgEl("g");
    svg.appendChild(edgeG); svg.appendChild(nodeG);
    box.appendChild(el("div", { class: "tt-wrap" }, [svg]));
    var info = el("p", { class: "gr-info", "aria-live": "polite" });
    box.appendChild(info);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    var chosen = {}, path = [s.from], colors = {}, tries = 0, finished = false;
    var edgeEls = s.edges.map(function (e, i) {
      var a = byId[e[0]], b = byId[e[1]];
      var g = svgEl("g", { class: "gr-edge", tabindex: s.mode === "tree" ? "0" : "-1", role: s.mode === "tree" ? "button" : null });
      g.appendChild(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "hit" }));
      g.appendChild(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "road" }));
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      g.appendChild(svgEl("circle", { cx: mx, cy: my, r: 5, class: "wbg" }));
      var t = svgEl("text", { x: mx, y: my + 2.2, "text-anchor": "middle", "font-size": 6, class: "w" }); t.textContent = B.fa(e[2]); g.appendChild(t);
      if (s.mode === "tree") {
        var toggle = function () { if (finished) return; chosen[i] = !chosen[i]; paint(); };
        g.addEventListener("click", toggle);
        g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggle(); } });
        g.setAttribute("aria-label", B.t("grRoadAria", { a: a.label, b: b.label, w: B.fa(e[2]) }));
      }
      edgeG.appendChild(g);
      return g;
    });
    var nodeEls = {};
    s.nodes.forEach(function (n) {
      var g = svgEl("g", { class: "gr-node", tabindex: "0", role: "button", "aria-label": n.label });
      g.appendChild(svgEl("circle", { cx: n.x, cy: n.y, r: 6 }));
      // The name under the dot, outlined in white so it reads over the roads.
      var t = svgEl("text", { x: n.x, y: n.y + 14, "text-anchor": "middle", "font-size": 6.4, class: "gr-label" }); t.textContent = n.label; g.appendChild(t);
      var act = function () { tapNode(n.id); };
      g.addEventListener("click", act);
      g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); act(); } });
      nodeG.appendChild(g);
      nodeEls[n.id] = g;
    });
    function tapNode(id) {
      if (finished) return;
      if (s.mode === "color") { colors[id] = ((colors[id] == null ? -1 : colors[id]) + 1) % (s.colors || 3); paint(); return; }
      if (s.mode !== "path") return;
      var last = path[path.length - 1];
      if (id === last) return;
      if (path.length > 1 && id === path[path.length - 2]) { path.pop(); paint(); return; }
      var road = adj[last].filter(function (e) { return e.to === id; })[0];
      if (!road) { fb.className = "feedback try"; fb.textContent = B.t("grNoRoad"); return; }
      path.push(id);
      paint();
      if (id === s.to) judge();
    }
    function pathLen() {
      var t = 0;
      for (var i = 1; i < path.length; i++) t += adj[path[i - 1]].filter(function (e) { return e.to === path[i]; })[0].w;
      return t;
    }
    function paint() {
      fb.textContent = "";
      fb.className = "feedback";
      Object.keys(nodeEls).forEach(function (k) {
        nodeEls[k].classList.toggle("on", s.mode === "path" && path.indexOf(k) !== -1);
        nodeEls[k].classList.toggle("start", s.mode === "path" && (k === s.from || k === s.to));
        nodeEls[k].querySelector("circle").style.fill = s.mode === "color" && colors[k] != null ? PALETTE[colors[k]] : "";
      });
      edgeEls.forEach(function (g, i) {
        var e = s.edges[i], onPath = false;
        for (var j = 1; j < path.length; j++) if ((path[j - 1] === e[0] && path[j] === e[1]) || (path[j - 1] === e[1] && path[j] === e[0])) onPath = true;
        g.classList.toggle("on", s.mode === "path" ? onPath : !!chosen[i]);
      });
      if (s.mode === "path") info.textContent = B.t("grPathLen", { n: B.fa(pathLen()) });
      if (s.mode === "tree") info.textContent = B.t("grTreeLen", { n: B.fa(s.edges.reduce(function (t, e, i) { return t + (chosen[i] ? e[2] : 0); }, 0)) });
    }
    function win() {
      finished = true;
      fb.className = "feedback good";
      fb.textContent = B.t("grRight") + " " + E.pick(B.T.praise);
      B.speak(fb.textContent);
      setTimeout(function () { done(true, tries === 1); }, 1400);
    }
    function judge() {
      tries++;
      if (s.mode === "path") {
        var best = shortest(s.from, s.to), got = pathLen();
        if (got === best) return win();
        fb.className = "feedback try";
        fb.textContent = B.t("grLonger", { n: B.fa(got) });
        return;
      }
      if (s.mode === "tree") {
        var parent = {}, total = 0, loop = false;
        function find(x) { while (parent[x] !== x) x = parent[x]; return x; }
        Object.keys(byId).forEach(function (k) { parent[k] = k; });
        s.edges.forEach(function (e, i) { if (!chosen[i]) return; total += e[2]; var a = find(e[0]), b = find(e[1]); if (a === b) loop = true; else parent[a] = b; });
        var roots = {};
        Object.keys(byId).forEach(function (k) { roots[find(k)] = true; });
        fb.className = "feedback try";
        if (Object.keys(roots).length > 1) { fb.textContent = B.t("grNotJoined"); return; }
        if (loop) { fb.textContent = B.t("grLoop"); return; }
        if (total > mst()) { fb.textContent = B.t("grTooLong", { n: B.fa(total) }); return; }
        return win();
      }
      var clash = s.edges.some(function (e) { return colors[e[0]] != null && colors[e[0]] === colors[e[1]]; });
      fb.className = "feedback try";
      if (Object.keys(byId).some(function (k) { return colors[k] == null; })) { fb.textContent = B.t("grUncoloured"); return; }
      if (clash) { fb.textContent = B.t("grClash"); return; }
      win();
    }
    var row = el("div", { class: "row", style: "justify-content:center" });
    if (s.mode === "path") row.appendChild(el("button", { class: "btn secondary", type: "button", text: B.t("grRestart"), onclick: function () { if (!finished) { path = [s.from]; paint(); } } }));
    else row.appendChild(E.nextBtn(B.t("pxCheck"), function () { if (!finished) judge(); }));
    box.appendChild(row);
    if (s.mode === "color") info.textContent = B.t("grColors", { n: B.fa(s.colors || 3) });
    paint();
  };
})();

/* gates: switches, a logic gate and a lamp. gate: "AND" | "OR" | "NOT" | "XOR", or "half" (a half adder: XOR gives the
     sum, AND the carry, two lamps). The child flips the switches to try it, then fills the truth table (tap each
     lamp cell: off or on). mode "pick": the table (outputs given in `want`, top to bottom) is shown and the child
     picks the gate that makes it. prompt, say. Scored. */
(function () {
  var el = B.el, E = B.engine, NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, a) { var e = document.createElementNS(NS, tag); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; }
  var F = { AND: function (a, b) { return a && b; }, OR: function (a, b) { return a || b; }, NOT: function (a) { return !a; }, XOR: function (a, b) { return a !== b; } };
  function shape(kind) {
    // A gate symbol 30 wide, inputs on the left at y −6 and +6 (or 0 for NOT), output on the right at x 30.
    if (kind === "AND") return '<path d="M0-12h14a12 12 0 0 1 0 24H0z" fill="#fff" stroke="#3d2c22" stroke-width="1.2"/>';
    if (kind === "OR") return '<path d="M0-12c8 0 18 2 30 12-12 10-22 12-30 12 5-8 5-16 0-24z" fill="#fff" stroke="#3d2c22" stroke-width="1.2"/>';
    if (kind === "XOR") return '<path d="M-4-12c5 8 5 16 0 24" fill="none" stroke="#3d2c22" stroke-width="1.2"/><path d="M0-12c8 0 18 2 30 12-12 10-22 12-30 12 5-8 5-16 0-24z" fill="#fff" stroke="#3d2c22" stroke-width="1.2"/>';
    if (kind === "NOT") return '<path d="M0-11L24 0 0 11z" fill="#fff" stroke="#3d2c22" stroke-width="1.2"/><circle cx="27" r="3" fill="#fff" stroke="#3d2c22" stroke-width="1.2"/>';
    return '<rect x="0" y="-12" width="30" height="24" rx="3" fill="#fff" stroke="#3d2c22" stroke-width="1.2" stroke-dasharray="3 2"/><text x="15" y="4" text-anchor="middle" font-size="11" fill="#3d2c22">?</text>';
  }
  function nameOf(kind) { return B.t("gt" + kind); }
  E.steps.gates = function (s, box, done) {
    var half = s.gate === "half", one = s.gate === "NOT", gate = s.mode === "pick" ? null : s.gate;
    var inputs = one ? ["A"] : ["A", "B"], rows = one ? [[false], [true]] : [[false, false], [false, true], [true, false], [true, true]];
    var outs = half ? ["S", "C"] : ["Q"];
    function outputs(vals, g) {
      if (half) return [F.XOR(vals[0], vals[1]), F.AND(vals[0], vals[1])];
      return g ? [F[g](vals[0], vals[1])] : [null];
    }
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    // ---------- the circuit ----------
    var sw = inputs.map(function () { return false; });
    var svg = svgEl("svg", { viewBox: "-12 0 212 " + (half ? 110 : 80), class: "gt-svg", role: "img", "aria-label": B.t("gtAria") });
    box.appendChild(el("div", { class: "tt-wrap", dir: "ltr" }, [svg]));
    function draw() {
      svg.innerHTML = "";
      var res = outputs(sw, gate);
      var ys = one ? [40] : [28, 52];
      inputs.forEach(function (n, i) {
        var y = ys[i], on = sw[i];
        var g = svgEl("g", { class: "gt-switch", tabindex: "0", role: "switch", "aria-checked": on ? "true" : "false", "aria-label": B.t("gtSwitch", { n: n }) });
        g.innerHTML = '<rect x="6" y="' + (y - 8) + '" width="26" height="16" rx="8" fill="' + (on ? "#5a9a45" : "#cbd5e0") + '" stroke="#3d2c22"/>' +
          '<circle cx="' + (on ? 24 : 14) + '" cy="' + y + '" r="6" fill="#fff" stroke="#3d2c22"/>' +
          '<text x="2" y="' + (y + 3) + '" font-size="8" text-anchor="end" fill="#3d2c22">' + n + "</text>" +
          '<text x="' + (on ? 24 : 14) + '" y="' + (y + 2.4) + '" font-size="6.4" font-weight="800" text-anchor="middle" fill="#3d2c22">' + B.fa(on ? 1 : 0) + "</text>";
        var flip = function () { sw[i] = !sw[i]; draw(); };
        g.addEventListener("click", flip);
        g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); flip(); } });
        svg.appendChild(g);
      });
      var gatesAt = half ? [["XOR", 30], ["AND", 80]] : [[gate, 40]];
      gatesAt.forEach(function (ga, j) {
        var gy = ga[1], wire = "";
        ys.forEach(function (y, i) { var ty = one ? gy : gy + (i ? 6 : -6); wire += '<path d="M32 ' + y + "C60 " + y + " 60 " + ty + " 86 " + ty + '" fill="none" stroke="' + (sw[i] ? "#f59e0b" : "#9aa5b1") + '" stroke-width="1.6"/>'; });
        var on = res[j];
        var g = svgEl("g");
        g.innerHTML = wire + '<g transform="translate(86 ' + gy + ')">' + shape(ga[0]) + "</g>" +
          '<text x="101" y="' + (gy - 15) + '" font-size="6.4" text-anchor="middle" fill="#3d2c22">' + (ga[0] ? nameOf(ga[0]) : "") + "</text>" +
          '<path d="M' + (ga[0] === "NOT" ? 116 : 116) + " " + gy + 'H150" stroke="' + (on ? "#f59e0b" : "#9aa5b1") + '" stroke-width="1.6"/>' +
          '<circle cx="160" cy="' + gy + '" r="9" fill="' + (on ? "#fcd34d" : on === null ? "#fff" : "#e2e8f0") + '" stroke="#3d2c22"/>' +
          (on ? '<circle cx="160" cy="' + gy + '" r="14" fill="#fcd34d" opacity=".35"/>' : "") +
          '<text x="178" y="' + (gy + 3) + '" font-size="8" fill="#3d2c22">' + (half ? (j ? B.t("gtCarry") : B.t("gtSum")) : "") + "</text>";
        svg.appendChild(g);
      });
    }
    // ---------- the truth table ----------
    var table = el("table", { class: "gt-table", dir: "ltr" });
    table.appendChild(el("tr", null, inputs.map(function (n) { return el("th", { text: n }); }).concat(outs.map(function (o) { return el("th", { text: half ? (o === "S" ? B.t("gtSum") : B.t("gtCarry")) : "💡" }); }))));
    var cells = [];
    rows.forEach(function (r, ri) {
      var tr = el("tr", null, r.map(function (v) { return el("td", { text: B.fa(v ? 1 : 0) }); }));
      outs.forEach(function (o, oi) {
        if (s.mode === "pick") { var want = s.want[ri]; tr.appendChild(el("td", { class: "gt-out", text: B.fa(want ? 1 : 0) })); return; }
        var b = el("button", { class: "gt-out", type: "button", text: "?" });
        b._v = null; b._r = ri; b._o = oi;
        b.addEventListener("click", function () { b._v = b._v === null ? true : !b._v; b.textContent = B.fa(b._v ? 1 : 0); b.classList.toggle("lit", b._v); b.classList.remove("bad"); fb.textContent = ""; });
        cells.push(b);
        tr.appendChild(el("td", null, [b]));
      });
      table.appendChild(tr);
    });
    box.appendChild(el("div", { class: "tt-wrap" }, [table]));
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    var tries = 0;
    function win() {
      fb.className = "feedback good";
      fb.textContent = B.t("gtRight") + " " + E.pick(B.T.praise);
      B.speak(fb.textContent);
      setTimeout(function () { done(true, tries === 1); }, 1400);
    }
    if (s.mode === "pick") {
      var opts = el("div", { class: "options" });
      (s.choices || ["AND", "OR", "XOR"]).forEach(function (g) {
        var b = el("button", { class: "opt gt-pick", type: "button" });
        b.innerHTML = '<svg viewBox="-6 -14 42 28" width="64" height="44">' + shape(g) + "</svg>";
        b.appendChild(el("span", { text: nameOf(g) }));
        b.addEventListener("click", function () {
          gate = g;
          draw();
          tries++;
          var ok = rows.every(function (r, ri) { return F[g](r[0], r[1]) === !!s.want[ri]; });
          if (ok) { opts.querySelectorAll("button").forEach(function (x) { x.disabled = true; }); b.classList.add("correct"); win(); }
          else { b.classList.add("wrong"); fb.className = "feedback try"; fb.textContent = B.t("gtNotThis"); }
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
    } else {
      box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [E.nextBtn(B.t("pxCheck"), function () {
        tries++;
        var bad = cells.filter(function (c) { return c._v !== outputs(rows[c._r], gate)[c._o]; });
        if (!bad.length) { cells.forEach(function (c) { c.disabled = true; }); return win(); }
        fb.className = "feedback try";
        fb.textContent = B.t(cells.some(function (c) { return c._v === null; }) ? "gtFillAll" : "gtWrong");
        if (tries >= 2) bad.forEach(function (c) { c.classList.add("bad"); });
      })]));
    }
    draw();
  };
})();
