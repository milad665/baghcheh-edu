/* باغچه — drawings for the Persian reading lessons' animated scenes (step type `scene`, js/scene.js; lessons in
   js/lessons/read.js). Same rules and style as js/art/rig.js: each drawing has its origin where it stands (the middle
   of its bottom edge) unless its comment says otherwise, a dark outline (#3d2c22), flat warm colours, no text
   except the letters and words a reading scene is about. */
var B = window.B || {};
window.B = B;

(function () {
  B.RIG = B.RIG || {};
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }

  /* A child who can laugh or be sad: the engine's full-body "walker" (js/art/rig.js; the part's look sets hair,
     clothes and skin), with face pieces. "eyes" and "smile" are the usual face; "laugh" (eye shut, mouth open) and
     "sad" (mouth down, brow up, a tear) are hidden until a track shows them. */
  var EYE = '<g stroke="none" fill="#3d2c22"><ellipse cx="2.7" cy="-20.8" rx=".5" ry=".7"/></g>';
  var MOUTH = '<path d="M2.2-18.6q.9.6 1.8 0" fill="none" stroke-width=".4"/>';
  var FACES = '<g data-part="laugh" style="opacity:0"><path d="M2-20.8q.7-.9 1.5 0" fill="none" stroke-width=".4"/>' +
    '<path d="M2-18.9h2.3q-.2 1.7-1.15 1.7T2-18.9z" fill="#8a3a3a" stroke-width=".3"/></g>' +
    '<g data-part="sad" style="opacity:0"><path d="M2.2-17.9q.9-.7 1.8 0" fill="none" stroke-width=".4"/><path d="M1.6-21.9l1.8.5" fill="none" stroke-width=".35"/>' +
    '<path d="M3-19.6c-.4.6-.6.9-.6 1.2a.6.6 0 0 0 1.2 0c0-.3-.2-.6-.6-1.2z" fill="#7cc6e8" stroke-width=".2"/></g>';
  function kid(k) {
    return B.RIG.walker(k || {}).replace(EYE, '<g data-part="eyes">' + EYE + "</g>").replace(MOUTH, '<g data-part="smile">' + MOUTH + "</g>" + FACES);
  }
  // A picture-story backdrop (js/art/scenes.js) as a part: it fills the stage (stage units at their place).
  function backdrop(name) { return function () { return B.SCENES[name]; }; }

  /* Two sound pieces of a spoken word, as coloured bars (origin: the middle of their top edge). Persian is said
     and read from the right, so the first sound is the right bar ("start") and the last one the left bar ("end"). */
  function bar(c1, c2) {
    return g('<g data-part="end" data-pivot="-8 3.5"><rect x="-15" y="0" width="14" height="7" rx="3.5" fill="' + c2 + '"/></g>' +
      '<g data-part="start" data-pivot="8 3.5"><rect x="1" y="0" width="14" height="7" rx="3.5" fill="' + c1 + '"/></g>');
  }

  Object.assign(B.RIG, {
    "read-bg-garden": backdrop("garden"), "read-bg-street": backdrop("street"), "read-bg-room": backdrop("room"),
    "read-bg-sea": backdrop("sea"), "read-bg-snow": backdrop("snow"), "read-bg-school": backdrop("school"), "read-bg-meadow": backdrop("meadow"),
    // A child (look: { hair, top, bottom, hairColor, skin }) whose face can change; see kid().
    "read-kid": kid,

    // A ball with its origin at its middle, so it can roll (r = 4).
    "read-ball-c": g('<circle r="4" fill="#fff"/><path d="M0-1.7l1.6 1.2-.6 1.9h-2l-.6-1.9z" fill="#3d2c22"/>' +
      '<path d="M0-1.7V-4M1.6-.5l2.3-.8M1 1.4l1.4 1.9M-1 1.4l-1.4 1.9M-1.6-.5l-2.3-.8" fill="none" stroke-width=".45"/>'),
    // A big tree (origin: the bottom of its trunk); the crown's middle is at (0, -38), about 15 around.
    "read-tree-big": g('<path d="M-3.4 0l1-26h4.8l1 26z" fill="#a0683f"/><path d="M0-22l-6-6M.6-18l5-5" fill="none" stroke="#a0683f" stroke-width="1.6"/>' +
      '<g fill="#5a9a45"><circle cx="-10" cy="-34" r="11"/><circle cx="10" cy="-33" r="11"/><circle cx="0" cy="-45" r="12"/><circle cx="0" cy="-30" r="10"/></g>' +
      '<g fill="#7dbb5a" stroke="none"><circle cx="-5" cy="-46" r="4"/><circle cx="-13" cy="-36" r="3"/><circle cx="8" cy="-38" r="3.4"/></g>'),

    // A low bush, 32 wide and 17 tall: something to hide behind (origin: middle of its bottom).
    "read-bush": g('<g fill="#4f8f3c"><circle cx="-10" cy="-7" r="7"/><circle cx="10" cy="-7" r="7"/><circle cx="0" cy="-10" r="8"/><ellipse cx="0" cy="-3.4" rx="16" ry="3.4"/></g>' +
      '<g fill="#7dbb5a" stroke="none"><circle cx="-3" cy="-13" r="2.4"/><circle cx="9" cy="-10" r="2"/></g>'),

    // Sound bars (see bar()): rhymes share their last sound, words that begin alike share their first.
    "read-bar-mouse": bar("#5b9bd5", "#f59e0b"), "read-bar-ear": bar("#5a9a45", "#f59e0b"),
    "read-bar-lion": bar("#9b6bd0", "#2bb3a3"), "read-bar-cheese": bar("#e46b8a", "#2bb3a3"),
    "read-bar-m": bar("#e46b8a", "#e7dccb"), "read-bar-s": bar("#5a9a45", "#e7dccb"),
    // A rounded frame around a pair of pictures (stage units at its place: x 36 to 124, y 2 to 42).
    "read-pair-frame": '<path d="M42 2h76a6 6 0 0 1 6 6v28a6 6 0 0 1 -6 6h-76a6 6 0 0 1 -6 -6v-28a6 6 0 0 1 6 -6z" fill="none" stroke="#fff" stroke-width="3"/><path d="M42 2h76a6 6 0 0 1 6 6v28a6 6 0 0 1 -6 6h-76a6 6 0 0 1 -6 -6v-28a6 6 0 0 1 6 -6z" fill="none" stroke="#f59e0b" stroke-width="1.4"/>',
    "read-pair-frame2": '<path d="M42 45h76a6 6 0 0 1 6 6v32a6 6 0 0 1 -6 6h-76a6 6 0 0 1 -6 -6v-32a6 6 0 0 1 6 -6z" fill="none" stroke="#fff" stroke-width="3"/><path d="M42 45h76a6 6 0 0 1 6 6v32a6 6 0 0 1 -6 6h-76a6 6 0 0 1 -6 -6v-32a6 6 0 0 1 6 -6z" fill="none" stroke="#2bb3a3" stroke-width="1.4"/>',
    // A dotted arc joining two bars (stage units at its place), drawn like a pencil.
    "read-link-rhyme": '<path d="M94 64Q64 82 34 64" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="2 1.6" stroke-linecap="round"/>',
    "read-link-rhyme2": '<path d="M93.6 81Q73.6 90 53.6 81" fill="none" stroke="#2bb3a3" stroke-width="1.4" stroke-dasharray="2 1.6" stroke-linecap="round"/>',
    "read-link-start": '<path d="M132 71Q112 87 92 71" fill="none" stroke="#e46b8a" stroke-width="1.4" stroke-dasharray="2 1.6" stroke-linecap="round"/>'
  });
  /* ---------- the bakery story (read-seed-7) ---------- */
  Object.assign(B.RIG, {
    // A sangak bakery seen from the street (origin: middle of its bottom edge): 48 wide, 46 tall, the oven's
    // mouth in the middle at (0, -16); the fire inside ("fire") can glow.
    "read-bakery": g('<rect x="-24" y="-46" width="48" height="46" fill="#e9b97a"/><rect x="-26" y="-49" width="52" height="5" rx="1" fill="#a0683f"/>' +
      '<g fill="none" stroke="#d29a5c" stroke-width=".4"><path d="M-24-36h48M-24-26h48M-24-6h48M-12-46v10M12-46v10M0-36v10M-18-26v6M18-26v6M-6-6v6M6-6v6"/></g>' +
      // a sign with a loaf on it (no words)
      '<rect x="-10" y="-43" width="20" height="8" rx="1.5" fill="#fff6e3"/><path d="M-7-39c2-2.4 12-2.4 14 0-2 2.4-12 2.4-14 0z" fill="#e0a85a"/>' +
      // the oven: a dark arch with the fire at the back
      '<path d="M-13-6v-11a13 11 0 0 1 26 0v11z" fill="#c98a4b"/><path d="M-10-6v-10a10 9 0 0 1 20 0v10z" fill="#3d2c22"/>' +
      '<g data-part="fire" data-pivot="0 -8"><path d="M-7-6c0-4 2-5 3-8 1 3 2 3 3 0 1 3 3 4 3 8 1-3 3-3 3 0z" fill="#f59e0b" stroke="none"/><path d="M-4-6c0-2 1-3 2-5 1 2 2 2 3 0 1 2 2 3 2 5z" fill="#fcd34d" stroke="none"/></g>' +
      '<rect x="-16" y="-7" width="32" height="7" fill="#b57638"/>'),
    // The baker's long peel (origin: the end of its handle; it points left, 56 long). On its blade: the dough,
    // then the baked bread (hidden until a track shows it).
    "read-peel": g('<path d="M0 0h-44" fill="none" stroke="#a0683f" stroke-width="1.6"/><path d="M0 0h-44" fill="none" stroke="#c98a4b" stroke-width=".8"/>' +
      '<ellipse cx="-50" cy="0" rx="6" ry="2.2" fill="#c98a4b"/>' +
      '<g data-part="dough"><ellipse cx="-50" cy="-1.4" rx="6" ry="1.6" fill="#f6e7c8"/></g>' +
      '<g data-part="bread" style="opacity:0"><ellipse cx="-50" cy="-1.4" rx="6.4" ry="1.8" fill="#d9954a"/><path d="M-54-1.6h1M-51-1h1M-48-1.8h1M-52.6-.6h.8" fill="none" stroke="#a0683f" stroke-width=".5"/></g>'),
    // Steam, three wavy lines (origin: their bottom middle).
    "read-steam": '<g fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".9"><path d="M-3 0c-1.6-2 1.6-3 0-5s1.6-3 0-5"/><path d="M0-1c-1.6-2 1.6-3 0-5s1.6-3 0-5"/><path d="M3 0c-1.6-2 1.6-3 0-5s1.6-3 0-5"/></g>',
    // The breakfast cloth (sofreh) on the floor (origin: its middle).
    "read-sofreh": g('<ellipse rx="36" ry="7.5" fill="#fff"/><ellipse rx="32" ry="5.6" fill="none" stroke="#e46b8a" stroke-width=".6" stroke-dasharray="1.4 1.2"/>'),
    // A glass of tea on a saucer (origin: its bottom middle), and a bite of bread.
    "read-tea-glass": g('<ellipse cx="0" cy="-.4" rx="3.4" ry=".9" fill="#fff"/><path d="M-2-6h4l-.5 5.4h-3z" fill="#c2410c" fill-opacity=".85"/><path d="M-2-6h4" fill="none" stroke-width=".4"/>'),
    "read-bite": g('<path d="M-2 0c0-2 4-2 4 0z" fill="#d9954a"/>')
  });

  /* ---------- rain, umbrella and rainbow (read-seed-7, read-sapling-27) ---------- */
  function umbrella(c) {
    var panels = "M-15-28Q-15-42 0-42Q15-42 15-28Q11.25-31 7.5-28Q3.75-31 0-28Q-3.75-31-7.5-28Q-11.25-31-15-28z";
    return g('<path d="M0 0v-42M0 0c0 2.4-3 2.4-3 .4" fill="none" stroke-width="1.1"/>' +
      '<g data-part="shut" style="opacity:0"><path d="M-2.2-22L0-42l2.2 20z" fill="' + c + '"/></g>' +
      '<g data-part="open" data-pivot="0 -32"><path d="' + panels + '" fill="' + c + '"/><path d="M0-42Q-5-38-7.5-28M0-42Q5-38 7.5-28" fill="none" stroke-width=".45"/></g>');
  }
  Object.assign(B.RIG, {
    // An umbrella held by its handle (origin: the handle's end), 42 tall. "open" is the canopy, "shut" the furled
    // one (hidden); to open it, show "shut", then grow "open" from narrow (sx) while "shut" fades.
    "read-umbrella-red": umbrella("#e5483f"), "read-umbrella-green": umbrella("#5a9a45"),
    // Grey rain clouds (stage units at their place), and a grey veil over the whole stage for a rainy day.
    "read-raincloud": g('<g fill="#9aa6b5"><path d="M4 26c-4 0-6-6-1-8-1-6 7-9 11-5 3-6 13-6 15 1 6-2 11 3 9 8 4 1 4 6-1 6z"/>' +
      '<path d="M58 22c-4 0-6-5-1-7-1-5 6-8 10-4 3-5 12-5 14 1 5-2 10 2 8 7 4 1 4 5-1 5z"/><path d="M112 26c-4 0-6-5-1-7-1-5 6-8 10-4 3-5 12-5 14 1 5-2 10 2 8 7 4 1 4 5-1 5z"/></g>'),
    "read-grey": '<rect width="160" height="90" fill="#5c6f86" opacity=".35"/>',
    // A rainbow (stage units at its place, centred at 60, 66): one line per colour, so it can be drawn.
    "read-rainbow": '<g fill="none" stroke-width="2.6" stroke-linecap="round">' + ["#e5483f", "#f59e0b", "#fcd34d", "#5a9a45", "#5b9bd5", "#8a6cc4"].map(function (c, i) {
      var r = 44 - i * 2.6; return '<path d="M' + (60 - r) + " 66A" + r + " " + r + " 0 0 1 " + (60 + r) + ' 66" stroke="' + c + '"/>'; }).join("") + "</g>",
    // A house's front with an open door, at the right of the yard (stage units at their place).
    "read-house": g('<path d="M126 66V24l17-14 17 14v42z" fill="#f2d4a8"/><path d="M122 26l21-18 21 18" fill="none" stroke="#b5523b" stroke-width="2.4"/>' +
      '<rect x="133" y="38" width="20" height="28" rx="1" fill="#6b4a33"/><path d="M133 38l-5 2v28l5-2z" fill="#c98a4b"/>')
  });

  /* ---------- the kite story (read-seed-7) ---------- */
  var KITE = '<path d="M0-7L5.4 0 0 8-5.4 0z" fill="#e5483f"/><path d="M0-7V8M-5.4 0h10.8" fill="none" stroke-width=".4"/><path d="M0-7L5.4 0 0 0z" fill="#fcd34d" stroke="none" opacity=".9"/>' +
    '<path d="M0 8c2 3-2 5 0 8s-2 5 0 8" fill="none" stroke-width=".5"/><g fill="#5b9bd5"><path d="M-1.4 12l1.4 1 1.4-1v2.4l-1.4-1-1.4 1z"/><path d="M-1.4 19l1.4 1 1.4-1v2.4l-1.4-1-1.4 1z"/></g>';
  Object.assign(B.RIG, {
    // A kite flying on its string (origin: the hand holding the string; the kite is 72 away, up and to the left).
    // Turning it swings the kite around the hand.
    "read-kite-line": g('<path d="M0 0Q-8-30-27-67" fill="none" stroke-width=".35"/><g transform="translate(-27 -67) rotate(-20)">' + KITE + "</g>"),
    // The same kite caught in a tree (origin: the kite's middle), tilted, its broken string hanging down.
    "read-kite-stuck": g('<g transform="rotate(-50)">' + KITE + '</g><path d="M0 0c4 4 2 9 6 14s0 8 3 12" fill="none" stroke-width=".35"/>'),
    // A kite lying in a hand or on the ground (origin: its middle).
    "read-kite": g('<g transform="rotate(10)">' + KITE + "</g>"),
    // Gusts of wind (origin: their left end).
    "read-wind": '<g fill="none" stroke="#8fb8d8" stroke-width="1" stroke-linecap="round"><path d="M0 0h18c4 0 5-5 1-5"/><path d="M6 5h20c4 0 5 5 1 5"/><path d="M-4 10h12"/></g>',
    // A long wooden pole (origin: its bottom; 52 long, pointing up).
    "read-pole": g('<path d="M0 0V-52" fill="none" stroke="#a0683f" stroke-width="1.6"/><path d="M0 0V-52" fill="none" stroke="#c98a4b" stroke-width=".7"/>'),
    // A speech bubble with a heart (origin: the tip of its tail): "thank you!".
    "read-heart": g('<path d="M-9-22h18a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3L0 0-2-7h-7a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" fill="#fff"/>' +
      '<path d="M0-10.6c-4-3-5.6-5-5.6-7a2.6 2.6 0 0 1 5.6-1 2.6 2.6 0 0 1 5.6 1c0 2-1.6 4-5.6 7z" fill="#e5483f"/>')
  });
  /* ---------- reading a book from right to left (read-seed-8) ---------- */
  // Two lines of a picture book, one word at a time: [word, middle x, width], on lines at y 32 and 50.
  var LINES = [[["بابا", 130.3, 9.6], ["آب", 115.2, 8.7], ["داد.", 99, 12]], [["سارا", 134, 15.4], ["توپ", 113.9, 12.8], ["دارد.", 93.9, 15.2]]];
  function rr(x, y, w, h, r) {
    return "M" + (x + r) + " " + y + "h" + (w - 2 * r) + "a" + r + " " + r + " 0 0 1 " + r + " " + r + "v" + (h - 2 * r) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + r +
      "h" + (2 * r - w) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + (-r) + "v" + (2 * r - h) + "a" + r + " " + r + " 0 0 1 " + r + " " + (-r) + "z";
  }
  function bookText() {
    var hl = "", words = "", gaps = "", n = 0, gn = 0;
    LINES.forEach(function (line, li) {
      var y = 32 + li * 18;
      line.forEach(function (w, wi) {
        n++;
        hl += '<g data-part="h' + n + '" style="opacity:0"><rect x="' + (w[1] - w[2] / 2 - 1.4) + '" y="' + (y - 7.4) + '" width="' + (w[2] + 2.8) + '" height="10" rx="2" fill="#fde68a" stroke="none"/></g>';
        words += '<g data-part="w' + n + '" data-pivot="' + w[1] + " " + (y - 2) + '"><text x="' + w[1] + '" y="' + y + '" font-size="7" font-weight="700" text-anchor="middle" fill="#3d2c22" stroke="none">' + w[0] + "</text></g>";
        if (wi < line.length - 1) {
          // the space between this word and the next (to its left): a little ⌴ mark under the line
          gn++;
          var gx = ((w[1] - w[2] / 2) + (line[wi + 1][1] + line[wi + 1][2] / 2)) / 2;
          gaps += '<g data-part="g' + gn + '" style="opacity:0"><path d="M' + (gx - 2.4) + " " + (y + 1.4) + "v1.6h4.8v-1.6" + '" fill="none" stroke="#e5483f" stroke-width=".8"/></g>';
        }
      });
    });
    return hl + words + gaps;
  }
  Object.assign(B.RIG, {
    /* An open picture book, drawn in stage units at its place: the picture on the left page (piece "pic"), two
       lines of words on the right page (pieces w1…w6, read from the right: w1 is the first word), a yellow mark
       behind each word (h1…h6, hidden) and a mark for each space between words (g1…g4, hidden). */
    "read-book": function () {
      return g('<rect x="10" y="5" width="140" height="80" rx="2.4" fill="#b5523b"/>' +
        '<path d="M80 9C60 7 30 7 14 9v72c16-2 46-2 66 0z" fill="#fffaf0"/><path d="M80 9c20-2 50-2 66 0v72c-16-2-46-2-66 0z" fill="#fffaf0"/>' +
        '<path d="M80 9v72" fill="none" stroke-width=".4"/>' +
        '<g data-part="pic"><rect x="22" y="18" width="50" height="46" rx="1.5" fill="#bfe3f5"/><circle cx="33" cy="28" r="4.4" fill="#fcd34d"/>' +
        '<path d="M22 52c10-8 22-8 30-2 6-4 14-4 20 0v12H22z" fill="#8ccf6c"/><path d="M58 52v-8" fill="none" stroke="#a0683f" stroke-width="1.4"/>' +
        '<circle cx="58" cy="41" r="5.4" fill="#5a9a45"/><path d="M38 40c2-2 4-2 6 0M44 34c2-2 4-2 6 0" fill="none" stroke-width=".4"/></g>' +
        bookText());
    },
    // Outlines to point at the picture and at the words (stage units, drawn like a pencil).
    "read-ring-pic": '<path d="' + rr(19, 15, 56, 52, 4) + '" fill="none" stroke="#f59e0b" stroke-width="1.4"/>',
    "read-ring-text": '<path d="' + rr(84, 20, 60, 36, 4) + '" fill="none" stroke="#f59e0b" stroke-width="1.4"/>',
    // A finger pointing up, its fingertip at the origin (from the 👆 drawing).
    "read-finger": function () {
      return '<g transform="scale(.085) translate(-36.5 -6)" stroke="#3d2c22" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + (B.ART["👆"] || "") + "</g>";
    }
  });
  /* ---------- letters with one sound (read-sapling-23) ---------- */
  var TXT = ' font-weight="700" text-anchor="middle" fill="#3d2c22" stroke="none"';
  Object.assign(B.RIG, {
    // A letter on a card (look: { text }), 20 square, its origin in the middle.
    "read-card": function (k) {
      return g('<rect x="-10" y="-10" width="20" height="20" rx="3" fill="#fff"/><text y="5" font-size="14"' + TXT + ">" + ((k && k.text) || "") + "</text>");
    },
    /* A word on a card (look: { text, w: card width, hl: how far right of the middle the word's first letter is }),
       its origin in the middle. The piece "hl" is a yellow mark behind the first letter (hidden). */
    "read-wordcard": function (k) {
      k = k || {};
      var w = k.w || 36;
      return g('<rect x="' + (-w / 2) + '" y="-7" width="' + w + '" height="14" rx="3" fill="#fff"/>' +
        '<g data-part="hl" style="opacity:0"><circle cx="' + (k.hl || 0) + '" cy="-.6" r="4.6" fill="#fde68a" stroke="none"/></g>' +
        '<text y="3.4" font-size="9"' + TXT + ">" + (k.text || "") + "</text>");
    },
    // A dotted line from the speaking head (80, 30) to a card (look: { to: [x, y] }), drawn like a pencil.
    "read-line-to": function (k) {
      var t = (k && k.to) || [80, 60];
      return '<path d="M80 31Q' + ((80 + t[0]) / 2) + " " + (t[1] - 6) + " " + t[0] + " " + t[1] + '" fill="none" stroke="#e46b8a" stroke-width="1" stroke-linecap="round"/>';
    },
    // A ring of sound that spreads from a mouth (origin: its middle).
    "read-sound": '<circle r="5" fill="none" stroke="#e46b8a" stroke-width="1"/>',
    // A thought cloud over the stage's middle right (stage units at its place), its little puffs going down-left.
    "read-thought": g('<path d="M84 46c-7 0-9-8-3-11-3-7 5-12 11-8 3-7 15-8 18-1 6-4 15-1 15 6 7 0 9 9 3 12 3 6-3 11-9 9-3 6-14 6-17 1-6 4-15 1-14-5z" fill="#fff"/>' +
      '<circle cx="76" cy="52" r="2.6" fill="#fff"/><circle cx="71" cy="57" r="1.6" fill="#fff"/>')
  });
  /* ---------- three short stories (read-sapling-27): Rasht, Bushehr, Sanandaj ---------- */
  Object.assign(B.RIG, {
    // Rows of tea bushes on the far hills of a tea garden (stage units at their place).
    "read-tea-rows": g('<g fill="#4f8f3c">' + [[30, 58], [62, 56], [94, 57], [126, 55], [46, 64], [78, 63], [110, 63], [142, 62]].map(function (p) {
      return '<path d="M' + (p[0] - 14) + " " + p[1] + "c0-4 4-6 8-5 2-2 8-2 10 0 4-1 8 1 8 5z" + '"/>'; }).join("") + "</g>", ' stroke-width=".4"'),
    // A sea at dawn (stage units at their place): the sky ("sky", its colour turns from dawn to day as "day" shows),
    // the sea in front, with the horizon at y 46. The sun is a separate part drawn between them, so it can rise.
    "read-dawn-sky": '<rect width="160" height="50" fill="#f8c9a4"/><g data-part="day" style="opacity:0"><rect width="160" height="50" fill="#cdeaf7"/></g>',
    "read-sea": g('<path d="M0 46h160v44H0z" fill="#5b9bd5"/><path d="M0 46h160" fill="none"/>' +
      '<g fill="none" stroke="#fff" stroke-width=".6" opacity=".8"><path d="M14 56q3-2 6 0t6 0M60 52q3-2 6 0t6 0M112 58q3-2 6 0t6 0M34 70q3-2 6 0t6 0M92 74q3-2 6 0t6 0M136 68q3-2 6 0t6 0M70 84q3-2 6 0t6 0"/></g>', ' stroke-width=".5"'),
    "read-sun": g('<g fill="#f6b73c" stroke="none">' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<path d="M0-11l1.8 3.6h-3.6z" transform="rotate(' + a + ')"/>'; }).join("") +
      '</g><circle r="6.5" fill="#fcd34d"/>'),
    // A wooden boat on the water (origin: the middle of its waterline): "read-boat-back" is its mast and far side,
    // drawn behind the people in it, "read-boat-hull" its near side, drawn in front of them.
    "read-boat-back": g('<path d="M2-9V-30" fill="none" stroke="#8a5a36" stroke-width="1.2"/><path d="M2.6-29l10 3-10 3z" fill="#e5483f"/><path d="M-20-9h40" fill="none" stroke="#8a5a36" stroke-width="1.4"/>'),
    "read-boat-hull": g('<path d="M-23-9h46l-5 11H-18z" fill="#c98a4b"/><path d="M-22-5.6h44" fill="none" stroke="#a0683f" stroke-width=".6"/><path d="M-24-10h48v2h-48z" fill="#5b9bd5"/>'),
    // A house with a snowy roof, on the left of the stage (stage units at their place); the roof's snow ("snow")
    // can grow.
    "read-house-snow": g('<path d="M8 62V36h34v26z" fill="#e7c69c"/><path d="M4 38l21-16 21 16z" fill="#b5523b"/><rect x="14" y="44" width="8" height="8" fill="#bfe3f5"/><rect x="28" y="46" width="8" height="16" fill="#8a5a36"/>' +
      '<g data-part="snow" data-pivot="25 30"><path d="M4 38l21-16 21 16c-2 1-4 1-6 0-3 1-6 1-8 0-3 1-6 1-8 0-3 1-6 1-8 0-3 1-6 1-8 0-2 1-4 1-6 0z" fill="#fff"/></g>'),
    // Bare winter ground (stage units at its place, from y 56 down).
    "read-ground": g('<path d="M0 56c30-3 60-3 90-1s50 2 70 0v35H0z" fill="#a9c98a"/>', ' stroke-width=".4"'),
    // Fresh snow on the ground, 160 wide (origin: its bottom-left corner, at the stage's bottom); it grows taller (sy).
    "read-snowcover": g('<path d="M0 0V-34c20-3 40-1 60 0s40 3 60 0 30-2 40 0v34z" fill="#fff"/>', ' stroke-width=".4"'),
    // A warm knitted scarf round a walker's neck (put it under a walker part; origin at the neck), its ends hang.
    "read-scarf": g('<g data-part="ends" data-pivot="-1 -15"><path d="M-1-16l-3 7h2.6l2-6z" fill="#e5483f"/></g><rect x="-3.4" y="-17.4" width="7.6" height="2.8" rx="1.3" fill="#e5483f"/>' +
      '<path d="M-2-17.2v2.4M0-17.2v2.4M2-17.2v2.4" fill="none" stroke="#fff" stroke-width=".4"/>', ' stroke-width=".35"'),
    // A small dotted ring, to point at something (origin: its middle).
    "read-ring-small": '<circle r="6" fill="none" stroke="#f59e0b" stroke-width=".9" stroke-dasharray="1.6 1.2"/>'
  });
})();
