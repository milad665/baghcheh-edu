/* باغچه — step types for English (js/lessons/english.js). Listening and speaking come before reading: the child
   hears a word, sees its picture and says it aloud; meaning is shown with pictures, never with a translation.
   English is spoken with the device's English voice (B.speakEn, js/english-voice.js) and written left to right.
   The games (js/games.js) and the story animation (js/anim.js) work for English as they are: steps marked en
   (every step of an English lesson) get their English text marked lang="en" dir="ltr", and their speak buttons
   use the English voice. Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  function enText(node, text) {
    node.setAttribute("lang", "en");
    node.setAttribute("dir", "ltr");
    if (text != null) node.textContent = text;
    return node;
  }

  // Marks every piece of English text inside root, so it is written left to right ("Hello!", not "!Hello").
  function markEn(root) {
    Array.prototype.forEach.call(root.querySelectorAll("*"), function (n) {
      if (n.children.length || n.hasAttribute("lang") || !B.isEn(n.textContent)) return;
      enText(n);
    });
  }

  // The games' speak buttons: English text needs the English voice, which a device may have without a Persian one.
  var speakBtnFa = E.speakBtn;
  E.speakBtn = function (text, file) {
    if (!B.isEn(text)) return speakBtnFa(text, file);
    if (!file && !B.canSpeakEn()) return null;
    return el("button", { class: "speak-btn", type: "button", "aria-label": B.t("listen"), onclick: function () { B.speakEn(text, file); } }, [B.t("listen")]);
  };

  /* Steps of English lessons carry en: true (set in js/lessons/english.js). For them, English text is marked
     as it appears (games add tiles and captions as the child plays), and the rows where a word is built are
     written left to right. Other subjects are not touched. */
  function wrap(type) {
    var step = E.steps[type];
    E.steps[type] = function (s, box, done) {
      if (!s.en) return step(s, box, done);
      var watch = new MutationObserver(function () { markEn(box); });
      watch.observe(box, { childList: true, subtree: true, characterData: true });
      step(s, box, function (scored, first) { watch.disconnect(); done(scored, first); });
      Array.prototype.forEach.call(box.querySelectorAll(".slots, .tray, .pattern"), function (n) { n.dir = "ltr"; });
      markEn(box);
    };
  }

  // When the device has no English voice and no recording is given, the word is shown so a parent can read it.
  function noVoice(text, file) {
    if (file || B.canSpeakEn()) return null;
    return el("p", { class: "en-novoice" }, [B.t("enNoVoice"), " ", enText(el("b"), text)]);
  }

  /* A picture: an emoji (pic), a colour swatch (color, any CSS colour) or dots to count (dots), with an optional
     English word or sentence under it (label). An option may also be a sentence alone (label and no picture). */
  function pic(o) {
    if (o.color) return el("span", { class: "en-swatch", "aria-hidden": "true", style: "background:" + o.color });
    if (o.dots) {
      var d = el("span", { class: "dots", "aria-hidden": "true" });
      for (var i = 0; i < o.dots; i++) d.appendChild(el("i"));
      return d;
    }
    return o.pic ? el("span", { class: "en-pic", "aria-hidden": "true", text: o.pic }) : null;
  }
  function picFace(o) {
    if (typeof o !== "object") o = { pic: o };
    var label = o.label ? enText(el("span", { class: "en-label" }), o.label) : null;
    return el("span", { class: "en-opt" + (o.pic || o.color || o.dots ? "" : " text") }, [pic(o), label]);
  }
  function valueOf(o) {
    return typeof o !== "object" ? o : o.value != null ? o.value : o.pic || o.color || o.dots || o.label;
  }

  /* words: meet new words. words [{ pic | color | dots, en, audio }]. The child taps each picture to hear it, and says it aloud.
     show: true writes the word under the picture (from the Sprout garden on; in Seed the child only listens).
     Optional prompt. Not scored. */
  E.steps.words = function (s, box, done) {
    var prompt = s.prompt || B.t("enWordsPrompt");
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    var heard = 0;
    var next = E.nextBtn(null, function () { done(false); });
    var cards = el("div", { class: "en-words", dir: "ltr" });
    s.words.forEach(function (w) {
      var c = el("button", { class: "en-word", type: "button", "aria-label": w.en }, [
        pic(w),
        s.show ? enText(el("span", { class: "en-label" }), w.en) : null
      ]);
      c.addEventListener("click", function () {
        B.speakEn(w.en, w.audio);
        c.classList.remove("say");
        void c.offsetWidth;
        c.classList.add("say");
        if (!c.classList.contains("heard")) {
          c.classList.add("heard");
          if (++heard === s.words.length) { next.disabled = false; hint.textContent = B.t("enSayIt"); }
        }
      });
      cards.appendChild(c);
    });
    box.appendChild(cards);
    var hint = el("p", { class: "hint", "aria-live": "polite" });
    box.appendChild(hint);
    // Without any English voice the pictures cannot speak, so the child is not kept waiting.
    var silent = !B.canSpeakEn() && !s.words.some(function (w) { return w.audio; });
    if (silent) {
      box.appendChild(el("p", { class: "en-novoice" }, [B.t("enNoVoice"), " ",
        enText(el("b"), s.words.map(function (w) { return w.en; }).join(", "))]));
    } else next.disabled = true;
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [next]));
    setTimeout(function () { if (box.isConnected) B.speak(prompt); }, 300);
  };

  /* listen: hear a word or sentence (say, or a recording in audio), then tap its picture.
     options: pictures (emoji strings) or { pic | color | dots, label, en, value }; answer: the right option's
     value (by default its pic, color, dots or label).
     Optional prompt, quiet (the Persian question is not read aloud, when it is the same as the step before), show (a big letter or picture shown above the question, e.g. "s" for "which one starts with s?"),
     and en on the options: the word said when an option is tapped. Scored. */
  E.steps.listen = function (s, box, done) {
    var prompt = s.prompt || B.t("enListenPrompt");
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    if (s.show) {
      var big = el("p", { class: "letter-big en-big", text: s.show });
      box.appendChild(B.isEn(s.show) ? enText(big) : big);
    }
    if (s.say || s.audio) {
      box.appendChild(el("button", { class: "speak-btn en-listen", type: "button", "aria-label": B.t("enListenAgain"),
        onclick: function () { B.speakEn(s.say, s.audio); } }, [B.t("enListenAgain")]));
      var nv = noVoice(s.say, s.audio);
      if (nv) box.appendChild(nv);
    }
    var options = s.options.map(function (o) {
      var value = valueOf(o);
      return { node: picFace(o), value: value, aria: (typeof o === "object" && (o.en || o.label)) || String(value) };
    });
    E.choice(box, { options: options, answer: s.answer, ltr: true }, done);
    // Tapping a picture says its word, so the child keeps hearing English while choosing.
    var buttons = box.querySelectorAll(".options .opt");
    s.options.forEach(function (o, i) {
      if (typeof o === "object" && o.en && buttons[i]) buttons[i].addEventListener("click", function () { B.speakEn(o.en, o.audio); });
    });
    // The question first (in Persian), then the English to listen to. With nothing to listen to (a letter or a
    // word to read is shown instead), the names of the pictures are said, unless the step is about reading.
    var names = s.options.map(function (o) { return typeof o === "object" ? o.en : null; }).filter(Boolean).join(". ");
    setTimeout(function () {
      if (!box.isConnected) return;
      if (s.say || s.audio) B.speakFaThenEn(s.quiet ? "" : prompt, s.say, s.audio);
      else if (names) B.speakFaThenEn(prompt, names);
      else B.speak(prompt);
    }, 400);
  };

  /* letter: a letter and its sound (systematic phonics). letter ("s"), words [{ pic, en, audio }] that start with
     its sound, optional like (a Persian letter with nearly the same sound, e.g. "س"), say (what is spoken; the
     words by default, so the child hears the shared first sound) and audio (a recording of the sound itself). */
  E.steps.letter = function (s, box, done) {
    box.appendChild(el("p", { class: "prompt", text: B.t("enLetterPrompt") }));
    box.appendChild(enText(el("p", { class: "letter-big en-big" }), s.letter.toUpperCase() + " " + s.letter));
    if (s.like) box.appendChild(el("p", { class: "hint", text: B.t("enLetterLike", { fa: s.like }) }));
    var say = s.say || s.words.map(function (w) { return w.en; }).join(". ");
    var row = el("div", { class: "en-words", dir: "ltr" });
    s.words.forEach(function (w) {
      var first = w.en.slice(0, s.letter.length), rest = w.en.slice(s.letter.length);
      var label = enText(el("span", { class: "en-label" }));
      label.textContent = "";
      label.appendChild(el("b", { class: "en-first", text: first }));
      label.appendChild(document.createTextNode(rest));
      row.appendChild(el("button", { class: "en-word", type: "button", "aria-label": w.en, onclick: function () { B.speakEn(w.en, w.audio); } }, [
        el("span", { class: "en-pic", "aria-hidden": "true", text: w.pic }), label
      ]));
    });
    box.appendChild(row);
    var again = el("button", { class: "speak-btn", type: "button", "aria-label": B.t("enListenAgain"), onclick: function () { B.speakEn(say, s.audio); } }, [B.t("enListenAgain")]);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [again, E.nextBtn(null, function () { done(false); })]));
    setTimeout(function () { if (box.isConnected) B.speakFaThenEn(B.t("enLetterPrompt"), say, s.audio); }, 400);
  };

  /* tip: how to practise this lesson at home, for parents (who may know no English themselves). text. Not scored. */
  E.steps.tip = function (s, box, done) {
    box.appendChild(el("p", { class: "celebrate", "aria-hidden": "true", text: s.pic || "🏡" }));
    box.appendChild(el("div", { class: "parent-tip" }, [
      el("strong", { text: B.t("enTipTitle") }),
      el("p", { style: "margin:6px 0 0", text: s.text })
    ]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("finish"), function () { done(false); })]));
  };

  Object.keys(E.steps).forEach(wrap);
})();
