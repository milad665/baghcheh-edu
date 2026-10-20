/* باغچه — احساس‌های من (me and my feelings): leveled by garden (from the child's Persian garden, like health),
   plus lessons for every child whatever the garden (level: null), such as the weekly calm lesson.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

(function () {
/* Animated scenes (step type `scene`, js/scene.js; drawings in js/art/rig-feel.js). Every character's face is made
   of pieces: a mood shows one brow, one pair of eyes and one mouth, and hides the others. */
var PIECES = ["browN", "browW", "browA", "eyeO", "eyeC", "eyeH", "eyeW", "mSmile", "mGrin", "mFrown", "mWavy", "mO", "mFlat", "mTalk"];
var MOODS = {
  happy: "browN eyeO mSmile", joy: "browN eyeH mGrin", sad: "browW eyeO mFrown", angry: "browA eyeO mFrown",
  worried: "browW eyeO mWavy", scared: "browW eyeW mO", calm: "browN eyeC mSmile", neutral: "browN eyeO mFlat",
  breatheIn: "browN eyeC mFlat", breatheOut: "browN eyeC mO", oops: "browW eyeW mFlat", sorry: "browW eyeO mFlat", caring: "browW eyeO mSmile",
  cross: "browA eyeO mFlat", bored: "browN eyeC mFlat", shy: "browW eyeO mSmile"
};
// The tracks that change a face to a mood, starting at `at` ms.
function face(id, mood, at, dur) {
  var on = MOODS[mood].split(" ");
  return PIECES.map(function (p) { return { id: id + "." + p, to: { o: on.indexOf(p) < 0 ? 0 : 1 }, at: at || 0, dur: dur || 400 }; });
}
// Talking: the mouth opens and closes over the face's own mouth.
function talk(id, at, dur) {
  return [{ id: id + ".mTalk", to: { o: 1 }, at: at, dur: dur, yoyo: true, times: Math.max(2, Math.round(dur / 260) * 2) }];
}
// Walking (seen from the front): the feet lift in turn, one step every ~320 ms.
function walk(id, at, dur) {
  var n = Math.max(4, 2 * Math.round(dur / 640)), step = dur / n;
  return [{ id: id + ".legL", to: { y: -1.6 }, at: at, dur: dur, yoyo: true, times: n },
    { id: id + ".legR", to: { y: -1.6 }, at: at + step, dur: dur - 2 * step, yoyo: true, times: n - 2 }];
}
// A slow breath: the chest and shoulders rise (in), then drop (out).
function breathe(id, at, inDur, outDur) {
  return [{ id: id + ".upper", to: { y: -1.4, sx: 1.04 }, at: at, dur: inDur, ease: "inout" },
    { id: id + ".upper", to: { y: 0, sx: 1 }, at: at + inDur, dur: outDur, ease: "inout" }];
}
// Hands: open (true) or fists (false).
function fists(id, on, at) {
  return [{ id: id + ".handL", to: { o: on ? 0 : 1 }, at: at, dur: 300 }, { id: id + ".handR", to: { o: on ? 0 : 1 }, at: at, dur: 300 },
    { id: id + ".fistL", to: { o: on ? 1 : 0 }, at: at, dur: 300 }, { id: id + ".fistR", to: { o: on ? 1 : 0 }, at: at, dur: 300 }];
}
function arms(id, l, r, at, dur) {
  return [{ id: id + ".armL", to: { r: l }, at: at, dur: dur || 500 }, { id: id + ".armR", to: { r: r }, at: at, dur: dur || 500 }];
}
function all() { return [].concat.apply([], arguments); }
// Arms crossed on the chest (the butterfly hug, the turtle's shell), or back down (on: false).
function cross(id, on, at, dur) { return arms(id, on ? -62 : 0, on ? 62 : 0, at, dur || 700); }
// Fade parts in (o 1) or out (o 0) together.
function show(ids, o, at, dur) {
  return ids.split(" ").map(function (p) { return { id: p, to: { o: o }, at: at || 0, dur: dur || 500 }; });
}

B.LESSONS.push(
  // ---------------- Me and my feelings: for every child, whatever the garden (level: null) ----------------
  {
    id: "feel-1", subject: "feel", level: null, emoji: "🌷", title: "نفس گل و شمع",
    steps: [
      { type: "breathe", cycles: 4 },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-2", subject: "feel", level: null, emoji: "🎭", title: "اسم احساس‌ها",
    steps: [
      /* Each feeling happens to someone, and their face and body show it (js/art/rig-feel.js). */
      { type: "scene", prompt: "هر حسی یک اسم دارد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" }, yard: { art: "fl-yard", o: 0 }, evening: { art: "fl-evening", o: 0 },
          b1: { art: "fl-block-r", at: [84, 84], s: 1.2, o: 0 }, b2: { art: "fl-block-b", at: [84, 75.4], s: 1.2, o: 0 },
          b3: { art: "fl-block-y", at: [84, 66.8], s: 1.2, o: 0 }, b4: { art: "fl-block-g", at: [84, 58.2], s: 1.2, o: 0 },
          bag: { art: "fl-bag", at: [92, 84], s: 1.2, o: 0 },
          think: { art: "fl-think", at: [70, 36], o: 0 }, school: { art: "🏫", at: [16, -8], s: 0.9, under: "think" },
          grandma: { art: "fl-grandma", at: [176, 84], s: 1.35 },
          yas: { art: "fl-yas", at: [56, 84], s: 1.25 },
          arash: { art: "fl-arash", at: [66, 84], s: 1.25, o: 0 },
          baby: { art: "fl-baby", at: [176, 84], s: 0.85, o: 0 },
          cat: { art: "fl-cat", at: [48, 84], s: 1.1, o: 0 },
          dog: { art: "fl-dog", at: [186, 84], s: 1.5, o: 0 }, jolt: { art: "fl-jolt", at: [36, 58], s: 1.1, o: 0 },
          book: { art: "fl-book", at: [70, 67], o: 0 },
          balloon: { art: "fl-balloon", at: [81, 42.5], s: 1.2, o: 0 },
          wind: { art: "fl-wind", at: [-50, 30], s: 1.4 }
        },
        scenes: [
          { caption: "مادربزرگ به خانه یاسمن آمده. یاسمن خوشحال است.", do: all(
            [{ id: "grandma", to: { x: 110 }, dur: 2400, ease: "out" }], walk("grandma", 0, 2400),
            face("yas", "joy", 2300), arms("yas", 140, -140, 2400, 500),
            [{ id: "yas", to: { y: "-5" }, at: 2900, dur: 1800, yoyo: true, times: 4, ease: "out" }]) },
          { caption: "بادکنک آرش در باد رفت. آرش غمگین است.", do: all(
            [{ id: "yas", to: { o: 0 }, dur: 500 }, { id: "grandma", to: { o: 0 }, dur: 500 }, { id: "yard", to: { o: 1 }, dur: 700 }],
            arms("yas", 0, 0, 500, 1), face("yas", "happy", 500, 1),
            [{ id: "arash.armR", to: { r: -150 }, dur: 1 }, { id: "arash", to: { o: 1 }, at: 600, dur: 500 }, { id: "balloon", to: { o: 1 }, at: 600, dur: 500 },
              { id: "wind", path: "M-50 30L60 26", at: 1600, dur: 1400, ease: "linear" },
              { id: "balloon", to: { r: 12 }, at: 1800, dur: 600 },
              { id: "balloon", path: "M81 42.5Q104 34 118 22T136 14", at: 2300, dur: 2400, ease: "inout" }, { id: "balloon", to: { s: 0.55 }, at: 2300, dur: 2400 },
              { id: "arash.eyeO", to: { x: 0.8, y: -0.7 }, at: 2300, dur: 800 },
              { id: "wind", path: "M60 26L190 22", at: 3000, dur: 1800, ease: "linear" }],
            arms("arash", 0, 0, 4300, 800), face("arash", "sad", 4300),
            [{ id: "arash.eyeO", to: { x: 0, y: 0.4 }, at: 4300, dur: 600 }, { id: "arash.upper", to: { y: 0.8 }, at: 4400, dur: 800 },
              { id: "arash.tear", to: { o: 1 }, at: 4900, dur: 300 }, { id: "arash.tear", to: { y: 2.6 }, at: 5000, dur: 1400 }]) },
          { caption: "برادر کوچک یاسمن برجش را خراب کرد. یاسمن عصبانی است.", key: 4800, do: all(
            [{ id: "arash", to: { o: 0 }, dur: 500 }, { id: "balloon", to: { o: 0 }, dur: 500 }, { id: "yard", to: { o: 0 }, dur: 700 }, { id: "yas", to: { x: 44 }, dur: 1 }, { id: "yas", to: { o: 1 }, at: 400, dur: 500 },
              { id: "b1", to: { o: 1 }, at: 400, dur: 500 }, { id: "b2", to: { o: 1 }, at: 400, dur: 500 }, { id: "b3", to: { o: 1 }, at: 400, dur: 500 }, { id: "b4", to: { o: 1 }, at: 400, dur: 500 },
              { id: "baby", to: { o: 1 }, at: 400, dur: 300 }, { id: "baby", to: { x: 98 }, at: 500, dur: 2000 }],
            walk("baby", 500, 2000),
            [{ id: "b4", path: "M84 58.2Q98 54 104 85", at: 2500, dur: 700, ease: "in" }, { id: "b4", to: { r: 100 }, at: 2500, dur: 700 },
              { id: "b3", path: "M84 66.8Q74 62 68 85", at: 2550, dur: 650, ease: "in" }, { id: "b3", to: { r: -80 }, at: 2550, dur: 650 },
              { id: "b2", path: "M84 75.4Q90 74 92 85", at: 2600, dur: 500, ease: "in" }, { id: "b2", to: { r: 30 }, at: 2600, dur: 500 },
              { id: "b1", to: { r: -8 }, at: 2650, dur: 300 }],
            face("baby", "oops", 2700), face("yas", "angry", 3300), fists("yas", true, 3500), arms("yas", -10, 10, 3500, 400),
            [{ id: "yas.flush", to: { o: 1 }, at: 3600, dur: 800 }, { id: "yas", to: { y: "-1.5" }, at: 4200, dur: 600, yoyo: true, times: 2 }]) },
          { caption: "فردا اولین روز مدرسه است. آرش نگران است.", do: all(
            [{ id: "yas", to: { o: 0 }, dur: 500 }, { id: "baby", to: { o: 0 }, dur: 500 },
              { id: "b1", to: { o: 0 }, dur: 500 }, { id: "b2", to: { o: 0 }, dur: 500 }, { id: "b3", to: { o: 0 }, dur: 500 }, { id: "b4", to: { o: 0 }, dur: 500 },
              { id: "arash.tear", to: { o: 0, y: 0 }, dur: 1 }, { id: "arash.upper", to: { y: 0 }, dur: 1 }, { id: "arash", to: { x: 60 }, dur: 1 },
              { id: "arash", to: { o: 1 }, at: 500, dur: 500 }, { id: "bag", to: { o: 1 }, at: 500, dur: 500 },
              { id: "think", to: { o: 1 }, at: 1400, dur: 600 }, { id: "think", to: { s: 1.05 }, at: 2000, dur: 500, yoyo: true, times: 2 }],
            face("arash", "worried", 2200), arms("arash", -22, 22, 2600, 500),
            [{ id: "arash.eyeO", to: { x: 0.8, y: 0.3 }, at: 2600, dur: 500 },
              { id: "arash.armL", to: { r: -12 }, at: 3200, dur: 1600, yoyo: true, times: 4 }, { id: "arash.armR", to: { r: 12 }, at: 3200, dur: 1600, yoyo: true, times: 4 }]) },
          { caption: "پیشی یک سگ بزرگ دید. پیشی ترسید.", do: all(
            [{ id: "arash", to: { o: 0 }, dur: 500 }, { id: "bag", to: { o: 0 }, dur: 500 }, { id: "think", to: { o: 0 }, dur: 500 }, { id: "yard", to: { o: 1 }, dur: 700 },
              { id: "cat", to: { o: 1 }, at: 500, dur: 500 },
              { id: "dog", to: { o: 1 }, at: 1000, dur: 300 }, { id: "dog", to: { x: 122 }, at: 1000, dur: 2200, ease: "out" },
              { id: "dog.legF", to: { r: 18 }, at: 1000, dur: 2200, yoyo: true, times: 8 }, { id: "dog.legB2", to: { r: 18 }, at: 1000, dur: 2200, yoyo: true, times: 8 },
              { id: "dog.legB", to: { r: -18 }, at: 1000, dur: 2200, yoyo: true, times: 8 }, { id: "dog.legF2", to: { r: -18 }, at: 1000, dur: 2200, yoyo: true, times: 8 },
              { id: "dog.tail", to: { r: 20 }, at: 1000, dur: 3600, yoyo: true, times: 10 },
              { id: "cat.eyeO", to: { x: 0.8 }, at: 1600, dur: 500 }],
            face("cat", "scared", 2800, 300),
            [{ id: "cat.eyeW", to: { x: 0.6 }, at: 2800, dur: 1 },
              { id: "cat.ears", to: { sy: 0.55 }, at: 2800, dur: 300 }, { id: "cat.tail", to: { s: 1.3 }, at: 2800, dur: 300 },
              { id: "cat", to: { x: 36, sy: 0.92 }, at: 2900, dur: 500, ease: "out" },
              { id: "jolt", to: { o: 1 }, at: 2900, dur: 200 }, { id: "jolt", to: { s: 1.25 }, at: 3100, dur: 300, yoyo: true, times: 4 },
              { id: "cat.head", to: { x: 0.5 }, at: 3400, dur: 120, yoyo: true, times: 8 }]) },
          { caption: "سگ رفت. عصر، یاسمن کنار پیشی کتاب می‌خواند. یاسمن آرام است.", do: all(
            [{ id: "dog", to: { flip: -1 }, dur: 300 }, { id: "dog", to: { x: 196 }, at: 300, dur: 2000, ease: "in" },
              { id: "dog.legF", to: { r: 18 }, at: 300, dur: 2000, yoyo: true, times: 8 }, { id: "dog.legB", to: { r: -18 }, at: 300, dur: 2000, yoyo: true, times: 8 },
              { id: "jolt", to: { o: 0 }, dur: 300 }, { id: "yard.dusk", to: { o: 1 }, at: 1800, dur: 1600 }, { id: "evening", to: { o: 1 }, at: 1800, dur: 1600 }],
            face("cat", "happy", 1600), face("yas", "happy", 1500, 1), fists("yas", false, 1500), arms("yas", -32, 32, 1500, 1),
            [{ id: "cat.ears", to: { sy: 1 }, at: 1600, dur: 400 }, { id: "cat.tail", to: { s: 1 }, at: 1600, dur: 400 }, { id: "cat", to: { sy: 1 }, at: 1600, dur: 400 },
              { id: "cat", to: { x: 100 }, at: 2400, dur: 1200 },
              { id: "yas.flush", to: { o: 0 }, at: 1500, dur: 1 }, { id: "yas", to: { x: 74, y: 84 }, at: 1500, dur: 1 },
              { id: "yas", to: { o: 1 }, at: 2400, dur: 600 }, { id: "book", to: { x: 74, y: 66.5 }, at: 1500, dur: 1 }, { id: "book", to: { o: 1 }, at: 2400, dur: 600 },
              { id: "yas.eyeO", to: { y: 0.8 }, at: 2400, dur: 1 },
              { id: "book.page", to: { sx: -1 }, at: 3600, dur: 900 }],
            face("cat", "calm", 4200, 600), breathe("yas", 4400, 1600, 2000)) },
          { caption: "همه این حس‌ها طبیعی‌اند. هر حسی یک اسم دارد و می‌گذرد.", hold: 9000, do: all(
            [{ id: "book", to: { o: 0 }, dur: 500 }, { id: "cat", to: { o: 0 }, dur: 500 }, { id: "evening", to: { o: 0 }, dur: 800 }, { id: "yard.dusk", to: { o: 0 }, dur: 800 }],
            arms("yas", 0, 0, 300, 500),
            [{ id: "yas.eyeO", to: { y: 0 }, at: 300, dur: 400 }, { id: "yas", to: { x: 60 }, at: 300, dur: 800 }, { id: "arash", to: { x: 100 }, dur: 1 },
              { id: "arash.eyeO", to: { x: 0, y: 0 }, dur: 1 }, { id: "arash", to: { o: 1 }, at: 400, dur: 600 }],
            face("arash", "happy", 0, 1), arms("arash", 0, 0, 0, 1),
            face("yas", "joy", 1400), face("arash", "joy", 1400),
            face("yas", "sad", 2400), face("arash", "sad", 2400),
            face("yas", "angry", 3400), face("arash", "angry", 3400),
            face("yas", "worried", 4400), face("arash", "worried", 4400),
            face("yas", "scared", 5400), face("arash", "scared", 5400),
            face("yas", "calm", 6400), face("arash", "calm", 6400),
            face("yas", "happy", 7600), face("arash", "happy", 7600)) }
        ] },
      { type: "pairs", practice: true, prompt: "هر صورت را با اسم حسش جفت کن. اسم‌ها را بزن تا بشنوی.",
        pairs: [
          ["😊", { label: "خوشحال", say: "خوشحال" }],
          ["😢", { label: "غمگین", say: "غمگین" }],
          ["😠", { label: "عصبانی", say: "عصبانی" }],
          ["😟", { label: "نگران", say: "نگران" }],
          ["😨", { label: "ترسیده", say: "ترسیده" }],
          ["😌", { label: "آرام", say: "آرام" }]
        ] },
      { type: "talk", scene: "😊 😢 😠 😟 😨 😌", caption: "تو کی خوشحال می‌شوی؟ کی غمگین می‌شوی؟",
        tips: [
          "هر جوابی که داد، بپذیرید. حس درست و غلط ندارد.",
          "اسم حس را برایش بگویید: «انگار وقتی بادکنکت رفت، غمگین شدی.»",
          "از حس‌های خودتان هم بگویید: «من وقتی تو را می‌بینم، خوشحال می‌شوم.»",
          "اگر نخواست حرف بزند، اصرار نکنید. بعداً دوباره بپرسید."
        ] },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-3", subject: "feel", level: null, emoji: "🧍", title: "احساس در بدن من",
    steps: [
      /* The body shows the feeling: jumping for joy, hands on a turning tummy, a hot face and fists, tears and
         heavy shoulders; then three children, each feeling it in their own place. */
      { type: "scene", prompt: "بدن ما هم حس‌ها را می‌فهمد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          a: { art: "fl-yas", at: [36, 86], s: 1.2, o: 0 }, b: { art: "fl-arash", at: [124, 86], s: 1.2, o: 0 },
          kid: { art: "fl-kid", at: [80, 86], s: 1.35 },
          swirl: { art: "fl-swirl", at: [0, -21], s: 1.3, o: 0, under: "kid" },
          heat: { art: "fl-heat", at: [0, -42], o: 0, under: "kid" },
          gA: { art: "fl-glow", at: [0, -16], o: 0, under: "a" }, gK: { art: "fl-glow", at: [0, -21], o: 0, under: "kid" },
          gB1: { art: "fl-glow", at: [-6.7, -13.4], s: 0.7, o: 0, under: "b" }, gB2: { art: "fl-glow", at: [6.7, -13.4], s: 0.7, o: 0, under: "b" }
        },
        scenes: [
          { caption: "وقتی خوشحالیم، شاید دلمان بخواهد بپریم و بدویم.", key: 1200, do: all(
            face("kid", "joy", 0), arms("kid", 140, -140, 300, 400),
            [{ id: "kid", to: { y: "-7" }, at: 700, dur: 2000, yoyo: true, times: 4, ease: "out" },
              { id: "kid", to: { x: 126 }, at: 2900, dur: 1100 }, { id: "kid", to: { x: 80 }, at: 4100, dur: 1300 }],
            walk("kid", 2900, 1100), walk("kid", 4100, 1300)) },
          { caption: "وقتی نگرانیم، شاید دلمان پیچ بخورد.", do: all(
            arms("kid", 0, 0, 0, 400), face("kid", "worried", 300), arms("kid", -32, 32, 700, 600),
            [{ id: "kid.eyeO", to: { y: 0.7 }, at: 900, dur: 400 },
              { id: "swirl", to: { o: 1 }, at: 1100, dur: 500 }, { id: "swirl", to: { r: 720 }, at: 1100, dur: 4000, ease: "linear" }]) },
          { caption: "وقتی عصبانی هستیم، شاید صورتمان داغ شود و دستمان را مشت کنیم.", do: all(
            [{ id: "swirl", to: { o: 0 }, dur: 400 }, { id: "kid.eyeO", to: { y: 0 }, dur: 300 }],
            arms("kid", -12, 12, 300, 500), face("kid", "angry", 300),
            [{ id: "kid.flush", to: { o: 1 }, at: 700, dur: 1200 },
              { id: "heat", to: { o: 1 }, at: 1100, dur: 400 }, { id: "heat", to: { y: "-2" }, at: 1300, dur: 2400, yoyo: true, times: 4 }],
            fists("kid", true, 1900),
            [{ id: "kid.fistL", to: { s: 1.2 }, at: 2400, dur: 1400, yoyo: true, times: 4 }, { id: "kid.fistR", to: { s: 1.2 }, at: 2400, dur: 1400, yoyo: true, times: 4 }]) },
          { caption: "وقتی غمگینیم، شاید گریه‌مان بگیرد و بدنمان سنگین شود.", do: all(
            [{ id: "heat", to: { o: 0 }, dur: 400 }, { id: "kid.flush", to: { o: 0 }, dur: 600 }],
            fists("kid", false, 0), arms("kid", 0, 0, 0, 600), face("kid", "sad", 400),
            [{ id: "kid.upper", to: { y: 1.6, sy: 0.95 }, at: 900, dur: 1600 }, { id: "kid.head", to: { y: 1 }, at: 900, dur: 1600 },
              { id: "kid.eyeO", to: { y: 0.7 }, at: 900, dur: 600 },
              { id: "kid.tear", to: { o: 1 }, at: 1700, dur: 300 }, { id: "kid.tear", to: { y: 2.8 }, at: 1800, dur: 1600 }]) },
          { caption: "هر کسی حس‌ها را جای خودش حس می‌کند. همه‌اش درست است.", hold: 7600, do: all(
            [{ id: "kid.tear", to: { o: 0, y: 0 }, dur: 300 }, { id: "kid.upper", to: { y: 0, sy: 1 }, dur: 700 }, { id: "kid.head", to: { y: 0 }, dur: 700 },
              { id: "kid.eyeO", to: { y: 0 }, dur: 300 }],
            face("kid", "happy", 300),
            [{ id: "a", to: { o: 1 }, at: 600, dur: 600 }, { id: "b", to: { o: 1 }, at: 600, dur: 600 },
              { id: "gA", to: { o: 1 }, at: 1600, dur: 400 }, { id: "gA", to: { s: 1.3 }, at: 2000, dur: 1200, yoyo: true, times: 4 },
              { id: "gK", to: { o: 1 }, at: 2800, dur: 400 }, { id: "gK", to: { s: 1.3 }, at: 3200, dur: 1200, yoyo: true, times: 4 },
              { id: "gB1", to: { o: 1 }, at: 4000, dur: 400 }, { id: "gB2", to: { o: 1 }, at: 4000, dur: 400 },
              { id: "gB1", to: { s: 1 }, at: 4400, dur: 1200, yoyo: true, times: 4 }, { id: "gB2", to: { s: 1 }, at: 4400, dur: 1200, yoyo: true, times: 4 }],
            face("a", "calm", 5400), face("kid", "calm", 5400), face("b", "calm", 5400),
            face("a", "happy", 6600), face("kid", "happy", 6600), face("b", "happy", 6600)) }
        ] },
      { type: "body", pic: "😊", prompt: "وقتی خوشحالی، کجای بدنت حسش می‌کنی؟" },
      { type: "body", pic: "😟", prompt: "وقتی نگرانی، کجای بدنت حسش می‌کنی؟",
        notes: { tummy: "شکمت. خیلی از بچه‌ها وقتی نگران‌اند، دلشان پیچ می‌خورد.", chest: "سینه‌ات. شاید قلبت تندتر بزند." } },
      { type: "body", pic: "😠", prompt: "وقتی عصبانی هستی، کجای بدنت حسش می‌کنی؟",
        notes: { head: "سرت. شاید صورتت داغ شود.", hands: "دست‌هایت. شاید دلت بخواهد مشتشان کنی." } },
      { type: "breathe", cycles: 3 }
    ]
  },
  {
    id: "feel-4", subject: "feel", level: null, emoji: "🟩", title: "نفس مربعی",
    steps: [
      /* Box breathing: a dot goes round the square, one side for each part of the breath, counting to four, while
         the child's chest rises, holds, falls and rests. */
      { type: "scene", prompt: "یک مربع چهار ضلع دارد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          kid: { art: "fl-kid", at: [36, 86], s: 1.35 },
          air: { art: "fl-puff", at: [26, -31], s: 1.1, flip: true, o: 0, under: "kid" },
          puff: { art: "fl-puff", at: [3, -29], s: 1.1, o: 0, under: "kid" },
          sq: { art: "fl-square", at: [86, 44], s: 1.25 },
          dot: { art: "fl-dot", at: [67.25, 62.75], o: 0 },
          counter: { art: "counter", at: [86, 44], o: 0 }
        },
        scenes: [
          { caption: "امروز با یک مربع نفس می‌کشیم. مربع چهار ضلع دارد.", hold: 6400, do: all(
            [{ id: "kid.armR", to: { r: -70 }, at: 900, dur: 500 },
              { id: "sq.s1", to: { o: 1 }, at: 1500, dur: 100 }, { id: "sq.s1", draw: true, at: 1500, dur: 700 },
              { id: "sq.s2", to: { o: 1 }, at: 2300, dur: 100 }, { id: "sq.s2", draw: true, at: 2300, dur: 700 },
              { id: "sq.s3", to: { o: 1 }, at: 3100, dur: 100 }, { id: "sq.s3", draw: true, at: 3100, dur: 700 },
              { id: "sq.s4", to: { o: 1 }, at: 3900, dur: 100 }, { id: "sq.s4", draw: true, at: 3900, dur: 700 },
              { id: "kid.armR", to: { r: 0 }, at: 4900, dur: 500 }, { id: "dot", to: { o: 1 }, at: 5000, dur: 400 }]) },
          { caption: "ضلع اول: آرام از بینی نفس می‌کشیم و تا چهار می‌شماریم.", key: 2800, hold: 5000, do: all(
            [{ id: "sq.s1", to: { o: 0.25 }, dur: 300 }, { id: "sq.s2", to: { o: 0.25 }, dur: 300 }, { id: "sq.s3", to: { o: 0.25 }, dur: 300 }, { id: "sq.s4", to: { o: 0.25 }, dur: 300 },
              { id: "counter", to: { o: 1 }, at: 200, dur: 200 }, { count: "counter", from: 1, to: 4, at: 400, dur: 4000 },
              { id: "sq.s1", to: { o: 1 }, at: 400, dur: 100 }, { id: "sq.s1", draw: true, at: 400, dur: 4000, ease: "linear" },
              { id: "dot", path: "M67.25 62.75L67.25 25.25", at: 400, dur: 4000, ease: "linear" }],
            face("kid", "breatheIn", 300),
            [{ id: "kid.upper", to: { y: -1.8, sx: 1.05 }, at: 400, dur: 4000, ease: "out" },
              { id: "air", to: { o: 1 }, at: 500, dur: 500 }, { id: "air", to: { x: 15 }, at: 500, dur: 3400 }, { id: "air", to: { o: 0 }, at: 3300, dur: 600 }]) },
          { caption: "ضلع دوم: نفس را نگه می‌داریم و تا چهار می‌شماریم.", key: 2400, hold: 5000, do: all(
            [{ id: "air", to: { x: 26 }, dur: 1 }, { count: "counter", from: 1, to: 4, at: 400, dur: 4000 },
              { id: "sq.s2", to: { o: 1 }, at: 400, dur: 100 }, { id: "sq.s2", draw: true, at: 400, dur: 4000, ease: "linear" },
              { id: "dot", path: "M67.25 25.25L104.75 25.25", at: 400, dur: 4000, ease: "linear" }]) },
          { caption: "ضلع سوم: آرام از دهان بیرون می‌دهیم و تا چهار می‌شماریم.", key: 2400, hold: 5000, do: all(
            [{ count: "counter", from: 1, to: 4, at: 400, dur: 4000 },
              { id: "sq.s3", to: { o: 1 }, at: 400, dur: 100 }, { id: "sq.s3", draw: true, at: 400, dur: 4000, ease: "linear" },
              { id: "dot", path: "M104.75 25.25L104.75 62.75", at: 400, dur: 4000, ease: "linear" }],
            face("kid", "breatheOut", 300),
            [{ id: "kid.upper", to: { y: 0, sx: 1 }, at: 400, dur: 4000, ease: "inout" },
              { id: "puff", to: { o: 1 }, at: 500, dur: 500 }, { id: "puff", to: { x: 14 }, at: 500, dur: 3400 }, { id: "puff", to: { o: 0 }, at: 3300, dur: 600 }]) },
          { caption: "ضلع چهارم: باز هم صبر می‌کنیم و تا چهار می‌شماریم. بعد دوباره از اول.", hold: 6800, do: all(
            [{ id: "puff", to: { x: 3 }, dur: 1 }, { count: "counter", from: 1, to: 4, at: 400, dur: 4000 },
              { id: "sq.s4", to: { o: 1 }, at: 400, dur: 100 }, { id: "sq.s4", draw: true, at: 400, dur: 4000, ease: "linear" },
              { id: "dot", path: "M104.75 62.75L67.25 62.75", at: 400, dur: 4000, ease: "linear" }],
            face("kid", "calm", 300),
            [{ id: "sq.s1", to: { o: 0.25 }, at: 4500, dur: 300 }, { id: "sq.s2", to: { o: 0.25 }, at: 4500, dur: 300 },
              { id: "sq.s3", to: { o: 0.25 }, at: 4500, dur: 300 }, { id: "sq.s4", to: { o: 0.25 }, at: 4500, dur: 300 },
              { count: "counter", from: 1, to: 2, at: 4600, dur: 2000 },
              { id: "dot", path: "M67.25 62.75L67.25 46", at: 4600, dur: 2000, ease: "linear" }],
            face("kid", "breatheIn", 4600), [{ id: "kid.upper", to: { y: -0.9, sx: 1.025 }, at: 4600, dur: 2000 }]) }
        ] },
      { type: "breathe", pattern: [4, 4, 4, 4], cycles: 3 },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-5", subject: "feel", level: null, emoji: "👀", title: "پنج چیز که می‌بینم",
    steps: [
      /* Grounding: a busy cloud of thoughts over the child's head gets smaller as they look, listen, touch, smell
         and breathe. */
      { type: "scene", prompt: "حس‌هایمان ما را به اینجا برمی‌گردانند", bg: "#cfe8f5",
        parts: {
          park: { art: "fl-park" },
          tree: { art: "🌳", at: [146, 60], s: 1.5 }, bird: { art: "🐦", at: [140, 34], s: 0.6 },
          note1: { art: "🎵", at: [136, 28], s: 0.4, o: 0 }, note2: { art: "🎶", at: [144, 26], s: 0.4, o: 0 },
          flower: { art: "🌷", at: [106, 86], s: 1.1 },
          kid: { art: "fl-kid", at: [62, 86], s: 1.35 },
          cloud: { art: "fl-cloud", at: [64, 20], s: 0.4, o: 0 }
        },
        scenes: [
          { caption: "گاهی سرمان پر از فکر می‌شود، مثل یک ابر شلوغ.", do: all(
            face("kid", "worried", 300),
            [{ id: "cloud", to: { o: 1 }, at: 500, dur: 500 }, { id: "cloud", to: { s: 1.15 }, at: 500, dur: 1400, ease: "back" },
              { id: "cloud.scribble", to: { r: 720 }, at: 800, dur: 4200, ease: "linear" },
              { id: "cloud", to: { r: 3 }, at: 1900, dur: 2400, yoyo: true, times: 8 }]) },
          { caption: "آن وقت می‌توانیم به دور و برمان نگاه کنیم.", do: all(
            face("kid", "happy", 0),
            [{ id: "kid.head", to: { r: -8 }, at: 400, dur: 500 }, { id: "kid.eyeO", to: { x: -0.9 }, at: 400, dur: 500 },
              { id: "kid.head", to: { r: 8 }, at: 1700, dur: 700 }, { id: "kid.eyeO", to: { x: 0.9 }, at: 1700, dur: 700 },
              { id: "flower", to: { s: 1.35 }, at: 2400, dur: 700, yoyo: true, times: 2 },
              { id: "tree", to: { s: 1.7 }, at: 3200, dur: 700, yoyo: true, times: 2 },
              { id: "bird", to: { s: 0.8 }, at: 4000, dur: 700, yoyo: true, times: 2 },
              { id: "cloud", to: { s: 0.9 }, at: 1000, dur: 3000 }]),
            wait: { tap: ["tree", "flower", "bird"], hint: "حالا نوبت توست: هر چیزی را که می‌بینی، بزن.",
              each: [{ id: "$", to: { s: "+0.2" }, dur: 600, yoyo: true, times: 2 }, { emit: "spark", from: "$", where: [0, -10], spread: [10, 8], n: 5, dur: 400, life: 1000 }] } },
          { caption: "گوش کنیم.", do: all(
            [{ id: "kid.armR", to: { r: -165 }, at: 300, dur: 600 }, { id: "kid.eyeO", to: { x: 0 }, at: 300, dur: 300 }],
            face("kid", "calm", 800),
            [{ id: "bird", to: { r: -10 }, at: 900, dur: 2400, yoyo: true, times: 6 },
              { id: "note1", to: { o: 1 }, at: 1000, dur: 200 }, { id: "note1", path: "M136 28Q130 20 126 10", at: 1000, dur: 1600 }, { id: "note1", to: { o: 0 }, at: 2300, dur: 400 },
              { id: "note2", to: { o: 1 }, at: 1800, dur: 200 }, { id: "note2", path: "M144 26Q138 16 134 6", at: 1800, dur: 1600 }, { id: "note2", to: { o: 0 }, at: 3100, dur: 400 },
              { id: "cloud", to: { s: 0.7 }, at: 1000, dur: 2600 }]) },
          { caption: "به چیزها دست بزنیم و بو کنیم.", key: 4200, do: all(
            [{ id: "kid.armR", to: { r: 0 }, dur: 500 }, { id: "kid.head", to: { r: 0 }, dur: 500 }],
            face("kid", "happy", 0),
            [{ id: "kid", to: { x: 86 }, at: 500, dur: 1200 }, { id: "cloud", to: { x: 88 }, at: 500, dur: 1200 }], walk("kid", 500, 1200),
            [{ id: "kid.armR", to: { r: -46 }, at: 1800, dur: 600 }, { id: "flower", to: { r: 8 }, at: 2300, dur: 900, yoyo: true, times: 4 },
              { id: "kid.head", to: { r: 14 }, at: 3300, dur: 600 }],
            face("kid", "breatheIn", 3500),
            [{ emit: "spark", where: [106, 66], spread: [6, 3], rise: -10, n: 6, at: 3600, dur: 1400, life: 1400 },
              { id: "cloud", to: { s: 0.5 }, at: 1000, dur: 3600 }]) },
          { caption: "و یک نفس آرام بکشیم. حالا حواسمان همین‌جاست.", do: all(
            [{ id: "kid.armR", to: { r: 0 }, dur: 500 }, { id: "kid.head", to: { r: 0 }, dur: 500 }],
            face("kid", "breatheIn", 400), breathe("kid", 500, 1800, 2200), face("kid", "breatheOut", 2300), face("kid", "calm", 4500),
            [{ id: "cloud", to: { s: 0.15, o: 0 }, at: 2300, dur: 2200 },
              { emit: "spark", where: [86, 40], spread: [40, 24], rise: -6, n: 8, at: 4500, dur: 1200, life: 1600 }]) }
        ] },
      { type: "ground" },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-15", subject: "feel", level: null, emoji: "🦋", title: "بدنم را تکان می‌دهم",
    steps: [
      /* Letting tension go by moving: tight shoulders and fists; shaking like a wet cat (drops fly off it); stretching
         tall next to a tree; the butterfly hug (arms crossed, tapping slowly in turn); a slow breath. */
      { type: "scene", prompt: "بدنمان را تکان می‌دهیم", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          tree: { art: "🌳", at: [98, 58], s: 1.8, o: 0 },
          cat: { art: "fl-cat", at: [124, 86], s: 1.3, o: 0 },
          kid: { art: "fl-kid", at: [58, 86], s: 1.4 },
          fly: { art: "🦋", at: [150, 20], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "گاهی وقتی نگران یا ناراحتیم، بدنمان سفت می‌شود: شانه‌ها بالا می‌روند و دست‌ها مشت می‌شوند.", do: all(
            face("kid", "worried", 300),
            [{ id: "kid.head", to: { y: 2.8 }, at: 800, dur: 1200 }, { id: "kid.armL", to: { y: -2.6, r: 10 }, at: 800, dur: 1200 },
              { id: "kid.armR", to: { y: -2.6, r: -10 }, at: 800, dur: 1200 }, { id: "kid.upper", to: { sx: 0.96 }, at: 800, dur: 1200 }],
            fists("kid", true, 1800)) },
          { caption: "پیشی خیس شده. خودش را تکان می‌دهد تا آب‌ها بریزند. ما هم مثل پیشی دست‌هایمان را تکان می‌دهیم: تکان، تکان، تکان!", key: 4300, do: all(
            show("cat", 1, 0),
            [{ id: "cat", to: { r: 9 }, at: 700, dur: 5400, yoyo: true, times: 24 },
              { emit: "drop", from: "cat", where: [0, -16], spread: [26, 14], rise: -6, n: 30, at: 700, dur: 5400, life: 1000 }],
            fists("kid", false, 2600), face("kid", "happy", 2600),
            [{ id: "kid.head", to: { y: 0 }, at: 2600, dur: 600 }, { id: "kid.upper", to: { sx: 1 }, at: 2600, dur: 600 },
              { id: "kid.armL", to: { y: 0, r: 0 }, at: 2600, dur: 500 }, { id: "kid.armR", to: { y: 0, r: 0 }, at: 2600, dur: 500 },
              { id: "kid.armL", to: { r: 22 }, at: 3300, dur: 3000, yoyo: true, times: 14 }, { id: "kid.armR", to: { r: -22 }, at: 3300, dur: 3000, yoyo: true, times: 14 },
              { id: "kid", to: { y: "-1.2" }, at: 3300, dur: 3000, yoyo: true, times: 10 }],
            face("kid", "joy", 3600)) },
          { caption: "حالا مثل یک درخت قد می‌کشیم: دست‌ها را بالا بالا می‌بریم، بعد آرام پایین می‌آوریم.", key: 3600, hold: 8000, do: all(
            show("cat", 0, 0), show("tree", 1, 400, 700),
            [{ id: "tree", to: { r: 3 }, at: 1000, dur: 6400, yoyo: true, times: 4 }],
            face("kid", "breatheIn", 1200), arms("kid", 168, -168, 1400, 2000),
            [{ id: "kid", to: { sy: 1.05, y: 85 }, at: 1400, dur: 2000 }],
            arms("kid", 0, 0, 4800, 2600), [{ id: "kid", to: { sy: 1, y: 86 }, at: 4800, dur: 2600 }], face("kid", "breatheOut", 4800)) },
          { caption: "بغل پروانه‌ای: دست‌ها را ضربدری روی سینه می‌گذاریم و آرام، یکی این‌ور، یکی آن‌ور، ضربه می‌زنیم.", key: 5200, hold: 9000, do: all(
            show("tree", 0, 0), show("fly", 1, 300),
            [{ id: "fly", path: "M150 20Q120 10 104 36T90 34", at: 300, dur: 3000 }],
            cross("kid", true, 1000), face("kid", "calm", 1600),
            [0, 1, 2, 3].map(function (i) { return { id: "kid.armL", to: { r: -54 }, at: 2400 + i * 1600, dur: 400, yoyo: true, times: 2 }; }),
            [0, 1, 2, 3].map(function (i) { return { id: "kid.armR", to: { r: 54 }, at: 3200 + i * 1600, dur: 400, yoyo: true, times: 2 }; }),
            [{ id: "fly", to: { y: "-2" }, at: 3400, dur: 5000, yoyo: true, times: 6 }]) },
          { caption: "و یک نفس آرام. حالا بدنمان نرم و آرام است.", do: all(
            cross("kid", false, 200), show("fly", 0, 200),
            face("kid", "breatheIn", 800), breathe("kid", 900, 1800, 2200), face("kid", "breatheOut", 2700), face("kid", "calm", 4900),
            [{ emit: "spark", where: [58, 50], spread: [30, 24], rise: -6, n: 8, at: 4900, dur: 1200, life: 1600 }]) }
        ] },
      { type: "doit", pic: "🐈", text: "حالا تو هم امتحان کن! با بزرگ‌ترت با هم انجامش بدهید:",
        list: ["مثل پیشی خیس، دست‌هایت را تکان بده: تکان، تکان، تکان!", "مثل یک درخت، دست‌هایت را بالا ببر و قد بکش. بعد آرام پایین بیاور.",
          "بغل پروانه‌ای: دست‌هایت را ضربدری روی سینه‌ات بگذار و آرام، یکی‌یکی، ده بار ضربه بزن."] },
      { type: "breathe", cycles: 3 },
      { type: "feelings" },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "هر وقت بدنت سفت شد، می‌توانی تکانش بدهی، قد بکشی یا خودت را بغل کنی.", pic: "🦋",
        tips: [
          "این حرکت‌ها را اول خودتان کنار کودک انجام دهید. کودک‌ها آرام شدن را از بزرگ‌ترها یاد می‌گیرند.",
          "بهترین وقت تمرین، وقتی است که کودک آرام است؛ بعد در لحظه‌های سخت راحت‌تر یادش می‌آید.",
          "بغل پروانه‌ای آرام و یکنواخت است. اگر کودک دوستش نداشت، یا لمس خودش برایش ناخوشایند بود، اصرار نکنید؛ تکان دادن و قد کشیدن هم همین کار را می‌کنند.",
          "اگر کودک بیشتر روزها سفت، ناآرام یا بی‌خواب است و این چند هفته ادامه دارد، با پزشک یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-13", subject: "feel", level: null, emoji: "🏡", title: "جای امن من",
    steps: [
      /* A calm place in the mind: Yasaman closes her eyes and breathes; a thought cloud grows with Grandma's garden
         in it; what she sees there (flowers, the pool), hears (a sparrow, the water) and smells (the flowers); then
         she opens her eyes, calm. */
      { type: "scene", prompt: "یک جای آرام در فکر ما", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          yas: { art: "fl-yas", at: [30, 86], s: 1.4 },
          dots: { art: "fl-dots", at: [42, 36], s: 1.2, o: 0 },
          dream: { art: "fl-dream", at: [102, 38], s: 0.2, o: 0 },
          notes: { art: "fl-notes", at: [86, 22], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "یاسمن می‌خواهد آرام شود. چشم‌هایش را می‌بندد و آرام نفس می‌کشد.", do: all(
            face("yas", "breatheIn", 600), breathe("yas", 700, 2000, 2400), face("yas", "breatheOut", 2700), face("yas", "calm", 5100)) },
          { caption: "در فکرش به یک جای آرام می‌رود: باغ مادربزرگ.", do: all(
            show("dots", 1, 300, 600),
            [{ id: "dream", to: { o: 1 }, at: 900, dur: 500 }, { id: "dream", to: { s: 1 }, at: 900, dur: 2600, ease: "out" }]) },
          { caption: "آنجا چه می‌بیند؟ گل‌ها، درخت و حوض آب.", key: 2600, do: all(
            [{ id: "dream.f1", to: { s: 1.4 }, at: 300, dur: 700, yoyo: true, times: 2 },
              { id: "dream.f2", to: { s: 1.4 }, at: 900, dur: 700, yoyo: true, times: 2 },
              { id: "dream.f3", to: { s: 1.4 }, at: 1500, dur: 700, yoyo: true, times: 2 },
              { emit: "spark", where: [82, 30], spread: [14, 12], n: 5, at: 2300, dur: 700, life: 1000 },
              { id: "dream.ripple", to: { sx: 0.7, sy: 0.7 }, at: 3200, dur: 1400, yoyo: true, times: 4 }]) },
          { caption: "چه می‌شنود؟ آواز گنجشک و صدای آب.", key: 2600, do: all(
            [{ id: "dream.bird", to: { r: -12 }, at: 300, dur: 3600, yoyo: true, times: 8 },
              { id: "notes", to: { o: 1 }, at: 500, dur: 300 }, { id: "notes", path: "M86 22Q84 16 78 12", at: 500, dur: 2400 }, { id: "notes", to: { o: 0 }, at: 2600, dur: 400 },
              { id: "dream.ripple", to: { sx: 0.6, sy: 0.6 }, at: 2800, dur: 1400, yoyo: true, times: 4 },
              { emit: "bubble", where: [114, 46], spread: [14, 2], rise: 4, n: 6, at: 2800, dur: 2400, life: 1000 }]) },
          { caption: "چه بویی می‌آید؟ بوی خوب گل‌ها.", key: 2800, do: all(
            [{ emit: "spark", where: [76, 40], spread: [10, 4], rise: -8, n: 8, at: 300, dur: 2400, life: 1600 },
              { id: "yas.head", to: { r: 8 }, at: 600, dur: 700 }],
            face("yas", "breatheIn", 900), breathe("yas", 900, 2000, 2400), face("yas", "calm", 3300),
            [{ id: "yas.head", to: { r: 0 }, at: 3400, dur: 700 }]) },
          { caption: "این جای آرام همیشه در فکر یاسمن هست. هر وقت بخواهد، با چند نفس آرام به آنجا می‌رود.", hold: 9000, do: all(
            face("yas", "breatheIn", 400), breathe("yas", 500, 2000, 2400), face("yas", "breatheOut", 2500),
            face("yas", "breatheIn", 5000), breathe("yas", 5000, 2000, 2400), face("yas", "breatheOut", 7000), face("yas", "calm", 8800),
            [{ id: "dream", to: { s: 1.04 }, at: 500, dur: 4400, yoyo: true, times: 4 }]) },
          { caption: "بعد آرام چشم‌هایش را باز می‌کند. حالا آرام‌تر است.", do: all(
            [{ id: "dream", to: { s: 0.2, o: 0 }, at: 300, dur: 2000 }], show("dots", 0, 1600),
            face("yas", "happy", 2400), arms("yas", -32, 32, 2800, 700)) }
        ] },
      { type: "relax", prompt: "پیش از رفتن به جای آرام، بدنمان را نرم می‌کنیم: هر جا را اول سفت می‌کنیم، بعد ول می‌کنیم.",
        parts: [
          { pic: "🍋", tense: "دست‌هایت را مشت کن، محکم، مثل اینکه یک لیمو را می‌فشاری.", release: "حالا ول کن. دست‌هایت نرم و آرام شدند." },
          { pic: "🐢", tense: "مثل لاک‌پشت، شانه‌هایت را بالا ببر تا نزدیک گوش‌هایت.", release: "حالا شانه‌هایت را پایین بیاور. آرام شدند." },
          { pic: "🐭", tense: "صورتت را جمع کن، مثل موشی که بینی‌اش را چین می‌دهد.", release: "حالا صورتت را ول کن. نرم و آرام شد." }
        ] },
      { type: "talk", scene: "🏡 🌷 🐦 💧", caption: "چشم‌هایت را ببند و به یک جای آرام فکر کن. آنجا چه می‌بینی؟ چه صدایی می‌شنوی؟ چه بویی می‌آید؟",
        tips: [
          "آرام و شمرده حرف بزنید و بین هر سؤال چند نفس صبر کنید.",
          "جای آرام می‌تواند واقعی باشد (یک باغ، اتاق مادربزرگ، کنار دریا) یا خیالی (یک ابر نرم، یک جنگل پر از گل). هر جایی که کودک انتخاب کند، درست است.",
          "اگر کودک جایی پیدا نکرد، یا فکر کردن ناراحتش کرد، اصرار نکنید. می‌توانید با هم یک جای خیالی تازه بسازید، یا فقط نفس آرام بکشید.",
          "اگر نخواست چشم‌هایش را ببندد، اشکالی ندارد. می‌تواند به یک نقطه نگاه کند."
        ] },
      { type: "breathe", cycles: 3 },
      { type: "doit", pic: "🖍️", text: "جای آرامت را روی کاغذ نقاشی کن. هر وقت خواستی، به نقاشی‌ات نگاه کن و چند نفس آرام بکش." },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "جای آرام تو همیشه در فکرت هست. هر وقت خواستی، می‌توانی به آنجا بروی.", pic: "🏡",
        tips: [
          "این تمرین را چند بار در روزهای آرام تکرار کنید تا کودک راحت به جای آرامش برود. بعد در لحظه‌های ناآرامی یادش می‌آید.",
          "برای کودکی که خانه یا جایی را از دست داده، شاید جای واقعی غم بیاورد. پیشنهاد کنید یک جای خیالی بسازد، یا کنار شما بودن را جای امنش بداند.",
          "نقاشی جای آرام را جایی بگذارید که کودک ببیند، مثلاً کنار رختخوابش.",
          "اگر کودک بیشتر وقت‌ها احساس ناامنی می‌کند، کابوس می‌بیند یا آرام نمی‌شود و این چند هفته ادامه دارد، با پزشک یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-6", subject: "feel", level: null, emoji: "🐿️", title: "وقتی نگرانم",
    steps: [
      /* Fandogh's worry: a turning tummy and a grey cloud at night, telling Mama, a hug, breathing together (smell
         the flower, blow the candle: the flame bends), and the cloud getting smaller. */
      { type: "scene", prompt: "فندق نگران است", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" }, bedroom: { art: "fl-bedroom", o: 0 }, yard: { art: "fl-yard", o: 0 },
          school: { art: "🏫", at: [28, 64], s: 1.8, o: 0 }, sun: { art: "☀️", at: [120, 24], s: 0.6, o: 0 },
          bed: { art: "fl-bed", at: [48, 86], s: 1.3, o: 0 },
          bag: { art: "fl-bag", at: [94, 86], s: 1.1 },
          think: { art: "fl-think", at: [72, 38], o: 0 }, thinkSchool: { art: "🏫", at: [16, -8], s: 0.9, under: "think" },
          mama: { art: "fl-mama", at: [132, 86], s: 1.75, flip: true, o: 0 },
          puffM: { art: "fl-puff", at: [3, -22], o: 0, under: "mama" },
          fan: { art: "fl-fandogh", at: [-20, 86], s: 1.35 },
          swirl: { art: "fl-swirl", at: [0, -11], o: 0, under: "fan" },
          puffF: { art: "fl-puff", at: [3, -22], o: 0, under: "fan" },
          blanket: { art: "fl-blanket", at: [48, 86], s: 1.3, o: 0 },
          hug: { art: "fl-hug", at: [132, 86], s: 1.75, o: 0 },
          rabbit: { art: "fl-rabbit", at: [176, 86], s: 1.35, o: 0 },
          cloud: { art: "fl-cloud", at: [48, 24], s: 0.9, o: 0 },
          flower: { art: "fl-flower", at: [102, 58], s: 1.3, o: 0 }, candle: { art: "fl-candle", at: [116, 64], s: 1.3, o: 0 },
          heart: { art: "fl-heart", at: [114, 34], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "این فندق است. فردا اولین روز مدرسه‌اش است.", do: all(
            [{ id: "fan", to: { x: 64 }, dur: 1800, ease: "out" }, { id: "fan.tail", to: { r: 10 }, dur: 1800, yoyo: true, times: 4 },
              { id: "fan.eyeO", to: { x: 0.8 }, at: 1900, dur: 400 },
              { id: "think", to: { o: 1 }, at: 2400, dur: 600 }, { id: "think", to: { s: 1.06 }, at: 3000, dur: 600, yoyo: true, times: 2 }],
            face("fan", "joy", 3200), [{ id: "fan", to: { y: "-4" }, at: 3400, dur: 900, yoyo: true, times: 2, ease: "out" }]) },
          { caption: "شب، فندق خوابش نمی‌برد. دلش پیچ می‌خورد. فندق نگران است.", do: all(
            [{ id: "bedroom", to: { o: 1 }, dur: 800 }, { id: "bag", to: { o: 0 }, dur: 400 }, { id: "think", to: { o: 0 }, dur: 400 },
              { id: "bed", to: { o: 1 }, at: 400, dur: 600 }, { id: "fan.eyeO", to: { x: 0 }, at: 400, dur: 1 },
              { id: "fan", path: "M64 86Q56 70 48 80", at: 700, dur: 900 }, { id: "blanket", to: { o: 1 }, at: 1500, dur: 400 }],
            face("fan", "worried", 1900),
            [{ id: "fan.eyeO", to: { x: -0.7 }, at: 2200, dur: 1600, yoyo: true, times: 4 },
              { id: "fan", to: { r: 6 }, at: 2400, dur: 2400, yoyo: true, times: 4 },
              { id: "swirl", to: { o: 1 }, at: 2600, dur: 400 }, { id: "swirl", to: { r: 720 }, at: 2600, dur: 3200, ease: "linear" },
              { id: "cloud", to: { o: 1 }, at: 3400, dur: 600 }, { id: "cloud.scribble", to: { r: 360 }, at: 3400, dur: 3000, ease: "linear" }]) },
          { caption: "فندق پیش مامانش می‌رود و می‌گوید: «من نگرانم.»", do: all(
            [{ id: "mama", to: { o: 1 }, at: 200, dur: 600 }, { id: "fan.eyeO", to: { x: 0 }, dur: 300 },
              { id: "fan", path: "M48 80Q68 62 90 86", at: 500, dur: 1300 }, { id: "cloud", path: "M48 24Q68 18 90 24", at: 500, dur: 1300 },
              { id: "fan.head", to: { r: 6 }, at: 1900, dur: 400 }],
            talk("fan", 2000, 1800), face("mama", "caring", 2200), [{ id: "mama.head", to: { r: -6 }, at: 2200, dur: 500 }]) },
          { caption: "مامان بغلش می‌کند و می‌گوید: «ممنون که به من گفتی.»", do: all(
            [{ id: "fan.head", to: { r: 0 }, dur: 300 }, { id: "fan", to: { x: 122, y: 88 }, dur: 700 }, { id: "cloud", to: { x: 118 }, dur: 700 },
              { id: "mama.armL", to: { o: 0 }, at: 600, dur: 300 }, { id: "mama.armR", to: { o: 0 }, at: 600, dur: 300 },
              { id: "hug", to: { o: 1 }, at: 600, dur: 400 }, { id: "heart", to: { x: 124 }, dur: 1 }, { id: "heart", to: { o: 1 }, at: 1200, dur: 400 },
              { id: "heart", to: { s: 1.5 }, at: 1600, dur: 1600, yoyo: true, times: 4 }],
            face("fan", "calm", 1200), face("mama", "happy", 1000), talk("mama", 1600, 2200)) },
          { caption: "با هم نفس گل و شمع می‌کشند. گل را بو کن، شمع را فوت کن.", key: 3600, hold: 9400, do: all(
            [{ id: "hug", to: { o: 0 }, dur: 300 }, { id: "heart", to: { o: 0 }, dur: 300 },
              { id: "mama.armL", to: { o: 1 }, dur: 300 }, { id: "mama.armR", to: { o: 1 }, dur: 300 },
              { id: "fan", to: { x: 88, y: 86 }, dur: 600 }, { id: "cloud", to: { x: 88 }, dur: 600 },
              { id: "flower", to: { o: 1 }, at: 600, dur: 400 }, { id: "candle", to: { o: 1 }, at: 600, dur: 400 },
              { id: "flower", to: { s: 1.5 }, at: 900, dur: 1800, yoyo: true, times: 2 }],
            face("fan", "breatheIn", 900), face("mama", "breatheIn", 900), breathe("fan", 900, 1800, 2200), breathe("mama", 900, 1800, 2200),
            face("fan", "breatheOut", 2700), face("mama", "breatheOut", 2700),
            [{ id: "puffF", to: { o: 1 }, at: 2800, dur: 300 }, { id: "puffF", to: { x: 14 }, at: 2800, dur: 1800 }, { id: "puffF", to: { o: 0, x: 3 }, at: 4600, dur: 300 },
              { id: "puffM", to: { o: 1 }, at: 2800, dur: 300 }, { id: "puffM", to: { x: 9 }, at: 2800, dur: 1800 }, { id: "puffM", to: { o: 0, x: 3 }, at: 4600, dur: 300 },
              { id: "candle.flame", to: { r: -25, sx: 0.75 }, at: 2900, dur: 500 }, { id: "candle.flame", to: { r: 25 }, at: 3400, dur: 900, yoyo: true, times: 2 },
              { id: "candle.flame", to: { r: 0, sx: 1 }, at: 4400, dur: 500 },
              { id: "flower", to: { s: 1.5 }, at: 5100, dur: 1800, yoyo: true, times: 2 }],
            face("fan", "breatheIn", 5100), face("mama", "breatheIn", 5100), breathe("fan", 5100, 1800, 2200), breathe("mama", 5100, 1800, 2200),
            face("fan", "breatheOut", 6900), face("mama", "breatheOut", 6900),
            [{ id: "puffF", to: { o: 1 }, at: 7000, dur: 300 }, { id: "puffF", to: { x: 14 }, at: 7000, dur: 1800 }, { id: "puffF", to: { o: 0, x: 3 }, at: 8800, dur: 300 },
              { id: "puffM", to: { o: 1 }, at: 7000, dur: 300 }, { id: "puffM", to: { x: 9 }, at: 7000, dur: 1800 }, { id: "puffM", to: { o: 0, x: 3 }, at: 8800, dur: 300 },
              { id: "candle.flame", to: { r: -25, sx: 0.75 }, at: 7100, dur: 500 }, { id: "candle.flame", to: { r: 0, sx: 1 }, at: 8600, dur: 500 },
              { id: "swirl", to: { o: 0 }, at: 6000, dur: 2000 }],
            face("fan", "calm", 9100), face("mama", "happy", 9100)) },
          { caption: "مامان می‌گوید: «نگرانی مثل ابر است. می‌آید و می‌رود.» ابر کم‌کم کوچک می‌شود.", hold: 7000, do: all(
            [{ id: "candle", to: { o: 0 }, dur: 400 }, { id: "flower", to: { o: 0 }, dur: 400 }], talk("mama", 300, 2600),
            [{ id: "fan.eyeO", to: { x: -0.5, y: -0.6 }, at: 1200, dur: 500 },
              { id: "cloud", to: { s: 0.25 }, at: 1600, dur: 4400 }, { id: "cloud", path: "M88 24Q60 14 34 22", at: 1600, dur: 4400 },
              { id: "cloud.scribble", to: { o: 0 }, at: 1600, dur: 2000 }],
            face("fan", "happy", 1200)) },
          { caption: "صبح، فندق به مدرسه رفت و یک دوست تازه پیدا کرد.", do: all(
            [{ id: "yard", to: { o: 1 }, dur: 800 }, { id: "school", to: { o: 1 }, at: 400, dur: 600 },
              { id: "sun", to: { o: 1 }, at: 400, dur: 600 }, { id: "sun", to: { s: 1 }, at: 400, dur: 1400, ease: "back" },
              { id: "bed", to: { o: 0 }, dur: 600 }, { id: "blanket", to: { o: 0 }, dur: 600 }, { id: "mama", to: { o: 0 }, dur: 600 }, { id: "cloud", to: { o: 0 }, dur: 600 },
              { id: "fan.eyeO", to: { x: 0, y: 0 }, dur: 1 }, { id: "fan", to: { x: 40 }, dur: 1 }, { id: "bag", to: { x: 26, s: 0.9 }, dur: 1 },
              { id: "bag", to: { o: 1 }, at: 500, dur: 500 },
              { id: "fan", to: { x: 70 }, at: 900, dur: 1600 }, { id: "bag", to: { x: 56 }, at: 900, dur: 1600 },
              { id: "rabbit", to: { o: 1 }, at: 2000, dur: 300 }, { id: "rabbit", to: { x: 112 }, at: 2000, dur: 1600, ease: "out" },
              { id: "rabbit.armR", to: { r: -150 }, at: 3700, dur: 400 }, { id: "rabbit.armR", to: { r: -120 }, at: 4100, dur: 1200, yoyo: true, times: 4 }],
            face("rabbit", "joy", 3700), face("fan", "joy", 4200),
            [{ id: "fan.armR", to: { r: -150 }, at: 4300, dur: 400 },
              { id: "fan", to: { y: "-4" }, at: 4800, dur: 1600, yoyo: true, times: 4, ease: "out" }, { id: "rabbit", to: { y: "-4" }, at: 5000, dur: 1600, yoyo: true, times: 4, ease: "out" }]) }
        ] },
      { type: "talk", scene: "🐿️ ☁️ 🌷 💛", caption: "تو کی نگران می‌شوی؟ وقتی نگرانی، چه چیزی کمکت می‌کند؟ به چه کسی می‌گویی؟",
        tips: [
          "گوش کنید و حرفش را تکرار کنید: «پس نگرانی که فردا دوستی پیدا نکنی.»",
          "به جای «نترس، چیزی نیست» بگویید: «می‌فهمم نگرانی. من کنارت هستم.»",
          "با هم فکر کنید چه چیزی کمک می‌کند: نفس آرام، بغل، حرف زدن، کشیدن یک نقاشی.",
          "اگر نخواست حرف بزند، مجبورش نکنید. فقط بگویید هر وقت خواست، گوش می‌دهید."
        ] },
      { type: "breathe", cycles: 3 },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "یادت باشد: وقتی نگرانی، می‌توانی به یک بزرگ‌تر که دوستش داری بگویی.", pic: "💛",
        tips: [
          "نگرانی حسی طبیعی است و بیشتر وقت‌ها با گذشت زمان، روال روزانه و نزدیک بودن شما کم می‌شود.",
          "نگرانی کودک را کوچک نشمارید و به او نخندید. اسمش را بگویید و کنارش بمانید.",
          "روال ثابت خواب، غذا و بازی به کودک احساس امنیت می‌دهد.",
          "اگر نگرانی یا ترس کودک چند هفته ادامه پیدا کرد، شدیدتر شد، خواب، غذا یا بازی‌اش را به هم ریخت، یا از آسیب زدن به خودش حرف زد، با پزشک، مشاور مدرسه یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-14", subject: "feel", level: null, emoji: "🖐️", title: "آدم‌های کمک‌کار من",
    steps: [
      /* My helpers: Shirin counts five grown-ups on the fingers of a big hand (each fingertip glows, and the helper
         stands on it); Grandma lives far away and they talk on the phone; then Shirin asks Mom for help with a
         teddy on a high shelf. */
      { type: "scene", prompt: "آدم‌هایی که کمکمان می‌کنند", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          shelf: { art: "fl-shelf", at: [116, 31], s: 1.2, o: 0 }, teddy: { art: "🧸", at: [116, 25], s: 0.7, o: 0 },
          hand: { art: "fl-hand", at: [64, 90], s: 1.5, o: 0 },
          h1: { art: "fl-mom", at: [94.4, 37], s: 0.46, o: 0 }, h2: { art: "fl-dad", at: [75.9, 23], s: 0.46, o: 0 },
          h3: { art: "fl-grandma", at: [67, 20], s: 0.44, o: 0 }, h4: { art: "fl-aunt", at: [58, 21], s: 0.44, o: 0 },
          h5: { art: "fl-teacher", at: [49.2, 28], s: 0.44, o: 0 },
          call: { art: "fl-call", at: [76, 70], s: 1.7, o: 0 }, heart: { art: "fl-heart", at: [76, 16], s: 1.3, o: 0 },
          mom: { art: "fl-mom", at: [-20, 88], s: 1.6 },
          shirin: { art: "fl-shirin", at: [134, 86], s: 1.3 }
        },
        scenes: [
          { caption: "وقتی کمک لازم داریم، آدم‌هایی هستند که کمکمان می‌کنند. شیرین آن‌ها را روی انگشت‌های دستش می‌شمارد.", do: all(
            show("hand", 1, 400, 800), [{ id: "shirin.armR", to: { r: 40 }, at: 1400, dur: 600 }, { id: "shirin.eyeO", to: { x: -0.8 }, at: 1400, dur: 500 }]) },
          { caption: "یک: مامان. دو: بابا. سه: مادربزرگ.", hold: 7000, do: all(
            [{ id: "shirin.armR", to: { r: 0 }, dur: 500 },
              { id: "hand.g1", to: { o: 1 }, at: 400, dur: 400 }, { id: "h1", to: { o: 1 }, at: 600, dur: 600 },
              { id: "hand.g2", to: { o: 1 }, at: 2200, dur: 400 }, { id: "h2", to: { o: 1 }, at: 2400, dur: 600 },
              { id: "hand.g3", to: { o: 1 }, at: 4000, dur: 400 }, { id: "h3", to: { o: 1 }, at: 4200, dur: 600 }],
            face("h1", "joy", 1200), face("h2", "joy", 3000), face("h3", "joy", 4800), face("shirin", "joy", 1200)) },
          { caption: "چهار: خاله. پنج: آقای معلم. پنج نفر، روی پنج انگشت!", hold: 6400, do: all(
            [{ id: "hand.g4", to: { o: 1 }, at: 400, dur: 400 }, { id: "h4", to: { o: 1 }, at: 600, dur: 600 },
              { id: "hand.g5", to: { o: 1 }, at: 2200, dur: 400 }, { id: "h5", to: { o: 1 }, at: 2400, dur: 600 },
              { id: "hand", to: { s: 1.56 }, at: 4000, dur: 700, yoyo: true, times: 2 }],
            face("h4", "joy", 1200), face("h5", "joy", 3000), face("shirin", "happy", 4000)) },
          { caption: "مادربزرگ در شهر دیگری است. دور است، اما با تلفن با هم حرف می‌زنند. مادربزرگ هنوز به شیرین فکر می‌کند و دوستش دارد.", key: 4400, hold: 8400, do: all(
            show("hand h1 h2 h3 h4 h5", 0, 0, 600),
            [{ id: "call", to: { o: 1 }, at: 700, dur: 600 }, { id: "shirin.eyeO", to: { x: -0.8 }, at: 700, dur: 400 },
              { id: "shirin.armR", to: { r: 35 }, at: 800, dur: 600 }],
            face("call", "joy", 1600), talk("call", 1800, 1800), face("shirin", "joy", 2000), talk("shirin", 3800, 1800),
            [{ id: "heart", to: { o: 1 }, at: 3600, dur: 500 }, { id: "heart", to: { s: 1.6 }, at: 4100, dur: 1600, yoyo: true, times: 4 }]) },
          { caption: "شیرین عروسکش را می‌خواهد، اما قفسه بلند است. به مامان می‌گوید: «می‌شود کمکم کنی؟»", key: 6000, do: all(
            show("call heart", 0, 0), show("shelf teddy", 1, 400, 600),
            [{ id: "shirin.armR", to: { r: 0 }, dur: 400 }, { id: "shirin.eyeO", to: { x: 0, y: -0.8 }, at: 400, dur: 400 },
              { id: "shirin", to: { x: 128 }, at: 900, dur: 900 }], walk("shirin", 900, 900),
            [{ id: "shirin.armL", to: { r: 160 }, at: 2400, dur: 600 }, { id: "shirin", to: { y: 84.5 }, at: 2600, dur: 500, yoyo: true, times: 4 }],
            face("shirin", "sorry", 3200), arms("shirin", 0, 0, 3800, 500),
            [{ id: "mom", to: { x: 84 }, at: 3600, dur: 2000 }], walk("mom", 3600, 2000),
            [{ id: "shirin.eyeO", to: { x: -0.8, y: 0 }, at: 5000, dur: 400 }], talk("shirin", 5400, 2000)) },
          { caption: "مامان می‌گوید: «حتماً!» و عروسک را به او می‌دهد. شیرین می‌گوید: «ممنون!»", do: all(
            face("mom", "happy", 200), talk("mom", 300, 1000),
            [{ id: "mom", to: { x: 96 }, at: 1300, dur: 900 }], walk("mom", 1300, 900),
            [{ id: "mom.armR", to: { r: -150 }, at: 2200, dur: 700 },
              { id: "teddy", path: "M116 25Q126 40 128 64", at: 3000, dur: 1300 },
              { id: "mom.armR", to: { r: -40 }, at: 3000, dur: 1300 }, { id: "shirin.armL", to: { r: 40 }, at: 3800, dur: 500 }, { id: "shirin.armR", to: { r: -40 }, at: 3800, dur: 500 }],
            face("shirin", "joy", 4300), talk("shirin", 4600, 1200), face("mom", "joy", 5000)) }
        ] },
      { type: "talk", scene: "🖐️ 👩 👨 👵 👩‍🏫", caption: "تو چه کسانی را روی انگشت‌هایت می‌شماری؟ وقتی کمک لازم داری، به چه کسی می‌گویی؟",
        tips: [
          "با کودک پنج بزرگ‌تر را روی پنج انگشتش بشمارید: کسانی که هم شما و هم کودک به آن‌ها اعتماد دارید، دست‌کم یکی بیرون از خانه (معلم، همسایه، خاله).",
          "کسی که دور است هم می‌تواند کمک‌کار باشد: پدربزرگ یا عمه‌ای که تلفنی حرف می‌زند.",
          "اگر کسی از خانواده دور است یا نیست، با مهربانی بگویید که او هنوز در دل ماست، و کسانی را که الان نزدیک‌اند هم بشمارید.",
          "به کودک بگویید اگر یکی گوش نداد، به نفر بعدی بگوید."
        ] },
      { type: "talk", scene: "🧸 🙋 💛", caption: "با بزرگ‌ترت بازی کن: تو بگو «می‌شود کمکم کنی؟» و او جواب بدهد. حالا جایتان را عوض کنید!",
        tips: [
          "چند موقعیت ساده را با هم بازی کنید: باز نشدن در یک ظرف، بستن بند کفش، پیدا نکردن یک اسباب‌بازی.",
          "هر بار که کودک کمک خواست، گرم جواب بدهید: «خوشحالم که از من خواستی.»",
          "بگویید کمک خواستن کار خوبی است. بزرگ‌ترها هم از هم کمک می‌خواهند."
        ] },
      { type: "doit", pic: "🖐️", text: "دستت را روی کاغذ بگذار و بزرگ‌ترت دورش را خط بکشد. روی هر انگشت، یکی از آدم‌های کمک‌کارت را بکش یا اسمش را بنویسید." },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "یادت باشد: آدم‌های زیادی دوستت دارند و می‌توانی از آن‌ها کمک بخواهی.", pic: "💛",
        tips: [
          "نقاشی دست کمک‌کارها را جایی بگذارید که کودک هر روز ببیند. شماره تلفن کمک‌کارهای دور را هم کنارش بنویسید.",
          "برای کودکی که از خانواده‌اش دور افتاده یا کسی را از دست داده، این درس ممکن است دلتنگی بیاورد. کنارش بمانید و بگذارید حرف بزند یا ساکت بماند.",
          "اگر کودک هیچ‌کس را برای کمک خواستن پیدا نمی‌کند، یا از گفتن به بزرگ‌ترها می‌ترسد، با آرامش دلیلش را بپرسید و اگر نگران شدید، با مشاور یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-7", subject: "feel", level: null, emoji: "🌡️", title: "دماسنج خشم",
    steps: [
      /* Anger rising and falling: the tower falls, Kian's face goes hot and his fists close while the thermometer
         rises; he stops, breathes (the candle's flame bends) and the thermometer goes down; they talk and rebuild. */
      { type: "scene", prompt: "خشم هم مثل دما بالا و پایین می‌رود", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          t1: { art: "fl-block-r", at: [80, 86], s: 1.2, o: 0 }, t2: { art: "fl-block-b", at: [80, 77.4], s: 1.2, o: 0 },
          t3: { art: "fl-block-y", at: [80, 68.8], s: 1.2, o: 0 }, t4: { art: "fl-block-g", at: [80, 60.2], s: 1.2, o: 0 },
          t5: { art: "fl-block-o", at: [80, 51.6], s: 1.2, o: 0 },
          kian: { art: "fl-kian", at: [44, 86], s: 1.3 },
          heat: { art: "fl-heat", at: [0, -42], o: 0, under: "kian" }, puff: { art: "fl-puff", at: [3, -29], o: 0, under: "kian" },
          sis: { art: "fl-sis", at: [150, 86], s: 1.0 },
          stop: { art: "✋", at: [44, 26], s: 0.8, o: 0 },
          meter: { art: "fl-thermo", at: [140, 84], s: 0.85, o: 0 },
          flower: { art: "fl-flower", at: [28, 60], s: 1.4, o: 0 }, candle: { art: "fl-candle", at: [60, 66], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "کیان یک برج بلند ساخت. خواهر کوچکش به آن خورد و برج افتاد.", do: all(
            [{ id: "kian.armR", to: { r: -50 }, at: 200, dur: 2800, yoyo: true, times: 10 },
              { id: "t1", to: { o: 1 }, at: 300, dur: 200 }, { id: "t1", path: "M58 70Q70 66 80 86", at: 300, dur: 450 },
              { id: "t2", to: { o: 1 }, at: 850, dur: 200 }, { id: "t2", path: "M58 70Q70 62 80 77.4", at: 850, dur: 450 },
              { id: "t3", to: { o: 1 }, at: 1400, dur: 200 }, { id: "t3", path: "M58 70Q68 56 80 68.8", at: 1400, dur: 450 },
              { id: "t4", to: { o: 1 }, at: 1950, dur: 200 }, { id: "t4", path: "M58 70Q68 50 80 60.2", at: 1950, dur: 450 },
              { id: "t5", to: { o: 1 }, at: 2500, dur: 200 }, { id: "t5", path: "M58 70Q68 44 80 51.6", at: 2500, dur: 450 }],
            face("kian", "joy", 3000),
            [{ id: "sis", to: { x: 92 }, at: 3200, dur: 1800 }, { id: "sis.head", to: { r: 10 }, at: 3200, dur: 600 }], walk("sis", 3200, 1800),
            [{ id: "t5", path: "M80 51.6Q96 48 104 86", at: 5000, dur: 700, ease: "in" }, { id: "t5", to: { r: 95 }, at: 5000, dur: 700 },
              { id: "t4", path: "M80 60.2Q70 56 64 87", at: 5050, dur: 650, ease: "in" }, { id: "t4", to: { r: -70 }, at: 5050, dur: 650 },
              { id: "t3", path: "M80 68.8Q90 66 96 87", at: 5100, dur: 600, ease: "in" }, { id: "t3", to: { r: 40 }, at: 5100, dur: 600 },
              { id: "t2", path: "M80 77.4Q74 76 70 87", at: 5150, dur: 500, ease: "in" }, { id: "t2", to: { r: -25 }, at: 5150, dur: 500 },
              { id: "t1", to: { r: 6 }, at: 5200, dur: 300 }, { id: "sis.head", to: { r: 0 }, at: 5000, dur: 300 }],
            face("sis", "oops", 5200), face("kian", "oops", 5400)) },
          { caption: "کیان عصبانی شد. صورتش داغ شد. خشمش مثل دماسنج بالا رفت.", do: all(
            [{ id: "meter.level", to: { sy: 0.15 }, dur: 1 }], face("kian", "angry", 200),
            [{ id: "kian.flush", to: { o: 1 }, at: 500, dur: 1400 }, { id: "heat", to: { o: 1 }, at: 1000, dur: 400 },
              { id: "heat", to: { y: "-2" }, at: 1200, dur: 2400, yoyo: true, times: 4 }],
            fists("kian", true, 900), arms("kian", -10, 10, 900, 400),
            [{ id: "meter", to: { o: 1 }, at: 700, dur: 500 }, { id: "meter.level", to: { sy: 0.95 }, at: 1300, dur: 2600, ease: "in" }]) },
          { caption: "عصبانی شدن اشکالی ندارد. اما زدن و داد زدن کسی را ناراحت می‌کند. کیان ایستاد.", hold: 7000, do: all(
            arms("kian", 50, -50, 300, 500),
            [{ id: "stop", to: { o: 1 }, at: 1600, dur: 300 }, { id: "stop", to: { s: 1 }, at: 1900, dur: 800, yoyo: true, times: 2 }],
            arms("kian", 0, 0, 2000, 1200), fists("kian", false, 3200), face("kian", "sorry", 3400)) },
          { caption: "کیان آرام نفس کشید: گل را بو کرد، شمع را فوت کرد. خشمش کم‌کم پایین آمد.", key: 7200, hold: 9400, do: all(
            [{ id: "stop", to: { o: 0 }, dur: 400 }, { id: "heat", to: { o: 0 }, at: 2400, dur: 1000 }, { id: "kian.flush", to: { o: 0 }, at: 2400, dur: 6000 },
              { id: "flower", to: { o: 1 }, at: 300, dur: 400 }, { id: "candle", to: { o: 1 }, at: 300, dur: 400 },
              { id: "kian.head", to: { r: -8 }, at: 500, dur: 600 }, { id: "kian.head", to: { r: 8 }, at: 2300, dur: 600 },
              { id: "kian.head", to: { r: -8 }, at: 4700, dur: 600 }, { id: "kian.head", to: { r: 8 }, at: 6500, dur: 600 }, { id: "kian.head", to: { r: 0 }, at: 8800, dur: 500 }],
            face("kian", "breatheIn", 500), breathe("kian", 500, 1800, 2200), face("kian", "breatheOut", 2300),
            [{ id: "puff", to: { o: 1 }, at: 2400, dur: 300 }, { id: "puff", to: { x: 9 }, at: 2400, dur: 1800 }, { id: "puff", to: { o: 0, x: 3 }, at: 4200, dur: 300 },
              { id: "candle.flame", to: { r: 30, sx: 0.75 }, at: 2500, dur: 500 }, { id: "candle.flame", to: { r: 0, sx: 1 }, at: 4000, dur: 500 },
              { id: "meter.level", to: { sy: 0.6 }, at: 2400, dur: 2000 }],
            face("kian", "breatheIn", 4700), breathe("kian", 4700, 1800, 2200), face("kian", "breatheOut", 6500),
            [{ id: "puff", to: { o: 1 }, at: 6600, dur: 300 }, { id: "puff", to: { x: 9 }, at: 6600, dur: 1800 }, { id: "puff", to: { o: 0, x: 3 }, at: 8400, dur: 300 },
              { id: "candle.flame", to: { r: 30, sx: 0.75 }, at: 6700, dur: 500 }, { id: "candle.flame", to: { r: 0, sx: 1 }, at: 8200, dur: 500 },
              { id: "meter.level", to: { sy: 0.25 }, at: 6600, dur: 2000 }],
            face("kian", "calm", 8800)) },
          { caption: "بعد گفت: «ناراحت شدم که برجم افتاد.» خواهرش گفت: «ببخشید.»", do: all(
            [{ id: "candle", to: { o: 0 }, dur: 400 }, { id: "flower", to: { o: 0 }, dur: 400 }, { id: "sis", to: { x: 100 }, at: 200, dur: 900 }], walk("sis", 200, 900),
            face("kian", "sorry", 400), face("sis", "happy", 400), talk("kian", 900, 2400),
            face("sis", "sorry", 3400), [{ id: "sis.head", to: { y: 0.8 }, at: 3400, dur: 500 }], talk("sis", 3600, 1200),
            face("kian", "happy", 5000), [{ id: "sis.head", to: { y: 0 }, at: 5000, dur: 400 }]) },
          { caption: "با هم یک برج تازه ساختند.", do: all(
            [{ id: "meter", to: { o: 0 }, dur: 500 },
              { id: "t1", to: { r: 0 }, at: 400, dur: 400 },
              { id: "t2", path: "M70 87Q66 70 80 77.4", at: 700, dur: 600 }, { id: "t2", to: { r: 0 }, at: 700, dur: 600 },
              { id: "t3", path: "M96 87Q96 64 80 68.8", at: 1500, dur: 600 }, { id: "t3", to: { r: 0 }, at: 1500, dur: 600 },
              { id: "t4", path: "M64 87Q62 56 80 60.2", at: 2300, dur: 600 }, { id: "t4", to: { r: 0 }, at: 2300, dur: 600 },
              { id: "t5", path: "M104 86Q100 44 80 51.6", at: 3100, dur: 600 }, { id: "t5", to: { r: 0 }, at: 3100, dur: 600 },
              { id: "kian.armR", to: { r: -50 }, at: 700, dur: 2400, yoyo: true, times: 4 }, { id: "sis.armL", to: { r: 50 }, at: 1500, dur: 2400, yoyo: true, times: 4 }],
            face("kian", "joy", 3800), face("sis", "joy", 3800),
            [{ emit: "spark", where: [80, 50], spread: [30, 14], n: 8, at: 3900, dur: 1200, life: 1400 }]) }
        ] },
      { type: "meter", pic: "😠", prompt: "آخرین باری را که عصبانی شدی به یاد بیاور. خشمت چقدر بزرگ بود؟",
        replies: [
          "خشم کوچک را می‌شود با حرف زدن گفت: «من ناراحت شدم.»",
          "خشم کوچک را می‌شود با حرف زدن گفت: «من ناراحت شدم.»",
          "وقتی خشم بزرگ‌تر می‌شود، یک لحظه بایست و آرام نفس بکش.",
          "وقتی خشم بزرگ است، اول بایست و آرام نفس بکش. بعد از یک بزرگ‌تر کمک بخواه.",
          "وقتی خشم خیلی بزرگ است، اول بایست و آرام نفس بکش. بعد از یک بزرگ‌تر کمک بخواه."
        ] },
      { type: "sort", practice: true, prompt: "وقتی عصبانی هستیم، کدام کارها کمک می‌کنند؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "💚", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کسی ناراحت می‌شود", value: "no" }],
        items: [
          { pic: "🌷", label: "نفس آرام", say: "آرام نفس کشیدن", basket: "yes" },
          { pic: "🗣️", label: "گفتن", say: "گفتن: من عصبانی‌ام", basket: "yes" },
          { pic: "🚶", label: "کمی دور شدن", say: "کمی دور شدن تا آرام شوم", basket: "yes" },
          { pic: "🧸", label: "بغل کردن عروسک", say: "بغل کردن عروسک یا بالش", basket: "yes" },
          { pic: "👊", label: "زدن", say: "زدن", basket: "no" },
          { pic: "🧱", label: "پرت کردن", say: "پرت کردن چیزها", basket: "no" }
        ] },
      { type: "breathe", cycles: 3 }
    ]
  },
  {
    id: "feel-12", subject: "feel", level: null, emoji: "💌", title: "وقتی دلم تنگ است",
    steps: [
      /* Missing a friend who moved: Arash remembers playing ball with Sam (a thought bubble), cries, Mom puts her arm
         round him and they look at Sam's photo, he draws a picture for Sam, then they talk on the phone. */
      { type: "scene", prompt: "آرش دلش برای دوستش تنگ شده", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          think: { art: "fl-think", at: [76, 40], o: 0 },
          sam2: { art: "fl-sam", at: [22, -7], s: 0.42, under: "think" }, ara2: { art: "fl-arash", at: [8, -7], s: 0.42, under: "think" },
          ball2: { art: "ball-side", at: [15, -9], s: 0.45, under: "think" },
          mom: { art: "fl-mom", at: [-20, 88], s: 1.6 },
          arash: { art: "fl-arash", at: [64, 86], s: 1.4 },
          photo: { art: "fl-photo", at: [64, 72], s: 0.9, o: 0 },
          table: { art: "fl-table", at: [70, 88], s: 1.3, o: 0 },
          paper: { art: "fl-paper", at: [82, 63.5], s: 0.9, o: 0 },
          pencil: { art: "fl-pencil", at: [74, 50], s: 1.2, o: 0 },
          call: { art: "fl-call-sam", at: [128, 76], s: 1.6, o: 0 },
          heart: { art: "fl-heart", at: [104, 22], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "دوست آرش، سام، به یک شهر دیگر رفته. آرش دلش برای او تنگ شده.", key: 4000, do: all(
            [{ id: "think", to: { o: 1 }, at: 300, dur: 600 },
              { id: "ball2", path: "M15 -9Q18 -18 21 -9", at: 1000, dur: 700 }, { id: "ball2", path: "M21 -9Q15 -18 9 -9", at: 1800, dur: 900 },
              { id: "ball2", path: "M9 -9Q12 -18 15 -9", at: 2800, dur: 700 }],
            face("sam2", "joy", 900), face("ara2", "joy", 900), face("arash", "sad", 2800),
            [{ id: "arash.eyeO", to: { x: 0.6, y: -0.6 }, at: 1000, dur: 500 }]) },
          { caption: "آرش غمگین است و گریه‌اش می‌گیرد. گریه کردن اشکالی ندارد.", do: all(
            show("think", 0, 0), [{ id: "arash.eyeO", to: { x: 0, y: 0.6 }, at: 300, dur: 500 },
              { id: "arash.upper", to: { y: 1.2 }, at: 500, dur: 1400 }, { id: "arash.head", to: { y: 0.8 }, at: 500, dur: 1400 },
              { id: "arash.tear", to: { o: 1 }, at: 1600, dur: 300 }, { id: "arash.tear", to: { y: 2.6 }, at: 1700, dur: 1600 }]) },
          { caption: "مامان کنارش می‌آید و بغلش می‌کند. با هم عکس سام را نگاه می‌کنند.", key: 6200, hold: 7600, do: all(
            [{ id: "mom", to: { x: 44 }, dur: 2000 }], walk("mom", 0, 2000), face("mom", "caring", 1800),
            [{ id: "mom.armR", to: { r: -84 }, at: 2200, dur: 900 }, { id: "mom.head", to: { r: 8 }, at: 2400, dur: 600 },
              { id: "arash.tear", to: { o: 0, y: 0 }, at: 2800, dur: 600 }, { id: "arash.upper", to: { y: 0 }, at: 3000, dur: 800 }, { id: "arash.head", to: { y: 0 }, at: 3000, dur: 800 }],
            face("arash", "sorry", 3000), arms("arash", -36, 36, 3800, 600),
            [{ id: "photo", to: { o: 1 }, at: 4200, dur: 500 }, { id: "arash.eyeO", to: { y: 0.9 }, at: 4400, dur: 400 }],
            face("arash", "caring", 5600)) },
          { caption: "بعد آرش برای سام یک نقاشی می‌کشد: خودش و سام، با یک قلب.", key: 6600, hold: 7600, do: all(
            show("photo", 0, 0), arms("arash", 0, 0, 0, 500),
            [{ id: "mom.armR", to: { r: 0 }, at: 0, dur: 600 }, { id: "mom.head", to: { r: 0 }, at: 0, dur: 600 },
              { id: "mom", to: { x: 28 }, at: 400, dur: 1200 }, { id: "arash", to: { x: 56 }, at: 400, dur: 1000 }, { id: "arash.eyeO", to: { x: 0.8, y: 0.6 }, at: 900, dur: 400 }],
            walk("mom", 400, 1200), walk("arash", 400, 1000),
            show("table paper", 1, 1000, 600),
            [{ id: "arash.armR", to: { r: -62 }, at: 1600, dur: 500 }, { id: "pencil", to: { o: 1 }, at: 1800, dur: 300 },
              { id: "pencil", path: "M74 50Q84 44 90 52T80 58", at: 2000, dur: 4400 },
              { id: "paper.pic", draw: true, oneByOne: true, at: 2000, dur: 4400 }],
            face("arash", "happy", 4000), face("mom", "happy", 4000)) },
          { caption: "بعد با سام تلفنی حرف می‌زند. سام هم خوشحال می‌شود. هنوز با هم دوست‌اند.", key: 5600, hold: 7400, do: all(
            show("pencil", 0, 0), arms("arash", 0, 0, 0, 500),
            [{ id: "arash.eyeO", to: { x: -0.8, y: 0 }, at: 400, dur: 400 }, { id: "call", to: { o: 1 }, at: 400, dur: 600 }],
            face("call", "sad", 0, 1), face("call", "joy", 1600), talk("arash", 1400, 2000), talk("call", 3600, 1800),
            face("arash", "joy", 3400),
            [{ id: "heart", to: { o: 1 }, at: 5000, dur: 500 }, { id: "heart", to: { s: 1.6 }, at: 5400, dur: 1600, yoyo: true, times: 2 }]) },
          { caption: "وقتی دلمان تنگ است، بغل، عکس، نقاشی و حرف زدن کمک می‌کند. غمگین شدن تقصیر هیچ‌کس نیست.", hold: 8000, do: all(
            show("heart", 0, 0), show("photo", 1, 600),
            [{ id: "photo", to: { x: 54, y: 63.5, s: 0.75 }, dur: 1 }, { id: "mom", to: { x: 34 }, at: 300, dur: 700 }], walk("mom", 300, 700),
            [{ id: "mom.armR", to: { r: -84 }, at: 1100, dur: 900 }],
            face("mom", "calm", 2000), face("arash", "calm", 2000),
            [{ id: "photo", to: { s: 0.85 }, at: 2400, dur: 900, yoyo: true, times: 2 },
              { id: "paper", to: { s: 0.95 }, at: 3400, dur: 900, yoyo: true, times: 2 },
              { id: "call", to: { s: 1.7 }, at: 4400, dur: 900, yoyo: true, times: 2 }],
            face("mom", "happy", 5600), face("arash", "happy", 5600)) }
        ] },
      { type: "talk", scene: "💌 🖼️ 🤗 📞", caption: "تو دلت برای چه کسی تنگ می‌شود؟ وقتی دلت تنگ است، چه چیزی کمکت می‌کند؟",
        tips: [
          "هر جوابی داد، بپذیرید. دلتنگی می‌تواند برای یک دوست، فامیلی که دور است، خانهٔ قبلی، مدرسه یا حتی یک اسباب‌بازی باشد.",
          "بگویید: «طبیعی است که دلت تنگ شود. یعنی او برایت مهم است.»",
          "اگر گریه کرد، کنارش بمانید. لازم نیست گریه‌اش را زود تمام کنید.",
          "با هم یک کار کوچک پیدا کنید: یک نقاشی، یک تماس، نگاه کردن به عکس، یا یک خاطره خوب.",
          "اگر نخواست حرف بزند، اصرار نکنید. بگویید هر وقت خواست، گوش می‌دهید."
        ] },
      { type: "doit", pic: "🖍️", text: "برای کسی که دلت برایش تنگ شده، یک نقاشی بکش. می‌توانی آن را برایش بفرستی، یا نگهش داری تا ببینی‌اش." },
      { type: "feelings" },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "غمگین شدن و دلتنگی طبیعی است و تقصیر هیچ‌کس نیست. می‌توانی بغل بخواهی یا حرف بزنی.", pic: "💛",
        tips: [
          "دلتنگی را کوچک نشمارید («این که غصه ندارد») و زود حواس کودک را پرت نکنید. اول اسم حسش را بگویید و کنارش بمانید.",
          "کودک‌ها گاهی فکر می‌کنند غم دیگران تقصیر آن‌هاست. روشن بگویید: «تقصیر تو نیست.»",
          "اگر کسی که کودک دلتنگش است دور است، راه‌های در تماس ماندن را با هم پیدا کنید: تماس تصویری، نامه، نقاشی، عکس.",
          "این درس درباره دلتنگی است، نه از دست دادن کسی برای همیشه. اگر کودک کسی را از دست داده، این درس را خودتان کنارش ببینید و به حرف‌ها و سؤال‌هایش ساده و راست جواب بدهید.",
          "اگر غم کودک چند هفته ادامه پیدا کرد، خواب، غذا یا بازی‌اش را به هم ریخت، یا از آسیب زدن به خودش حرف زد، با پزشک، مشاور مدرسه یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-16", subject: "feel", level: null, emoji: "🌤️", title: "بعد از روزهای سخت",
    steps: [
      /* After hard days (no event shown or named): Fandogh is tired; can't sleep; a tummy ache; wants to stay close to
         Mama; gets cross quickly. Many little animals feel like this; it gets better with calm, the day's routine and
         the ones who care: breathing with Mama, a hug, the sun coming out. */
      { type: "scene", prompt: "وقتی روزها سخت بوده‌اند", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" }, bedroom: { art: "fl-bedroom", o: 0 }, yard: { art: "fl-yard", o: 0 },
          sun: { art: "☀️", at: [128, 18], s: 0.2, o: 0 },
          bed: { art: "fl-bed", at: [52, 86], s: 1.3, o: 0 },
          mama: { art: "fl-mama", at: [112, 86], s: 1.75, flip: true, o: 0 },
          puffM: { art: "fl-puff", at: [3, -22], o: 0, under: "mama" },
          rabbit: { art: "fl-rabbit", at: [22, 86], s: 1.3, o: 0 }, cat: { art: "fl-cat", at: [142, 86], s: 1.3, o: 0 },
          sofreh: { art: "fl-sofreh", at: [64, 94], s: 0.8, o: 0 }, ball: { art: "ball-side", at: [96, 86], s: 1.3, o: 0 },
          d1: { art: "🥣", at: [80, 14], s: 0.6, o: 0 }, d2: { art: "⚽", at: [96, 14], s: 0.6, o: 0 }, d3: { art: "🌙", at: [112, 14], s: 0.6, o: 0 },
          fan: { art: "fl-fandogh", at: [68, 86], s: 1.4 },
          swirl: { art: "fl-swirl", at: [0, -11], o: 0, under: "fan" },
          puffF: { art: "fl-puff", at: [3, -22], o: 0, under: "fan" },
          blanket: { art: "fl-blanket", at: [52, 86], s: 1.3, o: 0 },
          hug: { art: "fl-hug", at: [112, 86], s: 1.75, o: 0 },
          heart: { art: "fl-heart", at: [96, 34], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "بعد از روزهای سخت، گاهی بدن و دل ما هم خسته می‌شوند. فندق این روزها خسته است.", do: all(
            face("fan", "sorry", 400),
            [{ id: "fan.upper", to: { y: 1.4, sy: 0.95 }, at: 900, dur: 1600 }, { id: "fan.head", to: { y: 1 }, at: 900, dur: 1600 },
              { id: "fan.tail", to: { r: -12 }, at: 900, dur: 1600 }, { id: "fan.eyeO", to: { y: 0.6 }, at: 900, dur: 600 }]) },
          { caption: "شاید شب‌ها خوابش نبرد.", do: all(
            show("bedroom bed", 1, 0, 800),
            [{ id: "fan.upper", to: { y: 0, sy: 1 }, dur: 600 }, { id: "fan.head", to: { y: 0 }, dur: 600 }, { id: "fan.tail", to: { r: 0 }, dur: 600 },
              { id: "fan.eyeO", to: { y: 0 }, dur: 400 },
              { id: "fan", path: "M68 86Q60 70 52 80", at: 800, dur: 900 }, { id: "blanket", to: { o: 1 }, at: 1600, dur: 400 },
              { id: "fan.eyeO", to: { x: -0.7 }, at: 2200, dur: 1400, yoyo: true, times: 4 },
              { id: "fan", to: { r: 6 }, at: 2400, dur: 2400, yoyo: true, times: 4 }],
            face("fan", "neutral", 1800)) },
          { caption: "شاید دلش درد بگیرد.", do: all(
            show("bedroom bed blanket", 0, 0, 700),
            [{ id: "fan", to: { x: 68, y: 86, r: 0 }, at: 300, dur: 900 }, { id: "fan.eyeO", to: { x: 0 }, at: 300, dur: 300 }],
            face("fan", "worried", 1000), arms("fan", -30, 30, 1300, 600),
            [{ id: "swirl", to: { o: 1 }, at: 1600, dur: 400 }, { id: "swirl", to: { r: 720 }, at: 1600, dur: 3600, ease: "linear" }]) },
          { caption: "شاید بخواهد همیشه نزدیک مامانش باشد.", key: 3600, do: all(
            show("swirl", 0, 0), arms("fan", 0, 0, 0, 500), show("mama", 1, 300, 600),
            [{ id: "fan", to: { x: 88 }, at: 900, dur: 1400 }, { id: "fan.armR", to: { r: -60 }, at: 2400, dur: 500 }],
            face("fan", "sorry", 2400), face("mama", "caring", 2600), [{ id: "mama.head", to: { r: -6 }, at: 2600, dur: 500 }]) },
          { caption: "شاید زودتر از همیشه عصبانی شود.", do: all(
            [{ id: "fan.armR", to: { r: 0 }, dur: 400 }, { id: "fan", to: { x: 74 }, at: 300, dur: 900 }], face("fan", "angry", 1200),
            [{ id: "fan.flush", to: { o: 1 }, at: 1300, dur: 600 }, { id: "fan", to: { y: "-1.5" }, at: 1900, dur: 500, yoyo: true, times: 2 },
              { id: "fan.tail", to: { r: 14 }, at: 1900, dur: 500, yoyo: true, times: 2 }]) },
          { caption: "خیلی از بچه‌ها بعد از روزهای سخت همین‌طور می‌شوند. این طبیعی است و کم‌کم بهتر می‌شود.", key: 3400, do: all(
            [{ id: "fan.flush", to: { o: 0 }, dur: 800 }], face("fan", "neutral", 300), show("rabbit cat", 1, 600, 700),
            face("rabbit", "sorry", 600, 1), face("cat", "sorry", 600, 1),
            [{ id: "rabbit.head", to: { r: 8 }, at: 1600, dur: 500, yoyo: true, times: 2 }, { id: "cat.head", to: { r: -8 }, at: 1900, dur: 500, yoyo: true, times: 2 }],
            face("rabbit", "happy", 2600), face("cat", "happy", 2800), face("fan", "happy", 3000)) },
          { caption: "چیزهایی که کمک می‌کنند: نفس آرام با مامان، و بغل کسانی که دوستمان دارند.", key: 8200, hold: 10400, do: all(
            show("rabbit cat", 0, 0),
            [{ id: "fan", to: { x: 86 }, at: 300, dur: 900 }],
            face("fan", "breatheIn", 1400), face("mama", "breatheIn", 1400), breathe("fan", 1400, 1800, 2200), breathe("mama", 1400, 1800, 2200),
            face("fan", "breatheOut", 3200), face("mama", "breatheOut", 3200),
            [{ id: "puffF", to: { o: 1 }, at: 3300, dur: 300 }, { id: "puffF", to: { x: 14 }, at: 3300, dur: 1800 }, { id: "puffF", to: { o: 0, x: 3 }, at: 5100, dur: 300 },
              { id: "puffM", to: { o: 1 }, at: 3300, dur: 300 }, { id: "puffM", to: { x: 9 }, at: 3300, dur: 1800 }, { id: "puffM", to: { o: 0, x: 3 }, at: 5100, dur: 300 }],
            [{ id: "fan", to: { x: 106, y: 88 }, at: 5800, dur: 700 }, { id: "mama.armL", to: { o: 0 }, at: 6400, dur: 300 }, { id: "mama.armR", to: { o: 0 }, at: 6400, dur: 300 },
              { id: "hug", to: { o: 1 }, at: 6400, dur: 400 }, { id: "heart", to: { x: 110 }, dur: 1 }, { id: "heart", to: { o: 1 }, at: 7000, dur: 400 },
              { id: "heart", to: { s: 1.5 }, at: 7400, dur: 1600, yoyo: true, times: 2 },
              { id: "yard", to: { o: 1 }, at: 6000, dur: 1600 }, { id: "sun", to: { o: 1 }, at: 6800, dur: 600 }, { id: "sun", to: { s: 0.8 }, at: 6800, dur: 2000, ease: "back" }],
            face("fan", "calm", 6600), face("mama", "happy", 6600)) },
          { caption: "کارهای هر روز هم کمک می‌کنند: صبحانه، بازی و خواب، هر روز سر وقت خودش. فندق کم‌کم آرام‌تر می‌شود.", hold: 9600, do: all(
            show("hug heart", 0, 0, 400), show("mama.armL mama.armR", 1, 0, 400),
            [{ id: "fan", to: { x: 64, y: 86 }, at: 400, dur: 1000 }], show("sofreh d1", 1, 900, 600), talk("fan", 1600, 1600), face("fan", "happy", 1400),
            show("sofreh", 0, 3400, 500), show("ball d2", 1, 3600, 500),
            [{ id: "ball", path: "M96 86Q84 64 72 86", at: 4200, dur: 800 }, { id: "fan.armR", to: { r: -50 }, at: 4900, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M72 86Q84 64 96 86", at: 5200, dur: 800 }],
            face("fan", "joy", 4200), show("ball mama", 0, 6200, 500), show("bedroom bed d3", 1, 6400, 800), show("yard sun", 0, 6400, 800),
            [{ id: "fan", path: "M64 86Q58 70 52 80", at: 7000, dur: 900 }, { id: "blanket", to: { o: 1 }, at: 7800, dur: 400 }],
            face("fan", "calm", 8000)) }
        ] },
      { type: "talk", scene: "🐿️ 🌙 💛 🌤️", caption: "وقتی خسته یا ناآرامی، چه چیزی حالت را بهتر می‌کند؟ دوست داری چه کسی کنارت باشد؟",
        tips: [
          "دربارهٔ اتفاق‌ها سؤال نپرسید و کودک را به تعریف کردن وادار نکنید. این گفت‌وگو دربارهٔ چیزهایی است که کمک می‌کنند.",
          "اگر خودش چیزی تعریف کرد، آرام گوش کنید و بگویید: «ممنون که به من گفتی. حالا اینجا با هم هستیم.»",
          "کمک‌ها را با هم بشمارید: نفس گل و شمع، بغل، یک عروسک، قصهٔ شب، بازی، کارهای همیشگی هر روز.",
          "بگویید: «خیلی از بچه‌ها و بزرگ‌ترها بعد از روزهای سخت این‌طور می‌شوند. کم‌کم بهتر می‌شود و من کنارت هستم.»"
        ] },
      { type: "breathe", cycles: 3 },
      { type: "feelings" },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "هر وقت حالت خوب نبود، می‌توانی نفس آرام بکشی و به کسی که دوستش داری بگویی.", pic: "🌤️",
        tips: [
          "بعد از روزهای سخت، این واکنش‌ها در کودکان رایج است: بد خوابیدن یا کابوس، دل‌درد و سردرد، چسبیدن به شما، زودرنجی و عصبانیت، خیس کردن دوباره یا رفتارهای کودکانه‌تر. بیشترشان با آرامش، روال روزانه و نزدیکی شما کم‌کم کم می‌شوند.",
          "روال ثابت خواب، غذا، بازی و درس به کودک احساس امنیت می‌دهد. وقتی ممکن است، به او بگویید بعد چه اتفاقی می‌افتد.",
          "کودک را مجبور نکنید از اتفاق‌ها تعریف کند. اگر خواست بگوید، گوش کنید، حرفش را باور کنید و بگویید تقصیر او نیست.",
          "خبرها و تصویرهای ترسناک را دور از چشم و گوش کودک نگه دارید.",
          "از خودتان هم مراقبت کنید. کودک آرامش را از شما یاد می‌گیرد، و شما هم حق دارید کمک بگیرید.",
          "اگر این نشانه‌ها چند هفته ادامه پیدا کرد یا شدیدتر شد، یا کودک بازی و خوردن را کنار گذاشت، یا از آسیب زدن به خودش حرف زد، با پزشک، مشاور مدرسه یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-8", subject: "feel", level: null, emoji: "🤝", title: "دوستی و مهربانی",
    steps: [
      /* Friendship: inviting someone to play, sharing an apple (it splits in two), stepping on a chalk drawing by
         accident, saying sorry, and drawing it again together (the child helps: wait). */
      { type: "scene", prompt: "آیدین و شیرین در حیاط", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" },
          chalk: { art: "fl-chalk", at: [42, 84], s: 1.1 },
          ball: { art: "ball-side", at: [62, 86], s: 1.3 },
          aydin: { art: "fl-aydin", at: [46, 86], s: 1.3 },
          shirin: { art: "fl-shirin", at: [138, 88], s: 1.2 },
          appleL: { art: "fl-apple-l", at: [112, 66], s: 1.1, o: 0 }, appleR: { art: "fl-apple-r", at: [112, 66], s: 1.1, o: 0 },
          stick: { art: "fl-chalkstick", at: [131, 72], s: 1.2, o: 0 },
          heart: { art: "fl-heart", at: [80, 26], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "آیدین در حیاط توپ‌بازی می‌کند. شیرین تنها نشسته و نگاه می‌کند.", key: 1100, do: all(
            [{ id: "shirin.legL", to: { sy: 0.5 }, dur: 1 }, { id: "shirin.legR", to: { sy: 0.5 }, dur: 1 }],
            face("shirin", "sorry", 0),
            [{ id: "aydin.legR", to: { y: -3 }, at: 400, dur: 400, yoyo: true, times: 2 },
              { id: "ball", path: "M62 86Q80 52 98 86", at: 600, dur: 1000 }, { id: "ball", to: { r: 360 }, at: 600, dur: 1000 },
              { id: "shirin.eyeO", to: { x: -0.8 }, at: 600, dur: 1000 },
              { id: "aydin", to: { x: 82 }, at: 1600, dur: 900 }],
            walk("aydin", 1600, 900),
            [{ id: "aydin.legL", to: { y: -3 }, at: 2600, dur: 400, yoyo: true, times: 2 },
              { id: "ball", path: "M98 86Q80 56 62 86", at: 2800, dur: 1000 }, { id: "ball", to: { r: 0 }, at: 2800, dur: 1000 },
              { id: "shirin.eyeO", to: { x: -0.4 }, at: 2800, dur: 1000 }]) },
          { caption: "آیدین می‌گوید: «سلام! بیا با هم بازی کنیم.»", do: all(
            [{ id: "aydin", to: { x: 110 }, dur: 1600 }], walk("aydin", 0, 1600),
            face("aydin", "joy", 1500), [{ id: "aydin.armR", to: { r: -150 }, at: 1700, dur: 400 }, { id: "aydin.armR", to: { r: -120 }, at: 2100, dur: 1200, yoyo: true, times: 4 }],
            talk("aydin", 2100, 2000), arms("aydin", 0, 0, 4200, 400),
            [{ id: "shirin.eyeO", to: { x: 0 }, at: 1500, dur: 400 }], face("shirin", "joy", 4000),
            [{ id: "shirin", to: { y: 86 }, at: 4500, dur: 500 }, { id: "shirin.legL", to: { sy: 1 }, at: 4500, dur: 500 }, { id: "shirin.legR", to: { sy: 1 }, at: 4500, dur: 500 }]) },
          { caption: "بعد از بازی، آیدین سیبش را نصف می‌کند: «بفرما، نصفش مال تو.» شیرین می‌گوید: «ممنون!»", key: 6600, hold: 8000, do: all(
            [{ id: "ball", path: "M62 86Q94 50 126 86", at: 200, dur: 900 }, { id: "ball", path: "M126 86Q118 70 104 86", at: 1200, dur: 600 },
              { id: "ball", path: "M104 86Q86 70 70 86", at: 1900, dur: 700 },
              { id: "appleL", to: { o: 1 }, at: 2700, dur: 300 }, { id: "appleR", to: { o: 1 }, at: 2700, dur: 300 },
              { id: "appleL", to: { x: 109, r: -15 }, at: 3300, dur: 500 }, { id: "appleR", to: { x: 115, r: 15 }, at: 3300, dur: 500 },
              { id: "appleL.cut", to: { o: 1 }, at: 3300, dur: 300 }, { id: "appleR.cut", to: { o: 1 }, at: 3300, dur: 300 }],
            talk("aydin", 3700, 2000),
            [{ id: "appleR", path: "M115 66Q124 58 130 70", at: 4600, dur: 900 }, { id: "appleL", to: { x: 118, y: 70, r: 0 }, at: 4600, dur: 900 }],
            talk("shirin", 5800, 1200)) },
          { caption: "آیدین بی‌حواس پایش را روی نقاشی گچی شیرین گذاشت. نقاشی خراب شد.", do: all(
            [{ id: "appleL", to: { o: 0 }, dur: 400 }, { id: "appleR", to: { o: 0 }, dur: 400 },
              { id: "ball", path: "M70 86L8 86", at: 500, dur: 2400 }, { id: "ball", to: { r: -900 }, at: 500, dur: 2400 },
              { id: "aydin.eyeO", to: { x: -0.9 }, at: 600, dur: 300 }, { id: "aydin", to: { x: 42 }, at: 800, dur: 2400 }],
            walk("aydin", 800, 2400),
            [{ id: "chalk.smudge", to: { o: 1 }, at: 2800, dur: 500 }, { id: "chalk.lines", to: { o: 0.35 }, at: 2800, dur: 500 },
              { id: "aydin.eyeO", to: { x: 0, y: 0.8 }, at: 3300, dur: 300 }],
            face("aydin", "oops", 3600), face("shirin", "sad", 3800)) },
          { caption: "آیدین گفت: «ببخشید، حواسم نبود. بیا با هم دوباره بکشیم.»", do: all(
            [{ id: "aydin.eyeO", to: { y: 0 }, dur: 300 }, { id: "aydin", to: { x: 16 }, at: 200, dur: 1100 }],
            walk("aydin", 200, 1100), [{ id: "shirin", to: { x: 74 }, at: 400, dur: 2000 }], walk("shirin", 400, 2000),
            face("aydin", "sorry", 1200), talk("aydin", 2700, 2600), face("shirin", "happy", 4800), face("aydin", "happy", 5300)),
            wait: { rub: true, n: 6, hint: "حالا نوبت توست: با انگشت یا ماوس روی نقاشی چپ و راست بکش تا با هم دوباره بکشندش!",
              each: [{ id: "chalk.smudge", to: { o: "-0.17" }, dur: 300 }, { id: "chalk.lines", to: { o: "+0.11" }, dur: 300 },
                { id: "aydin.armR", to: { r: -40 }, dur: 300, yoyo: true, times: 2 }, { id: "shirin.armL", to: { r: 40 }, dur: 300, yoyo: true, times: 2 }] } },
          { caption: "دوست خوب با هم بازی می‌کند، چیزهایش را تقسیم می‌کند و وقتی اشتباه کرد، می‌گوید ببخشید.", hold: 7600, do: all(
            [{ id: "chalk.smudge", to: { o: 0 }, dur: 600 }, { id: "chalk.lines", to: { o: 1 }, dur: 600 }],
            face("aydin", "joy", 400), face("shirin", "joy", 400),
            [{ id: "stick", to: { x: 66, y: 72 }, dur: 1 }, { id: "stick", to: { o: 1 }, at: 800, dur: 300 },
              { id: "stick", path: "M66 72Q46 56 27 72", at: 1300, dur: 1000 },
              { id: "ball", path: "M8 86Q16 78 26 86", at: 2800, dur: 600 }, { id: "ball", path: "M26 86Q46 52 66 86", at: 3500, dur: 1000 },
              { id: "ball", path: "M66 86Q46 52 26 86", at: 4600, dur: 1000 },
              { id: "heart", to: { o: 1 }, at: 5400, dur: 400 }, { id: "heart", to: { s: 1.6 }, at: 5800, dur: 1600, yoyo: true, times: 2 }]) }
        ] },
      { type: "pairs", practice: true, prompt: "هر کار را با حرف مهربانش جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "👋", say: "دوستت را می‌بینی" }, { label: "سلام", say: "سلام" }],
          [{ pic: "🎁", say: "کسی به تو چیزی می‌دهد" }, { label: "ممنون", say: "ممنون" }],
          [{ pic: "🍎", say: "می‌خواهی چیزی را تقسیم کنی" }, { label: "بفرما", say: "بفرما" }],
          [{ pic: "💥", say: "بی‌حواس چیزی را خراب کردی" }, { label: "ببخشید", say: "ببخشید" }]
        ] },
      { type: "talk", scene: "👦 👧 ⚽ 🍎 💛", caption: "تو امروز چطور می‌توانی با کسی مهربان باشی؟ دوستت چه کاری برایت کرده که خوشحالت کرده؟",
        tips: [
          "کارهای مهربان کوچکش را ببینید و اسمشان را بگویید: «دیدم اسباب‌بازی‌ات را به برادرت دادی. مهربان بودی.»",
          "«ببخشید» گفتن را به زور نخواهید. کمکش کنید ببیند دیگری چه حسی دارد، بعد با هم راهی برای جبران پیدا کنید.",
          "خودتان هم وقتی اشتباه کردید، به کودک بگویید «ببخشید». کودک از شما یاد می‌گیرد."
        ] }
    ]
  },
  {
    id: "feel-9", subject: "feel", level: null, emoji: "🧩", title: "وقتی دعوا می‌شود",
    steps: [
      /* A quarrel over the swing, then the four steps (shown above them as they happen): stop, breathe, say how you
         feel, find a way. Then Mina swings, counting the swings, and both are happy. */
      { type: "scene", prompt: "یک تاب و دو نفر", bg: "#cfe8f5",
        parts: {
          park: { art: "fl-park" },
          swing: { art: "fl-swing", at: [80, 42] }, seat: { art: "fl-seat", at: [80, 42] },
          minaS: { art: "fl-mina", at: [0, 42.2], s: 1.25, o: 0, under: "seat" },
          mina: { art: "fl-mina", at: [30, 86], s: 1.25 }, sam: { art: "fl-sam", at: [130, 86], s: 1.25, flip: true },
          loudM: { art: "fl-loud", at: [8, -29], o: 0, under: "mina" }, loudS: { art: "fl-loud", at: [8, -29], o: 0, under: "sam" },
          puffM: { art: "fl-puff", at: [3, -29], o: 0, under: "mina" }, puffS: { art: "fl-puff", at: [3, -29], o: 0, under: "sam" },
          i1: { art: "✋", at: [50, 16], s: 0.7, o: 0 }, i2: { art: "🌷", at: [70, 16], s: 0.7, o: 0 },
          i3: { art: "🗣️", at: [90, 16], s: 0.7, o: 0 }, i4: { art: "🔄", at: [110, 16], s: 0.7, o: 0 },
          counter: { art: "counter", at: [130, 34], o: 0 }
        },
        scenes: [
          { caption: "مینا و سام در پارک‌اند. هر دو می‌خواهند اول سوار تاب شوند.", do: all(
            [{ id: "mina", to: { x: 62 }, dur: 1800 }, { id: "sam", to: { x: 98 }, dur: 1800 }], walk("mina", 0, 1800), walk("sam", 0, 1800),
            face("mina", "joy", 0), face("sam", "joy", 0),
            [{ id: "mina.armR", to: { r: -55 }, at: 1900, dur: 500 }, { id: "sam.armR", to: { r: -55 }, at: 2000, dur: 500 }],
            face("mina", "neutral", 2400), face("sam", "neutral", 2500),
            [{ id: "mina.eyeO", to: { x: 0.8 }, at: 2600, dur: 300 }, { id: "sam.eyeO", to: { x: 0.8 }, at: 2700, dur: 300 }]) },
          { caption: "هر دو عصبانی می‌شوند و صدایشان بلند می‌شود.", key: 2300, do: all(
            face("mina", "angry", 200), face("sam", "angry", 200), arms("mina", 0, 0, 200, 400), arms("sam", 0, 0, 200, 400),
            [{ id: "mina.flush", to: { o: 1 }, at: 400, dur: 1000 }, { id: "sam.flush", to: { o: 1 }, at: 400, dur: 1000 },
              { id: "loudM", to: { o: 1 }, at: 900, dur: 200 }, { id: "loudM", to: { s: 1.3 }, at: 900, dur: 1400, yoyo: true, times: 4 }, { id: "loudM", to: { o: 0 }, at: 2300, dur: 200 },
              { id: "loudS", to: { o: 1 }, at: 2100, dur: 200 }, { id: "loudS", to: { s: 1.3 }, at: 2100, dur: 1400, yoyo: true, times: 4 }, { id: "loudS", to: { o: 0 }, at: 3500, dur: 200 },
              { id: "loudM", to: { o: 1 }, at: 3600, dur: 200 }, { id: "loudS", to: { o: 1 }, at: 3600, dur: 200 }],
            talk("mina", 900, 1400), talk("sam", 2100, 1400), talk("mina", 3600, 1200), talk("sam", 3600, 1200)) },
          { caption: "اول: می‌ایستیم.", do: all(
            [{ id: "loudM", to: { o: 0 }, dur: 300 }, { id: "loudS", to: { o: 0 }, dur: 300 },
              { id: "i1", to: { o: 1 }, at: 300, dur: 300 }, { id: "i1", to: { s: 0.95 }, at: 600, dur: 800, yoyo: true, times: 2 },
              { id: "mina", to: { x: 44 }, at: 900, dur: 700 }, { id: "sam", to: { x: 116 }, at: 900, dur: 700 }],
            face("mina", "sorry", 1000), face("sam", "sorry", 1000)) },
          { caption: "دوم: آرام نفس می‌کشیم.", hold: 8600, do: all(
            [{ id: "i2", to: { o: 1 }, dur: 300 }, { id: "i2", to: { s: 0.95 }, at: 300, dur: 800, yoyo: true, times: 2 }],
            face("mina", "breatheIn", 500), face("sam", "breatheIn", 500), breathe("mina", 600, 1800, 2200), breathe("sam", 600, 1800, 2200),
            face("mina", "breatheOut", 2400), face("sam", "breatheOut", 2400),
            [{ id: "puffM", to: { o: 1 }, at: 2500, dur: 300 }, { id: "puffM", to: { x: 9 }, at: 2500, dur: 1800 }, { id: "puffM", to: { o: 0, x: 3 }, at: 4300, dur: 300 },
              { id: "puffS", to: { o: 1 }, at: 2500, dur: 300 }, { id: "puffS", to: { x: 9 }, at: 2500, dur: 1800 }, { id: "puffS", to: { o: 0, x: 3 }, at: 4300, dur: 300 }],
            face("mina", "breatheIn", 4600), face("sam", "breatheIn", 4600), breathe("mina", 4700, 1600, 2000), breathe("sam", 4700, 1600, 2000),
            face("mina", "breatheOut", 6300), face("sam", "breatheOut", 6300),
            [{ id: "mina.flush", to: { o: 0 }, at: 2400, dur: 5000 }, { id: "sam.flush", to: { o: 0 }, at: 2400, dur: 5000 }],
            face("mina", "calm", 8000), face("sam", "calm", 8000)) },
          { caption: "سوم: می‌گوییم چه حسی داریم. مینا: «من هم خیلی تاب دوست دارم.»", do: all(
            [{ id: "i3", to: { o: 1 }, dur: 300 }, { id: "i3", to: { s: 0.95 }, at: 300, dur: 800, yoyo: true, times: 2 }],
            face("mina", "caring", 400), face("sam", "neutral", 400), talk("mina", 700, 2600),
            [{ id: "sam.head", to: { r: 8 }, at: 800, dur: 600 }], face("sam", "happy", 3300)) },
          { caption: "چهارم: با هم راهی پیدا می‌کنیم. سام: «نوبتی! تو ده تا تاب بخور، بعد من.»", do: all(
            [{ id: "sam.head", to: { r: 0 }, dur: 400 }, { id: "i4", to: { o: 1 }, dur: 300 }, { id: "i4", to: { r: 360 }, at: 300, dur: 1600 }],
            face("sam", "joy", 500), talk("sam", 800, 3000),
            [{ id: "sam.armR", to: { r: -60 }, at: 1600, dur: 500 }, { id: "sam.armR", to: { r: 0 }, at: 3800, dur: 500 }],
            face("mina", "joy", 3600)) },
          { caption: "حالا هر دو خوشحال‌اند.", key: 3000, hold: 10400, do: all(
            [{ id: "mina", to: { o: 0 }, dur: 400 }, { id: "sam", to: { x: 124 }, dur: 600 }, { id: "minaS.legL", to: { sy: 0.5 }, dur: 1 }, { id: "minaS.legR", to: { sy: 0.5 }, dur: 1 },
              { id: "minaS", to: { o: 1 }, dur: 400 }],
            face("minaS", "joy", 0, 1), face("sam", "joy", 0),
            [{ id: "seat", to: { r: 20 }, at: 600, dur: 450, ease: "out" }, { id: "seat", to: { r: -20 }, at: 1050, dur: 8000, yoyo: true, times: 20, ease: "soft" },
              { id: "seat", to: { r: 0 }, at: 9050, dur: 600 },
              { id: "counter", to: { o: 1 }, at: 900, dur: 300 }, { count: "counter", from: 1, to: 10, at: 1050, dur: 8000 },
              { id: "sam.armL", to: { r: -30 }, at: 1200, dur: 1600, yoyo: true, times: 4 }]) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "کارهای وقت دعوا را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "✋", label: "بایست", say: "بایست" },
          { pic: "🌷", label: "نفس بکش", say: "نفس بکش" },
          { pic: "🗣️", label: "حست را بگو", say: "حست را بگو" },
          { pic: "🔄", label: "راهی پیدا کن", say: "راهی پیدا کن" }
        ] },
      { type: "talk", scene: "✋ 🌷 🗣️ 🔄", caption: "تو کی با کسی دعوایت شده؟ آن وقت چه کار کردی؟ دفعه بعد چه کار می‌کنی؟",
        tips: [
          "وقتی بچه‌ها دعوا می‌کنند، اول کمکشان کنید آرام شوند، بعد درباره راه‌حل حرف بزنید.",
          "از هر دو بپرسید چه حسی دارند و چه می‌خواهند. قاضی نباشید؛ کمکشان کنید خودشان راه پیدا کنند.",
          "راه‌های ساده را با هم تمرین کنید: نوبتی، با هم، یا یک بازی دیگر."
        ] }
    ]
  },
  {
    id: "feel-10", subject: "feel", level: null, emoji: "🌙", title: "خواب آرام",
    steps: [
      { type: "order", practice: true, numbered: true, prompt: "کارهای پیش از خواب را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "🍲", label: "شام", say: "شام" },
          { pic: "🪥", label: "مسواک", say: "مسواک" },
          { pic: "👕", label: "لباس خواب", say: "لباس خواب" },
          { pic: "📖", label: "قصه", say: "قصه" },
          { pic: "😴", label: "خواب", say: "خواب" }
        ] },
      { type: "relax", prompt: "در رختخواب، بدنمان را آرام می‌کنیم: هر جا را اول سفت می‌کنیم، بعد ول می‌کنیم.",
        parts: [
          { pic: "🍋", tense: "دست‌هایت را مشت کن، محکم، مثل اینکه یک لیمو را می‌فشاری.", release: "حالا ول کن. دست‌هایت شل و آرام شدند." },
          { pic: "🐢", tense: "مثل لاک‌پشت، شانه‌هایت را بالا ببر تا نزدیک گوش‌هایت.", release: "حالا شانه‌هایت را پایین بیاور. آرام شدند." },
          { pic: "🐭", tense: "صورتت را جمع کن، مثل موشی که بینی‌اش را چین می‌دهد.", release: "حالا صورتت را ول کن. نرم و آرام شد." },
          { pic: "🐾", tense: "انگشت‌های پایت را جمع کن و پاهایت را صاف و محکم کن.", release: "حالا ول کن. پاهایت سنگین و آرام شدند." }
        ] },
      { type: "breathe", cycles: 3 }
    ]
  },
  {
    id: "feel-11", subject: "feel", level: null, emoji: "🌟", title: "سه چیز خوب امروز",
    steps: [
      /* Three good things: at the sofreh at night, Shirin remembers her day; each good thing appears in a bubble
         and is acted out (Grandma laughing on the phone, a ball game, warm bread), and her heart feels warm. */
      { type: "scene", prompt: "سه چیز خوب شیرین", bg: "#efd9b8",
        parts: {
          room: { art: "fl-room-night" },
          mom: { art: "fl-mom", at: [36, 98], s: 1.35 }, dad: { art: "fl-dad", at: [124, 98], s: 1.4 },
          shirin: { art: "fl-shirin", at: [80, 97], s: 1.25 },
          warm: { art: "fl-heart", at: [0, -19], s: 0.6, o: 0, under: "shirin" },
          sofreh: { art: "fl-sofreh", at: [80, 92] },
          b1: { art: "fl-think", at: [10, 40], o: 0 },
          call: { art: "fl-call", at: [10, -6], s: 0.72, under: "b1" }, haha: { art: "fl-haha", at: [22, -20], s: 0.9, under: "b1" },
          b2: { art: "fl-think", at: [62, 32], o: 0 },
          ayd2: { art: "fl-aydin", at: [7, -6], s: 0.42, under: "b2" }, shi2: { art: "fl-shirin", at: [25, -6], s: 0.42, under: "b2" },
          ball2: { art: "ball-side", at: [10, -6], s: 0.45, under: "b2" },
          b3: { art: "fl-think", at: [112, 40], o: 0 },
          bread: { art: "fl-bread", at: [16, -12], s: 0.95, under: "b3" }, steam: { art: "fl-steam", at: [14, -18], under: "b3" },
          n1: { art: "counter", at: [8, 14], s: 0.7, o: 0 }, n2: { art: "counter", at: [58, 8], s: 0.7, o: 0 }, n3: { art: "counter", at: [110, 14], s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "شب، سر سفره شام، شیرین سه چیز خوب امروزش را می‌گوید.", key: 1300, do: all(
            talk("shirin", 400, 2800),
            [{ id: "mom.head", to: { r: 6 }, at: 600, dur: 600 }, { id: "dad.head", to: { r: -6 }, at: 600, dur: 600 }]) },
          { caption: "یک: مادربزرگ تلفن زد و با هم خندیدیم.", key: 2600, do: all(
            [{ id: "n1", to: { o: 1 }, dur: 300 }, { count: "n1", from: 1, to: 1, dur: 1 },
              { id: "b1", to: { o: 1, s: 0.6 }, at: 200, dur: 1 }, { id: "b1", to: { s: 1 }, at: 200, dur: 600, ease: "back" }],
            face("call", "joy", 900), face("shirin", "joy", 900), face("mom", "joy", 1400),
            [{ id: "haha", to: { s: 1.2 }, at: 1000, dur: 2400, yoyo: true, times: 6 },
              { id: "call", to: { r: 4 }, at: 1000, dur: 2400, yoyo: true, times: 6 },
              { id: "shirin.upper", to: { y: -1.2 }, at: 1000, dur: 2400, yoyo: true, times: 8 }]) },
          { caption: "دو: با آیدین توپ‌بازی کردم.", key: 2000, do: all(
            [{ id: "n2", to: { o: 1 }, dur: 300 }, { count: "n2", from: 2, to: 2, dur: 1 },
              { id: "b2", to: { o: 1, s: 0.6 }, at: 200, dur: 1 }, { id: "b2", to: { s: 1 }, at: 200, dur: 600, ease: "back" }],
            face("ayd2", "joy", 600), face("shi2", "joy", 600), face("shirin", "happy", 600), face("mom", "happy", 600),
            [{ id: "ball2", path: "M10 -6Q16 -22 22 -6", at: 900, dur: 800 }, { id: "ball2", path: "M22 -6Q16 -22 10 -6", at: 1800, dur: 800 },
              { id: "ball2", path: "M10 -6Q16 -22 22 -6", at: 2700, dur: 800 }, { id: "ball2", path: "M22 -6Q16 -22 10 -6", at: 3600, dur: 800 },
              { id: "ayd2.armR", to: { r: -60 }, at: 900, dur: 3600, yoyo: true, times: 4 }, { id: "shi2.armL", to: { r: 60 }, at: 900, dur: 3600, yoyo: true, times: 4 }]) },
          { caption: "سه: نان تازه و گرم خوردم.", key: 3000, do: all(
            [{ id: "n3", to: { o: 1 }, dur: 300 }, { count: "n3", from: 3, to: 3, dur: 1 },
              { id: "b3", to: { o: 1, s: 0.6 }, at: 200, dur: 1 }, { id: "b3", to: { s: 1 }, at: 200, dur: 600, ease: "back" },
              { id: "steam.rise", to: { y: -3, o: 0.2 }, at: 800, dur: 3600, yoyo: true, times: 4 },
              { id: "bread.bite", to: { o: 1 }, at: 2200, dur: 200 }],
            face("shirin", "calm", 2400), face("dad", "joy", 2600)) },
          { caption: "چیزهای خوب گاهی خیلی کوچک‌اند. وقتی به یادشان می‌آوریم، دلمان گرم می‌شود.", hold: 7600, do: all(
            [{ id: "b1", to: { s: 0.8 }, at: 300, dur: 800 }, { id: "b2", to: { s: 0.8 }, at: 300, dur: 800 }, { id: "b3", to: { s: 0.8 }, at: 300, dur: 800 }],
            arms("shirin", -42, 42, 1400, 700),
            [{ id: "warm", to: { o: 1 }, at: 2000, dur: 600 }, { id: "warm", to: { s: 0.9 }, at: 2600, dur: 3000, yoyo: true, times: 4 },
              { emit: "spark", where: [80, 70], spread: [18, 8], rise: -10, n: 8, at: 2600, dur: 2400, life: 1600 }],
            face("shirin", "calm", 2000), face("mom", "calm", 2600), face("dad", "calm", 2600),
            face("shirin", "happy", 5600), face("mom", "happy", 5600), face("dad", "happy", 5600)) }
        ] },
      { type: "talk", scene: "🌟 🌟 🌟", caption: "سه چیز خوب امروزت چه بود؟ چیزی که دیدی، کاری که کردی، یا کسی که با تو مهربان بود.",
        tips: [
          "اگر کودک چیزی پیدا نکرد، کمکش کنید: «یادت هست امروز با هم چای خوردیم؟»",
          "چیزهای کوچک هم حساب‌اند: یک غذای خوشمزه، یک بازی، یک آسمان آبی.",
          "شما هم سه چیز خوب روزتان را بگویید."
        ] },
      { type: "doit", pic: "🍲", text: "امشب سر سفره شام، از همه بخواه سه چیز خوب امروزشان را بگویند. اول خودت بگو!" }
    ]
  },

  // ---------------- Seed (دانه): always with a grown-up beside the child; every step is said aloud ----------------
  {
    id: "feel-seed-1", subject: "feel", level: "seed", emoji: "🐰", title: "امروز حالم چطور است؟",
    steps: [
      /* A day with a little rabbit: breakfast (happy), the ball rolls away (sad), Mama finds it with her (happy
         again), bedtime (calm); then the four faces of the day, one after another. */
      { type: "scene", prompt: "یک روز خرگوش کوچولو", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" }, room: { art: "fl-room", o: 0 }, bedroom: { art: "fl-bedroom", o: 0 },
          sun: { art: "☀️", at: [128, 16], s: 0.6 },
          bed: { art: "fl-bed", at: [60, 86], s: 1.3, o: 0 },
          mama: { art: "fl-rabbit-mama", at: [-20, 86], s: 1.75 },
          bun: { art: "fl-rabbit", at: [80, 86], s: 1.5 },
          blanket: { art: "fl-blanket", at: [60, 86], s: 1.3, o: 0 },
          sofreh: { art: "fl-sofreh", at: [80, 91], s: 0.9 }, bread: { art: "fl-bread", at: [80, 85], s: 0.45 },
          ball: { art: "ball-side", at: [100, 86], s: 1.4, o: 0 },
          e1: { art: "😊", at: [116, 16], s: 0.55, o: 0 }, e2: { art: "😢", at: [92, 16], s: 0.55, o: 0 },
          e3: { art: "😊", at: [68, 16], s: 0.55, o: 0 }, e4: { art: "😌", at: [44, 16], s: 0.55, o: 0 }
        },
        scenes: [
          { caption: "صبح است. خرگوش کوچولو سر سفره صبحانه است. خوشحال است.", do: all(
            talk("bun", 600, 1800), [{ id: "bread.bite", to: { o: 1 }, at: 1600, dur: 200 }],
            face("bun", "joy", 2600), [{ id: "bun.ears", to: { r: 6 }, at: 2800, dur: 800, yoyo: true, times: 2 }]) },
          { caption: "بعد با توپش بازی کرد. توپ قل خورد و رفت. خرگوش غمگین شد.", key: 5200, do: all(
            show("sofreh bread", 0, 0, 600), face("bun", "happy", 0),
            [{ id: "ball", to: { o: 1 }, at: 600, dur: 300 },
              { id: "ball", path: "M100 86Q110 66 120 86", at: 900, dur: 800 }, { id: "ball", path: "M120 86Q110 66 100 86", at: 1800, dur: 800 },
              { id: "bun.armR", to: { r: -50 }, at: 2500, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M100 86L154 86", at: 2700, dur: 1600, ease: "out" }, { id: "ball", to: { r: 540 }, at: 2700, dur: 1600, ease: "out" },
              { id: "bun.eyeO", to: { x: 0.9 }, at: 2800, dur: 600 }],
            face("bun", "sad", 4300), [{ id: "bun.ears", to: { r: 18 }, at: 4400, dur: 800 }, { id: "bun.tear", to: { o: 1 }, at: 4800, dur: 300 }, { id: "bun.tear", to: { y: 2.4 }, at: 4900, dur: 1200 }]) },
          { caption: "مامان آمد. با هم گشتند و توپ را پیدا کردند. خرگوش دوباره خوشحال شد.", key: 6600, hold: 7400, do: all(
            [{ id: "mama", to: { x: 48 }, dur: 2000 }], walk("mama", 0, 2000), face("mama", "caring", 1800),
            [{ id: "bun.tear", to: { o: 0, y: 0 }, at: 1600, dur: 400 }, { id: "bun.ears", to: { r: 0 }, at: 2000, dur: 500 },
              { id: "mama.eyeO", to: { x: 0.9 }, at: 2400, dur: 400 }, { id: "mama.armR", to: { r: -80 }, at: 2600, dur: 500 },
              { id: "mama", to: { x: 134 }, at: 3000, dur: 1800 }, { id: "bun", to: { x: 98 }, at: 3200, dur: 1600 }],
            walk("mama", 3000, 1800), walk("bun", 3200, 1600),
            [{ id: "mama.armR", to: { r: -30 }, at: 4800, dur: 300 }, { id: "ball", path: "M154 86Q134 70 114 86", at: 5000, dur: 900 },
              { id: "bun", to: { y: "-5" }, at: 5800, dur: 1200, yoyo: true, times: 2, ease: "out" }],
            face("bun", "joy", 5600), face("mama", "joy", 5600)) },
          { caption: "شب شد. خرگوش کوچولو در رختخوابش است. آرام است.", do: all(
            show("yard sun ball", 0, 0, 900), show("bedroom bed", 1, 0, 900),
            [{ id: "mama", to: { x: 110 }, at: 300, dur: 900 }, { id: "mama.eyeO", to: { x: -0.9 }, at: 300, dur: 400 }, { id: "mama.armR", to: { r: 0 }, at: 300, dur: 400 },
              { id: "bun.eyeO", to: { x: 0 }, at: 300, dur: 300 },
              { id: "bun", path: "M98 86Q78 64 60 80", at: 900, dur: 1300 }, { id: "blanket", to: { o: 1 }, at: 2100, dur: 400 }],
            face("bun", "calm", 2600), face("mama", "calm", 2800)) },
          { caption: "در یک روز، حس‌ها می‌آیند و می‌روند: خوشحال، غمگین، دوباره خوشحال، آرام.", hold: 8600, do: all(
            show("bedroom bed blanket", 0, 0, 800), show("room", 1, 0, 800),
            [{ id: "bun", to: { x: 80, y: 86 }, at: 800, dur: 1 }, { id: "mama", to: { x: 124 }, at: 600, dur: 1 }],
            face("bun", "happy", 800, 1), [{ id: "e1", to: { o: 1 }, at: 1400, dur: 400 }], face("bun", "joy", 1400),
            [{ id: "e2", to: { o: 1 }, at: 3000, dur: 400 }], face("bun", "sad", 3000),
            [{ id: "e3", to: { o: 1 }, at: 4600, dur: 400 }], face("bun", "joy", 4600),
            [{ id: "e4", to: { o: 1 }, at: 6200, dur: 400 }], face("bun", "calm", 6200)) }
        ] },
      { type: "pairs", practice: true, prompt: "هر صورت خرگوش را با چیزی که آن وقت شد، جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "😊", say: "خوشحال" }, { pic: "🥣", say: "صبحانه با مامان" }],
          [{ pic: "😢", say: "غمگین" }, { pic: "⚽", say: "توپش قل خورد و رفت" }],
          [{ pic: "😌", say: "آرام" }, { pic: "🌙", say: "شب، در رختخواب" }]
        ] },
      { type: "talk", scene: "🌞 😊 😢 😌 🌙", caption: "تو امروز صبح چه حسی داشتی؟ کی خوشحال شدی؟ کی غمگین شدی؟",
        tips: [
          "روز کودک را با هم مرور کنید: صبحانه، بازی، بیرون رفتن، خواب ظهر.",
          "اسم حس‌ها را برایش بگویید: «وقتی بستنی‌ات افتاد، غمگین شدی. بعد که بغلت کردم، آرام شدی.»",
          "بگویید که حس‌ها عوض می‌شوند: «غمگین بودی، حالا خوشحالی.»",
          "هر جوابی داد، بپذیرید. حس درست و غلط ندارد."
        ] },
      { type: "talk", scene: "👩 👨 💬 😊", caption: "حالا نوبت بزرگ‌تر است: تو امروز چه حس‌هایی داشتی؟",
        tips: [
          "شما هم از روز خودتان بگویید، ساده و کوتاه: «صبح خسته بودم. وقتی با هم صبحانه خوردیم، خوشحال شدم.»",
          "حس‌های سخت را هم بگویید و بگویید چه کمکتان کرد: «کمی نگران بودم. یک نفس آرام کشیدم و بهتر شدم.»",
          "کودک‌ها از شنیدن حس‌های شما یاد می‌گیرند که همهٔ حس‌ها را می‌شود گفت."
        ] },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-seed-2", subject: "feel", level: "seed", emoji: "🐢", title: "لاک‌پشت آرام",
    steps: [
      /* The turtle who stops: the rabbit takes her ball, she gets angry, goes into her shell (head, legs and tail go
         in), breathes three times (her shell rises and falls, counted), comes out and says how she feels; the rabbit
         gives the ball back. Then a child does the turtle with their arms. */
      { type: "scene", prompt: "لاک‌پشت کوچولو", bg: "#cfe8f5",
        parts: {
          park: { art: "fl-park" }, room: { art: "fl-room", o: 0 },
          bun: { art: "fl-rabbit", at: [176, 86], s: 1.35 },
          ball: { art: "ball-side", at: [96, 86], s: 1.4 },
          turtle: { art: "fl-turtle", at: [62, 86], s: 2.1 },
          counter: { art: "counter", at: [62, 26], o: 0 },
          kid: { art: "fl-kid", at: [80, 86], s: 1.45, o: 0 },
          puff: { art: "fl-puff", at: [3, -29], o: 0, under: "kid" }
        },
        scenes: [
          { caption: "لاک‌پشت کوچولو با توپش بازی می‌کند. خرگوش توپ را برداشت و برد. لاک‌پشت عصبانی شد.", key: 6400, do: all(
            [{ id: "turtle.head", to: { r: -12 }, at: 300, dur: 400, yoyo: true, times: 2 },
              { id: "ball", path: "M96 86Q104 74 112 86", at: 600, dur: 700 }, { id: "ball", path: "M112 86Q104 74 96 86", at: 1400, dur: 700 },
              { id: "bun", to: { x: 112 }, at: 1800, dur: 1600 }],
            walk("bun", 1800, 1600),
            [{ id: "bun.armL", to: { r: 30 }, at: 3400, dur: 400 }, { id: "ball", to: { x: 104.5, y: 74 }, at: 3700, dur: 400 },
              { id: "bun", to: { x: 140 }, at: 4200, dur: 1400 }, { id: "ball", to: { x: 132.5 }, at: 4200, dur: 1400 }],
            walk("bun", 4200, 1400), face("turtle", "angry", 4400),
            [{ id: "turtle.flush", to: { o: 1 }, at: 4600, dur: 800 }, { id: "turtle", to: { x: "+1" }, at: 5400, dur: 300, yoyo: true, times: 4 }]) },
          { caption: "لاک‌پشت می‌ایستد. سرش و دست و پایش را توی لاکش می‌برد.", do: all(
            [{ id: "turtle.head", to: { x: -10, sx: 0.6 }, at: 800, dur: 1200, ease: "inout" },
              { id: "turtle.legF", to: { y: -3, sy: 0.3 }, at: 1400, dur: 900 }, { id: "turtle.legB", to: { y: -3, sy: 0.3 }, at: 1600, dur: 900 },
              { id: "turtle.tail", to: { x: 4 }, at: 1800, dur: 700 }]) },
          { caption: "توی لاکش سه نفس آرام می‌کشد: یک، دو، سه.", key: 9400, hold: 10400, do: all(
            [{ id: "counter", to: { o: 1 }, at: 200, dur: 300 }, { count: "counter", from: 1, to: 3, at: 400, dur: 9000 }],
            [0, 1, 2].map(function (i) { return { id: "turtle.shell", to: { sy: 1.08, sx: 1.03 }, at: 400 + i * 3000, dur: 1400, yoyo: true, times: 2, ease: "inout" }; }),
            [{ id: "turtle.flush", to: { o: 0 }, at: 1000, dur: 6000 }]) },
          { caption: "بعد آرام بیرون می‌آید و می‌گوید: «من عصبانی‌ام. توپم را می‌خواهم.»", do: all(
            show("counter", 0, 0),
            [{ id: "turtle.head", to: { x: 0, sx: 1 }, at: 400, dur: 1200 }, { id: "turtle.legF", to: { y: 0, sy: 1 }, at: 600, dur: 800 },
              { id: "turtle.legB", to: { y: 0, sy: 1 }, at: 600, dur: 800 }, { id: "turtle.tail", to: { x: 0 }, at: 600, dur: 800 }],
            face("turtle", "sorry", 1600), talk("turtle", 2000, 2800),
            [{ id: "bun.eyeO", to: { x: -0.9 }, at: 2400, dur: 400 }]) },
          { caption: "خرگوش می‌گوید: «ببخشید.» و توپ را پس می‌دهد. حالا هر دو آرام‌اند.", do: all(
            [{ id: "bun", to: { x: 124 }, dur: 1200 }, { id: "ball", to: { x: 116.5 }, dur: 1200 }], walk("bun", 0, 1200),
            face("bun", "sorry", 1200), talk("bun", 1400, 900),
            [{ id: "ball", path: "M116.5 74Q110 68 104 86", at: 2600, dur: 800 }, { id: "bun.armL", to: { r: 0 }, at: 2800, dur: 400 }],
            face("turtle", "happy", 3400), face("bun", "happy", 3400)) },
          { caption: "تو هم می‌توانی لاک‌پشت شوی: دست‌هایت را دور خودت بگیر، سرت را پایین بیاور و سه نفس آرام بکش.", hold: 10000, do: all(
            show("park turtle bun ball", 0, 0, 700), show("room kid", 1, 300, 700),
            cross("kid", true, 1200, 900),
            [{ id: "kid.head", to: { y: 2.4, r: 0 }, at: 1400, dur: 900 }, { id: "kid.upper", to: { sy: 0.95 }, at: 1400, dur: 900 }],
            face("kid", "breatheIn", 2200),
            [0, 1, 2].map(function (i) { return { id: "kid.upper", to: { sy: 0.99 }, at: 2400 + i * 2400, dur: 1200, yoyo: true, times: 2, ease: "inout" }; })) },
          { caption: "بعد بیرون بیا و بگو چه حسی داری: «من عصبانی بودم. حالا آرام‌ترم.»", do: all(
            [{ id: "kid.head", to: { y: 0 }, at: 300, dur: 800 }, { id: "kid.upper", to: { sy: 1 }, at: 300, dur: 800 }],
            cross("kid", false, 700, 800), arms("kid", -32, 32, 1600, 600), face("kid", "calm", 1200), talk("kid", 2000, 2600),
            face("kid", "happy", 4800)) }
        ] },
      { type: "doit", pic: "🐢", text: "با بزرگ‌ترت لاک‌پشت بازی کنید:",
        list: ["بایست.", "برو توی لاکت: دست‌هایت را دور خودت بگیر و سرت را پایین بیاور.", "سه نفس آرام بکش: یک، دو، سه.", "بیرون بیا و بگو چه حسی داری."] },
      { type: "breathe", cycles: 3 },
      { type: "doit", pic: "🏡", text: "در خانه، هر وقت کسی عصبانی یا ناراحت شد، بگو «لاک‌پشت!» و همه با هم بروید توی لاکتان. اول بزرگ‌ترها!" },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "وقتی حست خیلی بزرگ شد، می‌توانی مثل لاک‌پشت بایستی، نفس بکشی و بعد بگویی چه حسی داری.", pic: "🐢",
        tips: [
          "لاک‌پشت را اول وقتی کودک آرام است، چند بار با هم بازی کنید. در لحظهٔ عصبانیت، کودک کوچک تنهایی یادش نمی‌آید؛ شما آرام بگویید «لاک‌پشت» و خودتان هم انجامش دهید.",
          "عصبانی شدن اشکالی ندارد. هدف این نیست که کودک حسش را پنهان کند؛ هدف این است که بایستد، آرام شود و بعد بگوید.",
          "وقتی کودک بیرون آمد و گفت چه حسی دارد، گوش کنید و حسش را تکرار کنید: «عصبانی شدی چون توپت را برداشت.» بعد با هم راهی پیدا کنید.",
          "لاک‌پشت را هیچ‌وقت تنبیه نکنید (مثلاً «برو گوشه بنشین»). این یک راه آرام شدن است، کنار شما."
        ] }
    ]
  },
  {
    id: "feel-seed-3", subject: "feel", level: "seed", emoji: "🛝", title: "نوبت من، نوبت تو",
    steps: [
      /* Taking turns on the swing: Shirin first while Aydin waits and counts five swings, then Aydin. */
      { type: "scene", prompt: "یک تاب برای دو نفر", bg: "#cfe8f5",
        parts: {
          park: { art: "fl-park" },
          swing: { art: "fl-swing", at: [80, 42] }, seat: { art: "fl-seat", at: [80, 42] },
          shiS: { art: "fl-shirin", at: [0, 42.2], s: 1.2, o: 0, under: "seat" }, aydS: { art: "fl-aydin", at: [0, 42.2], s: 1.2, o: 0, under: "seat" },
          shirin: { art: "fl-shirin", at: [-20, 86], s: 1.2 }, aydin: { art: "fl-aydin", at: [180, 86], s: 1.25 },
          counter: { art: "counter", at: [130, 30], o: 0 }
        },
        scenes: [
          { caption: "در پارک یک تاب هست. شیرین و آیدین هر دو می‌خواهند تاب بازی کنند.", do: all(
            [{ id: "shirin", to: { x: 52 }, dur: 2000 }, { id: "aydin", to: { x: 112 }, dur: 2000 }], walk("shirin", 0, 2000), walk("aydin", 0, 2000),
            face("shirin", "joy", 1800), face("aydin", "joy", 1800),
            [{ id: "shirin.armR", to: { r: -50 }, at: 2300, dur: 500 }, { id: "aydin.armL", to: { r: 50 }, at: 2300, dur: 500 }]) },
          { caption: "شیرین می‌گوید: «اول من، بعد تو؟» آیدین می‌گوید: «باشد!»", do: all(
            talk("shirin", 300, 1800), face("aydin", "happy", 2200), talk("aydin", 2400, 900),
            [{ id: "aydin.head", to: { y: 1 }, at: 3400, dur: 300, yoyo: true, times: 2 }]) },
          { caption: "شیرین اول سوار می‌شود. آیدین صبر می‌کند و تاب‌ها را می‌شمارد: یک، دو، سه، چهار، پنج.", key: 9000, hold: 9800, do: all(
            [{ id: "shirin", to: { o: 0 }, dur: 400 }, { id: "shiS.legL", to: { sy: 0.5 }, dur: 1 }, { id: "shiS.legR", to: { sy: 0.5 }, dur: 1 },
              { id: "shiS", to: { o: 1 }, dur: 400 }, { id: "aydin.armL", to: { r: 0 }, dur: 400 }, { id: "aydin", to: { x: 124 }, at: 300, dur: 800 }],
            face("shiS", "joy", 0, 1), face("aydin", "happy", 300),
            [{ id: "seat", to: { r: 20 }, at: 900, dur: 450, ease: "out" }, { id: "seat", to: { r: -20 }, at: 1350, dur: 7200, yoyo: true, times: 10, ease: "soft" },
              { id: "seat", to: { r: 0 }, at: 8550, dur: 600 },
              { id: "counter", to: { o: 1 }, at: 1200, dur: 300 }, { count: "counter", from: 1, to: 5, at: 1350, dur: 7200 },
              { id: "aydin.head", to: { r: 8 }, at: 1350, dur: 1440, yoyo: true, times: 10 }]) },
          { caption: "حالا نوبت آیدین است. شیرین پیاده می‌شود و آیدین سوار می‌شود.", do: all(
            show("counter", 0, 0),
            [{ id: "shiS", to: { o: 0 }, at: 300, dur: 400 }, { id: "shirin", to: { x: 72 }, at: 300, dur: 1 }, { id: "shirin", to: { o: 1 }, at: 300, dur: 400 },
              { id: "shirin", to: { x: 40 }, at: 800, dur: 1200 }, { id: "aydin", to: { x: 92 }, at: 1600, dur: 900 }],
            walk("shirin", 800, 1200), walk("aydin", 1600, 900), face("shirin", "happy", 300),
            [{ id: "aydin", to: { o: 0 }, at: 2600, dur: 400 }, { id: "aydS.legL", to: { sy: 0.5 }, dur: 1 }, { id: "aydS.legR", to: { sy: 0.5 }, dur: 1 },
              { id: "aydS", to: { o: 1 }, at: 2600, dur: 400 }],
            face("aydS", "joy", 2600, 1)) },
          { caption: "شیرین تاب را هل می‌دهد. آیدین می‌گوید: «ممنون!» هر دو خوشحال‌اند.", key: 3850, hold: 7000, do: all(
            [{ id: "shirin", to: { x: 56 }, dur: 900 }], walk("shirin", 0, 900),
            [{ id: "shirin.armL", to: { r: -40 }, at: 1000, dur: 300 }, { id: "shirin.armR", to: { r: -40 }, at: 1000, dur: 300 },
              { id: "seat", to: { r: 22 }, at: 1200, dur: 500, ease: "out" }, { id: "seat", to: { r: -22 }, at: 1700, dur: 5000, yoyo: true, times: 7, ease: "soft" },
              { id: "shirin.armL", to: { r: 0 }, at: 1500, dur: 400 }, { id: "shirin.armR", to: { r: 0 }, at: 1500, dur: 400 }],
            talk("aydS", 2200, 1200), face("shirin", "joy", 3200)) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "نوبت گرفتن را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "🙋", label: "می‌پرسم", say: "می‌پرسم: نوبت من کی است؟" },
          { pic: "⏳", label: "صبر می‌کنم", say: "صبر می‌کنم و می‌شمارم" },
          { pic: "🛝", label: "نوبت من", say: "نوبت من است و بازی می‌کنم" },
          { pic: "🤝", label: "نوبت دوستم", say: "بعد نوبت دوستم است" }
        ] },
      /* Turns at home: a tower with a block each, a ball thrown and caught, and what to do while waiting. */
      { type: "scene", prompt: "نوبتی در خانه", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          t1: { art: "fl-block-r", at: [40, 86], s: 1.2, o: 0 }, t2: { art: "fl-block-b", at: [120, 86], s: 1.2, o: 0 },
          t3: { art: "fl-block-y", at: [40, 86], s: 1.2, o: 0 }, t4: { art: "fl-block-g", at: [120, 86], s: 1.2, o: 0 },
          shirin: { art: "fl-shirin", at: [52, 86], s: 1.2 }, aydin: { art: "fl-aydin", at: [108, 86], s: 1.25 },
          ball: { art: "ball-side", at: [66, 70], s: 1.2, o: 0 },
          car: { art: "fl-car", at: [30, 86], s: 1.3, o: 0 },
          notes: { art: "fl-notes", at: [122, 48], s: 1.3, o: 0 }, counter: { art: "counter", at: [146, 52], o: 0 }
        },
        scenes: [
          { caption: "شیرین و آیدین با مکعب‌ها برج می‌سازند: یکی را شیرین می‌گذارد، یکی را آیدین.", hold: 7000, do: all(
            [{ id: "shirin.armR", to: { r: -50 }, at: 300, dur: 400 }, { id: "t1", to: { o: 1 }, at: 400, dur: 200 }, { id: "t1", path: "M60 70Q70 62 80 86", at: 400, dur: 700 },
              { id: "shirin.armR", to: { r: 0 }, at: 1200, dur: 400 },
              { id: "aydin.armL", to: { r: 50 }, at: 1800, dur: 400 }, { id: "t2", to: { o: 1 }, at: 1900, dur: 200 }, { id: "t2", path: "M100 70Q90 60 80 77.4", at: 1900, dur: 700 },
              { id: "aydin.armL", to: { r: 0 }, at: 2700, dur: 400 },
              { id: "shirin.armR", to: { r: -50 }, at: 3300, dur: 400 }, { id: "t3", to: { o: 1 }, at: 3400, dur: 200 }, { id: "t3", path: "M60 70Q70 54 80 68.8", at: 3400, dur: 700 },
              { id: "shirin.armR", to: { r: 0 }, at: 4200, dur: 400 },
              { id: "aydin.armL", to: { r: 50 }, at: 4800, dur: 400 }, { id: "t4", to: { o: 1 }, at: 4900, dur: 200 }, { id: "t4", path: "M100 70Q90 50 80 60.2", at: 4900, dur: 700 },
              { id: "aydin.armL", to: { r: 0 }, at: 5700, dur: 400 }],
            face("shirin", "joy", 6000), face("aydin", "joy", 6000)) },
          { caption: "بعد توپ‌بازی می‌کنند: یکی می‌اندازد، یکی می‌گیرد.", key: 2900, do: all(
            show("t1 t2 t3 t4", 0, 0, 500), show("ball", 1, 500, 300),
            [{ id: "ball", path: "M66 70Q80 46 96 70", at: 900, dur: 1000 }, { id: "aydin.armL", to: { r: 40 }, at: 1700, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M96 70Q80 46 64 70", at: 2400, dur: 1000 }, { id: "shirin.armR", to: { r: -40 }, at: 3200, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M64 70Q80 46 96 70", at: 3900, dur: 1000 }]) },
          { caption: "وقتی نوبت دوستمان است، می‌توانیم بشماریم، آواز بخوانیم یا دست بزنیم و تشویقش کنیم.", key: 4700, hold: 7400, do: all(
            show("ball", 0, 0), show("car", 1, 300),
            [{ id: "shirin", to: { x: 40 }, at: 300, dur: 600 }, { id: "car", path: "M30 86L60 86", at: 1000, dur: 1600 }, { id: "car", path: "M60 86L24 86", at: 3000, dur: 1600 },
              { id: "shirin.armR", to: { r: -30 }, at: 1000, dur: 1600 }, { id: "counter", to: { o: 1 }, at: 1000, dur: 300 }, { count: "counter", from: 1, to: 3, at: 1100, dur: 3000 },
              { id: "notes", to: { o: 1 }, at: 1600, dur: 300 }, { id: "notes", path: "M122 48Q126 44 128 38", at: 1600, dur: 2400 },
              { id: "aydin.armL", to: { r: 30 }, at: 4400, dur: 300, yoyo: true, times: 6 }, { id: "aydin.armR", to: { r: -30 }, at: 4400, dur: 300, yoyo: true, times: 6 }],
            face("aydin", "happy", 300), talk("aydin", 1600, 2400), face("aydin", "joy", 4400), face("shirin", "joy", 4600)) }
        ] },
      { type: "talk", scene: "🛝 🧱 ⚽ ⏳", caption: "تو با چه کسی نوبتی بازی می‌کنی؟ وقتی منتظر نوبتت هستی، چه کار می‌کنی؟",
        tips: [
          "صبر کردن برای کودک کوچک سخت است. صبرش را ببینید و اسمش را بگویید: «چه خوب صبر کردی!»",
          "صبر را کوتاه و دیدنی کنید: «پنج تا تاب، بعد نوبت تو.» با هم بشمارید.",
          "با هم کارهایی برای وقت صبر پیدا کنید: شمردن، آواز خواندن، دست زدن، نگاه کردن به بازی دوست."
        ] },
      { type: "doit", pic: "⚽", text: "با بزرگ‌ترت یک بازی نوبتی بکنید: توپ را برای هم قل بدهید و هر بار بگویید «نوبت من!»، «نوبت تو!»" }
    ]
  },
  {
    id: "feel-seed-4", subject: "feel", level: "seed", emoji: "👀", title: "او چه حسی دارد؟",
    steps: [
      /* Reading faces and what happened, then doing something kind: Aydin's tower falls (sad; Shirin helps rebuild),
         Mina opens a present (happy), Sam drops his apple (sad; Mina shares hers). */
      { type: "scene", prompt: "از صورتش می‌فهمیم", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          t1: { art: "fl-block-r", at: [58, 86], s: 1.2 }, t2: { art: "fl-block-b", at: [58, 77.4], s: 1.2 },
          t3: { art: "fl-block-y", at: [58, 68.8], s: 1.2 }, t4: { art: "fl-block-g", at: [58, 60.2], s: 1.2 },
          aydin: { art: "fl-aydin", at: [36, 86], s: 1.3 }, shirin: { art: "fl-shirin", at: [180, 86], s: 1.25 },
          gift: { art: "fl-gift", at: [76, 80], s: 1.3, o: 0 }, car: { art: "fl-car", at: [76, 78], s: 1.1, o: 0 },
          mina: { art: "fl-mina", at: [100, 86], s: 1.3, o: 0 }, sam: { art: "fl-sam", at: [58, 86], s: 1.3, o: 0 },
          sL: { art: "fl-apple-l", at: [67, 70], s: 1, o: 0 }, sR: { art: "fl-apple-r", at: [67, 70], s: 1, o: 0 },
          mL: { art: "fl-apple-l", at: [91, 70], s: 1, o: 0 }, mR: { art: "fl-apple-r", at: [91, 70], s: 1, o: 0 },
          heart: { art: "fl-heart", at: [80, 22], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "برج آیدین افتاد. صورتش را ببین: آیدین غمگین است.", do: all(
            [{ id: "t4", path: "M58 60.2Q72 56 78 86", at: 600, dur: 700, ease: "in" }, { id: "t4", to: { r: 100 }, at: 600, dur: 700 },
              { id: "t3", path: "M58 68.8Q48 64 44 87", at: 650, dur: 650, ease: "in" }, { id: "t3", to: { r: -80 }, at: 650, dur: 650 },
              { id: "t2", path: "M58 77.4Q66 76 70 86", at: 700, dur: 500, ease: "in" }, { id: "t2", to: { r: 30 }, at: 700, dur: 500 }],
            face("aydin", "oops", 1100), face("aydin", "sad", 2000),
            [{ id: "aydin.upper", to: { y: 1 }, at: 2200, dur: 900 }, { id: "aydin.eyeO", to: { x: 0.6, y: 0.6 }, at: 2200, dur: 500 }]) },
          { caption: "شیرین صورت آیدین را می‌بیند و می‌گوید: «بیا کمکت کنم.» با هم دوباره برج را می‌سازند.", key: 7000, hold: 7600, do: all(
            [{ id: "shirin", to: { x: 92 }, dur: 2200 }], walk("shirin", 0, 2200), face("shirin", "caring", 2000), talk("shirin", 2400, 1600),
            [{ id: "aydin.upper", to: { y: 0 }, at: 3600, dur: 600 }, { id: "aydin.eyeO", to: { x: 0, y: 0 }, at: 3600, dur: 400 },
              { id: "t2", path: "M70 86Q74 74 58 77.4", at: 4200, dur: 600 }, { id: "t2", to: { r: 0 }, at: 4200, dur: 600 },
              { id: "t3", path: "M44 87Q44 64 58 68.8", at: 5000, dur: 600 }, { id: "t3", to: { r: 0 }, at: 5000, dur: 600 },
              { id: "t4", path: "M78 86Q76 54 58 60.2", at: 5800, dur: 600 }, { id: "t4", to: { r: 0 }, at: 5800, dur: 600 },
              { id: "shirin.armL", to: { r: 50 }, at: 4200, dur: 2400, yoyo: true, times: 4 }, { id: "aydin.armR", to: { r: -50 }, at: 5000, dur: 1600, yoyo: true, times: 2 }],
            face("aydin", "joy", 6600), face("shirin", "joy", 6600)) },
          { caption: "مینا یک هدیه گرفت. صورتش را ببین: مینا خوشحال است.", key: 3600, do: all(
            show("aydin shirin t1 t2 t3 t4", 0, 0, 600), show("mina gift", 1, 600, 600),
            [{ id: "mina.armL", to: { r: 40 }, at: 1400, dur: 400 }, { id: "gift.lid", to: { y: -8, r: -20 }, at: 1800, dur: 700, ease: "back" },
              { id: "car", to: { o: 1 }, at: 2200, dur: 300 }, { id: "car", to: { y: 64 }, at: 2200, dur: 700, ease: "back" },
              { emit: "spark", where: [76, 60], spread: [16, 8], n: 7, at: 2400, dur: 800, life: 1200 }],
            face("mina", "joy", 2600), [{ id: "mina", to: { y: "-4" }, at: 3000, dur: 1200, yoyo: true, times: 2, ease: "out" }]) },
          { caption: "سیب سام از دستش افتاد. صورتش را ببین: سام غمگین است.", do: all(
            show("gift car", 0, 0, 500), [{ id: "mina.armL", to: { r: 0 }, dur: 400 }], face("mina", "happy", 0),
            show("sam sL sR", 1, 500, 600), [{ id: "sam.armR", to: { r: -40 }, dur: 1 }, { id: "mL", to: { o: 1 }, at: 500, dur: 600 }, { id: "mR", to: { o: 1 }, at: 500, dur: 600 }],
            [{ id: "sam.armR", to: { r: 0 }, at: 1600, dur: 300 }, { id: "sL", to: { y: 86, r: -60 }, at: 1600, dur: 600, ease: "in" }, { id: "sR", to: { y: 86, r: -60 }, at: 1600, dur: 600, ease: "in" },
              { id: "sam.eyeO", to: { y: 0.8 }, at: 2000, dur: 400 }],
            face("sam", "sad", 2400), [{ id: "sam.upper", to: { y: 1 }, at: 2600, dur: 800 }]) },
          { caption: "مینا سیبش را نصف می‌کند و نصفش را به سام می‌دهد. سام می‌گوید: «ممنون!»", do: all(
            show("sL sR", 0, 0, 500), [{ id: "mina.eyeO", to: { x: -0.9 }, at: 300, dur: 400 }], face("mina", "caring", 400),
            [{ id: "mL", to: { x: 88, r: -15 }, at: 900, dur: 500 }, { id: "mR", to: { x: 94, r: 15 }, at: 900, dur: 500 },
              { id: "mL.cut", to: { o: 1 }, at: 900, dur: 300 }, { id: "mR.cut", to: { o: 1 }, at: 900, dur: 300 },
              { id: "mL", path: "M88 70Q78 60 70 70", at: 1800, dur: 1000 }, { id: "mL", to: { r: 0 }, at: 1800, dur: 1000 },
              { id: "sam.armR", to: { r: -40 }, at: 2600, dur: 400 },
              { id: "sam.upper", to: { y: 0 }, at: 2800, dur: 500 }, { id: "sam.eyeO", to: { y: 0 }, at: 2800, dur: 400 }],
            face("sam", "joy", 3000), talk("sam", 3300, 1000), face("mina", "joy", 3600)) },
          { caption: "وقتی به صورت کسی نگاه می‌کنیم، می‌فهمیم چه حسی دارد. آن وقت می‌توانیم کار مهربانی بکنیم.", hold: 6400, do: all(
            show("aydin shirin", 1, 300, 600), [{ id: "aydin", to: { x: 24 }, dur: 1 }, { id: "shirin", to: { x: 136 }, dur: 1 },
              { id: "heart", to: { o: 1 }, at: 1600, dur: 400 }, { id: "heart", to: { s: 1.6 }, at: 2000, dur: 1600, yoyo: true, times: 2 }],
            face("aydin", "joy", 1000, 1), face("shirin", "joy", 1000, 1), face("sam", "happy", 1200), face("mina", "happy", 1200)) }
        ] },
      { type: "pairs", practice: true, prompt: "هر صورت را با چیزی که شد جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "😢", say: "غمگین" }, { pic: "🧱", say: "برجش افتاد" }],
          [{ pic: "😊", say: "خوشحال" }, { pic: "🎁", say: "یک هدیه گرفت" }],
          [{ pic: "😠", say: "عصبانی" }, { pic: "🚗", say: "کسی ماشینش را برداشت" }],
          [{ pic: "😨", say: "ترسیده" }, { pic: "🐕", say: "یک سگ بزرگ دید" }]
        ] },
      { type: "pairs", practice: true, prompt: "وقتی کسی این حس را دارد، چه کار مهربانی می‌شود کرد؟ جفتشان کن.",
        pairs: [
          [{ pic: "🧱", say: "برجش افتاد" }, { pic: "🤝", say: "کمکش کنم دوباره بسازد" }],
          [{ pic: "🍎", say: "سیبش افتاد" }, { pic: "🌗", say: "سیبم را با او نصف کنم" }],
          [{ pic: "😢", say: "دلش برای مامانش تنگ شده" }, { pic: "🤗", say: "بغلش کنم" }]
        ] },
      { type: "talk", scene: "😊 😢 😠 😨 🤝 🤗", caption: "اگر دوستت غمگین بود، چه کار می‌کردی؟ اگر عصبانی بود چه؟",
        tips: [
          "با هم به صورت آدم‌ها در کتاب‌های قصه یا در خانه نگاه کنید و بپرسید: «فکر می‌کنی او چه حسی دارد؟ از کجا فهمیدی؟»",
          "هر جوابی داد، بپذیرید و کمکش کنید یک کار مهربان پیدا کند: کمک، بغل، قسمت کردن، یا گفتن به یک بزرگ‌تر.",
          "کارهای مهربانش را ببینید و اسمشان را بگویید: «دیدی خواهرت غمگین است و بغلش کردی. مهربان بودی.»"
        ] },
      { type: "talk", scene: "😊 😢 😠 😮", caption: "بازی صورت‌ها: بزرگ‌تر یک حس را با صورتش نشان می‌دهد و تو حدس می‌زنی. بعد جایتان را عوض کنید!",
        tips: [
          "اول حس‌های ساده را نشان دهید: خوشحال، غمگین، عصبانی، ترسیده، تعجب.",
          "بعد از هر حدس بپرسید: «چه چیزی ممکن است کسی را این‌طور کند؟»",
          "حس‌های ترسیده را آرام و کوتاه نشان دهید و بازی را با یک صورت خوشحال تمام کنید."
        ] }
    ]
  },
  {
    id: "feel-seed-5", subject: "feel", level: "seed", emoji: "🍽️", title: "کمک کوچک",
    steps: [
      /* Small help at home: Yasaman carries the plates to the sofreh, Mom thanks her (both happy), she waters the
         plant (it grows a little) and puts the shoes on the rack; Dad smiles. */
      { type: "scene", prompt: "یاسمن کمک می‌کند", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          rack: { art: "fl-rack", at: [80, 88], s: 1.5, o: 0 },
          plant: { art: "fl-plant", at: [118, 86], s: 1.5, o: 0 },
          mom: { art: "fl-mom", at: [142, 88], s: 1.55 }, dad: { art: "fl-dad", at: [-20, 88], s: 1.6 },
          sofreh: { art: "fl-sofreh", at: [102, 80], s: 0.75, o: 0 },
          yas: { art: "fl-yas", at: [30, 86], s: 1.3 },
          p1: { art: "fl-plate", at: [30, 69.6], s: 1.1 }, p2: { art: "fl-plate", at: [30, 68], s: 1.1 },
          can: { art: "fl-can", at: [100, 70], s: 1.3, flip: true, o: 0 },
          s1: { art: "fl-shoe", at: [22, 87], s: 1.4, r: 30, o: 0 }, s2: { art: "fl-shoe", at: [40, 88], s: 1.4, r: -20, o: 0 },
          s3: { art: "fl-shoe", at: [128, 87], s: 1.4, r: 40, o: 0 }, s4: { art: "fl-shoe", at: [146, 88], s: 1.4, r: -10, o: 0 },
          heart: { art: "fl-heart", at: [96, 24], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "وقت شام است. یاسمن به مامان کمک می‌کند و بشقاب‌ها را سر سفره می‌برد.", do: all(
            show("sofreh", 1, 300, 600), arms("yas", -40, 40, 0, 1),
            [{ id: "yas", to: { x: 66 }, at: 900, dur: 2000 }, { id: "p1", to: { x: 66 }, at: 900, dur: 2000 }, { id: "p2", to: { x: 66 }, at: 900, dur: 2000 }],
            walk("yas", 900, 2000),
            [{ id: "p1", path: "M66 69.6Q80 62 88 74", at: 3100, dur: 800 }, { id: "p2", path: "M66 68Q90 56 112 74", at: 3900, dur: 1000 }],
            arms("yas", 0, 0, 4700, 500), face("yas", "happy", 4700)) },
          { caption: "مامان می‌گوید: «ممنون که کمکم کردی!» مامان خوشحال است. یاسمن هم خوشحال است.", do: all(
            face("mom", "joy", 300), talk("mom", 500, 2200),
            [{ id: "heart", to: { o: 1 }, at: 2600, dur: 400 }, { id: "heart", to: { s: 1.6 }, at: 3000, dur: 1600, yoyo: true, times: 2 },
              { id: "yas", to: { y: "-4" }, at: 2800, dur: 1200, yoyo: true, times: 2, ease: "out" }],
            face("yas", "joy", 2600)) },
          { caption: "فردا صبح، یاسمن به گلدان آب می‌دهد. گیاه آب می‌خورد و بزرگ می‌شود.", key: 4600, do: all(
            show("sofreh p1 p2 heart mom", 0, 0, 600), show("plant", 1, 400, 600), face("yas", "happy", 0),
            [{ id: "yas", to: { x: 92 }, at: 600, dur: 1000 }], walk("yas", 600, 1000),
            [{ id: "yas.armR", to: { r: -40 }, at: 1600, dur: 400 }, { id: "can", to: { o: 1 }, at: 1700, dur: 300 },
              { id: "can", to: { r: 30 }, at: 2200, dur: 600 },
              { emit: "drop", where: [116, 64], spread: [3, 2], rise: -12, n: 14, at: 2600, dur: 2400, life: 800 },
              { id: "plant.leaves", to: { s: 1.3 }, at: 3000, dur: 2400 }, { id: "can", to: { r: 0 }, at: 5200, dur: 500 }]) },
          { caption: "بعد کفش‌ها را جفت می‌کند و سر جایشان می‌گذارد.", key: 6900, hold: 7400, do: all(
            show("can plant", 0, 0, 500), [{ id: "yas.armR", to: { r: 0 }, dur: 400 }],
            show("rack s1 s2 s3 s4", 1, 400, 600),
            [{ id: "yas", to: { x: 50 }, at: 900, dur: 1200 }], walk("yas", 900, 1200),
            [{ id: "s1", to: { x: 70, y: 76, r: 0 }, at: 2200, dur: 800 }, { id: "s2", to: { x: 76, y: 76, r: 0 }, at: 3000, dur: 800 }],
            [{ id: "yas", to: { x: 110 }, at: 3900, dur: 1300 }], walk("yas", 3900, 1300),
            [{ id: "s3", to: { x: 84, y: 76, r: 0 }, at: 5200, dur: 800 }, { id: "s4", to: { x: 90, y: 76, r: 0 }, at: 5800, dur: 800 }]) },
          { caption: "بابا می‌بیند و لبخند می‌زند. کمک کردن دل همه را گرم می‌کند.", hold: 6400, do: all(
            [{ id: "dad", to: { x: 36 }, dur: 2000 }], walk("dad", 0, 2000), face("dad", "joy", 2000), talk("dad", 2200, 1400),
            face("yas", "joy", 2400), show("mom", 1, 2400),
            [{ id: "mom", to: { x: 140 }, at: 2400, dur: 1 }, { id: "heart", to: { x: 80 }, at: 2400, dur: 1 },
              { id: "heart", to: { o: 1 }, at: 3400, dur: 400 }, { id: "heart", to: { s: 1.6 }, at: 3800, dur: 1600, yoyo: true, times: 2 },
              { emit: "spark", where: [80, 40], spread: [50, 20], n: 10, at: 3800, dur: 1600, life: 1400 }],
            face("mom", "joy", 2800)) }
        ] },
      { type: "sort", practice: true, prompt: "کدام کار را تو می‌توانی بکنی، و کدام کار بزرگ‌ترهاست؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "🧒", label: "کار من", value: "me" }, { pic: "🧑", label: "کار بزرگ‌ترها", value: "grown" }],
        items: [
          { pic: "🍽️", label: "چیدن سفره", say: "بردن بشقاب‌ها سر سفره", basket: "me" },
          { pic: "🪴", label: "آب دادن گل", say: "آب دادن به گلدان", basket: "me" },
          { pic: "👟", label: "جفت کردن کفش", say: "جفت کردن کفش‌ها", basket: "me" },
          { pic: "🧸", label: "جمع کردن اسباب‌بازی", say: "جمع کردن اسباب‌بازی‌ها", basket: "me" },
          { pic: "🔥", label: "روشن کردن اجاق", say: "روشن کردن اجاق گاز", basket: "grown" },
          { pic: "🔪", label: "کار با چاقو", say: "بریدن با چاقو", basket: "grown" },
          { pic: "🫖", label: "ریختن چای داغ", say: "ریختن چای داغ", basket: "grown" }
        ] },
      { type: "talk", scene: "🍽️ 🪴 👟 💛", caption: "وقتی یاسمن کمک کرد، مامان چه حسی داشت؟ یاسمن چه حسی داشت؟ تو در خانه به چه کسی کمک می‌کنی؟",
        tips: [
          "کمک‌های کوچک کودک را ببینید و حس خودتان را بگویید: «وقتی کفش‌ها را جفت کردی، خوشحال شدم.»",
          "از او بپرسید خودش چه حسی داشت. کمک کردن به دیگران حال خود کودک را هم خوب می‌کند.",
          "کار کامل یا بی‌نقص نخواهید. تلاشش مهم است."
        ] },
      { type: "doit", pic: "🧺", text: "همین حالا یک کار کوچک برای کمک انتخاب کن و انجامش بده:",
        list: ["اسباب‌بازی‌هایت را جمع کن.", "کفش‌ها را جفت کن.", "به گلدان آب بده (با کمک بزرگ‌ترت).", "یک بشقاب یا قاشق سر سفره ببر."] },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "کمک کوچک تو، دل همه را گرم می‌کند.", pic: "💛",
        tips: [
          "یک کار کوچک و ثابت به کودک بسپارید (چیدن قاشق‌ها، آب دادن گلدان) تا هر روز انجامش دهد. کودک احساس می‌کند در خانه مهم است.",
          "کار را با هم انجام دهید و آسانش کنید: ظرف نشکن، آب‌پاش کوچک.",
          "از کار، نه از خود کودک، تعریف کنید: «کفش‌ها چه مرتب شدند!» و حس دیگران را بگویید: «بابا خوشحال شد.»",
          "کارهایی که خطر دارند (اجاق، چاقو، آب داغ، دارو) همیشه کار بزرگ‌ترهاست."
        ] }
    ]
  },
  {
    id: "feel-seed-6", subject: "feel", level: "seed", emoji: "👋", title: "خداحافظ، دوباره سلام",
    steps: [
      /* A goodbye routine: Mom has to go to work and Arash stays with Grandma; a hug, a wave and «عصر می‌بینمت!»;
         Mom goes out of the door; Arash misses her and Grandma stays close; they build a tower; in the evening the
         door opens and Mom is back. */
      { type: "scene", prompt: "خداحافظی آرش و مامان", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          door: { art: "fl-door", at: [76, 66], s: 1.2 },
          t1: { art: "fl-block-r", at: [96, 86], s: 1.2, o: 0 }, t2: { art: "fl-block-b", at: [96, 77.4], s: 1.2, o: 0 }, t3: { art: "fl-block-y", at: [96, 68.8], s: 1.2, o: 0 },
          grandma: { art: "fl-grandma", at: [136, 88], s: 1.45 },
          mom: { art: "fl-mom", at: [40, 88], s: 1.6 },
          bag: { art: "fl-bag", at: [11, -1], s: 0.6, under: "mom" },
          arash: { art: "fl-arash", at: [64, 86], s: 1.35 },
          think: { art: "fl-think", at: [72, 40], o: 0 }, thinkMom: { art: "fl-mom", at: [16, -5], s: 0.34, under: "think" },
          heart: { art: "fl-heart", at: [52, 24], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "صبح است. مامان باید سر کار برود. آرش امروز پیش مادربزرگ می‌ماند.", do: all(
            face("grandma", "joy", 600), talk("grandma", 800, 1200), [{ id: "grandma.armL", to: { r: 140 }, at: 800, dur: 500 }, { id: "grandma.armL", to: { r: 0 }, at: 2400, dur: 500 }],
            face("arash", "sorry", 2000), [{ id: "arash.eyeO", to: { x: -0.8 }, at: 2200, dur: 400 }]) },
          { caption: "آرش و مامان خداحافظی مخصوص خودشان را دارند. اول یک بغل محکم.", do: all(
            face("mom", "caring", 0),
            [{ id: "mom.armR", to: { r: -84 }, at: 400, dur: 900 }, { id: "mom.head", to: { r: 8 }, at: 600, dur: 600 },
              { id: "arash.armL", to: { r: 60 }, at: 900, dur: 700 }, { id: "heart", to: { o: 1 }, at: 1600, dur: 400 }, { id: "heart", to: { s: 1.5 }, at: 2000, dur: 1600, yoyo: true, times: 2 }],
            face("arash", "calm", 1400), face("mom", "calm", 1400)) },
          { caption: "بعد دست تکان می‌دهند و مامان می‌گوید: «عصر می‌بینمت!» مامان از در بیرون می‌رود.", key: 3600, hold: 7600, do: all(
            show("heart", 0, 0), [{ id: "mom.armR", to: { r: 0 }, dur: 600 }, { id: "mom.head", to: { r: 0 }, dur: 600 }, { id: "arash.armL", to: { r: 0 }, dur: 600 },
              { id: "door.leaf", to: { sx: 0.15 }, at: 600, dur: 900 },
              { id: "mom", to: { x: 76, y: 70, s: 1.25 }, at: 800, dur: 1600 }], walk("mom", 800, 1600), face("mom", "happy", 600),
            [{ id: "mom.armR", to: { r: -150 }, at: 2600, dur: 400 }, { id: "mom.armR", to: { r: -120 }, at: 3000, dur: 1200, yoyo: true, times: 4 },
              { id: "arash.armR", to: { r: -150 }, at: 2700, dur: 400 }, { id: "arash.armR", to: { r: -120 }, at: 3100, dur: 1200, yoyo: true, times: 4 }],
            talk("mom", 3000, 1600), face("arash", "happy", 3000),
            [{ id: "mom", to: { o: 0 }, at: 5600, dur: 700 }, { id: "door.leaf", to: { sx: 1 }, at: 6300, dur: 900 }, { id: "arash.armR", to: { r: 0 }, at: 6000, dur: 500 }]) },
          { caption: "آرش دلش برای مامان تنگ می‌شود. دلتنگی اشکالی ندارد. مادربزرگ کنارش است.", key: 5200, do: all(
            face("arash", "sad", 300), show("think", 1, 600, 600), face("thinkMom", "happy", 0, 1),
            [{ id: "grandma", to: { x: 86 }, at: 1600, dur: 2000 }], walk("grandma", 1600, 2000), face("grandma", "caring", 3200),
            [{ id: "grandma.armL", to: { r: 70 }, at: 3700, dur: 800 }, { id: "grandma.head", to: { r: -8 }, at: 3800, dur: 600 }],
            face("arash", "sorry", 4600)) },
          { caption: "با مادربزرگ برج می‌سازند و بازی می‌کنند.", do: all(
            show("think", 0, 0), [{ id: "grandma.armL", to: { r: 0 }, dur: 500 }, { id: "grandma.head", to: { r: 0 }, dur: 500 },
              { id: "grandma", to: { x: 122 }, at: 300, dur: 1400 }], walk("grandma", 300, 1400),
            [{ id: "arash", to: { x: 76 }, at: 300, dur: 900 }], walk("arash", 300, 900),
            [{ id: "t1", to: { o: 1 }, at: 1600, dur: 200 }, { id: "t1", path: "M84 70Q92 62 96 86", at: 1600, dur: 700 }, { id: "arash.armR", to: { r: -50 }, at: 1500, dur: 400, yoyo: true, times: 2 },
              { id: "t2", to: { o: 1 }, at: 2600, dur: 200 }, { id: "t2", path: "M110 70Q100 62 96 77.4", at: 2600, dur: 700 }, { id: "grandma.armL", to: { r: 50 }, at: 2500, dur: 400, yoyo: true, times: 2 },
              { id: "t3", to: { o: 1 }, at: 3600, dur: 200 }, { id: "t3", path: "M84 70Q92 54 96 68.8", at: 3600, dur: 700 }, { id: "arash.armR", to: { r: -50 }, at: 3500, dur: 400, yoyo: true, times: 2 }],
            face("arash", "joy", 4400), face("grandma", "joy", 4400)) },
          { caption: "عصر شد. در باز می‌شود. مامان برگشت! آرش می‌گوید: «سلام دوباره!»", key: 4400, hold: 7600, do: all(
            [{ id: "room.dusk", to: { o: 1 }, dur: 1200 }, { id: "door.leaf", to: { sx: 0.15 }, at: 1200, dur: 900 },
              { id: "mom", to: { x: 76, y: 70, s: 1.25 }, dur: 1 }, { id: "mom", to: { o: 1 }, at: 1800, dur: 500 },
              { id: "arash.eyeO", to: { y: -0.5 }, at: 1800, dur: 400 },
              { id: "mom", to: { x: 44, y: 88, s: 1.6 }, at: 2400, dur: 1800 }, { id: "arash", to: { x: 64 }, at: 2800, dur: 900 }],
            walk("mom", 2400, 1800), walk("arash", 2800, 900), face("mom", "joy", 2400), face("arash", "joy", 2200), talk("arash", 3900, 1400),
            [{ id: "arash.eyeO", to: { y: 0 }, at: 3800, dur: 300 }, { id: "mom.armR", to: { r: -84 }, at: 4400, dur: 800 }, { id: "door.leaf", to: { sx: 1 }, at: 4600, dur: 900 },
              { id: "heart", to: { o: 1 }, at: 5400, dur: 400 }, { id: "heart", to: { s: 1.5 }, at: 5800, dur: 1400, yoyo: true, times: 2 }]) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "خداحافظی آرش و مامان را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "🤗", label: "بغل", say: "یک بغل محکم" },
          { pic: "👋", label: "دست تکان دادن", say: "دست تکان دادن" },
          { pic: "💬", label: "عصر می‌بینمت!", say: "عصر می‌بینمت!" },
          { pic: "🧱", label: "بازی", say: "بازی با مادربزرگ" },
          { pic: "🚪", label: "سلام دوباره!", say: "مامان برگشت. سلام دوباره!" }
        ] },
      { type: "talk", scene: "🤗 👋 💬 🚪", caption: "تو وقتی بزرگ‌ترت می‌رود، چه حسی داری؟ وقتی دلت تنگ می‌شود، چه کار می‌کنی؟",
        tips: [
          "دلتنگی کودک را بپذیرید: «می‌دانم دلت برایم تنگ می‌شود. من هم دلم برایت تنگ می‌شود.»",
          "بگویید کی برمی‌گردید، با چیزی که کودک می‌فهمد: «بعد از ناهار و خواب ظهر.»",
          "یواشکی نروید. خداحافظی کوتاه، گرم و همیشه یک‌جور، به کودک احساس امنیت می‌دهد.",
          "وقتی برگشتید، سلام گرمی بکنید و بگویید: «دیدی؟ گفتم برمی‌گردم.»"
        ] },
      { type: "doit", pic: "🤗", text: "با بزرگ‌ترت خداحافظی مخصوص خودتان را بسازید: یک بغل، یک دست تکان دادن و یک جمله که فقط مال شماست. حالا یک بار تمرینش کنید!" },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "وقتی بزرگ‌ترت می‌رود، دلتنگ شدن اشکالی ندارد. خداحافظی مخصوص شما یادت می‌آورد که او به تو فکر می‌کند.", pic: "👋",
        tips: [
          "سخت جدا شدن در این سن طبیعی است و بعد از روزهای پرتنش ممکن است بیشتر شود. صبور باشید و کودک را برای چسبیدن به شما سرزنش نکنید.",
          "خداحافظی را کوتاه و قابل پیش‌بینی نگه دارید؛ کش دادنش دل‌کندن را سخت‌تر می‌کند. به قولی که می‌دهید («عصر می‌آیم») عمل کنید.",
          "یک چیز کوچک از شما (یک دستمال، یک عکس، یک نقاشی روی دست) می‌تواند به کودک کمک کند.",
          "اگر خانواده از هم دور افتاده یا کسی نمی‌تواند برگردد، این درس را خودتان کنار کودک ببینید و جمله‌ها را با موقعیت خودتان جور کنید. برای کودکی که جدایی سختی را تجربه کرده، با روان‌شناس کودک مشورت کنید.",
          "اگر جدا شدن هر روز سخت‌تر شد، یا ترس از جدایی چند هفته خواب و بازی کودک را به هم ریخت، با پزشک یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-seed-7", subject: "feel", level: "seed", emoji: "👟", title: "خودم می‌توانم",
    steps: [
      /* Doing it myself: Shirin washes her hands (bubbles, water), carries her plate, tries to put her shoes on (it
         slips off), breathes and tries again, asks Dad for help, he shows her, and she puts them on herself. */
      { type: "scene", prompt: "شیرین خودش انجام می‌دهد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          dad: { art: "fl-dad", at: [-20, 88], s: 1.55 },
          shirin: { art: "fl-shirin-sock", at: [50, 86], s: 1.35 },
          sh1: { art: "fl-shoe", at: [-8, 0.6], r: -20, o: 0, under: "shirin" }, sh2: { art: "fl-shoe", at: [9, 0.6], r: 25, o: 0, under: "shirin" },
          sink: { art: "fl-sink", at: [50, 86], s: 1.05 },
          plate: { art: "fl-plate", at: [50, 68], s: 1.1, o: 0 },
          puff: { art: "fl-puff", at: [3, -29], o: 0, under: "shirin" }
        },
        scenes: [
          { caption: "شیرین خودش دست‌هایش را می‌شوید.", key: 3600, do: all(
            [{ id: "sink.water", to: { o: 1 }, at: 400, dur: 300 }], arms("shirin", -36, 36, 700, 600),
            [{ id: "shirin.armL", to: { r: -28 }, at: 1400, dur: 2800, yoyo: true, times: 8 }, { id: "shirin.armR", to: { r: 28 }, at: 1400, dur: 2800, yoyo: true, times: 8 },
              { emit: "bubble", where: [50, 63], spread: [10, 4], rise: 8, n: 16, at: 1400, dur: 2800, life: 1200 },
              { emit: "drop", where: [54.2, 65], spread: [1, 1], rise: -3, n: 10, at: 600, dur: 3600, life: 600 }],
            face("shirin", "happy", 1000), [{ id: "sink.water", to: { o: 0 }, at: 4400, dur: 300 }]) },
          { caption: "بعد بشقابش را خودش برمی‌دارد و به آشپزخانه می‌برد.", do: all(
            show("sink", 0, 0, 600), show("plate", 1, 500, 300), arms("shirin", -40, 40, 400, 500),
            [{ id: "shirin", to: { x: 110 }, at: 1200, dur: 2400 }, { id: "plate", to: { x: 110 }, at: 1200, dur: 2400 }], walk("shirin", 1200, 2400),
            face("shirin", "joy", 3600)) },
          { caption: "حالا می‌خواهد خودش کفش‌هایش را بپوشد. سخت است. نشد!", key: 4400, do: all(
            show("plate", 0, 0, 400), arms("shirin", 0, 0, 300, 400), face("shirin", "happy", 300), show("sh1 sh2", 1, 600, 400),
            [{ id: "shirin.eyeO", to: { y: 0.9 }, at: 800, dur: 400 }, { id: "shirin.armL", to: { r: 18 }, at: 1200, dur: 500 },
              { id: "sh1", to: { x: -3.6, y: -0.6, r: -40 }, at: 1700, dur: 700 }, { id: "sh1", to: { y: -2 }, at: 2400, dur: 300, yoyo: true, times: 2 },
              { id: "sh1", path: "M-3.6 -0.6Q-7 -6 -9 0.6", at: 3100, dur: 600 }, { id: "sh1", to: { r: -60 }, at: 3100, dur: 600 }],
            face("shirin", "sorry", 3700), arms("shirin", 0, 0, 3700, 500)) },
          { caption: "یک نفس آرام می‌کشد و دوباره امتحان می‌کند. باز هم سخت است.", key: 6400, hold: 7400, do: all(
            [{ id: "shirin.eyeO", to: { y: 0 }, dur: 300 }],
            face("shirin", "breatheIn", 300), breathe("shirin", 400, 1600, 2000), face("shirin", "breatheOut", 2000),
            [{ id: "puff", to: { o: 1 }, at: 2100, dur: 300 }, { id: "puff", to: { x: 9 }, at: 2100, dur: 1500 }, { id: "puff", to: { o: 0, x: 3 }, at: 3600, dur: 300 }],
            face("shirin", "happy", 4000),
            [{ id: "shirin.eyeO", to: { y: 0.9 }, at: 4000, dur: 300 }, { id: "shirin.armL", to: { r: 18 }, at: 4200, dur: 400 },
              { id: "sh1", to: { x: -3.2, y: -0.8, r: -15 }, at: 4500, dur: 700 }, { id: "sh1", to: { r: 15 }, at: 5300, dur: 300, yoyo: true, times: 4 },
              { id: "sh1", to: { x: -8, y: 0.6, r: -50 }, at: 6600, dur: 500 }],
            face("shirin", "sorry", 6400)) },
          { caption: "از بابا کمک می‌خواهد: «می‌شود کمکم کنی؟» بابا نشانش می‌دهد که چطور.", key: 6600, hold: 7600, do: all(
            arms("shirin", 0, 0, 0, 400), [{ id: "shirin.eyeO", to: { x: -0.8, y: 0 }, at: 200, dur: 400 }],
            [{ id: "dad", to: { x: 80 }, at: 300, dur: 2200 }], walk("dad", 300, 2200), talk("shirin", 1200, 1800),
            face("dad", "happy", 2400), talk("dad", 3200, 2400),
            [{ id: "dad.armR", to: { r: -30 }, at: 3400, dur: 600 }, { id: "dad.armR", to: { r: -14 }, at: 4000, dur: 700, yoyo: true, times: 4 },
              { id: "shirin.eyeO", to: { x: 0, y: 0.9 }, at: 4200, dur: 400 }]) },
          { caption: "این بار خودش کفش‌هایش را پوشید! «خودم توانستم!»", key: 6400, hold: 7400, do: all(
            [{ id: "dad.armR", to: { r: 0 }, dur: 500 }, { id: "shirin.armL", to: { r: 18 }, at: 400, dur: 400 },
              { id: "sh1", to: { x: -2.9, y: -0.9, r: 0 }, at: 700, dur: 1000 },
              { id: "shirin.armL", to: { r: 0 }, at: 1800, dur: 400 }, { id: "shirin.armR", to: { r: -18 }, at: 2200, dur: 400 },
              { id: "sh2", to: { x: 2.9, y: -0.9, r: 0 }, at: 2500, dur: 1000 }, { id: "shirin.armR", to: { r: 0 }, at: 3600, dur: 400 },
              { id: "shirin.eyeO", to: { y: 0 }, at: 3800, dur: 300 }],
            face("shirin", "joy", 4000), arms("shirin", 140, -140, 4200, 500), talk("shirin", 4400, 1200),
            [{ id: "shirin", to: { y: "-5" }, at: 4800, dur: 1400, yoyo: true, times: 2, ease: "out" },
              { emit: "spark", where: [110, 44], spread: [26, 14], n: 10, at: 5000, dur: 1200, life: 1400 }],
            face("dad", "joy", 4400)) }
        ] },
      { type: "talk", scene: "🧼 🍽️ 👟 💪", caption: "تو چه کارهایی را خودت انجام می‌دهی؟ چه کاری هنوز برایت سخت است؟",
        tips: [
          "کارهایی را که کودک خودش می‌کند با هم بشمارید و برایش ذوق کنید: «خودت دست‌هایت را شستی!»",
          "به کار سخت بگویید «هنوز»: «هنوز بستن دکمه برایت سخت است. تمرین می‌کنیم.»",
          "به کودک وقت بدهید. اگر زود کار را خودتان تمام کنید، فرصت «خودم توانستم» را از او می‌گیرید."
        ] },
      { type: "doit", pic: "💪", text: "یکی از این کارها را همین حالا خودت انجام بده:",
        list: ["دست‌هایت را بشوی.", "کفش یا دمپایی‌ات را بپوش.", "بشقاب یا لیوانت را سر جایش ببر.", "اسباب‌بازی‌هایت را در جعبه بگذار."] },
      { type: "doit", pic: "🔁", text: "یک کار سخت را انتخاب کن (مثل پوشیدن جوراب). امتحان کن. اگر نشد، یک نفس آرام بکش و دوباره امتحان کن. اگر باز هم نشد، بگو: «می‌شود کمکم کنی؟»" },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "تو کارهای زیادی را خودت می‌توانی انجام دهی. وقتی سخت است، دوباره امتحان کن یا کمک بخواه.", pic: "💪",
        tips: [
          "کار را کوچک کنید: جوراب را تا نیمه بپوشانید و بگذارید بقیه‌اش را خودش بکشد. کم‌کم سهم خودش را بیشتر کنید.",
          "از تلاش تعریف کنید، نه از نتیجه: «دیدم دوباره امتحان کردی!» (به کودک نمی‌گوییم «باهوش»).",
          "کمک خواستن را هم تشویق کنید. خودم توانستم و «می‌شود کمکم کنی؟» هر دو خوب‌اند.",
          "اگر کودک بعد از یک دورهٔ سخت کارهایی را که بلد بود دیگر انجام نمی‌دهد (مثل غذا خوردن یا دستشویی رفتن)، این در کودکان کوچک رایج است. با صبر کمکش کنید و اگر چند هفته ادامه داشت، با پزشک مشورت کنید."
        ] }
    ]
  },
  {
    id: "feel-seed-8", subject: "feel", level: "seed", emoji: "🎲", title: "بازی احساس‌ها",
    steps: [
      { type: "pairs", practice: true, prompt: "هر صورت را با چیزی که شد جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "😊", say: "خوشحال" }, { pic: "🎂", say: "جشن تولد" }],
          [{ pic: "😢", say: "غمگین" }, { pic: "🎈", say: "بادکنکش رفت" }],
          [{ pic: "😠", say: "عصبانی" }, { pic: "🧱", say: "کسی برجش را خراب کرد" }],
          [{ pic: "😟", say: "نگران" }, { pic: "🏫", say: "فردا روز اول مدرسه است" }],
          [{ pic: "😌", say: "آرام" }, { pic: "🌙", say: "قصهٔ شب در رختخواب" }]
        ] },
      { type: "sort", practice: true, prompt: "کدام کار مهربان است؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "💚", label: "مهربان", value: "kind" }, { pic: "💔", label: "کسی ناراحت می‌شود", value: "hurt" }],
        items: [
          { pic: "🤗", label: "بغل کردن", say: "بغل کردن دوست غمگین", basket: "kind" },
          { pic: "🤝", label: "کمک کردن", say: "کمک کردن برای ساختن برج", basket: "kind" },
          { pic: "🍎", label: "قسمت کردن", say: "قسمت کردن سیب", basket: "kind" },
          { pic: "⏳", label: "صبر کردن", say: "صبر کردن تا نوبتم شود", basket: "kind" },
          { pic: "🚫", label: "بازی ندادن", say: "بازی ندادن به یک بچه", basket: "hurt" },
          { pic: "✊", label: "قاپیدن", say: "قاپیدن اسباب‌بازی از دست کسی", basket: "hurt" }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "کارهای لاک‌پشت را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "✋", label: "بایست", say: "بایست" },
          { pic: "🐢", label: "برو توی لاکت", say: "برو توی لاکت" },
          { pic: "🌷", label: "سه نفس آرام", say: "سه نفس آرام بکش" },
          { pic: "🗣️", label: "بیرون بیا و بگو", say: "بیرون بیا و بگو چه حسی داری" }
        ] },
      { type: "pairs", practice: true, prompt: "وقتی دوستت این حس را دارد، چه کار مهربانی می‌کنی؟ جفتشان کن.",
        pairs: [
          [{ pic: "😢", say: "دوستم غمگین است" }, { pic: "🤗", say: "بغلش می‌کنم" }],
          [{ pic: "🧱", say: "برجش افتاد" }, { pic: "🤝", say: "کمکش می‌کنم" }],
          [{ pic: "🍪", say: "خوراکی ندارد" }, { pic: "🌗", say: "خوراکی‌ام را با او قسمت می‌کنم" }]
        ] },
      { type: "feelings" }
    ]
  },
  // ---------------- Sprout (جوانه): more words for feelings, their size, friends, choices ----------------
  {
    id: "feel-sprout-1", subject: "feel", level: "sprout", emoji: "🌈", title: "احساس‌های تازه",
    steps: [
      /* Seven new feeling words, one small story each: shy (Mina sings in front of the class), excited (Arash before
         a trip to the sea), disappointed (rain on Shirin's park day), jealous (Mom holds the new baby), proud
         (Yasaman's drawing), missing (Kian and a photo), bored (Sam waiting); then all seven side by side. */
      { type: "scene", prompt: "اسم‌های تازه برای حس‌ها", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          k1: { art: "fl-sam", at: [20, 86], s: 1.1 }, k2: { art: "fl-aydin", at: [38, 86], s: 1.1 },
          teacher: { art: "fl-teacher", at: [132, 88], s: 1.55 },
          dad: { art: "fl-dad", at: [128, 88], s: 1.55, o: 0 },
          mom: { art: "fl-mom", at: [112, 88], s: 1.55, o: 0 }, baby: { art: "fl-baby", at: [0, -12], s: 0.4, under: "mom" },
          mina: { art: "fl-mina", at: [80, 86], s: 1.3 },
          arash: { art: "fl-arash", at: [80, 86], s: 1.3, o: 0 }, bag: { art: "fl-bag", at: [104, 86], s: 1.2, o: 0 },
          think: { art: "fl-think", at: [88, 40], o: 0 }, sea: { art: "🌊", at: [16, -18], s: 0.9, under: "think" },
          shirin: { art: "fl-shirin", at: [118, 86], s: 1.3, o: 0 }, ball: { art: "ball-side", at: [96, 86], s: 1.3, o: 0 },
          aydin: { art: "fl-aydin", at: [56, 86], s: 1.3, o: 0 },
          yas: { art: "fl-yas", at: [66, 86], s: 1.3, o: 0 }, paper: { art: "fl-paper", at: [88, 72], s: 0.8, o: 0 },
          kian: { art: "fl-kian", at: [80, 86], s: 1.3, o: 0 }, photo: { art: "fl-photo", at: [80, 70], s: 0.8, o: 0 },
          sam: { art: "fl-sam", at: [80, 86], s: 1.3, o: 0 }, clock: { art: "🕰️", at: [128, 46], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "مینا باید جلوی بچه‌ها شعر بخواند. صورتش داغ می‌شود و سرش را پایین می‌اندازد. مینا خجالت‌زده است.", key: 4200, do: all(
            face("teacher", "happy", 0), face("k1", "happy", 0), face("k2", "happy", 0),
            face("mina", "shy", 600), [{ id: "mina.flush", to: { o: 1 }, at: 1000, dur: 1200 }, { id: "mina.eyeO", to: { y: 0.9 }, at: 1000, dur: 500 },
              { id: "mina.head", to: { r: 8 }, at: 1200, dur: 800 }], arms("mina", -22, 22, 1400, 700),
            [{ id: "mina", to: { x: "-1" }, at: 2400, dur: 600, yoyo: true, times: 2 }]) },
          { caption: "فردا آرش و خانواده‌اش به سفر می‌روند، کنار دریا. آرش نمی‌تواند صبر کند! آرش هیجان‌زده است.", do: all(
            show("mina teacher k1 k2", 0, 0, 600), show("arash bag", 1, 600, 600), show("think", 1, 1300, 600),
            face("arash", "joy", 1600), arms("arash", 150, -150, 1800, 400),
            [{ id: "arash", to: { y: "-6" }, at: 2200, dur: 2800, yoyo: true, times: 6, ease: "out" },
              { emit: "spark", where: [80, 40], spread: [24, 12], n: 10, at: 2400, dur: 2400, life: 1200 }]) },
          { caption: "شیرین می‌خواست به پارک برود، اما باران گرفت. شیرین ناامید است.", key: 4200, do: all(
            show("arash bag think", 0, 0, 600), show("shirin ball", 1, 600, 600),
            [{ id: "shirin.eyeO", to: { x: 0.6, y: -0.8 }, at: 1000, dur: 500 },
              { emit: "drop", where: [127, 22], spread: [26, 16], rise: -6, n: 70, at: 900, dur: 4600, life: 1300 }],
            face("shirin", "sad", 2200),
            [{ id: "shirin.upper", to: { y: 1.4 }, at: 2400, dur: 1200 }, { id: "shirin.head", to: { y: 1 }, at: 2400, dur: 1200 }]) },
          { caption: "مامان همه‌اش بچه کوچولو را بغل می‌کند. آیدین دلش می‌خواهد مامان فقط مال او باشد. آیدین حسودی‌اش می‌شود.", key: 4400, do: all(
            show("shirin ball", 0, 0, 600), show("mom aydin", 1, 600, 600), cross("mom", true, 0, 1),
            face("mom", "happy", 0, 1), face("baby", "happy", 0, 1),
            [{ id: "mom.head", to: { r: 10 }, at: 1200, dur: 700 }, { id: "aydin.eyeO", to: { x: 0.8 }, at: 1400, dur: 500 }],
            face("aydin", "cross", 2000), cross("aydin", true, 2400, 700),
            [{ id: "aydin.flush", to: { o: 0.6 }, at: 2800, dur: 900 }, { id: "aydin.head", to: { r: -6 }, at: 3000, dur: 700 }]) },
          { caption: "یاسمن یک نقاشی کشید و خیلی برایش زحمت کشید. یاسمن سربلند است.", do: all(
            show("mom aydin", 0, 0, 600), show("yas paper dad", 1, 600, 600),
            [{ id: "yas.armR", to: { r: -40 }, at: 1200, dur: 600 }, { id: "paper", to: { y: 66 }, at: 1600, dur: 800 },
              { id: "yas.upper", to: { y: -1.2, sx: 1.04 }, at: 1800, dur: 800 }, { id: "yas.head", to: { r: -6 }, at: 1800, dur: 800 }],
            face("yas", "joy", 1800), face("dad", "joy", 2400),
            [{ id: "dad.armL", to: { r: -40 }, at: 2800, dur: 300, yoyo: true, times: 8 }, { id: "dad.armR", to: { r: 40 }, at: 2800, dur: 300, yoyo: true, times: 8 }]) },
          { caption: "دوست کیان به شهر دیگری رفته. کیان به عکسش نگاه می‌کند. کیان دلتنگ است.", key: 3600, do: all(
            show("yas paper dad", 0, 0, 600), show("kian photo", 1, 600, 600), arms("kian", -36, 36, 600, 1),
            [{ id: "kian.eyeO", to: { y: 0.9 }, at: 1200, dur: 500 }, { id: "kian.head", to: { r: 6 }, at: 1400, dur: 900 }],
            face("kian", "sad", 1800), [{ id: "kian.upper", to: { y: 1 }, at: 2200, dur: 1200 }]) },
          { caption: "سام کاری برای انجام دادن ندارد و منتظر است. وقت دیر می‌گذرد. سام بی‌حوصله است.", key: 4600, do: all(
            show("kian photo", 0, 0, 600), show("sam clock", 1, 600, 600),
            [{ id: "clock", to: { r: 6 }, at: 1200, dur: 4000, yoyo: true, times: 8 }, { id: "sam.eyeO", to: { x: 0.8, y: -0.6 }, at: 1400, dur: 600 }],
            face("sam", "bored", 2200), [{ id: "sam.head", to: { r: 12 }, at: 2400, dur: 1400 }, { id: "sam.upper", to: { y: 1.2 }, at: 2400, dur: 1400 },
              { id: "sam", to: { x: "-1.5" }, at: 3800, dur: 1600, yoyo: true, times: 2 }]) },
          { caption: "این‌ها هم حس‌اند و هر کدام یک اسم دارد: خجالت‌زده، هیجان‌زده، ناامید، حسود، سربلند، دلتنگ، بی‌حوصله. همه‌شان طبیعی‌اند.", hold: 9000, do: all(
            show("clock", 0, 0, 500),
            ["mina", "arash", "shirin", "aydin", "yas", "kian", "sam"].map(function (k, i) { return { id: k, to: { x: 146 - i * 22, y: 86, s: 1.05, o: 1 }, at: 400 + i * 500, dur: 600 }; }),
            arms("aydin", 0, 0, 400, 1), arms("arash", 0, 0, 400, 1), arms("kian", 0, 0, 400, 1),
            [{ id: "sam.head", to: { r: 0 }, at: 400, dur: 1 }, { id: "sam.upper", to: { y: 0 }, at: 400, dur: 1 }, { id: "arash", to: { y: 86 }, at: 400, dur: 1 }],
            [{ id: "think", to: { o: 0 }, dur: 1 }],
            face("mina", "shy", 400), face("arash", "joy", 900), face("shirin", "sad", 1400), face("aydin", "cross", 1900),
            face("yas", "joy", 2400), face("kian", "sad", 2900), face("sam", "bored", 3400),
            ["mina", "arash", "shirin", "aydin", "yas", "kian", "sam"].map(function (k, i) { return { id: k, to: { y: 84.5 }, at: 4600 + i * 500, dur: 400, yoyo: true, times: 2 }; })) }
        ] },
      { type: "pairs", practice: true, prompt: "هر قصه را با اسم حسش جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "🎤", say: "باید جلوی بچه‌ها شعر بخواند" }, { label: "خجالت‌زده", say: "خجالت‌زده" }],
          [{ pic: "🧳", say: "فردا به سفر می‌رود" }, { label: "هیجان‌زده", say: "هیجان‌زده" }],
          [{ pic: "🌧️", say: "می‌خواست به پارک برود، اما باران گرفت" }, { label: "ناامید", say: "ناامید" }],
          [{ pic: "👶", say: "مامان همه‌اش بچه کوچولو را بغل می‌کند" }, { label: "حسود", say: "حسود" }],
          [{ pic: "🖼️", say: "نقاشی‌اش را با زحمت تمام کرد" }, { label: "سربلند", say: "سربلند" }],
          [{ pic: "💌", say: "دوستش به شهر دیگری رفته" }, { label: "دلتنگ", say: "دلتنگ" }],
          [{ pic: "🕰️", say: "کاری ندارد و منتظر است" }, { label: "بی‌حوصله", say: "بی‌حوصله" }]
        ] },
      { type: "talk", scene: "😳 🤩 😞 😒 😊 💌 😐", caption: "تو کی خجالت‌زده شدی؟ کی هیجان‌زده بودی؟ کی ناامید شدی؟ کی به خودت افتخار کردی؟",
        tips: [
          "هر جوابی داد، بپذیرید. همهٔ این حس‌ها طبیعی‌اند، حتی حسودی.",
          "اسم دقیق حس را برایش بگویید: «انگار ناامید شدی، چون منتظر پارک بودی.»",
          "از حس‌های خودتان هم مثال بزنید: «من هم وقتی بچه بودم، جلوی کلاس خجالت می‌کشیدم.»",
          "اگر حسودی کرد، سرزنشش نکنید. بگویید: «می‌فهمم. دلت می‌خواهد بیشتر با من باشی.» و برایش وقت بگذارید."
        ] },
      { type: "talk", scene: "🎭 😳 🤩 😞", caption: "بازی پانتومیم: یک نفر یکی از این حس‌ها را با صورت و بدنش نشان می‌دهد و بقیه حدس می‌زنند.",
        tips: [
          "حس‌های تازه را بازی کنید: خجالت‌زده (سر پایین)، هیجان‌زده (بالا و پایین پریدن)، بی‌حوصله (خمیازه)، سربلند (سینه جلو).",
          "بعد از هر حدس بپرسید: «چه چیزی ممکن است کسی را این‌طور کند؟»",
          "نوبت را عوض کنید تا کودک هم حدس بزند و هم نشان دهد."
        ] },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-sprout-2", subject: "feel", level: "sprout", emoji: "📏", title: "احساس بزرگ، احساس کوچک",
    steps: [
      /* A feeling has a size, from 1 to 5 (the thermometer and its number): Kian's lost pencil is a small feeling
         (he says it and looks for it); his sister scribbles on his drawing, a big one (he stops, breathes, asks Mom
         for help); and the feeling gets smaller again. */
      { type: "scene", prompt: "حس‌ها اندازه دارند", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          table: { art: "fl-table", at: [60, 88], s: 1.3 },
          paper: { art: "fl-paper", at: [66, 63.5], s: 0.9 },
          mom: { art: "fl-mom", at: [-20, 88], s: 1.6 },
          kian: { art: "fl-kian", at: [40, 86], s: 1.35 },
          sis: { art: "fl-sis", at: [182, 86], s: 1.05 },
          pencil: { art: "fl-pencil", at: [104, 87], s: 1.3, o: 0 },
          heat: { art: "fl-heat", at: [0, -42], o: 0, under: "kian" }, puff: { art: "fl-puff", at: [3, -29], o: 0, under: "kian" },
          meter: { art: "fl-thermo", at: [140, 84], s: 0.85, o: 0 },
          counter: { art: "counter", at: [122, 52], o: 0 }
        },
        scenes: [
          { caption: "حس‌ها اندازه دارند: کوچک یا بزرگ. از یک تا پنج.", key: 4400, hold: 7000, do: all(
            [{ id: "meter.level", to: { sy: 0.15 }, dur: 1 }, { id: "meter", to: { o: 1 }, at: 300, dur: 500 }, { id: "counter", to: { o: 1 }, at: 500, dur: 300 },
              { id: "meter.level", to: { sy: 0.95 }, at: 800, dur: 3600, ease: "linear" }, { count: "counter", from: 1, to: 5, at: 800, dur: 3600 },
              { id: "meter.level", to: { sy: 0.15 }, at: 5200, dur: 1400 }, { count: "counter", from: 5, to: 1, at: 5200, dur: 1400 }]) },
          { caption: "مداد کیان گم شد. کیان کمی ناراحت شد: اندازه یک.", do: all(
            [{ id: "kian.head", to: { r: -10 }, at: 300, dur: 600 }, { id: "kian.head", to: { r: 10 }, at: 1100, dur: 800 }, { id: "kian.head", to: { r: 0 }, at: 2100, dur: 500 }],
            face("kian", "sorry", 1200), [{ id: "meter.level", to: { sy: 0.2 }, at: 1600, dur: 600 }]) },
          { caption: "برای یک حس کوچک، گفتنش کافی است: «مدادم کجاست؟» کیان می‌گردد و پیدایش می‌کند.", key: 5600, do: all(
            talk("kian", 300, 1600), [{ id: "pencil", to: { o: 1 }, at: 1800, dur: 400 }, { id: "kian.eyeO", to: { x: 0.8, y: 0.8 }, at: 2000, dur: 400 },
              { id: "kian", to: { x: 92 }, at: 2400, dur: 1600 }], walk("kian", 2400, 1600),
            [{ id: "kian.armR", to: { r: -20 }, at: 4100, dur: 400 }, { id: "pencil", to: { x: 101, y: 70, r: -60 }, at: 4400, dur: 600 }],
            face("kian", "happy", 4600), [{ id: "meter.level", to: { sy: 0.1 }, at: 4600, dur: 600 }, { id: "kian.eyeO", to: { x: 0, y: 0 }, at: 4800, dur: 300 }]) },
          { caption: "بعد خواهرش روی نقاشی کیان خط‌خطی کشید. کیان خیلی عصبانی شد: اندازه چهار.", key: 6000, do: all(
            show("pencil", 0, 0, 300), [{ id: "kian.armR", to: { r: 0 }, dur: 400 }, { id: "kian", to: { x: 40 }, at: 300, dur: 1400 }], walk("kian", 300, 1400),
            [{ id: "sis", to: { x: 88 }, at: 600, dur: 2000 }], walk("sis", 600, 2000),
            [{ id: "sis.armL", to: { r: 50 }, at: 2700, dur: 300 }, { id: "sis.armL", to: { r: 30 }, at: 3000, dur: 300, yoyo: true, times: 4 },
              { id: "paper.scribble", to: { o: 1 }, at: 2800, dur: 100 }, { id: "paper.scribble", draw: true, at: 2800, dur: 1200 },
              { id: "sis.armL", to: { r: 0 }, at: 4200, dur: 300 }],
            face("sis", "happy", 2600), face("kian", "angry", 4200), fists("kian", true, 4400),
            [{ id: "kian.flush", to: { o: 1 }, at: 4400, dur: 900 }, { id: "heat", to: { o: 1 }, at: 4800, dur: 400 },
              { id: "meter.level", to: { sy: 0.75 }, at: 4400, dur: 1400, ease: "in" }, { count: "counter", from: 1, to: 4, at: 4400, dur: 1400 }],
            face("sis", "oops", 5000)) },
          { caption: "برای یک حس بزرگ، اول می‌ایستیم و آرام نفس می‌کشیم.", key: 8700, hold: 9000, do: all(
            fists("kian", false, 300),
            face("kian", "breatheIn", 600), breathe("kian", 700, 1800, 2200), face("kian", "breatheOut", 2500),
            [{ id: "puff", to: { o: 1 }, at: 2600, dur: 300 }, { id: "puff", to: { x: 9 }, at: 2600, dur: 1800 }, { id: "puff", to: { o: 0, x: 3 }, at: 4400, dur: 300 }],
            face("kian", "breatheIn", 4900), breathe("kian", 5000, 1800, 2200), face("kian", "breatheOut", 6800),
            [{ id: "heat", to: { o: 0 }, at: 2600, dur: 1200 }, { id: "kian.flush", to: { o: 0 }, at: 2600, dur: 5000 },
              { id: "meter.level", to: { sy: 0.45 }, at: 2600, dur: 5000 }, { count: "counter", from: 4, to: 3, at: 4400, dur: 1 }, { count: "counter", from: 3, to: 3, at: 7200, dur: 1 }],
            face("kian", "sorry", 8000)) },
          { caption: "بعد از یک بزرگ‌تر کمک می‌خواهد: «مامان، نقاشی‌ام خط‌خطی شد.» مامان کمک می‌کند.", key: 6200, do: all(
            [{ id: "mom", to: { x: 18 }, dur: 1600 }], walk("mom", 0, 1600), [{ id: "kian.eyeO", to: { x: -0.8 }, at: 800, dur: 400 }],
            talk("kian", 1800, 2000), face("mom", "caring", 1800),
            [{ id: "mom.armR", to: { r: -70 }, at: 4000, dur: 600 }], talk("mom", 4200, 1400), face("sis", "sorry", 4600),
            [{ id: "meter.level", to: { sy: 0.3 }, at: 4000, dur: 1400 }, { count: "counter", from: 3, to: 2, at: 4400, dur: 1 }]) },
          { caption: "حس‌ها کم‌کم کوچک می‌شوند. حالا کیان آرام است، و یک نقاشی تازه می‌کشد.", key: 5000, do: all(
            [{ id: "mom.armR", to: { r: 0 }, dur: 500 }, { id: "kian.eyeO", to: { x: 0 }, at: 300, dur: 300 },
              { id: "paper.scribble", to: { o: 0 }, at: 600, dur: 700 }, { id: "paper.pic", to: { o: 0 }, at: 600, dur: 700 },
              { id: "kian.armR", to: { r: -62 }, at: 1400, dur: 500 }, { id: "paper.pic", to: { o: 1 }, at: 1700, dur: 100 }, { id: "paper.pic", draw: true, oneByOne: true, at: 1800, dur: 3000 },
              { id: "meter.level", to: { sy: 0.12 }, at: 600, dur: 2400 }, { count: "counter", from: 2, to: 1, at: 1800, dur: 1 }],
            face("kian", "calm", 1200), face("mom", "happy", 1200), face("sis", "happy", 2600), face("kian", "happy", 4400)) }
        ] },
      { type: "meter", pic: "😟", prompt: "به یک حسی که امروز داشتی فکر کن. چقدر بزرگ بود؟",
        replies: [
          "یک حس کوچک است. می‌توانی بگویی‌اش و به کارت ادامه بدهی.",
          "یک حس کوچک است. گفتنش کمک می‌کند.",
          "حس متوسطی است. یک نفس آرام و گفتنش کمک می‌کند.",
          "حس بزرگی است. اول بایست و آرام نفس بکش، بعد از یک بزرگ‌تر کمک بخواه.",
          "حس خیلی بزرگی است. اول بایست و آرام نفس بکش، بعد از یک بزرگ‌تر کمک بخواه. کم‌کم کوچک می‌شود."
        ] },
      { type: "sort", practice: true, prompt: "کدام کار برای یک حس کوچک خوب است، کدام برای یک حس بزرگ؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "🙂", label: "حس کوچک", value: "small" }, { pic: "🌋", label: "حس بزرگ", value: "big" }],
        items: [
          { pic: "🗣️", label: "گفتنش", say: "گفتنش با یک جمله", basket: "small" },
          { pic: "▶️", label: "ادامه دادن", say: "ادامه دادن به کارم", basket: "small" },
          { pic: "🔎", label: "دنبالش گشتن", say: "دنبال مدادم گشتن", basket: "small" },
          { pic: "✋", label: "ایستادن", say: "ایستادن و چند نفس آرام", basket: "big" },
          { pic: "🙋", label: "کمک خواستن", say: "کمک خواستن از یک بزرگ‌تر", basket: "big" },
          { pic: "🧸", label: "رفتن به جای آرام", say: "رفتن به یک جای آرام و بغل کردن عروسک", basket: "big" }
        ] },
      { type: "breathe", cycles: 3 },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-sprout-3", subject: "feel", level: "sprout", emoji: "🚲", title: "هنوز نه!",
    steps: [
      /* Learning to ride a bike (seen from the front): Nika wobbles and tumbles onto the grass, says «نمی‌توانم!»,
         Dad says «هنوز نمی‌توانی»; she tries again with Dad holding the bike, practises day after day, and one day
         rides by herself. */
      { type: "scene", prompt: "نیکا دوچرخه‌سواری یاد می‌گیرد", bg: "#cfe8f5",
        parts: {
          park: { art: "fl-park" },
          brain: { art: "🧠", at: [80, 22], s: 0.4, o: 0 },
          counter: { art: "counter", at: [140, 22], o: 0 },
          down: { art: "fl-bike-down", at: [96, 86], s: 1.4, o: 0 },
          dad: { art: "fl-dad", at: [126, 88], s: 1.55 },
          nika2: { art: "fl-nika", at: [72, 86], s: 1.3, o: 0 },
          ride: { art: "fl-none", at: [44, 86] },
          nika: { art: "fl-nika", at: [0, -6], s: 1.25, under: "ride" }, bike: { art: "fl-bike-front", at: [0, 0], s: 1.25, under: "ride" }
        },
        scenes: [
          { caption: "نیکا یک دوچرخه دارد و می‌خواهد دوچرخه‌سواری یاد بگیرد. بابا کنارش است.", do: all(
            arms("nika", -30, 30, 0, 1), face("nika", "joy", 600), face("dad", "happy", 800),
            [{ id: "nika.legL", to: { y: -2 }, at: 1400, dur: 500, yoyo: true, times: 4 }, { id: "nika.legR", to: { y: -2 }, at: 1650, dur: 500, yoyo: true, times: 4 }]) },
          { caption: "پا می‌زند. دوچرخه کج و راست می‌شود... و نیکا زمین می‌خورد، روی چمن‌ها.", key: 5400, do: all(
            [{ id: "ride", to: { x: 84 }, at: 300, dur: 3000, ease: "linear" }, { id: "ride", to: { r: 10 }, at: 600, dur: 2400, yoyo: true, times: 4 },
              { id: "nika.legL", to: { y: -2 }, at: 300, dur: 3000, yoyo: true, times: 8 }, { id: "nika.legR", to: { y: -2 }, at: 500, dur: 2800, yoyo: true, times: 8 }],
            face("nika", "oops", 2600),
            [{ id: "ride", to: { r: 55, x: 92 }, at: 3300, dur: 500, ease: "in" }, { id: "ride", to: { o: 0 }, at: 3800, dur: 200 },
              { id: "down", to: { o: 1 }, at: 3800, dur: 200 }, { id: "nika2", to: { o: 1 }, at: 3800, dur: 200 },
              { id: "nika2.legL", to: { sy: 0.5 }, at: 3800, dur: 1 }, { id: "nika2.legR", to: { sy: 0.5 }, at: 3800, dur: 1 }, { id: "nika2", to: { y: 88 }, at: 3800, dur: 1 }],
            face("nika2", "oops", 3800, 1)) },
          { caption: "نیکا روی چمن می‌نشیند. ناراحت است و می‌گوید: «نمی‌توانم! هیچ‌وقت یاد نمی‌گیرم.»", do: all(
            face("nika2", "sad", 300), [{ id: "nika2.upper", to: { y: 1.2 }, at: 600, dur: 900 }], talk("nika2", 1200, 2400),
            [{ id: "nika2.eyeO", to: { y: 0.8 }, at: 1000, dur: 400 }]) },
          { caption: "بابا کنارش می‌آید و می‌گوید: «هنوز نمی‌توانی. هنوز! با تمرین یاد می‌گیری.»", do: all(
            [{ id: "dad", to: { x: 104 }, dur: 1400 }], walk("dad", 0, 1400), face("dad", "caring", 1200), talk("dad", 1600, 2600),
            [{ id: "nika2.eyeO", to: { x: 0.8, y: -0.6 }, at: 1600, dur: 400 }, { id: "nika2.upper", to: { y: 0 }, at: 3000, dur: 600 }],
            face("nika2", "happy", 4000)) },
          { caption: "نیکا دوباره امتحان می‌کند. این بار بابا پشت دوچرخه را نگه می‌دارد.", key: 5200, do: all(
            [{ id: "nika2", to: { o: 0 }, dur: 400 }, { id: "down", to: { o: 0 }, dur: 400 },
              { id: "ride", to: { x: 40, r: 0 }, dur: 1 }, { id: "ride", to: { o: 1 }, at: 300, dur: 400 }, { id: "dad", to: { x: 22 }, at: 300, dur: 1600 }],
            walk("dad", 300, 1600), face("nika", "happy", 300), face("dad", "happy", 1800),
            [{ id: "dad.armR", to: { r: -60 }, at: 1900, dur: 400 },
              { id: "ride", to: { x: 100 }, at: 2400, dur: 3400, ease: "linear" }, { id: "dad", to: { x: 82 }, at: 2400, dur: 3400, ease: "linear" },
              { id: "ride", to: { r: 4 }, at: 2400, dur: 3400, yoyo: true, times: 4 },
              { id: "nika.legL", to: { y: -2 }, at: 2400, dur: 3400, yoyo: true, times: 10 }, { id: "nika.legR", to: { y: -2 }, at: 2600, dur: 3200, yoyo: true, times: 10 }],
            walk("dad", 2400, 3400)) },
          { caption: "هر روز تمرین می‌کند: یک روز، دو روز، سه روز... مغز ما با هر تمرین چیزهای تازه یاد می‌گیرد.", key: 7200, hold: 8000, do: all(
            [{ id: "dad.armR", to: { r: 0 }, dur: 400 }, { id: "counter", to: { o: 1 }, at: 200, dur: 300 }, { count: "counter", from: 1, to: 3, at: 400, dur: 6000 },
              { id: "brain", to: { o: 1 }, at: 400, dur: 400 }, { id: "brain", to: { s: 0.8 }, at: 400, dur: 6400 }],
            [0, 1, 2].map(function (i) { return { id: "ride", to: { x: i % 2 ? 100 : 46 }, at: 400 + i * 2000, dur: 1800 }; }),
            [0, 1, 2].map(function (i) { return { id: "dad", to: { x: i % 2 ? 82 : 28 }, at: 400 + i * 2000, dur: 1800 }; }),
            [{ id: "nika.legL", to: { y: -2 }, at: 400, dur: 6000, yoyo: true, times: 16 }, { id: "nika.legR", to: { y: -2 }, at: 600, dur: 5800, yoyo: true, times: 16 }],
            walk("dad", 400, 6000), face("nika", "joy", 1000)) },
          { caption: "یک روز بابا دوچرخه را ول می‌کند و نیکا خودش می‌رود! «توانستم!»", key: 4600, do: all(
            show("brain counter", 0, 0, 500),
            [{ id: "ride", to: { x: 40 }, dur: 1 }, { id: "dad", to: { x: 22 }, dur: 1 }, { id: "dad.armR", to: { r: -60 }, dur: 1 },
              { id: "ride", to: { x: 130 }, at: 600, dur: 4000, ease: "linear" }, { id: "dad", to: { x: 50 }, at: 600, dur: 1200, ease: "linear" },
              { id: "dad.armR", to: { r: -150 }, at: 1900, dur: 400 },
              { id: "nika.legL", to: { y: -2 }, at: 600, dur: 4000, yoyo: true, times: 12 }, { id: "nika.legR", to: { y: -2 }, at: 800, dur: 3800, yoyo: true, times: 12 },
              { emit: "spark", where: [120, 40], spread: [30, 14], n: 10, at: 3600, dur: 1400, life: 1400 }],
            walk("dad", 600, 1200), face("dad", "joy", 1900), face("nika", "joy", 600), talk("nika", 3400, 1200)) }
        ] },
      { type: "talk", scene: "🚲 🌱 💪", caption: "تو چه کاری را «هنوز» نمی‌توانی؟ چه کاری را قبلاً نمی‌توانستی و حالا با تمرین یاد گرفته‌ای؟",
        tips: [
          "به جملهٔ کودک «هنوز» اضافه کنید: «نمی‌توانم بند کفشم را ببندم» → «هنوز نمی‌توانم».",
          "از کارهایی بگویید که او با تمرین یاد گرفته: راه رفتن، حرف زدن، قاشق دست گرفتن.",
          "از تلاش و تمرینش تعریف کنید، نه از «باهوش» بودنش: «چند بار امتحان کردی تا شد!»"
        ] },
      { type: "sort", practice: true, prompt: "کدام حرف وقتی کاری سخت است کمک می‌کند؟ هر حرف را بزن تا بشنوی.",
        baskets: [{ pic: "🌱", label: "کمک می‌کند", value: "yes" }, { pic: "🥀", label: "دلسرد می‌کند", value: "no" }],
        items: [
          { pic: "⏳", label: "هنوز نه", say: "هنوز نمی‌توانم، اما یاد می‌گیرم.", basket: "yes" },
          { pic: "🔁", label: "دوباره", say: "دوباره امتحان می‌کنم.", basket: "yes" },
          { pic: "🙋", label: "کمک", say: "می‌شود کمکم کنی؟", basket: "yes" },
          { pic: "🐢", label: "آرام‌آرام", say: "آرام‌آرام تمرین می‌کنم.", basket: "yes" },
          { pic: "🚫", label: "هیچ‌وقت", say: "من هیچ‌وقت یاد نمی‌گیرم.", basket: "no" },
          { pic: "🗑️", label: "ولش کن", say: "بلد نیستم، ولش کن.", basket: "no" }
        ] },
      { type: "talk", scene: "📝 ⏳ 🌱", caption: "با بزرگ‌ترت یک فهرست «هنوز» درست کنید: سه کاری که هنوز نمی‌توانی و می‌خواهی تمرین کنی.",
        tips: [
          "فهرست را روی کاغذ بنویسید یا بکشید و به دیوار بزنید. هر بار که یکی را یاد گرفت، کنارش یک ستاره بکشید.",
          "کارهای کوچک و شدنی انتخاب کنید: پریدن روی یک پا، بستن دکمه، شمردن تا بیست.",
          "شما هم یک کار «هنوز» خودتان را بگویید و تمرین کنید."
        ] },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "وقتی کاری سخت است، بگو: «هنوز نمی‌توانم.» با تمرین، یاد می‌گیری.", pic: "🌱",
        tips: [
          "کودکی که شنیده «هنوز»، اشتباه را بخشی از یاد گرفتن می‌بیند و زودتر دست نمی‌کشد.",
          "وقتی کودک دلسرد است، اول حسش را بپذیرید: «سخت است، می‌دانم.» بعد کمکش کنید کار را کوچک‌تر کند.",
          "کمک کنید، اما کار را به جایش انجام ندهید. مثل بابای نیکا: اول نگه دارید، بعد کم‌کم ول کنید.",
          "خودتان هم اشتباه‌هایتان را بلند بگویید و نشان دهید که دوباره امتحان می‌کنید."
        ] }
    ]
  },
  {
    id: "feel-sprout-4", subject: "feel", level: "sprout", emoji: "🌦️", title: "هر کس یک جور",
    steps: [
      /* The same thing, two feelings: rain (Mina jumps for joy, Sam wants to go in), a dog (Aydin is delighted,
         Shirin hides behind Dad), a loud party (Yasaman dances, Arash covers his ears); both are all right. */
      { type: "scene", prompt: "یک چیز، دو حس", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" }, room: { art: "fl-room", o: 0 },
          rain: { art: "fl-rain", o: 0 },
          mina: { art: "fl-mina", at: [50, 86], s: 1.3 }, sam: { art: "fl-sam", at: [118, 86], s: 1.3 },
          aydin: { art: "fl-aydin", at: [34, 86], s: 1.3, o: 0 },
          shirin: { art: "fl-shirin", at: [104, 86], s: 1.25, o: 0 }, dad: { art: "fl-dad", at: [126, 88], s: 1.55, o: 0 },
          dog: { art: "fl-dog", at: [190, 86], s: 1.4, o: 0 },
          yas: { art: "fl-yas", at: [50, 86], s: 1.3, o: 0 }, arash: { art: "fl-arash", at: [114, 86], s: 1.3, o: 0 },
          notes: { art: "fl-notes", at: [80, 30], s: 1.6, o: 0 }
        },
        scenes: [
          { caption: "باران می‌آید. مینا خوشحال است و بالا و پایین می‌پرد. سام کمی می‌ترسد و می‌خواهد زود به خانه برود.", key: 3800, do: all(
            [{ id: "rain", to: { o: 1 }, at: 200, dur: 600 }, { id: "rain.fall", to: { y: 6 }, at: 200, dur: 6000, ease: "linear", times: 10 }],
            face("mina", "joy", 800), arms("mina", 150, -150, 1000, 500),
            [{ id: "mina", to: { y: "-5" }, at: 1400, dur: 3600, yoyo: true, times: 8, ease: "out" }],
            face("sam", "worried", 900), arms("sam", -30, 30, 1200, 500),
            [{ id: "sam", to: { x: 134 }, at: 2000, dur: 1600 }], walk("sam", 2000, 1600)) },
          { caption: "یک سگ مهربان می‌آید. آیدین ذوق می‌کند. شیرین می‌ترسد و پشت بابا می‌رود.", key: 5200, do: all(
            show("mina sam rain", 0, 0, 600), show("aydin shirin dad dog", 1, 600, 500),
            [{ id: "dog", to: { x: 82 }, at: 1000, dur: 2600, ease: "out" },
              { id: "dog.legF", to: { r: 18 }, at: 1000, dur: 2600, yoyo: true, times: 8 }, { id: "dog.legB", to: { r: -18 }, at: 1000, dur: 2600, yoyo: true, times: 8 },
              { id: "dog.tail", to: { r: 20 }, at: 1000, dur: 4800, yoyo: true, times: 12 }],
            face("aydin", "joy", 2200), [{ id: "aydin.armR", to: { r: -40 }, at: 3800, dur: 500 }],
            face("shirin", "scared", 2400), [{ id: "shirin", to: { x: 140 }, at: 2800, dur: 1200 }], walk("shirin", 2800, 1200),
            face("dad", "caring", 3600), [{ id: "dad.armR", to: { r: -50 }, at: 4000, dur: 600 }]) },
          { caption: "در جشن، موسیقی بلند است. یاسمن می‌رقصد. آرش دست‌هایش را روی گوش‌هایش می‌گذارد؛ صدا برایش زیاد است.", key: 4200, do: all(
            show("aydin shirin dad dog yard", 0, 0, 700), show("room yas arash notes", 1, 400, 700),
            [{ id: "notes", to: { y: 22 }, at: 800, dur: 1200, yoyo: true, times: 6 }, { id: "notes", to: { r: 10 }, at: 800, dur: 1200, yoyo: true, times: 6 }],
            face("yas", "joy", 1000),
            [{ id: "yas.armL", to: { r: 150 }, at: 1200, dur: 600, yoyo: true, times: 6 }, { id: "yas.armR", to: { r: -60 }, at: 1500, dur: 600, yoyo: true, times: 6 },
              { id: "yas", to: { y: "-3" }, at: 1200, dur: 3600, yoyo: true, times: 6 }],
            face("arash", "sorry", 1400), arms("arash", 172, -172, 1800, 600), [{ id: "arash.head", to: { y: 1 }, at: 2200, dur: 600 }]) },
          { caption: "هیچ‌کدام درست یا غلط نیست. هر کس یک جور حس می‌کند، و ما حس دیگران را می‌پذیریم.", hold: 7400, do: all(
            [{ id: "notes", to: { o: 0 }, dur: 500 }], arms("arash", 0, 0, 300, 600), [{ id: "arash.head", to: { y: 0 }, at: 300, dur: 500 },
              { id: "yas", to: { x: 32 }, at: 600, dur: 1 }, { id: "arash", to: { x: 56 }, at: 600, dur: 1 }],
            [{ id: "mina", to: { x: 80 }, dur: 1 }, { id: "sam", to: { x: 104 }, dur: 1 }, { id: "aydin", to: { x: 128 }, dur: 1 }, { id: "shirin", to: { x: 150 }, dur: 1 },
              { id: "sam", to: { x: 104 }, dur: 1 }, { id: "aydin.armR", to: { r: 0 }, dur: 1 }],
            arms("mina", 0, 0, 0, 1), arms("sam", 0, 0, 0, 1),
            face("mina", "happy", 0, 1), face("sam", "happy", 0, 1), face("aydin", "happy", 0, 1), face("shirin", "happy", 0, 1), face("arash", "happy", 600),
            show("mina sam aydin shirin", 1, 800, 700),
            ["yas", "arash", "mina", "sam", "aydin", "shirin"].map(function (k, i) { return { id: k, to: { y: 84.5 }, at: 2400 + i * 400, dur: 400, yoyo: true, times: 2 }; }),
            face("yas", "joy", 4600), face("arash", "joy", 4600), face("mina", "joy", 4600), face("sam", "joy", 4600), face("aydin", "joy", 4600), face("shirin", "joy", 4600)) }
        ] },
      { type: "sort", practice: true, prompt: "در قصه، چه کسی چه چیزی را دوست داشت و چه چیزی را نه؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "😊", label: "دوست داشت", value: "like" }, { pic: "😟", label: "دوست نداشت", value: "not" }],
        items: [
          { pic: "🌧️", label: "مینا و باران", say: "مینا و باران", basket: "like" },
          { pic: "🌧️", label: "سام و باران", say: "سام و باران", basket: "not" },
          { pic: "🐕", label: "آیدین و سگ", say: "آیدین و سگ", basket: "like" },
          { pic: "🐕", label: "شیرین و سگ", say: "شیرین و سگ", basket: "not" },
          { pic: "🎶", label: "یاسمن و موسیقی بلند", say: "یاسمن و موسیقی بلند", basket: "like" },
          { pic: "🎶", label: "آرش و موسیقی بلند", say: "آرش و موسیقی بلند", basket: "not" }
        ] },
      { type: "talk", scene: "🌧️ 🐕 🎶", caption: "تو باران را دوست داری؟ سگ‌ها را چطور؟ صدای بلند را؟ کسی را می‌شناسی که حسش با تو فرق دارد؟",
        tips: [
          "هر جوابی داد، بپذیرید. لازم نیست کودک چیزی را که می‌ترساندش دوست داشته باشد.",
          "بگویید: «تو باران را دوست داری، داداشت نه. هر دو درست است.»",
          "کمکش کنید حس دیگری را جدی بگیرد: «سام از صدای بلند اذیت می‌شود. چه کار می‌توانیم بکنیم که او هم راحت باشد؟»"
        ] },
      { type: "doit", pic: "📋", text: "از همهٔ خانواده بپرس: «باران را دوست داری؟ سگ را چطور؟ صدای بلند را؟» ببین هر کس چه حسی دارد. چند نفر مثل تو بودند؟" },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-sprout-5", subject: "feel", level: "sprout", emoji: "👂", title: "خوب گوش می‌دهم",
    steps: [
      /* Listening: Aydin fidgets and looks away while Shirin talks, and she feels sad; then the four parts of
         listening, one at a time (eyes, ears, a still body, waiting for my turn), and Shirin is happy. */
      { type: "scene", prompt: "آیدین گوش می‌دهد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          shirin: { art: "fl-shirin", at: [50, 86], s: 1.3 }, aydin: { art: "fl-aydin", at: [110, 86], s: 1.3 },
          ball: { art: "ball-side", at: [130, 86], s: 1.2 },
          e1: { art: "👀", at: [96, 16], s: 0.9, o: 0 }, e2: { art: "👂", at: [74, 16], s: 0.9, o: 0 },
          e3: { art: "✋", at: [52, 16], s: 0.9, o: 0 }, e4: { art: "⏳", at: [30, 16], s: 0.9, o: 0 }
        },
        scenes: [
          { caption: "شیرین می‌خواهد از روزش بگوید. آیدین ورجه‌وورجه می‌کند و جای دیگری را نگاه می‌کند. شیرین ناراحت می‌شود.", key: 4300, do: all(
            talk("shirin", 400, 3200),
            [{ id: "aydin.eyeO", to: { x: 0.9, y: 0.6 }, at: 600, dur: 400 }, { id: "aydin.head", to: { r: 18 }, at: 600, dur: 500 },
              { id: "aydin", to: { y: "-2" }, at: 900, dur: 3200, yoyo: true, times: 8 },
              { id: "aydin.armR", to: { r: -50 }, at: 1000, dur: 3600, yoyo: true, times: 6 }, { id: "ball", to: { y: 72 }, at: 1000, dur: 3600, yoyo: true, times: 6 }],
            face("shirin", "sad", 3800)) },
          { caption: "خوب گوش دادن یعنی: با چشم‌هایمان به او نگاه می‌کنیم.", do: all(
            [{ id: "aydin.head", to: { r: 0 }, dur: 500 }, { id: "aydin.armR", to: { r: 0 }, dur: 500 }, { id: "ball", to: { y: 86 }, dur: 400 }, { id: "aydin.eyeO", to: { x: -0.9, y: 0 }, at: 500, dur: 500 },
              { id: "e1", to: { o: 1 }, at: 800, dur: 400 }, { id: "e1", to: { s: 0.75 }, at: 1200, dur: 700, yoyo: true, times: 2 }],
            face("shirin", "happy", 1400)) },
          { caption: "با گوش‌هایمان می‌شنویم.", do: all(
            [{ id: "e2", to: { o: 1 }, dur: 400 }, { id: "e2", to: { s: 0.75 }, at: 400, dur: 700, yoyo: true, times: 2 },
              { id: "aydin.head", to: { r: -8 }, at: 600, dur: 600 }],
            talk("shirin", 800, 2400), [{ emit: "spark", where: [70, 50], spread: [12, 6], n: 5, at: 1000, dur: 1600, life: 1000 }]) },
          { caption: "بدنمان آرام و بی‌حرکت است.", do: all(
            [{ id: "e3", to: { o: 1 }, dur: 400 }, { id: "e3", to: { s: 0.75 }, at: 400, dur: 700, yoyo: true, times: 2 },
              { id: "aydin.head", to: { r: 0 }, at: 600, dur: 500 }],
            face("aydin", "calm", 800), breathe("aydin", 1000, 1800, 2000), face("aydin", "happy", 3000)) },
          { caption: "صبر می‌کنیم تا حرفش تمام شود. بعد نوبت ماست که حرف بزنیم. شیرین خوشحال است: آیدین خوب گوش داد.", key: 6200, hold: 7000, do: all(
            [{ id: "e4", to: { o: 1 }, dur: 400 }, { id: "e4", to: { r: 180 }, at: 400, dur: 1200 }],
            talk("shirin", 600, 2200), talk("aydin", 3200, 2000), [{ id: "aydin.armR", to: { r: -40 }, at: 3400, dur: 500 }],
            face("shirin", "joy", 5000), face("aydin", "joy", 5200)) }
        ] },
      { type: "doit", pic: "👀", text: "حالا تو خوب گوش بده! بزرگ‌ترت یک چیز کوتاه تعریف می‌کند و تو:",
        list: ["با چشم‌هایت به او نگاه کن.", "با گوش‌هایت بشنو.", "بدنت را آرام و بی‌حرکت نگه دار.", "صبر کن تا حرفش تمام شود. بعد نوبت توست."] },
      { type: "doit", pic: "🔁", text: "بازی «چه گفتم؟»: یک نفر سه چیز از روزش می‌گوید. نفر بعدی یکی از آن‌ها را تکرار می‌کند. بعد نوبت عوض می‌شود!" },
      { type: "doit", pic: "👂", text: "بازی صداها: چشم‌هایت را ببند و یک دقیقه گوش کن. چند صدا شنیدی؟ صدای چه چیزهایی بود؟" },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "وقتی خوب گوش می‌دهی، دوستت حس می‌کند برایت مهم است.", pic: "👂",
        tips: [
          "کودک گوش دادن را از شما یاد می‌گیرد. وقتی حرف می‌زند، گوشی را کنار بگذارید، هم‌قد او شوید و نگاهش کنید.",
          "بی‌حرکت ماندن برای کودک کوچک سخت است. آن را کوتاه تمرین کنید و تلاشش را ببینید: «چه خوب نگاهم کردی!»",
          "سر سفره یا پیش از خواب بازی «چه گفتم؟» را تکرار کنید.",
          "اگر کودک اغلب انگار نمی‌شنود، با پزشک دربارهٔ بررسی شنوایی‌اش مشورت کنید."
        ] }
    ]
  },
  {
    id: "feel-sprout-6", subject: "feel", level: "sprout", emoji: "⚽", title: "بیا با هم بازی کنیم",
    steps: [
      /* Joining in and inviting: Arash asks to join and Sam says yes; another day they say no and he feels sad; he
         finds another game and invites Shirin, who is alone; if it keeps happening, he tells the teacher. */
      { type: "scene", prompt: "آرش می‌خواهد بازی کند", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" },
          teacher: { art: "fl-teacher", at: [-20, 88], s: 1.55 },
          arash: { art: "fl-arash", at: [20, 86], s: 1.3 },
          mina: { art: "fl-mina", at: [70, 86], s: 1.3 }, sam: { art: "fl-sam", at: [112, 86], s: 1.3 },
          shirin: { art: "fl-shirin", at: [138, 88], s: 1.25, o: 0 }, car: { art: "fl-car", at: [120, 87], s: 1.3, o: 0 },
          ball: { art: "ball-side", at: [80, 86], s: 1.3 }
        },
        scenes: [
          { caption: "مینا و سام توپ‌بازی می‌کنند. آرش هم دلش می‌خواهد بازی کند.", key: 4400, do: all(
            face("mina", "joy", 0), face("sam", "joy", 0),
            [{ id: "ball", path: "M80 86Q92 58 104 72", at: 400, dur: 900 }, { id: "sam.armL", to: { r: 40 }, at: 1200, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M104 72Q90 52 76 72", at: 1700, dur: 900 }, { id: "mina.armR", to: { r: -40 }, at: 2500, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M76 72Q90 52 104 72", at: 3000, dur: 900 },
              { id: "arash.eyeO", to: { x: 0.9 }, at: 800, dur: 500 }],
            face("arash", "caring", 1800)) },
          { caption: "آرش جلو می‌رود و می‌پرسد: «می‌شود من هم بازی کنم؟» سام می‌گوید: «آره، بیا!»", key: 6400, do: all(
            [{ id: "arash", to: { x: 44 }, dur: 1300 }], walk("arash", 0, 1300), face("arash", "happy", 1200), talk("arash", 1600, 2000),
            face("sam", "joy", 3600), talk("sam", 3800, 1000),
            [{ id: "ball", path: "M104 72Q76 44 48 70", at: 5000, dur: 1100 }, { id: "arash.armR", to: { r: -60 }, at: 5800, dur: 300 }],
            face("arash", "joy", 6000)) },
          { caption: "یک روز دیگر، مینا و سام می‌گویند: «الان نه. بازی ما دو نفره است.» آرش ناراحت می‌شود.", do: all(
            [{ id: "arash.armR", to: { r: 0 }, dur: 300 }, { id: "ball", to: { x: 90, y: 86 }, dur: 600 }, { id: "arash", to: { x: 30 }, at: 200, dur: 900 }],
            walk("arash", 200, 900), face("mina", "neutral", 600), talk("mina", 1200, 2200), [{ id: "mina.armL", to: { r: 30 }, at: 1300, dur: 500 }],
            face("arash", "sad", 3600), [{ id: "arash.upper", to: { y: 1 }, at: 3800, dur: 800 }, { id: "arash.eyeO", to: { y: 0.8 }, at: 3800, dur: 500 }]) },
          { caption: "آرش یک بازی دیگر پیدا می‌کند. شیرین تنها نشسته است. آرش می‌گوید: «بیا با هم بازی کنیم!»", key: 5200, hold: 7800, do: all(
            show("mina sam ball", 0, 0, 600), [{ id: "mina.armL", to: { r: 0 }, dur: 1 }, { id: "arash.upper", to: { y: 0 }, dur: 600 }, { id: "arash.eyeO", to: { y: 0, x: 0.9 }, dur: 400 }],
            show("shirin car", 1, 500, 600), [{ id: "shirin.legL", to: { sy: 0.5 }, dur: 1 }, { id: "shirin.legR", to: { sy: 0.5 }, dur: 1 }], face("shirin", "sorry", 0, 1),
            face("arash", "happy", 1000), [{ id: "arash", to: { x: 100 }, at: 1200, dur: 2200 }], walk("arash", 1200, 2200),
            talk("arash", 3600, 1800), face("shirin", "joy", 5600),
            [{ id: "shirin", to: { y: 86 }, at: 6000, dur: 500 }, { id: "shirin.legL", to: { sy: 1 }, at: 6000, dur: 500 }, { id: "shirin.legR", to: { sy: 1 }, at: 6000, dur: 500 },
              { id: "car", path: "M120 87L108 87", at: 6400, dur: 700 }],
            face("arash", "joy", 6200)) },
          { caption: "اگر کسی بارها و بارها بازی‌ات نمی‌دهد، به یک بزرگ‌تر بگو، مثلاً به آقای معلم.", key: 5600, do: all(
            show("shirin car", 0, 0, 600), [{ id: "arash", to: { x: 72 }, at: 300, dur: 1200 }], walk("arash", 300, 1200), face("arash", "sorry", 600),
            [{ id: "teacher", to: { x: 40 }, at: 600, dur: 1800 }], walk("teacher", 600, 1800),
            [{ id: "arash.eyeO", to: { x: -0.9 }, at: 2200, dur: 400 }], talk("arash", 2600, 2000),
            face("teacher", "caring", 2600), [{ id: "teacher.head", to: { r: 8 }, at: 4600, dur: 400, yoyo: true, times: 2 }, { id: "teacher.armR", to: { r: -70 }, at: 5000, dur: 600 }],
            face("arash", "happy", 5400)) }
        ] },
      { type: "talk", scene: "🙋 ⚽ 🤝", caption: "وقتی می‌خواهی با بچه‌ها بازی کنی، چه می‌گویی؟ اگر بچه‌ای تنها بود، چه کار می‌کنی؟",
        tips: [
          "جمله‌های ساده را با هم تمرین کنید: «می‌شود من هم بازی کنم؟»، «بیا با ما بازی کن.»",
          "بگویید که گاهی بچه‌ها «نه» می‌گویند و این همیشه به معنی دوست نداشتن نیست. می‌شود بعداً دوباره پرسید.",
          "از کودک بپرسید آیا تا حالا کسی را تنها دیده و چه کاری می‌شد برایش کرد."
        ] },
      { type: "sort", practice: true, prompt: "وقتی کسی گفت «نه»، کدام کار کمک می‌کند؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "💚", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کمک نمی‌کند", value: "no" }],
        items: [
          { pic: "🚗", label: "بازی دیگر", say: "یک بازی دیگر پیدا کنم", basket: "yes" },
          { pic: "👋", label: "دوست دیگر", say: "از یک دوست دیگر بپرسم", basket: "yes" },
          { pic: "⏳", label: "بعداً", say: "بعداً دوباره بپرسم", basket: "yes" },
          { pic: "🧑‍🏫", label: "گفتن به بزرگ‌تر", say: "اگر بارها تکرار شد، به یک بزرگ‌تر بگویم", basket: "yes" },
          { pic: "📢", label: "داد زدن", say: "سرشان داد بزنم", basket: "no" },
          { pic: "💥", label: "خراب کردن بازی", say: "بازی‌شان را خراب کنم", basket: "no" }
        ] },
      { type: "talk", scene: "🧍 ➡️ 🤝", caption: "تا حالا کسی به تو «نه» گفته؟ چه حسی داشتی؟ بعدش چه کار کردی؟",
        tips: [
          "حس کودک را بپذیرید: «ناراحت شدی که بازی‌ات ندادند. حق داری.»",
          "با هم دنبال راه بگردید: بازی دیگر، دوست دیگر، بعداً دوباره.",
          "اگر کودک می‌گوید بارها و بارها بیرون گذاشته شده، با آرامش گوش کنید و با معلم یا مربی‌اش صحبت کنید."
        ] },
      { type: "doit", pic: "🎭", text: "با بزرگ‌ترت نمایش بازی کنید: یکی بازی می‌کند و دیگری می‌پرسد «می‌شود من هم بازی کنم؟». یک بار جواب «آره» بدهید و یک بار «الان نه». بعد جایتان را عوض کنید." }
    ]
  },
  {
    id: "feel-sprout-7", subject: "feel", level: "sprout", emoji: "🗣️", title: "با «من» می‌گویم",
    steps: [
      /* Saying it with «من»: her brother takes Yasaman's crayons without asking; she breathes, then says it in three
         parts (I felt…, when you…, I want…), each shown as a card; he says sorry and they draw together. */
      { type: "scene", prompt: "یاسمن با «من» می‌گوید", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          table: { art: "fl-table", at: [74, 88], s: 1.3 },
          paper: { art: "fl-paper", at: [86, 63.5], s: 0.8 },
          yas: { art: "fl-yas", at: [46, 86], s: 1.3 }, bro: { art: "fl-kid", at: [182, 86], s: 1.3 },
          crayons: { art: "fl-crayons", at: [64, 63.5], s: 0.9 },
          puff: { art: "fl-puff", at: [3, -29], o: 0, under: "yas" },
          c1: { art: "😟", at: [96, 16], s: 0.8, o: 0 }, c2: { art: "🖍️", at: [68, 16], s: 0.8, o: 0 }, c3: { art: "🙋", at: [40, 16], s: 0.8, o: 0 }
        },
        scenes: [
          { caption: "یاسمن با مدادرنگی‌هایش نقاشی می‌کشد. برادرش بی‌اجازه مدادرنگی‌ها را برمی‌دارد و می‌برد.", key: 5600, do: all(
            [{ id: "yas.armR", to: { r: -50 }, at: 200, dur: 1600, yoyo: true, times: 4 },
              { id: "bro", to: { x: 100 }, at: 800, dur: 2000 }], walk("bro", 800, 2000),
            [{ id: "bro.armL", to: { r: 40 }, at: 2900, dur: 400 }, { id: "crayons", to: { x: 92, y: 70 }, at: 3300, dur: 500 },
              { id: "bro", to: { x: 134 }, at: 3900, dur: 1400 }, { id: "crayons", to: { x: 126 }, at: 3900, dur: 1400 }],
            walk("bro", 3900, 1400), face("yas", "oops", 3500), [{ id: "yas.eyeO", to: { x: 0.9 }, at: 3600, dur: 400 }], face("yas", "angry", 4800),
            [{ id: "yas.flush", to: { o: 1 }, at: 5000, dur: 800 }]) },
          { caption: "یاسمن عصبانی است. اول یک نفس آرام می‌کشد.", do: all(
            face("yas", "breatheIn", 400), breathe("yas", 500, 1800, 2200), face("yas", "breatheOut", 2300),
            [{ id: "puff", to: { o: 1 }, at: 2400, dur: 300 }, { id: "puff", to: { x: 9 }, at: 2400, dur: 1800 }, { id: "puff", to: { o: 0, x: 3 }, at: 4200, dur: 300 },
              { id: "yas.flush", to: { o: 0 }, at: 2400, dur: 2000 }],
            face("yas", "sorry", 4600)) },
          { caption: "بعد با «من» می‌گوید: «من ناراحت شدم...»", do: all(
            [{ id: "c1", to: { o: 1 }, at: 300, dur: 400 }, { id: "c1", to: { s: 0.95 }, at: 700, dur: 600, yoyo: true, times: 2 }], talk("yas", 600, 1600),
            [{ id: "bro.eyeO", to: { x: -0.9 }, at: 600, dur: 400 }]) },
          { caption: "«...وقتی مدادرنگی‌هایم را بی‌اجازه برداشتی...»", do: all(
            [{ id: "c2", to: { o: 1 }, at: 300, dur: 400 }, { id: "c2", to: { s: 0.95 }, at: 700, dur: 600, yoyo: true, times: 2 }], talk("yas", 600, 2200),
            [{ id: "yas.armR", to: { r: -60 }, at: 900, dur: 500 }]) },
          { caption: "«...می‌خواهم اول از من بپرسی.»", do: all(
            [{ id: "yas.armR", to: { r: 0 }, dur: 400 }, { id: "c3", to: { o: 1 }, at: 300, dur: 400 }, { id: "c3", to: { s: 0.95 }, at: 700, dur: 600, yoyo: true, times: 2 }],
            talk("yas", 600, 1800), face("bro", "sorry", 2200)) },
          { caption: "برادرش می‌گوید: «ببخشید. می‌شود من هم با آن‌ها نقاشی کنم؟» یاسمن می‌گوید: «آره، با هم!»", key: 7000, hold: 7600, do: all(
            talk("bro", 300, 2400),
            [{ id: "bro", to: { x: 100 }, at: 2400, dur: 1400 }, { id: "crayons", to: { x: 92 }, at: 2400, dur: 1400 }], walk("bro", 2400, 1400),
            [{ id: "crayons", to: { x: 74, y: 63.5 }, at: 3900, dur: 600 }, { id: "bro.armL", to: { r: 0 }, at: 4300, dur: 400 }],
            face("yas", "joy", 4000), talk("yas", 4200, 1000), face("bro", "joy", 4800),
            [{ id: "paper.pic", to: { o: 0 }, at: 4600, dur: 300 }, { id: "paper.pic", to: { o: 1 }, at: 5000, dur: 100 }, { id: "paper.pic", draw: true, oneByOne: true, at: 5100, dur: 2000 },
              { id: "yas.armR", to: { r: -50 }, at: 5100, dur: 1000, yoyo: true, times: 2 }, { id: "bro.armL", to: { r: 40 }, at: 5300, dur: 1000, yoyo: true, times: 2 }]) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "جمله یاسمن را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "😟", label: "من ناراحت شدم", say: "من ناراحت شدم" },
          { pic: "🖍️", label: "وقتی بی‌اجازه برداشتی", say: "وقتی مدادرنگی‌هایم را بی‌اجازه برداشتی" },
          { pic: "🙋", label: "می‌خواهم اول بپرسی", say: "می‌خواهم اول از من بپرسی" }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "این جمله را هم به ترتیب بچین.",
        items: [
          { pic: "😠", label: "من عصبانی شدم", say: "من عصبانی شدم" },
          { pic: "🧱", label: "وقتی برجم را خراب کردی", say: "وقتی برجم را خراب کردی" },
          { pic: "🤲", label: "می‌خواهم مواظب باشی", say: "می‌خواهم مواظب باشی" }
        ] },
      { type: "talk", scene: "🗣️ 😟 ➡️ 🙋", caption: "تو هم یک جمله با «من» بساز: «من ... شدم، وقتی ...، می‌خواهم ...»",
        tips: [
          "یک موقعیت ساده از زندگی کودک انتخاب کنید (برادری که اسباب‌بازی را گرفت، دوستی که در صف هل داد) و کمکش کنید سه تکه را بگوید.",
          "اگر گیر کرد، تکه اول را با هم بگویید: «من ... شدم» و بگذارید اسم حس را خودش پیدا کند.",
          "جمله‌های «من» به جای «تو بدی!» دعوا را کوچک‌تر می‌کنند، چون به جای سرزنش، حس و خواسته را می‌گویند."
        ] },
      { type: "talk", scene: "👂 💛", caption: "وقتی کسی با «من» به تو می‌گوید چه حسی دارد، چه کار می‌کنی؟",
        tips: [
          "تمرین کنید که کودک گوش بدهد و حرف دیگری را تکرار کند: «ناراحت شدی چون...»",
          "خودتان هم در خانه با «من» حرف بزنید: «من نگران شدم وقتی دیر آمدی. می‌خواهم خبر بدهی.»",
          "از جمله‌های «من» او تعریف کنید و جوابش را جدی بگیرید."
        ] }
    ]
  },
  {
    id: "feel-sprout-8", subject: "feel", level: "sprout", emoji: "🤔", title: "اول فکر می‌کنم",
    steps: [
      /* Stop, think, choose: Sam's pencil breaks; he stops and thinks what would happen after each choice (two
         thought bubbles: taking Arash's pencil makes him sad, asking makes him glad), then he asks. */
      { type: "scene", prompt: "سام اول فکر می‌کند", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          table: { art: "fl-table", at: [80, 88], s: 1.3 },
          paper: { art: "fl-paper", at: [70, 63.5], s: 0.8 },
          pen2: { art: "fl-pencil", at: [100, 64], s: 1.1, r: 20 },
          sam: { art: "fl-sam", at: [44, 86], s: 1.3 }, arash: { art: "fl-arash", at: [122, 86], s: 1.3 },
          penA: { art: "fl-pencil", at: [58, 68], s: 1.1, r: -40 }, penB: { art: "fl-pencil", at: [58, 68], s: 0.6, r: -40, o: 0 },
          stop: { art: "✋", at: [44, 24], s: 0.7, o: 0 },
          tA: { art: "fl-think", at: [26, 40], s: 0.95, o: 0 },
          fistA: { art: "✊", at: [7, -18], s: 0.55, under: "tA" }, araA: { art: "fl-arash", at: [22, -7], s: 0.52, under: "tA" },
          tB: { art: "fl-think", at: [60, 30], s: 0.95, o: 0 },
          askB: { art: "🙋", at: [7, -18], s: 0.55, under: "tB" }, araB: { art: "fl-arash", at: [22, -7], s: 0.52, under: "tB" }
        },
        scenes: [
          { caption: "سام نقاشی می‌کشد. ناگهان مدادش می‌شکند! مداد آرش روی میز است.", key: 3400, do: all(
            [{ id: "sam.armR", to: { r: -46 }, at: 200, dur: 600 }, { id: "penA", to: { r: -30 }, at: 800, dur: 1600, yoyo: true, times: 4 },
              { id: "penA", to: { s: 0.6 }, at: 2400, dur: 1 }, { id: "penB", to: { o: 1 }, at: 2400, dur: 1 }, { id: "penB", path: "M58 68Q50 64 50 86", at: 2400, dur: 600, ease: "in" },
              { id: "penB", to: { r: 120 }, at: 2400, dur: 600 }, { id: "pen2", to: { s: 1.3 }, at: 3400, dur: 500, yoyo: true, times: 2 }],
            face("sam", "oops", 2500), [{ id: "sam.eyeO", to: { x: 0.9 }, at: 3200, dur: 400 }]) },
          { caption: "سام می‌ایستد و فکر می‌کند: چه کار کنم؟", do: all(
            [{ id: "sam.armR", to: { r: 0 }, dur: 400 }, { id: "penA", to: { o: 0 }, dur: 400 }, { id: "penB", to: { o: 0 }, dur: 400 },
              { id: "stop", to: { o: 1 }, at: 400, dur: 300 }, { id: "stop", to: { s: 0.8 }, at: 700, dur: 700, yoyo: true, times: 2 },
              { id: "sam.head", to: { r: -8 }, at: 1200, dur: 700 }, { id: "sam.eyeO", to: { x: 0.4, y: -0.8 }, at: 1200, dur: 500 }],
            face("sam", "neutral", 600)) },
          { caption: "اگر مداد آرش را بی‌اجازه بردارد، چه می‌شود؟ آرش ناراحت می‌شود.", do: all(
            show("stop", 0, 0), show("tA", 1, 400, 600), face("araA", "happy", 0, 1),
            [{ id: "fistA", to: { s: 0.65 }, at: 1200, dur: 500, yoyo: true, times: 2 }], face("araA", "sad", 2000),
            [{ id: "araA.tear", to: { o: 1 }, at: 2400, dur: 300 }, { id: "araA.tear", to: { y: 2 }, at: 2500, dur: 1000 }]) },
          { caption: "اگر بپرسد، چه می‌شود؟ آرش خوشحال می‌شود و می‌گوید: «بفرما!»", do: all(
            show("tB", 1, 300, 600), face("araB", "happy", 0, 1),
            [{ id: "askB", to: { s: 0.65 }, at: 1100, dur: 500, yoyo: true, times: 2 }], face("araB", "joy", 1900), talk("araB", 2200, 1000)) },
          { caption: "سام انتخاب می‌کند که بپرسد: «می‌شود مدادت را قرض بگیرم؟» آرش می‌گوید: «بفرما!» هر دو خوشحال‌اند.", key: 6400, do: all(
            show("tA tB", 0, 0, 600), [{ id: "sam.head", to: { r: 0 }, dur: 500 }, { id: "sam.eyeO", to: { x: 0.9, y: 0 }, dur: 400 }],
            face("sam", "happy", 400), talk("sam", 800, 2200), face("arash", "joy", 3200), talk("arash", 3400, 900),
            [{ id: "arash.armL", to: { r: 40 }, at: 4400, dur: 400 }, { id: "pen2", path: "M100 64Q80 52 60 66", at: 4800, dur: 1000 }, { id: "sam.armR", to: { r: -46 }, at: 5400, dur: 400 }],
            face("sam", "joy", 5800)) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "سه قدم پیش از انتخاب را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "✋", label: "می‌ایستم", say: "می‌ایستم" },
          { pic: "🤔", label: "فکر می‌کنم", say: "فکر می‌کنم: بعدش چه می‌شود؟" },
          { pic: "👍", label: "انتخاب می‌کنم", say: "انتخاب می‌کنم" }
        ] },
      { type: "sort", practice: true, prompt: "بعد از هر کار چه می‌شود؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "😊", label: "بعدش خوب می‌شود", value: "good" }, { pic: "😟", label: "بعدش کسی ناراحت می‌شود", value: "hurt" }],
        items: [
          { pic: "🙋", label: "اجازه گرفتن", say: "اجازه گرفتن پیش از برداشتن مداد دوست", basket: "good" },
          { pic: "✊", label: "بی‌اجازه برداشتن", say: "برداشتن مداد دوست بی‌اجازه", basket: "hurt" },
          { pic: "🧺", label: "کنار مامان ماندن", say: "کنار مامان ماندن در بازار", basket: "good" },
          { pic: "🏃", label: "دور شدن", say: "دویدن و دور شدن از مامان در بازار", basket: "hurt" },
          { pic: "🧍", label: "صبر در صف", say: "صبر کردن در صف", basket: "good" },
          { pic: "💥", label: "هل دادن", say: "هل دادن در صف", basket: "hurt" }
        ] },
      { type: "talk", scene: "✋ 🤔 👍", caption: "یک بار که پیش از کاری ایستادی و فکر کردی را به یاد بیاور. چه انتخاب کردی؟ بعدش چه شد؟",
        tips: [
          "از اشتباه‌های گذشته‌اش برای سرزنش استفاده نکنید. بپرسید: «دفعه بعد چه کار دیگری می‌شود کرد؟»",
          "وقتی دیدید پیش از کاری ایستاد و فکر کرد، اسمش را بگویید: «دیدم اول فکر کردی. آفرین به فکرت!»",
          "سؤال «بعدش چه می‌شود؟» را در موقعیت‌های روزمره بپرسید."
        ] },
      { type: "talk", scene: "🎲 🤔", caption: "بازی «بعدش چه می‌شود؟»: بزرگ‌تر یک کار می‌گوید و تو حدس می‌زنی بعدش چه می‌شود.",
        tips: [
          "کارهای ساده بگویید: «اگر اسباب‌بازی‌ها را جمع نکنیم...»، «اگر به دوستت کمک کنی...»، «اگر بدون کلاه زیر آفتاب داغ بروی...».",
          "هم کارهای خوب و هم کارهای اشتباه را بگویید، بدون ترساندن.",
          "بعد نوبت کودک است که یک کار بگوید و شما حدس بزنید."
        ] }
    ]
  },
  {
    id: "feel-sprout-9", subject: "feel", level: "sprout", emoji: "🌍", title: "همه با هم فرق داریم",
    steps: [
      /* A class of children from many parts of Iran: languages at home and Persian together at school, what each one
         likes, how we look, the feelings we all share, and playing fair with everyone. */
      { type: "scene", prompt: "بچه‌های کلاس ما", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          teacher: { art: "fl-teacher", at: [140, 88], s: 1.55 },
          aydin: { art: "fl-aydin", at: [-20, 86], s: 1.3 }, shirin: { art: "fl-shirin", at: [-20, 86], s: 1.2 },
          mina: { art: "fl-mina", at: [-20, 86], s: 1.25 }, sam: { art: "fl-sam", at: [-20, 86], s: 1.36 },
          b1: { art: "💬", at: [26, 26], s: 0.6, o: 0 }, b2: { art: "💬", at: [50, 28], s: 0.6, o: 0 }, b3: { art: "💬", at: [74, 27], s: 0.6, o: 0 }, b4: { art: "💬", at: [98, 25], s: 0.6, o: 0 },
          l1: { art: "⚽", at: [26, 26], s: 0.6, o: 0 }, l2: { art: "🎨", at: [50, 28], s: 0.6, o: 0 }, l3: { art: "📚", at: [74, 27], s: 0.6, o: 0 }, l4: { art: "🎵", at: [98, 25], s: 0.6, o: 0 },
          heart: { art: "fl-heart", at: [62, 18], s: 1.3, o: 0 },
          ball: { art: "ball-side", at: [36, 86], s: 1.2, o: 0 }
        },
        scenes: [
          { caption: "بچه‌های کلاس ما از جاهای مختلف ایران آمده‌اند.", do: all(
            [{ id: "aydin", to: { x: 26 }, dur: 2600 }, { id: "shirin", to: { x: 50 }, at: 300, dur: 2600 },
              { id: "mina", to: { x: 74 }, at: 600, dur: 2600 }, { id: "sam", to: { x: 98 }, at: 900, dur: 2600 }],
            walk("aydin", 0, 2600), walk("shirin", 300, 2600), walk("mina", 600, 2600), walk("sam", 900, 2600),
            face("teacher", "happy", 2600), face("aydin", "happy", 2600), face("shirin", "happy", 2800), face("mina", "happy", 3000), face("sam", "happy", 3200)) },
          { caption: "در خانه، آیدین ترکی حرف می‌زند، شیرین کردی و مینا عربی. سام در خانه فارسی حرف می‌زند. در مدرسه همه با هم فارسی حرف می‌زنند.", hold: 9400, do: all(
            [{ id: "b1", to: { o: 1 }, at: 300, dur: 300 }], talk("aydin", 400, 1400), [{ id: "b1", to: { o: 0 }, at: 1900, dur: 300 }],
            [{ id: "b2", to: { o: 1 }, at: 2100, dur: 300 }], talk("shirin", 2200, 1400), [{ id: "b2", to: { o: 0 }, at: 3700, dur: 300 }],
            [{ id: "b3", to: { o: 1 }, at: 3900, dur: 300 }], talk("mina", 4000, 1400), [{ id: "b3", to: { o: 0 }, at: 5500, dur: 300 }],
            [{ id: "b4", to: { o: 1 }, at: 5700, dur: 300 }], talk("sam", 5800, 1400),
            show("b1 b2 b3", 1, 7400, 400), talk("aydin", 7600, 1400), talk("shirin", 7600, 1400), talk("mina", 7600, 1400), talk("sam", 7600, 1400)) },
          { caption: "هر کدام چیزی را دوست دارد: آیدین فوتبال، شیرین نقاشی، مینا کتاب و سام موسیقی.", hold: 6400, do: all(
            show("b1 b2 b3 b4", 0, 0, 400),
            [{ id: "l1", to: { o: 1 }, at: 600, dur: 400 }, { id: "l2", to: { o: 1 }, at: 1500, dur: 400 }, { id: "l3", to: { o: 1 }, at: 2400, dur: 400 }, { id: "l4", to: { o: 1 }, at: 3300, dur: 400 }],
            face("aydin", "joy", 600), face("shirin", "joy", 1500), face("mina", "joy", 2400), face("sam", "joy", 3300)) },
          { caption: "قد و مو و صورتمان هم با هم فرق دارد. هیچ‌کس مثل دیگری نیست.", do: all(
            show("l1 l2 l3 l4", 0, 0, 400),
            [{ id: "aydin", to: { y: 84.5 }, at: 500, dur: 400, yoyo: true, times: 2 }, { id: "shirin", to: { y: 84.5 }, at: 1100, dur: 400, yoyo: true, times: 2 },
              { id: "mina", to: { y: 84.5 }, at: 1700, dur: 400, yoyo: true, times: 2 }, { id: "sam", to: { y: 84.5 }, at: 2300, dur: 400, yoyo: true, times: 2 },
              { id: "teacher", to: { y: 86.5 }, at: 2900, dur: 400, yoyo: true, times: 2 }],
            face("aydin", "happy", 0), face("shirin", "happy", 0), face("mina", "happy", 0), face("sam", "happy", 0)) },
          { caption: "اما همه حس داریم: همه گاهی خوشحال‌ایم، گاهی غمگین و گاهی نگران. و همه دوست داریم با ما مهربان باشند.", hold: 7400, do: all(
            all.apply(null, ["aydin", "shirin", "mina", "sam"].map(function (k) { return face(k, "joy", 400); })),
            all.apply(null, ["aydin", "shirin", "mina", "sam"].map(function (k) { return face(k, "sad", 1800); })),
            all.apply(null, ["aydin", "shirin", "mina", "sam"].map(function (k) { return face(k, "worried", 3200); })),
            all.apply(null, ["aydin", "shirin", "mina", "sam"].map(function (k) { return face(k, "happy", 4600); })),
            [{ id: "heart", to: { o: 1 }, at: 4800, dur: 400 }, { id: "heart", to: { s: 1.6 }, at: 5200, dur: 1600, yoyo: true, times: 2 }]) },
          { caption: "با همه منصف و مهربان هستیم: همه را بازی می‌دهیم و نوبت همه را رعایت می‌کنیم.", key: 6400, hold: 7400, do: all(
            show("heart", 0, 0, 400), show("ball", 1, 300, 300),
            [{ id: "ball", path: "M36 86Q48 64 58 72", at: 700, dur: 900 }, { id: "ball", path: "M58 72Q70 58 80 72", at: 1800, dur: 900 },
              { id: "ball", path: "M80 72Q94 56 104 72", at: 2900, dur: 900 }, { id: "ball", path: "M104 72Q66 40 32 72", at: 4000, dur: 1400 }],
            face("aydin", "joy", 700), face("shirin", "joy", 1800), face("mina", "joy", 2900), face("sam", "joy", 4000), face("teacher", "joy", 5000)) }
        ] },
      { type: "pairs", practice: true, prompt: "هر بچه چه چیزی را دوست داشت؟ جفتشان کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "⚽", say: "فوتبال" }, { label: "آیدین", say: "آیدین" }],
          [{ pic: "🎨", say: "نقاشی" }, { label: "شیرین", say: "شیرین" }],
          [{ pic: "📚", say: "کتاب" }, { label: "مینا", say: "مینا" }],
          [{ pic: "🎵", say: "موسیقی" }, { label: "سام", say: "سام" }]
        ] },
      { type: "talk", scene: "🗣️ 🍲 🎨 ⚽", caption: "در خانهٔ شما به چه زبانی حرف می‌زنید؟ تو چه چیزی را دوست داری که دوستت دوست ندارد؟",
        tips: [
          "اگر در خانه به زبانی جز فارسی حرف می‌زنید، به آن افتخار کنید و چند کلمه‌اش را به کودک یاد بدهید.",
          "از تفاوت‌ها با کنجکاوی حرف بزنید، نه با مسخره کردن: غذاها، بازی‌ها، لباس‌ها، جشن‌ها.",
          "اگر کودک چیزی گفت که کسی را کوچک می‌کند، آرام بگویید: «آدم‌ها با هم فرق دارند. ما به همه احترام می‌گذاریم.»"
        ] },
      { type: "talk", scene: "🤝 💛", caption: "ما چه چیزهایی مثل هم هستیم؟ چطور می‌توانیم با همه منصف باشیم؟",
        tips: [
          "کمک کنید چیزهای مشترک را پیدا کند: همه بازی را دوست داریم، همه حس داریم، همه دوست داریم کسی گوشمان کند.",
          "منصف بودن را با مثال بگویید: همه را بازی بدهیم، نوبت همه را رعایت کنیم، کسی را به خاطر زبان یا شکلش کنار نگذاریم.",
          "از کتاب‌ها و قصه‌هایی با بچه‌هایی از جاهای مختلف استفاده کنید."
        ] },
      { type: "doit", pic: "👵", text: "از یک بزرگ‌تر (مادربزرگ، پدربزرگ یا همسایه) بپرس: «وقتی بچه بودی، کجا زندگی می‌کردی و چه بازی‌ای می‌کردی؟» شاید یک بازی تازه یاد بگیری!" }
    ]
  },
  {
    id: "feel-sprout-10", subject: "feel", level: "sprout", emoji: "🎲", title: "بازی دوستی",
    steps: [
      { type: "pairs", practice: true, prompt: "هر قصه را با اسم حسش جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "🎤", say: "همه نگاهش می‌کنند و صورتش داغ شده" }, { label: "خجالت‌زده", say: "خجالت‌زده" }],
          [{ pic: "🎂", say: "فردا جشن تولدش است" }, { label: "هیجان‌زده", say: "هیجان‌زده" }],
          [{ pic: "🌧️", say: "پارک رفتن به خاطر باران به هم خورد" }, { label: "ناامید", say: "ناامید" }],
          [{ pic: "🖼️", say: "خودش تنهایی پازل را تمام کرد" }, { label: "سربلند", say: "سربلند" }],
          [{ pic: "💌", say: "پدربزرگش در شهر دیگری است" }, { label: "دلتنگ", say: "دلتنگ" }],
          [{ pic: "🕰️", say: "کاری ندارد و وقت دیر می‌گذرد" }, { label: "بی‌حوصله", say: "بی‌حوصله" }]
        ] },
      { type: "order", practice: true, numbered: true, prompt: "جمله «من» را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "😞", label: "من ناامید شدم", say: "من ناامید شدم" },
          { pic: "🌧️", label: "وقتی پارک نرفتیم", say: "وقتی به خاطر باران پارک نرفتیم" },
          { pic: "📅", label: "می‌خواهم فردا برویم", say: "می‌خواهم فردا برویم" }
        ] },
      { type: "sort", practice: true, prompt: "کدام راه، راه خوبی برای وارد شدن به بازی یا دعوت کردن است؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "💚", label: "راه خوب", value: "yes" }, { pic: "💔", label: "کسی ناراحت می‌شود", value: "no" }],
        items: [
          { pic: "🙋", label: "پرسیدن", say: "می‌شود من هم بازی کنم؟", basket: "yes" },
          { pic: "👋", label: "دعوت کردن", say: "بیا با ما بازی کن!", basket: "yes" },
          { pic: "⏳", label: "صبر کردن", say: "صبر می‌کنم تا این دور تمام شود.", basket: "yes" },
          { pic: "🤾", label: "پریدن وسط بازی", say: "پریدن وسط بازی و گرفتن توپ", basket: "no" },
          { pic: "🚫", label: "راه ندادن", say: "تو نمی‌توانی با ما بازی کنی!", basket: "no" }
        ] },
      { type: "sort", practice: true, prompt: "بعد از هر کار چه می‌شود؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "😊", label: "بعدش خوب می‌شود", value: "good" }, { pic: "😟", label: "بعدش کسی ناراحت می‌شود", value: "hurt" }],
        items: [
          { pic: "🤝", label: "قسمت کردن", say: "قسمت کردن خوراکی با دوست", basket: "good" },
          { pic: "🗣️", label: "گفتن با «من»", say: "گفتن: من ناراحت شدم", basket: "good" },
          { pic: "🧹", label: "جمع کردن", say: "جمع کردن اسباب‌بازی‌ها بعد از بازی", basket: "good" },
          { pic: "📢", label: "مسخره کردن", say: "مسخره کردن یک بچه", basket: "hurt" },
          { pic: "🧱", label: "خراب کردن", say: "خراب کردن برج دوست", basket: "hurt" }
        ] },
      { type: "pairs", practice: true, prompt: "برای هر حس، چه چیزی کمک می‌کند؟ جفتشان کن.",
        pairs: [
          [{ label: "ناامید", say: "ناامید" }, { pic: "📅", say: "یک برنامه تازه برای فردا" }],
          [{ label: "خجالت‌زده", say: "خجالت‌زده" }, { pic: "🌷", say: "یک نفس آرام و لبخند یک دوست" }],
          [{ label: "بی‌حوصله", say: "بی‌حوصله" }, { pic: "🧩", say: "پیدا کردن یک بازی تازه" }],
          [{ label: "دلتنگ", say: "دلتنگ" }, { pic: "📞", say: "تماس یا نقاشی برای او" }],
          [{ label: "حسود", say: "حسود" }, { pic: "🤗", say: "گفتن به مامان: من هم بغل می‌خواهم" }]
        ] }
    ]
  },
  // ---------------- Sapling (نهال): mixed feelings, thoughts, plans, empathy, bullying, solving problems ----------------
  {
    id: "feel-sapling-1", subject: "feel", level: "sapling", emoji: "🎭", title: "دو احساس با هم",
    steps: [
      /* Two feelings at once: Arash's first day at a new school (excited and worried: both faces appear above
         him), and Shirin's cousin going home after a visit (happy it happened, sad it is over). */
      { type: "scene", prompt: "دو حس، با هم", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" }, room: { art: "fl-room", o: 0 },
          school: { art: "🏫", at: [132, 56], s: 1.9 },
          arash: { art: "fl-arash", at: [40, 86], s: 1.35 }, bag: { art: "fl-bag", at: [-9, -1], s: 0.55, under: "arash" },
          i1: { art: "🤩", at: [30, 22], s: 0.75, o: 0 }, i2: { art: "😟", at: [52, 22], s: 0.75, o: 0 },
          shirin: { art: "fl-shirin", at: [50, 86], s: 1.3, o: 0 }, kian: { art: "fl-kian", at: [104, 86], s: 1.3, o: 0 },
          kbag: { art: "fl-bag", at: [9, -1], s: 0.55, under: "kian" },
          j1: { art: "😊", at: [40, 22], s: 0.75, o: 0 }, j2: { art: "😢", at: [62, 22], s: 0.75, o: 0 },
          heart: { art: "fl-heart", at: [51, 10], s: 1, o: 0 }
        },
        scenes: [
          { caption: "امروز اولین روز آرش در یک مدرسهٔ تازه است.", do: all(
            [{ id: "arash.eyeO", to: { x: 0.9 }, at: 400, dur: 500 }, { id: "school", to: { s: 2 }, at: 900, dur: 700, yoyo: true, times: 2 }]) },
          { caption: "آرش هیجان‌زده است: شاید دوست‌های تازه پیدا کند!", do: all(
            [{ id: "i1", to: { o: 1 }, at: 300, dur: 400 }], face("arash", "joy", 300), arms("arash", 140, -140, 600, 400),
            [{ id: "arash", to: { y: "-4" }, at: 1000, dur: 1600, yoyo: true, times: 4, ease: "out" }]) },
          { caption: "و هم‌زمان کمی نگران است: اگر هیچ‌کس را نشناسد چه؟", do: all(
            arms("arash", 0, 0, 0, 500), [{ id: "i2", to: { o: 1 }, at: 400, dur: 400 }], face("arash", "worried", 600),
            [{ id: "arash.eyeO", to: { x: 0.6, y: 0.6 }, at: 800, dur: 400 }, { id: "i1", to: { s: 0.85 }, at: 1600, dur: 700, yoyo: true, times: 2 }, { id: "i2", to: { s: 0.85 }, at: 1600, dur: 700, yoyo: true, times: 2 }]) },
          { caption: "هر دو حس با هم درست‌اند. آرش یک نفس آرام می‌کشد و به طرف مدرسه می‌رود.", do: all(
            face("arash", "breatheIn", 300), breathe("arash", 400, 1800, 2000), face("arash", "happy", 2400),
            [{ id: "arash.eyeO", to: { x: 0.9, y: 0 }, at: 2400, dur: 300 }, { id: "arash", to: { x: 96 }, at: 2800, dur: 2200 },
              { id: "i1", path: "M30 22L86 22", at: 2800, dur: 2200 }, { id: "i2", path: "M52 22L108 22", at: 2800, dur: 2200 }],
            walk("arash", 2800, 2200)) },
          { caption: "پسرخالهٔ شیرین، کیان، چند روز مهمانشان بود. حالا دارد به شهر خودش برمی‌گردد.", do: all(
            show("yard school arash i1 i2", 0, 0, 700), show("room shirin kian", 1, 500, 700),
            face("kian", "happy", 1400), [{ id: "kian.armR", to: { r: -150 }, at: 1600, dur: 400 }, { id: "kian.armR", to: { r: -120 }, at: 2000, dur: 1200, yoyo: true, times: 4 },
              { id: "shirin.armL", to: { r: 150 }, at: 1800, dur: 400 }, { id: "shirin.armL", to: { r: 120 }, at: 2200, dur: 1200, yoyo: true, times: 4 }]) },
          { caption: "شیرین خوشحال است که با هم بازی کردند، و غمگین است که کیان می‌رود.", key: 3600, do: all(
            [{ id: "kian.armR", to: { r: 0 }, dur: 400 }, { id: "shirin.armL", to: { r: 0 }, dur: 400 },
              { id: "j1", to: { o: 1 }, at: 400, dur: 400 }], face("shirin", "happy", 400),
            [{ id: "j2", to: { o: 1 }, at: 1800, dur: 400 }], face("shirin", "caring", 1800),
            [{ id: "shirin.tear", to: { o: 1 }, at: 2400, dur: 300 }, { id: "shirin.tear", to: { y: 2.4 }, at: 2500, dur: 1200 },
              { id: "kian", to: { x: 176 }, at: 2600, dur: 2400 }], walk("kian", 2600, 2400)) },
          { caption: "آدم می‌تواند دو حس را با هم داشته باشد. هر دو راست‌اند.", do: all(
            [{ id: "shirin.tear", to: { o: 0, y: 0 }, dur: 500 }, { id: "heart", to: { o: 1 }, at: 400, dur: 400 },
              { id: "j1", to: { s: 0.9 }, at: 800, dur: 800, yoyo: true, times: 2 }, { id: "j2", to: { s: 0.9 }, at: 800, dur: 800, yoyo: true, times: 2 },
              { id: "heart", to: { s: 1.3 }, at: 800, dur: 1600, yoyo: true, times: 2 }],
            face("shirin", "calm", 600), arms("shirin", -42, 42, 1200, 700)) }
        ] },
      { type: "pairs", practice: true, prompt: "هر موقعیت را با دو حسی که با هم می‌آیند جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ pic: "🏫", say: "روز اول در یک مدرسه تازه" }, { label: "هیجان‌زده و نگران", say: "هیجان‌زده و نگران" }],
          [{ pic: "👋", say: "مهمانی که دارد می‌رود" }, { label: "خوشحال و غمگین", say: "خوشحال برای روزهای خوب، غمگین برای رفتنش" }],
          [{ pic: "🎢", say: "سوار شدن چرخ‌وفلک بزرگ" }, { label: "ترسیده و هیجان‌زده", say: "کمی ترسیده و خیلی هیجان‌زده" }],
          [{ pic: "🏆", say: "دوستم در مسابقه برنده شد و من نه" }, { label: "خوشحال و ناامید", say: "خوشحال برای دوستم، ناامید برای خودم" }]
        ] },
      { type: "talk", scene: "🤩 😟 😊 😢", caption: "تا حالا دو حس را با هم داشته‌ای؟ کی بود؟ اسم هر دو حس را بگو.",
        tips: [
          "به کودک بگویید که دو حس با هم کاملاً طبیعی است و یکی آن دیگری را «باطل» نمی‌کند.",
          "از خودتان مثال بزنید: «وقتی به خانه تازه رفتیم، هم خوشحال بودم و هم دلم برای خانه قبلی تنگ بود.»",
          "اگر کودک دربارهٔ تغییری بزرگ (جابه‌جایی، خداحافظی) حرف زد، هر دو حسش را جدی بگیرید و نگویید «غصه نخور، خوش می‌گذرد»."
        ] },
      { type: "doit", pic: "❤️", text: "روی کاغذ یک قلب بزرگ بکش و آن را دو قسمت کن. هر قسمت را با رنگ یکی از دو حسی که با هم داشتی رنگ کن، و به بزرگ‌ترت بگو کدام رنگ مال کدام حس است." },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-sapling-2", subject: "feel", level: "sapling", emoji: "💭", title: "فکر، احساس، کار",
    steps: [
      /* A thought changes a feeling and what we do: Shirin doesn't wave back; if Mina thinks «او از من بدش می‌آید»
         she feels sad and stands alone; if she thinks «شاید مرا ندید» she stays calm, goes over and says hello. */
      { type: "scene", prompt: "یک فکر، یک حس، یک کار", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" },
          shirin: { art: "fl-shirin", at: [180, 86], s: 1.25 },
          mina: { art: "fl-mina", at: [44, 86], s: 1.3 },
          tA: { art: "fl-think", at: [54, 38], o: 0 }, tAi: { art: "💔", at: [16, -18], s: 0.75, under: "tA" },
          tB: { art: "fl-think", at: [54, 38], o: 0 }, tBi: { art: "🤔", at: [16, -18], s: 0.75, under: "tB" },
          c1: { art: "💭", at: [116, 14], s: 0.7, o: 0 }, c2: { art: "⬅️", at: [98, 14], s: 0.5, o: 0 }, c3: { art: "💛", at: [80, 14], s: 0.7, o: 0 },
          c4: { art: "⬅️", at: [62, 14], s: 0.5, o: 0 }, c5: { art: "👣", at: [44, 14], s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "مینا در حیاط مدرسه برای شیرین دست تکان می‌دهد. شیرین جواب نمی‌دهد و رد می‌شود.", key: 3200, do: all(
            face("mina", "joy", 200), [{ id: "mina.armR", to: { r: -150 }, at: 500, dur: 400 }, { id: "mina.armR", to: { r: -120 }, at: 900, dur: 1600, yoyo: true, times: 4 },
              { id: "shirin.eyeO", to: { x: 0.9, y: -0.6 }, dur: 1 }, { id: "shirin", to: { x: 110 }, at: 400, dur: 3200 }],
            walk("shirin", 400, 3200), [{ id: "mina.armR", to: { r: 0 }, at: 3800, dur: 400 }], face("mina", "oops", 3800)) },
          { caption: "اگر مینا فکر کند «او از من بدش می‌آید»...", do: all(
            show("tA", 1, 300, 500), face("mina", "sorry", 600), [{ id: "tAi", to: { s: 0.9 }, at: 1000, dur: 600, yoyo: true, times: 2 }]) },
          { caption: "...غمگین می‌شود و تنها گوشه‌ای می‌ایستد.", do: all(
            face("mina", "sad", 300), [{ id: "mina", to: { x: 18 }, at: 600, dur: 1600 }, { id: "tA", to: { x: 28 }, at: 600, dur: 1600 }], walk("mina", 600, 1600),
            [{ id: "mina.upper", to: { y: 1.2 }, at: 2400, dur: 800 }, { id: "mina.eyeO", to: { y: 0.8 }, at: 2400, dur: 400 }]) },
          { caption: "اما اگر فکر کند «شاید مرا ندید»...", do: all(
            show("tA", 0, 0, 400), [{ id: "mina", to: { o: 0 }, dur: 400 }, { id: "mina", to: { x: 44 }, at: 400, dur: 1 },
              { id: "mina.upper", to: { y: 0 }, at: 400, dur: 1 }, { id: "mina.eyeO", to: { y: 0 }, at: 400, dur: 1 }, { id: "mina", to: { o: 1 }, at: 500, dur: 400 }],
            face("mina", "neutral", 400, 1), show("tB", 1, 900, 500), [{ id: "tBi", to: { s: 0.9 }, at: 1400, dur: 600, yoyo: true, times: 2 }],
            face("mina", "calm", 1800)) },
          { caption: "...آرام می‌ماند، جلو می‌رود و می‌گوید: «سلام شیرین!» شیرین می‌گوید: «سلام! اصلاً ندیدمت!»", key: 6000, do: all(
            show("tB", 0, 0, 400), face("mina", "happy", 300),
            [{ id: "mina", to: { x: 80 }, at: 500, dur: 1500 }], walk("mina", 500, 1500), talk("mina", 2200, 1200),
            [{ id: "shirin.eyeO", to: { x: -0.9, y: 0 }, at: 3000, dur: 400 }], face("shirin", "joy", 3400), talk("shirin", 3600, 1600),
            face("mina", "joy", 5200)) },
          { caption: "فکر ما روی حس ما اثر دارد، و حس ما روی کاری که می‌کنیم. می‌شود یک فکر مهربان‌تر و درست‌تر پیدا کرد.", hold: 7000, do: all(
            [{ id: "c1", to: { o: 1 }, at: 300, dur: 300 }, { id: "c2", to: { o: 1 }, at: 1000, dur: 300 }, { id: "c3", to: { o: 1 }, at: 1600, dur: 300 },
              { id: "c4", to: { o: 1 }, at: 2300, dur: 300 }, { id: "c5", to: { o: 1 }, at: 2900, dur: 300 },
              { id: "mina", to: { y: 84.5 }, at: 3600, dur: 400, yoyo: true, times: 2 }, { id: "shirin", to: { y: 84.5 }, at: 3800, dur: 400, yoyo: true, times: 2 }]) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "چه چیزی اول می‌آید؟ به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "💭", label: "یک فکر", say: "یک فکر: شاید مرا ندید" },
          { pic: "💛", label: "یک حس", say: "یک حس: آرام می‌مانم" },
          { pic: "👣", label: "یک کار", say: "یک کار: جلو می‌روم و سلام می‌کنم" }
        ] },
      { type: "sort", practice: true, prompt: "کدام فکر کمک می‌کند و کدام فکر حال آدم را بدتر می‌کند؟ هر فکر را بزن تا بشنوی.",
        baskets: [{ pic: "💡", label: "کمک می‌کند", value: "help" }, { pic: "🌧️", label: "حالم را بدتر می‌کند", value: "worse" }],
        items: [
          { pic: "🤔", label: "شاید مرا ندید", say: "دوستم دست تکان نداد. شاید مرا ندید.", basket: "help" },
          { pic: "💔", label: "از من بدش می‌آید", say: "دوستم دست تکان نداد. حتماً از من بدش می‌آید.", basket: "worse" },
          { pic: "🔁", label: "دفعه بعد تمرین می‌کنم", say: "نقاشی‌ام خوب نشد. دفعه بعد بیشتر تمرین می‌کنم.", basket: "help" },
          { pic: "🚫", label: "هیچ کاری بلد نیستم", say: "نقاشی‌ام خوب نشد. من هیچ کاری بلد نیستم.", basket: "worse" },
          { pic: "😄", label: "شاید به چیز دیگری خندید", say: "یکی خندید. شاید به چیز دیگری می‌خندید.", basket: "help" },
          { pic: "😖", label: "همه به من می‌خندند", say: "یکی خندید. همه به من می‌خندند.", basket: "worse" }
        ] },
      { type: "talk", scene: "💭 💛 👣", caption: "یک بار که ناراحت شدی را به یاد بیاور. چه فکری کردی؟ یک فکر دیگر، مهربان‌تر و درست‌تر، چه می‌توانست باشد؟",
        tips: [
          "دنبال فکر «خوب» یا «مثبت» زورکی نباشید؛ دنبال فکری بگردید که درست‌تر و مهربان‌تر است.",
          "سؤال‌های کمکی: «از کجا می‌دانی؟»، «یک دلیل دیگر چه می‌تواند باشد؟»، «به دوستت در این وضع چه می‌گفتی؟»",
          "حس کودک را تغییر ندهید و انکار نکنید. اول بگویید «می‌فهمم ناراحت شدی»، بعد با هم فکرها را بررسی کنید."
        ] },
      { type: "talk", scene: "🔄 💡", caption: "بازی «یک فکر دیگر»: بزرگ‌تر یک فکر بی‌فایده می‌گوید و تو یک فکر کمک‌کننده به جایش پیدا می‌کنی.",
        tips: [
          "فکرهای ساده بگویید: «باران آمد، روزم خراب شد»، «معلم صدایم نکرد، یعنی مرا دوست ندارد»، «این بازی را باختم، من بازی بلد نیستم».",
          "هر جواب معقولی را بپذیرید. چند فکر کمک‌کننده برای یک موقعیت وجود دارد.",
          "بعد جایتان را عوض کنید تا کودک برای شما فکر بی‌فایده بگوید."
        ] }
    ]
  },
  {
    id: "feel-sapling-3", subject: "feel", level: "sapling", emoji: "🧰", title: "جعبه‌ابزار آرامش من",
    steps: [
      { type: "breathe", cycles: 3 },
      { type: "breathe", pattern: [4, 4, 4, 4], cycles: 2 },
      { type: "ground" },
      { type: "relax", prompt: "سفت کن و ول کن: هر جای بدنت را اول سفت می‌کنی، بعد ول می‌کنی.",
        parts: [
          { pic: "🍋", tense: "دست‌هایت را مشت کن، محکم، مثل اینکه یک لیمو را می‌فشاری.", release: "حالا ول کن. دست‌هایت نرم و آرام شدند." },
          { pic: "🐢", tense: "مثل لاک‌پشت، شانه‌هایت را بالا ببر تا نزدیک گوش‌هایت.", release: "حالا شانه‌هایت را پایین بیاور. آرام شدند." },
          { pic: "🐾", tense: "انگشت‌های پایت را جمع کن و پاهایت را صاف و محکم کن.", release: "حالا ول کن. پاهایت سنگین و آرام شدند." }
        ] },
      { type: "paper", pic: "🧰", lang: "fa",
        text: "حالا برنامه آرامش خودت را روی کاغذ بنویس یا بکش: وقتی چه حسی دارم، کدام ابزار کمکم می‌کند، و از چه کسی کمک می‌خواهم. می‌توانی چند ابزار دیگر هم اضافه کنی: تکان دادن بدن، جای امن، بغل کردن عروسک، آب خوردن.",
        example: "وقتی عصبانی‌ام، می‌توانم نفس گل و شمع بکشم.\nوقتی نگرانم، می‌توانم «پنج چیز که می‌بینم» را بازی کنم.\nمی‌توانم از مامان یا خاله کمک بخواهم.",
        check: ["دست‌کم دو حس را نوشته یا کشیده؟", "برای هر حس یک ابزار انتخاب کرده؟", "اسم دست‌کم یک بزرگ‌تر را برای کمک خواستن نوشته؟"],
        note: "برنامه را کنار هم بخوانید و جایی بچسبانید که کودک ببیند. اگر ابزاری را دوست ندارد، لازم نیست در برنامه‌اش باشد." },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "تو حالا جعبه‌ابزار آرامش خودت را داری. هر وقت لازم شد، یکی را انتخاب کن.", pic: "🧰",
        tips: [
          "هر کودک ابزارهای متفاوتی را دوست دارد. بگذارید خودش انتخاب کند و در روزهای آرام تمرین کند.",
          "وقتی دیدید ناآرام است، آرام بپرسید: «کدام ابزارت الان کمک می‌کند؟» و کنارش انجامش دهید.",
          "برنامه را هر چند وقت یک بار با هم مرور کنید و اگر خواست، عوضش کنید.",
          "اگر هیچ ابزاری کمک نمی‌کند و ناآرامی کودک چند هفته ادامه دارد، با پزشک، مشاور مدرسه یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-sapling-4", subject: "feel", level: "sapling", emoji: "💪", title: "نقطه‌های قوت من",
    steps: [
      /* Strengths that are not marks: Kian is patient with plants (he waters one and it grows), Mina is funny
         (her friends laugh), Aydin is kind (he carries Grandma's bag), Shirin is brave (she speaks in front of the
         class though she was a little scared); then all four with their strengths, and a question mark for you. */
      { type: "scene", prompt: "هر کس نقطه‌های قوتی دارد", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          plant: { art: "fl-plant", at: [100, 86], s: 1.5, o: 0 }, can: { art: "fl-can", at: [86, 70], s: 1.3, flip: true, o: 0 },
          teacher: { art: "fl-teacher", at: [132, 88], s: 1.55, o: 0 },
          grandma: { art: "fl-grandma", at: [120, 88], s: 1.45, o: 0 }, gbag: { art: "fl-bag", at: [-12, -12], s: 0.55, under: "grandma" },
          kian: { art: "fl-kian", at: [76, 86], s: 1.3 },
          mina: { art: "fl-mina", at: [76, 86], s: 1.3, o: 0 }, haha1: { art: "fl-haha", at: [40, 46], s: 1.4, o: 0 }, haha2: { art: "fl-haha", at: [116, 46], s: 1.4, o: 0 },
          k1: { art: "fl-sam", at: [40, 86], s: 1.2, o: 0 }, k2: { art: "fl-yas", at: [116, 86], s: 1.2, o: 0 },
          aydin: { art: "fl-aydin", at: [70, 86], s: 1.3, o: 0 },
          shirin: { art: "fl-shirin", at: [70, 86], s: 1.3, o: 0 },
          s1: { art: "🌱", at: [22, 18], s: 0.7, o: 0 }, s2: { art: "😄", at: [52, 18], s: 0.7, o: 0 }, s3: { art: "🤝", at: [82, 18], s: 0.7, o: 0 },
          s4: { art: "🦁", at: [112, 18], s: 0.7, o: 0 }, q: { art: "❓", at: [142, 46], s: 1, o: 0 }
        },
        scenes: [
          { caption: "نقطهٔ قوت فقط نمرهٔ خوب نیست. هر کس نقطه‌های قوت خودش را دارد.", do: all(
            face("kian", "happy", 300), [{ id: "kian.eyeO", to: { x: 0.9 }, at: 800, dur: 400 }]) },
          { caption: "کیان صبور است و از گیاه‌ها خوب مراقبت می‌کند. هر روز به گلدانش آب می‌دهد و گلدان بزرگ می‌شود.", key: 4800, do: all(
            show("plant can", 1, 300, 500), [{ id: "kian.armR", to: { r: -40 }, at: 500, dur: 400 }, { id: "can", to: { r: 30 }, at: 1200, dur: 600 },
              { emit: "drop", where: [99, 64], spread: [3, 2], rise: -12, n: 14, at: 1600, dur: 2400, life: 800 },
              { id: "plant.leaves", to: { s: 1.35 }, at: 1800, dur: 3000 }, { id: "can", to: { r: 0 }, at: 4200, dur: 500 }, { id: "s1", to: { o: 1 }, at: 4400, dur: 400 }],
            face("kian", "calm", 1400)) },
          { caption: "مینا بامزه است. قصه‌های خنده‌دار تعریف می‌کند و دوستانش می‌خندند.", key: 4400, do: all(
            show("kian plant can", 0, 0, 500), [{ id: "kian.armR", to: { r: 0 }, dur: 1 }], show("mina k1 k2", 1, 500, 500),
            talk("mina", 1000, 2200), face("mina", "joy", 1000), face("k1", "joy", 3000), face("k2", "joy", 3000),
            [{ id: "haha1", to: { o: 1 }, at: 3000, dur: 200 }, { id: "haha2", to: { o: 1 }, at: 3000, dur: 200 },
              { id: "haha1", to: { s: 1.7 }, at: 3200, dur: 1600, yoyo: true, times: 4 }, { id: "haha2", to: { s: 1.7 }, at: 3200, dur: 1600, yoyo: true, times: 4 },
              { id: "s2", to: { o: 1 }, at: 3600, dur: 400 }]) },
          { caption: "آیدین مهربان است. کیسهٔ سنگین مادربزرگ را برایش می‌برد.", key: 5000, do: all(
            show("mina k1 k2 haha1 haha2", 0, 0, 500), show("aydin grandma", 1, 500, 500), face("grandma", "happy", 500, 1),
            [{ id: "aydin", to: { x: 102 }, at: 1000, dur: 1200 }], walk("aydin", 1000, 1200),
            [{ id: "aydin.armR", to: { r: -30 }, at: 2300, dur: 400 }, { id: "gbag", to: { x: -24, y: -10 }, at: 2600, dur: 600 }],
            face("grandma", "joy", 3000), talk("grandma", 3200, 1200), face("aydin", "joy", 3400), [{ id: "s3", to: { o: 1 }, at: 3800, dur: 400 }]) },
          { caption: "شیرین شجاع است. با اینکه کمی می‌ترسید، جلوی کلاس حرف زد.", key: 5200, do: all(
            show("aydin grandma", 0, 0, 500), show("shirin teacher", 1, 500, 500),
            face("shirin", "worried", 900), [{ id: "shirin.flush", to: { o: 0.8 }, at: 900, dur: 600 }],
            face("shirin", "breatheIn", 2000), breathe("shirin", 2000, 1400, 1600),
            [{ id: "shirin.flush", to: { o: 0 }, at: 3000, dur: 1600 }], face("shirin", "happy", 3400), talk("shirin", 3600, 1800),
            face("teacher", "joy", 4400), [{ id: "s4", to: { o: 1 }, at: 4800, dur: 400 }]) },
          { caption: "تو چه نقطه‌های قوتی داری؟", hold: 6000, do: all(
            show("teacher", 0, 0, 500),
            [{ id: "kian", to: { x: 22 }, dur: 1 }, { id: "mina", to: { x: 52 }, dur: 1 }, { id: "aydin", to: { x: 82 }, dur: 1 }, { id: "shirin", to: { x: 112 }, dur: 1 },
              { id: "aydin.armR", to: { r: 0 }, dur: 1 }],
            show("kian mina aydin", 1, 500, 600), face("kian", "joy", 600), face("mina", "joy", 600), face("aydin", "joy", 600), face("shirin", "joy", 600),
            [{ id: "q", to: { o: 1 }, at: 1600, dur: 400 }, { id: "q", to: { s: 1.2 }, at: 2000, dur: 1200, yoyo: true, times: 4 }]) }
        ] },
      { type: "pairs", practice: true, prompt: "هر نقطهٔ قوت را با تصویرش جفت کن. هر کارت را بزن تا بشنوی.",
        pairs: [
          [{ label: "صبور", say: "صبور" }, { pic: "🌱", say: "از گیاه مراقبت می‌کند" }],
          [{ label: "بامزه", say: "بامزه" }, { pic: "😄", say: "همه را می‌خنداند" }],
          [{ label: "مهربان", say: "مهربان" }, { pic: "🤝", say: "به دیگران کمک می‌کند" }],
          [{ label: "شجاع", say: "شجاع" }, { pic: "🦁", say: "با اینکه می‌ترسد، امتحان می‌کند" }],
          [{ label: "دقیق", say: "دقیق" }, { pic: "🔍", say: "چیزهای کوچک را می‌بیند" }]
        ] },
      { type: "talk", scene: "🌱 😄 🤝 🦁 🔍", caption: "تو در چه کارهایی خوبی؟ چه چیزی را دربارهٔ خودت دوست داری؟",
        tips: [
          "اگر کودک چیزی پیدا نکرد، با مثال کمکش کنید: «یادت هست چطور به برادرت کمک کردی؟ تو مهربانی.»",
          "از ویژگی‌ها و تلاش تعریف کنید، نه از «باهوش» بودن یا نمره.",
          "نقطه‌های قوت کوچک هم حساب‌اند: خوب گوش دادن، کشیدن گربه، درست کردن اسباب‌بازی."
        ] },
      { type: "paper", pic: "⭐", lang: "fa",
        text: "سه نقطهٔ قوت خودت را روی کاغذ بنویس یا بکش. بعد یک نقطهٔ قوت یکی از اعضای خانواده را هم بنویس.",
        example: "من مهربانم.\nمن خوب نقاشی می‌کشم.\nمن صبورم.\nبابا خوب قصه می‌گوید.",
        check: ["سه نقطهٔ قوت خودش را نوشته یا کشیده؟", "یک نقطهٔ قوت برای یکی از خانواده نوشته؟"],
        note: "اگر نوشتن سخت است، کودک بگوید و شما بنویسید. همه را بپذیرید و درست یا غلط نکنید." },
      { type: "talk", scene: "👨‍👩‍👧 ⭐", caption: "حالا به یکی از خانواده بگو چه نقطهٔ قوتی دارد. او هم یکی از نقطه‌های قوت تو را بگوید.",
        tips: [
          "دور سفره یا پیش از خواب، هر کس یک نقطهٔ قوت نفر کناری‌اش را بگوید.",
          "جمله‌ها را دقیق کنید: به جای «تو خوبی» بگویید «تو وقتی ناراحتم، بغلم می‌کنی؛ تو مهربانی».",
          "نقطه‌های قوت را با هم مقایسه نکنید. هر کس مال خودش را دارد."
        ] }
    ]
  },
  {
    id: "feel-sapling-5", subject: "feel", level: "sapling", emoji: "🎯", title: "هدف کوچک من",
    steps: [
      /* A small goal in small steps: Mina wants to read a whole storybook by the end of the week, two pages a day; a
         star for each day; on a hard day she rests and reads with Mom; at the end of the week, five stars and the
         book is finished. */
      { type: "scene", prompt: "هدف کوچک مینا", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room-night" },
          mom: { art: "fl-mom", at: [-20, 88], s: 1.6 },
          mina: { art: "fl-mina", at: [56, 86], s: 1.35 },
          book: { art: "fl-book", at: [56, 70], s: 1.2 },
          counter: { art: "counter", at: [134, 52], o: 0 },
          t1: { art: "⭐", at: [90, 14], s: 0.6, o: 0 }, t2: { art: "⭐", at: [74, 14], s: 0.6, o: 0 }, t3: { art: "⭐", at: [58, 14], s: 0.6, o: 0 },
          t4: { art: "⭐", at: [42, 14], s: 0.6, o: 0 }, t5: { art: "⭐", at: [26, 14], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "مینا یک هدف کوچک دارد: می‌خواهد یک کتاب قصه را تا آخر هفته خودش بخواند.", do: all(
            arms("mina", -40, 40, 300, 600), face("mina", "joy", 800), [{ id: "book", to: { s: 1.35 }, at: 1200, dur: 700, yoyo: true, times: 2 }]) },
          { caption: "هدفش را چند قدم کوچک می‌کند: هر روز دو صفحه.", do: all(
            [{ id: "book.page", to: { sx: -1 }, at: 400, dur: 900 }, { id: "book.page", to: { sx: 1 }, at: 1600, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 1700, dur: 900 },
              { id: "mina.eyeO", to: { y: 0.8 }, at: 300, dur: 400 }], face("mina", "calm", 400)) },
          { caption: "روز اول و روز دوم: می‌خواند و هر بار یک ستاره می‌گذارد.", hold: 7000, do: all(
            [{ id: "counter", to: { o: 1 }, dur: 300 }, { count: "counter", from: 1, to: 1, dur: 1 },
              { id: "book.page", to: { sx: 1 }, at: 200, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 300, dur: 900 }, { id: "book.page", to: { sx: 1 }, at: 1300, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 1400, dur: 900 },
              { id: "t1", to: { o: 1 }, at: 2400, dur: 400 }, { count: "counter", from: 2, to: 2, at: 3200, dur: 1 },
              { id: "book.page", to: { sx: 1 }, at: 3300, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 3400, dur: 900 }, { id: "book.page", to: { sx: 1 }, at: 4400, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 4500, dur: 900 },
              { id: "t2", to: { o: 1 }, at: 5500, dur: 400 }],
            face("mina", "joy", 2400), face("mina", "calm", 3200), face("mina", "joy", 5500)) },
          { caption: "روز سوم خسته است و کلمه‌ها سخت‌اند. مینا ناامید می‌شود.", do: all(
            [{ count: "counter", from: 3, to: 3, dur: 1 }, { id: "book.page", to: { sx: 1 }, at: 200, dur: 1 }],
            face("mina", "sad", 600), [{ id: "mina.upper", to: { y: 1.2 }, at: 900, dur: 900 }, { id: "mina.head", to: { r: 8 }, at: 900, dur: 900 }, { id: "book", to: { y: 74 }, at: 900, dur: 900 }]) },
          { caption: "کمی استراحت می‌کند. بعد از مامان کمک می‌خواهد و با هم آن دو صفحه را می‌خوانند.", key: 6400, do: all(
            [{ id: "mina.head", to: { r: 0 }, at: 1000, dur: 600 }], face("mina", "breatheIn", 400), breathe("mina", 500, 1600, 2000), face("mina", "happy", 2300),
            [{ id: "mina.upper", to: { y: 0 }, at: 2300, dur: 600 }, { id: "book", to: { y: 70 }, at: 2300, dur: 600 }],
            [{ id: "mom", to: { x: 30 }, at: 2400, dur: 1600 }], walk("mom", 2400, 1600), face("mom", "happy", 3800),
            [{ id: "mom.armR", to: { r: -60 }, at: 4100, dur: 500 }, { id: "book.page", to: { sx: -1 }, at: 4600, dur: 900 },
              { id: "t3", to: { o: 1 }, at: 5800, dur: 400 }], talk("mom", 4200, 1400)) },
          { caption: "روز چهارم و پنجم هم ادامه می‌دهد. آخر هفته کتاب تمام شد! مینا سربلند است.", key: 6200, hold: 7000, do: all(
            [{ id: "mom.armR", to: { r: 0 }, dur: 400 }, { count: "counter", from: 4, to: 4, at: 300, dur: 1 },
              { id: "book.page", to: { sx: 1 }, at: 400, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 500, dur: 900 }, { id: "t4", to: { o: 1 }, at: 1500, dur: 400 },
              { count: "counter", from: 5, to: 5, at: 2200, dur: 1 }, { id: "book.page", to: { sx: 1 }, at: 2300, dur: 1 }, { id: "book.page", to: { sx: -1 }, at: 2400, dur: 900 },
              { id: "t5", to: { o: 1 }, at: 3400, dur: 400 },
              { id: "mina.upper", to: { y: -1, sx: 1.04 }, at: 4000, dur: 600 }, { emit: "spark", where: [58, 14], spread: [40, 6], n: 10, at: 4000, dur: 1200, life: 1400 }],
            face("mina", "joy", 3800), face("mom", "joy", 4000)) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "قدم‌های رسیدن به یک هدف را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "🎯", label: "هدف را انتخاب کن", say: "یک هدف کوچک انتخاب کن" },
          { pic: "🪜", label: "قدم‌های کوچک", say: "آن را چند قدم کوچک کن" },
          { pic: "📅", label: "هر روز یک قدم", say: "هر روز یک قدم بردار" },
          { pic: "⭐", label: "ستاره بگذار", say: "برای هر قدم یک ستاره بگذار" },
          { pic: "🎉", label: "رسیدی!", say: "به هدفت رسیدی!" }
        ] },
      { type: "talk", scene: "🎯 🪜", caption: "تو چه هدف کوچکی داری؟ می‌توانی آن را به چند قدم کوچک تقسیم کنی؟",
        tips: [
          "هدف را کوچک و شدنی نگه دارید: یک هفته، نه یک سال. «یاد گرفتن بستن بند کفش» بهتر از «همه‌چیز را خودم انجام دهم» است.",
          "هدف را کودک انتخاب کند، نه شما. شما کمک کنید شدنی و روشن باشد.",
          "قدم‌ها را با هم بشمارید و برای هر روز یکی بنویسید."
        ] },
      { type: "paper", pic: "🎯", lang: "fa",
        text: "هدف کوچکت را روی کاغذ بنویس. زیرش قدم‌های هر روز را بنویس و کنار هر کدام یک جای خالی برای ستاره بگذار.",
        example: "هدف من: یاد گرفتن بستن بند کفش\nروز ۱: نگاه کردن به بابا ☆\nروز ۲: درست کردن یک حلقه ☆\nروز ۳: درست کردن دو حلقه ☆\nروز ۴: سفت کشیدن ☆",
        check: ["یک هدف کوچک و روشن نوشته؟", "دست‌کم سه قدم برایش نوشته؟", "جای ستاره کنار هر قدم گذاشته؟"],
        note: "کاغذ را به دیوار یا یخچال بزنید. هر روز که قدمی برداشت، خودش ستاره را بکشد." },
      { type: "talk", scene: "😞 ➡️ 💪", caption: "وقتی وسط راه سخت شد، چه کار می‌کنی؟",
        tips: [
          "راه‌ها را با هم بشمارید: کمی استراحت، کمک خواستن، کوچک‌تر کردن قدم، یادآوری اینکه چقدر جلو آمده.",
          "یک روز جا افتادن شکست نیست. فردا دوباره ادامه می‌دهیم.",
          "در پایان، رسیدن به هدف را جشن بگیرید، حتی ساده: یک بغل، یک ستاره بزرگ، یک قصه بیشتر."
        ] }
    ]
  },
  {
    id: "feel-sapling-6", subject: "feel", level: "sapling", emoji: "🫂", title: "جای او بودن",
    steps: [
      /* Empathy in three steps (notice, imagine, help): Nika, new in the class, stands alone; Shirin notices,
         imagines herself in Nika's place (a thought bubble) and invites her; at home, Arash's little brother loses
         a game and cries, and Arash comforts him. */
      { type: "scene", prompt: "سه قدم: می‌بینم، تصور می‌کنم، کمک می‌کنم", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" }, room: { art: "fl-room", o: 0 },
          nika: { art: "fl-nika", at: [130, 86], s: 1.3 },
          mina: { art: "fl-mina", at: [26, 86], s: 1.3 }, shirin: { art: "fl-shirin", at: [48, 86], s: 1.3 },
          ball: { art: "ball-side", at: [36, 86], s: 1.2 },
          i1: { art: "👀", at: [100, 14], s: 0.8, o: 0 }, i2: { art: "💭", at: [70, 14], s: 0.8, o: 0 }, i3: { art: "🤝", at: [40, 14], s: 0.8, o: 0 },
          think: { art: "fl-think", at: [58, 40], o: 0 }, mini: { art: "fl-shirin", at: [16, -7], s: 0.45, under: "think" },
          arash: { art: "fl-arash", at: [50, 86], s: 1.35, o: 0 }, baby: { art: "fl-baby", at: [104, 86], s: 0.95, o: 0 },
          dice: { art: "🎲", at: [80, 84], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "یک دختر تازه به کلاس آمده، به اسم نیکا. تنها ایستاده و با کسی حرف نمی‌زند.", do: all(
            face("nika", "sorry", 300), [{ id: "nika.eyeO", to: { y: 0.8 }, at: 500, dur: 400 }, { id: "nika.upper", to: { y: 1 }, at: 600, dur: 900 }],
            face("mina", "joy", 0), face("shirin", "joy", 0),
            [{ id: "ball", path: "M36 86Q42 70 48 80", at: 600, dur: 700 }, { id: "ball", path: "M48 80Q42 70 36 86", at: 1400, dur: 700 }]) },
          { caption: "قدم اول: می‌بینیم. شیرین متوجه می‌شود که نیکا تنهاست.", do: all(
            [{ id: "i1", to: { o: 1 }, at: 300, dur: 400 }, { id: "shirin.eyeO", to: { x: 0.9 }, at: 600, dur: 500 }, { id: "shirin.head", to: { r: -8 }, at: 600, dur: 500 }],
            face("shirin", "caring", 1000)) },
          { caption: "قدم دوم: خودمان را جای او می‌گذاریم. شیرین فکر می‌کند: «اگر من جای او بودم، چه حسی داشتم؟ تنها و کمی غمگین.»", do: all(
            [{ id: "i2", to: { o: 1 }, at: 300, dur: 400 }, { id: "think", to: { o: 1 }, at: 600, dur: 500 }], face("mini", "happy", 0, 1), face("mini", "sad", 1600)) },
          { caption: "قدم سوم: کمک می‌کنیم. شیرین جلو می‌رود و می‌گوید: «سلام! من شیرینم. می‌خواهی با ما بازی کنی؟»", key: 6200, do: all(
            show("think", 0, 0, 400), [{ id: "i3", to: { o: 1 }, at: 300, dur: 400 }, { id: "shirin.head", to: { r: 0 }, at: 300, dur: 400 }],
            face("shirin", "happy", 400), [{ id: "shirin", to: { x: 106 }, at: 600, dur: 1800 }], walk("shirin", 600, 1800), talk("shirin", 2600, 2400),
            [{ id: "nika.eyeO", to: { x: -0.9, y: 0 }, at: 3000, dur: 400 }, { id: "nika.upper", to: { y: 0 }, at: 3000, dur: 600 }], face("nika", "joy", 5000),
            [{ id: "nika.armL", to: { r: 40 }, at: 5400, dur: 500 }]) },
          { caption: "در خانه، برادر کوچک آرش در بازی باخت و گریه می‌کند. آرش می‌بیند و فکر می‌کند: «باختن سخت است.»", key: 4200, do: all(
            show("yard nika mina shirin ball i1 i2 i3", 0, 0, 700), show("room arash baby dice", 1, 500, 700),
            face("baby", "sad", 1200), [{ id: "baby.tear", to: { o: 1 }, at: 1600, dur: 300 }, { id: "baby.tear", to: { y: 2.4 }, at: 1700, dur: 1400 }],
            [{ id: "arash.eyeO", to: { x: 0.9 }, at: 1800, dur: 400 }], face("arash", "caring", 2400)) },
          { caption: "آرش کنارش می‌رود، دستش را روی شانه‌اش می‌گذارد و می‌گوید: «می‌فهمم ناراحتی. بیا با هم دوباره بازی کنیم.»", key: 5600, do: all(
            [{ id: "arash", to: { x: 86 }, at: 300, dur: 1400 }], walk("arash", 300, 1400),
            [{ id: "arash.armR", to: { r: -60 }, at: 1800, dur: 600 }], talk("arash", 2200, 2400),
            [{ id: "baby.tear", to: { o: 0, y: 0 }, at: 3600, dur: 600 }, { id: "baby.eyeO", to: { x: -0.9 }, at: 3600, dur: 400 }],
            face("baby", "happy", 4400), [{ id: "dice", to: { r: 360 }, at: 4800, dur: 900 }], face("arash", "joy", 5000)) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "سه قدم جای دیگری بودن را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "👀", label: "می‌بینم", say: "می‌بینم: او چه حسی دارد؟" },
          { pic: "💭", label: "تصور می‌کنم", say: "خودم را جای او می‌گذارم" },
          { pic: "🤝", label: "کمک می‌کنم", say: "کمک می‌کنم" }
        ] },
      { type: "sort", practice: true, prompt: "کدام کار نشان می‌دهد خودمان را جای او گذاشته‌ایم؟ هر کار را بزن تا بشنوی.",
        baskets: [{ pic: "💚", label: "جای او بودن", value: "yes" }, { pic: "💔", label: "او ناراحت‌تر می‌شود", value: "no" }],
        items: [
          { pic: "❓", label: "پرسیدن حالش", say: "پرسیدن: حالت خوب است؟", basket: "yes" },
          { pic: "✏️", label: "کمک به جمع کردن", say: "کمک به جمع کردن مدادهای ریخته", basket: "yes" },
          { pic: "🗣️", label: "«می‌فهمم سخت است»", say: "گفتن: می‌فهمم سخت است", basket: "yes" },
          { pic: "👋", label: "دعوت به بازی", say: "دعوت کردن بچه تازه به بازی", basket: "yes" },
          { pic: "😆", label: "خندیدن به بازنده", say: "خندیدن به کسی که باخت", basket: "no" },
          { pic: "🙈", label: "بی‌توجهی", say: "ادامه دادن بازی خودم و نگاه نکردن به او", basket: "no" }
        ] },
      { type: "talk", scene: "👀 💭 🤝", caption: "یک بار که کسی ناراحت بود را به یاد بیاور. اگر جای او بودی، چه حسی داشتی؟ چه کاری کمکش می‌کرد؟",
        tips: [
          "این سه قدم را در قصه‌ها و کارتون‌ها هم تمرین کنید: «فکر می‌کنی او الان چه حسی دارد؟ اگر تو بودی چه می‌خواستی؟»",
          "کمک لازم نیست بزرگ باشد: یک سؤال، یک لبخند، نشستن کنار کسی.",
          "وقتی کودک با کسی همدلی کرد، اسمش را بگویید: «دیدی برادرت ناراحت است و کنارش رفتی. این یعنی همدلی.»"
        ] },
      { type: "talk", scene: "🧑‍🤝‍🧑 💛", caption: "اگر یک بچه تازه به کلاس یا کوچهٔ شما بیاید، چه کار می‌کنی تا حس بهتری داشته باشد؟",
        tips: [
          "با هم چند جمله برای شروع پیدا کنید: «سلام، اسم من ... است. اسم تو چیست؟»، «می‌خواهی با ما بازی کنی؟»",
          "به کودک یادآوری کنید که بچه تازه شاید زبان یا رسم‌های دیگری داشته باشد، و این فرصتی برای یاد گرفتن است."
        ] }
    ]
  },
  {
    id: "feel-sapling-7", subject: "feel", level: "sapling", emoji: "🛑", title: "قلدری نه!",
    steps: [
      /* Teasing and bullying, calmly and without any violence: Aydin and Sam joke and both laugh; two children laugh
         at Kian and leave him out day after day (a counter of days); what bullying is (again and again, on purpose,
         to hurt); Kian says «بس کنید!» and walks away; Mina stays with him; they tell the teacher. */
      { type: "scene", prompt: "شوخی یا قلدری؟", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" },
          aydin: { art: "fl-aydin", at: [44, 86], s: 1.3 }, sam: { art: "fl-sam", at: [74, 86], s: 1.3 },
          haha1: { art: "fl-haha", at: [44, 40], s: 1.4, o: 0 }, haha2: { art: "fl-haha", at: [74, 40], s: 1.4, o: 0 },
          b1: { art: "fl-boy2", at: [-20, 86], s: 1.3 }, b2: { art: "fl-boy3", at: [-20, 86], s: 1.25 },
          kian: { art: "fl-kian", at: [180, 86], s: 1.3 },
          mina: { art: "fl-mina", at: [180, 86], s: 1.3 }, teacher: { art: "fl-teacher", at: [182, 88], s: 1.55 },
          counter: { art: "counter", at: [140, 20], o: 0 }, cal: { art: "📅", at: [124, 20], s: 0.6, o: 0 },
          w1: { art: "🔁", at: [112, 14], s: 0.75, o: 0 }, w2: { art: "🎯", at: [84, 14], s: 0.75, o: 0 }, w3: { art: "💔", at: [56, 14], s: 0.75, o: 0 }
        },
        scenes: [
          { caption: "آیدین و سام با هم شوخی می‌کنند و هر دو می‌خندند. این شوخی است: برای هر دو خوشایند است.", key: 3800, do: all(
            talk("aydin", 300, 1400), face("sam", "joy", 1700), face("aydin", "joy", 1900), talk("sam", 2000, 1200),
            [{ id: "haha1", to: { o: 1 }, at: 2200, dur: 200 }, { id: "haha2", to: { o: 1 }, at: 2200, dur: 200 },
              { id: "haha1", to: { s: 1.7 }, at: 2400, dur: 1800, yoyo: true, times: 4 }, { id: "haha2", to: { s: 1.7 }, at: 2400, dur: 1800, yoyo: true, times: 4 },
              { id: "aydin", to: { y: "-2" }, at: 2400, dur: 1800, yoyo: true, times: 4 }, { id: "sam", to: { y: "-2" }, at: 2600, dur: 1800, yoyo: true, times: 4 }]) },
          { caption: "اما چند بچه هر روز به کیان می‌خندند و او را بازی نمی‌دهند. کیان ناراحت است، و آن‌ها باز هم ادامه می‌دهند.", key: 7400, hold: 8000, do: all(
            show("aydin sam haha1 haha2", 0, 0, 600),
            [{ id: "kian", to: { x: 124 }, at: 400, dur: 1600 }, { id: "b1", to: { x: 52 }, at: 400, dur: 1800 }, { id: "b2", to: { x: 76 }, at: 600, dur: 1800 }],
            walk("kian", 400, 1600), walk("b1", 400, 1800), walk("b2", 600, 1800),
            show("cal counter", 1, 2400, 400), [{ count: "counter", from: 1, to: 3, at: 2600, dur: 4400 }],
            face("b1", "joy", 2600), face("b2", "joy", 2600), [{ id: "b1.armR", to: { r: -70 }, at: 2800, dur: 500 }],
            talk("b1", 3000, 3600), talk("b2", 3400, 3200),
            face("kian", "sad", 3400), [{ id: "kian.upper", to: { y: 1.2 }, at: 3800, dur: 900 }, { id: "kian.eyeO", to: { y: 0.8 }, at: 3800, dur: 500 }]) },
          { caption: "این قلدری است: کاری که بارها و بارها، از عمد، برای ناراحت کردن کسی انجام می‌شود.", hold: 7000, do: all(
            [{ id: "w1", to: { o: 1 }, at: 400, dur: 400 }, { id: "w2", to: { o: 1 }, at: 2000, dur: 400 }, { id: "w3", to: { o: 1 }, at: 3600, dur: 400 },
              { id: "w1", to: { s: 0.85 }, at: 800, dur: 600, yoyo: true, times: 2 }, { id: "w2", to: { s: 0.85 }, at: 2400, dur: 600, yoyo: true, times: 2 }, { id: "w3", to: { s: 0.85 }, at: 4000, dur: 600, yoyo: true, times: 2 }],
            [{ id: "cal", to: { o: 0 }, dur: 400 }, { id: "counter", to: { o: 0 }, dur: 400 }]) },
          { caption: "کیان محکم و آرام می‌گوید: «بس کنید!» و از آنجا دور می‌شود.", key: 3200, do: all(
            show("w1 w2 w3", 0, 0, 400), [{ id: "kian.upper", to: { y: 0 }, at: 300, dur: 600 }, { id: "kian.eyeO", to: { x: -0.9, y: 0 }, at: 300, dur: 400 }],
            face("kian", "cross", 600), [{ id: "kian.armL", to: { r: 80 }, at: 900, dur: 400 }], talk("kian", 1100, 1400),
            face("b1", "oops", 2400), face("b2", "oops", 2400), [{ id: "b1.armR", to: { r: 0 }, at: 2400, dur: 400 }],
            [{ id: "kian.armL", to: { r: 0 }, at: 3000, dur: 400 }, { id: "kian", to: { x: 146 }, at: 3400, dur: 1400 }], walk("kian", 3400, 1400), face("kian", "sorry", 3400)) },
          { caption: "مینا این را دیده است. کنار کیان می‌رود و با او می‌ماند.", do: all(
            [{ id: "b1", to: { x: -20 }, dur: 2000 }, { id: "b2", to: { x: -20 }, at: 200, dur: 2000 }], walk("b1", 0, 2000), walk("b2", 200, 2000),
            [{ id: "mina", to: { x: 120 }, at: 600, dur: 1800 }], walk("mina", 600, 1800), face("mina", "caring", 2200), talk("mina", 2600, 1400),
            [{ id: "kian.eyeO", to: { x: -0.9 }, at: 2400, dur: 400 }], face("kian", "happy", 4000)) },
          { caption: "بعد با هم به آقای معلم می‌گویند. اگر باز هم تکرار شد، باز هم می‌گویند.", key: 5600, do: all(
            [{ id: "teacher", to: { x: 60 }, dur: 1 }, { id: "teacher", to: { o: 0 }, dur: 1 }, { id: "teacher", to: { o: 1 }, at: 200, dur: 600 },
              { id: "kian", to: { x: 104 }, at: 600, dur: 1400 }, { id: "mina", to: { x: 128 }, at: 600, dur: 1400 }],
            walk("kian", 600, 1400), walk("mina", 600, 1400), [{ id: "kian.eyeO", to: { x: -0.9 }, at: 1800, dur: 300 }, { id: "mina.eyeO", to: { x: -0.9 }, at: 1800, dur: 300 }],
            talk("kian", 2200, 2200), face("teacher", "caring", 2200),
            [{ id: "teacher.head", to: { r: 8 }, at: 4400, dur: 400, yoyo: true, times: 2 }, { id: "teacher.armR", to: { r: -60 }, at: 4800, dur: 600 }], talk("teacher", 5000, 1400),
            face("kian", "calm", 5400)) }
        ] },
      { type: "sort", practice: true, prompt: "شوخی است یا قلدری؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "😄", label: "شوخی", value: "joke" }, { pic: "🛑", label: "قلدری", value: "bully" }],
        items: [
          { pic: "😂", label: "هر دو می‌خندند", say: "دو دوست با هم شوخی می‌کنند و هر دو می‌خندند.", basket: "joke" },
          { pic: "🙋", label: "گفت بس کن، تمام شد", say: "وقتی دوستم گفت «خوشم نیامد»، شوخی را تمام کردم.", basket: "joke" },
          { pic: "🗓️", label: "هر روز اسم بد", say: "هر روز یک اسم بد روی یک بچه می‌گذارند.", basket: "bully" },
          { pic: "🚫", label: "همیشه بیرونش می‌کنند", say: "همیشه یک بچه را از بازی بیرون می‌کنند، از عمد.", basket: "bully" },
          { pic: "🎒", label: "وسایلش را قایم می‌کنند", say: "بارها و بارها وسایلش را قایم می‌کنند تا ناراحت شود.", basket: "bully" }
        ] },
      { type: "sort", practice: true, prompt: "اگر قلدری با من یا کسی که می‌بینم انجام شود، کدام کار کمک می‌کند؟",
        baskets: [{ pic: "💚", label: "کمک می‌کند", value: "yes" }, { pic: "💔", label: "کمک نمی‌کند", value: "no" }],
        items: [
          { pic: "✋", label: "«بس کن!»", say: "محکم و آرام گفتن: بس کن!", basket: "yes" },
          { pic: "🚶", label: "دور شدن", say: "دور شدن از آنجا", basket: "yes" },
          { pic: "🤝", label: "ماندن کنارش", say: "رفتن و ماندن کنار بچه‌ای که اذیت می‌شود", basket: "yes" },
          { pic: "🧑‍🏫", label: "گفتن به بزرگ‌تر", say: "گفتن به یک بزرگ‌تر، و باز هم گفتن اگر تکرار شد", basket: "yes" },
          { pic: "🤫", label: "ساکت ماندن", say: "به هیچ‌کس نگفتن", basket: "no" },
          { pic: "😆", label: "همراهی با خنده", say: "با بقیه خندیدن", basket: "no" }
        ] },
      { type: "talk", scene: "✋ 🚶 🤝 🧑‍🏫", caption: "اگر کسی بارها تو را اذیت کند، به چه کسی می‌گویی؟ اگر ببینی کسی را اذیت می‌کنند، چه کار می‌کنی؟",
        tips: [
          "آرام گوش کنید و حرف کودک را باور کنید. نگویید «محلشان نگذار» یا «تو هم بزن».",
          "به کودک بگویید گفتن به بزرگ‌تر «خبرچینی» نیست؛ کمک خواستن است.",
          "دربارهٔ کسانی که اذیت می‌کنند، با برچسب «بچه بد» حرف نزنید. بگویید «کار بدی است» و روی کار تمرکز کنید.",
          "با کودک تمرین کنید که با صدای محکم و آرام بگوید «بس کن!» و دور شود."
        ] },
      { type: "forparents", guide: "feelings", guideLabel: "وقتی کودک نگران یا ناآرام است، در راهنمای والدین",
        text: "هیچ‌کس حق ندارد بارها و بارها اذیتت کند. می‌توانی بگویی «بس کن»، دور شوی و به یک بزرگ‌تر بگویی.", pic: "🛑",
        tips: [
          "نشانه‌هایی که شاید نشان دهد کودک اذیت می‌شود: نخواستن مدرسه رفتن، گم شدن یا خراب شدن وسایل، دل‌درد صبح‌ها، گوشه‌گیری، بد خوابیدن.",
          "اگر کودک گفت اذیت می‌شود، از او تشکر کنید، آرام بمانید و با معلم یا مدیر مدرسه صحبت کنید. پیگیری کنید تا مطمئن شوید تمام شده.",
          "اگر کودک خودش دیگری را اذیت کرده، آرام با او حرف بزنید، بپرسید چه شده، و کمک کنید جبران کند. تحقیر و تنبیه سخت کمکی نمی‌کند.",
          "اگر کودک بعد از اذیت شدن مدام ناراحت، ترسیده یا گوشه‌گیر است، یا از آسیب زدن به خودش حرف زد، با مشاور مدرسه یا روان‌شناس کودک صحبت کنید."
        ] }
    ]
  },
  {
    id: "feel-sapling-8", subject: "feel", level: "sapling", emoji: "🚦", title: "چراغ راهنمایی",
    steps: [
      /* Problem solving like a traffic light: Aydin and Mina both want the same ball; red (stop and calm down),
         yellow (say the problem, think of ways: in turns, together, another game), green (choose, try, see how it
         went). */
      { type: "scene", prompt: "حل مسئله با چراغ راهنمایی", bg: "#cfe8f5",
        parts: {
          yard: { art: "fl-yard" },
          light: { art: "fl-light", at: [146, 86], s: 1.2 },
          aydin: { art: "fl-aydin", at: [50, 86], s: 1.3 }, mina: { art: "fl-mina", at: [88, 86], s: 1.3 },
          ball: { art: "ball-side", at: [69, 72], s: 1.3 },
          puffA: { art: "fl-puff", at: [3, -29], o: 0, under: "aydin" }, puffM: { art: "fl-puff", at: [3, -29], o: 0, under: "mina" },
          o1: { art: "🔄", at: [100, 18], s: 0.7, o: 0 }, o2: { art: "🤝", at: [72, 18], s: 0.7, o: 0 }, o3: { art: "🎲", at: [44, 18], s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "آیدین و مینا هر دو یک توپ را می‌خواهند. هر دو آن را می‌کشند و عصبانی می‌شوند.", do: all(
            arms("aydin", 0, -50, 0, 500), arms("mina", 50, 0, 0, 500), face("aydin", "angry", 600), face("mina", "angry", 600),
            [{ id: "ball", to: { x: 66 }, at: 900, dur: 500, yoyo: true, times: 6 }, { id: "aydin.flush", to: { o: 1 }, at: 1200, dur: 800 }, { id: "mina.flush", to: { o: 1 }, at: 1200, dur: 800 }],
            talk("aydin", 1400, 1200), talk("mina", 1600, 1200)) },
          { caption: "چراغ قرمز: می‌ایستیم و آرام می‌شویم.", key: 6200, hold: 7000, do: all(
            [{ id: "light.lr", to: { o: 1 }, dur: 400 }], arms("aydin", 0, 0, 300, 500), arms("mina", 0, 0, 300, 500),
            [{ id: "ball", to: { y: 86 }, at: 400, dur: 600, ease: "in" }],
            face("aydin", "breatheIn", 1000), face("mina", "breatheIn", 1000), breathe("aydin", 1100, 1800, 2200), breathe("mina", 1100, 1800, 2200),
            face("aydin", "breatheOut", 2900), face("mina", "breatheOut", 2900),
            [{ id: "puffA", to: { o: 1 }, at: 3000, dur: 300 }, { id: "puffA", to: { x: 9 }, at: 3000, dur: 1800 }, { id: "puffA", to: { o: 0, x: 3 }, at: 4800, dur: 300 },
              { id: "puffM", to: { o: 1 }, at: 3000, dur: 300 }, { id: "puffM", to: { x: 9 }, at: 3000, dur: 1800 }, { id: "puffM", to: { o: 0, x: 3 }, at: 4800, dur: 300 },
              { id: "aydin.flush", to: { o: 0 }, at: 3000, dur: 2400 }, { id: "mina.flush", to: { o: 0 }, at: 3000, dur: 2400 }],
            face("aydin", "calm", 5600), face("mina", "calm", 5600)) },
          { caption: "چراغ زرد: مشکل را می‌گوییم: «دو نفریم و یک توپ.» بعد راه‌ها را فکر می‌کنیم: نوبتی، با هم، یا یک بازی دیگر.", hold: 8400, do: all(
            [{ id: "light.lr", to: { o: 0 }, dur: 300 }, { id: "light.ly", to: { o: 1 }, at: 200, dur: 400 }], face("aydin", "neutral", 300), face("mina", "neutral", 300),
            talk("mina", 600, 1800),
            [{ id: "o1", to: { o: 1 }, at: 3000, dur: 400 }, { id: "o2", to: { o: 1 }, at: 4200, dur: 400 }, { id: "o3", to: { o: 1 }, at: 5400, dur: 400 },
              { id: "aydin.head", to: { r: -8 }, at: 3000, dur: 600 }, { id: "mina.head", to: { r: 8 }, at: 3200, dur: 600 }],
            talk("aydin", 3000, 3400)) },
          { caption: "چراغ سبز: یک راه را انتخاب می‌کنیم و امتحانش می‌کنیم. آن‌ها با هم توپ‌بازی می‌کنند.", key: 4400, hold: 7000, do: all(
            [{ id: "light.ly", to: { o: 0 }, dur: 300 }, { id: "light.lg", to: { o: 1 }, at: 200, dur: 400 },
              { id: "aydin.head", to: { r: 0 }, dur: 400 }, { id: "mina.head", to: { r: 0 }, dur: 400 },
              { id: "o1", to: { o: 0.3 }, at: 400, dur: 400 }, { id: "o3", to: { o: 0.3 }, at: 400, dur: 400 }, { id: "o2", to: { s: 0.9 }, at: 600, dur: 600, yoyo: true, times: 2 }],
            face("aydin", "happy", 600), face("mina", "happy", 600),
            [{ id: "ball", path: "M69 86Q60 60 52 72", at: 1600, dur: 800 }, { id: "aydin.armR", to: { r: -40 }, at: 2400, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M52 72Q70 46 86 72", at: 3000, dur: 1000 }, { id: "mina.armL", to: { r: 40 }, at: 4000, dur: 300, yoyo: true, times: 2 },
              { id: "ball", path: "M86 72Q70 46 52 72", at: 4600, dur: 1000 }]) },
          { caption: "بعد می‌بینیم چطور شد: هر دو خوشحال‌اند. اگر نشده بود، راه دیگری را امتحان می‌کردند.", do: all(
            [{ id: "ball", path: "M52 72Q60 76 69 86", at: 200, dur: 700 }],
            face("aydin", "joy", 600), face("mina", "joy", 600),
            [{ id: "aydin", to: { y: "-3" }, at: 900, dur: 1400, yoyo: true, times: 2 }, { id: "mina", to: { y: "-3" }, at: 1100, dur: 1400, yoyo: true, times: 2 },
              { emit: "spark", where: [69, 40], spread: [30, 12], n: 8, at: 1400, dur: 1200, life: 1400 }]) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "قدم‌های چراغ راهنمایی را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "🔴", label: "بایست و آرام شو", say: "قرمز: بایست و آرام شو" },
          { pic: "🟡", label: "مشکل را بگو", say: "زرد: مشکل را بگو" },
          { pic: "💡", label: "راه‌ها را فکر کن", say: "زرد: راه‌ها را فکر کن" },
          { pic: "🟢", label: "انتخاب کن و امتحان کن", say: "سبز: یکی را انتخاب کن و امتحان کن" },
          { pic: "👀", label: "ببین چطور شد", say: "سبز: ببین چطور شد" }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "مداد مینا گم شده. قدم‌هایش را به ترتیب بچین.",
        items: [
          { pic: "🔴", label: "یک نفس آرام", say: "اول یک نفس آرام می‌کشد" },
          { pic: "🟡", label: "«مدادم گم شده»", say: "می‌گوید: مدادم گم شده و الان لازمش دارم" },
          { pic: "💡", label: "راه‌ها", say: "فکر می‌کند: بگردم، بپرسم، یا قرض بگیرم" },
          { pic: "🟢", label: "قرض می‌گیرد", say: "از دوستش مداد قرض می‌گیرد" },
          { pic: "👀", label: "شد!", say: "نگاه می‌کند: شد! بعد از کلاس هم دنبال مدادش می‌گردد" }
        ] },
      { type: "talk", scene: "🔴 🟡 🟢", caption: "یک مشکل کوچک از این هفته را بگو. با چراغ راهنمایی، چه راه‌هایی برایش پیدا می‌کنی؟",
        tips: [
          "مشکل‌های واقعی و کوچک انتخاب کنید: دعوا سر کنترل تلویزیون، فراموش کردن تکلیف، نوبت حمام.",
          "در مرحلهٔ زرد، هر ایده‌ای را بنویسید، حتی خنده‌دارها. بعد با هم ببینید کدام شدنی و منصف است.",
          "اگر راه انتخاب‌شده جواب نداد، بگویید: «اشکالی ندارد. برگردیم سراغ زرد.»"
        ] },
      { type: "talk", scene: "🚦 👨‍👩‍👧", caption: "دفعه بعد که در خانه مشکلی پیش آمد، یکی بگوید «چراغ قرمز!» و همه با هم قدم‌ها را بروید.",
        tips: [
          "یک چراغ راهنمایی کاغذی بکشید و به یخچال بزنید.",
          "خودتان هم در دعواهای بزرگ‌ترها از آن استفاده کنید و بلند فکر کنید تا کودک ببیند."
        ] }
    ]
  },
  {
    id: "feel-sapling-9", subject: "feel", level: "sapling", emoji: "🕊️", title: "آشتی",
    steps: [
      /* A real apology: Sam knocks paint water over Arash's drawing; he calms down, then says what he did, how Arash
         feels and how he will make it right (each shown as a card); Arash accepts and they paint a new picture. */
      { type: "scene", prompt: "یک عذرخواهی واقعی", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          table: { art: "fl-table", at: [80, 88], s: 1.3 },
          paper: { art: "fl-paper", at: [72, 63.5], s: 0.9 }, spill: { art: "fl-spill", at: [72, 54], s: 1.3, o: 0 },
          cup: { art: "🥛", at: [92, 60], s: 0.5 },
          arash: { art: "fl-arash", at: [40, 86], s: 1.3 }, sam: { art: "fl-sam", at: [118, 86], s: 1.3 },
          puff: { art: "fl-puff", at: [3, -29], o: 0, under: "sam" },
          c1: { art: "💧", at: [116, 14], s: 0.7, o: 0 }, c2: { art: "😢", at: [90, 14], s: 0.7, o: 0 }, c3: { art: "🤝", at: [64, 14], s: 0.7, o: 0 }, c4: { art: "💛", at: [38, 14], s: 0.7, o: 0 }
        },
        scenes: [
          { caption: "سام بی‌حواس لیوان آب رنگ را روی نقاشی آرش ریخت. آرش ناراحت شد.", key: 3400, do: all(
            [{ id: "sam", to: { x: 100 }, at: 200, dur: 1000 }], walk("sam", 200, 1000),
            [{ id: "sam.armL", to: { r: 50 }, at: 1300, dur: 300 }, { id: "cup", to: { r: -100, x: 84, y: 62 }, at: 1500, dur: 500, ease: "in" },
              { id: "spill", to: { o: 1 }, at: 1900, dur: 500 }, { id: "spill", to: { s: 1.6 }, at: 1900, dur: 900 }],
            face("sam", "oops", 2000), face("arash", "sad", 2600), [{ id: "arash.eyeO", to: { x: 0.9, y: 0.6 }, at: 2400, dur: 400 }]) },
          { caption: "سام اول یک نفس آرام می‌کشد. بعد یک عذرخواهی واقعی می‌کند.", do: all(
            [{ id: "sam.armL", to: { r: 0 }, dur: 400 }], face("sam", "breatheIn", 400), breathe("sam", 500, 1800, 2200), face("sam", "breatheOut", 2300),
            [{ id: "puff", to: { o: 1 }, at: 2400, dur: 300 }, { id: "puff", to: { x: 9 }, at: 2400, dur: 1800 }, { id: "puff", to: { o: 0, x: 3 }, at: 4200, dur: 300 }],
            face("sam", "sorry", 4500), [{ id: "sam.eyeO", to: { x: -0.9 }, at: 4500, dur: 400 }]) },
          { caption: "می‌گوید چه کرد: «ببخشید که آب را روی نقاشی‌ات ریختم.»", do: all(
            [{ id: "c1", to: { o: 1 }, at: 200, dur: 400 }], talk("sam", 500, 2200), [{ id: "arash.eyeO", to: { x: 0.9, y: 0 }, at: 600, dur: 400 }]) },
          { caption: "می‌گوید او چه حسی دارد: «می‌دانم ناراحت شدی؛ خیلی برایش زحمت کشیده بودی.»", do: all(
            [{ id: "c2", to: { o: 1 }, at: 200, dur: 400 }], talk("sam", 500, 2800), face("arash", "sorry", 2000)) },
          { caption: "جبران می‌کند: «بیا کمکت کنم یک نقاشی تازه بکشی. کاغذ هم از خودم.»", do: all(
            [{ id: "c3", to: { o: 1 }, at: 200, dur: 400 }], talk("sam", 500, 2400), [{ id: "sam.armL", to: { r: 50 }, at: 1200, dur: 500 }]) },
          { caption: "آرش می‌گوید: «باشد، قبول.» با هم یک نقاشی تازه می‌کشند و آشتی می‌کنند.", key: 6000, hold: 7000, do: all(
            [{ id: "c4", to: { o: 1 }, at: 200, dur: 400 }], face("arash", "happy", 300), talk("arash", 500, 1200),
            [{ id: "spill", to: { o: 0 }, at: 1800, dur: 400 }, { id: "paper.pic", to: { o: 0 }, at: 1800, dur: 300 }, { id: "cup", to: { o: 0 }, at: 1800, dur: 300 },
              { id: "paper.pic", to: { o: 1 }, at: 2400, dur: 100 }, { id: "paper.pic", draw: true, oneByOne: true, at: 2500, dur: 3000 },
              { id: "arash.armR", to: { r: -50 }, at: 2500, dur: 1500, yoyo: true, times: 2 }, { id: "sam.armL", to: { r: 40 }, at: 2700, dur: 1500, yoyo: true, times: 2 }],
            face("arash", "joy", 5000), face("sam", "joy", 5000)) }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "قدم‌های یک عذرخواهی واقعی را به ترتیب بچین. هر کارت را بزن تا بشنوی.",
        items: [
          { pic: "💧", label: "گفتن کاری که کردم", say: "می‌گویم چه کار کردم: ببخشید که آب را ریختم" },
          { pic: "😢", label: "گفتن حس او", say: "می‌گویم او چه حسی دارد: می‌دانم ناراحت شدی" },
          { pic: "🤝", label: "جبران کردن", say: "جبران می‌کنم: بیا کمکت کنم" },
          { pic: "💛", label: "آشتی", say: "او می‌پذیرد و آشتی می‌کنیم" }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "یاسمن بی‌حواس کتاب دوستش را پاره کرد. عذرخواهی‌اش را به ترتیب بچین.",
        items: [
          { pic: "📖", label: "«کتابت را پاره کردم»", say: "ببخشید، من کتابت را پاره کردم." },
          { pic: "😢", label: "«ناراحت شدی»", say: "می‌دانم ناراحت شدی. کتاب محبوبت بود." },
          { pic: "🩹", label: "«با هم می‌چسبانیم»", say: "بیا با هم با چسب درستش کنیم." },
          { pic: "💛", label: "آشتی", say: "دوستش می‌گوید: باشد. و آشتی می‌کنند." }
        ] },
      { type: "talk", scene: "🕊️ 💛", caption: "تا حالا با کسی آشتی کرده‌ای؟ چه گفتی؟ چه کاری کمک کرد که دوباره دوست شوید؟",
        tips: [
          "«ببخشید» گفتن را به زور نخواهید. کمک کنید کودک اول آرام شود و حس دیگری را ببیند؛ عذرخواهی واقعی از دل می‌آید.",
          "به سه تکه کمک کنید: چه کردم، او چه حسی دارد، چطور جبران می‌کنم.",
          "خودتان هم وقتی اشتباه کردید، این‌طور از کودک عذرخواهی کنید."
        ] },
      { type: "talk", scene: "🙋 💛", caption: "وقتی کسی از تو عذرخواهی می‌کند، چه می‌گویی؟ اگر هنوز ناراحتی، چه؟",
        tips: [
          "پذیرفتن عذرخواهی یعنی «باشد، ممنون که گفتی». لازم نیست کودک وانمود کند که دیگر هیچ ناراحت نیست.",
          "اگر هنوز ناراحت است، می‌تواند بگوید: «ممنون. هنوز کمی ناراحتم، اما بعداً با هم بازی می‌کنیم.»",
          "اگر کسی بارها و بارها اذیت می‌کند و هر بار فقط «ببخشید» می‌گوید، این دیگر شوخی یا اشتباه نیست؛ به یک بزرگ‌تر بگوید."
        ] }
    ]
  },
  {
    id: "feel-sapling-10", subject: "feel", level: "sapling", emoji: "🧱", title: "با هم کار می‌کنیم",
    steps: [
      /* Working as a group: Kian, Shirin and Mina want to build a house of blocks; each has an idea (a tower, a house
         with a window, a garden: thought bubbles); everyone is heard; they decide together (a house with a tower
         and a garden) and share the jobs; they build it together. */
      { type: "scene", prompt: "سه نفر، یک کار", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" },
          kian: { art: "fl-kian", at: [24, 86], s: 1.25 }, shirin: { art: "fl-shirin", at: [80, 86], s: 1.25 }, mina: { art: "fl-mina", at: [136, 86], s: 1.25 },
          tK: { art: "fl-think", at: [30, 42], s: 0.8, o: 0 }, tKi: { art: "🗼", at: [16, -18], s: 0.75, under: "tK" },
          tS: { art: "fl-think", at: [86, 42], s: 0.8, o: 0 }, tSi: { art: "🏠", at: [16, -18], s: 0.75, under: "tS" },
          tM: { art: "fl-think", at: [116, 42], s: 0.8, o: 0 }, tMi: { art: "🌳", at: [16, -18], s: 0.75, under: "tM" },
          tAll: { art: "fl-think", at: [86, 42], s: 1.05, o: 0 }, a1: { art: "🗼", at: [6, -18], s: 0.6, under: "tAll" },
          a2: { art: "🏠", at: [16, -18], s: 0.6, under: "tAll" }, a3: { art: "🌳", at: [26, -18], s: 0.6, under: "tAll" },
          w1: { art: "fl-block-r", at: [62, 88], s: 1.2, o: 0 }, w2: { art: "fl-block-b", at: [70.6, 88], s: 1.2, o: 0 }, w3: { art: "fl-block-y", at: [79.2, 88], s: 1.2, o: 0 },
          w4: { art: "fl-block-r", at: [62, 79.4], s: 1.2, o: 0 }, w5: { art: "fl-block-g", at: [79.2, 79.4], s: 1.2, o: 0 },
          t1: { art: "fl-block-o", at: [87.8, 88], s: 1.2, o: 0 }, t2: { art: "fl-block-o", at: [87.8, 79.4], s: 1.2, o: 0 }, t3: { art: "fl-block-o", at: [87.8, 70.8], s: 1.2, o: 0 },
          tree: { art: "🌳", at: [106, 78], s: 0.8, o: 0 }, flower: { art: "🌷", at: [52, 84], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "کیان، شیرین و مینا می‌خواهند با هم یک خانه از مکعب‌ها بسازند.", do: all(
            face("kian", "joy", 300), face("shirin", "joy", 500), face("mina", "joy", 700),
            [{ id: "kian.eyeO", to: { x: -0.9 }, at: 900, dur: 400 }, { id: "mina.eyeO", to: { x: 0.9 }, at: 900, dur: 400 }]) },
          { caption: "هر کس یک ایده دارد: کیان یک برج بلند می‌خواهد، شیرین خانه‌ای با پنجره، و مینا یک باغ.", hold: 6400, do: all(
            [{ id: "tK", to: { o: 1 }, at: 300, dur: 500 }, { id: "tS", to: { o: 1 }, at: 1800, dur: 500 }, { id: "tM", to: { o: 1 }, at: 3300, dur: 500 }],
            talk("kian", 400, 1200), talk("shirin", 1900, 1200), talk("mina", 3400, 1200)) },
          { caption: "به همه گوش می‌دهند. هر ایده شنیده می‌شود.", hold: 6400, do: all(
            [{ id: "shirin.eyeO", to: { x: 0.9 }, dur: 300 }, { id: "kian.eyeO", to: { x: 0.9 }, dur: 300 }, { id: "tM", to: { s: 0.9 }, at: 300, dur: 600, yoyo: true, times: 2 }], talk("mina", 300, 1400),
            [{ id: "shirin.eyeO", to: { x: -0.9 }, at: 2000, dur: 300 }, { id: "mina.eyeO", to: { x: -0.9 }, at: 2000, dur: 300 }, { id: "tK", to: { s: 0.9 }, at: 2200, dur: 600, yoyo: true, times: 2 }], talk("kian", 2200, 1400),
            [{ id: "kian.eyeO", to: { x: 0.9 }, at: 4000, dur: 300 }, { id: "tS", to: { s: 0.9 }, at: 4200, dur: 600, yoyo: true, times: 2 }], talk("shirin", 4200, 1400)) },
          { caption: "با هم تصمیم می‌گیرند: یک خانه با یک برج کنارش و یک باغ! همه موافق‌اند.", do: all(
            show("tK tS tM", 0, 300, 500), show("tAll", 1, 700, 600),
            talk("shirin", 1300, 1800), face("kian", "joy", 3000), face("mina", "joy", 3000), face("shirin", "joy", 3000),
            [{ id: "kian.armR", to: { r: -150 }, at: 3200, dur: 400 }, { id: "mina.armL", to: { r: 150 }, at: 3200, dur: 400 }, { id: "shirin.armR", to: { r: -150 }, at: 3200, dur: 400 }]) },
          { caption: "کارها را قسمت می‌کنند: شیرین دیوارهای خانه را می‌سازد، کیان برج را، و مینا باغ را.", key: 6400, hold: 7200, do: all(
            show("tAll", 0, 0, 500), arms("kian", 0, 0, 0, 400), arms("mina", 0, 0, 0, 400), arms("shirin", 0, 0, 0, 400),
            [{ id: "kian", to: { x: 100 }, at: 400, dur: 1200 }, { id: "mina", to: { x: 124 }, at: 400, dur: 600 }, { id: "shirin", to: { x: 48 }, at: 400, dur: 1000 }],
            walk("kian", 400, 1200), walk("shirin", 400, 1000),
            ["w1", "w2", "w3", "w4", "w5"].map(function (b, i) { return { id: b, to: { o: 1 }, at: 1600 + i * 600, dur: 300 }; }),
            ["t1", "t2", "t3"].map(function (b, i) { return { id: b, to: { o: 1 }, at: 1900 + i * 900, dur: 300 }; }),
            [{ id: "tree", to: { o: 1 }, at: 2600, dur: 500 }, { id: "tree", to: { s: 1 }, at: 2600, dur: 1200, ease: "back" }, { id: "flower", to: { o: 1 }, at: 4200, dur: 400 },
              { id: "shirin.armR", to: { r: -40 }, at: 1600, dur: 3000, yoyo: true, times: 5 }, { id: "kian.armL", to: { r: 40 }, at: 1900, dur: 2700, yoyo: true, times: 3 },
              { id: "mina.armL", to: { r: 40 }, at: 2600, dur: 1800, yoyo: true, times: 2 }]) },
          { caption: "با هم یک چیز قشنگ ساختند. هر کس سهمی داشت، و همه خوشحال‌اند.", do: all(
            face("kian", "joy", 300), face("shirin", "joy", 300), face("mina", "joy", 300),
            [{ emit: "spark", where: [80, 60], spread: [40, 20], n: 12, at: 500, dur: 1600, life: 1400 },
              { id: "kian", to: { y: "-3" }, at: 800, dur: 1200, yoyo: true, times: 2 }, { id: "shirin", to: { y: "-3" }, at: 1000, dur: 1200, yoyo: true, times: 2 }, { id: "mina", to: { y: "-3" }, at: 1200, dur: 1200, yoyo: true, times: 2 }]) }
        ] },
      { type: "doit", pic: "🧱", text: "با خانواده یک چیز با هم بسازید: یک خانه از مکعب، یک کاردستی یا یک غذای ساده. اول هر کس ایده‌اش را بگوید، بعد کارها را قسمت کنید." },
      { type: "doit", pic: "🗳️", text: "اگر ایده‌ها با هم جور نبود، یکی از این راه‌ها را امتحان کنید:",
        list: ["ایده‌ها را با هم ترکیب کنید، مثل خانه با برج و باغ.", "نوبتی: این بار ایدهٔ یکی، دفعه بعد ایدهٔ دیگری.", "رأی بگیرید و هر کس یک رأی داشته باشد."] },
      { type: "doit", pic: "🧹", text: "آخر کار، همه با هم جمع کنید. بعد بگویید: کار چه کسی به چه چیزی کمک کرد؟" },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "وقتی با هم کار می‌کنیم، به همه گوش می‌دهیم، کارها را قسمت می‌کنیم و با هم تصمیم می‌گیریم.", pic: "🧱",
        tips: [
          "در کار گروهی خانوادگی، اجازه دهید کودک ایده بدهد و ایده‌اش واقعاً به کار برود.",
          "به جای اینکه خودتان دعوا را حل کنید، بپرسید: «چطور می‌شود هر دو ایده را داشت؟»",
          "کار هر کس را ببینید و اسمش را بگویید: «دیوارها را تو ساختی، برج را برادرت.»",
          "بازی‌های گروهی بدون برنده و بازنده (ساختن، آشپزی، باغچه) برای تمرین همکاری بهترند."
        ] }
    ]
  },
  {
    id: "feel-sapling-11", subject: "feel", level: "sapling", emoji: "🤞", title: "راستش را می‌گویم",
    steps: [
      /* Telling the truth and keeping promises: Aydin's ball knocks a vase off the shelf; he is scared, but tells
         Mom; she is upset but thanks him, and she picks up the pieces. Shirin keeps her promise to bring her friend's
         book back. Trust grows. */
      { type: "scene", prompt: "راست گفتن و قول دادن", bg: "#f6e3c6",
        parts: {
          room: { art: "fl-room" }, yard: { art: "fl-yard", o: 0 },
          shelf: { art: "fl-shelf", at: [118, 44], s: 1.2 }, vase: { art: "fl-vase", at: [118, 42.4], s: 1 },
          broken: { art: "fl-vase-broken", at: [120, 87], s: 1.3, o: 0 },
          mom: { art: "fl-mom", at: [-20, 88], s: 1.6 },
          aydin: { art: "fl-aydin", at: [56, 86], s: 1.3 }, ball: { art: "ball-side", at: [70, 86], s: 1.2 },
          think: { art: "fl-think", at: [64, 40], o: 0 }, thinkI: { art: "😟", at: [16, -18], s: 0.75, under: "think" },
          shirin: { art: "fl-shirin", at: [44, 86], s: 1.3, o: 0 }, mina: { art: "fl-mina", at: [116, 86], s: 1.3, o: 0 },
          book: { art: "fl-book", at: [52, 70], s: 0.9, o: 0 },
          heart: { art: "fl-heart", at: [80, 26], s: 1.3, o: 0 }
        },
        scenes: [
          { caption: "آیدین در خانه توپ‌بازی می‌کرد. توپ به گلدان خورد و گلدان افتاد و شکست.", key: 3600, do: all(
            [{ id: "aydin.armR", to: { r: -50 }, at: 300, dur: 300, yoyo: true, times: 2 }, { id: "ball", path: "M70 86Q96 20 116 40", at: 500, dur: 900 },
              { id: "vase", to: { r: 40 }, at: 1400, dur: 300 }, { id: "vase", path: "M118 42.4Q126 50 120 87", at: 1700, dur: 600, ease: "in" },
              { id: "vase", to: { o: 0 }, at: 2300, dur: 1 }, { id: "broken", to: { o: 1 }, at: 2300, dur: 1 },
              { id: "ball", path: "M116 40Q104 70 96 86", at: 1400, dur: 900 }],
            face("aydin", "scared", 2400)) },
          { caption: "آیدین ترسید. فکر کرد: «اگر بگویم، شاید دعوایم کنند.»", do: all(
            show("think", 1, 300, 500), face("aydin", "worried", 600), [{ id: "aydin.eyeO", to: { x: 0.8, y: 0.8 }, at: 800, dur: 400 }]) },
          { caption: "اما راستش را به مامان گفت: «ببخشید، توپ من به گلدان خورد و شکست.»", do: all(
            show("think", 0, 0, 400), [{ id: "mom", to: { x: 22 }, at: 300, dur: 1800 }], walk("mom", 300, 1800),
            [{ id: "aydin.eyeO", to: { x: -0.9, y: 0 }, at: 1600, dur: 400 }], face("aydin", "sorry", 1800), talk("aydin", 2200, 2400)) },
          { caption: "مامان ناراحت شد، اما گفت: «ممنون که راستش را گفتی. خودم تکه‌ها را جمع می‌کنم، دست نزن.»", key: 6200, hold: 7000, do: all(
            face("mom", "sorry", 300), [{ id: "mom.eyeO", to: { x: 0.9 }, at: 300, dur: 400 }], face("mom", "caring", 1600), talk("mom", 1800, 2600),
            [{ id: "mom", to: { x: 106 }, at: 4400, dur: 1400 }], walk("mom", 4400, 1400),
            [{ id: "mom.armR", to: { r: -20 }, at: 5800, dur: 400 }, { id: "broken", to: { o: 0 }, at: 6200, dur: 700 }],
            face("aydin", "happy", 3800)) },
          { caption: "شیرین به مینا قول داده بود کتابش را فردا پس بیاورد. یادش ماند و آورد.", key: 4600, do: all(
            show("room shelf mom aydin ball", 0, 0, 700), show("yard shirin mina book", 1, 500, 700),
            [{ id: "shirin", to: { x: 92 }, at: 1400, dur: 1600 }, { id: "book", to: { x: 100 }, at: 1400, dur: 1600 }], walk("shirin", 1400, 1600),
            talk("shirin", 3100, 1200), [{ id: "book", to: { x: 106, y: 68 }, at: 3800, dur: 600 }, { id: "mina.armL", to: { r: 40 }, at: 3900, dur: 400 }],
            face("mina", "joy", 4200), face("shirin", "happy", 4200)) },
          { caption: "وقتی راست می‌گوییم و به قولمان عمل می‌کنیم، دیگران به ما اعتماد می‌کنند.", do: all(
            [{ id: "heart", to: { o: 1 }, at: 300, dur: 400 }, { id: "heart", to: { s: 1.7 }, at: 700, dur: 1600, yoyo: true, times: 2 }],
            face("shirin", "joy", 300), face("mina", "joy", 300)) }
        ] },
      { type: "sort", practice: true, prompt: "کدام کار اعتماد را بیشتر می‌کند و کدام کمتر؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "🤝", label: "اعتماد می‌سازد", value: "trust" }, { pic: "💔", label: "اعتماد را کم می‌کند", value: "less" }],
        items: [
          { pic: "🗣️", label: "راست گفتن", say: "گفتن اینکه من گلدان را شکستم", basket: "trust" },
          { pic: "🤞", label: "عمل به قول", say: "پس آوردن کتاب دوست، همان روزی که قول داده بودم", basket: "trust" },
          { pic: "🔁", label: "پس دادن", say: "پس دادن چیزی که قرض گرفتم", basket: "trust" },
          { pic: "🙇", label: "یادم رفت، جبران", say: "قولم یادم رفت؛ عذرخواهی کردم و فردا جبران کردم", basket: "trust" },
          { pic: "🙈", label: "پنهان کردن", say: "پنهان کردن تکه‌های شکسته", basket: "less" },
          { pic: "👉", label: "«من نبودم»", say: "گفتن «من نبودم» وقتی خودم بودم", basket: "less" }
        ] },
      { type: "talk", scene: "🏺 🗣️ 💛", caption: "کی راست گفتن برایت سخت بود؟ چه چیزی کمکت کرد راستش را بگویی؟",
        tips: [
          "وقتی کودک راستش را گفت، اول تشکر کنید و بعد دربارهٔ اتفاق حرف بزنید. اگر راست گفتن تنبیه سخت بیاورد، دفعه بعد پنهانش می‌کند.",
          "میان کار و کودک فرق بگذارید: «گلدان شکست» نه «تو بی‌دقتی».",
          "خودتان هم وقتی اشتباه کردید، راستش را بگویید."
        ] },
      { type: "talk", scene: "🤞 📅", caption: "تو به کسی قولی داده‌ای؟ چطور یادت می‌ماند که به قولت عمل کنی؟",
        tips: [
          "قول‌های کوچک و شدنی بدهید و بگیرید. قولی که نمی‌شود نگه داشت، اعتماد را کم می‌کند.",
          "اگر قولی یادش رفت، کمکش کنید عذرخواهی کند و جبران کند.",
          "قول‌های خودتان به کودک را هم نگه دارید؛ او اعتماد را از شما یاد می‌گیرد."
        ] },
      { type: "forparents", guide: "feelings", guideLabel: "احساس‌ها در راهنمای والدین",
        text: "راست گفتن گاهی سخت است، اما اعتماد را می‌سازد. بزرگ‌ترها از راست گفتنت خوشحال می‌شوند.", pic: "🤞",
        tips: [
          "کودکان در این سن گاهی از ترس دروغ می‌گویند. آرام بمانید و راه راست گفتن را امن کنید.",
          "به جای «چرا دروغ گفتی؟» بپرسید: «چه شد؟ بیا با هم درستش کنیم.»",
          "تنبیه سخت و تحقیر، دروغ را بیشتر می‌کند؛ پیامد کوچک و منطقی (کمک به جبران) بهتر کمک می‌کند.",
          "وسایل شکستنی و خطرناک را دور از دسترس بگذارید و تکه‌های شکسته را خودتان جمع کنید."
        ] }
    ]
  },
  {
    id: "feel-sapling-12", subject: "feel", level: "sapling", emoji: "🎲", title: "بازی حل مسئله",
    steps: [
      { type: "order", practice: true, numbered: true, prompt: "دو نفر و یک تاب. قدم‌های چراغ راهنمایی را به ترتیب بچین.",
        items: [
          { pic: "🔴", label: "بایست و آرام شو", say: "قرمز: می‌ایستیم و آرام می‌شویم" },
          { pic: "🟡", label: "«دو نفریم و یک تاب»", say: "زرد: مشکل را می‌گوییم: دو نفریم و یک تاب" },
          { pic: "💡", label: "راه‌ها", say: "زرد: نوبتی، با هم هل دادن، یا بازی دیگر" },
          { pic: "🟢", label: "نوبتی", say: "سبز: نوبتی را امتحان می‌کنیم" },
          { pic: "👀", label: "ببین چطور شد", say: "سبز: می‌بینیم چطور شد" }
        ] },
      { type: "sort", practice: true, prompt: "کدام فکر کمک می‌کند؟ هر فکر را بزن تا بشنوی.",
        baskets: [{ pic: "💡", label: "کمک می‌کند", value: "help" }, { pic: "🌧️", label: "حالم را بدتر می‌کند", value: "worse" }],
        items: [
          { pic: "🔁", label: "بار دیگر بهتر می‌شود", say: "در مسابقه باختم. بار دیگر بهتر می‌شود.", basket: "help" },
          { pic: "🚫", label: "همیشه می‌بازم", say: "در مسابقه باختم. من همیشه می‌بازم.", basket: "worse" },
          { pic: "🤔", label: "شاید سرش شلوغ بود", say: "دوستم جواب نداد. شاید سرش شلوغ بود.", basket: "help" },
          { pic: "💔", label: "هیچ‌کس دوستم ندارد", say: "دوستم جواب نداد. هیچ‌کس دوستم ندارد.", basket: "worse" }
        ] },
      { type: "sort", practice: true, prompt: "شوخی است یا قلدری؟ هر کارت را بزن تا بشنوی.",
        baskets: [{ pic: "😄", label: "شوخی", value: "joke" }, { pic: "🛑", label: "قلدری", value: "bully" }],
        items: [
          { pic: "😂", label: "هر دو می‌خندند", say: "با هم شوخی می‌کنیم و هر دو خوشحالیم.", basket: "joke" },
          { pic: "🗓️", label: "هر روز مسخره‌اش می‌کنند", say: "هر روز لباسش را مسخره می‌کنند تا ناراحت شود.", basket: "bully" },
          { pic: "🚫", label: "همیشه راهش نمی‌دهند", say: "از عمد همیشه او را از گروه بیرون می‌گذارند.", basket: "bully" },
          { pic: "🙋", label: "گفت بس کن، تمام شد", say: "وقتی گفت «خوشم نمی‌آید»، دیگر تکرارش نکردیم.", basket: "joke" }
        ] },
      { type: "order", practice: true, numbered: true, prompt: "کیان بی‌حواس برج دوستش را خراب کرد. عذرخواهی‌اش را به ترتیب بچین.",
        items: [
          { pic: "🧱", label: "«برجت را خراب کردم»", say: "ببخشید، من برجت را خراب کردم." },
          { pic: "😢", label: "«ناراحت شدی»", say: "می‌دانم ناراحت شدی." },
          { pic: "🤝", label: "«با هم می‌سازیم»", say: "بیا با هم دوباره بسازیمش." },
          { pic: "💛", label: "آشتی", say: "دوستش می‌پذیرد و آشتی می‌کنند." }
        ] },
      { type: "pairs", practice: true, prompt: "هر مشکل را با یک راه خوب جفت کن.",
        pairs: [
          [{ pic: "⚽", say: "دو نفر و یک توپ" }, { pic: "🔄", say: "نوبتی بازی کنیم" }],
          [{ pic: "✏️", say: "مدادم گم شده" }, { pic: "🙋", say: "از دوستم قرض بگیرم" }],
          [{ pic: "🧱", say: "برج دوستم را خراب کردم" }, { pic: "🤝", say: "عذرخواهی کنم و با هم بسازیم" }],
          [{ pic: "😢", say: "یک بچه تنهاست" }, { pic: "👋", say: "دعوتش کنم با ما بازی کند" }]
        ] }
    ]
  }
);
})();
