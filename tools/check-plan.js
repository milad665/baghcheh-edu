/* Checks that the content plan (CURRICULUM.md) and the lessons (js/lessons/*.js) agree.
   Run from the project folder:  node tools/check-plan.js
   - every lesson is in the plan, marked ✅ (done) or 🔨 (being built), under its own subject and garden;
   - every ✅ row in the plan is a real lesson, and no ⬜ (planned) row is one yet;
   - built lessons are listed in the same order as children see them (the order they are pushed);
   - every step type the code defines (B.engine.steps.x / E.steps.x) is listed under "Content types";
   - every subject in B.SUBJECTS has a section in the plan.
   Exits with code 1 when something disagrees, so it can run before a commit. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");

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

// ---- The plan: "## … `subject`", "### … `level`" (or `any`), rows "| ✅ | `id` | …". ----
var planFile = path.join(root, "CURRICULUM.md");
var lines = fs.readFileSync(planFile, "utf8").split("\n");
var plan = {}, planOrder = [], subject = null, level = null, inTypes = false, typeText = "";
var STATUS = { "✅": "built", "🔨": "building", "⬜": "planned" };
lines.forEach(function (line, i) {
  var h = /^(#{2,3}) (.*)$/.exec(line);
  if (h) {
    var tick = /`([^`]+)`\s*$/.exec(h[2]);
    if (h[1] === "##") { subject = tick ? tick[1] : null; level = null; inTypes = /^Content types/.test(h[2]); }
    else level = tick ? (tick[1] === "any" ? null : tick[1]) : undefined;
    return;
  }
  if (inTypes) typeText += line + "\n";
  var row = /^\|\s*(✅|🔨|⬜)\s*\|\s*`([^`]+)`\s*\|/.exec(line);
  if (!row || !subject) return;
  var id = row[2];
  if (plan[id]) { errors.push("CURRICULUM.md:" + (i + 1) + " " + id + " is listed twice"); return; }
  plan[id] = { status: STATUS[row[1]], subject: subject, level: level, line: i + 1 };
  planOrder.push(id);
});

// ---- Lessons ↔ plan ----
lessons.forEach(function (l) {
  var p = plan[l.id];
  if (!p) { errors.push(l.id + " (" + l.title + ") is not in CURRICULUM.md: add it to its subject and garden"); return; }
  if (p.status === "planned") errors.push("CURRICULUM.md:" + p.line + " " + l.id + " exists but is marked ⬜: mark it 🔨 (or ✅ once it is done)");
  if (p.subject !== l.subject) errors.push("CURRICULUM.md:" + p.line + " " + l.id + " is listed under `" + p.subject + "` but its subject is `" + l.subject + "`");
  if (p.level !== l.level) errors.push("CURRICULUM.md:" + p.line + " " + l.id + " is listed under `" + (p.level === null ? "any" : p.level) + "` but its level is `" + (l.level === null ? "any" : l.level) + "`");
});
var ids = {};
lessons.forEach(function (l) { ids[l.id] = true; });
planOrder.forEach(function (id) {
  if (plan[id].status === "built" && !ids[id]) errors.push("CURRICULUM.md:" + plan[id].line + " " + id + " is marked ✅ but no such lesson exists");
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
lines.forEach(function (line) { var h = /^## .*`([^`]+)`\s*$/.exec(line); if (h) planSubjects[h[1]] = true; });
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

// ---- Report ----
function n(st) { return planOrder.filter(function (id) { return plan[id].status === st; }).length; }
warnings.forEach(function (w) { console.log("! " + w); });
errors.forEach(function (e) { console.log("✗ " + e); });
console.log(errors.length ? "\n" + errors.length + " problem(s). Update CURRICULUM.md (or the lessons) so they agree."
  : "Plan and lessons agree: " + n("built") + " built, " + n("building") + " being built, " + n("planned") + " planned.");
process.exit(errors.length ? 1 : 0);
