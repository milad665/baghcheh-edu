/* باغچه — pictures. Lessons name their pictures with emoji (🍎, 🐱, 👧); when a hand-drawn SVG exists for an emoji
   (js/art/*.js, in B.ART), it is shown instead of the emoji, everywhere a picture is shown: cards, tiles, options,
   baskets, story actors, lesson cards. An emoji with no drawing is shown as it is, so lessons never break.
   Drawings are sized by font-size (1em ≈ an emoji), so they drop in where the emoji was.

   B.art(text) → a list of nodes (for B.el's children): every emoji in text that has a drawing becomes a picture.
   Skin-tone emoji (👧🏿) draw the same picture with the skin colour set (--skin).

   Adding a drawing: in js/art/<group>.js, B.addArt({ "🍎": '<path …/>…' }): the inside of an
   <svg viewBox="0 0 100 100">, wrapped in <g stroke="#3d2c22" stroke-width="3" stroke-linejoin="round"
   stroke-linecap="round">, so every shape gets the warm dark outline unless it says otherwise. The style:
   - Flat cartoon, like a children's picture book: simple rounded shapes, warm friendly colours, no gradients,
     no text, no filters. Fill most of the square (about 6 to 94); things that stand sit on y ≈ 92.
   - Outline 3 for shapes, stroke-width 2 to 2.5 for inner lines (smiles, folds); stroke="none" for shading,
     cheeks and shine (white, opacity .4 to .5).
   - Faces: eyes are dark ellipses (#3d2c22) in <g class="eye" stroke="none">, a small white dot of shine,
     pink cheeks (#f28b82, opacity .5), a soft smile. People's skin is fill="var(--skin,#f3c39b)".
   - Moving parts, for the story stage: class="eye" blinks; class="sway" (plants, tails, flags) sways and
     class="flap" (wings) flaps, both turning around style="transform-origin:Xpx Ypx" in viewBox units;
     class="spin" turns slowly around the centre (the sun's rays). Nothing moves outside a story.
   - Keep each drawing small (under about 2 KB), and draw it so it reads at 40 px. */
var B = window.B || {};
window.B = B;

(function () {
  B.ART = B.ART || {};
  B.addArt = function (map) { Object.keys(map).forEach(function (k) { B.ART[k.replace(/️/g, "")] = map[k]; }); };

  var SKIN = { "\u{1F3FB}": "#f7d7bb", "\u{1F3FC}": "#e9bb92", "\u{1F3FD}": "#c98f63", "\u{1F3FE}": "#9a6442", "\u{1F3FF}": "#6a432b" };
  var EMOJI = null;
  try {
    EMOJI = new RegExp("\\p{Extended_Pictographic}(?:\\uFE0F|\\p{Emoji_Modifier}|\\u200D\\p{Extended_Pictographic}\\uFE0F?)*", "gu");
  } catch (e) { /* very old browser: emoji stay emoji */ }

  var cache = {};
  function lookup(seq) {
    var tone = null, keyed = seq.replace(/️/g, "").replace(/[\u{1F3FB}-\u{1F3FF}]/gu, function (m) { tone = SKIN[m]; return ""; });
    return B.ART[keyed] ? { key: keyed, tone: tone } : null;
  }
  // One drawing, as a span sized like an emoji. The parsed SVG is kept and cloned for speed.
  B.artNode = function (seq) {
    var hit = lookup(seq);
    if (!hit) return null;
    var tpl = cache[hit.key];
    if (!tpl) {
      tpl = document.createElement("span");
      tpl.className = "art";
      tpl.innerHTML = '<svg viewBox="0 0 100 100" focusable="false"><g stroke="#3d2c22" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + B.ART[hit.key] + "</g></svg>";
      cache[hit.key] = tpl;
    }
    var n = tpl.cloneNode(true);
    // The emoji itself names the picture for screen readers, as the emoji did.
    n.setAttribute("role", "img");
    n.setAttribute("aria-label", seq);
    if (hit.tone) n.style.setProperty("--skin", hit.tone);
    return n;
  };
  B.hasArt = function (text) {
    if (!EMOJI || typeof text !== "string") return false;
    return (text.match(EMOJI) || []).some(function (m) { return !!lookup(m); });
  };
  B.art = function (text) {
    if (text == null) return [];
    text = String(text);
    if (!EMOJI || !B.hasArt(text)) return [text];
    var out = [], last = 0;
    text.replace(EMOJI, function (m, at) {
      var n = B.artNode(m);
      if (!n) return m;
      if (at > last) out.push(text.slice(last, at));
      out.push(n);
      last = at + m.length;
      return m;
    });
    if (last < text.length) out.push(text.slice(last));
    return out;
  };
  // Puts text (with its pictures) into an element that is already made.
  B.setArt = function (node, text) {
    node.textContent = "";
    B.art(text).forEach(function (c) { node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  };

  /* For pictures inside an SVG (maps, the number line, the shadow step): a <g> centred on (0, 0), size units wide,
     holding the drawing, or the emoji as text when there is none. Place it with transform="translate(x y)". */
  var NS = "http://www.w3.org/2000/svg";
  B.svgArt = function (seq, size, cls) {
    var g = document.createElementNS(NS, "g");
    if (cls) g.setAttribute("class", cls);
    B.fillSvgArt(g, seq, size);
    return g;
  };
  B.fillSvgArt = function (g, seq, size) {
    while (g.firstChild) g.removeChild(g.firstChild);
    var hit = lookup(String(seq));
    if (hit) {
      var s = document.createElementNS(NS, "svg");
      [["x", -size / 2], ["y", -size / 2], ["width", size], ["height", size], ["viewBox", "0 0 100 100"]].forEach(function (a) { s.setAttribute(a[0], a[1]); });
      s.innerHTML = '<g stroke="#3d2c22" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + B.ART[hit.key] + "</g>";
      if (hit.tone) s.style.setProperty("--skin", hit.tone);
      g.appendChild(s);
    } else {
      var t = document.createElementNS(NS, "text");
      [["text-anchor", "middle"], ["dominant-baseline", "central"], ["font-size", size * 0.87]].forEach(function (a) { t.setAttribute(a[0], a[1]); });
      t.textContent = seq;
      g.appendChild(t);
    }
    return g;
  };

  /* Every element made with B.el({ text }) shows drawings for its emoji, so cards, options, baskets, actors and
     lesson cards all get them without each step asking. (Form fields and <option> can only hold plain text.)
     The scripts that use B.el load after this file. */
  var plainEl = B.el, PLAIN = { option: 1, textarea: 1, input: 1, title: 1 };
  B.el = function (tag, attrs, children) {
    if (!attrs || typeof attrs.text !== "string" || PLAIN[tag] || !B.hasArt(attrs.text)) return plainEl(tag, attrs, children);
    var a = {};
    Object.keys(attrs).forEach(function (k) { if (k !== "text") a[k] = attrs[k]; });
    return plainEl(tag, a, B.art(attrs.text).concat(children || []));
  };
})();
