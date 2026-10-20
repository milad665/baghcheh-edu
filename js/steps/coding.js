/* باغچه — block coding on a small grid (step type `code`), and the parent's screen-free game at the end of
   a thinking lesson (step type `unplugged`).

   code: the child lines up blocks (arrows, or forward and turns, and later a repeat block), presses «اجرا» and
   watches the character follow the program one block at a time. There is no losing: a program that misses is
   just something to fix (debugging is the skill). After two runs that miss, the first block that went wrong is
   coloured. Blocks are added by tapping, dragging, or the keyboard's arrow keys; tapping a block in the program
   takes it out, and the next block goes in its place. Right on the first try = the first run reached the goal.

   Fields: goal [x, y], optional start [x, y] (default [0, 0]), size [columns, rows] (default [5, 5]),
   walls [[x, y], …], blocks ("arrows": up/down/left/right, or "turn": forward, turn right, turn left),
   face (the way the character looks at the start, for "turn": up | down | left | right; default right),
   repeat (true: add the repeat block), max (most blocks the program may use), given (a program to start from,
   e.g. ["right", { repeat: 3, body: ["up"] }]), hero, goalPic, wall (emoji), prompt, say.
   x counts from the left, y from the top, both from 0.
   More blocks for the Tree garden (each only when the step asks for it):
     until: "goal" | "wall" | "count" — a "repeat until" box (until at the goal, until the way ahead is blocked, until
       the counter reaches target); in given: { until: "goal", body: [...] }.
     if: "wall" | "open" | "apple" — an "if … else" box with two strips; in given: { if: "wall", body, else }.
     nest: true — boxes may go inside boxes (a repeat inside a repeat).
     fn: true — a new block «⭐» that the child builds in its own strip and uses in the program (fnGiven: its blocks).
     pick: true — «بردار» picks up the apple on the square (apples: [[x, y], …] on the board).
     counter: true — «شمارنده = ۰» and «شمارنده + ۱» blocks and the counter shown; target: n — the run must pick n
       apples and the counter must say n (with no goal, the program just has to end).
     step: true — a «قدم بعدی» button that runs one block at a time, with the character's state shown.
     boards: [{ start, goal, walls, face, apples }, …] — one program has to solve every board, one after another.
     limit: most blocks a run may do (default 80), so a repeat that never ends is caught. */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  var MOVE = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
  var CLOCK = ["up", "right", "down", "left"];
  var OPS = {
    up: { glyph: "↑", name: "codeUp" },
    down: { glyph: "↓", name: "codeDown" },
    left: { glyph: "←", name: "codeLeft" },
    right: { glyph: "→", name: "codeRight" },
    fwd: { glyph: "👣", name: "codeForward", word: "codeForwardShort" },
    ccw: { glyph: "↺", name: "codeTurnLeft", word: "codeLeft" },
    cw: { glyph: "↻", name: "codeTurnRight", word: "codeRight" },
    pick: { glyph: "🧺", name: "codePick", word: "codePickShort" },
    inc: { glyph: "➕", name: "codeInc", word: "codeIncShort" },
    set: { glyph: "0️⃣", name: "codeSet", word: "codeSetShort" },
    call: { glyph: "⭐", name: "codeCall", word: "codeCallShort" }
  };
  var KEYS = {
    arrows: { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" },
    turn: { ArrowUp: "fwd", ArrowLeft: "ccw", ArrowRight: "cw" }
  };

  // Dragging a block (palette → program, or program → out of it). A short tap stays a normal click.
  function draggable(node, onDrop) {
    var start = null, ghost = null, over = null, dragged = false;
    function targetAt(x, y) { var t = document.elementFromPoint(x, y); return t && t.closest("[data-cdrop]"); }
    function end() {
      if (ghost) ghost.remove();
      if (over) over.classList.remove("drop-over");
      ghost = over = start = null;
    }
    node.addEventListener("pointerdown", function (e) {
      if (node.disabled || e.button > 0) return;
      start = [e.clientX, e.clientY];
      dragged = false;
      try { node.setPointerCapture(e.pointerId); } catch (x) { /* not all browsers */ }
    });
    node.addEventListener("pointermove", function (e) {
      if (!start) return;
      if (!ghost) {
        if (Math.hypot(e.clientX - start[0], e.clientY - start[1]) < 10) return;
        var r = node.getBoundingClientRect();
        ghost = node.cloneNode(true);
        ghost.classList.add("drag-ghost");
        ghost.style.width = r.width + "px";
        ghost.style.height = r.height + "px";
        document.body.appendChild(ghost);
        dragged = true;
      }
      ghost.style.left = e.clientX - ghost.offsetWidth / 2 + "px";
      ghost.style.top = e.clientY - ghost.offsetHeight / 2 + "px";
      var t = targetAt(e.clientX, e.clientY);
      if (t !== over) {
        if (over) over.classList.remove("drop-over");
        over = t;
        if (over) over.classList.add("drop-over");
      }
    });
    node.addEventListener("pointerup", function (e) {
      if (!ghost) { start = null; return; }
      var t = targetAt(e.clientX, e.clientY);
      end();
      onDrop(t);
    });
    node.addEventListener("pointercancel", end);
    node.addEventListener("click", function (e) { if (dragged) { dragged = false; e.stopImmediatePropagation(); } }, true);
  }

  // A given program, written as data, into the editor's blocks.
  function fromGiven(list) {
    return (list || []).map(function (b) {
      if (typeof b === "string") return { op: b };
      if (b.repeat) return { op: "repeat", n: b.repeat, body: fromGiven(b.body) };
      if (b.until) return { op: "until", cond: b.until, body: fromGiven(b.body) };
      if (b["if"]) return { op: "if", cond: b["if"], body: fromGiven(b.body), other: fromGiven(b["else"]) };
      return { op: String(b.op || "") };
    });
  }
  var BOXES = { repeat: 1, until: 1, "if": 1 };

  E.steps.code = function (s, box, done) {
    var cols = (s.size || [5, 5])[0], rows = (s.size || [5, 5])[1];
    var turn = s.blocks === "turn";
    var target = s.target || 0;
    var reduced = B.reducedMotion ? B.reducedMotion() : false;
    // One program, one or more boards (s.boards: each {start, goal, walls, face, apples}); it must solve them all.
    var BOARDS = (s.boards || [s]).map(function (b) {
      var w = {}, a = {};
      (b.walls || []).forEach(function (p) { w[p[0] + "," + p[1]] = true; });
      (b.apples || []).forEach(function (p) { a[p[0] + "," + p[1]] = true; });
      return { start: b.start || [0, 0], goal: b.goal || null, face: b.face || s.face || "right", walls: w, apples: a, appleList: b.apples || [] };
    });

    var root = el("div", { class: "code-game" + (BOARDS.length > 1 ? " multi" : "") });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("codePrompt") }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);

    // ---------- The boards ----------
    // Boards follow the page's direction (board 1 first); inside a board, x always counts from the left.
    var gridsRow = el("div", { class: "code-boards" });
    root.appendChild(gridsRow);
    BOARDS.forEach(function (bd, k) {
      var grid = el("div", { class: "code-grid", dir: "ltr", role: "img", "aria-label": BOARDS.length > 1 ? B.t("codeBoard", { n: B.fa(k + 1) }) : B.t("codeGridAria") });
      grid.style.setProperty("--cols", cols);
      grid.style.setProperty("--rows", rows);
      bd.cells = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var c = el("span", { class: "code-cell" });
          if (bd.walls[x + "," + y]) { c.classList.add("wall"); B.setArt(c, s.wall || "🪨"); }
          bd.cells.push(c);
          grid.appendChild(c);
        }
      }
      bd.cell = function (x, y) { return bd.cells[y * cols + x]; };
      if (bd.goal) { bd.goalNode = el("span", { class: "code-goal", "aria-hidden": "true", text: s.goalPic || "🍓" }); bd.cell(bd.goal[0], bd.goal[1]).appendChild(bd.goalNode); }
      bd.hero = el("span", { class: "code-hero", "aria-hidden": "true" }, [el("span", { class: "code-hero-pic", text: s.hero || (turn ? "🤖" : "🐢") })]);
      bd.nose = turn ? el("span", { class: "code-nose", text: "▲" }) : null;
      if (bd.nose) bd.hero.appendChild(bd.nose);
      bd.hero.style.width = 100 / cols + "%";
      bd.hero.style.height = 100 / rows + "%";
      grid.appendChild(bd.hero);
      bd.grid = grid;
      gridsRow.appendChild(BOARDS.length > 1 ? el("figure", { class: "code-board-fig" }, [grid, el("figcaption", { text: B.t("codeBoard", { n: B.fa(k + 1) }) })]) : grid);
    });
    var stateLine = (s.step || s.counter || target) ? el("p", { class: "code-state", "aria-live": "polite" }) : null;
    if (stateLine) root.appendChild(stateLine);

    // Emoji animals look to the left on most devices; in arrow mode the character turns to face where it goes.
    function look(bd, op) { if (!turn && (op === "left" || op === "right")) bd.hero.firstChild.classList.toggle("flip", op === "right"); }
    function place(bd) {
      bd.hero.style.left = bd.st.x * 100 / cols + "%";
      bd.hero.style.top = bd.st.y * 100 / rows + "%";
      if (bd.nose) bd.nose.style.transform = "translate(-50%, -50%) rotate(" + bd.angle + "deg) translateY(-0.95em)";
    }
    function home(bd) {
      bd.st = { x: bd.start[0], y: bd.start[1], h: bd.face, count: 0, picked: 0, apples: Object.assign({}, bd.apples) };
      bd.angle = CLOCK.indexOf(bd.st.h) * 90;
      bd.cells.forEach(function (c) { c.classList.remove("trail", "hit"); });
      bd.appleList.forEach(function (p) { var c = bd.cell(p[0], p[1]); B.setArt(c, "🍎"); c.classList.add("apple"); });
      bd.hero.classList.remove("bump", "happy");
      bd.grid.classList.remove("done", "missed");
      if (bd.goalNode) bd.goalNode.classList.remove("got");
      look(bd, bd.goal && bd.goal[0] > bd.start[0] ? "right" : "left");
      place(bd);
    }
    function homeAll() { BOARDS.forEach(home); showState(BOARDS[0]); }
    function showState(bd) {
      if (!stateLine || !bd) return;
      var parts = [];
      if (turn) parts.push(B.t("codeFacing", { dir: B.t({ up: "codeUp", right: "codeRight", down: "codeDown", left: "codeLeft" }[bd.st.h]) }));
      if (s.counter || target) parts.push(B.t("codeCounter", { n: B.fa(bd.st.count) }));
      if (target) parts.push(B.t("codePicked", { n: B.fa(bd.st.picked), of: B.fa(target) }));
      stateLine.textContent = parts.join(" · ");
    }

    function ahead(st) {
      var d = MOVE[st.h], nx = st.x + d[0], ny = st.y + d[1];
      return { x: nx, y: ny, out: nx < 0 || ny < 0 || nx >= cols || ny >= rows };
    }
    function blockedAhead(bd) { var a = ahead(bd.st); return a.out || !!bd.walls[a.x + "," + a.y]; }
    function apply(bd, st, op) {
      if (op === "cw" || op === "ccw") return { x: st.x, y: st.y, h: CLOCK[(CLOCK.indexOf(st.h) + (op === "cw" ? 1 : 3)) % 4] };
      var d = MOVE[op === "fwd" ? st.h : op];
      var nx = st.x + d[0], ny = st.y + d[1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return { bump: "edge", h: st.h };
      if (bd.walls[nx + "," + ny]) return { bump: "wall", x: nx, y: ny, h: st.h };
      return { x: nx, y: ny, h: st.h };
    }
    function atGoal(bd, st) { return !!bd.goal && st.x === bd.goal[0] && st.y === bd.goal[1]; }
    function test(bd, cond) {
      if (cond === "goal") return atGoal(bd, bd.st);
      if (cond === "wall") return blockedAhead(bd);
      if (cond === "open") return !blockedAhead(bd);
      if (cond === "apple") return !!bd.st.apples[bd.st.x + "," + bd.st.y];
      if (cond === "count") return bd.st.count >= target;
      return false;
    }

    // Fewest moves from a state to the goal (breadth-first; the boards are tiny): used to find the first block that
    // took the character off every shortest way.
    var ops = turn ? ["fwd", "cw", "ccw"] : ["up", "down", "left", "right"];
    function sk(st) { return st.x + "," + st.y + (turn ? "," + st.h : ""); }
    function dist(bd, from) {
      if (!bd.goal) return 0;
      bd.dc = bd.dc || {};
      var k0 = sk(from);
      if (bd.dc[k0] != null) return bd.dc[k0];
      var seen = {}, q = [[from, 0]];
      seen[k0] = true;
      while (q.length) {
        var cur = q.shift();
        if (atGoal(bd, cur[0])) return (bd.dc[k0] = cur[1]);
        ops.forEach(function (op) {
          var n = apply(bd, cur[0], op);
          if (n.bump || seen[sk(n)]) return;
          seen[sk(n)] = true;
          q.push([n, cur[1] + 1]);
        });
      }
      return (bd.dc[k0] = Infinity);
    }

    // ---------- The program (and the new block, when the step has one) ----------
    var program = fromGiven(s.given);
    var fnBody = s.fn ? fromGiven(s.fnGiven) : null;
    var tgt = { list: program, at: null }; // where the next block goes (at: null = at the end)
    var nest = !!s.nest;
    function stripNode(list, cls, aria) {
      var n = el("div", { class: "code-strip " + cls, role: "group", "aria-label": aria });
      n.dataset.cdrop = "";
      n._list = list;
      return n;
    }
    var fnStrip = null;
    if (fnBody) {
      fnStrip = stripNode(fnBody, "main fn", B.t("codeFnBodyAria"));
      root.appendChild(el("div", { class: "code-program code-fn" }, [el("span", { class: "code-flag code-fn-name", "aria-hidden": "true", text: "⭐" }),
        el("span", { class: "code-fn-label", text: B.t("codeFnDef") }), fnStrip]));
    }
    var strip = stripNode(program, "main", B.t("codeProgramAria"));
    var counterP = s.max ? el("p", { class: "hint code-count" }) : null;
    root.appendChild(el("div", { class: "code-program" }, [el("span", { class: "code-flag", "aria-hidden": "true", text: "🚩" }), strip]));
    if (counterP) root.appendChild(counterP);

    function count(list) {
      return list.reduce(function (n, b) { return n + 1 + (b.body ? count(b.body) : 0) + (b.other ? count(b.other) : 0); }, 0);
    }
    function used() { return count(program) + (fnBody ? count(fnBody) : 0); }
    function opName(op) { return B.t(OPS[op].name); }
    function headText(b) {
      if (b.op === "repeat") return B.t("codeTimes", { n: B.fa(b.n) });
      if (b.op === "until") return B.t(b.cond === "goal" ? "codeUntilGoal" : b.cond === "wall" ? "codeUntilWall" : "codeUntilCount", { n: B.fa(target) });
      return B.t(b.cond === "apple" ? "codeIfApple" : b.cond === "open" ? "codeIfOpen" : "codeIfWall");
    }

    function blockNode(b, list, i) {
      if (BOXES[b.op]) {
        var body = stripNode(b.body, "inner", B.t("codeLoopBodyAria"));
        var head;
        if (b.op === "repeat") {
          head = el("button", { class: "code-times", type: "button", "aria-label": B.t("codeLoopAria", { n: B.fa(b.n) }) },
            [el("span", { "aria-hidden": "true", text: "🔁 " }), headText(b)]);
          head.addEventListener("click", function () {
            if (running) return;
            b.n = b.n >= (s.maxRepeat || 5) ? 2 : b.n + 1;
            edited = true;
            changed();
            focusLater(".code-times", b);
          });
        } else {
          head = el("span", { class: "code-cond" }, [el("span", { "aria-hidden": "true", text: b.op === "until" ? "🔁 " : "❓ " }), headText(b)]);
        }
        var rm = el("button", { class: "code-loop-rm", type: "button", "aria-label": B.t("codeLoopRemove"), text: "✕" });
        rm.addEventListener("click", function () { if (!running) remove(list, i); });
        var kids = [el("div", { class: "code-loop-head" }, [head, rm]), body];
        if (b.op === "if") {
          var other = stripNode(b.other, "inner", B.t("codeElseAria"));
          kids.push(el("span", { class: "code-else", text: B.t("codeElse") }), other);
          fill(other, b.other);
        }
        var loop = el("div", { class: "code-loop op-" + b.op }, kids);
        loop._b = b;
        b.node = loop;
        fill(body, b.body);
        return loop;
      }
      var n = el("button", { class: "code-block op-" + b.op, type: "button", "aria-label": B.t("codeBlockAria", { name: opName(b.op) }) },
        [el("span", { class: "g", "aria-hidden": "true", text: OPS[b.op].glyph })]);
      if (OPS[b.op].word) n.appendChild(el("small", { text: B.t(OPS[b.op].word) }));
      n._b = b;
      b.node = n;
      n.addEventListener("click", function () { if (!running) remove(list, i); });
      draggable(n, function (t) { if (!running && (!t || !t.closest(".code-program"))) remove(list, i); });
      return n;
    }
    function slotNode(list) {
      var on = tgt.list === list;
      var sl = el("button", { class: "code-slot" + (on ? " on" : ""), type: "button", "aria-label": B.t(on ? "codeSlotAria" : "codeSlotPick") });
      sl.dataset.cdrop = "";
      sl._list = list;
      sl.addEventListener("click", function () {
        if (running || on) return;
        tgt = { list: list, at: null };
        changed();
        focusLater(".code-slot.on");
      });
      return sl;
    }
    function fill(container, list) {
      container.innerHTML = "";
      var at = tgt.list === list && tgt.at != null ? tgt.at : list.length;
      list.forEach(function (b, i) {
        if (i === at) container.appendChild(slotNode(list));
        container.appendChild(blockNode(b, list, i));
      });
      if (at >= list.length) container.appendChild(slotNode(list));
    }
    function focusLater(sel, b) {
      var n = b ? b.node && b.node.querySelector(sel) : root.querySelector(sel);
      if (n) n.focus();
    }
    // A box (repeat, until, if) goes only into the program itself, unless the step allows boxes inside boxes.
    function boxAllowed() { return nest || tgt.list === program || tgt.list === fnBody; }
    function changed() {
      if (dirty) { homeAll(); dirty = false; }
      root.querySelectorAll(".bug, .now").forEach(function (n) { n.classList.remove("bug", "now"); });
      fill(strip, program);
      if (fnStrip) fill(fnStrip, fnBody);
      if (counterP) counterP.textContent = B.t("codeUsed", { used: B.fa(used()), max: B.fa(s.max) });
      boxButtons.forEach(function (b) { b.disabled = !boxAllowed(); });
      fb.className = "feedback";
      fb.textContent = "";
      stepping = null;
    }

    function add(op, list, at) {
      if (running) return;
      if (list) tgt = { list: list, at: at != null ? at : (tgt.list === list ? tgt.at : null) };
      if (BOXES[op] && !boxAllowed()) return;
      if (op === "call" && tgt.list === fnBody) return; // the new block can't call itself
      if (s.max && used() + 1 > s.max) {
        fb.className = "feedback try";
        fb.textContent = B.t(s.repeat || s.fn ? "codeFullRepeat" : "codeFull");
        return;
      }
      var b = op === "repeat" ? { op: "repeat", n: 2, body: [] }
        : op === "until" ? { op: "until", cond: s.until || "goal", body: [] }
        : op === "if" ? { op: "if", cond: s["if"] || "wall", body: [], other: [] }
        : { op: op };
      var l = tgt.list, pos = tgt.at != null ? tgt.at : l.length;
      l.splice(pos, 0, b);
      edited = true;
      // A filled gap goes back to adding at the end; a new box takes the next blocks inside it.
      tgt = BOXES[op] ? { list: b.body, at: null } : { list: l, at: null };
      changed();
      if (!BOXES[op]) B.speak(opName(op));
    }
    function remove(list, i) {
      list.splice(i, 1);
      edited = true;
      tgt = { list: list, at: i < list.length ? i : null };
      changed();
      var sl = root.querySelector(".code-slot.on");
      if (sl) sl.focus();
    }

    // ---------- Palette ----------
    var palette = el("div", { class: "code-palette", dir: "ltr", role: "group", "aria-label": B.t("codePaletteAria") });
    var boxButtons = [];
    var list0 = (turn ? ["ccw", "fwd", "cw"] : ["left", "up", "down", "right"]);
    if (s.pick) list0.push("pick");
    if (s.counter) list0.push("set", "inc");
    if (s.fn) list0.push("call");
    if (s.repeat) list0.push("repeat");
    if (s.until) list0.push("until");
    if (s["if"]) list0.push("if");
    list0.forEach(function (op) {
      var b;
      if (BOXES[op]) {
        var label = op === "repeat" ? B.t("codeRepeat") : headText({ op: op, cond: op === "until" ? s.until : s["if"] });
        b = el("button", { class: "code-block op-" + op + (op === "repeat" ? "" : " wide"), type: "button", "aria-label": B.t("codeBoxAdd", { name: label }) },
          [el("span", { class: "g", "aria-hidden": "true", text: op === "if" ? "❓" : "🔁" }), el("small", { text: label })]);
        boxButtons.push(b);
      } else {
        b = el("button", { class: "code-block op-" + op, type: "button", "aria-label": B.t("codeAddAria", { name: opName(op) }) },
          [el("span", { class: "g", "aria-hidden": "true", text: OPS[op].glyph })]);
        if (OPS[op].word) b.appendChild(el("small", { text: B.t(OPS[op].word) }));
      }
      b.addEventListener("click", function () { add(op); });
      draggable(b, function (t) {
        if (!t) return;
        var holder = t.closest(".code-strip");
        if (!holder) return;
        var blk = t.closest(".code-block, .code-loop");
        var at = null;
        if (blk && blk.parentNode === holder) at = holder._list.indexOf(blk._b);
        add(op, holder._list, at != null && at >= 0 ? at : null);
      });
      palette.appendChild(b);
    });
    root.appendChild(palette);
    root.appendChild(el("p", { class: "hint", text: B.t("codeHint") }));
    root.appendChild(el("p", { class: "hint code-keys", text: B.t(turn ? "codeKeysTurn" : "codeKeys") }));

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);
    var runBtn = E.nextBtn(B.t("codeRun"), function () { run(false); });
    var stepBtn = s.step ? el("button", { class: "btn secondary", type: "button", text: B.t("codeStep"), onclick: function () { run(true); } }) : null;
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [stepBtn, runBtn]));

    root.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var op = KEYS[turn ? "turn" : "arrows"][e.key];
      if (op && e.target.tagName !== "INPUT") { e.preventDefault(); add(op); return; }
      if ((e.key === "Backspace" || e.key === "Delete") && !running) {
        var l = tgt.list, i = (tgt.at != null ? tgt.at : l.length) - 1;
        if (i >= 0) { e.preventDefault(); remove(l, i); }
      }
    });

    // ---------- Running the program ----------
    // The program runs block by block: boxes decide as they go (until, if look at the board at that moment).
    // With a given (buggy) program, runs before the child changes anything are just looking: they don't count as tries.
    var LIMIT = s.limit || 80;
    function* exec(bd, list, stack, depth) {
      for (var i = 0; i < list.length; i++) {
        var b = list[i];
        if (b.op === "repeat") {
          for (var k = 0; k < b.n; k++) yield* exec(bd, b.body, stack.concat([b]), depth);
        } else if (b.op === "until") {
          var guard = 0;
          while (!test(bd, b.cond)) {
            if (++guard > LIMIT) { yield { never: true, b: b }; return; }
            if (!b.body.length) { yield { never: true, b: b }; return; }
            yield* exec(bd, b.body, stack.concat([b]), depth);
          }
        } else if (b.op === "if") {
          yield { look: true, b: b, stack: stack };
          yield* exec(bd, test(bd, b.cond) ? b.body : b.other, stack.concat([b]), depth);
        } else if (b.op === "call") {
          yield { look: true, b: b, stack: stack };
          if (depth < 4) yield* exec(bd, fnBody, stack.concat([b]), depth + 1);
        } else yield { op: b.op, b: b, stack: stack };
      }
    }
    var running = false, dirty = false, tries = 0, misses = 0, edited = !s.given, stepping = null;
    function lock(on) {
      running = on;
      root.classList.toggle("running", on);
      runBtn.disabled = on;
      if (stepBtn) stepBtn.disabled = on;
      root.querySelectorAll(".code-palette button, .code-strip button, .code-times, .code-loop-rm").forEach(function (b) { b.disabled = on; });
      if (!on) boxButtons.forEach(function (b) { b.disabled = !boxAllowed(); });
    }
    function mark(a) {
      root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
      if (!a) return;
      if (a.b && a.b.node) a.b.node.classList.add("now");
      (a.stack || []).forEach(function (c) { if (c.node) c.node.classList.add("now"); });
    }
    // One run (or one manual walk through it, a block at a time): every board in turn.
    function start(manual) {
      if (!used() || !count(program)) { fb.className = "feedback"; fb.textContent = B.t("codeEmpty"); return null; }
      if (edited) tries++;
      homeAll();
      dirty = true;
      root.querySelectorAll(".bug, .now").forEach(function (n) { n.classList.remove("bug", "now"); });
      fb.className = "feedback";
      fb.textContent = "";
      var r = { k: 0, manual: manual };
      begin(r);
      return r;
    }
    function begin(r) {
      var bd = BOARDS[r.k];
      r.bd = bd;
      r.it = exec(bd, program, [], 0);
      r.firstBad = null;
      r.steps = 0;
      home(bd);
      bd.cell(bd.st.x, bd.st.y).classList.add("trail");
      BOARDS.forEach(function (o) { o.grid.classList.toggle("active", BOARDS.length > 1 && o === bd); });
      showState(bd);
    }
    // Does one block; returns the time to wait before the next, or a result ("win", "miss" / "next").
    function tick(r) {
      var bd = r.bd, nx = r.it.next();
      if (nx.done) { mark(null); return end(r); }
      var a = nx.value;
      mark(a);
      if (a.never) return fail(r, a.b, "codeNeverStops");
      if (a.look) return { wait: 0.6 };
      if (++r.steps > LIMIT) return fail(r, a.b, "codeNeverStops");
      var st = bd.st;
      if (a.op === "pick") {
        var key = st.x + "," + st.y;
        if (st.apples[key]) {
          delete st.apples[key];
          st.picked++;
          var c = bd.cell(st.x, st.y);
          c.classList.remove("apple");
          B.setArt(c, "");
        } else { bd.hero.classList.remove("bump"); void bd.hero.offsetWidth; bd.hero.classList.add("bump"); }
        showState(bd);
        return { wait: 1 };
      }
      if (a.op === "inc" || a.op === "set") {
        st.count = a.op === "inc" ? st.count + 1 : 0;
        showState(bd);
        if (stateLine) { stateLine.classList.remove("pop"); void stateLine.offsetWidth; stateLine.classList.add("pop"); }
        return { wait: 0.8 };
      }
      var before = dist(bd, st), next = apply(bd, st, a.op);
      if (next.bump) {
        if (next.bump === "wall") bd.cell(next.x, next.y).classList.add("hit");
        bd.hero.classList.remove("bump");
        void bd.hero.offsetWidth;
        bd.hero.classList.add("bump");
        return fail(r, a.b, next.bump === "wall" ? "codeBumpWall" : "codeBumpEdge");
      }
      if (!r.firstBad && bd.goal && dist(bd, next) !== before - 1) r.firstBad = a.b;
      if (a.op === "cw") bd.angle += 90;
      if (a.op === "ccw") bd.angle -= 90;
      next.count = st.count; next.picked = st.picked; next.apples = st.apples;
      bd.st = next;
      look(bd, a.op);
      place(bd);
      showState(bd);
      bd.cell(next.x, next.y).classList.add("trail");
      // Without a target to count, reaching the goal ends the run on this board.
      if (!target && atGoal(bd, next)) return end(r);
      return { wait: 1 };
    }
    function end(r) {
      var bd = r.bd, st = bd.st;
      if (target) {
        if (st.picked !== target) return fail(r, null, "codeNeedTarget");
        if (st.count !== st.picked) return fail(r, null, "codeCountWrong");
        if (bd.goal && !atGoal(bd, st)) return fail(r, r.firstBad, "codeShort");
      } else if (!atGoal(bd, st)) return fail(r, r.firstBad, "codeShort");
      bd.hero.classList.add("happy");
      bd.grid.classList.add("done");
      if (bd.goalNode) bd.goalNode.classList.add("got");
      if (r.k + 1 < BOARDS.length) { r.k++; begin(r); return { wait: 1.6 }; }
      return { win: true };
    }
    function fail(r, bad, msg) {
      r.bad = bad; r.msg = msg;
      r.bd.grid.classList.add("missed");
      return { miss: true };
    }
    function finish(r, res) {
      if (res.win) return win();
      miss(r);
    }
    function run(manual) {
      if (manual && stepping) {
        // The next block of a walk already started.
        var res = tick(stepping);
        if (res.win || res.miss) { var r0 = stepping; stepping = null; finish(r0, res); }
        return;
      }
      if (running) return;
      stepping = null;
      var r = start(manual);
      if (!r) return;
      if (manual) {
        stepping = r;
        fb.className = "feedback";
        fb.textContent = B.t("codeStepHint");
        return;
      }
      lock(true);
      var wait = reduced ? 650 : 520;
      (function loop() {
        if (!root.isConnected) return;
        var res = tick(r);
        if (res.win || res.miss) return setTimeout(function () { finish(r, res); }, wait);
        setTimeout(loop, wait * res.wait);
      })();
    }
    function miss(r) {
      if (!root.isConnected) return;
      misses++;
      lock(false);
      root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
      fb.className = "feedback try";
      var msg = B.t(r.msg, { n: B.fa(target), picked: B.fa(r.bd.st.picked), count: B.fa(r.bd.st.count) });
      fb.textContent = (BOARDS.length > 1 ? B.t("codeOnBoard", { n: B.fa(r.k + 1) }) + " " : "") + msg;
      // After two runs that miss, colour the first block that went wrong (or the place where blocks are missing).
      if (misses >= 2 && r.msg !== "codeNeverStops") {
        if (r.bad && r.bad.node) { r.bad.node.classList.add("bug"); fb.textContent += " " + B.t("codeBugHint"); }
        else if (!target) { var sl = strip.querySelector(".code-slot"); if (sl) sl.classList.add("bug"); fb.textContent += " " + B.t("codeNeedMore"); }
      } else if (r.msg === "codeNeverStops" && r.bad && r.bad.node) r.bad.node.classList.add("bug");
      B.speak(fb.textContent);
      runBtn.focus();
    }
    function win() {
      if (!root.isConnected) return;
      root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
      lock(true);
      fb.className = "feedback good";
      fb.textContent = B.t(BOARDS.length > 1 ? "codeAllBoards" : target && !BOARDS[0].goal ? "codeCounted" : "codeReached") + " " + E.pick(B.T.praise);
      B.speak(fb.textContent);
      setTimeout(function () { done(true, tries <= 1); }, 1500);
    }

    homeAll();
    changed();
  };

  // A coding game for home, without a screen. Written for the parent (STYLE.md: «شما»). Not scored.
  E.steps.unplugged = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("unpluggedFor") }));
    box.appendChild(el("div", { class: "parent-tip unplugged" }, [
      el("strong", { text: "🏡 " + B.t("unpluggedTitle") }),
      el("p", { text: s.text })
    ]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("finish"), function () { done(false); })]));
  };
})();
