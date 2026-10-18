/* باغچه — خواندن و نوشتن انگلیسی (English reading and writing), for children who know no English yet.
   Baghcheh teaches English as a second language: the other subjects' lessons can also be played in English
   (js/english-mode.js), and this course teaches reading and writing English. Every child starts at the Seed
   garden (defaultLevel), whatever their Persian garden.
   The order follows good early-years practice for a second language: first listening and speaking, with meaning shown by
   pictures and actions instead of translation, and lots of repetition (Seed); then the letters and their sounds,
   a few at a time, and short words made from them (Sprout); then short sentences, questions and everyday
   phrases (Sapling). Instructions for the child are in Persian and spoken; English is spoken with the device's
   English voice (js/english-voice.js). Step types: README.md, js/engine.js, js/games.js, js/anim.js and
   js/steps/english.js (words, listen, letter, tip). Each lesson ends with a tip for parents, who may not know
   English themselves. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "english", name: "خواندن و نوشتن انگلیسی", emoji: "🔤", leveled: true, defaultLevel: "seed" });

(function () {
  var RED = "#e0413a", GREEN = "#3fa34d", YELLOW = "#f5c518", BLUE = "#2f6fd6";
  var SOUND_PROMPT = "کدام با صدای این حرف شروع می‌شود؟";
  var READ_PROMPT = "این کلمه را بخوان. تصویرش کدام است؟";
  var SORT_PROMPT = "هر تصویر را در سبد حرف اولش بگذار";

  var lessons = [
    // ---------------- English: Seed (listen, point and say; no reading yet) ----------------
    {
      id: "english-seed-1", subject: "english", level: "seed", emoji: "👋", title: "سلام و خداحافظ",
      steps: [
        { type: "story", prompt: "گوش کن و تو هم با آن‌ها بگو",
          cast: { sara: "👧", reza: "👦", w1: "👋", w2: "👋" },
          scenes: [
            { caption: "Hello!", at: { sara: [28, 62, { size: 1.4, act: "bounce" }], w1: [14, 40] } },
            { caption: "Hello!", at: { reza: [72, 62, { size: 1.4, act: "bounce" }], w2: [86, 40, { flip: true }] } },
            { caption: "Goodbye!", at: { sara: [20, 62, { size: 1.4 }], w1: [8, 40, { act: "shake" }] } },
            { caption: "Goodbye!", at: { reza: [80, 62, { size: 1.4 }], w2: [92, 40, { flip: true, act: "shake" }] } }
          ] },
        { type: "words", words: [{ pic: "🙂👋", en: "Hello!" }, { pic: "🚶👋", en: "Goodbye!" }] },
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { sun: "☀️", moon: "🌙", up: "🧒", bed: "😴" },
          scenes: [
            { caption: "Good morning!", at: { sun: [75, 25, { size: 1.6, act: "grow" }], up: [35, 65, { size: 1.5, act: "bounce" }] } },
            { caption: "Good night!", at: { sun: null, up: null, moon: [75, 25, { size: 1.6, act: "grow" }], bed: [35, 65, { size: 1.5 }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { apple: "🍎", leaf: "🍃", lemon: "🍋", drop: "💧" },
          scenes: [
            { caption: "Red, red, red!", at: { apple: [50, 50, { size: 2.2, act: "grow" }] } },
            { caption: "Green, green, green!", at: { apple: null, leaf: [50, 50, { size: 2.2, act: "grow" }] } },
            { caption: "Yellow, yellow, yellow!", at: { leaf: null, lemon: [50, 50, { size: 2.2, act: "grow" }] } },
            { caption: "Blue, blue, blue!", at: { lemon: null, drop: [50, 50, { size: 2.2, act: "grow" }] } }
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
        { type: "story", prompt: "گوش کن و با انگشت‌هایت بشمار",
          cast: { b1: "🐦", b2: "🐦", b3: "🐦", b4: "🐦", b5: "🐦", tree: "🌳" },
          scenes: [
            { caption: "One!", at: { tree: [50, 55, { size: 3.4 }], b1: [18, 30, { act: "bounce" }] } },
            { caption: "Two!", at: { b2: [34, 22, { act: "bounce" }] } },
            { caption: "Three!", at: { b3: [50, 16, { act: "bounce" }] } },
            { caption: "Four!", at: { b4: [66, 22, { act: "bounce" }] } },
            { caption: "Five!", at: { b5: [82, 30, { act: "bounce" }] } },
            { caption: "One, two, three, four, five!", at: { b1: [18, 30, { act: "spin" }], b5: [82, 30, { act: "spin" }] } }
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
        { type: "story", prompt: "گوش کن و صدای حیوان‌ها را تو هم دربیاور",
          cast: { cat: "🐱", dog: "🐶", duck: "🦆", cow: "🐮" },
          scenes: [
            { caption: "Cat! Meow!", at: { cat: [50, 55, { size: 2.2, act: "bounce" }] } },
            { caption: "Dog! Woof, woof!", at: { cat: null, dog: [50, 55, { size: 2.2, act: "bounce" }] } },
            { caption: "Duck! Quack, quack!", at: { dog: null, duck: [50, 55, { size: 2.2, act: "bounce" }] } },
            { caption: "Cow! Moo!", at: { duck: null, cow: [50, 55, { size: 2.2, act: "bounce" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو", bg: "room",
          cast: { mother: "👩", father: "👨", sister: "👧", brother: "👦", grandma: "👵", grandpa: "👴" },
          scenes: [
            { caption: "This is my mother.", at: { mother: [16, 60, { size: 1.6, act: "bounce" }] } },
            { caption: "This is my father.", at: { father: [32, 60, { size: 1.6, act: "bounce" }] } },
            { caption: "This is my sister.", at: { sister: [48, 66, { size: 1.3, act: "bounce" }] } },
            { caption: "This is my brother.", at: { brother: [62, 66, { size: 1.3, act: "bounce" }] } },
            { caption: "This is my grandma.", at: { grandma: [76, 60, { size: 1.5, act: "bounce" }] } },
            { caption: "This is my grandpa.", at: { grandpa: [90, 60, { size: 1.5, act: "bounce" }] } }
          ] },
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
        { type: "story", prompt: "گوش کن و تو هم همین کار را بکن", tall: true,
          cast: { nose: "👃", eyes: "👀", ears: "👂", mouth: "👄", hand: "✋", foot: "🦶" },
          scenes: [
            { caption: "Touch your nose!", at: { nose: [50, 50, { size: 2.6, act: "bounce" }] } },
            { caption: "Touch your eyes!", at: { nose: null, eyes: [50, 50, { size: 2.6, act: "bounce" }] } },
            { caption: "Touch your ears!", at: { eyes: null, ears: [50, 50, { size: 2.6, act: "bounce" }] } },
            { caption: "Touch your mouth!", at: { ears: null, mouth: [50, 50, { size: 2.6, act: "bounce" }] } },
            { caption: "Clap your hands!", at: { mouth: null, hand: [50, 50, { size: 2.6, act: "shake" }] } },
            { caption: "Stamp your feet!", at: { hand: null, foot: [50, 50, { size: 2.6, act: "shake" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو", bg: "kitchen",
          cast: { sara: "👧", mom: "👩", bread: "🍞", milk: "🥛", cheese: "🧀" },
          scenes: [
            { caption: "Good morning! Breakfast time!", at: { mom: [80, 60, { size: 1.6, flip: true, act: "bounce" }], sara: [20, 62, { size: 1.4 }] } },
            { caption: "Bread, please.", at: { sara: [20, 62, { size: 1.4, act: "bounce" }], bread: [50, 64, { size: 1.4, act: "grow" }] } },
            { caption: "Cheese, please.", at: { sara: [20, 62, { size: 1.4, act: "bounce" }], cheese: [62, 64, { size: 1.3, act: "grow" }] } },
            { caption: "Milk, please.", at: { sara: [20, 62, { size: 1.4, act: "bounce" }], milk: [38, 64, { size: 1.3, act: "grow" }] } },
            { caption: "Here you are.", at: { mom: [80, 60, { size: 1.6, flip: true, act: "bounce" }] } },
            { caption: "Thank you!", at: { sara: [20, 62, { size: 1.4, act: "spin" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { girl: "👧", dog: "🐶", cat: "🐱", box: "📦" },
          scenes: [
            { caption: "I see a dog.", at: { girl: [16, 62, { size: 1.5 }], dog: [60, 60, { size: 1.4, act: "bounce" }] } },
            { caption: "The dog is big.", at: { dog: [60, 56, { size: 2.2, act: "grow" }] } },
            { caption: "I see my cat.", at: { dog: null, cat: [60, 60, { size: 1.5, act: "bounce" }] } },
            { caption: "My cat is in a box.", at: { box: [60, 66, { size: 1.8 }], cat: [60, 50, { size: 1.3, act: "bounce" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { cat: "🐱", dog: "🐶", apple: "🍎", b1: "🐦", b2: "🐦", girl: "👧" },
          scenes: [
            { caption: "I can see a cat.", at: { girl: [14, 64, { size: 1.5 }], cat: [55, 60, { size: 1.6, act: "bounce" }] } },
            { caption: "I can see a dog.", at: { cat: null, dog: [55, 60, { size: 1.6, act: "bounce" }] } },
            { caption: "I can see a red apple.", at: { dog: null, apple: [55, 60, { size: 1.6, act: "grow" }] } },
            { caption: "I can see two birds.", at: { apple: null, b1: [48, 30, { size: 1.3, act: "bounce" }], b2: [70, 34, { size: 1.3, act: "bounce" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { sara: "👧", arman: "👦", duck: "🦆", ball: "🎈" },
          scenes: [
            { caption: "What is this?", at: { sara: [16, 62, { size: 1.5, act: "bounce" }], arman: [84, 62, { size: 1.5, flip: true }], duck: [50, 55, { size: 1.6 }] } },
            { caption: "It is a duck.", at: { arman: [84, 62, { size: 1.5, flip: true, act: "bounce" }], duck: [50, 55, { size: 1.6, act: "bounce" }] } },
            { caption: "What colour is it?", at: { duck: null, ball: [50, 50, { size: 1.8 }], sara: [16, 62, { size: 1.5, act: "bounce" }] } },
            { caption: "It is red.", at: { arman: [84, 62, { size: 1.5, flip: true, act: "bounce" }], ball: [50, 50, { size: 1.8, act: "grow" }] } }
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
        { type: "story", prompt: "گوش کن و تو هم بگو",
          cast: { sara: "👧", reza: "👦" },
          scenes: [
            { caption: "Hello! What is your name?", at: { sara: [22, 60, { size: 1.6, act: "bounce" }], reza: [78, 60, { size: 1.6, flip: true }] } },
            { caption: "My name is Reza. What is your name?", at: { reza: [78, 60, { size: 1.6, flip: true, act: "bounce" }] } },
            { caption: "My name is Sara. How are you?", at: { sara: [22, 60, { size: 1.6, act: "bounce" }] } },
            { caption: "I am fine, thank you.", at: { reza: [78, 60, { size: 1.6, flip: true, act: "bounce" }] } }
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
    }
  ];

  // Every step of an English lesson is marked en, so js/steps/english.js writes its English left to right
  // and speaks it with the English voice.
  lessons.forEach(function (l) { l.steps.forEach(function (s) { s.en = true; }); });
  B.LESSONS.push.apply(B.LESSONS, lessons);
})();
