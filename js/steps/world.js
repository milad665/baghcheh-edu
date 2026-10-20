/* باغچه — step types for ایران و جهان (world).
   - map: a map seen from above, drawn with inline SVG. Picture maps (a room, a home, a neighbourhood) use emoji
     places on simple shapes, symbol maps add a legend, and outline maps (Iran, js/maps/iran.js) draw provinces,
     seas and cities from SVG paths. The child taps a named place («نانوایی کجاست؟»), follows a route by tapping
     places in order, or finds their own province; with no tasks, the child taps places to hear their names
     (not scored).
     Outline maps of the region and the world (js/maps/region.js, world.js) have countries, continents, oceans,
     capitals and the equator; Iran's map can show its relief (js/maps/iran-relief.js). Any map can have a
     letter-and-number grid (tap a square, name a square) and a scale bar (about how far is it?).
   - compass: turn to north, south, east or west (the sun rises in the east). Untimed, gentle feedback.
   - timeline: put pictures and events in their place on a timeline, in fuzzy bands (now, when grandparents were
     small, long ago) or by years.
   - source: look closely at a picture of an object, a building, a photo or an old text and talk about it
     («چه می‌بینی؟ چه فکر می‌کنی؟ چه سؤالی داری؟»), with questions for the parent. Not scored.
   - Flags (B.flagSvg, B.flagFace): a country's flag from js/maps/flags.js, in cards (`pairs`, `sort`: { flag })
     and on maps; flag "iran" is the flag the parent chose in «بخش والدین», or an empty flag that asks.
     Games rules (js/games.js): no timers or points, a gentle bounce on a miss, the answer shown after two misses
     on the same thing; tap, drag (the 📍 or the walker below the map onto a place) and keyboard (Tab and Enter).
   Step types are added to B.engine.steps (js/engine.js). */
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
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  function bounce(node) { node.classList.remove("wrong"); void node.getBoundingClientRect(); node.classList.add("wrong"); }
  // A place's name: its English name (en) when the lesson is played in English.
  function nameOf(p) { return B.inEnglish && B.inEnglish() && p.en ? p.en : p.name; }

  /* A shape on the map: { rect: [x, y, w, h], r } or { circle: [cx, cy, r] } or { d: "M…" } (an SVG path),
     with kind (floor, wall, rug, bed, table, road, grass, water, block, roof, sand, land, sea…: a CSS class
     map-<kind>), optional fill (a colour, for one-off things) and label (small text on the shape). */
  function shape(sh) {
    var n;
    if (sh.rect) n = svgEl("rect", { x: sh.rect[0], y: sh.rect[1], width: sh.rect[2], height: sh.rect[3], rx: sh.r || 0 });
    else if (sh.circle) n = svgEl("circle", { cx: sh.circle[0], cy: sh.circle[1], r: sh.circle[2] });
    else n = svgEl("path", { d: sh.d });
    n.setAttribute("class", "map-shape map-" + (sh.kind || "block"));
    if (sh.fill) n.style.fill = sh.fill;
    return n;
  }

  /* ---------- map: find places, follow a route ----------
     map: an object, or the name of one in B.MAPS (shared by several lessons):
       { view: [w, h] (the SVG viewBox, default [400, 300]), bg (kind of the background, default "grass"),
         shapes: [shapes, see above], deco: [{ pic, at: [x, y], size }] (pictures that are not places),
         places: [{ id, name, pic, at: [x, y], size, say, d, kind }] }
       A place has a picture (pic, an emoji at `at`) or an outline (d, an SVG path, e.g. a province, coloured by
       kind), or both; `at` is where its picture, ring and name go. name is said when it is tapped (or say).
       Places may have en (the English name) and, on symbol maps, legend: [{ pic, name, en }] says what each
       symbol (an emoji such as 🟢) means; the legend is shown under the map and its items are said when tapped.
     tasks: [{ find: id, prompt, say }] tap the place; or [{ route: [id, id, …], prompt, say, walker }] start at
       the first place and tap the others in order (the walker, an emoji, walks there); or [{ mine: true, prompt,
       say }] tap your own province (any province is right; nothing is stored, and «نمی‌دانم» goes on).
     Optional prompt, say, labels: true (names written under the places, for readers), enough: n (explore: «بعدی»
       appears after n places, not all of them), and for outline maps layers and cities (see outline below). */
  E.steps.map = function (s, box, done) {
    var m = typeof s.map === "string" ? (B.MAPS || {})[s.map] : s.map;
    if (m.provinces) m = outline(m, s);
    else if (m.countries) m = countryMap(m, s);
    var view = m.view || [400, 300];
    var grid = s.grid ? gridOf(s.grid, view) : null, pad = grid ? 16 : 0;
    var tasks = s.tasks || [];
    var explore = !tasks.length;
    if (s.prompt || explore) box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("mapExplore") }));
    var task = el("p", { class: "prompt map-task", "aria-live": "polite" });
    if (!explore) box.appendChild(task);

    var svg = svgEl("svg", { viewBox: -pad + " " + -pad + " " + (view[0] + pad) + " " + (view[1] + pad), class: "map-svg", role: "group", "aria-label": B.t("mapAria") });
    if (m.svgClass) svg.classList.add(m.svgClass);
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: view[0], height: view[1], class: "map-shape map-" + (m.bg || "grass") }));
    if (m.outline) svg.classList.add("map-outline");
    (m.shapes || []).forEach(function (sh) {
      svg.appendChild(shape(sh));
      if (sh.label && sh.rect) svg.appendChild(svgEl("text", { x: sh.rect[0] + sh.rect[2] / 2, y: sh.rect[1] + sh.rect[3] / 2, class: "map-label", "text-anchor": "middle", "dominant-baseline": "central" }, sh.label));
    });
    (m.deco || []).forEach(function (d) {
      var pic = B.svgArt(d.pic, 30 * (d.size || 1), "map-pic");
      pic.setAttribute("transform", "translate(" + d.at[0] + " " + d.at[1] + ")");
      pic.setAttribute("aria-hidden", "true");
      svg.appendChild(pic);
    });
    var legs = svgEl("g", { class: "map-legs" });

    var byId = {}, places = (m.places || []).map(function (p) {
      var size = p.size || 1, r = p.dot ? 8 * size : 24 * size;
      var g = svgEl("g", { class: "map-place" + (p.d && !p.pic && !p.dot ? " map-area" : ""), tabindex: "0", role: "button", "aria-label": nameOf(p) });
      if (p.d) g.appendChild(svgEl("path", { d: p.d, class: "map-region map-" + (p.kind || "land") }));
      // A line (the equator) is thin: a wide clear stroke over it takes the taps.
      if (p.kind === "equator") g.appendChild(svgEl("path", { d: p.d, class: "map-hit" }));
      var fl = s.flags && p.flag && B.flagSvg ? B.flagSvg(p.flag, 22 * (p.size || 1)) : null;
      if (fl) {
        fl.setAttribute("x", p.at[0] - 11 * (p.size || 1));
        fl.setAttribute("y", p.at[1] - 7.5 * (p.size || 1));
        g.appendChild(fl);
      }
      // A region is its own target; pictures and cities get a ring to tap.
      if (p.pic || p.dot || !p.d) g.appendChild(svgEl("circle", { cx: p.at[0], cy: p.at[1], r: r, class: "map-ring" }));
      if (p.dot) g.appendChild(svgEl("circle", { cx: p.at[0], cy: p.at[1], r: 3.5 * size, class: "map-city" }));
      if (p.pic) {
        var pic = B.svgArt(p.pic, 34 * size, "map-pic");
        pic.setAttribute("transform", "translate(" + p.at[0] + " " + p.at[1] + ")");
        g.appendChild(pic);
      }
      if (s.labels) g.appendChild(svgEl("text", { x: p.at[0], y: p.at[1] + (p.d && !p.pic && !p.dot ? 4 : r + 9), class: "map-label", "text-anchor": "middle" }, nameOf(p)));
      g._p = p;
      g.addEventListener("click", function () { tap(g); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(g); }
      });
      byId[p.id] = g;
      svg.appendChild(g);
      return g;
    });
    // Shapes drawn over the places that taps go through (Iran over the continents).
    (m.over || []).forEach(function (sh) { var n = shape(sh); n.classList.add("map-over"); svg.appendChild(n); });
    // Routes and measuring lines go over the places (an outline map's places cover it all).
    svg.appendChild(legs);
    var cells = grid ? drawGrid(svg, grid, function (c) { tapCell(c); }) : null;
    var bar = s.scale ? drawScale(svg, scaleOf(s.scale, m), view) : null;
    var walker = svgEl("g", { class: "map-walker", "aria-hidden": "true" });
    svg.appendChild(walker);
    box.appendChild(svg);
    if (m.legend) {
      box.appendChild(el("div", { class: "map-legend", role: "list", "aria-label": B.t("mapLegend") }, [el("b", { text: B.t("mapLegend") + ":" })].concat(m.legend.map(function (it) {
        var pic = el("span", { class: "map-legend-pic", "aria-hidden": "true" });
        if (it.swatch) {
          var sw = svgEl("svg", { viewBox: "0 0 20 14", class: "map-swatch" });
          sw.appendChild(svgEl("rect", { x: 0.5, y: 0.5, width: 19, height: 13, rx: 2, class: "map-shape map-" + it.swatch }));
          pic.appendChild(sw);
        } else B.setArt(pic, it.pic);
        return el("button", { class: "map-legend-item", type: "button", role: "listitem", onclick: function () { B.speak(nameOf(it)); } },
          [pic, el("span", { text: nameOf(it) })]);
      }))));
    }

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var next = E.nextBtn(null, function () { done(false); });
    // Answers to choose from, for «in which square?» and «about how far?»
    var opts = el("div", { class: "row map-options" });

    // The 📍 (or the walker) under the map: drag it onto a place, the same as tapping that place.
    var token = el("button", { class: "map-token", type: "button", "aria-hidden": "true", tabindex: "-1", text: "📍" });
    var under = el("div", { class: "row map-under" }, [token, el("span", { class: "hint", text: B.t("mapDragHint") })]);
    if (!explore) {
      box.appendChild(under);
      dragOnto(token, function (x, y) {
        var t = document.elementFromPoint(x, y);
        var g = t && t.closest && t.closest(".map-place");
        if (g && svg.contains(g)) tap(g);
      });
    }
    box.appendChild(opts);
    box.appendChild(fb);
    if (explore) {
      box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [next]));
      next.style.visibility = "hidden";
    }
    // «نمی‌دانم» while the child looks for their own province: a child who doesn't know (or lives abroad) goes on.
    var dunno = el("button", { class: "btn quiet", type: "button", text: B.t("mapMineSkip"), onclick: function () {
      if (busy || !cur() || !cur().mine) return;
      busy = true;
      fb.className = "feedback";
      fb.textContent = B.t("mapMineLater");
      B.speak(fb.textContent);
      setTimeout(function () { if (svg.isConnected) startTask(); }, 2600);
    } });
    var dunnoRow = el("div", { class: "row", style: "justify-content:center" }, [dunno]);
    dunnoRow.hidden = true;
    if (tasks.some(function (t) { return t.mine; })) box.appendChild(dunnoRow);

    var k = -1, at = 0, misses = 0, missHere = 0, busy = false, heard = 0;
    function cur() { return tasks[k]; }
    function target() { var t = cur(); return t.find != null ? t.find : t.route[at]; }
    function moveWalker(g) {
      var p = g._p;
      walker.style.transform = "translate(" + p.at[0] + "px," + (p.at[1] - 22 * (p.size || 1)) + "px)";
    }
    function startTask() {
      k++;
      if (k >= tasks.length) {
        fb.className = "feedback good";
        fb.textContent = E.pick(B.T.praise);
        task.textContent = "";
        B.speak(fb.textContent);
        setTimeout(function () { done(true, misses === 0); }, 1100);
        return;
      }
      var t = cur();
      missHere = 0;
      busy = false;
      dunnoRow.hidden = !t.mine;
      places.forEach(function (g) { g.classList.remove("found", "show", "start", "wrong", "focus"); });
      while (legs.firstChild) legs.removeChild(legs.firstChild);
      while (opts.firstChild) opts.removeChild(opts.firstChild);
      if (cells) { svg.classList.toggle("map-cells-on", !!t.cell); cells.forEach(function (c) { c.classList.remove("found", "show", "wrong"); c.setAttribute("tabindex", t.cell ? "0" : "-1"); }); }
      task.textContent = t.prompt;
      // The 📍 is for finding places; squares and answers to choose are tapped.
      under.style.display = t.cellOf != null || t.distance || t.cell ? "none" : "";
      if (t.flag && B.flagFace) task.appendChild(B.flagFace(t.flag, "map-task-flag"));
      if (t.cellOf != null) { byId[t.cellOf].classList.add("focus"); choices(cellChoices(t), cellName(cellAt(byId[t.cellOf]._p.at))); }
      if (t.distance) {
        var a = byId[t.distance[0]], b2 = byId[t.distance[1]];
        a.classList.add("focus");
        b2.classList.add("focus");
        var dd = measure(legs, a._p.at, b2._p.at, bar);
        choices(distChoices(dd, bar), about(dd * bar.value, bar));
      }
      fb.className = "feedback";
      fb.textContent = "";
      if (t.route) {
        at = 1;
        var first = byId[t.route[0]];
        first.classList.add("start");
        B.fillSvgArt(walker, t.walker || "🚶", 30);
        walker.style.transition = "none";
        moveWalker(first);
        void walker.getBoundingClientRect();
        walker.style.transition = "";
        walker.style.visibility = "";
        B.setArt(token, t.walker || "🚶");
      } else {
        walker.style.visibility = "hidden";
        B.setArt(token, "📍");
      }
      var say = t.say || t.prompt;
      if (k === 0 && s.say) say = s.say + " " + say;
      B.speak(say, k === 0 ? s.audio : null);
    }
    function tap(g) {
      var p = g._p;
      if (explore) {
        var where = grid ? " " + B.t("gridIn", { cell: cellName(cellAt(p.at)) }) : "";
        B.speak((B.inEnglish && B.inEnglish() ? nameOf(p) : p.say || p.name) + where);
        if (!g.classList.contains("found")) { g.classList.add("found"); heard++; }
        fb.className = "feedback";
        fb.textContent = nameOf(p) + where;
        if (heard >= Math.min(s.enough || places.length, places.length)) next.style.visibility = "";
        return;
      }
      if (busy || g.classList.contains("start") || (cur().route && g.classList.contains("found"))) return;
      var t = cur();
      if (t.cellOf != null || t.distance || t.cell) { fb.className = "feedback"; fb.textContent = nameOf(p); B.speak(nameOf(p)); return; }
      if (t.mine) {
        // Any province is right; a city or a sea only says its name.
        if (p.kind !== "prov") { fb.className = "feedback"; fb.textContent = nameOf(p); B.speak(nameOf(p)); return; }
        busy = true;
        g.classList.add("found");
        var c = (m.centres || {})[p.id];
        fb.className = "feedback good";
        fb.textContent = B.t(c ? "mapMine" : "mapMineNoCity", { name: nameOf(p), city: c ? nameOf(c) : "" });
        B.speak(fb.textContent);
        setTimeout(function () { if (svg.isConnected) startTask(); }, 3200);
        return;
      }
      if (p.id === target()) {
        missHere = 0;
        g.classList.remove("show");
        g.classList.add("found");
        if (t.route) {
          var from = byId[t.route[at - 1]]._p;
          legs.appendChild(svgEl("line", { x1: from.at[0], y1: from.at[1], x2: p.at[0], y2: p.at[1], class: "map-leg" }));
          moveWalker(g);
          at++;
          if (at < t.route.length) {
            fb.className = "feedback good";
            fb.textContent = nameOf(p) + "! " + B.t("mapRouteNext");
            B.speak(fb.textContent);
            return;
          }
        }
        busy = true;
        fb.className = "feedback good";
        fb.textContent = nameOf(p) + "! " + (t.route ? B.t("mapArrived") : E.pick(B.T.praise));
        B.speak(fb.textContent);
        setTimeout(function () { if (svg.isConnected) startTask(); }, 1600);
        return;
      }
      misses++;
      missHere++;
      bounce(g);
      fb.className = "feedback try";
      fb.textContent = B.t("mapNotThis", { name: nameOf(p) }) + " " + E.pick(B.T.retry);
      if (missHere >= 2) {
        byId[target()].classList.add("show");
        fb.className = "feedback";
        fb.textContent = B.t(t.route ? "mapShowNext" : "mapShow");
      }
      B.speak(fb.textContent);
    }

    // ---- the grid: squares named by a letter (across) and a number (down) ----
    function cellAt(at) { return [Math.min(grid.cols, Math.floor(at[0] / grid.w) + 1), Math.min(grid.rows, Math.floor(at[1] / grid.h) + 1)]; }
    function cellName(c) { return letters()[c[0] - 1] + B.fa(c[1]); }
    function cellSay(c) { return B.t("gridCell", { col: letterNames()[c[0] - 1], row: B.fa(c[1]) }); }
    function tapCell(c) {
      var t = cur();
      if (busy || !t || !t.cell) return;
      var node = cells[(c[1] - 1) * grid.cols + c[0] - 1];
      if (c[0] === t.cell[0] && c[1] === t.cell[1]) {
        busy = true;
        node.classList.remove("show");
        node.classList.add("found");
        fb.className = "feedback good";
        fb.textContent = cellName(c) + "! " + E.pick(B.T.praise);
        B.speak(cellSay(c) + "! " + E.pick(B.T.praise));
        setTimeout(function () { if (svg.isConnected) startTask(); }, 1600);
        return;
      }
      misses++;
      missHere++;
      bounce(node);
      fb.className = "feedback try";
      fb.textContent = B.t("gridNotThis", { cell: cellName(c) }) + " " + E.pick(B.T.retry);
      if (missHere >= 2) {
        cells[(t.cell[1] - 1) * grid.cols + t.cell[0] - 1].classList.add("show");
        fb.className = "feedback";
        fb.textContent = B.t("mapShow");
      }
      B.speak(fb.textContent.replace(cellName(c), cellSay(c)));
    }
    function cellChoices(t) {
      var c = cellAt(byId[t.cellOf]._p.at), out = [c];
      [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1]].forEach(function (d) {
        var n = [c[0] + d[0], c[1] + d[1]];
        if (out.length < 3 && n[0] >= 1 && n[1] >= 1 && n[0] <= grid.cols && n[1] <= grid.rows) out.push(n);
      });
      return shuffle(out.map(cellName));
    }
    // ---- distances with the scale bar: the bar is laid along the line, the child counts and chooses ----
    function distChoices(n, bar) {
      var lo = Math.max(1, n - 1);
      return shuffle([lo, lo + 1, lo + 2].map(function (k) { return about(k * bar.value, bar); }));
    }
    // Buttons to choose from; right is the label of the right one.
    function choices(list, right) {
      list.forEach(function (label) {
        var b = el("button", { class: "btn secondary map-choice", type: "button", text: label });
        b.addEventListener("click", function () {
          if (busy) return;
          if (label === right) {
            busy = true;
            b.classList.add("found");
            fb.className = "feedback good";
            fb.textContent = label + "! " + E.pick(B.T.praise);
            B.speak(fb.textContent);
            setTimeout(function () { if (svg.isConnected) startTask(); }, 1600);
            return;
          }
          misses++;
          missHere++;
          bounce(b);
          fb.className = "feedback try";
          fb.textContent = E.pick(B.T.retry);
          if (missHere >= 2) {
            Array.prototype.forEach.call(opts.children, function (x) { if (x.textContent === right) x.classList.add("show"); });
            fb.className = "feedback";
            fb.textContent = B.t(cur().distance ? "mapCountBars" : "gridLook");
          }
          B.speak(fb.textContent);
        });
        opts.appendChild(b);
      });
    }

    if (explore) {
      var sb = E.speakBtn(s.say || s.prompt || B.t("mapExplore"), s.audio);
      if (sb) box.insertBefore(sb, svg);
      setTimeout(function () { if (svg.isConnected) B.speak(s.say || s.prompt || B.t("mapExplore"), s.audio); }, 300);
    } else {
      // «بشنو» says the task that is open now.
      if (B.canSpeak()) box.insertBefore(el("button", { class: "speak-btn", type: "button", "aria-label": B.t("listen"),
        onclick: function () { var t = cur(); if (t) B.speak(t.say || t.prompt); } }, [B.t("listen")]), svg);
      setTimeout(function () { if (svg.isConnected) startTask(); }, 300);
    }
  };

  /* ---------- compass: turn to north, south, east and west ----------
     A child seen from above stands in the middle of a yard; north is always at the top of the picture (like a map),
     east on the right. tasks: [{ face: "n" | "e" | "s" | "w", prompt, say, sun }]: the child turns that way by
     tapping that side (or an arrow key); sun: "rise" (morning, in the east), "noon" (in the south, as everywhere in
     Iran) or "set" (evening, in the west) shows the sun on that side. Optional prompt, say, hide: true (only north is
     written, as on a compass; the other names appear once they are found). No timers; a wrong side says its name
     and the right side is shown after two misses. Scored: every task right on the first try. */
  var DIRS = { n: { key: "ArrowUp", deg: 0 }, e: { key: "ArrowRight", deg: 90 }, s: { key: "ArrowDown", deg: 180 }, w: { key: "ArrowLeft", deg: 270 } };
  var SUN = { rise: "e", noon: "s", set: "w" };
  E.steps.compass = function (s, box, done) {
    var tasks = s.tasks || [];
    if (s.prompt) box.appendChild(el("p", { class: "prompt", text: s.prompt }));
    var task = el("p", { class: "prompt map-task", "aria-live": "polite" });
    box.appendChild(task);
    function dirName(d) { return B.t("compass_" + d); }

    // The yard: a 3 × 3 grid, always left to right (east is on the right, even on a right-to-left page).
    var grid = el("div", { class: "compass", dir: "ltr" });
    var kid = el("div", { class: "compass-kid", "aria-hidden": "true" });
    var body = el("span", { class: "compass-body" });
    B.setArt(body, "🧒");
    kid.appendChild(el("span", { class: "compass-nose" }));
    kid.appendChild(body);
    var rose = el("span", { class: "compass-rose", "aria-hidden": "true" });
    B.setArt(rose, "🧭");
    var btns = {};
    ["n", "w", "e", "s"].forEach(function (d) {
      var b = el("button", { class: "compass-dir compass-" + d, type: "button" }, [el("span", { class: "compass-arrow", "aria-hidden": "true", text: { n: "↑", e: "→", s: "↓", w: "←" }[d] }), el("span", { class: "compass-name" })]);
      b.addEventListener("click", function () { turn(d); });
      btns[d] = b;
    });
    function label(d, show) {
      btns[d].querySelector(".compass-name").textContent = show ? dirName(d) : "؟";
      btns[d].setAttribute("aria-label", show ? dirName(d) : B.t("compassHidden"));
    }
    Object.keys(btns).forEach(function (d) { label(d, !s.hide || d === "n"); });
    [btns.n, rose, btns.w, kid, btns.e, btns.s].forEach(function (n) { grid.appendChild(n); });
    box.appendChild(grid);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    box.appendChild(el("p", { class: "hint", style: "text-align:center", text: B.t("compassKeys") }));

    var k = -1, misses = 0, missHere = 0, busy = false;
    function cur() { return tasks[k]; }
    // Turn the shorter way round (from west to north is a quarter turn, not three).
    var deg = 0;
    function face(d) {
      var delta = ((DIRS[d].deg - deg) % 360 + 540) % 360 - 180;
      deg += delta;
      kid.style.transform = "rotate(" + deg + "deg)";
    }
    function startTask() {
      k++;
      if (k >= tasks.length) {
        busy = true;
        document.removeEventListener("keydown", onKey);
        fb.className = "feedback good";
        fb.textContent = E.pick(B.T.praise);
        task.textContent = "";
        B.speak(fb.textContent);
        setTimeout(function () { done(true, misses === 0); }, 1100);
        return;
      }
      var t = cur();
      missHere = 0;
      busy = false;
      Object.keys(btns).forEach(function (d) { btns[d].classList.remove("found", "show", "wrong"); });
      // The sun, when the task has one, is drawn in the button of its side, in place of the arrow.
      Object.keys(btns).forEach(function (d) {
        var a = btns[d].querySelector(".compass-arrow");
        if (t.sun && SUN[t.sun] === d) { B.setArt(a, "☀️"); a.classList.add("sun"); }
        else { a.classList.remove("sun"); a.textContent = { n: "↑", e: "→", s: "↓", w: "←" }[d]; }
      });
      task.textContent = t.prompt;
      fb.className = "feedback";
      fb.textContent = "";
      var say = t.say || t.prompt;
      if (k === 0 && s.say) say = s.say + " " + say;
      B.speak(say, k === 0 ? s.audio : null);
    }
    function turn(d) {
      if (busy || !cur()) return;
      face(d);
      var t = cur();
      if (d === t.face) {
        busy = true;
        label(d, true);
        btns[d].classList.remove("show");
        btns[d].classList.add("found");
        fb.className = "feedback good";
        fb.textContent = B.t("compassGood", { dir: dirName(d) }) + " " + E.pick(B.T.praise);
        B.speak(fb.textContent);
        setTimeout(function () { if (grid.isConnected) startTask(); }, 1600);
        return;
      }
      misses++;
      missHere++;
      label(d, true);
      bounce(btns[d]);
      fb.className = "feedback try";
      fb.textContent = B.t("compassNotThis", { dir: dirName(d) }) + " " + E.pick(B.T.retry);
      if (missHere >= 2) {
        btns[t.face].classList.add("show");
        fb.className = "feedback";
        fb.textContent = B.t("compassShow");
      }
      B.speak(fb.textContent);
    }
    function onKey(e) {
      if (!grid.isConnected) { document.removeEventListener("keydown", onKey); return; }
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      Object.keys(DIRS).forEach(function (d) {
        if (e.key === DIRS[d].key) { e.preventDefault(); btns[d].focus(); turn(d); }
      });
    }
    document.addEventListener("keydown", onKey);
    if (B.canSpeak()) box.insertBefore(el("button", { class: "speak-btn", type: "button", "aria-label": B.t("listen"),
      onclick: function () { var t = cur(); if (t) B.speak(t.say || t.prompt); } }, [B.t("listen")]), grid);
    setTimeout(function () { if (grid.isConnected) startTask(); }, 300);
  };

  /* An outline map (B.MAPS.iran) as the step asks for it:
       layers: ["iran"] (all of Iran is one place, «ایران»; the default with "seas") or ["provinces"] (each
         province is a place), plus "seas" (دریای خزر، خلیج فارس، دریای عمان). Without "iran" or "provinces",
         Iran is drawn but not tapped.
       cities: ["tehran", …] or "centres" (every provincial centre): marked cities that can be tapped.
       "relief" colours Iran by height (js/maps/iran-relief.js: lowlands green, then yellow, brown and white for the
         highest mountains, with a legend; legend: false hides it); "landforms" (with or without "relief") adds the
         mountain ranges and deserts (alborz, zagros, kavir, lut) and four peaks (damavand, sabalan, dena, taftan)
         as places.
     The countries around Iran are always plain shapes, never named. */
  function outline(m, s) {
    var layers = s.layers || ["iran", "seas"], has = function (l) { return layers.indexOf(l) !== -1; };
    var shapes = m.abroad.map(function (d) { return { d: d, kind: "abroad" }; });
    var places = [], all = m.provinces.map(function (p) { return p.d; }).join("");
    var relief = (has("relief") || has("landforms")) && m.relief, legend = null;
    if (relief) {
      // Iran in the colour of the lowlands, then each higher band over it; provinces and Iran are drawn clear over them.
      shapes.push({ d: all, kind: "relief-low" });
      m.relief.bands.forEach(function (b) { shapes.push({ d: b.d, kind: "relief-" + b.id }); });
      legend = ["low", "mid", "high", "peak"].map(function (k) { return { swatch: "relief-" + k, name: B.t("relief_" + k), en: B.t("relief_" + k) }; });
    }
    if (has("provinces")) m.provinces.forEach(function (p) { places.push({ id: p.id, name: p.name, en: p.en, d: p.d, at: p.at, kind: "prov" }); });
    else if (has("iran")) places.push({ id: "iran", name: "ایران", en: "Iran", d: all, at: m.iranAt, kind: "iran" });
    else if (!relief) shapes.push({ d: all, kind: "iran" });
    if (relief && has("landforms")) {
      m.relief.areas.forEach(function (a) { places.push({ id: a.id, name: a.name, en: a.en, d: a.d, at: a.at, kind: a.kind }); });
      m.relief.peaks.forEach(function (p) { places.push({ id: p.id, name: p.name, en: p.en, at: p.at, pic: "🏔️", size: 0.55, kind: "peak" }); });
    }
    if (has("seas")) m.seas.forEach(function (p) { places.push({ id: p.id, name: p.name, en: p.en, at: p.at, pic: "🌊", size: 0.6, kind: "sea" }); });
    var want = s.cities === "centres" ? m.cities.filter(function (c) { return c.centre; }).map(function (c) { return c.id; }) : s.cities || [];
    var centres = {};
    m.cities.forEach(function (c) {
      if (c.centre) centres[c.prov] = c;
      if (want.indexOf(c.id) !== -1) places.push({ id: c.id, name: c.name, en: c.en, at: c.at, dot: true, kind: "city" });
    });
    return { view: m.view, bg: m.bg, shapes: shapes, places: places, centres: centres, outline: true, kmPerUnit: m.kmPerUnit,
      legend: relief && s.legend !== false ? legend : null, svgClass: relief ? "map-relief" : "" };
  }

  /* The map of the region or of the world (B.MAPS.region, B.MAPS.world) as the step asks for it:
       layers: any of "countries" (the default for the region, with "seas"), "continents" (the default for the world,
         with "oceans": each continent is a place; Iran is drawn over it in its own colour), "oceans", "seas",
         "capitals" (a dot for the capital of each country that is a place: id "capital-<country id>") and "equator".
       countries: [ids] (e.g. ["iq", "tr"]), "neighbours" (Iran and its neighbours by land and sea) or, by default,
         every named country: the countries that are places; all others are plain shapes. Iran's id is "iran".
     Only the chosen set of countries is ever named (js/maps/world.js); disputed areas are plain shapes. */
  function countryMap(m, s) {
    var layers = s.layers || (m.continents ? ["continents", "oceans"] : ["countries", "seas"]);
    var has = function (l) { return layers.indexOf(l) !== -1; };
    var want = s.countries === "neighbours" ? m.countries.filter(function (c) { return c.neighbour || c.id === "iran"; }).map(function (c) { return c.id; })
      : s.countries || m.countries.map(function (c) { return c.id; });
    var shapes = m.abroad.map(function (d) { return { d: d, kind: "abroad" }; }), places = [], over = [];
    m.countries.forEach(function (c) {
      var iran = c.id === "iran";
      if (has("countries") && want.indexOf(c.id) !== -1) places.push({ id: c.id, name: c.name, en: c.en, d: c.d, at: c.at, flag: c.id, kind: iran ? "iran" : "country" });
      else shapes.push({ d: c.d, kind: iran && !has("continents") ? "iran" : "abroad" });
      if (iran && has("continents")) over.push({ d: c.d, kind: "iran" });
    });
    if (has("continents")) (m.continents || []).forEach(function (c) { places.push({ id: c.id, name: c.name, en: c.en, d: c.d, at: c.at, kind: "cont map-cont-" + c.id }); });
    if (has("equator") && m.equator != null) places.push({ id: "equator", name: "خط استوا", en: "the equator", d: "M0 " + m.equator + "H" + m.view[0], at: [m.view[0] * 0.06, m.equator], kind: "equator" });
    ["oceans", "seas"].forEach(function (l) {
      if (has(l)) (m[l] || []).forEach(function (o) { places.push({ id: o.id, name: o.name, en: o.en, at: o.at, pic: "🌊", size: 0.6, kind: "sea" }); });
    });
    if (has("capitals")) m.countries.forEach(function (c) {
      if (c.capital && want.indexOf(c.id) !== -1) places.push({ id: "capital-" + c.id, name: c.capital.name, en: c.capital.en, at: c.capital.at, dot: true, kind: "city" });
    });
    return { view: m.view, bg: m.bg, shapes: shapes, places: places, over: over, kmPerUnit: m.kmPerUnit, outline: true };
  }

  /* ---------- grid and scale bar (any map) ----------
     grid: [columns, rows]: lines over the map, letters across the top (الف ب پ … in Persian, A B C … in English,
       always from the left, like the map) and numbers down the side. A square is [column, row], from 1.
     scale: true (on the map of Iran or the region: a bar of a round number of kilometres), { km: 200 }, or on a
       picture map { units, value, unit, en } (units: the bar's length in the map's own units; «۱۰ متر»: value 10,
       unit "متر", en "metres"). */
  function letters() { return B.t("gridLetters").split(","); }
  function letterNames() { return B.t("gridLetterNames").split(","); }
  function gridOf(g, view) { return { cols: g[0], rows: g[1], w: view[0] / g[0], h: view[1] / g[1] }; }
  function drawGrid(svg, grid, onTap) {
    var lines = svgEl("g", { class: "map-grid", "aria-hidden": "true" }), W = grid.cols * grid.w, H = grid.rows * grid.h;
    for (var c = 0; c <= grid.cols; c++) lines.appendChild(svgEl("line", { x1: c * grid.w, y1: 0, x2: c * grid.w, y2: H }));
    for (var r = 0; r <= grid.rows; r++) lines.appendChild(svgEl("line", { x1: 0, y1: r * grid.h, x2: W, y2: r * grid.h }));
    for (c = 0; c < grid.cols; c++) lines.appendChild(svgEl("text", { x: (c + 0.5) * grid.w, y: -5, class: "map-grid-label", "text-anchor": "middle" }, letters()[c]));
    for (r = 0; r < grid.rows; r++) lines.appendChild(svgEl("text", { x: -8, y: (r + 0.5) * grid.h, class: "map-grid-label", "text-anchor": "middle", "dominant-baseline": "central" }, B.fa(r + 1)));
    svg.appendChild(lines);
    var group = svgEl("g", { class: "map-cells" }), cells = [];
    for (r = 1; r <= grid.rows; r++) for (c = 1; c <= grid.cols; c++) (function (cell) {
      var n = svgEl("rect", { x: (cell[0] - 1) * grid.w, y: (cell[1] - 1) * grid.h, width: grid.w, height: grid.h, class: "map-cell", tabindex: "-1", role: "button",
        "aria-label": letters()[cell[0] - 1] + B.fa(cell[1]) });
      n.addEventListener("click", function () { onTap(cell); });
      n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap(cell); } });
      group.appendChild(n);
      cells.push(n);
    })([c, r]);
    svg.appendChild(group);
    return cells;
  }
  function scaleOf(sc, m) {
    if (sc.units) return { units: sc.units, value: sc.value, unit: B.inEnglish && B.inEnglish() && sc.en ? sc.en : sc.unit };
    if (!m.kmPerUnit) return null;
    var km = sc.km;
    if (!km) km = [50, 100, 200, 250, 500, 1000].reduce(function (a, b) { return Math.abs(b - 40 * m.kmPerUnit) < Math.abs(a - 40 * m.kmPerUnit) ? b : a; });
    return { units: km / m.kmPerUnit, value: km, unit: B.t("mapKm") };
  }
  function about(v, bar) { return B.t("mapAbout", { n: B.fa(v), unit: bar.unit }); }
  // The scale bar, in the bottom left corner: two halves, black and white, with its length written over it.
  function drawScale(svg, bar, view) {
    if (!bar) return null;
    var x = 8, y = view[1] - 10, g = svgEl("g", { class: "map-scale", role: "img", "aria-label": B.t("mapScale") + ": " + B.fa(bar.value) + " " + bar.unit });
    g.appendChild(svgEl("rect", { x: x - 4, y: y - 17, width: Math.max(bar.units, 56) + 8, height: 25, rx: 3, class: "map-scale-bg" }));
    g.appendChild(svgEl("rect", { x: x, y: y, width: bar.units / 2, height: 4, class: "map-scale-dark" }));
    g.appendChild(svgEl("rect", { x: x + bar.units / 2, y: y, width: bar.units / 2, height: 4, class: "map-scale-light" }));
    g.appendChild(svgEl("text", { x: x + Math.max(bar.units, 56) / 2, y: y - 5, class: "map-scale-label", "text-anchor": "middle" }, B.fa(bar.value) + " " + bar.unit));
    svg.appendChild(g);
    return bar;
  }
  // A dotted line from a to b with a tick at every length of the scale bar; returns how many bars long it is.
  function measure(legs, a, b, bar) {
    var len = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
    legs.appendChild(svgEl("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: "map-leg map-measure" }));
    for (var d = bar.units; d < len + bar.units / 2; d += bar.units) {
      var px = a[0] + ux * Math.min(d, len), py = a[1] + uy * Math.min(d, len);
      legs.appendChild(svgEl("line", { x1: px - uy * 5, y1: py + ux * 5, x2: px + uy * 5, y2: py - ux * 5, class: "map-tick" }));
    }
    return Math.max(1, Math.round(len / bar.units));
  }

  /* ---------- flags ----------
     B.flagSvg(code, width): an <svg> of that country's flag (js/maps/flags.js; codes are the map's country ids,
     e.g. "fr"), width units wide, for maps and cards, or null when there is no flag for that country. "iran" is the flag the parent chose in «بخش والدین»
     (B.family().flag: "current" or "lion-sun"); while nothing is chosen it is an empty flag with a question mark.
     Lessons never ask for "iran-current" or "iran-lion-sun" themselves. B.flagFace(code) wraps it for a card or
     a prompt, with «پرچم ایران را از پدر و مادرت بپرس.» under the empty flag. B.flagName(code): the country's name. */
  function flagCode(code) {
    if (code !== "iran") return code;
    var f = B.family ? B.family().flag : null;
    return f === "current" || f === "lion-sun" ? "iran-" + f : null;
  }
  B.flagSvg = function (code, width) {
    var src = (B.FLAGS || {})[flagCode(code)], n;
    // A country with no flag file (Oman, Afghanistan: js/maps/flags.js says why) has none.
    if (!src && code !== "iran" && code !== "none") return null;
    if (src) {
      n = document.importNode(new DOMParser().parseFromString(src.replace("<svg", '<svg xmlns="' + NS + '"'), "image/svg+xml").documentElement, true);
    } else {
      // The empty flag: an outline and a question mark.
      n = svgEl("svg", { viewBox: "0 0 30 20" });
      n.appendChild(svgEl("rect", { x: 0.75, y: 0.75, width: 28.5, height: 18.5, rx: 1.5, class: "flag-empty" }));
      n.appendChild(svgEl("text", { x: 15, y: 10.5, class: "flag-empty-q", "text-anchor": "middle", "dominant-baseline": "central" }, "؟"));
    }
    var vb = (n.getAttribute("viewBox") || "0 0 3 2").split(/[\s,]+/).map(Number);
    n.setAttribute("class", "flag" + (src ? "" : " flag-unset"));
    n.setAttribute("preserveAspectRatio", "xMidYMid meet");
    if (width) { n.setAttribute("width", width); n.setAttribute("height", width * vb[3] / vb[2]); }
    n.setAttribute("aria-hidden", "true");
    return n;
  };
  B.flagName = function (code) {
    if (code === "iran") return B.inEnglish && B.inEnglish() ? "Iran" : "ایران";
    var found = null;
    ["world", "region"].forEach(function (k) {
      ((B.MAPS || {})[k] || { countries: [] }).countries.forEach(function (c) { if (c.id === code) found = c; });
    });
    return found ? nameOf(found) : code;
  };
  B.flagFace = function (code, cls) {
    var svg = B.flagSvg(code);
    if (!svg) return el("span", { class: "flag-face word" + (cls ? " " + cls : ""), text: B.flagName(code) });
    var unset = svg.classList.contains("flag-unset");
    var face = el("span", { class: "flag-face" + (cls ? " " + cls : ""), role: "img",
      "aria-label": unset ? B.t("flagAsk") : B.t("flagOf", { name: B.flagName(code) }) }, [svg]);
    if (unset) face.appendChild(el("span", { class: "flag-ask", text: B.t("flagAsk") }));
    return face;
  };

  /* ---------- timeline: put things in their place in time ----------
     Time runs in the reading direction: long ago at the start of the line (on the right in Persian, on the left in
     English), now at its end. Either
       bands: [{ label, en, pic }] (fuzzy times, oldest first: «خیلی خیلی قدیم», «خیلی قدیم», «وقتی پدربزرگ و
         مادربزرگ بچه بودند», «وقتی پدر و مادر بچه بودند», «حالا»), items in a band by its number from 0; or
       years: [from, to] and every (default 10): the line is cut into pieces `every` years long, each item goes in
         the piece its year is in; years are written as they are given (Iranian years such as ۱۲۶۷, or with era).
     items: [{ pic, label, en, say, band | year, row }]: tap a thing, then its place on the line (or drag it there).
     Optional rows: [{ label, en }] (two lines one above the other, such as Iran and the world; an item's row is its
       number from 0), eras: [{ from, to, label, en }] (with years: named stretches drawn above the line),
       show: true (everything is already in place: tap to hear; not scored), prompt, say.
     A wrong place says what it is and the thing bounces; after two misses its place is shown. Scored. */
  E.steps.timeline = function (s, box, done) {
    var en = B.inEnglish && B.inEnglish();
    var lab = function (x) { return en && x.en ? x.en : x.label; };
    var rows = s.rows || [{}];
    var segs;
    if (s.bands) segs = s.bands.map(function (b) { return { label: lab(b), pic: b.pic }; });
    else {
      var every = s.every || 10;
      segs = [];
      for (var y = s.years[0]; y < s.years[1]; y += every) segs.push({ from: y, to: Math.min(y + every, s.years[1]) });
    }
    function segOf(it) { return s.bands ? it.band : Math.min(segs.length - 1, Math.max(0, Math.floor((it.year - s.years[0]) / (s.every || 10)))); }
    function itemLabel(it) { var l = lab(it) || ""; return it.year != null && !s.bands ? (l ? l + " (" + B.fa(it.year) + ")" : B.fa(it.year)) : l; }

    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t(s.show ? "timeShow" : "timePlace") }));
    var sb = E.speakBtn(s.say || s.prompt || B.t(s.show ? "timeShow" : "timePlace"), s.audio);
    if (sb) box.appendChild(sb);

    var line = el("div", { class: "timeline" + (s.bands ? " timeline-bands" : " timeline-years"), role: "group", "aria-label": B.t("timeAria") });
    line.style.setProperty("--segs", segs.length);
    if (s.eras && !s.bands) {
      var eras = el("div", { class: "tl-eras", "aria-hidden": "true" });
      s.eras.forEach(function (e) {
        var a = (e.from - s.years[0]) / (s.years[1] - s.years[0]) * 100, b = (e.to - s.years[0]) / (s.years[1] - s.years[0]) * 100;
        var n = el("span", { class: "tl-era", text: lab(e) });
        n.style.insetInlineStart = a + "%";
        n.style.width = (b - a) + "%";
        eras.appendChild(n);
      });
      line.appendChild(eras);
    }
    var slots = rows.map(function (r, ri) {
      var row = el("div", { class: "tl-row" });
      if (s.rows) row.appendChild(el("span", { class: "tl-row-label", text: lab(r) }));
      var cells = segs.map(function (sg, si) {
        var head = s.bands ? [sg.pic ? el("span", { class: "tl-pic", "aria-hidden": "true", text: sg.pic }) : null, el("span", { class: "tl-label", text: sg.label })]
          : [el("span", { class: "tl-year", text: B.fa(sg.from) })];
        var name = s.bands ? sg.label : B.t("timeYears", { from: B.fa(sg.from), to: B.fa(sg.to) });
        var c = el("button", { class: "tl-slot", type: "button", "aria-label": (s.rows ? lab(r) + "، " : "") + name },
          [el("span", { class: "tl-head" }, head.filter(Boolean)), el("span", { class: "tl-in" })]);
        c._seg = si;
        c._row = ri;
        c._name = name;
        c.addEventListener("click", function () { drop(c); });
        row.appendChild(c);
        return c;
      });
      line.appendChild(row);
      return cells;
    });
    // The arrow of time under the line, towards now.
    line.appendChild(el("div", { class: "tl-arrow", "aria-hidden": "true" }, [
      el("span", { text: s.bands ? "" : B.fa(s.years[0]) }), el("span", { class: "tl-arrow-line" }), el("span", { text: s.bands ? "" : B.fa(s.years[1]) })]));
    box.appendChild(line);

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    function chip(it) {
      var c = el("span", { class: "tl-chip" }, [it.pic ? el("span", { class: "tl-chip-pic", "aria-hidden": "true", text: it.pic }) : null, itemLabel(it) ? el("span", { text: itemLabel(it) }) : null].filter(Boolean));
      return c;
    }
    function put(it) { slots[it.row || 0][segOf(it)].querySelector(".tl-in").appendChild(chip(it)); }

    if (s.show) {
      // Already in place: tapping a thing says it.
      (s.items || []).forEach(function (it) {
        var c = chip(it);
        var b = el("button", { class: "tl-chip-btn", type: "button", "aria-label": itemLabel(it) || it.pic }, [c]);
        b.addEventListener("click", function () { B.speak(en ? itemLabel(it) : it.say || itemLabel(it)); fb.className = "feedback"; fb.textContent = itemLabel(it); });
        slots[it.row || 0][segOf(it)].querySelector(".tl-in").appendChild(b);
      });
      slots.forEach(function (r) { r.forEach(function (c) { c.addEventListener("click", function () { B.speak(c.getAttribute("aria-label")); }); }); });
      box.appendChild(fb);
      box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [E.nextBtn(null, function () { done(false); })]));
      return;
    }

    var picked = null, misses = 0, left = s.items.length;
    var tray = el("div", { class: "tray tl-tray" });
    var tiles = shuffle(s.items.slice()).map(function (it) {
      var b = el("button", { class: "tile-btn tl-tile", type: "button", "aria-pressed": "false", "aria-label": itemLabel(it) || it.pic }, [chip(it)]);
      b._it = it;
      b._miss = 0;
      b.addEventListener("click", function () { pick(b); });
      dragOnto(b, function (x, yy) {
        var t = document.elementFromPoint(x, yy), c = t && t.closest && t.closest(".tl-slot");
        if (!c || !line.contains(c)) return;
        pick(b, true);
        drop(c);
      });
      tray.appendChild(b);
      return b;
    });
    box.appendChild(tray);
    box.appendChild(el("p", { class: "hint", text: B.t("timeHint") }));
    box.appendChild(fb);
    function clearShow() { slots.forEach(function (r) { r.forEach(function (c) { c.classList.remove("show"); }); }); }
    function pick(b, keep) {
      if (b.disabled) return;
      if (picked) { picked.classList.remove("picked"); picked.setAttribute("aria-pressed", "false"); }
      picked = picked === b && !keep ? null : b;
      clearShow();
      if (!picked) return;
      b.classList.add("picked");
      b.setAttribute("aria-pressed", "true");
      B.speak(en ? itemLabel(b._it) : b._it.say || itemLabel(b._it));
      fb.className = "feedback";
      fb.textContent = B.t("timeWhere");
    }
    function drop(c) {
      if (!picked) { fb.className = "feedback"; fb.textContent = B.t("timePickFirst"); B.speak(fb.textContent); return; }
      var it = picked._it;
      if (c._seg === segOf(it) && c._row === (it.row || 0)) {
        put(it);
        picked.disabled = true;
        picked.classList.remove("picked");
        picked.classList.add("used");
        picked.removeAttribute("aria-pressed");
        picked = null;
        clearShow();
        left--;
        fb.className = "feedback good";
        fb.textContent = E.pick(B.T.praise);
        B.speak(fb.textContent);
        if (!left) { setTimeout(function () { done(true, misses === 0); }, 1100); return; }
        var nx = tiles.find(function (x) { return !x.disabled; });
        if (nx) nx.focus();
        return;
      }
      misses++;
      picked._miss++;
      bounce(c);
      fb.className = "feedback try";
      fb.textContent = B.t("timeNotThis", { name: c._name }) + " " + E.pick(B.T.retry);
      if (picked._miss >= 2) {
        slots[it.row || 0][segOf(it)].classList.add("show");
        fb.className = "feedback";
        fb.textContent = B.t("mapShow");
      }
      B.speak(fb.textContent);
    }
  };

  /* ---------- source: look closely at a picture and talk about it ----------
     pic (an emoji or drawing) or img (a picture file in the site, e.g. "img/world/sialk-pot.jpg", with alt), and
     caption (what and where it is, said and written under it: «کوزه سفالی از سیلک، حدود ۶۰۰۰ سال پیش»).
     Three questions, one after another: «چه می‌بینی؟»، «چه فکر می‌کنی؟»، «چه سؤالی داری؟» (more: true adds a fourth
     for older children: «چه کسی، کی و چرا آن را ساخته؟»). The child answers aloud; the parent gets ideas for each
     question in ask: { see: [...], think: [...], wonder: [...], who: [...] } (general ones when there are none).
     look: [{ at: [x, y] (percent of the picture, from the top left), say }]: 🔍 spots to look closer; tapping one
     zooms the picture there and says what to look at. Tapping the picture (or + and −) zooms in and out.
     Optional prompt, say, note (a line for the parent). Not scored: nothing is marked or stored. */
  E.steps.source = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("sourceLook") }));
    var frame = el("div", { class: "src-frame" });
    var stage = el("div", { class: "src-stage" });
    if (s.img) stage.appendChild(el("img", { class: "src-img", src: s.img, alt: s.alt || s.caption || "", draggable: "false" }));
    else {
      var pic = el("span", { class: "src-pic", role: "img", "aria-label": s.caption || s.pic });
      B.setArt(pic, s.pic);
      stage.appendChild(pic);
    }
    frame.appendChild(stage);
    var zoomed = false;
    function zoom(on, at) {
      zoomed = on;
      stage.style.transformOrigin = (at ? at[0] : 50) + "% " + (at ? at[1] : 50) + "%";
      stage.classList.toggle("zoomed", on);
      zin.disabled = on;
      zout.disabled = !on;
    }
    stage.addEventListener("click", function (e) {
      if (e.target.closest(".src-spot")) return;
      var r = stage.getBoundingClientRect();
      zoom(!zoomed, [(e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100]);
    });
    (s.look || []).forEach(function (l) {
      var b = el("button", { class: "src-spot", type: "button", "aria-label": l.say || B.t("sourceSpot"), text: "🔍" });
      b.style.left = l.at[0] + "%";
      b.style.top = l.at[1] + "%";
      b.addEventListener("click", function () {
        zoom(true, l.at);
        if (l.say) { B.speak(l.say); fb.textContent = l.say; }
      });
      stage.appendChild(b);
    });
    box.appendChild(frame);
    var zin = el("button", { class: "btn quiet", type: "button", text: "＋ " + B.t("sourceZoomIn"), onclick: function () { zoom(true); } });
    var zout = el("button", { class: "btn quiet", type: "button", text: "－ " + B.t("sourceZoomOut"), onclick: function () { zoom(false); } });
    zout.disabled = true;
    box.appendChild(el("div", { class: "row src-zoom" }, [zin, zout]));
    if (s.caption) box.appendChild(el("p", { class: "src-caption", text: s.caption }));

    var KEYS = ["see", "think", "wonder"].concat(s.more ? ["who"] : []);
    var steps = el("ol", { class: "src-steps", "aria-hidden": "true" });
    var dots = KEYS.map(function (k, i) { var d = el("li", { text: B.fa(i + 1) }); steps.appendChild(d); return d; });
    box.appendChild(steps);
    var q = el("p", { class: "prompt src-q", "aria-live": "polite" });
    box.appendChild(q);
    var parent = el("div", { class: "src-parent" });
    box.appendChild(parent);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    var nextB = el("button", { class: "btn", type: "button" });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [nextB]));
    if (s.note) box.appendChild(el("p", { class: "hint", text: s.note }));

    var k = -1;
    function show() {
      k++;
      if (k >= KEYS.length) { done(false); return; }
      var key = KEYS[k];
      dots.forEach(function (d, i) { d.classList.toggle("on", i === k); d.classList.toggle("done", i < k); });
      q.textContent = B.t("source_" + key);
      while (parent.firstChild) parent.removeChild(parent.firstChild);
      var ideas = (s.ask || {})[key] || [];
      if (!ideas.length) ideas = B.t("sourceIdeas_" + key).split("|");
      parent.appendChild(el("b", { text: B.t("sourceForParent") }));
      parent.appendChild(el("ul", {}, ideas.map(function (t) { return el("li", { text: t }); })));
      fb.textContent = "";
      nextB.textContent = k === KEYS.length - 1 ? B.t("sourceDone") : B.t("sourceNext");
      var say = B.t("source_" + key);
      if (k === 0) say = (s.say || s.prompt || B.t("sourceLook")) + " " + (s.caption ? s.caption + ". " : "") + say;
      B.speak(say, k === 0 ? s.audio : null);
    }
    nextB.addEventListener("click", show);
    if (B.canSpeak()) box.insertBefore(el("button", { class: "speak-btn", type: "button", "aria-label": B.t("listen"),
      onclick: function () { B.speak(q.textContent); } }, [B.t("listen")]), frame);
    setTimeout(function () { if (box.isConnected) show(); }, 300);
  };

  /* Drag a button and drop it anywhere: onDrop(x, y) gets the point. A short tap does nothing. */
  function dragOnto(node, onDrop) {
    var start = null, ghost = null;
    node.addEventListener("pointerdown", function (e) {
      if (e.button > 0) return;
      start = [e.clientX, e.clientY];
      try { node.setPointerCapture(e.pointerId); } catch (x) { /* not all browsers */ }
      e.preventDefault();
    });
    node.addEventListener("pointermove", function (e) {
      if (!start) return;
      if (!ghost) {
        if (Math.hypot(e.clientX - start[0], e.clientY - start[1]) < 8) return;
        ghost = node.cloneNode(true);
        ghost.classList.add("drag-ghost");
        document.body.appendChild(ghost);
        node.classList.add("dragging");
      }
      ghost.style.left = e.clientX - ghost.offsetWidth / 2 + "px";
      ghost.style.top = e.clientY - ghost.offsetHeight / 2 + "px";
    });
    function end(e, drop) {
      if (ghost) { ghost.remove(); node.classList.remove("dragging"); if (drop) onDrop(e.clientX, e.clientY); }
      ghost = start = null;
    }
    node.addEventListener("pointerup", function (e) { end(e, true); });
    node.addEventListener("pointercancel", function (e) { end(e, false); });
  }
})();
