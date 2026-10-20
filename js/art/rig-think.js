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

/* ---------- the Seed lessons (think-seed-5 to think-seed-14) ----------
   Scene drawings are named "tk-…". Picture cards (B.ART, 100 × 100, the style of js/art.js) for shadows, puzzles
   and devices are at the end. */
(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function hide(name, inner) { return '<g data-part="' + name + '" style="opacity:0">' + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  // An emoji's drawing from js/art inside a scene drawing: size units wide, centred on (x, y).
  function pic(e, x, y, size) {
    var src = B.ART && B.ART[String(e).replace(/\uFE0F/g, "")];
    return src ? '<g transform="translate(' + f(x - size / 2) + " " + f(y - size / 2) + ") scale(" + f(size / 100) + ')" stroke="#3d2c22" stroke-width="3">' + src + "</g>" : "";
  }

  Object.assign(B.RIG, {
    /* A backdrop from js/art/scenes.js as a part (look: { place: "room" | "snow" | … }), stage units at its place. */
    "tk-bg": function (look) { return '<g stroke-linejoin="round" stroke-linecap="round">' + ((B.SCENES || {})[look.place || "room"] || "") + "</g>"; },

    /* ---------- clap and stamp (think-seed-5) ---------- */
    // A card for one picture of a pattern, 25 × 24 (origin: where the picture on it stands, near its bottom).
    "tk-card": g('<rect x="-12.5" y="-21.5" width="25" height="24" rx="3" fill="#fffaf0"/>'),
    // A red question mark, the size of a picture on a card (origin: its bottom middle).
    "tk-qmark": g('<path d="M-3.6-14.4c0-2.8 1.8-4.4 3.8-4.4s3.8 1.4 3.8 3.6c0 3-3.8 3.2-3.8 6.4" fill="none" stroke="#e5483f" stroke-width="2.2"/><circle cx=".2" cy="-3.6" r="1.4" fill="#e5483f" stroke="none"/>'),
    // A green bracket under two cards: "this part repeats" (origin: the middle of its top edge; 48 wide).
    "tk-bracket": '<path d="M-24 0v3h48V0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><path d="M-24 0v3h48V0" fill="none" stroke="#5a9a45" stroke-width="1.4" stroke-linejoin="round"/>',
    // Little lines around a foot that stamps (origin: the floor under the foot).
    "tk-thud": g('<path d="M-7-1l-3-1.6M-7.4-4l-3.2-.4M7-1l3-1.6M7.4-4l3.2-.4" fill="none" stroke-width=".8"/>'),

    /* ---------- the snowman (think-seed-8) ---------- */
    // A grey winter sky, and a blue one that fades in over it when the sun comes out (stage units at their place).
    "tk-sky": '<rect width="160" height="90" fill="#d5dde6"/>',
    "tk-sky-blue": '<rect width="160" height="90" fill="#bfe3f5"/>',
    // Far hills and the ground, green (stage units at their place; the ground starts at about y = 58).
    "tk-hills": g('<path d="M0 54c22-12 44-14 64-7s40 3 58-6 30-4 38 2v47H0z" fill="#a9d68b" stroke-width=".5"/>' +
      '<path d="M0 60c30-4 60-4 90 0s50 2 70-2v32H0z" fill="#8cc66b" stroke="none"/>'),
    // Snow lying on the hills and the ground, the same shapes in white (stage units at their place).
    "tk-snow-cover": g('<path d="M0 54c22-12 44-14 64-7s40 3 58-6 30-4 38 2v47H0z" fill="#fff" stroke-width=".5"/>' +
      '<path d="M0 62c30-3 60-3 90 0s50 2 70-2" fill="none" stroke="#c9d7e3" stroke-width=".6"/>'),
    // Falling snow: flakes over two stage heights (y −90 to 90), so moving it down by 90 lets it snow over the stage.
    "tk-flakes": (function () {
      var out = "", x, y;
      for (var i = 0; i < 80; i++) {
        // spread evenly (the R2 sequence), so the flakes make no lines
        x = f((i * 0.7548777 % 1) * 160); y = f(-90 + (i * 0.5698403 % 1) * 180);
        out += '<circle cx="' + x + '" cy="' + y + '" r="' + (i % 3 ? 1.5 : 2.1) + '"/>';
      }
      return '<g fill="#fff" stroke="#9fb3c4" stroke-width=".3">' + out + "</g>";
    })(),
    // A snowball, radius 10 (origin: its middle, so it can roll); the lines on it show it turning.
    "tk-snowball": g('<circle r="10" fill="#fff"/><path d="M-6-3c2-3 6-4 9-2M2 5c2 0 4-1 5-3M-5 4l1 1" fill="none" stroke="#b9cad8" stroke-width=".7"/>'),
    // The snowman's face on its head (a snowball scaled 0.6; origin: the head's middle): coal eyes and mouth,
    // and a carrot nose pointing right.
    "tk-snowface": g('<g fill="#3d2c22" stroke="none"><circle cx="-3.2" cy="-2.6" r="1.2"/><circle cx="3.2" cy="-2.6" r="1.2"/>' +
      '<circle cx="-3.4" cy="4" r=".7"/><circle cx="-1.2" cy="5" r=".7"/><circle cx="1.2" cy="5" r=".7"/><circle cx="3.4" cy="4" r=".7"/></g>' +
      '<path d="M0-.8l7 1.6-7 1.6z" fill="#f08a2c"/>'),
    // A red scarf round the snowman's neck (origin: the middle of the neck).
    "tk-scarf": g('<path d="M-8-1.6c5 1.6 11 1.6 16 0v3.2c-5 1.6-11 1.6-16 0z" fill="#e5483f"/><path d="M4 1.6l1 7h3.4l-1.4-7.4z" fill="#e5483f"/>'),
    // The water left when the snowman melts (origin: its middle).
    "tk-puddle": g('<ellipse rx="18" ry="3.6" fill="#9fd3f0"/><path d="M-10-1c3-1 7-1 9 0" fill="none" stroke="#fff" stroke-width=".7"/>'),

    /* ---------- the robot game (think-seed-9) ---------- */
    // A row of five floor tiles from the side, centres x = 40, 60, 80, 100, 120, standing at y = 86 (stage units).
    "tk-tiles": g([40, 60, 80, 100, 120].map(function (x, i) {
      return '<path d="M' + (x - 11) + ' 88l3-6h20l-3 6z" fill="' + (i % 2 ? "#f3e6cf" : "#e9d3ad") + '"/>'; }).join("")),
    // A robot's headband with an antenna and a light (origin: the top of the head). The light is a piece.
    "tk-antenna": g('<path d="M-4.4 1.2c1.4-1.6 7.4-1.6 9.2 0" fill="none" stroke="#9aa5b1" stroke-width="1.4"/><path d="M.2 0v-5" fill="none" stroke="#9aa5b1" stroke-width=".9"/>' +
      '<circle cx=".2" cy="-6" r="1.5" fill="#cbd5e0"/><circle data-part="light" style="opacity:0" cx=".2" cy="-6" r="1.5" fill="#f87171"/>'),
    // A speech bubble with its tail at the bottom (origin: the tip of the tail); a picture goes in it at (0, −7).
    "tk-bubble": g('<path d="M0 0l-1.6-5H-9a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3H9a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H2.4z" fill="#fff"/>'),
    // A 3 × 3 mat seen from above: cells 18 wide, from x 53 to 107 and y 6 to 60 (stage units at its place),
    // so cell (c, r) has its middle at (62 + 18c, 15 + 18r).
    "tk-grid3": g([0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) {
      return '<rect x="' + (53 + 18 * c) + '" y="' + (6 + 18 * r) + '" width="18" height="18" fill="' + ((r + c) % 2 ? "#f3e6cf" : "#e9d3ad") + '"/>'; }).join(""); }).join("") +
      '<rect x="53" y="6" width="54" height="54" fill="none" stroke-width=".8"/>'),

    /* ---------- devices at home (think-seed-13) ---------- */
    // A wall and a floor four stages wide, for the camera to pan along (stage units at their place, x 0 to 640).
    "tk-wall": g('<rect width="640" height="62" fill="#f6e3c6" stroke="none"/><rect y="62" width="640" height="28" fill="#d9a86c" stroke="none"/>' +
      '<path d="M0 62h640" fill="none"/><path d="M0 72h640M0 82h640" fill="none" stroke="#c08f55" stroke-width=".5"/>'),
    // A low table, 64 wide, its top at y = −20 (origin: the middle of its bottom).
    "tk-table": g('<rect x="-32" y="-21" width="64" height="4" rx="1" fill="#b57638"/><rect x="-29" y="-17" width="3" height="17" fill="#a0683f"/><rect x="26" y="-17" width="3" height="17" fill="#a0683f"/>'),
    /* A mobile phone standing up, 22 × 40 (origin: the middle of its bottom). Its screen is dark; the pieces "call"
       (grandma on the screen and a green call button), "photo" (the flower it has just photographed) and "flash"
       are hidden until a track shows them. */
    "tk-phone": function () {
      return g('<rect x="-11" y="-40" width="22" height="40" rx="4" fill="#3a3f4b"/><rect x="-9" y="-36" width="18" height="30" rx="1" fill="#2d3748"/>' +
        '<circle cy="-3" r="1.3" fill="#4a5568"/>' +
        hide("call", '<rect x="-9" y="-36" width="18" height="30" rx="1" fill="#dff1f7"/>' + pic("👵", 0, -24, 15) +
          '<circle cx="0" cy="-10.6" r="2.6" fill="#5a9a45"/><path d="M-1.2-11.4c.4 1.4 1.2 2 2.4 2.4" fill="none" stroke="#fff" stroke-width=".7"/>') +
        hide("photo", '<rect x="-9" y="-36" width="18" height="30" rx="1" fill="#cdeaf7"/><rect x="-9" y="-16" width="18" height="10" fill="#8cc66b" stroke="none"/>' + pic("🌻", 0, -21, 18)) +
        hide("flash", '<rect x="-9" y="-36" width="18" height="30" rx="1" fill="#fff" stroke="none"/>'));
    },
    /* A tablet on a stand, 52 × 36 (origin: the middle of its bottom). Pieces: "sheet" (a white drawing page),
       "lines" (a flower in lines, hidden: show it and draw it with a draw track) and "paint" (its colours, hidden). */
    "tk-tablet": g('<path d="M-6 0l4-6h4l4 6z" fill="#9aa5b1"/><rect x="-26" y="-40" width="52" height="36" rx="4" fill="#3a3f4b"/>' +
      '<rect data-part="sheet" x="-23" y="-37" width="46" height="30" rx="1" fill="#fff"/>' +
      hide("paint", '<circle cx="0" cy="-27" r="3" fill="#fcc419" stroke="none"/><g fill="#f28b82" stroke="none"><circle cx="0" cy="-32.4" r="2.4"/><circle cx="5.2" cy="-27" r="2.4"/><circle cx="0" cy="-21.6" r="2.4"/><circle cx="-5.2" cy="-27" r="2.4"/></g>' +
        '<path d="M-1.6-14c-3-2-5-2-6.4-.4 2 1.6 4 1.6 6.4.4z" fill="#7cc457" stroke="none"/>') +
      '<g data-part="lines" style="opacity:0" fill="none" stroke="#3d2c22" stroke-width=".7"><path d="M0-19v-7"/><circle cx="0" cy="-27" r="3"/><circle cx="0" cy="-32.4" r="2.4"/><circle cx="5.2" cy="-27" r="2.4"/>' +
        '<circle cx="0" cy="-21.6" r="2.4"/><circle cx="-5.2" cy="-27" r="2.4"/><path d="M0-10v-9M-1.6-14c-3-2-5-2-6.4-.4 2 1.6 4 1.6 6.4.4"/></g>'),
    /* A computer screen on its foot, 48 × 34 (origin: the middle of the foot's bottom). Pieces: "on" (the lit screen,
       hidden), "t1" … "t3" (lines of writing, hidden), "cursor" (the arrow, hidden, moved by tracks). */
    "tk-monitor": g('<path d="M-5 0l2-7h6l2 7z" fill="#9aa5b1"/><rect x="-24" y="-38" width="48" height="31" rx="2.5" fill="#4a5568"/>' +
      '<rect x="-21" y="-35" width="42" height="25" rx="1" fill="#2d3748"/>' +
      hide("on", '<rect x="-21" y="-35" width="42" height="25" rx="1" fill="#e9f5fb"/><rect x="-21" y="-35" width="42" height="4" fill="#5b9bd5" stroke="none"/>') +
      hide("t1", '<path d="M-16-26h20" fill="none" stroke="#3d2c22" stroke-width="1.6"/>') +
      hide("t2", '<path d="M-16-21h26" fill="none" stroke="#3d2c22" stroke-width="1.6"/>') +
      hide("t3", '<path d="M-16-16h14" fill="none" stroke="#3d2c22" stroke-width="1.6"/>') +
      '<g data-part="cursor" style="opacity:0"><path d="M8-24v7l1.8-1.6 1.4 3 1.2-.6-1.4-2.8h2.4z" fill="#fff" stroke-width=".5"/></g>'),
    // A keyboard lying on the table, seen from the front, 40 wide (origin: the middle of its bottom). Four keys are
    // pieces ("k1" … "k4") that can be pressed down.
    "tk-keyboard": g('<path d="M-20 0l2-6h36l2 6z" fill="#cbd5e0"/>' +
      '<g fill="#fff" stroke-width=".4"><path d="M-16.6-4.6h33.2M-17.4-2h34.8" fill="none" stroke="#9aa5b1" stroke-dasharray="2.4 .9"/></g>' +
      [-12, -4, 4, 12].map(function (x, i) { return '<rect data-part="k' + (i + 1) + '" x="' + (x - 2) + '" y="-5.6" width="4" height="2.4" rx=".5" fill="#fff" stroke-width=".4"/>'; }).join("")),
    // A mouse on the table, seen from the front (origin: the middle of its bottom); its cable goes up to the left.
    "tk-mouse": g('<path d="M0-4.6c-1-3-3-4-6-4" fill="none" stroke="#4a5568" stroke-width=".8"/><path d="M-4 0c0-3 1.8-4.6 4-4.6s4 1.6 4 4.6z" fill="#e2e8f0"/><path d="M0-4.6v2" fill="none" stroke-width=".4"/>'),
    /* A television on a low cabinet, 56 × 38 (origin: the middle of the cabinet's bottom). Its screen shows the sea;
       "fish" is a piece that swims across it (keep it between x −16 and 16). */
    "tk-tv": g('<rect x="-30" y="-12" width="60" height="12" rx="1.5" fill="#b57638"/><path d="M-12-6h24" fill="none" stroke-width=".5"/>' +
      '<rect x="-28" y="-49" width="56" height="35" rx="2.5" fill="#2d3748"/><rect x="-25" y="-46" width="50" height="29" fill="#5fb0d8"/>' +
      '<path d="M-25-20c6-2 10 0 16-1s12 1 18 0 10-1 16 0v4h-50z" fill="#f1dfb0" stroke="none"/>' +
      '<path d="M-18-40c2-1.4 4 1.4 6 0M6-36c2-1.4 4 1.4 6 0" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<path d="M-14-20v-6M-14-24c2-1 2-3 0-4M14-20v-5" fill="none" stroke="#2f8a57" stroke-width=".9"/>' +
      '<g data-part="fish"><path d="M-3-31c2-3 6-3 8 0-2 3-6 3-8 0zM-3-31l-3-2.4v4.8z" fill="#f59e0b" stroke-width=".4"/><circle cx="2.6" cy="-31.4" r=".5" fill="#3d2c22" stroke="none"/></g>'),

    /* ---------- with grown-ups (think-seed-14) ---------- */
    /* A tablet held in two hands in front of the chest, 22 × 16 (origin: its middle). Its screen pieces: "game" (a
       game with a ball that bounces: piece "ball"), "odd" (something strange popping up), "dark" (switched off). */
    "tk-pad": g('<rect x="-11" y="-8" width="22" height="16" rx="2" fill="#3a3f4b"/>' +
      '<g data-part="game"><rect x="-9.4" y="-6.4" width="18.8" height="12.8" fill="#cdeaf7"/><rect x="-9.4" y="2" width="18.8" height="4.4" fill="#8cc66b" stroke="none"/>' +
        '<circle data-part="ball" cx="-4" cy=".2" r="1.8" fill="#e5483f" stroke-width=".4"/><path d="M3 2v-4h3v4" fill="#f6b73c" stroke-width=".4"/></g>' +
      hide("odd", '<rect x="-9.4" y="-6.4" width="18.8" height="12.8" fill="#5b4a8a"/><path d="M-6-3l2.4 1.2L-1-4.4l1.4 3.4L3.6-3l-1 3.6 3.2 1.6-3.6.8.6 3.4L0 3.4-2.6 6l-.6-3.4L-6.6 2l2.6-2z" fill="#f4b6d6" stroke-width=".4"/>' +
        '<path d="M0-1.8v2.6" fill="none" stroke="#3d2c22" stroke-width="1"/><circle cx="0" cy="2.4" r=".5" fill="#3d2c22" stroke="none"/>') +
      hide("dark", '<rect x="-9.4" y="-6.4" width="18.8" height="12.8" fill="#1f2430"/>'))
  });

  /* ---------- the Sprout lessons (think-sprout-6 to think-sprout-19) ---------- */
  Object.assign(B.RIG, {
    // Tally marks (think-sprout-14): one stroke, 12 tall (origin: its foot), and the slanted fifth stroke that
    // crosses four (origin: its lower left end).
    "tk-stroke": '<path d="M0 0V-12" fill="none" stroke="#3d2c22" stroke-width="1.4" stroke-linecap="round"/>',
    "tk-slash": '<path d="M0 0L24-14" fill="none" stroke="#e5483f" stroke-width="1.4" stroke-linecap="round"/>',
    // A sheet of paper to draw tallies on (origin: its middle).
    "tk-sheet": g('<rect x="-30" y="-12" width="60" height="24" rx="2" fill="#fffaf0"/><path d="M-26-4h52M-26 6h52" fill="none" stroke="#d9e6f2" stroke-width=".5"/>'),

    /* Parts of a computer (think-sprout-15). "tk-pc": the computer itself, a box with a chip on it (origin: its
       middle). "tk-mic": a microphone on a stand, "tk-speaker": a loudspeaker (origin: the middle of the bottom).
       "tk-links": dashed wires from the three inputs (left) to the computer and from it to the two outputs
       (right), stage units at their place. "tk-dot": a little glowing dot that travels along a wire. */
    "tk-pc": g('<rect x="-16" y="-14" width="32" height="28" rx="4" fill="#cbd5e0"/><rect x="-8" y="-7" width="16" height="14" rx="2" fill="#4a5568"/>' +
      '<path d="M-5-7v-3M0-7v-3M5-7v-3M-5 7v3M0 7v3M5 7v3M-8-3h-3M-8 3h-3M8-3h3M8 3h3" fill="none" stroke="#4a5568" stroke-width="1"/>' +
      '<rect x="-4" y="-3" width="8" height="6" rx="1" fill="#9fd3f0" stroke="none"/><circle cx="11" cy="10" r="1.2" fill="#5a9a45" stroke="none"/>'),
    "tk-mic": g('<path d="M0 0v-8M-5 0h10" fill="none" stroke-width="1.2"/><path d="M-4.5-14a4.5 4.5 0 0 0 9 0" fill="none" stroke-width="1"/>' +
      '<rect x="-3" y="-22" width="6" height="11" rx="3" fill="#718096"/><path d="M-3-18h6M-3-15h6" fill="none" stroke="#a0aec0" stroke-width=".6"/>'),
    "tk-speaker": g('<rect x="-7" y="-20" width="14" height="20" rx="2" fill="#4a5568"/><circle cy="-6" r="4.4" fill="#2d3748"/><circle cy="-6" r="1.6" fill="#718096"/><circle cy="-15" r="2" fill="#2d3748"/>'),
    "tk-links": '<g fill="none" stroke="#9aa5b1" stroke-width=".9" stroke-dasharray="2 1.6" stroke-linecap="round">' +
      '<path d="M44 26L64 40M40 52H64M40 76L64 54M96 42L118 30M96 50L118 72"/></g>',
    "tk-dot": '<circle r="2.2" fill="#f59e0b" stroke="#fff" stroke-width=".8"/>',
    // A curly bracket with an arrow, to group the inputs or the outputs (origin: its middle; it stands up, 60 tall).
    "tk-group": '<path d="M0-30q-4 0-4 4v20q0 6-4 6 4 0 4 6v20q0 4 4 4" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M0-30q-4 0-4 4v20q0 6-4 6 4 0 4 6v20q0 4 4 4" fill="none" stroke="#5a9a45" stroke-width="1.3"/>',

    /* A big tablet on a stand, from the front, 64 × 44 (origin: the middle of the stand's bottom) (think-sprout-16).
       Screen pieces: "pic" (what it shows), "mute" (a speaker with a cross, hidden), "vol" (the volume bar, its
       fill scales with sx from the left; hidden), "dark" (switched off, hidden), "batt" (a battery, hidden) with
       "level" (its charge: scale sx from the left) and "low" (an empty red end). "volbtn" is the volume button on
       the side, "port" where the charger goes in (at x 32, y −24). */
    "tk-bigpad": g('<path d="M-8 0l5-8h6l5 8z" fill="#9aa5b1"/><rect x="-32" y="-52" width="64" height="44" rx="5" fill="#3a3f4b"/>' +
      '<rect data-part="volbtn" x="-35" y="-44" width="3" height="8" rx="1" fill="#718096"/><rect data-part="port" x="31" y="-27" width="2" height="6" fill="#2d3748"/>' +
      '<g data-part="pic"><rect x="-28" y="-48" width="56" height="36" fill="#cdeaf7"/><rect x="-28" y="-22" width="56" height="10" fill="#8cc66b" stroke="none"/>' +
        '<circle cx="14" cy="-38" r="4" fill="#fcd34d"/><path d="M-18-22c2-6 6-6 8 0" fill="#5a9a45"/></g>' +
      hide("mute", '<circle cx="0" cy="-30" r="9" fill="#fff"/><path d="M-5-33h3l4-3v12l-4-3h-3z" fill="#4a5568"/><path d="M3-33l4 6M7-33l-4 6" fill="none" stroke="#e5483f" stroke-width="1.4"/>') +
      hide("vol", '<rect x="-20" y="-18" width="40" height="4" rx="2" fill="#fff"/><rect data-part="volfill" data-pivot="-20 -16" x="-20" y="-18" width="40" height="4" rx="2" fill="#5b9bd5" stroke="none"/>') +
      hide("dark", '<rect x="-28" y="-48" width="56" height="36" fill="#1f2430"/>') +
      hide("batt", '<rect x="-12" y="-36" width="22" height="12" rx="2" fill="#fff"/><rect x="10" y="-32.5" width="2.4" height="5" rx=".8" fill="#fff"/>' +
        '<rect data-part="level" data-pivot="-10 -30" x="-10" y="-34" width="18" height="8" rx="1" fill="#5a9a45" stroke="none"/>' +
        '<rect data-part="low" x="-10" y="-34" width="3" height="8" rx="1" fill="#e5483f" stroke="none"/>')),
    // A charger: a plug on a cable coming in from the right (origin: the plug's tip).
    "tk-charger": g('<path d="M8 0c10 0 14 4 30 6" fill="none" stroke="#3d2c22" stroke-width="2.2"/><path d="M8 0c10 0 14 4 30 6" fill="none" stroke="#fff" stroke-width="1.2"/>' +
      '<rect x="0" y="-2.4" width="9" height="4.8" rx="1.2" fill="#e2e8f0"/>'),

    /* A door to a room of our things (think-sprout-17): stage units at their place, the doorway from x 60 to 100,
       y 30 to 86. Behind it, photos and a toy; "leaf" is the door itself, hinged on the left (it opens by
       shrinking sx), with the keyhole; "locked" is a red padlock on it (hidden). */
    "tk-doorway": g('<rect x="57" y="27" width="46" height="62" rx="2" fill="#a0683f"/><rect x="60" y="30" width="40" height="56" fill="#f6e3c6"/>' +
      '<rect x="64" y="36" width="14" height="11" fill="#fff"/><path d="M65 46l4-5 3 3 2-2 4 4z" fill="#8cc66b" stroke="none"/><circle cx="74" cy="39.5" r="1.4" fill="#fcd34d" stroke="none"/>' +
      '<rect x="82" y="38" width="12" height="9" fill="#fff"/><circle cx="88" cy="42" r="2.6" fill="#e46b8a"/>' +
      '<rect x="66" y="66" width="14" height="10" rx="2" fill="#5b9bd5"/><circle cx="70" cy="71" r="1.6" fill="#fff"/><circle cx="76" cy="71" r="1.6" fill="#fff"/>' +
      '<path d="M60 86h40" fill="none"/>'),
    "tk-leaf": g('<rect x="0" y="0" width="40" height="56" fill="#c98a4b"/><rect x="4" y="5" width="32" height="20" rx="2" fill="#b57638"/><rect x="4" y="30" width="32" height="21" rx="2" fill="#b57638"/>' +
      '<circle cx="33" cy="28" r="2.4" fill="#fcd34d"/><path d="M33 27.4v2.6" fill="none" stroke-width=".8"/>' +
      hide("locked", '<path d="M29.6 24v-3a3.4 3.4 0 0 1 6.8 0v3" fill="none" stroke="#e5483f" stroke-width="1.2"/><rect x="28.6" y="24" width="8.8" height="7" rx="1.2" fill="#e5483f"/>')),
    // A golden key (origin: the tip of its blade, pointing right).
    "tk-key": g('<circle cx="-12" cy="0" r="4" fill="#fcd34d"/><circle cx="-12" cy="0" r="1.4" fill="#f6e3c6"/><path d="M-8 0H0M-3 0v2.6M-1 0v2" fill="none" stroke="#e0a82e" stroke-width="2"/>'),

    /* Messages (think-sprout-18): speech bubbles that fly from phone to phone (origin: the middle). "tk-msg-heart"
       a kind message (a heart), "tk-msg-rose" a reply with a flower, "tk-msg-mean" an unkind one (an angry face). */
    "tk-msg-heart": g('<rect x="-10" y="-7" width="20" height="14" rx="4" fill="#fff"/><path d="M-4 7l-2 4 6-4" fill="#fff"/>' +
      '<path d="M0 4.4C-4-.4-4.6-2-4.6-3c0-1.4 1-2.4 2.4-2.4.8 0 1.6.6 2.2 1.4.6-.8 1.4-1.4 2.2-1.4 1.4 0 2.4 1 2.4 2.4 0 1-.6 2.6-4.6 7.4z" fill="#e5483f"/>'),
    "tk-msg-rose": g('<rect x="-10" y="-7" width="20" height="14" rx="4" fill="#fff"/><path d="M4 7l2 4-6-4" fill="#fff"/>' +
      '<path d="M0 5v-5" fill="none" stroke="#5a9a45" stroke-width="1"/><circle cx="0" cy="-1.6" r="2.8" fill="#e46b8a"/><path d="M0 3c-2-1-3-1-3.6 0" fill="none" stroke="#5a9a45" stroke-width=".8"/>'),
    "tk-msg-mean": g('<rect x="-10" y="-7" width="20" height="14" rx="4" fill="#5b4a8a"/><path d="M-4 7l-2 4 6-4" fill="#5b4a8a"/>' +
      '<circle cx="0" cy="0" r="5" fill="#f87171"/><path d="M-3-2.4l2 1M3-2.4l-2 1M-2 2.6c1-1 3-1 4 0" fill="none" stroke-width=".8"/>'),
    // A phone held in front of the chest, 12 × 20 (origin: its middle); "lit" is its screen when a message comes.
    "tk-phone-s": g('<rect x="-6" y="-10" width="12" height="20" rx="2" fill="#3a3f4b"/><rect x="-4.6" y="-8" width="9.2" height="15" fill="#2d3748"/>' +
      hide("lit", '<rect x="-4.6" y="-8" width="9.2" height="15" fill="#e9f5fb"/>')),
    // A wall between two homes (stage units at its place, at x 104).
    "tk-split": g('<rect x="102" y="0" width="5" height="90" fill="#c9a074"/>')
  });

  /* ---------- picture cards (B.ART) ----------
     Named the way Unicode joins emoji with ZWJ ("🐈‍⬛" is a black cat): "🐱‍⬛" is the cat's shadow, "🙂‍❓" a face
     with its mouth missing, "🏠‍❓" a house with its door missing, "🧩‍🔺" a board with a triangle-shaped hole.
     Lessons use them like any emoji; without this file they show as the emoji and a ⬛ or ❓. */
  if (!B.addArt || !B.ART) return;
  var cards = {};
  // A shadow: the animal's own drawing, every colour made the same dark grey.
  var SH = "#4a4458";
  ["🐱", "🐶", "🐰", "🐘", "🦒", "🐢", "🐔", "🐟", "🦆", "🐌", "🐄", "🐭", "🦋", "🐇", "🐦"].forEach(function (e) {
    if (B.ART[e]) cards[e + "‍⬛"] = '<g opacity=".95">' + B.ART[e].replace(/fill="(?!none)[^"]*"/g, 'fill="' + SH + '"').replace(/stroke="(?!none)[^"]*"/g, 'stroke="' + SH + '"') + "</g>";
  });
  // A face with ears, eyes and a nose, but no mouth.
  cards["🙂‍❓"] = '<circle cx="14" cy="52" r="9" fill="#f3c39b"/><circle cx="86" cy="52" r="9" fill="#f3c39b"/><circle cx="50" cy="52" r="38" fill="#f3c39b"/>' +
    '<path d="M14 44c0-24 16-32 36-32s36 8 36 32c-8-10-20-14-36-14s-28 4-36 14z" fill="#6b3f26"/>' +
    '<g class="eye" stroke="none" fill="#3d2c22"><ellipse cx="36" cy="50" rx="4.5" ry="6"/><ellipse cx="64" cy="50" rx="4.5" ry="6"/></g><g stroke="none" fill="#fff"><circle cx="38" cy="47.6" r="1.6"/><circle cx="66" cy="47.6" r="1.6"/></g>' +
    '<path d="M50 54c-2 5-3 8 0 9" fill="none" stroke-width="2.5"/><g stroke="none" fill="#f28b82" opacity=".5"><circle cx="28" cy="64" r="6"/><circle cx="72" cy="64" r="6"/></g>';
  // The house of js/art (🏠) with no door: a path leads up to a bare wall.
  cards["🏠‍❓"] = '<path d="M66 22h10v22H66z" fill="#c4704a"/><path d="M18 50h64v42H18z" fill="#f7e3c0"/><path d="M10 54L50 16l40 38z" fill="#e5483f"/>' +
    '<path d="M24 62h12v12H24zM64 62h12v12H64z" fill="#8fd0f2"/><path d="M30 62v12M24 68h12M70 62v12M64 68h12" stroke-width="2"/>' +
    '<path d="M44 92h12l2 6H42z" fill="#c9b8a0" stroke-width="2"/>';
  // A wooden board with a hole the shape of 🔺, 🔴, 🟥 or ⭐ (the same shapes as js/art draws, a little smaller).
  var HOLES = { "🔺": '<path d="M50 12l42 74H8z"/>', "🔴": '<circle cx="50" cy="50" r="40"/>', "🟥": '<rect x="12" y="12" width="76" height="76" rx="12"/>',
    "⭐": '<path d="M50 10L61.8 37.8 91.8 40.4 69 60.2 75.9 89.6 50 74 24.1 89.6 31 60.2 8.2 40.4 38.2 37.8z"/>' };
  Object.keys(HOLES).forEach(function (k) {
    cards["🧩‍" + k] = '<rect x="4" y="4" width="92" height="92" rx="10" fill="#e2b77f"/><path d="M14 20c20-3 52 3 72 0M14 82c22 3 50-3 72 0" fill="none" stroke="#c9975b" stroke-width="2"/>' +
      '<g transform="translate(50 52) scale(.66) translate(-50 -50)" fill="#6b4528" stroke-width="4">' + HOLES[k] + "</g>";
  });
  // Devices: a computer screen, a laptop, a television, a keyboard and a mouse.
  cards["🖥"] = '<rect x="8" y="10" width="84" height="58" rx="5" fill="#4a5568"/><rect x="14" y="16" width="72" height="46" rx="2" fill="#9fd3f0"/>' +
    '<path d="M14 54l20-16 14 12 12-8 26 18v2H14z" fill="#8cc66b" stroke="none"/><circle cx="70" cy="30" r="6" fill="#fcd34d" stroke="none"/>' +
    '<path d="M42 68h16l4 16H38z" fill="#9aa5b1"/><rect x="26" y="84" width="48" height="8" rx="3" fill="#718096"/>';
  cards["💻"] = '<rect x="16" y="12" width="68" height="50" rx="4" fill="#4a5568"/><rect x="22" y="18" width="56" height="38" rx="1.5" fill="#9fd3f0"/>' +
    '<path d="M22 50l14-12 10 8 10-6 22 14v2H22z" fill="#8cc66b" stroke="none"/><path d="M6 64h88l-6 18H12z" fill="#cbd5e0"/>' +
    '<path d="M18 70h64M16 76h68" fill="none" stroke="#9aa5b1" stroke-width="2.5" stroke-dasharray="5 3"/>';
  cards["📺"] = '<path d="M38 12l12 10 12-10" fill="none" stroke-width="3"/><rect x="6" y="22" width="88" height="60" rx="8" fill="#8a5a36"/>' +
    '<rect x="13" y="29" width="62" height="46" rx="5" fill="#5fb0d8"/><path d="M28 50c3-6 11-6 14 0-3 6-11 6-14 0zM28 50l-6-4v8z" fill="#f59e0b" stroke-width="2"/>' +
    '<circle cx="84" cy="40" r="4" fill="#fcd34d"/><circle cx="84" cy="54" r="4" fill="#fcd34d"/><path d="M20 82l-4 10M80 82l4 10" fill="none" stroke-width="4"/>';
  cards["⌨"] = '<rect x="4" y="30" width="92" height="42" rx="6" fill="#cbd5e0"/><g fill="#fff" stroke-width="2">' +
    [12, 24, 36, 48, 60, 72, 84].map(function (x) { return '<rect x="' + (x - 4) + '" y="37" width="8" height="8" rx="1.5"/><rect x="' + (x - 4) + '" y="48" width="8" height="8" rx="1.5"/>'; }).join("") +
    '<rect x="26" y="59" width="48" height="7" rx="1.5"/></g>';
  cards["🖱"] = '<path d="M52 18c0-10 10-14 22-14" fill="none" stroke="#4a5568" stroke-width="4"/>' +
    '<path d="M52 18c18 0 26 14 26 34v12c0 16-12 28-26 28S26 80 26 64V52c0-20 8-34 26-34z" fill="#e2e8f0"/><path d="M52 18v26M26 44h52" fill="none" stroke-width="2.5"/>' +
    '<path d="M36 30c3-4 6-6 10-6" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>';

  // An emoji's drawing inside a card, size units wide, centred on (x, y).
  function emb(e, x, y, size) {
    var src = B.ART[e.replace(/️/g, "")];
    return src ? '<g transform="translate(' + (x - size / 2) + " " + (y - size / 2) + ") scale(" + size / 100 + ')">' + src + "</g>" : "";
  }
  /* Where will the rabbit end? A 3 × 3 board seen from above, the rabbit on one square and three foods on others
     (think-sprout-11). Named "🐰‍" and the food that is the answer, so each board is its own picture. */
  function board(rabbit, foods) {
    var out = '<rect x="6" y="6" width="88" height="88" rx="4" fill="#e9d3ad"/>';
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
      out += '<rect x="' + (8 + 28 * c) + '" y="' + (8 + 28 * r) + '" width="28" height="28" fill="' + ((r + c) % 2 ? "#f3e6cf" : "#e9d3ad") + '" stroke-width="1.2"/>';
    }
    out += emb("🐰", 22 + 28 * rabbit[0], 22 + 28 * rabbit[1], 24);
    foods.forEach(function (f) { out += emb(f[0], 22 + 28 * f[1], 22 + 28 * f[2], 20); });
    return out;
  }
  cards["🐰‍🥕"] = board([0, 0], [["🥕", 2, 1], ["🍎", 1, 2], ["🍓", 2, 0]]);
  cards["🐰‍🍎"] = board([0, 2], [["🥕", 1, 0], ["🍎", 2, 1], ["🍓", 0, 0]]);
  cards["🐰‍🍓"] = board([2, 2], [["🥕", 0, 2], ["🍎", 1, 0], ["🍓", 0, 1]]);
  // A code table (think-sprout-13): each fruit stands for an arrow. 🍎 up, 🍌 right, 🍇 down, 🍓 left.
  cards["🗝‍🧺"] = '<rect x="4" y="2" width="92" height="96" rx="6" fill="#fffaf0"/>' +
    [["🍎", "⬆"], ["🍌", "➡"], ["🍇", "⬇"], ["🍓", "⬅"]].map(function (r, i) {
      var y = 15 + 23.5 * i;
      return emb(r[0], 26, y, 20) + '<path d="M44 ' + (y - 3) + 'h12M44 ' + (y + 3) + 'h12" fill="none" stroke-width="3"/>' + emb(r[1], 74, y, 20) +
        (i < 3 ? '<path d="M10 ' + (y + 11.7) + 'h80" fill="none" stroke="#e9d3ad" stroke-width="1.5"/>' : "");
    }).join("");
  /* Mazes (think-sprout-19): three coloured paths leave the animal; only one reaches the food, the others stop at a
     brown wall. "🐭‍🧀": the red path reaches the cheese. "🐝‍🌼": the blue path reaches the flower. */
  function path(d, col) { return '<path d="' + d + '" fill="none" stroke="#3d2c22" stroke-width="7.5"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="5"/>'; }
  function wall(x, y) { return '<rect x="' + (x - 5) + '" y="' + (y - 5) + '" width="10" height="10" rx="1.5" fill="#8a5a36" stroke-width="2"/>'; }
  cards["🐭‍🧀"] = '<rect x="2" y="2" width="96" height="96" rx="8" fill="#f3e6cf"/>' +
    path("M20 50V16H60V44H84", "#e5483f") + path("M20 50H48V80H66V62", "#5b9bd5") + path("M20 50V84H34V66", "#5a9a45") +
    wall(66, 56) + wall(34, 60) + emb("🐭", 16, 50, 22) + emb("🧀", 86, 44, 20);
  cards["🐝‍🌼"] = '<rect x="2" y="2" width="96" height="96" rx="8" fill="#e4f2e0"/>' +
    path("M18 22H50V54H30V84H80", "#5b9bd5") + path("M18 22V60", "#e5483f") + path("M18 22H82V50", "#5a9a45") +
    wall(18, 66) + wall(82, 56) + emb("🐝", 16, 18, 22) + emb("🌼", 86, 84, 22);
  B.addArt(cards);
})();

/* ---------- the Sapling lessons (think-sapling-7 to think-sapling-23) ----------
   Scene drawings are named "ts-…". Words inside a drawing follow the lesson's language (B.inEnglish, so the English
   version shows "Bigger!"), and digits are written with B.fa when the scene is drawn. Same style as above. */
(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function hide(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ' style="opacity:0">' + inner + "</g>"; }
  function part(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  function pic(e, x, y, size) {
    var src = B.ART && B.ART[String(e).replace(/\uFE0F/g, "")];
    return src ? '<g transform="translate(' + f(x - size / 2) + " " + f(y - size / 2) + ") scale(" + f(size / 100) + ')" stroke="#3d2c22" stroke-width="3">' + src + "</g>" : "";
  }
  function en() { return !!(B.inEnglish && B.inEnglish()); }
  function text(x, y, size, t, fill) {
    return '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + size + '" font-family="inherit" font-weight="800" text-anchor="middle" stroke="none" fill="' + (fill || "#3d2c22") + '">' + t + "</text>";
  }
  var LOOP = "#8a63c7", TURN = "#d07a2c";

  /* ---------- the repeating part of a path (think-sapling-7) ---------- */
  // Stairs on a 4 × 4 grid of 14-unit squares, x 8 to 64, y 28 to 84 (stage units at their place). Square (c, r)
  // has its middle at (15 + 14c, 35 + 14r); the path from (0, 3) up the stairs to (3, 0) is shaded.
  var STAIRS = { "0,3": 1, "0,2": 1, "1,2": 1, "1,1": 1, "2,1": 1, "2,0": 1, "3,0": 1 };
  function turnBlock(cw) {
    return g('<rect x="-8" y="-8" width="16" height="16" rx="3" fill="#f6e2cf" stroke="' + TURN + '" stroke-width="1.2"/>' +
      '<g transform="scale(' + (cw ? 1 : -1) + ' 1)"><path d="M-4 2.5A4.6 4.6 0 1 1 3.6 3.4" fill="none" stroke="' + TURN + '" stroke-width="1.5"/>' +
      '<path d="M6 2.9L3.6 3.4 4.1 1" fill="none" stroke="' + TURN + '" stroke-width="1.3"/></g>');
  }
  Object.assign(B.RIG, {
    "ts-stairs": function () {
      var s = "";
      for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) {
        s += '<rect x="' + (8 + 14 * c) + '" y="' + (28 + 14 * r) + '" width="14" height="14" fill="' + (STAIRS[c + "," + r] ? "#f3e6cf" : "#fffaf0") + '" stroke-width=".4"/>';
      }
      return g(s + '<rect x="8" y="28" width="56" height="56" fill="none" stroke-width=".9"/>');
    },
    // A purple frame round two squares of the path, 29 × 15: one repeating part (origin: its middle).
    "ts-hl": '<rect x="-14.5" y="-7.5" width="29" height="15" rx="2" fill="' + LOOP + '" fill-opacity=".22" stroke="' + LOOP + '" stroke-width="1.1"/>',
    // The turn blocks, like the game's (orange, 16 × 16, origin: the middle): ↻ turn right, ↺ turn left.
    "ts-cw": turnBlock(true), "ts-ccw": turnBlock(false),
    /* The repeat block round look.k blocks (default 4) that are separate parts 18 apart, with the number of times
       (look.n) in a box at its start: on the right in Persian, on the left in English (origin: the middle of the
       row of blocks). */
    "ts-loop": function (look) {
      var n = look.n || 3, k = look.k || 4, w = k * 18 + 4, x0 = -w / 2, lab = en() ? x0 - 15 : -x0 + 1;
      return g('<rect x="' + f(x0) + '" y="-11" width="' + w + '" height="22" rx="4" fill="#ece5f7" stroke="' + LOOP + '" stroke-width="1.2"/>' +
        '<rect x="' + f(lab) + '" y="-10" width="14" height="20" rx="3" fill="#fff" stroke="' + LOOP + '" stroke-width="1"/>' +
        '<path d="M' + f(lab + 4.4) + ' -4.4a2.8 2.8 0 1 1 1.2 2.4" fill="none" stroke="' + LOOP + '" stroke-width=".9"/>' +
        text(lab + 7, 7.4, 8, B.fa(n), LOOP));
    }
  });

  /* ---------- guess my number (think-sapling-8) ---------- */
  Object.assign(B.RIG, {
    // A small number card, 9.2 × 13 (origin: its middle); look.n is its number. Its piece "ok" turns it green.
    "ts-num": function (look) {
      var n = look.n || 1;
      return g('<rect x="-4.6" y="-6.5" width="9.2" height="13" rx="1.4" fill="#fff8e7"/>' +
        hide("ok", '<rect x="-4.6" y="-6.5" width="9.2" height="13" rx="1.4" fill="#cdeab8"/>') + text(0, 2.4, n > 9 ? 5.4 : 7, B.fa(n)));
    },
    /* A speech bubble with a word (origin: the tip of its tail, at the speaker's head). look.w: big ("بزرگ‌تر!"),
       small ("کوچک‌تر!"), yes ("همین است!") or q (a question mark); look.tail: "r" puts the tail on the right. */
    "ts-say": function (look) {
      var W = { big: ["بزرگ‌تر!", "Bigger!"], small: ["کوچک‌تر!", "Smaller!"], yes: ["همین است!", "That's it!"], q: ["؟", "?"] }[look.w || "q"];
      var w = { q: 12, yes: 38 }[look.w] || 30, k = look.tail === "r" ? 1 : -1;
      return g('<rect x="' + f(-w / 2) + '" y="-17" width="' + w + '" height="12" rx="4" fill="#fff"/>' +
        '<path d="M' + f(k * 1.4) + ' -5.4L0 0 ' + f(k * 5.4) + ' -5.4" fill="#fff"/>' + text(0, -8.8, 6.2, en() ? W[1] : W[0]));
    }
  });

  /* ---------- precise instructions: a bread-and-cheese wrap (think-sapling-25) ---------- */
  Object.assign(B.RIG, {
    // A plastic bag of flat bread, 24 × 15 (origin: the middle of its bottom).
    "ts-breadbag": g('<path d="M-12 0V-12c0-1 1-2 2-2h20c1 0 2 1 2 2V0z" fill="#e8f1f8"/>' +
      '<rect x="-10" y="-4.6" width="20" height="3.6" rx="1.8" fill="#e9b872"/><rect x="-10" y="-8.4" width="20" height="3.6" rx="1.8" fill="#f0c784"/>' +
      '<path d="M-2.4-14l2.4-3 2.4 3" fill="none"/>'),
    // A box of white cheese, 14 × 7, its blue lid a piece that opens (origin: the middle of its bottom).
    "ts-cheesebox": g('<rect x="-7" y="-7" width="14" height="7" rx="1" fill="#fff"/><rect x="-3" y="-5" width="6" height="3" rx=".6" fill="#fff6d6"/>' +
      part("lid", '<rect x="-7.6" y="-9.2" width="15.2" height="2.6" rx=".8" fill="#5b9bd5"/>', "-7.6 -7.8")),
    // A piece of white cheese (origin: its middle).
    "ts-cheese": g('<rect x="-4.6" y="-2" width="9.2" height="4" rx=".6" fill="#fff6d6"/>'),
    // One flat bread, 22 long (origin: its middle).
    "ts-bread": g('<rect x="-11" y="-1.6" width="22" height="3.2" rx="1.6" fill="#f0c784"/><g fill="#c98a4b" stroke="none"><circle cx="-6" cy="-.4" r=".4"/><circle cx="1" cy=".5" r=".4"/><circle cx="6" cy="-.3" r=".4"/></g>'),
    // The bread rolled round the cheese (origin: its middle).
    "ts-wrap": g('<rect x="-9" y="-3" width="18" height="6" rx="3" fill="#f0c784"/><path d="M4-2.6c1 1.6 1 3.6 0 5.2" fill="none" stroke-width=".4"/>' +
      '<ellipse cx="8.4" cy="0" rx="1.2" ry="2.4" fill="#fff6d6"/>'),
    // A note with lines of writing, 10 × 13 (origin: its middle).
    "ts-note": g('<rect x="-5" y="-6.5" width="10" height="13" rx="1" fill="#fff"/><path d="M-3-3.6h6M-3-1h6M-3 1.6h6M-3 4.2h4" fill="none" stroke="#9aa5b1" stroke-width=".6"/>'),
    // A puzzled scribble over a head: "that's not what I meant!" (origin: its middle).
    "ts-oops": g('<path d="M-3 2c-2-5 4-7 5-3 1 3-3 3-2 0" fill="none" stroke="#e5483f" stroke-width=".9"/><circle cx="4" cy="-3" r=".7" fill="#e5483f" stroke="none"/><circle cx="-5" cy="-2" r=".6" fill="#e5483f" stroke="none"/>')
  });

  /* ---------- the wolf, the goat and the cabbage (think-sapling-14) ---------- */
  Object.assign(B.RIG, {
    // The river between two green banks; the banks' tops are at y = 64, the water from x 40 to 120 (stage units).
    "ts-river": g('<rect x="40" y="64" width="80" height="26" fill="#6cb6e0" stroke="none"/>' +
      '<path d="M54 76q4-2 8 0t8 0M86 82q4-2 8 0t8 0M66 86q4-2 8 0" fill="none" stroke="#fff" stroke-width=".7" opacity=".8"/>' +
      '<path d="M0 64H44L50 90H0z" fill="#8fc46a"/><path d="M160 64H116L110 90H160z" fill="#8fc46a"/>'),
    // A rowing boat, 30 long (origin: the middle of the water line).
    "ts-boat": g('<path d="M-15-5H15L10.6 1.6H-10.6z" fill="#a0683f"/><path d="M-13-3.4H13" fill="none" stroke="#7a4f2c" stroke-width=".6"/>')
  });

  /* ---------- a picture made of squares (think-sapling-15) ---------- */
  var HEART = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];
  Object.assign(B.RIG, {
    // A tablet lying sideways, its white screen 68 × 44 (origin: the middle of the screen).
    "ts-pad": g('<rect x="-38" y="-26" width="76" height="52" rx="5" fill="#3a3f4b"/><rect x="-34" y="-22" width="68" height="44" rx="1.5" fill="#fff"/>' +
      '<circle cx="36" cy="0" r="1" fill="#6b7280"/>'),
    // A smooth red heart, about 24 wide (origin: its middle).
    "ts-heart": g('<path d="M0 9C-6 4-12 0-12-5c0-3.4 2.6-5.6 5.6-5.6 2.4 0 4.6 1.4 6.4 3.8 1.8-2.4 4-3.8 6.4-3.8 3 0 5.6 2.2 5.6 5.6C12 0 6 4 0 9z" fill="#e03131"/>'),
    /* The same heart as 7 × 6 squares of 3.4 (origin: its middle): pieces "lines" (the grid between the squares)
       and "nums" (the number of every square of the top row: 0 white, 1 red). */
    "ts-pixheart": function () {
      var S = 3.4, x0 = -3.5 * S, y0 = -3 * S, sq = "", ln = "", nums = "";
      HEART.forEach(function (row, r) {
        row.split("").forEach(function (v, c) {
          if (v === "1") sq += '<rect x="' + f(x0 + c * S) + '" y="' + f(y0 + r * S) + '" width="' + S + '" height="' + S + '" fill="#e03131" stroke="none"/>';
          if (r === 0) nums += text(x0 + c * S + S / 2, y0 + S / 2 + 0.9, 2.4, B.fa(v), v === "1" ? "#fff" : "#3d2c22");
        });
      });
      for (var i = 0; i <= 7; i++) ln += "M" + f(x0 + i * S) + " " + f(y0) + "v" + f(6 * S);
      for (var j = 0; j <= 6; j++) ln += "M" + f(x0) + " " + f(y0 + j * S) + "h" + f(7 * S);
      return sq + hide("lines", '<path d="' + ln + '" fill="none" stroke="#3d2c22" stroke-width=".18"/>') + hide("nums", nums);
    }
  });

  /* ---------- computers inside everyday things (think-sapling-18) ---------- */
  Object.assign(B.RIG, {
    /* A washing machine from the front, 36 × 44 (origin: the middle of its bottom). Pieces: "water" (fills the
       window from the bottom: grow its sy from 0), "drum" (the clothes inside, turns), "chip" (its small computer,
       shown glowing through the side). */
    "ts-washer": g('<rect x="-18" y="-44" width="36" height="44" rx="3" fill="#eef1f4"/><rect x="-18" y="-44" width="36" height="9" rx="3" fill="#d6dde3"/>' +
      '<circle cx="11" cy="-39.5" r="2.4" fill="#9aa5b1"/><rect x="-14" y="-41" width="12" height="3" rx="1" fill="#bfe3c0"/>' +
      '<circle cx="0" cy="-18" r="12.5" fill="#9aa5b1"/><circle cx="0" cy="-18" r="10" fill="#d7ecf8"/>' +
      part("water", '<path d="M-10-18A10 10 0 0 0 10-18z" fill="#5b9bd5" opacity=".6" stroke="none"/>', "0 -8") +
      part("drum", '<path d="M-6-22c2-2 5-1 6 1-1 2-4 3-6 1z" fill="#e46b8a"/><path d="M2-16c2-1 5 0 5 2-1 2-4 2-5 0z" fill="#f2c14e"/><path d="M-5-13c1-2 3-2 4 0-1 1.6-3 1.6-4 0z" fill="#4f8fd6"/>', "0 -18") +
      '<circle cx="0" cy="-18" r="10" fill="none" stroke-width=".8"/>' +
      hide("chip", '<circle cx="0" cy="-39.5" r="5" fill="#fcd34d" opacity=".5" stroke="none"/><rect x="-3" y="-41.5" width="6" height="4" rx=".6" fill="#3f8f5a"/>' +
        '<path d="M-2-42.5v1M0-42.5v1M2-42.5v1M-2-37.5v1M0-37.5v1M2-37.5v1" fill="none" stroke-width=".4"/>')),
    /* The washing machine's program, 40 × 32 (origin: its middle): three numbered rows, 1 "pour in water" (a drop),
       2 "turn" (a turning arrow), 3 "let the water out" (an arrow down), each with a piece "h1", "h2", "h3" that
       lights it up. The numbers are on the right in Persian, on the left in English. */
    "ts-prog": function () {
      var nx = en() ? -14 : 14, ix = en() ? 4 : -4, rows = "";
      var icons = [
        '<path d="M0-3.4c2 2.6 3 4 3 5.2a3 3 0 0 1-6 0c0-1.2 1-2.6 3-5.2z" fill="#5b9bd5"/>',
        '<path d="M-3 1a3.2 3.2 0 1 1 1 2" fill="none" stroke="#3d2c22" stroke-width=".9"/><path d="M-4.4 1.6l1.4-.8.6 1.6" fill="none" stroke-width=".8"/>',
        '<path d="M0-3.4v6M-2.4 0.4l2.4 2.6 2.4-2.6" fill="none" stroke="#5b9bd5" stroke-width="1.1"/>'];
      icons.forEach(function (ic, i) {
        var y = -9 + 9 * i;
        rows += hide("h" + (i + 1), '<rect x="-18" y="' + (y - 4) + '" width="36" height="8" rx="2" fill="#fcd34d" opacity=".8" stroke="none"/>') +
          text(nx, y + 2.2, 5.4, B.fa(i + 1)) + '<g transform="translate(' + ix + " " + y + ')">' + ic + "</g>";
      });
      return g('<rect x="-20" y="-16" width="40" height="32" rx="2" fill="#fff"/>' + rows);
    },
    /* A traffic light on its pole, 60 tall (origin: the bottom of the pole). Pieces "red", "yellow", "green" (the
       lamps lit) and "chip" (its small computer in the box at the foot of the pole, glowing). */
    "ts-light": g('<rect x="-1.4" y="-34" width="2.8" height="34" fill="#6b7280"/><rect x="-6" y="-12" width="12" height="8" rx="1" fill="#9aa5b1"/>' +
      '<rect x="-7" y="-62" width="14" height="30" rx="3" fill="#3a3f4b"/>' +
      '<circle cy="-56" r="3.6" fill="#5c2b2b"/><circle cy="-47" r="3.6" fill="#5c4a1e"/><circle cy="-38" r="3.6" fill="#1f4a2b"/>' +
      hide("red", '<circle cy="-56" r="3.6" fill="#ff4d4d"/><circle cy="-56" r="6" fill="#ff4d4d" opacity=".25" stroke="none"/>') +
      hide("yellow", '<circle cy="-47" r="3.6" fill="#ffd43b"/><circle cy="-47" r="6" fill="#ffd43b" opacity=".25" stroke="none"/>') +
      hide("green", '<circle cy="-38" r="3.6" fill="#51cf66"/><circle cy="-38" r="6" fill="#51cf66" opacity=".25" stroke="none"/>') +
      hide("chip", '<circle cx="0" cy="-8" r="5" fill="#fcd34d" opacity=".5" stroke="none"/><rect x="-3" y="-10" width="6" height="4" rx=".6" fill="#3f8f5a"/>'))
  });

  /* ---------- files and folders (think-sapling-19) ---------- */
  Object.assign(B.RIG, {
    // A computer screen, 104 × 58, on its stand (origin: the middle of the screen).
    "ts-screen": g('<path d="M-8 33h16l3 6h-22z" fill="#9aa5b1"/><rect x="-52" y="-31" width="104" height="64" rx="3" fill="#4a5568"/>' +
      '<rect x="-49" y="-28" width="98" height="56" rx="1" fill="#fbfaf7"/>'),
    // A child's drawing, 26 × 20: a house under the sun (origin: its middle).
    "ts-drawing": g('<rect x="-13" y="-10" width="26" height="20" rx="1" fill="#fff"/><circle cx="7" cy="-4.6" r="2.6" fill="#fcd34d"/>' +
      '<path d="M-9 7v-6l5-4 5 4v6z" fill="#f4a261"/><path d="M-5.4 7v-3.4h2.8V7" fill="#8a5530"/><path d="M-13 7.4h26" fill="none" stroke="#5a9a45" stroke-width="1"/>'),
    // A file: a page with a folded corner and the little house on it, 9 × 11 (origin: its middle).
    "ts-file": g('<path d="M-4.5-5.5h6l3 3v8h-9z" fill="#fff"/><path d="M1.5-5.5v3h3" fill="none"/><path d="M-2.6 3.4V1l1.6-1.4L.6 1v2.4z" fill="#f4a261" stroke-width=".3"/><circle cx="2.2" cy="-1.6" r=".9" fill="#fcd34d" stroke="none"/>'),
    /* A folder, 18 × 13, with a picture on its front (look.icon, an emoji) and its colour (look.c); its front is a
       piece "flap" that opens down (origin: the middle of its bottom). */
    "ts-folder": function (look) {
      var c = look.c || "#f2c14e";
      return g('<path d="M-9 0v-13h6l1.6 1.6H9V0z" fill="' + c + '"/><path d="M-9 0v-13h6l1.6 1.6H9V0z" fill="#000" opacity=".14" stroke="none"/>' +
        part("flap", '<path d="M-9 0l1-10h17L9 0z" fill="' + c + '"/>' + (look.icon ? pic(look.icon, 0, -5, 7) : ""), "0 0"));
    },
    // The bin, 10 × 12; its lid is a piece that opens (origin: the middle of its bottom).
    "ts-bin": g('<path d="M-4.4 0l-.8-10h10.4l-.8 10z" fill="#9aa5b1"/><path d="M-2 -8v6M0 -8v6M2 -8v6" fill="none" stroke-width=".4"/>' +
      part("lid", '<rect x="-5.8" y="-11.6" width="11.6" height="1.8" rx=".6" fill="#6b7280"/><rect x="-1.4" y="-12.8" width="2.8" height="1.4" rx=".5" fill="#6b7280"/>', "-5.8 -10")),
    // The mouse pointer, an arrow 6 tall (origin: its tip).
    "ts-cursor": g('<path d="M0 0v7.4l1.8-1.6 1.4 3 1.2-.6-1.4-2.9 2.4-.2z" fill="#fff" stroke-width=".5"/>')
  });

  /* ---------- the internet (think-sapling-20) ---------- */
  var NODES = [[42, 24], [60, 12], [64, 36], [84, 22], [98, 40], [110, 12], [120, 30]];
  var LINKS = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 4], [4, 6], [5, 6]];
  Object.assign(B.RIG, {
    /* The network between two cities: stops (small boxes with an aerial) joined by lines, and the lines from the
       first and last stop to the cities at (18, 34) and (142, 34) (stage units at their place). Its piece "lines"
       can be drawn like a pencil. NODES (above) are the stops' middles. */
    "ts-net": function () {
      var d = "M24 30L" + NODES[0].join(" ") + "M136 30L" + NODES[6].join(" ");
      LINKS.forEach(function (l) { d += "M" + NODES[l[0]].join(" ") + "L" + NODES[l[1]].join(" "); });
      var boxes = NODES.map(function (n) {
        return '<path d="M' + (n[0] + 1.6) + " " + (n[1] - 2.4) + 'l1.4-3" fill="none" stroke-width=".6"/><rect x="' + (n[0] - 3.4) + '" y="' + (n[1] - 2.4) + '" width="6.8" height="4.8" rx="1" fill="#cfd8e3"/>' +
          '<circle cx="' + (n[0] - 1.4) + '" cy="' + n[1] + '" r=".6" fill="#51cf66" stroke="none"/>';
      }).join("");
      return g(part("lines", '<path d="' + d + '" fill="none" stroke="#7c8b9c" stroke-width=".9" stroke-dasharray="none"/>') + boxes);
    },
    // A small city: three houses, 22 wide (origin: the middle of its bottom).
    "ts-city": g('<rect x="-11" y="-9" width="7" height="9" fill="#f4a261"/><path d="M-11.8-9l4.3-4 4.3 4z" fill="#c4673a"/>' +
      '<rect x="-3" y="-13" width="7" height="13" fill="#e9d3ad"/><rect x="-1.6" y="-11" width="1.6" height="1.6" fill="#5b9bd5"/><rect x="1" y="-11" width="1.6" height="1.6" fill="#5b9bd5"/>' +
      '<rect x="5" y="-7" width="6" height="7" fill="#9ccc8a"/><path d="M4.2-7l3.8-3.6 3.8 3.6z" fill="#5a9a45"/>'),
    // An envelope, 8 × 6 (origin: its middle).
    "ts-env": g('<rect x="-4" y="-3" width="8" height="6" rx=".6" fill="#fff"/><path d="M-4-3l4 3.2L4-3" fill="none"/>' +
      '<path d="M-1.2 1.6c.5-.6 1.2-.6 1.2.1 0-.7.7-.7 1.2-.1.5.8-1.2 1.6-1.2 1.6s-1.7-.8-1.2-1.6z" fill="#e5483f" stroke="none" transform="translate(0 -1)"/>'),
    // A photo, 8 × 7: hills under the sun (origin: its middle).
    "ts-photo": g('<rect x="-4" y="-3.5" width="8" height="7" rx=".6" fill="#d7ecf8"/><path d="M-4 3.5l3-4 2 2 1.4-1.4L4 3.5z" fill="#5a9a45" stroke-width=".3"/><circle cx="1.8" cy="-1.6" r=".9" fill="#fcd34d" stroke="none"/>'),
    // A yellow ring that lights up round a stop (origin: its middle).
    "ts-ring": '<circle r="5" fill="none" stroke="#fff" stroke-width="2.2"/><circle r="5" fill="none" stroke="#f59e0b" stroke-width="1.2"/>'
  });

  /* ---------- private information (think-sapling-21) ---------- */
  function padlock(x, y, s) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + (s || 1) + ')"><path d="M-1.6-1.4v-1.4a1.6 1.6 0 0 1 3.2 0v1.4" fill="none" stroke-width=".7"/>' +
      '<rect x="-2.4" y="-1.6" width="4.8" height="3.8" rx=".6" fill="#f2c14e" stroke-width=".4"/></g>';
  }
  Object.assign(B.RIG, {
    /* A form on a tablet, 72 × 52, that asks for a full name, the home address, the school and a photo: four rows,
       each with its picture and an empty line, and pieces "lock1" to "lock4" (a padlock at the row's end). The
       pictures are on the right in Persian, on the left in English (origin: the middle of the screen). */
    "ts-form": function () {
      var ix = en() ? -24 : 24, lx = en() ? 25 : -25, rows = "";
      var name = '<circle cx="0" cy="-1.6" r="1.8" fill="#f3c39b"/><path d="M-3 3c0-2.4 1.4-3 3-3s3 .6 3 3z" fill="#4f8fd6"/>';
      ["name", "🏠", "🏫", "📷"].forEach(function (p, i) {
        var y = -12 + 10 * i;
        rows += (p === "name" ? '<g transform="translate(' + ix + " " + y + ')">' + name + "</g>" : pic(p, ix, y, 8)) +
          '<path d="M' + (en() ? -17 : -19) + " " + (y + 2) + "h36" + '" fill="none" stroke="#9aa5b1" stroke-width=".6" stroke-dasharray="1.4 1"/>' +
          hide("lock" + (i + 1), padlock(lx, y, 1.2));
      });
      return g('<rect x="-38" y="-26" width="76" height="52" rx="5" fill="#3a3f4b"/><rect x="-34" y="-22" width="68" height="44" rx="1.5" fill="#fff"/>' + rows);
    }
  });

  /* ---------- a strong password (think-sapling-22) ---------- */
  // The password made from «من ۲ گربه سفید دارم» (in English "My 2 white cats sleep"): its first letters and the number.
  function strong() { return en() ? "M2wcs" : "م" + B.fa(2) + "گسد"; }
  Object.assign(B.RIG, {
    /* A big padlock with a code on it (look.code: "weak" shows 1234, "strong" the password above), 24 × 30; its
       shackle is a piece that lifts when it opens (origin: the middle of its bottom). */
    "ts-lock": function (look) {
      var code = look.code === "strong" ? strong() : B.fa(1234);
      return g(part("shackle", '<path d="M-7-18v-6a7 7 0 0 1 14 0v6" fill="none" stroke="#9aa5b1" stroke-width="3"/>') +
        '<rect x="-12" y="-19" width="24" height="19" rx="3" fill="#f2c14e"/><rect x="-9.4" y="-14" width="18.8" height="8" rx="1.6" fill="#fff"/>' +
        text(0, -8, look.code === "strong" ? 4.2 : 5.6, code));
    },
    // A guess in a bubble (look.t: "0000", "1111" or "1234"; origin: the tip of its tail).
    "ts-guess": function (look) {
      return g('<rect x="-10" y="-12" width="20" height="9" rx="3" fill="#fff"/><path d="M-1.4-3.4L0 0 2.6-3.4" fill="#fff"/>' + text(0, -5.8, 5, B.fa(look.t || "0000")));
    },
    /* The sentence «من ۲ گربه سفید دارم» as five word cards, 22 apart, read right to left (in English "My 2 white
       cats sleep", left to right), at y 18 (stage units at their place): card i has its middle at x = 124 − 22i
       (English: 36 + 22i). */
    "ts-words": function () {
      var W = en() ? ["My", "2", "white", "cats", "sleep"] : ["من", B.fa(2), "گربه", "سفید", "دارم"];
      return g(W.map(function (w, i) {
        var x = en() ? 36 + 22 * i : 124 - 22 * i;
        return '<rect x="' + (x - 10) + '" y="12" width="20" height="11" rx="2" fill="#fff8e7"/>' + text(x, 19.8, 6, w);
      }).join(""));
    },
    // One letter of the password on a small tile (look.i: which word it comes from, 0 to 4; origin: its middle).
    "ts-tile": function (look) {
      var L = en() ? ["M", "2", "w", "c", "s"] : ["م", B.fa(2), "گ", "س", "د"];
      return g('<rect x="-3.4" y="-4" width="6.8" height="8" rx="1.2" fill="#cdeab8"/>' + text(0, 2.2, 5.6, L[look.i || 0]));
    },
    // The box the password goes into, 50 × 12, with a padlock at its left end (origin: its middle).
    "ts-pwbox": g('<rect x="-25" y="-6" width="50" height="12" rx="3" fill="#fff" stroke-dasharray="1.6 1"/>' + padlock(-21, 0, 1.1))
  });

  /* ---------- picture cards (B.ART, 100 × 100, the style of js/art.js) ---------- */
  function emb(e, x, y, size) {
    var src = B.ART && B.ART[e];
    return src ? '<g transform="translate(' + (x - size / 2) + " " + (y - size / 2) + ") scale(" + size / 100 + ')">' + src + "</g>" : "";
  }
  var cards = {};
  /* "🤖‍⭐" (think-sapling-10): a 3 × 3 board, the robot at the bottom left facing up (its orange nose), the star at
     the top right, and the path traced with a finger: two squares up, then two to the right (dotted). */
  cards["🤖‍⭐"] = (function () {
    var out = '<rect x="6" y="6" width="88" height="88" rx="4" fill="#fffaf0"/>';
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) out += '<rect x="' + (8 + 28 * c) + '" y="' + (8 + 28 * r) + '" width="28" height="28" fill="#f3e6cf" stroke-width="1.2"/>';
    return out + '<path d="M22 70V22H72" fill="none" stroke="#f59e0b" stroke-width="3.4" stroke-dasharray="5 4"/>' +
      '<path d="M66 16l8 6-8 6" fill="none" stroke="#f59e0b" stroke-width="3.4"/>' +
      emb("🤖", 22, 80, 22) + '<path d="M22 62l-4 6h8z" fill="#f59e0b" stroke-width="1.5"/>' + emb("⭐", 78, 22, 20);
  })();
  /* "🧩‍1" (think-sapling-14): a logic grid. Rows: the hen, the rabbit, the cat; columns: grain, a carrot, a fish.
     Clue 1 (the rabbit eats the carrot) gives a tick and four crosses; clue 2 (the hen doesn't eat the fish) one
     more cross. The child works out the rest. */
  cards["🧩‍1"] = (function () {
    var out = '<rect x="2" y="2" width="96" height="96" rx="6" fill="#fffaf0"/>';
    ["🌾", "🥕", "🐟"].forEach(function (e, i) { out += emb(e, 43 + 22 * i, 16, 17); });
    ["🐔", "🐰", "🐱"].forEach(function (e, i) { out += emb(e, 16, 43 + 22 * i, 17); });
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) out += '<rect x="' + (32 + 22 * c) + '" y="' + (32 + 22 * r) + '" width="22" height="22" fill="#fff" stroke-width="1.4"/>';
    function x(c, r) { var cx = 43 + 22 * c, cy = 43 + 22 * r; return '<path d="M' + (cx - 5) + " " + (cy - 5) + "l10 10m0-10l-10 10" + '" fill="none" stroke="#e5483f" stroke-width="3"/>'; }
    function tick(c, r) { var cx = 43 + 22 * c, cy = 43 + 22 * r; return '<path d="M' + (cx - 6) + " " + cy + "l4 5 8-10" + '" fill="none" stroke="#5a9a45" stroke-width="3.4"/>'; }
    return out + tick(1, 1) + x(0, 1) + x(2, 1) + x(1, 0) + x(1, 2) + x(2, 0);
  })();
  B.addArt(cards);

  /* ---------- screen time and play (think-sapling-23) ---------- */
  Object.assign(B.RIG, {
    // A wall clock, r 8, with its hands as pieces "hour" and "min" that turn round its middle (origin: its middle).
    "ts-clock": g('<circle r="8" fill="#fff" stroke-width=".9"/><g fill="#3d2c22" stroke="none"><circle cy="-6.2" r=".5"/><circle cx="6.2" r=".5"/><circle cy="6.2" r=".5"/><circle cx="-6.2" r=".5"/></g>' +
      part("hour", '<path d="M0 0V-3.8" fill="none" stroke-width="1.1"/>', "0 0") + part("min", '<path d="M0 0V-5.8" fill="none" stroke-width=".7"/>', "0 0") +
      '<circle r=".8" fill="#3d2c22" stroke="none"/>'),
    /* A fridge, 30 × 58, with the family's screen plan as a piece "plan" (a sheet with four rows: the tablet and a
       short time, playing outside, reading, sleep at night) (origin: the middle of its bottom). */
    "ts-fridge": function () {
      var ix = en() ? -6 : 6, rows = "";
      [["📱", "⏰"], ["⚽", ""], ["📚", ""], ["🛏️", "🌙"]].forEach(function (r, i) {
        var y = -44 + 6 * i;
        rows += pic(r[0], ix, y, 4.6) + (r[1] ? pic(r[1], -ix, y, 4) : '<path d="M' + (-ix - 2) + " " + y + "l1.4 1.4 2.6-2.8" + '" fill="none" stroke="#5a9a45" stroke-width=".8"/>');
      });
      return g('<rect x="-15" y="-58" width="30" height="58" rx="3" fill="#e9eef2"/><path d="M-15-38h30" fill="none"/>' +
        '<rect x="10" y="-54" width="2" height="10" rx="1" fill="#9aa5b1"/><rect x="10" y="-34" width="2" height="12" rx="1" fill="#9aa5b1"/>' +
        hide("plan", '<rect x="-11" y="-49" width="20" height="26" rx="1" fill="#fff"/>' + rows +
          '<circle cx="-1" cy="-49" r="1.2" fill="#e5483f"/>'));
    }
  });
})();

/* ---------- the Tree lessons (think-tree-3 to think-tree-21) ----------
   Scene drawings are named "tw-…". As above, words in a drawing follow the lesson's language and digits use B.fa. */
(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function hide(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ' style="opacity:0">' + inner + "</g>"; }
  function part(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  function pic(e, x, y, size) {
    var src = B.ART && B.ART[String(e).replace(/\uFE0F/g, "")];
    return src ? '<g transform="translate(' + f(x - size / 2) + " " + f(y - size / 2) + ") scale(" + f(size / 100) + ')" stroke="#3d2c22" stroke-width="3">' + src + "</g>" : "";
  }
  function en() { return !!(B.inEnglish && B.inEnglish()); }
  function T(fa, eng) { return en() ? eng : fa; }
  function text(x, y, size, t, fill, weight) {
    return '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + size + '" font-family="inherit" font-weight="' + (weight || 800) + '" text-anchor="middle" stroke="none" fill="' + (fill || "#3d2c22") + '">' + t + "</text>";
  }
  function lit(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fcd34d" opacity=".55" stroke="none"/>'; }

  /* ---------- inside the computer (think-tree-13) ---------- */
  Object.assign(B.RIG, {
    /* The wires between the parts and their names (stage units at their place): the keyboard at (22, 74), the
       processor at (80, 52), the memory at (80, 20), the screen (a "tk-monitor" at (138, 58), scale .6) and the
       storage at (136, 78). */
    "tw-wires": function () {
      return '<g fill="none" stroke="#9aa5b1" stroke-width="1" stroke-dasharray="2 1.4"><path d="M32 70L68 57M80 40V26M92 48L124 45M92 57L124 75"/></g>' +
        text(22, 83, 4.2, T("صفحه‌کلید (ورودی)", "keyboard (input)")) + text(80, 73, 4.2, T("پردازنده", "processor")) +
        text(80, 9, 4.2, T("حافظه", "memory")) + text(138, 64, 4.2, T("صفحه‌نمایش (خروجی)", "screen (output)")) + text(136, 89, 4.2, T("ذخیره‌سازی", "storage"));
    },
    // The processor, a chip 22 × 22 (origin: its middle); its piece "glow" lights it.
    "tw-cpu": g(hide("glow", lit(0, 0, 16)) + '<rect x="-11" y="-11" width="22" height="22" rx="2" fill="#4a5568"/>' +
      '<path d="M-6-11v-3M0-11v-3M6-11v-3M-6 11v3M0 11v3M6 11v3M-11-6h-3M-11 0h-3M-11 6h-3M11-6h3M11 0h3M11 6h3" fill="none" stroke="#4a5568" stroke-width="1.2"/>' +
      '<rect x="-6" y="-6" width="12" height="12" rx="1" fill="#9fd3f0" stroke="none"/>'),
    // The memory: a stick with four places, 36 × 10 (origin: its middle); piece "letter" is the letter kept in the
    // first place, "glow" lights it.
    "tw-ram": function () {
      return g(hide("glow", '<rect x="-20" y="-7" width="40" height="14" rx="3" fill="#fcd34d" opacity=".55" stroke="none"/>') +
        '<rect x="-18" y="-5" width="36" height="10" rx="1" fill="#3f8f5a"/>' +
        [-13.5, -4.5, 4.5, 13.5].map(function (x) { return '<rect x="' + (x - 3.6) + '" y="-3.4" width="7.2" height="6.8" fill="#e8f5e9" stroke-width=".4"/>'; }).join("") +
        hide("letter", text(en() ? -13.5 : 13.5, 2.2, 6, T("ب", "B"))));
    },
    // Storage, a drive 22 × 12 (origin: its middle) with a light "led".
    "tw-disk": g('<rect x="-11" y="-6" width="22" height="12" rx="2" fill="#cbd5e0"/><circle cx="-3" cy="0" r="4" fill="#e2e8f0"/><circle cx="-3" cy="0" r="1" fill="#9aa5b1"/>' +
      '<circle cx="7" cy="2.4" r="1.2" fill="#9aa5b1"/>' + hide("led", '<circle cx="7" cy="2.4" r="1.4" fill="#51cf66"/>')),
    // The letter that appears on the screen (origin: its middle).
    "tw-letter": function () { return text(0, 3.4, 10, T("ب", "B")); }
  });

  /* ---------- making tea with a flowchart (think-tree-8) ---------- */
  Object.assign(B.RIG, {
    /* The flowchart on the right (stage units at their place): start (118, 10), "fill the kettle and put it on the
       stove" (118, 27), the question "is the water boiling?" (118, 45) with "no: wait" looping back to it on the
       right, "make the tea" (118, 63), end (118, 80). Pieces "n1" to "n5" light each one, "loop" the "no" arrow. */
    "tw-flow": function () {
      var x = 118, out = "";
      function box(i, y, kind, t) {
        var shape = kind === "oval" ? '<rect x="' + (x - 18) + '" y="' + (y - 5) + '" width="36" height="10" rx="5" fill="#e7f3e0"/>'
          : kind === "ask" ? '<path d="M' + (x - 30) + " " + y + "L" + x + " " + (y - 8) + "L" + (x + 30) + " " + y + "L" + x + " " + (y + 8) + 'z" fill="#fff4dc"/>'
          : '<rect x="' + (x - 34) + '" y="' + (y - 6) + '" width="68" height="12" rx="1.6" fill="#eef4fb"/>';
        return hide("n" + i, kind === "ask" ? '<path d="M' + (x - 34) + " " + y + "L" + x + " " + (y - 10.4) + "L" + (x + 34) + " " + y + "L" + x + " " + (y + 10.4) + 'z" fill="#fcd34d" opacity=".7" stroke="none"/>'
          : '<rect x="' + (x - 37) + '" y="' + (y - 8) + '" width="74" height="16" rx="3" fill="#fcd34d" opacity=".7" stroke="none"/>') + shape + text(x, y + 1.6, 4.2, t);
      }
      out += box(1, 10, "oval", T("شروع", "Start")) + box(2, 27, "do", T("کتری را آب کن و روی گاز بگذار", "Fill the kettle, put it on")) +
        box(3, 45, "ask", T("آب جوش آمد؟", "Is it boiling?")) + box(4, 63, "do", T("چای را دم کن", "Make the tea")) + box(5, 80, "oval", T("پایان", "End"));
      out += '<path d="M118 15v5M118 33v3.6M118 53v4M118 69v5.6" fill="none" stroke-width=".7"/><path d="M116.6 18.4l1.4 2 1.4-2M116.6 34.8l1.4 2 1.4-2M116.6 55.6l1.4 2 1.4-2M116.6 73.2l1.4 2 1.4-2" fill="none" stroke-width=".7"/>';
      out += part("loop", '<path d="M148 45h6v-10h-6" fill="none" stroke="#c4673a" stroke-width=".9"/><path d="M150 33.6l-2 1.4 2 1.4" fill="none" stroke="#c4673a" stroke-width=".9"/>' +
        text(152, 50.6, 3.6, T("نه: صبر کن", "No: wait"), "#c4673a"));
      out += text(112, 56, 3.6, T("بله", "Yes"));
      return g(out);
    },
    // A stove from the front, 34 wide, its top at y −14 (origin: the middle of its bottom); piece "flame" (hidden).
    "tw-stove": g('<rect x="-17" y="-14" width="34" height="14" rx="1.6" fill="#e2e8f0"/><circle cx="-9" cy="-7" r="2" fill="#9aa5b1"/><circle cx="9" cy="-7" r="2" fill="#9aa5b1"/>' +
      '<rect x="-15" y="-15.6" width="30" height="1.6" fill="#4a5568"/>' + hide("flame", '<path d="M-4-15.6c0-3 2-3 2-5 1 2 2 2 2 5 1-2 2-2 2-4 1 2 2 3 2 4z" fill="#f59e0b" stroke="none"/>')),
    // A kettle from the side, its spout to the left (origin: the middle of its bottom).
    "tw-kettle": g('<path d="M-8 0c-1-6 0-11 8-11s9 5 8 11z" fill="#5b9bd5"/><path d="M-8-6l-6-4" fill="none" stroke="#5b9bd5" stroke-width="2.2"/>' +
      '<path d="M-4-11c0-4 8-4 8 0" fill="none" stroke-width="1.2"/>'),
    // A teapot and a glass of tea (origin: the middle of their bottom); piece "tea" fills the glass.
    "tw-teaset": g('<path d="M-14 0c-1-5 0-9 6-9s7 4 6 9z" fill="#f2f0ec"/><path d="M-2-6l3-2" fill="none" stroke-width="1"/><rect x="-10" y="-11" width="4" height="2" rx=".6" fill="#f2f0ec"/>' +
      '<path d="M6-10h7l-1 10h-5z" fill="#fff"/>' + hide("tea", '<path d="M6.5-7h6l-.8 7h-4.4z" fill="#b9562b" stroke="none"/>'))
  });

  /* ---------- the counter (think-tree-6) ---------- */
  Object.assign(B.RIG, {
    // A word over the counter (look.w: "counter" or "questions"; origin: its middle).
    "tw-label": function (look) {
      var W = { counter: ["شمارنده", "counter"], questions: ["سؤال‌ها", "questions"] }[look.w || "counter"];
      return text(0, 1.6, 5, en() ? W[1] : W[0]);
    },
    // A green tick (origin: its middle).
    "tw-tick": g('<circle r="5" fill="#5a9a45"/><path d="M-2.4 0l1.6 1.8 3.2-3.6" fill="none" stroke="#fff" stroke-width="1.2"/>')
  });

  /* ---------- binary cards (think-tree-11) ---------- */
  function dotsFor(v) {
    var cols = v >= 8 ? 4 : v >= 4 ? 2 : v, rowsN = Math.ceil(v / cols), out = "";
    for (var i = 0; i < v; i++) {
      var cx = (i % cols - (cols - 1) / 2) * 3.6, cy = (Math.floor(i / cols) - (rowsN - 1) / 2) * 3.6;
      out += '<circle cx="' + f(cx) + '" cy="' + f(cy - 2) + '" r="1.2" fill="#3d2c22" stroke="none"/>';
    }
    return out;
  }
  Object.assign(B.RIG, {
    /* A dot card, 20 × 26, with look.v dots and its number under them (origin: its middle). Pieces: "back" (the card
       face down), "one" and "zero" (the bit written under the card). */
    "tw-bcard": function (look) {
      var v = look.v || 1;
      return g('<rect x="-10" y="-13" width="20" height="26" rx="2" fill="#fffaf0"/>' + dotsFor(v) + text(0, 10.4, 4.6, B.fa(v)) +
        hide("back", '<rect x="-10" y="-13" width="20" height="26" rx="2" fill="#5b6b9a"/><path d="M-6-9l12 18M6-9l-12 18" fill="none" stroke="#7d8cba" stroke-width="1"/>') +
        hide("one", text(0, 22, 8, B.fa(1))) + hide("zero", text(0, 22, 8, B.fa(0))));
    },
    // "8 + 2 + 1 = 11" (origin: its middle).
    // Math is written left to right in both languages.
    "tw-sum": function () { return text(0, 2, 7, [8, 2, 1].map(B.fa).join(" + ") + " = " + B.fa(11)).replace("<text ", '<text direction="ltr" unicode-bidi="bidi-override" '); },
    // A lamp, off; piece "on" lights it (origin: the middle of its bottom).
    "tw-lamp": g('<rect x="-2" y="-3" width="4" height="3" fill="#9aa5b1"/><circle cy="-7" r="4.4" fill="#e2e8f0"/>' + hide("on", '<circle cy="-7" r="7" fill="#fcd34d" opacity=".4" stroke="none"/><circle cy="-7" r="4.4" fill="#fcd34d"/>'))
  });

  /* ---------- troubleshooting (think-tree-14) ---------- */
  Object.assign(B.RIG, {
    /* A laptop, 44 wide (origin: the middle of its bottom). Pieces: "nonet" (the screen says there is no internet: a
       wifi sign crossed out) and "net" (the page is back: a picture and a wifi sign). */
    "tw-laptop": g('<path d="M-25 0l3-4h44l3 4z" fill="#cbd5e0"/><rect x="-20" y="-32" width="40" height="28" rx="2" fill="#4a5568"/><rect x="-18" y="-30" width="36" height="24" fill="#f7fafc"/>' +
      part("nonet", '<path d="M-6-18a8 8 0 0 1 12 0M-3.6-15.4a4.4 4.4 0 0 1 7.2 0" fill="none" stroke="#9aa5b1" stroke-width="1.2"/><circle cy="-12.6" r="1" fill="#9aa5b1" stroke="none"/>' +
        '<path d="M-6-22l12 12" fill="none" stroke="#e5483f" stroke-width="1.4"/>') +
      hide("net", '<rect x="-18" y="-30" width="36" height="24" fill="#d7ecf8"/><path d="M-18-6l8-9 6 5 5-6 17 10z" fill="#8cc66b" stroke="none"/><circle cx="10" cy="-23" r="3" fill="#fcd34d" stroke="none"/>' +
        '<path d="M-14-26a6 6 0 0 1 9 0M-12.2-24a3.3 3.3 0 0 1 5.4 0" fill="none" stroke="#3f8f5a" stroke-width="1"/>')),
    /* The modem with its lights (origin: the middle of its bottom): "l1", "l2" green, "l3" green (hidden) or "bad" red;
       "btn" its power button. */
    "tw-router": g('<path d="M-12-12l-2-8M12-12l2-8" fill="none" stroke-width="1"/><rect x="-16" y="-12" width="32" height="12" rx="2" fill="#2d3748"/>' +
      '<circle data-part="l1" cx="-9" cy="-6" r="1.4" fill="#51cf66"/><circle data-part="l2" cx="-4" cy="-6" r="1.4" fill="#51cf66"/>' +
      '<circle data-part="bad" cx="1" cy="-6" r="1.4" fill="#ff4d4d"/>' + hide("l3", '<circle cx="1" cy="-6" r="1.4" fill="#51cf66"/>') +
      '<circle data-part="btn" data-pivot="10 -6" cx="10" cy="-6" r="2" fill="#a0aec0"/>')
  });

  /* ---------- packets (think-tree-15) ---------- */
  var MSG = { fa: ["سلام", "خاله", "جان!"], en: ["Hello", "dear", "Auntie!"] };
  Object.assign(B.RIG, {
    // The whole message in a bubble (origin: the tip of its tail).
    "tw-msg": function () {
      var w = en() ? MSG.en.join(" ") : MSG.fa.join(" ");
      return g('<rect x="-27" y="-14" width="54" height="10" rx="3" fill="#fff"/><path d="M-2-4.4L0 0 3-4.4" fill="#fff"/>' + text(0, -7.4, 5, w));
    },
    // One packet: its number, a little house (where it goes) and its piece of the message (look.n 1–3; origin: its middle).
    "tw-pkt": function (look) {
      var n = look.n || 1, w = (en() ? MSG.en : MSG.fa)[n - 1];
      return g('<rect x="-11" y="-6" width="22" height="12" rx="1.6" fill="#fff8e7"/><circle cx="-7.4" cy="-2.6" r="2.6" fill="#f59e0b"/>' +
        text(-7.4, -1.2, 3.6, B.fa(n), "#fff") + '<path d="M5.6-1.6v-2.4l1.6-1.4 1.6 1.4v2.4z" fill="#f4a261" stroke-width=".3"/>' + text(0, 4, 4.2, w));
    }
  });

  /* ---------- searching and checking (think-tree-17) ---------- */
  Object.assign(B.RIG, {
    /* A search page, 100 × 64 (origin: its middle): the search box with the words, then three results; the first is
       an ad ("آگهی"). Pieces: "words" (the typed words), "results", "ad" (the ad's label lit). */
    "tw-search": function () {
      var rows = "";
      [-8, 6, 20].forEach(function (y, i) {
        rows += '<rect x="-44" y="' + (y - 5) + '" width="88" height="11" rx="1.4" fill="' + (i ? "#fff" : "#fff8e1") + '" stroke-width=".4"/>' +
          '<path d="M' + (en() ? -40 : 40) + " " + (y - 1) + "h" + (en() ? 44 : -44) + '" fill="none" stroke="#3d7ab8" stroke-width="1.4"/>' +
          '<path d="M' + (en() ? -40 : 40) + " " + (y + 2.6) + "h" + (en() ? 64 : -64) + '" fill="none" stroke="#cbd5e0" stroke-width="1"/>';
      });
      var adx = en() ? 33 : -33;
      return g('<rect x="-50" y="-32" width="100" height="64" rx="3" fill="#4a5568"/><rect x="-48" y="-30" width="96" height="60" fill="#f7fafc"/>' +
        '<rect x="-40" y="-26" width="80" height="9" rx="4.5" fill="#fff"/>' + part("words", text(0, -20, 4.4, T("غذای بچه گربه", "kitten food"))) +
        '<circle cx="' + (en() ? 34 : -34) + '" cy="-21.6" r="2" fill="none" stroke-width=".7"/>' +
        part("results", rows + '<rect x="' + (adx - 6) + '" y="-12.6" width="12" height="6" rx="1.4" fill="#f59e0b" stroke="none"/>' + text(adx, -8.4, 3.6, T("آگهی", "Ad"), "#fff")) +
        hide("ad", '<rect x="' + (adx - 8) + '" y="-14.6" width="16" height="10" rx="2.4" fill="none" stroke="#e5483f" stroke-width="1.2"/>'));
    },
    // A photo of a cat; piece "wings" (hidden) is what someone added with an editing program (origin: its middle).
    "tw-catphoto": g('<rect x="-16" y="-12" width="32" height="24" rx="1" fill="#d7ecf8"/><rect x="-16" y="4" width="32" height="8" fill="#8cc66b" stroke="none"/>' +
      hide("wings", '<path d="M-3-1c-6-6-12-6-12 0 4 0 8 2 12 3zM3-1c6-6 12-6 12 0-4 0-8 2-12 3z" fill="#fff" stroke-width=".5"/>') +
      '<ellipse cy="3" rx="6" ry="4.6" fill="#f2a65a"/><circle cy="-3.4" r="3.6" fill="#f2a65a"/><path d="M-3-5.6l-.6-3 2 1.6M3-5.6l.6-3-2 1.6" fill="#f2a65a"/>' +
      '<circle cx="-1.2" cy="-3.6" r=".5" fill="#3d2c22" stroke="none"/><circle cx="1.2" cy="-3.6" r=".5" fill="#3d2c22" stroke="none"/>'),
    // Three questions to ask before believing: who wrote it? when? does another source say so? (origin: the middle of
    // the row; pieces "q1", "q2", "q3", each hidden).
    "tw-asks": function () {
      var Q = en() ? ["Who wrote it?", "When?", "Another source?"] : ["چه کسی نوشته؟", "کی؟", "منبع دیگری هم می‌گوید؟"];
      var xs = en() ? [-50, 0, 50] : [50, 0, -50], icons = ["✏️", "🗓️", "📚"];
      return g(Q.map(function (q, i) {
        return hide("q" + (i + 1), '<rect x="' + (xs[i] - 24) + '" y="-9" width="48" height="18" rx="3" fill="#fff"/>' + pic(icons[i], xs[i], -2.6, 8) + text(xs[i], 6, 3.6, q));
      }).join(""));
    }
  });

  /* ---------- a trick message, and a key for each door (think-tree-18) ---------- */
  Object.assign(B.RIG, {
    /* A tablet showing a message: «برنده شدی! برای جایزه، رمزت را بنویس:» and an empty box (origin: the middle of the
       screen); piece "no" is a big red cross over it. */
    "tw-trick": function () {
      return g('<rect x="-30" y="-22" width="60" height="44" rx="4" fill="#3a3f4b"/><rect x="-26" y="-18" width="52" height="36" fill="#fff"/>' +
        pic("🎁", 0, -9, 10) + text(0, 3, 4.4, T("برنده شدی! برای جایزه،", "You've won! For your prize,")) +
        text(0, 8.6, 4.4, T("رمزت را بنویس:", "type your password:")) + '<rect x="-14" y="11" width="28" height="5" rx="1" fill="#f7fafc" stroke-width=".4"/>' +
        hide("no", '<path d="M-22-14l44 28M22-14l-44 28" fill="none" stroke="#fff" stroke-width="5"/><path d="M-22-14l44 28M22-14l-44 28" fill="none" stroke="#e5483f" stroke-width="3"/>'));
    },
    // A door with a lock of one colour (look.c), 18 × 34, and its key below it (origin: the middle of its bottom).
    "tw-door": function (look) {
      var c = look.c || "#f2c14e";
      return g('<rect x="-9" y="-34" width="18" height="34" rx="1" fill="#a0683f"/><rect x="-6.4" y="-30" width="12.8" height="12" rx="1" fill="#b57638"/>' +
        '<rect x="3" y="-17" width="4.4" height="5" rx=".8" fill="' + c + '"/>' +
        '<g transform="translate(0 6)"><circle cx="-5" cy="0" r="2.4" fill="' + c + '"/><path d="M-2.6 0H5M2 0v1.6M4 0v1.2" fill="none" stroke="' + c + '" stroke-width="1.2"/></g>');
    }
  });

  /* ---------- footprints and what to do about bullying (think-tree-19) ---------- */
  Object.assign(B.RIG, {
    // One footprint in the snow (origin: its middle).
    "tw-foot": '<ellipse rx="1.6" ry="2.6" fill="#b8c7d1" stroke="none"/>',
    /* Three cards: keep the message (a photo of the screen), block the person, tell a grown-up (origin: the middle of
       the row; pieces "c1", "c2", "c3", hidden). Read right to left in Persian, left to right in English. */
    "tw-three": function () {
      var W = en() ? ["Keep it", "Block", "Tell"] : ["نگهش دار", "مسدود کن", "بگو"];
      var xs = en() ? [-40, 0, 40] : [40, 0, -40];
      var icons = [pic("📷", 0, -3, 10), '<circle cx="0" cy="-3" r="5" fill="none" stroke="#e5483f" stroke-width="1.6"/><path d="M-3.6-6.6l7.2 7.2" fill="none" stroke="#e5483f" stroke-width="1.6"/>',
        pic("👩", 0, -3, 10)];
      return g(W.map(function (w, i) {
        return hide("c" + (i + 1), '<rect x="' + (xs[i] - 17) + '" y="-12" width="34" height="22" rx="3" fill="#fff"/><g transform="translate(' + xs[i] + ' 0)">' + icons[i] + "</g>" +
          text(xs[i], 7.4, 4.4, w));
      }).join(""));
    }
  });

  /* ---------- a machine that learns (think-tree-20) ---------- */
  Object.assign(B.RIG, {
    // The robot's memory: two boxes, apples on the left and oranges on the right in both languages (origin: the
    // middle between them; each box 40 × 22).
    "tw-memory": function () {
      var ax = -22, ox = 22;
      return g('<rect x="' + (ax - 20) + '" y="-11" width="40" height="22" rx="3" fill="#fff" stroke-dasharray="1.6 1"/>' + pic("🍎", ax, -15, 7) +
        '<rect x="' + (ox - 20) + '" y="-11" width="40" height="22" rx="3" fill="#fff" stroke-dasharray="1.6 1"/>' + pic("🍊", ox, -15, 7));
    },
    // A guess in a bubble: a picture of the fruit (look.fruit) and, as pieces, "yes" (a tick) and "wrong" (a cross)
    // (origin: the tip of its tail).
    "tw-guess": function (look) {
      return g('<rect x="-10" y="-20" width="20" height="16" rx="4" fill="#fff"/><path d="M-1.4-4.4L0 0 2.6-4.4" fill="#fff"/>' + pic(look.fruit || "🍎", 0, -12, 11) +
        hide("yes", '<circle cx="9" cy="-19" r="3.4" fill="#5a9a45"/><path d="M7.4-19l1.1 1.2 2-2.4" fill="none" stroke="#fff" stroke-width=".9"/>') +
        hide("wrong", '<circle cx="9" cy="-19" r="3.4" fill="#e5483f"/><path d="M7.6-20.4l2.8 2.8M10.4-20.4l-2.8 2.8" fill="none" stroke="#fff" stroke-width=".9"/>'));
    },
    // A red ring round a wrong example (origin: its middle).
    "tw-wrongring": '<circle r="5.6" fill="none" stroke="#e5483f" stroke-width="1.2" stroke-dasharray="2 1"/>'
  });

  /* ---------- before and after computers (think-tree-21) ---------- */
  Object.assign(B.RIG, {
    // A calendar page (origin: its middle) with the number of days on the way (piece with data-count).
    "tw-cal": g('<rect x="-8" y="-9" width="16" height="18" rx="1.4" fill="#fff"/><rect x="-8" y="-9" width="16" height="5" rx="1.4" fill="#e5483f"/>' +
      '<text data-count y="6" text-anchor="middle" font-size="8" font-weight="800" fill="#3d2c22" stroke="none"></text>'),
    // A post van from the side, facing right (origin: the middle of its bottom).
    "tw-van": g('<rect x="-12" y="-11" width="18" height="9" rx="1" fill="#e5483f"/><path d="M6-11h4l3 4v5H6z" fill="#e5483f"/><rect x="7" y="-10" width="3" height="3" fill="#d7ecf8"/>' +
      '<circle cx="-7" cy="-2" r="2.2" fill="#3d2c22"/><circle cx="8" cy="-2" r="2.2" fill="#3d2c22"/>'),
    // A TV with a subtitle line, piece "sub" (origin: the middle of its bottom).
    "tw-tv": function () {
      return g('<path d="M-6 0l2-4h8l2 4z" fill="#9aa5b1"/><rect x="-26" y="-36" width="52" height="32" rx="2" fill="#4a5568"/><rect x="-24" y="-34" width="48" height="28" fill="#d7ecf8"/>' +
        '<circle cx="-8" cy="-22" r="4" fill="#f3c39b"/><path d="M-14-6c0-6 3-9 6-9s6 3 6 9z" fill="#e46b8a" stroke="none"/><circle cx="10" cy="-22" r="4" fill="#f3c39b"/><path d="M4-6c0-6 3-9 6-9s6 3 6 9z" fill="#4f8fd6" stroke="none"/>' +
        hide("sub", '<rect x="-22" y="-13" width="44" height="6" fill="#000" opacity=".7" stroke="none"/>' + text(0, -8.6, 3.6, T("سلام! حالت چطور است؟", "Hello! How are you?"), "#fff")));
    },
    // A phone screen with lines of writing, held up (origin: its middle).
    "tw-readphone": g('<rect x="-6" y="-10" width="12" height="20" rx="2" fill="#3a3f4b"/><rect x="-4.6" y="-8" width="9.2" height="15" fill="#fff"/>' +
      '<path d="M-3-5h6M-3-2.6h6M-3-.2h6M-3 2.2h4" fill="none" stroke="#9aa5b1" stroke-width=".7"/>')
  });
})();

/* ---------- the Forest lessons (think-forest-…) ----------
   Scene drawings are named "tf-…". Python code is the same in both languages; words follow the lesson's language. */
(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function hide(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ' style="opacity:0">' + inner + "</g>"; }
  function part(name, inner, pivot) { return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  function pic(e, x, y, size) {
    var src = B.ART && B.ART[String(e).replace(/️/g, "")];
    return src ? '<g transform="translate(' + f(x - size / 2) + " " + f(y - size / 2) + ") scale(" + f(size / 100) + ')" stroke="#3d2c22" stroke-width="3">' + src + "</g>" : "";
  }
  function en() { return !!(B.inEnglish && B.inEnglish()); }
  function T(fa, eng) { return en() ? eng : fa; }
  function text(x, y, size, t, fill, anchor, extra) {
    return '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + size + '" font-family="inherit" font-weight="800" text-anchor="' + (anchor || "middle") + '" stroke="none" fill="' + (fill || "#3d2c22") + '"' + (extra || "") + ">" + t + "</text>";
  }
  // Code: monospace, always left to right.
  function code(x, y, size, t, fill) {
    return '<text x="' + f(x) + '" y="' + f(y) + '" font-size="' + size + '" font-family="ui-monospace,Menlo,Consolas,monospace" font-weight="700" text-anchor="start" direction="ltr" unicode-bidi="embed" stroke="none" fill="' + (fill || "#3d2c22") + '">' + t + "</text>";
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------- blocks become text (think-forest-3) ---------- */
  Object.assign(B.RIG, {
    /* A block program on the left (x 8 to 64): "when the flag is tapped", "say hello", "repeat 3" with "move" inside;
       pieces "b1" to "b4" light each block (origin: stage units at their place). */
    "tf-blocks": function () {
      var rows = [[T("وقتی پرچم را زدی", "when flag tapped"), "#c9a227", 0], [T("بگو «سلام»", "say “Hello”"), "#3d7ab8", 0], [T("۳ بار تکرار کن", "repeat 3"), "#8a63c7", 0], [T("جلو برو", "move"), "#3d7ab8", 8]];
      return g(rows.map(function (r, i) {
        var y = 22 + 14 * i, x = 8 + r[2];
        return hide("b" + (i + 1), '<rect x="' + (x - 2) + '" y="' + (y - 7) + '" width="' + (60 - r[2]) + '" height="13" rx="3" fill="#fcd34d"/>') +
          '<rect x="' + x + '" y="' + (y - 5) + '" width="' + (56 - r[2]) + '" height="10" rx="2.4" fill="' + r[1] + '"/>' + text(x + (56 - r[2]) / 2, y + 1.6, 4.2, r[0], "#fff");
      }).join(""));
    },
    /* The same program as Python on the right (x 84 to 152), each line a piece "l1" to "l4" (hidden), and "now", an
       arrow that shows which line runs (origin: stage units at their place). */
    "tf-code": function () {
      var L = ["# " + T("وقتی پرچم را زدی", "when flag tapped"), 'print("' + T("سلام", "Hello") + '")', "for i in range(3):", "    move()"];
      return '<rect x="80" y="12" width="76" height="62" rx="3" fill="#2d3748"/>' + L.map(function (l, i) {
        return hide("l" + (i + 1), code(84, 24 + 14 * i, 4.6, esc(l), i === 0 ? "#9fb4c8" : "#e2e8f0"));
      }).join("") + hide("now", '<path d="M76 0l3 2.4-3 2.4z" fill="#f59e0b" stroke="none"/>');
    },
    // Arrows from each block to its line (stage units at their place), a piece each: "a1" … "a4".
    "tf-links": function () {
      return [0, 1, 2, 3].map(function (i) {
        var y = 22 + 14 * i;
        return hide("a" + (i + 1), '<path d="M' + (i === 3 ? 66 : 66) + " " + y + "H78" + '" stroke="#f59e0b" stroke-width="1.2" fill="none"/><path d="M75.6 ' + (y - 2) + "l2.4 2 -2.4 2" + '" stroke="#f59e0b" stroke-width="1.2" fill="none"/>');
      }).join("");
    }
  });

  /* ---------- variables are boxes with names (think-forest-1) ---------- */
  Object.assign(B.RIG, {
    /* A box with a name on its front (look.name) holding a value; the values are pieces "v1", "v2" (look.v1, look.v2,
       hidden) so one can be swapped for the other (origin: the middle of its bottom; 34 × 22). */
    "tf-box": function (look) {
      return g('<path d="M-17 0v-16l4-6h26l4 6V0z" fill="#e9c58a"/><path d="M-17-16h34" fill="none"/>' +
        '<rect x="-14" y="-12" width="28" height="9" rx="1.4" fill="#fffaf0"/>' + code(-12, -5.6, 5, esc(look.name || "x")) +
        hide("v1", '<rect x="-10" y="-34" width="20" height="11" rx="2" fill="#fff"/>' + text(0, -26.4, 6, esc(look.v1 != null ? look.v1 : ""))) +
        hide("v2", '<rect x="-12" y="-34" width="24" height="11" rx="2" fill="#fff"/>' + text(0, -26.4, 6, esc(look.v2 != null ? look.v2 : ""))));
    },
    // A line of code in a bubble (look.c; origin: its middle).
    "tf-line": function (look) {
      var t = look.c || "", w = Math.max(30, t.length * 3.2 + 8);
      return g('<rect x="' + f(-w / 2) + '" y="-6" width="' + f(w) + '" height="12" rx="3" fill="#2d3748"/>' + '<g transform="translate(' + f(-w / 2 + 4) + ' 0)">' + code(0, 2, 5, esc(t), "#e2e8f0") + "</g>");
    },
    // A keyboard key with a word being typed (look.w; origin: its middle).
    "tf-typed": function (look) {
      return g('<rect x="-16" y="-6" width="32" height="12" rx="3" fill="#fff" stroke-dasharray="1.4 1"/>' + text(0, 2, 5.4, esc(look.w || "")));
    }
  });

  /* ---------- a loop running (think-forest-5) ---------- */
  Object.assign(B.RIG, {
    /* The console: pieces "o1" to "o5" are the printed lines 1 to 5 (hidden); stage units at their place (x 100 to
       152, y 18 to 80). */
    "tf-console": function () {
      var out = '<rect x="100" y="14" width="54" height="68" rx="3" fill="#2d3748"/>' + text(127, 10, 4.2, T("خروجی", "Output"));
      for (var i = 1; i <= 5; i++) out += hide("o" + i, code(105, 16 + 12 * i, 6, B.fa(i), "#e2e8f0"));
      return out;
    },
    // A loop's code: "for i in range(1, 6):" and "    print(i)" (stage units at their place: x 8 to 92).
    "tf-loopcode": function () {
      return '<rect x="6" y="26" width="86" height="34" rx="3" fill="#2d3748"/>' + code(10, 39, 5.4, "for i in range(1, 6):", "#e2e8f0") + code(10, 52, 5.4, "    print(i)", "#e2e8f0") +
        hide("now1", '<path d="M3 36l3 2.4-3 2.4z" fill="#f59e0b" stroke="none"/>') + hide("now2", '<path d="M3 49l3 2.4-3 2.4z" fill="#f59e0b" stroke="none"/>');
    },
    // The loop variable as a box "i" with its value counting (a piece with data-count; origin: its middle).
    "tf-ibox": g('<rect x="-10" y="-8" width="20" height="16" rx="2" fill="#e9c58a"/>' + '<text x="-13" y="3" font-size="6" font-family="ui-monospace,monospace" text-anchor="end" fill="#3d2c22" stroke="none">i =</text>' +
      '<text data-count y="3" text-anchor="middle" font-size="8" font-weight="800" fill="#3d2c22" stroke="none"></text>')
  });

  /* ---------- bytes and letters (think-forest-2) ---------- */
  Object.assign(B.RIG, {
    // A bit: a lamp with 0 or 1 under it; piece "on" lights it, "one" / "zero" are the digit (origin: the lamp's middle).
    "tf-bit": g('<circle r="5" fill="#e2e8f0"/>' + hide("on", '<circle r="8" fill="#fcd34d" opacity=".4" stroke="none"/><circle r="5" fill="#fcd34d"/>') +
      hide("one", '<text y="14" text-anchor="middle" font-size="7" font-weight="800" fill="#3d2c22" stroke="none">1</text>') +
      hide("zero", '<text y="14" text-anchor="middle" font-size="7" font-weight="800" fill="#3d2c22" stroke="none">0</text>')),
    // A label (look.k: "byte", "a65", "be1576", "photo", "text"; origin: its middle).
    "tf-note": function (look) {
      var W = { byte: ["۸ بیت = ۱ بایت", "8 bits = 1 byte"], a65: ["۰۱۰۰۰۰۰۱ = ۶۵ = A", "01000001 = 65 = A"], be: ["«ب» = ۱۵۷۶ (دو بایت)", "“ب” = 1576 (two bytes)"],
        photo: ["یک عکس: میلیون‌ها نقطه رنگی", "A photo: millions of coloured dots"], text: ["یک نامه: چند صد حرف", "A letter: a few hundred letters"] }[look.k || "byte"];
      var t = en() ? W[1] : W[0], w = Math.max(40, t.length * 3.4 + 10);
      return g('<rect x="' + f(-w / 2) + '" y="-7" width="' + f(w) + '" height="14" rx="3" fill="#fff"/>' + text(0, 2.4, 5.4, t, null, "middle", look.k === "a65" ? ' direction="ltr"' : ""));
    }
  });

  /* ---------- a model of a plant (think-forest-14) ---------- */
  Object.assign(B.RIG, {
    /* Seven days of a plant (x 20 to 140), each a bar (pieces "m1" … "m7", the model, growing by sy from the ground at
       y 80) and a dot for the real height measured ("r1" … "r7", hidden) (stage units at their place). */
    "tf-growth": function () {
      var real = [4, 7, 12, 15, 17, 18, 19], out = '<path d="M14 80H150" stroke="#3d2c22" stroke-width=".8"/>';
      for (var i = 0; i < 7; i++) {
        var x = 24 + 19 * i, h = 4 * (i + 1) * 1.6;
        out += part("m" + (i + 1), '<rect x="' + (x - 5) + '" y="' + (80 - h) + '" width="10" height="' + h + '" fill="#8cc66b" stroke="#3d2c22" stroke-width=".5"/>', x + " 80") +
          hide("r" + (i + 1), '<circle cx="' + x + '" cy="' + (80 - real[i] * 1.6) + '" r="2.2" fill="#e5483f" stroke="#3d2c22" stroke-width=".4"/>') +
          text(x, 87, 4.4, B.fa(i + 1));
      }
      return out + text(82, 10, 4.6, T("روز", "day") + " → ", null, "middle");
    },
    // A key: green bars = the model, red dots = measured (origin: its middle).
    "tf-key": function () {
      return g('<rect x="-34" y="-6" width="68" height="12" rx="3" fill="#fff"/><rect x="-30" y="-3" width="6" height="6" fill="#8cc66b"/>' + text(-12, 2, 4.2, T("مدل", "model")) +
        '<circle cx="8" r="2.4" fill="#e5483f"/>' + text(22, 2, 4.2, T("اندازه واقعی", "measured")));
    }
  });

  /* ---------- how the internet finds a site (think-forest-15) ---------- */
  Object.assign(B.RIG, {
    // A browser's address bar with a domain name (origin: its middle); piece "lock" (the padlock of a safe site).
    "tf-address": function () {
      return g('<rect x="-34" y="-6" width="68" height="12" rx="6" fill="#fff"/>' + part("lock", '<path d="M-29-1.4v-1.4a1.8 1.8 0 0 1 3.6 0v1.4" fill="none" stroke-width=".7"/><rect x="-30" y="-1.6" width="5.6" height="4.4" rx=".6" fill="#5a9a45" stroke-width=".4"/>') +
        code(-21, 2, 5, "www.bagh.ir"));
    },
    // A phone book of the internet: a name and its number address (origin: its middle; piece "hl" lights the row).
    "tf-dns": function () {
      return g('<rect x="-26" y="-16" width="52" height="32" rx="2" fill="#fffaf0"/>' + text(0, -9, 4.2, T("دفترچه نشانی‌ها", "Address book")) +
        hide("hl", '<rect x="-24" y="-5" width="48" height="8" fill="#fcd34d" stroke="none"/>') +
        code(-22, 0.6, 4, "bagh.ir   185.12.4.7") + code(-22, 9, 4, "school.ir 94.20.31.5"));
    },
    // A number address on a tag (origin: its middle).
    "tf-ip": function () { return g('<rect x="-17" y="-5" width="34" height="10" rx="2" fill="#fff8e7"/>' + code(-15, 1.8, 4.4, "185.12.4.7")); }
  });

  /* ---------- the layers of a computer (think-forest-16) ---------- */
  Object.assign(B.RIG, {
    /* Three layers stacked (x 10 to 70): apps on top, the operating system, the hardware at the bottom; pieces "a",
       "o", "h" light each (stage units at their place). */
    "tf-layers": function () {
      var L = [[T("برنامه‌ها: نقاشی، بازی، مرورگر", "Apps: drawing, games, browser"), "#d7ecf8", 22, "a"], [T("سیستم‌عامل", "Operating system"), "#e7f3e0", 44, "o"], [T("سخت‌افزار: پردازنده، حافظه، صفحه", "Hardware: processor, memory, screen"), "#f3e6cf", 66, "h"]];
      return g(L.map(function (l) {
        return hide(l[3], '<rect x="6" y="' + (l[2] - 11) + '" width="72" height="22" rx="3" fill="#fcd34d"/>') + '<rect x="9" y="' + (l[2] - 8) + '" width="66" height="16" rx="2" fill="' + l[1] + '"/>' + text(42, l[2] + 1.6, 4, l[0]);
      }).join(""));
    },
    /* Memory with four instructions (x 96 to 150) and the processor (tw-cpu) reading them; pieces "i1" … "i4" light the
       instruction being run (stage units at their place). */
    "tf-program": function () {
      var I = ["LOAD 5", "ADD 3", "SHOW", "STOP"];
      return '<rect x="96" y="12" width="56" height="50" rx="2" fill="#3f8f5a" stroke="#3d2c22" stroke-width=".6"/>' + text(124, 9, 4.2, T("حافظه", "memory")) +
        I.map(function (t, i) { var y = 22 + 11 * i; return hide("i" + (i + 1), '<rect x="98" y="' + (y - 5) + '" width="52" height="9" fill="#fcd34d"/>') + '<rect x="99" y="' + (y - 4) + '" width="50" height="7" fill="#e8f5e9" stroke="#3d2c22" stroke-width=".3"/>' + code(102, y + 1.4, 4.6, B.fa(i + 1) + "  " + t); }).join("");
    }
  });

  /* ---------- codes and keys (think-forest-17) ---------- */
  var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  Object.assign(B.RIG, {
    /* A shift code: the alphabet in a row and, under it, a second row moved by 3 (piece "shift" slides it); English
       letters in both languages, as in real codes (origin: the middle of the rows). */
    "tf-shift": function () {
      var top = "", bot = "", w = 5.6;
      for (var i = 0; i < 12; i++) {
        top += '<rect x="' + f(-34 + i * w) + '" y="-10" width="' + w + '" height="8" fill="#fff" stroke-width=".3"/>' + code(-34 + i * w + 1.4, -4, 4.6, ABC[i]);
        bot += '<rect x="' + f(-34 + i * w) + '" y="0" width="' + w + '" height="8" fill="#e7f3e0" stroke-width=".3"/>' + code(-34 + i * w + 1.4, 6, 4.6, ABC[(i + 3) % 26]);
      }
      return g(top + part("shift", bot));
    },
    // A word and its code (look.k: "plain" CAT or "secret" FDW; origin: its middle).
    "tf-word": function (look) { return g('<rect x="-16" y="-6" width="32" height="12" rx="3" fill="#fff"/>' + code(-10, 2.4, 6.4, look.k === "secret" ? "FDW" : "CAT", look.k === "secret" ? "#5a9a45" : "#3d2c22")); },
    // A phone showing a 6-digit sign-in code (origin: its middle).
    "tf-otp": g('<rect x="-9" y="-15" width="18" height="30" rx="2.4" fill="#3a3f4b"/><rect x="-7.4" y="-12" width="14.8" height="23" fill="#fff"/>' +
      '<text y="1" text-anchor="middle" font-size="4.6" font-family="ui-monospace,monospace" font-weight="800" fill="#3d2c22" stroke="none">482 913</text>')
  });

  /* ---------- what an app asks for (think-forest-18) ---------- */
  Object.assign(B.RIG, {
    /* A phone with an app asking for permissions: location, contacts, microphone; each a row with a switch: pieces
       "on1"…"on3" (allowed, green) and "off1"…"off3" (not allowed) (origin: the middle of the screen). */
    "tf-perms": function () {
      var R = [["📍", T("مکان", "Location")], ["👥", T("مخاطبان", "Contacts")], ["🎤", T("میکروفون", "Microphone")]], out = "";
      R.forEach(function (r, i) {
        var y = -10 + 11 * i, sx = en() ? 12 : -12, lx = en() ? -14 : 14;
        out += text(lx + (en() ? 8 : -8), y + 1.6, 4.4, r[1]) + '<circle cx="' + lx + '" cy="' + y + '" r="2.4" fill="' + ["#e5483f", "#5b9bd5", "#9aa5b1"][i] + '"/>' +
          '<rect x="' + (sx - 4) + '" y="' + (y - 2.4) + '" width="8" height="4.8" rx="2.4" fill="#cbd5e0"/>' +
          hide("on" + (i + 1), '<rect x="' + (sx - 4) + '" y="' + (y - 2.4) + '" width="8" height="4.8" rx="2.4" fill="#5a9a45"/><circle cx="' + (sx + 1.6) + '" cy="' + y + '" r="1.8" fill="#fff"/>') +
          part("off" + (i + 1), '<circle cx="' + (sx - 1.6) + '" cy="' + y + '" r="1.8" fill="#fff"/>');
      });
      return g('<rect x="-22" y="-26" width="44" height="52" rx="4" fill="#3a3f4b"/><rect x="-19" y="-22" width="38" height="44" fill="#fff"/>' +
        text(0, -16, 4.2, T("این برنامه اجازه می‌خواهد:", "This app asks for:")) + out);
    }
  });

  /* ---------- posts, ads and made-up pictures (think-forest-19) ---------- */
  Object.assign(B.RIG, {
    /* A post card (look.k: "news" a news post with its source, "ad" a sponsored post with its small «آگهی» mark,
       "ai" a picture made by AI with its small mark) (origin: its middle; 44 × 34). Piece "tag" lights the mark. */
    "tf-post": function (look) {
      var k = look.k || "news", tagx = en() ? 12 : -12;
      var tagT = { news: T("منبع: سازمان هواشناسی", "Source: weather service"), ad: T("آگهی", "Sponsored"), ai: T("ساخته هوش مصنوعی", "Made by AI") }[k];
      var body = k === "news" ? pic("🌧️", 0, -2, 14) : k === "ad" ? pic("👟", 0, -2, 14) : '<circle cy="-2" r="6" fill="#f3c39b"/><circle cx="-2" cy="-3" r=".8" fill="#3d2c22"/><circle cx="2" cy="-3" r=".8" fill="#3d2c22"/><circle cx="0" cy="-5.6" r=".8" fill="#3d2c22"/>';
      return g('<rect x="-22" y="-17" width="44" height="34" rx="2" fill="#fff"/>' + body +
        hide("tag", '<rect x="' + (tagx - 18) + '" y="8" width="36" height="7" rx="2" fill="#fcd34d" stroke="none"/>') + text(tagx, 13, 3.4, tagT, k === "news" ? "#3d7ab8" : "#c4673a"));
    }
  });

  /* ---------- examples that leave people out (think-forest-20) ---------- */
  Object.assign(B.RIG, {
    // A box of training examples (look.k: "few" only one kind of face, "all" many kinds) (origin: its middle; 50 × 24).
    "tf-data": function (look) {
      var tones = look.k === "all" ? ["#f7d7bb", "#c98f63", "#6a432b", "#e9bb92", "#9a6442", "#f3c39b"] : ["#f7d7bb", "#f7d7bb", "#f7d7bb", "#f7d7bb", "#f7d7bb", "#f7d7bb"];
      return g('<rect x="-25" y="-12" width="50" height="24" rx="3" fill="#fff" stroke-dasharray="1.6 1"/>' + tones.map(function (c, i) {
        var x = -17 + 7 * i; return '<circle cx="' + x + '" cy="-2" r="2.6" fill="' + c + '"/><path d="M' + (x - 3) + " 6c0-3 1.4-4.4 3-4.4s3 1.4 3 4.4z" + '" fill="#5b9bd5" stroke-width=".3"/>';
      }).join(""));
    },
    // A face to recognise (look.c: skin colour; origin: its middle).
    "tf-face": function (look) { return g('<circle r="7" fill="' + (look.c || "#6a432b") + '"/><circle cx="-2.4" cy="-1" r=".8" fill="#fff"/><circle cx="2.4" cy="-1" r=".8" fill="#fff"/><path d="M-2.4 3q2.4 1.6 4.8 0" fill="none" stroke="#fff" stroke-width=".6"/>'); }
  });

  /* ---------- a map becomes a graph (think-forest-23) ---------- */
  var TOWNS = [[28, 30], [70, 18], [62, 56], [112, 40], [132, 72], [96, 78]], ROADS = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 5], [3, 4], [5, 4]];
  Object.assign(B.RIG, {
    // Towns as little houses with winding roads (piece "map"), then the same as dots and straight lines (piece "graph").
    "tf-map": function () {
      var roads = ROADS.map(function (r) { var a = TOWNS[r[0]], b = TOWNS[r[1]]; return "M" + a.join(" ") + "Q" + f((a[0] + b[0]) / 2 + 6) + " " + f((a[1] + b[1]) / 2 - 6) + " " + b.join(" "); }).join("");
      var houses = TOWNS.map(function (t) { return '<rect x="' + (t[0] - 4) + '" y="' + (t[1] - 4) + '" width="8" height="7" fill="#f4a261"/><path d="M' + (t[0] - 5) + " " + (t[1] - 4) + "l5-4 5 4z" + '" fill="#c4673a"/>'; }).join("");
      var lines = ROADS.map(function (r) { return "M" + TOWNS[r[0]].join(" ") + "L" + TOWNS[r[1]].join(" "); }).join("");
      var dots = TOWNS.map(function (t) { return '<circle cx="' + t[0] + '" cy="' + t[1] + '" r="4" fill="#fff" stroke="#3d2c22" stroke-width="1"/>'; }).join("");
      return g(part("map", '<path d="' + roads + '" fill="none" stroke="#c8b08a" stroke-width="2.4"/>' + houses) +
        hide("graph", '<path d="' + lines + '" fill="none" stroke="#3d2c22" stroke-width="1.2"/>' + dots));
    }
  });

  /* ---------- switches in a row and side by side (think-forest-24) ---------- */
  Object.assign(B.RIG, {
    /* A circuit (look.k: "and" two switches in a row, "or" two switches side by side) with a battery and a lamp;
       pieces "a" and "b" close each switch (turn their lever), "lit" lights the lamp (origin: stage units at their
       place, the circuit spans x 20 to 140, y 20 to 80). */
    "tf-circuit": function (look) {
      var lever = function (name, x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="1.6" fill="#3d2c22"/><circle cx="' + (x + 14) + '" cy="' + y + '" r="1.6" fill="#3d2c22"/>' + part(name, '<path d="M' + x + " " + y + "l13 -8" + '" stroke="#3d2c22" stroke-width="1.6"/>', x + " " + y); };
      var w = 'fill="none" stroke="#9aa5b1" stroke-width="1.6"';
      var out = '<rect x="18" y="66" width="10" height="16" rx="1.4" fill="#f2c14e"/><rect x="20" y="62" width="6" height="4" fill="#3d2c22"/>';
      if (look.k === "or") {
        out += '<path d="M23 62V30H50M23 30V50H50M64 30H90V40M64 50H90V40H118M118 40V80H28" ' + w + '/>' + lever("a", 50, 30) + lever("b", 50, 50);
      } else {
        out += '<path d="M23 62V40H46M60 40H76M90 40H118M118 40V80H28" ' + w + '/>' + lever("a", 46, 40) + lever("b", 76, 40);
      }
      out += '<circle cx="128" cy="40" r="8" fill="#e2e8f0" stroke="#3d2c22"/>' + hide("lit", '<circle cx="128" cy="40" r="13" fill="#fcd34d" opacity=".35"/><circle cx="128" cy="40" r="8" fill="#fcd34d" stroke="#3d2c22"/>');
      return g(out) + text(30, 92, 4, "A", null, "middle") + text(80, 92, 4, "B", null, "middle");
    }
  });
})();
