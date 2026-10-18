/* باغچه — step types for ایران و جهان (world).
   - map: a map seen from above, drawn with inline SVG. Picture maps (a room, a home, a neighbourhood) use emoji
     places on simple shapes; outline maps (Iran's provinces, the world's countries) will use the same data with
     SVG paths. The child taps a named place («نانوایی کجاست؟»), or follows a route by tapping places in order;
     with no tasks, the child taps every place to hear its name (not scored).
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
     tasks: [{ find: id, prompt, say }] tap the place; or [{ route: [id, id, …], prompt, say, walker }] start at
       the first place and tap the others in order (the walker, an emoji, walks there).
     Optional prompt, say, labels: true (names written under the places, for readers). */
  E.steps.map = function (s, box, done) {
    var m = typeof s.map === "string" ? (B.MAPS || {})[s.map] : s.map;
    var view = m.view || [400, 300];
    var tasks = s.tasks || [];
    var explore = !tasks.length;
    if (s.prompt || explore) box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("mapExplore") }));
    var task = el("p", { class: "prompt map-task", "aria-live": "polite" });
    if (!explore) box.appendChild(task);

    var svg = svgEl("svg", { viewBox: "0 0 " + view[0] + " " + view[1], class: "map-svg", role: "group", "aria-label": B.t("mapAria") });
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: view[0], height: view[1], class: "map-shape map-" + (m.bg || "grass") }));
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
      var size = p.size || 1;
      var g = svgEl("g", { class: "map-place", tabindex: "0", role: "button", "aria-label": p.name });
      if (p.d) g.appendChild(svgEl("path", { d: p.d, class: "map-region map-" + (p.kind || "land") }));
      g.appendChild(svgEl("circle", { cx: p.at[0], cy: p.at[1], r: 24 * size, class: "map-ring" }));
      if (p.pic) {
        var pic = B.svgArt(p.pic, 34 * size, "map-pic");
        pic.setAttribute("transform", "translate(" + p.at[0] + " " + p.at[1] + ")");
        g.appendChild(pic);
      }
      if (s.labels) g.appendChild(svgEl("text", { x: p.at[0], y: p.at[1] + 24 * size + 9, class: "map-label", "text-anchor": "middle" }, p.name));
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
        B.speak(p.say || p.name);
        if (!g.classList.contains("found")) { g.classList.add("found"); heard++; }
        fb.className = "feedback";
        fb.textContent = p.name;
        if (heard >= places.length) next.style.visibility = "";
        return;
      }
      if (busy || g.classList.contains("start") || (cur().route && g.classList.contains("found"))) return;
      var t = cur();
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
            fb.textContent = p.name + "! " + B.t("mapRouteNext");
            B.speak(fb.textContent);
            return;
          }
        }
        busy = true;
        fb.className = "feedback good";
        fb.textContent = p.name + "! " + (t.route ? B.t("mapArrived") : E.pick(B.T.praise));
        B.speak(fb.textContent);
        setTimeout(function () { if (svg.isConnected) startTask(); }, 1600);
        return;
      }
      misses++;
      missHere++;
      bounce(g);
      fb.className = "feedback try";
      fb.textContent = B.t("mapNotThis", { name: p.name }) + " " + E.pick(B.T.retry);
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
