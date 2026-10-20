/* باغچه — step types for فارسی (reading) before letters.
   - clap: the child hears a word and taps 👏 once per syllable (هجا), then presses «تمام شد». A wrong count is
     never marked wrong: the word is clapped together, part by part, and the child tries once more. Not scored.
     Fields: word (the word, said aloud), parts (its syllables, said one by one when clapping together),
     optional pic (emoji), prompt, say (what is said first, default the word), audio, words: true (word is a short
     sentence and parts are its words: one clap for each word, and the feedback counts words), sounds: true (parts are
     the word's sounds, said one by one like a robot: one clap for each sound, and the feedback counts sounds; English
     words and sounds are spoken with the English voice, js/english-voice.js).
   - readaloud: fluency for readers (Sapling). The child reads a short decodable passage aloud while the parent taps
     the words that were hard; then they go over those words together and the child reads the whole passage once
     more, and the parent taps the words that went well this time. Accuracy only: no timer, nothing counted against
     the child, not scored, and the marks are not stored. Fields: text, optional pic (emoji), prompt.
   - boxes: sound boxes (Elkonin boxes). The child hears a word (with its picture) and puts one counter into a box for
     each sound, saying it as it goes in; with letters: true the child puts each sound's letter into its box instead,
     so the same step teaches spelling. The first sound's box is on the right. Fields: word (said aloud), parts (its
     sounds, said one by one; with letters, the letters or letter forms that go in the boxes), optional pic, prompt,
     say, audio, extra (letters that don't belong, with letters), sounds (what to say for each part, when the part
     itself would be read as a letter name). Counters: not scored. Letters: scored, right on the first try with no
     wrong letter; after two misses on a box its letter is shown.
   - mark: tap words in a sentence or short text to mark them (the names, the verbs, the describing words…). Fields:
     text, answer (the words to mark, as written in the text without punctuation), optional prompt, say, audio. The
     child taps words (a tap again unmarks) and presses «تمام شد»; a wrong set bounces the extra words and says how
     many are still missing; after two tries the right words are shown. Scored: right on the first try when the first
     check is right.
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  E.steps.clap = function (s, box, done) {
    var n = s.parts.length, max = Math.max(n + 3, 5);
    var RIGHT = s.words ? "clapRightWords" : s.sounds ? "clapRightSounds" : "clapRight", PARTS = s.words ? "clapPartsWords" : s.sounds ? "clapPartsSounds" : "clapParts";
    var taps = 0, tries = 0, busy = false;
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("clapPrompt") }));
    if (s.pic) box.appendChild(el("p", { class: "clap-pic", "aria-hidden": "true", text: s.pic }));
    var say = s.say || s.word;
    var sb = E.speakBtn(say, s.audio);
    if (sb) box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb]));
    var dots = el("div", { class: "clap-dots", "aria-hidden": "true" });
    var count = el("p", { class: "clap-count", "aria-live": "polite" });
    var hand = el("button", { class: "clap-btn", type: "button", "aria-label": B.t("clapAria"), text: "👏" });
    var reset = el("button", { class: "btn quiet", type: "button", text: B.t("clapReset") });
    var check = E.nextBtn(B.t("clapDone"), checkTaps);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    var next = E.nextBtn(null, function () { done(false); });
    next.hidden = true;
    box.appendChild(dots);
    box.appendChild(count);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [hand]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [reset, check, next]));
    box.appendChild(fb);

    function drawDots(k, lit) {
      dots.textContent = "";
      for (var i = 0; i < k; i++) dots.appendChild(el("i", { class: i < lit ? "on" : "" }));
    }
    function clear() { taps = 0; drawDots(0, 0); count.textContent = ""; }

    hand.addEventListener("click", function () {
      if (busy || taps >= max) return;
      taps++;
      drawDots(taps, taps);
      count.textContent = B.fa(taps);
      hand.classList.remove("clapped");
      void hand.offsetWidth;
      hand.classList.add("clapped");
    });
    reset.addEventListener("click", function () { if (!busy) { clear(); fb.textContent = ""; } });

    // Clap the word together: one dot lights for each part as it is said.
    function together(then) {
      busy = true;
      drawDots(n, 0);
      var i = 0;
      (function step() {
        if (!box.isConnected) return;
        if (i >= n) { busy = false; then(); return; }
        drawDots(n, i + 1);
        B.speak(s.parts[i]);
        i++;
        setTimeout(step, 1000);
      })();
    }
    function finish(text) {
      hand.disabled = true;
      reset.hidden = true;
      check.hidden = true;
      next.hidden = false;
      fb.className = "feedback good";
      fb.textContent = text;
      next.focus();
    }

    function checkTaps() {
      if (busy) return;
      if (!taps) { fb.className = "feedback try"; fb.textContent = B.t("clapFirst"); return; }
      if (taps === n) {
        fb.className = "feedback good";
        fb.textContent = B.t(RIGHT, { n: B.fa(n) });
        B.speak(fb.textContent);
        setTimeout(function () { together(function () { finish(B.t(RIGHT, { n: B.fa(n) })); }); }, 1600);
        return;
      }
      tries++;
      fb.className = "feedback try";
      fb.textContent = B.t("clapTogether");
      B.speak(fb.textContent);
      setTimeout(function () {
        together(function () {
          if (tries >= 2) { finish(B.t(PARTS, { n: B.fa(n) })); return; }
          clear();
          fb.textContent = B.t("clapYourTurn");
          B.speak(fb.textContent);
        });
      }, 1600);
    }

    if (sb) setTimeout(function () { if (box.isConnected) B.speak(say, s.audio); }, 300);
  };

  E.steps.mark = function (s, box, done) {
    var tries = 0;
    var clean = function (w) { return w.replace(/[«».،؛:؟!?()]/g, ""); };
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("markPrompt") }));
    var sb = E.speakBtn(s.say, s.audio);
    if (sb) box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb]));
    var para = el("p", { class: "passage mark-text" });
    var words = s.text.split(/\s+/).map(function (w) {
      var b = el("button", { class: "mark-word", type: "button", "aria-pressed": "false", text: w });
      b.addEventListener("click", function () {
        if (b.disabled) return;
        var on = b.getAttribute("aria-pressed") !== "true";
        b.setAttribute("aria-pressed", String(on));
        b.classList.toggle("on", on);
      });
      para.appendChild(b);
      para.appendChild(document.createTextNode(" "));
      return b;
    });
    box.appendChild(para);
    var fb = E.feedback(box);
    var check = E.nextBtn(B.t("clapDone"), function () {
      var extra = words.filter(function (b) { return b.classList.contains("on") && s.answer.indexOf(clean(b.textContent)) < 0; });
      var missing = words.filter(function (b) { return !b.classList.contains("on") && s.answer.indexOf(clean(b.textContent)) >= 0; });
      if (!extra.length && !missing.length) {
        words.forEach(function (b) { b.disabled = true; if (b.classList.contains("on")) b.classList.add("right"); });
        var t = fb.good();
        B.speak(t);
        check.hidden = true;
        setTimeout(function () { done(true, tries === 0); }, 1200);
        return;
      }
      tries++;
      extra.forEach(function (b) { E.bounce(b); b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
      if (tries >= 2) {
        missing.forEach(function (b) { b.classList.add("show"); });
        fb.tryAgain(B.t("markShow"));
      } else fb.tryAgain(missing.length ? B.t("markMissing", { n: B.fa(missing.length) }) : B.t("markExtra"));
      B.speak(fb && box.querySelector(".feedback").textContent);
    });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [check]));
    if (sb) setTimeout(function () { if (box.isConnected) B.speak(s.say, s.audio); }, 300);
  };

  E.steps.boxes = function (s, box, done) {
    var n = s.parts.length, letters = !!s.letters, at = 0, misses = 0, missHere = 0;
    function sound(i) { return (s.sounds && s.sounds[i]) || s.parts[i]; }
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t(letters ? "boxesLettersPrompt" : "boxesPrompt") }));
    if (s.pic) box.appendChild(el("p", { class: "clap-pic", "aria-hidden": "true", text: s.pic }));
    var say = s.say || s.word;
    var sb = E.speakBtn(say, s.audio);
    if (sb) box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb]));
    var row = el("div", { class: "slots boxes" + (letters ? " letters" : "") });
    var holes = s.parts.map(function (p, i) {
      var h = el("span", { class: "slot-box", "aria-label": B.t("slotAria", { n: B.fa(i + 1) }) });
      row.appendChild(h);
      return h;
    });
    box.appendChild(row);
    var word = el("p", { class: "blend-word", text: s.word, hidden: "hidden" });
    box.appendChild(word);
    var fb = E.feedback(box);
    var next = E.nextBtn(null, function () { done(letters, misses === 0); });
    next.hidden = true;

    function complete() {
      setTimeout(function () {
        if (!box.isConnected) return;
        if (letters || s.showWord) word.hidden = false;
        var t = fb.good(B.t("boxesDone", { n: B.fa(n) }));
        B.speak(say + ". " + t, s.audio);
        next.hidden = false;
        next.focus();
      }, 700);
    }

    if (!letters) {
      var counter = el("button", { class: "clap-btn box-counter", type: "button", "aria-label": B.t("boxesCounter") }, [el("i", { class: "box-dot" })]);
      counter.addEventListener("click", function () {
        if (at >= n) return;
        holes[at].appendChild(el("i", { class: "box-dot" }));
        holes[at].classList.add("filled");
        B.speak(sound(at));
        at++;
        if (at >= n) { counter.disabled = true; complete(); }
      });
      box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [counter]));
    } else {
      var tiles = s.parts.concat(s.extra || []).map(function (p) { return p; });
      for (var i = tiles.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = tiles[i]; tiles[i] = tiles[j]; tiles[j] = t; }
      var tray = el("div", { class: "tray letters" });
      var buttons = tiles.map(function (p) {
        var b = el("button", { class: "tile-btn", type: "button", "aria-label": p }, [E.face(p)]);
        b.addEventListener("click", function () {
          if (b.disabled || at >= n) return;
          if (p === s.parts[at]) {
            holes[at].appendChild(E.face(p));
            holes[at].classList.add("filled");
            b.disabled = true; b.classList.add("used");
            buttons.forEach(function (x) { x.classList.remove("show"); });
            B.speak(sound(at));
            at++; missHere = 0;
            fb.clear();
            if (at >= n) { buttons.forEach(function (x) { x.disabled = true; }); complete(); }
          } else {
            misses++; missHere++;
            E.bounce(b);
            fb.tryAgain(B.t("boxesListen"));
            B.speak(sound(at));
            if (missHere >= 2) {
              var right = buttons.find(function (x) { return !x.disabled && x.getAttribute("aria-label") === s.parts[at]; });
              if (right) right.classList.add("show");
            }
          }
        });
        tray.appendChild(b);
        return b;
      });
      box.appendChild(tray);
    }
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [next]));
    if (sb) setTimeout(function () { if (box.isConnected) B.speak(say, s.audio); }, 300);
  };

  E.steps.readaloud = function (s, box, done) {
    var phase = 1;
    box.appendChild(el("p", { class: "prompt", text: s.prompt || B.t("readAloudPrompt") }));
    if (s.pic) box.appendChild(el("p", { class: "clap-pic", "aria-hidden": "true", text: s.pic }));
    var tip = el("p", { class: "parent-tip readaloud-tip", text: B.t("readAloudParent") });
    box.appendChild(tip);
    // Every word is a button for the parent: tap once for "hard", again to take the mark off.
    var passage = el("p", { class: "passage readaloud" });
    var words = [];
    String(s.text).split(/\s+/).filter(Boolean).forEach(function (w, i) {
      if (i) passage.appendChild(document.createTextNode(" "));
      var b = el("button", { type: "button", class: "ra-word", "aria-pressed": "false", text: w });
      b.addEventListener("click", function () { tap(b); });
      words.push(b);
      passage.appendChild(b);
    });
    box.appendChild(passage);
    var practice = el("div", { class: "ra-practice" });
    box.appendChild(practice);
    var fb = el("p", { class: "feedback", "aria-live": "polite" });
    box.appendChild(fb);
    var next = E.nextBtn(B.t("readAloudDone"), finished);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [next]));

    function bare(w) { return w.replace(/[«».،؛:؟!?]/g, ""); }
    function tap(b) {
      if (phase === 1) {
        var on = !b.classList.contains("hard");
        b.classList.toggle("hard", on);
        b.setAttribute("aria-pressed", String(on));
      } else if (b.classList.contains("hard")) {
        var ok = !b.classList.contains("better");
        b.classList.toggle("better", ok);
        b.setAttribute("aria-pressed", String(ok));
      }
    }
    function finished() {
      var hard = words.filter(function (b) { return b.classList.contains("hard"); });
      if (phase === 1) {
        phase = 2;
        practice.textContent = "";
        if (hard.length) {
          // The hard words on their own: tap one to hear it, read it together, then read it once more.
          practice.appendChild(el("p", { class: "prompt", text: B.t("readAloudPractice") }));
          var row = el("div", { class: "row ra-hard", style: "justify-content:center" });
          hard.forEach(function (b) {
            var w = bare(b.textContent);
            row.appendChild(el("button", { type: "button", class: "btn secondary ra-hard-word", text: w, "aria-label": B.t("readAloudHear", { word: w }), onclick: function () { B.speak(w); } }));
            b.setAttribute("aria-pressed", "false");
          });
          practice.appendChild(row);
          tip.textContent = B.t("readAloudParentAgain");
        } else {
          tip.textContent = B.t("readAloudParentNone");
        }
        fb.className = "feedback good";
        fb.textContent = B.t("readAloudAgain");
        B.speak(fb.textContent);
        next.textContent = B.t("readAloudDoneAgain");
        return;
      }
      if (phase === 3) { done(false); return; }
      phase = 3;
      var better = hard.filter(function (b) { return b.classList.contains("better"); }).length;
      words.forEach(function (b) { b.disabled = true; });
      fb.className = "feedback good";
      fb.textContent = !hard.length ? B.t("readAloudAllGood") : better ? B.t("readAloudBetter", { n: B.fa(better) }) : B.t("readAloudKeepGoing");
      B.speak(fb.textContent);
      next.textContent = B.t("next");
      next.focus();
    }
  };
})();
