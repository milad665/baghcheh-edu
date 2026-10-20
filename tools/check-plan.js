/* Checks that the content plan (CURRICULUM.md) and the lessons (js/lessons/*.js) agree.
   Run from the project folder:  node tools/check-plan.js
   - every lesson is in the plan, under its own subject and garden, with the same title;
   - status: ✅ for lessons committed to git (in the index, so staged lessons count: mark them ✅ in the same commit),
     🔨 for lessons that are only in the working tree, ⬜ for rows with no lesson yet;
   - each lesson's step types appear in its row's "Content types", by name (`sort`) or by their content type
     (a `story` step is "animation", see the "Content types" table);
   - built lessons are listed in the same order as children see them (the order they are pushed);
   - every step type the code defines (B.engine.steps.x / E.steps.x) is listed under "Content types";
   - every subject in B.SUBJECTS has a section in the plan;
   - practice: every row of a "#### Practice" table has a unique id (`<subject>-<garden|any>-p<n>`) and real objectives;
     a row marked 🔨/✅ has a generator registered with that id (js/practice/*.js, ✅ only when committed), every
     registered generator has a row under its own subject and garden with the same objectives, its needs are real
     lessons, and it makes steps of known types (run with many seeds, at every point of its subject's lessons);
     a row can instead be built by off-screen activities in js/activities.js that name it (`practice: "<row id>"`);
     a generator's `lessons` are lessons of its subject where it is open; and, as warnings, every built lesson in Seed,
     Sprout and Sapling has at least 3 generators in its practice set (`--coverage[=subject]` lists the lessons below);
   - the content browser (browse.html) loads every file index.html loads, except the app's own screens.
   Exits with code 1 when something disagrees, so it can run before a commit. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var cp = require("child_process");

var root = path.join(__dirname, "..");
var js = path.join(root, "js");
var errors = [], warnings = [];

// ---- Lessons, in the order index.html loads them (then any lesson file it does not load yet). ----
var ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(js, "content.js"), "utf8"), ctx);
var html = fs.readFileSync(path.join(root, "index.html"), "utf8");
var loaded = [], m, re = /<script src="js\/lessons\/([^"]+\.js)"/g;
while ((m = re.exec(html))) loaded.push(m[1]);
var all = fs.readdirSync(path.join(js, "lessons")).filter(function (f) { return /\.js$/.test(f); }).sort();
all.forEach(function (f) { if (loaded.indexOf(f) === -1) { warnings.push("js/lessons/" + f + " is not loaded in index.html"); loaded.push(f); } });
loaded.forEach(function (f) { vm.runInNewContext(fs.readFileSync(path.join(js, "lessons", f), "utf8"), ctx); });
var B = ctx.window.B;
var lessons = B.LESSONS;

// ---- The plan: CURRICULUM.md (shared) and one file per subject in curriculum/ (linked from its subjects table).
// In each: "## … `subject`", "### … `level`" (or `any`), "#### Objectives | Lessons | Practice", lesson rows
// "| ✅ | `id` | title | covers | types | objectives | depth |" and objective rows "| `read.sap.3` | … |". ----
var sources = [{ file: "CURRICULUM.md", text: fs.readFileSync(path.join(root, "CURRICULUM.md"), "utf8") }];
var linked = [], lm, lre = /\]\((curriculum\/[\w-]+\.md)\)/g;
while ((lm = lre.exec(sources[0].text))) if (linked.indexOf(lm[1]) === -1) linked.push(lm[1]);
var cdir = path.join(root, "curriculum");
(fs.existsSync(cdir) ? fs.readdirSync(cdir) : []).filter(function (f) { return /\.md$/.test(f); }).sort().forEach(function (f) {
  if (linked.indexOf("curriculum/" + f) === -1) { warnings.push("curriculum/" + f + " is not linked from the subjects table in CURRICULUM.md"); linked.push("curriculum/" + f); }
});
linked.forEach(function (f) {
  if (!fs.existsSync(path.join(root, f))) { errors.push("CURRICULUM.md links " + f + ", which does not exist"); return; }
  sources.push({ file: f, text: fs.readFileSync(path.join(root, f), "utf8") });
});

var plan = {}, planOrder = [], inTypes = false, typeText = "", categories = {};
var objectives = {}, subjectsWithObjectives = {}, practiceRows = {};
var STATUS = { "✅": "built", "🔨": "building", "⬜": "planned" };
var DEPTHS = { core: true, full: true };
var CODE = /^([a-z]+)\.(seed|spr|sap|tree|for|any)\.\d+$/;
sources.forEach(function (src) {
  var subject = null, level = null, part = null;
  src.text.split("\n").forEach(function (line, i) {
    var where = src.file + ":" + (i + 1);
    var h = /^(#{2,4}) (.*)$/.exec(line);
    if (h) {
      var tick = /`([^`]+)`\s*$/.exec(h[2]);
      if (h[1] === "##") { subject = tick ? tick[1] : null; level = null; part = null; inTypes = /^Content types/.test(h[2]); }
      else if (h[1] === "###") { level = tick ? (tick[1] === "any" ? null : tick[1]) : undefined; part = null; }
      else part = h[2].trim().toLowerCase();
      return;
    }
    if (inTypes) {
      typeText += line + "\n";
      // "| **game** | … | `pairs`, `build`, … |": which step types make each content type.
      var cat = /^\|\s*\*\*([^*]+)\*\*\s*\|/.exec(line);
      if (cat) categories[cat[1]] = (line.split("|").slice(-2)[0].match(/`(\w+)`/g) || []).map(function (t) { return t.slice(1, -1); });
    }
    if (!subject) return;
    var cells = line.split("|").map(function (c) { return c.trim(); });
    // A practice row: "| ⬜ | `math-seed-p1` | Count it | what it makes | math.seed.2, math.seed.4 |"
    if (part === "practice") {
      var pr = /^\|\s*(✅|🔨|⬜)\s*\|\s*`([^`]+)`\s*\|/.exec(line);
      if (!pr) { if (/^\|\s*(✅|🔨|⬜)/.test(line)) errors.push(where + " practice row has no id: give it the next free `" + subject + "-" + (level || "any") + "-p<n>`"); return; }
      var pid = pr[2];
      if (practiceRows[pid] || plan[pid]) { errors.push(where + " practice id " + pid + " is listed twice"); return; }
      if (!new RegExp("^" + subject + "-" + (level || "any") + "-p\\d+$").test(pid)) errors.push(where + " practice id " + pid + " should look like " + subject + "-" + (level || "any") + "-p<n> (its subject and garden)");
      practiceRows[pid] = { status: STATUS[pr[1]], subject: subject, level: level, where: where,
        objectives: (cells[5] || "").match(/[a-z]+\.(?:seed|spr|sap|tree|for|any)\.\d+/g) || [] };
      return;
    }
    // An objective: "| `read.sap.3` | can do | strand | depth | school | checked by |"
    var ob = /^\|\s*`([^`]+)`\s*\|/.exec(line);
    if (ob && part === "objectives") {
      var code = ob[1];
      if (!CODE.test(code) || code.split(".")[0] !== subject) errors.push(where + " objective code `" + code + "` should look like `" + subject + ".<seed|spr|sap|tree|for|any>.<n>`");
      if (objectives[code]) errors.push(where + " objective `" + code + "` is listed twice");
      if (!DEPTHS[cells[4]]) errors.push(where + " objective `" + code + "` has depth «" + cells[4] + "»: use core or full");
      objectives[code] = { where: where, subject: subject, taught: false };
      subjectsWithObjectives[subject] = true;
      return;
    }
    var row = /^\|\s*(✅|🔨|⬜)\s*\|\s*`([^`]+)`\s*\|/.exec(line);
    if (!row) return;
    var id = row[2];
    if (plan[id]) { errors.push(where + " " + id + " is listed twice"); return; }
    plan[id] = { status: STATUS[row[1]], subject: subject, level: level, line: i + 1, where: where, title: cells[3], types: cells[5] || "",
      objectives: (cells[6] || "").match(/[a-z]+\.(?:seed|spr|sap|tree|for|any)\.\d+/g) || [], depth: cells[7] || "" };
    planOrder.push(id);
  });
});

// Objectives: in a subject that has them, every lesson names real objectives and a depth, and every objective is taught.
planOrder.forEach(function (id) {
  var p = plan[id];
  if (!subjectsWithObjectives[p.subject]) return;
  if (!p.objectives.length) errors.push(p.where + " " + id + " names no objectives (the Objectives column)");
  p.objectives.forEach(function (c) {
    if (!objectives[c]) errors.push(p.where + " " + id + " names objective `" + c + "`, which is not in any Objectives table");
    else objectives[c].taught = true;
  });
  if (!DEPTHS[p.depth]) errors.push(p.where + " " + id + " has depth «" + p.depth + "»: use core or full");
});
Object.keys(objectives).forEach(function (c) {
  if (!objectives[c].taught) errors.push(objectives[c].where + " objective `" + c + "` is not taught by any lesson");
});
sources.slice(1).forEach(function (src) {
  var m = /^## .*subject `([^`]+)`/m.exec(src.text);
  if (m && !subjectsWithObjectives[m[1]]) warnings.push(src.file + " has no objectives yet (see \"Scope and sequence\" in CURRICULUM.md)");
});

// ---- Lessons that are committed: the git index (staged counts), read the same way as the working tree. ----
var committed = null;
try {
  var gctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(js, "content.js"), "utf8"), gctx);
  cp.execFileSync("git", ["ls-files", "js/lessons"], { cwd: root, encoding: "utf8" }).split("\n")
    .filter(function (f) { return /\.js$/.test(f); }).forEach(function (f) {
      vm.runInNewContext(cp.execFileSync("git", ["show", ":" + f], { cwd: root, encoding: "utf8" }), gctx);
    });
  committed = {};
  gctx.window.B.LESSONS.forEach(function (l) { committed[l.id] = true; });
} catch (e) { warnings.push("git is not available here, so ✅/🔨 are not checked against commits"); }

// ---- Lessons ↔ plan ----
function stepCovered(t, types) {
  if (types.indexOf("`" + t + "`") !== -1) return true;
  return Object.keys(categories).some(function (c) {
    return categories[c].indexOf(t) !== -1 && new RegExp("(^|[^\\w])" + c + "([^\\w]|$)").test(types);
  });
}
lessons.forEach(function (l) {
  var p = plan[l.id];
  if (!p) { errors.push(l.id + " (" + l.title + ") is not in the plan: add it to curriculum/" + l.subject + ".md, under its garden"); return; }
  var at = p.where + " " + l.id;
  if (p.status === "planned") errors.push(at + " exists but is marked ⬜: mark it " + (committed && committed[l.id] ? "✅ (it is committed)" : "🔨"));
  else if (committed && committed[l.id] && p.status !== "built") errors.push(at + " is committed but marked 🔨: mark it ✅");
  else if (committed && !committed[l.id] && p.status === "built") errors.push(at + " is marked ✅ but not committed yet: mark it 🔨 (or stage it with the plan)");
  if (p.title !== l.title) errors.push(at + " has the title «" + p.title + "» in the plan but «" + l.title + "» in the lesson");
  var used = [];
  l.steps.forEach(function (s) { if (used.indexOf(s.type) === -1) used.push(s.type); });
  var missing = used.filter(function (t) { return !stepCovered(t, p.types); });
  if (missing.length) errors.push(at + " uses " + missing.map(function (t) { return "`" + t + "`"; }).join(", ") + " but its \"Content types\" do not mention it");
  if (p.subject !== l.subject) errors.push(p.where + " " + l.id + " is listed under `" + p.subject + "` but its subject is `" + l.subject + "`");
  if (p.level !== l.level) errors.push(p.where + " " + l.id + " is listed under `" + (p.level === null ? "any" : p.level) + "` but its level is `" + (l.level === null ? "any" : l.level) + "`");
});
var ids = {};
lessons.forEach(function (l) { ids[l.id] = true; });
planOrder.forEach(function (id) {
  if (plan[id].status === "built" && !ids[id]) errors.push(plan[id].where + " " + id + " is marked ✅ but no such lesson exists");
});

// Order within each subject and garden: the plan lists built lessons in the order children see them.
var groups = {};
function key(s, lv) { return s + "/" + (lv === null ? "any" : lv); }
lessons.forEach(function (l) { (groups[key(l.subject, l.level)] = groups[key(l.subject, l.level)] || { code: [], plan: [] }).code.push(l.id); });
planOrder.forEach(function (id) {
  var p = plan[id];
  if (p.status !== "planned" && ids[id] && groups[key(p.subject, p.level)]) groups[key(p.subject, p.level)].plan.push(id);
});
Object.keys(groups).forEach(function (k) {
  var g = groups[k];
  if (g.code.join() !== g.plan.join()) errors.push(k + ": lessons are in a different order than in CURRICULUM.md\n    lessons: " + g.code.join(", ") + "\n    plan:    " + g.plan.join(", "));
});

// ---- Subjects ----
var planSubjects = {};
planOrder.forEach(function (id) { planSubjects[plan[id].subject] = true; });
sources.forEach(function (src) { src.text.split("\n").forEach(function (line) { var h = /^## .*`([^`]+)`\s*$/.exec(line); if (h) planSubjects[h[1]] = true; }); });
(B.SUBJECTS || []).forEach(function (s) {
  if (!planSubjects[s.id]) errors.push("subject `" + s.id + "` (" + s.name + ") has no section in CURRICULUM.md");
});

// ---- Step types defined in the code are listed under "Content types" ----
function jsFiles(dir) {
  return fs.readdirSync(dir).reduce(function (out, f) {
    var p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) return out.concat(jsFiles(p));
    return /\.js$/.test(f) ? out.concat(p) : out;
  }, []);
}
jsFiles(js).forEach(function (f) {
  // Comments are dropped first (README examples such as "B.engine.steps.mytype" are not step types).
  var src = fs.readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  var s, sre = /(?:^|[^\w.])(?:E\.|B\.engine\.)?steps\.(\w+)\s*=\s*function/g, seen = {};
  while ((s = sre.exec(src))) seen[s[1]] = true;
  Object.keys(seen).forEach(function (t) {
    if (typeText.indexOf("`" + t + "`") === -1)
      errors.push("step type `" + t + "` (" + path.relative(root, f) + ") is not listed under \"Content types\" in CURRICULUM.md");
  });
});

// ---- The content browser (browse.html) loads the same content and step files as the app ----
var APP_ONLY = { "js/app.js": 1, "js/sync.js": 1, "js/plan.js": 1 };
var browse = fs.existsSync(path.join(root, "browse.html")) ? fs.readFileSync(path.join(root, "browse.html"), "utf8") : null;
if (browse) (html.match(/<script src="[^"]+"/g) || []).forEach(function (tag) {
  var f = tag.slice(13, -1);
  if (!APP_ONLY[f] && browse.indexOf(tag) === -1) errors.push(f + " is loaded in index.html but not in browse.html (the content browser)");
});

// ---- Practice generators (js/practice.js, js/practice/*.js) ↔ the "#### Practice" rows ----
function loadPractice(read, files) {
  var c = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(js, "content.js"), "utf8"), c);
  loaded.forEach(function (f) { vm.runInNewContext(fs.readFileSync(path.join(js, "lessons", f), "utf8"), c); });
  // The player's words and the English overlays (B.EN["<id>"].words), as the page has them.
  ["strings.js", "en/strings.js"].concat(fs.readdirSync(path.join(js, "en")).filter(function (f) { return /\.js$/.test(f) && f !== "strings.js"; }).map(function (f) { return "en/" + f; }))
    .forEach(function (f) { vm.runInNewContext(fs.readFileSync(path.join(js, f), "utf8"), c); });
  vm.runInNewContext(fs.readFileSync(path.join(js, "practice.js"), "utf8"), c);
  files.forEach(function (f) { vm.runInNewContext(read(f), c); });
  return c.window.B;
}
var practiceFiles = fs.existsSync(path.join(js, "practice")) ? fs.readdirSync(path.join(js, "practice")).filter(function (f) { return /\.js$/.test(f); }).sort().map(function (f) { return "js/practice/" + f; }) : [];
practiceFiles.forEach(function (f) {
  if (html.indexOf('<script src="' + f + '"') === -1) errors.push(f + " is not loaded in index.html (after js/practice.js)");
});
var PB = fs.existsSync(path.join(js, "practice.js")) ? loadPractice(function (f) { return fs.readFileSync(path.join(root, f), "utf8"); }, practiceFiles) : null;
var committedGens = null;
if (PB && committed) try {
  var gf = cp.execFileSync("git", ["ls-files", "js/practice"], { cwd: root, encoding: "utf8" }).split("\n").filter(function (f) { return /^js\/practice\/.+\.js$/.test(f); });
  if (gf.length && cp.execFileSync("git", ["ls-files", "js/practice.js"], { cwd: root, encoding: "utf8" }).trim()) {
    var cb = loadPractice(function (f) { return cp.execFileSync("git", ["show", ":" + f], { cwd: root, encoding: "utf8" }); }, gf);
    committedGens = {};
    cb.PRACTICE.forEach(function (g) { committedGens[g.id] = true; });
  } else committedGens = {};
} catch (e) { committedGens = null; }
var stepTypesKnown = {};
jsFiles(js).forEach(function (f) {
  var src = fs.readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, ""), s, sre = /(?:^|[^\w.])(?:E\.|B\.engine\.)?steps\.(\w+)\s*=\s*function/g;
  while ((s = sre.exec(src))) stepTypesKnown[s[1]] = true;
});
var gensSeen = {}, ctxCache = {};
// Contexts are the same for every generator of a subject at a point: made once.
function ctxAt(subject, upTo, level, lang) {
  var k = subject + "|" + upTo + "|" + level + "|" + (lang || "fa");
  return ctxCache[k] || (ctxCache[k] = PB.practiceContext(null, subject, { upTo: upTo, level: level, lang: lang }));
}
(PB ? PB.PRACTICE : []).forEach(function (g) {
  var at = "practice " + g.id;
  if (gensSeen[g.id]) { errors.push(at + " is registered twice"); return; }
  gensSeen[g.id] = true;
  var row = practiceRows[g.id];
  if (!row) { errors.push(at + " (" + g.title + ") has no row in a \"#### Practice\" table: add it to curriculum/" + g.subject + ".md, or use the row's id"); return; }
  if (row.status === "planned") errors.push(row.where + " " + g.id + " is registered but marked ⬜: mark it " + (committedGens && committedGens[g.id] ? "✅ (it is committed)" : "🔨"));
  else if (committedGens && committedGens[g.id] && row.status !== "built") errors.push(row.where + " " + g.id + " is committed but marked 🔨: mark it ✅");
  else if (committedGens && !committedGens[g.id] && row.status === "built") errors.push(row.where + " " + g.id + " is marked ✅ but not committed yet: mark it 🔨");
  if (row.subject !== g.subject) errors.push(row.where + " " + g.id + " is listed under `" + row.subject + "` but its subject is `" + g.subject + "`");
  if (row.level !== (g.level || null)) errors.push(row.where + " " + g.id + " is listed under `" + (row.level || "any") + "` but its level is `" + (g.level || "any") + "`");
  if ((g.objectives || []).slice().sort().join() !== row.objectives.slice().sort().join()) errors.push(row.where + " " + g.id + " serves " + (g.objectives || []).join(", ") + " in the code but " + row.objectives.join(", ") + " in the plan");
  if (!g.title || !g.emoji || typeof g.make !== "function") errors.push(at + " needs an emoji, a title and a make function");
  (g.needs || []).forEach(function (id) { if (!PB.lessonById(id)) errors.push(at + " needs " + id + ", which is not a lesson"); });
  // `lessons`: the lessons whose practice set it belongs to; each must be a lesson of its subject where it is open.
  if (g.lessons && !Array.isArray(g.lessons)) errors.push(at + " lessons must be a list of lesson ids");
  (Array.isArray(g.lessons) ? g.lessons : []).forEach(function (id) {
    var l = PB.lessonById(id);
    if (!l || l.subject !== g.subject) { errors.push(at + " lists lesson " + id + ", which is not a " + g.subject + " lesson"); return; }
    var missing = PB.practiceMissing(g, ctxAt(g.subject, id, l.level));
    if (missing.length) errors.push(at + " lists lesson " + id + " but is not open there yet (needs " + missing.join(", ") + ")");
  });
  var said = {}, once = function (m) { if (!said[m]) { said[m] = true; errors.push(m); } };
  // Run it at every point of its subject's lessons (where it is open), with a few seeds, in Persian and (if it has one) English.
  var points = PB.LESSONS.filter(function (l) { return l.subject === g.subject; }).map(function (l) { return l.id; });
  var made = 0, langs = ["fa"].concat(PB.practiceHasEnglish && PB.EN && PB.EN[g.id] ? ["en"] : []);
  points.forEach(function (upTo, i) {
    var ctx = ctxAt(g.subject, upTo, g.level);
    if (PB.practiceMissing(g, ctx).length) return;
    // Two seeds in Persian, one in English (the English words are checked; the items are the same).
    for (var seed = 1; seed <= 2; seed++) langs.filter(function (lang) { return lang === "fa" || seed === 1; }).forEach(function (lang) {
      var c = ctxAt(g.subject, upTo, g.level, lang), steps;
      try { steps = g.make(PB.rng(seed + i * 7), 9, PB.practiceGenContext(g, c, [])); }
      catch (e) { once(at + " fails after " + upTo + " (seed " + seed + ", " + lang + "): " + e.message); return; }
      if (!Array.isArray(steps)) { once(at + " make() must return a list of steps"); return; }
      if (steps.length > 9) once(at + " made " + steps.length + " steps when asked for 9");
      steps.forEach(function (s) {
        if (!s || !stepTypesKnown[s.type]) once(at + " makes a step of unknown type `" + (s && s.type) + "`");
        if (s && s.key != null && typeof s.key !== "string") once(at + " step key must be a string (got " + JSON.stringify(s.key) + ")");
        if (s && s.practice) once(at + " makes a step with `practice: " + JSON.stringify(s.practice) + "`: generated items must be scored, so leave it out");
      });
      made += steps.length;
    });
  });
  if (!made) warnings.push(at + " makes no items at any point of the lessons");
});
// Off-screen activities can build a practice row instead of a generator: { id, text, practice: "<row id>" } in
// js/activities.js, under the row's garden (or `any`). ✅ needs them committed.
function activityRows(src) {
  var c = { window: {} }, out = {};
  try { vm.runInNewContext(src, c); } catch (e) { return out; }
  var A = c.window.B && c.window.B.ACTIVITIES || {};
  Object.keys(A).forEach(function (lv) { (A[lv] || []).forEach(function (a) {
    if (a.practice) (out[a.practice] = out[a.practice] || []).push({ id: a.id, level: lv });
  }); });
  return out;
}
var actFile = path.join(js, "activities.js");
var acts = fs.existsSync(actFile) ? activityRows(fs.readFileSync(actFile, "utf8")) : {}, actsCommitted = null;
if (committed) try { actsCommitted = activityRows(cp.execFileSync("git", ["show", ":js/activities.js"], { cwd: root, encoding: "utf8" })); } catch (e) { actsCommitted = {}; }
Object.keys(acts).forEach(function (id) {
  var r = practiceRows[id];
  if (!r) { errors.push("js/activities.js: " + acts[id].map(function (a) { return a.id; }).join(", ") + " names practice row " + id + ", which is not in the plan"); return; }
  acts[id].forEach(function (a) {
    if (a.level !== (r.level || "any")) errors.push("js/activities.js: activity " + a.id + " builds " + id + " but is under `" + a.level + "`, not `" + (r.level || "any") + "`");
  });
  if (gensSeen[id]) errors.push(r.where + " " + id + " has both a generator and activities: use one");
  if (r.status === "planned") errors.push(r.where + " " + id + " has activities in js/activities.js but is marked ⬜: mark it " + (actsCommitted && actsCommitted[id] ? "✅ (they are committed)" : "🔨"));
  else if (actsCommitted && actsCommitted[id] && r.status !== "built") errors.push(r.where + " " + id + " has committed activities but is marked 🔨: mark it ✅");
  else if (actsCommitted && !actsCommitted[id] && r.status === "built") errors.push(r.where + " " + id + " is marked ✅ but its activities are not committed yet: mark it 🔨");
});
Object.keys(practiceRows).forEach(function (id) {
  var r = practiceRows[id];
  if (r.status !== "planned" && !gensSeen[id] && !acts[id]) errors.push(r.where + " " + id + " is marked " + (r.status === "built" ? "✅" : "🔨") + " but no generator with that id is registered (js/practice/" + r.subject + ".js) and no activity in js/activities.js names it");
  r.objectives.forEach(function (c) { if (subjectsWithObjectives[r.subject] && !objectives[c]) errors.push(r.where + " " + id + " names objective `" + c + "`, which is not in any Objectives table"); });
});

// ---- Practice coverage (CURRICULUM.md, "Practice in the course"): every built lesson in Seed, Sprout and Sapling
// has at least B.PRACTICE_MIN generators in its practice set. A warning for now; `--coverage` lists every such lesson
// (`--coverage=math` one subject) with generators that serve its objectives and could join its set. ----
var coverageArg = process.argv.filter(function (a) { return /^--coverage/.test(a); })[0];
var coverageOnly = coverageArg && coverageArg.indexOf("=") > 0 ? coverageArg.split("=")[1] : null;
var coverage = {};
if (PB && PB.lessonGens) {
  var MIN = PB.PRACTICE_MIN || 3;
  PB.LESSONS.forEach(function (l) {
    if (!PB.inPath(l.level)) return;
    var c = coverage[l.subject] = coverage[l.subject] || { lessons: 0, full: 0, some: 0, below: [] };
    var set = PB.lessonGens(l.id);
    c.lessons++;
    if (set.length >= MIN) { c.full++; return; }
    if (set.length) c.some++;
    var objs = (plan[l.id] || {}).objectives || [];
    var ctx = ctxAt(l.subject, l.id, l.level);
    var could = PB.PRACTICE.filter(function (g) {
      return g.subject === l.subject && set.indexOf(g) < 0 && (g.objectives || []).some(function (o) { return objs.indexOf(o) >= 0; }) &&
        !PB.practiceMissing(g, ctx).length;
    }).map(function (g) { return g.id; });
    c.below.push("practice coverage: " + l.id + " has " + set.length + " of " + MIN + (set.length ? " (" + set.map(function (g) { return g.id; }).join(", ") + ")" : "") +
      (could.length ? "; could add it to the `lessons` of: " + could.join(", ") : "; no other generator serves " + (objs.join(", ") || "its objectives") + " yet: add one (another kind of item)"));
  });
  Object.keys(coverage).forEach(function (sub) {
    var c = coverage[sub];
    if (c.below.length) warnings.push("practice coverage, " + sub + ": " + c.full + " of " + c.lessons + " lessons (Seed–Sapling) have " + MIN +
      "+ generators, " + c.some + " have fewer, " + (c.lessons - c.full - c.some) + " none. Details: node tools/check-plan.js --coverage=" + sub);
    if (coverageArg && (!coverageOnly || coverageOnly === sub)) c.below.forEach(function (w) { warnings.push(w); });
  });
}

// ---- Report ----
function n(st) { return planOrder.filter(function (id) { return plan[id].status === st; }).length; }
warnings.forEach(function (w) { console.log("! " + w); });
errors.forEach(function (e) { console.log("✗ " + e); });
console.log(errors.length ? "\n" + errors.length + " problem(s). Update CURRICULUM.md (or the lessons) so they agree."
  : "Plan and lessons agree: " + n("built") + " built, " + n("building") + " being built, " + n("planned") + " planned; " +
    Object.keys(objectives).length + " objectives; practice " + Object.keys(practiceRows).filter(function (id) { return practiceRows[id].status !== "planned"; }).length +
    " of " + Object.keys(practiceRows).length + " generators built.");
process.exit(errors.length ? 1 : 0);
