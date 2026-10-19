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
    }
  ];

  // Every step of an English lesson is marked en, so js/steps/english.js writes its English left to right
  // and speaks it with the English voice.
  lessons.forEach(function (l) { l.steps.forEach(function (s) { s.en = true; }); });
  B.LESSONS.push.apply(B.LESSONS, lessons);
})();
