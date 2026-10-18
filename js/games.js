/* باغچه — game steps. In each game the thing the child does IS the skill being practised (matching a letter to
   its picture, building a word, sorting by first sound, giving the right number of things), never a reward
   added on top. No timers, no points, no losing: a wrong move bounces back with a gentle word, and after two
   misses on the same thing the right answer is shown. Everything works by tapping (mouse, touch, or keyboard:
   Tab and Enter), and dragging works too. A game counts as right on the first try when there were no misses.
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // Shuffled, but never left in the right order (that would give the answer away).
  function mix(list, same) {
    if (list.length < 2) return list.slice();
    var a, tries = 0;
    do { a = shuffle(list); } while (same(a) && ++tries < 30);
    return a;
  }

  /* One thing on a card or tile: a string (a letter, word or emoji), a number (shown in Persian digits), or
     { label, pic, dots, say }: a picture, a word under it, or dots to count. */
  function key(v) { return typeof v === "object" && v !== null ? String(v.value != null ? v.value : v.label != null ? v.label : v.pic) : String(v); }
  function isPic(t) { return /^[^؀-ۿA-Za-z0-9۰-۹]+$/.test(t); }
  function face(v) {
    if (typeof v === "number") return el("span", { class: "face num", text: B.fa(v) });
    if (typeof v === "string") return el("span", { class: "face " + (isPic(v) ? "pic" : "word"), text: v });
    var parts = [];
    if (v.pic) parts.push(el("span", { class: "face-pic", text: v.pic }));
    if (v.dots) {
      var d = el("span", { class: "dots", role: "img", "aria-label": B.fa(v.dots) });
      for (var i = 0; i < v.dots; i++) d.appendChild(el("i"));
      parts.push(d);
    }
    if (v.label != null) parts.push(el("span", { class: typeof v.label === "number" ? "num" : "word", text: typeof v.label === "number" ? B.fa(v.label) : v.label }));
    return el("span", { class: "face" + (parts.length > 1 ? " stack" : "") }, parts);
  }
  function aria(v) {
    if (typeof v === "number") return B.fa(v);
    if (typeof v === "string") return v;
    return v.say || (v.label != null ? B.fa(v.label) : v.dots ? B.fa(v.dots) : v.pic);
  }

  function feedback(box) {
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    return {
      good: function (t) { fb.className = "feedback good"; fb.textContent = t || E.pick(B.T.praise); return fb.textContent; },
      tryAgain: function (t) { fb.className = "feedback try"; fb.textContent = t || E.pick(B.T.retry); },
      say: function (t) { fb.className = "feedback"; fb.textContent = t; },
      clear: function () { fb.className = "feedback"; fb.textContent = ""; }
    };
  }
  function bounce(node) { node.classList.remove("wrong"); void node.offsetWidth; node.classList.add("wrong"); }
  // The game is complete: praise (or say the word that was built), then go on.
  function finish(fb, done, first, word) {
    var t = fb.good();
    B.speak(word || t);
    setTimeout(function () { done(true, first); }, 1100);
  }
  // Moves keyboard focus on to the next thing that can still be used, so Tab-and-Enter play keeps flowing.
  function focusNext(list) {
    var n = list.find(function (b) { return !b.disabled && b.offsetParent !== null; });
    if (n && document.activeElement && document.activeElement !== document.body) n.focus();
  }

  /* Dragging, on top of tapping: drag a button onto anything marked data-drop, and onDrop(target) is called.
     A short tap is still a normal click. */
  function draggable(node, onDrop) {
    var start = null, ghost = null, over = null, dragged = false;
    node.classList.add("draggable");
    function targetAt(x, y) {
      var t = document.elementFromPoint(x, y);
      return t && t.closest("[data-drop]");
    }
    function end() {
      if (ghost) ghost.remove();
      if (over) over.classList.remove("drop-over");
      node.classList.remove("dragging");
      ghost = over = start = null;
    }
    node.addEventListener("pointerdown", function (e) {
      if (node.disabled || e.button > 0) return;
      start = [e.clientX, e.clientY];
      dragged = false;
      // Keep getting the moves even when a quick hand leaves the tile before the first one arrives.
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
        node.classList.add("dragging");
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
      if (t) onDrop(t);
    });
    node.addEventListener("pointercancel", end);
    // After a drag, the browser may still send a click: ignore it.
    node.addEventListener("click", function (e) {
      if (dragged) { dragged = false; e.stopImmediatePropagation(); }
    }, true);
  }

  // ---------- pairs: find the pairs (open cards), or a memory game (hidden: true) ----------

  /* pairs: [[a, b], …] (letter and picture, number and dots, word and picture…). Open: tap a card in the top
     row and its partner in the bottom row (or drag one onto the other). Hidden: all cards face down; turn two.
     In the memory game a miss only counts when the partner had already been seen. */
  E.steps.pairs = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t(s.hidden ? "pairsHiddenPrompt" : "pairsPrompt") }));
    var sb = E.speakBtn(s.say, s.audio);
    if (sb) box.appendChild(sb);
    var cards = [], misses = 0, missFor = {}, left = s.pairs.length, picked = null;
    var fb;
    function make(v, pair, side) {
      var b = el("button", { class: "card-btn" + (s.hidden ? " down" : ""), type: "button" }, [face(v)]);
      b.dataset.pair = pair;
      b.dataset.side = side;
      b.setAttribute("aria-label", s.hidden ? B.t("cardHidden", { n: B.fa(cards.length + 1) }) : aria(v));
      b._aria = aria(v);
      b._say = v && v.say;
      cards.push(b);
      return b;
    }
    function matched(a, b) {
      [a, b].forEach(function (c) { c.classList.remove("picked", "show", "down"); c.classList.add("matched"); c.disabled = true; c.setAttribute("aria-label", c._aria); c.removeAttribute("aria-pressed"); });
      left--;
      if (!left) finish(fb, done, s.hidden ? misses <= 1 : misses === 0);
      else { fb.good(); focusNext(cards); }
    }
    function partnerOf(c) { return cards.find(function (x) { return x !== c && x.dataset.pair === c.dataset.pair; }); }

    if (!s.hidden) {
      var top = el("div", { class: "card-row" }), bottom = el("div", { class: "card-row" });
      mix(s.pairs.map(function (p, i) { return i; }), function () { return false; }).forEach(function (i) { top.appendChild(make(s.pairs[i][0], i, "a")); });
      mix(s.pairs.map(function (p, i) { return i; }), function () { return false; }).forEach(function (i) { bottom.appendChild(make(s.pairs[i][1], i, "b")); });
      box.appendChild(el("div", { class: "pairs" }, [top, bottom]));
      fb = feedback(box);
      var choose = function (c) {
        if (c.disabled) return;
        if (c._say) B.speak(c._say);
        if (!picked || picked.dataset.side === c.dataset.side) {
          if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
          picked = picked === c ? null : c;
          if (picked) { c.classList.add("picked"); c.setAttribute("aria-pressed", "true"); fb.say(B.t("pairsNow")); }
          return;
        }
        var a = picked;
        picked = null;
        a.classList.remove("picked");
        if (a.dataset.pair === c.dataset.pair) { matched(a, c); return; }
        misses++;
        bounce(c);
        a.setAttribute("aria-pressed", "false");
        fb.tryAgain();
        var k = a.dataset.side === "a" ? a.dataset.pair : c.dataset.pair;
        missFor[k] = (missFor[k] || 0) + 1;
        if (missFor[k] >= 2) {
          cards.filter(function (x) { return x.dataset.pair === k; }).forEach(function (x) { x.classList.add("show"); });
          fb.say(B.t("gameShowPair"));
        }
      };
      cards.forEach(function (c) {
        c.addEventListener("click", function () { choose(c); });
        c.dataset.drop = "";
        draggable(c, function (t) {
          if (t === c || t.disabled || t.dataset.side === c.dataset.side || !t.classList.contains("card-btn")) return;
          if (picked && picked !== c) { picked.classList.remove("picked"); }
          picked = c;
          choose(t);
        });
      });
      return;
    }

    // Memory game.
    var all = [];
    s.pairs.forEach(function (p, i) { all.push([p[0], i, "a"], [p[1], i, "b"]); });
    var grid = el("div", { class: "card-grid" + (all.length > 8 ? " wide" : "") });
    shuffle(all).forEach(function (x) { grid.appendChild(make(x[0], x[1], x[2])); });
    box.appendChild(grid);
    fb = feedback(box);
    var open = [], seen = {}, hideTimer = null;
    function turn(c, up) {
      c.classList.toggle("down", !up);
      c.setAttribute("aria-label", up ? c._aria : B.t("cardHidden", { n: B.fa(cards.indexOf(c) + 1) }));
    }
    function closeOpen() {
      clearTimeout(hideTimer);
      open.forEach(function (c) { if (!c.disabled) turn(c, false); });
      open = [];
    }
    cards.forEach(function (c, idx) {
      c.addEventListener("click", function () {
        if (c.disabled || open.indexOf(c) !== -1) return;
        if (open.length === 2) closeOpen();
        turn(c, true);
        if (c._say) B.speak(c._say);
        c.classList.remove("show");
        open.push(c);
        if (open.length < 2) { seen[idx] = true; return; }
        var a = open[0];
        if (a.dataset.pair === c.dataset.pair) { open = []; matched(a, c); seen[idx] = true; return; }
        var pa = partnerOf(a);
        if (seen[cards.indexOf(pa)]) {
          misses++;
          missFor[a.dataset.pair] = (missFor[a.dataset.pair] || 0) + 1;
          fb.tryAgain(B.t("pairsRemember"));
          // Twice wrong although the partner was seen: show where it is.
          if (missFor[a.dataset.pair] >= 2) pa.classList.add("show");
        } else fb.say(B.t("pairsKeepLooking"));
        seen[idx] = true;
        hideTimer = setTimeout(closeOpen, 1400);
      });
    });
  };

  // ---------- build and order: put tiles in order into slots ----------

  /* Shared by build and order. answer: the keys in the right order. tiles: [{ v, key }]. The next empty slot
     takes the tile tapped (or dropped on the slot row); a wrong tile bounces back. */
  function sequence(box, cfg, done) {
    var row = el("div", { class: "slots" + (cfg.cls ? " " + cfg.cls : "") });
    if (cfg.ltr) row.dir = "ltr";
    row.dataset.drop = "";
    var slots = cfg.answer.map(function (k, i) {
      var sl = el("span", { class: "slot-box", "aria-label": B.t("slotAria", { n: B.fa(i + 1) }) });
      if (cfg.numbered) sl.appendChild(el("small", { class: "slot-n", text: B.fa(i + 1) }));
      row.appendChild(sl);
      return sl;
    });
    var tray = el("div", { class: "tray" + (cfg.cls ? " " + cfg.cls : "") });
    if (cfg.ltr) tray.dir = "ltr";
    var at = 0, misses = 0, missHere = 0;
    box.appendChild(row);
    box.appendChild(tray);
    if (cfg.hint) box.appendChild(el("p", { class: "hint", text: cfg.hint }));
    var fb = feedback(box);
    var buttons = cfg.tiles.map(function (t) {
      var b = el("button", { class: "tile-btn", type: "button", "aria-label": aria(t.v) }, [face(t.v)]);
      b._key = t.key;
      b._v = t.v;
      function put() {
        if (b.disabled || at >= slots.length) return;
        if (b._key !== cfg.answer[at]) {
          misses++;
          missHere++;
          bounce(b);
          fb.tryAgain(cfg.tryText);
          if (missHere >= 2) {
            var right = buttons.find(function (x) { return !x.disabled && x._key === cfg.answer[at]; });
            if (right) right.classList.add("show");
            fb.say(B.t("gameShowItem"));
          }
          return;
        }
        var sl = slots[at++];
        sl.appendChild(face(b._v));
        sl.classList.add("filled");
        b.disabled = true;
        b.classList.remove("show");
        b.classList.add("used");
        missHere = 0;
        if (cfg.onPlace) cfg.onPlace(b._v);
        if (at < slots.length) { fb.clear(); focusNext(buttons); return; }
        buttons.forEach(function (x) { x.disabled = true; });
        tray.style.visibility = "hidden";
        if (cfg.onComplete) cfg.onComplete(row);
        finish(fb, done, misses === 0, cfg.sayAtEnd);
      }
      b.addEventListener("click", put);
      draggable(b, function (target) { if (target === row) put(); });
      tray.appendChild(b);
      return b;
    });
  }

  /* build: make a word from letters or syllables. word (shown joined at the end), parts (in reading order),
     optional extra (tiles that don't belong), pic, say. */
  E.steps.build = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("buildPrompt") }));
    if (s.pic) box.appendChild(el("p", { class: "build-pic", "aria-hidden": "true", text: s.pic }));
    var sb = E.speakBtn(s.say || s.word, s.audio);
    if (sb) box.appendChild(sb);
    var tiles = s.parts.concat(s.extra || []).map(function (p) { return { v: p, key: p }; });
    var word = el("p", { class: "blend-word", text: s.word });
    sequence(box, {
      answer: s.parts.slice(),
      tiles: mix(tiles, function (a) { return a.slice(0, s.parts.length).map(function (t) { return t.key; }).join() === s.parts.join(); }),
      cls: "letters",
      hint: B.t("dragHint"),
      sayAtEnd: s.say || s.word,
      onComplete: function (row) {
        row.classList.add("joined");
        row.parentNode.insertBefore(word, row.nextSibling);
        void word.offsetWidth;
        word.classList.add("on");
      }
    }, done);
  };

  /* order: put things in order. items in the right order (strings, numbers or { label, pic }), optional
     prompt, ltr (numbers, left to right), numbered (show ۱، ۲، ۳ under the slots, for story steps). */
  E.steps.order = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("orderPrompt") }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var tiles = s.items.map(function (v, i) { return { v: v, key: String(i) }; });
    sequence(box, {
      answer: s.items.map(function (v, i) { return String(i); }),
      tiles: mix(tiles, function (a) { return a.every(function (t, i) { return t.key === String(i); }); }),
      ltr: s.ltr, numbered: s.numbered, cls: s.numbered ? "cards" : "",
      hint: B.t("dragHint")
    }, done);
  };

  // ---------- sort: put each thing in the right basket ----------

  /* baskets: [{ label, pic, value }] (value defaults to the label). items: [{ label, pic, dots, say, basket }]
     where basket is the basket's value. Tap a thing (it is said aloud when it has say), then its basket;
     or drag it onto the basket. */
  E.steps.sort = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var sb = E.speakBtn(s.say || s.prompt, s.audio);
    if (sb) box.appendChild(sb);
    var picked = null, misses = 0, left = s.items.length;
    var baskets = s.baskets.map(function (bk) {
      var b = el("button", { class: "basket", type: "button", "aria-label": B.t("basketAria", { name: aria(bk) }) },
        [el("span", { class: "basket-label" }, [face(bk)]), el("span", { class: "basket-in" })]);
      b._value = String(bk.value != null ? bk.value : bk.label != null ? bk.label : bk.pic);
      b.dataset.drop = "";
      b.addEventListener("click", function () { drop(b); });
      return b;
    });
    var tray = el("div", { class: "tray" });
    var items = mix(s.items, function () { return false; }).map(function (it) {
      var b = el("button", { class: "tile-btn", type: "button", "aria-label": aria(it), "aria-pressed": "false" }, [face(it)]);
      b._it = it;
      b._miss = 0;
      b.addEventListener("click", function () {
        if (b.disabled) return;
        if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
        picked = picked === b ? null : b;
        if (!picked) return;
        b.classList.add("picked");
        b.setAttribute("aria-pressed", "true");
        if (it.say) B.speak(it.say, it.audio);
        fb.say(B.t("sortNow"));
      });
      draggable(b, function (t) {
        if (!t.classList.contains("basket")) return;
        if (picked && picked !== b) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
        picked = b;
        drop(t);
      });
      tray.appendChild(b);
      return b;
    });
    box.appendChild(el("div", { class: "baskets" }, baskets));
    box.appendChild(tray);
    box.appendChild(el("p", { class: "hint", text: B.t("dragHint") }));
    var fb = feedback(box);

    function drop(bk) {
      if (!picked) { fb.say(B.t("sortPickFirst")); return; }
      var it = picked._it;
      if (String(it.basket) === bk._value) {
        bk.querySelector(".basket-in").appendChild(face(it.pic ? it.pic : it));
        picked.disabled = true;
        picked.classList.remove("picked");
        picked.classList.add("used");
        picked.removeAttribute("aria-pressed");
        picked = null;
        baskets.forEach(function (x) { x.classList.remove("show"); });
        left--;
        if (!left) { finish(fb, done, misses === 0); return; }
        fb.good();
        focusNext(items);
        return;
      }
      misses++;
      picked._miss++;
      bounce(bk);
      fb.tryAgain();
      if (picked._miss >= 2) {
        baskets.forEach(function (x) { if (x._value === String(it.basket)) x.classList.add("show"); });
        fb.say(B.t("gameShowPlace"));
      }
    }
  };

  // ---------- feed: give the animal exactly the number it asks for ----------

  /* n (how many), or a and b (the sign shows a + b and the answer is the sum), optional animal, food, prompt, max
     (how many are on the table; default n + 4). The child moves food onto the plate (tap or drag; tap it on
     the plate to take it back) and then presses «بفرما». */
  E.steps.feed = function (s, box, done) {
    var n = s.n != null ? s.n : s.a + s.b;
    var animal = s.animal || "🐰", food = s.food || "🥕";
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("feedPrompt") }));
    var sign = el("span", { class: "feed-sign", dir: "ltr", text: s.n != null ? B.fa(n) : B.fa(s.a) + " + " + B.fa(s.b) });
    var critter = el("span", { class: "feed-animal", "aria-hidden": "true", text: animal });
    var plate = el("div", { class: "plate", role: "group", "aria-label": B.t("plateAria") });
    plate.dataset.drop = "";
    box.appendChild(el("div", { class: "feed" }, [el("div", { class: "feed-who" }, [critter, sign]), plate]));
    var table = el("div", { class: "tray table" });
    var total = s.max || n + 4;
    var onPlate = [], tries = 0, labelled = false;
    function count() { return onPlate.length; }
    function relabel() {
      onPlate.forEach(function (b, i) {
        var tag = b.querySelector(".n");
        if (labelled) { if (!tag) { tag = el("span", { class: "n" }); b.appendChild(tag); } tag.textContent = B.fa(i + 1); }
        else if (tag) tag.remove();
      });
    }
    function move(b) {
      if (b.disabled) return;
      var i = onPlate.indexOf(b);
      if (i === -1) { onPlate.push(b); plate.appendChild(b); b.setAttribute("aria-label", B.t("plateTake")); }
      else { onPlate.splice(i, 1); table.appendChild(b); b.setAttribute("aria-label", B.t("plateGive")); }
      relabel();
      fb.clear();
      b.focus();
    }
    for (var i = 0; i < total; i++) {
      (function () {
        var b = el("button", { class: "food", type: "button", "aria-label": B.t("plateGive") }, [el("span", { "aria-hidden": "true", text: food })]);
        b.addEventListener("click", function () { move(b); });
        draggable(b, function (t) {
          var onIt = onPlate.indexOf(b) !== -1;
          if ((t === plate) !== onIt) move(b);
        });
        table.appendChild(b);
      })();
    }
    table.dataset.drop = "";
    box.appendChild(table);
    var fb = feedback(box);
    var give = E.nextBtn(B.t("feedGive"), function () {
      tries++;
      var c = count();
      if (c === n) {
        give.disabled = true;
        table.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
        onPlate.forEach(function (x) { x.disabled = true; x.classList.add("eaten"); });
        critter.classList.add("happy");
        fb.good(B.t("feedYum"));
        B.speak(B.t("feedYum"));
        setTimeout(function () { done(true, tries === 1); }, 1500);
        return;
      }
      fb.tryAgain(c < n ? B.t("feedMore") : B.t("feedLess"));
      bounce(critter);
      // After two tries, number the food on the plate to help count it.
      if (tries >= 2 && !labelled) { labelled = true; relabel(); }
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [give]));
  };

  // ---------- pattern: what comes next? ----------

  /* seq: the whole pattern, blanks: the places (from 0) the child fills, options: things to choose from,
     optional prompt, ltr (left to right, for numbers). Tap an option to fill the next blank, or drag it there. */
  E.steps.pattern = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("patternPrompt") }));
    var sb = E.speakBtn(s.say, s.audio);
    if (sb) box.appendChild(sb);
    var row = el("div", { class: "pattern" });
    if (s.ltr) row.dir = "ltr";
    var blanks = s.blanks || [s.seq.length - 1];
    var holes = [], at = 0, misses = 0, missHere = 0;
    s.seq.forEach(function (v, i) {
      if (blanks.indexOf(i) === -1) { row.appendChild(el("span", { class: "pat-item" }, [face(v)])); return; }
      var h = el("span", { class: "pat-item hole", "aria-label": B.t("slotAria", { n: B.fa(holes.length + 1) }) });
      h._want = key(v);
      h.dataset.drop = "";
      holes.push(h);
      row.appendChild(h);
    });
    box.appendChild(row);
    var tray = el("div", { class: "tray" });
    if (s.ltr) tray.dir = "ltr";
    box.appendChild(tray);
    var fb = feedback(box);
    function mark() { holes.forEach(function (h, i) { h.classList.toggle("now", i === at); }); }
    function put(b, hole) {
      if (at >= holes.length) return;
      hole = hole || holes[at];
      if (hole !== holes[at]) return;
      if (b._key !== hole._want) {
        misses++;
        missHere++;
        bounce(b);
        fb.tryAgain();
        if (missHere >= 2) {
          buttons.forEach(function (x) { if (x._key === hole._want) x.classList.add("show"); });
          fb.say(B.t("gameShowItem"));
        }
        return;
      }
      hole.appendChild(face(b._v));
      hole.classList.add("filled");
      buttons.forEach(function (x) { x.classList.remove("show"); });
      missHere = 0;
      at++;
      mark();
      if (at < holes.length) { fb.good(); return; }
      buttons.forEach(function (x) { x.disabled = true; });
      finish(fb, done, misses === 0);
    }
    var buttons = mix(s.options, function () { return false; }).map(function (v) {
      var b = el("button", { class: "tile-btn", type: "button", "aria-label": aria(v) }, [face(v)]);
      b._key = key(v);
      b._v = v;
      b.addEventListener("click", function () { put(b); });
      draggable(b, function (t) { if (t.classList.contains("hole")) put(b, t); });
      tray.appendChild(b);
      return b;
    });
    mark();
  };
})();
