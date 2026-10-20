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
    "w-parisa": { kind: "girl", hair: "#1f1712", style: "long", shirt: "#5b9bd5", skirt: "#2f4a8a", legs: "#c98f63", skin: "#c98f63" },
    "w-amani": { kind: "girl", hair: "#1f1712", style: "curly", shirt: "#f2c14e", skirt: "#3f7a4a", legs: "#6a432b", skin: "#6a432b" },
    "w-shamiram": { kind: "girl", hair: "#3a2416", style: "pony", shirt: "#e5483f", pants: "#4b5a78", skin: "#f2c8a0" },
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

/* ---------------- Seed, second half (seed-9 to seed-24) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  W.add({
    /* ---------- seed-9: growing up ---------- */
    // Taraneh: a toddler (no headscarf choice for a baby), and as a child now (standing and sitting)
    "w-toddler": person({ baby: true, hair: "#6b3f26", style: "short", shirt: "#e46b8a", pants: "#f7e27a", shoes: "#e46b8a" }),
    "w-taraneh": person({ kind: "girl", key: "w-taraneh", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", pants: "#5a5f7a" }),
    "w-taraneh-sit": person({ kind: "girl", key: "w-taraneh", hair: "#6b3f26", style: "pony", shirt: "#e46b8a", pants: "#5a5f7a", sit: true }),
    // a height chart on the wall (stage units, x 30–38, y 14–58): a paper strip with ticks; the marks m1–m3 are hidden
    // until a track shows them, at y 37.5, 30 and 22.5 (the top of a child standing at y 60 at s 0.75, 1 and 1.25)
    "w-height": g('<rect x="30" y="14" width="8" height="44" rx=".8" fill="#fffaf0"/>' +
      '<g fill="none" stroke-width=".35">' + [18, 22, 26, 30, 34, 38, 42, 46, 50, 54].map(function (y) { return "<path d=\"M30 " + y + "h" + (y % 8 === 2 ? 3 : 1.8) + "\"/>"; }).join("") + "</g>" +
      [[37.5, "#5b9bd5"], [30, "#5aa36a"], [22.5, "#e5483f"]].map(function (m, i) {
        return '<g data-part="m' + (i + 1) + '" data-pivot="34 ' + m[0] + '" style="opacity:0"><path d="M29 ' + m[0] + 'h10" fill="none" stroke="' + m[1] + '" stroke-width="1"/>' +
          '<circle cx="39.6" cy="' + m[0] + '" r="1" fill="' + m[1] + '" stroke-width=".3"/></g>'; }).join("")),
    // a pencil held upright (origin: its tip)
    "w-pencil-up": g('<path d="M0 0l-.9-2.4h1.8z" fill="#3d2c22"/><path d="M-.9-2.4h1.8v-8h-1.8z" fill="#f2c14e"/><path d="M-.9-10.4h1.8v-1.4h-1.8z" fill="#e46b8a"/>'),
    // a photo album lying open (origin: the middle of its bottom edge): old grey photos of a baby and of a little girl
    "w-album": g('<path d="M-14 0l-1-12c4-1.4 9-1 15 .6 6-1.6 11-2 15-.6L14 0C9-1 4-.8 0 .6-4-.8-9-1-14 0z" fill="#7a5a8a"/>' +
      '<path d="M-13 -.8l-.8-10.4c4-.8 8.4-.4 13.8 1v10.4c-5-1.2-9.4-1.4-13-1z" fill="#fffaf0"/><path d="M13 -.8l.8-10.4c-4-.8-8.4-.4-13.8 1v10.4c5-1.2 9.4-1.4 13-1z" fill="#fffaf0"/>' +
      '<g data-part="p1" data-pivot="-7 -6"><rect x="-11.4" y="-10" width="8.8" height="7.4" fill="#d6cfc4"/><circle cx="-7" cy="-7.2" r="1.7" fill="#b9b0a4"/><path d="M-9.4-3.2c0-2 1-2.6 2.4-2.6s2.4.6 2.4 2.6z" fill="#a39a8e"/></g>' +
      '<g data-part="p2" data-pivot="7 -6"><rect x="2.6" y="-10" width="8.8" height="7.4" fill="#d6cfc4"/><circle cx="7" cy="-7.8" r="1.4" fill="#b9b0a4"/><path d="M5.4-2.8l.6-3.4h2l.6 3.4z" fill="#a39a8e"/></g>'),
    // Taraneh's mother with a pencil in her right hand (the same woman as "w-mom")
    "w-mom-pencil": person({ kind: "woman", key: "w-mom", adult: true, hair: "#4a2f1f", style: "long", shirt: "#3fb0a8", pants: "#4b5a78",
      holdR: '<g transform="translate(0 7.8)"><path d="M0 0l-.7-1.8h1.4z" fill="#3d2c22"/><path d="M-.7-1.8h1.4v-6h-1.4z" fill="#f2c14e"/></g>' }),
    // an arrow pointing left, for "and then" (origin: its middle)
    "w-arrow": g('<path d="M5 -1.2H-1.6v-2L-5.4 0l3.8 3.2v-2H5z" fill="#f59e0b"/>'),

    /* ---------- seed-10: a day ---------- */
    // a floor mattress with a pillow (origin: its bottom middle; the sleeper sits on it) and the blanket over their legs
    "w-toshak": g('<rect x="-20" y="-4" width="40" height="4" rx="1.4" fill="#e7c27a"/><ellipse cx="14" cy="-5.4" rx="5" ry="2" fill="#fff"/>'),
    "w-blanket": g('<path d="M-19-1c0-5 4-7 12-7h10c6 0 9 2 9 7z" fill="#5b9bd5"/><path d="M-16-3h28M-14-5.6h24" fill="none" stroke="#fff" stroke-width=".4" stroke-dasharray="1.2 1"/>'),
    // a little sun for the window, and the window at night with the moon (stage units, over the w-room window)
    "w-win-moon": g('<rect x="64.5" y="11.5" width="31" height="23" fill="#22305a"/><path d="M80 11.5v23M64.5 23h31" fill="none"/>' +
      '<g data-part="moon" data-pivot="73 18"><path d="M72 15a4 4 0 1 0 3 5 3.2 3.2 0 1 1-3-5z" fill="#fde68a" stroke-width=".4"/></g><g fill="#fde68a" stroke="none"><circle cx="88" cy="15" r=".5"/><circle cx="92" cy="28" r=".5"/><circle cx="84" cy="30" r=".4"/><circle cx="68" cy="30" r=".4"/></g>'),
    "w-win-sky": '<rect x="64.5" y="11.5" width="31" height="23" fill="#bfe3f5"/><rect x="64.5" y="11.5" width="31" height="23" fill="none" stroke="#3d2c22" stroke-width=".6"/>',
    "w-win-bars": '<path d="M80 11.5v23M64.5 23h31" fill="none" stroke="#3d2c22" stroke-width=".6"/><rect x="62" y="9" width="36" height="28" rx="1.5" fill="none" stroke="#fff" stroke-width="2.4"/>',
    "w-sun-small": g('<circle r="3.4" fill="#fcd34d"/>'),
    // a frame for one day (origin: its middle; 40 × 52) and a ring that marks "today"
    "w-day": g('<rect x="-20" y="-26" width="40" height="52" rx="2.4" fill="#e4f3fb"/><path d="M-20 16h40v7.6q0 2.4-2.4 2.4h-35.2q-2.4 0-2.4-2.4z" fill="#cfe6b8" stroke="none"/>' +
      '<path d="M-20 16h40" fill="none" stroke-width=".4"/><rect x="-20" y="-26" width="40" height="52" rx="2.4" fill="none"/>'),
    "w-day-ring": '<rect x="-21.4" y="-27.4" width="42.8" height="54.8" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.4"/>',

    /* ---------- seed-11: taking turns ---------- */
    // a slide from the side (origin: the foot of its ladder; the top is at (0, −30), the chute ends at (−34, −4))
    "w-slide": g('<path d="M2-30L-30-6q-3 2-6 2h-2v-3h1q2 0 4-1.4L0-33z" fill="#e5483f"/>' +
      '<path d="M0-30V0M8-30V0" fill="none" stroke="#5b9bd5" stroke-width="1.4"/><path d="M0-24h8M0-18h8M0-12h8M0-6h8" fill="none" stroke="#5b9bd5" stroke-width=".9"/>' +
      '<rect x="-1" y="-33" width="10" height="3" rx=".8" fill="#f2c14e"/><path d="M-28-6v6M-16-14V0" fill="none" stroke="#5b9bd5" stroke-width="1"/>'),
    // a box of crayons and one crayon (origin: their bottom middle)
    "w-crayons": g('<g stroke-width=".35"><rect x="-5" y="-9" width="2" height="5" fill="#e5483f"/><rect x="-2.4" y="-10" width="2" height="6" fill="#f2c14e"/><rect x=".2" y="-9.4" width="2" height="5.4" fill="#5aa36a"/><rect x="2.8" y="-9" width="2" height="5" fill="#5b9bd5"/></g>' +
      '<rect x="-6" y="-6" width="12" height="6" rx=".6" fill="#f59e0b"/>'),
    "w-crayon": g('<path d="M-1-6.4L0-8l1 1.6z" fill="#8a6cc4"/><rect x="-1" y="-6.4" width="2" height="6.4" rx=".4" fill="#8a6cc4"/>'),
    // a sheet of paper on the floor with a drawing on it (origin: its middle)
    "w-drawing": g('<path d="M-9 2l2-5h16l-2 5z" fill="#fff"/><path d="M-4-1q2-2 4 0t4 0" fill="none" stroke="#e5483f" stroke-width=".5"/><circle cx="4" cy="-1.8" r=".9" fill="#fcd34d" stroke="none"/>'),
    // a glass of water (origin: its bottom middle) and the water spilt on the floor (origin: its middle; grows with sx)
    "w-glass": g('<path d="M-2.4-7h4.8l-.6 7h-3.6z" fill="#e6f4fb"/><path d="M-2.2-4.6h4.4l-.4 4.6h-3.6z" fill="#7cc6e8" stroke="none"/>'),
    "w-puddle": '<path d="M-7 0c0-1.4 2-2 4-1.8 1-.8 4-.8 5 0 2-.2 5 .4 5 1.8s-3 1.6-5 1.4c-2 .6-5 .4-6-.2-2 0-3-.4-3-1.2z" fill="#7cc6e8" stroke="#3d2c22" stroke-width=".4"/>',
    // a toy box (origin: its bottom middle)
    "w-toybox": g('<rect x="-11" y="-12" width="22" height="12" rx="1" fill="#c98a4b"/><path d="M-11-12l-3-4h28l-3 4z" fill="#e0a76a"/><path d="M-7-6h14" fill="none" stroke="#a0683f" stroke-width=".8"/>'),
    // some building blocks (origin: their bottom middle)
    "w-blocks": g('<rect x="-5" y="-4" width="4" height="4" fill="#5b9bd5"/><rect x="-1" y="-4" width="4" height="4" fill="#e5483f"/><rect x="-3" y="-8" width="4" height="4" fill="#f2c14e"/>'),

    /* ---------- seed-12: where is it? ---------- */
    // a closed cardboard box (origin: its bottom middle; 24 wide, 16 high, its top seen from a little above, up to −20)
    "w-box": g('<path d="M12-16l3-4v16l-3 4z" fill="#c98a4b"/><path d="M-12-16l3-4h24l-3 4z" fill="#e7b57e"/><path d="M0-16l3-4" fill="none" stroke="#a0683f" stroke-width=".5"/>' +
      '<rect x="-12" y="-16" width="24" height="16" fill="#d9a066"/><path d="M-4-10h8" fill="none" stroke="#a0683f" stroke-width=".8"/>'),
    // a ball from the side that can roll: the piece "spin" turns about its middle (origin: where it touches the floor)
    "w-ball-roll": g('<g data-part="spin" data-pivot="0 -4"><circle cy="-4" r="4" fill="#fff"/><path d="M-4-4c2-1.6 6-1.6 8 0M0-8c-1.6 2-1.6 6 0 8" fill="none" stroke="#e5483f" stroke-width=".8"/></g>'),
    // a low table from the side (origin: the middle of its bottom; top at −20, 40 wide)
    "w-low-table": g('<rect x="-20" y="-21" width="40" height="3" rx=".8" fill="#c98a4b"/><rect x="-18" y="-18" width="2.4" height="18" fill="#a0683f"/><rect x="15.6" y="-18" width="2.4" height="18" fill="#a0683f"/>')
  });
})();

/* ---------------- Seed: needs and wants, the park, Yalda (seed-13, seed-14, seed-15) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  // goods on a shelf: jars, boxes and bags in a row from x0, standing on y (stage units)
  function goods(x0, y, n) {
    var cols = ["#e46b6b", "#f2c14e", "#5aa36a", "#5b9bd5", "#e7c27a", "#8a6cc4"], s = "";
    for (var i = 0; i < n; i++) {
      var x = x0 + i * 9, c = cols[(i * 5 + y) % cols.length];
      s += i % 3 === 0 ? '<rect x="' + x + '" y="' + (y - 9) + '" width="6" height="9" rx="1" fill="' + c + '"/><rect x="' + (x + 1) + '" y="' + (y - 10.4) + '" width="4" height="1.6" fill="#fff"/>'
        : i % 3 === 1 ? '<path d="M' + x + " " + y + "v-7q0-2 3.4-2.4 3.4.4 3.4 2.4v7z" + '" fill="' + c + '"/>'
        : '<rect x="' + x + '" y="' + (y - 7) + '" width="7" height="7" fill="' + c + '"/><path d="M' + (x + 1.4) + " " + (y - 4) + "h4" + '" fill="none" stroke="#fff" stroke-width=".6"/>';
    }
    return s;
  }
  W.add({
    /* ---------- seed-13: the grocer's ---------- */
    // a grocer's shop inside (stage units): shelves with goods on the back wall (boards at y 24 and 44), the floor from y 62
    "w-shop-in": g('<rect width="160" height="62" fill="#f3e6cf" stroke="none"/><rect y="62" width="160" height="28" fill="#d8c3a0" stroke="none"/><path d="M0 62h160" fill="none"/>' +
      '<rect x="4" y="24" width="96" height="2.4" fill="#a0683f"/><rect x="4" y="44" width="96" height="2.4" fill="#a0683f"/>' + goods(8, 24, 5) + goods(8, 44, 10) +
      '<rect x="104" y="6" width="22" height="30" rx="1" fill="#fff"/><rect x="106" y="8" width="18" height="26" fill="#bfe3f5"/>'),
    // the counter in front of the shopkeeper (stage units, x 112–160)
    "w-counter2": g('<rect x="112" y="56" width="50" height="34" fill="#c98a4b"/><rect x="110" y="53" width="52" height="4" rx="1" fill="#e0a76a"/><path d="M118 64h38M118 76h38" fill="none" stroke="#a0683f" stroke-width=".7"/>'),
    // Mina's father at work, a carpenter with a hammer
    "w-dad-hammer": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5b9bd5", pants: "#5a5f7a",
      holdR: '<g transform="rotate(-90)"><rect x="-.5" y="-1" width="1" height="7" fill="#a0683f"/><rect x="-2" y="5" width="4" height="2.4" rx=".4" fill="#5a5f7a"/></g>' }),
    "w-mina": person({ kind: "girl", key: "w-mina", hair: "#2f2219", style: "long", shirt: "#f59e0b", pants: "#5a5f7a" }),
    // a piggy bank (origin: its bottom middle); coins go in at the slot (0, −11)
    "w-piggy": g('<ellipse cy="-6" rx="8" ry="5.6" fill="#f7a8c0"/><path d="M-6-1.4v1.4M-2-.6V.6M2-.6V.6M6-1.4v1.4" fill="none" stroke="#e46b8a" stroke-width="1.6"/>' +
      '<ellipse cx="8.4" cy="-6.6" rx="1.8" ry="2" fill="#f7a8c0"/><g stroke="none" fill="#3d2c22"><circle cx="8" cy="-7" r=".35"/><circle cx="9" cy="-7" r=".35"/><circle cx="4.6" cy="-8.6" r=".5"/></g>' +
      '<path d="M3.6-11l1.2-2 1 2.4z" fill="#f7a8c0"/><rect x="-2" y="-11.8" width="4" height="1" rx=".4" fill="#3d2c22" stroke="none"/><path d="M-8-7c-2 0-2-2-1-2" fill="none" stroke-width=".5"/>'),

    /* ---------- seed-14: a park that belongs to everyone ---------- */
    // a park (stage units): trees far away, grass from y 50, a path, a pond on the left, a flower bed on the right
    // (flowers fl1–fl4 sway)
    "w-park-bg": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' +
      '<g stroke="none"><circle cx="16" cy="40" r="10" fill="#7fb86a"/><circle cx="34" cy="38" r="12" fill="#6db35a"/><circle cx="92" cy="40" r="11" fill="#7fb86a"/><circle cx="130" cy="36" r="13" fill="#6db35a"/><circle cx="152" cy="42" r="9" fill="#7fb86a"/></g>' +
      '<rect y="48" width="160" height="42" fill="#a8d695" stroke="none"/><path d="M0 48h160" fill="none" stroke="#7fb86a" stroke-width=".6"/>' +
      '<path d="M60 90c4-14 10-28 22-42h8c-8 14-10 28-8 42z" fill="#e8d5b0" stroke="none"/>' +
      '<ellipse cx="22" cy="62" rx="20" ry="5" fill="#5ab0e0"/><path d="M10 61q4-1.4 8 0M26 63q4-1.4 8 0" fill="none" stroke="#fff" stroke-width=".5"/>' +
      '<path d="M118 66c4-4 30-4 36 0v4h-36z" fill="#8a5a3a"/>' +
      [[124, "#e5483f"], [132, "#f2c14e"], [140, "#f28baa"], [148, "#8a6cc4"]].map(function (fl, i) {
        return '<g data-part="fl' + (i + 1) + '" data-pivot="' + fl[0] + ' 66"><path d="M' + fl[0] + ' 66v-6" fill="none" stroke="#5a9a45" stroke-width=".8"/>' +
          '<circle cx="' + fl[0] + '" cy="59" r="2.2" fill="' + fl[1] + '"/><circle cx="' + fl[0] + '" cy="59" r=".8" fill="#fcd34d" stroke="none"/></g>'; }).join("")),
    // a park bench (origin: its bottom middle; the seat at −8, 40 wide)
    "w-bench": g('<rect x="-20" y="-16" width="40" height="2.4" rx=".6" fill="#c98a4b"/><rect x="-20" y="-12" width="40" height="2.4" rx=".6" fill="#c98a4b"/>' +
      '<rect x="-21" y="-8.4" width="42" height="2.4" rx=".6" fill="#e0a76a"/><path d="M-17-6v6M17-6v6M-17-16v8M17-16v8" fill="none" stroke="#5a5f7a" stroke-width="1.2"/>'),
    // litter: a plastic bottle, a crumpled paper, a can and a banana peel (origin: their middle, lying on the ground)
    "w-bottle": g('<g transform="rotate(-80)"><rect x="-1.6" y="-5" width="3.2" height="7" rx="1" fill="#bfe3f5"/><rect x="-.8" y="-6.6" width="1.6" height="1.8" fill="#5b9bd5"/></g>'),
    "w-paper": g('<path d="M-2.4-1.6l1.4-1.2 1.6.6 1.6-.8 1.2 1.6-.6 1.6.8 1.4-2 .8-1.6-.6-1.4.6-1.2-1.6.6-1.2z" fill="#fff"/>'),
    "w-can": g('<rect x="-3" y="-1.6" width="6" height="3.2" rx=".6" fill="#e5483f"/><path d="M-1 -1.6v3.2" fill="none" stroke="#fff" stroke-width=".5"/>'),
    "w-banana-peel": g('<path d="M0-1.6c-2 0-3.6 1-4.4 2.2 1.4-.4 2.6-.4 3.4.2-.6.6-1 1.2-1 1.8 1-.6 1.8-1 2.6-1 .8 0 1.6.4 2.4 1 0-.6-.4-1.2-1-1.8.8-.6 2-.6 3.4-.2C4.6-.6 3-1.6 0-1.6z" fill="#f2d14e"/>'),
    // Yasaman's father wearing gloves to pick up litter
    "w-dad-glove": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5b9bd5", pants: "#5a5f7a",
      holdR: '<circle r="1.8" fill="#f2c14e"/>', holdL: '<circle r="1.8" fill="#f2c14e"/>' }),
    "w-yasaman": person({ kind: "girl", key: "w-yasaman", hair: "#1f1712", style: "pony", shirt: "#5aa36a", skirt: "#f59e0b", legs: "#fff", skin: "#e9bb92" }),
    "w-yasaman-glove": person({ kind: "girl", key: "w-yasaman", hair: "#1f1712", style: "pony", shirt: "#5aa36a", skirt: "#f59e0b", legs: "#fff", skin: "#e9bb92",
      holdR: '<circle r="1.6" fill="#f2c14e"/>' }),
    // a banana in a hand (origin: the hand)
    "w-banana": g('<path d="M-1 1c-1-3 0-6 3-7 0 3 .4 5 1.4 6.6z" fill="#f2d14e"/>'),

    /* ---------- seed-15: Yalda night ---------- */
    // a whole watermelon whose halves fall apart (pieces h1, h2) and show the red inside (origin: its bottom middle)
    "w-watermelon": g('<g data-part="h1" data-pivot="0 0"><path d="M0-12a6 6 0 0 0 0 12z" fill="#5a9a45"/><path d="M0-10.6a4.6 4.6 0 0 0 0 9.2z" fill="#f05a5a" stroke="none"/></g>' +
      '<g data-part="h2" data-pivot="0 0"><path d="M0-12a6 6 0 0 1 0 12z" fill="#5a9a45"/><path d="M0-10.6a4.6 4.6 0 0 1 0 9.2z" fill="#f05a5a" stroke="none"/></g>' +
      '<g data-part="skin"><circle cy="-6" r="6" fill="#5a9a45"/><path d="M-4-10c1 2 1 6 0 8M0-12v12M4-10c-1 2-1 6 0 8" fill="none" stroke="#3f7a35" stroke-width=".6"/></g>'),
    // a pomegranate cut open: red seeds inside (origin: its bottom middle)
    "w-pom-open": g('<path d="M-6-3.4a6 3.4 0 0 0 12 0z" fill="#c0303a"/><ellipse cy="-3.4" rx="6" ry="1.8" fill="#f4d7c8"/>' +
      '<g fill="#d8233a" stroke="none">' + [[-3.6, -3.6], [-1.8, -4], [0, -3.4], [1.8, -4], [3.6, -3.4], [-2.6, -2.8], [.8, -2.6], [2.8, -2.8]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".75"/>'; }).join("") + "</g>"),
    // a bowl of pomegranate seeds that fills (the piece "fill" grows), and a plate of nuts (origin: their bottom middle)
    "w-seed-bowl": g('<g data-part="fill" data-pivot="0 -3.6"><ellipse cy="-3.6" rx="4.6" ry="1.4" fill="#d8233a"/></g><path d="M-5-3.6h10c0 3-2 3.6-5 3.6s-5-.6-5-3.6z" fill="#fff"/>'),
    "w-nuts": g('<ellipse cy="-.8" rx="6" ry="1.6" fill="#fff"/><g stroke-width=".3"><ellipse cx="-2.6" cy="-2" rx="1.3" ry="1" fill="#c98a4b"/><ellipse cx=".2" cy="-2.4" rx="1.2" ry=".9" fill="#a8c46a"/><ellipse cx="2.6" cy="-1.8" rx="1.3" ry="1" fill="#e7c27a"/><ellipse cx="-.6" cy="-3.2" rx="1" ry=".8" fill="#8a5a3a"/></g>'),
    // Shiva, the grandparents' guest on Yalda night (standing and sitting)
    "w-shiva": person({ kind: "girl", key: "w-shiva", hair: "#4a2f1f", style: "long", shirt: "#c0303a", skirt: "#5b9bd5", legs: "#fff" }),
    "w-shiva-sit": person({ kind: "girl", key: "w-shiva", hair: "#4a2f1f", style: "long", shirt: "#c0303a", skirt: "#5b9bd5", legs: "#fff", sit: true })
  });
})();

/* ---------------- Seed: Iran's peoples, homes around the world (seed-16, seed-17) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  /* Instruments for the cards and tiles of seed-16 (emoji with no other drawing in Baghcheh, so these pictures are
     the only meaning they have here): 🪘 a daf (a frame drum), 🪕 a dutar (a two-stringed lute), 🪈 a laleva (a
     shepherd's flute). Same style as js/art/things.js. */
  if (B.addArt) B.addArt({
    "🪘": '<circle cx="50" cy="50" r="40" fill="#8a5a3a"/><circle cx="50" cy="50" r="33" fill="#f4e1c1"/><g fill="none" stroke="#c9a074" stroke-width="2"><circle cx="50" cy="50" r="24"/></g>' +
      '<g fill="#e7c27a" stroke-width="2">' + [0, 60, 120, 180, 240, 300].map(function (a) { var r = a * Math.PI / 180; return '<circle cx="' + f(50 + Math.cos(r) * 36.6) + '" cy="' + f(50 + Math.sin(r) * 36.6) + '" r="3.4"/>'; }).join("") + "</g>",
    "🪕": '<g transform="rotate(35 50 50)"><path d="M46 4h8v56h-8z" fill="#a0683f"/><path d="M50 50c-14 0-18 10-18 20 0 12 8 24 18 24s18-12 18-24c0-10-4-20-18-20z" fill="#c98a4b"/>' +
      '<circle cx="50" cy="70" r="5" fill="#5a3a26"/><path d="M48 8v80M52 8v80" fill="none" stroke="#f4efe6" stroke-width="1.4"/><path d="M44 10h-5M56 16h5" stroke-width="3"/></g>',
    "🪈": '<g transform="rotate(-30 50 50)"><rect x="8" y="44" width="84" height="12" rx="6" fill="#d9b77e"/><g fill="#5a3a26" stroke="none"><circle cx="40" cy="50" r="2.6"/><circle cx="52" cy="50" r="2.6"/><circle cx="64" cy="50" r="2.6"/><circle cx="76" cy="50" r="2.6"/></g>' +
      '<path d="M14 44v12" fill="none" stroke-width="2"/></g>'
  });
  // instruments in a hand (the hand at 0 0, in the person's units)
  var DAF = '<g transform="translate(1 -4)"><circle r="5" fill="#8a5a3a"/><circle r="4" fill="#f4e1c1"/></g>';
  var DUTAR = '<g transform="rotate(-50)"><rect x="-.5" y="-15" width="1" height="13" fill="#a0683f"/><ellipse cy="0" rx="2.6" ry="3.4" fill="#c98a4b"/></g>';
  var QEYCHAK = '<g transform="translate(0 -3)"><rect x="-.4" y="-8" width=".8" height="6" fill="#5a3a26"/><path d="M0-3c-2.4 0-3 1.4-3 3 0 2.4 1.4 4 3 4s3-1.6 3-4c0-1.6-.6-3-3-3z" fill="#a0683f"/></g>';
  var BOW = '<path d="M0 0L-7-5" fill="none" stroke="#5a3a26" stroke-width=".6"/>';
  var FLUTE = '<g transform="rotate(140)"><rect x="-.6" y="-2" width="1.2" height="15" rx=".6" fill="#d9b77e"/><g fill="#5a3a26" stroke="none"><circle cy="6" r=".3"/><circle cy="8.4" r=".3"/><circle cy="10.8" r=".3"/></g></g>';
  var KARNA = '<g transform="rotate(-150)"><path d="M-.5 0v14l-1.6 4h4.2l-1.6-4V0z" fill="#e7c27a"/></g>';
  var TABL = '<g transform="translate(3 0)"><rect x="-3.4" y="-3" width="6.8" height="6" rx="1" fill="#c0503e"/><ellipse cx="0" cy="-3" rx="3.4" ry="1" fill="#f4e1c1"/></g>';
  var STICK = '<path d="M0 0L4-4" fill="none" stroke="#8a5a3a" stroke-width=".7"/>';
  // clothes for special days (in the body's units: y 0 is the top of the shirt)
  var SASH = '<rect x="-5.6" y="8.4" width="11.2" height="2.4" fill="#c0503e"/>';
  var KURD_HAT = '<path d="M-5.6 1.2c0-3.2 2.4-4.8 5.6-4.8s5.6 1.6 5.6 4.8z" fill="#3d3a3a"/><path d="M-5 1.4v1.4M-3 1.6v1.4M3 1.6v1.4M5 1.4v1.4" fill="none" stroke="#3d3a3a" stroke-width=".5"/>';
  var VEST = '<path d="M-4.2.6h2.6v7.6h-2.6zM1.6.6h2.6v7.6h-2.6z" fill="#f2c14e"/>';
  var TELPEK = '<path d="M-6 1.4c-.6-5.6 1.2-8.6 6-8.6s6.6 3 6 8.6z" fill="#f4efe6"/><path d="M-4-2q1-1 2 0t2 0 2 0M-4-5q1-1 2 0t2 0 2 0" fill="none" stroke="#c9c2b6" stroke-width=".5"/>';
  var ROBE = '<path d="M-5.6 1.4h11.2l1 15H-6.6z" fill="#a8323a"/><path d="M-3 1.6v14.6M3 1.6v14.6" fill="none" stroke="#f2c14e" stroke-width=".6"/>';
  var COLLAR = '<path d="M-2.4.4h4.8v3.4L0 5l-2.4-1.2z" fill="#f2c14e"/>';
  var TURBAN = '<path d="M-5.8 1.2c0-3.8 2.6-5.8 5.8-5.8s5.8 2 5.8 5.8z" fill="#fff"/><path d="M-5.6 0c3-1.6 8.2-1.6 11.2 0M-5-2c3-1.4 7-1.4 10 0" fill="none" stroke-width=".35"/>';
  var LONGSHIRT = '<path d="M-5.3 1.4h10.6l1 16H-6.3z" fill="#f4efe6"/><path d="M0 1.6v5" fill="none" stroke-width=".35"/>';
  var EMBROIDER = '<rect x="-3" y="1" width="6" height="7.4" fill="#e5483f"/><path d="M-2 2.4h4M-2 4.6h4M-2 6.8h4" fill="none" stroke="#f2c14e" stroke-width=".7"/>';
  var FELT = '<path d="M-5 1.2c0-2.6 2-3.8 5-3.8s5 1.2 5 3.8z" fill="#8a6f52"/>';
  var DOGUSHI = '<path d="M-5.4 1.4c0-4.4 2.4-6.4 5.4-6.4s5.4 2 5.4 6.4z" fill="#a0785a"/><path d="M-5.2-.4l-2.4-2.6M5.2-.4l2.4-2.6" fill="none" stroke="#a0785a" stroke-width="1.6"/>';
  var LAYERS = '<path d="M-6.6 14h13.2M-7.4 17.8h14.8M-8.2 21.6h16.4" fill="none" stroke="#f2c14e" stroke-width="1.1"/><path d="M-7 15.8h14M-7.8 19.6h15.6" fill="none" stroke="#5aa36a" stroke-width=".9"/>';
  var DISHDASHA = '<path d="M-5.3 1.4h10.6l.8 22.6H-6.1z" fill="#fbfbf8"/><path d="M0 1.6v5" fill="none" stroke-width=".35"/>';
  W.add({
    // Kurdistan: Zhina and her father
    "w-zhina": person({ kind: "girl", key: "w-zhina", hair: "#2f2219", style: "long", shirt: "#e46b8a", skirt: "#e46b8a", long: true, legs: "#e46b8a", front: VEST }),
    "w-kurd-dad": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#7a8a5a", pants: "#7a8a5a", front: SASH, hat: KURD_HAT, holdL: DAF }),
    // Turkmen Sahra: Aynaz and her grandfather
    "w-aynaz": person({ kind: "girl", key: "w-aynaz", hair: "#1f1712", style: "long", shirt: "#a8323a", skirt: "#a8323a", long: true, legs: "#a8323a", skin: "#f7d7bb", front: COLLAR }),
    "w-turkmen-grandpa": person({ adult: true, style: "bald", beard: "#e8e4de", shirt: "#a8323a", pants: "#3d3a3a", skin: "#f7d7bb", front: ROBE, hat: TELPEK, holdR: DUTAR }),
    // Chabahar: Davood and his father
    "w-davood": person({ hair: "#1f1712", shirt: "#f4efe6", pants: "#f4efe6", skin: "#c98f63", front: '<path d="M-4.4 1.4h8.8l.8 12H-5.2z" fill="#f4efe6"/>' }),
    "w-baluch-dad": person({ adult: true, hair: "#1f1712", beard: "#1f1712", shirt: "#f4efe6", pants: "#f4efe6", skin: "#c98f63", front: LONGSHIRT, hat: TURBAN, holdL: QEYCHAK, holdR: BOW }),
    "w-baluch-mom": person({ kind: "woman", key: "w-baluch-mom", adult: true, hair: "#1f1712", style: "long", shirt: "#2f7a6a", skirt: "#2f7a6a", long: true, legs: "#2f7a6a", skin: "#c98f63", front: EMBROIDER }),
    // Gilan: Negar and her grandfather
    "w-negar": person({ kind: "girl", key: "w-negar", hair: "#4a2f1f", style: "pony", shirt: "#fff", skirt: "#e5483f", legs: "#3d3a3a", front: '<path d="M-4.2.6h3v6.6h-3zM1.2.6h3v6.6h-3z" fill="#2f4a8a"/>' }),
    "w-gilak-grandpa": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#f4efe6", pants: "#3d3a3a", hat: FELT, holdR: FLUTE }),
    // the Qashqai: Bahador, his mother and his uncle
    "w-bahador": person({ hair: "#2f2219", shirt: "#5b9bd5", pants: "#3d3a3a", skin: "#e9bb92", hat: DOGUSHI }),
    "w-qashqai-mom": person({ kind: "woman", key: "w-qashqai-mom", adult: true, hair: "#1f1712", style: "long", shirt: "#8a6cc4", skirt: "#e46b8a", long: true, legs: "#e46b8a", skin: "#e9bb92", front: LAYERS }),
    "w-qashqai-uncle": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5a5f7a", pants: "#3d3a3a", skin: "#e9bb92", hat: DOGUSHI, holdR: KARNA }),
    // Ahvaz: Adel and his father
    "w-adel": person({ hair: "#1f1712", shirt: "#f2c14e", pants: "#4b5a78", skin: "#c98f63" }),
    "w-arab-dad": person({ adult: true, hair: "#1f1712", mustache: "#1f1712", shirt: "#fbfbf8", pants: "#fbfbf8", skin: "#c98f63", front: DISHDASHA, holdL: TABL, holdR: STICK }),
    // Mulla Nasreddin (world-sapling-21): in his old, patched clothes, and in a fine new coat
    "w-mulla": person({ adult: true, style: "bald", beard: "#e8e4de", shirt: "#9a8a6a", pants: "#6b5a4a", hat: TURBAN,
      front: '<rect x="-4" y="4" width="3" height="3" fill="#c9a06a"/><rect x="1.6" y="8" width="2.6" height="2.6" fill="#7a8a5a"/>' }),
    "w-mulla-coat": person({ adult: true, style: "bald", beard: "#e8e4de", shirt: "#2f4a8a", pants: "#3d3a3a", hat: TURBAN,
      front: '<path d="M-5.6 1.2h11.2l1.6 19H-7.2z" fill="#2f4a8a"/><path d="M0 1.4v18.6M-2.4 1.4l2.4 4 2.4-4" fill="none" stroke="#f2c14e" stroke-width=".8"/>' }),
    // a black tent of goat hair (origin: its bottom middle; 56 wide); and a bridge over a river in Ahvaz (stage units)
    "w-black-tent": g('<path d="M-28 0v-12l6-6h44l6 6v12z" fill="#3d3a3a"/><path d="M-22-18v18M22-18v18M0-20v20" fill="none" stroke="#8a5a3a" stroke-width="1"/>' +
      '<path d="M-8 0v-10h16v10z" fill="#5a4a3a"/><path d="M-28-12h56" fill="none" stroke="#5a5a5a" stroke-width=".6"/>'),
    "w-ahvaz": g('<rect width="160" height="90" fill="#fbe3b0" stroke="none"/><rect y="40" width="160" height="20" fill="#5ab0e0" stroke="none"/><path d="M0 40h160M0 60h160" fill="none"/>' +
      '<path d="M10 40c20-26 120-26 140 0" fill="none" stroke="#fbfbf8" stroke-width="3"/><path d="M10 40c20-26 120-26 140 0" fill="none" stroke-width=".5"/>' +
      '<rect y="36" width="160" height="3.4" fill="#fbfbf8"/><path d="M30 37V22M50 37V16M80 37V13M110 37V16M130 37V22" fill="none" stroke="#fbfbf8" stroke-width="1"/>' +
      '<rect y="60" width="160" height="30" fill="#f0d29a" stroke="none"/>'),

    /* ---------- seed-17: homes in many places ---------- */
    // Yazd: a mud-brick house with a windcatcher (origin: its bottom middle; the tower on the left, its top at −52)
    "w-yazd-house": g('<rect x="-26" y="-22" width="52" height="22" fill="#d9b77e"/><path d="M-6-22c0-8 4-12 10-12s10 4 10 12z" fill="#d9b77e"/>' +
      '<rect x="-24" y="-52" width="12" height="30" fill="#d0ab70"/><path d="M-22-50v10M-19-50v10M-16-50v10M-13.6-50v10" fill="none" stroke="#8a5a3a" stroke-width="1.2"/><rect x="-25" y="-54" width="14" height="2.4" fill="#c49a5e"/>' +
      '<path d="M8-10v10h8V-10a4 4 0 0 0-8 0z" fill="#a0683f"/><rect x="-6" y="-14" width="6" height="6" fill="#8a5a3a"/>'),
    // the cool wind: from outside, into the tower's openings and down into the house (stage-unit path, drawn like a pencil)
    // (origin: the middle of the tower's top; in the house's units)
    "w-wind-in": '<path d="M30-6C18-8 8-4 1 3M0 4v40c0 4 3 6 8 6h12" fill="none" stroke="#5b9bd5" stroke-width="1.4" stroke-dasharray="2.6 1.6"/>',
    // a nomad's tent going up (the tent drawing above), and a flock of sheep is 🐑 in the lesson
    // a wooden house on stilts by a river (origin: the bottom of the stilts)
    "w-stilt-house": g('<path d="M-18 0v-24M-6 0v-24M6 0v-24M18 0v-24" fill="none" stroke="#8a5a3a" stroke-width="2.2"/>' +
      '<rect x="-22" y="-26" width="44" height="3" fill="#a0683f"/><rect x="-18" y="-44" width="36" height="18" fill="#c98a4b"/><path d="M-22-44l22-12 22 12z" fill="#7a8a5a"/>' +
      '<rect x="-4" y="-38" width="8" height="12" fill="#8a5a3a"/><rect x="-14" y="-40" width="6" height="6" fill="#bfe3f5"/><rect x="8" y="-40" width="6" height="6" fill="#bfe3f5"/>' +
      '<path d="M4-24l10 24" fill="none" stroke="#a0683f" stroke-width="1.4"/>'),
    // the river bank (stage units): the water is the part "w-water-up" that rises
    "w-river-bg": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 52c40-6 80-6 180 0v40H-10z" fill="#8fc46a"/><circle cx="20" cy="40" r="10" fill="#5a9a45"/><circle cx="140" cy="38" r="12" fill="#5a9a45"/>'),
    "w-water-up": '<rect x="0" y="0" width="160" height="40" fill="#5ab0e0" opacity=".85"/><path d="M0 0h160" fill="none" stroke="#fff" stroke-width=".8"/>',
    // a snow house built of snow blocks (origin: its bottom middle): the rows r1–r4 appear one by one
    "w-igloo": g('<g data-part="r1"><path d="M-22 0c0-3 0-6 1-8h42c1 2 1 5 1 8z" fill="#fff"/><path d="M-12-8v8M0-8v8M12-8v8" fill="none" stroke="#a9c8dc" stroke-width=".6"/></g>' +
      '<g data-part="r2"><path d="M-21-8c1-4 2-7 4-9h34c2 2 3 5 4 9z" fill="#fff"/><path d="M-6-17v9M6-17v9" fill="none" stroke="#a9c8dc" stroke-width=".6"/></g>' +
      '<g data-part="r3"><path d="M-17-17c3-4 7-6 10-7h14c3 1 7 3 10 7z" fill="#fff"/><path d="M0-24v7" fill="none" stroke="#a9c8dc" stroke-width=".6"/></g>' +
      '<g data-part="r4"><path d="M-7-24c3-2 11-2 14 0z" fill="#fff"/></g>' +
      '<path d="M-6 0v-6a6 6 0 0 1 12 0v6z" fill="#7aa0c0"/>'),
    // snow everywhere (stage units)
    "w-snow-bg": g('<rect width="160" height="90" fill="#e4f1fa" stroke="none"/><path d="M-10 54c40-8 80-8 180 0v40H-10z" fill="#fff"/><path d="M-10 54c40-8 80-8 180 0" fill="none" stroke="#a9c8dc"/>'),
    // a man of the far north in warm clothes, cutting snow blocks (front view)
    "w-north-dad": person({ adult: true, hair: "#1f1712", shirt: "#c0503e", pants: "#5a4a3a", skin: "#d9a47a", coat: "#c0503e",
      hat: '<path d="M-6.4 2.6c0-5.6 3-8 6.4-8s6.4 2.4 6.4 8" fill="#f4efe6"/>' }),
    // a block of snow (origin: its bottom middle)
    "w-snow-block": g('<rect x="-4" y="-3" width="8" height="3" fill="#fff"/>')
  });
})();

/* ---------------- Seed: where I live, old and new, jobs, children of the world, building together
   (seed-18 to seed-23) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  function wheel(name, x, y, r) {
    return '<g data-part="' + name + '" data-pivot="' + x + " " + y + '"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#3d3a3a"/><circle cx="' + x + '" cy="' + y + '" r="' + f(r * 0.45) + '" fill="#cfd8dc"/>' +
      '<path d="M' + f(x - r * 0.45) + " " + y + "h" + f(r * 0.9) + '" fill="none" stroke-width=".4"/></g>';
  }
  // a row of small houses and blocks for a city seen from far away (stage units, x0 to x0 + n × 14, standing on y)
  function skyline(x0, y, n, seed) {
    var s = "", cols = ["#e9d8bd", "#d9c7b0", "#f2d2a9", "#cfd8dc", "#e7c27a"];
    for (var i = 0; i < n; i++) {
      var h = 10 + ((i * 7 + seed) % 5) * 5, w = 10 + (i + seed) % 3 * 2, x = x0 + i * 14;
      s += '<rect x="' + x + '" y="' + (y - h) + '" width="' + w + '" height="' + h + '" fill="' + cols[(i + seed) % cols.length] + '"/>';
      for (var r = y - h + 3; r < y - 3; r += 5) s += '<rect x="' + (x + 2) + '" y="' + r + '" width="2" height="2" fill="#bfe3f5" stroke="none"/><rect x="' + (x + w - 4) + '" y="' + r + '" width="2" height="2" fill="#bfe3f5" stroke="none"/>';
    }
    return s;
  }
  W.add({
    /* ---------- seed-18: home, city, country ---------- */
    // a city seen from far away (stage units): mountains, many buildings, a dome, the ground from y 70
    "w-city": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 52l30-22 22 14 26-20 30 22 26-16 46 22v20H-10z" fill="#b9b0a4"/>' +
      '<rect y="70" width="160" height="20" fill="#d9c49a" stroke="none"/><path d="M0 70h160" fill="none"/>' + skyline(4, 70, 5, 1) +
      '<rect x="74" y="52" width="16" height="18" fill="#e9d8bd"/><path d="M74 52c0-10 16-10 16 0z" fill="#3fb0a8"/>' + skyline(96, 70, 5, 3)),
    "w-mahan": person({ hair: "#2f2219", shirt: "#e46b6b", pants: "#4b5a78", skin: "#e9bb92" }),

    /* ---------- seed-19: old and new ---------- */
    // an oil lantern (origin: its bottom middle); the flame's glow is the piece "glow"
    "w-lantern": g('<g data-part="glow" style="opacity:0"><circle cy="-8" r="14" fill="#fcd34d" opacity=".35" stroke="none"/></g>' +
      '<rect x="-4" y="-2" width="8" height="2" fill="#5a5f7a"/><path d="M-3.4-2v-9h6.8v9" fill="#fdf6e3" opacity=".6"/><path d="M-3.4-2v-9M3.4-2v-9" fill="none"/>' +
      '<path d="M-4-11h8l-2-2h-4z" fill="#5a5f7a"/><path d="M-2-13c0-3 4-3 4 0" fill="none"/>' +
      '<g data-part="flame" style="opacity:0"><path d="M0-4c-1.4-1.4-1.2-3 0-4.6 1.2 1.6 1.4 3.2 0 4.6z" fill="#f59e0b" stroke="none"/></g>'),
    // a lamp hanging from the ceiling (origin: where it hangs); the light is the piece "light"
    "w-lamp": g('<path d="M0 0v10" fill="none"/><path d="M-6 16c0-4 2.6-6 6-6s6 2 6 6z" fill="#5b9bd5"/>' +
      '<g data-part="light" style="opacity:0"><path d="M-6 16L-22 60H22L6 16z" fill="#fcd34d" opacity=".25" stroke="none"/><circle cy="17" r="2.4" fill="#fde68a"/></g>'),
    // a light switch on the wall (origin: its middle)
    "w-switch": g('<rect x="-2" y="-3" width="4" height="6" rx=".6" fill="#fff"/><g data-part="key" data-pivot="0 0"><rect x="-.8" y="-1.6" width="1.6" height="1.8" fill="#cfd8dc"/></g>'),
    // a samovar with a teapot on top, and an electric kettle (origin: their bottom middle)
    "w-samovar": g('<path d="M-6 0l1-3h10l1 3z" fill="#c98a4b"/><path d="M-5-3c-1-6 0-12 1-14h8c1 2 2 8 1 14z" fill="#e0a76a"/><path d="M-4-10h8" fill="none" stroke="#a0683f" stroke-width=".6"/>' +
      '<path d="M5-8h3v1.4H5z" fill="#a0683f"/><path d="M-3-17v-2h6v2z" fill="#a0683f"/><path d="M-3-19c0-4 6-4 6 0z" fill="#fff"/><path d="M3-21l3-1" fill="none" stroke-width=".8"/>' +
      '<path d="M-1-23h2" fill="none"/>'),
    "w-kettle": g('<path d="M-5 0v-8c0-3 2-4 5-4s5 1 5 4v8z" fill="#cfd8dc"/><path d="M5-9c2 0 2 6 0 6" fill="none" stroke-width="1"/><path d="M-5-8l-3-2" fill="none" stroke-width="1.2"/>' +
      '<rect x="-6" y="0" width="12" height="2" rx=".6" fill="#5a5f7a"/><circle cx="-2" cy="-4" r=".8" fill="#5b9bd5" stroke="none"/>'),
    // an old black-and-white photo of a boy (origin: its middle)
    "w-old-photo": g('<rect x="-8" y="-10" width="16" height="20" fill="#f4efe6"/><rect x="-6.4" y="-8.4" width="12.8" height="14" fill="#c9c2b6"/>' +
      '<circle cx="0" cy="-3.4" r="2.6" fill="#a39a8e"/><path d="M-3.6 5.6c0-4 1.6-5.6 3.6-5.6s3.6 1.6 3.6 5.6z" fill="#8a8276"/>'),
    "w-ava": person({ kind: "girl", key: "w-ava", hair: "#6b3f26", style: "long", shirt: "#8a6cc4", skirt: "#f2c14e", legs: "#fff" }),
    "w-ava-sit": person({ kind: "girl", key: "w-ava", hair: "#6b3f26", style: "long", shirt: "#8a6cc4", skirt: "#f2c14e", legs: "#fff", sit: true }),

    /* ---------- seed-21: jobs that help us ---------- */
    "w-farmer-woman": person({ kind: "woman", key: "w-farmer-woman", adult: true, hair: "#2f2219", style: "long", shirt: "#c98a4b", skirt: "#5a9a45", long: true, legs: "#5a9a45",
      holdR: '<g data-part="can" data-pivot="0 0"><path d="M-2 0h5.6l-.6 4.6H-1.4z" fill="#5b9bd5"/><path d="M3.4 1l4-2.6" fill="none" stroke="#5b9bd5" stroke-width="1"/><path d="M7-2.2l1.2-.4.2 1.4z" fill="#5b9bd5"/></g>' }),
    "w-builder": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#f59e0b", pants: "#4b5a78", skin: "#d9a47a",
      hat: '<path d="M-6 1.4c0-4.6 2.6-6.6 6-6.6s6 2 6 6.6z" fill="#f2c14e"/><rect x="-7" y=".6" width="14" height="1.6" rx=".6" fill="#f2c14e"/>',
      holdR: '<rect x="-2.4" y="-1.6" width="4.8" height="2.6" fill="#c0503e"/>' }),
    // a brick wall that grows row by row (origin: its bottom middle; rows r1–r5 from the bottom)
    "w-wall": g([0, 1, 2, 3, 4].map(function (r) {
      var y = -4 - r * 4, off = r % 2 ? 3 : 0, s = '<g data-part="r' + (r + 1) + '">';
      for (var x = -18 + off; x < 18; x += 6) s += '<rect x="' + f(Math.max(x, -18)) + '" y="' + y + '" width="' + f(Math.min(6, 18 - Math.max(x, -18))) + '" height="4" fill="#c0503e"/>';
      return s + "</g>"; }).join("")),
    "w-nurse": person({ adult: true, hair: "#1f1712", shirt: "#7cc6e8", pants: "#7cc6e8", front: '<path d="M-5.4 1.4q0-1.4 1.4-1.4h8q1.4 0 1.4 1.4l.6 12.4H-6z" fill="#fff"/>', coat: "#fff" }),
    "w-patient-boy-sit": person({ hair: "#2f2219", shirt: "#f2c14e", pants: "#4b5a78", sleeve: "short", sit: true }),
    // a plaster (origin: its middle)
    "w-plaster": g('<rect x="-3" y="-1" width="6" height="2" rx="1" fill="#f2c9a0"/><rect x="-1" y="-1" width="2" height="2" fill="#fff" stroke="none"/>'),
    // a clinic room (stage units): a pale wall with a cross sign, the floor from 58
    "w-clinic-room": g('<rect width="160" height="58" fill="#e8f3f5" stroke="none"/><rect y="58" width="160" height="32" fill="#d8dee0" stroke="none"/><path d="M0 58h160" fill="none"/>' +
      '<rect x="20" y="14" width="14" height="14" rx="2" fill="#fff"/><path d="M27 17v8M23 21h8" fill="none" stroke="#e5483f" stroke-width="2"/>'),
    // a bench for the clinic (origin: its bottom middle; seat at −8)
    "w-stool2": g('<rect x="-10" y="-9" width="20" height="2.4" rx=".6" fill="#5b9bd5"/><path d="M-8-7v7M8-7v7" fill="none" stroke-width="1"/>'),

    /* ---------- seed-22: children around the world ---------- */
    "w-ananya": person({ kind: "girl", key: "w-ananya", hair: "#1f1712", style: "pony", shirt: "#f59e0b", skirt: "#3fb0a8", legs: "#9a6442", skin: "#9a6442" }),
    "w-karim": person({ hair: "#1f1712", style: "curly", shirt: "#5b9bd5", pants: "#5a5f7a", skin: "#c98f63" }),
    "w-chloe": person({ kind: "girl", key: "w-chloe", hair: "#c98a4b", style: "long", shirt: "#e5483f", pants: "#4b5a78", skin: "#f7d7bb" }),
    "w-wei": person({ hair: "#1f1712", shirt: "#5aa36a", pants: "#4b5a78", skin: "#f3d1aa" }),
    "w-ananya-sit": person({ kind: "girl", key: "w-ananya", hair: "#1f1712", style: "pony", shirt: "#f59e0b", skirt: "#3fb0a8", legs: "#9a6442", skin: "#9a6442", sit: true }),
    "w-karim-sit": person({ hair: "#1f1712", style: "curly", shirt: "#5b9bd5", pants: "#5a5f7a", skin: "#c98f63", sit: true }),
    "w-chloe-sit": person({ kind: "girl", key: "w-chloe", hair: "#c98a4b", style: "long", shirt: "#e5483f", pants: "#4b5a78", skin: "#f7d7bb", sit: true }),
    "w-wei-sit": person({ hair: "#1f1712", shirt: "#5aa36a", pants: "#4b5a78", skin: "#f3d1aa", sit: true }),
    "w-wei-grandpa": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#7a8a9a", pants: "#4b5a78", skin: "#f3d1aa" }),
    "w-karim-bag": person({ hair: "#1f1712", style: "curly", shirt: "#5b9bd5", pants: "#5a5f7a", skin: "#c98f63", backpack: "#e5483f" }),
    "w-wei-bag": person({ hair: "#1f1712", shirt: "#5aa36a", pants: "#4b5a78", skin: "#f3d1aa", backpack: "#f59e0b" }),
    // breakfasts: idli (white steamed rice cakes) with a little bowl of sambar, and ful (a bowl of beans) with bread
    // (origin: their bottom middle)
    "w-idli": g('<ellipse cy="-1" rx="7" ry="1.8" fill="#9ccf8a"/><g fill="#fffaf0" stroke-width=".4"><ellipse cx="-3" cy="-2.4" rx="2.4" ry="1.2"/><ellipse cx="1.4" cy="-2.4" rx="2.4" ry="1.2"/></g><path d="M3.4-2.6h3.4c0 1.4-.6 2-1.7 2s-1.7-.6-1.7-2z" fill="#e7a95b"/>'),
    "w-ful": g('<path d="M-5-3h10c0 2.4-2 3-5 3s-5-.6-5-3z" fill="#5b9bd5"/><ellipse cy="-3" rx="5" ry="1.2" fill="#a0683f"/><g fill="#c98a4b" stroke="none"><circle cx="-2" cy="-3.2" r=".5"/><circle cx="1" cy="-3" r=".5"/></g>' +
      '<path d="M5-1l3-4 2 1-3 4z" fill="#e7c27a"/>'),
    // an auto-rickshaw from the side, going left, with Ananya inside (origin: the middle of its bottom)
    "w-rickshaw": function () {
      return g('<path d="M-14-4v-12q0-4 4-4h10q4 0 6 4l6 8v4z" fill="#f2c14e"/><path d="M-14-20h16v-2h-16z" fill="#3d3a3a"/><path d="M-12-16h10v6h-10z" fill="#bfe3f5"/>' +
        '<g transform="translate(-6 -6) scale(.42)">' + B.RIG["w-ananya"] + "</g>" + '<path d="M-14-6h28" fill="none" stroke="#5aa36a" stroke-width="1.6"/>' +
        wheel("w1", -10, -3, 3) + wheel("w2", 9, -3, 3));
    },
    // a yellow school bus with Chloe at a window (origin: the middle of its bottom)
    "w-schoolbus2": function () {
      return g('<rect x="-24" y="-20" width="48" height="17" rx="3" fill="#f2c14e"/><rect x="-24" y="-8" width="48" height="1.6" fill="#3d2c22" stroke="none"/>' +
        [-21, -12, -3, 6, 15].map(function (x) { return '<rect x="' + x + '" y="-18" width="7" height="6" rx=".4" fill="#bfe3f5"/>'; }).join("") +
        '<svg x="-3" y="-18" width="7" height="6" viewBox="-3 -18 7 6" overflow="hidden"><g transform="translate(.5 -10) scale(.42)">' + B.RIG["w-chloe"] + "</g></svg>" +
        wheel("w1", -15, -3, 3) + wheel("w2", 15, -3, 3));
    },
    // a house with a steep roof, and snow on the roof that slides off (the piece "snow"; origin: its bottom middle)
    "w-house-slope": g('<rect x="-14" y="-20" width="28" height="20" fill="#c0503e"/><path d="M-18-20L0-38l18 18z" fill="#5a4a3a"/><rect x="-4" y="-12" width="8" height="12" fill="#8a5a3a"/>' +
      '<rect x="-12" y="-17" width="6" height="5" fill="#bfe3f5"/><rect x="6" y="-17" width="6" height="5" fill="#bfe3f5"/>' +
      '<g data-part="snow"><path d="M-17-21L0-37.4 17-21l-2 .6L0-35-15-20.4z" fill="#fff"/></g>'),

    /* ---------- seed-23: building together ---------- */
    // a sandcastle: the base and two towers rise (pieces base, t1, t2), shells s1–s3 appear (origin: its bottom middle)
    "w-castle": g('<g data-part="base" data-pivot="0 0"><path d="M-16 0v-8h32v8z" fill="#e7c27a"/><path d="M-16-8h4v-2h4v2h4v-2h4v2h4v-2h4v2h4" fill="#e7c27a"/></g>' +
      '<g data-part="t1" data-pivot="-10 -8"><path d="M-14-8v-12h8v12z" fill="#e0b46a"/><path d="M-15-20l5-5 5 5z" fill="#e0b46a"/></g>' +
      '<g data-part="t2" data-pivot="10 -8"><path d="M6-8v-12h8v12z" fill="#e0b46a"/><path d="M5-20l5-5 5 5z" fill="#e0b46a"/></g>' +
      [[-10, -14], [0, -4], [10, -14]].map(function (p, i) {
        return '<g data-part="s' + (i + 1) + '" style="opacity:0"><path d="M' + (p[0] - 2.6) + " " + (p[1] + 1) + "q2.6-5 5.2 0z" + '" fill="#f7a8c0" stroke-width=".35"/><path d="M' + p[0] + " " + (p[1] - 2.6) + "v3.4" + '" fill="none" stroke-width=".3"/></g>'; }).join("")),
    // a bucket of sand (origin: its bottom middle); the sand inside is the piece "sand" (grows up)
    "w-sand-bucket": g('<path d="M-4 0l-1-7h10l-1 7z" fill="#e5483f"/><g data-part="sand" data-pivot="0 -7"><ellipse cy="-7" rx="5" ry="1.4" fill="#e7c27a"/></g><path d="M-5-7c0-4 10-4 10 0" fill="none" stroke-width=".5"/>'),
    "w-water-bucket": g('<path d="M-4 0l-1-7h10l-1 7z" fill="#5b9bd5"/><ellipse cy="-7" rx="5" ry="1.4" fill="#7cc6e8"/><path d="M-5-7c0-4 10-4 10 0" fill="none" stroke-width=".5"/>'),
    "w-babak-bucket": person({ hair: "#1f1712", shirt: "#5aa36a", pants: "#6b5a4a", skin: "#d9a47a", sleeve: "short",
      holdR: '<g transform="translate(0 8.6)"><path d="M-4 0l-1-7h10l-1 7z" fill="#5b9bd5"/><ellipse cy="-7" rx="5" ry="1.4" fill="#7cc6e8"/></g>' })
  });
})();

/* ---------------- Sprout: my story, the week and the year, families (sprout-9 to sprout-12) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  W.add({
    // a life line (stage units): an arrow from the right (long ago) to the left (now) at y 78, with a dot under
    // each of five cards at x 136, 108, 80, 52, 24
    "w-lifeline": g('<path d="M150 78H12" fill="none" stroke="#a0683f" stroke-width="1.6"/><path d="M14 75l-5 3 5 3z" fill="#a0683f" stroke="#a0683f"/>' +
      [136, 108, 80, 52, 24].map(function (x) { return '<circle cx="' + x + '" cy="78" r="1.8" fill="#f59e0b"/><path d="M' + x + ' 76v-6" fill="none" stroke="#a0683f" stroke-width=".6"/>'; }).join("")),
    // a small photo card (origin: its middle; 26 × 30)
    "w-card": g('<rect x="-13" y="-15" width="26" height="30" rx="1.6" fill="#fff"/><rect x="-11" y="-13" width="22" height="22" fill="#e4f3fb"/><rect x="-11" y="3" width="22" height="6" fill="#cfe6b8" stroke="none"/>'),
    // a word tile (origin: its middle; 22 × 11); the word goes on it as a text part
    "w-tile": g('<rect x="-11" y="-5.5" width="22" height="11" rx="2.4" fill="#fffaf0"/>'),
    "w-tile-on": '<rect x="-12" y="-6.5" width="24" height="13" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.4"/>',
    "w-bardia": person({ hair: "#2f2219", shirt: "#3fb0a8", pants: "#4b5a78", skin: "#e9bb92" }),
    "w-bardia-small": person({ baby: true, hair: "#2f2219", style: "short", shirt: "#3fb0a8", pants: "#4b5a78", shoes: "#3fb0a8", skin: "#e9bb92" }),
    "w-bardia-bag": person({ hair: "#2f2219", shirt: "#3fb0a8", pants: "#4b5a78", skin: "#e9bb92", backpack: "#f59e0b" }),
    "w-baby-arms": person({ baby: true, sit: true, hair: "#2f2219", style: "short", shirt: "#fff", pants: "#fff", shoes: "#fff", skin: "#e9bb92" }),
    "w-nila": person({ kind: "girl", key: "w-nila", hair: "#1f1712", style: "pony", shirt: "#f2c14e", skirt: "#5b9bd5", legs: "#fff" }),
    "w-reza": person({ hair: "#6b3f26", shirt: "#e46b6b", pants: "#4b5a78" }),
    "w-dad-box": person({ adult: true, hair: "#4a2f1f", beard: "#4a2f1f", shirt: "#5aa36a", pants: "#4b5a78",
      holdL: '<g transform="translate(5 -2)"><rect x="-6" y="-6" width="12" height="9" fill="#d9a066"/><path d="M-6-6h12" fill="none"/></g>' }),
    "w-sara-g": person({ kind: "girl", key: "w-sara-g", hair: "#4a2f1f", style: "long", shirt: "#8a6cc4", pants: "#5a5f7a" })
  });
})();

/* ---------------- Sprout: nomads, homes of Iran, school, address, my neighbourhood map (sprout-13 to sprout-35) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  // a small map card (like "w-map-shiraz"), with the dot at (x, y) on js/maps/iran.js, or provinces coloured
  function card(opt) {
    return function () {
      return g('<rect x="-24" y="-20" width="48" height="40" rx="2" fill="#fffaf0"/>' +
        '<svg x="-22.5" y="-18.5" width="45" height="37" viewBox="-22.5 -18.5 45 37" overflow="hidden">' + W.iranMap(0.115, opt) + "</svg>" +
        '<rect x="-22.5" y="-18.5" width="45" height="37" fill="none" stroke-width=".5"/>');
    };
  }
  W.add({
    "w-map-yazd": card({ at: [202, 176] }),
    "w-map-masuleh": card({ at: [118, 78] }),
    "w-map-eazarbaijan": card({ prov: ["east-azerbaijan"], at: [82, 58] }),
    "w-map-big-eaz": function () { return g(W.iranMap(0.24, { lines: true, prov: ["east-azerbaijan"] })); },
    // a loom for a gabbeh: the woven part (the piece "rug") grows up from the bottom (origin: its bottom middle)
    // a wide steppe for a migration (stage units, x −100 to 700): grass from y 60 with bushes and stones that pass by
    "w-steppe": g('<path d="M-100 62c60-8 120-8 200-2s140 6 220-2 160-6 380 2v30h-800z" fill="#a8d695"/>' +
      [-60, 10, 70, 150, 230, 300, 390, 470, 540, 620].map(function (x, i) { return i % 2 ? '<ellipse cx="' + x + '" cy="80" rx="3" ry="1.6" fill="#b9b0a4"/>' : '<path d="M' + x + ' 76c-2-4 2-6 4-3 2-3 6-1 4 3z" fill="#6db35a"/>'; }).join("")),
    "w-sky-hills": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 62l30-20 26 12 30-24 34 26 30-18 30 24v10H-10z" fill="#9fb59a"/>'),
    "w-loom": g('<path d="M-16 0v-34M16 0v-34" fill="none" stroke="#8a5a3a" stroke-width="2"/><path d="M-18-34h36M-18-2h36" fill="none" stroke="#8a5a3a" stroke-width="2"/>' +
      '<path d="M-12-32v28M-8-32v28M-4-32v28M0-32v28M4-32v28M8-32v28M12-32v28" fill="none" stroke="#e8e4de" stroke-width=".5"/>' +
      '<g data-part="rug" data-pivot="0 -4"><rect x="-14" y="-18" width="28" height="14" fill="#c0503e"/><path d="M-14-11h28" fill="none" stroke="#f2c14e" stroke-width="2"/>' +
      '<path d="M-6-16l4 3-4 3M6-16l-4 3 4 3" fill="none" stroke="#3fb0a8" stroke-width="1.2"/></g>'),
    "w-weaver": person({ kind: "woman", key: "w-weaver", adult: true, hair: "#1f1712", style: "long", shirt: "#3fb0a8", skirt: "#e46b8a", long: true, legs: "#e46b8a", skin: "#e9bb92", sit: true }),
    "w-armand": person({ hair: "#2f2219", shirt: "#c0503e", pants: "#3d3a3a", skin: "#e9bb92" }),
    "w-nomad-dad": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5a5f7a", pants: "#3d3a3a", skin: "#e9bb92",
      hat: '<path d="M-5.4 1.4c0-4.4 2.4-6.4 5.4-6.4s5.4 2 5.4 6.4z" fill="#a0785a"/>' }),
    // a little blackboard on legs for a tent school (origin: its bottom middle)
    "w-board": g('<path d="M-10 0l2-12M10 0l-2-12" fill="none" stroke="#8a5a3a" stroke-width="1.2"/><rect x="-11" y="-26" width="22" height="15" rx="1" fill="#3f5a4a"/><path d="M-7-21h8M-7-17h12" fill="none" stroke="#fff" stroke-width=".7"/>'),

    /* homes of Iran (sprout-14) */
    // a wooden house in Gilan with a steep roof, on a low brick base (origin: its bottom middle); rain runs down the roof
    "w-gilan-house": g('<rect x="-20" y="-6" width="40" height="6" fill="#c0503e"/><rect x="-17" y="-26" width="34" height="20" fill="#d9a066"/>' +
      '<path d="M-17-20h34" fill="none" stroke="#a0683f" stroke-width=".6"/><rect x="-20" y="-30" width="40" height="4" fill="#a0683f"/><path d="M-26-26L0-46l26 20z" fill="#7a8a9a"/>' +
      '<rect x="-4" y="-18" width="8" height="12" fill="#8a5a3a"/><rect x="-14" y="-18" width="6" height="6" fill="#bfe3f5"/><rect x="8" y="-18" width="6" height="6" fill="#bfe3f5"/>'),
    // Kandovan: houses dug into cones of rock (origin: its bottom middle)
    "w-kandovan": g('<path d="M-30 0c2-14 6-30 10-34 4 4 8 20 10 34z" fill="#c9a98a"/><path d="M-8 0c2-20 6-38 12-42 6 4 10 22 12 42z" fill="#d6b896"/><path d="M14 0c2-12 5-24 9-27 4 3 7 15 9 27z" fill="#c9a98a"/>' +
      '<path d="M-23 0v-7a3 3 0 0 1 6 0v7zM1 0v-9a3.4 3.4 0 0 1 7 0v9z" fill="#8a5a3a"/><g fill="#bfe3f5"><rect x="-22" y="-20" width="4" height="4" rx="1"/><rect x="2" y="-24" width="4" height="4" rx="1"/><rect x="-2" y="-34" width="3.4" height="3.4" rx="1"/><rect x="20" y="-14" width="4" height="4" rx="1"/></g>'),
    // stone stairs-and-roofs village seen up close is "w-village"; a sky with rain clouds for Gilan (stage units)
    "w-rain-sky": g('<rect width="160" height="90" fill="#c9d6de" stroke="none"/><path d="M-10 60c40-6 80-6 180 0v40H-10z" fill="#6db35a"/><circle cx="20" cy="50" r="10" fill="#4f8f45"/><circle cx="140" cy="48" r="12" fill="#4f8f45"/>' +
      '<g fill="#e8eef2"><ellipse cx="40" cy="14" rx="18" ry="7"/><ellipse cx="110" cy="12" rx="22" ry="8"/></g>'),

    /* school (sprout-15): a corridor from the side, wider than the stage (stage units, x −20 to 620), with doors at
       x 520 (the gate), 420 (office), 320 (classroom), 220 (library), 120 (health room); the yard is beyond, x 0–60 */
    "w-corridor": g('<rect x="-20" width="640" height="62" fill="#eef1e4" stroke="none"/><rect x="-20" y="62" width="640" height="28" fill="#d8cdb6" stroke="none"/><path d="M-20 62h640" fill="none"/>' +
      '<rect x="-20" y="52" width="640" height="10" fill="#cfd8b4" stroke="none"/>' +
      [520, 420, 320, 220, 120].map(function (x) { return '<rect x="' + (x - 22) + '" y="14" width="44" height="48" rx="1.4" fill="#f9f7f0"/><rect x="' + (x - 24) + '" y="12" width="48" height="3" fill="#a0683f"/>'; }).join("") +
      '<rect x="-20" width="80" height="62" fill="#cdeaf7" stroke="none"/><rect x="-20" y="50" width="80" height="40" fill="#a8d695" stroke="none"/><path d="M60 0v90" fill="none"/>'),
    "w-desk2": g('<rect x="-12" y="-11" width="24" height="2.4" fill="#c98a4b"/><path d="M-10-9v9M10-9v9" fill="none" stroke="#a0683f" stroke-width="1.4"/><rect x="-4" y="-15" width="8" height="4" fill="#cfd8dc"/>'),
    "w-blackboard": g('<rect x="-16" y="-12" width="32" height="18" rx="1" fill="#3f5a4a"/><path d="M-12-6h10M-12-2h16M-12 2h8" fill="none" stroke="#fff" stroke-width=".7"/>'),
    "w-shelves": g('<rect x="-14" y="-30" width="28" height="30" fill="#a0683f"/>' + [-26, -18, -10].map(function (y, i) {
      return '<rect x="-12" y="' + y + '" width="24" height="7" fill="#f4efe6"/>' + [0, 1, 2, 3, 4].map(function (k) { return '<rect x="' + (-11 + k * 4.6) + '" y="' + (y + 1) + '" width="3.6" height="6" fill="' + ["#e46b6b", "#5b9bd5", "#f2c14e", "#5aa36a", "#8a6cc4"][(k + i) % 5] + '"/>'; }).join(""); }).join("")),
    "w-bed2": g('<rect x="-14" y="-8" width="28" height="4" fill="#fff"/><path d="M-12-4v4M12-4v4" fill="none" stroke-width="1.2"/><rect x="-14" y="-10" width="6" height="2.4" rx="1" fill="#fff"/>'),
    "w-darya": person({ kind: "girl", key: "w-darya", hair: "#4a2f1f", style: "pony", shirt: "#5b9bd5", pants: "#3d3a3a", backpack: "#e46b8a" }),
    "w-darya-mom": person({ kind: "woman", key: "w-darya-mom", adult: true, hair: "#2f2219", style: "long", shirt: "#8a6cc4", pants: "#4b5a78" }),

    /* address (sprout-16) */
    // an envelope with lines of an address (origin: its middle)
    "w-envelope": g('<rect x="-16" y="-10" width="32" height="20" rx="1" fill="#fffaf0"/><path d="M-16-10l16 11 16-11" fill="none" stroke-width=".6"/>' +
      '<path d="M-6 2h16M-6 5h12M-6 8h14" fill="none" stroke="#5b9bd5" stroke-width=".8"/><rect x="8" y="-8" width="6" height="7" fill="#e46b6b"/>'),
    // a street sign and a house number plate (origin: their middle); the words go on them as text parts
    "w-sign": g('<rect x="-14" y="-5" width="28" height="10" rx="1.4" fill="#2f6f9a"/><rect x="-13" y="-4" width="26" height="8" rx="1" fill="none" stroke="#fff" stroke-width=".5"/>'),
    "w-sign-pole": g('<path d="M0 0v-30" fill="none" stroke="#5a5f7a" stroke-width="1.4"/>'),
    "w-plate": g('<rect x="-6" y="-4" width="12" height="8" rx="1" fill="#2f6f9a"/><rect x="-5" y="-3" width="10" height="6" rx=".6" fill="none" stroke="#fff" stroke-width=".4"/>'),
    "w-hasti": person({ kind: "girl", key: "w-hasti", hair: "#6b3f26", style: "long", shirt: "#e46b6b", skirt: "#3fb0a8", legs: "#fff" }),
    "w-postman": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#2f6f9a", pants: "#3d3a3a",
      hat: '<path d="M-5.4 1.4c0-3.6 2.4-5.4 5.4-5.4s5.4 1.8 5.4 5.4z" fill="#2f6f9a"/><path d="M-6 1.2h12" fill="none" stroke-width="1.2"/>',
      holdL: '<g transform="translate(3 -2)"><rect x="-5" y="-3" width="10" height="7" rx=".6" fill="#fffaf0"/><path d="M-5-3l5 4 5-4" fill="none" stroke-width=".4"/></g>' })
  });
})();

/* ---------------- Sprout: instruments, rules, working together, helping (sprout-36, sprout-19 to sprout-22) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  // instruments held in the hands (the hand at 0 0, in the person's units)
  var TAR = '<g transform="rotate(-60)"><rect x="-.5" y="-16" width="1" height="12" fill="#5a3a26"/><path d="M0-4c-3 0-3.4 2-2 3.4-1.6 1.4-1 4 2 4s3.6-2.6 2-4c1.4-1.4 1-3.4-2-3.4z" fill="#a0683f"/></g>';
  var KAMANCHEH = '<g transform="translate(0 6)"><rect x="-.4" y="-14" width=".8" height="10" fill="#5a3a26"/><circle cy="-3" r="3" fill="#a0683f"/><path d="M0 0v4" fill="none" stroke-width=".6"/></g>';
  var BOW = '<path d="M0 0L-9 2" fill="none" stroke="#5a3a26" stroke-width=".6"/>';
  var NEY = '<g transform="rotate(180)"><rect x="-.5" y="-1" width="1" height="15" rx=".5" fill="#d9b77e"/></g>';
  var DOHOL = '<g transform="translate(4 2)"><rect x="-5" y="-4" width="10" height="8" rx="1" fill="#c0503e"/><ellipse cx="-5" rx="1.2" ry="4" fill="#f4e1c1"/><ellipse cx="5" rx="1.2" ry="4" fill="#f4e1c1"/></g>';
  var STICK = '<path d="M0 0L5-5" fill="none" stroke="#8a5a3a" stroke-width=".7"/>';
  var SORNA = '<g transform="rotate(160)"><path d="M-.5 0v10l-1.6 3h4.2l-1.6-3V0z" fill="#a0683f"/></g>';
  var HANKY = '<path d="M0 0l3-4 2 3z" fill="#e5483f"/>';
  W.add({
    "w-tar-player": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5b9bd5", pants: "#3d3a3a", sit: true, holdL: TAR }),
    "w-ney-player": person({ adult: true, style: "bald", beard: "#e8e4de", shirt: "#7a8a5a", pants: "#3d3a3a", sit: true, holdR: NEY }),
    "w-kamancheh-player": person({ kind: "woman", key: "w-kamancheh-player", adult: true, hair: "#1f1712", style: "long", shirt: "#a8323a", skirt: "#5a5f7a", long: true, legs: "#5a5f7a", sit: true, holdL: KAMANCHEH, holdR: BOW }),
    "w-dohol-player": person({ adult: true, hair: "#1f1712", mustache: "#1f1712", shirt: "#f4efe6", pants: "#3d3a3a", holdL: DOHOL, holdR: STICK }),
    "w-sorna-player": person({ adult: true, hair: "#1f1712", mustache: "#1f1712", shirt: "#5a5f7a", pants: "#3d3a3a", holdR: SORNA }),
    "w-dancer": person({ kind: "girl", key: "w-dancer", hair: "#1f1712", style: "long", shirt: "#f2c14e", skirt: "#5aa36a", long: true, legs: "#5aa36a", holdR: HANKY }),
    "w-dancer2": person({ hair: "#2f2219", shirt: "#e46b6b", pants: "#3d3a3a", holdR: HANKY }),

    /* sprout-20: an apple orchard harvest */
    // an apple tree (origin: its foot); the apples a1–a6 are pieces that can fall
    "w-apple-tree": g('<rect x="-2" y="-26" width="4" height="26" fill="#8a5a3a"/><circle cy="-36" r="16" fill="#5a9a45"/><circle cx="-9" cy="-30" r="9" fill="#6db35a"/><circle cx="10" cy="-31" r="9" fill="#6db35a"/>' +
      [[-8, -40], [6, -44], [-12, -30], [12, -32], [0, -30], [-2, -46]].map(function (p, i) {
        return '<g data-part="a' + (i + 1) + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="2" fill="#e5483f"/></g>'; }).join("")),
    "w-ladder": g('<path d="M-4 0l2-30M4 0l2-30" fill="none" stroke="#a0683f" stroke-width="1.2"/><path d="M-3.4-6h7.2M-2.8-12h7.2M-2.2-18h7.2M-1.6-24h7.2" fill="none" stroke="#a0683f" stroke-width=".9"/>'),
    "w-crate": g('<rect x="-7" y="-7" width="14" height="7" fill="#c98a4b"/><path d="M-7-3.5h14" fill="none" stroke="#a0683f" stroke-width=".5"/>' +
      '<g data-part="fill" style="opacity:0"><circle cx="-4" cy="-8" r="2" fill="#e5483f"/><circle cx="0" cy="-8.4" r="2" fill="#e5483f"/><circle cx="4" cy="-8" r="2" fill="#e5483f"/></g>'),
    "w-jug": g('<path d="M-3 0c-1-3-1-6 0-8h6c1 2 1 5 0 8z" fill="#c0503e"/><path d="M-2-8v-2h4v2" fill="#c0503e"/>'),
    "w-farmer-grandpa": person({ adult: true, style: "bald", mustache: "#e8e4de", shirt: "#c98a4b", pants: "#5a5f7a", hat: '<path d="M-5.4 1.4c0-3.6 2.4-5.4 5.4-5.4s5.4 1.8 5.4 5.4z" fill="#7a8a5a"/>' }),
    "w-girl-jug": person({ kind: "girl", key: "w-girl-jug", hair: "#4a2f1f", style: "pony", shirt: "#e46b8a", skirt: "#3fb0a8", legs: "#fff", holdR: '<g transform="translate(0 8)"><path d="M-3 0c-1-3-1-6 0-8h6c1 2 1 5 0 8z" fill="#c0503e"/></g>' }),

    /* sprout-21: helping the neighbourhood */
    "w-sweeper": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#f59e0b", pants: "#f59e0b", skin: "#c98f63",
      holdR: '<g transform="rotate(-20)"><path d="M0 0v12" fill="none" stroke="#a0683f" stroke-width="1"/><path d="M-3 12h6l1 5h-8z" fill="#e7c27a"/></g>' }),
    "w-neighbour": person({ kind: "grandma", key: "w-neighbour", adult: true, hair: "#e8e4de", style: "bun", shirt: "#8a6cc4", skirt: "#5a5f7a", long: true, legs: "#5a5f7a",
      holdL: '<g transform="translate(0 5)"><path d="M-3-4h6l1 6h-8z" fill="#fff"/><path d="M-2-4c0-2 4-2 4 0" fill="none" stroke-width=".5"/></g>' }),
    "w-bag-carry": g('<path d="M-3-4h6l1 6h-8z" fill="#fff"/><path d="M-2-4c0-2 4-2 4 0" fill="none" stroke-width=".5"/>'),
    "w-mahsa": person({ kind: "girl", key: "w-mahsa", hair: "#2f2219", style: "long", shirt: "#3fb0a8", pants: "#4b5a78" }),
    "w-sapling": g('<rect x="-1" y="-20" width="2" height="20" fill="#8a5a3a"/><g data-part="leaves" data-pivot="0 -20"><circle cy="-24" r="7" fill="#6db35a"/><circle cx="-5" cy="-21" r="4" fill="#5a9a45"/><circle cx="5" cy="-21" r="4" fill="#5a9a45"/></g>' +
      '<ellipse cy="0" rx="6" ry="1.4" fill="#8a5a3a"/>'),
    "w-leaves-pile": g('<path d="M-6 0c1-3 4-4 6-3 2-2 5-1 6 3z" fill="#e0a76a"/><path d="M-3-2l2-1M2-2l2-1" fill="none" stroke-width=".4"/>'),

    /* sprout-19: rules */
    "w-rules-paper": g('<rect x="-10" y="-13" width="20" height="26" rx="1" fill="#fff"/><g fill="none" stroke="#5b9bd5" stroke-width=".9"><path d="M-6-7h12M-6-2h12M-6 3h9M-6 8h11"/></g><g fill="#5aa36a" stroke="none"><circle cx="-8" cy="-7" r=".9"/><circle cx="-8" cy="-2" r=".9"/><circle cx="-8" cy="3" r=".9"/><circle cx="-8" cy="8" r=".9"/></g>')
  });
})();

/* ---------------- Sprout: the globe, hot and cold places (sprout-17, sprout-18) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  W.add({
    // a globe's stand: an arc and a foot, drawn behind "w-globe" (same origin: the globe's middle, radius 20)
    "w-globe-stand": g('<path d="M-6 21a22 22 0 0 0 26-26" fill="none" stroke="#a0683f" stroke-width="1.6"/><path d="M0 22v8M-10 32h20" fill="none" stroke="#a0683f" stroke-width="2.4"/>'),
    // the equator over the globe (origin: the globe's middle): a red line, and the poles' white caps
    "w-equator": '<path d="M-20 0H20" fill="none" stroke="#e5483f" stroke-width="1.2" stroke-dasharray="2 1.2"/>',
    "w-poles": g('<path d="M-11-16.4a20 20 0 0 1 22 0c-6 2-16 2-22 0z" fill="#fff"/><path d="M-11 16.4a20 20 0 0 0 22 0c-6-2-16-2-22 0z" fill="#fff"/>'),
    "w-sohrab": person({ hair: "#2f2219", shirt: "#5aa36a", pants: "#4b5a78", skin: "#e9bb92" }),
    // an ice field with the sea (stage units)
    "w-ice": g('<rect width="160" height="90" fill="#dcecf7" stroke="none"/><rect y="46" width="160" height="14" fill="#5ab0e0" stroke="none"/><path d="M-10 58c40-6 80-4 180 0v40H-10z" fill="#fff"/><path d="M-10 58c40-6 80-4 180 0" fill="none" stroke="#a9c8dc"/>' +
      '<path d="M30 46l8-10 6 10zM112 46l10-14 8 14z" fill="#fff"/>'),
    // a rainforest near the equator (stage units)
    "w-forest-hot": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="56" width="160" height="34" fill="#6db35a" stroke="none"/>' +
      [10, 36, 64, 96, 124, 150].map(function (x, i) { return '<rect x="' + (x - 2) + '" y="' + (20 + i % 2 * 6) + '" width="4" height="40" fill="#8a5a3a"/><circle cx="' + x + '" cy="' + (20 + i % 2 * 6) + '" r="12" fill="#3f8a3a"/><circle cx="' + (x + 6) + '" cy="' + (26 + i % 2 * 6) + '" r="8" fill="#5a9a45"/>'; }).join("")),
    "w-kid-hot": person({ kind: "girl", key: "w-kid-hot", hair: "#1f1712", style: "curly", shirt: "#f2c14e", skirt: "#3fb0a8", legs: "#6a432b", skin: "#6a432b", sleeve: "short" }),
    "w-kid-cold": person({ hair: "#1f1712", shirt: "#c0503e", pants: "#5a4a3a", skin: "#d9a47a", coat: "#c0503e",
      hat: '<path d="M-6.4 2.6c0-5.6 3-8 6.4-8s6.4 2.4 6.4 8" fill="#f4efe6"/>', front: '<path d="M-5.6 1.4h11.2l.6 11H-6.2z" fill="#c0503e"/><path d="M0 1.6v10.6" fill="none" stroke-width=".4"/>' })
  });
})();

/* ---------------- Sprout: needs, money, farm to table, saving, recycling (sprout-23 to sprout-28) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  function wheel(name, x, y, r) {
    return '<g data-part="' + name + '" data-pivot="' + x + " " + y + '"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#3d3a3a"/><circle cx="' + x + '" cy="' + y + '" r="' + f(r * 0.45) + '" fill="#cfd8dc"/>' +
      '<path d="M' + f(x - r * 0.45) + " " + y + "h" + f(r * 0.9) + '" fill="none" stroke-width=".4"/></g>';
  }
  W.add({
    "w-avin": person({ kind: "girl", key: "w-avin", hair: "#4a2f1f", style: "pony", shirt: "#8a6cc4", pants: "#4b5a78" }),
    "w-sara-m": person({ kind: "girl", key: "w-sara-m", hair: "#2f2219", style: "long", shirt: "#e46b6b", skirt: "#5b9bd5", legs: "#fff" }),
    "w-kian2": person({ hair: "#2f2219", shirt: "#f2c14e", pants: "#4b5a78", skin: "#e9bb92" }),
    // a price tag (origin: its middle); the price goes on it as a text part
    "w-tag": g('<path d="M-8-4h13l3 4-3 4H-8z" fill="#fff"/><circle cx="4.4" cy="0" r=".7" fill="#3d2c22" stroke="none"/>'),
    // a shop shelf with a pencil and a ball (pieces "pencil" and "ball"; origin: its bottom middle)
    "w-stall": g('<rect x="-30" y="-24" width="60" height="24" fill="#c98a4b"/><rect x="-32" y="-26" width="64" height="3" fill="#e0a76a"/>'),
    // a wheat patch: the stalks grow and turn gold (pieces "green" and "gold"; origin: its bottom middle)
    "w-wheat-patch": g('<rect x="-26" y="-2" width="52" height="4" fill="#8a5a3a"/>' +
      '<g data-part="green" data-pivot="0 0">' + [-22, -16, -10, -4, 2, 8, 14, 20].map(function (x) { return '<path d="M' + x + ' 0v-14" fill="none" stroke="#5a9a45" stroke-width="1"/><ellipse cx="' + x + '" cy="-15" rx="1.2" ry="2.6" fill="#7fb86a"/>'; }).join("") + "</g>" +
      '<g data-part="gold" data-pivot="0 0" style="opacity:0">' + [-22, -16, -10, -4, 2, 8, 14, 20].map(function (x) { return '<path d="M' + x + ' 0v-16" fill="none" stroke="#c9a03a" stroke-width="1"/><ellipse cx="' + x + '" cy="-17" rx="1.4" ry="3" fill="#e7c27a"/>'; }).join("") + "</g>"),
    // a flour mill (origin: its bottom middle) with sacks of flour (piece "sacks")
    "w-mill": g('<rect x="-20" y="-34" width="28" height="34" fill="#e8e4de"/><path d="M-22-34l16-10 16 10z" fill="#c0503e"/><rect x="10" y="-44" width="10" height="44" rx="4" fill="#cfd8dc"/>' +
      '<rect x="-12" y="-14" width="10" height="14" fill="#8a5a3a"/><rect x="-16" y="-28" width="6" height="6" fill="#bfe3f5"/>' +
      '<g data-part="sacks" style="opacity:0"><path d="M24 0c-2-6 0-9 4-9s6 3 4 9z" fill="#f4efe6"/><path d="M32 0c-2-6 0-9 4-9s6 3 4 9z" fill="#f4efe6"/></g>'),
    // a dairy (origin: its bottom middle)
    "w-dairy": g('<rect x="-22" y="-30" width="44" height="30" fill="#fbfbf8"/><path d="M-24-30h48v-4h-48z" fill="#5b9bd5"/><rect x="-6" y="-16" width="12" height="16" fill="#5b9bd5"/>' +
      '<g transform="translate(-14 -20)"><path d="M-3 4v-6l2-3h2l2 3v6z" fill="#fff"/><rect x="-3" y="-1" width="6" height="2" fill="#5b9bd5" stroke="none"/></g><rect x="10" y="-24" width="8" height="6" fill="#bfe3f5"/>'),
    // a lorry going left (origin: the middle of its bottom); the load is the piece "load"
    "w-truck": function () {
      return g('<rect x="-6" y="-18" width="34" height="14" fill="#5b9bd5"/><path d="M-6-4h-14v-8l4-6h10z" fill="#e5483f"/><path d="M-17-12l3-4h6v4z" fill="#bfe3f5"/>' +
        '<g data-part="load" style="opacity:0"><path d="M0-18c-2-5 0-7 3-7s5 2 3 7zM9-18c-2-5 0-7 3-7s5 2 3 7zM18-18c-2-5 0-7 3-7s5 2 3 7z" fill="#f4efe6"/></g>' +
        wheel("w1", -12, -3, 3.2) + wheel("w2", 20, -3, 3.2));
    },
    "w-milk-load": g('<g fill="#fff"><rect x="-4" y="-7" width="3" height="7"/><rect x="0" y="-7" width="3" height="7"/><rect x="4" y="-7" width="3" height="7"/></g>'),
    // a grocer's, small (origin: its bottom middle)
    "w-shop-small": g('<rect x="-18" y="-26" width="36" height="26" fill="#f2d2a9"/><path d="M-20-26h40l-3-6h-34z" fill="#3fb0a8"/><rect x="-14" y="-20" width="12" height="10" fill="#bfe3f5"/><rect x="2" y="-18" width="10" height="18" fill="#8a5a3a"/>'),
    // a sink with a tap: the water running from it is the piece "water" (origin: its bottom middle)
    "w-sink": g('<rect x="-12" y="-28" width="24" height="28" fill="#e8e4de"/><path d="M-14-30h28l-2 6h-24z" fill="#fff"/><path d="M0-30v-8h6v2" fill="none" stroke="#a9b6bf" stroke-width="1.6"/>' +
      '<g data-part="knob" data-pivot="0 -38"><rect x="-2" y="-40" width="4" height="2" fill="#5b9bd5"/></g><g data-part="water"><path d="M6-35v9" fill="none" stroke="#7cc6e8" stroke-width="1.4"/></g>'),
    "w-brush": g('<rect x="-.6" y="-8" width="1.2" height="8" fill="#e5483f"/><rect x="-1" y="-10" width="2" height="2.4" fill="#fff"/>'),
    "w-bread-bag": g('<path d="M-7 0l-1-10h16l-1 10z" fill="#e8f3f5" opacity=".9"/><path d="M-6-10c0-2 12-2 12 0" fill="none" stroke-width=".5"/>'),
    // recycling bins (origin: their bottom middle)
    "w-bin-paper": g('<path d="M-6 0l-1-12h14l-1 12z" fill="#5b9bd5"/><rect x="-8" y="-14" width="16" height="3" rx="1" fill="#3f6f9a"/><rect x="-3" y="-9" width="6" height="5" fill="#fff"/>'),
    "w-bin-plastic": g('<path d="M-6 0l-1-12h14l-1 12z" fill="#f2c14e"/><rect x="-8" y="-14" width="16" height="3" rx="1" fill="#c9a03a"/><rect x="-1.4" y="-10" width="2.8" height="6" rx=".8" fill="#fff"/>'),
    "w-bin-glass": g('<path d="M-6 0l-1-12h14l-1 12z" fill="#5aa36a"/><rect x="-8" y="-14" width="16" height="3" rx="1" fill="#3f7a35"/><path d="M-1-10h2v2l1 1v4h-4v-4l1-1z" fill="#fff"/>'),
    "w-bin-food": g('<path d="M-6 0l-1-12h14l-1 12z" fill="#a0683f"/><rect x="-8" y="-14" width="16" height="3" rx="1" fill="#8a5a3a"/><circle cx="0" cy="-6" r="2.2" fill="#e5483f"/>'),
    "w-jar": g('<path d="M-3 0v-6l1-1v-2h4v2l1 1v6z" fill="#bfe3f5" opacity=".9"/>'),
    "w-apple-core": g('<path d="M-1.6 0c-1-2-1-4 0-6h3.2c1 2 1 4 0 6z" fill="#f4e1c1"/><ellipse cy="-6" rx="2.4" ry="1" fill="#e5483f"/><ellipse cy="0" rx="2.4" ry="1" fill="#e5483f"/>'),
    "w-compost": g('<ellipse cy="-1" rx="14" ry="3" fill="#6b4a2a"/><path d="M-10-2l2-2M4-3l2-1M-2-2l1-2" fill="none" stroke="#8a6a3a" stroke-width=".6"/>'),
    // a cardboard box toy car (origin: its bottom middle)
    "w-box-car": g('<rect x="-12" y="-12" width="24" height="9" fill="#d9a066"/><rect x="-6" y="-17" width="10" height="5" fill="#e7b57e"/><circle cx="-7" cy="-3" r="3" fill="#e5483f"/><circle cx="7" cy="-3" r="3" fill="#5b9bd5"/>')
  });
})();

/* ---------------- Sprout: travel and messages then and now, people who made the world better (sprout-29 to sprout-33) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  var ROBE = function (c) { return '<path d="M-5.6 1.4h11.2l1.2 22H-6.8z" fill="' + c + '"/><path d="M0 1.6v21" fill="none" stroke-width=".35"/>'; };
  var TURBAN = '<path d="M-6 1.6c-.4-4.4 2.4-6.6 6-6.6s6.4 2.2 6 6.6z" fill="#f4efe6"/><path d="M-5.6 0c3-1.6 8.2-1.6 11.2 0M-5-2.4c3-1.4 7-1.4 10 0" fill="none" stroke-width=".35"/>';
  var BOOK = '<g transform="translate(2 -1)"><rect x="-4" y="-3" width="8" height="6" rx=".4" fill="#a8323a"/><path d="M0-3v6" fill="none" stroke="#f2c14e" stroke-width=".5"/></g>';
  var QUILL = '<path d="M0 0l-4-8c1.6.4 3 2 4 8z" fill="#fff"/>';
  W.add({
    // a caravanserai (origin: its bottom middle; 60 wide): walls with towers and an arched gate
    "w-caravanserai": g('<rect x="-30" y="-24" width="60" height="24" fill="#d9b77e"/><rect x="-34" y="-30" width="10" height="30" fill="#d0ab70"/><rect x="24" y="-30" width="10" height="30" fill="#d0ab70"/>' +
      '<path d="M-8 0v-14a8 8 0 0 1 16 0v14z" fill="#8a5a3a"/><rect x="-12" y="-28" width="24" height="6" fill="#d0ab70"/><path d="M-26-16h10M16-16h10" fill="none" stroke="#a0683f" stroke-width=".6"/>'),
    // railway tracks along the ground (stage units, x −100 to 700, at y 84)
    "w-rails": g('<path d="M-100 82H700M-100 86H700" fill="none" stroke="#5a5f7a" stroke-width=".8"/>' + (function () { var s = ""; for (var x = -100; x < 700; x += 6) s += '<rect x="' + x + '" y="81" width="2" height="6" fill="#a0683f" stroke="none"/>'; return s; })()),
    // a chapar station (origin: its bottom middle) and a mailbox (origin: its foot)
    "w-chapar-house": g('<rect x="-22" y="-20" width="44" height="20" fill="#d9b77e"/><path d="M-6 0v-10a6 6 0 0 1 12 0v10z" fill="#8a5a3a"/><rect x="-24" y="-22" width="48" height="3" fill="#c49a5e"/>'),
    "w-mailbox": g('<rect x="-1" y="-10" width="2" height="10" fill="#5a5f7a"/><rect x="-6" y="-24" width="12" height="14" rx="5" fill="#f2c14e"/><rect x="-4" y="-20" width="8" height="1.6" fill="#3d2c22" stroke="none"/>'),
    "w-gran-phone": person({ kind: "grandma", key: "w-gran-phone", adult: true, hair: "#e8e4de", style: "bun", shirt: "#3fb0a8", skirt: "#5a5f7a", long: true, legs: "#5a5f7a",
      holdR: '<rect x="-1.4" y="-3" width="2.8" height="5" rx=".6" fill="#3d3a3a"/>' }),
    "w-kid-phone": person({ kind: "girl", key: "w-kid-phone", hair: "#4a2f1f", style: "pony", shirt: "#e46b8a", pants: "#4b5a78", holdR: '<rect x="-1.4" y="-3" width="2.8" height="5" rx=".6" fill="#3d3a3a"/>' }),
    // people from long ago (front view): a physician with a book, a poet with a quill, a woman poet with a book
    "w-ibnsina": person({ adult: true, hair: "#2f2219", beard: "#4a2f1f", shirt: "#5b9bd5", pants: "#5b9bd5", front: ROBE("#5b9bd5"), hat: TURBAN, holdL: BOOK }),
    "w-ferdowsi": person({ adult: true, style: "bald", beard: "#e8e4de", shirt: "#7a5a8a", pants: "#7a5a8a", front: ROBE("#7a5a8a"), hat: TURBAN, holdR: QUILL }),
    "w-parvin": person({ kind: "woman", key: "w-parvin", adult: true, hair: "#2f2219", style: "bun", shirt: "#3d3a3a", skirt: "#3d3a3a", long: true, legs: "#3d3a3a", holdL: BOOK }),
    // a big open book with a picture of the Simorgh, a great bird of the old stories (origin: its bottom middle)
    "w-simorgh-book": g('<path d="M-22 0l-1-20c7-2 15-1 23 1 8-2 16-3 23-1L22 0C15-1 8-.6 0 1-8-.6-15-1-22 0z" fill="#f4efe6"/><path d="M0 1v-20" fill="none" stroke-width=".5"/>' +
      '<g transform="translate(-11 -10)"><path d="M-6 2c2-6 6-8 10-6 2-3 5-3 6 0-3 0-4 2-4 4 3 0 5 2 6 5-4-1-8-1-12 1z" fill="#3fb0a8"/><path d="M4-4l3 1-3 1" fill="#f59e0b"/><path d="M-6 2c-3 1-5 4-5 6 3-2 5-3 7-3" fill="#e5483f"/></g>' +
      '<path d="M4-14h12M4-10h12M4-6h10" fill="none" stroke="#5b9bd5" stroke-width=".8"/>'),
    // the running machine: an early wooden bicycle with no pedals (origin: between its wheels on the ground)
    "w-draisine": g('<circle cx="-11" cy="-6" r="6" fill="none" stroke="#5a3a26" stroke-width="1.2"/><circle cx="11" cy="-6" r="6" fill="none" stroke="#5a3a26" stroke-width="1.2"/>' +
      '<path d="M-11-6L-6-13H8l3 7M8-13l1-4h4" fill="none" stroke="#a0683f" stroke-width="1.6"/><rect x="-4" y="-15" width="8" height="2" rx=".8" fill="#5a3a26"/>'),
    // a desk with a lamp for writing (origin: its bottom middle)
    "w-writing-desk": g('<rect x="-14" y="-4" width="28" height="4" fill="#a0683f"/><rect x="-10" y="-6" width="12" height="2" fill="#fff"/><path d="M8-4v-6l3-2" fill="none" stroke="#5a5f7a" stroke-width=".8"/><circle cx="11" cy="-12" r="1.4" fill="#fcd34d"/>')
  });
})();

/* ---------------- Sprout: a day with children around the world (sprout-33) ---------------- */
(function () {
  var W = B.worldArt, person = W.person;
  var YELLOW_HAT = '<path d="M-6 1.6c0-4.6 2.6-6.6 6-6.6s6 2 6 6.6z" fill="#f2c14e"/><rect x="-7" y=".8" width="14" height="1.6" rx=".6" fill="#f2c14e"/>';
  var P = {
    "w-yuki": { kind: "girl", key: "w-yuki", hair: "#1f1712", style: "long", shirt: "#e46b8a", skirt: "#4b5a78", legs: "#fff", skin: "#f7d7bb" },
    "w-nour": { kind: "girl", key: "w-nour", hair: "#1f1712", style: "curly", shirt: "#3fb0a8", pants: "#5a5f7a", skin: "#c98f63" },
    "w-mateo": { hair: "#2f2219", shirt: "#e5483f", pants: "#4b5a78", skin: "#c98f63" },
    "w-raju": { hair: "#1f1712", shirt: "#f4efe6", pants: "#5aa36a", skin: "#9a6442" },
    "w-armin": { hair: "#2f2219", shirt: "#5b9bd5", pants: "#3d3a3a", skin: "#e9bb92" }
  };
  var add = {};
  Object.keys(P).forEach(function (k) {
    add[k] = person(P[k]);
    add[k + "-sit"] = person(Object.assign({}, P[k], { sit: true }));
    add[k + "-bag"] = person(Object.assign({}, P[k], { backpack: "#f59e0b" }, k === "w-yuki" ? { hat: YELLOW_HAT } : {}));
  });
  W.add(add);
})();

/* ---------------- Sapling: directions, grids, scale, natural and human features (sapling-10 to sapling-14) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  // an arrow drawn between two points of the stage (for "from Tehran to Tabriz" on "w-map-big" at [80, 46])
  function arrow(x1, y1, x2, y2, col) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(a) * 1.2, hy = y2 - Math.sin(a) * 1.2;
    var l = function (d) { return f(hx - Math.cos(a + d) * 3) + " " + f(hy - Math.sin(a + d) * 3); };
    return '<path d="M' + x1 + " " + y1 + "L" + f(hx) + " " + f(hy) + '" fill="none" stroke="' + (col || "#e5483f") + '" stroke-width="1"/>' +
      '<path d="M' + f(hx) + " " + f(hy) + "L" + l(0.5) + "L" + l(-0.5) + 'z" fill="' + (col || "#e5483f") + '" stroke="none"/>';
  }
  var TEH = [69.7, 31.1];
  W.add({
    // a compass rose with eight points (origin: its middle; radius 26); the diagonal points are the piece "diag"
    "w-rose8": g('<circle r="26" fill="#fffaf0"/><path d="M0-24L4-4 24 0 4 4 0 24-4 4-24 0-4-4z" fill="#5b9bd5"/><path d="M0-24L4-4H-4zM0 24L4 4H-4z" fill="#e5483f" stroke="none"/>' +
      '<g data-part="diag" style="opacity:0"><path d="M15-15L3-1 1-3zM15 15L1 3 3 1zM-15 15L-3 1-1 3zM-15-15L-1-3-3-1z" fill="#f2c14e"/></g><circle r="2" fill="#fff"/>'),
    "w-dot-teh": function () { return g('<circle cx="' + TEH[0] + '" cy="' + TEH[1] + '" r="1.8" fill="#3d2c22" stroke="#fff" stroke-width=".6"/>'); },
    "w-arr-tabriz": function () { return arrow(TEH[0], TEH[1], 51.7, 19.6); },
    "w-arr-mashhad": function () { return arrow(TEH[0], TEH[1], 99.2, 28); },
    "w-arr-zahedan": function () { return arrow(TEH[0], TEH[1], 106.9, 57.7); },
    "w-arr-ahvaz": function () { return arrow(TEH[0], TEH[1], 58.9, 50.3); },
    // a park seen from above (stage units, x 24–136, y 12–84) and a 4 × 3 grid over it, letters across the top
    "w-park-top": g('<rect x="24" y="12" width="112" height="72" fill="#a8d695"/><path d="M24 50h112M80 12v72" fill="none" stroke="#e8d5b0" stroke-width="5"/>' +
      '<circle cx="94" cy="24" r="8" fill="#5ab0e0"/><circle cx="38" cy="48" r="9" fill="#5a9a45"/><circle cx="35" cy="45" r="4" fill="#6db35a" stroke="none"/>' +
      '<rect x="114" y="66" width="16" height="8" rx="1" fill="#e5483f"/><rect x="58" y="68" width="14" height="4" rx="1" fill="#c98a4b"/>'),
    "w-grid4x3": g('<path d="M24 12h112v72H24zM52 12v72M80 12v72M108 12v72M24 36h112M24 60h112" fill="none" stroke="#3d2c22" stroke-width=".6" stroke-dasharray="2 1.4"/>'),
    "w-col-hi": '<rect x="0" y="12" width="28" height="72" fill="#f59e0b" opacity=".3"/>',
    "w-row-hi": '<rect x="24" y="0" width="112" height="24" fill="#5b9bd5" opacity=".3"/>',
    "w-cell-ring": '<rect x="0" y="0" width="28" height="24" fill="none" stroke="#e5483f" stroke-width="1.4"/>',
    // a sheet of paper with the park drawn small on it, and a scale bar (origin: their middle / left end)
    "w-scale-bar": g('<rect x="0" y="-1.6" width="12" height="3.2" fill="#3d2c22"/><rect x="12" y="-1.6" width="12" height="3.2" fill="#fff"/><rect x="24" y="-1.6" width="12" height="3.2" fill="#3d2c22"/>'),
    "w-ruler-step": g('<rect x="0" y="-1.4" width="12" height="2.8" fill="#f59e0b"/>'),
    // a landscape (stage units): what nature made, with the things people made as pieces (road, farm, town,
    // factory, bridge) that appear one by one
    "w-land": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-4 40L24 14l18 18 16-16 26 24z" fill="#9fb59a"/><path d="M18 20l6-6 4 4z" fill="#fff"/>' +
      '<rect y="40" width="160" height="50" fill="#a8d695" stroke="none"/><path d="M118 40h42v50h-30c4-16 0-34-12-50z" fill="#5ab0e0"/>' +
      '<path d="M40 40c6 10-4 20 4 30s16 12 20 20" fill="none" stroke="#5ab0e0" stroke-width="5"/>' +
      '<g fill="#3f8a3a"><circle cx="14" cy="56" r="6"/><circle cx="24" cy="62" r="6"/><circle cx="8" cy="66" r="6"/></g>' +
      '<g data-part="road" style="opacity:0"><path d="M0 80C40 74 80 72 116 52" fill="none" stroke="#7a7a7a" stroke-width="4"/><path d="M0 80C40 74 80 72 116 52" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="2 2"/></g>' +
      '<g data-part="bridge" style="opacity:0"><rect x="50" y="72" width="16" height="4" fill="#a0683f"/></g>' +
      '<g data-part="farm" style="opacity:0"><rect x="70" y="44" width="30" height="16" fill="#e7c27a"/><path d="M70 48h30M70 52h30M70 56h30" fill="none" stroke="#c9a03a" stroke-width=".6"/></g>' +
      '<g data-part="town" style="opacity:0"><rect x="96" y="62" width="8" height="10" fill="#f2d2a9"/><rect x="104" y="58" width="8" height="14" fill="#e9d8bd"/><rect x="112" y="64" width="6" height="8" fill="#f2d2a9"/></g>' +
      '<g data-part="factory" style="opacity:0"><rect x="72" y="22" width="20" height="14" fill="#cfd8dc"/><rect x="86" y="10" width="4" height="12" fill="#a9b6bf"/></g>')
  });
})();

/* ---------------- Sapling: Iran's land, rivers, climates, weather, where towns grow (sapling-1 to sapling-42) ---------------- */
(function () {
  var W = B.worldArt, g = W.g, f = W.f, person = W.person;
  function peaks(x0, x1, base, h, n, fill, snow) {
    var s = "", w = (x1 - x0) / n;
    for (var i = 0; i < n; i++) {
      var x = x0 + i * w, hh = h * (0.7 + ((i * 37) % 10) / 30);
      s += '<path d="M' + f(x - w * 0.3) + " " + base + "L" + f(x + w / 2) + " " + f(base - hh) + "L" + f(x + w * 1.3) + " " + base + 'z" fill="' + fill + '"/>';
      if (snow) s += '<path d="M' + f(x + w / 2 - 3) + " " + f(base - hh + 5) + "L" + f(x + w / 2) + " " + f(base - hh) + "L" + f(x + w / 2 + 3) + " " + f(base - hh + 5) + 'z" fill="#fff"/>';
    }
    return s;
  }
  W.add({
    /* A trip from the Caspian to the Persian Gulf, from the side (stage units, x 0–760): the Caspian coast, the
       Alborz with Damavand, the Tehran plain, the edge of the Kavir, the Zagros and the Gulf coast. */
    "w-iran-profile": g('<rect x="-40" width="840" height="90" fill="#cdeaf7" stroke="none"/><rect x="100" y="64" width="160" height="26" fill="#a8b88a" stroke="none"/><rect x="490" y="64" width="160" height="26" fill="#b5ad84" stroke="none"/>' +
      '<rect x="-40" y="56" width="110" height="34" fill="#5ab0e0" stroke="none"/><path d="M70 56h40v34H70z" fill="#8fc46a"/><g fill="#3f8a3a"><circle cx="82" cy="54" r="6"/><circle cx="96" cy="52" r="7"/></g>' +
      peaks(110, 240, 64, 34, 5, "#9fb59a", true) + '<path d="M184 64L210 8l26 56z" fill="#b9b0a4"/><path d="M203 22l7-14 7 14-4-2-3 3-3-3z" fill="#fff"/>' +
      '<rect x="240" y="60" width="120" height="30" fill="#d9c49a" stroke="none"/><g fill="#e9d8bd"><rect x="270" y="48" width="8" height="12"/><rect x="280" y="44" width="8" height="16"/><rect x="290" y="50" width="6" height="10"/></g>' +
      '<rect x="360" y="60" width="140" height="30" fill="#efe1c2" stroke="none"/><g fill="#fff" opacity=".8"><ellipse cx="410" cy="72" rx="16" ry="3"/><ellipse cx="452" cy="80" rx="20" ry="3"/></g>' +
      peaks(500, 640, 64, 30, 6, "#a8a07a", false) + '<g fill="#5a7a3a"><circle cx="530" cy="62" r="3"/><circle cx="572" cy="62" r="3"/><circle cx="612" cy="62" r="3"/></g>' +
      '<rect x="640" y="60" width="60" height="30" fill="#f0d29a" stroke="none"/><rect x="700" y="58" width="100" height="32" fill="#5ab0e0" stroke="none"/><path d="M640 64h60" fill="none" stroke="#d9b77e"/>' +
      '<path d="M-40 64H800" fill="none" stroke="#7a7a7a" stroke-width="1.6"/>'),
    "w-car-trip": g('<g transform="scale(-1 1)"><path d="M-12-3v-4.4q0-1.4 1.4-1.6l3.6-.4 3-4.2q.8-.9 2-.9h7.2q1.4 0 2.2 1.2l2.4 3.9 2.6.6q1.4.4 1.4 1.8V-3z" fill="#e5483f"/>' +
      '<path d="M-4.6-9.6l2.4-3.4h4.2v3.4zM3.2-13h3.4q.8 0 1.2.7l1.6 2.7H3.2z" fill="#bfe3f5"/></g><circle cx="6.6" cy="-2.6" r="2.6" fill="#3d3a3a"/><circle cx="-7" cy="-2.6" r="2.6" fill="#3d3a3a"/>'),
    // a mountain from the side with height colours (origin: its bottom middle) and the same mountain from above
    "w-mountain-bands": g('<path d="M-50 0L0-60 50 0z" fill="#b9b3a6"/><path d="M-50 0L-36.7-16H36.7L50 0z" fill="#8fc46a"/>' +
      '<g data-part="b1" style="opacity:0"><path d="M-36.7-16L-23.3-32H23.3L36.7-16z" fill="#f2d48a"/></g><g data-part="b2" style="opacity:0"><path d="M-23.3-32L-10-48H10L23.3-32z" fill="#c9a074"/></g>' +
      '<g data-part="b3" style="opacity:0"><path d="M-10-48L0-60 10-48z" fill="#fff"/></g>'),
    "w-mountain-rings": g('<circle r="30" fill="#8fc46a"/><circle r="22" fill="#f2d48a"/><circle r="14" fill="#c9a074"/><circle r="6" fill="#fff"/>'),
    // Iran coloured by height, like the relief map (origin: its middle; same size as "w-map-big")
    // the world map, for scenes (origin: its middle; 400 × 229 map units at 0.36: 144 × 82): each continent is a
    // piece named after its id in js/maps/world.js (asia, europe, …), to pulse or colour
    "w-map-world-big": function () {
      var m = B.MAPS && B.MAPS.world;
      if (!m) return "";
      var col = { asia: "#e7c27a", europe: "#9cc46a", africa: "#e8a06a", "north-america": "#d9a0c8", "south-america": "#9ad0c0", oceania: "#c9b0e6", antarctica: "#f4f7fa" };
      return g('<g transform="scale(.36) translate(-200 -114.5)"><rect width="400" height="229" fill="#a9d6f0" stroke="none"/>' +
        m.continents.map(function (c) { return '<g data-part="' + c.id + '" data-pivot="' + c.at[0] + " " + c.at[1] + '"><path d="' + c.d + '" fill="' + (col[c.id] || "#ddd") + '" stroke="#6b5a44" stroke-width="1"/></g>'; }).join("") + "</g>");
    },
    // over "w-map-world-big" (origin: the equator at the map's middle): the equator line, and a tint for each half
    "w-equator-line": '<path d="M-72 0h144" fill="none" stroke="#e5483f" stroke-width="1.1" stroke-dasharray="3 1.6"/>',
    "w-half-north": '<rect x="-72" y="-40.7" width="144" height="40.7" fill="#f59e0b" opacity=".28"/>',
    "w-half-south": '<rect x="-72" y="0" width="144" height="41.7" fill="#5b9bd5" opacity=".28"/>',
    "w-map-relief": function () {
      var m = B.MAPS && B.MAPS.iran;
      if (!m || !m.relief) return "";
      var col = { mid: "#efe0a6", high: "#d2a66c", peak: "#fbfaf6" };
      return g('<g transform="scale(.24) translate(-200 -168)"><rect width="400" height="336" fill="#a9d6f0"/>' +
        '<g fill="#e3dccb" stroke="#b5ab95" stroke-width="1.2">' + m.abroad.map(function (d) { return '<path d="' + d + '"/>'; }).join("") + "</g>" +
        '<g fill="#b9dc9a" stroke="none">' + m.provinces.map(function (p) { return '<path d="' + p.d + '"/>'; }).join("") + "</g>" +
        m.relief.bands.map(function (b) { return '<path d="' + b.d + '" fill="' + col[b.id] + '" stroke="none"/>'; }).join("") + "</g>");
    },
    "w-eye": g('<path d="M-6 0q6-5 12 0-6 5-12 0z" fill="#fff"/><circle r="2" fill="#3d2c22"/>'),
    // a river from mountains to the sea (stage units): rain and snow on the mountains, the river runs to the sea
    "w-river-course": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' + peaks(0, 60, 50, 34, 3, "#9fb59a", true) +
      '<rect y="48" width="160" height="42" fill="#a8d695" stroke="none"/><rect x="130" y="48" width="30" height="42" fill="#5ab0e0" stroke="none"/>' +
      '<g data-part="river"><path d="M30 44C40 56 60 54 74 62s30 12 56 8" fill="none" stroke="#5ab0e0" stroke-width="4" stroke-linecap="round"/></g>' +
      '<g fill="#e9d8bd"><rect x="88" y="60" width="6" height="8"/><rect x="95" y="58" width="6" height="10"/></g>' +
      '<rect x="60" y="72" width="26" height="10" fill="#e7c27a"/><rect x="104" y="76" width="22" height="9" fill="#9cc46a"/><path d="M62 75h22M62 78h22M106 79h18M106 82h18" fill="none" stroke="#b08a3e" stroke-width="0.8"/>'),
    // weather symbols for a forecast (origin: their middle)
    "w-tv": g('<rect x="-40" y="-26" width="80" height="50" rx="3" fill="#3d3a3a"/><rect x="-36" y="-22" width="72" height="42" fill="#e4f3fb"/><rect x="-6" y="24" width="12" height="4" fill="#5a5f7a"/>'),
    "w-map-iran-small": function () { return g(W.iranMap(0.18, { lines: false })); },
    "w-forecaster": person({ kind: "woman", key: "w-forecaster", adult: true, hair: "#2f2219", style: "long", shirt: "#5b9bd5", pants: "#3d3a3a" }),
    "w-kid-coat": person({ hair: "#2f2219", shirt: "#c0503e", pants: "#4b5a78", coat: "#c0503e", hat: '<path d="M-6.4 2.6c0-5.6 3-8 6.4-8s6.4 2.4 6.4 8" fill="#5b9bd5"/>', front: '<path d="M-5.6 1.4h11.2l.6 11H-6.2z" fill="#c0503e"/>' }),
    "w-kid-tshirt": person({ hair: "#2f2219", shirt: "#f2c14e", pants: "#5b9bd5", sleeve: "short" }),
    // where towns grow (stage units): a plain with a river; a crossroads; a coast with a port
    "w-plain-river": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/>' + peaks(0, 160, 40, 16, 6, "#9fb59a", false) + '<rect y="40" width="160" height="50" fill="#c9de9a" stroke="none"/>' +
      '<path d="M-10 70C40 60 90 80 170 64" fill="none" stroke="#5ab0e0" stroke-width="5"/>' +
      '<g data-part="fields" style="opacity:0"><rect x="10" y="48" width="30" height="12" fill="#e7c27a"/><rect x="110" y="76" width="34" height="10" fill="#e7c27a"/><rect x="112" y="46" width="30" height="12" fill="#9cc46a"/><path d="M14 51h22M14 54h22M14 57h22M114 79h26M114 82h26M116 49h26M116 52h26M116 55h26" fill="none" stroke="#b08a3e" stroke-width="0.8"/></g>' +
      '<g data-part="town" style="opacity:0"><rect x="60" y="54" width="10" height="12" fill="#f2d2a9"/><rect x="72" y="50" width="10" height="16" fill="#e9d8bd"/><rect x="84" y="56" width="8" height="10" fill="#f2d2a9"/><path d="M78 50c0-6 6-6 6 0z" fill="#3fb0a8"/></g>'),
    "w-crossroads": g('<rect width="160" height="90" fill="#e8d5b0" stroke="none"/><path d="M0 50h160M80 0v90" fill="none" stroke="#a0683f" stroke-width="5"/>' +
      '<g data-part="town" style="opacity:0"><rect x="88" y="30" width="12" height="14" fill="#f2d2a9"/><rect x="60" y="56" width="12" height="12" fill="#e9d8bd"/><rect x="88" y="56" width="14" height="10" fill="#f2d2a9"/><rect x="58" y="30" width="14" height="14" fill="#e9d8bd"/></g>'),
    "w-port": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="50" width="160" height="40" fill="#5ab0e0" stroke="none"/><path d="M0 50h70c10 0 10 10 0 10H0z" fill="#f0d29a"/>' +
      '<g data-part="town" style="opacity:0"><rect x="10" y="38" width="10" height="12" fill="#f2d2a9"/><rect x="24" y="34" width="10" height="16" fill="#e9d8bd"/><rect x="40" y="42" width="24" height="3" fill="#a0683f"/><path d="M60 40v-18h2v18" fill="#5a5f7a"/></g>'),
    "w-ship": g('<path d="M-16 0l-3-7h38l-3 7z" fill="#c0503e"/><rect x="-10" y="-14" width="8" height="7" fill="#5b9bd5"/><rect x="0" y="-14" width="8" height="7" fill="#f2c14e"/>'),
    // a bathroom at home: tiled wall, a mirror and a towel (stage units)
    "w-bathroom": g('<rect width="160" height="58" fill="#dff0f4" stroke="none"/><path d="M0 14h160M0 28h160M0 42h160M20 0v58M40 0v58M60 0v58M80 0v58M100 0v58M120 0v58M140 0v58" fill="none" stroke="#c6e0e6" stroke-width=".6"/>' +
      '<rect y="58" width="160" height="32" fill="#cfd8dc" stroke="none"/><path d="M0 58h160" fill="none"/><rect x="86" y="10" width="20" height="22" rx="3" fill="#eaf6fb"/><path d="M90 14l6 6" fill="none" stroke="#fff" stroke-width="1.4"/>' +
      '<rect x="134" y="20" width="3" height="3" fill="#a9b6bf"/><rect x="128" y="22" width="14" height="20" fill="#f2c14e"/>'),
    // a word card, wide (origin: its middle), for a word written in another script
    "w-word-card": g('<rect x="-16" y="-9" width="32" height="18" rx="2.4" fill="#fffaf0"/>'),
    // a water treatment works: a small building and two round tanks (origin: the ground at its middle)
    "w-treat": g('<rect x="-22" y="-12" width="14" height="12" fill="#e9d8bd"/><rect x="-19" y="-9" width="4" height="3" fill="#bfe3f5"/>' +
      '<ellipse cx="2" cy="-3" rx="8" ry="3" fill="#a9b6bf"/><ellipse cx="2" cy="-4" rx="6.6" ry="2" fill="#7fc0ea"/><ellipse cx="18" cy="-3" rx="8" ry="3" fill="#a9b6bf"/><ellipse cx="18" cy="-4" rx="6.6" ry="2" fill="#7fc0ea"/>'),
    /* ---------- sapling-6: crafts ---------- */
    // a small map card with Hamadan's dot (like "w-map-tabriz")
    "w-map-hamadan": function () {
      return g('<rect x="-24" y="-20" width="48" height="40" rx="2" fill="#fffaf0"/><svg x="-22.5" y="-18.5" width="45" height="37" viewBox="-22.5 -18.5 45 37" overflow="hidden">' +
        W.iranMap(0.115, { at: [112, 121] }) + '</svg><rect x="-22.5" y="-18.5" width="45" height="37" fill="none" stroke-width=".5"/>');
    },
    // a panel of blue tiles (origin: its middle; 40 × 30), each tile a piece t0 to t11 (hidden), set one by one
    "w-tilework": g('<rect x="-21" y="-16" width="42" height="32" fill="#e9d8bd"/>' + '<g data-part="t0" style="opacity:0"><rect x="-20" y="-15" width="10" height="10" fill="#2f6fb0"/><path d="M-15 -14l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-15" cy="-10" r="1.3" fill="#f2c14e"/></g><g data-part="t1" style="opacity:0"><rect x="-10" y="-15" width="10" height="10" fill="#2f6fb0"/><path d="M-5 -14l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-5" cy="-10" r="1.3" fill="#f2c14e"/></g><g data-part="t2" style="opacity:0"><rect x="0" y="-15" width="10" height="10" fill="#2f6fb0"/><path d="M5 -14l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="5" cy="-10" r="1.3" fill="#f2c14e"/></g><g data-part="t3" style="opacity:0"><rect x="10" y="-15" width="10" height="10" fill="#2f6fb0"/><path d="M15 -14l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="15" cy="-10" r="1.3" fill="#f2c14e"/></g><g data-part="t4" style="opacity:0"><rect x="-20" y="-5" width="10" height="10" fill="#2f6fb0"/><path d="M-15 -4l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-15" cy="0" r="1.3" fill="#f2c14e"/></g><g data-part="t5" style="opacity:0"><rect x="-10" y="-5" width="10" height="10" fill="#2f6fb0"/><path d="M-5 -4l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-5" cy="0" r="1.3" fill="#f2c14e"/></g><g data-part="t6" style="opacity:0"><rect x="0" y="-5" width="10" height="10" fill="#2f6fb0"/><path d="M5 -4l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="5" cy="0" r="1.3" fill="#f2c14e"/></g><g data-part="t7" style="opacity:0"><rect x="10" y="-5" width="10" height="10" fill="#2f6fb0"/><path d="M15 -4l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="15" cy="0" r="1.3" fill="#f2c14e"/></g><g data-part="t8" style="opacity:0"><rect x="-20" y="5" width="10" height="10" fill="#2f6fb0"/><path d="M-15 6l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-15" cy="10" r="1.3" fill="#f2c14e"/></g><g data-part="t9" style="opacity:0"><rect x="-10" y="5" width="10" height="10" fill="#2f6fb0"/><path d="M-5 6l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="-5" cy="10" r="1.3" fill="#f2c14e"/></g><g data-part="t10" style="opacity:0"><rect x="0" y="5" width="10" height="10" fill="#2f6fb0"/><path d="M5 6l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="5" cy="10" r="1.3" fill="#f2c14e"/></g><g data-part="t11" style="opacity:0"><rect x="10" y="5" width="10" height="10" fill="#2f6fb0"/><path d="M15 6l4 4-4 4-4-4z" fill="#f2f0e6"/><circle cx="15" cy="10" r="1.3" fill="#f2c14e"/></g>'),
    // a cloth for qalamkar (origin: its middle; 44 × 26) with stamped flowers (pieces p1 to p3, hidden) and a
    // wooden stamp (origin: the stamp's face) to press on it
    "w-qalamkar": g('<rect x="-22" y="-13" width="44" height="26" fill="#f6ecd6"/><path d="M-20-11h40M-20 11h40" fill="none" stroke="#c0503e" stroke-width=".8"/>' +
      [-12, 0, 12].map(function (x, i) { return '<g data-part="p' + (i + 1) + '" style="opacity:0"><circle cx="' + x + '" cy="0" r="4.4" fill="none" stroke="#a8323a" stroke-width="1.2"/><circle cx="' + x + '" cy="0" r="1.6" fill="#3d3a3a" stroke="none"/><path d="M' + (x - 4) + ' -6h8M' + (x - 4) + ' 6h8" fill="none" stroke="#3d3a3a" stroke-width=".6"/></g>'; }).join("")),
    "w-stamp": g('<rect x="-4" y="-3" width="8" height="3" fill="#a0683f"/><rect x="-1.4" y="-8" width="2.8" height="5" rx="1" fill="#8a5a3a"/>'),
    // a khatam box (origin: its bottom middle; 30 wide): tiny triangles of wood and metal side by side
    "w-khatam": g('<rect x="-15" y="-16" width="30" height="16" fill="#6b4a2f"/><rect x="-16" y="-20" width="32" height="5" fill="#7a5233"/>' +
      [-12, -6, 0, 6, 12].map(function (x) { return '<path d="M' + (x - 3) + ' -6l3-5 3 5z" fill="#f2e6c8" stroke="none"/><path d="M' + (x - 3) + ' -11l3 5 3-5z" fill="#c9a06a" stroke="none"/><circle cx="' + x + '" cy="-3" r=".8" fill="#e5c158" stroke="none"/>'; }).join("") +
      '<path d="M-15-6h30M-15-11h30" fill="none" stroke="#3d2c22" stroke-width=".4"/>'),
    // a potter's wheel with a turquoise Lalejin pot on it (origin: the floor under the wheel); the pot (piece "pot")
    // grows from a lump by scaling it (its pivot is its foot)
    "w-wheel": g('<rect x="-3" y="-10" width="6" height="10" fill="#8a5a3a"/><ellipse cx="0" cy="-10" rx="12" ry="2.4" fill="#a0683f"/>' +
      '<g data-part="pot" data-pivot="0 -11"><path d="M-4-11c-4-3-4-8-1-10l-1-3h12l-1 3c3 2 3 7-1 10z" fill="#2fa8a0"/><path d="M-3-18h10" fill="none" stroke="#1f6f6a" stroke-width=".8"/></g>'),
    "w-potter": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#7a8a5a", pants: "#5a5f7a", sit: true }),
    "w-tiler": person({ adult: true, hair: "#1f1712", beard: "#1f1712", shirt: "#5b9bd5", pants: "#4b5a78" }),
    "w-stamper": person({ kind: "woman", key: "w-stamper", adult: true, hair: "#4a2f1f", style: "bun", shirt: "#e46b8a", pants: "#4b5a78" }),
    "w-khatam-maker": person({ adult: true, style: "bald", mustache: "#9a9a9a", glasses: true, shirt: "#c9a06a", pants: "#5a5f7a" }),
    /* ---------- sapling-23: how our town works (origin of buildings: their bottom middle) ---------- */
    // a wooden power pole; the wires (piece "wires") run to both sides
    "w-power-pole": g('<rect x="-1.2" y="-48" width="2.4" height="48" fill="#8a5a3a"/><path d="M-9-44h18" fill="none" stroke="#5a4a3a" stroke-width="1.6"/>' +
      '<g data-part="wires"><path d="M-8-44c-24 7-48 7-72 0M8-44c24 7 48 7 72 0M-4-44c-24 9-48 9-76 2M4-44c24 9 48 9 76 2" fill="none" stroke="#3d3a3a" stroke-width=".6"/></g>'),
    "w-firestation": g('<rect x="-28" y="-38" width="56" height="38" fill="#d9584a"/><rect x="-30" y="-41" width="60" height="4" fill="#a8323a"/>' +
      '<rect x="-22" y="-26" width="20" height="26" fill="#f2e6c8"/><rect x="2" y="-26" width="20" height="26" fill="#f2e6c8"/>' +
      '<path d="M-22-19h20M-22-12h20M-22-5h20M2-19h20M2-12h20M2-5h20" fill="none" stroke="#c9b48a" stroke-width=".6"/>' +
      '<rect x="-12" y="-36" width="24" height="7" rx="1" fill="#fff"/>'),
    "w-library": g('<rect x="-30" y="-36" width="60" height="36" fill="#e9d8bd"/><path d="M-34-36L0-48l34 12z" fill="#b08a5a"/>' +
      '<rect x="-24" y="-28" width="18" height="18" fill="#cfe9f5"/><g stroke="none"><rect x="-23" y="-26" width="3" height="7" fill="#e5483f"/><rect x="-19.6" y="-26" width="3" height="7" fill="#5b9bd5"/><rect x="-16" y="-25" width="3" height="6" fill="#f2c14e"/><rect x="-12.6" y="-26" width="3" height="7" fill="#5aa36a"/>' +
      '<rect x="-23" y="-18" width="3" height="7" fill="#8a6cc4"/><rect x="-19.6" y="-18" width="3" height="7" fill="#f59e0b"/><rect x="-16" y="-17" width="3" height="6" fill="#3fb0a8"/></g><path d="M-24-19h18" fill="none" stroke-width=".6"/>' +
      '<path d="M8 0v-16a6 6 0 0 1 12 0v16z" fill="#8a5a3a"/><rect x="-12" y="-46" width="24" height="7" rx="1" fill="#fff"/>'),
    "w-postoffice": g('<rect x="-24" y="-32" width="48" height="32" fill="#f2f0e6"/><rect x="-26" y="-35" width="52" height="4" fill="#2f6f9a"/>' +
      '<rect x="-18" y="-24" width="14" height="12" fill="#cfe9f5"/><path d="M4 0v-20h12v20z" fill="#2f6f9a"/><rect x="-12" y="-33" width="24" height="7" rx="1" fill="#fff"/>' +
      '<rect x="-31" y="-12" width="6" height="12" rx="1" fill="#e5c158"/><rect x="-30" y="-10" width="4" height="1" fill="#3d3a3a"/>'),
    "w-rubbish-bin": g('<path d="M-5 0l-1-11h12l-1 11z" fill="#5aa36a"/><rect x="-7" y="-13" width="14" height="3" rx="1" fill="#3f7a4a"/>'),
    "w-firefighter": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#3d4a5a", pants: "#3d4a5a",
      hat: '<path d="M-6 1.4c0-5 2.8-7.2 6-7.2s6 2.2 6 7.2h1.6v1.2H-7.6V1.4z" fill="#e5483f"/>',
      front: '<path d="M-5.3 8h10.6M-5.3 10.6h10.6" fill="none" stroke="#f2c14e" stroke-width="1"/>' }),
    "w-electrician": person({ adult: true, hair: "#1f1712", beard: "#1f1712", shirt: "#f59e0b", pants: "#4b5a78", skin: "#c98f63",
      hat: '<path d="M-5.6 1.2c0-4.6 2.6-6.6 5.6-6.6s5.6 2 5.6 6.6z" fill="#f2c14e"/>',
      holdR: '<path d="M0 0l3-5" fill="none" stroke="#5a5f7a" stroke-width="1.2"/>' }),
    "w-librarian": person({ kind: "woman", key: "w-librarian", adult: true, hair: "#2f2219", style: "bun", shirt: "#8a6cc4", skirt: "#4b5a78", long: true, legs: "#4b5a78", glasses: true,
      holdL: '<rect x="-1" y="-4" width="5" height="6" fill="#e5483f"/>' }),
    /* ---------- sapling-46 to 32: long, long ago ---------- */
    // the ground cut open in layers (stage units): grass on top (y 40), then three layers, each older than the one
    // above; finds hidden in them as pieces: cap (a bottle cap, today), shard (a broken pot, long ago), tool (a stone
    // tool, very long ago); dig (a trench dug down, hidden)
    "w-layers": g('<rect width="160" height="40" fill="#cdeaf7" stroke="none"/><rect y="38" width="160" height="4" fill="#8fc46a" stroke="none"/>' +
      '<rect y="42" width="160" height="14" fill="#b58a5c" stroke="none"/><rect y="56" width="160" height="14" fill="#d2b07a" stroke="none"/><rect y="70" width="160" height="20" fill="#9a8a78" stroke="none"/>' +
      '<path d="M0 42h160M0 56h160M0 70h160" fill="none" stroke="#6b4a2f" stroke-width=".5"/>' +
      '<g fill="#8a6a4a" stroke="none" opacity=".5"><circle cx="20" cy="48" r=".8"/><circle cx="130" cy="52" r=".7"/><circle cx="40" cy="62" r=".8"/><circle cx="140" cy="64" r=".6"/><circle cx="30" cy="80" r="1"/><circle cx="118" cy="84" r=".8"/></g>' +
      '<g data-part="dig" style="opacity:0"><path d="M70 42h44v44H70z" fill="#000" opacity=".12" stroke="none"/><path d="M70 42v44h44V42" fill="none" stroke="#6b4a2f" stroke-width=".6" stroke-dasharray="1.6 1"/></g>' +
      '<g data-part="cap" style="opacity:0"><circle cx="84" cy="49" r="3.6" fill="#d9584a"/><path d="M81.4 49h5.2" fill="none" stroke="#fff" stroke-width=".7"/></g>' +
      '<g data-part="shard" style="opacity:0"><g transform="translate(99 63) scale(1.6) translate(-99 -63)"><path d="M94 61l8-2 3 5-6 3-6-1z" fill="#c4673a"/><path d="M96 62l2 2 2-2 2 2" fill="none" stroke="#3d2c22" stroke-width=".5"/></g></g>' +
      '<g data-part="tool" style="opacity:0"><g transform="translate(89 78) scale(1.5) translate(-89 -78)"><path d="M84 80l5-8 5 8-5 3z" fill="#7a7468"/><path d="M89 73v8" fill="none" stroke="#5a554c" stroke-width=".5"/></g></g>'),
    // an arrow down the layers with "older" written by it (the word is a text part in the lesson)
    "w-arrow-down": g('<path d="M0 0v30" fill="none" stroke="#3d2c22" stroke-width="1.2"/><path d="M-3 27l3 5 3-5z" fill="#3d2c22"/>'),
    "w-archaeologist": person({ kind: "woman", key: "w-archaeologist", adult: true, hair: "#4a2f1f", style: "bun", shirt: "#c9a06a", pants: "#6b5a4a",
      hat: '<path d="M-8 .4h16v1.4H-8z M-5 .6c0-4 2-5.6 5-5.6s5 1.6 5 5.6z" fill="#e7c9a0"/>',
      holdR: '<path d="M0 0l3-4" fill="none" stroke="#8a5a3a" stroke-width="1.2"/><path d="M2.4-4.6l2-2.4 1.4 1.2-2 2.4z" fill="#f2c14e"/>' }),
    // a valley in the Zagros with a cave in the mountainside (stage units); the cave's mouth is at about (112, 58)
    "w-cave-valley": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 40L20 20l24 12 22-16 30 18 30-22 44 28v60H-10z" fill="#a89a84"/>' +
      '<path d="M70 70c0-20 12-30 30-30s34 6 50 2v48H70z" fill="#9a8a74"/><path d="M98 70c0-10 6-16 14-16s14 6 14 16z" fill="#3d3329"/>' +
      '<path d="M-10 68c40-6 80-6 170-2v24H-10z" fill="#b9c98a" stroke="none"/><path d="M-10 68c40-6 80-6 170-2" fill="none"/>' +
      '<g fill="#6a8a4a" stroke="none"><circle cx="18" cy="64" r="5"/><circle cx="26" cy="62" r="6"/><circle cx="44" cy="66" r="4"/></g>'),
    // a stone hand axe, chipped on both faces (origin: its middle), to look at closely
    "w-handaxe": g('<path d="M0-26c8 4 14 14 14 26S8 22 0 24-14 12-14 0-8-22 0-26z" fill="#8a8274"/>' +
      '<path d="M0-26l-4 10 6 6-4 10 4 8-2 10M-12-6l8 0M12-6l-8-2M-12 8l8-2M12 8l-8 0M-4 18l4-6 4 6" fill="none" stroke="#5a554c" stroke-width=".9"/>' +
      '<path d="M-4-14c2-2 4-2 6 0M-6 2c2-2 5-2 7 0" fill="none" stroke="#b0a898" stroke-width=".8"/>'),
    // a small map card with a dot at a place on js/maps/iran.js (Kermanshah for Ganj Dareh; Kashan for Sialk)
    "w-map-kermanshah": function () {
      return g('<rect x="-24" y="-20" width="48" height="40" rx="2" fill="#fffaf0"/><svg x="-22.5" y="-18.5" width="45" height="37" viewBox="-22.5 -18.5 45 37" overflow="hidden">' +
        W.iranMap(0.115, { at: [89, 127] }) + '</svg><rect x="-22.5" y="-18.5" width="45" height="37" fill="none" stroke-width=".5"/>');
    },
    "w-map-kashan": function () {
      return g('<rect x="-24" y="-20" width="48" height="40" rx="2" fill="#fffaf0"/><svg x="-22.5" y="-18.5" width="45" height="37" viewBox="-22.5 -18.5 45 37" overflow="hidden">' +
        W.iranMap(0.115, { at: [154, 134] }) + '</svg><rect x="-22.5" y="-18.5" width="45" height="37" fill="none" stroke-width=".5"/>');
    },
    // a hillside in the Zagros for the first farmers (stage units): ground from y 62
    "w-hillside": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><path d="M-10 46L24 24l30 16 28-20 34 22 30-18 34 22v54H-10z" fill="#a8b89a"/>' +
      '<path d="M-10 62c50-6 110-6 170 0v28H-10z" fill="#c9d89a" stroke="none"/><path d="M-10 62c50-6 110-6 170 0" fill="none"/>'),
    // a row of wheat (origin: the ground at its middle; 40 wide): the stalks (piece "stalks", pivot at the ground)
    // grow by scaling sy; seeds (piece "seeds") lie on the soil first
    "w-wheat-row": g('<path d="M-20 0h40" fill="none" stroke="#8a6a4a" stroke-width="1.6"/>' +
      '<g data-part="seeds"><g fill="#c9a06a" stroke="none">' + [-16, -10, -4, 2, 8, 14].map(function (x) { return '<ellipse cx="' + x + '" cy="-1" rx="1" ry=".6"/>'; }).join("") + '</g></g>' +
      '<g data-part="stalks" data-pivot="0 0">' + [-16, -10, -4, 2, 8, 14].map(function (x) {
        return '<path d="M' + x + ' 0v-14" fill="none" stroke="#9a8a3a" stroke-width=".8"/><ellipse cx="' + x + '" cy="-16" rx="1.4" ry="3" fill="#e7c27a"/>';
      }).join("") + '</g>'),
    // a flat-roofed house of mud brick, from the first villages (origin: its bottom middle)
    "w-mud-house": g('<rect x="-12" y="-14" width="24" height="14" fill="#c9a06a"/><rect x="-13" y="-16" width="26" height="3" fill="#a8845a"/><rect x="-3" y="-9" width="6" height="9" fill="#6b4a2f"/>'),
    // a pen of stones for goats (origin: its bottom middle; 36 wide)
    "w-pen": g('<path d="M-18 0v-5h36v5" fill="none" stroke="#8a8274" stroke-width="2.4" stroke-dasharray="2.6 .6"/>'),
    "w-farmer-ne": person({ adult: true, hair: "#3a2416", beard: "#3a2416", shirt: "#c9b48a", pants: "#8a6a4a", skin: "#d9a47a", shoes: "#8a6a4a" }),
    "w-farmer-ne-woman": person({ kind: "woman", key: "w-farmer-ne-woman", adult: true, hair: "#3a2416", style: "long", shirt: "#b08a6a", skirt: "#c9b48a", long: true, legs: "#d9a47a", skin: "#d9a47a", shoes: "#8a6a4a" }),
    // a kiln of mud brick with fire in its mouth (origin: its bottom middle); the fire is the piece "fire"
    "w-kiln": g('<path d="M-16 0v-12a16 16 0 0 1 32 0v12z" fill="#b58a5c"/><path d="M-6 0v-6a6 6 0 0 1 12 0v6z" fill="#3d2c22"/>' +
      '<g data-part="fire"><path d="M-4 0c-1-4 1-5 2-8 1 3 3 3 2 6 1-1 1-2 1-3 2 2 2 4 1 5z" fill="#f59e0b" stroke="none"/></g>'),
    // a painted pot in the style of Tepe Sialk, with a zigzag and a mountain goat (origin: its bottom middle)
    "w-sialk-pot": g('<path d="M-8 0c-6-4-7-12-3-18l-1-4h16l-1 4c4 6 3 14-3 18z" fill="#d9a06a"/><path d="M-10-17l3 2 3-2 3 2 3-2 3 2 3-2 3 2" fill="none" stroke="#3d2c22" stroke-width=".8"/>' +
      '<ellipse cx="0" cy="-8" rx="3.4" ry="1.4" fill="#3d2c22" stroke="none"/><path d="M-2.4-7.4v3M2.4-7.4v3M3-9l1.6-2M4.6-11c-1-4-6-5-8-2" fill="none" stroke="#3d2c22" stroke-width=".7"/>'),
    // a smelting furnace (origin: its bottom middle) with a glowing mouth (piece "glow"), and a copper bar
    "w-furnace": g('<path d="M-12 0l3-22h18l3 22z" fill="#8a6a4a"/><rect x="-5" y="-9" width="10" height="7" rx="2" fill="#3d2c22"/>' +
      '<g data-part="glow"><rect x="-4" y="-8" width="8" height="5" rx="2" fill="#f59e0b" stroke="none"/></g>'),
    "w-copper": g('<path d="M-6 0l1.4-4h9.2L6 0z" fill="#c4673a"/><path d="M-4-3h6" fill="none" stroke="#f2a07a" stroke-width=".6"/>'),
    // a gold cup from Marlik with two animals around it (origin: its bottom middle)
    "w-gold-cup": g('<path d="M-6 0h12l-1-2h-3l-1-3c4-1 6-6 6-14H-7c0 8 2 13 6 14l-1 3h-3z" fill="#e5c158"/><path d="M-6-15h12M-6-9h12" fill="none" stroke="#b08a2a" stroke-width=".6"/>' +
      '<path d="M-3-13l1-1 2 1 2-1 1 1M-3-7l1-1 2 1 2-1 1 1" fill="none" stroke="#8a6a1a" stroke-width=".6"/>'),
    // an iron sickle (origin: its handle's end)
    "w-sickle": g('<rect x="-1" y="-8" width="2" height="8" fill="#8a5a3a"/><path d="M0-8c-2-6 2-12 8-12-4 2-6 6-5 12z" fill="#8a8f98"/>'),
    "w-smith": person({ adult: true, hair: "#2f2219", beard: "#2f2219", shirt: "#8a6a4a", pants: "#5a4a3a", skin: "#d9a47a",
      front: '<path d="M-4.6 1.4h9.2l.6 12H-5.2z" fill="#6b4a2f"/>' }),
    /* ---------- sapling-34 and 47: my town long ago (origin of buildings: their bottom middle) ---------- */
    // an old mud-brick house with an arched wooden door and two knockers (pieces k1, k2)
    "w-old-house": g('<rect x="-24" y="-30" width="48" height="30" fill="#d9b77e"/><rect x="-26" y="-32" width="52" height="3" fill="#c49a5e"/>' +
      '<path d="M-9 0v-16a9 9 0 0 1 18 0v16z" fill="#c9a06a"/><path d="M-7 0v-15a7 7 0 0 1 14 0v15z" fill="#8a5a3a"/><path d="M0-22V0" fill="none"/>' +
      '<g data-part="k1"><circle cx="-2.4" cy="-12" r="1.4" fill="#5a5f7a"/></g><g data-part="k2"><rect x="1.4" y="-13" width="2" height="3" rx=".8" fill="#5a5f7a"/></g>' +
      '<rect x="-20" y="-22" width="6" height="8" fill="#6b4a2f"/><rect x="14" y="-22" width="6" height="8" fill="#6b4a2f"/>'),
    // a block of flats
    "w-flats": g('<rect x="-16" y="-58" width="32" height="58" fill="#cfd8dc"/>' +
      [-50, -38, -26, -14].map(function (y) { return '<rect x="-12" y="' + y + '" width="7" height="7" fill="#bfe3f5"/><rect x="-3.5" y="' + y + '" width="7" height="7" fill="#bfe3f5"/><rect x="5" y="' + y + '" width="7" height="7" fill="#bfe3f5"/>'; }).join("") +
      '<rect x="-4" y="-8" width="8" height="8" fill="#5a5f7a"/>'),
    // a pomegranate tree, as the street remembers it (origin: the ground at its trunk)
    "w-pom-tree": g('<path d="M-1.4 0v-14h2.8V0z" fill="#8a5a3a"/><circle cx="0" cy="-22" r="11" fill="#5a9a45"/>' +
      '<g fill="#d9384a" stroke="none"><circle cx="-5" cy="-24" r="1.8"/><circle cx="4" cy="-27" r="1.8"/><circle cx="6" cy="-19" r="1.8"/><circle cx="-3" cy="-17" r="1.8"/><circle cx="1" cy="-22" r="1.6"/></g>'),
    // an old sepia photo of the same street, years ago (origin: its middle; 52 × 38)
    "w-street-photo": g('<rect x="-26" y="-19" width="52" height="38" fill="#f4efe6"/><rect x="-23" y="-16" width="46" height="30" fill="#d8c8a8"/>' +
      '<rect x="-14" y="-8" width="24" height="18" fill="#bfa880"/><path d="M-6 10v-9a4 4 0 0 1 8 0v9z" fill="#8a7458"/><path d="M-23 10h46" fill="none" stroke="#8a7458" stroke-width=".6"/>' +
      '<path d="M14 10v-8" fill="none" stroke="#8a7458" stroke-width="1"/><circle cx="14" cy="-4" r="5" fill="#a89470"/>' +
      '<circle cx="-18" cy="8" r="2.2" fill="none" stroke="#6b5a44" stroke-width=".7"/><circle cx="-12" cy="8" r="2.2" fill="none" stroke="#6b5a44" stroke-width=".7"/><path d="M-18 8l3-4h3l0 4M-15 4l-1-2" fill="none" stroke="#6b5a44" stroke-width=".7"/>'),
    /* A courtyard house cut open for a tour (stage units, x −60 to 600; floor at y 72): the street door (x 40), the
       hashti with its benches (80–150), the courtyard with its pool and garden beds (150–330), the eyvan with two
       columns (330–420) and the stairs down to the cool basement (420–480, the room below the floor). */
    "w-courtyard": g('<rect x="-60" y="-40" width="660" height="130" fill="#cdeaf7" stroke="none"/>' +
      '<rect x="-60" y="72" width="660" height="18" fill="#b58a5c" stroke="none"/><path d="M-60 72h660" fill="none"/>' +
      // the street and the door
      '<rect x="-60" y="68" width="60" height="4" fill="#d6cfc2" stroke="none"/><rect x="0" y="20" width="80" height="52" fill="#d9b77e"/>' +
      '<path d="M30 72V48a10 10 0 0 1 20 0v24z" fill="#8a5a3a"/><path d="M40 40v32" fill="none"/><circle cx="37" cy="58" r="1.2" fill="#5a5f7a"/><rect x="41.6" y="57" width="2" height="3" rx=".8" fill="#5a5f7a"/>' +
      // the hashti: a small domed room with benches on both sides and light from the top
      '<rect x="80" y="30" width="70" height="42" fill="#e9d8bd"/><path d="M90 30a25 18 0 0 1 50 0z" fill="#d9b77e"/><rect x="110" y="8" width="10" height="5" fill="#cfe9f5"/>' +
      '<rect x="84" y="62" width="16" height="10" fill="#c9a06a"/><rect x="130" y="62" width="16" height="10" fill="#c9a06a"/>' +
      '<path d="M105 72V54a10 10 0 0 1 20 0v18z" fill="#f4e7cf"/>' +
      // the courtyard: brick floor, pool, garden beds and trees, rooms around with sash windows
      '<rect x="150" y="18" width="180" height="20" fill="#d9b77e"/>' + [160, 196, 232, 268, 304].map(function (x) { return '<path d="M' + x + ' 38V26a7 7 0 0 1 14 0v12z" fill="#7fb6d9"/><path d="M' + (x + 7) + ' 19v19M' + x + ' 32h14" fill="none" stroke-width=".5"/>'; }).join("") +
      '<rect x="150" y="38" width="180" height="34" fill="#e6c9a0"/><path d="M150 50h180M150 61h180" fill="none" stroke="#cfae84" stroke-width=".5"/>' +
      '<rect x="214" y="58" width="52" height="10" rx="1" fill="#5ab0e0"/><path d="M218 63h44" fill="none" stroke="#bfe3f5" stroke-width=".8"/>' +
      '<rect x="164" y="64" width="30" height="8" fill="#7a5233"/><rect x="286" y="64" width="30" height="8" fill="#7a5233"/>' +
      '<path d="M179 64V44" fill="none" stroke="#8a5a3a" stroke-width="2"/><circle cx="179" cy="40" r="10" fill="#5a9a45"/><path d="M301 64V44" fill="none" stroke="#8a5a3a" stroke-width="2"/><circle cx="301" cy="40" r="10" fill="#5a9a45"/>' +
      '<g fill="#d9384a" stroke="none"><circle cx="174" cy="40" r="1.6"/><circle cx="183" cy="36" r="1.6"/><circle cx="296" cy="38" r="1.6"/><circle cx="306" cy="42" r="1.6"/></g>' +
      // the eyvan: a raised porch, two columns, a roof and a carpet
      '<rect x="330" y="10" width="90" height="10" fill="#c49a5e"/><rect x="330" y="60" width="90" height="12" fill="#d9b77e"/><rect x="336" y="20" width="78" height="40" fill="#f2e6c8"/>' +
      '<rect x="340" y="20" width="5" height="40" fill="#a0785a"/><rect x="405" y="20" width="5" height="40" fill="#a0785a"/><rect x="352" y="56" width="46" height="4" fill="#c0503e"/>' +
      // the stairs down to the basement, and the basement under the floor
      '<rect x="420" y="20" width="80" height="52" fill="#d9b77e"/><path d="M430 72h8v4h8v4h8v4h8v6" fill="none" stroke="#6b4a2f" stroke-width="1"/>' +
      '<rect x="440" y="74" width="80" height="16" fill="#8fb0c4" opacity=".5" stroke="none"/><path d="M480 88c0-4 2-6 4-6s4 2 4 6zM494 88c0-4 2-6 4-6s4 2 4 6z" fill="#c4673a"/>' +
      '<rect x="500" y="20" width="100" height="52" fill="#d9b77e"/>'),
    /* ---------- sapling-35: the first printing house and the first train ---------- */
    // a little steam train going left: engine with a tall chimney, two carriages (origin: the rails under its
    // middle; 90 wide); the smoke is the emit track in the lesson
    "w-steam-train": g('<path d="M-46 0h92" fill="none" stroke="#5a5f7a" stroke-width="1"/>' +
      '<rect x="-44" y="-16" width="22" height="12" rx="2" fill="#3d3a3a"/><rect x="-30" y="-24" width="10" height="9" fill="#3d3a3a"/><rect x="-41" y="-24" width="4" height="9" fill="#3d3a3a"/><path d="M-43-24h8" fill="none" stroke="#3d3a3a" stroke-width="2"/>' +
      '<rect x="-28" y="-22" width="6" height="4" fill="#fcd34d"/><circle cx="-38" cy="-3" r="3.2" fill="#5a5f7a"/><circle cx="-27" cy="-3" r="3.2" fill="#5a5f7a"/>' +
      [-14, 18].map(function (x) { return '<rect x="' + x + '" y="-18" width="28" height="14" rx="1.4" fill="#2f6f9a"/><rect x="' + (x + 3) + '" y="-15" width="6" height="5" fill="#cfe9f5"/><rect x="' + (x + 11) + '" y="-15" width="6" height="5" fill="#cfe9f5"/><rect x="' + (x + 19) + '" y="-15" width="6" height="5" fill="#cfe9f5"/>' +
        '<circle cx="' + (x + 6) + '" cy="-3" r="2.4" fill="#5a5f7a"/><circle cx="' + (x + 22) + '" cy="-3" r="2.4" fill="#5a5f7a"/>'; }).join("")),
    "w-rails": g('<rect x="-100" y="0" width="900" height="2" fill="#8a7a6a" stroke="none"/><path d="M-100 0h900M-100 2h900" fill="none" stroke="#5a5f7a" stroke-width=".6"/>' +
      '<g fill="#8a6a4a" stroke="none">' + Array.apply(null, Array(60)).map(function (_, i) { return '<rect x="' + (-100 + i * 15) + '" y="2" width="6" height="1.6"/>'; }).join("") + '</g>'),
    // a wooden printing press with a screw (origin: its bottom middle); the plate (piece "plate") presses down
    "w-press": g('<rect x="-16" y="-40" width="4" height="40" fill="#8a5a3a"/><rect x="12" y="-40" width="4" height="40" fill="#8a5a3a"/><rect x="-18" y="-42" width="36" height="5" fill="#7a5233"/>' +
      '<rect x="-14" y="-14" width="28" height="4" fill="#a0683f"/><rect x="-12" y="-17" width="24" height="3" fill="#fffaf0"/>' +
      '<g data-part="plate"><path d="M0-37v10" fill="none" stroke="#5a5f7a" stroke-width="2"/><path d="M-8-33h16" fill="none" stroke="#5a5f7a" stroke-width="1.2"/><rect x="-11" y="-27" width="22" height="4" fill="#6b4a2f"/></g>'),
    // a stack of printed pages (origin: its bottom middle), growing taller by scaling sy
    "w-pages": g('<rect x="-8" y="-6" width="16" height="6" fill="#fffaf0"/><path d="M-8-4h16M-8-2h16" fill="none" stroke="#c9c2b6" stroke-width=".4"/>'),
    // a book written by hand: a scribe's desk with an open book (origin: its bottom middle)
    "w-scribe-desk": g('<rect x="-12" y="-6" width="24" height="6" fill="#8a5a3a"/><path d="M-10-6l10-2 10 2-10 1z" fill="#fffaf0"/><path d="M-8-6.6h6M-8-7.2h5M2-7.2h6M2-6.6h5" fill="none" stroke="#3d2c22" stroke-width=".3"/>'),
    "w-scribe": person({ adult: true, hair: "#2f2219", beard: "#2f2219", shirt: "#5a7f6a", pants: "#4b5a78", sit: true,
      hat: '<path d="M-5.4 1.2c0-4.4 2.4-6.4 5.4-6.4s5.4 2 5.4 6.4z" fill="#3d3a3a"/>', holdR: '<path d="M0 0l3-4" fill="none" stroke="#3d2c22" stroke-width=".8"/>' }),
    "w-printer": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#c9b48a", pants: "#5a5f7a", front: '<path d="M-4.6 1.4h9.2l.6 12H-5.2z" fill="#8a7a6a"/>' }),
    // an old newspaper (origin: its middle)
    "w-newspaper": g('<rect x="-12" y="-15" width="24" height="30" fill="#f4efe6"/><rect x="-10" y="-13" width="20" height="4" fill="#3d3a3a"/><rect x="-10" y="-7" width="9" height="8" fill="#c9c2b6"/>' +
      '<path d="M1-7h9M1-5h9M1-3h9M1-1h9M-10 3h20M-10 5h20M-10 7h20M-10 9h20M-10 11h14" fill="none" stroke="#8a8276" stroke-width=".5"/>'),
    /* ---------- sapling-44: work in the village and the city ---------- */
    // from the sea to the city (stage units, x −60 to 640; ground at y 72): sea (−60 to 30), fields and pasture
    // (30 to 230), a road, then the city's pavement (250 to 640)
    "w-village-city": g('<rect x="-60" y="-40" width="700" height="130" fill="#cdeaf7" stroke="none"/>' +
      '<path d="M-60 52c60-12 140-14 240-6s180 10 280 0 120-8 180 0v44H-60z" fill="#b9dca0" stroke="none"/>' +
      '<rect x="-60" y="60" width="90" height="30" fill="#5ab0e0" stroke="none"/><path d="M-60 60h90" fill="none" stroke="#3f8fc0" stroke-width=".6"/><path d="M30 60c4 4 6 8 8 12" fill="none"/>' +
      '<rect x="38" y="72" width="202" height="18" fill="#a8d695" stroke="none"/><path d="M38 72h202" fill="none"/>' +
      '<rect x="100" y="64" width="50" height="8" fill="#e7c27a" stroke="none"/><path d="M104 64v8M110 64v8M116 64v8M122 64v8M128 64v8M134 64v8M140 64v8M146 64v8" fill="none" stroke="#c9a03a" stroke-width=".5"/>' +
      '<rect x="240" y="72" width="400" height="18" fill="#d6cfc2" stroke="none"/><path d="M240 72h400" fill="none"/><path d="M226 72l14-2v20" fill="#8a8f98" stroke="none"/>'),
    // a wooden fishing boat's hull (origin: the waterline at its middle; drawn over the fisher standing in it)
    "w-boat-hull": g('<path d="M-16-6h32l-5 8h-22z" fill="#a0683f"/><path d="M-15-4h30" fill="none" stroke="#7a5233" stroke-width=".8"/>'),
    "w-fisher": person({ adult: true, hair: "#1f1712", mustache: "#1f1712", shirt: "#e5c158", pants: "#4b5a78", skin: "#c98f63",
      hat: '<path d="M-5.6 1.2c0-4.4 2.6-6.4 5.6-6.4s5.6 2 5.6 6.4h2v1H-5.6z" fill="#2f6f9a"/>',
      holdR: '<path d="M0 0l12-14" fill="none" stroke="#8a5a3a" stroke-width=".9"/><path d="M12-14q2 10 1 22" fill="none" stroke="#5a5f7a" stroke-width=".3"/>' }),
    "w-factory": g('<rect x="-26" y="-24" width="52" height="24" fill="#b0b8c0"/><path d="M-26-24l10-8v8l10-8v8l10-8v8" fill="#9aa4ae"/><rect x="14" y="-46" width="6" height="30" fill="#8a8f98"/>' +
      '<rect x="-20" y="-14" width="8" height="6" fill="#cfe9f5"/><rect x="-6" y="-14" width="8" height="6" fill="#cfe9f5"/><rect x="8" y="-12" width="10" height="12" fill="#5a5f7a"/>'),
    "w-workshop": g('<rect x="-20" y="-24" width="40" height="24" fill="#e9d8bd"/><path d="M-22-24h44l-3-5h-38z" fill="#a0683f"/><rect x="-16" y="-18" width="16" height="18" fill="#6b4a2f"/>' +
      '<rect x="4" y="-18" width="12" height="9" fill="#cfe9f5"/><path d="M-12-6h8M-12-6v6M-4-6v6" fill="none" stroke="#e7c27a" stroke-width="1.2"/>'),
    "w-office": g('<rect x="-18" y="-50" width="36" height="50" fill="#9fc3dc"/>' + [-44, -34, -24, -14].map(function (y) { return '<rect x="-14" y="' + y + '" width="28" height="6" fill="#d8ecf7"/>'; }).join("") +
      '<rect x="-4" y="-8" width="8" height="8" fill="#5a5f7a"/>'),
    "w-carpenter": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#5aa36a", pants: "#4b5a78", front: '<path d="M-4.6 1.4h9.2l.6 12H-5.2z" fill="#a0683f"/>',
      holdR: '<path d="M0 0l4-3" fill="none" stroke="#8a5a3a" stroke-width="1.4"/><rect x="2.4" y="-5.4" width="4" height="2.4" fill="#5a5f7a"/>' }),
    "w-shepherd": person({ adult: true, hair: "#1f1712", beard: "#1f1712", shirt: "#8a6a4a", pants: "#5a4a3a", skin: "#d9a47a",
      hat: '<path d="M-5.4 1.4c0-4.4 2.4-6.4 5.4-6.4s5.4 2 5.4 6.4z" fill="#6b5a4a"/>', holdR: '<path d="M0 0v-16c0-3 4-3 4 0" fill="none" stroke="#8a5a3a" stroke-width="1.2"/>' }),
    "w-farmer-m": person({ adult: true, hair: "#2f2219", mustache: "#2f2219", shirt: "#f2f0e6", pants: "#4b5a78", skin: "#d9a47a",
      hat: '<path d="M-7 .8h14v1.2H-7z M-4.6 .8c0-3.4 2-5 4.6-5s4.6 1.6 4.6 5z" fill="#e7c27a"/>' }),
    "w-clerk": person({ kind: "woman", key: "w-clerk", adult: true, hair: "#2f2219", style: "bun", shirt: "#5b9bd5", skirt: "#3d3a3a", long: true, legs: "#3d3a3a" }),
    /* ---------- sapling-5: trade then and now ---------- */
    // a caravanserai by the road: thick walls, corner towers and a tall arched gate (origin: its bottom middle)
    "w-caravanserai": g('<rect x="-40" y="-24" width="80" height="24" fill="#d9b77e"/><rect x="-44" y="-28" width="10" height="28" fill="#c9a06a"/><rect x="34" y="-28" width="10" height="28" fill="#c9a06a"/>' +
      '<rect x="-12" y="-34" width="24" height="34" fill="#c9a06a"/><path d="M-7 0v-16a7 7 0 0 1 14 0V0z" fill="#5a4a3a"/>' +
      '<path d="M-32-12v-5a2 2 0 0 1 4 0v5zM-24-12v-5a2 2 0 0 1 4 0v5zM20-12v-5a2 2 0 0 1 4 0v5zM28-12v-5a2 2 0 0 1 4 0v5z" fill="#8a6a4a"/>'),
    // inside a covered bazaar (stage units): a row of brick vaults with skylights, and shop fronts below
    "w-bazaar": g('<rect width="160" height="90" fill="#e9d0a8" stroke="none"/>' +
      [0, 40, 80, 120].map(function (x) { return '<path d="M' + x + ' 30q20-30 40 0" fill="#d9b77e"/><circle cx="' + (x + 20) + '" cy="10" r="2.4" fill="#fffaf0"/><path d="M' + x + ' 30v42" fill="none" stroke="#b58a5c" stroke-width="2"/>'; }).join("") +
      '<rect y="30" width="160" height="4" fill="#c49a5e" stroke="none"/><rect y="72" width="160" height="18" fill="#c9b08a" stroke="none"/><path d="M0 72h160" fill="none"/>' +
      [6, 46, 86, 126].map(function (x) { return '<rect x="' + x + '" y="40" width="28" height="32" fill="#8a5a3a"/><rect x="' + (x + 2) + '" y="54" width="24" height="4" fill="#a0683f"/>'; }).join("")),
    "w-cobbler": person({ adult: true, hair: "#2f2219", beard: "#2f2219", shirt: "#c9b48a", pants: "#5a4a3a", front: '<path d="M-4.6 1.4h9.2l.6 12H-5.2z" fill="#6b4a2f"/>',
      holdR: '<path d="M-1-3h6l1 3H-1z" fill="#8a5a3a"/>' }),
    // a sack of wheat and a bundle of wool, to swap (origin: their bottom middle)
    "w-sack": g('<path d="M-6 0c-2-6-1-10 1-12l-1-2h12l-1 2c2 2 3 6 1 12z" fill="#e7c9a0"/><path d="M-4-12h8" fill="none"/><path d="M-2-9l1 3 1-3 1 3 1-3" fill="none" stroke="#c9a03a" stroke-width=".6"/>'),
    "w-wool": g('<ellipse cx="0" cy="-4" rx="7" ry="4" fill="#f4efe6"/><path d="M-5-5c1-1 2-1 3 0M0-6c1-1 2-1 3 0M-2-2c1-1 2-1 3 0" fill="none" stroke="#c9c2b6" stroke-width=".6"/>'),
    // an orange's peel laid flat: four petals joined at the middle, with gaps between them (origin: its middle)
    "w-peel-flat": g('<g fill="#f59e0b">' + [0, 90, 180, 270].map(function (r) { return '<path transform="rotate(' + r + ')" d="M0 0c-6-6-6-18 0-24 6 6 6 18 0 24z"/>'; }).join("") + '</g><circle r="2.4" fill="#f2c14e" stroke="none"/>'),
    // a hot coast for a panel (origin: its middle; 72 × 70): sky, sea, sand, a palm and a little port crane
    "w-coast-panel": g('<rect x="-36" y="-35" width="72" height="70" rx="2" fill="#cdeaf7"/><rect x="-36" y="0" width="72" height="12" fill="#5ab0e0" stroke="none"/>' +
      '<rect x="-36" y="12" width="72" height="23" fill="#eed9ae" stroke="none"/><path d="M-36 12h72" fill="none" stroke-width=".5"/>' +
      '<path d="M22 22c0-10 1-18 3-24" fill="none" stroke="#8a5a3a" stroke-width="1.6"/><path d="M25-2c-6-3-12-1-14 3M25-2c4-6 10-6 13-3M25-2c-2-6-8-8-12-6M25-2c6-2 10 2 11 6" fill="none" stroke="#5a9a45" stroke-width="1.6"/>' +
      '<path d="M-30 0v-18h2V0M-29-18h12" fill="none" stroke="#5a5f7a" stroke-width="1"/><rect x="-36" y="-35" width="72" height="70" rx="2" fill="none"/>'),
    /* ---------- sapling-39 and 9: World Heritage ---------- */
    // a Persian garden (stage units): a long pool down the middle, cypress rows, flower beds and a pavilion at the end
    "w-persian-garden": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="40" width="160" height="50" fill="#a8d695" stroke="none"/>' +
      '<rect x="62" y="22" width="36" height="20" fill="#f2e6c8"/><path d="M60 22h40l-4-6H64z" fill="#c49a5e"/><path d="M68 42V30a4 4 0 0 1 8 0v12zM84 42V30a4 4 0 0 1 8 0v12z" fill="#7fb6d9"/>' +
      '<path d="M74 42L60 90h40L86 42z" fill="#e6c9a0" stroke="none"/><path d="M77 42L70 90h20L83 42z" fill="#5ab0e0" stroke="none"/>' +
      [[40, 46, 0.6], [30, 58, 0.8], [18, 74, 1], [120, 46, 0.6], [130, 58, 0.8], [142, 74, 1]].map(function (t) {
        return '<path d="M' + t[0] + ' ' + t[1] + 'c-' + (3 * t[2]) + '-' + (6 * t[2]) + '-' + (3 * t[2]) + '-' + (16 * t[2]) + ' 0-' + (22 * t[2]) + 'c' + (3 * t[2]) + ' ' + (6 * t[2]) + ' ' + (3 * t[2]) + ' ' + (16 * t[2]) + ' 0 ' + (22 * t[2]) + 'z" fill="#3f7a4a"/>'; }).join("") +
      '<g fill="#e46b8a" stroke="none"><circle cx="50" cy="66" r="1.6"/><circle cx="56" cy="72" r="1.6"/><circle cx="104" cy="66" r="1.6"/><circle cx="110" cy="72" r="1.6"/><circle cx="46" cy="80" r="1.6"/><circle cx="114" cy="80" r="1.6"/></g>'),
    // the Lut desert's wind-carved ridges (kaluts) at sunset (stage units)
    "w-lut": g('<rect width="160" height="90" fill="#f6c88a" stroke="none"/><rect y="56" width="160" height="34" fill="#e2b06a" stroke="none"/>' +
      '<path d="M10 58c2-14 8-18 14-18s10 6 12 18zM46 58c2-10 6-14 12-14s9 4 10 14zM86 58c2-16 8-20 16-20s12 6 14 20zM126 58c2-10 6-12 10-12s8 4 9 12z" fill="#c4874a"/>' +
      '<circle cx="132" cy="22" r="8" fill="#f59e0b" stroke="none"/>'),
    // the Hyrcanian forest: old, tall trees on misty hills by the Caspian (stage units)
    "w-forest": g('<rect width="160" height="90" fill="#dbe9e0" stroke="none"/><path d="M-10 50l40-22 36 16 40-24 64 26v44H-10z" fill="#5a8a5a"/>' +
      [10, 30, 52, 74, 96, 118, 140].map(function (x, i) { var h = [30, 36, 28, 40, 32, 38, 30][i]; return '<path d="M' + x + ' 90v-' + h + '" fill="none" stroke="#6b4a2f" stroke-width="2.4"/><circle cx="' + x + '" cy="' + (90 - h) + '" r="' + (10 + i % 3 * 2) + '" fill="#3f7a4a"/>'; }).join("") +
      '<rect y="40" width="160" height="10" fill="#fff" opacity=".35" stroke="none"/>'),
    // Shushtar's old waterworks: a cliff with mill openings and little waterfalls into a pool (stage units)
    "w-shushtar": g('<rect width="160" height="90" fill="#cdeaf7" stroke="none"/><rect y="20" width="160" height="50" fill="#c9a06a" stroke="none"/><path d="M0 20h160" fill="none"/>' +
      [20, 52, 84, 116, 140].map(function (x) { return '<path d="M' + (x - 5) + ' 46v-8a5 5 0 0 1 10 0v8z" fill="#5a4a3a"/><path d="M' + x + ' 46v24" fill="none" stroke="#7fc0ea" stroke-width="3"/>'; }).join("") +
      '<rect y="70" width="160" height="20" fill="#5ab0e0" stroke="none"/><path d="M0 70h160" fill="none" stroke="#3f8fc0" stroke-width=".6"/>'),
    // the old city of Yazd: mud-brick houses, domes and windcatchers (stage units)
    "w-yazd-city": g('<rect width="160" height="90" fill="#e4f1f8" stroke="none"/><rect y="62" width="160" height="28" fill="#eed9ae" stroke="none"/>' +
      [[10, 30], [44, 40], [80, 34], [116, 42], [146, 30]].map(function (t) { return '<rect x="' + (t[0] - 14) + '" y="' + (62 - t[1] * 0.6) + '" width="28" height="' + (t[1] * 0.6) + '" fill="#d9b77e"/>'; }).join("") +
      '<path d="M66 44a14 12 0 0 1 28 0z" fill="#d0ab70"/>' +
      [[22, 20], [56, 16], [104, 18], [136, 22]].map(function (t) { return '<rect x="' + (t[0] - 4) + '" y="' + t[1] + '" width="8" height="' + (62 - t[1]) + '" fill="#d0ab70"/><path d="M' + (t[0] - 2.4) + ' ' + (t[1] + 2) + 'v8M' + t[0] + ' ' + (t[1] + 2) + 'v8M' + (t[0] + 2.4) + ' ' + (t[1] + 2) + 'v8" fill="none" stroke="#8a5a3a" stroke-width=".8"/>'; }).join("")),
    // a postcard frame (origin: its top left; 62 × 37), drawn behind a scene picture scaled to 0.36
    "w-postcard": g('<rect x="-2" y="-2" width="61.6" height="36.4" rx="1.4" fill="#fffaf0"/>'),
    "w-fire-glow": '<circle r="16" fill="#fcd34d" opacity=".28"/><circle r="9" fill="#fcd34d" opacity=".3"/>',
    "w-fire-small": g('<path d="M-8 0l16-3M-8-3l16 3" fill="none" stroke="#6b4a2f" stroke-width="1.6"/><path d="M-5-2c-2-6 2-8 3-12 1 4 4 5 3 9 2-2 2-4 2-6 3 4 3 8 1 9z" fill="#f59e0b"/><path d="M-2-3c-1-3 1-4 1-6 1 2 2 3 1 6z" fill="#fcd34d"/>'),
    "w-sa-man": person({ adult: true, hair: "#3a2416", beard: "#3a2416", shirt: "#a0785a", pants: "#8a6a4a", skin: "#d9a47a", shoes: "#8a6a4a",
      front: '<path d="M-5.3 10.6l1.6 2 1.6-2 1.6 2 1.6-2 1.6 2 1.6-2" fill="none" stroke="#6b4a2f" stroke-width=".7"/>' }),
    "w-sa-woman": person({ kind: "woman", key: "w-sa-woman", adult: true, hair: "#3a2416", style: "long", shirt: "#a0785a", skirt: "#8a6a4a", long: true, legs: "#d9a47a", skin: "#d9a47a", shoes: "#8a6a4a" }),
    "w-sa-girl": person({ kind: "girl", key: "w-sa-girl", hair: "#3a2416", style: "long", shirt: "#b08a6a", skirt: "#8a6a4a", legs: "#d9a47a", skin: "#d9a47a", shoes: "#8a6a4a" }),
    "w-sa-boy": person({ hair: "#3a2416", shirt: "#b08a6a", pants: "#8a6a4a", skin: "#d9a47a", shoes: "#8a6a4a" }),
    /* ---------- sapling-4: living with little water ---------- */
    // a dry land: sky, far sandy hills and sand (stage units)
    "w-sand": g('<rect width="160" height="90" fill="#e4f1f8" stroke="none"/><path d="M-10 58c30-8 50-10 80-5s60 5 100-2v10H-10z" fill="#e2c48e" stroke="none"/><rect y="58" width="160" height="32" fill="#eed9ae" stroke="none"/>'),
    // an ab-anbar: a domed water store with a windcatcher on each side and steps going down (origin: the ground at its
    // middle). Piece: water (the store cut open under the ground, hidden).
    "w-abanbar": g('<rect x="-32" y="-40" width="8" height="40" fill="#d0ab70"/><rect x="24" y="-40" width="8" height="40" fill="#d0ab70"/>' +
      '<path d="M-31-38v8M-28-38v8M27-38v8M30-38v8" fill="none" stroke="#8a5a3a" stroke-width="1"/>' +
      '<path d="M-20 0v-12a20 20 0 0 1 40 0v12z" fill="#d9b77e"/><path d="M-5 0v-7a5 5 0 0 1 10 0v7z" fill="#8a5a3a"/>' +
      '<g data-part="water" style="opacity:0"><rect x="-22" y="0" width="44" height="16" fill="#c9a06a"/><rect x="-19" y="5" width="38" height="9" fill="#7fc0ea"/><path d="M-4 0l-3 3h4l-3 3h4" fill="none" stroke="#8a5a3a" stroke-width="1"/></g>'),
    // a yakhchal: a tall cone of mud brick over a deep pit, with a long shade wall beside a shallow pool (origin: the
    // ground at the cone's middle). Pieces: ice (the pit cut open, full of ice, hidden); pool (the frozen pool, hidden).
    "w-yakhchal": g('<rect x="26" y="-26" width="44" height="26" fill="#c9a06a"/><path d="M-22 0L-5-46q5-4 10 0L22 0z" fill="#d9b77e"/><path d="M-4 0v-8a4 4 0 0 1 8 0v8z" fill="#8a5a3a"/>' +
      '<g data-part="pool" style="opacity:0"><path d="M24 0h44l-2 3h-40z" fill="#cfeefa"/></g>' +
      '<g data-part="ice" style="opacity:0"><rect x="-20" y="0" width="40" height="18" fill="#c9a06a"/><g fill="#dff3fb" stroke="#9cc8de" stroke-width=".6"><rect x="-17" y="3" width="10" height="6"/><rect x="-5" y="3" width="10" height="6"/><rect x="7" y="3" width="10" height="6"/><rect x="-11" y="10" width="10" height="6"/><rect x="1" y="10" width="10" height="6"/></g></g>')
  });
})();
