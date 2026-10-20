/* باغچه — drawings for the English course's animated scenes (js/lessons/english.js, step type `scene`). In this
   course meaning is shown by pictures and actions, never by translation, so the drawings move like the words:
   people wave, point, touch their nose, clap, eat and shake their heads; animals open their mouths to make their
   sounds; birds flap; a hand raises one finger per number. Same rules and style as js/art/rig.js (which this file
   adds to): origin (0, 0) where a drawing stands, unless its comment says it is in stage units at its own place;
   flat picture-book shapes, warm colours, a dark outline (#3d2c22), no text. Names start with "en-".

   People are seen from the front and share their pieces, so the same tracks work for all of them:
     armL / armR      the whole arm on the left / right of the picture, turning at the shoulder
     foreL / foreR    the forearm and hand (inside the arm), turning at the elbow
     legL / legR      a leg, turning at the hip (sy < 1 lifts the foot, for stamping)
     head             the head, turning at the neck; inside it:
       eyes (the eyes, x moves them to look), shut (closed eyes, hidden), smile, frown (hidden),
       brows (cross eyebrows, hidden), mouth (open, hidden: show it and squash sy back and forth to talk)
   An arm hangs down at r 0; r -90 holds the right arm out to the right, r -150 up and out; the left arm is the same
   with the signs turned (r 90 out to the left). */
var B = window.B || {};
window.B = B;

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var INK = "#3d2c22", SKIN = "var(--skin,#f3c39b)";
  var SCARVES = ["#7b5ea7", "#3fb0a8", "#e46b8a", "#5b9bd5", "#c4673a"];
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  // A limb: a thick round line with the outline around it, like the people in js/art/people.js.
  function limb(d, col, w) {
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + f(w + 1.2) + '"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"/>';
  }

  /* ---------- people, from the front (origin: between the feet) ----------
     o: leg, body (lengths), r (head radius), w (body width), ua, fa (upper arm, forearm), top, legs, shoes,
     hair (girl | boy | mum | gran | grandpa), hairC, dress, glasses, moustache. A woman or girl also has key (her
     drawing's name) and kind (girl | woman | grandma): B.headscarf (js/art/rig.js) decides by chance, fixed for her,
     whether she wears a headscarf instead of her hair (STYLE.md rule 6). */
  function person(o) {
    var L = o.leg, T = o.body, R = o.r, W = o.w;
    var hip = -(L + 1.4), sh = hip - T, hy = sh - R + 1.6;
    var sx = W / 2 - 0.9, ex = sx + 0.9, ey = sh + 1 + o.ua, wx = sx + 1.3, wy = ey + o.fa;
    function arm(side) {
      var k = side === "L" ? -1 : 1;
      return '<g data-part="arm' + side + '" data-pivot="' + f(k * sx) + " " + f(sh + 1) + '">' +
        limb("M" + f(k * sx) + " " + f(sh + 1) + "L" + f(k * ex) + " " + f(ey), o.top, 2.7) +
        '<g data-part="fore' + side + '" data-pivot="' + f(k * ex) + " " + f(ey) + '">' +
        limb("M" + f(k * ex) + " " + f(ey) + "L" + f(k * wx) + " " + f(wy), o.longSleeves ? o.top : SKIN, 2.3) +
        '<circle cx="' + f(k * wx) + '" cy="' + f(wy + 0.5) + '" r="1.6" fill="' + SKIN + '"/></g></g>';
    }
    function leg(side) {
      var k = side === "L" ? -1 : 1, x = k * 2.3;
      return '<g data-part="leg' + side + '" data-pivot="' + x + " " + f(hip) + '">' + limb("M" + x + " " + f(hip) + "V-1.6", o.legs, 2.9) +
        '<ellipse cx="' + f(x + k * 0.6) + '" cy="-1" rx="2.2" ry="1.15" fill="' + (o.shoes || "#c0503e") + '"/></g>';
    }
    var top = sh + 1.6, body;
    if (o.dress) {
      body = '<path d="M' + f(-W / 2 + 0.4) + " " + f(top) + "c0-1 1-1.6 2-1.6h" + f(W - 4.8) + "c1 0 2 .6 2 1.6l" + f(1.8) + " " + f(T + 1.6) + "h" + f(-(W + 2.8)) + 'z" fill="' + o.top + '"/>';
    } else {
      body = '<path d="M' + f(-W / 2 + 2.6) + " " + f(hip - 0.6) + "h" + f(W - 5.2) + "v2.8h" + f(-(W - 5.2)) + 'z" fill="' + o.legs + '"/>' +
        '<path d="M' + f(-W / 2 + 0.4) + " " + f(top) + "c0-1 1-1.6 2-1.6h" + f(W - 4.8) + "c1 0 2 .6 2 1.6l.3 " + f(T - 1.4) + "h" + f(-(W - 0.2)) + 'z" fill="' + o.top + '"/>';
    }
    if (o.collar) body += '<path d="M-2 ' + f(sh + 0.1) + "l2 2.4 2-2.4" + '" fill="#fff"/>';
    var hc = o.hairC, back = "", front = "", extra = "";
    var scarf = o.kind && B.headscarf && B.headscarf(o.key, o.kind) ? SCARVES[o.key.length % SCARVES.length] : null;
    var arc = "A" + R + " " + R + " 0 0 1 ";
    if (scarf) {
      // The headscarf: round the head and down over the shoulders, its edge across the forehead.
      back = '<path d="M' + f(-R - 1.8) + " " + f(hy) + "C" + f(-R - 2) + " " + f(hy - R - 3) + " " + f(R + 2) + " " + f(hy - R - 3) + " " + f(R + 1.8) + " " + f(hy) +
        "L" + f(R + 2.6) + " " + f(sh + 3) + "H" + f(-R - 2.6) + 'z" fill="' + scarf + '"/>';
      front = '<path d="M' + f(-R - 0.4) + " " + f(hy + 1.4) + "A" + (R + 0.4) + " " + (R + 0.4) + " 0 0 1 " + f(R + 0.4) + " " + f(hy + 1.4) +
        "C" + f(R - 1) + " " + f(hy - 3.2) + " " + f(-R + 1) + " " + f(hy - 3.2) + " " + f(-R - 0.4) + " " + f(hy + 1.4) + 'z" fill="' + scarf + '"/>';
    } else if (o.hair === "girl" || o.hair === "mum") {
      back = o.hair === "girl"
        ? '<ellipse cy="' + f(hy + 1.4) + '" rx="' + f(R + 1.1) + '" ry="' + f(R + 1.4) + '" fill="' + hc + '"/>' +
          '<circle cx="' + f(-R - 1.2) + '" cy="' + f(hy - 2) + '" r="2.4" fill="' + hc + '"/><circle cx="' + f(R + 1.2) + '" cy="' + f(hy - 2) + '" r="2.4" fill="' + hc + '"/>'
        : '<path d="M' + f(-R - 1) + " " + f(hy) + "c-.6 5-.6 9 .4 " + f(R + 3) + "h" + f(2 * R + 1.2) + "c1-4 1-8 .4-" + f(R + 3) + 'z" fill="' + hc + '"/>';
      front = '<path d="M' + f(-R) + " " + f(hy - 0.2) + arc + f(R) + " " + f(hy - 0.2) + "C" + f(R - 2.6) + " " + f(hy - 1.6) + " 1.4 " + f(hy - 3.4) + " 0 " + f(hy - R + 2.4) +
        "C-1.4 " + f(hy - 3.4) + " " + f(-R + 2.6) + " " + f(hy - 1.6) + " " + f(-R) + " " + f(hy - 0.2) + 'z" fill="' + hc + '"/>';
    } else if (o.hair === "boy") {
      front = '<path d="M' + f(-R - 0.2) + " " + f(hy + 0.6) + "C" + f(-R - 0.8) + " " + f(hy - R - 1.6) + " " + f(R + 0.8) + " " + f(hy - R - 1.6) + " " + f(R + 0.2) + " " + f(hy + 0.6) +
        "c-1-1.2-1.6-2.4-1.8-3.8-2.4 1.4-6.6 1.8-10.2 1.2-.9.8-1.8 1.6-2.6 2.6z" + '" fill="' + hc + '"/>';
    } else if (o.hair === "gran") {
      back = '<circle cy="' + f(hy - R - 0.6) + '" r="2.8" fill="' + hc + '"/>';
      front = '<path d="M' + f(-R) + " " + f(hy) + arc + f(R) + " " + f(hy) + "C" + f(R - 2) + " " + f(hy - 2.6) + " 2 " + f(hy - 3.2) + " 0 " + f(hy - 3.2) + "S" + f(-R + 2) + " " + f(hy - 2.6) + " " + f(-R) + " " + f(hy) + 'z" fill="' + hc + '"/>';
    } else if (o.hair === "grandpa") {
      front = '<path d="M' + f(-R - 0.3) + " " + f(hy + 1) + "c-.4-2.4 0-4.4 1.6-5.4.4 2 .4 3.6-.2 5.4z" + "M" + f(R + 0.3) + " " + f(hy + 1) + "c.4-2.4 0-4.4-1.6-5.4-.4 2-.4 3.6.2 5.4z" + '" fill="' + hc + '"/>' +
        '<path d="M-3 ' + f(hy - R + 1.2) + "q3-1.2 6 0" + '" fill="none" stroke-width=".45" opacity=".5"/>';
    }
    if (o.moustache) extra += '<path d="M-2.4 ' + f(hy + 2.1) + "q1.2-1 2.4-.3q1.2-.7 2.4.3q-1.2.9-2.4.2q-1.2.7-2.4-.2z" + '" fill="' + o.moustache + '" stroke-width=".4"/>';
    if (o.glasses) extra += '<g fill="none" stroke-width=".45"><circle cx="-2.5" cy="' + f(hy + 0.2) + '" r="1.7"/><circle cx="2.5" cy="' + f(hy + 0.2) + '" r="1.7"/><path d="M-.8 ' + f(hy + 0.1) + 'h1.6"/></g>';
    var head = '<g data-part="head" data-pivot="0 ' + f(sh) + '">' + back +
      (scarf ? "" : '<circle cx="' + f(-R) + '" cy="' + f(hy + 0.6) + '" r="1.5" fill="' + SKIN + '"/><circle cx="' + f(R) + '" cy="' + f(hy + 0.6) + '" r="1.5" fill="' + SKIN + '"/>') +
      '<circle cy="' + f(hy) + '" r="' + R + '" fill="' + SKIN + '"/>' + front +
      '<g data-part="eyes" fill="' + INK + '" stroke="none"><ellipse cx="-2.5" cy="' + f(hy + 0.2) + '" rx=".75" ry="1"/><ellipse cx="2.5" cy="' + f(hy + 0.2) + '" rx=".75" ry="1"/></g>' +
      '<g data-part="shut" style="opacity:0" fill="none" stroke-width=".5"><path d="M-3.4 ' + f(hy + 0.2) + 'q.9.8 1.8 0M1.6 ' + f(hy + 0.2) + 'q.9.8 1.8 0"/></g>' +
      '<path data-part="brows" style="opacity:0" d="M-4.2 ' + f(hy - 2.6) + "l2.8 1.2M4.2 " + f(hy - 2.6) + 'l-2.8 1.2" fill="none" stroke-width=".6"/>' +
      '<path d="M-.5 ' + f(hy + 1) + 'q.5 1 1 0" fill="none" stroke-width=".45"/>' +
      '<g fill="#f28b82" stroke="none" opacity=".5"><circle cx="-4.4" cy="' + f(hy + 2) + '" r="1.1"/><circle cx="4.4" cy="' + f(hy + 2) + '" r="1.1"/></g>' +
      '<path data-part="smile" d="M-1.6 ' + f(hy + 2.7) + 'q1.6 1.4 3.2 0" fill="none" stroke-width=".55"/>' +
      '<path data-part="frown" style="opacity:0" d="M-1.6 ' + f(hy + 3.7) + 'q1.6-1.3 3.2 0" fill="none" stroke-width=".55"/>' +
      '<ellipse data-part="mouth" style="opacity:0" data-pivot="0 ' + f(hy + 3.1) + '" cy="' + f(hy + 3.1) + '" rx="1.3" ry="1.1" fill="#a8423a" stroke-width=".5"/>' +
      extra + "</g>";
    return g(leg("L") + leg("R") + body + head + arm("L") + arm("R"));
  }
  var KID = { leg: 10, body: 10.5, r: 7.4, w: 11, ua: 5.8, fa: 5.2 };
  var SMALL = { leg: 8, body: 9, r: 7, w: 10, ua: 5, fa: 4.6 };
  var ADULT = { leg: 14.5, body: 14.5, r: 7, w: 13, ua: 7.6, fa: 6.6 };
  function kind(base, o) { return person(Object.assign({}, base, o)); }

  /* ---------- animals, from the side, facing right (origin: under the middle of their feet) ---------- */
  // The dog, standing, its legs, head, jaw and tail are pieces (legFn, legFf front near / far, legBn, legBf back).
  function dog() {
    var TAN = "#c98a4b", DARK = "#a86f3a", LIGHT = "#ecc394";
    function lg(name, x, col) {
      return '<g data-part="' + name + '" data-pivot="' + x + ' -11">' + limb("M" + x + "-11V-1.8", col, 2.8) +
        '<ellipse cx="' + (x + 0.8) + '" cy="-1.1" rx="2" ry="1.1" fill="' + col + '"/></g>';
    }
    return g('<g data-part="tail" data-pivot="-11 -16">' + limb("M-11-16c-2.6-1.4-4.2-4-4.4-7.6", TAN, 2.2) + "</g>" +
      lg("legBf", -6, DARK) + lg("legFf", 10, DARK) +
      '<ellipse cy="-14.5" rx="12.5" ry="6" fill="' + TAN + '"/><path d="M-6-10c4 1.6 10 1.6 14 0" fill="none" stroke="' + LIGHT + '" stroke-width="2"/>' +
      lg("legBn", -9, TAN) + lg("legFn", 7.4, TAN) +
      '<g data-part="head" data-pivot="10 -18"><path d="M8-16l2.6-6 5 3-3.2 5z" fill="' + TAN + '"/>' +
      '<circle cx="14" cy="-23" r="5.2" fill="' + TAN + '"/>' +
      '<g data-part="jaw" data-pivot="16.4 -19.8"><path d="M16-19.8h5c.4 1.6-1 2.8-2.8 2.8-1.6 0-2.4-1.2-2.2-2.8z" fill="' + LIGHT + '"/><path d="M17.4-18.8h2.2c-.2.9-.6 1.2-1.1 1.2s-1-.4-1.1-1.2z" fill="#e5737a" stroke-width=".35"/></g>' +
      '<ellipse cx="18.6" cy="-21.4" rx="3.7" ry="2.5" fill="' + LIGHT + '"/><ellipse cx="21.8" cy="-22.3" rx="1.15" ry=".95" fill="' + INK + '"/>' +
      '<circle cx="15.2" cy="-24.8" r=".8" fill="' + INK + '" stroke="none"/>' +
      '<path d="M11.4-27.4c-3.2-.2-4.8 4-3.8 8.2 2 .4 3.6-1.6 4-4.2z" fill="#8a5a32"/>' +
      '<path d="M9.6-18.6l2.8 4" fill="none" stroke="#e5483f" stroke-width="1.5"/></g>');
  }
  // The cat, sitting (like cat-side in js/art/rig.js), with a jaw to meow and a tail.
  function cat() {
    var C = "#f0a35e";
    return g('<g data-part="tail" data-pivot="-5.6 -1">' + '<path d="M-5.6-1c-4.4 0-6.4-3.4-5.2-6.6" fill="none" stroke="' + INK + '" stroke-width="2.4"/><path d="M-5.6-1c-4.4 0-6.4-3.4-5.2-6.6" fill="none" stroke="' + C + '" stroke-width="1.4"/></g>' +
      '<path d="M-6 0c-1-5 0-9 4-10 4-1 7 2 7 6 0 2-1 4-1 4z" fill="' + C + '"/><path d="M1.6 0v-3.4M4 0v-3" fill="none" stroke-width=".45"/>' +
      '<g data-part="head" data-pivot="3 -10"><path d="M1-15l.4-3.6 2.6 2.1M5.2-15.8l2.4-2.5.4 3.4" fill="' + C + '"/>' +
      '<path d="M5.4-11.4h4l-.8 2.2H6z" fill="#a8423a" stroke="none"/>' +
      '<g data-part="jaw" data-pivot="5.6 -10.8"><path d="M5.4-11h4c.1 1.5-.9 2.4-2.1 2.4-1.1 0-1.9-.9-1.9-2.4z" fill="' + C + '" stroke-width=".4"/></g>' +
      '<circle cx="4" cy="-12.4" r="4.1" fill="' + C + '"/><path d="M1.4-14.6l1.4 1M1.2-12.6h1.6" fill="none" stroke="#d98a45" stroke-width=".5"/>' +
      '<ellipse cx="5.7" cy="-13.2" rx=".55" ry=".8" fill="' + INK + '" stroke="none"/><path d="M7.7-11.9l.6.3" fill="none" stroke="#e5737a" stroke-width=".8"/>' +
      '<path d="M8-11.4l2.4-.4M8-11l2.4.5" fill="none" stroke-width=".3"/></g>');
  }
  // The duck, with a beak that opens (bill) and a wing.
  function duck() {
    var OR = "#f59e0b";
    return g(limb("M-2.4-5V-1", OR, 1.1) + limb("M.8-5V-1", OR, 1.1) + '<path d="M-2.4-1h-2.4l2.4-1.2zM.8-1h2.6l-2.6-1.2z" fill="' + OR + '"/>' +
      '<path d="M-9-11.2l-3.6-3 1.4 6z" fill="#fff"/><ellipse cx="-1" cy="-8.6" rx="8" ry="5" fill="#fff"/>' +
      '<g data-part="wing" data-pivot="0 -10"><path d="M1-10.4c-3-.6-7 .4-8.4 2.6 3 1.6 7.4 1.4 8.4-2.6z" fill="#e8ecef"/></g>' +
      '<g data-part="head" data-pivot="4 -11"><path d="M3-12l2-5 3.4 1.6-1 4.4z" fill="#fff" stroke="none"/><circle cx="6" cy="-16" r="3.7" fill="#fff"/>' +
      '<g data-part="bill" data-pivot="8.8 -14.6"><path d="M8.8-14.8h3.6c-.3 1.2-1.6 1.8-3.4 1.4z" fill="#e08600"/></g>' +
      '<path d="M9-16.4l4.2.8c.2.9-.5 1.2-1.3 1.2H9z" fill="' + OR + '"/><circle cx="7" cy="-17" r=".65" fill="' + INK + '" stroke="none"/></g>');
  }
  // The cow, with a jaw, a head that turns and a tail.
  function cow() {
    var P = "#f4b6c2", SP = "#5a4636";
    function lg(x, col) { return limb("M" + x + "-14V-1.6", col, 3) + '<rect x="' + (x - 1.6) + '" y="-2.4" width="3.2" height="2.4" rx=".6" fill="' + SP + '"/>'; }
    return g('<g data-part="tail" data-pivot="-15 -25">' + limb("M-15-25c-2.4 3-2.4 7-1.8 11", "#fff", 1.1) + '<path d="M-17.6-14.6c.4 1.6 1.6 2 2.4 1.4l-.4-2.4z" fill="' + SP + '"/></g>' +
      lg(-9, "#e4e4e4") + lg(8, "#e4e4e4") +
      '<rect x="-16" y="-28" width="28" height="15" rx="5.4" fill="#fff"/>' +
      '<path d="M-10-28c1 3 5 4 7 1-.6-.6-1-1-1.2-1zM2-21c2-2 6-1 6 2s-4 4-6 2c-1-1-1-3 0-4zM-15.6-20c3 0 4 3 2.6 5.4l-2.6-.4z" fill="' + SP + '" stroke="none"/>' +
      '<ellipse cx="-3" cy="-13" rx="3.4" ry="2" fill="' + P + '"/>' + lg(-12, "#fff") + lg(5, "#fff") +
      '<g data-part="head" data-pivot="11 -24"><path d="M10.6-28.6l-1.4-2.6M17-28.6l1.6-2.6" fill="none" stroke="#e8d9b0" stroke-width="1.4"/>' +
      '<ellipse cx="9.4" cy="-26" rx="2.6" ry="1.2" fill="#fff" transform="rotate(20 9.4 -26)"/>' +
      '<g data-part="jaw" data-pivot="14.6 -16.4"><path d="M12.6-16.6h6.2c0 1.6-1.4 2.6-3.1 2.6s-3.1-1-3.1-2.6z" fill="' + P + '"/></g>' +
      '<path d="M10.6-28.4c2.4-1.6 6.6-1.6 8.4.4l.8 7.4c.2 2.4-1.4 4-3.8 4h-3.4c-2.4 0-3.8-1.6-3.4-4z" fill="#fff"/>' +
      '<ellipse cx="15.8" cy="-18.8" rx="4.4" ry="2.6" fill="' + P + '"/><g fill="#c97a8a" stroke="none"><ellipse cx="14.2" cy="-19" rx=".6" ry=".8"/><ellipse cx="17.4" cy="-19" rx=".6" ry=".8"/></g>' +
      '<circle cx="13.2" cy="-24.6" r=".7" fill="' + INK + '" stroke="none"/><circle cx="17.6" cy="-24.6" r=".7" fill="' + INK + '" stroke="none"/></g>');
  }
  // A small bird, its wing a piece that flaps (origin: its feet).
  function bird(col, dark) {
    return g('<path d="M-.6-1v-1.2M.8-1v-1.2" fill="none" stroke="#f59e0b" stroke-width=".5"/><path d="M-3.4-3.8l-3-1.2.8 2.6z" fill="' + dark + '"/>' +
      '<ellipse cy="-3.6" rx="3.8" ry="2.6" fill="' + col + '"/><circle cx="2.8" cy="-5.8" r="2.1" fill="' + col + '"/>' +
      '<path d="M4.7-6.3l1.9.6-1.9.6z" fill="#f59e0b" stroke-width=".4"/><circle cx="3.3" cy="-6.3" r=".4" fill="' + INK + '" stroke="none"/>' +
      '<g data-part="wing" data-pivot="0 -4.4"><path d="M.4-4.4c-1.6-.6-3.6-.2-4.2 1.4 1.6.8 3.6.6 4.2-1.4z" fill="' + dark + '" stroke-width=".4"/></g>');
  }

  /* ---------- a hand that counts: a fist, and one finger after another goes up ----------
     Palm towards us, thumb on the left (origin: the wrist). f1 to f4 are the fingers from the index finger to the
     little finger, f5 the thumb; each is hidden until a track shows it (o 1). fold is the thumb lying across the
     fist, to hide when f5 goes up. */
  function countHand() {
    var fg = function (n, x, h) {
      return '<rect data-part="f' + n + '" data-pivot="' + f(x + 1.7) + ' -13" style="opacity:0" x="' + x + '" y="' + f(-13 - h) + '" width="3.4" height="' + f(h + 2) + '" rx="1.7" fill="' + SKIN + '"/>';
    };
    return g('<rect x="-7" y="-1.4" width="14" height="5.4" rx="1.6" fill="#5b9bd5"/>' +
      '<path d="M-7.2 0c-.8-4-.8-9.4-.2-14h14.8c.6 4.6.4 10-.4 14z" fill="' + SKIN + '"/>' +
      '<g fill="' + SKIN + '"><rect x="-7.2" y="-16" width="3.4" height="4" rx="1.7"/><rect x="-3.6" y="-16.6" width="3.4" height="4.4" rx="1.7"/><rect y="-16.4" width="3.4" height="4.2" rx="1.7"/><rect x="3.6" y="-15.4" width="3.2" height="3.6" rx="1.6"/></g>' +
      fg(1, -7.2, 9) + fg(2, -3.6, 10.4) + fg(3, 0, 9.8) + fg(4, 3.6, 7.6) +
      '<rect data-part="fold" x="-6.6" y="-10" width="9" height="3.4" rx="1.7" fill="' + SKIN + '"/>' +
      '<rect data-part="f5" data-pivot="-6.6 -4" style="opacity:0" x="-8.3" y="-12.6" width="3.4" height="9.4" rx="1.7" fill="' + SKIN + '"/>');
  }

  // The path the brush takes over the paint band (the band is drawn along the same line).
  B.EN_PAINT_PATH = "M24 20C44 8 60 30 80 18S116 10 136 22";

  B.RIG = B.RIG || {};
  Object.assign(B.RIG, {
    /* ---------- people ---------- */
    "en-sara": kind(KID, { key: "en-sara", kind: "girl", hair: "girl", hairC: "#6b3f26", top: "#e46b8a", legs: SKIN, dress: true }),
    "en-reza": kind(KID, { hair: "boy", hairC: "#4a2f1f", top: "#4f8fd6", legs: "#5a5f7a" }),
    "en-arman": kind(KID, { hair: "boy", hairC: "#2b1d14", top: "#f2c14e", legs: "#3f6f8f", shoes: "#5a9a45" }),
    "en-sister": kind(SMALL, { key: "en-sister", kind: "girl", hair: "girl", hairC: "#2b1d14", top: "#f2a65a", legs: SKIN, dress: true, shoes: "#8a6cc4" }),
    "en-brother": kind(SMALL, { hair: "boy", hairC: "#6b3f26", top: "#e46b6b", legs: "#4f8fd6" }),
    "en-mother": kind(ADULT, { key: "en-mother", kind: "woman", leg: 14, body: 14, w: 12.4, hair: "mum", hairC: "#4a2f1f", top: "#3fb0a8", legs: SKIN, dress: true, longSleeves: true }),
    "en-father": kind(ADULT, { leg: 15, body: 15, w: 14, hair: "boy", hairC: "#4a2f1f", top: "#5aa36a", legs: "#5a5f7a", moustache: "#4a2f1f", collar: true, shoes: "#6b3f26" }),
    "en-grandma": kind(ADULT, { key: "en-grandma", kind: "grandma", leg: 13, body: 13.5, hair: "gran", hairC: "#e8e4de", top: "#8a6cc4", legs: SKIN, dress: true, longSleeves: true, glasses: true }),
    "en-grandpa": kind(ADULT, { leg: 13.5, body: 14, hair: "grandpa", hairC: "#e8e4de", top: "#a0785a", legs: "#6b6f80", glasses: true, moustache: "#e8e4de", collar: true, shoes: "#6b3f26" }),
    "en-teacher": kind(ADULT, { key: "en-teacher", kind: "woman", leg: 14, body: 14, w: 12.4, hair: "mum", hairC: "#2b1d14", top: "#e46b6b", legs: SKIN, dress: true, longSleeves: true, glasses: true }),
    "en-mina": kind(KID, { key: "en-mina", kind: "girl", hair: "girl", hairC: "#2b1d14", top: "#8a6cc4", legs: SKIN, dress: true, shoes: "#e46b8a" }),

    /* ---------- a robot and a bear, from the front, with the people's pieces (armL, armR, head, eyes, mouth) ---------- */
    // The robot that talks in sounds (origin: between its feet, 40 tall). light: the lamp on its antenna; mouth: a
    // grille that opens (sy) for each sound.
    "en-robot": g('<rect x="-6.6" y="-7" width="4" height="7" rx="1" fill="#8fa3b0"/><rect x="2.6" y="-7" width="4" height="7" rx="1" fill="#8fa3b0"/>' +
      '<rect x="-7.6" y="-1.6" width="6" height="2.2" rx="1" fill="#5b6b78"/><rect x="1.6" y="-1.6" width="6" height="2.2" rx="1" fill="#5b6b78"/>' +
      '<g data-part="armL" data-pivot="-9 -20">' + limb("M-9-20l-2.6 10", "#8fa3b0", 2.4) + '<path d="M-13.4-10.4a2 2 0 1 0 3.6 1.4" fill="none" stroke-width="1"/></g>' +
      '<g data-part="armR" data-pivot="9 -20">' + limb("M9-20l2.6 10", "#8fa3b0", 2.4) + '<path d="M13.4-10.4a2 2 0 1 1-3.6 1.4" fill="none" stroke-width="1"/></g>' +
      '<rect x="-9" y="-23" width="18" height="16" rx="2.6" fill="#b8c7d1"/><rect x="-5" y="-19.6" width="10" height="7" rx="1.2" fill="#e8eef2"/>' +
      '<circle cx="-2.4" cy="-16" r="1.2" fill="#e5483f"/><circle cx="0.6" cy="-16" r="1.2" fill="#f2c14e"/><circle cx="3.4" cy="-16" r="1.2" fill="#5a9a45"/>' +
      '<g data-part="head" data-pivot="0 -24"><path d="M0-36v-4" fill="none" stroke-width=".8"/><circle data-part="light" data-pivot="0 -41" cy="-41" r="1.6" fill="#f2c14e"/>' +
      '<rect x="-8" y="-37" width="16" height="13" rx="3" fill="#b8c7d1"/><rect x="-9.6" y="-32.6" width="1.8" height="4" rx=".6" fill="#8fa3b0"/><rect x="7.8" y="-32.6" width="1.8" height="4" rx=".6" fill="#8fa3b0"/>' +
      '<g data-part="eyes"><circle cx="-3.4" cy="-32" r="2" fill="#fff"/><circle cx="3.4" cy="-32" r="2" fill="#fff"/><circle cx="-3.4" cy="-32" r=".9" fill="' + INK + '" stroke="none"/><circle cx="3.4" cy="-32" r=".9" fill="' + INK + '" stroke="none"/></g>' +
      '<g data-part="mouth" data-pivot="0 -27.6"><rect x="-4" y="-28.8" width="8" height="2.4" rx=".6" fill="#3f6f8f"/><path d="M-2-28.8v2.4M0-28.8v2.4M2-28.8v2.4" fill="none" stroke="#9fd3f0" stroke-width=".4"/></g></g>'),
    /* The hungry bear (origin: between its feet, 38 tall). tummy grows (s) when it is full; mouth opens (hidden, as on
       the people) and smile; arms armL / armR turn at the shoulders (a paw is about 11 below the shoulder). */
    "en-bear": (function () {
      var BR = "#9a6442", LT = "#d9a77a";
      function arm(side) {
        var k = side === "L" ? -1 : 1;
        return '<g data-part="arm' + side + '" data-pivot="' + 8 * k + ' -25">' + limb("M" + 8 * k + "-25L" + 9.6 * k + "-15", BR, 4.4) +
          '<circle cx="' + 9.8 * k + '" cy="-14" r="2.8" fill="' + BR + '"/></g>';
      }
      return g('<ellipse cx="-4.4" cy="-2.6" rx="3.8" ry="3" fill="' + BR + '"/><ellipse cx="4.4" cy="-2.6" rx="3.8" ry="3" fill="' + BR + '"/>' +
        '<ellipse cy="-15" rx="10" ry="12" fill="' + BR + '"/><ellipse data-part="tummy" data-pivot="0 -12" cy="-12" rx="6" ry="7" fill="' + LT + '"/>' +
        '<g data-part="head" data-pivot="0 -26"><circle cx="-6.6" cy="-36.4" r="3" fill="' + BR + '"/><circle cx="6.6" cy="-36.4" r="3" fill="' + BR + '"/>' +
        '<circle cx="-6.6" cy="-36.4" r="1.4" fill="' + LT + '" stroke="none"/><circle cx="6.6" cy="-36.4" r="1.4" fill="' + LT + '" stroke="none"/>' +
        '<circle cy="-31" r="8.4" fill="' + BR + '"/><ellipse cy="-28" rx="4.4" ry="3.4" fill="' + LT + '"/><ellipse cy="-29.6" rx="1.6" ry="1.1" fill="' + INK + '"/>' +
        '<g data-part="eyes" fill="' + INK + '" stroke="none"><circle cx="-3.4" cy="-33" r=".9"/><circle cx="3.4" cy="-33" r=".9"/></g>' +
        '<g data-part="shut" style="opacity:0" fill="none" stroke-width=".5"><path d="M-4.4-33q1 .8 2 0M2.4-33q1 .8 2 0"/></g>' +
        '<path data-part="smile" d="M-1.6-27.2q1.6 1.4 3.2 0" fill="none" stroke-width=".55"/>' +
        '<ellipse data-part="mouth" style="opacity:0" data-pivot="0 -26.6" cy="-26.6" rx="1.6" ry="1.3" fill="#a8423a" stroke-width=".5"/></g>' +
        arm("L") + arm("R"));
    })(),
    // A rag doll (origin: under its feet, 20 tall).
    "en-doll": g('<path d="M-2.2-1v-4M2.2-1v-4" fill="none" stroke="' + SKIN + '" stroke-width="1.6"/><path d="M-2.2-1v-4M2.2-1v-4" fill="none" stroke-width=".3"/>' +
      '<path d="M-1.4-13h2.8l3.6 8.4h-10z" fill="#e46b8a"/><path d="M-3.6-7.6h7.2" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<path d="M-1.6-12l-3 3.6M1.6-12l3 3.6" fill="none" stroke="' + SKIN + '" stroke-width="1.4"/>' +
      '<circle cy="-16" r="3.6" fill="#f2a65a"/><circle cy="-15.4" r="2.8" fill="' + SKIN + '"/>' +
      '<circle cx="-1" cy="-15.6" r=".35" fill="' + INK + '" stroke="none"/><circle cx="1" cy="-15.6" r=".35" fill="' + INK + '" stroke="none"/><path d="M-.7-14.4q.7.5 1.4 0" fill="none" stroke-width=".3"/>'),
    // A book seen from the front, standing (origin: its bottom middle, 16 tall). Closed, the cover is on the right;
    // to open it, squash cover to sx 0, hide it, and show left (the left page) from sx 0 to 1: both turn at the spine.
    "en-book": g('<rect x="0" y="-16" width="13" height="16" rx=".6" fill="#fffaf0"/><path d="M2-12h8M2-9h8M2-6h6" fill="none" stroke="#b8c0c8" stroke-width=".5"/>' +
      '<g data-part="left" data-pivot="0 -8" style="opacity:0"><rect x="-13" y="-16" width="13" height="16" rx=".6" fill="#fffaf0"/>' +
      '<path d="M-11-12h8M-11-9h8M-11-6h6" fill="none" stroke="#b8c0c8" stroke-width=".5"/><circle cx="-6.5" cy="-3" r="1.4" fill="#f2c14e" stroke="none"/></g>' +
      '<g data-part="cover" data-pivot="0 -8"><rect x="0" y="-16.4" width="13.6" height="16.8" rx=".8" fill="#2f6fd6"/><circle cx="7" cy="-9" r="3" fill="#f2c14e"/></g>'),
    // A ladder leaning on nothing (origin: its bottom middle), 54 tall, rungs every 8.
    "en-ladder": g('<path d="M-6 0V-54M6 0V-54" fill="none" stroke="' + INK + '" stroke-width="2.6"/><path d="M-6 0V-54M6 0V-54" fill="none" stroke="#c98a4b" stroke-width="1.6"/>' +
      [6, 14, 22, 30, 38, 46].map(function (y) { return '<path d="M-6-' + y + 'H6" fill="none" stroke="#c98a4b" stroke-width="1.4"/>'; }).join("")),
    // A chair from the front (origin: the bottom middle); its seat is at -10, its back up to -26.
    "en-chair": g('<rect x="-9" y="-26" width="18" height="14" rx="1.6" fill="#c98a4b"/><path d="M-7-10V0M7-10V0" fill="none" stroke="' + INK + '" stroke-width="2"/><path d="M-7-10V0M7-10V0" fill="none" stroke="#a0683f" stroke-width="1.2"/>' +
      '<rect x="-10" y="-12" width="20" height="3" rx=".8" fill="#b57638"/>'),
    // A school desk from the front (origin: the bottom middle), 44 wide, its top at -16.
    "en-desk": g('<rect x="-22" y="-17" width="44" height="3" rx=".8" fill="#b57638"/><rect x="-20" y="-14" width="3" height="14" fill="#a0683f"/><rect x="17" y="-14" width="3" height="14" fill="#a0683f"/>'),
    // A school bag from the front (origin: its bottom middle).
    "en-bag": g('<path d="M-4-14c0-4 8-4 8 0" fill="none" stroke="#3f6f8f" stroke-width="1.2"/><rect x="-7" y="-14" width="14" height="14" rx="3" fill="#4f8fd6"/><rect x="-5" y="-7" width="10" height="5" rx="1.4" fill="#3f78b5"/>'),

    // A bright frame round one room of en-house (origin: its top left), 46 wide and 50 high.
    "en-frame": '<rect x="1" y="1" width="44" height="48" rx="2" fill="#fff59d" fill-opacity=".25" stroke="#f5c518" stroke-width="2"/>',
    // A pond seen a little from above (origin: its middle), 56 wide.
    "en-pond": g('<ellipse rx="28" ry="7" fill="#5fb3e0"/><path d="M-16-1.6q3-1 6 0M6 2q3-1 6 0M-4-4q2.4-.8 4.8 0" fill="none" stroke="#fff" stroke-width=".6" opacity=".8"/>'),

    // A rubber (eraser), pink and blue (origin: its bottom middle).
    "en-rubber": g('<rect x="-7" y="-6" width="14" height="6" rx="1.4" fill="#f48fb1"/><rect x="1.6" y="-6" width="5.4" height="6" rx="1" fill="#5b9bd5"/>'),
    // A lamp on its stand (origin: the bottom middle), 22 tall.
    "en-lamp": g('<path d="M-4 0h8l-1-2h-6z" fill="#8a6f52"/><path d="M0-2v-12" fill="none" stroke-width="1.2"/><path d="M-6-13h12l-3-9h-6z" fill="#f2c14e"/>'),
    // A cupboard from the front, two doors (origin: the bottom middle), 30 wide and 40 tall.
    "en-cupboard": g('<rect x="-15" y="-40" width="30" height="40" rx="1" fill="#b57638"/><path d="M0-38V-2" fill="none"/><rect x="-13" y="-38" width="12" height="36" fill="#c98a4b"/><rect x="1" y="-38" width="12" height="36" fill="#c98a4b"/>' +
      '<circle cx="-2.6" cy="-20" r=".8" fill="' + INK + '"/><circle cx="2.6" cy="-20" r=".8" fill="' + INK + '"/>'),
    /* A birthday cake (origin: its bottom middle), 30 wide; six candles c1 … c6 (hidden until a track shows them). */
    "en-cake": g('<rect x="-15" y="-12" width="30" height="12" rx="2" fill="#f4b6c2"/><path d="M-15-8q3.75 3 7.5 0t7.5 0 7.5 0 7.5 0" fill="none" stroke="#fff" stroke-width="1.2"/>' +
      '<ellipse cy="-12" rx="15" ry="2.4" fill="#fde2e8"/>' +
      [-10, -6, -2, 2, 6, 10].map(function (x, i) {
        return '<g data-part="c' + (i + 1) + '" style="opacity:0"><rect x="' + (x - 0.8) + '" y="-20" width="1.6" height="7" fill="' + ["#5b9bd5", "#f2c14e", "#5a9a45", "#e46b8a", "#8a6cc4", "#f28c28"][i] + '"/>' +
          '<path d="M' + x + '-23.6c-1 1.4-1.2 2.4 0 3.2 1.2-.8 1-1.8 0-3.2z" fill="#f59e0b" stroke-width=".3"/></g>';
      }).join("")),

    /* A wall clock (origin: its middle), 20 across, with 12 marks; hour and minute are its hands, pointing at 12
       (r 0): turn them 30° an hour (hour) and 6° a minute (minute). */
    "en-clock": g('<circle r="10" fill="#fff" stroke-width=".8"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (k) {
        var a = k * Math.PI / 6, l = k % 3 ? 1 : 1.8;
        return '<path d="M' + f(Math.sin(a) * 9) + " " + f(-Math.cos(a) * 9) + "L" + f(Math.sin(a) * (9 - l)) + " " + f(-Math.cos(a) * (9 - l)) + '" fill="none" stroke-width="' + (k % 3 ? 0.4 : 0.8) + '"/>';
      }).join("") +
      '<g data-part="hour" data-pivot="0 0"><path d="M0 0V-5" fill="none" stroke-width="1.4"/></g><g data-part="minute" data-pivot="0 0"><path d="M0 0V-7.6" fill="none" stroke="#e5483f" stroke-width=".8"/></g>' +
      '<circle r=".9" fill="' + INK + '"/>'),

    /* ---------- weather ---------- */
    // A grey veil over the sky of en-park, for a cloudy or rainy day (stage units).
    "en-dim": '<rect width="160" height="60" fill="#6b7c8a" opacity=".35"/>',
    // Snow lying on the ground, over the grass (stage units).
    "en-snow-ground": '<path d="M0 60c10-2 20 1 30-1s22 2 34 0 24-2 36 0 22 1 30-1 20 1 30 0V90H0z" fill="#fbfdff" stroke="#c8d6df" stroke-width=".5"/>',
    // Water in a pool, in front of a swimmer (stage units): from y 62 down, with waves on top.
    "en-water": '<path d="M0 62q5-2.4 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0V90H0z" fill="#5fb3e0" fill-opacity=".88" stroke="#3f78b5" stroke-width=".5"/>',

    /* ---------- animals ---------- */
    "en-dog": dog(),
    "en-cat": cat(),
    "en-duck": duck(),
    "en-cow": cow(),
    "en-bird": bird("#5b9bd5", "#3f78b5"),
    "en-bird2": bird("#f2c14e", "#d9a441"),
    // Sound lines coming out of a mouth (origin: the mouth; they go to the right).
    "en-sound": '<g fill="none" stroke="' + INK + '" stroke-width=".7" stroke-linecap="round"><path d="M1-2.4q1.6 2.4 0 4.8"/><path d="M3.4-4.4q3 4.4 0 8.8"/><path d="M5.8-6.4q4.4 6.4 0 12.8"/></g>',

    /* ---------- things ---------- */
    "en-count-hand": countHand(),
    // A paintbrush, its tip at the origin, leaning to the right.
    "en-brush": g('<g transform="rotate(35)"><path d="M-1.6-6c0-2 .6-3.4 1.6-6 1 2.6 1.6 4 1.6 6z" fill="#3d2c22" transform="rotate(180 0 -6)"/>' +
      '<rect x="-1.8" y="-9" width="3.6" height="3.4" fill="#b8c0c8"/><rect x="-1.3" y="-25" width="2.6" height="16" rx="1.2" fill="#c98a4b"/></g>'),
    // A band of paint across the top of the stage (stage units): draw it while the brush follows EN_PAINT_PATH.
    "en-paint-red": paint("#e0413a"), "en-paint-green": paint("#3fa34d"), "en-paint-yellow": paint("#f5c518"), "en-paint-blue": paint("#2f6fd6"),
    // A speech bubble with a question mark (origin: the tip of its tail, bottom left).
    "en-ask": g('<path d="M0 0l2.4-5.4c-3-1.4-4.4-4-4.4-6.6C-2-16.6 2.4-20 8-20s10 3.4 10 8-4.4 8-10 8c-1.2 0-2.4-.2-3.4-.4z" fill="#fff"/>' +
      '<path d="M5.4-14.6c0-2 1.2-3 2.8-3s2.8 1 2.8 2.6c0 2-2.8 2.2-2.8 4.4" fill="none" stroke="#e46b6b" stroke-width="1.4"/><circle cx="8.2" cy="-7.8" r=".9" fill="#e46b6b" stroke="none"/>'),
    // An empty speech bubble (origin: the tip of its tail, bottom right): put a picture in it.
    "en-say": g('<path d="M0 0l-2.4-5.4c3-1.4 4.4-4 4.4-6.6C2-16.6-2.4-20-8-20s-10 3.4-10 8 4.4 8 10 8c1.2 0 2.4-.2 3.4-.4z" fill="#fff"/>'),
    // A red circle of colour, for a speech bubble (origin: its middle).
    "en-red": '<circle r="4" fill="#e0413a" stroke="#3d2c22" stroke-width=".5"/>',
    // A red ball (origin: where it touches the floor).
    "en-ball": g('<circle cy="-3" r="3" fill="#e0413a"/><path d="M-1.8-4.2c.5-.7 1.2-1 2-1" fill="none" stroke="#fff" stroke-width=".6"/>'),
    // A line of looking, dashed, 20 long from the eye (the origin) to the right: turn it with r, stretch it with sx.
    "en-look": '<path d="M0 0H20" fill="none" stroke="#3f6f8f" stroke-width=".7" stroke-dasharray="2 1.6" stroke-linecap="round"/>',
    // A heart (origin: its middle).
    "en-heart": g('<path d="M0 3.6C-4.6.4-5.4-1.6-5.4-3c0-1.8 1.4-3 3-3 1 0 1.8.6 2.4 1.4.6-.8 1.4-1.4 2.4-1.4 1.6 0 3 1.2 3 3 0 1.4-.8 3.4-5.4 6.6z" fill="#e5483f"/>'),
    // A plate, from the side (origin: its bottom middle).
    "en-plate": g('<path d="M-9-2.4h18c-1 1.6-3 2.4-5 2.4h-8c-2 0-4-.8-5-2.4z" fill="#fff"/><ellipse cy="-2.4" rx="9" ry="1.2" fill="#f4f4f2"/>'),
    // A box, open at the top, in two pieces so a cat can be in it: draw en-box-back, then the cat, then
    // en-box-front (origin: the bottom middle of its front).
    "en-box-back": g('<path d="M-12-16l3-3h18l3 3z" fill="#a0683f"/><path d="M-12-16l-4-5 3.4-1.6 3.6 3.6zM12-16l4-5-3.4-1.6-3.6 3.6z" fill="#d6a46a"/>'),
    "en-box-front": g('<rect x="-12" y="-16" width="24" height="16" fill="#d6a46a"/><path d="M-12-16l-2.6 5h12l2.6-5zM12-16l2.6 5H2.6L0-16z" fill="#e2b77f"/><path d="M-4-6h8" fill="none" stroke="#a0683f" stroke-width=".8"/>'),
    // A bed with long legs, from the side, so there is room under it (origin: the bottom middle). 56 wide.
    "en-bed": g('<rect x="-28" y="-34" width="5" height="34" rx="1.4" fill="#c98a4b"/><rect x="23" y="-24" width="5" height="24" rx="1.4" fill="#c98a4b"/>' +
      '<rect x="-24" y="-17" width="48" height="4" fill="#a0683f"/><rect x="-24" y="-22.6" width="48" height="6" rx="1.6" fill="#fff"/>' +
      '<ellipse cx="-17" cy="-24" rx="6" ry="3" fill="#fff"/><path d="M-9-23.2h33v8H-9z" fill="#5b9bd5"/><path d="M-9-19.4h33" fill="none" stroke-width=".4"/>'),
    // A low bed for sleeping, from the side, pillow on the left; its blanket is a part of its own (en-blanket), to
    // go over the child (origin: the bottom middle). 60 wide, the mattress top at -14.
    "en-bed-low": g('<rect x="-30" y="-28" width="5" height="28" rx="1.4" fill="#c98a4b"/><rect x="25" y="-18" width="5" height="18" rx="1.4" fill="#c98a4b"/>' +
      '<rect x="-26" y="-9" width="52" height="5" fill="#a0683f"/><rect x="-26" y="-14.6" width="52" height="6" rx="1.6" fill="#fff"/><ellipse cx="-19" cy="-16" rx="6" ry="2.8" fill="#fff"/>'),
    "en-blanket": g('<path d="M-12-17.6c4-1.4 30-1.4 36.6 0 .6 2.6.6 6 0 9H-12c-.8-3-.8-6.4 0-9z" fill="#5b9bd5"/><path d="M-10-14h33" fill="none" stroke="#fff" stroke-width=".6" opacity=".6"/>'),
    // A table from the side (origin: the bottom middle), 76 wide, its top at -20.
    "en-table": g('<rect x="-38" y="-21" width="76" height="3.4" rx="1" fill="#b57638"/><rect x="-34" y="-17.6" width="3" height="17.6" fill="#a0683f"/><rect x="31" y="-17.6" width="3" height="17.6" fill="#a0683f"/>' +
      '<path d="M-38-17.6h76" fill="none" stroke-width=".4"/>'),

    /* ---------- places (stage units) ---------- */
    // A park: sky, grass, a tree on each side and a path.
    "en-park": g('<rect width="160" height="62" fill="#cfeaf7" stroke="none"/><path d="M28 14c0-3 3-4.6 5.6-3.4 1.4-3 6.6-3 7.6 0 3 0 4.6 2 3.4 3.4z" fill="#fff" stroke="none"/>' +
      '<path d="M108 20c0-2.4 2.4-3.6 4.4-2.6 1.2-2.4 5.2-2.4 6 0 2.4 0 3.6 1.6 2.6 2.6z" fill="#fff" stroke="none"/>' +
      '<rect y="60" width="160" height="30" fill="#9ccc65"/><path d="M0 60h160" fill="none"/><path d="M60 90l10-30h20l10 30z" fill="#e8d3a6" stroke="none"/>' +
      tree(10, 62, 1.1) + tree(150, 62, 0.95)),
    // A farm: sky, a hill, a fence and grass.
    "en-farm": g('<rect width="160" height="62" fill="#cfeaf7" stroke="none"/><path d="M0 50c30-12 60-12 90 0s50 6 70-2v14H0z" fill="#b7d98b"/>' +
      '<rect y="60" width="160" height="30" fill="#9ccc65"/><path d="M0 60h160" fill="none"/>' +
      '<g fill="#e8d3a6"><path d="M0 48h160v2.4H0zM0 54h160v2.4H0z"/>' + [6, 26, 46, 66, 86, 106, 126, 146].map(function (x) { return '<path d="M' + x + ' 61v-16l1.6-2 1.6 2v16z"/>'; }).join("") + "</g>"),
    // A garden: sky, grass, a low wall on the left (its top at 56, from x 8 to 48).
    "en-garden": g('<rect width="160" height="64" fill="#cfeaf7" stroke="none"/><rect y="64" width="160" height="26" fill="#9ccc65"/><path d="M0 64h160" fill="none"/>' +
      '<rect x="8" y="56" width="40" height="10" fill="#d0866a"/><path d="M8 61h40M18 56v5M30 56v5M42 56v5M13 61v5M24 61v5M36 61v5" fill="none" stroke-width=".4"/>'),
    // A tree with a long branch to the left (origin: the bottom of its trunk); the branch's top is at (-30 .. -6, -38).
    "en-tree": g('<path d="M-3 0c1-10 1-22 0-34h6c-1 12-1 24 0 34z" fill="#8a5a32"/><path d="M-1-30c-8-2-18-4-30-5" fill="none" stroke="' + INK + '" stroke-width="3.2"/><path d="M-1-30c-8-2-18-4-30-5" fill="none" stroke="#8a5a32" stroke-width="2.2"/>' +
      '<circle cx="0" cy="-48" r="13" fill="#5a9a45"/><circle cx="10" cy="-40" r="9" fill="#5a9a45"/><circle cx="-9" cy="-41" r="8" fill="#5a9a45"/><circle cx="-31" cy="-37" r="4" fill="#5a9a45"/>'),
    // A bedroom: the wall with a window that the sky (en-sky-day, en-sky-night), the sun and the moon show through,
    // and the floor. Draw the sky and the sun behind it. The window is from x 100 to 140, y 10 to 38.
    "en-bedroom": g('<path d="M0 0h160v62H0zM100 10v28h40V10z" fill="#f6e3c6" fill-rule="evenodd"/>' +
      '<path d="M100 10h40v28h-40z" fill="none" stroke="#fff" stroke-width="2"/><path d="M100 10h40v28h-40zM120 10v28M100 24h40" fill="none"/>' +
      '<path d="M96 7c2 10 2 24-1 34h6c-2-10-2-24 0-34zM144 7c-2 10-2 24 1 34h-6c2-10 2-24 0-34z" fill="#e46b8a"/>' +
      '<rect y="60" width="160" height="30" fill="#e7c69c"/><path d="M0 60h160" fill="none"/>'),
    /* A house cut open, so its three rooms show (stage units): the bedroom (x 10 to 56: a bed and a window), the
       kitchen (56 to 104: a table, a chair and a stove) and the bathroom (104 to 150: a bath and a basin). The floor
       is at 84; the inner walls have doorways, so someone can go from room to room along the floor. */
    "en-house": g('<rect width="160" height="90" fill="#cfeaf7" stroke="none"/><rect y="84" width="160" height="6" fill="#9ccc65"/>' +
      '<path d="M4 30L80 4l76 26z" fill="#c4673a"/>' +
      '<rect x="10" y="30" width="46" height="54" fill="#f6e3c6"/><rect x="56" y="30" width="48" height="54" fill="#fdf0d5"/><rect x="104" y="30" width="46" height="54" fill="#dff1f7"/>' +
      '<rect x="10" y="80" width="140" height="4" fill="#e7c69c"/>' +
      '<path d="M56 30v30M104 30v30" fill="none" stroke="' + INK + '" stroke-width="1.6"/><path d="M10 30h140v54H10z" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
      // bedroom: a window and a bed
      '<rect x="18" y="38" width="16" height="13" fill="#9fd3f0"/><path d="M26 38v13M18 44.5h16" fill="none"/>' +
      '<rect x="15" y="68" width="4" height="12" fill="#c98a4b"/><rect x="18" y="72" width="32" height="5" rx="1.2" fill="#fff"/><rect x="28" y="70.6" width="22" height="5" rx="1.2" fill="#5b9bd5"/><rect x="48" y="74" width="3" height="6" fill="#c98a4b"/><ellipse cx="22.6" cy="71" rx="4" ry="1.8" fill="#fff"/>' +
      // kitchen: a stove, a table and a chair
      '<rect x="86" y="62" width="14" height="18" fill="#e8eef2"/><circle cx="90" cy="64" r="1.4" fill="' + INK + '"/><circle cx="96" cy="64" r="1.4" fill="' + INK + '"/><rect x="88" y="68" width="10" height="8" rx="1" fill="#b8c0c8"/>' +
      '<rect x="60" y="68" width="22" height="2.4" fill="#b57638"/><path d="M62 70.4V80M80 70.4V80" fill="none" stroke="#a0683f" stroke-width="1.4"/>' +
      '<rect x="74" y="60" width="2" height="20" fill="#c98a4b"/><rect x="74" y="72" width="8" height="2" fill="#c98a4b"/><path d="M81 74v6" fill="none" stroke="#a0683f" stroke-width="1.2"/>' +
      // bathroom: a bath with feet, and a basin with a mirror over it
      '<path d="M110 66h26v6c0 4-3 7-7 7h-12c-4 0-7-3-7-7z" fill="#fff"/><path d="M114 79v1.6M132 79v1.6" fill="none" stroke-width="1.4"/><path d="M108 66h30" fill="none" stroke-width="1"/>' +
      '<rect x="139" y="40" width="8" height="10" rx="3" fill="#cfeaf7"/><path d="M138 58h10l-1.4 4h-7.2z" fill="#fff"/><rect x="142" y="62" width="4" height="18" fill="#e8eef2"/>'),
    // The front of en-house's bath, to draw over someone who is in the bath (stage units).
    "en-bath-front": g('<path d="M110 66h26v6c0 4-3 7-7 7h-12c-4 0-7-3-7-7z" fill="#fff"/><path d="M114 79v1.6M132 79v1.6" fill="none" stroke-width="1.4"/><path d="M108 66h30" fill="none" stroke-width="1"/>'),
    /* A house with two floors, cut open (stage units), and its garden on the left (x 0 to 30, a tree and flowers).
       Downstairs (floor at 86): the kitchen (x 30 to 90: stove and table) and the living room (90 to 150: a sofa,
       and the stairs going up on the right, from 124 to 148). Upstairs (floor at 52): the bedroom (30 to 90: a bed)
       and the bathroom (90 to 150: a shower). People stand at y 85 downstairs and 51 upstairs. */
    "en-house2": g('<rect width="160" height="90" fill="#cfeaf7" stroke="none"/><rect y="86" width="160" height="4" fill="#9ccc65"/><rect y="70" width="30" height="20" fill="#9ccc65" stroke="none"/>' +
      '<path d="M26 18L90 2l64 16z" fill="#c4673a"/>' +
      '<rect x="30" y="18" width="60" height="34" fill="#f6e3c6"/><rect x="90" y="18" width="60" height="34" fill="#dff1f7"/>' +
      '<rect x="30" y="52" width="60" height="34" fill="#fdf0d5"/><rect x="90" y="52" width="60" height="34" fill="#f3ead8"/>' +
      '<path d="M30 52h120" fill="none" stroke="' + INK + '" stroke-width="2"/><path d="M90 18v20M90 52v20" fill="none" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<path d="M30 18h120v68H30z" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
      // bedroom: a bed and a window
      '<rect x="40" y="24" width="12" height="9" fill="#9fd3f0"/><rect x="34" y="40" width="3" height="11" fill="#c98a4b"/><rect x="36" y="43" width="26" height="4" rx="1" fill="#fff"/><rect x="44" y="41.6" width="18" height="4" rx="1" fill="#5b9bd5"/><rect x="60" y="45" width="2.4" height="6" fill="#c98a4b"/>' +
      // bathroom: a shower with its water
      '<path d="M132 22v6h-6" fill="none" stroke="#8fa3b0" stroke-width="1.2"/><path d="M122 27h8l-1 2h-6z" fill="#8fa3b0"/><path d="M123 31v6M126 31v7M129 31v6" fill="none" stroke="#5fb3e0" stroke-width=".6" stroke-dasharray="1.2 1"/>' +
      '<rect x="118" y="46" width="18" height="5" rx="1" fill="#fff"/>' +
      // kitchen: a stove and a table
      '<rect x="72" y="66" width="14" height="19" fill="#e8eef2"/><circle cx="76" cy="68.6" r="1.3" fill="' + INK + '"/><circle cx="82" cy="68.6" r="1.3" fill="' + INK + '"/>' +
      '<rect x="36" y="72" width="22" height="2.4" fill="#b57638"/><path d="M38 74.4V85M56 74.4V85" fill="none" stroke="#a0683f" stroke-width="1.4"/>' +
      // living room: a sofa, and the stairs up to the first floor
      '<path d="M94 72h24v13H94z" fill="#e46b6b"/><rect x="92" y="75" width="4" height="10" rx="1" fill="#c45050"/><rect x="116" y="75" width="4" height="10" rx="1" fill="#c45050"/><rect x="94" y="66" width="24" height="7" rx="2" fill="#e46b6b"/>' +
      '<path d="M124 86v-6h4v-6h4v-6h4v-6h4v-6h4v-6h4" fill="#d6a46a" stroke="' + INK + '" stroke-width=".6"/>' +
      // the garden
      tree(14, 72, 0.7) + '<g stroke="none"><circle cx="6" cy="82" r="1.6" fill="#e46b8a"/><circle cx="12" cy="84" r="1.6" fill="#f2c14e"/><circle cx="22" cy="83" r="1.6" fill="#e46b8a"/></g>'),
    // A classroom wall with a green board (no writing on it) and the floor.
    "en-classroom": g('<rect width="160" height="62" fill="#f3ead8" stroke="none"/><rect x="34" y="8" width="92" height="34" rx="1" fill="#3f7a5a"/><path d="M34 8h92v34H34z" fill="none" stroke="#a0683f" stroke-width="2"/>' +
      '<rect x="60" y="42" width="40" height="2.4" fill="#a0683f"/><rect x="66" y="40.6" width="6" height="1.6" fill="#fff" stroke="none"/>' +
      '<rect y="60" width="160" height="30" fill="#e7c69c"/><path d="M0 60h160" fill="none"/>'),
    // A swimming pool's back wall and sky (stage units): put a swimmer next, then en-water in front.
    "en-pool": g('<rect width="160" height="62" fill="#cfeaf7" stroke="none"/><rect y="52" width="160" height="10" fill="#e8eef2"/><path d="M0 52h160" fill="none"/>' +
      '<rect y="62" width="160" height="28" fill="#3f9ad0" stroke="none"/>'),
    "en-sky-day": '<rect x="99" y="9" width="42" height="30" fill="#9fd3f0"/>',
    "en-sky-night": '<g><rect x="99" y="9" width="42" height="30" fill="#2c3e6b"/><g fill="#fff8d0"><circle cx="106" cy="15" r=".7"/><circle cx="134" cy="13" r=".6"/><circle cx="114" cy="31" r=".5"/><circle cx="128" cy="29" r=".7"/></g></g>',
    // A kitchen wall with a row of tiles, and the floor.
    "en-kitchen": g('<rect width="160" height="62" fill="#fdf0d5" stroke="none"/><g fill="#d8ecf2"><rect y="30" width="160" height="12"/></g>' +
      '<path d="M0 30h160M0 42h160M12 30v12M24 30v12M36 30v12M48 30v12M60 30v12M72 30v12M84 30v12M96 30v12M108 30v12M120 30v12M132 30v12M144 30v12" fill="none" stroke="#b9d3dc" stroke-width=".4"/>' +
      '<rect y="60" width="160" height="30" fill="#e7c69c"/><path d="M0 60h160" fill="none"/>')
  });

  /* ---------- for the Tree garden ---------- */
  Object.assign(B.RIG, {
    // A hedgehog from the side, facing right (origin: between its feet), 18 long: brown spines on its back, a
    // pale face with a black nose; head turns (to eat), legF / legB step.
    "en-hedgehog": (function () {
      var sp = "", n = 13;
      for (var i = 0; i <= n; i++) {
        var a = Math.PI * (1 - i / n * 0.86), r = i % 2 ? 7 : 9.6;
        sp += (i ? "L" : "M") + f(-1 + Math.cos(a) * r * 1.15) + " " + f(-4 - Math.sin(a) * r);
      }
      return g('<g data-part="legB" data-pivot="-5 -2"><path d="M-5-2.4v2.2" fill="none" stroke="' + INK + '" stroke-width="2.2"/><path d="M-5-2.4v2.2" fill="none" stroke="#7a5236" stroke-width="1.3"/></g>' +
        '<g data-part="legF" data-pivot="4 -2"><path d="M4-2.4v2.2" fill="none" stroke="' + INK + '" stroke-width="2.2"/><path d="M4-2.4v2.2" fill="none" stroke="#7a5236" stroke-width="1.3"/></g>' +
        '<path d="M-10-2.6c0-5 4-9 10-9 5 0 8.6 3.4 9 8.4l-1 .8H-9.4z" fill="#d9b48a"/>' +
        '<path d="' + sp + 'L7-4.6C5-2.4-6-2-10-3z" fill="#7a5236"/>' +
        '<g data-part="head" data-pivot="6 -5"><path d="M5.4-8.4c2.6 0 5 1.6 6.8 4.2.4.6 0 1.2-.6 1.2H5.2z" fill="#e8c9a0"/>' +
        '<circle cx="12.4" cy="-3.6" r=".9" fill="' + INK + '"/><circle cx="8.2" cy="-6" r=".55" fill="' + INK + '" stroke="none"/>' +
        '<path d="M6.2-8.6c.4-1.2 1.4-1.6 2.2-1" fill="#e8c9a0"/></g>');
    })(),
    // A wooden fence, as at a zoo (origin: its bottom left), 60 long and 14 tall: posts and two rails.
    "en-fence": g('<path d="M0-11h60v2.4H0zM0-5h60v2.4H0z" fill="#c98a4b"/>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        return '<path d="M' + (i * 9.6 + 0.4) + ' 0v-12.4l1.4-1.6 1.4 1.6V0z" fill="#d9a066"/>';
      }).join("")),
    // A height mark: a short red line with ends, put on top of someone's head (origin: its middle).
    "en-mark": g('<path d="M-8 0h16M-8-1.4v2.8M8-1.4v2.8" fill="none" stroke="#e0413a" stroke-width=".9"/>'),
    /* The ground of a world three stages wide, for a trip with the camera (stage units, x 0 to 520; the sky is the
       scene's bg, so far layers show behind it): grass with a river from x 176 to 320 behind the path, then the
       sand of a desert from x 330 with low dunes. */
    "en-world-land": g('<rect x="-40" y="64" width="380" height="26" fill="#9ccc65" stroke="none"/>' +
      '<path d="M330 64c20 3 40-2 60 1s40 2 60-1 40 1 70 0V90H316c4-9 10-18 14-26z" fill="#e9c98a"/>' +
      '<path d="M176 66.5q8-2 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0V76q-8 2-16 0t-16 0-16 0-16 0-16 0-16 0-16 0-16 0-16 0z" fill="#5fb3e0" stroke="#3f78b5" stroke-width=".5"/>' +
      '<path d="M176 70.5h6M206 72h7M238 70h6M268 72.4h7M296 70.6h5" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<path d="M360 74c8-3 18-3 26 0M420 80c10-3 22-3 32 0M470 72c8-2 16-2 24 0" fill="none" stroke="#d2ad6c" stroke-width=".8"/>'),
    // Far hills for the same trip, to put at depth 0.3 (stage units, x 0 to 280).
    "en-far-hills": g('<path d="M-20 64Q20 34 60 64Q100 40 140 64Q180 30 220 64Q250 44 290 64z" fill="#b7c99a" stroke="#8fa673" stroke-width=".5"/>'),
    // A railway station (stage units): the wall with tall arched windows, and the platform in front from y 80.
    "en-station": g('<rect width="160" height="80" fill="#f1e4cc" stroke="none"/>' + [12, 52, 92].map(function (x) {
        return '<path d="M' + x + ' 52V20a10 10 0 0 1 20 0v32z" fill="#cfeaf7"/><path d="M' + (x + 10) + ' 10v42M' + x + ' 34h20" fill="none" stroke-width=".5"/>';
      }).join("") + '<rect y="80" width="160" height="10" fill="#b8b2a7"/><path d="M0 81.4h160" fill="none" stroke="#f2c14e" stroke-width="1"/><path d="M0 80h160" fill="none"/>'),
    // A ticket (origin: its middle), 9 by 5, with a torn edge line.
    "en-ticket": g('<path d="M-4.5-2.5h9v1.6a.9.9 0 0 0 0 1.8v1.6h-9V.9a.9.9 0 0 0 0-1.8z" fill="#f2c14e"/><path d="M1.6-2.2v4.4" fill="none" stroke-width=".35" stroke-dasharray=".6 .5"/><path d="M-3.4-1h3.6M-3.4.6h2.6" fill="none" stroke-width=".4"/>'),
    // A picnic rug on the grass, seen a little from above (origin: its middle at the front), 44 wide.
    "en-rug": g('<path d="M-22 0l5-7h34l5 7z" fill="#e46b6b"/><path d="M-15-3.5h30M-10 0l2-7M0 0v-7M10 0l-2-7" fill="none" stroke="#fff" stroke-width=".5" opacity=".8"/>'),
    // A grey veil over half the stage, to dim one half of a two-part picture (stage units, 80 by 90).
    "en-dim-half": '<rect width="80" height="90" fill="#3d4650" opacity=".45"/>',
    // An airport runway under the sky (stage units): grass, the grey runway from y 66 to 80 with a dashed middle line.
    "en-runway": g('<rect y="62" width="160" height="28" fill="#9ccc65" stroke="none"/><rect y="66" width="160" height="14" fill="#7d838c"/>' +
      '<path d="M0 73h160" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="6 5"/><path d="M0 66h160M0 80h160" fill="none" stroke-width=".4"/>'),
    // A plane from the side, facing right (origin: under its wheels), 44 long: windows, a wing, the tail fin.
    "en-plane": g('<path d="M-20-9l-4-9h4l7 7z" fill="#5b9bd5"/><path d="M-22-12h34c6 0 10 2 12 4.6-2 2.6-6 3.4-12 3.4h-32c-2 0-3-1.4-3-3.4s1-4.6 1-4.6z" fill="#f4f6f8"/>' +
      '<path d="M18-11.4c2 .2 3.6 1 4.6 2.2h-5.2z" fill="#9fd3f0"/>' + [-14, -9, -4, 1, 6, 11].map(function (x) { return '<circle cx="' + x + '" cy="-9.6" r=".9" fill="#9fd3f0" stroke-width=".3"/>'; }).join("") +
      '<path d="M-4-6.6l-6 5h5l9-5z" fill="#5b9bd5"/><path d="M-6-4v2.6M10-4v2.6" fill="none" stroke-width=".5"/><circle cx="-6" cy="-1.2" r="1.2" fill="' + INK + '"/><circle cx="10" cy="-1.2" r="1.2" fill="' + INK + '"/>'),
    // A sticking plaster (origin: its middle), 5 long.
    "en-plaster": g('<rect x="-2.5" y="-1" width="5" height="2" rx="1" fill="#e8c39a" stroke-width=".35"/><rect x="-.9" y="-.7" width="1.8" height="1.4" fill="#f4dcc0" stroke="none"/>'),
    // A red cross over a picture, for "never" (origin: its middle), 14 across.
    "en-cross": g('<path d="M-7-7L7 7M7-7L-7 7" fill="none" stroke="#e0413a" stroke-width="1.8"/>', ' stroke="none"'),
    // A rug loom, seen from the front (origin: the middle of its top beam): two posts 66 tall, beams at the top and
    // bottom, and the warp threads between them. Draw en-rug-wall at the same place, after it.
    "en-loom": g('<rect x="-26" y="-2" width="4" height="68" fill="#a0683f"/><rect x="22" y="-2" width="4" height="68" fill="#a0683f"/>' +
      '<rect x="-27" y="-3" width="54" height="4" rx="1" fill="#b57638"/><rect x="-27" y="58" width="54" height="4" rx="1" fill="#b57638"/>' +
      '<path d="' + Array.apply(null, Array(21)).map(function (_, i) { return "M" + (-20 + i * 2) + " 1V58"; }).join("") + '" fill="none" stroke="#efe6d4" stroke-width=".35"/>'),
    // A rug hanging from its top edge (origin: the middle of the top), 40 wide and 56 long, red with a blue border
    // and a medallion; scale sy from near 0 to 1 to weave it row by row.
    "en-rug-wall": g('<rect x="-20" y="0" width="40" height="56" fill="#b23a3a"/><rect x="-17" y="3" width="34" height="50" fill="none" stroke="#2f4f8f" stroke-width="2.4"/>' +
      '<path d="M0 14l9 14-9 14-9-14z" fill="#f2c14e" stroke-width=".4"/><path d="M0 20l5 8-5 8-5-8z" fill="#2f4f8f" stroke="none"/>' +
      '<g fill="#f2c14e" stroke="none"><circle cx="-11" cy="10" r="1.6"/><circle cx="11" cy="10" r="1.6"/><circle cx="-11" cy="46" r="1.6"/><circle cx="11" cy="46" r="1.6"/></g>', ' stroke-width=".4"'),
    // The night over the whole stage: put it after the background (stage units).
    "en-night": '<rect width="160" height="90" fill="#1d2a52" opacity=".55"/>'
  });

  function paint(col) { return '<path d="' + B.EN_PAINT_PATH + '" fill="none" stroke="' + col + '" stroke-width="7" stroke-linecap="round"/>'; }
  function tree(x, y, s) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')"><path d="M-2.4 0c.8-8 .8-16 0-22h4.8c-.8 6-.8 14 0 22z" fill="#8a5a32"/>' +
      '<circle cy="-28" r="10" fill="#5a9a45"/><circle cx="7" cy="-22" r="7" fill="#5a9a45"/><circle cx="-7" cy="-22" r="7" fill="#5a9a45"/></g>';
  }
})();
