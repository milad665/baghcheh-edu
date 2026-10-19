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
