/* باغچه — paper: a writing task done on paper, away from the screen, for every subject (Persian, English, …).
   The child hears the task, sees an example written the way it should look, writes it on paper or in an
   exercise book, and shows it to a parent. The parent looks at it with a short checklist («با حرف بزرگ شروع
   کرده؟») and ticks what the child did. Not scored: the screen cannot see the paper, and writing is praised,
   never marked. The ticks are not kept; only whether the lesson was done is stored, as for every lesson.

   Fields: text (the task, read aloud), check [short questions for the parent], optional example (a model of
   the writing, e.g. "I like apples." or «بابا آب داد.»), lang ("en" or "fa": the language written; by default
   English when the example is written only in Latin letters, which also sets the direction: English left to
   right, Persian right to left), pic (default ✏️), say (instead of text, to be read aloud), audio, note (a line
   for the parent, instead of the general one).
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  E.steps.paper = function (s, box, done) {
    var en = s.lang ? s.lang === "en" : !!(s.example && B.isEn && B.isEn(s.example));
    box.appendChild(el("p", { class: "hl-pic", "aria-hidden": "true", text: s.pic || "✏️" }));
    box.appendChild(el("p", { class: "prompt", text: s.text }));
    var say = s.say || s.text;
    var sb = E.speakBtn(say, s.audio);
    if (sb) box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb]));

    if (s.example) {
      var model = el("p", { class: "paper-line" + (en ? " en" : ""), lang: en ? "en" : "fa", dir: en ? "ltr" : "rtl", text: s.example });
      var hear = E.speakBtn(s.example);
      box.appendChild(el("div", { class: "paper-sheet" }, [
        el("p", { class: "paper-tag", text: B.t("paperExample") }),
        model,
        hear ? el("div", { class: "row", style: "justify-content:center" }, [hear]) : null
      ]));
    }
    box.appendChild(el("p", { class: "hint", style: "text-align:center", text: B.t("paperWrite") }));

    // The parent's checklist: ticks only, never stored.
    var list = el("ul", { class: "paper-check" }, (s.check || []).map(function (q) {
      return el("li", null, [el("label", null, [el("input", { type: "checkbox" }), " ", el("span", { text: q })])]);
    }));
    box.appendChild(el("div", { class: "parent-tip paper-tip" }, [
      el("strong", { text: B.t("paperParentTitle") }),
      el("p", { class: "hint", style: "margin:4px 0", text: s.note || B.t("paperParentNote") }),
      list
    ]));

    var later = el("button", { class: "btn secondary", type: "button", text: B.t("paperLater"), onclick: function () { done(false); } });
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [later, E.nextBtn(B.t("paperDone"), function () { done(false); })]));
    if (sb) setTimeout(function () { if (box.isConnected) B.speak(say, s.audio); }, 300);
  };
})();
