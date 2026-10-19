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
var objectives = {}, subjectsWithObjectives = {};
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
    if (!subject || part === "practice") return;
    var cells = line.split("|").map(function (c) { return c.trim(); });
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

// ---- Report ----
function n(st) { return planOrder.filter(function (id) { return plan[id].status === st; }).length; }
warnings.forEach(function (w) { console.log("! " + w); });
errors.forEach(function (e) { console.log("✗ " + e); });
console.log(errors.length ? "\n" + errors.length + " problem(s). Update CURRICULUM.md (or the lessons) so they agree."
  : "Plan and lessons agree: " + n("built") + " built, " + n("building") + " being built, " + n("planned") + " planned; " +
    Object.keys(objectives).length + " objectives.");
process.exit(errors.length ? 1 : 0);
