/* Builds js/maps/world.js (the world: continents, oceans, countries) and js/maps/region.js (Iran and its
   neighbours) for the `map` step, from Natural Earth. Only needed when the map data changes; the site itself never
   runs it and makes no outside requests.

   1. Download these Natural Earth files (public domain) into one folder, e.g. from
      https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
        ne_110m_admin_0_countries.geojson   (the world)
        ne_10m_admin_0_countries.geojson    (the region)
   2. Install mapshaper (a development tool only): npm i mapshaper
   3. node tools/build-world-map.js <folder with the files> <path to the mapshaper command>

   Borders are Natural Earth's de facto borders. Only the countries listed in COUNTRIES get a name (a chosen set:
   Iran's neighbours, then some countries on every continent); every other country, and every disputed or
   breakaway area, is a plain shape with no name. Names are the ones used in Iran's schools. Capitals are listed
   by hand ([lon, lat], checked against Natural Earth's populated places). */
var fs = require("fs");
var path = require("path");
var os = require("os");
var cp = require("child_process");

var dir = process.argv[2], mapshaper = process.argv[3] || "mapshaper";
if (!dir) { console.error("usage: node tools/build-world-map.js <natural-earth folder> [mapshaper]"); process.exit(1); }
var root = path.join(__dirname, "..");
var read = function (f) { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); };

// ADM0_A3 → [id (the flag's code, ISO 3166 two letters), Persian, English, capital Persian, capital English, [lon, lat],
//            neighbour of Iran: "land" or "sea"]
var COUNTRIES = {
  IRN: ["iran", "ایران", "Iran", "تهران", "Tehran", [51.42, 35.69]],
  // Iran's neighbours by land, then across the sea
  IRQ: ["iq", "عراق", "Iraq", "بغداد", "Baghdad", [44.39, 33.34], "land"],
  TUR: ["tr", "ترکیه", "Turkey", "آنکارا", "Ankara", [32.86, 39.93], "land"],
  ARM: ["am", "ارمنستان", "Armenia", "ایروان", "Yerevan", [44.51, 40.18], "land"],
  AZE: ["az", "جمهوری آذربایجان", "Azerbaijan", "باکو", "Baku", [49.87, 40.41], "land"],
  TKM: ["tm", "ترکمنستان", "Turkmenistan", "عشق‌آباد", "Ashgabat", [58.38, 37.95], "land"],
  AFG: ["af", "افغانستان", "Afghanistan", "کابل", "Kabul", [69.18, 34.53], "land"],
  PAK: ["pk", "پاکستان", "Pakistan", "اسلام‌آباد", "Islamabad", [73.06, 33.69], "land"],
  KAZ: ["kz", "قزاقستان", "Kazakhstan", "آستانه", "Astana", [71.45, 51.17], "sea"],
  RUS: ["ru", "روسیه", "Russia", "مسکو", "Moscow", [37.62, 55.75], "sea"],
  KWT: ["kw", "کویت", "Kuwait", "کویت", "Kuwait City", [47.98, 29.37], "sea"],
  SAU: ["sa", "عربستان سعودی", "Saudi Arabia", "ریاض", "Riyadh", [46.72, 24.69], "sea"],
  BHR: ["bh", "بحرین", "Bahrain", "منامه", "Manama", [50.58, 26.22], "sea"],
  QAT: ["qa", "قطر", "Qatar", "دوحه", "Doha", [51.53, 25.29], "sea"],
  ARE: ["ae", "امارات متحده عربی", "United Arab Emirates", "ابوظبی", "Abu Dhabi", [54.37, 24.47], "sea"],
  OMN: ["om", "عمان", "Oman", "مسقط", "Muscat", [58.41, 23.61], "sea"],
  // Asia
  SYR: ["sy", "سوریه", "Syria", "دمشق", "Damascus", [36.29, 33.51]],
  JOR: ["jo", "اردن", "Jordan", "امان", "Amman", [35.93, 31.95]],
  LBN: ["lb", "لبنان", "Lebanon", "بیروت", "Beirut", [35.50, 33.89]],
  YEM: ["ye", "یمن", "Yemen", "صنعا", "Sanaa", [44.21, 15.35]],
  GEO: ["ge", "گرجستان", "Georgia", "تفلیس", "Tbilisi", [44.79, 41.72]],
  UZB: ["uz", "ازبکستان", "Uzbekistan", "تاشکند", "Tashkent", [69.24, 41.31]],
  TJK: ["tj", "تاجیکستان", "Tajikistan", "دوشنبه", "Dushanbe", [68.77, 38.56]],
  KGZ: ["kg", "قرقیزستان", "Kyrgyzstan", "بیشکک", "Bishkek", [74.59, 42.87]],
  IND: ["in", "هند", "India", "دهلی نو", "New Delhi", [77.21, 28.61]],
  CHN: ["cn", "چین", "China", "پکن", "Beijing", [116.39, 39.91]],
  JPN: ["jp", "ژاپن", "Japan", "توکیو", "Tokyo", [139.69, 35.69]],
  KOR: ["kr", "کره جنوبی", "South Korea", "سئول", "Seoul", [126.98, 37.57]],
  MNG: ["mn", "مغولستان", "Mongolia", "اولان‌باتور", "Ulaanbaatar", [106.91, 47.92]],
  NPL: ["np", "نپال", "Nepal", "کاتماندو", "Kathmandu", [85.32, 27.72]],
  BGD: ["bd", "بنگلادش", "Bangladesh", "داکا", "Dhaka", [90.41, 23.81]],
  LKA: ["lk", "سریلانکا", "Sri Lanka", "کلمبو", "Colombo", [79.86, 6.93]],
  THA: ["th", "تایلند", "Thailand", "بانکوک", "Bangkok", [100.50, 13.75]],
  VNM: ["vn", "ویتنام", "Vietnam", "هانوی", "Hanoi", [105.85, 21.03]],
  MYS: ["my", "مالزی", "Malaysia", "کوالالامپور", "Kuala Lumpur", [101.69, 3.14]],
  IDN: ["id", "اندونزی", "Indonesia", "جاکارتا", "Jakarta", [106.85, -6.21]],
  PHL: ["ph", "فیلیپین", "Philippines", "مانیل", "Manila", [120.98, 14.60]],
  // Europe
  GBR: ["gb", "بریتانیا", "United Kingdom", "لندن", "London", [-0.13, 51.51]],
  IRL: ["ie", "ایرلند", "Ireland", "دوبلین", "Dublin", [-6.26, 53.35]],
  FRA: ["fr", "فرانسه", "France", "پاریس", "Paris", [2.35, 48.86]],
  ESP: ["es", "اسپانیا", "Spain", "مادرید", "Madrid", [-3.70, 40.42]],
  PRT: ["pt", "پرتغال", "Portugal", "لیسبون", "Lisbon", [-9.14, 38.72]],
  DEU: ["de", "آلمان", "Germany", "برلین", "Berlin", [13.40, 52.52]],
  NLD: ["nl", "هلند", "Netherlands", "آمستردام", "Amsterdam", [4.90, 52.37]],
  CHE: ["ch", "سوئیس", "Switzerland", "برن", "Bern", [7.45, 46.95]],
  AUT: ["at", "اتریش", "Austria", "وین", "Vienna", [16.37, 48.21]],
  ITA: ["it", "ایتالیا", "Italy", "رم", "Rome", [12.50, 41.90]],
  GRC: ["gr", "یونان", "Greece", "آتن", "Athens", [23.73, 37.98]],
  POL: ["pl", "لهستان", "Poland", "ورشو", "Warsaw", [21.01, 52.23]],
  UKR: ["ua", "اوکراین", "Ukraine", "کی‌یف", "Kyiv", [30.52, 50.45]],
  DNK: ["dk", "دانمارک", "Denmark", "کپنهاگ", "Copenhagen", [12.57, 55.68]],
  NOR: ["no", "نروژ", "Norway", "اسلو", "Oslo", [10.75, 59.91]],
  SWE: ["se", "سوئد", "Sweden", "استکهلم", "Stockholm", [18.07, 59.33]],
  FIN: ["fi", "فنلاند", "Finland", "هلسینکی", "Helsinki", [24.94, 60.17]],
  ISL: ["is", "ایسلند", "Iceland", "ریکیاویک", "Reykjavik", [-21.94, 64.15]],
  // Africa
  EGY: ["eg", "مصر", "Egypt", "قاهره", "Cairo", [31.24, 30.04]],
  MAR: ["ma", "مراکش", "Morocco", "رباط", "Rabat", [-6.84, 34.02]],
  DZA: ["dz", "الجزایر", "Algeria", "الجزیره", "Algiers", [3.06, 36.75]],
  TUN: ["tn", "تونس", "Tunisia", "تونس", "Tunis", [10.18, 36.81]],
  SEN: ["sn", "سنگال", "Senegal", "داکار", "Dakar", [-17.45, 14.69]],
  MLI: ["ml", "مالی", "Mali", "باماکو", "Bamako", [-8.00, 12.64]],
  GHA: ["gh", "غنا", "Ghana", "آکرا", "Accra", [-0.19, 5.60]],
  NGA: ["ng", "نیجریه", "Nigeria", "ابوجا", "Abuja", [7.49, 9.06]],
  ETH: ["et", "اتیوپی", "Ethiopia", "آدیس‌آبابا", "Addis Ababa", [38.75, 9.03]],
  KEN: ["ke", "کنیا", "Kenya", "نایروبی", "Nairobi", [36.82, -1.29]],
  TZA: ["tz", "تانزانیا", "Tanzania", "دودوما", "Dodoma", [35.74, -6.16]],
  ZAF: ["za", "آفریقای جنوبی", "South Africa", "پرتوریا", "Pretoria", [28.19, -25.75]],
  MDG: ["mg", "ماداگاسکار", "Madagascar", "آنتاناناریوو", "Antananarivo", [47.52, -18.88]],
  // the Americas
  CAN: ["ca", "کانادا", "Canada", "اتاوا", "Ottawa", [-75.70, 45.42]],
  USA: ["us", "ایالات متحده آمریکا", "United States", "واشینگتن", "Washington", [-77.04, 38.90]],
  MEX: ["mx", "مکزیک", "Mexico", "مکزیکوسیتی", "Mexico City", [-99.13, 19.43]],
  CUB: ["cu", "کوبا", "Cuba", "هاوانا", "Havana", [-82.37, 23.11]],
  COL: ["co", "کلمبیا", "Colombia", "بوگوتا", "Bogotá", [-74.07, 4.71]],
  VEN: ["ve", "ونزوئلا", "Venezuela", "کاراکاس", "Caracas", [-66.90, 10.48]],
  PER: ["pe", "پرو", "Peru", "لیما", "Lima", [-77.04, -12.05]],
  BRA: ["br", "برزیل", "Brazil", "برازیلیا", "Brasília", [-47.88, -15.79]],
  CHL: ["cl", "شیلی", "Chile", "سانتیاگو", "Santiago", [-70.67, -33.45]],
  ARG: ["ar", "آرژانتین", "Argentina", "بوئنوس‌آیرس", "Buenos Aires", [-58.38, -34.60]],
  // Oceania
  AUS: ["au", "استرالیا", "Australia", "کانبرا", "Canberra", [149.13, -35.28]],
  NZL: ["nz", "نیوزیلند", "New Zealand", "ولینگتون", "Wellington", [174.78, -41.29]]
};
// Natural Earth continent → [id, Persian, English, [lon, lat] where its name goes]
var CONTINENTS = {
  "Asia": ["asia", "آسیا", "Asia", [88, 46]],
  "Europe": ["europe", "اروپا", "Europe", [18, 52]],
  "Africa": ["africa", "آفریقا", "Africa", [20, 6]],
  "North America": ["north-america", "آمریکای شمالی", "North America", [-100, 44]],
  "South America": ["south-america", "آمریکای جنوبی", "South America", [-59, -12]],
  "Oceania": ["oceania", "اقیانوسیه", "Oceania", [134, -25]],
  "Antarctica": ["antarctica", "جنوبگان", "Antarctica", [20, -82]]
};
var OCEANS = [
  ["pacific", "اقیانوس آرام", "Pacific Ocean", [-112, -15]],
  ["atlantic", "اقیانوس اطلس", "Atlantic Ocean", [-36, 18]],
  ["indian", "اقیانوس هند", "Indian Ocean", [78, -22]],
  ["arctic", "اقیانوس منجمد شمالی", "Arctic Ocean", [5, 77]],
  ["southern", "اقیانوس منجمد جنوبی", "Southern Ocean", [-60, -62]]
];
// Seas on the region map
var SEAS = [
  ["caspian", "دریای خزر", "Caspian Sea", [51.2, 41.6]],
  ["persian-gulf", "خلیج فارس", "Persian Gulf", [51.4, 27.3]],
  ["oman-sea", "دریای عمان", "Sea of Oman", [59.4, 24.2]],
  ["arabian-sea", "دریای عرب", "Arabian Sea", [64.5, 20.5]],
  ["red-sea", "دریای سرخ", "Red Sea", [37.6, 22.6]],
  ["mediterranean", "دریای مدیترانه", "Mediterranean Sea", [34.0, 34.4]],
  ["black-sea", "دریای سیاه", "Black Sea", [36.5, 42.8]]
];

var tmp = fs.mkdtempSync(path.join(os.tmpdir(), "world-map-"));
function run(feats, args) {
  fs.writeFileSync(path.join(tmp, "in.json"), JSON.stringify({ type: "FeatureCollection", features: feats }));
  cp.execFileSync(mapshaper, ["in.json"].concat(args, ["-o", "format=geojson", "combine-layers", "precision=100", "out.json"]), { cwd: tmp, stdio: "inherit" });
  return JSON.parse(fs.readFileSync(path.join(tmp, "out.json"), "utf8")).features;
}
function polys(geom) { return geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates; }

// The transform from projected coordinates to a viewBox `w` wide (from the land shapes' extent).
function frame(feats, w) {
  var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  feats.forEach(function (f) {
    if (!f.geometry || f.geometry.type === "Point" || f.geometry.type === "LineString") return;
    polys(f.geometry).forEach(function (p) { p.forEach(function (r) { r.forEach(function (c) {
      x0 = Math.min(x0, c[0]); x1 = Math.max(x1, c[0]); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
    }); }); });
  });
  var k = w / (x1 - x0);
  return { W: w, H: Math.round((y1 - y0) * k), k: k, T: function (c) { return [Math.round((c[0] - x0) * k), Math.round((y1 - c[1]) * k)]; } };
}
function pathOf(F, geom) {
  return polys(geom).map(function (poly) { return poly.map(function (ring) {
    var out = [];
    ring.map(F.T).forEach(function (p) { var l = out[out.length - 1]; if (!l || l[0] !== p[0] || l[1] !== p[1]) out.push(p); });
    if (out.length > 1 && out[0][0] === out[out.length - 1][0] && out[0][1] === out[out.length - 1][1]) out.pop();
    if (out.length < 3) return "";
    // Relative moves (l dx dy) after the first point: shorter than absolute ones.
    var d = "M" + out[0].join(" ") + "l";
    for (var i = 1; i < out.length; i++) d += num(out[i][0] - out[i - 1][0], i > 1) + num(out[i][1] - out[i - 1][1], true);
    return d + "Z";
  }).join(""); }).join("");
}
function num(n, sep) { return (sep && n >= 0 ? " " : "") + n; }
// Where a country's name goes: the inside point farthest from its edges, in its biggest part (a coarse grid search).
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
function labelAt(F, geom) {
  var best = null, bd = -1;
  polys(geom).forEach(function (poly) {
    var rings = poly.map(function (r) { return r.map(F.T); }), o = rings[0];
    var a = Math.min.apply(null, o.map(function (p) { return p[0]; })), c = Math.max.apply(null, o.map(function (p) { return p[0]; }));
    var b = Math.min.apply(null, o.map(function (p) { return p[1]; })), d = Math.max.apply(null, o.map(function (p) { return p[1]; }));
    for (var x = a; x <= c; x += 0.5) for (var y = b; y <= d; y += 0.5) {
      var p = [x, y];
      if (!inside(p, o) || rings.slice(1).some(function (r) { return inside(p, r); })) continue;
      var m = Infinity;
      rings.forEach(function (r) { for (var i = 0; i < r.length; i++) m = Math.min(m, segd(p, r[i], r[(i + 1) % r.length])); });
      if (m > bd) { bd = m; best = [Math.round(x), Math.round(y)]; }
    }
    // A country too small for the grid: the middle of its outline.
    if (!best) best = [Math.round((a + c) / 2), Math.round((b + d) / 2)];
  });
  return best;
}
function point(kind, id, c) { return { type: "Feature", properties: { kind: kind, id: id }, geometry: { type: "Point", coordinates: c } }; }
function q(v) { return JSON.stringify(v); }
function country(F, f, byId, extra) {
  var c = COUNTRIES[f.properties.id], o = { id: c[0], name: c[1], en: c[2] };
  Object.assign(o, extra || {});
  o.at = labelAt(F, f.geometry);
  var cap = byId["capital:" + c[0]];
  if (cap) {
    var at = F.T(cap.geometry.coordinates);
    if (at[0] >= 0 && at[1] >= 0 && at[0] <= F.W && at[1] <= F.H) o.capital = { name: c[3], en: c[4], at: at };
  }
  if (c[6]) o.neighbour = c[6];
  o.d = pathOf(F, f.geometry);
  return o;
}
function write(file, head, name, body) {
  var src = head + "var B = window.B || {};\nwindow.B = B;\nB.MAPS = B.MAPS || {};\n\nB.MAPS." + name + " = {\n" + body + "\n};\n";
  src = src.replace(/"(\w+)":/g, "$1:");
  fs.writeFileSync(path.join(root, "js", "maps", file), src);
  console.log("js/maps/" + file + ": " + src.length + " bytes");
}
function list(items) { return "[\n" + items.map(function (x) { return "    " + q(x); }).join(",\n") + "\n  ]"; }
// Kilometres in one viewBox unit at a point (for the scale bar): two points 1° of latitude apart (111.2 km).
function kmPerUnit(F, proj, lonlat) {
  var g = run([point("a", "a", lonlat), point("b", "b", [lonlat[0], lonlat[1] + 1])], ["-proj", proj]);
  var a = g[0].geometry.coordinates, b = g[1].geometry.coordinates;
  return Math.round(111.2 / (Math.hypot(a[0] - b[0], a[1] - b[1]) * F.k) * 100) / 100;
}

/* ---------- The world: Robinson projection, 400 wide ---------- */
(function () {
  var feats = [];
  read("ne_110m_admin_0_countries.geojson").features.forEach(function (f) {
    var a3 = f.properties.ADM0_A3, cont = f.properties.CONTINENT;
    if (cont === "Seven seas (open ocean)") cont = "";
    feats.push({ type: "Feature", properties: { kind: "land", id: a3, cont: cont }, geometry: f.geometry });
  });
  Object.keys(COUNTRIES).forEach(function (a3) { var c = COUNTRIES[a3]; feats.push(point("capital", c[0], c[5])); });
  Object.keys(CONTINENTS).forEach(function (n) { feats.push(point("continent", CONTINENTS[n][0], CONTINENTS[n][3])); });
  OCEANS.forEach(function (o) { feats.push(point("ocean", o[0], o[3])); });
  feats.push({ type: "Feature", properties: { kind: "equator", id: "equator" }, geometry: { type: "LineString", coordinates: [[-180, 0], [180, 0]] } });
  var proj = "+proj=robin";
  // Russia west of the Urals (about 60° east) is in Europe; the rest is in Asia.
  var g = run(feats, ["-each", "cont = id === 'RUS' ? 'Asia' : cont", "-proj", proj, "-simplify", "25%", "keep-shapes", "planar"]);
  var ru = run([feats.find(function (f) { return f.properties.id === "RUS"; })], ["-clip", "bbox=19,40,60,82", "-each", "cont = 'Europe', id = 'RUS-EU'", "-proj", proj, "-simplify", "25%", "keep-shapes", "planar"]);
  g = g.concat(ru);
  var conts = run(g.filter(function (f) { return f.properties.kind === "land" && f.properties.cont; }).map(function (f) { return { type: "Feature", properties: { cont: f.properties.cont }, geometry: f.geometry }; }),
    ["snap", "snap-interval=2000", "-dissolve", "cont"]);
  var F = frame(g, 400);
  var byId = {};
  g.forEach(function (f) { byId[f.properties.kind + ":" + f.properties.id] = f; });
  // The European part of Russia is drawn over the whole of Russia (same shape, one place): it only makes the continents.
  var lands = g.filter(function (f) { return f.properties.kind === "land" && f.geometry && f.properties.id !== "RUS-EU"; });
  var named = lands.filter(function (f) { return COUNTRIES[f.properties.id]; });
  var countries = named.map(function (f) {
    var cont = CONTINENTS[f.properties.cont] ? CONTINENTS[f.properties.cont][0] : "";
    if (f.properties.id === "RUS") cont = "europe asia";
    if (f.properties.id === "TUR") cont = "asia europe";
    return country(F, f, byId, { cont: cont });
  }).sort(function (a, b) { return a.at[1] - b.at[1] || a.at[0] - b.at[0]; });
  var abroad = lands.filter(function (f) { return !COUNTRIES[f.properties.id]; }).map(function (f) { return pathOf(F, f.geometry); }).filter(Boolean);
  var continents = conts.map(function (f) {
    var c = CONTINENTS[f.properties.cont];
    return { id: c[0], name: c[1], en: c[2], at: F.T(byId["continent:" + c[0]].geometry.coordinates), d: pathOf(F, f.geometry) };
  });
  var oceans = OCEANS.map(function (o) { return { id: o[0], name: o[1], en: o[2], at: F.T(byId["ocean:" + o[0]].geometry.coordinates) }; });
  var eq = byId["equator:equator"].geometry.coordinates.map(F.T);
  var head = "/* باغچه — the map of the world for the `map` step (js/steps/world.js): the seven continents, the five oceans,\n" +
    "   a chosen set of countries with their capitals (`countries`), every other country as a plain shape (`abroad`, no\n" +
    "   names), and the equator. Generated by tools/build-world-map.js; do not edit the paths by hand.\n" +
    "   Source: Natural Earth 1:110m Cultural Vectors (admin 0 countries), naturalearthdata.com, public domain.\n" +
    "   Borders are Natural Earth's de facto borders; disputed areas get no names. Russia west of the Urals is in Europe.\n" +
    "   Robinson projection, viewBox " + F.W + " × " + F.H + ". Names are the ones used in Iran's schools.\n" +
    "   Checked by a geography teacher before publishing. */\n";
  write("world.js", head, "world",
    "  view: " + q([F.W, F.H]) + ",\n  bg: \"sea\",\n  equator: " + eq[0][1] + ",\n" +
    "  abroad: " + list(abroad) + ",\n  continents: " + list(continents) + ",\n  oceans: " + list(oceans) + ",\n  countries: " + list(countries));
})();

/* ---------- The region: Iran and its neighbours, Lambert conformal conic centred on Iran, 400 wide ---------- */
(function () {
  var feats = [];
  read("ne_10m_admin_0_countries.geojson").features.forEach(function (f) {
    feats.push({ type: "Feature", properties: { kind: "land", id: f.properties.ADM0_A3 }, geometry: f.geometry });
  });
  Object.keys(COUNTRIES).forEach(function (a3) { var c = COUNTRIES[a3]; feats.push(point("capital", c[0], c[5])); });
  SEAS.forEach(function (s) { feats.push(point("sea", s[0], s[3])); });
  var proj = "+proj=lcc +lat_1=25 +lat_2=40 +lat_0=32 +lon_0=53.5";
  var g = run(feats, ["snap", "-clip", "bbox=33,17,74,46", "-filter-islands", "min-area=85km2", "-proj", proj,
    "-simplify", "3%", "keep-shapes", "planar"]);
  var F = frame(g, 400);
  var byId = {};
  g.forEach(function (f) { byId[f.properties.kind + ":" + f.properties.id] = f; });
  var lands = g.filter(function (f) { return f.properties.kind === "land" && f.geometry; });
  var countries = lands.filter(function (f) { return COUNTRIES[f.properties.id]; }).map(function (f) { return country(F, f, byId); })
    .sort(function (a, b) { return a.at[1] - b.at[1] || a.at[0] - b.at[0]; });
  var abroad = lands.filter(function (f) { return !COUNTRIES[f.properties.id]; }).map(function (f) { return pathOf(F, f.geometry); }).filter(Boolean);
  var seas = SEAS.map(function (s) { return { id: s[0], name: s[1], en: s[2], at: F.T(byId["sea:" + s[0]].geometry.coordinates) }; });
  var km = kmPerUnit(F, proj, [53.5, 32]);
  var head = "/* باغچه — the map of Iran and its neighbours for the `map` step (js/steps/world.js): Iran, the countries around it\n" +
    "   with their capitals (`neighbour`: \"land\" or \"sea\"), a few more countries of the region, every other country as a\n" +
    "   plain shape (`abroad`, no names), and the seas. Generated by tools/build-world-map.js; do not edit the paths by hand.\n" +
    "   Source: Natural Earth 1:10m Cultural Vectors (admin 0 countries), naturalearthdata.com, public domain.\n" +
    "   Borders are Natural Earth's de facto borders; disputed areas get no names. Simplified (mapshaper, 3% of points,\n" +
    "   shared borders kept), Lambert conformal conic projection centred on Iran, viewBox " + F.W + " × " + F.H + ";\n" +
    "   kmPerUnit is the scale in the middle of Iran. Names are the ones used in Iran's schools.\n" +
    "   Checked by a geography teacher before publishing. */\n";
  write("region.js", head, "region",
    "  view: " + q([F.W, F.H]) + ",\n  bg: \"sea\",\n  kmPerUnit: " + km + ",\n" +
    "  abroad: " + list(abroad) + ",\n  seas: " + list(seas) + ",\n  countries: " + list(countries));
})();
