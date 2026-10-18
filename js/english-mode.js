/* باغچه — lessons in English, as a second language. Persian stays the main language of Baghcheh; a child can
   play any lesson that has an English version in English too (the «🔤 English» button in the lesson bar,
   remembered for each child). It is the same lesson, so progress and reviews are shared.
   Persian reading and writing (subject read) are never played in English, and English reading and writing
   has its own course (subject english).

   An English version is an overlay in js/en/<subject>.js:
     B.EN["math-seed-3"] = { title: "…", steps: [ {}, { prompt: "…", scenes: [{ caption: "…" }] }, … ] }
   steps (and any list inside a step) are matched by position; {} or null leaves a step as it is. Only the words
   are given: the numbers, pictures and answers come from the Persian lesson. Persian digits and «؟» anywhere in
   the lesson become 0–9 and "?". The player's own words come from B.T_EN (js/en/strings.js). */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var el = B.el;
  var NO_ENGLISH = { read: true, english: true };
  var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

  B.hasEnglish = function (lesson) {
    return !!lesson && !NO_ENGLISH[lesson.subject] && !!B.EN[lesson.id];
  };

  function latin(v) {
    if (typeof v !== "string") return v;
    return v.replace(/[۰-۹]/g, function (d) { return FA_DIGITS.indexOf(d); }).replace(/؟/g, "?");
  }
  // A deep copy of x with the overlay o laid on top (lists by position).
  function merge(x, o) {
    if (o === undefined || o === null) {
      if (Array.isArray(x)) return x.map(function (v) { return merge(v); });
      if (x && typeof x === "object") { var c = {}; Object.keys(x).forEach(function (k) { c[k] = merge(x[k]); }); return c; }
      return latin(x);
    }
    if (Array.isArray(x) && Array.isArray(o)) return x.map(function (v, i) { return merge(v, o[i]); });
    if (x && typeof x === "object" && typeof o === "object" && !Array.isArray(o)) {
      var r = {};
      Object.keys(x).forEach(function (k) { r[k] = merge(x[k], o[k]); });
      Object.keys(o).forEach(function (k) { if (!(k in x)) r[k] = merge(o[k]); });
      return r;
    }
    return latin(o);
  }
  B.englishLesson = function (lesson) { return merge(lesson, B.EN[lesson.id]); };

  // ---- Switching the player's words, digits and voice to English, and back ----
  var saved = null;
  function copy(v) { return v && typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v; }
  // Lists and tables are changed in place: the player keeps references to some of them (e.g. the praise list).
  function put(key, v) {
    var cur = B.T[key];
    if (Array.isArray(cur) && Array.isArray(v)) cur.splice.apply(cur, [0, cur.length].concat(copy(v)));
    else if (cur && typeof cur === "object" && v && typeof v === "object") {
      Object.keys(cur).forEach(function (k) { delete cur[k]; });
      Object.assign(cur, copy(v));
    } else B.T[key] = v;
  }
  function setEnglish(on) {
    if (on === !!saved) return;
    if (on) {
      saved = { T: {}, fa: B.fa, canSpeak: B.canSpeak, nums: B.NUMBER_WORDS.slice() };
      Object.keys(B.T_EN || {}).forEach(function (k) { saved.T[k] = copy(B.T[k]); put(k, B.T_EN[k]); });
      B.fa = function (n) { return latin(String(n)); };
      // Speak buttons appear when the device has an English voice, even without a Persian one.
      B.canSpeak = function () { return B.canSpeakEn(); };
      if (B.NUMBER_WORDS_EN) B.NUMBER_WORDS.splice.apply(B.NUMBER_WORDS, [0, B.NUMBER_WORDS.length].concat(B.NUMBER_WORDS_EN));
      return;
    }
    Object.keys(saved.T).forEach(function (k) { put(k, saved.T[k]); });
    B.fa = saved.fa;
    B.canSpeak = saved.canSpeak;
    B.NUMBER_WORDS.splice.apply(B.NUMBER_WORDS, [0, B.NUMBER_WORDS.length].concat(saved.nums));
    saved = null;
  }
  B.inEnglish = function () { return !!saved; };
  B.leaveEnglish = function () { setEnglish(false); };
  // Leaving the lesson (or its end screen) brings the Persian words back.
  window.addEventListener("hashchange", function () { setEnglish(false); });

  function wantsEnglish() {
    var p = B.currentProfile && B.currentProfile();
    return !!(p && p.lessonLang === "en");
  }
  function remember(on) {
    var p = B.currentProfile && B.currentProfile();
    if (!p) return;
    if (on) p.lessonLang = "en"; else delete p.lessonLang;
    B.save();
  }

  // The lesson player, with the English switch in its top bar.
  var play = B.playLesson;
  B.playLesson = function (lesson, root, onFinish, onExit, start) {
    var can = B.hasEnglish(lesson), en = can && wantsEnglish();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setEnglish(en);
    play(en ? B.englishLesson(lesson) : lesson, root, onFinish, onExit, start);
    var box = root.querySelector(".lesson");
    if (!box) return;
    if (en) {
      box.setAttribute("lang", "en");
      box.setAttribute("dir", "ltr");
      // The player writes «؟» in sums («۸ + ۵ = ؟») and in the comparing sign: "?" in English.
      var fix = function () {
        var w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT), n;
        while ((n = w.nextNode())) if (n.nodeValue.indexOf("؟") !== -1) n.nodeValue = latin(n.nodeValue);
      };
      fix();
      var watch = new MutationObserver(function () { if (!box.isConnected) watch.disconnect(); else fix(); });
      watch.observe(box, { childList: true, subtree: true, characterData: true });
    }
    if (!can) return;
    var bar = box.querySelector(".row"), exit = bar && bar.querySelector(".btn.quiet");
    var sw = el("button", { class: "btn quiet lang-switch", type: "button", "aria-pressed": en ? "true" : "false",
      title: B.t(en ? "enModeOffHint" : "enModeOnHint"), text: B.t(en ? "enModeOff" : "enModeOn"),
      onclick: function () {
        remember(!en);
        B.playLesson(lesson, root, onFinish, onExit, start);
      } });
    // The button names the other language, in that language, so a child can find it.
    sw.setAttribute("lang", en ? "fa" : "en");
    if (bar) bar.insertBefore(sw, exit);
  };
})();
