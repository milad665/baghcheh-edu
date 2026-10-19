/* باغچه — step types for فارسی (reading) before letters.
   - clap: the child hears a word and taps 👏 once per syllable (هجا), then presses «تمام شد». A wrong count is
     never marked wrong: the word is clapped together, part by part, and the child tries once more. Not scored.
     Fields: word (the word, said aloud), parts (its syllables, said one by one when clapping together),
     optional pic (emoji), prompt, say (what is said first, default the word), audio.
   - readaloud: fluency for readers (Sapling). The child reads a short decodable passage aloud while the parent taps
     the words that were hard; then they go over those words together and the child reads the whole passage once
     more, and the parent taps the words that went well this time. Accuracy only: no timer, nothing counted against
     the child, not scored, and the marks are not stored. Fields: text, optional pic (emoji), prompt.
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  E.steps.clap = function (s, box, done) {
    var n = s.parts.length, max = Math.max(n + 3, 5);
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
        fb.textContent = B.t("clapRight", { n: B.fa(n) });
        B.speak(fb.textContent);
        setTimeout(function () { together(function () { finish(B.t("clapRight", { n: B.fa(n) })); }); }, 1600);
        return;
      }
      tries++;
      fb.className = "feedback try";
      fb.textContent = B.t("clapTogether");
      B.speak(fb.textContent);
      setTimeout(function () {
        together(function () {
          if (tries >= 2) { finish(B.t("clapParts", { n: B.fa(n) })); return; }
          clear();
          fb.textContent = B.t("clapYourTurn");
          B.speak(fb.textContent);
        });
      }, 1600);
    }

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
