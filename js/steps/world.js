/* باغچه — step types for ایران و جهان (world).
   - map: a map seen from above, drawn with inline SVG. Picture maps (a room, a home, a neighbourhood) use emoji
     places on simple shapes, symbol maps add a legend, and outline maps (Iran, js/maps/iran.js) draw provinces,
     seas and cities from SVG paths. The child taps a named place («نانوایی کجاست؟»), follows a route by tapping
     places in order, or finds their own province; with no tasks, the child taps places to hear their names
     (not scored).
   - compass: turn to north, south, east or west (the sun rises in the east). Untimed, gentle feedback.
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
    var view = m.view || [400, 300];
    var tasks = s.tasks || [];
    var explore = !tasks.length;
    if (s.prompt || explore) box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("mapExplore") }));
    var task = el("p", { class: "prompt map-task", "aria-live": "polite" });
    if (!explore) box.appendChild(task);

    var svg = svgEl("svg", { viewBox: "0 0 " + view[0] + " " + view[1], class: "map-svg", role: "group", "aria-label": B.t("mapAria") });
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
    svg.appendChild(legs);

    var byId = {}, places = (m.places || []).map(function (p) {
      var size = p.size || 1, r = p.dot ? 8 * size : 24 * size;
      var g = svgEl("g", { class: "map-place" + (p.d && !p.pic && !p.dot ? " map-area" : ""), tabindex: "0", role: "button", "aria-label": nameOf(p) });
      if (p.d) g.appendChild(svgEl("path", { d: p.d, class: "map-region map-" + (p.kind || "land") }));
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
    var walker = svgEl("g", { class: "map-walker", "aria-hidden": "true" });
    svg.appendChild(walker);
    box.appendChild(svg);
    if (m.legend) {
      box.appendChild(el("div", { class: "map-legend", role: "list", "aria-label": B.t("mapLegend") }, [el("b", { text: B.t("mapLegend") + ":" })].concat(m.legend.map(function (it) {
        var pic = el("span", { class: "map-legend-pic", "aria-hidden": "true" });
        B.setArt(pic, it.pic);
        return el("button", { class: "map-legend-item", type: "button", role: "listitem", onclick: function () { B.speak(nameOf(it)); } },
          [pic, el("span", { text: nameOf(it) })]);
      }))));
    }

    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var next = E.nextBtn(null, function () { done(false); });

    // The 📍 (or the walker) under the map: drag it onto a place, the same as tapping that place.
    var token = el("button", { class: "map-token", type: "button", "aria-hidden": "true", tabindex: "-1", text: "📍" });
    if (!explore) {
      box.appendChild(el("div", { class: "row map-under" }, [token, el("span", { class: "hint", text: B.t("mapDragHint") })]));
      dragOnto(token, function (x, y) {
        var t = document.elementFromPoint(x, y);
        var g = t && t.closest && t.closest(".map-place");
        if (g && svg.contains(g)) tap(g);
      });
    }
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
      places.forEach(function (g) { g.classList.remove("found", "show", "start", "wrong"); });
      while (legs.firstChild) legs.removeChild(legs.firstChild);
      task.textContent = t.prompt;
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
        B.speak(B.inEnglish && B.inEnglish() ? nameOf(p) : p.say || p.name);
        if (!g.classList.contains("found")) { g.classList.add("found"); heard++; }
        fb.className = "feedback";
        fb.textContent = nameOf(p);
        if (heard >= Math.min(s.enough || places.length, places.length)) next.style.visibility = "";
        return;
      }
      if (busy || g.classList.contains("start") || (cur().route && g.classList.contains("found"))) return;
      var t = cur();
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
     The countries around Iran are always plain shapes, never named. */
  function outline(m, s) {
    var layers = s.layers || ["iran", "seas"], has = function (l) { return layers.indexOf(l) !== -1; };
    var shapes = m.abroad.map(function (d) { return { d: d, kind: "abroad" }; });
    var places = [], all = m.provinces.map(function (p) { return p.d; }).join("");
    if (has("provinces")) m.provinces.forEach(function (p) { places.push({ id: p.id, name: p.name, en: p.en, d: p.d, at: p.at, kind: "prov" }); });
    else if (has("iran")) places.push({ id: "iran", name: "ایران", en: "Iran", d: all, at: m.iranAt, kind: "iran" });
    else shapes.push({ d: all, kind: "iran" });
    if (has("seas")) m.seas.forEach(function (p) { places.push({ id: p.id, name: p.name, en: p.en, at: p.at, pic: "🌊", size: 0.6, kind: "sea" }); });
    var want = s.cities === "centres" ? m.cities.filter(function (c) { return c.centre; }).map(function (c) { return c.id; }) : s.cities || [];
    var centres = {};
    m.cities.forEach(function (c) {
      if (c.centre) centres[c.prov] = c;
      if (want.indexOf(c.id) !== -1) places.push({ id: c.id, name: c.name, en: c.en, at: c.at, dot: true, kind: "city" });
    });
    return { view: m.view, bg: m.bg, shapes: shapes, places: places, centres: centres, outline: true };
  }

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
