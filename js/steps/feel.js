/* باغچه — calm and feelings steps for «احساس‌های من» (subject feel). Never scored, and nothing the child
   chooses is stored: no right or wrong about a feeling. Everything is said aloud, for children who cannot read yet.
   - practice: true on pairs, order or sort plays the game as practice: same gentle game, never scored.
   - breathe with pattern [in, hold, out, hold] (seconds): box breathing, a dot going round a square.
   - body: tap where on a body outline you feel it. Fields: prompt, optional pic (the feeling's face), notes
     {part: text said when that part is tapped}. Parts: head, throat, chest, tummy, hands, legs.
   - ground: the 5-4-3-2-1 exercise (see, hear, touch, smell, one slow breath), guided, no timer. Optional prompt.
   - meter: how big is the feeling, from a little to very big. Fields: prompt, optional pic, replies (one line
     for each of the five levels, or fewer: the last one is used for the levels above).
   - relax: tense and let go, part by part. Fields: parts [{pic, tense, release}], optional prompt.
   - talk with tips (lines for the grown-up) replaces the general talk tips, and says the caption aloud.
   Step types are added to B.engine.steps (js/engine.js). */
var B = window.B || {};
window.B = B;

(function () {
  var el = B.el, E = B.engine;

  function row(nodes) { return el("div", { class: "row", style: "justify-content:center;margin-top:14px" }, nodes); }
  function sayLater(box, text) { setTimeout(function () { if (box.isConnected) B.speak(text); }, 300); }
  // The step's question, said aloud; then (the first time) the words that follow it.
  function prompt(box, text, then) {
    box.appendChild(el("p", { class: "prompt", text: text }));
    var sb = E.speakBtn(text);
    if (sb) box.appendChild(row([sb]));
    sayLater(box, then ? text + " " + then : text);
  }
  // Timers that stop by themselves when the child leaves the step.
  function clock(box) {
    var ids = [];
    return {
      at: function (ms, f) { ids.push(setTimeout(function () { if (box.isConnected) f(); }, ms)); },
      stop: function () { ids.forEach(clearTimeout); ids = []; }
    };
  }

  // ---------- practice: the same games, never scored ----------
  ["pairs", "order", "sort"].forEach(function (t) {
    var game = E.steps[t];
    E.steps[t] = function (s, box, done) {
      if (!s.practice) return game(s, box, done);
      game(s, box, function () { done(false); });
    };
  });

  // ---------- talk: tips written for this step ----------
  var talk = E.steps.talk;
  E.steps.talk = function (s, box, done) {
    talk(s, box, done);
    if (!s.tips) return;
    var ul = box.querySelector(".parent-tip ul");
    if (ul) { ul.innerHTML = ""; s.tips.forEach(function (t) { ul.appendChild(el("li", { text: t })); }); }
    var sb = E.speakBtn(s.caption, s.audio);
    var cap = box.querySelector(".prompt");
    if (sb && cap) cap.parentNode.insertBefore(row([sb]), cap.nextSibling);
    if (s.caption) sayLater(box, s.caption);
  };

  // ---------- breathe with a pattern: box breathing ----------
  var breathe = E.steps.breathe;
  E.steps.breathe = function (s, box, done) {
    if (!s.pattern) return breathe(s, box, done);
    var p = s.pattern, cycles = s.cycles || 3, reduced = B.reducedMotion && B.reducedMotion();
    var words = [B.t("boxIn"), B.t("boxHold"), B.t("boxOut"), B.t("boxHold")];
    // The dot goes up, across, down and back, one side for each part of the breath.
    var corners = [[0, 100], [0, 0], [100, 0], [100, 100]];
    prompt(box, s.prompt || B.t("boxTitle"));
    var dot = el("span", { class: "box-dot" });
    var count = el("span", { class: "box-count", "aria-hidden": "true" });
    var square = el("div", { class: "box-breath", "aria-hidden": "true" }, [dot, count]);
    var say = el("p", { class: "prompt", "aria-live": "polite", text: B.t("ready") });
    box.appendChild(square);
    box.appendChild(say);
    var c = clock(box);
    function place(i, secs) {
      dot.style.transitionDuration = reduced ? "0s" : secs + "s";
      dot.style.left = corners[i][0] + "%";
      dot.style.top = corners[i][1] + "%";
    }
    place(0, 0);
    var start = el("button", { class: "btn secondary", type: "button", text: B.t("start") });
    start.addEventListener("click", function () {
      start.disabled = true;
      var t = 0;
      for (var k = 0; k < cycles; k++) {
        p.forEach(function (secs, side) {
          if (!secs) return;
          c.at(t, function () {
            say.textContent = words[side];
            B.speak(words[side]);
            square.dataset.phase = side;
            place((side + 1) % 4, secs);
          });
          for (var n = 1; n <= secs; n++) (function (n) { c.at(t + (n - 1) * 1000, function () { count.textContent = B.fa(n); }); })(n);
          t += secs * 1000;
        });
      }
      c.at(t, function () {
        B.setArt(count, "😌");
        delete square.dataset.phase;
        say.textContent = B.t("breatheEnd");
        B.speak(say.textContent);
      });
    });
    box.appendChild(row([start, E.nextBtn(null, function () { c.stop(); done(false); })]));
  };

  // ---------- body: where do I feel it? ----------
  var PARTS = [
    ["head", '<circle cx="100" cy="42" r="30"/>'],
    ["throat", '<rect x="88" y="72" width="24" height="14" rx="6"/>'],
    ["chest", '<rect x="66" y="86" width="68" height="50" rx="18"/>'],
    ["tummy", '<rect x="66" y="138" width="68" height="50" rx="18"/>'],
    ["hands", '<rect x="38" y="90" width="24" height="84" rx="12"/><circle cx="50" cy="184" r="13"/><rect x="138" y="90" width="24" height="84" rx="12"/><circle cx="150" cy="184" r="13"/>'],
    ["legs", '<rect x="70" y="192" width="27" height="92" rx="13"/><rect x="103" y="192" width="27" height="92" rx="13"/>']
  ];
  E.steps.body = function (s, box, done) {
    prompt(box, s.prompt || B.t("bodyAsk"));
    var names = B.T.bodyParts;
    var reply = el("p", { class: "prompt", "aria-live": "polite" });
    var fig = el("div", { class: "body-wrap" });
    var svg = '<svg class="body-map" viewBox="0 0 200 296" role="group" aria-label="' + B.t("bodyAria") + '">' +
      PARTS.map(function (p) { return '<g class="body-part" data-part="' + p[0] + '" tabindex="0" role="button" aria-pressed="false" aria-label="' + names[p[0]] + '">' + p[1] + "</g>"; }).join("") +
      '<g class="body-face" aria-hidden="true"><circle cx="89" cy="38" r="3"/><circle cx="111" cy="38" r="3"/><path d="M89 52 q11 8 22 0"/></g></svg>';
    fig.innerHTML = svg;
    if (s.pic) fig.insertBefore(el("span", { class: "body-feeling", "aria-hidden": "true", text: s.pic }), fig.firstChild);
    box.appendChild(fig);
    box.appendChild(reply);
    function tell(text) { reply.textContent = text; B.speak(text); }
    Array.prototype.forEach.call(fig.querySelectorAll(".body-part"), function (g) {
      function tap() {
        var on = g.getAttribute("aria-pressed") !== "true";
        g.setAttribute("aria-pressed", on ? "true" : "false");
        g.classList.toggle("on", on);
        var part = g.dataset.part;
        if (on) tell((s.notes && s.notes[part]) || B.t("bodyReply", { part: names[part] }));
      }
      g.addEventListener("click", tap);
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(); } });
    });
    var unsure = el("button", { class: "btn quiet", type: "button", text: B.t("bodyUnsure"), onclick: function () { tell(B.t("bodyUnsureReply")); } });
    box.appendChild(row([unsure, E.nextBtn(null, function () { done(false); })]));
  };

  // ---------- ground: 5 things I see, 4 I hear, 3 I touch, 2 I smell, 1 slow breath ----------
  E.steps.ground = function (s, box, done) {
    var stages = B.T.groundStages, i = 0;
    prompt(box, s.prompt || B.t("groundTitle"), stages[0][2]);
    var stage = el("div", { class: "ground" });
    box.appendChild(stage);
    function show() {
      stage.innerHTML = "";
      if (i >= stages.length) {
        stage.appendChild(el("p", { class: "celebrate", "aria-hidden": "true", text: "🌿" }));
        stage.appendChild(el("p", { class: "prompt", text: B.t("groundEnd") }));
        B.speak(B.t("groundEnd"));
        stage.appendChild(row([E.nextBtn(B.t("finish"), function () { done(false); })]));
        return;
      }
      var st = stages[i];
      stage.appendChild(el("p", { class: "ground-pic", "aria-hidden": "true", text: st[0] }));
      stage.appendChild(el("p", { class: "prompt", text: st[2] }));
      var dots = el("div", { class: "ground-dots" });
      for (var n = 1; n <= st[1]; n++) (function (n) {
        var d = el("button", { class: "ground-dot", type: "button", "aria-pressed": "false", "aria-label": B.fa(n), text: B.fa(n) });
        d.addEventListener("click", function () {
          var on = d.getAttribute("aria-pressed") !== "true";
          d.setAttribute("aria-pressed", on ? "true" : "false");
          if (on) B.speak(B.NUMBER_WORDS[n] || B.fa(n));
        });
        dots.appendChild(d);
      })(n);
      stage.appendChild(dots);
      if (st[1] > 1) stage.appendChild(el("p", { class: "hint", text: B.t("groundTap") }));
      var sb = E.speakBtn(st[2]);
      stage.appendChild(row([sb, E.nextBtn(null, function () { i++; show(); })]));
      if (i) B.speak(st[2]);
    }
    show();
  };

  // ---------- meter: how big is the feeling? ----------
  E.steps.meter = function (s, box, done) {
    prompt(box, s.prompt || B.t("meterAsk"));
    var levels = B.T.meterLevels;
    var reply = el("p", { class: "prompt", "aria-live": "polite" });
    var bars = el("div", { class: "meter", role: "group", "aria-label": B.t("meterAsk") });
    var buttons = [];
    // The biggest level is at the top, like a thermometer.
    levels.forEach(function (name, i) {
      var b = el("button", { class: "meter-step", type: "button", "aria-pressed": "false", "data-level": String(i + 1) }, [
        el("span", { class: "meter-fill" }), el("span", { class: "meter-label", text: name })
      ]);
      b.addEventListener("click", function () {
        buttons.forEach(function (x, j) { x.classList.toggle("on", j <= i); x.setAttribute("aria-pressed", j === i ? "true" : "false"); });
        var r = s.replies && s.replies.length ? s.replies[Math.min(i, s.replies.length - 1)] : B.t("meterReply");
        reply.textContent = name + ". " + r;
        B.speak(reply.textContent);
      });
      buttons.push(b);
    });
    buttons.slice().reverse().forEach(function (b) { bars.appendChild(b); });
    var wrap = el("div", { class: "meter-wrap" }, [s.pic ? el("span", { class: "body-feeling", "aria-hidden": "true", text: s.pic }) : null, bars]);
    box.appendChild(wrap);
    box.appendChild(reply);
    box.appendChild(row([E.nextBtn(null, function () { done(false); })]));
  };

  // ---------- relax: tense and let go, part by part ----------
  E.steps.relax = function (s, box, done) {
    prompt(box, s.prompt || B.t("relaxTitle"), s.parts[0].tense);
    var stage = el("div", { class: "relax" });
    box.appendChild(stage);
    var i = 0, c = clock(box), HOLD = 4;
    function show() {
      c.stop();
      stage.innerHTML = "";
      if (i >= s.parts.length) {
        stage.appendChild(el("p", { class: "celebrate", "aria-hidden": "true", text: "😌" }));
        stage.appendChild(el("p", { class: "prompt", text: B.t("relaxEnd") }));
        B.speak(B.t("relaxEnd"));
        stage.appendChild(row([E.nextBtn(B.t("finish"), function () { done(false); })]));
        return;
      }
      var p = s.parts[i];
      var pic = el("p", { class: "relax-pic", "aria-hidden": "true", text: p.pic });
      var text = el("p", { class: "prompt", "aria-live": "polite", text: p.tense });
      var count = el("p", { class: "relax-count", "aria-hidden": "true" });
      stage.appendChild(pic);
      stage.appendChild(text);
      stage.appendChild(count);
      var go = el("button", { class: "btn secondary", type: "button", text: B.t("relaxGo") });
      var next = E.nextBtn(i + 1 < s.parts.length ? B.t("relaxNext") : null, function () { i++; show(); });
      next.hidden = true;
      go.addEventListener("click", function () {
        go.hidden = true;
        text.textContent = p.tense;
        pic.className = "relax-pic tight";
        B.speak(p.tense);
        for (var n = 1; n <= HOLD; n++) (function (n) { c.at(1500 + n * 1000, function () { count.textContent = B.fa(n); }); })(n);
        c.at(1500 + (HOLD + 1) * 1000, function () {
          count.textContent = "";
          pic.className = "relax-pic loose";
          text.textContent = p.release;
          B.speak(p.release);
        });
        c.at(1500 + (HOLD + 4) * 1000, function () { next.hidden = false; go.hidden = false; go.textContent = B.t("relaxAgain"); });
      });
      stage.appendChild(row([go, next]));
      if (i) B.speak(p.tense);
    }
    show();
  };
})();
