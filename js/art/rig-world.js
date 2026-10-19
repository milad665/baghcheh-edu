/* باغچه — drawings for the «ایران و جهان» scenes (step type `scene`, js/scene.js), added to B.RIG next to the ones
   in js/art/rig.js and in the same style: flat picture-book shapes, warm colours, the dark outline (#3d2c22), no text.
   Every key starts with "w-". Each drawing has its origin (0, 0) where it stands (the middle of its bottom edge),
   unless its comment says it is drawn in stage units (160 × 90) at its own place.

   People are drawn from the front, with moving pieces: armL, armR, legL, legR (left and right as you look at them),
   head, and in the face eyes, shut (closed eyes), smile, laugh and sad (hidden until a track shows them). An arm
   hangs down at r 0; r 90 lifts the left arm out sideways and r -90 the right one; r ±160 brings a hand to the face.
   A child is about 30 units tall, a grown-up about 37 (sitting, 10 less). */
var B = window.B || {};
window.B = B;
B.RIG = B.RIG || {};

(function () {
  var O = ' stroke="#3d2c22" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
  var SKIN = "var(--skin,#f3c39b)";
  var INK = "#3d2c22";
  function g(inner, extra) { return "<g" + O + (extra || "") + ">" + inner + "</g>"; }
  function f(n) { return +n.toFixed(2); }
  function add(o) { Object.keys(o).forEach(function (k) { B.RIG[k] = o[k]; }); }

  /* ---------------- people ---------------- */
  // o: adult, skin, hair (colour), style (short | long | pony | bun | curly | scarf | bald), scarf (colour), shirt,
  // sleeve ("short"), pants, skirt (colour; long: a long dress), legs (colour under a skirt), shoes, beard,
  // mustache, glasses, hat (svg on the head), front (svg over the body: an apron, a coat), back (seen from behind),
  // sit, baby, holdL / holdR (svg in that hand, the hand at 0 0).
  // kind (girl | woman | grandma) with key: whether she wears a headscarf is decided by B.headscarf (js/art/rig.js),
  // by chance and fixed for that character, never by who she is or where she is.
  var SCARVES = ["#7b5ea7", "#3fb0a8", "#e46b8a", "#e7c27a", "#5b9bd5", "#c4673a"];
  function person(o) {
    if (o.kind) {
      o = Object.assign({}, o);
      if (B.headscarf && B.headscarf(o.key || "", o.kind)) {
        o.style = "scarf"; o.hat = null;
        if (!o.scarf) o.scarf = SCARVES[String(o.key).length % SCARVES.length];
      } else if (o.style === "scarf") o.style = o.kind === "grandma" ? "bun" : "long";
    }
    var A = !!o.adult, sk = o.skin || SKIN;
    var leg = o.baby ? 5 : A ? 13 : 9.5, bw = o.baby ? 9 : A ? 10.6 : 9, bh = o.baby ? 7.6 : A ? 12.6 : 9.6;
    var arm = o.baby ? 5.6 : A ? 11 : 8.6, hr = o.baby ? 5.6 : A ? 5.3 : 5.8;
    var hip = -leg, top = hip - bh + 0.6, sh = top + 1.2, hy = top - hr + 0.6, sx = bw / 2 - 0.5;
    var hair = o.hair || "#4a2f1f", shirt = o.shirt || "#4f8fd6", pants = o.pants || "#5a5f7a", shoes = o.shoes || "#c0503e";
    var lift = o.sit ? leg - 3.4 : 0, out = "";
    // legs, or a lap when sitting
    function legP(name, x) {
      var col = o.skirt ? (o.legs || sk) : pants;
      return '<g data-part="' + name + '" data-pivot="' + x + " " + hip + '"><rect x="' + f(x - 1.5) + '" y="' + f(hip - 0.6) + '" width="3" height="' + f(leg - 0.3) + '" rx="1.3" fill="' + col + '"/>' +
        '<ellipse cx="' + f(x + (x < 0 ? -0.5 : 0.5)) + '" cy="-0.9" rx="2.1" ry="1.1" fill="' + shoes + '"/></g>';
    }
    if (o.sit) {
      out += '<path d="M' + f(-bw / 2 - 3) + ' -.2c0-2.4 1.4-3.6 3.6-3.6h' + f(bw - 1.2) + 'c2.2 0 3.6 1.2 3.6 3.6z" fill="' + (o.skirt || pants) + '"/>' +
        '<ellipse cx="' + f(-bw / 2 - 1.4) + '" cy="-.8" rx="1.8" ry="1" fill="' + shoes + '"/><ellipse cx="' + f(bw / 2 + 1.4) + '" cy="-.8" rx="1.8" ry="1" fill="' + shoes + '"/>';
    } else {
      out += legP("legL", -2.2) + legP("legR", 2.2);
    }
    var up = "";
    // a skirt or dress over the legs
    if (o.skirt && !o.sit) {
      var sl = o.long ? leg - 2.4 : 4.6;
      up += '<path d="M' + f(-bw / 2) + " " + f(hip - 1) + "h" + bw + "l" + (o.long ? 2.4 : 2) + " " + f(sl + 1) + "h" + f(-bw - (o.long ? 4.8 : 4)) + 'z" fill="' + o.skirt + '"/>';
    }
    if (o.backpack && !o.back) up += '<rect x="' + f(-bw / 2 - 0.6) + '" y="' + f(top - 0.6) + '" width="' + f(bw + 1.2) + '" height="' + f(bh - 2) + '" rx="2" fill="' + o.backpack + '"/>';
    up += '<path d="M' + f(-bw / 2) + " " + f(top + 1.4) + "q0-1.4 1.4-1.4h" + f(bw - 2.8) + "q1.4 0 1.4 1.4l.5 " + f(bh - 1.4) + "h" + f(-bw - 1) + 'z" fill="' + shirt + '"/>';
    if (o.back && o.backpack) up += '<rect x="' + f(-bw / 2 + 1) + '" y="' + f(top + 1) + '" width="' + f(bw - 2) + '" height="' + f(bh - 3) + '" rx="1.6" fill="' + o.backpack + '"/>';
    if (o.backpack && !o.back) up += '<path d="M' + f(-sx + 1) + " " + f(top + 0.2) + "v" + f(bh - 2.6) + "M" + f(sx - 1) + " " + f(top + 0.2) + "v" + f(bh - 2.6) + '" fill="none" stroke="' + o.backpack + '" stroke-width="1.1"/>';
    if (o.front) up += '<g transform="translate(0 ' + f(top) + ')">' + o.front + "</g>";
    // arms (as you look at them: armL on the left)
    function armP(name, x, hold) {
      var hx = x, hy2 = sh + arm - 0.6;
      var a = '<g data-part="' + name + '" data-pivot="' + x + " " + sh + '">';
      if (o.sleeve === "short") a += '<rect x="' + f(x - 1.35) + '" y="' + f(sh - 1) + '" width="2.7" height="' + arm + '" rx="1.35" fill="' + sk + '"/><rect x="' + f(x - 1.5) + '" y="' + f(sh - 1.2) + '" width="3" height="' + f(arm * 0.42) + '" rx="1.3" fill="' + shirt + '"/>';
      else a += '<rect x="' + f(x - 1.35) + '" y="' + f(sh - 1) + '" width="2.7" height="' + arm + '" rx="1.35" fill="' + (o.coat || shirt) + '"/>';
      a += '<circle cx="' + hx + '" cy="' + f(hy2) + '" r="1.45" fill="' + sk + '"/>';
      if (hold) a += '<g transform="translate(' + hx + " " + f(hy2) + ')">' + hold + "</g>";
      return a + "</g>";
    }
    // the head, with its hair and face
    var h = '<g data-part="head" data-pivot="0 ' + f(top + 0.4) + '">';
    h += '<rect x="-1.3" y="' + f(top - 1.6) + '" width="2.6" height="2.4" fill="' + sk + '"/>';
    var style = o.style || "short";
    if (style === "scarf") {
      h += '<path d="M' + f(-hr - 1.5) + " " + f(hy + 1) + "C" + f(-hr - 1.7) + " " + f(hy - hr * 1.55) + " " + f(hr + 1.7) + " " + f(hy - hr * 1.55) + " " + f(hr + 1.5) + " " + f(hy + 1) +
        "L" + f(hr + 2.2) + " " + f(top + 2.6) + "H" + f(-hr - 2.2) + 'z" fill="' + o.scarf + '"/>';
    }
    if (style === "long" || style === "pony" && o.back) h += '<path d="M' + f(-hr - 0.8) + " " + f(hy - 1) + "v" + f(hr + 3.6) + "q0 1 1 1h" + f(2 * hr - 0.4) + "q1 0 1-1v" + f(-hr - 3.6) + 'z" fill="' + hair + '"/>';
    if (style === "pony") h += '<circle cx="' + f(-hr - 0.7) + '" cy="' + f(hy - hr * 0.45) + '" r="1.8" fill="' + hair + '"/><circle cx="' + f(hr + 0.7) + '" cy="' + f(hy - hr * 0.45) + '" r="1.8" fill="' + hair + '"/>';
    if (style === "bun") h += '<circle cy="' + f(hy - hr - 0.5) + '" r="2.1" fill="' + hair + '"/>';
    h += '<circle cy="' + f(hy) + '" r="' + hr + '" fill="' + sk + '"/>';
    if (!o.back) h += '<circle cx="' + f(-hr) + '" cy="' + f(hy + 0.6) + '" r="1.1" fill="' + sk + '"/><circle cx="' + f(hr) + '" cy="' + f(hy + 0.6) + '" r="1.1" fill="' + sk + '"/>';
    if (o.back) {
      if (style === "scarf") h += '<circle cy="' + f(hy - 0.2) + '" r="' + f(hr + 0.4) + '" fill="' + o.scarf + '"/>';
      else if (style === "bald") h += '<path d="M' + f(-hr + 0.2) + " " + f(hy + 1.6) + "q" + f(hr - 0.2) + " 2 " + f(2 * hr - 0.4) + ' 0" fill="none" stroke="#e8e4de" stroke-width="1.4"/>';
      else h += '<path d="M' + f(-hr - 0.2) + " " + f(hy + 2) + "C" + f(-hr - 0.6) + " " + f(hy - hr * 1.4) + " " + f(hr + 0.6) + " " + f(hy - hr * 1.4) + " " + f(hr + 0.2) + " " + f(hy + 2) + "q" + f(-hr) + " 2.6 " + f(-2 * hr - 0.4) + ' 0z" fill="' + hair + '"/>';
    } else {
      var ey = f(hy + 0.3), ex = f(hr * 0.37);
      h += '<g data-part="eyes" fill="' + INK + '" stroke="none"><ellipse cx="' + (-ex) + '" cy="' + ey + '" rx=".55" ry=".78"/><ellipse cx="' + ex + '" cy="' + ey + '" rx=".55" ry=".78"/></g>';
      h += '<path data-part="shut" style="opacity:0" d="M' + f(-ex - 0.8) + " " + ey + "q.8.7 1.6 0M" + f(ex - 0.8) + " " + ey + 'q.8.7 1.6 0" fill="none" stroke-width=".45"/>';
      h += '<g fill="#f28b82" stroke="none" opacity=".5"><circle cx="' + f(-hr * 0.6) + '" cy="' + f(hy + 1.9) + '" r=".95"/><circle cx="' + f(hr * 0.6) + '" cy="' + f(hy + 1.9) + '" r=".95"/></g>';
      if (o.beard) h += '<path d="M' + f(-hr + 0.2) + " " + f(hy + 0.2) + "C" + f(-hr + 0.2) + " " + f(hy + hr + 2) + " " + f(hr - 0.2) + " " + f(hy + hr + 2) + " " + f(hr - 0.2) + " " + f(hy + 0.2) +
        "C" + f(hr * 0.6) + " " + f(hy + 3) + " " + f(-hr * 0.6) + " " + f(hy + 3) + " " + f(-hr + 0.2) + " " + f(hy + 0.2) + 'z" fill="' + o.beard + '"/>';
      if (o.mustache) h += '<path d="M-2 ' + f(hy + 2.1) + "q1-.9 2-.2 1-.7 2 .2q-1 .7-2 .1-1 .6-2-.1z" + '" fill="' + o.mustache + '" stroke-width=".35"/>';
      var my = f(hy + 2.5);
      h += '<path data-part="smile" d="M-1.3 ' + my + 'q1.3 1.1 2.6 0" fill="none" stroke-width=".5"/>';
      h += '<path data-part="laugh" style="opacity:0" d="M-1.7 ' + f(my - 0.3) + 'h3.4q-.1 2.4-1.7 2.4t-1.7-2.4z" fill="#a8423b" stroke-width=".4"/>';
      h += '<path data-part="sad" style="opacity:0" d="M-1.2 ' + f(my + 0.8) + 'q1.2-1 2.4 0" fill="none" stroke-width=".5"/>';
      if (o.glasses) h += '<g fill="none" stroke-width=".4"><circle cx="' + (-ex) + '" cy="' + ey + '" r="1.5"/><circle cx="' + ex + '" cy="' + ey + '" r="1.5"/><path d="M' + f(-ex + 1.5) + " " + ey + "h" + f(2 * ex - 3) + '"/></g>';
      // the hair in front
      var cap = function (col, lo) {
        return '<path d="M' + f(-hr - 0.3) + " " + f(hy + (lo || 0.8)) + "C" + f(-hr - 0.5) + " " + f(hy - hr * 1.35) + " " + f(hr + 0.5) + " " + f(hy - hr * 1.35) + " " + f(hr + 0.3) + " " + f(hy + (lo || 0.8)) +
          "C" + f(hr * 0.55) + " " + f(hy - hr * 0.35) + " " + f(-hr * 0.25) + " " + f(hy - hr * 0.62) + " " + f(-hr - 0.3) + " " + f(hy + (lo || 0.8)) + 'z" fill="' + col + '"/>';
      };
      if (style === "scarf") h += '<path d="M' + f(-hr - 0.2) + " " + f(hy) + "C" + f(-hr - 0.2) + " " + f(hy - hr * 1.2) + " " + f(hr + 0.2) + " " + f(hy - hr * 1.2) + " " + f(hr + 0.2) + " " + f(hy) +
        "C" + f(hr * 0.5) + " " + f(hy - hr * 0.72) + " " + f(-hr * 0.5) + " " + f(hy - hr * 0.72) + " " + f(-hr - 0.2) + " " + f(hy) + 'z" fill="' + o.scarf + '"/>' +
        '<path d="M' + f(-hr * 0.55) + " " + f(hy - hr * 0.62) + "q" + f(hr * 0.55) + " -.9 " + f(hr * 1.1) + ' 0" fill="none" stroke="' + hair + '" stroke-width="1"/>';
      else if (style === "bald") h += '<g fill="#e8e4de"><ellipse cx="' + f(-hr + 0.2) + '" cy="' + f(hy - 0.6) + '" rx="1.1" ry="2"/><ellipse cx="' + f(hr - 0.2) + '" cy="' + f(hy - 0.6) + '" rx="1.1" ry="2"/></g>';
      else if (style === "curly") {
        var c = "";
        for (var i = 0; i < 7; i++) { var a = Math.PI * (1.05 + i * 0.15); c += '<circle cx="' + f(Math.cos(a) * hr * 0.92) + '" cy="' + f(hy + Math.sin(a) * hr * 0.92) + '" r="2"/>'; }
        h += '<g fill="' + hair + '">' + c + "</g>";
      } else h += cap(hair);
    }
    if (o.hat) h += '<g transform="translate(0 ' + f(hy - hr) + ')">' + o.hat + "</g>";
    h += "</g>";
    // the arms after the head, so a hand can come to the mouth or the eyes
    up += h + armP("armL", -sx, o.holdL) + armP("armR", sx, o.holdR);
    out += lift ? '<g transform="translate(0 ' + f(lift) + ')">' + up + "</g>" : up;
    return g(out);
  }
  // Shared with the drawings further down this file.
  B.worldArt = { g: g, f: f, add: add, person: person, O: O, SKIN: SKIN };

  // Things people wear or hold (in the hand's or the body's own units).
  var APRON = '<path d="M-3.6 1.6h7.2l.6 9H-4.2z" fill="#fff"/><path d="M-3.6 1.6l-.8-1.4M3.6 1.6l.8-1.4" fill="none" stroke="#fff" stroke-width=".8"/>';
  var COAT = '<path d="M-5.4 1.4q0-1.4 1.4-1.4h1.6l2.4 7 2.4-7H4q1.4 0 1.4 1.4l.6 12.4H-6z" fill="#fff"/><path d="M0 7v6.6" fill="none" stroke-width=".4"/>';
  var STETHO = '<path d="M-2.4.2c-.6 3 .2 5 2.4 5s3-2 2.4-5" fill="none" stroke="#5a6b7a" stroke-width=".7"/><circle cx="0" cy="5.6" r="1" fill="#c8d2dc" stroke-width=".4"/>';
  var CHEF = '<path d="M-4 0c-2.6 0-3-3.6-.6-4 .4-2.4 3.6-2.8 4.6-1 1-1.8 4.2-1.4 4.6 1 2.4.4 2 4-.6 4z" fill="#fff"/><rect x="-4" y="-1" width="8" height="2" fill="#fff"/>';
  var STRAW = '<ellipse cy="1.2" rx="8" ry="1.6" fill="#e8c46a"/><path d="M-4.4 1c0-3 1.8-4.4 4.4-4.4s4.4 1.4 4.4 4.4z" fill="#e8c46a"/><path d="M-4.2 0h8.4" fill="none" stroke="#c0503e" stroke-width=".8"/>';
  var CAP_HAT = '<path d="M-5.4 1.4c0-3.6 2.4-5.4 5.4-5.4s5.4 1.8 5.4 5.4z" fill="#e5483f"/><path d="M1 1.2h6.4c.6 0 .6.8 0 .8H1z" fill="#e5483f"/>';
  var WOOL_HAT = '<path d="M-5.8 2.2c0-4.2 2.6-6.4 5.8-6.4s5.8 2.2 5.8 6.4z" fill="#5b9bd5"/><rect x="-6.2" y="1" width="12.4" height="2.4" rx="1.1" fill="#fff"/><circle cy="-4.6" r="1.6" fill="#fff"/>';
  var SCARF_NECK = '<path d="M-4.4.4h8.8v2.4h-8.8z" fill="#e5483f"/><path d="M2 2.6v4.4h2.2V2.6z" fill="#e5483f"/>';

  /* The people of these lessons. A name used in several lessons is a different child each time (only the drawing
     is shared). Women and girls have a kind, so B.headscarf decides their headscarf (STYLE.md rule 6). */
  var P = {
    // children
    "w-boy": { hair: "#4a2f1f", shirt: "#4f8fd6", pants: "#5a5f7a" },
    "w-boy2": { hair: "#2f2219", style: "curly", shirt: "#f2c14e", pants: "#4b5a78" },
    "w-boy3": { hair: "#1f1712", shirt: "#5aa36a", pants: "#6b5a4a", skin: "#d9a47a" },
    "w-boy4": { hair: "#6b3f26", shirt: "#e46b6b", pants: "#4b5a78", sleeve: "short" },
    "w-girl": { kind: "girl", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", skirt: "#b04a6a", legs: "#f2c14e" },
    "w-girl2": { kind: "girl", hair: "#2f2219", style: "long", shirt: "#8a6cc4", pants: "#4b5a78" },
    "w-girl3": { kind: "girl", hair: "#4a2f1f", style: "bun", shirt: "#f59e0b", skirt: "#5b9bd5", legs: "#fff" },
    "w-girl4": { kind: "girl", hair: "#1f1712", style: "long", shirt: "#3fb0a8", pants: "#5a5f7a", skin: "#d9a47a" },
    "w-aylar": { kind: "girl", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", pants: "#5a5f7a", skin: "#f7d7bb" },
    "w-haruto": { hair: "#1f1712", shirt: "#f2c14e", pants: "#4b5a78", skin: "#f7d7bb", sleeve: "short" },
    "w-wanjiru": { kind: "girl", hair: "#1f1712", style: "curly", shirt: "#5aa36a", skirt: "#5b9bd5", legs: "#6a432b", skin: "#6a432b" },
    "w-pedro": { hair: "#3a2416", shirt: "#e46b6b", pants: "#5b9bd5", skin: "#c98f63", sleeve: "short" },
    "w-zhiyar": { hair: "#2f2219", shirt: "#7a8a5a", pants: "#6b5a4a", skin: "#e9bb92" },
    "w-reem": { kind: "girl", hair: "#1f1712", style: "long", shirt: "#f59e0b", pants: "#4b5a78", skin: "#d9a47a" },
    "w-murad": { hair: "#1f1712", shirt: "#c0503e", pants: "#4b5a78", skin: "#e9bb92" },
    "w-mahgol": { kind: "girl", hair: "#1f1712", style: "bun", shirt: "#3fb0a8", skirt: "#c0503e", legs: "#c98f63", skin: "#c98f63" },
    "w-ani": { kind: "girl", hair: "#6b3f26", style: "long", shirt: "#5b9bd5", pants: "#5a5f7a", skin: "#f7d7bb" },
    "w-baby": { baby: true, sit: true, hair: "#6b3f26", style: "short", shirt: "#f7e27a", pants: "#f7e27a", shoes: "#f7e27a" },
    // grown-ups
    "w-mom": { kind: "woman", adult: true, hair: "#4a2f1f", style: "long", shirt: "#3fb0a8", pants: "#4b5a78" },
    "w-mom2": { kind: "woman", adult: true, hair: "#2f2219", style: "bun", shirt: "#e46b8a", skirt: "#8a6cc4", long: true, legs: "#8a6cc4" },
    "w-dad": { adult: true, hair: "#4a2f1f", beard: "#4a2f1f", shirt: "#5aa36a", pants: "#4b5a78" },
    "w-dad2": { adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5b9bd5", pants: "#5a5f7a" },
    "w-gran": { kind: "grandma", adult: true, style: "scarf", scarf: "#c9b6e4", hair: "#e8e4de", shirt: "#8a6cc4", skirt: "#8a6cc4", long: true, legs: "#8a6cc4" },
    "w-gran2": { kind: "grandma", adult: true, style: "scarf", scarf: "#f4efe6", hair: "#e8e4de", shirt: "#c0503e", skirt: "#5a9a45", long: true, legs: "#5a9a45" },
    "w-grandpa": { adult: true, style: "bald", mustache: "#e8e4de", shirt: "#a0785a", pants: "#6b5a4a", glasses: true },
    "w-grandpa2": { adult: true, style: "bald", beard: "#e8e4de", shirt: "#7a8a5a", pants: "#5a5f7a" },
    // the families of seed-7's friends
    "w-haruto-dad": { adult: true, hair: "#1f1712", glasses: true, shirt: "#7a8a9a", pants: "#4b5a78", skin: "#f7d7bb" },
    "w-wanjiru-mom": { kind: "woman", adult: true, hair: "#1f1712", style: "bun", shirt: "#f59e0b", skirt: "#5a9a45", long: true, legs: "#6a432b", skin: "#6a432b" },
    "w-pedro-dad": { adult: true, hair: "#3a2416", mustache: "#3a2416", shirt: "#5aa36a", pants: "#c98a4b", skin: "#c98f63", sleeve: "short" }
  };
  Object.keys(P).forEach(function (k) {
    if (P[k].kind) P[k].key = k;
    B.RIG[k] = person(P[k]);
    // The same person sitting on the floor ("w-mom-sit"), and the children with a school bag ("w-boy-bag").
    var s = Object.assign({}, P[k], { sit: true });
    B.RIG[k + "-sit"] = person(s);
    if (!P[k].adult) B.RIG[k + "-bag"] = person(Object.assign({}, P[k], { backpack: "#f59e0b" }));
  });
  add({
    // seed-1: Nazanin drinking milk (the bottle in her right hand), and with nothing.
    "w-baby-milk": person(Object.assign({}, P["w-baby"], { holdR: '<path d="M-.2-.7h-1.4v1.4h1.4z" fill="#f2c14e"/><rect x="-6.8" y="-1.3" width="5.2" height="2.6" rx=".8" fill="#fff"/><rect data-part="milk" data-pivot="-1.8 0" x="-6.4" y="-1" width="4.6" height="2" rx=".5" fill="#fdf6e3" stroke="none"/>' })),
    // workers of the neighbourhood (seed-3), seen at work
    "w-baker": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#f4efe6", pants: "#5a5f7a", front: APRON, hat: CHEF,
      holdR: '<g transform="rotate(-8)"><rect x="-.5" y="-12" width="1" height="13" fill="#c98a4b"/><ellipse cx="0" cy="-13" rx="3.4" ry="1.4" fill="#c98a4b"/></g>' }),
    "w-teacher": person({ adult: true, hair: "#2f2219", glasses: true, shirt: "#5a7fc4", pants: "#4b5a78" }),
    "w-gardener": person({ adult: true, hair: "#4a2f1f", mustache: "#4a2f1f", shirt: "#e46b6b", pants: "#4f8fd6", hat: STRAW,
      holdR: '<g data-part="can" data-pivot="0 0"><path d="M-2 0h5.6l-.6 4.6H-1.4z" fill="#5aa36a"/><path d="M3.4 1l4-2.6" fill="none" stroke="#5aa36a" stroke-width="1"/><path d="M7 -2.2l1.2-.4.2 1.4z" fill="#5aa36a"/></g>' }),
    "w-doctor": person({ kind: "woman", key: "w-doctor", adult: true, style: "scarf", scarf: "#7cc6e8", hair: "#4a2f1f", shirt: "#7cc6e8", pants: "#4b5a78", front: COAT + STETHO, coat: "#fff" }),
    "w-patient": person({ adult: true, hair: "#6b3f26", shirt: "#f2c14e", pants: "#5a5f7a", front: SCARF_NECK }),
    "w-fruiter": person({ adult: true, hair: "#4a2f1f", beard: "#4a2f1f", shirt: "#5aa36a", pants: "#5a5f7a", front: APRON }),
    // grown-ups outdoors (scarves)
    "w-mom-out": person({ kind: "woman", key: "w-mom-out", adult: true, style: "scarf", scarf: "#e46b8a", hair: "#4a2f1f", shirt: "#3fb0a8", pants: "#4b5a78" }),
    "w-driver-mom": person({ kind: "woman", key: "w-driver-mom", adult: true, style: "scarf", scarf: "#5b9bd5", hair: "#4a2f1f", shirt: "#3f5a8a", pants: "#3f5a8a" }),
    "w-farmer": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#c98a4b", pants: "#5a5f7a", hat: STRAW }),
    "w-farmer-sit": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#c98a4b", pants: "#5a5f7a", hat: STRAW, sit: true }),
    "w-fisher": person({ adult: true, hair: "#2f2219", beard: "#2f2219", shirt: "#5b9bd5", pants: "#c98a4b", skin: "#c98f63", sleeve: "short" }),
    // grandpa (seed-4) with a cloth bag for the bread
    "w-grandpa-bag": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#a0785a", pants: "#6b5a4a", glasses: true,
      holdL: '<path d="M-3 0h6l.6 7H-3.6z" fill="#e7c27a"/><path d="M-1.6 0c0-2 3.2-2 3.2 0" fill="none" stroke-width=".5"/>' }),
    // children of the world (seed-7) and of Iran (seed-6, sprout-6), each a different child
    "w-pedro-cap": person({ hair: "#3a2416", shirt: "#e46b6b", pants: "#5b9bd5", skin: "#c98f63", sleeve: "short", hat: CAP_HAT }),
    "w-aylar-coat": person({ kind: "girl", key: "w-aylar", hair: "#6b3f26", style: "pony", shirt: "#c0503e", pants: "#5a5f7a", skin: "#f7d7bb", hat: WOOL_HAT, front: SCARF_NECK }),
    // Arash, seen from behind (sprout-3), and from above
    "w-arash-back": person({ hair: "#4a2f1f", shirt: "#e46b6b", pants: "#4b5a78", back: true }),
    "w-arash-top": g('<ellipse cx="-3.6" rx="1.6" ry="2.4" fill="#e46b6b"/><ellipse cx="3.6" rx="1.6" ry="2.4" fill="#e46b6b"/><ellipse rx="4.2" ry="2.6" fill="#e46b6b"/><circle r="3" fill="#4a2f1f"/>')
  });
})();

/* ---------------- at home ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  // A room from the side, in stage units: the back wall with a window (sky at 66–94, 12–34), the floor from y 58.
  function room(wall, band, floor, line) {
    return g('<rect width="160" height="58" fill="' + wall + '" stroke="none"/><rect width="160" height="5" fill="' + band + '" stroke="none"/>' +
      '<rect x="62" y="9" width="36" height="28" rx="1.5" fill="#fff"/><rect x="64.5" y="11.5" width="31" height="23" fill="#bfe3f5"/>' +
      '<path d="M69 22c0-2.4 2.4-3.4 4-2.2 1-2.4 4.8-2.4 5.4 0 2.2 0 3.4 1.4 2.4 2.2z" fill="#fff" stroke="none"/><path d="M80 11.5v23M64.5 23h31" fill="none"/>' +
      '<rect x="0" y="56" width="160" height="2.2" fill="' + line + '"/><rect y="58" width="160" height="32" fill="' + floor + '" stroke="none"/>' +
      '<g fill="none" stroke="' + line + '" stroke-width=".4"><path d="M10 90L36 58M44 90L58 58M80 90V58M116 90L102 58M150 90L124 58M0 68h160M0 79h160"/></g>' +
      // the door, on the right
      '<rect x="136" y="20" width="18" height="38" rx="1" fill="#c98a4b"/><rect x="138.5" y="23" width="13" height="14" rx=".6" fill="#b57638"/><rect x="138.5" y="40" width="13" height="15" rx=".6" fill="#b57638"/><circle cx="139.6" cy="39" r=".9" fill="#fcd34d"/>');
  }
  W.add({
    "w-room": room("#f6e3c6", "#efd3ad", "#e7c69c", "#c9a074"),
    // the grandparents' home: another colour, the same shape
    "w-room2": room("#e1eed6", "#cfe0c2", "#d8c3a0", "#b49a70"),
    "w-room3": room("#f6dfe4", "#ecc9d1", "#e2c49e", "#c4a07a"),
    "w-room4": room("#dfe9f3", "#c9d9ea", "#e7c69c", "#c9a074"),
    // over the window (stage units): the morning sun, the evening and the night sky
    "w-win-sun": g('<circle cx="88" cy="18" r="3.4" fill="#fcd34d"/>'),
    "w-win-dusk": '<rect x="64.5" y="11.5" width="31" height="23" fill="#f7b37a" opacity=".75"/>',
    "w-win-night": g('<rect x="64.5" y="11.5" width="31" height="23" fill="#22305a"/><path d="M80 11.5v23M64.5 23h31" fill="none"/>' +
      '<path d="M90 15a4 4 0 1 0 3 5 3.2 3.2 0 1 1-3-5z" fill="#fde68a" stroke-width=".4"/><g fill="#fde68a" stroke="none"><circle cx="69" cy="15" r=".5"/><circle cx="74" cy="29" r=".5"/><circle cx="86" cy="30" r=".4"/></g>'),
    // the room at night: a lamp's warm light everywhere else (stage units)
    "w-night-dim": '<rect width="160" height="90" fill="#22305a" opacity=".22"/>',
    // a stove with a pan; the pan (with an egg) slides on the flame (origin: the middle of its bottom)
    "w-stove": g('<rect x="-12" y="-21" width="24" height="21" rx="1.2" fill="#f4f4f2"/><rect x="-9" y="-14" width="18" height="11" rx="1" fill="#cfd8dc"/><rect x="-6" y="-12" width="12" height="2" rx="1" fill="#b0bec5"/>' +
      '<rect x="-13" y="-23" width="26" height="2.4" rx=".8" fill="#b0bec5"/><g fill="#78909c"><circle cx="-8" cy="-18" r="1"/><circle cx="-4" cy="-18" r="1"/></g>' +
      '<path d="M-1-23.4c.4-1.6 1.2-1.6 1.4-2.8.6 1 .6 1.8 1.2 2.8z" fill="#5b9bd5" stroke="none"/><path d="M3-23.4c.4-1.6 1.2-1.6 1.4-2.8.6 1 .6 1.8 1.2 2.8z" fill="#5b9bd5" stroke="none"/>' +
      '<g data-part="pan" data-pivot="2 -25"><path d="M-5-26h14l-1 2.4H-4z" fill="#5a5f7a"/><path d="M9-25.4l8-1.6" fill="none" stroke="#3d2c22" stroke-width="1.4"/>' +
      '<ellipse cx="2" cy="-26.4" rx="4" ry="1.1" fill="#fff"/><circle cx="2.2" cy="-26.6" r="1.3" fill="#fcd34d"/></g>'),
    // a sofreh spread on the floor, with bread, plates and a pot (origin: its middle)
    "w-sofreh": g('<path d="M-36 4l6-9h60l6 9z" fill="#f4efe6"/><path d="M-33 2.6l4.6-6.6h56.8l4.6 6.6z" fill="none" stroke="#e46b6b" stroke-width=".6" stroke-dasharray="1.4 1"/>' +
      '<ellipse cx="-18" cy="-.6" rx="5" ry="1.6" fill="#fff"/><ellipse cx="18" cy="-.6" rx="5" ry="1.6" fill="#fff"/><ellipse cx="0" cy="2" rx="5" ry="1.6" fill="#fff"/>' +
      '<path d="M-8-3.6h9l-1 1.6h-7z" fill="#e7a95b"/><path d="M-5-3.4v1.2M-2-3.4v1.2" fill="none" stroke-width=".35"/>' +
      '<path d="M6-6h8l-.6 3.6H6.6z" fill="#c0503e"/><path d="M6-6c0-1.4 8-1.4 8 0" fill="#c0503e"/><ellipse cx="-24" cy="-2" rx="3" ry="1.4" fill="#f4f4f2"/><ellipse cx="-24" cy="-2.4" rx="2.2" ry=".8" fill="#5a9a45" stroke="none"/>'),
    // an open book (origin: the middle of its bottom edge); the right page turns over (the piece "page")
    "w-book": g('<path d="M-6 0l-.6-6.4c2-.8 4.4-.6 6.6.4 2.2-1 4.6-1.2 6.6-.4L6 0C4 -.6 2-.4 0 .4-2-.4-4-.6-6 0z" fill="#e46b6b"/>' +
      '<path d="M-5.4-.6l-.4-5.4c1.8-.5 3.8-.2 5.8.6v5.6c-1.8-.8-3.6-1-5.4-.8z" fill="#fff"/>' +
      '<g data-part="page" data-pivot="0 -3"><path d="M5.4-.6l.4-5.4c-1.8-.5-3.8-.2-5.8.6v5.6c1.8-.8 3.6-1 5.4-.8z" fill="#fff"/><path d="M1.2-4.4h3M1.2-3h3M1.2-1.6h2.4" fill="none" stroke-width=".3"/></g>' +
      '<path d="M-4.2-4.4h3M-4.2-3h3M-4.2-1.6h2.4" fill="none" stroke-width=".3"/>'),
    // a heart (origin: its middle)
    "w-heart": g('<path d="M0 4.6C-6-.2-7.2-2.6-7.2-4.6a3.6 3.6 0 0 1 7.2-1 3.6 3.6 0 0 1 7.2 1c0 2-1.2 4.4-7.2 9.2z" fill="#e5483f"/><path d="M-4.6-5.4c-.8.2-1.4 1-1.4 1.8" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>'),
    // a speech bubble (origin: its middle; 30 wide); words go on it as a separate text part
    "w-bubble": g('<path d="M-15-6.4q0-2.6 2.6-2.6h24.8q2.6 0 2.6 2.6v8.8q0 2.6-2.6 2.6H4l-4 4.4-1-4.4h-11.4q-2.6 0-2.6-2.6z" fill="#fff"/>'),
    "w-bubble-wide": g('<path d="M-24-6.4q0-2.6 2.6-2.6h42.8q2.6 0 2.6 2.6v8.8q0 2.6-2.6 2.6H4l-4 4.4-1-4.4h-20.4q-2.6 0-2.6-2.6z" fill="#fff"/>'),
    // a banknote for عیدی (origin: its middle)
    "w-money": g('<rect x="-5" y="-2.6" width="10" height="5.2" rx=".6" fill="#a7d99b"/><rect x="-3.8" y="-1.6" width="7.6" height="3.2" rx=".4" fill="none" stroke="#5a9a45" stroke-width=".4"/><circle r="1.2" fill="#5a9a45" stroke="none"/>')
  });

  /* ---------------- the map of Iran, small (from js/maps/iran.js, drawn when it is shown) ---------------- */
  /* A card with the map (origin: its middle; 46 × 40) and a red dot on a city that pulses (the piece "dot"); or the
     provinces named in `prov` coloured. at: [x, y] on the 400 × 336 map. */
  function iranMap(sc, opt) {
    var m = B.MAPS && B.MAPS.iran;
    if (!m) return "";
    var hi = {};
    (opt.prov || []).forEach(function (p) { hi[p] = true; });
    var s = '<g transform="scale(' + sc + ') translate(-200 -168)">' +
      '<rect width="400" height="336" fill="#a9d6f0"/>' +
      '<g fill="#e3dccb" stroke="#b5ab95" stroke-width="1.2">' + m.abroad.map(function (d) { return '<path d="' + d + '"/>'; }).join("") + "</g>" +
      '<g stroke="#c98a4b" stroke-width="' + (opt.lines ? 1.2 : 0.8) + '" stroke-linejoin="round">' + m.provinces.map(function (p) {
        return '<path d="' + p.d + '" fill="' + (hi[p.id] ? "#f59e0b" : "#f6e2a6") + '"/>'; }).join("") + "</g>";
    if (opt.at) s += '<g data-part="dot" data-pivot="' + opt.at[0] + " " + opt.at[1] + '"><circle cx="' + opt.at[0] + '" cy="' + opt.at[1] + '" r="' + (1.9 / sc) + '" fill="#e5483f" stroke="#fff" stroke-width="' + (0.7 / sc) + '"/></g>';
    return s + "</g>";
  }
  function card(opt) {
    return function () {
      return g('<rect x="-24" y="-20" width="48" height="40" rx="2" fill="#fffaf0"/>' +
        '<svg x="-22.5" y="-18.5" width="45" height="37" viewBox="-22.5 -18.5 45 37" overflow="hidden">' + iranMap(0.115, opt) + "</svg>" +
        '<rect x="-22.5" y="-18.5" width="45" height="37" fill="none" stroke-width=".5"/>');
    };
  }
  B.worldArt.iranMap = iranMap;
  var CITY = { shiraz: [173, 218], gonbad: [214, 79], rasht: [131, 75], ahvaz: [112, 186], tehran: [157, 106], tabriz: [82, 58],
    khorramabad: [108, 145], chabahar: [309, 295], mashhad: [280, 93], sanandaj: [90, 110], isfahan: [160, 161], bushehr: [145, 231] };
  Object.keys(CITY).forEach(function (c) { B.RIG["w-map-" + c] = card({ at: CITY[c] }); });
  W.add({
    "w-map-kurdistan": card({ prov: ["kurdistan"], at: [76, 104] }),
    "w-map-north": card({ prov: ["gilan", "mazandaran"] }),
    "w-map-south": card({ prov: ["bushehr", "hormozgan"] }),
    "w-map-khorasan": card({ prov: ["razavi-khorasan", "south-khorasan"] }),
    "w-map-bushehr": card({ prov: ["bushehr"] }),
    // Iran, big (origin: its middle; 400 × 336 map units at 0.24: 96 × 80.6). A point (x, y) on the map is at
    // (0.24 (x − 200), 0.24 (y − 168)) from the origin.
    "w-map-big": function () { return g(iranMap(0.24, { lines: true })); }
  });
})();

/* ---------------- the street and the city (seed-3, seed-4, sprout-1) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  function wheel(name, x, y, r) {
    return '<g data-part="' + name + '" data-pivot="' + x + " " + y + '"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#3d3a3a"/><circle cx="' + x + '" cy="' + y + '" r="' + f(r * 0.45) + '" fill="#cfd8dc"/>' +
      '<path d="M' + f(x - r * 0.45) + " " + y + "h" + f(r * 0.9) + "M" + x + " " + f(y - r * 0.45) + "v" + f(r * 0.9) + '" fill="none" stroke-width=".4"/></g>';
  }
  function windows(x0, y0, cols, rows, dx, dy, w, h, fill) {
    var s = "";
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) s += '<rect x="' + f(x0 + c * dx) + '" y="' + f(y0 + r * dy) + '" width="' + w + '" height="' + h + '" rx=".4" fill="' + (fill || "#bfe3f5") + '"/>';
    return s;
  }
  // Someone's drawing (a key in B.RIG), cut to a window: x, y, w, h of the window, then where the drawing stands in it.
  function inWindow(key, x, y, w, h, px, py, s) {
    return function () {
      return '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" viewBox="' + x + " " + y + " " + w + " " + h + '" overflow="hidden"><g transform="translate(' + px + " " + py + ") scale(" + s + ')">' + B.RIG[key] + "</g></svg>";
    };
  }
  function car(col, flip) {
    return g('<g' + (flip ? ' transform="scale(-1 1)"' : "") + '><path d="M-12-3v-4.4q0-1.4 1.4-1.6l3.6-.4 3-4.2q.8-.9 2-.9h7.2q1.4 0 2.2 1.2l2.4 3.9 2.6.6q1.4.4 1.4 1.8V-3z" fill="' + col + '"/>' +
      '<path d="M-4.6-9.6l2.4-3.4h4.2v3.4zM3.2-13h3.4q.8 0 1.2.7l1.6 2.7H3.2z" fill="#bfe3f5"/><rect x="10.2" y="-7.6" width="2" height="1.6" rx=".4" fill="#fcd34d"/></g>' +
      wheel("w1", -6.6, -2.6, 2.6) + wheel("w2", 7, -2.6, 2.6));
  }
  W.add({
    // The street, in stage units from x −100 to 440: sky, far hills, the pavement (feet at y ≈ 71), the road.
    "w-street": g('<rect x="-100" y="-60" width="540" height="125" fill="#cdeaf7" stroke="none"/>' +
      '<path d="M-100 64V44c30-8 50-10 80-4s60 8 90 0 60-12 100-4 60 8 90 0 60-10 80-2v30z" fill="#b9dca0" stroke="none"/>' +
      '<rect x="-100" y="63" width="540" height="11" fill="#e2d6c6" stroke="none"/><rect x="-100" y="74" width="540" height="1.6" fill="#b8ab98" stroke="none"/>' +
      '<rect x="-100" y="75.6" width="540" height="12.4" fill="#8a8f98" stroke="none"/><path d="M-100 81.8h540" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="5 4"/>' +
      '<rect x="-100" y="88" width="540" height="4" fill="#e2d6c6" stroke="none"/><rect x="-100" y="92" width="540" height="70" fill="#a8d695" stroke="none"/>' +
      '<path d="M-100 63h540M-100 74h540M-100 88h540" fill="none" stroke-width=".4"/>'),
    // The same street in three layers, for a walk with the camera following (parallax, js/scene.js depth):
    // the sky (depth 0), far hills and roofs (depth 0.3), the pavement and road (depth 1, x −100 to 700).
    "w-skyband": g('<rect x="-60" y="-60" width="280" height="210" fill="#cdeaf7" stroke="none"/>' +
      '<g fill="#fff" stroke="none" opacity=".9"><path d="M20 18c0-3 3-4 5-2.6 1.4-3 6-3 6.8 0 2.8 0 4.2 1.8 3 2.6z"/><path d="M104 12c0-3 3-4 5-2.6 1.4-3 6-3 6.8 0 2.8 0 4.2 1.8 3 2.6z"/></g>'),
    "w-farline": g('<path d="M-200 64V46c40-10 70-12 110-4s80 8 120-2 80-10 120-2 80 8 120 0 80-10 120-2 80 6 120 0 60-6 100 0v28z" fill="#b9dca0" stroke="none"/>' +
      '<g fill="#d7cfc2" stroke="none">' + [-150, -60, 40, 130, 240, 330, 420, 520, 610].map(function (x, i) {
        var h = [14, 20, 12, 18, 16, 22, 13, 19, 15][i];
        return '<rect x="' + x + '" y="' + (64 - h) + '" width="16" height="' + h + '"/><rect x="' + (x + 20) + '" y="' + (64 - h + 6) + '" width="12" height="' + (h - 6) + '"/>';
      }).join("") + "</g>"),
    "w-street-ground": g('<rect x="-100" y="63" width="800" height="11" fill="#e2d6c6" stroke="none"/><rect x="-100" y="74" width="800" height="1.6" fill="#b8ab98" stroke="none"/>' +
      '<rect x="-100" y="75.6" width="800" height="12.4" fill="#8a8f98" stroke="none"/><path d="M-100 81.8h800" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="5 4"/>' +
      '<rect x="-100" y="88" width="800" height="4" fill="#e2d6c6" stroke="none"/><rect x="-100" y="92" width="800" height="120" fill="#a8d695" stroke="none"/>' +
      '<path d="M-100 63h800M-100 74h800M-100 88h800" fill="none" stroke-width=".4"/>'),
    // a cloth bag for bread, carried in the hand (origin: where it is held)
    "w-cloth-bag": g('<path d="M-3 0h6l.6 7H-3.6z" fill="#e7c27a"/><path d="M-1.6 0c0-2 3.2-2 3.2 0" fill="none" stroke-width=".5"/>'),
    // the baker's peel (a long wooden paddle; origin: where it is held) and a watering can (origin: its handle)
    "w-peel": g('<rect x="0" y="-.5" width="16" height="1" fill="#c98a4b"/><ellipse cx="18" cy="0" rx="3.4" ry="1.4" fill="#c98a4b"/>'),
    "w-can": g('<path d="M-2 0h5.6l-.6 4.6H-1.4z" fill="#5aa36a"/><path d="M3.4 1l4-2.6" fill="none" stroke="#5aa36a" stroke-width="1"/><path d="M7-2.2l1.2-.4.2 1.4z" fill="#5aa36a"/><path d="M-1 0c0-2 3.6-2 3.6 0" fill="none" stroke-width=".5"/>'),
    // Buildings stand on y = 64 (origin: the middle of the bottom edge).
    "w-house": g('<rect x="-16" y="-28" width="32" height="28" fill="#f2d2a9"/><rect x="-17" y="-30" width="34" height="3" rx=".6" fill="#c98a4b"/>' +
      windows(-12.5, -23, 2, 1, 18, 0, 7, 7) + '<path d="M-9-23v7M6-23v7M-12.5-19.5h7M5.5-19.5h7" fill="none" stroke-width=".35"/>' +
      '<rect x="-4.6" y="-15" width="9.2" height="15" fill="#6b3f26"/>' +
      '<g data-part="door" data-pivot="-4.6 -7"><rect x="-4.6" y="-15" width="9.2" height="15" fill="#c98a4b"/><rect x="-3.4" y="-13.6" width="6.8" height="5.4" rx=".4" fill="#b57638"/><circle cx="2.8" cy="-6.6" r=".7" fill="#fcd34d"/></g>' +
      '<path d="M10-6h5l-.8 6h-3.4z" fill="#c4673a"/><circle cx="12.5" cy="-8.4" r="2.6" fill="#5a9a45"/>'),
    "w-bakery": g('<rect x="-20" y="-28" width="40" height="28" fill="#e7a95b"/><g fill="none" stroke="#c98a4b" stroke-width=".4"><path d="M-20-20h40M-20-12h40M-20-4h40"/></g>' +
      '<rect x="-14" y="-23" width="22" height="18" rx="1" fill="#5b3a24"/><path d="M-11-9a7 7 0 0 1 14 0z" fill="#3d2c22"/>' +
      '<path data-part="glow" data-pivot="-4 -9" d="M-9-9a5 5 0 0 1 10 0z" fill="#f59e0b" stroke="none"/>' +
      '<rect x="-21" y="-33" width="42" height="6" rx="1" fill="#c0503e"/><path d="M-6-31.4h12c1 0 1.4 2.8 0 2.8H-6c-1.4 0-1-2.8 0-2.8z" fill="#e7c27a" stroke-width=".4"/>' +
      '<path d="M-3.6-31.2v2.4M0-31.2v2.4M3.6-31.2v2.4" fill="none" stroke-width=".3"/>' +
      '<rect x="11" y="-16" width="7" height="16" fill="#6b3f26"/>'),
    // the bakery's counter, in front of the baker; fresh bread lies on it (the piece "bread")
    "w-bakery-counter": g('<rect x="-15" y="-6" width="24" height="6" fill="#c98a4b"/><rect x="-15.6" y="-6.8" width="25.2" height="1.4" rx=".4" fill="#a0683f"/>' +
      '<g data-part="bread" data-pivot="-3 -7.4" style="opacity:0"><path d="M-10-7.4h14c.8 0 .8-1.6 0-1.6h-14c-.8 0-.8 1.6 0 1.6z" fill="#e7a95b" stroke-width=".4"/><g fill="#a0683f" stroke="none"><circle cx="-7" cy="-8.2" r=".35"/><circle cx="-3" cy="-8.2" r=".35"/><circle cx="1" cy="-8.2" r=".35"/></g></g>'),
    "w-school": g('<rect x="-23" y="-34" width="46" height="34" fill="#f4e1c1"/><rect x="-24" y="-36" width="48" height="3" rx=".6" fill="#c0503e"/>' +
      windows(-20, -30, 4, 2, 11, 12, 7, 7) + '<rect x="-5" y="-14" width="10" height="14" fill="#5b9bd5"/><path d="M0-14v14" fill="none" stroke-width=".4"/>' +
      '<path d="M-7-17h14l-2-3h-10z" fill="#5a9a45"/>' +
      '<g fill="none" stroke="#b57638" stroke-width=".6"><path d="M-23-5h-6V0M23-5h6V0M-29-5V0M29-5V0M-27-5V0M27-5V0M-25-5V0M25-5V0"/></g>'),
    // the park: trees, a bench, a fence and flowers (pieces f1, f2, f3, which a watering makes grow)
    "w-park": g('<rect x="-27" y="-24" width="2" height="24" fill="#8a5a3a"/><circle cx="-26" cy="-28" r="9" fill="#5a9a45"/><circle cx="-21" cy="-24" r="6" fill="#6db35a"/>' +
      '<rect x="15" y="-20" width="2" height="20" fill="#8a5a3a"/><circle cx="16" cy="-24" r="8" fill="#6db35a"/><circle cx="21" cy="-21" r="5" fill="#5a9a45"/>' +
      '<rect x="-12" y="-7" width="16" height="2" rx=".5" fill="#c98a4b"/><rect x="-12" y="-11" width="16" height="2" rx=".5" fill="#c98a4b"/><path d="M-10-5v5M2-5v5" fill="none" stroke-width=".9"/>' +
      [[-6, "#e5483f"], [8, "#f2c14e"], [22, "#f28baa"]].map(function (fl, i) {
        var x = fl[0] + 4;
        return '<g data-part="f' + (i + 1) + '" data-pivot="' + x + ' 0"><path d="M' + x + ' 0v-5" fill="none" stroke="#5a9a45" stroke-width=".7"/><circle cx="' + x + '" cy="-5.6" r="1.6" fill="' + fl[1] + '"/><circle cx="' + x + '" cy="-5.6" r=".6" fill="#fcd34d" stroke="none"/></g>';
      }).join("") +
      '<g fill="none" stroke="#5a9a45" stroke-width=".7"><path d="M-30-2h60M-30-4.4h60"/></g>'),
    "w-clinic": g('<rect x="-18" y="-30" width="36" height="30" fill="#fbfbf8"/><rect x="-19" y="-32" width="38" height="3" rx=".6" fill="#3fb0a8"/>' +
      '<rect x="-6" y="-28" width="12" height="9" rx="1" fill="#fff"/><path d="M-1.4-26.6h2.8v2.2h2.2v2.8h-2.2v2.2h-2.8v-2.2h-2.2v-2.8h2.2z" fill="#3fb0a8"/>' +
      windows(-15, -17, 1, 1, 0, 0, 7, 7) + windows(8, -17, 1, 1, 0, 0, 7, 7) + '<rect x="-4.6" y="-15" width="9.2" height="15" fill="#bfe3f5"/><path d="M0-15v15" fill="none" stroke-width=".4"/>'),
    "w-fruit": g('<rect x="-19" y="-26" width="38" height="26" fill="#f6e3c6"/><path d="M-21-26h42l-2 6h-38z" fill="#fff"/>' +
      '<g fill="#e5483f" stroke="none"><path d="M-17.4-26h5l-.4 6h-4.2zM-7.4-26h5l-.2 6h-4.6zM2.6-26h5l.2 6H3zM12.6-26h5l.6 6h-4.6z"/></g><path d="M-21-26h42l-2 6h-38z" fill="none"/>' +
      '<rect x="-14" y="-18" width="28" height="12" fill="#5b3a24"/>' +
      '<g><rect x="-18" y="-7" width="11" height="7" fill="#c98a4b"/><rect x="-5.5" y="-7" width="11" height="7" fill="#c98a4b"/><rect x="7" y="-7" width="11" height="7" fill="#c98a4b"/></g>' +
      '<g fill="#e5483f" stroke-width=".4"><circle cx="-16" cy="-7.6" r="1.6"/><circle cx="-12.6" cy="-7.8" r="1.6"/><circle cx="-9.2" cy="-7.6" r="1.6"/></g>' +
      '<g fill="#f59e0b" stroke-width=".4"><circle cx="-3.4" cy="-7.6" r="1.6"/><circle cx="0" cy="-7.8" r="1.6"/><circle cx="3.4" cy="-7.6" r="1.6"/></g>' +
      '<g fill="#7a5ab0" stroke-width=".4"><circle cx="10" cy="-7.8" r="1.3"/><circle cx="12.4" cy="-7.8" r="1.3"/><circle cx="14.8" cy="-7.8" r="1.3"/><circle cx="11.2" cy="-9.6" r="1.3"/><circle cx="13.6" cy="-9.6" r="1.3"/></g>'),
    // A side street going away between the buildings, with a zebra crossing on the pavement line (origin: the
    // middle of the crossing's back edge, at y 64).
    "w-crossing": g('<path d="M-13 11.6V0l9-26h8l9 26v11.6z" fill="#8a8f98" stroke="none"/><path d="M-13 0l9-26M13 0l-9-26" fill="none" stroke-width=".4"/>' +
      '<path d="M0-24v4M0-16v5M0-7v5" fill="none" stroke="#fff" stroke-width=".6"/>' +
      '<g fill="#fff" stroke="none">' + [-11, -7.2, -3.4, 0.4, 4.2, 8].map(function (x) { return '<rect x="' + x + '" y="1.4" width="2.4" height="9"/>'; }).join("") + "</g>"),
    "w-car-red": car("#e5483f"), "w-car-blue": car("#5b9bd5", true), "w-car-white": car("#f4f4f2"), "w-car-green": car("#6db35a", true),
    // a car coming down the side street, seen from the front (origin: the middle of its bottom)
    "w-car-front": g('<path d="M-9-2v-5q0-1.6 1.4-2l1.6-.4 2-4.2q.6-1 1.8-1h4.4q1.2 0 1.8 1l2 4.2 1.6.4q1.4.4 1.4 2v5z" fill="#5b9bd5"/><path d="M-4.6-9.8l1.6-3.6h6l1.6 3.6z" fill="#bfe3f5"/>' +
      '<g fill="#fcd34d"><circle cx="-6.4" cy="-5.6" r="1.2"/><circle cx="6.4" cy="-5.6" r="1.2"/></g><rect x="-9" y="-2.4" width="3.4" height="2.4" rx=".6" fill="#3d3a3a"/><rect x="5.6" y="-2.4" width="3.4" height="2.4" rx=".6" fill="#3d3a3a"/>'),
    // a tall block of flats (origin: the middle of its bottom); a window at (5, −52) is Niloofar's
    "w-flats": g('<rect x="-16" y="-74" width="32" height="74" fill="#d9c7b0"/><rect x="-17" y="-76" width="34" height="3" rx=".6" fill="#a0785a"/>' +
      windows(-13, -70, 3, 8, 10, 8.4, 6, 5.4) + '<rect x="-4" y="-8" width="8" height="8" fill="#5b3a24"/>'),
    "w-flats2": g('<rect x="-12" y="-58" width="24" height="58" fill="#c9d6de"/><rect x="-13" y="-60" width="26" height="3" rx=".6" fill="#7d93a3"/>' + windows(-9, -54, 2, 7, 12, 7.6, 6, 5)),
    "w-flats3": g('<rect x="-10" y="-46" width="20" height="46" fill="#ead8c0"/>' + windows(-7, -42, 2, 5, 9, 8, 5, 5) + '<rect x="-3" y="-7" width="6" height="7" fill="#5b3a24"/>'),
    "w-shop1": g('<rect x="-15" y="-24" width="30" height="24" fill="#f4efe6"/><path d="M-17-24h34l-2 5h-30z" fill="#5b9bd5"/><rect x="-12" y="-16" width="15" height="11" fill="#bfe3f5"/>' +
      '<path d="M-10-7c0-3 2-4 3-4s3 1 3 4zM-4-7h5v-5h-5z" fill="#e46b8a" stroke-width=".4"/><rect x="5" y="-14" width="7" height="14" fill="#6b3f26"/>'),
    "w-shop2": g('<rect x="-15" y="-24" width="30" height="24" fill="#fbe7c6"/><path d="M-17-24h34l-2 5h-30z" fill="#5a9a45"/><rect x="-3" y="-16" width="15" height="11" fill="#bfe3f5"/>' +
      '<g fill="#f2c14e" stroke-width=".4"><rect x="-1" y="-11" width="4" height="5"/><rect x="5" y="-12" width="4" height="6"/></g><rect x="-12" y="-14" width="7" height="14" fill="#6b3f26"/>'),
    // a traffic light (origin: the foot of its pole); the pieces red and green light up
    "w-light": g('<rect x="-.7" y="-30" width="1.4" height="30" fill="#5a5f7a"/><rect x="-3" y="-44" width="6" height="15" rx="1.4" fill="#3d3a3a"/>' +
      '<circle cy="-40.6" r="1.6" fill="#7a2f2a"/><circle cy="-36.4" r="1.6" fill="#7a6a2a"/><circle cy="-32.2" r="1.6" fill="#2f5a34"/>' +
      '<circle data-part="red" data-pivot="0 -40.6" cy="-40.6" r="1.6" fill="#ff4b3e"/><circle data-part="green" data-pivot="0 -32.2" style="opacity:0" cy="-32.2" r="1.6" fill="#52e06a"/>'),
    // Under the street: the metro (stage units; the street is above y 50, the tunnel from 62 to 86).
    "w-tunnel": g('<rect y="50" width="160" height="40" fill="#b08a64" stroke="none"/><path d="M0 50h160" fill="none"/>' +
      '<g fill="#9a7552" stroke="none"><circle cx="20" cy="56" r="1.2"/><circle cx="70" cy="57" r="1"/><circle cx="130" cy="55" r="1.4"/><circle cx="104" cy="88" r="1"/></g>' +
      '<rect x="0" y="61" width="160" height="26" fill="#dde3e8"/><rect y="81" width="160" height="6" fill="#9aa4ad"/><path d="M0 61h160M0 87h160" fill="none"/>' +
      '<g fill="#fcd34d" stroke="none"><rect x="20" y="62" width="10" height="1"/><rect x="75" y="62" width="10" height="1"/><rect x="130" y="62" width="10" height="1"/></g>'),
    // a city bus, from the side, going left, with Niloofar's father at the wheel (origin: the middle of its bottom)
    "w-bus": function () {
      return g('<rect x="-24" y="-20" width="48" height="17" rx="3" fill="#5b9bd5"/><rect x="-24" y="-8" width="48" height="2" fill="#fff" stroke="none"/>' +
        '<path d="M-23-18.4h6.6v8.4H-23.6z" fill="#bfe3f5"/>' + windows(-14, -18, 4, 1, 9, 0, 7, 6) +
        inWindow("w-dad", -22.6, -18.2, 5.8, 7.8, -19.8, -1.6, 0.42)() + '<path d="M-23-18.4h6.6v8.4H-23.6z" fill="none"/>' +
        wheel("w1", -15, -3, 3) + wheel("w2", 15, -3, 3));
    },
    // the metro train, going left, with Niloofar's mother driving (origin: the middle of its bottom)
    "w-metro": function () {
      return g('<path d="M-38-18q0-3 3-3h70q3 0 3 3v16h-80c-4 0-6-4-4-8z" fill="#f4f4f2"/><rect x="-40" y="-9" width="80" height="2" fill="#e5483f" stroke="none"/>' +
        '<path d="M-36-17h8v7h-9.6c.4-3 .8-5 1.6-7z" fill="#bfe3f5"/>' + windows(-24, -17, 6, 1, 10, 0, 7, 5.6) +
        inWindow("w-driver-mom", -37.6, -17.2, 9.8, 7.4, -32.6, -1, 0.42)() + '<path d="M-36-17h8v7h-9.6c.4-3 .8-5 1.6-7z" fill="none"/>' +
        '<path d="M0-21v19" fill="none" stroke-width=".4"/>' + wheel("w1", -26, -1.6, 1.8) + wheel("w2", 26, -1.6, 1.8));
    },
    // seed-4: how far the bakery and the park are from Pariya's home, as lines over the street (stage units)
    "w-dist-near": '<g fill="none" stroke-linecap="round"><path d="M540 8H472M540 4v8M472 4v8" stroke="#fff" stroke-width="3.4"/><path d="M540 8H472M540 4v8M472 4v8" stroke="#3f9a4a" stroke-width="1.8"/></g>',
    "w-dist-far": '<g fill="none" stroke-linecap="round"><path d="M540 -6H230M540-10v8M230-10v8" stroke="#fff" stroke-width="3.4"/><path d="M540 -6H230M540-10v8M230-10v8" stroke="#e0773a" stroke-width="1.8"/></g>',
    // the road above the metro (stage units): the street seen in a cut through the ground
    "w-road-top": g('<rect y="40" width="160" height="11" fill="#8a8f98" stroke="none"/><path d="M0 45.5h160" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray="5 4"/><rect y="37" width="160" height="3" fill="#e2d6c6" stroke="none"/><path d="M0 40h160" fill="none" stroke-width=".4"/>'),
    // Niloofar's block of flats, with Niloofar at her window (origin: the middle of its bottom); the piece "win" rings it
    "w-flats-home": function () {
      return B.RIG["w-flats"] + inWindow("w-girl4", 7, -61.6, 6, 5.4, 10, -50.6, 0.36)() +
        '<rect data-part="win" data-pivot="10 -58.9" x="6" y="-62.6" width="8" height="7.4" rx="1" fill="none" stroke="#f59e0b" stroke-width="1" style="opacity:0"/>';
    },
    // two halves of one picture (stage units): a city street on the right, a village on the left
    "w-split-city": g('<rect x="80" width="80" height="90" fill="#cdeaf7" stroke="none"/><rect x="84" y="14" width="20" height="50" fill="#d9c7b0"/><rect x="132" y="24" width="18" height="40" fill="#c9d6de"/>' +
      '<g fill="#bfe3f5"><rect x="87" y="18" width="5" height="4"/><rect x="96" y="18" width="5" height="4"/><rect x="87" y="28" width="5" height="4"/><rect x="96" y="28" width="5" height="4"/><rect x="87" y="38" width="5" height="4"/><rect x="96" y="38" width="5" height="4"/><rect x="135" y="28" width="5" height="4"/><rect x="143" y="28" width="5" height="4"/><rect x="135" y="38" width="5" height="4"/><rect x="143" y="38" width="5" height="4"/></g>' +
      '<rect x="80" y="64" width="80" height="10" fill="#e2d6c6" stroke="none"/><rect x="80" y="74" width="80" height="16" fill="#8a8f98" stroke="none"/><path d="M80 64h80M80 74h80" fill="none" stroke-width=".4"/>'),
    "w-split-village": g('<rect width="80" height="90" fill="#cdeaf7" stroke="none"/><path d="M0 50L22 22l14 10 18-18 26 26v24H0z" fill="#9fb59a"/>' +
      '<rect x="44" y="30" width="12" height="8" fill="#cdb79a"/><rect x="58" y="36" width="12" height="8" fill="#d9c4a5"/><rect x="50" y="44" width="12" height="8" fill="#cdb79a"/>' +
      '<rect y="58" width="80" height="32" fill="#a8d695" stroke="none"/><path d="M0 58h80" fill="none" stroke-width=".4"/><path d="M0 76C30 72 50 72 80 76V84C50 80 30 80 0 84z" fill="#d8c3a0" stroke="none"/>'),
    // a yellow school bus going right, with Wanjiru at a window (origin: the middle of its bottom)
    "w-schoolbus": function () {
      return g('<rect x="-24" y="-20" width="48" height="17" rx="3" fill="#f2c14e"/><rect x="-24" y="-8" width="48" height="1.6" fill="#3d2c22" stroke="none"/>' +
        '<path d="M16.4-18.4h6.6l.6 8.4h-7.2z" fill="#bfe3f5"/>' + windows(-21, -18, 4, 1, 9, 0, 7, 6) +
        inWindow("w-wanjiru", -3, -18.2, 7, 6.4, 0.5, -0.6, 0.42)() + '<rect x="-3" y="-18" width="7" height="6" rx=".4" fill="none"/>' +
        wheel("w1", -15, -3, 3) + wheel("w2", 15, -3, 3));
    },
    // a school gate, small (origin: its bottom middle)
    "w-gate": g('<rect x="-12" y="-20" width="3" height="20" fill="#c0503e"/><rect x="9" y="-20" width="3" height="20" fill="#c0503e"/><path d="M-12-20q12-6 24 0" fill="none" stroke="#c0503e" stroke-width="2"/>')
  });
})();

/* ---------------- the village (sprout-1) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  // A Hawraman-style village: houses stepped up a mountainside, each roof the yard of the house above (stage units).
  function vhouse(x, y, w, h, c) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (c || "#cdb79a") + '"/><rect x="' + f(x - 0.6) + '" y="' + f(y - 1.2) + '" width="' + f(w + 1.2) + '" height="1.6" fill="#8a6f52"/>' +
      '<rect x="' + f(x + w * 0.2) + '" y="' + f(y + h * 0.3) + '" width="' + f(w * 0.18) + '" height="' + f(h * 0.34) + '" fill="#5b3a24"/><rect x="' + f(x + w * 0.58) + '" y="' + f(y + h * 0.3) + '" width="' + f(w * 0.2) + '" height="' + f(h * 0.7) + '" fill="#6b3f26"/>';
  }
  var VH = [[96, 22, 14, 8], [112, 24, 16, 8, "#d9c4a5"], [130, 27, 13, 8], [88, 31, 15, 8, "#d9c4a5"], [105, 33, 16, 8], [123, 35, 15, 8, "#d9c4a5"],
    [80, 41, 15, 8], [97, 43, 15, 8, "#d9c4a5"], [114, 45, 16, 8], [132, 47, 14, 8, "#d9c4a5"], [86, 52, 16, 8, "#d9c4a5"], [104, 54, 15, 8], [121, 56, 16, 8, "#d9c4a5"]];
  W.add({
    "w-village": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
      '<path d="M-10 70L40 14l18 12 22-20 30 24 22-12 40 40v52H-10z" fill="#9fb59a"/><path d="M40 14l6 6 4-2 8 8M80 6l6 8 6-2 4 6" fill="none" stroke="#fff" stroke-width="1.2"/>' +
      '<path d="M60 90L78 36l70 6 22 48z" fill="#b9a27f"/>' + VH.map(function (h) { return vhouse(h[0], h[1], h[2], h[3], h[4]); }).join("") +
      '<g fill="#5a9a45"><circle cx="72" cy="58" r="4"/><circle cx="146" cy="54" r="3.4"/><circle cx="78" cy="64" r="3"/></g>' +
      '<rect y="66" width="160" height="24" fill="#a8d695" stroke="none"/><path d="M0 66h160" fill="none"/>' +
      '<path d="M100 90c0-8-10-14-24-20" fill="none" stroke="#d8c3a0" stroke-width="5"/>'),
    // Zhiyar's house and yard, close up (stage units): a tree whose leaves move (the piece crown) and flowers (fl1–fl4).
    "w-yard": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 44L30 10l24 16 30-22 40 26 46 20v10H-10z" fill="#9fb59a"/>' +
      '<rect x="0" y="20" width="72" height="42" fill="#cdb79a"/><rect x="-1" y="18" width="74" height="3" fill="#8a6f52"/>' +
      '<g fill="#b8a283" stroke="none"><rect x="6" y="28" width="8" height="3"/><rect x="40" y="40" width="9" height="3"/><rect x="20" y="50" width="7" height="3"/><rect x="58" y="26" width="7" height="3"/></g>' +
      '<rect x="12" y="32" width="12" height="11" fill="#5b3a24"/><path d="M18 32v11M12 37.5h12" fill="none" stroke="#c98a4b" stroke-width=".8"/>' +
      '<rect x="44" y="40" width="13" height="22" fill="#6b3f26"/><circle cx="54.6" cy="51" r=".8" fill="#fcd34d"/>' +
      '<rect y="62" width="160" height="28" fill="#a8d695" stroke="none"/><path d="M0 62h160" fill="none"/>' +
      '<path d="M72 62h88" fill="none" stroke="#b8a283" stroke-width="3"/><rect x="72" y="52" width="88" height="10" fill="#cdb79a"/><path d="M72 52h88" fill="none"/>' +
      '<rect x="112" y="24" width="4" height="38" fill="#8a5a3a"/>' +
      '<g data-part="crown" data-pivot="114 40"><circle cx="114" cy="22" r="13" fill="#5a9a45"/><circle cx="104" cy="28" r="8" fill="#6db35a"/><circle cx="124" cy="28" r="8" fill="#6db35a"/>' +
      '<g fill="#e5483f" stroke-width=".4"><circle cx="108" cy="20" r="1.3"/><circle cx="120" cy="18" r="1.3"/><circle cx="116" cy="29" r="1.3"/><circle cx="102" cy="30" r="1.3"/></g></g>' +
      [[84, "#e5483f"], [92, "#f2c14e"], [134, "#f28baa"], [144, "#e5483f"]].map(function (fl, i) {
        return '<g data-part="fl' + (i + 1) + '" data-pivot="' + fl[0] + ' 52"><path d="M' + fl[0] + ' 52v-6" fill="none" stroke="#5a9a45" stroke-width=".8"/><circle cx="' + fl[0] + '" cy="45" r="2" fill="' + fl[1] + '"/><circle cx="' + fl[0] + '" cy="45" r=".8" fill="#fcd34d" stroke="none"/></g>';
      }).join("")),
    // A wheat field below the hills (stage units); the rows of wheat (ws1–ws3) sway in the wind.
    "w-field": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 44c30-14 50-14 80-6s60 6 100-6v30H-10z" fill="#9fb59a"/>' +
      '<rect y="46" width="160" height="44" fill="#e8c46a" stroke="none"/><path d="M0 46h160" fill="none"/><rect y="80" width="160" height="10" fill="#c9a074" stroke="none"/><path d="M0 80h160" fill="none"/>' +
      [52, 62, 74].map(function (y, i) {
        var s = "";
        for (var x = 2; x < 160; x += 5 + i) s += "M" + x + " " + y + "v-6";
        return '<g data-part="ws' + (i + 1) + '" data-pivot="80 ' + y + '"><path d="' + s + '" fill="none" stroke="#c9a03a" stroke-width=".7"/>' +
          '<g fill="#d9a838" stroke="none">' + s.split("M").slice(1).map(function (p) { var q = p.split(" "); return '<ellipse cx="' + q[0] + '" cy="' + (+q[1].replace(/v.*/, "") - 7) + '" rx=".9" ry="1.9"/>'; }).join("") + "</g></g>";
      }).join("")),
    // a tractor, going left (origin: the middle of its bottom); the wheels turn (wb, wf)
    "w-tractor": g('<path d="M-12-10h10v-8h9l2 8h7v6h-28z" fill="#e5483f"/><rect x="-1" y="-17" width="7" height="6" fill="#bfe3f5"/><rect x="9" y="-16" width="1.4" height="6" fill="#5a5f7a"/>' +
      '<g data-part="wf" data-pivot="-8 -3.6"><circle cx="-8" cy="-3.6" r="3.6" fill="#3d3a3a"/><circle cx="-8" cy="-3.6" r="1.4" fill="#f2c14e"/><path d="M-11.6-3.6h7.2M-8-7.2v7.2" fill="none" stroke-width=".4"/></g>' +
      '<g data-part="wb" data-pivot="7 -5.6"><circle cx="7" cy="-5.6" r="5.6" fill="#3d3a3a"/><circle cx="7" cy="-5.6" r="2.2" fill="#f2c14e"/><path d="M1.4-5.6h11.2M7-11.2V0" fill="none" stroke-width=".4"/></g>'),
    // a saj (a dome griddle) on stones with a fire under it (origin: the middle of its bottom); bread is the piece "bread"
    "w-saj": g('<g fill="#9a8f84"><ellipse cx="-7" cy="-1.6" rx="2.6" ry="1.8"/><ellipse cx="7" cy="-1.6" rx="2.6" ry="1.8"/></g>' +
      '<path data-part="fire" data-pivot="0 -1" d="M-4-1c0-3 2-3 2-6 1.4 1.4 1.4 2.6 2 3 .6-2 2-2.6 2-4.6 1.4 2 2 4.6 2 7.6z" fill="#f59e0b"/>' +
      '<path d="M-11-4c2-4 6-5.4 11-5.4S9-8 11-4z" fill="#5a5f7a"/>' +
      '<g data-part="bread" data-pivot="0 -8"><path d="M-9.6-4.6c2-3.4 5.6-4.4 9.6-4.4s7.6 1 9.6 4.4c-3 .6-6.4.8-9.6.8s-6.6-.2-9.6-.8z" fill="#f1c27d" stroke-width=".4"/>' +
      '<g fill="#c98a4b" stroke="none"><circle cx="-4" cy="-6.6" r=".45"/><circle cx="2" cy="-7.4" r=".45"/><circle cx="5" cy="-5.8" r=".45"/><circle cx="-1" cy="-5.4" r=".45"/></g></g>'),
    // a stack of thin bread (origin: its bottom middle)
    "w-breads": g('<ellipse cy="-1" rx="7" ry="1.6" fill="#f1c27d"/><ellipse cy="-2.2" rx="7" ry="1.6" fill="#f1c27d"/>'),
    // the village school, small (origin: its bottom middle)
    "w-vschool": g('<rect x="-17" y="-20" width="34" height="20" fill="#f4e1c1"/><rect x="-18" y="-22" width="36" height="3" rx=".6" fill="#5b9bd5"/>' +
      '<rect x="-13" y="-15" width="7" height="6" fill="#bfe3f5"/><rect x="6" y="-15" width="7" height="6" fill="#bfe3f5"/><rect x="-3.6" y="-13" width="7.2" height="13" fill="#c98a4b"/>' +
      '<path d="M-2.4-21.6l2.4-1.4 2.4 1.4" fill="none" stroke-width=".5"/>'),
    // the village path to school (stage units)
    "w-vpath": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 50L30 22l30 14 30-20 40 22 40-6v30H-10z" fill="#9fb59a"/>' +
      '<rect y="52" width="160" height="38" fill="#a8d695" stroke="none"/><path d="M0 52h160" fill="none"/><path d="M-10 74C40 70 90 70 170 74V82C90 78 40 78-10 82z" fill="#d8c3a0" stroke="none"/>' +
      '<g fill="#5a9a45"><circle cx="20" cy="50" r="5"/><circle cx="146" cy="49" r="4"/></g>')
  });
})();

/* ---------------- games and the sea (seed-6), the world (seed-7) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  W.add({
    // A Tehran alley (stage units): a brick wall with a door, the ground.
    "w-alley": g('<rect width="160" height="62" fill="#d99a6c" stroke="none"/><g fill="none" stroke="#c4825a" stroke-width=".4">' +
      (function () { var s = ""; for (var y = 6; y < 62; y += 6) { s += "M0 " + y + "h160"; for (var x = (y / 6) % 2 ? 0 : 6; x < 160; x += 12) s += "M" + x + " " + (y - 6) + "v6"; } return '<path d="' + s + '"/>'; })() + "</g>" +
      '<rect x="18" y="22" width="18" height="40" rx="1" fill="#5b9bd5"/><path d="M27 22v40" fill="none" stroke-width=".4"/><circle cx="25" cy="44" r=".8" fill="#fcd34d"/>' +
      '<path d="M120 0c4 10 10 14 18 14s12-6 22-6V0z" fill="#6db35a"/><rect y="62" width="160" height="28" fill="#cfc4b4" stroke="none"/><path d="M0 62h160" fill="none"/>'),
    // hopscotch squares drawn in chalk on the ground (stage units, along y 66–84)
    "w-hop": '<g fill="none" stroke="#fff" stroke-width=".8" stroke-linejoin="round">' +
      [26, 44, 62, 80, 98, 116].map(function (x) { return '<path d="M' + x + ' 82l3-14h16l-3 14z"/>'; }).join("") + '<circle cx="66" cy="75" r="1.4" fill="#9a8f84" stroke="#3d2c22" stroke-width=".4"/></g>',
    // A courtyard in Tabriz (stage units): a wall and a paved yard.
    "w-yard-tabriz": g('<rect width="160" height="58" fill="#e8d3b0" stroke="none"/><g fill="#d9c09a" stroke="none"><rect x="20" y="10" width="16" height="30" rx="8"/><rect x="72" y="10" width="16" height="30" rx="8"/><rect x="124" y="10" width="16" height="30" rx="8"/></g>' +
      '<rect y="58" width="160" height="32" fill="#cdbfa8" stroke="none"/><path d="M0 58h160" fill="none"/><g fill="none" stroke="#b8a888" stroke-width=".4"><path d="M0 70h160M0 82h160M30 58l-6 32M80 58v32M130 58l6 32"/></g>'),
    // Khorramabad: a green hillside with a river (stage units).
    "w-hill-green": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 54c30-30 60-34 90-20s50 10 90-10v40H-10z" fill="#7fae6a"/>' +
      '<rect y="58" width="160" height="32" fill="#a8d695" stroke="none"/><path d="M0 58h160" fill="none"/><path d="M110 58c4 8 18 14 50 16v6c-36-2-50-10-56-22z" fill="#9fd3f0"/>'),
    // Chabahar: the beach (stage units); the waves (the piece "waves") roll.
    "w-beach": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="38" width="160" height="22" fill="#5ab0e0" stroke="none"/><path d="M0 38h160" fill="none"/>' +
      '<g data-part="waves"><path d="M-20 50q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0" fill="none" stroke="#fff" stroke-width=".8"/></g>' +
      '<path d="M0 60c40-4 80-4 160 0v30H0z" fill="#f3dcae" stroke="none"/><path d="M0 60c40-4 80-4 160 0" fill="none"/>'),
    // a little boat pulled up on the sand (origin: its bottom middle)
    "w-boat": g('<path d="M-14-6h28l-4 6h-20z" fill="#e5483f"/><path d="M-14-6h28" fill="none" stroke="#fff" stroke-width=".8"/><rect x="-1" y="-20" width="1.4" height="14" fill="#8a5a3a"/>'),
    // seven flat stones for هفت‌سنگ, biggest first (origin: the middle of each stone's bottom)
    "w-stone1": g('<ellipse cy="-1.6" rx="7" ry="1.8" fill="#9a8f84"/>'), "w-stone2": g('<ellipse cy="-1.6" rx="6.3" ry="1.7" fill="#b0a596"/>'),
    "w-stone3": g('<ellipse cy="-1.6" rx="5.6" ry="1.7" fill="#8f8478"/>'), "w-stone4": g('<ellipse cy="-1.6" rx="5" ry="1.6" fill="#a89c8c"/>'),
    "w-stone5": g('<ellipse cy="-1.6" rx="4.4" ry="1.6" fill="#958a7d"/>'), "w-stone6": g('<ellipse cy="-1.6" rx="3.8" ry="1.5" fill="#b4a99a"/>'),
    "w-stone7": g('<ellipse cy="-1.5" rx="3.2" ry="1.5" fill="#9a8f84"/>'),
    "w-pebble": g('<ellipse cy="-1" rx="1.4" ry="1.1" fill="#c9b6e4"/>'), "w-pebble2": g('<ellipse cy="-1" rx="1.4" ry="1.1" fill="#f2c14e"/>'),
    "w-pebble3": g('<ellipse cy="-1" rx="1.4" ry="1.1" fill="#7cc6e8"/>'),
    "w-ball": g('<circle cy="-3" r="3" fill="#fff"/><path d="M-3-3c1.6-1.2 4.4-1.2 6 0M0-6c-1.2 1.6-1.2 4.4 0 6" fill="none" stroke="#e5483f" stroke-width=".7"/>'),
    // a counting bubble (the number is set by a count track)
    "w-counter": g('<circle r="6.4" fill="#fff"/><text data-count y="2.4" text-anchor="middle" font-size="7" font-weight="800" fill="#3d2c22" stroke="none"></text>'),
    // a day counter (seed-5): a calendar page with a number
    "w-calendar": g('<rect x="-7" y="-8" width="14" height="15" rx="1" fill="#fff"/><rect x="-7" y="-8" width="14" height="4" rx="1" fill="#e5483f"/><path d="M-4-9.4v2.6M4-9.4v2.6" fill="none" stroke-width=".8"/>' +
      '<text data-count y="4.6" text-anchor="middle" font-size="7" font-weight="800" fill="#3d2c22" stroke="none"></text>'),
    // The globe, turning: the lands slide behind a round window (origin: its middle; radius 20).
    "w-globe": function () {
      // rough land shapes in degrees (longitude, latitude), one world wide, drawn twice so the turn never ends
      var LANDS = [
        [[-168, 66], [-140, 70], [-95, 72], [-62, 60], [-55, 50], [-80, 26], [-97, 18], [-84, 9], [-78, 8], [-92, 15], [-106, 22], [-118, 32], [-125, 48], [-140, 58], [-166, 60]],
        [[-78, 8], [-60, 10], [-35, -6], [-40, -22], [-58, -38], [-70, -54], [-74, -40], [-70, -18], [-81, -4]],
        [[-10, 36], [-6, 44], [-2, 50], [8, 54], [5, 60], [20, 68], [40, 68], [70, 72], [110, 76], [140, 72], [170, 66], [160, 58], [135, 44], [122, 30], [108, 20], [105, 10], [98, 16], [92, 22], [80, 10], [74, 20], [58, 24], [52, 14], [44, 12], [34, 28], [26, 40], [12, 38]],
        [[-17, 15], [-10, 6], [8, 4], [10, -2], [12, -18], [20, -35], [30, -32], [40, -16], [50, 12], [43, 12], [34, 28], [20, 32], [10, 37], [-6, 36], [-16, 28]],
        [[114, -22], [124, -14], [136, -12], [144, -14], [153, -26], [148, -38], [138, -36], [116, -34]],
        [[130, 33], [133, 35], [137, 37], [140, 40], [141, 43], [143, 44], [141, 41], [140, 36], [136, 34], [132, 31]]
      ];
      var k = 1 / 3, d = "";
      [0, 120].forEach(function (off) {
        LANDS.forEach(function (L) { d += "M" + L.map(function (p) { return f((p[0] + 180) * k + off) + " " + f(-p[1] * k); }).join("L") + "Z"; });
      });
      return g('<circle r="20" fill="#5ab0e0"/>' +
        '<svg x="-20" y="-20" width="40" height="40" viewBox="-20 -20 40 40" overflow="hidden"><clipPath id="w-globe-clip"><circle r="19.6"/></clipPath><g clip-path="url(#w-globe-clip)">' +
        // the land strip: x = (longitude + 180) / 3, so a turn shows longitude about 3 × (x + 20) − 180 at the left edge
        '<g data-part="land" data-pivot="0 0"><path d="' + d + '" fill="#8fc46a" stroke="#3d2c22" stroke-width=".4"/></g></g></svg>' +
        '<circle r="20" fill="none"/><path d="M-14-12c2-2 4-3 6-3" fill="none" stroke="#fff" stroke-width="1" opacity=".6"/>');
    },
    // a red dot that pulses, to mark a place on the globe (origin: its middle)
    "w-dot": g('<circle r="1.6" fill="#e5483f" stroke="#fff" stroke-width=".6"/>'),
    // a little table with a plate (origin: the middle of its bottom)
    "w-table": g('<rect x="-16" y="-14" width="32" height="2.4" rx=".6" fill="#c98a4b"/><rect x="-14" y="-12" width="2" height="12" fill="#a0683f"/><rect x="12" y="-12" width="2" height="12" fill="#a0683f"/>' +
      '<ellipse cx="0" cy="-14.6" rx="7" ry="1.6" fill="#fff"/>'),
    // snow lying on the ground (stage units), and a sun with turning rays (origin: its middle)
    "w-snow-ground": g('<path d="M0 64c20-3 40 2 60-1s30 2 40 0V90H0z" fill="#fff"/>'),
    "w-sun": g('<g data-part="rays" data-pivot="0 0" fill="none" stroke="#f59e0b" stroke-width="1"><path d="M0-9v-3M0 9v3M-9 0h-3M9 0h3M-6.4-6.4l-2.1-2.1M6.4 6.4l2.1 2.1M-6.4 6.4l-2.1 2.1M6.4-6.4l2.1-2.1"/></g><circle r="6.4" fill="#fcd34d"/>'),
    "w-moon": g('<path d="M2-6a6.4 6.4 0 1 0 4.4 10.4 5 5 0 1 1-4.4-10.4z" fill="#fde68a"/>'),
    "w-stars": g('<g fill="#fde68a" stroke="none">' + [[12, 8], [30, 16], [52, 6], [100, 10], [124, 20], [146, 8], [70, 22], [140, 30]].map(function (p, i) {
      return '<path data-part="s' + i + '" data-pivot="' + p[0] + " " + p[1] + '" d="M' + p[0] + " " + (p[1] - 1.6) + "l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z" + '"/>'; }).join("") + "</g>"),
    // a picture frame for one of four children (origin: its middle; 36 × 60): a room, a school yard, a playground
    "w-panel-home": g('<rect x="-18" y="-30" width="36" height="60" rx="2" fill="#f6e3c6"/><rect x="-18" y="8" width="36" height="22" fill="#e7c69c" stroke="none"/><path d="M-18 8h36" fill="none" stroke-width=".4"/>' +
      '<rect x="-7" y="-22" width="14" height="11" rx=".6" fill="#bfe3f5"/><path d="M0-22v11M-7-16.5h14" fill="none" stroke-width=".35"/><rect x="-18" y="-30" width="36" height="60" rx="2" fill="none"/>'),
    "w-panel-school": g('<rect x="-18" y="-30" width="36" height="60" rx="2" fill="#cdeaf7"/><rect x="-18" y="6" width="36" height="24" fill="#d8c3a0" stroke="none"/>' +
      '<rect x="-16" y="-14" width="32" height="20" fill="#f4e1c1"/><rect x="-17" y="-16" width="34" height="2.6" fill="#c0503e"/><rect x="-4" y="-6" width="8" height="12" fill="#5b9bd5"/>' +
      '<rect x="-13" y="-10" width="5" height="4" fill="#bfe3f5"/><rect x="8" y="-10" width="5" height="4" fill="#bfe3f5"/><rect x="-18" y="-30" width="36" height="60" rx="2" fill="none"/>'),
    "w-panel-play": g('<rect x="-18" y="-30" width="36" height="60" rx="2" fill="#cdeaf7"/><rect x="-18" y="4" width="36" height="26" fill="#a8d695" stroke="none"/><path d="M-18 4h36" fill="none" stroke-width=".4"/>' +
      '<circle cx="-10" cy="-14" r="5" fill="#6db35a"/><rect x="-10.7" y="-10" width="1.4" height="14" fill="#8a5a3a"/><rect x="-18" y="-30" width="36" height="60" rx="2" fill="none"/>'),
    // a split line between two places (stage units)
    "w-split": '<path d="M80 0v90" fill="none" stroke="#fff" stroke-width="2"/><path d="M80 0v90" fill="none" stroke="#3d2c22" stroke-width=".5" stroke-dasharray="2 2"/>',
    // little "z" letters of sleep (origin: the bottom left)
    "w-zzz": g('<path d="M0-2h2.4L0 0h2.4M3-6h3L3-3.6h3M6.6-10.6h3.6l-3.6 3h3.6" fill="none" stroke="#5b9bd5" stroke-width=".7"/>')
  });
})();

/* ---------------- Nowruz and the festivals (seed-5, sprout-5) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  function blossoms(pts) {
    return pts.map(function (p, i) {
      return '<g data-part="b' + (i + 1) + '" data-pivot="' + p[0] + " " + p[1] + '" style="opacity:0"><g fill="#f7b3cc" stroke-width=".35">' +
        [0, 72, 144, 216, 288].map(function (a) { var r = a * Math.PI / 180; return '<circle cx="' + f(p[0] + Math.cos(r) * 1.3) + '" cy="' + f(p[1] + Math.sin(r) * 1.3) + '" r="1.1"/>'; }).join("") +
        '</g><circle cx="' + p[0] + '" cy="' + p[1] + '" r=".6" fill="#fcd34d" stroke="none"/></g>';
    }).join("");
  }
  var BL = [[-14, -40], [-6, -46], [4, -44], [12, -38], [-18, -32], [0, -36], [16, -30], [-9, -30], [8, -50], [-2, -52]];
  W.add({
    // a tree with bare branches, snow on them (the piece "snow") and blossoms that open (b1–b10); origin: its foot
    "w-blossom-tree": g('<path d="M-2 0v-22c-6-4-12-10-16-18M-2-22c0-8 1-16-2-26M-2-22c4-6 12-10 18-16M-1-30c4-4 8-6 10-16M-3-36c-4-2-8-4-10-8" fill="none" stroke="#8a5a3a" stroke-width="2.4"/>' +
      '<path d="M-2 0v-22c-6-4-12-10-16-18M-2-22c0-8 1-16-2-26M-2-22c4-6 12-10 18-16M-1-30c4-4 8-6 10-16M-3-36c-4-2-8-4-10-8" fill="none" stroke="#a0683f" stroke-width="1.2"/>' +
      '<g data-part="snow" fill="#fff" stroke-width=".4"><path d="M-19-41l4 1.6 1-2zM-5-49l3 1 .6-2zM15-39l-4 1.6-.6-2zM7-47l3-.6-.4-2zM-14-45l4 .6.4-2z"/></g>' + blossoms(BL)),
    // a bush that greens (origin: its foot)
    "w-meadow": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 60c30-10 60-12 90-6s50 4 90-4v40H-10z" fill="#a8d695"/><path d="M-10 60c30-10 60-12 90-6s50 4 90-4" fill="none"/>'),
    // dust on the window that the cloth wipes away (stage units, over the w-room window)
    "w-win-dust": '<g fill="#b8a283" opacity=".75"><circle cx="70" cy="27" r="2.2"/><circle cx="76" cy="32" r="2"/><circle cx="86" cy="28" r="2.4"/><circle cx="92" cy="32" r="1.8"/><circle cx="66.6" cy="32.6" r="1.4"/><circle cx="82" cy="33" r="1.6"/><circle cx="90" cy="25" r="1.4"/></g>',
    "w-stool": g('<rect x="-7" y="-9" width="14" height="2.4" rx=".6" fill="#c98a4b"/><path d="M-5.6-6.6L-7 0M5.6-6.6L7 0" fill="none" stroke="#a0683f" stroke-width="1.4"/>'),
    "w-cloth": g('<path d="M-3-2.4h6l.6 4.8h-7.2z" fill="#f2c14e"/><path d="M-2 0h4" fill="none" stroke-width=".3"/>'),
    // lentils in a plate, and the sabzeh that grows from them (the piece "grass", growing up from its bottom)
    "w-sabzeh": g('<ellipse cy="-1" rx="9" ry="2.6" fill="#fff"/>' +
      '<g data-part="grass" data-pivot="0 -2"><path d="M-7-2c-1-4-1-7 0-9M-5-2c0-4 0-8 1-10M-3-2c0-5-1-9 0-12M-1-2c0-5 0-9 1-12M1-2c1-5 1-9 0-12M3-2c1-5 1-9 2-11M5-2c0-4 1-7 2-9M7-2c0-3 0-6 1-7" fill="none" stroke="#5a9a45" stroke-width="1.1"/>' +
      '<path d="M-6-2c0-3 0-6 1-8M-2-2c0-4 0-8-1-11M2-2c0-4 1-8 0-11M6-2c1-3 1-6 0-8" fill="none" stroke="#7fc35a" stroke-width=".9"/></g>' +
      '<g fill="#b5713d" stroke="none"><circle cx="-5" cy="-2" r=".7"/><circle cx="-2" cy="-1.6" r=".7"/><circle cx="1" cy="-2.2" r=".7"/><circle cx="4" cy="-1.6" r=".7"/><circle cx="6" cy="-2.2" r=".7"/><circle cx="-6.6" cy="-1.2" r=".6"/></g>' +
      '<path d="M-9-1c2 2 16 2 18 0" fill="none" stroke-width=".4"/><path d="M-8-1.6c4-1 12-1 16 0" fill="none" stroke="#e5483f" stroke-width=".6"/>'),
    // the haft-sin cloth on a low table (origin: its bottom middle)
    "w-haftsin-table": g('<rect x="-30" y="-12" width="60" height="3" rx=".8" fill="#c98a4b"/><rect x="-27" y="-9" width="2.4" height="9" fill="#a0683f"/><rect x="24.6" y="-9" width="2.4" height="9" fill="#a0683f"/>' +
      '<path d="M-31-12.4h62l-1 5H-30z" fill="#f4efe6"/><path d="M-30-8.6h60" fill="none" stroke="#e46b6b" stroke-width=".6" stroke-dasharray="1.4 1"/>'),
    // a broom (in a hand: the hand is at the top of the handle)
    "w-broom": '<g' + W.O + '><rect x="-.5" y="0" width="1" height="16" fill="#c98a4b"/><path d="M-3 16h6l1.6 6h-9.2z" fill="#e8c46a"/><path d="M-2 18v4M0 18v4M2 18v4" fill="none" stroke-width=".3"/></g>',
    // a festival year (sprout-5): a wheel with the four seasons and a hand that goes round (origin: its middle)
    "w-year": g('<circle r="17" fill="#fff"/>' +
      '<path d="M0 0V-16A16 16 0 0 1 16 0z" fill="#bfe8a8"/><path d="M0 0H16A16 16 0 0 1 0 16z" fill="#fde68a"/><path d="M0 0V16A16 16 0 0 1-16 0z" fill="#f8c08a"/><path d="M0 0H-16A16 16 0 0 1 0-16z" fill="#c8e3f5"/>' +
      // a blossom, a sun, a leaf and a snowflake, one in each season
      '<g transform="translate(7 -7)"><g fill="#f7b3cc" stroke-width=".3"><circle cx="0" cy="-1.3" r="1.1"/><circle cx="1.2" cy="-.3" r="1.1"/><circle cx=".8" cy="1.1" r="1.1"/><circle cx="-.8" cy="1.1" r="1.1"/><circle cx="-1.2" cy="-.3" r="1.1"/></g><circle r=".5" fill="#fcd34d" stroke="none"/></g>' +
      '<g transform="translate(7 7)"><circle r="2" fill="#fcd34d"/><path d="M0-3v-1M0 3v1M-3 0h-1M3 0h1" fill="none" stroke="#f59e0b" stroke-width=".6"/></g>' +
      '<g transform="translate(-7 7) rotate(-30)"><path d="M0-3c2 1 2 5 0 6-2-1-2-5 0-6z" fill="#e0773a"/><path d="M0-3v6" fill="none" stroke-width=".3"/></g>' +
      '<g transform="translate(-7 -7)" fill="none" stroke="#5b9bd5" stroke-width=".6"><path d="M0-2.6v5.2M-2.2-1.3l4.4 2.6M-2.2 1.3l4.4-2.6"/></g>' +
      '<circle r="16" fill="none" stroke-width=".5"/><path d="M0-16v32M-16 0h32" fill="none" stroke-width=".3"/>' +
      '<g data-part="hand" data-pivot="0 0"><path d="M-.7 0L0-15 .7 0z" fill="#e5483f"/><circle r="1.4" fill="#e5483f"/></g>'),
    // a picnic cloth on the grass with a basket (origin: its middle)
    "w-picnic": g('<path d="M-22 4l4-8h36l4 8z" fill="#e46b6b"/><path d="M-14 4l2.6-8M-4 4l1-8M6 4l-.6-8M16 4l-2.4-8M-20 0h40" fill="none" stroke="#fff" stroke-width=".5"/>' +
      '<path d="M8-5h9l-1 4h-7z" fill="#c98a4b"/><path d="M9.4-5c0-3 6.2-3 6.2 0" fill="none" stroke="#a0683f" stroke-width=".7"/><ellipse cx="-8" cy="-1" rx="3" ry="1.2" fill="#fff"/>'),
    // an autumn leaf, and a pomegranate (origin: its middle)
    "w-leaf": g('<path d="M0-3c2.4 1.2 2.4 4.8 0 6-2.4-1.2-2.4-4.8 0-6z" fill="#e0773a"/><path d="M0-3v6" fill="none" stroke-width=".3"/>'),
    "w-leaf2": g('<path d="M0-3c2.4 1.2 2.4 4.8 0 6-2.4-1.2-2.4-4.8 0-6z" fill="#f2c14e"/><path d="M0-3v6" fill="none" stroke-width=".3"/>'),
    "w-pomegranate": g('<circle cy="-3.2" r="3.2" fill="#c0303a"/><path d="M-1-6.2l.4-1.2.6.8.6-.8.4 1.2" fill="#c0303a" stroke-width=".4"/><path d="M-1.6-4.6c.6-.6 1.2-.8 1.8-.8" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>'),
    "w-fruit-bowl": g('<path d="M-8-4h16c0 3-3 4-8 4s-8-1-8-4z" fill="#5b9bd5"/>' +
      '<g fill="#7a5ab0" stroke-width=".35"><circle cx="-4.6" cy="-5.4" r="1.4"/><circle cx="-2.4" cy="-5.4" r="1.4"/><circle cx="-3.5" cy="-7.2" r="1.4"/></g>' +
      '<circle cx="1" cy="-6" r="2.4" fill="#e5483f"/><circle cx="5" cy="-5.6" r="2.2" fill="#c0303a"/>'),
    // a slice of watermelon (origin: its bottom middle)
    "w-melon": g('<path d="M-6-1a6 6 0 0 0 12 0z" fill="#5a9a45"/><path d="M-5-1a5 5 0 0 0 10 0z" fill="#f05a5a" stroke="none"/><g fill="#3d2c22" stroke="none"><circle cx="-2" cy=".6" r=".35"/><circle cx="1" cy="1.4" r=".35"/><circle cx="2.6" cy=".2" r=".35"/></g><path d="M-6-1h12" fill="none"/>'),
    // a small fire in a ring of stones (origin: its bottom middle); the flames move (fl1–fl3)
    "w-fire": g('<g fill="#9a8f84"><ellipse cx="-6" cy="-1" rx="2" ry="1.4"/><ellipse cx="6" cy="-1" rx="2" ry="1.4"/><ellipse cx="0" cy="-.6" rx="2" ry="1.2"/></g>' +
      '<path d="M-5-2l10-2.4M-5-4.4l10 2.4" fill="none" stroke="#8a5a3a" stroke-width="1.2"/>' +
      '<path data-part="fl1" data-pivot="0 -3" d="M-4-3c-1-4 1-6 1-9 2 2 2 4 2 5 1-2 3-3 3-6 2 3 3 6 2 10z" fill="#f59e0b"/>' +
      '<path data-part="fl2" data-pivot="0 -3" d="M-2-3c-.4-2.4 1-3.6 1-5.4 1.2 1.2 1.2 2.4 1.4 3 .6-1.2 1.6-1.8 1.6-3.6 1.2 2 1.4 3.6 1 6z" fill="#fcd34d"/>'),
    // a metal bowl and a spoon for قاشق‌زنی (held in the hands)
    "w-bowl": '<g' + W.O + '><path d="M-4-1h8c0 3-1.6 4-4 4s-4-1-4-4z" fill="#cfd8dc"/><path d="M-4-1h8" fill="none"/></g>',
    "w-spoon": '<g' + W.O + '><path d="M0 0v-7" fill="none" stroke="#b0bec5" stroke-width="1"/><ellipse cy="-8.2" rx="1.4" ry="2" fill="#cfd8dc"/></g>',
    // a firecracker, and a red "no" (the piece "slash" is drawn through it); origin: their middle
    "w-cracker": g('<rect x="-1.8" y="-6" width="3.6" height="10" rx=".8" fill="#e5483f"/><path d="M-1.8-3h3.6M-1.8 1h3.6" fill="none" stroke="#fcd34d" stroke-width=".7"/><path d="M0-6c0-2 1.6-2 1.6-3.4" fill="none" stroke-width=".5"/>'),
    "w-no": '<g fill="none" stroke-linecap="round"><circle r="9" stroke="#fff" stroke-width="3.2"/><circle r="9" stroke="#e5483f" stroke-width="1.8"/><path d="M-6.4-6.4l12.8 12.8" stroke="#fff" stroke-width="3.2"/><path d="M-6.4-6.4l12.8 12.8" stroke="#e5483f" stroke-width="1.8"/></g>',
    // a yard at night (stage units)
    "w-night-yard": g('<rect width="160" height="90" fill="#22305a" stroke="none"/><rect y="60" width="160" height="30" fill="#4b4a5a" stroke="none"/><path d="M0 60h160" fill="none"/>' +
      '<rect x="0" y="30" width="56" height="30" fill="#5a4b5a"/><rect x="10" y="38" width="9" height="9" fill="#fcd34d"/><rect x="34" y="38" width="9" height="9" fill="#fcd34d"/>')
  });
})();

/* ---------------- maps and directions (sprout-2, sprout-3) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  // The village of B.MAPS.village (js/lessons/world.js), 400 × 300 map units, on the stage at x' = 24 + 0.28 x,
  // y' = 3 + 0.28 y, like the room plan in js/art/rig.js. Drawn in stage units at their place.
  var X = function (x) { return f(24 + 0.28 * x); }, Y = function (y) { return f(3 + 0.28 * y); }, L = function (w) { return f(0.28 * w); };
  W.villageAt = function (x, y) { return [X(x), Y(y)]; };
  function at(x, y, inner) { return '<g transform="translate(' + X(x) + " " + Y(y) + ')">' + inner + "</g>"; }
  var STAR = "M0-3.4l1 2.2 2.4.3-1.8 1.6.5 2.4L0 1.9-2.1 3.1l.5-2.4-1.8-1.6 2.4-.3z";
  W.add({
    "w-vtop": g('<rect x="' + X(0) + '" y="' + Y(0) + '" width="' + L(400) + '" height="' + L(300) + '" fill="#a8d695"/>' +
      '<path d="M' + X(350) + " " + Y(0) + "C" + X(325) + " " + Y(80) + " " + X(385) + " " + Y(170) + " " + X(345) + " " + Y(300) + "L" + X(380) + " " + Y(300) + "C" + X(420) + " " + Y(170) + " " + X(360) + " " + Y(80) + " " + X(385) + " " + Y(0) + 'Z" fill="#7cc6e8"/>' +
      '<rect x="' + X(0) + '" y="' + Y(140) + '" width="' + L(340) + '" height="' + L(24) + '" fill="#d8c3a0"/><rect x="' + X(176) + '" y="' + Y(0) + '" width="' + L(24) + '" height="' + L(140) + '" fill="#d8c3a0"/>' +
      '<rect x="' + X(16) + '" y="' + Y(186) + '" width="' + L(120) + '" height="' + L(96) + '" rx="1.6" fill="#8fc46a"/><rect x="' + X(230) + '" y="' + Y(10) + '" width="' + L(96) + '" height="' + L(112) + '" rx="1.6" fill="#e8c46a"/>'),
    // the four places, from above, as pictures, and their symbols (origin: the place; on the stage at
    // B.worldArt.villageAt(x, y) of the map: home 43.6 25.4, orchard 40.8 66.3, school 91.2 59, spring 113 53.4)
    "w-vtop-home": g('<rect x="-5" y="-4" width="10" height="8" fill="#c0503e"/><path d="M-5 0h10" fill="none" stroke-width=".4"/><rect x="2" y="-6" width="2" height="2" fill="#8a6f52"/>'),
    "w-vtop-trees": g('<g fill="#5a9a45"><circle cx="-7" cy="-5" r="3.4"/><circle cx="1" cy="-6" r="3.6"/><circle cx="8" cy="-3" r="3.2"/><circle cx="-4" cy="3" r="3.4"/><circle cx="5" cy="5" r="3.4"/></g>' +
      '<g fill="#e5483f" stroke="none"><circle cx="-7" cy="-6" r=".7"/><circle cx="2" cy="-7" r=".7"/><circle cx="5" cy="4" r=".7"/></g>'),
    "w-vtop-school": g('<rect x="-8" y="-6" width="16" height="12" fill="#f4e1c1"/><rect x="-4" y="-2" width="8" height="5" fill="#cfc4b4"/><path d="M-8-6h16" fill="none" stroke="#c0503e" stroke-width="1"/>'),
    "w-vtop-spring": g('<circle r="4.4" fill="#cfc4b4"/><circle r="3.2" fill="#7cc6e8"/><path d="M-1.4-.6q1.4-1 2.8 0" fill="none" stroke="#fff" stroke-width=".5"/>'),
    "w-sym-home": g('<rect x="-3.4" y="-3.4" width="6.8" height="6.8" fill="#e5483f"/>'),
    "w-sym-trees": g('<circle r="3.6" fill="#3f9a4a"/>'),
    "w-sym-school": g('<path d="' + STAR + '" fill="#fcd34d" transform="scale(1.3)"/>'),
    "w-sym-spring": g('<circle r="3.6" fill="#2f7fd0"/>'),
    // the legend beside the map: each symbol and the thing it stands for (stage units, x 2–22)
    "w-legend": function () {
      var row = function (y, sym, pic) {
        return '<g transform="translate(6 ' + y + ')">' + sym + '</g><g transform="translate(16 ' + (y + 4) + ') scale(.08) translate(-50 -100)" stroke="#3d2c22" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + (B.ART[pic] || "") + "</g>";
      };
      return g('<rect x="1" y="16" width="21" height="60" rx="1.6" fill="#fffaf0"/>' +
        row(24, '<rect x="-2.6" y="-2.6" width="5.2" height="5.2" fill="#e5483f"/>', "🏠") + row(38, '<circle r="2.8" fill="#3f9a4a"/>', "🌳") +
        row(52, '<path d="' + STAR + '" fill="#fcd34d"/>', "🏫") + row(66, '<circle r="2.8" fill="#2f7fd0"/>', "🌊"));
    },
    // the same village from the side (stage units): Setareh's home, the orchard, the school and the spring
    "w-vside": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 46c30-14 60-14 90-6s50 6 90-4v30H-10z" fill="#9fb59a"/>' +
      '<rect y="54" width="160" height="36" fill="#a8d695" stroke="none"/><path d="M0 54h160" fill="none"/>' +
      '<path d="M128 54c6 6 10 12 32 18v6c-24-6-30-14-36-24z" fill="#7cc6e8"/>'),
    "w-vside-home": g('<rect x="-10" y="-16" width="20" height="16" fill="#f2d2a9"/><path d="M-12-15l12-9 12 9z" fill="#c0503e"/><rect x="-3" y="-9" width="6" height="9" fill="#c98a4b"/><rect x="5" y="-12" width="4" height="4" fill="#bfe3f5"/>'),
    "w-vside-trees": g('<rect x="-9" y="-10" width="1.6" height="10" fill="#8a5a3a"/><circle cx="-8" cy="-13" r="5" fill="#5a9a45"/><rect x="3" y="-12" width="1.6" height="12" fill="#8a5a3a"/><circle cx="4" cy="-15" r="6" fill="#6db35a"/>' +
      '<g fill="#e5483f" stroke="none"><circle cx="-9" cy="-14" r=".8"/><circle cx="2" cy="-16" r=".8"/><circle cx="6" cy="-13" r=".8"/></g>'),
    "w-vside-school": g('<rect x="-14" y="-16" width="28" height="16" fill="#f4e1c1"/><rect x="-15" y="-18" width="30" height="3" rx=".6" fill="#c0503e"/><rect x="-11" y="-12" width="6" height="5" fill="#bfe3f5"/><rect x="5" y="-12" width="6" height="5" fill="#bfe3f5"/><rect x="-3" y="-10" width="6" height="10" fill="#5b9bd5"/>'),
    // the spring: water runs from a stone spout into a pool (the stripes move: class flow)
    "w-vside-spring": g('<path d="M-8 0c0-3 3-4 8-4s8 1 8 4z" fill="#9a8f84"/><ellipse cy="-1.2" rx="6" ry="1.4" fill="#7cc6e8"/><rect x="-2" y="-12" width="4" height="4" fill="#9a8f84"/>' +
      '<path d="M0-8v6.6" fill="none" stroke="#9fd3f0" stroke-width="1.4"/><path class="flow" d="M0-8v6.6" fill="none" stroke="#fff" stroke-width=".4" stroke-dasharray="1 2"/>'),
    // a pointing finger (origin: the fingertip)
    "w-point": g('<g transform="rotate(-20)"><rect x="-1" y="0" width="2.2" height="6" rx="1.1" fill="#f3c39b"/><rect x="-2.6" y="4.4" width="6" height="6" rx="2" fill="#f3c39b"/><rect x="-2.8" y="9.6" width="6.4" height="3" fill="#5b9bd5"/></g>'),

    /* ---------- sprout-3: the sun across the sky, Arash facing north (stage units) ---------- */
    // the horizon at y 56; far hills to the north; a dawn, dusk and night sky laid over the day sky
    "w-sky": '<rect width="160" height="58" fill="#bfe3f5"/>',
    "w-sky-dawn": '<rect width="160" height="58" fill="#f7c9a8"/>',
    "w-sky-dusk": '<rect width="160" height="58" fill="#f59e6b"/>',
    "w-sky-night": '<rect width="160" height="58" fill="#22305a"/>',
    "w-ground": g('<path d="M-10 58c30-10 50-12 80-6s60 6 100-2v8H-10z" fill="#9fb59a"/><rect y="56" width="160" height="34" fill="#a8d695" stroke="none"/><path d="M0 56h160" fill="none"/>' +
      '<g fill="none" stroke="#8fc46a" stroke-width=".5"><path d="M10 80l2-2 2 2M40 70l2-2 2 2M120 76l2-2 2 2M140 66l2-2 2 2"/></g>'),
    // Arash's shadow on the ground: a long soft shape from his feet (origin: his feet); it turns (r) and stretches (sx)
    "w-shadow": '<ellipse cx="10" rx="10" ry="1.6" fill="#3d2c22" opacity=".28"/>',
    // a label board (origin: its middle); the word goes on it as a text part
    "w-label": g('<rect x="-9" y="-4.4" width="18" height="8" rx="2.4" fill="#fff"/>'),
    // the yard from above, north up (stage units): grass, the tree's crown where the tree stood
    "w-yard-top": g('<rect width="160" height="90" fill="#a8d695" stroke="none"/><circle cx="40" cy="30" r="9" fill="#5a9a45"/><circle cx="36" cy="27" r="4" fill="#6db35a" stroke="none"/>' +
      '<g fill="none" stroke="#fff" stroke-width=".9" stroke-dasharray="2 2"><path d="M80 14V76M38 45H122"/></g>'),
    // a compass (origin: its middle); the dial turns with the hand that holds it, the needle keeps pointing north
    "w-compass": g('<circle r="15" fill="#c98a4b"/><circle r="12.6" fill="#fffaf0"/>' +
      '<g data-part="dial" data-pivot="0 0"><g fill="none" stroke-width=".5"><path d="M0-12.6v2.4M0 12.6v-2.4M-12.6 0h2.4M12.6 0h-2.4"/></g><path d="M-1.6-12.6h3.2L0-9.6z" fill="#e5483f"/></g>' +
      '<g data-part="needle" data-pivot="0 0"><path d="M-1.8 0L0-10 1.8 0z" fill="#e5483f"/><path d="M-1.8 0L0 10 1.8 0z" fill="#cfd8dc"/><circle r="1.2" fill="#5a5f7a"/></g>')
  });
})();

/* ---------------- where food grows (sprout-7) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f;
  function plants(x0, x1, y, h, name) {
    var s = "";
    for (var x = x0; x <= x1; x += 4.6) s += "M" + f(x) + " " + y + "c-.6-" + f(h * 0.6) + "-2-" + f(h * 0.8) + "-3-" + h + "M" + f(x) + " " + y + "c.4-" + f(h * 0.6) + " 1.6-" + f(h * 0.8) + " 2.6-" + f(h * 0.9) + "M" + f(x) + " " + y + "v-" + f(h * 1.1);
    return '<g data-part="' + name + '" data-pivot="80 ' + y + '"><path d="' + s + '" fill="none" stroke="#5a9a45" stroke-width=".8"/></g>';
  }
  W.add({
    // a rain cloud (origin: its middle)
    "w-cloud": g('<path d="M-12 4c-4 0-5-6 0-7 0-5 6-7 9-3 2-4 9-4 10 1 4 0 6 4 3 7z" fill="#cfd8dc"/>'),
    // rice paddies in Gilan (stage units): water between green hills; the rice (rice1, rice2) grows up from the water
    "w-paddy": g('<rect width="160" height="90" fill="#cfe3ea" stroke="none"/><path d="M-10 40c20-16 40-20 60-12s40 6 60-8 40-8 60 4v30H-10z" fill="#5a9a45"/>' +
      '<rect y="46" width="160" height="44" fill="#9fd3f0" stroke="none"/><path d="M0 46h160M0 60h160M0 76h160M50 46l-6 44M110 46l6 44" fill="none" stroke="#7fae6a" stroke-width="1.2"/>') +
      '<g' + W.O + '>' + plants(4, 156, 58, 7, "rice1") + plants(2, 158, 74, 9, "rice2") + "</g>",
    // a hot, dry coast in the south (stage units)
    "w-hot": g('<rect width="160" height="90" fill="#fbe3b0" stroke="none"/><rect y="56" width="160" height="34" fill="#f0d29a" stroke="none"/><path d="M0 56h160" fill="none"/>' +
      '<path d="M100 56c10-2 30-2 60 0" fill="none" stroke="#5ab0e0" stroke-width="2"/>'),
    // a date palm (origin: its foot); its dates go from green to ripe (the piece "ripe" over "green")
    "w-datepalm": g('<path d="M-1 0c-1-14 0-26 3-38" fill="none" stroke="#8a5a3a" stroke-width="3.2"/><path d="M-1 0c-1-14 0-26 3-38" fill="none" stroke="#a0683f" stroke-width="1.8"/>' +
      '<g fill="#5a9a45"><path d="M2-38c-6-4-14-4-20 2 6-2 13-1 20-2z"/><path d="M2-38c6-5 14-5 20 1-6-2-13-1-20-1z"/><path d="M2-38c-4-6-10-10-16-8 6 1 11 4 16 8z"/><path d="M2-38c4-6 10-9 16-6-6 0-11 3-16 6z"/><path d="M2-38c-2 4-6 10-12 12 4-4 8-8 12-12z"/><path d="M2-38c3 4 6 10 11 12-4-4-7-8-11-12z"/></g>' +
      '<g data-part="green" fill="#9cc45a" stroke-width=".35"><circle cx="-1" cy="-34" r="1.3"/><circle cx="1.4" cy="-33" r="1.3"/><circle cx="-.4" cy="-31.6" r="1.3"/><circle cx="4" cy="-34" r="1.3"/><circle cx="5" cy="-32" r="1.3"/></g>' +
      '<g data-part="ripe" style="opacity:0" fill="#8a4a24" stroke-width=".35"><circle cx="-1" cy="-34" r="1.3"/><circle cx="1.4" cy="-33" r="1.3"/><circle cx="-.4" cy="-31.6" r="1.3"/><circle cx="4" cy="-34" r="1.3"/><circle cx="5" cy="-32" r="1.3"/></g>'),
    // heat over the ground (origin: its middle): wavy lines that rise
    "w-heat": '<g fill="none" stroke="#f59e0b" stroke-width=".7" opacity=".7"><path d="M-10 0q2-2 4 0t4 0 4 0 4 0 4 0M-6-5q2-2 4 0t4 0 4 0"/></g>',
    // a dry field in Khorasan (stage units)
    "w-dry": g('<rect width="160" height="90" fill="#dfeef5" stroke="none"/><path d="M-10 48c30-10 60-12 90-4s50 4 90-6v20H-10z" fill="#c9b48a"/>' +
      '<rect y="54" width="160" height="36" fill="#d9c49a" stroke="none"/><path d="M0 54h160" fill="none"/><g fill="none" stroke="#b49a70" stroke-width=".5"><path d="M10 70l6 4 6-3M60 80l5 3 7-2M110 66l6 4 6-3M136 84l5 3 6-2"/></g>'),
    // a saffron crocus that opens (origin: its foot): the petals (the piece "petals") open from a bud
    "w-crocus": g('<path d="M0 0v-6M-1 0c-1-2-2-4-2-6M1 0c1-2 2-4 2-6" fill="none" stroke="#5a9a45" stroke-width=".7"/>' +
      '<g data-part="petals" data-pivot="0 -6"><path d="M0-6c-3-1-4-4-3-7 2 1 3 4 3 7zM0-6c3-1 4-4 3-7-2 1-3 4-3 7zM0-6c-1.4-2-1.4-5 0-8 1.4 3 1.4 6 0 8z" fill="#9a7ad0"/>' +
      '<path d="M0-7l-1.2-3M0-7l1.2-3M0-7v-3.4" fill="none" stroke="#e5483f" stroke-width=".6"/></g>'),
    // the sea with a jetty (stage units)
    "w-jetty": g('<rect width="160" height="50" fill="#cdeaf7" stroke="none"/><rect y="44" width="160" height="46" fill="#5ab0e0" stroke="none"/><path d="M0 44h160" fill="none"/>' +
      '<g data-part="waves"><path d="M-20 60q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0M-20 76q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0" fill="none" stroke="#fff" stroke-width=".6"/></g>' +
      '<rect x="0" y="48" width="56" height="5" fill="#c98a4b"/><path d="M8 53v20M28 53v20M48 53v20" fill="none" stroke="#a0683f" stroke-width="2"/>'),
    // a fishing line hanging from the rod's tip (origin: the tip; 46 long)
    "w-line": '<path d="M0 0L5 46" fill="none" stroke="#3d2c22" stroke-width=".35"/>',
    // a question mark in a bubble (origin: its middle), and a few dates on a plate
    "w-qmark": g('<circle r="6" fill="#fff"/><path d="M-2-1.6c0-2.4 4-2.4 4 0 0 1.6-2 1.6-2 3.4" fill="none" stroke-width="1"/><circle cy="3.8" r=".6" fill="#3d2c22"/>'),
    "w-dates": g('<ellipse cy="-.8" rx="6" ry="1.6" fill="#fff"/><g fill="#8a4a24" stroke-width=".35"><ellipse cx="-2.6" cy="-2" rx="1.6" ry="1"/><ellipse cx=".4" cy="-2.4" rx="1.6" ry="1"/><ellipse cx="3" cy="-1.8" rx="1.6" ry="1"/></g>'),
    "w-saffron": g('<ellipse cy="-.6" rx="4" ry="1.2" fill="#fff"/><path d="M-2-1.4l-1-2.4M0-1.6v-2.8M2-1.4l1-2.4" fill="none" stroke="#e5483f" stroke-width=".6"/>'),
    // a bowl of rice and a pot of fish stew (origin: their bottom middle)
    "w-rice-bowl": g('<path d="M-7-5h14c0 4-3 5-7 5s-7-1-7-5z" fill="#5b9bd5"/><path d="M-6.4-5c0-3 3-4 6.4-4s6.4 1 6.4 4z" fill="#fff"/>')
  });
  // A fisherman holding a rod (sprout-7), and a girl with a bowl and a spoon (sprout-5).
  W.add({
    "w-fisher-rod": W.person({ adult: true, hair: "#2f2219", beard: "#2f2219", shirt: "#5b9bd5", pants: "#c98a4b", skin: "#c98f63", sleeve: "short",
      holdR: '<path d="M0 0L14-16" fill="none" stroke="#8a5a3a" stroke-width=".9"/>' }),
    "w-girl-spoon": W.person({ kind: "girl", key: "w-girl", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", skirt: "#b04a6a", legs: "#f2c14e", holdL: '<g transform="translate(2 -1)">' + B.RIG["w-bowl"] + "</g>", holdR: '<g transform="rotate(30)">' + B.RIG["w-spoon"] + "</g>" }),
    "w-boy-spoon": W.person({ hair: "#2f2219", style: "curly", shirt: "#f2c14e", pants: "#4b5a78", holdL: '<g transform="translate(2 -1)">' + B.RIG["w-bowl"] + "</g>", holdR: '<g transform="rotate(30)">' + B.RIG["w-spoon"] + "</g>" }),
    "w-mom-broom": W.person({ kind: "woman", key: "w-mom", adult: true, hair: "#4a2f1f", style: "long", shirt: "#3fb0a8", pants: "#4b5a78", holdR: '<g transform="rotate(-10)">' + B.RIG["w-broom"] + "</g>" }),
    "w-dad-cloth": W.person({ adult: true, hair: "#4a2f1f", beard: "#4a2f1f", shirt: "#5aa36a", pants: "#4b5a78", holdR: B.RIG["w-cloth"] }),
    "w-girl-cloth": W.person({ kind: "girl", key: "w-girl", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", skirt: "#b04a6a", legs: "#f2c14e", holdR: B.RIG["w-cloth"] })
  });
})();
