/* باغچه — drawings for the health lessons' animated scenes (step type `scene`, js/scene.js), added to B.RIG.
   Same house style as js/art/rig.js: flat picture-book shapes, warm colours, a dark outline, no text.

   Every name starts with "h-" (other subjects add their own drawings to B.RIG too).

   People have joints. A person from the side ("h-girl", "h-boy", "h-mom", "h-dad", "h-gran", …; facing right, flip
   to face left) has the pieces upper (everything above the hips, turning at the hips), head, eye, shut (closed eyes),
   mouth, open (open mouth), germs (little green germs on the near hand), armF > foreF (the near arm and its forearm), armB > foreB (the far arm), legF > shinF,
   legB > shinB. From the front ("h-girl-front", "h-boy-front") the arms are armL > foreL and armR > foreR (L is on the
   left of the stage) and the face has more pieces (see front()). From behind ("h-girl-back", "h-mom-back") the head
   turns with lookL / lookR. Lying on the floor seen from above: "h-girl-top" (up: face up, down: face down).
   Every person stands with its origin between its feet; all pieces start straight down (arms hanging).

   Poses: B.hpose(id, art, spec, at, dur, ease) gives the tracks that move a person's pieces into a pose, so a
   lesson never has to work out angles. spec: { armF: [x, y] (where the hand goes, in the drawing's own units; the
   elbow bends the natural way), armF: [x, y, -1] (bend the other way), legF: 30 (degrees), upper: 40, head: -10,
   … } or a named pose of that person (B.HPOSES[art][name]); B.hunpose stands a person straight again and
   B.hwalk swings the legs and arms. Things a person holds (a toothbrush, a tissue, a phone)
   are pieces inside the hand, drawn for one named pose and hidden until a track shows them ("girl.tissue", if the part is called girl). */
var B = window.B || {};
window.B = B;
B.RIG = B.RIG || {};

(function () {
  var INK = "#3d2c22", SKIN = "var(--skin,#f3c39b)";
  var O = ' stroke="' + INK + '" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  function hide(name, inner, pivot) {
    return '<g data-part="' + name + '"' + (pivot ? ' data-pivot="' + pivot + '"' : "") + ' style="opacity:0">' + inner + "</g>";
  }
  function piece(name, pivot, inner) { return '<g data-part="' + name + '" data-pivot="' + f(pivot[0]) + " " + f(pivot[1]) + '">' + inner + "</g>"; }
  // A limb: a thick round line with an outline.
  function limb(x1, y1, x2, y2, w, col) {
    var d = "M" + f(x1) + " " + f(y1) + "L" + f(x2) + " " + f(y2);
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + f(w + 1.2) + '"/>' +
      '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + f(w) + '"/>';
  }
  function shade(x1, y1, x2, y2, w) {
    return '<path d="M' + f(x1) + " " + f(y1) + "L" + f(x2) + " " + f(y2) + '" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="' + f(w) + '"/>';
  }

  // ---- angles: a piece turned by r degrees points "down" (0, 1) to (-sin r, cos r) ----
  function ang(dx, dy) { return Math.atan2(-dx, dy) * 180 / Math.PI; }
  function norm(a) { while (a > 180) a -= 360; while (a < -180) a += 360; return a; }
  function rot(p, c, deg) {
    var a = deg * Math.PI / 180, x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
  }
  // Two-joint reach: shoulder S, hand target H, arm lengths U and F; bend picks the side the elbow goes.
  function ik(S, H, U, F, bend) {
    var dx = H[0] - S[0], dy = H[1] - S[1], d = Math.hypot(dx, dy);
    d = Math.max(Math.abs(U - F) + 0.01, Math.min(d, U + F - 0.01));
    var a = Math.acos((U * U + d * d - F * F) / (2 * U * d)), base = Math.atan2(dy, dx) + bend * a;
    var E = [S[0] + U * Math.cos(base), S[1] + U * Math.sin(base)];
    var r1 = ang(E[0] - S[0], E[1] - S[1]), abs = ang(H[0] - E[0], H[1] - E[1]);
    return { r1: norm(r1), r2: norm(abs - r1) };
  }

  /* Geometry of every person drawing, for poses: GEO[art] = { arms: { F: {S, E, U, F, bend, under} }, hip }. */
  var GEO = {};
  B.HPOSES = {};
  // Angles for a spec ({ armF: [x, y], legF: 20, upper: 30, … }) on the person drawn as art.
  function angles(art, spec) {
    var geo = GEO[art], out = {};
    if (typeof spec === "string") spec = B.HPOSES[art][spec];
    Object.keys(spec).forEach(function (k) {
      var v = spec[k], arm = geo && geo.arms[k.replace(/^arm/, "")];
      if (Array.isArray(v) && arm && /^arm/.test(k)) {
        var H = [v[0], v[1]];
        // A hand target is in the drawing's own units; the shoulders turn with the upper body.
        if (arm.upper && spec.upper) H = rot(H, geo.hip, -spec.upper);
        var r = ik(arm.S, H, arm.U, arm.F, v[2] == null ? arm.bend : arm.bend * v[2]);
        out[k] = f(r.r1); out[arm.fore] = f(r.r2);
      } else out[k] = v;
    });
    return out;
  }
  B.hposeAngles = angles;
  // The tracks that move a person (part id) into a pose; pieces not named stay as they are.
  B.hpose = function (id, art, spec, at, dur, ease) {
    var a = angles(art, spec);
    return Object.keys(a).map(function (k) {
      var t = { id: id + "." + k, to: { r: a[k] }, at: at || 0, dur: dur == null ? 600 : dur };
      if (ease) t.ease = ease;
      return t;
    });
  };
  // Back to standing straight (every joint at 0).
  B.hunpose = function (id, art, at, dur) {
    var z = {};
    GEO[art].joints.forEach(function (k) { z[k] = 0; });
    return B.hpose(id, art, z, at, dur);
  };
  /* Walking (or running) on the spot: the legs and arms swing, steps times, in dur ms. Move the part itself
     with its own track at the same time. */
  B.hwalk = function (id, at, dur, steps, run) {
    var leg = run ? 34 : 22, arm = run ? 40 : 20, n = (steps || 4) * 2;
    var t = [
      { id: id + ".legF", to: { r: -leg }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".legB", to: { r: leg }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".armF", to: { r: arm }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".armB", to: { r: -arm }, at: at, dur: dur, yoyo: true, times: n }
    ];
    if (run) t.push({ id: id + ".shinB", to: { r: 50 }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".foreF", to: { r: -60 }, at: at, dur: dur, yoyo: true, times: n });
    return t;
  };

  var KID = { thigh: 6, shin: 6.2, torso: 10, upper: 5, fore: 4.6, head: 5.4, legW: 2.7, armW: 2.2, body: 3.4 };
  var BIG = { thigh: 10.5, shin: 10.5, torso: 15, upper: 7.6, fore: 6.8, head: 6.2, legW: 3.1, armW: 2.5, body: 4.2 };

  // ---------------- a person from the side, facing right ----------------
  function hairSide(style, c, r, col) {
    var x = c[0], y = c[1], P = function (a, b) { return f(x + a * r) + " " + f(y + b * r); };
    var cap = '<path d="M' + P(0.78, -0.52) + "C" + P(0.55, -1.32) + " " + P(-1.35, -1.25) + " " + P(-1.02, 0.35) + "L" + P(-0.55, 0.42) +
      "C" + P(-0.45, -0.25) + " " + P(0.05, -0.62) + " " + P(0.78, -0.52) + 'z" fill="' + col + '"/>';
    if (style === "long") return { back: '<path d="M' + P(-0.7, -0.6) + "C" + P(-1.5, 0.2) + " " + P(-1.45, 1.4) + " " + P(-0.75, 1.75) +
      "L" + P(-0.1, 1.3) + "C" + P(-0.4, 0.6) + " " + P(-0.3, 0) + " " + P(-0.1, -0.4) + 'z" fill="' + col + '"/>', front: cap };
    if (style === "pony") return { back: '<path d="M' + P(-0.95, -0.35) + "c" + f(-r * 0.7) + " " + f(r * 0.1) + " " + f(-r * 0.9) + " " + f(r * 0.9) + " " + f(-r * 0.5) + " " + f(r * 1.5) +
      "c" + f(r * 0.3) + " " + f(-r * 0.4) + " " + f(r * 0.5) + " " + f(-r * 0.9) + " " + f(r * 0.5) + " " + f(-r * 1.3) + 'z" fill="' + col + '"/>' +
      '<circle cx="' + f(x - 0.95 * r) + '" cy="' + f(y - 0.35 * r) + '" r=".7" fill="#e5483f"/>', front: cap };
    if (style === "scarf") return {
      back: '<path d="M' + P(0.62, -0.95) + "C" + P(-0.4, -1.6) + " " + P(-1.5, -0.8) + " " + P(-1.3, 0.6) + "C" + P(-1.25, 1.4) + " " + P(-0.9, 1.9) + " " + P(-0.2, 2.1) +
        "L" + P(0.9, 1.95) + "C" + P(0.9, 1.3) + " " + P(0.7, 1.05) + " " + P(0.45, 0.9) + 'z" fill="' + col + '"/>',
      front: '<path d="M' + P(0.62, -0.95) + "C" + P(0.3, -0.6) + " " + P(0.2, 0.3) + " " + P(0.45, 0.9) + "L" + P(0.1, 1.05) + "C" + P(-0.3, 0.3) + " " + P(-0.2, -0.7) + " " + P(0.62, -0.95) + 'z" fill="' + col + '"/>' };
    if (style === "bun") return { back: '<circle cx="' + f(x - 0.9 * r) + '" cy="' + f(y - 0.8 * r) + '" r="' + f(r * 0.42) + '" fill="' + col + '"/>', front: cap };
    return { back: "", front: cap };
  }
  /* Hair: "auto" (with kind girl | woman | grandma) lets B.headscarf (js/art/rig.js) decide, fixed per character
     (key, or the drawing's name; the front and back views of one person share a key): a headscarf in scarfCol,
     or long hair (a grey bun for a grandmother) in hairCol. */
  function hairOf(o) {
    if (o.hair !== "auto") return { style: o.hair || "short", col: o.hairCol || "#4a2f1f" };
    var scarf = B.headscarf ? B.headscarf(o.key || o.name, o.kind) : false;
    if (scarf) return { style: "scarf", col: o.scarfCol || "#3fb0a8" };
    return { style: o.kind === "grandma" ? "bun" : (o.longStyle || "long"), col: o.hairCol || (o.kind === "grandma" ? "#d9d4cc" : "#4a2f1f") };
  }
  function side(o) {
    var K = o.adult ? BIG : KID;
    var ank = -1.2, knee = ank - K.shin, hip = knee - K.thigh, neck = hip - K.torso;
    var S = [0.2, neck + 1.9], E = [0.2, S[1] + K.upper], W = [0.2, E[1] + K.fore];
    var hr = K.head, Hc = [0.9, neck - hr * 0.82];
    var shirt = o.shirt || "#5b9bd5", pants = o.pants || "#3f6f8f", shoe = o.shoes || "#e5483f", skin = o.skin || SKIN;
    var shin = o.shorts ? skin : pants, fore = o.long ? shirt : skin;
    var geo = { hip: [0, hip], arms: {}, joints: ["upper", "head", "armF", "foreF", "armB", "foreB", "legF", "shinF", "legB", "shinB"] };
    geo.arms.F = { S: S, U: K.upper, F: K.fore, bend: 1, upper: true, fore: "foreF" };
    geo.arms.B = { S: S, U: K.upper, F: K.fore, bend: 1, upper: true, fore: "foreB" };
    GEO[o.name] = geo;
    B.HPOSES[o.name] = o.poses || {};

    function leg(n, back) {
      var shoeP = '<path d="M-1.5 ' + f(ank - 0.7) + "h2.4c1.6 0 2.8.7 2.8 1.5v.4h-5.2z" + '" fill="' + shoe + '"/>';
      return piece("leg" + n, [0, hip], limb(0, hip, 0, knee, K.legW, pants) + (back ? shade(0, hip, 0, knee, K.legW) : "") +
        piece("shin" + n, [0, knee], limb(0, knee, 0, ank, K.legW * 0.92, shin) + (back ? shade(0, knee, 0, ank, K.legW * 0.92) : "") + shoeP));
    }
    // Things held in the near hand: each drawn where it is in its pose, and carried back to the hanging hand.
    function held(n) {
      return (o.hold || []).filter(function (h) { return (h.arm || "F") === n; }).map(function (h) {
        var spec = typeof h.pose === "string" ? B.HPOSES[o.name][h.pose] : h.pose;
        var a = angles(o.name, spec), up = spec.upper || 0;
        var t = "rotate(" + f(-a["fore" + n]) + " " + f(E[0]) + " " + f(E[1]) + ") rotate(" + f(-a["arm" + n]) + " " + f(S[0]) + " " + f(S[1]) + ")" +
          (up ? " rotate(" + f(-up) + " 0 " + f(hip) + ")" : "");
        return hide(h.name, '<g transform="' + t + '">' + h.svg + "</g>");
      }).join("");
    }
    function arm(n, back) {
      var hand = '<circle cx="' + f(W[0]) + '" cy="' + f(W[1] + 0.5) + '" r="' + f(K.armW * 0.62) + '" fill="' + skin + '"/>';
      return piece("arm" + n, S, limb(S[0], S[1], E[0], E[1], K.armW, shirt) + (back ? shade(S[0], S[1], E[0], E[1], K.armW) : "") +
        piece("fore" + n, E, limb(E[0], E[1], W[0], W[1], K.armW * 0.92, fore) + (back ? shade(E[0], E[1], W[0], W[1], K.armW * 0.92) : "") +
          held(n) + hand + (back ? "" : hide("germs", '<g fill="#8bc34a" stroke-width=".25"><circle cx="' + f(W[0] - 1) + '" cy="' + f(W[1] + 0.2) + '" r=".55"/><circle cx="' + f(W[0] + 0.9) + '" cy="' + f(W[1] + 1) + '" r=".5"/><circle cx="' + f(W[0] + 0.2) + '" cy="' + f(W[1] + 1.6) + '" r=".45"/></g>') + hide("fist", '<path d="M' + f(W[0] + 0.4) + " " + f(W[1] - 0.3) + "v1.6" + '" fill="none" stroke-width=".35"/>'))));
    }
    var HO = hairOf(o), H = hairSide(HO.style, Hc, hr, HO.col);
    var body = o.dress
      ? '<path d="M' + f(-K.body) + " " + f(neck + 2.6) + "c0-2 1.6-2.8 " + f(K.body) + " -2.8s" + f(K.body) + " .8 " + f(K.body) + " 2.8l1.6 " + f(K.torso + K.thigh * 0.55) + "h" + f(-K.body * 2 - 3.2) + 'z" fill="' + shirt + '"/>'
      : '<path d="M' + f(-K.body + 0.2) + " " + f(hip + 1.6) + "v" + f(-(K.torso - 4.2)) + "c0-2 1.6-2.8 " + f(K.body - 0.1) + " -2.8s" + f(K.body) + " .8 " + f(K.body) + " 2.8v" + f(K.torso - 4.2) + 'z" fill="' + shirt + '"/>';
    var eye = [Hc[0] + hr * 0.5, Hc[1] - hr * 0.12], mouth = [Hc[0] + hr * 0.72, Hc[1] + hr * 0.5];
    var head = piece("head", [0.4, neck + 0.6],
      '<rect x="-.9" y="' + f(neck - 1.4) + '" width="2.4" height="2.6" fill="' + skin + '"/>' + H.back +
      '<circle cx="' + f(Hc[0]) + '" cy="' + f(Hc[1]) + '" r="' + f(hr) + '" fill="' + skin + '"/>' +
      '<path d="M' + f(Hc[0] + hr * 0.96) + " " + f(Hc[1] - 0.6) + "q1.3 .9 .1 1.7" + '" fill="' + skin + '"/>' +
      '<circle cx="' + f(Hc[0] - hr * 0.12) + '" cy="' + f(Hc[1] + 0.4) + '" r="' + f(hr * 0.22) + '" fill="' + skin + '"/>' +
      '<circle cx="' + f(Hc[0] + hr * 0.42) + '" cy="' + f(Hc[1] + hr * 0.32) + '" r="' + f(hr * 0.17) + '" fill="#f28baa" stroke="none" opacity=".5"/>' +
      (o.beard ? '<path d="M' + f(Hc[0] - hr * 0.2) + " " + f(Hc[1] + hr * 0.2) + "c.4 " + f(hr) + " " + f(hr * 0.9) + " " + f(hr * 1.1) + " " + f(hr * 1.15) + " " + f(hr * 0.35) + "c-.4-.3-.9-.2-1.3 0-.5-.3-1.4-.3-2 .1-.8-.3-1.6-.3-2.2-.6z" + '" fill="' + HO.col + '"/>' : "") +
      '<g data-part="eye"><ellipse cx="' + f(eye[0]) + '" cy="' + f(eye[1]) + '" rx=".55" ry=".75" fill="' + INK + '" stroke="none"/></g>' +
      hide("shut", '<path d="M' + f(eye[0] - 0.7) + " " + f(eye[1]) + "q.7 .6 1.4 0" + '" fill="none" stroke-width=".45"/>') +
      '<g data-part="mouth"><path d="M' + f(mouth[0] - 0.9) + " " + f(mouth[1] - 0.2) + "q.7 .7 1.4 .1" + '" fill="none" stroke-width=".45"/></g>' +
      hide("open", '<ellipse cx="' + f(mouth[0] - 0.2) + '" cy="' + f(mouth[1]) + '" rx=".75" ry=".95" fill="#9c3f33" stroke-width=".4"/>', f(mouth[0]) + " " + f(mouth[1])) +
      (o.glasses ? '<circle cx="' + f(eye[0]) + '" cy="' + f(eye[1]) + '" r="1.3" fill="none" stroke-width=".4"/><path d="M' + f(eye[0] - 1.3) + " " + f(eye[1]) + "h" + f(-hr * 0.5) + '" fill="none" stroke-width=".4"/>' : "") +
      H.front + (o.cap ? o.cap(Hc, hr) : ""));
    var upper = piece("upper", [0, hip], arm("B", true) + body + (o.extra || "") + head + arm("F"));
    return g(leg("B", true) + leg("F") + upper);
  }

  // ---------------- a child from the front ----------------
  function front(o) {
    var K = o.adult ? BIG : KID;
    var ank = -1.2, hip = ank - K.shin - K.thigh, neck = hip - K.torso;
    var hr = K.head * 1.05, Hc = [0, neck - hr * 0.8];
    var shirt = o.shirt || "#5b9bd5", pants = o.pants || "#3f6f8f", shoe = o.shoes || "#e5483f", skin = SKIN;
    var SL = [-K.body - 0.6, neck + 2], SR = [K.body + 0.6, neck + 2];
    var geo = { hip: [0, hip], arms: {}, joints: ["head", "armL", "foreL", "armR", "foreR", "legL", "legR"] };
    geo.arms.L = { S: SL, U: K.upper, F: K.fore, bend: -1, fore: "foreL" };
    geo.arms.R = { S: SR, U: K.upper, F: K.fore, bend: 1, fore: "foreR" };
    GEO[o.name] = geo;
    B.HPOSES[o.name] = o.poses || {};
    function leg(n, x, dx) {
      return piece("leg" + n, [x, hip], limb(x, hip, x, ank - 0.4, K.legW, pants) +
        (o.shorts ? limb(x, hip + K.thigh * 0.8, x, ank - 0.4, K.legW * 0.9, skin) : "") +
        '<ellipse cx="' + f(x + dx) + '" cy="' + f(ank + 0.3) + '" rx="2.1" ry="1.2" fill="' + shoe + '"/>');
    }
    function arm(n, S) {
      var E = [S[0], S[1] + K.upper], W = [S[0], E[1] + K.fore], hand = '<circle cx="' + f(W[0]) + '" cy="' + f(W[1] + 0.5) + '" r="' + f(K.armW * 0.66) + '" fill="' + skin + '"/>';
      var held = (o.hold || []).filter(function (h) { return h.arm === n; }).map(function (h) {
        var a = angles(o.name, typeof h.pose === "string" ? B.HPOSES[o.name][h.pose] : h.pose);
        return hide(h.name, '<g transform="rotate(' + f(-a["fore" + n]) + " " + f(E[0]) + " " + f(E[1]) + ") rotate(" + f(-a["arm" + n]) + " " + f(S[0]) + " " + f(S[1]) + ')">' + h.svg + "</g>");
      }).join("");
      // a fist (knuckles) and an open hand, palm out, fingers along the forearm, for "stop"
      var fist = hide("fist" + n, '<circle cx="' + f(W[0]) + '" cy="' + f(W[1] + 0.5) + '" r="' + f(K.armW * 0.72) + '" fill="' + skin + '"/><path d="M' + f(W[0] - 0.9) + " " + f(W[1] + 0.9) + "h1.8M" + f(W[0] - 0.9) + " " + f(W[1] + 0.2) + "h1.8" + '" fill="none" stroke-width=".3"/>');
      var palm = hide("palm" + n, [-1.1, -0.37, 0.37, 1.1].map(function (dx, i) {
        return '<rect x="' + f(W[0] + dx - 0.36) + '" y="' + f(W[1] + 0.6) + '" width=".72" height="' + (i === 0 || i === 3 ? 2.2 : 2.7) + '" rx=".36" fill="' + skin + '" stroke-width=".3"/>';
      }).join("") + '<circle cx="' + f(W[0]) + '" cy="' + f(W[1] + 0.6) + '" r="1.5" fill="' + skin + '" stroke-width=".3"/>' +
        '<rect x="' + f(W[0] + (n === "L" ? 1 : -1.7)) + '" y="' + f(W[1] - 0.2) + '" width=".7" height="1.8" rx=".35" fill="' + skin + '" stroke-width=".3" transform="rotate(' + (n === "L" ? -40 : 40) + " " + f(W[0]) + " " + f(W[1]) + ')"/>');
      return piece("arm" + n, S, limb(S[0], S[1], E[0], E[1], K.armW, shirt) +
        piece("fore" + n, E, limb(E[0], E[1], W[0], W[1], K.armW * 0.92, skin) + held + '<g data-part="hand' + n + '">' + hand + "</g>" + fist + palm));
    }
    var x = Hc[0], y = Hc[1], P = function (a, b) { return f(x + a * hr) + " " + f(y + b * hr); };
    var HO = hairOf(o), hairCol = HO.col;
    var hairBack = HO.style === "long" ? '<path d="M' + P(-0.95, -0.2) + "C" + P(-1.3, 0.8) + " " + P(-1.2, 1.5) + " " + P(-0.8, 1.7) + "H" + f(x + 0.8 * hr) + "C" + P(1.2, 1.5) + " " + P(1.3, 0.8) + " " + P(0.95, -0.2) + 'z" fill="' + hairCol + '"/>' : "";
    var hairTop = '<path d="M' + P(-1.02, 0.15) + "C" + P(-1.15, -1.1) + " " + P(1.15, -1.1) + " " + P(1.02, 0.15) + "C" + P(0.75, -0.25) + " " + P(0.4, -0.55) + " " + P(0.1, -0.5) +
      "C" + P(-0.2, -0.3) + " " + P(-0.7, -0.3) + " " + P(-1.02, 0.15) + 'z" fill="' + hairCol + '"/>';
    if (HO.style === "scarf") {
      // a headscarf: round the face, falling onto the shoulders, and its edge across the forehead
      hairBack = '<path d="M' + P(-1.2, 0) + "C" + P(-1.25, -1.35) + " " + P(1.25, -1.35) + " " + P(1.2, 0) + "C" + P(1.25, 0.9) + " " + P(1.5, 1.5) + " " + P(1.4, 1.9) +
        "H" + f(x - 1.4 * hr) + "C" + P(-1.5, 1.5) + " " + P(-1.25, 0.9) + " " + P(-1.2, 0) + 'z" fill="' + hairCol + '"/>';
      hairTop = '<path d="M' + P(-0.98, -0.1) + "C" + P(-0.9, -1.1) + " " + P(0.9, -1.1) + " " + P(0.98, -0.1) + "C" + P(0.7, -0.62) + " " + P(-0.7, -0.62) + " " + P(-0.98, -0.1) + 'z" fill="' + hairCol + '"/>';
    }
    var ex = hr * 0.38, ey = y - hr * 0.05, my = y + hr * 0.45;
    var D = function (a, b) { return f(a) + " " + f(b); };
    var face =
      '<g data-part="eyes"><g data-part="pupils" stroke="none" fill="' + INK + '"><ellipse cx="' + f(-ex) + '" cy="' + f(ey) + '" rx=".6" ry=".8"/><ellipse cx="' + f(ex) + '" cy="' + f(ey) + '" rx=".6" ry=".8"/></g></g>' +
      hide("wide", '<g fill="#fff" stroke-width=".35"><circle cx="' + f(-ex) + '" cy="' + f(ey) + '" r="1.25"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r="1.25"/></g><g fill="' + INK + '" stroke="none"><circle cx="' + f(-ex) + '" cy="' + f(ey) + '" r=".6"/><circle cx="' + f(ex) + '" cy="' + f(ey) + '" r=".6"/></g>') +
      hide("shut", '<path d="M' + D(-ex - 0.8, ey) + "q.8 .7 1.6 0M" + D(ex - 0.8, ey) + "q.8 .7 1.6 0" + '" fill="none" stroke-width=".45"/>') +
      hide("browsDown", '<path d="M' + D(-ex - 1, ey - 1.9) + "l2 .9M" + D(ex + 1, ey - 1.9) + "l-2 .9" + '" fill="none" stroke-width=".55"/>') +
      hide("browsUp", '<path d="M' + D(-ex - 1, ey - 1.2) + "l2-.8M" + D(ex + 1, ey - 1.2) + "l-2-.8" + '" fill="none" stroke-width=".5"/>') +
      hide("browsHigh", '<path d="M' + D(-ex - 1, ey - 2) + "q1-.8 2 0M" + D(ex - 1, ey - 2) + "q1-.8 2 0" + '" fill="none" stroke-width=".45"/>') +
      '<path d="M' + D(-0.4, y + 0.6) + "q.4 .5.8 0" + '" fill="none" stroke-width=".4"/>' +
      '<g fill="#f28baa" stroke="none" opacity=".5"><circle cx="' + f(-hr * 0.6) + '" cy="' + f(y + hr * 0.3) + '" r="' + f(hr * 0.17) + '"/><circle cx="' + f(hr * 0.6) + '" cy="' + f(y + hr * 0.3) + '" r="' + f(hr * 0.17) + '"/></g>' +
      hide("flush", '<ellipse cx="0" cy="' + f(y + hr * 0.15) + '" rx="' + f(hr * 0.92) + '" ry="' + f(hr * 0.7) + '" fill="#e5483f" stroke="none" opacity=".35"/>') +
      '<g data-part="mouth"><path d="M' + D(-1.3, my - 0.3) + "q1.3 1.2 2.6 0" + '" fill="none" stroke-width=".5"/></g>' +
      hide("grin", '<path d="M' + D(-1.8, my - 0.6) + "h3.6c0 1.6-.8 2.3-1.8 2.3s-1.8-.7-1.8-2.3z" + '" fill="#9c3f33" stroke-width=".45"/><path d="M' + D(-1.5, my - 0.5) + "h3v.6h-3z" + '" fill="#fff" stroke="none"/>') +
      hide("open", '<ellipse cx="0" cy="' + f(my + 0.2) + '" rx=".9" ry="1.1" fill="#9c3f33" stroke-width=".45"/>', "0 " + f(my + 0.2)) +
      hide("sad", '<path d="M' + D(-1.2, my + 0.6) + "q1.2-1 2.4 0" + '" fill="none" stroke-width=".5"/>') +
      hide("tight", '<path d="M' + D(-1.2, my + 0.3) + "h2.4" + '" fill="none" stroke-width=".55"/>') +
      hide("tear", '<path d="M' + D(-ex, ey + 1.2) + "c-.6.9-.8 1.4-.8 1.8a.8 .8 0 0 0 1.6 0c0-.4-.2-.9-.8-1.8z" + '" fill="#9fd3f0" stroke-width=".3"/>');
    var head = piece("head", [0, neck + 0.5], '<rect x="-1.2" y="' + f(neck - 1.6) + '" width="2.4" height="2.8" fill="' + skin + '"/>' + hairBack +
      '<circle cx="' + f(-hr) + '" cy="' + f(y + 0.4) + '" r="' + f(hr * 0.22) + '" fill="' + skin + '"/><circle cx="' + f(hr) + '" cy="' + f(y + 0.4) + '" r="' + f(hr * 0.22) + '" fill="' + skin + '"/>' +
      '<circle cx="0" cy="' + f(y) + '" r="' + f(hr) + '" fill="' + skin + '"/>' + face + hairTop);
    var body = '<path d="M' + f(-K.body) + " " + f(hip + 1.4) + "v" + f(-(K.torso - 4)) + "c0-2 1.6-2.7 " + f(K.body) + " -2.7s" + f(K.body) + " .7 " + f(K.body) + " 2.7v" + f(K.torso - 4) + 'z" fill="' + shirt + '"/>';
    // Glows that show where a feeling is in the body, and the parts the underwear covers. All hidden at first.
    var glow = function (name, cx, cy, rx, ry, col) { return hide(name, '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + col + '" stroke="none" opacity=".55"/>', f(cx) + " " + f(cy)); };
    var heartAt = [-1.4, neck + 4.6];
    var throat = glow("glowThroat", 0, neck + 1.9, 2.4, 1.3, "#5b8fd6");
    var marks =
      hide("heart", '<path d="M' + D(heartAt[0], heartAt[1] + 1.4) + "c-2.2-1.4-2.6-2.6-2-3.3.5-.6 1.5-.5 2 .3.5-.8 1.5-.9 2-.3.6.7.2 1.9-2 3.3z" + '" fill="#e5483f" stroke-width=".35"/>', D(heartAt[0], heartAt[1])) +
      hide("private", '<path d="M' + D(-K.body - 0.3, hip - 1.4) + "h" + f(K.body * 2 + 0.6) + "v1.6c-1.3.4-2.3 1.4-2.6 3.2h-" + f(K.body * 2 - 4.6) + "c-.3-1.8-1.3-2.8-2.6-3.2z" + '" fill="#8ed1c6" stroke="#2f8f83" stroke-width=".55" stroke-dasharray="1.2 .8"/>');
    var all = hide("glowAll", '<ellipse cx="0" cy="' + f((hip + neck) / 2 - 2) + '" rx="' + f(K.body + 8) + '" ry="' + f(-neck * 0.62 + 4) + '" fill="#fde68a" stroke="none" opacity=".7"/>');
    return g(all + leg("L", -1.9, -0.6) + leg("R", 1.9, 0.6) + body + marks + head + throat + arm("L", SL) + arm("R", SR));
  }

  // ---------------- a person from behind (looking the way we look) ----------------
  function back(o) {
    var K = o.adult ? BIG : KID;
    var ank = -1.2, hip = ank - K.shin - K.thigh, neck = hip - K.torso;
    var hr = K.head * 1.05, Hc = [0, neck - hr * 0.8];
    var shirt = o.shirt || "#5b9bd5", pants = o.pants || "#3f6f8f", skin = SKIN, HO = hairOf(o), hair = HO.col;
    var SL = [-K.body - 0.6, neck + 2], SR = [K.body + 0.6, neck + 2];
    var geo = { hip: [0, hip], arms: {}, joints: ["head", "armL", "foreL", "armR", "foreR", "legL", "legR"] };
    geo.arms.L = { S: SL, U: K.upper, F: K.fore, bend: 1, fore: "foreL" };
    geo.arms.R = { S: SR, U: K.upper, F: K.fore, bend: -1, fore: "foreR" };
    GEO[o.name] = geo;
    function leg(n, x) {
      return piece("leg" + n, [x, hip], limb(x, hip, x, ank - 0.4, K.legW, o.dress ? skin : pants) + '<ellipse cx="' + f(x) + '" cy="' + f(ank + 0.2) + '" rx="1.7" ry="1.1" fill="' + (o.shoes || "#e5483f") + '"/>');
    }
    function arm(n, S) {
      var E = [S[0], S[1] + K.upper], W = [S[0], E[1] + K.fore];
      return piece("arm" + n, S, limb(S[0], S[1], E[0], E[1], K.armW, shirt) +
        piece("fore" + n, E, limb(E[0], E[1], W[0], W[1], K.armW * 0.92, o.long ? shirt : skin) + '<circle cx="' + f(W[0]) + '" cy="' + f(W[1] + 0.5) + '" r="' + f(K.armW * 0.64) + '" fill="' + skin + '"/>'));
    }
    var x = Hc[0], y = Hc[1];
    // Turning the head: the cheek, nose and eye come round on that side.
    var look = function (n, s) {
      return hide(n, '<ellipse cx="' + f(x + s * hr * 0.74) + '" cy="' + f(y + 0.6) + '" rx="' + f(hr * 0.4) + '" ry="' + f(hr * 0.56) + '" fill="' + skin + '"/>' +
        '<path d="M' + f(x + s * hr * 1.08) + " " + f(y - 0.3) + "q" + f(s * 1.1) + " .7 0 1.5" + '" fill="' + skin + '"/>' +
        '<ellipse cx="' + f(x + s * hr * 0.86) + '" cy="' + f(y - 0.4) + '" rx=".35" ry=".55" fill="' + INK + '" stroke="none"/>');
    };
    var scarf = HO.style === "scarf";
    var head = piece("head", [0, neck + 0.5], '<rect x="-1.2" y="' + f(neck - 1.6) + '" width="2.4" height="2.8" fill="' + skin + '"/>' +
      '<circle cx="' + f(-hr) + '" cy="' + f(y + 0.4) + '" r="' + f(hr * 0.22) + '" fill="' + skin + '"/><circle cx="' + f(hr) + '" cy="' + f(y + 0.4) + '" r="' + f(hr * 0.22) + '" fill="' + skin + '"/>' +
      '<circle cx="0" cy="' + f(y) + '" r="' + f(hr) + '" fill="' + skin + '"/>' +
      (scarf ? '<path d="M' + f(-hr * 1.12) + " " + f(y) + "a" + f(hr * 1.12) + " " + f(hr * 1.12) + " 0 0 1 " + f(hr * 2.24) + " 0c0 " + f(hr) + " .6 " + f(hr * 1.6) + " 1 " + f(hr * 2.2) + "h" + f(-hr * 2.24 - 2) + "c.4-" + f(hr * 0.6) + " 1-" + f(hr * 1.2) + " 1-" + f(hr * 2.2) + 'z" fill="' + hair + '"/>'
        : '<path d="M' + f(-hr * 1.02) + " " + f(y + 0.4) + "a" + f(hr * 1.02) + " " + f(hr * 1.06) + " 0 1 1 " + f(hr * 2.04) + " 0c-.4 " + f(hr * 0.5) + "-1 " + f(hr * 0.7) + "-" + f(hr * 1.02) + " " + f(hr * 0.75) + "s-" + f(hr * 0.62) + "-.25-" + f(hr * 1.02) + "-" + f(hr * 0.75) + 'z" fill="' + hair + '"/>' +
          (HO.style === "long" || HO.style === "bun" ? '<path d="M' + f(-hr * 0.8) + " " + f(y + 0.6) + "c-.4 " + f(hr) + " 0 " + f(hr * 1.5) + " .4 " + f(hr * 1.7) + "h" + f(hr * 1.6 - 0.8) + "c.4-.2.8-" + f(hr * 0.7) + " .4-" + f(hr * 1.7) + 'z" fill="' + hair + '"/>' : "")) + look("lookL", -1) + look("lookR", 1));
    var body = o.dress
      ? '<path d="M' + f(-K.body) + " " + f(neck + 2.6) + "c0-2 1.6-2.8 " + f(K.body) + " -2.8s" + f(K.body) + " .8 " + f(K.body) + " 2.8l1.6 " + f(K.torso + K.thigh * 0.55) + "h" + f(-K.body * 2 - 3.2) + 'z" fill="' + shirt + '"/>'
      : '<path d="M' + f(-K.body) + " " + f(hip + 1.4) + "v" + f(-(K.torso - 4)) + "c0-2 1.6-2.7 " + f(K.body) + " -2.7s" + f(K.body) + " .7 " + f(K.body) + " 2.7v" + f(K.torso - 4) + 'z" fill="' + shirt + '"/>';
    return g(leg("L", -1.9) + leg("R", 1.9) + body + head + arm("L", SL) + arm("R", SR));
  }

  // ---------------- a child lying on the floor, seen from above (head to the left; origin: the middle) ----------------
  function top(o) {
    var shirt = o.shirt, pants = o.pants, hair = o.hairCol || "#4a2f1f";
    var bodyT = function (face) {
      return limb(2, -2, 12.5, -2.6, 2.8, pants) + limb(2, 2, 12.5, 2.6, 2.8, pants) +
        '<ellipse cx="13.6" cy="-2.7" rx="1.2" ry="1.6" fill="' + (o.shoes || "#e5483f") + '"/><ellipse cx="13.6" cy="2.7" rx="1.2" ry="1.6" fill="' + (o.shoes || "#e5483f") + '"/>' +
        '<rect x="-8.5" y="-4.4" width="11.5" height="8.8" rx="3" fill="' + shirt + '"/>' +
        (face
          ? limb(-6.5, -4.6, -10.5, -2.4, 2.2, shirt) + limb(-6.5, 4.6, -10.5, 2.4, 2.2, shirt) +
            '<circle cx="-13" cy="0" r="5" fill="' + SKIN + '"/><path d="M-16.8-3.2a5 5 0 0 1 0 6.4c-1-1-1.4-2-1.4-3.2s.4-2.2 1.4-3.2z" fill="' + hair + '"/>' +
            '<circle cx="-12" cy="-1.8" r="1.6" fill="' + SKIN + '"/><circle cx="-12" cy="1.8" r="1.6" fill="' + SKIN + '"/><path d="M-13.2-1.8h2.4M-13.2 1.8h2.4" fill="none" stroke-width=".3"/>'
          : limb(-6.5, -4.6, -10.5, -2.6, 2.2, shirt) + limb(-6.5, 4.6, -10.5, 2.6, 2.2, shirt) +
            '<circle cx="-13" cy="0" r="5" fill="' + hair + '"/><circle cx="-12" cy="-2.6" r="1.4" fill="' + SKIN + '"/><circle cx="-12" cy="2.6" r="1.4" fill="' + SKIN + '"/>');
    };
    return g('<g data-part="up">' + bodyT(true) + "</g>" + hide("down", bodyT(false)));
  }

  /* ---------------- the people ---------------- */
  var R = B.RIG;
  // Poses with things in the hand (in each drawing's own units).
  var GIRL = { name: "h-girl", hair: "auto", kind: "girl", longStyle: "pony", shirt: "#f28baa", pants: "#5b6fb5", shoes: "#5a9a45",
    poses: {
      face: { armF: [4.6, -24.3], head: 8 },           // a tissue in front of the mouth and nose
      elbow: { armF: [2.4, -29.5, -1], head: 14 },     // the face in the crook of the elbow
      show: { armF: [8.2, -19.6] },                    // showing something in the hand
      ear: { armF: [2.6, -28.6], head: -4 },           // a phone at the ear
      talk: { armF: [6, -15.8] }
    },
    hold: [
      { name: "tissue", pose: "face", svg: '<path d="M4.6-27.6c1.6-.4 2.8.2 3.2 1.4.6 1.6.4 3.2-.4 4.2-1.2.6-2.4.4-3.2-.2-.6-1.6-.6-3.8.4-5.4z" fill="#fff" stroke-width=".4"/>' },
      { name: "card", pose: "show", svg: '<g transform="rotate(-8 9.6 -22)"><rect x="7.2" y="-25.2" width="5.6" height="4" rx=".5" fill="#fffaf0" stroke-width=".4"/><path d="M8 -23.8h4M8-22.6h2.8" fill="none" stroke="#5b6fb5" stroke-width=".45"/></g>' },
      { name: "phone", pose: "ear", svg: '<rect x="3.2" y="-31" width="1.8" height="4.6" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 4 -28.6)"/>' }
    ] };
  R["h-girl"] = side(GIRL);
  R["h-girl-front"] = front({ name: "h-girl-front", hair: "auto", kind: "girl", shirt: "#f28baa", pants: "#5b6fb5", shoes: "#5a9a45",
    poses: {
      brush: { armR: [6.2, -24.4] },                  // the toothbrush in the mouth
      stop: { armR: [7.6, -26.6] },                    // a hand up: "stop"
      hug: { armL: [2.8, -18], armR: [-2.8, -18.6] },  // arms around herself
      hands: { armL: [-6.4, -18], armR: [6.4, -18] },  // both hands out in front, to hold something
      shh: { armL: [-0.2, -24.4, -1] },                // a finger on the lips
      give: { armL: [-6.8, -15.2], armR: [6.8, -15.2] }
    },
    hold: [
      { name: "brush", arm: "R", pose: "brush", svg: '<rect x="1" y="-25.2" width="10" height="1.4" rx=".7" fill="#5ab0e0" stroke-width=".4"/><rect x="-1.2" y="-25.5" width="2.6" height="2" rx=".5" fill="#fff" stroke-width=".35"/>' },
      { name: "gift", arm: "R", pose: "give", svg: "" }
    ] });
  R["h-boy-front"] = front({ name: "h-boy-front", hair: "short", shirt: "#f2c14e", pants: "#3f6f8f", shoes: "#e5483f",
    poses: { hands: { armL: [-6.4, -18], armR: [6.4, -18] }, hug: { armL: [2.8, -18], armR: [-2.8, -18.6] },
      stop: { armR: [7.6, -26.6] }, shh: { armL: [-0.2, -24.4, -1] }, give: { armL: [-6.8, -15.2], armR: [6.8, -15.2] } } });
  var BOY = { name: "h-boy", hair: "short", shirt: "#f2c14e", pants: "#3f6f8f", shoes: "#e5483f",
    poses: {
      eat: { armF: [5.4, -26.2], head: 4 },           // bread to the mouth
      drink: { armF: [5.8, -26.6], head: -14 },        // a glass to the mouth, head back
      pour: { armF: [8.4, -16.6] },
      reach: { armF: [9.6, -12.6] },
      ear: { armF: [2.6, -28.6], head: -4 },
      talk: { armF: [6, -15.8] },
      sit: { legF: -84, shinF: 168, legB: -84, shinB: 168 }   // sitting on the heels: move the part down 8.4 × its scale
    },
    hold: [
      { name: "bread", pose: "eat", svg: '<rect x="5.8" y="-28" width="3.4" height="2.6" rx=".8" fill="#e8b46a" stroke-width=".4"/>' },
      { name: "glass", pose: "drink", svg: '<g transform="rotate(-50 6.6 -26.4)"><path d="M5.4-29.6h3l-.4 5.4h-2.2z" fill="#dff1f7" stroke-width=".4"/><path d="M5.7-27.4h2.4l-.2 3.2h-2z" fill="#9fd3f0" stroke="none"/></g>' },
      { name: "phone", pose: "ear", svg: '<rect x="3.2" y="-31" width="1.8" height="4.6" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 4 -28.6)"/>' }
    ] };
  R["h-boy"] = side(BOY);
  R["h-girl2"] = side({ name: "h-girl2", hair: "auto", kind: "girl", shirt: "#8e7cc3", pants: "#3f6f8f", shoes: "#f59e0b",
    poses: { book: { armF: [8.4, -16.4], armB: [8.6, -16.8] }, ear: { armF: [2.6, -28.6], head: -4 } },
    hold: [{ name: "book", pose: "book", svg: '<path d="M7.2-20.6l3 .8 3-.8v4.6l-3 .8-3-.8z" fill="#fff" stroke-width=".4"/><path d="M10.2-19.8v4.6" fill="none" stroke-width=".35"/><path d="M7-20.8l.2 5.2 3 .8 3-.8.2-5.2" fill="none" stroke="#e5483f" stroke-width=".5"/>' },
      { name: "phone", pose: "ear", svg: '<rect x="3.2" y="-31" width="1.8" height="4.6" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 4 -28.6)"/>' }] });
  R["h-girl-top"] = top({ shirt: "#8e7cc3", pants: "#3f6f8f", shoes: "#f59e0b" });
  var ADULT_EAR = [2.6, -40.4];
  R["h-mom"] = side({ name: "h-mom", adult: true, hair: "auto", kind: "woman", scarfCol: "#3fb0a8", shirt: "#4f6fa8", pants: "#3d4660", shoes: "#6b3f26", long: true, dress: true,
    poses: { ear: { armF: ADULT_EAR, head: -4 }, stir: { armF: [11, -27] }, hand: { armB: [5.6, -25.6] }, high: { armF: [9, -58] }, kneel: { upper: 30 } },
    hold: [{ name: "phone", pose: "ear", svg: '<rect x="2.4" y="-45.4" width="2" height="5.2" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 3.4 -42.8)"/>' },
      { name: "ladle", pose: "stir", svg: '<path d="M11.2-27.4l3.6 9.4" fill="none" stroke="#b8c0c8" stroke-width="1"/>' }] });
  R["h-mom-home"] = side({ name: "h-mom-home", adult: true, hair: "auto", kind: "woman", scarfCol: "#e46b8a", shirt: "#3fb0a8", pants: "#3d4660", shoes: "#6b3f26", long: true,
    poses: { ear: { armF: ADULT_EAR, head: -4 }, stir: { armF: [11, -27] }, high: { armF: [9, -58] } },
    hold: [{ name: "phone", pose: "ear", svg: '<rect x="2.4" y="-45.4" width="2" height="5.2" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 3.4 -42.8)"/>' },
      { name: "ladle", pose: "stir", svg: '<path d="M11.2-27.4l3.6 9.4" fill="none" stroke="#b8c0c8" stroke-width="1"/><ellipse cx="14.9" cy="-17.9" rx="1.4" ry=".8" fill="#b8c0c8" stroke-width=".4"/>' }] });
  R["h-dad"] = side({ name: "h-dad", adult: true, hair: "short", hairCol: "#3d2c22", beard: true, shirt: "#5aa36a", pants: "#3d4660", shoes: "#6b3f26", long: true,
    poses: { ear: { armF: ADULT_EAR, head: -4 } },
    hold: [{ name: "phone", pose: "ear", svg: '<rect x="2.4" y="-45.4" width="2" height="5.2" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 3.4 -42.8)"/>' }] });
  R["h-gran"] = side({ name: "h-gran", adult: true, hair: "auto", kind: "grandma", scarfCol: "#c9b6e4", shirt: "#8a6cc4", pants: "#5a4a7a", shoes: "#6b3f26", long: true, dress: true, glasses: true,
    poses: { pour: { armF: [12.6, -28.4] }, high: { armF: [9, -58] }, hug: { armF: [13, -33], armB: [13, -31] } } });
  R["h-seller"] = side({ name: "h-seller", adult: true, hair: "auto", kind: "woman", scarfCol: "#e5483f", shirt: "#f59e0b", pants: "#6b3f26", long: true, dress: true,
    poses: { ear: { armF: ADULT_EAR, head: -4 } },
    hold: [{ name: "phone", pose: "ear", svg: '<rect x="2.4" y="-45.4" width="2" height="5.2" rx=".5" fill="#3f4a5a" stroke-width=".35" transform="rotate(14 3.4 -42.8)"/>' }] });
  R["h-doctor"] = side({ name: "h-doctor", adult: true, hair: "short", hairCol: "#3d2c22", shirt: "#fff", pants: "#5b9bd5", shoes: "#3d4660", long: true,
    extra: '<path d="M-1.2-41.6c-.4 4 .6 7 2.6 8M2.6-41.6c.6 3 .4 6-.2 7.4" fill="none" stroke="#5a6b7a" stroke-width=".6"/>',
    // listen: kneeling (move the part down 12.6 at scale 1.2), the stethoscope on a child's chest
    poses: { listen: { legF: 0, shinF: 90, legB: 0, shinB: 90, armF: [13.5, -30.5] } },
    hold: [{ name: "steth", pose: "listen", svg: '<circle cx="14" cy="-30.5" r="1.2" fill="#b8c0c8" stroke-width=".4"/>' }] });
  R["h-officer"] = side({ name: "h-officer", adult: true, hair: "short", hairCol: "#3d2c22", shirt: "#3f5f9f", pants: "#2f3f6f", shoes: "#3d2c22", long: true,
    cap: function (c, r) { return '<path d="M' + f(c[0] - r * 1.05) + " " + f(c[1] - r * 0.35) + "c0-" + f(r * 0.9) + " " + f(r * 2.1) + "-" + f(r * 0.9) + " " + f(r * 2.1) + " 0z" + '" fill="#2f3f6f"/><path d="M' + f(c[0] + r * 0.3) + " " + f(c[1] - r * 0.4) + "h" + f(r * 1.2) + '" fill="none" stroke-width="1"/>'; },
    poses: { hand: { armF: [7, -24.6] } } });
  R["h-mom-back"] = back({ name: "h-mom-back", key: "h-mom", adult: true, hair: "auto", kind: "woman", scarfCol: "#3fb0a8", shirt: "#4f6fa8", long: true, dress: true, shoes: "#6b3f26" });
  R["h-girl-back"] = back({ name: "h-girl-back", hair: "auto", kind: "girl", shirt: "#f2c14e", pants: "#5b6fb5", shoes: "#5a9a45" });

  /* Little circles along a line, for a toothbrush: tracks that move part id in n loops of radius r from a to b. */
  B.hloops = function (id, a, b, n, r, at, dur) {
    var out = [], each = dur / n;
    for (var i = 0; i < n; i++) {
      var pts = [];
      for (var k = 0; k <= 16; k++) {
        var t = (i + k / 16) / n, w = 2 * Math.PI * k / 16;
        pts.push(f(a[0] + (b[0] - a[0]) * t + r * Math.sin(w)) + " " + f(a[1] + (b[1] - a[1]) * t + r - r * Math.cos(w)));
      }
      out.push({ id: id, path: "M" + pts.join("L"), at: at + i * each, dur: each, ease: "linear" });
    }
    return out;
  };

  /* ---------------- rooms and things (stage units at their own place unless the comment gives an origin) ---------------- */
  // A window with the sky (origin: its middle). Pieces: night (the dark sky, hidden), sun, moon (hidden), stars (hidden).
  R["h-window"] = g('<rect x="-15" y="-12" width="30" height="24" rx="1.5" fill="#fff"/>' +
    '<rect x="-12.6" y="-9.6" width="25.2" height="19.2" fill="#bfe3f5"/>' +
    '<g data-part="night" style="opacity:0"><rect x="-12.6" y="-9.6" width="25.2" height="19.2" fill="#2f3f6f"/></g>' +
    '<g data-part="sun" data-pivot="4 -2"><circle cx="4" cy="-2" r="3.6" fill="#fcd34d"/></g>' +
    hide("moon", '<path d="M-4-6a4 4 0 1 0 4 5.2 3.2 3.2 0 1 1-4-5.2z" fill="#fef3c7"/>') +
    hide("stars", '<g fill="#fef3c7" stroke="none"><circle cx="6" cy="-6" r=".6"/><circle cx="9" cy="2" r=".5"/><circle cx="-8" cy="4" r=".5"/><circle cx="2" cy="5" r=".4"/></g>') +
    '<path d="M0-9.6v19.2M-12.6 0h25.2" fill="none" stroke-width=".9" stroke="#fff"/><path d="M0-9.6v19.2M-12.6 0h25.2M-12.6-9.6h25.2v19.2h-25.2z" fill="none"/>');
  // The front of the bathroom counter and the basin, to stand in front of a person at the sink (as in "bathroom").
  R["h-counter"] = g('<rect x="0" y="60" width="160" height="30" fill="#f4f4f2"/><path d="M0 60h160" fill="none"/>' +
    '<ellipse cx="80" cy="69" rx="32" ry="6.5" fill="#cfd8dc"/><ellipse cx="80" cy="69.6" rx="28" ry="5" fill="#b0bec5" stroke="none"/><ellipse cx="80" cy="71" rx="2" ry=".9" fill="#78909c"/>');
  // A card for close-ups, over the whole stage.
  R["h-panel"] = '<rect x="3" y="3" width="154" height="84" rx="5" fill="#fffaf0" stroke="#3d2c22" stroke-width=".6"/>';
  // A big toothbrush lying flat, bristles up (origin: the middle of its head).
  R["h-bigbrush"] = g('<rect x="6" y="1" width="46" height="5" rx="2.5" fill="#5ab0e0"/><rect x="-9" y="1.5" width="18" height="4" rx="1.6" fill="#5ab0e0"/>' +
    '<g fill="#fff" stroke-width=".4">' + [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5].map(function (x) { return '<rect x="' + (x - 1.1) + '" y="-5" width="2.2" height="6.8" rx=".8"/>'; }).join("") + "</g>");
  // A tube of toothpaste, its opening at the origin, pointing left. The body squeezes (piece body).
  R["h-tube"] = g('<g data-part="body" data-pivot="6 0"><path d="M5-4.4h30l2 4.4-2 4.4H5z" fill="#fff"/><path d="M14-4.4h10v8.8H14z" fill="#e5483f" stroke="none"/><path d="M5-4.4h30l2 4.4-2 4.4H5z" fill="none"/><path d="M35-4.4v8.8" fill="none"/></g>' +
    '<rect x="0" y="-2.2" width="5.4" height="4.4" rx=".8" fill="#5ab0e0"/>');
  // A blob of toothpaste, the size of a pea (origin: its bottom), and a pea to compare (origin: its middle).
  R["h-paste"] = g('<path d="M-3.6 0c-.6-2.4.6-4.4 3.2-4.6 2.6-.2 4.4 1.6 4 4.6z" fill="#fff"/><path d="M-2.4-1.6c1.2-1.4 3-1.6 4.4-.8" fill="none" stroke="#5ab0e0" stroke-width=".8"/>');
  R["h-pea"] = g('<circle r="3.6" fill="#7cc35a"/><circle cx="-1.2" cy="-1.2" r="1" fill="#fff" stroke="none" opacity=".6"/>');
  // A wide-open smiling mouth from the front, for brushing the front of the teeth (centred on 80, 46).
  // Pieces dirtUp and dirtLo: bits of food on the upper and lower teeth.
  R["h-mouth"] = (function () {
    var up = [[52, 9], [61, 10], [70.5, 11], [80, 11], [89.5, 11], [99, 10], [108, 9]].map(function (t, i) {
      return '<rect x="' + (t[0] - 4.4) + '" y="30" width="8.8" height="' + t[1] + '" rx="2.4" fill="#fff"/>'; }).join("");
    var lo = [[55, 8], [64, 9], [73, 9.5], [82, 9.5], [91, 9], [100, 8]].map(function (t) {
      return '<rect x="' + (t[0] - 4.2 + 1.5) + '" y="' + (62 - t[1]) + '" width="8.4" height="' + t[1] + '" rx="2.4" fill="#fff"/>'; }).join("");
    var spot = function (d) { return '<ellipse cx="' + d[0] + '" cy="' + d[1] + '" rx="1.8" ry="1.3" fill="#d9b85a" stroke="none"/>'; };
    var dirt = '<g data-part="dirtUp">' + [[57, 37], [70, 38], [88, 36], [101, 38], [76, 35]].map(spot).join("") + "</g>" +
      '<g data-part="dirtLo">' + [[60, 57], [72, 56], [85, 57], [97, 56]].map(spot).join("") + "</g>";
    return g('<path d="M30 46c0-16 22-24 50-24s50 8 50 24-22 24-50 24-50-8-50-24z" fill="#e98a8a"/>' +
      '<path d="M37 46c0-11 19-16 43-16s43 5 43 16-19 16-43 16-43-5-43-16z" fill="#7a2e2e"/>' +
      '<ellipse cx="80" cy="56" rx="22" ry="6" fill="#e57f8f" stroke="none"/>' +
      '<path d="M44 33c10-4 26-5 36-5s26 1 36 5v-3c-10-3-24-4-36-4s-26 1-36 4z" fill="#f4a7b9" stroke="none"/>' +
      '<g stroke-width=".5">' + up + lo + "</g>" +
      dirt +
      hide("shine", '<g fill="#fff" stroke="none"><path d="M66 33.5l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/><path d="M94 33.5l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/><path d="M80 55l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/></g>'));
  })();
  // A toothbrush seen from the back of its head, brushing teeth that face us (origin: the middle of its head).
  R["h-brushF"] = g('<path d="M5 2l30 18" fill="none" stroke="#3d2c22" stroke-width="5.2"/><path d="M5 2l30 18" fill="none" stroke="#5ab0e0" stroke-width="4"/>' +
    '<rect x="-7" y="-3.6" width="14" height="7.2" rx="3" fill="#5ab0e0"/><path d="M-4.6-1.4h9.2" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>');
  // The lower teeth seen from above, front teeth at the top, the tongue in the middle (centred on 80, 50).
  // Pieces dirtIn (on the inner side) and dirtTop (on top of the back teeth).
  R["h-arch"] = (function () {
    function bez(t, p) { var u = 1 - t; return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]]; }
    var L = [[46, 82], [44, 40], [58, 20], [80, 20]], Rr = [[114, 82], [116, 40], [102, 20], [80, 20]];
    var teeth = "", dIn = "", dTop = "";
    [L, Rr].forEach(function (c, side) {
      [0.04, 0.2, 0.37, 0.53, 0.67, 0.79, 0.91].forEach(function (t, i) {
        var p = bez(t, c), big = i < 3, w = big ? 9 : 6.4;
        teeth += '<rect x="' + f(p[0] - w / 2) + '" y="' + f(p[1] - w / 2) + '" width="' + w + '" height="' + w + '" rx="' + (big ? 2.6 : 2) + '" fill="#fff"/>';
        if (big) {
          teeth += '<path d="M' + f(p[0] - 2.4) + " " + f(p[1]) + "h4.8M" + f(p[0]) + " " + f(p[1] - 2.4) + "v4.8" + '" fill="none" stroke="#c9d3d8" stroke-width=".5"/>';
          dTop += '<ellipse cx="' + f(p[0] + (side ? 1.4 : -1.4)) + '" cy="' + f(p[1] + 1.2) + '" rx="1.6" ry="1.2" fill="#d9b85a" stroke="none"/>';
        }
        if (i % 2 === 0) {
          var q = bez(t, [[c[0][0] + (side ? -6 : 6), c[0][1]], [c[1][0] + (side ? -6 : 6), c[1][1]], [c[2][0] + (side ? -4 : 4), c[2][1] + 5], [80, c[3][1] + 6]]);
          dIn += '<ellipse cx="' + f(q[0]) + '" cy="' + f(q[1]) + '" rx="1.5" ry="1.1" fill="#d9b85a" stroke="none"/>';
        }
      });
    });
    return g('<path d="M46 84C44 40 58 20 80 20S116 40 114 84" fill="none" stroke="#3d2c22" stroke-width="15.4"/>' +
      '<path d="M46 84C44 40 58 20 80 20S116 40 114 84" fill="none" stroke="#f4a7b9" stroke-width="14"/>' +
      '<path d="M60 84c-2-20 2-44 20-44s22 24 20 44z" fill="#e57f8f"/><path d="M80 52v26" fill="none" stroke="#c9606f" stroke-width=".6"/>' +
      '<g stroke-width=".5">' + teeth + "</g>" + '<g data-part="dirtIn">' + dIn + '</g><g data-part="dirtTop">' + dTop + "</g>");
  })();
  // A toothbrush seen from above, bristles down, the handle going up out of the mouth (origin: the middle of its head).
  R["h-brushT"] = g('<rect x="-2" y="-34" width="4" height="30" rx="2" fill="#5ab0e0"/><rect x="-3.4" y="-6" width="6.8" height="12" rx="2.6" fill="#5ab0e0"/>' +
    '<g fill="#fff" stroke="none" opacity=".85"><circle cx="-1.4" cy="-3" r=".7"/><circle cx="1.4" cy="-3" r=".7"/><circle cx="-1.4" cy="0" r=".7"/><circle cx="1.4" cy="0" r=".7"/><circle cx="-1.4" cy="3" r=".7"/><circle cx="1.4" cy="3" r=".7"/></g>');

  /* ---------------- my body (health-seed-3) ---------------- */
  // A ring to point at something (origin: its middle).
  R["h-ring"] = '<circle r="4.6" fill="none" stroke="#fff" stroke-width="2.4"/><circle r="4.6" fill="none" stroke="#f59e0b" stroke-width="1.2"/>';
  // A rainbow over two clouds (origin: the middle of its foot).
  R["h-rainbow"] = '<g fill="none" stroke-linecap="round">' + [["#e5483f", 15], ["#f59e0b", 12.6], ["#fcd34d", 10.2], ["#5a9a45", 7.8], ["#5b9bd5", 5.4]].map(function (c) {
    return '<path d="M' + (-c[1]) + ' 0a' + c[1] + " " + c[1] + " 0 0 1 " + (2 * c[1]) + ' 0" stroke="' + c[0] + '" stroke-width="2.4"/>'; }).join("") + "</g>" +
    g('<path d="M-19 1c-2 0-3-2-1-3 0-2 3-3 4-1 1-1 4-1 4 1 2 0 2 3 0 3z" fill="#fff"/><path d="M11 1c-2 0-3-2-1-3 0-2 3-3 4-1 1-1 4-1 4 1 2 0 2 3 0 3z" fill="#fff"/>');
  // A bell hanging from a ribbon (origin: where it hangs); piece swing.
  R["h-bell"] = g('<g data-part="swing" data-pivot="0 0"><path d="M0 0v5" fill="none" stroke="#e5483f" stroke-width="1"/>' +
    '<path d="M-6 15c0-1 1-2 1.4-4 .6-4 1.6-6.4 4.6-6.4s4 2.4 4.6 6.4c.4 2 1.4 3 1.4 4z" fill="#fcd34d"/><circle cy="16.4" r="1.6" fill="#f59e0b"/><path d="M-3 8c.4-1.4 1.2-2 2-2.2" fill="none" stroke="#fff" stroke-width=".7"/></g>');
  // Sound: three arcs opening to the left, towards an ear (origin: their middle).
  R["h-waves"] = '<g fill="none" stroke="#3f6f8f" stroke-width="1" stroke-linecap="round"><path d="M-3-3a4.2 4.2 0 0 0 0 6"/><path d="M0-5.4a7.6 7.6 0 0 0 0 10.8"/><path d="M3-7.8a11 11 0 0 0 0 15.6"/></g>';
  // A rose (origin: the bottom of its stem).
  R["h-rose"] = g('<path d="M0 0c.4-6-.4-10 0-15" fill="none" stroke="#5a9a45" stroke-width="1.2"/><path d="M0-6c2-3 5-3 6-2-2 2-4 3-6 2zM0-9c-2-3-5-3-6-2 2 2 4 3 6 2z" fill="#5a9a45"/>' +
    '<path d="M-4.6-18c0-3 2-5 4.6-5s4.6 2 4.6 5c0 2.8-2 4.6-4.6 4.6s-4.6-1.8-4.6-4.6z" fill="#e5483f"/><path d="M-1.8-20c1-1.2 2.8-1.2 3.6 0 .6 1.2-.4 2.4-1.8 2.4" fill="none" stroke-width=".5"/>');
  // A smell: wavy lines drifting left (origin: their middle).
  R["h-scent"] = '<g fill="none" stroke="#c45c9a" stroke-width=".9" stroke-linecap="round" opacity=".85"><path d="M6-4c-1.5-1-3 1-4.5 0s-3 1-4.5 0-3 1-4.5 0"/><path d="M7 0c-1.5-1-3 1-4.5 0s-3 1-4.5 0-3 1-4.5 0"/><path d="M6 4c-1.5-1-3 1-4.5 0s-3 1-4.5 0-3 1-4.5 0"/></g>';
  // An apple (origin: its middle); piece bite (a bite taken out of it, hidden).
  R["h-apple"] = g('<path d="M0-4c-2-1.6-6-1.4-6 3 0 3.6 2.4 6.4 4 6.4 1 0 1.4-.4 2-.4s1 .4 2 .4c1.6 0 4-2.8 4-6.4 0-4.4-4-4.6-6-3z" fill="#e5483f"/>' +
    '<path d="M0-4c0-1.6.6-2.6 1.6-3.2" fill="none" stroke="#6b3f26" stroke-width=".8"/><path d="M1-6c1.4-1.4 3-1.2 3.6-.8-.8 1.2-2.2 1.6-3.6.8z" fill="#5a9a45"/>' +
    hide("bite", '<path d="M3.2-3.2c-1.4 1-1.6 2.6-.6 3.4-1 .8-.8 2.4.4 3.2 1.2-1.4 2.4-3.4 2.6-5.4-.6-.8-1.6-1.2-2.4-1.2z" fill="#fff3d6" stroke-width=".5"/>'));
  // Talking: little lines coming out of a mouth, to the right (origin: the mouth).
  R["h-talk"] = '<g fill="none" stroke="#3f6f8f" stroke-width=".9" stroke-linecap="round"><path d="M2-2.4l3-1.6M2.6 0h3.6M2 2.4l3 1.6"/></g>';
  // A dashed line of sight, 10 long, to the right of the origin (stretch it with sx, turn it with r).
  R["h-sight"] = '<path d="M0 0h10" fill="none" stroke="#3f6f8f" stroke-width=".7" stroke-dasharray="1.6 1.2" stroke-linecap="round"/>';

  /* ---------------- rooms (stage units) ---------------- */
  // A wall and a floor; the floor starts at y = 62.
  function roomBg(wall, band, floor, boards) {
    return g('<rect width="160" height="62" fill="' + wall + '" stroke="none"/><rect y="0" width="160" height="4" fill="' + band + '" stroke="none"/>' +
      '<rect y="62" width="160" height="28" fill="' + floor + '" stroke="none"/><rect y="60" width="160" height="2.4" fill="' + boards + '"/>' +
      '<g fill="none" stroke="' + boards + '" stroke-width=".4"><path d="M0 72h160M0 82h160M30 62l-6 28M80 62v28M130 62l6 28"/></g>');
  }
  R["h-room"] = roomBg("#f6e3c6", "#efd3ad", "#e7c69c", "#c9a074");
  R["h-kitchen"] = roomBg("#fbeedd", "#f3d9b8", "#d9c3a5", "#b89a76") +
    '<g fill="none" stroke="#efdcc2" stroke-width=".5"><path d="M0 20h160M0 30h160M0 40h160M0 50h160"/></g>';
  R["h-bedroom"] = roomBg("#dfe8f6", "#c9d6ec", "#e7c69c", "#c9a074");

  /* ---------------- water and food (health-seed-4) ---------------- */
  // A sofreh spread on the floor, seen a little from above (origin: its middle).
  R["h-sofreh"] = g('<path d="M-36-6h72l6 12h-84z" fill="#fff6e0"/><path d="M-33.6-4h67.2l4.8 8h-76.8z" fill="none" stroke="#e5483f" stroke-width=".6" stroke-dasharray="2 1.2"/>');
  // A measuring stick standing on the floor (origin: its bottom); piece mark (a line with a star, 40 up) moves up.
  R["h-chart"] = g('<rect x="-3" y="-44" width="6" height="44" rx="1" fill="#fff"/>' +
    '<g fill="none" stroke-width=".4">' + [4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map(function (y) { return '<path d="M-3-' + y + 'h' + (y % 8 ? 2 : 3.4) + '"/>'; }).join("") + "</g>" +
    '<g data-part="mark"><path d="M-6-40h12" fill="none" stroke="#e5483f" stroke-width=".9"/><path d="M7.4-42l.6 1.4 1.5.2-1.1 1 .3 1.5-1.3-.7-1.3.7.3-1.5-1.1-1 1.5-.2z" fill="#fcd34d" stroke-width=".3"/></g>');
  // A jug of water (origin: the front corner of its bottom, where it tips; tipped by -50 its spout is at (-10.2, -6.8)).
  R["h-jug"] = g('<g transform="translate(5 0)"><path d="M-5 0H6C6.6-4 6-7 5-10H-3L-6.4-12.2-4.4-8.4C-5.4-5.6-5.6-2.6-5 0z" fill="#eef8fc"/>' +
    '<path d="M-4.6-1h10.2c.3-2.4.1-4.4-.4-6.4h-9.4c-.6 2-.7 4.2-.4 6.4z" fill="#9fd3f0" stroke="none" opacity=".8"/>' +
    '<path d="M5.4-8.4c3.2 0 3.2 5 .2 5.4" fill="none" stroke-width=".9"/></g>');
  // Water pouring from the jug's spout (the jug tipped at 50 degrees) into a glass below and to the left.
  R["h-stream"] = '<path d="M0 0c-2 2-3 5-3 10" fill="none" stroke="#9fd3f0" stroke-width="1.4" stroke-linecap="round"/><path d="M0 0c-2 2-3 5-3 10" fill="none" stroke="#fff" stroke-width=".4" stroke-dasharray="1.2 2" class="flow"/>';
  // A glass (origin: its bottom); piece water fills it from the bottom (start it at sy 0).
  R["h-glass"] = g('<path d="M-2.8-7h5.6l-.6 7h-4.4z" fill="#eef8fc"/>' +
    '<g data-part="water" data-pivot="0 0"><path d="M-2.6-5.4h5.2l-.45 5.2h-4.3z" fill="#9fd3f0" stroke="none"/></g>' +
    '<path d="M-2.8-7h5.6l-.6 7h-4.4z" fill="none"/>');

  /* ---------------- sneezing (health-sprout-1) ---------------- */
  // A small side table (origin: the middle of its feet); its top is 18 up.
  R["h-table"] = g('<rect x="-12" y="-19" width="24" height="2.6" rx=".8" fill="#c98a4b"/><rect x="-10" y="-16.4" width="2.2" height="16.4" fill="#b57638"/><rect x="7.8" y="-16.4" width="2.2" height="16.4" fill="#b57638"/>');
  // A box of tissues (origin: its bottom); piece top: the tissue sticking out.
  R["h-tissues"] = g('<g data-part="top"><path d="M-2.4-5c-.4-2 .6-3.6 2.2-3.8 1.6.6 2.6 2 2.4 3.8z" fill="#fff"/></g><rect x="-6" y="-5.6" width="12" height="5.6" rx=".8" fill="#7cc6e8"/><path d="M-3-5.6h6" fill="none" stroke-width=".9"/>');
  // A crumpled tissue (origin: its middle).
  R["h-tissue"] = g('<path d="M-1.8-1.2c.6-1 2.2-1.2 3-.2.8.8.6 2.2-.4 2.6-1 .6-2.4.2-2.8-.6-.3-.6-.2-1.2.2-1.8z" fill="#fff"/>');
  // A bin with a pedal (origin: its bottom); piece lid opens up around its back hinge.
  R["h-bin"] = g('<path d="M-6-14h12l-1.2 14h-9.6z" fill="#9aa8b4"/><path d="M-3-11v8M0-11v8M3-11v8" fill="none" stroke="#7f8e9b" stroke-width=".5"/>' +
    '<g data-part="lid" data-pivot="6 -14"><path d="M-6.6-14c0-1.6 2.6-2.6 6.6-2.6s6.6 1 6.6 2.6z" fill="#7f8e9b"/></g><rect x="-8" y="-1.6" width="3" height="1.2" rx=".4" fill="#7f8e9b"/>');
  // A sink from the side, facing left, with the tap on the wall (origin: the middle of its foot). Pieces: water.
  R["h-sink-side"] = g('<rect x="-2.6" y="-22" width="5.2" height="22" fill="#e9eef1"/><path d="M-11-26h17v2c0 4-4 6-8.5 6S-11-20-11-24z" fill="#f4f6f8"/>' +
    '<path d="M4-36v2h-5c-1.4 0-2.4 1-2.4 2.4v1" fill="none" stroke="#b8c0c8" stroke-width="1.6"/><rect x="3" y="-38.6" width="4" height="2.4" rx=".6" fill="#e5483f"/>' +
    hide("water", '<rect x="-4.2" y="-29.6" width="1.6" height="7" fill="#9fd3f0" stroke="none"/>'));
  // A bar of soap on the side of a sink (origin: its bottom).
  R["h-soap-small"] = g('<rect x="-2.6" y="-2" width="5.2" height="2.2" rx="1" fill="#f9b9cf"/>');

  /* ---------------- safe at home (health-sprout-2) ---------------- */
  // A dining table from the side (origin: the middle of its feet); its top is 22 up.
  R["h-dtable"] = g('<rect x="-22" y="-23" width="44" height="3" rx="1" fill="#c98a4b"/><rect x="-19" y="-20" width="2.6" height="20" fill="#b57638"/><rect x="16.4" y="-20" width="2.6" height="20" fill="#b57638"/>');
  // A teapot held by its handle (origin: the handle); the spout points left. Turn it (r negative) to pour.
  R["h-teapot"] = g('<path d="M-1.6-3.4c2.4-.4 2.6 6 0 6.4" fill="none" stroke-width="1.2"/><path d="M-13 3.6c-2.4-1.6-4-4.6-6.4-5.4l.8 1.4c1.2.6 2.6 2.4 3.4 4.4z" fill="#f4f6f8"/>' +
    '<path d="M-14 4c0-5 2.4-7.6 6-7.6s6 2.6 6 7.6z" fill="#f4f6f8"/><path d="M-11-3.6h7l-1 1.4h-5z" fill="#e5483f"/><circle cx="-7.6" cy="-4.4" r=".9" fill="#e5483f"/>' +
    '<path d="M-12.6 1.2h9.2" fill="none" stroke="#5b9bd5" stroke-width=".8"/>');
  // Tea pouring from a spout (origin: the top), 8 long.
  R["h-teastream"] = '<path d="M0 0c-.6 3-.6 5.4 0 8" fill="none" stroke="#b45309" stroke-width="1" stroke-linecap="round" opacity=".9"/>';
  // An estekan, a small tea glass (origin: its bottom); piece tea fills it (start it at sy 0).
  R["h-estekan"] = g('<path d="M-2-6.4h4c-.6 1.6-.6 3 0 4.4l-.3 2h-3.4l-.3-2c.6-1.4.6-2.8 0-4.4z" fill="#f4fbfd"/>' +
    '<g data-part="tea" data-pivot="0 0"><path d="M-1.6-4.6h3.2c-.3 1-.3 1.8.1 2.6l-.3 1.8h-2.8l-.3-1.8c.4-.8.4-1.6.1-2.6z" fill="#c2410c" stroke="none" opacity=".85"/></g>' +
    '<path d="M-2-6.4h4c-.6 1.6-.6 3 0 4.4l-.3 2h-3.4l-.3-2c.6-1.4.6-2.8 0-4.4z" fill="none"/><ellipse cx="0" cy=".3" rx="3" ry=".7" fill="#f4f6f8"/>');
  // Steam rising (origin: its bottom).
  R["h-steam"] = '<g fill="none" stroke="#b8c0c8" stroke-width=".8" stroke-linecap="round" opacity=".9"><path d="M-1.4 0c-1.2-1.6 1.2-2.6 0-4.4s1.2-2.6 0-4.4"/><path d="M1.6-1c-1.2-1.6 1.2-2.6 0-4.4s1.2-2.6 0-4.4"/></g>';
  // Scissors, lying down (origin: their middle).
  R["h-scissors"] = g('<path d="M-1 0l9-2.4M-1 0l9 2.4" fill="none" stroke="#b8c0c8" stroke-width="1.2"/><path d="M-1 0l9-2.4M-1 0l9 2.4" fill="none" stroke-width=".3"/>' +
    '<circle cx="-4" cy="-2" r="2" fill="none" stroke="#e5483f" stroke-width="1.1"/><circle cx="-4" cy="2" r="2" fill="none" stroke="#e5483f" stroke-width="1.1"/><circle cx="-1" cy="0" r=".5" fill="#3d2c22"/>');
  // A kitchen knife, lying down (origin: its middle).
  R["h-knife"] = g('<path d="M-1-1.2h10c1 0 1.6.6 2 1.4l-.4.6H-1z" fill="#dfe5e9"/><rect x="-8" y="-1.4" width="7.4" height="2.4" rx="1" fill="#6b3f26"/>');
  // A bottle of medicine (origin: its bottom), and its round pills lying on the table (origin: their middle).
  R["h-bottle"] = g('<rect x="-3" y="-8" width="6" height="8" rx="1" fill="#f59e0b" opacity=".9"/><rect x="-2.4" y="-5.4" width="4.8" height="3" fill="#fff"/><path d="M-1.4-4.4h2.8" fill="none" stroke="#e5483f" stroke-width=".6"/><rect x="-3.4" y="-10" width="6.8" height="2.4" rx=".6" fill="#fff"/>');
  R["h-pillset"] = g('<g stroke-width=".3"><circle cx="-2.6" cy="0" r=".9" fill="#f28baa"/><circle cx="-.6" cy="0" r=".9" fill="#7cc6e8"/><circle cx="-1.6" cy="-1.5" r=".9" fill="#fcd34d"/><circle cx="1.4" cy="0" r=".9" fill="#8bc34a"/></g>');
  // A bowl of round candies (origin: its bottom).
  R["h-candy"] = g('<g stroke-width=".3"><circle cx="-2.6" cy="-4" r="1.2" fill="#f28baa"/><circle cx="0" cy="-4.6" r="1.2" fill="#7cc6e8"/><circle cx="2.6" cy="-4" r="1.2" fill="#fcd34d"/><circle cx="-1.2" cy="-5.6" r="1.2" fill="#8bc34a"/><circle cx="1.4" cy="-5.8" r="1.2" fill="#f28baa"/></g>' +
    '<path d="M-5-4h10c0 2.4-2 4-5 4s-5-1.6-5-4z" fill="#c9b6e4"/>');
  // A high shelf on the wall (origin: the middle of its top).
  R["h-shelf"] = g('<rect x="-12" y="0" width="24" height="2" rx=".5" fill="#b57638"/><path d="M-9 2l2 3M9 2l-2 3" fill="none" stroke-width=".8"/>');
  // A floor cushion (origin: the middle of its bottom).
  R["h-cushion"] = g('<path d="M-9 0c-.6-2.6 0-4 1.4-4.4h15.2c1.4.4 2 1.8 1.4 4.4z" fill="#b5523b"/><path d="M-6-2.2h12" fill="none" stroke="#e7c27a" stroke-width=".8" stroke-dasharray="1.4 1"/>');
  // A ring around two things (origin: the middle), stretch it with sx.
  R["h-oval"] = '<ellipse rx="10" ry="6" fill="none" stroke="#fff" stroke-width="2.4"/><ellipse rx="10" ry="6" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="2 1.4"/>';

  /* ---------------- crossing the street (health-sprout-3) ---------------- */
  // The street seen from the near pavement, looking across: buildings, the far pavement (y 30 to 36), the road
  // (36 to 66) with a zebra crossing between x 60 and 100, and the near pavement (66 to 90). Stage units.
  R["h-street"] = g('<rect width="160" height="34" fill="#cfe9f7" stroke="none"/>' +
    '<rect x="4" y="6" width="26" height="26" fill="#e7c27a"/><rect x="34" y="12" width="20" height="20" fill="#f0a35e"/><rect x="110" y="4" width="22" height="28" fill="#c9b6e4"/><rect x="136" y="10" width="22" height="22" fill="#9cc9a8"/>' +
    '<g fill="#bfe3f5">' + [[8, 10], [18, 10], [8, 19], [18, 19], [38, 16], [46, 16], [114, 8], [123, 8], [114, 17], [123, 17], [140, 14], [149, 14]].map(function (w) { return '<rect x="' + w[0] + '" y="' + w[1] + '" width="5" height="5"/>'; }).join("") + "</g>" +
    '<path d="M60 28c0-6 4-10 9-10s9 4 9 10z" fill="#5a9a45"/><rect x="68" y="26" width="2" height="6" fill="#6b3f26"/>' +
    '<rect y="30" width="160" height="6" fill="#d8d2c8"/><rect y="36" width="160" height="30" fill="#6b7178" stroke="none"/><path d="M0 36h160M0 66h160" fill="none"/>' +
    '<path d="M0 50.5h160" fill="none" stroke="#f4f4f2" stroke-width=".8" stroke-dasharray="6 5"/>' +
    '<g fill="#f4f4f2" stroke="none">' + [[38, 2], [42.5, 2.4], [47.5, 2.8], [53, 3.2], [59, 3.6]].map(function (b) {
      var w = 34 + (b[0] - 38) * 0.4; return '<rect x="' + f(80 - w / 2) + '" y="' + b[0] + '" width="' + f(w) + '" height="' + b[1] + '"/>'; }).join("") + "</g>" +
    '<rect y="66" width="160" height="24" fill="#d8d2c8" stroke="none"/><rect y="66" width="160" height="2" fill="#b8b0a4"/>' +
    '<g fill="none" stroke="#c4bcb0" stroke-width=".4"><path d="M0 76h160M20 68v22M60 68v22M100 68v22M140 68v22"/></g>');
  // A pedestrian light on a pole (origin: the foot of the pole). Pieces red and green (lit), green starts off.
  R["h-pedlight"] = g('<rect x="-.8" y="-22" width="1.6" height="22" fill="#5a6b7a"/><rect x="-3.6" y="-31" width="7.2" height="12" rx="1.2" fill="#3d4660"/>' +
    '<circle cx="0" cy="-28" r="2.2" fill="#6b3a3a" stroke="none"/><circle cx="0" cy="-22" r="2.2" fill="#2f5a3f" stroke="none"/>' +
    '<g data-part="red"><circle cx="0" cy="-28" r="2.2" fill="#e5483f" stroke="none"/><path d="M0-29.6v2.6M-.8-26.2l.8-.8.8.8" fill="none" stroke="#fff" stroke-width=".5"/></g>' +
    hide("green", '<circle cx="0" cy="-22" r="2.2" fill="#5ad16a" stroke="none"/><path d="M0-23.4l-.4 1.8-.8 1M-.4-21.6l.9 1M-.9-22.8l1.4-.4" fill="none" stroke="#fff" stroke-width=".5"/>'));
  // A car from the side, cut open: the inside (seats) goes behind the people, the body (windows open) in front.
  R["h-car-in"] = g('<path d="M30 74V40c0-5 4-9 10-9h66c4 0 7 3 9 7l5 10v26z" fill="#3d4660"/>' +
    '<path d="M46 72V46c0-3 2-5 5-5h6c3 0 4 2 4 5v26z" fill="#8a6cc4"/><path d="M92 72V48c0-3 2-5 5-5h5c3 0 4 2 4 5v24z" fill="#8a6cc4"/>');
  R["h-car-body"] = g('<path fill-rule="evenodd" fill="#5b9bd5" d="M14 78V58c0-6 4-9 10-10l10-14c3-4 7-6 12-6h48c6 0 10 3 13 7l9 13c8 1 14 4 14 12v18z' +
    'M42 50h40V33H52c-3 0-5 1-7 4zM88 50h28l-8-12c-2-3-4-5-8-5H88z"/>' +
    '<path d="M85 34v44" fill="none"/><g fill="#3d4660"><circle cx="40" cy="80" r="8"/><circle cx="120" cy="80" r="8"/></g><g fill="#cfd8dc"><circle cx="40" cy="80" r="3.4"/><circle cx="120" cy="80" r="3.4"/></g>' +
    '<circle cx="138" cy="62" r="2.2" fill="#fde68a"/>');
  // A seat belt across a passenger in the back seat of "h-car-in" (stage units), to draw like a pencil.
  R["h-belt"] = '<path d="M56.4 37.6L67 50.4" fill="none" stroke="#3d2c22" stroke-width="2.4" stroke-linecap="round"/><path d="M56.4 37.6L67 50.4" fill="none" stroke="#9aa8b4" stroke-width="1.4" stroke-linecap="round"/>';

  /* ---------------- lost in the bazaar (health-sprout-4) ---------------- */
  // A bazaar: brick arches over the shops and a stone floor from y = 62 (stage units).
  R["h-bazaar"] = g('<rect width="160" height="62" fill="#e9cfa6" stroke="none"/>' +
    [0, 40, 80, 120].map(function (x) { return '<path d="M' + (x + 4) + ' 62V24c0-10 7-16 16-16s16 6 16 16v38z" fill="#d9b48a"/><path d="M' + (x + 8) + ' 62V26c0-7 5-12 12-12s12 5 12 12v36z" fill="#b5895c" stroke="none" opacity=".35"/>'; }).join("") +
    '<rect y="0" width="160" height="5" fill="#c99a6a"/><rect y="62" width="160" height="28" fill="#e2d6c2" stroke="none"/><path d="M0 62h160" fill="none"/>' +
    '<g fill="none" stroke="#cbbfa9" stroke-width=".4"><path d="M0 74h160M0 84h160M16 62l-4 28M56 62l-2 28M96 62l2 28M136 62l4 28"/></g>');
  // Kites hanging from a string over a stall (stage units); pieces k1, k2, k3 swing.
  R["h-kites"] = (function () {
    function kite(n, x, y, c1, c2) {
      return '<g data-part="' + n + '" data-pivot="' + x + ' 8"><path d="M' + x + ' 8V' + (y - 5) + '" fill="none" stroke-width=".4"/>' +
        '<path d="M' + x + " " + (y - 5) + "l5 5-5 8-5-8z" + '" fill="' + c1 + '"/><path d="M' + x + " " + (y - 5) + "v13M" + (x - 5) + " " + y + "h10" + '" fill="none" stroke-width=".4"/>' +
        '<path d="M' + x + " " + (y + 8) + "q2 3-1 5q-2 2 0 4" + '" fill="none" stroke="' + c2 + '" stroke-width=".8"/></g>';
    }
    return g('<path d="M66 8h52" fill="none" stroke="#6b3f26" stroke-width="1"/>' + kite("k1", 74, 20, "#e5483f", "#fcd34d") + kite("k2", 92, 26, "#5b9bd5", "#e5483f") + kite("k3", 110, 19, "#5a9a45", "#f28baa"));
  })();
  // A shop at the side of the bazaar: shelves behind the seller, and the counter in front (stage units).
  R["h-shop-back"] = g('<rect x="2" y="12" width="44" height="50" fill="#f6e3c6"/><path d="M0 12h48l-3 6H3z" fill="#e5483f"/><path d="M8 12l-1 6M16 12l-.5 6M24 12v6M32 12l.5 6M40 12l1 6" fill="none" stroke="#fff" stroke-width="1"/>' +
    '<rect x="5" y="28" width="38" height="1.6" fill="#b57638"/><rect x="5" y="40" width="38" height="1.6" fill="#b57638"/>' +
    '<g stroke-width=".4">' + [8, 15, 22, 29, 36].map(function (x, i) { return '<rect x="' + x + '" y="22" width="4.4" height="6" rx="1" fill="' + ["#fcd34d", "#f28baa", "#7cc6e8", "#8bc34a", "#f59e0b"][i] + '"/><rect x="' + (x + 1) + '" y="35" width="4" height="5" rx=".6" fill="' + ["#e5483f", "#5b9bd5", "#fcd34d", "#c9b6e4", "#8bc34a"][i] + '"/>'; }).join("") + "</g>");
  R["h-shop-front"] = g('<rect x="2" y="58" width="46" height="31" rx="1" fill="#c98a4b"/><rect x="2" y="56" width="48" height="3" rx=".8" fill="#a0683f"/><path d="M8 66h32M8 76h32" fill="none" stroke="#a0683f" stroke-width=".6"/>');
  // A calm breath: a soft ring that grows and shrinks (origin: its middle).
  R["h-breath"] = '<circle r="7" fill="#bfe3f5" opacity=".45"/><circle r="7" fill="none" stroke="#5b9bd5" stroke-width=".6" stroke-dasharray="1.6 1.2"/>';
  // A spot on the floor: stay here (origin: its middle).
  R["h-spot"] = '<ellipse rx="9" ry="2.6" fill="#fcd34d" opacity=".5"/><ellipse rx="9" ry="2.6" fill="none" stroke="#f59e0b" stroke-width=".6" stroke-dasharray="1.6 1.2"/>';
  // A phone ringing: little lines around it (origin: the phone).
  R["h-ring-lines"] = '<g fill="none" stroke="#e5483f" stroke-width=".8" stroke-linecap="round"><path d="M-4-4l-1.6-1.6M4-4l1.6-1.6M-5 0h-2M5 0h2"/></g>';
  // A heart (origin: its middle).
  R["h-heart"] = g('<path d="M0 4c-5-3-6.4-5.6-5-7.4 1.2-1.4 3.6-1.2 5 .8 1.4-2 3.8-2.2 5-.8 1.4 1.8 0 4.4-5 7.4z" fill="#e5483f"/>');

  /* ---------------- sleep, play and exercise (health-sapling-1) ---------------- */
  // A park: sky, hills, a tree and grass from y = 62 (stage units).
  R["h-park"] = g('<rect width="160" height="62" fill="#cfe9f7" stroke="none"/><circle cx="138" cy="14" r="7" fill="#fcd34d"/>' +
    '<path d="M0 62c20-14 46-16 70-6 26-12 60-12 90 2v4H0z" fill="#9cc98a"/><rect y="62" width="160" height="28" fill="#8bc34a" stroke="none"/><path d="M0 62h160" fill="none"/>' +
    '<rect x="14" y="34" width="4" height="28" fill="#8a5a3a"/><circle cx="16" cy="28" r="12" fill="#5a9a45"/><circle cx="8" cy="34" r="7" fill="#5a9a45"/><circle cx="24" cy="34" r="7" fill="#5a9a45"/>' +
    '<g fill="none" stroke="#6fa83a" stroke-width=".5"><path d="M30 76l1-2 1 2M90 84l1-2 1 2M130 74l1-2 1 2M60 70l1-2 1 2"/></g>');
  // A park bench from the side (origin: the middle of its feet); the seat is 8 up.
  R["h-bench"] = g('<rect x="-12" y="-9" width="24" height="2.2" rx=".6" fill="#c98a4b"/><rect x="-12" y="-19" width="2" height="12" fill="#b57638"/><rect x="-11" y="-17" width="2" height="7" fill="#c98a4b" transform="skewX(-8)"/>' +
    '<rect x="-10" y="-7" width="1.8" height="7" fill="#5a6b7a"/><rect x="8" y="-7" width="1.8" height="7" fill="#5a6b7a"/>');
  // A bed from the side, the pillow on the left (origin: the middle of its feet); the mattress top is 11 up.
  R["h-bed"] = g('<rect x="-30" y="-24" width="4" height="24" rx="1.2" fill="#c98a4b"/><rect x="26" y="-15" width="4" height="15" rx="1.2" fill="#c98a4b"/>' +
    '<rect x="-27" y="-8" width="54" height="4" fill="#a0683f"/><rect x="-27" y="-11.6" width="54" height="4" rx="1.4" fill="#fff"/>' +
    '<ellipse cx="-20" cy="-13" rx="6" ry="2.6" fill="#fff"/>');
  // The blanket over someone lying in "h-bed" (same origin as the bed).
  R["h-blanket"] = g('<path d="M-10-11.6c0-4 2-6.4 6-6.4h24c4 0 7 2.4 7 6.4z" fill="#5b9bd5"/><path d="M-8-14.6h34" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="2 1.6"/>');
  // A wall clock (origin: its middle); pieces hour and min turn around the middle (both point to 12 at first).
  R["h-clock"] = g('<circle r="7" fill="#fff"/><g fill="none" stroke-width=".5">' + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(function (a) {
    var r1 = a % 90 ? 5.6 : 5, x1 = Math.sin(a * Math.PI / 180), y1 = -Math.cos(a * Math.PI / 180);
    return '<path d="M' + f(x1 * r1) + " " + f(y1 * r1) + "L" + f(x1 * 6.3) + " " + f(y1 * 6.3) + '"/>'; }).join("") + "</g>" +
    '<g data-part="hour" data-pivot="0 0"><path d="M0 0v-3.6" fill="none" stroke-width="1"/></g><g data-part="min" data-pivot="0 0"><path d="M0 0v-5.4" fill="none" stroke="#e5483f" stroke-width=".6"/></g><circle r=".7" fill="#3d2c22"/>');
  // A dream bubble with today's ball and book in it (origin: the small end of the bubbles, near the sleeper).
  R["h-dream"] = g('<circle cx="2" cy="-3" r="1.2" fill="#fff"/><circle cx="5" cy="-7" r="2" fill="#fff"/>' +
    '<path d="M4-14c-2-4 2-8 6-6 1-4 7-5 9-1 4-2 8 1 7 5 4 1 4 7 0 8 0 4-5 6-8 3-2 3-8 3-9-1-4 1-7-4-5-8z" fill="#fff"/>' +
    '<circle cx="11" cy="-14" r="3.2" fill="#fff"/><path d="M7.8-14h6.4M11-17.2c-1.2 2-1.2 4.4 0 6.4" fill="none" stroke="#e5483f" stroke-width=".6"/>' +
    '<path d="M16-16.4l3.4.8 3.4-.8v5.4l-3.4.8-3.4-.8z" fill="#fff6e0"/><path d="M19.4-15.6v5.4" fill="none" stroke-width=".4"/>');

  /* ---------------- feelings in the body (health-sapling-2) ---------------- */
  // Heat rising from a head: wavy red lines (origin: their bottom).
  R["h-heat"] = '<g fill="none" stroke="#e5483f" stroke-width=".8" stroke-linecap="round" opacity=".8"><path d="M-5 0c-1-1.4 1-2.4 0-3.8s1-2.4 0-3.8"/><path d="M0-1c-1-1.4 1-2.4 0-3.8s1-2.4 0-3.8"/><path d="M5 0c-1-1.4 1-2.4 0-3.8s1-2.4 0-3.8"/></g>';
  // A balloon on a string (origin: the end of the string).
  R["h-balloon"] = g('<path d="M0 0c1-3-1-5 0-8" fill="none" stroke-width=".4"/><path d="M0-8l-1-1h2z" fill="#e5483f"/><ellipse cx="0" cy="-14" rx="4.4" ry="5.4" fill="#e5483f"/><path d="M-2-16c.4-1.4 1.2-2 2-2.2" fill="none" stroke="#fff" stroke-width=".6"/>');

  /* ---------------- body safety (health-sapling-3, health-all-1): calm, never frightening ---------------- */
  // A space around someone that is theirs: a soft dashed ring (origin: its middle).
  R["h-space"] = '<ellipse rx="16" ry="24" fill="#bfe3f5" opacity=".25"/><ellipse rx="16" ry="24" fill="none" stroke="#5b9bd5" stroke-width=".8" stroke-dasharray="2.4 1.6"/>';
  // A wrapped present (origin: its bottom).
  R["h-gift"] = g('<rect x="-5" y="-8" width="10" height="8" rx=".8" fill="#f28baa"/><rect x="-6" y="-10" width="12" height="2.6" rx=".6" fill="#f28baa"/>' +
    '<path d="M0-10v10" fill="none" stroke="#fcd34d" stroke-width="1.6"/><path d="M0-10c-2-3-5-3-4-1 .4 1 2 1 4 1 2 0 3.6 0 4-1 1-2-2-2-4 1z" fill="#fcd34d" stroke-width=".4"/>');
  // A worry: a grey cloud with a padlock on it; piece shackle lifts to open the lock (origin: the cloud's middle).
  R["h-cloud"] = g('<path d="M-12 4c-4 0-5-5-1-6-1-4 4-7 7-4 1-4 8-4 9 0 3-2 7 1 6 4 4 0 4 6 0 6z" fill="#b8c0c8"/>' +
    '<g data-part="shackle" data-pivot="2.2 -1"><path d="M-2.2-1v-2.2a2.2 2.2 0 0 1 4.4 0V-1" fill="none" stroke-width="1"/></g>' +
    '<rect x="-3.2" y="-1" width="6.4" height="5" rx=".8" fill="#fcd34d"/><circle cx="0" cy="1.2" r=".6" fill="#3d2c22" stroke="none"/>');
  // A bathtub seen from the front, full of foam (origin: the middle of its feet).
  R["h-tub"] = g('<path d="M-34-22h68v4c0 9-6 14-14 14h-40c-8 0-14-5-14-14z" fill="#fff"/><path d="M-26-4l-3 4M26-4l3 4" fill="none" stroke-width="1.2"/>' +
    '<g fill="#fff" stroke="#9fd3f0" stroke-width=".4">' + [-30, -22, -14, -6, 2, 10, 18, 26].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (-22 - (i % 2) * 1.4) + '" r="' + (3 + (i % 3)) + '"/>'; }).join("") + "</g>");

  /* ---------------- fire and heat (health-sapling-4) ---------------- */
  // A cooker from the front with a pot on it (origin: the middle of its feet). Pieces: flame (flickers), lid.
  R["h-stove"] = g('<rect x="-15" y="-22" width="30" height="22" rx="1.2" fill="#e9eef1"/><rect x="-11" y="-16" width="22" height="12" rx="1" fill="#3d4660"/><rect x="-9" y="-14" width="18" height="8" fill="#5a6b7a" stroke="none"/>' +
    '<circle cx="-9" cy="-19" r="1" fill="#5a6b7a"/><circle cx="-5" cy="-19" r="1" fill="#5a6b7a"/><rect x="-16" y="-24" width="32" height="2.4" rx=".6" fill="#b8c0c8"/>' +
    '<g data-part="flame" data-pivot="0 -24"><path d="M-6-24c0-2 1.6-2.4 1.6-4 1 1 1.4 2 1.6 4zM-1.6-24c0-2.2 1.6-2.8 1.6-4.4 1 1.2 1.6 2.2 1.6 4.4zM3-24c0-2 1.4-2.4 1.6-4 1 1 1.4 2 1.6 4z" fill="#5b9bd5" stroke="none" opacity=".85"/></g>' +
    '<path d="M-8-27h16v-7c0-1-.8-1.6-1.6-1.6H-6.4c-.8 0-1.6.6-1.6 1.6z" fill="#b5523b"/><path d="M-9.6-33h1.6M8-33h1.6" fill="none" stroke-width="1"/>' +
    '<g data-part="lid" data-pivot="0 -36"><path d="M-7.4-35.6c0-2 3.4-3 7.4-3s7.4 1 7.4 3z" fill="#9c3f33"/><circle cx="0" cy="-39" r=".9" fill="#3d2c22"/></g>');
  // A samovar with the teapot on top (origin: the middle of its foot).
  R["h-samovar"] = g('<path d="M-4 0h8l-1-3H-3z" fill="#d9a441"/><path d="M-2-3h4v-2h-4z" fill="#d9a441"/>' +
    '<path d="M-6-5c-1-5-1-10 0-14h12c1 4 1 9 0 14z" fill="#e7b75a"/><path d="M-6.4-14h-2v2h2M6.4-14h2v2h-2" fill="#d9a441"/><path d="M5-9h3v1.4H5z" fill="#d9a441"/>' +
    '<path d="M-2-19h4l-.6-2h-2.8z" fill="#d9a441"/><path d="M-4-21c0-3 1.6-4.4 4-4.4s4 1.4 4 4.4z" fill="#f4f6f8"/><path d="M4-23c2-.4 3-1.6 3.4-2.8" fill="none" stroke="#f4f6f8" stroke-width="1"/><circle cx="0" cy="-26" r=".8" fill="#e5483f"/>');
  // A box of matches and a lighter on the floor (origin: their middle).
  R["h-matches"] = g('<rect x="-6" y="-2.4" width="6.4" height="2.4" rx=".3" fill="#e5483f"/><rect x="-5.4" y="-2" width="5.2" height="1.6" fill="#fcd34d" stroke="none"/>' +
    '<rect x="2" y="-4.6" width="2.6" height="4.6" rx=".5" fill="#5b9bd5"/><rect x="2.2" y="-5.6" width="2.2" height="1.2" fill="#b8c0c8"/>');
  // Smoke under the ceiling: soft grey clouds, stage units, from the top down to about y = 34.
  R["h-smoke"] = '<g fill="#9aa3ab" opacity=".55"><rect x="0" y="0" width="160" height="22"/>' + [10, 34, 58, 82, 106, 130, 154].map(function (x, i) {
    return '<circle cx="' + x + '" cy="' + (24 + (i % 2) * 4) + '" r="' + (8 + (i % 3) * 2) + '"/>'; }).join("") + "</g>";
  // A door in the back wall of "h-room" (origin: its bottom-left corner, on the floor line); piece leaf opens.
  R["h-door"] = g('<rect x="0" y="-34" width="18" height="34" fill="#5a4636"/>' +
    '<g data-part="leaf" data-pivot="0 0"><rect x="0" y="-34" width="18" height="34" fill="#c98a4b"/><circle cx="15" cy="-17" r="1" fill="#fcd34d"/><path d="M3-30h12v11H3zM3-15h12v11H3z" fill="none" stroke-width=".4"/></g>');
  // Outside: the sky, the house with its open door on the left, the pavement (stage units).
  R["h-outside"] = g('<rect width="160" height="66" fill="#cfe9f7" stroke="none"/>' +
    '<rect x="6" y="26" width="52" height="40" fill="#f0d2a6"/><path d="M2 28L32 8l30 20z" fill="#b5523b"/><rect x="18" y="42" width="14" height="24" fill="#5a4636"/><rect x="38" y="36" width="12" height="10" fill="#bfe3f5"/>' +
    '<rect y="66" width="160" height="24" fill="#d8d2c8" stroke="none"/><path d="M0 66h160" fill="none"/><path d="M96 78h64" fill="none" stroke="#b8b0a4" stroke-width=".5"/>');
  // A sign with a number on it (set by a count track; origin: its middle).
  R["h-number"] = g('<rect x="-11" y="-6" width="22" height="12" rx="3" fill="#fff"/><text data-count y="3" text-anchor="middle" font-size="8.5" font-weight="800" fill="#e5483f" stroke="none"></text>');

  /* ---------------- the earthquake drill (health-all-2) ---------------- */
  // A lamp hanging from the ceiling (origin: where it hangs); piece swing.
  R["h-lamp"] = g('<g data-part="swing" data-pivot="0 0"><path d="M0 0v12" fill="none" stroke-width=".6"/><path d="M-6 18c0-4 2.6-6 6-6s6 2 6 6z" fill="#f59e0b"/><circle cx="0" cy="18.6" r="1.4" fill="#fef3c7"/></g>');
  // A landing in the building: the lift, its doors shut and a "not now" sign, and stairs going down to the right
  // (stage units; the floor is at y = 88 on the left, the stairs go down from x = 92).
  R["h-hall"] = g('<rect width="160" height="90" fill="#efe6d6" stroke="none"/><rect y="0" width="160" height="4" fill="#e1d4bd" stroke="none"/>' +
    '<rect x="14" y="30" width="30" height="58" fill="#b8c0c8"/><path d="M29 30v58" fill="none"/><rect x="18" y="24" width="22" height="4" rx="1" fill="#5a6b7a"/>' +
    '<circle cx="50" cy="52" r="3.4" fill="#fff" stroke="#e5483f" stroke-width=".9"/><path d="M47.6 49.6l4.8 4.8" fill="none" stroke="#e5483f" stroke-width=".9"/><path d="M49 51.4h2v2h-2z" fill="#5a6b7a" stroke="none"/>' +
    '<rect x="0" y="86" width="96" height="4" fill="#d8c3a2"/>' +
    '<path d="M92 86h10v6h10v6h10v6h10v6h10v6h10v6" fill="none" stroke-width=".8"/><path d="M92 86h10v6h10v6h10v6h10v6h10v6h10v6V90H92z" fill="#d8c3a2" stroke="none"/>' +
    '<path d="M92 70l60 30" fill="none" stroke="#a0683f" stroke-width="1.2"/><path d="M100 74v12M112 80v12M124 86v12M136 92v12" fill="none" stroke="#a0683f" stroke-width=".6"/>');
  // A star (origin: its middle).
  R["h-star"] = g('<path d="M0-6l1.8 3.8 4.2.5-3.1 2.9.8 4.1L0 3.3l-3.7 2 .8-4.1-3.1-2.9 4.2-.5z" fill="#fcd34d"/>');

  /* ---------------- emergency numbers (health-all-3) ---------------- */
  // A sofa from the side (origin: the middle of its feet); the seat is 12 up, the back on the left.
  R["h-sofa"] = g('<rect x="-18" y="-26" width="7" height="22" rx="3" fill="#8e7cc3"/><rect x="-16" y="-13" width="32" height="7" rx="2.4" fill="#a08fd0"/>' +
    '<rect x="13" y="-17" width="6" height="11" rx="2.4" fill="#8e7cc3"/><rect x="-16" y="-6" width="34" height="3" fill="#6b5a9e"/><path d="M-14-3v3M14-3v3" fill="none" stroke-width="1.2"/>');
  // A flashing light for the roof of an emergency car (origin: its bottom); pieces red and blue blink.
  R["h-siren"] = g('<rect x="-3.4" y="-2" width="6.8" height="2" rx=".6" fill="#5a6b7a"/><g data-part="red"><path d="M-3-2v-1.6a1.6 1.6 0 0 1 3 0V-2z" fill="#e5483f"/></g>' +
    '<g data-part="blue" style="opacity:.3"><path d="M0-2v-1.6a1.6 1.6 0 0 1 3 0V-2z" fill="#5b9bd5"/></g>');
  // A small flame, as in a cartoon (origin: its bottom).
  R["h-flame"] = g('<path d="M0 0c-3.4 0-5-2.4-4-5.4.6-1.8 2-2.6 1.8-4.8 1.6 1 2.2 2.4 2 3.6 1-1.4 1.2-3.4.6-5.4 3 1.8 5 5 4.4 8.4C4.4-1.4 2.8 0 0 0z" fill="#f59e0b"/><path d="M0-.8c-1.6 0-2.4-1.2-1.8-2.6.4-1 1.2-1.4 1.4-2.6 1.4 1 2.2 2.4 2 3.6-.2 1-.8 1.6-1.6 1.6z" fill="#fcd34d" stroke="none"/>');
  // A speech bubble with a house in it: "this is where we live" (origin: its tail, bottom left).
  R["h-sayhome"] = g('<path d="M0 0l3-5H2c-2 0-3-1-3-3v-12c0-2 1-3 3-3h22c2 0 3 1 3 3v12c0 2-1 3-3 3H7z" fill="#fff"/>' +
    '<path d="M8-13l5-4 5 4v6H8z" fill="#f0d2a6"/><path d="M7-13l6-5 6 5" fill="#b5523b"/><rect x="11.8" y="-11" width="2.4" height="4" fill="#5a4636"/>');
})();
