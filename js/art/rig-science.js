/* باغچه — drawings for the science lessons' animated scenes (step type `scene`, js/scene.js), in the same style as
   js/art/rig.js: flat picture-book shapes, warm colours, a dark outline (#3d2c22), no text. Each drawing has its
   origin (0, 0) where it stands (the middle of its bottom edge), unless its comment says "centre" or "stage units"
   (drawn at its own place on the 160 × 90 stage). Moving pieces have data-part (and data-pivot, in the drawing's
   own units); a piece drawn with style="opacity:0" stays hidden until a track shows it. */
var B = window.B || {};
window.B = B;
B.RIG = B.RIG || {};

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var SKIN = "var(--skin,#f3c39b)";
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function piece(name, pivot, inner, hidden) {
    return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + (hidden ? ' style="opacity:0"' : "") + ">" + inner + "</g>";
  }
  // A line drawn twice, dark and wide under light and narrow: roots, rope, rivers.
  function twoTone(d, fill, w) {
    return '<path d="' + d + '" fill="none" stroke="#3d2c22" stroke-width="' + (w + 0.9) + '"/><path d="' + d + '" fill="none" stroke="' + fill + '" stroke-width="' + w + '"/>';
  }
  // A small pseudo-random number, the same every time (so drawings never change between loads).
  function rnd(i) { var x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); }
  // An orange highlight with a white halo round any shape (no fill).
  function glow(shape) {
    return '<g fill="none" stroke-linecap="round"><g stroke="#fff" stroke-width="2.6">' + shape + '</g><g stroke="#f59e0b" stroke-width="1.3">' + shape + "</g></g>";
  }
  function circles(list, r, fill, extra) {
    return list.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (p[2] || r) + '" fill="' + fill + '"' + (extra || "") + "/>"; }).join("");
  }

  var R = {};

  /* ================= things many scenes use ================= */
  R["sci-sky"] = '<rect width="160" height="90" fill="#cdeaf7"/>';
  // A grassy meadow, stage units: the grass starts at about y = 64.
  R["sci-meadow"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
    '<path d="M0 62c22-6 46-7 70-3s52 4 90-2v33H0z" fill="#a9d68b"/><path d="M0 70c30-3 70-3 100 0s44 1 60-1v21H0z" fill="#8cc66b" stroke="none"/>' +
    '<g fill="none" stroke="#5a9a45" stroke-width=".6"><path d="M8 84l-1.4-3M8 84v-3.4M8 84l1.4-3M150 80l-1.4-3M150 80v-3.4M150 80l1.4-3M118 88l-1.4-3M118 88v-3.4M118 88l1.4-3"/></g>');
  // The meadow's grass alone, without the sky (stage units), to put in front of the sky, sun and clouds.
  R["sci-ground"] = g('<path d="M0 62c22-6 46-7 70-3s52 4 90-2v33H0z" fill="#a9d68b"/><path d="M0 70c30-3 70-3 100 0s44 1 60-1v21H0z" fill="#8cc66b" stroke="none"/>');
  // A grey sky for rain and snow (stage units, down to the grass).
  R["sci-grey-sky"] = '<rect width="160" height="72" fill="#b9c4cc"/>';
  // A branch to stand on (origin: the middle of its top), 30 wide.
  R["sci-branch"] = g('<path d="M-15 1.4c8-2 20-2.6 30-1.4v2c-10-1-21-.6-30 1.4z" fill="#8a5a3b"/><path d="M6 .6c2-3 5-4 8-3.4-1 2.6-4 3.6-8 3.4zM-8 1c-2-3-5-3.6-7.6-2.6 1.2 2.4 4 3.2 7.6 2.6z" fill="#7cbf5a"/>');
  // The same ground cut open (stage units): sky above y = 56, grass, and brown soil down to the bottom.
  R["sci-soil"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="57" width="160" height="33" fill="#9a6a44"/>' +
    '<rect y="55" width="160" height="3" fill="#8cc66b"/>' +
    '<g fill="#7a5233" stroke="none">' + circles([[12, 70, 1.4], [30, 84, 1], [118, 66, 1.2], [146, 80, 1.6], [96, 86, 1], [44, 64, 0.8], [132, 88, 0.9]], 1) + "</g>");
  // Wet soil: a darker patch (centre).
  R["sci-wet"] = '<ellipse rx="18" ry="7" fill="#6e4a2e" opacity=".8"/>';
  // A table top seen from the front (stage units, y 70 to 90), on a warm wall.
  R["sci-table"] = g('<rect width="160" height="90" fill="#f6efdc" stroke="none"/><rect y="70" width="160" height="4" fill="#b57638"/><rect y="74" width="160" height="16" fill="#c98a4b"/>' +
    '<path d="M0 80h160M0 86h160" fill="none" stroke="#b57638" stroke-width=".4"/>');
  // A dark sky for night, and a grey one for rain (stage units).
  R["sci-night"] = '<rect width="160" height="90" fill="#1f2a52"/>';
  R["sci-grey"] = '<rect width="160" height="90" fill="#9aa9b5"/>';
  R["sci-dusk"] = '<rect width="160" height="90" fill="#f4b183"/>';
  // Stars on the night sky (stage units, top part); each little group is a piece, so they can twinkle in turn.
  R["sci-stars"] = (function () {
    var s = "";
    for (var k = 0; k < 3; k++) {
      var d = "";
      for (var i = 0; i < 8; i++) {
        var x = 6 + rnd(k * 10 + i) * 148, y = 4 + rnd(k * 10 + i + 50) * 40;
        d += "M" + x.toFixed(1) + " " + (y - 1.4).toFixed(1) + "l.45 1 1 .45-1 .45-.45 1-.45-1-1-.45 1-.45z";
      }
      s += piece("s" + k, "", '<path d="' + d + '" fill="#fff3b0"/>');
    }
    return s;
  })();
  // The sun (centre); its rays are a piece that can turn.
  R["sci-sun"] = g(piece("rays", "0 0", '<path d="M0-12l2 4h-4zM0 12l-2-4h4zM-12 0l4-2v4zM12 0l-4 2v-4zM-8.5-8.5l4.2 1.4-2.8 2.8zM8.5 8.5l-4.2-1.4 2.8-2.8zM8.5-8.5l-1.4 4.2-2.8-2.8zM-8.5 8.5l1.4-4.2 2.8 2.8z" fill="#f6b73c"/>') +
    '<circle r="6.5" fill="#fcd34d"/>');
  // The moon, a crescent (centre).
  R["sci-moon"] = g('<path d="M2-7a7 7 0 1 0 5 11.4A6 6 0 0 1 2-7z" fill="#fff3b0"/>');
  // A ray of light, 40 long along +x from the origin (turn it with r, stretch it with sx).
  R["sci-ray"] = '<path d="M0 0h40" fill="none" stroke="#f6b73c" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="3 2"/>';
  // A white cloud and a grey rain cloud (centre), about 26 wide.
  var CLOUD = "M-10 5c-4 0-5-5-1.6-6.4C-12-6.4-6.6-8.6-3.4-5.6-2.4-10.6 5.4-11 7-5.6c3.8-1 6.6 2.4 5.4 5.6 2.6.6 2 5-1 5z";
  R["sci-cloud"] = g('<path d="' + CLOUD + '" fill="#fff"/>');
  R["sci-cloud-grey"] = g('<path d="' + CLOUD + '" fill="#b0bec5"/>');
  // A ball (centre), so it can roll (turn) in place.
  R["sci-ball"] = g('<circle r="4" fill="#fff"/><path d="M-4 0c2-1.6 6-1.6 8 0M0-4c-1.6 2-1.6 6 0 8" fill="none" stroke="#e5483f" stroke-width=".8"/>');
  // A drop of water (centre).
  R["sci-drop"] = g('<path d="M0-3C-1.6-1-2.2.2-2.2 1.2a2.2 2.2 0 0 0 4.4 0C2.2.2 1.6-1 0-3z" fill="#9fd3f0"/>');
  // Falling snow over the whole stage (stage units). The flakes repeat every 20 down, from y = -200, so a part that
  // moves down by "+20" again and again looks like snow that keeps falling.
  R["sci-snowfall"] = (function () {
    var s = "";
    for (var y = -200; y < 90; y += 10) {
      var row = Math.round((y + 200) / 10) % 2;
      for (var x = 4 + row * 8; x < 160; x += 16) {
        var j = x * 7 + row;
        s += '<circle cx="' + (x + rnd(j) * 4).toFixed(1) + '" cy="' + (y + rnd(j + 3) * 4).toFixed(1) + '" r="' + (0.7 + rnd(j + 5) * 0.5).toFixed(2) + '"/>';
      }
    }
    return '<g fill="#fff" stroke="#9fb7c7" stroke-width=".25">' + s + "</g>";
  })();
  // Falling rain over the whole stage, the same way (it repeats every 12 down).
  R["sci-rainfall"] = (function () {
    var d = "";
    for (var y = -216; y < 90; y += 6) {
      var row = Math.round((y + 216) / 6) % 2;
      for (var x = 3 + row * 9; x < 160; x += 18) d += "M" + (x + rnd(x + row) * 3).toFixed(1) + " " + y + "l-1 3.4";
    }
    return '<path d="' + d + '" fill="none" stroke="#5b9bd5" stroke-width=".7" stroke-linecap="round" opacity=".8"/>';
  })();
  // Snow lying on the ground (stage units, from y = 64 down).
  R["sci-snow-ground"] = g('<path d="M0 64c20-4 44-5 70-2s54 3 90-1v29H0z" fill="#f4f8fb"/>');
  // A highlight ring (centre), like the one in js/art/rig.js: white under orange.
  R["sci-ring"] = '<circle r="6" fill="none" stroke="#fff" stroke-width="2.6"/><circle r="6" fill="none" stroke="#f59e0b" stroke-width="1.3"/>';
  // An arrow pointing right, 20 long from the origin (for "this one is eaten by that one").
  R["sci-arrow"] = '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h19M15-3.4L19.4 0 15 3.4" stroke="#fff" stroke-width="3"/><path d="M0 0h19M15-3.4L19.4 0 15 3.4" stroke="#e5483f" stroke-width="1.5"/></g>';
  // Sound: three arcs opening to the right (origin: where the sound starts). Flip it for the left.
  R["sci-waves"] = '<g fill="none" stroke-linecap="round"><g stroke="#fff" stroke-width="2.2"><path d="M4-4a6 6 0 0 1 0 8M8-7a10 10 0 0 1 0 14M12-10a14 14 0 0 1 0 20"/></g>' +
    '<g stroke="#e5483f" stroke-width="1"><path d="M4-4a6 6 0 0 1 0 8M8-7a10 10 0 0 1 0 14M12-10a14 14 0 0 1 0 20"/></g></g>';
  // One sound arc (centre), for sound that travels.
  R["sci-arc"] = '<g fill="none" stroke-linecap="round"><path d="M0-6a8 8 0 0 1 0 12" stroke="#fff" stroke-width="2.2"/><path d="M0-6a8 8 0 0 1 0 12" stroke="#e5483f" stroke-width="1"/></g>';
  // A musical note (centre).
  R["sci-note"] = g('<path d="M1.6-6v7.4" fill="none" stroke-width="1"/><path d="M1.6-6c1.6.6 3 1.6 3 3.6" fill="none" stroke-width="1"/><ellipse cx="-.2" cy="1.6" rx="2" ry="1.5" fill="#3d2c22" transform="rotate(-20 -.2 1.6)"/>');
  // Wind: three curly lines blowing right (origin: their left end), drawn like a pencil with `draw`.
  R["sci-wind"] = '<g fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round"><path d="M0-6h18c3 0 4-3 2-4.4"/><path d="M4 0h24c3 0 4 3 2 4.4"/><path d="M0 6h14"/></g>';

  /* ================= plants (science-seed-1, seed-3, sprout-1, sapling-6) ================= */
  // A seed: a brown bean (centre).
  R["sci-bean"] = g('<ellipse rx="3" ry="2" fill="#a0683f"/><path d="M-1 -.6c.6.4 1.4.4 2 0" fill="none" stroke-width=".4"/>');
  // A sunflower seed, the تخمه children know: dark, with light stripes (centre).
  R["sci-sf-seed"] = g('<path d="M0-4.4C1.8-2.6 2.8-.4 2.8 1.6 2.8 3.2 1.6 4.2 0 4.2S-2.8 3.2-2.8 1.6C-2.8-.4-1.8-2.6 0-4.4z" fill="#3a3a3a"/>' +
    '<path d="M-1.4-.8v3.6M0-2.8v6.2M1.4-.8v3.6" fill="none" stroke="#eee" stroke-width=".45"/>');
  // A sprout just out of the soil (origin: where it leaves the soil).
  R["sci-sprout"] = g('<path d="M-.5 0c-.3-3-.1-6 .4-8.4h.9c-.4 2.6-.6 5.6-.3 8.4z" fill="#5a9a45"/>' +
    '<path d="M.3-8c-1.6-2.2-4.2-2.8-6-1.8 1 2 3.8 2.8 6 1.8zM.3-8c1.6-2.2 4.2-2.8 6-1.8-1 2-3.8 2.8-6 1.8z" fill="#7cbf5a"/>');
  // Little roots under a sprout (origin: the top, at the soil line; they grow down).
  R["sci-roots-small"] = twoTone("M0 0c-.4 3-2 5-3.4 6.4M0 0c.2 4 .4 7 0 10M0 0c.6 2 2 4 3.4 5", "#f1e1c8", 0.8);
  // A young plant with leaves, 22 tall (origin: the soil).
  R["sci-plant"] = g('<path d="M-.8 0c-.4-8-.2-15 .2-22h1.2c-.2 7-.4 14 0 22z" fill="#5a9a45"/>' +
    '<g fill="#7cbf5a"><path d="M0-5c-3-2.6-7-2.8-9.4-.6 2.4 2.2 6.6 2.4 9.4.6z"/><path d="M0-10c3-2.6 7-2.8 9.4-.6-2.4 2.2-6.6 2.4-9.4.6z"/>' +
    '<path d="M0-15c-2.6-2.2-6-2.4-8-.4 2 1.8 5.6 2 8 .4z"/><path d="M.2-19.4c2-1.8 4.8-2 6.4-.4-1.6 1.6-4.4 1.8-6.4.4z"/></g>');
  // A pink flower that opens (centre).
  R["sci-bloom"] = g('<g fill="#f28baa">' + [0, 72, 144, 216, 288].map(function (a) {
    var r = a * Math.PI / 180; return '<circle cx="' + (Math.sin(r) * 2.8).toFixed(2) + '" cy="' + (-Math.cos(r) * 2.8).toFixed(2) + '" r="2.4"/>'; }).join("") +
    '</g><circle r="1.7" fill="#fcd34d"/>');
  // A red tulip (origin: the bottom of the flower, where the stem ends).
  R["sci-tulip"] = g('<path d="M-3.6-1.6c-.4-2.4 0-4.8 0-4.8l1.8 1.6L0-7.4l1.8 2.6 1.8-1.6s.4 2.4 0 4.8C3.2.4 1.8 1 0 1s-3.2-.6-3.6-2.6z" fill="#e5483f"/>');
  // A flower pot (origin: its bottom); the soil in it is at y = -11.
  R["sci-pot"] = g('<path d="M-7-10h14l-2 10h-10z" fill="#c4673a"/><rect x="-8" y="-12.4" width="16" height="3" rx="1" fill="#d27a4a"/><ellipse cy="-12.2" rx="6.6" ry=".9" fill="#7a5233"/>');
  // A watering can (origin: the middle of its body). Turn it with r -35 and the spout points down: water comes
  // out at about (-15.7, 3.7) × its size.
  R["sci-can"] = g('<path d="M-6 3L-15-5l1.2-1.6L-6-1z" fill="#5b9bd5"/><circle cx="-15" cy="-6" r="1.5" fill="#5b9bd5"/>' +
    '<path d="M-2-5c0-4.4 8-4.4 8 0" fill="none" stroke="#3d6fa0" stroke-width="1.4"/><rect x="-6" y="-5" width="12" height="10" rx="1.5" fill="#5b9bd5"/>' +
    '<path d="M-3-2h6" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>');
  /* A sunflower with its roots (origin: the soil line), 56 tall. Pieces: roots (below the soil), leaves, head
     (petals and the brown middle, turning around its centre) and seeds (hidden: the new seeds in the middle). */
  R["sci-sunflower"] = (function () {
    var petals = "";
    for (var i = 0; i < 14; i++) petals += '<ellipse cx="0" cy="-8.4" rx="2.2" ry="4.2" fill="#fcd34d" transform="rotate(' + (i * 360 / 14) + ')"/>';
    var seeds = "";
    for (var n = 1; n < 46; n++) {
      var a = n * 2.39996, r = 0.72 * Math.sqrt(n);
      seeds += '<ellipse cx="' + (Math.cos(a) * r).toFixed(2) + '" cy="' + (Math.sin(a) * r).toFixed(2) + '" rx=".42" ry=".6" transform="rotate(' + (a * 57.3).toFixed(0) + " " + (Math.cos(a) * r).toFixed(2) + " " + (Math.sin(a) * r).toFixed(2) + ')"/>';
    }
    return g(piece("roots", "0 0", twoTone("M0 0c-1 6-6 10-11 14M0 0c0 8 1 14 0 22M0 0c2 5 7 9 12 12M-4 7c-3 1-6 3-8 3M4 6c3 0 6 2 8 2M0 12c-2 2-4 3-6 3M-7 11c-1 3-1 5-2 7M7 10c1 3 2 5 2 7", "#f1e1c8", 0.9)) +
      '<path d="M-1.3 0C-1.7-14-1.5-28-1-44h2c.5 16 .7 30 .3 44z" fill="#5a9a45"/>' +
      piece("leaves", "0 -22", '<g fill="#6fae4e"><path d="M-1-14c-6-1.6-12-.4-15.4 4 4.4 2 10.6.6 15.4-4z"/><path d="M1-24c6-2 12.4-.8 15.6 3.4-4.4 2-10.6.8-15.6-3.4z"/>' +
        '<path d="M-1-32c-4.4-1.2-9-.2-11.4 3 3.2 1.4 7.8.4 11.4-3z"/></g><path d="M-1-14l-10 2.6M1-24l11 1.8M-1-32l-8 2" fill="none" stroke-width=".35"/>') +
      piece("head", "0 -46", '<g transform="translate(0 -46)">' + petals + '<circle r="6" fill="#7a5233"/>' +
        piece("seeds", "", '<g fill="#e8dcc4" stroke="#3d2c22" stroke-width=".15">' + seeds + "</g>", true) + "</g>") +
      // highlights round each part (hidden): roots, stem, leaves, head
      piece("glowRoots", "0 10", glow('<ellipse cy="11" rx="15" ry="13"/>'), true) +
      piece("glowStem", "0 -22", glow('<rect x="-4" y="-41" width="8" height="41" rx="4"/>'), true) +
      piece("glowLeaves", "0 -22", glow('<path d="M-17-10c0-4 5-7 15-6M17-21c0-4-5-6-15-4M-13-28c0-3 4-5 11-4"/>'), true) +
      piece("glowHead", "0 -46", glow('<circle cy="-46" r="14"/>'), true));
  })();

  /* ================= science-seed-1: alive or not alive ================= */
  // A bowl of milk (origin: its bottom); the milk is a piece that gets smaller as the kitten drinks.
  R["sci-bowl"] = g('<path d="M-7-5h14c0 3.4-3 5-7 5s-7-1.6-7-5z" fill="#5b9bd5"/>' + piece("milk", "0 -5", '<ellipse cy="-5" rx="6.2" ry="1.3" fill="#fff"/>') +
    '<path d="M-7-5c0 .8 3 1.6 7 1.6s7-.8 7-1.6" fill="none" stroke-width=".4"/>');

  /* ================= science-seed-2: the five senses ================= */
  /* A child's face from the front, with shoulders (origin: the middle of the head). Pieces: eyes (blink with sy),
     pupils (look with x), earL (the ear on the left of the picture), nose, smile, open (the mouth open, with the
     tongue; hidden). */
  R["sci-face"] = g('<path d="M-19 36c0-11 8-16 19-16s19 5 19 16z" fill="#5b9bd5"/><rect x="-4" y="16" width="8" height="7" fill="' + SKIN + '"/>' +
    '<ellipse cx="19.6" cy="2" rx="3.6" ry="5" fill="' + SKIN + '"/><circle r="20" fill="' + SKIN + '"/>' +
    piece("earL", "-19 2", '<ellipse cx="-20" cy="2" rx="3.6" ry="5" fill="' + SKIN + '"/><path d="M-20.8-.6c-1 1-1 3.4 0 4.6" fill="none" stroke-width=".4"/>') +
    '<path d="M-20-1c0-14 9-21 20-21s20 7 20 21c-3-7-10-11-20-11S-17-8-20-1z" fill="#5b3a29"/>' +
    '<g fill="#f6a5a5" stroke="none" opacity=".6"><circle cx="-11" cy="7" r="2.6"/><circle cx="11" cy="7" r="2.6"/></g>' +
    piece("eyes", "0 0", '<ellipse cx="-7" cy="0" rx="3.2" ry="3.6" fill="#fff"/><ellipse cx="7" cy="0" rx="3.2" ry="3.6" fill="#fff"/>' +
      piece("pupils", "", '<circle cx="-7" cy=".4" r="1.7" fill="#3d2c22"/><circle cx="7" cy=".4" r="1.7" fill="#3d2c22"/>')) +
    piece("nose", "0 5", '<path d="M-.4 2.4c-1.2 2-1.4 3.6.6 4" fill="none" stroke-width=".7"/>') +
    piece("smile", "", '<path d="M-5 10.4q5 4 10 0" fill="none" stroke-width=".8"/>') +
    piece("open", "0 11", '<path d="M-5 9.6q5-1.4 10 0-1 5.6-5 5.6t-5-5.6z" fill="#9c3f33"/><ellipse cx="0" cy="13" rx="2.8" ry="1.6" fill="#f28baa" stroke="none"/>', true));
  // A rainbow (origin: the middle of its bottom); only lines, so `draw` can paint it.
  R["sci-rainbow"] = '<g fill="none" stroke-width="2.2" stroke-linecap="round">' + ["#e5483f", "#f59e0b", "#fcd34d", "#5a9a45", "#5b9bd5", "#8e6cc4"].map(function (c, i) {
    var r = 24 - i * 2.2; return '<path d="M' + (-r) + ' 0a' + r + " " + r + " 0 0 1 " + (2 * r) + ' 0" stroke="' + c + '"/>'; }).join("") + "</g>";
  // A sparrow from the side, facing right (origin: its feet). Pieces: wing (flaps), beak (the lower beak opens).
  R["sci-sparrow"] = g('<path d="M-6-5.4L-12.6-7l1.4 3.4z" fill="#8a5a3b"/><path d="M-1.4-.8v1.2M1.2-.8v1.2" fill="none"/>' +
    '<ellipse cx="-1" cy="-5" rx="6.4" ry="4.4" fill="#b07a4f"/><ellipse cx=".4" cy="-3.6" rx="4.2" ry="2.6" fill="#f1e1c8" stroke="none"/>' +
    '<circle cx="4" cy="-9.4" r="3.6" fill="#b07a4f"/><path d="M2.2-12.4c1.6-.8 3.4-.6 4.6.4" fill="none" stroke="#8a5a3b" stroke-width="1.2"/>' +
    '<ellipse cx="3.6" cy="-8" rx="1.6" ry="1" fill="#fff" stroke="none"/><circle cx="5.2" cy="-10" r=".6" fill="#3d2c22" stroke="none"/>' +
    piece("beak", "7 -8.6", '<path d="M7-8.8l2.6.4-2.4.8z" fill="#f6b73c"/>') + '<path d="M7-9.8l3 .9-3 .5z" fill="#f6b73c"/>' +
    piece("wing", "0 -7", '<path d="M-4.6-7.4c2.2-2 6.4-2 7.4.2-1.2 3-5.4 4-8.4 2.6z" fill="#8a5a3b"/><path d="M-3-5.4l3.6-.6" fill="none" stroke="#f1e1c8" stroke-width=".4"/>'));
  // A red rose on its stem (origin: the bottom of the stem).
  R["sci-rose"] = g('<path d="M-.5 0c-.3-6-.2-12 .3-18h1c-.4 6-.5 12-.3 18z" fill="#5a9a45"/><path d="M0-8c-3-2-6-1.6-7.4.6 2.4 1.4 5.4 1 7.4-.6z" fill="#7cbf5a"/>' +
    '<path d="M-5-21c0-3 2.4-5 5-5s5 2 5 5c0 3.2-2.2 5-5 5s-5-1.8-5-5z" fill="#e5483f"/><path d="M-2.6-21.6c.6-1.6 3.6-1.6 4 .4.4 2-2.4 2.6-3 .8M-4-23c2-2 6-2 7.6.2" fill="none" stroke="#9c2f2a" stroke-width=".5"/>');
  // A smell in the air: three wavy lines going right (origin: their left end).
  R["sci-scent"] = '<g fill="none" stroke="#c49bd8" stroke-width="1" stroke-linecap="round"><path d="M0-4c4-3 6 3 10 0s6 3 10 0 6 3 10 0 6 3 10 0"/><path d="M2 1c4-3 6 3 10 0s6 3 10 0 6 3 10 0 6 3 10 0"/><path d="M0 6c4-3 6 3 10 0s6 3 10 0 6 3 10 0 6 3 10 0"/></g>';
  // A slice of watermelon, flat side up (origin: the middle of the flat side). Pieces: whole, bitten (hidden).
  var MELON = "M-9 0H9A9 9 0 0 1-9 0z", MELON_IN = "M-7.4 0H7.4A7.4 7.4 0 0 1-7.4 0z";
  var BITTEN = "M-9 0H-3.6a3.6 3.6 0 0 0 7.2 0H9A9 9 0 0 1-9 0z", BITTEN_IN = "M-7.4 0H-3.6a3.6 3.6 0 0 0 7.2 0H7.4A7.4 7.4 0 0 1-7.4 0z";
  var PIPS = '<g fill="#3d2c22" stroke="none"><ellipse cx="-4" cy="2.4" rx=".5" ry=".8"/><ellipse cx="4.4" cy="2.6" rx=".5" ry=".8"/><ellipse cx="-1.2" cy="4.6" rx=".5" ry=".8"/><ellipse cx="2" cy="4.4" rx=".5" ry=".8"/></g>';
  R["sci-melon"] = g(piece("whole", "", '<path d="' + MELON + '" fill="#5a9a45"/><path d="' + MELON_IN + '" fill="#f06a6a" stroke="none"/>' + PIPS) +
    piece("bitten", "", '<path d="' + BITTEN + '" fill="#5a9a45"/><path d="' + BITTEN_IN + '" fill="#f06a6a" stroke="none"/>' + PIPS, true));
  // A sheep, facing left (origin: its feet). Pieces: wool (a soft fluffy coat that can squash a little), eyes.
  R["sci-sheep"] = g('<path d="M-8 0v-8M-3 0v-8M5 0v-8M10 0v-8" fill="none" stroke-width="1.8"/>' +
    piece("wool", "0 -9", circles([[-9, -14, 4.6], [-3, -17, 5], [4, -17, 5], [10, -14, 4.6], [-6, -10, 4.6], [1, -10, 5], [8, -10, 4.6]], 4, "#fbf7ee")) +
    '<ellipse cx="-14" cy="-15" rx="4" ry="5" fill="#5b4a42" transform="rotate(20 -14 -15)"/><ellipse cx="-11.6" cy="-18.4" rx="2" ry="1.2" fill="#5b4a42" transform="rotate(-30 -11.6 -18.4)"/>' +
    piece("eyes", "", '<circle cx="-15" cy="-16" r=".7" fill="#fff" stroke="none"/>') + '<path d="M-17-12.6c.6.4 1.4.4 2 0" fill="none" stroke="#fff" stroke-width=".4"/>');

  /* ================= science-seed-4: the sparrow's nest ================= */
  // A big tree with a long branch to the right (origin: the bottom of its trunk); a nest fits at (26, -38).
  R["sci-tree"] = g('<path d="M-4.6 0c1.4-12 1.4-26 .6-42h8c-.8 16-.8 30 .6 42z" fill="#8a5a3b"/>' +
    '<path d="M3-30c7-3 17-8 40-11l.4 2.4c-21 3-29 8-39.4 11.6z" fill="#8a5a3b"/>' +
    '<g fill="#5a9a45">' + circles([[-15, -50, 14], [0, -60, 16], [13, -50, 12], [-4, -44, 12], [-24, -40, 8], [6, -42, 9]], 10, "#5a9a45") + "</g>" +
    '<g fill="#7cbf5a" stroke="none">' + circles([[-10, -60, 4], [6, -66, 4], [14, -54, 3], [-20, -46, 3]], 3, "#7cbf5a") + "</g>");
  // The nest, in three drawings: its back (behind the eggs), its front, and its lines alone (to draw them).
  var NEST = "M-9-5c1 4 4 5.6 9 5.6S8-1 9-5c-3 1-6 1.4-9 1.4S-6-4-9-5z";
  var NEST_TWIGS = "M-8-3.4c5 1.6 11 1.6 16-.6M-7.4-1.4c4 1.6 10 1.4 14.6-.6M-10-5.6l3 1.4M10-5.4l-3 1.6M-4-.2l-2.4 1.2M5 0l2 1.4";
  R["sci-nest-back"] = g('<ellipse cy="-5" rx="9" ry="2.2" fill="#6e4a2e"/>');
  R["sci-nest"] = g('<path d="' + NEST + '" fill="#a0683f"/><path d="' + NEST_TWIGS + '" fill="none" stroke-width=".45"/>');
  R["sci-nest-lines"] = '<g fill="none" stroke="#6e4a2e" stroke-width=".8" stroke-linecap="round"><path d="' + NEST + '"/><path d="' + NEST_TWIGS + '"/></g>';
  // A twig in the beak (origin: its middle).
  R["sci-twig"] = '<path d="M-4 .6L4-.6M1-.2l1.6-1.4" fill="none" stroke="#6e4a2e" stroke-width=".8" stroke-linecap="round"/>';
  // Two eggs (origin: between them, at their bottom). The right one hatches: its pieces are top and bottom.
  var EGG_BOTTOM = "M-2.6-3.2L-1.7-2.4-.9-3.2 0-2.4.9-3.2 1.7-2.4 2.6-3.2C2.6-1.2 1.6 0 0 0S-2.6-1.2-2.6-3.2z";
  var EGG_TOP = "M-2.6-3.2L-1.7-2.4-.9-3.2 0-2.4.9-3.2 1.7-2.4 2.6-3.2C2.6-5.4 1.4-6.8 0-6.8S-2.6-5.4-2.6-3.2z";
  R["sci-eggs"] = g('<ellipse cx="-3" cy="-3.4" rx="2.6" ry="3.4" fill="#dcefee"/><g fill="#9bb" stroke="none"><circle cx="-3.6" cy="-4.4" r=".4"/><circle cx="-2.2" cy="-2.4" r=".35"/></g>' +
    '<g transform="translate(3 0)">' + piece("bottom", "", '<path d="' + EGG_BOTTOM + '" fill="#dcefee"/>') + piece("top", "0 -3", '<path d="' + EGG_TOP + '" fill="#dcefee"/><circle cx=".8" cy="-4.6" r=".4" fill="#9bb" stroke="none"/>') + "</g>");
  // A chick (origin: its bottom), facing right. Piece: beak (the lower beak opens wide).
  R["sci-chick"] = g('<path d="M-3.2-3.4l-1.6-1.6.4 2.2z" fill="#f6c94b"/><circle cy="-3.4" r="3.4" fill="#fcd34d"/>' +
    '<path d="M-1.6-6.6c.2-1 1-1.6 1.6-1.2M0-6.8c.4-1 1.4-1.2 1.8-.6" fill="none" stroke-width=".4"/>' +
    '<circle cx="1.2" cy="-4.4" r=".5" fill="#3d2c22" stroke="none"/><path d="M3-4.4l2.6.2-2.4 1z" fill="#f59e0b"/>' + piece("beak", "3 -3.6", '<path d="M3-3.6l2.4.6-2.4.4z" fill="#f59e0b"/>'));
  // A worm (centre).
  R["sci-worm"] = g('<path d="M-4 0c1-1.6 2-1.6 3 0s2 1.6 3 0 2-1.6 3 0" fill="none" stroke="#3d2c22" stroke-width="2"/><path d="M-4 0c1-1.6 2-1.6 3 0s2 1.6 3 0 2-1.6 3 0" fill="none" stroke="#f28baa" stroke-width="1.2"/>');

  /* ================= science-seed-5: what's the weather? ================= */
  /* A child from the front (origin: between the feet), 44 tall. Clothes are separate drawings in the same units
     (sci-hat, sci-coat, sci-scarf, sci-gloves): put one at the child's place and size and it is worn. */
  function kid(hair, shirt, scarf) {
    return g('<ellipse cx="-3.4" cy="-1" rx="2.8" ry="1.4" fill="#5b3a29"/><ellipse cx="3.4" cy="-1" rx="2.8" ry="1.4" fill="#5b3a29"/>' +
      '<rect x="-5" y="-15" width="4" height="14" fill="#3f5f8f"/><rect x="1" y="-15" width="4" height="14" fill="#3f5f8f"/>' +
      '<rect x="-11" y="-28.4" width="4" height="14" rx="2" fill="' + shirt + '" transform="rotate(8 -9 -28)"/><rect x="7" y="-28.4" width="4" height="14" rx="2" fill="' + shirt + '" transform="rotate(-8 9 -28)"/>' +
      '<circle cx="-10.4" cy="-13.4" r="2" fill="' + SKIN + '"/><circle cx="10.4" cy="-13.4" r="2" fill="' + SKIN + '"/>' +
      '<path d="M-7-29.6h14l1 15h-16z" fill="' + shirt + '"/><rect x="-1.6" y="-31" width="3.2" height="2" fill="' + SKIN + '"/>' +
      (hair === "long" ? '<path d="M-7.6-37c0-6 3.4-9 7.6-9s7.6 3 7.6 9c0 4-.4 8-1.6 10H-6c-1.2-2-1.6-6-1.6-10z" fill="#5b3a29"/>' : "") +
      (hair === "scarf" ? '<path d="M-8.6-36.4c0-6.6 3.8-10.2 8.6-10.2s8.6 3.6 8.6 10.2l-.8 7.4H-7.8z" fill="' + scarf + '"/>' : "") +
      '<circle cy="-37" r="7" fill="' + SKIN + '"/>' +
      (hair === "long" ? '<path d="M-7.4-38c0-5 3.4-8.4 7.4-8.4s7.4 3.4 7.4 8.4c-3-.6-5-2.4-6-4.4-1.6 2.4-4.6 4-8.8 4.4z" fill="#5b3a29"/>'
        : hair === "scarf" ? '<path d="M-7.6-38.4c.8-4.6 4-6.6 7.6-6.6s6.8 2 7.6 6.6c-2.2-1.6-4.8-2.2-7.6-2.2s-5.4.6-7.6 2.2z" fill="' + scarf + '"/>'
        : '<path d="M-7.2-38.4c0-5 3.4-8 7.2-8s7.2 3 7.2 8c-2-2-4.4-3-7.2-3s-5.2 1-7.2 3z" fill="#2f2420"/>') +
      '<g fill="#3d2c22" stroke="none"><circle cx="-2.4" cy="-37.4" r=".75"/><circle cx="2.4" cy="-37.4" r=".75"/></g>' +
      '<path d="M-2.2-34q2.2 1.8 4.4 0" fill="none" stroke-width=".55"/><g fill="#f6a5a5" stroke="none" opacity=".6"><circle cx="-4.4" cy="-34.6" r="1.2"/><circle cx="4.4" cy="-34.6" r="1.2"/></g>');
  }
  // A girl: whether she wears a headscarf is chosen by B.headscarf (js/art/rig.js), so give her part
  // look: { hair: "auto", kind: "girl" }.
  R["sci-kid-girl"] = function (look) {
    var key = (look && look.key) || "sci-kid-girl";
    return kid(B.headscarf && B.headscarf(key, "girl") ? "scarf" : "long", "#f28baa", "#3fb0a8");
  };
  R["sci-kid-boy"] = kid("short", "#7cbf5a");
  R["sci-hat"] = g('<path d="M-6.4-42.6c0-4.6 2.8-6.6 6.4-6.6s6.4 2 6.4 6.6z" fill="#f6d58a"/><ellipse cy="-42.4" rx="11.4" ry="2.4" fill="#f6d58a"/><path d="M-6.2-44h12.4" fill="none" stroke="#e5483f" stroke-width="1.2"/>');
  R["sci-coat"] = g('<rect x="-12.2" y="-29.6" width="5.2" height="15.4" rx="2.2" fill="#c0504d" transform="rotate(8 -9.6 -29)"/><rect x="7" y="-29.6" width="5.2" height="15.4" rx="2.2" fill="#c0504d" transform="rotate(-8 9.6 -29)"/>' +
    '<path d="M-8-30.2h16l1.6 17.4H-9.6z" fill="#c0504d"/><path d="M0-30v17" fill="none" stroke-width=".5"/><g fill="#fcd34d"><circle cx="1.6" cy="-25" r=".7"/><circle cx="1.6" cy="-20" r=".7"/><circle cx="1.6" cy="-15.4" r=".7"/></g>');
  R["sci-scarf"] = g('<rect x="-6.4" y="-31.6" width="12.8" height="3.4" rx="1.6" fill="#5a9a45"/><rect x="2" y="-30" width="3.4" height="10" rx="1" fill="#5a9a45"/>' +
    '<path d="M2-23h3.4M2-21.4h3.4" fill="none" stroke="#fff" stroke-width=".6"/>');
  R["sci-gloves"] = g('<circle cx="-10.6" cy="-13" r="2.6" fill="#f59e0b"/><circle cx="10.6" cy="-13" r="2.6" fill="#f59e0b"/>');
  // An umbrella (origin: the bottom of the handle). Pieces: closed, open (hidden; it opens with sx).
  R["sci-umbrella"] = g('<path d="M0 0c0 2.6-3.2 2.6-3.2.6" fill="none" stroke-width="1"/><path d="M0 0v-44" fill="none" stroke-width="1"/>' +
    piece("closed", "", '<path d="M0-56l2.4 15h-4.8z" fill="#5b9bd5"/>') +
    piece("open", "0 -44", '<path d="M-19-42c0-9 8-15 19-15s19 6 19 15c-2.2-1.6-4.2-1.6-6.4 0-2-1.6-4.4-1.6-6.4 0-2-1.6-4.2-1.6-6.2 0-2-1.6-4.4-1.6-6.4 0-2-1.6-4.2-1.6-6.4 0-2.2-1.6-4.2-1.6-6.4 0z" fill="#5b9bd5"/>' +
      '<path d="M0-57v15M-6.4-56c-1.6 4-2 10-1 14M6.4-56c1.6 4 2 10 1 14" fill="none" stroke-width=".4"/>', true));
  // A coat stand (origin: its foot), 52 tall, with hooks at (±6, -46) and (±6, -36).
  R["sci-rack"] = g('<path d="M-9 0l9-4 9 4" fill="none" stroke="#8a5a3b" stroke-width="1.6"/><rect x="-1.2" y="-52" width="2.4" height="50" fill="#a0683f"/>' +
    '<path d="M0-46h5.4v-2M0-46h-5.4v-2M0-36h5.4v-2M0-36h-5.4v-2" fill="none" stroke="#8a5a3b" stroke-width="1"/>');

  /* ================= science-seed-6: mixing colours ================= */
  function jar(c) {
    return g('<rect x="-5.6" y="-12" width="11.2" height="12" rx="1.6" fill="#eef6f8"/><rect x="-5" y="-8" width="10" height="7.6" rx="1.2" fill="' + c + '" stroke="none"/>' +
      '<rect x="-6.4" y="-14" width="12.8" height="2.6" rx=".8" fill="#d8d0c0"/><path d="M-3.6-10.6v5" fill="none" stroke="#fff" stroke-width=".7" opacity=".6"/>');
  }
  var PAINT = { red: "#e5483f", yellow: "#fcd34d", blue: "#3f7fd0", orange: "#f58b1f", green: "#4caf50" };
  Object.keys(PAINT).forEach(function (k) {
    R["sci-jar-" + k] = jar(PAINT[k]);
    // Paint in the bowl, seen from the side (centre): an oval.
    R["sci-paint-" + k] = g('<ellipse rx="11" ry="2.4" fill="' + PAINT[k] + '"/>');
    // A thin stream of paint pouring down, 16 long (origin: its top).
    R["sci-stream-" + k] = '<path d="M0 0c-.4 6-.4 11 0 16" fill="none" stroke="' + PAINT[k] + '" stroke-width="1.8" stroke-linecap="round"/>';
  });
  // Two paints swirled together (centre): red and yellow, blue and yellow.
  function swirl(a, b) {
    return g('<ellipse rx="11" ry="2.4" fill="' + a + '"/><path d="M-9-.6c3-1.6 6 1.6 9 0s6-1.4 8.6.2c-2 1.4-5 1.6-8 .6s-6 1-9.6-.8z" fill="' + b + '" stroke="none"/>');
  }
  R["sci-swirl-ry"] = swirl(PAINT.red, PAINT.yellow);
  R["sci-swirl-by"] = swirl(PAINT.blue, PAINT.yellow);
  // A white bowl (origin: its bottom); the paint goes at (0, -9).
  R["sci-mixbowl"] = g('<path d="M-13-9h26c0 6-5 9-13 9s-13-3-13-9z" fill="#fff"/><path d="M-10-5c2 2 5 3 8 3" fill="none" stroke="#cfd8dc" stroke-width=".8"/>');
  // A paintbrush (origin: its tip), standing up.
  R["sci-brush"] = g('<rect x="-1" y="-24" width="2" height="16" rx="1" fill="#c98a4b"/><rect x="-1.4" y="-9" width="2.8" height="3" fill="#b8c0c8"/><path d="M-1.4-6c0 3 .6 5 1.4 6 .8-1 1.4-3 1.4-6z" fill="#3d2c22"/>');

  B.RIG = Object.assign(B.RIG, R);
  B.SCI = { twoTone: twoTone, piece: piece, g: g, rnd: rnd, circles: circles, glow: glow };
})();

/* ---------- the sprout garden: ice and steam, day and night, seasons, Iran's weather, materials ---------- */
(function () {
  var S = B.SCI, g = S.g, piece = S.piece, glow = S.glow, circles = S.circles, rnd = S.rnd;
  var R = {};

  /* ================= science-sprout-2: ice, water, steam ================= */
  // An ice cube (origin: the middle of its bottom), 14 wide and 12 tall, with its top and right side showing.
  R["sci-ice"] = g('<path d="M7-12l3-3v12l-3 3z" fill="#a9dbf2"/><path d="M-7-12l3-3h14l-3 3z" fill="#e6f7ff"/><rect x="-7" y="-12" width="14" height="12" rx="1" fill="#cfeefc"/>' +
    '<path d="M-4.6-9.4v4M-3-9.6h3" fill="none" stroke="#fff" stroke-width=".9"/>');
  // A plate (origin: the middle of its bottom).
  R["sci-plate"] = g('<ellipse cy="-1.6" rx="22" ry="3.4" fill="#fff"/><ellipse cy="-2" rx="15" ry="2" fill="none" stroke="#cfd8dc" stroke-width=".6"/>');
  // A puddle of water (centre).
  R["sci-puddle"] = '<ellipse rx="14" ry="2.2" fill="#7fc0ea" stroke="#3f7fd0" stroke-width=".4"/><path d="M-6-.6h5" stroke="#fff" stroke-width=".6" fill="none"/>';
  // Cold: little wisps rising from something cold (origin: their bottom middle), to draw like a pencil.
  R["sci-chill"] = '<g fill="none" stroke="#7fc4e8" stroke-width=".8" stroke-linecap="round"><path d="M-8 0c-1.6-2 1.6-4 0-6s1.6-4 0-6"/><path d="M0-2c-1.6-2 1.6-4 0-6s1.6-4 0-6"/><path d="M8 0c-1.6-2 1.6-4 0-6s1.6-4 0-6"/></g>';
  // A freezer, open (origin: its bottom middle), 28 wide and 40 tall. Its door is sci-freezer-door.
  R["sci-freezer"] = g('<rect x="-14" y="-40" width="28" height="40" rx="2" fill="#f4f8fb"/><rect x="-11.5" y="-37" width="23" height="34" rx="1" fill="#d9ecf5"/>' +
    '<path d="M-11.5-20h23" fill="none" stroke="#b8cdd8"/>' + circles([[-8, -34, .6], [6, -33, .5], [-3, -24, .5], [8, -26, .6]], .5, "#fff", ' stroke="none"'));
  // The freezer's door (origin: its hinge, the bottom right corner): put it at the freezer's x + 14 × its size.
  // sx .12 opens it (it folds to the hinge).
  R["sci-freezer-door"] = g('<rect x="-28" y="-40" width="28" height="40" rx="2" fill="#eef4f8"/><rect x="-25" y="-30" width="2" height="12" rx="1" fill="#b8c0c8"/>' +
    '<path d="M-20-34c1.6 0 2.4 1 2.4 2.4M-12-14l1.4 1.4" fill="none" stroke="#9fd3f0" stroke-width=".7"/>');
  // A glass (origin: its bottom middle), 10 wide and 12 tall. Pieces: water, ice (hidden).
  R["sci-cup"] = g(piece("water", "", '<path d="M-4.6-8h9.2l-.7 7.4h-7.8z" fill="#9fd3f0" stroke="none"/>') +
    piece("ice", "", '<path d="M-4.6-8h9.2l-.7 7.4h-7.8z" fill="#dff4fd" stroke="none"/><path d="M-3-6l2 2 1-2 2 3M-2-3l2 1.4" fill="none" stroke="#9fd3f0" stroke-width=".5"/>', true) +
    '<path d="M-5-12h10l-1 12h-8z" fill="#fff" fill-opacity=".25"/><path d="M-3.4-10.6v8" fill="none" stroke="#fff" stroke-width=".7"/>');
  // A glass of hot tea on its saucer, the Iranian estekan (origin: the middle of the saucer's bottom).
  R["sci-tea"] = g('<ellipse cy="-1.2" rx="11" ry="2.2" fill="#fff"/><path d="M-5-13c0 3 1.4 4 1.4 6.4S-5-3-4-2h8c1-1-1.4-2.6-1.4-5S5-10 5-13z" fill="#fff" fill-opacity=".35"/>' +
    '<path d="M-4.6-11.4c0 2.6 1.4 3.6 1.4 6S-4.4-3-3.6-2.4h7.2c.8-.6-.8-2.2-.8-4.6s1.4-3.4 1.4-6z" fill="#b5531f" stroke="none"/><path d="M-5-13h10" fill="none"/>' +
    '<path d="M-3.6-11v5" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>');
  // A wisp of steam (origin: its bottom), 12 tall.
  R["sci-steam"] = '<path d="M0 0c-2-2 2-4 0-6s2-4 0-6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".9"/><path d="M0 0c-2-2 2-4 0-6s2-4 0-6" fill="none" stroke="#b9c9d4" stroke-width="1" stroke-linecap="round"/>';
  // A cold lid (a small plate seen from the side, upside down; origin: its middle).
  R["sci-lid"] = g('<path d="M-12 0c0-2 5-3 12-3s12 1 12 3z" fill="#e3edf2"/><rect x="-2" y="-5" width="4" height="2" rx=".8" fill="#cfd8dc"/>');

  /* ================= science-sprout-4: day and night ================= */
  // Mountains (stage units): a big one on the right with a snowy top, a low hill on the left. The sun can rise
  // from behind the big one.
  R["sci-mountains"] = g('<path d="M84 74L128 28l32 34v12z" fill="#9c8670"/><path d="M119.4 37L128 28l8.4 9-3.4-1.4-4 2.4-3.6-2.4z" fill="#fff"/>' +
    '<path d="M108 74l20-24 18 14" fill="none" stroke="#86705c" stroke-width=".6"/><path d="M0 70c12-12 32-15 48-5v9H0z" fill="#8fae6b"/>');
  // A little house (origin: its bottom middle). Piece: light (the window lit at night; hidden).
  R["sci-house"] = g('<rect x="-12" y="-18" width="24" height="18" fill="#f6d58a"/><path d="M-15-17L0-30l15 13z" fill="#c0504d"/><rect x="-3" y="-10" width="6" height="10" fill="#a0683f"/>' +
    '<rect x="5" y="-14" width="5" height="5" fill="#bfe3f5"/><rect x="-10" y="-14" width="5" height="5" fill="#bfe3f5"/>' +
    piece("light", "", '<circle cx="0" cy="-11" r="12" fill="#fcd34d" opacity=".25" stroke="none"/><rect x="5" y="-14" width="5" height="5" fill="#fcd34d"/><rect x="-10" y="-14" width="5" height="5" fill="#fcd34d"/>', true));
  /* The Earth from space (centre), radius 26: sea, land, our house at the right edge and children at the left
     edge, each standing out from the ground. Its night half is a separate drawing that does not turn. */
  R["sci-globe"] = g('<circle r="26" fill="#5b9bd5"/><g fill="#7cbf5a">' +
    '<path d="M-20-12c4-6 12-8 16-4s2 8-4 10-8 6-12 2-3-5 0-8z"/><path d="M4-22c6-2 14 2 16 8s-4 6-8 4-10-6-8-12z"/><path d="M6 6c6-2 14 0 14 8s-8 10-12 6-6-12-2-14z"/>' +
    '<path d="M-14 12c4-2 8 0 8 4s-4 6-8 4-3-6 0-8z"/><path d="M14-6l12 0c0 4-1 8-2 10l-10-2z"/><path d="M-26 2l6-2c2 2 2 6 0 8l-5 0z"/></g>' +
    '<g transform="translate(26 0) rotate(90) scale(1.8)"><rect x="-2.4" y="-3.4" width="4.8" height="3.4" fill="#f6d58a"/><path d="M-3-3.2L0-5.6l3 2.4z" fill="#c0504d"/></g>' +
    '<g transform="translate(-26 0) rotate(-90) scale(1.8)" stroke-width=".4"><g fill="#f28baa"><rect x="-3.6" y="-4" width="2" height="4" rx=".6"/><rect x="1.4" y="-4" width="2" height="4" rx=".6"/></g>' +
    '<g fill="var(--skin,#f3c39b)"><circle cx="-2.6" cy="-5" r="1.2"/><circle cx="2.4" cy="-5" r="1.2"/></g><path d="M-3.6-3.4l-1.4-2.2M3.4-3.4l1.4-2.2" fill="none"/></g>');
  R["sci-globe-night"] = '<path d="M0-26a26 26 0 0 1 0 52z" fill="#1f2a52" opacity=".6"/>';

  /* ================= science-sprout-5: four seasons ================= */
  var BRANCHES = "M0-30C-4-38-10-44-18-50M0-34c0-8 0-16 1-24M1-30c5-6 10-12 16-18M-6-40c-4 0-7-2-9-4M8-42c3-2 6-2 9-1";
  // A tree with no leaves (origin: the bottom of its trunk); its crown goes at (0, -50).
  R["sci-tree-bare"] = g(S.twoTone(BRANCHES, "#8a5a3b", 2.2) + '<path d="M-4 0c1-12 1-22 .4-32h7.2c-.6 10-.6 20 .4 32z" fill="#8a5a3b"/>');
  // Snow lying on its branches (same origin).
  R["sci-tree-snow"] = '<path d="M-1-31.4C-5-39-10-45-18-51.4M-1-35c0-8 0-15 1-23.6M1-31.6c5-6 10-12 16-18M-6-41.4c-4 0-7-2-9-4M8-43.4c3-2 6-2 9-1" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>';
  // A crown of leaves (centre: put it at the tree's (0, -50)), green or in autumn colours.
  var CROWN = [[-14, 4, 12], [0, -8, 15], [14, 2, 12], [-6, 10, 11], [8, 12, 10], [-20, -6, 8], [18, -8, 8]];
  R["sci-crown"] = g(circles(CROWN, 10, "#5a9a45") + '<g stroke="none">' + circles([[-8, -6, 4], [8, -12, 3.6], [14, 6, 3], [-16, 4, 3]], 3, "#7cbf5a") + "</g>");
  R["sci-crown-autumn"] = g(CROWN.map(function (c, i) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + ["#f0a030", "#e5702f", "#f6c94b", "#d9542a"][i % 4] + '"/>'; }).join(""));
  // Blossoms on the crown (centre), each one a piece (b0 to b11), hidden until they open.
  R["sci-blossoms"] = (function () {
    var at = [[-16, 0], [-8, -14], [4, -18], [14, -8], [18, 4], [6, 4], [-4, 2], [-12, 12], [2, 16], [12, 14], [-20, -10], [-2, -8]];
    return g(at.map(function (p, i) {
      var f = '<g transform="translate(' + p[0] + " " + p[1] + ')">' + [0, 72, 144, 216, 288].map(function (a) {
        var r = a * Math.PI / 180; return '<circle cx="' + (Math.sin(r) * 1.4).toFixed(2) + '" cy="' + (-Math.cos(r) * 1.4).toFixed(2) + '" r="1.3" fill="#fbd3e0"/>'; }).join("") + '<circle r=".7" fill="#e5483f" stroke="none"/></g>';
      return piece("b" + i, p[0] + " " + p[1], f, true);
    }).join(""), ' stroke-width=".35"');
  })();
  // Fruit on the crown (centre): unripe green, and ripe red.
  var FRUIT = [[-14, -2], [-4, 6], [8, -6], [16, 6], [2, 16], [-12, 12], [10, 12], [-2, -12]];
  function fruits(c) { return g(FRUIT.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.4" fill="' + c + '"/><path d="M' + p[0] + " " + (p[1] - 2.4) + 'l.6-1.4" fill="none"/>'; }).join("")); }
  R["sci-fruits-green"] = fruits("#a8cf5a");
  R["sci-fruits-red"] = fruits("#e5483f");
  // A falling leaf (centre).
  R["sci-leaf-fall"] = g('<path d="M-3 0c0-2.4 2-4 5-4 0 3-2 4.4-5 4z" fill="#e5702f"/><path d="M-3 0l4-3" fill="none" stroke-width=".35"/>');
  R["sci-leaf-fall-y"] = g('<path d="M-3 0c0-2.4 2-4 5-4 0 3-2 4.4-5 4z" fill="#f6c94b"/><path d="M-3 0l4-3" fill="none" stroke-width=".35"/>');
  // Nowruz sabzeh: green sprouts in a dish with a red ribbon (origin: its bottom middle).
  R["sci-sabzeh"] = g('<path d="M-9-4h18c0 3-4 4-9 4s-9-1-9-4z" fill="#f4f4f2"/>' +
    '<path d="M-8-4c0-5 1-9 2-12M-5-4c0-6 0-10 1-14M-2-4c0-6 1-11 1-15M1-4c0-6 0-10 1-14M4-4c0-5 1-9 2-12M7-4c0-4 0-7 1-9M-6-4c-1-3-1-6-2-8M6-4c1-4 2-6 2-9" fill="none" stroke="#5a9a45" stroke-width=".9"/>' +
    '<path d="M-8.6-5.6h17.2v2h-17.2z" fill="#e5483f"/>');

  /* ================= Iran (science-sprout-5 and sapling-4) ================= */
  // Iran's map from js/maps/iran.js, fitted to the stage (stage units): x' = 28 + .26 x, y' = 1.3 + .26 y. Pieces
  // (hidden): north (the Caspian forests), zagros, desert, each a colour over those provinces.
  var K = 0.26, OX = 28, OY = 1.3;
  B.SCI.mapAt = function (p) { return [+(OX + K * p[0]).toFixed(1), +(OY + K * p[1]).toFixed(1)]; };
  var REGIONS = {
    north: { fill: "#7cbf5a", ids: ["gilan", "mazandaran", "golestan"] },
    zagros: { fill: "#b59670", ids: ["kurdistan", "kermanshah", "lorestan", "ilam", "chaharmahal-bakhtiari", "kohgiluyeh-boyerahmad", "hamadan"] },
    desert: { fill: "#f2cf86", ids: ["semnan", "yazd", "south-khorasan", "isfahan", "kerman"] }
  };
  R["sci-iran"] = function () {
    var m = B.MAPS && B.MAPS.iran;
    if (!m) return "";
    var all = m.provinces.map(function (p) { return p.d; }).join("");
    var byId = {};
    m.provinces.forEach(function (p) { byId[p.id] = p.d; });
    return '<rect width="160" height="90" fill="#f6efdc"/><g transform="translate(' + OX + " " + OY + ") scale(" + K + ')" stroke-linejoin="round">' +
      '<rect width="400" height="336" fill="#a9d6f0" stroke="#3d2c22" stroke-width="2"/>' +
      m.abroad.map(function (d) { return '<path d="' + d + '" fill="#ece6d6" stroke="#cfc6b0" stroke-width="1"/>'; }).join("") +
      '<path d="' + all + '" fill="#f6e7c1" stroke="#3d2c22" stroke-width="3.4"/><path d="' + all + '" fill="#f6e7c1" stroke="#f6e7c1" stroke-width="1.2"/>' +
      Object.keys(REGIONS).map(function (k) {
        return piece(k, "", '<path d="' + REGIONS[k].ids.map(function (id) { return byId[id] || ""; }).join("") + '" fill="' + REGIONS[k].fill + '" stroke="' + REGIONS[k].fill + '" stroke-width="1"/>', true);
      }).join("") +
      m.provinces.map(function (p) { return '<path d="' + p.d + '" fill="none" stroke="#d9c39a" stroke-width=".8"/>'; }).join("") + "</g>";
  };
  /* A little snow and a little rain under a small cloud (origin: their top middle), 12 wide. A part that moves
     down a few units and fades, again and again (times), looks like snow or rain that keeps falling. */
  R["sci-flakes"] = '<g fill="#fff" stroke="#8fa9ba" stroke-width=".2">' + circles([[-5, .4, .6], [-1.6, 2.2, .55], [2, .8, .6], [5.2, 2.6, .5], [-3.6, 4, .5], [.6, 4.6, .55], [4, 5.2, .5]], .5, "#fff") + "</g>";
  R["sci-streaks"] = '<path d="M-5 0l-.6 2M-1.6 2l-.6 2M2 .6l-.6 2M5.2 2.4l-.6 2M-3.4 4.4l-.6 2M.8 5l-.6 2M4 6l-.6 2" fill="none" stroke="#3f7fd0" stroke-width=".55" stroke-linecap="round"/>';
  // A city on the map: a red dot with a white ring (centre).
  R["sci-dot"] = '<circle r="1.6" fill="#e5483f" stroke="#fff" stroke-width=".7"/>';
  // A small snowy patch, for a city where it snows (centre).
  R["sci-snowpatch"] = '<ellipse rx="7" ry="4" fill="#fff" opacity=".85"/>';

  /* ================= science-sprout-6: what is it made of? ================= */
  // A log (centre), with its rings showing at the right end.
  R["sci-log"] = g('<rect x="-12" y="-5" width="22" height="10" rx="3" fill="#a0683f"/><ellipse cx="10" rx="3" ry="5" fill="#e7c69c"/><ellipse cx="10" rx="1.6" ry="2.8" fill="none" stroke="#c98a4b" stroke-width=".5"/>' +
    '<path d="M-8-2h10M-6 2h8" fill="none" stroke="#7a5233" stroke-width=".4"/>');
  // A wooden chair, from the side (origin: the middle of its bottom).
  R["sci-chair"] = g('<rect x="-8" y="-32" width="3" height="32" rx="1" fill="#c98a4b"/><rect x="6" y="-15" width="3" height="15" rx="1" fill="#c98a4b"/>' +
    '<rect x="-8" y="-17" width="18" height="3.4" rx="1" fill="#b57638"/><rect x="-7" y="-29" width="2" height="12" fill="#b57638"/>' +
    '<path d="M-7.4-28v8M-6-24v6M2-15.6h6" fill="none" stroke="#a0683f" stroke-width=".4"/>');
  // A metal spoon (centre), lying with its bowl up-left. Piece: shine (a white glint that can slide).
  R["sci-spoon"] = g('<rect x="-1.1" y="-6" width="2.2" height="20" rx="1.1" fill="#cfd8dc"/><ellipse cy="-10" rx="3.6" ry="5" fill="#cfd8dc"/>' +
    piece("shine", "0 0", '<ellipse cx="-1.2" cy="-11" rx=".9" ry="2.2" fill="#fff" stroke="none"/><path d="M-.3-4v14" fill="none" stroke="#fff" stroke-width=".6"/>'));
  // A plastic bottle (origin: its bottom middle).
  R["sci-bottle"] = g('<path d="M-5 0v-13c0-3 2.6-4 3-6.4V-22h4v2.6c.4 2.4 3 3.4 3 6.4V0z" fill="#9fd3f0" fill-opacity=".75"/><rect x="-2.4" y="-25" width="4.8" height="3.4" rx=".8" fill="#5b9bd5"/>' +
    '<rect x="-5" y="-11" width="10" height="5" fill="#fcd34d"/><path d="M-3-16v14" fill="none" stroke="#fff" stroke-width=".7" opacity=".8"/>');
  // A glass (origin: its bottom middle), clear: what is behind it shows through.
  R["sci-glass"] = g('<path d="M-7-20h14l-1.6 20H-5.4z" fill="#eaf7fc" fill-opacity=".3"/><path d="M-4.6-17.6l.8 15" fill="none" stroke="#fff" stroke-width="1"/><ellipse cy="-20" rx="7" ry="1.2" fill="none" stroke-width=".4"/>');
  // A T-shirt (origin: its bottom middle). Piece: folds (wrinkles that show when it is pressed; hidden).
  R["sci-shirt"] = g('<path d="M-6-22l-8 4 3 6 4-2V0h14v-14l4 2 3-6-8-4c-1 2-3 3-6 3s-5-1-6-3z" fill="#5b9bd5"/><path d="M-3-22c1 1.6 2 2 3 2s2-.4 3-2" fill="none" stroke-width=".5"/>' +
    piece("folds", "", '<path d="M-4-8c2 1 4 1 6 0M-2-4c2 1 4 1 5 0M-5-12c2 .6 3 .6 4 0" fill="none" stroke="#3f6fa0" stroke-width=".6"/>', true));

  B.RIG = Object.assign(B.RIG, R);
})();

/* ---------- the sapling garden: water cycle, magnets, push and pull, life cycles, food chains, sound ---------- */
(function () {
  var S = B.SCI, g = S.g, piece = S.piece, glow = S.glow, circles = S.circles, rnd = S.rnd, twoTone = S.twoTone;
  var SKIN = "var(--skin,#f3c39b)";
  var R = {};

  // Nothing: an empty part that only holds others (under), so they can turn around its origin.
  R["sci-none"] = "<g></g>";
  // The story backdrops of js/art/scenes.js, as drawings (stage units).
  ["room", "school", "garden"].forEach(function (k) {
    R["sci-bg-" + k] = function () { return '<g stroke-linejoin="round" stroke-linecap="round">' + (B.SCENES && B.SCENES[k] || "") + "</g>"; };
  });

  /* ================= science-sapling-1: the water cycle ================= */
  // The land (stage units): a mountain on the left (its snowy top is a hidden piece), grass, and the sea on the
  // right from x = 98.
  R["sci-wc-land"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
    '<path d="M-2 76L20 38 34 20 50 40 74 76z" fill="#9c8670"/><path d="M34 20l-6 10 6-3 4 3 4-2z" fill="#b7a28c" stroke="none"/>' +
    piece("snow", "", '<path d="M26.6 31L34 20l8.2 10.6-3.4-1.4-3 2.6-3-2.2-3.2 2.4z" fill="#fff"/>', true) +
    '<path d="M-2 76c30-4 60-5 100-2v16H-2z" fill="#8cc66b"/>' +
    '<path d="M96 72c6-1 10 0 16 0s10-1 16 0 10 1 16 0 10-1 18 0V92H94z" fill="#5b9bd5"/>' +
    '<path d="M108 78c4-1.6 8 1.6 12 0M130 84c4-1.6 8 1.6 12 0M118 88c4-1.6 8 1.6 12 0" fill="none" stroke="#fff" stroke-width=".6"/>');
  // The river, from the mountain to the sea (stage units). Drops follow the same path (science-sapling-1).
  S.RIVER = "M40 46c5 8-3 13 3 19s13 5 21 8 18 3 34 3";
  R["sci-river"] = twoTone(S.RIVER, "#5b9bd5", 2);
  // Water vapour, which we cannot really see: a faint dotted wisp going up (origin: its bottom).
  R["sci-vapour"] = '<path d="M0 0c-2-3 2-6 0-9s2-6 0-9" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="1.2 1.8" stroke-linecap="round" opacity=".9"/>';
  // Tiny drops gathering into a cloud (centre).
  R["sci-droplets"] = '<g fill="#eef8ff" stroke="#8fb0c4" stroke-width=".2">' + (function () {
    var s = ""; for (var i = 0; i < 26; i++) { var a = rnd(i) * 6.28, r = Math.sqrt(rnd(i + 40)); s += '<circle cx="' + (Math.cos(a) * r * 12).toFixed(1) + '" cy="' + (Math.sin(a) * r * 5).toFixed(1) + '" r=".7"/>'; }
    return s; })() + "</g>";
  // The cycle as arrows (stage units): up from the sea, across to the mountain, down the river, back to the sea.
  R["sci-cycle"] = (function () {
    var d = "M132 66C140 52 138 40 128 30M112 14C92 6 70 8 52 14M30 32C24 46 30 58 46 66M66 84C80 88 94 86 104 82";
    var h = "M124.6 31.6L128 30l.6 3.6M55 11.4L52 14l3.4 1.6M42.6 65.6L46 66l-1.2-3.4M100.6 80.8L104 82l-2.6 2.4";
    return '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + h + '" stroke="#fff" stroke-width="3"/><path d="' + d + h + '" stroke="#e5483f" stroke-width="1.3"/></g>';
  })();

  /* ================= science-sapling-2: a magnet through paper ================= */
  // A sheet of card laid across two piles of books (stage units); its top is at y = 56.
  R["sci-board"] = g('<rect x="14" y="62" width="24" height="6" fill="#5b9bd5"/><rect x="16" y="68" width="22" height="6" fill="#e5483f"/><rect x="14" y="74" width="25" height="6" fill="#5a9a45"/>' +
    '<rect x="122" y="62" width="24" height="6" fill="#f59e0b"/><rect x="121" y="68" width="24" height="6" fill="#8e6cc4"/><rect x="122" y="74" width="25" height="6" fill="#5b9bd5"/>' +
    '<rect x="12" y="56" width="136" height="2.4" fill="#fffaf0"/><rect x="14" y="58.4" width="24" height="3.6" fill="#e5483f"/><rect x="122" y="58.4" width="24" height="3.6" fill="#5a9a45"/>');
  // A paper clip lying on the card, seen from the side (origin: the middle of its bottom).
  R["sci-clip"] = '<path d="M-5-.6h9.4a1.2 1.2 0 0 0 0-2.4H-5.6a.9.9 0 0 0 0 1.8h8.4" fill="none" stroke="#3d2c22" stroke-width="1.5" stroke-linecap="round"/><path d="M-5-.6h9.4a1.2 1.2 0 0 0 0-2.4H-5.6a.9.9 0 0 0 0 1.8h8.4" fill="none" stroke="#b8c4cc" stroke-width=".8" stroke-linecap="round"/>';
  // A horseshoe magnet pointing up (origin: the middle of its top, between the two ends).
  R["sci-magnet"] = g('<path d="M-7 0v8a7 7 0 0 0 14 0V0H3v8a3 3 0 0 1-6 0V0z" fill="#e5483f"/><path d="M-7 0h4v3h-4zM3 0h4v3H3z" fill="#cfd8dc"/>');
  // The magnet's pull, through the card to the clip (origin: the magnet's top).
  R["sci-pull"] = '<path d="M-5 0C-5-2-3-4-1.4-5.4M5 0c0-2-2-4-3.6-5.4M0 0v-5" fill="none" stroke="#e5483f" stroke-width=".7" stroke-dasharray="1 1" stroke-linecap="round"/>';

  /* ================= science-sapling-4: Iran's nature ================= */
  // Sand dunes (origin: their bottom middle), 24 wide.
  R["sci-dunes"] = g('<path d="M-12 0c3-5 7-7 11-5 3-4 8-4 13 5z" fill="#f2cf86"/><path d="M-4-3c2-1 4-1 5 0" fill="none" stroke="#d9a94f" stroke-width=".5"/>');

  /* ================= science-sapling-5: push and pull ================= */
  // A shopping cart from the side, its handle on the left at (-17, -26) (origin: its bottom middle). Pieces: w1,
  // w2 (the wheels, to turn).
  function wheel(n, x) { return piece(n, x + " -3", '<circle cx="' + x + '" cy="-3" r="3" fill="#5b5b5b"/><circle cx="' + x + '" cy="-3" r="1" fill="#cfd8dc"/><path d="M' + (x - 2.6) + ' -3h5.2" fill="none" stroke="#cfd8dc" stroke-width=".6"/>'); }
  R["sci-cart"] = g('<path d="M-17-26h3l4 4" fill="none" stroke="#5b5b5b" stroke-width="1.4"/><path d="M-11-23h24l-3 12h-18z" fill="#cfd8dc"/>' +
    '<path d="M-7-23l1 12M-2-23v12M3-23v12M8-23l-1 12M-10-17h21" fill="none" stroke="#8a9aa6" stroke-width=".5"/><path d="M-8-11v5h16v-5" fill="none" stroke="#5b5b5b" stroke-width="1"/>' +
    wheel("w1", -7) + wheel("w2", 8));
  // A sled with its rope going forward to (22, -13) (origin: its bottom middle).
  R["sci-sled"] = g('<path d="M10-5Q16-8 22-13" fill="none" stroke="#8a5a3b" stroke-width=".9"/><path d="M-12-1h20c3 0 4-2 4-4" fill="none" stroke="#5b5b5b" stroke-width="1.2"/>' +
    '<rect x="-12" y="-8" width="20" height="3" rx="1" fill="#c0504d"/><path d="M-8-5v4M4-5v4" fill="none" stroke="#5b5b5b" stroke-width="1"/>');
  // A little flag on a stick, to mark where something stopped (origin: its foot).
  R["sci-flag"] = g('<path d="M0 0v-12" fill="none" stroke-width=".9"/><path d="M0-12l7 2.4-7 2.4z" fill="#e5483f"/>');

  /* ================= science-sapling-6: frogs and butterflies ================= */
  // A rice paddy (stage units): far hills, the water from y = 44 (rice growing out of it), a grassy bank on the
  // right from x = 118.
  R["sci-paddy"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 42c20-7 42-8 62-3s40 4 62-2 28-4 36-1v8H0z" fill="#9cc77a"/>' +
    '<rect y="44" width="160" height="46" fill="#8fc9c2"/><path d="M0 44h160" fill="none" stroke="#5f9f99" stroke-width=".6"/>' +
    (function () { var d = ""; [8, 24, 40, 56, 72, 88, 104].forEach(function (x) { d += "M" + x + " 45l-2.4-7M" + x + " 45v-8.4M" + x + " 45l2.4-7"; }); return '<path d="' + d + '" fill="none" stroke="#5a9a45" stroke-width=".8"/>'; })() +
    '<path d="M116 90V50c8-4 24-6 44-5v45z" fill="#a9d68b"/><path d="M118 52c10-2 22-3 42-2" fill="none" stroke="#5a9a45" stroke-width=".5"/>');
  // The water seen from the side, laid over what swims in it, so it looks under water (stage units).
  R["sci-veil"] = '<rect y="44.4" width="116" height="46" fill="#8fc9c2" opacity=".35"/>';
  // Frog eggs: a cluster of jelly balls with black dots (centre).
  R["sci-frogspawn"] = '<g stroke="#7aa" stroke-width=".25">' + [[0, 0], [3.2, -.6], [-3, .4], [1.4, 2.8], [-1.6, -2.8], [4.4, 2.4], [-4.4, 3], [1.8, -3.6], [-1, 5.2], [3.6, 5.6], [-4.6, -1.8], [6, -2]].map(function (p) {
    return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7" fill="#eef8f6" fill-opacity=".85"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r=".55" fill="#2f3a2a" stroke="none"/>'; }).join("") + "</g>";
  // A tadpole swimming right (centre). Pieces: tail (it wags at -2.4 0; sx shrinks it), legs (hidden).
  R["sci-tadpole"] = g(piece("legs", "", '<path d="M-1.2 1.4l-1.6 2.6 1.6.2M1.2 1.6l.6 2.4 1.2-.4" fill="none" stroke="#4a5a3a" stroke-width=".7"/>', true) +
    piece("tail", "-2.4 0", '<path d="M-2.4-1.2C-5-2.4-8-1-10.4-1.6-8.4 0-6 1.8-2.4 1.2z" fill="#5d6e4a"/>') +
    '<ellipse rx="3.2" ry="2.4" fill="#4a5a3a"/><circle cx="1.6" cy="-.8" r=".7" fill="#fff" stroke="none"/><circle cx="1.8" cy="-.8" r=".35" fill="#3d2c22" stroke="none"/>');
  // A twig with a big leaf hanging from it (stage units, leaf round 70, 50). Pieces: b0 to b3, bites the
  // caterpillar takes (hidden; they are the colour of the sci-bg behind: #e6f4d7).
  R["sci-leafbranch"] = g('<path d="M0 24c40 4 90 2 160-6" fill="none" stroke="#8a5a3b" stroke-width="2.6"/>' +
    '<path d="M70 25c-19 6-27 20-23 34 2 8 10 12 23 12s21-4 23-12c4-14-4-28-23-34z" fill="#7cbf5a"/>' +
    '<path d="M70 26v44M70 40l-12 6M70 40l12 5M70 52l-15 6M70 52l14 6" fill="none" stroke="#5a9a45" stroke-width=".6"/>' +
    [[48.4, 48, 4], [91.6, 46, 4.4], [50, 62, 4.6], [90, 61, 4.6]].map(function (b, i) {
      return piece("b" + i, "", '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="#e6f4d7" stroke="none"/>', true); }).join(""));
  // Tiny eggs on the leaf (centre).
  R["sci-leaf-eggs"] = circles([[0, 0], [1.6, .6], [.6, 1.8], [-1, 1.4], [2.2, 2]], .55, "#fff8e0", ' stroke="#3d2c22" stroke-width=".2"');
  /* A cocoon hanging from the twig (origin: where it hangs), 22 long. The shell lets a little of the inside
     show: pieces worm and fly (the caterpillar becoming a butterfly; fly hidden), shell, and open (the split
     shell, hidden). */
  R["sci-cocoon"] = g('<path d="M0 0v2" fill="none" stroke-width=".6"/>' +
    piece("worm", "", '<g fill="#8bc34a" stroke-width=".3">' + circles([[0, 6, 2.2], [0, 9.6, 2.4], [0, 13.2, 2.4], [0, 16.6, 2.1]], 2, "#8bc34a") + "</g>") +
    piece("fly", "", '<path d="M0 6c-4 2-5 8-3 12 1-1 2-3 3-3s2 2 3 3c2-4 1-10-3-12z" fill="#f59e0b"/><path d="M0 6v13" fill="none" stroke-width=".5"/>', true) +
    piece("shell", "", '<path d="M0 2c4 2 6 8 5.4 13S2 23 0 23s-5.4-3-5.4-8S-4 4 0 2z" fill="#c9b38a" fill-opacity=".72"/><path d="M-3 8c2 1 4 1 6 0M-4 13c2.6 1 5.4 1 8 0M-3 18c2 1 4 1 6 0" fill="none" stroke="#a08a64" stroke-width=".4"/>') +
    piece("open", "", '<path d="M0 2c4 2 6 8 5.4 13S3 22 2 23l-1-5 1-4-2-3-1 4 1 4-1 4c-1-.4-4.4-3-4.4-8S-4 4 0 2z" fill="#c9b38a" fill-opacity=".9"/>', true));
  // A silkworm (origin: the middle of its bottom), white, crawling right.
  R["sci-silkworm"] = g(circles([[-6, -2.4, 2], [-2.6, -2.8, 2.4], [1, -2.8, 2.4], [4.6, -2.6, 2.2]], 2, "#fbf7ee") + '<circle cx="5.6" cy="-3" r=".45" fill="#3d2c22" stroke="none"/>');
  // A silk cocoon (centre) and a spool to wind its thread on (centre); the thread goes from x = 6 to x = 40.
  R["sci-silk-cocoon"] = g('<ellipse rx="6" ry="3.8" fill="#fffaf0"/><path d="M-3-3c1 2 1 4 0 6M0-3.8c1 2 1 5.6 0 7.6M3-3c1 2 1 4 0 6" fill="none" stroke="#e3d8c0" stroke-width=".5"/>');
  R["sci-spool"] = g('<rect x="-5" y="-6.4" width="10" height="12.8" rx="1.2" fill="#c98a4b"/><rect x="-3.6" y="-4" width="7.2" height="8" fill="#fff3d6"/><path d="M-3.6-2.4h7.2M-3.6 0h7.2M-3.6 2.4h7.2" fill="none" stroke="#e3d0a6" stroke-width=".4"/>' +
    '<circle r="1" fill="#8a5a3b"/>');
  R["sci-thread"] = '<path d="M6 0H40" fill="none" stroke="#3d2c22" stroke-width="1.1" stroke-linecap="round"/><path d="M6 0H40" fill="none" stroke="#fff3d6" stroke-width=".6" stroke-linecap="round"/>';

  /* ================= science-sapling-7: food chains ================= */
  // The Zagros mountains (stage units): snowy peaks behind, rocky slopes, a grassy meadow from y = 70.
  R["sci-zagros"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
    '<path d="M-4 66L26 26l18 18 22-30 26 30 18-16 26 22 28-20v38z" fill="#a08a74"/><path d="M20 34l6-8 6 6-3 0-3 3zM58 24l8-10 8 10-4-1-4 3-3-2zM104 32l6-4 6 5z" fill="#fff"/>' +
    '<path d="M-4 72c20-8 40-12 60-8s30 4 50-2 36-6 58-2v30H-4z" fill="#b59670"/>' +
    '<path d="M-4 76c30-4 70-5 100-2s44 1 68-1v17H-4z" fill="#8cc66b"/>' +
    '<g fill="#9c8670" stroke-width=".4"><path d="M14 72l4-3 5 3z"/><path d="M128 70l5-4 4 4z"/></g>');
  // A clump of grass (origin: its bottom middle), 12 tall.
  R["sci-grass"] = g('<path d="M-8 0c0-4 1-8 3-12 0 4 1 8 2 12zM-4 0c0-5 1-10 4-14 0 5 0 10 1 14zM1 0c0-4 1-9 4-13 0 4 0 9 0 13zM5 0c1-3 2-7 5-10-1 4-1 7-1 10z" fill="#5a9a45"/>' +
    '<path d="M-6 0c0-3 1-6 2-8M3 0c0-3 0-6 2-9" fill="none" stroke="#7cbf5a" stroke-width=".7"/>');

  /* ================= science-sapling-8: sound ================= */
  // A tonbak, standing (origin: its bottom middle), 26 tall. Pieces: skin (it shivers with sy), rice (grains
  // that jump on the skin).
  R["sci-tonbak"] = g('<path d="M-5 0c0-4 2-9 2.4-12C-7-15-10-20-10-26h20c0 6-3 11-7.6 14 .4 3 2.6 8 2.6 12z" fill="#a0683f"/>' +
    '<path d="M-9.4-22h18.8M-5-15.4h10" fill="none" stroke="#f6d58a" stroke-width=".9"/><path d="M-8.8-20h17.6" fill="none" stroke="#5a9a45" stroke-width=".6"/>' +
    piece("skin", "0 -26", '<ellipse cy="-26" rx="10" ry="2.4" fill="#f3e0c0"/>') +
    piece("rice", "0 -27", '<g fill="#fff" stroke-width=".25"><ellipse cx="-4" cy="-27" rx=".9" ry=".45"/><ellipse cx="-.6" cy="-27.4" rx=".9" ry=".45"/><ellipse cx="3" cy="-26.8" rx=".9" ry=".45"/><ellipse cx="5.6" cy="-27.2" rx=".9" ry=".45"/></g>'));
  // Shaking lines beside something that shakes (centre): two short zigzags, one each side.
  R["sci-buzz"] = '<path d="M-9-3l-1.6 1.4 1.6 1.4-1.6 1.4 1.6 1.4M9-3l1.6 1.4L9-.2l1.6 1.4L9 2.6" fill="none" stroke="#e5483f" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>';
  // A wall bracket the school bell hangs from (origin: the hanging point; the wall is to the left).
  R["sci-bracket"] = g('<path d="M-12-6h12v3" fill="none" stroke="#5b5b5b" stroke-width="1.4"/><rect x="-14" y="-10" width="3" height="8" rx="1" fill="#8a9aa6"/>');
  // The air between: dots in ten columns, each a piece (c0 to c9), 8 apart (origin: the middle of the first).
  R["sci-air"] = (function () {
    var s = "";
    for (var c = 0; c < 10; c++) {
      var dots = "";
      for (var k = 0; k < 5; k++) dots += '<circle cx="' + (c * 8 + (rnd(c * 5 + k) - 0.5) * 2).toFixed(1) + '" cy="' + ((k - 2) * 5 + (rnd(c * 7 + k) - 0.5) * 2).toFixed(1) + '" r=".9"/>';
      s += piece("c" + c, c * 8 + " 0", dots);
    }
    return '<g fill="#8fb0c4">' + s + "</g>";
  })();
  // Under the sea (stage units): blue water, light from above, sand and sea grass.
  R["sci-underwater"] = g('<rect width="160" height="30" fill="#7cc4e8" stroke="none"/><rect y="30" width="160" height="30" fill="#5bb0e0" stroke="none"/><rect y="60" width="160" height="30" fill="#3f9ad0" stroke="none"/>' +
    '<path d="M20 0l14 0-24 82h-6zM70 0h10L66 82h-6zM120 0h12l-20 82h-6z" fill="#fff" opacity=".12" stroke="none"/>' +
    '<path d="M0 84c30-4 60-4 90-1s50 2 70 0v7H0z" fill="#f2d79a"/>' +
    '<path d="M14 84c-2-6 2-10 0-16s2-8 0-12M20 84c2-5-1-9 1-13M142 84c-2-6 2-10 0-16M148 84c1-4-1-7 1-11" fill="none" stroke="#3f8f4a" stroke-width="1.4"/>');
  // A dolphin swimming right (centre), 28 long.
  R["sci-dolphin"] = g('<path d="M-12 1.6l-6-4.6c2 .2 3.6.8 4.4 2 .2-1.8 1.4-3 3.2-3.4z" fill="#8fb4d0"/>' +
    '<path d="M-2-6.4c.6-3 3-4.8 6.4-5-1.6 1.6-2.2 3.2-2 5z" fill="#8fb4d0"/>' +
    '<path d="M-13 1.6C-9-4.6 0-8 8-7c4 .4 7 2.2 8.4 4 1.6 0 3.4.4 4.8 1.2-1.4 1-3.4 1.4-5 1.2C14 3 7 5.8-1 6-7 6.2-11 4.4-13 1.6z" fill="#8fb4d0"/>' +
    '<path d="M-8 3.4C-2 5.4 7 5 15.6-.4" fill="none" stroke="#e6f1f8" stroke-width="1.6"/><path d="M15.4.2c1.6.8 3.4.6 5-.4" fill="none" stroke-width=".4"/>' +
    '<circle cx="11.6" cy="-2.6" r=".9" fill="#fff" stroke="none"/><circle cx="11.8" cy="-2.6" r=".5" fill="#3d2c22" stroke="none"/><path d="M1 3.6l-2 3.4 3.6-1.4z" fill="#7aa2c0"/>');
  // A long wooden table seen from the side (stage units): its top from x = 18 to 142, y = 56 to 61.
  R["sci-longtable"] = g('<rect x="18" y="56" width="124" height="5" rx="1" fill="#c98a4b"/><path d="M22 58.4h116" fill="none" stroke="#a0683f" stroke-width=".4"/>' +
    '<rect x="24" y="61" width="4" height="25" fill="#a0683f"/><rect x="132" y="61" width="4" height="25" fill="#a0683f"/>');
  /* A setar lying on its side (centre): the bowl on the left, the long neck to the right. Pieces: thin and thick,
     two strings that shiver (sy between 1 and -1), each bowed a little. */
  R["sci-setar"] = g('<path d="M-14-6c-6-4-18-5-24-1-5 3-5 11 0 14 6 4 18 3 24-1z" fill="#b5743a"/><path d="M-16-3c-5-2-13-3-18 0-3 2-3 6 0 8 5 3 13 2 18 0z" fill="#d9a066" stroke="none"/>' +
    '<rect x="-15" y="-2.6" width="62" height="5.2" rx="1" fill="#8a5a3b"/><path d="M-2-2.6v5.2M8-2.6v5.2M18-2.6v5.2M27-2.6v5.2M35-2.6v5.2M42-2.6v5.2" fill="none" stroke="#f6d58a" stroke-width=".4"/>' +
    '<path d="M47-3h9l2 6h-11z" fill="#a0683f"/><circle cx="50" cy="-4.4" r="1.2" fill="#6e4a2e"/><circle cx="55" cy="-4.4" r="1.2" fill="#6e4a2e"/>' +
    piece("thin", "9 -1.3", '<path d="M-34-1.3Q9-3.2 52-1.3" fill="none" stroke="#f4f4f2" stroke-width=".45"/>') +
    piece("thick", "9 1.3", '<path d="M-34 1.3Q9 3.6 52 1.3" fill="none" stroke="#e8d3a8" stroke-width="1"/>'));
  // Sound as a wave line, 40 long from the origin: a high sound (many small waves) and a low one (a few big ones).
  function wave(period, amp, c) {
    var d = "M0 0";
    for (var x = 0; x < 40; x += period) d += "q" + (period / 4) + " " + (-amp) + " " + (period / 2) + " 0t" + (period / 2) + " 0";
    return '<g fill="none" stroke-linecap="round"><path d="' + d + '" stroke="#fff" stroke-width="2.2"/><path d="' + d + '" stroke="' + c + '" stroke-width="1"/></g>';
  }
  R["sci-wave-hi"] = wave(4, 2.6, "#e5483f");
  R["sci-wave-lo"] = wave(16, 5, "#5b6fd0");

  B.RIG = Object.assign(B.RIG, R);
})();

/* ---------- more of the seed garden (science-seed-7 to seed-24) ---------- */
(function () {
  var S = B.SCI, g = S.g, piece = S.piece, glow = S.glow, circles = S.circles, rnd = S.rnd, twoTone = S.twoTone;
  var R = {};

  /* ================= science-seed-8: what my body does ================= */
  // A red apple (centre), about 5 across. Pieces: whole, bitten (hidden: a bite out of its right side).
  R["sci-apple"] = g('<path d="M0-2.2c.2-1 .8-1.8 1.8-2.2" fill="none" stroke="#6e4a2e" stroke-width=".5"/><path d="M.6-2.6c1-1.2 2.6-1.4 3.2-.8-.8.8-2 1.2-3.2.8z" fill="#7cbf5a" stroke-width=".3"/>' +
    piece("whole", "", '<path d="M0-1.8c-1.4-1-4-.8-4.4 1.4-.4 2.6 1.4 5 3 5 .6 0 1-.4 1.4-.4s.8.4 1.4.4c1.6 0 3.4-2.4 3-5C4-2.6 1.4-2.8 0-1.8z" fill="#e5483f"/>') +
    piece("bitten", "", '<path d="M0-1.8c-1.4-1-4-.8-4.4 1.4-.4 2.6 1.4 5 3 5 .6 0 1-.4 1.4-.4s.8.4 1.4.4c.8 0 1.6-.6 2.2-1.4-1-.4-1.4-1.2-1-2 -.6-.6-.6-1.6 0-2.2-.4-.4-.4-1 .2-1.4C2.4-2.6 1-2.6 0-1.8z" fill="#e5483f"/>' +
      '<path d="M3.6 2.6c-1-.4-1.4-1.2-1-2-.6-.6-.6-1.6 0-2.2-.4-.4-.4-1 .2-1.4" fill="none" stroke="#fbf1d6" stroke-width=".8"/>', true));


  /* ---- science-seed-11: plants around us (a plane tree, a pomegranate tree, a date palm and their leaves) ---- */
  // Leaves drawn at their centre, the stalk pointing down: the plane tree's (wide, five points, like a hand), the
  // pomegranate's (small and narrow) and the palm's (one long frond, many thin leaflets on a stem).
  var PLANE_LEAF = "M0 5L-1 2-6 3-4.4 0-8-2-4.6-2.6-5.6-6.6-2-4 0-8.4 2-4 5.6-6.6 4.6-2.6 8-2 4.4 0 6 3 1 2z";
  var PLANE_VEINS = "M0 8V-7M0 1l-6.6-3M0 1l6.6-3M0 0l-4.6-5.6M0 0l4.6-5.6";
  function planeLeaf(x, y, sc, rot, fill) {
    return '<g transform="translate(' + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + sc + ')"><path d="' + PLANE_LEAF + '" fill="' + (fill || "#6fae4e") + '"/>' +
      '<path d="' + PLANE_VEINS + '" fill="none" stroke-width=".35"/></g>';
  }
  var POM_LEAF = "M0 4C-1.6 1-1.8-3 0-7 1.8-3 1.6 1 0 4z";
  function pomLeaf(x, y, sc, rot) {
    return '<path d="' + POM_LEAF + '" fill="#5f9e45" stroke-width=".3" transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + sc + ')"/>';
  }
  function palmFrond(len) {
    var d = "M0 0Q" + (len / 2) + " " + (-len / 6) + " " + len + " " + (len / 10), leaflets = "";
    for (var t = 0.12; t < 1; t += 0.08) {
      var x = len * t, y = -len / 3 * t * (1 - t) * 1 + len / 10 * t * t, k = 1 - t * 0.6;
      leaflets += "M" + x.toFixed(1) + " " + y.toFixed(1) + "l" + (1.6 * k).toFixed(1) + " " + (-4 * k).toFixed(1) +
        "M" + x.toFixed(1) + " " + y.toFixed(1) + "l" + (1.6 * k).toFixed(1) + " " + (4 * k).toFixed(1);
    }
    return '<path d="' + leaflets + '" fill="none" stroke="#3d2c22" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="' + leaflets + '" fill="none" stroke="#5a9a45" stroke-width=".9" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="#3d2c22" stroke-width="1.3"/><path d="' + d + '" fill="none" stroke="#8a7a3a" stroke-width=".6"/>';
  }
  R["sci-leaf-plane"] = g(planeLeaf(0, 0, 1, 0));
  R["sci-leaf-pom"] = g(pomLeaf(0, 1.5, 1, 0) + '<path d="M0 5.5v-9" fill="none" stroke-width=".3"/>');
  R["sci-leaf-palm"] = g('<g transform="translate(0 6) rotate(-80)">' + palmFrond(22) + "</g>");
  /* A plane tree, چنار (origin: the bottom of its trunk), about 70 tall and 52 wide: a thick trunk with patchy
     bark, and a crown of wide, hand-shaped leaves (big enough to see them when the camera comes close). */
  R["sci-plane-tree"] = (function () {
    var crown = [[-14, -50, 15], [2, -60, 16], [16, -48, 14], [-4, -42, 13], [-22, -38, 9], [10, -38, 10]];
    var leaves = "";
    for (var i = 0; i < 26; i++) {
      var c = crown[i % crown.length], a = rnd(i + 3) * 6.283, r = c[2] * (0.35 + rnd(i + 7) * 0.55);
      leaves += planeLeaf((c[0] + Math.cos(a) * r).toFixed(1), (c[1] + Math.sin(a) * r).toFixed(1), 0.55, (rnd(i) * 70 - 35).toFixed(0), i % 3 ? "#6fae4e" : "#86c062");
    }
    return g('<path d="M-6 0c2-14 2-28 1-40h9c-1 12-1 26 1 40z" fill="#b9a586"/>' +
      '<g fill="#e8dfc8" stroke="none"><path d="M-3-6c2-1 4 0 4 2s-3 3-4 1zM0-20c2-1 4 1 3 3s-4 1-3-3zM-3-31c1.6-.6 3 .4 2.6 2-.4 1.4-3 1-2.6-2z"/></g>' +
      '<g fill="#8f7a5c" stroke="none"><path d="M1-12c1.4-.4 2.4.6 1.6 1.6-1 .8-2.6 0-1.6-1.6zM-4-24c1-.6 2.2.2 1.6 1.2-.8 1-2.4.4-1.6-1.2z"/></g>' +
      '<path d="M-2-38c-6-6-12-8-18-8M3-38c4-6 10-10 16-12" fill="none" stroke="#b9a586" stroke-width="2.4"/>' +
      circles(crown, 10, "#5a9a45") + leaves);
  })();
  /* A pomegranate tree, درخت انار (origin: the bottom of its trunks), about 42 tall: a few thin trunks, a round
     crown of small narrow leaves, red pomegranates and two orange-red flowers. Piece: fruits (the pomegranates). */
  R["sci-pom-tree"] = (function () {
    var leaves = "";
    for (var i = 0; i < 70; i++) {
      var a = rnd(i + 11) * 6.283, r = Math.sqrt(rnd(i + 19)) * 15;
      leaves += pomLeaf((Math.cos(a) * r * 1.15).toFixed(1), (-28 + Math.sin(a) * r).toFixed(1), 0.75, (rnd(i + 5) * 360).toFixed(0));
    }
    var fruit = function (x, y) {
      return '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#c2302b"/><path d="M' + (x - 1) + " " + (y - 2.8) + "l.4-1.4.6.9.6-.9.4 1.4" + '" fill="#9c2f2a" stroke-width=".4"/>' +
        '<circle cx="' + (x - 1) + '" cy="' + (y - 1) + '" r=".7" fill="#fff" opacity=".5" stroke="none"/>';
    };
    return g('<path d="M-2 0c0-6 1-12-3-18M0 0c0-8 0-14 1-20M2 0c1-6 3-10 6-16" fill="none" stroke="#8a5a3b" stroke-width="2"/>' +
      '<ellipse cx="0" cy="-28" rx="18" ry="15" fill="#4f8a3c"/>' + leaves +
      '<g fill="#e5702f"><path d="M-12-36l1.4-2.4 1 1.8 1-1.8 1.4 2.4c0 1.4-1 2.2-2.4 2.2s-2.4-.8-2.4-2.2z"/><path d="M8-18l1.4-2.4 1 1.8 1-1.8 1.4 2.4c0 1.4-1 2.2-2.4 2.2s-2.4-.8-2.4-2.2z"/></g>' +
      piece("fruits", "0 -28", fruit(-8, -24) + fruit(6, -32) + fruit(11, -24) + fruit(-2, -16) + fruit(-12, -30)));
  })();
  /* A date palm, نخل (origin: the bottom of its trunk), about 58 tall: a ringed trunk leaning a little, long
     fronds and a bunch of dates. Piece: fronds (they sway, turning round the top of the trunk at (4, -50)). */
  R["sci-palm"] = (function () {
    var rings = "";
    for (var y = -4; y > -48; y -= 4) rings += "M" + (-2.6 + y * -0.07).toFixed(1) + " " + y + "l" + 5.4 + " -1";
    var fronds = [[-150, 26], [-120, 24], [-95, 20], [-60, 22], [-30, 26], [-5, 24], [170, 22]].map(function (f) {
      return '<g transform="rotate(' + f[0] + ')">' + palmFrond(f[1]) + "</g>";
    }).join("");
    return g('<path d="M-3 0c0-16 2-34 6-50h3c-3 16-4 34-3 50z" fill="#a0784e"/>' +
      '<path d="' + rings + '" fill="none" stroke="#6e4a2e" stroke-width=".6"/>' +
      '<g fill="#b5651d">' + circles([[2, -46, 1.6], [4, -45, 1.6], [3, -43.4, 1.6], [5.6, -43.6, 1.6], [1, -44, 1.5]], 1.6, "#b5651d") + "</g>" +
      piece("fronds", "4.5 -50", '<g transform="translate(4.5 -50)">' + fronds + "</g>"));
  })();

  /* ---- science-seed-13: caring for living things ---- */
  // A pot plant (origin: the bottom of the pot). Pieces: droop (thirsty: the stem bent and the leaves hanging) and
  // up (after water: standing straight, hidden at first).
  R["sci-potplant"] = g('<path d="M-7-10h14l-2 10h-10z" fill="#c4673a"/><rect x="-8" y="-12.4" width="16" height="3" rx="1" fill="#d27a4a"/><ellipse cy="-12.2" rx="6.6" ry=".9" fill="#7a5233"/>' +
    piece("droop", "", '<path d="M0-12.4c0-5 .6-9 3-12.4 2.4-3 5.6-3.4 7-1.6" fill="none" stroke="#6b8f3a" stroke-width="1.3"/>' +
      '<g fill="#a3b55a"><path d="M.4-16c-2.6 1-5 3.6-5.4 6.6 2.6-.6 4.8-3 5.4-6.6z"/><path d="M1.6-20.4c2.4 1.4 3.8 4.2 3.4 7.2-2.2-1.4-3.6-4-3.4-7.2z"/>' +
      '<path d="M10-26c1.6 2.2 1.8 5.2.4 7.6-1.4-2.2-1.6-5.2-.4-7.6z"/><path d="M6.6-25.6c-.6 2.6-2.6 4.6-5.2 5.2.4-2.6 2.4-4.8 5.2-5.2z"/></g>') +
    piece("up", "0 -12", '<path d="M0-12.4V-34" fill="none" stroke="#4f8a3c" stroke-width="1.3"/><g fill="#6fae4e">' +
      '<path d="M0-17c-3-2.6-7-2.8-9.4-.6 2.4 2.2 6.6 2.4 9.4.6z"/><path d="M0-22c3-2.6 7-2.8 9.4-.6-2.4 2.2-6.6 2.4-9.4.6z"/>' +
      '<path d="M0-27c-2.6-2.2-6-2.4-8-.4 2 1.8 5.6 2 8 .4z"/><path d="M.2-31.4c2-1.8 4.8-2 6.4-.4-1.6 1.6-4.4 1.8-6.4.4z"/></g>' +
      '<circle cy="-35.6" r="2.4" fill="#f28baa"/><circle cy="-35.6" r="1" fill="#fcd34d" stroke="none"/>', true));
  // A low brick wall (origin: its bottom middle), 40 wide and 12 tall.
  R["sci-wall"] = g('<rect x="-20" y="-12" width="40" height="12" fill="#c98a5e"/><rect x="-21" y="-13.4" width="42" height="2" rx=".6" fill="#b5743a"/>' +
    '<path d="M-20-8h40M-20-4h40M-12-12v4M0-12v4M12-12v4M-6-8v4M6-8v4M18-8v4M-18-8v4M-12-4v4M0-4v4M12-4v4" fill="none" stroke="#a0683f" stroke-width=".4"/>');
  // A shallow dish (origin: its bottom middle). Piece: water (hidden at first).
  R["sci-dish"] = g('<path d="M-6-3h12l-1.4 3h-9.2z" fill="#e7c27a"/>' + piece("water", "0 -3", '<ellipse cy="-3" rx="5.4" ry="1" fill="#7fc0ea" stroke-width=".3"/>', true) +
    '<ellipse cy="-3" rx="6" ry="1.2" fill="none"/>');
  // A crumb of bread (centre).
  R["sci-crumb"] = g('<path d="M-1.2-.8c.6-.8 1.8-.6 2.2 0 .6.8 0 1.6-.8 1.6H-.8c-.8 0-1-.8-.4-1.6z" fill="#e7b46a" stroke-width=".3"/>');
  /* ---- science-seed-16: where does water go? ---- */
  // A clear glass (origin: its bottom middle), 12 wide and 16 tall. Piece: water (it fills from the bottom: start
  // it at sy 0).
  R["sci-tumbler"] = g(piece("water", "0 0", '<path d="M-5.6-14h11.2L5 0h-10z" fill="#9fd3f0" stroke="none"/>') +
    '<path d="M-6-16h12l-1 16h-10z" fill="#eaf7fc" fill-opacity=".25"/><path d="M-3.8-13.6l.6 11" fill="none" stroke="#fff" stroke-width=".9"/>');
  // A clothesline between two posts (origin: the middle of the ground between them): posts 44 apart, the line
  // at about y = -28, sagging to -26.4 in the middle.
  R["sci-clothesline"] = g('<rect x="-23.4" y="-34" width="2.4" height="34" fill="#8a5a3b"/><rect x="21" y="-34" width="2.4" height="34" fill="#8a5a3b"/>' +
    '<path d="M-22-30Q0-24 22-30" fill="none" stroke="#f4f4f2" stroke-width=".9"/><path d="M-22-30Q0-24 22-30" fill="none" stroke-width=".25"/>');
  // A T-shirt hanging on the line by two pegs (origin: its bottom middle), like sci-shirt. Piece: wet (darker,
  // fades away as it dries).
  var SHIRT = "M-6-22l-8 4 3 6 4-2V0h14v-14l4 2 3-6-8-4c-1 2-3 3-6 3s-5-1-6-3z";
  R["sci-shirt-line"] = g('<path d="' + SHIRT + '" fill="#e46b8a"/>' + piece("wet", "", '<path d="' + SHIRT + '" fill="#9c3f5c" opacity=".75"/>') +
    '<path d="M-3-22c1 1.6 2 2 3 2s2-.4 3-2" fill="none" stroke-width=".5"/><rect x="-8" y="-24.4" width="1.6" height="4" rx=".5" fill="#f6b73c"/><rect x="6.4" y="-24.4" width="1.6" height="4" rx=".5" fill="#f6b73c"/>');
  /* ---- science-seed-17: warm and cold ---- */
  // A hand from the side, palm up and open, the arm coming from the right (origin: the middle of the palm, where
  // something held lies). Piece: pool (a little water in the palm; hidden).
  R["sci-hand-up"] = g('<path d="M8-1.4h34v8H8z" fill="#5b9bd5"/>' +
    '<path d="M-10 0c-2.4 0-4-1.6-4-3.6 0-1 .8-1.4 1.6-.8 1 .8 1.6 1.4 2.8 1.4H9V5.4H-7c-2.6 0-4-1-4.4-2.4z" fill="' + "var(--skin,#f3c39b)" + '"/>' +
    '<path d="M-11.4 2.4c1.4.6 3 .8 4.4.8H8" fill="none" stroke-width=".35"/><path d="M2-.2c1.6-2.4 4.2-3.2 6-2.4" fill="' + "var(--skin,#f3c39b)" + '"/>' +
    piece("pool", "0 0", '<ellipse cy="-.4" rx="6" ry="1" fill="#7fc0ea" stroke-width=".3"/>', true));
  // A block of butter (origin: its bottom middle). Pieces: hard (a cold block with sharp corners) and soft (warm:
  // lower and wider, with a dent in the middle where the spoon went in; hidden).
  R["sci-butter"] = g(piece("hard", "", '<rect x="-8" y="-9" width="16" height="9" rx=".6" fill="#f6dc7a"/><path d="M-8-9l2.4-2h16l-2.4 2z" fill="#fbe9a6"/><path d="M8-9l2.4-2v9L8 0z" fill="#e9c75a"/>') +
    piece("soft", "", '<path d="M-10 0c-.6-3 .4-6.4 3-7.4 1.6-.6 3.2.4 4.6.2 1.2-.2 1.6-1.4 2.4-1.4s1.2 1.2 2.4 1.4c1.4.2 3-.8 4.6-.2 2.6 1 3.6 4.4 3 7.4z" fill="#f6dc7a"/>' +
      '<path d="M-1.6-7.6c.6 1.6 2.6 1.6 3.2 0" fill="none" stroke-width=".4"/>', true));
  /* ---- science-seed-20: push and pull ---- */
  // A toy wagon with a rope going forward to (24, -14), like sci-sled (origin: its bottom middle). Pieces: w1 and
  // w2 (the wheels, to turn).
  function wagonWheel(name, x) {
    return piece(name, x + " -3", '<circle cx="' + x + '" cy="-3" r="3" fill="#3d2c22"/><circle cx="' + x + '" cy="-3" r="1.2" fill="#cfd8dc"/><path d="M' + (x - 2.6) + ' -3h5.2" fill="none" stroke="#cfd8dc" stroke-width=".5"/>');
  }
  R["sci-wagon"] = g('<path d="M10-7Q17-9 24-14" fill="none" stroke="#8a5a3b" stroke-width=".9"/>' +
    '<rect x="-11" y="-13" width="21" height="8" rx="1" fill="#c0504d"/><path d="M-11-9.6h21" fill="none" stroke="#9c3f3a" stroke-width=".5"/>' +
    wagonWheel("w1", -6) + wagonWheel("w2", 5));
  /* ---- science-seed-21: sounds around us ---- */
  // A room seen from inside (stage units): a warm wall, a wooden floor from y = 72, a window (x 16 to 46, y 14 to
  // 42) with a grey rainy sky, and a kitchen counter on the right (x 106 to 160, top at y = 56).
  R["sci-room"] = g('<rect width="160" height="90" fill="#f6efdc" stroke="none"/><rect y="72" width="160" height="18" fill="#c98a4b"/><path d="M0 72h160M0 80h160" fill="none" stroke="#a0683f" stroke-width=".4"/>' +
    '<rect x="15" y="13" width="32" height="30" rx="1" fill="#fff"/><rect x="17" y="15" width="28" height="26" fill="#9aa9b5"/>' +
    '<path d="M20 17l-1.6 4M28 19l-1.6 4M38 16l-1.6 4M24 27l-1.6 4M34 25l-1.6 4M42 29l-1.6 4M21 35l-1.6 4M31 34l-1.6 4M40 37l-1.2 3" fill="none" stroke="#dbe6ee" stroke-width=".6"/>' +
    '<path d="M31 15v26M17 28h28" fill="none" stroke="#fff" stroke-width="1.4"/>' +
    '<rect x="106" y="56" width="54" height="16" fill="#e7c9a0"/><rect x="104" y="54" width="58" height="3" rx="1" fill="#b57638"/><path d="M120 60v10M140 60v10" fill="none" stroke="#b57638" stroke-width=".6"/>');
  // A door in the wall (origin: its bottom-left corner, on the floor). Piece: leaf (it opens towards us by
  // folding to the hinge on the left: sx 0.2 is open).
  R["sci-door"] = g('<rect x="-1.4" y="-41.4" width="22.8" height="41.4" fill="#e7c9a0"/><rect x="0" y="-40" width="20" height="40" fill="#5a4636"/>' +
    piece("leaf", "0 0", '<rect x="0" y="-40" width="20" height="40" fill="#a0683f"/><rect x="3" y="-36" width="14" height="14" rx="1" fill="#b5743a"/><rect x="3" y="-19" width="14" height="15" rx="1" fill="#b5743a"/><circle cx="16.4" cy="-20" r="1.1" fill="#f6d58a"/>'));
  // A kettle on a little gas ring (origin: the middle of the ring's bottom); the spout points left. Pieces: lid
  // (it rattles), whistle (the cap on the spout).
  R["sci-kettle"] = g('<rect x="-10" y="-3" width="20" height="3" rx="1" fill="#5b5b5b"/>' +
    '<path d="M-8-3c-1-6 1-11 8-11s9 5 8 11z" fill="#d9d9d9"/><path d="M-6-11c-3-1-6-3-7-6l-1.4 1c1 3 4 6 7 7z" fill="#cfcfcf"/>' +
    '<path d="M-5-14c0-5 10-5 10 0" fill="none" stroke="#3d2c22" stroke-width="1.4"/><path d="M-5-14c0-5 10-5 10 0" fill="none" stroke="#e5483f" stroke-width=".7"/>' +
    piece("lid", "0 -14", '<path d="M-4-14c0-1.6 2-2.4 4-2.4s4 .8 4 2.4z" fill="#bdbdbd"/><circle cy="-16.8" r=".9" fill="#3d2c22"/>') +
    piece("whistle", "-13.8 -16.4", '<rect x="-15.4" y="-18.4" width="3" height="2.4" rx=".6" fill="#e5483f" transform="rotate(-30 -13.8 -17)"/>') +
    '<path d="M-5-8c1.6-1.4 3-1.6 4.6-1.4" fill="none" stroke="#fff" stroke-width=".7"/>');
  /* ---- science-seed-22: build a tall tower ---- */
  // Wooden toy blocks (origin: the middle of the bottom), 10 wide and 8 tall, in four colours.
  [["r", "#e5483f"], ["y", "#f6c94b"], ["b", "#5b9bd5"], ["g", "#6fae4e"]].forEach(function (c) {
    R["sci-block-" + c[0]] = g('<rect x="-5" y="-8" width="10" height="8" rx=".6" fill="' + c[1] + '"/><rect x="-3.4" y="-6.4" width="6.8" height="4.8" rx=".4" fill="#fff" opacity=".25" stroke="none"/>');
  });
  /* ---- science-seed-24: a little scientist in the yard ---- */
  // A round bush (origin: its bottom middle), 30 wide and 26 tall. Piece: flap (a big leaf on its left side, at
  // about (-9, -14); r 40 lifts it, turning round its stalk at (-2, -14), to show what is under it).
  R["sci-bush"] = g(circles([[-8, -9, 8], [6, -10, 9], [0, -18, 9], [-10, -16, 6], [11, -18, 6]], 8, "#5a9a45") +
    '<g stroke="none">' + circles([[-4, -20, 3], [7, -14, 2.6], [-11, -11, 2.2]], 2, "#7cbf5a") + "</g>" +
    piece("flap", "-2 -14", '<path d="M-2-14c-4-4-11-4-15 0 4 4 11 4 15 0z" fill="#86c062"/><path d="M-2-14h-13" fill="none" stroke-width=".35"/>'));
  B.RIG = Object.assign(B.RIG, R);
})();

/* ---------- more of the sprout garden (science-sprout-7 to sprout-45) ---------- */
(function () {
  var S = B.SCI, g = S.g, piece = S.piece, glow = S.glow, circles = S.circles, rnd = S.rnd, twoTone = S.twoTone;
  var R = {};

  /* ---- science-sprout-7: look and ask ---- */
  // The way into an ants' nest: a dark hole in a crack (centre).
  R["sci-nesthole"] = '<ellipse rx="2.2" ry=".9" fill="#3d2c22"/><path d="M-5 0h-3M5 0h4" fill="none" stroke="#7a5233" stroke-width=".4"/>';
  // A sheet of paper held up (centre), 26 wide and 20 tall. Piece: sketch (a child's drawing in pencil lines: the
  // wall, the sugar cube and ants walking to it; draw it with `draw`).
  R["sci-notebook"] = g('<rect x="-13" y="-10" width="26" height="20" rx="1" fill="#fffdf6"/><path d="M-11-6h22M-11-2h22M-11 2h22M-11 6h22" fill="none" stroke="#cfe3f0" stroke-width=".3"/>') +
    piece("sketch", "", '<g fill="none" stroke="#5b6fd0" stroke-width=".6" stroke-linecap="round"><path d="M-11 5h22"/><path d="M-6 5v-3h3v3"/>' +
      '<path d="M8 4.6a.8.8 0 1 0 .1 0M5 4.6a.8.8 0 1 0 .1 0M2 4.6a.8.8 0 1 0 .1 0"/><path d="M6-4c-3-3-7-3-10 0M-4-4l1.6-1.6M-4-4l2 .4"/><path d="M-9-6.6c0-1.6 2.4-1.6 2.4 0 0 1-1.2 1.2-1.2 2.2M-7.8-2.4v.2"/></g>');
  /* ---- science-sprout-11: feathers, fur, scales ---- */
  // A feather (centre), 14 long, pointing up and to the right.
  R["sci-feather"] = g('<path d="M-6 6C-6-1 0-7 7-7 6 0 0 6-6 6z" fill="#f4f0e6"/><path d="M-7 7L6-6" fill="none" stroke-width=".5"/>' +
    '<path d="M-3 3l-1.4-2M0 0l-1.6-2.4M3-3l-1.4-2.4M-3 3l2 1.2M0 0l2.4 1M3-3l2.4.8" fill="none" stroke="#c9c2b2" stroke-width=".35"/>');
  // A sugar cube (centre), 2.4 across.
  R["sci-sugar"] = g('<path d="M-1.2-1.6l.6-.6h2.4l-.6.6z" fill="#fff"/><path d="M1.2-1.6l.6-.6v2.4l-.6.6z" fill="#e6e6e6"/><rect x="-1.2" y="-1.6" width="2.4" height="2.4" fill="#fafafa" stroke-width=".25"/>', ' stroke-width=".25"');
  // A fish from the side, facing left (centre), 36 long, with its scales drawn like roof tiles. Piece: tail (it
  // wags, turning at its root at (12, 0)).
  R["sci-fish"] = (function () {
    var scales = "";
    for (var col = 0; col < 7; col++) for (var row = -2; row <= 2; row++) {
      var x = -8 + col * 3, y = row * 2.6 + (col % 2 ? 1.3 : 0);
      if (Math.abs(y) > 7.6 - Math.abs(x - 2) * 0.3) continue;
      scales += "M" + (x - 1.5) + " " + (y - 1.3) + "a1.6 1.6 0 0 0 0 2.6";
    }
    return g(piece("tail", "12 0", '<path d="M11 0l8-7c1 4 1 10 0 14z" fill="#e5702f"/>') +
      '<path d="M-17 0c2-6 10-9 17-9s11 4 13 9c-2 5-6 9-13 9s-15-3-17-9z" fill="#f6a13c"/>' +
      '<path d="M-2-8.6l4-4 4 4z" fill="#e5702f"/><path d="M0 8.6l3 4 3-4z" fill="#e5702f"/>' +
      '<path d="' + scales + '" fill="none" stroke="#c96a1f" stroke-width=".45"/>' +
      '<path d="M-9-7c-2 3-2 11 0 14" fill="none" stroke-width=".5"/><circle cx="-12.4" cy="-2" r="1.6" fill="#fff"/><circle cx="-12.8" cy="-2" r=".8" fill="#3d2c22" stroke="none"/>');
  })();
  /* ---- science-sprout-12: plant eaters and meat eaters ---- */
  // The desert (stage units): a pale sky, sand dunes, and the ground from about y = 70.
  R["sci-desert"] = g('<rect width="160" height="90" fill="#f8e7c4" stroke="none"/><path d="M0 60c20-10 40-12 60-4s40 6 60-4 30-4 40 0v38H0z" fill="#ecc98a"/>' +
    '<path d="M0 72c30-6 60-6 90-2s50 2 70-2v22H0z" fill="#e2b56c"/><path d="M30 64c8-3 16-3 24 0M104 60c8-3 14-3 20 0" fill="none" stroke="#cf9f55" stroke-width=".5"/>');
  // A thorny desert shrub, خار شتر (origin: its bottom middle), 16 wide. Piece: bite (a few twigs that go when the
  // camel eats).
  R["sci-thorn"] = g('<path d="M0 0c0-4-3-8-7-10M0 0c0-5 2-9 6-12M0 0c-1-3-4-5-7-5M0 0c1-4 4-6 8-6" fill="none" stroke="#8a7a3a" stroke-width=".9"/>' +
    '<g fill="#9cae5a">' + circles([[-7, -10, 1.6], [6, -12, 1.8], [-7, -5, 1.4], [8, -6, 1.5], [0, -8, 1.6]], 1.5, "#9cae5a") + "</g>" +
    piece("bite", "", '<g fill="#9cae5a">' + circles([[-3, -13, 1.6], [3, -15, 1.5], [9, -11, 1.4]], 1.5, "#9cae5a") + "</g>"));
  /* ---- science-sprout-14: what a plant needs ---- */
  // A cupboard seen from the front (origin: its bottom middle), 32 wide and 38 tall: the dark inside (no shelf, so a
  // plant fits), and its door
  // as a separate drawing, sci-cupboard-door, the whole front (origin: the hinge at its bottom right corner, so it goes
  // at the cupboard's x + 16; sx 0.12 opens it).
  R["sci-cupboard"] = g('<rect x="-16" y="-38" width="32" height="38" rx="1" fill="#b5743a"/><rect x="-13" y="-35" width="26" height="32" fill="#3f2c22"/>');
  R["sci-cupboard-door"] = g('<rect x="-32" y="-38" width="32" height="38" rx="1" fill="#c98a4b"/><rect x="-28" y="-34" width="24" height="30" rx=".6" fill="#d9a066" stroke-width=".4"/>' +
    '<circle cx="-29.6" cy="-19" r="1" fill="#f6d58a"/>');
  // The window of sci-room at night (stage units): a dark sky in the glass.
  R["sci-window-night"] = '<rect x="17" y="15" width="28" height="26" fill="#1f2a52"/><path d="M31 15v26M17 28h28" fill="none" stroke="#fff" stroke-width="1.4"/>';
  // A plant grown in the dark (origin: the soil): tall, thin and pale, with small yellow leaves, 26 tall.
  R["sci-plant-pale"] = g('<path d="M0 0c0-8 1.4-16-.6-26" fill="none" stroke="#d8d48a" stroke-width="1"/>' +
    '<g fill="#efe39a"><path d="M0-12c-2-1.6-4.6-1.8-6-.4 1.6 1.4 4.2 1.6 6 .4z"/><path d="M.2-19c2-1.6 4.4-1.6 5.6-.2-1.4 1.4-4 1.4-5.6.2z"/><path d="M-.4-25.6c-1.4-1.2-3.2-1.2-4.2 0 1 1 2.8 1 4.2 0z"/></g>');
  // The window of sci-room on a sunny day (stage units): blue sky and the sun in the glass.
  R["sci-window-day"] = '<rect x="17" y="15" width="28" height="26" fill="#bfe3f5"/><circle cx="38" cy="21" r="3.4" fill="#fcd34d" stroke="#3d2c22" stroke-width=".5"/>' +
    '<path d="M31 15v26M17 28h28" fill="none" stroke="#fff" stroke-width="1.4"/>';
  // Sunlight falling into the room from the window (stage units): a soft pale beam down to the floor.
  R["sci-sunbeam"] = '<path d="M17 41h28l12 31H22z" fill="#fff3b0" opacity=".45"/>';
  /* ---- science-sprout-15: fruits and seeds ---- */
  // Fruits that open (origin: the middle of their bottom, on the table). Pieces: whole (the fruit as it is), and l
  // and r (its two halves, cut side towards us, hidden: show them and move them apart).
  function halves(w, h, skin, flesh, seeds) {
    var half = function (name, dx) {
      return piece(name, "", '<g transform="translate(' + dx + ' 0)"><ellipse cy="' + (-h / 2) + '" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + skin + '"/>' +
        '<ellipse cy="' + (-h / 2) + '" rx="' + (w / 2 - 1.2) + '" ry="' + (h / 2 - 1.2) + '" fill="' + flesh + '" stroke="none"/>' + seeds + "</g>", true);
    };
    return half("l", 0) + half("r", 0);
  }
  var POM_SEEDS = (function () { var s = ""; for (var i = 0; i < 40; i++) { var a = rnd(i + 3) * 6.283, r = Math.sqrt(rnd(i + 9)) * 6.2; s += '<circle cx="' + (Math.cos(a) * r).toFixed(1) + '" cy="' + (-7 + Math.sin(a) * r * 0.9).toFixed(1) + '" r=".9" fill="#c2302b" stroke="#7c1d1a" stroke-width=".2"/>'; } return s; })();
  R["sci-pomegranate"] = g(piece("whole", "", '<circle cy="-7.6" r="7.6" fill="#c2302b"/><path d="M-2-14.6l.6-2.4 1.4 1.4 1.4-1.4.6 2.4z" fill="#9c2f2a"/><circle cx="-3" cy="-10" r="1.2" fill="#fff" opacity=".4" stroke="none"/>') +
    halves(15, 15, "#c2302b", "#f6e3c8", POM_SEEDS));
  var MELON_SEEDS = (function () { var s = ""; for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283; s += '<ellipse cx="' + (Math.cos(a) * 4).toFixed(1) + '" cy="' + (-6 + Math.sin(a) * 2.6).toFixed(1) + '" rx=".9" ry=".5" fill="#f4e6c0" stroke="#b08a4a" stroke-width=".2" transform="rotate(' + (a * 57.3).toFixed(0) + " " + (Math.cos(a) * 4).toFixed(1) + " " + (-6 + Math.sin(a) * 2.6).toFixed(1) + ')"/>'; } return s; })();
  R["sci-muskmelon"] = g(piece("whole", "", '<ellipse cy="-6" rx="11" ry="6" fill="#e9d36a"/><path d="M-8-9c4 1 12 1 16 0M-9-5c5 1 13 1 18 0M-8-2c4 .8 12 .8 16 0" fill="none" stroke="#b9a23a" stroke-width=".4"/>') +
    halves(22, 12, "#e9d36a", "#f6c98a", '<ellipse cy="-6" rx="5.4" ry="3.4" fill="#f2a65a" stroke="none"/>' + MELON_SEEDS));
  // A date, خرما (origin: its bottom middle). Pieces: whole, open (the date split, its flesh around the stone;
  // hidden), stone (the long seed, hidden; it can come out).
  R["sci-date"] = g(piece("whole", "", '<ellipse cy="-3" rx="5" ry="3" fill="#7a3b1e"/><path d="M-3-4.6c2-.6 4-.4 5.6.4" fill="none" stroke="#a0582e" stroke-width=".5"/>') +
    piece("open", "", '<ellipse cy="-3" rx="5.4" ry="3.4" fill="#7a3b1e"/><ellipse cy="-3" rx="4.4" ry="2.4" fill="#c08040" stroke="none"/>', true) +
    piece("stone", "", '<ellipse cy="-3" rx="3.4" ry="1.2" fill="#d9c3a0"/><path d="M-3-3h6" fill="none" stroke-width=".3"/>', true));
  /* ---- science-sprout-40: a weather chart ---- */
  // The window of sci-room on a cloudy day (stage units).
  R["sci-window-cloudy"] = '<rect x="17" y="15" width="28" height="26" fill="#c9d6de"/><g fill="#fff" stroke="#9fb0bc" stroke-width=".4"><ellipse cx="25" cy="23" rx="6" ry="3"/><ellipse cx="37" cy="31" rx="7" ry="3.4"/></g>' +
    '<path d="M31 15v26M17 28h28" fill="none" stroke="#fff" stroke-width="1.4"/>';
  // A weather chart pinned on the wall (origin: its top left corner), 56 wide and 50 tall, with four columns (at
  // x = 9, 21, 33 and 45) whose pictures stack up from y = 38; the column pictures go under them at y = 45.
  R["sci-weatherchart"] = g('<rect width="56" height="50" rx="1.4" fill="#fffdf6"/><path d="M3 39h50M15 4v42M27 4v42M39 4v42" fill="none" stroke="#cfe3f0" stroke-width=".4"/>' +
    '<circle cx="28" cy="1.6" r="1.2" fill="#e5483f"/>');
  /* ---- science-sprout-41: the weather forecast ---- */
  // A television on a low table (origin: the middle of the table's bottom), 34 wide. Pieces: map (the weather map
  // on the screen: Iran's outline in green with a sun), cloud (a rain cloud on the map; hidden), wind (wind lines on
  // the map; hidden).
  R["sci-tv"] = g('<rect x="-17" y="-10" width="34" height="10" rx="1" fill="#a0683f"/><rect x="-15" y="-36" width="30" height="24" rx="1.6" fill="#3d3d3d"/>' +
    '<rect x="-13" y="-34" width="26" height="19" fill="#bfe3f5"/><path d="M-3-12v2M3-12v2" fill="none" stroke-width="1"/>' +
    piece("map", "", '<path d="M-9-31l5-1 4 2 5-1 3 3-1 4 2 3-3 3-5-1-4 2-4-2-1-4-3-2z" fill="#9cc77a" stroke-width=".4"/><circle cx="7" cy="-30" r="2" fill="#fcd34d" stroke-width=".3"/>') +
    piece("cloud", "", '<g transform="translate(-2 -25)"><ellipse rx="5" ry="2.4" fill="#fff" stroke-width=".3"/><path d="M-3 3l-1 2M0 3l-1 2M3 3l-1 2" fill="none" stroke="#5b9bd5" stroke-width=".6"/></g>', true) +
    piece("wind", "", '<path d="M-10-20h8c1.4 0 2-1.4 1-2.2M-8-17h10" fill="none" stroke="#fff" stroke-width=".8"/>', true));
  /* ---- science-sprout-28: fast and slow (seen from above) ---- */
  // A rug seen from above (stage units), with a Persian border.
  R["sci-rug-top"] = g('<rect width="160" height="90" fill="#e7c9a0" stroke="none"/><rect x="8" y="6" width="144" height="78" rx="2" fill="#b5413b"/>' +
    '<rect x="13" y="11" width="134" height="68" fill="#d9614f" stroke="#f6d58a" stroke-width="1.2"/><path d="M80 24l18 21-18 21-18-21z" fill="#3f6f8f" stroke="#f6d58a" stroke-width=".8"/>' +
    '<g fill="#f6d58a" stroke="none">' + circles([[20, 18, 1.2], [140, 18, 1.2], [20, 72, 1.2], [140, 72, 1.2]], 1.2, "#f6d58a") + "</g>");
  // A ball seen from above (centre), with a pattern that shows it turning.
  R["sci-ball-top"] = g('<circle r="5" fill="#fff"/><path d="M-5 0h10M0-5v10" fill="none" stroke="#e5483f" stroke-width="1"/><circle r="1.6" fill="#e5483f" stroke="none"/>');
  /* ---- science-sprout-29: roll, slide, swing, spin ---- */
  // A playground slide from the side (origin: its bottom middle): a ladder on the left up to the top at (-12, -30),
  // and the chute down to the right, ending at (22, -3).
  R["sci-slide"] = g('<path d="M-20 0l6-32M-12 0l2-32" fill="none" stroke="#5b5b5b" stroke-width="1.2"/><path d="M-19-6h8M-18-12h8M-17-18h8M-16-24h8" fill="none" stroke="#5b5b5b" stroke-width=".9"/>' +
    '<path d="M-14-32h6c4 0 8 10 14 18s10 11 18 11v3c-9 0-14-4-20-12s-8-17-12-17h-6z" fill="#e5483f"/><path d="M8 0v-11" fill="none" stroke="#5b5b5b" stroke-width="1.2"/>');
  // A swing (origin: the middle of its frame's feet), 40 wide and 40 tall. Piece: seat (the ropes, the seat and a
  // boy sitting on it; it swings round the top bar at (0, -40)).
  R["sci-swing"] = g('<path d="M-20 0l8-40h24l8 40" fill="none" stroke="#8a5a3b" stroke-width="1.6"/><path d="M-12-40h24" fill="none" stroke="#8a5a3b" stroke-width="2"/>' +
    piece("seat", "0 -40", '<path d="M-5-40v30M5-40v30" fill="none" stroke="#5b5b5b" stroke-width=".5"/><rect x="-7" y="-10.6" width="14" height="2" rx=".6" fill="#c0504d"/>' +
      '<path d="M-1-10.6h7v6.4" fill="none" stroke="#3f6f8f" stroke-width="2.6"/><path d="M5.2-3.4h2.6" fill="none" stroke="#3d2c22" stroke-width="1.6"/>' +
      '<rect x="-3.6" y="-20" width="6.4" height="9.4" rx="2.4" fill="#4f8fd6"/><path d="M1-18l4-6" fill="none" stroke="#4f8fd6" stroke-width="2"/>' +
      '<circle cx="0" cy="-24" r="3.6" fill="' + "var(--skin,#f3c39b)" + '"/><path d="M-3.4-25c-.2-3 2.6-4.2 4.8-3.6 1.6.4 2.6 1.4 2.6 2.8-2-.6-3.8-.2-4.8.8-.8 1.2-1.4 1.4-2.6 0z" fill="#3d2c22"/>' +
      '<circle cx="2" cy="-24.6" r=".5" fill="#3d2c22" stroke="none"/><path d="M1.6-22.4q.8.5 1.6 0" fill="none" stroke-width=".35"/>'));
  // A paper pinwheel on a stick (origin: the bottom of the stick), 30 tall. Piece: blades (they spin round (0, -26)).
  R["sci-pinwheel"] = g('<path d="M0 0v-26" fill="none" stroke="#8a5a3b" stroke-width="1.2"/>' +
    piece("blades", "0 -26", '<g transform="translate(0 -26)"><path d="M0 0L0-9 6-6z" fill="#e5483f"/><path d="M0 0L9 0 6 6z" fill="#5b9bd5"/><path d="M0 0L0 9-6 6z" fill="#f6c94b"/><path d="M0 0L-9 0-6-6z" fill="#6fae4e"/><circle r="1" fill="#fff"/></g>'));
  /* ---- science-sprout-33: the sun warms ---- */
  // A smooth stone (origin: its bottom middle), 14 wide.
  R["sci-stone"] = g('<path d="M-7 0c-1-4 1-7 5-7.6 4-.6 8 1 9 4.4.6 1.6.2 2.8-.6 3.2z" fill="#a8a29a"/><path d="M-3-5.6c1.6-.8 3.6-.8 5 0" fill="none" stroke="#fff" stroke-width=".6" opacity=".6"/>');
  // Warmth rising from something warm: three wavy red lines (origin: their bottom middle), to draw like a pencil.
  R["sci-warm"] = '<g fill="none" stroke="#e5702f" stroke-width=".8" stroke-linecap="round"><path d="M-6 0c-1.6-2 1.6-4 0-6s1.6-4 0-6"/><path d="M0-1c-1.6-2 1.6-4 0-6s1.6-4 0-6"/><path d="M6 0c-1.6-2 1.6-4 0-6s1.6-4 0-6"/></g>';
  // A tree's shade on the ground (centre): a dark, see-through patch.
  R["sci-shade"] = '<ellipse rx="22" ry="3.6" fill="#3d2c22" opacity=".22"/>';
  // A shade a child makes for a toy (origin: the middle of the ground between its two sticks), 24 wide and 18 tall.
  // Pieces: sticks (two sticks pushed into the ground), cloth (a cloth tied across their tops; hidden).
  R["sci-canopy"] = g(piece("sticks", "0 0", '<path d="M-11 0v-18M11 0v-18" fill="none" stroke="#8a5a3b" stroke-width="1.2"/>') +
    piece("cloth", "0 -18", '<path d="M-13-18c4-3 8 1 13-2s9 1 13-1l-1 4c-4 1-8-2-12 1s-9-1-13 2z" fill="#3fb0a8"/>', true));
  /* ---- science-sprout-35: living things change the place they live ---- */
  // Ant tunnels under the ground (stage units, in sci-soil's soil below y = 58), to draw like a pencil.
  R["sci-tunnels"] = '<g fill="none" stroke-linecap="round"><path d="M40 58c2 6-4 10 0 16s8 6 14 8M44 72c6-2 10 0 14-4M40 66c-6 2-10 6-12 12M54 82c4 2 10 2 14-2" stroke="#3d2c22" stroke-width="3.2"/>' +
    '<path d="M40 58c2 6-4 10 0 16s8 6 14 8M44 72c6-2 10 0 14-4M40 66c-6 2-10 6-12 12M54 82c4 2 10 2 14-2" stroke="#5a3a22" stroke-width="2.2"/></g>';
  // A little heap of soil the ants carried out (origin: its bottom middle).
  R["sci-anthill"] = g('<path d="M-7 0c2-4 5-6 7-6s5 2 7 6z" fill="#8a6440"/><ellipse cy="-5.4" rx="1.2" ry=".5" fill="#3d2c22" stroke="none"/>');
  // A rock with a crack (origin: its bottom middle), 30 wide. Pieces: left and right (its two halves: the crack
  // opens as they turn apart round their bottom corners), root (a root growing down into the crack; draw it).
  R["sci-rock"] = g(piece("left", "-15 0", '<path d="M-15 0c-1-8 2-14 8-16l6-1 1 6-2 5 2 6z" fill="#9c9488"/>') +
    piece("right", "15 0", '<path d="M15 0c1-7-1-13-6-16l-9-1 1 6-2 5 2 6z" fill="#8f877b"/>') +
    piece("root", "", '<path d="M0-24c0 4 1 6 0 9s-2 6 0 9 1 4 0 6" fill="none" stroke="#c9a06a" stroke-width="1.4"/>'));
  // A brick (origin: the middle of its bottom), 8 wide and 4 tall.
  R["sci-brick"] = g('<rect x="-4" y="-4" width="8" height="4" fill="#c4673a"/>');
  /* ---- science-sprout-18: don't waste water ---- */
  // A toothbrush (centre), held across, the brush on the right.
  R["sci-toothbrush"] = g('<rect x="-8" y="-.8" width="14" height="1.6" rx=".8" fill="#5b9bd5"/><rect x="4" y="-2.6" width="4.4" height="1.8" fill="#fff"/>');
  /* ---- science-sprout-36: sorting waste ---- */
  // Recycling bins (origin: the bottom middle), 18 wide and 22 tall, open at the top, in four colours: paper
  // (blue), plastic (yellow), glass (green), food (brown).
  [["paper", "#5b9bd5"], ["plastic", "#f6c94b"], ["glass", "#6fae4e"], ["food", "#a0683f"]].forEach(function (c) {
    R["sci-bin-" + c[0]] = g('<path d="M-9-20h18l-2 20H-7z" fill="' + c[1] + '"/><rect x="-10" y="-22" width="20" height="3" rx="1" fill="' + c[1] + '"/><ellipse cy="-20.5" rx="8" ry="1" fill="#3d2c22" opacity=".5" stroke="none"/>' +
      '<path d="M-4-14v10M0-14v10M4-14v10" fill="none" stroke="#fff" stroke-width=".6" opacity=".5"/>');
  });
  // A crumpled sheet of paper (centre).
  R["sci-paperball"] = g('<path d="M-3-2l2-1.4 2 .6 2-.4.4 2.4-1 2 .4 1.6-2.6.6-1.8-.8-1.8.4-.6-2.2z" fill="#fffdf6"/><path d="M-1-1l1 1.6M1.6-.8l-1 2" fill="none" stroke-width=".3"/>');
  // A glass jam jar (origin: its bottom middle), 10 wide and 12 tall. Piece: pencils (three coloured pencils standing
  // in it; hidden).
  R["sci-jar"] = g(piece("pencils", "", '<path d="M-2-10l-1-10M0-10v-11M2-10l1-10" fill="none" stroke-width="1.6"/><path d="M-2-10l-1-10" fill="none" stroke="#e5483f" stroke-width="1"/><path d="M0-10v-11" fill="none" stroke="#5b9bd5" stroke-width="1"/><path d="M2-10l1-10" fill="none" stroke="#f6c94b" stroke-width="1"/>', true) +
    '<path d="M-5 0v-10c0-1 .6-1.6 1.4-1.6h7.2c.8 0 1.4.6 1.4 1.6V0z" fill="#d9f0f7" fill-opacity=".6"/><rect x="-4.6" y="-13.4" width="9.2" height="2" rx=".5" fill="#e5483f"/>');
  // An apple core (centre).
  R["sci-core"] = g('<path d="M-2-4c1 .6 3 .6 4 0-.6 1.6-.6 3 0 4.4-.6 1.4-.6 2.8 0 3.6-1 .6-3 .6-4 0 .6-.8.6-2.2 0-3.6.6-1.4.6-2.8 0-4.4z" fill="#f6e6b0"/><path d="M0-4v-1.6" fill="none" stroke="#6e4a2e" stroke-width=".5"/>');
  /* ---- science-sprout-30: design a boat ---- */
  // A basin of water seen from the side (origin: its bottom middle), 60 wide; the water's top is at y = -14.
  // Draw it in two parts so a boat can float in it: sci-basin (the basin) behind the boat, sci-basin-water (the
  // water, see-through, and the basin's outline) in front.
  R["sci-basin"] = g('<path d="M-30-22h60l-4 22h-52z" fill="#dfe7ec"/>');
  R["sci-basin-water"] = '<path d="M-29-14h58l-2.6 13h-52.8z" fill="#7fc0ea" opacity=".7"/><path d="M-29-14h58" fill="none" stroke="#3f7fd0" stroke-width=".4"/>' +
    '<path d="M-30-22h60l-4 22h-52z" fill="none" stroke="#3d2c22" stroke-width=".6"/>';
  // A boat made of foil (origin: the middle of its bottom). Pieces: in (water that got in; hidden).
  R["sci-foilboat"] = g('<path d="M-9-4h18l-3 4h-12z" fill="#cfd8dc"/><path d="M-7-3l2 .6M-1-3.4l2 .8M4-3l2 .6" fill="none" stroke="#fff" stroke-width=".5"/>' +
    piece("in", "", '<path d="M-7-1.6h14l-1.4 1.6H-5.6z" fill="#7fc0ea" stroke="none"/>', true));
  // The better boat: wider, with high sides (origin: the middle of its bottom).
  R["sci-foilboat2"] = g('<path d="M-14-8h28l-3 8h-22z" fill="#cfd8dc"/><path d="M-11-6l2 .6M-3-6.4l2 .8M5-6l2 .6" fill="none" stroke="#fff" stroke-width=".5"/>');
  // A pebble (centre).
  R["sci-pebble"] = g('<ellipse rx="1.6" ry="1.1" fill="#9c9488" stroke-width=".3"/>');
  // A sheet with a plan of the better boat in pencil (centre), 30 wide and 22 tall. Piece: sketch (draw it).
  R["sci-plan"] = g('<rect x="-15" y="-11" width="30" height="22" rx="1" fill="#fffdf6"/>') +
    piece("sketch", "", '<g fill="none" stroke="#5b6fd0" stroke-width=".7" stroke-linecap="round"><path d="M-10-2h20l-3 6h-14z"/><path d="M-10-2v-3M10-2v-3"/><path d="M-12 6c4-1.4 8 1.4 12 0s8 1.4 12 0"/>' +
      '<path d="M-3-1a1 1 0 1 0 .1 0M0-1a1 1 0 1 0 .1 0M3-1a1 1 0 1 0 .1 0"/></g>');
  // A green glass bottle (origin: its bottom middle), 8 wide and 22 tall.
  R["sci-glassbottle"] = g('<path d="M-4 0v-12c0-2.4 2.4-3.4 2.6-5.6V-21h2.8v3.4C1.6-15.4 4-14.4 4-12V0z" fill="#6fae4e" fill-opacity=".85"/><path d="M-2.4-12v10" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>');
  /* ---- science-sprout-24: hot and cold ---- */
  // A thermos flask (origin: its bottom middle), 10 wide and 26 tall.
  R["sci-thermos"] = g('<rect x="-5" y="-22" width="10" height="22" rx="2" fill="#3f6f8f"/><rect x="-5.6" y="-26" width="11.2" height="4.6" rx="1.2" fill="#e5483f"/>' +
    '<path d="M-3-18v13" fill="none" stroke="#fff" stroke-width=".8" opacity=".5"/><rect x="-5" y="-12" width="10" height="3" fill="#5b9bd5" stroke="none"/>');
  // A small clock (centre), for time going by. Piece: hand (the long hand, turning round the middle).
  R["sci-clock"] = g('<circle r="7" fill="#fff"/><path d="M0-5.6v1.2M5.6 0h-1.2M0 5.6v-1.2M-5.6 0h1.2" fill="none" stroke-width=".5"/><path d="M0 0l2.6 1.6" fill="none" stroke-width=".9"/>' +
    piece("hand", "0 0", '<path d="M0 0v-5" fill="none" stroke="#e5483f" stroke-width=".8"/>') + '<circle r=".7" fill="#3d2c22"/>');
  /* ---- science-sprout-25: solids and liquids ---- */
  // A wide glass bowl seen from the side (origin: its bottom middle), 24 wide and 10 tall. Piece: water (it fills
  // from the bottom: start it at sy 0).
  R["sci-wbowl"] = g(piece("water", "0 0", '<path d="M-11-7.4h22c-.6 4-3.6 7.4-11 7.4S-10.4-3.4-11-7.4z" fill="#9fd3f0" stroke="none"/>') +
    '<path d="M-12-10h24c-.4 6-4.6 10-12 10s-11.6-4-12-10z" fill="#eaf7fc" fill-opacity=".3"/>');
  // A heap of sand (origin: its bottom middle), 20 wide, the grains drawn. Grows with sy.
  R["sci-sandheap"] = g('<path d="M-10 0c3-4 6-8 10-8s7 4 10 8z" fill="#e7c27a"/>' + '<g fill="#c99a4a" stroke="none">' +
    (function () { var s = ""; for (var i = 0; i < 40; i++) { var x = (rnd(i + 2) - 0.5) * 18, y = -rnd(i + 7) * (8 - Math.abs(x) * 0.75); s += '<circle cx="' + x.toFixed(1) + '" cy="' + Math.min(-0.5, y).toFixed(1) + '" r=".35"/>'; } return s; })() + "</g>");
  // Sand pouring down (origin: its top), 20 long: a stream of grains.
  R["sci-sandstream"] = '<path d="M0 0v20" fill="none" stroke="#e7c27a" stroke-width="1.6" stroke-dasharray=".8 .6"/>';
  // A glass with a little sand in it (origin: its bottom middle), to tip and pour.
  R["sci-sandglass"] = g('<path d="M-5-4h10l-.8 4h-8.4z" fill="#e7c27a" stroke="none"/><path d="M-6-16h12l-1.2 16h-9.6z" fill="#eaf7fc" fill-opacity=".3"/>');
  /* ---- science-sprout-17: our watery Earth ---- */
  // A qanat cut open (stage units): a mountain on the left with water deep under it, a line of wells down to a
  // gently sloping tunnel, and a village on the right where the water comes out into a pool. Piece: flow (the water
  // in the tunnel, to draw like a pencil from the mountain to the village).
  R["sci-qanat"] = g('<rect width="160" height="90" fill="#f8e7c4" stroke="none"/><path d="M0 46L18 20l16 14 12-6 20 16H160v46H0z" fill="#d9b77a"/>' +
    '<path d="M0 58c14-3 28-2 40 2v30H0z" fill="#8fb0c4" opacity=".55" stroke="none"/>' +
    '<path d="M40 61L132 66" fill="none" stroke="#7a5233" stroke-width="3.4"/><path d="M40 61L132 66" fill="none" stroke="#c9a06a" stroke-width="2.4"/>' +
    '<path d="M56 44v18M72 44v19M88 44v20M104 44v21M120 44v21" fill="none" stroke="#7a5233" stroke-width="1.6"/>' +
    '<g fill="#c99a4a">' + [56, 72, 88, 104, 120].map(function (x) { return '<path d="M' + (x - 4) + ' 44c1.4-2.4 6.6-2.4 8 0z"/>'; }).join("") + "</g>" +
    '<path d="M132 66c2-2 4-6 6-10h22v34h-28z" fill="#d9b77a" stroke="none"/><ellipse cx="146" cy="56" rx="10" ry="2" fill="#7fc0ea"/>' +
    '<rect x="132" y="32" width="12" height="12" fill="#e7c9a0"/><path d="M130 33l8-6 8 6z" fill="#c4673a"/><path d="M152 44c0-6 2-10 2-14M156 44c0-4 1-8 3-11" fill="none" stroke="#5a9a45" stroke-width="1.2"/>') +
    piece("flow", "", '<path d="M18 60L40 61L132 66L142 57" fill="none" stroke="#3f7fd0" stroke-width="1.2" stroke-linecap="round"/>');
  // A water pipe from a dam lake to a house, with the house's tap (stage units). Piece: flow (water along the pipe,
  // to draw like a pencil).
  R["sci-pipes"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 40L14 18l16 12 10-8 16 20z" fill="#9c8670"/>' +
    '<path d="M0 40h40v10H0z" fill="#5b9bd5"/><rect x="40" y="30" width="6" height="22" fill="#cfd8dc"/><path d="M0 52c40-4 100-4 160 0v38H0z" fill="#a9d68b"/>' +
    '<path d="M46 48c20 0 30 10 60 10h20v-12" fill="none" stroke="#8a9aa6" stroke-width="3"/>' +
    '<rect x="112" y="28" width="34" height="30" fill="#f6d58a"/><path d="M108 29l21-14 21 14z" fill="#c0504d"/><rect x="126" y="44" width="2" height="5" fill="#b8c0c8"/>') +
    piece("flow", "", '<path d="M46 48c20 0 30 10 60 10h20v-12" fill="none" stroke="#3f7fd0" stroke-width="1.4" stroke-linecap="round"/>');
  /* ---- science-sprout-19: air is everywhere ---- */
  // A balloon (origin: its knot), round and red; it is blown up by scaling it.
  R["sci-balloon"] = g('<path d="M0 0c-1-1-1-2 0-2.4.8.4 1 1.4 0 2.4z" fill="#e5483f"/><ellipse cy="-9" rx="6" ry="7.4" fill="#e5483f"/><ellipse cx="-2.4" cy="-12" rx="1.2" ry="2" fill="#fff" opacity=".5" stroke="none"/>');
  // A plastic bag (origin: its bottom middle). Pieces: flat (empty and flat), full (puffed up with air, hidden).
  R["sci-bag"] = g(piece("flat", "", '<path d="M-7 0l.4-14h13.2l.4 14z" fill="#eef4f8" fill-opacity=".85"/><path d="M-5-14v-3M5-14v-3" fill="none" stroke-width=".6"/>') +
    piece("full", "", '<path d="M-6-16c-6 2-8 10-4 16h20c4-6 2-14-4-16z" fill="#eef4f8" fill-opacity=".85"/><path d="M-1-16c0-2 2-2 2 0" fill="none" stroke-width=".6"/>', true));
  // A glass held upside down (origin: the middle of its rim), 14 wide, 16 tall, with a tissue pressed into its
  // bottom (now at the top). Piece: wet (the tissue gone dark; hidden, never used: it stays dry).
  R["sci-glassdown"] = g('<path d="M-7 0h14l-1.2-16h-11.6z" fill="#eaf7fc" fill-opacity=".35"/><path d="M-5.4-15.4h10.8l-.3 4h-10.2z" fill="#fff" stroke-width=".3"/>' +
    '<path d="M-4-12.8c1-.6 2-.6 3 0" fill="none" stroke="#cfd8dc" stroke-width=".3"/>');
  /* ---- science-sprout-20: wind ---- */
  // A dandelion clock (origin: the bottom of its stem), 22 tall: the round white seed head on a stem. Piece: head
  // (the seeds; fade it as they blow away).
  R["sci-dandelion"] = g('<path d="M0 0c0-8 1-14 0-20" fill="none" stroke="#6fae4e" stroke-width=".8"/><circle cy="-21" r="1" fill="#a07a3a"/>' +
    piece("head", "0 -21", '<g stroke="#e8e8e0" stroke-width=".4">' + (function () { var s = ""; for (var i = 0; i < 16; i++) { var a = i / 16 * 6.283; s += '<path d="M0-21l' + (Math.cos(a) * 5).toFixed(1) + " " + (Math.sin(a) * 5).toFixed(1) + '"/>'; } return s; })() + "</g>"));
  // One dandelion seed with its tiny parachute (centre).
  R["sci-dseed"] = '<g stroke="#bdbdb0" stroke-width=".35" fill="none"><path d="M0 2V-1.4"/><path d="M0-1.4l-1.6-1M0-1.4l-.8-1.6M0-1.4v-1.8M0-1.4l.8-1.6M0-1.4l1.6-1"/></g><ellipse cy="2.4" rx=".4" ry=".7" fill="#a07a3a"/>';
  // The air trapped inside an upside-down glass under water (origin: the middle of the glass's rim, like
  // sci-glassdown): a pale pocket where the water could not go.
  R["sci-airpocket"] = '<path d="M-6.2-1.6h12.4l-1-13.6H-5.2z" fill="#fbfdff" opacity=".8"/><path d="M-6.2-1.6h12.4" fill="none" stroke="#3f7fd0" stroke-width=".4"/>';
  /* ---- science-sprout-21: rocks ---- */
  // A rock of any colour (origin: its bottom middle), 12 wide; look: { fill, spots } (spots: a second colour for
  // flecks). Piece: scratch (a pale line scratched across it; hidden, draw it).
  R["sci-rockc"] = function (look) {
    look = look || {};
    var f = look.fill || "#a8a29a", sp = look.spots;
    return g('<path d="M-6 0c-1-3.4.6-6.4 4-7 3.6-.6 7 .8 8 3.6.6 1.6.2 2.8-.6 3.4z" fill="' + f + '"/>' +
      (sp ? '<g fill="' + sp + '" stroke="none">' + circles([[-3, -4, .5], [1, -5, .6], [3, -2, .5], [-1, -2, .4]], .5, sp) + "</g>" : "") +
      '<path d="M-3-5.6c1.4-.6 3-.6 4.2 0" fill="none" stroke="#fff" stroke-width=".5" opacity=".5"/>' +
      piece("scratch", "", '<path d="M-4-3.4L4-2.4" fill="none" stroke="#fff" stroke-width=".7"/>', true));
  };
  // A piece of turquoise from Neyshabur, فیروزه (centre), sky blue with dark veins.
  R["sci-turquoise"] = g('<path d="M-5-1c0-3 2-5 5-5s5 2 5 4-2 5-5 5-5-1-5-4z" fill="#40c4c4"/><path d="M-3-3c1 1 2 1 3 3M1-4c1 1 1 3 3 3" fill="none" stroke="#3d4a40" stroke-width=".35"/>' +
    '<ellipse cx="-1.6" cy="-3" rx="1.2" ry=".6" fill="#fff" opacity=".5" stroke="none"/>');
  // A ring with a turquoise stone (centre).
  R["sci-ring-turq"] = g('<circle cy="2" r="4" fill="none" stroke="#e7c27a" stroke-width="1.4"/><ellipse cy="-2.4" rx="2.6" ry="2" fill="#40c4c4"/>');
  // An old stone bridge over a stream (stage units, its feet on y = 80), from x = 40 to 120.
  R["sci-stonebridge"] = g('<path d="M40 80V60h80v20h-12c0-8-6-14-14-14s-14 6-14 14H74c0-6-5-10-10-10s-10 4-10 10z" fill="#b5a68f"/>' +
    '<path d="M40 64h80M48 60v4M60 60v4M72 60v4M84 60v4M96 60v4M108 60v4M44 68h8M108 68h8M44 74h8M110 74h8" fill="none" stroke="#8a7a62" stroke-width=".5"/>' +
    '<path d="M38 82c20-2 60-2 84 0" fill="none" stroke="#5b9bd5" stroke-width="2.4"/>');
  /* ---- science-sprout-22: soil ---- */
  // Things in the soil, close up (stage units, over sci-soil's soil from y = 58): sand grains, bits of leaf and
  // root, small pebbles.
  R["sci-soilbits"] = g('<g fill="#e7c27a" stroke="none">' + (function () { var s = ""; for (var i = 0; i < 40; i++) s += '<circle cx="' + (8 + rnd(i + 1) * 144).toFixed(1) + '" cy="' + (62 + rnd(i + 5) * 26).toFixed(1) + '" r=".5"/>'; return s; })() + "</g>" +
    '<g fill="#c9a06a">' + circles([[30, 70, 1.6], [96, 80, 2], [130, 66, 1.4]], 1.5, "#9c9488") + "</g>" +
    '<path d="M50 66l4 1-1 2zM110 74l5-1-2 3z" fill="#8a6440"/><path d="M70 62c2 4 0 8 3 12M140 60c-1 4 1 6 0 10" fill="none" stroke="#c9a06a" stroke-width=".7"/>');
  // A jar of soil and water (origin: its bottom middle), 16 wide and 26 tall. Pieces: muddy (all mixed, brown;
  // shown), layers (settled: pebbles, sand, clay, clear water and bits floating; hidden).
  R["sci-soiljar"] = g(piece("muddy", "", '<rect x="-7.4" y="-20" width="14.8" height="19.4" fill="#8a6440" stroke="none"/>') +
    piece("layers", "", '<rect x="-7.4" y="-20" width="14.8" height="12" fill="#cfe6ef" stroke="none"/><rect x="-7.4" y="-8" width="14.8" height="3" fill="#b08a68" stroke="none"/>' +
      '<rect x="-7.4" y="-5" width="14.8" height="2.6" fill="#e7c27a" stroke="none"/><rect x="-7.4" y="-2.4" width="14.8" height="1.8" fill="#9c9488" stroke="none"/>' +
      '<path d="M-5-19.4l2 .4M1-19.6l2-.2" fill="none" stroke="#5a7a3a" stroke-width=".6"/>', true) +
    '<path d="M-8 0v-21c0-1.4 1-2 2-2h12c1 0 2 .6 2 2V0z" fill="#eaf7fc" fill-opacity=".25"/><rect x="-7" y="-25.4" width="14" height="3" rx=".6" fill="#e7c27a"/>');
  /* ---- science-sprout-32: the moon's shapes ---- */
  // The moon in one phase (centre), r = 6; look: { phase } from 0 (new moon) through .25 (first quarter, lit on the
  // right, as seen from Iran) and .5 (full) to .75 (last quarter, lit on the left).
  R["sci-moonphase"] = function (look) {
    var f = ((look && look.phase) || 0) % 1, r = 6, t = 2 * Math.PI * f, rx = Math.abs(r * Math.cos(t)).toFixed(2);
    var lit;
    if (f < 0.5) lit = "M0 " + (-r) + "A" + r + " " + r + " 0 0 1 0 " + r + "A" + rx + " " + r + " 0 0 " + (Math.cos(t) > 0 ? 0 : 1) + " 0 " + (-r) + "z";
    else lit = "M0 " + (-r) + "A" + r + " " + r + " 0 0 0 0 " + r + "A" + rx + " " + r + " 0 0 " + (Math.cos(t) > 0 ? 1 : 0) + " 0 " + (-r) + "z";
    return '<circle r="' + r + '" fill="#2c3766" stroke="#4a5590" stroke-width=".4"/>' + (f > 0.02 && f < 0.98 ? '<path d="' + lit + '" fill="#fff3b0"/>' : "");
  };
  // A strip of paper for a moon diary (stage units): eight boxes from x = 14 to 146, y = 70 to 86.
  R["sci-moondiary"] = g('<rect x="12" y="68" width="136" height="20" rx="1.4" fill="#fffdf6"/><path d="M29 68v20M46 68v20M63 68v20M80 68v20M97 68v20M114 68v20M131 68v20" fill="none" stroke="#cfe3f0" stroke-width=".5"/>');
  /* ---- science-sprout-37: light and dark ---- */
  // A torch (origin: its back end), pointing right, 12 long. Piece: beam (a pale cone of light, 60 long; hidden).
  R["sci-torch"] = g(piece("beam", "12 0", '<path d="M12-2.6L72-16v32L12 2.6z" fill="#fff3b0" opacity=".55" stroke="none"/>', true) +
    '<rect x="0" y="-2" width="9" height="4" rx="1" fill="#5b5b5b"/><path d="M9-2.6h3v5.2H9z" fill="#cfd8dc"/><rect x="3" y="-3" width="2" height="1.2" fill="#e5483f"/>');
  // A teddy's shadow on the wall (origin: its bottom middle), dark and see-through.
  R["sci-teddyshadow"] = '<g fill="#3d2c22" opacity=".45"><circle cx="-5" cy="-21" r="2.4"/><circle cx="5" cy="-21" r="2.4"/><circle cy="-17" r="5.4"/><ellipse cy="-6" rx="6.4" ry="7"/></g>';
  // Three screens in stands (origin: the bottom middle), 12 wide and 18 tall: clear glass, white paper and wood.
  R["sci-screen-glass"] = g('<rect x="-6" y="-20" width="12" height="18" fill="#dff4fd" fill-opacity=".35"/><path d="M-3-17l2-2M-3-13l5-5" fill="none" stroke="#fff" stroke-width=".7"/><rect x="-4" y="-2" width="8" height="2" fill="#8a5a3b"/>');
  R["sci-screen-paper"] = g('<rect x="-6" y="-20" width="12" height="18" fill="#fffdf6" fill-opacity=".75"/><rect x="-4" y="-2" width="8" height="2" fill="#8a5a3b"/>');
  R["sci-screen-wood"] = g('<rect x="-6" y="-20" width="12" height="18" fill="#a0683f"/><path d="M-4-16c2 1 4-1 8 0M-4-10c2 1 4-1 8 0" fill="none" stroke="#7a5233" stroke-width=".5"/><rect x="-4" y="-2" width="8" height="2" fill="#8a5a3b"/>');
  // A spot of light on the wall (centre).
  R["sci-lightspot"] = '<ellipse rx="5" ry="7" fill="#fff3b0" opacity=".9"/>';
  /* ---- science-sprout-38: vibration makes sound ---- */
  // A ruler sticking out over the edge of a table (origin: the table's edge, at the ruler's top). Piece: end (the
  // part off the table, 22 long; it shakes round the edge).
  R["sci-ruler"] = g('<rect x="-18" y="0" width="18" height="1.6" fill="#f6c94b"/>' +
    piece("end", "0 0.8", '<rect x="0" y="0" width="22" height="1.6" fill="#f6c94b"/><path d="M3 0v.8M7 0v.8M11 0v.8M15 0v.8M19 0v.8" fill="none" stroke-width=".3"/>'));
  // A shoebox with a rubber band round it (origin: its bottom middle), 30 wide. Piece: band (the band across the
  // top; it shivers with sy).
  R["sci-bandbox"] = g('<rect x="-15" y="-10" width="30" height="10" fill="#c98a4b"/><ellipse cy="-10" rx="8" ry="2.4" fill="#5a3a22"/>') +
    piece("band", "0 -12", '<path d="M-16-12h32" fill="none" stroke="#e5483f" stroke-width=".9"/>');
  /* ---- science-sprout-39: messages with light and sound ---- */
  // A paper cup on its side, the open end to the left (centre), for a cup-and-string telephone.
  R["sci-papercup"] = g('<path d="M-3-3.4h6l-1.4 6.8H-1.6z" fill="#fff" transform="rotate(-90)"/><path d="M-3.4-3v6" fill="none" stroke="#e5483f" stroke-width=".6"/>');
  // The string of a cup telephone (stage units): a straight tight line from (40, 58) to (120, 58), to draw.
  R["sci-string"] = '<path d="M40 58H120" fill="none" stroke="#8a7a62" stroke-width=".5"/>';
  /* ---- science-sprout-8: look at me! (inside the body) ---- */
  // An x-ray picture of sci-kid-boy (or -girl), in the same units, to put at the child's place and size: the
  // bones in white over a dark see-through body. Pieces: lungs (two pink lungs that fill with sy), heart (a red heart
  // that beats with s), joints (rings on the knees and elbows; hidden).
  R["sci-xray"] = g('<g fill="#1f2a52" opacity=".55" stroke="none"><circle cy="-37" r="7"/><path d="M-7-29.6h14l1 15h-16z"/><rect x="-5" y="-15" width="10" height="14"/>' +
      '<rect x="-11" y="-28.4" width="4" height="14" rx="2" transform="rotate(8 -9 -28)"/><rect x="7" y="-28.4" width="4" height="14" rx="2" transform="rotate(-8 9 -28)"/></g>' +
    piece("lungs", "0 -20", '<path d="M-1.4-27c-3 0-5 3-5 7s1 5 3.4 5 1.6-3 1.6-6z" fill="#f28baa" opacity=".85" stroke="none"/><path d="M1.4-27c3 0 5 3 5 7s-1 5-3.4 5-1.6-3-1.6-6z" fill="#f28baa" opacity=".85" stroke="none"/>') +
    piece("heart", "1.6 -21.4", '<path d="M1.6-19c-2.6-1.6-3.4-3.2-3-4.4.4-1 1.8-1.2 3 0 1.2-1.2 2.6-1 3 0 .4 1.2-.4 2.8-3 4.4z" fill="#e5483f" stroke="none"/>') +
    '<g fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round"><circle cy="-37.4" r="5.4"/><path d="M0-31v16"/>' +
      '<path d="M-5.6-27c2 1 9.2 1 11.2 0M-5.8-24.4c2 1 9.6 1 11.6 0M-5.6-21.8c2 1 9.2 1 11.2 0M-5-19.2c2 .8 8 .8 10 0"/>' +
      '<path d="M-6-16c2-1.4 10-1.4 12 0"/><path d="M-3-14.6v6.4M-3-7.4v5.6M3-14.6v6.4M3-7.4v5.6"/>' +
      '<path d="M-8.6-27.6l-.6 6.6M-9.4-20.6l-.8 6M8.6-27.6l.6 6.6M9.4-20.6l.8 6"/></g>' +
    piece("joints", "", '<g fill="none" stroke="#f59e0b" stroke-width=".8"><circle cx="-3" cy="-7.8" r="1.6"/><circle cx="3" cy="-7.8" r="1.6"/><circle cx="-9.3" cy="-20.8" r="1.6"/><circle cx="9.3" cy="-20.8" r="1.6"/></g>', true));
  // An arm from the side with its bones showing (origin: the shoulder), the upper arm hanging down 14. Piece: fore
  // (the forearm and hand, 13 long, bending at the elbow at (0, 14)).
  R["sci-armbones"] = g('<rect x="-2.6" y="0" width="5.2" height="15" rx="2.6" fill="' + "var(--skin,#f3c39b)" + '"/><path d="M0 1.4v12" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>') +
    piece("fore", "0 14", g('<rect x="-2.3" y="13" width="4.6" height="13" rx="2.3" fill="' + "var(--skin,#f3c39b)" + '"/><circle cy="27.6" r="2.8" fill="' + "var(--skin,#f3c39b)" + '"/><path d="M-.8 15v10M.8 15v10" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>')) +
    '<circle cy="14" r="1.6" fill="none" stroke="#f59e0b" stroke-width=".7"/>';
  /* ---- science-sprout-42: like their parents ---- */
  // A cat from the side like cat-side in js/art/rig.js, in any fur colour (look: { fill }); same piece head.
  R["sci-catc"] = function (look) {
    var c = (look && look.fill) || "#f0a35e";
    return String(B.RIG["cat-side"] || "").replace(/#f0a35e/g, c);
  };
  /* ---- science-sprout-44: learn from nature ---- */
  // A bicycle helmet seen from the side (centre: the middle of the head it sits on), shaped like a shell.
  R["sci-helmet"] = g('<path d="M-5 1c-.4-4 2-7 5.4-7S11 -3 10.6 1z" fill="#f59e0b"/><path d="M-2.6-3.6c1-1.4 3-2 5-1.4M0-1.4c1.6-1.2 4-1.2 5.4 0" fill="none" stroke="#fff" stroke-width=".5"/>' +
    '<path d="M-4.4 1h14.4" fill="none" stroke-width=".7"/>');
  // A burr, a seed covered in tiny hooks (centre).
  R["sci-burr"] = g('<circle r="2.2" fill="#a07a3a"/><path d="M0-2.2v-1.4M1.6-1.6l1-1M2.2 0h1.4M1.6 1.6l1 1M0 2.2v1.4M-1.6 1.6l-1 1M-2.2 0h-1.4M-1.6-1.6l-1-1" fill="none" stroke="#7a5233" stroke-width=".5"/>');
  // A child's shoe with a hook-and-loop strap (origin: its sole's middle), 18 long. Piece: strap (it closes by
  // turning down round its root at (-3, -6)).
  R["sci-shoe"] = g('<path d="M-9 0c-1-3 0-6 2-7h7c3 0 6 2 9 4 1 1 1 3 0 3z" fill="#5b9bd5"/><path d="M-9 0h18" fill="none" stroke="#3d2c22" stroke-width="1"/>') +
    piece("strap", "-3 -6", '<rect x="-3" y="-7" width="10" height="2.2" rx=".6" fill="#f6c94b" stroke="#3d2c22" stroke-width=".4"/>');
  // A cactus (origin: its bottom middle), 30 tall. Piece: water (the water stored inside, seen through it; it rises
  // with sy from the bottom).
  R["sci-cactus"] = g('<path d="M-5 0v-26c0-3 10-3 10 0V0z" fill="#5a9a45"/><path d="M-5-14h-4c-2 0-2-2-2-3v-6c0-2 3-2 3 0v5h3M5-10h4c2 0 2-2 2-3v-6c0-2-3-2-3 0v5H5" fill="#5a9a45"/>') +
    piece("water", "0 0", '<rect x="-3" y="-22" width="6" height="21" rx="2" fill="#7fc0ea" opacity=".7"/>') +
    g('<path d="M-3-24l-1.4-1M3-20l1.4-1M-3-12l-1.4-1M3-6l1.4-1M0-27v-1.6" fill="none" stroke="#3d2c22" stroke-width=".4"/>');
  /* ---- science-sprout-31: from the past to the future ---- */
  // An old oil lamp, a cheragh (origin: its bottom middle). Piece: flame (it flickers).
  R["sci-oillamp"] = g('<path d="M-8-2c0-3 4-5 8-5s8 2 8 5z" fill="#c9a06a"/><path d="M-10 0h20v-2h-20z" fill="#a0683f"/><path d="M8-5l5-3" fill="none" stroke="#a0683f" stroke-width="1.6"/>') +
    piece("flame", "13 -8", '<path d="M13-8c-2-2-1-5 0-7 1 2 2 5 0 7z" fill="#f59e0b" stroke="#e5702f" stroke-width=".3"/>');
  // A washing machine from the front (origin: its bottom middle), 24 wide and 28 tall. Piece: drum (the clothes in
  // the round window; it spins round its middle at (0, -13)).
  R["sci-washer"] = g('<rect x="-12" y="-28" width="24" height="28" rx="1.6" fill="#f4f8fb"/><rect x="-12" y="-28" width="24" height="5" fill="#dfe7ec"/><circle cx="7" cy="-25.5" r="1.2" fill="#5b9bd5"/>' +
    '<circle cy="-13" r="8.6" fill="#cfd8dc"/><circle cy="-13" r="7" fill="#bfe3f5"/>') +
    piece("drum", "0 -13", '<g transform="translate(0 -13)"><path d="M-4-2c2-3 6-2 6 1s-4 4-6 1z" fill="#e5483f"/><path d="M0 2c2-1 4 0 4 2s-3 2-4 0z" fill="#f6c94b"/><path d="M-4 3c-1-2 1-3 2-2z" fill="#5b9bd5"/></g>');
  // Clothes in a basin, washed by hand (origin: the basin's bottom middle), 30 wide. Piece: cloth (a shirt rubbed
  // back and forth).
  R["sci-washtub"] = g('<path d="M-15-10h30l-3 10h-24z" fill="#b8c0c8"/><ellipse cy="-10" rx="15" ry="2.6" fill="#9fd3f0"/>') +
    piece("cloth", "0 -11", '<path d="M-6-12c2-2 10-2 12 0l-1 2c-3-1-7-1-10 0z" fill="#e46b8a"/>') + '<path d="M-15-10h30" fill="none" stroke="#3d2c22" stroke-width=".5"/>';
  // An old horse cart (origin: its bottom middle), the cart behind, the shafts going right to (20, -12).
  R["sci-horsecart"] = g('<rect x="-14" y="-16" width="22" height="8" fill="#a0683f"/><path d="M8-12h12" fill="none" stroke="#8a5a3b" stroke-width="1.2"/>') +
    piece("wheel", "-3 -6", '<circle cx="-3" cy="-6" r="6" fill="none" stroke="#5a3a22" stroke-width="1.4"/><path d="M-9-6h12M-3-12v12M-7.2-10.2l8.4 8.4M1.2-10.2l-8.4 8.4" fill="none" stroke="#5a3a22" stroke-width=".6"/>');
  B.RIG = Object.assign(B.RIG, R);
})();

/* ---------- more of the sapling garden (science-sapling-9 to sapling-57) ---------- */
(function () {
  var S = B.SCI, g = S.g, piece = S.piece, glow = S.glow, circles = S.circles, rnd = S.rnd, twoTone = S.twoTone;
  var R = {};

  /* ---- science-sapling-9: a fair test ---- */
  // A strip of towel or paper hanging down (origin: its top middle), 6 wide and 18 long; look: { fill }.
  R["sci-strip"] = function (look) {
    var f = (look && look.fill) || "#f4f0e6";
    return g('<rect x="-3" y="0" width="6" height="18" rx=".6" fill="' + f + '"/><path d="M-3 4h6M-3 9h6M-3 14h6" fill="none" stroke="#3d2c22" stroke-width=".2" opacity=".4"/>');
  };
  /* ---- science-sapling-43: changes that come back, or not ---- */
  // A big cross (centre), to show that something cannot go back.
  R["sci-cross"] = '<g stroke-linecap="round"><path d="M-6-6L6 6M6-6L-6 6" stroke="#fff" stroke-width="4.4"/><path d="M-6-6L6 6M6-6L-6 6" stroke="#e5483f" stroke-width="2.4"/></g>';
  /* ---- science-sapling-44: pieces taken apart and built again ---- */
  // A mud brick, خشت (origin: the middle of its bottom), 10 wide and 4 tall, with bits of straw.
  R["sci-khesht"] = g('<rect x="-5" y="-4" width="10" height="4" fill="#c9a06a"/><path d="M-3-2.6l1.6.6M1-3l1.4.4M2.4-1.4l1.2-.4" fill="none" stroke="#e7c27a" stroke-width=".4"/>');
  /* ---- science-sapling-29: inside a seed ---- */
  // A big bean, opened (centre), 24 wide. Pieces: l and r (its two halves, the food store, which move apart),
  // embryo (the tiny plant inside, on the left half; it stays with l), coat (the seed coat over everything).
  R["sci-beanbig"] = g(piece("l", "", '<path d="M0-8C-7-8-12-5-12 0s5 8 12 8z" fill="#f2e3c4"/>' + piece("embryo", "", '<path d="M-1-3c-3 0-5 1-5 3s2 3 5 3c-1-1-2-2-1-3z" fill="#bcd98a"/><path d="M-6-1c-2-1-3-2-3-3" fill="none" stroke="#7cbf5a" stroke-width=".7"/>')) +
    piece("r", "", '<path d="M0-8C7-8 12-5 12 0s-5 8-12 8z" fill="#ead9b6"/>') +
    piece("coat", "", '<ellipse rx="12.6" ry="8.6" fill="#a0583a"/><path d="M-4-6c2-1 4-1 6 0" fill="none" stroke="#c97a50" stroke-width=".8"/><ellipse cx="0" cy="-7" rx="2" ry=".8" fill="#f4f0e6"/>'));
  // A jar with wet cotton and a bean pressed against the glass (origin: its bottom middle), 16 wide and 22 tall.
  // look: { dry } (the cotton is dry and pale). Pieces: root (grows down, sy), shoot (grows up, sy).
  R["sci-seedjar"] = function (look) {
    var dry = look && look.dry;
    return g('<rect x="-7.4" y="-12" width="14.8" height="11.4" fill="' + (dry ? "#f8f8f4" : "#e6eef2") + '" stroke="none"/>' +
      piece("root", "0 -7", '<path d="M0-7c0 2-1 3 0 5s0 3-1 4" fill="none" stroke="#f1e1c8" stroke-width=".9"/>') +
      piece("shoot", "0 -8", '<path d="M0-8v-9" fill="none" stroke="#6fae4e" stroke-width=".9"/><path d="M0-17c-2-2-4-2-5-1 1 1 3 2 5 1zM0-17c2-2 4-2 5-1-1 1-3 2-5 1z" fill="#7cbf5a"/>') +
      '<ellipse cy="-8" rx="2.2" ry="1.4" fill="#a0583a"/>' +
      '<path d="M-8 0v-21c0-1.4 1-2 2-2h12c1 0 2 .6 2 2V0z" fill="#eaf7fc" fill-opacity=".2"/>');
  };
  // A fridge (origin: its bottom middle), 22 wide and 40 tall, its door open to the right, a cold inside.
  R["sci-fridge"] = g('<rect x="-11" y="-40" width="22" height="40" rx="2" fill="#f4f8fb"/><rect x="-9" y="-37" width="18" height="34" fill="#d9ecf5"/><path d="M-9-20h18" fill="none" stroke-width=".5"/>');
  /* ---- science-sapling-36: bees and flowers ---- */
  // A flower from the side (origin: its stem's bottom), 30 tall, with pollen in the middle. Piece: pollen (yellow
  // dots that can be carried), head.
  R["sci-flower"] = g('<path d="M0 0v-24" fill="none" stroke="#5a9a45" stroke-width="1.2"/><path d="M0-10c-4-3-7-2-8 0 2 2 5 2 8 0z" fill="#6fae4e"/>' +
    piece("head", "0 -26", '<g fill="#e46b8a">' + circles([[-4, -27, 3], [4, -27, 3], [0, -31, 3], [0, -23, 3]], 3, "#e46b8a") + '</g><circle cy="-27" r="2.4" fill="#fcd34d"/>') +
    piece("pollen", "", '<g fill="#f59e0b" stroke="none">' + circles([[-1, -28, .5], [1, -27, .5], [0, -26, .5]], .5, "#f59e0b") + "</g>"));
  // A bee flying (centre), facing right. Piece: wings (they beat), dust (pollen on its legs; hidden).
  R["sci-bee"] = g('<ellipse rx="4" ry="2.8" fill="#f6c94b"/><path d="M-1.4-2.6v5.2M1.2-2.6v5.2" fill="none" stroke="#3d2c22" stroke-width="1.1"/><circle cx="4.4" cy="-.4" r="1.8" fill="#3d2c22"/>' +
    piece("wings", "0 -2", '<ellipse cx="-1" cy="-4.6" rx="2.4" ry="3" fill="#fff" fill-opacity=".8" stroke-width=".4"/>') +
    piece("dust", "", '<g fill="#f59e0b" stroke="none"><circle cx="-1" cy="3" r=".7"/><circle cx="1.4" cy="3.2" r=".7"/></g>', true));
  // A maple-like winged seed (centre) and a dandelion-like burr: seeds that travel. sci-wingseed spins as it falls.
  R["sci-wingseed"] = g('<path d="M0 0c4-6 12-6 14-2-4 0-9 1-14 2z" fill="#c9a06a"/><circle r="1.6" fill="#8a5a3b"/>');
  /* ---- science-sapling-13: water, a precious material ---- */
  // A tall glass of water with a layer of oil on top (origin: its bottom middle), 12 wide and 20 tall. Pieces:
  // oil (the yellow layer floating on the water; hidden), sand (sand at the bottom; hidden).
  R["sci-glassmix"] = g('<path d="M-5.6-16h11.2L5 0h-10z" fill="#9fd3f0" stroke="none"/>' +
    piece("oil", "", '<path d="M-5.6-18h11.2l-.1 2.4H-5.5z" fill="#f6c94b" stroke="none" opacity=".9"/>', true) +
    piece("sand", "", '<path d="M-5.1-2.4h10.2L5 0h-10z" fill="#e7c27a" stroke="none"/>', true) +
    '<path d="M-6-20h12l-1 20h-10z" fill="#eaf7fc" fill-opacity=".2"/><path d="M-3.8-17.6l.6 15" fill="none" stroke="#fff" stroke-width=".9"/>');
  // A spoonful of something (centre): a spoon with a heap on it; look: { fill } (white for salt or sugar,
  // yellow for sand).
  R["sci-spoonful"] = function (look) {
    var f = (look && look.fill) || "#ffffff";
    return g('<path d="M2 0h14" fill="none" stroke="#b8c0c8" stroke-width="1.4"/><ellipse rx="4" ry="2.2" fill="#cfd8dc"/><path d="M-3-1c1-2 5-2 6 0z" fill="' + f + '"/>');
  };
  /* ---- science-sapling-15: where our water comes from ---- */
  // A well in a village yard (origin: its bottom middle), 24 wide: a round stone wall and a frame with a rope.
  // Piece: bucket (on the rope; it goes down with y and comes up full).
  R["sci-well"] = g('<path d="M-12 0v-10h24V0z" fill="#b5a68f"/><path d="M-12-6h24M-6-10v4M2-10v4M-2-6v6M6-6v6" fill="none" stroke="#8a7a62" stroke-width=".5"/>' +
    '<path d="M-10-10v-22M10-10v-22M-11-32h22" fill="none" stroke="#8a5a3b" stroke-width="1.4"/><circle cy="-32" r="1.6" fill="#5a3a22"/>') +
    piece("bucket", "0 -20", '<path d="M0-32v10" fill="none" stroke="#8a7a62" stroke-width=".5"/><path d="M-3-22h6l-1 4h-4z" fill="#a0683f" stroke="#3d2c22" stroke-width=".5"/>');
  /* ---- science-sapling-16: clean air, clean water ---- */
  // A puff of grey smoke (centre).
  R["sci-smoke"] = '<g fill="#8f959c" opacity=".7" stroke="none"><circle r="4"/><circle cx="4.4" cy="-1.6" r="3.4"/><circle cx="-4" cy="-1" r="3"/><circle cx="1" cy="-4" r="3.2"/><circle cx="-1.5" cy="2" r="3"/></g>';
  // A factory with a chimney (origin: its bottom middle), 30 wide; the chimney's top is at (8, -36).
  R["sci-factory"] = g('<path d="M-15 0v-14l8-5v5l8-5v5l8-5V0z" fill="#b8a99a"/><rect x="5" y="-36" width="6" height="22" fill="#8a7a62"/><rect x="-11" y="-8" width="4" height="4" fill="#fcd34d"/><rect x="-1" y="-8" width="4" height="4" fill="#fcd34d"/>');
  // A water filter made from a cut bottle upside down (origin: the middle of the glass's bottom, under it), 14
  // wide: gravel, sand and cotton in the bottle, a glass below. Pieces: muddy (brown water on top; hidden), clean
  // (clearer water in the glass, fills with sy; hidden).
  R["sci-filter"] = g('<path d="M-6 0v-12h12V0z" fill="#eaf7fc" fill-opacity=".4"/>') +
    piece("clean", "0 0", '<rect x="-5.4" y="-6" width="10.8" height="6" fill="#bfe3f5" stroke="none"/>', true) +
    g('<path d="M-7-14h14l-5 4h-4z" fill="#eaf7fc" fill-opacity=".5"/><rect x="-7" y="-34" width="14" height="20" fill="#eaf7fc" fill-opacity=".35"/>' +
      '<rect x="-7" y="-18" width="14" height="4" fill="#f4f0e6" stroke="none"/><rect x="-7" y="-23" width="14" height="5" fill="#e7c27a" stroke="none"/><rect x="-7" y="-27" width="14" height="4" fill="#9c9488" stroke="none"/>') +
    piece("muddy", "", '<rect x="-7" y="-34" width="14" height="7" fill="#8a6440" stroke="none" opacity=".85"/>', true);
  // A plastic bottle lying in a river (centre), as rubbish.
  R["sci-litter"] = g('<rect x="-5" y="-1.6" width="9" height="3.2" rx="1.2" fill="#9fd3f0" fill-opacity=".8"/><rect x="4" y="-1" width="2" height="2" fill="#5b9bd5"/>');
  /* ---- science-sapling-18: poles and the compass ---- */
  // A bar magnet (centre), 24 long: the blue half is its south pole, the red half (on the right) its north pole.
  R["sci-barmag"] = g('<rect x="-12" y="-3.5" width="12" height="7" rx=".6" fill="#5b9bd5"/><rect x="0" y="-3.5" width="12" height="7" rx=".6" fill="#e5483f"/>' +
    '<path d="M-10-2h8M2-2h8" fill="none" stroke="#fff" stroke-width=".6" opacity=".5"/>');
  // A bowl of water seen from above (centre), radius 24. Piece: float (a leaf with a paper clip on it, along the
  // x axis with the clip's red-marked end on the right; turn it with r).
  R["sci-bowltop"] = g('<circle r="24" fill="#eaf7fc"/><circle r="21" fill="#9fd3f0"/><path d="M-12-12c4-3 8-4 12-4" fill="none" stroke="#fff" stroke-width=".8" opacity=".7"/>' +
    piece("float", "0 0", '<path d="M-12 0c4-6 18-6 24 0-6 6-20 6-24 0z" fill="#7cbf5a"/><path d="M-12 0h24" fill="none" stroke="#5a9a45" stroke-width=".4"/>' +
      '<path d="M-8-1h15a1.4 1.4 0 0 0 0-2.8H-8.6a1 1 0 0 0 0 2h13" fill="none" stroke="#3d2c22" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M-8-1h15a1.4 1.4 0 0 0 0-2.8H-8.6a1 1 0 0 0 0 2h13" fill="none" stroke="#b8c4cc" stroke-width=".6" stroke-linecap="round"/><circle cx="8" cy="-2.4" r="1.1" fill="#e5483f"/>'));
  // North, as a red arrow pointing up (origin: its bottom), 10 tall.
  R["sci-north"] = g('<path d="M0-10l4 6H1.4V0h-2.8v-4H-4z" fill="#e5483f"/>');
  // A compass seen from above (centre), radius 14: the north mark at its top. Piece: needle (red end, north, up
  // when r is 0).
  R["sci-compass"] = g('<circle r="14" fill="#c9a24f"/><circle r="12" fill="#fffaf0"/>' +
    '<path d="M0-12v3M0 12v-3M-12 0h3M12 0h-3" fill="none" stroke="#3d2c22" stroke-width=".8"/><path d="M0-15.6l1.6 2.6h-3.2z" fill="#e5483f"/>' +
    piece("needle", "0 0", '<path d="M0-10l2.2 10h-4.4z" fill="#e5483f"/><path d="M0 10l2.2-10h-4.4z" fill="#5b9bd5"/>') + '<circle r="1.2" fill="#3d2c22"/>');
  // A sewing pin (centre), 8 long, lying flat.
  R["sci-pin"] = '<path d="M-4 0h7.4" fill="none" stroke="#3d2c22" stroke-width=".9" stroke-linecap="round"/><path d="M-4 0h7.4" fill="none" stroke="#cfd8dc" stroke-width=".4" stroke-linecap="round"/><circle cx="-4" r="1.2" fill="#f28baa" stroke="#3d2c22" stroke-width=".4"/>';
  /* ---- science-sapling-19: how we see ---- */
  // A firefly (centre), 4 long. Piece: glow (its light; hidden).
  R["sci-firefly"] = g(piece("glow", "0 0", '<circle cx="1.6" r="4" fill="#fff3b0" opacity=".55" stroke="none"/><circle cx="1.6" r="1.6" fill="#fde68a" stroke="none"/>', true) +
    '<ellipse cx="-.6" rx="2.2" ry="1.2" fill="#5b4636"/><path d="M-1-1c-1-2 .6-2.6 1.4-1.4M-1-1c0-2 2-2.4 2.2-.8" fill="#eaf7fc" fill-opacity=".6" stroke-width=".3"/>');
  // A lamp's light (centre), a soft yellow circle of radius 18.
  R["sci-lampglow"] = '<circle r="18" fill="#fde68a" opacity=".35"/><circle r="8" fill="#fef3c7" opacity=".5"/>';
  /* ---- science-sapling-21: the sundial (seen from above, north up) ---- */
  // A sandy yard seen from above (stage units), with a few pebbles.
  R["sci-yardtop"] = g('<rect width="160" height="90" fill="#e8d3a6" stroke="none"/>' + '<g fill="#cdb489" stroke="none">' +
    circles([[14, 12, 1.2], [36, 80, 1], [70, 20, 0.8], [120, 14, 1.2], [146, 50, 1], [100, 82, 1.4], [24, 52, 0.8], [60, 76, 0.9], [134, 78, 1]], 1, "#cdb489") + "</g>");
  // The top of a stick standing in the ground, seen from above (centre).
  R["sci-sticktop"] = g('<circle r="2.6" fill="#8a5a3b"/><circle cx="-.6" cy="-.6" r="1" fill="#b57638" stroke="none"/>');
  // A stick's shadow seen from above (origin: the stick), 40 long along +x: turn it with r, stretch it with sx.
  R["sci-shadowline"] = '<path d="M0-1.6h38.6a1.6 1.6 0 0 1 0 3.2H0z" fill="#3d2c22" opacity=".4"/>';
  /* ---- science-sapling-23: mountains, valleys, rivers and deserts ---- */
  /* A landscape of Iran in one picture (stage units): Damavand with its snowy top on the left (peak at 30, 12),
     the Zagros ridges with a deep valley at (78, 58), a green plain with fields from y = 68, Lake Urmia at
     (108, 75) and the Lut desert's sand and kaluts on the right from x = 122. */
  R["sci-landscape"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
    '<path d="M0 72L30 12l30 60z" fill="#9c8670"/><path d="M30 12l-7.8 15 3.6-1.6 3.4 2.6 3.6-2.4 3.4 1.4z" fill="#fff"/>' +
    '<path d="M46 74l18-40 14 24 14-28 22 44z" fill="#b59670"/><path d="M71 46l7 12 6-12" fill="none" stroke="#8a6f50" stroke-width=".6"/>' +
    '<path d="M64 34l-4 9 2.4-1 2 1.6 2-1.4 1.6.8zM92 30l-4 8 2.4-1 1.6 1.4 2-1.2 1.8.6z" fill="#fff"/>' +
    '<path d="M0 72c40-5 120-5 160 0v18H0z" fill="#a9d68b"/><path d="M86 78h28M84 82h32M82 86h36" fill="none" stroke="#8cc66b" stroke-width="1.6"/>' +
    '<ellipse cx="108" cy="75" rx="12" ry="3.6" fill="#f4f8fb"/><ellipse cx="108" cy="75" rx="10.4" ry="2.8" fill="#8fc9c2"/>' +
    '<path d="M122 90c0-10 4-18 12-20s18-2 26-1v21z" fill="#f2cf86"/><path d="M134 76c2-3 6-4 9-2M146 82c2-3 6-3 8-1" fill="none" stroke="#d9a94f" stroke-width=".6"/>' +
    '<path d="M138 74v-5l1.6-2 1.6 2v5zM150 75v-6l1.4-2 1.8 2.4V75zM144 73v-3l1.2-1.4 1 1.4v3z" fill="#c4935a"/>');
  // The Karun leaving the Zagros valley and crossing the plain (stage units), to draw with draw.
  R["sci-karun"] = twoTone("M78 58c-2 5 3 8 0 13s-8 7-6 12-3 6-2 9", "#5b9bd5", 1.8);
  // A sparkle of snow (centre), to twinkle on Damavand's top.
  R["sci-glint"] = '<path d="M0-3l.7 2.3 2.3.7-2.3.7L0 3l-.7-2.3L-3 0l2.3-.7z" fill="#fff" stroke="#9fd3f0" stroke-width=".3"/>';
  /* ---- science-sapling-24: water and wind change the land ---- */
  // A flat plateau cut through to show its layers (stage units, top at y = 40). Piece: cut (the valley a river
  // carves, with the river at its bottom; it deepens with sy from its top, at 80 40).
  R["sci-canyon"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="40" width="160" height="50" fill="#c4935a"/>' +
    '<path d="M0 52h160M0 64h160M0 76h160" fill="none" stroke="#a87a48" stroke-width="1.4"/><rect y="38" width="160" height="3" fill="#8cc66b"/>' +
    piece("cut", "80 40", '<path d="M54 39l20 44h12l20-44z" fill="#cdeaf7"/><path d="M73.6 82.4h12.8" fill="none" stroke="#5b9bd5" stroke-width="2.4"/>'));
  /* Kaluts in the Lut desert (stage units): sand from y = 70 and three tall ridges of earth. Pieces: k1, k2, k3
     (the ridges, worn thinner with sx about their foot). */
  function kalut(n, x, h, w) {
    return piece(n, x + " 70", '<path d="M' + (x - w) + ' 70c0-' + (h * 0.6) + ' ' + (w * 0.4) + '-' + h + ' ' + w + '-' + h + 's' + w + ' ' + (h * 0.3) + ' ' + w + ' ' + h + 'z" fill="#c4935a"/>' +
      '<path d="M' + (x - w * 0.4) + ' 70c0-' + (h * 0.5) + ' ' + (w * 0.2) + '-' + (h * 0.8) + ' ' + (w * 0.4) + '-' + (h * 0.9) + '" fill="none" stroke="#a87a48" stroke-width=".7"/>');
  }
  R["sci-kaluts"] = g('<rect width="160" height="90" fill="#f8e3b8" stroke="none"/>' + kalut("k1", 40, 30, 12) + kalut("k2", 86, 38, 14) + kalut("k3", 128, 26, 11) +
    '<path d="M0 70c30-3 60 2 90 0s50-3 70 0v20H0z" fill="#f2cf86"/><path d="M14 80c6-3 12-3 18 0M100 84c6-3 12-3 18 0" fill="none" stroke="#d9a94f" stroke-width=".6"/>');
  // Blowing sand: a few grains and streaks (origin: their left end), 20 wide.
  R["sci-sandblow"] = '<g fill="#d9a94f" stroke="none">' + circles([[2, -2, .7], [7, 1, .6], [12, -3, .7], [16, 2, .6], [19, -1, .5]], .6, "#d9a94f") +
    '</g><path d="M0 0h8M10-4h8M6 4h10" fill="none" stroke="#d9a94f" stroke-width=".5" opacity=".7"/>';
  /* A river by a village field (stage units): banks from y = 62, the river bed at x 50 to 110. Piece: flood
     (muddy water that rises over the banks; it grows with sy from the bottom, at 80 90). */
  R["sci-floodplain"] = g('<rect width="160" height="90" fill="#b8c4cc" stroke="none"/><path d="M0 62h50l6 14h48l6-14h50v28H0z" fill="#a9d68b"/>' +
    '<path d="M56 76h48l-2 4H58z" fill="#5b9bd5"/><path d="M8 66h30M10 70h28M122 66h30M124 70h28" fill="none" stroke="#8cc66b" stroke-width="1.4"/>' +
    piece("flood", "80 90", '<path d="M0 62h160v28H0z" fill="#9c7a4f" opacity=".85" stroke="none"/><path d="M8 64c6-2 10 2 16 0s10-2 16 0M100 66c6-2 10 2 16 0" fill="none" stroke="#c9a578" stroke-width=".7"/>', true));
  /* Two hills in the rain (stage units), the ground cut away to show the soil: the left one has trees and their
     roots, the right one is bare. Piece: mud (soil washing down the bare hill; draw it with draw). */
  R["sci-twohills"] = g('<rect width="160" height="90" fill="#b8c4cc" stroke="none"/>' +
    '<path d="M0 90V54c14-14 50-14 70 0v36z" fill="#8a6440"/><path d="M0 56c14-12 50-12 70 0" fill="none" stroke="#7cbf5a" stroke-width="2.6"/>' +
    '<path d="M16 50c0 8-4 14-8 20M16 54c4 6 8 10 14 12M40 46c0 10-2 18-6 24M40 52c6 4 10 10 12 18M58 52c-2 8-6 12-10 16" fill="none" stroke="#d9b98c" stroke-width=".9"/>' +
    '<path d="M86 90V58c14-12 48-12 74-2v34z" fill="#a87a48"/><path d="M86 60c14-10 48-10 74 0" fill="none" stroke="#c4935a" stroke-width="1.6"/>') +
    piece("mud", "", twoTone("M120 54c6 6 14 14 18 22s6 10 12 14", "#7a5432", 2.2));
  /* ---- science-sapling-57: when a habitat changes ---- */
  /* Lake Urmia (stage units): hills, the shore, and white salt where the water has gone. Piece: water (the lake,
     centre 80 64; it shrinks with sx and sy). */
  R["sci-urmia"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 48c20-10 44-12 64-6s40 2 58-4 30-2 38 2v50H0z" fill="#b59670"/>' +
    '<path d="M0 52c40-6 120-6 160 0v38H0z" fill="#d9c9a8"/><ellipse cx="80" cy="66" rx="70" ry="20" fill="#f4f1ea"/>' +
    '<path d="M30 66c6-1 10 1 14 0M110 72c6-1 10 1 14 0M70 80c6-1 10 1 14 0" fill="none" stroke="#d6d0c2" stroke-width=".6"/>' +
    piece("water", "80 66", '<ellipse cx="80" cy="66" rx="64" ry="17" fill="#6fb8c9"/><path d="M40 62c8-2 14 0 20-1M96 70c8-2 14 0 20-1" fill="none" stroke="#bfe3f5" stroke-width=".8"/>'));
  // A brine shrimp, an artemia (centre), 4 long, swimming left.
  R["sci-artemia"] = '<g stroke="none"><ellipse rx="1.6" ry=".7" fill="#f28c5a"/><path d="M1.4 0l2.4-.8v1.6z" fill="#f2a07a"/><circle cx="-1.4" cy="-.3" r=".35" fill="#3d2c22"/></g>';
  // A flamingo standing on one leg, facing left (origin: its foot), 28 tall.
  R["sci-flamingo"] = g('<path d="M0 0v-12M0-12l3-3.6-3-1" fill="none" stroke="#e57391" stroke-width=".9"/>' +
    '<path d="M-4-15c-6-4 0-8-4-12" fill="none" stroke="#3d2c22" stroke-width="2.4" stroke-linecap="round"/><path d="M-4-15c-6-4 0-8-4-12" fill="none" stroke="#f28baa" stroke-width="1.5" stroke-linecap="round"/>' +
    '<path d="M-6-16c0-3 4-4 8-3.6s6 1.6 6 2.4-3 3-7 3-7-.4-7-1.8z" fill="#f28baa"/><path d="M2-18c2 0 4 .6 5 1.4" fill="none" stroke="#e57391" stroke-width=".6"/>' +
    '<circle cx="-8" cy="-27.6" r="1.8" fill="#f28baa"/><path d="M-9.4-27.4l-1.8 2.4 1.6-.2.6-1.4z" fill="#3d2c22"/><path d="M-9.4-27.4l-1 1.2" fill="none" stroke="#fff" stroke-width=".5"/>' +
    '<circle cx="-8.2" cy="-28.2" r=".4" fill="#3d2c22" stroke="none"/>');
  // A flamingo flying left (centre), 34 long. Piece: wing (it flaps with sy about the body).
  R["sci-flamingo-fly"] = g('<path d="M5 0h13" fill="none" stroke="#e57391" stroke-width=".9"/><path d="M-5 0h-10" fill="none" stroke="#f28baa" stroke-width="1.4"/>' +
    '<ellipse rx="6" ry="2.4" fill="#f28baa"/><circle cx="-16" r="1.5" fill="#f28baa"/><path d="M-17.4 0l-2.2 1.4 1.4.2.6-1z" fill="#3d2c22"/>' +
    piece("wing", "0 -1", '<path d="M-3-1l3-10 4 1-1 9z" fill="#f28baa"/><path d="M0-11l4 1-.6 2.8-3.8-1z" fill="#3d2c22"/>'));
  /* ---- science-sapling-25: forces everywhere ---- */
  // A ball of play dough (origin: its bottom middle), 16 across; squash it with sy (and widen it with sx).
  R["sci-dough"] = g('<circle cy="-8" r="8" fill="#f6b0c8"/><path d="M-4-12c1.6-1.6 4-2 6-1.4" fill="none" stroke="#fff" stroke-width=".9" opacity=".6"/>');
  // A tug-of-war rope (stage units) at y = 67 from x = 6 to 154, with a red ribbon tied at its middle (80).
  R["sci-rope"] = twoTone("M6 67h148", "#d9b98c", 1.6) + g('<path d="M80 67l-2 5h4z" fill="#e5483f"/><circle cx="80" cy="67" r="1.4" fill="#e5483f"/>');
  // A chalk line on the ground (centre), 12 long, across the way.
  R["sci-chalk"] = '<path d="M-1 -6l2 12" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>';
  /* ---- science-sapling-26: forces without touching ---- */
  // A thread going up from its origin (where it is tied), 26 long; it stretches with sy.
  R["sci-thread"] = '<path d="M0 0v-26" fill="none" stroke="#5b4636" stroke-width=".6"/>';
  // A little torn bit of paper (centre), 3 wide.
  R["sci-bit"] = '<path d="M-1.6-.8l1.4-.6 1.8.4-.2 1.4-1.6.4-1.4-.4z" fill="#fffdf6" stroke="#9aa9b5" stroke-width=".3"/>';
  /* ---- science-sapling-27: the seesaw and the lever ---- */
  // A seesaw's beam (centre: where it turns), 124 long, with a handle near each end.
  R["sci-beam"] = g('<rect x="-62" y="-1.6" width="124" height="3.2" rx="1" fill="#e5483f"/><path d="M-56-1.6v-5M56-1.6v-5" fill="none" stroke="#5b5b5b" stroke-width="1.2"/>');
  // The seesaw's stand (origin: its foot), 18 tall up to where the beam turns.
  R["sci-fulcrum"] = g('<path d="M-8 0l8-18 8 18z" fill="#f6b73c"/><circle cy="-18" r="1.6" fill="#5b5b5b"/>');
  /* A tin with a tight lid (origin: its bottom middle), 24 wide and 18 tall. Piece: lid (it opens upward, hinged
     at its right end, 12 -18). */
  R["sci-tin"] = g('<rect x="-12" y="-18" width="24" height="18" fill="#cfd8dc"/><path d="M-12-12h24M-12-6h24" fill="none" stroke="#9aa9b5" stroke-width=".5"/>' +
    '<rect x="-7" y="-14" width="14" height="6" fill="#f6b73c" stroke="none"/>' +
    piece("lid", "12 -18", '<rect x="-12.6" y="-20.4" width="25.2" height="2.6" rx=".6" fill="#9aa9b5"/>'));
  // A spoon used as a lever (origin: where it rests on the tin's rim): its bowl 6 to the right, its handle 30 to
  // the left. Turn it with r about the rim.
  R["sci-spoon"] = g('<path d="M0-.6h-30v1.2H0z" fill="#b8c4cc"/><ellipse cx="4.4" rx="2.6" ry="1" fill="#b8c4cc"/>');
  /* ---- science-sapling-31: where traits come from ---- */
  // A flower pot with soil and nothing growing yet (origin: its bottom middle), like sci-potplant's pot.
  R["sci-emptypot"] = g('<path d="M-7-10h14l-2 10h-10z" fill="#c4673a"/><rect x="-8" y="-12.4" width="16" height="3" rx="1" fill="#d27a4a"/><ellipse cy="-12.2" rx="6.6" ry=".9" fill="#7a5233"/>');
  // A short bushy plant grown in the sun (origin: the soil), 16 tall, with many big green leaves.
  R["sci-plant-sun"] = g('<path d="M0 0v-14" fill="none" stroke="#4f8a3c" stroke-width="1.4"/><g fill="#5fae4a">' +
    '<path d="M0-4c-4-2-8-1-9 2 3 1 7 1 9-2zM0-4c4-2 8-1 9 2-3 1-7 1-9-2zM0-9c-4-2-8-1-9 2 3 1 7 1 9-2zM0-9c4-2 8-1 9 2-3 1-7 1-9-2z"/>' +
    '<path d="M0-13c-3-3-3-6 0-8 3 2 3 5 0 8z"/></g>');
  // Shade over the right half of the stage (stage units, from x = 84).
  R["sci-halfshade"] = '<rect x="84" width="76" height="90" fill="#3d2c22" opacity=".28"/>';
  // Long sharp thorns to put over sci-thorn (origin: its bottom middle), so that shrub is better guarded.
  R["sci-spikes"] = '<path d="M-5-7l-5-3M-3-9l-3-5M3-10l2-6M5-8l5-4M7-5l6-1M-7-4l-6 0M0-6l0-7" fill="none" stroke="#7a6a2a" stroke-width=".6" stroke-linecap="round"/>';
  /* ---- science-sapling-32: fish and amphibians ---- */
  // Under the sea (stage units): blue water, the sandy bottom from y = 80, a little weed.
  R["sci-sea"] = g('<rect width="160" height="90" fill="#7fbcd8" stroke="none"/><rect width="160" height="30" fill="#9fd3f0" stroke="none" opacity=".5"/>' +
    '<path d="M0 80c30-3 60 2 90 0s50-3 70 0v10H0z" fill="#e7c27a"/><path d="M20 80c-2-6 2-10 0-16M24 80c2-5-1-9 1-13M138 81c-2-6 2-10 0-16" fill="none" stroke="#5a9a45" stroke-width="1.2"/>');
  /* A Persian sturgeon, the Caspian caviar fish, swimming right (centre), 48 long: a pointed snout with barbels, rows of
     bony plates, a tail with a longer top lobe. Pieces: gill (it opens and closes), tail (it beats about -20 0). */
  R["sci-sturgeon"] = g(piece("tail", "-20 0", '<path d="M-19-2.4L-28-10-24.6 0-27 4.4-19 1.8z" fill="#7a8a96"/>') +
    '<path d="M24 0c-5-3-14-6-28-5.4C-10-5-16-4-20-2.4v4.2C-14 3.4-4 5 8 4.4 15 4 20 2 24 0z" fill="#8a9aa6"/>' +
    '<path d="M-4-5.2l2 3 2-3M6-5l2 2.6 2-2.6M-14-3.6l2 2.4 1.6-2.6" fill="#cfd8dc" stroke-width=".4"/><path d="M-16 .6h30" fill="none" stroke="#cfd8dc" stroke-width=".6" stroke-dasharray="1.4 1.4"/>' +
    '<path d="M2-5.4l2-3.6 3 3.4M-8 4.4l2 3 2-3M4 4.6l2 2.6 1.4-2.8" fill="#7a8a96" stroke-width=".4"/><path d="M18 2.6v2.4M20 2v2.4" fill="none" stroke-width=".4"/>' +
    '<circle cx="17" cy="-1.4" r=".9" fill="#3d2c22" stroke="none"/>' + piece("gill", "12 0", '<path d="M12-3c-1.6 2-1.6 4 0 6" fill="none" stroke-width=".6"/>'));
  // A fish's skeleton as an X-ray picture (centre), 48 wide: a backbone down its middle, ribs and the skull.
  R["sci-fishbones"] = g('<rect x="-26" y="-12" width="52" height="24" rx="3" fill="#24324a"/>' +
    '<g fill="none" stroke="#eef4f8" stroke-width=".8" stroke-linecap="round"><path d="M-18 0h30"/>' +
    '<path d="M-12 0c1-3 2-5 4-6M-6 0c1-3 2-5 4-6M0 0c1-3 2-5 4-6M6 0c1-3 2-4 3-5M-12 0c1 3 2 5 4 6M-6 0c1 3 2 5 4 6M0 0c1 3 2 5 4 6M6 0c1 3 2 4 3 5"/>' +
    '<path d="M12-5c5 0 9 3 10 5-1 2-5 5-10 5M-18 0l-5-5M-18 0l-5 5"/></g><circle cx="17" cy="-1.4" r=".9" fill="#eef4f8" stroke="none"/>');
  // A worm (centre), 18 long: no bones inside.
  R["sci-worm"] = twoTone("M-9 0c2-3 4 3 6 0s4 3 6 0 4 3 6 0", "#e8a0a0", 2);
  // A green toad sitting, facing right (origin: under its middle), 16 wide: soft skin with green blotches.
  R["sci-toad"] = g('<path d="M-8 0c-1-4 1-8 6-9 4-1 8 1 9 4 1 2 1 4 0 5z" fill="#d9d4b4"/>' +
    '<g fill="#5a9a45" stroke="none"><ellipse cx="-3" cy="-5" rx="2" ry="1.4"/><ellipse cx="2" cy="-7" rx="1.6" ry="1.1"/><ellipse cx="-6" cy="-2.4" rx="1.4" ry="1"/><ellipse cx="3" cy="-3" rx="1.3" ry=".9"/></g>' +
    '<circle cx="5" cy="-7" r="1.6" fill="#d9d4b4"/><circle cx="5.4" cy="-7.2" r=".7" fill="#3d2c22" stroke="none"/>' +
    '<path d="M4 0l1.4-2.4M7 0l.6-3" fill="none" stroke-width=".7"/><path d="M-7 0c-2-1-3-3-1-4" fill="#d9d4b4"/>');
  /* ---- science-sapling-33: reptiles, birds and mammals ---- */
  // A bat flying (centre), 30 across: a furry brown body with big ears. Pieces: wl, wr (its wings of skin, they
  // flap with sy about the body).
  R["sci-bat"] = g(piece("wl", "-2 0", '<path d="M-2-1c-4-4-10-5-14-3 1 1 1 3 0 4 2-1 4 0 4 2 2-1 4-1 5 1 1-1 3-2 5-1z" fill="#5b4636"/>') +
    piece("wr", "2 0", '<path d="M2-1c4-4 10-5 14-3-1 1-1 3 0 4-2-1-4 0-4 2-2-1-4-1-5 1-1-1-3-2-5-1z" fill="#5b4636"/>') +
    '<ellipse cy="0" rx="3" ry="4" fill="#8a6440"/><path d="M-2-3l-1-3 2 1.4M2-3l1-3-2 1.4" fill="#8a6440"/>' +
    '<circle cx="-1" cy="-2" r=".5" fill="#fff" stroke="none"/><circle cx="1" cy="-2" r=".5" fill="#fff" stroke="none"/>');
  // A bat hanging upside down with its baby (origin: where its feet hold on), 10 long, wings folded.
  R["sci-bat-hang"] = g('<path d="M-1 0v2M1 0v2" fill="none" stroke-width=".6"/><path d="M-4 2c-1 4 0 8 4 9 4-1 5-5 4-9z" fill="#5b4636"/>' +
    '<ellipse cx="0" cy="6" rx="2.4" ry="3.4" fill="#8a6440"/><path d="M-1.6 9l-1 2.6 1.8-1M1.6 9l1 2.6-1.8-1" fill="#8a6440"/>' +
    '<ellipse cx="2.8" cy="5" rx="1.2" ry="1.8" fill="#a07a5a"/>');
  // A cave mouth at night (stage units): a dark rock with a black opening at the top middle.
  R["sci-cave"] = g('<rect width="160" height="90" fill="#1f2a52" stroke="none"/><path d="M0 90V20c30-8 60-14 90-10s56 6 70 2v78z" fill="#5d5a66"/>' +
    '<path d="M40 90c0-30 16-56 40-56s40 26 40 56z" fill="#141a30"/>');
  /* ---- science-sapling-34: inside nests and dens ---- */
  // A brick minaret (origin: its bottom middle), 14 wide and 64 tall, with turquoise tile bands and a balcony; a
  // nest fits on its flat top at (0, -64).
  R["sci-minaret"] = g('<path d="M-6 0l1-56h10l1 56z" fill="#d6a46a"/><path d="M-5.6-14h11.2M-5.4-28h10.8M-5.2-40h10.4" fill="none" stroke="#3aa6a0" stroke-width="2"/>' +
    '<path d="M-8-56h16v3H-8z" fill="#c4935a"/><path d="M-4.6-56l.4-8h8.4l.4 8z" fill="#d6a46a"/><path d="M-5.4-64h10.8" fill="none" stroke-width="1"/>' +
    '<path d="M-1.4-6v-5a1.4 1.4 0 0 1 2.8 0v5z" fill="#6e4a2e"/>');
  // A white stork standing, facing right (origin: its feet), 26 tall: red legs and beak, black wing feathers.
  // Piece: head (neck and head, it bends down about 3 -14 to feed the chicks).
  R["sci-stork"] = g('<path d="M-1 0v-9M1.6 0l-.4-9" fill="none" stroke="#e5483f" stroke-width=".9"/>' +
    '<path d="M-7-13c0-3 3-5 8-5 4 0 6 2 6 4s-3 4-7 4c-3 0-7-1-7-3z" fill="#fff"/><path d="M-7-13c2 1 5 1 8 .4l-1 2.4c-3 0-6-1-7-2.8z" fill="#3d2c22"/>' +
    piece("head", "3 -14", '<path d="M3-14c1-3 0-6 1-9" fill="none" stroke="#3d2c22" stroke-width="2.4" stroke-linecap="round"/><path d="M3-14c1-3 0-6 1-9" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="4.2" cy="-23.4" r="1.6" fill="#fff"/><path d="M5.4-23.6l6 1-6 .6z" fill="#e5483f"/><circle cx="4.6" cy="-23.8" r=".4" fill="#3d2c22" stroke="none"/>'));
  // A stork flying right (centre), 40 across. Piece: wings (they flap with sy).
  R["sci-stork-fly"] = g('<path d="M-6 0h-12" fill="none" stroke="#e5483f" stroke-width=".9"/>' +
    piece("wings", "0 0", '<path d="M-6-1c2-6 6-9 12-10 0 3-2 7-6 10z" fill="#fff"/><path d="M0-11c2 0 4 0 6 0-1 2-2 4-4 5z" fill="#3d2c22"/>') +
    '<ellipse rx="7" ry="2.6" fill="#fff"/><path d="M6-1h8" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="15" cy="-1" r="1.4" fill="#fff"/><path d="M16-1.4l6 .8-6 .6z" fill="#e5483f"/>');
  // Two stork chicks' heads looking out of the nest (origin: the nest's rim, middle), 10 wide.
  R["sci-storkchicks"] = g('<path d="M-3 0v-3M3 0v-3" fill="none" stroke="#f4f1ea" stroke-width="1.6"/><circle cx="-3" cy="-4" r="1.6" fill="#f4f1ea"/><circle cx="3" cy="-4.4" r="1.6" fill="#f4f1ea"/>' +
    '<path d="M-1.8-4.2l2 .6-2 .4zM4.2-4.6l2 .6-2 .4z" fill="#3d2c22"/>');
  /* A sandy river bank cut away to show inside (stage units): grass on top at y = 28, the earth wall, the river at
     the bottom from y = 82. A bee-eater's tunnel goes in at (124, 46) to a chamber at (96, 44) with eggs; a fox's
     den goes in at (12, 76) to a big chamber round (44, 66). */
  R["sci-bank"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 28h160v54H0z" fill="#d9b98c"/><path d="M0 28h160" fill="none" stroke="#7cbf5a" stroke-width="2.4"/>' +
    '<path d="M0 40h160M0 56h160M0 70h160" fill="none" stroke="#c9a578" stroke-width=".6"/><rect y="82" width="160" height="8" fill="#5b9bd5"/>' +
    '<path d="M126 44c-10 0-20-2-26-1-4 0-8 2-8 4s4 4 8 4c6 0 16-3 26-3z" fill="#7a5432"/>' +
    '<g fill="#fffdf6" stroke-width=".3"><ellipse cx="96" cy="49" rx="1.4" ry="1"/><ellipse cx="99" cy="49.4" rx="1.4" ry="1"/></g>' +
    '<path d="M4 82c2-6 8-10 16-10 6 0 8-4 14-8 8-4 20-4 26 2 4 4 4 10 0 14-2 2-8 2-20 2z" fill="#7a5432"/>');
  // A bee-eater, facing right (centre), 14 long: a curved black beak, a yellow throat, a chestnut back, a blue-green
  // belly and a long tail.
  R["sci-beeeater"] = g('<path d="M-6 0l-6 1 6 1z" fill="#3aa6a0"/><ellipse cx="0" cy="0" rx="6" ry="3" fill="#3aa6a0"/><path d="M-4-2c3-2 7-2 9 0-3 0-6 .6-9 0z" fill="#a05a2c"/>' +
    '<circle cx="5" cy="-1" r="2.4" fill="#a05a2c"/><path d="M4.4 1c1-1 2.4-1 3.6-.4L6 2z" fill="#fcd34d"/><path d="M7-1.4c2 0 4 .6 5 1.6-1.6-.4-3.4-.6-5-.4z" fill="#3d2c22"/>' +
    '<circle cx="5.6" cy="-1.6" r=".45" fill="#3d2c22" stroke="none"/><path d="M3-1.8h4" fill="none" stroke="#3d2c22" stroke-width=".6"/>');
  /* ---- science-sapling-56: living together ---- */
  // A crane flying right (centre), 40 across: grey, with a black neck and a red crown. Piece: wings (they flap with sy).
  R["sci-crane-fly"] = g('<path d="M-6 0h-13" fill="none" stroke="#3d2c22" stroke-width=".9"/>' +
    piece("wings", "0 0", '<path d="M-6-1c2-6 6-9 12-10 0 3-2 7-6 10z" fill="#b8c0c8"/><path d="M0-11c2 0 4 0 6 0-1 2-2 4-4 5z" fill="#3d2c22"/>') +
    '<ellipse rx="7" ry="2.6" fill="#b8c0c8"/><path d="M6-1h8" fill="none" stroke="#3d2c22" stroke-width="1.5"/><circle cx="15" cy="-1" r="1.4" fill="#b8c0c8"/>' +
    '<circle cx="15" cy="-2.2" r=".7" fill="#e5483f" stroke="none"/><path d="M16-1.4l5 .8-5 .6z" fill="#5b5b5b"/>');
  // Inside a hive (stage units): a wall of wax honeycomb, some cells full of honey, some with white young bees, and
  // the hive's door at the bottom right (x 130 to 150, y 78 to 86).
  R["sci-comb"] = (function () {
    var s = '<rect width="160" height="90" fill="#b57638"/>', r = 6, w = r * Math.sqrt(3);
    for (var row = 0, y = 4; y < 80; row++, y += r * 1.5) {
      for (var x = (row % 2 ? w / 2 : 0) + 4; x < 164; x += w) {
        var k = rnd(row * 31 + Math.round(x)), fill = k < .45 ? "#f6b73c" : k < .6 ? "#fde7a8" : "#f8e3b8";
        var pts = [];
        for (var i = 0; i < 6; i++) { var a = Math.PI / 3 * i + Math.PI / 6; pts.push((x + r * Math.cos(a)).toFixed(1) + " " + (y + r * Math.sin(a)).toFixed(1)); }
        s += '<path d="M' + pts.join("L") + 'z" fill="' + fill + '" stroke="#c98a2b" stroke-width=".8"/>';
        if (k >= .45 && k < .6) s += '<path d="M' + (x - 2) + ' ' + y + 'c0-2 4-2 4 0s-4 2-4 0z" fill="#fff" stroke="#d9c39a" stroke-width=".3"/>';
      }
    }
    return s + '<rect x="128" y="78" width="24" height="12" fill="#6e4a2e"/><rect x="132" y="80" width="16" height="6" rx="2" fill="#2a1d14"/>';
  })();
  /* ---- science-sapling-55: rocks and fossils ---- */
  // Three kinds of rock (origin: their bottom middle), about 20 wide: rough speckled granite, a smooth round river
  // stone, and red sandstone in layers.
  R["sci-granite"] = g('<path d="M-10 0l-1-7 4-6 6-1 5 2 6 5-1 7z" fill="#b8b2ac"/>' + '<g stroke="none">' +
    circles([[-6, -4, .7], [-2, -8, .6], [3, -5, .8], [6, -2, .6], [-4, -10, .5], [1, -2, .6], [7, -7, .5]], .6, "#3d2c22") +
    circles([[-3, -5, .6], [4, -9, .5], [0, -6, .5], [-7, -2, .5]], .5, "#f2a6a0") + "</g>");
  R["sci-riverstone"] = g('<ellipse cy="-5" rx="10" ry="5" fill="#8f9aa3"/><path d="M-5-8c3-1.6 7-1.6 9 0" fill="none" stroke="#fff" stroke-width=".9" opacity=".6"/>');
  R["sci-sandstone"] = g('<path d="M-10 0v-12h20V0z" fill="#d98a5a"/><path d="M-10-3h20M-10-6h20M-10-9h20" fill="none" stroke="#b5683e" stroke-width=".6"/>' +
    '<path d="M-10-6.6h20M-10-10.2h20" fill="none" stroke="#e8a77a" stroke-width=".8"/>');
  // A seashell, a scallop (origin: its bottom middle), 8 wide.
  R["sci-shell"] = g('<path d="M-4 0c-1-4 1-7 4-7s5 3 4 7z" fill="#f6d5c0"/><path d="M0 0v-7M-2 0l-1-6M2 0l1-6M-3.4-.4l-1-4M3.4-.4l1-4" fill="none" stroke="#d9a07a" stroke-width=".4"/>' +
    '<path d="M-1.6 0h3.2v1.2h-3.2z" fill="#f6d5c0"/>');
  // The bottom of a shallow sea cut away (stage units): water down to y = 62, soft grey-brown mud below.
  R["sci-seabed"] = g('<rect width="160" height="90" fill="#7fbcd8" stroke="none"/><rect width="160" height="24" fill="#9fd3f0" stroke="none" opacity=".5"/>' +
    '<rect y="62" width="160" height="28" fill="#9c8a72"/><path d="M0 70h160M0 78h160" fill="none" stroke="#8a7862" stroke-width=".5"/>');
  // A band of new mud and sand settling (stage units: a strip 160 wide and 6 tall from its top-left corner).
  R["sci-mudband"] = '<rect width="160" height="6" fill="#b09a7c"/><path d="M0 3h160" fill="none" stroke="#9c8a72" stroke-width=".4"/>';
  /* The same place millions of years later (stage units): the sea is gone and the mud is layered rock from y = 44,
     with the fossil, the stone print of the shell, at (80, 62); dry land and sky above. */
  R["sci-fossilrock"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 44h160v46H0z" fill="#c9b08a"/>' +
    '<path d="M0 50h160M0 56h160M0 68h160M0 76h160M0 84h160" fill="none" stroke="#a88f6a" stroke-width=".7"/><path d="M0 44h160" fill="none" stroke="#7cbf5a" stroke-width="2"/>' +
    '<g transform="translate(80 62)"><path d="M-4 0c-1-4 1-7 4-7s5 3 4 7z" fill="#a89580"/><path d="M0 0v-7M-2 0l-1-6M2 0l1-6M-3.4-.4l-1-4M3.4-.4l1-4" fill="none" stroke="#7a6a54" stroke-width=".5"/></g>');
  // A fossil shell in a piece of rock (centre), 20 wide, as found on a mountain.
  R["sci-fossil"] = g('<path d="M-10 6l-2-8 6-6 10-1 7 5-1 10z" fill="#c9b08a"/><g transform="translate(0 4) scale(1.3)"><path d="M-4 0c-1-4 1-7 4-7s5 3 4 7z" fill="#a89580"/>' +
    '<path d="M0 0v-7M-2 0l-1-6M2 0l1-6M-3.4-.4l-1-4M3.4-.4l1-4" fill="none" stroke="#7a6a54" stroke-width=".4"/></g>');
  /* ---- science-sapling-37: I grow ---- */
  // A height chart on the wall (origin: its foot on the floor), 8 wide and 60 tall, with a mark every 5.
  R["sci-heightchart"] = g('<rect x="-4" y="-60" width="8" height="60" fill="#fffdf6"/>' +
    (function () { var d = ""; for (var y = -5; y > -60; y -= 5) d += "M-4 " + y + "h" + (y % 10 === 0 ? 5 : 3); return '<path d="' + d + '" fill="none" stroke="#5b9bd5" stroke-width=".6"/>'; })() +
    '<path d="M-4-60h8v4h-8z" fill="#7cbf5a"/>');
  // A pencil mark on the height chart (origin: its left end), 8 long.
  R["sci-mark"] = '<path d="M0 0h8" fill="none" stroke="#e5483f" stroke-width="1" stroke-linecap="round"/>';
  /* ---- science-sapling-39: loud and quiet, high and low ---- */
  // A shoebox with two rubber bands over its hole (origin: its bottom middle), 30 wide. Pieces: thin (a thin red
  // band, at -13) and thick (a thick blue band, at -10.6); each shivers with sy.
  R["sci-bandbox2"] = g('<rect x="-15" y="-10" width="30" height="10" fill="#c98a4b"/><ellipse cy="-10" rx="8" ry="2.4" fill="#5a3a22"/>') +
    piece("thin", "0 -13", '<path d="M-16-13h32" fill="none" stroke="#e5483f" stroke-width=".6"/>') +
    piece("thick", "0 -10.6", '<path d="M-16-10.6h32" fill="none" stroke="#3f6fb0" stroke-width="1.8"/>');
  // A clear glass jar (origin: its bottom middle), 10 wide and 18 tall. Piece: water (it fills from the bottom with sy).
  R["sci-jarw"] = g(piece("water", "0 0", '<rect x="-4.4" y="-17" width="8.8" height="17" fill="#9fd3f0" stroke="none"/>') +
    '<rect x="-5" y="-18" width="10" height="18" rx="1.4" fill="#eaf7fc" fill-opacity=".35"/><path d="M-3.4-15v12" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>');
  // A wooden spoon for tapping (origin: the end of its bowl), 20 long, pointing down-left.
  R["sci-woodspoon"] = g('<path d="M0 0l14-14" fill="none" stroke="#a0683f" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="1" cy="-1" rx="2.4" ry="1.6" transform="rotate(-45 1 -1)" fill="#b57638"/>');
  /* ---- science-sapling-53: when the weather gets rough ---- */
  // Falling hail over the whole stage, like sci-rainfall: little balls of ice, the pattern repeating every 12 down
  // from y = -216, so moving it down by "+12" again and again looks like hail that keeps falling.
  R["sci-hail"] = (function () {
    var s = "";
    for (var y = -216; y < 90; y += 6) {
      var row = Math.round((y + 216) / 6) % 2;
      for (var x = 5 + row * 10; x < 160; x += 20) s += '<circle cx="' + (x + rnd(x + row * 7) * 4).toFixed(1) + '" cy="' + y + '" r=".9"/>';
    }
    return '<g fill="#f4f8fb" stroke="#8fa9ba" stroke-width=".25">' + s + "</g>";
  })();
  // A dust storm: brown hazy air with swirls (stage units, from x = 0 to 74).
  R["sci-dust"] = '<rect width="74" height="90" fill="#c9a578" opacity=".7"/><g fill="none" stroke="#a87a48" stroke-width=".8" opacity=".8">' +
    '<path d="M6 30c8-4 16 4 24 0s14-4 20 0M10 50c8-4 16 4 24 0s14-4 22 0M4 66c8-4 16 4 24 0s14-4 20 0"/></g>';
  // A grassy hill rising to the right (stage units), from y = 62 at x = 104 up to y = 40 at the right edge.
  R["sci-highground"] = g('<path d="M100 90V64c20-4 40-14 60-24v50z" fill="#8cc66b"/><path d="M104 63c20-4 38-13 56-22" fill="none" stroke="#5a9a45" stroke-width=".6"/>');
  /* ---- science-sapling-46: if it runs out ---- */
  /* The ground cut away to show what is deep under it (stage units): the surface at y = 30, layers of rock, a
     pocket of black oil round (56, 72) and a pocket of gas round (114, 64), with a pipe going down to the oil. */
  R["sci-underground"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="30" width="160" height="60" fill="#c9b08a"/>' +
    '<path d="M0 30h160" fill="none" stroke="#7cbf5a" stroke-width="2.4"/><path d="M0 44c40-3 80 3 160 0M0 56c40 3 90-3 160 0M0 82c50-3 100 3 160 0" fill="none" stroke="#a88f6a" stroke-width=".8"/>' +
    '<path d="M32 74c0-8 12-12 24-12s24 4 24 12-12 10-24 10-24-2-24-10z" fill="#2a2420"/><path d="M42 68c4-2 8-2 12-1" fill="none" stroke="#6b5e54" stroke-width=".8"/>' +
    '<path d="M94 64c0-6 10-9 20-9s20 3 20 9-10 8-20 8-20-2-20-8z" fill="#e8eef2" stroke="#9aa9b5"/><g fill="none" stroke="#9aa9b5" stroke-width=".5"><circle cx="106" cy="62" r="1.6"/><circle cx="116" cy="66" r="1.2"/><circle cx="124" cy="61" r="1.4"/></g>' +
    '<path d="M58 30v34" fill="none" stroke="#5b5b5b" stroke-width="1.6"/>');
  // An oil pump, a "nodding donkey" (origin: its foot at the well), 30 wide. Piece: beam (it nods about 0 -14).
  R["sci-derrick"] = g('<path d="M-4 0l4-14 4 14z" fill="none" stroke="#5b5b5b" stroke-width="1.2"/><rect x="-14" y="-2" width="28" height="2" fill="#5b5b5b"/>' +
    piece("beam", "0 -14", '<rect x="-14" y="-15.4" width="28" height="2.8" rx=".8" fill="#e5483f"/><path d="M14-16c3 0 4 2 4 4s-1 4-4 4z" fill="#e5483f"/><path d="M17-8v8" fill="none" stroke="#3d2c22" stroke-width=".6"/>'));
  // A yellow gas pipe on the wall of sci-room (stage units): down from the ceiling at x = 20 to a heater's back at
  // (36, 62).
  R["sci-gaspipe"] = '<path d="M20 0v58c0 3 2 4 5 4h11" fill="none" stroke="#3d2c22" stroke-width="2.6" stroke-linejoin="round"/><path d="M20 0v58c0 3 2 4 5 4h11" fill="none" stroke="#f6c94b" stroke-width="1.6" stroke-linejoin="round"/>';
  // Power lines from a power station to a house (stage units): poles at x = 66 and 100, wires sagging between them,
  // from (44, 40) to (118, 58).
  R["sci-powerline"] = g('<path d="M66 84V36M100 84V44" fill="none" stroke="#8a5a3b" stroke-width="1.6"/><path d="M62 37h8M96 45h8" fill="none" stroke-width="1"/>') +
    '<path d="M44 40c8 2 14 2 22-3M66 37c12 8 24 10 34 8M100 45c6 6 12 10 18 13" fill="none" stroke="#3d2c22" stroke-width=".5"/>';
  // A light switch on the wall (centre), 5 by 7. Piece: toggle (up is on; turn it with sy -1 for off).
  R["sci-switch"] = g('<rect x="-2.5" y="-3.5" width="5" height="7" rx=".8" fill="#fffdf6"/>' + piece("toggle", "0 0", '<rect x="-1" y="-2.4" width="2" height="2.4" rx=".4" fill="#9aa9b5"/>'));
  /* ---- science-sapling-47: after the party ---- */
  // A compost heap in a corner of the garden (origin: its bottom middle), 28 wide: dark soil with bits of peel.
  // Piece: peels (the fresh peels on top; they fade as they turn into soil).
  R["sci-compost"] = g('<path d="M-14 0c2-6 7-10 14-10s12 4 14 10z" fill="#6e4a2e"/><g fill="#5a3a22" stroke="none">' + circles([[-6, -3, .8], [3, -5, .7], [8, -2, .8], [-2, -7, .6]], .7, "#5a3a22") + "</g>" +
    piece("peels", "", '<path d="M-5-8c2-1 4 0 5 1M2-9c2 0 3 1 4 2" fill="none" stroke="#f6c94b" stroke-width="1.4" stroke-linecap="round"/><path d="M-1-9c1-1 3-1 3 0" fill="none" stroke="#e5483f" stroke-width="1.2" stroke-linecap="round"/>'));
  // A cross to say "not this" (centre), 10 across.
  R["sci-no"] = '<path d="M-5-5l10 10M5-5L-5 5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M-5-5l10 10M5-5L-5 5" fill="none" stroke="#e5483f" stroke-width="1.6" stroke-linecap="round"/>';
  /* ---- science-sapling-48: design a paper bridge ---- */
  // A pile of books (origin: its bottom middle), 24 wide and 16 tall; its top is at -16.
  R["sci-books"] = g('<rect x="-12" y="-5" width="24" height="5" fill="#5b9bd5"/><rect x="-11" y="-10.4" width="22" height="5.4" fill="#e5483f"/><rect x="-12" y="-16" width="23" height="5.6" fill="#6fae4e"/>' +
    '<path d="M-10-2.6h20M-9-7.6h18M-10-13.2h19" fill="none" stroke="#fff" stroke-width=".4" opacity=".6"/>');
  // A sheet of paper laid flat across two piles of books (stage units): from x = 52 to 108 at y = 58.
  R["sci-paperflat"] = '<rect x="52" y="57.4" width="56" height="1.2" fill="#fffdf6" stroke="#9aa9b5" stroke-width=".3"/>';
  // The same sheet sagging under a weight (stage units): its middle sinks to y = 70.
  R["sci-papersag"] = '<path d="M52 57.4c10 0 16 12 28 12.6 12-.6 18-12.6 28-12.6v1.2c-10 0-16 12-28 12.6-12-.6-18-12.6-28-12.6z" fill="#fffdf6" stroke="#9aa9b5" stroke-width=".3"/>';
  // The sheet folded like a fan (stage units), from x = 52 to 108 between y = 54 and 58.
  R["sci-paperfold"] = (function () {
    var d = "M52 58"; for (var x = 52; x < 108; x += 4) d += "L" + (x + 2) + " 54L" + (x + 4) + " 58";
    return '<path d="' + d + '" fill="#fffdf6" stroke="#9aa9b5" stroke-width=".4" stroke-linejoin="round"/><path d="M52 54h56" fill="none" stroke="#9aa9b5" stroke-width=".3" opacity=".5"/>';
  })();
  // A coin seen from the side (origin: its bottom middle), 6 wide and 1.2 thick.
  R["sci-coin"] = '<rect x="-3" y="-1.2" width="6" height="1.2" rx=".4" fill="#f6c94b" stroke="#b5862a" stroke-width=".3"/>';
  // A page of sketches (centre), 34 wide: a flat bridge and a folded one, drawn in pencil. Piece: lines (to draw).
  R["sci-sketchpage"] = g('<rect x="-17" y="-12" width="34" height="24" rx="1" fill="#fffdf6"/>') +
    piece("lines", "", '<g fill="none" stroke="#5b6fd0" stroke-width=".6" stroke-linecap="round" stroke-linejoin="round"><path d="M-14-4h4v4h-4zM-6-4h4v4h-4zM-10-4h4"/>' +
      '<path d="M2-4h4v4H2zM10-4h4v4h-4zM6-4l1-1.6 1 1.6 1-1.6 1 1.6"/><path d="M-14 6h10M2 6h12"/><path d="M-12 8.6l1 1M8 8.4l1 1.6 2-3"/></g>');
  /* ---- science-sapling-49: two designs ---- */
  // A plate seen from the side (origin: its bottom middle), 30 wide.
  R["sci-plate"] = g('<path d="M-15-3h30l-4 3h-22z" fill="#fffdf6"/><ellipse cy="-3" rx="15" ry="1" fill="#eef4f8"/>');
  // A woolly sock wrapped round an ice cube (origin: its bottom middle), 22 wide and 16 tall. Fade it to show the
  // ice inside.
  R["sci-woolwrap"] = g('<path d="M-11 0c-1-6 0-14 5-16 4-1 9-1 13 0 4 2 5 10 4 16z" fill="#c0504d"/>' +
    '<path d="M-9-4h18M-10-8h20M-9-12h18" fill="none" stroke="#e57391" stroke-width=".8" stroke-dasharray="1.6 1"/>');
  // A cup of foil, open at the top (origin: its bottom middle), 18 wide and 10 tall, shiny.
  R["sci-foilcup"] = g('<path d="M-9-10h18l-2 10h-14z" fill="#cfd8dc"/><path d="M-6-8l1 6M0-9v7M5-8l-1 6" fill="none" stroke="#fff" stroke-width=".7" opacity=".8"/>');
  /* ---- science-sapling-50: from the past to the future: bread ---- */
  // A ripe wheat stalk (origin: its foot), 18 tall, with an ear of grain at the top.
  R["sci-stalk"] = g('<path d="M0 0c0-6 .6-12 0-16" fill="none" stroke="#c9a24f" stroke-width=".7"/><path d="M0-15c-1.6-1-1.6-4 0-6 1.6 2 1.6 5 0 6z" fill="#e8b84a" stroke-width=".4"/>' +
    '<path d="M0-21l-.4-3M-.8-19l-1.4-2M.8-19l1.4-2" fill="none" stroke="#c9a24f" stroke-width=".3"/>');
  // A sickle (origin: its handle's end), the blade curving up to the right, 14 long.
  R["sci-sickle"] = g('<path d="M0 0l5-2" fill="none" stroke="#8a5a3b" stroke-width="1.6" stroke-linecap="round"/><path d="M5-2c4-1 8-4 8-8-2 3-5 5-8 6z" fill="#cfd8dc"/>');
  /* The windmills of Nashtifan in Khorasan (stage units): a long wall of mud brick from x = 30 to 130 (top at y =
     20), with three tall openings where the wooden blades turn about upright axles. Pieces: b1, b2, b3 (the blades;
     they turn with sx about their axle). */
  R["sci-nashtifan"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 76c40-3 120-3 160 0v14H0z" fill="#e7c27a"/>' +
    '<path d="M30 78V20h100v58z" fill="#c9a578"/><path d="M30 34h100M30 50h100M30 64h100" fill="none" stroke="#b08a5a" stroke-width=".6"/>' +
    [46, 80, 114].map(function (x, i) {
      return '<rect x="' + (x - 9) + '" y="22" width="18" height="40" fill="#5a3a22"/>' +
        piece("b" + (i + 1), x + " 42", '<path d="M' + x + ' 23v38" fill="none" stroke="#8a5a3b" stroke-width="1.4"/><path d="M' + (x - 8) + ' 25h16v34h-16z" fill="#b57638" stroke-width=".5"/>' +
          '<path d="M' + (x - 8) + ' 33h16M' + (x - 8) + ' 42h16M' + (x - 8) + ' 51h16" fill="none" stroke="#8a5a3b" stroke-width=".5"/>');
    }).join(""));
  /* A water mill (stage units): a stream from the left, a mill house from x = 84 to 124 (floor at y = 74) and a
     wooden wheel at (74, 66), radius 14. Piece: wheel (it turns round its middle). */
  R["sci-watermill"] = g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 70c40-4 120-4 160 0v20H0z" fill="#a9d68b"/>' +
    '<path d="M0 78c20-2 40 0 60 0s16 2 24 0v12H0z" fill="#5b9bd5"/><path d="M84 74V44h40v30z" fill="#e8d3a6"/><path d="M80 46l24-14 24 14z" fill="#a0683f"/><rect x="98" y="58" width="10" height="16" fill="#6e4a2e"/>') +
    piece("wheel", "74 66", g('<circle cx="74" cy="66" r="14" fill="none" stroke="#8a5a3b" stroke-width="2"/><circle cx="74" cy="66" r="2" fill="#8a5a3b"/>' +
      [0, 45, 90, 135].map(function (a) { return '<path d="M74 66l' + (14 * Math.cos(a * Math.PI / 180)).toFixed(1) + " " + (14 * Math.sin(a * Math.PI / 180)).toFixed(1) + 'M74 66l' + (-14 * Math.cos(a * Math.PI / 180)).toFixed(1) + " " + (-14 * Math.sin(a * Math.PI / 180)).toFixed(1) + '" fill="none" stroke="#8a5a3b" stroke-width="1"/>'; }).join("") +
      [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { var x = 74 + 14 * Math.cos(a * Math.PI / 180), y = 66 + 14 * Math.sin(a * Math.PI / 180); return '<rect x="' + (x - 2).toFixed(1) + '" y="' + (y - 2).toFixed(1) + '" width="4" height="4" fill="#b57638" transform="rotate(' + a + " " + x.toFixed(1) + " " + y.toFixed(1) + ')"/>'; }).join("")));
  // A tanoor, a clay bread oven, with its glowing mouth (origin: its bottom middle), 30 wide and 22 tall.
  R["sci-tanoor"] = g('<path d="M-15 0c0-14 6-22 15-22s15 8 15 22z" fill="#c4935a"/><path d="M-6-4c0-6 3-9 6-9s6 3 6 9z" fill="#3d2c22"/><path d="M-4-4c0-4 2-6 4-6s4 2 4 6z" fill="#f59e0b" stroke="none" opacity=".85"/>');
  // A long flat loaf of sangak bread (centre), 30 wide, with its pebble dimples.
  R["sci-sangak"] = g('<path d="M-15 0c0-3 4-4 15-4s15 1 15 4-4 3-15 3-15 0-15-3z" fill="#d9a35a"/>' + '<g fill="#a87038" stroke="none">' +
    circles([[-10, -1, .5], [-5, 0, .5], [0, -1.6, .5], [5, 0, .5], [10, -1, .5], [-7, -2.4, .4], [7, -2.4, .4]], .5, "#a87038") + "</g>");
  B.RIG = Object.assign(B.RIG, R);
})();
