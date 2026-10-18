/* باغچه — backdrops for picture stories (the story step's bg: "meadow", "room", …; js/anim.js). Each is the inside
   of an <svg viewBox="0 0 160 90"> that fills the stage (cut at the sides on a tall stage). The ground starts at
   about y = 56 (62% of the stage), so actors placed lower than about 62% stand on it. Details stay small and near
   the edges so they never hide an actor. class="drift" (clouds), "twinkle" (stars), "bob" (waves), "fall" (snow)
   and "spin" move gently; with "reduce motion" on nothing moves. Same style as the drawings (js/art.js). */
var B = window.B || {};
window.B = B;

(function () {
  var cloud = function (x, y, s) {
    return '<g class="drift" style="--d:' + (40 + x % 17) + 's"><path transform="translate(' + x + " " + y + ") scale(" + s + ')" d="M0 6c0-4 4-6 7-4 1-4 7-5 9-1 3-2 7 0 7 4 0 2-2 3-4 3H3c-2 0-3-1-3-2z" fill="#fff" stroke="#3d2c22" stroke-width=".5"/></g>';
  };
  var tuft = function (x, y) {
    return '<path d="M' + x + " " + y + "l-1.5-3M" + x + " " + y + "l0-3.6M" + x + " " + y + 'l1.5-3" stroke="#5a9a45" stroke-width=".7" fill="none"/>';
  };
  var flower = function (x, y, c) {
    return '<g class="sway" style="transform-origin:' + x + "px " + y + 'px"><path d="M' + x + " " + y + "v-4" + '" stroke="#5a9a45" stroke-width=".6"/><circle cx="' + x + '" cy="' + (y - 4.6) + '" r="1.4" fill="' + c + '" stroke="#3d2c22" stroke-width=".4"/><circle cx="' + x + '" cy="' + (y - 4.6) + '" r=".5" fill="#fcd34d" stroke="none"/></g>';
  };
  var sun = '<g transform="translate(20 15)"><g class="spin" fill="#f6b73c"><path d="M0-12l2 4h-4zM0 12l-2-4h4zM-12 0l4-2v4zM12 0l-4 2v-4zM-8.5-8.5l4.2 1.4-2.8 2.8zM8.5 8.5l-4.2-1.4 2.8-2.8zM8.5-8.5l-1.4 4.2-2.8-2.8zM-8.5 8.5l1.4-4.2 2.8 2.8z"/></g><circle r="6.5" fill="#fcd34d" stroke="#3d2c22" stroke-width=".6"/></g>';
  var stars = function (list) {
    return list.map(function (p, i) {
      return '<path class="twinkle" style="animation-delay:' + (i * 0.7) % 3 + 's" d="M' + p[0] + " " + (p[1] - 1.6) + "l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z" + '" fill="#fff3b0"/>';
    }).join("");
  };
  // A Persian-style rug for indoor floors: a border, a field and a medallion.
  var rug = '<g stroke="#3d2c22" stroke-width=".5"><ellipse cx="80" cy="76" rx="54" ry="9" fill="#b5523b"/><ellipse cx="80" cy="76" rx="48" ry="7" fill="#e7c27a" stroke="none"/><ellipse cx="80" cy="76" rx="44" ry="6" fill="#9c3f33"/><path d="M68 76l12-4 12 4-12 4z" fill="#e7c27a"/><circle cx="80" cy="76" r="1.6" fill="#3f6f8f" stroke="none"/></g>';
  var window_ = function (x, y, night) {
    return '<g stroke="#3d2c22" stroke-width=".7"><rect x="' + x + '" y="' + y + '" width="26" height="22" rx="2" fill="#fff"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="22" height="18" fill="' + (night ? "#2e3f72" : "#bfe3f5") + '"/>' +
      (night ? '<circle cx="' + (x + 17) + '" cy="' + (y + 7) + '" r="2.5" fill="#fff3b0" stroke="none"/>' : '<path d="M' + (x + 4) + " " + (y + 9) + "c0-2 2-3 3.5-2 1-2 4-2 4.5 0 2 0 3 1 2 2h-10z" + '" fill="#fff" stroke="none"/>') +
      '<path d="M' + (x + 13) + " " + (y + 2) + "v18M" + (x + 2) + " " + (y + 11) + 'h22" fill="none"/></g>';
  };

  B.SCENES = {
    // Outdoors on a sunny day: sky, far hills, grass, a few flowers. The default when a story has no bg.
    meadow: '<rect width="160" height="90" fill="#cdeaf7"/>' + sun + cloud(46, 10, 1) + cloud(104, 6, 0.8) + cloud(132, 18, 0.6) +
      '<path d="M0 56c20-10 40-12 60-6s40 2 58-6 32-4 42 2v44H0z" fill="#a9d68b" stroke="#3d2c22" stroke-width=".5"/>' +
      '<path d="M0 60c30-4 60-4 90 0s50 2 70-2v32H0z" fill="#8cc66b" stroke="none"/>' +
      tuft(10, 80) + tuft(150, 84) + tuft(40, 86) + tuft(120, 70) + flower(6, 72, "#f28b82") + flower(154, 74, "#f6b73c") + flower(146, 88, "#c49bd8") + flower(16, 88, "#fff"),
    // A garden or park: the meadow with a tree at each side and a little path.
    garden: '<rect width="160" height="90" fill="#cdeaf7"/>' + sun + cloud(70, 8, 0.9) + cloud(118, 14, 0.7) +
      '<path d="M0 56h160v34H0z" fill="#8cc66b" stroke="none"/><path d="M0 56c40-3 120-3 160 0" fill="none" stroke="#3d2c22" stroke-width=".5"/>' +
      '<path d="M66 90c4-14 10-26 14-34h4c2 8 6 20 12 34z" fill="#e8d5a8" stroke="none"/>' +
      '<g class="sway" style="transform-origin:8px 60px" stroke="#3d2c22" stroke-width=".6"><path d="M6 60h4l-.5-14h-3z" fill="#9a6b45"/><circle cx="8" cy="36" r="12" fill="#5fae5a"/><circle cx="3" cy="40" r="2" fill="#e5483f" stroke="none"/><circle cx="12" cy="32" r="2" fill="#e5483f" stroke="none"/></g>' +
      '<g class="sway" style="transform-origin:153px 62px" stroke="#3d2c22" stroke-width=".6"><path d="M151 62h4l-.5-12h-3z" fill="#9a6b45"/><circle cx="153" cy="40" r="13" fill="#6dbb63"/></g>' +
      tuft(30, 78) + tuft(130, 84) + flower(22, 88, "#f28b82") + flower(140, 76, "#f6b73c") + flower(36, 70, "#c49bd8"),
    // Night outside: dark blue sky, moon, twinkling stars, dark hills.
    night: '<rect width="160" height="90" fill="#26365f"/>' + stars([[40, 10], [62, 22], [90, 8], [112, 26], [132, 12], [150, 30], [28, 30], [76, 34]]) +
      '<g transform="translate(20 15)"><circle r="7" fill="#fff3b0" stroke="#3d2c22" stroke-width=".6"/><circle cx="3" cy="-2" r="6.4" fill="#26365f" stroke="none"/></g>' +
      '<path d="M0 58c24-10 46-10 66-4s44 0 62-6 26-2 32 2v40H0z" fill="#3c5a52" stroke="#1d2a40" stroke-width=".5"/><path d="M0 64c40-4 90-4 160 0v26H0z" fill="#33503f" stroke="none"/>',
    // Inside a home: a warm wall, a window, a wooden floor and a Persian rug.
    room: '<rect width="160" height="90" fill="#f6e3c6"/><g fill="#efd3ad" stroke="none">' +
      [12, 36, 60, 84, 108, 132, 156].map(function (x) { return '<circle cx="' + x + '" cy="12" r="1.2"/><circle cx="' + (x - 12) + '" cy="30" r="1.2"/><circle cx="' + x + '" cy="48" r="1.2"/>'; }).join("") + "</g>" +
      window_(16, 12) + '<g stroke="#3d2c22" stroke-width=".6"><rect x="122" y="14" width="18" height="14" rx="1" fill="#c9893b"/><rect x="124.5" y="16.5" width="13" height="9" fill="#bfe3f5"/><path d="M125 25l4-4 3 3 2-2 3 3z" fill="#8cc66b" stroke="none"/></g>' +
      '<path d="M0 56h160v34H0z" fill="#d9a86c" stroke="none"/><path d="M0 56h160" stroke="#3d2c22" stroke-width=".6"/><path d="M0 66h160M0 78h160" stroke="#c08f55" stroke-width=".5"/>' + rug,
    // A bedroom at night, for sleep stories: the room with a night window and a dimmer wall.
    bedroom: '<rect width="160" height="90" fill="#c9c2e0"/>' + window_(16, 12, true) +
      '<path d="M0 56h160v34H0z" fill="#b48a68" stroke="none"/><path d="M0 56h160" stroke="#3d2c22" stroke-width=".6"/>' + rug,
    // A kitchen: tiles, a shelf with jars and a counter at the back.
    kitchen: '<rect width="160" height="90" fill="#e4f1ec"/><g stroke="#cfe2da" stroke-width=".5">' +
      [10, 20, 30, 40, 50].map(function (y) { return '<path d="M0 ' + y + 'h160"/>'; }).join("") +
      [10, 30, 50, 70, 90, 110, 130, 150].map(function (x) { return '<path d="M' + x + ' 0v50"/>'; }).join("") + "</g>" +
      '<g stroke="#3d2c22" stroke-width=".6"><path d="M8 20h44" stroke-width="1.4"/><rect x="12" y="12" width="7" height="8" rx="1.5" fill="#f6b73c"/><rect x="23" y="10" width="7" height="10" rx="1.5" fill="#e5483f"/><rect x="34" y="13" width="7" height="7" rx="1.5" fill="#8cc66b"/>' +
      '<path d="M108 22h40v12h-40z" fill="#fff"/><path d="M128 22v12" fill="none"/>' +
      window_(70, 8) + '<path d="M0 46h160v8H0z" fill="#c98f63"/></g>' +
      '<path d="M0 54h160v36H0z" fill="#f3ead8" stroke="none"/><g stroke="#ddd0b8" stroke-width=".5">' +
      [0, 16, 32, 48, 64, 80, 96, 112, 128, 144].map(function (x, i) { return '<path d="M' + x + ' 54l' + (i * 3 - 14) + ' 36"/>'; }).join("") + '<path d="M0 68h160M0 82h160"/></g>',
    // A classroom: a green board with no writing, a clock and a floor.
    school: '<rect width="160" height="90" fill="#f2ecd8"/><g stroke="#3d2c22" stroke-width=".7"><rect x="40" y="8" width="80" height="34" rx="2" fill="#9a6b45"/><rect x="43" y="11" width="74" height="28" fill="#3f6f55"/>' +
      '<path d="M50 20c6-3 12 3 18 0M50 28c10-3 20 3 30 0" stroke="#e7efe9" stroke-width=".8" fill="none" opacity=".6"/>' +
      '<circle cx="138" cy="18" r="7" fill="#fff"/><path d="M138 18v-4.5M138 18l3 2" fill="none"/>' +
      '<path d="M8 10h20v28H8z" fill="#fff"/><path d="M12 30l4-8 4 5 3-3 3 6z" fill="#8cc66b" stroke="none"/><circle cx="22" cy="16" r="2" fill="#fcd34d" stroke="none"/></g>' +
      '<path d="M0 56h160v34H0z" fill="#d4b48c" stroke="none"/><path d="M0 56h160" stroke="#3d2c22" stroke-width=".6"/>',
    // The seaside: sky, sea with moving waves, a sandy beach.
    sea: '<rect width="160" height="90" fill="#cdeaf7"/>' + sun + cloud(70, 10, 0.9) + cloud(124, 6, 0.7) +
      '<path d="M0 44h160v26H0z" fill="#5fb0d8" stroke="none"/><path d="M0 44h160" stroke="#3d2c22" stroke-width=".5"/>' +
      '<g class="bob" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"><path d="M14 52c3-2 6 2 9 0M58 50c3-2 6 2 9 0M104 54c3-2 6 2 9 0M136 49c3-2 6 2 9 0M36 60c3-2 6 2 9 0M84 62c3-2 6 2 9 0"/></g>' +
      '<path d="M0 70c30-4 60 2 90-2s50 0 70 2v20H0z" fill="#f1dfb0" stroke="#3d2c22" stroke-width=".5"/>' +
      '<g stroke="#3d2c22" stroke-width=".5"><path d="M18 82l3-3 3 3-3 1z" fill="#f28b82"/><circle cx="142" cy="84" r="2" fill="#fff"/></g>',
    // A street: houses far away, a pavement and a road.
    street: '<rect width="160" height="90" fill="#cdeaf7"/>' + sun + cloud(60, 8, 0.8) + cloud(120, 12, 0.7) +
      '<g stroke="#3d2c22" stroke-width=".6"><path d="M38 52V30l10-8 10 8v22z" fill="#f2c88f"/><path d="M60 52V34h18v18z" fill="#e8a39b"/><path d="M80 52V26h14v26z" fill="#b7d4e8"/><path d="M96 52V36l9-7 9 7v16z" fill="#f6d77a"/>' +
      '<path d="M43 36h4v4h-4zM50 36h4v4h-4zM65 40h4v4h-4zM84 32h6v4h-6zM84 40h6v4h-6zM103 40h4v5h-4z" fill="#fff"/></g>' +
      '<path d="M0 52h160v8H0z" fill="#d8d3c8" stroke="#3d2c22" stroke-width=".5"/><path d="M0 60h160v30H0z" fill="#8a8f96" stroke="none"/>' +
      '<path d="M6 75h16M38 75h16M70 75h16M102 75h16M134 75h16" stroke="#fff" stroke-width="1.6"/>',
    // Snowy winter day.
    snow: '<rect width="160" height="90" fill="#dfeaf3"/>' + cloud(30, 8, 1) + cloud(110, 6, 1.1) +
      '<path d="M0 56c30-6 60-6 90-2s50 0 70-2v38H0z" fill="#fff" stroke="#3d2c22" stroke-width=".5"/>' +
      '<g class="fall" fill="#fff" stroke="#9fb3c4" stroke-width=".3">' + [[20, 20], [44, 34], [70, 18], [96, 30], [122, 22], [146, 36], [58, 44], [134, 46], [10, 42]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.2"/>'; }).join("") + "</g>",
    // In the sky: only sky and clouds, for things that fly.
    sky: '<rect width="160" height="90" fill="#bfe3f5"/>' + sun + cloud(50, 30, 1.2) + cloud(110, 14, 1) + cloud(130, 60, 1.1) + cloud(20, 66, 0.9)
  };

  // The backdrop, as an <svg> that fills the stage behind the actors; null for an unknown name.
  B.sceneNode = function (name) {
    if (!B.SCENES[name]) return null;
    var wrap = document.createElement("div");
    wrap.className = "backdrop";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" focusable="false"><g stroke-linejoin="round" stroke-linecap="round">' + B.SCENES[name] + "</g></svg>";
    return wrap;
  };
})();
