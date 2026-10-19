/* Builds js/maps/iran.js (the outline map of Iran for the `map` step) from Natural Earth.
   Only needed when the map data changes; the site itself never runs it and makes no outside requests.

   1. Download these Natural Earth 1:10m files (public domain) into one folder, e.g. from
      https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
        ne_10m_admin_1_states_provinces.geojson   (Iran's provinces)
        ne_10m_admin_0_countries.geojson          (the neighbours: Natural Earth's de facto borders)
        ne_10m_populated_places_simple.geojson    (only to check city positions; the cities below are listed by hand)
   2. Install mapshaper (a development tool only): npm i mapshaper
   3. node tools/build-iran-map.js <folder with the files> <path to the mapshaper command>

   What it does: keeps Iran's 31 provinces and the countries around them, clips to the region, drops islands
   smaller than Kish, projects (Lambert conformal conic centred on Iran), simplifies with shared borders kept
   (mapshaper, 4% of the points), and writes whole-number SVG paths in a 400-wide viewBox. Province names are the
   ones Iranian schools use; neighbours get no names here (they are plain shapes). */
var fs = require("fs");
var path = require("path");
var os = require("os");
var cp = require("child_process");

var dir = process.argv[2], mapshaper = process.argv[3] || "mapshaper";
if (!dir) { console.error("usage: node tools/build-iran-map.js <natural-earth folder> [mapshaper]"); process.exit(1); }
var root = path.join(__dirname, "..");
var read = function (f) { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); };

// Natural Earth name → [id, Persian name, English name]
var PROV = {
  "Tehran": ["tehran", "تهران", "Tehran"], "Alborz": ["alborz", "البرز", "Alborz"], "Qom": ["qom", "قم", "Qom"],
  "Markazi": ["markazi", "مرکزی", "Markazi"], "Qazvin": ["qazvin", "قزوین", "Qazvin"], "Zanjan": ["zanjan", "زنجان", "Zanjan"],
  "Gilan": ["gilan", "گیلان", "Gilan"], "Mazandaran": ["mazandaran", "مازندران", "Mazandaran"], "Golestan": ["golestan", "گلستان", "Golestan"],
  "Semnan": ["semnan", "سمنان", "Semnan"], "East Azarbaijan": ["east-azerbaijan", "آذربایجان شرقی", "East Azerbaijan"],
  "West Azarbaijan": ["west-azerbaijan", "آذربایجان غربی", "West Azerbaijan"], "Ardebil": ["ardabil", "اردبیل", "Ardabil"],
  "Kordestan": ["kurdistan", "کردستان", "Kurdistan"], "Kermanshah": ["kermanshah", "کرمانشاه", "Kermanshah"],
  "Hamadan": ["hamadan", "همدان", "Hamadan"], "Ilam": ["ilam", "ایلام", "Ilam"], "Lorestan": ["lorestan", "لرستان", "Lorestan"],
  "Khuzestan": ["khuzestan", "خوزستان", "Khuzestan"], "Chahar Mahall and Bakhtiari": ["chaharmahal-bakhtiari", "چهارمحال و بختیاری", "Chaharmahal and Bakhtiari"],
  "Kohgiluyeh and Buyer Ahmad": ["kohgiluyeh-boyerahmad", "کهگیلویه و بویراحمد", "Kohgiluyeh and Boyer-Ahmad"],
  "Esfahan": ["isfahan", "اصفهان", "Isfahan"], "Fars": ["fars", "فارس", "Fars"], "Bushehr": ["bushehr", "بوشهر", "Bushehr"],
  "Hormozgan": ["hormozgan", "هرمزگان", "Hormozgan"], "Kerman": ["kerman", "کرمان", "Kerman"], "Yazd": ["yazd", "یزد", "Yazd"],
  "Sistan and Baluchestan": ["sistan-baluchestan", "سیستان و بلوچستان", "Sistan and Baluchestan"],
  "South Khorasan": ["south-khorasan", "خراسان جنوبی", "South Khorasan"], "Razavi Khorasan": ["razavi-khorasan", "خراسان رضوی", "Razavi Khorasan"],
  "North Khorasan": ["north-khorasan", "خراسان شمالی", "North Khorasan"]
};
// Provincial centres (and a few other cities): id, Persian, English, province id, [lon, lat] (Natural Earth populated places)
var CITIES = [
  ["tehran", "تهران", "Tehran", "tehran", [51.42, 35.67]], ["karaj", "کرج", "Karaj", "alborz", [50.97, 35.80]],
  ["qom", "قم", "Qom", "qom", [50.95, 34.65]], ["arak", "اراک", "Arak", "markazi", [49.70, 34.08]],
  ["qazvin", "قزوین", "Qazvin", "qazvin", [50.00, 36.27]], ["zanjan", "زنجان", "Zanjan", "zanjan", [48.50, 36.67]],
  ["rasht", "رشت", "Rasht", "gilan", [49.63, 37.30]], ["sari", "ساری", "Sari", "mazandaran", [53.10, 36.55]],
  ["gorgan", "گرگان", "Gorgan", "golestan", [54.48, 36.83]], ["semnan", "سمنان", "Semnan", "semnan", [53.37, 35.55]],
  ["tabriz", "تبریز", "Tabriz", "east-azerbaijan", [46.30, 38.09]], ["urmia", "ارومیه", "Urmia", "west-azerbaijan", [45.00, 37.53]],
  ["ardabil", "اردبیل", "Ardabil", "ardabil", [48.30, 38.25]], ["sanandaj", "سنندج", "Sanandaj", "kurdistan", [47.02, 35.30]],
  ["kermanshah", "کرمانشاه", "Kermanshah", "kermanshah", [47.06, 34.38]], ["hamadan", "همدان", "Hamadan", "hamadan", [48.52, 34.80]],
  ["ilam", "ایلام", "Ilam", "ilam", [46.43, 33.63]], ["khorramabad", "خرم‌آباد", "Khorramabad", "lorestan", [48.35, 33.48]],
  ["ahvaz", "اهواز", "Ahvaz", "khuzestan", [48.72, 31.28]], ["shahrekord", "شهرکرد", "Shahrekord", "chaharmahal-bakhtiari", [50.85, 32.32]],
  ["yasuj", "یاسوج", "Yasuj", "kohgiluyeh-boyerahmad", [51.59, 30.66]], ["isfahan", "اصفهان", "Isfahan", "isfahan", [51.70, 32.70]],
  ["shiraz", "شیراز", "Shiraz", "fars", [52.57, 29.63]], ["bushehr", "بوشهر", "Bushehr", "bushehr", [50.83, 28.92]],
  ["bandar-abbas", "بندرعباس", "Bandar Abbas", "hormozgan", [56.27, 27.20]], ["kerman", "کرمان", "Kerman", "kerman", [57.08, 30.30]],
  ["yazd", "یزد", "Yazd", "yazd", [54.37, 31.92]], ["zahedan", "زاهدان", "Zahedan", "sistan-baluchestan", [60.83, 29.50]],
  ["birjand", "بیرجند", "Birjand", "south-khorasan", [59.22, 32.88]], ["mashhad", "مشهد", "Mashhad", "razavi-khorasan", [59.57, 36.27]],
  ["bojnurd", "بجنورد", "Bojnurd", "north-khorasan", [57.32, 37.47]],
  ["chabahar", "چابهار", "Chabahar", "sistan-baluchestan", [60.63, 25.30], true]
];
// Seas, named as in Iranian schools; [lon, lat] is where the name and the 🌊 go.
var SEAS = [
  ["caspian", "دریای خزر", "Caspian Sea", [51.2, 39.6]],
  ["persian-gulf", "خلیج فارس", "Persian Gulf", [51.6, 27.0]],
  ["oman-sea", "دریای عمان", "Sea of Oman", [58.9, 24.6]]
];

var feats = [];
read("ne_10m_admin_1_states_provinces.geojson").features.filter(function (f) { return f.properties.adm0_a3 === "IRN"; }).forEach(function (f) {
  var p = PROV[f.properties.name];
  if (!p) throw new Error("unknown province " + f.properties.name);
  feats.push({ type: "Feature", properties: { kind: "prov", id: p[0] }, geometry: f.geometry });
});
read("ne_10m_admin_0_countries.geojson").features.filter(function (f) { return f.properties.ADM0_A3 !== "IRN"; }).forEach(function (f) {
  feats.push({ type: "Feature", properties: { kind: "abroad", id: f.properties.ADM0_A3 }, geometry: f.geometry });
});
CITIES.forEach(function (c) { feats.push({ type: "Feature", properties: { kind: "city", id: c[0] }, geometry: { type: "Point", coordinates: c[4] } }); });
SEAS.forEach(function (s) { feats.push({ type: "Feature", properties: { kind: "sea", id: s[0] }, geometry: { type: "Point", coordinates: s[3] } }); });

var tmp = fs.mkdtempSync(path.join(os.tmpdir(), "iran-map-"));
fs.writeFileSync(path.join(tmp, "in.json"), JSON.stringify({ type: "FeatureCollection", features: feats }));
cp.execFileSync(mapshaper, ["in.json", "snap", "-clip", "bbox=42.6,23.3,66,40.8", "-filter-islands", "min-area=85km2",
  "-proj", "+proj=lcc +lat_1=28 +lat_2=36 +lat_0=32 +lon_0=53.5", "-simplify", "4%", "keep-shapes", "planar",
  "-o", "format=geojson", "combine-layers", "precision=100", "out.json"], { cwd: tmp, stdio: "inherit" });
var g = JSON.parse(fs.readFileSync(path.join(tmp, "out.json"), "utf8"));

function polys(geom) { return geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates; }
var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
g.features.forEach(function (f) {
  if (!f.geometry || f.geometry.type === "Point") return;
  polys(f.geometry).forEach(function (p) { p.forEach(function (r) { r.forEach(function (c) {
    x0 = Math.min(x0, c[0]); x1 = Math.max(x1, c[0]); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
  }); }); });
});
var W = 400, k = W / (x1 - x0), H = Math.round((y1 - y0) * k);
function T(c) { return [Math.round((c[0] - x0) * k), Math.round((y1 - c[1]) * k)]; }
function pathOf(geom) {
  return polys(geom).map(function (poly) { return poly.map(function (ring) {
    var out = [];
    ring.map(T).forEach(function (p) { var l = out[out.length - 1]; if (!l || l[0] !== p[0] || l[1] !== p[1]) out.push(p); });
    if (out.length > 1 && out[0][0] === out[out.length - 1][0] && out[0][1] === out[out.length - 1][1]) out.pop();
    return out.length < 3 ? "" : "M" + out.map(function (p) { return p.join(" "); }).join("L") + "Z";
  }).join(""); }).join("");
}
// Where a province's ring and name go: the inside point farthest from its edges (a coarse grid search).
function inside(pt, r) {
  var c = false;
  for (var i = 0, j = r.length - 1; i < r.length; j = i++)
    if ((r[i][1] > pt[1]) !== (r[j][1] > pt[1]) && pt[0] < (r[j][0] - r[i][0]) * (pt[1] - r[i][1]) / (r[j][1] - r[i][1]) + r[i][0]) c = !c;
  return c;
}
function segd(p, a, b) {
  var dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1);
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
function labelAt(geom) {
  var best = null, bd = -1;
  polys(geom).forEach(function (poly) {
    var rings = poly.map(function (r) { return r.map(T); }), o = rings[0];
    var a = Math.min.apply(null, o.map(function (p) { return p[0]; })), c = Math.max.apply(null, o.map(function (p) { return p[0]; }));
    var b = Math.min.apply(null, o.map(function (p) { return p[1]; })), d = Math.max.apply(null, o.map(function (p) { return p[1]; }));
    for (var x = a; x <= c; x += 0.5) for (var y = b; y <= d; y += 0.5) {
      var p = [x, y];
      if (!inside(p, o) || rings.slice(1).some(function (r) { return inside(p, r); })) continue;
      var m = Infinity;
      rings.forEach(function (r) { for (var i = 0; i < r.length; i++) m = Math.min(m, segd(p, r[i], r[(i + 1) % r.length])); });
      if (m > bd) { bd = m; best = [Math.round(x), Math.round(y)]; }
    }
  });
  return best;
}

var byId = {};
g.features.forEach(function (f) { byId[f.properties.kind + ":" + f.properties.id] = f; });
var abroad = g.features.filter(function (f) { return f.properties.kind === "abroad" && f.geometry; })
  .map(function (f) { return pathOf(f.geometry); }).filter(Boolean);
var provs = Object.keys(PROV).map(function (n) {
  var p = PROV[n], f = byId["prov:" + p[0]];
  return { id: p[0], name: p[1], en: p[2], at: labelAt(f.geometry), d: pathOf(f.geometry) };
}).sort(function (a, b) { return a.at[1] - b.at[1] || a.at[0] - b.at[0]; });
var cities = CITIES.map(function (c) {
  var o = { id: c[0], name: c[1], en: c[2], prov: c[3], at: T(byId["city:" + c[0]].geometry.coordinates) };
  if (!c[5]) o.centre = true;
  return o;
});
var seas = SEAS.map(function (s) { return { id: s[0], name: s[1], en: s[2], at: T(byId["sea:" + s[0]].geometry.coordinates) }; });

function q(v) { return JSON.stringify(v); }
var src = "/* باغچه — the outline map of Iran for the `map` step (js/steps/world.js): Iran's 31 provinces, the Caspian Sea,\n" +
  "   the Persian Gulf and the Sea of Oman, the countries around Iran as plain shapes (no names), and the provincial\n" +
  "   centres. Generated by tools/build-iran-map.js; do not edit the paths by hand.\n" +
  "   Source: Natural Earth 1:10m Cultural Vectors (admin 0 countries, admin 1 states and provinces, populated places),\n" +
  "   naturalearthdata.com, public domain (\"No permission is needed to use Natural Earth\"). Borders are Natural\n" +
  "   Earth's de facto borders; disputed areas get no names. Simplified (mapshaper, 4% of points, shared borders\n" +
  "   kept), Lambert conformal conic projection centred on Iran, viewBox " + W + " × " + H + ".\n" +
  "   Names are the ones used in Iran's schools. Checked by a geography teacher before publishing. */\n" +
  "var B = window.B || {};\nwindow.B = B;\nB.MAPS = B.MAPS || {};\n\n" +
  "B.MAPS.iran = {\n  view: " + q([W, H]) + ",\n  bg: \"sea\",\n" +
  "  // where the whole of Iran is named when it is one place (\"layers: ['iran']\")\n  iranAt: " + q(labelAt(byId["prov:isfahan"].geometry)) + ",\n" +
  "  abroad: [\n" + abroad.map(function (d) { return "    " + q(d); }).join(",\n") + "\n  ],\n" +
  "  provinces: [\n" + provs.map(function (p) { return "    " + q(p); }).join(",\n") + "\n  ],\n" +
  "  seas: [\n" + seas.map(function (s) { return "    " + q(s); }).join(",\n") + "\n  ],\n" +
  "  cities: [\n" + cities.map(function (c) { return "    " + q(c); }).join(",\n") + "\n  ]\n};\n";
src = src.replace(/"(\w+)":/g, "$1:");
fs.mkdirSync(path.join(root, "js", "maps"), { recursive: true });
fs.writeFileSync(path.join(root, "js", "maps", "iran.js"), src);
console.log("js/maps/iran.js: " + src.length + " bytes, viewBox " + W + " × " + H);
