/* باغچه — drawings for the feelings lessons' animated scenes (js/lessons/feel.js, step type `scene`, js/scene.js).
   Same rules as js/art/rig.js: a 160 × 90 stage, origin (0, 0) where a drawing stands (the middle of its feet),
   moving pieces are data-part with a data-pivot, and the house style (flat shapes, warm colours, outline #3d2c22).

   Every character has a face whose pieces a track can swap, by fading one in and the others out:
     brows  browN (relaxed), browW (worried, sad), browA (cross)
     eyes   eyeO (open), eyeC (closed, calm), eyeH (smiling), eyeW (wide)
     mouth  mSmile, mGrin, mFrown, mWavy (worried), mO (breathing out, surprised), mFlat, mTalk (open, talking)
     also   flush (a hot red face), tear
   A face starts relaxed: browN, eyeO, mSmile. People also have upper (everything above the hips: breathing,
   slumping), head, armL/armR (from the shoulder), handL/handR and fistL/fistR, legL/legR; animals have head,
   ears, tail, armL/armR. js/lessons/feel.js has the moods (which pieces show for happy, sad, angry …). */
var B = window.B || {};
window.B = B;

(function () {
  var INK = "#3d2c22";
  var O = ' stroke="' + INK + '" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var SKIN = "var(--skin,#f3c39b)";
  function g(inner) { return "<g" + O + ">" + inner + "</g>"; }
  // A piece: never give it a transform attribute (the scene's tracks set its transform); hidden starts unseen.
  function part(name, pivot, inner, hidden) {
    return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + (hidden ? ' style="opacity:0"' : "") + ">" + inner + "</g>";
  }

  /* A face around its own middle, 14 units wide, at (x, y), scaled k. */
  function face(x, y, k) {
    var L = ' fill="none" stroke-width=".7"', dark = ' fill="' + INK + '" stroke="none"';
    return '<g transform="translate(' + x + " " + y + ") scale(" + (k || 1) + ')">' +
      '<g fill="#f28b82" stroke="none" opacity=".45"><ellipse cx="-4.3" cy="1.6" rx="1.3" ry=".8"/><ellipse cx="4.3" cy="1.6" rx="1.3" ry=".8"/></g>' +
      part("flush", null, '<g fill="#ef5350" stroke="none" opacity=".5"><ellipse cx="-4.1" cy="1.4" rx="2.4" ry="1.6"/><ellipse cx="4.1" cy="1.4" rx="2.4" ry="1.6"/><ellipse cy="-5" rx="4.2" ry="1.3"/></g>', 1) +
      part("browN", null, '<path d="M-4.2-3.3q1.5-1 3 0M1.2-3.3q1.5-1 3 0"' + L + "/>") +
      part("browW", null, '<path d="M-4.4-2.7L-1.3-3.9M1.3-3.9L4.4-2.7"' + L + "/>", 1) +
      part("browA", null, '<path d="M-4.4-4.1L-1.3-2.7M1.3-2.7L4.4-4.1"' + L + "/>", 1) +
      part("eyeO", null, '<circle cx="-2.6" cy="-.3" r=".95"' + dark + '/><circle cx="2.6" cy="-.3" r=".95"' + dark + "/>" +
        '<circle cx="-2.3" cy="-.65" r=".3" fill="#fff" stroke="none"/><circle cx="2.9" cy="-.65" r=".3" fill="#fff" stroke="none"/>') +
      part("eyeC", null, '<path d="M-3.8-.5q1.2 1.3 2.4 0M1.4-.5q1.2 1.3 2.4 0"' + L + "/>", 1) +
      part("eyeH", null, '<path d="M-3.8.2q1.2-1.6 2.4 0M1.4.2q1.2-1.6 2.4 0"' + L + "/>", 1) +
      part("eyeW", null, '<circle cx="-2.6" cy="-.4" r="1.5" fill="#fff" stroke-width=".4"/><circle cx="2.6" cy="-.4" r="1.5" fill="#fff" stroke-width=".4"/>' +
        '<circle cx="-2.6" cy="-.3" r=".75"' + dark + '/><circle cx="2.6" cy="-.3" r=".75"' + dark + "/>", 1) +
      part("mSmile", null, '<path d="M-2 2.5q2 1.9 4 0"' + L + "/>") +
      part("mGrin", null, '<path d="M-2.4 2.3h4.8q-.3 3.1-2.4 3.1t-2.4-3.1z" fill="#b5523b" stroke-width=".5"/>', 1) +
      part("mFrown", null, '<path d="M-2 4.1q2-1.8 4 0"' + L + "/>", 1) +
      part("mWavy", null, '<path d="M-2.2 3.3q.55-.8 1.1 0t1.1 0 1.1 0 1.1 0"' + L + "/>", 1) +
      part("mO", null, '<ellipse cy="3.4" rx=".95" ry="1.15" fill="#b5523b" stroke-width=".45"/>', 1) +
      part("mFlat", null, '<path d="M-1.6 3.3h3.2"' + L + "/>", 1) +
      part("mTalk", null, '<path d="M-2 2.5q2 .4 4 0q-.5 2.7-2 2.7t-2-2.7z" fill="#b5523b" stroke-width=".5"/>', 1) +
      part("tear", null, '<path d="M-3.3.9c-.6.9-.9 1.4-.9 1.8a.9.9 0 0 0 1.8 0c0-.4-.3-.9-.9-1.8z" fill="#7cc4f0" stroke-width=".3"/>', 1) +
      "</g>";
  }

  /* A child (or, scaled up, a grown-up), seen from the front, about 41 tall. o: shirt, pants, dress, shoe, hair
     (colour), style (short, bangs, bunches, long, tuft, scarf), scarf (its colour), glasses. */
  function headOf(o) {
    // Women and girls (o.kind: girl, woman, grandma) wear a headscarf only when B.headscarf decides so for their
    // key (js/art/rig.js); otherwise o.style, and a grandmother's hair is grey, in a bun.
    var scarfed = o.kind && B.headscarf && B.headscarf(o.key, o.kind);
    var hair = o.kind === "grandma" ? "#d9d4cc" : o.hair || "#4a2f22", sc = o.scarf || "#8e6bbf";
    var st = scarfed ? "scarf" : o.kind === "grandma" ? "bun" : o.style || "short";
    var back = {
      bunches: '<circle cx="-8.4" cy="-34" r="3" fill="' + hair + '"/><circle cx="8.4" cy="-34" r="3" fill="' + hair + '"/>' +
        '<circle cx="-6.4" cy="-35.6" r="1" fill="#f28baa"/><circle cx="6.4" cy="-35.6" r="1" fill="#f28baa"/>',
      long: '<path d="M-8-33c0-6 3.6-9.4 8-9.4s8 3.4 8 9.4v9c0 1-1 1.6-2 1.6H-6c-1 0-2-.6-2-1.6z" fill="' + hair + '"/>',
      bun: '<circle cy="-41" r="3.2" fill="' + hair + '"/>',
      scarf: '<path d="M-9.2-31.4c0-7 4-10.8 9.2-10.8s9.2 3.8 9.2 10.8v5c0 2.4-1.6 4.4-3.6 5.4H-5.6c-2-1-3.6-3-3.6-5.4z" fill="' + sc + '"/>'
    }[st] || "";
    var bangs = '<path d="M-7.4-31.6c-.6-5.8 3-9.6 7.4-9.6s8 3.8 7.4 9.6c-.8-1.4-1.6-3-2.2-4.4-1.6 1.2-3.8 1.4-6 .2-1.8 1.4-3.8 2.8-6.6 4.2z" fill="' + hair + '"/>';
    var front = {
      short: '<path d="M-7.3-32.4c-.5-5.2 2.9-8.8 7.3-8.8s7.8 3.6 7.3 8.8c-1.4-2.4-3.6-3.6-6.4-3.4-2.6.2-4.2-.6-5.4-1.6-.8 1.6-1.8 3.4-2.8 5z" fill="' + hair + '"/>',
      bangs: bangs, bunches: bangs, long: bangs,
      bun: '<path d="M-7.4-32c-.4-5.4 3-8.8 7.4-8.8s7.8 3.4 7.4 8.8c-1.6-2.6-3.8-4.4-6.6-4.6L0-35.4l-.8-1.2c-2.8.2-5 2-6.6 4.6z" fill="' + hair + '"/>',
      tuft: '<path d="M-1.4-38.6c.2-1.8 1.8-2.8 3.2-2-1.2.2-1.8 1-1.8 2" fill="' + hair + '"/>',
      scarf: '<path d="M-7.8-33c.4-5 3.4-7.8 7.8-7.8s7.4 2.8 7.8 7.8c-2.2-1.8-4.8-2.6-7.8-2.6s-5.6.8-7.8 2.6z" fill="' + sc + '"/>' +
        '<g fill="#fff" stroke="none" opacity=".7"><circle cx="-4" cy="-38" r=".6"/><circle cx="1" cy="-39.6" r=".6"/><circle cx="5" cy="-37.4" r=".6"/><circle cx="-7" cy="-27" r=".6"/><circle cx="7" cy="-27.4" r=".6"/></g>' +
        '<path d="M-1.4-24.4l1.4 1.6 1.4-1.6z" fill="' + sc + '"/>'
    }[st] || "";
    var glasses = o.glasses ? '<g fill="none" stroke-width=".4"><circle cx="-2.6" cy="-32.3" r="2"/><circle cx="2.6" cy="-32.3" r="2"/><path d="M-.6-32.4h1.2"/></g>' : "";
    return back + (st === "scarf" ? "" : '<circle cx="-7" cy="-31.4" r="1.6" fill="' + SKIN + '"/><circle cx="7" cy="-31.4" r="1.6" fill="' + SKIN + '"/>') +
      '<circle cy="-32" r="7" fill="' + SKIN + '"/>' + front + face(0, -32) + glasses;
  }
  function kid(o) {
    o = o || {};
    var shirt = o.shirt || "#5b9bd5", pants = o.pants || "#3f5f8a", shoe = o.shoe || "#7a4a2e";
    function leg(s) {
      return part(s < 0 ? "legL" : "legR", (s * 2.8) + " -11",
        '<rect x="' + (s < 0 ? -4.6 : 1) + '" y="-11.6" width="3.6" height="10.6" rx="1.6" fill="' + pants + '"/>' +
        '<ellipse cx="' + (s * 2.9) + '" cy="-.9" rx="2.7" ry="1.3" fill="' + shoe + '"/>');
    }
    function arm(s) {
      var n = s < 0 ? "L" : "R", x = s * 6.7;
      var fingers = [-1.65, -0.55, 0.55, 1.65].map(function (d) {
        return '<rect x="' + (x + d - 0.4).toFixed(2) + '" y="-12.9" width=".8" height="2.6" rx=".4" stroke-width=".3"/>';
      }).join("");
      return part("arm" + n, x + " -24",
        '<rect x="' + (x - 1.8) + '" y="-25" width="3.6" height="8.4" rx="1.8" fill="' + shirt + '"/>' +
        '<rect x="' + (x - 1.55) + '" y="-18" width="3.1" height="5" rx="1.5" fill="' + SKIN + '"/>' +
        part("hand" + n, null, '<g fill="' + SKIN + '">' + fingers + '<circle cx="' + x + '" cy="-13.4" r="1.8"/></g>') +
        part("fist" + n, x + " -13", '<circle cx="' + x + '" cy="-13" r="2.1" fill="' + SKIN + '"/>' +
          '<path d="M' + (x - 1.2) + " -13.6h2.4M" + (x - 1.2) + ' -12.4h2.4" fill="none" stroke-width=".35"/>', 1));
    }
    var torso = '<rect x="-1.6" y="-27" width="3.2" height="2.8" fill="' + SKIN + '"/>' +
      '<path d="M-6.6-24.6q6.6-2 13.2 0l1.6 13.6h-16.4z" fill="' + shirt + '"/>' +
      (o.dress ? '<path d="M-7.4-15l-2.6 ' + (o.long ? 14 : 8.6) + 'h20l-2.6-' + (o.long ? 14 : 8.6) + 'z" fill="' + o.dress + '"/>' : "");
    return g(leg(-1) + leg(1) + part("upper", "0 -11", torso + arm(-1) + arm(1) + part("head", "0 -25.5", headOf(o))));
  }

  /* An animal, seen from the front, about 32 tall: squirrel, rabbit or cat. o: kind, fur, belly, apron, flower. */
  function animal(o) {
    var fur = o.fur, belly = o.belly || "#f6e2c4", k = o.kind;
    var ears = {
      squirrel: '<path d="M-5.4-28.4l-1.4-6c1.8.2 3.6 1.8 4.2 4zM5.4-28.4l1.4-6c-1.8.2-3.6 1.8-4.2 4z" fill="' + fur + '"/>',
      rabbit: '<path d="M-4.6-28.6c-2.4-4-2.6-10.4-.6-11.4s3.4 5.4 2.6 10.6zM4.6-28.6c2.4-4 2.6-10.4.6-11.4s-3.4 5.4-2.6 10.6z" fill="' + fur + '"/>' +
        '<path d="M-3.8-30.6c-1.2-3-1.2-6.6-.4-7.4.8.8 1.4 4 1 7z M3.8-30.6c1.2-3 1.2-6.6.4-7.4-.8.8-1.4 4-1 7z" fill="#f6b6c6" stroke="none"/>',
      cat: '<path d="M-6.2-27.4l.2-6.4 4.6 3.6zM6.2-27.4l-.2-6.4-4.6 3.6z" fill="' + fur + '"/><path d="M-5.2-29.2l.1-3 2 1.6zM5.2-29.2l-.1-3-2 1.6z" fill="#f6b6c6" stroke="none"/>'
    }[k];
    var tail = {
      squirrel: '<path d="M4.4-4.4c6.6 1.4 12-3.4 11.4-10.4-.5-5.6-5.6-7.2-4.4-13.2-5.2.4-9.4 5-8.2 10.4.8 3.4 3.6 5 2.6 9-.4 1.6-1 2.8-1.4 4.2z" fill="' + fur + '"/>' +
        '<path d="M9.8-9.6c1.8-1.8 2.2-4.4 1-6.6" fill="none" stroke-width=".4"/>',
      rabbit: '<circle cx="6.2" cy="-4.6" r="2.8" fill="#fff"/>',
      cat: '<path d="M4.6-3c5 .4 8.4-3 7.4-9.6" fill="none" stroke="' + INK + '" stroke-width="2.8"/><path d="M4.6-3c5 .4 8.4-3 7.4-9.6" fill="none" stroke="' + fur + '" stroke-width="1.6"/>'
    }[k];
    var whisk = k === "cat" ? '<path d="M-3-22.4l-4.6-.9M-3-21.6l-4.6.6M3-22.4l4.6-.9M3-21.6l4.6.6" fill="none" stroke-width=".3"/>' : "";
    var arm = function (s) {
      return part(s < 0 ? "armL" : "armR", (s * 5) + " -15", '<ellipse cx="' + (s * 5.6) + '" cy="-11.4" rx="1.8" ry="3.9" fill="' + fur + '"/>');
    };
    return g(part("tail", k === "cat" ? "4.6 -3" : "5 -5", tail) +
      '<ellipse cx="-3.2" cy="-1" rx="2.8" ry="1.4" fill="' + fur + '"/><ellipse cx="3.2" cy="-1" rx="2.8" ry="1.4" fill="' + fur + '"/>' +
      part("upper", "0 -2", '<ellipse cy="-9.6" rx="6.6" ry="9" fill="' + fur + '"/><ellipse cy="-8.4" rx="4" ry="6" fill="' + belly + '" stroke="none"/>' +
      (o.apron ? '<path d="M-4.6-13h9.2l1 9c-3 1.8-8.2 1.8-11.2 0z" fill="' + o.apron + '"/><path d="M-4.4-13c1-2 7.8-2 8.8 0" fill="none" stroke-width=".4"/>' : "") +
      arm(-1) + arm(1) +
      part("head", "0 -17", part("ears", "0 -28", ears) + '<circle cy="-24" r="6.8" fill="' + fur + '"/>' +
        '<ellipse cy="-21.4" rx="3.3" ry="2.4" fill="' + belly + '" stroke="none"/>' +
        (o.flower ? '<circle cx="5.4" cy="-30" r="1.7" fill="#f28baa"/><circle cx="5.4" cy="-30" r=".6" fill="#fcd34d" stroke="none"/>' : "") +
        face(0, -25, 0.85) + '<path d="M-.8-23.6h1.6l-.8.9z" fill="' + INK + '" stroke-width=".3"/>' + whisk)));
  }

  /* A friendly dog from the side, walking to the left, about 30 tall. */
  function dog() {
    var fur = "#d9a066", dark = "#a8683a";
    var leg = function (n, x) { return part(n, x + " -10", '<rect x="' + (x - 1.7) + '" y="-11" width="3.4" height="10.6" rx="1.6" fill="' + fur + '"/><ellipse cx="' + (x - .6) + '" cy="-.6" rx="2.4" ry="1.1" fill="' + fur + '"/>'); };
    return g(leg("legB2", 10) + leg("legF2", -6) +
      part("tail", "13 -17", '<path d="M13-17c3.4-2 4.6-6 3.6-9.6" fill="none" stroke="' + INK + '" stroke-width="2.8"/><path d="M13-17c3.4-2 4.6-6 3.6-9.6" fill="none" stroke="' + fur + '" stroke-width="1.6"/>') +
      '<ellipse cx="2" cy="-15" rx="13" ry="6.8" fill="' + fur + '"/><ellipse cx="5" cy="-17" rx="4" ry="2.6" fill="' + dark + '" stroke="none" opacity=".6"/>' +
      leg("legB", 8) + leg("legF", -8) +
      part("head", "-9 -19", '<circle cx="-13" cy="-23" r="6.6" fill="' + fur + '"/><ellipse cx="-18.6" cy="-20.6" rx="4.2" ry="3.1" fill="#f3d9b1"/>' +
        '<circle cx="-22.2" cy="-21.8" r="1.3" fill="' + INK + '"/><circle cx="-13.8" cy="-25" r=".95" fill="' + INK + '" stroke="none"/><circle cx="-13.5" cy="-25.3" r=".3" fill="#fff" stroke="none"/>' +
        '<path d="M-21-19.2q-2 1.6-4 .2" fill="none" stroke-width=".5"/><path d="M-20.6-18.8q.2 2 1.4 2.2.8-.6.4-2.2z" fill="#f28baa" stroke-width=".35"/>' +
        '<path d="M-10.6-28.4c2.6 0 4 3.6 3 8-.6 2-2.6 2-3.4.4z" fill="' + dark + '"/>'));
  }

  function block(c) {
    return g('<rect x="-3.6" y="-7.2" width="7.2" height="7.2" rx=".8" fill="' + c + '"/><rect x="-2.2" y="-5.8" width="4.4" height="4.4" rx=".5" fill="#fff" stroke="none" opacity=".25"/>');
  }

  /* A room from the inside (stage units at their place): a wall with a window, the floor and a rug.
     The window's sky is a piece (day); dusk and night are pieces on top of it. */
  function room(mode) {
    var win = '<rect x="110" y="10" width="34" height="26" rx="1.5" fill="#fff"/>' +
      '<rect x="112.5" y="12.5" width="29" height="21" fill="#bfe3f5"/>' +
      part("dusk", null, '<rect x="112.5" y="12.5" width="29" height="21" fill="#f6b37a" stroke="none"/><circle cx="122" cy="30" r="4" fill="#fb923c" stroke="none"/>', mode !== "dusk") +
      part("night", null, '<rect x="112.5" y="12.5" width="29" height="21" fill="#2f3b6b" stroke="none"/><path d="M134 16.4a4 4 0 1 0 2.6 6.6 3.2 3.2 0 1 1-2.6-6.6z" fill="#fde68a" stroke-width=".3"/>' +
        '<g fill="#fff" stroke="none"><circle cx="117" cy="17" r=".5"/><circle cx="124" cy="22" r=".4"/><circle cx="119" cy="28" r=".45"/></g>', mode !== "night") +
      '<path d="M127 12.5v21M112.5 23h29" fill="none"/>';
    return g('<rect width="160" height="66" fill="' + (mode === "night" ? "#efd9b8" : "#f6e3c6") + '" stroke="none"/><rect y="0" width="160" height="4" fill="#efd3ad" stroke="none"/>' +
      '<rect y="66" width="160" height="24" fill="#e7c69c" stroke="none"/><path d="M0 66h160" fill="none"/>' +
      '<g fill="none" stroke="#c9a074" stroke-width=".4"><path d="M0 76h160M20 66l-8 24M60 66l-3 24M100 66l3 24M140 66l8 24"/></g>' + win +
      // a picture on the wall: a garden
      '<rect x="22" y="14" width="22" height="16" rx="1" fill="#c98a4b"/><rect x="24" y="16" width="18" height="12" fill="#dff1e0"/><path d="M24 25q5-4 9 0t9 0v3H24z" fill="#8bc34a" stroke-width=".3"/><circle cx="37" cy="19.6" r="1.8" fill="#fcd34d" stroke-width=".3"/>');
  }

  // Grandma, the same in the room and on the phone.
  var GRANDMA = { kind: "grandma", key: "fl-grandma", scarf: "#e7c27a", glasses: 1, shirt: "#9c6f9e", dress: "#6d4c7d", long: 1, pants: "#6d4c7d", shoe: "#5b3d2e" };

  B.RIG = B.RIG || {};
  Object.assign(B.RIG, {
    /* ---------- people ---------- */
    "fl-yas": kid({ kind: "girl", key: "fl-yas", shirt: "#f28baa", dress: "#e5483f", pants: "#7a4a2e", hair: "#3b2418", style: "bunches" }),
    "fl-arash": kid({ shirt: "#8bc34a", pants: "#3f5f8a", hair: "#2d1d14", style: "short" }),
    "fl-baby": kid({ shirt: "#fcd34d", pants: "#5b9bd5", hair: "#3b2418", style: "tuft" }),
    "fl-grandma": kid(GRANDMA),
    "fl-kian": kid({ shirt: "#f59e0b", pants: "#3f5f8a", hair: "#4a2f22", style: "short" }),
    "fl-sis": kid({ kind: "girl", key: "fl-sis", shirt: "#a78bfa", dress: "#7c5cc4", pants: "#5b9bd5", hair: "#4a2f22", style: "bunches" }),
    "fl-aydin": kid({ shirt: "#5b9bd5", pants: "#4a5568", hair: "#2d1d14", style: "short" }),
    "fl-shirin": kid({ kind: "girl", key: "fl-shirin", shirt: "#fcd34d", dress: "#f59e0b", pants: "#b5523b", hair: "#3b2418", style: "long" }),
    "fl-mina": kid({ kind: "girl", key: "fl-mina", shirt: "#8bc34a", dress: "#5a9a45", pants: "#7a4a2e", hair: "#2d1d14", style: "bunches" }),
    "fl-sam": kid({ shirt: "#e5483f", pants: "#3f5f8a", hair: "#5b3a22", style: "short" }),
    "fl-kid": kid({ shirt: "#5bb5a5", pants: "#3f5f8a", hair: "#3b2418", style: "short" }),
    "fl-mom": kid({ kind: "woman", key: "fl-mom", scarf: "#e46b8a", shirt: "#5bb5a5", dress: "#3f8f86", long: 1, pants: "#3f8f86", hair: "#3b2418", style: "long" }),
    "fl-dad": kid({ shirt: "#8a9bb0", pants: "#4a5568", hair: "#2d1d14", style: "short" }),

    /* ---------- animals ---------- */
    "fl-fandogh": animal({ kind: "squirrel", fur: "#c97a3e" }),
    "fl-mama": animal({ kind: "squirrel", fur: "#b56a34", apron: "#f6e3c6", flower: 1 }),
    "fl-rabbit": animal({ kind: "rabbit", fur: "#e8e2da", belly: "#fff" }),
    "fl-cat": animal({ kind: "cat", fur: "#f0a35e", belly: "#fbe0c0" }),
    "fl-dog": dog(),
    // Mama squirrel's arms in a hug, drawn in front of whoever she hugs (her own arms hide meanwhile). Same
    // origin and size as fl-mama.
    "fl-hug": g('<path d="M-6-15c-4 3-3 10 3 11 3 .4 6-.6 8-2" fill="none" stroke="' + INK + '" stroke-width="3.8"/><path d="M-6-15c-4 3-3 10 3 11 3 .4 6-.6 8-2" fill="none" stroke="#b56a34" stroke-width="2.6"/>' +
      '<path d="M6-15c4 3 3 10-3 11" fill="none" stroke="' + INK + '" stroke-width="3.8"/><path d="M6-15c4 3 3 10-3 11" fill="none" stroke="#b56a34" stroke-width="2.6"/>'),

    /* ---------- places (stage units at their place) ---------- */
    "fl-room": room("day"),
    "fl-room-night": room("night"),
    // Fandogh's bedroom at night: a soft blue wall, a window with the moon, a lamp's warm light.
    "fl-bedroom": g('<rect width="160" height="66" fill="#5b6aa0" stroke="none"/><rect y="66" width="160" height="24" fill="#7a6a8e" stroke="none"/><path d="M0 66h160" fill="none"/>' +
      '<rect x="18" y="10" width="30" height="24" rx="1.5" fill="#e8e2da"/><rect x="20.5" y="12.5" width="25" height="19" fill="#1f2a55"/>' +
      '<path d="M38 15a4 4 0 1 0 2.6 6.6 3.2 3.2 0 1 1-2.6-6.6z" fill="#fde68a" stroke-width=".3"/><g fill="#fff" stroke="none"><circle cx="25" cy="16" r=".5"/><circle cx="30" cy="26" r=".4"/><circle cx="43" cy="28" r=".45"/></g>' +
      '<path d="M33 12.5v19M20.5 22h25" fill="none"/>' +
      '<circle cx="150" cy="40" r="16" fill="#fde68a" stroke="none" opacity=".22"/><rect x="146" y="50" width="8" height="16" rx="1" fill="#c98a4b"/><path d="M144 50l3-10h6l3 10z" fill="#fcd34d"/>'),
    // The bed from the front: headboard, mattress; the blanket is its own drawing (fl-blanket), drawn in front.
    "fl-bed": g('<rect x="-26" y="-30" width="52" height="30" rx="3" fill="#c98a4b"/><rect x="-24" y="-14" width="48" height="8" rx="2" fill="#fff"/>' +
      '<ellipse cx="0" cy="-15" rx="9" ry="3.4" fill="#fff"/><rect x="-26" y="-6" width="52" height="6" fill="#a0683f"/>'),
    "fl-blanket": g('<path d="M-25-12q25-4 50 0v8h-50z" fill="#8ec5e8"/><g fill="#fff" stroke="none" opacity=".6"><circle cx="-14" cy="-8" r="1"/><circle cx="-2" cy="-9" r="1"/><circle cx="10" cy="-8" r="1"/><circle cx="20" cy="-9" r="1"/></g>'),
    // A courtyard: sky, a brick wall with a tree behind it, a paved floor and a small pool (حوض).
    "fl-yard": g('<rect width="160" height="90" fill="#cfe8f5" stroke="none"/>' +
      part("dusk", null, '<rect width="160" height="34" fill="#f8c08a" stroke="none"/><circle cx="120" cy="30" r="6" fill="#fb923c" stroke="none"/>', 1) +
      '<g fill="#6fae4f"><circle cx="22" cy="24" r="10"/><circle cx="34" cy="20" r="9"/><circle cx="14" cy="16" r="7"/></g><rect x="22" y="26" width="4" height="10" fill="#8a5a3a"/>' +
      '<rect y="32" width="160" height="30" fill="#d9a066" stroke="none"/><path d="M0 32h160" fill="none"/>' +
      '<g fill="none" stroke="#c08550" stroke-width=".4"><path d="M0 38h160M0 44h160M0 50h160M0 56h160"/>' +
      '<path d="M10 32v6M30 32v6M50 32v6M70 32v6M90 32v6M110 32v6M130 32v6M150 32v6M20 38v6M40 38v6M60 38v6M80 38v6M100 38v6M120 38v6M140 38v6M10 44v6M30 44v6M50 44v6M70 44v6M90 44v6M110 44v6M130 44v6M150 44v6M20 50v6M40 50v6M60 50v6M80 50v6M100 50v6M120 50v6M140 50v6M10 56v6M30 56v6M50 56v6M70 56v6M90 56v6M110 56v6M130 56v6M150 56v6"/></g>' +
      '<rect y="62" width="160" height="28" fill="#eadbc0" stroke="none"/><path d="M0 62h160" fill="none"/>' +
      '<g fill="none" stroke="#d4c09c" stroke-width=".4"><path d="M0 72h160M0 82h160M24 62l-4 28M64 62l-1 28M104 62l1 28M144 62l4 28"/></g>' +
      '<ellipse cx="142" cy="74" rx="15" ry="4.6" fill="#5b9bd5"/><ellipse cx="142" cy="74" rx="12.4" ry="3.4" fill="#8fd0ea" stroke="none"/>'),
    // A park: sky, hills, grass and a path.
    "fl-park": g('<rect width="160" height="90" fill="#cfe8f5" stroke="none"/>' +
      '<path d="M0 50q30-14 60-2t60-6 40 2v16H0z" fill="#9ccc65" stroke="none"/><rect y="58" width="160" height="32" fill="#b5dc7f" stroke="none"/><path d="M0 58h160" fill="none" stroke="#8bb85a"/>' +
      '<g fill="#6fae4f"><circle cx="16" cy="40" r="9"/><circle cx="26" cy="36" r="8"/><circle cx="146" cy="38" r="9"/></g><rect x="19" y="44" width="4" height="14" fill="#8a5a3a"/><rect x="144" y="44" width="4" height="14" fill="#8a5a3a"/>'),
    // Warm evening light over the whole stage.
    "fl-evening": '<rect width="160" height="90" fill="#f59e0b" opacity=".16"/>',
    // A sofreh (cloth for a meal on the floor), with bowls and a plate (origin: the middle of its front edge).
    "fl-sofreh": g('<path d="M-56 0l10-18h92l10 18z" fill="#fff6e6"/><path d="M-52.4-2l8.4-14h88l8.4 14z" fill="none" stroke="#e5483f" stroke-width=".7" stroke-dasharray="2 1.4"/>' +
      '<ellipse cx="-24" cy="-9" rx="6" ry="2.4" fill="#fff"/><ellipse cx="-24" cy="-9.4" rx="4.4" ry="1.4" fill="#f59e0b" stroke="none"/>' +
      '<ellipse cx="24" cy="-9" rx="6" ry="2.4" fill="#fff"/><ellipse cx="24" cy="-9.4" rx="4.4" ry="1.4" fill="#8bc34a" stroke="none"/>' +
      '<ellipse cx="0" cy="-6" rx="9" ry="3" fill="#fff"/><ellipse cx="0" cy="-6.4" rx="6.6" ry="1.8" fill="#e7c27a" stroke="none"/>'),

    /* ---------- things ---------- */
    "fl-bag": g('<path d="M-3.4-15c0-3.4 6.8-3.4 6.8 0" fill="none" stroke-width="1"/><rect x="-6" y="-15.6" width="12" height="15.6" rx="3" fill="#e5483f"/>' +
      '<path d="M-6-9.4h12" fill="none"/><rect x="-3.6" y="-7" width="7.2" height="5" rx="1.4" fill="#f87171"/>'),
    // A balloon on its string (origin: the end of the string, held in a hand).
    "fl-balloon": g('<path d="M0 0c-1.2-3 1.2-6 0-9s1.2-6 0-9" fill="none" stroke-width=".4"/><ellipse cy="-24" rx="5" ry="6" fill="#ef5350"/>' +
      '<path d="M-.9-17.6h1.8l-.9-1.4z" fill="#ef5350"/><ellipse cx="-1.8" cy="-26" rx="1.1" ry="1.8" fill="#fff" stroke="none" opacity=".5"/>'),
    "fl-block-r": block("#e5483f"), "fl-block-b": block("#5b9bd5"), "fl-block-y": block("#fcd34d"), "fl-block-g": block("#8bc34a"), "fl-block-o": block("#f59e0b"),
    /* The anger thermometer (origin: the bottom of its bulb): green at the bottom, yellow, red at the top. Its level
       is a piece that scales up and down from the bulb (sy 0.15 is low, 1 is the top). */
    "fl-thermo": g('<rect x="-4" y="-52" width="8" height="48" rx="4" fill="#fff"/>' +
      '<rect x="5.2" y="-20" width="2.4" height="13" rx="1" fill="#8bc34a" stroke="none"/><rect x="5.2" y="-34" width="2.4" height="13" rx="1" fill="#fcd34d" stroke="none"/><rect x="5.2" y="-48" width="2.4" height="13" rx="1" fill="#ef5350" stroke="none"/>' +
      part("level", "0 -6", '<rect x="-2" y="-48" width="4" height="44" rx="2" fill="#ef5350" stroke="none"/>') +
      '<circle cy="-5.6" r="5.6" fill="#ef5350"/><rect x="-4" y="-52" width="8" height="45" rx="4" fill="none"/>' +
      '<path d="M-4-20h2M-4-34h2M-4-48h2" fill="none" stroke-width=".4"/><ellipse cx="-1.8" cy="-7" rx="1.2" ry="1.8" fill="#fff" stroke="none" opacity=".5"/>'),
    "fl-book": g('<path d="M0-1C-3-3-7-3-10-2v-9c3-1 7-1 10 1z" fill="#fff"/><path d="M0-1c3-2 7-2 10-1v-9c-3-1-7-1-10 1z" fill="#fff"/>' +
      '<path d="M-8-8.6h6M-8-6.6h6M-8-4.6h5M2-8.6h6M2-6.6h6M2-4.6h5" fill="none" stroke-width=".3" opacity=".6"/>' +
      part("page", "0 -5", '<path d="M0-1c3-2 7-2 10-1v-9c-3-1-7-1-10 1z" fill="#fffaf0"/>') +
      '<path d="M-10.6-1.6v-9.8M10.6-1.6v-9.8" fill="none" stroke="#e5483f" stroke-width="1.2"/>'),
    // A flower in a hand (origin: the bottom of its stem) and a candle (origin: its bottom) whose flame bends.
    "fl-flower": g('<path d="M0 0v-8" fill="none" stroke="#5a9a45" stroke-width=".9"/><path d="M0-3.6c-2-.4-3-2-3-3.4 1.6 0 2.6 1 3 2.4z" fill="#5a9a45" stroke-width=".4"/>' +
      '<path d="M-2.6-11.6c0 2.2 1.2 3.6 2.6 3.6s2.6-1.4 2.6-3.6l-1.3 1.2-1.3-1.6-1.3 1.6z" fill="#f28baa"/>'),
    "fl-candle": g('<rect x="-1.8" y="-9" width="3.6" height="9" rx=".6" fill="#fff6d8"/><path d="M0-9v-1.2" fill="none" stroke-width=".4"/>' +
      part("flame", "0 -10", '<path d="M0-10c-1.4-1.2-1.8-2.6-1-4.2.4 1 1 1.2 1 1.2 0-1.4.4-2.6 1.4-3.4-.2 1.6 1.4 2.6 1 4.4-.2 1-1 1.6-2.4 2z" fill="#fbbf24" stroke="#f59e0b" stroke-width=".4"/>')),
    // A worry cloud (origin: its middle): soft grey, with a tangle of thoughts inside that can turn.
    "fl-cloud": g('<path d="M-14 6c-4 0-6-3-5-6s4-4 6-3c0-4 4-7 8-6 2-3 7-4 10-1 3-1 7 1 7 5 3 0 5 3 4 6s-1 5-4 5z" fill="#d5dae6"/>' +
      part("scribble", "0 -1", '<path d="M-8 1c2-4 6-4 6 0s-5 4-4 0 7-6 9-2-3 5-2 1 5-4 7-1" fill="none" stroke="#7c8aa5" stroke-width=".7"/>')),
    // A thought bubble (origin: the end of its little tail, bottom left); things inside it go `under` it, around (16, -18).
    "fl-think": g('<circle r="1.2" fill="#fff"/><circle cx="3" cy="-3.6" r="2" fill="#fff"/><ellipse cx="16" cy="-18" rx="16" ry="12" fill="#fff"/>'),
    "fl-heart": g('<path d="M0 4C-4.4-.4-6.4-2.4-6.4-4.8a3.2 3.2 0 0 1 6.4-1 3.2 3.2 0 0 1 6.4 1c0 2.4-2 4.4-6.4 8.8z" fill="#fbbf24"/>'),
    // A soft glow, to show where a feeling is felt in the body.
    "fl-glow": '<circle r="4.4" fill="#fde68a" opacity=".85"/><circle r="2.2" fill="#fff7cc"/>',
    // A swirl on the tummy (origin: its middle; it turns around it).
    "fl-swirl": '<path d="M0 0c.6-.4 1.2.2.8.8-.6.8-2 .4-2-.6 0-1.6 2-2.4 3.2-1.4 1.6 1.2 1 3.6-1 4-2.4.6-4.4-1.4-4-3.6" fill="none" stroke="#8b6fc7" stroke-width=".8" stroke-linecap="round"/>',
    // Warm wavy lines rising from a hot head (origin: their bottom middle).
    "fl-heat": '<path d="M-4 0q-1-1.5 0-3t0-3M0-1q-1-1.5 0-3t0-3M4 0q-1-1.5 0-3t0-3" fill="none" stroke="#ef5350" stroke-width=".8" stroke-linecap="round"/>',
    // Lines of a loud voice (origin: next to the mouth, they point right).
    "fl-loud": '<path d="M0-3l3.2-1.8M0 0h3.6M0 3l3.2 1.8" fill="none" stroke="' + INK + '" stroke-width=".8" stroke-linecap="round"/>',
    // Wind: soft curved lines (origin: their left end).
    "fl-wind": '<path d="M0 0q6-3 12 0t10-1M4 5q6-3 12 0t8-1M2-5q5-2 10 0" fill="none" stroke="#9fb8c8" stroke-width=".8" stroke-linecap="round"/>',
    // A slow breath of air (origin: its left end).
    "fl-puff": '<path d="M0 0q2-1.6 4 0t4 0M1.4 2.6q2-1.2 4 0" fill="none" stroke="#6fb3dd" stroke-width=".8" stroke-linecap="round"/>',
    /* The breathing square (origin: its middle; 30 wide). Each side is a piece, drawn in turn: up the left side
       (breathe in), along the top (hold), down the right side (breathe out), along the bottom (wait). */
    "fl-square": '<rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#d6cbb8" stroke-width="1.2" stroke-dasharray="1.6 1.6"/>' +
      part("s1", null, '<path d="M-15 15V-15" fill="none" stroke="#5a9a45" stroke-width="2" stroke-linecap="round"/>', 1) +
      part("s2", null, '<path d="M-15-15H15" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>', 1) +
      part("s3", null, '<path d="M15-15V15" fill="none" stroke="#5b9bd5" stroke-width="2" stroke-linecap="round"/>', 1) +
      part("s4", null, '<path d="M15 15H-15" fill="none" stroke="#f28baa" stroke-width="2" stroke-linecap="round"/>', 1),
    "fl-dot": g('<circle r="2.2" fill="#fff"/><circle r="1" fill="#f59e0b" stroke="none"/>'),
    // A swing: the frame (origin: the middle of its top bar; its feet are 44 below), and the seat on its chains
    // (origin: where the chains hang from the bar), so whoever sits on it (under it) swings with it.
    "fl-swing": g('<path d="M-22 44L-17 0M22 44L17 0M-26 44L-17 0M26 44L17 0" fill="none" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M-22 44L-17 0M22 44L17 0M-26 44L-17 0M26 44L17 0" fill="none" stroke="#5b9bd5" stroke-width="1.6"/>' +
      '<rect x="-20" y="-1.8" width="40" height="3.6" rx="1.8" fill="#c98a4b"/>'),
    "fl-seat": g('<path d="M-6 0v29M6 0v29" fill="none" stroke="#8a8a8a" stroke-width=".7" stroke-dasharray="1.2 .5"/><rect x="-8" y="28.4" width="16" height="2.8" rx="1" fill="#e5483f"/>'),
    // An apple in two halves (origin: the bottom of the cut). Each half shows its cut side when it is apart.
    "fl-apple-l": g('<path d="M0-.4C-4 .9-7.2-1.2-7.2-5S-4-11 0-9.4z" fill="#e5483f"/>' +
      part("cut", null, '<path d="M0-.4C-4 .9-7.2-1.2-7.2-5S-4-11 0-9.4z" fill="#fff4dc" stroke="#e5483f" stroke-width=".8"/><ellipse cx="-2" cy="-5" rx=".6" ry=".9" fill="#5b3a22" stroke="none"/>', 1)),
    "fl-apple-r": g('<path d="M0-.4C4 .9 7.2-1.2 7.2-5S4-11 0-9.4z" fill="#e5483f"/><path d="M0-9.4c0-1.4.4-2.4 1-3" fill="none" stroke-width=".6"/><path d="M1-12c1.6-1 3.2-.6 3.6.2-1.4.8-2.8.6-3.6-.2z" fill="#5a9a45" stroke-width=".3"/>' +
      part("cut", null, '<path d="M0-.4C4 .9 7.2-1.2 7.2-5S4-11 0-9.4z" fill="#fff4dc" stroke="#e5483f" stroke-width=".8"/><ellipse cx="2" cy="-5" rx=".6" ry=".9" fill="#5b3a22" stroke="none"/>', 1)),
    /* Shirin's chalk drawing on the paving (origin: its middle): a sun, a house and a flower. smudge covers it
       when it is stepped on. */
    "fl-chalk": '<g transform="scale(1 .55)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">' +
      part("lines", null, '<circle cx="-14" cy="-6" r="3.4" stroke="#fbbf24"/><path d="M-14-12v-2M-14 0v2M-20-6h-2M-8-6h2M-18.4-10.4l-1.4-1.4M-9.6-10.4l1.4-1.4" stroke="#fbbf24"/>' +
        '<path d="M-2 8V-2h12V8zM-4-2l10-8 10 8" stroke="#6fb3dd"/><path d="M3 8V3h3v5" stroke="#6fb3dd"/>' +
        '<path d="M20 8V0" stroke="#8bc34a"/><circle cx="20" cy="-2" r="2.2" stroke="#f28baa"/>') +
      part("smudge", null, '<g fill="#d7c7aa" stroke="none" opacity=".95"><ellipse cx="2" cy="1" rx="11" ry="7"/><ellipse cx="-8" cy="4" rx="5" ry="4"/><ellipse cx="10" cy="-3" rx="6" ry="4"/></g>' +
        '<path d="M-4 4.4c1.6.6 3 .6 4.4 0M3.6 6c1.6.6 3 .6 4.4 0" stroke="#bfae8d" stroke-width="1.6"/>', 1) + "</g>",
    // A chalk stick (origin: its tip).
    "fl-chalkstick": g('<rect x="-.9" y="-6" width="1.8" height="6" rx=".6" fill="#f28baa" stroke-width=".4"/>'),
    // A phone showing Grandma, laughing on a call (origin: the phone's bottom middle). Grandma's face is a face.
    "fl-call": g('<rect x="-7" y="-26" width="14" height="26" rx="2.4" fill="#4a5568"/><rect x="-5.6" y="-23.6" width="11.2" height="19.6" rx="1" fill="#dff1f7"/>' +
      '<g transform="translate(0 2.4) scale(.62)">' + headOf(GRANDMA) + "</g>" +
      '<circle cy="-1.8" r=".8" fill="#fff" stroke-width=".3"/>'),
    // Little lines of a sudden fright, around a head (origin: the middle of the head).
    "fl-jolt": '<path d="M-9-6l-2.4-1.4M-10 0h-2.8M-9 6l-2.4 1.4M9-6l2.4-1.4M10 0h2.8M9 6l2.4 1.4" fill="none" stroke="#3d2c22" stroke-width=".7" stroke-linecap="round"/>',
    // Warm flatbread (origin: its middle); bite is a piece that shows a bite taken from its edge.
    "fl-bread": g('<ellipse rx="12" ry="5" fill="#e0a85a"/><ellipse rx="9.6" ry="3.4" fill="#eebd74" stroke="none"/>' +
      '<g fill="#c98a4b" stroke="none"><circle cx="-5" cy="-1" r=".7"/><circle cx="-1" cy="1" r=".7"/><circle cx="3" cy="-1.4" r=".7"/><circle cx="6" cy="1" r=".7"/><circle cx="-7" cy="1.6" r=".6"/><circle cx="1" cy="-2.4" r=".6"/></g>' +
      part("bite", null, '<path d="M8.6-3.6a3 3 0 0 0 1.4 5.4 3 3 0 0 0 1-1.4 3 3 0 0 0 .4-2.2z" fill="#fff" stroke="none"/><path d="M8.6-3.6a3 3 0 0 0 1.4 5.4" fill="none"/>', 1)),
    // Little lines of laughter (origin: their middle).
    "fl-haha": '<path d="M-3-2l-1.6-1.6M3-2l1.6-1.6M-3.6 1h-2M3.6 1h2" fill="none" stroke="#f59e0b" stroke-width=".8" stroke-linecap="round"/>',
    // Steam rising from warm bread (origin: its bottom middle); the lines are a piece that drifts up.
    "fl-steam": part("rise", "0 0", '<path d="M-3 0q-1.4-2 0-4t0-4M1 -1q-1.4-2 0-4t0-4M5 0q-1.4-2 0-4t0-4" fill="none" stroke="#c9b09a" stroke-width=".8" stroke-linecap="round"/>')
  });

  /* ---------- for the Seed lessons and the newer lessons for every age ---------- */
  var SAM = { shirt: "#e5483f", pants: "#3f5f8a", hair: "#5b3a22", style: "short" };
  // A phone on a video call (origin: the phone's bottom middle), showing someone's head and shoulders.
  function callOf(o) {
    return g('<rect x="-7" y="-26" width="14" height="26" rx="2.4" fill="#4a5568"/><rect x="-5.6" y="-23.6" width="11.2" height="19.6" rx="1" fill="#dff1f7"/>' +
      '<g transform="translate(0 2.4) scale(.62)">' + headOf(o) + "</g>" + '<circle cy="-1.8" r=".8" fill="#fff" stroke-width=".3"/>');
  }
  Object.assign(B.RIG, {
    /* ---------- people ---------- */
    // Shirin in socks (for putting her shoes on herself: fl-shoe goes over each sock). Same key, same look.
    "fl-shirin-sock": kid({ kind: "girl", key: "fl-shirin", shirt: "#fcd34d", dress: "#f59e0b", pants: "#b5523b", hair: "#3b2418", style: "long", shoe: "#fff" }),
    "fl-aunt": kid({ kind: "woman", key: "fl-aunt", scarf: "#5b9bd5", shirt: "#e5483f", dress: "#b5523b", long: 1, pants: "#b5523b", hair: "#4a2f22", style: "long" }),
    "fl-nika": kid({ kind: "girl", key: "fl-nika", shirt: "#e46b8a", dress: "#8e6bbf", pants: "#3f5f8a", hair: "#2d1d14", style: "long" }),
    "fl-boy2": kid({ shirt: "#a0683f", pants: "#4a5568", hair: "#3b2418", style: "short" }),
    "fl-boy3": kid({ shirt: "#8a9bb0", pants: "#3f5f8a", hair: "#2d1d14", style: "tuft" }),
    "fl-teacher": kid({ shirt: "#5a9a45", pants: "#3f3a33", hair: "#4a2f22", style: "short", glasses: 1 }),
    "fl-rabbit-mama": animal({ kind: "rabbit", fur: "#d8cfc4", belly: "#fff", apron: "#f28baa" }),
    "fl-call-sam": callOf(SAM),
    // A framed photo of Sam (origin: the bottom of the frame).
    "fl-photo": g('<rect x="-8" y="-20" width="16" height="20" rx="1" fill="#c98a4b"/><rect x="-6.4" y="-18.4" width="12.8" height="16.8" fill="#dff1e0"/>' +
      '<g transform="translate(0 4) scale(.5)">' + headOf(SAM) + "</g>"),
    /* The calm turtle, from the side, facing right (origin: the middle of her feet, about 30 long). Her head, legs and
       tail are pieces that go into her shell (move them back, they hide behind it); the shell rises as she breathes. */
    "fl-turtle": g(
      part("legB", "-6 -5", '<rect x="-8.2" y="-6" width="4.4" height="6" rx="2" fill="#8bc34a"/>') +
      part("legF", "6 -5", '<rect x="3.8" y="-6" width="4.4" height="6" rx="2" fill="#8bc34a"/>') +
      part("tail", "-11 -5", '<path d="M-11-6.4l-4.4 1.6 4.4 1.4z" fill="#8bc34a"/>') +
      part("head", "11 -7", '<path d="M10-8.6h6v4.4h-6z" fill="#8bc34a"/><circle cx="18" cy="-10" r="4.6" fill="#8bc34a"/>' + face(18.4, -10.2, 0.42)) +
      part("shell", "0 -4", '<path d="M-13-4c0-8.4 5.6-13.6 13-13.6S13-12.4 13-4z" fill="#5a9a45"/>' +
        '<path d="M-6.6-4l1.6-6.4h10l1.6 6.4M-5-10.4L0-15.6l5 5.2" fill="none" stroke="#3f7a35" stroke-width=".6"/>' +
        '<rect x="-14" y="-5.4" width="28" height="2.6" rx="1.3" fill="#d9c27a"/>')),
    /* A big open hand to count helpers on (origin: the bottom of the wrist; about 46 tall). Each finger has a
       glow piece at its tip, g1 (the thumb, on the right) to g5 (the little finger, on the left). */
    "fl-hand": g('<g fill="' + SKIN + '">' +
      '<rect x="-12.4" y="-40" width="5" height="16" rx="2.5"/><rect x="-6.6" y="-45" width="5.2" height="20" rx="2.6"/>' +
      '<rect x="-.6" y="-46" width="5.2" height="21" rx="2.6"/><rect x="5.4" y="-43" width="5" height="18" rx="2.5"/>' +
      '<path d="M9-24c3-4 6-8 9.6-9.4 2.2-.8 3.6 1.2 2.4 3.4l-6.6 10.4z"/>' +
      '<path d="M-13-27c0-3 2-4 4-4h18c3 0 5 2 5 5v8c0 8-5 13-14 13s-13-6-13-13z"/><rect x="-7.6" y="-6" width="15" height="6" fill="' + SKIN + '"/></g>' +
      '<path d="M-6-27.4v-2M0-27.6v-2M6-27v-2" fill="none" stroke-width=".4"/>' +
      [[19.6, -32], [7.9, -41], [2, -44], [-4, -43], [-9.9, -38]].map(function (p, i) {
        return part("g" + (i + 1), p[0] + " " + p[1], '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.6" fill="#fde68a" stroke="none" opacity=".9"/>', 1);
      }).join("")),
    // A shelf on the wall (origin: the middle of its board), high up.
    "fl-shelf": g('<rect x="-14" y="-1.6" width="28" height="3.2" rx=".8" fill="#c98a4b"/><path d="M-10 1.6l2 4M10 1.6l-2 4" fill="none" stroke-width=".8"/>'),
    /* A calm place, imagined (origin: its middle; 80 × 44): grandma's garden in a big soft thought cloud, with a
       tree, a pool whose water ripples (ripple), three flowers (f1–f3) and a sparrow (bird). */
    "fl-dream": g('<ellipse rx="40" ry="22" fill="#d7eefa"/>' +
      '<path d="M-40 0A40 22 0 0 0 40 0z" fill="#b5dc7f" stroke="none"/><path d="M-40 0h80" fill="none" stroke="#8bb85a" stroke-width=".4"/>' +
      '<g fill="#6fae4f"><circle cx="-20" cy="-8" r="7"/><circle cx="-13" cy="-11" r="6"/><circle cx="-26" cy="-12" r="5"/></g><rect x="-19.6" y="-4" width="3" height="6" fill="#8a5a3a"/>' +
      '<ellipse cx="12" cy="9" rx="13" ry="4" fill="#5b9bd5"/>' + part("ripple", "12 9", '<ellipse cx="12" cy="9" rx="10" ry="2.6" fill="#8fd0ea" stroke="none"/>') +
      ["-30 10 #f28baa", "-6 12 #e5483f", "30 8 #fcd34d"].map(function (s, i) {
        var p = s.split(" ");
        return part("f" + (i + 1), p[0] + " " + p[1], '<path d="M' + p[0] + " " + p[1] + 'v-6" fill="none" stroke="#5a9a45" stroke-width=".8"/><path d="M' + p[0] + " " + (p[1] - 2) + 'c-2 0-3-1.4-3-2.6 1.6 0 2.6.8 3 2z" fill="#5a9a45" stroke-width=".3"/>' +
          '<g fill="' + p[2] + '">' + [0, 72, 144, 216, 288].map(function (a) {
            var r = a * Math.PI / 180;
            return '<circle cx="' + (+p[0] + 1.7 * Math.sin(r)).toFixed(2) + '" cy="' + (p[1] - 8 - 1.7 * Math.cos(r)).toFixed(2) + '" r="1.5"/>';
          }).join("") + '</g><circle cx="' + p[0] + '" cy="' + (p[1] - 8) + '" r="1.1" fill="#fcd34d"/>');
      }).join("") +
      part("bird", "-14 -16", '<g transform="translate(-14 -16) scale(1.5) translate(14 16)"><ellipse cx="-14" cy="-16" rx="2.6" ry="1.8" fill="#a8683a"/><circle cx="-11.6" cy="-17.4" r="1.3" fill="#a8683a"/><path d="M-10.4-17.4l1.2.4-1.2.4" fill="#f59e0b" stroke-width=".3"/><circle cx="-11.3" cy="-17.7" r=".3" fill="' + INK + '" stroke="none"/></g>') +
      '<ellipse rx="40" ry="22" fill="none" stroke-width=".8"/>'),
    // A sheet of paper on the table (origin: its bottom middle) with a picture for a friend that can be drawn (pic).
    "fl-paper": g('<rect x="-14" y="-20" width="28" height="20" rx=".8" fill="#fffdf6"/>' +
      part("pic", null, '<g fill="none" stroke-width=".8"><circle cx="-8" cy="-14" r="2.6" stroke="#fbbf24"/>' +
        '<circle cx="-2" cy="-9" r="2.2" stroke="#3d2c22"/><path d="M-2-6.8v4.6M-4.4-5h4.8M-2-2.2l-2 2M-2-2.2l2 2" stroke="#3d2c22"/>' +
        '<circle cx="6" cy="-9" r="2.2" stroke="#e5483f"/><path d="M6-6.8v4.6M3.6-5h4.8M6-2.2l-2 2M6-2.2l2 2" stroke="#e5483f"/>' +
        '<path d="M2-15.4c-1-1.4-2.6-.6-2 .8.4.8 2 1.8 2 1.8s1.6-1 2-1.8c.6-1.4-1-2.2-2-.8z" stroke="#f28baa"/></g>') +
      // a scribble over the picture, hidden until someone scribbles on it
      part("scribble", null, '<path d="M-11-16l8 3-7 3 9 2-8 4 10 1M0-15l9 4-8 2 10 3-9 2" fill="none" stroke="#3d2c22" stroke-width=".9"/>', 1)),
    "fl-pencil": g('<path d="M0 0l-1-2.6 6-6 2 2-6 6z" fill="#fcd34d"/><path d="M0 0l-1-2.6 1.6 1z" fill="' + INK + '"/>'),
    /* A wash basin from the front (origin: the floor under it), low enough for a child; the tap's water runs in a
       piece (water) that is hidden until it is turned on. */
    "fl-sink": g('<rect x="-3" y="-15" width="6" height="15" fill="#fff"/><path d="M-14-16h28l-2 6c-1 2-3 3-6 3h-12c-3 0-5-1-6-3z" fill="#fff"/>' +
      '<rect x="-15" y="-17.6" width="30" height="2.6" rx="1.2" fill="#e8f1f6"/><path d="M-1-17.6v-5h5v2" fill="none" stroke="#9aa5b1" stroke-width="1.4"/>' +
      part("water", null, '<path d="M4-20.4v3.6" fill="none" stroke="#7cc4f0" stroke-width="1.2"/>', 1)),
    // A plate (origin: its bottom middle), and a watering can (origin: its bottom middle; the spout is on the left).
    "fl-plate": g('<ellipse cy="-1.4" rx="6" ry="1.8" fill="#fff"/><ellipse cy="-1.7" rx="3.6" ry=".9" fill="#e8e2da" stroke="none"/>'),
    "fl-can": g('<path d="M-5-8l-6-5" fill="none" stroke="' + INK + '" stroke-width="1.8"/><path d="M-5-8l-6-5" fill="none" stroke="#5bb5a5" stroke-width=".9"/>' +
      '<rect x="-5" y="-10" width="10" height="10" rx="1.6" fill="#5bb5a5"/><path d="M-2-10c0-3 4-3 4 0" fill="none" stroke-width=".9"/>'),
    // One shoe, the same size as a child's shoe in kid() (origin: its middle; it goes over a sock).
    "fl-shoe": g('<ellipse rx="2.9" ry="1.5" fill="#7a4a2e"/><path d="M-1.4-.8h2.6" fill="none" stroke="#fff" stroke-width=".4"/>'),
    // A plant in a pot (origin: the bottom of the pot); the leaves are a piece that can grow.
    "fl-plant": g('<path d="M-5-7h10l-1.4 7h-7.2z" fill="#c98a4b"/>' +
      part("leaves", "0 -7", '<path d="M0-7v-8" fill="none" stroke="#5a9a45" stroke-width=".8"/><path d="M0-10c-4 0-6-3-6-5 3 0 5 2 6 5zM0-12c3.6 0 5.6-2.6 5.6-4.6-3 0-4.8 2-5.6 4.6z" fill="#8bc34a"/><circle cy="-16" r="1.8" fill="#f28baa"/>')),
    // A low shoe rack (origin: its bottom middle).
    "fl-rack": g('<rect x="-12" y="-7" width="24" height="7" rx=".8" fill="#c98a4b"/><path d="M-12-3.6h24" fill="none" stroke-width=".4"/>'),
    /* A door in the room's wall (origin: its bottom middle; 22 × 42). The door itself (leaf) opens on its left
       hinge, showing the hall behind it. */
    "fl-door": g('<rect x="-11" y="-42" width="22" height="42" fill="#7a5a44"/>' +
      part("leaf", "-11 0", '<rect x="-11" y="-42" width="22" height="42" fill="#c98a4b"/><rect x="-8" y="-38" width="16" height="15" rx=".8" fill="none" stroke-width=".4"/><rect x="-8" y="-19" width="16" height="15" rx=".8" fill="none" stroke-width=".4"/><circle cx="7.4" cy="-21" r="1" fill="#fcd34d"/>')),
    // A present (origin: its bottom middle); the lid is a piece that lifts off.
    "fl-gift": g('<rect x="-6" y="-10" width="12" height="10" fill="#5b9bd5"/><rect x="-1.2" y="-10" width="2.4" height="10" fill="#fcd34d" stroke="none"/>' +
      part("lid", "0 -10", '<rect x="-7" y="-13" width="14" height="3.4" fill="#4a86c0"/><rect x="-1.2" y="-13" width="2.4" height="3.4" fill="#fcd34d" stroke="none"/><path d="M0-13c-3-3-5-1-3 0zM0-13c3-3 5-1 3 0z" fill="#fcd34d"/>')),
    // A little toy car, from the side (origin: the bottom middle).
    "fl-car": g('<path d="M-7-2v-4l2-3h7l3 3h2v4z" fill="#e5483f"/><rect x="-3.6" y="-8.2" width="3" height="2.2" fill="#bfe3f5" stroke-width=".3"/><circle cx="-4" cy="-1.6" r="1.8" fill="#4a5568"/><circle cx="4.6" cy="-1.6" r="1.8" fill="#4a5568"/>'),
    // A low table (origin: the middle of the floor under it; its top is 18 up).
    "fl-table": g('<rect x="-20" y="-19" width="40" height="3" rx="1" fill="#c98a4b"/><path d="M-17-16v16M17-16v16" fill="none" stroke="' + INK + '" stroke-width="2.2"/><path d="M-17-16v16M17-16v16" fill="none" stroke="#a0683f" stroke-width="1.2"/>'),
    // Nothing: an empty group, for moving several parts together (put them under it).
    "fl-none": "<g></g>",
    /* A child's bike seen from the front (origin: where the wheel touches the ground): the wheel in front of the
       rider's legs and the handlebar in front of the hands (the rider goes under the same group, before it). */
    "fl-bike-front": g('<ellipse cy="-8" rx="2.6" ry="8" fill="#4a5568"/><ellipse cy="-8" rx="1.2" ry="6.2" fill="#9aa5b1" stroke="none"/>' +
      '<path d="M-1.6-9l-.6-6.6M1.6-9l.6-6.6" fill="none" stroke="' + INK + '" stroke-width="1.6"/><path d="M-1.6-9l-.6-6.6M1.6-9l.6-6.6" fill="none" stroke="#e5483f" stroke-width=".8"/>' +
      '<rect x="-2" y="-17.6" width="4" height="2.6" rx="1" fill="#e5483f"/><circle cy="-16.2" r=".9" fill="#fde68a" stroke-width=".3"/>' +
      '<path d="M-14-18h28" fill="none" stroke="' + INK + '" stroke-width="1.8"/><path d="M-14-18h28" fill="none" stroke="#9aa5b1" stroke-width=".9"/>' +
      '<rect x="-15.6" y="-19.2" width="3.6" height="2.4" rx="1" fill="#3d2c22"/><rect x="12" y="-19.2" width="3.6" height="2.4" rx="1" fill="#3d2c22"/>'),
    // The same bike lying on the grass after a tumble, seen from the front (origin: its middle on the ground).
    "fl-bike-down": g('<ellipse cx="-2" cy="-2.4" rx="9" ry="2.4" fill="#4a5568"/><path d="M-4-3.4h14" fill="none" stroke="' + INK + '" stroke-width="1.6"/><path d="M-4-3.4h14" fill="none" stroke="#e5483f" stroke-width=".8"/>' +
      '<path d="M10-8v10" fill="none" stroke="' + INK + '" stroke-width="1.8"/><path d="M10-8v10" fill="none" stroke="#9aa5b1" stroke-width=".9"/>'),
    // A box of crayons (origin: its bottom middle).
    "fl-crayons": g('<g stroke-width=".3"><rect x="-4.6" y="-11" width="2" height="6" fill="#e5483f"/><rect x="-2.2" y="-12" width="2" height="7" fill="#5b9bd5"/>' +
      '<rect x=".2" y="-11.4" width="2" height="6.4" fill="#fcd34d"/><rect x="2.6" y="-10.6" width="2" height="5.6" fill="#8bc34a"/></g>' +
      '<rect x="-6" y="-7" width="12" height="7" rx=".8" fill="#f59e0b"/>'),
    // Rain over the whole stage (stage units): short slanted streaks; fall is a piece that slides down.
    "fl-rain": part("fall", null, '<path d="M39.1 33.6l-1.6 5M59.7 37.0l-1.6 5M99.6 5.8l-1.6 5M4.1 50.6l-1.6 5M42.5 15.6l-1.6 5M157.3 29.3l-1.6 5M132.5 29.6l-1.6 5M101.7 10.7l-1.6 5M101.0 52.3l-1.6 5M83.6 45.0l-1.6 5M106.7 5.7l-1.6 5M120.3 36.3l-1.6 5M49.0 3.8l-1.6 5M137.0 29.4l-1.6 5M114.1 53.0l-1.6 5M113.4 55.4l-1.6 5M63.6 48.5l-1.6 5M71.4 56.3l-1.6 5M139.1 7.7l-1.6 5M23.2 14.6l-1.6 5M152.6 27.3l-1.6 5M99.8 19.5l-1.6 5M81.1 24.4l-1.6 5M56.7 35.9l-1.6 5M93.1 54.4l-1.6 5M108.4 55.9l-1.6 5M135.6 59.5l-1.6 5M106.7 11.5l-1.6 5M136.3 57.9l-1.6 5M143.1 35.0l-1.6 5M113.4 14.2l-1.6 5M131.7 35.3l-1.6 5M46.5 5.7l-1.6 5M135.2 59.4l-1.6 5M15.8 48.4l-1.6 5M66.0 10.7l-1.6 5M47.8 46.6l-1.6 5M138.2 4.6l-1.6 5M97.9 4.6l-1.6 5M114.1 21.2l-1.6 5M139.4 58.9l-1.6 5M80.8 59.9l-1.6 5M50.3 6.5l-1.6 5M95.6 3.8l-1.6 5M32.8 25.7l-1.6 5M97.2 11.1l-1.6 5" fill="none" stroke="#6fb3dd" stroke-width=".7" stroke-linecap="round"/>'),
    /* A traffic light for problem solving (origin: the bottom of its pole); each lamp (red, yellow, green) is dark
       until its piece (lr, ly, lg) is shown. */
    "fl-light": g('<rect x="-1.2" y="-18" width="2.4" height="18" fill="#4a5568"/><rect x="-6" y="-46" width="12" height="30" rx="3" fill="#3d3d3d"/>' +
      '<circle cy="-40" r="3.6" fill="#5a2a2a"/><circle cy="-31" r="3.6" fill="#5a4a1e"/><circle cy="-22" r="3.6" fill="#1f4a2a"/>' +
      part("lr", null, '<circle cy="-40" r="3.6" fill="#ef5350"/><circle cy="-40" r="6" fill="#ef5350" stroke="none" opacity=".25"/>', 1) +
      part("ly", null, '<circle cy="-31" r="3.6" fill="#fcd34d"/><circle cy="-31" r="6" fill="#fcd34d" stroke="none" opacity=".25"/>', 1) +
      part("lg", null, '<circle cy="-22" r="3.6" fill="#8bc34a"/><circle cy="-22" r="6" fill="#8bc34a" stroke="none" opacity=".25"/>', 1)),
    // A splash of paint water over a drawing (origin: its middle).
    "fl-spill": '<path d="M-7-2c-2-4 2-7 5-5 2-3 7-2 7 2 4 0 5 5 1 6 1 4-5 5-6 2-3 3-8 1-7-2-3 0-3-3 0-3z" fill="#5b9bd5" opacity=".75"/>',
    // A flower vase on a shelf (origin: its bottom), and the same vase in pieces on the floor.
    "fl-vase": g('<path d="M-3-12c-2-3-1-4 0-5h6c1 1 2 2 0 5 3 2 4 6 2 10-1 2-9 2-10 0-2-4-1-8 2-10z" fill="#5bb5a5"/><path d="M-4-6h8" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<path d="M0-17v-5M-2-17l-3-4M2-17l3-4" fill="none" stroke="#5a9a45" stroke-width=".7"/><circle cy="-23" r="1.6" fill="#f28baa"/><circle cx="-5" cy="-21.6" r="1.4" fill="#fcd34d"/><circle cx="5" cy="-21.6" r="1.4" fill="#e5483f"/>'),
    "fl-vase-broken": g('<path d="M-9 0l2-4 3 1 1 3z" fill="#5bb5a5"/><path d="M-1 0l1-5 4 2-1 3z" fill="#5bb5a5"/><path d="M6 0l2-3 3 1v2z" fill="#5bb5a5"/>' +
      '<path d="M-6-1l-4-3M12-1l3-2" fill="none" stroke="#5a9a45" stroke-width=".7"/><circle cx="-11" cy="-4" r="1.4" fill="#f28baa"/><circle cx="15" cy="-3" r="1.3" fill="#fcd34d"/>'),
    // Little thought dots rising up and to the right from a head (origin: the lowest one).
    "fl-dots": g('<circle r="1" fill="#fff"/><circle cx="3.4" cy="-3.4" r="1.6" fill="#fff"/><circle cx="7.6" cy="-7.6" r="2.2" fill="#fff"/>'),
    // Musical notes (origin: their bottom), for humming while we wait.
    "fl-notes": '<g fill="#8b6fc7"><ellipse cx="-2" cy="-1" rx="1.4" ry="1"/><rect x="-.8" y="-7" width=".5" height="6"/><ellipse cx="3" cy="-3" rx="1.4" ry="1"/><rect x="4.2" y="-9" width=".5" height="6"/><path d="M-.3-7l5-2v1l-5 2z"/></g>'
  });
})();
