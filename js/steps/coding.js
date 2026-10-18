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
   x counts from the left, y from the top, both from 0. */
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
    cw: { glyph: "↻", name: "codeTurnRight", word: "codeRight" }
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

  function fromGiven(list) {
    return (list || []).map(function (b) {
      return typeof b === "string" ? { op: b } : { op: "repeat", n: b.repeat || 2, body: fromGiven(b.body) };
    });
  }

  E.steps.code = function (s, box, done) {
    var cols = (s.size || [5, 5])[0], rows = (s.size || [5, 5])[1];
    var start = s.start || [0, 0];
    var turn = s.blocks === "turn";
    var walls = {};
    (s.walls || []).forEach(function (w) { walls[w[0] + "," + w[1]] = true; });
    var reduced = B.reducedMotion ? B.reducedMotion() : false;

    var root = el("div", { class: "code-game" });
    box.appendChild(root);
    root.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("codePrompt") }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) root.appendChild(sb);

    // ---------- The grid ----------
    var grid = el("div", { class: "code-grid", dir: "ltr", role: "img", "aria-label": B.t("codeGridAria") });
    grid.style.setProperty("--cols", cols);
    grid.style.setProperty("--rows", rows);
    var cells = [];
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var c = el("span", { class: "code-cell" });
        if (walls[x + "," + y]) { c.classList.add("wall"); c.textContent = s.wall || "🪨"; }
        cells.push(c);
        grid.appendChild(c);
      }
    }
    function cell(x, y) { return cells[y * cols + x]; }
    var goalNode = el("span", { class: "code-goal", "aria-hidden": "true", text: s.goalPic || "🍓" });
    cell(s.goal[0], s.goal[1]).appendChild(goalNode);
    var hero = el("span", { class: "code-hero", "aria-hidden": "true" }, [el("span", { class: "code-hero-pic", text: s.hero || (turn ? "🤖" : "🐢") })]);
    var nose = turn ? el("span", { class: "code-nose", text: "▲" }) : null;
    if (nose) hero.appendChild(nose);
    hero.style.width = 100 / cols + "%";
    hero.style.height = 100 / rows + "%";
    grid.appendChild(hero);
    root.appendChild(grid);

    // Emoji animals look to the left on most devices; in arrow mode the character turns to face where it goes.
    var pic = hero.firstChild;
    function look(op) { if (!turn && (op === "left" || op === "right")) pic.classList.toggle("flip", op === "right"); }
    var state, angle;
    function place() {
      hero.style.left = state.x * 100 / cols + "%";
      hero.style.top = state.y * 100 / rows + "%";
      if (nose) nose.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg) translateY(-0.95em)";
    }
    function home() {
      state = { x: start[0], y: start[1], h: s.face || "right" };
      angle = CLOCK.indexOf(state.h) * 90;
      cells.forEach(function (c) { c.classList.remove("trail", "hit"); });
      hero.classList.remove("bump", "happy");
      goalNode.classList.remove("got");
      look(s.goal[0] > start[0] ? "right" : "left");
      place();
    }
    home();

    function apply(st, op) {
      if (op === "cw" || op === "ccw") {
        return { x: st.x, y: st.y, h: CLOCK[(CLOCK.indexOf(st.h) + (op === "cw" ? 1 : 3)) % 4] };
      }
      var d = MOVE[op === "fwd" ? st.h : op];
      var nx = st.x + d[0], ny = st.y + d[1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return { bump: "edge", h: st.h };
      if (walls[nx + "," + ny]) return { bump: "wall", x: nx, y: ny, h: st.h };
      return { x: nx, y: ny, h: st.h };
    }
    function atGoal(st) { return st.x === s.goal[0] && st.y === s.goal[1]; }

    // Fewest moves from a state to the goal (breadth-first; the grids are tiny). Used to find the first block
    // that took the character off every shortest way.
    var distCache = {};
    var ops = turn ? ["fwd", "cw", "ccw"] : ["up", "down", "left", "right"];
    function sk(st) { return st.x + "," + st.y + (turn ? "," + st.h : ""); }
    function dist(from) {
      var k0 = sk(from);
      if (distCache[k0] != null) return distCache[k0];
      var seen = {}, q = [[from, 0]];
      seen[k0] = true;
      while (q.length) {
        var cur = q.shift();
        if (atGoal(cur[0])) return (distCache[k0] = cur[1]);
        ops.forEach(function (op) {
          var n = apply(cur[0], op);
          if (n.bump || seen[sk(n)]) return;
          seen[sk(n)] = true;
          q.push([n, cur[1] + 1]);
        });
      }
      return (distCache[k0] = Infinity);
    }

    // ---------- The program ----------
    var program = fromGiven(s.given);
    var target = { list: program, at: null }; // where the next block goes (at: null = at the end)
    var strip = el("div", { class: "code-strip main", role: "group", "aria-label": B.t("codeProgramAria") });
    strip.dataset.cdrop = "";
    strip._list = program;
    var counter = s.max ? el("p", { class: "hint code-count" }) : null;
    root.appendChild(el("div", { class: "code-program" }, [el("span", { class: "code-flag", "aria-hidden": "true", text: "🚩" }), strip]));
    if (counter) root.appendChild(counter);

    function count(list) { return list.reduce(function (n, b) { return n + 1 + (b.body ? count(b.body) : 0); }, 0); }
    function opName(op) { return B.t(OPS[op].name); }

    function blockNode(b, list, i) {
      if (b.op === "repeat") {
        var body = el("div", { class: "code-strip inner", role: "group", "aria-label": B.t("codeLoopBodyAria") });
        body.dataset.cdrop = "";
        body._list = b.body;
        var times = el("button", { class: "code-times", type: "button", "aria-label": B.t("codeLoopAria", { n: B.fa(b.n) }) },
          [el("span", { "aria-hidden": "true", text: "🔁 " }), B.t("codeTimes", { n: B.fa(b.n) })]);
        times.addEventListener("click", function () {
          if (running) return;
          b.n = b.n >= (s.maxRepeat || 5) ? 2 : b.n + 1;
          edited = true;
          changed();
          focusLater(".code-times", b);
        });
        var rm = el("button", { class: "code-loop-rm", type: "button", "aria-label": B.t("codeLoopRemove"), text: "✕" });
        rm.addEventListener("click", function () { if (!running) remove(list, i); });
        var loop = el("div", { class: "code-loop" }, [el("div", { class: "code-loop-head" }, [times, rm]), body]);
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
      var on = target.list === list;
      var sl = el("button", { class: "code-slot" + (on ? " on" : ""), type: "button",
        "aria-label": B.t(on ? "codeSlotAria" : "codeSlotPick") });
      sl.dataset.cdrop = "";
      sl._list = list;
      sl.addEventListener("click", function () {
        if (running || on) return;
        target = { list: list, at: null };
        changed();
        focusLater(".code-slot.on");
      });
      return sl;
    }
    function fill(container, list) {
      container.innerHTML = "";
      var at = target.list === list && target.at != null ? target.at : list.length;
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
    function changed() {
      if (dirty) { home(); dirty = false; }
      root.querySelectorAll(".bug, .now").forEach(function (n) { n.classList.remove("bug", "now"); });
      fill(strip, program);
      if (counter) counter.textContent = B.t("codeUsed", { used: B.fa(count(program)), max: B.fa(s.max) });
      if (paletteRepeat) paletteRepeat.disabled = target.list !== program;
      fb.className = "feedback";
      fb.textContent = "";
    }

    function add(op, list, at) {
      if (running) return;
      if (list) target = { list: list, at: at != null ? at : (target.list === list ? target.at : null) };
      if (op === "repeat" && target.list !== program) return;
      if (s.max && count(program) + 1 > s.max) {
        fb.className = "feedback try";
        fb.textContent = B.t(s.repeat ? "codeFullRepeat" : "codeFull");
        return;
      }
      var b = op === "repeat" ? { op: "repeat", n: 2, body: [] } : { op: op };
      var l = target.list, pos = target.at != null ? target.at : l.length;
      l.splice(pos, 0, b);
      edited = true;
      // A filled gap goes back to adding at the end; a new repeat block takes the next blocks inside it.
      target = op === "repeat" ? { list: b.body, at: null } : { list: l, at: null };
      changed();
      if (op !== "repeat") B.speak(opName(op));
    }
    function remove(list, i) {
      list.splice(i, 1);
      edited = true;
      target = { list: list, at: i < list.length ? i : null };
      changed();
      var sl = root.querySelector(".code-slot.on");
      if (sl) sl.focus();
    }

    // ---------- Palette ----------
    var palette = el("div", { class: "code-palette", dir: "ltr", role: "group", "aria-label": B.t("codePaletteAria") });
    var paletteRepeat = null;
    (turn ? ["ccw", "fwd", "cw"] : ["left", "up", "down", "right"]).concat(s.repeat ? ["repeat"] : []).forEach(function (op) {
      var b;
      if (op === "repeat") {
        b = el("button", { class: "code-block op-repeat", type: "button", "aria-label": B.t("codeRepeatAdd") },
          [el("span", { class: "g", "aria-hidden": "true", text: "🔁" }), el("small", { text: B.t("codeRepeat") })]);
        paletteRepeat = b;
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
        if (op === "repeat" && holder._list !== program) return;
        add(op, holder._list, at != null && at >= 0 ? at : null);
      });
      palette.appendChild(b);
    });
    root.appendChild(palette);
    root.appendChild(el("p", { class: "hint", text: B.t("codeHint") }));
    root.appendChild(el("p", { class: "hint code-keys", text: B.t(turn ? "codeKeysTurn" : "codeKeys") }));

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    root.appendChild(fb);
    var runBtn = E.nextBtn(B.t("codeRun"), run);
    root.appendChild(el("div", { class: "row", style: "justify-content:center" }, [runBtn]));

    root.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var op = KEYS[turn ? "turn" : "arrows"][e.key];
      if (op) { e.preventDefault(); add(op); return; }
      if ((e.key === "Backspace" || e.key === "Delete") && !running) {
        var l = target.list, i = (target.at != null ? target.at : l.length) - 1;
        if (i >= 0) { e.preventDefault(); remove(l, i); }
      }
    });

    // ---------- Running the program ----------
    // With a given (buggy) program, runs before the child changes anything are just looking: they don't count as tries.
    var running = false, dirty = false, tries = 0, misses = 0, edited = !s.given;
    function flatten(list, out, loop) {
      list.forEach(function (b) {
        if (b.op === "repeat") {
          for (var k = 0; k < b.n; k++) flatten(b.body, out, b);
        } else out.push({ op: b.op, b: b, loop: loop });
      });
      return out;
    }
    function lock(on) {
      running = on;
      root.classList.toggle("running", on);
      runBtn.disabled = on;
      root.querySelectorAll(".code-palette button, .code-strip button, .code-times, .code-loop-rm").forEach(function (b) { b.disabled = on; });
      if (!on && paletteRepeat) paletteRepeat.disabled = target.list !== program;
    }
    function run() {
      if (running) return;
      if (!count(program)) { fb.className = "feedback"; fb.textContent = B.t("codeEmpty"); return; }
      if (edited) tries++;
      home();
      dirty = true;
      root.querySelectorAll(".bug, .now").forEach(function (n) { n.classList.remove("bug", "now"); });
      fb.className = "feedback";
      fb.textContent = "";
      lock(true);
      var acts = flatten(program, []), i = 0, firstBad = null;
      cell(state.x, state.y).classList.add("trail");
      var wait = reduced ? 650 : 520;
      function mark(a) {
        root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
        if (a) { a.b.node.classList.add("now"); if (a.loop) a.loop.node.classList.add("now"); }
      }
      function tick() {
        if (!root.isConnected) return;
        if (i >= acts.length) { mark(null); return miss(firstBad, "codeShort"); }
        var a = acts[i++];
        mark(a);
        var before = dist(state), next = apply(state, a.op);
        if (next.bump) {
          if (next.bump === "wall") cell(next.x, next.y).classList.add("hit");
          hero.classList.remove("bump");
          void hero.offsetWidth;
          hero.classList.add("bump");
          return setTimeout(function () { miss(a.b, next.bump === "wall" ? "codeBumpWall" : "codeBumpEdge"); }, wait);
        }
        if (!firstBad && dist(next) !== before - 1) firstBad = a.b;
        if (a.op === "cw") angle += 90;
        if (a.op === "ccw") angle -= 90;
        state = next;
        look(a.op);
        place();
        cell(state.x, state.y).classList.add("trail");
        if (atGoal(state)) return setTimeout(win, wait);
        setTimeout(tick, wait);
      }
      setTimeout(tick, reduced ? 300 : 200);
    }
    function miss(bad, msg) {
      if (!root.isConnected) return;
      misses++;
      lock(false);
      root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
      fb.className = "feedback try";
      fb.textContent = B.t(msg);
      // After two runs that miss, colour the first block that went wrong (or the place where blocks are missing).
      if (misses >= 2) {
        if (bad && bad.node) { bad.node.classList.add("bug"); fb.textContent += " " + B.t("codeBugHint"); }
        else { var sl = strip.querySelector(".code-slot"); if (sl) sl.classList.add("bug"); fb.textContent += " " + B.t("codeNeedMore"); }
      }
      B.speak(fb.textContent);
      runBtn.focus();
    }
    function win() {
      if (!root.isConnected) return;
      root.querySelectorAll(".now").forEach(function (n) { n.classList.remove("now"); });
      hero.classList.add("happy");
      goalNode.classList.add("got");
      fb.className = "feedback good";
      fb.textContent = B.t("codeReached") + " " + E.pick(B.T.praise);
      B.speak(fb.textContent);
      setTimeout(function () { done(true, tries <= 1); }, 1500);
    }

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
