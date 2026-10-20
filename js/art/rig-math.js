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
    return '<text y="' + y + '" text-anchor="middle" font-size="' + size + '" font-weight="800" fill="' + INK + '" stroke="none" direction="' + dir + '" unicode-bidi="' + (dir === "ltr" ? "bidi-override" : "embed") + '">' + esc(t) + "</text>";
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
    "۳ + ۲ = ۵", "۳ + ۴ = ۷", "۴ + ۳ = ۷", "۷ − ۴ = ۳", "۷ − ۳ = ۴", "۸ + ۳ = ۱۱", "۶ + ۶ = ۱۲", "۲۰", "۳۰", "۴۰", "۵۰", "۱۰۰"
  ].forEach(function (t) { both("n:" + t, big); });
  [
    "۶", "۷", "۸", "۱", "۲", "۳", "۴", "۵", "۱۳", "۲۰", "۲۴", "۴۵", "؟",
    "۶ زوج", "۷ فرد", "6 even", "7 odd", "نصف", "half", "یک‌چهارم", "a quarter",
    "۳۸", "۵۸", "۶۳", "+۲۰", "+۵", "۴۷", "۵۰", "۵۲", "+۳", "+۲", "۱۲", "۱۵", "۱۸", "۳", "۲۷", "۳۵", "۸", "۱۰۰", "۶۵", "۹۰", "۲۴", "رضا", "نرگس", "Reza", "Narges", "۶ متر", "۳ متر", "6 m", "3 m", "۱۸ متر", "18 m", "۱۲۰", "۱۳۸", "۹", "۹۶"
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

  // ---- Seed (math-seed-11 to math-seed-50) ----
  // A clear vessel with water inside: the water is drawn full and squashed to look.level from the bottom.
  function vessel(k, outline, inside) {
    var level = k.level == null ? 0 : k.level;
    return g('<path d="' + outline + '" fill="#eaf6fb" fill-opacity=".8"/>' +
      '<path data-part="water" data-pivot="0 0" style="transform:scale(1,' + level + ')" d="' + inside + '" fill="#7cc4e8" stroke="none"/>' +
      '<path d="' + outline + '" fill="none"/>');
  }
  Object.assign(B.RIG, {
    // A glass of tea, an estekan, with no saucer (origin: its bottom middle; 7 wide, 11 tall).
    "estekan": g('<path d="M-3.4-11h6.8l-.9 10.2c-.1.5-.4.8-1 .8h-3c-.6 0-.9-.3-1-.8z" fill="#fff" fill-opacity=".75"/>' +
      '<path d="M-3.2-9h6.4l-.7 8.2c-.1.4-.3.6-.8.6h-3.4c-.5 0-.7-.2-.8-.6z" fill="#c2410c" fill-opacity=".85" stroke="none"/>'),
    // A saucer, from the front (origin: its bottom middle; 13 wide).
    "saucer": g('<path d="M-6.5-1.6c1 1.2 3 1.6 6.5 1.6s5.5-.4 6.5-1.6z" fill="#fff"/><ellipse cy="-1.6" rx="6.5" ry="1" fill="#fff"/>' +
      '<ellipse cy="-1.6" rx="3.4" ry=".5" fill="none" stroke="#5b9bd5" stroke-width=".4"/>'),
    // Glasses and a glass bowl of water, from the side (origin: the bottom middle). The water is a piece ("water",
    // pivot at the bottom) drawn full: look.level (0 empty … 1 full) sets how high it is; a track turns sy to fill
    // or empty it. "glass" is 10 × 16, "glass-tall" a thin one 6 × 24, "bowl" 30 × 11 (it holds the most).
    "glass": function (k) { return vessel(k, "M-5-16h10l-1 15.4c0 .4-.3.6-.7.6h-6.6c-.4 0-.7-.2-.7-.6z", "M-4.5-14.4h9l-.9 13.8c0 .3-.2.6-.6.6h-6c-.4 0-.6-.3-.6-.6z"); },
    "glass-tall": function (k) { return vessel(k, "M-3-24h6l-.5 23.4c0 .4-.3.6-.7.6h-3.6c-.4 0-.7-.2-.7-.6z", "M-2.6-22.4h5.2l-.4 21.8c0 .3-.2.6-.6.6h-3.2c-.4 0-.6-.3-.6-.6z"); },
    "bowl": function (k) { return vessel(k, "M-15-11h30c0 6.6-4.6 11-10 11h-10c-5.4 0-10-4.4-10-11z", "M-14.2-9.6h28.4c-.4 5.6-4.4 9.6-9.4 9.6h-9.6c-5 0-9-4-9.4-9.6z"); },
    // A jug of water, pouring to the right when it turns (origin: its bottom middle; spout at about (8, -17)).
    "jug": g('<path d="M-7-18h12l3-1.6-1 3.2c1 4 1 12-1 16.4h-12c-2.4-5-2.4-12-1-18z" fill="#eaf6fb"/>' +
      '<path d="M-7.2-11h13.4c.4 3.8.2 8-1.6 11h-11.2c-1.4-3.2-1.6-7.2-.6-11z" fill="#7cc4e8" stroke="none"/>' +
      '<path d="M-7-14c-4 0-5 7-1 8" fill="none" stroke-width=".9"/>'),
    // A pencil lying down, from above (origin: the middle of its back end; look.len long, default 30, pointing right;
    // look.color for its paint).
    "pencil-h": function (k) {
      var L = k.len || 30, c = k.color || "#fcd34d";
      return g('<rect x="0" y="-2" width="3" height="4" rx=".8" fill="#f28baa"/><rect x="3" y="-2" width="' + (L - 9) + '" height="4" fill="' + c + '"/>' +
        '<path d="M' + (L - 6) + ' -2L' + L + ' 0L' + (L - 6) + ' 2z" fill="#f3c39b"/><path d="M' + (L - 1.6) + ' -.5L' + L + ' 0L' + (L - 1.6) + ' .5z" fill="#3d2c22" stroke="none"/>');
    },
    // A rope lying in waves (origin: its left end; 30 wide) and the same rope pulled straight (56 long), and a stick
    // (look.len long, default 40), all from above.
    "rope-bent": g('<path d="M0 0c3-8 7-8 8 0s5 8 7 0 5-8 7 0 5 8 8 0" fill="none" stroke="#c98a4b" stroke-width="2.2"/>' +
      '<path d="M0 0c3-8 7-8 8 0s5 8 7 0 5-8 7 0 5 8 8 0" fill="none" stroke="#e8c48a" stroke-width="1" stroke-dasharray="1.2 1.2"/>'),
    "rope-straight": g('<path d="M0 0h56" fill="none" stroke="#c98a4b" stroke-width="2.2"/><path d="M0 0h56" fill="none" stroke="#e8c48a" stroke-width="1" stroke-dasharray="1.2 1.2"/>'),
    "stick": function (k) { var L = k.len || 40; return g('<rect y="-1.8" width="' + L + '" height="3.6" rx="1.6" fill="#a0683f"/><path d="M4 0h' + (L - 10) + '" fill="none" stroke="#7a4b2a" stroke-width=".4"/>'); },
    // Flat shapes to build pictures with (origin: the middle), the same as the tangram step's pieces.
    "sh-square": g('<path d="M-10-10h20v20h-20z" fill="#f6b73c"/>'),
    "sh-tri": g('<path d="M-15 7.5L0-7.5 15 7.5z" fill="#e5483f"/>'),
    "sh-circle": g('<circle r="10" fill="#5a9a45"/>'),
    "sh-rect": g('<path d="M-16-7h32v14h-32z" fill="#5b9bd5"/>'),
    "sh-door": g('<path d="M-3-6h6v12h-6z" fill="#8a5a3b"/>'),
    // Solids: a box (a cube), a can standing, the end of a can lying down (it rolls: origin the middle) and a ball
    // with a line on it so its turning shows (origin the middle); a wooden board leaning, high on the left (origin
    // its low right end on the floor; 70 long, 28 high).
    "cube": g('<path d="M-8 0v-14h14V0z" fill="#e5a35a"/><path d="M-8-14l4-4h14l-4 4z" fill="#f2c27f"/><path d="M6 0v-14l4-4V-4z" fill="#c9843d"/>'),
    "can": g('<path d="M-6-16v16a6 2 0 0 0 12 0v-16z" fill="#e5483f"/><rect x="-6" y="-11" width="12" height="5" fill="#fffaf0" stroke="none"/>' +
      '<ellipse cy="-16" rx="6" ry="2" fill="#d9d9d9"/>'),
    "can-end": g('<circle r="6" fill="#d9d9d9"/><circle r="4.4" fill="none" stroke-width=".4"/><path d="M-4.4 0h8.8" fill="none" stroke-width=".5"/>'),
    "ball-3d": g('<circle r="6" fill="#5b9bd5"/><path d="M-6 0c3-2 9-2 12 0" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="-2" cy="-2.6" r="1.2" fill="#fff" stroke="none" opacity=".6"/>'),
    "ramp": g('<path d="M0 0h-70v-28z" fill="#c98a4b"/><path d="M-66-26.4L-2-1.6" fill="none" stroke="#a0683f" stroke-width=".5"/>'),
    // An egg tray: two rows of five holes (origin: its bottom middle; 60 × 22).
    "egg-tray": g('<rect x="-30" y="-22" width="60" height="22" rx="3" fill="#e9d3b0"/>' + [0, 1, 2, 3, 4].map(function (i) {
      return '<ellipse cx="' + (-24 + i * 12) + '" cy="-15.6" rx="4.6" ry="2.6" fill="#d4b98f"/><ellipse cx="' + (-24 + i * 12) + '" cy="-5.6" rx="4.6" ry="2.6" fill="#d4b98f"/>';
    }).join("")),
    // A wire between two poles, for birds to sit on (origin: its left end; 120 long).
    "wire": g('<path d="M0 0h120" fill="none" stroke="#3d2c22" stroke-width=".8"/><rect x="-3" y="-4" width="3" height="60" fill="#8a6f52"/><rect x="120" y="-4" width="3" height="60" fill="#8a6f52"/>'),
    // Two-colour counters, red on one side and yellow on the other (origin: the middle; 8 wide), and the plastic cup
    // they are shaken in (origin: its bottom middle; 14 × 16).
    "counter-r": g('<circle r="4" fill="#e5483f"/><circle r="2.6" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>'),
    "counter-b": g('<circle r="4" fill="#3c7fc4"/><circle r="2.6" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>'),
    "counter-y": g('<circle r="4" fill="#fcd34d"/><circle r="2.6" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>'),
    "cup": g('<path d="M-7-16h14l-2 16h-10z" fill="#9fd3f0"/><path d="M-7.6-16h15.2" fill="none" stroke-width="1"/>'),
    // A bowl turned upside down, to hide things under (origin: the middle of its rim on the table; 36 × 16).
    "bowl-cover": g('<path d="M-18 0c0-10 8-16 18-16s18 6 18 16z" fill="#5b9bd5"/><path d="M-12-6c4 2 20 2 24 0" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>' +
      '<rect x="-4" y="-18" width="8" height="2.4" rx="1" fill="#5b9bd5"/>'),
    // A nest of straw (origin: its bottom middle; 30 × 9); eggs set in it look as if they sit inside.
    "nest": g('<path d="M-15-7c2 6 7 7 15 7s13-1 15-7c-6 2-24 2-30 0z" fill="#b57638"/><path d="M-12-4c6 1 18 1 24 0M-9-1.6c5 .8 13 .8 18 0" fill="none" stroke="#7a4b2a" stroke-width=".4"/>'),
    // A hand seen from above, spread out for a hand span: thumb tip to little finger tip (origin: the thumb tip,
    // the span goes 20 to the right).
    "span-hand": (function () {
      // fingers as thick rounded strokes: thumb to the left end, little finger to the right end, the rest fanned up
      var f = "M10-5L.8-.6M10-5L5-13M10-5L10.5-14.5M10-5L15-13M10-5L19.2-.6";
      return '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="' + f + '" stroke="#3d2c22" stroke-width="3.6"/>' +
        '<path d="' + f + '" stroke="#f3c39b" stroke-width="2.4"/><ellipse cx="10" cy="-5" rx="5" ry="3.6" fill="#f3c39b" stroke="#3d2c22" stroke-width=".6"/></g>';
    })(),
    // A wooden bench seen from the front (origin: the left end of its seat; look.len long, default 60).
    "bench": function (k) {
      var L = k.len || 60;
      return g('<rect y="-3" width="' + L + '" height="4" rx="1" fill="#c98a4b"/><rect x="3" y="1" width="3" height="12" fill="#a0683f"/><rect x="' + (L - 6) + '" y="1" width="3" height="12" fill="#a0683f"/>');
    },
    // A toy rocket (origin: its bottom middle; 14 × 34), with a flame piece under it that starts hidden.
    "rocket": g('<g data-part="flame" style="opacity:0"><path d="M-4 0c0 6 2 9 4 12 2-3 4-6 4-12z" fill="#f59e0b"/><path d="M-2 0c0 4 1 6 2 8 1-2 2-4 2-8z" fill="#fcd34d" stroke="none"/></g>' +
      '<path d="M-7 0l-4 4V-6l4-4z" fill="#e5483f"/><path d="M7 0l4 4V-6l-4-4z" fill="#e5483f"/>' +
      '<path d="M-7 0v-22c0-6 3-10 7-12 4 2 7 6 7 12V0z" fill="#fffaf0"/><circle cy="-18" r="3.4" fill="#9fd3f0"/><path d="M-7-4h14" fill="none"/>'),
    // A whole-and-parts box: the whole on top, two parts under it (origin: its top middle; 60 × 40).
    "pw-box": g('<rect x="-30" y="0" width="60" height="18" rx="2" fill="#fffaf0"/><rect x="-30" y="22" width="29" height="18" rx="2" fill="#fffaf0"/>' +
      '<rect x="1" y="22" width="29" height="18" rx="2" fill="#fffaf0"/>'),
    // Solids: a cuboid (a long box) and a cone, standing (origin: the bottom middle).
    "cuboid": g('<path d="M-14 0v-12h24V0z" fill="#5b9bd5"/><path d="M-14-12l4-4h24l-4 4z" fill="#8fbbe6"/><path d="M10 0v-12l4-4V-4z" fill="#3f78b0"/>'),
    "cone": g('<path d="M0-18L-8 0a8 2.4 0 0 0 16 0z" fill="#f6b73c"/><ellipse rx="8" ry="2.4" fill="none" stroke-dasharray="1 1" stroke-width=".4"/>'),
    // A craft stick standing up (origin: its bottom middle; 2.4 × 18), and ten of them tied with a band (6 wide).
    "pstick": g('<rect x="-1.2" y="-18" width="2.4" height="18" rx="1.2" fill="#e8c48a"/>'),
    "bundle10": g([-2.4, -1.2, 0, 1.2, 2.4].map(function (x) { return '<rect x="' + (x - 1.2) + '" y="-18" width="2.4" height="18" rx="1.2" fill="#e8c48a"/>'; }).join("") +
      '<rect x="-4" y="-10.6" width="8" height="3" rx="1" fill="#e5483f"/>'),
    // A cross drawn over something to show it is taken away (origin: the middle).
    "cross": '<path d="M-4-4L4 4M4-4L-4 4" fill="none" stroke="#e5483f" stroke-width="1.4" stroke-linecap="round"/>',
    // A circle drawn in a row on paper, to stand for one thing in a story (origin: the middle).
    "o-mark": '<circle r="3" fill="none" stroke="#3c7fc4" stroke-width="1"/>',
    "paper-sheet": g('<rect x="-60" y="-26" width="120" height="52" rx="2" fill="#fffef6"/><path d="M-56-14h112M-56-2h112M-56 10h112" fill="none" stroke="#9fd3f0" stroke-width=".4"/>'),
    // Snow lying on the ground, the same shape as "ground" (stage units).
    "snow-ground": g('<path d="M0 58c30-4 60-5 90-2s50 2 70-1v35H0z" fill="#fbfdff"/>'),
    // Units for measuring: a small cube (origin: its bottom left; 8 × 8) and a paper clip lying down (origin: its left
    // end; 4 long).
    "unit-cube": g('<rect y="-8" width="8" height="8" fill="#f59e0b"/>'),
    "clip": '<path d="M.4-.9h3a.9.9 0 0 1 0 1.8H.8a.6.6 0 0 1 0-1.2h2.6" fill="none" stroke="#6b7280" stroke-width=".35"/>',
    // A tree through the seasons (origin: the bottom of its trunk; 40 tall): look.season spring (blossom), summer,
    // autumn (orange) or winter (bare branches).
    "tree-season": function (k) {
      var s = k.season || "summer";
      var trunk = '<path d="M-3 0l1-20h4l1 20z" fill="#9a6a44"/>';
      if (s === "winter") return g(trunk + '<path d="M0-18l-8-10M0-20l7-12M-1-14l-9-4M1-15l8-5" fill="none" stroke="#9a6a44" stroke-width="1.6"/>');
      var fill = { spring: "#a8d695", summer: "#5a9a45", autumn: "#e8893b" }[s];
      var dots = s === "spring" ? [[-8, -30], [4, -34], [9, -24], [-3, -22], [-10, -20], [2, -28]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.6" fill="#f9c6d6" stroke="none"/>'; }).join("") : "";
      return g(trunk + '<circle cy="-28" r="14" fill="' + fill + '"/>' + dots);
    },
    // An empty number line (origin: its left end; look.len long, default 140), and a hop along it drawn as an arc
    // (origin: where it starts; look.w wide, look.h high).
    "eline": function (k) { var L = k.len || 140; return '<path d="M0 0h' + L + '" fill="none" stroke="#3d2c22" stroke-width="1" stroke-linecap="round"/>'; },
    "hop-arc": function (k) { var w = k.w || 20, h = k.h || 10; return '<path d="M0 0Q' + (w / 2) + ' ' + (-h * 2) + ' ' + w + ' 0" fill="none" stroke="#e8a33d" stroke-width="1.2" stroke-linecap="round"/>'; },
    "nl-tick": '<path d="M0-3v6" fill="none" stroke="#3d2c22" stroke-width="1"/>',
    // A bar of the bar model (origin: its left end, middle; look.w long, 10 high, look.color), and the bracket over a
    // whole bar (origin: its left end; look.w wide).
    "bar-rect": function (k) { return g('<rect y="-5" width="' + (k.w || 40) + '" height="10" rx="1" fill="' + (k.color || "#9fd3f0") + '"/>'); },
    "brace": function (k) { var w = k.w || 40; return '<path d="M0 4q0-4 4-4h' + (w / 2 - 6) + 'q2 0 2-3q0 3 2 3h' + (w / 2 - 6) + 'q4 0 4 4" fill="none" stroke="#3d2c22" stroke-width=".8"/>'; },
    // A big cube drawn in perspective (origin: the bottom left corner of its front face; 30 wide) with pieces to light
    // up: "front", "top", "side" (the faces we see), "back" (dashed hidden edges), "edges" (all 12 edges drawn
    // thick, hidden ones dashed) and "corners" (8 dots, the hidden one hollow); the pieces start hidden.
    "cube-big": g('<path d="M0 0v-30h30V0z" fill="#f6d39b"/><path d="M0-30l12-10h30l-12 10z" fill="#fbe3bb"/><path d="M30 0v-30l12-10v30z" fill="#e5b56f"/>' +
      '<path d="M0 0l12-10h30M12-10v-30" fill="none" stroke-dasharray="1.6 1.2" stroke-width=".5"/>' +
      '<path data-part="front" style="opacity:0" d="M0 0v-30h30V0z" fill="#f28b82" fill-opacity=".7"/>' +
      '<path data-part="top" style="opacity:0" d="M0-30l12-10h30l-12 10z" fill="#f28b82" fill-opacity=".7"/>' +
      '<path data-part="side" style="opacity:0" d="M30 0v-30l12-10v30z" fill="#f28b82" fill-opacity=".7"/>' +
      '<g data-part="edges" style="opacity:0" fill="none" stroke="#3c7fc4" stroke-width="1.4"><path d="M0 0v-30h30V0zM0-30l12-10h30l-12 10M30 0l12-10v-30"/><path d="M0 0l12-10h30M12-10v-30" stroke-dasharray="1.6 1.2"/></g>' +
      '<g data-part="corners" style="opacity:0" fill="#e5483f" stroke="none">' + [[0, 0], [30, 0], [0, -30], [30, -30], [12, -40], [42, -40], [42, -10]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.8"/>'; }).join("") +
      '<circle cx="12" cy="-10" r="1.6" fill="#fff" stroke="#e5483f" stroke-width=".6"/></g>'),
    // Match sticks making squares in a row: the first square (4 sticks), then each next square (3 sticks) (origin: the
    // bottom left of that square; 14 wide).
    "msq-first": '<path d="M0 0v-14h14V0z" fill="none" stroke="#c98a4b" stroke-width="1.6" stroke-linecap="round"/><circle cx="0" cy="-14" r="1" fill="#e5483f"/>',
    "msq-next": '<path d="M0-14h14V0H0" fill="none" stroke="#c98a4b" stroke-width="1.6" stroke-linecap="round"/><circle cx="14" cy="-14" r="1" fill="#e5483f"/>',
    // A third of a sangak seen from above (origin: its middle; 28 × 40), with the bread's dimples.
    "sangak-third": g('<rect x="-14" y="-20" width="28" height="40" rx="3" fill="#dcaa62"/>' + [[-7, -12], [5, -6], [-4, 2], [7, 10], [-8, 14]].map(function (p) {
      return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="2" ry="1.2" fill="#b67a35" stroke="none"/>'; }).join("")),
    // A flower bed seen from above, a rectangle (origin: its top left corner; look.w × look.h); a red line around a
    // rectangle (a fence, drawn like a pencil); a cloth bag of marbles (origin: its bottom middle; 24 tall).
    "bed-top": function (k) {
      var w = k.w || 60, h = k.h || 30;
      return '<g stroke-linejoin="round"><rect width="' + w + '" height="' + h + '" fill="#8cc66b" stroke="#3d2c22" stroke-width=".6"/></g>';
    },
    "rect-line": function (k) { var w = k.w || 60, h = k.h || 30; return '<path d="M0 0H' + w + 'V' + h + 'H0Z" fill="none" stroke="#e5483f" stroke-width="1.6" stroke-linejoin="round"/>'; },
    "marble-bag": g('<path d="M-12 0c-3-8-1-16 4-19h16c5 3 7 11 4 19z" fill="#c4a27a"/><path d="M-8-19c2-3 14-3 16 0" fill="none" stroke-width=".8"/>'),
    // A start line: where things are lined up to compare them (origin: its top; 40 tall).
    "start-line": '<path d="M0 0v40" fill="none" stroke="#e5483f" stroke-width="1" stroke-dasharray="2 1.6"/>'
  });
})();
