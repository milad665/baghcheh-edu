/* باغچه — step types for فارسی (reading) before letters.
   - clap: the child hears a word and taps 👏 once per syllable (هجا), then presses «تمام شد». A wrong count is
     never marked wrong: the word is clapped together, part by part, and the child tries once more. Not scored.
     Fields: word (the word, said aloud), parts (its syllables, said one by one when clapping together),
     optional pic (emoji), prompt, say (what is said first, default the word), audio.
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
})();
