/* باغچه — احساس‌های من (me and my feelings): for every child, not leveled.
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
  breatheIn: "browN eyeC mFlat", breatheOut: "browN eyeC mO", oops: "browW eyeW mFlat", sorry: "browW eyeO mFlat", caring: "browW eyeO mSmile"
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

B.LESSONS.push(
  // ---------------- Me and my feelings (for every child, not leveled) ----------------
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
  }
);
})();
