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
  /* ---------- Seed listening lessons: questions, poems, the sound train, classic tales, information ---------- */
  var DARK = "#3d2c22";
  function eyes(x, y, r) { return '<g stroke="none" fill="' + DARK + '"><ellipse cx="' + x + '" cy="' + y + '" rx="' + (r || .5) + '" ry="' + ((r || .5) * 1.4) + '"/></g>'; }
  Object.assign(B.RIG, {
    "read-bg-kitchen": backdrop("kitchen"), "read-bg-sky": backdrop("sky"), "read-bg-night": backdrop("night"), "read-bg-bedroom": backdrop("bedroom"),
    // An empty group, to hold other parts (under) so they show and hide together.
    "read-group": "<g></g>",

    /* A flower (look: { c: petal colour }), origin at the bottom of its stem, 16 tall. "top" (the upper stem and the
       head) turns at the middle of the stem: turned about 70° the flower hangs its head (thirsty). */
    "read-flower": function (k) {
      var c = (k && k.c) || "#e46b8a";
      var petals = [[0, -16.4], [2.3, -14.7], [1.4, -12], [-1.4, -12], [-2.3, -14.7]].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7" fill="' + c + '"/>'; }).join("");
      return g('<path d="M0 0V-6" fill="none" stroke="#4f8f3c" stroke-width=".9"/><path d="M0-2.6c-2.4-1.6-3.6-.4-3.6.6 1.4.4 2.6.2 3.6-.6z" fill="#7dbb5a" stroke-width=".35"/>' +
        '<g data-part="top" data-pivot="0 -6"><path d="M0-6V-12.4" fill="none" stroke="#4f8f3c" stroke-width=".9"/>' + petals +
        '<circle cx="0" cy="-14.2" r="1.3" fill="#fcd34d"/></g>', ' stroke-width=".4"');
    },
    /* A watering can held by its handle (origin: the top of the handle); the spout points right, its end at
       (10.5, .5). Turned about +35° it pours (the spout's end goes down to about (8.3, 6.4)). */
    "read-can": g('<path d="M-3 2.4Q0-2 3 2.4" fill="none" stroke="#3f7f50" stroke-width="1"/><rect x="-4" y="2" width="8" height="7" rx="1.2" fill="#5aa36a"/>' +
      '<path d="M3.6 6.4L10 1.2" fill="none" stroke="#3f7f50" stroke-width="1.1"/><path d="M9.4.6l2.2-1 .6 2.2z" fill="#5aa36a" stroke-width=".35"/>' +
      '<path d="M-2.6 4h5.2" fill="none" stroke="#7fc48f" stroke-width=".6"/>', ' stroke-width=".45"'),

    // Under water (stage units at their place): water, sand and weeds, for the fish of the rhyme.
    "read-water": g('<rect width="160" height="90" fill="#8fd0ec" stroke="none"/><path d="M0 78c30-4 60 2 90-1s50-1 70 1v12H0z" fill="#f1dfb0" stroke-width=".4"/>' +
      '<g fill="none" stroke="#4f8f3c" stroke-width="1.2" stroke-linecap="round"><path d="M14 80c-3-6 3-10 0-16s3-10 0-14"/><path d="M20 80c3-5-2-9 1-14"/><path d="M140 79c-3-6 3-10 0-16s3-10 0-14"/><path d="M148 80c3-6-3-10 0-16"/></g>' +
      '<g fill="#fff" stroke="none" opacity=".5"><path d="M0 8c20 2 40-2 60 0s40 2 60 0 30-2 40 0v-8H0z"/></g>'),
    // A red fish seen from the side, facing right (origin: its middle); its tail ("tail") can wag.
    "read-fish-red": g('<g data-part="tail" data-pivot="-6 0"><path d="M-5.6 0l-5.4-4.4c-1 3-1 5.8 0 8.8z" fill="#c2410c"/></g>' +
      '<ellipse rx="7.4" ry="4.6" fill="#e5483f"/><path d="M-1-4.2c1.4-2.4 4-2.6 5.4-.6" fill="#c2410c"/><path d="M0 1.4c1.6 1 1.6 2.6 0 3.2" fill="#c2410c" stroke-width=".35"/>' +
      '<path d="M2.4-3.4c1.6 2 1.6 4.8 0 6.8" fill="none" stroke="#c2410c" stroke-width=".5"/>' + eyes(4.4, -1, .7) + '<path d="M6.4 1.4q.6.4 1 0" fill="none" stroke-width=".35"/>', ' stroke-width=".45"'),
    /* A rabbit seen from the side, facing right (origin: under its feet), 18 tall. Its ears ("earF", "earB") turn
       where they meet the head, so they can wiggle. */
    "read-rabbit": g('<g data-part="earB" data-pivot="4.6 -12.6"><ellipse cx="3.8" cy="-17" rx="1.3" ry="4.4" fill="#ece5da" transform="rotate(-12 3.8 -17)"/></g>' +
      '<ellipse cx="-1" cy="-5.4" rx="6.6" ry="5" fill="#f4efe6"/><circle cx="-7" cy="-6.4" r="1.8" fill="#fff"/>' +
      '<ellipse cx="2.6" cy="-.9" rx="3.4" ry="1.1" fill="#f4efe6"/><ellipse cx="-4.4" cy="-.9" rx="2.6" ry="1.1" fill="#f4efe6"/>' +
      '<circle cx="5" cy="-10" r="3.8" fill="#f4efe6"/>' + eyes(6.4, -10.8, .55) + '<circle cx="8.6" cy="-9.4" r=".6" fill="#e8737e" stroke="none"/>' +
      '<circle cx="5.6" cy="-8.6" r=".9" fill="#f28b82" opacity=".5" stroke="none"/>' +
      '<g data-part="earF" data-pivot="5.6 -13"><ellipse cx="5.6" cy="-17.6" rx="1.4" ry="4.6" fill="#f4efe6" transform="rotate(8 5.6 -17.6)"/><ellipse cx="5.8" cy="-17.4" rx=".6" ry="3.2" fill="#f7c0c8" stroke="none" transform="rotate(8 5.8 -17.4)"/></g>', ' stroke-width=".45"'),
    /* A saj (a domed iron plate over a little fire) for baking thin bread (origin: the middle of its bottom). On it,
       "dough" (raw) and "bread" (baked, hidden); "fire" can flicker. */
    "read-saj": g('<g data-part="fire" data-pivot="0 -2"><path d="M-6 0c0-3 1.6-4 2.4-6.4.8 2.4 1.6 2.4 2.4 0 .8 2.4 2.4 3.2 2.4 6.4.8-2.4 2.4-2.4 2.4 0z" fill="#f59e0b" stroke="none"/><path d="M-3 0c0-1.6.8-2.4 1.6-4 .8 1.6 1.6 1.6 2.4 0 .8 1.6 1.6 2.4 1.6 4z" fill="#fcd34d" stroke="none"/></g>' +
      '<rect x="-15" y="-4" width="5" height="4" rx="1" fill="#9a8f84"/><rect x="10" y="-4" width="5" height="4" rx="1" fill="#9a8f84"/>' +
      '<path d="M-16-4.4Q0-10.4 16-4.4z" fill="#5c5f66"/>' +
      '<g data-part="dough"><path d="M-10-6.2Q0-10.6 10-6.2Q0-8.4-10-6.2z" fill="#f6e7c8" stroke-width=".35"/></g>' +
      '<g data-part="bread" style="opacity:0"><path d="M-10.6-6.2Q0-11 10.6-6.2Q0-8.2-10.6-6.2z" fill="#d9954a" stroke-width=".35"/><path d="M-5-7.6h1M-1-8.4h1M3-7.8h1" fill="none" stroke="#a0683f" stroke-width=".5"/></g>', ' stroke-width=".45"'),

    /* The sound train (read-seed-22). Rails across the stage (stage units: the rails' top at y 72), an engine and
       wagons (origin: the middle of their bottom, on the rails), all facing right. Wheels ("wheel1", "wheel2")
       turn; a wagon's "glow" lights up while its sound is said. look: { c } for the wagon's colour. */
    "read-track": g('<g fill="#a0683f" stroke-width=".35">' + Array.apply(null, Array(26)).map(function (_, i) {
      return '<rect x="' + (i * 8 - 40) + '" y="72.4" width="5" height="2.2" rx=".5"/>'; }).join("") + '</g><path d="M-40 72.4H220" fill="none" stroke="#6b6f76" stroke-width="1.2"/>'),
    "read-engine": g('<rect x="-14" y="-17" width="10" height="11" rx="1" fill="#3f6f8f"/><rect x="-12.4" y="-15.4" width="6.8" height="4.4" rx=".6" fill="#cdeaf7"/>' +
      '<path d="M-15.6-17.6h13.2" fill="none" stroke-width="1.4"/><rect x="-4" y="-12.6" width="16" height="6.6" rx="2.6" fill="#e5483f"/>' +
      '<path d="M6-12.6v-5h3.6v5" fill="#3d2c22"/><path d="M5.4-17.8h4.8" fill="none" stroke-width="1"/><circle cx="12" cy="-9.2" r="1.2" fill="#fcd34d"/>' +
      '<path d="M-15-6h29l-1.4 2.2H-15z" fill="#5c5f66"/><path d="M14-4.6l2.4 2" fill="none" stroke-width=".8"/>' +
      '<g data-part="wheel1" data-pivot="-8 -2.4"><circle cx="-8" cy="-2.4" r="2.4" fill="#3d2c22"/><path d="M-8-4.4v4M-10-2.4h4" fill="none" stroke="#9a8f84" stroke-width=".5"/></g>' +
      '<g data-part="wheel2" data-pivot="6 -2.4"><circle cx="6" cy="-2.4" r="2.4" fill="#3d2c22"/><path d="M6-4.4v4M4-2.4h4" fill="none" stroke="#9a8f84" stroke-width=".5"/></g>' +
      '<path d="M-16-6h-2" fill="none" stroke-width="1"/>', ' stroke-width=".5"'),
    "read-wagon": function (k) {
      var c = (k && k.c) || "#f59e0b";
      return g('<g data-part="glow" style="opacity:0"><rect x="-12.4" y="-16" width="24.8" height="13.4" rx="3" fill="#fde68a" stroke="none"/></g>' +
        '<rect x="-10.4" y="-14" width="20.8" height="9.4" rx="1.6" fill="' + c + '"/><path d="M-10.4-11h20.8" fill="none" stroke="#fff" stroke-width=".5" opacity=".7"/>' +
        '<path d="M-12-6h-2M12-6h2" fill="none" stroke-width="1"/>' +
        '<g data-part="wheel1" data-pivot="-5.6 -2.4"><circle cx="-5.6" cy="-2.4" r="2.4" fill="#3d2c22"/><path d="M-5.6-4.4v4M-7.6-2.4h4" fill="none" stroke="#9a8f84" stroke-width=".5"/></g>' +
        '<g data-part="wheel2" data-pivot="5.6 -2.4"><circle cx="5.6" cy="-2.4" r="2.4" fill="#3d2c22"/><path d="M5.6-4.4v4M3.6-2.4h4" fill="none" stroke="#9a8f84" stroke-width=".5"/></g>', ' stroke-width=".5"');
    },

    /* «کدو قلقله‌زن» (read-seed-23). A wolf seen from the side, facing right (origin: under its feet), about 30 long
       and 22 tall, friendly rather than fierce. Its legs (legF, legB, armF, armB) swing when it walks; its head
       ("head") turns where it meets the neck, to nod or to look. */
    "read-wolf": function () {
      var leg = function (name, x, c) { return '<g data-part="' + name + '" data-pivot="' + x + ' -9"><rect x="' + (x - 1.3) + '" y="-9.6" width="2.6" height="9.6" rx="1.2" fill="' + c + '"/></g>'; };
      return g(leg("armB", 7, "#7d858f") + leg("legB", -8, "#7d858f") +
        '<g data-part="tail" data-pivot="-11 -13"><path d="M-11-13c-5-1-7 2-9 5 3 0 6 0 8-2" fill="#9aa3ad"/><path d="M-19.4-8.4c1 .2 2 .1 2.6-.4" fill="none" stroke="#e4e7eb" stroke-width=".8"/></g>' +
        '<path d="M-12-13c0-4 6-6 13-6s11 2 11 6-3 6-12 6-12-2-12-6z" fill="#9aa3ad"/><path d="M-6-8.6c4 1 9 1 13 0" fill="none" stroke="#e4e7eb" stroke-width="1.2"/>' +
        leg("armF", 9, "#9aa3ad") + leg("legF", -6, "#9aa3ad") +
        '<g data-part="head" data-pivot="9 -15"><path d="M8-15c0-4 3-7 6-7l1.4-4 1.6 3.6 1.6-3.4 1 4.4c2 1.6 2.6 3.6 2.6 5.4l3.6 1.2c.8.4.8 1.4 0 1.8L19-11c-4 1.4-9 .6-11-4z" fill="#9aa3ad"/>' +
        '<path d="M19-12.6l5.2-1.4c.8.4.8 1.4 0 1.8L19-11z" fill="#e4e7eb" stroke-width=".35"/><circle cx="25.2" cy="-13.2" r=".9" fill="#3d2c22"/>' + eyes(17, -17.4, .55) +
        '<path d="M15.4-19.4l-.8-3 1.6 2" fill="#d9dde2" stroke="none"/><circle cx="17" cy="-14" r="1" fill="#f28b82" opacity=".5" stroke="none"/>' +
        '<path d="M20.4-11.2q1.6.8 3 0" fill="none" stroke-width=".35"/></g>', ' stroke-width=".45"');
    },
    /* A big pumpkin, origin in its middle (so it can roll), 11 around. Its lid ("lid", the top with the stem) opens
       on a hinge at its left. */
    "read-pumpkin": g('<ellipse cx="-5" cy="0" rx="7" ry="10" fill="#ef8a2c"/><ellipse cx="5" cy="0" rx="7" ry="10" fill="#ef8a2c"/><ellipse rx="6.4" ry="10.6" fill="#f6a03c"/>' +
      '<path d="M-3.4-6c-1.4 3-1.4 8 0 11" fill="none" stroke="#fff" stroke-width="1" opacity=".45"/>' +
      '<g data-part="lid" data-pivot="-6 -7.4"><path d="M-6-7.4c3-2.6 9-2.6 12 0-3 1-9 1-12 0z" fill="#e07a1e"/><path d="M0-9.2c-.4-2 .2-3.4 1.6-4" fill="none" stroke="#5a7a2a" stroke-width="1.2"/>' +
      '<path d="M1.6-12.6c1.8-1 3.6-.4 4.2 1-1.8.4-3.2 0-4.2-1z" fill="#5aa36a" stroke-width=".35"/></g>', ' stroke-width=".5"'),
    // A small house seen from the front with a door (origin: the middle of its bottom), 30 wide; look: { c } wall colour.
    "read-cottage": function (k) {
      var c = (k && k.c) || "#f2d4a8";
      return g('<path d="M-13 0v-18h26V0z" fill="' + c + '"/><path d="M-16-17l16-12 16 12z" fill="#b5523b"/><rect x="-4" y="-11" width="8" height="11" rx="1" fill="#8a5a36"/>' +
        '<rect x="-11" y="-14" width="5" height="5" fill="#bfe3f5"/><rect x="6" y="-14" width="5" height="5" fill="#bfe3f5"/>', ' stroke-width=".5"');
    },
    // A long country road and grass, 480 wide (stage units at their place, from y 56 down), for a journey.
    "read-road-wide": g('<path d="M-20 56h520v40H-20z" fill="#8cc66b" stroke="none"/><path d="M-20 56h520" fill="none" stroke-width=".5"/>' +
      '<path d="M-20 74c60-3 120 3 180 0s120-3 180 0 120 3 160 0v8c-40 3-100-3-160 0s-120 3-180 0-120-3-180 0z" fill="#e8d5a8" stroke="none"/>' +
      [30, 110, 170, 250, 300, 390, 440].map(function (x, i) { return '<path d="M' + x + " " + (62 + (i % 3) * 8) + 'l-1.5-3M' + x + " " + (62 + (i % 3) * 8) + 'v-3.6M' + x + " " + (62 + (i % 3) * 8) + 'l1.5-3" fill="none" stroke="#5a9a45" stroke-width=".7"/>'; }).join("")),
    // Far hills, 300 wide (stage units), to put at depth 0.3 behind a journey.
    "read-hills-wide": g('<path d="M-20 58c20-14 40-16 60-8s40-10 70-8 40 12 60 6 40-14 70-8 40 10 60 4v14H-20z" fill="#a9d68b" stroke-width=".4"/>'),
    // A round tree (origin: the bottom of its trunk), 22 tall.
    "read-tree-round": g('<path d="M-1.6 0l.4-10h2.4l.4 10z" fill="#9a6b45"/><circle cx="0" cy="-15" r="8" fill="#5fae5a"/><circle cx="-3" cy="-17" r="2.4" fill="#7dbb5a" stroke="none"/>', ' stroke-width=".5"'),

    /* «اتل متل» (read-seed-24): a cow's empty pail (origin: the middle of its bottom) and a rug to sit on (origin: its
       middle). */
    "read-pail": g('<path d="M-4.4-7.6Q0-12 4.4-7.6" fill="none" stroke-width=".6"/><path d="M-4.6-7.6h9.2l-1.2 7.6h-6.8z" fill="#c8d3dc"/><ellipse cx="0" cy="-7.6" rx="4.6" ry="1.2" fill="#8a96a3"/>', ' stroke-width=".45"'),
    "read-rug": g('<ellipse rx="58" ry="7" fill="#b5523b"/><ellipse rx="52" ry="5.4" fill="#e7c27a" stroke="none"/><ellipse rx="48" ry="4.4" fill="#9c3f33"/><path d="M-10 0l10-3 10 3-10 3z" fill="#e7c27a"/>', ' stroke-width=".5"'),

    /* Heard stories 2 (read-seed-30). A toy block (look: { c }), 8 square, origin at the middle of its bottom. */
    "read-block": function (k) {
      return g('<rect x="-4" y="-8" width="8" height="8" rx="1" fill="' + ((k && k.c) || "#e5483f") + '"/><rect x="-2.4" y="-6.4" width="4.8" height="4.8" rx=".6" fill="#fff" opacity=".35" stroke="none"/>', ' stroke-width=".45"');
    },
    // A straw nest (origin: the middle of its bottom), 16 wide, and an egg in it (origin: its bottom) with a crack ("crack", hidden).
    "read-nest": g('<path d="M-8-4.4c2 5 14 5 16 0z" fill="#c98a4b"/><path d="M-7.4-3.2c4 1.4 10 1.4 14.8 0M-6.4-1.6c4 1 9 1 12.8 0" fill="none" stroke="#8a5a36" stroke-width=".4"/><path d="M-8-4.4c4-1 12-1 16 0" fill="none" stroke="#8a5a36" stroke-width=".5"/>', ' stroke-width=".45"'),
    "read-egg": g('<path d="M0-8c2.4 0 3.6 3.6 3.6 5.4S2 0 0 0-3.6-.8-3.6-2.6-2.4-8 0-8z" fill="#fbf3e2"/><g data-part="crack" style="opacity:0"><path d="M-3.2-4.2l1.6 1.2 1.2-1.6 1.4 1.4 1.2-1.2 1.2.8" fill="none" stroke-width=".45"/></g>', ' stroke-width=".45"'),
    // A bed seen from the side (origin: the middle of its bottom), 40 wide, and a laundry basket full of clothes (origin: same).
    "read-bed": g('<rect x="-20" y="-12" width="40" height="7" rx="1" fill="#c98a4b"/><path d="M-20-12v12M20-15v15" fill="none" stroke="#8a5a36" stroke-width="1.6"/>' +
      '<rect x="-18.6" y="-15" width="37" height="3.4" rx="1.4" fill="#fff"/><rect x="11" y="-17.6" width="7" height="3.4" rx="1.4" fill="#bfe3f5"/><path d="M-18-15c8-3 20-3 26 0z" fill="#7cb3e0"/>', ' stroke-width=".45"'),
    "read-laundry": g('<path d="M-8-11h16l-1.6 11H-6.4z" fill="#d9b27a"/><path d="M-7.4-7.4h14.8M-7-3.8h14" fill="none" stroke="#a0683f" stroke-width=".4"/><rect x="-9" y="-12" width="18" height="2.4" rx="1" fill="#c98a4b"/>', ' stroke-width=".45"'),
    "read-laundry-top": g('<path d="M-7-12c1-3 4-4 6-2 2-3 6-2 8 1z" fill="#e46b8a"/><path d="M-2-13c1-2 4-2 5 0z" fill="#5b9bd5"/>', ' stroke-width=".4"'),

    /* A short information text (read-seed-34). The ground seen cut open (stage units at its place): grass above and
       brown soil below, from y 50. */
    "read-soil": g('<rect width="160" height="50" fill="#cdeaf7" stroke="none"/><path d="M0 50h160v40H0z" fill="#9a6b45" stroke="none"/><path d="M0 50h160v3H0z" fill="#8cc66b"/><path d="M0 50h160" fill="none" stroke-width=".5"/>' +
      '<g fill="#7a5232" stroke="none"><circle cx="20" cy="64" r="1"/><circle cx="44" cy="78" r="1.4"/><circle cx="120" cy="70" r="1.2"/><circle cx="140" cy="84" r="1"/><circle cx="104" cy="82" r=".8"/><circle cx="30" cy="84" r="1.2"/></g>'),
    // A bean seed (origin: its middle), the soil that covers it ("read-hole-cover", stage units), its roots (drawn)
    // and the plant (origin: where it comes out of the soil, at 80, 50).
    "read-bean": g('<ellipse rx="2.6" ry="1.7" fill="#b5523b"/><path d="M-.6-1q.8 1 .2 2" fill="none" stroke="#fff" stroke-width=".35" opacity=".7"/>', ' stroke-width=".4"'),
    "read-hole-cover": g('<path d="M72 50c4-3 12-3 16 0z" fill="#7a5232"/>', ' stroke-width=".4"'),
    "read-roots": '<g fill="none" stroke="#f1e2c4" stroke-width=".9" stroke-linecap="round"><path d="M80 64c-1 4 1 8-1 12"/><path d="M80 66c-3 2-5 5-6 9"/><path d="M80 66c3 2 5 6 5 10"/></g>',
    "read-plant": g('<g data-part="stem" data-pivot="0 0"><path d="M0 0V-14" fill="none" stroke="#4f8f3c" stroke-width="1.2"/></g>' +
      '<g data-part="leaf1" data-pivot="0 -6"><path d="M0-6c-5-3-8-1-8 1 3 1 6 1 8-1z" fill="#7dbb5a"/></g><g data-part="leaf2" data-pivot="0 -9"><path d="M0-9c5-3 8-1 8 1-3 1-6 1-8-1z" fill="#7dbb5a"/></g>' +
      '<g data-part="leaf3" data-pivot="0 -13"><path d="M0-13c-5-4-9-2-9 0 3 1.4 7 1.4 9 0z" fill="#5fae5a"/></g><g data-part="leaf4" data-pivot="0 -14"><path d="M0-14c4-5 8-4 8-2-2 2-6 3-8 2z" fill="#5fae5a"/></g>', ' stroke-width=".45"'),
    // A bee hive (a straw skep) on a post (origin: the bottom of the post), with a little door.
    "read-hive": g('<path d="M-1 0v-8h2V0z" fill="#8a5a36"/><path d="M-9-8c0-10 4-15 9-15s9 5 9 15z" fill="#e7c27a"/><path d="M-8.4-12h16.8M-7.4-16h14.8M-5-20h10" fill="none" stroke="#c98a4b" stroke-width=".6"/><path d="M-2-8a2 2 0 0 1 4 0z" fill="#3d2c22"/>', ' stroke-width=".5"'),
    // A rabbit's burrow under the grass (stage units at its place): a hole at (230, 58) and a tunnel to a round room.
    "read-burrow": g('<path d="M200 56h80v34h-80z" fill="#9a6b45" stroke="none"/><path d="M225 58c0-3 10-3 10 0 2 10 8 16 18 18 6 1 10 4 10 7s-6 5-14 5-14-2-14-6c0-2 2-4 4-5-8-3-14-10-14-19z" fill="#5c3d26" stroke-width=".4"/>'),
    // A pond (stage units at its place, around 400, 70), for the fish.
    "read-pond": g('<ellipse cx="400" cy="72" rx="34" ry="10" fill="#5fb0d8"/><path d="M380 70c3-2 6 2 9 0M404 75c3-2 6 2 9 0" fill="none" stroke="#fff" stroke-width=".6"/><g fill="#4f8f3c" stroke-width=".4"><path d="M368 66c-1-6 1-10 2-12 1 2 1 6 0 12z"/><path d="M432 68c-1-6 1-10 2-12 1 2 1 6 0 12z"/></g>', ' stroke-width=".5"'),
    // A twig in a bird's beak (origin: its middle).
    "read-twig": g('<path d="M-4 0h8M1 0l2-1.6" fill="none" stroke="#8a5a36" stroke-width=".8"/>'),

    /* «خاله سوسکه» (read-seed-31). The beetle, seen from the side and facing right (origin: under her feet), about
       16 long: "dress" (a red skirt) and "shoes" are hidden until she dresses; her legs (legF, legB) swing when she
       walks. */
    "read-beetle": g('<g data-part="legB" data-pivot="-2 -4"><path d="M-2-4l-1.6 4M3-4l1 4" fill="none" stroke-width=".7"/></g>' +
      '<path d="M-7-4c0-5 3-8 7-8s7 3 7 8z" fill="#5b3a29"/><path d="M0-12v8" fill="none" stroke-width=".45"/><path d="M-3-10.6c1.4-.8 3-1 4-.8" fill="none" stroke="#fff" stroke-width=".6" opacity=".4"/>' +
      '<g data-part="dress" style="opacity:0"><path d="M-7.4-6.4c3-1.6 11-1.6 14.4 0l1 3.4H-8.4z" fill="#e5483f"/><g fill="#fff" stroke="none"><circle cx="-4" cy="-4.4" r=".6"/><circle cx="0" cy="-4.8" r=".6"/><circle cx="4" cy="-4.4" r=".6"/></g></g>' +
      '<g data-part="legF" data-pivot="0 -4"><path d="M0-4l1.2 4M-5-4l-1.2 4" fill="none" stroke-width=".7"/></g>' +
      '<g data-part="shoes" style="opacity:0"><g fill="#e5483f"><ellipse cx="1.6" cy="-.4" rx="1.2" ry=".7"/><ellipse cx="-6" cy="-.4" rx="1.2" ry=".7"/></g></g>' +
      '<circle cx="8.6" cy="-6.6" r="3.2" fill="#6b4a33"/><path d="M8.6-9.6c0-2 1-3 2.4-3.4M10-9.2c1-1.6 2.4-2 3.6-1.8" fill="none" stroke-width=".45"/>' +
      '<circle cx="9.8" cy="-7.2" r="1.1" fill="#fff" stroke-width=".3"/>' + eyes(10.1, -7.1, .45) + '<path d="M9.4-5q.8.5 1.6 0" fill="none" stroke="#fff" stroke-width=".35"/>', ' stroke-width=".45"'),
    // Mr Mouse, seen from the side and facing right (origin: under his feet), about 16 long; legs legF, legB swing.
    "read-mouse": g('<g data-part="legB" data-pivot="-3 -3"><path d="M-3-3.4v3.4" fill="none" stroke-width=".9"/></g>' +
      '<path d="M-7-4c-4 0-6 2-9 1" fill="none" stroke="#e8737e" stroke-width=".6"/><path d="M-7-4c0-4 3-7 8-7 4 0 7 3 8 7z" fill="#c9c3bd"/>' +
      '<g data-part="legF" data-pivot="4 -3"><path d="M4-3.4v3.4" fill="none" stroke-width=".9"/></g>' +
      '<circle cx="6" cy="-10.4" r="2.6" fill="#c9c3bd"/><circle cx="6" cy="-10.4" r="1.4" fill="#f7c0c8" stroke="none"/>' +
      '<path d="M6-7.6c2-1 4-.8 5.6 1.6-1.8.8-3.8.8-5.6-1.6z" fill="#c9c3bd"/><circle cx="11.6" cy="-6.2" r=".6" fill="#e8737e" stroke="none"/>' + eyes(8.2, -7.6, .45) +
      '<path d="M3.6-11.6h5.6l-.6-2.6h-4.4z" fill="#3f6f8f" stroke-width=".35"/><path d="M3-11.6h6.8" fill="none" stroke-width=".5"/>', ' stroke-width=".45"'),
    // A garden pool (حوض), seen a little from above (stage units at its place, around 64, 74).
    "read-pool": g('<path d="M30 66h68l6 16H24z" fill="#5b9bd5"/><path d="M28 66h72" fill="none" stroke="#e7dccb" stroke-width="2.4"/><path d="M24 82h80" fill="none" stroke="#e7dccb" stroke-width="2.4"/>' +
      '<path d="M40 72c3-2 6 2 9 0M70 76c3-2 6 2 9 0" fill="none" stroke="#fff" stroke-width=".6"/>', ' stroke-width=".5"'),
    // A ladder (origin: its bottom), 22 tall.
    "read-ladder": g('<path d="M-3.4 0l1.4-22M3.4 0L2-22" fill="none" stroke="#a0683f" stroke-width="1"/><path d="M-3-4h6M-2.6-9h5.4M-2.4-14h4.8M-2.1-19h4.2" fill="none" stroke="#c98a4b" stroke-width=".8"/>')
  });
  /* ---------- Sprout listening and sound lessons (read-sprout-7 … 20) ---------- */
  Object.assign(B.RIG, {
    /* One sound of a spoken word as a coloured block (look: { c }), 14 wide and 12 tall, origin in its middle. Words
       are rows of blocks, the first sound on the right. */
    "read-sblock": function (k) {
      return g('<rect x="-7" y="-6" width="14" height="12" rx="3" fill="' + ((k && k.c) || "#5b9bd5") + '"/><path d="M-4.4-3.4h5" fill="none" stroke="#fff" stroke-width=".9" opacity=".6"/>', ' stroke-width=".5"');
    },
    // A garden wall of bricks between two yards (stage units at its place: x 90 to 100, from y 30 down).
    "read-wall": g('<rect x="90" y="30" width="10" height="56" fill="#c9774f"/><path d="M90 37h10M90 44h10M90 51h10M90 58h10M90 65h10M90 72h10M90 79h10M95 30v7M95 44v7M95 58v7M95 72v7M92.5 37v7M97.5 51v7M92.5 65v7M97.5 79v7" fill="none" stroke="#a65a3a" stroke-width=".4"/>' +
      '<rect x="89" y="28" width="12" height="3" rx="1" fill="#b5523b"/>', ' stroke-width=".5"'),
    /* A glass jar (origin: the middle of its bottom), 16 wide and 22 tall; the water inside ("water") grows up from
       the bottom (sy), so stones dropped in can raise it. */
    "read-jar": g('<g data-part="water" data-pivot="0 0"><path d="M-6.4 0h12.8v-18h-12.8z" fill="#5b9bd5" stroke="none" opacity=".85"/></g>' +
      '<path d="M-4-22h8v3c3 1 5 3 5 6V0H-9v-13c0-3 2-5 5-6z" fill="#d6ecf7" fill-opacity=".35"/><path d="M-4.6-22h9.2" fill="none" stroke-width=".9"/>' +
      '<path d="M-6.6-12c-.4 3-.4 7 0 10" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>', ' stroke-width=".5"'),
    // A small stone (origin: its middle).
    "read-pebble": g('<ellipse rx="2" ry="1.5" fill="#9a8f84"/><path d="M-1-.6q.6-.4 1.2-.2" fill="none" stroke="#fff" stroke-width=".3" opacity=".7"/>', ' stroke-width=".35"'),
    /* A crow seen from the side, facing right (origin: under its feet), about 16 long; its head ("head") dips to
       drink or to pick up a stone, turning where it meets the body. */
    "read-crow": g('<path d="M-1 0l-1-4M2 0l1-4" fill="none" stroke="#6b6f76" stroke-width=".6"/>' +
      '<path d="M-6-8l-6 2 1.6 1.4L-5-5z" fill="#2d2d33"/><ellipse cx="0" cy="-7" rx="6.4" ry="4.2" fill="#2d2d33"/><path d="M-4-8c3-2.4 6-2 8 0" fill="none" stroke="#5c5f66" stroke-width=".5"/>' +
      '<g data-part="head" data-pivot="4 -9"><circle cx="6" cy="-11" r="3.2" fill="#2d2d33"/><path d="M8.6-12l4.4 1.2-4.2 1.2z" fill="#6b6f76"/><circle cx="6.9" cy="-12" r=".8" fill="#fff" stroke="none"/><circle cx="7.1" cy="-12" r=".4" fill="#3d2c22" stroke="none"/></g>', ' stroke-width=".45"'),
    // An ear of wheat on its stalk (origin: the bottom of the stalk), 20 tall.
    "read-wheat": g('<path d="M0 0V-14" fill="none" stroke="#c9a14a" stroke-width=".8"/><path d="M0-6c-2-1-3-3-3-5" fill="none" stroke="#c9a14a" stroke-width=".6"/>' +
      '<g fill="#e7c27a">' + [-14, -16, -18].map(function (y) { return '<ellipse cx="-1.2" cy="' + y + '" rx="1" ry="1.6"/><ellipse cx="1.2" cy="' + y + '" rx="1" ry="1.6"/>'; }).join("") + '<ellipse cx="0" cy="-19.6" rx="1" ry="1.6"/></g>', ' stroke-width=".3"'),
    /* A hand mill (two round stones; origin: the middle of its bottom), 26 wide: the top stone ("top") turns, and the
       flour that comes out ("flour") grows. */
    "read-quern": g('<g data-part="flour" data-pivot="16 0"><path d="M9 0c2-5 12-5 14 0z" fill="#fffaf0"/></g><ellipse cx="0" cy="-3" rx="13" ry="3.4" fill="#9a8f84"/><path d="M-13-3v-3h26v3" fill="#9a8f84"/>' +
      '<g data-part="top" data-pivot="0 -9"><ellipse cx="0" cy="-9" rx="11" ry="3" fill="#b8aea3"/><path d="M-11-9v-2.4h22V-9" fill="#b8aea3"/><ellipse cx="0" cy="-11.4" rx="11" ry="3" fill="#cfc6bc"/><circle cx="0" cy="-11.4" r="1.4" fill="#6b6f76"/>' +
      '<path d="M6-11.6v-6" fill="none" stroke="#8a5a36" stroke-width="1.4"/></g>', ' stroke-width=".5"'),
    /* A wide bowl (origin: the middle of its bottom), 28 wide, with flour in it ("flour") that becomes dough ("dough",
       hidden). */
    "read-bowl": g('<g data-part="flour"><path d="M-10-8c3-4 17-4 20 0z" fill="#fffaf0"/></g><g data-part="dough" style="opacity:0"><path d="M-9-8c1-6 17-6 18 0z" fill="#f6e7c8"/></g>' +
      '<path d="M-14-8h28c-1 6-6 8-14 8s-13-2-14-8z" fill="#5b9bd5"/><path d="M-10-5h20" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>', ' stroke-width=".5"'),
    // A few seeds on the grass (stage units at their place, around 76, 84).
    "read-seeds": '<g fill="#a0683f">' + [[68, 84], [72, 86], [77, 83.6], [81, 85.4], [86, 84.4], [74, 82.6]].map(function (p) { return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx=".9" ry=".55"/>'; }).join("") + "</g>"
  });
  /* ---------- the alphabet table (read-sapling-36) ---------- */
  var ALEF = "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی".split(" ");
  Object.assign(B.RIG, {
    /* The 32 letters in a table, 8 to a row, read from the right (stage units at their place). Each letter is a
       piece "l1" … "l32" (hidden until a track shows it), on a card. */
    "read-alphabet": function () {
      return g('<rect x="10" y="10" width="140" height="70" rx="4" fill="#fffaf0"/>' + ALEF.map(function (c, i) {
        var x = 136 - (i % 8) * 16, y = 22 + Math.floor(i / 8) * 16;
        return '<g data-part="l' + (i + 1) + '" data-pivot="' + x + " " + y + '" style="opacity:0"><rect x="' + (x - 7) + '" y="' + (y - 7) + '" width="14" height="14" rx="2.5" fill="#fde68a" stroke-width=".4"/>' +
          '<text x="' + x + '" y="' + (y + 3.6) + '" font-size="10"' + TXT + ">" + c + "</text></g>";
      }).join(""), ' stroke-width=".5"');
    }
  });
  /* ---------- Sapling stories (read-sapling-46, 48) ---------- */
  Object.assign(B.RIG, {
    // A cap (origin: where it sits on a head, the middle of its brim), 9 wide.
    "read-hat": g('<path d="M-4.4 0c0-4 1.8-5.6 4.4-5.6S4.4-4 4.4 0z" fill="#e5483f"/><path d="M2 0h5.4c.6 0 .6.9 0 .9H-4.4V0z" fill="#c2410c"/><circle cx="0" cy="-5.6" r=".7" fill="#fcd34d"/>', ' stroke-width=".4"'),
    // A hunter's net (origin: the middle of its bottom), 34 wide and 22 tall, thrown over something.
    "read-net": function () {
      var lines = "";
      for (var i = -16; i <= 16; i += 4) lines += '<path d="M' + i + ' 0Q' + (i * 0.8) + ' -11 ' + (i * 0.6) + ' -22" />';
      for (var j = -4; j >= -20; j -= 4) lines += '<path d="M' + (-16 + (-j) * 0.18) + " " + j + 'H' + (16 - (-j) * 0.18) + '" />';
      return '<g fill="none" stroke="#8a5a36" stroke-width=".55">' + lines + "</g>";
    },
    // A piece of the net, bitten open (origin: its middle).
    "read-net-hole": '<ellipse rx="5" ry="4" fill="#cdeaf7" stroke="#8a5a36" stroke-width=".4" stroke-dasharray="1 1"/>'
  });
  /* ---------- Sapling poem and fable (read-sapling-78, 79) ---------- */
  Object.assign(B.RIG, {
    // A night sky over dark hills, with no moon (stage units at their place), for a moon that rises.
    "read-night-sky": '<rect width="160" height="90" fill="#26365f"/><g fill="#fff3b0">' + [[40, 10], [62, 22], [90, 8], [112, 26], [132, 12], [150, 30], [28, 30], [76, 34]].map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".7"/>'; }).join("") + '</g><path d="M0 58c24-10 46-10 66-4s44 0 62-6 26-2 32 2v40H0z" fill="#3c5a52" stroke="#1d2a40" stroke-width=".5"/><path d="M0 64c40-4 90-4 160 0v26H0z" fill="#33503f"/>',
    // Moonlight on the valley (stage units at its place): a pale glow over the hills, to fade in.
    "read-moonlight": '<ellipse cx="80" cy="66" rx="70" ry="14" fill="#fff8d6" opacity=".35"/><ellipse cx="80" cy="64" rx="40" ry="8" fill="#fff8d6" opacity=".35"/>',
    // A low bed seen from the side for a sleeping child (origin: the middle of its bottom), 44 wide.
    "read-bed-low": g('<rect x="-22" y="-8" width="44" height="6" rx="1.4" fill="#c98a4b"/><path d="M-22-8v8M22-11v11" fill="none" stroke="#8a5a36" stroke-width="1.6"/><rect x="-20.4" y="-11" width="41" height="3.4" rx="1.4" fill="#fff"/>' +
      '<rect x="13" y="-13.4" width="7" height="3" rx="1.4" fill="#bfe3f5"/>', ' stroke-width=".45"'),
    "read-blanket": g('<path d="M-18-10c4-3 26-3 30 0v4h-30z" fill="#7cb3e0"/><path d="M-12-9.6l3 3M-4-10l3 3M4-10l3 3" fill="none" stroke="#fff" stroke-width=".5" opacity=".7"/>', ' stroke-width=".45"'),
    // A stick held by two birds (origin: its middle), 30 long.
    "read-stick": g('<path d="M-15 0H15" fill="none" stroke="#8a5a36" stroke-width="1.4"/><path d="M-15 0H15" fill="none" stroke="#c98a4b" stroke-width=".6"/>'),
    // A pond seen a little from above (stage units at their place, around 40, 80).
    "read-pond-small": g('<ellipse cx="40" cy="80" rx="26" ry="7" fill="#5fb0d8"/><path d="M28 79c2-1.4 4 1.4 6 0M46 82c2-1.4 4 1.4 6 0" fill="none" stroke="#fff" stroke-width=".6"/>', ' stroke-width=".5"')
  });
})();
