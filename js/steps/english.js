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

  /* blend in English: each letter (or letter pair) is a sound button: tapping it says its sound. sounds: what the
     voice says for each part (e.g. ["sss", "ah", "tuh"] for s-a-t; a recording is better, see audio), else the part
     itself. The whole word is then said by the blend button (say). */
  function soundButtons(s, box) {
    var pr = box.querySelector(".prompt");
    if (pr) pr.textContent = B.t("enBlendPrompt");
    Array.prototype.forEach.call(box.querySelectorAll(".blend span"), function (sp, i) {
      sp.setAttribute("role", "button");
      sp.setAttribute("tabindex", "0");
      sp.style.cursor = "pointer";
      function sayIt() { B.speakEn((s.sounds && s.sounds[i]) || s.parts[i], s.audios && s.audios[i]); }
      sp.addEventListener("click", sayIt);
      sp.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sayIt(); } });
    });
  }

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
      Array.prototype.forEach.call(box.querySelectorAll(".slots, .tray, .pattern, .blend, .passage.readaloud, .ra-practice"), function (n) {
        n.dir = "ltr"; n.style.direction = "ltr";
      });
      if (type === "blend") soundButtons(s, box);
      markEn(box);
    };
  }

  // When the device has no English voice and no recording is given, the word is shown so a parent can read it.
  function noVoice(text, file) {
    if (file || B.canSpeakEn()) return null;
    return el("p", { class: "en-novoice" }, [B.t("enNoVoice"), " ", enText(el("b"), text)]);
  }

  /* A picture: an emoji (pic, optionally drawn bigger or smaller with scale: 1.6, or stretched with [1.8, 1]), a
     colour swatch (color, any CSS colour), dots to count (dots) or a drawing (art: a name in B.RIG, for things with no emoji),
     with an optional English word or sentence under it (label). An option may also be a sentence alone (label and no picture).
     With where ("in", "on", "under" or "next to") and ref (an emoji, e.g. 📦), pic is drawn in, on, under or
     next to ref: a picture of where something is. */
  function where(o) {
    return el("span", { class: "en-where " + o.where.replace(/ /g, "-"), role: "img", "aria-label": o.en || o.label || o.where }, [
      el("span", { class: "en-ref", text: o.ref }), el("span", { class: "en-thing", text: o.pic })
    ]);
  }
  function pic(o) {
    if (o.where) return where(o);
    if (o.color) return el("span", { class: "en-swatch", "aria-hidden": "true", style: "background:" + o.color });
    if (o.dots) {
      var d = el("span", { class: "dots", "aria-hidden": "true" });
      for (var i = 0; i < o.dots; i++) d.appendChild(el("i"));
      return d;
    }
    if (o.art && B.RIG && B.RIG[o.art]) return artPic(o.art);
    if (!o.pic) return null;
    var span = el("span", { class: "en-pic", "aria-hidden": "true", text: o.pic });
    // scale: the same picture bigger or smaller (big, small), or [x, y] to stretch it (long, short).
    if (o.scale) {
      var k = [].concat(o.scale);
      span.style.display = "inline-block";
      span.style.transform = "scale(" + k[0] + "," + (k[1] == null ? k[0] : k[1]) + ")";
    }
    return span;
  }
  // A drawing from js/art/rig*.js as a picture (for things with no emoji: a rubber, a cupboard), fitted to its box.
  function artPic(name) {
    var NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg"), g = document.createElementNS(NS, "g");
    var r = B.RIG[name];
    g.innerHTML = typeof r === "function" ? r({}) : r;
    svg.appendChild(g);
    svg.setAttribute("class", "en-art");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("viewBox", "-12 -24 24 24");
    svg.style.width = svg.style.height = "64px";
    requestAnimationFrame(function () {
      try {
        var bb = g.getBBox(), m = Math.max(bb.width, bb.height) * 0.08;
        if (bb.width && bb.height) svg.setAttribute("viewBox", [bb.x - m, bb.y - m, bb.width + 2 * m, bb.height + 2 * m].join(" "));
      } catch (e) { /* not on the screen yet: keep the default box */ }
    });
    return svg;
  }
  function picFace(o) {
    if (typeof o !== "object") o = { pic: o };
    var label = o.label ? enText(el("span", { class: "en-label" }), o.label) : null;
    return el("span", { class: "en-opt" + (o.pic || o.art || o.color || o.dots ? "" : " text") }, [pic(o), label]);
  }
  function valueOf(o) {
    return typeof o !== "object" ? o : o.value != null ? o.value : o.where || o.pic || o.art || o.color || o.dots || o.label;
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
     Optional prompt, quiet (the Persian question is not read aloud, when it is the same as the step before), show (a big letter or picture shown above the question, e.g. "s" for "which one starts with s?", or a picture of where something is: { pic, ref, where }),
     and en on the options: the word said when an option is tapped. Scored. */
  E.steps.listen = function (s, box, done) {
    var prompt = s.prompt || B.t("enListenPrompt");
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    if (s.show && typeof s.show === "object") box.appendChild(el("p", { class: "en-show" }, [pic(s.show)]));
    else if (s.show) {
      // A sentence (to complete or to read) is shown smaller than a letter or a word.
      var big = el("p", { class: "letter-big en-big" + (s.show.length > 14 ? " en-sentence" : ""), text: s.show });
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
      if (s.say || s.audio) B.speakSeq([{ text: s.quiet ? "" : prompt, lang: "fa" }, { text: s.say, lang: "en", file: s.audio }]);
      else if (names) B.speakSeq([{ text: prompt, lang: "fa" }, { text: names, lang: "en" }]);
      else B.speak(prompt);
    }, 400);
  };

  /* letter: a letter and its sound (systematic phonics). letter ("s"), words [{ pic, en, audio }] that start with
     its sound, optional like (a Persian letter with nearly the same sound, e.g. "س"), say (what is spoken; the
     words by default, so the child hears the shared first sound), audio (a recording of the sound itself) and
     end: true (the words end with the letter instead, for x: box, fox, six) or inside: true (the letters are
     anywhere in the word, for vowel pairs: rain, tree, boat). A split vowel is written "a-e" (cake, bike, home):
     the vowel and the e at the end are shown in bold. The letter may be two letters with
     one sound ("sh"). */
  E.steps.letter = function (s, box, done) {
    var prompt = B.t(s.end ? "enLetterEndPrompt" : /-e$/.test(s.letter) ? "enLetterSplitPrompt" : s.inside ? "enLetterInPrompt" : "enLetterPrompt");
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    box.appendChild(enText(el("p", { class: "letter-big en-big" }), s.letter.toUpperCase() + " " + s.letter));
    if (s.like) box.appendChild(el("p", { class: "hint", text: B.t("enLetterLike", { fa: s.like }) }));
    var say = s.say || s.words.map(function (w) { return w.en; }).join(". ");
    var row = el("div", { class: "en-words", dir: "ltr" });
    s.words.forEach(function (w) {
      var cut = s.end ? w.en.length - s.letter.length : s.letter.length;
      var label = enText(el("span", { class: "en-label" }));
      label.textContent = "";
      var at = s.inside ? w.en.indexOf(s.letter) : -1;
      var split = /^[a-z]-e$/.test(s.letter) && w.en.slice(-1) === "e" ? w.en.lastIndexOf(s.letter[0], w.en.length - 3) : -1;
      if (split >= 0) {
        // A split vowel (a-e in cake): the vowel and the e at the end, with the letter between them.
        label.appendChild(document.createTextNode(w.en.slice(0, split)));
        label.appendChild(el("b", { class: "en-first", text: w.en[split] }));
        label.appendChild(document.createTextNode(w.en.slice(split + 1, -1)));
        label.appendChild(el("b", { class: "en-first", text: "e" }));
      } else if (at >= 0) {
        label.appendChild(document.createTextNode(w.en.slice(0, at)));
        label.appendChild(el("b", { class: "en-first", text: s.letter }));
        label.appendChild(document.createTextNode(w.en.slice(at + s.letter.length)));
      } else if (s.end) {
        label.appendChild(document.createTextNode(w.en.slice(0, cut)));
        label.appendChild(el("b", { class: "en-first", text: w.en.slice(cut) }));
      } else {
        label.appendChild(el("b", { class: "en-first", text: w.en.slice(0, cut) }));
        label.appendChild(document.createTextNode(w.en.slice(cut)));
      }
      row.appendChild(el("button", { class: "en-word", type: "button", "aria-label": w.en, onclick: function () { B.speakEn(w.en, w.audio); } }, [
        el("span", { class: "en-pic", "aria-hidden": "true", text: w.pic }), label
      ]));
    });
    box.appendChild(row);
    var again = el("button", { class: "speak-btn", type: "button", "aria-label": B.t("enListenAgain"), onclick: function () { B.speakEn(say, s.audio); } }, [B.t("enListenAgain")]);
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [again, E.nextBtn(null, function () { done(false); })]));
    setTimeout(function () { if (box.isConnected) B.speakSeq([{ text: prompt, lang: "fa" }, { text: say, lang: "en", file: s.audio }]); }, 400);
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

  /* record: the child says something in English and hears it back next to the model. say (the model, spoken by
     the English voice) or audio; optional example (the model written out, shown on a sheet; say by default),
     prompt (what to say, in Persian), pic (an emoji or { art, pic, … } picture to talk about, e.g. a scene to
     describe), check [short questions for the parent: «با صدای بلند و واضح گفت؟»], note (instead of the general
     line for the parent). The recording stays on the device, in memory, only while the step is open: nothing is
     stored or sent. Without a microphone (or when it is not allowed) the child says it aloud to the parent.
     Not scored. */
  E.steps.record = function (s, box, done) {
    var prompt = s.prompt || B.t("recPrompt");
    box.appendChild(el("p", { class: "prompt", text: prompt }));
    var p = s.pic && pic(typeof s.pic === "object" ? s.pic : { pic: s.pic });
    if (p) box.appendChild(el("p", { class: "en-show rec-pic" }, [p]));
    var model = s.example || s.say;
    if (model) {
      var hear = el("button", { class: "speak-btn", type: "button", "aria-label": B.t("recModel"), onclick: function () { B.speakEn(s.say || model, s.audio); } }, [B.t("recModel")]);
      box.appendChild(el("div", { class: "paper-sheet rec-model" }, [
        enText(el("p", { class: "paper-line en" }), model),
        el("div", { class: "row", style: "justify-content:center" }, [hear])
      ]));
      var nv = noVoice(s.say || model, s.audio);
      if (nv) box.appendChild(nv);
    }

    var stream = null, rec = null, url = null, chunks = [], player = null;
    var status = el("p", { class: "hint rec-status", "aria-live": "polite", style: "text-align:center" });
    var recBtn = el("button", { class: "btn rec-btn", type: "button", text: B.t("recStart") });
    var mine = el("button", { class: "btn secondary", type: "button", text: B.t("recMine"), hidden: "hidden", onclick: function () {
      if (!url) return;
      if (player) player.pause();
      player = new Audio(url);
      player.play();
    } });
    var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    function stopStream() {
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      stream = null;
    }
    function noMic() {
      recBtn.hidden = true;
      status.textContent = B.t("recNoMic");
    }
    function start() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
        if (!box.isConnected) { st.getTracks().forEach(function (t) { t.stop(); }); return; }
        stream = st;
        chunks = [];
        rec = new MediaRecorder(st);
        rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
        rec.onstop = function () {
          stopStream();
          if (url) URL.revokeObjectURL(url);
          url = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || "audio/webm" })) : null;
          recBtn.textContent = B.t("recAgain");
          recBtn.classList.remove("on");
          mine.hidden = !url;
          status.textContent = url ? B.t("recListen") : "";
          if (url) mine.click();
        };
        rec.start();
        recBtn.textContent = B.t("recStop");
        recBtn.classList.add("on");
        status.textContent = B.t("recNow");
        // A long talk is fine (a short presentation is 1–2 minutes), but never record forever.
        setTimeout(function () { if (rec && rec.state === "recording") rec.stop(); }, 180000);
      }).catch(noMic);
    }
    recBtn.addEventListener("click", function () {
      if (rec && rec.state === "recording") { rec.stop(); return; }
      if (player) player.pause();
      start();
    });
    if (!canRecord) noMic();
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:8px" }, [recBtn, mine]));
    box.appendChild(status);
    box.appendChild(el("p", { class: "hint", style: "text-align:center", text: B.t("recPrivate") }));

    if (s.check && s.check.length) {
      box.appendChild(el("div", { class: "parent-tip paper-tip" }, [
        el("strong", { text: B.t("recParentTitle") }),
        el("p", { class: "hint", style: "margin:4px 0", text: s.note || B.t("recParentNote") }),
        el("ul", { class: "paper-check" }, s.check.map(function (q) {
          return el("li", null, [el("label", null, [el("input", { type: "checkbox" }), " ", el("span", { text: q })])]);
        }))
      ]));
    }
    function finish() {
      if (rec && rec.state === "recording") { rec.onstop = null; rec.stop(); }
      stopStream();
      if (player) player.pause();
      if (url) URL.revokeObjectURL(url);
      url = null;
      done(false);
    }
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("recDone"), finish)]));
    // If the child leaves the lesson while recording, the microphone is let go.
    var watch = setInterval(function () { if (!box.isConnected) { clearInterval(watch); if (rec && rec.state === "recording") { rec.onstop = null; rec.stop(); } stopStream(); } }, 1000);
    setTimeout(function () {
      if (!box.isConnected) return;
      if (s.say || s.audio) B.speakSeq([{ text: prompt, lang: "fa" }, { text: s.say, lang: "en", file: s.audio }]);
      else B.speak(prompt);
    }, 400);
  };

  /* dialogue: a role play. The characters talk in an animated scene (js/scene.js) and the child takes one part:
     at each of its lines the child chooses what to say from two or three lines, hears it said, and says it aloud.
     Fields: prompt, bg, parts (the scene's parts: the cast and the place), you (the id of the child's character),
     lines [{ who (a part id), en (what is said), do [more tracks: a wave, a walk], choose [other lines to choose
     from, wrong ones], hint }]: a line of `you` with choose is the child's turn (en is the right line). The talking
     mouth (piece mouth) moves while each line is said. Scored: right if every line was chosen right first time. */
  function talkTracks(id, text, at) {
    var dur = Math.max(1200, text.length * 70), n = 2 * Math.max(1, Math.round(dur / 500));
    return [{ id: id + ".mouth", to: { o: 1 }, at: at || 0, dur: 60 }, { id: id + ".mouth", to: { sy: 0.3 }, at: (at || 0) + 60, dur: dur - 120, yoyo: true, times: n },
      { id: id + ".mouth", to: { o: 0 }, at: (at || 0) + dur - 60, dur: 60 }];
  }
  E.steps.dialogue = function (s, box, done) {
    var turn = 0;
    var scenes = s.lines.map(function (l) {
      if (l.choose) {
        // The right line goes in a different place at each turn, so it is never always first or last.
        var opts = l.choose.slice();
        opts.splice((2 * turn++ + 1) % (opts.length + 1), 0, l.en);
        return { caption: "", do: l.before || [], wait: { choose: opts, answer: l.en, hint: l.hint || B.t("dlgYourTurn"), each: talkTracks(l.who || s.you, l.en).concat(l.do || []) } };
      }
      return { caption: l.en, do: talkTracks(l.who, l.en).concat(l.do || []), key: l.key, hold: l.hold };
    });
    var spec = { type: "scene", prompt: s.prompt || B.t("dlgPrompt"), bg: s.bg, parts: s.parts, scenes: scenes, en: s.en };
    var turns = s.lines.some(function (l) { return l.choose; });
    box.sceneFirst = true;
    E.steps.scene(spec, box, function () { done(turns, turns && box.sceneFirst !== false); });
  };

  Object.keys(E.steps).forEach(wrap);
})();
