/* باغچه — drawings for animated scenes (step type `scene`, js/scene.js). Unlike js/art/*.js (one emoji, one
   picture), these are drawn for a 160 × 90 stage, can have moving pieces (data-part, turning around data-pivot)
   and come in views (a bed from the side and from above). Each drawing has its origin (0, 0) where it stands
   (usually the middle of its bottom edge), unless its comment says it is drawn in stage units at its own place.
   Same style as the other drawings: flat picture-book shapes, warm colours, a dark outline (#3d2c22), no text. */
var B = window.B || {};
window.B = B;

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var SKIN = "var(--skin,#f3c39b)";
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }

  // ---- Room plan: the same room as B.MAPS.room (js/lessons/world.js), 400 × 300 map units on the stage at
  // x' = 24 + 0.28 x, y' = 3 + 0.28 y. Drawn in stage units at its own place. ----
  var P = function (x) { return +(24 + 0.28 * x).toFixed(1); }, Q = function (y) { return +(3 + 0.28 * y).toFixed(1); };
  var L = function (w) { return +(0.28 * w).toFixed(1); };
  function rect(x, y, w, h, fill, rx) {
    return '<rect x="' + P(x) + '" y="' + Q(y) + '" width="' + L(w) + '" height="' + L(h) + '" rx="' + (rx || 0) + '" fill="' + fill + '"/>';
  }
  B.ROOM_PLAN = { x: P, y: Q, w: L };
  function box(x, y, w, h) { return "M" + P(x) + " " + Q(y) + "h" + L(w) + "v" + L(h) + "h" + (-L(w)) + "z"; }
  var MAP_LINES = [box(12, 12, 376, 276), box(24, 24, 130, 80), box(150, 3, 100, 10), box(300, 20, 80, 50),
    box(320, 120, 56, 70), box(120, 130, 160, 100),
    "M" + (P(210) + L(14)) + " " + Q(175) + "a" + L(14) + " " + L(14) + " 0 1 1 0 .01", box(388, 210, 10, 60)];
  B.ROOM_MAP_PATH = MAP_LINES.join(" ");

  B.RIG = {
    /* ---------- Delaram's room, from the side ---------- */
    // The back wall, standing on the floor line (origin: its bottom-left corner, at y = 56 on the stage).
    "room-wall": g('<rect x="0" y="-56" width="160" height="56" fill="#f6e3c6"/>' +
      '<g fill="#efd3ad" stroke="none"><rect x="0" y="-56" width="160" height="5"/></g>' +
      // window, with a sky and a cloud
      '<g data-part="window" data-pivot="80 -35"><rect x="60" y="-48" width="40" height="26" rx="1.5" fill="#fff"/><rect x="62.5" y="-45.5" width="35" height="21" fill="#bfe3f5"/>' +
      '<path d="M67-36c0-2.4 2.4-3.4 4-2.2 1-2.4 4.8-2.4 5.4 0 2.2 0 3.4 1.4 2.4 2.2z" fill="#fff" stroke="none"/>' +
      '<path d="M80-45.5v21M62.5-35h35" fill="none"/></g>' +
      '<rect x="0" y="-2.2" width="160" height="2.2" fill="#d9b48a"/>'),
    // The floor, drawn in stage units at its own place (y 56 to 90), with boards going back.
    "room-floor": g('<rect x="0" y="56" width="160" height="34" fill="#e7c69c"/>' +
      '<g fill="none" stroke="#c9a074" stroke-width=".4"><path d="M10 90L36 56M44 90L58 56M80 90V56M116 90L102 56M150 90L124 56M0 66h160M0 78h160"/></g>' +
      // the door in the right wall, seen from the side
      '<path d="M152 72V30l8-4v52z" fill="#c98a4b"/><circle cx="154.5" cy="52" r=".8" fill="#fcd34d"/>'),
    // Bed against the back wall, from the side (origin: middle of its front-bottom edge).
    "bed-side": g('<rect x="-26" y="-22" width="5" height="22" rx="1.2" fill="#c98a4b"/><rect x="21" y="-12" width="5" height="12" rx="1.2" fill="#c98a4b"/>' +
      '<rect x="-22" y="-8" width="44" height="5" fill="#a0683f"/><rect x="-22" y="-13" width="44" height="6" rx="1.5" fill="#fff"/>' +
      '<ellipse cx="-15" cy="-14.5" rx="6" ry="3" fill="#fff"/><path d="M-8-14h30v8H-8z" fill="#5b9bd5"/><path d="M-8-10.5h30" fill="none" stroke-width=".4"/>'),
    // Wardrobe (کمد) against the back wall (origin: middle of its bottom edge); 32 wide, 44 tall.
    "wardrobe-side": g('<rect x="-16" y="-44" width="32" height="44" rx="1" fill="#b57638"/><rect x="-14" y="-41" width="13.5" height="38" fill="#c98a4b"/>' +
      '<rect x=".5" y="-41" width="13.5" height="38" fill="#c98a4b"/><circle cx="-2" cy="-22" r=".9" fill="#fcd34d"/><circle cx="2" cy="-22" r=".9" fill="#fcd34d"/>' +
      '<rect x="-17" y="-46" width="34" height="3" rx=".8" fill="#a0683f"/>'),
    // Desk with books, and a chair (origin: middle of the desk's bottom edge).
    "desk-side": g('<rect x="-12" y="-14" width="24" height="3" rx=".6" fill="#b57638"/><rect x="-11" y="-11" width="2.4" height="11" fill="#a0683f"/><rect x="8.6" y="-11" width="2.4" height="11" fill="#a0683f"/>' +
      '<rect x="-7" y="-19" width="3" height="5" fill="#e5483f"/><rect x="-4" y="-20" width="3" height="6" fill="#5b9bd5"/><rect x="-1" y="-18" width="3" height="4" fill="#5a9a45"/>' +
      '<g transform="translate(-17 0)"><rect x="-4" y="-17" width="2.2" height="17" fill="#c98a4b"/><rect x="-4" y="-8" width="8" height="2" fill="#b57638"/><rect x="2.2" y="-6" width="1.8" height="6" fill="#c98a4b"/></g>'),
    // The rug lying on the floor, seen from the side: a thin slanted shape (origin: middle of its front edge).
    "rug-side": g('<path d="M-40 0l6-11h68l6 11z" fill="#b5523b"/><path d="M-35-1.6l4.4-7.8h61.2l4.4 7.8z" fill="#e7c27a" stroke="none"/><path d="M-12-5.5l12-2.6 12 2.6-12 2.6z" fill="#9c3f33" stroke="none"/>'),
    // A ball from the side (origin: where it touches the floor).
    "ball-side": g('<circle cy="-4" r="4" fill="#fff"/><path d="M-4-4c2-1.6 6-1.6 8 0M0-8c-1.6 2-1.6 6 0 8" fill="none" stroke="#e5483f" stroke-width=".8"/><path d="M-2.4-6.6c.8-.6 1.6-.8 2.4-.8" fill="none" stroke="#fff" stroke-width=".6"/>'),
    // The cat from the side, sitting (origin: between its paws); it faces right. Its head is a piece.
    "cat-side": g('<path d="M-6 0c-1-5 0-9 4-10 4-1 7 2 7 6 0 2-1 4-1 4z" fill="#f0a35e"/>' +
      '<path d="M-6-1c-4 0-6-3-5-6" fill="none" stroke="#f0a35e" stroke-width="1.8"/><path d="M-6-1c-4 0-6-3-5-6" fill="none" stroke-width=".6"/>' +
      '<g data-part="head" data-pivot="3 -10"><circle cx="4" cy="-12" r="4" fill="#f0a35e"/><path d="M1-15l.4-3.4 2.4 2M5.4-15.6l2.2-2.4.4 3.2" fill="#f0a35e"/>' +
      '<g stroke="none" fill="#3d2c22"><ellipse cx="5.6" cy="-12.6" rx=".55" ry=".8"/></g><path d="M7.4-11.4l.8.2" fill="none" stroke-width=".5"/></g>'),
    // Sight lines from the cat on the wardrobe to the bed, the ball and the teddy (stage units at their place).
    "cat-sight": '<g fill="none" stroke="#3f6f8f" stroke-width=".7" stroke-dasharray="2 1.6" stroke-linecap="round" opacity=".8">' +
      '<path d="M128 7L38 55"/><path d="M128 7L84 69"/><path d="M128 7L30 75"/></g>',

    /* ---------- the same room from above (stage units at their place) ---------- */
    "room-plan": g('<rect x="' + P(0) + '" y="' + Q(0) + '" width="' + L(400) + '" height="' + L(300) + '" fill="#8a6f52"/>' +
      rect(12, 12, 376, 276, "#f3e6cf") + rect(150, 3, 100, 10, "#a9d6f0") +
      // the door, open into the room, and its swing
      rect(388, 210, 10, 60, "#c98a4b") + '<path d="M' + P(388) + " " + Q(210) + "a" + L(60) + " " + L(60) + " 0 0 0 " + (-L(60)) + " " + L(60) + '" fill="none" stroke-dasharray="1 1" stroke-width=".4"/>'),
    "bed-top": g(rect(24, 24, 130, 80, "#c98a4b", 1.5) + rect(30, 30, 118, 68, "#5b9bd5", 1) + rect(34, 36, 34, 56, "#fff", 2)),
    "wardrobe-top": g(rect(300, 20, 80, 50, "#b57638", 1) + '<path d="M' + P(340) + " " + Q(20) + "v" + L(50) + '" fill="none" stroke-width=".4"/>'),
    "desk-top": g(rect(320, 120, 56, 70, "#b57638", 1) + rect(330, 132, 16, 22, "#e5483f") + rect(330, 158, 16, 20, "#5b9bd5") + rect(286, 140, 28, 30, "#c98a4b", 1.5)),
    "rug-top": g(rect(120, 130, 160, 100, "#b5523b", 1.5) + rect(132, 140, 136, 80, "#e7c27a") + '<path d="M' + P(200) + " " + Q(158) + "l" + L(36) + " " + L(22) + " " + (-L(36)) + " " + L(22) + " " + (-L(36)) + " " + (-L(22)) + 'z" fill="#9c3f33" stroke="none"/>'),
    "ball-top": g('<circle cx="' + P(210) + '" cy="' + Q(175) + '" r="' + L(14) + '" fill="#fff"/><path d="M' + (P(210) - L(14)) + " " + Q(175) + "h" + L(28) + '" fill="none" stroke="#e5483f" stroke-width=".8"/>'),
    "teddy-top": g('<g transform="translate(' + P(70) + " " + Q(240) + ')"><circle cx="-2.6" cy="-3" r="1.6" fill="#c98a4b"/><circle cx="2.6" cy="-3" r="1.6" fill="#c98a4b"/><ellipse cy="2" rx="4" ry="4.6" fill="#c98a4b"/><circle cy="-1.4" r="3" fill="#c98a4b"/><ellipse cy="2.6" rx="2" ry="2.4" fill="#f0c08a" stroke="none"/></g>'),
    "plant-top": g('<g transform="translate(' + P(34) + " " + Q(268) + ')"><circle r="3.4" fill="#c4673a"/><g fill="#5a9a45"><ellipse cx="-1.4" cy="-1" rx="2" ry="1.2" transform="rotate(-30)"/><ellipse cx="1.4" cy="-.6" rx="2" ry="1.2" transform="rotate(30)"/><ellipse cy="1.4" rx="1.2" ry="2"/></g></g>'),
    // The cat from above, curled up (origin: its middle).
    "cat-top": g('<ellipse rx="4.4" ry="3.2" fill="#f0a35e"/><circle cx="3.6" cy="-1.6" r="2.4" fill="#f0a35e"/><path d="M2.6-3.6l.4-1.6 1.2 1M4.6-3.4l1.4-1 0 1.6" fill="#f0a35e"/><path d="M-4.2 1c-1.4 1.4-.4 3.2 1.6 2.6" fill="none" stroke="#f0a35e" stroke-width="1.4"/><path d="M-1 -2.6c0 1.2 0 3.6 0 5.2M1-2.8v5.4" fill="none" stroke="#d98a45" stroke-width=".5"/>'),
    // Outlines a child would draw: the room map, one line after another (stage units at their place). The
    // pencil follows B.ROOM_MAP_PATH, the same lines in the same order.
    "room-map-lines": '<g fill="none" stroke="#3d2c22" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">' +
      MAP_LINES.map(function (d) { return '<path d="' + d + '"/>'; }).join("") + "</g>",
    // A highlight ring and a highlight frame, for pointing at the ball and the rug from above.
    // A white halo under each, so they stand out on the rug.
    "ring-ball": '<circle cx="' + P(210) + '" cy="' + Q(175) + '" r="' + (L(14) + 2) + '" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<circle cx="' + P(210) + '" cy="' + Q(175) + '" r="' + (L(14) + 2) + '" fill="none" stroke="#f59e0b" stroke-width="1.6"/>',
    "frame-rug": '<rect x="' + (P(120) - 2) + '" y="' + (Q(130) - 2) + '" width="' + (L(160) + 4) + '" height="' + (L(100) + 4) + '" rx="1" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<rect x="' + (P(120) - 2) + '" y="' + (Q(130) - 2) + '" width="' + (L(160) + 4) + '" height="' + (L(100) + 4) + '" rx="1" fill="none" stroke="#f59e0b" stroke-width="1.6"/>',
    // A pencil, its tip at the origin.
    "pencil": g('<g transform="rotate(-40)"><path d="M0 0l2-5h3l-2 5z" fill="#f3c39b" transform="translate(-1.6 0)"/><rect x=".4" y="-21" width="3.4" height="16" fill="#fcd34d" transform="translate(-1.6 0)"/><rect x=".4" y="-24" width="3.4" height="3" fill="#f28baa" transform="translate(-1.6 0)"/></g>'),
    // A little paper sheet behind the map Delaram drew (stage units).
    "paper": '<rect x="20" y="1" width="120" height="88" rx="2" fill="#fffaf0" stroke="#3d2c22" stroke-width=".5"/>',

    /* ---------- washing hands ---------- */
    // The bathroom: tiled wall and the sink counter (stage units).
    "bathroom": g('<rect width="160" height="90" fill="#dff1f7" stroke="none"/>' +
      '<g fill="none" stroke="#b9dbe7" stroke-width=".5"><path d="M0 12h160M0 24h160M0 36h160M0 48h160M20 0v60M40 0v60M60 0v60M100 0v60M120 0v60M140 0v60"/></g>' +
      '<rect x="0" y="60" width="160" height="30" fill="#f4f4f2"/><path d="M0 60h160" fill="none"/>' +
      '<ellipse cx="80" cy="69" rx="32" ry="6.5" fill="#cfd8dc"/><ellipse cx="80" cy="69.6" rx="28" ry="5" fill="#b0bec5" stroke="none"/><ellipse cx="80" cy="71" rx="2" ry=".9" fill="#78909c"/>' +
      // a hook for the towel
      '<path d="M134 22v3a2 2 0 0 0 4 0" fill="none" stroke="#b8c0c8" stroke-width="1"/>'),
    // The tap on the wall above the sink, with a handle that turns (stage units; spout tip at 80, 31).
    "tap": g('<rect x="70" y="16" width="20" height="5" rx="1.2" fill="#b8c0c8"/><path d="M77 21h6v5c0 2.6-1 4-3 5-2-1-3-2.4-3-5z" fill="#b8c0c8"/>' +
      '<g data-part="handle" data-pivot="80 15"><rect x="73" y="13" width="14" height="3" rx="1.4" fill="#e5483f"/><rect x="79" y="14" width="2" height="3" fill="#b8c0c8"/></g>' +
      '<path d="M72 18h7" fill="none" stroke="#fff" stroke-width=".8" opacity=".7"/>'),
    // Running water, from the spout to the sink (stage units); the stripes move (class flow).
    "water": '<g><rect x="78.4" y="30" width="3.2" height="38" fill="#9fd3f0" opacity=".85"/>' +
      '<path class="flow" d="M79.4 30v38M80.8 30v38" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="2 4" opacity=".9"/></g>',
    // The soap on the counter (origin: its bottom middle).
    "soap": g('<rect x="-6" y="-4" width="12" height="4.4" rx="2" fill="#f9b9cf"/><path d="M-4-2.6c1.4-.6 3-.6 4-.4" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>'),
    // A hand seen from the palm, fingers up, thumb to the left (origin: the wrist). The other hand is the same,
    // mirrored (flip). Germs and foam are pieces of the hands drawing (see "hands").
    "hand": hand(),
    // Germs on one hand, in the hand's own units (put it under a hand part): small, friendly green spots.
    "germs-hand": '<g stroke="#3d2c22" stroke-width=".3" fill="#8bc34a"><circle cx="-3.6" cy="-6" r="1.1"/><circle cx="2.4" cy="-9" r=".9"/>' +
      '<circle cx="4" cy="-3.4" r="1"/><circle cx="-1" cy="-15" r=".8"/><circle cx="5" cy="-17.6" r=".7"/><circle cx="-5.4" cy="-17" r=".7"/></g>',
    // Foam on one hand, in the hand's own units (put it under a hand part).
    "foam-hand": '<g fill="#fff" stroke="#7fb8d8" stroke-width=".3"><circle cx="-4" cy="-5" r="2.6"/><circle cx="1" cy="-7" r="3"/><circle cx="5" cy="-3.6" r="2.4"/>' +
      '<circle cx="-2.6" cy="-11" r="2.4"/><circle cx="3" cy="-12.4" r="2.6"/><circle cx="-5.6" cy="-15" r="1.8"/><circle cx="1.4" cy="-17" r="2"/><circle cx="5.6" cy="-16" r="1.6"/></g>',
    // Germs on the hands: small, friendly green spots (stage units, over the hands at 80, 50).
    "germs": '<g stroke="#3d2c22" stroke-width=".35"><g fill="#8bc34a">' +
      '<circle cx="73" cy="46" r="1.3"/><circle cx="77.5" cy="52" r="1"/><circle cx="84" cy="44" r="1.2"/><circle cx="87" cy="51" r="1"/><circle cx="80" cy="40" r=".9"/><circle cx="75" cy="38" r=".8"/><circle cx="85.5" cy="37.5" r=".8"/></g>' +
      '<g fill="#3d2c22" stroke="none"><circle cx="72.6" cy="45.8" r=".22"/><circle cx="73.4" cy="45.8" r=".22"/><circle cx="83.6" cy="43.8" r=".22"/><circle cx="84.4" cy="43.8" r=".22"/></g></g>',
    // Foam on the hands (stage units, around 80, 46).
    "foam": '<g fill="#fff" stroke="#7fb8d8" stroke-width=".35">' +
      '<circle cx="72" cy="46" r="3"/><circle cx="76" cy="42" r="3.4"/><circle cx="81" cy="44" r="3.6"/><circle cx="86" cy="42" r="3"/><circle cx="88" cy="47" r="2.6"/>' +
      '<circle cx="74" cy="50" r="2.6"/><circle cx="79" cy="49" r="3"/><circle cx="84" cy="50" r="2.8"/><circle cx="80" cy="38" r="2.4"/><circle cx="74" cy="37" r="2"/><circle cx="86" cy="36.5" r="2"/></g>',
    // Both hands with the fingers laced together, to wash between the fingers (origin: between the wrists).
    "hands-laced": hands_laced(),
    // A counting bubble: a number in a circle (the number is set by the count track).
    "counter": g('<circle r="7" fill="#fff"/><text data-count y="2.6" text-anchor="middle" font-size="7.5" font-weight="800" fill="#3d2c22" stroke="none"></text>'),
    // A towel (origin: where it hangs).
    "towel": g('<path d="M-6 0h12v20c0 1-1 2-2 2H-4c-1 0-2-1-2-2z" fill="#f59e0b"/><path d="M-6 15h12M-6 17.4h12" fill="none" stroke="#fff" stroke-width=".8"/>')
  };

  /* A person seen from the side, facing right, standing on the origin (a child is about 26 units tall; scale
     with s for a grown-up). Pieces for walking (the walk track swings them): legF, legB and armF, armB turn at
     the hip and the shoulder; body bobs. look: { skin, top, bottom (trousers; "dress" makes the top a long
     dress), shoes, hair: "short" | "long" | "scarf" | "none", hairColor, scarf (its colour), cane: true }. */
  /* Headscarves. Women and girls are drawn with a headscarf only some of the time, by chance, and more often
     without: about 1 in 7 girls, 3 in 10 women and 4 in 10 grandmothers. The chance is fixed for each character
     (key: her name or part id and her clothes), so the same mother looks the same in every scene and on every
     replay. A headscarf is never tied to who a character is (kind or unkind, good or naughty). Every drawing of a
     woman or girl, in every js/art/rig-*.js, decides this with B.headscarf(key, kind) instead of choosing. */
  var SCARF_CHANCE = { girl: 0.15, woman: 0.3, grandma: 0.4 };
  B.headscarf = function (key, kind) {
    var h = 2166136261, str = String(key);
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 1000) / 1000 < (SCARF_CHANCE[kind] || 0);
  };
  var SCARVES = ["#7b5ea7", "#3fb0a8", "#e46b8a", "#e7c27a", "#5b9bd5", "#c4673a"];

  /* hair: "auto" (with kind: girl | woman | grandma, and key) lets B.headscarf choose: a headscarf, or long hair
     (grey for a grandmother). */
  B.RIG.walker = function (k) {
    k = Object.assign({}, k || {});
    if (k.hair === "auto") {
      var key = k.key || [k.kind, k.top, k.bottom].join("|");
      if (B.headscarf(key, k.kind)) {
        k.hair = "scarf";
        if (!k.scarf) k.scarf = SCARVES[(key.length * 7) % SCARVES.length];
      } else {
        k.hair = "long";
        if (k.kind === "grandma" && !k.hairColor) k.hairColor = "#d9d4cc";
      }
    }
    var skin = k.skin || SKIN, top = k.top || "#5b9bd5", bottom = k.bottom || "#3f6f8f", shoes = k.shoes || "#3d2c22";
    var hairC = k.hairColor || "#3d2c22", dress = k.bottom === "dress";
    var leg = function (name) {
      return '<g data-part="' + name + '" data-pivot="0 -8"><rect x="-1.3" y="-8.4" width="2.6" height="8" rx="1.2" fill="' + (dress ? skin : bottom) + '"/>' +
        '<path d="M-1.6-.8h3.6c.9 0 1.4.5 1.4 1.1H-1.6z" fill="' + shoes + '"/></g>';
    };
    var arm = function (name, front) {
      return '<g data-part="' + name + '" data-pivot="0 -14.6"><rect x="-1.1" y="-15" width="2.2" height="7.6" rx="1.1" fill="' + top + '"/>' +
        '<circle cx="0" cy="-7" r="1.25" fill="' + skin + '"/>' +
        (front && k.cane ? '<path d="M.3-7.4L1.8 0" fill="none" stroke="#8a5a36" stroke-width="1"/><path d="M.3-7.4c-.2-1 .6-1.6 1.4-1.2" fill="none" stroke="#8a5a36" stroke-width="1"/>' : "") + "</g>";
    };
    var hair = {
      short: '<path d="M-3.4-21.2c-.2-3.4 2.8-4.8 5.4-4.2 1.8.4 3 1.6 3 3.2-2.2-.6-4.2-.2-5.4 1-.8 1.4-1.6 1.6-3 0z" fill="' + hairC + '"/>',
      long: '<path d="M-3.6-20.6c-.4-3.6 2.6-5.2 5.4-4.6 1.8.4 3 1.6 3 3.2-2.2-.6-4.2-.2-5.4 1 .2 2.4-.4 5-1.6 6.6-1.2-.8-1.6-3.4-1.4-6.2z" fill="' + hairC + '"/>',
      scarf: '<path d="M-4.4-18.6c-.8-4.6 1.8-7 5-6.8 3 .2 5 2.4 4.6 5.4l-1.1.2c-.3-2.2-1.8-3.4-3.6-3.4-2.2 0-3.2 1.8-3 4.2l1.6 4.4h-4.6z" fill="' + (k.scarf || "#7b5ea7") + '"/>',
      none: ""
    }[k.hair || "short"];
    var torso = dress
      ? '<path d="M-3.6-16.4h7.2l2 12.4H-5.6z" fill="' + top + '"/>'
      : '<rect x="-3.6" y="-16.4" width="7.2" height="9.4" rx="2.6" fill="' + top + '"/>';
    return g(arm("armB") + leg("legB") +
      '<g data-part="body">' + torso +
      '<circle cx=".6" cy="-20.2" r="4" fill="' + skin + '"/>' + hair +
      '<g stroke="none" fill="#3d2c22"><ellipse cx="2.7" cy="-20.8" rx=".5" ry=".7"/></g>' +
      '<path d="M2.2-18.6q.9.6 1.8 0" fill="none" stroke-width=".4"/><circle cx="2" cy="-19.2" r=".8" fill="#f28b82" stroke="none" opacity=".5"/></g>' +
      leg("legF") + arm("armF", true));
  };

  function hand() {
    var f = function (x, h) { return '<rect x="' + x + '" y="' + (-13 - h) + '" width="3.3" height="' + (h + 3) + '" rx="1.65" fill="' + SKIN + '"/>'; };
    return g('<rect x="-8" y="-1" width="16" height="5" rx="1.5" fill="#5b9bd5"/>' +
      '<path d="M-7 0c-.6-4-.8-9-.4-13.6h14.8c.4 4.6.2 9.6-.4 13.6z" fill="' + SKIN + '"/>' +
      f(-7.2, 7.4) + f(-3.6, 9) + f(0, 8.6) + f(3.6, 6.6) +
      '<rect x="-1.6" y="-7.8" width="3.3" height="8.4" rx="1.65" fill="' + SKIN + '" transform="translate(-7.2 -3) rotate(-38)"/>' +
      '<path d="M-3.2-6c1.6 1 4.8 1 6.4 0" fill="none" stroke-width=".4" opacity=".6"/>' +
      // the back of the hand: nails on the fingertips (hidden until a track shows the piece "nails")
      '<g data-part="nails" style="opacity:0" fill="#fbe3e8" stroke-width=".35">' + [[-7.2, 7.4], [-3.6, 9], [0, 8.6], [3.6, 6.6]].map(function (n) {
        return '<rect x="' + (n[0] + .6) + '" y="' + (-12.6 - n[1]) + '" width="2.1" height="2.6" rx=".9"/>'; }).join("") + "</g>");
  }
  /* Both hands, fingers laced: the left hand's fingers lean right, the right hand's lean left, and they cross,
     in front of and behind each other in turn, so the gaps between the fingers are where they rub. */
  function hands_laced() {
    var DARK = "#e2a77c";
    var finger = function (x, rot, fill) {
      return '<rect x="-1.6" y="-11" width="3.2" height="12" rx="1.6" fill="' + fill + '" transform="translate(' + x + ' -12) rotate(' + rot + ')"/>';
    };
    var lf = [-8.4, -4.8, -1.2, 2.4], rf = [-2.4, 1.2, 4.8, 8.4];
    return g('<rect x="-15" y="-1" width="11" height="5" rx="1.5" fill="#5b9bd5"/><rect x="4" y="-1" width="11" height="5" rx="1.5" fill="#5b9bd5"/>' +
      // the palms, pressed together, a little apart at the bottom
      '<path d="M-14 0c-1-4-1-9 1-12.6h11c.6 4 .4 8.6-1.4 12.6z" fill="' + DARK + '"/>' +
      '<path d="M14 0c1-4 1-9-1-12.6H2c-.6 4-.4 8.6 1.4 12.6z" fill="' + SKIN + '"/>' +
      // fingers behind (every other one of each hand), then the palms' top edge, then the fingers in front
      finger(lf[0], 28, DARK) + finger(rf[1], -28, SKIN) + finger(lf[2], 28, DARK) + finger(rf[3], -28, SKIN) +
      finger(rf[0], -28, SKIN) + finger(lf[1], 28, DARK) + finger(rf[2], -28, SKIN) + finger(lf[3], 28, DARK) +
      // thumbs, resting on top
      '<rect x="-1.6" y="-8" width="3.2" height="8.6" rx="1.6" fill="' + DARK + '" transform="translate(-6 -6) rotate(50)"/>' +
      '<rect x="-1.6" y="-8" width="3.2" height="8.6" rx="1.6" fill="' + SKIN + '" transform="translate(6 -6) rotate(-50)"/>');
  }
})();
