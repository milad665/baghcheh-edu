/* Checks that every word a child decodes in the reading lessons uses only letters taught so far.
   Run from the project folder:  node tools/check-reading.js
   Checked: intro example words, blend parts and words, words shown in "choose" steps, word options,
   passage text and passage options. Not checked: instructions and questions (the grown-up reads them),
   and the letter shapes in "find the letter" steps (other letters are there on purpose).
   Consonant «و» (v) and «ی» (y) are spotted by a rough rule and reported as warnings. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "js", "content.js"), "utf8"), ctx);
var LESSONS = ctx.window.B.LESSONS;

// What each lesson teaches, in order. «Y» = «ی» as a consonant.
var TEACHES = {
  "read-sprout-1": "آاب", "read-sprout-2": "دم", "read-sprout-3": "سَ",
  "read-sapling-1": "وت", "read-sapling-2": "ری", "read-sapling-3": "نز", "read-sapling-4": "شِ", "read-sapling-5": "کُ",
  "read-sapling-6": "",
  "read-sapling-7": "ه", "read-sapling-8": "پل", "read-sapling-9": "جگ", "read-sapling-10": "چخ", "read-sapling-11": "فق",
  "read-sapling-12": "Yژ", "read-sapling-13": "صث", "read-sapling-14": "ذضظ", "read-sapling-15": "طح", "read-sapling-16": "عغ",
  "read-sapling-17": "ًّ"
};

var IGNORE = /[\s‌‍«».،؛:؟!?\-–—…()0-9۰-۹]/;
var MARKS = "َُِّْ";

function words(s) { return String(s).split(/[\s‌]+/).map(function (w) { return w.replace(/[«».،؛:؟!?()]/g, ""); }).filter(Boolean); }

// Rough guesses for «و» = v and «ی» = y: at the start of a word (not the word «و»), next to «ا/آ», or before a short-vowel mark.
function consonantHints(w) {
  var bare = w.replace(/[ّْ]/g, "");
  var out = [];
  for (var i = 0; i < bare.length; i++) {
    var c = bare[i], prev = bare[i - 1], next = bare[i + 1];
    if (c !== "و" && c !== "ی") continue;
    if (bare === "و") continue;
    var start = i === 0;
    var vowelNext = next === "ا" || next === "آ" || next === "َ" || next === "ِ" || next === "ُ" || (c === "ی" && next === "و");
    var afterLong = prev === "ا" || prev === "آ" || (c === "ی" && prev === "و") || (c === "و" && prev === "ی" && i > 1);
    if (start || vowelNext || (c === "ی" && afterLong && next !== undefined) || (c === "ی" && afterLong && next === undefined)) out.push(c === "ی" ? "Y" : "V");
  }
  return out;
}

function texts(s) {
  var t = [];
  if (s.type === "intro" && s.example) t.push(s.example.word);
  if (s.type === "blend") { t.push(s.word); t = t.concat(s.parts); }
  if (s.type === "choose") {
    if (s.show && /[؀-ۿ]{2,}/.test(s.show)) t.push(s.show);
    // Word options (not letter shapes, not pictures).
    if (!s.pic && !/پیدا کن|کدام «|نشانه/.test(s.prompt)) s.options.forEach(function (o) { t.push(typeof o === "object" ? o.label : o); });
  }
  if (s.type === "passage") {
    t.push(s.text);
    if (!s.pic) s.options.forEach(function (o) { t.push(typeof o === "object" ? o.label : o); });
  }
  return t;
}

var known = "", errors = 0, warnings = 0, seen = {};
function report(msg) { if (seen[msg]) return false; seen[msg] = true; console.log(msg); return true; }
LESSONS.filter(function (l) { return l.subject === "read"; }).forEach(function (l) {
  if (!(l.id in TEACHES)) { if (l.level !== "seed") console.log("? " + l.id + " is missing from TEACHES"); return; }
  known += TEACHES[l.id];
  l.steps.forEach(function (s, i) {
    texts(s).forEach(function (t) {
      words(t).forEach(function (w) {
        var bad = [];
        for (var k = 0; k < w.length; k++) {
          var c = w[k];
          if (IGNORE.test(c) || c === "ـ") continue;
          if (known.indexOf(c) === -1 && bad.indexOf(c) === -1) bad.push(c);
        }
        if (bad.length && report("✗ " + l.id + " step " + (i + 1) + ": «" + w + "» uses " + bad.join(" "))) errors++;
        consonantHints(w).forEach(function (h) {
          if (known.indexOf(h) === -1 && report("! " + l.id + " step " + (i + 1) + ": «" + w + "» may use " + (h === "Y" ? "«ی» as a consonant" : "«و» as a consonant") + " (not taught yet)")) warnings++;
        });
      });
    });
  });
});
console.log(errors ? errors + " word(s) use letters not taught yet." : "All decoded words use taught letters.");
if (warnings) console.log(warnings + " warning(s) to check by hand.");
process.exit(errors ? 1 : 0);
