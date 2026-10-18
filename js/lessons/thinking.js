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
      { type: "story", prompt: "ببین گل چطور بزرگ می‌شود",
        cast: { seed: "🌰", water: "💧", sprout: "🌱", flower: "🌻", sun: "☀️" },
        scenes: [
          { caption: "اول دانه را در خاک می‌کاریم.", at: { seed: [50, 74], sun: [84, 18] } },
          { caption: "بعد به آن آب می‌دهیم.", at: { water: [50, 40, { act: "bounce" }] } },
          { caption: "کم‌کم جوانه می‌زند.", at: { water: null, seed: null, sprout: [50, 70, { act: "grow" }] } },
          { caption: "آخر سر گل می‌دهد.", at: { sprout: null, flower: [50, 62, { size: 1.5, act: "grow" }] } }
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
      { type: "story", prompt: "ببین ربات چطور به پرچم می‌رسد",
        cast: { bot: "🤖", flag: "🚩", plan: "🔁 ۴ بار: 👣" },
        scenes: [
          { caption: "ربات می‌خواهد به پرچم برسد.", at: { bot: [14, 66], flag: [86, 66] } },
          { caption: "جلو، جلو، جلو، جلو. چهار قطعه، همه مثل هم!", at: { bot: [72, 66] } },
          { caption: "به جای آن، می‌شود گفت: «۴ بار تکرار کن: جلو.»", at: { bot: [14, 66], plan: [50, 26, { act: "grow" }] } },
          { caption: "این همان قطعه «تکرار» است. برنامه کوتاه‌تر شد!", at: { bot: [72, 66, { act: "bounce" }] } }
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
      { type: "story", prompt: "ببین چطور می‌شود عددها را دوتادوتا مرتب کرد",
        cast: { a: "۵", b: "۲", c: "۸", d: "۳" },
        scenes: [
          { caption: "می‌خواهیم این عددها را از کوچک به بزرگ بچینیم.", at: { a: [20, 50], b: [40, 50], c: [60, 50], d: [80, 50] } },
          { caption: "دو تای اول را با هم مقایسه می‌کنیم: ۵ از ۲ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", at: { a: [40, 50], b: [20, 50] } },
          { caption: "حالا ۵ و ۸: ترتیبشان درست است. عوضشان نمی‌کنیم.", at: { a: [40, 50, { act: "bounce" }], c: [60, 50, { act: "bounce" }] } },
          { caption: "۸ و ۳: ۸ بزرگ‌تر است، پس جایشان را عوض می‌کنیم.", at: { c: [80, 50], d: [60, 50] } },
          { caption: "یک دور دیگر از اول: ۵ و ۳ را هم عوض می‌کنیم.", at: { a: [60, 50], d: [40, 50] } },
          { caption: "همه مرتب شدند: ۲، ۳، ۵، ۸.", at: { a: [60, 50, { act: "bounce" }], b: [20, 50, { act: "bounce" }], c: [80, 50, { act: "bounce" }], d: [40, 50, { act: "bounce" }] } }
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
