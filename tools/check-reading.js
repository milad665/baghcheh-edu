/* Checks that every word a child decodes in the reading lessons uses only letters taught so far.
   Run from the project folder:  node tools/check-reading.js
   Checked: intro example words, blend parts and words, words shown in "choose" steps, word options,
   passage and readaloud text and passage options, whole words to trace, and the words and letters on game tiles and cards (build, pairs, sort,
   order, pattern). Not checked: instructions and questions (the grown-up reads them),
   and the letter shapes in "find the letter" steps (other letters are there on purpose).
   Consonant «و» (v) and «ی» (y) are spotted by a rough rule and reported as warnings. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");

// content.js first (it creates B.LESSONS), then every subject's lesson file.
var ctx = { window: {} };
var js = path.join(__dirname, "..", "js");
vm.runInNewContext(fs.readFileSync(path.join(js, "content.js"), "utf8"), ctx);
fs.readdirSync(path.join(js, "lessons")).filter(function (f) { return /\.js$/.test(f); }).sort().forEach(function (f) {
  vm.runInNewContext(fs.readFileSync(path.join(js, "lessons", f), "utf8"), ctx);
});
var LESSONS = ctx.window.B.LESSONS;

// What each lesson teaches, in order. «Y» = «ی» as a consonant.
var TEACHES = {
  "read-sprout-1": "آاب", "read-sprout-2": "دم", "read-sprout-3": "سَ", "read-sprout-4": "", "read-sprout-5": "", "read-sprout-6": "",
  "read-sapling-1": "وت", "read-sapling-2": "ری", "read-sapling-3": "نز", "read-sapling-4": "شِ", "read-sapling-5": "کُ", "read-sapling-18": "",
  "read-sapling-6": "",
  "read-sapling-7": "ه", "read-sapling-8": "پل", "read-sapling-9": "جگ", "read-sapling-10": "چخ", "read-sapling-11": "فق", "read-sapling-19": "",
  "read-sapling-12": "Yژ", "read-sapling-13": "صث", "read-sapling-14": "ذضظ", "read-sapling-15": "طح", "read-sapling-16": "عغ",
  "read-sapling-17": "ًّ", "read-sapling-20": "ءئ", "read-sapling-21": "", "read-sapling-22": "", "read-sapling-23": "",
  "read-sapling-24": "", "read-sapling-25": "", "read-sapling-26": "", "read-sapling-27": "", "read-sapling-28": ""
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
  // Games: every word or letter shown on a tile or card is read by the child.
  function shown(v) {
    var t = typeof v === "object" && v !== null ? v.label : v;
    if (typeof t === "string" && /[؀-ۿ]/.test(t)) return t;
    return null;
  }
  if (s.type === "build") t = t.concat([s.word], s.parts, s.extra || []);
  if (s.type === "pairs") s.pairs.forEach(function (p) { t.push(shown(p[0]), shown(p[1])); });
  if (s.type === "sort") s.items.concat(s.baskets).forEach(function (v) { t.push(shown(v)); });
  if (s.type === "order") s.items.forEach(function (v) { t.push(shown(v)); });
  if (s.type === "pattern") s.seq.concat(s.options).forEach(function (v) { t.push(shown(v)); });
  if (s.type === "readaloud") t.push(s.text);
  // A whole word to write (trace of a joined word, js/strokes.js).
  if (s.type === "trace" && s.letter && s.letter.replace(/ـ/g, "").length > 1) t.push(s.letter);
  if (s.type === "passage") {
    t.push(s.text);
    if (!s.pic) s.options.forEach(function (o) { t.push(typeof o === "object" ? o.label : o); });
  }
  return t.filter(function (x) { return x != null; });
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
