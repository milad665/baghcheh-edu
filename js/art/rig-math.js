/* باغچه — drawings for the math scenes (step type `scene`, js/scene.js; the shared drawings are in js/art/rig.js).
   Same rules and style as rig.js: a 160 × 90 stage, each drawing's origin where it stands (the middle of its bottom
   edge) unless its comment says otherwise, pieces with data-part / data-pivot, a dark outline, no text except
   numbers, signs and the few words a math scene must show.

   Numbers, signs and words are drawings too, named by what they show, so a lesson reads as it looks:
     "n:۳"  a big number or sign, as written on the board ("n:۳ + ۲ = ۵" a whole sum);
     "tag:۷" a number or word on a little white card (a house number, a day of the week).
   Each one is made in both Persian and English digits (the English version of a lesson turns «۳» into «3», and
   «؟» into «?»), and words have an English twin listed below. Sums are always written left to right.
   "count:big" is an empty number for the count track (a running total). */
var B = window.B || {};
window.B = B;
B.RIG = B.RIG || {};

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var INK = "#3d2c22";
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  var LATIN = function (s) { return s.replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/؟/g, "?"); };
  var PERSIAN_LETTER = /[ء-يپچژکگی]/;
  // Persian words are written right to left; numbers and sums left to right.
  function textEl(t, size, y) {
    var dir = PERSIAN_LETTER.test(t) ? "rtl" : "ltr";
    return '<text y="' + y + '" text-anchor="middle" font-size="' + size + '" font-weight="800" fill="' + INK + '" stroke="none" direction="' + dir + '" unicode-bidi="embed">' + esc(t) + "</text>";
  }
  function width(t, size) { return t.length * size * 0.56 + size * 0.9; }
  // A big number or sign (origin: the middle of its baseline area's bottom).
  function big(t) {
    return '<g>' + textEl(t, 12, -2) + "</g>";
  }
  // A number or word on a little white card.
  function tag(t, w) {
    var size = 6.4, h = 9.4, ww = w || Math.max(11, width(t, size));
    return g('<rect x="' + (-ww / 2) + '" y="' + (-h) + '" width="' + ww + '" height="' + h + '" rx="2.2" fill="#fffaf0"/>' + textEl(t, size, -2.6));
  }
  function both(name, make) {
    B.RIG[name] = make(name.slice(name.indexOf(":") + 1));
    var l = LATIN(name);
    if (l !== name) B.RIG[l] = make(l.slice(l.indexOf(":") + 1));
  }
  [
    // single numbers and signs, for sums built piece by piece
    "۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "+", "−", "=", "؟",
    "۱۳", "۲۰", "۲۴", "۲۵", "۴۵",
    "۳ + ۲ = ۵"
  ].forEach(function (t) { both("n:" + t, big); });
  [
    "۶", "۷", "۸", "۱", "۲", "۳", "۴", "۵", "۱۳", "۲۰", "۲۴", "۴۵", "؟",
    "۶ زوج", "۷ فرد", "6 even", "7 odd", "نصف", "half", "یک‌چهارم", "a quarter"
  ].forEach(function (t) { both("tag:" + t, function (x) { return tag(x); }); });
  // The days of the week, all on cards of the same width.
  ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه",
    "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(function (t) {
    B.RIG["day:" + t] = tag(t, 40);
  });
  // A running total for the count track: a big number with nothing in it yet.
  B.RIG["count:big"] = '<text data-count y="-2" text-anchor="middle" font-size="14" font-weight="800" fill="' + INK + '" stroke="#fff" stroke-width="1.2" paint-order="stroke"></text>';

  // ---- backdrops: the story backdrops (js/art/scenes.js) as a part, so a scene can fade from one to another ----
  ["meadow", "garden", "kitchen", "street", "room", "bedroom", "school"].forEach(function (k) {
    B.RIG["bg-" + k] = function () { return '<g stroke-linejoin="round" stroke-linecap="round">' + (B.SCENES && B.SCENES[k] || "") + "</g>"; };
  });

  Object.assign(B.RIG, {
    /* ---------- things to count ---------- */
    // A sparrow from the side, facing right (origin: its feet). Its wing flaps (piece "wing").
    "sparrow": g('<path d="M-5.6-4.4l-3.6-1.6 1 2.6z" fill="#8a5a3b"/>' +
      '<ellipse cx="-1" cy="-4.4" rx="4.6" ry="3.2" fill="#b07a4f"/><ellipse cx="-.4" cy="-3.4" rx="3" ry="1.8" fill="#f0dcc0" stroke="none"/>' +
      '<circle cx="3.2" cy="-7.4" r="2.6" fill="#b07a4f"/><path d="M5.6-7.8l1.8.6-1.8.7z" fill="#f6b73c"/>' +
      '<circle cx="4" cy="-8" r=".5" fill="' + INK + '" stroke="none"/><path d="M1.6-8.6c.6-.8 1.6-1 2.4-.8" fill="none" stroke="#8a5a3b" stroke-width=".5"/>' +
      '<path d="M-1.4-1.4v1.4M.6-1.4v1.4" fill="none" stroke-width=".5"/>' +
      '<g data-part="wing" data-pivot="0 -5.6"><path d="M0-5.6c-2.6-.4-4.8.6-5.4 2.6 2.4.6 4.6 0 5.4-2.6z" fill="#8a5a3b"/></g>'),
    // A basket with an open top, seen from the front: put things between "basket-back" and "basket-front" and they
    // are inside it (origin: middle of its bottom; 40 wide, its rim at y = -12).
    "basket-back": g('<ellipse cy="-12" rx="20" ry="3.4" fill="#8a5a2e"/>'),
    "basket-front": g('<path d="M-20-12c0 8 4 12 8 12h24c4 0 8-4 8-12 -6 3-34 3-40 0z" fill="#d79a52"/>' +
      '<path d="M-17-6.6c10 2 24 2 34 0M-14-2c8 1.4 20 1.4 28 0" fill="none" stroke="#a8692e" stroke-width=".5"/>' +
      '<path d="M-10-9v8.4M-3-8.4v8.4M4-8.4v8.4M11-9v8.4" fill="none" stroke="#a8692e" stroke-width=".5"/>' +
      '<path d="M-20-12c6 3 34 3 40 0" fill="none" stroke-width=".8"/>'),
    // A vase for flowers (origin: middle of its bottom; the flowers' stems go down behind it to y = -10).
    "vase": g('<path d="M-7-14c-1 4-4 6-4 9 0 3 2 5 5 5h12c3 0 5-2 5-5 0-3-3-5-4-9z" fill="#5b9bd5"/><path d="M-8-14h16" fill="none" stroke-width=".9"/>' +
      '<path d="M-6-6c3 1 9 1 12 0" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>'),
    // A plate from the side (origin: middle of its bottom; things sit on it at y = -2.4).
    "plate": g('<ellipse cy="-1.6" rx="10" ry="2.2" fill="#fff"/><ellipse cy="-2" rx="6" ry="1" fill="#eef3f6" stroke="none"/>'),
    // A shoe seen from above, toes up (origin: its middle). It is a right shoe; flip it for the left one.
    "shoe": g('<path d="M-1.6-8c3-.4 5 1.4 5.2 4.4.2 2.4-.6 4.4-.8 6.6-.2 2.6-1.4 4.2-3.2 4.2S-3.2 5.6-3.4 3C-3.6.6-4.4-1-4.4-3.4c0-2.6 1-4.4 2.8-4.6z" fill="#e5483f"/>' +
      '<path d="M-2.2-3.4h3.6M-2.4-1.4h3.8M-2.2.6h3.6" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<path d="M-3 4.6c1.2 1.4 3.2 1.4 4.2 0" fill="none" stroke="#fff" stroke-width=".5"/>'),
    // A ring drawn around a pair (origin: its middle).
    "pair-ring": '<ellipse rx="10.5" ry="11" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round"/>',
    // A picture card (origin: middle of its bottom), and ten of them in a pile with a rubber band round them.
    "pcard": g('<rect x="-3.4" y="-9" width="6.8" height="9" rx=".8" fill="#fff"/><rect x="-2.4" y="-8" width="4.8" height="7" rx=".5" fill="#9fd3f0" stroke="none"/>' +
      '<path d="M0-6.6l.7 1.5 1.6.2-1.2 1.1.3 1.6L0-3l-1.4.8.3-1.6-1.2-1.1 1.6-.2z" fill="#fcd34d" stroke-width=".3"/>'),
    "pcard-ten": g([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
      return '<rect x="' + (-3.4 + i * 0.25) + '" y="' + (-9 - i * 0.5) + '" width="6.8" height="9" rx=".8" fill="#fff" stroke-width=".35"/>';
    }).join("") + '<rect x="-1.2" y="-8.6" width="4.8" height="7" rx=".5" fill="#9fd3f0" stroke="none"/>' +
      '<path d="M2.4-12.2v9" fill="none" stroke="#e5483f" stroke-width="1.1"/>'),
    // Sangak bread from the side: one thin bread, and a pile of ten (origin: middle of the bottom; 22 wide).
    "sangak": g('<path d="M-11 0c0-1 .6-1.6 2-1.6h18c1.4 0 2 .6 2 1.6z" fill="#d9a066"/><path d="M-7-.8h1M-3-.9h1M1-.8h1M5-.9h1" fill="none" stroke="#a8692e" stroke-width=".4"/>'),
    "sangak-ten": g([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
      var y = -i * 1.5;
      return '<path d="M-11 ' + y + "c0-1 .6-1.6 2-1.6h18c1.4 0 2 .6 2 1.6z" + '" fill="' + (i % 2 ? "#d9a066" : "#e2ad74") + '" stroke-width=".35"/>';
    }).join("")),
    // A long wooden counter (a bazaar stall, a bakery), seen from the front (origin: middle of its bottom; 70 wide,
    // things stand on it at y = -18).
    "counter-table": g('<rect x="-35" y="-18" width="70" height="3" rx=".8" fill="#a0683f"/><rect x="-33" y="-15" width="66" height="15" fill="#c98a4b"/>' +
      '<path d="M-33-7.5h66M-11-15v15M11-15v15" fill="none" stroke="#a0683f" stroke-width=".5"/>'),
    // A stall's awning, striped, on two poles that reach down 34 to the counter (origin: middle of its bottom edge;
    // 74 wide).
    "awning": g('<path d="M-37 0l4-10h66l4 10z" fill="#fff"/>' + [0, 1, 2, 3, 4, 5].map(function (i) {
      var x = -37 + i * 12.4;
      return '<path d="M' + (x + 4 - i * 0.2) + ' -10h5.4l1.2 10h-6.2z" fill="#e5483f" stroke="none"/>';
    }).join("") + '<path d="M-37 0l4-10h66l4 10z" fill="none"/><path d="M-33 0v34M33 0v34" fill="none" stroke="#a0683f" stroke-width="1.2"/>'),
    // A ball drawn around its middle, so it can roll (origin: its middle; 8 across).
    "ball-roll": g('<circle r="4" fill="#fff"/><path d="M-4 0c2-1.6 6-1.6 8 0M0-4c-1.6 2-1.6 6 0 8" fill="none" stroke="#e5483f" stroke-width=".8"/>'),
    // A flat line from the origin to the right, 100 long (scale it with sx), for comparing heights.
    "level": '<path d="M0 0h100" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/><path d="M0 0h100" fill="none" stroke="#e5483f" stroke-width="1.1" stroke-linecap="round"/>',
    // An arrow pointing right, its tip at the origin.
    "pointer": g('<path d="M-12-2.6h6.4v-3.4L0 0l-5.6 6v-3.4H-12z" fill="#f59e0b"/>'),
    // A white halo and an orange ring, for pointing at one thing (origin: its middle; 22 across).
    "ring": '<circle r="11" fill="none" stroke="#fff" stroke-width="2.6"/><circle r="11" fill="none" stroke="#f59e0b" stroke-width="1.3"/>',

    // Grain scattered on the ground (origin: its middle); each seed is a piece (s1 … s6) the hen can eat.
    "seeds": g([[-6, 0], [-3.4, 1.2], [-1, -.4], [1.8, 1], [4.2, -.2], [6.6, 1.1]].map(function (p, i) {
      return '<ellipse data-part="s' + (i + 1) + '" cx="' + p[0] + '" cy="' + p[1] + '" rx="1" ry=".6" fill="#f6c453" stroke-width=".3"/>';
    }).join("")),
    // A long flower box (origin: middle of its bottom; 70 wide, 10 tall): flowers stand in it, stems hidden.
    "planter": g('<rect x="-35" y="-10" width="70" height="10" rx="1.4" fill="#c4673a"/><path d="M-35-8h70" fill="none" stroke="#a5532c" stroke-width=".5"/>'),
    // A big old plane tree (چنار) with a wide trunk to hide behind (origin: middle of the trunk's foot; the
    // trunk is 20 wide and 34 tall, the crown reaches up to y = -78 and from x = -38 to 38).
    "plane-tree": g('<path d="M-10 0c1.4-8 2-22 1.6-36h16.8c-.4 14 .2 28 1.6 36z" fill="#9a6a44"/>' +
      '<path d="M-3-6c.4-8 .4-16-.6-24M4-4c-.2-6 0-12 .8-18" fill="none" stroke="#7a4f30" stroke-width=".5"/>' +
      '<path d="M-6-34l-10-8M6-34l11-9" fill="none" stroke="#9a6a44" stroke-width="2.4"/>' +
      '<path d="M-34-46c-7-8-1-20 10-20 1-9 15-14 23-7 8-7 22-3 24 7 11 0 17 11 11 19 4 7-3 14-11 13-5 6-17 7-23 2-7 5-19 4-23-2-8 1-14-6-11-12z" fill="#5a9a45"/>' +
      '<path d="M-20-56c3-2 7-2 10 0M8-62c3-2 7-2 10 0M-4-48c3-2 7-2 10 0" fill="none" stroke="#3f7a33" stroke-width=".6"/>'),
    // Grass under a sky-coloured stage (stage units, from y = 58 down).
    "ground": g('<path d="M0 58c30-4 60-5 90-2s50 2 70-1v35H0z" fill="#8cc66b"/>' +
      '<path d="M12 80l-1.4-3M12 80v-3.4M12 80l1.4-3M146 70l-1.4-3M146 70v-3.4M146 70l1.4-3" fill="none" stroke="#5a9a45" stroke-width=".6"/>'),
    // A closed gate with bars, for a school on a holiday (origin: middle of its bottom; 16 wide, 12 tall).
    "gate": g('<rect x="-9" y="-13" width="18" height="2" fill="#6b7280"/><rect x="-9" y="-2" width="18" height="2" fill="#6b7280"/>' +
      '<path d="M-7.5-11v9M-3.8-11v9M0-11v9M3.8-11v9M7.5-11v9" fill="none" stroke="#4b5563" stroke-width="1.3"/><rect x="-1.6" y="-8.4" width="3.2" height="3.6" rx=".6" fill="#fcd34d"/>'),

    /* ---------- a day: the sky changes, seen through the window ---------- */
    // The sky at four times of day (stage units, the whole stage).
    "sky-dawn": '<rect width="160" height="90" fill="#fbd3b0"/><rect y="40" width="160" height="50" fill="#fde7c4"/>',
    "sky-day": '<rect width="160" height="90" fill="#bfe3f5"/>',
    "sky-dusk": '<rect width="160" height="90" fill="#f4a76a"/><rect y="30" width="160" height="60" fill="#f9c58c"/>',
    "sky-night": '<rect width="160" height="90" fill="#2e3f72"/>' + [[20, 10], [44, 22], [70, 8], [96, 18], [122, 9], [148, 20], [134, 32], [30, 34]].map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".6" fill="#fff3b0"/>';
    }).join(""),
    // The sun (origin: its middle).
    "sun": g('<g fill="#f6b73c" stroke="none"><path d="M0-10l1.6 3.2h-3.2zM0 10l-1.6-3.2h3.2zM-10 0l3.2-1.6v3.2zM10 0l-3.2 1.6v-3.2zM-7-7l3.4 1.1-2.3 2.3zM7 7l-3.4-1.1 2.3-2.3zM7-7l-1.1 3.4-2.3-2.3zM-7 7l1.1-3.4 2.3 2.3z"/></g>' +
      '<circle r="5.4" fill="#fcd34d"/>'),
    // The moon (origin: its middle).
    "moon": g('<path d="M2-6a6 6 0 1 0 4 10.4A5 5 0 0 1 2-6z" fill="#fff3b0"/>'),
    // Omid's room: the wall with a big window (the sky shows through it), and the floor (stage units).
    "day-room": g('<path fill-rule="evenodd" d="M0 0h160v60H0zM58 8h44v34H58z" fill="#f6e3c6"/>' +
      '<path d="M58 8h44v34H58z" fill="none" stroke-width="1.4"/><path d="M80 8v34M58 25h44" fill="none" stroke-width=".9"/>' +
      '<rect x="0" y="60" width="160" height="30" fill="#e7c69c"/><path d="M0 60h160" fill="none"/>' +
      '<path d="M0 72h160M0 84h160" fill="none" stroke="#c9a074" stroke-width=".4"/>'),
    // A sofreh (cloth spread on the floor for a meal), from the front (origin: its middle; 70 wide).
    "sofreh": g('<ellipse rx="35" ry="5" fill="#f9f3e6"/><ellipse rx="31" ry="3.6" fill="none" stroke="#e5483f" stroke-width=".6" stroke-dasharray="1.4 1.2"/>'),
    // A little "z" for sleeping (origin: its middle).
    "zz": '<text y="2" text-anchor="middle" font-size="6" font-weight="800" fill="#5b6fb5" stroke="#fff" stroke-width=".8" paint-order="stroke" direction="ltr">z</text>'
  });
})();
