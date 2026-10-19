/* باغچه — فکر و برنامه‌نویسی (thinking and coding): patterns, sorting and classifying, steps in order, simple
   logic, turning left and right, and block coding on a grid (step type `code`, js/steps/coding.js).
   Modelled on ScratchJr, Code.org's early courses and "unplugged" computer science activities.
   Every lesson ends with an `unplugged` step: a game for home, without a screen, written for the parent.
   Lessons are plain data; step types are listed in README.md. Content: CC BY-SA 4.0. Follow STYLE.md. */
var B = window.B || {};
window.B = B;

B.SUBJECTS.push({ id: "think", name: "فکر و برنامه‌نویسی", emoji: "🧩", leveled: true });

B.LESSONS.push(
  // ---------------- Thinking: Seed (patterns, sorting, steps in order, first program) ----------------
  {
    id: "think-seed-1", subject: "think", level: "seed", emoji: "🔴", title: "الگوها",
    steps: [
      { type: "pattern", prompt: "بعدی کدام است؟", say: "بعدی کدام است؟",
        seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], blanks: [5], options: ["🔵", "🔴", "🟡"] },
      { type: "pattern", prompt: "بعدی کدام است؟", say: "بعدی کدام است؟",
        seq: ["🐱", "🐶", "🐱", "🐶", "🐱", "🐶"], blanks: [4, 5], options: ["🐱", "🐶", "🐰"] },
      { type: "pattern", prompt: "جای خالی را پر کن", say: "جای خالی را پر کن",
        seq: ["☀️", "🌙", "☀️", "🌙", "☀️", "🌙"], blanks: [2], options: ["🌙", "☀️", "⭐"] },
      { type: "pattern", prompt: "خوب نگاه کن: یکی، دو تا. بعدی کدام است؟", say: "خوب نگاه کن. بعدی کدام است؟",
        seq: ["🍎", "🍌", "🍌", "🍎", "🍌", "🍌"], blanks: [5], options: ["🍎", "🍌", "🍇"] },
      { type: "pattern", prompt: "دو تا جای خالی هست. پرشان کن", say: "دو تا جای خالی هست. پرشان کن",
        seq: ["🟢", "🟢", "🟡", "🟢", "🟢", "🟡"], blanks: [3, 5], options: ["🟢", "🟡", "🔴"] },
      { type: "unplugged", text: "با دست و پا یک الگو بسازید: دست بزنید، پا بکوبید، دست بزنید، پا بکوبید… و بگذارید کودک ادامه‌اش را بزند. بعد جایتان را عوض کنید: او الگو بسازد و شما ادامه دهید. گاهی عمداً اشتباه کنید تا خودش اشتباه را پیدا کند." }
    ]
  },
  {
    id: "think-seed-2", subject: "think", level: "seed", emoji: "🧺", title: "دسته‌بندی",
    steps: [
      { type: "sort", prompt: "هر کدام را در سبد هم‌رنگش بگذار",
        baskets: [{ pic: "🔴", value: "red" }, { pic: "🟡", value: "yellow" }],
        items: [{ pic: "🍎", basket: "red" }, { pic: "🍌", basket: "yellow" }, { pic: "🍓", basket: "red" },
          { pic: "🌽", basket: "yellow" }, { pic: "🍒", basket: "red" }, { pic: "🍋", basket: "yellow" }] },
      { type: "pairs", prompt: "جفت هر کدام را پیدا کن", say: "جفت هر کدام را پیدا کن",
        pairs: [["🧦", "🧦"], ["🧤", "🧤"], ["👟", "👟"], ["🧢", "🧢"]] },
      { type: "sort", prompt: "حیوان‌ها در یک سبد، میوه‌ها در سبد دیگر",
        baskets: [{ pic: "🐾", label: "حیوان", value: "animal" }, { pic: "🧺", label: "میوه", value: "fruit" }],
        items: [{ pic: "🐱", basket: "animal" }, { pic: "🍐", basket: "fruit" }, { pic: "🐄", basket: "animal" },
          { pic: "🍇", basket: "fruit" }, { pic: "🐔", basket: "animal" }, { pic: "🍉", basket: "fruit" }] },
      { type: "order", prompt: "از کم به زیاد بچین", say: "از کم به زیاد بچین", ltr: true,
        items: [{ dots: 1 }, { dots: 2 }, { dots: 3 }, { dots: 4 }] },
      { type: "unplugged", text: "موقع جمع کردن لباس‌های شسته، از کودک بخواهید جوراب‌ها را جفت کند. بعد بپرسید: «این لباس‌ها را چطور دسته کنیم؟» شاید بگوید بر اساس رنگ، اندازه یا اینکه مال چه کسی است. هر راهی که خودش پیشنهاد بدهد خوب است، به شرطی که بتواند بگوید چرا." }
    ]
  },
  {
    id: "think-seed-3", subject: "think", level: "seed", emoji: "🌻", title: "قدم به قدم",
    steps: [
      /* One step after another: plant, water, sprout, flower. The number in the corner counts the steps.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین گل چطور بزرگ می‌شود", bg: "#d6eef8",
        parts: {
          sun: { art: "sun", at: [140, 16] }, bed: { art: "garden-bed" }, wet: { art: "wet-soil", at: [80, 66], o: 0 },
          stem: { art: "stem", at: [80, 63], sy: 0 }, leaves: { art: "leaves", at: [80, 52], s: 0 },
          flower: { art: "flower-head", at: [80, 23], s: 0, r: -120 },
          seed: { art: "seed", at: [80, -14], s: 1.5 }, heap: { art: "soil-heap", at: [80, 67], s: 0 },
          hand: { art: "pinch-hand", at: [80, -14], s: 1.4 }, can: { art: "watering-can", at: [200, 30], s: 1.5 },
          step: { art: "counter", at: [16, 14], o: 0 }
        },
        scenes: [
          { caption: "اول دانه را در خاک می‌کاریم.", key: 1800, do: [
            { id: "step", to: { o: 1 }, dur: 300 }, { count: "step", from: 1, to: 1, dur: 1 },
            { id: "hand", to: { y: 52 }, at: 300, dur: 1000 }, { id: "seed", to: { y: 52 }, at: 300, dur: 1000 },
            { id: "seed", to: { y: 66 }, at: 1500, dur: 500, ease: "in" },
            { id: "hand", to: { y: -14 }, at: 1900, dur: 900 },
            { id: "heap", to: { s: 1 }, at: 2700, dur: 700, ease: "out" }
          ] },
          { caption: "بعد به آن آب می‌دهیم.", key: 2700, do: [
            { count: "step", from: 2, to: 2, dur: 1 },
            { id: "can", path: "M200 30Q150 16 108 40", dur: 1000 },
            { id: "can", to: { r: -35 }, at: 1000, dur: 500 },
            { emit: "drop", where: [83, 48], spread: [4, 2], rise: 15, n: 24, at: 1500, dur: 2000, life: 700 },
            { id: "wet", to: { o: 1 }, at: 1800, dur: 1600 },
            { id: "can", to: { r: 0 }, at: 3700, dur: 400 },
            { id: "can", path: "M108 40Q150 16 200 30", at: 4100, dur: 900 }
          ] },
          { caption: "کم‌کم جوانه می‌زند.", hold: 3800, do: [
            { count: "step", from: 3, to: 3, dur: 1 },
            { id: "stem", to: { sy: 0.3 }, at: 300, dur: 2600, ease: "out" },
            { id: "leaves", to: { s: 1 }, at: 1200, dur: 1800, ease: "out" },
            { id: "leaves", to: { r: 6 }, at: 3000, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "آخر سر گل می‌دهد.", do: [
            { count: "step", from: 4, to: 4, dur: 1 },
            { id: "stem", to: { sy: 1 }, dur: 2200, ease: "out" },
            { id: "flower", to: { s: 1, r: 0 }, at: 1900, dur: 1200, ease: "back" },
            { id: "sun.rays", to: { r: 45 }, at: 1900, dur: 1600 },
            { emit: "spark", where: [80, 23], spread: [26, 20], n: 8, at: 2800, dur: 900 }
          ] }
        ] },
      { type: "order", prompt: "به ترتیب بچین: اول چه بود؟", say: "به ترتیب بچین. اول چه بود؟", numbered: true,
        items: [{ pic: "🌰", label: "دانه", say: "دانه" }, { pic: "💧", label: "آب", say: "آب" },
          { pic: "🌱", label: "جوانه", say: "جوانه" }, { pic: "🌻", label: "گل", say: "گل" }] },
      { type: "order", prompt: "اول چه بود، بعد چه شد؟", say: "اول چه بود، بعد چه شد؟", numbered: true,
        items: [{ pic: "🥚", say: "تخم" }, { pic: "🐣", say: "جوجه از تخم بیرون می‌آید" }, { pic: "🐥", say: "جوجه" }, { pic: "🐔", say: "مرغ" }] },
      { type: "order", prompt: "دست‌هایت را چطور می‌شویی؟ به ترتیب بچین", say: "دست‌هایت را چطور می‌شویی؟ به ترتیب بچین", numbered: true,
        items: [{ pic: "💧", label: "خیس کن", say: "دست‌ها را خیس کن" }, { pic: "🧼", label: "صابون بزن", say: "صابون بزن" },
          { pic: "🚿", label: "آب بکش", say: "آب بکش" }, { pic: "🧻", label: "خشک کن", say: "خشک کن" }] },
      { type: "unplugged", text: "با هم یک لقمه نان و پنیر درست کنید، اما کودک قدم‌ها را یکی‌یکی بگوید و شما دقیقاً همان را انجام دهید، نه بیشتر. اگر بگوید «پنیر را بگذار» و هنوز نان را باز نکرده‌اید، بپرسید: «کجا بگذارم؟» تا ببیند ترتیب کارها مهم است. برنامه‌نویسی هم همین است: گفتن کارها، دقیق و به ترتیب." }
    ]
  },
  {
    id: "think-seed-4", subject: "think", level: "seed", emoji: "🐢", title: "راه لاک‌پشت",
    steps: [
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان. فلش‌ها را بچین و «اجرا» را بزن.",
        size: [3, 3], start: [0, 1], goal: [2, 1] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [3, 3], start: [1, 2], goal: [1, 0] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [3, 3], start: [0, 0], goal: [2, 2] },
      { type: "code", prompt: "سنگ سر راه است! از کنارش برو",
        size: [4, 3], start: [0, 1], goal: [3, 1], walls: [[1, 1], [2, 1]] },
      { type: "unplugged", text: "ربات‌بازی: شما ربات شوید و کودک برنامه‌نویس. یک عروسک یا میوه را آن طرف اتاق بگذارید. فقط وقتی حرکت کنید که کودک دستور بدهد: «یک قدم جلو»، «یک قدم عقب»، «یک قدم به چپ»، «یک قدم به راست». هر دستور را دقیقاً اجرا کنید، حتی اگر اشتباه باشد، تا خودش برنامه را درست کند. بعد جایتان را عوض کنید." }
    ]
  },

  // ---------------- Thinking: Sprout (which doesn't belong, if… then…, harder patterns, arrows, fixing) ----------------
  {
    id: "think-sprout-1", subject: "think", level: "sprout", emoji: "🔍", title: "کدام جور نیست؟",
    steps: [
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🍎", "🍐", "🚗", "🍌"], answer: "🚗" },
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🐄", "🪑", "🐑", "🐔"], answer: "🪑" },
      { type: "choose", prompt: "کدام یکی با بقیه جور نیست؟", say: "کدام یکی با بقیه جور نیست؟", pic: true,
        options: ["🟥", "🟥", "🟦", "🟥"], answer: "🟦" },
      { type: "choose", prompt: "با سه تایش می‌شود نقاشی کشید. کدام جور نیست؟", say: "با سه تایش می‌شود نقاشی کشید. کدام جور نیست؟", pic: true,
        options: ["✏️", "🖍️", "🥄", "🖌️"], answer: "🥄" },
      { type: "sort", prompt: "کدام در آب زندگی می‌کند و کدام پرواز می‌کند؟",
        baskets: [{ pic: "🌊", label: "در آب", value: "water" }, { pic: "☁️", label: "در آسمان", value: "sky" }],
        items: [{ pic: "🐟", basket: "water" }, { pic: "🐦", basket: "sky" }, { pic: "🐙", basket: "water" },
          { pic: "🦋", basket: "sky" }, { pic: "🦀", basket: "water" }, { pic: "🐝", basket: "sky" }] },
      { type: "unplugged", text: "چهار چیز روی میز بگذارید که سه تایش با هم جورند، مثلاً سه قاشق و یک جوراب. بپرسید: «کدام جور نیست؟ چرا؟» بعد نوبت کودک است که شما را امتحان کند. گاهی بیش از یک جواب درست هست؛ اگر دلیل خوبی بیاورد، قبول کنید." }
    ]
  },
  {
    id: "think-sprout-2", subject: "think", level: "sprout", emoji: "☔", title: "اگر… آن‌وقت…",
    steps: [
      { type: "choose", prompt: "اگر باران ببارد، کدام را برمی‌داریم؟", say: "اگر باران ببارد، کدام را برمی‌داریم؟",
        show: "🌧️", pic: true, options: ["🕶️", "☂️", "🏖️"], answer: "☂️" },
      { type: "choose", prompt: "اگر هوا سرد باشد، چه می‌پوشیم؟", say: "اگر هوا سرد باشد، چه می‌پوشیم؟",
        show: "❄️", pic: true, options: ["🩳", "🩴", "🧥"], answer: "🧥" },
      { type: "choose", prompt: "اگر گلدان تشنه باشد، به آن چه می‌دهیم؟", say: "اگر گلدان تشنه باشد، به آن چه می‌دهیم؟",
        show: "🥀", pic: true, options: ["💧", "🍰", "🧸"], answer: "💧" },
      { type: "choose", prompt: "قانون بازی: اگر زنگ بزند، می‌پریم. زنگ زد! چه کار کنیم؟", say: "قانون بازی: اگر زنگ بزند، می‌پریم. زنگ زد! چه کار کنیم؟",
        show: "🔔", options: [{ label: "🧍 می‌ایستیم", value: "stand" }, { label: "🦘 می‌پریم", value: "jump" }, { label: "🪑 می‌نشینیم", value: "sit" }], answer: "jump" },
      { type: "sort", prompt: "قانون: اگر قرمز است، در سبد؛ اگر قرمز نیست، در بشقاب.",
        baskets: [{ pic: "🧺", label: "قرمز", value: "red" }, { pic: "🍽️", label: "قرمز نیست", value: "other" }],
        items: [{ pic: "🍎", basket: "red" }, { pic: "🍌", basket: "other" }, { pic: "🍓", basket: "red" },
          { pic: "🍐", basket: "other" }, { pic: "🍒", basket: "red" }, { pic: "🍇", basket: "other" }] },
      { type: "unplugged", text: "بازی «اگر… آن‌وقت…»: یک قانون بگذارید، مثلاً «اگر دست زدم، بپر. اگر پا کوبیدم، بنشین.» بعد گاهی دست بزنید و گاهی پا بکوبید. کم‌کم قانون‌ها را عوض کنید، یا بگذارید خودش قانون بگذارد و شما اجرا کنید. «اگر» در برنامه‌نویسی هم همین کار را می‌کند." }
    ]
  },
  {
    id: "think-sprout-3", subject: "think", level: "sprout", emoji: "🔷", title: "الگوهای سخت‌تر",
    steps: [
      { type: "pattern", prompt: "بعدی‌ها کدام‌اند؟", say: "بعدی‌ها کدام‌اند؟",
        seq: ["🔺", "🟦", "🟡", "🔺", "🟦", "🟡", "🔺", "🟦", "🟡"], blanks: [7, 8], options: ["🔺", "🟦", "🟡"] },
      { type: "pattern", prompt: "جاهای خالی را پر کن", say: "جاهای خالی را پر کن",
        seq: ["🐟", "🐟", "🐢", "🐢", "🐟", "🐟", "🐢", "🐢"], blanks: [5, 6], options: ["🐟", "🐢", "🐸"] },
      { type: "pattern", prompt: "عددها را ادامه بده", ltr: true,
        seq: [5, 4, 3, 2, 1], blanks: [3, 4], options: [1, 2, 6] },
      { type: "pattern", prompt: "هر بار یکی بیشتر می‌شود. بعدی کدام است؟", say: "هر بار یکی بیشتر می‌شود. بعدی کدام است؟", ltr: true,
        seq: ["🟩", "🟩🟩", "🟩🟩🟩", "🟩🟩🟩🟩"], blanks: [3], options: ["🟩🟩", "🟩🟩🟩🟩", "🟩🟩🟩"] },
      { type: "pattern", prompt: "عددها را ادامه بده", ltr: true,
        seq: [1, 2, 3, 1, 2, 3, 1, 2, 3], blanks: [7, 8], options: [1, 2, 3, 4] },
      { type: "unplugged", text: "با ماکارونی، دکمه یا مهره یک گردنبند الگودار درست کنید: دو تا قرمز، یکی آبی، دو تا قرمز، یکی آبی… بپرسید: «بعدی چیست؟ چطور فهمیدی؟» بعد بگذارید خودش یک الگوی تازه بسازد و از شما بپرسد." }
    ]
  },
  {
    id: "think-sprout-4", subject: "think", level: "sprout", emoji: "🐰", title: "برنامه با فلش",
    steps: [
      { type: "code", prompt: "خرگوش را به هویج برسان. فلش‌ها را بچین و «اجرا» را بزن.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 2], goal: [4, 2] },
      { type: "code", prompt: "خرگوش را به هویج برسان. از کنار درخت‌ها برو.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 4], goal: [4, 0], walls: [[1, 3], [1, 2], [3, 2], [3, 1]] },
      { type: "code", prompt: "خرگوش را به هویج برسان", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[1, 0], [1, 1], [1, 2], [3, 2], [3, 3], [3, 4]] },
      { type: "code", prompt: "لاک‌پشت را به توت‌فرنگی برسان",
        size: [5, 5], start: [2, 4], goal: [2, 0], walls: [[2, 2], [1, 2], [3, 1], [2, 3]] },
      { type: "unplugged", text: "با گچ در حیاط، یا با نوار چسب روی فرش، یک جدول ۴ در ۴ بکشید و یک اسباب‌بازی را در یکی از خانه‌ها بگذارید. کودک روی کاغذ با فلش‌های بالا، پایین، چپ و راست برنامه بنویسد. بعد یکی از شما روی جدول بایستد و قدم به قدم همان برنامه را اجرا کند. آیا به اسباب‌بازی رسید؟" }
    ]
  },
  {
    id: "think-sprout-5", subject: "think", level: "sprout", emoji: "🐞", title: "اشکال را پیدا کن",
    steps: [
      { type: "code", prompt: "این برنامه اشکال دارد. اول «اجرا» را بزن و ببین چه می‌شود. بعد درستش کن.",
        size: [5, 3], start: [0, 1], goal: [3, 1], given: ["right", "right"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [2, 4], goal: [4, 2], given: ["up", "up", "left", "left"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.", hero: "🐰", goalPic: "🥕", wall: "🌳",
        size: [3, 3], start: [0, 0], goal: [2, 2], walls: [[1, 0]], given: ["right", "down", "down", "right"] },
      { type: "code", prompt: "این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [0, 4], goal: [4, 4], walls: [[2, 4]], given: ["right", "up", "right", "right", "down", "down", "right"] },
      { type: "unplugged", text: "گاهی عمداً دستور اشتباه بدهید، مثلاً «برای رسیدن به در، سه قدم به چپ برو» وقتی در سمت راست است. بگذارید کودک اشکال را پیدا کند و درستش کند. به او بگویید برنامه‌نویس‌ها هم هر روز اشکال پیدا و درست می‌کنند؛ اشتباه بخشی از کار است." }
    ]
  },

  // ---------------- Thinking: Sapling (turning, forward-and-turn coding, repeat, sorting) ----------------
  {
    id: "think-sapling-1", subject: "think", level: "sapling", emoji: "🧭", title: "به چپ بچرخ، به راست بچرخ",
    steps: [
      { type: "choose", prompt: "ربات رو به بالاست. اگر به راست بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به بالاست. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬆️", pic: true, options: ["⬅️", "➡️", "⬇️"], answer: "➡️" },
      { type: "choose", prompt: "ربات رو به راست است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به راست است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖➡️", pic: true, options: ["⬆️", "⬇️", "⬅️"], answer: "⬇️" },
      { type: "choose", prompt: "ربات رو به پایین است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟ (فکر کن خودت جای او هستی.)", say: "ربات رو به پایین است. اگر به راست بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬇️", pic: true, options: ["➡️", "⬅️", "⬆️"], answer: "⬅️" },
      { type: "choose", prompt: "ربات رو به چپ است. اگر دو بار به چپ بچرخد، رو به کدام طرف می‌شود؟", say: "ربات رو به چپ است. اگر دو بار به چپ بچرخد، رو به کدام طرف می‌شود؟",
        show: "🤖⬅️", pic: true, options: ["⬆️", "➡️", "⬇️"], answer: "➡️" },
      { type: "code", blocks: "turn", face: "up",
        prompt: "مثلث روی ربات نشان می‌دهد رو به کجاست. ربات را به ستاره برسان.", goalPic: "⭐",
        size: [3, 3], start: [0, 2], goal: [2, 2] },
      { type: "unplugged", text: "بازی «ربات بچرخ»: کودک بایستد. بگویید «به راست بچرخ»، «به چپ بچرخ»، «دو قدم جلو برو» و بعد بپرسید: «حالا رو به کجا هستی؟ پنجره؟ در؟» بعد جایتان را عوض کنید. اگر چپ و راست را گم می‌کند، یک کش یا روبان به مچ دست راستش ببندید." }
    ]
  },
  {
    id: "think-sapling-2", subject: "think", level: "sapling", emoji: "🤖", title: "جلو برو، بچرخ",
    steps: [
      { type: "code", blocks: "turn", face: "up", prompt: "ربات را به ستاره برسان", goalPic: "⭐",
        size: [4, 4], start: [0, 3], goal: [0, 0] },
      { type: "code", blocks: "turn", face: "up", prompt: "ربات اول باید بچرخد. به ستاره برسانش.", goalPic: "⭐",
        size: [4, 4], start: [0, 3], goal: [3, 3] },
      { type: "code", blocks: "turn", face: "right", prompt: "ربات را به ستاره برسان", goalPic: "⭐",
        size: [4, 4], start: [0, 0], goal: [3, 3], walls: [[1, 1], [1, 2], [1, 3], [2, 1]] },
      { type: "code", blocks: "turn", face: "down", prompt: "ربات را از میان سنگ‌ها به ستاره برسان", goalPic: "⭐",
        size: [5, 3], start: [0, 0], goal: [4, 2], walls: [[1, 0], [1, 1], [3, 1], [3, 2]] },
      { type: "unplugged", text: "حالا شما ربات هستید و فقط سه دستور را می‌فهمید: «یک قدم جلو»، «به راست بچرخ» و «به چپ بچرخ». کودک باید شما را از اتاق به آشپزخانه ببرد. هر دستور را دقیقاً اجرا کنید. اگر جلویتان دیوار یا مبل بود، بایستید و بگویید «بوق! راه بسته است.»" }
    ]
  },
  {
    id: "think-sapling-3", subject: "think", level: "sapling", emoji: "🔁", title: "تکرار",
    steps: [
      /* The same «جلو» four times, then one repeat block that does it four times, with a counter. The program
         board looks like the coding game's (first block on the right). Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین ربات چطور به پرچم می‌رسد", bg: "#e4f2e0",
        parts: {
          board: { art: "code-board" }, row: { art: "cell-row" },
          flag: { art: "🚩", at: [125, 71], s: 0.8 }, bot: { art: "🤖", at: [40, 71], s: 0.85 },
          f1: { art: "block-fwd", at: [128, 18], s: 0 }, f2: { art: "block-fwd", at: [108, 18], s: 0 },
          f3: { art: "block-fwd", at: [88, 18], s: 0 }, f4: { art: "block-fwd", at: [68, 18], s: 0 },
          loop: { art: "block-repeat", at: [100, 18], s: 0 }, body: { art: "block-fwd", at: [100, 18], s: 0 },
          now: { art: "block-now", at: [128, 18], o: 0 }, times: { art: "counter", at: [142, 62], o: 0 }
        },
        scenes: [
          { caption: "ربات می‌خواهد به پرچم برسد.", do: [
            { id: "bot", to: { y: "-3" }, at: 400, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "جلو، جلو، جلو، جلو. چهار قطعه، همه مثل هم!", do: [
            { id: "f1", to: { s: 1 }, dur: 350, ease: "back" }, { id: "f2", to: { s: 1 }, at: 600, dur: 350, ease: "back" },
            { id: "f3", to: { s: 1 }, at: 1200, dur: 350, ease: "back" }, { id: "f4", to: { s: 1 }, at: 1800, dur: 350, ease: "back" },
            { id: "now", to: { o: 1 }, at: 2600, dur: 200 },
            { id: "bot", path: "M40 71Q50 63 60 71", at: 2800, dur: 600 },
            { id: "now", to: { x: 108 }, at: 3500, dur: 300 }, { id: "bot", path: "M60 71Q70 63 80 71", at: 3800, dur: 600 },
            { id: "now", to: { x: 88 }, at: 4500, dur: 300 }, { id: "bot", path: "M80 71Q90 63 100 71", at: 4800, dur: 600 },
            { id: "now", to: { x: 68 }, at: 5500, dur: 300 }, { id: "bot", path: "M100 71Q110 63 120 71", at: 5800, dur: 600 }
          ] },
          { caption: "به جای آن، می‌شود گفت: «۴ بار تکرار کن: جلو.»", do: [
            { id: "now", to: { o: 0 }, dur: 300 },
            { id: "bot", to: { o: 0 }, dur: 400 }, { id: "bot", to: { x: 40 }, at: 450, dur: 1 }, { id: "bot", to: { o: 1 }, at: 500, dur: 400 },
            { id: "f1", to: { x: 100 }, at: 1000, dur: 700 }, { id: "f2", to: { x: 100 }, at: 1000, dur: 700 },
            { id: "f3", to: { x: 100 }, at: 1000, dur: 700 }, { id: "f4", to: { x: 100 }, at: 1000, dur: 700 },
            { id: "f1", to: { o: 0 }, at: 1500, dur: 400 }, { id: "f2", to: { o: 0 }, at: 1500, dur: 400 },
            { id: "f3", to: { o: 0 }, at: 1500, dur: 400 }, { id: "f4", to: { o: 0 }, at: 1500, dur: 400 },
            { id: "body", to: { s: 1 }, at: 1700, dur: 400 }, { id: "loop", to: { s: 1 }, at: 1700, dur: 600, ease: "back" }
          ] },
          { caption: "ربات همان «جلو» را ۴ بار تکرار می‌کند: ۱، ۲، ۳، ۴!", do: [
            { id: "now", to: { x: 100 }, dur: 1 }, { id: "now", to: { o: 1 }, dur: 300 }, { id: "times", to: { o: 1 }, dur: 300 },
            { count: "times", from: 1, to: 4, at: 400, dur: 3600 },
            { id: "bot", path: "M40 71Q50 63 60 71", at: 400, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 400, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M60 71Q70 63 80 71", at: 1300, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 1300, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M80 71Q90 63 100 71", at: 2200, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 2200, dur: 400, yoyo: true, times: 2 },
            { id: "bot", path: "M100 71Q110 63 120 71", at: 3100, dur: 600 }, { id: "now", to: { s: 1.15 }, at: 3100, dur: 400, yoyo: true, times: 2 },
            { emit: "spark", where: [122, 58], spread: [16, 10], n: 6, at: 3700, dur: 600 }
          ] },
          { caption: "این همان قطعه «تکرار» است. برنامه کوتاه‌تر شد!", do: [
            { id: "now", to: { o: 0 }, dur: 300 }, { id: "times", to: { o: 0 }, dur: 300 },
            { id: "f1", to: { x: 128, y: 42, s: 0.8 }, dur: 1 }, { id: "f2", to: { x: 108, y: 42, s: 0.8 }, dur: 1 },
            { id: "f3", to: { x: 88, y: 42, s: 0.8 }, dur: 1 }, { id: "f4", to: { x: 68, y: 42, s: 0.8 }, dur: 1 },
            { id: "f1", to: { o: 0.5 }, at: 400, dur: 500 }, { id: "f2", to: { o: 0.5 }, at: 400, dur: 500 },
            { id: "f3", to: { o: 0.5 }, at: 400, dur: 500 }, { id: "f4", to: { o: 0.5 }, at: 400, dur: 500 },
            { id: "loop", to: { s: 1.12 }, at: 1400, dur: 700, yoyo: true, times: 2 }, { id: "body", to: { s: 1.12 }, at: 1400, dur: 700, yoyo: true, times: 2 }
          ] }
        ],
        question: "با «تکرار»، برنامه کوتاه‌تر شد یا بلندتر؟", options: ["کوتاه‌تر", "بلندتر"], answer: "کوتاه‌تر" },
      { type: "code", blocks: "turn", repeat: true, max: 2, face: "right", goalPic: "🚩",
        prompt: "فقط دو قطعه داری! «تکرار» را بگذار، «جلو» را داخلش بگذار و بزن تا تعدادش درست شود.",
        size: [5, 3], start: [0, 1], goal: [4, 1] },
      { type: "code", blocks: "turn", repeat: true, face: "right", goalPic: "🚩",
        prompt: "این برنامه اشکال دارد. تعداد تکرار را درست کن.",
        size: [5, 5], start: [0, 4], goal: [0, 0], given: ["ccw", { repeat: 3, body: ["fwd"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "⭐",
        prompt: "پله‌ها را بالا برو! با پنج قطعه به ستاره برس.",
        size: [5, 5], start: [0, 4], goal: [3, 1], walls: [[0, 2], [1, 1], [2, 0], [2, 4], [3, 3], [4, 2]] },
      { type: "unplugged", text: "یک «رقص تکراری» بسازید: «۳ بار تکرار کن: دست بزن، بپر.» کودک برنامه را بگوید و شما اجرا کنید، بعد برعکس. بپرسید: «اگر بخواهیم ۱۰ بار دست بزنیم، کدام کوتاه‌تر است: ده بار گفتن «دست بزن»، یا یک بار گفتن «۱۰ بار تکرار کن: دست بزن»؟»" }
    ]
  },
  {
    id: "think-sapling-4", subject: "think", level: "sapling", emoji: "📏", title: "مرتب کردن",
    steps: [
      { type: "order", prompt: "از کوچک به بزرگ بچین", ltr: true, items: [2, 5, 7, 9, 12] },
      /* Sorting by swapping neighbours: the frame shows the two being compared, and the cards really swap places.
         Drawings: js/art/rig-think.js. */
      { type: "scene", prompt: "ببین چطور می‌شود عددها را دوتادوتا مرتب کرد", bg: "#f4ecdf",
        parts: {
          a: { art: "card-5", at: [41, 40], o: 0 }, b: { art: "card-2", at: [67, 40], o: 0 },
          c: { art: "card-8", at: [93, 40], o: 0 }, d: { art: "card-3", at: [119, 40], o: 0 },
          frame: { art: "pair-frame", at: [54, 50], o: 0 },
          swap: { art: "swap-arrows", at: [54, 15], o: 0 }, tick: { art: "tick", at: [80, 26], o: 0 }
        },
        scenes: [
          { caption: "می‌خواهیم این عددها را از کوچک به بزرگ بچینیم.", do: [
            { id: "a", to: { y: 50, o: 1 }, dur: 500 }, { id: "b", to: { y: 50, o: 1 }, at: 250, dur: 500 },
            { id: "c", to: { y: 50, o: 1 }, at: 500, dur: 500 }, { id: "d", to: { y: 50, o: 1 }, at: 750, dur: 500 }
          ] },
          { caption: "دو تای اول را با هم مقایسه می‌کنیم: ۵ از ۲ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", key: 5400, do: [
            { id: "frame", to: { o: 1 }, dur: 400 },
            { id: "swap", to: { o: 1 }, at: 4400, dur: 300 },
            { id: "a", path: "M41 50Q54 22 67 50", at: 5000, dur: 1100 }, { id: "b", path: "M67 50Q54 78 41 50", at: 5000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 6300, dur: 300 }
          ] },
          { caption: "حالا ۵ و ۸: ترتیبشان درست است. عوضشان نمی‌کنیم.", do: [
            { id: "frame", to: { x: 80 }, dur: 600 },
            { id: "tick", to: { o: 1 }, at: 1800, dur: 400 }
          ] },
          { caption: "۸ و ۳: ۸ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", key: 3400, do: [
            { id: "tick", to: { o: 0 }, dur: 300 },
            { id: "frame", to: { x: 106 }, dur: 600 },
            { id: "swap", to: { x: 106 }, dur: 1 }, { id: "swap", to: { o: 1 }, at: 2400, dur: 300 },
            { id: "c", path: "M93 50Q106 22 119 50", at: 3000, dur: 1100 }, { id: "d", path: "M119 50Q106 78 93 50", at: 3000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 4300, dur: 300 }
          ] },
          { caption: "یک دور دیگر از اول: ۲ و ۵ درست‌اند. ۵ و ۳ را عوض می‌کنیم.", key: 4400, do: [
            { id: "frame", to: { x: 54 }, dur: 700 },
            { id: "tick", to: { x: 54 }, dur: 1 }, { id: "tick", to: { o: 1 }, at: 1100, dur: 300 }, { id: "tick", to: { o: 0 }, at: 2500, dur: 300 },
            { id: "frame", to: { x: 80 }, at: 2700, dur: 600 },
            { id: "swap", to: { x: 80 }, dur: 1 }, { id: "swap", to: { o: 1 }, at: 3500, dur: 300 },
            { id: "a", path: "M67 50Q80 22 93 50", at: 4000, dur: 1100 }, { id: "d", path: "M93 50Q80 78 67 50", at: 4000, dur: 1100 },
            { id: "swap", to: { o: 0 }, at: 5300, dur: 300 }
          ] },
          { caption: "همه مرتب شدند: ۲، ۳، ۵، ۸.", do: [
            { id: "frame", to: { o: 0 }, dur: 400 },
            { id: "b.ok", to: { o: 1 }, at: 300, dur: 300 }, { id: "b", to: { y: "-4" }, at: 300, dur: 500, yoyo: true, times: 2 },
            { id: "d.ok", to: { o: 1 }, at: 900, dur: 300 }, { id: "d", to: { y: "-4" }, at: 900, dur: 500, yoyo: true, times: 2 },
            { id: "a.ok", to: { o: 1 }, at: 1500, dur: 300 }, { id: "a", to: { y: "-4" }, at: 1500, dur: 500, yoyo: true, times: 2 },
            { id: "c.ok", to: { o: 1 }, at: 2100, dur: 300 }, { id: "c", to: { y: "-4" }, at: 2100, dur: 500, yoyo: true, times: 2 }
          ] }
        ],
        question: "در این روش، هر بار چند عدد را با هم مقایسه می‌کنیم؟", options: [{ label: "۲", value: 2 }, { label: "۳", value: 3 }, { label: "۴", value: 4 }], answer: 2 },
      { type: "order", prompt: "روزهای هفته را به ترتیب بچین. هفته با شنبه شروع می‌شود.", say: "روزهای هفته را به ترتیب بچین. هفته با شنبه شروع می‌شود.", numbered: true,
        items: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه"] },
      { type: "order", prompt: "از کوچک به بزرگ بچین", ltr: true, items: [14, 23, 31, 40, 52] },
      { type: "sort", prompt: "کدام را می‌شود خورد و کدام را نمی‌شود؟",
        baskets: [{ pic: "😋", label: "خوردنی", value: "yes" }, { pic: "🚫", label: "نخوردنی", value: "no" }],
        items: [{ pic: "🥕", basket: "yes" }, { pic: "🧱", basket: "no" }, { pic: "🍞", basket: "yes" },
          { pic: "🧦", basket: "no" }, { pic: "🧀", basket: "yes" }, { pic: "✏️", basket: "no" }] },
      { type: "unplugged", text: "چند کارت عدد، یا چند قاشق و لیوان با اندازه‌های مختلف، را درهم روی میز بچینید. قانون این است: هر بار فقط دو تای کنار هم را مقایسه کنید و اگر لازم بود جایشان را عوض کنید. آن‌قدر ادامه دهید تا همه مرتب شوند. کامپیوترها هم با روش‌هایی مثل همین مرتب می‌کنند." }
    ]
  },
  {
    id: "think-sapling-5", subject: "think", level: "sapling", emoji: "🏆", title: "برنامه‌های بزرگ‌تر",
    steps: [
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "right", goalPic: "⭐",
        prompt: "پله‌ها را پایین برو! این برنامه اشکال دارد. درستش کن.",
        size: [5, 5], start: [0, 0], goal: [4, 4], walls: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 0], [3, 1], [4, 2]],
        given: [{ repeat: 4, body: ["fwd", "ccw", "fwd", "cw"] }] },
      { type: "code", blocks: "turn", repeat: true, max: 8, face: "down", goalPic: "⭐",
        prompt: "دور دیوار برو و به ستاره برس. حداکثر هشت قطعه داری.",
        size: [5, 5], start: [0, 0], goal: [4, 0], walls: [[2, 0], [2, 1], [2, 2], [2, 3]] },
      { type: "code", blocks: "turn", repeat: true, max: 5, face: "up", goalPic: "🍎",
        prompt: "ربات را به سیب برسان. حداکثر پنج قطعه داری.",
        size: [5, 5], start: [0, 4], goal: [4, 0], walls: [[0, 2], [1, 1], [2, 0], [1, 4], [2, 3], [3, 2], [4, 1]] },
      { type: "unplugged", text: "روی کاغذ برنامه‌ای بنویسید تا یکی از اعضای خانواده، که ربات شده، دور میز بچرخد؛ مثلاً «۴ بار تکرار کن: ۳ قدم جلو، به راست بچرخ». اول کودک حدس بزند ربات کجا می‌رسد، بعد اجرا کنید. اگر نرسید، با هم دنبال اشکال بگردید و برنامه را درست کنید." }
    ]
  }
);
