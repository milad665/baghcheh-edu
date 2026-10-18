/* باغچه — step types for سلامت و ایمنی (health, body and safety).
   - doit: the child does something real with their body, away from the screen (washes their hands, jumps like a
     rabbit, practises «بنشین، پناه بگیر، محکم نگه دار»), then taps «انجام دادم!». Not scored.
     Fields: pic (emoji), text, optional list (short lines, e.g. the moves of a movement break), say.
   - forparents: the parent note that ends each health lesson: how to practise at home and, for body safety and
     emergencies, how to talk about it calmly. Fields: tips (lines), optional text (one line said to the child
     first), pic, guide (the section of guide.html to point to, default health) and guideLabel. Not scored.
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  E.steps.doit = function (s, box, done) {
    box.appendChild(el("p", { class: "hl-pic", "aria-hidden": "true", text: s.pic || "🙌" }));
    box.appendChild(el("p", { class: "prompt", text: s.text }));
    if (s.list) box.appendChild(el("ol", { class: "hl-list" }, s.list.map(function (t) { return el("li", { text: t }); })));
    var say = s.say || [s.text].concat(s.list || []).join(" ");
    var sb = E.speakBtn(say, s.audio);
    var go = E.nextBtn(B.t("hlDid"), function () { done(false); });
    box.appendChild(el("div", { class: "row", style: "justify-content:center" }, [sb, go]));
    if (sb) setTimeout(function () { B.speak(say, s.audio); }, 300);
  };

  E.steps.forparents = function (s, box, done) {
    if (s.text) {
      box.appendChild(el("p", { class: "hl-pic", "aria-hidden": "true", text: s.pic || "🏡" }));
      box.appendChild(el("p", { class: "prompt", text: s.text }));
      B.speak(s.text);
    }
    box.appendChild(el("div", { class: "parent-tip hl-note" }, [
      el("strong", { text: B.t("hlParentsTitle") }),
      el("ul", null, s.tips.map(function (t) { return el("li", { text: t }); })),
      el("p", { class: "hint" }, [B.t("hlGuideBefore"), el("a", { href: "guide.html#" + (s.guide || "health"), text: s.guideLabel || B.t("hlGuideLink") })])
    ]));
    box.appendChild(el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, [E.nextBtn(B.t("finish"), function () { done(false); })]));
  };
})();
