/* باغچه — خواندن و نوشتن انگلیسی (English reading and writing), for children who know no English yet.
   Baghcheh teaches English as a second language: the other subjects' lessons can also be played in English
   (js/english-mode.js), and this course teaches reading and writing English. Every child starts at the Seed
   garden (defaultLevel), whatever their Persian garden.
   The order follows good early-years practice for a second language: first listening and speaking, with meaning shown by
   pictures and actions instead of translation, and lots of repetition (Seed); then the letters and their sounds,
   a few at a time, and short words made from them (Sprout); then short sentences, questions and everyday
   phrases (Sapling). Instructions for the child are in Persian and spoken; English is spoken with the device's
   English voice (js/english-voice.js). Step types: README.md, js/engine.js, js/games.js, js/anim.js and
   js/steps/english.js (words, listen, letter, tip), and js/steps/paper.js for writing on paper. Each lesson ends with a tip for parents, who may not know
   English themselves. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "english", name: "خواندن و نوشتن انگلیسی", emoji: "🔤", leveled: true, defaultLevel: "seed" });

(function () {
  var RED = "#e0413a", GREEN = "#3fa34d", YELLOW = "#f5c518", BLUE = "#2f6fd6";
  var PINK = "#f48fb1", ORANGE = "#f28c28", PURPLE = "#8e5bd0", BROWN = "#8a5a32", BLACK = "#222222", WHITE = "#ffffff";
  // Everyday sounds for the sound-play lessons, made by tools/make-en-sounds.js.
  var SOUND = "audio/en/sounds/";
  var SOUND_PROMPT = "کدام با صدای این حرف شروع می‌شود؟";
  var READ_PROMPT = "این کلمه را بخوان. تصویرش کدام است؟";
  var SORT_PROMPT = "هر تصویر را در سبد حرف اولش بگذار";

  /* Moves for the animations (step type `scene`, drawings in js/art/rig-english.js). Each returns a list of tracks;
     side "L" or "R" is the arm on the left or right of the picture, and a pose is a name in POSE or [shoulder, elbow]
     turns for the right arm (the left arm turns the other way). */
  var POSE = { down: [0, 0], wave: [-125, -45], stretch: [-150, -10], big: [-100, 0], ask: [-40, -60], point: [-84, -4],
    pointUp: [-115, -4], stop: [-70, -70], hold: [-136, -10], shade: [-151, -69], chest: [13, 106],
    nose: [90, 111], eye: [-137, -111], ear: [-93, -112], mouth: [82, 118], clap: [-11, 110], clapOpen: [-11, 50] };
  function pose(id, side, name, at, dur) {
    var p = POSE[name] || name, k = side === "L" ? -1 : 1;
    return [{ id: id + ".arm" + side, to: { r: k * p[0] }, at: at, dur: dur }, { id: id + ".fore" + side, to: { r: k * p[1] }, at: at, dur: dur }];
  }
  // The hand goes up, waves, and comes down again (up: it stays up, so the beat's end picture still waves).
  function wave(id, side, at, dur, up) {
    var k = side === "L" ? -1 : 1;
    return pose(id, side, "wave", at, 400).concat([{ id: id + ".fore" + side, to: { r: k * -12 }, at: at + 400, dur: dur - 400, yoyo: true, times: 2 * Math.max(1, Math.round(dur / 700)) }],
      up ? [] : pose(id, side, "down", at + dur + 50, 400));
  }
  // The mouth opens and closes while the person speaks.
  function talk(id, at, dur) {
    return [{ id: id + ".mouth", to: { o: 1 }, at: at, dur: 60 }, { id: id + ".mouth", to: { sy: 0.3 }, at: at + 60, dur: dur - 120, yoyo: true, times: 2 * Math.max(1, Math.round(dur / 500)) },
      { id: id + ".mouth", to: { o: 0 }, at: at + dur - 60, dur: 60 }];
  }
  // Smiling or frowning, and shaking the head for no.
  function face(id, happy, at) {
    return [{ id: id + ".smile", to: { o: happy ? 1 : 0 }, at: at, dur: 200 }, { id: id + ".frown", to: { o: happy ? 0 : 1 }, at: at, dur: 200 }];
  }
  function shake(id, at) {
    return [{ id: id + ".head", to: { r: -10 }, at: at, dur: 150 }, { id: id + ".head", to: { r: 10 }, at: at + 150, dur: 1200, yoyo: true, times: 4 },
      { id: id + ".head", to: { r: 0 }, at: at + 1350, dur: 150 }];
  }
  // A person walks to x, the feet going up and down in turn; a dog trots to x.
  function walk(id, x, at, dur) {
    var n = 2 * Math.max(1, Math.round(dur / 700));
    return [{ id: id, to: { x: x }, at: at, dur: dur, ease: "linear" }, { id: id + ".legL", to: { sy: 0.75 }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".legR", to: { sy: 0.75 }, at: at + dur / n, dur: dur, yoyo: true, times: n }];
  }
  function trot(id, x, at, dur) {
    var n = 2 * Math.max(1, Math.round(dur / 500));
    return [{ id: id, to: { x: x }, at: at, dur: dur, ease: "linear" }].concat(["legFn", "legBf", "legFf", "legBn"].map(function (l, i) {
      return { id: id + "." + l, to: { r: i < 2 ? 24 : -24 }, at: at, dur: dur, yoyo: true, times: n };
    }));
  }
  // A bird flies along a path, flapping.
  function fly(id, path, at, dur) {
    return [{ id: id, path: path, at: at, dur: dur, ease: "out" }, { id: id + ".wing", to: { r: 50 }, at: at, dur: dur, yoyo: true, times: 2 * Math.round(dur / 250) }];
  }
  // Something appears with a little bounce (s: its size).
  function pop(id, at, s) {
    return [{ id: id, to: { s: 0.4 * (s || 1) }, at: at, dur: 1 }, { id: id, to: { o: 1, s: s || 1 }, at: at + 20, dur: 400, ease: "back" }];
  }
  // A bird lands on the fence and one more finger goes up.
  function landAndCount(b, x, y, finger) {
    return fly(b, "M176 6Q" + (176 + x) / 2 + " 0 " + x + " " + y, 0, 1000).concat([
      { id: "hand." + finger, to: { sy: 0.2 }, dur: 1 }, { id: "hand." + finger, to: { o: 1, sy: 1 }, at: 900, dur: 450, ease: "back" }]);
  }
  // The brush paints a band of a colour (after the last colour and its things go), and three things of it come.
  function paintIn(colour, things, old) {
    return old.map(function (id) { return { id: id, to: { o: 0 }, dur: 300 }; }).concat([
      { id: "brush", to: { x: 24, y: 20 }, at: 300, dur: 1 }, { id: "brush", to: { o: 1 }, at: 320, dur: 150 },
      { id: colour, to: { o: 1 }, at: 400, dur: 1 }, { id: colour, draw: true, at: 400, dur: 1400 },
      { id: "brush", path: B.EN_PAINT_PATH, at: 400, dur: 1400 }, { id: "brush", to: { o: 0 }, at: 1850, dur: 200 }
    ], things.map(function (id, i) { return { id: id, to: { o: 1, s: 1.7 }, at: 400 + i * 600, dur: 450, ease: "back" }; }));
  }

  /* Where a person's hand is, on the stage, when an arm is in a pose: so a thing can be put in the hand (a held
     emoji's at is then [x, y + 10 × its size], since an emoji stands on its origin and is 20 tall). art: the drawing,
     at and s: the part's place and size. The sizes are those of js/art/rig-english.js. */
  var KID = { leg: 10, body: 10.5, w: 11, ua: 5.8, fa: 5.2 }, SMALL = { leg: 8, body: 9, w: 10, ua: 5, fa: 4.6 };
  var BUILD = { "en-sara": KID, "en-reza": KID, "en-arman": KID, "en-mina": KID, "en-sister": SMALL, "en-brother": SMALL,
    "en-mother": { leg: 14, body: 14, w: 12.4, ua: 7.6, fa: 6.6 }, "en-teacher": { leg: 14, body: 14, w: 12.4, ua: 7.6, fa: 6.6 },
    "en-father": { leg: 15, body: 15, w: 14, ua: 7.6, fa: 6.6 }, "en-grandma": { leg: 13, body: 13.5, w: 13, ua: 7.6, fa: 6.6 },
    "en-grandpa": { leg: 13.5, body: 14, w: 13, ua: 7.6, fa: 6.6 } };
  function handAt(art, at, s, side, name) {
    var o = BUILD[art], k = side === "L" ? -1 : 1, p = POSE[name] || name || [0, 0], D = Math.PI / 180;
    var sh = -(o.leg + 1.4) - o.body, sx = o.w / 2 - 0.9;
    var S = [k * sx, sh + 1], E = [k * (sx + 0.9), sh + 1 + o.ua], H = [k * (sx + 1.3), sh + 1 + o.ua + o.fa + 0.5];
    function rot(v, a) { return [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)]; }
    var u = rot([E[0] - S[0], E[1] - S[1]], k * p[0] * D), v = rot([H[0] - E[0], H[1] - E[1]], k * (p[0] + p[1]) * D);
    return [+(at[0] + s * (S[0] + u[0] + v[0])).toFixed(1), +(at[1] + s * (S[1] + u[1] + v[1])).toFixed(1)];
  }
  // An emoji's place so that it sits in that hand (sz: its size).
  function inHand(art, at, s, side, name, sz) { var h = handAt(art, at, s, side, name); return [h[0], +(h[1] + 10 * sz).toFixed(1)]; }
  // Jumping on the spot, n times (the legs tuck up a little at the top).
  function jump(id, at, n, high) {
    var d = 650 * n;
    return [{ id: id, to: { y: "-" + (high || 7) }, at: at, dur: d, ease: "soft", yoyo: true, times: 2 * n },
      { id: id + ".legL", to: { sy: 0.8 }, at: at, dur: d, yoyo: true, times: 2 * n }, { id: id + ".legR", to: { sy: 0.8 }, at: at, dur: d, yoyo: true, times: 2 * n }];
  }
  // Sitting down (on a chair behind, seen from the front: the body goes down, the thighs come towards us so the
  // legs look short), and standing up again. drop: how far the body goes down, in stage units; legs: how long the
  // legs then look (sy), so the feet stay on the floor.
  function sit(id, at, drop, legs) {
    return [{ id: id, to: { y: "+" + drop }, at: at, dur: 800 }, { id: id + ".legL", to: { sy: legs }, at: at, dur: 800 }, { id: id + ".legR", to: { sy: legs }, at: at, dur: 800 }];
  }
  function stand(id, at, drop) {
    return [{ id: id, to: { y: "-" + drop }, at: at, dur: 800 }, { id: id + ".legL", to: { sy: 1 }, at: at, dur: 800 }, { id: id + ".legR", to: { sy: 1 }, at: at, dur: 800 }];
  }
  // Turning round on the spot: seen from the front, the body narrows to its side and widens again, twice.
  function turn(id, at) {
    return [{ id: id, to: { sx: 0.08 }, at: at, dur: 1600, ease: "linear", yoyo: true, times: 4 }];
  }
  // Clapping: both hands open, then meet in front n times (with little sparks between them at [x, y]).
  function clapHands(id, at, n, where) {
    return [].concat(pose(id, "R", "clapOpen", at, 400), pose(id, "L", "clapOpen", at, 400), [
      { id: id + ".foreR", to: { r: 110 }, at: at + 450, dur: 400 * 2 * n, yoyo: true, times: 2 * n },
      { id: id + ".foreL", to: { r: -110 }, at: at + 450, dur: 400 * 2 * n, yoyo: true, times: 2 * n }
    ], where ? [{ emit: "spark", where: where, spread: [8, 5], n: 2 * n, at: at + 650, dur: 800 * n, life: 600 }] : [],
      pose(id, "R", "down", at + 500 + 800 * n, 400), pose(id, "L", "down", at + 500 + 800 * n, 400));
  }
  // Stamping the feet in turn, n stamps, with a puff of dust at each foot (feet: [x of the left foot, x of the right, y]).
  function stamp(id, at, n, feet) {
    var out = [];
    for (var i = 0; i < n; i++) {
      out.push({ id: id + (i % 2 ? ".legR" : ".legL"), to: { sy: 0.55 }, at: at + i * 700, dur: 700, yoyo: true, times: 2 });
      if (feet) out.push({ emit: "spark", where: [feet[i % 2], feet[2]], spread: [6, 2], rise: -3, n: 4, at: at + i * 700 + 650, dur: 100, life: 600 });
    }
    return out;
  }
  /* What the English voice says for each sound, in the sound buttons of blend (the device voice cannot say a pure
     sound; recordings will replace these). */
  var SND = { s: "sss", a: "ah", t: "tuh", p: "puh", i: "ih", n: "nnn", m: "mmm", d: "duh", g: "guh", o: "aw", c: "kuh", k: "kuh", ck: "kuh",
    e: "eh", u: "uh", r: "rrr", h: "huh", b: "buh", f: "fff", l: "lll", j: "juh", v: "vvv", w: "wuh", x: "ks", y: "yuh", z: "zzz", sh: "shh", ch: "chuh", th: "thh" };
  // A word read sound by sound: its letters (or letter pairs) are sound buttons, then the whole word.
  function blendWord(word, parts, pic) {
    return { type: "blend", word: word, parts: parts, pic: pic, say: word, sounds: parts.map(function (p) { return SND[p] || p; }) };
  }
  // Running to x: like walking, but the legs go much faster.
  function run(id, x, at, dur) {
    var n = 2 * Math.max(2, Math.round(dur / 260));
    return [{ id: id, to: { x: x }, at: at, dur: dur, ease: "linear" }, { id: id + ".legL", to: { sy: 0.65 }, at: at, dur: dur, yoyo: true, times: n },
      { id: id + ".legR", to: { sy: 0.65 }, at: at + dur / n, dur: dur, yoyo: true, times: n }];
  }
  // Something goes from one place to another in an arc (lift: how high the arc goes above the higher end).
  function arc(id, from, to, at, dur, lift) {
    var mx = (from[0] + to[0]) / 2, my = Math.min(from[1], to[1]) - (lift == null ? 14 : lift);
    return { id: id, path: "M" + from.join(" ") + "Q" + mx + " " + my + " " + to.join(" "), at: at, dur: dur || 1000 };
  }
  // Nodding yes.
  function nod(id, at) {
    return [{ id: id + ".head", to: { y: 1.4 }, at: at, dur: 1200, yoyo: true, times: 4 }];
  }

  // english-sapling-48: where Reza, at the foot of the ladder, holds the hat out to Sara.
  var RHAND = inHand("en-reza", [102, 86], 1.1, "L", "point", 0.9);

  var lessons = [
    // ---------------- English: Seed (listen, point and say; no reading yet) ----------------
    {
      id: "english-seed-1", subject: "english", level: "seed", emoji: "👋", title: "سلام و خداحافظ",
      steps: [
        /* Hello and goodbye come with the greeting itself: each child waves while saying it, and waves and walks away
           for goodbye. */
        { type: "scene", prompt: "گوش کن و تو هم با آن‌ها بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sara: { art: "en-sara", at: [40, 84], s: 1.3 }, reza: { art: "en-reza", at: [120, 84], s: 1.3 } },
          scenes: [
            { caption: "Hello!", key: 1300, do: [].concat(wave("sara", "R", 0, 2200, true), talk("sara", 100, 900)) },
            { caption: "Hello!", key: 1300, do: [].concat(pose("sara", "R", "down", 0, 400), wave("reza", "L", 0, 2200, true), talk("reza", 100, 900)) },
            { caption: "Goodbye!", key: 2000, do: [].concat(pose("reza", "L", "down", 0, 400), wave("sara", "R", 0, 2400, true), talk("sara", 100, 1000), walk("sara", -16, 900, 2800)) },
            { caption: "Goodbye!", key: 2000, do: [].concat(wave("reza", "L", 0, 2400, true), talk("reza", 100, 1000), walk("reza", 176, 900, 2800)) }
          ] },
        { type: "words", words: [{ pic: "🙂👋", en: "Hello!" }, { pic: "🚶👋", en: "Goodbye!" }] },
        /* Morning and night through a bedroom window: the sun comes up, Reza wakes, gets up and says good morning;
           the sun goes down, the moon comes up, he yawns, says good night and goes to sleep. The beats with no words
           show the change of time. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            skyN: { art: "en-sky-night" }, skyD: { art: "en-sky-day", o: 0 }, sun: { art: "☀", at: [120, 62], s: 0.9 }, moon: { art: "🌙", at: [121, 34], s: 0.8 },
            room: { art: "en-bedroom" }, bed: { art: "en-bed-low", at: [50, 86], s: 1.3 },
            kid: { art: "en-reza", at: [58, 64], r: -90, s: 1.1 }, blanket: { art: "en-blanket", at: [50, 86], s: 1.3 }
          },
          scenes: [
            { caption: "", key: 3000, hold: 4800, do: [
              { id: "kid.shut", to: { o: 1 }, dur: 1 }, { id: "kid.eyes", to: { o: 0 }, dur: 1 },
              { id: "moon", to: { y: 62 }, at: 200, dur: 1400 },
              { id: "skyN", to: { o: 0 }, at: 600, dur: 1600 }, { id: "skyD", to: { o: 1 }, at: 600, dur: 1600 },
              { id: "sun", to: { y: 34 }, at: 1000, dur: 1600, ease: "out" },
              { id: "kid.shut", to: { o: 0 }, at: 2800, dur: 150 }, { id: "kid.eyes", to: { o: 1 }, at: 2800, dur: 150 },
              { id: "blanket", to: { x: "+10", o: 0 }, at: 3200, dur: 500 },
              { id: "kid", to: { x: 104, y: 86, r: 0 }, at: 3500, dur: 1000 }
            ] },
            { caption: "Good morning!", key: 1500, do: [].concat(pose("kid", "L", "stretch", 0, 500), pose("kid", "L", "down", 1000, 400),
              pose("kid", "R", "stretch", 0, 500), wave("kid", "R", 600, 1800, true), talk("kid", 100, 1000)) },
            { caption: "", key: 3400, hold: 4600, do: [].concat(pose("kid", "R", "down", 0, 500), [
              { id: "sun", to: { y: 62 }, dur: 1600, ease: "in" },
              { id: "skyD", to: { o: 0 }, at: 700, dur: 1600 }, { id: "skyN", to: { o: 1 }, at: 700, dur: 1600 },
              { id: "moon", to: { y: 34 }, at: 1600, dur: 1600, ease: "out" },
              { id: "kid.mouth", to: { o: 1, sy: 1.5 }, at: 3000, dur: 300 }, { id: "kid.mouth", to: { o: 0, sy: 1 }, at: 3900, dur: 300 }
            ], pose("kid", "L", "mouth", 2900, 400), pose("kid", "L", "down", 4000, 400)) },
            { caption: "Good night!", key: 900, hold: 5200, do: [].concat(wave("kid", "R", 0, 1600), talk("kid", 100, 900), [
              { id: "kid", to: { x: 58, y: 64, r: -90 }, at: 2000, dur: 1000 },
              { id: "blanket", to: { x: "-10", o: 1 }, at: 3000, dur: 500 },
              { id: "kid.shut", to: { o: 1 }, at: 3600, dur: 200 }, { id: "kid.eyes", to: { o: 0 }, at: 3600, dur: 200 }
            ]) }
          ] },
        { type: "words", words: [{ pic: "☀️", en: "Good morning!" }, { pic: "🌙", en: "Good night!" }, { pic: "🎁", en: "Thank you!" }] },
        { type: "listen", say: "Good morning!", options: [{ pic: "☀️", en: "Good morning!" }, { pic: "🌙", en: "Good night!" }], answer: "☀️" },
        { type: "listen", say: "Good night!", quiet: true, options: [{ pic: "☀️", en: "Good morning!" }, { pic: "🌙", en: "Good night!" }], answer: "🌙" },
        { type: "listen", say: "Thank you!", quiet: true, options: [{ pic: "🌙", en: "Good night!" }, { pic: "🎁", en: "Thank you!" }, { pic: "☀️", en: "Good morning!" }], answer: "🎁" },
        { type: "listen", say: "Hello!", quiet: true, options: [{ pic: "🚶👋", en: "Goodbye!" }, { pic: "🙂👋", en: "Hello!" }], answer: "🙂👋" },
        { type: "tip", text: "لازم نیست خودتان انگلیسی بلد باشید. از امروز صبح‌ها به هم بگویید Good morning و شب‌ها Good night. وقتی کودک چیزی به شما داد، بگویید Thank you. کودک کلمه‌ای را که هر روز بشنود و بگوید، زود یاد می‌گیرد." }
      ]
    },
    {
      id: "english-seed-9", subject: "english", level: "seed", emoji: "🙋", title: "اسم تو چیست؟",
      steps: [
        /* Mina and Reza meet: hello with a wave, a question with an open hand and a question mark, "I'm …" with a hand
           on the chest, fine with a happy jump. Then both turn to the child and ask, and wait for an answer. */
        { type: "scene", prompt: "گوش کن و تو هم بگو. آخرش اسم خودت را بلند بگو.", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, mina: { art: "en-mina", at: [46, 86], s: 1.25 }, reza: { art: "en-reza", at: [114, 86], s: 1.25 },
            askM: { art: "en-ask", at: [56, 46], o: 0 }, askR: { art: "en-ask", at: [104, 46], o: 0, flip: true }
          },
          scenes: [
            { caption: "Hello! What's your name?", key: 2600, hold: 3600, do: [].concat(wave("mina", "R", 0, 1300), talk("mina", 0, 2600),
              pose("mina", "R", "ask", 1800, 500), pop("askM", 2000)) },
            { caption: "I'm Reza. What's your name?", key: 1200, hold: 4400, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400),
              pose("reza", "L", "chest", 0, 500), talk("reza", 0, 3000), pose("reza", "L", "ask", 1900, 500), pop("askR", 2100)) },
            { caption: "I'm Mina. How are you?", key: 1200, hold: 4200, do: [].concat([{ id: "askR", to: { o: 0 }, dur: 300 }], pose("reza", "L", "down", 0, 400),
              pose("mina", "R", "chest", 0, 500), talk("mina", 0, 2800), pose("mina", "R", "ask", 1800, 500), pop("askM", 2000)) },
            { caption: "I'm fine, thank you!", key: 330, hold: 3600, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400),
              jump("reza", 0, 1), talk("reza", 0, 2000), pose("reza", "L", "chest", 900, 500), nod("reza", 1400)) },
            // Both turn to the child and ask: the beat waits long enough for the child to answer aloud.
            { caption: "And you? What's your name?", key: 2400, hold: 7000, do: [].concat(pose("reza", "L", "ask", 0, 500), pose("mina", "R", "ask", 0, 500),
              [{ id: "mina.eyes", to: { y: 0.4 }, dur: 300 }, { id: "reza.eyes", to: { y: 0.4 }, dur: 300 }],
              talk("mina", 0, 2200), pop("askM", 600), pop("askR", 600)) }
          ] },
        { type: "words", words: [{ pic: "🙂👋", en: "Hello!" }, { pic: "🙋", en: "I'm Mina." }, { pic: "😊👍", en: "I'm fine, thank you!" }, { pic: "🚶👋", en: "Goodbye!" }] },
        { type: "listen", say: "What's your name?", prompt: "گوش کن. کدام جواب این سؤال است؟",
          options: [{ pic: "😊👍", en: "I'm fine, thank you!", value: "fine" }, { pic: "🙋", en: "I'm Mina.", value: "name" }, { pic: "🌙", en: "Good night!", value: "night" }], answer: "name" },
        { type: "listen", say: "How are you?", quiet: true,
          options: [{ pic: "🙋", en: "I'm Mina.", value: "name" }, { pic: "🚶👋", en: "Goodbye!", value: "bye" }, { pic: "😊👍", en: "I'm fine, thank you!", value: "fine" }], answer: "fine" },
        { type: "listen", say: "Hello!", prompt: "گوش کن. چه می‌گوید؟",
          options: [{ pic: "🚶👋", en: "Goodbye!", value: "bye" }, { pic: "🙂👋", en: "Hello!", value: "hello" }], answer: "hello" },
        { type: "listen", say: "Goodbye!", quiet: true,
          options: [{ pic: "🙂👋", en: "Hello!", value: "hello" }, { pic: "🚶👋", en: "Goodbye!", value: "bye" }, { pic: "🙋", en: "I'm Mina.", value: "name" }], answer: "bye" },
        { type: "tip", text: "عروسک یا اسباب‌بازی‌ای بردارید و با صدای آن از کودک بپرسید What's your name? تا او بگوید I'm … و اسمش را. بعد بپرسید How are you? تا بگوید I'm fine, thank you. بعد نوبت کودک است که از عروسک بپرسد. جمله‌ها را معنی نکنید؛ دست تکان دادن و دست روی سینه گذاشتن معنی را می‌رساند." }
      ]
    },
    {
      id: "english-seed-10", subject: "english", level: "seed", emoji: "🧍", title: "بلند شو، بنشین",
      steps: [
        /* Arman does each action in front of a chair: he sits on it, stands up, claps, jumps and turns round. */
        { type: "scene", prompt: "گوش کن و تو هم همین کار را بکن", bg: "#fdf6e9",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, chair: { art: "en-chair", at: [56, 88], s: 1.6 }, kid: { art: "en-arman", at: [104, 88], s: 1.8 } },
          scenes: [
            { caption: "Sit down!", hold: 5000, do: [].concat(walk("kid", 56, 200, 1400), sit("kid", 1700, 6, 0.7)) },
            { caption: "Stand up!", key: 900, hold: 5000, do: [].concat(stand("kid", 200, 6), walk("kid", 104, 1300, 1400)) },
            { caption: "Clap your hands!", key: 1050, hold: 5000, do: clapHands("kid", 0, 4, [104, 61]) },
            { caption: "Jump!", key: 625, hold: 5000, do: jump("kid", 300, 4) },
            { caption: "Turn around!", key: 480, hold: 5000, do: turn("kid", 300) }
          ] },
        /* «Sara says»: Arman does what Sara says only when she starts with «Sara says». When she doesn't, he stays
           still and shakes his head. */
        { type: "scene", prompt: "بازی «Sara says»: فقط وقتی سارا اول بگوید Sara says، آن کار را بکن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sara: { art: "en-sara", at: [40, 86], s: 1.25 }, kid: { art: "en-arman", at: [116, 86], s: 1.25 } },
          scenes: [
            { caption: "Sara says: jump!", key: 2125, hold: 4400, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1600), jump("kid", 1800, 2)) },
            { caption: "Sara says: turn around!", key: 2180, hold: 4400, do: [].concat(talk("sara", 0, 1800), turn("kid", 2000)) },
            { caption: "Clap your hands!", key: 2600, hold: 4400, do: [].concat(talk("sara", 0, 1400), shake("kid", 1800), face("kid", true, 1800)) },
            { caption: "Sara says: clap your hands!", key: 3050, hold: 4400, do: [].concat(talk("sara", 0, 2000), clapHands("kid", 2200, 3, [116, 63]), pose("sara", "R", "down", 2400, 400)) }
          ] },
        { type: "listen", say: "Stand up!", prompt: "گوش کن. کدام تصویر همین کار است؟",
          options: [{ pic: "🪑", en: "Sit down!" }, { pic: "🧍", en: "Stand up!" }, { pic: "👏", en: "Clap your hands!" }], answer: "🧍" },
        { type: "listen", say: "Jump!", quiet: true, prompt: "گوش کن. کدام تصویر همین کار است؟",
          options: [{ pic: "🤸", en: "Jump!" }, { pic: "🔄", en: "Turn around!" }, { pic: "🪑", en: "Sit down!" }], answer: "🤸" },
        { type: "listen", say: "Turn around!", quiet: true, prompt: "گوش کن. کدام تصویر همین کار است؟",
          options: [{ pic: "👏", en: "Clap your hands!" }, { pic: "🧍", en: "Stand up!" }, { pic: "🔄", en: "Turn around!" }], answer: "🔄" },
        { type: "listen", say: "Sit down!", prompt: "سارا اول نگفت Sara says. تو چه کار می‌کنی؟",
          options: [{ pic: "🪑", value: "sit" }, { pic: "🧍", value: "still" }], answer: "still" },
        { type: "doit", pic: "🧍👏", text: "با بزرگ‌ترت بازی «Sara says» را بازی کن. فقط وقتی اول جمله Sara says می‌آید، آن کار را بکن!",
          say: "با بزرگ‌ترت بازی «Sara says» را بازی کن. فقط وقتی اول جمله Sara says می‌آید، آن کار را بکن!",
          list: ["Stand up!", "Sit down!", "Clap your hands!", "Jump!", "Turn around!"] },
        { type: "tip", text: "بازی «Sara says» را هر روز چند دقیقه بازی کنید (به جای Sara اسم خودتان یا کودک را بگذارید). هر دستور را با حرکت خودتان نشان بدهید، مثل Stand up و Sit down. گاهی Sara says را نگویید تا کودک دقیق گوش کند. کم‌کم حرکت را نشان ندهید تا فقط از شنیدن بفهمد. جمله‌ها را به فارسی ترجمه نکنید." }
      ]
    },
    {
      id: "english-seed-2", subject: "english", level: "seed", emoji: "🎨", title: "رنگ‌ها",
      steps: [
        /* Each colour is painted, then three things of that colour come one by one: the colour, not one thing,
           is what the word names. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fffaf0",
          parts: {
            red: { art: "en-paint-red", o: 0 }, green: { art: "en-paint-green", o: 0 }, yellow: { art: "en-paint-yellow", o: 0 }, blue: { art: "en-paint-blue", o: 0 },
            r1: { art: "🍎", at: [44, 84], s: 0.6, o: 0 }, r2: { art: "🍓", at: [80, 84], s: 0.6, o: 0 }, r3: { art: "🍅", at: [116, 84], s: 0.6, o: 0 },
            g1: { art: "🍏", at: [44, 84], s: 0.6, o: 0 }, g2: { art: "🥒", at: [80, 84], s: 0.6, o: 0 }, g3: { art: "🐸", at: [116, 84], s: 0.6, o: 0 },
            y1: { art: "🍋", at: [44, 84], s: 0.6, o: 0 }, y2: { art: "🍌", at: [80, 84], s: 0.6, o: 0 }, y3: { art: "🐥", at: [116, 84], s: 0.6, o: 0 },
            b1: { art: "🫐", at: [44, 84], s: 0.6, o: 0 }, b2: { art: "💧", at: [80, 84], s: 0.6, o: 0 }, b3: { art: "🐳", at: [116, 84], s: 0.6, o: 0 },
            brush: { art: "en-brush", at: [24, 20], o: 0 }
          },
          scenes: [
            { caption: "Red, red, red!", do: paintIn("red", ["r1", "r2", "r3"], []) },
            { caption: "Green, green, green!", do: paintIn("green", ["g1", "g2", "g3"], ["red", "r1", "r2", "r3"]) },
            { caption: "Yellow, yellow, yellow!", do: paintIn("yellow", ["y1", "y2", "y3"], ["green", "g1", "g2", "g3"]) },
            { caption: "Blue, blue, blue!", do: paintIn("blue", ["b1", "b2", "b3"], ["yellow", "y1", "y2", "y3"]) }
          ] },
        { type: "words", words: [{ color: RED, en: "red" }, { color: GREEN, en: "green" }, { color: YELLOW, en: "yellow" }, { color: BLUE, en: "blue" }] },
        { type: "listen", say: "red", prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: BLUE, value: "blue", en: "blue" }, { color: RED, value: "red", en: "red" }, { color: YELLOW, value: "yellow", en: "yellow" }], answer: "red" },
        { type: "listen", say: "green", quiet: true, prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: GREEN, value: "green", en: "green" }, { color: YELLOW, value: "yellow", en: "yellow" }, { color: RED, value: "red", en: "red" }], answer: "green" },
        { type: "listen", say: "blue", quiet: true, prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: RED, value: "red", en: "red" }, { color: GREEN, value: "green", en: "green" }, { color: BLUE, value: "blue", en: "blue" }], answer: "blue" },
        { type: "listen", say: "yellow", prompt: "گوش کن. کدام به این رنگ است؟", options: ["🍎", "🍌", "🍃"], answer: "🍌" },
        { type: "listen", say: "red", quiet: true, prompt: "گوش کن. کدام به این رنگ است؟", options: ["🍃", "💧", "🍓"], answer: "🍓" },
        { type: "pairs", prompt: "هر چیز را با چیزی جفت کن که همرنگ آن است",
          pairs: [[{ pic: "🍎", say: "red" }, { pic: "🍓", say: "red" }], [{ pic: "🍃", say: "green" }, { pic: "🥒", say: "green" }],
            [{ pic: "🍋", say: "yellow" }, { pic: "🌻", say: "yellow" }], [{ pic: "💧", say: "blue" }, { pic: "🫐", say: "blue" }]] },
        { type: "tip", text: "در خانه دنبال رنگ‌ها بگردید: به گوجه اشاره کنید و بگویید red، به سبزی خوردن بگویید green. بعد از کودک بپرسید «red کجاست؟» تا او نشان بدهد. اگر تلفظ را مطمئن نیستید، دکمه «گوش کن» را با هم بزنید و تکرار کنید." }
      ]
    },
    {
      id: "english-seed-11", subject: "english", level: "seed", emoji: "🌈", title: "رنگ‌های بیشتر",
      steps: [
        { type: "words", words: [{ color: PINK, en: "pink" }, { color: ORANGE, en: "orange" }, { color: PURPLE, en: "purple" },
          { color: BROWN, en: "brown" }, { color: BLACK, en: "black" }, { color: WHITE, en: "white" }] },
        { type: "listen", say: "orange", prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: PURPLE, value: "purple", en: "purple" }, { color: ORANGE, value: "orange", en: "orange" }, { color: PINK, value: "pink", en: "pink" }], answer: "orange" },
        { type: "listen", say: "purple", quiet: true, prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: PURPLE, value: "purple", en: "purple" }, { color: BROWN, value: "brown", en: "brown" }, { color: BLUE, value: "blue", en: "blue" }], answer: "purple" },
        { type: "listen", say: "white", quiet: true, prompt: "گوش کن و رنگش را پیدا کن.", options: [{ color: BLACK, value: "black", en: "black" }, { color: YELLOW, value: "yellow", en: "yellow" }, { color: WHITE, value: "white", en: "white" }], answer: "white" },
        { type: "listen", show: "🍊", say: "What colour is it?", prompt: "گوش کن و جواب بده",
          options: [{ color: ORANGE, value: "orange", en: "It's orange." }, { color: GREEN, value: "green", en: "It's green." }, { color: PINK, value: "pink", en: "It's pink." }], answer: "orange" },
        { type: "listen", show: "🐻", say: "What colour is it?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ color: WHITE, value: "white", en: "It's white." }, { color: BROWN, value: "brown", en: "It's brown." }, { color: RED, value: "red", en: "It's red." }], answer: "brown" },
        { type: "listen", show: "🌸", say: "What colour is it?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ color: BLUE, value: "blue", en: "It's blue." }, { color: BLACK, value: "black", en: "It's black." }, { color: PINK, value: "pink", en: "It's pink." }], answer: "pink" },
        { type: "pairs", prompt: "هر چیز را با چیزی جفت کن که همرنگ آن است",
          pairs: [[{ pic: "🥕", say: "orange" }, { pic: "🍊", say: "orange" }], [{ pic: "🍇", say: "purple" }, { pic: "🍆", say: "purple" }],
            [{ pic: "🌰", say: "brown" }, { pic: "🐻", say: "brown" }], [{ pic: "🥛", say: "white" }, { pic: "⛄", say: "white" }]] },
        { type: "tip", text: "بازی «What colour is it?» را بازی کنید: چیزی را نشان بدهید و بپرسید What colour is it? کودک جواب بدهد It's orange یا فقط orange. هر دو خوب است. بعد کودک بپرسد و شما جواب بدهید. لباس‌ها و میوه‌ها برای این بازی خوب‌اند." }
      ]
    },
    {
      id: "english-seed-3", subject: "english", level: "seed", emoji: "🖐️", title: "عددها تا ده",
      steps: [
        /* Birds land on the fence one by one, and for each one a finger of the hand goes up: the child counts on
           their own fingers too. */
        { type: "scene", prompt: "گوش کن و با انگشت‌هایت بشمار", bg: "#cfeaf7",
          parts: {
            farm: { art: "en-farm" },
            b1: { art: "en-bird", at: [176, 6], s: 1.6 }, b2: { art: "en-bird2", at: [176, 6], s: 1.6 }, b3: { art: "en-bird", at: [176, 6], s: 1.6 },
            b4: { art: "en-bird2", at: [176, 6], s: 1.6 }, b5: { art: "en-bird", at: [176, 6], s: 1.6 },
            hand: { art: "en-count-hand", at: [134, 86], s: 2.2 }
          },
          scenes: [
            { caption: "One!", do: landAndCount("b1", 16, 48, "f1") },
            { caption: "Two!", do: landAndCount("b2", 36, 48, "f2") },
            { caption: "Three!", do: landAndCount("b3", 56, 48, "f3") },
            { caption: "Four!", do: landAndCount("b4", 76, 48, "f4") },
            { caption: "Five!", do: landAndCount("b5", 96, 48, "f5").concat([{ id: "hand.fold", to: { o: 0 }, at: 700, dur: 200 }]) },
            { caption: "One, two, three, four, five!", key: 2350, do: [1, 2, 3, 4, 5].map(function (n) {
              return { id: "b" + n, to: { y: "-4" }, at: (n - 1) * 550, dur: 360, yoyo: true, times: 2 };
            }).concat([1, 2, 3, 4, 5].map(function (n) {
              return { id: "hand.f" + n, to: { s: 1.15 }, at: (n - 1) * 550, dur: 360, yoyo: true, times: 2 };
            })),
              wait: { tap: ["b1", "b2", "b3", "b4", "b5"], inOrder: true, hint: "حالا تو بشمار: از چپ، روی پرنده‌ها یکی‌یکی بزن و بلند به انگلیسی بشمار.",
                each: [{ id: "$", to: { y: "-4" }, dur: 400, yoyo: true, times: 2 }] } }
          ] },
        { type: "words", words: [{ dots: 1, en: "one" }, { dots: 2, en: "two" }, { dots: 3, en: "three" }, { dots: 4, en: "four" }, { dots: 5, en: "five" }] },
        { type: "words", words: [{ dots: 6, en: "six" }, { dots: 7, en: "seven" }, { dots: 8, en: "eight" }, { dots: 9, en: "nine" }, { dots: 10, en: "ten" }] },
        { type: "listen", say: "three", prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 2, en: "two" }, { dots: 3, en: "three" }, { dots: 5, en: "five" }], answer: 3 },
        { type: "listen", say: "five", quiet: true, prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 5, en: "five" }, { dots: 4, en: "four" }, { dots: 1, en: "one" }], answer: 5 },
        { type: "listen", say: "seven", quiet: true, prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 6, en: "six" }, { dots: 10, en: "ten" }, { dots: 7, en: "seven" }], answer: 7 },
        { type: "listen", say: "ten", quiet: true, prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 10, en: "ten" }, { dots: 8, en: "eight" }, { dots: 9, en: "nine" }], answer: 10 },
        { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 2, say: "two" }, "🐟🐟"], [{ dots: 4, say: "four" }, "🍎🍎🍎🍎"], [{ dots: 1, say: "one" }, "⭐"], [{ dots: 3, say: "three" }, "🎈🎈🎈"]] },
        { type: "tip", text: "هر وقت با هم چیزی می‌شمارید، مثل پله‌ها یا قاشق‌های سر سفره، یک بار هم به انگلیسی بشمارید: one, two, three… انگشت‌ها را هم با هم بشمارید. شمردن با انگشت و صدا، عددها را زودتر در ذهن کودک می‌نشاند." }
      ]
    },
    {
      id: "english-seed-12", subject: "english", level: "seed", emoji: "🔢", title: "چندتا؟",
      steps: [
        { type: "listen", show: "🍎🍎🍎", say: "How many apples?", prompt: "گوش کن و بشمار. چندتاست؟",
          options: [{ dots: 2, en: "Two." }, { dots: 3, en: "Three." }, { dots: 4, en: "Four." }], answer: 3 },
        { type: "listen", show: "🐟🐟🐟🐟🐟", say: "How many fish?", quiet: true, prompt: "گوش کن و بشمار. چندتاست؟",
          options: [{ dots: 5, en: "Five." }, { dots: 4, en: "Four." }, { dots: 6, en: "Six." }], answer: 5 },
        { type: "listen", show: "🐦🐦🐦🐦🐦🐦🐦", say: "How many birds?", quiet: true, prompt: "گوش کن و بشمار. چندتاست؟",
          options: [{ dots: 6, en: "Six." }, { dots: 8, en: "Eight." }, { dots: 7, en: "Seven." }], answer: 7 },
        { type: "listen", show: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐", say: "How many stars?", quiet: true, prompt: "گوش کن و بشمار. چندتاست؟",
          options: [{ dots: 10, en: "Ten." }, { dots: 9, en: "Nine." }, { dots: 8, en: "Eight." }], answer: 10 },
        { type: "listen", say: "Show me two fingers.", prompt: "گوش کن. کدام دست همین را نشان می‌دهد؟",
          options: [{ pic: "☝️", value: 1, en: "one" }, { pic: "✌️", value: 2, en: "two" }, { pic: "🖐️", value: 5, en: "five" }], answer: 2 },
        { type: "listen", say: "Show me five fingers.", quiet: true, prompt: "گوش کن. کدام دست همین را نشان می‌دهد؟",
          options: [{ pic: "✌️", value: 2, en: "two" }, { pic: "☝️", value: 1, en: "one" }, { pic: "🖐️", value: 5, en: "five" }], answer: 5 },
        { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 6, say: "six" }, "🎈🎈🎈🎈🎈🎈"], [{ dots: 5, say: "five" }, "🐥🐥🐥🐥🐥"], [{ dots: 3, say: "three" }, "🍌🍌🍌"], [{ dots: 4, say: "four" }, "🌸🌸🌸🌸"]] },
        { type: "tip", text: "از کودک بخواهید با انگشت‌هایش نشان بدهد: Show me three fingers. بعد بپرسید How many? تا بشمارد: one, two, three. سر سفره یا در بازی هم بپرسید How many apples? کودک اول با اشاره و بعد با کلمه جواب می‌دهد؛ هر دو خوب است." }
      ]
    },
    {
      id: "english-seed-13", subject: "english", level: "seed", emoji: "👂", title: "گوش کن!",
      steps: [
        { type: "listen", audio: SOUND + "knock.mp3", prompt: "گوش کن. صدای چیست؟",
          options: [{ pic: "🚪", en: "a door" }, { pic: "🔔", en: "a bell" }, { pic: "🌧️", en: "rain" }], answer: "🚪" },
        { type: "listen", audio: SOUND + "rain.mp3", quiet: true, prompt: "گوش کن. صدای چیست؟",
          options: [{ pic: "🚗", en: "a car" }, { pic: "🌧️", en: "rain" }, { pic: "🚪", en: "a door" }], answer: "🌧️" },
        { type: "listen", audio: SOUND + "bell-loud.mp3", quiet: true, prompt: "گوش کن. صدای چیست؟",
          options: [{ pic: "⏰", en: "a clock" }, { pic: "🚪", en: "a door" }, { pic: "🔔", en: "a bell" }], answer: "🔔" },
        { type: "listen", audio: SOUND + "clock.mp3", quiet: true, prompt: "گوش کن. صدای چیست؟",
          options: [{ pic: "⏰", en: "a clock" }, { pic: "🌧️", en: "rain" }, { pic: "🚗", en: "a car" }], answer: "⏰" },
        { type: "listen", audio: SOUND + "horn.mp3", quiet: true, prompt: "گوش کن. صدای چیست؟",
          options: [{ pic: "🔔", en: "a bell" }, { pic: "🚗", en: "a car" }, { pic: "⏰", en: "a clock" }], answer: "🚗" },
        { type: "listen", audio: SOUND + "bell-loud.mp3", prompt: "گوش کن. صدا بلند است یا آرام؟",
          options: [{ pic: "📢", value: "loud", en: "loud" }, { pic: "🤫", value: "quiet", en: "quiet" }], answer: "loud" },
        { type: "listen", audio: SOUND + "bell-quiet.mp3", quiet: true, prompt: "گوش کن. صدا بلند است یا آرام؟",
          options: [{ pic: "📢", value: "loud", en: "loud" }, { pic: "🤫", value: "quiet", en: "quiet" }], answer: "quiet" },
        { type: "pairs", prompt: "روی هر 🔊 بزن و گوش کن. هر صدا را با تصویرش جفت کن.",
          pairs: [[{ pic: "🔊", audio: SOUND + "knock.mp3" }, { pic: "🚪", say: "door" }], [{ pic: "🔊", audio: SOUND + "bell-loud.mp3" }, { pic: "🔔", say: "bell" }],
            [{ pic: "🔊", audio: SOUND + "rain.mp3" }, { pic: "🌧️", say: "rain" }], [{ pic: "🔊", audio: SOUND + "horn.mp3" }, { pic: "🚗", say: "car" }]] },
        { type: "tip", text: "این درس گوش را برای صداهای انگلیسی آماده می‌کند. با هم یک دقیقه چشم‌ها را ببندید و فقط گوش کنید: چه صداهایی می‌شنوید؟ کودک می‌تواند به فارسی بگوید. بعد بازی «بلند و آرام» کنید: یک کلمه انگلیسی را یک بار بلند و یک بار آرام بگویید و کودک بگوید loud یا quiet." }
      ]
    },
    {
      id: "english-seed-4", subject: "english", level: "seed", emoji: "🐾", title: "حیوان‌ها",
      steps: [
        /* Each animal comes and really makes its sound: its mouth opens, once for each sound in the words. */
        { type: "scene", prompt: "گوش کن و صدای حیوان‌ها را تو هم دربیاور", bg: "#cfeaf7",
          parts: {
            farm: { art: "en-farm" },
            cat: { art: "en-cat", at: [-20, 84], s: 2.6 }, sndC: { art: "en-sound", at: [103, 57], s: 1.4, o: 0 },
            dog: { art: "en-dog", at: [-40, 86], s: 1.6 }, sndD: { art: "en-sound", at: [116, 55], s: 1.4, o: 0 },
            duck: { art: "en-duck", at: [-30, 86], s: 2.3 }, sndK: { art: "en-sound", at: [111, 52], s: 1.4, o: 0 },
            cow: { art: "en-cow", at: [-40, 86], s: 1.45 }, sndW: { art: "en-sound", at: [106, 62], s: 1.6, o: 0 }
          },
          scenes: [
            { caption: "Cat! Meow!", key: 1500, do: [
              { id: "cat", path: "M-20 84Q30 56 80 84", dur: 800, ease: "out" },
              { id: "cat.head", to: { r: -10 }, at: 1000, dur: 250 }, { id: "cat.jaw", to: { r: 35 }, at: 1050, dur: 250 },
              { id: "sndC", to: { o: 1 }, at: 1100, dur: 150 }, { id: "sndC", to: { o: 0 }, at: 1900, dur: 200 },
              { id: "cat.jaw", to: { r: 0 }, at: 1900, dur: 250 }, { id: "cat.head", to: { r: 0 }, at: 2000, dur: 250 }
            ] },
            { caption: "Dog! Woof, woof!", key: 2000, do: [].concat([{ id: "cat", path: "M80 84Q140 50 220 84", dur: 800, ease: "in" }],
              trot("dog", 80, 300, 1300), [
                { id: "dog.jaw", to: { r: 30 }, at: 1750, dur: 1000, yoyo: true, times: 4 },
                { id: "sndD", to: { o: 1 }, at: 1750, dur: 1000, yoyo: true, times: 4 },
                { id: "dog.tail", to: { r: -25 }, at: 1750, dur: 1600, yoyo: true, times: 8 }
              ]) },
            { caption: "Duck! Quack, quack!", key: 2000, do: [].concat(trot("dog", 230, 0, 1300), [
              { id: "duck", to: { x: 80 }, at: 300, dur: 1300, ease: "linear" },
              { id: "duck", to: { r: 8 }, at: 300, dur: 1300, yoyo: true, times: 6 },
              { id: "duck.bill", to: { r: 32 }, at: 1750, dur: 1000, yoyo: true, times: 4 },
              { id: "sndK", to: { o: 1 }, at: 1750, dur: 1000, yoyo: true, times: 4 },
              { id: "duck.wing", to: { r: -25 }, at: 1750, dur: 1000, yoyo: true, times: 4 }
            ]) },
            { caption: "Cow! Moo!", key: 2700, hold: 4200, do: [
              { id: "duck", to: { x: 210 }, dur: 1300, ease: "linear" }, { id: "duck", to: { r: 8 }, dur: 1200, yoyo: true, times: 6 },
              { id: "cow", to: { x: 76 }, at: 300, dur: 1600, ease: "out" }, { id: "cow", to: { r: 2 }, at: 300, dur: 1600, yoyo: true, times: 4 },
              { id: "cow.head", to: { r: -12 }, at: 2000, dur: 400 }, { id: "cow.jaw", to: { r: 28 }, at: 2100, dur: 400 },
              { id: "sndW", to: { o: 1 }, at: 2150, dur: 200 }, { id: "sndW", to: { s: 1.9 }, at: 2350, dur: 900, yoyo: true, times: 2 },
              { id: "sndW", to: { o: 0 }, at: 3300, dur: 200 }, { id: "cow.jaw", to: { r: 0 }, at: 3300, dur: 300 }, { id: "cow.head", to: { r: 0 }, at: 3400, dur: 400 },
              { id: "cow.tail", to: { r: 15 }, at: 2000, dur: 1600, yoyo: true, times: 4 }
            ] }
          ] },
        { type: "words", words: [{ pic: "🐱", en: "cat" }, { pic: "🐶", en: "dog" }, { pic: "🐦", en: "bird" }, { pic: "🐟", en: "fish" }, { pic: "🐮", en: "cow" }, { pic: "🦆", en: "duck" }] },
        { type: "listen", say: "dog", options: [{ pic: "🐱", en: "cat" }, { pic: "🐶", en: "dog" }, { pic: "🐟", en: "fish" }], answer: "🐶" },
        { type: "listen", say: "fish", quiet: true, options: [{ pic: "🐟", en: "fish" }, { pic: "🐦", en: "bird" }, { pic: "🐮", en: "cow" }], answer: "🐟" },
        { type: "listen", say: "bird", quiet: true, options: [{ pic: "🦆", en: "duck" }, { pic: "🐱", en: "cat" }, { pic: "🐦", en: "bird" }], answer: "🐦" },
        { type: "listen", say: "cow", quiet: true, options: [{ pic: "🐮", en: "cow" }, { pic: "🐶", en: "dog" }, { pic: "🦆", en: "duck" }], answer: "🐮" },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🐱", say: "cat" }, { pic: "🐱", say: "cat" }], [{ pic: "🐶", say: "dog" }, { pic: "🐶", say: "dog" }],
            [{ pic: "🐟", say: "fish" }, { pic: "🐟", say: "fish" }], [{ pic: "🦆", say: "duck" }, { pic: "🦆", say: "duck" }]] },
        { type: "tip", text: "با هم بازی «من چه حیوانی‌ام؟» کنید: شما صدای یک حیوان را دربیاورید و کودک اسم انگلیسی‌اش را بگوید، یا برعکس. در کتاب‌های تصویری یا بیرون از خانه هم به حیوان‌ها اشاره کنید و بگویید cat، dog، bird." }
      ]
    },
    {
      id: "english-seed-14", subject: "english", level: "seed", emoji: "🐸", title: "مثل حیوان‌ها",
      steps: [
        /* The frog hops, the bird flies and the fish swims, and Arman moves like each one: he hops, flaps his arms
           like wings and makes swimming strokes. */
        { type: "scene", prompt: "گوش کن و تو هم مثل حیوان‌ها حرکت کن", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, pond: { art: "en-pond", at: [40, 74] }, fish: { art: "🐟", at: [18, 81], s: 0.7, o: 0 },
            frog: { art: "🐸", at: [6, 88], s: 0.8 }, bird: { art: "en-bird", at: [176, 10], s: 1.6, flip: true },
            kid: { art: "en-arman", at: [116, 86], s: 1.3 }
          },
          scenes: [
            { caption: "Hop like a frog!", key: 925, hold: 5600, do: [].concat([{ id: "frog", path: "M6 88Q14 74 22 88Q30 74 38 88Q46 74 54 88Q62 74 70 88", dur: 3200, ease: "linear" }],
              jump("kid", 600, 4, 8)) },
            { caption: "Fly like a bird!", key: 1400, hold: 5600, do: [].concat(fly("bird", "M176 10Q120 2 90 16T-20 12", 0, 3600),
              pose("kid", "R", "big", 300, 500), pose("kid", "L", "big", 300, 500), [
                { id: "kid.armR", to: { r: -140 }, at: 900, dur: 2800, yoyo: true, times: 8 }, { id: "kid.armL", to: { r: 140 }, at: 900, dur: 2800, yoyo: true, times: 8 }
              ], pose("kid", "R", "down", 3900, 400), pose("kid", "L", "down", 3900, 400)) },
            { caption: "Swim like a fish!", key: 1600, hold: 5600, do: [].concat([{ id: "fish", to: { o: 1 }, dur: 300 }, { id: "fish", path: "M18 81Q28 77 38 81T60 80", at: 300, dur: 3000 },
              { id: "fish", to: { r: 10 }, at: 300, dur: 3000, yoyo: true, times: 10 }],
              pose("kid", "R", "stretch", 300, 500), [
                { id: "kid.armR", to: { r: 0 }, at: 900, dur: 2800, yoyo: true, times: 4 }, { id: "kid.armL", to: { r: 150 }, at: 900, dur: 2800, yoyo: true, times: 4 }
              ], pose("kid", "R", "down", 3900, 400), pose("kid", "L", "down", 3900, 400)) }
          ] },
        { type: "listen", say: "Hop like a frog!", prompt: "گوش کن. مثل کدام حیوان؟",
          options: [{ pic: "🐦", en: "bird" }, { pic: "🐸", en: "frog" }, { pic: "🐟", en: "fish" }], answer: "🐸" },
        { type: "listen", say: "Swim like a fish!", quiet: true, prompt: "گوش کن. مثل کدام حیوان؟",
          options: [{ pic: "🐟", en: "fish" }, { pic: "🐸", en: "frog" }, { pic: "🐦", en: "bird" }], answer: "🐟" },
        { type: "listen", say: "Fly like a bird!", quiet: true, prompt: "گوش کن. مثل کدام حیوان؟",
          options: [{ pic: "🐸", en: "frog" }, { pic: "🐟", en: "fish" }, { pic: "🐦", en: "bird" }], answer: "🐦" },
        { type: "listen", say: "Ribbit, ribbit!", prompt: "گوش کن. این صدای کدام حیوان است؟",
          options: [{ pic: "🐮", en: "cow" }, { pic: "🐸", en: "frog" }, { pic: "🐶", en: "dog" }], answer: "🐸" },
        { type: "listen", say: "Tweet, tweet!", quiet: true, prompt: "گوش کن. این صدای کدام حیوان است؟",
          options: [{ pic: "🐦", en: "bird" }, { pic: "🐱", en: "cat" }, { pic: "🦆", en: "duck" }], answer: "🐦" },
        { type: "doit", pic: "🐸🐦🐟", text: "حالا تو مثل حیوان‌ها حرکت کن! بزرگ‌ترت می‌گوید و تو انجام می‌دهی:",
          say: "حالا تو مثل حیوان‌ها حرکت کن! بزرگ‌ترت می‌گوید و تو انجام می‌دهی.",
          list: ["Hop like a frog!", "Fly like a bird!", "Swim like a fish!", "Walk like a duck!"] },
        { type: "tip", text: "بازی «مثل حیوان‌ها» برای وقت‌هایی است که کودک باید کمی تکان بخورد: بگویید Hop like a frog و خودتان هم بپرید، بعد Fly like a bird و دست‌ها را بال بزنید. صدای حیوان‌ها را هم به انگلیسی دربیاورید: frog می‌گوید ribbit، bird می‌گوید tweet. کودک هر بار هم کلمه را می‌شنود و هم آن را با بدنش نشان می‌دهد." }
      ]
    },
    {
      id: "english-seed-5", subject: "english", level: "seed", emoji: "👨‍👩‍👧", title: "خانواده",
      steps: [
        /* Sara points at each one of her family as they come and wave: "this is" is the pointing. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            mother: { art: "en-mother", at: [44, 86], o: 0 }, father: { art: "en-father", at: [66, 86], o: 0 },
            sister: { art: "en-sister", at: [87, 86], o: 0 }, brother: { art: "en-brother", at: [105, 86], o: 0 },
            grandma: { art: "en-grandma", at: [125, 86], o: 0 }, grandpa: { art: "en-grandpa", at: [145, 86], o: 0 },
            sara: { art: "en-sara", at: [18, 86], s: 1.1 }
          },
          scenes: ["mother", "father", "sister", "brother", "grandma", "grandpa"].map(function (who, i) {
            return { caption: "This is my " + who + ".", key: 1500, do: [].concat(i ? pose("sara", "R", "down", 0, 300) : [],
              pose("sara", "R", "point", 350, 450), talk("sara", 0, 1500), [
                { id: who, to: { o: 1 }, dur: 400 }, { id: who, to: { y: "-4" }, dur: 500, yoyo: true, times: 2 }
              ], wave(who, "L", 700, 1800)) };
          }) },
        { type: "words", words: [{ pic: "👩", en: "mother" }, { pic: "👨", en: "father" }, { pic: "👧", en: "sister" }, { pic: "👦", en: "brother" }, { pic: "👵", en: "grandma" }, { pic: "👴", en: "grandpa" }] },
        { type: "listen", say: "father", options: [{ pic: "👩", en: "mother" }, { pic: "👨", en: "father" }, { pic: "👴", en: "grandpa" }], answer: "👨" },
        { type: "listen", say: "sister", quiet: true, options: [{ pic: "👦", en: "brother" }, { pic: "👵", en: "grandma" }, { pic: "👧", en: "sister" }], answer: "👧" },
        { type: "listen", say: "grandma", quiet: true, options: [{ pic: "👵", en: "grandma" }, { pic: "👩", en: "mother" }, { pic: "👧", en: "sister" }], answer: "👵" },
        { type: "listen", say: "This is my brother.", quiet: true, options: [{ pic: "👨", en: "father" }, { pic: "👦", en: "brother" }, { pic: "👴", en: "grandpa" }], answer: "👦" },
        { type: "tip", text: "عکس‌های خانوادگی را با هم نگاه کنید. به هر نفر اشاره کنید و بگویید: This is my mother، This is my grandpa. بعد نوبت کودک است که اشاره کند و بگوید. لازم نیست جمله‌ها را معنی کنید؛ تصویر و اشاره معنی را می‌رساند." }
      ]
    },
    {
      id: "english-seed-15", subject: "english", level: "seed", emoji: "👵", title: "این مامان من است",
      steps: [
        /* Reza shows Mina his family: each one comes in and waves when he points; Mina points and asks who's this. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            mum: { art: "en-mother", at: [52, 86], o: 0 }, dad: { art: "en-father", at: [80, 86], o: 0 }, grandpa: { art: "en-grandpa", at: [108, 86], o: 0 },
            mina: { art: "en-mina", at: [20, 86], s: 0.95 }, reza: { art: "en-reza", at: [140, 86], s: 0.95 },
            askM: { art: "en-ask", at: [27, 52], o: 0 }
          },
          scenes: [
            { caption: "This is my mum.", key: 1700, do: [].concat(pose("reza", "L", "point", 0, 500), talk("reza", 0, 1500),
              [{ id: "mum", to: { o: 1 }, at: 200, dur: 400 }], wave("mum", "R", 700, 1800)) },
            { caption: "Who's this?", key: 1300, do: [].concat(pose("reza", "L", "down", 0, 400), [{ id: "dad", to: { o: 1 }, dur: 400 }, { id: "dad", to: { y: "-4" }, at: 400, dur: 600, yoyo: true, times: 2 }],
              pose("mina", "R", "point", 300, 500), talk("mina", 300, 1100), pop("askM", 700)) },
            { caption: "It's my dad.", key: 1500, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400),
              pose("reza", "L", "point", 0, 500), talk("reza", 0, 1300), wave("dad", "R", 600, 1800)) },
            { caption: "Who's this?", key: 1300, do: [].concat(pose("reza", "L", "down", 0, 400), [{ id: "grandpa", to: { o: 1 }, dur: 400 }, { id: "grandpa", to: { y: "-4" }, at: 400, dur: 600, yoyo: true, times: 2 }],
              pose("mina", "R", "point", 300, 500), talk("mina", 300, 1100), pop("askM", 700)) },
            { caption: "It's my grandpa.", key: 1500, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400),
              pose("reza", "L", "point", 0, 500), talk("reza", 0, 1500), wave("grandpa", "R", 600, 1800)) }
          ] },
        { type: "listen", say: "This is my mum.", prompt: "گوش کن. کیست؟",
          options: [{ pic: "👩", en: "mum" }, { pic: "👨", en: "dad" }, { pic: "👵", en: "grandma" }], answer: "👩" },
        { type: "listen", say: "It's my dad.", quiet: true, prompt: "گوش کن. کیست؟",
          options: [{ pic: "👴", en: "grandpa" }, { pic: "👨", en: "dad" }, { pic: "👦", en: "brother" }], answer: "👨" },
        { type: "listen", say: "It's my grandpa.", quiet: true, prompt: "گوش کن. کیست؟",
          options: [{ pic: "👨", en: "dad" }, { pic: "👧", en: "sister" }, { pic: "👴", en: "grandpa" }], answer: "👴" },
        { type: "listen", say: "This is my sister.", quiet: true, prompt: "گوش کن. کیست؟",
          options: [{ pic: "👧", en: "sister" }, { pic: "👩", en: "mum" }, { pic: "👦", en: "brother" }], answer: "👧" },
        { type: "listen", say: "Who's this? It's my grandma.", quiet: true, prompt: "گوش کن. کیست؟",
          options: [{ pic: "👴", en: "grandpa" }, { pic: "👵", en: "grandma" }, { pic: "👩", en: "mum" }], answer: "👵" },
        { type: "tip", text: "عکس‌های خانوادگی را دوباره نگاه کنید. این بار شما بپرسید Who's this? و کودک جواب بدهد It's my grandpa یا فقط grandpa. بعد کودک بپرسد و شما جواب بدهید. در انگلیسی به مادر mum (یا mother) و به پدر dad (یا father) می‌گویند." }
      ]
    },
    {
      id: "english-seed-6", subject: "english", level: "seed", emoji: "👃", title: "بدن من",
      steps: [
        /* Arman does each action, so the child sees what the words mean and does it too (there is time to do it). */
        { type: "scene", prompt: "گوش کن و تو هم همین کار را بکن", bg: "#fdf6e9",
          parts: { kid: { art: "en-arman", at: [80, 88], s: 2 } },
          scenes: [
            { caption: "Touch your nose!", key: 2000, hold: 5000, do: [].concat(pose("kid", "R", "nose", 300, 700),
              [{ id: "kid.foreR", to: { r: "+12" }, at: 1300, dur: 800, yoyo: true, times: 4 }]) },
            { caption: "Touch your eyes!", key: 2000, hold: 5000, do: [].concat(pose("kid", "R", "down", 0, 400),
              pose("kid", "R", "eye", 500, 700), pose("kid", "L", "eye", 500, 700)) },
            { caption: "Touch your ears!", key: 2000, hold: 5000, do: [].concat(pose("kid", "R", "down", 0, 400), pose("kid", "L", "down", 0, 400),
              pose("kid", "R", "ear", 500, 700), pose("kid", "L", "ear", 500, 700)) },
            { caption: "Touch your mouth!", key: 2000, hold: 5000, do: [].concat(pose("kid", "R", "down", 0, 400), pose("kid", "L", "down", 0, 400),
              pose("kid", "R", "mouth", 500, 700)) },
            { caption: "Clap your hands!", key: 1000, hold: 5000, do: [].concat(pose("kid", "R", "clapOpen", 0, 500), pose("kid", "L", "clapOpen", 0, 500), [
              { id: "kid.foreR", to: { r: 110 }, at: 600, dur: 2400, yoyo: true, times: 6 },
              { id: "kid.foreL", to: { r: -110 }, at: 600, dur: 2400, yoyo: true, times: 6 },
              { emit: "spark", where: [80, 57], spread: [10, 6], n: 9, at: 900, dur: 2000, life: 700 }
            ]) },
            { caption: "Stamp your feet!", key: 750, hold: 5000, do: [].concat(pose("kid", "R", "down", 0, 400), pose("kid", "L", "down", 0, 400),
              [0, 1, 2, 3].map(function (n) {
                return { id: n % 2 ? "kid.legR" : "kid.legL", to: { sy: 0.55 }, at: 400 + n * 700, dur: 700, yoyo: true, times: 2 };
              }), [0, 1, 2, 3].map(function (n) {
                return { emit: "spark", where: [n % 2 ? 86 : 74, 87], spread: [6, 2], rise: -3, n: 4, at: 1100 + n * 700, dur: 100, life: 600 };
              })) }
          ] },
        { type: "words", words: [{ pic: "👃", en: "nose" }, { pic: "👀", en: "eyes" }, { pic: "👂", en: "ears" }, { pic: "👄", en: "mouth" }, { pic: "✋", en: "hand" }, { pic: "🦶", en: "foot" }] },
        { type: "listen", say: "nose", options: [{ pic: "👂", en: "ears" }, { pic: "👃", en: "nose" }, { pic: "✋", en: "hand" }], answer: "👃" },
        { type: "listen", say: "eyes", quiet: true, options: [{ pic: "👀", en: "eyes" }, { pic: "👄", en: "mouth" }, { pic: "🦶", en: "foot" }], answer: "👀" },
        { type: "listen", say: "Clap your hands!", quiet: true, options: [{ pic: "🦶", en: "foot" }, { pic: "👂", en: "ears" }, { pic: "✋", en: "hand" }], answer: "✋" },
        { type: "listen", say: "Touch your mouth!", quiet: true, options: [{ pic: "👄", en: "mouth" }, { pic: "👃", en: "nose" }, { pic: "👀", en: "eyes" }], answer: "👄" },
        { type: "tip", text: "این درس را با بدن بازی کنید: بگویید Touch your nose و خودتان هم دست روی بینی بگذارید. بعد جای شما و کودک عوض شود. کلمه‌هایی که با حرکت یاد گرفته شوند، بهتر یاد کودک می‌مانند." }
      ]
    },

    {
      id: "english-seed-16", subject: "english", level: "seed", emoji: "🙌", title: "دست بزن به دماغت",
      steps: [
        /* Our own action chant: each line is done as it is said. */
        { type: "scene", prompt: "گوش کن، شعر را با او بگو و حرکت‌ها را انجام بده", bg: "#fdf6e9",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, kid: { art: "en-arman", at: [80, 88], s: 2 } },
          scenes: [
            { caption: "Touch your nose! Touch your nose!", key: 1300, hold: 4200, do: [].concat(pose("kid", "R", "nose", 200, 600),
              [{ id: "kid.foreR", to: { r: "+12" }, at: 1000, dur: 1600, yoyo: true, times: 4 }]) },
            { caption: "Clap your hands! Clap, clap, clap!", key: 1050, hold: 4200, do: [].concat(pose("kid", "R", "down", 0, 400), clapHands("kid", 200, 3, [80, 57])) },
            { caption: "Stamp your feet! Stamp, stamp, stamp!", key: 650, hold: 4200, do: stamp("kid", 300, 4, [74, 86, 87]) },
            { caption: "Touch your ears! Touch your ears!", key: 1300, hold: 4200, do: [].concat(pose("kid", "R", "ear", 200, 600), pose("kid", "L", "ear", 200, 600)) },
            { caption: "Now sit down, and stop!", key: 2400, hold: 4200, do: [].concat(pose("kid", "R", "down", 0, 400), pose("kid", "L", "down", 0, 400),
              [{ id: "kid", to: { y: "+12" }, at: 600, dur: 900 }, { id: "kid.legL", to: { sy: 0.25 }, at: 600, dur: 900 }, { id: "kid.legR", to: { sy: 0.25 }, at: 600, dur: 900 }],
              face("kid", true, 1600)) }
          ] },
        { type: "listen", say: "Stamp your feet!", prompt: "گوش کن. با کدام؟",
          options: [{ pic: "✋", en: "hands" }, { pic: "🦶", en: "feet" }, { pic: "👃", en: "nose" }], answer: "🦶" },
        { type: "listen", say: "Touch your nose!", quiet: true, prompt: "گوش کن. با کدام؟",
          options: [{ pic: "👃", en: "nose" }, { pic: "👂", en: "ears" }, { pic: "🦶", en: "feet" }], answer: "👃" },
        { type: "listen", say: "Clap your hands!", quiet: true, prompt: "گوش کن. با کدام؟",
          options: [{ pic: "👂", en: "ears" }, { pic: "🦶", en: "feet" }, { pic: "✋", en: "hands" }], answer: "✋" },
        { type: "listen", say: "Touch your ears!", quiet: true, prompt: "گوش کن. با کدام؟",
          options: [{ pic: "👃", en: "nose" }, { pic: "👂", en: "ears" }, { pic: "✋", en: "hands" }], answer: "👂" },
        { type: "doit", pic: "🙌", text: "شعر را با بزرگ‌ترت بلند بخوان و با هر خط، همان کار را بکن. یک بار آرام، یک بار تند!",
          say: "شعر را با بزرگ‌ترت بلند بخوان و با هر خط، همان کار را بکن. یک بار آرام، یک بار تند!",
          list: ["Touch your nose! Touch your nose!", "Clap your hands! Clap, clap, clap!", "Stamp your feet! Stamp, stamp, stamp!", "Touch your ears! Touch your ears!", "Now sit down, and stop!"] },
        { type: "tip", text: "این شعر را می‌شود هر روز، مثلاً قبل از ناهار، با هم خواند. اول شما بخوانید و حرکت کنید و کودک فقط حرکت کند؛ کم‌کم کودک هم با شما بخواند. آخر شعر (and stop) را آرام و با مکث بگویید تا کودک منتظر بماند. اگر خواستید، یک خط تازه با کلمه‌هایی که بلد است بسازید: Touch your eyes!" }
      ]
    },
    {
      id: "english-seed-7", subject: "english", level: "seed", emoji: "🍞", title: "خوراکی‌ها",
      steps: [
        /* Breakfast: Sara asks for something with «please», her mother passes it with «Here you are», and Sara says
           «Thank you». Asking, giving and thanking are each shown. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf0d5",
          parts: {
            kitchen: { art: "en-kitchen" }, mom: { art: "en-mother", at: [124, 80], s: 1.1 }, sara: { art: "en-sara", at: [38, 76], s: 1.1 },
            table: { art: "en-table", at: [80, 90], s: 1.4 }, plate: { art: "en-plate", at: [46, 61], s: 0.8 },
            bread: { art: "🍞", at: [98, 61], s: 0.7 }, cheese: { art: "🧀", at: [110, 61], s: 0.6 }, milk: { art: "🥛", at: [121, 61], s: 0.6 }
          },
          scenes: [
            { caption: "Good morning! Breakfast time!", key: 900, do: [].concat(wave("mom", "R", 0, 1900, true), talk("mom", 0, 2200)) },
            { caption: "Bread, please.", key: 1000, do: [].concat(pose("mom", "R", "down", 0, 400), pose("sara", "R", "point", 0, 500), talk("sara", 0, 1200), pose("sara", "R", "down", 1700, 400)) },
            { caption: "Here you are.", key: 900, do: [].concat(pose("mom", "L", "point", 0, 500), talk("mom", 0, 1100),
              [{ id: "bread", path: "M98 61Q72 38 46 61", at: 300, dur: 1200 }], pose("mom", "L", "down", 1700, 400)) },
            { caption: "Thank you!", key: 1000, do: [].concat(pose("sara", "R", "chest", 0, 500), talk("sara", 0, 1000),
              [{ id: "sara.head", to: { y: 1.2 }, at: 500, dur: 600, yoyo: true, times: 2 }], pose("sara", "R", "down", 1700, 400)) },
            { caption: "Milk, please.", key: 1000, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1200), pose("sara", "R", "down", 1700, 400)) },
            { caption: "Here you are.", key: 900, do: [].concat(pose("mom", "L", "point", 0, 500), talk("mom", 0, 1100),
              [{ id: "milk", path: "M121 61Q90 34 60 61", at: 300, dur: 1200 }], pose("mom", "L", "down", 1700, 400)) },
            { caption: "Thank you!", key: 1000, do: [].concat(pose("sara", "R", "chest", 0, 500), talk("sara", 0, 1000),
              [{ id: "sara.head", to: { y: 1.2 }, at: 500, dur: 600, yoyo: true, times: 2 }], pose("sara", "R", "down", 1700, 400)) }
          ] },
        { type: "words", words: [{ pic: "🍞", en: "bread" }, { pic: "🧀", en: "cheese" }, { pic: "🥚", en: "egg" }, { pic: "🥛", en: "milk" }, { pic: "💧", en: "water" }, { pic: "🍎", en: "apple" }] },
        { type: "listen", say: "bread", options: [{ pic: "🥛", en: "milk" }, { pic: "🍞", en: "bread" }, { pic: "🍎", en: "apple" }], answer: "🍞" },
        { type: "listen", say: "egg", quiet: true, options: [{ pic: "🥚", en: "egg" }, { pic: "🧀", en: "cheese" }, { pic: "💧", en: "water" }], answer: "🥚" },
        { type: "listen", say: "Water, please.", quiet: true, options: [{ pic: "🍞", en: "bread" }, { pic: "🥚", en: "egg" }, { pic: "💧", en: "water" }], answer: "💧" },
        { type: "listen", say: "Milk, please.", quiet: true, options: [{ pic: "🥛", en: "milk" }, { pic: "🍎", en: "apple" }, { pic: "🧀", en: "cheese" }], answer: "🥛" },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🍞", say: "bread" }, { pic: "🍞", say: "bread" }], [{ pic: "🧀", say: "cheese" }, { pic: "🧀", say: "cheese" }],
            [{ pic: "🥚", say: "egg" }, { pic: "🥚", say: "egg" }], [{ pic: "🥛", say: "milk" }, { pic: "🥛", say: "milk" }]] },
        { type: "tip", text: "سر سفره صبحانه بازی «لطفاً» را بازی کنید: کودک چیزی را که می‌خواهد به انگلیسی بخواهد، مثل Bread, please، و شما بدهید و بگویید Here you are. او هم بگوید Thank you. کلمه‌ای که برای خواستن چیزی واقعی به کار برود، زود یاد کودک می‌ماند." }
      ]
    },
    {
      id: "english-seed-17", subject: "english", level: "seed", emoji: "🙏", title: "لطفاً، ممنون",
      steps: [
        /* Reza asks Grandma for an apple and she passes it; she offers milk (yes, please: he nods and it comes) and
           cheese (no, thank you: he shakes his head and it stays). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf0d5",
          parts: {
            kitchen: { art: "en-kitchen" }, gran: { art: "en-grandma", at: [126, 80], s: 1.1 }, reza: { art: "en-reza", at: [36, 76], s: 1.1 },
            table: { art: "en-table", at: [80, 90], s: 1.4 }, plate: { art: "en-plate", at: [50, 61], s: 0.8 },
            apple: { art: "🍎", at: [88, 61], s: 0.6 }, milk: { art: "🥛", at: [100, 61], s: 0.6 }, cheese: { art: "🧀", at: [111, 61], s: 0.6 },
            askG: { art: "en-ask", at: [116, 34], o: 0, flip: true }
          },
          scenes: [
            { caption: "Can I have an apple, please?", key: 1000, hold: 3800, do: [].concat(pose("reza", "R", "point", 0, 500), talk("reza", 0, 2400), pose("reza", "R", "down", 2600, 400)) },
            { caption: "Here you are.", key: 1700, do: [].concat(pose("gran", "L", "point", 0, 500), talk("gran", 0, 1100),
              [{ id: "apple", path: "M88 61Q70 40 50 61", at: 400, dur: 1200 }], pose("gran", "L", "down", 1800, 400)) },
            { caption: "Thank you!", key: 1100, do: [].concat(pose("reza", "R", "chest", 0, 500), talk("reza", 0, 1000), nod("reza", 500), pose("reza", "R", "down", 1900, 400)) },
            { caption: "Milk?", key: 1200, do: [].concat(pose("gran", "L", "point", 0, 500), talk("gran", 0, 800), pop("askG", 500),
              [{ id: "milk", to: { y: "-3" }, at: 600, dur: 900, yoyo: true, times: 2 }]) },
            { caption: "Yes, please!", key: 2300, do: [].concat([{ id: "askG", to: { o: 0 }, dur: 300 }], nod("reza", 0), talk("reza", 0, 1100),
              [{ id: "milk", path: "M100 61Q82 38 64 61", at: 1000, dur: 1200 }], pose("gran", "L", "down", 1400, 400)) },
            { caption: "Cheese?", key: 1200, do: [].concat(pose("gran", "L", "point", 0, 500), talk("gran", 0, 800), pop("askG", 500),
              [{ id: "cheese", to: { y: "-3" }, at: 600, dur: 900, yoyo: true, times: 2 }]) },
            { caption: "No, thank you.", key: 900, do: [].concat([{ id: "askG", to: { o: 0 }, dur: 300 }], shake("reza", 0), talk("reza", 0, 1300),
              face("reza", true, 0), pose("gran", "L", "down", 1500, 400)) }
          ] },
        { type: "listen", say: "Can I have an apple, please?", prompt: "گوش کن. چه می‌خواهد؟",
          options: [{ pic: "🧀", en: "cheese" }, { pic: "🍎", en: "an apple" }, { pic: "🥛", en: "milk" }], answer: "🍎" },
        { type: "listen", say: "Can I have some bread, please?", quiet: true, prompt: "گوش کن. چه می‌خواهد؟",
          options: [{ pic: "🍞", en: "bread" }, { pic: "🥚", en: "an egg" }, { pic: "🍎", en: "an apple" }], answer: "🍞" },
        { type: "listen", show: "🍎", prompt: "مادربزرگ به تو سیب داد. چه می‌گویی؟ روی هر تصویر بزن و گوش کن.",
          options: [{ pic: "🚶👋", en: "Goodbye!", value: "bye" }, { pic: "🙏", en: "Thank you!", value: "thanks" }], answer: "thanks" },
        { type: "listen", show: "🥛", say: "Milk?", prompt: "شیر می‌خواهی. مادربزرگ می‌پرسد Milk? چه می‌گویی؟",
          options: [{ pic: "👍", en: "Yes, please!", value: "yes" }, { pic: "🙅", en: "No, thank you.", value: "no" }], answer: "yes" },
        { type: "listen", show: "🧀", say: "Cheese?", prompt: "پنیر نمی‌خواهی. مادربزرگ می‌پرسد Cheese? چه می‌گویی؟",
          options: [{ pic: "👍", en: "Yes, please!", value: "yes" }, { pic: "🙅", en: "No, thank you.", value: "no" }], answer: "no" },
        { type: "tip", text: "سر سفره به انگلیسی تعارف کنید: Milk? یا Bread? تا کودک جواب بدهد Yes, please یا No, thank you. وقتی چیزی می‌خواهد، کمکش کنید بگوید Can I have an apple, please? و شما بدهید و بگویید Here you are. لازم نیست جمله کامل باشد؛ Apple, please هم خوب است." }
      ]
    },
    {
      id: "english-seed-8", subject: "english", level: "seed", emoji: "🎲", title: "بازی کلمه‌ها",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. حیوان‌ها را در یک سبد و خوراکی‌ها را در سبد دیگر بگذار.",
          baskets: [{ pic: "🐾", value: "animal" }, { pic: "🍽️", value: "food" }],
          items: [{ pic: "🐱", say: "cat", basket: "animal" }, { pic: "🍞", say: "bread", basket: "food" }, { pic: "🐟", say: "fish", basket: "animal" },
            { pic: "🥚", say: "egg", basket: "food" }, { pic: "🦆", say: "duck", basket: "animal" }, { pic: "🍎", say: "apple", basket: "food" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🐶", say: "dog" }, { pic: "🐶", say: "dog" }], [{ pic: "👃", say: "nose" }, { pic: "👃", say: "nose" }],
            [{ pic: "👩", say: "mother" }, { pic: "👩", say: "mother" }], [{ pic: "🥛", say: "milk" }, { pic: "🥛", say: "milk" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. بدن را در یک سبد و خانواده را در سبد دیگر بگذار.",
          baskets: [{ pic: "🖐️", value: "body" }, { pic: "🏠", value: "family" }],
          items: [{ pic: "👃", say: "nose", basket: "body" }, { pic: "👵", say: "grandma", basket: "family" }, { pic: "👂", say: "ears", basket: "body" },
            { pic: "👦", say: "brother", basket: "family" }, { pic: "👀", say: "eyes", basket: "body" }, { pic: "👨", say: "father", basket: "family" }] },
        { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 2, say: "two" }, "🐱🐱"], [{ dots: 3, say: "three" }, "🍎🍎🍎"], [{ dots: 1, say: "one" }, "🐶"], [{ dots: 4, say: "four" }, "🥚🥚🥚🥚"]] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر حیوان را با صدایش جفت کن.",
          pairs: [[{ pic: "🐮", say: "cow" }, { pic: "🐮", say: "Moo!" }], [{ pic: "🐱", say: "cat" }, { pic: "🐱", say: "Meow!" }],
            [{ pic: "🐶", say: "dog" }, { pic: "🐶", say: "Woof, woof!" }], [{ pic: "🦆", say: "duck" }, { pic: "🦆", say: "Quack, quack!" }]] }
      ]
    },
    {
      id: "english-seed-18", subject: "english", level: "seed", emoji: "🥁", title: "بازی با ضرب",
      steps: [
        { type: "listen", audio: SOUND + "claps-2.mp3", prompt: "گوش کن. چند بار دست زد؟",
          options: [{ dots: 2, en: "two" }, { dots: 3, en: "three" }, { dots: 4, en: "four" }], answer: 2 },
        { type: "listen", audio: SOUND + "claps-4.mp3", quiet: true, prompt: "گوش کن. چند بار دست زد؟",
          options: [{ dots: 3, en: "three" }, { dots: 2, en: "two" }, { dots: 4, en: "four" }], answer: 4 },
        { type: "listen", audio: SOUND + "claps-3.mp3", quiet: true, prompt: "گوش کن. چند بار دست زد؟",
          options: [{ dots: 4, en: "four" }, { dots: 3, en: "three" }, { dots: 2, en: "two" }], answer: 3 },
        { type: "listen", audio: SOUND + "claps-slow.mp3", prompt: "گوش کن. آرام دست می‌زند یا تند؟",
          options: [{ pic: "🐢", value: "slow", en: "slow" }, { pic: "🐇", value: "fast", en: "fast" }], answer: "slow" },
        { type: "listen", audio: SOUND + "claps-fast.mp3", quiet: true, prompt: "گوش کن. آرام دست می‌زند یا تند؟",
          options: [{ pic: "🐢", value: "slow", en: "slow" }, { pic: "🐇", value: "fast", en: "fast" }], answer: "fast" },
        { type: "listen", say: "Clap, clap, clap your hands!", prompt: "گوش کن. چند بار می‌گوید clap؟",
          options: [{ dots: 2, en: "two" }, { dots: 4, en: "four" }, { dots: 3, en: "three" }], answer: 3 },
        { type: "doit", pic: "👏", audio: SOUND + "claps-rhythm.mp3", text: "گوش کن و همین ضرب را با دست‌هایت بزن. بعد تو یک ضرب تازه بزن و بزرگ‌ترت تکرار کند.",
          say: "گوش کن و همین ضرب را با دست‌هایت بزن." },
        { type: "doit", pic: "🐢 🐇", text: "شعر را بخوان و با هر کلمه یک بار دست بزن: یک بار آرام مثل لاک‌پشت، یک بار تند مثل خرگوش.",
          say: "شعر را بخوان و با هر کلمه یک بار دست بزن: یک بار آرام مثل لاک‌پشت، یک بار تند مثل خرگوش.",
          list: ["Touch your nose! Touch your nose!", "Clap your hands! Clap, clap, clap!", "Stamp your feet! Stamp, stamp, stamp!"] },
        { type: "tip", text: "ضرب و ریتم، گوش را برای تکه‌های کلمه آماده می‌کند. با قاشق روی میز یا با دست ضرب بزنید (دو بار، سه بار، یک ضرب کوتاه و بلند) و کودک تکرار کند. شعرهای انگلیسی همین درس‌ها را یک بار آرام و یک بار تند با دست زدن بخوانید." }
      ]
    },
    {
      id: "english-seed-19", subject: "english", level: "seed", emoji: "🧸", title: "اسباب‌بازی‌ها",
      steps: [
        /* One toy after another jumps out of the toy box into Sara's hand, and goes back in for the next one. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, sara: { art: "en-sara", at: [44, 86], s: 1.2 },
            boxB: { art: "en-box-back", at: [112, 86], s: 1.3 },
            ball: { art: "en-ball", at: [112, 74], s: 1.7, o: 0 }, doll: { art: "en-doll", at: [112, 74], s: 1.15, o: 0 }, teddy: { art: "🧸", at: [112, 74], s: 0.8, o: 0 },
            car: { art: "🚗", at: [112, 74], s: 0.8, o: 0 }, kite: { art: "🪁", at: [112, 74], s: 0.9, o: 0 }, train: { art: "🚂", at: [112, 74], s: 0.8, o: 0 },
            boxF: { art: "en-box-front", at: [112, 86], s: 1.3 }
          },
          scenes: ["ball", "doll", "teddy", "car", "kite", "train"].map(function (t, i, all) {
            var sz = { ball: 1.7, doll: 1.15, teddy: 0.8, car: 0.8, kite: 0.9, train: 0.8 }[t];
            var hand = handAt("en-sara", [44, 86], 1.2, "R", "hold"), at = [hand[0], +(hand[1] + (t === "ball" ? 5 : t === "doll" ? 11 : 10 * sz)).toFixed(1)];
            var back = i ? [arc(all[i - 1], at, [112, 74], 0, 800, 8), { id: all[i - 1], to: { o: 0 }, at: 650, dur: 150 }] : [];
            return { caption: "I've got " + (t === "doll" ? "a doll" : t === "teddy" ? "a teddy" : "a " + t) + "!", key: 2300, hold: 3600,
              do: [].concat(back, i ? [] : pose("sara", "R", "hold", 0, 500), [{ id: t, to: { o: 1 }, at: 900, dur: 150 }, arc(t, [112, 74], at, 900, 1100, 18)],
                talk("sara", 1800, 1400)) };
          }) },
        { type: "words", words: [{ pic: "⚽", en: "ball" }, { pic: "🪆", en: "doll" }, { pic: "🧸", en: "teddy" }, { pic: "🚗", en: "car" }, { pic: "🪁", en: "kite" }, { pic: "🚂", en: "train" }] },
        { type: "listen", say: "I've got a kite!", prompt: "گوش کن. چه دارد؟",
          options: [{ pic: "🚗", en: "car" }, { pic: "🪁", en: "kite" }, { pic: "⚽", en: "ball" }], answer: "🪁" },
        { type: "listen", say: "I've got a teddy!", quiet: true, prompt: "گوش کن. چه دارد؟",
          options: [{ pic: "🧸", en: "teddy" }, { pic: "🚂", en: "train" }, { pic: "🪆", en: "doll" }], answer: "🧸" },
        { type: "listen", say: "I've got a train!", quiet: true, prompt: "گوش کن. چه دارد؟",
          options: [{ pic: "🪁", en: "kite" }, { pic: "🧸", en: "teddy" }, { pic: "🚂", en: "train" }], answer: "🚂" },
        { type: "listen", say: "I've got a doll!", quiet: true, prompt: "گوش کن. چه دارد؟",
          options: [{ pic: "🪆", en: "doll" }, { pic: "⚽", en: "ball" }, { pic: "🚗", en: "car" }], answer: "🪆" },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "⚽", say: "ball" }, { pic: "⚽", say: "ball" }], [{ pic: "🚗", say: "car" }, { pic: "🚗", say: "car" }],
            [{ pic: "🧸", say: "teddy" }, { pic: "🧸", say: "teddy" }], [{ pic: "🪁", say: "kite" }, { pic: "🪁", say: "kite" }]] },
        { type: "tip", text: "موقع بازی، اسباب‌بازی‌ها را یکی‌یکی از جعبه دربیاورید و بگویید I've got a ball! بعد کودک یکی دربیاورد و بگوید. موقع جمع کردن هم بگویید Ball, please! تا کودک توپ را به شما بدهد." }
      ]
    },
    {
      id: "english-seed-20", subject: "english", level: "seed", emoji: "🎩", title: "هم‌قافیه",
      steps: [
        { type: "listen", show: "🐱", say: "cat", prompt: "آخر کدام کلمه مثل cat صدا می‌دهد؟ روی تصویرها بزن و گوش کن.",
          options: [{ pic: "🐶", en: "dog" }, { pic: "👒", en: "hat" }, { pic: "🐟", en: "fish" }], answer: "👒" },
        { type: "listen", show: "🐶", say: "dog", prompt: "آخر کدام کلمه مثل dog صدا می‌دهد؟",
          options: [{ pic: "🐸", en: "frog" }, { pic: "🐱", en: "cat" }, { pic: "🚗", en: "car" }], answer: "🐸" },
        { type: "listen", show: "🐭", say: "mouse", prompt: "آخر کدام کلمه مثل mouse صدا می‌دهد؟",
          options: [{ pic: "🐮", en: "cow" }, { pic: "🍎", en: "apple" }, { pic: "🏠", en: "house" }], answer: "🏠" },
        { type: "listen", show: "🐐", say: "goat", prompt: "آخر کدام کلمه مثل goat صدا می‌دهد؟",
          options: [{ pic: "⛵", en: "boat" }, { pic: "🐔", en: "chicken" }, { pic: "🌳", en: "tree" }], answer: "⛵" },
        { type: "listen", show: "🐻", say: "bear", prompt: "آخر کدام کلمه مثل bear صدا می‌دهد؟",
          options: [{ pic: "🐟", en: "fish" }, { pic: "🪑", en: "chair" }, { pic: "🌳", en: "tree" }], answer: "🪑" },
        { type: "listen", show: "🐱", say: "I can see a cat in a big red ...", prompt: "گوش کن و شعر را تمام کن. کدام هم‌قافیه است؟",
          options: [{ pic: "🛏️", en: "bed" }, { pic: "👒", en: "hat" }, { pic: "🚗", en: "car" }], answer: "👒" },
        { type: "listen", show: "🐝", say: "I can see a bee in a big green ...", quiet: true, prompt: "گوش کن و شعر را تمام کن. کدام هم‌قافیه است؟",
          options: [{ pic: "🌳", en: "tree" }, { pic: "📦", en: "box" }, { pic: "🏠", en: "house" }], answer: "🌳" },
        { type: "pairs", prompt: "روی کارت‌ها بزن و گوش کن. هر دو کلمه‌ای را که آخرشان یک‌جور صدا می‌دهد جفت کن.",
          pairs: [[{ pic: "🐱", say: "cat" }, { pic: "👒", say: "hat" }], [{ pic: "🐭", say: "mouse" }, { pic: "🏠", say: "house" }],
            [{ pic: "🐐", say: "goat" }, { pic: "⛵", say: "boat" }], [{ pic: "⭐", say: "star" }, { pic: "🚗", say: "car" }]] },
        { type: "tip", text: "بازی «هم‌قافیه» را در راه یا سر سفره بازی کنید: شما بگویید cat و کودک یک کلمه بگوید که آخرش مثل آن است (hat، bat، mat). کلمه‌های ساختگی هم قبول است (zat)؛ مهم شنیدن صداست، نه معنی. به فارسی هم بازی کنید: «ماه، کاه، راه»." }
      ]
    },
    {
      id: "english-seed-21", subject: "english", level: "seed", emoji: "🧥", title: "لباس‌ها",
      steps: [
        /* Arman gets dressed to go out: each thing comes from the chair and goes on where the words say. */
        { type: "scene", prompt: "گوش کن و ببین چه می‌پوشد", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, chair: { art: "en-chair", at: [138, 88], s: 1.5 },
            kid: { art: "en-arman", at: [76, 88], s: 1.8 },
            sockL: { art: "🧦", at: [126, 74], s: 0.32 }, sockR: { art: "🧦", at: [132, 74], s: 0.32 },
            shoeL: { art: "👟", at: [132, 89], s: 0.4, flip: true }, shoeR: { art: "👟", at: [144, 89], s: 0.4 },
            coat: { art: "🧥", at: [138, 72], s: 0.9 }, hat: { art: "🧢", at: [148, 74], s: 0.55 }
          },
          scenes: [
            { caption: "Put on your socks!", key: 1900, hold: 4200, do: [arc("sockL", [126, 74], [72, 90], 300, 1300), arc("sockR", [132, 74], [80.5, 90], 500, 1300)] },
            { caption: "Put on your shoes!", key: 1900, hold: 4200, do: [arc("shoeL", [132, 89], [71.8, 89.6], 300, 1300), arc("shoeR", [144, 89], [81, 89.6], 500, 1300)] },
            { caption: "Put on your coat!", key: 1700, hold: 4200, do: [arc("coat", [138, 72], [76, 71.5], 300, 1400), { id: "coat", to: { s: 1.32 }, at: 300, dur: 1400 }] },
            { caption: "Put on your hat!", key: 1700, hold: 4200, do: [arc("hat", [148, 74], [77, 35], 300, 1400), { id: "hat", to: { s: 0.95 }, at: 300, dur: 1400 }] },
            { caption: "Goodbye!", key: 1200, hold: 4200, do: [].concat(wave("kid", "R", 0, 1800, true), talk("kid", 0, 900), face("kid", true, 0)) }
          ] },
        { type: "words", words: [{ pic: "👒", en: "hat" }, { pic: "👟", en: "shoes" }, { pic: "🧥", en: "coat" }, { pic: "👗", en: "dress" }, { pic: "👕", en: "T-shirt" }, { pic: "🧦", en: "socks" }] },
        { type: "listen", say: "Put on your hat!", prompt: "گوش کن. کدام را بپوشد؟",
          options: [{ pic: "🧦", en: "socks" }, { pic: "👒", en: "hat" }, { pic: "🧥", en: "coat" }], answer: "👒" },
        { type: "listen", say: "Put on your shoes!", quiet: true, prompt: "گوش کن. کدام را بپوشد؟",
          options: [{ pic: "👟", en: "shoes" }, { pic: "👕", en: "T-shirt" }, { pic: "👗", en: "dress" }], answer: "👟" },
        { type: "listen", say: "Put on your T-shirt!", quiet: true, prompt: "گوش کن. کدام را بپوشد؟",
          options: [{ pic: "🧥", en: "coat" }, { pic: "👒", en: "hat" }, { pic: "👕", en: "T-shirt" }], answer: "👕" },
        { type: "listen", say: "a dress", quiet: true, prompt: "گوش کن. کدام را بپوشد؟",
          options: [{ pic: "👗", en: "dress" }, { pic: "🧦", en: "socks" }, { pic: "👟", en: "shoes" }], answer: "👗" },
        { type: "listen", say: "Put on your coat!", quiet: true, prompt: "گوش کن. کدام را بپوشد؟",
          options: [{ pic: "👟", en: "shoes" }, { pic: "🧥", en: "coat" }, { pic: "👒", en: "hat" }], answer: "🧥" },
        { type: "tip", text: "صبح‌ها موقع لباس پوشیدن به انگلیسی بگویید: Put on your socks، Put on your shoes. هر بار به همان لباس اشاره کنید. وقتی کودک کلمه‌ها را شناخت، از او بپرسید Where are your shoes? تا کفش‌ها را بیاورد." }
      ]
    },
    {
      id: "english-seed-22", subject: "english", level: "seed", emoji: "👀", title: "صدای اول",
      steps: [
        { type: "listen", show: "☀️", say: "sss... sun", prompt: "sun با صدای «سسس» شروع می‌شود. کدام هم با «سسس» شروع می‌شود؟ روی تصویرها بزن و گوش کن.",
          options: [{ pic: "🐮", en: "cow" }, { pic: "🧦", en: "sock" }, { pic: "🍎", en: "apple" }], answer: "🧦" },
        { type: "listen", show: "🌙", say: "mmm... moon", prompt: "moon با صدای «ممم» شروع می‌شود. کدام هم با «ممم» شروع می‌شود؟",
          options: [{ pic: "🐭", en: "mouse" }, { pic: "🐶", en: "dog" }, { pic: "☀️", en: "sun" }], answer: "🐭" },
        { type: "listen", say: "I spy with my little eye something beginning with sss.", prompt: "بازی I spy: «چیزی می‌بینم که با «سسس» شروع می‌شود». کدام است؟",
          options: [{ pic: "🐶", en: "dog" }, { pic: "🐮", en: "cow" }, { pic: "🐍", en: "snake" }], answer: "🐍" },
        { type: "listen", say: "I spy with my little eye something beginning with mmm.", quiet: true, prompt: "بازی I spy: «چیزی می‌بینم که با «ممم» شروع می‌شود». کدام است؟",
          options: [{ pic: "🥛", en: "milk" }, { pic: "⭐", en: "star" }, { pic: "🐸", en: "frog" }], answer: "🥛" },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. چیزهایی که مثل sun با «سسس» شروع می‌شوند در سبد خورشید، و چیزهایی که مثل moon با «ممم» شروع می‌شوند در سبد ماه.",
          baskets: [{ pic: "☀️", value: "s" }, { pic: "🌙", value: "m" }],
          items: [{ pic: "🧦", say: "sock", basket: "s" }, { pic: "🐭", say: "mouse", basket: "m" }, { pic: "🐍", say: "snake", basket: "s" },
            { pic: "🥛", say: "milk", basket: "m" }, { pic: "⭐", say: "star", basket: "s" }, { pic: "🐵", say: "monkey", basket: "m" }] },
        { type: "tip", text: "بازی I spy را در خانه یا خیابان بازی کنید: بگویید I spy with my little eye something beginning with sss و فقط صدای اول را بگویید (سسس، نه «اِس»). کودک دنبال چیزی بگردد که اسم انگلیسی یا فارسی‌اش با همان صدا شروع می‌شود، مثل sun یا «سیب». شنیدن صدای اول، اولین قدم خواندن است." }
      ]
    },
    {
      id: "english-seed-23", subject: "english", level: "seed", emoji: "🏠", title: "خانه من",
      steps: [
        /* A house cut open: each room lights up as it is named; then the cat goes from room to room, and each time
           we ask where it is. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            house: { art: "en-house" }, hl: { art: "en-frame", at: [10, 32], o: 0 },
            cat: { art: "en-cat", at: [40, 82], s: 1.1 }, bath: { art: "en-bath-front" }, ask: { art: "en-ask", at: [72, 20], o: 0 }
          },
          scenes: [
            { caption: "The bedroom.", do: [{ id: "hl", to: { o: 1 }, dur: 500 }, { id: "hl", to: { s: 1.02 }, at: 500, dur: 1000, yoyo: true, times: 2 }] },
            { caption: "The kitchen.", do: [{ id: "hl", to: { x: 57 }, dur: 700 }, { id: "hl", to: { s: 1.02 }, at: 700, dur: 1000, yoyo: true, times: 2 }] },
            { caption: "The bathroom.", do: [{ id: "hl", to: { x: 104 }, dur: 700 }, { id: "hl", to: { s: 1.02 }, at: 700, dur: 1000, yoyo: true, times: 2 }] },
            { caption: "Where's the cat?", key: 1400, do: [].concat([{ id: "hl", to: { o: 0 }, dur: 400 }], pop("ask", 200),
              [{ id: "cat", to: { x: 70 }, at: 600, dur: 1800, ease: "linear" }, { id: "cat", to: { r: 4 }, at: 600, dur: 1800, yoyo: true, times: 6 }]) },
            { caption: "In the kitchen!", key: 1400, do: [{ id: "ask", to: { o: 0 }, dur: 300 }, { id: "hl", to: { x: 57, o: 1 }, dur: 500 },
              { id: "cat.tail", to: { r: -20 }, at: 600, dur: 1600, yoyo: true, times: 6 }] },
            { caption: "Where's the cat?", key: 1600, do: [].concat([{ id: "hl", to: { o: 0 }, dur: 400 }], pop("ask", 200),
              [{ id: "cat", to: { x: 104 }, at: 600, dur: 1600, ease: "linear" }, { id: "cat", to: { r: 4 }, at: 600, dur: 1600, yoyo: true, times: 6 }]) },
            { caption: "In the bathroom! In the bath!", key: 1500, do: [{ id: "ask", to: { o: 0 }, dur: 300 }, arc("cat", [104, 82], [123, 77], 0, 900, 14),
              { id: "hl", to: { x: 104, o: 1 }, at: 300, dur: 500 }, { id: "cat.tail", to: { r: -20 }, at: 900, dur: 1600, yoyo: true, times: 6 }] }
          ] },
        { type: "words", words: [{ pic: "🛏️", en: "bedroom" }, { pic: "🍳", en: "kitchen" }, { pic: "🛁", en: "bathroom" }, { pic: "🚪", en: "door" }, { pic: "🪟", en: "window" }, { pic: "🪑", en: "chair" }] },
        { type: "listen", say: "Where's the cat? In the kitchen.", prompt: "گوش کن. گربه در کدام اتاق است؟",
          options: [{ pic: "🛏️", en: "the bedroom" }, { pic: "🍳", en: "the kitchen" }, { pic: "🛁", en: "the bathroom" }], answer: "🍳" },
        { type: "listen", say: "Where's the cat? In the bedroom.", quiet: true, prompt: "گوش کن. گربه در کدام اتاق است؟",
          options: [{ pic: "🛁", en: "the bathroom" }, { pic: "🛏️", en: "the bedroom" }, { pic: "🍳", en: "the kitchen" }], answer: "🛏️" },
        { type: "listen", say: "window", prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "🚪", en: "door" }, { pic: "🪟", en: "window" }, { pic: "🪑", en: "chair" }], answer: "🪟" },
        { type: "listen", say: "door", quiet: true, prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "🚪", en: "door" }, { pic: "🛏️", en: "bed" }, { pic: "🪟", en: "window" }], answer: "🚪" },
        { type: "tip", text: "در خانه بازی «گربه کجاست؟» کنید: یک عروسک را در یکی از اتاق‌ها پنهان کنید و بپرسید Where's the teddy? کودک بگردد و بگوید In the kitchen یا فقط kitchen. وقتی وارد هر اتاق می‌شوید، اسم انگلیسی‌اش را بگویید و به در، پنجره و صندلی اشاره کنید: door، window، chair." }
      ]
    },
    {
      id: "english-seed-24", subject: "english", level: "seed", emoji: "😊", title: "حال من",
      steps: [
        /* Reza's face and body show each feeling, with what made it: a present, a dropped ice cream, his brother
           taking his ball, a long day, an empty plate, a balloon that pops. */
        { type: "scene", prompt: "گوش کن و ببین حالش چطور است. تو هم با صورتت نشان بده.", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            reza: { art: "en-reza", at: [70, 86], s: 1.6 }, gift: { art: "🎁", at: [96, 52], s: 0.6, o: 0 },
            ice: { art: "🍦", at: inHand("en-reza", [70, 86], 1.6, "R", "point", 0.75), s: 0.75, o: 0 },
            bro: { art: "en-brother", at: [180, 86], s: 1.3 }, ball: { art: "en-ball", at: [96, 86], s: 1.3, o: 0 }, plate: { art: "en-plate", at: [108, 86], s: 1.4, o: 0 },
            balloon: { art: "🎈", at: [104, 54], s: 0.8, o: 0 }
          },
          scenes: [
            { caption: "I'm happy!", key: 1650, do: [].concat([{ id: "gift", to: { o: 1 }, dur: 300 }, arc("gift", [96, 52], [70, 73], 300, 900, 6)],
              pose("reza", "R", "clapOpen", 300, 600), pose("reza", "L", "clapOpen", 300, 600), jump("reza", 1300, 2, 6)) },
            { caption: "I'm sad.", key: 2400, do: [].concat([{ id: "gift", to: { o: 0 }, dur: 300 }], pose("reza", "L", "down", 0, 400), pose("reza", "R", "point", 0, 400),
              [{ id: "ice", to: { o: 1 }, at: 300, dur: 300 }, { id: "ice", path: "M" + inHand("en-reza", [70, 86], 1.6, "R", "point", 0.75).join(" ") + "Q96 60 96 87", at: 1000, dur: 700, ease: "in" }, { id: "ice", to: { r: 80 }, at: 1000, dur: 700 }],
              face("reza", false, 1700), [{ id: "reza.head", to: { r: 8 }, at: 1700, dur: 600 }, { id: "reza.eyes", to: { y: 0.8 }, at: 1700, dur: 400 }], pose("reza", "R", "down", 1700, 500)) },
            { caption: "I'm angry!", key: 2250, do: [].concat([{ id: "ice", to: { o: 0 }, dur: 300 }, { id: "reza.head", to: { r: 0 }, dur: 300 }, { id: "reza.eyes", to: { y: 0 }, dur: 300 },
              { id: "ball", to: { o: 1 }, at: 300, dur: 300 }], walk("bro", 104, 600, 1400), walk("bro", 180, 2200, 1500),
              [arc("ball", [96, 86], [104, 72], 1900, 300, 4), { id: "ball", to: { x: 180 }, at: 2200, dur: 1500, ease: "linear" }, { id: "reza.brows", to: { o: 1 }, at: 2300, dur: 300 }],
              stamp("reza", 2600, 2)) },
            { caption: "I'm tired.", key: 1500, do: [].concat([{ id: "reza.brows", to: { o: 0 }, dur: 300 }], pose("reza", "R", "stretch", 300, 600), pose("reza", "L", "stretch", 300, 600),
              [{ id: "reza.mouth", to: { o: 1, sy: 1.5 }, at: 500, dur: 400 }, { id: "reza.mouth", to: { o: 0, sy: 1 }, at: 1900, dur: 300 },
                { id: "reza.shut", to: { o: 1 }, at: 500, dur: 300 }, { id: "reza.eyes", to: { o: 0 }, at: 500, dur: 300 }],
              pose("reza", "R", "down", 2200, 500), pose("reza", "L", "down", 2200, 500), [{ id: "reza.head", to: { r: -10 }, at: 2400, dur: 800 }]) },
            { caption: "I'm hungry.", key: 2200, do: [].concat([{ id: "reza.head", to: { r: 0 }, dur: 400 }, { id: "reza.shut", to: { o: 0 }, dur: 300 }, { id: "reza.eyes", to: { o: 1 }, dur: 300 },
              { id: "plate", to: { o: 1 }, at: 300, dur: 400 }], pose("reza", "R", [10, 100], 600, 600),
              [{ id: "reza.foreR", to: { r: "+20" }, at: 1300, dur: 1600, yoyo: true, times: 4 }, { id: "reza.eyes", to: { x: 0.8, y: 0.6 }, at: 700, dur: 300 },
                { id: "reza.mouth", to: { o: 1 }, at: 900, dur: 300 }]) },
            { caption: "I'm scared!", key: 1500, do: [].concat([{ id: "plate", to: { o: 0 }, dur: 300 }, { id: "reza.mouth", to: { o: 0 }, dur: 200 }, { id: "reza.eyes", to: { x: 0, y: 0 }, dur: 300 }],
              pose("reza", "R", "down", 0, 400), [{ id: "balloon", to: { o: 1 }, at: 300, dur: 300 }, { id: "balloon", to: { s: 1.1 }, at: 600, dur: 600 },
                { id: "balloon", to: { o: 0 }, at: 1200, dur: 60 }, { emit: "spark", where: [104, 44], spread: [16, 14], n: 10, at: 1200, dur: 200, life: 600 },
                { id: "reza", to: { y: "-5" }, at: 1250, dur: 400, yoyo: true, times: 2 },
                { id: "reza.mouth", to: { o: 1, sy: 1.3 }, at: 1250, dur: 200 }],
              face("reza", false, 1250), pose("reza", "R", "stop", 1250, 300), pose("reza", "L", "stop", 1250, 300),
              [{ id: "reza.head", to: { r: -6 }, at: 1700, dur: 1400, yoyo: true, times: 6 }]) },
            { caption: "Now I'm happy! How are you?", key: 1800, hold: 5000, do: [].concat([{ id: "reza.mouth", to: { o: 0, sy: 1 }, dur: 200 }],
              face("reza", true, 200), pose("reza", "R", "ask", 400, 500), pose("reza", "L", "down", 400, 500), talk("reza", 600, 2400)) }
          ] },
        { type: "words", words: [{ pic: "😊", en: "happy" }, { pic: "😢", en: "sad" }, { pic: "😠", en: "angry" }, { pic: "😴", en: "tired" }, { pic: "😋", en: "hungry" }, { pic: "😨", en: "scared" }] },
        { type: "listen", say: "I'm sad.", prompt: "گوش کن. حالش چطور است؟",
          options: [{ pic: "😊", en: "happy" }, { pic: "😢", en: "sad" }, { pic: "😠", en: "angry" }], answer: "😢" },
        { type: "listen", say: "I'm tired.", quiet: true, prompt: "گوش کن. حالش چطور است؟",
          options: [{ pic: "😴", en: "tired" }, { pic: "😨", en: "scared" }, { pic: "😋", en: "hungry" }], answer: "😴" },
        { type: "listen", say: "I'm happy!", quiet: true, prompt: "گوش کن. حالش چطور است؟",
          options: [{ pic: "😠", en: "angry" }, { pic: "😢", en: "sad" }, { pic: "😊", en: "happy" }], answer: "😊" },
        { type: "listen", say: "I'm hungry.", quiet: true, prompt: "گوش کن. حالش چطور است؟",
          options: [{ pic: "😋", en: "hungry" }, { pic: "😴", en: "tired" }, { pic: "😊", en: "happy" }], answer: "😋" },
        { type: "listen", say: "How are you?", prompt: "گوش کن. حال خودت چطور است؟ هر جوابی درست است؛ روی صورتی بزن که حال تو را نشان می‌دهد.",
          options: [{ pic: "😊", en: "I'm happy.", value: "any" }, { pic: "😴", en: "I'm tired.", value: "any" }, { pic: "😋", en: "I'm hungry.", value: "any" }], answer: "any" },
        { type: "tip", text: "روزی چند بار از کودک بپرسید How are you? و کمکش کنید با یکی از این کلمه‌ها جواب بدهد: I'm happy، I'm tired، I'm hungry. خودتان هم بگویید حالتان چطور است. هیچ حسی بد نیست؛ اگر گفت I'm sad یا I'm angry، به فارسی بپرسید چه شده و کنارش بمانید." }
      ]
    },
    {
      id: "english-seed-25", subject: "english", level: "seed", emoji: "🐈", title: "قصه: گربه کجاست؟",
      steps: [
        /* Sara looks for her cat: in the box (she looks in, it is empty), under the bed (she bends down and looks),
           on the chair; it is in the basket, and pops out. Then the child points to it. */
        { type: "scene", prompt: "به قصه گوش کن. تو هم با سارا بگو: No!", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            boxB: { art: "en-box-back", at: [22, 86], s: 1.1 }, boxF: { art: "en-box-front", at: [22, 86], s: 1.1 },
            bed: { art: "en-bed", at: [72, 84], s: 0.95 }, chair: { art: "en-chair", at: [112, 88], s: 1.2 },
            cat: { art: "en-cat", at: [144, 90], s: 1.1, o: 0 }, basket: { art: "🧺", at: [144, 89], s: 0.95 },
            sara: { art: "en-sara", at: [80, 88], s: 1.15 }, ask: { art: "en-ask", at: [88, 50], o: 0 }
          },
          scenes: [
            { caption: "Where's my cat?", key: 1300, do: [].concat(pose("sara", "R", "ask", 0, 500), pose("sara", "L", "ask", 0, 500), talk("sara", 0, 1300), pop("ask", 400),
              [{ id: "sara.eyes", to: { x: -0.7 }, at: 600, dur: 300 }, { id: "sara.eyes", to: { x: 0.7 }, at: 1200, dur: 300 }]) },
            { caption: "Is it in the box? No!", key: 2500, hold: 4600, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400), pose("sara", "L", "down", 0, 400),
              walk("sara", 42, 200, 1300), [{ id: "sara.eyes", to: { x: -0.8, y: 0.8 }, at: 1500, dur: 300 }, { id: "sara.head", to: { r: -12 }, at: 1500, dur: 400 },
                { id: "boxF", to: { r: 4 }, at: 1700, dur: 600, yoyo: true, times: 4 }, { id: "boxB", to: { r: 4 }, at: 1700, dur: 600, yoyo: true, times: 4 },
                { id: "sara.head", to: { r: 0 }, at: 2500, dur: 300 }], shake("sara", 2900), talk("sara", 2900, 900)) },
            { caption: "Is it under the bed? No!", key: 2600, hold: 4600, do: [].concat([{ id: "sara.eyes", to: { x: 0, y: 0 }, dur: 300 }], walk("sara", 82, 200, 1300),
              sit("sara", 1500, 10, 0.3), [{ id: "sara.eyes", to: { y: 1 }, at: 1700, dur: 300 }, { id: "sara.head", to: { r: 14 }, at: 1700, dur: 400 },
                { id: "sara.head", to: { r: 0 }, at: 2700, dur: 300 }, { id: "sara.eyes", to: { y: 0 }, at: 2700, dur: 300 }],
              stand("sara", 2900, 10), shake("sara", 3300), talk("sara", 3300, 900)) },
            { caption: "Is it on the chair? No!", key: 1900, hold: 4400, do: [].concat(walk("sara", 98, 200, 1000),
              [{ id: "sara.eyes", to: { x: 0.8 }, at: 1200, dur: 300 }], pose("sara", "R", "point", 1300, 400), shake("sara", 2400), talk("sara", 2400, 900),
              pose("sara", "R", "down", 3000, 400)) },
            { caption: "Is it in the basket?", key: 1900, do: [].concat(walk("sara", 122, 200, 1200), pose("sara", "R", "point", 1400, 400), talk("sara", 1400, 1200),
              [{ id: "basket", to: { r: 6 }, at: 1700, dur: 1000, yoyo: true, times: 4 }]) },
            { caption: "Yes! Here it is! Meow!", key: 1500, do: [].concat(pose("sara", "R", "down", 0, 400), [
              { id: "cat", to: { o: 1 }, at: 200, dur: 100 }, { id: "cat", to: { y: 79 }, at: 200, dur: 600, ease: "back" }, { id: "cat.jaw", to: { r: 35 }, at: 900, dur: 300 }, { id: "cat.jaw", to: { r: 0 }, at: 1700, dur: 300 }],
              face("sara", true, 800), jump("sara", 900, 2, 6), pose("sara", "R", "clapOpen", 900, 400), pose("sara", "L", "clapOpen", 900, 400)) },
            { caption: "Where's the cat?", hold: 1500, do: [].concat(pose("sara", "R", "point", 0, 500), pose("sara", "L", "down", 0, 400)),
              wait: { tap: ["cat"], hint: "گربه کجاست؟ روی گربه بزن.", each: [{ id: "$", to: { y: "-4" }, dur: 400, yoyo: true, times: 2 }, { id: "cat.tail", to: { r: -25 }, dur: 800, yoyo: true, times: 4 }] } }
          ],
          question: "گربه کجا بود؟", options: ["📦", "🛏️", "🧺"], answer: "🧺" },
        { type: "listen", say: "Is it in the box?", prompt: "در قصه، گربه توی جعبه بود؟ روی جواب‌ها بزن و گوش کن.",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "no" },
        { type: "listen", say: "Is it under the bed?", prompt: "در قصه، گربه زیر تخت بود؟",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "no" },
        { type: "listen", say: "Is it in the basket?", prompt: "در قصه، گربه توی سبد بود؟",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "yes" },
        { type: "tip", text: "قصه را با هم دوباره ببینید و هر بار که سارا می‌پرسد، کودک با او بگوید No! بعد خودتان قصه را با یک عروسک بازی کنید: آن را جایی پنهان کنید و بپرسید Is it in the box? Is it under the bed? تا کودک جواب بدهد No یا Yes و پیدایش کند." }
      ]
    },
    {
      id: "english-seed-26", subject: "english", level: "seed", emoji: "🎲", title: "بازی اسباب‌بازی و لباس",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. اسباب‌بازی‌ها را در یک سبد و لباس‌ها را در سبد دیگر بگذار.",
          baskets: [{ pic: "🧸", value: "toy" }, { pic: "👕", value: "clothes" }],
          items: [{ pic: "⚽", say: "ball", basket: "toy" }, { pic: "👒", say: "hat", basket: "clothes" }, { pic: "🚗", say: "car", basket: "toy" },
            { pic: "🧦", say: "socks", basket: "clothes" }, { pic: "🪁", say: "kite", basket: "toy" }, { pic: "👟", say: "shoes", basket: "clothes" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🚂", say: "train" }, { pic: "🚂", say: "train" }], [{ pic: "🧸", say: "teddy" }, { pic: "🧸", say: "teddy" }],
            [{ pic: "🪆", say: "doll" }, { pic: "🪆", say: "doll" }], [{ pic: "🪁", say: "kite" }, { pic: "🪁", say: "kite" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. چیزهای خانه را در سبد خانه و اسباب‌بازی‌ها را در سبد اسباب‌بازی بگذار.",
          baskets: [{ pic: "🏠", value: "home" }, { pic: "🧸", value: "toy" }],
          items: [{ pic: "🚪", say: "door", basket: "home" }, { pic: "🚂", say: "train", basket: "toy" }, { pic: "🪟", say: "window", basket: "home" },
            { pic: "⚽", say: "ball", basket: "toy" }, { pic: "🪑", say: "chair", basket: "home" }, { pic: "🛏️", say: "bed", basket: "home" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🧥", say: "coat" }, { pic: "🧥", say: "coat" }], [{ pic: "👗", say: "dress" }, { pic: "👗", say: "dress" }],
            [{ pic: "👕", say: "T-shirt" }, { pic: "👕", say: "T-shirt" }], [{ pic: "🧦", say: "socks" }, { pic: "🧦", say: "socks" }]] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🛏️", say: "bedroom" }, { pic: "🛏️", say: "bedroom" }], [{ pic: "🍳", say: "kitchen" }, { pic: "🍳", say: "kitchen" }],
            [{ pic: "🛁", say: "bathroom" }, { pic: "🛁", say: "bathroom" }], [{ pic: "🚪", say: "door" }, { pic: "🚪", say: "door" }]] },
        { type: "tip", text: "این بازی، کلمه‌های اسباب‌بازی، لباس و خانه را مرور می‌کند. در خانه هم بازی «جمع کن» کنید: بگویید Teddy, please! یا Socks, please! تا کودک همان را بیاورد و در جای خودش بگذارد. هر بار که آورد، بگویید Thank you!" }
      ]
    },
    {
      id: "english-seed-27", subject: "english", level: "seed", emoji: "🤖", title: "حرف زدن رباتی",
      steps: [
        { type: "listen", show: "🤖", say: "kuh... ah... tuh", prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "🐱", en: "cat" }, { pic: "🐶", en: "dog" }, { pic: "☀️", en: "sun" }], answer: "🐱" },
        { type: "listen", show: "🤖", say: "sss... uh... nnn", quiet: true, prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "🐟", en: "fish" }, { pic: "☀️", en: "sun" }, { pic: "🐱", en: "cat" }], answer: "☀️" },
        { type: "listen", show: "🤖", say: "duh... oh... guh", quiet: true, prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "🐶", en: "dog" }, { pic: "🦆", en: "duck" }, { pic: "🚗", en: "car" }], answer: "🐶" },
        { type: "listen", show: "🤖", say: "rrr... eh... duh", quiet: true, prompt: "ربات یک رنگ را صدا به صدا می‌گوید. کدام رنگ است؟",
          options: [{ color: BLUE, value: "blue", en: "blue" }, { color: RED, value: "red", en: "red" }, { color: GREEN, value: "green", en: "green" }], answer: "red" },
        { type: "listen", show: "🤖", say: "buh... uh... sss", quiet: true, prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "🚂", en: "train" }, { pic: "⚽", en: "ball" }, { pic: "🚌", en: "bus" }], answer: "🚌" },
        { type: "listen", show: "🤖", say: "huh... ah... tuh", quiet: true, prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "👒", en: "hat" }, { pic: "🐱", en: "cat" }, { pic: "🧦", en: "socks" }], answer: "👒" },
        { type: "listen", show: "🤖", say: "puh... eh... nnn", quiet: true, prompt: "ربات کلمه را صدا به صدا می‌گوید. گوش کن، صداها را پشت سر هم و تند بگو. کدام تصویر است؟",
          options: [{ pic: "✏️", en: "pencil" }, { pic: "🖊️", en: "pen" }, { pic: "📖", en: "book" }], answer: "🖊️" },
        { type: "tip", text: "بازی «ربات» را در خانه بازی کنید: مثل ربات، کلمه‌ای را صدا به صدا و آرام بگویید (c… a… t) و کودک کلمه را پیدا کند یا آن را بگوید: cat! با کلمه‌های فارسی هم بازی کنید: «د… س… ت» یعنی «دست». این همان مهارتی است که بعداً برای خواندن لازم دارد. صداها را کوتاه بگویید، نه با اسم حرف." }
      ]
    },
    {
      id: "english-seed-28", subject: "english", level: "seed", emoji: "🌦️", title: "هوا",
      steps: [
        /* One day in the park, the weather changes: the sun shines (Sara shades her eyes), clouds cover it, it rains
           (she opens her umbrella), the wind blows the clouds and leaves away and bends the tree, then snow falls and
           covers the grass. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, dim: { art: "en-dim", o: 0 }, sun: { art: "☀️", at: [128, 26], s: 0.9 },
            c1: { art: "☁️", at: [-30, 30], s: 2.4 }, c2: { art: "☁️", at: [-70, 26], s: 2 }, c3: { art: "☁️", at: [-110, 32], s: 2.2 },
            tree: { art: "en-tree", at: [34, 88], s: 0.75 }, snow: { art: "en-snow-ground", o: 0 },
            l1: { art: "🍃", at: [-10, 40], s: 0.4 }, l2: { art: "🍃", at: [-20, 56], s: 0.35 },
            sara: { art: "en-sara", at: [86, 86], s: 1.3 }, brolly: { art: "☂️", at: inHand("en-sara", [86, 86], 1.3, "R", "hold", 0) , s: 1.2, o: 0 },
            f1: { art: "❄️", at: [20, -8], s: 0.5 }, f2: { art: "❄️", at: [48, -14], s: 0.42 }, f3: { art: "❄️", at: [76, -6], s: 0.5 },
            f4: { art: "❄️", at: [104, -16], s: 0.42 }, f5: { art: "❄️", at: [130, -10], s: 0.5 }, f6: { art: "❄️", at: [150, -4], s: 0.42 },
            ask: { art: "en-ask", at: [96, 46], o: 0 }
          },
          scenes: [
            { caption: "It's sunny.", key: 1600, do: [].concat([{ id: "sun", to: { s: 1.05, r: 20 }, dur: 1600, yoyo: true, times: 2 }], pose("sara", "R", "shade", 300, 600), face("sara", true, 300),
              [{ id: "sara.eyes", to: { x: 0.6, y: -0.5 }, at: 300, dur: 300 }]) },
            { caption: "It's cloudy.", key: 2000, do: [].concat(pose("sara", "R", "down", 0, 400), [{ id: "sara.eyes", to: { x: 0, y: 0 }, dur: 300 },
              { id: "c1", to: { x: 126 }, at: 200, dur: 1800 }, { id: "c2", to: { x: 92 }, at: 400, dur: 1800 }, { id: "c3", to: { x: 56 }, at: 600, dur: 1800 }, { id: "sun", to: { o: 0.25 }, at: 1200, dur: 800 },
              { id: "dim", to: { o: 0.7 }, at: 800, dur: 1200 }]) },
            { caption: "It's rainy.", key: 2200, do: [].concat([{ id: "dim", to: { o: 1 }, dur: 600 }, { emit: "drop", where: [92, 34], spread: [110, 6], rise: -50, n: 70, at: 200, dur: 3000, life: 1100 }],
              pose("sara", "R", "hold", 900, 500), [{ id: "brolly", to: { o: 1 }, at: 1300, dur: 300 }, { id: "brolly", to: { s: 1.2 }, at: 1300, dur: 1 }]) },
            { caption: "It's windy.", key: 1700, do: [].concat([{ id: "brolly", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 200, 400), [
              { id: "c1", to: { x: 240 }, at: 300, dur: 1800, ease: "in" }, { id: "c2", to: { x: 230 }, at: 300, dur: 1800, ease: "in" }, { id: "c3", to: { x: 220 }, at: 300, dur: 2000, ease: "in" }, { id: "dim", to: { o: 0 }, at: 600, dur: 1400 },
              { id: "sun", to: { o: 1 }, at: 1200, dur: 800 }, { id: "tree", to: { r: 7 }, at: 300, dur: 2800, yoyo: true, times: 6 },
              { id: "l1", path: "M-10 40Q60 20 120 44T200 30", at: 300, dur: 2200 }, { id: "l1", to: { r: 360 }, at: 300, dur: 2200 },
              { id: "l2", path: "M-20 56Q50 40 110 60T200 48", at: 700, dur: 2200 }, { id: "l2", to: { r: -360 }, at: 700, dur: 2200 },
              { id: "sara.head", to: { r: 8 }, at: 300, dur: 2800, yoyo: true, times: 6 }]) },
            { caption: "It's snowy.", key: 2900, hold: 4400, do: [].concat([{ id: "sun", to: { o: 0 }, dur: 600 }, { id: "dim", to: { o: 0.5 }, dur: 800 }, { id: "snow", to: { o: 1 }, at: 1400, dur: 1800 }],
              ["f1", "f2", "f3", "f4", "f5", "f6"].map(function (f, i) {
                return { id: f, to: { y: "+" + (66 + (i % 3) * 6), r: 180 }, at: 200 + i * 200, dur: 2800, ease: "linear" };
              }), pose("sara", "R", "big", 600, 500), pose("sara", "L", "big", 600, 500), [{ id: "sara.eyes", to: { y: -0.6 }, at: 600, dur: 300 }]) },
            { caption: "What's the weather like today?", key: 1500, hold: 6000, do: [].concat(pose("sara", "R", "ask", 0, 500), pose("sara", "L", "down", 0, 500),
              [{ id: "sara.eyes", to: { y: 0 }, dur: 300 }], talk("sara", 200, 2000), pop("ask", 600)) }
          ] },
        { type: "words", words: [{ pic: "☀️", en: "sunny" }, { pic: "☁️", en: "cloudy" }, { pic: "🌧️", en: "rainy" }, { pic: "💨", en: "windy" }, { pic: "❄️", en: "snowy" }] },
        { type: "listen", say: "It's rainy.", prompt: "گوش کن. هوا چطور است؟",
          options: [{ pic: "☀️", en: "sunny" }, { pic: "🌧️", en: "rainy" }, { pic: "❄️", en: "snowy" }], answer: "🌧️" },
        { type: "listen", say: "It's snowy.", quiet: true, prompt: "گوش کن. هوا چطور است؟",
          options: [{ pic: "❄️", en: "snowy" }, { pic: "💨", en: "windy" }, { pic: "☁️", en: "cloudy" }], answer: "❄️" },
        { type: "listen", say: "It's windy.", quiet: true, prompt: "گوش کن. هوا چطور است؟",
          options: [{ pic: "🌧️", en: "rainy" }, { pic: "☀️", en: "sunny" }, { pic: "💨", en: "windy" }], answer: "💨" },
        { type: "listen", say: "What's the weather like? It's sunny.", quiet: true, prompt: "گوش کن. هوا چطور است؟",
          options: [{ pic: "☁️", en: "cloudy" }, { pic: "☀️", en: "sunny" }, { pic: "🌧️", en: "rainy" }], answer: "☀️" },
        { type: "tip", text: "هر صبح با هم از پنجره بیرون را نگاه کنید و بپرسید What's the weather like? کودک جواب بدهد It's sunny یا فقط sunny. می‌توانید یک «تقویم هوا» روی کاغذ بکشید و هر روز یک خورشید، ابر یا قطره باران در آن بکشید." }
      ]
    },
    {
      id: "english-seed-29", subject: "english", level: "seed", emoji: "🔺", title: "شکل‌ها و اندازه‌ها",
      steps: [
        { type: "words", words: [{ pic: "🔵", en: "circle" }, { pic: "🟥", en: "square" }, { pic: "🔺", en: "triangle" }, { pic: "⭐", en: "star" }] },
        { type: "words", words: [{ pic: "⚽", scale: 1.5, en: "big" }, { pic: "⚽", scale: 0.6, en: "small" }, { pic: "🥖", scale: [1.6, 1], en: "long" }, { pic: "🥖", scale: [0.6, 1], en: "short" }] },
        { type: "listen", say: "triangle", prompt: "گوش کن و شکلش را پیدا کن",
          options: [{ pic: "🔵", en: "circle" }, { pic: "🔺", en: "triangle" }, { pic: "🟥", en: "square" }], answer: "🔺" },
        { type: "listen", say: "a star", quiet: true, prompt: "گوش کن و شکلش را پیدا کن",
          options: [{ pic: "🟥", en: "square" }, { pic: "🔵", en: "circle" }, { pic: "⭐", en: "star" }], answer: "⭐" },
        { type: "listen", say: "a big apple", prompt: "گوش کن. کدام است؟",
          options: [{ pic: "🍎", scale: 0.6, value: "small", en: "a small apple" }, { pic: "🍎", scale: 1.5, value: "big", en: "a big apple" }], answer: "big" },
        { type: "listen", say: "a small dog", quiet: true, prompt: "گوش کن. کدام است؟",
          options: [{ pic: "🐶", scale: 0.6, value: "small", en: "a small dog" }, { pic: "🐶", scale: 1.5, value: "big", en: "a big dog" }], answer: "small" },
        { type: "listen", say: "a long snake", quiet: true, prompt: "گوش کن. کدام است؟",
          options: [{ pic: "🐍", scale: [0.7, 1], value: "short", en: "a short snake" }, { pic: "🐍", scale: [1.7, 1], value: "long", en: "a long snake" }], answer: "long" },
        { type: "sort", prompt: "روی هر شکل بزن و گوش کن. دایره‌ها را در یک سبد و مربع‌ها را در سبد دیگر بگذار.",
          baskets: [{ pic: "⚪", value: "circle" }, { pic: "⬜", value: "square" }],
          items: [{ pic: "🔴", say: "a red circle", basket: "circle" }, { pic: "🟦", say: "a blue square", basket: "square" }, { pic: "🟡", say: "a yellow circle", basket: "circle" },
            { pic: "🟩", say: "a green square", basket: "square" }, { pic: "🟢", say: "a green circle", basket: "circle" }, { pic: "🟥", say: "a red square", basket: "square" }] },
        { type: "tip", text: "در خانه دنبال شکل‌ها بگردید: بشقاب circle است، پنجره square. وقتی دو چیز را کنار هم می‌گذارید، بگویید big و small (یک قاشق بزرگ و یک قاشق کوچک) یا long و short. کودک هم دنبال یک circle یا یک چیز big بگردد و بیاورد." }
      ]
    },
    {
      id: "english-seed-30", subject: "english", level: "seed", emoji: "🏃", title: "کارهایی که می‌کنم",
      steps: [
        /* In the park Reza runs, jumps, dances, sings and eats an apple; at the pool he swims and climbs out up
           the ladder. */
        { type: "scene", prompt: "گوش کن و تو هم بگو: I can …", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, reza: { art: "en-reza", at: [34, 86], s: 1.3 },
            n1: { art: "🎵", at: [134, 52], s: 0.75, o: 0 }, n2: { art: "🎶", at: [104, 48], s: 0.75, o: 0 },
            apple: { art: "🍎", at: inHand("en-reza", [120, 86], 1.3, "R", "hold", 0.5), s: 0.5, o: 0 }
          },
          scenes: [
            { caption: "I can run!", key: 1200, hold: 4200, do: run("reza", 120, 300, 1800) },
            { caption: "I can jump!", key: 625, hold: 4200, do: [].concat(jump("reza", 300, 3, 8), face("reza", true, 300)) },
            { caption: "I can dance!", key: 1500, hold: 4600, do: [].concat(pose("reza", "R", "stretch", 200, 400), pose("reza", "L", "big", 200, 400), [
              { id: "reza.armR", to: { r: -100 }, at: 700, dur: 3000, yoyo: true, times: 6 }, { id: "reza.armL", to: { r: 150 }, at: 700, dur: 3000, yoyo: true, times: 6 },
              { id: "reza", to: { r: 8 }, at: 700, dur: 3000, yoyo: true, times: 6 }, { id: "reza.legL", to: { sy: 0.75 }, at: 700, dur: 3000, yoyo: true, times: 6 }],
              pose("reza", "R", "down", 3800, 400), pose("reza", "L", "down", 3800, 400)) },
            { caption: "I can sing!", key: 2000, hold: 4400, do: [].concat(talk("reza", 200, 3200), pose("reza", "R", "chest", 200, 500), [
              { id: "n1", to: { o: 1 }, at: 500, dur: 300 }, { id: "n1", path: "M134 52Q144 40 140 22", at: 500, dur: 2400 }, { id: "n1", to: { o: 0 }, at: 2700, dur: 300 },
              { id: "n2", to: { o: 1 }, at: 1300, dur: 300 }, { id: "n2", path: "M104 48Q96 36 102 20", at: 1300, dur: 2400 }, { id: "n2", to: { o: 0 }, at: 3500, dur: 300 }],
              pose("reza", "R", "down", 3600, 400)) },
            { caption: "I can eat an apple!", key: 2400, hold: 4400, do: [].concat(pose("reza", "R", "hold", 0, 500), [{ id: "apple", to: { o: 1 }, at: 400, dur: 300 }],
              pose("reza", "R", "mouth", 1100, 600), [{ id: "apple", path: "M" + inHand("en-reza", [120, 86], 1.3, "R", "hold", 0.5).join(" ") + "L" + inHand("en-reza", [120, 86], 1.3, "R", "mouth", 0.5).join(" "), at: 1100, dur: 600 },
                { id: "reza.mouth", to: { o: 1 }, at: 1700, dur: 100 }, { id: "reza.mouth", to: { sy: 0.3 }, at: 1800, dur: 1600, yoyo: true, times: 6 },
                { id: "apple", to: { s: 0.25 }, at: 1800, dur: 1600 }, { id: "reza.mouth", to: { o: 0 }, at: 3400, dur: 100 }, { id: "apple", to: { o: 0 }, at: 3400, dur: 300 }],
              pose("reza", "R", "down", 3500, 400)) }
          ] },
        { type: "scene", prompt: "گوش کن و تو هم بگو: I can …", bg: "#cfeaf7",
          parts: {
            pool: { art: "en-pool" }, ladder: { art: "en-ladder", at: [134, 88], s: 0.95 }, reza: { art: "en-reza", at: [20, 91], s: 1.3 },
            water: { art: "en-water" }
          },
          scenes: [
            { caption: "I can swim!", key: 1400, hold: 4600, do: [].concat([{ id: "reza", to: { x: 134 }, at: 300, dur: 3600, ease: "linear" }],
              pose("reza", "R", "stretch", 0, 400), [
                { id: "reza.armR", to: { r: 0 }, at: 400, dur: 3200, yoyo: true, times: 6 }, { id: "reza.armL", to: { r: 150 }, at: 400, dur: 3200, yoyo: true, times: 6 }],
              pose("reza", "R", "down", 3700, 300), pose("reza", "L", "down", 3700, 300)) },
            { caption: "I can climb!", key: 1500, hold: 5000, do: [0, 1, 2, 3].map(function (k) {
              return { id: "reza", to: { y: "-" + (k < 3 ? 9 : 12) }, at: 200 + k * 800, dur: 600 };
            }).concat([0, 1, 2, 3].map(function (k) {
              return { id: "reza.arm" + (k % 2 ? "L" : "R"), to: { r: k % 2 ? 150 : -150 }, at: 200 + k * 800, dur: 400 };
            }), [0, 1, 2, 3].map(function (k) {
              return { id: "reza.arm" + (k % 2 ? "L" : "R"), to: { r: 0 }, at: 650 + k * 800, dur: 300 };
            }), [{ id: "reza.legL", to: { sy: 0.7 }, at: 200, dur: 3200, yoyo: true, times: 8 }], face("reza", true, 3300)) }
          ] },
        { type: "words", words: [{ pic: "🏃", en: "run" }, { pic: "🤸", en: "jump" }, { pic: "🏊", en: "swim" }, { pic: "🧗", en: "climb" },
          { pic: "🎵", en: "sing" }, { pic: "💃", en: "dance" }, { pic: "🍽️", en: "eat" }, { pic: "😴", en: "sleep" }] },
        { type: "listen", say: "I can swim!", prompt: "گوش کن. چه کاری می‌تواند بکند؟",
          options: [{ pic: "🏃", en: "run" }, { pic: "🏊", en: "swim" }, { pic: "😴", en: "sleep" }], answer: "🏊" },
        { type: "listen", say: "I can sleep.", quiet: true, prompt: "گوش کن. چه کاری می‌تواند بکند؟",
          options: [{ pic: "😴", en: "sleep" }, { pic: "🎵", en: "sing" }, { pic: "🧗", en: "climb" }], answer: "😴" },
        { type: "listen", say: "I can dance!", quiet: true, prompt: "گوش کن. چه کاری می‌تواند بکند؟",
          options: [{ pic: "🍽️", en: "eat" }, { pic: "🤸", en: "jump" }, { pic: "💃", en: "dance" }], answer: "💃" },
        { type: "doit", pic: "🤸", text: "حالا تو! بزرگ‌ترت می‌گوید و تو انجام می‌دهی. بعد بلند بگو: I can jump!",
          say: "حالا تو! بزرگ‌ترت می‌گوید و تو انجام می‌دهی.", list: ["Jump!", "Run!", "Dance!", "Sing!"] },
        { type: "tip", text: "در طول روز وقتی کودک کاری می‌کند، به انگلیسی بگویید: You can run! You can jump! و از او بخواهید بگوید I can run! بازی «حرکت کن و بگو» هم خوب است: شما بگویید Dance! و کودک برقصد و بگوید I can dance!" }
      ]
    },
    {
      id: "english-seed-31", subject: "english", level: "seed", emoji: "🧺", title: "بازی صدای اول",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد چیزی بگذار که صدای اولشان یکی است: sun «سسس» یا moon «ممم».",
          baskets: [{ pic: "☀️", value: "s" }, { pic: "🌙", value: "m" }],
          items: [{ pic: "🐭", say: "mouse", basket: "m" }, { pic: "🧦", say: "sock", basket: "s" }, { pic: "🥛", say: "milk", basket: "m" },
            { pic: "🐍", say: "snake", basket: "s" }, { pic: "🗺️", say: "map", basket: "m" }, { pic: "⭐", say: "star", basket: "s" }] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد چیزی بگذار که صدای اولشان یکی است: tiger «ت» یا ball «ب».",
          baskets: [{ pic: "🐯", value: "t" }, { pic: "⚽", value: "b" }],
          items: [{ pic: "🚌", say: "bus", basket: "b" }, { pic: "🧸", say: "teddy", basket: "t" }, { pic: "🐦", say: "bird", basket: "b" },
            { pic: "🚂", say: "train", basket: "t" }, { pic: "🍌", say: "banana", basket: "b" }, { pic: "🍅", say: "tomato", basket: "t" }] },
        { type: "pairs", prompt: "روی کارت‌ها بزن و گوش کن. هر دو چیزی را که صدای اولشان یکی است جفت کن.",
          pairs: [[{ pic: "☀️", say: "sun" }, { pic: "🧦", say: "sock" }], [{ pic: "🌙", say: "moon" }, { pic: "🐭", say: "mouse" }],
            [{ pic: "🐯", say: "tiger" }, { pic: "🚂", say: "train" }], [{ pic: "⚽", say: "ball" }, { pic: "🚌", say: "bus" }]] },
        { type: "sort", prompt: "حالا چهار سبد! روی هر تصویر بزن، گوش کن و آن را در سبد درست بگذار.",
          baskets: [{ pic: "☀️", value: "s" }, { pic: "🌙", value: "m" }, { pic: "🐯", value: "t" }, { pic: "⚽", value: "b" }],
          items: [{ pic: "🐍", say: "snake", basket: "s" }, { pic: "🥛", say: "milk", basket: "m" }, { pic: "🌳", say: "tree", basket: "t" },
            { pic: "🛏️", say: "bed", basket: "b" }, { pic: "🧦", say: "sock", basket: "s" }, { pic: "🐭", say: "mouse", basket: "m" },
            { pic: "🧸", say: "teddy", basket: "t" }, { pic: "🐦", say: "bird", basket: "b" }] },
        { type: "tip", text: "بازی «سبد صداها» را در خانه هم بازی کنید: دو کاسه بگذارید، یکی برای «سسس» و یکی برای «ممم»، و چیزهای کوچک خانه را (یا نقاشی‌شان را) در کاسه درست بگذارید. اسم فارسی هم قبول است: «سیب» در کاسه «سسس». مهم شنیدن صدای اول است." }
      ]
    },
    {
      id: "english-seed-32", subject: "english", level: "seed", emoji: "📚", title: "کلاس من",
      steps: [
        /* In class the teacher says what to do, and Arman does it at his desk: he opens his book, shows a pencil,
           then a crayon, closes his book and puts it in his bag. */
        { type: "scene", prompt: "گوش کن و ببین چه می‌کند. تو هم انجام بده.", bg: "#f3ead8",
          parts: {
            room: { art: "en-classroom" }, teacher: { art: "en-teacher", at: [24, 86] }, kid: { art: "en-arman", at: [108, 84], s: 1.35 },
            book: { art: "en-book", at: [84, 67.6], s: 1.1 }, desk: { art: "en-desk", at: [100, 88], s: 1.2 },
            pencil: { art: "✏️", at: [101, 67.6], s: 0.7 }, crayon: { art: "🖍️", at: [114, 67.6], s: 0.7 },
            bag: { art: "en-bag", at: [146, 88], s: 1.4 }
          },
          scenes: [
            { caption: "Open your book!", key: 2000, hold: 4400, do: [].concat(pose("teacher", "R", "point", 0, 500), talk("teacher", 0, 1200), [
              { id: "book.left", to: { sx: 0 }, dur: 1 }, { id: "book.cover", to: { sx: 0 }, at: 1100, dur: 400 }, { id: "book.cover", to: { o: 0 }, at: 1500, dur: 1 },
              { id: "book.left", to: { o: 1 }, at: 1500, dur: 1 }, { id: "book.left", to: { sx: 1 }, at: 1500, dur: 400 }], pose("kid", "L", [30, 40], 900, 500), pose("kid", "L", "down", 2000, 400)) },
            { caption: "Show me a pencil!", key: 2300, hold: 4400, do: [].concat(talk("teacher", 0, 1200), pose("kid", "R", "hold", 1000, 600),
              [arc("pencil", [101, 67.6], inHand("en-arman", [108, 84], 1.35, "R", "hold", 0.7), 1000, 700, 4)]) },
            { caption: "Show me a crayon!", key: 2300, hold: 4400, do: [].concat(talk("teacher", 0, 1200),
              [arc("pencil", inHand("en-arman", [108, 84], 1.35, "R", "hold", 0.7), [101, 67.6], 700, 600, 2)], pose("kid", "R", "down", 700, 600),
              pose("kid", "L", "hold", 1100, 600), [arc("crayon", [114, 67.6], inHand("en-arman", [108, 84], 1.35, "L", "hold", 0.7), 1100, 700, 4)]) },
            { caption: "Close your book!", key: 2200, hold: 4400, do: [].concat(talk("teacher", 0, 1200),
              [arc("crayon", inHand("en-arman", [108, 84], 1.35, "L", "hold", 0.7), [114, 67.6], 700, 600, 2)], pose("kid", "L", [30, 40], 700, 500), [
                { id: "book.left", to: { sx: 0 }, at: 1300, dur: 400 }, { id: "book.left", to: { o: 0 }, at: 1700, dur: 1 },
                { id: "book.cover", to: { o: 1 }, at: 1700, dur: 1 }, { id: "book.cover", to: { sx: 1 }, at: 1700, dur: 400 }], pose("kid", "L", "down", 2300, 400)) },
            { caption: "Put your book in your bag!", key: 2200, hold: 4400, do: [].concat(talk("teacher", 0, 1600), pose("kid", "R", "point", 1000, 500),
              [arc("book", [84, 67.6], [146, 82], 1100, 1300, 16), { id: "book", to: { s: 0.7 }, at: 1100, dur: 1300 }, { id: "book", to: { o: 0 }, at: 2300, dur: 200 },
                { id: "bag", to: { s: 1.5 }, at: 2350, dur: 400, yoyo: true, times: 2 }], pose("kid", "R", "down", 2600, 400), pose("teacher", "R", "down", 2600, 400)) }
          ] },
        { type: "words", words: [{ pic: "📖", en: "book" }, { pic: "🖊️", en: "pen" }, { pic: "✏️", en: "pencil" }, { pic: "🎒", en: "bag" }, { pic: "🖍️", en: "crayon" }] },
        { type: "listen", say: "Show me a pencil.", prompt: "گوش کن. کدام را نشان بدهد؟",
          options: [{ pic: "🖊️", en: "pen" }, { pic: "✏️", en: "pencil" }, { pic: "📖", en: "book" }], answer: "✏️" },
        { type: "listen", say: "Show me a crayon.", quiet: true, prompt: "گوش کن. کدام را نشان بدهد؟",
          options: [{ pic: "🖍️", en: "crayon" }, { pic: "🎒", en: "bag" }, { pic: "✏️", en: "pencil" }], answer: "🖍️" },
        { type: "listen", say: "Open your book.", quiet: true, prompt: "گوش کن. کدام را باز کند؟",
          options: [{ pic: "🎒", en: "bag" }, { pic: "🖊️", en: "pen" }, { pic: "📖", en: "book" }], answer: "📖" },
        { type: "listen", say: "Show me a pen.", quiet: true, prompt: "گوش کن. کدام را نشان بدهد؟",
          options: [{ pic: "✏️", en: "pencil" }, { pic: "🖊️", en: "pen" }, { pic: "🖍️", en: "crayon" }], answer: "🖊️" },
        { type: "tip", text: "بازی «معلم» کنید: شما معلم باشید و بگویید Open your book!، Show me a pencil!، Put your pencil in your bag! و کودک انجام بدهد. بعد جایتان عوض شود و کودک معلم باشد. وسایل واقعی مدرسه یا خانه را به کار ببرید." }
      ]
    },
    {
      id: "english-seed-33", subject: "english", level: "seed", emoji: "🐻", title: "قصه: خرس گرسنه",
      steps: [
        /* A hungry bear asks Sara, then Grandma, for an apple; each gives one, and it eats it, its tummy getting
           bigger, until it is full. */
        { type: "scene", prompt: "به قصه گوش کن. هر بار که خرس می‌گوید I'm hungry، تو هم با او بگو.", bg: "#cfeaf7",
          parts: {
            garden: { art: "en-garden" }, sara: { art: "en-sara", at: [20, 86], s: 1.1 }, gran: { art: "en-grandma", at: [140, 86] },
            bear: { art: "en-bear", at: [-30, 86] },
            a1: { art: "🍎", at: inHand("en-sara", [20, 86], 1.1, "R", "point", 0.6), s: 0.6, o: 0 },
            a2: { art: "🍎", at: inHand("en-grandma", [140, 86], 1, "L", "point", 0.6), s: 0.6, o: 0 }
          },
          scenes: [
            { caption: "I'm hungry! An apple, please.", key: 3300, hold: 4600, do: [{ id: "bear", to: { x: 54 }, dur: 2000, ease: "linear" }, { id: "bear", to: { r: 5 }, dur: 2000, yoyo: true, times: 6 },
              { id: "bear.armR", to: { r: 25 }, at: 2100, dur: 400 }, { id: "bear.armR", to: { r: 10 }, at: 2500, dur: 800, yoyo: true, times: 2 }, { id: "bear.armR", to: { r: 0 }, at: 3400, dur: 300 },
              { id: "bear.mouth", to: { o: 1 }, at: 2100, dur: 100 }, { id: "bear.mouth", to: { sy: 0.4 }, at: 2200, dur: 2000, yoyo: true, times: 6 }, { id: "bear.mouth", to: { o: 0 }, at: 4200, dur: 100 },
              { id: "bear.armL", to: { r: 70 }, at: 3500, dur: 500 }] },
            { caption: "Here you are.", key: 1700, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1000), [{ id: "a1", to: { o: 1 }, at: 400, dur: 200 },
              arc("a1", inHand("en-sara", [20, 86], 1.1, "R", "point", 0.6), [35, 69], 900, 700, 6)]) },
            { caption: "Thank you! Yum!", key: 1600, do: [].concat(pose("sara", "R", "down", 0, 400), [{ id: "bear.armL", to: { r: 25 }, dur: 600 }, { id: "a1", path: "M35 69L54 65.4", dur: 600 },
              { id: "bear.mouth", to: { o: 1 }, at: 600, dur: 100 }, { id: "bear.mouth", to: { sy: 0.3 }, at: 700, dur: 1600, yoyo: true, times: 6 },
              { id: "a1", to: { s: 0.1 }, at: 700, dur: 1600 }, { id: "a1", to: { o: 0 }, at: 2200, dur: 100 }, { id: "bear.mouth", to: { o: 0 }, at: 2300, dur: 100 },
              { id: "bear.tummy", to: { s: 1.25 }, at: 1800, dur: 600 }, { id: "bear.armL", to: { r: 0 }, at: 2300, dur: 400 }]) },
            { caption: "I'm hungry! An apple, please.", key: 2700, hold: 4600, do: [{ id: "bear", to: { x: 108 }, dur: 1700, ease: "linear" }, { id: "bear", to: { r: 5 }, dur: 1700, yoyo: true, times: 4 },
              { id: "bear.mouth", to: { o: 1 }, at: 1800, dur: 100 }, { id: "bear.mouth", to: { sy: 0.4 }, at: 1900, dur: 2000, yoyo: true, times: 6 }, { id: "bear.mouth", to: { o: 0 }, at: 3900, dur: 100 },
              { id: "bear.armR", to: { r: -70 }, at: 2400, dur: 500 }] },
            { caption: "Here you are.", key: 1700, do: [].concat(pose("gran", "L", "point", 0, 500), talk("gran", 0, 1000), [{ id: "a2", to: { o: 1 }, at: 400, dur: 200 },
              arc("a2", inHand("en-grandma", [140, 86], 1, "L", "point", 0.6), [127, 69], 900, 700, 6)]) },
            { caption: "Thank you! Yum!", key: 1600, do: [].concat(pose("gran", "L", "down", 0, 400), [{ id: "bear.armR", to: { r: -25 }, dur: 600 }, { id: "a2", path: "M127 69L108 65.4", dur: 600 },
              { id: "bear.mouth", to: { o: 1 }, at: 600, dur: 100 }, { id: "bear.mouth", to: { sy: 0.3 }, at: 700, dur: 1600, yoyo: true, times: 6 },
              { id: "a2", to: { s: 0.1 }, at: 700, dur: 1600 }, { id: "a2", to: { o: 0 }, at: 2200, dur: 100 }, { id: "bear.mouth", to: { o: 0 }, at: 2300, dur: 100 },
              { id: "bear.tummy", to: { s: 1.5 }, at: 1800, dur: 600 }, { id: "bear.armR", to: { r: 0 }, at: 2300, dur: 400 }]) },
            { caption: "I'm full! Thank you!", key: 1500, hold: 4400, do: [{ id: "bear.armR", to: { r: 35 }, dur: 500 }, { id: "bear.armL", to: { r: -35 }, dur: 500 },
              { id: "bear.armR", to: { r: 25 }, at: 600, dur: 1800, yoyo: true, times: 6 }, { id: "bear.armL", to: { r: -25 }, at: 600, dur: 1800, yoyo: true, times: 6 },
              { id: "bear", to: { r: 4 }, at: 600, dur: 1800, yoyo: true, times: 4 }] }
          ],
          question: "خرس چند سیب خورد؟", options: ["🍎", "🍎🍎", "🍎🍎🍎"], answer: "🍎🍎" },
        { type: "listen", say: "I'm hungry!", prompt: "گوش کن. خرس چه گفت؟ حالش چطور بود؟",
          options: [{ pic: "😴", en: "tired" }, { pic: "😋", en: "hungry" }, { pic: "😢", en: "sad" }], answer: "😋" },
        { type: "listen", say: "An apple, please.", quiet: true, prompt: "گوش کن. خرس چه می‌خواست؟",
          options: [{ pic: "🍞", en: "bread" }, { pic: "🥛", en: "milk" }, { pic: "🍎", en: "an apple" }], answer: "🍎" },
        { type: "listen", say: "Who gave the bear an apple?", prompt: "گوش کن. چه کسی به خرس سیب داد؟ (دو جواب درست است؛ یکی را انتخاب کن.)",
          options: [{ pic: "👧", en: "Sara", value: "yes" }, { pic: "🐶", en: "a dog", value: "no" }, { pic: "👵", en: "Grandma", value: "yes" }], answer: "yes" },
        { type: "tip", text: "قصه را با هم بازی کنید: کودک خرس باشد و بگوید I'm hungry! An apple, please. و شما چیزی بدهید و بگویید Here you are. او هم بگوید Thank you! جمله تکراری قصه را هر بار با کودک بگویید؛ تکرار، جمله را در ذهنش می‌نشاند." }
      ]
    },
    {
      id: "english-seed-34", subject: "english", level: "seed", emoji: "✂️", title: "کلمه را تکه کن",
      steps: [
        { type: "listen", show: "🤖", say: "sss... uh... nnn", prompt: "ربات sun را صدا به صدا می‌گوید. گوش کن. چند صدا شنیدی؟",
          options: [{ dots: 2, en: "two" }, { dots: 3, en: "three" }, { dots: 4, en: "four" }], answer: 3 },
        { type: "clap", sounds: true, word: "sun", parts: ["sss", "uh", "nnn"], pic: "☀️", prompt: "مثل ربات، sun را صدا به صدا بگو. با هر صدا یک بار دست بزن." },
        { type: "clap", sounds: true, word: "cat", parts: ["kuh", "ah", "tuh"], pic: "🐱", prompt: "مثل ربات، cat را صدا به صدا بگو. با هر صدا یک بار دست بزن." },
        { type: "clap", sounds: true, word: "egg", parts: ["eh", "guh"], pic: "🥚", prompt: "مثل ربات، egg را صدا به صدا بگو. با هر صدا یک بار دست بزن." },
        { type: "clap", sounds: true, word: "dog", parts: ["duh", "oh", "guh"], pic: "🐶", prompt: "مثل ربات، dog را صدا به صدا بگو. با هر صدا یک بار دست بزن." },
        { type: "listen", show: "🤖", say: "buh... uh... sss", prompt: "ربات bus را صدا به صدا می‌گوید. چند صدا شنیدی؟",
          options: [{ dots: 3, en: "three" }, { dots: 2, en: "two" }, { dots: 4, en: "four" }], answer: 3 },
        { type: "listen", show: "🤖", say: "uh... puh", quiet: true, prompt: "ربات up را صدا به صدا می‌گوید. چند صدا شنیدی؟",
          options: [{ dots: 4, en: "four" }, { dots: 3, en: "three" }, { dots: 2, en: "two" }], answer: 2 },
        { type: "tip", text: "حالا نوبت کودک است که ربات باشد: یک چیز را نشان بدهید (مثل cup یا sun) و از او بخواهید آن را صدا به صدا بگوید و با هر صدا یک انگشت بالا بیاورد. با کلمه‌های فارسی هم بازی کنید: «سیب» = «س… ی… ب». این همان کاری است که بعداً برای نوشتن لازم دارد." }
      ]
    },
    {
      id: "english-seed-35", subject: "english", level: "seed", emoji: "🌳", title: "در پارک",
      steps: [
        /* Mina in the park points at each thing as it is named: the tree sways, a flower opens, the sun shines,
           she looks up at the sky, a bird flies to the tree, and she finds a bike. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, cloud: { art: "☁️", at: [20, 22], s: 1.4 }, sun: { art: "☀️", at: [136, 26], s: 0.9 },
            tree: { art: "en-tree", at: [40, 88], s: 0.8 }, flower: { art: "🌸", at: [104, 88], s: 0.1, o: 0 },
            bike: { art: "🚲", at: [138, 88], s: 1 }, bird: { art: "en-bird", at: [176, 10], s: 1.5, flip: true },
            mina: { art: "en-mina", at: [80, 86], s: 1.2 }
          },
          scenes: [
            { caption: "A tree!", key: 1300, do: [].concat(pose("mina", "L", "point", 0, 500), [{ id: "tree", to: { r: 4 }, at: 600, dur: 1800, yoyo: true, times: 4 }], talk("mina", 0, 700)) },
            { caption: "A flower!", key: 2000, do: [].concat(pose("mina", "L", "down", 0, 400), pose("mina", "R", [-50, -20], 300, 500),
              [{ id: "flower", to: { o: 1 }, at: 600, dur: 200 }, { id: "flower", to: { s: 0.95 }, at: 600, dur: 1200, ease: "back" }], talk("mina", 0, 800)) },
            { caption: "The sun!", key: 1500, do: [].concat(pose("mina", "R", "pointUp", 0, 500), [{ id: "sun", to: { s: 1.1, r: 30 }, at: 500, dur: 1600, yoyo: true, times: 2 },
              { emit: "spark", where: [136, 18], spread: [20, 14], n: 8, at: 600, dur: 1200, life: 800 }, { id: "mina.eyes", to: { x: 0.6, y: -0.6 }, at: 300, dur: 300 }], talk("mina", 0, 800)) },
            { caption: "The sky is blue!", key: 1600, do: [].concat(pose("mina", "R", "big", 0, 500), pose("mina", "L", "big", 0, 500),
              [{ id: "mina.eyes", to: { x: 0, y: -0.8 }, dur: 300 }, { id: "cloud", to: { x: 70 }, dur: 3000, ease: "linear" }], talk("mina", 0, 1200)) },
            { caption: "A bird!", key: 1900, do: [].concat(pose("mina", "R", "down", 0, 400), pose("mina", "L", "pointUp", 0, 500),
              [{ id: "mina.eyes", to: { x: -0.5, y: -0.6 }, dur: 300 }], fly("bird", "M176 10Q90 0 44 42", 0, 1800), [{ id: "bird.wing", to: { r: 0 }, at: 1900, dur: 200 }], talk("mina", 1800, 600)) },
            { caption: "A bike!", key: 1500, do: [].concat(pose("mina", "L", "down", 0, 400), walk("mina", 112, 200, 1000), pose("mina", "R", "point", 1300, 500),
              [{ id: "mina.eyes", to: { x: 0.7, y: 0 }, at: 1200, dur: 300 }, { id: "bike", to: { r: -4 }, at: 1700, dur: 800, yoyo: true, times: 4 }], talk("mina", 1300, 600)) }
          ] },
        { type: "words", words: [{ pic: "🌳", en: "tree" }, { pic: "🌸", en: "flower" }, { pic: "☀️", en: "sun" }, { color: "#9fd3f0", en: "sky" }, { pic: "🐦", en: "bird" }, { pic: "🚲", en: "bike" }] },
        { type: "listen", say: "a bike", prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "🚲", en: "bike" }, { pic: "🌳", en: "tree" }, { pic: "🐦", en: "bird" }], answer: "🚲" },
        { type: "listen", say: "a flower", quiet: true, prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "☀️", en: "sun" }, { pic: "🌸", en: "flower" }, { pic: "🚲", en: "bike" }], answer: "🌸" },
        { type: "listen", say: "a tree", quiet: true, prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "🐦", en: "bird" }, { pic: "🌸", en: "flower" }, { pic: "🌳", en: "tree" }], answer: "🌳" },
        { type: "listen", say: "I can see a bird.", quiet: true, prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "🐦", en: "bird" }, { pic: "☀️", en: "sun" }, { pic: "🚲", en: "bike" }], answer: "🐦" },
        { type: "tip", text: "در پارک یا کوچه بازی «نشان بده» کنید: بگویید Show me a tree! یا Where's a flower? و کودک نشان بدهد. بعد کودک اشاره کند و اسم انگلیسی را بگوید: A bird! The sun! اگر کلمه‌ای را نمی‌دانید، فقط همین کلمه‌های درس را بازی کنید." }
      ]
    },
    {
      id: "english-seed-36", subject: "english", level: "seed", emoji: "❓", title: "این چیست؟",
      steps: [
        /* Reza takes things out of a box and Sara asks what they are: a ball, a teddy (not a cat), and then a real
           cat jumps out. Yes is a nod, no is a shake of the head. */
        { type: "scene", prompt: "گوش کن و تو هم جواب بده", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            sara: { art: "en-sara", at: [30, 86], s: 1.15 }, reza: { art: "en-reza", at: [130, 86], s: 1.15 },
            boxB: { art: "en-box-back", at: [80, 86], s: 1.2 },
            ball: { art: "en-ball", at: [80, 76], s: 1.5, o: 0 }, teddy: { art: "🧸", at: [80, 76], s: 0.9, o: 0 }, cat: { art: "en-cat", at: [80, 86], s: 1.3, o: 0 },
            boxF: { art: "en-box-front", at: [80, 86], s: 1.2 }, ask: { art: "en-ask", at: [40, 50], o: 0 }
          },
          scenes: [
            { caption: "What's this?", key: 2000, do: [].concat(pose("reza", "L", "hold", 0, 600), [{ id: "ball", to: { o: 1 }, at: 200, dur: 100 },
              arc("ball", [80, 76], handAt("en-reza", [130, 86], 1.15, "L", "hold").map(function (v, i) { return i ? +(v + 4.5).toFixed(1) : v; }), 200, 900, 10)],
              pose("sara", "R", "ask", 800, 500), talk("sara", 800, 1000), pop("ask", 1100)) },
            { caption: "It's a ball!", key: 1000, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400), talk("reza", 0, 1100),
              [{ id: "ball", to: { y: "-3" }, at: 300, dur: 800, yoyo: true, times: 2 }]) },
            { caption: "What's this? Is it a cat?", key: 2600, hold: 4000, do: [].concat([{ id: "ball", to: { o: 0 }, dur: 300 }, { id: "teddy", to: { o: 1 }, at: 200, dur: 100 },
              arc("teddy", [80, 76], inHand("en-reza", [130, 86], 1.15, "L", "hold", 0.9), 200, 900, 10)],
              pose("sara", "R", "ask", 1100, 500), talk("sara", 1100, 1800), pop("ask", 1400)) },
            { caption: "No! It's a teddy.", key: 900, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400), shake("reza", 0), talk("reza", 0, 1500), face("reza", true, 0)) },
            { caption: "Is it a cat?", key: 1600, do: [].concat([{ id: "teddy", to: { o: 0 }, dur: 300 }], pose("reza", "L", "down", 0, 500), pose("sara", "R", "point", 300, 500), talk("sara", 300, 900), [
              { id: "boxF", to: { r: 5 }, at: 600, dur: 1200, yoyo: true, times: 4 }, { id: "boxB", to: { r: 5 }, at: 600, dur: 1200, yoyo: true, times: 4 }]) },
            { caption: "Yes! It's a cat! Meow!", key: 1300, do: [].concat(pose("sara", "R", "down", 0, 400), [
              { id: "cat", to: { o: 1 }, dur: 100 }, { id: "cat", to: { y: 64 }, dur: 600, ease: "back" }, { id: "cat.jaw", to: { r: 35 }, at: 700, dur: 300 }, { id: "cat.jaw", to: { r: 0 }, at: 1500, dur: 300 }],
              nod("reza", 300), talk("reza", 300, 1400), face("sara", true, 600), jump("sara", 700, 1, 5)) }
          ] },
        { type: "listen", show: "🐱", say: "Is it a cat?", prompt: "گوش کن و جواب بده",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "yes" },
        { type: "listen", show: "🍎", say: "Is it a ball?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "no" },
        { type: "listen", show: "🐶", say: "Is it a dog?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ pic: "👍", en: "Yes!", value: "yes" }, { pic: "👎", en: "No!", value: "no" }], answer: "yes" },
        { type: "listen", show: "🦆", say: "What's this?", prompt: "گوش کن. جواب درست کدام است؟",
          options: [{ pic: "🐱", en: "It's a cat.", value: "cat" }, { pic: "🦆", en: "It's a duck.", value: "duck" }, { pic: "🐮", en: "It's a cow.", value: "cow" }], answer: "duck" },
        { type: "words", prompt: "روی هر تصویر بزن، گوش کن و بلند جواب بده: It's a …",
          words: [{ pic: "⚽", en: "It's a ball." }, { pic: "🧸", en: "It's a teddy." }, { pic: "🐱", en: "It's a cat." }, { pic: "🍎", en: "It's an apple." }] },
        { type: "tip", text: "بازی «این چیست؟» را با یک کیسه یا جعبه بازی کنید: چیزی را کمی بیرون بیاورید و بپرسید What's this? تا کودک بگوید It's a ball یا فقط ball. گاهی عمداً اشتباه بپرسید: Is it a cat? تا کودک بخندد و بگوید No! کم‌کم کودک هم سؤال کند." }
      ]
    },
    {
      id: "english-seed-37", subject: "english", level: "seed", emoji: "🔤", title: "حرف‌های انگلیسی",
      steps: [
        { type: "listen", show: "Sara", say: "Sara", prompt: "این اسم «سارا» است که به انگلیسی نوشته شده. انگلیسی را از کدام طرف می‌نویسند و می‌خوانند؟",
          options: [{ pic: "➡️", value: "ltr", en: "left to right" }, { pic: "⬅️", value: "rtl" }], answer: "ltr" },
        { type: "listen", prompt: "کدام نوشته انگلیسی است؟",
          options: [{ label: "سارا", value: "fa" }, { label: "Sara", value: "en", en: "Sara" }], answer: "en" },
        { type: "listen", prompt: "کدام نوشته فارسی است؟",
          options: [{ label: "cat", value: "en" }, { label: "گربه", value: "fa" }], answer: "fa" },
        { type: "sort", prompt: "هر حرف را در سبد خودش بگذار: حرف‌های انگلیسی در یک سبد و حرف‌های فارسی در سبد دیگر.",
          baskets: [{ label: "a b c", value: "en" }, { label: "الف ب پ", value: "fa" }],
          items: [{ label: "s", basket: "en" }, { label: "ب", basket: "fa" }, { label: "m", basket: "en" }, { label: "س", basket: "fa" }, { label: "t", basket: "en" }, { label: "د", basket: "fa" }] },
        { type: "listen", show: "🙋", say: "Mina", prompt: "اسم این دختر «مینا» است. اسمش به انگلیسی با «م» شروع می‌شود. کدام نوشته اسم او است؟",
          options: [{ label: "Reza", value: "Reza" }, { label: "Mina", value: "Mina", en: "Mina" }], answer: "Mina" },
        { type: "tip", text: "اسم کودک را با حرف‌های انگلیسی، درشت روی یک کاغذ بنویسید (مثلاً Sara یا Reza) و روی در اتاقش بچسبانید. هر بار انگشتش را از چپ به راست زیر اسم بکشد و اسمش را بگوید. لازم نیست حرف‌ها را یاد بگیرد؛ فقط ببیند که انگلیسی از چپ نوشته می‌شود و اسمش را بشناسد." }
      ]
    },
    {
      id: "english-seed-38", subject: "english", level: "seed", emoji: "🎶", title: "شعر من",
      steps: [
        /* Our own action chant, with words from the whole garden: Arman and Mina do each line as it is said. */
        { type: "scene", prompt: "گوش کن و با آن‌ها شعر را بگو و حرکت‌ها را انجام بده", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, a: { art: "en-arman", at: [56, 86], s: 1.35 }, m: { art: "en-mina", at: [106, 86], s: 1.35 } },
          scenes: [
            { caption: "Hello, hello! How are you?", key: 1200, hold: 4000, do: [].concat(wave("a", "R", 0, 2400, true), wave("m", "L", 0, 2400, true), talk("a", 0, 2400), talk("m", 0, 2400)) },
            { caption: "Clap your hands: one, two!", key: 1050, hold: 4000, do: [].concat(pose("a", "R", "down", 0, 200), pose("m", "L", "down", 0, 200),
              clapHands("a", 200, 2, [56, 59]), clapHands("m", 200, 2, [106, 59])) },
            { caption: "Touch your nose, touch your ears,", key: 2000, hold: 4400, do: [].concat(pose("a", "R", "nose", 200, 500), pose("m", "R", "nose", 200, 500),
              pose("a", "R", "ear", 1500, 500), pose("a", "L", "ear", 1500, 500), pose("m", "R", "ear", 1500, 500), pose("m", "L", "ear", 1500, 500)) },
            { caption: "Stamp your feet, and give a cheer! Hooray!", key: 2900, hold: 4800, do: [].concat(pose("a", "R", "down", 0, 400), pose("a", "L", "down", 0, 400),
              pose("m", "R", "down", 0, 400), pose("m", "L", "down", 0, 400), stamp("a", 400, 2), stamp("m", 400, 2),
              pose("a", "R", "stretch", 2000, 400), pose("a", "L", "stretch", 2000, 400), pose("m", "R", "stretch", 2000, 400), pose("m", "L", "stretch", 2000, 400),
              jump("a", 2300, 1, 6), jump("m", 2300, 1, 6)) },
            { caption: "Jump like a frog: hop, hop, hop!", key: 625, hold: 4400, do: [].concat(pose("a", "R", "down", 0, 300), pose("a", "L", "down", 0, 300),
              pose("m", "R", "down", 0, 300), pose("m", "L", "down", 0, 300), jump("a", 300, 3, 8), jump("m", 300, 3, 8)) },
            { caption: "Fly like a bird... and stop!", key: 1600, hold: 4400, do: [].concat(pose("a", "R", "big", 0, 400), pose("a", "L", "big", 0, 400), pose("m", "R", "big", 0, 400), pose("m", "L", "big", 0, 400), [
              { id: "a.armR", to: { r: -140 }, at: 500, dur: 1800, yoyo: true, times: 6 }, { id: "a.armL", to: { r: 140 }, at: 500, dur: 1800, yoyo: true, times: 6 },
              { id: "m.armR", to: { r: -140 }, at: 500, dur: 1800, yoyo: true, times: 6 }, { id: "m.armL", to: { r: 140 }, at: 500, dur: 1800, yoyo: true, times: 6 }]) },
            { caption: "Turn around, sit down... shh!", key: 3000, hold: 4800, do: [].concat(pose("a", "R", "down", 0, 400), pose("a", "L", "down", 0, 400),
              pose("m", "R", "down", 0, 400), pose("m", "L", "down", 0, 400), turn("a", 300), turn("m", 300),
              [{ id: "a", to: { y: "+10" }, at: 2000, dur: 800 }, { id: "a.legL", to: { sy: 0.25 }, at: 2000, dur: 800 }, { id: "a.legR", to: { sy: 0.25 }, at: 2000, dur: 800 },
                { id: "m", to: { y: "+10" }, at: 2000, dur: 800 }, { id: "m.legL", to: { sy: 0.25 }, at: 2000, dur: 800 }, { id: "m.legR", to: { sy: 0.25 }, at: 2000, dur: 800 }],
              pose("a", "R", "mouth", 2800, 400), pose("m", "R", "mouth", 2800, 400)) }
          ] },
        { type: "listen", say: "Jump like a frog!", prompt: "گوش کن. کدام کار است؟",
          options: [{ pic: "🐸", en: "Jump like a frog!" }, { pic: "🐦", en: "Fly like a bird!" }, { pic: "👏", en: "Clap your hands!" }], answer: "🐸" },
        { type: "listen", say: "Stamp your feet!", quiet: true, prompt: "گوش کن. کدام کار است؟",
          options: [{ pic: "👃", en: "Touch your nose!" }, { pic: "🦶", en: "Stamp your feet!" }, { pic: "🐦", en: "Fly like a bird!" }], answer: "🦶" },
        { type: "listen", say: "Fly like a bird!", quiet: true, prompt: "گوش کن. کدام کار است؟",
          options: [{ pic: "👏", en: "Clap your hands!" }, { pic: "🐸", en: "Jump like a frog!" }, { pic: "🐦", en: "Fly like a bird!" }], answer: "🐦" },
        { type: "doit", pic: "🎶", text: "حالا شعر را با بزرگ‌ترت از اول تا آخر بخوان و همه حرکت‌ها را انجام بده!",
          say: "حالا شعر را با بزرگ‌ترت از اول تا آخر بخوان و همه حرکت‌ها را انجام بده!",
          list: ["Hello, hello! How are you?", "Clap your hands: one, two!", "Touch your nose, touch your ears,", "Stamp your feet, and give a cheer! Hooray!",
            "Jump like a frog: hop, hop, hop!", "Fly like a bird... and stop!", "Turn around, sit down... shh!"] },
        { type: "tip", text: "این شعر همه کلمه‌های حرکتی باغچه را با هم دارد. هر روز یک بار با هم بخوانید؛ اول شما بخوانید و کودک حرکت کند، کم‌کم کودک هم با شما بخواند. لازم نیست همه کلمه‌ها درست ادا شود؛ مهم این است که با ریتم و حرکت همراه شود." }
      ]
    },
    {
      id: "english-seed-39", subject: "english", level: "seed", emoji: "🌞", title: "قصه: روز سارا",
      steps: [
        /* Sara's day: she wakes up as the sun rises, eats bread and drinks milk in the kitchen, plays with a red ball
           in the park and a dog comes to play, comes home tired as the sun sets, and goes to bed. */
        { type: "scene", prompt: "به قصه روز سارا گوش کن", bg: "#f6e3c6",
          parts: {
            skyN: { art: "en-sky-night" }, skyD: { art: "en-sky-day", o: 0 }, sun: { art: "☀", at: [120, 62], s: 0.9 }, moon: { art: "🌙", at: [121, 34], s: 0.8 },
            room: { art: "en-bedroom" }, bed: { art: "en-bed-low", at: [50, 86], s: 1.3 },
            kitchen: { art: "en-kitchen", o: 0 }, table: { art: "en-table", at: [56, 90], s: 1.1, o: 0 },
            bread: { art: "🍞", at: [62, 67], s: 0.6, o: 0 }, milk: { art: "🥛", at: [76, 67], s: 0.6, o: 0 },
            park: { art: "en-park", o: 0 }, ball: { art: "en-ball", at: [70, 86], s: 1.5, o: 0 }, dog: { art: "en-dog", at: [-30, 86], s: 1.2 },
            sara: { art: "en-sara", at: [104, 86], s: 1.1 }
          },
          scenes: [
            { caption: "Good morning, Sara!", key: 3200, hold: 4600, do: [].concat([
              { id: "moon", to: { y: 62 }, dur: 1400 }, { id: "skyN", to: { o: 0 }, at: 400, dur: 1600 }, { id: "skyD", to: { o: 1 }, at: 400, dur: 1600 },
              { id: "sun", to: { y: 34 }, at: 800, dur: 1600, ease: "out" }], pose("sara", "R", "stretch", 2400, 500), pose("sara", "L", "stretch", 2400, 500), face("sara", true, 2400)) },
            { caption: "Sara eats bread and drinks milk.", key: 2100, hold: 5000, do: [].concat(pose("sara", "R", "down", 0, 400), pose("sara", "L", "down", 0, 400), [
              { id: "kitchen", to: { o: 1 }, dur: 600 }, { id: "table", to: { o: 1 }, dur: 600 }, { id: "bread", to: { o: 1 }, dur: 600 }, { id: "milk", to: { o: 1 }, dur: 600 },
              arc("bread", [62, 67], inHand("en-sara", [104, 86], 1.1, "L", "mouth", 0.6), 1000, 900, 8), { id: "bread", to: { s: 0.2 }, at: 1900, dur: 1000 }, { id: "bread", to: { o: 0 }, at: 2800, dur: 200 },
              { id: "sara.mouth", to: { o: 1 }, at: 1900, dur: 100 }, { id: "sara.mouth", to: { sy: 0.3 }, at: 2000, dur: 1000, yoyo: true, times: 4 }, { id: "sara.mouth", to: { o: 0 }, at: 3000, dur: 100 },
              arc("milk", [76, 67], inHand("en-sara", [104, 86], 1.1, "L", "mouth", 0.6), 3200, 900, 8), { id: "milk", to: { o: 0 }, at: 4600, dur: 300 }],
              pose("sara", "L", "mouth", 1000, 900), pose("sara", "L", "down", 2900, 300), pose("sara", "L", "mouth", 3200, 900), pose("sara", "L", "down", 4500, 400)) },
            { caption: "Sara plays with a red ball.", key: 1700, hold: 4600, do: [{ id: "kitchen", to: { o: 0 }, dur: 600 }, { id: "table", to: { o: 0 }, dur: 600 },
              { id: "park", to: { o: 1 }, dur: 600 }, { id: "ball", to: { o: 1 }, dur: 600 },
              { id: "ball", path: "M70 86Q80 40 90 86Q80 52 70 86", at: 700, dur: 2400 }, { id: "sara", to: { x: 96 }, at: 200, dur: 500 }] },
            { caption: "Woof, woof! A dog!", key: 2400, do: [].concat(trot("dog", 46, 0, 1400), [{ id: "dog.jaw", to: { r: 30 }, at: 1500, dur: 900, yoyo: true, times: 4 },
              { id: "dog.tail", to: { r: -25 }, at: 1500, dur: 1600, yoyo: true, times: 8 }, { id: "ball", path: "M70 86Q64 72 58 86", at: 1500, dur: 700 }], face("sara", true, 1400), jump("sara", 1500, 1, 5)) },
            { caption: "Sara is tired.", key: 4000, hold: 5600, do: [].concat([{ id: "park", to: { o: 0 }, dur: 700 }, { id: "ball", to: { o: 0 }, dur: 700 }, { id: "dog", to: { o: 0 }, dur: 700 },
              { id: "sara", to: { x: 104 }, dur: 600 },
              { id: "sun", to: { y: 62 }, at: 600, dur: 1600, ease: "in" }, { id: "skyD", to: { o: 0 }, at: 1200, dur: 1600 }, { id: "skyN", to: { o: 1 }, at: 1200, dur: 1600 },
              { id: "moon", to: { y: 34 }, at: 2000, dur: 1600, ease: "out" },
              { id: "sara.mouth", to: { o: 1, sy: 1.5 }, at: 3400, dur: 300 }, { id: "sara.mouth", to: { o: 0, sy: 1 }, at: 4300, dur: 300 }],
              pose("sara", "L", "mouth", 3300, 400), pose("sara", "L", "down", 4400, 400)) },
            { caption: "Good night, Sara!", key: 2600, hold: 5000, do: [{ id: "sara", to: { x: 58, y: 64, r: -90 }, at: 300, dur: 1000 },
              { id: "sara.shut", to: { o: 1 }, at: 1500, dur: 300 }, { id: "sara.eyes", to: { o: 0 }, at: 1500, dur: 300 }] }
          ],
          question: "سارا صبحانه چه خورد؟", options: ["🍞", "🍕", "🍌"], answer: "🍞" },
        { type: "listen", say: "Sara plays with a red ball.", prompt: "گوش کن. سارا با چه چیزی بازی کرد؟",
          options: [{ pic: "🪁", en: "a kite" }, { pic: "🔴", en: "a red ball" }, { pic: "🚗", en: "a car" }], answer: "🔴" },
        { type: "listen", say: "Woof, woof! A dog!", quiet: true, prompt: "گوش کن. چه کسی به پارک آمد؟",
          options: [{ pic: "🐶", en: "a dog" }, { pic: "🐱", en: "a cat" }, { pic: "🐦", en: "a bird" }], answer: "🐶" },
        { type: "listen", say: "Good night, Sara!", quiet: true, prompt: "گوش کن. کی است؟",
          options: [{ pic: "☀️", en: "Good morning!" }, { pic: "🌙", en: "Good night!" }], answer: "🌙" },
        { type: "tip", text: "شب‌ها قبل از خواب، روز کودک را با چند کلمه انگلیسی مرور کنید: Good morning! Bread and milk. A red ball. Good night! و با دست نشان بدهید. بعد بپرسید What did you eat? و بگذارید با یک کلمه یا اشاره جواب بدهد." }
      ]
    },
    {
      id: "english-seed-40", subject: "english", level: "seed", emoji: "🏆", title: "بازی بزرگ دانه",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد درست بگذار: حیوان، اسباب‌بازی یا لباس.",
          baskets: [{ pic: "🐾", value: "animal" }, { pic: "🧸", value: "toy" }, { pic: "👕", value: "clothes" }],
          items: [{ pic: "🐸", say: "frog", basket: "animal" }, { pic: "🪁", say: "kite", basket: "toy" }, { pic: "👒", say: "hat", basket: "clothes" },
            { pic: "🐮", say: "cow", basket: "animal" }, { pic: "🚂", say: "train", basket: "toy" }, { pic: "🧦", say: "socks", basket: "clothes" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "☀️", say: "sunny" }, { pic: "☀️", say: "sunny" }], [{ pic: "😊", say: "happy" }, { pic: "😊", say: "happy" }],
            [{ pic: "❄️", say: "snowy" }, { pic: "❄️", say: "snowy" }], [{ pic: "😴", say: "tired" }, { pic: "😴", say: "tired" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد چیزی بگذار که صدای اولشان یکی است: sun «سسس» یا teddy «ت».",
          baskets: [{ pic: "☀️", value: "s" }, { pic: "🧸", value: "t" }],
          items: [{ pic: "🧦", say: "sock", basket: "s" }, { pic: "🚂", say: "train", basket: "t" }, { pic: "⭐", say: "star", basket: "s" },
            { pic: "🌳", say: "tree", basket: "t" }, { pic: "🐍", say: "snake", basket: "s" }, { pic: "🍅", say: "tomato", basket: "t" }] },
        { type: "pairs", prompt: "بشمار و هر دسته را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 7, say: "seven" }, "🐟🐟🐟🐟🐟🐟🐟"], [{ dots: 9, say: "nine" }, "⭐⭐⭐⭐⭐⭐⭐⭐⭐"], [{ dots: 6, say: "six" }, "🍎🍎🍎🍎🍎🍎"], [{ dots: 8, say: "eight" }, "🌸🌸🌸🌸🌸🌸🌸🌸"]] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🏃", say: "run" }, { pic: "🏃", say: "run" }], [{ pic: "🏊", say: "swim" }, { pic: "🏊", say: "swim" }],
            [{ pic: "🎵", say: "sing" }, { pic: "🎵", say: "sing" }], [{ pic: "🐻", say: "bear" }, { pic: "🐻", say: "bear" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. چیزهای قرمز را در یک سبد و چیزهای زرد را در سبد دیگر بگذار.",
          baskets: [{ pic: "🔴", value: "red" }, { pic: "🟡", value: "yellow" }],
          items: [{ pic: "🍎", say: "red", basket: "red" }, { pic: "🍌", say: "yellow", basket: "yellow" }, { pic: "🍓", say: "red", basket: "red" },
            { pic: "🌻", say: "yellow", basket: "yellow" }, { pic: "🍅", say: "red", basket: "red" }, { pic: "🍋", say: "yellow", basket: "yellow" }] },
        { type: "tip", text: "آفرین به شما و کودک! این بازی کلمه‌های همه درس‌های دانه را مرور می‌کند. از این به بعد هم هر روز چند دقیقه انگلیسی بشنوید: شعرهای باغچه را بخوانید، بازی‌های Sara says و I spy را ادامه بدهید و هر جا شد، کلمه‌های انگلیسی را به کار ببرید." }
      ]
    },
    // ---------------- English: Sprout (letters and their sounds, a few at a time; short words) ----------------
    {
      id: "english-sprout-1", subject: "english", level: "sprout", emoji: "🐍", title: "حرف‌های s a t p",
      steps: [
        { type: "letter", letter: "s", like: "س", words: [{ pic: "🌞", en: "sun" }, { pic: "🧦", en: "sock" }, { pic: "🐍", en: "snake" }] },
        { type: "letter", letter: "a", like: "اَ", words: [{ pic: "🍎", en: "apple" }, { pic: "🐜", en: "ant" }] },
        { type: "letter", letter: "t", like: "ت", words: [{ pic: "🐯", en: "tiger" }, { pic: "⛺", en: "tent" }] },
        { type: "letter", letter: "p", like: "پ", words: [{ pic: "🐷", en: "pig" }, { pic: "🖊️", en: "pen" }] },
        { type: "listen", show: "s", prompt: SOUND_PROMPT, options: [{ pic: "🐯", en: "tiger" }, { pic: "🐍", en: "snake" }, { pic: "🐷", en: "pig" }], answer: "🐍" },
        { type: "listen", show: "p", prompt: SOUND_PROMPT, options: [{ pic: "🍎", en: "apple" }, { pic: "🌞", en: "sun" }, { pic: "🖊️", en: "pen" }], answer: "🖊️" },
        { type: "sort", prompt: SORT_PROMPT,
          baskets: [{ label: "s" }, { label: "t" }],
          items: [{ pic: "🌞", say: "sun", basket: "s" }, { pic: "🐯", say: "tiger", basket: "t" }, { pic: "🧦", say: "sock", basket: "s" },
            { pic: "⛺", say: "tent", basket: "t" }, { pic: "🐍", say: "snake", basket: "s" }] },
        { type: "pairs", prompt: "هر حرف را با تصویری جفت کن که با صدای آن شروع می‌شود",
          pairs: [["s", { pic: "🧦", say: "sock" }], ["a", { pic: "🐜", say: "ant" }], ["t", { pic: "⛺", say: "tent" }], ["p", { pic: "🐷", say: "pig" }]] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "tap", parts: ["t", "a", "p"], extra: ["s"], pic: "🚰" },
        { type: "tip", text: "در انگلیسی صدای حرف مهم‌تر از اسم آن است: s را «سسس» بگویید، نه «اِس». با هم در خانه دنبال چیزهایی بگردید که با همین صداها شروع می‌شوند. اگر اسم انگلیسی‌شان را نمی‌دانید، از تصویرهای همین درس کمک بگیرید." }
      ]
    },
    {
      id: "english-sprout-12", subject: "english", level: "sprout", emoji: "🔊", title: "بخوان با s a t p",
      steps: [
        blendWord("at", ["a", "t"]),
        blendWord("sat", ["s", "a", "t"], "🪑"),
        blendWord("pat", ["p", "a", "t"], "🐶"),
        blendWord("tap", ["t", "a", "p"], "🚰"),
        blendWord("sap", ["s", "a", "p"], "🌳"),
        { type: "listen", show: "tap", prompt: READ_PROMPT, options: ["🪑", "🚰", "🐶"], answer: "🚰" },
        { type: "listen", show: "sat", quiet: true, prompt: READ_PROMPT, options: ["🚰", "🌳", "🪑"], answer: "🪑" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["tap", { pic: "🚰", say: "tap" }], ["sat", { pic: "🪑", say: "sat" }], ["pat", { pic: "🐶", say: "pat" }]] },
        { type: "tip", text: "از امروز کودک کلمه می‌خواند! زیر هر حرف یک نقطه بکشید؛ کودک انگشتش را روی نقطه‌ها از چپ به راست ببرد و صدای هر حرف را بگوید (سسس… اَ… ت)، بعد تندتر و پشت سر هم: sat. با کلمه‌های at، sat، pat، tap روی کارت بازی کنید." }
      ]
    },
    {
      id: "english-sprout-2", subject: "english", level: "sprout", emoji: "🐭", title: "حرف‌های i n m d",
      steps: [
        { type: "letter", letter: "i", words: [{ pic: "🐛", en: "insect" }, { pic: "🤒", en: "ill" }] },
        { type: "letter", letter: "n", like: "ن", words: [{ pic: "👃", en: "nose" }, { pic: "🥅", en: "net" }] },
        { type: "letter", letter: "m", like: "م", words: [{ pic: "🌙", en: "moon" }, { pic: "🐭", en: "mouse" }, { pic: "🥛", en: "milk" }] },
        { type: "letter", letter: "d", like: "د", words: [{ pic: "🐶", en: "dog" }, { pic: "🦆", en: "duck" }, { pic: "🚪", en: "door" }] },
        { type: "listen", show: "m", prompt: SOUND_PROMPT, options: [{ pic: "🐶", en: "dog" }, { pic: "👃", en: "nose" }, { pic: "🐭", en: "mouse" }], answer: "🐭" },
        { type: "sort", prompt: SORT_PROMPT,
          baskets: [{ label: "m" }, { label: "d" }],
          items: [{ pic: "🌙", say: "moon", basket: "m" }, { pic: "🦆", say: "duck", basket: "d" }, { pic: "🥛", say: "milk", basket: "m" },
            { pic: "🚪", say: "door", basket: "d" }, { pic: "🐶", say: "dog", basket: "d" }] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "map", parts: ["m", "a", "p"], extra: ["d"], pic: "🗺️" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "pin", parts: ["p", "i", "n"], extra: ["t"], pic: "📌" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["map", { pic: "🗺️", say: "map" }], ["pin", { pic: "📌", say: "pin" }], ["tap", { pic: "🚰", say: "tap" }]] },
        { type: "tip", text: "کلمه‌های کوتاه را آرام و صدا به صدا بگویید و بعد پشت سر هم: «م… اَ… پ… map». کودک هم همین کار را بکند. خواندن انگلیسی از چپ به راست است؛ موقع خواندن، انگشتش را زیر حرف‌ها از چپ به راست ببرد." }
      ]
    },
    {
      id: "english-sprout-13", subject: "english", level: "sprout", emoji: "📌", title: "کلمه‌های تازه",
      steps: [
        { type: "listen", show: "pin", prompt: READ_PROMPT, options: ["🗺️", "📌", "🥫"], answer: "📌" },
        { type: "listen", show: "man", quiet: true, prompt: READ_PROMPT, options: ["👨", "📌", "🪑"], answer: "👨" },
        { type: "listen", show: "tin", quiet: true, prompt: READ_PROMPT, options: ["🥫", "👨", "🧘"], answer: "🥫" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "sit", parts: ["s", "i", "t"], extra: ["a"], pic: "🧘" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "dad", parts: ["d", "a", "d"], extra: ["m"], pic: "👨" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "mat", parts: ["m", "a", "t"], extra: ["n"], pic: "🟫" },
        { type: "listen", say: "the", prompt: "این کلمه را باید از رویش بشناسی: the. گوش کن و پیدایش کن.",
          options: [{ label: "and" }, { label: "the" }, { label: "tin" }], answer: "the" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a pin", "📌"], ["the man", "👨"], ["sit and pat", "🧘"], ["a tin", "🥫"]] },
        { type: "tip", text: "کلمه‌های این درس را روی کارت بنویسید: pin، tin، man، sit، dad، and، mat. یکی را بخوانید و کودک بسازد، یا کودک بخواند و شما بسازید. the را نمی‌شود صدا به صدا خواند؛ آن را «کلمه تصویری» بنامید و هر وقت در کتاب دیدید، به آن اشاره کنید." }
      ]
    },
    {
      id: "english-sprout-14", subject: "english", level: "sprout", emoji: "✍️", title: "نوشتن حرف‌های اول",
      steps: [
        { type: "trace", letter: "s", say: "sun", prompt: "s را بنویس: از بالا، کمی سمت راست، شروع کن و مثل مار پایین بیا." },
        { type: "trace", letter: "a", say: "apple", prompt: "a را بنویس: یک دایره کوچک مثل c، بعد یک خط کنارش از بالا به پایین." },
        { type: "trace", letter: "t", say: "tent", prompt: "t را بنویس: از بالا به پایین، بعد خط کوتاه روی آن." },
        { type: "trace", letter: "p", say: "pen", prompt: "p را بنویس: یک خط از وسط به پایین، زیر خط می‌رود؛ بعد برگرد بالا و یک دایره بساز." },
        { type: "trace", letter: "i", say: "insect", prompt: "i را بنویس: یک خط کوتاه از بالا به پایین، بعد نقطه‌اش را بالای آن بگذار." },
        { type: "trace", letter: "n", say: "net", prompt: "n را بنویس: یک خط پایین، بعد برگرد و یک پل بساز." },
        { type: "trace", letter: "m", say: "mouse", prompt: "m را بنویس: یک خط پایین و دو پل پشت سر هم." },
        { type: "trace", letter: "d", say: "dog", prompt: "d را بنویس: اول یک دایره مثل c، بعد یک خط بلند از بالا تا روی خط." },
        { type: "tip", text: "روی کاغذ خط‌دار، هر حرف را چند بار با هم بنویسید و همیشه از نقطه شروع درست شروع کنید (بیشتر حرف‌ها از بالا). p تنها حرف این درس است که از خط پایین‌تر می‌رود. بعد کلمه‌های کوتاه مثل sat، pin و mad را بنویسید." }
      ]
    },
    {
      id: "english-sprout-3", subject: "english", level: "sprout", emoji: "🐱", title: "حرف‌های g o c k",
      steps: [
        { type: "letter", letter: "g", like: "گ", words: [{ pic: "🐐", en: "goat" }, { pic: "🎁", en: "gift" }] },
        { type: "letter", letter: "o", like: "آ", words: [{ pic: "🐙", en: "octopus" }, { pic: "🐂", en: "ox" }] },
        { type: "letter", letter: "c", like: "ک", words: [{ pic: "🐱", en: "cat" }, { pic: "🚗", en: "car" }, { pic: "☕", en: "cup" }] },
        { type: "letter", letter: "k", like: "ک", words: [{ pic: "🪁", en: "kite" }, { pic: "🔑", en: "key" }, { pic: "🦘", en: "kangaroo" }] },
        { type: "listen", show: "g", prompt: SOUND_PROMPT, options: [{ pic: "🐱", en: "cat" }, { pic: "🐐", en: "goat" }, { pic: "🐙", en: "octopus" }], answer: "🐐" },
        { type: "sort", prompt: SORT_PROMPT,
          baskets: [{ label: "g" }, { label: "c" }],
          items: [{ pic: "🐐", say: "goat", basket: "g" }, { pic: "🚗", say: "car", basket: "c" }, { pic: "🎁", say: "gift", basket: "g" },
            { pic: "☕", say: "cup", basket: "c" }, { pic: "🐱", say: "cat", basket: "c" }] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "cat", parts: ["c", "a", "t"], extra: ["g"], pic: "🐱" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "dog", parts: ["d", "o", "g"], extra: ["p"], pic: "🐶" },
        { type: "listen", show: "dog", prompt: READ_PROMPT, options: ["🐱", "🐶", "🗺️"], answer: "🐶" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["cat", { pic: "🐱", say: "cat" }], ["dog", { pic: "🐶", say: "dog" }], ["map", { pic: "🗺️", say: "map" }], ["pin", { pic: "📌", say: "pin" }]] },
        { type: "tip", text: "c و k هر دو صدای «ک» دارند. وقتی کودک کلمه‌ای مثل cat را می‌خواند، اول صداها را جدا بگوید و بعد سریع‌تر، تا کلمه را بشنود. اگر اشتباه کرد، فقط درستش را یک بار با هم تکرار کنید." }
      ]
    },
    {
      id: "english-sprout-15", subject: "english", level: "sprout", emoji: "🐕", title: "سگ و گربه",
      steps: [
        { type: "listen", show: "dog", prompt: READ_PROMPT, options: ["🐱", "🐶", "🍲"], answer: "🐶" },
        { type: "listen", show: "pot", quiet: true, prompt: READ_PROMPT, options: ["🍲", "🛏️", "🐱"], answer: "🍲" },
        { type: "listen", show: "kid", quiet: true, prompt: READ_PROMPT, options: ["🐶", "🧒", "🍲"], answer: "🧒" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "cot", parts: ["c", "o", "t"], extra: ["a"], pic: "🛏️" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "kid", parts: ["k", "i", "d"], extra: ["o"], pic: "🧒" },
        { type: "listen", say: "go", prompt: "این‌ها کلمه‌های تصویری‌اند: I، no، go، to. گوش کن و پیدایش کن.",
          options: [{ label: "no" }, { label: "go" }, { label: "to" }], answer: "go" },
        { type: "listen", say: "no", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.",
          options: [{ label: "to" }, { label: "I" }, { label: "no" }], answer: "no" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a dog", "🐶"], ["a cat", "🐱"], ["I go to Dad.", "👨"], ["a pot", "🍲"]] },
        { type: "tip", text: "کلمه‌های I، no، go و to را روی کارت بنویسید و روی در یخچال بچسبانید. هر روز یکی را با هم پیدا کنید و بخوانید. کلمه‌های دیگر این درس (dog، cat، pot، kid، cot) را صدا به صدا بخوانید." }
      ]
    },
    {
      id: "english-sprout-4", subject: "english", level: "sprout", emoji: "☂️", title: "حرف‌های e u r",
      steps: [
        { type: "letter", letter: "e", like: "اِ", words: [{ pic: "🥚", en: "egg" }, { pic: "🐘", en: "elephant" }] },
        { type: "letter", letter: "u", words: [{ pic: "☂️", en: "umbrella" }, { pic: "⬆️", en: "up" }] },
        { type: "letter", letter: "r", like: "ر", words: [{ pic: "🐰", en: "rabbit" }, { pic: "🌧️", en: "rain" }, { pic: "💍", en: "ring" }] },
        { type: "listen", show: "r", prompt: SOUND_PROMPT, options: [{ pic: "🥚", en: "egg" }, { pic: "🐰", en: "rabbit" }, { pic: "☂️", en: "umbrella" }], answer: "🐰" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "sun", parts: ["s", "u", "n"], extra: ["a"], pic: "🌞" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "pen", parts: ["p", "e", "n"], extra: ["i"], pic: "🖊️" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "run", parts: ["r", "u", "n"], extra: ["m"], pic: "🏃" },
        { type: "listen", show: "cup", prompt: READ_PROMPT, options: ["🌞", "🥚", "☕"], answer: "☕" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["sun", { pic: "🌞", say: "sun" }], ["pen", { pic: "🖊️", say: "pen" }], ["cup", { pic: "☕", say: "cup" }], ["egg", { pic: "🥚", say: "egg" }]] },
        { type: "tip", text: "کلمه‌هایی را که کودک تا حالا یاد گرفته (sun، cup، cat، dog، map) روی کاغذ بنویسید و کنار هر کدام نقاشی‌اش را بکشید. هر روز یکی دو تا را با هم بخوانید. کم ولی هر روز، از زیاد ولی گاه‌به‌گاه بهتر است." }
      ]
    },
    {
      id: "english-sprout-16", subject: "english", level: "sprout", emoji: "🧢", title: "جمله‌های کوچک",
      steps: [
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a red cap", "🧢"], ["a pet in a cot", "🐶🛏️"], ["get up", "⬆️"], ["a cup", "☕"]] },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a cat in a pot", "🐱🍲"], ["a red pen", "🖍️"], ["I go to Mum.", "👩"], ["no!", "🙅"]] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "a red cap", items: ["a", "red", "cap"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "a pet in a cot", items: ["a", "pet", "in", "a", "cot"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Get up, Dad!", items: ["Get", "up,", "Dad!"] },
        { type: "tip", text: "حالا کودک چند کلمه را پشت سر هم می‌خواند. یک نوشته کوتاه مثل a red cap روی کاغذ بنویسید و کودک بخواند و نقاشی‌اش را بکشد. موقع خواندن انگشتش زیر کلمه‌ها از چپ به راست برود." }
      ]
    },
    {
      id: "english-sprout-5", subject: "english", level: "sprout", emoji: "🚌", title: "حرف‌های h b f l",
      steps: [
        { type: "letter", letter: "h", like: "ه", words: [{ pic: "👒", en: "hat" }, { pic: "🐴", en: "horse" }, { pic: "✋", en: "hand" }] },
        { type: "letter", letter: "b", like: "ب", words: [{ pic: "⚽", en: "ball" }, { pic: "🛏️", en: "bed" }, { pic: "🚌", en: "bus" }] },
        { type: "letter", letter: "f", like: "ف", words: [{ pic: "🐟", en: "fish" }, { pic: "🐸", en: "frog" }, { pic: "🦊", en: "fox" }] },
        { type: "letter", letter: "l", like: "ل", words: [{ pic: "🦁", en: "lion" }, { pic: "🍋", en: "lemon" }, { pic: "🦵", en: "leg" }] },
        { type: "sort", prompt: SORT_PROMPT,
          baskets: [{ label: "b" }, { label: "f" }],
          items: [{ pic: "⚽", say: "ball", basket: "b" }, { pic: "🐟", say: "fish", basket: "f" }, { pic: "🚌", say: "bus", basket: "b" },
            { pic: "🐸", say: "frog", basket: "f" }, { pic: "🛏️", say: "bed", basket: "b" }, { pic: "🦊", say: "fox", basket: "f" }] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "bus", parts: ["b", "u", "s"], extra: ["h"], pic: "🚌" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "hat", parts: ["h", "a", "t"], extra: ["b"], pic: "👒" },
        { type: "listen", show: "bed", prompt: READ_PROMPT, options: ["🛏️", "🚌", "👒"], answer: "🛏️" },
        { type: "listen", show: "leg", prompt: READ_PROMPT, options: ["🍋", "🦵", "🦁"], answer: "🦵" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["hat", { pic: "👒", say: "hat" }], ["bed", { pic: "🛏️", say: "bed" }], ["bus", { pic: "🚌", say: "bus" }], ["leg", { pic: "🦵", say: "leg" }]] },
        { type: "tip", text: "بازی «من می‌بینم» را بازی کنید: بگویید «من چیزی می‌بینم که با صدای ب شروع می‌شود» و کودک دنبالش بگردد و اسم انگلیسی‌اش را بگوید، مثل ball یا bed. اگر کلمه انگلیسی را نمی‌دانید، فقط صدای اول را پیدا کنید؛ همین هم تمرین است." }
      ]
    },
    {
      id: "english-sprout-17", subject: "english", level: "sprout", emoji: "🦆", title: "ff، ll، ss، ck",
      steps: [
        { type: "letter", letter: "ll", end: true, like: "ل", words: [{ pic: "🔔", en: "bell" }, { pic: "🪆", en: "doll" }, { pic: "⛰️", en: "hill" }] },
        { type: "letter", letter: "ss", end: true, like: "س", words: [{ pic: "😘", en: "kiss" }, { pic: "🚶", en: "pass" }] },
        { type: "letter", letter: "ff", end: true, like: "ف", words: [{ pic: "📴", en: "off" }] },
        { type: "letter", letter: "ck", end: true, like: "ک", words: [{ pic: "🦆", en: "duck" }, { pic: "🧦", en: "sock" }, { pic: "🔒", en: "lock" }] },
        { type: "listen", show: "duck", prompt: READ_PROMPT, options: ["🔔", "🦆", "🧦"], answer: "🦆" },
        { type: "sort", prompt: SORT_PROMPT.replace("حرف اولش", "حرف‌های آخرش"),
          baskets: [{ label: "ll" }, { label: "ck" }],
          items: [{ pic: "🔔", say: "bell", basket: "ll" }, { pic: "🦆", say: "duck", basket: "ck" }, { pic: "🪆", say: "doll", basket: "ll" },
            { pic: "🧦", say: "sock", basket: "ck" }, { pic: "⛰️", say: "hill", basket: "ll" }, { pic: "🔒", say: "lock", basket: "ck" }] },
        { type: "build", prompt: "گوش کن و بساز. ck دو حرف است ولی یک صدا دارد.", word: "duck", parts: ["d", "u", "ck"], extra: ["k"], pic: "🦆" },
        { type: "build", prompt: "گوش کن و بساز. ll دو حرف است ولی یک صدا دارد.", word: "bell", parts: ["b", "e", "ll"], extra: ["l"], pic: "🔔" },
        { type: "tip", text: "در آخر کلمه‌های کوتاه، l و s و f معمولاً دوتا نوشته می‌شوند (bell، kiss، off) و صدای «ک» با ck (duck، sock). ولی هنوز یک صداست. با هم کلمه‌های duck، sock، lock، bell و doll را بخوانید و بنویسید." }
      ]
    },
    {
      id: "english-sprout-18", subject: "english", level: "sprout", emoji: "🎲", title: "بازی خواندن ۱",
      steps: [
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["hen", { pic: "🐔", say: "hen" }], ["bus", { pic: "🚌", say: "bus" }], ["fan", { pic: "🪭", say: "fan" }], ["log", { pic: "🪵", say: "log" }]] },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای وسطش مثل cat است یا مثل pin؟ در سبد درست بگذار.",
          baskets: [{ label: "a", pic: "🍎", value: "a" }, { label: "i", pic: "🐛", value: "i" }],
          items: [{ label: "cat", say: "cat", basket: "a" }, { label: "pin", say: "pin", basket: "i" }, { label: "map", say: "map", basket: "a" },
            { label: "big", say: "big", basket: "i" }, { label: "hat", say: "hat", basket: "a" }, { label: "lid", say: "lid", basket: "i" }] },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای وسطش مثل dog است یا مثل sun؟ در سبد درست بگذار.",
          baskets: [{ label: "o", pic: "🐙", value: "o" }, { label: "u", pic: "☂️", value: "u" }],
          items: [{ label: "dog", say: "dog", basket: "o" }, { label: "sun", say: "sun", basket: "u" }, { label: "hot", say: "hot", basket: "o" },
            { label: "cup", say: "cup", basket: "u" }, { label: "pot", say: "pot", basket: "o" }, { label: "bus", say: "bus", basket: "u" }] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "fun", parts: ["f", "u", "n"], extra: ["o"], pic: "🎉" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "leg", parts: ["l", "e", "g"], extra: ["i"], pic: "🦵" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["red", { pic: "🔴", say: "red" }], ["six", { pic: "6️⃣", say: "six" }], ["box", { pic: "📦", say: "box" }], ["web", { pic: "🕸️", say: "web" }]] },
        { type: "tip", text: "این بازی همه حرف‌های تا اینجا را مرور می‌کند. کلمه‌های سه‌حرفی را با هم بخوانید و به صدای وسطشان دقت کنید: cat و cut و cot فقط در صدای وسط فرق دارند. اگر کودک صدای وسط را اشتباه گفت، فقط همان صدا را با هم تکرار کنید." }
      ]
    },
    {
      id: "english-sprout-19", subject: "english", level: "sprout", emoji: "🎂", title: "عددها تا بیست",
      steps: [
        /* Mina asks Reza how old he is; the candles on his cake come one by one as he counts, then he says he's six. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, table: { art: "en-table", at: [80, 90], s: 0.9 },
            cake: { art: "en-cake", at: [80, 71.1], s: 1.1 }, mina: { art: "en-mina", at: [24, 86], s: 1.15 }, reza: { art: "en-reza", at: [136, 86], s: 1.15 },
            ask: { art: "en-ask", at: [32, 50], o: 0 }
          },
          scenes: [
            { caption: "How old are you?", key: 1300, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1200), pop("ask", 400)) },
            { caption: "One, two, three, four, five, six!", key: 3400, hold: 4400, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400),
              pose("reza", "L", "point", 0, 500), talk("reza", 0, 3400), [1, 2, 3, 4, 5, 6].map(function (n) { return { id: "cake.c" + n, to: { o: 1 }, at: 200 + n * 500, dur: 200 }; })) },
            { caption: "I'm six!", key: 625, do: [].concat(pose("reza", "L", "down", 0, 400), jump("reza", 300, 2, 6), face("reza", true, 300), talk("reza", 0, 800)) }
          ] },
        { type: "words", words: [{ dots: 11, en: "eleven" }, { dots: 12, en: "twelve" }, { dots: 13, en: "thirteen" }, { dots: 14, en: "fourteen" }, { dots: 15, en: "fifteen" }] },
        { type: "words", words: [{ dots: 16, en: "sixteen" }, { dots: 17, en: "seventeen" }, { dots: 18, en: "eighteen" }, { dots: 19, en: "nineteen" }, { dots: 20, en: "twenty" }] },
        { type: "listen", say: "fifteen", prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 15, en: "fifteen" }, { dots: 12, en: "twelve" }, { dots: 20, en: "twenty" }], answer: 15 },
        { type: "listen", say: "twelve", quiet: true, prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 11, en: "eleven" }, { dots: 12, en: "twelve" }, { dots: 18, en: "eighteen" }], answer: 12 },
        { type: "listen", say: "twenty", quiet: true, prompt: "گوش کن. چندتا گفت؟", options: [{ dots: 17, en: "seventeen" }, { dots: 13, en: "thirteen" }, { dots: 20, en: "twenty" }], answer: 20 },
        { type: "listen", say: "How old are you? I'm seven.", prompt: "گوش کن. چند سالش است؟", options: [{ dots: 6, en: "six" }, { dots: 7, en: "seven" }, { dots: 8, en: "eight" }], answer: 7 },
        { type: "pairs", prompt: "بشمار و هر عدد را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 11, say: "eleven" }, { dots: 11 }], [{ dots: 14, say: "fourteen" }, { dots: 14 }], [{ dots: 16, say: "sixteen" }, { dots: 16 }], [{ dots: 19, say: "nineteen" }, { dots: 19 }]] },
        { type: "tip", text: "از کودک بپرسید How old are you? تا بگوید I'm six (یا سن خودش). موقع بالا رفتن از پله‌ها یا شمردن قاشق‌ها تا بیست به انگلیسی بشمارید. به teen در آخر عددهای سیزده تا نوزده دقت کنید: thirteen، fourteen، fifteen." }
      ]
    },
    {
      id: "english-sprout-6", subject: "english", level: "sprout", emoji: "🦓", title: "حرف‌های j v w x y z q",
      steps: [
        { type: "letter", letter: "j", like: "ج", words: [{ pic: "🧃", en: "juice" }, { pic: "🧥", en: "jacket" }, { pic: "🤹", en: "juggle" }] },
        { type: "letter", letter: "v", like: "و", words: [{ pic: "🚐", en: "van" }, { pic: "🎻", en: "violin" }, { pic: "🌋", en: "volcano" }] },
        { type: "letter", letter: "w", words: [{ pic: "🍉", en: "watermelon" }, { pic: "🕸️", en: "web" }, { pic: "🌬️", en: "wind" }] },
        { type: "letter", letter: "x", end: true, like: "کس", words: [{ pic: "📦", en: "box" }, { pic: "🦊", en: "fox" }, { pic: "6️⃣", en: "six" }] },
        { type: "letter", letter: "y", like: "ی", words: [{ pic: "🪀", en: "yo-yo" }, { pic: "🧶", en: "yarn" }, { pic: "💛", en: "yellow" }] },
        { type: "letter", letter: "z", like: "ز", words: [{ pic: "🦓", en: "zebra" }, { pic: "0️⃣", en: "zero" }, { pic: "🤐", en: "zip" }] },
        { type: "letter", letter: "q", like: "کو", words: [{ pic: "👸", en: "queen" }, { pic: "❓", en: "question" }, { pic: "🤫", en: "quiet" }] },
        { type: "listen", show: "z", prompt: SOUND_PROMPT, options: [{ pic: "🚐", en: "van" }, { pic: "🦓", en: "zebra" }, { pic: "🧃", en: "juice" }], answer: "🦓" },
        { type: "pairs", prompt: "هر حرف را با تصویری جفت کن که با صدای آن شروع می‌شود",
          pairs: [["j", { pic: "🧥", say: "jacket" }], ["v", { pic: "🎻", say: "violin" }], ["w", { pic: "🕸️", say: "web" }], ["y", { pic: "🧶", say: "yarn" }]] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "fox", parts: ["f", "o", "x"], extra: ["z"], pic: "🦊" },
        { type: "tip", text: "حالا کودک صدای همه حرف‌های انگلیسی را دیده است. x بیشتر در آخر کلمه می‌آید (box، fox، six) و صدایش «کس» است. q تقریباً همیشه با u می‌آید و با هم «کو» خوانده می‌شوند، مثل queen. w در فارسی نیست: لب‌ها را گرد کنید و «و» بگویید. مهم نیست همه را یک‌باره یاد بگیرد؛ این درس بعداً دوباره می‌آید." }
      ]
    },
    {
      id: "english-sprout-20", subject: "english", level: "sprout", emoji: "🚐", title: "دوباره: j v w x",
      steps: [
        { type: "listen", show: "jam", prompt: READ_PROMPT, options: ["🍯", "🚐", "🕸️"], answer: "🍯" },
        { type: "listen", show: "van", quiet: true, prompt: READ_PROMPT, options: ["📦", "🚐", "🦊"], answer: "🚐" },
        { type: "listen", show: "web", quiet: true, prompt: READ_PROMPT, options: ["🕸️", "🍯", "💧"], answer: "🕸️" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "box", parts: ["b", "o", "x"], extra: ["v"], pic: "📦" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "wet", parts: ["w", "e", "t"], extra: ["j"], pic: "💧" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "jam", parts: ["j", "a", "m"], extra: ["w"], pic: "🍯" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["fox", { pic: "🦊", say: "fox" }], ["box", { pic: "📦", say: "box" }], ["van", { pic: "🚐", say: "van" }], ["jam", { pic: "🍯", say: "jam" }]] },
        { type: "tip", text: "کلمه‌های jam، van، web، fox، box و wet را روی کارت بنویسید و پشت هر کارت نقاشی‌اش را بکشید. کودک بخواند و بعد کارت را برگرداند تا ببیند درست خوانده یا نه. صدای w را با لب‌های گرد بگویید؛ با v (لب پایین زیر دندان) فرق دارد." }
      ]
    },
    {
      id: "english-sprout-21", subject: "english", level: "sprout", emoji: "🐝", title: "y، z، qu",
      steps: [
        { type: "letter", letter: "y", like: "ی", words: [{ pic: "👍", en: "yes" }, { pic: "🪀", en: "yo-yo" }, { pic: "💛", en: "yellow" }] },
        { type: "letter", letter: "z", like: "ز", words: [{ pic: "🤐", en: "zip" }, { pic: "🦓", en: "zebra" }, { pic: "0️⃣", en: "zero" }] },
        { type: "letter", letter: "qu", like: "کو", words: [{ pic: "👸", en: "queen" }, { pic: "🦆", en: "quack" }, { pic: "❓", en: "quiz" }] },
        { type: "listen", show: "zip", prompt: READ_PROMPT, options: ["🤐", "👍", "🐝"], answer: "🤐" },
        { type: "listen", show: "buzz", quiet: true, prompt: READ_PROMPT, options: ["🦆", "🐝", "🤐"], answer: "🐝" },
        { type: "build", prompt: "گوش کن و بساز. q همیشه با u می‌آید.", word: "quiz", parts: ["qu", "i", "z"], extra: ["y"], pic: "❓" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "yet", parts: ["y", "e", "t"], extra: ["z"], pic: "⏳" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["zip", { pic: "🤐", say: "zip" }], ["buzz", { pic: "🐝", say: "buzz" }], ["quick", { pic: "🐇", say: "quick" }], ["yes", { pic: "👍", say: "yes" }]] },
        { type: "tip", text: "حالا کودک صدای همه حرف‌ها را می‌داند. qu با هم «کو» خوانده می‌شود (queen، quick). y در اول کلمه مثل «ی» است (yes). بازی buzz کنید: هر بار کلمه‌ای با صدای «ززز» شنیدید، مثل زنبور وزوز کنید!" }
      ]
    },
    {
      id: "english-sprout-7", subject: "english", level: "sprout", emoji: "🔠", title: "حرف بزرگ، حرف کوچک",
      steps: [
        { type: "pairs", prompt: "هر حرف بزرگ را با حرف کوچکش جفت کن. این‌ها شبیه هم‌اند.",
          pairs: [["S", "s"], ["C", "c"], ["O", "o"], ["W", "w"]] },
        { type: "pairs", prompt: "هر حرف بزرگ را با حرف کوچکش جفت کن. این‌ها شکلشان فرق دارد.",
          pairs: [["A", "a"], ["B", "b"], ["D", "d"], ["G", "g"]] },
        { type: "listen", show: "E", prompt: "این حرف بزرگ است. حرف کوچکش کدام است؟",
          options: [{ label: "a" }, { label: "e" }, { label: "c" }], answer: "e" },
        { type: "listen", show: "R", quiet: true, prompt: "این حرف بزرگ است. حرف کوچکش کدام است؟",
          options: [{ label: "n" }, { label: "p" }, { label: "r" }], answer: "r" },
        { type: "sort", prompt: "حرف‌های بزرگ را در سبد فیل و حرف‌های کوچک را در سبد موش بگذار",
          baskets: [{ pic: "🐘", label: "A B C", value: "big" }, { pic: "🐭", label: "a b c", value: "small" }],
          items: [{ label: "M", basket: "big" }, { label: "m", basket: "small" }, { label: "H", basket: "big" }, { label: "h", basket: "small" },
            { label: "T", basket: "big" }, { label: "t", basket: "small" }] },
        { type: "sort", prompt: "حرف b بزرگ و کوچک را در یک سبد بگذار و حرف d بزرگ و کوچک را در سبد دیگر",
          baskets: [{ label: "B b", value: "b" }, { label: "D d", value: "d" }],
          items: [{ label: "B", basket: "b" }, { label: "d", basket: "d" }, { label: "b", basket: "b" }, { label: "D", basket: "d" },
            { label: "b", basket: "b" }, { label: "d", basket: "d" }] },
        { type: "listen", show: "👧", say: "Sara", prompt: "اسم‌ها با حرف بزرگ شروع می‌شوند. کدام درست نوشته شده است؟",
          options: [{ label: "sara", en: "Sara" }, { label: "Sara", en: "Sara" }], answer: "Sara" },
        { type: "listen", show: "👦", say: "Reza", quiet: true, prompt: "اسم‌ها با حرف بزرگ شروع می‌شوند. کدام درست نوشته شده است؟",
          options: [{ label: "Reza", en: "Reza" }, { label: "reza", en: "Reza" }], answer: "Reza" },
        { type: "tip", text: "هر حرف انگلیسی دو شکل دارد: بزرگ و کوچک. بیشتر کلمه‌ها با حرف کوچک نوشته می‌شوند؛ حرف بزرگ اول اسم‌ها و اول جمله می‌آید. اسم کودک را با حروف انگلیسی بنویسید تا ببیند اولش حرف بزرگ است. b و d را بچه‌ها زیاد با هم اشتباه می‌کنند؛ این طبیعی است و با تمرین درست می‌شود." }
      ]
    },
    {
      id: "english-sprout-22", subject: "english", level: "sprout", emoji: "🔤", title: "الفبا",
      steps: [
        /* Our own alphabet chant: the letters come one after another, left to right, as their names are said. */
        { type: "scene", prompt: "گوش کن و اسم حرف‌ها را با او بگو", bg: "#fffaf0",
          parts: Object.assign.apply(null, [{}].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function (ch, i) {
            var row = i < 7 ? 0 : i < 16 ? 1 : i < 22 ? 2 : 3, col = [0, 7, 16, 22][row], n = [7, 9, 6, 4][row];
            var o = {}; o[ch] = { art: ch, at: [80 + (i - col - (n - 1) / 2) * 15, 24 + row * 20], o: 0 };
            return o;
          }))),
          scenes: [["A, B, C, D, E, F, G,", 0, 7], ["H, I, J, K, L, M, N, O, P,", 7, 16], ["Q, R, S, T, U, V,", 16, 22], ["W, X, Y and Z!", 22, 26],
            ["A to Z! That's my alphabet!", 0, 0]].map(function (b) {
            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            return { caption: b[0], hold: 3600, do: b[2] ? letters.slice(b[1], b[2]).map(function (ch, i) {
              return [{ id: ch, to: { o: 1, s: 1.3 }, at: i * 450, dur: 300, ease: "back" }, { id: ch, to: { s: 1 }, at: i * 450 + 320, dur: 300 }];
            }).reduce(function (a, b) { return a.concat(b); }, []) : letters.map(function (ch, i) { return { id: ch, to: { y: "-3" }, at: i * 60, dur: 500, yoyo: true, times: 2 }; }) };
          }) },
        { type: "listen", say: "B", prompt: "گوش کن. اسم کدام حرف است؟", options: [{ label: "D" }, { label: "B" }, { label: "P" }], answer: "B" },
        { type: "listen", say: "G", quiet: true, prompt: "گوش کن. اسم کدام حرف است؟", options: [{ label: "J" }, { label: "G" }, { label: "Z" }], answer: "G" },
        { type: "listen", say: "S, A, R, A. Sara.", prompt: "گوش کن. اسم چه کسی را هجی می‌کند؟", options: [{ label: "Reza" }, { label: "Mina" }, { label: "Sara" }], answer: "Sara" },
        { type: "order", prompt: "حرف‌ها را به ترتیب الفبا بچین", ltr: true, items: ["A", "B", "C", "D", "E"] },
        { type: "order", prompt: "گوش کن و اسم را حرف به حرف بچین", ltr: true, say: "R, E, Z, A. Reza.", items: ["R", "E", "Z", "A"] },
        { type: "tip", text: "حرف‌ها دو چیز دارند: صدا (برای خواندن) و اسم (برای هجی کردن و الفبا). شعر الفبا را با هم بخوانید و کودک اسمش را به انگلیسی هجی کند: S-A-R-A. وقتی کسی اسمی را هجی می‌کند، کودک با شنیدن اسم حرف‌ها آن را بنویسد." }
      ]
    },
    {
      id: "english-sprout-8", subject: "english", level: "sprout", emoji: "⭐", title: "کلمه‌های پرکاربرد",
      steps: [
        /* Sara sees a big dog, then her small cat, which jumps into a box: big, see, my and in are all shown. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, boxB: { art: "en-box-back", at: [130, 86], s: 1.2, o: 0 },
            cat: { art: "en-cat", at: [186, 86], s: 1.4, flip: true }, boxF: { art: "en-box-front", at: [130, 86], s: 1.2, o: 0 },
            dog: { art: "en-dog", at: [200, 86], s: 1.7, flip: true }, sara: { art: "en-sara", at: [26, 86], s: 1.15 }
          },
          scenes: [
            { caption: "I see a dog.", do: [].concat(trot("dog", 104, 0, 1600), pose("sara", "R", "point", 900, 500),
              [{ id: "sara.eyes", to: { x: 0.7 }, at: 900, dur: 300 }], talk("sara", 0, 1200)) },
            { caption: "The dog is big.", key: 1500, do: [].concat(pose("sara", "R", "big", 0, 600), pose("sara", "L", "big", 0, 600),
              [{ id: "sara.eyes", to: { y: -0.5 }, dur: 300 }, { id: "dog.head", to: { r: -10 }, at: 300, dur: 400 },
                { id: "dog.tail", to: { r: 25 }, at: 300, dur: 2000, yoyo: true, times: 8 }], talk("sara", 0, 1300)) },
            { caption: "I see my cat.", do: [].concat(pose("sara", "R", "down", 0, 400), pose("sara", "L", "down", 0, 400), [
              { id: "sara.eyes", to: { y: 0 }, dur: 300 }, { id: "dog.head", to: { r: 0 }, dur: 300 }, { id: "dog", to: { flip: 1 }, at: 100, dur: 300 }
            ], trot("dog", 215, 400, 1300), [
              { id: "boxB", to: { o: 1 }, at: 300, dur: 500 }, { id: "boxF", to: { o: 1 }, at: 300, dur: 500 },
              { id: "cat", path: "M186 86Q140 56 96 86", at: 1300, dur: 900, ease: "out" }
            ], pose("sara", "R", "point", 1900, 500), talk("sara", 0, 1200)) },
            { caption: "My cat is in a box.", do: [].concat([{ id: "cat", path: "M96 86Q112 42 130 79", at: 200, dur: 900 }], talk("sara", 0, 1500)) }
          ] },
        { type: "listen", say: "the", prompt: "گوش کن و این کلمه را پیدا کن",
          options: [{ label: "see" }, { label: "the" }, { label: "my" }], answer: "the" },
        { type: "listen", say: "my", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن",
          options: [{ label: "my" }, { label: "is" }, { label: "I" }], answer: "my" },
        { type: "listen", say: "see", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن",
          options: [{ label: "a" }, { label: "the" }, { label: "see" }], answer: "see" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "the", parts: ["t", "h", "e"], extra: ["s"] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "see", parts: ["s", "e", "e"], extra: ["a"], pic: "👀" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["the sun", "🌞"], ["my bed", "🛏️"], ["I see a fox.", "🦊"], ["The bus is red.", "🚌"]] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I see my cat.", items: ["I", "see", "my", "cat."] },
        { type: "tip", text: "بعضی کلمه‌ها مثل I، a، the، is، see و my در هر جمله‌ای می‌آیند و بهتر است کودک آن‌ها را با یک نگاه بشناسد، نه حرف به حرف. هر کدام را روی یک کارت بنویسید و هر روز چند بار با هم بخوانید. در کتاب یا روی بسته‌ها هم دنبال the بگردید." }
      ]
    },
    {
      id: "english-sprout-9", subject: "english", level: "sprout", emoji: "🐑", title: "sh، ch، th",
      steps: [
        { type: "letter", letter: "sh", like: "ش", words: [{ pic: "🐑", en: "sheep" }, { pic: "👟", en: "shoe" }, { pic: "🚢", en: "ship" }] },
        { type: "letter", letter: "ch", like: "چ", words: [{ pic: "🐥", en: "chick" }, { pic: "🧀", en: "cheese" }, { pic: "🪑", en: "chair" }] },
        { type: "letter", letter: "th", words: [{ pic: "👍", en: "thumb" }, { pic: "🤔", en: "think" }, { pic: "⚡", en: "thunder" }] },
        { type: "listen", show: "sh", prompt: SOUND_PROMPT, options: [{ pic: "🐥", en: "chick" }, { pic: "🚢", en: "ship" }, { pic: "👍", en: "thumb" }], answer: "🚢" },
        { type: "sort", prompt: SORT_PROMPT,
          baskets: [{ label: "sh" }, { label: "ch" }],
          items: [{ pic: "🐑", say: "sheep", basket: "sh" }, { pic: "🧀", say: "cheese", basket: "ch" }, { pic: "👟", say: "shoe", basket: "sh" },
            { pic: "🪑", say: "chair", basket: "ch" }, { pic: "🚢", say: "ship", basket: "sh" }, { pic: "🐥", say: "chick", basket: "ch" }] },
        { type: "build", prompt: "گوش کن و این کلمه را بساز. دو حرف sh با هم یک صدا هستند.", word: "fish", parts: ["f", "i", "sh"], extra: ["ch"], pic: "🐟" },
        { type: "build", prompt: "گوش کن و این کلمه را بساز. دو حرف th با هم یک صدا هستند.", word: "bath", parts: ["b", "a", "th"], extra: ["sh"], pic: "🛁" },
        { type: "listen", show: "shop", prompt: READ_PROMPT, options: ["🐑", "🏪", "🧀"], answer: "🏪" },
        { type: "tip", text: "گاهی دو حرف با هم یک صدا می‌سازند: sh مثل «ش»، ch مثل «چ». صدای th در فارسی نیست: نوک زبان را آرام بین دندان‌ها بگذارید و فوت کنید. اگر کودک آن را «س» یا «ت» گفت، اشکالی ندارد؛ فقط درستش را یک بار با هم بگویید و بخندید." }
      ]
    },
    {
      id: "english-sprout-23", subject: "english", level: "sprout", emoji: "💍", title: "ng و nk",
      steps: [
        { type: "letter", letter: "ng", end: true, words: [{ pic: "💍", en: "ring" }, { pic: "👑", en: "king" }, { pic: "🎤", en: "sing" }] },
        { type: "letter", letter: "nk", end: true, words: [{ pic: "🌸", en: "pink" }, { pic: "🏦", en: "bank" }, { pic: "😉", en: "wink" }] },
        { type: "listen", show: "king", prompt: READ_PROMPT, options: ["💍", "👑", "🏦"], answer: "👑" },
        { type: "listen", show: "pink", quiet: true, prompt: READ_PROMPT, options: ["🌸", "🎤", "😉"], answer: "🌸" },
        { type: "sort", prompt: SORT_PROMPT.replace("حرف اولش", "حرف‌های آخرش"),
          baskets: [{ label: "ng" }, { label: "nk" }],
          items: [{ pic: "💍", say: "ring", basket: "ng" }, { pic: "🏦", say: "bank", basket: "nk" }, { pic: "👑", say: "king", basket: "ng" },
            { pic: "🌸", say: "pink", basket: "nk" }, { pic: "🎤", say: "sing", basket: "ng" }, { pic: "🤔", say: "think", basket: "nk" }] },
        { type: "build", prompt: "گوش کن و بساز. ng دو حرف است ولی یک صدا دارد.", word: "ring", parts: ["r", "i", "ng"], extra: ["nk"], pic: "💍" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "pink", parts: ["p", "i", "nk"], extra: ["ng"], pic: "🌸" },
        { type: "tip", text: "ng در آخر کلمه صدایی تودماغی دارد، مثل آخر ring و sing (نه «رینگ» با «گ» محکم). nk مثل «نک» است: pink، bank. کلمه‌های ring، king، sing، pink و think را با هم بخوانید و یک بار آهسته، صدا به صدا بگویید." }
      ]
    },
    {
      id: "english-sprout-10", subject: "english", level: "sprout", emoji: "✏️", title: "نوشتن حرف‌ها",
      steps: [
        { type: "trace", letter: "c", say: "cat", prompt: "c را بنویس: از بالا، سمت راست، شروع کن و به چپ دور بزن." },
        { type: "trace", letter: "a", say: "apple", prompt: "a را بنویس: اول همان c، بعد یک خط از بالا به پایین کنارش." },
        { type: "trace", letter: "d", say: "dog", prompt: "d را بنویس: اول همان c، بعد یک خط بلند از بالا تا روی خط." },
        { type: "trace", letter: "l", say: "lion", prompt: "l را بنویس: یک خط بلند، از بالا به پایین." },
        { type: "trace", letter: "t", say: "tent", prompt: "t را بنویس: اول خط از بالا به پایین، بعد یک خط کوتاه از چپ به راست روی آن." },
        { type: "trace", letter: "n", say: "nose", prompt: "n را بنویس: اول خط پایین، بعد از همان خط بالا برو و یک پل بساز." },
        { type: "trace", letter: "s", say: "sun", prompt: "s را بنویس: از بالا، سمت راست، شروع کن و مثل مار پیچ‌وتاب بخور و پایین بیا." },
        { type: "tip", text: "حرف‌های انگلیسی از چپ به راست و بیشترشان از بالا نوشته می‌شوند. در دفتر چهارخط یا روی کاغذ خط‌دار، هر روز چند حرف را با هم بنویسید: c و a و d که با یک دایره شروع می‌شوند، خط‌های بلند مثل l و t، و پل‌ها مثل n و h. هر حرف را که می‌نویسد، صدایش را هم بگوید." }
      ]
    },
    {
      id: "english-sprout-11", subject: "english", level: "sprout", emoji: "📝", title: "نوشتن کلمه‌ها",
      steps: [
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "cat", parts: ["c", "a", "t"], extra: ["d"], pic: "🐱" },
        { type: "trace", letter: "c", say: "cat", prompt: "حالا cat را حرف به حرف بنویس. اول c را بنویس." },
        { type: "trace", letter: "a", prompt: "بعد a را بنویس." },
        { type: "trace", letter: "t", say: "cat", prompt: "آخر از همه t را بنویس. تو cat را نوشتی!" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "sun", parts: ["s", "u", "n"], extra: ["m"], pic: "🌞" },
        { type: "trace", letter: "s", say: "sun", prompt: "حالا sun را حرف به حرف بنویس. اول s را بنویس." },
        { type: "trace", letter: "u", prompt: "بعد u را بنویس." },
        { type: "trace", letter: "n", say: "sun", prompt: "آخر از همه n را بنویس. تو sun را نوشتی!" },
        { type: "tip", text: "کلمه‌ای را بلند بگویید، مثل bed، و کودک اول صداهایش را جدا بگوید (ب… اِ… د) و بعد روی کاغذ حرف به حرف بنویسد، از چپ به راست. بین حرف‌ها فاصله زیاد نگذارد. اگر حرفی را برعکس نوشت، مثل b و d، شکل درستش را کنارش بنویسید و با هم مقایسه کنید." }
      ]
    },

    {
      id: "english-sprout-24", subject: "english", level: "sprout", emoji: "🎲", title: "بازی دو حرف، یک صدا",
      steps: [
        { type: "sort", prompt: SORT_PROMPT.replace("حرف اولش", "دو حرف اولش"),
          baskets: [{ label: "sh" }, { label: "ch" }, { label: "th" }],
          items: [{ pic: "🚢", say: "ship", basket: "sh" }, { pic: "🐥", say: "chick", basket: "ch" }, { pic: "👍", say: "thumb", basket: "th" },
            { pic: "🐑", say: "sheep", basket: "sh" }, { pic: "🧀", say: "cheese", basket: "ch" }, { pic: "🤔", say: "think", basket: "th" }] },
        { type: "sort", prompt: SORT_PROMPT.replace("حرف اولش", "دو حرف آخرش"),
          baskets: [{ label: "ng" }, { label: "ck" }],
          items: [{ pic: "💍", say: "ring", basket: "ng" }, { pic: "🦆", say: "duck", basket: "ck" }, { pic: "👑", say: "king", basket: "ng" },
            { pic: "🧦", say: "sock", basket: "ck" }, { pic: "🎤", say: "sing", basket: "ng" }, { pic: "🔒", say: "lock", basket: "ck" }] },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["fish", { pic: "🐟", say: "fish" }], ["chin", { pic: "🧔", say: "chin" }], ["bath", { pic: "🛁", say: "bath" }], ["ring", { pic: "💍", say: "ring" }]] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "shop", parts: ["sh", "o", "p"], extra: ["ch"], pic: "🏪" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "chick", parts: ["ch", "i", "ck"], extra: ["sh"], pic: "🐥" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "moth", parts: ["m", "o", "th"], extra: ["sh"], pic: "🦋" },
        { type: "tip", text: "این بازی همه «دو حرف، یک صدا»ها را مرور می‌کند: sh، ch، th، ng و ck. کارت‌هایی با این دو حرف‌ها بسازید؛ یکی را نشان بدهید و کودک صدایش و یک کلمه با آن را بگوید." }
      ]
    },
    {
      id: "english-sprout-25", subject: "english", level: "sprout", emoji: "🏫", title: "مدرسه",
      steps: [
        /* In class Mina asks Arman for a pencil (he has one and gives it), then a rubber (he hasn't: he shakes his head
           and shows empty hands); the teacher points to the board. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f3ead8",
          parts: {
            room: { art: "en-classroom" }, teacher: { art: "en-teacher", at: [18, 86], s: 0.95 },
            mina: { art: "en-mina", at: [62, 86], s: 1.15 }, kid: { art: "en-arman", at: [124, 86], s: 1.15 },
            pencil: { art: "✏️", at: inHand("en-arman", [124, 86], 1.15, "L", "point", 0.6), s: 0.6, o: 0 },
            ask: { art: "en-ask", at: [70, 50], o: 0 }
          },
          scenes: [
            { caption: "Have you got a pencil?", key: 1600, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1800), pop("ask", 600)) },
            { caption: "Yes, I have. Here you are.", key: 2600, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], nod("kid", 0), talk("kid", 0, 2200),
              pose("kid", "L", "point", 900, 500), [{ id: "pencil", to: { o: 1 }, at: 1300, dur: 200 },
                arc("pencil", inHand("en-arman", [124, 86], 1.15, "L", "point", 0.6), inHand("en-mina", [62, 86], 1.15, "R", "ask", 0.6), 1700, 900, 6)],
              pose("kid", "L", "down", 2700, 400)) },
            { caption: "Thank you! Have you got a rubber?", key: 2200, do: [].concat(talk("mina", 0, 2600), pop("ask", 1400)) },
            { caption: "No, I haven't.", key: 1400, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], shake("kid", 0), talk("kid", 0, 1300),
              pose("kid", "L", "ask", 300, 500), pose("kid", "R", "ask", 300, 500)) },
            { caption: "Look at the board, please.", key: 1500, do: [].concat(pose("kid", "L", "down", 0, 400), pose("kid", "R", "down", 0, 400), pose("teacher", "R", "pointUp", 200, 500),
              talk("teacher", 200, 1600), [{ id: "mina.eyes", to: { y: -0.7 }, at: 600, dur: 300 }, { id: "kid.eyes", to: { y: -0.7 }, at: 600, dur: 300 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "✏️", en: "pencil" }, { art: "en-rubber", en: "rubber" }, { pic: "📏", en: "ruler" }, { art: "en-desk", en: "desk" }, { pic: "🟩", en: "board" }, { pic: "👨‍🏫", en: "teacher" }] },
        { type: "listen", say: "a ruler", prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ pic: "✏️", en: "pencil" }, { pic: "📏", en: "ruler" }, { art: "en-rubber", value: "rubber", en: "rubber" }], answer: "📏" },
        { type: "listen", say: "a rubber", quiet: true, prompt: "گوش کن و تصویرش را پیدا کن",
          options: [{ art: "en-rubber", value: "rubber", en: "rubber" }, { pic: "🟩", en: "board" }, { pic: "📏", en: "ruler" }], answer: "rubber" },
        { type: "listen", show: "🎒✏️", say: "Have you got a pencil?", prompt: "در کیف تو مداد هست. گوش کن و جواب بده.",
          options: [{ pic: "👍", en: "Yes, I have.", value: "yes" }, { pic: "👎", en: "No, I haven't.", value: "no" }], answer: "yes" },
        { type: "listen", show: "🎒", say: "Have you got a ruler?", quiet: true, prompt: "در کیف تو خط‌کش نیست. گوش کن و جواب بده.",
          options: [{ pic: "👍", en: "Yes, I have.", value: "yes" }, { pic: "👎", en: "No, I haven't.", value: "no" }], answer: "no" },
        { type: "tip", text: "وسایل مدرسه کودک را روی میز بچینید و بپرسید Have you got a pencil? کودک نگاه کند و جواب بدهد Yes, I have یا No, I haven't. بعد کودک بپرسد. در انگلیسی بریتانیا به پاک‌کن rubber می‌گویند و در آمریکا eraser." }
      ]
    },
    {
      id: "english-sprout-26", subject: "english", level: "sprout", emoji: "🌧️", title: "ai و ee",
      steps: [
        { type: "letter", letter: "ai", inside: true, like: "اِی", words: [{ pic: "🌧️", en: "rain" }, { pic: "🐒", en: "tail" }, { pic: "🐌", en: "snail" }] },
        { type: "letter", letter: "ee", inside: true, like: "ای", words: [{ pic: "🌳", en: "tree" }, { pic: "🦶", en: "feet" }, { pic: "🐑", en: "sheep" }] },
        { type: "listen", show: "rain", prompt: READ_PROMPT, options: ["🌳", "🌧️", "🦶"], answer: "🌧️" },
        { type: "listen", show: "feet", quiet: true, prompt: READ_PROMPT, options: ["🦶", "🐌", "🌧️"], answer: "🦶" },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. صدای ai دارد یا ee؟",
          baskets: [{ label: "ai" }, { label: "ee" }],
          items: [{ pic: "🌧️", say: "rain", basket: "ai" }, { pic: "🌳", say: "tree", basket: "ee" }, { pic: "🐌", say: "snail", basket: "ai" },
            { pic: "🐑", say: "sheep", basket: "ee" }, { pic: "⏳", say: "wait", basket: "ai" }, { pic: "👀", say: "see", basket: "ee" }] },
        { type: "build", prompt: "گوش کن و بساز. ai با هم یک صداست.", word: "rain", parts: ["r", "ai", "n"], extra: ["ee"], pic: "🌧️" },
        { type: "build", prompt: "گوش کن و بساز. ee با هم یک صداست.", word: "feet", parts: ["f", "ee", "t"], extra: ["ai"], pic: "🦶" },
        { type: "tip", text: "از این درس مصوت‌های دوحرفی شروع می‌شود: ai مثل «اِی» در rain، ee مثل «ای» کشیده در tree. وقتی کودک کلمه‌ای می‌خواند، اول دنبال این دو حرف‌ها بگردد و آن‌ها را با هم یک صدا بخواند." }
      ]
    },
    {
      id: "english-sprout-27", subject: "english", level: "sprout", emoji: "⛵", title: "igh و oa",
      steps: [
        { type: "letter", letter: "igh", inside: true, like: "آی", words: [{ pic: "🌙", en: "night" }, { pic: "💡", en: "light" }, { pic: "⬆️", en: "high" }] },
        { type: "letter", letter: "oa", inside: true, like: "اُو", words: [{ pic: "⛵", en: "boat" }, { pic: "🧥", en: "coat" }, { pic: "🐐", en: "goat" }] },
        { type: "listen", show: "goat", prompt: READ_PROMPT, options: ["⛵", "🐐", "🌙"], answer: "🐐" },
        { type: "listen", show: "light", quiet: true, prompt: READ_PROMPT, options: ["💡", "🧥", "⬆️"], answer: "💡" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["night", { pic: "🌙", say: "night" }], ["boat", { pic: "⛵", say: "boat" }], ["coat", { pic: "🧥", say: "coat" }], ["high", { pic: "⬆️", say: "high" }]] },
        { type: "build", prompt: "گوش کن و بساز. igh سه حرف است ولی یک صدا دارد.", word: "night", parts: ["n", "igh", "t"], extra: ["oa"], pic: "🌙" },
        { type: "build", prompt: "گوش کن و بساز. oa با هم یک صداست.", word: "goat", parts: ["g", "oa", "t"], extra: ["igh"], pic: "🐐" },
        { type: "tip", text: "igh سه حرف است ولی یک صدا دارد: «آی» در night و light. oa مثل «اُو» در boat و coat است. جمله‌ای مثل A goat in a boat at night را با هم بخوانید و نقاشی‌اش را بکشید." }
      ]
    },
    {
      id: "english-sprout-28", subject: "english", level: "sprout", emoji: "🌙", title: "oo بلند، oo کوتاه",
      steps: [
        { type: "letter", letter: "oo", inside: true, like: "او", say: "moon. food. zoo.", words: [{ pic: "🌙", en: "moon" }, { pic: "🍲", en: "food" }, { pic: "🦁", en: "zoo" }] },
        { type: "letter", letter: "oo", inside: true, say: "book. look. foot.", words: [{ pic: "📖", en: "book" }, { pic: "👀", en: "look" }, { pic: "🦶", en: "foot" }] },
        { type: "listen", show: "moon", prompt: READ_PROMPT, options: ["🌙", "📖", "🦶"], answer: "🌙" },
        { type: "listen", show: "book", quiet: true, prompt: READ_PROMPT, options: ["🦁", "📖", "🍲"], answer: "📖" },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. oo آن بلند است مثل moon، یا کوتاه مثل book؟",
          baskets: [{ pic: "🌙", label: "moon", value: "long" }, { pic: "📖", label: "book", value: "short" }],
          items: [{ pic: "🍲", say: "food", basket: "long" }, { pic: "👀", say: "look", basket: "short" }, { pic: "🦁", say: "zoo", basket: "long" },
            { pic: "🦶", say: "foot", basket: "short" }, { pic: "🥄", say: "spoon", basket: "long" }, { pic: "🪵", say: "wood", basket: "short" }] },
        { type: "tip", text: "oo دو جور خوانده می‌شود: بلند مثل «او» در moon و food، و کوتاه مثل book و look. اگر کودک یکی را اشتباه خواند، بپرسید «آن یکی را امتحان کن؛ کدام کلمه آشناست؟» این‌طور یاد می‌گیرد هر دو را امتحان کند." }
      ]
    },
    {
      id: "english-sprout-29", subject: "english", level: "sprout", emoji: "⭐", title: "کلمه‌های پرکاربرد ۲",
      steps: [
        { type: "listen", say: "she", prompt: "این‌ها کلمه‌های تصویری‌اند. گوش کن و این کلمه را پیدا کن.",
          options: [{ label: "he" }, { label: "she" }, { label: "we" }], answer: "she" },
        { type: "listen", say: "they", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.", options: [{ label: "they" }, { label: "you" }, { label: "all" }], answer: "they" },
        { type: "listen", say: "was", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.", options: [{ label: "are" }, { label: "her" }, { label: "was" }], answer: "was" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["he", "👦"], ["she", "👧"], ["we", "👨‍👩‍👧"], ["me", "🙋"]] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "He is my dad.", items: ["He", "is", "my", "dad."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "We are all in the van.", items: ["We", "are", "all", "in", "the", "van."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "You can see her.", items: ["You", "can", "see", "her."] },
        { type: "tip", text: "این کلمه‌ها (he، she، we، me، be، was، you، they، all، are، her) را روی کارت بنویسید. هر روز سه چهار کارت را مثل بازی «زود بگو» نشان بدهید. کارت‌هایی را که کودک زود خواند کنار بگذارید و بقیه را فردا دوباره بازی کنید." }
      ]
    },
    {
      id: "english-sprout-30", subject: "english", level: "sprout", emoji: "🐐", title: "قصه: بز در قایق",
      steps: [
        { type: "passage", prompt: "قصه را بخوان. اگر کلمه‌ای سخت بود، صدا به صدا بخوان.",
          text: "A goat is in a boat. The goat has a red coat. It can see a fish. The fish can see the goat!",
          question: "بز چه رنگ کتی دارد؟", options: ["🔴", "🔵", "🟢"], answer: "🔴" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "A goat is in a boat. The goat has a red coat. It can see a fish. The fish can see the goat!",
          question: "بز چه چیزی می‌بیند؟", options: ["🐟", "🐱", "🐦"], answer: "🐟" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "Rain! The goat and the fish get wet. The goat is sad. Then the sun is up. The goat is not sad.",
          question: "وقتی باران آمد، بز چه حالی داشت؟", options: ["😊", "😢", "😴"], answer: "😢" },
        { type: "passage", prompt: "بقیه قصه را دوباره بخوان",
          text: "Rain! The goat and the fish get wet. The goat is sad. Then the sun is up. The goat is not sad.",
          question: "آخر قصه چه شد؟", options: ["🌧️", "☀️", "🌙"], answer: "☀️" },
        { type: "tip", text: "قصه را با هم بخوانید: کودک یک جمله، شما یک جمله. بعد بپرسید «بز کجا بود؟» تا به فارسی یا انگلیسی جواب بدهد. اگر کلمه‌ای را نتوانست بخواند، به دو حرف‌های آشنا اشاره کنید: oa در goat و boat، ai در rain." }
      ]
    },
    {
      id: "english-sprout-31", subject: "english", level: "sprout", emoji: "⭐", title: "ar و or",
      steps: [
        { type: "letter", letter: "ar", inside: true, like: "آر", words: [{ pic: "🚗", en: "car" }, { pic: "⭐", en: "star" }, { pic: "🚜", en: "farm" }] },
        { type: "letter", letter: "or", inside: true, like: "اُ", words: [{ pic: "🍴", en: "fork" }, { pic: "🌽", en: "corn" }, { pic: "🐴", en: "horse" }] },
        { type: "listen", show: "star", prompt: READ_PROMPT, options: ["🍴", "⭐", "🐴"], answer: "⭐" },
        { type: "listen", show: "corn", quiet: true, prompt: READ_PROMPT, options: ["🌽", "🚗", "🚜"], answer: "🌽" },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. ar دارد یا or؟",
          baskets: [{ label: "ar" }, { label: "or" }],
          items: [{ pic: "🚗", say: "car", basket: "ar" }, { pic: "🍴", say: "fork", basket: "or" }, { pic: "🚜", say: "farm", basket: "ar" },
            { pic: "🐴", say: "horse", basket: "or" }, { pic: "🦈", say: "shark", basket: "ar" }, { pic: "🌽", say: "corn", basket: "or" }] },
        { type: "build", prompt: "گوش کن و بساز. ar با هم یک صداست.", word: "car", parts: ["c", "ar"], extra: ["or"], pic: "🚗" },
        { type: "build", prompt: "گوش کن و بساز. or با هم یک صداست.", word: "fork", parts: ["f", "or", "k"], extra: ["ar"], pic: "🍴" },
        { type: "tip", text: "ar مثل «آ»ی کشیده در car و star است، و or مثل «اُ»ی کشیده در fork و corn. در انگلیسی بریتانیا r بعد از این‌ها تقریباً شنیده نمی‌شود. با هم کلمه بازی کنید: «یک ماشین (car) زیر ستاره (star) در مزرعه (farm)»." }
      ]
    },
    {
      id: "english-sprout-32", subject: "english", level: "sprout", emoji: "🐮", title: "ur، ow، oi",
      steps: [
        { type: "letter", letter: "ur", inside: true, words: [{ pic: "🐻", en: "fur" }, { pic: "🔥", en: "burn" }, { pic: "🔄", en: "turn" }] },
        { type: "letter", letter: "ow", inside: true, like: "آو", words: [{ pic: "🐮", en: "cow" }, { pic: "🏘️", en: "town" }, { pic: "🦉", en: "owl" }] },
        { type: "letter", letter: "oi", inside: true, like: "اُی", words: [{ pic: "🪙", en: "coin" }, { pic: "🛢️", en: "oil" }, { pic: "🫖", en: "boil" }] },
        { type: "listen", show: "cow", prompt: READ_PROMPT, options: ["🪙", "🐮", "🔥"], answer: "🐮" },
        { type: "listen", show: "coin", quiet: true, prompt: READ_PROMPT, options: ["🪙", "🦉", "🏘️"], answer: "🪙" },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. ow دارد یا oi؟",
          baskets: [{ label: "ow" }, { label: "oi" }],
          items: [{ pic: "🐮", say: "cow", basket: "ow" }, { pic: "🪙", say: "coin", basket: "oi" }, { pic: "🦉", say: "owl", basket: "ow" },
            { pic: "🛢️", say: "oil", basket: "oi" }, { pic: "🏘️", say: "town", basket: "ow" }, { pic: "🫖", say: "boil", basket: "oi" }] },
        { type: "tip", text: "سه صدای تازه: ur (fur، burn)، ow مثل «آو» (cow، town) و oi مثل «اُی» (coin، oil). صدای ur در فارسی نیست؛ دهان را کمی باز و زبان را آرام نگه دارید. اشکالی ندارد اگر کودک هنوز آن را کامل درست نمی‌گوید." }
      ]
    },
    {
      id: "english-sprout-33", subject: "english", level: "sprout", emoji: "👂", title: "ear، air، er",
      steps: [
        { type: "letter", letter: "ear", inside: true, like: "ایر", words: [{ pic: "👂", en: "ear" }, { pic: "🧔", en: "beard" }, { pic: "😢", en: "tear" }] },
        { type: "letter", letter: "air", inside: true, like: "اِر", words: [{ pic: "💇", en: "hair" }, { pic: "🪑", en: "chair" }, { pic: "🎡", en: "fair" }] },
        { type: "letter", letter: "er", inside: true, words: [{ pic: "👧", en: "sister" }, { pic: "✉️", en: "letter" }, { pic: "🪜", en: "ladder" }] },
        { type: "listen", show: "chair", prompt: READ_PROMPT, options: ["👂", "🪑", "✉️"], answer: "🪑" },
        { type: "listen", show: "letter", quiet: true, prompt: READ_PROMPT, options: ["✉️", "💇", "🧔"], answer: "✉️" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["ear", { pic: "👂", say: "ear" }], ["hair", { pic: "💇", say: "hair" }], ["sister", { pic: "👧", say: "sister" }], ["ladder", { pic: "🪜", say: "ladder" }]] },
        { type: "tip", text: "ear مثل «ایر» در ear و hear، air مثل «اِر» در hair و chair، و er در آخر کلمه‌ها صدایی کوتاه و آرام دارد (sister، letter). یک بازی: به چیزی اشاره کنید (گوش، مو، صندلی) و کودک اسم انگلیسی‌اش را بگوید و حرف‌های صدادارش را نشان بدهد." }
      ]
    },
    {
      id: "english-sprout-34", subject: "english", level: "sprout", emoji: "🎲", title: "بازی صداهای دوحرفی",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن و آن را در سبد صدایش بگذار",
          baskets: [{ label: "ai" }, { label: "ee" }, { label: "oa" }],
          items: [{ pic: "🌧️", say: "rain", basket: "ai" }, { pic: "🌳", say: "tree", basket: "ee" }, { pic: "⛵", say: "boat", basket: "oa" },
            { pic: "🐌", say: "snail", basket: "ai" }, { pic: "🦶", say: "feet", basket: "ee" }, { pic: "🐐", say: "goat", basket: "oa" }] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن و آن را در سبد صدایش بگذار",
          baskets: [{ label: "ar" }, { label: "or" }, { label: "ow" }],
          items: [{ pic: "⭐", say: "star", basket: "ar" }, { pic: "🌽", say: "corn", basket: "or" }, { pic: "🐮", say: "cow", basket: "ow" },
            { pic: "🚗", say: "car", basket: "ar" }, { pic: "🍴", say: "fork", basket: "or" }, { pic: "🦉", say: "owl", basket: "ow" }] },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["moon", { pic: "🌙", say: "moon" }], ["light", { pic: "💡", say: "light" }], ["coin", { pic: "🪙", say: "coin" }], ["hair", { pic: "💇", say: "hair" }]] },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "boat", parts: ["b", "oa", "t"], extra: ["ai"], pic: "⛵" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "sheep", parts: ["sh", "ee", "p"], extra: ["oa"], pic: "🐑" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "farm", parts: ["f", "ar", "m"], extra: ["or"], pic: "🚜" },
        { type: "tip", text: "این بازی همه صداهای دوحرفی را مرور می‌کند. یک کتاب یا مجله انگلیسی (یا بسته‌بندی‌ها) بیاورید و با هم دنبال ai، ee، oa، ar، or و ow بگردید. هر کدام را که پیدا کردید، کلمه را با هم بخوانید." }
      ]
    },
    {
      id: "english-sprout-35", subject: "english", level: "sprout", emoji: "👗", title: "لباس‌های من",
      steps: [
        /* Reza says what he and Mina have got on: his blue T-shirt (hand on it), her purple dress (she turns round to
           show it), her pink shoes (she lifts a foot), and his blue cap, which he puts on. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, mina: { art: "en-mina", at: [44, 86], s: 1.35 }, reza: { art: "en-reza", at: [116, 86], s: 1.35 },
            cap: { art: "🧢", at: [146, 88], s: 0.6 }
          },
          scenes: [
            { caption: "I've got a blue T-shirt.", key: 1300, do: [].concat(pose("reza", "L", "chest", 0, 500), talk("reza", 0, 1800)) },
            { caption: "She's got a purple dress.", key: 1650, do: [].concat(pose("reza", "L", "point", 0, 500), talk("reza", 0, 1800), turn("mina", 900)) },
            { caption: "She's got pink shoes.", key: 1550, do: [].concat(talk("reza", 0, 1600), [{ id: "mina.legR", to: { sy: 0.6 }, at: 900, dur: 1400, yoyo: true, times: 2 }]) },
            { caption: "And I've got a blue hat!", key: 2000, do: [].concat(pose("reza", "L", "down", 0, 400), pose("reza", "R", "hold", 200, 500),
              [arc("cap", [146, 88], [116.5, 47], 500, 1200, 10), { id: "cap", to: { s: 1.05 }, at: 500, dur: 1200 }], pose("reza", "R", "down", 1800, 400), talk("reza", 0, 1600)) }
          ] },
        { type: "words", show: true, words: [{ pic: "👗", en: "dress" }, { pic: "👕", en: "T-shirt" }, { pic: "👟", en: "shoes" }, { pic: "🧢", en: "hat" }, { pic: "👖", en: "trousers" }, { pic: "🧦", en: "socks" }] },
        { type: "listen", say: "She's got a dress.", prompt: "گوش کن. چه دارد؟", options: [{ pic: "👖", en: "trousers" }, { pic: "👗", en: "dress" }, { pic: "🧦", en: "socks" }], answer: "👗" },
        { type: "listen", say: "I've got a blue T-shirt.", quiet: true, prompt: "گوش کن. چه دارد؟",
          options: [{ color: RED, value: "red", label: "T-shirt" }, { color: BLUE, value: "blue", label: "T-shirt" }, { color: YELLOW, value: "yellow", label: "T-shirt" }], answer: "blue" },
        { type: "listen", say: "He's got green trousers.", quiet: true, prompt: "گوش کن. چه رنگی؟",
          options: [{ color: GREEN, value: "green", en: "green" }, { color: BROWN, value: "brown", en: "brown" }, { color: PINK, value: "pink", en: "pink" }], answer: "green" },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I've got a red hat.", items: ["I've", "got", "a", "red", "hat."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "She's got blue shoes.", items: ["She's", "got", "blue", "shoes."] },
        { type: "tip", text: "صبح‌ها لباس‌های کودک را با هم بگویید: I've got a red T-shirt. بعد به لباس شما اشاره کند و بگوید You've got … و درباره خواهر یا برادرش She's got … / He's got …. رنگ همیشه قبل از اسم لباس می‌آید: a red hat، نه a hat red." }
      ]
    },
    {
      id: "english-sprout-36", subject: "english", level: "sprout", emoji: "🛋️", title: "اتاق من",
      steps: [
        /* Sara shows her room: each thing lights up or moves as she points to it (the lamp comes on, the cupboard
           doors open, she looks in the mirror). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, bed: { art: "en-bed-low", at: [34, 86], s: 0.9 },
            lamp: { art: "en-lamp", at: [76, 86], s: 1.4 }, cup: { art: "en-cupboard", at: [140, 86], s: 1.1 },
            mirror: { art: "🪞", at: [108, 50], s: 0.8 }, sara: { art: "en-sara", at: [100, 87], s: 1.1 }
          },
          scenes: [
            { caption: "This is my room.", key: 1400, do: [].concat(pose("sara", "R", "big", 0, 500), pose("sara", "L", "big", 0, 500), talk("sara", 0, 1400)) },
            { caption: "There's a bed.", key: 1500, do: [].concat(pose("sara", "R", "down", 0, 400), pose("sara", "L", "point", 300, 500), [{ id: "bed", to: { y: "-2" }, at: 700, dur: 800, yoyo: true, times: 2 }], talk("sara", 0, 1100)) },
            { caption: "There's a lamp in my room.", key: 2000, do: [].concat(talk("sara", 0, 1800), [{ id: "lamp", to: { s: 1.5 }, at: 900, dur: 400, yoyo: true, times: 2 },
              { emit: "spark", where: [76, 60], spread: [16, 10], n: 10, at: 1100, dur: 1400, life: 900 }]) },
            { caption: "There's a cupboard.", key: 1800, do: [].concat(pose("sara", "L", "down", 0, 400), pose("sara", "R", "point", 300, 500), [{ id: "cup", to: { r: 3 }, at: 900, dur: 1000, yoyo: true, times: 4 }], talk("sara", 0, 1200)) },
            { caption: "And there's a mirror!", key: 1600, do: [].concat(pose("sara", "R", "pointUp", 0, 500), [{ id: "sara.eyes", to: { x: 0.6, y: -0.6 }, at: 300, dur: 300 },
              { id: "mirror", to: { s: 0.95 }, at: 800, dur: 600, yoyo: true, times: 2 }], face("sara", true, 600), talk("sara", 0, 1300)) }
          ] },
        { type: "words", show: true, words: [{ pic: "🛏️", en: "bed" }, { art: "en-lamp", en: "lamp" }, { pic: "🛋️", en: "sofa" }, { art: "en-cupboard", en: "cupboard" }, { pic: "🪞", en: "mirror" }] },
        { type: "listen", say: "There's a lamp in my room.", prompt: "گوش کن. چه چیزی در اتاق هست؟",
          options: [{ pic: "🛋️", en: "sofa" }, { art: "en-lamp", value: "lamp", en: "lamp" }, { pic: "🪞", en: "mirror" }], answer: "lamp" },
        { type: "listen", say: "There's a sofa.", quiet: true, prompt: "گوش کن. چه چیزی در اتاق هست؟",
          options: [{ pic: "🛋️", en: "sofa" }, { pic: "🛏️", en: "bed" }, { art: "en-cupboard", value: "cupboard", en: "cupboard" }], answer: "🛋️" },
        { type: "listen", say: "There's a cupboard.", quiet: true, prompt: "گوش کن. چه چیزی در اتاق هست؟",
          options: [{ pic: "🪞", en: "mirror" }, { art: "en-cupboard", value: "cupboard", en: "cupboard" }, { art: "en-lamp", value: "lamp", en: "lamp" }], answer: "cupboard" },
        { type: "tip", text: "با هم در اتاق کودک بگردید و بگویید There's a bed. There's a lamp. کودک هم به چیزی اشاره کند و بگوید There's a … . بعد بازی «چه چیزی نیست؟» کنید: چشم‌ها را ببندد، شما چیزی را بردارید و او بگوید کدام نیست." }
      ]
    },
    {
      id: "english-sprout-37", subject: "english", level: "sprout", emoji: "🖍️", title: "گوش کن و رنگ کن",
      steps: [
        { type: "listen", show: "🐱", say: "Colour the cat red.", prompt: "گوش کن. گربه را چه رنگی کند؟",
          options: [{ color: BLUE, value: "blue", en: "blue" }, { color: RED, value: "red", en: "red" }, { color: GREEN, value: "green", en: "green" }], answer: "red" },
        { type: "listen", show: "⚽", say: "Colour the ball yellow.", quiet: true, prompt: "گوش کن. توپ را چه رنگی کند؟",
          options: [{ color: YELLOW, value: "yellow", en: "yellow" }, { color: PURPLE, value: "purple", en: "purple" }, { color: BROWN, value: "brown", en: "brown" }], answer: "yellow" },
        { type: "listen", say: "Point to the frog.", prompt: "گوش کن و همان را نشان بده",
          options: [{ pic: "🐟", en: "fish" }, { pic: "🐦", en: "bird" }, { pic: "🐸", en: "frog" }], answer: "🐸" },
        { type: "listen", say: "Find the small ball.", quiet: true, prompt: "گوش کن و همان را نشان بده",
          options: [{ pic: "⚽", scale: 1.5, value: "big", en: "the big ball" }, { pic: "⚽", scale: 0.6, value: "small", en: "the small ball" }], answer: "small" },
        { type: "listen", say: "Point to the long snake.", quiet: true, prompt: "گوش کن و همان را نشان بده",
          options: [{ pic: "🐍", scale: [1.7, 1], value: "long", en: "the long snake" }, { pic: "🐍", scale: [0.7, 1], value: "short", en: "the short snake" }], answer: "long" },
        { type: "listen", say: "Find the dog under the bed.", quiet: true, prompt: "گوش کن و همان را نشان بده",
          options: [{ pic: "🐶", ref: "🛏️", where: "on" }, { pic: "🐶", ref: "🛏️", where: "under" }], answer: "under" },
        { type: "listen", show: "🌳", say: "Colour the tree green.", quiet: true, prompt: "گوش کن. درخت را چه رنگی کند؟",
          options: [{ color: ORANGE, value: "orange", en: "orange" }, { color: GREEN, value: "green", en: "green" }, { color: PINK, value: "pink", en: "pink" }], answer: "green" },
        { type: "tip", text: "یک نقاشی ساده (گربه، توپ، درخت) بکشید و دستور بدهید: Colour the cat red. Colour the ball yellow. کودک گوش کند و رنگ کند. بعد کودک دستور بدهد و شما رنگ کنید؛ گاهی عمداً اشتباه رنگ کنید تا کودک درستش را بگوید." }
      ]
    },
    {
      id: "english-sprout-38", subject: "english", level: "sprout", emoji: "⛺", title: "دو حرف کنار هم ۱",
      steps: [
        blendWord("hand", ["h", "a", "n", "d"], "✋"),
        { type: "listen", show: "milk", prompt: READ_PROMPT, options: ["🥛", "⛺", "🪺"], answer: "🥛" },
        { type: "listen", show: "tent", quiet: true, prompt: READ_PROMPT, options: ["✋", "⛺", "🤸"], answer: "⛺" },
        { type: "listen", show: "nest", quiet: true, prompt: READ_PROMPT, options: ["🪺", "🥛", "✋"], answer: "🪺" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز. دو صدای آخر را هم جدا بشنو.", word: "jump", parts: ["j", "u", "m", "p"], extra: ["n"], pic: "🤸" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "lamp", parts: ["l", "a", "m", "p"], extra: ["n"], pic: "💡" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "nest", parts: ["n", "e", "s", "t"], extra: ["d"], pic: "🪺" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["hand", { pic: "✋", say: "hand" }], ["milk", { pic: "🥛", say: "milk" }], ["tent", { pic: "⛺", say: "tent" }], ["jump", { pic: "🤸", say: "jump" }]] },
        { type: "tip", text: "در این کلمه‌ها دو صدا در آخر کنار هم می‌آیند (hand: ن‌د، milk: ل‌ک). بچه‌ها گاهی یکی را جا می‌اندازند. کلمه را آهسته صدا به صدا بگویید و برای هر صدا یک انگشت بالا بیاورید: h-a-n-d چهار صدا." }
      ]
    },
    {
      id: "english-sprout-39", subject: "english", level: "sprout", emoji: "🐸", title: "دو حرف کنار هم ۲",
      steps: [
        blendWord("frog", ["f", "r", "o", "g"], "🐸"),
        { type: "listen", show: "stop", prompt: READ_PROMPT, options: ["🛑", "🦀", "🚩"], answer: "🛑" },
        { type: "listen", show: "crab", quiet: true, prompt: READ_PROMPT, options: ["🥁", "🦀", "🐸"], answer: "🦀" },
        { type: "listen", show: "drum", quiet: true, prompt: READ_PROMPT, options: ["🥁", "🏊", "🛑"], answer: "🥁" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز. دو صدای اول را جدا بشنو.", word: "flag", parts: ["f", "l", "a", "g"], extra: ["r"], pic: "🚩" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "swim", parts: ["s", "w", "i", "m"], extra: ["n"], pic: "🏊" },
        { type: "build", prompt: "گوش کن و این کلمه را با حرف‌ها بساز", word: "crab", parts: ["c", "r", "a", "b"], extra: ["l"], pic: "🦀" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["frog", { pic: "🐸", say: "frog" }], ["stop", { pic: "🛑", say: "stop" }], ["flag", { pic: "🚩", say: "flag" }], ["swim", { pic: "🏊", say: "swim" }]] },
        { type: "tip", text: "در فارسی کلمه با دو صامت شروع نمی‌شود، برای همین بچه‌های ایرانی گاهی می‌گویند «اِستاپ» یا «فِراگ». بدون «اِ» اول بگویید: s-top، f-rog. کلمه را آهسته و بعد تند بگویید تا دو صدا به هم بچسبند." }
      ]
    },
    {
      id: "english-sprout-40", subject: "english", level: "sprout", emoji: "🐇", title: "کلمه‌های بلندتر",
      steps: [
        { type: "clap", word: "rabbit", parts: ["rab", "bit"], pic: "🐇", prompt: "این کلمه را بگو. با هر تکه یک بار دست بزن." },
        { type: "clap", word: "picnic", parts: ["pic", "nic"], pic: "🧺" },
        { type: "clap", word: "lunchbox", parts: ["lunch", "box"], pic: "🍱" },
        { type: "clap", word: "helmet", parts: ["hel", "met"], pic: "⛑️" },
        { type: "build", prompt: "گوش کن و کلمه را با تکه‌ها بساز", word: "rabbit", parts: ["rab", "bit"], extra: ["nic"], pic: "🐇" },
        { type: "build", prompt: "گوش کن و کلمه را با تکه‌ها بساز", word: "picnic", parts: ["pic", "nic"], extra: ["bit"], pic: "🧺" },
        { type: "build", prompt: "گوش کن و کلمه را با تکه‌ها بساز", word: "helmet", parts: ["hel", "met"], extra: ["box"], pic: "⛑️" },
        { type: "tip", text: "کلمه‌های بلند را تکه‌تکه بخوانید: rab-bit، pic-nic. با کودک دست بزنید و تکه‌ها را بشمارید. موقع خواندن، اول تکه اول را بپوشانید و بعد دومی را؛ هر تکه یک کلمه کوچک است که کودک بلد است بخواند." }
      ]
    },
    {
      id: "english-sprout-41", subject: "english", level: "sprout", emoji: "⭐", title: "کلمه‌های پرکاربرد ۳",
      steps: [
        { type: "listen", say: "said", prompt: "این‌ها کلمه‌های تصویری‌اند. گوش کن و این کلمه را پیدا کن.",
          options: [{ label: "said" }, { label: "some" }, { label: "so" }], answer: "said" },
        { type: "listen", say: "what", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.", options: [{ label: "when" }, { label: "what" }, { label: "were" }], answer: "what" },
        { type: "listen", say: "there", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.", options: [{ label: "one" }, { label: "come" }, { label: "there" }], answer: "there" },
        { type: "listen", say: "have", quiet: true, prompt: "گوش کن و این کلمه را پیدا کن.", options: [{ label: "have" }, { label: "like" }, { label: "do" }], answer: "have" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["one cat", "🐱"], ["I like milk.", "🥛"], ["Come out!", "🚪"], ["some fish", "🐟🐟🐟"]] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I have one red hat.", items: ["I", "have", "one", "red", "hat."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "What do you like?", items: ["What", "do", "you", "like?"] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "\"Come and see!\" said Mum.", items: ["\"Come", "and", "see!\"", "said", "Mum."] },
        { type: "tip", text: "این‌ها آخرین کلمه‌های تصویری این باغچه‌اند: said، have، like، so، do، some، come، were، there، one، what، when، out. کارت‌هایشان را به کارت‌های قبلی اضافه کنید و بازی «زود بگو» را ادامه بدهید. وقتی در کتاب‌ها دیدیدشان، کودک آن‌ها را پیدا کند." }
      ]
    },
    {
      id: "english-sprout-42", subject: "english", level: "sprout", emoji: "🎲", title: "بازی خواندن ۲",
      steps: [
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a frog on a log", "🐸🪵"], ["a crab in a nest", "🦀🪺"], ["a flag on a tent", "🚩⛺"], ["stop!", "🛑"]] },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a hand on a drum", "✋🥁"], ["milk in a cup", "🥛☕"], ["I can swim.", "🏊"], ["Jump!", "🤸"]] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "The frog can jump.", items: ["The", "frog", "can", "jump."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "A crab is on the sand.", items: ["A", "crab", "is", "on", "the", "sand."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Stop at the flag!", items: ["Stop", "at", "the", "flag!"] },
        { type: "tip", text: "این بازی جمله‌های کوتاهی با کلمه‌های دوصامتی را مرور می‌کند. یکی از جمله‌ها را روی کاغذ بنویسید، کودک بخواند و نقاشی‌اش را بکشد. بعد کلمه‌ها را بُرید و قاطی کنید تا دوباره به ترتیب بچیند." }
      ]
    },
    {
      id: "english-sprout-43", subject: "english", level: "sprout", emoji: "🦆", title: "قصه: قورباغه و اردک",
      steps: [
        { type: "passage", prompt: "قصه را بخوان. اگر کلمه‌ای سخت بود، صدا به صدا بخوان.",
          text: "A frog sat on a log in the pond. A duck swam up. \"Quack! Can you swim?\" said the duck.",
          question: "قورباغه کجا نشسته بود؟", options: ["🪵", "🌳", "🛏️"], answer: "🪵" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "A frog sat on a log in the pond. A duck swam up. \"Quack! Can you swim?\" said the duck.",
          question: "چه کسی آمد؟", options: ["🐟", "🦆", "🐶"], answer: "🦆" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "\"Yes, I can!\" said the frog. The frog went in. Splash! The frog and the duck swam to the end of the pond.",
          question: "قورباغه شنا بلد بود؟", options: ["👍", "👎"], answer: "👍" },
        { type: "passage", prompt: "بقیه قصه را دوباره بخوان",
          text: "\"Yes, I can!\" said the frog. The frog went in. Splash! The frog and the duck swam to the end of the pond.",
          question: "آخر قصه، قورباغه و اردک چه کار کردند؟", options: ["🏊", "😴", "🍽️"], answer: "🏊" },
        { type: "tip", text: "قصه را با صدای قورباغه و اردک بخوانید؛ یکی از شما اردک باشد و دیگری قورباغه. کلمه‌های تصویری قصه (said، you، the، to) را با هم پیدا کنید. بعد بپرسید «اگر تو بودی چه می‌گفتی؟» تا با یک جمله کوتاه جواب بدهد." }
      ]
    },
    {
      id: "english-sprout-44", subject: "english", level: "sprout", emoji: "📚", title: "قصه را گوش کن",
      steps: [
        /* A story told aloud: the cat sees a bird on the grass, creeps up and jumps, the bird flies up into the
           tree, and the cat sits under it, sad; then the bird sings to it. */
        { type: "scene", prompt: "به قصه گوش کن و خوب ببین. بعد تصویرها را به ترتیب می‌چینی.", bg: "#cfeaf7",
          parts: { garden: { art: "en-garden" }, tree: { art: "en-tree", at: [134, 88], s: 1.1 }, bird: { art: "en-bird", at: [100, 86], s: 1.6, flip: true },
            cat: { art: "en-cat", at: [20, 88], s: 1.5 }, look: { art: "en-look", at: [28.5, 68], r: 12, sx: 3.5, o: 0 } },
          scenes: [
            { caption: "A cat can see a bird.", key: 1600, do: [{ id: "look", to: { o: 1 }, at: 400, dur: 400 }, { id: "cat.head", to: { r: 6 }, at: 300, dur: 500 }, { id: "cat.tail", to: { r: -20 }, at: 600, dur: 1400, yoyo: true, times: 4 }] },
            { caption: "The cat jumps!", key: 900, do: [{ id: "look", to: { o: 0 }, dur: 300 }, { id: "cat", path: "M20 88Q56 50 88 88", at: 300, dur: 900 }] },
            { caption: "The bird flies up to the tree.", key: 1500, do: [].concat(fly("bird", "M100 86Q96 50 112 46", 0, 1400), [{ id: "bird.wing", to: { r: 0 }, at: 1500, dur: 200 }]) },
            { caption: "The cat is sad.", key: 1400, do: [{ id: "cat", to: { x: 104 }, dur: 800 }, { id: "cat.head", to: { r: 25 }, at: 900, dur: 600 }, { id: "cat", to: { sy: 0.9 }, at: 900, dur: 500 }] },
            { caption: "The bird sings: tweet, tweet!", key: 1200, do: [{ id: "bird.wing", to: { r: 30 }, dur: 1600, yoyo: true, times: 4 },
              { emit: "spark", where: [116, 40], spread: [10, 6], n: 6, at: 300, dur: 1400, life: 900 }, { id: "cat", to: { sy: 1 }, at: 1200, dur: 400 }, { id: "cat.head", to: { r: -10 }, at: 1200, dur: 500 }] }
          ] },
        { type: "order", prompt: "تصویرهای قصه را به ترتیب بچین: اول چه شد، بعد چه شد؟", ltr: true, numbered: true, items: ["🐱👀🐦", "🐱🤸", "🐦🌳", "🐱😢"] },
        { type: "listen", say: "The bird flies up to the tree.", prompt: "گوش کن. پرنده کجا رفت؟",
          options: [{ pic: "🐦", ref: "🌳", where: "on" }, { pic: "🐦", ref: "📦", where: "in" }], answer: "on" },
        { type: "listen", say: "The cat is sad.", quiet: true, prompt: "گوش کن. گربه چه حالی داشت؟",
          options: [{ pic: "😊", en: "happy" }, { pic: "😢", en: "sad" }, { pic: "😴", en: "tired" }], answer: "😢" },
        { type: "tip", text: "قصه را دوباره ببینید و بعد کودک قصه را با تصویرها برایتان تعریف کند (به فارسی یا انگلیسی). خودتان هم قصه‌های کوتاه با کلمه‌های آشنا بگویید (A dog can see a ball…) و آن را با دست و صورت نشان بدهید." }
      ]
    },
    {
      id: "english-sprout-45", subject: "english", level: "sprout", emoji: "🦒", title: "حیوان‌های بیشتر",
      steps: [
        /* Each animal comes in: the giraffe (long neck), the brown monkey, the hippo (it grows big), the small spider
           coming down, the green snake sliding along and the crocodile. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, giraffe: { art: "🦒", at: [200, 88], s: 2.4 }, monkey: { art: "🐒", at: [200, 88], s: 1.4 },
            hippo: { art: "🦛", at: [200, 88], s: 1.2 }, spider: { art: "🕷️", at: [80, -20], s: 0.5 }, snake: { art: "🐍", at: [-30, 88], s: 1.2, sx: 1.6 },
            croc: { art: "🐊", at: [200, 88], s: 1.8 } },
          scenes: [
            { caption: "A giraffe! It's got a long neck.", key: 2000, do: [{ id: "giraffe", to: { x: 80 }, dur: 1800, ease: "out" }, { id: "giraffe", to: { r: 3 }, dur: 1800, yoyo: true, times: 4 }] },
            { caption: "A monkey! It's brown.", key: 1900, do: [{ id: "giraffe", to: { x: -60 }, dur: 1500, ease: "in" }, { id: "monkey", path: "M200 88Q140 60 80 88", at: 300, dur: 1500 }] },
            { caption: "A hippo! It's big.", key: 2400, do: [{ id: "monkey", path: "M80 88Q20 60 -40 88", dur: 1200 }, { id: "hippo", to: { x: 80 }, at: 200, dur: 1500 }, { id: "hippo", to: { s: 2.4 }, at: 1700, dur: 900, ease: "back" }] },
            { caption: "A spider! It's small.", key: 2000, do: [{ id: "hippo", to: { x: 230 }, dur: 1400, ease: "in" }, { id: "spider", to: { y: 50 }, at: 500, dur: 1500, ease: "out" }, { id: "spider", to: { r: 10 }, at: 2000, dur: 800, yoyo: true, times: 4 }] },
            { caption: "A snake! It's green.", key: 2200, do: [{ id: "spider", to: { y: -20 }, dur: 900, ease: "in" }, { id: "snake", path: "M-30 88Q20 82 60 88T120 88", at: 300, dur: 2200 }] },
            { caption: "A crocodile! It's green, too.", key: 2200, do: [{ id: "snake", path: "M120 88Q160 82 220 88", dur: 1200 }, { id: "croc", to: { x: 82 }, at: 300, dur: 1600 }, { id: "croc", to: { r: -8 }, at: 2000, dur: 600, yoyo: true, times: 4 }] }
          ] },
        { type: "words", show: true, words: [{ pic: "🐊", en: "crocodile" }, { pic: "🦒", en: "giraffe" }, { pic: "🦛", en: "hippo" }, { pic: "🐒", en: "monkey" }, { pic: "🐍", en: "snake" }, { pic: "🕷️", en: "spider" }] },
        { type: "listen", say: "It's got a long neck.", prompt: "گوش کن. کدام حیوان است؟", options: [{ pic: "🦛", en: "hippo" }, { pic: "🦒", en: "giraffe" }, { pic: "🕷️", en: "spider" }], answer: "🦒" },
        { type: "listen", say: "It's small. It's got eight legs.", quiet: true, prompt: "گوش کن. کدام حیوان است؟", options: [{ pic: "🕷️", en: "spider" }, { pic: "🐊", en: "crocodile" }, { pic: "🐒", en: "monkey" }], answer: "🕷️" },
        { type: "listen", say: "It's long. It hasn't got legs.", quiet: true, prompt: "گوش کن. کدام حیوان است؟", options: [{ pic: "🐒", en: "monkey" }, { pic: "🦛", en: "hippo" }, { pic: "🐍", en: "snake" }], answer: "🐍" },
        { type: "tip", text: "بازی «حدس بزن کدام حیوان» کنید: شما بگویید It's big. It's grey. It's got a long nose. و کودک حدس بزند (elephant!). بعد کودک بگوید و شما حدس بزنید. کتاب‌های تصویری حیوان‌ها برای این بازی خیلی خوب‌اند." }
      ]
    },
    {
      id: "english-sprout-46", subject: "english", level: "sprout", emoji: "🍚", title: "دوست داری؟",
      steps: [
        /* At lunch Mina asks Reza what he likes: he nods and eats the rice (yes, I do), and shakes his head at the
           carrots (no, I don't); then he asks her about ice cream. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf0d5",
          parts: { kitchen: { art: "en-kitchen" }, mina: { art: "en-mina", at: [124, 76], s: 1.1 }, reza: { art: "en-reza", at: [36, 76], s: 1.1 },
            table: { art: "en-table", at: [80, 90], s: 1.4 }, rice: { art: "🍚", at: [54, 61], s: 0.6 }, carrot: { art: "🥕", at: [80, 61], s: 0.6 }, ice: { art: "🍦", at: [106, 61], s: 0.6 },
            askM: { art: "en-ask", at: [116, 34], o: 0, flip: true }, askR: { art: "en-ask", at: [44, 34], o: 0 } },
          scenes: [
            { caption: "Do you like rice?", key: 1200, do: [].concat(pose("mina", "L", "point", 0, 500), talk("mina", 0, 1200), pop("askM", 500)) },
            { caption: "Yes, I do! Yum!", key: 1700, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "L", "down", 0, 400), nod("reza", 0), talk("reza", 0, 1300), face("reza", true, 0),
              [{ id: "rice", to: { s: 0.4 }, at: 1200, dur: 1000 }]) },
            { caption: "Do you like carrots?", key: 1200, do: [].concat(talk("mina", 0, 1300), pose("mina", "L", "point", 200, 500), pop("askM", 500)) },
            { caption: "No, I don't.", key: 900, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "L", "down", 0, 400), shake("reza", 0), talk("reza", 0, 1000), face("reza", false, 0)) },
            { caption: "Do you like ice cream?", key: 1200, do: [].concat(face("reza", true, 0), pose("reza", "R", "point", 0, 500), talk("reza", 0, 1300), pop("askR", 500)) },
            { caption: "Yes, I do!", key: 900, do: [].concat([{ id: "askR", to: { o: 0 }, dur: 300 }], pose("reza", "R", "down", 0, 400), nod("mina", 0), jump("mina", 300, 1, 4), talk("mina", 0, 900)) }
          ] },
        { type: "words", show: true, words: [{ pic: "🍚", en: "rice" }, { pic: "🍗", en: "chicken" }, { pic: "🥕", en: "carrots" }, { pic: "🍌", en: "banana" }, { pic: "🍦", en: "ice cream" }] },
        { type: "listen", say: "Do you like chicken?", prompt: "گوش کن. درباره چه می‌پرسد؟", options: [{ pic: "🍚", en: "rice" }, { pic: "🍗", en: "chicken" }, { pic: "🍌", en: "banana" }], answer: "🍗" },
        { type: "listen", show: "🍌", say: "Do you like bananas?", prompt: "تو موز دوست داری. گوش کن و جواب بده.",
          options: [{ pic: "👍", en: "Yes, I do.", value: "yes" }, { pic: "👎", en: "No, I don't.", value: "no" }], answer: "yes" },
        { type: "listen", show: "🥕", say: "Do you like carrots?", quiet: true, prompt: "فرض کن هویج دوست نداری. گوش کن و جواب بده.",
          options: [{ pic: "👍", en: "Yes, I do.", value: "yes" }, { pic: "👎", en: "No, I don't.", value: "no" }], answer: "no" },
        { type: "tip", text: "سر غذا بپرسید Do you like rice? و کودک جواب بدهد Yes, I do یا No, I don't. هر جوابی درست است! بعد کودک از شما بپرسد. می‌توانید با هم یک جدول کوچک «دوست دارم / دوست ندارم» با نقاشی غذاها درست کنید." }
      ]
    },
    {
      id: "english-sprout-47", subject: "english", level: "sprout", emoji: "💪", title: "صورت و بدن",
      steps: [
        /* Mina and Reza say what each has got: Reza's brown hair, Mina's black hair; Reza shows his arm and lifts his
           leg; Mina touches her face. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf6e9",
          parts: { mina: { art: "en-mina", at: [50, 88], s: 1.6 }, reza: { art: "en-reza", at: [112, 88], s: 1.6 } },
          scenes: [
            { caption: "He's got brown hair.", key: 1300, do: [].concat(pose("mina", "R", "point", 0, 500), talk("mina", 0, 1300), [{ id: "reza.head", to: { r: -8 }, at: 600, dur: 600, yoyo: true, times: 2 }]) },
            { caption: "She's got black hair.", key: 1300, do: [].concat(pose("mina", "R", "down", 0, 400), pose("reza", "L", "point", 0, 500), talk("reza", 0, 1300), [{ id: "mina.head", to: { r: 8 }, at: 600, dur: 600, yoyo: true, times: 2 }]) },
            { caption: "This is my arm.", key: 1300, do: [].concat(pose("reza", "L", "down", 0, 400), pose("reza", "R", "big", 300, 500), pose("reza", "L", "point", 900, 500), talk("reza", 0, 1100)) },
            { caption: "This is my leg.", key: 1400, do: [].concat(pose("reza", "R", "down", 0, 400), pose("reza", "L", [10, 20], 0, 400), [{ id: "reza.legR", to: { r: -30 }, at: 600, dur: 600 }, { id: "reza.legR", to: { r: 0 }, at: 2000, dur: 500 }], talk("reza", 0, 1100)) },
            { caption: "This is my face. I'm happy!", key: 1500, do: [].concat(pose("reza", "L", "down", 0, 400), pose("mina", "R", "nose", 200, 500), face("mina", true, 400), talk("mina", 0, 1800)) }
          ] },
        { type: "words", show: true, words: [{ pic: "💇", en: "hair" }, { pic: "🙂", en: "face" }, { pic: "💪", en: "arm" }, { pic: "🦵", en: "leg" }, { pic: "🐍", scale: [1.6, 1], en: "long" }, { pic: "🐍", scale: [0.7, 1], en: "short" }] },
        { type: "listen", say: "This is my leg.", prompt: "گوش کن و تصویرش را پیدا کن", options: [{ pic: "💪", en: "arm" }, { pic: "🦵", en: "leg" }, { pic: "🙂", en: "face" }], answer: "🦵" },
        { type: "listen", say: "She's got long hair.", quiet: true, prompt: "گوش کن. کدام است؟",
          options: [{ pic: "👩‍🦰", value: "long", en: "long hair" }, { pic: "👨‍🦲", value: "none", en: "no hair" }], answer: "long" },
        { type: "listen", say: "He's got brown hair.", quiet: true, prompt: "گوش کن. موهایش چه رنگی است؟",
          options: [{ color: YELLOW, value: "yellow", en: "yellow" }, { color: BROWN, value: "brown", en: "brown" }, { color: BLACK, value: "black", en: "black" }], answer: "brown" },
        { type: "tip", text: "جلوی آینه با هم بازی کنید: I've got brown eyes. I've got black hair. بعد درباره هم بگویید: You've got short hair. She's got long hair. کودک هر بار به همان قسمت بدن یا صورت اشاره کند." }
      ]
    },
    {
      id: "english-sprout-48", subject: "english", level: "sprout", emoji: "🤸", title: "من می‌توانم",
      steps: [
        /* Mina asks and Reza shows: he can jump (he jumps), he can't fly (he flaps, stays on the ground and laughs,
           while a bird flies past), and then he asks her. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, mina: { art: "en-mina", at: [44, 86], s: 1.3 }, reza: { art: "en-reza", at: [116, 86], s: 1.3 },
            bird: { art: "en-bird", at: [176, 14], s: 1.5, flip: true }, askM: { art: "en-ask", at: [52, 46], o: 0 }, askR: { art: "en-ask", at: [106, 46], o: 0, flip: true } },
          scenes: [
            { caption: "Can you jump?", key: 1300, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1100), pop("askM", 500)) },
            { caption: "Yes, I can!", key: 925, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400), jump("reza", 600, 3, 8), talk("reza", 0, 900), face("reza", true, 0)) },
            { caption: "Can you fly?", key: 1300, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1100), pop("askM", 500)) },
            { caption: "No, I can't!", key: 1800, do: [].concat([{ id: "askM", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400), fly("bird", "M176 14Q100 0 -20 18", 0, 2600),
              pose("reza", "R", "big", 200, 400), pose("reza", "L", "big", 200, 400), [{ id: "reza.armR", to: { r: -140 }, at: 700, dur: 1600, yoyo: true, times: 6 }, { id: "reza.armL", to: { r: 140 }, at: 700, dur: 1600, yoyo: true, times: 6 }],
              shake("reza", 2400), talk("reza", 2400, 900)) },
            { caption: "Can you swim?", key: 1300, do: [].concat(pose("reza", "R", "down", 0, 400), pose("reza", "L", "ask", 0, 500), talk("reza", 0, 1100), pop("askR", 500)) },
            { caption: "Yes, I can.", key: 1200, do: [].concat([{ id: "askR", to: { o: 0 }, dur: 300 }], pose("reza", "L", "down", 0, 400), nod("mina", 0), talk("mina", 0, 900),
              pose("mina", "R", "stretch", 500, 400), [{ id: "mina.armR", to: { r: 0 }, at: 900, dur: 1400, yoyo: true, times: 2 }, { id: "mina.armL", to: { r: 150 }, at: 900, dur: 1400, yoyo: true, times: 2 }]) }
          ] },
        { type: "listen", show: "🐦", say: "Can a bird fly?", prompt: "گوش کن و جواب بده",
          options: [{ pic: "👍", en: "Yes, it can.", value: "yes" }, { pic: "👎", en: "No, it can't.", value: "no" }], answer: "yes" },
        { type: "listen", show: "🐟", say: "Can a fish run?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ pic: "👍", en: "Yes, it can.", value: "yes" }, { pic: "👎", en: "No, it can't.", value: "no" }], answer: "no" },
        { type: "listen", say: "I can swim.", quiet: true, prompt: "گوش کن. چه کاری می‌تواند بکند؟", options: [{ pic: "🏊", en: "swim" }, { pic: "🏃", en: "run" }, { pic: "🎵", en: "sing" }], answer: "🏊" },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Can you jump?", items: ["Can", "you", "jump?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "No, I can't.", items: ["No,", "I", "can't."] },
        { type: "tip", text: "بازی «می‌توانی؟» کنید: بپرسید Can you hop? Can you touch your toes? Can you fly? کودک انجام بدهد و بگوید Yes, I can! یا با خنده No, I can't! بعد کودک از شما بپرسد. سؤال‌های خنده‌دار (Can a cat sing?) بازی را شیرین‌تر می‌کند." }
      ]
    },
    {
      id: "english-sprout-49", subject: "english", level: "sprout", emoji: "👉", title: "این و آن",
      steps: [
        /* Near is this: Sara holds an apple in her hand. Far is that: she points at a bird on the far tree. */
        { type: "scene", prompt: "گوش کن و ببین: نزدیک this، دور that", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, tree: { art: "en-tree", at: [146, 66], s: 0.45 }, bird: { art: "en-bird", at: [134, 49], s: 0.7 },
            sara: { art: "en-sara", at: [44, 86], s: 1.4 }, apple: { art: "🍎", at: inHand("en-sara", [44, 86], 1.4, "R", "hold", 0.55), s: 0.55, o: 0 },
            reza: { art: "en-reza", at: [86, 86], s: 1.2 } },
          scenes: [
            { caption: "What's this?", key: 1400, do: [].concat(pose("sara", "R", "hold", 0, 500), [{ id: "apple", to: { o: 1 }, at: 500, dur: 300 }], talk("sara", 0, 1100)) },
            { caption: "This is an apple.", key: 1200, do: [].concat(talk("reza", 0, 1300), pose("reza", "L", "point", 0, 500), [{ id: "apple", to: { s: 0.65 }, at: 400, dur: 600, yoyo: true, times: 2 }]) },
            { caption: "What's that?", key: 1400, do: [].concat(pose("reza", "L", "down", 0, 400), [{ id: "apple", to: { o: 0 }, dur: 300 }], pose("sara", "R", "pointUp", 300, 500),
              [{ id: "sara.eyes", to: { x: 0.8, y: -0.4 }, at: 300, dur: 300 }], talk("sara", 0, 1100)) },
            { caption: "That's a bird.", key: 1400, do: [].concat(pose("reza", "R", "pointUp", 0, 500), [{ id: "reza.eyes", to: { x: 0.8, y: -0.4 }, dur: 300 },
              { id: "bird.wing", to: { r: 40 }, at: 500, dur: 1200, yoyo: true, times: 4 }], talk("reza", 0, 1100)) }
          ] },
        { type: "listen", say: "This is a cat.", prompt: "گوش کن. گربه نزدیک است یا دور؟",
          options: [{ pic: "🫳🐱", value: "near", en: "this cat" }, { pic: "👉 · · · 🐱", value: "far", en: "that cat" }], answer: "near" },
        { type: "listen", say: "That's a car.", quiet: true, prompt: "گوش کن. ماشین نزدیک است یا دور؟",
          options: [{ pic: "🫳🚗", value: "near", en: "this car" }, { pic: "👉 · · · 🚗", value: "far", en: "that car" }], answer: "far" },
        { type: "listen", show: "👉 · · · 🌳", prompt: "درخت دور است. کدام را می‌گویی؟",
          options: [{ label: "This is a tree.", en: "This is a tree." }, { label: "That's a tree.", en: "That's a tree." }], answer: "That's a tree." },
        { type: "listen", show: "🫳🍌", quiet: true, prompt: "موز در دست تو است. کدام را می‌گویی؟",
          options: [{ label: "This is a banana.", en: "This is a banana." }, { label: "That's a banana.", en: "That's a banana." }], answer: "This is a banana." },
        { type: "tip", text: "چیزی را در دست بگیرید و بگویید This is a spoon. بعد به چیزی دور اشاره کنید و بگویید That's a door. کودک هم همین کار را بکند. this برای نزدیک است و that برای دور؛ دست در دست یعنی this، انگشت به دور یعنی that." }
      ]
    },
    {
      id: "english-sprout-50", subject: "english", level: "sprout", emoji: "❓", title: "سؤال‌ها",
      steps: [
        /* Mina asks Reza five kinds of question, and the answer shows on the stage: what (a ball comes out),
           who (Grandpa waves), where (the cat jumps into the box), how many (three birds land), how old (six candles on his cake). */
        { type: "scene", prompt: "گوش کن و تو هم جواب بده", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, boxB: { art: "en-box-back", at: [96, 86], s: 1 }, cat: { art: "en-cat", at: [130, 86], s: 1.2 }, boxF: { art: "en-box-front", at: [96, 86], s: 1 },
            gpa: { art: "en-grandpa", at: [146, 86], s: 0.9, o: 0 }, ball: { art: "en-ball", at: [72, 86], s: 1.6, o: 0 }, cake: { art: "en-cake", at: [70, 86], s: 0.9, o: 0 },
            b1: { art: "en-bird", at: [176, 6], s: 1.2 }, b2: { art: "en-bird2", at: [176, 6], s: 1.2 }, b3: { art: "en-bird", at: [176, 6], s: 1.2 },
            mina: { art: "en-mina", at: [18, 86], s: 1.1 }, reza: { art: "en-reza", at: [44, 86], s: 1.1 } },
          scenes: [
            { caption: "What's this? It's a ball.", key: 2200, do: [].concat(pose("mina", "R", "point", 0, 500), talk("mina", 0, 900), [{ id: "ball", to: { o: 1 }, at: 400, dur: 300 }, { id: "ball", to: { y: "-6" }, at: 700, dur: 700, yoyo: true, times: 2 }], talk("reza", 1400, 900)) },
            { caption: "Who's this? It's my grandpa.", key: 2400, do: [].concat([{ id: "ball", to: { o: 0 }, dur: 300 }, { id: "gpa", to: { o: 1 }, at: 300, dur: 400 }], wave("gpa", "L", 700, 1600), talk("mina", 0, 900), talk("reza", 1400, 1200)) },
            { caption: "Where's the cat? It's in the box.", key: 2600, do: [].concat([{ id: "gpa", to: { o: 0 }, dur: 300 }], talk("mina", 0, 1100), [arc("cat", [130, 86], [96, 80], 700, 900, 16)], talk("reza", 1700, 1200)) },
            { caption: "How many birds? Three.", key: 2600, do: [].concat(talk("mina", 0, 1100), fly("b1", "M176 6Q140 10 112 52", 200, 1100), fly("b2", "M176 6Q150 20 124 54", 500, 1100), fly("b3", "M176 6Q160 30 136 56", 800, 1100), talk("reza", 2000, 700)) },
            { caption: "How old are you? I'm six.", key: 2700, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1300), [{ id: "cake", to: { o: 1 }, at: 1300, dur: 300 }], [1, 2, 3, 4, 5, 6].map(function (n) { return { id: "cake.c" + n, to: { o: 1 }, at: 1500 + n * 150, dur: 150 }; }), pose("reza", "R", [-50, -20], 1500, 400), talk("reza", 1500, 900), face("reza", true, 1500)) }
          ] },
        { type: "listen", say: "Where's the dog? It's under the bed.", prompt: "گوش کن. سگ کجاست؟",
          options: [{ pic: "🐶", ref: "🛏️", where: "on" }, { pic: "🐶", ref: "🛏️", where: "under" }, { pic: "🐶", ref: "📦", where: "in" }], answer: "under" },
        { type: "listen", say: "Who's this? It's my sister.", quiet: true, prompt: "گوش کن. کیست؟", options: [{ pic: "👵", en: "grandma" }, { pic: "👧", en: "sister" }, { pic: "👨", en: "dad" }], answer: "👧" },
        { type: "listen", say: "How many apples? Four.", quiet: true, prompt: "گوش کن. چندتا؟", options: [{ dots: 3, en: "three" }, { dots: 5, en: "five" }, { dots: 4, en: "four" }], answer: 4 },
        { type: "listen", show: "🐟🐟", say: "How many fish?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Two.", en: "Two." }, { label: "A fish.", en: "A fish." }, { label: "In the sea.", en: "In the sea." }], answer: "Two." },
        { type: "listen", show: "📦🐱", say: "Where's the cat?", quiet: true, prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "It's black.", en: "It's black." }, { label: "In the box.", en: "In the box." }, { label: "Three.", en: "Three." }], answer: "In the box." },
        { type: "tip", text: "هر سؤال کلمه‌ای دارد که می‌گوید چه جوابی می‌خواهد: What (چه چیزی)، Who (چه کسی)، Where (کجا)، How many (چندتا)، How old (چند سال). در طول روز این سؤال‌ها را بپرسید و کمک کنید کودک کوتاه جواب بدهد: In the box. Three. My mum." }
      ]
    },
    {
      id: "english-sprout-51", subject: "english", level: "sprout", emoji: "🔠", title: "نوشتن حرف‌های بزرگ",
      steps: [
        { type: "trace", letter: "S", say: "Sara", prompt: "S بزرگ را بنویس: مثل s کوچک، ولی از خط بالا تا روی خط." },
        { type: "trace", letter: "A", say: "apple", prompt: "A را بنویس: دو خط کج از نوک بالا به پایین، بعد یک خط وسط." },
        { type: "trace", letter: "R", say: "Reza", prompt: "R را بنویس: یک خط بلند پایین، بعد از بالا یک شکم کوچک و یک پای کج." },
        { type: "trace", letter: "M", say: "Mina", prompt: "M را بنویس: خط پایین، بالا، کج تا وسط، کج بالا، و خط پایین." },
        { type: "trace", letter: "T", say: "tent", prompt: "T را بنویس: اول خط بالا از چپ به راست، بعد خط وسط از بالا به پایین." },
        { type: "trace", letter: "b", say: "ball", prompt: "b کوچک را بنویس: خط بلند از بالا به پایین، بعد شکم سمت راست. (d شکمش سمت چپ است.)" },
        { type: "trace", letter: "f", say: "fish", prompt: "f کوچک را بنویس: از بالا مثل عصا پایین بیا، بعد یک خط کوتاه وسط." },
        { type: "trace", letter: "y", say: "yes", prompt: "y کوچک را بنویس: کج پایین تا وسط، بعد از بالا یک خط کج بلندتر که از خط پایین می‌رود." },
        { type: "tip", text: "حرف بزرگ فقط اول اسم‌ها و اول جمله می‌آید. اسم کودک و اعضای خانواده را با حرف اول بزرگ بنویسید (Sara، Mum، Dad). حرف‌های کوچکی که هنوز ننوشته (b، f، g، h، j، k، q، v، w، x، y، z) را هم روی کاغذ خط‌دار تمرین کنید." }
      ]
    },
    {
      id: "english-sprout-52", subject: "english", level: "sprout", emoji: "🎧", title: "دیکته کلمه",
      steps: [
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز. تصویرش آخر می‌آید.", word: "frog", parts: ["f", "r", "o", "g"], extra: ["l"], pic: "🐸" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز", word: "ship", parts: ["sh", "i", "p"], extra: ["ch"], pic: "🚢" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز", word: "rain", parts: ["r", "ai", "n"], extra: ["ee"], pic: "🌧️" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز", word: "hand", parts: ["h", "a", "n", "d"], extra: ["m"], pic: "✋" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز", word: "star", parts: ["s", "t", "ar"], extra: ["or"], pic: "⭐" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را با حرف‌ها بساز", word: "boat", parts: ["b", "oa", "t"], extra: ["ow"], pic: "⛵" },
        { type: "tip", text: "دیکته بازی کنید: کلمه‌ای را بگویید (مثل frog)، کودک صداهایش را بشمارد و بعد با حرف‌ها بسازد یا روی کاغذ بنویسد. بعد با هم نگاه کنید. اگر صدایی را جا انداخت، آهسته کلمه را دوباره صدا به صدا بگویید تا خودش پیدا کند." }
      ]
    },
    {
      id: "english-sprout-53", subject: "english", level: "sprout", emoji: "🐟", title: "نوشتن جمله کوتاه",
      steps: [
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را بساز", word: "fish", parts: ["f", "i", "sh"], extra: ["ch"], pic: "🐟" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را بساز", word: "dish", parts: ["d", "i", "sh"], extra: ["b"], pic: "🍽️" },
        { type: "build", hidden: true, prompt: "گوش کن و نوشته را با کلمه‌ها بساز", word: "a fish in a dish", parts: ["a", "fish", "in", "a", "dish"], extra: ["the"], pic: "🐟🍽️" },
        { type: "build", hidden: true, prompt: "گوش کن و نوشته را با کلمه‌ها بساز", word: "a cat on a mat", parts: ["a", "cat", "on", "a", "mat"], extra: ["in"], pic: "🐱" },
        { type: "paper", text: "حالا این نوشته را در دفترت بنویس. از چپ شروع کن.", example: "a fish in a dish",
          check: ["از چپ به راست نوشته؟", "بین کلمه‌ها فاصله گذاشته؟", "sh را با هم نوشته؟"] },
        { type: "paper", text: "یکی از این دو را بگو و بزرگ‌ترت بنویسد؛ دیگری را تو بنویس.", example: "a cat on a mat",
          check: ["همه صداها را نوشته؟", "بین کلمه‌ها فاصله گذاشته؟"] },
        { type: "tip", text: "یک نوشته کوتاه بگویید (a fish in a dish) و کودک اول بشمارد چند کلمه است، بعد کلمه به کلمه بنویسد و بین آن‌ها به اندازه یک انگشت فاصله بگذارد. لازم نیست املای همه چیز درست باشد؛ مهم این است که صداها را بشنود و بنویسد." }
      ]
    },
    {
      id: "english-sprout-54", subject: "english", level: "sprout", emoji: "🪁", title: "بازی و اسباب‌بازی",
      steps: [
        /* Arman and Mina play: "Let's play!", the robot walks and waves, the kite flies up, the doll and the bike. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, robot: { art: "en-robot", at: [80, 88], s: 0.85, o: 0 }, kite: { art: "🪁", at: inHand("en-mina", [122, 86], 1.2, "R", "hold", 0.6), s: 0.6, o: 0 },
            doll: { art: "en-doll", at: [64, 88], s: 1.4, o: 0 }, bike: { art: "🚲", at: [-30, 88], s: 1 },
            arman: { art: "en-arman", at: [36, 86], s: 1.2 }, mina: { art: "en-mina", at: [122, 86], s: 1.2 } },
          scenes: [
            { caption: "Let's play!", key: 1300, do: [].concat(wave("arman", "R", 0, 1400), wave("mina", "L", 0, 1400), talk("arman", 0, 900), jump("mina", 600, 1, 5)) },
            { caption: "I've got a robot!", key: 2000, do: [].concat([{ id: "robot", to: { o: 1 }, dur: 300 }, { id: "robot", to: { x: 92 }, at: 400, dur: 1600, ease: "linear" }, { id: "robot", to: { r: 4 }, at: 400, dur: 1600, yoyo: true, times: 6 },
              { id: "robot.armR", to: { r: -120 }, at: 1600, dur: 1000, yoyo: true, times: 4 }, { id: "robot.light", to: { o: 0.3 }, at: 400, dur: 1600, yoyo: true, times: 6 }], talk("arman", 0, 1200)) },
            { caption: "I've got a kite!", key: 2200, do: [].concat(pose("mina", "R", "hold", 0, 500), [{ id: "kite", to: { o: 1 }, at: 500, dur: 300 }, arc("kite", inHand("en-mina", [122, 86], 1.2, "R", "hold", 0.6), [140, 26], 900, 1400, 6), { id: "kite", to: { s: 1.1 }, at: 900, dur: 1400 },
              { id: "kite", to: { r: 12 }, at: 2300, dur: 1400, yoyo: true, times: 4 }], talk("mina", 0, 1200)) },
            { caption: "And a doll and a bike!", key: 2400, do: [].concat([{ id: "doll", to: { o: 1 }, dur: 400 }, { id: "doll", to: { y: "-3" }, at: 400, dur: 600, yoyo: true, times: 2 },
              { id: "bike", to: { x: 52 }, at: 1000, dur: 1500, ease: "out" }, { id: "bike", to: { r: -3 }, at: 2500, dur: 600, yoyo: true, times: 2 }], talk("arman", 0, 1600)) }
          ] },
        { type: "words", show: true, words: [{ pic: "🪁", en: "kite" }, { art: "en-robot", en: "robot" }, { pic: "🪆", en: "doll" }, { pic: "🚲", en: "bike" }, { pic: "🎲", en: "game" }] },
        { type: "listen", say: "I've got a robot.", prompt: "گوش کن. چه دارد؟", options: [{ pic: "🪁", en: "kite" }, { art: "en-robot", value: "robot", en: "robot" }, { pic: "🚲", en: "bike" }], answer: "robot" },
        { type: "listen", say: "Let's play a game!", quiet: true, prompt: "گوش کن. چه چیزی؟", options: [{ pic: "🎲", en: "game" }, { pic: "🪆", en: "doll" }, { pic: "🪁", en: "kite" }], answer: "🎲" },
        { type: "listen", say: "My bike is red.", quiet: true, prompt: "گوش کن. چه چیزی؟", options: [{ pic: "🚲", en: "bike" }, { pic: "🚗", en: "car" }, { pic: "⚽", en: "ball" }], answer: "🚲" },
        { type: "tip", text: "موقع بازی به انگلیسی بگویید Let's play! و اسم اسباب‌بازی‌ها را بگویید: a kite، a robot، a doll، a bike. بازی «Let's play …» هم خوب است: یکی بگوید Let's play with the ball! و همه همان بازی را بکنند." }
      ]
    },
    {
      id: "english-sprout-55", subject: "english", level: "sprout", emoji: "🐠", title: "قصه: ماهی بزرگ",
      steps: [
        { type: "passage", prompt: "قصه را بخوان",
          text: "Dad and Sam went to the river. \"I like fish,\" said Sam. Dad had a net. Sam had a rod.",
          question: "سام و پدرش کجا رفتند؟", options: ["🏞️", "🏫", "🏪"], answer: "🏞️" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "Sam got a big fish! It was so big. \"Look, Dad!\" said Sam. The fish was sad. \"Let it go,\" said Dad.",
          question: "ماهی چطور بود؟", options: ["🐟", "🐋"], answer: "🐋" },
        { type: "passage", prompt: "آخر قصه را بخوان",
          text: "Sam let the big fish go. Splash! The fish swam off. Sam and Dad had a picnic, and that was fun.",
          question: "آخرش با ماهی چه کردند؟", options: ["🍽️", "🌊", "🛁"], answer: "🌊" },
        { type: "passage", prompt: "قصه را از اول بخوان. این بار یک سؤال دیگر.",
          text: "Dad and Sam went to the river. \"I like fish,\" said Sam. Dad had a net. Sam had a rod.",
          question: "پدر چه چیزی داشت؟", options: ["🥅", "🎣", "🎒"], answer: "🥅" },
        { type: "tip", text: "این قصه چند کلمه تصویری دارد (said، was، so، go، like، the، to). قصه را با هم بخوانید و از کودک بپرسید «تو بودی ماهی را چه می‌کردی؟» بعد قصه را با سه نقاشی (اول، وسط، آخر) با هم تعریف کنید." }
      ]
    },
    {
      id: "english-sprout-56", subject: "english", level: "sprout", emoji: "🔁", title: "یک صدا را عوض کن",
      steps: [
        { type: "build", prompt: "گوش کن و بساز: cat", word: "cat", parts: ["c", "a", "t"], extra: ["h"], pic: "🐱" },
        { type: "build", prompt: "حالا فقط صدای اول را عوض کن: cat ← hat", word: "hat", parts: ["h", "a", "t"], extra: ["c"], pic: "👒" },
        { type: "build", prompt: "حالا صدای وسط را عوض کن: hat ← hot", word: "hot", parts: ["h", "o", "t"], extra: ["a"], pic: "🔥" },
        { type: "build", prompt: "حالا صدای آخر را عوض کن: hot ← hop", word: "hop", parts: ["h", "o", "p"], extra: ["t"], pic: "🐇" },
        { type: "build", prompt: "یک صدا را عوض کن: hop ← mop", word: "mop", parts: ["m", "o", "p"], extra: ["h"], pic: "🧹" },
        { type: "build", prompt: "یک صدا را عوض کن: mop ← map", word: "map", parts: ["m", "a", "p"], extra: ["o"], pic: "🗺️" },
        { type: "tip", text: "بازی «زنجیره کلمه» کنید: یک کلمه بنویسید (cat) و هر بار فقط یک حرف را عوض کنید (hat، hot، hop، mop، map). کودک هر کلمه تازه را بخواند. با حرف‌های پلاستیکی یا کارت‌های کاغذی، بازی جذاب‌تر می‌شود." }
      ]
    },
    {
      id: "english-sprout-57", subject: "english", level: "sprout", emoji: "📢", title: "بلند بخوان",
      steps: [
        { type: "readaloud", pic: "🐸", text: "A frog sat on a log. It was hot. The frog had a swim in the pond. Then it got out and sat in the sun." },
        { type: "passage", prompt: "حالا یک بار دیگر بخوان و جواب بده", text: "A frog sat on a log. It was hot. The frog had a swim in the pond. Then it got out and sat in the sun.",
          question: "قورباغه کجا شنا کرد؟", options: ["🛁", "🏞️", "🌊"], answer: "🏞️" },
        { type: "readaloud", pic: "🌙", text: "I can see the moon and a star at night. I look up. The moon is big and the star is small." },
        { type: "passage", prompt: "حالا یک بار دیگر بخوان و جواب بده", text: "I can see the moon and a star at night. I look up. The moon is big and the star is small.",
          question: "کدام کوچک است؟", options: ["🌙", "⭐"], answer: "⭐" },
        { type: "tip", text: "بلند خواندن هر روز، حتی پنج دقیقه، خواندن را روان می‌کند. اول کودک بخواند و شما کلمه‌های سخت را علامت بزنید؛ آن کلمه‌ها را با هم صدا به صدا تمرین کنید و بعد کودک دوباره کل متن را بخواند. سرعت مهم نیست؛ درست خواندن مهم است." }
      ]
    },
    {
      id: "english-sprout-58", subject: "english", level: "sprout", emoji: "🏆", title: "بازی بزرگ کلمه‌ها",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد درست بگذار: مدرسه، خانه یا لباس.",
          baskets: [{ pic: "🏫", value: "school" }, { pic: "🏠", value: "home" }, { pic: "👕", value: "clothes" }],
          items: [{ pic: "✏️", say: "pencil", basket: "school" }, { pic: "🛋️", say: "sofa", basket: "home" }, { pic: "👗", say: "dress", basket: "clothes" },
            { pic: "📏", say: "ruler", basket: "school" }, { pic: "🪞", say: "mirror", basket: "home" }, { pic: "👖", say: "trousers", basket: "clothes" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🦒", say: "giraffe" }, { pic: "🦒", say: "giraffe" }], [{ pic: "🐒", say: "monkey" }, { pic: "🐒", say: "monkey" }],
            [{ pic: "🕷️", say: "spider" }, { pic: "🕷️", say: "spider" }], [{ pic: "🐊", say: "crocodile" }, { pic: "🐊", say: "crocodile" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. خوراکی‌ها را در یک سبد و اسباب‌بازی‌ها را در سبد دیگر بگذار.",
          baskets: [{ pic: "🍽️", value: "food" }, { pic: "🧸", value: "toy" }],
          items: [{ pic: "🍚", say: "rice", basket: "food" }, { pic: "🪁", say: "kite", basket: "toy" }, { pic: "🍗", say: "chicken", basket: "food" },
            { pic: "🚲", say: "bike", basket: "toy" }, { pic: "🥕", say: "carrots", basket: "food" }, { pic: "🎲", say: "game", basket: "toy" }] },
        { type: "pairs", prompt: "بشمار و هر عدد را با دسته‌ای جفت کن که به همان تعداد است",
          pairs: [[{ dots: 12, say: "twelve" }, { dots: 12 }], [{ dots: 15, say: "fifteen" }, { dots: 15 }], [{ dots: 18, say: "eighteen" }, { dots: 18 }], [{ dots: 20, say: "twenty" }, { dots: 20 }]] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "💪", say: "arm" }, { pic: "💪", say: "arm" }], [{ pic: "🦵", say: "leg" }, { pic: "🦵", say: "leg" }],
            [{ pic: "💇", say: "hair" }, { pic: "💇", say: "hair" }], [{ pic: "🙂", say: "face" }, { pic: "🙂", say: "face" }]] },
        { type: "tip", text: "این بازی کلمه‌های همه درس‌های جوانه را مرور می‌کند. بازی «یک کلمه بگو» کنید: یک دسته بگویید (school، food، animals) و هر کس به نوبت یک کلمه انگلیسی از آن دسته بگوید." }
      ]
    },
    {
      id: "english-sprout-59", subject: "english", level: "sprout", emoji: "🔤", title: "بازی بزرگ صداها",
      steps: [
        { type: "pairs", prompt: "هر حرف را با تصویری جفت کن که با صدای آن شروع می‌شود",
          pairs: [["b", { pic: "🚌", say: "bus" }], ["g", { pic: "🐐", say: "goat" }], ["r", { pic: "🐰", say: "rabbit" }], ["v", { pic: "🚐", say: "van" }]] },
        { type: "pairs", prompt: "هر دو حرف را با تصویری جفت کن که صدای آن را دارد",
          pairs: [["sh", { pic: "🚢", say: "ship" }], ["ch", { pic: "🐥", say: "chick" }], ["ee", { pic: "🌳", say: "tree" }], ["oa", { pic: "⛵", say: "boat" }]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن و آن را در سبد صدایش بگذار",
          baskets: [{ label: "igh" }, { label: "oo" }, { label: "ar" }],
          items: [{ pic: "🌙", say: "night", basket: "igh" }, { pic: "🥄", say: "spoon", basket: "oo" }, { pic: "⭐", say: "star", basket: "ar" },
            { pic: "💡", say: "light", basket: "igh" }, { pic: "🦁", say: "zoo", basket: "oo" }, { pic: "🚗", say: "car", basket: "ar" }] },
        { type: "build", prompt: "گوش کن و این کلمه را بساز", word: "queen", parts: ["qu", "ee", "n"], extra: ["oa"], pic: "👸" },
        { type: "build", prompt: "گوش کن و این کلمه را بساز", word: "coin", parts: ["c", "oi", "n"], extra: ["ow"], pic: "🪙" },
        { type: "build", prompt: "گوش کن و این کلمه را بساز", word: "chair", parts: ["ch", "air"], extra: ["ear"], pic: "🪑" },
        { type: "tip", text: "این بازی همه حرف‌ها و دوحرفی‌های جوانه را مرور می‌کند. کارت‌های صدا را قاطی کنید؛ هر بار یکی را بردارید و کودک صدایش و یک کلمه با آن را بگوید. کارت‌هایی را که هنوز سخت‌اند جدا کنید و فردا دوباره بازی کنید." }
      ]
    },
    {
      id: "english-sprout-60", subject: "english", level: "sprout", emoji: "🌱", title: "ببین چه بلدی",
      steps: [
        { type: "listen", show: "ship", prompt: READ_PROMPT, options: ["🐑", "🚢", "🧀"], answer: "🚢" },
        { type: "listen", show: "frog", quiet: true, prompt: READ_PROMPT, options: ["🐸", "🦀", "🚩"], answer: "🐸" },
        { type: "listen", show: "rain", quiet: true, prompt: READ_PROMPT, options: ["🌳", "🌧️", "⛵"], answer: "🌧️" },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["star", "⭐"], ["moon", "🌙"], ["hand", "✋"], ["coat", "🧥"]] },
        { type: "passage", prompt: "این دو جمله را بخوان", text: "The cat is in the box. The dog is on the bed.",
          question: "سگ کجاست؟", options: ["📦", "🛏️", "🌳"], answer: "🛏️" },
        { type: "listen", say: "Point to the red car.", prompt: "گوش کن و همان را نشان بده", options: [{ pic: "🚗", en: "the red car" }, { pic: "🚙", en: "the blue car" }, { pic: "🚌", en: "the bus" }], answer: "🚗" },
        { type: "listen", say: "Can you see three birds?", quiet: true, prompt: "گوش کن و همان را نشان بده", options: [{ pic: "🐦🐦", en: "two birds" }, { pic: "🐦🐦🐦", en: "three birds" }, { pic: "🐦", en: "a bird" }], answer: "🐦🐦🐦" },
        { type: "tip", text: "این درس آخر جوانه است و نشان می‌دهد کودک چه چیزهایی را بلد است: خواندن کلمه‌های کوتاه با صداهای تازه، دو جمله کوتاه، و گوش دادن و نشان دادن. اگر جایی سخت بود، درس‌های همان صداها را دوباره بازی کنید. هر روز چند دقیقه بلند خواندن و بازی‌های صدا را ادامه بدهید؛ در نهال جمله‌ها و قصه‌ها بلندتر می‌شوند." }
      ]
    },
    // ---------------- English: Sapling (short sentences, questions and answers, everyday phrases) ----------------
    {
      id: "english-sapling-1", subject: "english", level: "sapling", emoji: "👀", title: "I can see",
      steps: [
        /* Sara shades her eyes and points at what she can see: a cat on the wall, a dog, a red apple in the tree,
           two birds landing on its branch. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            garden: { art: "en-garden" }, tree: { art: "en-tree", at: [134, 88], s: 1.15 }, apple: { art: "🍎", at: [141, 39], s: 0.55 },
            cat: { art: "en-cat", at: [-12, 88], s: 1.2 }, dog: { art: "en-dog", at: [200, 88], s: 1.1, flip: true },
            b1: { art: "en-bird", at: [176, 6], s: 1.2 }, b2: { art: "en-bird2", at: [180, 14], s: 1.2 },
            sara: { art: "en-sara", at: [70, 88], s: 1.15 }
          },
          scenes: [
            { caption: "I can see a cat.", do: [].concat([{ id: "cat", path: "M-12 88Q4 38 28 56", dur: 900 }],
              pose("sara", "R", "shade", 300, 500), pose("sara", "L", "pointUp", 900, 500), [{ id: "sara.eyes", to: { x: -0.7 }, at: 300, dur: 300 }], talk("sara", 0, 1400)) },
            { caption: "I can see a dog.", do: [].concat([{ id: "cat", path: "M28 56Q22 42 14 66", dur: 600 }, { id: "cat", to: { o: 0 }, at: 300, dur: 300 }],
              pose("sara", "L", "down", 0, 400), pose("sara", "R", "down", 0, 400), trot("dog", 124, 300, 1300),
              pose("sara", "L", "shade", 500, 500), pose("sara", "R", "point", 1100, 500), [{ id: "sara.eyes", to: { x: 0.7 }, at: 400, dur: 300 }], talk("sara", 0, 1400)) },
            { caption: "I can see a red apple.", do: [].concat([{ id: "dog", to: { flip: 1 }, dur: 300 }], trot("dog", 215, 300, 1300),
              pose("sara", "R", "pointUp", 300, 500), [{ id: "sara.eyes", to: { y: -0.6 }, at: 300, dur: 300 },
                { id: "apple", to: { s: 0.75 }, at: 900, dur: 900, yoyo: true, times: 2 },
                { emit: "spark", where: [141, 33], spread: [10, 10], n: 8, at: 900, dur: 900, life: 900 }], talk("sara", 0, 1600)) },
            { caption: "I can see two birds.", do: [].concat(fly("b1", "M176 6Q140 14 104 46.4", 0, 1300), fly("b2", "M180 14Q150 30 117 48.4", 300, 1300),
              [{ id: "sara.eyes", to: { x: 0.5, y: -0.6 }, dur: 300 }], talk("sara", 0, 1600)) }
          ] },
        { type: "listen", say: "I can see a dog.", prompt: "گوش کن. چه چیزی را می‌بیند؟", options: ["🐱", "🐶", "🐟"], answer: "🐶" },
        { type: "listen", say: "I can see two cats.", quiet: true, prompt: "گوش کن. چه چیزی را می‌بیند؟", options: ["🐱", "🐱🐱", "🐱🐱🐱"], answer: "🐱🐱" },
        { type: "listen", say: "I can see a green apple.", quiet: true, prompt: "گوش کن. چه چیزی را می‌بیند؟", options: ["🍎", "🍌", "🍏"], answer: "🍏" },
        { type: "listen", say: "I can see three fish.", quiet: true, prompt: "گوش کن. چه چیزی را می‌بیند؟", options: ["🐟🐟🐟", "🐦🐦🐦", "🐟"], answer: "🐟🐟🐟" },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I can see a cat.", items: ["I", "can", "see", "a", "cat."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I can see a red bus.", items: ["I", "can", "see", "a", "red", "bus."] },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a red apple", "🍎"], ["a green apple", "🍏"], ["two cats", "🐱🐱"], ["a dog", "🐶"]] },
        { type: "tip", text: "بازی «I can see» را در خانه یا بیرون بازی کنید: هر کس به چیزی نگاه کند و بگوید I can see a cat، I can see a red car. کودک هم با کلمه‌هایی که بلد است جمله بسازد. اگر کلمه‌ای را بلد نبود، با فارسی بگوید و بازی ادامه پیدا کند." }
      ]
    },
    {
      id: "english-sapling-2", subject: "english", level: "sapling", emoji: "❓", title: "سؤال و جواب",
      steps: [
        /* Sara asks, Arman answers: the question comes with a pointing hand and a question mark, the answer with
           the duck quacking and a bubble of red. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            farm: { art: "en-farm" }, duck: { art: "en-duck", at: [80, 86], s: 1.8 }, balloon: { art: "🎈", at: [80, 124], s: 1.4 },
            sara: { art: "en-sara", at: [24, 86], s: 1.15 }, arman: { art: "en-arman", at: [136, 86], s: 1.15 },
            ask: { art: "en-ask", at: [34, 50], s: 1.1, o: 0 }, say: { art: "en-say", at: [126, 50], s: 1.1, o: 0 }, red: { art: "en-red", at: [117, 37], s: 1.1, o: 0 }
          },
          scenes: [
            { caption: "What is this?", do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1200), pop("ask", 500)) },
            { caption: "It is a duck.", key: 1100, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("arman", "L", "point", 0, 500), talk("arman", 0, 1200),
              pose("sara", "R", "down", 0, 400), [
                { id: "duck.bill", to: { r: 32 }, at: 700, dur: 900, yoyo: true, times: 4 }, { id: "duck.head", to: { r: -8 }, at: 700, dur: 900, yoyo: true, times: 2 }
              ]) },
            { caption: "What colour is it?", do: [].concat(pose("arman", "L", "down", 0, 400), [
              { id: "duck", to: { x: -30 }, dur: 1600, ease: "linear" }, { id: "duck", to: { flip: -1 }, dur: 200 }, { id: "duck", to: { r: 8 }, at: 200, dur: 1400, yoyo: true, times: 6 },
              { id: "balloon", to: { y: 66 }, at: 600, dur: 1400, ease: "out" }, { id: "balloon", to: { r: 6 }, at: 600, dur: 1600, yoyo: true, times: 4 }
            ], pose("sara", "R", "point", 1400, 500), talk("sara", 0, 1400), pop("ask", 1500)) },
            { caption: "It is red.", do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400), pose("arman", "L", "point", 0, 500), talk("arman", 0, 1100),
              pop("say", 400), pop("red", 500), [{ id: "balloon", to: { y: "-3" }, at: 600, dur: 1200, yoyo: true, times: 2 }]) }
          ] },
        { type: "listen", show: "🐶", say: "Is it a dog?", prompt: "گوش کن و جواب بده",
          options: [{ pic: "✅", label: "Yes", value: "yes", en: "Yes" }, { pic: "❌", label: "No", value: "no", en: "No" }], answer: "yes" },
        { type: "listen", show: "🐱", say: "Is it a dog?", quiet: true, prompt: "گوش کن و جواب بده",
          options: [{ pic: "✅", label: "Yes", value: "yes", en: "Yes" }, { pic: "❌", label: "No", value: "no", en: "No" }], answer: "no" },
        { type: "listen", show: "🍎", say: "What colour is it?", prompt: "گوش کن و جواب بده",
          options: [{ color: GREEN, value: "green", en: "It is green." }, { color: RED, value: "red", en: "It is red." }, { color: BLUE, value: "blue", en: "It is blue." }], answer: "red" },
        { type: "listen", show: "🐟🐟🐟", say: "How many fish?", prompt: "گوش کن و جواب بده",
          options: [{ dots: 2, en: "Two." }, { dots: 4, en: "Four." }, { dots: 3, en: "Three." }], answer: 3 },
        { type: "listen", show: "🦆", say: "What is this?", prompt: "گوش کن، جواب‌ها را بخوان و درستش را انتخاب کن",
          options: [{ label: "It is a cat.", en: "It is a cat." }, { label: "It is a duck.", en: "It is a duck." }, { label: "It is a bus.", en: "It is a bus." }], answer: "It is a duck." },
        { type: "order", prompt: "گوش کن و کلمه‌های جواب را به ترتیب بچین", ltr: true, say: "It is a fish.", items: ["It", "is", "a", "fish."] },
        { type: "tip", text: "به چیزهای دور و بر اشاره کنید و بپرسید What is this? کودک با جمله کامل جواب بدهد: It is a cup. اگر خودتان اسم انگلیسی چیزی را نمی‌دانید، همان چیزهای این درس‌ها را بپرسید. بعد جایتان را عوض کنید تا کودک سؤال کند." }
      ]
    },
    {
      id: "english-sapling-9", subject: "english", level: "sapling", emoji: "👫", title: "I am, you are",
      steps: [
        /* Sara shows who everyone is: herself (hand on chest), her little brother and sister (who wave), and her
           friends Mina and Reza (who come and wave together). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sara: { art: "en-sara", at: [30, 86], s: 1.2 }, bro: { art: "en-brother", at: [58, 86], s: 1.2 },
            sis: { art: "en-sister", at: [80, 86], s: 1.2 }, mina: { art: "en-mina", at: [190, 86], s: 1.2 }, reza: { art: "en-reza", at: [210, 86], s: 1.2 } },
          scenes: [
            { caption: "Hello! I'm Sara.", key: 1300, do: [].concat(wave("sara", "L", 0, 1000), pose("sara", "R", "chest", 900, 500), talk("sara", 0, 1600)) },
            { caption: "He's my brother.", key: 1500, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1300), wave("bro", "R", 600, 1400)) },
            { caption: "She's my sister. She's six.", key: 2000, do: [].concat(talk("sara", 0, 2200), wave("sis", "R", 600, 1400), [{ id: "sis", to: { y: "-4" }, at: 1400, dur: 600, yoyo: true, times: 2 }]) },
            { caption: "They're my friends.", key: 2600, do: [].concat(pose("sara", "R", "down", 0, 400), walk("mina", 112, 0, 2000), walk("reza", 140, 200, 2000), wave("mina", "L", 2200, 1400), wave("reza", "L", 2200, 1400), talk("sara", 2200, 1300)) },
            { caption: "We're in the park!", key: 625, do: [].concat(jump("sara", 300, 1, 5), jump("bro", 300, 1, 5), jump("sis", 300, 1, 5), jump("mina", 300, 1, 5), jump("reza", 300, 1, 5)) }
          ] },
        { type: "listen", say: "He's my brother.", prompt: "گوش کن. درباره چه کسی است؟", options: [{ pic: "👧", en: "she" }, { pic: "👦", en: "he" }, { pic: "👫", en: "they" }], answer: "👦" },
        { type: "listen", say: "They're my friends.", quiet: true, prompt: "گوش کن. درباره چه کسی است؟", options: [{ pic: "👫", en: "they" }, { pic: "👧", en: "she" }, { pic: "🙋", en: "I" }], answer: "👫" },
        { type: "sort", prompt: "هر کلمه با کدام شکل کوتاه می‌آید؟ I'm، he's یا they're؟ کلمه را در سبد درست بگذار.",
          baskets: [{ label: "'m" }, { label: "'s" }, { label: "'re" }],
          items: [{ label: "I", say: "I'm", basket: "'m" }, { label: "he", say: "he's", basket: "'s" }, { label: "she", say: "she's", basket: "'s" },
            { label: "we", say: "we're", basket: "'re" }, { label: "they", say: "they're", basket: "'re" }, { label: "you", say: "you're", basket: "'re" }] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "She's my sister.", items: ["She's", "my", "sister."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "They're my friends.", items: ["They're", "my", "friends."] },
        { type: "listen", show: "I am", prompt: "شکل کوتاه I am کدام است؟", options: [{ label: "I'm", en: "I'm" }, { label: "I's", en: "I's" }, { label: "I're", en: "I're" }], answer: "I'm" },
        { type: "tip", text: "عکس‌های خانوادگی را دوباره نگاه کنید، این بار با جمله کامل: He's my uncle. She's my cousin. They're my grandparents. کودک هم درباره خودش بگوید: I'm Sara. I'm seven. در گفتار، انگلیسی‌زبان‌ها تقریباً همیشه شکل کوتاه را به کار می‌برند." }
      ]
    },
    {
      id: "english-sapling-10", subject: "english", level: "sapling", emoji: "❔", title: "Is he? Yes, he is.",
      steps: [
        /* Reza guesses what is in the box (no, it isn't a cat: a dog jumps out), and Mina asks if he is tired (no, he
           isn't: he jumps). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, boxB: { art: "en-box-back", at: [80, 86], s: 1.3 },
            dog: { art: "en-dog", at: [80, 96], s: 0.9, o: 0 }, boxF: { art: "en-box-front", at: [80, 86], s: 1.3 },
            reza: { art: "en-reza", at: [126, 86], s: 1.2 }, mina: { art: "en-mina", at: [34, 86], s: 1.2 }, ask: { art: "en-ask", at: [116, 46], o: 0, flip: true } },
          scenes: [
            { caption: "Is it a cat?", key: 1500, do: [].concat(pose("reza", "L", "point", 0, 500), talk("reza", 0, 1000), pop("ask", 500), [{ id: "boxF", to: { r: 4 }, at: 600, dur: 1200, yoyo: true, times: 4 }, { id: "boxB", to: { r: 4 }, at: 600, dur: 1200, yoyo: true, times: 4 }]) },
            { caption: "No, it isn't. It's a dog!", key: 1600, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }, { id: "dog", to: { o: 1 }, dur: 100 }, { id: "dog", to: { y: 70 }, dur: 600, ease: "back" },
              { id: "dog.jaw", to: { r: 30 }, at: 800, dur: 800, yoyo: true, times: 4 }, { id: "dog.tail", to: { r: -25 }, at: 800, dur: 1400, yoyo: true, times: 6 }], shake("mina", 300), talk("mina", 300, 1400)) },
            { caption: "Are you tired?", key: 1300, do: [].concat(pose("reza", "L", "down", 0, 400), pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1000)) },
            { caption: "No, I'm not. I'm happy!", key: 1850, do: [].concat(pose("mina", "R", "down", 0, 400), shake("reza", 0), talk("reza", 0, 1700), face("reza", true, 1400), jump("reza", 1500, 2, 6)) }
          ] },
        { type: "listen", show: "🐶", say: "Is it a cat?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Yes, it is.", en: "Yes, it is." }, { label: "No, it isn't.", en: "No, it isn't." }], answer: "No, it isn't." },
        { type: "listen", show: "🍎", say: "Is it an apple?", quiet: true, prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Yes, it is.", en: "Yes, it is." }, { label: "No, it isn't.", en: "No, it isn't." }], answer: "Yes, it is." },
        { type: "listen", show: "👦😴", say: "Is he happy?", quiet: true, prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Yes, he is.", en: "Yes, he is." }, { label: "No, he isn't. He's tired.", en: "No, he isn't. He's tired." }], answer: "No, he isn't. He's tired." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Is she your sister?", items: ["Is", "she", "your", "sister?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I'm not tired.", items: ["I'm", "not", "tired."] },
        { type: "tip", text: "بازی «درست یا نه؟» کنید: به چیزی اشاره کنید و عمداً درست یا غلط بپرسید: Is it a cup? Is it red? Is he your dad? کودک جواب بدهد Yes, it is. یا No, it isn't. It's a … . در سؤال، is اول جمله می‌آید: He is → Is he?" }
      ]
    },
    {
      id: "english-sapling-3", subject: "english", level: "sapling", emoji: "🙂", title: "جمله‌های هر روز",
      steps: [
        /* Sara and Reza meet: hello with a wave, my name with a hand on the chest, a question with an open hand and
           a question mark, fine with a happy jump. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: {
            park: { art: "en-park" }, sara: { art: "en-sara", at: [46, 86], s: 1.25 }, reza: { art: "en-reza", at: [114, 86], s: 1.25 },
            askS: { art: "en-ask", at: [56, 46], o: 0 }, askR: { art: "en-ask", at: [104, 46], o: 0, flip: true }
          },
          scenes: [
            { caption: "Hello! What is your name?", key: 2600, hold: 3600, do: [].concat(wave("sara", "R", 0, 1300), talk("sara", 0, 2600),
              pose("sara", "R", "ask", 1800, 500), pop("askS", 2000)) },
            { caption: "My name is Reza. What is your name?", key: 1200, hold: 4600, do: [].concat([{ id: "askS", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400),
              pose("reza", "L", "chest", 0, 500), talk("reza", 0, 3400), pose("reza", "L", "ask", 2000, 500), pop("askR", 2200)) },
            { caption: "My name is Sara. How are you?", key: 1200, hold: 4400, do: [].concat([{ id: "askR", to: { o: 0 }, dur: 300 }], pose("reza", "L", "down", 0, 400),
              pose("sara", "R", "chest", 0, 500), talk("sara", 0, 3000), pose("sara", "R", "ask", 1900, 500), pop("askS", 2100)) },
            { caption: "I am fine, thank you.", key: 1700, hold: 3600, do: [].concat([{ id: "askS", to: { o: 0 }, dur: 300 }], pose("sara", "R", "down", 0, 400),
              [{ id: "reza", to: { y: "-4" }, dur: 600, yoyo: true, times: 2 }], talk("reza", 0, 2200),
              pose("reza", "L", "chest", 900, 500), [{ id: "reza.head", to: { y: 1.2 }, at: 1400, dur: 700, yoyo: true, times: 2 }]) }
          ] },
        { type: "words", show: true, prompt: "روی هر تصویر بزن، گوش کن و بلند بگو",
          words: [{ pic: "😊", en: "I am happy." }, { pic: "😢", en: "I am sad." }, { pic: "😴", en: "I am sleepy." }, { pic: "🍽️", en: "I am hungry." }] },
        { type: "listen", say: "I am sleepy.", options: [{ pic: "😊", en: "I am happy." }, { pic: "😴", en: "I am sleepy." }, { pic: "🍽️", en: "I am hungry." }], answer: "😴" },
        { type: "listen", say: "I am happy.", quiet: true, options: [{ pic: "😢", en: "I am sad." }, { pic: "🍽️", en: "I am hungry." }, { pic: "😊", en: "I am happy." }], answer: "😊" },
        { type: "listen", show: "🎁", prompt: "کسی به تو هدیه داده است. چه می‌گویی؟",
          options: [{ label: "Goodbye!" }, { label: "Thank you!" }, { label: "Good night!" }], answer: "Thank you!" },
        { type: "listen", show: "🌙", prompt: "وقت خواب است. چه می‌گویی؟",
          options: [{ label: "Good night!" }, { label: "Good morning!" }, { label: "I am hungry." }], answer: "Good night!" },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "My name is Sara.", items: ["My", "name", "is", "Sara."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "How are you?", items: ["How", "are", "you?"] },
        { type: "tip", text: "هر روز چند جمله کوتاه را با هم تمرین کنید: سر صبحانه بپرسید How are you? و کودک بگوید I am fine, thank you یا I am hungry. از کودک بپرسید What is your name? تا اسمش را با جمله کامل بگوید: My name is … . درست گفتن مهم‌تر از تند گفتن است." }
      ]
    },
    {
      id: "english-sapling-11", subject: "english", level: "sapling", emoji: "🎂", title: "ay و a-e",
      steps: [
        { type: "letter", letter: "ay", end: true, like: "اِی", words: [{ pic: "☀️", en: "day" }, { pic: "🤸", en: "play" }, { pic: "🗣️", en: "say" }] },
        { type: "letter", letter: "a-e", words: [{ pic: "🎂", en: "cake" }, { pic: "🎲", en: "game" }, { pic: "🐍", en: "snake" }] },
        { type: "listen", show: "cake", prompt: READ_PROMPT, options: ["🎂", "🐍", "☀️"], answer: "🎂" },
        { type: "listen", show: "play", quiet: true, prompt: READ_PROMPT, options: ["🗣️", "🎲", "🤸"], answer: "🤸" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای «اِی» با ay نوشته شده یا با a-e؟",
          baskets: [{ label: "ay" }, { label: "a-e" }],
          items: [{ label: "day", say: "day", basket: "ay" }, { label: "name", say: "name", basket: "a-e" }, { label: "say", say: "say", basket: "ay" },
            { label: "game", say: "game", basket: "a-e" }, { label: "play", say: "play", basket: "ay" }, { label: "cake", say: "cake", basket: "a-e" }] },
        { type: "listen", show: "can → cane", say: "can. cane.", prompt: "e آخر را ببین. کلمه دوم چه صدایی دارد؟",
          options: [{ pic: "🥫", en: "can", value: "can" }, { pic: "🦯", en: "cane", value: "cane" }], answer: "cane" },
        { type: "build", prompt: "گوش کن و بساز. e آخر را فراموش نکن!", word: "name", parts: ["n", "a", "m", "e"], extra: ["y"], pic: "🏷️" },
        { type: "build", prompt: "گوش کن و بساز", word: "play", parts: ["p", "l", "ay"], extra: ["a"], pic: "🤸" },
        { type: "tip", text: "صدای «اِی» چند جور نوشته می‌شود: ai وسط کلمه (rain)، ay آخر کلمه (day)، و a-e که e آخر خوانده نمی‌شود ولی a را «اِی» می‌کند (cake، name). بازی جادوی e: کلمه can را بنویسید و یک e آخرش بگذارید: cane!" }
      ]
    },
    {
      id: "english-sapling-12", subject: "english", level: "sapling", emoji: "🚲", title: "ie و i-e",
      steps: [
        { type: "letter", letter: "ie", end: true, like: "آی", words: [{ pic: "🥧", en: "pie" }, { pic: "👔", en: "tie" }, { pic: "🤥", en: "lie" }] },
        { type: "letter", letter: "i-e", words: [{ pic: "🚲", en: "bike" }, { pic: "⏰", en: "time" }, { pic: "5️⃣", en: "five" }] },
        { type: "listen", show: "bike", prompt: READ_PROMPT, options: ["🥧", "🚲", "👔"], answer: "🚲" },
        { type: "listen", show: "tie", quiet: true, prompt: READ_PROMPT, options: ["👔", "⏰", "💡"], answer: "👔" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای «آی» با ie، i-e یا igh نوشته شده؟",
          baskets: [{ label: "ie" }, { label: "i-e" }, { label: "igh" }],
          items: [{ label: "pie", say: "pie", basket: "ie" }, { label: "time", say: "time", basket: "i-e" }, { label: "light", say: "light", basket: "igh" },
            { label: "tie", say: "tie", basket: "ie" }, { label: "five", say: "five", basket: "i-e" }, { label: "night", say: "night", basket: "igh" }] },
        { type: "build", prompt: "گوش کن و بساز. e آخر را فراموش نکن!", word: "bike", parts: ["b", "i", "k", "e"], extra: ["y"], pic: "🚲" },
        { type: "build", prompt: "گوش کن و بساز", word: "time", parts: ["t", "i", "m", "e"], extra: ["igh"], pic: "⏰" },
        { type: "tip", text: "صدای «آی» هم چند جور نوشته می‌شود: ie (pie)، i-e (bike، five) و igh (light). وقتی کودک کلمه‌ای با i و یک e در آخر دید، یادش بیاورید که e آخر، i را «آی» می‌کند: pin → pine، kit → kite." }
      ]
    },
    {
      id: "english-sapling-4", subject: "english", level: "sapling", emoji: "😋", title: "دوست دارم",
      steps: [
        /* Sara eats an apple and smiles; she pushes an onion away, frowning and shaking her head. Reza drinks milk and
           smiles; a bee buzzes round him and he frowns and steps back. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf0d5",
          parts: {
            kitchen: { art: "en-kitchen" }, sara: { art: "en-sara", at: [38, 86], s: 1.2 }, reza: { art: "en-reza", at: [122, 86], s: 1.2 },
            table: { art: "en-table", at: [80, 88], s: 0.75 },
            apple: { art: "🍎", at: [55, 72.3], s: 0.5 }, onion: { art: "🧅", at: [80, 72.3], s: 0.5 }, milk: { art: "🥛", at: [105, 72.3], s: 0.5 },
            heartS: { art: "en-heart", at: [38, 36], s: 1.3, o: 0 }, heartR: { art: "en-heart", at: [122, 36], s: 1.3, o: 0 },
            bee: { art: "🐝", at: [182, 18], s: 0.6 }
          },
          scenes: [
            { caption: "I like apples.", do: [].concat(pose("sara", "R", [-34, -42], 0, 500), pose("sara", "R", "mouth", 700, 600),
              [{ id: "apple", path: "M55 72.3Q50 58 40 61.5", at: 700, dur: 600 }, { id: "apple", to: { s: 0.42 }, at: 1500, dur: 200 }],
              talk("sara", 0, 1100), pop("heartS", 1800)) },
            { caption: "I don't like onions.", key: 1700, do: [].concat([{ id: "apple", to: { o: 0 }, dur: 300 }, { id: "heartS", to: { o: 0 }, dur: 300 }],
              pose("sara", "R", "down", 0, 400), [{ id: "onion", path: "M80 72.3Q72 56 60 62", at: 400, dur: 800 }], face("sara", false, 900),
              shake("sara", 1000), pose("sara", "R", "stop", 1100, 400), talk("sara", 0, 1500),
              [{ id: "onion", path: "M60 62Q72 56 80 72.3", at: 1900, dur: 700 }]) },
            { caption: "I like milk.", do: [].concat(face("sara", true, 0), pose("sara", "R", "down", 0, 400),
              pose("reza", "L", [-34, -42], 300, 500), pose("reza", "L", "mouth", 1000, 600),
              [{ id: "milk", path: "M105 72.3Q112 58 120 63", at: 1000, dur: 600 }, { id: "milk", to: { r: 25 }, at: 1600, dur: 400 }],
              talk("reza", 0, 1000), pop("heartR", 2100)) },
            { caption: "I don't like bees.", key: 1700, hold: 4200, do: [].concat([{ id: "heartR", to: { o: 0 }, dur: 300 }, { id: "milk", to: { r: 0 }, dur: 300 },
              { id: "milk", path: "M120 63Q112 58 105 72.3", at: 200, dur: 600 }], pose("reza", "L", "down", 300, 400),
              [{ id: "bee", path: "M182 18C150 6 150 40 134 44S112 30 124 38", at: 600, dur: 1600 }],
              face("reza", false, 1100), shake("reza", 1200), pose("reza", "L", "stop", 1200, 400), pose("reza", "R", "stop", 1200, 400),
              [{ id: "reza", to: { x: 130 }, at: 1500, dur: 500 }, { id: "bee", path: "M124 38Q150 12 190 4", at: 2400, dur: 900 }], talk("reza", 0, 1500)) }
          ] },
        { type: "words", show: true, prompt: "روی هر تصویر بزن، گوش کن و با صورتت نشان بده و بلند بگو",
          words: [{ pic: "😋", en: "I like it." }, { pic: "😖", en: "I don't like it." }] },
        { type: "listen", say: "I like bananas.", prompt: "گوش کن. کدام تصویر درست است؟", options: ["😋🍌", "😖🍌"], answer: "😋🍌" },
        { type: "listen", say: "I don't like rain.", quiet: true, prompt: "گوش کن. کدام تصویر درست است؟", options: ["😋🌧️", "😖🌧️"], answer: "😖🌧️" },
        { type: "listen", say: "I like cats.", prompt: "گوش کن. چه چیزی را دوست دارد؟", options: ["🐶", "🐟", "🐱"], answer: "🐱" },
        { type: "sort", prompt: "هر جمله را بخوان و در سبد درستش بگذار",
          baskets: [{ pic: "😋", label: "I like", value: "like" }, { pic: "😖", label: "I don't like", value: "not" }],
          items: [{ label: "I like milk.", say: "I like milk.", basket: "like" }, { label: "I don't like rain.", say: "I don't like rain.", basket: "not" },
            { label: "I like the sun.", say: "I like the sun.", basket: "like" }, { label: "I don't like bees.", say: "I don't like bees.", basket: "not" },
            { label: "I like dogs.", say: "I like dogs.", basket: "like" }, { label: "I don't like onions.", say: "I don't like onions.", basket: "not" }] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I like red apples.", items: ["I", "like", "red", "apples."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "I don't like onions.", items: ["I", "don't", "like", "onions."] },
        { type: "tip", text: "بازی «دوست دارم» را سر سفره یا در بازار بازی کنید: به چیزی اشاره کنید و با شست بالا بگویید I like apples، یا با شست پایین بگویید I don't like onions. بعد کودک درباره خودش بگوید. معنی را با صورت و دست نشان بدهید، نه با ترجمه. هر جواب کودک درست است، چون درباره سلیقه خودش است." }
      ]
    },
    {
      id: "english-sapling-13", subject: "english", level: "sapling", emoji: "⚽", title: "Do you like?",
      steps: [
        /* Mina asks Reza if he likes football: he does, and kicks the ball. Then about them: he likes cats (the cat
           comes and he strokes it), she doesn't like spiders (one comes down and she steps back, shaking her head). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, ball: { art: "en-ball", at: [96, 86], s: 1.6 }, cat: { art: "en-cat", at: [-20, 86], s: 1.2 },
            spider: { art: "🕷️", at: [44, -10], s: 0.45 }, mina: { art: "en-mina", at: [44, 86], s: 1.25 }, reza: { art: "en-reza", at: [112, 86], s: 1.25 },
            ask: { art: "en-ask", at: [52, 48], o: 0 } },
          scenes: [
            { caption: "Do you like football?", key: 1400, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1300), pop("ask", 500)) },
            { caption: "Yes, I do!", key: 1700, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400), nod("reza", 0), talk("reza", 0, 800),
              [{ id: "reza.legL", to: { r: 30 }, at: 900, dur: 300, yoyo: true, times: 2 }, { id: "ball", path: "M96 86Q120 40 170 70", at: 1100, dur: 1100 }]) },
            { caption: "He likes cats.", key: 2300, do: [].concat(talk("mina", 0, 1200), [{ id: "cat", to: { x: 96 }, dur: 1800, ease: "out" }], pose("reza", "L", [-30, -40], 1800, 500), face("reza", true, 1800)) },
            { caption: "She doesn't like spiders!", key: 2000, do: [].concat(pose("reza", "L", "down", 0, 400), [{ id: "spider", to: { y: 48 }, dur: 1400, ease: "out" }, { id: "mina", to: { x: 30 }, at: 1300, dur: 500 }],
              shake("mina", 1400), face("mina", false, 1300), talk("reza", 0, 1600)) }
          ] },
        { type: "listen", say: "He likes cats.", prompt: "گوش کن. چه چیزی را دوست دارد؟", options: [{ pic: "🐶", en: "dogs" }, { pic: "🐱", en: "cats" }, { pic: "🕷️", en: "spiders" }], answer: "🐱" },
        { type: "listen", say: "She doesn't like milk.", quiet: true, prompt: "گوش کن. دوست دارد یا ندارد؟",
          options: [{ pic: "😋🥛", en: "She likes milk.", value: "likes" }, { pic: "🙅🥛", en: "She doesn't like milk.", value: "not" }], answer: "not" },
        { type: "listen", show: "🍌", say: "Do you like bananas?", prompt: "تو موز دوست داری. جواب درست کدام است؟",
          options: [{ label: "Yes, I do.", en: "Yes, I do." }, { label: "Yes, I like.", en: "Yes, I like." }, { label: "No, I don't.", en: "No, I don't." }], answer: "Yes, I do." },
        { type: "sort", prompt: "هر جمله را بخوان. دوست دارد یا دوست ندارد؟",
          baskets: [{ pic: "😊", value: "yes" }, { pic: "🙁", value: "no" }],
          items: [{ label: "He likes cats.", say: "He likes cats.", basket: "yes" }, { label: "She doesn't like spiders.", say: "She doesn't like spiders.", basket: "no" },
            { label: "I like rice.", say: "I like rice.", basket: "yes" }, { label: "I don't like carrots.", say: "I don't like carrots.", basket: "no" }] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Do you like football?", items: ["Do", "you", "like", "football?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "She likes dogs.", items: ["She", "likes", "dogs."] },
        { type: "tip", text: "درباره اعضای خانواده بپرسید: Does Dad like tea? Does Grandma like cats? و کودک با جمله جواب بدهد: He likes tea. She doesn't like cats. یادتان باشد بعد از he و she به like یک s اضافه می‌شود: he likes." }
      ]
    },
    {
      id: "english-sapling-14", subject: "english", level: "sapling", emoji: "❄️", title: "o-e و ow",
      steps: [
        { type: "letter", letter: "o-e", words: [{ pic: "🏠", en: "home" }, { pic: "🪢", en: "rope" }, { pic: "👃", en: "nose" }] },
        { type: "letter", letter: "ow", end: true, like: "اُو", words: [{ pic: "❄️", en: "snow" }, { pic: "🐢", en: "slow" }, { pic: "💛", en: "yellow" }] },
        { type: "listen", show: "nose", prompt: READ_PROMPT, options: ["🏠", "👃", "❄️"], answer: "👃" },
        { type: "listen", show: "slow", quiet: true, prompt: READ_PROMPT, options: ["🐢", "🪢", "💛"], answer: "🐢" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای «اُو» با oa، o-e یا ow نوشته شده؟",
          baskets: [{ label: "oa" }, { label: "o-e" }, { label: "ow" }],
          items: [{ label: "boat", say: "boat", basket: "oa" }, { label: "home", say: "home", basket: "o-e" }, { label: "snow", say: "snow", basket: "ow" },
            { label: "coat", say: "coat", basket: "oa" }, { label: "bone", say: "bone", basket: "o-e" }, { label: "slow", say: "slow", basket: "ow" }] },
        { type: "build", prompt: "گوش کن و بساز. e آخر را فراموش نکن!", word: "home", parts: ["h", "o", "m", "e"], extra: ["w"], pic: "🏠" },
        { type: "build", prompt: "گوش کن و بساز", word: "snow", parts: ["s", "n", "ow"], extra: ["oa"], pic: "❄️" },
        { type: "tip", text: "صدای «اُو» سه جور نوشته می‌شود: oa (boat)، o-e (home، nose) و ow (snow، yellow). ولی ow در cow «آو» خوانده می‌شود. اگر کودک یکی را اشتباه خواند، بگویید «آن یکی صدا را امتحان کن» تا کلمه آشنا پیدا شود." }
      ]
    },
    {
      id: "english-sapling-15", subject: "english", level: "sapling", emoji: "💙", title: "u-e، ew، ue",
      steps: [
        { type: "letter", letter: "u-e", words: [{ pic: "🧊", en: "cube" }, { pic: "🎵", en: "tune" }, { pic: "🧪", en: "tube" }] },
        { type: "letter", letter: "ew", end: true, like: "یو", words: [{ pic: "✨", en: "new" }, { pic: "🐦", en: "flew" }, { pic: "🍲", en: "stew" }] },
        { type: "letter", letter: "ue", end: true, like: "او", words: [{ pic: "🔵", en: "blue" }, { pic: "🧴", en: "glue" }, { pic: "🕵️", en: "clue" }] },
        { type: "listen", show: "blue", prompt: READ_PROMPT, options: ["🔵", "🧊", "✨"], answer: "🔵" },
        { type: "listen", show: "cube", quiet: true, prompt: READ_PROMPT, options: ["🧴", "🧊", "🍲"], answer: "🧊" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. با u-e، ew یا ue نوشته شده؟",
          baskets: [{ label: "u-e" }, { label: "ew" }, { label: "ue" }],
          items: [{ label: "cube", say: "cube", basket: "u-e" }, { label: "new", say: "new", basket: "ew" }, { label: "blue", say: "blue", basket: "ue" },
            { label: "tune", say: "tune", basket: "u-e" }, { label: "few", say: "few", basket: "ew" }, { label: "glue", say: "glue", basket: "ue" }] },
        { type: "tip", text: "u-e، ew و ue گاهی «یو» خوانده می‌شوند (cube، new) و گاهی «او» (blue، glue، flew). برای خواندن، هر دو را امتحان کنید و ببینید کدام کلمه آشناست. برای نوشتن، کلمه‌ها را کم‌کم با دیدن زیاد یاد می‌گیرد." }
      ]
    },
    {
      id: "english-sapling-5", subject: "english", level: "sapling", emoji: "🐱", title: "یکی، چندتا",
      steps: [
        { type: "words", show: true, prompt: "روی هر تصویر بزن، گوش کن و بلند بگو. وقتی بیشتر از یکی است، آخرش صدای s می‌آید.",
          words: [{ pic: "🐱", en: "one cat" }, { pic: "🐱🐱", en: "two cats" }, { pic: "🐶", en: "one dog" }, { pic: "🐶🐶🐶", en: "three dogs" }] },
        { type: "listen", say: "two cats", prompt: "گوش کن. کدام است؟", options: ["🐱", "🐱🐱"], answer: "🐱🐱" },
        { type: "listen", say: "one ball", quiet: true, prompt: "گوش کن. کدام است؟", options: ["⚽⚽⚽", "⚽"], answer: "⚽" },
        { type: "listen", say: "three birds", quiet: true, prompt: "گوش کن. کدام است؟", options: ["🐦", "🐦🐦", "🐦🐦🐦"], answer: "🐦🐦🐦" },
        { type: "listen", show: "🍎🍎🍎", prompt: "بخوان. کدام درست نوشته شده است؟",
          options: [{ label: "three apple" }, { label: "three apples", en: "three apples" }], answer: "three apples" },
        { type: "listen", show: "🦆", quiet: true, prompt: "بخوان. کدام درست نوشته شده است؟",
          options: [{ label: "one duck", en: "one duck" }, { label: "one ducks" }], answer: "one duck" },
        { type: "sort", prompt: "هر کلمه را بخوان. یکی است یا چندتا؟",
          baskets: [{ pic: "🐱", label: "one", value: "one" }, { pic: "🐱🐱🐱", label: "many", value: "many" }],
          items: [{ label: "cats", say: "cats", basket: "many" }, { label: "dog", say: "dog", basket: "one" }, { label: "hats", say: "hats", basket: "many" },
            { label: "bed", say: "bed", basket: "one" }, { label: "pens", say: "pens", basket: "many" }, { label: "sun", say: "sun", basket: "one" }] },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["a bird", "🐦"], ["two birds", "🐦🐦"], ["a hat", "🎩"], ["three hats", "🎩🎩🎩"]] },
        { type: "tip", text: "چیزهای خانه را با هم بشمارید و به انگلیسی بگویید: one spoon، two spoons، three spoons. کودک s آخر را بلند و واضح بگوید. چند کلمه انگلیسی این قاعده را ندارند، مثل fish و sheep که یکی و چندتایشان یکی است؛ فعلاً لازم نیست کودک آن‌ها را بداند." }
      ]
    },
    {
      id: "english-sapling-16", subject: "english", level: "sapling", emoji: "📦", title: "-es و -ies",
      steps: [
        { type: "listen", say: "two boxes", prompt: "گوش کن. یکی است یا چندتا؟", options: [{ pic: "📦", en: "a box" }, { pic: "📦📦", en: "two boxes" }], answer: "📦📦" },
        { type: "sort", prompt: "هر کلمه را بخوان. برای چندتا، s می‌گیرد یا es؟ (بعد از s، x، sh و ch می‌آید es)",
          baskets: [{ label: "+ s" }, { label: "+ es" }],
          items: [{ label: "cat", say: "cats", basket: "+ s" }, { label: "box", say: "boxes", basket: "+ es" }, { label: "dog", say: "dogs", basket: "+ s" },
            { label: "bus", say: "buses", basket: "+ es" }, { label: "pen", say: "pens", basket: "+ s" }, { label: "dish", say: "dishes", basket: "+ es" }] },
        { type: "build", prompt: "گوش کن و بساز: چندتا جعبه", word: "boxes", parts: ["box", "es"], extra: ["s"], pic: "📦📦" },
        { type: "build", prompt: "گوش کن و بساز: چندتا بچه کوچک. y می‌رود و ies می‌آید.", word: "babies", parts: ["bab", "ies"], extra: ["ys"], pic: "👶👶" },
        { type: "pairs", prompt: "این کلمه‌ها برای چندتا شکلشان عوض می‌شود. هر کدام را با چندتای آن جفت کن.",
          pairs: [[{ label: "child", say: "child" }, { label: "children", say: "children" }], [{ label: "foot", say: "foot" }, { label: "feet", say: "feet" }],
            [{ label: "mouse", say: "mouse" }, { label: "mice", say: "mice" }], [{ label: "man", say: "man" }, { label: "men", say: "men" }]] },
        { type: "listen", show: "🐭🐭🐭", say: "three mice", prompt: "کدام درست نوشته شده است؟", options: [{ label: "three mouses" }, { label: "three mice", en: "three mice" }], answer: "three mice" },
        { type: "tip", text: "برای چندتا، بیشتر کلمه‌ها s می‌گیرند (cats)، بعد از s، x، sh و ch، es می‌آید (boxes، buses) و y آخر به ies تبدیل می‌شود (babies). چند کلمه هم کلاً عوض می‌شوند: child → children، foot → feet، mouse → mice، man → men. با هم چیزهای خانه را بشمارید و چندتایشان را بگویید." }
      ]
    },
    {
      id: "english-sapling-6", subject: "english", level: "sapling", emoji: "📦", title: "کجاست؟",
      steps: [
        /* The cat jumps into the box, onto it, down next to it, and goes under the bed. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] },
            boxB: { art: "en-box-back", at: [38, 84], s: 1.3 }, cat: { art: "en-cat", at: [6, 84] }, boxF: { art: "en-box-front", at: [38, 84], s: 1.3 },
            bed: { art: "en-bed", at: [122, 84], s: 1.3 }
          },
          scenes: [
            { caption: "The cat is in the box.", do: [{ id: "cat", path: "M6 84Q20 42 38 72", at: 300, dur: 1000 }] },
            { caption: "The cat is on the box.", do: [{ id: "cat", path: "M38 72Q38 38 38 63.2", at: 300, dur: 800 }, { id: "cat", to: { sy: 0.85 }, at: 1100, dur: 300, yoyo: true, times: 2 }] },
            { caption: "The cat is next to the box.", do: [{ id: "cat", path: "M38 63.2Q52 42 66 84", at: 300, dur: 800 }, { id: "cat", to: { sy: 0.85 }, at: 1100, dur: 300, yoyo: true, times: 2 }] },
            { caption: "The cat is under the bed.", do: [{ id: "cat", path: "M66 84Q79 76 92 84Q105 76 118 84", at: 300, dur: 1400 }, { id: "cat", to: { sy: 0.9 }, at: 1700, dur: 300 }] }
          ] },
        { type: "words", show: true, prompt: "روی هر تصویر بزن، گوش کن و بلند بگو",
          words: [{ pic: "🐱", ref: "📦", where: "in", en: "in the box" }, { pic: "🐱", ref: "📦", where: "on", en: "on the box" },
            { pic: "🐱", ref: "📦", where: "next to", en: "next to the box" }, { pic: "🐱", ref: "🛏️", where: "under", en: "under the bed" }] },
        { type: "listen", say: "The ball is under the bed.", prompt: "گوش کن. توپ کجاست؟",
          options: [{ pic: "⚽", ref: "🛏️", where: "on" }, { pic: "⚽", ref: "🛏️", where: "under" }, { pic: "⚽", ref: "🛏️", where: "next to" }], answer: "under" },
        { type: "listen", say: "The duck is in the box.", prompt: "گوش کن. اردک کجاست؟",
          options: [{ pic: "🦆", ref: "📦", where: "next to" }, { pic: "🦆", ref: "📦", where: "on" }, { pic: "🦆", ref: "📦", where: "in" }], answer: "in" },
        { type: "listen", say: "The dog is next to the box.", prompt: "گوش کن. سگ کجاست؟",
          options: [{ pic: "🐶", ref: "📦", where: "in" }, { pic: "🐶", ref: "📦", where: "next to" }, { pic: "🐶", ref: "📦", where: "on" }], answer: "next to" },
        { type: "listen", say: "The bird is on the bed.", prompt: "گوش کن. پرنده کجاست؟",
          options: [{ pic: "🐦", ref: "🛏️", where: "on" }, { pic: "🐦", ref: "🛏️", where: "under" }], answer: "on" },
        { type: "listen", show: { pic: "🐱", ref: "📦", where: "on" }, prompt: "گربه کجاست؟ جمله‌ها را بخوان و درستش را انتخاب کن",
          options: [{ label: "The cat is in the box.", en: "The cat is in the box." }, { label: "The cat is on the box.", en: "The cat is on the box." },
            { label: "The cat is next to the box.", en: "The cat is next to the box." }], answer: "The cat is on the box." },
        { type: "listen", show: { pic: "⚽", ref: "🛏️", where: "under" }, quiet: true, prompt: "توپ کجاست؟ جمله‌ها را بخوان و درستش را انتخاب کن",
          options: [{ label: "The ball is on the bed.", en: "The ball is on the bed." }, { label: "The ball is under the bed.", en: "The ball is under the bed." }], answer: "The ball is under the bed." },
        { type: "tip", text: "بازی «کجاست؟» را با یک عروسک و یک جعبه یا کاسه بازی کنید: عروسک را جایی بگذارید و بپرسید Where is the cat? کودک جواب بدهد: in the box، on the box، under the box یا next to the box. بعد جایتان را عوض کنید: کودک بگوید و شما عروسک را بگذارید. اگر اشتباه گذاشتید، کودک درستش کند." }
      ]
    },
    {
      id: "english-sapling-17", subject: "english", level: "sapling", emoji: "🛏️", title: "There is، there are",
      steps: [
        /* In Reza's room: a cat goes under the bed, two books come onto the table, and he looks for his ball. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, bed: { art: "en-bed", at: [46, 84], s: 1.1 },
            table: { art: "en-table", at: [130, 88], s: 0.7 }, b1: { art: "📖", at: [122, 73.3], s: 0.7, o: 0 }, b2: { art: "📕", at: [138, 73.3], s: 0.7, o: 0 },
            cat: { art: "en-cat", at: [-14, 84], s: 1.1 }, ball: { art: "en-ball", at: [100, 87], s: 1.4, o: 0 }, reza: { art: "en-reza", at: [92, 86], s: 1.15 } },
          scenes: [
            { caption: "There's a cat under the bed.", key: 2200, do: [].concat([{ id: "cat", to: { x: 44 }, dur: 1800 }, { id: "cat", to: { r: 4 }, dur: 1800, yoyo: true, times: 6 }], pose("reza", "L", "point", 1200, 500), talk("reza", 1200, 1400)) },
            { caption: "There are two books on the table.", key: 2000, do: [].concat(pose("reza", "L", "down", 0, 400), pose("reza", "R", "point", 300, 500),
              [{ id: "b1", to: { o: 1 }, at: 600, dur: 300 }, { id: "b2", to: { o: 1 }, at: 1100, dur: 300 }], talk("reza", 0, 2000)) },
            { caption: "Is there a ball? Yes, there is!", key: 2200, do: [].concat(pose("reza", "R", "down", 0, 400), [{ id: "reza.eyes", to: { x: 0.6, y: 0.8 }, at: 300, dur: 300 },
              { id: "ball", to: { o: 1 }, at: 1000, dur: 300 }, { id: "ball", to: { y: "-6" }, at: 1300, dur: 700, yoyo: true, times: 2 }], face("reza", true, 1300), talk("reza", 0, 2200)) },
            { caption: "How many books are there? There are two.", key: 2000, do: [].concat([{ id: "reza.eyes", to: { x: 0, y: 0 }, dur: 300 }], pose("reza", "R", "point", 300, 500),
              [{ id: "b1", to: { y: "-3" }, at: 1000, dur: 500, yoyo: true, times: 2 }, { id: "b2", to: { y: "-3" }, at: 1600, dur: 500, yoyo: true, times: 2 }], talk("reza", 0, 2600)) }
          ] },
        { type: "listen", say: "There are three apples.", prompt: "گوش کن. کدام تصویر؟", options: [{ pic: "🍎", en: "an apple" }, { pic: "🍎🍎🍎", en: "three apples" }, { pic: "🍎🍎", en: "two apples" }], answer: "🍎🍎🍎" },
        { type: "listen", say: "There's a dog under the table.", quiet: true, prompt: "گوش کن. کدام تصویر؟",
          options: [{ pic: "🐶", ref: "🪑", where: "on" }, { pic: "🐶", ref: "🪑", where: "under" }, { pic: "🐶", ref: "🪑", where: "next to" }], answer: "under" },
        { type: "listen", show: "🐟🐟🐟🐟", prompt: "کدام جمله درست است؟",
          options: [{ label: "There's a fish.", en: "There's a fish." }, { label: "There are four fish.", en: "There are four fish." }], answer: "There are four fish." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "There are two cats.", items: ["There", "are", "two", "cats."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Is there a ball?", items: ["Is", "there", "a", "ball?"] },
        { type: "tip", text: "برای یکی there's (there is) و برای چندتا there are می‌گوییم. با هم یک تصویر یا اتاق را نگاه کنید و نوبتی بگویید: There's a lamp. There are three chairs. بازی «چندتا؟» هم خوب است: How many windows are there? There are two." }
      ]
    },
    {
      id: "english-sapling-18", subject: "english", level: "sapling", emoji: "🏡", title: "خانه ما",
      steps: [
        /* A house with two floors: Mum is in the kitchen, Dad on the sofa, Sara goes up the stairs to her bedroom,
           and Reza is in the garden. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { house: { art: "en-house2" }, mum: { art: "en-mother", at: [62, 85], s: 0.55 }, dad: { art: "en-father", at: [106, 85], s: 0.55 },
            sara: { art: "en-sara", at: [118, 85], s: 0.7 }, reza: { art: "en-reza", at: [16, 87], s: 0.7 }, ask: { art: "en-ask", at: [4, 38], s: 0.8, o: 0 } },
          scenes: [
            { caption: "Where's Mum? She's in the kitchen.", key: 2200, do: [].concat(pop("ask", 0), [{ id: "mum", to: { y: "-3" }, at: 1300, dur: 600, yoyo: true, times: 2 }], wave("mum", "R", 1300, 1400)) },
            { caption: "Dad's in the living room. He's on the sofa.", key: 1800, do: [{ id: "ask", to: { o: 0 }, dur: 300 }, { id: "dad", to: { y: 79 }, at: 600, dur: 600 }, { id: "dad.legL", to: { sy: 0.55 }, at: 600, dur: 600 }, { id: "dad.legR", to: { sy: 0.55 }, at: 600, dur: 600 }] },
            { caption: "Sara goes upstairs to her bedroom.", key: 3000, hold: 5000, do: [].concat(walk("sara", 126, 0, 500), [{ id: "sara", path: "M126 85L146 51", at: 600, dur: 1800, ease: "linear" }], walk("sara", 60, 2600, 2000)) },
            { caption: "Where's Reza? He's in the garden.", key: 1500, do: [].concat(pop("ask", 0), jump("reza", 700, 2, 5), wave("reza", "R", 700, 1400)) }
          ] },
        { type: "words", show: true, words: [{ pic: "⬆️🏠", en: "upstairs" }, { pic: "⬇️🏠", en: "downstairs" }, { pic: "🍳", en: "kitchen" }, { pic: "🛋️", en: "sofa" }, { pic: "🚿", en: "shower" }, { pic: "🌳", en: "garden" }] },
        { type: "listen", say: "Where's Dad? He's in the garden.", prompt: "گوش کن. پدر کجاست؟", options: [{ pic: "🍳", en: "kitchen" }, { pic: "🌳", en: "garden" }, { pic: "🚿", en: "bathroom" }], answer: "🌳" },
        { type: "listen", say: "The shower is upstairs.", quiet: true, prompt: "گوش کن. کدام بالاست؟", options: [{ pic: "🚿", en: "shower" }, { pic: "🛋️", en: "sofa" }], answer: "🚿" },
        { type: "listen", say: "Where's the cat? It's on the sofa.", quiet: true, prompt: "گوش کن. گربه کجاست؟", options: [{ pic: "🐱", ref: "🛋️", where: "on" }, { pic: "🐱", ref: "🛋️", where: "under" }], answer: "on" },
        { type: "tip", text: "نقشه ساده خانه‌تان را با هم بکشید و اتاق‌ها را به انگلیسی بنویسید: kitchen، bathroom، bedroom. بعد بپرسید Where's Mum? Where's the cat? تا کودک بگوید She's in the kitchen. اگر خانه یک طبقه است، upstairs و downstairs را با خانه مادربزرگ یا یک کتاب نشان بدهید." }
      ]
    },
    {
      id: "english-sapling-7", subject: "english", level: "sapling", emoji: "📖", title: "قصه کوتاه",
      steps: [
        /* Sara's big dog finds her red ball under the bed and brings it back. */
        { type: "scene", prompt: "به قصه گوش کن", bg: "#f6e3c6",
          parts: {
            floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, bed: { art: "en-bed", at: [128, 84], s: 1.2 },
            dog: { art: "en-dog", at: [78, 86], s: 1.4, flip: true }, ballD: { art: "en-ball", under: "dog", at: [21.5, -14.6], s: 0.85, o: 0 },
            sara: { art: "en-sara", at: [44, 86], s: 1.15 },
            ball: { art: "en-ball", at: [31.6, 54.4], s: 1.2, o: 0 }, look: { art: "en-look", at: [107.9, 52.5], r: 63, sx: 1.55, o: 0 }
          },
          scenes: [
            { caption: "Sara has a dog.", key: 1400, do: [].concat(pose("sara", "R", [-115, -30], 0, 600),
              [{ id: "sara.foreR", to: { r: "+10" }, at: 700, dur: 1800, yoyo: true, times: 6 }, { id: "dog.tail", to: { r: -25 }, at: 400, dur: 2000, yoyo: true, times: 8 }]) },
            { caption: "The dog is big.", key: 1300, do: [].concat(pose("sara", "R", "big", 0, 600), pose("sara", "L", "big", 0, 600),
              [{ id: "sara.eyes", to: { x: 0.6, y: -0.5 }, dur: 300 }, { id: "dog.head", to: { r: -12 }, at: 300, dur: 500 }]) },
            { caption: "Sara has a red ball.", key: 2200, do: [].concat(pose("sara", "R", "down", 0, 400), pose("sara", "L", "hold", 0, 500), [
              { id: "sara.eyes", to: { x: -0.5, y: 0 }, dur: 300 }, { id: "dog.head", to: { r: 0 }, dur: 400 },
              { id: "ball", to: { o: 1 }, at: 400, dur: 200 }, { id: "ball", path: "M31.6 54.4L31.6 88L31.6 54.4", at: 900, dur: 900 }
            ]) },
            { caption: "The ball is under the bed.", do: [].concat(pose("sara", "L", "down", 300, 400), [
              { id: "sara.eyes", to: { x: 0.7 }, at: 600, dur: 300 },
              { id: "ball", path: "M31.6 54.4Q24 70 34 88L122 84", dur: 1600 }, { id: "ball", to: { r: 900 }, at: 500, dur: 1100, ease: "out" }
            ]) },
            { caption: "The dog can see the ball!", do: [
              { id: "dog", to: { flip: 1 }, dur: 300 }, { id: "dog.head", to: { r: 25 }, at: 500, dur: 500 }, { id: "look", to: { o: 1 }, at: 1100, dur: 400 },
              { id: "dog.tail", to: { r: -25 }, at: 1100, dur: 1600, yoyo: true, times: 8 }
            ] },
            { caption: "Good dog! Thank you!", key: 4600, hold: 6000, do: [].concat([{ id: "look", to: { o: 0 }, dur: 300 }, { id: "dog.head", to: { r: 0 }, dur: 300 }],
              trot("dog", 84, 300, 600), [
                { id: "dog.head", to: { r: 45 }, at: 1000, dur: 400 }, { id: "ball", path: "M122 84L108 72", at: 1400, dur: 400 },
                { id: "ball", to: { o: 0 }, at: 1700, dur: 100 }, { id: "ballD", to: { o: 1 }, at: 1700, dur: 100 },
                { id: "dog.head", to: { r: 0 }, at: 1800, dur: 400 }, { id: "dog", to: { flip: -1 }, at: 2300, dur: 300 }
              ], trot("dog", 78, 2600, 600), [
                { id: "ballD", to: { o: 0 }, at: 3300, dur: 100 }, { id: "ball", to: { x: 47.9, y: 65.6, r: 0 }, at: 3200, dur: 1 }, { id: "ball", to: { o: 1 }, at: 3300, dur: 100 },
                { id: "ball", path: "M47.9 65.6Q34 50 31.6 54.4", at: 3400, dur: 500 }
              ], pose("sara", "L", "hold", 3200, 400), pose("sara", "R", [-115, -30], 3900, 500),
              [{ id: "sara.foreR", to: { r: "+10" }, at: 4400, dur: 1400, yoyo: true, times: 4 }, { id: "dog.tail", to: { r: -25 }, at: 3900, dur: 2000, yoyo: true, times: 8 }],
              talk("sara", 3900, 1700)) }
          ] },
        { type: "passage", prompt: "حالا خودت قصه را بخوان",
          text: "Sara has a dog. The dog is big. Sara has a red ball. The ball is under the bed. The dog can see the ball.",
          question: "سارا چه حیوانی دارد؟", options: ["🐱", "🐶", "🐟"], answer: "🐶" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "Sara has a dog. The dog is big. Sara has a red ball. The ball is under the bed. The dog can see the ball.",
          question: "توپ سارا چه رنگی است؟", options: ["🔵", "🔴", "🟢"], answer: "🔴" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "Sara has a dog. The dog is big. Sara has a red ball. The ball is under the bed. The dog can see the ball.",
          question: "توپ کجاست؟", options: ["on the bed", "in the box", "under the bed"], answer: "under the bed" },
        { type: "passage", prompt: "این قصه تازه است. آن را بخوان",
          text: "Reza has a cat. The cat is black. It is on the bed. The cat likes milk.",
          question: "گربه کجاست؟", options: ["under the bed", "on the bed", "next to the bed"], answer: "on the bed" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "Reza has a cat. The cat is black. It is on the bed. The cat likes milk.",
          question: "گربه چه چیزی دوست دارد؟", options: ["🍎", "🐟", "🥛"], answer: "🥛" },
        { type: "tip", text: "قصه را با هم بخوانید: یک جمله شما، یک جمله کودک. بعد کتاب را ببندید و بپرسید قصه درباره چه بود؛ کودک می‌تواند به فارسی تعریف کند. اگر کلمه‌ای را بلد نبود، صداهایش را با هم بگویید (d… o… g). کودک می‌تواند قصه سارا را برای اسباب‌بازی‌هایش هم بخواند." }
      ]
    },
    {
      id: "english-sapling-19", subject: "english", level: "sapling", emoji: "🍃", title: "ea، ee، ey",
      steps: [
        { type: "letter", letter: "ea", inside: true, like: "ای", words: [{ pic: "🌊", en: "sea" }, { pic: "🍃", en: "leaf" }, { pic: "📖", en: "read" }] },
        { type: "letter", letter: "ey", end: true, like: "ی", words: [{ pic: "🔑", en: "key" }, { pic: "🐒", en: "monkey" }, { pic: "🫏", en: "donkey" }] },
        { type: "letter", letter: "ea", inside: true, like: "اِ", say: "bread. head.", words: [{ pic: "🍞", en: "bread" }, { pic: "🙂", en: "head" }] },
        { type: "listen", show: "leaf", prompt: READ_PROMPT, options: ["🌊", "🍃", "🔑"], answer: "🍃" },
        { type: "listen", show: "key", quiet: true, prompt: READ_PROMPT, options: ["🔑", "🍞", "🐒"], answer: "🔑" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. ea آن مثل sea است (بلند) یا مثل bread (کوتاه)؟",
          baskets: [{ pic: "🌊", label: "sea", value: "long" }, { pic: "🍞", label: "bread", value: "short" }],
          items: [{ label: "eat", say: "eat", basket: "long" }, { label: "head", say: "head", basket: "short" }, { label: "tea", say: "tea", basket: "long" },
            { label: "bread", say: "bread", basket: "short" }, { label: "read", say: "read", basket: "long" }, { label: "leaf", say: "leaf", basket: "long" }] },
        { type: "tip", text: "صدای «ای» کشیده هم چند جور نوشته می‌شود: ee (tree)، ea (sea، leaf) و ey آخر کلمه (key). ولی ea گاهی «اِ» کوتاه است، مثل bread و head. وقتی کودک کلمه‌ای با ea دید، اول «ای» را امتحان کند و اگر کلمه آشنا نبود، «اِ» را." }
      ]
    },
    {
      id: "english-sapling-20", subject: "english", level: "sapling", emoji: "🧸", title: "ou، ow، oy، oi، aw",
      steps: [
        { type: "letter", letter: "ou", inside: true, like: "آو", words: [{ pic: "🏠", en: "house" }, { pic: "🐭", en: "mouse" }, { pic: "☁️", en: "cloud" }] },
        { type: "letter", letter: "oy", end: true, like: "اُی", words: [{ pic: "🧸", en: "toy" }, { pic: "👦", en: "boy" }] },
        { type: "letter", letter: "aw", inside: true, like: "اُ", words: [{ pic: "🪚", en: "saw" }, { pic: "🖍️", en: "draw" }, { pic: "🐾", en: "paw" }] },
        { type: "listen", show: "cloud", prompt: READ_PROMPT, options: ["☁️", "🧸", "🐾"], answer: "☁️" },
        { type: "listen", show: "boy", quiet: true, prompt: READ_PROMPT, options: ["👦", "🏠", "🪚"], answer: "👦" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای «آو» با ou نوشته شده یا با ow؟",
          baskets: [{ label: "ou" }, { label: "ow" }],
          items: [{ label: "out", say: "out", basket: "ou" }, { label: "cow", say: "cow", basket: "ow" }, { label: "house", say: "house", basket: "ou" },
            { label: "town", say: "town", basket: "ow" }, { label: "loud", say: "loud", basket: "ou" }, { label: "now", say: "now", basket: "ow" }] },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای «اُی» با oy نوشته شده یا با oi؟ (oy بیشتر آخر کلمه)",
          baskets: [{ label: "oy" }, { label: "oi" }],
          items: [{ label: "toy", say: "toy", basket: "oy" }, { label: "coin", say: "coin", basket: "oi" }, { label: "boy", say: "boy", basket: "oy" }, { label: "oil", say: "oil", basket: "oi" }] },
        { type: "tip", text: "این‌ها صداهای آشنا با نوشتن تازه‌اند: ou مثل ow در cow (house، out)، oy مثل oi (toy، boy) و aw مثل «اُ» کشیده (saw، draw). یک قاعده کمک می‌کند: oy و ow و aw بیشتر آخر کلمه می‌آیند، oi و ou وسط کلمه." }
      ]
    },
    {
      id: "english-sapling-21", subject: "english", level: "sapling", emoji: "🐦", title: "ir، ur، er، wh، ph",
      steps: [
        { type: "letter", letter: "ir", inside: true, words: [{ pic: "🐦", en: "bird" }, { pic: "👧", en: "girl" }, { pic: "👕", en: "shirt" }] },
        { type: "letter", letter: "ur", inside: true, words: [{ pic: "👩‍⚕️", en: "nurse" }, { pic: "🟣", en: "purple" }, { pic: "🔥", en: "burn" }] },
        { type: "letter", letter: "wh", like: "و", words: [{ pic: "⚪", en: "white" }, { pic: "🐳", en: "whale" }, { pic: "🛞", en: "wheel" }] },
        { type: "letter", letter: "ph", like: "ف", words: [{ pic: "📱", en: "phone" }, { pic: "📷", en: "photo" }] },
        { type: "listen", show: "girl", prompt: READ_PROMPT, options: ["🐦", "👧", "📱"], answer: "👧" },
        { type: "listen", show: "phone", quiet: true, prompt: READ_PROMPT, options: ["📷", "🐳", "📱"], answer: "📱" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. صدای ir، ur و er یکی است. کدام نوشته را دارد؟",
          baskets: [{ label: "ir" }, { label: "ur" }, { label: "er" }],
          items: [{ label: "bird", say: "bird", basket: "ir" }, { label: "nurse", say: "nurse", basket: "ur" }, { label: "her", say: "her", basket: "er" },
            { label: "girl", say: "girl", basket: "ir" }, { label: "turn", say: "turn", basket: "ur" }, { label: "sister", say: "sister", basket: "er" }] },
        { type: "tip", text: "ir، ur و er یک صدا دارند (bird، nurse، her)؛ کدام را بنویسیم باید با دیدن زیاد یاد بگیریم. wh مثل w خوانده می‌شود (white، when) و ph مثل f (phone، photo). یک بازی: با هم دنبال کلمه‌های ph و wh در کتاب‌ها بگردید." }
      ]
    },
    {
      id: "english-sapling-8", subject: "english", level: "sapling", emoji: "✍️", title: "نوشتن جمله",
      steps: [
        { type: "listen", show: "✏️", say: "I can see a cat.", prompt: "جمله با حرف بزرگ شروع می‌شود و آخرش نقطه می‌آید. کدام درست نوشته شده است؟",
          options: [{ label: "i can see a cat" }, { label: "I can see a cat.", en: "I can see a cat." }], answer: "I can see a cat." },
        { type: "listen", show: "✏️", say: "My name is Sara.", prompt: "بین کلمه‌ها فاصله می‌آید. کدام درست نوشته شده است؟",
          options: [{ label: "Mynameis Sara." }, { label: "My name is Sara.", en: "My name is Sara." }, { label: "my name is Sara" }], answer: "My name is Sara." },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین. ببین: اولش حرف بزرگ است و آخرش نقطه.", ltr: true, say: "I like apples.", items: ["I", "like", "apples."] },
        { type: "order", prompt: "گوش کن و کلمه‌های جمله را به ترتیب بچین", ltr: true, say: "The cat is on the bed.", items: ["The", "cat", "is", "on", "the", "bed."] },
        { type: "paper", text: "این جمله را در دفترت بنویس. از چپ شروع کن.", example: "I can see a cat.",
          check: ["با حرف بزرگ شروع کرده؟", "بین کلمه‌ها فاصله گذاشته؟", "آخر جمله نقطه گذاشته؟", "از چپ به راست نوشته؟"] },
        { type: "paper", text: "حالا یک جمله درباره چیزی که دوست داری بنویس، مثل این نمونه.", example: "I like apples.",
          check: ["با حرف بزرگ شروع کرده؟", "بین کلمه‌ها فاصله گذاشته؟", "آخر جمله نقطه گذاشته؟", "جمله را برایتان بلند خوانده؟"] },
        { type: "tip", text: "هر روز یک جمله کوتاه انگلیسی با هم بنویسید، مثل I like milk یا I can see a bird. سه چیز را با هم نگاه کنید: حرف بزرگ اول جمله، فاصله بین کلمه‌ها (به اندازه یک انگشت) و نقطه آخر. اول از چیزی که درست نوشته تعریف کنید، بعد فقط یک چیز را با هم درست کنید." }
      ]
    },
    {
      id: "english-sapling-22", subject: "english", level: "sapling", emoji: "❓", title: "نقطه و علامت سؤال",
      steps: [
        { type: "sort", prompt: "هر جمله را بخوان. آخرش نقطه می‌آید یا علامت سؤال؟",
          baskets: [{ label: "." }, { label: "?" }],
          items: [{ label: "What is your name", say: "What is your name?", basket: "?" }, { label: "My name is Sara", say: "My name is Sara.", basket: "." },
            { label: "Do you like cats", say: "Do you like cats?", basket: "?" }, { label: "I like dogs", say: "I like dogs.", basket: "." },
            { label: "Where is the cat", say: "Where is the cat?", basket: "?" }, { label: "It is on the bed", say: "It is on the bed.", basket: "." }] },
        { type: "sort", prompt: "کدام کلمه با حرف بزرگ نوشته می‌شود؟ (اسم‌ها و I همیشه حرف بزرگ دارند.)",
          baskets: [{ label: "Aa", value: "big" }, { label: "aa", value: "small" }],
          items: [{ label: "sara", basket: "big" }, { label: "cat", basket: "small" }, { label: "i", basket: "big" }, { label: "iran", basket: "big" },
            { label: "dog", basket: "small" }, { label: "reza", basket: "big" }] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را بچین. دو چیز را با and به هم وصل کن.", ltr: true, say: "I like cats and I like dogs.", items: ["I", "like", "cats", "and", "I", "like", "dogs."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را بچین", ltr: true, say: "Reza and I are friends.", items: ["Reza", "and", "I", "are", "friends."] },
        { type: "listen", say: "Is it a cat?", prompt: "کدام درست نوشته شده است؟",
          options: [{ label: "is it a cat?" }, { label: "Is it a cat.", en: "Is it a cat." }, { label: "Is it a cat?", en: "Is it a cat?" }], answer: "Is it a cat?" },
        { type: "paper", text: "یک سؤال و جوابش را بنویس، مثل این نمونه.", example: "What is your name? My name is Sara.",
          check: ["سؤال با علامت سؤال تمام شده؟", "جواب با نقطه تمام شده؟", "اسم با حرف بزرگ نوشته شده؟"] },
        { type: "tip", text: "در انگلیسی سؤال با ? و جمله‌های دیگر با نقطه تمام می‌شوند؛ اول جمله، اسم‌ها و کلمه I همیشه حرف بزرگ دارند. وقتی کودک می‌نویسد، با هم سه چیز را نگاه کنید: حرف بزرگ اول، علامت آخر، اسم‌ها. اول از چیزی که درست است تعریف کنید." }
      ]
    },
    {
      id: "english-sapling-23", subject: "english", level: "sapling", emoji: "⏰", title: "ساعت چند است؟",
      steps: [
        /* Reza's day by the clock: the hands turn to seven and he gets up, to eight and he takes his bag, to half past
           twelve and he is hungry, to nine and he goes to bed as the night comes. */
        { type: "scene", prompt: "گوش کن و به ساعت نگاه کن", bg: "#f6e3c6",
          parts: { skyN: { art: "en-sky-night", o: 0 }, skyD: { art: "en-sky-day" }, room: { art: "en-bedroom" }, clock: { art: "en-clock", at: [44, 26], s: 1.4 },
            bed: { art: "en-bed-low", at: [50, 86], s: 1.3 }, kid: { art: "en-reza", at: [58, 64], r: -90, s: 1.1 },
            bag: { art: "en-bag", at: inHand("en-reza", [104, 86], 1.1, "R", "point", 0), s: 1, o: 0 } },
          scenes: [
            { caption: "It's seven o'clock. Time to get up!", key: 2300, hold: 4400, do: [{ id: "kid.shut", to: { o: 1 }, dur: 1 }, { id: "kid.eyes", to: { o: 0 }, dur: 1 },
              { id: "clock.hour", to: { r: 210 }, dur: 1200 }, { id: "kid.shut", to: { o: 0 }, at: 1300, dur: 150 }, { id: "kid.eyes", to: { o: 1 }, at: 1300, dur: 150 },
              { id: "kid", to: { x: 104, y: 86, r: 0 }, at: 1600, dur: 1000 }] },
            { caption: "It's eight o'clock. Time for school!", key: 1900, hold: 4400, do: [].concat([{ id: "clock.hour", to: { r: 240 }, dur: 1200 }, { id: "clock.minute", to: { r: 360 }, dur: 1200 }],
              pose("kid", "R", "point", 1300, 500), [{ id: "bag", to: { o: 1 }, at: 1600, dur: 300 }]) },
            { caption: "It's half past twelve. Time for lunch!", key: 1900, hold: 4400, do: [].concat([{ id: "bag", to: { o: 0 }, dur: 300 }], pose("kid", "R", [10, 100], 300, 500),
              [{ id: "clock.hour", to: { r: 375 }, dur: 1400 }, { id: "clock.minute", to: { r: 1980 }, dur: 1400 }, { id: "kid.foreR", to: { r: "+20" }, at: 1500, dur: 1400, yoyo: true, times: 4 }, { id: "kid.mouth", to: { o: 1 }, at: 1500, dur: 200 }]) },
            { caption: "It's nine o'clock. Time for bed!", key: 3600, hold: 5000, do: [].concat([{ id: "kid.mouth", to: { o: 0 }, dur: 200 }], pose("kid", "R", "down", 0, 400),
              [{ id: "clock.hour", to: { r: 630 }, dur: 1600 }, { id: "clock.minute", to: { r: 5040 }, dur: 1600 }, { id: "skyD", to: { o: 0 }, at: 600, dur: 1200 }, { id: "skyN", to: { o: 1 }, at: 600, dur: 1200 },
                { id: "kid", to: { x: 58, y: 64, r: -90 }, at: 2000, dur: 1000 }, { id: "kid.shut", to: { o: 1 }, at: 3100, dur: 200 }, { id: "kid.eyes", to: { o: 0 }, at: 3100, dur: 200 }]) }
          ] },
        { type: "listen", say: "It's three o'clock.", prompt: "گوش کن. کدام ساعت؟", options: [{ pic: "🕒", en: "three o'clock" }, { pic: "🕗", en: "eight o'clock" }, { pic: "🕥", en: "half past ten" }], answer: "🕒" },
        { type: "listen", say: "It's half past ten.", quiet: true, prompt: "گوش کن. کدام ساعت؟", options: [{ pic: "🕙", en: "ten o'clock" }, { pic: "🕥", en: "half past ten" }, { pic: "🕒", en: "three o'clock" }], answer: "🕥" },
        { type: "clock", time: "7:00", say: "It's seven o'clock.", prompt: "گوش کن و عقربه‌ها را روی همین ساعت بگذار: It's seven o'clock." },
        { type: "clock", time: "4:30", say: "It's half past four.", prompt: "گوش کن و عقربه‌ها را روی همین ساعت بگذار: It's half past four." },
        { type: "listen", show: "🕘", say: "What time is it?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "It's nine o'clock.", en: "It's nine o'clock." }, { label: "It's half past nine.", en: "It's half past nine." }], answer: "It's nine o'clock." },
        { type: "tip", text: "در طول روز بپرسید What time is it? و با هم به ساعت نگاه کنید: It's seven o'clock. It's half past one. کارهای روزانه را هم با ساعت بگویید: At eight o'clock I go to school. در انگلیسی «و نیم» را half past می‌گویند: half past four یعنی چهار و نیم." }
      ]
    },
    {
      id: "english-sapling-24", subject: "english", level: "sapling", emoji: "📅", title: "روزهای هفته",
      steps: [
        /* The week as seven boxes, left to right; each day lights up as it is said, and on two of them a picture of what
           Mina does comes in. */
        { type: "scene", prompt: "گوش کن و روزها را با او بگو", bg: "#fffaf0",
          parts: Object.assign({ mina: { art: "en-mina", at: [20, 88], s: 1 }, soccer: { art: "⚽", at: [108.3, 68], s: 0.6, o: 0 }, book: { art: "📖", at: [38.3, 68], s: 0.6, o: 0 } },
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].reduce(function (o, d, i) { o["d" + i] = { art: "en-frame", at: [30 + i * 17.5, 30], sx: 0.36, sy: 0.4, o: 0.35 }; o["t" + i] = { art: d, at: [38.3 + i * 17.5, 43], s: 0.32 }; return o; }, {})),
          scenes: [
            { caption: "Monday, Tuesday, Wednesday, Thursday,", hold: 4000, do: [0, 1, 2, 3].map(function (i) { return { id: "d" + i, to: { o: 1 }, at: i * 700, dur: 300 }; }) },
            { caption: "Friday, Saturday, Sunday!", hold: 3600, do: [4, 5, 6].map(function (i) { return { id: "d" + i, to: { o: 1 }, at: i * 700 - 2800, dur: 300 }; }) },
            { caption: "Today is Monday. I go to school.", key: 1500, do: [].concat([0, 1, 2, 3, 4, 5, 6].map(function (i) { return { id: "d" + i, to: { o: i ? 0.35 : 1 }, dur: 300 }; }),
              [{ id: "book", to: { o: 1 }, at: 400, dur: 300 }], talk("mina", 0, 1600)) },
            { caption: "On Friday I play football.", key: 1500, do: [].concat([{ id: "d0", to: { o: 0.35 }, dur: 300 }, { id: "d4", to: { o: 1 }, dur: 300 }, { id: "soccer", to: { o: 1 }, at: 400, dur: 300 },
              { id: "soccer", to: { y: "-4" }, at: 800, dur: 600, yoyo: true, times: 2 }], talk("mina", 0, 1500), jump("mina", 900, 1, 4)) }
          ] },
        { type: "words", show: true, words: [{ pic: "1️⃣", en: "Monday" }, { pic: "2️⃣", en: "Tuesday" }, { pic: "3️⃣", en: "Wednesday" }, { pic: "4️⃣", en: "Thursday" },
          { pic: "5️⃣", en: "Friday" }, { pic: "6️⃣", en: "Saturday" }, { pic: "7️⃣", en: "Sunday" }] },
        { type: "listen", say: "Friday", prompt: "گوش کن. کدام روز؟", options: [{ label: "Friday" }, { label: "Monday" }, { label: "Sunday" }], answer: "Friday" },
        { type: "listen", say: "On Saturday I go to the park.", quiet: true, prompt: "گوش کن. کدام روز؟", options: [{ label: "Tuesday" }, { label: "Saturday" }, { label: "Thursday" }], answer: "Saturday" },
        { type: "order", prompt: "روزهای هفته را به ترتیب بچین", ltr: true, items: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "On Friday I play football.", items: ["On", "Friday", "I", "play", "football."] },
        { type: "tip", text: "در انگلیسی هفته معمولاً از Monday (دوشنبه) شروع می‌شود و آخر هفته Saturday و Sunday است؛ در ایران جمعه تعطیل است. با هم یک برنامه هفتگی بنویسید: On Friday we visit Grandma. هر صبح بپرسید What day is it today?" }
      ]
    },
    {
      id: "english-sapling-25", subject: "english", level: "sapling", emoji: "🎂", title: "ماه‌ها و تولد",
      steps: [
        { type: "words", show: true, words: [{ pic: "❄️", en: "January" }, { pic: "❄️", en: "February" }, { pic: "🌱", en: "March" }, { pic: "🌸", en: "April" }, { pic: "🌷", en: "May" }, { pic: "☀️", en: "June" }] },
        { type: "words", show: true, words: [{ pic: "☀️", en: "July" }, { pic: "🏖️", en: "August" }, { pic: "🍂", en: "September" }, { pic: "🍁", en: "October" }, { pic: "🌧️", en: "November" }, { pic: "⛄", en: "December" }] },
        { type: "listen", say: "May", prompt: "گوش کن. کدام ماه؟", options: [{ label: "March" }, { label: "May" }, { label: "June" }], answer: "May" },
        { type: "listen", say: "When's your birthday? It's in October.", quiet: true, prompt: "گوش کن. تولدش کدام ماه است؟", options: [{ label: "August" }, { label: "October" }, { label: "April" }], answer: "October" },
        { type: "order", prompt: "ماه‌ها را به ترتیب بچین", ltr: true, items: ["January", "February", "March", "April"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "My birthday is in May.", items: ["My", "birthday", "is", "in", "May."] },
        { type: "tip", text: "ماه‌های انگلیسی (January …) با ماه‌های ایرانی (فروردین …) یکی نیستند؛ سال میلادی از دی ماه شروع می‌شود. با هم روی تقویم پیدا کنید تولد کودک در کدام ماه میلادی است تا بتواند بگوید My birthday is in May. تولد بقیه خانواده را هم پیدا کنید." }
      ]
    },
    {
      id: "english-sapling-26", subject: "english", level: "sapling", emoji: "🌅", title: "روز من",
      steps: [
        /* Reza tells his day as it happens: he gets up as the sun comes up, has breakfast in the kitchen, walks to
           school with his bag, and goes to bed when it is night. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { skyN: { art: "en-sky-night" }, skyD: { art: "en-sky-day", o: 0 }, sun: { art: "☀", at: [120, 62], s: 0.9 }, moon: { art: "🌙", at: [121, 34], s: 0.8 },
            room: { art: "en-bedroom" }, bed: { art: "en-bed-low", at: [50, 86], s: 1.3 },
            kitchen: { art: "en-kitchen", o: 0 }, table: { art: "en-table", at: [56, 90], s: 1.1, o: 0 }, bread: { art: "🍞", at: [62, 67], s: 0.6, o: 0 },
            park: { art: "en-park", o: 0 }, school: { art: "🏫", at: [144, 66], s: 1.7, o: 0 },
            kid: { art: "en-reza", at: [58, 64], r: -90, s: 1.1 }, bag: { art: "en-bag", at: [104, 76], s: 0.8, o: 0 } },
          scenes: [
            { caption: "I get up at seven.", key: 3300, hold: 4600, do: [{ id: "kid.shut", to: { o: 1 }, dur: 1 }, { id: "kid.eyes", to: { o: 0 }, dur: 1 },
              { id: "moon", to: { y: 62 }, dur: 1200 }, { id: "skyN", to: { o: 0 }, at: 300, dur: 1400 }, { id: "skyD", to: { o: 1 }, at: 300, dur: 1400 }, { id: "sun", to: { y: 34 }, at: 700, dur: 1400 },
              { id: "kid.shut", to: { o: 0 }, at: 2100, dur: 150 }, { id: "kid.eyes", to: { o: 1 }, at: 2100, dur: 150 }, { id: "kid", to: { x: 104, y: 86, r: 0 }, at: 2300, dur: 900 }] },
            { caption: "I have breakfast.", key: 1700, hold: 4600, do: [].concat([{ id: "kitchen", to: { o: 1 }, dur: 600 }, { id: "table", to: { o: 1 }, dur: 600 }, { id: "bread", to: { o: 1 }, dur: 600 },
              arc("bread", [62, 67], inHand("en-reza", [104, 86], 1.1, "L", "mouth", 0.6), 900, 900, 8), { id: "bread", to: { s: 0.2 }, at: 1800, dur: 1200 }, { id: "bread", to: { o: 0 }, at: 2900, dur: 200 }],
              pose("kid", "L", "mouth", 900, 900), pose("kid", "L", "down", 3000, 300), [{ id: "kid.mouth", to: { o: 1 }, at: 1800, dur: 100 }, { id: "kid.mouth", to: { sy: 0.3 }, at: 1900, dur: 1000, yoyo: true, times: 4 }, { id: "kid.mouth", to: { o: 0 }, at: 2900, dur: 100 }]) },
            { caption: "I go to school.", key: 2000, hold: 4600, do: [].concat([{ id: "kitchen", to: { o: 0 }, dur: 600 }, { id: "table", to: { o: 0 }, dur: 600 }, { id: "park", to: { o: 1 }, dur: 600 }, { id: "school", to: { o: 1 }, dur: 600 },
              { id: "bag", to: { o: 1 }, at: 300, dur: 300 }, { id: "kid", to: { x: 20 }, at: 300, dur: 1 }, { id: "bag", to: { x: 29 }, at: 300, dur: 1 }],
              walk("kid", 120, 700, 2600), [{ id: "bag", to: { x: 129 }, at: 700, dur: 2600, ease: "linear" }]) },
            { caption: "I go to bed at nine.", key: 3400, hold: 5000, do: [{ id: "park", to: { o: 0 }, dur: 700 }, { id: "school", to: { o: 0 }, dur: 700 }, { id: "bag", to: { o: 0 }, dur: 400 },
              { id: "kid", to: { x: 104 }, dur: 600 }, { id: "sun", to: { y: 62 }, at: 400, dur: 1400 }, { id: "skyD", to: { o: 0 }, at: 900, dur: 1400 }, { id: "skyN", to: { o: 1 }, at: 900, dur: 1400 },
              { id: "moon", to: { y: 34 }, at: 1500, dur: 1400 }, { id: "kid", to: { x: 58, y: 64, r: -90 }, at: 2500, dur: 900 }, { id: "kid.shut", to: { o: 1 }, at: 3400, dur: 200 }, { id: "kid.eyes", to: { o: 0 }, at: 3400, dur: 200 }] }
          ] },
        { type: "listen", say: "I have breakfast.", prompt: "گوش کن. کدام کار است؟", options: [{ pic: "🛏️", en: "go to bed" }, { pic: "🍞🥛", en: "have breakfast" }, { pic: "🏫", en: "go to school" }], answer: "🍞🥛" },
        { type: "listen", say: "I go to school at eight.", quiet: true, prompt: "گوش کن. کدام کار است؟", options: [{ pic: "🏫", en: "go to school" }, { pic: "⏰", en: "get up" }, { pic: "🛏️", en: "go to bed" }], answer: "🏫" },
        { type: "order", prompt: "روز را به ترتیب بچین: اول چه کاری، بعد چه کاری؟", numbered: true, ltr: true, items: ["I get up.", "I have breakfast.", "I go to school.", "I go to bed."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I get up at seven.", items: ["I", "get", "up", "at", "seven."] },
        { type: "tip", text: "شب‌ها روز کودک را با هم به انگلیسی بگویید: I get up. I have breakfast. I go to school. I play. I go to bed. کودک کارهای خودش را بگوید و شما با حرکت نشان بدهید. ساعت را هم اضافه کنید: I get up at seven." }
      ]
    },
    {
      id: "english-sapling-27", subject: "english", level: "sapling", emoji: "🧑‍🏫", title: "روز او",
      steps: [
        /* Reza tells Mina's day: she gets up (stretching), goes to school (walks with her bag), plays (jumps with a
           ball) and reads when the night comes. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, dim: { art: "en-dim", o: 0 }, moon: { art: "🌙", at: [20, 26], s: 0.8, o: 0 }, school: { art: "🏫", at: [146, 66], s: 1.5, o: 0 }, clock: { art: "en-clock", at: [140, 18], s: 1.2 }, mina: { art: "en-mina", at: [50, 86], s: 1.3 },
            bag: { art: "en-bag", at: [62, 76], s: 0.8, o: 0 }, ball: { art: "en-ball", at: [70, 86], s: 1.6, o: 0 }, book: { art: "📖", at: inHand("en-mina", [100, 86], 1.3, "R", "hold", 0.6), s: 0.6, o: 0 } },
          scenes: [
            { caption: "She gets up at seven.", key: 1600, do: [].concat([{ id: "clock.hour", to: { r: 210 }, dur: 1000 }], pose("mina", "R", "stretch", 700, 500), pose("mina", "L", "stretch", 700, 500)) },
            { caption: "She goes to school at eight.", key: 2000, do: [].concat(pose("mina", "R", "down", 0, 400), pose("mina", "L", "down", 0, 400), [{ id: "clock.hour", to: { r: 240 }, dur: 900 }, { id: "clock.minute", to: { r: 360 }, dur: 900 },
              { id: "bag", to: { o: 1 }, at: 300, dur: 300 }, { id: "school", to: { o: 1 }, at: 300, dur: 500 }, { id: "bag", to: { x: 112 }, at: 700, dur: 2000, ease: "linear" }], walk("mina", 100, 700, 2000)) },
            { caption: "She plays with a ball.", key: 1300, do: [].concat([{ id: "bag", to: { o: 0 }, dur: 300 }, { id: "ball", to: { o: 1 }, dur: 300 }, { id: "ball", path: "M70 86Q60 50 46 86", at: 400, dur: 1200 }], jump("mina", 600, 2, 6)) },
            { caption: "Does she read at night? Yes, she does.", key: 2400, do: [].concat([{ id: "ball", to: { o: 0 }, dur: 300 }, { id: "school", to: { o: 0 }, dur: 300 }, { id: "dim", to: { o: 1 }, dur: 900 }, { id: "moon", to: { o: 1 }, at: 400, dur: 600 }, { id: "clock.hour", to: { r: 600 }, dur: 1200 }, { id: "clock.minute", to: { r: 4680 }, dur: 1200 }],
              pose("mina", "R", "hold", 600, 500), [{ id: "book", to: { o: 1 }, at: 1100, dur: 300 }, { id: "mina.eyes", to: { y: -0.5, x: 0.4 }, at: 1100, dur: 300 }], nod("mina", 1600)) }
          ] },
        { type: "listen", say: "He goes to school.", prompt: "گوش کن. کدام کار است؟", options: [{ pic: "🏫", en: "goes to school" }, { pic: "🛏️", en: "goes to bed" }, { pic: "⚽", en: "plays" }], answer: "🏫" },
        { type: "sort", prompt: "هر جمله را بخوان. فعلش با I می‌آید یا با she؟ (با he و she، فعل s می‌گیرد)",
          baskets: [{ label: "I …", value: "i" }, { label: "She …", value: "she" }],
          items: [{ label: "play", say: "I play.", basket: "i" }, { label: "plays", say: "She plays.", basket: "she" }, { label: "gets up", say: "She gets up.", basket: "she" },
            { label: "get up", say: "I get up.", basket: "i" }, { label: "goes", say: "She goes.", basket: "she" }, { label: "go", say: "I go.", basket: "i" }] },
        { type: "listen", show: "👧📖", say: "Does she read?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Yes, she does.", en: "Yes, she does." }, { label: "Yes, she reads does.", en: "Yes, she reads does." }, { label: "No, she don't.", en: "No, she don't." }], answer: "Yes, she does." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "She gets up at seven.", items: ["She", "gets", "up", "at", "seven."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Does he play football?", items: ["Does", "he", "play", "football?"] },
        { type: "tip", text: "درباره روز یکی از اعضای خانواده با کودک حرف بزنید: Dad gets up at six. He goes to work. He drinks tea. با he و she به فعل s اضافه می‌شود (gets، goes، plays). سؤال با Does می‌آید: Does Mum like tea? Yes, she does." }
      ]
    },
    {
      id: "english-sapling-28", subject: "english", level: "sapling", emoji: "📖", title: "قصه: روز رضا",
      steps: [
        { type: "passage", prompt: "قصه را بخوان",
          text: "Reza gets up at seven. He has bread and cheese for breakfast. Then he goes to school with his friend Arman. They walk to school.",
          question: "رضا صبحانه چه می‌خورد؟", options: ["🍞🧀", "🍚", "🍌"], answer: "🍞🧀" },
        { type: "passage", prompt: "قصه را دوباره بخوان",
          text: "Reza gets up at seven. He has bread and cheese for breakfast. Then he goes to school with his friend Arman. They walk to school.",
          question: "رضا با چه کسی به مدرسه می‌رود؟", options: ["👨 Dad", "👦 Arman", "👧 Sara"], answer: "👦 Arman" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "At school Reza reads and writes. At one o'clock he goes home. In the afternoon he plays football in the park. At nine he goes to bed.",
          question: "رضا بعدازظهر چه کار می‌کند؟", options: ["📖", "⚽", "🛏️"], answer: "⚽" },
        { type: "passage", prompt: "بقیه قصه را دوباره بخوان",
          text: "At school Reza reads and writes. At one o'clock he goes home. In the afternoon he plays football in the park. At nine he goes to bed.",
          question: "رضا ساعت چند به خانه می‌رود؟", options: ["🕐", "🕖", "🕘"], answer: "🕐" },
        { type: "tip", text: "بعد از خواندن، کودک روز خودش را مثل قصه رضا بگوید یا بنویسد: I get up at … . I have … for breakfast. بپرسید کدام کارهایش با رضا یکی است و کدام فرق دارد." }
      ]
    },
    {
      id: "english-sapling-29", subject: "english", level: "sapling", emoji: "🎲", title: "بازی هر روز",
      steps: [
        { type: "order", prompt: "روز سارا را به ترتیب بچین", numbered: true, ltr: true, items: ["She gets up.", "She has breakfast.", "She goes to school.", "She plays.", "She goes to bed."] },
        { type: "sort", prompt: "هر جمله را بخوان. درست است یا یک s کم دارد؟",
          baskets: [{ pic: "✅", value: "ok" }, { pic: "❌", value: "no" }],
          items: [{ label: "She plays football.", basket: "ok" }, { label: "He play football.", basket: "no" }, { label: "I like milk.", basket: "ok" },
            { label: "She like milk.", basket: "no" }, { label: "We go to school.", basket: "ok" }, { label: "He goes to school.", basket: "ok" }] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I have breakfast at seven.", items: ["I", "have", "breakfast", "at", "seven."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "On Friday she plays in the park.", items: ["On", "Friday", "she", "plays", "in", "the", "park."] },
        { type: "sort", prompt: "هر کار مال صبح است یا شب؟",
          baskets: [{ pic: "🌅", value: "morning" }, { pic: "🌙", value: "night" }],
          items: [{ label: "get up", say: "get up", basket: "morning" }, { label: "go to bed", say: "go to bed", basket: "night" }, { label: "have breakfast", say: "have breakfast", basket: "morning" },
            { label: "have dinner", say: "have dinner", basket: "night" }] },
        { type: "tip", text: "این بازی جمله‌های «هر روز» را مرور می‌کند. با هم یک برنامه روزانه تصویری بکشید و زیر هر تصویر یک جمله بنویسید: I get up. She plays. بعد کودک برنامه یک نفر دیگر را با he یا she بگوید." }
      ]
    },
    {
      id: "english-sapling-30", subject: "english", level: "sapling", emoji: "🔀", title: "یک حرف، دو صدا",
      steps: [
        { type: "listen", say: "cat. city.", show: "c", prompt: "c در cat «ک» است و در city «س». گوش کن: کدام «س» دارد؟",
          options: [{ pic: "🐱", en: "cat" }, { pic: "🏙️", en: "city" }], answer: "🏙️" },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. c آن «ک» است یا «س»؟ (قبل از e، i و y بیشتر «س» است)",
          baskets: [{ label: "c = ک", value: "k" }, { label: "c = س", value: "s" }],
          items: [{ label: "cat", say: "cat", basket: "k" }, { label: "city", say: "city", basket: "s" }, { label: "cup", say: "cup", basket: "k" },
            { label: "ice", say: "ice", basket: "s" }, { label: "car", say: "car", basket: "k" }, { label: "face", say: "face", basket: "s" }] },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. g آن «گ» است یا «ج»؟",
          baskets: [{ label: "g = گ", value: "g" }, { label: "g = ج", value: "j" }],
          items: [{ label: "goat", say: "goat", basket: "g" }, { label: "giraffe", say: "giraffe", basket: "j" }, { label: "dog", say: "dog", basket: "g" },
            { label: "giant", say: "giant", basket: "j" }, { label: "game", say: "game", basket: "g" }, { label: "orange", say: "orange", basket: "j" }] },
        { type: "sort", prompt: "روی هر کلمه بزن و گوش کن. y آن چه صدایی دارد؟",
          baskets: [{ label: "yes", value: "y" }, { label: "my", value: "i" }, { label: "happy", value: "ee" }],
          items: [{ label: "yellow", say: "yellow", basket: "y" }, { label: "fly", say: "fly", basket: "i" }, { label: "baby", say: "baby", basket: "ee" },
            { label: "you", say: "you", basket: "y" }, { label: "sky", say: "sky", basket: "i" }, { label: "funny", say: "funny", basket: "ee" }] },
        { type: "listen", say: "snow. cow.", show: "ow", prompt: "ow دو صدا دارد. گوش کن: در کدام «آو» است؟",
          options: [{ pic: "❄️", en: "snow" }, { pic: "🐮", en: "cow" }], answer: "🐮" },
        { type: "tip", text: "بعضی حرف‌ها بیشتر از یک صدا دارند: c در cat و city، g در goat و giraffe، y در yes، my و happy، ow در cow و snow. وقتی کودک کلمه ناآشنایی دید، اگر صدای اول جواب نداد، صدای دیگر را امتحان کند. این مهارت مهمی برای خواندن است." }
      ]
    },
    {
      id: "english-sapling-31", subject: "english", level: "sapling", emoji: "📚", title: "الان چه می‌کنی؟",
      steps: [
        /* Mina asks Reza what he is doing: he is reading (a book in his hands, his eyes on it). Then he says what Mina
           is doing (eating an apple) and what the cat is doing (sleeping). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, cat: { art: "en-cat", at: [80, 86], s: 1.2 },
            mina: { art: "en-mina", at: [36, 86], s: 1.2 }, reza: { art: "en-reza", at: [124, 86], s: 1.2 },
            book: { art: "📖", at: inHand("en-reza", [124, 86], 1.2, "L", "ask", 0.6), s: 0.6 }, apple: { art: "🍎", at: inHand("en-mina", [36, 86], 1.2, "R", "mouth", 0.5), s: 0.5, o: 0 },
            zzz: { art: "💤", at: [90, 70], s: 0.4, o: 0 }, ask: { art: "en-ask", at: [44, 48], o: 0 } },
          scenes: [
            { caption: "What are you doing?", key: 1300, do: [].concat(pose("reza", "L", "ask", 0, 1), [{ id: "reza.eyes", to: { x: -0.5, y: 0.7 }, dur: 1 }], pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1100), pop("ask", 500)) },
            { caption: "I'm reading.", key: 1300, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 400), talk("reza", 0, 900), [{ id: "book", to: { r: -6 }, at: 400, dur: 1600, yoyo: true, times: 2 }]) },
            { caption: "She's eating an apple.", key: 1700, do: [].concat(pose("mina", "R", "mouth", 0, 600), [{ id: "apple", to: { o: 1 }, at: 500, dur: 200 }, { id: "mina.mouth", to: { o: 1 }, at: 800, dur: 100 },
              { id: "mina.mouth", to: { sy: 0.3 }, at: 900, dur: 1600, yoyo: true, times: 6 }, { id: "apple", to: { s: 0.3 }, at: 900, dur: 1800 }], talk("reza", 0, 1300)) },
            { caption: "The cat is sleeping.", key: 1500, do: [{ id: "mina.mouth", to: { o: 0 }, dur: 100 }, { id: "cat.head", to: { r: 30 }, dur: 800 }, { id: "cat", to: { sy: 0.85 }, at: 300, dur: 600 },
              { id: "zzz", to: { o: 1 }, at: 800, dur: 400 }, { id: "zzz", to: { y: "-6" }, at: 800, dur: 1600 }] }
          ] },
        { type: "listen", say: "She's eating.", prompt: "گوش کن. چه کار می‌کند؟", options: [{ pic: "📖", en: "reading" }, { pic: "🍎", en: "eating" }, { pic: "😴", en: "sleeping" }], answer: "🍎" },
        { type: "listen", say: "He's swimming.", quiet: true, prompt: "گوش کن. چه کار می‌کند؟", options: [{ pic: "🏊", en: "swimming" }, { pic: "🏃", en: "running" }, { pic: "🎵", en: "singing" }], answer: "🏊" },
        { type: "listen", show: "👧📖", say: "What's she doing?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "She's reading.", en: "She's reading." }, { label: "She reads every day.", en: "She reads every day." }, { label: "She's eating.", en: "She's eating." }], answer: "She's reading." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "What are you doing?", items: ["What", "are", "you", "doing?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I'm drawing a cat.", items: ["I'm", "drawing", "a", "cat."] },
        { type: "tip", text: "برای کاری که همین الان انجام می‌شود، am / is / are و ing می‌آید: I'm reading. She's eating. بازی «چه کار می‌کنم؟» کنید: بی‌صدا کاری را نشان بدهید (مسواک زدن، خوردن) و کودک بگوید You're brushing your teeth! بعد جایتان عوض شود." }
      ]
    },
    {
      id: "english-sapling-32", subject: "english", level: "sapling", emoji: "🌳", title: "در پارک",
      steps: [
        /* A busy park: each person is shown doing what is said: the girl runs, the boy jumps, Grandpa reads on the bench,
           Mum waves, the dog sleeps. */
        { type: "scene", prompt: "گوش کن و پیدا کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, gpa: { art: "en-grandpa", at: [118, 86], s: 1 }, paper: { art: "📖", at: inHand("en-grandpa", [118, 86], 1, "R", "ask", 0.5), s: 0.5 },
            mum: { art: "en-mother", at: [148, 86], s: 1 }, dog: { art: "en-dog", at: [88, 88], s: 1 }, zzz: { art: "💤", at: [100, 70], s: 0.35, o: 0 },
            girl: { art: "en-mina", at: [-10, 86], s: 1 }, boy: { art: "en-arman", at: [62, 86], s: 1 } },
          scenes: [
            { caption: "Look at the park! The girl is running.", key: 1800, hold: 4400, do: [].concat(pose("gpa", "R", "ask", 0, 1), [{ id: "gpa.eyes", to: { y: 0.7 }, dur: 1 }], run("girl", 36, 300, 1600)) },
            { caption: "The boy is jumping.", key: 925, do: jump("boy", 600, 3, 7) },
            { caption: "Grandpa is reading.", key: 1500, do: [{ id: "paper", to: { r: -6 }, at: 400, dur: 1600, yoyo: true, times: 2 }, { id: "gpa.head", to: { r: 4 }, at: 400, dur: 1600, yoyo: true, times: 2 }] },
            { caption: "Mum is waving.", key: 1300, do: wave("mum", "L", 200, 2000) },
            { caption: "And the dog is sleeping.", key: 1500, do: [{ id: "dog.head", to: { r: 25 }, dur: 800 }, { id: "dog", to: { sy: 0.7 }, dur: 800 }, { id: "zzz", to: { o: 1 }, at: 700, dur: 400 }, { id: "zzz", to: { y: "-6" }, at: 700, dur: 1600 }] }
          ] },
        { type: "listen", say: "Find the boy. He's jumping.", prompt: "گوش کن و پیدا کن", options: [{ pic: "🏃", en: "running" }, { pic: "🤸", en: "jumping" }, { pic: "📖", en: "reading" }], answer: "🤸" },
        { type: "listen", say: "Grandpa is reading.", quiet: true, prompt: "گوش کن و پیدا کن", options: [{ pic: "👴📖", en: "reading" }, { pic: "👴😴", en: "sleeping" }, { pic: "👴🍵", en: "drinking" }], answer: "👴📖" },
        { type: "listen", say: "The dog is sleeping.", quiet: true, prompt: "گوش کن و پیدا کن", options: [{ pic: "🐶😴", en: "sleeping" }, { pic: "🐶🏃", en: "running" }, { pic: "🐶🍖", en: "eating" }], answer: "🐶😴" },
        { type: "listen", say: "Is the girl running? Yes, she is.", quiet: true, prompt: "گوش کن. دختر چه کار می‌کند؟", options: [{ pic: "🏃‍♀️", en: "running" }, { pic: "🏊‍♀️", en: "swimming" }], answer: "🏃‍♀️" },
        { type: "tip", text: "در پارک یا از پنجره به آدم‌ها نگاه کنید و بپرسید What's that man doing? کودک بگوید He's walking. He's reading. بازی «پیدا کن» هم خوب است: Find a girl who is running! و کودک نشان بدهد." }
      ]
    },
    {
      id: "english-sapling-33", subject: "english", level: "sapling", emoji: "🏃", title: "-ing و -ed",
      steps: [
        { type: "listen", show: "run → running", say: "run. running.", prompt: "بعضی کلمه‌ها برای ing حرف آخرشان را دوتا می‌کنند. ببین و گوش کن. کدام درست است؟",
          options: [{ label: "runing" }, { label: "running", en: "running" }], answer: "running" },
        { type: "sort", prompt: "هر فعل با ing چطور نوشته می‌شود؟ (یک حرف صدادار کوتاه و یک حرف آخر: دوتا می‌شود؛ e آخر: می‌افتد)",
          baskets: [{ label: "+ ing", value: "ing" }, { label: "دوتا + ing", value: "double" }, { label: "e ✗ + ing", value: "e" }],
          items: [{ label: "play", say: "playing", basket: "ing" }, { label: "run", say: "running", basket: "double" }, { label: "make", say: "making", basket: "e" },
            { label: "read", say: "reading", basket: "ing" }, { label: "swim", say: "swimming", basket: "double" }, { label: "ride", say: "riding", basket: "e" }] },
        { type: "build", prompt: "گوش کن و بساز", word: "making", parts: ["mak", "ing"], extra: ["e"], pic: "🎂" },
        { type: "build", prompt: "گوش کن و بساز", word: "hopping", parts: ["hop", "p", "ing"], extra: ["e"], pic: "🐇" },
        { type: "sort", prompt: "کارهایی که تمام شده‌اند ed می‌گیرند. هر کلمه را بخوان و گوش کن: الان است یا گذشته؟",
          baskets: [{ pic: "▶️", value: "now" }, { pic: "⏪", value: "past" }],
          items: [{ label: "played", say: "played", basket: "past" }, { label: "playing", say: "playing", basket: "now" }, { label: "jumped", say: "jumped", basket: "past" }, { label: "jumping", say: "jumping", basket: "now" }] },
        { type: "build", prompt: "گوش کن و بساز", word: "hopped", parts: ["hop", "p", "ed"], extra: ["e"], pic: "🐇" },
        { type: "tip", text: "دو قاعده املایی: اگر کلمه یک حرف صدادار کوتاه و یک حرف آخر دارد، حرف آخر دوتا می‌شود (run → running، hop → hopped). اگر با e تمام می‌شود، e می‌افتد (make → making). بقیه فقط ing یا ed می‌گیرند (play → playing، played)." }
      ]
    },
    {
      id: "english-sapling-34", subject: "english", level: "sapling", emoji: "🚲", title: "توانایی‌ها",
      steps: [
        /* Reza rides his bike across the park; Arman tries to whistle (his lips round, no sound comes) and shakes his
           head; Mina draws a cat on the board, line by line. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, board: { art: "en-frame", at: [96, 20], sx: 1.1, sy: 0.6 }, drawing: { art: "en-cat", at: [121, 46], s: 1.6, o: 0 },
            arman: { art: "en-arman", at: [40, 86], s: 1.2 }, mina: { art: "en-mina", at: [104, 86], s: 1.2 },
            reza: { art: "en-reza", at: [-20, 82], s: 1 }, bike: { art: "🚲", at: [-20, 89], s: 1.5 } },
          scenes: [
            { caption: "I can ride a bike!", key: 1500, do: [{ id: "reza", to: { x: 180 }, dur: 3000, ease: "linear" }, { id: "bike", to: { x: 180 }, dur: 3000, ease: "linear" },
              { id: "reza.legL", to: { sy: 0.7 }, dur: 3000, yoyo: true, times: 8 }, { id: "reza.legR", to: { sy: 0.7 }, at: 190, dur: 3000, yoyo: true, times: 8 }] },
            { caption: "Can you whistle? No, I can't.", key: 1300, do: [].concat([{ id: "arman.mouth", to: { o: 1, sx: 0.6 }, at: 300, dur: 300 }, { id: "arman.mouth", to: { o: 0 }, at: 2000, dur: 200 }],
              shake("arman", 2200), pose("arman", "R", "ask", 2200, 400), pose("arman", "L", "ask", 2200, 400)) },
            { caption: "She can draw a cat.", key: 2800, hold: 4400, do: [].concat(pose("arman", "R", "down", 0, 400), pose("arman", "L", "down", 0, 400), pose("mina", "R", "pointUp", 0, 500),
              [{ id: "drawing", to: { o: 1 }, at: 500, dur: 2600 }, { id: "drawing", draw: true, oneByOne: true, at: 500, dur: 2600 }]) }
          ] },
        { type: "listen", say: "I can ride a bike.", prompt: "گوش کن. چه کاری می‌تواند بکند؟", options: [{ pic: "🚲", en: "ride a bike" }, { pic: "🏊", en: "swim" }, { pic: "🎨", en: "draw" }], answer: "🚲" },
        { type: "listen", say: "He can't swim.", quiet: true, prompt: "گوش کن. می‌تواند یا نمی‌تواند؟", options: [{ pic: "👍🏊", en: "He can swim.", value: "can" }, { pic: "👎🏊", en: "He can't swim.", value: "cant" }], answer: "cant" },
        { type: "listen", show: "🐟", say: "Can a fish climb a tree?", prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "Yes, it can.", en: "Yes, it can." }, { label: "No, it can't.", en: "No, it can't." }], answer: "No, it can't." },
        { type: "sort", prompt: "هر جمله را بخوان. درست است یا نه؟",
          baskets: [{ pic: "✅", value: "true" }, { pic: "❌", value: "false" }],
          items: [{ label: "A bird can fly.", say: "A bird can fly.", basket: "true" }, { label: "A cat can read.", say: "A cat can read.", basket: "false" },
            { label: "A fish can swim.", say: "A fish can swim.", basket: "true" }, { label: "A dog can draw.", say: "A dog can draw.", basket: "false" }] },
        { type: "tip", text: "با هم یک فهرست «می‌توانم / نمی‌توانم» درست کنید: I can ride a bike. I can't whistle. بعد درباره بقیه خانواده: Dad can cook. Grandma can sing. بعد از can فعل بدون s می‌آید: She can swim (نه She can swims)." }
      ]
    },
    {
      id: "english-sapling-35", subject: "english", level: "sapling", emoji: "🚪", title: "این کار را بکن",
      steps: [
        /* In class the teacher gives instructions and the children do them: Arman opens the door, Reza stops running,
           and everyone jumps up to play. */
        { type: "scene", prompt: "گوش کن و ببین", bg: "#f3ead8",
          parts: { room: { art: "en-classroom" }, door: { art: "🚪", at: [146, 88], s: 1.6 }, teacher: { art: "en-teacher", at: [14, 86], s: 0.95 },
            arman: { art: "en-arman", at: [120, 86], s: 1.1 }, reza: { art: "en-reza", at: [32, 86], s: 1.1 }, mina: { art: "en-mina", at: [96, 86], s: 1.1 } },
          scenes: [
            { caption: "Arman, open the door, please.", key: 2400, do: [].concat(pose("teacher", "R", "point", 0, 500), talk("teacher", 0, 1800), walk("arman", 134, 600, 800),
              pose("arman", "R", "point", 1400, 400), [{ id: "door", to: { sx: 0.4 }, at: 1800, dur: 700 }]) },
            { caption: "Don't run, Reza!", key: 1900, do: [].concat(run("reza", 62, 0, 1000), pose("teacher", "R", "stop", 600, 300), talk("teacher", 600, 900), [{ id: "reza", to: { x: 62 }, at: 1000, dur: 1 }], shake("reza", 1400)) },
            { caption: "Let's play!", key: 925, do: [].concat(pose("teacher", "R", "down", 0, 400), wave("teacher", "R", 300, 1400), jump("arman", 600, 2, 6), jump("reza", 600, 2, 6), jump("mina", 600, 2, 6)) }
          ] },
        { type: "listen", say: "Open the window, please.", prompt: "گوش کن. چه کار کند؟", options: [{ pic: "🚪", en: "the door" }, { pic: "🪟", en: "the window" }, { pic: "📖", en: "the book" }], answer: "🪟" },
        { type: "listen", say: "Don't touch!", quiet: true, prompt: "گوش کن. اجازه دارد یا ندارد؟", options: [{ pic: "✅✋", en: "Touch!", value: "do" }, { pic: "⛔✋", en: "Don't touch!", value: "dont" }], answer: "dont" },
        { type: "listen", say: "Sit down and open your book.", quiet: true, prompt: "گوش کن. کدام دو کار را بکند؟", options: [{ pic: "🪑📖", en: "sit down, open your book" }, { pic: "🧍🚪", en: "stand up, open the door" }], answer: "🪑📖" },
        { type: "listen", show: "⚽👫", prompt: "می‌خواهی دوستت با تو بازی کند. چه می‌گویی؟",
          options: [{ label: "Let's play!", en: "Let's play!" }, { label: "Don't play!", en: "Don't play!" }, { label: "Goodbye!", en: "Goodbye!" }], answer: "Let's play!" },
        { type: "tip", text: "دستورها در انگلیسی با فعل شروع می‌شوند: Open the door. Close your eyes. برای «نکن» Don't می‌آید: Don't run! و برای «بیا با هم» Let's: Let's go! بازی «Sara says» را با جمله‌های بلندتر دوباره بازی کنید: Sara says: open your book and stand up!" }
      ]
    },
    {
      id: "english-sapling-36", subject: "english", level: "sapling", emoji: "🎒", title: "مال کیست؟",
      steps: [
        /* Whose things are these? The teacher holds up a bag and Sara's hand goes up; Reza's blue cap and Mina's
           hat are pointed to. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f3ead8",
          parts: { room: { art: "en-classroom" }, teacher: { art: "en-teacher", at: [20, 86], s: 0.95 }, bag: { art: "en-bag", at: inHand("en-teacher", [20, 86], 0.95, "R", "hold", 0), s: 1, o: 0 },
            sara: { art: "en-sara", at: [62, 86], s: 1.1 }, reza: { art: "en-reza", at: [96, 86], s: 1.1 }, mina: { art: "en-mina", at: [130, 86], s: 1.1 },
            cap: { art: "🧢", at: [96.4, 51], s: 0.85 }, hat: { art: "👒", at: [130.4, 50], s: 0.9 } },
          scenes: [
            { caption: "Whose bag is this?", key: 1500, do: [].concat(pose("teacher", "R", "hold", 0, 500), [{ id: "bag", to: { o: 1 }, at: 400, dur: 300 }], talk("teacher", 0, 1300)) },
            { caption: "It's my bag!", key: 1100, do: [].concat(pose("sara", "R", "pointUp", 0, 500), talk("sara", 0, 900), face("sara", true, 0)) },
            { caption: "It's Sara's bag.", key: 1500, do: [].concat(pose("sara", "R", "down", 0, 400), arc("bag", inHand("en-teacher", [20, 86], 0.95, "R", "hold", 0), [70, 70], 300, 1000, 8), pose("teacher", "R", "down", 1300, 400), talk("teacher", 0, 1200)) },
            { caption: "His cap is blue.", key: 1200, do: [].concat(pose("sara", "R", "point", 0, 500), [{ id: "cap", to: { y: "-2" }, at: 500, dur: 600, yoyo: true, times: 2 }], talk("sara", 0, 1000)) },
            { caption: "Her hat is yellow.", key: 1200, do: [].concat(pose("reza", "R", "point", 0, 500), pose("sara", "R", "down", 0, 400), [{ id: "hat", to: { y: "-2" }, at: 500, dur: 600, yoyo: true, times: 2 }], talk("reza", 0, 1000)) }
          ] },
        { type: "listen", say: "This is his ball.", prompt: "گوش کن. توپ مال کیست؟", options: [{ pic: "👦⚽", en: "his ball", value: "his" }, { pic: "👧⚽", en: "her ball", value: "her" }], answer: "his" },
        { type: "listen", say: "That's her bike.", quiet: true, prompt: "گوش کن. دوچرخه مال کیست؟", options: [{ pic: "👦🚲", en: "his bike", value: "his" }, { pic: "👧🚲", en: "her bike", value: "her" }], answer: "her" },
        { type: "listen", say: "Whose dog is this? It's Reza's dog.", quiet: true, prompt: "گوش کن. سگ مال کیست؟",
          options: [{ label: "Sara's", en: "Sara's" }, { label: "Reza's", en: "Reza's" }, { label: "Mina's", en: "Mina's" }], answer: "Reza's" },
        { type: "pairs", prompt: "هر کلمه را با کلمه‌ای جفت کن که با آن می‌آید",
          pairs: [[{ label: "I" }, { label: "my" }], [{ label: "you" }, { label: "your" }], [{ label: "he" }, { label: "his" }], [{ label: "she" }, { label: "her" }]] },
        { type: "tip", text: "چیزهای خانه را با هم «صاحب‌دار» کنید: This is my cup. That's your cup. It's Dad's phone. برای پسر his و برای دختر her. بازی «مال کیست؟» کنید: چیزی را بالا بگیرید و بپرسید Whose is this? تا کودک بگوید It's Grandma's!" }
      ]
    },
    {
      id: "english-sapling-37", subject: "english", level: "sapling", emoji: "🧔", title: "چه شکلی است؟",
      steps: [
        /* Sara describes her family as each one waves: Dad is tall, her little brother is short; Grandpa has got
           glasses and a white moustache; Mum has got long hair. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, dad: { art: "en-father", at: [50, 86], s: 1.1 }, bro: { art: "en-brother", at: [74, 86], s: 1 },
            gpa: { art: "en-grandpa", at: [104, 86] }, mum: { art: "en-mother", at: [136, 86] }, sara: { art: "en-sara", at: [18, 86], s: 1.05 } },
          scenes: [
            { caption: "My dad is tall.", key: 1500, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1000), wave("dad", "R", 600, 1400), [{ id: "dad", to: { sy: 1.05 }, at: 600, dur: 800, yoyo: true, times: 2 }]) },
            { caption: "My brother is short.", key: 1400, do: [].concat(talk("sara", 0, 1200), wave("bro", "R", 500, 1400)) },
            { caption: "Grandpa has got glasses and a white moustache.", key: 1500, do: [].concat(talk("sara", 0, 2200), wave("gpa", "R", 600, 1400), [{ id: "gpa.head", to: { r: -6 }, at: 600, dur: 1200, yoyo: true, times: 2 }]) },
            { caption: "Mum has got long hair.", key: 1500, do: [].concat(talk("sara", 0, 1400), wave("mum", "L", 600, 1400), [{ id: "mum.head", to: { r: 8 }, at: 600, dur: 1200, yoyo: true, times: 2 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "🦒", en: "tall" }, { pic: "🐭", en: "short" }, { pic: "👩‍🦰", en: "long hair" }, { pic: "👨‍🦱", en: "curly hair" }, { pic: "👓", en: "glasses" }, { pic: "🧔", en: "beard" }] },
        { type: "listen", say: "He's got a beard.", prompt: "گوش کن. کدام است؟", options: [{ pic: "🧔", en: "a beard" }, { pic: "👓", en: "glasses" }, { pic: "👨‍🦱", en: "curly hair" }], answer: "🧔" },
        { type: "listen", say: "She's got glasses.", quiet: true, prompt: "گوش کن. کدام است؟", options: [{ pic: "👩‍🦰", en: "long hair" }, { pic: "👩‍🏫", en: "glasses" }], answer: "👩‍🏫" },
        { type: "pairs", prompt: "هر نوشته را بخوان و با تصویرش جفت کن",
          pairs: [["He's got a beard.", "🧔"], ["She's got curly hair.", "👩‍🦱"], ["He's got glasses.", "👓"], ["She's tall.", "🦒"]] },
        { type: "tip", text: "بازی «حدس بزن کیست» کنید: یکی از اعضای خانواده یا آشنایان را توصیف کنید: She's tall. She's got long hair and glasses. و کودک حدس بزند. بعد کودک توصیف کند. فقط ظاهر را بگویید و مهربان؛ درباره هیچ‌کس حرف ناراحت‌کننده نزنید." }
      ]
    },
    {
      id: "english-sapling-38", subject: "english", level: "sapling", emoji: "🥚", title: "a، an، some",
      steps: [
        { type: "listen", say: "an egg", prompt: "قبل از کلمه‌ای که با صدای صدادار (a، e، i، o، u) شروع می‌شود، an می‌آید. گوش کن و پیدا کن.",
          options: [{ pic: "🥚", en: "an egg" }, { pic: "🍌", en: "a banana" }, { pic: "🥛", en: "some milk" }], answer: "🥚" },
        { type: "sort", prompt: "هر کلمه را بخوان و گوش کن. با a می‌آید یا an؟",
          baskets: [{ label: "a" }, { label: "an" }],
          items: [{ label: "banana", say: "a banana", basket: "a" }, { label: "apple", say: "an apple", basket: "an" }, { label: "egg", say: "an egg", basket: "an" },
            { label: "cat", say: "a cat", basket: "a" }, { label: "orange", say: "an orange", basket: "an" }, { label: "book", say: "a book", basket: "a" }] },
        { type: "sort", prompt: "چیزهایی که شمرده نمی‌شوند some می‌گیرند. هر کدام را در سبد درست بگذار.",
          baskets: [{ label: "a / an" }, { label: "some" }],
          items: [{ pic: "🥛", say: "some milk", basket: "some" }, { pic: "🍎", say: "an apple", basket: "a / an" }, { pic: "🍞", say: "some bread", basket: "some" },
            { pic: "💧", say: "some water", basket: "some" }, { pic: "🥚", say: "an egg", basket: "a / an" }, { pic: "🍌", say: "a banana", basket: "a / an" }] },
        { type: "listen", show: "🍚", say: "some rice", prompt: "کدام درست است؟", options: [{ label: "a rice" }, { label: "some rice", en: "some rice" }], answer: "some rice" },
        { type: "listen", show: "🦉", prompt: "کدام درست است؟", options: [{ label: "a owl" }, { label: "an owl", en: "an owl" }], answer: "an owl" },
        { type: "tip", text: "سر سفره بازی کنید: Can I have an egg? Can I have some bread? برای یکی a (a banana)، اگر کلمه با صدای صدادار شروع شود an (an apple، an egg)، و برای چیزهایی مثل milk، water، bread و rice که نمی‌شمریم some." }
      ]
    },
    {
      id: "english-sapling-39", subject: "english", level: "sapling", emoji: "🏙️", title: "در شهر",
      steps: [
        /* A street with buildings side by side; Mina walks along it and points as each place lights up. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { ground: { art: "en-park" }, shop: { art: "🏪", at: [16, 64], s: 1.4 }, school: { art: "🏫", at: [48, 64], s: 1.4 }, park: { art: "🌳", at: [80, 64], s: 1.6 },
            hosp: { art: "🏥", at: [112, 64], s: 1.4 }, lib: { art: "📚", at: [144, 64], s: 1.2 }, stop: { art: "🚏", at: [128, 88], s: 0.9 },
            mina: { art: "en-mina", at: [-10, 88], s: 0.9 }, ask: { art: "en-ask", at: [4, 40], s: 0.8, o: 0 } },
          scenes: [
            { caption: "This is my town. There's a shop and a school.", key: 2600, hold: 4400, do: [].concat(walk("mina", 30, 0, 1400), [{ id: "shop", to: { s: 1.55 }, at: 1500, dur: 500, yoyo: true, times: 2 }, { id: "school", to: { s: 1.55 }, at: 2400, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "Where's the park? It's next to the school.", key: 2300, do: [].concat(pop("ask", 0), walk("mina", 66, 300, 1400), [{ id: "park", to: { s: 1.75 }, at: 1800, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "The hospital is next to the park.", key: 2000, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], walk("mina", 98, 0, 1300), [{ id: "hosp", to: { s: 1.55 }, at: 1400, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "And here's the library and the bus stop.", key: 2200, do: [].concat(walk("mina", 120, 0, 1000), [{ id: "lib", to: { s: 1.35 }, at: 1100, dur: 500, yoyo: true, times: 2 }, { id: "stop", to: { r: 6 }, at: 1800, dur: 800, yoyo: true, times: 2 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "🏪", en: "shop" }, { pic: "🌳", en: "park" }, { pic: "🏥", en: "hospital" }, { pic: "📚", en: "library" }, { pic: "🚏", en: "bus stop" }, { pic: "🏫", en: "school" }] },
        { type: "listen", say: "Where can you read books? In the library.", prompt: "گوش کن. کدام جا؟", options: [{ pic: "🏥", en: "hospital" }, { pic: "📚", en: "library" }, { pic: "🏪", en: "shop" }], answer: "📚" },
        { type: "listen", say: "The doctor is in the hospital.", quiet: true, prompt: "گوش کن. کدام جا؟", options: [{ pic: "🏥", en: "hospital" }, { pic: "🚏", en: "bus stop" }, { pic: "🌳", en: "park" }], answer: "🏥" },
        { type: "listen", say: "The shop is next to the school.", quiet: true, prompt: "گوش کن. کدام درست است؟",
          options: [{ pic: "🏪🏫", en: "the shop next to the school", value: "yes" }, { pic: "🏪 · · · 🏫", en: "the shop far from the school", value: "no" }], answer: "yes" },
        { type: "tip", text: "در محله خودتان قدم بزنید و جاها را به انگلیسی بگویید: the shop، the park، the bus stop. بعد بپرسید Where's the bakery? و کودک با next to یا opposite جواب بدهد. می‌توانید با هم یک نقشه ساده محله بکشید." }
      ]
    },
    {
      id: "english-sapling-40", subject: "english", level: "sapling", emoji: "👩‍⚕️", title: "شغل‌ها",
      steps: [
        /* People at work come one by one, each doing their job: the doctor with her stethoscope, the farmer with his
           corn, the cook with a pot, the teacher at the board. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, doc: { art: "👩‍⚕️", at: [-20, 88], s: 1.45 }, steth: { art: "🩺", at: [80, 62], s: 0.9, o: 0 },
            farmer: { art: "🧑‍🌾", at: [-20, 88], s: 1.45 }, corn: { art: "🌽", at: [80, 62], s: 0.9, o: 0 },
            cook: { art: "🧑‍🍳", at: [-20, 88], s: 1.45 }, pot: { art: "🍲", at: [80, 62], s: 0.9, o: 0 },
            teacher: { art: "en-teacher", at: [200, 86], s: 0.95 }, board: { art: "en-frame", at: [100, 18], sx: 1, sy: 0.6, o: 0 } },
          scenes: [
            { caption: "What does she do? She's a doctor.", key: 2400, do: [{ id: "doc", walk: [60, 88], dur: 1800 }, { id: "steth", to: { o: 1 }, at: 1900, dur: 300 }, { id: "steth", to: { y: "-3" }, at: 2200, dur: 600, yoyo: true, times: 2 }] },
            { caption: "He's a farmer.", key: 2400, do: [{ id: "steth", to: { o: 0 }, dur: 300 }, { id: "doc", walk: [200, 88], dur: 1600 }, { id: "farmer", walk: [60, 88], at: 300, dur: 1600 }, { id: "corn", to: { o: 1 }, at: 1900, dur: 300 }] },
            { caption: "He's a cook.", key: 2400, do: [{ id: "corn", to: { o: 0 }, dur: 300 }, { id: "farmer", walk: [200, 88], dur: 1600 }, { id: "cook", walk: [60, 88], at: 300, dur: 1600 }, { id: "pot", to: { o: 1 }, at: 1900, dur: 300 }, { emit: "bubble", where: [80, 48], n: 5, at: 2100, dur: 800 }] },
            { caption: "She's a teacher.", key: 2300, do: [].concat([{ id: "pot", to: { o: 0 }, dur: 300 }, { id: "cook", walk: [200, 88], dur: 1600 }, { id: "board", to: { o: 1 }, at: 300, dur: 400 }], walk("teacher", 90, 300, 1600), pose("teacher", "R", "pointUp", 2000, 500)) }
          ] },
        { type: "words", show: true, words: [{ pic: "👨‍🏫", en: "teacher" }, { pic: "👩‍⚕️", en: "doctor" }, { pic: "🧑‍🌾", en: "farmer" }, { pic: "🚌", en: "driver" }, { pic: "🩺", en: "nurse" }, { pic: "🧑‍🍳", en: "cook" }] },
        { type: "listen", say: "She's a doctor.", prompt: "گوش کن. شغلش چیست؟", options: [{ pic: "🧑‍🍳", en: "cook" }, { pic: "👩‍⚕️", en: "doctor" }, { pic: "🧑‍🌾", en: "farmer" }], answer: "👩‍⚕️" },
        { type: "listen", say: "He drives a bus. He's a driver.", quiet: true, prompt: "گوش کن. شغلش چیست؟", options: [{ pic: "🚌", en: "driver" }, { pic: "👨‍🏫", en: "teacher" }, { pic: "🧑‍🍳", en: "cook" }], answer: "🚌" },
        { type: "listen", say: "What does he do? He works on a farm.", quiet: true, prompt: "گوش کن. شغلش چیست؟", options: [{ pic: "🧑‍🌾", en: "farmer" }, { pic: "👩‍⚕️", en: "doctor" }, { pic: "🚌", en: "driver" }], answer: "🧑‍🌾" },
        { type: "tip", text: "درباره شغل‌های آشنایان بپرسید: What does Uncle Ali do? He's a driver. What does Aunt Maryam do? She's a nurse. شغل‌ها مال زن و مرد هر دو است؛ با کودک درباره کار هر کس و اینکه چطور به دیگران کمک می‌کند حرف بزنید." }
      ]
    },
    {
      id: "english-sapling-41", subject: "english", level: "sapling", emoji: "🍂", title: "هوا و فصل‌ها",
      steps: [
        /* One tree through the year: blossom comes in spring, the sun is hot in summer (Sara fans herself), the leaves
           fall in autumn, snow covers the ground in winter. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, tree: { art: "en-tree", at: [52, 88], s: 1 }, sun: { art: "☀️", at: [136, 26], s: 0.9, o: 0.3 }, snow: { art: "en-snow-ground", o: 0 },
            fl1: { art: "🌸", at: [42, 50], s: 0.35, o: 0 }, fl2: { art: "🌸", at: [56, 44], s: 0.35, o: 0 }, fl3: { art: "🌸", at: [60, 56], s: 0.35, o: 0 },
            lf1: { art: "🍂", at: [44, 52], s: 0.4, o: 0 }, lf2: { art: "🍂", at: [58, 46], s: 0.4, o: 0 }, lf3: { art: "🍁", at: [62, 56], s: 0.4, o: 0 },
            f1: { art: "❄️", at: [30, -8], s: 0.45 }, f2: { art: "❄️", at: [80, -14], s: 0.4 }, f3: { art: "❄️", at: [120, -6], s: 0.45 },
            sara: { art: "en-sara", at: [110, 86], s: 1.25 } },
          scenes: [
            { caption: "In spring there are flowers.", key: 1900, do: ["fl1", "fl2", "fl3"].map(function (f, i) { return { id: f, to: { o: 1, s: 0.55 }, at: 300 + i * 500, dur: 500, ease: "back" }; }) },
            { caption: "It's hot in summer.", key: 1800, do: [].concat(["fl1", "fl2", "fl3"].map(function (f) { return { id: f, to: { o: 0 }, dur: 400 }; }),
              [{ id: "sun", to: { o: 1, s: 1.2 }, at: 300, dur: 800 }], pose("sara", "R", [-150, -40], 900, 400), [{ id: "sara.foreR", to: { r: "-30" }, at: 1300, dur: 1600, yoyo: true, times: 6 }]) },
            { caption: "In autumn the leaves fall.", key: 1900, do: [].concat(pose("sara", "R", "down", 0, 400), [{ id: "sun", to: { o: 0.5, s: 0.9 }, dur: 600 }],
              ["lf1", "lf2", "lf3"].map(function (f, i) { return [{ id: f, to: { o: 1 }, at: i * 300, dur: 200 }, { id: f, to: { y: "+32", r: 200 }, at: 300 + i * 300, dur: 2000, ease: "in" }]; }).reduce(function (a, b) { return a.concat(b); }, [])) },
            { caption: "It's cold in winter. It's snowy.", key: 2600, do: [].concat([{ id: "sun", to: { o: 0 }, dur: 500 }, { id: "snow", to: { o: 1 }, at: 1200, dur: 1600 }],
              ["f1", "f2", "f3"].map(function (f, i) { return { id: f, to: { y: "+74", r: 180 }, at: i * 300, dur: 2600, ease: "linear" }; }), pose("sara", "R", "chest", 400, 400), pose("sara", "L", "chest", 400, 400),
              [{ id: "sara", to: { r: 2 }, at: 900, dur: 1400, yoyo: true, times: 8 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "🌸", en: "spring" }, { pic: "☀️", en: "summer" }, { pic: "🍂", en: "autumn" }, { pic: "❄️", en: "winter" }] },
        { type: "listen", say: "It's cold and snowy.", prompt: "گوش کن. کدام فصل؟", options: [{ pic: "🌸", en: "spring" }, { pic: "❄️", en: "winter" }, { pic: "☀️", en: "summer" }], answer: "❄️" },
        { type: "listen", say: "The leaves are yellow and brown. They fall from the trees.", quiet: true, prompt: "گوش کن. کدام فصل؟", options: [{ pic: "🍂", en: "autumn" }, { pic: "☀️", en: "summer" }, { pic: "🌸", en: "spring" }], answer: "🍂" },
        { type: "listen", show: "☀️🏖️", prompt: "کدام جمله با تصویر جور است؟",
          options: [{ label: "It's hot in summer.", en: "It's hot in summer." }, { label: "It's cold in summer.", en: "It's cold in summer." }], answer: "It's hot in summer." },
        { type: "tip", text: "در هر فصل با کودک از پنجره یا در پارک بیرون را نگاه کنید و بگویید It's autumn. The leaves are falling. It's cold today. فصل‌های انگلیسی با فصل‌های ایران یکی است: spring بهار است و Nowruz اول آن." }
      ]
    },
    {
      id: "english-sapling-42", subject: "english", level: "sapling", emoji: "🤒", title: "حالم خوب نیست",
      steps: [
        /* Mum asks Reza what's the matter: his head hurts (hand on his head), he sneezes (a cold), then his tummy
           hurts (hand on it). Mum gives him a glass of water and a hug. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { floor: { art: "room-floor" }, wall: { art: "room-wall", at: [0, 56] }, mum: { art: "en-mother", at: [44, 86] }, reza: { art: "en-reza", at: [110, 86], s: 1.25 },
            water: { art: "💧", at: inHand("en-mother", [44, 86], 1, "R", "point", 0.5), s: 0.5, o: 0 }, ask: { art: "en-ask", at: [52, 36], o: 0 } },
          scenes: [
            { caption: "What's the matter, Reza?", key: 1300, do: [].concat(pose("mum", "R", "ask", 0, 500), talk("mum", 0, 1300), pop("ask", 500)) },
            { caption: "I've got a headache.", key: 1500, do: [].concat([{ id: "ask", to: { o: 0 }, dur: 300 }], pose("mum", "R", "down", 0, 400), pose("reza", "L", [-160, -60], 200, 500), face("reza", false, 200), talk("reza", 300, 1200),
              [{ id: "reza.head", to: { r: -8 }, at: 600, dur: 1200, yoyo: true, times: 2 }]) },
            { caption: "Achoo! I've got a cold, too.", key: 900, do: [].concat(pose("reza", "L", "down", 0, 400), pose("reza", "R", "mouth", 400, 300), [{ id: "reza", to: { y: "+2" }, at: 800, dur: 200, yoyo: true, times: 2 },
              { emit: "drop", where: [104, 50], spread: [8, 4], rise: -4, n: 6, at: 800, dur: 200, life: 600 }], talk("reza", 1200, 1200)) },
            { caption: "And I've got a stomachache.", key: 1500, do: [].concat(pose("reza", "R", [10, 100], 0, 500), [{ id: "reza.foreR", to: { r: "+15" }, at: 600, dur: 1400, yoyo: true, times: 4 }], talk("reza", 0, 1500)) },
            { caption: "Here's some water. Go to bed and rest.", key: 2000, do: [].concat(pose("reza", "R", "down", 0, 400), pose("mum", "R", "point", 0, 500), [{ id: "water", to: { o: 1 }, at: 400, dur: 300 },
              arc("water", inHand("en-mother", [44, 86], 1, "R", "point", 0.5), inHand("en-reza", [110, 86], 1.25, "L", "point", 0.5), 900, 900, 6)], pose("reza", "L", "point", 1400, 400), talk("mum", 0, 2200)) }
          ] },
        { type: "words", show: true, words: [{ pic: "🤕", en: "a headache" }, { pic: "🤧", en: "a cold" }, { pic: "🤢", en: "a stomachache" }, { pic: "🤒", en: "a temperature" }, { pic: "🦷", en: "a toothache" }] },
        { type: "listen", say: "I've got a toothache.", prompt: "گوش کن. کجایش درد می‌کند؟", options: [{ pic: "🦷", en: "toothache" }, { pic: "🤕", en: "headache" }, { pic: "🤢", en: "stomachache" }], answer: "🦷" },
        { type: "listen", say: "What's the matter? I've got a cold.", quiet: true, prompt: "گوش کن. چه شده؟", options: [{ pic: "🤒", en: "a temperature" }, { pic: "🤧", en: "a cold" }, { pic: "🦷", en: "a toothache" }], answer: "🤧" },
        { type: "listen", show: "🤕", prompt: "دوستت سرش درد می‌کند. چه می‌پرسی؟",
          options: [{ label: "What's the matter?", en: "What's the matter?" }, { label: "What's your name?", en: "What's your name?" }, { label: "What time is it?", en: "What time is it?" }], answer: "What's the matter?" },
        { type: "tip", text: "وقتی کودک می‌گوید حالش خوب نیست، اول به فارسی رسیدگی کنید. بعد، در بازی با عروسک‌ها، به انگلیسی بازی «دکتر» کنید: What's the matter? I've got a headache. این کلمه‌ها کمک می‌کنند اگر روزی لازم شد، به انگلیسی بگوید کجایش درد می‌کند." }
      ]
    },
    {
      id: "english-sapling-43", subject: "english", level: "sapling", emoji: "🎨", title: "ورزش و سرگرمی",
      steps: [
        /* What the children like doing, each one doing it: Arman playing football, Mina painting a heart on paper, Sara
           reading. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, ball: { art: "en-ball", at: [40, 86], s: 1.6 }, arman: { art: "en-arman", at: [26, 86], s: 1.2 },
            paper: { art: "en-frame", at: [66, 44], sx: 0.5, sy: 0.4 }, flower: { art: "en-heart", at: [77.5, 54], s: 1.2, o: 0 }, mina: { art: "en-mina", at: [104, 86], s: 1.2 },
            sara: { art: "en-sara", at: [138, 86], s: 1.2 }, book: { art: "📖", at: inHand("en-sara", [138, 86], 1.2, "L", "ask", 0.6), s: 0.6, o: 0 } },
          scenes: [
            { caption: "Arman likes playing football.", key: 1500, do: [{ id: "arman.legR", to: { r: -35 }, at: 600, dur: 300, yoyo: true, times: 2 }, { id: "ball", path: "M40 86Q52 50 62 86", at: 900, dur: 1000 }] },
            { caption: "Mina likes painting.", key: 2400, do: [].concat(pose("mina", "L", [-110, -30], 0, 500), [{ id: "mina.foreL", to: { r: "+15" }, at: 600, dur: 2400, yoyo: true, times: 8 },
              { id: "flower", to: { o: 1 }, at: 700, dur: 2000 }, { id: "flower", draw: true, at: 700, dur: 2000 }]) },
            { caption: "Sara likes reading.", key: 1500, do: [].concat(pose("sara", "L", "ask", 0, 400), [{ id: "book", to: { o: 1 }, at: 300, dur: 200 }, { id: "sara.eyes", to: { x: -0.4, y: 0.7 }, at: 300, dur: 300 }, { id: "book", to: { r: 6 }, at: 600, dur: 1600, yoyo: true, times: 2 }]) },
            { caption: "What do you like doing?", key: 1200, hold: 5600, do: [].concat(talk("sara", 0, 1400), pose("sara", "R", "ask", 0, 500)) }
          ] },
        { type: "words", show: true, words: [{ pic: "⚽", en: "football" }, { pic: "🏊", en: "swimming" }, { pic: "🎨", en: "painting" }, { pic: "📖", en: "reading" }, { pic: "🚲", en: "cycling" }, { pic: "🎵", en: "singing" }] },
        { type: "listen", say: "I like swimming.", prompt: "گوش کن. چه کاری دوست دارد؟", options: [{ pic: "🎨", en: "painting" }, { pic: "🏊", en: "swimming" }, { pic: "⚽", en: "football" }], answer: "🏊" },
        { type: "listen", say: "She likes painting.", quiet: true, prompt: "گوش کن. چه کاری دوست دارد؟", options: [{ pic: "🎨", en: "painting" }, { pic: "📖", en: "reading" }, { pic: "🚲", en: "cycling" }], answer: "🎨" },
        { type: "listen", show: "⚽", prompt: "کدام جمله درست است؟", options: [{ label: "I like playing football.", en: "I like playing football." }, { label: "I like play football.", en: "I like play football." }], answer: "I like playing football." },
        { type: "tip", text: "از کودک بپرسید What do you like doing? و کمکش کنید با ing جواب بدهد: I like drawing. I like playing football. درباره سرگرمی‌های اعضای خانواده هم بگویید: Grandpa likes reading. Mum likes cooking." }
      ]
    },
    {
      id: "english-sapling-44", subject: "english", level: "sapling", emoji: "🛒", title: "در مغازه",
      steps: [
        /* At the fruit shop: Mina asks for two apples, the shopkeeper puts them on the counter, she asks the price, pays
           with a coin and says thank you. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#fdf0d5",
          parts: { kitchen: { art: "en-kitchen" }, keeper: { art: "en-grandpa", at: [124, 80], s: 1.05 }, mina: { art: "en-mina", at: [36, 78], s: 1.1 },
            counter: { art: "en-table", at: [80, 90], s: 1.4 }, a1: { art: "🍎", at: [100, 61], s: 0.55 }, a2: { art: "🍎", at: [107, 61], s: 0.55 }, a3: { art: "🍎", at: [114, 61], s: 0.55 },
            coin: { art: "🪙", at: inHand("en-mina", [36, 78], 1.1, "R", "point", 0.4), s: 0.4, o: 0 } },
          scenes: [
            { caption: "Hello! Can I have two apples, please?", key: 1500, do: [].concat(wave("mina", "R", 0, 1000), pose("mina", "R", "point", 1200, 400), talk("mina", 0, 2600)) },
            { caption: "Yes. Here you are.", key: 2200, do: [].concat(pose("mina", "R", "down", 0, 400), pose("keeper", "L", "point", 0, 500), talk("keeper", 0, 1200),
              [arc("a1", [100, 61], [60, 61], 500, 900, 8), arc("a2", [107, 61], [68, 61], 900, 900, 8)], pose("keeper", "L", "down", 2000, 400)) },
            { caption: "How much is it?", key: 1200, do: [].concat(pose("mina", "R", "ask", 0, 500), talk("mina", 0, 1000)) },
            { caption: "It's ten thousand tomans.", key: 1400, do: [].concat(pose("mina", "R", "down", 0, 400), talk("keeper", 0, 1600), pose("keeper", "L", "ask", 0, 500)) },
            { caption: "Here you are. Thank you!", key: 1800, do: [].concat(pose("keeper", "L", "down", 0, 400), pose("mina", "R", "point", 0, 500), [{ id: "coin", to: { o: 1 }, at: 400, dur: 200 },
              arc("coin", inHand("en-mina", [36, 78], 1.1, "R", "point", 0.4), [104, 60], 700, 900, 8)], talk("mina", 0, 1800), nod("mina", 1200)) }
          ] },
        { type: "listen", say: "Can I have three bananas, please?", prompt: "گوش کن. چه می‌خواهد؟", options: [{ pic: "🍌🍌🍌", en: "three bananas" }, { pic: "🍎🍎🍎", en: "three apples" }, { pic: "🍌", en: "a banana" }], answer: "🍌🍌🍌" },
        { type: "listen", say: "How much is it?", quiet: true, prompt: "گوش کن. چه می‌پرسد؟", options: [{ pic: "💰", en: "the price", value: "price" }, { pic: "⏰", en: "the time", value: "time" }, { pic: "📍", en: "the place", value: "place" }], answer: "price" },
        { type: "listen", show: "🛒", prompt: "فروشنده می‌گوید Here you are. تو چه می‌گویی؟",
          options: [{ label: "Thank you!", en: "Thank you!" }, { label: "How old are you?", en: "How old are you?" }, { label: "Good night!", en: "Good night!" }], answer: "Thank you!" },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Can I have some bread, please?", items: ["Can", "I", "have", "some", "bread,", "please?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "How much is it?", items: ["How", "much", "is", "it?"] },
        { type: "tip", text: "بازی «مغازه» کنید: چند میوه و خوراکی روی میز بچینید و با پول اسباب‌بازی بخرید و بفروشید. کودک بگوید Can I have two apples, please? How much is it? و شما جواب بدهید Here you are. It's five tomans. بعد جایتان عوض شود." }
      ]
    },
    {
      id: "english-sapling-45", subject: "english", level: "sapling", emoji: "🎲", title: "بازی کلمه‌های نهال",
      steps: [
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. هر کدام را در سبد درست بگذار: شهر، شغل یا فصل.",
          baskets: [{ pic: "🏙️", value: "town" }, { pic: "👷", value: "job" }, { pic: "🗓️", value: "season" }],
          items: [{ pic: "🏥", say: "hospital", basket: "town" }, { pic: "🧑‍🌾", say: "farmer", basket: "job" }, { pic: "🍂", say: "autumn", basket: "season" },
            { pic: "📚", say: "library", basket: "town" }, { pic: "👩‍⚕️", say: "doctor", basket: "job" }, { pic: "❄️", say: "winter", basket: "season" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🤕", say: "headache" }, { pic: "🤕", say: "headache" }], [{ pic: "🎨", say: "painting" }, { pic: "🎨", say: "painting" }],
            [{ pic: "🚿", say: "shower" }, { pic: "🚿", say: "shower" }], [{ pic: "🛋️", say: "sofa" }, { pic: "🛋️", say: "sofa" }]] },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن",
          pairs: [["Monday", "1️⃣"], ["summer", "☀️"], ["half past two", "🕝"], ["glasses", "👓"]] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. ورزش و سرگرمی است یا جایی در خانه؟",
          baskets: [{ pic: "⚽", value: "hobby" }, { pic: "🏠", value: "home" }],
          items: [{ pic: "🏊", say: "swimming", basket: "hobby" }, { pic: "🍳", say: "kitchen", basket: "home" }, { pic: "📖", say: "reading", basket: "hobby" },
            { pic: "🌳", say: "garden", basket: "home" }, { pic: "🎵", say: "singing", basket: "hobby" }, { pic: "🛏️", say: "bedroom", basket: "home" }] },
        { type: "tip", text: "این بازی کلمه‌های نهال را مرور می‌کند. بازی «۲۰ سؤال» را با این کلمه‌ها بازی کنید: یکی چیزی در ذهنش بگیرد (a doctor، the library) و بقیه با سؤال‌های بله و نه حدس بزنند: Is it a job? Is it in the town?" }
      ]
    },
    {
      id: "english-sapling-46", subject: "english", level: "sapling", emoji: "🎧", title: "گفت‌وگو را گوش کن",
      steps: [
        { type: "listen", say: "Where's my ball, Mum? It's under your bed, Reza.", prompt: "به گفت‌وگو گوش کن. توپ کجاست؟",
          options: [{ pic: "⚽", ref: "🛏️", where: "on" }, { pic: "⚽", ref: "🛏️", where: "under" }, { pic: "⚽", ref: "📦", where: "in" }], answer: "under" },
        { type: "listen", say: "What's your sister doing? She's painting a picture.", quiet: true, prompt: "به گفت‌وگو گوش کن. خواهرش چه کار می‌کند؟",
          options: [{ pic: "📖", en: "reading" }, { pic: "🎨", en: "painting" }, { pic: "🏊", en: "swimming" }], answer: "🎨" },
        { type: "listen", say: "What time is it? It's half past three.", quiet: true, prompt: "به گفت‌وگو گوش کن. ساعت چند است؟",
          options: [{ pic: "🕒", en: "three o'clock" }, { pic: "🕞", en: "half past three" }, { pic: "🕥", en: "half past ten" }], answer: "🕞" },
        { type: "listen", say: "Does your dad work in a hospital? Yes, he does. He's a doctor.", quiet: true, prompt: "به گفت‌وگو گوش کن. پدرش چه کاره است؟",
          options: [{ pic: "🧑‍🌾", en: "farmer" }, { pic: "🧑‍🍳", en: "cook" }, { pic: "👨‍⚕️", en: "doctor" }], answer: "👨‍⚕️" },
        { type: "listen", say: "Can I have an orange, please? Sorry, we haven't got oranges. Have a banana!", quiet: true, prompt: "به گفت‌وگو گوش کن. آخرش چه گرفت؟",
          options: [{ pic: "🍊", en: "an orange" }, { pic: "🍌", en: "a banana" }, { pic: "🍎", en: "an apple" }], answer: "🍌" },
        { type: "listen", say: "Is it cold today? No, it isn't. It's sunny and hot.", quiet: true, prompt: "به گفت‌وگو گوش کن. هوا چطور است؟",
          options: [{ pic: "❄️", en: "cold" }, { pic: "🌧️", en: "rainy" }, { pic: "☀️", en: "sunny" }], answer: "☀️" },
        { type: "tip", text: "در این تمرین‌ها جواب معمولاً در آخر گفت‌وگو است. کودک می‌تواند دکمه گوش کن را چند بار بزند؛ این کار عیب نیست. خودتان هم گفت‌وگوهای کوتاه بسازید و با دو صدا بازی کنید: «یکی می‌پرسد، یکی جواب می‌دهد»." }
      ]
    },
    {
      id: "english-sapling-47", subject: "english", level: "sapling", emoji: "🐪", title: "متن اطلاعاتی",
      steps: [
        { type: "passage", prompt: "این متن را بخوان",
          text: "Camels live in the desert. They are big and tall. Camels can walk for a long time without water. They have got long legs and big feet, so they can walk on the sand.",
          question: "شترها کجا زندگی می‌کنند؟", options: ["🏜️", "🌊", "🌳"], answer: "🏜️" },
        { type: "passage", prompt: "متن را دوباره بخوان و جواب بده",
          text: "Camels live in the desert. They are big and tall. Camels can walk for a long time without water. They have got long legs and big feet, so they can walk on the sand.",
          question: "چرا شترها می‌توانند روی شن راه بروند؟", options: ["پاهای بزرگ دارند", "بال دارند", "کوچک‌اند"], answer: "پاهای بزرگ دارند" },
        { type: "passage", prompt: "این متن تازه است. آن را بخوان",
          text: "Our school is next to the park. There are ten classrooms and a library. We start at eight o'clock. At ten we play in the playground. School finishes at one.",
          question: "مدرسه ساعت چند شروع می‌شود؟", options: ["🕗", "🕙", "🕐"], answer: "🕗" },
        { type: "passage", prompt: "متن را دوباره بخوان و جواب بده",
          text: "Our school is next to the park. There are ten classrooms and a library. We start at eight o'clock. At ten we play in the playground. School finishes at one.",
          question: "مدرسه کنار کجاست؟", options: ["🏥", "🌳", "🏪"], answer: "🌳" },
        { type: "tip", text: "متن‌های اطلاعاتی برای فهمیدن چیزهای تازه‌اند. قبل از خواندن، سؤال را با هم بخوانید تا کودک بداند دنبال چه بگردد. بعد از خواندن، بپرسید «چه چیز تازه‌ای یاد گرفتی؟» تا به فارسی یا انگلیسی بگوید." }
      ]
    },
    {
      id: "english-sapling-48", subject: "english", level: "sapling", emoji: "👒", title: "قصه: کلاه گم‌شده",
      steps: [
        /* The wind blows Sara's hat off and up into a tree; she can't reach it; Reza climbs the ladder and brings it
           down; they laugh. */
        { type: "scene", prompt: "به قصه گوش کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, tree: { art: "en-tree", at: [118, 88], s: 1.2 }, ladder: { art: "en-ladder", at: [102, 88], s: 0.8, o: 0 },
            sara: { art: "en-sara", at: [40, 86], s: 1.2 }, hat: { art: "👒", at: [40.4, 54.5], s: 0.9 }, reza: { art: "en-reza", at: [-20, 86], s: 1.1 },
            l1: { art: "🍃", at: [-10, 40], s: 0.4 } },
          scenes: [
            { caption: "Sara has got a new yellow hat.", key: 1300, do: [].concat(pose("sara", "R", "pointUp", 0, 500), face("sara", true, 0)) },
            { caption: "Whoosh! The wind blows the hat into the tree.", key: 1800, do: [].concat(pose("sara", "R", "down", 0, 400), [{ id: "l1", path: "M-10 40Q60 20 130 34T200 28", dur: 2000 },
              { id: "hat", path: "M40.4 54.5Q70 20 100 38", at: 300, dur: 1600 }, { id: "hat", to: { r: 360 }, at: 300, dur: 1600 }], face("sara", false, 1400)) },
            { caption: "Sara can't get it. The tree is too tall.", key: 2200, do: [].concat(walk("sara", 92, 0, 1400), pose("sara", "R", "stretch", 1500, 400), [{ id: "sara", to: { y: "-4" }, at: 1900, dur: 500, yoyo: true, times: 4 }]) },
            { caption: "Reza has got a ladder. He climbs up.", key: 3000, hold: 5000, do: [].concat(pose("sara", "R", "down", 0, 400), walk("sara", 70, 0, 800), [{ id: "ladder", to: { o: 1 }, at: 300, dur: 400 }], walk("reza", 102, 300, 1600),
              [{ id: "reza", to: { y: 62 }, at: 2100, dur: 1400 }, { id: "reza.armR", to: { r: -150 }, at: 2100, dur: 700, yoyo: true, times: 2 }, { id: "reza.armL", to: { r: 150 }, at: 2450, dur: 700, yoyo: true, times: 2 }]) },
            { caption: "Here's your hat, Sara!", key: 2500, hold: 3600, do: [].concat(pose("reza", "R", "hold", 0, 500), [{ id: "hat", to: { x: 106, y: 30 }, at: 400, dur: 500 }, { id: "reza", to: { y: 86 }, at: 1000, dur: 1200 }],
              pose("reza", "R", "down", 1000, 400), pose("reza", "L", "point", 1000, 600), [{ id: "hat", to: { x: RHAND[0], y: RHAND[1] }, at: 1000, dur: 1200 }],
              talk("reza", 1400, 1400), pose("reza", "L", "down", 2800, 400), [arc("hat", RHAND, [70.4, 54.5], 2800, 700, 10)]) },
            { caption: "Thank you, Reza! They laugh.", key: 900, do: [].concat(face("sara", true, 0), jump("sara", 300, 2, 5), jump("reza", 300, 2, 5), [{ id: "hat", to: { y: "-5" }, at: 300, dur: 1300, yoyo: true, times: 4 }]) }
          ] },
        { type: "passage", prompt: "حالا قصه را بخوان",
          text: "Sara has got a new yellow hat. She likes it a lot. One day she is in the park. Whoosh! The wind blows the hat into a tall tree. Sara can't get it. She is sad.",
          question: "کلاه کجا رفت؟", options: ["🌳", "🌊", "🏠"], answer: "🌳" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "Then her friend Reza comes. He has got a ladder. He climbs up the ladder and gets the hat. \"Here's your hat, Sara!\" he says. \"Thank you, Reza!\" says Sara, and they laugh.",
          question: "رضا با چه چیزی بالا رفت؟", options: ["🪜", "🚲", "🪁"], answer: "🪜" },
        { type: "passage", prompt: "همه قصه را یک بار دیگر بخوان",
          text: "Sara has got a new yellow hat. She likes it a lot. One day she is in the park. Whoosh! The wind blows the hat into a tall tree. Sara can't get it. She is sad.",
          question: "سارا اول چه حالی داشت، وقتی کلاه رفت؟", options: ["😢", "😊", "😴"], answer: "😢" },
        { type: "tip", text: "قصه را با هم بخوانید و بعد کودک آن را با کلمه‌های خودش، به فارسی یا انگلیسی، تعریف کند. بپرسید «اگر رضا نبود، سارا چه کار می‌کرد؟» تا درباره قصه فکر کند. می‌تواند نقاشی سه صحنه قصه را بکشد و زیرش یک جمله بنویسد." }
      ]
    },
    {
      id: "english-sapling-49", subject: "english", level: "sapling", emoji: "📢", title: "روان بخوان",
      steps: [
        { type: "readaloud", pic: "🐪", text: "Camels live in the desert. They are big and tall. Camels can walk for a long time without water. They have got long legs and big feet." },
        { type: "passage", prompt: "یک بار دیگر بخوان و جواب بده",
          text: "Camels live in the desert. They are big and tall. Camels can walk for a long time without water. They have got long legs and big feet.",
          question: "شترها چه پاهایی دارند؟", options: ["پاهای بلند", "پاهای کوتاه"], answer: "پاهای بلند" },
        { type: "readaloud", pic: "👒", text: "Sara has got a new yellow hat. One day the wind blows the hat into a tall tree. Her friend Reza climbs up a ladder and gets the hat for her." },
        { type: "passage", prompt: "یک بار دیگر بخوان و جواب بده",
          text: "Sara has got a new yellow hat. One day the wind blows the hat into a tall tree. Her friend Reza climbs up a ladder and gets the hat for her.",
          question: "چه کسی کلاه را آورد؟", options: ["رضا", "سارا", "باد"], answer: "رضا" },
        { type: "tip", text: "روان خواندن یعنی درست، بدون گیر و با حالت. اول کودک بخواند و شما کلمه‌های سخت را علامت بزنید، بعد با هم تمرینشان کنید و کودک دوباره بخواند. خواندن دوباره یک متن آشنا عیب نیست؛ بهترین راه روان شدن است." }
      ]
    },
    {
      id: "english-sapling-50", subject: "english", level: "sapling", emoji: "🙋", title: "درباره من بنویس",
      steps: [
        { type: "order", prompt: "این نمونه را ببین. کلمه‌های جمله اول را به ترتیب بچین", ltr: true, say: "My name is Mina.", items: ["My", "name", "is", "Mina."] },
        { type: "order", prompt: "جمله دوم", ltr: true, say: "I am eight years old.", items: ["I", "am", "eight", "years", "old."] },
        { type: "order", prompt: "جمله سوم", ltr: true, say: "I have got a brother and a sister.", items: ["I", "have", "got", "a", "brother", "and", "a", "sister."] },
        { type: "order", prompt: "جمله چهارم", ltr: true, say: "I like painting and swimming.", items: ["I", "like", "painting", "and", "swimming."] },
        { type: "paper", text: "حالا درباره خودت بنویس: اسمت، سنت، خانواده‌ات و چیزی که دوست داری. از نمونه کمک بگیر.",
          example: "My name is Mina. I am eight years old. I have got a brother and a sister. I like painting and swimming.",
          check: ["سه یا چهار جمله نوشته؟", "هر جمله با حرف بزرگ شروع شده و نقطه دارد؟", "اسمش با حرف بزرگ نوشته شده؟", "یک بار and به کار برده؟"] },
        { type: "tip", text: "نوشتن درباره خود، بهترین شروع است. اول با هم بگویید چه می‌خواهد بنویسد، بعد بنویسد. لازم نیست همه کلمه‌ها درست نوشته شوند؛ اول از جمله‌ها تعریف کنید و بعد فقط یکی دو چیز را با هم درست کنید. این نوشته را نگه دارید تا بعدها پیشرفتش را ببینید." }
      ]
    },
    {
      id: "english-sapling-51", subject: "english", level: "sapling", emoji: "🖼️", title: "درباره تصویر بنویس",
      steps: [
        { type: "listen", show: "🌳🐦🐦👦⚽", prompt: "به تصویر نگاه کن. کدام جمله درباره آن است؟",
          options: [{ label: "There are two birds in the tree.", en: "There are two birds in the tree." }, { label: "There are three cats.", en: "There are three cats." }], answer: "There are two birds in the tree." },
        { type: "listen", show: "🌳🐦🐦👦⚽", quiet: true, prompt: "یک جمله دیگر: پسر چه کار می‌کند؟",
          options: [{ label: "The boy is playing football.", en: "The boy is playing football." }, { label: "The boy is sleeping.", en: "The boy is sleeping." }], answer: "The boy is playing football." },
        { type: "listen", show: "🌳🐦🐦👦⚽☀️", quiet: true, prompt: "و هوا؟",
          options: [{ label: "It's snowy.", en: "It's snowy." }, { label: "It's sunny.", en: "It's sunny." }], answer: "It's sunny." },
        { type: "paper", text: "حالا سه جمله درباره این تصویر بنویس: 🌳🐦🐦👦⚽☀️",
          example: "There are two birds in the tree. The boy is playing football. It's sunny.",
          check: ["سه جمله نوشته؟", "یک جمله با There is یا There are دارد؟", "هر جمله نقطه دارد؟"] },
        { type: "paper", text: "یک تصویر از کتاب یا عکس‌های خانوادگی پیدا کن و سه جمله درباره‌اش بنویس.", lang: "en",
          check: ["سه جمله نوشته؟", "جمله‌ها درباره همان تصویرند؟", "حرف بزرگ و نقطه را رعایت کرده؟"] },
        { type: "tip", text: "برای نوشتن درباره تصویر، این سه سؤال کمک می‌کند: What can you see? (There is / There are …) What are they doing? (The boy is …) What's the weather like? با هم تصویر را نگاه کنید و اول جواب‌ها را بگویید، بعد بنویسید." }
      ]
    },
    {
      id: "english-sapling-52", subject: "english", level: "sapling", emoji: "❓", title: "کلمه‌های پرسشی",
      steps: [
        /* Arman asks Sara questions at her birthday party and each answer is shown: who (Grandma waves), what (the
           present is a kite), where (in the garden), when (today), how many (seven candles), how old (seven). */
        { type: "scene", prompt: "گوش کن و جواب را ببین", bg: "#cfeaf7",
          parts: { garden: { art: "en-garden" }, table: { art: "en-table", at: [80, 90], s: 0.9 }, cake: { art: "en-cake", at: [80, 71.1], s: 1.1 },
            gran: { art: "en-grandma", at: [140, 86], o: 0 }, kite: { art: "🪁", at: inHand("en-sara", [40, 86], 1.2, "R", "hold", 1.1), s: 1.1, o: 0 },
            sara: { art: "en-sara", at: [40, 86], s: 1.2 }, arman: { art: "en-arman", at: [110, 86], s: 1.15 } },
          scenes: [
            { caption: "Who's that? That's my grandma.", key: 2200, do: [].concat(pose("arman", "R", "point", 0, 500), talk("arman", 0, 900), [{ id: "gran", to: { o: 1 }, at: 600, dur: 400 }], wave("gran", "L", 1100, 1400), talk("sara", 1300, 1200)) },
            { caption: "What's your present? It's a kite!", key: 2400, do: [].concat(pose("arman", "R", "down", 0, 400), talk("arman", 0, 1000), pose("sara", "R", "hold", 1000, 500), [{ id: "kite", to: { o: 1 }, at: 1400, dur: 300 }], talk("sara", 1300, 900)) },
            { caption: "When's your party? It's today!", key: 1800, do: [].concat(talk("arman", 0, 1000), jump("sara", 1300, 1, 5), talk("sara", 1300, 800)) },
            { caption: "How many candles are there? Seven.", key: 3200, hold: 4400, do: [].concat(talk("arman", 0, 1400), [1, 2, 3, 4, 5, 6].map(function (n) { return { id: "cake.c" + n, to: { o: 1 }, at: 1400 + n * 250, dur: 200 }; }),
              [{ emit: "spark", where: [80, 48], spread: [24, 4], n: 4, at: 3100, dur: 200, life: 800 }], talk("sara", 3000, 600)) },
            { caption: "How old are you? I'm seven.", key: 1600, do: [].concat(talk("arman", 0, 1000), talk("sara", 1100, 900), face("sara", true, 1100)) }
          ] },
        { type: "listen", say: "Where's the cat? It's in the garden.", prompt: "گوش کن. سؤال با کدام کلمه بود؟", options: [{ label: "Who", en: "Who" }, { label: "Where", en: "Where" }, { label: "When", en: "When" }], answer: "Where" },
        { type: "listen", say: "Who is your teacher?", quiet: true, prompt: "گوش کن. کدام جواب مال این سؤال است؟",
          options: [{ label: "It's Mrs Karimi.", en: "It's Mrs Karimi." }, { label: "It's at nine.", en: "It's at nine." }, { label: "It's red.", en: "It's red." }], answer: "It's Mrs Karimi." },
        { type: "listen", say: "When do you get up?", quiet: true, prompt: "گوش کن. کدام جواب مال این سؤال است؟",
          options: [{ label: "In the kitchen.", en: "In the kitchen." }, { label: "At seven o'clock.", en: "At seven o'clock." }, { label: "My mum.", en: "My mum." }], answer: "At seven o'clock." },
        { type: "pairs", prompt: "هر سؤال را با جوابش جفت کن",
          pairs: [["How many cats?", "Two cats."], ["How old is he?", "He's nine."], ["What colour is it?", "It's green."], ["Where is Dad?", "In the car."]] },
        { type: "tip", text: "بازی «سؤال پیچ» کنید: هر کس با یک کلمه پرسشی (Who، What، Where، When، How many، How old) یک سؤال بپرسد و دیگری با جمله کامل جواب بدهد. اگر جواب فقط یک کلمه بود، کمک کنید کاملش کند: Where's Dad? → He's in the car." }
      ]
    },
    {
      id: "english-sapling-53", subject: "english", level: "sapling", emoji: "🤝", title: "آشنا شدن",
      steps: [
        /* Sara introduces her new friend Arman to Mina: they wave, shake hands (their hands meet), and say where they
           are from. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sara: { art: "en-sara", at: [30, 86], s: 1.2 }, arman: { art: "en-arman", at: [68, 86], s: 1.2 }, mina: { art: "en-mina", at: [128, 86], s: 1.2 } },
          scenes: [
            { caption: "Mina, this is my friend Arman.", key: 1300, do: [].concat(pose("sara", "R", "point", 0, 500), talk("sara", 0, 1800)) },
            { caption: "Hello, Arman. Nice to meet you.", key: 2200, do: [].concat(pose("sara", "R", "down", 0, 400),
              walk("mina", 108, 300, 900), walk("arman", 86, 300, 900), pose("mina", "L", "point", 1300, 500), pose("arman", "R", "point", 1300, 500), talk("mina", 0, 1800),
              [{ id: "mina.foreL", to: { r: "+12" }, at: 1900, dur: 900, yoyo: true, times: 4 }, { id: "arman.foreR", to: { r: "-12" }, at: 1900, dur: 900, yoyo: true, times: 4 }]) },
            { caption: "Nice to meet you, too. Where are you from?", key: 1600, do: [].concat(pose("mina", "L", "down", 0, 400), pose("arman", "R", "down", 0, 400), talk("arman", 0, 2600), pose("arman", "R", "ask", 1600, 400)) },
            { caption: "I'm from Tabriz. And you?", key: 1200, do: [].concat(pose("arman", "R", "down", 0, 300), pose("mina", "L", "chest", 0, 500), talk("mina", 0, 1600)) },
            { caption: "I'm from Shiraz.", key: 1200, do: [].concat(pose("mina", "L", "down", 0, 300), pose("arman", "R", "chest", 0, 500), talk("arman", 0, 1100), face("arman", true, 0)) }
          ] },
        { type: "listen", say: "This is my friend.", prompt: "گوش کن. چه کار می‌کند؟", options: [{ pic: "👋", en: "saying goodbye", value: "bye" }, { pic: "🙋‍♀️👦", en: "introducing a friend", value: "friend" }], answer: "friend" },
        { type: "listen", show: "🤝", prompt: "کسی را برای اولین بار می‌بینی. چه می‌گویی؟",
          options: [{ label: "Nice to meet you.", en: "Nice to meet you." }, { label: "Good night.", en: "Good night." }, { label: "Here you are.", en: "Here you are." }], answer: "Nice to meet you." },
        { type: "listen", say: "Where are you from?", quiet: true, prompt: "گوش کن. کدام جواب درست است؟",
          options: [{ label: "I'm from Iran.", en: "I'm from Iran." }, { label: "I'm eight.", en: "I'm eight." }, { label: "I'm fine.", en: "I'm fine." }], answer: "I'm from Iran." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Where are you from?", items: ["Where", "are", "you", "from?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "This is my friend Arman.", items: ["This", "is", "my", "friend", "Arman."] },
        { type: "tip", text: "آشنا شدن را بازی کنید: کودک یک عروسک یا عضو خانواده را به شما معرفی کند: This is my friend … . شما بگویید Nice to meet you. Where are you from? و او جواب بدهد I'm from Iran. یا اسم شهرش را بگوید. اسم شهرها به انگلیسی همان اسم فارسی است." }
      ]
    },
    {
      id: "english-sapling-54", subject: "english", level: "sapling", emoji: "🎧", title: "دیکته جمله",
      steps: [
        { type: "build", hidden: true, prompt: "گوش کن و جمله را با کلمه‌ها بساز", word: "The cat is under the bed.", parts: ["The", "cat", "is", "under", "the", "bed."], extra: ["on"], pic: "🐱🛏️" },
        { type: "build", hidden: true, prompt: "گوش کن و جمله را با کلمه‌ها بساز", word: "She likes swimming.", parts: ["She", "likes", "swimming."], extra: ["like"], pic: "🏊" },
        { type: "build", hidden: true, prompt: "گوش کن و کلمه را بساز", word: "boxes", parts: ["box", "es"], extra: ["s"], pic: "📦📦" },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Can you ride a bike?", items: ["Can", "you", "ride", "a", "bike?"] },
        { type: "paper", text: "بزرگ‌ترت یک جمله را دو بار بلند می‌گوید. آن را در دفترت بنویس.", lang: "en",
          note: "یکی از این جمله‌ها را آرام و دو بار بگویید: I get up at seven. There are two cats. We are playing in the park.",
          check: ["همه کلمه‌ها را نوشته؟", "اول جمله حرف بزرگ و آخرش نقطه دارد؟", "بین کلمه‌ها فاصله گذاشته؟"] },
        { type: "tip", text: "دیکته جمله را کوتاه و آرام بگویید، دو بار. کودک اول جمله را با صدای بلند تکرار کند تا مطمئن شود درست شنیده، بعد بنویسد. بعد با هم جمله نوشته‌شده را با نمونه مقایسه کنید و کودک خودش اشکال‌ها را پیدا کند." }
      ]
    },
    {
      id: "english-sapling-55", subject: "english", level: "sapling", emoji: "✍️", title: "کلمه‌های سخت‌نویس",
      steps: [
        { type: "build", prompt: "گوش کن و کلمه را بساز. این کلمه‌ها را باید از رویشان یاد گرفت.", word: "friend", parts: ["f", "r", "ie", "n", "d"], extra: ["e"], pic: "👫" },
        { type: "build", prompt: "گوش کن و کلمه را بساز", word: "school", parts: ["s", "ch", "oo", "l"], extra: ["k"], pic: "🏫" },
        { type: "build", prompt: "گوش کن و کلمه را بساز", word: "because", parts: ["be", "cau", "se"], extra: ["cos"] },
        { type: "build", prompt: "گوش کن و کلمه را بساز", word: "people", parts: ["peo", "ple"], extra: ["pee"], pic: "👨‍👩‍👧‍👦" },
        { type: "pairs", prompt: "هر کلمه را با شکل درستش جفت کن",
          pairs: [[{ label: "frend" }, { label: "friend", say: "friend" }], [{ label: "skool" }, { label: "school", say: "school" }], [{ label: "laf" }, { label: "laugh", say: "laugh" }], [{ label: "cud" }, { label: "could", say: "could" }]] },
        { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن", pairs: [["friend", "👫"], ["laugh", "😂"], ["school", "🏫"], ["people", "👨‍👩‍👧‍👦"]] },
        { type: "tip", text: "کلمه‌هایی مثل because، friend، school، people، could، would و laugh را صدا به صدا نمی‌شود درست نوشت. روش «ببین، بپوشان، بنویس، مقایسه کن» کمک می‌کند: کلمه را نگاه کند، بپوشاند، بنویسد، و بعد با نمونه مقایسه کند. هر روز یکی دو کلمه کافی است." }
      ]
    },
    {
      id: "english-sapling-56", subject: "english", level: "sapling", emoji: "🎉", title: "کارت تولد",
      steps: [
        { type: "listen", show: "🎂", prompt: "کارت تولد چطور شروع می‌شود؟",
          options: [{ label: "Dear Mina,", en: "Dear Mina," }, { label: "Goodbye Mina.", en: "Goodbye Mina." }], answer: "Dear Mina," },
        { type: "listen", show: "🎂", quiet: true, prompt: "وسط کارت چه می‌نویسیم؟",
          options: [{ label: "Happy birthday!", en: "Happy birthday!" }, { label: "Good morning!", en: "Good morning!" }, { label: "What's the matter?", en: "What's the matter?" }], answer: "Happy birthday!" },
        { type: "listen", show: "💌", quiet: true, prompt: "آخر کارت قبل از اسم خودمان چه می‌نویسیم؟",
          options: [{ label: "Love,", en: "Love," }, { label: "Dear,", en: "Dear," }, { label: "Hello,", en: "Hello," }], answer: "Love," },
        { type: "listen", show: "🎁", quiet: true, prompt: "کدام جمله برای کارت تولد خوب است؟",
          options: [{ label: "I hope you have a lovely day!", en: "I hope you have a lovely day!" }, { label: "I've got a headache.", en: "I've got a headache." }], answer: "I hope you have a lovely day!" },
        { type: "paper", text: "برای یکی از دوستانت یا اعضای خانواده یک کارت تولد بنویس و نقاشی بکش.",
          example: "Dear Mina,\nHappy birthday! I hope you have a lovely day. Here is a picture of a cat for you.\nLove,\nSara",
          check: ["با Dear و اسم شروع کرده؟", "Happy birthday نوشته؟", "یک جمله از خودش نوشته؟", "آخرش Love و اسم خودش را نوشته؟"] },
        { type: "tip", text: "کارت نوشتن، نوشتن را واقعی می‌کند: کارت را واقعاً به کسی بدهید! بخش‌های کارت را با هم نگاه کنید: Dear …، پیام، Love و اسم. کودک می‌تواند برای نوروز هم کارت بنویسد: Happy Nowruz!" }
      ]
    },
    {
      id: "english-sapling-57", subject: "english", level: "sapling", emoji: "🐕", title: "قصه شنیدنی",
      steps: [
        /* A story to listen to: Reza's dog runs off after a cat in the park; Reza looks for him by the pond, behind
           the tree and under the bench; the dog comes back with Reza's ball. */
        { type: "scene", prompt: "به قصه گوش کن. بعد تصویرها را به ترتیب می‌چینی.", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, pond: { art: "en-pond", at: [36, 76] }, tree: { art: "en-tree", at: [130, 88], s: 1 }, cat: { art: "en-cat", at: [70, 88], s: 1.1, o: 0 },
            dog: { art: "en-dog", at: [90, 88], s: 1 }, ball: { art: "en-ball", at: [30, 86], s: 1.4, o: 0 }, reza: { art: "en-reza", at: [100, 86], s: 1.1 } },
          scenes: [
            { caption: "Reza and his dog are in the park.", key: 1200, do: [{ id: "dog.tail", to: { r: -25 }, dur: 1600, yoyo: true, times: 6 }] },
            { caption: "The dog sees a cat and runs away!", key: 1800, do: [].concat([{ id: "cat", to: { o: 1 }, dur: 300 }, { id: "cat", to: { x: 200 }, at: 700, dur: 1800, ease: "in" }, { id: "dog", to: { flip: 1 }, at: 400, dur: 1 }], trot("dog", 210, 900, 1700)) },
            { caption: "Reza looks for him. Is he by the pond? No.", key: 2000, do: [].concat(walk("reza", 64, 0, 1400), [{ id: "reza.eyes", to: { x: -0.7 }, at: 1400, dur: 300 }], shake("reza", 1900)) },
            { caption: "Is he behind the tree? No.", key: 2000, do: [].concat(walk("reza", 116, 0, 1400), [{ id: "reza.eyes", to: { x: 0.7 }, at: 1400, dur: 300 }], shake("reza", 1900)) },
            { caption: "Woof! Here he is, with Reza's ball!", key: 2400, do: [].concat([{ id: "dog", to: { flip: -1 }, dur: 1 }, { id: "dog", to: { x: 200 }, dur: 1 }], trot("dog", 140, 100, 1300),
              [{ id: "ball", to: { o: 1, x: 186, y: 76 }, at: 100, dur: 1 }, { id: "ball", to: { x: 126 }, at: 100, dur: 1300, ease: "linear" }, { id: "dog.jaw", to: { r: 30 }, at: 1500, dur: 800, yoyo: true, times: 4 }], face("reza", true, 1500), jump("reza", 1600, 1, 5)) }
          ] },
        { type: "order", prompt: "تصویرهای قصه را به ترتیب بچین: اول چه شد، بعد چه شد؟", numbered: true, ltr: true, items: ["👦🐶🌳", "🐶🏃🐱", "👦🔍🌊", "🐶⚽👦"] },
        { type: "listen", say: "Why does the dog run away?", prompt: "گوش کن و جواب بده. چرا سگ دوید؟", options: [{ pic: "🐱", en: "a cat" }, { pic: "🐦", en: "a bird" }, { pic: "🚗", en: "a car" }], answer: "🐱" },
        { type: "listen", say: "What has the dog got at the end?", quiet: true, prompt: "گوش کن و جواب بده. آخرش سگ چه آورد؟", options: [{ pic: "🦴", en: "a bone" }, { pic: "⚽", en: "a ball" }, { pic: "🐱", en: "the cat" }], answer: "⚽" },
        { type: "tip", text: "بعد از قصه، کودک با کمک تصویرها قصه را تعریف کند، اول به فارسی و بعد با چند جمله انگلیسی: The dog runs away. Reza looks for him. گوش دادن به قصه‌های انگلیسی (کتاب صوتی کودکان، اگر دارید) هر روز چند دقیقه، گوش را خیلی قوی می‌کند." }
      ]
    },
    {
      id: "english-sapling-58", subject: "english", level: "sapling", emoji: "🧩", title: "بازی جمله‌سازی",
      steps: [
        { type: "order", prompt: "کارت‌ها را بچین: چه کسی، چه کار می‌کند، کجا؟", ltr: true, say: "The girl is reading in the garden.", items: ["The", "girl", "is", "reading", "in", "the", "garden."] },
        { type: "order", prompt: "کارت‌ها را بچین: چه کسی، چه کار می‌کند، کجا؟", ltr: true, say: "My dad works in a hospital.", items: ["My", "dad", "works", "in", "a", "hospital."] },
        { type: "order", prompt: "کارت‌ها را بچین", ltr: true, say: "We play football in the park on Friday.", items: ["We", "play", "football", "in", "the", "park", "on", "Friday."] },
        { type: "order", prompt: "حالا یک سؤال بساز", ltr: true, say: "Does she like painting?", items: ["Does", "she", "like", "painting?"] },
        { type: "order", prompt: "و یک جمله با «نه»", ltr: true, say: "He isn't tired.", items: ["He", "isn't", "tired."] },
        { type: "tip", text: "کارت‌های کلمه بسازید با سه رنگ: چه کسی (I، She، My dad)، چه کار (plays، is reading، likes) و کجا یا کی (in the park، on Friday). کودک از هر رنگ یکی بردارد و جمله بسازد؛ جمله‌های خنده‌دار هم قبول است: My dad is swimming in the kitchen!" }
      ]
    },
    {
      id: "english-sapling-59", subject: "english", level: "sapling", emoji: "🏆", title: "بازی بزرگ نهال",
      steps: [
        { type: "sort", prompt: "هر کلمه را بخوان و گوش کن. صدای «اِی» با کدام نوشته شده؟",
          baskets: [{ label: "ai" }, { label: "ay" }, { label: "a-e" }],
          items: [{ label: "rain", say: "rain", basket: "ai" }, { label: "play", say: "play", basket: "ay" }, { label: "cake", say: "cake", basket: "a-e" },
            { label: "tail", say: "tail", basket: "ai" }, { label: "day", say: "day", basket: "ay" }, { label: "name", say: "name", basket: "a-e" }] },
        { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان، گوش کن و جفت‌ها را پیدا کن",
          pairs: [[{ pic: "🏥", say: "hospital" }, { pic: "🏥", say: "hospital" }], [{ pic: "🧑‍🍳", say: "cook" }, { pic: "🧑‍🍳", say: "cook" }],
            [{ pic: "🍂", say: "autumn" }, { pic: "🍂", say: "autumn" }], [{ pic: "🤧", say: "a cold" }, { pic: "🤧", say: "a cold" }]] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "There are two books on the table.", items: ["There", "are", "two", "books", "on", "the", "table."] },
        { type: "sort", prompt: "هر جمله را بخوان. الان در حال انجام است یا هر روز؟",
          baskets: [{ pic: "▶️", value: "now" }, { pic: "🔁", value: "every" }],
          items: [{ label: "She's reading now.", say: "She's reading now.", basket: "now" }, { label: "She reads every day.", say: "She reads every day.", basket: "every" },
            { label: "I'm eating.", say: "I'm eating.", basket: "now" }, { label: "I get up at seven.", say: "I get up at seven.", basket: "every" }] },
        { type: "pairs", prompt: "هر کلمه را با کلمه‌ای که مال آن است جفت کن",
          pairs: [[{ label: "he" }, { label: "his" }], [{ label: "she" }, { label: "her" }], [{ label: "we" }, { label: "our" }], [{ label: "they" }, { label: "their" }]] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Can I have an apple, please?", items: ["Can", "I", "have", "an", "apple,", "please?"] },
        { type: "tip", text: "این بازی کلمه‌ها و جمله‌های نهال را مرور می‌کند. اگر جایی سخت بود، درس همان چیز را دوباره بازی کنید. از حالا روزی یک جمله انگلیسی درباره روز کودک با هم بنویسید؛ آخر ماه یک دفترچه کوچک «روزهای من» دارد." }
      ]
    },
    {
      id: "english-sapling-60", subject: "english", level: "sapling", emoji: "🌿", title: "ببین چه بلدی",
      steps: [
        { type: "passage", prompt: "این متن را بخوان",
          text: "My name is Arman. I am nine years old. I live in Shiraz with my mum, my dad and my little sister. On Friday we go to the park. My sister likes the swings, and I like playing football.",
          question: "آرمان کجا زندگی می‌کند؟", options: ["تبریز", "شیراز", "یزد"], answer: "شیراز" },
        { type: "passage", prompt: "متن را دوباره بخوان و جواب بده",
          text: "My name is Arman. I am nine years old. I live in Shiraz with my mum, my dad and my little sister. On Friday we go to the park. My sister likes the swings, and I like playing football.",
          question: "آرمان در پارک چه دوست دارد؟", options: ["⚽", "🏊", "📖"], answer: "⚽" },
        { type: "listen", say: "What's your brother doing? He's sleeping on the sofa.", prompt: "به گفت‌وگو گوش کن. برادرش کجاست؟",
          options: [{ pic: "🛏️", en: "in bed" }, { pic: "🛋️", en: "on the sofa" }, { pic: "🌳", en: "in the garden" }], answer: "🛋️" },
        { type: "listen", say: "When's your birthday? It's in March.", quiet: true, prompt: "به گفت‌وگو گوش کن. تولدش کدام ماه است؟",
          options: [{ label: "May" }, { label: "March" }, { label: "August" }], answer: "March" },
        { type: "listen", say: "Where are you from?", quiet: true, prompt: "گوش کن و جواب درست را انتخاب کن",
          options: [{ label: "I'm from Iran.", en: "I'm from Iran." }, { label: "I'm nine.", en: "I'm nine." }, { label: "It's sunny.", en: "It's sunny." }], answer: "I'm from Iran." },
        { type: "listen", say: "Is there a cat in the kitchen? No, there isn't. It's in the garden.", quiet: true, prompt: "به گفت‌وگو گوش کن. گربه کجاست؟",
          options: [{ pic: "🍳", en: "in the kitchen" }, { pic: "🌳", en: "in the garden" }], answer: "🌳" },
        { type: "tip", text: "این درس آخر نهال است: خواندن یک متن کوتاه، گوش دادن به گفت‌وگو و جواب دادن به سؤال‌های درباره خود. اگر کودک این‌ها را بیشترش درست جواب داد، آماده درخت است. هر روز کمی خواندن، گوش دادن و حرف زدن به انگلیسی را ادامه بدهید؛ کم ولی هر روز." }
      ]
    },
    // ---------- 🌳 درخت (tree) ----------
    {
      id: "english-tree-1", subject: "english", level: "tree", emoji: "🔁", title: "هر روز",
      steps: [
        /* Reza's day: the clock turns to seven and he gets up; he brushes his teeth (the brush moves at his mouth);
           after school he reads a book; at nine the night comes and he is in bed. Each beat says how often. */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#f6e3c6",
          parts: { skyN: { art: "en-sky-night", o: 0 }, skyD: { art: "en-sky-day" }, room: { art: "en-bedroom" }, clock: { art: "en-clock", at: [44, 26], s: 1.4 },
            bed: { art: "en-bed-low", at: [50, 86], s: 1.3 }, kid: { art: "en-reza", at: [58, 64], r: -90, s: 1.1 },
            brush: { art: "🪥", at: inHand("en-reza", [104, 86], 1.1, "R", "mouth", 0.45), s: 0.45, r: -90, o: 0 },
            book: { art: "📖", at: inHand("en-reza", [104, 86], 1.1, "R", "ask", 0.6), s: 0.6, o: 0 } },
          scenes: [
            { caption: "Reza gets up at seven o'clock every day.", key: 2700, hold: 4400, do: [{ id: "kid.shut", to: { o: 1 }, dur: 1 }, { id: "kid.eyes", to: { o: 0 }, dur: 1 },
              { id: "clock.hour", to: { r: 210 }, dur: 1200 }, { id: "kid.shut", to: { o: 0 }, at: 1300, dur: 150 }, { id: "kid.eyes", to: { o: 1 }, at: 1300, dur: 150 },
              { id: "kid", to: { x: 104, y: 86, r: 0 }, at: 1600, dur: 1000 }] },
            { caption: "He always brushes his teeth.", key: 1500, do: [].concat(pose("kid", "R", "mouth", 0, 500), [{ id: "brush", to: { o: 1 }, at: 400, dur: 200 },
              { id: "brush", to: { x: "+1.6" }, at: 700, dur: 2400, yoyo: true, times: 10 }, { id: "kid.foreR", to: { r: "+8" }, at: 700, dur: 2400, yoyo: true, times: 10 }]) },
            { caption: "After school, he sometimes reads a book.", key: 1800, do: [].concat([{ id: "brush", to: { o: 0 }, dur: 300 }], pose("kid", "R", "ask", 300, 500),
              [{ id: "clock.hour", to: { r: 480 }, dur: 1200 }, { id: "clock.minute", to: { r: 3240 }, dur: 1200 }, { id: "book", to: { o: 1 }, at: 700, dur: 300 }, { id: "kid.eyes", to: { x: 0.5, y: 0.7 }, at: 800, dur: 300 }, { id: "book", to: { r: 6 }, at: 1000, dur: 1600, yoyo: true, times: 2 }]) },
            { caption: "He never goes to bed late. At nine o'clock, he's in bed.", key: 3700, hold: 5200, do: [].concat([{ id: "book", to: { o: 0 }, dur: 300 }, { id: "kid.eyes", to: { x: 0, y: 0 }, dur: 300 }], pose("kid", "R", "down", 0, 400),
              [{ id: "clock.hour", to: { r: 630 }, dur: 1600 }, { id: "clock.minute", to: { r: 5040 }, dur: 1600 }, { id: "skyD", to: { o: 0 }, at: 600, dur: 1200 }, { id: "skyN", to: { o: 1 }, at: 600, dur: 1200 },
                { id: "kid", to: { x: 58, y: 64, r: -90 }, at: 2000, dur: 1000 }, { id: "kid.shut", to: { o: 1 }, at: 3100, dur: 200 }, { id: "kid.eyes", to: { o: 0 }, at: 3100, dur: 200 }]) }
          ] },
        { type: "sort", prompt: "هر ردیف هفت روز هفته است: ✅ یعنی آن روز این کار را می‌کند. هر کدام را در سبد درست بگذار.",
          baskets: [{ label: "always" }, { label: "sometimes" }, { label: "never" }],
          items: [{ label: "🥛 ✅✅✅✅✅✅✅", say: "He drinks milk every day.", basket: "always" }, { label: "⚽ ✅⬜⬜✅⬜⬜⬜", say: "He plays football on two days.", basket: "sometimes" },
            { label: "☕ ⬜⬜⬜⬜⬜⬜⬜", say: "He doesn't drink coffee.", basket: "never" }, { label: "🪥 ✅✅✅✅✅✅✅", say: "He brushes his teeth every day.", basket: "always" },
            { label: "🍕 ⬜⬜⬜⬜✅⬜⬜", say: "He has pizza on one day.", basket: "sometimes" }, { label: "🌙 ⬜⬜⬜⬜⬜⬜⬜", say: "He doesn't go to bed late.", basket: "never" }] },
        { type: "listen", say: "Mina always walks to school.", prompt: "گوش کن. مینا چند روز پیاده به مدرسه می‌رود؟",
          options: [{ label: "✅✅✅✅✅", en: "always" }, { label: "✅⬜✅⬜⬜", en: "sometimes" }, { label: "⬜⬜⬜⬜⬜", en: "never" }], answer: "✅✅✅✅✅" },
        { type: "listen", say: "My dad never drinks tea at night.", quiet: true, prompt: "گوش کن. چند شب؟",
          options: [{ label: "🌙 ✅✅✅", en: "always" }, { label: "🌙 ⬜⬜⬜", en: "never" }], answer: "🌙 ⬜⬜⬜" },
        { type: "listen", show: "👧🏫", prompt: "کدام جمله درست است؟",
          options: [{ label: "She goes to school every day.", en: "She goes to school every day." }, { label: "She go to school every day.", en: "She go to school every day." }], answer: "She goes to school every day." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "He always gets up at seven.", items: ["He", "always", "gets", "up", "at", "seven."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "We sometimes go to the park.", items: ["We", "sometimes", "go", "to", "the", "park."] },
        { type: "tip", text: "برای کارهایی که هر روز یا همیشه انجام می‌شوند، فعل ساده می‌آید و برای او (he یا she) یک s آخرش: She walks. He brushes his teeth. always یعنی همیشه، usually معمولاً، sometimes گاهی و never هیچ‌وقت؛ این کلمه‌ها قبل از فعل می‌آیند. سر سفره بپرسید What do you always do in the morning? و هر کس یک جمله بگوید." }
      ]
    },
    {
      id: "english-tree-2", subject: "english", level: "tree", emoji: "📅", title: "تاریخ و برنامه",
      steps: [
        { type: "listen", say: "first, second, third, fourth, fifth", prompt: "گوش کن. اولی، دومی، سومی …",
          options: [{ label: "1st", en: "first" }, { label: "2nd", en: "second" }, { label: "3rd", en: "third" }], answer: "1st" },
        { type: "pairs", prompt: "هر عدد را با کلمه‌اش جفت کن",
          pairs: [[{ label: "1st" }, { label: "first", say: "first" }], [{ label: "2nd" }, { label: "second", say: "second" }], [{ label: "3rd" }, { label: "third", say: "third" }],
            [{ label: "4th" }, { label: "fourth", say: "fourth" }], [{ label: "5th" }, { label: "fifth", say: "fifth" }]] },
        { type: "order", prompt: "به ترتیب بچین: اول، دوم، سوم …", ltr: true, items: ["first", "second", "third", "fourth", "fifth"] },
        { type: "listen", say: "My birthday is on the third of May.", prompt: "گوش کن. تولدش کی است؟",
          options: [{ label: "3 May", en: "the third of May" }, { label: "13 May", en: "the thirteenth of May" }, { label: "3 March", en: "the third of March" }], answer: "3 May" },
        { type: "listen", say: "The party is on the first of June.", quiet: true, prompt: "گوش کن. جشن کی است؟",
          options: [{ label: "1 June", en: "the first of June" }, { label: "1 July", en: "the first of July" }, { label: "21 June", en: "the twenty-first of June" }], answer: "1 June" },
        { type: "clock", ask: "show", start: "3:00", time: "3:15", say: "It's quarter past three.", prompt: "ببین عقربه بزرگ تا کجا می‌رود. quarter past یعنی یک ربع بعد از: It's quarter past three." },
        { type: "clock", time: "3:15", say: "It's quarter past three.", prompt: "گوش کن و عقربه‌ها را روی همین ساعت بگذار: It's quarter past three." },
        { type: "clock", time: "4:45", say: "It's quarter to five.", prompt: "quarter to یعنی یک ربع مانده به. گوش کن و ساعت را درست کن: It's quarter to five." },
        { type: "listen", say: "On Monday, we have maths at nine o'clock and art at eleven o'clock.", prompt: "به برنامه مدرسه گوش کن. درس هنر ساعت چند است؟",
          options: [{ pic: "🕘", en: "nine o'clock" }, { pic: "🕚", en: "eleven o'clock" }, { pic: "🕐", en: "one o'clock" }], answer: "🕚" },
        { type: "listen", say: "What's the date today? It's the fifth of October.", quiet: true, prompt: "گوش کن. امروز چندم است؟",
          options: [{ label: "5 October", en: "the fifth of October" }, { label: "15 October", en: "the fifteenth of October" }, { label: "5 August", en: "the fifth of August" }], answer: "5 October" },
        { type: "tip", text: "در انگلیسی تاریخ را با عدد ترتیبی می‌گویند: the first of May (یکم)، the second (دوم)، the third (سوم)، the fourth (چهارم). هر صبح بپرسید What's the date today? و با هم روی تقویم پیدا کنید. برنامه هفتگی مدرسه کودک را هم با هم به انگلیسی بخوانید: On Saturday we have maths." }
      ]
    },
    {
      id: "english-tree-3", subject: "english", level: "tree", emoji: "⚽", title: "الان چه می‌کنی؟",
      steps: [
        /* Arman plays football every Friday (he kicks the ball); today it rains (the sky goes grey, drops fall) and he
           waits under the tree; the rain stops and the sun comes out; now he is playing football again. */
        { type: "scene", prompt: "گوش کن: هر جمعه، یا همین الان؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [132, 22], s: 1.1, o: 0 }, dim: { art: "en-dim", o: 0 }, tree: { art: "en-tree", at: [124, 88], s: 1.1 },
            arman: { art: "en-arman", at: [40, 86], s: 1.2 }, ball: { art: "en-ball", at: [54, 86], s: 1.6 } },
          scenes: [
            { caption: "Every Friday, Arman plays football in the park.", key: 1500, do: [{ id: "arman.legR", to: { r: -35 }, at: 600, dur: 300, yoyo: true, times: 2 }, { id: "ball", path: "M54 86Q70 46 88 86", at: 900, dur: 1000 }] },
            { caption: "Today it's raining. Arman isn't playing. He's waiting under the tree.", key: 3200, hold: 5600, do: [].concat([{ id: "dim", to: { o: 1 }, dur: 1000 },
              { emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 40, at: 400, dur: 4000, life: 1100 }], walk("arman", 112, 1200, 1800), [{ id: "arman.eyes", to: { y: -0.6 }, at: 3000, dur: 300 }]) },
            { caption: "Now the rain stops. The sun is shining!", key: 1800, do: [{ id: "dim", to: { o: 0 }, dur: 1200 }, { id: "sun", to: { o: 1 }, at: 400, dur: 800 }, { id: "sun", to: { r: 30 }, at: 400, dur: 2400 }, { id: "arman.eyes", to: { y: 0 }, at: 600, dur: 300 }] },
            { caption: "Look! He's playing football now.", key: 2400, do: [].concat(walk("arman", 74, 0, 1300), [{ id: "ball", to: { x: 92 }, at: 1300, dur: 1 }, { id: "arman.legR", to: { r: -35 }, at: 1700, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M92 86Q76 46 56 86", at: 1900, dur: 1000 }], face("arman", true, 1300)) }
          ] },
        { type: "choose", prompt: "به تصویر نگاه کن. کدام درست است؟", show: "👧💃", options: ["Look! She's dancing.", "Look! She dances."], answer: "Look! She's dancing." },
        { type: "choose", prompt: "کدام درست است؟", show: "🥛 ✅✅✅✅✅✅✅", options: ["I drink milk every morning.", "I'm drinking milk every morning."], answer: "I drink milk every morning." },
        { type: "listen", say: "Shh! The baby is sleeping.", prompt: "گوش کن. الان چه می‌شود؟",
          options: [{ pic: "👶💤", en: "The baby is sleeping." }, { pic: "👶🍼", en: "The baby is drinking." }, { pic: "👶😢", en: "The baby is crying." }], answer: "👶💤" },
        { type: "listen", say: "What does your mum do on Fridays? She makes bread.", quiet: true, prompt: "گوش کن. مادرش جمعه‌ها چه می‌کند؟",
          options: [{ pic: "🍞", en: "She makes bread." }, { pic: "🧹", en: "She cleans the house." }, { pic: "📖", en: "She reads." }], answer: "🍞" },
        { type: "sort", prompt: "هر جمله را بخوان. الان در حال انجام است یا هر بار؟",
          baskets: [{ pic: "▶️", label: "now", value: "now" }, { pic: "🔁", label: "every day", value: "every" }],
          items: [{ label: "Look! It's snowing.", say: "Look! It's snowing.", basket: "now" }, { label: "It snows in winter.", say: "It snows in winter.", basket: "every" },
            { label: "Listen! Dad is singing.", say: "Listen! Dad is singing.", basket: "now" }, { label: "Dad sings every morning.", say: "Dad sings every morning.", basket: "every" },
            { label: "We're having lunch now.", say: "We're having lunch now.", basket: "now" }, { label: "We have lunch at one.", say: "We have lunch at one.", basket: "every" }] },
        { type: "tip", text: "دو جور زمان حال: برای کار همین الان am / is / are و ing (She's reading now.) و برای کار هر روز یا همیشگی فعل ساده (She reads every day.). کلمه‌های now، Look! و Listen! نشانه «الان» هستند و every day، always و on Fridays نشانه «همیشه». بازی کنید: شما بگویید یک کار هر روزه کودک چیست و او بگوید الان چه می‌کند." }
      ]
    },
    {
      id: "english-tree-4", subject: "english", level: "tree", emoji: "🦔", title: "قصه‌های کوتاه",
      steps: [
        { type: "passage", prompt: "قصه را بخوان: باغ پدربزرگ",
          text: "Every summer, Mina visits her grandpa in a small village near Kashan. Grandpa has got a big garden with apple trees, roses and a little pool. In the morning, Mina and Grandpa water the flowers. Grandpa always sings while he works.",
          question: "پدربزرگ وقتی کار می‌کند چه می‌کند؟", options: ["آواز می‌خواند", "می‌خوابد", "کتاب می‌خواند"], answer: "آواز می‌خواند" },
        { type: "passage", prompt: "بقیه قصه را بخوان",
          text: "One morning, Mina sees that some apples are gone. \"Who is eating our apples?\" she asks. Grandpa smiles. \"Let's find out tonight,\" he says. That night, they wait quietly in the garden. The moon is bright. Suddenly, they see a small animal with spines on its back. It's a hedgehog! It's eating an apple under the tree.",
          question: "چه کسی سیب‌ها را می‌خورد؟", options: ["🦔", "🐱", "🐦"], answer: "🦔" },
        /* The story's night: the garden grows dark and the moon comes up; Mina and Grandpa watch; a hedgehog walks in
           and eats the apple under the tree (it gets smaller bite by bite); the next day Mina puts a plate of apples
           under the tree. */
        { type: "scene", prompt: "حالا قصه را ببین و گوش کن", bg: "#cfeaf7",
          parts: { garden: { art: "en-garden" }, tree: { art: "en-tree", at: [118, 88], s: 1.1 }, apple: { art: "🍎", at: [104, 87], s: 0.45 },
            night: { art: "en-night", o: 0 }, moon: { art: "🌙", at: [30, 40], s: 0.8, o: 0 },
            mina: { art: "en-mina", at: [30, 86], s: 1.1 }, gran: { art: "en-grandpa", at: [50, 86] },
            hog: { art: "en-hedgehog", at: [180, 88], s: 1.1, flip: 1 }, plate: { art: "en-plate", at: [96, 88], s: 0.8, o: 0 },
            p1: { art: "🍎", at: [93, 85.6], s: 0.35, o: 0 }, p2: { art: "🍎", at: [99, 85.6], s: 0.35, o: 0 } },
          scenes: [
            { caption: "That night, Mina and Grandpa wait and watch.", key: 2400, do: [{ id: "night", to: { o: 1 }, dur: 1400 }, { id: "moon", to: { o: 1, y: 18 }, at: 300, dur: 1600 },
              { id: "mina.eyes", to: { x: 0.7 }, at: 1600, dur: 300 }, { id: "gran.eyes", to: { x: 0.7 }, at: 1600, dur: 300 }] },
            { caption: "Look! A small animal comes into the garden.", key: 2400, do: [{ id: "hog", walk: [119, 88], dur: 2600 }] },
            { caption: "It's a hedgehog! It's eating an apple.", key: 2000, do: [{ id: "hog.head", to: { r: 18 }, at: 200, dur: 400, yoyo: true, times: 8 },
              { id: "apple", to: { s: 0.3 }, at: 400, dur: 1200 }, { id: "apple", to: { s: 0.15 }, at: 1800, dur: 1200 }, { id: "apple", to: { o: 0 }, at: 3000, dur: 300 }] },
            { caption: "The next day, Mina puts some apples on a plate for the hedgehog.", key: 3400, hold: 5200, do: [].concat([{ id: "hog", walk: [190, 88], dur: 1800 }, { id: "night", to: { o: 0 }, at: 300, dur: 1200 }, { id: "moon", to: { o: 0 }, at: 300, dur: 800 }],
              walk("mina", 82, 1400, 1400), [{ id: "plate", to: { o: 1 }, at: 2800, dur: 300 }, { id: "p1", to: { o: 1 }, at: 3000, dur: 200 }, { id: "p2", to: { o: 1 }, at: 3200, dur: 200 }], face("mina", true, 3200)) }
          ],
          question: "مینا روز بعد برای جوجه‌تیغی چه گذاشت؟", options: ["🍎", "🥛", "🧀"], answer: "🍎", pic: true },
        { type: "passage", prompt: "آخر قصه را بخوان",
          text: "\"Can we keep the apples for us?\" Mina asks. \"There are lots of apples,\" says Grandpa. \"We can share.\" The next day, Mina puts some apples on a plate under the tree. That night, the hedgehog comes again, and Mina smiles.",
          question: "پدربزرگ چه گفت؟", options: ["We can share.", "Go away!", "I'm hungry."], answer: "We can share." },
        { type: "tip", text: "قصه را دوباره با هم بخوانید؛ اول شما یک جمله، بعد کودک یک جمله. بپرسید Where does Grandpa live? Who is eating the apples? و بگذارید با جمله کوتاه انگلیسی جواب بدهد. بعد درباره قصه حرف بزنید: «تو جای مینا بودی چه می‌کردی؟». هر هفته یک قصه کوتاه انگلیسی با هم بخوانید." }
      ]
    },
    {
      id: "english-tree-5", subject: "english", level: "tree", emoji: "🐘", title: "توصیف کن",
      steps: [
        /* Sara shows her family and her pets in the garden: Grandpa walks in (tall, with a stick: old), the big dog
           and the small cat come, Sara smiles and jumps (happy), and flowers open all over the garden (beautiful). */
        { type: "scene", prompt: "گوش کن و تو هم بگو", bg: "#cfeaf7",
          parts: { garden: { art: "en-garden" }, sara: { art: "en-sara", at: [24, 86], s: 1.1 }, gran: { art: "en-grandpa", at: [-20, 86], s: 1.15 },
            dog: { art: "en-dog", at: [190, 88], s: 1.3, flip: 1 }, cat: { art: "en-cat", at: [190, 88], s: 0.8, flip: 1 },
            f1: { art: "🌷", at: [74, 84], s: 0.5, o: 0 }, f2: { art: "🌹", at: [124, 87], s: 0.5, o: 0 }, f3: { art: "🌼", at: [154, 83], s: 0.5, o: 0 }, f4: { art: "🌷", at: [8, 86], s: 0.45, o: 0 } },
          scenes: [
            { caption: "This is my grandpa. He's tall and old.", key: 2200, do: [].concat(pose("sara", "R", "point", 0, 500), [{ id: "gran", walk: [56, 86], at: 300, dur: 1800 }]) },
            { caption: "This is our dog. It's big.", key: 2200, do: [].concat(pose("sara", "R", "down", 0, 400), trot("dog", 100, 0, 1800), [{ id: "dog.tail", to: { r: -25 }, at: 1800, dur: 1200, yoyo: true, times: 4 }]) },
            { caption: "And this is our cat. It's small.", key: 2200, do: [{ id: "cat", walk: [140, 88], dur: 1800 }, { id: "cat.tail", to: { r: 20 }, at: 1800, dur: 1200, yoyo: true, times: 4 }] },
            { caption: "I'm happy! Our garden is beautiful.", key: 2600, do: [].concat(face("sara", true, 0), jump("sara", 200, 1, 5), [{ id: "f1", to: { o: 1, s: 0.8 }, at: 1000, dur: 500 }, { id: "f2", to: { o: 1, s: 0.8 }, at: 1300, dur: 500 },
              { id: "f3", to: { o: 1, s: 0.8 }, at: 1600, dur: 500 }, { id: "f4", to: { o: 1, s: 0.7 }, at: 1900, dur: 500 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "🐘", en: "big" }, { pic: "🐭", en: "small" }, { pic: "🦒", en: "tall" }, { pic: "👴", en: "old" }, { pic: "😀", en: "happy" }, { pic: "🌸", en: "beautiful" }] },
        { type: "sort", prompt: "روی هر تصویر بزن و گوش کن. بزرگ است یا کوچک؟",
          baskets: [{ label: "big" }, { label: "small" }],
          items: [{ pic: "🐘", say: "an elephant", basket: "big" }, { pic: "🐭", say: "a mouse", basket: "small" }, { pic: "🐋", say: "a whale", basket: "big" },
            { pic: "🐜", say: "an ant", basket: "small" }, { pic: "🐞", say: "a ladybird", basket: "small" }, { pic: "🐪", say: "a camel", basket: "big" }] },
        { type: "sort", prompt: "هر جمله را بخوان و گوش کن. خوشحال است یا ناراحت؟",
          baskets: [{ pic: "😀", label: "happy", value: "happy" }, { pic: "😢", label: "sad", value: "sad" }],
          items: [{ label: "I've got a new bike!", say: "I've got a new bike!", basket: "happy" }, { label: "My ice cream is on the floor.", say: "My ice cream is on the floor.", basket: "sad" },
            { label: "It's my birthday today!", say: "It's my birthday today!", basket: "happy" }, { label: "I can't find my cat.", say: "I can't find my cat.", basket: "sad" }] },
        { type: "listen", say: "Show me the tall man.", prompt: "گوش کن و پیدا کن",
          options: [{ pic: "🧍‍♂️", scale: [1, 0.75], en: "the short man", value: "short" }, { pic: "🧍‍♂️", scale: [1, 1.4], en: "the tall man", value: "tall" }], answer: "tall" },
        { type: "record", pic: "🐘", say: "This is an elephant. It's big and grey. It's got a long nose and big ears.",
          prompt: "به فیل نگاه کن و دو یا سه جمله درباره‌اش بگو. اول به نمونه گوش کن. بعد ضبط کن و صدای خودت را بشنو.",
          check: ["دو جمله یا بیشتر گفت؟", "کلمه‌ای مثل big، small یا long گفت؟", "بلند و واضح گفت؟"] },
        { type: "tip", text: "صفت‌ها (big، small، tall، old، happy، beautiful) چیزها را توصیف می‌کنند و در انگلیسی قبل از اسم می‌آیند: a big dog، a beautiful garden. بازی «حدس بزن»: یک چیز در خانه را با دو صفت توصیف کنید (It's big and brown.) و کودک حدس بزند؛ بعد نوبت کودک است." }
      ]
    },
    {
      id: "english-tree-6", subject: "english", level: "tree", emoji: "🖊️", title: "بنویس چه می‌بینی",
      steps: [
        { type: "listen", say: "There is a big tree. A girl is reading under the tree. The sun is shining.", prompt: "گوش کن. این جمله‌ها درباره کدام تصویر است؟",
          options: [{ pic: "🌳👧📖☀", en: "a girl reading under a tree" }, { pic: "🏠👦⚽🌧", en: "a boy playing in the rain" }, { pic: "🌳🐶☀", en: "a dog under a tree" }], answer: "🌳👧📖☀" },
        { type: "listen", show: "🛋️🐱💤", prompt: "کدام جمله درباره این تصویر است؟",
          options: [{ label: "A cat is sleeping on the sofa.", en: "A cat is sleeping on the sofa." }, { label: "A cat is eating in the garden.", en: "A cat is eating in the garden." }, { label: "A dog is sleeping on the bed.", en: "A dog is sleeping on the bed." }],
          answer: "A cat is sleeping on the sofa." },
        { type: "listen", show: "🏖️👨‍👩‍👧🌊", prompt: "کدام جمله درباره این تصویر نیست؟",
          options: [{ label: "The family is at the beach.", en: "The family is at the beach." }, { label: "They are swimming in the sea.", en: "They are swimming in the sea." }, { label: "It's snowing.", en: "It's snowing." }],
          answer: "It's snowing." },
        { type: "paper", pic: "🌳🐶⚽👦☀",
          text: "به تصویر نگاه کن. سه تا پنج جمله درباره آن به انگلیسی بنویس: چه چیزهایی هست؟ چه کسی چه کار می‌کند؟ هوا چطور است؟",
          example: "This is a park. There is a big tree. A boy is playing with his dog. The dog has got a ball. It's sunny.",
          check: ["سه جمله یا بیشتر نوشت؟", "هر جمله با حرف بزرگ شروع شد و نقطه گذاشت؟", "از There is، is …ing یا has got استفاده کرد؟", "جمله‌ها درباره همین تصویر است؟"] },
        { type: "tip", text: "برای نوشتن درباره یک تصویر، کودک اول به انگلیسی بگوید چه می‌بیند و بعد بنویسد. سه سؤال کمکش می‌کند: What is there? (There is a tree.) What is he doing? (He's playing.) What's the weather like? (It's sunny.). از کتاب‌ها یا عکس‌های خانوادگی هم تصویر انتخاب کنید." }
      ]
    },
    {
      id: "english-tree-7", subject: "english", level: "tree", emoji: "🌧️", title: "دیروز",
      steps: [
        /* Yesterday it rained (grey sky, drops) and Sara and Reza were at home in the kitchen, bored (frowning).
           Today the kitchen fades back into the park, the sun comes out and they jump, happy. */
        { type: "scene", prompt: "گوش کن: دیروز یا امروز؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [132, 22], s: 1.1, o: 0 }, dim: { art: "en-dim" },
            kitchen: { art: "en-kitchen", o: 0 }, table: { art: "en-table", at: [80, 90], s: 1.1, o: 0 },
            sara: { art: "en-sara", at: [50, 86], s: 1.1 }, reza: { art: "en-reza", at: [110, 86], s: 1.1 } },
          scenes: [
            { caption: "Yesterday it was rainy.", key: 2200, do: [{ emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 36, dur: 3200, life: 1100 }, { id: "sara", to: { o: 0 }, dur: 1 }, { id: "reza", to: { o: 0 }, dur: 1 }] },
            { caption: "Sara and Reza were at home. They were bored.", key: 2400, do: [].concat([{ id: "kitchen", to: { o: 1 }, dur: 900 }, { id: "table", to: { o: 1 }, dur: 900 },
              { id: "sara", to: { o: 1 }, at: 700, dur: 500 }, { id: "reza", to: { o: 1 }, at: 700, dur: 500 }], face("sara", false, 1200), face("reza", false, 1200), shake("reza", 1600)) },
            { caption: "Today it's sunny. They're in the park, and they're happy!", key: 2600, do: [].concat([{ id: "kitchen", to: { o: 0 }, dur: 900 }, { id: "table", to: { o: 0 }, dur: 900 },
              { id: "dim", to: { o: 0 }, at: 300, dur: 900 }, { id: "sun", to: { o: 1 }, at: 700, dur: 800 }], face("sara", true, 1300), face("reza", true, 1300), jump("sara", 1600, 1, 5), jump("reza", 1700, 1, 5)) }
          ] },
        { type: "listen", say: "Where were you yesterday? I was at the park.", prompt: "گوش کن. دیروز کجا بود؟",
          options: [{ pic: "🌳", en: "at the park" }, { pic: "🏫", en: "at school" }, { pic: "🏠", en: "at home" }], answer: "🌳" },
        { type: "listen", say: "Was it hot yesterday? No, it wasn't. It was cold.", quiet: true, prompt: "گوش کن. دیروز هوا چطور بود؟",
          options: [{ pic: "☀️", en: "hot" }, { pic: "❄️", en: "cold" }], answer: "❄️" },
        { type: "listen", show: "👦😴", prompt: "دیروز. کدام درست است؟",
          options: [{ label: "He was tired.", en: "He was tired." }, { label: "He were tired.", en: "He were tired." }], answer: "He was tired." },
        { type: "sort", prompt: "هر جمله را بخوان. جای خالی was است یا were؟",
          baskets: [{ label: "was" }, { label: "were" }],
          items: [{ label: "I ___ at school.", say: "I was at school.", basket: "was" }, { label: "We ___ at the zoo.", say: "We were at the zoo.", basket: "were" },
            { label: "She ___ happy.", say: "She was happy.", basket: "was" }, { label: "They ___ hungry.", say: "They were hungry.", basket: "were" },
            { label: "It ___ cold.", say: "It was cold.", basket: "was" }, { label: "You ___ late.", say: "You were late.", basket: "were" }] },
        { type: "tip", text: "was و were گذشته am / is / are هستند: I was، he/she/it was، و we/you/they were. سر شام بپرسید Where were you this morning? Was it cold? و کودک جواب بدهد: I was at school. It was sunny. درباره عکس‌های قدیمی خانواده هم بگویید: This was my school. I was seven." }
      ]
    },
    {
      id: "english-tree-8", subject: "english", level: "tree", emoji: "🎬", title: "دیروز چه کردی؟",
      steps: [
        { type: "listen", say: "Yesterday I played football.", prompt: "گوش کن. دیروز چه کرد؟",
          options: [{ pic: "⚽", en: "played football" }, { pic: "📖", en: "read a book" }, { pic: "🏊", en: "swam" }], answer: "⚽" },
        { type: "listen", say: "Last night, we watched a film.", quiet: true, prompt: "گوش کن. دیشب چه کردند؟",
          options: [{ pic: "🎬", en: "watched a film" }, { pic: "🍕", en: "cooked pizza" }, { pic: "🎨", en: "painted" }], answer: "🎬" },
        { type: "listen", say: "Yesterday I watched TV.", quiet: true, prompt: "گوش کن. کدام جمله را شنیدی؟",
          options: [{ label: "I watched TV.", en: "I watched TV." }, { label: "I watch TV.", en: "I watch TV." }], answer: "I watched TV." },
        { type: "sort", prompt: "روی هر کلمه بزن و خوب گوش کن. ed آخرش چه صدایی دارد: «ت»، «د» یا «اید»؟",
          baskets: [{ label: "walked (t)", value: "t" }, { label: "played (d)", value: "d" }, { label: "wanted (id)", value: "id" }],
          items: [{ label: "jumped", say: "jumped", basket: "t" }, { label: "cooked", say: "cooked", basket: "t" }, { label: "cleaned", say: "cleaned", basket: "d" },
            { label: "opened", say: "opened", basket: "d" }, { label: "painted", say: "painted", basket: "id" }, { label: "needed", say: "needed", basket: "id" }] },
        { type: "sort", prompt: "هر جمله را بخوان. برای امروز است یا دیروز؟",
          baskets: [{ pic: "📅", label: "every day", value: "now" }, { pic: "⏪", label: "yesterday", value: "past" }],
          items: [{ label: "I walk to school.", say: "I walk to school.", basket: "now" }, { label: "I walked to the park.", say: "I walked to the park.", basket: "past" },
            { label: "She helped her mum.", say: "She helped her mum.", basket: "past" }, { label: "She helps her mum.", say: "She helps her mum.", basket: "now" },
            { label: "We played a game.", say: "We played a game.", basket: "past" }, { label: "We play a game.", say: "We play a game.", basket: "now" }] },
        { type: "tip", text: "برای کار گذشته بیشتر فعل‌ها ed می‌گیرند: walk → walked، play → played، want → wanted. ed سه جور خوانده می‌شود: «ت» (walked)، «د» (played) و «اید» (wanted)؛ لازم نیست کودک قانونش را حفظ کند، فقط زیاد بشنود و بگوید. هر شب بپرسید What did you do today? و یک جمله با ed بگویید: I cooked dinner. I cleaned the kitchen." }
      ]
    },
    {
      id: "english-tree-9", subject: "english", level: "tree", emoji: "🦒", title: "فعل‌های بی‌قاعده",
      steps: [
        /* Sara's day at the zoo yesterday, told in the past: she goes in with her dad, sees a tall giraffe (she looks up
           as it comes), eats an ice cream (it gets smaller), takes a photo (a flash), and they come home happy. */
        { type: "scene", prompt: "گوش کن: سارا دیروز چه کرد؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, giraffe: { art: "🦒", at: [190, 88], s: 2.8 }, fence: { art: "en-fence", at: [100, 88] },
            dad: { art: "en-father", at: [-30, 86] }, sara: { art: "en-sara", at: [-14, 86], s: 1.05 },
            ice: { art: "🍦", at: inHand("en-sara", [70, 86], 1.05, "R", "mouth", 0.5), s: 0.5, o: 0 },
            cam: { art: "📷", at: inHand("en-sara", [70, 86], 1.05, "R", "point", 0.5), s: 0.5, o: 0 } },
          scenes: [
            { caption: "Yesterday, Sara went to the zoo with her dad.", key: 2200, do: [].concat(walk("dad", 46, 0, 2200), walk("sara", 70, 0, 2200)) },
            { caption: "She saw a giraffe. It was very tall!", key: 2400, do: [{ id: "giraffe", to: { x: 128 }, dur: 2200, ease: "out" }, { id: "sara.eyes", to: { x: 0.6, y: -0.8 }, at: 1800, dur: 300 }, { id: "sara.head", to: { r: -10 }, at: 1800, dur: 400 }] },
            { caption: "She ate an ice cream.", key: 2000, do: [].concat([{ id: "sara.head", to: { r: 0 }, dur: 300 }, { id: "sara.eyes", to: { x: 0, y: 0 }, dur: 300 }], pose("sara", "R", "mouth", 200, 500),
              [{ id: "ice", to: { o: 1 }, at: 600, dur: 200 }, { id: "sara.mouth", to: { o: 1 }, at: 900, dur: 100 }, { id: "sara.mouth", to: { sy: 0.3 }, at: 1000, dur: 1600, yoyo: true, times: 6 }, { id: "ice", to: { s: 0.3 }, at: 1000, dur: 1800 }]) },
            { caption: "She took a photo of the giraffe.", key: 1700, do: [].concat([{ id: "sara.mouth", to: { o: 0 }, dur: 100 }, { id: "ice", to: { o: 0 }, dur: 200 }], pose("sara", "R", "point", 200, 500),
              [{ id: "cam", to: { o: 1 }, at: 600, dur: 200 }, { emit: "spark", where: inHand("en-sara", [70, 86], 1.05, "R", "point", 0.5), spread: [6, 4], n: 6, at: 1400, dur: 200, life: 600 }]) },
            { caption: "Then they came home. She had a great day!", key: 2400, hold: 4600, do: [].concat([{ id: "cam", to: { o: 0 }, dur: 200 }], pose("sara", "R", "down", 0, 400), face("sara", true, 0),
              [{ id: "dad", to: { flip: 1 }, at: 300, dur: 1 }, { id: "sara", to: { flip: 1 }, at: 300, dur: 1 }], walk("dad", -30, 400, 2200), walk("sara", -14, 400, 2200)) }
          ] },
        { type: "pairs", prompt: "هر فعل را با گذشته‌اش جفت کن. روی هر کدام بزن و گوش کن.",
          pairs: [[{ label: "go", say: "go" }, { label: "went", say: "went" }], [{ label: "see", say: "see" }, { label: "saw", say: "saw" }],
            [{ label: "eat", say: "eat" }, { label: "ate", say: "ate" }], [{ label: "have", say: "have" }, { label: "had", say: "had" }]] },
        { type: "pairs", prompt: "این‌ها را هم جفت کن",
          pairs: [[{ label: "come", say: "come" }, { label: "came", say: "came" }], [{ label: "make", say: "make" }, { label: "made", say: "made" }],
            [{ label: "take", say: "take" }, { label: "took", say: "took" }], [{ label: "get", say: "get" }, { label: "got", say: "got" }]] },
        { type: "sort", prompt: "هر جمله را بخوان. برای هر روز است یا دیروز؟",
          baskets: [{ pic: "📅", label: "every day", value: "now" }, { pic: "⏪", label: "yesterday", value: "past" }],
          items: [{ label: "We go to the park.", say: "We go to the park.", basket: "now" }, { label: "We went to the zoo.", say: "We went to the zoo.", basket: "past" },
            { label: "I saw a bird.", say: "I saw a bird.", basket: "past" }, { label: "I eat breakfast at seven.", say: "I eat breakfast at seven.", basket: "now" },
            { label: "Mum made a cake.", say: "Mum made a cake.", basket: "past" }, { label: "Dad takes the bus.", say: "Dad takes the bus.", basket: "now" }] },
        { type: "tip", text: "بعضی فعل‌های پرکاربرد گذشته‌شان ed نمی‌گیرد و باید جدا یاد گرفت: go → went، see → saw، eat → ate، have → had، come → came، make → made، take → took، get → got. بازی کنید: شما فعل را بگویید (eat!) و کودک گذشته‌اش را (ate!)؛ بعد یک جمله درباره دیروز بسازد: Yesterday I ate rice." }
      ]
    },
    {
      id: "english-tree-10", subject: "english", level: "tree", emoji: "🐈", title: "Did you …?",
      steps: [
        /* In the kitchen Mum asks Reza two questions: he did his homework (he holds up his book), but he didn't feed
           the cat (he shakes his head); he runs and puts a fish in the cat's bowl and the cat eats. */
        { type: "scene", prompt: "به گفت‌وگو گوش کن", bg: "#fdf0d5",
          parts: { kitchen: { art: "en-kitchen" }, mum: { art: "en-mother", at: [36, 86], s: 1.2 }, reza: { art: "en-reza", at: [96, 86], s: 0.95 },
            book: { art: "en-book", at: inHand("en-reza", [96, 86], 0.95, "R", "hold", 0), s: 0.8, o: 0 },
            cat: { art: "en-cat", at: [140, 88], s: 1.1, flip: 1 }, bowl: { art: "en-plate", at: [128, 88], s: 0.7 }, fish: { art: "🐟", at: inHand("en-reza", [118, 86], 0.95, "R", "point", 0.4), s: 0.4, o: 0 } },
          scenes: [
            { caption: "Did you do your homework, Reza?", key: 1300, do: [].concat(pose("mum", "R", "ask", 0, 500), talk("mum", 0, 1600)) },
            { caption: "Yes, I did. Look!", key: 1600, do: [].concat(pose("mum", "R", "down", 0, 400), pose("reza", "R", "hold", 0, 600), [{ id: "book", to: { o: 1 }, at: 500, dur: 300 }], talk("reza", 0, 1100), face("mum", true, 900)) },
            { caption: "Good! And did you feed the cat?", key: 1400, do: [].concat([{ id: "book", to: { o: 0 }, dur: 300 }], pose("reza", "R", "down", 0, 400), pose("mum", "R", "point", 300, 500), talk("mum", 0, 1600),
              [{ id: "cat.jaw", to: { r: 25 }, at: 1200, dur: 500, yoyo: true, times: 2 }]) },
            { caption: "Oh no! I didn't feed it.", key: 1700, do: [].concat(pose("mum", "R", "down", 0, 400), face("reza", false, 0), shake("reza", 300), talk("reza", 0, 1200)) },
            { caption: "Here you are, kitty!", key: 2800, hold: 4400, do: [].concat(face("reza", true, 0), walk("reza", 118, 0, 1000), pose("reza", "R", "point", 1000, 500), [{ id: "fish", to: { o: 1 }, at: 1300, dur: 200 },
              arc("fish", inHand("en-reza", [118, 86], 0.95, "R", "point", 0.4), [128, 85], 1700, 600, 4), { id: "cat.head", to: { r: 20 }, at: 2400, dur: 400, yoyo: true, times: 6 }], talk("reza", 1000, 1000)) }
          ] },
        { type: "listen", say: "Did you see the film? No, I didn't.", prompt: "گوش کن. فیلم را دید؟",
          options: [{ label: "✅ Yes, he did.", en: "Yes, he did." }, { label: "❌ No, he didn't.", en: "No, he didn't." }], answer: "❌ No, he didn't." },
        { type: "listen", say: "Did you go to the park? Yes, I did. I played on the swings.", quiet: true, prompt: "گوش کن. در پارک چه کرد؟",
          options: [{ pic: "🎠", en: "played on the swings" }, { pic: "⚽", en: "played football" }, { pic: "🍦", en: "ate an ice cream" }], answer: "🎠" },
        { type: "listen", show: "❓", prompt: "کدام سؤال درست است؟",
          options: [{ label: "Did you eat your lunch?", en: "Did you eat your lunch?" }, { label: "Did you ate your lunch?", en: "Did you ate your lunch?" }], answer: "Did you eat your lunch?" },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Did you go to school?", items: ["Did", "you", "go", "to", "school?"] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I didn't see the cat.", items: ["I", "didn't", "see", "the", "cat."] },
        { type: "tip", text: "برای سؤال و منفی در گذشته did می‌آید و فعل به شکل ساده برمی‌گردد: Did you go? (نه Did you went?) و I didn't go. جواب کوتاه: Yes, I did. / No, I didn't. هر روز بعد از مدرسه دو سه سؤال بپرسید: Did you play with your friends? Did you eat your lunch? و کودک جواب کوتاه بدهد." }
      ]
    },
    {
      id: "english-tree-11", subject: "english", level: "tree", emoji: "🥪", title: "قصه بگو",
      steps: [
        /* Mina makes a sandwich in four steps, each one done: she takes the bread, puts the cheese on it, adds a
           tomato, and eats it. The words first, then, after that, finally lead each step. */
        { type: "scene", prompt: "گوش کن: اول، بعد، بعد از آن، آخر", bg: "#fdf0d5",
          parts: { kitchen: { art: "en-kitchen" }, table: { art: "en-table", at: [80, 90], s: 1.3 }, mina: { art: "en-mina", at: [60, 80], s: 1.15 },
            plate: { art: "en-plate", at: [86, 64.2], s: 0.9 }, bread: { art: "🍞", at: [116, 64], s: 0.55 }, cheese: { art: "🧀", at: [126, 64], s: 0.45 }, tom: { art: "🍅", at: [136, 64], s: 0.4 } },
          scenes: [
            { caption: "First, Mina took some bread.", key: 1800, do: [arc("bread", [116, 64], [86, 62.4], 500, 1000, 8)] },
            { caption: "Then she put some cheese on it.", key: 1800, do: [arc("cheese", [126, 64], [86, 58.4], 500, 1000, 10)] },
            { caption: "After that, she added a tomato.", key: 1800, do: [arc("tom", [136, 64], [86, 55.4], 500, 1000, 12)] },
            { caption: "Finally, she ate it. Yum!", key: 2400, do: [].concat(pose("mina", "R", "mouth", 0, 600), [{ id: "plate", to: { o: 0 }, dur: 1 },
              { id: "bread", to: { x: inHand("en-mina", [60, 80], 1.15, "R", "mouth", 0.55)[0], y: inHand("en-mina", [60, 80], 1.15, "R", "mouth", 0.55)[1] }, dur: 600 },
              { id: "cheese", to: { o: 0 }, dur: 300 }, { id: "tom", to: { o: 0 }, dur: 300 }, { id: "mina.mouth", to: { o: 1 }, at: 800, dur: 100 }, { id: "mina.mouth", to: { sy: 0.3 }, at: 900, dur: 1600, yoyo: true, times: 6 },
              { id: "bread", to: { s: 0.3 }, at: 900, dur: 1800 }], face("mina", true, 2600)) }
          ] },
        { type: "order", prompt: "قصه را به ترتیب بچین: اول چه شد، بعد چه شد؟", numbered: true, ltr: true, items: ["🌰", "💧", "🌱", "🌻"] },
        { type: "order", prompt: "کلمه‌ها را به ترتیب قصه بچین", ltr: true, items: ["First", "Then", "After that", "Finally"] },
        { type: "record", pic: "🌰 💧 🌱 🌻", say: "First, the boy planted a seed. Then he watered it. After that, a little plant came up. Finally, there was a big sunflower.",
          prompt: "قصه این چهار تصویر را به انگلیسی بگو. با First شروع کن و با Finally تمام کن. اول به نمونه گوش کن، بعد قصه خودت را ضبط کن.",
          check: ["هر چهار تصویر را گفت؟", "از First، Then، After that و Finally استفاده کرد؟", "فعل‌ها را در گذشته گفت (planted، watered)؟"] },
        { type: "tip", text: "first (اول)، then (بعد)، after that (بعد از آن) و finally (در آخر) قصه را مرتب می‌کنند. با کودک چهار نقاشی از یک کار ساده بکشید (چای درست کردن، کاشتن گلدان) و قصه‌اش را به انگلیسی بگویید. شب‌ها هم بخواهید روزش را با همین کلمه‌ها تعریف کند: First, I went to school. Then …" }
      ]
    },
    {
      id: "english-tree-12", subject: "english", level: "tree", emoji: "📏", title: "بزرگ‌تر، بزرگ‌ترین",
      steps: [
        /* Three children stand side by side, shortest to tallest, and a mark rises to each one's head as it is said;
           then they race and the fastest one gets there first. */
        { type: "scene", prompt: "گوش کن و مقایسه کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, reza: { art: "en-reza", at: [40, 86], s: 0.95 }, arman: { art: "en-arman", at: [80, 86], s: 1.1 }, sara: { art: "en-sara", at: [120, 86], s: 1.3 },
            m1: { art: "en-mark", at: [40, 48.6], o: 0 }, m2: { art: "en-mark", at: [80, 43.6], o: 0 }, m3: { art: "en-mark", at: [120, 37.4], o: 0 } },
          scenes: [
            { caption: "Reza is tall.", key: 1200, do: [{ id: "m1", to: { o: 1 }, at: 300, dur: 400 }, { id: "reza", to: { y: "-2" }, at: 600, dur: 400, yoyo: true, times: 2 }] },
            { caption: "Arman is taller than Reza.", key: 1200, do: [{ id: "m2", to: { o: 1 }, at: 300, dur: 400 }, { id: "arman", to: { y: "-2" }, at: 600, dur: 400, yoyo: true, times: 2 }] },
            { caption: "Sara is the tallest!", key: 1400, do: [].concat([{ id: "m3", to: { o: 1 }, at: 300, dur: 400 }], face("sara", true, 300), jump("sara", 600, 1, 4)) },
            { caption: "Now they run. Who is the fastest? Reza is the fastest!", key: 3000, hold: 5000, do: [].concat([{ id: "m1", to: { o: 0 }, dur: 300 }, { id: "m2", to: { o: 0 }, dur: 300 }, { id: "m3", to: { o: 0 }, dur: 300 },
              { id: "reza", to: { o: 0 }, dur: 300 }, { id: "arman", to: { o: 0 }, dur: 300 }, { id: "sara", to: { o: 0 }, dur: 300 },
              { id: "reza", to: { x: 14, y: 78 }, at: 350, dur: 1 }, { id: "arman", to: { x: 14, y: 84 }, at: 350, dur: 1 }, { id: "sara", to: { x: 14, y: 90 }, at: 350, dur: 1 },
              { id: "reza", to: { o: 1 }, at: 400, dur: 300 }, { id: "arman", to: { o: 1 }, at: 400, dur: 300 }, { id: "sara", to: { o: 1 }, at: 400, dur: 300 }],
              run("reza", 148, 900, 2000), run("arman", 100, 900, 2000), run("sara", 68, 900, 2000), face("reza", true, 2900), jump("reza", 3000, 1, 5)) }
          ] },
        { type: "listen", say: "The elephant is bigger than the horse.", prompt: "گوش کن. کدام درست است؟",
          options: [{ pic: "🐘 > 🐎", en: "the elephant is bigger" }, { pic: "🐎 > 🐘", en: "the horse is bigger" }], answer: "🐘 > 🐎" },
        { type: "listen", say: "Which is the best? The red one is the best.", quiet: true, prompt: "گوش کن. کدام از همه بهتر است؟",
          options: [{ color: RED, en: "the red one" }, { color: BLUE, en: "the blue one" }, { color: GREEN, en: "the green one" }], answer: RED },
        { type: "sort", prompt: "هر صفت را بخوان و گوش کن. «بیشتر» آن با er ساخته می‌شود یا با more؟",
          baskets: [{ label: "-er" }, { label: "more" }],
          items: [{ label: "tall → taller", say: "tall, taller", basket: "-er" }, { label: "big → bigger", say: "big, bigger", basket: "-er" }, { label: "fast → faster", say: "fast, faster", basket: "-er" },
            { label: "beautiful → more beautiful", say: "beautiful, more beautiful", basket: "more" }, { label: "interesting → more interesting", say: "interesting, more interesting", basket: "more" },
            { label: "expensive → more expensive", say: "expensive, more expensive", basket: "more" }] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "My dad is taller than my mum.", items: ["My", "dad", "is", "taller", "than", "my", "mum."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "This is the best day!", items: ["This", "is", "the", "best", "day!"] },
        { type: "tip", text: "برای مقایسه دو چیز er و than می‌آید (taller than) و برای «از همه» the و est (the tallest). صفت‌های بلند more و the most می‌گیرند (more beautiful، the most beautiful). good → better → the best جداست. اعضای خانواده را با هم مقایسه کنید: Dad is taller than me. Grandma is the oldest." }
      ]
    },
    {
      id: "english-tree-13", subject: "english", level: "tree", emoji: "🐎", title: "کدام تندتر است؟",
      steps: [
        { type: "passage", prompt: "متن را بخوان: اسب و شتر",
          text: "Which is faster, a horse or a camel? In a short race, a horse is usually faster. But a camel is better in the desert. It can walk for many days without water, and its wide feet don't sink in the sand. Camels are bigger and taller than horses, too.",
          question: "در یک مسابقه کوتاه کدام معمولاً تندتر است؟", options: ["🐎", "🐫"], answer: "🐎" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Which is faster, a horse or a camel? In a short race, a horse is usually faster. But a camel is better in the desert. It can walk for many days without water, and its wide feet don't sink in the sand. Camels are bigger and taller than horses, too.",
          question: "کدام بی‌آب روزهای زیادی راه می‌رود؟", options: ["🐎", "🐫"], answer: "🐫" },
        { type: "passage", prompt: "این متن را بخوان: جاهای ایران",
          text: "Iran has got high mountains, big deserts and long coasts. Damavand is the highest mountain in Iran. The Lut Desert is one of the hottest places in the world. The Caspian Sea, in the north, is the biggest lake in the world.",
          question: "بلندترین کوه ایران کدام است؟", options: ["دماوند", "سهند", "الوند"], answer: "دماوند" },
        { type: "sort", prompt: "هر جمله را بخوان. با متن‌ها درست است یا نادرست؟",
          baskets: [{ pic: "✅", label: "true", value: "yes" }, { pic: "❌", label: "false", value: "no" }],
          items: [{ label: "A camel is taller than a horse.", say: "A camel is taller than a horse.", basket: "yes" }, { label: "A horse is better in the desert.", say: "A horse is better in the desert.", basket: "no" },
            { label: "Damavand is the highest mountain in Iran.", say: "Damavand is the highest mountain in Iran.", basket: "yes" }, { label: "The Lut Desert is very cold.", say: "The Lut Desert is very cold.", basket: "no" },
            { label: "The Caspian Sea is the biggest lake in the world.", say: "The Caspian Sea is the biggest lake in the world.", basket: "yes" }] },
        { type: "tip", text: "متن‌ها را با هم بخوانید و درباره‌شان سؤال مقایسه‌ای بپرسید: Which is bigger, a camel or a horse? Which is the hottest place in Iran? روی نقشه ایران دماوند، کویر لوت و دریای خزر را پیدا کنید. کودک هم دو حیوان یا دو شهر را با یک جمله مقایسه کند: Tabriz is colder than Bandar Abbas." }
      ]
    },
    {
      id: "english-tree-14", subject: "english", level: "tree", emoji: "🐢", title: "تند و آهسته",
      steps: [
        /* How they move: the rabbit hops across quickly, the tortoise crawls slowly, Mina walks with a full glass
           carefully (slowly, looking at it, not a drop falls), and Reza sings well (notes rise, Mina claps). */
        { type: "scene", prompt: "گوش کن: چطور؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, rabbit: { art: "🐇", at: [-10, 88], s: 1.1 }, tort: { art: "🐢", at: [-10, 88], s: 1 },
            mina: { art: "en-mina", at: [20, 86], s: 1.1, o: 0 }, glass: { art: "🥛", at: inHand("en-mina", [20, 86], 1.1, "R", "ask", 0.5), s: 0.5, o: 0 },
            reza: { art: "en-reza", at: [132, 86], s: 1.1, o: 0 }, n1: { art: "🎵", at: [140, 50], s: 0.5, o: 0 }, n2: { art: "🎵", at: [128, 46], s: 0.4, o: 0 } },
          scenes: [
            { caption: "The rabbit runs quickly.", key: 1100, do: [{ id: "rabbit", path: "M-10 88Q10 76 30 88T70 88T110 88T150 88T190 88", dur: 1800, ease: "linear" }] },
            { caption: "The tortoise walks slowly.", key: 3200, hold: 5200, do: [{ id: "tort", to: { x: 40 }, dur: 5000, ease: "linear" }, { id: "tort", to: { r: 3 }, dur: 5000, yoyo: true, times: 10 }] },
            { caption: "Mina carries a glass of milk carefully.", key: 2600, hold: 5000, do: [].concat([{ id: "tort", to: { o: 0 }, dur: 400 }, { id: "mina", to: { o: 1 }, dur: 400 }], pose("mina", "R", "ask", 0, 1),
              [{ id: "glass", to: { o: 1 }, dur: 400 }, { id: "mina.eyes", to: { x: 0.6, y: 0.4 }, at: 300, dur: 300 }], walk("mina", 70, 500, 3600),
              [{ id: "glass", to: { x: inHand("en-mina", [70, 86], 1.1, "R", "ask", 0.5)[0] }, at: 500, dur: 3600, ease: "linear" }]) },
            { caption: "Reza sings well. Mina claps.", key: 2400, do: [].concat([{ id: "reza", to: { o: 1 }, dur: 400 }, { id: "glass", to: { o: 0 }, dur: 300 }, { id: "mina.eyes", to: { x: 0, y: 0 }, dur: 300 }], pose("mina", "R", "down", 0, 300),
              talk("reza", 400, 2600), [{ id: "n1", to: { o: 1 }, at: 600, dur: 300 }, { id: "n1", to: { y: 34, x: 146 }, at: 600, dur: 2400 }, { id: "n2", to: { o: 1 }, at: 1200, dur: 300 }, { id: "n2", to: { y: 30, x: 122 }, at: 1200, dur: 2400 }], face("reza", true, 400), clapHands("mina", 1600, 2, [70, 62])) }
          ] },
        { type: "listen", say: "The snail moves slowly.", prompt: "گوش کن. کدام؟",
          options: [{ pic: "🐌", en: "the snail" }, { pic: "🐆", en: "the cheetah" }], answer: "🐌" },
        { type: "listen", say: "Please close the door quietly. The baby is sleeping.", quiet: true, prompt: "گوش کن. در را چطور ببندد؟",
          options: [{ pic: "🤫", en: "quietly" }, { pic: "📢", en: "loudly" }, { pic: "⚡", en: "quickly" }], answer: "🤫" },
        { type: "listen", show: "✏️", prompt: "کدام جمله درست است؟",
          options: [{ label: "She writes carefully.", en: "She writes carefully." }, { label: "She writes careful.", en: "She writes careful." }], answer: "She writes carefully." },
        { type: "sort", prompt: "روی هر کدام بزن و گوش کن. تند حرکت می‌کند یا آهسته؟",
          baskets: [{ pic: "🐇", label: "quickly", value: "q" }, { pic: "🐢", label: "slowly", value: "s" }],
          items: [{ pic: "🐆", say: "A cheetah runs quickly.", basket: "q" }, { pic: "🐌", say: "A snail moves slowly.", basket: "s" }, { pic: "🚀", say: "A rocket goes quickly.", basket: "q" },
            { pic: "🦥", say: "A sloth moves slowly.", basket: "s" }, { pic: "🚄", say: "A fast train goes quickly.", basket: "q" }, { pic: "🐛", say: "A caterpillar moves slowly.", basket: "s" }] },
        { type: "tip", text: "قیدها می‌گویند کاری «چطور» انجام می‌شود و بیشترشان با ly ساخته می‌شوند: quick → quickly، slow → slowly، careful → carefully. good جداست: well (He sings well). بازی کنید: شما بگویید Walk slowly! Clap quickly! Speak quietly! و کودک همان‌طور انجام بدهد؛ بعد جایتان عوض شود." }
      ]
    },
    {
      id: "english-tree-15", subject: "english", level: "tree", emoji: "🧳", title: "برنامه‌های من",
      steps: [
        /* Sara's plans for tomorrow: she holds up her bag (visiting Grandma), then a cake to take; clouds come over and
           the sky goes grey (it's going to rain), so she takes her umbrella and opens it. */
        { type: "scene", prompt: "گوش کن: فردا چه می‌شود؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, dim: { art: "en-dim", o: 0 }, c1: { art: "☁", at: [-20, 18], s: 1.4 }, c2: { art: "☁", at: [-40, 26], s: 1.1 },
            house: { art: "🏠", at: [130, 70], s: 1.8 }, sara: { art: "en-sara", at: [56, 86], s: 1.2 },
            bag: { art: "en-bag", at: inHand("en-sara", [56, 86], 1.2, "R", "point", 0), s: 1, o: 0 },
            cake: { art: "en-cake", at: inHand("en-sara", [56, 86], 1.2, "L", "hold", 0.2), s: 0.55, o: 0 },
            umb: { art: "☂", at: inHand("en-sara", [56, 86], 1.2, "R", "pointUp", 1.6), s: 1.6, o: 0 } },
          scenes: [
            { caption: "Tomorrow, I'm going to visit my grandma.", key: 1800, do: [].concat(pose("sara", "R", "point", 0, 500), [{ id: "bag", to: { o: 1 }, at: 500, dur: 300 }, { id: "house", to: { s: 2 }, at: 1000, dur: 500, yoyo: true, times: 2 }], talk("sara", 0, 2000)) },
            { caption: "I'm going to take a cake for her.", key: 1800, do: [].concat(pose("sara", "L", "hold", 0, 500), [{ id: "cake", to: { o: 1 }, at: 500, dur: 300 }], talk("sara", 0, 1800), face("sara", true, 0)) },
            { caption: "Look at the clouds! It's going to rain.", key: 2600, do: [].concat([{ id: "bag", to: { o: 0 }, dur: 300 }, { id: "c1", to: { x: 70 }, dur: 2400 }, { id: "c2", to: { x: 100 }, dur: 2600 }, { id: "dim", to: { o: 1 }, at: 800, dur: 1600 }, { id: "sara.eyes", to: { y: -0.8 }, at: 1200, dur: 300 }], pose("sara", "R", "pointUp", 1400, 500)) },
            { caption: "I'm going to take my umbrella.", key: 1700, do: [].concat([{ id: "sara.eyes", to: { y: 0 }, dur: 300 }, { id: "umb", to: { o: 1 }, at: 400, dur: 400 }], talk("sara", 0, 1600)) }
          ] },
        { type: "listen", say: "What are you going to do tomorrow? I'm going to play football.", prompt: "گوش کن. فردا چه کار می‌کند؟",
          options: [{ pic: "⚽", en: "play football" }, { pic: "🏊", en: "go swimming" }, { pic: "🎨", en: "paint" }], answer: "⚽" },
        { type: "listen", say: "My parents are going to buy a new car.", quiet: true, prompt: "گوش کن. چه می‌خرند؟",
          options: [{ pic: "🚗", en: "a car" }, { pic: "🚲", en: "a bike" }, { pic: "🏠", en: "a house" }], answer: "🚗" },
        { type: "listen", show: "🌧️", prompt: "به تصویر نگاه کن. کدام جمله درست است؟",
          options: [{ label: "It's going to rain.", en: "It's going to rain." }, { label: "It's going to be sunny.", en: "It's going to be sunny." }], answer: "It's going to rain." },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "I'm going to visit my grandma.", items: ["I'm", "going", "to", "visit", "my", "grandma."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "What are you going to do?", items: ["What", "are", "you", "going", "to", "do?"] },
        { type: "tip", text: "be going to برای برنامه‌ای است که از قبل تصمیمش را گرفته‌ایم (I'm going to visit Grandma.) و برای چیزی که نشانه‌اش را می‌بینیم (Look at the clouds! It's going to rain.). پنجشنبه‌ها با هم برنامه آخر هفته را به انگلیسی بگویید: On Friday we're going to go to the park. What are you going to do?" }
      ]
    },
    {
      id: "english-tree-16", subject: "english", level: "tree", emoji: "🛍️", title: "فکر می‌کنم …",
      steps: [
        /* Mum walks slowly with two heavy bags (she leans); Reza says he'll help and one bag goes to his hand; the sky
           goes grey and Mum looks up (I think it will rain); they walk home together quickly. */
        { type: "scene", prompt: "گوش کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, dim: { art: "en-dim", o: 0 }, mum: { art: "en-mother", at: [-20, 86], s: 1.2 }, reza: { art: "en-reza", at: [110, 86], s: 0.95 },
            b1: { art: "🛍", at: [-27, 68], s: 0.6 }, b2: { art: "🛍", at: [-13, 68], s: 0.6 } },
          scenes: [
            { caption: "These bags are very heavy!", key: 2600, hold: 4400, do: [{ id: "mum", walk: [60, 86], dur: 3000 }, { id: "b1", to: { x: 53 }, dur: 3000 }, { id: "b2", to: { x: 67 }, dur: 3000 },
              { id: "mum", to: { r: -4 }, at: 2900, dur: 500 }] },
            { caption: "I'll help you, Mum!", key: 2400, do: [].concat([{ id: "mum", to: { r: 0 }, dur: 400 }], walk("reza", 80, 0, 1200), talk("reza", 0, 1200), [arc("b2", [67, 68], [inHand("en-reza", [80, 86], 0.95, "L", "down", 0.6)[0], 72], 1400, 700, 4)], face("mum", true, 1600)) },
            { caption: "Look at the sky. I think it will rain.", key: 2000, do: [].concat([{ id: "dim", to: { o: 1 }, dur: 1400 }, { id: "mum.eyes", to: { y: -0.8 }, at: 800, dur: 300 }], talk("mum", 600, 1800)) },
            { caption: "Let's go. We'll be home soon.", key: 2200, do: [].concat([{ id: "mum.eyes", to: { y: 0 }, dur: 300 }, { id: "mum", to: { flip: 1 }, at: 300, dur: 1 }, { id: "reza", to: { flip: 1 }, at: 300, dur: 1 }],
              [{ id: "mum", walk: [-30, 86], at: 400, dur: 2400 }, { id: "b1", to: { x: -35 }, at: 400, dur: 2400 }], walk("reza", -10, 400, 2400), [{ id: "b2", to: { x: -10 + (inHand("en-reza", [80, 86], 0.95, "L", "down", 0.6)[0] - 80) }, at: 400, dur: 2400 }]) }
          ] },
        { type: "listen", say: "This box is heavy. I'll carry it for you.", prompt: "گوش کن. چه کار می‌کند؟",
          options: [{ pic: "📦💪", en: "carry the box" }, { pic: "🚪", en: "open the door" }, { pic: "🥪", en: "make a sandwich" }], answer: "📦💪" },
        { type: "listen", say: "I think it will be sunny tomorrow.", quiet: true, prompt: "گوش کن. فکر می‌کند فردا هوا چطور است؟",
          options: [{ pic: "☀️", en: "sunny" }, { pic: "🌧️", en: "rainy" }, { pic: "❄️", en: "snowy" }], answer: "☀️" },
        { type: "sort", prompt: "هر جمله را بخوان. کمک پیشنهاد می‌کند یا حدس می‌زند؟",
          baskets: [{ pic: "🤝", label: "I'll help", value: "offer" }, { pic: "🤔", label: "I think …", value: "guess" }],
          items: [{ label: "I'll open the door for you.", say: "I'll open the door for you.", basket: "offer" }, { label: "I think she'll win.", say: "I think she'll win.", basket: "guess" },
            { label: "I'll carry your bag.", say: "I'll carry your bag.", basket: "offer" }, { label: "It will be cold tomorrow.", say: "It will be cold tomorrow.", basket: "guess" },
            { label: "I'll make you a sandwich.", say: "I'll make you a sandwich.", basket: "offer" }, { label: "I think you'll like this book.", say: "I think you'll like this book.", basket: "guess" }] },
        { type: "tip", text: "will (کوتاهش 'll) برای کمکی است که همین الان پیشنهاد می‌دهیم (I'll help you!) و برای حدس درباره آینده (I think it will rain.). وقتی در خانه کاری هست، کودک به انگلیسی پیشنهاد کمک بدهد: I'll set the table! I'll feed the cat! و شب‌ها حدس بزنید فردا هوا چطور است." }
      ]
    },
    {
      id: "english-tree-17", subject: "english", level: "tree", emoji: "🏊", title: "باید و نباید",
      steps: [
        /* At the pool: the teacher talks and the children listen; Reza starts to run, the teacher holds up her hand
           and he stops and walks; a swimming cap goes on his head; then he goes down into the water and swims. */
        { type: "scene", prompt: "گوش کن: قانون‌های استخر", bg: "#cfeaf7",
          parts: { pool: { art: "en-pool" }, teacher: { art: "en-teacher", at: [30, 62], s: 0.9 }, mina: { art: "en-mina", at: [70, 62], s: 0.85 },
            reza: { art: "en-reza", at: [100, 62], s: 0.85 }, cap: { art: "🧢", at: [100, 26], s: 0.5, o: 0 }, water: { art: "en-water" } },
          scenes: [
            { caption: "At the pool, you must listen to the teacher.", key: 1600, do: [].concat(talk("teacher", 0, 2200), pose("teacher", "R", "ask", 0, 500), [{ id: "mina.eyes", to: { x: -0.6 }, at: 300, dur: 300 }, { id: "reza.eyes", to: { x: -0.6 }, at: 300, dur: 300 }]) },
            { caption: "You mustn't run! Walk, please.", key: 2200, hold: 4400, do: [].concat(pose("teacher", "R", "stop", 0, 400), run("reza", 124, 0, 800), [{ id: "reza", to: { r: 0 }, at: 800, dur: 1 }], talk("teacher", 600, 1400), face("reza", false, 900),
              walk("reza", 132, 1700, 1600)) },
            { caption: "You have to wear a swimming cap.", key: 1800, do: [].concat(pose("teacher", "R", "down", 0, 400), face("reza", true, 0), [{ id: "cap", to: { x: 132, o: 1 }, at: 300, dur: 1 }, { id: "cap", to: { y: 38.6 }, at: 400, dur: 900, ease: "out" }]) },
            { caption: "Now you can swim!", key: 2200, do: [{ id: "reza", to: { y: 80 }, dur: 900 }, { id: "cap", to: { y: 56.6 }, dur: 900 }, { emit: "drop", where: [132, 62], spread: [14, 2], rise: -10, n: 10, at: 700, dur: 400, life: 900 },
              { id: "reza.armL", to: { r: 150 }, at: 1100, dur: 500, yoyo: true, times: 6 }, { id: "reza.armR", to: { r: -150 }, at: 1350, dur: 500, yoyo: true, times: 6 }] }
          ] },
        { type: "listen", say: "I've got a cold. What should I do? You should drink some warm tea.", prompt: "گوش کن. چه کار کند؟",
          options: [{ pic: "🍵", en: "drink warm tea" }, { pic: "🍦", en: "eat ice cream" }, { pic: "🏊", en: "go swimming" }], answer: "🍵" },
        { type: "listen", say: "You mustn't cross the road at a red light.", quiet: true, prompt: "گوش کن. کدام کار را نباید کرد؟",
          options: [{ pic: "🚦🔴🚶", en: "cross at a red light" }, { pic: "🚦🟢🚶", en: "cross at a green light" }], answer: "🚦🔴🚶" },
        { type: "sort", prompt: "هر جمله را بخوان. باید (must) یا نباید (mustn't)؟",
          baskets: [{ pic: "✅", label: "must", value: "must" }, { pic: "⛔", label: "mustn't", value: "not" }],
          items: [{ label: "wear a seat belt in the car", say: "You must wear a seat belt in the car.", basket: "must" }, { label: "run near the pool", say: "You mustn't run near the pool.", basket: "not" },
            { label: "wash your hands before you eat", say: "You must wash your hands before you eat.", basket: "must" }, { label: "touch hot pans", say: "You mustn't touch hot pans.", basket: "not" },
            { label: "talk in the library", say: "You mustn't talk loudly in the library.", basket: "not" }, { label: "be kind to animals", say: "You must be kind to animals.", basket: "must" }] },
        { type: "tip", text: "must و have to یعنی «باید» (قانون است)، mustn't یعنی «نباید» و should برای پند و پیشنهاد است (You should sleep early.). قانون‌های خانه را با هم به انگلیسی بنویسید و به در یخچال بزنید: We must clean our room. We mustn't shout. وقتی کسی سرما خورده بپرسید What should he do?" }
      ]
    },
    {
      id: "english-tree-18", subject: "english", level: "tree", emoji: "🛒", title: "چقدر؟ چندتا؟",
      steps: [
        { type: "listen", say: "How many eggs are there? There are six eggs.", prompt: "گوش کن. چندتا تخم‌مرغ؟",
          options: [{ label: "🥚🥚🥚🥚🥚🥚", en: "six eggs" }, { label: "🥚🥚🥚", en: "three eggs" }, { label: "🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚", en: "ten eggs" }], answer: "🥚🥚🥚🥚🥚🥚" },
        { type: "listen", say: "Have we got any milk? No, we haven't got any milk.", quiet: true, prompt: "گوش کن. شیر داریم؟",
          options: [{ label: "🥛 ✅", en: "Yes, we have." }, { label: "🥛 ❌", en: "No, we haven't." }], answer: "🥛 ❌" },
        { type: "listen", say: "We need some rice and a lot of apples.", quiet: true, prompt: "به فهرست خرید گوش کن. چه لازم دارند؟",
          options: [{ label: "🍚 + 🍎🍎🍎🍎🍎", en: "some rice and a lot of apples" }, { label: "🍞 + 🍌", en: "some bread and a banana" }, { label: "🧀 + 🍎", en: "some cheese and an apple" }], answer: "🍚 + 🍎🍎🍎🍎🍎" },
        { type: "sort", prompt: "روی هر کدام بزن و گوش کن. می‌شود شمرد (How many?) یا نه (How much?)",
          baskets: [{ label: "How many?", value: "many" }, { label: "How much?", value: "much" }],
          items: [{ pic: "🍎", say: "apples", basket: "many" }, { pic: "🥛", say: "milk", basket: "much" }, { pic: "🥚", say: "eggs", basket: "many" },
            { pic: "💧", say: "water", basket: "much" }, { pic: "🍌", say: "bananas", basket: "many" }, { pic: "🍚", say: "rice", basket: "much" }] },
        { type: "sort", prompt: "هر جمله را بخوان. جای خالی some است یا any؟",
          baskets: [{ label: "some" }, { label: "any" }],
          items: [{ label: "I've got ___ bread.", say: "I've got some bread.", basket: "some" }, { label: "Is there ___ juice?", say: "Is there any juice?", basket: "any" },
            { label: "We haven't got ___ eggs.", say: "We haven't got any eggs.", basket: "any" }, { label: "There are ___ apples.", say: "There are some apples.", basket: "some" }] },
        { type: "tip", text: "چیزهایی که می‌شود شمرد (apples، eggs) با How many? و چیزهایی که نمی‌شود (milk، water، rice) با How much? پرسیده می‌شوند. some در جمله مثبت و any در سؤال و منفی می‌آید. فهرست خرید هفتگی را با هم به انگلیسی بنویسید و در آشپزخانه بپرسید: How many eggs have we got? Have we got any cheese?" }
      ]
    },
    {
      id: "english-tree-19", subject: "english", level: "tree", emoji: "🎒", title: "مال من، مال تو",
      steps: [
        { type: "listen", say: "Whose bag is this? It's mine.", show: "🎒", prompt: "گوش کن. کیف مال کیست؟",
          options: [{ pic: "🙋", en: "mine", value: "mine" }, { pic: "👉", en: "yours", value: "yours" }], answer: "mine" },
        { type: "listen", say: "Please give the ball to him.", quiet: true, prompt: "گوش کن. توپ را به چه کسی بدهد؟",
          options: [{ pic: "👦", en: "him" }, { pic: "👧", en: "her" }, { pic: "👫", en: "them" }], answer: "👦" },
        { type: "listen", say: "Grandma is coming. Let's help her.", quiet: true, prompt: "گوش کن. به چه کسی کمک کنند؟",
          options: [{ pic: "👵", en: "her" }, { pic: "👴", en: "him" }, { pic: "👨‍👩‍👧", en: "them" }], answer: "👵" },
        { type: "pairs", prompt: "هر کلمه را با جفتش جفت کن: I → me",
          pairs: [[{ label: "I", say: "I" }, { label: "me", say: "me" }], [{ label: "he", say: "he" }, { label: "him", say: "him" }], [{ label: "she", say: "she" }, { label: "her", say: "her" }],
            [{ label: "we", say: "we" }, { label: "us", say: "us" }], [{ label: "they", say: "they" }, { label: "them", say: "them" }]] },
        { type: "pairs", prompt: "این‌ها را هم جفت کن: my → mine",
          pairs: [[{ label: "my", say: "my" }, { label: "mine", say: "mine" }], [{ label: "your", say: "your" }, { label: "yours", say: "yours" }],
            [{ label: "her", say: "her" }, { label: "hers", say: "hers" }], [{ label: "our", say: "our" }, { label: "ours", say: "ours" }]] },
        { type: "listen", show: "📕", prompt: "کدام جمله درست است؟",
          options: [{ label: "This book is mine.", en: "This book is mine." }, { label: "This book is my.", en: "This book is my." }], answer: "This book is mine." },
        { type: "tip", text: "بعد از فعل، I و he و she و we و they به me، him، her، us و them تبدیل می‌شوند: Help me! Look at him. و بدون اسم بعدش، my و your به mine و yours: It's my bag → It's mine. بازی «مال کیست؟»: چند وسیله از اعضای خانواده را روی میز بگذارید و بپرسید Whose is this? و کودک بگوید It's Dad's. It's mine. It's hers." }
      ]
    },
    {
      id: "english-tree-20", subject: "english", level: "tree", emoji: "❔", title: "چرا؟ چون …",
      steps: [
        /* Reasons that can be seen: Reza runs in the hot sun (drops of sweat fly); he drinks a glass of water (the
           water goes down) because he is thirsty; the sky goes grey, it rains, and Sara opens her umbrella. */
        { type: "scene", prompt: "گوش کن: چرا؟ چون …", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [132, 20], s: 1.2 }, dim: { art: "en-dim", o: 0 }, sara: { art: "en-sara", at: [134, 86], s: 1.1 },
            umb: { art: "☂", at: inHand("en-sara", [134, 86], 1.1, "L", "pointUp", 1.6), s: 1.6, o: 0 },
            reza: { art: "en-reza", at: [-10, 86], s: 1.1 }, glass: { art: "🥛", at: inHand("en-reza", [70, 86], 1.1, "R", "mouth", 0.5), s: 0.5, o: 0 } },
          scenes: [
            { caption: "Reza is running. It's very hot today.", key: 1900, do: [].concat(run("reza", 70, 0, 2000), [{ emit: "drop", from: "reza", where: [0, -34], spread: [8, 3], rise: 6, n: 8, at: 600, dur: 1600, life: 700 }, { id: "sun", to: { r: 30 }, dur: 2200 }]) },
            { caption: "Why is he drinking water? Because he's thirsty.", key: 2200, hold: 4800, do: [].concat(pose("reza", "R", "mouth", 0, 500), [{ id: "glass", to: { o: 1 }, at: 400, dur: 200 }, { id: "reza.mouth", to: { o: 1 }, at: 800, dur: 100 },
              { id: "glass", to: { r: -40 }, at: 800, dur: 1600 }, { id: "reza.mouth", to: { o: 0 }, at: 2600, dur: 100 }], face("reza", true, 2700)) },
            { caption: "Why is Sara opening her umbrella? Because it's raining.", key: 2600, hold: 5000, do: [].concat([{ id: "glass", to: { o: 0 }, dur: 300 }], pose("reza", "R", "down", 0, 400), [{ id: "sun", to: { o: 0 }, dur: 900 }, { id: "dim", to: { o: 1 }, dur: 1200 },
              { emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 36, at: 600, dur: 3600, life: 1100 }], pose("sara", "L", "pointUp", 1400, 500), [{ id: "umb", to: { o: 1 }, at: 1700, dur: 400 }]) }
          ] },
        { type: "listen", say: "How often do you go swimming? Twice a week.", prompt: "گوش کن. هفته‌ای چند بار؟",
          options: [{ label: "🏊 ✅✅", en: "twice a week" }, { label: "🏊 ✅", en: "once a week" }, { label: "🏊 ✅✅✅✅✅✅✅", en: "every day" }], answer: "🏊 ✅✅" },
        { type: "listen", say: "Which do you like, cats or dogs? I like dogs.", quiet: true, prompt: "گوش کن. کدام را دوست دارد؟",
          options: [{ pic: "🐱", en: "cats" }, { pic: "🐶", en: "dogs" }], answer: "🐶" },
        { type: "listen", say: "Why are you happy? Because it's my birthday!", quiet: true, prompt: "گوش کن. چرا خوشحال است؟",
          options: [{ pic: "🎂", en: "it's my birthday" }, { pic: "🌧️", en: "it's raining" }, { pic: "🤒", en: "I'm ill" }], answer: "🎂" },
        { type: "order", prompt: "دو جمله را با because به هم وصل کن. کلمه‌ها را به ترتیب بچین", ltr: true, say: "I'm wearing a coat because it's cold.", items: ["I'm", "wearing", "a", "coat", "because", "it's", "cold."] },
        { type: "order", prompt: "گوش کن و کلمه‌ها را به ترتیب بچین", ltr: true, say: "Why is the baby crying?", items: ["Why", "is", "the", "baby", "crying?"] },
        { type: "tip", text: "Why? (چرا؟) را با Because … (چون …) جواب می‌دهیم: Why are you tired? Because I played all day. because دو جمله را به هم وصل می‌کند. How often? یعنی «هر چند وقت یک بار» (every day، twice a week) و Which? یعنی «کدام». روزی چند بار از کودک بپرسید Why? و بخواهید با because جواب کامل بدهد." }
      ]
    },
    {
      id: "english-tree-21", subject: "english", level: "tree", emoji: "🏜️", title: "دنیای اطراف",
      steps: [
        /* A trip across a world wider than the stage: Reza walks and the camera goes with him, from a forest of tall
           trees, past a river flowing beside the path, to a hot desert with a camel; the far mountains slide by more
           slowly. */
        { type: "scene", prompt: "گوش کن و ببین", bg: "#cfeaf7",
          parts: { land: { art: "en-world-land" }, hills: { art: "en-far-hills", depth: 0.3 },
            t1: { art: "en-tree", at: [20, 70], s: 0.8 }, t2: { art: "🌲", at: [44, 72], s: 1.8 }, t3: { art: "en-tree", at: [70, 72], s: 0.9 }, t4: { art: "🌲", at: [96, 70], s: 1.6 }, t5: { art: "🌲", at: [124, 72], s: 2 },
            camel: { art: "🐫", at: [420, 74], s: 2 }, sun: { art: "☀", at: [440, 18], s: 1.2 },
            reza: { art: "en-reza", at: [40, 88], s: 1 } },
          scenes: [
            { caption: "This is a forest. There are lots of tall trees.", key: 1800, do: [].concat(walk("reza", 70, 0, 1800), [{ id: "reza.eyes", to: { y: -0.6 }, at: 1800, dur: 300 }]) },
            { caption: "This is a river. The water is cold and clean.", key: 3600, hold: 5000, do: [].concat([{ id: "reza.eyes", to: { y: 0 }, dur: 300 }, { cam: { x: 240 }, at: 200, dur: 3400 }], walk("reza", 250, 200, 3400)) },
            { caption: "This is a desert. It's very hot and dry.", key: 3600, hold: 5000, do: [].concat([{ cam: { x: 400 }, at: 200, dur: 3400 }], walk("reza", 386, 200, 3400), [{ id: "sun", to: { r: 30 }, at: 2000, dur: 2400 }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "🌲", en: "forest" }, { pic: "🏞️", en: "river" }, { pic: "🏜️", en: "desert" }, { pic: "⛰️", en: "mountain" }, { pic: "🌊", en: "sea" }, { pic: "🏝️", en: "island" }] },
        { type: "words", show: true, prompt: "از چه ساخته شده؟ روی هر تصویر بزن و گوش کن.", words: [{ pic: "🪵", en: "wood" }, { pic: "🔩", en: "metal" }, { pic: "🪟", en: "glass" }, { pic: "🧱", en: "brick" }, { pic: "🥤", en: "plastic" }] },
        { type: "listen", say: "It's made of glass.", prompt: "گوش کن. کدام از شیشه است؟",
          options: [{ pic: "🪟", en: "a window" }, { pic: "🪑", en: "a chair" }, { pic: "🥄", en: "a spoon" }], answer: "🪟" },
        { type: "listen", say: "There are lots of camels in the desert.", quiet: true, prompt: "گوش کن. کجا؟",
          options: [{ pic: "🏜️", en: "the desert" }, { pic: "🌲", en: "the forest" }, { pic: "🌊", en: "the sea" }], answer: "🏜️" },
        { type: "sort", prompt: "روی هر کدام بزن و گوش کن. از چه ساخته شده؟",
          baskets: [{ pic: "🪵", label: "wood", value: "wood" }, { pic: "🔩", label: "metal", value: "metal" }, { pic: "🪟", label: "glass", value: "glass" }],
          items: [{ pic: "✏️", say: "a pencil", basket: "wood" }, { pic: "🔑", say: "a key", basket: "metal" }, { pic: "🥛", say: "a glass of milk", basket: "glass" },
            { pic: "🥄", say: "a spoon", basket: "metal" }, { pic: "🪑", say: "a wooden chair", basket: "wood" }, { pic: "🕶️", say: "sunglasses", basket: "glass" }] },
        { type: "tip", text: "در خانه بگردید و بپرسید What's it made of? و کودک جواب بدهد: It's made of wood. It's made of metal. در سفر یا در کتاب‌ها هم جاها را به انگلیسی نام ببرید: a forest، a river، a desert، a mountain. می‌توانید با هم یک دفترچه «جاهای ایران» بسازید: Dasht-e Kavir is a desert. Hyrcanian forests are in the north." }
      ]
    },
    {
      id: "english-tree-22", subject: "english", level: "tree", emoji: "🚆", title: "سفر",
      steps: [
        /* At the station: Arman and his dad walk to the train, Dad holds up the ticket, Arman points at the map, they
           get on, and the train pulls out (its wheels turn and it leaves the stage). */
        { type: "scene", prompt: "گوش کن: سفر با قطار", bg: "#cfeaf7",
          parts: { wall: { art: "en-station" }, track: { art: "read-track", at: [0, 8] },
            wagon: { art: "read-wagon", at: [58, 80], s: 2.4, look: { c: "#5aa36a" } }, engine: { art: "read-engine", at: [122, 80], s: 2.4 },
            map: { art: "🗺", at: [140, 30], s: 1.1 }, dad: { art: "en-father", at: [-30, 88], s: 1 }, arman: { art: "en-arman", at: [-12, 88], s: 0.95 },
            ticket: { art: "en-ticket", at: inHand("en-father", [30, 88], 1, "R", "hold", 0.4), s: 1, o: 0 } },
          scenes: [
            { caption: "We're at the station. Here's our train!", key: 2200, do: [].concat(walk("dad", 30, 0, 2000), walk("arman", 48, 0, 2000)) },
            { caption: "This is our ticket.", key: 1500, do: [].concat(pose("dad", "R", "hold", 0, 500), [{ id: "ticket", to: { o: 1 }, at: 500, dur: 300 }], talk("dad", 0, 1400)) },
            { caption: "Look at the map. We're going to Mashhad.", key: 1900, do: [].concat([{ id: "ticket", to: { o: 0 }, dur: 300 }], pose("dad", "R", "down", 0, 400), pose("arman", "R", "pointUp", 300, 500),
              [{ id: "map", to: { s: 1.3 }, at: 900, dur: 500, yoyo: true, times: 2 }], talk("arman", 300, 1600)) },
            { caption: "They get on the train. Now it's leaving. Goodbye!", key: 3000, hold: 5000, do: [].concat(pose("arman", "R", "down", 0, 400), [{ id: "dad", walk: [56, 88], dur: 900 }, { id: "arman", walk: [66, 88], dur: 900 }, { id: "dad", to: { o: 0 }, at: 900, dur: 500 }, { id: "arman", to: { o: 0 }, at: 900, dur: 500 },
              { id: "engine", to: { x: 262 }, at: 1400, dur: 3000, ease: "in" }, { id: "wagon", to: { x: 198 }, at: 1400, dur: 3000, ease: "in" },
              { id: "engine.wheel1", to: { r: 720 }, at: 1400, dur: 3000, ease: "in" }, { id: "engine.wheel2", to: { r: 720 }, at: 1400, dur: 3000, ease: "in" },
              { id: "wagon.wheel1", to: { r: 720 }, at: 1400, dur: 3000, ease: "in" }, { id: "wagon.wheel2", to: { r: 720 }, at: 1400, dur: 3000, ease: "in" }]) }
          ] },
        { type: "words", show: true, words: [{ pic: "✈️", en: "airport" }, { pic: "🚉", en: "station" }, { pic: "🎫", en: "ticket" }, { pic: "🗺️", en: "map" }, { pic: "🧳", en: "suitcase" }, { pic: "🛂", en: "passport" }] },
        { type: "listen", say: "Where's the plane? It's at the airport.", prompt: "گوش کن. کجا؟",
          options: [{ pic: "✈️", en: "the airport" }, { pic: "🚉", en: "the station" }, { pic: "🏫", en: "the school" }], answer: "✈️" },
        { type: "listen", say: "Hi! I'm Yuki. I'm from Japan. I'm Japanese.", quiet: true, prompt: "گوش کن. یوکی اهل کجاست؟",
          options: [{ label: "Japan", en: "Japan" }, { label: "China", en: "China" }, { label: "India", en: "India" }], answer: "Japan" },
        { type: "pairs", prompt: "هر پرچم را با کلمه‌اش جفت کن. روی هر کدام بزن و گوش کن.",
          pairs: [[{ flag: "jp", say: "Japan" }, { label: "Japanese", say: "Japanese" }], [{ flag: "tr", say: "Turkey" }, { label: "Turkish", say: "Turkish" }],
            [{ flag: "fr", say: "France" }, { label: "French", say: "French" }], [{ flag: "cn", say: "China" }, { label: "Chinese", say: "Chinese" }]] },
        { type: "tip", text: "کشورها و ملیت‌ها در انگلیسی با حرف بزرگ نوشته می‌شوند: Iran → Iranian، Japan → Japanese، France → French. روی نقشه دنیا چند کشور را پیدا کنید و بپرسید Where is she from? What language do they speak? اگر سفری در پیش دارید، کلمه‌های ticket، station، airport و suitcase را با هم تمرین کنید." }
      ]
    },
    {
      id: "english-tree-23", subject: "english", level: "tree", emoji: "🔬", title: "درس‌های مدرسه",
      steps: [
        { type: "words", show: true, words: [{ pic: "➗", en: "maths" }, { pic: "🔬", en: "science" }, { pic: "🎨", en: "art" }, { pic: "📜", en: "history" }, { pic: "🌍", en: "geography" }, { pic: "🎵", en: "music" }, { pic: "⚽", en: "PE" }, { pic: "🔤", en: "English" }] },
        { type: "listen", say: "What's your favourite subject? My favourite subject is science.", prompt: "گوش کن. درس محبوبش چیست؟",
          options: [{ pic: "🔬", en: "science" }, { pic: "🎨", en: "art" }, { pic: "➗", en: "maths" }], answer: "🔬" },
        { type: "listen", say: "On Tuesday we've got history and music.", quiet: true, prompt: "گوش کن. سه‌شنبه چه درس‌هایی دارند؟",
          options: [{ label: "📜 🎵", en: "history and music" }, { label: "➗ 🔬", en: "maths and science" }, { label: "🎨 ⚽", en: "art and PE" }], answer: "📜 🎵" },
        { type: "listen", say: "In this lesson, we draw and paint.", quiet: true, prompt: "گوش کن. کدام درس است؟",
          options: [{ pic: "🎨", en: "art" }, { pic: "🌍", en: "geography" }, { pic: "➗", en: "maths" }], answer: "🎨" },
        { type: "pairs", prompt: "هر تصویر را با اسم درسش جفت کن",
          pairs: [[{ pic: "➗", say: "maths" }, { label: "maths", say: "maths" }], [{ pic: "🔬", say: "science" }, { label: "science", say: "science" }],
            [{ pic: "🌍", say: "geography" }, { label: "geography", say: "geography" }], [{ pic: "🎵", say: "music" }, { label: "music", say: "music" }]] },
        { type: "tip", text: "از کودک بپرسید What's your favourite subject? Why? و کمکش کنید با because جواب بدهد: I like art because I love painting. برنامه هفتگی مدرسه‌اش را با هم به انگلیسی بنویسید: On Saturday: maths, Persian, science. اسم درس‌ها در انگلیسی با حرف کوچک نوشته می‌شود، جز English." }
      ]
    },
    {
      id: "english-tree-24", subject: "english", level: "tree", emoji: "📢", title: "گوش کن: پیام‌ها",
      steps: [
        { type: "listen", say: "The train to Shiraz leaves at half past four from platform two.", prompt: "به اعلام ایستگاه گوش کن. قطار شیراز ساعت چند حرکت می‌کند؟",
          options: [{ pic: "🕓", en: "four o'clock" }, { pic: "🕟", en: "half past four" }, { pic: "🕝", en: "half past two" }], answer: "🕟" },
        { type: "listen", say: "The train to Shiraz leaves at half past four from platform two.", quiet: true, prompt: "دوباره گوش کن. از کدام سکو؟",
          options: [{ label: "platform 1", en: "platform one" }, { label: "platform 2", en: "platform two" }, { label: "platform 4", en: "platform four" }], answer: "platform 2" },
        { type: "listen", say: "My name is Arash. That's A, R, A, S, H.", prompt: "گوش کن. اسمش چطور نوشته می‌شود؟",
          options: [{ label: "Arash", en: "Arash" }, { label: "Arish", en: "Arish" }, { label: "Aras", en: "Aras" }], answer: "Arash" },
        { type: "listen", say: "Good morning, class. Please open your books at page twelve.", quiet: true, prompt: "گوش کن. کتاب را کدام صفحه باز کنند؟",
          options: [{ label: "page 2", en: "page two" }, { label: "page 12", en: "page twelve" }, { label: "page 20", en: "page twenty" }], answer: "page 12" },
        { type: "listen", say: "Hello, everyone. The library closes at six o'clock today. Thank you.", quiet: true, prompt: "گوش کن. کتابخانه امروز ساعت چند بسته می‌شود؟",
          options: [{ pic: "🕕", en: "six o'clock" }, { pic: "🕖", en: "seven o'clock" }, { pic: "🕔", en: "five o'clock" }], answer: "🕕" },
        { type: "listen", say: "Tickets for the museum are fifteen thousand tomans. Children under six are free.", quiet: true, prompt: "گوش کن. بچه‌های زیر شش سال چقدر می‌دهند؟",
          options: [{ label: "free", en: "free" }, { label: "15,000 tomans", en: "fifteen thousand tomans" }, { label: "6,000 tomans", en: "six thousand tomans" }], answer: "free" },
        { type: "tip", text: "در پیام‌ها و اعلام‌ها لازم نیست همه کلمه‌ها را بفهمیم؛ کافی است چیزی را که لازم داریم بگیریم: ساعت، عدد، اسم. قبل از گوش دادن بپرسید «دنبال چه می‌گردیم؟». بازی کنید: شما یک پیام کوتاه انگلیسی بگویید (The bus comes at eight.) و کودک فقط عدد یا ساعت را بگوید. هجی کردن اسم‌ها را هم تمرین کنید: How do you spell your name?" }
      ]
    },
    {
      id: "english-tree-25", subject: "english", level: "tree", emoji: "🌈", title: "گوش کن: قصه",
      steps: [
        /* A story told in the past: a family picnic in the park on a sunny day (the rug, the basket, a melon); clouds
           come and it rains; they run under the big tree; the rain stops and a rainbow comes up; they finish lunch. */
        { type: "scene", prompt: "به قصه گوش کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [30, 20], s: 1.1 }, dim: { art: "en-dim", o: 0 }, rainbow: { art: "sci-rainbow", at: [80, 60], s: 1.4, o: 0 },
            c1: { art: "sci-cloud-grey", at: [-30, 16], s: 1.3 }, c2: { art: "sci-cloud-grey", at: [-60, 26] },
            tree: { art: "en-tree", at: [136, 88], s: 1.2 }, rug: { art: "en-rug", at: [50, 88] }, basket: { art: "🧺", at: [40, 86], s: 0.7 }, melon: { art: "🍉", at: [58, 86], s: 0.6 },
            dad: { art: "en-father", at: [22, 86] }, mum: { art: "en-mother", at: [76, 86], s: 1.15 }, sara: { art: "en-sara", at: [96, 86], s: 1 } },
          scenes: [
            { caption: "Last Friday, Sara and her parents had a picnic in the park. It was sunny and warm.", key: 1800, hold: 5000, do: [].concat(face("sara", true, 0), [{ id: "sun", to: { r: 30 }, dur: 3000 }], wave("sara", "R", 600, 1400)) },
            { caption: "Suddenly, big grey clouds came, and it started to rain.", key: 2600, hold: 5200, do: [].concat([{ id: "c1", to: { x: 50 }, dur: 2000 }, { id: "c2", to: { x: 100 }, dur: 2200 }, { id: "sun", to: { o: 0 }, dur: 1200 }, { id: "dim", to: { o: 1 }, dur: 1400 },
              { emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 40, at: 800, dur: 4000, life: 1100 }], face("sara", false, 1400)) },
            { caption: "They took the basket and ran under the big tree.", key: 2000, hold: 4600, do: [].concat(run("dad", 120, 0, 1800), run("mum", 132, 0, 1600), run("sara", 146, 0, 1400),
              [{ id: "basket", to: { x: 116, y: 70 }, dur: 1800 }, { id: "melon", to: { x: 150, y: 70 }, dur: 1400 }]) },
            { caption: "After ten minutes, the rain stopped and they saw a beautiful rainbow.", key: 2800, hold: 5200, do: [].concat([{ id: "c1", to: { x: 200 }, dur: 2400 }, { id: "c2", to: { x: 230 }, dur: 2400 }, { id: "dim", to: { o: 0 }, dur: 1200 }, { id: "sun", to: { o: 1 }, at: 400, dur: 900 },
              { id: "rainbow", to: { o: 1 }, at: 1000, dur: 1400 }], face("sara", true, 1200), pose("sara", "L", "pointUp", 1800, 500)) },
            { caption: "So they went back to the rug and finished their lunch.", key: 2400, do: [].concat(pose("sara", "L", "down", 0, 400), walk("dad", 22, 300, 1800), walk("mum", 76, 300, 1800), walk("sara", 96, 300, 1800),
              [{ id: "basket", to: { x: 40, y: 86 }, at: 300, dur: 1800 }, { id: "melon", to: { x: 58, y: 86 }, at: 300, dur: 1800 }]) }
          ] },
        { type: "listen", say: "Why did they run under the tree?", prompt: "به سؤال گوش کن و جواب بده: چرا زیر درخت دویدند؟",
          options: [{ pic: "🌧️", en: "because it was raining" }, { pic: "🐝", en: "because of a bee" }, { pic: "🌙", en: "because it was night" }], answer: "🌧️" },
        { type: "listen", say: "What did they see after the rain?", quiet: true, prompt: "گوش کن: بعد از باران چه دیدند؟",
          options: [{ pic: "🌈", en: "a rainbow" }, { pic: "🐦", en: "a bird" }, { pic: "🌙", en: "the moon" }], answer: "🌈" },
        { type: "listen", say: "When did they have the picnic?", quiet: true, prompt: "گوش کن: کی پیک‌نیک رفتند؟",
          options: [{ label: "last Friday", en: "last Friday" }, { label: "last Monday", en: "last Monday" }, { label: "yesterday", en: "yesterday" }], answer: "last Friday" },
        { type: "order", prompt: "تصویرهای قصه را به ترتیب بچین: اول چه شد؟", numbered: true, ltr: true, items: ["🧺☀️", "🌧️", "🌳🏃", "🌈"] },
        { type: "tip", text: "قصه را دوباره ببینید و کودک بعد از هر صحنه با کلمه‌های خودش بگوید چه شد. بپرسید What happened first? Then what happened? Why? این سؤال‌ها کمک می‌کنند هم ترتیب قصه را بفهمد و هم دلیل کارها را. قصه‌های کوتاه صوتی انگلیسی هم با هم گوش کنید و همین سؤال‌ها را بپرسید." }
      ]
    },
    {
      id: "english-tree-26", subject: "english", level: "tree", emoji: "🔍", title: "معنی را حدس بزن",
      steps: [
        { type: "choose", prompt: "به تصویر نگاه کن و جمله را بخوان: The giraffe has got a very long neck. کلمه neck کدام قسمت بدن زرافه است؟", show: "🦒",
          options: ["گردن", "پا", "دم"], answer: "گردن" },
        { type: "passage", prompt: "بخوان و معنی کلمه تازه را حدس بزن",
          text: "It was very hot, so my ice cream melted. Now my hands are wet and sticky!",
          question: "معنی melted چیست؟", options: ["آب شد", "یخ زد", "افتاد"], answer: "آب شد" },
        { type: "passage", prompt: "بخوان و معنی کلمه تازه را حدس بزن",
          text: "Be careful! The floor is wet and slippery. Walk slowly, or you will fall.",
          question: "معنی slippery چیست؟", options: ["لیز", "گرم", "تمیز"], answer: "لیز" },
        { type: "passage", prompt: "بخوان و معنی کلمه تازه را حدس بزن",
          text: "My grandpa is a beekeeper. He looks after hundreds of bees, and every summer he makes honey.",
          question: "معنی beekeeper چیست؟", options: ["زنبوردار", "نانوا", "باغبان"], answer: "زنبوردار" },
        { type: "passage", prompt: "اول به عنوان متن نگاه کن، بعد متن را بخوان",
          text: "Busy Bees. Bees live together in a hive. Every day, they fly from flower to flower. They drink the sweet nectar and carry it back to the hive. There, they make honey. Bees also help plants, because they carry pollen from one flower to another.",
          question: "این متن درباره چیست؟", options: ["زنبورها و کارشان", "گل‌های باغ", "خوردن عسل"], answer: "زنبورها و کارشان" },
        { type: "tip", text: "وقتی کودک کلمه تازه‌ای می‌بیند، اول ترجمه را نگویید. بپرسید: «تصویر چه می‌گوید؟ جمله‌های قبل و بعد چه می‌گویند؟» و بگذارید حدس بزند. پیش از خواندن هر متن هم به عنوان و تصویرش نگاه کنید و بپرسید What do you think it's about? حدس زدن از روی متن، کلید خواندن متن‌های طولانی‌تر است." }
      ]
    },
    {
      id: "english-tree-27", subject: "english", level: "tree", emoji: "🍎", title: "متن اطلاعاتی",
      steps: [
        { type: "passage", prompt: "این متن را بخوان: انار",
          text: "Pomegranates. Pomegranates are round red fruits. They grow on small trees in hot, dry places. Iran is one of the biggest pomegranate growers in the world, and the city of Saveh is famous for them. Inside, a pomegranate has got hundreds of seeds. Each seed is in a little red ball of sweet and sour juice. People eat the seeds, make juice from them and use them in cooking. In Iran, many families eat pomegranates on Yalda night, the longest night of the year.",
          question: "این متن بیشتر درباره چیست؟", options: ["انار", "شب یلدا", "شهر ساوه"], answer: "انار" },
        { type: "passage", prompt: "متن را دوباره بخوان و جواب بده",
          text: "Pomegranates. Pomegranates are round red fruits. They grow on small trees in hot, dry places. Iran is one of the biggest pomegranate growers in the world, and the city of Saveh is famous for them. Inside, a pomegranate has got hundreds of seeds. Each seed is in a little red ball of sweet and sour juice. People eat the seeds, make juice from them and use them in cooking. In Iran, many families eat pomegranates on Yalda night, the longest night of the year.",
          question: "انار کجا خوب رشد می‌کند؟", options: ["جاهای گرم و خشک", "جاهای سرد و برفی", "زیر آب"], answer: "جاهای گرم و خشک" },
        { type: "passage", prompt: "یک بار دیگر بخوان",
          text: "Pomegranates. Pomegranates are round red fruits. They grow on small trees in hot, dry places. Iran is one of the biggest pomegranate growers in the world, and the city of Saveh is famous for them. Inside, a pomegranate has got hundreds of seeds. Each seed is in a little red ball of sweet and sour juice. People eat the seeds, make juice from them and use them in cooking. In Iran, many families eat pomegranates on Yalda night, the longest night of the year.",
          question: "کدام شهر به انارش معروف است؟", options: ["ساوه", "رشت", "تبریز"], answer: "ساوه" },
        { type: "passage", prompt: "و یک سؤال آخر",
          text: "Pomegranates. Pomegranates are round red fruits. They grow on small trees in hot, dry places. Iran is one of the biggest pomegranate growers in the world, and the city of Saveh is famous for them. Inside, a pomegranate has got hundreds of seeds. Each seed is in a little red ball of sweet and sour juice. People eat the seeds, make juice from them and use them in cooking. In Iran, many families eat pomegranates on Yalda night, the longest night of the year.",
          question: "خانواده‌ها در کدام شب انار می‌خورند؟", options: ["شب یلدا", "شب عید", "شب تولد"], answer: "شب یلدا" },
        { type: "tip", text: "در متن اطلاعاتی اول «ایده اصلی» را پیدا کنید (متن درباره چیست؟) و بعد «جزئیات» را (کجا؟ چند؟ چرا؟). بعد از خواندن، کودک سه چیز را که از متن یاد گرفت بگوید: Pomegranates grow in hot places. They have got lots of seeds. یک انار با هم باز کنید و دانه‌هایش را ببینید!" }
      ]
    },
    {
      id: "english-tree-28", subject: "english", level: "tree", emoji: "📚", title: "قفسه کتاب",
      steps: [
        { type: "passage", prompt: "یک قصه کوتاه را خودت بخوان: ماهی کوچک",
          text: "A little orange fish lived in a big pond. Every day, she swam with her friends between the rocks. One day, she saw a shiny thing at the bottom of the pond. It was an old key! She pushed it with her nose, but it was too heavy. Her friends came and helped her. Together, they moved the key to the side of the pond, and a girl found it. \"My grandma's key!\" she said. \"Thank you, little fish!\"",
          question: "چه کسی به ماهی کمک کرد؟", options: ["دوستانش", "دختر", "مادربزرگ"], answer: "دوستانش" },
        { type: "passage", prompt: "و یک قصه دیگر: پرنده و باد",
          text: "A small bird wanted to fly to the top of the mountain. The wind was strong, and the bird was tired. She sat on a tree and rested. Then the wind changed. Now it blew up the mountain, and the bird flew with it. Soon she was at the top. She looked down at the villages and the rivers. \"It's beautiful,\" she sang.",
          question: "چه چیزی به پرنده کمک کرد بالا برود؟", options: ["باد", "درخت", "رودخانه"], answer: "باد" },
        { type: "tip", text: "از حالا به بعد، خواندن قصه‌های کوتاه انگلیسی را عادت هفتگی کنید؛ کودک خودش و برای لذت بخواند، نه برای امتحان. یک «دفتر خواندن» درست کنید: تاریخ، اسم قصه، یک جمله درباره‌اش و چند ستاره که کودک به آن داده. هر هفته یکی دو قصه کافی است. کتاب‌های داستان ساده انگلیسی (graded readers) از کتابخانه یا کتاب‌فروشی پیدا کنید و بگذارید خودش انتخاب کند." }
      ]
    },
    {
      id: "english-tree-29", subject: "english", level: "tree", emoji: "💌", title: "کارت‌پستال و ایمیل",
      steps: [
        { type: "listen", say: "Dear Grandma, We're in Ramsar. The sea is beautiful and the weather is warm. Yesterday we swam and played on the beach. See you soon! Love, Mina.", prompt: "به کارت‌پستال مینا گوش کن. آن‌ها کجا هستند؟",
          options: [{ pic: "🏖️", en: "at the seaside" }, { pic: "🏜️", en: "in the desert" }, { pic: "🏔️", en: "in the mountains" }], answer: "🏖️" },
        { type: "listen", say: "Dear Grandma, We're in Ramsar. The sea is beautiful and the weather is warm. Yesterday we swam and played on the beach. See you soon! Love, Mina.", quiet: true, prompt: "دوباره گوش کن. دیروز چه کردند؟",
          options: [{ pic: "🏊", en: "they swam" }, { pic: "⚽", en: "they played football" }, { pic: "🛍️", en: "they went shopping" }], answer: "🏊" },
        { type: "listen", show: "📧", prompt: "یک نامه یا ایمیل چطور تمام می‌شود؟",
          options: [{ label: "Love, Mina", en: "Love, Mina" }, { label: "Dear Mina", en: "Dear Mina" }, { label: "We're in Ramsar.", en: "We're in Ramsar." }], answer: "Love, Mina" },
        { type: "paper", pic: "💌",
          text: "یک کارت‌پستال یا ایمیل کوتاه به یک دوست یا فامیل بنویس: سلام (Dear …)، سه چیز درباره جایی که هستی یا کاری که کردی، و آخرش (Love, … یا See you soon!).",
          example: "Dear Reza, I'm at my grandpa's house in Kashan. It's very hot here. Yesterday I helped him in the garden. See you soon! Love, Arman",
          check: ["با Dear و اسم شروع کرد؟", "سه چیز گفت (کجاست، هوا، چه کرد)؟", "با Love یا See you soon و اسم خودش تمام کرد؟", "جمله‌ها با حرف بزرگ شروع شدند؟"] },
        { type: "tip", text: "کارت‌پستال یا ایمیل انگلیسی سه بخش دارد: سلام (Dear Grandma,)، متن (کجا هستی، چه کردی، هوا چطور است) و خداحافظی (Love, … یا Best wishes,). اگر فامیل یا دوستی دارید که انگلیسی می‌داند، کارت کودک را واقعاً برایش بفرستید؛ نامه‌ای که خواننده دارد، انگیزه نوشتن است." }
      ]
    },
    {
      id: "english-tree-30", subject: "english", level: "tree", emoji: "📝", title: "پاراگراف من",
      steps: [
        { type: "order", prompt: "این جمله‌ها یک پاراگراف درباره آرمان است. به ترتیب بچین: اول معرفی، بعد بقیه.", ltr: true,
          items: ["My name is Arman and I'm ten.", "I live in Tabriz with my family.", "I've got a sister, but I haven't got a brother.", "I like football because it's fun.", "On Fridays we go to the park, and then we have lunch at Grandma's."] },
        { type: "listen", show: "I like cats ___ I haven't got a cat.", prompt: "کدام کلمه این دو جمله را درست به هم وصل می‌کند؟",
          options: [{ label: "but", en: "but" }, { label: "because", en: "because" }, { label: "then", en: "then" }], answer: "but" },
        { type: "listen", show: "I'm happy ___ it's my birthday.", prompt: "کدام کلمه جای خالی را پر می‌کند؟",
          options: [{ label: "because", en: "because" }, { label: "but", en: "but" }, { label: "and", en: "and" }], answer: "because" },
        { type: "paper", pic: "📝",
          text: "یک پاراگراف پنج تا هشت جمله‌ای درباره خودت بنویس. اول در ذهنت فکر کن: اسم و سن، کجا زندگی می‌کنی، خانواده، چه دوست داری و چرا، آخر هفته چه می‌کنی. جمله‌ها را با and، but، because و then به هم وصل کن. آخر سر یک بار بخوان و درستش کن.",
          example: "My name is Sara and I'm nine. I live in Isfahan with my parents and my little brother. I like reading because books are exciting. I've got a cat, but I haven't got a dog. On Fridays we visit my grandma, and then we go to the park.",
          check: ["پنج جمله یا بیشتر نوشت؟", "دست‌کم یک بار and، but یا because به کار برد؟", "جمله‌ها پشت سر هم و درباره یک موضوع است؟", "خودش یک بار خواند و چیزی را درست کرد؟"] },
        { type: "tip", text: "پاراگراف خوب سه مرحله دارد: برنامه (فهرست کوتاهی از چیزهایی که می‌خواهیم بگوییم)، نوشتن و بازخوانی. کمک کنید کودک قبل از نوشتن به انگلیسی بگوید چه می‌خواهد بنویسد. بعد از نوشتن، با هم دنبال حرف بزرگ اول جمله، نقطه آخر جمله و کلمه‌های وصل‌کننده (and، but، because، then) بگردید و از چیزهای خوب تعریف کنید." }
      ]
    },
    {
      id: "english-tree-31", subject: "english", level: "tree", emoji: "🔤", title: "پسوندها و هم‌آواها",
      steps: [
        { type: "build", prompt: "گوش کن و کلمه را با تکه‌ها بساز", word: "careful", parts: ["care", "ful"], extra: ["ly"], pic: "⚠️", say: "careful" },
        { type: "build", prompt: "گوش کن و کلمه را با تکه‌ها بساز", word: "slowly", parts: ["slow", "ly"], extra: ["ful"], pic: "🐢", say: "slowly" },
        { type: "build", prompt: "big با est: حرف آخر دو تا می‌شود. گوش کن و بساز", word: "biggest", parts: ["big", "g", "est"], extra: ["e"], pic: "🐘", say: "biggest" },
        { type: "build", prompt: "happy با ly: y به i تبدیل می‌شود. گوش کن و بساز", word: "happily", parts: ["happ", "i", "ly"], extra: ["y"], pic: "😀", say: "happily" },
        { type: "sort", prompt: "هر جمله را بخوان و گوش کن. جای خالی there است یا their؟",
          baskets: [{ label: "there" }, { label: "their" }],
          items: [{ label: "___ is a cat on the sofa.", say: "There is a cat on the sofa.", basket: "there" }, { label: "This is ___ house.", say: "This is their house.", basket: "their" },
            { label: "Put it over ___.", say: "Put it over there.", basket: "there" }, { label: "They love ___ dog.", say: "They love their dog.", basket: "their" }] },
        { type: "sort", prompt: "این کلمه‌ها یک جور خوانده می‌شوند ولی معنی‌شان فرق دارد. هر جمله کدام را لازم دارد؟",
          baskets: [{ label: "two" }, { label: "to" }, { label: "sea" }, { label: "see" }],
          items: [{ label: "I've got ___ cats.", say: "I've got two cats.", basket: "two" }, { label: "We go ___ school.", say: "We go to school.", basket: "to" },
            { label: "We swim in the ___.", say: "We swim in the sea.", basket: "sea" }, { label: "I can ___ a bird.", say: "I can see a bird.", basket: "see" }] },
        { type: "tip", text: "پسوندها کلمه تازه می‌سازند: care → careful، slow → slowly، tall → taller → tallest. دو قانون املایی: در کلمه‌های کوتاه مثل big حرف آخر دو تا می‌شود (bigger، biggest) و y آخر به i تبدیل می‌شود (happy → happily). هم‌آواها (there/their، to/two، see/sea) فقط از معنی جمله جدا می‌شوند؛ با هم جمله بسازید و ببینید کدام درست است." }
      ]
    },
    {
      id: "english-tree-32", subject: "english", level: "tree", emoji: "📖", title: "کلمه‌سازی و فرهنگ لغت",
      steps: [
        { type: "build", prompt: "دو کلمه را به هم بچسبان و یک کلمه تازه بساز", word: "football", parts: ["foot", "ball"], extra: ["room"], pic: "⚽", say: "football" },
        { type: "build", prompt: "دو کلمه را به هم بچسبان و یک کلمه تازه بساز", word: "bedroom", parts: ["bed", "room"], extra: ["ball"], pic: "🛏️", say: "bedroom" },
        { type: "build", prompt: "un یعنی «نه». بساز: ناخوشحال", word: "unhappy", parts: ["un", "happy"], extra: ["er"], pic: "😞", say: "unhappy" },
        { type: "build", prompt: "er یعنی کسی که این کار را می‌کند. بساز: معلم", word: "teacher", parts: ["teach", "er"], extra: ["un"], pic: "🧑‍🏫", say: "teacher" },
        { type: "order", prompt: "کلمه‌ها را به ترتیب الفبا بچین، مثل فرهنگ لغت", ltr: true, items: ["apple", "bird", "cat", "dog", "egg"] },
        { type: "order", prompt: "این‌ها همه با b شروع می‌شوند. به حرف دوم نگاه کن و به ترتیب الفبا بچین", ltr: true, items: ["bag", "bed", "big", "box", "bus"] },
        { type: "tip", text: "کلمه‌سازی کمک می‌کند کلمه‌های تازه را حدس بزنیم: foot + ball = football، un + happy = unhappy، teach + er = teacher. در فرهنگ لغت کلمه‌ها به ترتیب الفبا هستند و اگر حرف اول یکی بود، به حرف دوم نگاه می‌کنیم. یک فرهنگ لغت کوچک انگلیسی (کاغذی یا روی دستگاه) کنار دست کودک بگذارید و با هم کلمه پیدا کنید." }
      ]
    },
    {
      id: "english-tree-33", subject: "english", level: "tree", emoji: "🎙️", title: "تکیه و آهنگ",
      steps: [
        { type: "listen", say: "teacher", prompt: "گوش کن. کدام قسمت کلمه بلندتر و محکم‌تر گفته می‌شود؟",
          options: [{ label: "TEAcher", en: "teacher", value: "1" }, { label: "teaCHER", en: "teacher", value: "2" }], answer: "1" },
        { type: "listen", say: "computer", quiet: true, prompt: "گوش کن. تکیه کجاست؟",
          options: [{ label: "COMputer", en: "computer", value: "1" }, { label: "comPUter", en: "computer", value: "2" }, { label: "compuTER", en: "computer", value: "3" }], answer: "2" },
        { type: "listen", say: "banana", quiet: true, prompt: "گوش کن. تکیه کجاست؟",
          options: [{ label: "BAnana", en: "banana", value: "1" }, { label: "baNAna", en: "banana", value: "2" }, { label: "banaNA", en: "banana", value: "3" }], answer: "2" },
        { type: "listen", say: "Are you hungry?", prompt: "گوش کن. این یک سؤال بله یا نه است. صدا آخر جمله بالا می‌رود یا پایین؟",
          options: [{ label: "↗ up", en: "up", value: "up" }, { label: "↘ down", en: "down", value: "down" }], answer: "up" },
        { type: "record", say: "Are you hungry? Yes, I am. Is it cold today? No, it isn't.",
          prompt: "این سؤال‌ها و جواب‌ها را بگو. در سؤال‌ها صدایت آخر جمله بالا برود. اول به نمونه گوش کن، بعد ضبط کن و مقایسه کن.",
          check: ["صدایش آخر سؤال‌ها بالا رفت؟", "جواب‌ها را آرام و پایین تمام کرد؟", "کلمه‌ها واضح بود؟"] },
        { type: "record", say: "teacher, computer, banana, elephant, potato",
          prompt: "این کلمه‌ها را با تکیه درست بگو: TEAcher، comPUter، baNAna، ELephant، poTAto.",
          check: ["تکیه کلمه‌ها درست بود؟", "همه کلمه‌ها را گفت؟"] },
        { type: "tip", text: "در هر کلمه انگلیسیِ چندبخشی یک بخش محکم‌تر گفته می‌شود (TEAcher، comPUter) و جای درستش مهم است. در سؤال‌های بله و نه (Are you hungry?) صدا آخر جمله بالا می‌رود. با کودک کلمه‌ها را با دست زدن روی بخش محکم تمرین کنید؛ شنیدن زیاد انگلیسی (کارتون، قصه صوتی) بیشترین کمک را می‌کند." }
      ]
    },
    {
      id: "english-tree-34", subject: "english", level: "tree", emoji: "🏘️", title: "شهر من",
      steps: [
        /* Mina walks along the street of her town and the camera goes with her: her house, the big park with trees,
           the school and the bakery, whose oven glows; the far roofs slide by more slowly. */
        { type: "scene", prompt: "گوش کن: شهر مینا", bg: "#cdeaf7",
          parts: { sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            home: { art: "w-house", at: [40, 64] }, park: { art: "w-park", at: [140, 64], s: 1.3 }, school: { art: "w-school", at: [250, 64] }, bakery: { art: "w-bakery", at: [350, 64] }, bread: { art: "🫓", at: [342, 70], s: 0.7, o: 0 },
            mina: { art: "en-mina", at: [20, 72], s: 0.75 } },
          scenes: [
            { caption: "This is my town. It's small and quiet. Here's my house.", key: 1800, do: [].concat(walk("mina", 62, 0, 1800)) },
            { caption: "There's a big park with trees and flowers.", key: 3200, hold: 4800, do: [].concat([{ cam: { x: 140 }, dur: 3000 }], walk("mina", 120, 0, 3000)) },
            { caption: "There's a school and a bakery, too.", key: 3200, hold: 4800, do: [].concat([{ cam: { x: 300 }, dur: 3000 }], walk("mina", 300, 0, 3000)) },
            { caption: "My town is famous for its bread. It's delicious!", key: 2000, do: [].concat(walk("mina", 330, 0, 900), [{ id: "bakery.glow", to: { o: 0.3 }, at: 900, dur: 600, yoyo: true, times: 4 }, { id: "bread", to: { o: 1, y: 60 }, at: 1200, dur: 800 }], face("mina", true, 1000)) }
          ] },
        { type: "listen", say: "My city is big and busy. It's famous for its old bridges.", prompt: "گوش کن. شهرش به چه معروف است؟",
          options: [{ pic: "🌉", en: "old bridges" }, { pic: "🏖️", en: "beaches" }, { pic: "🏔️", en: "mountains" }], answer: "🌉" },
        { type: "listen", say: "What's your village like? It's quiet and green. There are lots of farms.", quiet: true, prompt: "گوش کن. روستایش چطور است؟",
          options: [{ pic: "🌾🐄", en: "quiet and green" }, { pic: "🏙️🚗", en: "big and busy" }, { pic: "🏜️🐪", en: "hot and dry" }], answer: "🌾🐄" },
        { type: "record", say: "My town is Kashan. It's hot in summer. There are lots of old houses and gardens. It's famous for rose water.",
          prompt: "درباره شهر یا روستای خودت سه یا چهار جمله بگو: اسمش، چطور است، چه چیزهایی دارد، به چه معروف است. نمونه را گوش کن و بعد ضبط کن.",
          check: ["اسم شهر یا روستایش را گفت؟", "از There is یا There are استفاده کرد؟", "گفت به چه معروف است؟", "سه جمله یا بیشتر گفت؟"] },
        { type: "tip", text: "برای توصیف یک جا این جمله‌ها کمک می‌کنند: It's big / small / quiet / busy. There's a … There are lots of … It's famous for … با کودک درباره شهر خودتان و شهرهایی که سفر رفته‌اید حرف بزنید: Isfahan is famous for its bridges. Yazd is famous for its wind towers." }
      ]
    },
    {
      id: "english-tree-35", subject: "english", level: "tree", emoji: "🗓️", title: "آخر هفته",
      steps: [
        { type: "listen", say: "What did you do at the weekend? I went to the mountains with my family.", prompt: "گوش کن. آخر هفته کجا رفت؟",
          options: [{ pic: "🏔️", en: "the mountains" }, { pic: "🏖️", en: "the beach" }, { pic: "🏬", en: "the shops" }], answer: "🏔️" },
        { type: "listen", say: "What are you going to do next weekend? I'm going to watch a football match.", quiet: true, prompt: "گوش کن. آخر هفته بعد چه کار می‌کند؟",
          options: [{ pic: "⚽📺", en: "watch a football match" }, { pic: "🎨", en: "paint" }, { pic: "🏊", en: "go swimming" }], answer: "⚽📺" },
        /* A conversation in the park: Sara asks Reza (the child's part) about his weekend; at each of his turns the
           child chooses what he says and says it aloud; Reza's mouth moves as he speaks. */
        { type: "dialogue", prompt: "تو رضا هستی. به سارا گوش کن و جواب بده.", bg: "#cfeaf7", you: "reza",
          parts: { park: { art: "en-park" }, sara: { art: "en-sara", at: [50, 86], s: 1.2 }, reza: { art: "en-reza", at: [110, 86], s: 1.2 } },
          lines: [
            { who: "sara", en: "Hi, Reza! What did you do at the weekend?", do: wave("sara", "R", 0, 1200) },
            { who: "reza", en: "I went to my grandma's house.", choose: ["I'm going to my grandma's house.", "I go to bed at nine."] },
            { who: "sara", en: "That's nice! What did you do there?" },
            { who: "reza", en: "We made bread together.", choose: ["We make bread every day.", "Yes, I do."], do: face("reza", true, 0) },
            { who: "sara", en: "Lovely! What are you going to do next weekend?" },
            { who: "reza", en: "I'm going to play football. And you?", choose: ["I played football.", "I'm nine years old."] },
            { who: "sara", en: "I'm going to visit the museum with my dad.", do: face("sara", true, 0) }
          ] },
        { type: "tip", text: "این گفت‌وگو را در خانه بازی کنید: شما نقش سارا را بگیرید و کودک نقش رضا را، بعد جایتان عوض شود. جمعه شب بپرسید What did you do at the weekend? و پنجشنبه بپرسید What are you going to do this weekend? جواب در گذشته (I went …) و آینده (I'm going to …) را از هم جدا کند." }
      ]
    },
    {
      id: "english-tree-36", subject: "english", level: "tree", emoji: "🌳", title: "ببین چه بلدی",
      steps: [
        { type: "passage", prompt: "این متن را بخوان",
          text: "Last summer, Arash and his family went to Gilan, in the north of Iran. It was green and rainy there. They stayed in a small house near the sea. Every morning, Arash swam with his sister, and in the afternoon they walked in the forest. One day, they visited a tea farm on a hill. Arash picked some tea leaves and his mum bought some tea for Grandma. \"It was the best holiday ever!\" said Arash.",
          question: "آن‌ها کجا رفتند؟", options: ["گیلان", "یزد", "کرمان"], answer: "گیلان" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Last summer, Arash and his family went to Gilan, in the north of Iran. It was green and rainy there. They stayed in a small house near the sea. Every morning, Arash swam with his sister, and in the afternoon they walked in the forest. One day, they visited a tea farm on a hill. Arash picked some tea leaves and his mum bought some tea for Grandma. \"It was the best holiday ever!\" said Arash.",
          question: "مادر آرش برای مادربزرگ چه خرید؟", options: ["چای", "ماهی", "برنج"], answer: "چای" },
        { type: "listen", say: "The museum opens at quarter past nine. Tickets are eight thousand tomans.", prompt: "گوش کن. موزه ساعت چند باز می‌شود؟",
          options: [{ label: "9:15", en: "quarter past nine" }, { label: "9:45", en: "quarter to ten" }, { label: "9:00", en: "nine o'clock" }], answer: "9:15" },
        { type: "listen", say: "Did you go to the park yesterday? No, I didn't. I stayed at home because it was cold.", quiet: true, prompt: "گوش کن. چرا خانه ماند؟",
          options: [{ pic: "🥶", en: "because it was cold" }, { pic: "🤒", en: "because he was ill" }, { pic: "📚", en: "because of homework" }], answer: "🥶" },
        { type: "listen", say: "Which is bigger, a cat or a horse? A horse is bigger.", quiet: true, prompt: "گوش کن. کدام بزرگ‌تر است؟",
          options: [{ pic: "🐎", en: "a horse" }, { pic: "🐈", en: "a cat" }], answer: "🐎" },
        { type: "paper", pic: "✏️",
          text: "یک پاراگراف پنج تا هشت جمله‌ای بنویس: یک روز خوب که داشتی. کجا رفتی، با چه کسی، چه کردید، هوا چطور بود، و چرا روز خوبی بود.",
          example: "Last Friday, I went to the park with my cousins. It was sunny and warm. First, we played football. Then we had a picnic under a big tree. I was very happy because it was a great day.",
          check: ["پنج جمله یا بیشتر نوشت؟", "فعل‌ها را در گذشته نوشت (went، played، was)؟", "از because، then یا but استفاده کرد؟", "حرف بزرگ و نقطه را درست گذاشت؟"] },
        { type: "tip", text: "این درس آخر درخت است: خواندن یک متن، گوش دادن به پیام و گفت‌وگو، و نوشتن یک پاراگراف. اگر کودک بیشتر سؤال‌ها را درست جواب داد و توانست پاراگرافی با گذشته بنویسد، آماده جنگل است؛ یعنی تقریباً سطح A2. جاهایی را که سخت بود دوباره با درس خودش تمرین کنید. خواندن قصه‌های انگلیسی و گوش دادن را هر روز کمی ادامه بدهید." }
      ]
    },
    // ---------- 🌲 جنگل (forest) ----------
    {
      id: "english-forest-5", subject: "english", level: "forest", emoji: "🤝", title: "آشنایی",
      steps: [
        /* A new pupil's first day: the teacher asks his name, he spells his surname, Mina asks where he is from and
           introduces her friend Kian. The child is Arman: at each of his turns the child chooses and says the line. */
        { type: "dialogue", prompt: "تو آرمان هستی، دانش‌آموز تازه کلاس. گوش کن و جواب بده.", bg: "#f3ead8", you: "arman",
          parts: { room: { art: "en-classroom" }, teacher: { art: "en-teacher", at: [26, 88] }, arman: { art: "en-arman", at: [64, 88], s: 1.05 },
            mina: { art: "en-mina", at: [104, 88], s: 1.05 }, kian: { art: "en-brother", at: [138, 88], s: 1.1 } },
          lines: [
            { who: "teacher", en: "Good morning, everyone. This is our new student. What's your name?", do: pose("teacher", "R", "point", 0, 600) },
            { who: "arman", en: "My name's Arman Rezaei.", choose: ["I'm fine, thank you.", "I'm ten years old."] },
            { who: "teacher", en: "How do you spell your surname, Arman?", do: pose("teacher", "R", "down", 0, 400) },
            { who: "arman", en: "R, E, Z, A, E, I.", choose: ["Yes, I can.", "It's Tuesday."] },
            { who: "mina", en: "Hi, Arman! I'm Mina. Where are you from?", do: wave("mina", "L", 0, 1200) },
            { who: "arman", en: "I'm from Ahvaz, in the south of Iran.", choose: ["I'm going to Ahvaz.", "It's half past two."] },
            { who: "mina", en: "Welcome! And this is my friend Kian.", do: pose("mina", "R", "point", 0, 600) },
            { who: "arman", en: "Nice to meet you, Kian.", choose: ["Goodbye, Kian.", "See you yesterday, Kian."], do: wave("arman", "R", 0, 1200) },
            { who: "kian", en: "Nice to meet you, too!", do: face("kian", true, 0) }
          ] },
        { type: "listen", say: "What's your surname? It's Karimi. K, A, R, I, M, I.", prompt: "گوش کن. نام خانوادگی‌اش چطور نوشته می‌شود؟",
          options: [{ label: "Karimi", en: "Karimi" }, { label: "Kerimi", en: "Kerimi" }, { label: "Karami", en: "Karami" }], answer: "Karimi" },
        { type: "listen", say: "This is Elif. She's from Turkey. She's Turkish.", quiet: true, prompt: "گوش کن. الیف اهل کجاست؟",
          options: [{ label: "Turkey", en: "Turkey" }, { label: "Iraq", en: "Iraq" }, { label: "Armenia", en: "Armenia" }], answer: "Turkey" },
        { type: "listen", show: "🤝", prompt: "وقتی کسی را تازه می‌بینی، کدام را می‌گویی؟",
          options: [{ label: "Nice to meet you.", en: "Nice to meet you." }, { label: "See you later.", en: "See you later." }, { label: "Good night.", en: "Good night." }], answer: "Nice to meet you." },
        { type: "tip", text: "آشنایی در انگلیسی چند جمله ثابت دارد: My name's … / This is my friend … / Nice to meet you. / Where are you from? / How do you spell that? گفت‌وگو را با کودک بازی کنید و اسم و نام خانوادگی‌اش را حرف به حرف هجی کند؛ هجی کردن را در کلاس زبان مدرسه هم زیاد می‌پرسند (Prospect 1، درس ۱ و ۲)." }
      ]
    },
    {
      id: "english-forest-6", subject: "english", level: "forest", emoji: "👨‍👩‍👦", title: "خانواده و ظاهر",
      steps: [
        /* Sara shows her family one by one, each with what shows who they are: Dad (tall, a moustache) holds a book
           because he is a teacher; Mum holds a stethoscope (a doctor); Grandpa wears glasses; her little brother's
           birthday cake gets five candles. */
        { type: "scene", prompt: "گوش کن: خانواده سارا", bg: "#cfeaf7",
          parts: { garden: { art: "en-garden" }, table: { art: "en-table", at: [134, 90], s: 0.7 }, cake: { art: "en-cake", at: [134, 77.4], s: 0.7 },
            sara: { art: "en-sara", at: [14, 86] }, dad: { art: "en-father", at: [-20, 86], s: 1.1 }, book: { art: "en-book", at: inHand("en-father", [40, 86], 1.1, "R", "hold", 0), s: 0.7, o: 0 },
            mum: { art: "en-mother", at: [-20, 86], s: 0.95 }, steth: { art: "🩺", at: inHand("en-mother", [66, 86], 0.95, "R", "hold", 0.5), s: 0.5, o: 0 },
            gran: { art: "en-grandpa", at: [-20, 86] }, kid: { art: "en-brother", at: [180, 86], s: 0.8 } },
          scenes: [
            { caption: "This is my dad. He's tall and he's got a moustache. He's a teacher.", key: 2600, hold: 5200, do: [].concat([{ id: "dad", walk: [40, 86], dur: 1800 }], pose("dad", "R", "hold", 2000, 500), [{ id: "book", to: { o: 1 }, at: 2400, dur: 300 }]) },
            { caption: "This is my mum. She's a doctor.", key: 2600, do: [].concat([{ id: "book", to: { o: 0 }, dur: 300 }], pose("dad", "R", "down", 0, 400), [{ id: "mum", walk: [66, 86], dur: 1800 }], pose("mum", "R", "hold", 2000, 500), [{ id: "steth", to: { o: 1 }, at: 2400, dur: 300 }]) },
            { caption: "This is my grandpa. He's seventy and he wears glasses.", key: 2200, do: [].concat([{ id: "steth", to: { o: 0 }, dur: 300 }], pose("mum", "R", "down", 0, 400), [{ id: "gran", walk: [92, 86], dur: 2000 }]) },
            { caption: "And this is my little brother. He's five today. Happy birthday!", key: 3000, hold: 5200, do: [].concat([{ id: "kid", walk: [116, 86], dur: 1600 }],
              [1, 2, 3, 4, 5].map(function (n) { return { id: "cake.c" + n, to: { o: 1 }, at: 1600 + n * 250, dur: 200 }; }), face("kid", true, 1800), jump("kid", 3000, 1, 4)) }
          ] },
        { type: "listen", say: "How old is your sister? She's twelve. Her birthday is in June.", prompt: "گوش کن. خواهرش چند سال دارد؟",
          options: [{ label: "12", en: "twelve" }, { label: "20", en: "twenty" }, { label: "2", en: "two" }], answer: "12" },
        { type: "listen", say: "My uncle is a pilot. He flies planes.", quiet: true, prompt: "گوش کن. شغل عمویش چیست؟",
          options: [{ pic: "🧑‍✈️", en: "a pilot" }, { pic: "🧑‍🌾", en: "a farmer" }, { pic: "🧑‍🍳", en: "a cook" }], answer: "🧑‍✈️" },
        { type: "listen", say: "What does she look like? She's short and she's got long hair.", quiet: true, prompt: "گوش کن. کدام تصویر؟",
          options: [{ pic: "👩‍🦱", scale: [1, 0.8], en: "short, long hair", value: "a" }, { pic: "👩‍🦳", scale: [1, 1.3], en: "tall, white hair", value: "b" }], answer: "a" },
        { type: "pairs", prompt: "هر شغل را با اسمش جفت کن",
          pairs: [[{ pic: "🧑‍⚕️", say: "a doctor" }, { label: "doctor", say: "doctor" }], [{ pic: "🧑‍✈️", say: "a pilot" }, { label: "pilot", say: "pilot" }],
            [{ pic: "🧑‍🏫", say: "a teacher" }, { label: "teacher", say: "teacher" }], [{ pic: "👩‍🔧", say: "a mechanic" }, { label: "mechanic", say: "mechanic" }]] },
        { type: "tip", text: "برای توصیف آدم‌ها: He's tall / short. She's got long / short / curly hair. He wears glasses. و برای شغل: She's a doctor. What does your dad do? عکس‌های خانوادگی را با هم ببینید و کودک هر کس را با سن، شغل و ظاهرش به انگلیسی معرفی کند (Prospect 1، درس ۳ تا ۵)." }
      ]
    },
    {
      id: "english-forest-4", subject: "english", level: "forest", emoji: "🙋", title: "درباره من",
      steps: [
        { type: "order", prompt: "این پاراگراف درباره مریم است. جمله‌ها را به ترتیب درست بچین.", ltr: true,
          items: ["Hi! My name is Maryam and I'm twelve years old.", "I live in Rasht with my parents and my two brothers.", "My father is an engineer and my mother is a nurse.", "In my free time I like drawing and playing volleyball.", "I want to be an architect because I love beautiful buildings."] },
        { type: "order", prompt: "کلمه‌ها را به ترتیب بچین", ltr: true, say: "I want to be a doctor because I like helping people.", items: ["I", "want", "to", "be", "a", "doctor", "because", "I", "like", "helping", "people."] },
        { type: "paper", pic: "🙋",
          text: "یک متن ۸۰ تا ۱۰۰ کلمه‌ای درباره خودت بنویس: اسم و سن، کجا و با چه کسانی زندگی می‌کنی، خانواده‌ات، چه چیزهایی دوست داری، و در آینده می‌خواهی چه کاره شوی و چرا. اول یک فهرست کوتاه بنویس، بعد متن را، و آخر سر یک بار بخوان و درست کن.",
          example: "Hi! My name is Maryam and I'm twelve. I live in Rasht with my parents and my two brothers. My father is an engineer and my mother is a nurse. I'm tall and I've got long black hair. In my free time I like drawing and playing volleyball. I want to be an architect because I love beautiful buildings.",
          check: ["دست‌کم هشت جمله نوشت؟", "درباره خانواده، علاقه‌ها و آینده نوشت؟", "از and، but و because استفاده کرد؟", "خودش متن را خواند و دست‌کم یک چیز را درست کرد؟"] },
        { type: "tip", text: "نوشتن درباره خود در کلاس زبان مدرسه هم زیاد خواسته می‌شود. کمک کنید کودک قبل از نوشتن چند کلمه کلیدی یادداشت کند (name, age, family, hobbies, future) و بعد از نوشتن با یک فهرست بازبینی کند: حرف بزرگ، نقطه، فعل درست (I am، she is، I like). نوشته را تاریخ بزنید و نگه دارید تا پیشرفتش را ببیند." }
      ]
    },
    {
      id: "english-forest-7", subject: "english", level: "forest", emoji: "🏠", title: "خانه و نشانی",
      steps: [
        /* Reza shows his home, cut open: he walks from his bedroom to the kitchen to the bathroom as each room is
           named; then a note with his address comes up beside the house. */
        { type: "scene", prompt: "گوش کن: خانه رضا", bg: "#cfeaf7",
          parts: { house: { art: "en-house" }, reza: { art: "en-reza", at: [30, 84], s: 0.85 } },
          scenes: [
            { caption: "Welcome to my home! It's a small house with three rooms. This is my bedroom.", key: 1600, hold: 5400, do: [].concat(wave("reza", "R", 400, 1400)) },
            { caption: "This is the kitchen. We have breakfast here.", key: 2200, do: [].concat(walk("reza", 76, 0, 2000)) },
            { caption: "And this is the bathroom.", key: 2200, do: [].concat(walk("reza", 122, 0, 2000)) },
            { caption: "My address is 24 Hafez Street, Shiraz.", key: 1500, do: [].concat(talk("reza", 0, 2000), face("reza", true, 0)) }
          ] },
        { type: "listen", say: "What's your address? It's 15 Ferdowsi Street, Tabriz.", prompt: "گوش کن. نشانی‌اش چیست؟",
          options: [{ label: "15 Ferdowsi Street", en: "fifteen Ferdowsi Street" }, { label: "50 Ferdowsi Street", en: "fifty Ferdowsi Street" }, { label: "15 Saadi Street", en: "fifteen Saadi Street" }], answer: "15 Ferdowsi Street" },
        { type: "listen", say: "My phone number is 0 9 1 2, 5 5 5, 0 1 8 7.", quiet: true, prompt: "گوش کن. شماره تلفن کدام است؟",
          options: [{ label: "0912 555 0187", en: "0 9 1 2, 5 5 5, 0 1 8 7" }, { label: "0912 555 0178", en: "0 9 1 2, 5 5 5, 0 1 7 8" }, { label: "0921 555 0187", en: "0 9 2 1, 5 5 5, 0 1 8 7" }], answer: "0912 555 0187" },
        { type: "listen", say: "My email is mina at example dot com.", quiet: true, prompt: "گوش کن. ایمیلش کدام است؟",
          options: [{ label: "mina@example.com", en: "mina at example dot com" }, { label: "nima@example.com", en: "nima at example dot com" }, { label: "mina.example@com", en: "mina dot example at com" }], answer: "mina@example.com" },
        { type: "listen", say: "There are two bedrooms, a kitchen and a living room in our flat.", quiet: true, prompt: "گوش کن. خانه‌شان چند اتاق خواب دارد؟",
          options: [{ label: "🛏️🛏️", en: "two bedrooms" }, { label: "🛏️", en: "one bedroom" }, { label: "🛏️🛏️🛏️", en: "three bedrooms" }], answer: "🛏️🛏️" },
        { type: "tip", text: "در انگلیسی نشانی برعکس فارسی از کوچک به بزرگ گفته می‌شود: پلاک، خیابان، شهر (24 Hafez Street, Shiraz). در ایمیل @ را at و نقطه را dot می‌خوانند. شماره تلفن را رقم به رقم می‌گویند و 0 را «oh» یا zero. کودک نشانی خانه و شماره تلفن را به انگلیسی تمرین کند (Prospect 1، درس ۶ و ۷)؛ یادآوری کنید که نشانی و شماره را فقط به آدم‌های مطمئن می‌دهیم." }
      ]
    },
    {
      id: "english-forest-2", subject: "english", level: "forest", emoji: "🗺️", title: "گفت‌وگو",
      steps: [
        /* Asking the way in the street: Sara asks a man where the park is, he points along the street, and she walks
           along it, past the school, to the park; the camera goes with her. */
        { type: "scene", prompt: "گوش کن: پرسیدن راه", bg: "#cdeaf7",
          parts: { sky: { art: "w-skyband", depth: 0 }, far: { art: "w-farline", depth: 0.3 }, ground: { art: "w-street-ground" },
            shop: { art: "w-shop1", at: [20, 64] }, school: { art: "w-school", at: [200, 64] }, park: { art: "w-park", at: [262, 64], s: 1.2 },
            man: { art: "en-grandpa", at: [90, 72], s: 0.8 }, sara: { art: "en-sara", at: [40, 72], s: 0.75 } },
          scenes: [
            { caption: "Excuse me. Where's the park, please?", key: 1700, do: [].concat(walk("sara", 68, 0, 1400), talk("sara", 1400, 1600), pose("sara", "R", "ask", 1400, 500)) },
            { caption: "Go along this street. The park is next to the school, on the right.", key: 2000, hold: 5200, do: [].concat(pose("sara", "R", "down", 0, 400), pose("man", "R", "point", 0, 600), talk("man", 0, 2800)) },
            { caption: "Thank you very much!", key: 1200, do: [].concat(pose("man", "R", "down", 0, 400), talk("sara", 0, 1200), face("sara", true, 0), nod("sara", 400)) },
            { caption: "She walks along the street, past the school. Here's the park!", key: 4000, hold: 5600, do: [].concat([{ cam: { x: 230 }, at: 300, dur: 3600 }], walk("sara", 262, 300, 3600)) }
          ] },
        { type: "choose", prompt: "در مغازه می‌خواهی قیمت چیزی را بپرسی. کدام را می‌گویی؟", show: "🛒", options: ["How much is this?", "How old is this?", "Where is this?"], answer: "How much is this?" },
        { type: "choose", prompt: "حرف کسی را نفهمیدی. مؤدبانه چه می‌گویی؟", show: "🤔", options: ["Sorry, can you say that again, please?", "Go away!", "I'm fine, thanks."], answer: "Sorry, can you say that again, please?" },
        { type: "listen", say: "Excuse me, how do I get to the station? Turn left at the bank. The station is opposite the hospital.", prompt: "گوش کن. ایستگاه کجاست؟",
          options: [{ label: "opposite the hospital", en: "opposite the hospital" }, { label: "next to the bank", en: "next to the bank" }, { label: "behind the school", en: "behind the school" }], answer: "opposite the hospital" },
        { type: "listen", say: "Can I have two bottles of water, please? Sure. That's twenty thousand tomans.", quiet: true, prompt: "گوش کن. چه خرید؟",
          options: [{ label: "💧💧", en: "two bottles of water" }, { label: "🧃🧃", en: "two juices" }, { label: "💧", en: "one bottle of water" }], answer: "💧💧" },
        { type: "tip", text: "چند جمله برای بیرون از خانه: Excuse me, where's …? / Go straight on. Turn left / right. It's next to / opposite … / How much is it? / Sorry, can you say that again? وقتی بیرون هستید، کودک به انگلیسی راه را برایتان توضیح بدهد یا در بازی «مغازه» خرید کند." }
      ]
    },
    {
      id: "english-forest-8", subject: "english", level: "forest", emoji: "🥗", title: "غذای محبوب",
      steps: [
        { type: "listen", say: "What's your favourite food? I love kebab with rice.", prompt: "گوش کن. غذای محبوبش چیست؟",
          options: [{ pic: "🍢🍚", en: "kebab with rice" }, { pic: "🍕", en: "pizza" }, { pic: "🍝", en: "pasta" }], answer: "🍢🍚" },
        /* In the kitchen, Mum and the child plan lunch with suggestions (How about …? Let's …) and an offer (Would you
           like …?). The child is Sara: she chooses and says her lines. */
        { type: "dialogue", prompt: "تو سارا هستی. با مادرت درباره ناهار حرف بزن.", bg: "#fdf0d5", you: "sara",
          parts: { kitchen: { art: "en-kitchen" }, table: { art: "en-table", at: [80, 90], s: 1.2 }, mum: { art: "en-mother", at: [44, 86], s: 1.15 }, sara: { art: "en-sara", at: [118, 86] },
            herbs: { art: "🌿", at: [86, 66], s: 0.6 }, eggs: { art: "🥚", at: [72, 66], s: 0.45 } },
          lines: [
            { who: "mum", en: "I'm hungry. What would you like for lunch?" },
            { who: "sara", en: "How about pizza?", choose: ["I'm from Tabriz.", "I'd like a bike."] },
            { who: "mum", en: "Hmm, we haven't got any cheese. Let's make kuku sabzi!", do: pose("mum", "R", "point", 0, 600) },
            { who: "sara", en: "Good idea! Can I help?", choose: ["No, I don't.", "It's sunny today."], do: face("sara", true, 0) },
            { who: "mum", en: "Of course. Would you like to wash the herbs?", do: pose("mum", "R", "down", 0, 400) },
            { who: "sara", en: "Yes, please!", choose: ["No, it isn't.", "Yes, I am."], do: nod("sara", 0) }
          ] },
        { type: "listen", say: "Would you like some tea? No, thank you. Can I have some water, please?", quiet: true, prompt: "گوش کن. چه می‌خواهد؟",
          options: [{ pic: "💧", en: "water" }, { pic: "🍵", en: "tea" }, { pic: "🧃", en: "juice" }], answer: "💧" },
        { type: "listen", show: "🍽️", prompt: "دوستت پیشنهاد می‌دهد Let's have soup! تو موافقی. چه می‌گویی؟",
          options: [{ label: "Good idea!", en: "Good idea!" }, { label: "How old are you?", en: "How old are you?" }, { label: "I went home.", en: "I went home." }], answer: "Good idea!" },
        { type: "tip", text: "برای پیشنهاد دادن: How about …? / Let's … / Why don't we …? و برای تعارف: Would you like some …? جواب: Yes, please. / No, thank you. سر سفره به انگلیسی تعارف کنید و کودک جواب بدهد؛ غذای محبوب هر کس را هم بپرسید: What's your favourite food? (Prospect 1، درس ۸)." }
      ]
    },
    {
      id: "english-forest-9", subject: "english", level: "forest", emoji: "📆", title: "هفته من",
      steps: [
        /* Mina's week as seven boxes, Saturday to Friday: the school days light up with a bag on each; Thursday gets
           Grandma, Friday the mountains, as each is said. */
        { type: "scene", prompt: "گوش کن: هفته مینا", bg: "#fffaf0",
          parts: Object.assign({ mina: { art: "en-mina", at: [14, 88], s: 0.9 } },
            ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].reduce(function (o, d, i) {
              o["d" + i] = { art: "en-frame", at: [30 + i * 17.5, 30], sx: 0.36, sy: 0.4, o: 0.35 }; o["t" + i] = { art: d, at: [38.3 + i * 17.5, 43], s: 0.32 };
              o["p" + i] = { art: i < 5 ? "🎒" : i === 5 ? "👵" : "⛰", at: [38.3 + i * 17.5, 66], s: 0.6, o: 0 }; return o; }, {})),
          scenes: [
            { caption: "I go to school from Saturday to Wednesday.", key: 3200, hold: 4800, do: [0, 1, 2, 3, 4].map(function (i) { return [{ id: "d" + i, to: { o: 1 }, at: i * 500, dur: 300 }, { id: "p" + i, to: { o: 1 }, at: i * 500 + 200, dur: 300 }]; }).reduce(function (a, b) { return a.concat(b); }, []) },
            { caption: "I usually visit my grandma on Thursdays.", key: 1600, do: [].concat([0, 1, 2, 3, 4].map(function (i) { return { id: "d" + i, to: { o: 0.35 }, dur: 300 }; }),
              [{ id: "d5", to: { o: 1 }, at: 300, dur: 300 }, { id: "p5", to: { o: 1 }, at: 600, dur: 300 }], talk("mina", 0, 1800)) },
            { caption: "On Fridays, I sometimes go hiking with my dad.", key: 1600, do: [].concat([{ id: "d5", to: { o: 0.35 }, dur: 300 }, { id: "d6", to: { o: 1 }, at: 300, dur: 300 }, { id: "p6", to: { o: 1 }, at: 600, dur: 300 }],
              talk("mina", 0, 2000), face("mina", true, 600)) }
          ] },
        { type: "listen", say: "When do you get up on school days? At half past six.", prompt: "گوش کن. روزهای مدرسه کی بیدار می‌شود؟",
          options: [{ pic: "🕡", en: "half past six" }, { pic: "🕖", en: "seven o'clock" }, { pic: "🕣", en: "half past eight" }], answer: "🕡" },
        { type: "listen", say: "Who do you usually walk to school with? With my brother.", quiet: true, prompt: "گوش کن. با چه کسی به مدرسه می‌رود؟",
          options: [{ pic: "👦", en: "my brother" }, { pic: "👩", en: "my mum" }, { pic: "👧", en: "my friend" }], answer: "👦" },
        { type: "sort", prompt: "هر جواب را بخوان. جواب کدام سؤال است؟",
          baskets: [{ label: "When?" }, { label: "Where?" }, { label: "Who?" }],
          items: [{ label: "At seven o'clock.", say: "At seven o'clock.", basket: "When?" }, { label: "In the park.", say: "In the park.", basket: "Where?" },
            { label: "My best friend.", say: "My best friend.", basket: "Who?" }, { label: "On Monday.", say: "On Monday.", basket: "When?" },
            { label: "At school.", say: "At school.", basket: "Where?" }, { label: "My teacher.", say: "My teacher.", basket: "Who?" }] },
        { type: "order", prompt: "سؤال را بساز: کلمه‌ها را به ترتیب بچین", ltr: true, say: "How often do you go swimming?", items: ["How", "often", "do", "you", "go", "swimming?"] },
        { type: "order", prompt: "جمله را بساز", ltr: true, say: "She never watches TV in the morning.", items: ["She", "never", "watches", "TV", "in", "the", "morning."] },
        { type: "tip", text: "برنامه هفتگی خانواده را با هم به انگلیسی بنویسید و با کلمه‌های تکرار (always، usually، often، sometimes، never) جمله بسازید: Dad always cooks on Fridays. بازی «سؤال کن»: یکی جواب را می‌گوید (On Thursday.) و دیگری سؤالش را می‌سازد (When do you visit Grandma?). کلمه‌های پرسشی When، Where، Who، What، How often را تمرین کنید (Prospect 2، درس ۲)." }
      ]
    },
    {
      id: "english-forest-10", subject: "english", level: "forest", emoji: "🤒", title: "توانایی و سلامت",
      steps: [
        /* Kian is good at football: he runs fast and kicks. The next day he sits on the bench with his hand on his
           head, sad; his mum asks what's wrong, and brings him a glass of warm tea. */
        { type: "scene", prompt: "گوش کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, kian: { art: "en-brother", at: [10, 86], s: 1.1 }, ball: { art: "en-ball", at: [30, 86], s: 1.6 },
            mum: { art: "en-mother", at: [190, 86] }, tea: { art: "🍵", at: inHand("en-mother", [120, 86], 1, "L", "hold", 0.5), s: 0.5, o: 0 } },
          scenes: [
            { caption: "Kian is good at football. He can run very fast.", key: 1500, do: [].concat(run("kian", 70, 0, 1200), [{ id: "ball", to: { x: 82 }, dur: 1200, ease: "linear" }, { id: "kian.legR", to: { r: -35 }, at: 1300, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M82 86Q110 46 150 86", at: 1500, dur: 1000 }]) },
            { caption: "The next day, Kian isn't well. He can't play.", key: 1800, do: [].concat([{ id: "ball", to: { o: 0 }, dur: 400 }], face("kian", false, 0), pose("kian", "R", "eye", 600, 600), [{ id: "kian", to: { r: -4 }, at: 600, dur: 600 }]) },
            { caption: "What's the matter, Kian? I've got a headache and a sore throat.", key: 2200, hold: 5400, do: [].concat([{ id: "mum", walk: [104, 86], dur: 1800 }], talk("mum", 1800, 1200), talk("kian", 3200, 1800)) },
            { caption: "You should drink some warm tea and rest.", key: 2000, do: [].concat(pose("mum", "L", "hold", 0, 500), [{ id: "tea", to: { x: inHand("en-mother", [104, 86], 1, "L", "hold", 0.5)[0], o: 1 }, at: 400, dur: 300 }], talk("mum", 0, 2000)) },
            { caption: "Why don't you go to bed early tonight?", key: 1500, do: [].concat(pose("mum", "L", "down", 0, 400), [{ id: "tea", to: { o: 0 }, dur: 300 }], talk("mum", 0, 1800), pose("kian", "R", "down", 300, 400), [{ id: "kian", to: { r: 0 }, at: 300, dur: 400 }], nod("kian", 1500)) }
          ] },
        { type: "listen", say: "Can you swim? Yes, I can. I'm good at swimming.", prompt: "گوش کن. در چه کاری خوب است؟",
          options: [{ pic: "🏊", en: "swimming" }, { pic: "🎨", en: "painting" }, { pic: "🎹", en: "playing the piano" }], answer: "🏊" },
        { type: "listen", say: "What's wrong? I've got a toothache.", quiet: true, prompt: "گوش کن. چه مشکلی دارد؟",
          options: [{ pic: "🦷", en: "a toothache" }, { pic: "🤕", en: "a headache" }, { pic: "🤧", en: "a cold" }], answer: "🦷" },
        { type: "listen", say: "I've got a toothache. You should see a dentist.", quiet: true, prompt: "گوش کن. چه پیشنهادی داد؟",
          options: [{ pic: "🧑‍⚕️🦷", en: "see a dentist" }, { pic: "🍬", en: "eat sweets" }, { pic: "🏃", en: "go running" }], answer: "🧑‍⚕️🦷" },
        { type: "listen", show: "🤧", prompt: "دوستت سرما خورده. کدام پیشنهاد خوب است؟",
          options: [{ label: "You should stay warm and rest.", en: "You should stay warm and rest." }, { label: "You should eat ice cream.", en: "You should eat ice cream." }, { label: "You can't swim.", en: "You can't swim." }], answer: "You should stay warm and rest." },
        { type: "tip", text: "can برای توانایی است (I can swim.) و be good at برای کاری که خوب بلدیم (She's good at maths.). وقتی کسی حالش خوب نیست می‌پرسیم What's wrong? / What's the matter? و پیشنهاد می‌دهیم: You should … / Why don't you …? (Prospect 2، درس ۳ و ۴). با هم نقش بازی کنید: یکی بیمار و یکی دوست یا پزشک." }
      ]
    },
    {
      id: "english-forest-11", subject: "english", level: "forest", emoji: "🏙️", title: "شهر و روستا",
      steps: [
        /* One picture in two halves: the village on the left lights up (quiet hills and fields), then the city on the
           right (tall buildings, a car drives along the busy road). */
        { type: "scene", prompt: "گوش کن: روستا و شهر", bg: "#cdeaf7",
          parts: { sV: { art: "w-split-village" }, sC: { art: "w-split-city" }, car: { art: "w-car-red", at: [180, 84], s: 0.8 },
            dimC: { art: "en-dim-half", at: [80, 0], o: 0 }, dimV: { art: "en-dim-half", o: 0 } },
          scenes: [
            { caption: "This is my grandparents' village. It's quiet and green, with hills and small houses.", key: 1800, hold: 5400, do: [{ id: "dimC", to: { o: 1 }, dur: 600 }] },
            { caption: "And this is my city. It's big and busy. There are lots of tall buildings and cars.", key: 2600, hold: 5400, do: [{ id: "dimC", to: { o: 0 }, dur: 600 }, { id: "dimV", to: { o: 1 }, dur: 600 },
              { id: "car", to: { x: 92 }, at: 600, dur: 3000, ease: "linear" }] },
            { caption: "The village is quieter than the city, but the city has got more shops.", key: 1200, do: [{ id: "dimV", to: { o: 0 }, dur: 600 }] }
          ] },
        { type: "listen", say: "What's Yazd like? It's hot and dry. It's famous for its wind towers.", prompt: "گوش کن. یزد به چه معروف است؟",
          options: [{ label: "wind towers", en: "wind towers" }, { label: "beaches", en: "beaches" }, { label: "forests", en: "forests" }], answer: "wind towers" },
        { type: "listen", say: "Is there a cinema in your village? No, there isn't. But there are many beautiful gardens.", quiet: true, prompt: "گوش کن. روستایش چه دارد؟",
          options: [{ pic: "🌳🌷", en: "many gardens" }, { pic: "🎬", en: "a cinema" }, { pic: "🏬", en: "a shopping centre" }], answer: "🌳🌷" },
        { type: "record", pic: "🏘️", say: "I live in Mashhad. It's a big city in the north-east of Iran. There are many parks and shops. It's famous for its saffron.",
          prompt: "شهر یا روستای خودت را توصیف کن: کجاست، چطور است، چه چیزهایی دارد، به چه معروف است. یک یا دو دقیقه حرف بزن. نمونه را گوش کن و بعد ضبط کن.",
          check: ["گفت کجاست و چطور است (big، quiet، busy)؟", "از There is / There are استفاده کرد؟", "گفت به چه معروف است (famous for)؟", "دست‌کم چهار جمله گفت؟"] },
        { type: "tip", text: "برای توصیف شهر یا روستا: What's it like? It's big / small / busy / quiet / beautiful. There are many / lots of … It's famous for … مقایسه هم بکنید: The village is quieter than the city. درباره شهرهایی که دیده‌اید با هم حرف بزنید و کودک یکی را برای خانواده توصیف کند (Prospect 2، درس ۵ و ۶)." }
      ]
    },
    {
      id: "english-forest-12", subject: "english", level: "forest", emoji: "⛅", title: "هوا و سرگرمی",
      steps: [
        /* Arman's free time in three kinds of weather: sunny, he plays football in the park; rainy, the kitchen comes
           and he reads at home; snowy, the park comes back white with snow falling and he jumps in it. */
        { type: "scene", prompt: "گوش کن: هوا و سرگرمی‌های آرمان", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [132, 20], s: 1.1 }, snow: { art: "en-snow-ground", o: 0 }, dim: { art: "en-dim", o: 0 },
            kitchen: { art: "en-kitchen", o: 0 }, ball: { art: "en-ball", at: [96, 86], s: 1.6 },
            arman: { art: "en-arman", at: [80, 86], s: 1.15 }, book: { art: "📖", at: inHand("en-arman", [80, 86], 1.15, "R", "ask", 0.6), s: 0.6, o: 0 } },
          scenes: [
            { caption: "When it's sunny, I like playing football in the park.", key: 1300, do: [{ id: "arman.legR", to: { r: -35 }, at: 600, dur: 300, yoyo: true, times: 2 }, { id: "ball", path: "M96 86Q118 46 140 86", at: 900, dur: 1000 }] },
            { caption: "When it's rainy, I stay at home and read.", key: 3600, hold: 5600, do: [].concat([{ id: "ball", to: { o: 0 }, dur: 300 }, { id: "sun", to: { o: 0 }, dur: 600 }, { id: "dim", to: { o: 1 }, dur: 800 },
              { emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 24, dur: 1800, life: 1000 }, { id: "kitchen", to: { o: 1 }, at: 2000, dur: 800 }], pose("arman", "R", "ask", 2700, 500),
              [{ id: "book", to: { o: 1 }, at: 3100, dur: 300 }, { id: "arman.eyes", to: { x: 0.5, y: 0.7 }, at: 3200, dur: 300 }]) },
            { caption: "In winter, when it snows, I love playing in the snow!", key: 2800, hold: 5000, do: [].concat([{ id: "book", to: { o: 0 }, dur: 300 }, { id: "arman.eyes", to: { x: 0, y: 0 }, dur: 300 }], pose("arman", "R", "down", 0, 400),
              [{ id: "kitchen", to: { o: 0 }, dur: 800 }, { id: "sun", to: { o: 0 }, dur: 800 }, { id: "snow", to: { o: 1 }, at: 400, dur: 1000 }, { id: "dim", to: { o: 0.6 }, at: 400, dur: 800 },
                { emit: "spark", where: [80, 20], spread: [160, 10], rise: 50, n: 30, at: 600, dur: 3600, life: 1800 }], face("arman", true, 1200), jump("arman", 1600, 2, 5)) }
          ] },
        { type: "listen", say: "What's the weather like today? It's cloudy and windy.", prompt: "گوش کن. امروز هوا چطور است؟",
          options: [{ pic: "☁️💨", en: "cloudy and windy" }, { pic: "☀️", en: "sunny" }, { pic: "❄️", en: "snowy" }], answer: "☁️💨" },
        { type: "listen", say: "What do you do in your free time? I like reading comics and playing chess.", quiet: true, prompt: "گوش کن. در وقت آزادش چه می‌کند؟",
          options: [{ pic: "📚♟️", en: "reading and chess" }, { pic: "⚽🏊", en: "football and swimming" }, { pic: "🎨🎵", en: "painting and music" }], answer: "📚♟️" },
        { type: "record", pic: "🎨⚽📚", say: "In my free time, I like drawing and playing basketball. When it's sunny, I go cycling with my friends. When it's cold, I stay at home and read.",
          prompt: "درباره سرگرمی‌هایت در هواهای مختلف حرف بزن: وقتی آفتابی است، بارانی است، یا سرد است چه کار می‌کنی؟ از I like + ing استفاده کن.",
          check: ["دست‌کم دو سرگرمی گفت؟", "I like + ing را درست گفت (I like reading)؟", "درباره هوا هم چیزی گفت؟"] },
        { type: "tip", text: "بعد از like و love فعل با ing می‌آید: I like swimming. She loves drawing. برای هوا: What's the weather like? It's sunny / rainy / cloudy / windy / snowy. هر صبح از پنجره نگاه کنید و کودک هوا را به انگلیسی بگوید و بگوید در این هوا دوست دارد چه کار کند (Prospect 2، درس ۷)." }
      ]
    },
    {
      id: "english-forest-13", subject: "english", level: "forest", emoji: "🦁", title: "شخصیت",
      steps: [
        /* In the park, each child shows what they are like: Mina stays calm and smiles when a big dog runs up (brave);
           Reza picks up Grandpa's bag and gives it back (kind); Kian peeks out from behind a tree (shy). */
        { type: "scene", prompt: "گوش کن: آدم‌ها چه جورند؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, tree: { art: "en-tree", at: [146, 88], s: 1.1 }, kian: { art: "en-brother", at: [146, 86], s: 0.95, o: 0 },
            mina: { art: "en-mina", at: [26, 86], s: 1.05 }, dog: { art: "en-dog", at: [-30, 88], s: 1.2 },
            gran: { art: "en-grandpa", at: [96, 86] }, bag: { art: "🛍", at: [104, 84], s: 0.6, o: 0 }, reza: { art: "en-reza", at: [124, 86], s: 1 } },
          scenes: [
            { caption: "Mina is brave. A big dog comes, but she isn't afraid.", key: 2400, hold: 5000, do: [].concat(trot("dog", 8, 0, 1600), [{ id: "dog.jaw", to: { r: 30 }, at: 1600, dur: 400, yoyo: true, times: 4 }], face("mina", true, 1800), pose("mina", "L", [-60, -20], 2000, 500)) },
            { caption: "Reza is kind. Grandpa drops his bag, and Reza helps him.", key: 2800, hold: 5000, do: [].concat(pose("mina", "L", "down", 0, 400), [{ id: "bag", to: { o: 1 }, dur: 200 }, { id: "bag", to: { y: 86 }, at: 200, dur: 400, ease: "in" }],
              walk("reza", 110, 900, 800), pose("reza", "L", "point", 1800, 500), [{ id: "bag", to: { x: 101, y: 70 }, at: 2300, dur: 600 }], face("gran", true, 2700), talk("gran", 2900, 1200)) },
            { caption: "Kian is shy. He doesn't talk much, and he hides behind the tree.", key: 2400, hold: 5000, do: [{ id: "kian", to: { o: 1 }, dur: 1 }, { id: "kian", to: { x: 134 }, at: 400, dur: 1000 }, { id: "kian", to: { x: 146 }, at: 2600, dur: 1000 }] }
          ] },
        { type: "listen", say: "My sister is very hard-working. She studies every day.", prompt: "گوش کن. خواهرش چه جور آدمی است؟",
          options: [{ label: "hard-working", en: "hard-working" }, { label: "lazy", en: "lazy" }, { label: "shy", en: "shy" }], answer: "hard-working" },
        { type: "listen", say: "Mina is braver than Kian, but Kian is quieter.", quiet: true, prompt: "گوش کن. کدام درست است؟",
          options: [{ label: "Kian is quieter.", en: "Kian is quieter." }, { label: "Kian is braver.", en: "Kian is braver." }], answer: "Kian is quieter." },
        { type: "sort", prompt: "هر جمله را بخوان. درباره کدام صفت است؟",
          baskets: [{ label: "kind" }, { label: "brave" }, { label: "shy" }, { label: "hard-working" }],
          items: [{ label: "She always helps her friends.", say: "She always helps her friends.", basket: "kind" }, { label: "He isn't afraid of the dark.", say: "He isn't afraid of the dark.", basket: "brave" },
            { label: "She doesn't like talking to new people.", say: "She doesn't like talking to new people.", basket: "shy" }, { label: "He does his homework every day.", say: "He does his homework every day.", basket: "hard-working" },
            { label: "He gives his seat to old people.", say: "He gives his seat to old people.", basket: "kind" }, { label: "She climbs high mountains.", say: "She climbs high mountains.", basket: "brave" }] },
        { type: "tip", text: "کلمه‌های شخصیت (kind، brave، shy، hard-working، friendly، funny، polite، lazy) را با مثال یاد بگیرید: She's kind because she helps everyone. با هم شخصیت آدم‌های یک قصه یا یک فیلم را توصیف کنید و مقایسه کنید: Ali is braver than his brother. یادآوری کنید که درباره شخصیت دیگران مهربانانه حرف بزنیم (Prospect 3، درس ۱)." }
      ]
    },
    {
      id: "english-forest-14", subject: "english", level: "forest", emoji: "✈️", title: "سفر",
      steps: [
        /* The trip to Kish: at the airport Dad holds up the tickets; the plane goes along the runway and takes off,
           climbing into the sky; then the beach comes, with blue sea and waves, and Sara jumps for joy. */
        { type: "scene", prompt: "گوش کن: سفر سارا", bg: "#cfeaf7",
          parts: { ground: { art: "en-runway" }, beach: { art: "w-beach", o: 0 }, plane: { art: "en-plane", at: [40, 74], s: 1 },
            dad: { art: "en-father", at: [104, 86], s: 0.9 }, sara: { art: "en-sara", at: [126, 86], s: 0.9 },
            ticket: { art: "en-ticket", at: inHand("en-father", [104, 86], 0.9, "R", "hold", 0.4), s: 1, o: 0 } },
          scenes: [
            { caption: "Last summer, my family went to Kish Island. At the airport, we showed our tickets.", key: 1800, hold: 5600, do: [].concat(pose("dad", "R", "hold", 0, 500), [{ id: "ticket", to: { o: 1 }, at: 500, dur: 300 }], talk("dad", 800, 1400)) },
            { caption: "Then the plane took off.", key: 2600, hold: 4400, do: [].concat([{ id: "ticket", to: { o: 0 }, dur: 300 }], pose("dad", "R", "down", 0, 400), [{ id: "dad", to: { o: 0 }, at: 300, dur: 400 }, { id: "sara", to: { o: 0 }, at: 300, dur: 400 },
              { id: "plane", path: "M40 74L110 74Q140 72 190 20", at: 600, dur: 2800, ease: "in" }, { id: "plane", to: { r: -25 }, at: 2000, dur: 800 }]) },
            { caption: "Two hours later, we were in Kish. The sea was blue and warm!", key: 2400, do: [].concat([{ id: "beach", to: { o: 1 }, dur: 900 }, { id: "sara", to: { x: 80, y: 80 }, dur: 1 }, { id: "sara", to: { o: 1 }, at: 700, dur: 400 }, { id: "beach.waves", to: { x: 10 }, at: 600, dur: 3000, ease: "linear" }],
              face("sara", true, 900), jump("sara", 1400, 2, 5)) }
          ] },
        { type: "passage", prompt: "یادداشت سفر سارا را بخوان",
          text: "Day 1. We arrived in Kish at eleven o'clock. Our hotel was near the beach, so we went swimming in the afternoon. The water was warm and very clear. In the evening, we walked by the sea and watched the sunset. Day 2. We rented bicycles and rode around the island. We saw an old Greek ship near the coast. Then we ate fish and rice in a small restaurant. I was tired but very happy.",
          question: "روز دوم با چه چیزی دور جزیره رفتند؟", options: ["🚲", "🚗", "⛵"], answer: "🚲" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Day 1. We arrived in Kish at eleven o'clock. Our hotel was near the beach, so we went swimming in the afternoon. The water was warm and very clear. In the evening, we walked by the sea and watched the sunset. Day 2. We rented bicycles and rode around the island. We saw an old Greek ship near the coast. Then we ate fish and rice in a small restaurant. I was tired but very happy.",
          question: "روز اول عصر چه کردند؟", options: ["کنار دریا قدم زدند", "به رستوران رفتند", "دوچرخه‌سواری کردند"], answer: "کنار دریا قدم زدند" },
        { type: "passage", prompt: "یک سؤال آخر",
          text: "Day 1. We arrived in Kish at eleven o'clock. Our hotel was near the beach, so we went swimming in the afternoon. The water was warm and very clear. In the evening, we walked by the sea and watched the sunset. Day 2. We rented bicycles and rode around the island. We saw an old Greek ship near the coast. Then we ate fish and rice in a small restaurant. I was tired but very happy.",
          question: "چرا بعدازظهر روز اول شنا کردند؟", options: ["چون هتل نزدیک ساحل بود", "چون هوا سرد بود", "چون کشتی دیدند"], answer: "چون هتل نزدیک ساحل بود" },
        { type: "tip", text: "در سفر سه جور جمله لازم است: برنامه (We're going to visit …)، کارهای سفر (Can I have two tickets to Shiraz, please? What time does the train leave?) و تعریف کردن بعد از سفر در گذشته (We went … We saw … It was …). بعد از هر سفر، کودک یک یادداشت کوتاه سفر به انگلیسی بنویسد یا تعریف کند (Prospect 3، درس ۲)." }
      ]
    },
    {
      id: "english-forest-1", subject: "english", level: "forest", emoji: "⏪", title: "دیروز",
      steps: [
        { type: "passage", prompt: "این متن را بخوان: یک روز در تبریز",
          text: "Last month, my class went on a school trip to Tabriz. We left Tehran early in the morning and arrived at lunchtime. First, we visited the Grand Bazaar. It was very big and busy, and I bought a small carpet for my mother. Then our teacher took us to the Blue Mosque. The tiles were beautiful. In the evening, we ate dinner in a traditional restaurant and my friend Shirin told us funny stories. We came home the next day. I loved it!",
          question: "او برای مادرش چه خرید؟", options: ["یک فرش کوچک", "یک کتاب", "یک کاشی"], answer: "یک فرش کوچک" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Last month, my class went on a school trip to Tabriz. We left Tehran early in the morning and arrived at lunchtime. First, we visited the Grand Bazaar. It was very big and busy, and I bought a small carpet for my mother. Then our teacher took us to the Blue Mosque. The tiles were beautiful. In the evening, we ate dinner in a traditional restaurant and my friend Shirin told us funny stories. We came home the next day. I loved it!",
          question: "اول کجا رفتند؟", options: ["بازار بزرگ", "مسجد کبود", "رستوران"], answer: "بازار بزرگ" },
        { type: "sort", prompt: "گذشته این فعل‌ها با ed ساخته می‌شود یا بی‌قاعده است؟",
          baskets: [{ label: "regular (-ed)", value: "reg" }, { label: "irregular", value: "irr" }],
          items: [{ label: "visit → visited", say: "visit, visited", basket: "reg" }, { label: "buy → bought", say: "buy, bought", basket: "irr" }, { label: "arrive → arrived", say: "arrive, arrived", basket: "reg" },
            { label: "take → took", say: "take, took", basket: "irr" }, { label: "love → loved", say: "love, loved", basket: "reg" }, { label: "tell → told", say: "tell, told", basket: "irr" },
            { label: "leave → left", say: "leave, left", basket: "irr" }, { label: "stay → stayed", say: "stay, stayed", basket: "reg" }] },
        { type: "sort", prompt: "جای خالی کدام ضمیر است؟",
          baskets: [{ label: "him" }, { label: "her" }, { label: "them" }],
          items: [{ label: "I saw Ali and gave ___ the book.", say: "I saw Ali and gave him the book.", basket: "him" }, { label: "Shirin called, so I phoned ___ back.", say: "Shirin called, so I phoned her back.", basket: "her" },
            { label: "My cousins came, and we played with ___.", say: "My cousins came, and we played with them.", basket: "them" }, { label: "Dad was tired, so we helped ___.", say: "Dad was tired, so we helped him.", basket: "him" }] },
        { type: "tip", text: "گذشته ساده برای کارهای تمام‌شده در گذشته است: We visited … I bought … She told … فعل‌های بی‌قاعده پرکاربرد (go-went، buy-bought، take-took، tell-told، leave-left) را با کارت تمرین کنید. شب‌ها کودک روزش را در پنج جمله به گذشته تعریف کند؛ ضمیرهای مفعولی (him، her، them) را هم در جمله‌هایش به کار ببرد (Prospect 3، درس ۵ و ۶)." }
      ]
    },
    {
      id: "english-forest-15", subject: "english", level: "forest", emoji: "🌱", title: "جشن‌ها",
      steps: [
        /* Nowruz: blossoms open on the tree (spring), and the haft-sin goes on the table thing by thing; then night
           falls for Yalda and a watermelon, nuts and a book of poems come on the table. */
        { type: "scene", prompt: "گوش کن: جشن‌های ایرانی", bg: "#fdf0d5",
          parts: { skyD: { art: "en-sky-day" }, skyN: { art: "en-sky-night", o: 0 }, room: { art: "en-bedroom" },
            tbl: { art: "en-table", at: [64, 90], s: 1.3 },
            s1: { art: "sci-sabzeh", at: [40, 69.6], s: 0.8, o: 0 }, s2: { art: "🍎", at: [54, 70], s: 0.4, o: 0 }, s3: { art: "🧄", at: [64, 70], s: 0.4, o: 0 }, s4: { art: "🪙", at: [74, 70], s: 0.35, o: 0 },
            s5: { art: "🐟", at: [86, 68], s: 0.4, o: 0 }, s6: { art: "🪞", at: [98, 70], s: 0.5, o: 0 },
            y1: { art: "🍉", at: [50, 70], s: 0.55, o: 0 }, y2: { art: "🥜", at: [66, 70], s: 0.45, o: 0 }, y3: { art: "en-book", at: [80, 70], s: 0.7, o: 0 },
            gran: { art: "en-grandma", at: [130, 86] } },
          scenes: [
            { caption: "Nowruz is the Iranian New Year. It starts on the first day of spring.", key: 1800, hold: 5400, do: [].concat(wave("gran", "L", 400, 1400)) },
            { caption: "Families make a haft-sin table with sabzeh, apples, garlic, coins, a goldfish and a mirror.", key: 3200, hold: 5600, do: ["s1", "s2", "s3", "s4", "s5", "s6"].map(function (id, i) { return { id: id, to: { o: 1 }, at: 300 + i * 500, dur: 300 }; }) },
            { caption: "On Yalda night, the longest night of the year, we eat watermelon and nuts and read poems.", key: 3000, hold: 6000, do: [].concat(["s1", "s2", "s3", "s4", "s5", "s6"].map(function (id) { return { id: id, to: { o: 0 }, dur: 400 }; }),
              [{ id: "skyD", to: { o: 0 }, at: 300, dur: 1000 }, { id: "skyN", to: { o: 1 }, at: 300, dur: 1000 }, { id: "y1", to: { o: 1 }, at: 1300, dur: 300 }, { id: "y2", to: { o: 1 }, at: 1700, dur: 300 }, { id: "y3", to: { o: 1 }, at: 2100, dur: 300 }],
              talk("gran", 2400, 2200)) }
          ] },
        { type: "passage", prompt: "این متن را بخوان: جشن‌های ایران و جهان",
          text: "Iranians celebrate many festivals. Nowruz, the New Year, starts on the first day of spring. Before Nowruz, families clean their houses and buy new clothes. On the thirteenth day, Sizdah Bedar, people go out and have picnics in nature. Yalda is the longest night of the year. Families stay up late, eat pomegranates and watermelon, and read poems by Hafez. Mehregan is an old festival of autumn and friendship. In other countries, people have different festivals: in China, the New Year comes in January or February, and in many countries people celebrate it on the first of January.",
          question: "سیزده‌بدر مردم چه می‌کنند؟", options: ["در طبیعت پیک‌نیک می‌کنند", "خانه را تمیز می‌کنند", "شعر حافظ می‌خوانند"], answer: "در طبیعت پیک‌نیک می‌کنند" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Iranians celebrate many festivals. Nowruz, the New Year, starts on the first day of spring. Before Nowruz, families clean their houses and buy new clothes. On the thirteenth day, Sizdah Bedar, people go out and have picnics in nature. Yalda is the longest night of the year. Families stay up late, eat pomegranates and watermelon, and read poems by Hafez. Mehregan is an old festival of autumn and friendship. In other countries, people have different festivals: in China, the New Year comes in January or February, and in many countries people celebrate it on the first of January.",
          question: "مهرگان جشن چه فصلی است؟", options: ["پاییز", "بهار", "زمستان"], answer: "پاییز" },
        { type: "paper", pic: "🎉",
          text: "درباره آخرین نوروز یا شب یلدایی که داشتی یک متن کوتاه (۶ تا ۸ جمله) به گذشته بنویس: کجا بودی، با چه کسانی، چه کردید، چه خوردید و چه چیزی را بیشتر دوست داشتی.",
          example: "Last Nowruz, we went to my grandparents' house in Hamedan. We wore new clothes and sat around the haft-sin table. My grandpa gave us some money. Then we visited our aunts and uncles. On Sizdah Bedar, we had a picnic by a river. It was a wonderful holiday.",
          check: ["فعل‌ها را به گذشته نوشت؟", "شش جمله یا بیشتر نوشت؟", "گفت کجا بود و چه کرد؟", "از then، first یا because استفاده کرد؟"] },
        { type: "tip", text: "این درس در کتاب زبان پایه نهم هم هست (Prospect 3، درس ۳). درباره جشن‌های خانواده‌تان به انگلیسی حرف بزنید: What do you do at Nowruz? What do you eat on Yalda night? و جشن‌های کشورهای دیگر را هم با هم بخوانید. کلمه‌هایی مثل celebrate، festival، tradition و visit relatives را تمرین کنید." }
      ]
    },
    {
      id: "english-forest-16", subject: "english", level: "forest", emoji: "📬", title: "خدمات",
      steps: [
        /* At the post office: Sara puts a letter on the counter and asks politely; the clerk says the price; she pays
           with a coin; he takes the letter and puts it in the post bag. */
        { type: "scene", prompt: "گوش کن: در اداره پست", bg: "#fdf0d5",
          parts: { wall: { art: "en-kitchen" }, clerk: { art: "en-father", at: [120, 80], s: 1 }, counter: { art: "en-table", at: [104, 90], s: 1.3 },
            bag: { art: "en-bag", at: [150, 86], s: 1.4 }, sara: { art: "en-sara", at: [40, 86], s: 1.05 },
            letter: { art: "✉", at: inHand("en-sara", [40, 86], 1.05, "R", "point", 0.4), s: 0.4, o: 0 }, coin: { art: "🪙", at: inHand("en-sara", [40, 86], 1.05, "R", "point", 0.35), s: 0.35, o: 0 } },
          scenes: [
            { caption: "Good morning. I'd like to send this letter to Ahvaz, please.", key: 2200, hold: 5000, do: [].concat(pose("sara", "R", "point", 0, 500), [{ id: "letter", to: { o: 1 }, at: 400, dur: 200 }, arc("letter", inHand("en-sara", [40, 86], 1.05, "R", "point", 0.4), [86, 64], 900, 800, 6)], talk("sara", 0, 2600)) },
            { caption: "Of course. That's twenty thousand tomans.", key: 1500, do: [].concat(pose("sara", "R", "down", 0, 400), talk("clerk", 0, 1800), pose("clerk", "L", "point", 0, 500)) },
            { caption: "Here you are. Thank you very much.", key: 1700, do: [].concat(pose("clerk", "L", "down", 0, 400), pose("sara", "R", "point", 0, 500), [{ id: "coin", to: { o: 1 }, at: 400, dur: 200 }, arc("coin", inHand("en-sara", [40, 86], 1.05, "R", "point", 0.35), [80, 64], 800, 700, 6)], talk("sara", 0, 1800)) },
            { caption: "The clerk puts the letter in the post bag.", key: 1900, do: [arc("letter", [86, 64], [150, 70], 400, 1200, 10), { id: "letter", to: { o: 0 }, at: 1700, dur: 300 }, { id: "coin", to: { o: 0 }, dur: 300 }] }
          ] },
        { type: "listen", say: "Excuse me, I'd like to open a bank account, please.", prompt: "گوش کن. کجاست؟",
          options: [{ pic: "🏦", en: "at the bank" }, { pic: "🏥", en: "at the hospital" }, { pic: "📬", en: "at the post office" }], answer: "🏦" },
        { type: "listen", say: "Could you help me, please? I've got a bad pain in my stomach.", quiet: true, prompt: "گوش کن. کجا باید برود؟",
          options: [{ pic: "🏥", en: "the hospital" }, { pic: "🏦", en: "the bank" }, { pic: "🛒", en: "the supermarket" }], answer: "🏥" },
        { type: "listen", show: "🙏", prompt: "کدام درخواست مؤدبانه‌تر است؟",
          options: [{ label: "Could you help me, please?", en: "Could you help me, please?" }, { label: "Help me!", en: "Help me!" }], answer: "Could you help me, please?" },
        { type: "tip", text: "برای درخواست مؤدبانه: Could you …, please? / I'd like to …, please. / Excuse me, can you help me? و برای تشکر: Thank you very much. کودک در نقش مشتری بانک، پست یا داروخانه و شما در نقش کارمند؛ بعد جایتان عوض شود (Prospect 3، درس ۴)." }
      ]
    },
    {
      id: "english-forest-17", subject: "english", level: "forest", emoji: "📺", title: "رسانه",
      steps: [
        { type: "listen", say: "Good evening. Here is the news. Today, a new library opened in Shiraz. It has got more than fifty thousand books.", prompt: "به خبر گوش کن. در شیراز چه باز شد؟",
          options: [{ pic: "📚", en: "a library" }, { pic: "🏥", en: "a hospital" }, { pic: "🏟️", en: "a stadium" }], answer: "📚" },
        { type: "listen", say: "And now, the weather. Tomorrow will be rainy in the north and sunny in the south.", quiet: true, prompt: "گوش کن. فردا جنوب هوا چطور است؟",
          options: [{ pic: "☀️", en: "sunny" }, { pic: "🌧️", en: "rainy" }, { pic: "❄️", en: "snowy" }], answer: "☀️" },
        { type: "passage", prompt: "این پست را در اینترنت دیدی. بخوان",
          text: "AMAZING NEWS!!! Scientists say that eating ten chocolate bars a day makes you taller and cleverer! Share this with all your friends now!!! (No name, no date, no link to a study.)",
          question: "به نظرت این خبر قابل‌اعتماد است؟", options: ["نه، نشانه‌های خبر نادرست دارد", "بله، چون نوشته دانشمندان", "بله، چون همه می‌فرستند"], answer: "نه، نشانه‌های خبر نادرست دارد" },
        { type: "passage", prompt: "و این یکی را",
          text: "City News, 12 May. On Tuesday, doctors at the city health centre said that children aged six to twelve should sleep nine to twelve hours a night. They explained that sleep helps us learn and stay healthy.",
          question: "چرا این یکی قابل‌اعتمادتر است؟", options: ["نام منبع و تاریخ دارد", "کوتاه‌تر است", "علامت تعجب ندارد"], answer: "نام منبع و تاریخ دارد" },
        { type: "tip", text: "کلمه‌های رسانه: news، TV، radio، the internet، a website، a post، share. با کودک یاد بگیرید هر خبری را باور نکند و سه سؤال بپرسد: Who wrote it? When? Is there another source? نشانه‌های خبر نادرست: علامت تعجب زیاد، بدون نام و تاریخ، «همین الان به همه بفرست». خبرهای کوتاه انگلیسی مخصوص کودکان را با هم گوش کنید (Prospect 3، درس ۵)." }
      ]
    },
    {
      id: "english-forest-18", subject: "english", level: "forest", emoji: "🩹", title: "سلامت و آسیب",
      steps: [
        /* Reza runs, trips and falls; he sits holding his knee, sad; Mum comes, washes the knee with water and puts a
           plaster on it; he smiles and stands up. */
        { type: "scene", prompt: "گوش کن", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, reza: { art: "en-reza", at: [20, 86], s: 1.1 }, mum: { art: "en-mother", at: [190, 86], s: 1.1 },
            plaster: { art: "en-plaster", at: [82.6, 85.4], s: 1.6, o: 0 } },
          scenes: [
            { caption: "Oh no! Reza fell over in the park.", key: 1900, do: [].concat(run("reza", 74, 0, 1200), [{ id: "reza", to: { r: 70, y: 84, x: 80 }, at: 1200, dur: 400, ease: "in" }]) },
            { caption: "He hurt his knee. Ouch!", key: 2000, do: [].concat([{ id: "reza", to: { r: 0, y: 92, x: 80 }, dur: 600 }], face("reza", false, 600), pose("reza", "R", [-20, 40], 700, 500), [{ id: "reza.legR", to: { sy: 0.7 }, at: 600, dur: 400 }]) },
            { caption: "Mum washed it with clean water and put on a plaster.", key: 3300, hold: 5200, do: [].concat([{ id: "mum", walk: [104, 86], dur: 1800 }, { emit: "drop", where: [84, 76], spread: [4, 2], rise: 6, n: 8, at: 1900, dur: 800, life: 700 }, { id: "plaster", to: { o: 1 }, at: 3000, dur: 300 }], pose("mum", "L", [-40, 20], 1800, 500), talk("mum", 1900, 1200)) },
            { caption: "Thanks, Mum. I feel better now.", key: 1800, do: [].concat(pose("mum", "L", "down", 0, 400), pose("reza", "R", "down", 0, 400), face("reza", true, 300), [{ id: "reza", to: { y: 86 }, at: 600, dur: 800 }, { id: "reza.legR", to: { sy: 1 }, at: 600, dur: 800 }, { id: "plaster", to: { y: 79.4 }, at: 600, dur: 800 }], talk("reza", 900, 1200)) }
          ] },
        { type: "listen", say: "What happened? I cut my finger with a knife.", prompt: "گوش کن. چه اتفاقی افتاد؟",
          options: [{ pic: "🔪☝️", en: "cut my finger" }, { pic: "🦵", en: "hurt my leg" }, { pic: "🔥✋", en: "burnt my hand" }], answer: "🔪☝️" },
        { type: "listen", say: "I burnt my hand on the stove. Put it under cold water for ten minutes.", quiet: true, prompt: "گوش کن. چه کار باید کرد؟",
          options: [{ pic: "🚰", en: "cold water" }, { pic: "🧈", en: "butter" }, { pic: "🧊", en: "ice" }], answer: "🚰" },
        { type: "listen", say: "My ankle hurts. I think I sprained it.", quiet: true, prompt: "گوش کن. کجایش درد می‌کند؟",
          options: [{ label: "ankle", en: "ankle" }, { label: "elbow", en: "elbow" }, { label: "back", en: "back" }], answer: "ankle" },
        { type: "tip", text: "کلمه‌های آسیب و کمک‌های اولیه: I cut my finger. I hurt my knee. I burnt my hand. It hurts. a plaster، a bandage، first aid. اطلاع درست هم مهم است: سوختگی را زیر آب سرد (نه یخ و نه کره) نگه می‌داریم. اگر آسیب جدی است فوراً به بزرگ‌تر بگو و با اورژانس ۱۱۵ تماس بگیرید (Prospect 3، درس ۶)." }
      ]
    },
    {
      id: "english-forest-3", subject: "english", level: "forest", emoji: "📄", title: "متن بلندتر",
      steps: [
        { type: "passage", prompt: "این متن را بخوان: کاریزها",
          text: "For thousands of years, people in the hot, dry parts of Iran have used qanats to bring water to their towns and farms. A qanat is a long tunnel under the ground. It starts at the foot of a mountain, where there is water deep in the ground, and slowly goes down to the village. Workers dug the tunnels by hand, and they made deep wells along the way to take out the earth and let air in. Because the water travels under the ground, the hot sun cannot dry it. Some qanats are more than fifty kilometres long, and some are still working today. In 2016, UNESCO added eleven Persian qanats to its World Heritage List. Today, many people think we can learn from qanats, because they use water carefully and do not waste it.",
          question: "ایده اصلی این متن چیست؟", options: ["قنات چیست و چطور آب می‌آورد", "زندگی در کوهستان", "یونسکو چیست"], answer: "قنات چیست و چطور آب می‌آورد" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "For thousands of years, people in the hot, dry parts of Iran have used qanats to bring water to their towns and farms. A qanat is a long tunnel under the ground. It starts at the foot of a mountain, where there is water deep in the ground, and slowly goes down to the village. Workers dug the tunnels by hand, and they made deep wells along the way to take out the earth and let air in. Because the water travels under the ground, the hot sun cannot dry it. Some qanats are more than fifty kilometres long, and some are still working today. In 2016, UNESCO added eleven Persian qanats to its World Heritage List. Today, many people think we can learn from qanats, because they use water carefully and do not waste it.",
          question: "چرا آفتاب آب قنات را خشک نمی‌کند؟", options: ["چون آب زیر زمین حرکت می‌کند", "چون قنات‌ها در کوه هستند", "چون آب خیلی سرد است"], answer: "چون آب زیر زمین حرکت می‌کند" },
        { type: "passage", prompt: "و یک سؤال درباره منظور نویسنده",
          text: "For thousands of years, people in the hot, dry parts of Iran have used qanats to bring water to their towns and farms. A qanat is a long tunnel under the ground. It starts at the foot of a mountain, where there is water deep in the ground, and slowly goes down to the village. Workers dug the tunnels by hand, and they made deep wells along the way to take out the earth and let air in. Because the water travels under the ground, the hot sun cannot dry it. Some qanats are more than fifty kilometres long, and some are still working today. In 2016, UNESCO added eleven Persian qanats to its World Heritage List. Today, many people think we can learn from qanats, because they use water carefully and do not waste it.",
          question: "نویسنده درباره قنات‌ها چه فکری دارد؟", options: ["از آن‌ها می‌شود درس گرفت", "دیگر به درد نمی‌خورند", "خیلی خطرناک‌اند"], answer: "از آن‌ها می‌شود درس گرفت" },
        { type: "tip", text: "برای متن‌های بلندتر سه بار بخوانید: بار اول سریع برای ایده اصلی (درباره چیست؟)، بار دوم با دقت برای جزئیات، و بار سوم برای منظور نویسنده (او چه فکر می‌کند؟). لازم نیست همه کلمه‌ها را بداند؛ کلمه‌های تازه را از جمله حدس بزند و فقط دو سه تا را در فرهنگ لغت پیدا کند." }
      ]
    },
    {
      id: "english-forest-19", subject: "english", level: "forest", emoji: "📞", title: "داشتم می‌رفتم که …",
      steps: [
        /* In the kitchen: Mina is reading, the phone on the table rings (it shakes); while she talks on it, the cat
           jumps onto the table and eats her bread; she turns and sees it, upset. */
        { type: "scene", prompt: "گوش کن: چه داشت می‌شد، که …", bg: "#fdf0d5",
          parts: { kitchen: { art: "en-kitchen" }, table: { art: "en-table", at: [96, 90], s: 1.2 }, phone: { art: "📱", at: [84, 66], s: 0.45 }, bread: { art: "🍞", at: [110, 66], s: 0.5 },
            cat: { art: "en-cat", at: [146, 88], s: 1, flip: 1 }, mina: { art: "en-mina", at: [44, 86], s: 1.15 },
            book: { art: "📖", at: inHand("en-mina", [44, 86], 1.15, "R", "ask", 0.6), s: 0.6 } },
          scenes: [
            { caption: "Mina was reading a book in the kitchen.", key: 1500, do: [].concat(pose("mina", "R", "ask", 0, 1), [{ id: "mina.eyes", to: { x: 0.5, y: 0.7 }, dur: 1 }, { id: "book", to: { r: 5 }, at: 300, dur: 1600, yoyo: true, times: 2 }]) },
            { caption: "She was reading when the phone rang.", key: 1600, do: [{ id: "phone", to: { r: 12 }, at: 400, dur: 1600, yoyo: true, times: 10 }, { emit: "spark", where: [84, 58], spread: [6, 3], n: 6, at: 400, dur: 1400, life: 600 }, { id: "mina.eyes", to: { x: 0.7, y: 0 }, at: 900, dur: 300 }] },
            { caption: "While she was talking on the phone, the cat jumped onto the table.", key: 2600, hold: 5400, do: [].concat([{ id: "book", to: { o: 0 }, dur: 300 }], walk("mina", 70, 0, 900), pose("mina", "R", "ear", 1000, 500),
              [{ id: "phone", to: { x: inHand("en-mina", [70, 86], 1.15, "R", "ear", 0.45)[0], y: inHand("en-mina", [70, 86], 1.15, "R", "ear", 0.45)[1] }, at: 1100, dur: 400 }], talk("mina", 1500, 3000),
              [{ id: "cat", path: "M146 88Q138 50 124 67", at: 1800, dur: 900 }]) },
            { caption: "It ate her bread! Oh no, naughty cat!", key: 2000, do: [].concat([{ id: "cat.head", to: { r: 20 }, dur: 400, yoyo: true, times: 6 }, { id: "bread", to: { s: 0.25 }, dur: 2000 }, { id: "mina.eyes", to: { x: 0.8 }, at: 1200, dur: 300 }], face("mina", false, 1300)) }
          ] },
        { type: "passage", prompt: "این قصه را بخوان",
          text: "It was a cold winter evening. I was walking home from school when it started to snow. While I was crossing the park, I heard a small noise under a bench. It was a little kitten! It was shaking and it looked hungry. I picked it up and put it inside my coat. When I got home, my mum gave it some warm milk. Now the kitten lives with us. We called it Barf, because we found it on a snowy day.",
          question: "او کی گربه را پیدا کرد؟", options: ["وقتی از پارک رد می‌شد", "وقتی در خانه بود", "وقتی شیر می‌خورد"], answer: "وقتی از پارک رد می‌شد" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "It was a cold winter evening. I was walking home from school when it started to snow. While I was crossing the park, I heard a small noise under a bench. It was a little kitten! It was shaking and it looked hungry. I picked it up and put it inside my coat. When I got home, my mum gave it some warm milk. Now the kitten lives with us. We called it Barf, because we found it on a snowy day.",
          question: "چرا اسمش را «برف» گذاشتند؟", options: ["چون روز برفی پیدایش کردند", "چون سفید بود", "چون سرما خورده بود"], answer: "چون روز برفی پیدایش کردند" },
        { type: "order", prompt: "اتفاق‌های قصه را به ترتیب بچین", ltr: true,
          items: ["I was walking home from school.", "It started to snow.", "I heard a noise under a bench.", "I put the kitten inside my coat.", "My mum gave it some warm milk."] },
        { type: "tip", text: "گذشته استمراری (was / were + ing) کاری است که در گذشته در جریان بود: I was walking. اغلب با when (کار کوتاهی که وسطش پیش آمد: when it started to snow) یا while (در حالی که) می‌آید. کودک یک خاطره را با این ساختار تعریف کند: I was … when … ؛ مثلاً «داشتم مسواک می‌زدم که برق رفت»." }
      ]
    },
    {
      id: "english-forest-20", subject: "english", level: "forest", emoji: "🏔️", title: "تا حالا …؟",
      steps: [
        /* Reza asks Sara about her experiences; each answer brings up a picture in a frame: the mountain she has
           climbed, the sea she has never seen (it stays crossed out), the plane she has flown in. */
        { type: "scene", prompt: "گوش کن: تا حالا …؟", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, f1: { art: "en-frame", at: [52, 10], sx: 0.36, sy: 0.4, o: 0 }, p1: { art: "⛰", at: [60, 26], s: 0.9, o: 0 },
            f2: { art: "en-frame", at: [72, 10], sx: 0.36, sy: 0.4, o: 0 }, p2: { art: "🌊", at: [80, 26], s: 0.9, o: 0 }, x2: { art: "en-cross", at: [80, 18], o: 0 },
            f3: { art: "en-frame", at: [92, 10], sx: 0.36, sy: 0.4, o: 0 }, p3: { art: "en-plane", at: [100, 22], s: 0.3, o: 0 },
            reza: { art: "en-reza", at: [34, 86], s: 1.1 }, sara: { art: "en-sara", at: [124, 86], s: 1.1 } },
          scenes: [
            { caption: "Have you ever climbed a mountain, Sara? Yes, I have. I've climbed Mount Damavand!", key: 3000, hold: 6000, do: [].concat(talk("reza", 0, 2000), pose("reza", "R", "ask", 0, 500), [{ id: "f1", to: { o: 1 }, at: 2600, dur: 300 }, { id: "p1", to: { o: 1 }, at: 2800, dur: 300 }], talk("sara", 2300, 2600), face("sara", true, 2300)) },
            { caption: "Have you ever seen the Persian Gulf? No, I've never seen it.", key: 3000, hold: 5600, do: [].concat(pose("reza", "R", "down", 0, 400), talk("reza", 0, 1800), [{ id: "f2", to: { o: 1 }, at: 2200, dur: 300 }, { id: "p2", to: { o: 1 }, at: 2400, dur: 300 }, { id: "x2", to: { o: 1 }, at: 2800, dur: 300 }], talk("sara", 2100, 1800), shake("sara", 2400)) },
            { caption: "Have you ever been on a plane? Yes, I've flown to Mashhad twice.", key: 2800, hold: 5600, do: [].concat(talk("reza", 0, 1600), [{ id: "f3", to: { o: 1 }, at: 2000, dur: 300 }, { id: "p3", to: { o: 1 }, at: 2200, dur: 300 }], talk("sara", 1900, 2200), nod("sara", 2000)) }
          ] },
        { type: "listen", say: "Have you ever eaten sushi? No, I haven't, but I'd like to try it.", prompt: "گوش کن. تا حالا سوشی خورده؟",
          options: [{ label: "✅ Yes, he has.", en: "Yes, he has." }, { label: "❌ No, he hasn't.", en: "No, he hasn't." }], answer: "❌ No, he hasn't." },
        { type: "listen", say: "I've visited Isfahan three times. I love the bridges there.", quiet: true, prompt: "گوش کن. چند بار به اصفهان رفته؟",
          options: [{ label: "3", en: "three times" }, { label: "1", en: "once" }, { label: "never", en: "never" }], answer: "3" },
        { type: "sort", prompt: "هر جمله را بخوان. تجربه کل زندگی است (present perfect) یا یک زمان مشخص در گذشته (past simple)؟",
          baskets: [{ label: "have / has + done", value: "pp" }, { label: "did (yesterday, last year)", value: "ps" }],
          items: [{ label: "I've been to Kish.", say: "I've been to Kish.", basket: "pp" }, { label: "I went to Kish last summer.", say: "I went to Kish last summer.", basket: "ps" },
            { label: "She has never seen snow.", say: "She has never seen snow.", basket: "pp" }, { label: "She saw snow in Tabriz in 2023.", say: "She saw snow in Tabriz in 2023.", basket: "ps" },
            { label: "Have you ever ridden a horse?", say: "Have you ever ridden a horse?", basket: "pp" }, { label: "Did you ride a horse yesterday?", say: "Did you ride a horse yesterday?", basket: "ps" }] },
        { type: "tip", text: "حال کامل (have / has + قسمت سوم فعل) برای تجربه‌هایی است که زمانشان مهم نیست: I've been to Shiraz. Have you ever …? I've never … وقتی زمان را می‌گوییم (last year، in 2020) گذشته ساده می‌آید: I went to Shiraz last year. بازی «تا حالا …؟»: به نوبت بپرسید Have you ever …? و جواب بدهید." }
      ]
    },
    {
      id: "english-forest-21", subject: "english", level: "forest", emoji: "⏳", title: "تازه، هنوز",
      steps: [
        { type: "listen", say: "Have you finished your homework yet? Yes, I've just finished it.", prompt: "گوش کن. تکلیفش را تمام کرده؟",
          options: [{ label: "✅ just finished", en: "I've just finished it." }, { label: "⏳ not yet", en: "Not yet." }], answer: "✅ just finished" },
        { type: "listen", say: "Is Dad home? No, he hasn't come home yet.", quiet: true, prompt: "گوش کن. پدر خانه است؟",
          options: [{ label: "⏳ not yet", en: "He hasn't come home yet." }, { label: "🏠 already home", en: "He's already home." }], answer: "⏳ not yet" },
        { type: "listen", say: "Do you want to watch this film? No, thanks. I've already seen it.", quiet: true, prompt: "گوش کن. چرا نمی‌خواهد فیلم را ببیند؟",
          options: [{ label: "He has already seen it.", en: "He has already seen it." }, { label: "He hasn't got time.", en: "He hasn't got time." }, { label: "He doesn't like films.", en: "He doesn't like films." }], answer: "He has already seen it." },
        { type: "sort", prompt: "هر جمله را بخوان. جای خالی کدام است؟",
          baskets: [{ label: "just" }, { label: "already" }, { label: "yet" }],
          items: [{ label: "The bus has ___ left. Look, it's over there!", say: "The bus has just left. Look, it's over there!", basket: "just" }, { label: "I haven't eaten lunch ___.", say: "I haven't eaten lunch yet.", basket: "yet" },
            { label: "We've ___ bought the tickets, so we don't need to queue.", say: "We've already bought the tickets, so we don't need to queue.", basket: "already" }, { label: "Have you called Grandma ___?", say: "Have you called Grandma yet?", basket: "yet" },
            { label: "She has ___ woken up. She's still in her pyjamas.", say: "She has just woken up. She's still in her pyjamas.", basket: "just" }, { label: "I've ___ read this book twice!", say: "I've already read this book twice!", basket: "already" }] },
        { type: "tip", text: "just یعنی «همین الان، تازه» (I've just eaten.)، already یعنی «قبلاً، زودتر از انتظار» (I've already done it.) و yet در سؤال و منفی یعنی «تا حالا، هنوز» (Have you finished yet? I haven't finished yet.). وقتی کاری در خانه انجام می‌شود بپرسید Have you … yet? و کودک با just یا already یا not yet جواب بدهد." }
      ]
    },
    {
      id: "english-forest-22", subject: "english", level: "forest", emoji: "🧶", title: "ساخته می‌شود",
      steps: [
        /* A rug being made on a loom: Grandma's hands move and the rug grows row by row from the top; balls of
           coloured wool sit beside her; then the finished rug is shown. */
        { type: "scene", prompt: "گوش کن: فرش چطور ساخته می‌شود؟", bg: "#fdf0d5",
          parts: { wall: { art: "en-kitchen" }, loom: { art: "en-loom", at: [96, 20] }, rug: { art: "en-rug-wall", at: [96, 22], sy: 0.02 },
            w1: { art: "🧶", at: [130, 88], s: 0.6 }, w2: { art: "🧶", at: [140, 88], s: 0.5 }, gran: { art: "en-grandma", at: [62, 88], s: 1.05 }, sara: { art: "en-sara", at: [150, 86], s: 0.9, o: 0 } },
          scenes: [
            { caption: "Persian rugs are made by hand.", key: 2400, hold: 4800, do: [].concat(pose("gran", "R", [-80, -20], 0, 500), [{ id: "gran.foreR", to: { r: "+14" }, at: 500, dur: 3000, yoyo: true, times: 10 }, { id: "rug", to: { sy: 0.35 }, at: 500, dur: 3200, ease: "linear" }]) },
            { caption: "The wool is coloured with plants, like madder and indigo.", key: 1800, do: [{ id: "w1", to: { y: "-3" }, dur: 500, yoyo: true, times: 2 }, { id: "w2", to: { y: "-3" }, at: 400, dur: 500, yoyo: true, times: 2 }, { id: "rug", to: { sy: 0.55 }, dur: 2400, ease: "linear" }, { id: "gran.foreR", to: { r: "+14" }, dur: 2400, yoyo: true, times: 8 }] },
            { caption: "A big rug is made in many months. This rug was made by my grandma!", key: 3000, hold: 5600, do: [].concat([{ id: "rug", to: { sy: 1 }, dur: 2400, ease: "linear" }, { id: "gran.foreR", to: { r: "+14" }, dur: 2400, yoyo: true, times: 8 }, { id: "sara", to: { o: 1 }, at: 2200, dur: 400 }],
              pose("gran", "R", "down", 2500, 400), face("gran", true, 2600), talk("sara", 2600, 2400)) }
          ] },
        { type: "listen", say: "This bridge was built about four hundred years ago.", prompt: "گوش کن. پل کی ساخته شد؟",
          options: [{ label: "about 400 years ago", en: "about four hundred years ago" }, { label: "about 40 years ago", en: "about forty years ago" }, { label: "last year", en: "last year" }], answer: "about 400 years ago" },
        { type: "listen", say: "Saffron is grown in Khorasan. It's used in rice and sweets.", quiet: true, prompt: "گوش کن. زعفران کجا کاشته می‌شود؟",
          options: [{ label: "Khorasan", en: "Khorasan" }, { label: "Gilan", en: "Gilan" }, { label: "Hormozgan", en: "Hormozgan" }], answer: "Khorasan" },
        { type: "sort", prompt: "هر جمله را بخوان. معلوم (کسی کاری می‌کند) است یا مجهول (کاری روی چیزی انجام می‌شود)؟",
          baskets: [{ label: "active: People make …", value: "act" }, { label: "passive: … is made", value: "pas" }],
          items: [{ label: "Rugs are made in Kashan.", say: "Rugs are made in Kashan.", basket: "pas" }, { label: "My grandma makes rugs.", say: "My grandma makes rugs.", basket: "act" },
            { label: "The book was written in 1900.", say: "The book was written in 1900.", basket: "pas" }, { label: "Ferdowsi wrote the Shahnameh.", say: "Ferdowsi wrote the Shahnameh.", basket: "act" },
            { label: "Tea is grown in Lahijan.", say: "Tea is grown in Lahijan.", basket: "pas" }, { label: "Farmers grow tea in Lahijan.", say: "Farmers grow tea in Lahijan.", basket: "act" }] },
        { type: "tip", text: "مجهول (be + قسمت سوم فعل) وقتی می‌آید که خود کار مهم‌تر از کننده آن است: Rugs are made in Kashan. The bridge was built in 1602. در خانه بپرسید What is it made of? Where was it made? و برچسب «ساخت …» (Made in …) وسایل را با هم بخوانید." }
      ]
    },
    {
      id: "english-forest-23", subject: "english", level: "forest", emoji: "🌦️", title: "اگر …",
      steps: [
        /* The family's plan for tomorrow, both ways: if it rains (grey sky, rain), the kitchen comes and they play a
           board game at home; if it's sunny, the park and sun come back and the children jump. */
        { type: "scene", prompt: "گوش کن: اگر …، …", bg: "#cfeaf7",
          parts: { park: { art: "en-park" }, sun: { art: "☀", at: [132, 20], s: 1.1, o: 0 }, dim: { art: "en-dim", o: 0 }, kitchen: { art: "en-kitchen", o: 0 },
            table: { art: "en-table", at: [80, 90], s: 1.1, o: 0 }, dice: { art: "🎲", at: [80, 70], s: 0.5, o: 0 },
            mum: { art: "en-mother", at: [30, 86], s: 1.15 }, reza: { art: "en-reza", at: [110, 86] }, sara: { art: "en-sara", at: [134, 86] } },
          scenes: [
            { caption: "What will we do tomorrow? It depends on the weather.", key: 1500, do: [].concat(talk("mum", 0, 2200), pose("mum", "R", "ask", 0, 500)) },
            { caption: "If it rains, we'll stay at home and play a board game.", key: 3000, hold: 5600, do: [].concat(pose("mum", "R", "down", 0, 400), [{ id: "dim", to: { o: 1 }, dur: 800 }, { emit: "drop", where: [80, 20], spread: [160, 10], rise: 40, n: 24, dur: 1600, life: 1000 },
              { id: "kitchen", to: { o: 1 }, at: 1800, dur: 800 }, { id: "table", to: { o: 1 }, at: 1800, dur: 800 }, { id: "dice", to: { o: 1 }, at: 2400, dur: 300 }, { id: "dice", to: { r: 360 }, at: 2700, dur: 800 }], talk("mum", 0, 2600)) },
            { caption: "But if it's sunny, we'll go to the park!", key: 2400, do: [].concat([{ id: "kitchen", to: { o: 0 }, dur: 800 }, { id: "table", to: { o: 0 }, dur: 800 }, { id: "dice", to: { o: 0 }, dur: 400 }, { id: "dim", to: { o: 0 }, dur: 800 }, { id: "sun", to: { o: 1 }, at: 600, dur: 800 }],
              face("reza", true, 1000), face("sara", true, 1000), jump("reza", 1300, 1, 5), jump("sara", 1400, 1, 5)) }
          ] },
        { type: "listen", say: "If you don't water the plants, they will die.", prompt: "گوش کن. اگر به گیاه آب ندهیم چه می‌شود؟",
          options: [{ pic: "🥀", en: "they will die" }, { pic: "🌻", en: "they will grow" }], answer: "🥀" },
        { type: "listen", say: "If I finish my homework early, I'll call my friend.", quiet: true, prompt: "گوش کن. اگر تکلیفش زود تمام شود چه می‌کند؟",
          options: [{ pic: "📞", en: "call a friend" }, { pic: "📺", en: "watch TV" }, { pic: "😴", en: "sleep" }], answer: "📞" },
        { type: "order", prompt: "جمله شرطی را بساز", ltr: true, say: "If it snows, we will make a snowman.", items: ["If", "it", "snows,", "we", "will", "make", "a", "snowman."] },
        { type: "order", prompt: "جمله شرطی را بساز", ltr: true, say: "You will be late if you don't hurry.", items: ["You", "will", "be", "late", "if", "you", "don't", "hurry."] },
        { type: "tip", text: "شرطی نوع اول برای چیزی است که ممکن است پیش بیاید: If + حال ساده، will + فعل: If it rains, we'll stay at home. بعد از if از will استفاده نمی‌کنیم (نه If it will rain). بازی زنجیره‌ای کنید: If I go to the park, I'll play football. If I play football, I'll get hungry. If I get hungry, I'll eat …" }
      ]
    },
    {
      id: "english-forest-24", subject: "english", level: "forest", emoji: "🔗", title: "کسی که، چیزی که",
      steps: [
        { type: "listen", say: "A dentist is a doctor who looks after your teeth.", prompt: "گوش کن. کدام؟",
          options: [{ pic: "🦷", en: "a dentist" }, { pic: "👁️", en: "an eye doctor" }, { pic: "🐾", en: "a vet" }], answer: "🦷" },
        { type: "listen", say: "A fridge is a machine which keeps food cold.", quiet: true, prompt: "گوش کن. کدام؟",
          options: [{ pic: "🧊", en: "a fridge" }, { pic: "🔥", en: "an oven" }, { pic: "🧺", en: "a washing machine" }], answer: "🧊" },
        { type: "listen", show: "🔗", prompt: "کدام جمله درست است؟",
          options: [{ label: "The boy who lives next door is my friend.", en: "The boy who lives next door is my friend." }, { label: "The boy which lives next door is my friend.", en: "The boy which lives next door is my friend." }], answer: "The boy who lives next door is my friend." },
        { type: "order", prompt: "دو جمله را با who یکی کن: I have a friend. She speaks three languages.", ltr: true, items: ["I", "have", "a", "friend", "who", "speaks", "three", "languages."] },
        { type: "order", prompt: "با although بساز: هوا سرد بود، ولی شنا کردیم.", ltr: true, items: ["Although", "it", "was", "cold,", "we", "went", "swimming."] },
        { type: "order", prompt: "با so بساز: خسته بودم، پس زود خوابیدم.", ltr: true, items: ["I", "was", "tired,", "so", "I", "went", "to", "bed", "early."] },
        { type: "tip", text: "who برای آدم‌ها و which برای چیزها و حیوان‌هاست؛ that برای هر دو می‌آید: a teacher who helps us، a book which / that I like. although یعنی «با اینکه»، so یعنی «پس» و however یعنی «با این حال». بازی «تعریف کن»: یکی بگوید It's a person who … یا It's a thing which … و دیگری حدس بزند." }
      ]
    },
    {
      id: "english-forest-25", subject: "english", level: "forest", emoji: "📻", title: "گوش کن: برنامه رادیویی",
      steps: [
        { type: "listen", say: "Hello and welcome to Young Voices. Today, our guest is Leila, a fourteen-year-old girl from Bushehr. Leila loves the sea, and last year she started a group that cleans the beach every Friday.", prompt: "به برنامه رادیویی گوش کن. لیلا اهل کجاست؟",
          options: [{ label: "Bushehr", en: "Bushehr" }, { label: "Bandar Abbas", en: "Bandar Abbas" }, { label: "Rasht", en: "Rasht" }], answer: "Bushehr" },
        { type: "listen", say: "Hello and welcome to Young Voices. Today, our guest is Leila, a fourteen-year-old girl from Bushehr. Leila loves the sea, and last year she started a group that cleans the beach every Friday.", quiet: true, prompt: "دوباره گوش کن. گروه لیلا چه کار می‌کند؟",
          options: [{ pic: "🏖️🧹", en: "cleans the beach" }, { pic: "🐟🎣", en: "goes fishing" }, { pic: "⛵", en: "goes sailing" }], answer: "🏖️🧹" },
        { type: "listen", say: "Leila, why did you start the group? Well, I saw a lot of plastic on the beach, and I learned that plastic can kill sea animals. So I asked my friends to help.", quiet: true, prompt: "گوش کن. چرا گروه را راه انداخت؟",
          options: [{ label: "because of plastic on the beach", en: "because of plastic on the beach" }, { label: "because she was bored", en: "because she was bored" }, { label: "because her teacher asked", en: "because her teacher asked" }], answer: "because of plastic on the beach" },
        { type: "listen", say: "How many people are in the group now? At first, we were only five. Now there are more than sixty of us, and some parents come too.", quiet: true, prompt: "گوش کن. حالا چند نفرند؟",
          options: [{ label: "more than 60", en: "more than sixty" }, { label: "5", en: "five" }, { label: "16", en: "sixteen" }], answer: "more than 60" },
        { type: "listen", say: "What's your advice for young listeners? Start small. You don't need to change the world in one day. Just do something every week.", quiet: true, prompt: "گوش کن. پیام لیلا به شنوندگان چیست؟",
          options: [{ label: "Start small, and do something every week.", en: "Start small, and do something every week." }, { label: "Change the world in one day.", en: "Change the world in one day." }, { label: "Don't go to the beach.", en: "Don't go to the beach." }], answer: "Start small, and do something every week." },
        { type: "tip", text: "در گوش دادن به برنامه‌های طولانی‌تر، قبل از شروع سؤال‌ها را بخوانید تا کودک بداند دنبال چه بگردد، و هنگام گوش دادن چند کلمه یادداشت کند (اسم، عدد، دلیل). بعد بپرسید «موضوع اصلی چه بود؟». پادکست‌ها و برنامه‌های رادیویی انگلیسی مخصوص نوجوانان را با هم گوش کنید؛ روزی ده دقیقه کافی است." }
      ]
    },
    {
      id: "english-forest-26", subject: "english", level: "forest", emoji: "📘", title: "کتاب من",
      steps: [
        { type: "passage", prompt: "کتاب «نقشه پدربزرگ»، فصل ۱. این هفته فصل اول را بخوان",
          text: "Chapter 1: The Old Box. When Grandpa moved to a smaller flat, Navid helped him carry his things. At the bottom of a cupboard, Navid found an old wooden box. Inside, there was a map. It was drawn by hand, and it showed a village, a river and a big tree with a red X next to it. \"What's this, Grandpa?\" Navid asked. Grandpa looked at the map for a long time. Then he smiled. \"That's my village,\" he said. \"I drew this map when I was your age. Something is still there, under the tree.\"",
          question: "نوید در جعبه چه پیدا کرد؟", options: ["یک نقشه", "یک کلید", "یک نامه"], answer: "یک نقشه" },
        { type: "passage", prompt: "فصل ۲. هفته بعد این فصل را بخوان",
          text: "Chapter 2: The Journey. On Friday, Navid, his mum and Grandpa took the bus to the village. It took three hours. The village was smaller than Navid expected, and many houses were empty. But the river was still there, and so was the big tree. Grandpa walked slowly to the tree and sat down under it. \"When I was eleven,\" he said, \"I buried something here with my best friend, Hassan. We promised to come back and open it together. But Hassan's family moved to another city, and I never saw him again.\"",
          question: "پدربزرگ با چه کسی چیزی را زیر درخت دفن کرده بود؟", options: ["با دوستش حسن", "با مادر نوید", "با پدرش"], answer: "با دوستش حسن" },
        { type: "passage", prompt: "فصل ۳. فصل آخر",
          text: "Chapter 3: The Letter. Navid dug carefully under the tree. Soon he found a small metal tin. Inside, there were two marbles and a letter. Grandpa read it aloud: \"To my friend, in the future. I hope we are still friends. Hassan.\" Grandpa was quiet. Then Navid had an idea. That evening, he searched the internet and found a man called Hassan from the same village. He was living in Tabriz. A week later, two old friends sat under the big tree again, and opened the tin together.",
          question: "در آخر قصه چه شد؟", options: ["پدربزرگ و حسن دوباره هم را دیدند", "قوطی گم شد", "نوید به تبریز رفت"], answer: "پدربزرگ و حسن دوباره هم را دیدند" },
        { type: "tip", text: "این یک کتاب کوتاه سه‌فصلی است: هر هفته یک فصل را بخوانید، نه همه را با هم. بعد از هر فصل بپرسید What happened? How does Grandpa feel? What will happen next? و کودک حدسش را در دفتر خواندن بنویسد. برای ادامه، کتاب‌های داستان سطح‌بندی‌شده (graded readers) سطح A2 و B1 را انتخاب کنید و بگذارید کودک خودش کتاب بعدی را برگزیند." }
      ]
    },
    {
      id: "english-forest-27", subject: "english", level: "forest", emoji: "📧", title: "ایمیل",
      steps: [
        { type: "order", prompt: "این ایمیل به هم ریخته است. بخش‌هایش را به ترتیب درست بچین.", ltr: true,
          items: ["Hi Tom,", "Thanks for your email. It was great to hear about your new school!", "I've got some news, too. Last week, our class won the city science competition. We made a model of a qanat.", "Next month, my family is going to visit Shiraz. Have you ever been there?", "Write soon and tell me about your holiday.", "Best wishes, Kian"] },
        { type: "listen", show: "📧", prompt: "کدام شروع برای ایمیل به یک دوست مناسب است؟",
          options: [{ label: "Hi Sara,", en: "Hi Sara," }, { label: "Goodbye Sara,", en: "Goodbye Sara," }, { label: "Best wishes, Sara", en: "Best wishes, Sara" }], answer: "Hi Sara," },
        { type: "paper", pic: "📧",
          text: "به یک دوست خیالی در کشور دیگر ایمیل ۸۰ تا ۱۰۰ کلمه‌ای بنویس. ۱) با سلام شروع کن و از ایمیلش تشکر کن. ۲) یک خبر از خودت بده (به گذشته). ۳) درباره یک برنامه آینده بگو. ۴) یک سؤال بپرس. ۵) خداحافظی کن. اول طرح را بنویس، بعد ایمیل را، و آخر با فهرست بازبینی چک کن.",
          example: "Hi Emma, Thanks for your email! I loved the photos of your garden. I've got some news: last Saturday, I played in my first volleyball match, and we won! Next week, we're going to visit my aunt in Mashhad. I'm really excited. What are you going to do in the summer holiday? Write soon! Best wishes, Sara",
          check: ["سلام و خداحافظی دارد (Hi … / Best wishes)؟", "یک خبر به گذشته و یک برنامه با going to دارد؟", "دست‌کم یک سؤال پرسید؟", "حدود ۸۰ تا ۱۰۰ کلمه است؟", "خودش با فهرست بازبینی کرد و چیزی را درست کرد؟"] },
        { type: "tip", text: "ایمیل دوستانه پنج بخش دارد: سلام (Hi / Dear …)، تشکر یا اشاره به نامه قبلی، خبرها، سؤال، و خداحافظی (Best wishes / See you soon). نوشتن سه مرحله دارد: طرح، نوشتن، بازبینی. فهرست بازبینی را کنار دست کودک بگذارید: حرف بزرگ، نقطه، زمان فعل، املای کلمه‌های تازه." }
      ]
    },
    {
      id: "english-forest-28", subject: "english", level: "forest", emoji: "✒️", title: "قصه بنویس",
      steps: [
        { type: "passage", prompt: "این قصه کوتاه را بخوان و ببین چطور ساخته شده: شروع، مشکل، پایان",
          text: "Beginning: Last spring, Ali and his little sister went to the park to fly their new kite. It was a windy day, and the kite flew high above the trees. Problem: Suddenly, the string broke and the kite flew away. It landed on the roof of the old library. Ali's sister started to cry. End: Ali didn't know what to do, so he asked the librarian for help. She smiled and took them up the stairs to the roof. Ali got the kite back, and his sister laughed. After that, they visited the library every week.",
          question: "مشکل قصه چه بود؟", options: ["نخ بادبادک پاره شد", "باد نمی‌وزید", "کتابخانه بسته بود"], answer: "نخ بادبادک پاره شد" },
        { type: "passage", prompt: "دوباره بخوان: کدام کلمه‌ها قصه را جلو می‌برند؟",
          text: "Beginning: Last spring, Ali and his little sister went to the park to fly their new kite. It was a windy day, and the kite flew high above the trees. Problem: Suddenly, the string broke and the kite flew away. It landed on the roof of the old library. Ali's sister started to cry. End: Ali didn't know what to do, so he asked the librarian for help. She smiled and took them up the stairs to the roof. Ali got the kite back, and his sister laughed. After that, they visited the library every week.",
          question: "کدام کلمه نشان می‌دهد اتفاقی ناگهانی افتاد؟", options: ["Suddenly", "After that", "Last spring"], answer: "Suddenly" },
        { type: "paper", pic: "✒️",
          text: "یک قصه کوتاه (۱۰۰ تا ۱۲۰ کلمه) بنویس. شروع: کجا، کی، چه کسی؟ مشکل: چه اتفاقی افتاد؟ پایان: مشکل چطور حل شد؟ از کلمه‌هایی مثل One day، Suddenly، so، because، Finally و گذشته ساده و استمراری استفاده کن.",
          example: "One day, Mina was walking home from school when she found a little bird on the ground. It couldn't fly because its wing was hurt. Mina carefully put it in her scarf and took it home. Her dad called a vet, who told them how to look after it. For a week, Mina gave the bird water and seeds. Finally, one sunny morning, it flew away. Mina was sad, but also very happy.",
          check: ["قصه شروع، مشکل و پایان دارد؟", "از کلمه‌های وصل‌کننده (Suddenly، so، because، Finally) استفاده کرد؟", "فعل‌ها را درست به گذشته نوشت؟", "حدود ۱۰۰ کلمه است؟"] },
        { type: "tip", text: "قصه خوب سه بخش دارد: شروع (چه کسی، کجا، کی)، مشکل (Suddenly …) و پایان (Finally …). قبل از نوشتن، کودک قصه‌اش را به زبان خودش برایتان تعریف کند؛ بعد بنویسد. از قصه‌اش با جزئیات تعریف کنید: «کلمه Suddenly قصه را هیجان‌انگیز کرد»." }
      ]
    },
    {
      id: "english-forest-29", subject: "english", level: "forest", emoji: "💬", title: "نظر من",
      steps: [
        { type: "order", prompt: "این پاراگراف نظر را به ترتیب بچین: نظر، دلیل‌ها، نظر مخالف، جمع‌بندی", ltr: true,
          items: ["I think every school should have a school garden.", "First, students can learn about plants and food in a real way.", "Also, working outside together is good for our health.", "However, some people say gardens need too much time and water.", "In my opinion, a small garden with careful watering is still worth it."] },
        { type: "listen", show: "🗣️", prompt: "کدام جمله نظر شخصی را نشان می‌دهد؟",
          options: [{ label: "In my opinion, homework is useful.", en: "In my opinion, homework is useful." }, { label: "Homework is on page ten.", en: "Homework is on page ten." }, { label: "We had homework yesterday.", en: "We had homework yesterday." }], answer: "In my opinion, homework is useful." },
        { type: "paper", pic: "💬",
          text: "یکی از این موضوع‌ها را انتخاب کن و یک پاراگراف نظر (۸۰ تا ۱۰۰ کلمه) بنویس: «آیا بچه‌ها باید تلفن همراه داشته باشند؟» یا «زندگی در شهر بهتر است یا روستا؟». نظرت را بگو (I think …)، دو دلیل بیاور (First …, Also …)، نظر مخالف را بگو (However, some people say …) و جمع‌بندی کن (In my opinion …).",
          example: "I think living in a village is better than living in a city. First, the air is cleaner and there is less noise. Also, people often know their neighbours and help each other. However, some people say there are fewer schools, hospitals and shops in villages. In my opinion, a quiet and healthy life is more important, but villages need better services too.",
          check: ["نظرش را اول گفت (I think …)؟", "دو دلیل آورد؟", "نظر مخالف را با However گفت؟", "جمع‌بندی دارد؟"] },
        { type: "tip", text: "پاراگراف نظر ساختار مشخصی دارد: نظر، دلیل‌ها، نظر مخالف، جمع‌بندی. کلمه‌های کمکی: I think / In my opinion / First / Also / However / Because. سر شام درباره یک موضوع ساده بحث کنید (آیا تعطیلات تابستان باید طولانی‌تر باشد؟) و هر کس نظر و دلیلش را به انگلیسی بگوید؛ یاد بگیرید به نظر مخالف هم با احترام گوش کنیم." }
      ]
    },
    {
      id: "english-forest-30", subject: "english", level: "forest", emoji: "🗣️", title: "موافقم، مخالفم",
      steps: [
        /* Two friends plan a class trip; they disagree politely and give reasons; the child is Reza: he asks Sara to
           repeat, agrees with one idea and disagrees with another, giving reasons. */
        { type: "dialogue", prompt: "تو رضا هستی. با سارا درباره اردوی کلاس حرف بزن.", bg: "#f3ead8", you: "reza",
          parts: { room: { art: "en-classroom" }, sara: { art: "en-sara", at: [50, 88], s: 1.15 }, reza: { art: "en-reza", at: [110, 88], s: 1.15 } },
          lines: [
            { who: "sara", en: "I think we should go to the museum for our class trip." },
            { who: "reza", en: "Sorry, could you say that again, please?", choose: ["Yes, I went to the museum.", "Museums are on Mondays."] },
            { who: "sara", en: "Of course. I think we should go to the museum, because we can learn about history." },
            { who: "reza", en: "I agree that it's interesting, but I'd prefer the mountains.", choose: ["I agree. Let's go to the museum.", "I'm thirsty."], do: pose("reza", "R", "ask", 0, 500) },
            { who: "sara", en: "Why do you think the mountains are better?", do: pose("reza", "R", "down", 0, 400) },
            { who: "reza", en: "Because we can walk, breathe fresh air and learn about plants.", choose: ["Because I don't know.", "Because it's Tuesday."] },
            { who: "sara", en: "That's a good point. Maybe we can ask the class to vote!", do: face("sara", true, 0) },
            { who: "reza", en: "Yes, that's a great idea!", choose: ["No, I didn't.", "I'm from Shiraz."], do: nod("reza", 0) }
          ] },
        { type: "listen", say: "I don't agree. I think reading is more fun than watching TV.", prompt: "گوش کن. او موافق است یا مخالف؟",
          options: [{ label: "👎 disagrees", en: "disagrees" }, { label: "👍 agrees", en: "agrees" }], answer: "👎 disagrees" },
        { type: "listen", say: "You're right. Cycling is better for the environment than driving.", quiet: true, prompt: "گوش کن. موافق است یا مخالف؟",
          options: [{ label: "👍 agrees", en: "agrees" }, { label: "👎 disagrees", en: "disagrees" }], answer: "👍 agrees" },
        { type: "listen", show: "🤝", prompt: "مؤدبانه‌ترین راه مخالفت کدام است؟",
          options: [{ label: "I see your point, but I don't agree.", en: "I see your point, but I don't agree." }, { label: "You're wrong!", en: "You're wrong!" }, { label: "That's stupid.", en: "That's stupid." }], answer: "I see your point, but I don't agree." },
        { type: "tip", text: "برای گفت‌وگوی طولانی‌تر: موافقت (I agree. You're right. That's a good point.)، مخالفت مؤدبانه (I see your point, but … I'm not sure about that.)، دلیل (because …) و درخواست تکرار (Sorry, could you say that again? What do you mean?). در خانه درباره موضوع‌های ساده بحث کنید و تمرین کنید با احترام مخالفت کنید." }
      ]
    },
    {
      id: "english-forest-31", subject: "english", level: "forest", emoji: "🎤", title: "یک ارائه کوتاه",
      steps: [
        { type: "paper", pic: "🗒️",
          text: "برای یک ارائه یک تا دو دقیقه‌ای درباره یک حیوان، یک جا یا یک سرگرمی یادداشت آماده کن. جمله کامل ننویس، فقط کلمه‌های کلیدی: ۱) شروع: موضوع چیست؟ ۲) سه نکته جالب. ۳) پایان: چرا دوستش داری؟",
          example: "Topic: the Persian leopard. 1) lives in mountains of Iran 2) very strong, can climb trees 3) in danger, fewer than 1,000 in Iran. End: beautiful, we must protect it.",
          check: ["یادداشت کوتاه است، نه جمله کامل؟", "شروع، سه نکته و پایان دارد؟"] },
        { type: "record", pic: "🐆", say: "Good morning, everyone. Today I'm going to talk about the Persian leopard. Persian leopards live in the mountains of Iran. They are very strong, and they can climb trees. Sadly, they are in danger, and there are not many of them left. I think they are beautiful animals, and we must protect them. Thank you for listening.",
          prompt: "حالا با کمک یادداشتت ارائه بده و ضبط کن. اول به نمونه گوش کن. آرام و بلند حرف بزن و به یادداشت نگاه کن، نه به متن کامل.",
          check: ["با سلام و معرفی موضوع شروع کرد؟", "دست‌کم سه نکته گفت؟", "آرام و واضح حرف زد؟", "با جمع‌بندی و تشکر تمام کرد؟", "حدود یک تا دو دقیقه طول کشید؟"] },
        { type: "tip", text: "ارائه خوب شروع (Today I'm going to talk about …)، بدنه (First … Also … Finally …) و پایان (Thank you for listening.) دارد. کودک از روی یادداشت حرف بزند نه از روی متن؛ چند بار تمرین کند و صدای ضبط‌شده‌اش را گوش کند. برای خانواده هم ارائه بدهد و شما یک سؤال بپرسید." }
      ]
    },
    {
      id: "english-forest-32", subject: "english", level: "forest", emoji: "📕", title: "فرهنگ لغت و دفتر لغت",
      steps: [
        { type: "listen", show: "invent /ɪnˈvent/ verb: to make something new for the first time. Edison invented the light bulb.", prompt: "این مدخل فرهنگ لغت است. invent چه نوع کلمه‌ای است؟",
          options: [{ label: "verb", en: "verb" }, { label: "noun", en: "noun" }, { label: "adjective", en: "adjective" }], answer: "verb" },
        { type: "listen", say: "invent", quiet: true, show: "in-vent", prompt: "گوش کن. تکیه روی کدام بخش است؟",
          options: [{ label: "IN-vent", en: "invent", value: "1" }, { label: "in-VENT", en: "invent", value: "2" }], answer: "2" },
        { type: "choose", prompt: "در فرهنگ لغت، کدام کلمه زودتر می‌آید؟", show: "🔤", options: ["garden", "game", "gate"], answer: "game" },
        { type: "choose", prompt: "light در این جمله یعنی چه؟ This bag is very light. I can carry it with one hand.", show: "🎒", options: ["سبک", "نور", "روشن"], answer: "سبک" },
        { type: "paper", pic: "📒",
          text: "یک دفتر لغت درست کن. برای هر کلمه تازه این‌ها را بنویس: کلمه، نوع کلمه (noun، verb، adjective)، تکیه، معنی ساده به انگلیسی یا یک تصویر، و یک جمله نمونه از خودت. این هفته با پنج کلمه تازه شروع کن.",
          example: "protect (verb) pro-TECT: to keep safe. We must protect the forests.",
          check: ["برای هر کلمه نوعش را نوشت؟", "جای تکیه را نشان داد؟", "یک جمله نمونه از خودش نوشت؟"] },
        { type: "tip", text: "فرهنگ لغت فقط معنی نمی‌دهد: نوع کلمه (verb، noun)، تلفظ و تکیه، و جمله نمونه هم دارد. وقتی کلمه چند معنی دارد (light)، معنی‌ای را انتخاب کنید که با جمله جور است. دفتر لغت را هر هفته با هم مرور کنید و کلمه‌های قدیمی را در جمله‌های تازه به کار ببرید." }
      ]
    },
    {
      id: "english-forest-33", subject: "english", level: "forest", emoji: "🌳", title: "خانواده کلمه‌ها",
      steps: [
        { type: "pairs", prompt: "هر کلمه را با کلمه هم‌خانواده‌اش جفت کن",
          pairs: [[{ label: "happy", say: "happy" }, { label: "happiness", say: "happiness" }], [{ label: "kind", say: "kind" }, { label: "kindness", say: "kindness" }],
            [{ label: "decide", say: "decide" }, { label: "decision", say: "decision" }], [{ label: "danger", say: "danger" }, { label: "dangerous", say: "dangerous" }]] },
        { type: "sort", prompt: "هر کلمه را بخوان و گوش کن. اسم است، فعل، صفت یا قید؟",
          baskets: [{ label: "noun" }, { label: "verb" }, { label: "adjective" }, { label: "adverb" }],
          items: [{ label: "happiness", say: "happiness", basket: "noun" }, { label: "happily", say: "happily", basket: "adverb" }, { label: "unhappy", say: "unhappy", basket: "adjective" },
            { label: "invent", say: "invent", basket: "verb" }, { label: "invention", say: "invention", basket: "noun" }, { label: "carefully", say: "carefully", basket: "adverb" },
            { label: "careful", say: "careful", basket: "adjective" }, { label: "protect", say: "protect", basket: "verb" }] },
        { type: "build", prompt: "کلمه را با تکه‌ها بساز: ناامن", word: "unsafe", parts: ["un", "safe"], extra: ["ful", "ness"], pic: "⚠️", say: "unsafe" },
        { type: "build", prompt: "کلمه را بساز: اختراع", word: "invention", parts: ["invent", "ion"], extra: ["ful"], pic: "💡", say: "invention" },
        { type: "build", prompt: "کلمه را بساز: مفید", word: "useful", parts: ["use", "ful"], extra: ["less", "ly"], pic: "🔧", say: "useful" },
        { type: "tip", text: "کلمه‌ها خانواده دارند: happy، happiness، happily، unhappy. پسوندها نوع کلمه را نشان می‌دهند: ness و tion برای اسم (kindness، invention)، ful و ous برای صفت (useful، dangerous) و ly برای قید (quickly). در دفتر لغت، کنار هر کلمه هم‌خانواده‌هایش را هم بنویسید." }
      ]
    },
    {
      id: "english-forest-34", subject: "english", level: "forest", emoji: "🎓", title: "ببین چه بلدی",
      steps: [
        { type: "passage", prompt: "این متن را بخوان",
          text: "Most people think of deserts as empty places. But the Lut Desert in Iran is full of surprises. In 2016, it became Iran's first natural World Heritage Site. Scientists have measured some of the hottest ground temperatures on Earth there, sometimes more than 70°C. Even so, some animals, like foxes, lizards and insects, have learned to live in the Lut. They usually come out at night, when it is cooler. The desert is also famous for its kaluts, huge shapes of sand and rock that the wind has made over thousands of years. Although it is a hard place to live, many visitors come every year to see its amazing landscapes.",
          question: "ایده اصلی متن چیست؟", options: ["لوت جایی پر از شگفتی است", "لوت جای خالی و بی‌جان است", "در لوت هیچ حیوانی نیست"], answer: "لوت جایی پر از شگفتی است" },
        { type: "passage", prompt: "دوباره بخوان و جواب بده",
          text: "Most people think of deserts as empty places. But the Lut Desert in Iran is full of surprises. In 2016, it became Iran's first natural World Heritage Site. Scientists have measured some of the hottest ground temperatures on Earth there, sometimes more than 70°C. Even so, some animals, like foxes, lizards and insects, have learned to live in the Lut. They usually come out at night, when it is cooler. The desert is also famous for its kaluts, huge shapes of sand and rock that the wind has made over thousands of years. Although it is a hard place to live, many visitors come every year to see its amazing landscapes.",
          question: "چرا حیوان‌ها شب بیرون می‌آیند؟", options: ["چون شب خنک‌تر است", "چون شب تاریک است", "چون گردشگرها شب می‌آیند"], answer: "چون شب خنک‌تر است" },
        { type: "passage", prompt: "یک سؤال درباره کلمه‌ها",
          text: "Most people think of deserts as empty places. But the Lut Desert in Iran is full of surprises. In 2016, it became Iran's first natural World Heritage Site. Scientists have measured some of the hottest ground temperatures on Earth there, sometimes more than 70°C. Even so, some animals, like foxes, lizards and insects, have learned to live in the Lut. They usually come out at night, when it is cooler. The desert is also famous for its kaluts, huge shapes of sand and rock that the wind has made over thousands of years. Although it is a hard place to live, many visitors come every year to see its amazing landscapes.",
          question: "کلوت‌ها را چه چیزی ساخته است؟", options: ["باد", "آدم‌ها", "رودخانه"], answer: "باد" },
        { type: "listen", say: "Good afternoon, passengers. The train to Mashhad is now leaving from platform four, not platform two. The journey will take about twelve hours. Dinner will be served at eight o'clock.", prompt: "به اعلام گوش کن. قطار از کدام سکو حرکت می‌کند؟",
          options: [{ label: "platform 4", en: "platform four" }, { label: "platform 2", en: "platform two" }, { label: "platform 12", en: "platform twelve" }], answer: "platform 4" },
        { type: "listen", say: "Good afternoon, passengers. The train to Mashhad is now leaving from platform four, not platform two. The journey will take about twelve hours. Dinner will be served at eight o'clock.", quiet: true, prompt: "دوباره گوش کن. سفر چقدر طول می‌کشد؟",
          options: [{ label: "about 12 hours", en: "about twelve hours" }, { label: "about 8 hours", en: "about eight hours" }, { label: "about 4 hours", en: "about four hours" }], answer: "about 12 hours" },
        { type: "listen", say: "Have you finished your project yet? Not yet. I've already written the text, but I haven't found any photos. If I find some tonight, I'll finish it tomorrow.", quiet: true, prompt: "به گفت‌وگو گوش کن. چه چیزی هنوز مانده؟",
          options: [{ label: "the photos", en: "the photos" }, { label: "the text", en: "the text" }, { label: "nothing", en: "nothing" }], answer: "the photos" },
        { type: "paper", pic: "✏️",
          text: "یکی را انتخاب کن و حدود ۱۰۰ کلمه بنویس: ۱) ایمیل به دوستی درباره سفری که رفته‌ای و سفری که در پیش داری. ۲) یک قصه کوتاه که با این جمله شروع می‌شود: «When I opened the door, I couldn't believe my eyes.» ۳) نظرت درباره این موضوع: «همه بچه‌ها باید یک ساز یاد بگیرند.» طرح بنویس، بعد متن، و آخر بازبینی کن.",
          example: "When I opened the door, I couldn't believe my eyes. My whole family was in the living room, and there was a big cake on the table. It was my birthday, and I had forgotten! My little brother was holding a card that he had made himself. We ate the cake, played games and laughed all evening. It was the best surprise of my life.",
          check: ["متن حدود ۱۰۰ کلمه است و به موضوع جواب می‌دهد؟", "زمان‌ها درست است (گذشته، حال کامل، آینده)؟", "از کلمه‌های وصل‌کننده (because، however، although، so) استفاده کرد؟", "پاراگراف‌بندی و نشانه‌گذاری درست است؟", "خودش بازبینی کرد؟"] },
        { type: "tip", text: "این درس آخر دوره انگلیسی باغچه است، به سبک آزمون‌های A2 Key و بخش‌هایی از B1 Preliminary. اگر کودک بیشتر سؤال‌ها را درست جواب داد و توانست متنی صد کلمه‌ای با زمان‌های مختلف بنویسد، به سطح A2 رسیده و در بخش‌هایی به B1 نزدیک است. ادامه راه: هر روز کمی خواندن و گوش دادن به انگلیسی واقعی (کتاب، پادکست، فیلم با زیرنویس انگلیسی)، و هر هفته کمی نوشتن و حرف زدن. اگر بخواهد، می‌تواند در آزمون‌های بین‌المللی کودکان و نوجوانان هم شرکت کند." }
      ]
    }
  ];

  // Every step of an English lesson is marked en, so js/steps/english.js writes its English left to right
  // and speaks it with the English voice.
  lessons.forEach(function (l) { l.steps.forEach(function (s) { s.en = true; }); });
  B.LESSONS.push.apply(B.LESSONS, lessons);
})();
