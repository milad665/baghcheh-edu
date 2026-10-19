/* باغچه — drawings for the thinking lessons' animated scenes (js/lessons/thinking.js, step type `scene`): a seed
   that is planted, watered and grows into a flower; the robot's program (forward blocks and the repeat block) on a
   row of cells; number cards that are sorted by swapping neighbours. Same rules and style as js/art/rig.js: each
   drawing has its origin where its comment says, a dark outline, flat warm colours. */
var B = window.B || {};
window.B = B;
B.RIG = B.RIG || {};

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  var FONT = ' font-family="inherit" font-weight="800" text-anchor="middle" stroke="none" fill="#3d2c22"';

  /* ---------- a seed becomes a flower (think-seed-3) ---------- */
  Object.assign(B.RIG, {
    // The garden bed: soil from y = 64 down, a strip of grass on top, a hole dug in the middle at x = 80
    // (stage units at their own place).
    "garden-bed": g('<rect x="0" y="64" width="160" height="26" fill="#a0673a"/>' +
      '<g fill="#8a5530" stroke="none"><circle cx="20" cy="74" r="1.2"/><circle cx="46" cy="82" r="1"/><circle cx="118" cy="76" r="1.2"/><circle cx="140" cy="84" r="1"/><circle cx="64" cy="86" r=".9"/><circle cx="100" cy="85" r="1"/></g>' +
      '<path d="M0 64h62M98 64h62" fill="none" stroke="#5a9a45" stroke-width="2"/>' +
      '<ellipse cx="80" cy="66" rx="9" ry="3" fill="#5a341c"/>'),
    // The sun, its rays a piece that turns (origin: its middle).
    "sun": g('<g data-part="rays" data-pivot="0 0" fill="none" stroke="#f59e0b" stroke-width="1.2">' +
      [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<path d="M0-9.5v-3.5" transform="rotate(' + a + ')"/>'; }).join("") + "</g>" +
      '<circle r="7" fill="#fcd34d"/>'),
    // A hand coming down from above, fingers pinched (origin: between the fingertips, where it holds the seed).
    "pinch-hand": g('<rect x="-5" y="-30" width="10" height="12" rx="1.5" fill="#5b9bd5"/>' +
      '<path d="M-5.4-19c-.6 6 0 12 2.6 16.4h5.6c2.6-4.4 3.2-10.4 2.6-16.4z" fill="var(--skin,#f3c39b)"/>' +
      '<rect x="-3.2" y="-6" width="2.8" height="6.4" rx="1.4" fill="var(--skin,#f3c39b)" transform="rotate(14 -1.8 -3)"/>' +
      '<rect x=".4" y="-6" width="2.8" height="6.4" rx="1.4" fill="var(--skin,#f3c39b)" transform="rotate(-14 1.8 -3)"/>'),
    // A seed (origin: its middle).
    "seed": g('<ellipse rx="2.2" ry="1.5" fill="#c08552" transform="rotate(-20)"/><path d="M-1-.4c.6-.5 1.4-.6 2-.4" fill="none" stroke="#c48a5a" stroke-width=".4"/>'),
    // The soil put back over the seed: a small heap (origin: the middle of its bottom).
    "soil-heap": g('<path d="M-10 0c2-3.6 6-5 10-5s8 1.4 10 5z" fill="#8a5530"/>'),
    // Wet soil, darker (origin: its middle).
    "wet-soil": '<ellipse rx="14" ry="3.4" fill="#6b4024" opacity=".7"/>',
    // A watering can from the side, its spout to the left (origin: the middle of the can; the spout's tip is at
    // −16, −6, so tilted by −35° the water comes out at about −16.5, +4.3).
    "watering-can": g('<path d="M-6-4L-16-7.4" fill="none" stroke="#3f8f8a" stroke-width="2.4"/>' +
      '<rect x="-17.4" y="-9.2" width="3" height="3.6" rx=".8" fill="#3f8f8a" transform="rotate(-20 -16 -7.4)"/>' +
      '<rect x="-7" y="-8" width="14" height="13" rx="2" fill="#4fb3a9"/>' +
      '<path d="M7-5c5-1 6 6 0 7" fill="none" stroke="#3f8f8a" stroke-width="1.6"/>' +
      '<path d="M-4-11h8" fill="none" stroke="#3f8f8a" stroke-width="1.6"/><path d="M-5-8l1-3M5-8l-1-3" fill="none" stroke="#3f8f8a" stroke-width="1.2"/>'),
    // The flower's stem, 40 tall (origin: its foot in the soil); a scene grows it by its sy.
    "stem": g('<path d="M0 0V-40" fill="none" stroke="#4f8f3a" stroke-width="1.8"/>'),
    // Two young leaves (origin: where they join the stem).
    "leaves": g('<path d="M0 0C-3-5-9-6-12-4-9 0-4 1 0 0z" fill="#7cc457"/><path d="M0 0C3-5 9-6 12-4 9 0 4 1 0 0z" fill="#7cc457"/>' +
      '<path d="M0 0c-3-2-6-3-9-3.4M0 0c3-2 6-3 9-3.4" fill="none" stroke-width=".4"/>'),
    // The flower head: yellow petals around a brown middle (origin: its middle).
    "flower-head": g('<g fill="#fcc419">' + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(function (a) {
      return '<ellipse cx="0" cy="-6.4" rx="2.2" ry="4" transform="rotate(' + a + ')"/>'; }).join("") + "</g>" +
      '<circle r="4.4" fill="#7a4a2a"/><g fill="#a8703e" stroke="none"><circle cx="-1.4" cy="-1.2" r=".7"/><circle cx="1.4" cy="-1.2" r=".7"/><circle cx="0" cy="1.4" r=".7"/></g>')
  });

  /* ---------- the robot's program (think-sapling-3) ---------- */
  // Colours of the coding game's blocks (css/style.css, .code-game): forward is blue, repeat is purple.
  var MOVE = "#3d7ab8", LOOP = "#8a63c7";
  function feet() {
    // Two footprints, like the 👣 on the game's forward block (in the block's own units).
    var foot = function (x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="1.5" ry="2.4" fill="#3d2c22" stroke="none"/><circle cx="' + x + '" cy="' + (y - 3.4) + '" r=".7" fill="#3d2c22" stroke="none"/>'; };
    return foot(-2.4, 2.4) + foot(2.4, -.6);
  }
  function repeat(d) {
    return g('<rect x="' + (d > 0 ? -11 : -31) + '" y="-11" width="42" height="22" rx="4" fill="#ece5f7" stroke="' + LOOP + '" stroke-width="1.2"/>' +
      '<rect x="-9.4" y="-9.4" width="18.8" height="18.8" rx="3" fill="#fff" stroke="' + LOOP + '" stroke-width=".5" stroke-dasharray="1.2 1"/>' +
      '<g transform="scale(' + d + ' 1)"><path d="M15-4a5 5 0 1 1-1.6 6.4" fill="none" stroke="' + LOOP + '" stroke-width="1.3"/><path d="M12 1.2l1.4 2.4 2.4-1.2" fill="none" stroke="' + LOOP + '" stroke-width="1.1"/></g>' +
      '<text x="' + 25.6 * d + '" y="4.4" font-size="11"' + FONT + '>' + B.fa(4) + '</text>');
  }
  Object.assign(B.RIG, {
    // The program board at the top of the stage, like the game's program strip: white, with a dashed edge
    // (stage units at their own place: x 12 to 148, y 4 to 32).
    "code-board": '<rect x="12" y="4" width="136" height="28" rx="3" fill="#fff" stroke="#c9b8a0" stroke-width=".7" stroke-dasharray="2 1.4"/>',
    // A row of five cells for the robot to walk on, centres at x = 40, 60, 80, 100, 120 (stage units: y 52 to 72).
    "cell-row": g([30, 50, 70, 90, 110].map(function (x) {
      return '<rect x="' + x + '" y="52" width="20" height="20" fill="#f3e6cf"/>'; }).join("") +
      '<rect x="30" y="52" width="100" height="20" fill="none" stroke-width=".8"/>', ""),
    // The «جلو» (forward) block: 16 × 16 (origin: its middle).
    "block-fwd": g('<rect x="-8" y="-8" width="16" height="16" rx="3" fill="#dbe7f3" stroke="' + MOVE + '" stroke-width="1.2"/>' + feet()),
    /* The repeat block around one forward block, like the game's: a purple frame with the loop arrow and the
       number of times before the block (origin: the middle of the block inside, which is a separate part).
       "block-repeat" reads right to left, as in the Persian game; "block-repeat-ltr" left to right, for English. */
    "block-repeat": function () { return repeat(1); },
    "block-repeat-ltr": function () { return repeat(-1); },
    // An orange ring round the block that is running now, like the game's (origin: its middle).
    "block-now": '<rect x="-10" y="-10" width="20" height="20" rx="4" fill="none" stroke="#fff" stroke-width="2.6"/>' +
      '<rect x="-10" y="-10" width="20" height="20" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>'
  });

  /* ---------- sorting by swapping neighbours (think-sapling-4) ---------- */
  // A number card, 18 × 24 (origin: its middle). Its piece "ok" turns it green once it is in its place.
  function card(n) {
    return g('<rect x="-9" y="-12" width="18" height="24" rx="2.4" fill="#fff8e7"/>' +
      '<rect data-part="ok" style="opacity:0" x="-9" y="-12" width="18" height="24" rx="2.4" fill="#cdeab8"/>' +
      '<text y="5" font-size="15"' + FONT + '>' + B.fa(n) + '</text>');
  }
  Object.assign(B.RIG, {
    // Functions, so the digits follow the language at the time the scene is drawn (English mode: 2, 3, 5, 8).
    "card-2": function () { return card(2); }, "card-3": function () { return card(3); },
    "card-5": function () { return card(5); }, "card-8": function () { return card(8); },
    // An orange frame round the two cards being compared, 50 × 32 (origin: its middle).
    "pair-frame": '<rect x="-24" y="-16" width="48" height="32" rx="4" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<rect x="-24" y="-16" width="48" height="32" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.6"/>',
    // A green tick in a circle: "these two are in the right order" (origin: its middle).
    "tick": g('<circle r="5" fill="#5a9a45"/><path d="M-2.4 0l1.6 1.8 3.2-3.6" fill="none" stroke="#fff" stroke-width="1.2"/>'),
    // Two curved arrows, one over and one under: "swap" (origin: its middle).
    "swap-arrows": g('<path d="M-7-1c2-4 12-4 14 0M7 1c-2 4-12 4-14 0" fill="none" stroke="#e5483f" stroke-width="1.1"/>' +
      '<path d="M5.4-2.6L7-1 8.4-3M-5.4 2.6L-7 1-8.4 3" fill="none" stroke="#e5483f" stroke-width="1.1"/>')
  });
})();
