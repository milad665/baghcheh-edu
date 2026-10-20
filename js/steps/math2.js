/* باغچه — more math step types for ریاضی (Sapling on, with room for Tree and Forest).
   - bar: the bar model (Singapore): parts and a whole, two bars to compare, bars cut into equal units.
   - column: written methods digit by digit (+ − ×), carrying and borrowing shown next to bundles.
   - array: rows × columns of things, turning and splitting an array, the area model.
   - grid: a squared grid: count and draw squares (area, perimeter), find and plot places, move and turn shapes.
   - mirror: complete a symmetric picture, find the lines of symmetry.
   - spinner: repeat a chance experiment (a spinner, a bag of marbles, a die, a coin) and tally the results.
   Options on older steps: numline with fractions and decimals, feed with several plates (sharing, remainders).
   Game rules (js/games.js): no timers or points, a gentle bounce on a miss, the answer shown after two misses on the
   same thing; everything works by tapping, dragging, and the keyboard (Tab and Enter, digits, arrow keys).
   Math is written left to right, as in Iranian textbooks. Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;
  var NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sum(list) { return list.reduce(function (a, b) { return a + b; }, 0); }
  function row(children, cls) { return el("div", { class: "row" + (cls ? " " + cls : ""), style: "justify-content:center;flex-wrap:wrap" }, children); }
  function promptLine(box, text, say, audio) {
    if (text) box.appendChild(el("p", { class: "prompt", text: text }));
    var sb = E.speakBtn(say || text, audio);
    if (sb) box.appendChild(sb);
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
  // A math line, left to right: «۴۵ − ۱۸ = ۲۷».
  function mathLine(text, cls) { return el("p", { class: "math-big" + (cls ? " " + cls : ""), dir: "ltr", text: text }); }
  // Persian decimals are written with a slash (۲/۵), English ones with a point.
  function decText(v, places) {
    var t = places != null ? v.toFixed(places) : String(Math.round(v * 1e6) / 1e6);
    return B.fa(t.replace(".", B.inEnglish && B.inEnglish() ? "." : "/"));
  }
  // A fraction written the school way: the top number over the bottom one.
  function fracNode(f) {
    return el("span", { class: "frac-num", dir: "ltr" }, [el("span", { text: B.fa(f[0]) }), el("span", { class: "frac-bar" }), el("span", { text: B.fa(f[1]) })]);
  }
  /* Options for E.choice: numbers (in the reader's digits), { frac: [3, 4] } (value "3/4"), or { label, value }. */
  function options(list) {
    return list.map(function (o) {
      if (typeof o === "number") return { label: B.fa(o), value: o };
      if (o && o.frac) return { node: fracNode(o.frac), value: o.frac[0] + "/" + o.frac[1], aria: B.fa(o.frac[0] + "/" + o.frac[1]) };
      return o;
    });
  }
  /* A question asked once the work is done (scored), then done(true, first && right first time); with no question,
     praise and go on. */
  function ending(box, s, done, first, before) {
    if (s.question && s.options) {
      var q = el("div", { class: "m2-question" });
      box.insertBefore(q, before || null);
      q.appendChild(el("p", { class: "prompt", text: s.question }));
      var sb = E.speakBtn(s.question, s.questionAudio);
      if (sb) q.appendChild(sb);
      B.speak(s.question);
      E.choice(q, { options: options(s.options), answer: s.answer, ltr: true, onRight: s._onRight }, function (sc, f) { done(true, first && f); });
      return;
    }
    setTimeout(function () { done(true, first); }, 1100);
  }
  /* "Check it" with the games' rules: test() returns "" when it is right, or a hint; after two misses reveal(fb)
     shows the answer. onDone(firstTry) when right. */
  function checkButton(box, label, test, reveal, onDone) {
    var fb = E.feedback(box), tries = 0, misses = 0;
    var btn = E.nextBtn(label, function () {
      tries++;
      var hint = test();
      if (!hint) {
        btn.disabled = true;
        B.speak(fb.good());
        onDone(misses === 0);
        return;
      }
      misses++;
      fb.tryAgain(hint);
      if (misses >= 2 && reveal) reveal(fb);
    });
    var r = row([btn]);
    box.appendChild(r);
    return { fb: fb, btn: btn, clear: fb.clear, row: r, miss: function () { misses++; } };
  }

  /* A row of digit keys (0–9) for writing a number: tapped, dragged onto the box that is being written, or typed on
     the keyboard (Persian or Latin digits) while the step is open. onDigit(d, target) gets the digit and, when it was
     dragged, the box it was dropped on. back: also a ⌫ key (onBack). */
  function digitPad(box, onDigit, onBack) {
    var pad = el("div", { class: "m2-pad", dir: "ltr", role: "group", "aria-label": B.t("m2Pad") });
    for (var d = 0; d <= 9; d++) {
      (function (d) {
        var k = el("button", { class: "m2-key", type: "button", text: B.fa(d), "aria-label": B.fa(d) });
        k.addEventListener("click", function () { onDigit(d, null); });
        if (E.draggable) E.draggable(k, function (t) { onDigit(d, t); });
        pad.appendChild(k);
      })(d);
    }
    if (onBack) pad.appendChild(el("button", { class: "m2-key back", type: "button", text: "⌫", "aria-label": B.t("m2Back"), onclick: onBack }));
    function key(e) {
      if (!pad.isConnected) { document.removeEventListener("keydown", key); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      var i = "0123456789".indexOf(e.key), j = "۰۱۲۳۴۵۶۷۸۹".indexOf(e.key);
      if (i === -1) i = j;
      if (i !== -1) { e.preventDefault(); onDigit(i, null); }
      else if (e.key === "Backspace" && onBack) { e.preventDefault(); onBack(); }
    }
    document.addEventListener("keydown", key);
    box.appendChild(pad);
    return pad;
  }

  /* A number written with the digit keys into a box, then checked with «درست است». want: the number. Used for the
     parts of an area model. onRight(first) when right; after two misses the number is shown in the box. */
  function numberEntry(box, want, label, onRight) {
    var shown = el("span", { class: "m2-entry", dir: "ltr", "aria-live": "polite", "aria-label": label });
    shown.dataset.drop = "";
    var typed = "";
    function draw() { shown.textContent = typed ? B.fa(typed) : "…"; }
    draw();
    box.appendChild(row([shown]));
    var pad = digitPad(box, function (d) {
      if (typed.length >= String(want).length + 1) return;
      typed = typed === "0" ? String(d) : typed + d;
      draw();
      chk.clear();
    }, function () { typed = typed.slice(0, -1); draw(); });
    var chk = checkButton(box, B.t("m2Check"), function () {
      if (+typed === want) return "";
      return typed ? B.t(+typed < want ? "m2More" : "m2Less") : B.t("m2Write");
    }, function (fb) {
      typed = String(want);
      draw();
      shown.classList.add("show");
      fb.say(B.t("m2ShowNumber"));
    }, function (first) {
      pad.remove();
      chk.row.remove();
      shown.classList.add("done");
      onRight(first);
    });
    return shown;
  }

  // ---------- bar: the bar model ----------

  /* One bar model, s or one of s.models: bars [{ label, pic, parts }] where a part is a number, "?" (the unknown,
     as long as s.answer) or { n, text, shade } (n: its length; text: what is written in it, "" for nothing).
     braces [{ bar, from, to, text, below }] (parts from … to of a bar, default all) or { rows: true, text } (the
     bars together, on their right). Shortcuts: whole (a brace over all of bar 0), diff (the shorter of the first two
     bars gets an empty part as long as the difference, with a brace), total (a brace over all the bars). */
  function barText(t) { return t === "?" || t === "؟" ? "؟" : typeof t === "number" ? B.fa(t) : String(t); }
  function barModel(m, answer) {
    var bars = m.bars.map(function (b) {
      return { label: b.label, pic: b.pic, parts: b.parts.map(function (p) {
        if (typeof p === "number") return { n: p, text: p };
        if (p === "?") return { n: answer, text: "?" };
        return { n: p.n != null ? p.n : answer, text: p.text != null ? p.text : p.n != null ? p.n : "?", shade: p.shade };
      }) };
    });
    var braces = (m.braces || []).map(function (b) { return Object.assign({}, b); });
    var len = function (b) { return sum(b.parts.map(function (p) { return p.n; })); };
    if (m.whole != null) braces.push({ bar: 0, text: m.whole });
    if (m.diff != null && bars.length > 1) {
      var short = len(bars[0]) < len(bars[1]) ? 0 : 1, gap = Math.abs(len(bars[0]) - len(bars[1]));
      bars[short].parts.push({ n: gap, text: "", gap: true });
      braces.push({ bar: short, from: bars[short].parts.length - 1, text: m.diff });
    }
    if (m.total != null) braces.push({ rows: true, text: m.total });
    var max = Math.max.apply(null, bars.map(len)) || 1;
    var slots = [];
    function brace(b, below) {
      var parts = bars[b.bar || 0].parts, from = b.from || 0, to = b.to != null ? b.to : parts.length - 1;
      var start = sum(parts.slice(0, from).map(function (p) { return p.n; }));
      var size = sum(parts.slice(from, to + 1).map(function (p) { return p.n; }));
      var svg = svgEl("svg", { class: "bm-curl", viewBox: "0 0 100 12", preserveAspectRatio: "none", "aria-hidden": "true" });
      svg.appendChild(svgEl("path", { d: "M1 12 Q1 6 6 6 L44 6 Q50 6 50 1 Q50 6 56 6 L94 6 Q99 6 99 12", "vector-effect": "non-scaling-stroke" }));
      var t = el("span", { class: "bm-brace-text" });
      slots.push({ node: t, text: b.text });
      return el("div", { class: "bm-brace" + (below ? " below" : ""), style: "left:" + (start / max * 100) + "%;width:" + (size / max * 100) + "%" }, below ? [svg, t] : [t, svg]);
    }
    var rows = bars.map(function (b, i) {
      var top = el("div", { class: "bm-braces" }), bottom = el("div", { class: "bm-braces below" });
      braces.forEach(function (x) { if (!x.rows && (x.bar || 0) === i) (x.below ? bottom : top).appendChild(brace(x, x.below)); });
      var bar = el("div", { class: "bm-bar" });
      b.parts.forEach(function (p) {
        var part = el("span", { class: "bm-part" + (p.shade ? " shade" : "") + (p.gap ? " gap" : ""), style: "width:" + (p.n / max * 100) + "%" });
        if (p.text !== "" && p.text != null) {
          var t = el("span", { class: "bm-text" });
          slots.push({ node: t, text: p.text });
          part.appendChild(t);
        }
        bar.appendChild(part);
      });
      return el("div", { class: "bm-row" }, [
        el("span", { class: "bm-label" }, [b.pic ? el("span", { class: "bm-pic", "aria-hidden": "true", text: b.pic }) : null, b.label ? el("span", { text: b.label }) : null]),
        el("div", { class: "bm-track" + (top.children.length ? " top" : "") + (bottom.children.length ? " bottom" : "") }, [top, bar, bottom])
      ]);
    });
    var all = braces.filter(function (x) { return x.rows; })[0], side = null;
    if (all) {
      var t = el("span", { class: "bm-brace-text" });
      slots.push({ node: t, text: all.text });
      var svg = svgEl("svg", { class: "bm-curl", viewBox: "0 0 12 100", preserveAspectRatio: "none", "aria-hidden": "true" });
      svg.appendChild(svgEl("path", { d: "M0 1 Q6 1 6 6 L6 44 Q6 50 11 50 Q6 50 6 56 L6 94 Q6 99 0 99", "vector-effect": "non-scaling-stroke" }));
      side = el("div", { class: "bm-side" }, [svg, t]);
    }
    var node = el("div", { class: "bm" + (side ? " with-side" : ""), dir: "ltr" }, [el("div", { class: "bm-rows" }, rows), side]);
    slots.forEach(function (x) { x.node.textContent = barText(x.text); x.unknown = barText(x.text) === "؟"; if (x.unknown) x.node.classList.add("unknown"); });
    return { node: node, slots: slots };
  }

  /* bars, braces, whole, diff, total (see barModel), prompt (the problem), say, then:
     - options and answer: what number goes in the «؟» (question, default «عدد جای ؟ چند است؟»); result: a line shown
       at the end («۴۵ − ۱۸ = ۲۷»);
     - mark: true first: the numbers are taken off the model and the child puts each back in its place (tap a number,
       then its place, or drag it); then the options, if any;
     - models: [{ bars, … }] with answer (the index): which model fits the problem? */
  E.steps.bar = function (s, box, done) {
    promptLine(box, s.prompt, s.say, s.audio);
    if (s.models) {
      box.appendChild(el("p", { class: s.prompt ? "hint" : "prompt", text: B.t("barPick") }));
      E.choice(box, { stack: true, answer: s.answer, options: s.models.map(function (m, i) {
        return { node: barModel(m, m.answer).node, value: i, aria: B.t("barModelAria", { n: B.fa(i + 1) }) };
      }) }, done);
      return;
    }
    var model = barModel(s, s.answer);
    box.appendChild(model.node);
    var end = el("div");
    box.appendChild(end);
    function solve(first) {
      if (s.options == null) { finishBar(); setTimeout(function () { done(true, first); }, 1100); return; }
      ending(end, {
        question: s.question || B.t("barSolve"), options: s.options, answer: s.answer,
        _onRight: finishBar
      }, done, first);
    }
    function finishBar() {
      model.slots.forEach(function (x) { if (x.unknown) { x.node.textContent = B.fa(s.answer); x.node.classList.add("solved"); } });
      if (s.result) { end.appendChild(mathLine(s.result, "m2-result")); }
    }
    if (!s.mark) { solve(true); return; }

    // Marking: every number (and the «؟») leaves the model; the child puts them back.
    end.appendChild(el("p", { class: "hint", text: B.t("barMark") }));
    var picked = null, misses = 0, left = model.slots.length;
    var fb = E.feedback(end);
    model.slots.forEach(function (x, i) {
      var b = el("button", { class: "bm-slot", type: "button", "aria-label": B.t("barSlot", { n: B.fa(i + 1) }) });
      b.dataset.drop = "";
      b._want = barText(x.text);
      x.node.textContent = "";
      x.node.appendChild(b);
      x.slot = b;
      b.addEventListener("click", function () { if (b.disabled) return; if (!picked) { fb.say(B.t("barMarkFirst")); return; } put(picked, b); });
    });
    var tray = el("div", { class: "tray bm-tray", dir: "ltr" });
    var tiles = shuffle(model.slots).map(function (x) {
      var t = el("button", { class: "tile-btn bm-tile", type: "button", "aria-pressed": "false" }, [el("span", { class: "face num", text: barText(x.text) })]);
      t._key = barText(x.text);
      t._miss = 0;
      t.setAttribute("aria-label", x.unknown ? B.t("barUnknown") : t._key);
      t.addEventListener("click", function () {
        if (t.disabled) return;
        if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
        picked = picked === t ? null : t;
        if (!picked) return;
        t.classList.add("picked");
        t.setAttribute("aria-pressed", "true");
        fb.say(B.t("barMarkNow"));
      });
      E.draggable(t, function (target) {
        var sl = target.closest(".bm-slot");
        if (!sl) return;
        if (picked && picked !== t) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
        picked = t;
        put(t, sl);
      });
      tray.appendChild(t);
      return t;
    });
    end.insertBefore(tray, end.firstChild.nextSibling);
    function put(t, sl) {
      if (sl.disabled) return;
      if (t._key !== sl._want) {
        misses++;
        t._miss++;
        E.bounce(sl);
        fb.tryAgain();
        if (t._miss >= 2) {
          var right = model.slots.find(function (x) { return !x.slot.disabled && x.slot._want === t._key; });
          if (right) right.slot.classList.add("show");
          fb.say(B.t("barMarkShow"));
        }
        return;
      }
      sl.textContent = t._key;
      sl.disabled = true;
      sl.classList.remove("show");
      sl.classList.add("filled");
      t.disabled = true;
      t.classList.remove("picked");
      t.classList.add("used");
      picked = null;
      left--;
      if (left) { fb.good(); var n = tiles.find(function (x) { return !x.disabled; }); if (n && document.activeElement === t) n.focus(); return; }
      tray.remove();
      end.firstChild.remove();
      model.slots.forEach(function (x) { x.node.textContent = barText(x.text); });
      if (s.options == null) { B.speak(fb.good()); finishBar(); setTimeout(function () { done(true, misses === 0); }, 1100); return; }
      fb.clear();
      solve(misses === 0);
    }
  };

  // ---------- column: written methods, digit by digit ----------

  // A math expression inside a Persian sentence keeps its left-to-right order.
  function ltr(t) { return "⁦" + t + "⁩"; }
  function decimals(v) { var m = /\.(\d+)/.exec(String(v)); return m ? m[1].length : 0; }
  function digits(n) { var d = []; do { d.push(n % 10); n = Math.floor(n / 10); } while (n > 0); return d; }
  function placeName(p, dec) {
    return p < dec ? B.T.colDecPlaces[dec - p - 1] : B.T.colPlaces[p - dec] || "";
  }
  var PIECE = ["stick", "bundle", "flat"];
  var BUNDLED = ["bundled", "bundledHundred"], OPENED = [null, "unbundled", "unbundledHundred"];
  function piece(p, cls) {
    var b = el("span", { class: PIECE[p] + (cls ? " " + cls : "") });
    if (p) for (var i = 0; i < 10; i++) b.appendChild(el("i"));
    return b;
  }

  /* op ("+", "-" or "×"), a, b (numbers; for + and − also decimals, written "12.5": the decimal points line up).
     The child writes the answer one digit at a time, from the ones (on the right): tap a digit key, drag it onto the
     box, or type it. A wrong digit bounces and names the column to look at again («یکان: ۷ + ۵ = ؟»); after two misses
     the digit is written in. Carrying and borrowing are written in the small row above (borrowed digits are crossed
     out), and, when bundles is not false and the numbers are under 1000, shown with sticks, bundles of ten and packs
     of a hundred next to it (a ten tied, a ten opened). × by a number of two or more digits writes one line per digit
     and then adds them. Optional prompt, say, and question, options, answer asked at the end. */
  E.steps.column = function (s, box, done) {
    var op = s.op === "-" || s.op === "−" ? "-" : s.op === "×" || s.op === "*" || s.op === "x" ? "×" : "+";
    var dec = op === "×" ? 0 : Math.max(decimals(s.a), decimals(s.b));
    var k = Math.pow(10, dec);
    var A = Math.round(parseFloat(s.a) * k), Bn = Math.round(parseFloat(s.b) * k);
    var res = op === "+" ? A + Bn : op === "-" ? A - Bn : A * Bn;
    var ad = digits(A), bd = digits(Bn);
    var len = function (n) { return Math.max(digits(n).length, dec + 1); };
    var partials = op === "×" && bd.length > 1 ? bd.map(function (d, i) { return A * d * Math.pow(10, i); }) : null;
    var W = Math.max(len(A), len(Bn), len(res)) + (op === "+" || partials ? 1 : 0);
    var bundles = s.bundles !== false && op !== "×" && !dec && Math.max(A, Bn, res) < 1000;

    promptLine(box, s.prompt || B.t("colPrompt"), s.say, s.audio);
    // The rows of the sum, each a line of cells from the highest place (left) to the ones (right).
    var sheet = el("div", { class: "col-sheet", dir: "ltr", role: "group", "aria-label": B.t("colAria") });
    function line(cls, sign) {
      var r = el("div", { class: "col-row " + (cls || "") }), cells = [];
      r.appendChild(el("span", { class: "col-cell sign", text: sign || "" }));
      for (var p = W - 1; p >= 0; p--) {
        if (dec && p === dec - 1) r.appendChild(el("span", { class: "col-cell sep", text: cls.indexOf("carry") === -1 ? (B.inEnglish && B.inEnglish() ? "." : "/") : "" }));
        var c = el("span", { class: "col-cell" });
        cells[p] = c;
        r.appendChild(c);
      }
      sheet.appendChild(r);
      return cells;
    }
    function write(cells, n) {
      var d = digits(n), l = len(n);
      for (var p = 0; p < l; p++) cells[p].textContent = B.fa(d[p] || 0);
    }
    var carry = line("carry"), top = line("num"), low = line("num", op === "-" ? "−" : op);
    write(top, A);
    write(low, Bn);
    sheet.appendChild(el("div", { class: "col-rule" }));
    // Answer lines: one, or a line per digit of b and then their sum.
    var lines = [];
    if (partials) {
      partials.forEach(function () { lines.push(line("ans")); });
      sheet.appendChild(el("div", { class: "col-rule" }));
      lines.push(line("ans", "+"));
    } else lines.push(line("ans"));

    var mat = null, cnt = null;
    if (bundles) {
      cnt = [0, 1, 2].map(function () { return { n: 0, add: 0, gone: 0, done: false }; });
      for (var p = 0; p < 3; p++) { cnt[p].n = ad[p] || 0; if (op === "+") cnt[p].add = bd[p] || 0; }
      mat = el("div", { class: "col-mat", dir: "ltr", "aria-hidden": "true" });
    }
    var places = Math.max(len(A), len(res), op === "+" ? len(Bn) : 0);
    function drawMat() {
      if (!mat) return;
      mat.innerHTML = "";
      var topP = Math.min(2, Math.max(places, len(Bn)) - 1);
      for (var p = topP; p >= 0; p--) {
        var c = cnt[p], col = el("div", { class: "col-mat-col" + (c.done ? " done" : "") });
        var pile = el("div", { class: "col-pile p" + p });
        for (var i = 0; i < c.n; i++) pile.appendChild(piece(p));
        for (i = 0; i < c.add; i++) pile.appendChild(piece(p, "add"));
        for (i = 0; i < c.gone; i++) pile.appendChild(piece(p, "gone"));
        col.appendChild(pile);
        col.appendChild(el("span", { class: "col-mat-name", text: placeName(p, 0) }));
        mat.appendChild(col);
      }
    }
    box.appendChild(mat ? el("div", { class: "col-wrap" }, [sheet, mat]) : el("div", { class: "col-wrap" }, [sheet]));
    drawMat();
    var note = el("p", { class: "hint col-note", "aria-live": "polite" });
    box.appendChild(note);

    // The tasks: one digit each, with a hint for a miss, and what happens before (borrowing) and after (carrying).
    var tasks = [];
    function terms(list) { return ltr(list.join(" ") + " = ؟"); }
    if (op === "+") {
      var c = 0, L = len(res);
      for (var p2 = 0; p2 < L; p2++) {
        (function (p, x, y, cin) {
          var t = x + y + cin, ex = [];
          if (p < len(A)) ex.push(B.fa(x));
          if (p < len(Bn)) ex.push((ex.length ? "+ " : "") + B.fa(y));
          if (cin) ex.push((ex.length ? "+ " : "") + B.fa(cin));
          tasks.push({ cells: lines[0], p: p, want: t % 10, hint: B.t("colHint", { place: placeName(p, dec), expr: terms(ex) }),
            after: function () {
              if (cnt && p < 3) { cnt[p].n += cnt[p].add; cnt[p].add = 0; cnt[p].done = true; }
              if (t >= 10) {
                carry[p + 1].textContent = B.fa(Math.floor(t / 10));
                carry[p + 1].classList.add("on");
                if (cnt && p < 2) { cnt[p].n -= 10; cnt[p + 1].n += 1; note.textContent = B.t(BUNDLED[p]) + " " + B.t("colCarry", { n: B.fa(t), d: B.fa(t % 10), next: placeName(p + 1, dec) }); }
                else note.textContent = B.t("colCarry", { n: B.fa(t), d: B.fa(t % 10), next: placeName(p + 1, dec) });
              } else note.textContent = "";
              drawMat();
            } });
          c = Math.floor(t / 10);
        })(p2, ad[p2] || 0, bd[p2] || 0, c);
      }
    } else if (op === "-") {
      var cur = []; for (var q = 0; q < W; q++) cur.push(ad[q] || 0);
      var L2 = len(res);
      for (var p3 = 0; p3 < L2; p3++) {
        (function (p) {
          var y = bd[p] || 0, task = { cells: lines[0], p: p };
          task.before = function () {
            if (cur[p] >= y) return;
            var j = p + 1;
            while (!cur[j]) j++;
            note.textContent = B.t("colBorrow", { a: B.fa(cur[p]), b: B.fa(y), from: placeName(j, dec) });
            cur[j]--;
            if (cnt && j < 3) { cnt[j].n--; }
            for (var m = j - 1; m > p; m--) { cur[m] = 9; if (cnt && m < 3) cnt[m].n += 9; }
            cur[p] += 10;
            if (cnt) { cnt[p].n += 10; note.textContent += " " + B.t(OPENED[j]); }
            for (m = j; m >= p; m--) { top[m].classList.add("struck"); carry[m].textContent = B.fa(cur[m]); carry[m].classList.add("on"); }
            drawMat();
          };
          task.want = function () { return cur[p] - y; };
          task.hint = function () { return B.t("colHint", { place: placeName(p, dec), expr: terms([B.fa(cur[p]), "− " + B.fa(y)]) }); };
          task.after = function () { if (cnt && p < 3) { cnt[p].n -= y; cnt[p].gone = y; cnt[p].done = true; drawMat(); } };
          tasks.push(task);
        })(p3);
      }
    } else {
      // ×: each digit of b times a, from the ones; then the lines are added.
      (partials ? bd : [Bn]).forEach(function (m, i) {
        var cells = lines[i], c2 = 0, L3 = len(A * m) + i;
        for (var z = 0; z < i; z++) { cells[z].textContent = B.fa(0); cells[z].classList.add("zero"); }
        for (var p4 = i; p4 < L3; p4++) {
          (function (p, x, cin) {
            var t = x * m + cin, ex = [];
            if (p - i < ad.length) ex.push(B.fa(x) + " × " + B.fa(m));
            if (cin) ex.push((ex.length ? "+ " : "") + B.fa(cin));
            tasks.push({ cells: cells, p: p, want: t % 10, hint: B.t("colHint", { place: placeName(p, 0), expr: terms(ex) }),
              before: p === i && i > 0 ? function () { carry.forEach(function (x) { x.textContent = ""; x.classList.remove("on"); }); note.textContent = B.t("colNextLine", { d: B.fa(m), place: placeName(i, 0) }); } : null,
              after: function () {
                if (t >= 10 && p + 1 < L3) { carry[p + 1].textContent = B.fa(Math.floor(t / 10)); carry[p + 1].classList.add("on"); }
              } });
            c2 = Math.floor(t / 10);
          })(p4, ad[p4 - i] || 0, c2);
        }
      });
      if (partials) {
        var c3 = 0, L4 = len(res);
        for (var p5 = 0; p5 < L4; p5++) {
          (function (p, cin) {
            var ds = partials.map(function (v) { return digits(v)[p] || 0; }), t = sum(ds) + cin;
            var ex = partials.filter(function (v) { return p < len(v); }).map(function (v, i) { return (i ? "+ " : "") + B.fa(digits(v)[p] || 0); });
            if (cin) ex.push("+ " + B.fa(cin));
            tasks.push({ cells: lines[lines.length - 1], p: p, want: t % 10, hint: B.t("colHint", { place: placeName(p, 0), expr: terms(ex) }),
              before: p === 0 ? function () { carry.forEach(function (x) { x.textContent = ""; x.classList.remove("on"); }); note.textContent = B.t("colAddLines"); } : null,
              after: function () { if (t >= 10 && p + 1 < L4) { carry[p + 1].textContent = B.fa(Math.floor(t / 10)); carry[p + 1].classList.add("on"); } } });
            c3 = Math.floor(t / 10);
          })(p5, c3);
        }
      }
    }

    var fb = E.feedback(box), at = -1, misses = 0, here = 0, task = null;
    function val(v) { return typeof v === "function" ? v() : v; }
    function next() {
      if (task) { task.cells[task.p].classList.remove("now"); delete task.cells[task.p].dataset.drop; }
      at++;
      here = 0;
      if (at >= tasks.length) { finishCol(); return; }
      task = tasks[at];
      if (task.before) task.before();
      var cell = task.cells[task.p];
      cell.classList.add("now");
      cell.dataset.drop = "";
      cell.setAttribute("aria-label", B.t("colNow", { place: placeName(task.p, dec) }));
    }
    function put(d) {
      if (!task || at >= tasks.length) return;
      var cell = task.cells[task.p];
      if (d === val(task.want)) {
        cell.textContent = B.fa(d);
        cell.classList.add("ok");
        fb.clear();
        if (task.after) task.after();
        next();
        return;
      }
      misses++;
      here++;
      E.bounce(cell);
      fb.tryAgain(B.t("colLook") + " " + val(task.hint));
      if (here >= 2) {
        cell.textContent = B.fa(val(task.want));
        cell.classList.add("show");
        fb.say(B.t("colShow", { place: placeName(task.p, dec) }));
        if (task.after) task.after();
        next();
      }
    }
    var pad = digitPad(box, function (d) { put(d); });
    function finishCol() {
      task = null;
      pad.remove();
      var line2 = s.result || B.fa(String(s.a)).replace(".", "/") + " " + (op === "-" ? "−" : op) + " " + B.fa(String(s.b)).replace(".", "/") + " = " + (dec ? decText(res / k) : B.fa(res));
      if (B.inEnglish && B.inEnglish()) line2 = line2.replace(/\//g, ".");
      box.insertBefore(mathLine(line2, "m2-result"), note);
      B.speak(fb.good());
      ending(box, s, done, misses === 0);
    }
    fb.say(B.t("colStart"));
    next();
  };

  // ---------- array: rows × columns ----------

  // An array of rows × cols things (thing: an emoji, default a dot); gaps: rows after which a gap is left.
  function arrayNode(rows, cols, thing, gaps, gapCols) {
    var g = el("div", { class: "arr", dir: "ltr", role: "img", "aria-label": B.t("arrAria", { r: B.fa(rows), c: B.fa(cols) }) });
    for (var r = 0; r < rows; r++) {
      var line = el("div", { class: "arr-row" + (gaps && gaps.indexOf(r + 1) !== -1 && r + 1 < rows ? " gap" : "") });
      for (var c = 0; c < cols; c++) {
        line.appendChild(thing ? el("span", { class: "arr-thing" + (gapCols && gapCols.indexOf(c + 1) !== -1 ? " gap" : ""), text: thing })
          : el("i", { class: "arr-dot" + (gapCols && gapCols.indexOf(c + 1) !== -1 ? " gap" : "") }));
      }
      g.appendChild(line);
    }
    return g;
  }
  function times(a, b, c) { return B.fa(a) + " × " + B.fa(b) + (c != null ? " = " + B.fa(c) : ""); }

  /* rows, cols, thing (an emoji; default a dot), prompt, say, then ask:
     - "count" (the default): how many? options, answer (default rows × cols), question; turn: true adds a button that
       turns the array (۳ × ۴ becomes ۴ × ۳, and the number stays the same); the sum «۳ × ۴ = ۱۲» is shown at the end;
     - "build": make an array of rows × cols (or any array of n things) in an empty grid of max [rows, cols] (default
       10 × 10): tap or drag to the last thing, or move the corner with the arrow keys; then «درست است؟»;
     - "split": tap a line between two rows to split the array (split: the rows in the first part, if it must be
       there); both parts and their sum are written («۵ × ۶ + ۲ × ۶ = ۳۰ + ۱۲ = ۴۲»); then the question, if any;
     - "area": the area model: rows and cols are numbers or lists of parts (cols: [20, 3] for ۲۳); the child writes the
       number of each part, then the whole (tap the digit keys or type); the parts' sum is written at the end. */
  E.steps.array = function (s, box, done) {
    var ask = s.ask || "count";
    if (ask === "area") return areaModel(s, box, done);
    if (ask === "build") return buildArray(s, box, done);
    promptLine(box, s.prompt || B.t(ask === "split" ? "arrSplit" : "arrCount"), s.say, s.audio);
    var rows = s.rows, cols = s.cols, stage = el("div", { class: "arr-stage" });
    box.appendChild(stage);
    if (ask === "split") return splitArray(s, box, done, stage);
    var turned = false;
    function draw() { stage.innerHTML = ""; stage.appendChild(arrayNode(turned ? cols : rows, turned ? rows : cols, s.thing)); }
    draw();
    var eq = el("p", { class: "math-big m2-result", dir: "ltr" });
    if (s.turn) {
      box.appendChild(row([el("button", { class: "btn secondary", type: "button", text: B.t("arrTurn"), onclick: function () {
        turned = !turned;
        stage.classList.remove("turning"); void stage.offsetWidth; stage.classList.add("turning");
        draw();
        if (eq.textContent) eq.textContent = times(turned ? cols : rows, turned ? rows : cols, rows * cols);
      } })]));
    }
    box.appendChild(eq);
    var q = el("div");
    box.appendChild(q);
    q.appendChild(el("p", { class: "prompt", text: s.question || B.t("arrHowMany") }));
    E.choice(q, { options: options(s.options), answer: s.answer != null ? s.answer : rows * cols, ltr: true, onRight: function () {
      eq.textContent = times(turned ? cols : rows, turned ? rows : cols, rows * cols);
      B.speak(eq.textContent);
    } }, done);
  };

  function splitArray(s, box, done, stage) {
    var rows = s.rows, cols = s.cols, misses = 0, at = null;
    var hint = el("p", { class: "hint", text: B.t("arrSplitHint") });
    box.appendChild(hint);
    var eq = el("div", { class: "arr-eq", dir: "ltr" });
    box.appendChild(eq);
    var fb = E.feedback(box);
    function draw() {
      stage.innerHTML = "";
      var g = arrayNode(rows, cols, s.thing, at ? [at] : null);
      // Between the rows, lines that are buttons: tap one to split there.
      if (!at) {
        var rowsEls = g.querySelectorAll(".arr-row");
        for (var r = 1; r < rows; r++) {
          (function (r) {
            var b = el("button", { class: "arr-cut", type: "button", "aria-label": B.t("arrCutAria", { a: B.fa(r), b: B.fa(rows - r) }) });
            b.addEventListener("click", function () { cut(r, b); });
            g.insertBefore(b, rowsEls[r]);
          })(r);
        }
      }
      stage.appendChild(g);
    }
    function cut(r, b) {
      if (at) return;
      if (s.split && r !== s.split) {
        misses++;
        E.bounce(b);
        fb.tryAgain(B.t("arrSplitTry", { n: B.fa(s.split) }));
        if (misses >= 2) { stage.querySelectorAll(".arr-cut")[s.split - 1].classList.add("show"); fb.say(B.t("arrSplitShow")); }
        return;
      }
      at = r;
      draw();
      hint.remove();
      var a = r * cols, b2 = (rows - r) * cols;
      eq.appendChild(el("p", { class: "math-big", text: times(r, cols, a) }));
      eq.appendChild(el("p", { class: "math-big", text: times(rows - r, cols, b2) }));
      eq.appendChild(el("p", { class: "math-big m2-result", text: times(rows, cols) + " = " + B.fa(a) + " + " + B.fa(b2) + " = " + B.fa(a + b2) }));
      B.speak(fb.good());
      ending(box, s, done, misses === 0);
    }
    draw();
  }

  function buildArray(s, box, done) {
    var want = s.rows && s.cols ? [s.rows, s.cols] : null, n = s.n;
    promptLine(box, s.prompt || (want ? B.t("arrBuild", { r: B.fa(want[0]), c: B.fa(want[1]) }) : B.t("arrBuildN", { n: B.fa(n) })), s.say, s.audio);
    var max = s.max || [10, 10], R = 0, C = 0;
    var grid = el("div", { class: "arr arr-build", dir: "ltr", tabindex: "0", role: "group", "aria-label": B.t("arrBuildAria") });
    var cells = [];
    for (var r = 0; r < max[0]; r++) {
      var line = el("div", { class: "arr-row" });
      for (var c = 0; c < max[1]; c++) {
        var cell = el("span", { class: "arr-cell" });
        cell.dataset.r = r + 1;
        cell.dataset.c = c + 1;
        cells.push(cell);
        line.appendChild(cell);
      }
      grid.appendChild(line);
    }
    var out = el("p", { class: "hint", "aria-live": "polite" });
    function set(r, c) {
      R = Math.max(0, Math.min(max[0], r));
      C = Math.max(0, Math.min(max[1], c));
      cells.forEach(function (x) { x.classList.toggle("on", +x.dataset.r <= R && +x.dataset.c <= C); x.classList.toggle("corner", +x.dataset.r === R && +x.dataset.c === C); });
      out.textContent = R && C ? B.t("arrNow", { r: B.fa(R), c: B.fa(C), n: B.fa(R * C) }) : "";
      chk.clear();
    }
    function at(e) { var t = document.elementFromPoint(e.clientX, e.clientY); return t && t.closest && t.closest(".arr-cell"); }
    var down = false;
    grid.addEventListener("pointerdown", function (e) { var x = at(e); if (!x) return; down = true; try { grid.setPointerCapture(e.pointerId); } catch (er) { /* gone */ } set(+x.dataset.r, +x.dataset.c); });
    grid.addEventListener("pointermove", function (e) { if (!down) return; var x = at(e); if (x) set(+x.dataset.r, +x.dataset.c); });
    grid.addEventListener("pointerup", function () { down = false; });
    grid.addEventListener("pointercancel", function () { down = false; });
    grid.addEventListener("keydown", function (e) {
      var d = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[e.key];
      if (!d) return;
      e.preventDefault();
      set(Math.max(1, R + d[0]), Math.max(1, C + d[1]));
    });
    box.appendChild(el("div", { class: "arr-stage" }, [grid]));
    box.appendChild(out);
    box.appendChild(el("p", { class: "hint", text: B.t("arrBuildHint") }));
    var chk = checkButton(box, B.t("m2Check"), function () {
      if (!R || !C) return B.t("arrBuildEmpty");
      if (want) {
        if ((R === want[0] && C === want[1]) || (s.turned !== false && R === want[1] && C === want[0])) return "";
        if (R !== want[0] && C !== want[1]) return B.t("arrBuildBoth", { r: B.fa(want[0]), c: B.fa(want[1]) });
        return R !== want[0] ? B.t("arrBuildRows", { r: B.fa(want[0]) }) : B.t("arrBuildCols", { c: B.fa(want[1]) });
      }
      return R * C === n ? "" : B.t(R * C < n ? "arrBuildMore" : "arrBuildLess", { n: B.fa(R * C) });
    }, function (fb) {
      if (want) { set(want[0], want[1]); fb.say(B.t("arrBuildShow")); }
      else fb.say(B.t("arrBuildShowN", { n: B.fa(n) }));
    }, function (first) {
      box.insertBefore(mathLine(times(R, C, R * C), "m2-result"), out);
      ending(box, s, done, first);
    });
    set(0, 0);
  }

  function areaModel(s, box, done) {
    var rp = [].concat(s.rows), cp = [].concat(s.cols);
    var R = sum(rp), C = sum(cp);
    promptLine(box, s.prompt || B.t("arrArea", { r: B.fa(R), c: B.fa(C) }), s.say, s.audio);
    var grid = el("div", { class: "arr-area", dir: "ltr", style: "grid-template-columns:auto " + cp.map(function (c) { return c + "fr"; }).join(" ") + ";grid-template-rows:auto " + rp.map(function (r) { return r + "fr"; }).join(" ") });
    grid.appendChild(el("span"));
    cp.forEach(function (c) { grid.appendChild(el("span", { class: "arr-area-side top", text: B.fa(c) })); });
    var parts = [];
    rp.forEach(function (r, i) {
      grid.appendChild(el("span", { class: "arr-area-side", text: B.fa(r) }));
      cp.forEach(function (c, j) {
        var cell = el("span", { class: "arr-area-part p" + ((i + j) % 4), text: "؟" });
        parts.push({ node: cell, r: r, c: c });
        grid.appendChild(cell);
      });
    });
    box.appendChild(el("div", { class: "arr-stage" }, [grid]));
    var lines = el("div", { class: "arr-eq", dir: "ltr" });
    box.appendChild(lines);
    var work = el("div");
    box.appendChild(work);
    var first = true, i = -1;
    function nextPart() {
      i++;
      work.innerHTML = "";
      parts.forEach(function (p) { p.node.classList.remove("now"); });
      if (i < parts.length) {
        var p = parts[i];
        p.node.classList.add("now");
        work.appendChild(el("p", { class: "prompt", dir: "ltr", text: times(p.r, p.c) + " = ؟" }));
        numberEntry(work, p.r * p.c, times(p.r, p.c), function (f) {
          first = first && f;
          p.node.textContent = B.fa(p.r * p.c);
          p.node.classList.add("done");
          lines.appendChild(el("p", { class: "math-big", text: times(p.r, p.c, p.r * p.c) }));
          setTimeout(nextPart, 700);
        });
        return;
      }
      if (parts.length === 1) { finishArea(); return; }
      work.appendChild(el("p", { class: "prompt", text: B.t("arrAreaAll") }));
      work.appendChild(el("p", { class: "prompt", dir: "ltr", text: parts.map(function (p) { return B.fa(p.r * p.c); }).join(" + ") + " = ؟" }));
      numberEntry(work, R * C, B.t("arrAreaAll"), function (f) { first = first && f; finishArea(); });
    }
    function finishArea() {
      work.innerHTML = "";
      lines.appendChild(el("p", { class: "math-big m2-result", text: times(R, C) + " = " + (parts.length > 1 ? parts.map(function (p) { return B.fa(p.r * p.c); }).join(" + ") + " = " : "") + B.fa(R * C) }));
      B.speak(E.pick(B.T.praise));
      ending(box, s, done, first);
    }
    nextPart();
  }
  // ---------- grid: a squared grid ----------

  /* A question about a number the child found (an area, a perimeter): options and answer if given, else the child
     writes it with the digit keys. */
  function askNumber(box, s, want, defQuestion, done, first) {
    if (s.options) { ending(box, { question: s.question || defQuestion, options: s.options, answer: s.answer != null ? s.answer : want }, done, first); return; }
    var q = el("div", { class: "m2-question" });
    box.appendChild(q);
    q.appendChild(el("p", { class: "prompt", text: s.question || defQuestion }));
    B.speak(s.question || defQuestion);
    numberEntry(q, s.answer != null ? s.answer : want, s.question || defQuestion, function (f) { setTimeout(function () { done(true, first && f); }, 900); });
  }
  var DIRS = { up: [0, 1], right: [1, 0], down: [0, -1], left: [-1, 0] }, TURN = ["up", "right", "down", "left"];
  function key2(c) { return c[0] + "," + c[1]; }
  // The outline of a set of cells: the sides of cells with no cell next to them, as [x1, y1, x2, y2] in grid lines.
  function outlineOf(cells) {
    var has = {}, edges = [];
    cells.forEach(function (c) { has[key2(c)] = true; });
    cells.forEach(function (c) {
      var x = c[0] - 1, y = c[1] - 1;
      if (!has[key2([c[0], c[1] - 1])]) edges.push([x, y, x + 1, y]);
      if (!has[key2([c[0] + 1, c[1]])]) edges.push([x + 1, y, x + 1, y + 1]);
      if (!has[key2([c[0], c[1] + 1])]) edges.push([x + 1, y + 1, x, y + 1]);
      if (!has[key2([c[0] - 1, c[1]])]) edges.push([x, y + 1, x, y]);
    });
    // In walking order, so Enter counts them one after another around the shape.
    var out = [edges.shift()];
    while (edges.length) {
      var last = out[out.length - 1];
      var i = edges.findIndex(function (e) { return e[0] === last[2] && e[1] === last[3]; });
      out.push(edges.splice(i === -1 ? 0 : i, 1)[0]);
    }
    return out;
  }

  /* size [columns, rows] (default [8, 6]). Squares are [column, row], counted from 1 at the bottom left. With axes: true
     the lines are numbered from 0 and points are [x, y] where lines cross (origin: [x, y], where 0 is in the grid
     lines, for negative numbers). labels: true numbers the columns and rows. Then ask:
     - "area": cells (a shape); the child taps each square to count it, then says the area (options, or writes it);
     - "perimeter": cells; the child taps each side around the shape to count it, then says the perimeter;
     - "draw": the child colours squares (tap, or drag over them) until the shape has area n (area), is a rectangle
       rect [w, h], and/or has perimeter p (perimeter); then «درست است؟». show: "perimeter" also counts the sides;
     - "find": tap the square at [column, row] (or the point at [x, y] with axes);
     - "plot" (axes): tap points [[x, y], …] in order; join: true draws lines between them (close: true closes the shape);
     - "read": mark [x, y] (pic: what is there) and options, answer (question): where is it?
     - "move": piece { cells: [[c, r], …] or at: [c, r], pic, dir } and goal { cells or at, dir }: move it with the
       arrow buttons (or keys, or drag it); turn: true adds quarter turns (a shape turns about its first square, a robot
       turns to face up, right, down or left). Then «درست است؟».
     Optional prompt, say, cells to show in every mode (a shape), and question, options, answer. */
  E.steps.grid = function (s, box, done) {
    var ask = s.ask || (s.points ? "plot" : s.piece ? "move" : s.at ? "find" : s.mark ? "read" : s.cells ? "area" : "draw");
    var size = typeof s.size === "number" ? [s.size, s.size] : s.size || [8, 6], W = size[0], H = size[1], U = 40, axes = !!s.axes, org = s.origin || [0, 0];
    var lab = axes || s.labels || ask === "find";
    var ML = lab ? 34 : 10, MB = lab ? 30 : 10, MT = 12, MR = 12;
    var VW = ML + W * U + MR, VH = MT + H * U + MB;
    var defPrompt = {
      area: B.t("gridArea"), perimeter: B.t("gridPerimeter"), read: B.t("gridRead"),
      draw: s.rect ? B.t("gridDrawRect", { w: B.fa(s.rect[0]), h: B.fa(s.rect[1]) }) : s.perimeter != null ? B.t("gridDrawPerimeter", { n: B.fa(s.perimeter) })
        : s.area != null ? B.t("gridDrawArea", { n: B.fa(s.area) }) : B.t("gridDraw"),
      find: s.at ? (axes ? B.t("gridFindPoint", { p: pt(s.at) }) : B.t("gridFindCell", { c: B.fa(s.at[0]), r: B.fa(s.at[1]) })) : "",
      plot: B.t("gridPlot"), move: s.piece && s.piece.pic ? B.t("gridMove", { pic: s.piece.pic }) : B.t("gridMoveShape")
    }[ask];
    promptLine(box, s.prompt || defPrompt, s.say, s.audio);
    var svg = svgEl("svg", { class: "grid-svg", viewBox: "0 0 " + VW + " " + VH, tabindex: "0", role: "application", "aria-label": B.t("gridAria") });
    function X(x) { return ML + x * U; }
    function Y(y) { return MT + (H - y) * U; }
    function pt(p) { return ltr("(" + B.fa(p[0]) + B.t("gridComma") + B.fa(p[1]) + ")"); }
    function add(parent, tag, attrs, text) { var e = svgEl(tag, attrs, text); parent.appendChild(e); return e; }
    var gFill = add(svg, "g", {}), gLines = add(svg, "g", { class: "grid-lines" }), gJoin = add(svg, "g", {}), gMarks = add(svg, "g", {}), gTop = add(svg, "g", {});
    for (var i = 0; i <= W; i++) add(gLines, "line", { x1: X(i), y1: Y(0), x2: X(i), y2: Y(H), class: axes && i === org[0] ? "axis" : "" });
    for (var j = 0; j <= H; j++) add(gLines, "line", { x1: X(0), y1: Y(j), x2: X(W), y2: Y(j), class: axes && j === org[1] ? "axis" : "" });
    if (axes) {
      for (i = 0; i <= W; i++) add(gLines, "text", { x: X(i), y: Y(0) + 20, class: "grid-num" }, B.fa(i - org[0]));
      for (j = 0; j <= H; j++) if (j !== org[1] || org[0] !== 0) add(gLines, "text", { x: X(0) - 14, y: Y(j) + 5, class: "grid-num" }, B.fa(j - org[1]));
    } else if (lab) {
      for (i = 1; i <= W; i++) add(gLines, "text", { x: X(i - 0.5), y: Y(0) + 20, class: "grid-num" }, B.fa(i));
      for (j = 1; j <= H; j++) add(gLines, "text", { x: X(0) - 14, y: Y(j - 0.5) + 5, class: "grid-num" }, B.fa(j));
    }
    function cellRect(c, cls, parent) { return add(parent || gFill, "rect", { x: X(c[0] - 1), y: Y(c[1]), width: U, height: U, class: cls }); }
    function cellText(c, t, cls) { return add(gMarks, "text", { x: X(c[0] - 0.5), y: Y(c[1] - 0.5) + 6, class: cls || "grid-count" }, t); }
    function dot(p, cls) { return add(gMarks, "circle", { cx: X(p[0] + org[0]), cy: Y(p[1] + org[1]), r: 8, class: cls || "grid-pt" }); }
    // Where the pointer is, in grid units.
    function local(e) {
      var m = svg.getScreenCTM(), p = svg.createSVGPoint();
      p.x = e.clientX; p.y = e.clientY;
      p = p.matrixTransform(m.inverse());
      return [(p.x - ML) / U, H - (p.y - MT) / U];
    }
    function cellAt(g) { var c = [Math.floor(g[0]) + 1, Math.floor(g[1]) + 1]; return c[0] >= 1 && c[0] <= W && c[1] >= 1 && c[1] <= H ? c : null; }
    function pointAt(g) {
      var x = Math.round(g[0]), y = Math.round(g[1]);
      if (Math.hypot(g[0] - x, g[1] - y) > 0.42 || x < 0 || x > W || y < 0 || y > H) return null;
      return [x - org[0], y - org[1]];
    }
    // A keyboard cursor: arrow keys move it, Enter or Space taps where it is.
    var cursor = null, cur = axes ? [0, 0] : [1, 1];
    function showCursor() {
      if (!cursor) cursor = add(gTop, axes ? "circle" : "rect", { class: "grid-cursor" });
      if (axes) { cursor.setAttribute("cx", X(cur[0] + org[0])); cursor.setAttribute("cy", Y(cur[1] + org[1])); cursor.setAttribute("r", 13); }
      else { cursor.setAttribute("x", X(cur[0] - 1) + 3); cursor.setAttribute("y", Y(cur[1]) + 3); cursor.setAttribute("width", U - 6); cursor.setAttribute("height", U - 6); }
      svg.setAttribute("aria-label", B.t("gridAria") + " — " + (axes ? pt(cur) : B.t("gridCellAria", { c: B.fa(cur[0]), r: B.fa(cur[1]) })));
    }
    var onTap = null, onKey = null;
    svg.addEventListener("keydown", function (e) {
      var d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (onKey && onKey(e, d)) { e.preventDefault(); return; }
      if (d) {
        e.preventDefault();
        var lo = axes ? [-org[0], -org[1]] : [1, 1], hi = axes ? [W - org[0], H - org[1]] : [W, H];
        cur = [Math.max(lo[0], Math.min(hi[0], cur[0] + d[0])), Math.max(lo[1], Math.min(hi[1], cur[1] + d[1]))];
        showCursor();
      } else if ((e.key === "Enter" || e.key === " ") && onTap) { e.preventDefault(); showCursor(); onTap(axes ? cur.slice() : cur.slice(), null); }
    });
    svg.addEventListener("focus", function () { var kb = true; try { kb = svg.matches(":focus-visible"); } catch (er) { /* old browser */ } if (kb && (!onKey || ask === "draw")) showCursor(); });
    box.appendChild(el("div", { class: "grid-stage" }, [svg]));
    var info = el("p", { class: "hint", "aria-live": "polite" });
    box.appendChild(info);
    var shape = (s.cells || []).map(function (c) { return c.slice(); });
    if (ask !== "draw" && ask !== "move") shape.forEach(function (c) { cellRect(c, "grid-shape"); });
    var misses = 0;

    if (ask === "area") {
      var counted = {}, n = 0;
      info.textContent = B.t("gridTapEach");
      var tapArea = function (c) {
        if (!c || counted[key2(c)] || !shape.some(function (x) { return key2(x) === key2(c); })) return;
        counted[key2(c)] = true;
        n++;
        cellText(c, B.fa(n));
        B.speak(B.NUMBER_WORDS[n] || B.fa(n));
        if (n === shape.length) { onTap = null; info.textContent = B.t("gridCounted", { n: B.fa(n) }); askNumber(box, s, n, B.t("gridAreaAsk"), done, true); }
      };
      svg.addEventListener("click", function (e) { if (onTap) tapArea(cellAt(local(e))); });
      onTap = function () { tapArea(shape.find(function (x) { return !counted[key2(x)]; })); };
      onKey = function (e) { if (e.key === "Enter" || e.key === " ") { if (onTap) onTap(); return true; } return false; };
      return;
    }

    if (ask === "perimeter") {
      var edges = outlineOf(shape), got = 0;
      info.textContent = B.t("gridTapSides");
      var lines = edges.map(function (ed, k) {
        var g = add(gMarks, "g", { class: "grid-edge" });
        add(g, "line", { x1: X(ed[0]), y1: Y(ed[1]), x2: X(ed[2]), y2: Y(ed[3]), class: "grid-edge-hit" });
        add(g, "line", { x1: X(ed[0]), y1: Y(ed[1]), x2: X(ed[2]), y2: Y(ed[3]), class: "grid-edge-line" });
        g.addEventListener("click", function (e) { e.stopPropagation(); count(k); });
        return g;
      });
      var count = function (k) {
        var g = lines[k];
        if (!g || g.classList.contains("on")) return;
        got++;
        g.classList.add("on");
        var ed = edges[k], nx = (ed[0] + ed[2]) / 2, ny = (ed[1] + ed[3]) / 2, out = [ed[3] - ed[1], ed[0] - ed[2]];
        add(g, "text", { x: X(nx + out[0] * 0.28), y: Y(ny + out[1] * 0.28) + 5, class: "grid-edge-n" }, B.fa(got));
        B.speak(B.NUMBER_WORDS[got] || B.fa(got));
        if (got === edges.length) { onTap = null; info.textContent = B.t("gridSidesCounted", { n: B.fa(got) }); askNumber(box, s, got, B.t("gridPerimeterAsk"), done, true); }
      };
      onKey = function (e) { if (e.key !== "Enter" && e.key !== " ") return false; if (onTap) count(lines.findIndex(function (g) { return !g.classList.contains("on"); })); return true; };
      onTap = function () {};
      return;
    }

    if (ask === "draw") {
      var on = {}, painted = {};
      var cnt = function () { return Object.keys(on).length; };
      var list = function () { return Object.keys(on).map(function (k) { return k.split(",").map(Number); }); };
      var redraw = function () {
        gFill.innerHTML = "";
        list().forEach(function (c) { cellRect(c, "grid-on"); });
        var t = B.t("gridSquares", { n: B.fa(cnt()) });
        if ((s.perimeter != null || s.show === "perimeter") && cnt()) t += " " + B.t("gridSides", { n: B.fa(outlineOf(list()).length) });
        info.textContent = t;
        chk.clear();
      };
      var toggle = function (c, to) { if (!c) return; if (to) on[key2(c)] = true; else delete on[key2(c)]; redraw(); };
      var paint = null;
      svg.addEventListener("pointerdown", function (e) {
        var c = cellAt(local(e)); if (!c) return;
        paint = !on[key2(c)];
        try { svg.setPointerCapture(e.pointerId); } catch (er) { /* gone */ }
        toggle(c, paint);
      });
      svg.addEventListener("pointermove", function (e) { if (paint === null) return; var c = cellAt(local(e)); if (c && !!on[key2(c)] !== paint) toggle(c, paint); });
      svg.addEventListener("pointerup", function () { paint = null; });
      svg.addEventListener("pointercancel", function () { paint = null; });
      onTap = function (c) { toggle(c, !on[key2(c)]); };
      box.appendChild(el("p", { class: "hint", text: B.t("gridDrawHint") }));
      var isRect = function () {
        var cs = list(); if (!cs.length) return null;
        var xs = cs.map(function (c) { return c[0]; }), ys = cs.map(function (c) { return c[1]; });
        var w = Math.max.apply(null, xs) - Math.min.apply(null, xs) + 1, h = Math.max.apply(null, ys) - Math.min.apply(null, ys) + 1;
        return w * h === cs.length ? [w, h] : null;
      };
      var chk = checkButton(box, B.t("m2Check"), function () {
        var n2 = cnt();
        if (!n2) return B.t("gridDrawEmpty");
        if (s.rect) {
          var r = isRect();
          if (!r) return B.t("gridNotRect");
          if (!((r[0] === s.rect[0] && r[1] === s.rect[1]) || (r[0] === s.rect[1] && r[1] === s.rect[0]))) return B.t("gridRectSize", { w: B.fa(s.rect[0]), h: B.fa(s.rect[1]) });
        }
        if (s.area != null && n2 !== s.area) return B.t(n2 < s.area ? "gridMoreSquares" : "gridFewerSquares", { n: B.fa(n2) });
        if (s.perimeter != null) {
          if (s.rect == null && s.area == null && !isRect()) return B.t("gridNotRect");
          var p = outlineOf(list()).length;
          if (p !== s.perimeter) return B.t("gridPerimeterIs", { n: B.fa(p) });
        }
        return "";
      }, function (fb) {
        var r = s.rect || null;
        if (!r && s.area != null && s.perimeter == null) { for (var w = Math.min(W, s.area); w >= 1; w--) if (s.area % w === 0 && s.area / w <= H) { r = [w, s.area / w]; break; } }
        if (!r && s.perimeter != null) { for (var a = 1; a < s.perimeter / 2; a++) { var b = s.perimeter / 2 - a; if (a <= W && b <= H && (s.area == null || a * b === s.area)) { r = [a, b]; break; } } }
        if (!r) return;
        on = {};
        for (var x = 1; x <= r[0]; x++) for (var y = 1; y <= r[1]; y++) on[key2([x, y])] = true;
        redraw();
        fb.say(B.t("gridDrawShow"));
      }, function (first) {
        svg.classList.add("done");
        ending(box, s, done, first);
      });
      redraw();
      return;
    }

    if (ask === "find" || ask === "plot") {
      var targets = ask === "find" ? [s.at] : s.points, at = 0, here = 0, ring = null, made = [];
      var hit = function (p) {
        if (!p || at >= targets.length) return;
        var t = targets[at];
        if (p[0] === t[0] && p[1] === t[1]) {
          if (ring) { ring.remove(); ring = null; }
          if (axes) made.push(dot(t, "grid-pt on"));
          else { cellRect(t, "grid-on"); if (s.pic) cellText(t, s.pic, "grid-pic"); }
          if (axes && s.names && s.names[at]) add(gMarks, "text", { x: X(t[0] + org[0]) + 12, y: Y(t[1] + org[1]) - 10, class: "grid-name" }, s.names[at]);
          if (s.join && at > 0) add(gJoin, "line", { x1: X(targets[at - 1][0] + org[0]), y1: Y(targets[at - 1][1] + org[1]), x2: X(t[0] + org[0]), y2: Y(t[1] + org[1]), class: "grid-join" });
          at++;
          here = 0;
          if (at < targets.length) { info.textContent = B.t("gridPlotNext", { p: pt(targets[at]) }); return; }
          if (s.join && s.close && targets.length > 2) add(gJoin, "line", { x1: X(targets[at - 1][0] + org[0]), y1: Y(targets[at - 1][1] + org[1]), x2: X(targets[0][0] + org[0]), y2: Y(targets[0][1] + org[1]), class: "grid-join" });
          onTap = null;
          info.textContent = "";
          B.speak(fb.good());
          ending(box, s, done, misses === 0);
          return;
        }
        misses++;
        here++;
        var miss = axes ? dot(p, "grid-pt miss") : cellRect(p, "grid-miss", gMarks);
        setTimeout(function () { miss.remove(); }, 700);
        fb.tryAgain(axes ? B.t("gridTryPoint", { x: B.fa(t[0]), y: B.fa(t[1]) }) : B.t("gridTryCell", { c: B.fa(t[0]), r: B.fa(t[1]) }));
        if (here >= 2 && !ring) {
          ring = axes ? add(gTop, "circle", { cx: X(t[0] + org[0]), cy: Y(t[1] + org[1]), r: 15, class: "grid-show" })
            : add(gTop, "rect", { x: X(t[0] - 1) + 2, y: Y(t[1]) + 2, width: U - 4, height: U - 4, class: "grid-show" });
          fb.say(B.t("gridShowHere"));
        }
      };
      onTap = function (p) { hit(p); };
      svg.addEventListener("click", function (e) { if (!onTap) return; var g = local(e); hit(axes ? pointAt(g) : cellAt(g)); });
      if (ask === "plot") info.textContent = B.t("gridPlotNext", { p: pt(targets[0]) });
      box.appendChild(el("p", { class: "hint", text: B.t("gridKeys") }));
      var fb = E.feedback(box);
      return;
    }

    if (ask === "read") {
      if (axes) { dot(s.mark, "grid-pt on"); if (s.pic) add(gMarks, "text", { x: X(s.mark[0] + org[0]), y: Y(s.mark[1] + org[1]) - 14, class: "grid-pic" }, s.pic); }
      else { cellRect(s.mark, "grid-on"); if (s.pic) cellText(s.mark, s.pic, "grid-pic"); }
      ending(box, { question: s.question || B.t("gridReadAsk"), options: s.options, answer: s.answer }, done, true);
      return;
    }

    // move: a shape (or a robot) moved square by square, and turned.
    var pc = s.piece, goal = s.goal || {};
    var cells = pc.cells ? pc.cells.map(function (c) { return c.slice(); }) : [pc.at.slice()], dir = pc.dir || null;
    var goalCells = goal.cells || (goal.at ? [goal.at] : null);
    if (goalCells) goalCells.forEach(function (c) { cellRect(c, "grid-goal"); });
    if (goal.at && !goal.cells) cellText(goal.at, goal.pic || "⭐", "grid-pic goal");
    var gPiece = add(gMarks, "g", { class: "grid-piece" });
    var drawPiece = function () {
      gPiece.innerHTML = "";
      cells.forEach(function (c) { if (!pc.pic || pc.cells) cellRect(c, "grid-on", gPiece); });
      if (pc.pic) {
        var c0 = cells[0];
        add(gPiece, "text", { x: X(c0[0] - 0.5), y: Y(c0[1] - 0.5) + 10, class: "grid-pic" }, pc.pic);
        if (dir) {
          var a = TURN.indexOf(dir) * 90, cx = X(c0[0] - 0.5), cy = Y(c0[1] - 0.5);
          add(gPiece, "polygon", { points: (cx - 7) + "," + (cy - 15) + " " + (cx + 7) + "," + (cy - 15) + " " + cx + "," + (cy - 25), class: "grid-dir", transform: "rotate(" + a + " " + cx + " " + cy + ")" });
        }
      }
      chkM && chkM.clear();
    };
    var fits = function (cs) { return cs.every(function (c) { return c[0] >= 1 && c[0] <= W && c[1] >= 1 && c[1] <= H; }); };
    var shift = function (d) {
      var next = cells.map(function (c) { return [c[0] + d[0], c[1] + d[1]]; });
      if (!fits(next)) { E.bounce(svg); return; }
      cells = next;
      drawPiece();
    };
    var turn = function (k) {
      if (dir) { dir = TURN[(TURN.indexOf(dir) + k + 4) % 4]; drawPiece(); return; }
      var o = cells[0];
      var next = cells.map(function (c) { var dx = c[0] - o[0], dy = c[1] - o[1]; return k > 0 ? [o[0] + dy, o[1] - dx] : [o[0] - dy, o[1] + dx]; });
      if (!fits(next)) { E.bounce(svg); return; }
      cells = next;
      drawPiece();
    };
    onKey = function (e, d) { if (d) { shift(d); return true; } if (s.turn && (e.key === "r" || e.key === "R")) { turn(1); return true; } return false; };
    var dragFrom = null;
    svg.addEventListener("pointerdown", function (e) {
      var c = cellAt(local(e));
      if (!c || !cells.some(function (x) { return key2(x) === key2(c); })) return;
      dragFrom = c;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* gone */ }
    });
    svg.addEventListener("pointermove", function (e) {
      if (!dragFrom) return;
      var c = cellAt(local(e));
      if (!c || key2(c) === key2(dragFrom)) return;
      var before = cells;
      shift([c[0] - dragFrom[0], c[1] - dragFrom[1]]);
      if (cells !== before) dragFrom = c;
    });
    svg.addEventListener("pointerup", function () { dragFrom = null; });
    var btn = function (t, label, f) { return el("button", { class: "btn secondary grid-btn", type: "button", text: t, "aria-label": label, onclick: f }); };
    var pad = el("div", { class: "grid-pad", dir: "ltr" }, [
      btn("←", B.t("gridLeft"), function () { shift([-1, 0]); }),
      btn("↑", B.t("gridUp"), function () { shift([0, 1]); }),
      btn("↓", B.t("gridDown"), function () { shift([0, -1]); }),
      btn("→", B.t("gridRight"), function () { shift([1, 0]); }),
      s.turn ? btn("↺", B.t("gridTurnLeft"), function () { turn(-1); }) : null,
      s.turn ? btn("↻", B.t("gridTurnRight"), function () { turn(1); }) : null
    ]);
    box.appendChild(pad);
    box.appendChild(el("p", { class: "hint", text: B.t(s.turn ? "gridMoveTurnHint" : "gridMoveHint") }));
    var same = function (a, b) { var k = function (l) { return l.map(key2).sort().join(";"); }; return k(a) === k(b); };
    var chkM = checkButton(box, B.t("m2Check"), function () {
      var place = goalCells ? (goal.cells ? same(cells, goalCells) : key2(cells[0]) === key2(goalCells[0])) : true;
      if (!place) {
        return B.t("gridNotThere");
      }
      if (goal.dir && dir !== goal.dir) return B.t("gridFace", { dir: B.t("gridDir_" + goal.dir) });
      return "";
    }, function (fb) {
      if (goal.cells) cells = goalCells.map(function (c) { return c.slice(); });
      else if (goalCells) cells = [goalCells[0].slice()];
      if (goal.dir) dir = goal.dir;
      drawPiece();
      fb.say(B.t("gridMoveShow"));
    }, function (first) {
      pad.remove();
      ending(box, s, done, first);
    });
    drawPiece();
  };
  // ---------- numline with fractions and decimals ----------

  /* The plain number line (js/engine.js, js/steps/numbers.js) hops on whole numbers. With denom (each whole cut into
     that many equal parts) or dec: true (tenths, written ۰/۳), it is a line of fractions from 0 to max (default 1):
     - ask: "place": tap where at is ([3, 4] for ¾, or 0.3 with dec): the ticks are buttons (Tab and Enter work);
     - ask: "name": mark ([3, 4] or 0.3) is marked on the line; options ({ frac: [3, 4] }, numbers or "۰/۳") and answer
       ("3/4", or the decimal as written);
     - ask: "cut": the child cuts 0–1 into denom equal parts with − and + and presses «درست است؟»;
     - ask: "hop": a frog hops hops times by `by` ([1, 4]) from `from` (default 0) while the child watches; then question,
       options, answer (default: where did it land?).
     labels: "wholes" (the default: ۰، ۱، ۲ under the line), "all" (every tick as a fraction or decimal) or "none";
     strips: [2, 4] draws fraction strips over the line (a whole cut into halves, quarters…), to see equal fractions.
     Optional prompt, say, thing (the hopper, default 🐸). */
  var plainNumline = E.steps.numline;
  E.steps.numline = function (s, box, done) {
    if (!s.denom && !s.dec) return plainNumline(s, box, done);
    var d = s.dec ? 10 : s.denom, max = s.max || 1, ask = s.ask || (s.at != null ? "place" : s.mark != null ? "name" : s.by ? "hop" : "cut");
    function units(v) { return Array.isArray(v) ? v[0] * d / v[1] : Math.round(v * d); }
    function label(u) {
      if (s.dec) return decText(u / 10);
      if (u % d === 0) return B.fa(u / d);
      return null;
    }
    var prompts = { place: B.t("nlPlace"), name: B.t("nlName"), cut: B.t("nlCut", { n: B.fa(d) }), hop: B.t("nlHop") };
    promptLine(box, s.prompt || prompts[ask], s.say, s.audio);
    if (ask === "place" && !s.prompt) box.appendChild(el("div", { class: "nl-target" }, [s.dec ? el("span", { class: "math-big", dir: "ltr", text: decText(s.at) }) : fracNode(s.at)]));
    var Wd = 760, pad = 34, parts = ask === "cut" ? 1 : d, span = max * parts;
    var stripH = (s.strips || []).length * 36;
    var top = 20 + stripH, base = top + 50, H = base + (s.labels === "all" && !s.dec ? 74 : 44);
    var svg = svgEl("svg", { class: "numline nl-frac", viewBox: "0 0 " + Wd + " " + H, role: "group", "aria-label": B.t("nlAria") });
    function x(u, per) { return pad + u * (Wd - 2 * pad) / (max * (per || parts)); }
    function add(tag, attrs, text, parent) { var e = svgEl(tag, attrs, text); (parent || svg).appendChild(e); return e; }
    (s.strips || []).forEach(function (k, i) {
      for (var w = 0; w < max * k; w++) {
        var y = 14 + i * 36;
        add("rect", { x: x(w, k), y: y, width: x(1, k) - x(0, k), height: 30, class: "nl-strip s" + (i % 3) });
        var cx = (x(w, k) + x(w + 1, k)) / 2;
        if (k === 1) { add("text", { x: cx, y: y + 21, class: "nl-strip-t" }, B.fa(1)); continue; }
        // ۱ over k: Persian books write fractions one number over the other (۱/۴ would read as a decimal).
        add("text", { x: cx, y: y + 12, class: "nl-strip-t small" }, B.fa(1));
        add("line", { x1: cx - 6, y1: y + 15, x2: cx + 6, y2: y + 15, class: "nl-fbar" });
        add("text", { x: cx, y: y + 27, class: "nl-strip-t small" }, B.fa(k));
      }
    });
    add("line", { x1: pad - 10, y1: base, x2: Wd - pad + 10, y2: base, class: "nl-axis" });
    var ticks = el("span"), tickNodes = [];
    function drawTicks() {
      tickNodes.forEach(function (t) { t.remove(); });
      tickNodes = [];
      for (var u = 0; u <= span; u++) {
        var whole = u % parts === 0, g = add("g", { class: "nl-tick" + (whole ? " whole" : "") });
        add("line", { x1: x(u), y1: base - (whole ? 14 : 10), x2: x(u), y2: base + (whole ? 14 : 10) }, null, g);
        add("rect", { x: x(u) - 14, y: base - 26, width: 28, height: 52, class: "nl-hit" }, null, g);
        var lb = whole ? B.fa(u / parts) : s.dec ? label(u) : null;
        if (s.labels !== "none" && (lb !== null || s.labels === "all")) {
          if (lb !== null && (whole || s.dec) && (whole || s.labels === "all")) add("text", { x: x(u), y: base + 34, class: "nl-num" }, lb, g);
          else if (s.labels === "all") {
            add("text", { x: x(u), y: base + 32, class: "nl-num small" }, B.fa(u), g);
            add("line", { x1: x(u) - 9, y1: base + 39, x2: x(u) + 9, y2: base + 39, class: "nl-fbar" }, null, g);
            add("text", { x: x(u), y: base + 58, class: "nl-num small" }, B.fa(parts), g);
          }
        }
        g._u = u;
        tickNodes.push(g);
      }
    }
    drawTicks();
    box.appendChild(el("div", { class: "nl-wrap" }, [svg]));
    function aria(u) { return s.dec ? decText(u / 10) : B.t("nlFracAria", { n: B.fa(u), d: B.fa(parts) }); }

    if (ask === "place") {
      var want = units(s.at), misses = 0, fb;
      tickNodes.forEach(function (g) {
        pressable(g, aria(g._u), function () {
          if (svg.classList.contains("done")) return;
          if (g._u === want) {
            g.classList.add("on");
            svg.classList.add("done");
            add("circle", { cx: x(want), cy: base, r: 9, class: "nl-dot" });
            B.speak(fb.good());
            ending(box, s, done, misses === 0);
            return;
          }
          misses++;
          E.bounce(g);
          fb.tryAgain(B.t("nlPlaceTry", { n: B.fa(parts) }));
          if (misses >= 2) { tickNodes[want].classList.add("show"); fb.say(B.t("nlShow")); }
        });
      });
      box.appendChild(el("p", { class: "hint", text: B.t("nlTapHint") }));
      fb = E.feedback(box);
      return;
    }
    if (ask === "name") {
      add("circle", { cx: x(units(s.mark)), cy: base, r: 10, class: "nl-dot" });
      add("text", { x: x(units(s.mark)), y: base - 22, class: "nl-mark" }, s.pic || "▼");
      E.choice(box, { options: options(s.options), answer: s.answer, ltr: true }, done);
      return;
    }
    if (ask === "cut") {
      var row2 = el("div", { class: "row nl-cut", style: "justify-content:center" });
      var out = el("span", { class: "nl-parts", "aria-live": "polite" });
      var set = function (k) { parts = Math.max(1, Math.min(12, k)); span = max * parts; drawTicks(); out.textContent = B.t("nlParts", { n: B.fa(parts) }); chk.clear(); };
      row2.appendChild(el("button", { class: "btn secondary", type: "button", text: "−", "aria-label": B.t("nlFewer"), onclick: function () { set(parts - 1); } }));
      row2.appendChild(out);
      row2.appendChild(el("button", { class: "btn secondary", type: "button", text: "+", "aria-label": B.t("nlMore"), onclick: function () { set(parts + 1); } }));
      box.appendChild(row2);
      var chk = checkButton(box, B.t("m2Check"), function () {
        return parts === d ? "" : B.t(parts < d ? "nlMoreParts" : "nlFewerParts");
      }, function (fb2) { set(d); fb2.say(B.t("nlCutShow", { n: B.fa(d) })); }, function (first) { ending(box, s, done, first); });
      set(1);
      return;
    }
    // hop
    var from = s.from != null ? units(s.from) : 0, by = units(s.by), hops = s.hops || 1, pos = from;
    var hopper = svg.appendChild(B.svgArt(s.thing || "🐸", 32));
    hopper.setAttribute("transform", "translate(" + x(pos) + " " + (base - 26) + ")");
    var askBox = el("div");
    var go = el("button", { class: "btn secondary", type: "button", text: B.t("hop", { thing: s.thing || "🐸" }) });
    box.appendChild(row([go]));
    box.appendChild(askBox);
    go.addEventListener("click", function () {
      go.disabled = true;
      var n = 0;
      var timer = setInterval(function () {
        if (!svg.isConnected) { clearInterval(timer); return; }
        var a = pos;
        pos += by;
        n++;
        add("path", { d: "M" + x(a) + " " + (base - 6) + " Q " + (x(a) + x(pos)) / 2 + " " + (base - 60) + " " + x(pos) + " " + (base - 6), class: "nl-hop" });
        hopper.setAttribute("transform", "translate(" + x(pos) + " " + (base - 26) + ")");
        B.speak(B.NUMBER_WORDS[n]);
        if (n >= hops) {
          clearInterval(timer);
          ending(askBox, { question: s.question || B.t("whereLanded"), options: s.options, answer: s.answer }, done, true);
        }
      }, 700);
    });
  };
  // ---------- feed with several plates: sharing equally, and what is left over ----------

  /* The plain feed step (js/games.js) fills one plate. With plates (how many) or who (one emoji per plate: who eats
     from it), n things (food, an emoji) are shared equally: tap a thing and then a plate (or tap a plate to give it the
     next thing, or drag); tap a thing on a plate to take it back. When n does not share equally, a bowl for what is
     left over appears (leftover: true shows it anyway). «بفرما» checks that every plate has the same and that nothing
     more can be shared. The sum is written at the end («۱۴ ÷ ۳ = ۴، باقی‌مانده ۲»; result to write another line).
     Optional prompt, say, and question, options, answer asked at the end. */
  var plainFeed = E.steps.feed;
  var EATERS = ["🐰", "🐻", "🐱", "🐶", "🐼", "🦊"];
  E.steps.feed = function (s, box, done) {
    if (!s.plates && !s.who) return plainFeed(s, box, done);
    var who = s.who || EATERS.slice(0, s.plates), P = who.length, n = s.n, food = s.food || "🥕";
    var each = Math.floor(n / P), rest = n % P;
    promptLine(box, s.prompt || B.t(rest || s.leftover ? "plShareRest" : "plShare", { n: B.fa(n), food: food, p: B.fa(P) }), s.say, s.audio);
    var picked = null, chk;
    var rowEl = el("div", { class: "share-plates" });
    function dish(btn) { return btn._dish; }
    var plates = who.map(function (w, i) {
      var p = el("button", { class: "share-plate", type: "button", "aria-label": B.t("plPlate", { n: B.fa(i + 1) }) }, [el("span", { class: "share-who", "aria-hidden": "true", text: w })]);
      p.dataset.drop = "";
      p._dish = el("div", { class: "share-dish" });
      p.addEventListener("click", function () { var t = picked || table.querySelector("button.food"); if (t) put(t, p._dish); });
      rowEl.appendChild(el("div", { class: "share-col" }, [p, p._dish]));
      return p;
    });
    box.appendChild(rowEl);
    var bowl = null;
    if (rest || s.leftover) {
      var bowlBtn = el("button", { class: "share-plate pl-bowl", type: "button", "aria-label": B.t("plBowl") }, [el("span", { "aria-hidden": "true", text: "🥣" })]);
      bowlBtn.dataset.drop = "";
      bowl = el("div", { class: "share-dish pl-rest" });
      bowlBtn._dish = bowl;
      bowlBtn.addEventListener("click", function () { var t = picked || table.querySelector("button.food"); if (t) put(t, bowl); });
      box.appendChild(el("div", { class: "pl-rest-row" }, [el("div", { class: "share-col" }, [bowlBtn, el("small", { text: B.t("plBowlName") }), bowl])]));
    }
    var table = el("div", { class: "tray table share-table" });
    table.dataset.drop = "";
    box.appendChild(table);
    function put(t, where) {
      if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
      picked = null;
      where.appendChild(t);
      t.setAttribute("aria-label", where === table ? B.t("fracPick") : B.t("fracBack"));
      t.removeAttribute("aria-pressed");
      if (chk) chk.clear();
    }
    for (var k = 0; k < n; k++) {
      (function () {
        var t = el("button", { class: "food", type: "button", "aria-label": B.t("fracPick") }, [el("span", { "aria-hidden": "true", text: food })]);
        t.addEventListener("click", function () {
          if (t.disabled) return;
          if (t.parentNode !== table) { put(t, table); return; }
          if (picked === t) { t.classList.remove("picked"); t.setAttribute("aria-pressed", "false"); picked = null; return; }
          if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
          picked = t;
          t.classList.add("picked");
          t.setAttribute("aria-pressed", "true");
        });
        E.draggable(t, function (target) {
          var p = target.closest(".share-plate");
          if (p) put(t, dish(p));
          else if (target === table) put(t, table);
        });
        table.appendChild(t);
      })();
    }
    box.appendChild(el("p", { class: "hint", text: B.t("plHint") }));
    chk = checkButton(box, B.t("feedGive"), function () {
      var counts = plates.map(function (p) { return p._dish.children.length; });
      var left = table.children.length, inBowl = bowl ? bowl.children.length : 0;
      if (counts.some(function (c) { return c !== counts[0]; })) return B.t("plNotEqual");
      if (left) return B.t(bowl ? "plAllRest" : "plAll");
      if (inBowl >= P) return B.t("plMoreEach");
      return "";
    }, function (fb) {
      fb.say(rest ? B.t("plShowRest", { each: B.fa(each), r: B.fa(rest) }) : B.t("plShow", { each: B.fa(each) }));
    }, function (first) {
      box.querySelectorAll("button.food, .share-plate").forEach(function (b) { b.disabled = true; });
      var line = s.result || B.fa(n) + " ÷ " + B.fa(P) + " = " + B.fa(each) + (rest ? B.t("plRestLine", { r: B.fa(rest) }) : "");
      var said = rest ? B.t("plSayRest", { each: B.fa(each), r: B.fa(rest) }) : B.t("plSay", { each: B.fa(each) });
      box.insertBefore(mathLine(line, "m2-result"), table);
      box.insertBefore(el("p", { class: "prompt", text: said }), table);
      plates.forEach(function (p) { p.classList.add("happy"); });
      B.speak(said);
      ending(box, s, done, first);
    });
  };
  // ---------- mirror: symmetry ----------

  var PAINT = ["#3c7fc4", "#e8a33d", "#2f9e5b", "#c9733a", "#8a5ab8"];
  // Built-in pictures (viewBox 0 0 100 100) and their lines of symmetry among v, h, d1 (bottom left to top right), d2.
  var MIRROR_SHAPES = {
    square: ['<rect x="20" y="20" width="60" height="60"/>', ["v", "h", "d1", "d2"]],
    rect: ['<rect x="10" y="30" width="80" height="40"/>', ["v", "h"]],
    triangle: ['<polygon points="50,15 88,81 12,81"/>', ["v"]],
    isosceles: ['<polygon points="50,8 72,88 28,88"/>', ["v"]],
    pentagon: ['<polygon points="50,12 88,40 74,86 26,86 12,40"/>', ["v"]],
    hexagon: ['<polygon points="10,50 30,16 70,16 90,50 70,84 30,84"/>', ["v", "h"]],
    star: ['<polygon points="50,8 61,38 93,38 67,57 77,88 50,69 23,88 33,57 7,38 39,38"/>', ["v"]],
    heart: ['<path d="M50 86 C20 64 8 46 14 30 C20 14 42 12 50 30 C58 12 80 14 86 30 C92 46 80 64 50 86z"/>', ["v"]],
    butterfly: ['<path d="M50 30 C40 10 12 8 10 28 C8 44 30 50 46 50 C30 52 14 64 22 80 C30 92 46 76 50 62 C54 76 70 92 78 80 C86 64 70 52 54 50 C70 50 92 44 90 28 C88 8 60 10 50 30z"/><rect class="mir-body" x="47" y="26" width="6" height="52" rx="3"/>', ["v"]],
    parallelogram: ['<polygon points="30,28 92,28 70,72 8,72"/>', []],
    kite: ['<polygon points="50,8 76,40 50,92 24,40"/>', ["v"]]
  };
  var LINES = { v: [50, 2, 50, 98], h: [2, 50, 98, 50], d1: [4, 96, 96, 4], d2: [4, 4, 96, 96] };

  /* ask "complete" (the default with cells): a squared grid (size [w, h], default [8, 8]) with a mirror line (line: "v"
     down the middle, the default; "h" across; "d" corner to corner on a square grid). cells [[column, row, colour]] are
     coloured on one side (column and row from 1 at the bottom left; colour 0–4, default 0); the child colours their
     mirror image on the other side (tap, drag, or arrow keys and Enter; with several colours, pick one first). Then
     «درست است؟»: a miss marks the squares that are not right; after two the missing ones are shown.
     ask "lines": a picture (shape: square, rect, triangle, isosceles, pentagon, hexagon, star, heart, butterfly, kite,
     parallelogram; or text: a letter or word; or cells: a tile pattern) with dashed lines to try (lines: some of v, h,
     d1, d2; default all four); the child taps every line of symmetry (symmetric: the list; worked out for shapes and
     cells, given for text). A wrong line bounces: the halves would not match. With none, the child presses «هیچ‌کدام».
     Optional prompt, say, and question, options, answer asked at the end. */
  E.steps.mirror = function (s, box, done) {
    var ask = s.ask || (s.shape || s.text ? "lines" : "complete");
    if (ask === "lines") return mirrorLines(s, box, done);
    var size = typeof s.size === "number" ? [s.size, s.size] : s.size || [8, 8], W = size[0], H = size[1], U = 40, line = s.line || "v";
    promptLine(box, s.prompt || B.t("mirComplete"), s.say, s.audio);
    var svg = svgEl("svg", { class: "grid-svg mir-svg", viewBox: "0 0 " + (W * U + 20) + " " + (H * U + 20), tabindex: "0", role: "application", "aria-label": B.t("mirAria") });
    function add(p, tag, attrs, t) { var e = svgEl(tag, attrs, t); p.appendChild(e); return e; }
    function X(c) { return 10 + (c - 1) * U; }
    function Y(r) { return 10 + (H - r) * U; }
    var gCells = add(svg, "g", {}), gGrid = add(svg, "g", { class: "grid-lines" }), gMarks = add(svg, "g", {});
    for (var i = 0; i <= W; i++) add(gGrid, "line", { x1: 10 + i * U, y1: 10, x2: 10 + i * U, y2: 10 + H * U });
    for (var j = 0; j <= H; j++) add(gGrid, "line", { x1: 10, y1: 10 + j * U, x2: 10 + W * U, y2: 10 + j * U });
    var L = line === "v" ? [10 + W / 2 * U, 4, 10 + W / 2 * U, H * U + 16] : line === "h" ? [4, 10 + H / 2 * U, W * U + 16, 10 + H / 2 * U] : [6, H * U + 14, W * U + 14, 6];
    add(svg, "line", { x1: L[0], y1: L[1], x2: L[2], y2: L[3], class: "mir-line" });
    function reflect(c) { return line === "v" ? [W + 1 - c[0], c[1]] : line === "h" ? [c[0], H + 1 - c[1]] : [c[1], c[0]]; }
    // Which side a square is on: -1 the given side, 1 the child's, 0 on the line (diagonal only).
    var given = {}, want = {};
    s.cells.forEach(function (c) { given[key2(c)] = c[2] || 0; want[key2(reflect(c))] = c[2] || 0; });
    function side(c) { return given[key2(c)] != null ? -1 : 1; }
    var mine = {};
    var used = Object.keys(want).map(function (k) { return want[k]; }).filter(function (v, i2, a) { return a.indexOf(v) === i2; }).sort();
    var colour = used[0];
    function draw() {
      gCells.innerHTML = "";
      Object.keys(given).forEach(function (k) { var c = k.split(",").map(Number); add(gCells, "rect", { x: X(c[0]), y: Y(c[1]), width: U, height: U, fill: (s.colors || PAINT)[given[k]], class: "mir-cell given" }); });
      Object.keys(mine).forEach(function (k) { var c = k.split(",").map(Number); add(gCells, "rect", { x: X(c[0]), y: Y(c[1]), width: U, height: U, fill: (s.colors || PAINT)[mine[k]], class: "mir-cell" }); });
      if (chk) chk.clear();
      gMarks.innerHTML = "";
    }
    function quiet() { if (info) info.textContent = ""; }
    function cellAt(e) {
      var m = svg.getScreenCTM(), p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; p = p.matrixTransform(m.inverse());
      var c = [Math.floor((p.x - 10) / U) + 1, H - Math.floor((p.y - 10) / U)];
      return c[0] >= 1 && c[0] <= W && c[1] >= 1 && c[1] <= H ? c : null;
    }
    function paint(c, on) {
      if (!c) return;
      if (side(c) < 0) { E.bounce(svg); fb2.say(B.t("mirOtherSide")); return; }
      if (on) mine[key2(c)] = colour; else delete mine[key2(c)];
      quiet();
      draw();
    }
    var painting = null;
    svg.addEventListener("pointerdown", function (e) {
      var c = cellAt(e); if (!c) return;
      painting = !(mine[key2(c)] === colour);
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* gone */ }
      paint(c, painting);
    });
    svg.addEventListener("pointermove", function (e) { if (painting === null) return; var c = cellAt(e); if (c && side(c) > 0 && (mine[key2(c)] === colour) !== painting) paint(c, painting); });
    svg.addEventListener("pointerup", function () { painting = null; });
    svg.addEventListener("pointercancel", function () { painting = null; });
    var cur = [1, 1], cursor = null;
    function showCursor() {
      if (!cursor) cursor = add(svg, "rect", { class: "grid-cursor", width: U - 6, height: U - 6 });
      cursor.setAttribute("x", X(cur[0]) + 3); cursor.setAttribute("y", Y(cur[1]) + 3);
      svg.setAttribute("aria-label", B.t("mirAria") + " — " + B.t("gridCellAria", { c: B.fa(cur[0]), r: B.fa(cur[1]) }));
    }
    svg.addEventListener("keydown", function (e) {
      var d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (d) { e.preventDefault(); cur = [Math.max(1, Math.min(W, cur[0] + d[0])), Math.max(1, Math.min(H, cur[1] + d[1]))]; showCursor(); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showCursor(); paint(cur.slice(), mine[key2(cur)] !== colour); }
    });
    svg.addEventListener("focus", function () { var kb = true; try { kb = svg.matches(":focus-visible"); } catch (er) { /* old browser */ } if (kb) showCursor(); });
    box.appendChild(el("div", { class: "grid-stage" }, [svg]));
    if (used.length > 1) {
      var pal = el("div", { class: "mir-palette", role: "group", "aria-label": B.t("mirColours") });
      used.forEach(function (u, k) {
        var b = el("button", { class: "mir-swatch" + (k ? "" : " on"), type: "button", "aria-label": B.t("mirColour", { n: B.fa(k + 1) }), "aria-pressed": k ? "false" : "true", style: "background:" + (s.colors || PAINT)[u] });
        b.addEventListener("click", function () { colour = u; pal.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); });
        pal.appendChild(b);
      });
      box.appendChild(pal);
    }
    box.appendChild(el("p", { class: "hint", text: B.t("mirHint") }));
    var fb2 = { say: function (t) { info.textContent = t; } }, info = el("p", { class: "hint", "aria-live": "polite" });
    box.appendChild(info);
    var chk = checkButton(box, B.t("m2Check"), function () {
      var wrong = Object.keys(mine).filter(function (k) { return want[k] !== mine[k]; });
      var missing = Object.keys(want).filter(function (k) { return mine[k] !== want[k] && given[k] == null; });
      if (!wrong.length && !missing.length) return "";
      wrong.forEach(function (k) { var c = k.split(",").map(Number); add(gMarks, "text", { x: X(c[0]) + U / 2, y: Y(c[1]) + U / 2 + 8, class: "mir-bad" }, "✕"); });
      if (wrong.length) return B.t("mirWrong");
      return B.t("mirMissing", { n: B.fa(missing.length) });
    }, function (fb) {
      Object.keys(want).forEach(function (k) {
        if (mine[k] === want[k] || given[k] != null) return;
        var c = k.split(",").map(Number);
        add(gMarks, "rect", { x: X(c[0]) + 4, y: Y(c[1]) + 4, width: U - 8, height: U - 8, class: "grid-show" });
      });
      if (gMarks.querySelector(".grid-show")) fb.say(B.t("mirShow"));
    }, function (first) {
      svg.classList.add("done");
      ending(box, s, done, first);
    });
    draw();
  };

  function mirrorLines(s, box, done) {
    promptLine(box, s.prompt || B.t("mirLines"), s.say, s.audio);
    var svg = svgEl("svg", { class: "mir-pic", viewBox: "0 0 100 100", role: "group", "aria-label": B.t("mirPicAria") });
    var pic = svgEl("g", { class: "mir-shape" });
    var right;
    if (s.cells) {
      var n = (Array.isArray(s.size) ? s.size[0] : s.size) || 6, u = 92 / n;
      s.cells.forEach(function (c) { pic.appendChild(svgEl("rect", { x: 4 + (c[0] - 1) * u, y: 4 + (n - c[1]) * u, width: u, height: u, fill: (s.colors || PAINT)[c[2] || 0], class: "mir-tile" })); });
      pic.appendChild(svgEl("rect", { x: 4, y: 4, width: 92, height: 92, fill: "none", class: "mir-frame" }));
      var has = {};
      s.cells.forEach(function (c) { has[key2(c)] = c[2] || 0; });
      var map = { v: function (c) { return [n + 1 - c[0], c[1]]; }, h: function (c) { return [c[0], n + 1 - c[1]]; }, d1: function (c) { return [c[1], c[0]]; }, d2: function (c) { return [n + 1 - c[1], n + 1 - c[0]]; } };
      right = Object.keys(map).filter(function (l) { return s.cells.every(function (c) { return has[key2(map[l](c))] === (c[2] || 0); }); });
    } else if (s.text) {
      pic.appendChild(svgEl("text", { x: 50, y: 52, class: "mir-text", "dominant-baseline": "central", "text-anchor": "middle" }, s.text));
      right = [];
    } else {
      pic.innerHTML = MIRROR_SHAPES[s.shape][0];
      right = MIRROR_SHAPES[s.shape][1];
    }
    if (s.symmetric) right = s.symmetric;
    svg.appendChild(pic);
    var tries = s.lines || ["v", "h", "d1", "d2"];
    right = right.filter(function (l) { return tries.indexOf(l) !== -1; });
    var found = 0, misses = 0;
    var fb;
    tries.forEach(function (l) {
      var g = svgEl("g", { class: "mir-try" });
      var c = LINES[l];
      g.appendChild(svgEl("line", { x1: c[0], y1: c[1], x2: c[2], y2: c[3], class: "mir-hit" }));
      g.appendChild(svgEl("line", { x1: c[0], y1: c[1], x2: c[2], y2: c[3], class: "mir-dash" }));
      pressable(g, B.t("mirLine_" + l), function () {
        if (g.classList.contains("on") || svg.classList.contains("done")) return;
        if (right.indexOf(l) !== -1) {
          g.classList.add("on");
          found++;
          if (found < right.length) { fb.good(B.t("mirYes")); return; }
          svg.classList.add("done");
          B.speak(fb.good(B.t("mirAll")));
          ending(box, s.options ? s : {}, done, misses === 0);
          return;
        }
        misses++;
        E.bounce(g);
        fb.tryAgain(B.t("mirNo"));
        if (misses >= 2) svg.querySelectorAll(".mir-try").forEach(function (x, k) { if (right.indexOf(tries[k]) !== -1 && !x.classList.contains("on")) x.classList.add("show"); });
      });
      svg.appendChild(g);
    });
    box.appendChild(el("div", { class: "grid-stage" }, [svg]));
    box.appendChild(el("p", { class: "hint", text: right.length ? B.t("mirLinesHint") : B.t("mirLinesNone") }));
    fb = E.feedback(box);
    if (!right.length) {
      box.appendChild(row([E.nextBtn(B.t("mirNone"), function () { ending(box, s.options ? s : {}, done, misses === 0); })]));
    }
  }
  // ---------- spinner: a chance experiment, tallied ----------

  var SPIN_COLOURS = ["#e06c5a", "#3c7fc4", "#f2c14e", "#4caf72", "#8a5ab8", "#e8a33d"];
  // Tally marks: groups of four lines and a fifth across them.
  function tallyNode(n) {
    var w = el("span", { class: "sp-tally", "aria-hidden": "true" });
    for (var g = 0; g < Math.ceil(n / 5); g++) {
      var k = Math.min(5, n - g * 5), svg = svgEl("svg", { viewBox: "0 0 34 30", class: "sp-five" });
      for (var i = 0; i < Math.min(4, k); i++) svg.appendChild(svgEl("line", { x1: 5 + i * 7, y1: 3, x2: 5 + i * 7, y2: 27 }));
      if (k === 5) svg.appendChild(svgEl("line", { x1: 1, y1: 24, x2: 31, y2: 6 }));
      w.appendChild(svg);
    }
    return w;
  }

  /* One of: spinner [{ label, color, size }] (label: an emoji or a short word; size: how big the part is, default 1),
     bag { "🔴": 3, "🔵": 1 } (marbles; each one goes back after it is seen), die: true (or dice: 2, the two added),
     coin: true. tries (default 10): the child presses the button, sees what came, and makes a tally mark in its row
     (tap the row, or drag the result onto it; a wrong row bounces, and after two misses the right row is shown).
     more: n adds a button that does n more tries at once (for 50 tries). Then question, options, answer, where answer
     may be "most" or "least" (worked out from the tallies; options are the labels). Optional prompt, say. */
  E.steps.spinner = function (s, box, done) {
    var kind = s.spinner ? "spinner" : s.bag ? "bag" : s.coin ? "coin" : "die";
    var outs;
    if (kind === "spinner") outs = s.spinner.map(function (p, i) { return { label: p.label != null ? p.label : "", color: p.color || SPIN_COLOURS[i % 6], size: p.size || 1 }; });
    else if (kind === "bag") outs = Object.keys(s.bag).map(function (k) { return { label: k, size: s.bag[k] }; });
    else if (kind === "coin") outs = [{ label: B.t("spHeads"), size: 1 }, { label: B.t("spTails"), size: 1 }];
    else if (s.dice === 2) { outs = []; for (var t = 2; t <= 12; t++) outs.push({ label: B.fa(t), size: 6 - Math.abs(7 - t) }); }
    else outs = [1, 2, 3, 4, 5, 6].map(function (n) { return { label: B.fa(n), size: 1, n: n }; });
    var total = sum(outs.map(function (o) { return o.size; }));
    var tries = s.tries || 10, done1 = 0, misses = 0, counts = outs.map(function () { return 0; });
    promptLine(box, s.prompt || B.t("spPrompt_" + kind, { n: B.fa(tries) }), s.say, s.audio);
    function pick() { var r = Math.random() * total; for (var i = 0; i < outs.length; i++) { r -= outs[i].size; if (r < 0) return i; } return outs.length - 1; }

    // The thing that makes the chance.
    var stage = el("div", { class: "sp-stage" }), wheel = null, angle = 0;
    if (kind === "spinner") {
      var svg = svgEl("svg", { viewBox: "-100 -110 200 210", class: "sp-wheel", role: "img", "aria-label": B.t("spWheelAria") });
      wheel = svgEl("g", { class: "sp-disc" });
      var a0 = 0;
      outs.forEach(function (o) {
        var a1 = a0 + o.size / total * 360, r = 90;
        var p = function (a) { var t = (a - 90) * Math.PI / 180; return [r * Math.cos(t), r * Math.sin(t)]; };
        var A = p(a0), Bp = p(a1);
        wheel.appendChild(outs.length === 1 ? svgEl("circle", { r: r, fill: o.color }) : svgEl("path", { d: "M0 0 L" + A[0] + " " + A[1] + " A" + r + " " + r + " 0 " + (a1 - a0 > 180 ? 1 : 0) + " 1 " + Bp[0] + " " + Bp[1] + "Z", fill: o.color, class: "sp-part" }));
        var m = (a0 + a1) / 2, tt = (m - 90) * Math.PI / 180;
        wheel.appendChild(svgEl("text", { x: 55 * Math.cos(tt), y: 55 * Math.sin(tt) + 7, class: "sp-label" }, o.label));
        o.from = a0; o.to = a1;
        a0 = a1;
      });
      svg.appendChild(wheel);
      svg.appendChild(svgEl("circle", { r: 8, class: "sp-hub" }));
      svg.appendChild(svgEl("polygon", { points: "-10,-106 10,-106 0,-84", class: "sp-pointer" }));
      stage.appendChild(svg);
    } else if (kind === "bag") {
      stage.appendChild(el("span", { class: "sp-bag", "aria-hidden": "true", text: "👜" }));
      stage.appendChild(el("span", { class: "sp-bag-in", "aria-hidden": "true", text: outs.map(function (o) { return new Array(o.size + 1).join(o.label); }).join("") }));
    }
    var shown = el("span", { class: "sp-result", "aria-live": "polite" });
    shown.dataset.drop = "";
    function rest() { shown.innerHTML = ""; if (kind === "die" || kind === "coin") shown.appendChild(el("span", { class: "sp-rest", "aria-hidden": "true", text: kind === "die" ? "🎲" : "🪙" })); }
    rest();
    stage.appendChild(shown);
    box.appendChild(stage);

    var actBtn = el("button", { class: "btn", type: "button", text: B.t("spGo_" + kind) });
    var left = el("p", { class: "hint", "aria-live": "polite" });
    box.appendChild(row([actBtn]));
    box.appendChild(left);
    // The tally chart: one row per result; the child taps the row (or drags the result there).
    var table = el("div", { class: "sp-table", role: "group", "aria-label": B.t("spTableAria") });
    var rows = outs.map(function (o, i) {
      var r = el("button", { class: "sp-row", type: "button", disabled: "" }, [
        el("span", { class: "sp-name" }, [o.color && kind === "spinner" ? el("i", { class: "sp-swatch", style: "background:" + o.color }) : null, el("span", { text: o.label })]),
        el("span", { class: "sp-marks" }), el("span", { class: "sp-n" })
      ]);
      r.setAttribute("aria-label", o.label);
      r.dataset.drop = "";
      r.addEventListener("click", function () { mark(i, r); });
      table.appendChild(r);
      return r;
    });
    box.appendChild(table);
    var fb = E.feedback(box);
    var current = -1, here = 0, more = null, chip = null;
    function drawRow(i) {
      rows[i].querySelector(".sp-marks").innerHTML = "";
      rows[i].querySelector(".sp-marks").appendChild(tallyNode(counts[i]));
      rows[i].setAttribute("aria-label", outs[i].label + "، " + B.fa(counts[i]));
    }
    function status() { left.textContent = B.t("spLeft", { n: B.fa(tries - done1) }); }
    function mark(i, r) {
      if (current < 0) { fb.say(B.t("spFirst_" + kind)); return; }
      if (i !== current) {
        misses++;
        here++;
        E.bounce(r);
        fb.tryAgain(B.t("spWrongRow", { x: outs[current].label }));
        if (here >= 2) rows[current].classList.add("show");
        return;
      }
      counts[i]++;
      drawRow(i);
      rows.forEach(function (x) { x.classList.remove("show"); x.disabled = true; });
      current = -1;
      here = 0;
      done1++;
      fb.clear();
      if (chip) { chip.remove(); chip = null; }
      rest();
      status();
      if (done1 < tries) { actBtn.disabled = false; actBtn.focus(); return; }
      actBtn.disabled = true;
      if (s.more) {
        more = el("button", { class: "btn secondary", type: "button", text: B.t("spMore", { n: B.fa(s.more) }), onclick: function () {
          more.remove();
          for (var k = 0; k < s.more; k++) counts[pick()]++;
          outs.forEach(function (o, k2) { drawRow(k2); });
          finish();
        } });
        box.insertBefore(row([more, E.nextBtn(B.t("spEnough"), function (e) { e.target.parentNode.remove(); finish(); })]), table);
        return;
      }
      finish();
    }
    actBtn.addEventListener("click", function () {
      if (current >= 0) return;
      actBtn.disabled = true;
      var i = pick();
      var show = function () {
        current = i;
        var o = outs[i];
        chip = el("button", { class: "tile-btn sp-chip", type: "button", "aria-label": B.t("spGot", { x: o.label }) }, [
          o.color && kind === "spinner" ? el("i", { class: "sp-swatch", style: "background:" + o.color }) : null,
          kind === "die" && !s.dice && E.quickPic ? E.quickPic("dice", o.n) : el("span", { class: "face word", text: o.label })]);
        E.draggable(chip, function (t) { var r = t.closest(".sp-row"); if (r) mark(rows.indexOf(r), r); });
        chip.addEventListener("click", function () { fb.say(B.t("spTapRow")); });
        shown.innerHTML = "";
        shown.appendChild(chip);
        rows.forEach(function (x) { x.disabled = false; });
        fb.say(B.t("spGot", { x: o.label }) + " " + B.t("spTapRow"));
        B.speak(B.t("spGot", { x: o.label }));
      };
      if (kind === "spinner") {
        var o = outs[i], land = o.from + (0.15 + Math.random() * 0.7) * (o.to - o.from);
        angle += 720 + ((360 - land) - angle % 360 + 360) % 360;
        wheel.style.transform = "rotate(" + angle + "deg)";
        setTimeout(show, 1500);
      } else {
        stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake");
        setTimeout(show, 700);
      }
    });
    function finish() {
      rows.forEach(function (r, i) { r.disabled = true; r.querySelector(".sp-n").textContent = B.fa(counts[i]); });
      actBtn.parentNode.remove();
      left.textContent = B.t("spDone", { n: B.fa(sum(counts)) });
      if (!s.question) { B.speak(fb.good()); setTimeout(function () { done(true, misses === 0); }, 1100); return; }
      var answer = s.answer;
      if (answer === "most" || answer === "least") {
        var best = answer === "most" ? Math.max.apply(null, counts) : Math.min.apply(null, counts);
        var at = counts.map(function (c, i) { return c === best ? i : -1; }).filter(function (i) { return i >= 0; });
        if (at.length > 1) {
          // A tie: no single right answer, so the question is answered for the child.
          box.appendChild(el("p", { class: "prompt", text: B.t("spTie", { list: at.map(function (i) { return outs[i].label; }).join(B.t("spAnd")) }) }));
          box.appendChild(row([E.nextBtn(null, function () { done(true, misses === 0); })]));
          return;
        }
        answer = outs[at[0]].label;
      }
      ending(box, { question: s.question, options: s.options || outs.map(function (o) { return o.label; }), answer: answer }, done, misses === 0);
    }
    status();
  };
})();
