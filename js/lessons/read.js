/* باغچه — فارسی (reading and writing) lessons.
   After any change run  node tools/check-reading.js : words a child decodes may use only letters taught so far.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

B.LESSONS.push(
  // ---------------- Reading: Seed (seeing and talking, before letters) ----------------
  {
    id: "read-seed-1", subject: "read", level: "seed", emoji: "🔍", title: "کدام شبیه است؟",
    steps: [
      { type: "choose", show: "▲", prompt: "کدام شبیه این است؟", options: ["●", "▲", "■"], answer: "▲" },
      { type: "choose", show: "⭐", prompt: "کدام شبیه این است؟", options: ["🌙", "☀️", "⭐"], answer: "⭐", pic: true },
      { type: "choose", show: "ب", prompt: "کدام شبیه این است؟", options: ["ن", "ب", "م"], answer: "ب" },
      { type: "choose", show: "م", prompt: "کدام شبیه این است؟", options: ["م", "س", "د"], answer: "م" },
      { type: "choose", show: "آ", prompt: "کدام شبیه این است؟", options: ["د", "ب", "آ"], answer: "آ" },
      { type: "choose", show: "س", prompt: "کدام شبیه این است؟", options: ["ش", "س", "ب"], answer: "س" }
    ]
  },
  {
    id: "read-seed-11", subject: "read", level: "seed", emoji: "🔔", title: "این صدای چیست؟",
    steps: [
      { type: "choose", prompt: "چه کسی می‌گوید «میو میو»؟", say: "میو، میو! چه کسی این صدا را می‌دهد؟", pic: true,
        options: [{ label: "🐕", value: "سگ" }, { label: "🐈", value: "گربه" }, { label: "🐄", value: "گاو" }], answer: "گربه" },
      { type: "choose", prompt: "چه کسی می‌خواند «قوقولی‌قوقو»؟", say: "قوقولی‌قوقو! چه کسی صبح زود این‌طوری می‌خواند؟", pic: true,
        options: [{ label: "🐑", value: "گوسفند" }, { label: "🐸", value: "قورباغه" }, { label: "🐓", value: "خروس" }], answer: "خروس" },
      { type: "choose", prompt: "چه چیزی «تیک‌تاک» می‌کند؟", say: "تیک‌تاک، تیک‌تاک! چه چیزی این صدا را می‌دهد؟", pic: true,
        options: [{ label: "⏰", value: "ساعت" }, { label: "🚗", value: "ماشین" }, { label: "🔔", value: "زنگ" }], answer: "ساعت" },
      { type: "choose", prompt: "صدای کدام بلندتر است؟", say: "شیر می‌غرّد. موش جیرجیر می‌کند. صدای کدام بلندتر است؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🦁", value: "شیر" }], answer: "شیر" },
      { type: "choose", prompt: "کدام صدا آرام است؟", say: "ماشین آتش‌نشانی آژیر می‌کشد. یک نفر در گوش دوستش پچ‌پچ می‌کند. کدام صدا آرام است؟", pic: true,
        options: [{ label: "🚒", value: "آژیر" }, { label: "🤫", value: "پچ‌پچ" }], answer: "پچ‌پچ" },
      // Same or different: two apples are "the same", an apple and a pear "different".
      { type: "choose", prompt: "این دو کلمه مثل هم بودند یا فرق داشتند؟",
        say: "خوب گوش بده: توپ ... توت. اگر مثل هم بودند، دو سیب را بزن. اگر فرق داشتند، سیب و گلابی را بزن.", pic: true,
        options: [{ label: "🍎🍎", value: "مثل هم" }, { label: "🍎🍐", value: "فرق دارند" }], answer: "فرق دارند" },
      { type: "choose", prompt: "این دو کلمه مثل هم بودند یا فرق داشتند؟",
        say: "خوب گوش بده: نان ... نان. اگر مثل هم بودند، دو سیب را بزن. اگر فرق داشتند، سیب و گلابی را بزن.", pic: true,
        options: [{ label: "🍎🍎", value: "مثل هم" }, { label: "🍎🍐", value: "فرق دارند" }], answer: "مثل هم" },
      { type: "choose", prompt: "این دو کلمه مثل هم بودند یا فرق داشتند؟",
        say: "خوب گوش بده: کلاه ... کلاغ. اگر مثل هم بودند، دو سیب را بزن. اگر فرق داشتند، سیب و گلابی را بزن.", pic: true,
        options: [{ label: "🍎🍎", value: "مثل هم" }, { label: "🍎🍐", value: "فرق دارند" }], answer: "فرق دارند" },
      { type: "pairs", prompt: "روی هر بلندگو بزن و صدا را بشنو. هر صدا را با صاحبش جفت کن.",
        say: "روی هر بلندگو بزن و صدا را بشنو. هر صدا را با صاحبش جفت کن.",
        pairs: [[{ pic: "🔊", say: "میو میو" }, { pic: "🐈", say: "گربه" }], [{ pic: "🔊", say: "هاپ هاپ" }, { pic: "🐕", say: "سگ" }],
          [{ pic: "🔊", say: "بَع بَع" }, { pic: "🐑", say: "گوسفند" }], [{ pic: "🔊", say: "قور قور" }, { pic: "🐸", say: "قورباغه" }]] }
    ]
  },
  {
    id: "read-seed-2", subject: "read", level: "seed", emoji: "🗣️", title: "با هم ببینیم و بگوییم",
    steps: [
      { type: "talk", scene: "🏡 🌳 👧 🐈 ☀️", caption: "یک روز آفتابی در حیاط" },
      { type: "talk", scene: "🌧️ ☂️ 👦 🐕 🌈", caption: "یک روز بارانی" },
      { type: "talk", scene: "🍞 🧀 🍉 👵 👶", caption: "سفره صبحانه" }
    ]
  },
  {
    id: "read-seed-12", subject: "read", level: "seed", emoji: "🧺", title: "اسم چیزها",
    steps: [
      { type: "choose", prompt: "سیب کدام است؟", say: "سیب کدام است؟ روی سیب بزن.", pic: true,
        options: [{ label: "🍌", value: "موز" }, { label: "🍎", value: "سیب" }, { label: "🍇", value: "انگور" }], answer: "سیب" },
      { type: "choose", prompt: "جوراب کدام است؟", say: "جوراب کدام است؟", pic: true,
        options: [{ label: "🧢", value: "کلاه" }, { label: "👟", value: "کفش" }, { label: "🧦", value: "جوراب" }], answer: "جوراب" },
      { type: "choose", prompt: "گوش کدام است؟", say: "گوش کدام است؟", pic: true,
        options: [{ label: "👂", value: "گوش" }, { label: "👃", value: "بینی" }, { label: "🦶", value: "پا" }], answer: "گوش" },
      { type: "choose", prompt: "کدام زرد است؟", say: "کدام رنگ زرد است؟ قرمز؟ زرد؟ آبی؟", pic: true,
        options: [{ label: "🟥", value: "قرمز" }, { label: "🟦", value: "آبی" }, { label: "🟨", value: "زرد" }], answer: "زرد" },
      { type: "choose", prompt: "کدام حیوان است؟", say: "کدام یکی حیوان است؟ صندلی؟ گوسفند؟ گلابی؟", pic: true,
        options: [{ label: "🪑", value: "صندلی" }, { label: "🐑", value: "گوسفند" }, { label: "🍐", value: "گلابی" }], answer: "گوسفند" },
      { type: "sort", prompt: "میوه‌ها پیش سیب، حیوان‌ها پیش گربه، لباس‌ها پیش پیراهن.",
        say: "روی هر تصویر بزن و اسمش را بشنو. میوه‌ها را پیش سیب بگذار، حیوان‌ها را پیش گربه و لباس‌ها را پیش پیراهن.",
        baskets: [{ pic: "🍎", value: "میوه" }, { pic: "🐈", value: "حیوان" }, { pic: "👕", value: "لباس" }],
        items: [{ pic: "🍌", say: "موز", basket: "میوه" }, { pic: "🐄", say: "گاو", basket: "حیوان" }, { pic: "🧦", say: "جوراب", basket: "لباس" },
          { pic: "🍇", say: "انگور", basket: "میوه" }, { pic: "🐔", say: "مرغ", basket: "حیوان" }, { pic: "🧢", say: "کلاه", basket: "لباس" }] },
      { type: "sort", prompt: "خوردنی است یا وسیله خانه؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. خوردنی‌ها را پیش بشقاب بگذار و وسیله‌های خانه را پیش خانه.",
        baskets: [{ pic: "🍽️", value: "خوردنی" }, { pic: "🏠", value: "خانه" }],
        items: [{ pic: "🍞", say: "نان", basket: "خوردنی" }, { pic: "🛏️", say: "تخت", basket: "خانه" }, { pic: "🧀", say: "پنیر", basket: "خوردنی" },
          { pic: "🪑", say: "صندلی", basket: "خانه" }, { pic: "🥚", say: "تخم‌مرغ", basket: "خوردنی" }, { pic: "🚪", say: "در", basket: "خانه" }] },
      { type: "talk", scene: "🛋️ 🪟 🧸 🐈 📚 🪴", caption: "این اتاق را با هم ببینید. اسم هر چیزی را که می‌بینی بگو.",
        tips: ["بپرسید «این چیه؟» و صبر کنید تا خودش بگوید.", "اگر اسم چیزی را نمی‌داند، شما بگویید و بخواهید با شما تکرار کند.",
          "بپرسید «این به چه کاری می‌آید؟» و «چه رنگی است؟»", "بعد در خانه بگردید و اسم چیزهای واقعی را هم با هم بگویید."] }
    ]
  },
  {
    id: "read-seed-13", subject: "read", level: "seed", emoji: "🐘", title: "بزرگ و کوچک، پر و خالی",
    steps: [
      { type: "choose", prompt: "کدام بزرگ است؟", say: "کدام بزرگ است؟ موش؟ یا فیل؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🐘", value: "فیل" }], answer: "فیل" },
      { type: "choose", prompt: "کدام کوچک است؟", say: "کدام کوچک است؟ درخت؟ کوه؟ یا جوانه؟", pic: true,
        options: [{ label: "🌳", value: "درخت" }, { label: "⛰️", value: "کوه" }, { label: "🌱", value: "جوانه" }], answer: "جوانه" },
      { type: "choose", prompt: "کدام خالی است؟", say: "کدام خالی است؟ توی کدام هیچ چیزی نیست؟", pic: true,
        options: [{ label: "🥛", value: "لیوان شیر" }, { label: "🍽️", value: "بشقاب" }, { label: "🍲", value: "قابلمه آش" }], answer: "بشقاب" },
      { type: "choose", prompt: "کدام پر است؟", say: "کدام پر است؟ سبد؟ بشقاب؟ یا لیوان شیر؟", pic: true,
        options: [{ label: "🧺", value: "سبد" }, { label: "🥛", value: "لیوان شیر" }, { label: "🍽️", value: "بشقاب" }], answer: "لیوان شیر" },
      { type: "choose", prompt: "کدام سرد است؟", say: "کدام سرد است؟ آتش؟ چای؟ یا آدم‌برفی؟", pic: true,
        options: [{ label: "🔥", value: "آتش" }, { label: "⛄", value: "آدم‌برفی" }, { label: "☕", value: "چای" }], answer: "آدم‌برفی" },
      { type: "choose", prompt: "کدام گرم است؟", say: "کدام گرم است؟ یخ؟ بستنی؟ یا خورشید؟", pic: true,
        options: [{ label: "🧊", value: "یخ" }, { label: "☀️", value: "خورشید" }, { label: "🍦", value: "بستنی" }], answer: "خورشید" },
      { type: "choose", prompt: "کدام تند می‌دود؟", say: "کدام تند می‌دود؟ لاک‌پشت؟ یوزپلنگ؟ یا حلزون؟", pic: true,
        options: [{ label: "🐢", value: "لاک‌پشت" }, { label: "🐌", value: "حلزون" }, { label: "🐆", value: "یوزپلنگ" }], answer: "یوزپلنگ" },
      { type: "choose", prompt: "کدام آرام راه می‌رود؟", say: "کدام آرام آرام راه می‌رود؟ اسب؟ حلزون؟ یا خرگوش؟", pic: true,
        options: [{ label: "🐎", value: "اسب" }, { label: "🐇", value: "خرگوش" }, { label: "🐌", value: "حلزون" }], answer: "حلزون" },
      { type: "pairs", prompt: "هر تصویر را با برعکسش جفت کن.",
        say: "روی هر تصویر بزن و بشنو. هر تصویر را با برعکسش جفت کن: بزرگ و کوچک، گرم و سرد، تند و آرام، پر و خالی.",
        pairs: [[{ pic: "🐘", say: "فیل بزرگ" }, { pic: "🐭", say: "موش کوچک" }], [{ pic: "🔥", say: "آتش گرم" }, { pic: "🧊", say: "یخ سرد" }],
          [{ pic: "🐆", say: "یوزپلنگ تند" }, { pic: "🐢", say: "لاک‌پشت آرام" }], [{ pic: "🥛", say: "لیوان پر" }, { pic: "🍽️", say: "بشقاب خالی" }]] }
    ]
  },
  {
    id: "read-seed-14", subject: "read", level: "seed", emoji: "👂", title: "گوش کن و انجام بده",
    steps: [
      { type: "choose", prompt: "مامان گفت: «کتابت را بردار و به بابا بده.» اول چه چیزی را برمی‌داری؟",
        say: "مامان گفت: کتابت را بردار و به بابا بده. اول چه چیزی را برمی‌داری؟", pic: true,
        options: [{ label: "🧸", value: "عروسک" }, { label: "📖", value: "کتاب" }, { label: "🍎", value: "سیب" }], answer: "کتاب" },
      { type: "choose", prompt: "«کتابت را بردار و به بابا بده.» کتاب را به چه کسی می‌دهی؟",
        say: "مامان گفت: کتابت را بردار و به بابا بده. کتاب را به چه کسی می‌دهی؟", pic: true,
        options: [{ label: "👵", value: "مادربزرگ" }, { label: "👶", value: "نی‌نی" }, { label: "👨", value: "بابا" }], answer: "بابا" },
      { type: "order", prompt: "گوش کن و به همان ترتیب بچین.", numbered: true,
        say: "گوش کن: اول کفش‌هایت را بپوش، بعد کلاهت را سرت بگذار. به همان ترتیب بچین.",
        items: [{ pic: "👟", say: "کفش" }, { pic: "🧢", say: "کلاه" }] },
      { type: "order", prompt: "گوش کن و به همان ترتیب بچین.", numbered: true,
        say: "گوش کن: اول شیر آب را باز کن، بعد دست‌هایت را با صابون بشوی، بعد سر سفره بیا. به همان ترتیب بچین.",
        items: [{ pic: "🚰", say: "شیر آب" }, { pic: "🧼", say: "صابون" }, { pic: "🍽️", say: "سفره" }] },
      { type: "order", prompt: "گوش کن و به همان ترتیب بچین.", numbered: true,
        say: "گوش کن: اول مسواک بزن، بعد کتاب قصه‌ات را بیاور، بعد به تختت برو. به همان ترتیب بچین.",
        items: [{ pic: "🪥", say: "مسواک" }, { pic: "📖", say: "کتاب قصه" }, { pic: "🛏️", say: "تخت" }] },
      { type: "choose", prompt: "بابا گفت: «توپ را بردار، در سبد بگذار و در را ببند.» آخر از همه چه کار می‌کنی؟",
        say: "بابا گفت: توپ را بردار، در سبد بگذار و در را ببند. آخر از همه چه کار می‌کنی؟", pic: true,
        options: [{ label: "⚽", value: "توپ را برمی‌دارم" }, { label: "🚪", value: "در را می‌بندم" }, { label: "🧺", value: "در سبد می‌گذارم" }], answer: "در را می‌بندم" },
      { type: "doit", pic: "🥄", text: "حالا با پدر یا مادرت بازی کن: آن‌ها کاری را می‌گویند که دو یا سه قسمت دارد، و تو همه‌اش را به ترتیب انجام می‌دهی.",
        list: ["«قاشق را بیاور و روی سفره بگذار.»", "«دست بزن، بپر، بعد بنشین.»", "«کتاب را بردار، به مامان بده و برگرد پیش من.»"] }
    ]
  },

  {
    id: "read-seed-3", subject: "read", level: "seed", emoji: "🎴", title: "بازی ببین و پیدا کن",
    steps: [
      /* A picture story to watch and listen to: Sara throws her ball, the cat comes out from behind the bush, the
         ball rolls to it and it plays. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه نگاه کن و گوش بده",
        parts: {
          bg: { art: "read-bg-meadow" }, tree: { art: "read-tree-big", at: [40, 84] },
          cat: { art: "🐈", at: [40, 86], s: 1.1, flip: true }, bush: { art: "read-bush", at: [40, 88], s: 1.3 },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#6b3f26" }, at: [124, 86], s: 1.5, flip: true },
          ball: { art: "read-ball-c", at: [108, 64], s: 1.4 }
        },
        scenes: [
          { caption: "سارا در حیاط توپ‌بازی می‌کند.", key: 900, do: [
            { id: "girl.armF", to: { r: -90 }, dur: 1 }, { id: "girl.armB", to: { r: -80 }, dur: 1 },
            { id: "ball", to: { y: 30 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 },
            { id: "girl.armF", to: { r: -150 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 },
            { id: "girl.armB", to: { r: -140 }, at: 300, dur: 2400, ease: "soft", yoyo: true, times: 4 }
          ] },
          { caption: "گربه از پشت درخت بیرون می‌آید.", do: [
            { id: "cat", to: { y: 79 }, dur: 700, ease: "out" },
            { id: "cat", path: "M40 79Q52 72 62 88", at: 1000, dur: 1000 }
          ] },
          { caption: "توپ قِل می‌خورد و می‌رود پیش گربه.", do: [
            { id: "girl.armF", to: { r: -40 }, dur: 400 }, { id: "girl.armB", to: { r: -30 }, dur: 400 },
            { id: "ball", path: "M108 64Q104 66 100 80.4", dur: 500, ease: "in" },
            { id: "ball", to: { x: 80, r: -200 }, at: 500, dur: 2200, ease: "out" },
            { id: "girl.armF", to: { r: 0 }, at: 900, dur: 500 }, { id: "girl.armB", to: { r: 0 }, at: 900, dur: 500 }
          ] },
          { caption: "گربه با توپ بازی می‌کند. سارا می‌خندد.", key: 1700, do: [
            { id: "cat", to: { x: "+4", r: 8 }, dur: 3200, yoyo: true, times: 6 },
            { id: "ball", to: { x: "+6", r: "+90" }, at: 120, dur: 3200, yoyo: true, times: 6 },
            { id: "girl.eyes", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.smile", to: { o: 0 }, at: 900, dur: 200 },
            { id: "girl.laugh", to: { o: 1 }, at: 900, dur: 200 },
            { id: "girl", to: { y: "-2" }, at: 1000, dur: 2200, yoyo: true, times: 6 }
          ] }
        ],
        question: "گربه با چه بازی کرد؟", pic: true,
        options: [{ label: "🧶", value: "کاموا" }, { label: "⚽", value: "توپ" }, { label: "🪁", value: "بادبادک" }], answer: "توپ" },
      { type: "pairs", prompt: "جفت هر شکل را پیدا کن",
        pairs: [["ب", "ب"], ["م", "م"], ["س", "س"], ["آ", "آ"]] },
      { type: "pairs", hidden: true, pairs: [["🐈", "🐈"], ["🌳", "🌳"], ["☀️", "☀️"]] },
      { type: "order", prompt: "اول دانه بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: ["🌰", "🌱", "🌿", "🌳"] },
      { type: "pattern", prompt: "بعدی کدام است؟", seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], options: ["🔴", "🔵", "🟡"] },
      { type: "order", prompt: "اول تخم بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        items: ["🥚", "🐣", "🐥", "🐔"] }
    ]
  },
  {
    id: "read-seed-15", subject: "read", level: "seed", emoji: "🛍️", title: "با هم ببینیم و بگوییم: بازار",
    steps: [
      { type: "talk", scene: "🧺 🍎 🍊 🍇 👵 👦", caption: "در بازار، کنار میوه‌فروشی. این‌جا چه می‌بینی؟",
        tips: ["اول بگذارید هرچه می‌بیند بگوید، بدون عجله.", "حرفش را کامل‌تر برگردانید: «سیب!» ← «آره، سیب‌های قرمز توی سبد.» و بخواهید تکرار کند.",
          "بپرسید: «مادربزرگ چه می‌خرد؟ تو بودی چه می‌خریدی؟ چرا؟»"] },
      { type: "talk", scene: "🧑‍🍳 🔥 🫓 👨 👧", caption: "در نانوایی بازار. نانوا چه کار می‌کند؟",
        tips: ["سؤال‌هایی بپرسید که جوابشان «آره» یا «نه» نیست: «چه کار می‌کند؟ چطور؟ چرا؟»",
          "اگر یک کلمه گفت، آن را در یک جمله کامل بگویید: «نان» ← «نانوا نان داغ را از تنور درمی‌آورد.»", "بپرسید: «بوی نان تازه چطور است؟ تو کدام نان را دوست داری؟»"] },
      { type: "talk", scene: "🧶 🧣 🧥 👩 🛍️", caption: "در بازار پارچه و لباس. چه رنگ‌هایی می‌بینی؟",
        tips: ["با هم رنگ‌ها را بشمارید و اسمشان را بگویید.", "بپرسید: «این شال گرم است یا خنک؟ کی آن را می‌پوشیم؟»",
          "یک کلمه تازه یادش بدهید (مثلاً «پارچه» یا «کاموا») و چند بار در حرف‌هایتان به کار ببرید."] },
      { type: "talk", scene: "🌳 🛝 👧 👦 🐕 🎈", caption: "در پارک. بچه‌ها چه بازی‌ای می‌کنند؟",
        tips: ["بپرسید: «چه کسی سرسره بازی می‌کند؟ سگ کجاست؟ بادکنک مال کیست؟»", "جوابش را با یک «چرا» ادامه دهید: «چرا پسر می‌خندد؟»",
          "از خودش بپرسید: «تو در پارک چه بازی‌ای دوست داری؟»"] },
      { type: "talk", scene: "🌳 🦆 🌊 👴 🍞", caption: "کنار حوض پارک. پدربزرگ چه کار می‌کند؟ اردک‌ها چه کار می‌کنند؟",
        tips: ["بگذارید قصه کوچکی درباره تصویر بسازد: «اول… بعد…»", "حرفش را با یک کلمه تازه کامل کنید: «اردک‌ها شنا می‌کنند. پاهایشان پارو می‌زند!»",
          "بپرسید: «فکر می‌کنی بعدش چه می‌شود؟»"] }
    ]
  },
  {
    id: "read-seed-16", subject: "read", level: "seed", emoji: "❓", title: "چه کسی؟ کجا؟ چرا؟",
    steps: [
      /* A very short story that answers who, where, what and why: Mina waters the thirsty flowers in the yard.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-garden" }, house: { art: "read-house" },
          f1: { art: "read-flower", look: { c: "#e46b8a" }, at: [32, 80], s: 1.6 }, f2: { art: "read-flower", look: { c: "#fcd34d" }, at: [41, 81], s: 1.6 },
          f3: { art: "read-flower", look: { c: "#9b6bd0" }, at: [50, 80], s: 1.6 },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#5b9bd5", hairColor: "#3d2c22" }, at: [116, 84], s: 1.3, flip: true },
          can: { art: "read-can", under: "girl", at: [7.5, -15.9], s: 0.7 }
        },
        scenes: [
          { caption: "مینا در حیاط خانه است. گل‌ها تشنه‌اند و سرشان پایین افتاده.", hold: 5500, do: [
            { id: "girl.armF", to: { r: -100 }, dur: 1 },
            { id: "f1.top", to: { r: -72 }, at: 900, dur: 2200 }, { id: "f2.top", to: { r: -66 }, at: 1100, dur: 2200 }, { id: "f3.top", to: { r: -76 }, at: 1300, dur: 2200 }
          ] },
          { caption: "مینا با آب‌پاش پیش گل‌ها می‌رود.", do: [
            { id: "girl", to: { x: 76 }, dur: 3000, ease: "linear" },
            { id: "girl.legF", to: { r: 24 }, dur: 3000, yoyo: true, times: 8 }, { id: "girl.legB", to: { r: -24 }, dur: 3000, yoyo: true, times: 8 }
          ] },
          { caption: "مینا به گل‌ها آب می‌دهد.", key: 2600, do: [
            { id: "can", to: { r: 35 }, dur: 700 },
            { emit: "drop", where: [50, 70], spread: [16, 2], rise: 11, n: 34, at: 600, dur: 3200, life: 900 },
            { id: "can", to: { r: 0 }, at: 4200, dur: 700 }
          ] },
          { caption: "گل‌ها سرشان را بالا می‌آورند. مینا خوشحال است.", do: [
            { id: "f1.top", to: { r: 0 }, dur: 1800, ease: "back" }, { id: "f2.top", to: { r: 0 }, at: 300, dur: 1800, ease: "back" },
            { id: "f3.top", to: { r: 0 }, at: 600, dur: 1800, ease: "back" },
            { id: "girl.eyes", to: { o: 0 }, at: 2200, dur: 200 }, { id: "girl.smile", to: { o: 0 }, at: 2200, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 2200, dur: 200 },
            { id: "girl", to: { y: "-2" }, at: 2400, dur: 1600, yoyo: true, times: 4 }
          ] }
        ],
        question: "چه کسی به گل‌ها آب داد؟", pic: true,
        options: [{ label: "👦", value: "یک پسر" }, { label: "👧", value: "مینا" }, { label: "👵", value: "مادربزرگ" }], answer: "مینا" },
      { type: "choose", prompt: "مینا کجا بود؟", say: "مینا کجا بود؟ در مدرسه؟ در حیاط خانه؟ یا کنار دریا؟", pic: true,
        options: [{ label: "🏫", value: "مدرسه" }, { label: "🏖️", value: "دریا" }, { label: "🏡", value: "حیاط خانه" }], answer: "حیاط خانه" },
      { type: "choose", prompt: "مینا چه کار کرد؟", say: "مینا چه کار کرد؟ توپ‌بازی کرد؟ به گل‌ها آب داد؟ یا سیب خورد؟", pic: true,
        options: [{ label: "⚽", value: "توپ‌بازی کرد" }, { label: "💧", value: "آب داد" }, { label: "🍎", value: "سیب خورد" }], answer: "آب داد" },
      { type: "choose", prompt: "چرا مینا به گل‌ها آب داد؟", say: "چرا مینا به گل‌ها آب داد؟ چون گل‌ها تشنه بودند؟ چون باران می‌آمد؟ یا چون شب بود؟", pic: true,
        options: [{ label: "🌧️", value: "باران می‌آمد" }, { label: "🥀", value: "گل‌ها تشنه بودند" }, { label: "🌙", value: "شب بود" }], answer: "گل‌ها تشنه بودند" },
      { type: "talk", scene: "❓ 👧 👨", caption: "حالا نوبت توست: از بزرگ‌ترت یک سؤال بپرس. «چه کسی…؟ کجا…؟ چرا…؟»",
        tips: ["کمکش کنید سؤال را با «چه کسی»، «کجا»، «چه کار» یا «چرا» شروع کند.", "جواب کامل بدهید و بعد شما یک سؤال از او بپرسید.",
          "در کتاب قصه‌ها هم بپرسید: «این کیست؟ کجاست؟ چرا ناراحت است؟»"] }
    ]
  },
  {
    id: "read-seed-17", subject: "read", level: "seed", emoji: "🌞", title: "امروز چه کردی؟",
    steps: [
      { type: "order", prompt: "صبح سارا را به ترتیب بچین: اول، بعد، آخرش.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. سارا صبح اول چه کار می‌کند؟ بعد چه کار می‌کند؟ آخرش چه کار می‌کند؟ به ترتیب بچین.",
        items: [{ pic: "🛏️", say: "سارا از خواب بیدار می‌شود" }, { pic: "🧼", say: "دست و صورتش را می‌شوید" },
          { pic: "🍞", say: "صبحانه می‌خورد" }, { pic: "⚽", say: "بازی می‌کند" }] },
      { type: "talk", scene: "🛏️ 🧼 🍞 ⚽", caption: "حالا صبح سارا را تو تعریف کن: «اول… بعد… آخرش…»",
        tips: ["کمکش کنید با «اول»، «بعد» و «آخرش» تعریف کند.", "می‌توانید با انگشت روی تصویرها از راست به چپ نشان بدهید.",
          "اگر جایی را جا انداخت، بپرسید: «قبل از صبحانه چه کار کرد؟»"] },
      { type: "order", prompt: "رفتن به پارک را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. اول چه شد؟ بعد چه شد؟ آخرش چه شد؟ به ترتیب بچین.",
        items: [{ pic: "👟", say: "کفش‌هایش را پوشید" }, { pic: "🚶", say: "تا پارک راه رفت" },
          { pic: "🛝", say: "سرسره بازی کرد" }, { pic: "🏠", say: "به خانه برگشت" }] },
      { type: "order", prompt: "شب را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. شب اول چه کار می‌کنیم؟ بعد چه کار می‌کنیم؟ آخرش چه کار می‌کنیم؟ به ترتیب بچین.",
        items: [{ pic: "🍲", say: "شام می‌خوریم" }, { pic: "🪥", say: "مسواک می‌زنیم" }, { pic: "📖", say: "قصه می‌خوانیم" }, { pic: "🛌", say: "می‌خوابیم" }] },
      { type: "talk", scene: "🌞 🧒 🌙", caption: "امروز تو چه کار کردی؟ اول چه کردی؟ بعد چه؟ آخرش چه؟",
        tips: ["از صبح شروع کنید: «صبح که بیدار شدی، اول چه کار کردی؟»", "با انگشت‌هایتان بشمارید: اول، بعد، آخرش.",
          "هر جمله‌اش را کامل‌تر برگردانید و بگذارید دوباره بگوید.", "شب‌ها، پیش از خواب، این بازی را تکرار کنید: «امروز چه کردی؟»"] }
    ]
  },
  {
    id: "read-seed-18", subject: "read", level: "seed", emoji: "🎲", title: "بازی کلمه‌ها",
    steps: [
      { type: "sort", prompt: "میوه است یا حیوان؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. میوه‌ها را پیش سیب بگذار و حیوان‌ها را پیش گربه.",
        baskets: [{ pic: "🍎", value: "میوه" }, { pic: "🐈", value: "حیوان" }],
        items: [{ pic: "🍌", say: "موز", basket: "میوه" }, { pic: "🐄", say: "گاو", basket: "حیوان" }, { pic: "🍇", say: "انگور", basket: "میوه" },
          { pic: "🐑", say: "گوسفند", basket: "حیوان" }, { pic: "🍐", say: "گلابی", basket: "میوه" }, { pic: "🐓", say: "خروس", basket: "حیوان" }] },
      { type: "sort", prompt: "لباس است یا وسیله خانه؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. لباس‌ها را پیش پیراهن بگذار و وسیله‌های خانه را پیش تخت.",
        baskets: [{ pic: "👕", value: "لباس" }, { pic: "🛏️", value: "خانه" }],
        items: [{ pic: "🧦", say: "جوراب", basket: "لباس" }, { pic: "🪑", say: "صندلی", basket: "خانه" }, { pic: "🧥", say: "کاپشن", basket: "لباس" },
          { pic: "🚪", say: "در", basket: "خانه" }, { pic: "🧢", say: "کلاه", basket: "لباس" }, { pic: "🛋️", say: "مبل", basket: "خانه" }] },
      { type: "sort", prompt: "گرم است یا سرد؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. گرم‌ها را پیش آتش بگذار و سردها را پیش برف.",
        baskets: [{ pic: "🔥", value: "گرم" }, { pic: "❄️", value: "سرد" }],
        items: [{ pic: "☕", say: "چای داغ", basket: "گرم" }, { pic: "🧊", say: "یخ", basket: "سرد" }, { pic: "🍲", say: "آش داغ", basket: "گرم" },
          { pic: "🍦", say: "بستنی", basket: "سرد" }, { pic: "☀️", say: "خورشید", basket: "گرم" }, { pic: "⛄", say: "آدم‌برفی", basket: "سرد" }] },
      // Memory: one card says a word (🔊), its partner is the picture.
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر کلمه‌ای که شنیدی را با تصویرش جفت کن.",
        say: "کارت‌ها را برگردان و گوش بده. هر کلمه‌ای که شنیدی را با تصویرش جفت کن.",
        pairs: [[{ pic: "🔊", say: "سیب" }, { pic: "🍎", say: "سیب" }], [{ pic: "🔊", say: "جوراب" }, { pic: "🧦", say: "جوراب" }],
          [{ pic: "🔊", say: "گوسفند" }, { pic: "🐑", say: "گوسفند" }]] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر تصویر را با برعکسش جفت کن.",
        say: "کارت‌ها را برگردان و بشنو. هر تصویر را با برعکسش جفت کن.",
        pairs: [[{ pic: "🐘", say: "فیل بزرگ" }, { pic: "🐭", say: "موش کوچک" }], [{ pic: "🐆", say: "یوزپلنگ تند" }, { pic: "🐌", say: "حلزون آرام" }],
          [{ pic: "🥛", say: "لیوان پر" }, { pic: "🍽️", say: "بشقاب خالی" }]] }
    ]
  },

  // Seed lessons 4–10 are all heard: everything the child needs is said aloud, and pictures carry the words.
  // `say` on a picture is the word it stands for; a tap says it.
  {
    id: "read-seed-4", subject: "read", level: "seed", emoji: "🐭", title: "کلمه‌های هم‌قافیه",
    steps: [
      /* Rhyme: each word is said as two coloured sound bars (the first sound on the right, as Persian is read).
         Words that rhyme end in the same colour, and the two endings light up together. */
      { type: "scene", prompt: "گوش بده: آخر این کلمه‌ها چه صدایی دارد؟", bg: "#fdf3df",
        parts: {
          mouse: { art: "🐭", at: [180, 52], s: 2 }, ear: { art: "👂", at: [42, 52], s: 0.2, o: 0 },
          barM: { art: "read-bar-mouse", at: [102, 57], o: 0 }, barE: { art: "read-bar-ear", at: [42, 57], o: 0 },
          link: { art: "read-link-rhyme", o: 0 }, frame: { art: "read-pair-frame", o: 0 },
          lion: { art: "🦁", at: [100, 72], s: 0.2, o: 0 }, cheese: { art: "🧀", at: [60, 72], s: 0.2, o: 0 },
          barL: { art: "read-bar-lion", at: [100, 75], s: 0.8, o: 0 }, barC: { art: "read-bar-cheese", at: [60, 75], s: 0.8, o: 0 },
          link2: { art: "read-link-rhyme2", o: 0 }, frame2: { art: "read-pair-frame2", o: 0 }
        },
        scenes: [
          { caption: "این موش است.", do: [
            { id: "mouse", path: "M180 52Q160 44 146 52Q132 44 118 52Q110 46 102 52", dur: 1600, ease: "out" }
          ] },
          { caption: "این گوش است.", do: [
            { id: "ear", to: { s: 2, o: 1 }, dur: 900, ease: "back" }
          ] },
          { caption: "موش، گوش! آخرشان یک‌جور صدا می‌دهد.", key: 3400, hold: 6000, do: [
            { id: "barM", to: { o: 1 }, dur: 300 }, { id: "barE", to: { o: 1 }, dur: 300 },
            { id: "barM.start", to: { s: 1.3 }, at: 100, dur: 400, yoyo: true, times: 2 },
            { id: "barM.end", to: { s: 1.3 }, at: 450, dur: 400, yoyo: true, times: 2 },
            { id: "barE.start", to: { s: 1.3 }, at: 800, dur: 400, yoyo: true, times: 2 },
            { id: "barE.end", to: { s: 1.3 }, at: 1150, dur: 400, yoyo: true, times: 2 },
            { id: "barM.end", to: { s: 1.35 }, at: 2600, dur: 2400, yoyo: true, times: 6 },
            { id: "barE.end", to: { s: 1.35 }, at: 2600, dur: 2400, yoyo: true, times: 6 },
            { id: "link", to: { o: 1 }, at: 2600, dur: 100 }, { id: "link", draw: true, at: 2600, dur: 1200 }
          ] },
          { caption: "به این‌ها می‌گوییم کلمه‌های هم‌قافیه.", do: [
            { id: "link", to: { o: 0 }, dur: 300 },
            { id: "mouse", to: { x: 100, y: 30, s: 1.2 }, at: 300, dur: 1000 }, { id: "ear", to: { x: 60, y: 30, s: 1.2 }, at: 300, dur: 1000 },
            { id: "barM", to: { x: 100, y: 33, s: 0.8 }, at: 300, dur: 1000 }, { id: "barE", to: { x: 60, y: 33, s: 0.8 }, at: 300, dur: 1000 },
            { id: "frame", to: { o: 1 }, at: 1400, dur: 100 }, { id: "frame", draw: true, at: 1400, dur: 1400 }
          ] },
          { caption: "شیر، پنیر! این‌ها هم هم‌قافیه‌اند.", key: 3600, hold: 6000, do: [
            { id: "lion", to: { s: 1.2, o: 1 }, dur: 700, ease: "back" }, { id: "cheese", to: { s: 1.2, o: 1 }, at: 500, dur: 700, ease: "back" },
            { id: "barL", to: { o: 1 }, at: 200, dur: 300 }, { id: "barC", to: { o: 1 }, at: 700, dur: 300 },
            { id: "barL.start", to: { s: 1.3 }, at: 300, dur: 400, yoyo: true, times: 2 },
            { id: "barL.end", to: { s: 1.3 }, at: 650, dur: 400, yoyo: true, times: 2 },
            { id: "barC.start", to: { s: 1.3 }, at: 1000, dur: 400, yoyo: true, times: 2 },
            { id: "barC.end", to: { s: 1.3 }, at: 1350, dur: 400, yoyo: true, times: 2 },
            { id: "barL.end", to: { s: 1.35 }, at: 2400, dur: 2400, yoyo: true, times: 6 },
            { id: "barC.end", to: { s: 1.35 }, at: 2400, dur: 2400, yoyo: true, times: 6 },
            { id: "link2", to: { o: 1 }, at: 2400, dur: 100 }, { id: "link2", draw: true, at: 2400, dur: 1000 },
            { id: "frame2", to: { o: 1 }, at: 3600, dur: 100 }, { id: "frame2", draw: true, at: 3600, dur: 1400 }
          ] }
        ] },
      { type: "choose", show: "🐭", prompt: "کدام با «موش» هم‌قافیه است؟", say: "موش. کدام با موش هم‌قافیه است؟ سیب؟ گوش؟ ماه؟", pic: true,
        options: [{ label: "🍎", value: "سیب" }, { label: "👂", value: "گوش" }, { label: "🌙", value: "ماه" }], answer: "گوش" },
      { type: "choose", show: "🌙", prompt: "کدام با «ماه» هم‌قافیه است؟", say: "ماه. کدام با ماه هم‌قافیه است؟ ماهی؟ نان؟ کلاه؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🍞", value: "نان" }, { label: "🧢", value: "کلاه" }], answer: "کلاه" },
      { type: "choose", show: "🐍", prompt: "کدام با «مار» هم‌قافیه است؟", say: "مار. کدام با مار هم‌قافیه است؟ خیار؟ گربه؟ توپ؟", pic: true,
        options: [{ label: "🥒", value: "خیار" }, { label: "🐈", value: "گربه" }, { label: "⚽", value: "توپ" }], answer: "خیار" },
      { type: "choose", show: "🌳", prompt: "کدام با «درخت» هم‌قافیه است؟", say: "درخت. کدام با درخت هم‌قافیه است؟ گل؟ تخت؟ دست؟", pic: true,
        options: [{ label: "🌸", value: "گل" }, { label: "✋", value: "دست" }, { label: "🛏️", value: "تخت" }], answer: "تخت" },
      { type: "choose", show: "🦁", prompt: "کدام با «شیر» هم‌قافیه است؟", say: "شیر. کدام با شیر هم‌قافیه است؟ پنیر؟ موز؟ خرس؟", pic: true,
        options: [{ label: "🍌", value: "موز" }, { label: "🧀", value: "پنیر" }, { label: "🐻", value: "خرس" }], answer: "پنیر" },
      { type: "pairs", prompt: "روی هر تصویر بزن و اسمش را بشنو. دو تصویر هم‌قافیه را با هم جفت کن.",
        pairs: [[{ pic: "🐭", say: "موش" }, { pic: "👂", say: "گوش" }], [{ pic: "🌸", say: "گل" }, { pic: "🌉", say: "پل" }],
          [{ pic: "🍞", say: "نان" }, { pic: "🦷", say: "دندان" }], [{ pic: "🐍", say: "مار" }, { pic: "🥒", say: "خیار" }]] }
    ]
  },
  {
    id: "read-seed-19", subject: "read", level: "seed", emoji: "🐠", title: "شعر قافیه‌دار",
    steps: [
      /* A short poem written for Baghcheh, one line per picture: every pair of lines ends in a rhyme (آب / حباب،
         بازیگوش / گوش، مهربان / نان). Each picture group (p1, p2, p3) shows one pair. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به شعر گوش کن. آخر خط‌ها را خوب بشنو.",
        parts: {
          p1: { art: "read-group" }, water: { art: "read-water", under: "p1" },
          fish: { art: "read-fish-red", under: "p1", at: [136, 44], s: 2.4, flip: true },
          p2: { art: "read-group", o: 0 }, meadow: { art: "read-bg-meadow", under: "p2" },
          rabbit: { art: "read-rabbit", under: "p2", at: [142, 84], s: 2.1, flip: true },
          p3: { art: "read-group", o: 0 }, kitchen: { art: "read-bg-kitchen", under: "p3" },
          saj: { art: "read-saj", under: "p3", at: [72, 84], s: 1.5 }, steam: { art: "read-steam", under: "p3", at: [72, 70], o: 0 },
          gran: { art: "👵", look: { cane: false, key: "poem-gran" }, under: "p3", at: [22, 88] },
          boy: { art: "read-kid", look: { hair: "short", top: "#e5483f" }, under: "p3", at: [122, 88], s: 1.3, flip: true },
          bread: { art: "🫓", under: "p3", at: [72, 74], s: 0.5, o: 0 }
        },
        scenes: [
          { caption: "ماهی قرمز در آب", do: [
            { id: "fish", path: "M136 44C116 34 104 58 84 50S60 40 54 48", dur: 4200, ease: "inout" },
            { id: "fish.tail", to: { r: 28 }, dur: 4200, yoyo: true, times: 12 }
          ] },
          { caption: "بازی می‌کند با حباب.", key: 2600, do: [
            { emit: "bubble", where: [46, 66], spread: [18, 4], rise: -34, n: 14, dur: 4000, life: 2600 },
            { id: "fish", path: "M54 48Q46 36 40 30Q50 40 56 46", at: 800, dur: 2600 },
            { id: "fish", to: { r: -14 }, at: 800, dur: 2600, yoyo: true, times: 4 },
            { id: "fish.tail", to: { r: 28 }, dur: 4200, yoyo: true, times: 12 }
          ] },
          { caption: "خرگوش من بازیگوش", do: [
            { id: "p1", to: { o: 0 }, dur: 700 }, { id: "p2", to: { o: 1 }, dur: 700 },
            { id: "rabbit", path: "M142 84Q134 66 126 84Q118 66 110 84Q102 66 94 84", at: 700, dur: 3000, ease: "linear" }
          ] },
          { caption: "تکان می‌دهد دو گوش.", key: 1350, do: [
            { id: "rabbit.earF", to: { r: -40 }, dur: 3600, yoyo: true, times: 8 },
            { id: "rabbit.earB", to: { r: 34 }, dur: 3600, yoyo: true, times: 8 }
          ] },
          { caption: "مادربزرگ مهربان", do: [
            { id: "p2", to: { o: 0 }, dur: 700 }, { id: "p3", to: { o: 1 }, dur: 700 },
            { id: "gran", walk: [46, 88], at: 800, dur: 2200 }
          ] },
          { caption: "می‌پزد برایم نان.", key: 2900, hold: 6500, do: [
            { id: "gran.armF", to: { r: -70 }, dur: 600 },
            { id: "saj.fire", to: { s: 1.3 }, dur: 2400, yoyo: true, times: 4 },
            { id: "saj.dough", to: { o: 0 }, at: 1000, dur: 1400 }, { id: "saj.bread", to: { o: 1 }, at: 1000, dur: 1400 },
            { id: "steam", to: { o: 1 }, at: 2000, dur: 400 }, { id: "steam", to: { y: "-6" }, at: 2000, dur: 1600 },
            { id: "gran.armF", to: { r: 0 }, at: 2600, dur: 500 },
            { id: "saj.bread", to: { o: 0 }, at: 3300, dur: 1 }, { id: "bread", to: { o: 1 }, at: 3300, dur: 1 }, { id: "steam", to: { o: 0 }, at: 3300, dur: 400 },
            { id: "boy.armF", to: { r: -70 }, at: 3200, dur: 500 },
            { id: "bread", path: "M72 74Q92 60 112 74", at: 3400, dur: 1200 }, { id: "bread", to: { s: 0.7 }, at: 3400, dur: 1200 },
            { id: "boy.eyes", to: { o: 0 }, at: 4600, dur: 200 }, { id: "boy.smile", to: { o: 0 }, at: 4600, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, at: 4600, dur: 200 }
          ] }
        ] },
      { type: "choose", prompt: "«ماهی قرمز در آب، بازی می‌کند با …» با چه؟", pic: true,
        say: "ماهی قرمز در آب، بازی می‌کند با ... با چه؟ کدام با آب هم‌قافیه است؟",
        options: [{ label: "🐈", value: "گربه" }, { label: "🫧", value: "حباب" }, { label: "⭐", value: "ستاره" }], answer: "حباب" },
      { type: "choose", prompt: "«خرگوش من بازیگوش، تکان می‌دهد دو …» دو چه؟", pic: true,
        say: "خرگوش من بازیگوش، تکان می‌دهد دو ... دو چه؟ کدام با بازیگوش هم‌قافیه است؟",
        options: [{ label: "👂", value: "گوش" }, { label: "✋", value: "دست" }, { label: "🦶", value: "پا" }], answer: "گوش" },
      { type: "choose", prompt: "«مادربزرگ مهربان، می‌پزد برایم …» چه می‌پزد؟", pic: true,
        say: "مادربزرگ مهربان، می‌پزد برایم ... چه می‌پزد؟ کدام با مهربان هم‌قافیه است؟",
        options: [{ label: "🍰", value: "کیک" }, { label: "🍲", value: "آش" }, { label: "🫓", value: "نان" }], answer: "نان" },
      { type: "choose", show: "💧", prompt: "کدام با «آب» هم‌قافیه است؟", say: "آب. کدام با آب هم‌قافیه است؟ کتاب؟ ماهی؟ درخت؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "📖", value: "کتاب" }, { label: "🌳", value: "درخت" }], answer: "کتاب" },
      { type: "choose", show: "🐭", prompt: "کدام با «موش» هم‌قافیه است؟", say: "موش. کدام با موش هم‌قافیه است؟ خرگوش؟ گربه؟ ماه؟", pic: true,
        options: [{ label: "🐈", value: "گربه" }, { label: "🌙", value: "ماه" }, { label: "🐇", value: "خرگوش" }], answer: "خرگوش" }
    ]
  },
  {
    id: "read-seed-5", subject: "read", level: "seed", emoji: "👏", title: "دست بزن، بشمار",
    steps: [
      /* Kian says each word in pieces and claps once for every piece: a close-up of his hands, a clap mark for
         every clap, so the number of claps can be counted. The child claps next (step clap). */
      { type: "scene", prompt: "ببین کیان چطور کلمه‌ها را تکه‌تکه می‌گوید", bg: "#fdf3df",
        parts: {
          boy: { art: "👦", at: [140, 88], s: 1.3, flip: true },
          dad: { art: "👨", at: [70, 30], s: 0.6, o: 0 }, ball: { art: "⚽", at: [70, 30], s: 0.6, o: 0 }, fly: { art: "🦋", at: [70, 30], s: 0.6, o: 0 },
          c1: { art: "👏", at: [58, 53], s: 0.3, o: 0 }, c2: { art: "👏", at: [82, 53], s: 0.3, o: 0 }, c3: { art: "👏", at: [92, 53], s: 0.3, o: 0 },
          handL: { art: "hand", at: [57, 90], s: 1.3, r: -12, flip: true }, handR: { art: "hand", at: [83, 90], s: 1.3, r: 12 }
        },
        scenes: [
          { caption: "کیان کلمه‌ها را تکه‌تکه می‌گوید و با هر تکه دست می‌زند.", key: 2770, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2600, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2600, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2770, dur: 100, life: 700 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 3400, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 3400, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 3570, dur: 100, life: 700 }
          ] },
          { caption: "بابا", say: "بابا. با ... با", key: 2500, hold: 3600, do: [
            { id: "dad", to: { o: 1, s: 1.1 }, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1200, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1200, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1370, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1380, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2100, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2100, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2270, dur: 100, life: 700 },
            { id: "c2", to: { o: 1, s: 1.05 }, at: 2280, dur: 250, ease: "back" }
          ] },
          { caption: "دو تکه، دو بار دست.", key: 1080, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1070, dur: 100, life: 700 },
            { id: "c2", to: { s: 1.4 }, at: 1080, dur: 360, yoyo: true, times: 2 }
          ] },
          { caption: "توپ", say: "توپ. توپ", key: 1600, hold: 3000, do: [
            { id: "dad", to: { o: 0, s: 0.6 }, dur: 500, ease: "in" },
            { id: "c1", to: { o: 0, s: 0.3 }, dur: 300 }, { id: "c2", to: { o: 0, s: 0.3 }, dur: 300 },
            { id: "c1", to: { x: 70 }, at: 320, dur: 1 },
            { id: "ball", to: { o: 1, s: 1.4 }, at: 300, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1200, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1200, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1370, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1380, dur: 250, ease: "back" }
          ] },
          { caption: "یک تکه، یک بار دست.", key: 480, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 }
          ] },
          { caption: "پروانه", say: "پروانه. پَر ... وا ... نه", key: 3300, hold: 4200, do: [
            { id: "ball", to: { o: 0, s: 0.6 }, dur: 500, ease: "in" },
            { id: "c1", to: { o: 0, s: 0.3 }, dur: 300 },
            { id: "c1", to: { x: 48 }, at: 320, dur: 1 },
            { id: "c2", to: { x: 70 }, at: 320, dur: 1 },
            { id: "fly", to: { o: 1, s: 1.4 }, at: 300, dur: 500, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1470, dur: 100, life: 700 },
            { id: "c1", to: { o: 1, s: 1.05 }, at: 1480, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2100, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2100, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 2270, dur: 100, life: 700 },
            { id: "c2", to: { o: 1, s: 1.05 }, at: 2280, dur: 250, ease: "back" },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 2900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 2900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 3070, dur: 100, life: 700 },
            { id: "c3", to: { o: 1, s: 1.05 }, at: 3080, dur: 250, ease: "back" }
          ] },
          { caption: "سه تکه، سه بار دست. حالا تو امتحان کن!", key: 1680, do: [
            { id: "handL", to: { x: "+9", r: "+14" }, at: 300, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 300, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 470, dur: 100, life: 700 },
            { id: "c1", to: { s: 1.4 }, at: 480, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 900, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 900, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1070, dur: 100, life: 700 },
            { id: "c2", to: { s: 1.4 }, at: 1080, dur: 360, yoyo: true, times: 2 },
            { id: "handL", to: { x: "+9", r: "+14" }, at: 1500, dur: 360, yoyo: true, times: 2 }, { id: "handR", to: { x: "-9", r: "-14" }, at: 1500, dur: 360, yoyo: true, times: 2 },
            { emit: "spark", where: [70, 62], spread: [12, 6], n: 5, at: 1670, dur: 100, life: 700 },
            { id: "c3", to: { s: 1.4 }, at: 1680, dur: 360, yoyo: true, times: 2 },
            { id: "boy", to: { y: "-4" }, at: 2600, dur: 1200, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "clap", pic: "👨", word: "بابا", parts: ["با", "با"] },
      { type: "clap", pic: "⚽", word: "توپ", parts: ["توپ"] },
      { type: "clap", pic: "🦋", word: "پروانه", parts: ["پَر", "وا", "نه"] },
      { type: "choose", show: "🚗", prompt: "«ماشین» چند تکه دارد؟", say: "ماشین. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "2" },
      { type: "choose", show: "🍎", prompt: "«سیب» چند تکه دارد؟", say: "سیب. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "1" },
      { type: "clap", pic: "🦒", word: "زرافه", parts: ["زَ", "را", "فه"] },
      { type: "choose", show: "🐈", prompt: "«گربه» چند تکه دارد؟", say: "گربه. چند بار دست می‌زنی؟ یک بار؟ دو بار؟ سه بار؟",
        options: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }], answer: "2" }
    ]
  },
  {
    id: "read-seed-20", subject: "read", level: "seed", emoji: "🗨️", title: "چند کلمه شنیدی؟",
    steps: [
      // words: true: one clap for each word of a sentence (not each syllable).
      { type: "clap", words: true, pic: "👧", word: "سارا آمد", parts: ["سارا", "آمد"],
        prompt: "این جمله را بشنو. برای هر کلمه یک بار دست بزن.", say: "سارا آمد." },
      { type: "clap", words: true, pic: "🫓", word: "بابا نان خرید", parts: ["بابا", "نان", "خرید"],
        prompt: "این جمله را بشنو. برای هر کلمه یک بار دست بزن.", say: "بابا نان خرید." },
      { type: "clap", words: true, pic: "🐈", word: "گربه روی فرش خوابید", parts: ["گربه", "روی", "فرش", "خوابید"],
        prompt: "این جمله را بشنو. برای هر کلمه یک بار دست بزن.", say: "گربه روی فرش خوابید." },
      { type: "clap", words: true, pic: "👵", word: "مادربزرگ برای من قصه گفت", parts: ["مادربزرگ", "برای", "من", "قصه", "گفت"],
        prompt: "این جمله را بشنو. برای هر کلمه یک بار دست بزن.", say: "مادربزرگ برای من قصه گفت." },
      { type: "choose", prompt: "چند کلمه شنیدی؟", say: "گوش کن: من سیب دوست دارم. چند کلمه شنیدی؟",
        options: [{ label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }, { label: "👏👏👏👏", value: "4" }], answer: "4" },
      { type: "choose", prompt: "کدام کلمه درازتر است؟", say: "با هر تکه دست بزن: توپ ... هندوانه. کدام کلمه درازتر است؟", pic: true,
        options: [{ label: "⚽", value: "توپ" }, { label: "🍉", value: "هندوانه" }], answer: "هندوانه" },
      // The big animal has the short name: the length of a word is in its claps, not in the thing.
      { type: "choose", prompt: "اسم کدام درازتر است؟ خودش نه، اسمش!",
        say: "حواست باشد: نمی‌پرسیم کدام بزرگ‌تر است. با هر تکه دست بزن: فیل ... پروانه. اسم کدام دست‌های بیشتری دارد؟", pic: true,
        options: [{ label: "🐘", value: "فیل" }, { label: "🦋", value: "پروانه" }], answer: "پروانه" }
    ]
  },
  {
    id: "read-seed-6", subject: "read", level: "seed", emoji: "🐟", title: "با چه صدایی شروع می‌شود؟",
    steps: [
      /* First sounds: each word is said as two sound bars (the first sound on the right, as Persian is read). Words
         that begin alike start with the same colour, and the first sound lights up as it is said. */
      { type: "scene", prompt: "گوش بده: اول هر کلمه چه صدایی دارد؟", bg: "#fdf3df",
        parts: {
          fish: { art: "🐟", at: [124, 58], s: 0.4, o: 0 }, mouse: { art: "🐭", at: [84, 58], s: 0.4, o: 0 }, apple: { art: "🍎", at: [40, 58], s: 0.4, o: 0 },
          barF: { art: "read-bar-m", at: [124, 63], o: 0 }, barMo: { art: "read-bar-m", at: [84, 63], o: 0 }, barA: { art: "read-bar-s", at: [40, 63], o: 0 },
          link: { art: "read-link-start", o: 0 }
        },
        scenes: [
          { caption: "ماهی با صدای «مـ» شروع می‌شود.", say: "ماهی. مـ ... ماهی. ماهی با صدای مـ شروع می‌شود.", key: 1700, do: [
            { id: "fish", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barF", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barF.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barF.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 },
            { id: "fish", to: { r: 8 }, at: 800, dur: 3200, yoyo: true, times: 4 }
          ] },
          { caption: "موش هم با صدای «مـ» شروع می‌شود.", say: "موش. مـ ... موش. موش هم با صدای مـ شروع می‌شود.", key: 1700, do: [
            { id: "mouse", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barMo", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barMo.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barMo.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "سیب با صدای «سـ» شروع می‌شود.", say: "سیب. سـ ... سیب. سیب با صدای سـ شروع می‌شود.", key: 1700, do: [
            { id: "apple", to: { s: 1.8, o: 1 }, dur: 700, ease: "back" }, { id: "barA", to: { o: 1 }, at: 400, dur: 300 },
            { id: "barA.start", to: { s: 1.35 }, at: 1100, dur: 1200, yoyo: true, times: 2 },
            { id: "barA.end", to: { s: 1.2 }, at: 2500, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "ماهی و موش اولشان مثل هم است. سیب نه!", key: 3400, hold: 5000, do: [
            { id: "barF.start", to: { s: 1.35 }, dur: 2400, yoyo: true, times: 6 }, { id: "barMo.start", to: { s: 1.35 }, dur: 2400, yoyo: true, times: 6 },
            { id: "fish", to: { y: "-3" }, dur: 2400, yoyo: true, times: 6 }, { id: "mouse", to: { y: "-3" }, dur: 2400, yoyo: true, times: 6 },
            { id: "link", to: { o: 1 }, dur: 100 }, { id: "link", draw: true, dur: 1200 },
            { id: "apple", to: { o: 0.4, s: 1.4 }, at: 2600, dur: 700 }, { id: "barA", to: { o: 0.4 }, at: 2600, dur: 700 }
          ] }
        ] },
      { type: "choose", show: "🐟", prompt: "کدام هم مثل «ماهی» شروع می‌شود؟", say: "ماهی. کدام هم مثل ماهی شروع می‌شود؟ موش؟ سیب؟ توپ؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🍎", value: "سیب" }, { label: "⚽", value: "توپ" }], answer: "موش" },
      { type: "choose", show: "🍎", prompt: "کدام هم مثل «سیب» شروع می‌شود؟", say: "سیب. کدام هم مثل سیب شروع می‌شود؟ نان؟ گربه؟ سبد؟", pic: true,
        options: [{ label: "🍞", value: "نان" }, { label: "🐈", value: "گربه" }, { label: "🧺", value: "سبد" }], answer: "سبد" },
      { type: "choose", show: "👨", prompt: "کدام هم مثل «بابا» شروع می‌شود؟", say: "بابا. کدام هم مثل بابا شروع می‌شود؟ ماهی؟ باران؟ سیر؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🌧️", value: "باران" }, { label: "🧄", value: "سیر" }], answer: "باران" },
      { type: "sort", prompt: "روی هر تصویر بزن و اسمش را بشنو. مثل «ماهی» شروع می‌شود یا مثل «سیب»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل ماهی شروع می‌شود یا مثل سیب؟",
        baskets: [{ pic: "🐟", value: "م" }, { pic: "🍎", value: "س" }],
        items: [{ pic: "🐭", say: "موش", basket: "م" }, { pic: "🧄", say: "سیر", basket: "س" }, { pic: "🍌", say: "موز", basket: "م" },
          { pic: "⭐", say: "ستاره", basket: "س" }, { pic: "🚗", say: "ماشین", basket: "م" }, { pic: "🧺", say: "سبد", basket: "س" }] },
      { type: "sort", prompt: "مثل «بابا» شروع می‌شود یا مثل «توپ»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل بابا شروع می‌شود یا مثل توپ؟",
        baskets: [{ pic: "👨", value: "ب" }, { pic: "⚽", value: "ت" }],
        items: [{ pic: "🌬️", say: "باد", basket: "ب" }, { pic: "🛏️", say: "تخت", basket: "ت" }, { pic: "🍆", say: "بادمجان", basket: "ب" },
          { pic: "🥚", say: "تخم‌مرغ", basket: "ت" }, { pic: "🐑", say: "بره", basket: "ب" }, { pic: "🍓", say: "توت‌فرنگی", basket: "ت" }] },
      { type: "pairs", prompt: "دو تصویری را جفت کن که اولشان مثل هم است.",
        say: "روی هر تصویر بزن و اسمش را بشنو. دو تصویری را جفت کن که اولشان مثل هم است.",
        pairs: [[{ pic: "🐟", say: "ماهی" }, { pic: "🐭", say: "موش" }], [{ pic: "🍎", say: "سیب" }, { pic: "⭐", say: "ستاره" }],
          [{ pic: "👨", say: "بابا" }, { pic: "🌧️", say: "باران" }], [{ pic: "⚽", say: "توپ" }, { pic: "🛏️", say: "تخت" }]] }
    ]
  },
  {
    id: "read-seed-7", subject: "read", level: "seed", emoji: "👂", title: "قصه گوش کن",
    steps: [
      /* Listening stories: each one shows its events in order, so «اول چه شد؟» can be answered from what was seen.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-street" }, bakery: { art: "read-bakery", at: [38, 60] },
          baker: { art: "🧑‍🍳", at: [85.7, 89], flip: true }, peel: { art: "read-peel", at: [75.8, 70], s: 0.72, r: 39.4 },
          steam1: { art: "read-steam", at: [48, 45], o: 0 },
          boy: { art: "read-kid", look: { hair: "short", top: "#4f8fd6" }, at: [190, 88], s: 1.05, flip: true },
          gran: { art: "👵", look: { key: "nima-gran" }, at: [212, 88], flip: true },
          bread: { art: "🫓", at: [48, 50], s: 0.45, o: 0 }, steam2: { art: "read-steam", at: [115, 68], o: 0 },
          room: { art: "read-bg-room", o: 0 }, sofreh: { art: "read-sofreh", at: [80, 81], o: 0 },
          bread2: { art: "🫓", at: [62, 83], s: 0.7, o: 0 }, cheese: { art: "🧀", at: [78, 84], s: 0.55, o: 0 }, pot: { art: "🫖", at: [94, 83], s: 0.6, o: 0 },
          boy2: { art: "read-kid", look: { hair: "short", top: "#4f8fd6" }, at: [40, 92.4], s: 1.05, o: 0 },
          gran2: { art: "👵", look: { key: "nima-gran", cane: false }, at: [124, 95], flip: true, o: 0 },
          glass: { art: "read-tea-glass", at: [114, 84], s: 1.1, o: 0 }, bite: { art: "read-bite", at: [47, 81], o: 0 }
        },
        scenes: [
          { caption: "صبح است. نیما و مادربزرگ به نانوایی می‌روند.", do: [
            { id: "baker.armF", to: { r: -90 }, dur: 1 }, { id: "baker.armB", to: { r: -80 }, dur: 1 },
            { id: "boy", walk: [122, 88], dur: 2800 }, { id: "gran", walk: [144, 88], at: 200, dur: 2800 }
          ] },
          { caption: "نانوا نان سنگک گرم می‌پزد.", hold: 5200, do: [
            { id: "baker", to: { x: "-8" }, at: 300, dur: 800 }, { id: "peel", to: { x: "-8" }, at: 300, dur: 800 },
            { id: "bakery.fire", to: { s: 1.3 }, at: 1100, dur: 1600, yoyo: true, times: 4 },
            { id: "peel.dough", to: { o: 0 }, at: 1800, dur: 600 }, { id: "peel.bread", to: { o: 1 }, at: 1800, dur: 600 },
            { id: "baker", to: { x: "+8" }, at: 2900, dur: 800 }, { id: "peel", to: { x: "+8" }, at: 2900, dur: 800 },
            { id: "steam1", to: { o: 1 }, at: 3700, dur: 300 }, { id: "steam1", to: { y: "-4" }, at: 3700, dur: 1200 }
          ] },
          { caption: "نیما نان گرم را بغل می‌کند. چه بوی خوبی!", key: 3000, do: [
            { id: "steam1", to: { o: 0 }, dur: 300 },
            { id: "peel.bread", to: { o: 0 }, at: 300, dur: 1 }, { id: "bread", to: { o: 1 }, at: 300, dur: 1 },
            { id: "bread", path: "M48 50Q86 40 115 79", at: 300, dur: 1300 }, { id: "bread", to: { s: 0.6 }, at: 300, dur: 1300 },
            { id: "boy.armF", to: { r: -60 }, at: 1100, dur: 500 }, { id: "boy.armB", to: { r: -50 }, at: 1100, dur: 500 },
            { id: "boy", to: { y: "-2" }, at: 1700, dur: 1600, yoyo: true, times: 4 }, { id: "bread", to: { y: "-2" }, at: 1700, dur: 1600, yoyo: true, times: 4 },
            { id: "steam2", to: { o: 1 }, at: 1700, dur: 300 }, { id: "steam2", to: { y: "-5" }, at: 1700, dur: 1800 },
            { id: "boy.eyes", to: { o: 0 }, at: 1700, dur: 200 }, { id: "boy.smile", to: { o: 0 }, at: 1700, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, at: 1700, dur: 200 }
          ] },
          { caption: "در خانه، همه سر سفره صبحانه نان و پنیر و چای می‌خورند.", key: 2700, hold: 6500, do: [
            { id: "room", to: { o: 1 }, dur: 800 },
            { id: "boy2.legF", to: { r: -90 }, dur: 1 }, { id: "boy2.legB", to: { r: -90 }, dur: 1 },
            { id: "gran2.legF", to: { r: -90 }, dur: 1 }, { id: "gran2.legB", to: { r: -90 }, dur: 1 },
            { id: "sofreh", to: { o: 1 }, at: 600, dur: 500 }, { id: "bread2", to: { o: 1 }, at: 700, dur: 500 }, { id: "cheese", to: { o: 1 }, at: 700, dur: 500 },
            { id: "pot", to: { o: 1 }, at: 700, dur: 500 }, { id: "glass", to: { o: 1 }, at: 700, dur: 500 },
            { id: "boy2", to: { o: 1 }, at: 700, dur: 500 }, { id: "gran2", to: { o: 1 }, at: 700, dur: 500 },
            { id: "boy2.armF", to: { r: -60 }, at: 1400, dur: 500 }, { id: "bite", to: { o: 1 }, at: 1900, dur: 200 },
            { id: "boy2.armF", to: { r: -140 }, at: 2000, dur: 700 }, { id: "bite", path: "M47 81Q44 76 45 71", at: 2000, dur: 700 },
            { id: "bite", to: { o: 0 }, at: 3000, dur: 300 }, { id: "boy2.armF", to: { r: 0 }, at: 3300, dur: 600 },
            { id: "gran2.armF", to: { r: -60 }, at: 1400, dur: 500 },
            { id: "gran2.armF", to: { r: -140 }, at: 2000, dur: 700 }, { id: "glass", path: "M114 84Q114 76 117.6 72.5", at: 2000, dur: 700 },
            { id: "gran2.armF", to: { r: -60 }, at: 3600, dur: 700 }, { id: "glass", path: "M117.6 72.5Q114 76 114 84", at: 3600, dur: 700 },
            { id: "gran2.armF", to: { r: 0 }, at: 4400, dur: 500 }
          ] }
        ],
        question: "نیما و مادربزرگ کجا رفتند؟", pic: true,
        options: [{ label: "🏫", value: "مدرسه" }, { label: "🫓", value: "نانوایی" }, { label: "🌳", value: "پارک" }], answer: "نانوایی" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "👵👦", say: "نیما و مادربزرگ به نانوایی رفتند" }, { pic: "🫓", say: "نانوا نان پخت" }, { pic: "🧀", say: "سر سفره صبحانه خوردند" }] },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-garden" }, rainbow: { art: "read-rainbow", o: 0 }, house: { art: "read-house" },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#f59e0b", hairColor: "#3d2c22" }, at: [143, 66], s: 1.1, flip: true },
          umb: { art: "read-umbrella-red", under: "girl", at: [7.5, -15.9], s: 0.55, r: -20 },
          grey: { art: "read-grey" }, cloud: { art: "read-raincloud" }
        },
        scenes: [
          { caption: "در رشت باران می‌بارد.", key: 2500, do: [
            { id: "girl.armF", to: { r: -100 }, dur: 1 }, { id: "umb.open", to: { o: 0 }, dur: 1 }, { id: "umb.shut", to: { o: 1 }, dur: 1 },
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 70, dur: 4200, life: 1000 },
            { id: "cloud", to: { x: "+3" }, dur: 4200, yoyo: true, times: 2 }
          ] },
          { caption: "ترانه چترش را باز می‌کند و به حیاط می‌رود.", key: 4000, hold: 5200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 80, dur: 4800, life: 1000 },
            { id: "umb.open", to: { sx: 0.15, o: 1 }, at: 300, dur: 1 }, { id: "umb.open", to: { sx: 1 }, at: 320, dur: 900, ease: "back" },
            { id: "umb.shut", to: { o: 0 }, at: 300, dur: 300 },
            { id: "girl", to: { x: 92, y: 88, s: 1.5 }, at: 1500, dur: 2400, ease: "linear" },
            { id: "girl.legF", to: { r: 24 }, at: 1500, dur: 2400, yoyo: true, times: 10 }, { id: "girl.legB", to: { r: -24 }, at: 1500, dur: 2400, yoyo: true, times: 10 }
          ] },
          { caption: "باران بند می‌آید. رنگین‌کمان در آسمان پیدا می‌شود.", hold: 5000, do: [
            { id: "grey", to: { o: 0 }, dur: 1600 }, { id: "cloud", to: { x: -170 }, dur: 2400, ease: "in" },
            { id: "rainbow", to: { o: 1 }, at: 1600, dur: 100 }, { id: "rainbow", draw: true, at: 1600, dur: 2200 }
          ] },
          { caption: "ترانه رنگین‌کمان را نگاه می‌کند و می‌خندد.", key: 2200, do: [
            { id: "girl", to: { r: -8 }, dur: 700 },
            { id: "girl.eyes", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.smile", to: { o: 0 }, at: 900, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, at: 900, dur: 200 },
            { id: "girl", to: { y: "-2" }, at: 1100, dur: 2000, yoyo: true, times: 6 }
          ] }
        ],
        question: "ترانه آخر قصه چه حسی داشت؟", pic: true,
        options: [{ label: "😢", value: "ناراحت" }, { label: "😄", value: "خوشحال" }, { label: "😠", value: "عصبانی" }], answer: "خوشحال" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "🌧️", say: "باران آمد" }, { pic: "☂️", say: "ترانه چترش را باز کرد" }, { pic: "🌈", say: "رنگین‌کمان پیدا شد" }] },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-garden" }, tree: { art: "read-tree-big", at: [40, 84] },
          stuck: { art: "read-kite-stuck", at: [52, 40], s: 0.85, o: 0 },
          wind1: { art: "read-wind", at: [150, 30], o: 0 }, wind2: { art: "read-wind", at: [160, 52], o: 0 },
          grandpa: { art: "👴", look: { cane: false }, at: [196, 88], s: 1.25, flip: true },
          pole: { art: "read-pole", under: "grandpa", at: [0, -7], s: 0.45 },
          kite: { art: "read-kite-line", at: [111.9, 62.5], s: 0.3, r: 40 },
          boy: { art: "read-kid", look: { hair: "short", top: "#5a9a45" }, at: [118, 88], s: 1.25, flip: true },
          heart: { art: "read-heart", at: [96, 46], s: 0.2, o: 0 }
        },
        scenes: [
          { caption: "آرش در باغ بادبادک هوا می‌کند.", key: 3000, do: [
            { id: "boy.armF", to: { r: -140 }, dur: 1 },
            { id: "kite", to: { s: 0.75, r: 0 }, dur: 2200, ease: "out" },
            { id: "kite", to: { r: 5 }, at: 2200, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "باد تند می‌آید. بادبادک روی درخت گیر می‌کند.", key: 1500, do: [
            { id: "wind1", to: { o: 1 }, dur: 300 }, { id: "wind1", to: { x: 10 }, dur: 1800, ease: "linear" }, { id: "wind1", to: { o: 0 }, at: 1500, dur: 300 },
            { id: "wind2", to: { o: 1 }, at: 400, dur: 300 }, { id: "wind2", to: { x: 20 }, at: 400, dur: 1800, ease: "linear" }, { id: "wind2", to: { o: 0 }, at: 1900, dur: 300 },
            { id: "tree", to: { r: -3 }, at: 300, dur: 2000, yoyo: true, times: 4 },
            { id: "kite", to: { r: -47.5, s: 0.89 }, at: 600, dur: 1400, ease: "in" },
            { id: "kite", to: { o: 0 }, at: 2000, dur: 200 }, { id: "stuck", to: { o: 1 }, at: 2000, dur: 200 },
            { id: "boy.armF", to: { r: 0 }, at: 2300, dur: 600 },
            { id: "stuck", to: { r: 8 }, at: 2200, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "آرش ناراحت است. بادبادکش را می‌خواهد.", key: 2600, do: [
            { id: "boy.smile", to: { o: 0 }, dur: 300 }, { id: "boy.sad", to: { o: 1 }, dur: 300 },
            { id: "boy", walk: [108, 88], at: 600, dur: 1200 },
            { id: "boy.armF", to: { r: -160 }, at: 2000, dur: 300 },
            { id: "boy", to: { y: "-6" }, at: 2200, dur: 1600, yoyo: true, times: 4, ease: "out" },
            { id: "boy.armF", to: { r: 0 }, at: 3900, dur: 400 }
          ] },
          { caption: "پدربزرگ با یک چوب بلند بادبادک را پایین می‌آورد.", key: 3500, hold: 6000, do: [
            { id: "grandpa", walk: [92, 88], dur: 2400 },
            { id: "grandpa.armF", to: { r: -150 }, at: 2600, dur: 800 }, { id: "pole", to: { x: 3.8, y: -21.2, r: 66.7 }, at: 2600, dur: 800 },
            { id: "stuck", path: "M52 40Q76 52 98 84", at: 3500, dur: 1200, ease: "in" }, { id: "stuck", to: { r: 120 }, at: 3500, dur: 1200 },
            { id: "grandpa.armF", to: { r: 0 }, at: 4800, dur: 700 }, { id: "pole", to: { x: 0, y: -7, r: 0 }, at: 4800, dur: 700 }
          ] },
          { caption: "آرش خوشحال می‌شود. پدربزرگ را بغل می‌کند و می‌گوید: «مرسی!»", do: [
            { id: "boy.sad", to: { o: 0 }, dur: 200 }, { id: "boy.eyes", to: { o: 0 }, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, dur: 200 },
            { id: "boy.armF", to: { r: -60 }, at: 200, dur: 500 }, { id: "stuck", to: { x: 100, y: 74, r: 0 }, at: 200, dur: 700 },
            { id: "boy", to: { x: 100 }, at: 1100, dur: 900 }, { id: "stuck", to: { x: 92 }, at: 1100, dur: 900 },
            { id: "grandpa", to: { flip: 1 }, at: 900, dur: 300 }, { id: "boy.armB", to: { r: -70 }, at: 1700, dur: 400 },
            { id: "heart", to: { o: 1, s: 1 }, at: 2100, dur: 600, ease: "back" }
          ] }
        ],
        question: "وقتی بادبادک روی درخت گیر کرد، آرش چه حسی داشت؟", pic: true,
        options: [{ label: "😄", value: "خوشحال" }, { label: "😢", value: "ناراحت" }, { label: "😴", value: "خواب‌آلود" }], answer: "ناراحت" },
      { type: "order", prompt: "اول چه شد؟ بعد؟ آخر؟ به ترتیب بچین.", numbered: true,
        say: "اول چه شد؟ بعد چه شد؟ آخر چه شد؟ روی هر تصویر بزن و به ترتیب بچین.",
        items: [{ pic: "🪁", say: "آرش بادبادک هوا کرد" }, { pic: "🌳", say: "بادبادک روی درخت گیر کرد" }, { pic: "👴", say: "پدربزرگ بادبادک را پایین آورد" }] },
      { type: "talk", scene: "👦 👵 🫓 🧀 🫖", caption: "قصه نانوایی را تو برای ما تعریف کن. اول چه شد؟" }
    ]
  },
  {
    id: "read-seed-23", subject: "read", level: "seed", emoji: "🎃", title: "کدو قلقله‌زن",
    steps: [
      /* The folk tale, shortened and gentle: the old woman goes to her daughter's, the wolf lets her pass, and she
         comes home rolling inside a pumpkin. A journey: the world is 400 wide and the camera walks with her (sky at
         depth 0, hills 0.3, the road 1). Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه کدو قلقله‌زن گوش کن",
        parts: {
          sky: { art: "read-bg-sky", depth: 0 }, hills: { art: "read-hills-wide", depth: 0.3 }, road: { art: "read-road-wide" },
          home: { art: "read-cottage", at: [22, 66], s: 1.4 }, home2: { art: "read-cottage", look: { c: "#e8c3d0" }, at: [334, 66], s: 1.4 },
          t1: { art: "read-tree-round", at: [64, 62] }, t2: { art: "read-tree-round", at: [212, 63], s: 1.1 }, t3: { art: "read-tree-round", at: [262, 62] },
          tree: { art: "read-tree-big", at: [156, 72], s: 0.8 },
          wolf: { art: "read-wolf", at: [158, 84], s: 0.95, flip: true, o: 0 },
          daughter: { art: "👩", look: { key: "kodo-daughter" }, at: [334, 84], flip: true, o: 0 },
          pumpkin: { art: "read-pumpkin", at: [272, 70], s: 1.3, o: 0 },
          gran: { art: "read-kid", look: { hair: "auto", kind: "grandma", top: "#b5523b", bottom: "dress", cane: true, key: "kodo-gran" }, at: [40, 84], s: 1.22 }
        },
        scenes: [
          { caption: "پیرزنی می‌خواست به خانه دخترش برود. راه افتاد.", do: [
            { id: "gran", walk: [100, 84], dur: 4400 }, { cam: { x: 104 }, at: 600, dur: 3800 }
          ] },
          { caption: "سر راه، یک گرگ گرسنه جلویش را گرفت.", do: [
            { id: "wolf", to: { o: 1 }, dur: 600 }, { id: "wolf", walk: [126, 84], dur: 2000 },
            { id: "gran.armF", to: { r: -30 }, at: 1800, dur: 400 }, { id: "gran", to: { x: 96 }, at: 1800, dur: 600 }
          ] },
          { caption: "پیرزن گفت: «حالا لاغرم. بگذار بروم خانه دخترم، چاق شوم و برگردم.» گرگ گفت: «باشد!»", hold: 7000, do: [
            { id: "gran.armF", to: { r: -110 }, dur: 700 }, { id: "gran.armF", to: { r: -30 }, at: 3000, dur: 700 },
            { id: "wolf.head", to: { r: 16 }, at: 4200, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "گرگ کنار رفت.", do: [
            { id: "gran.armF", to: { r: 0 }, dur: 400 },
            { id: "wolf", walk: [142, 74], dur: 1800 }, { id: "wolf", to: { s: 0.8 }, dur: 1800 }
          ] },
          { caption: "پیرزن رفت و رفت تا به خانه دخترش رسید.", do: [
            { id: "gran", walk: [300, 84], dur: 7000 }, { cam: { x: 290 }, at: 400, dur: 6600 }
          ] },
          { caption: "دخترش خوشحال شد و او را بغل کرد.", do: [
            { id: "daughter", to: { o: 1 }, dur: 500 }, { id: "daughter", walk: [312, 84], dur: 1800 },
            { id: "gran.armF", to: { r: -80 }, at: 1900, dur: 500 }, { id: "daughter.armF", to: { r: -80 }, at: 1900, dur: 500 },
            { id: "gran", to: { x: 303 }, at: 1900, dur: 500 },
            { id: "gran.eyes", to: { o: 0 }, at: 2400, dur: 200 }, { id: "gran.smile", to: { o: 0 }, at: 2400, dur: 200 }, { id: "gran.laugh", to: { o: 1 }, at: 2400, dur: 200 }
          ] },
          { caption: "برای برگشتن، دخترش او را توی یک کدوی بزرگ گذاشت.", key: 2600, hold: 6000, do: [
            { id: "gran.armF", to: { r: 0 }, dur: 400 }, { id: "daughter.armF", to: { r: -60 }, dur: 400 },
            { id: "pumpkin", to: { o: 1 }, at: 300, dur: 600 }, { id: "pumpkin.lid", to: { r: -110 }, at: 1000, dur: 700 },
            { id: "gran", path: "M303 84Q296 56 274 64", at: 1800, dur: 1600 }, { id: "gran", to: { s: 0.6 }, at: 1800, dur: 1600 },
            { id: "gran", to: { o: 0 }, at: 3000, dur: 400 }, { id: "pumpkin.lid", to: { r: 0 }, at: 3600, dur: 600 },
            { id: "daughter.armF", to: { r: 0 }, at: 3600, dur: 500 }
          ] },
          { caption: "کدو قِل خورد و قِل خورد و راه افتاد.", key: 2600, do: [
            { id: "pumpkin", to: { x: 178, r: -380 }, dur: 5400, ease: "linear" }, { cam: { x: 168 }, dur: 5400, ease: "linear" },
            { id: "daughter.armF", to: { r: -150 }, dur: 600 }, { id: "daughter.armF", to: { r: -120 }, at: 600, dur: 1600, yoyo: true, times: 4 },
            { id: "wolf", to: { flip: 1 }, at: 4000, dur: 300 }
          ] },
          { caption: "گرگ از کدو پرسید: «کدو، پیرزن را ندیدی؟»", do: [
            { id: "wolf.head", to: { r: 18 }, dur: 800 }
          ] },
          { caption: "کدو گفت: «کدو کدو قلقله‌زن، من چه می‌دانم پیرزن!» و قل خورد و رفت.", key: 5600, hold: 7000, do: [
            { id: "wolf.head", to: { r: 0 }, at: 2400, dur: 600 },
            { id: "pumpkin", to: { x: 54, r: -880 }, at: 2400, dur: 4800, ease: "linear" }, { cam: { x: 84 }, at: 2400, dur: 4400, ease: "linear" },
            { id: "wolf", to: { flip: -1 }, at: 4200, dur: 300 }, { id: "wolf.head", to: { r: -12 }, at: 5000, dur: 900, yoyo: true, times: 2 }
          ] },
          { caption: "پیرزن به خانه رسید، از کدو بیرون آمد و خندید.", do: [
            { id: "pumpkin.lid", to: { r: -110 }, dur: 700 },
            { id: "gran", to: { x: 56, y: 64, s: 0.6 }, dur: 1 },
            { id: "gran", to: { o: 1 }, at: 800, dur: 300 }, { id: "gran", path: "M56 64Q70 50 80 84", at: 800, dur: 1400 }, { id: "gran", to: { s: 1.22 }, at: 800, dur: 1400 },
            { id: "gran", to: { y: "-3" }, at: 2600, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "order", prompt: "قصه را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. اول چه شد؟ بعد چه شد؟ آخرش چه شد؟ به ترتیب بچین.",
        items: [{ pic: "👵", say: "پیرزن راه افتاد" }, { pic: "🐺", say: "گرگ جلویش را گرفت" }, { pic: "🏡", say: "به خانه دخترش رسید" },
          { pic: "🎃", say: "توی کدو قل خورد و برگشت" }] },
      { type: "talk", scene: "👵 🐺 🏡 🎃", caption: "حالا قصه کدو قلقله‌زن را تو برای ما تعریف کن.",
        tips: ["بگذارید با تصویرها تعریف کند: «اول… بعد… آخرش…»", "اگر جایی را جا انداخت، بپرسید: «بعدش چه شد؟»",
          "این قصه را شما هم برایش تعریف کنید؛ هر کس آن را کمی متفاوت می‌گوید."] },
      { type: "talk", scene: "👵 🐺 😟 😄", caption: "پیرزن کجای قصه نگران شد؟ آخر قصه چه حسی داشت؟ چرا؟",
        tips: ["بپرسید: «وقتی گرگ را دید چه حسی داشت؟ تو بودی چه می‌کردی؟»", "به حس آخر قصه هم برسید: «وقتی به خانه رسید، خندید. چرا؟»",
          "اگر قصه برایش ترسناک بود، بگویید: «پیرزن زرنگ بود و سالم به خانه رسید.»"] },
      { type: "talk", scene: "🎃 🎵", caption: "با هم بگویید: «کدو کدو قلقله‌زن، من چه می‌دانم پیرزن!»",
        tips: ["با هم چند بار بگویید و با هر تکه دست بزنید.", "بعد بازی کنید: یکی گرگ شود و بپرسد «پیرزن را ندیدی؟» و دیگری کدو شود و جواب بدهد.",
          "کتاب «کدو قلقله‌زن» را اگر دارید، با هم ورق بزنید."] }
    ]
  },
  {
    id: "read-seed-24", subject: "read", level: "seed", emoji: "🦶", title: "اتل متل",
    steps: [
      /* «اتل متل توتوله», the old folk rhyme and finger play (no known author), first lines and the last two only:
         the children sit with their legs stretched out, one word for each leg, and the leg the last word lands on
         is folded. Said as people say it (colloquial). Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به شعر «اتل متل» گوش کن و با آن بگو",
        parts: {
          bg: { art: "read-bg-garden" }, rug: { art: "read-rug", at: [86, 84], s: 0.72 },
          cow: { art: "🐄", at: [-6, 74], s: 1.3, o: 0 }, pail: { art: "read-pail", at: [40, 74], s: 1.3 },
          k1: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#6b3f26", key: "atal-1" }, at: [50, 92.4], s: 1.3 },
          k2: { art: "read-kid", look: { hair: "short", top: "#5b9bd5" }, at: [78, 92.4], s: 1.3 },
          k3: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#f59e0b", hairColor: "#3d2c22", key: "atal-3" }, at: [106, 92.4], s: 1.3 },
          finger: { art: "read-finger", at: [140, 56], s: 2.2, r: 200, o: 0 }
        },
        scenes: [
          { caption: "بچه‌ها روی فرش نشسته‌اند و پاهایشان را دراز کرده‌اند. می‌خواهند «اتل متل» بازی کنند.", hold: 5500, do: [
            { id: "k1.legF", to: { r: -90 }, dur: 1 }, { id: "k1.legB", to: { r: -90 }, dur: 1 },
            { id: "k2.legF", to: { r: -90 }, dur: 1 }, { id: "k2.legB", to: { r: -90 }, dur: 1 },
            { id: "k3.legF", to: { r: -90 }, dur: 1 }, { id: "k3.legB", to: { r: -90 }, dur: 1 },
            { id: "finger", to: { o: 1 }, at: 1600, dur: 500 }, { id: "finger", to: { x: 61, y: 77 }, at: 1600, dur: 1400 }
          ] },
          { caption: "اَتَل مَتَل توتوله", say: "اتل، متل، توتوله", key: 2300, do: [
            { id: "finger", to: { x: 61, y: 77 }, at: 0, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 380, dur: 250 },
            { id: "finger", to: { x: 89, y: 77 }, at: 900, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 1280, dur: 250 },
            { id: "finger", to: { x: 117, y: 77 }, at: 1800, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 2180, dur: 250 }
          ] },
          { caption: "گاو حسن چه جوره؟", key: 2600, do: [
            { id: "cow", to: { o: 1 }, dur: 400 }, { id: "cow", path: "M-6 74Q8 70 26 74", dur: 2000 },
            { id: "finger", to: { x: 61, y: 77 }, at: 300, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 680, dur: 250 },
            { id: "finger", to: { x: 89, y: 77 }, at: 1200, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 1580, dur: 250 },
            { id: "finger", to: { x: 117, y: 77 }, at: 2100, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 2480, dur: 250 }
          ] },
          { caption: "نه شیر داره، نه پستون", key: 1300, do: [
            { id: "cow", to: { r: 10 }, dur: 2600, yoyo: true, times: 6 }, { id: "pail", to: { y: "-1.5" }, at: 300, dur: 900, yoyo: true, times: 2 },
            { id: "finger", to: { x: 61, y: 77 }, at: 0, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 380, dur: 250 },
            { id: "finger", to: { x: 89, y: 77 }, at: 900, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 1280, dur: 250 },
            { id: "finger", to: { x: 117, y: 77 }, at: 1800, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 2180, dur: 250 }
          ] },
          { caption: "شیرشو بردن هندستون", key: 1300, do: [
            { id: "pail", path: "M40 74Q20 60 -14 66", at: 200, dur: 2200, ease: "in" }, { id: "finger", to: { x: 61, y: 77 }, at: 0, dur: 350 },
            { id: "finger", to: { y: 81.4 }, at: 380, dur: 250 }, { id: "finger", to: { x: 89, y: 77 }, at: 900, dur: 350 },
            { id: "finger", to: { y: 81.4 }, at: 1280, dur: 250 }, { id: "finger", to: { x: 117, y: 77 }, at: 1800, dur: 350 },
            { id: "finger", to: { y: 81.4 }, at: 2180, dur: 250 }
          ] },
          { caption: "هاچین و واچین، یه پاتو ورچین!", hold: 7000, do: [
            { id: "k2.legF", to: { r: -140 }, at: 4200, dur: 700, ease: "back" }, { id: "k2.legB", to: { r: -140 }, at: 4200, dur: 700, ease: "back" },
            { id: "finger", to: { y: 70, o: 0 }, at: 4300, dur: 800 }, { id: "k1.eyes", to: { o: 0 }, at: 4800, dur: 200 },
            { id: "k1.smile", to: { o: 0 }, at: 4800, dur: 200 }, { id: "k1.laugh", to: { o: 1 }, at: 4800, dur: 200 },
            { id: "k2.eyes", to: { o: 0 }, at: 4800, dur: 200 }, { id: "k2.smile", to: { o: 0 }, at: 4800, dur: 200 },
            { id: "k2.laugh", to: { o: 1 }, at: 4800, dur: 200 }, { id: "k3.eyes", to: { o: 0 }, at: 4800, dur: 200 },
            { id: "k3.smile", to: { o: 0 }, at: 4800, dur: 200 }, { id: "k3.laugh", to: { o: 1 }, at: 4800, dur: 200 },
            { id: "finger", to: { x: 61, y: 77 }, at: 0, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 380, dur: 250 },
            { id: "finger", to: { x: 89, y: 77 }, at: 800, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 1180, dur: 250 },
            { id: "finger", to: { x: 117, y: 77 }, at: 1600, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 1980, dur: 250 },
            { id: "finger", to: { x: 61, y: 77 }, at: 2400, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 2780, dur: 250 },
            { id: "finger", to: { x: 89, y: 77 }, at: 3200, dur: 350 }, { id: "finger", to: { y: 81.4 }, at: 3580, dur: 250 }
          ] }
        ] },
      { type: "choose", prompt: "«خورشید خانوم آفتاب کن، یه مشت برنج تو … کن.» تو چه؟", pic: true,
        say: "خورشید خانوم آفتاب کن، یه مشت برنج تو ... کن. تو چه؟ کدام با آفتاب هم‌قافیه است؟",
        options: [{ label: "🍞", value: "نان" }, { label: "💧", value: "آب" }, { label: "🔥", value: "آتش" }], answer: "آب" },
      { type: "choose", prompt: "«یک جوجه زرد و ناز، پیدا کرده یک …» یک چه؟", pic: true,
        say: "یک جوجه زرد و ناز، پیدا کرده یک ... یک چه؟ کدام با ناز هم‌قافیه است؟",
        options: [{ label: "🧅", value: "پیاز" }, { label: "🍎", value: "سیب" }, { label: "🌽", value: "ذرت" }], answer: "پیاز" },
      { type: "choose", prompt: "«یک موش کوچک و زرنگ، رفته بالای یک …» یک چه؟", pic: true,
        say: "یک موش کوچک و زرنگ، رفته بالای یک ... یک چه؟ کدام با زرنگ هم‌قافیه است؟",
        options: [{ label: "🌳", value: "درخت" }, { label: "🪑", value: "صندلی" }, { label: "🪨", value: "سنگ" }], answer: "سنگ" },
      { type: "doit", pic: "🦶", text: "با خانواده‌ات «اتل متل» بازی کن: همه پاهایشان را دراز کنند. یک نفر شعر را می‌خواند و با هر کلمه به یک پا دست می‌زند. پایی که شعر رویش تمام شود، جمع می‌شود!",
        list: ["اَتَل مَتَل توتوله", "گاو حسن چه جوره؟", "نه شیر داره، نه پستون", "شیرشو بردن هندستون", "هاچین و واچین، یه پاتو ورچین!"] }
    ]
  },
  {
    id: "read-seed-8", subject: "read", level: "seed", emoji: "📖", title: "کتاب از کجا شروع می‌شود؟",
    steps: [
      /* How a Persian book is read: a finger runs under the words from right to left, line by line, each word lighting
         up as it passes; then the spaces between the words are marked. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین کتاب فارسی را چطور می‌خوانیم", bg: "#f6efe2",
        parts: {
          book: { art: "read-book", at: [0, 8], o: 0 }, ringPic: { art: "read-ring-pic", o: 0 }, ringText: { art: "read-ring-text", o: 0 },
          finger: { art: "read-finger", at: [135.5, 35.5], o: 0 }
        },
        scenes: [
          { caption: "این یک کتاب قصه است. در کتاب، هم تصویر هست و هم نوشته.", hold: 6500, do: [
            { id: "book", to: { y: 0, o: 1 }, dur: 900, ease: "out" },
            { id: "ringPic", to: { o: 1 }, at: 2800, dur: 100 }, { id: "ringPic", draw: true, at: 2800, dur: 1200 },
            { id: "ringText", to: { o: 1 }, at: 4600, dur: 100 }, { id: "ringText", draw: true, at: 4600, dur: 1200 }
          ] },
          { caption: "نوشته‌ها را از سمت راست شروع می‌کنیم.", do: [
            { id: "ringPic", to: { o: 0 }, dur: 400 }, { id: "ringText", to: { o: 0 }, dur: 400 },
            { cam: { x: 114, y: 41, zoom: 2 }, at: 300, dur: 1300 },
            { id: "finger", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "finger", to: { y: "+2" }, at: 2000, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "انگشت از راست به چپ می‌رود.", do: [
            { id: "finger", to: { x: 97 }, dur: 2400, ease: "linear" },
            { id: "book.h1", to: { o: 1 }, at: 150, dur: 250 }, { id: "book.h2", to: { o: 1 }, at: 1250, dur: 250 }, { id: "book.h3", to: { o: 1 }, at: 2250, dur: 250 }
          ] },
          { caption: "خط اول تمام شد. حالا می‌رویم خط پایین.", do: [
            { id: "book.h1", to: { o: 0 }, dur: 400 }, { id: "book.h2", to: { o: 0 }, dur: 400 }, { id: "book.h3", to: { o: 0 }, dur: 400 },
            { id: "finger", path: "M97 35.5Q124 42 139 53.5", at: 500, dur: 1400 },
            { id: "finger", to: { y: "+2" }, at: 2100, dur: 1200, yoyo: true, times: 4 }
          ] },
          { caption: "باز هم از راست به چپ.", do: [
            { id: "finger", to: { x: 89 }, dur: 2600, ease: "linear" },
            { id: "book.h4", to: { o: 1 }, at: 260, dur: 250 }, { id: "book.h5", to: { o: 1 }, at: 1300, dur: 250 }, { id: "book.h6", to: { o: 1 }, at: 2340, dur: 250 }
          ] },
          { caption: "بین کلمه‌ها کمی جای خالی هست. این‌طوری کلمه‌ها را از هم جدا می‌کنیم.", hold: 6000, do: [
            { id: "finger", to: { o: 0 }, dur: 400 },
            { id: "book.h4", to: { o: 0 }, dur: 400 }, { id: "book.h5", to: { o: 0 }, dur: 400 }, { id: "book.h6", to: { o: 0 }, dur: 400 },
            { id: "book.g1", to: { o: 1 }, at: 1200, dur: 300 }, { id: "book.g2", to: { o: 1 }, at: 1700, dur: 300 },
            { id: "book.g3", to: { o: 1 }, at: 2200, dur: 300 }, { id: "book.g4", to: { o: 1 }, at: 2700, dur: 300 },
            { id: "book.w1", to: { s: 1.2 }, at: 3400, dur: 500, yoyo: true, times: 2 }, { id: "book.w2", to: { s: 1.2 }, at: 3700, dur: 500, yoyo: true, times: 2 },
            { id: "book.w3", to: { s: 1.2 }, at: 4000, dur: 500, yoyo: true, times: 2 }, { id: "book.w4", to: { s: 1.2 }, at: 4300, dur: 500, yoyo: true, times: 2 },
            { id: "book.w5", to: { s: 1.2 }, at: 4600, dur: 500, yoyo: true, times: 2 }, { id: "book.w6", to: { s: 1.2 }, at: 4900, dur: 500, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "choose", prompt: "کدام نوشته است؟", say: "یکی نقاشی است و یکی نوشته. کدام نوشته است؟",
        options: [{ label: "🐈", value: "نقاشی" }, { label: "گربه", value: "نوشته" }], answer: "نوشته" },
      { type: "choose", prompt: "کدام نوشته است؟", say: "کدام نوشته است؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🌳", value: "درخت" }, { label: "ماهی", value: "نوشته" }], answer: "نوشته" },
      { type: "choose", prompt: "ستاره جایی است که خواندن شروع می‌شود. کدام درست است؟",
        say: "ستاره جایی است که خواندن شروع می‌شود. در فارسی از کدام طرف شروع می‌کنیم؟ کدام درست است؟", stack: true,
        options: [{ label: "بابا آب داد ⭐", value: "left" }, { label: "⭐ بابا آب داد", value: "right" }], answer: "right" },
      { type: "choose", show: "سارا توپ دارد", prompt: "چند کلمه می‌بینی؟", say: "سارا توپ دارد. بین کلمه‌ها جای خالی هست. چند کلمه می‌بینی؟",
        options: ["۲", "۳", "۴"], answer: "۳" },
      { type: "choose", show: "باران آمد", prompt: "چند کلمه می‌بینی؟", say: "باران آمد. چند کلمه می‌بینی؟",
        options: ["۱", "۲", "۳"], answer: "۲" },
      { type: "choose", show: "مریم گل دارد", prompt: "اولین کلمه کدام است؟", say: "مریم گل دارد. اولین کلمه را پیدا کن. یادت باشد از راست شروع می‌کنیم.",
        options: ["دارد", "گل", "مریم"], answer: "مریم" },
      { type: "talk", scene: "📖 👧 👨", caption: "با هم یک کتاب قصه بخوانید. کتاب از کجا شروع می‌شود؟ انگشتت را زیر نوشته‌ها از راست به چپ ببر." }
    ]
  },
  {
    id: "read-seed-25", subject: "read", level: "seed", emoji: "🪧", title: "نوشته‌ها دور و بر ما",
    steps: [
      { type: "choose", prompt: "روی کدام نوشته هست؟", say: "نوشته‌ها همه‌جا هستند. روی کدام یکی نوشته هست؟ سیب؟ کتاب؟ درخت؟", pic: true,
        options: [{ label: "🍎", value: "سیب" }, { label: "📖", value: "کتاب" }, { label: "🌳", value: "درخت" }], answer: "کتاب" },
      { type: "choose", prompt: "روی کدام نوشته هست؟", say: "روی کدام یکی نوشته هست؟ نامه؟ گربه؟ ابر؟", pic: true,
        options: [{ label: "🐈", value: "گربه" }, { label: "☁️", value: "ابر" }, { label: "✉️", value: "نامه" }], answer: "نامه" },
      // A word the child cannot read yet: they guess what it says from where it is (environmental print).
      { type: "choose", show: "نانوایی", prompt: "این تابلو بالای در یک مغازه است. فکر می‌کنی چه نوشته؟",
        say: "این تابلو بالای در یک مغازه است. از آن مغازه بوی نان تازه می‌آید. فکر می‌کنی روی تابلو چه نوشته؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🫓", value: "نانوایی" }, { label: "🧸", value: "اسباب‌بازی" }], answer: "نانوایی" },
      { type: "choose", show: "داروخانه", prompt: "این تابلو روی مغازه‌ای است که دارو می‌فروشد. فکر می‌کنی چه نوشته؟",
        say: "این تابلو روی مغازه‌ای است که دارو می‌فروشد. وقتی سرما می‌خوریم، از آن‌جا دارو می‌خریم. فکر می‌کنی چه نوشته؟", pic: true,
        options: [{ label: "💊", value: "داروخانه" }, { label: "🍞", value: "نانوایی" }, { label: "⚽", value: "توپ" }], answer: "داروخانه" },
      { type: "choose", show: "مدرسه", prompt: "این را بالای در یک ساختمان بزرگ نوشته‌اند. فکر می‌کنی چه نوشته؟",
        say: "این را بالای در یک ساختمان بزرگ نوشته‌اند. بچه‌ها صبح با کیف و کتاب به آن‌جا می‌روند. فکر می‌کنی چه نوشته؟", pic: true,
        options: [{ label: "🏥", value: "بیمارستان" }, { label: "🌊", value: "دریا" }, { label: "🏫", value: "مدرسه" }], answer: "مدرسه" },
      { type: "doit", pic: "🔍", text: "در خانه سه نوشته پیدا کن. از پدر یا مادرت بپرس چه نوشته.",
        list: ["روی یک بسته یا جعبه خوراکی", "روی یک کتاب یا مجله", "روی یک تابلو در کوچه، یا روی یک قبض یا نامه"] }
    ]
  },
  {
    id: "read-seed-26", subject: "read", level: "seed", emoji: "🪪", title: "اسم من",
    steps: [
      { type: "doit", pic: "🪪", text: "از پدر یا مادرت بخواه اسمت را درشت روی یک کارت بنویسند و برایت بخوانند.",
        list: ["با انگشت از راست به چپ زیر اسمت بکش.", "بگو: «این اسم من است!»"] },
      { type: "doit", pic: "🃏", text: "حالا اسم بقیه را هم روی کارت بنویسند: مامان، بابا، خواهر یا برادر. کارت‌ها را قاطی کنید. اسم خودت را پیدا کن!",
        list: ["به اول اسم‌ها نگاه کن. اسم تو با کدام شکل شروع می‌شود؟", "چند بار بازی کنید."] },
      { type: "choose", prompt: "«سارا» مثل کدام شروع می‌شود؟", pic: true,
        say: "سارا. سـ ... سارا. اسم سارا مثل کدام شروع می‌شود؟ مثل سیب؟ یا مثل ماهی؟",
        options: [{ label: "🐟", value: "ماهی" }, { label: "🍎", value: "سیب" }], answer: "سیب" },
      { type: "choose", prompt: "«مریم» مثل کدام شروع می‌شود؟", pic: true,
        say: "مریم. مـ ... مریم. اسم مریم مثل کدام شروع می‌شود؟ مثل توپ؟ یا مثل ماهی؟",
        options: [{ label: "🐟", value: "ماهی" }, { label: "⚽", value: "توپ" }], answer: "ماهی" },
      { type: "choose", prompt: "«بابک» مثل کدام شروع می‌شود؟", pic: true,
        say: "بابک. بـ ... بابک. اسم بابک مثل کدام شروع می‌شود؟ مثل سیب؟ مثل باران؟ یا مثل ماهی؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🐟", value: "ماهی" }, { label: "🌧️", value: "باران" }], answer: "باران" },
      { type: "talk", scene: "👨 👩 👧 👦 👵", caption: "اسم تو با چه صدایی شروع می‌شود؟ اسم بابا؟ اسم مامان؟",
        tips: ["اسم هر کدام از اعضای خانواده را بکشید و صدای اولش را جدا بگویید: «مـ… مامان».",
          "بپرسید: «اسم چه کسی مثل اسم تو شروع می‌شود؟»", "یک چیز در خانه پیدا کنید که با صدای اول اسم کودک شروع شود."] },
      { type: "doit", pic: "🖍️", text: "کارت اسمت را تزیین کن: دورش گل و ستاره بکش و رنگش کن. بعد آن را به در اتاقت بچسبان.",
        list: ["مواظب باش نوشته‌ها پیدا باشند.", "هر روز اسمت را روی در ببین و بخوان."] }
    ]
  },
  {
    id: "read-seed-9", subject: "read", level: "seed", emoji: "🖍️", title: "خط‌های رنگی",
    steps: [
      { type: "trace", path: "down", prompt: "باران از بالا می‌بارد. از بالا به پایین خط بکش.",
        say: "باران از بالا می‌بارد. اول ببین، بعد با انگشتت از بالا به پایین خط بکش." },
      { type: "trace", path: "across", prompt: "از راست به چپ خط بکش، مثل وقتی فارسی می‌نویسیم.",
        say: "حالا از راست به چپ خط بکش. فارسی را هم از راست به چپ می‌نویسیم." },
      { type: "trace", path: "slant", prompt: "باد می‌آید و باران کج می‌بارد. کج خط بکش.",
        say: "باد می‌آید و باران کج می‌بارد. از بالا شروع کن و کج پایین بیا." },
      { type: "trace", path: "bowl", prompt: "یک کاسه بکش.", say: "یک کاسه بکش. از راست شروع کن، پایین برو و دوباره بالا بیا." },
      { type: "trace", path: "hills", prompt: "از روی تپه‌ها بپر.", say: "خرگوش از روی تپه‌ها می‌پرد. از راست شروع کن و از روی تپه‌ها بپر." },
      { type: "trace", path: "wave", prompt: "موج‌های دریا را بکش.", say: "موج‌های دریا بالا و پایین می‌روند. از راست شروع کن." },
      { type: "trace", path: "zigzag", prompt: "کوه‌ها را بکش.", say: "کوه‌ها را بکش: بالا، پایین، بالا، پایین. از راست شروع کن." },
      { type: "trace", path: "circle", prompt: "یک دایره بکش، مثل خورشید.", say: "یک دایره بکش، گرد مثل خورشید. از بالا شروع کن و دور بزن تا به همان‌جا برسی." },
      { type: "doit", pic: "🖍️", text: "حالا روی کاغذ با مداد رنگی خط بکش.",
        list: ["باران: از بالا به پایین", "راه: از راست به چپ", "موج و کوه", "یک خورشید گرد"] }
    ]
  },
  {
    id: "read-seed-27", subject: "read", level: "seed", emoji: "✏️", title: "مداد را درست بگیر",
    steps: [
      { type: "intro", letter: "✏️", write: "", text: "مداد را با سه انگشت می‌گیریم: شست، انگشت اشاره و انگشت وسط. مداد روی انگشت وسط می‌خوابد و دست شل است.",
        say: "مداد را با سه انگشت می‌گیریم: شست، انگشت اشاره و انگشت وسط. مداد روی انگشت وسط می‌خوابد. دستت را شل نگه دار." },
      { type: "intro", letter: "🪑", write: "", text: "صاف بنشین و پاهایت را روی زمین بگذار. کاغذ جلوی توست؛ با دست دیگرت آن را نگه دار.",
        say: "صاف بنشین و پاهایت را روی زمین بگذار. کاغذ جلوی توست. با دست دیگرت کاغذ را نگه دار تا تکان نخورد." },
      { type: "trace", prompt: "یک مربع بکش.", say: "یک مربع بکش، مثل یک پنجره. از گوشه بالا سمت راست شروع کن.",
        strokes: ["M144 48 L56 48 L56 152 L144 152 L144 48"] },
      { type: "trace", prompt: "یک مثلث بکش، مثل سقف خانه.", say: "یک مثلث بکش، مثل سقف خانه. از نوک بالا شروع کن.",
        strokes: ["M100 36 L36 150 L164 150 L100 36"] },
      { type: "trace", prompt: "یک خانه بکش: اول سقف، بعد دیوارها.", say: "یک خانه بکش. اول سقفش را، بعد دیوارهایش را.",
        strokes: ["M164 92 L100 34 L36 92", "M148 92 L148 170 L52 170 L52 92"] },
      { type: "trace", prompt: "یک حلزون بکش: از وسط شروع کن و دور بزن.", say: "یک حلزون بکش. از وسط شروع کن و دور بزن و دور بزن تا بزرگ شود.",
        strokes: ["M100 100 Q112 100 112 88 Q112 72 96 72 Q76 72 76 94 Q76 124 104 124 Q138 124 138 92 Q138 52 98 52 Q56 52 56 96"] },
      { type: "doit", pic: "✏️", text: "حالا یک مداد بردار و درست بگیر. روی کاغذ یک مربع، یک سقف، یک خانه و یک حلزون بکش.",
        list: ["سه انگشت: شست، اشاره، وسط", "صاف نشسته‌ای؟", "دست دیگرت کاغذ را نگه داشته؟"] }
    ]
  },
  {
    id: "read-seed-28", subject: "read", level: "seed", emoji: "🎨", title: "بکش و بگو",
    steps: [
      { type: "doit", pic: "🖍️", text: "یک چیزی را که امروز یا دیروز اتفاق افتاد نقاشی کن: یک بازی، یک مهمانی، یک گردش.",
        list: ["کاغذ و مداد رنگی بردار.", "هر چه دوست داری بکش. لازم نیست قشنگ باشد!"] },
      { type: "talk", scene: "🖼️ 🧒 👩", caption: "نقاشی‌ات را نشان بده. در نقاشی‌ات چه اتفاقی افتاده؟",
        tips: ["بپرسید: «این کیست؟ کجاست؟ چه کار می‌کند؟»", "به جای «این چیه؟» بگویید: «برایم از نقاشی‌ات تعریف کن.»",
          "از او بپرسید چه جمله‌ای زیر نقاشی بنویسید."] },
      { type: "doit", pic: "📝", text: "حالا جمله‌ات را بگو. پدر یا مادرت همان را زیر نقاشی‌ات می‌نویسند.",
        list: ["دقیقاً همان کلمه‌هایی را بنویسید که کودک می‌گوید.", "درشت و خوانا، از راست به چپ بنویسید تا کودک ببیند."] },
      { type: "talk", scene: "🖼️ 👆 📝", caption: "با هم بخوانید: بزرگ‌ترت می‌خواند و انگشتش را زیر هر کلمه می‌برد. تو هم بخوان!",
        tips: ["آرام بخوانید و انگشتتان را زیر هر کلمه بگذارید.", "بپرسید: «این کلمه کجا شروع شد؟ چند کلمه گفتی؟»",
          "بگذارید جمله را با شما و بعد تنها «بخواند» (از حفظ؛ همین هم خواندن است)."] },
      { type: "doit", pic: "📚", text: "نقاشی‌ات را به دیوار بزن، یا چند نقاشی را روی هم بگذار و یک کتاب کوچک بساز.",
        list: ["برای کتابت اسم بگذار.", "کتابت را برای یک نفر دیگر «بخوان»."] }
    ]
  },
  {
    id: "read-seed-10", subject: "read", level: "seed", emoji: "🎶", title: "بازی صداها",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        say: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        pairs: [[{ pic: "🐭", say: "موش" }, { pic: "👂", say: "گوش" }], [{ pic: "🌳", say: "درخت" }, { pic: "🛏️", say: "تخت" }],
          [{ pic: "🌙", say: "ماه" }, { pic: "🧢", say: "کلاه" }]] },
      { type: "sort", prompt: "هم‌قافیه با «موش» است یا با «پنیر»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. هم‌قافیه با موش است یا با پنیر؟",
        baskets: [{ pic: "🐭", value: "موش" }, { pic: "🧀", value: "پنیر" }],
        items: [{ pic: "👂", say: "گوش", basket: "موش" }, { pic: "🦁", say: "شیر", basket: "پنیر" }, { pic: "🐰", say: "خرگوش", basket: "موش" },
          { pic: "🧄", say: "سیر", basket: "پنیر" }] },
      { type: "sort", prompt: "یک بار دست می‌زنی یا دو بار؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. با هر تکه دست بزن. یک بار دست می‌زنی یا دو بار؟",
        baskets: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }],
        items: [{ pic: "⚽", say: "توپ", basket: "1" }, { pic: "🐟", say: "ماهی", basket: "2" }, { pic: "🍎", say: "سیب", basket: "1" },
          { pic: "🐈", say: "گربه", basket: "2" }, { pic: "🐭", say: "موش", basket: "1" }, { pic: "🚗", say: "ماشین", basket: "2" }] },
      { type: "sort", prompt: "مثل «پنگوئن» شروع می‌شود یا مثل «در»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. مثل پنگوئن شروع می‌شود یا مثل در؟",
        baskets: [{ pic: "🐧", value: "پ" }, { pic: "🚪", value: "د" }],
        items: [{ pic: "🦋", say: "پروانه", basket: "پ" }, { pic: "🦷", say: "دندان", basket: "د" }, { pic: "🧀", say: "پنیر", basket: "پ" },
          { pic: "✋", say: "دست", basket: "د" }, { pic: "🪶", say: "پر", basket: "پ" }, { pic: "🌊", say: "دریا", basket: "د" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. دو تصویری را پیدا کن که اولشان مثل هم است.",
        say: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویری را پیدا کن که اولشان مثل هم است.",
        pairs: [[{ pic: "🍎", say: "سیب" }, { pic: "⭐", say: "ستاره" }], [{ pic: "👨", say: "بابا" }, { pic: "🌧️", say: "باران" }],
          [{ pic: "🐟", say: "ماهی" }, { pic: "🍌", say: "موز" }]] }
    ]
  },
  {
    id: "read-seed-21", subject: "read", level: "seed", emoji: "👁️", title: "صدای آخر",
    steps: [
      { type: "choose", prompt: "کدام با صدای «م» تمام می‌شود؟", pic: true,
        say: "گوش بده: کَلَم. کلـ ... م. آخر کلم صدای «م» است. حالا کدام با صدای م تمام می‌شود؟ سیب؟ چشم؟ توپ؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "👁️", value: "چشم" }, { label: "⚽", value: "توپ" }], answer: "چشم" },
      { type: "choose", prompt: "کدام با صدای «س» تمام می‌شود؟", pic: true,
        say: "گوش بده: خروس. خرو ... س. آخر خروس صدای «س» است. حالا کدام با صدای س تمام می‌شود؟ ماهی؟ ماه؟ لباس؟",
        options: [{ label: "🐟", value: "ماهی" }, { label: "👕", value: "لباس" }, { label: "🌙", value: "ماه" }], answer: "لباس" },
      { type: "choose", prompt: "کدام با صدای «ب» تمام می‌شود؟", pic: true,
        say: "گوش بده: کتاب. کتا ... ب. حالا کدام با صدای ب تمام می‌شود؟ گربه؟ آب؟ درخت؟",
        options: [{ label: "🐈", value: "گربه" }, { label: "🌳", value: "درخت" }, { label: "💧", value: "آب" }], answer: "آب" },
      { type: "choose", prompt: "آخر «دست» مثل آخر کدام است؟", pic: true,
        say: "دست. دسـ ... ت. آخر دست مثل آخر کدام است؟ تخت؟ یا مار؟",
        options: [{ label: "🛏️", value: "تخت" }, { label: "🐍", value: "مار" }], answer: "تخت" },
      { type: "sort", prompt: "آخرش مثل «چشم» است یا مثل «خروس»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. آخرش مثل چشم است یا مثل خروس؟",
        baskets: [{ pic: "👁️", value: "م" }, { pic: "🐓", value: "س" }],
        items: [{ pic: "🥬", say: "کلم", basket: "م" }, { pic: "🚌", say: "اتوبوس", basket: "س" }, { pic: "🖊️", say: "قلم", basket: "م" },
          { pic: "🍒", say: "گیلاس", basket: "س" }, { pic: "🌾", say: "گندم", basket: "م" }, { pic: "👕", say: "لباس", basket: "س" }] },
      { type: "sort", prompt: "آخرش مثل «تخت» است یا مثل «مار»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. آخرش مثل تخت است یا مثل مار؟",
        baskets: [{ pic: "🛏️", value: "ت" }, { pic: "🐍", value: "ر" }],
        items: [{ pic: "✋", say: "دست", basket: "ت" }, { pic: "🦁", say: "شیر", basket: "ر" }, { pic: "🌳", say: "درخت", basket: "ت" },
          { pic: "🥒", say: "خیار", basket: "ر" }, { pic: "🧀", say: "پنیر", basket: "ر" }, { pic: "⏰", say: "ساعت", basket: "ت" }] }
    ]
  },
  {
    id: "read-seed-22", subject: "read", level: "seed", emoji: "🚂", title: "صداها را به هم بچسبان",
    steps: [
      /* Oral blending as a train: each wagon brings one piece of a word, lit while it is said; then the wagons
         couple and the whole word is said, and its picture comes. First two parts (ما ... هی), then three sounds
         (سـ ... یـ ... ب). The engine leads on the right, so the first piece is on the right, as Persian is read.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین قطار صداها چطور کلمه می‌سازد",
        parts: {
          bg: { art: "read-bg-meadow" }, track: { art: "read-track" },
          a1: { art: "read-wagon", look: { c: "#5b9bd5" }, at: [-24, 72], s: 1.2 }, a2: { art: "read-wagon", look: { c: "#5a9a45" }, at: [-24, 72], s: 1.2 },
          b1: { art: "read-wagon", look: { c: "#e46b8a" }, at: [-24, 72], s: 1.2 }, b2: { art: "read-wagon", look: { c: "#f59e0b" }, at: [-24, 72], s: 1.2 },
          b3: { art: "read-wagon", look: { c: "#9b6bd0" }, at: [-24, 72], s: 1.2 },
          engine: { art: "read-engine", at: [-30, 72], s: 1.2 },
          fish: { art: "🐟", at: [86, 50], s: 0.3, o: 0 }, apple: { art: "🍎", at: [71, 50], s: 0.3, o: 0 }
        },
        scenes: [
          { caption: "قطار صداها می‌آید.", do: [
            { id: "engine", to: { x: 136 }, dur: 3200, ease: "out" },
            { id: "engine.wheel1", to: { r: 1800 }, dur: 3200, ease: "out" }, { id: "engine.wheel2", to: { r: 1800 }, dur: 3200, ease: "out" }
          ] },
          { caption: "واگن اول می‌آید: «ما»", say: "واگن اول می‌آید: ما", key: 3000, do: [
            { id: "a1", to: { x: 100 }, dur: 2600, ease: "out" },
            { id: "a1.wheel1", to: { r: 1800 }, dur: 2600, ease: "out" }, { id: "a1.wheel2", to: { r: 1800 }, dur: 2600, ease: "out" },
            { id: "a1.glow", to: { o: 1 }, at: 2600, dur: 300 }
          ] },
          { caption: "واگن دوم می‌آید: «هی»", say: "واگن دوم می‌آید: هی", key: 3000, do: [
            { id: "a1.glow", to: { o: 0 }, dur: 300 },
            { id: "a2", to: { x: 62 }, dur: 2600, ease: "out" },
            { id: "a2.wheel1", to: { r: 1500 }, dur: 2600, ease: "out" }, { id: "a2.wheel2", to: { r: 1500 }, dur: 2600, ease: "out" },
            { id: "a2.glow", to: { o: 1 }, at: 2600, dur: 300 }
          ] },
          { caption: "واگن‌ها به هم می‌چسبند: ماهی!", say: "ما ... هی ... ماهی!", hold: 5000, do: [
            { id: "a2.glow", to: { o: 0 }, dur: 300 },
            { id: "a2", to: { x: 71.2 }, at: 300, dur: 900, ease: "in" },
            { emit: "spark", where: [85.6, 64], spread: [4, 4], n: 6, at: 1200, dur: 100, life: 800 },
            { id: "a1.glow", to: { o: 1 }, at: 1300, dur: 300 }, { id: "a2.glow", to: { o: 1 }, at: 1300, dur: 300 },
            { id: "fish", to: { s: 1.3, o: 1 }, at: 1500, dur: 800, ease: "back" }
          ] },
          { caption: "قطار ماهی می‌رود.", key: 1700, do: [
            { id: "a1.glow", to: { o: 0 }, dur: 300 }, { id: "a2.glow", to: { o: 0 }, dur: 300 },
            { id: "engine", to: { x: 260 }, dur: 2600, ease: "in" }, { id: "a1", to: { x: 224 }, dur: 2600, ease: "in" },
            { id: "a2", to: { x: 195 }, dur: 2600, ease: "in" }, { id: "fish", to: { x: 210 }, dur: 2600, ease: "in" },
            { id: "engine.wheel1", to: { r: 3600 }, dur: 2600, ease: "in" }, { id: "engine.wheel2", to: { r: 3600 }, dur: 2600, ease: "in" }
          ] },
          { caption: "یک قطار دیگر می‌آید.", do: [
            { id: "engine", to: { x: -30 }, dur: 1 },
            { id: "engine", to: { x: 136 }, at: 100, dur: 3200, ease: "out" },
            { id: "engine.wheel1", to: { r: "+1800" }, at: 100, dur: 3200, ease: "out" }, { id: "engine.wheel2", to: { r: "+1800" }, at: 100, dur: 3200, ease: "out" }
          ] },
          { caption: "این بار سه تکه کوچک: «سـ» … «یـ» … «ب»", say: "این بار سه تکه کوچک: سـ ... یـ ... ب", key: 7600, hold: 8000, do: [
            { id: "b1", to: { x: 100 }, dur: 2200, ease: "out" }, { id: "b1.wheel1", to: { r: 1500 }, dur: 2200, ease: "out" },
            { id: "b1.wheel2", to: { r: 1500 }, dur: 2200, ease: "out" }, { id: "b1.glow", to: { o: 1 }, at: 2200, dur: 300 },
            { id: "b1.glow", to: { o: 0 }, at: 3200, dur: 300 },
            { id: "b2", to: { x: 64 }, at: 2600, dur: 2200, ease: "out" }, { id: "b2.wheel1", to: { r: 1300 }, at: 2600, dur: 2200, ease: "out" },
            { id: "b2.wheel2", to: { r: 1300 }, at: 2600, dur: 2200, ease: "out" }, { id: "b2.glow", to: { o: 1 }, at: 4800, dur: 300 },
            { id: "b2.glow", to: { o: 0 }, at: 5800, dur: 300 },
            { id: "b3", to: { x: 28 }, at: 5200, dur: 2200, ease: "out" }, { id: "b3.wheel1", to: { r: 900 }, at: 5200, dur: 2200, ease: "out" },
            { id: "b3.wheel2", to: { r: 900 }, at: 5200, dur: 2200, ease: "out" }, { id: "b3.glow", to: { o: 1 }, at: 7400, dur: 300 }
          ] },
          { caption: "واگن‌ها به هم می‌چسبند: سیب!", say: "سـ ... یـ ... ب ... سیب!", hold: 5000, do: [
            { id: "b3.glow", to: { o: 0 }, dur: 300 },
            { id: "b2", to: { x: 71.2 }, at: 300, dur: 900, ease: "in" }, { id: "b3", to: { x: 42.4 }, at: 300, dur: 1100, ease: "in" },
            { emit: "spark", where: [85.6, 64], spread: [4, 4], n: 5, at: 1200, dur: 100, life: 800 },
            { emit: "spark", where: [56.8, 64], spread: [4, 4], n: 5, at: 1400, dur: 100, life: 800 },
            { id: "b1.glow", to: { o: 1 }, at: 1500, dur: 300 }, { id: "b2.glow", to: { o: 1 }, at: 1500, dur: 300 }, { id: "b3.glow", to: { o: 1 }, at: 1500, dur: 300 },
            { id: "apple", to: { s: 1.3, o: 1 }, at: 1700, dur: 800, ease: "back" }
          ] }
        ] },
      { type: "choose", prompt: "تکه‌ها را بشنو و به هم بچسبان. چه شد؟", say: "گوش بده: مو ... ش. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🐟", value: "ماهی" }, { label: "🐭", value: "موش" }, { label: "🍎", value: "سیب" }], answer: "موش" },
      { type: "choose", prompt: "تکه‌ها را بشنو و به هم بچسبان. چه شد؟", say: "گوش بده: تو ... پ. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🌙", value: "ماه" }, { label: "🐈", value: "گربه" }, { label: "⚽", value: "توپ" }], answer: "توپ" },
      { type: "choose", prompt: "تکه‌ها را بشنو و به هم بچسبان. چه شد؟", say: "گوش بده: گر ... به. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🐈", value: "گربه" }, { label: "🍌", value: "موز" }, { label: "🌳", value: "درخت" }], answer: "گربه" },
      { type: "choose", prompt: "صداها را بشنو و به هم بچسبان. چه شد؟", say: "گوش بده: مـ ... آ ... ه. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🌙", value: "ماه" }, { label: "⚽", value: "توپ" }], answer: "ماه" },
      { type: "choose", prompt: "صداها را بشنو و به هم بچسبان. چه شد؟", say: "گوش بده: دَ ... سْ ... تْ. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🦷", value: "دندان" }, { label: "🚪", value: "در" }, { label: "✋", value: "دست" }], answer: "دست" }
    ]
  },
  {
    id: "read-seed-29", subject: "read", level: "seed", emoji: "🚂", title: "بازی قطار صداها",
    steps: [
      { type: "pairs", prompt: "روی هر بلندگو بزن و تکه‌ها را بشنو. آن‌ها را به هم بچسبان و تصویرش را پیدا کن.",
        say: "روی هر بلندگو بزن و تکه‌ها را بشنو. تکه‌ها را پشت سر هم بگو و تصویرش را پیدا کن.",
        pairs: [[{ pic: "🔊", say: "ما ... هی" }, { pic: "🐟", say: "ماهی" }], [{ pic: "🔊", say: "مو ... ش" }, { pic: "🐭", say: "موش" }],
          [{ pic: "🔊", say: "تو ... پ" }, { pic: "⚽", say: "توپ" }], [{ pic: "🔊", say: "دَ ... سْ ... تْ" }, { pic: "✋", say: "دست" }]] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. تکه‌ها را بشنو و تصویرش را پیدا کن.",
        say: "کارت‌ها را برگردان و گوش بده. تکه‌ها را پشت سر هم بگو و تصویرش را پیدا کن.",
        pairs: [[{ pic: "🔊", say: "گُ ... ل" }, { pic: "🌸", say: "گل" }], [{ pic: "🔊", say: "نا ... ن" }, { pic: "🍞", say: "نان" }],
          [{ pic: "🔊", say: "ما ... ه" }, { pic: "🌙", say: "ماه" }]] },
      { type: "sort", prompt: "اولش مثل «کلاه» است یا مثل «گربه»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. اولش مثل کلاه است یا مثل گربه؟",
        baskets: [{ pic: "🧢", value: "ک" }, { pic: "🐈", value: "گ" }],
        items: [{ pic: "📖", say: "کتاب", basket: "ک" }, { pic: "🌸", say: "گل", basket: "گ" }, { pic: "👟", say: "کفش", basket: "ک" },
          { pic: "🐄", say: "گاو", basket: "گ" }, { pic: "🍰", say: "کیک", basket: "ک" }, { pic: "👂", say: "گوش", basket: "گ" }] },
      { type: "sort", prompt: "آخرش مثل «آب» است یا مثل «گل»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. آخرش مثل آب است یا مثل گل؟",
        baskets: [{ pic: "💧", value: "ب" }, { pic: "🌸", value: "ل" }],
        items: [{ pic: "🍎", say: "سیب", basket: "ب" }, { pic: "🌉", say: "پل", basket: "ل" }, { pic: "📖", say: "کتاب", basket: "ب" },
          { pic: "🐘", say: "فیل", basket: "ل" }, { pic: "🛌", say: "خواب", basket: "ب" }, { pic: "🍯", say: "عسل", basket: "ل" }] },
      { type: "pairs", prompt: "دو تصویری را جفت کن که آخرشان مثل هم است.",
        say: "روی هر تصویر بزن و اسمش را بشنو. دو تصویری را جفت کن که آخرشان مثل هم است.",
        pairs: [[{ pic: "🍎", say: "سیب" }, { pic: "💧", say: "آب" }], [{ pic: "✋", say: "دست" }, { pic: "🌳", say: "درخت" }],
          [{ pic: "🦁", say: "شیر" }, { pic: "🥒", say: "خیار" }]] }
    ]
  },
  {
    id: "read-seed-30", subject: "read", level: "seed", emoji: "🐣", title: "قصه گوش کن ۲",
    steps: [
      /* Three heard stories, each asking something new: why Reza felt sad, what will happen next (the scene stops
         before the egg hatches), and where the lost cat was, then a different ending told aloud.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-room" },
          b1: { art: "read-block", look: { c: "#e5483f" }, at: [76, 30], s: 1.4, o: 0 }, b2: { art: "read-block", look: { c: "#5b9bd5" }, at: [76, 30], s: 1.4, o: 0 },
          b3: { art: "read-block", look: { c: "#fcd34d" }, at: [76, 30], s: 1.4, o: 0 }, b4: { art: "read-block", look: { c: "#5a9a45" }, at: [76, 30], s: 1.4, o: 0 },
          reza: { art: "read-kid", look: { hair: "short", top: "#f59e0b" }, at: [108, 84], s: 1.3, flip: true },
          cat: { art: "🐈", at: [-12, 82], s: 1.1 }
        },
        scenes: [
          { caption: "رضا با مکعب‌ها یک برج بلند ساخت.", hold: 6000, do: [
            { id: "reza.armF", to: { r: -60 }, dur: 400 },
            { id: "b1", to: { o: 1 }, at: 300, dur: 200 }, { id: "b1", to: { y: 80 }, at: 300, dur: 700, ease: "in" },
            { id: "b2", to: { o: 1 }, at: 1300, dur: 200 }, { id: "b2", to: { y: 68.8 }, at: 1300, dur: 700, ease: "in" },
            { id: "b3", to: { o: 1 }, at: 2300, dur: 200 }, { id: "b3", to: { y: 57.6 }, at: 2300, dur: 700, ease: "in" },
            { id: "b4", to: { o: 1 }, at: 3300, dur: 200 }, { id: "b4", to: { y: 46.4 }, at: 3300, dur: 700, ease: "in" },
            { id: "reza.armF", to: { r: 0 }, at: 4200, dur: 400 }
          ] },
          { caption: "گربه آمد و از کنار برج رد شد. بدنش به برج خورد.", do: [
            { id: "cat", to: { x: 66 }, dur: 3000, ease: "linear" }, { id: "cat", to: { y: "-1.5" }, dur: 3000, yoyo: true, times: 8 },
            { id: "b4", to: { r: 8 }, at: 2800, dur: 500, yoyo: true, times: 2 }, { id: "b3", to: { r: -5 }, at: 2800, dur: 500, yoyo: true, times: 2 }
          ] },
          { caption: "برج افتاد!", do: [
            { id: "b4", path: "M76 46.4Q86 36 98 82", dur: 900, ease: "in" }, { id: "b4", to: { r: 200 }, dur: 900 },
            { id: "b3", path: "M76 57.6Q90 56 90 82", at: 100, dur: 800, ease: "in" }, { id: "b3", to: { r: 90 }, at: 100, dur: 800 },
            { id: "b2", path: "M76 68.8Q66 66 60 82", at: 200, dur: 700, ease: "in" }, { id: "b2", to: { r: -90 }, at: 200, dur: 700 },
            { id: "cat", path: "M66 82Q50 56 30 82", at: 300, dur: 900 }
          ] },
          { caption: "رضا ناراحت شد.", do: [
            { id: "reza.smile", to: { o: 0 }, dur: 300 }, { id: "reza.sad", to: { o: 1 }, dur: 300 },
            { id: "reza", to: { y: "+1" }, at: 400, dur: 1200 }
          ] },
          { caption: "ولی بعد، دوباره برجش را ساخت.", hold: 5500, do: [
            { id: "reza.sad", to: { o: 0 }, dur: 300 }, { id: "reza.smile", to: { o: 1 }, dur: 300 }, { id: "reza", to: { y: 84 }, dur: 400 },
            { id: "reza.armF", to: { r: -60 }, at: 300, dur: 400 },
            { id: "b2", to: { x: 76, y: 68.8, r: 0 }, at: 600, dur: 900 }, { id: "b3", to: { x: 76, y: 57.6, r: 0 }, at: 1700, dur: 900 },
            { id: "b4", to: { x: 76, y: 46.4, r: 0 }, at: 2800, dur: 900 }, { id: "reza.armF", to: { r: 0 }, at: 3900, dur: 400 }
          ] }
        ],
        question: "چرا رضا ناراحت شد؟", pic: true,
        options: [{ label: "🍦", value: "بستنی‌اش افتاد" }, { label: "🧱", value: "برجش افتاد" }, { label: "🌧️", value: "باران آمد" }], answer: "برجش افتاد" },
      { type: "scene", prompt: "به قصه گوش کن. بعد بگو فکر می‌کنی چه می‌شود.",
        parts: {
          bg: { art: "read-bg-meadow" }, nest: { art: "read-nest", at: [80, 86], s: 3 },
          e1: { art: "read-egg", at: [70, 80], s: 1.9 }, e3: { art: "read-egg", at: [90, 80], s: 1.9 }, e2: { art: "read-egg", at: [80, 81], s: 2.1 },
          hen: { art: "🐔", at: [80, 84], s: 2 }
        },
        scenes: [
          { caption: "مرغ روی تخم‌هایش نشسته است.", do: [
            { id: "hen", to: { r: 4 }, dur: 3200, yoyo: true, times: 4 }
          ] },
          { caption: "مرغ بلند می‌شود و کنار می‌رود. سه تخم در لانه است.", hold: 5000, do: [
            { id: "hen", path: "M80 84Q100 58 126 86", dur: 1600 }
          ] },
          { caption: "یکی از تخم‌ها تکان می‌خورد.", key: 1300, do: [
            { id: "e2", to: { r: 14 }, dur: 3200, yoyo: true, times: 8 }
          ] },
          { caption: "تَق‌تَق! روی تخم یک ترک پیدا می‌شود.", key: 1800, hold: 4500, do: [
            { id: "e2", to: { r: 10 }, dur: 1200, yoyo: true, times: 4 },
            { id: "e2.crack", to: { o: 1 }, at: 1200, dur: 300 },
            { id: "hen", to: { r: -8 }, at: 1600, dur: 1600, yoyo: true, times: 2 }
          ] }
        ],
        question: "فکر می‌کنی بعدش چه می‌شود؟", pic: true,
        options: [{ label: "🍳", value: "نیمرو می‌شود" }, { label: "⚽", value: "توپ می‌شود" }, { label: "🐥", value: "جوجه بیرون می‌آید" }], answer: "جوجه بیرون می‌آید" },
      { type: "scene", prompt: "به قصه گوش کن",
        parts: {
          bg: { art: "read-bg-room" }, bed: { art: "read-bed", at: [40, 86], s: 1.5 }, sofa: { art: "🛋️", at: [140, 86], s: 1.6 },
          cat: { art: "🐈", at: [96, 94], s: 1.3 }, top: { art: "read-laundry-top", at: [96, 86], s: 1.6 }, basket: { art: "read-laundry", at: [96, 86], s: 1.6 },
          ring: { art: "read-sound", at: [96, 62], s: 0.4, o: 0 },
          ali: { art: "read-kid", look: { hair: "short", top: "#5a9a45" }, at: [176, 86], s: 1.3, flip: true }
        },
        scenes: [
          { caption: "گربه علی گم شده است. علی دنبالش می‌گردد.", do: [
            { id: "ali", walk: [120, 86], dur: 2600 },
            { id: "ali", to: { flip: 1 }, at: 2800, dur: 200 }, { id: "ali", to: { flip: -1 }, at: 3600, dur: 200 }
          ] },
          { caption: "زیر تخت را نگاه می‌کند. گربه آن‌جا نیست.", key: 3400, do: [
            { id: "ali", walk: [72, 86], dur: 2200 },
            { id: "ali", to: { r: -28, y: 88 }, at: 2400, dur: 600 }, { id: "ali", to: { r: 0, y: 86 }, at: 4400, dur: 600 }
          ] },
          { caption: "پشت مبل را نگاه می‌کند. آن‌جا هم نیست.", key: 3600, do: [
            { id: "ali", to: { flip: 1 }, dur: 200 }, { id: "ali", walk: [118, 86], at: 200, dur: 2400 },
            { id: "ali", to: { r: 24 }, at: 2800, dur: 600 }, { id: "ali", to: { r: 0 }, at: 4600, dur: 600 }
          ] },
          { caption: "میو! صدا از سبد لباس‌ها می‌آید.", say: "میو! میو! صدا از سبد لباس‌ها می‌آید.", key: 900, do: [
            { id: "ali", to: { flip: -1 }, dur: 200 },
            { id: "ring", to: { o: 1 }, at: 300, dur: 100 }, { id: "ring", to: { s: 1.6, o: 0 }, at: 300, dur: 1200 },
            { id: "basket", to: { r: 5 }, at: 300, dur: 1600, yoyo: true, times: 4 }, { id: "top", to: { r: 5 }, at: 300, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "گربه توی سبد خوابیده بود! علی خندید.", do: [
            { id: "cat", to: { y: 70 }, dur: 1200, ease: "out" },
            { id: "ali.eyes", to: { o: 0 }, at: 1200, dur: 200 }, { id: "ali.smile", to: { o: 0 }, at: 1200, dur: 200 }, { id: "ali.laugh", to: { o: 1 }, at: 1200, dur: 200 },
            { id: "ali", to: { y: "-2" }, at: 1400, dur: 1600, yoyo: true, times: 4 }
          ] }
        ],
        question: "گربه کجا بود؟", pic: true,
        options: [{ label: "🛏️", value: "زیر تخت" }, { label: "🌳", value: "روی درخت" }, { label: "🧺", value: "توی سبد" }], answer: "توی سبد" },
      { type: "talk", scene: "🐈 🧺 ❓", caption: "این قصه را یک‌جور دیگر تمام کن: اگر گربه توی سبد نبود، کجا بود؟",
        tips: ["هر آخری که می‌گوید درست است؛ فقط بپرسید: «بعدش چه شد؟»", "بپرسید: «علی آن‌جا را چطور پیدا کرد؟ چه حسی داشت؟»",
          "شما هم یک آخر خنده‌دار بگویید تا ببیند قصه را می‌شود عوض کرد."] },
      { type: "talk", scene: "👦 🧱 😢", caption: "چرا رضا ناراحت شد؟ تو کی ناراحت می‌شوی؟ آن وقت چه می‌کنی؟",
        tips: ["کمکش کنید جوابش را با «چون…» بگوید: «چون برجش افتاد.»", "بپرسید: «رضا آخرش چه کار کرد؟» (دوباره ساخت.)",
          "از تجربه خودش بپرسید و حسش را بی‌قضاوت بپذیرید."] }
    ]
  },
  {
    id: "read-seed-31", subject: "read", level: "seed", emoji: "🪲", title: "خاله سوسکه",
    steps: [
      /* The folk tale, shortened and gentle: Khaleh Suskeh dresses up and sets off for Hamadan, meets kind Mr Mouse,
         falls into the pool and is saved with a ladder. (The suitors and the "what would you hit me with" questions
         of the old tale are left out.) Three places (pA home, pB the road, pC the yard with its pool) show one after
         another. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه خاله سوسکه گوش کن",
        parts: {
          pA: { art: "read-group" }, room: { art: "read-bg-room", under: "pA" },
          pB: { art: "read-group", o: 0 }, meadow: { art: "read-bg-meadow", under: "pB" }, tree: { art: "read-tree-round", under: "pB", at: [140, 64], s: 1.2 },
          pC: { art: "read-group", o: 0 }, yard: { art: "read-bg-garden", under: "pC" }, pool: { art: "read-pool", under: "pC" },
          heart: { art: "read-heart", at: [94, 62], s: 0.2, o: 0 },
          ladder: { art: "read-ladder", at: [184, 74], s: 1.3, r: 90, o: 0 },
          mouse: { art: "read-mouse", at: [180, 82], s: 1.5, flip: true, o: 0 },
          beetle: { art: "read-beetle", at: [80, 82], s: 1.7 }
        },
        scenes: [
          { caption: "خاله سوسکه لباس قرمزش را پوشید و کفش‌هایش را پا کرد.", hold: 6000, do: [
            { id: "beetle.dress", to: { o: 1 }, at: 900, dur: 900 }, { id: "beetle.shoes", to: { o: 1 }, at: 2400, dur: 700 },
            { id: "beetle", to: { flip: -1 }, at: 3600, dur: 400 }, { id: "beetle", to: { flip: 1 }, at: 4300, dur: 400 }
          ] },
          { caption: "بعد راه افتاد که برود همدان.", do: [
            { id: "pA", to: { o: 0 }, dur: 700 }, { id: "pB", to: { o: 1 }, dur: 700 }, { id: "beetle", to: { x: 22 }, at: 300, dur: 1 },
            { id: "beetle", walk: [78, 82], at: 800, dur: 3600 }
          ] },
          { caption: "سر راه، آقا موشه را دید. آقا موشه سلام کرد.", do: [
            { id: "mouse", to: { o: 1 }, dur: 300 }, { id: "mouse", walk: [118, 82], dur: 2400 },
            { id: "mouse", to: { r: -16 }, at: 2700, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "آقا موشه مهربان بود. با هم دوست شدند و عروسی گرفتند.", hold: 5500, do: [
            { id: "mouse", walk: [108, 82], dur: 900 },
            { id: "heart", to: { o: 1, s: 1 }, at: 1000, dur: 700, ease: "back" },
            { emit: "spark", where: [106, 40], spread: [70, 20], rise: 18, n: 24, at: 1600, dur: 2400, life: 1600 }
          ] },
          { caption: "یک روز، خاله سوسکه کنار حوض بازی می‌کرد و توی آب افتاد.", key: 4400, do: [
            { id: "heart", to: { o: 0 }, dur: 300 }, { id: "mouse", to: { o: 0 }, dur: 300 },
            { id: "pB", to: { o: 0 }, dur: 700 }, { id: "pC", to: { o: 1 }, dur: 700 },
            { id: "beetle", to: { x: 128, y: 82 }, at: 300, dur: 1 },
            { id: "beetle", walk: [104, 68], at: 900, dur: 2000 },
            { id: "beetle", path: "M104 68Q96 58 72 76", at: 3100, dur: 900, ease: "in" }, { id: "beetle", to: { r: -30 }, at: 3100, dur: 900 },
            { emit: "drop", where: [72, 72], spread: [16, 4], rise: -10, n: 14, at: 3900, dur: 400, life: 900 },
            { id: "beetle", to: { y: "-1.5" }, at: 4100, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "آقا موشه دوید و با یک نردبان آمد.", do: [
            { id: "mouse", to: { x: 180, y: 82, o: 1 }, dur: 1 }, { id: "ladder", to: { o: 1 }, dur: 1 },
            { id: "mouse", walk: [130, 82], at: 200, dur: 2000 }, { id: "ladder", to: { x: 134 }, at: 200, dur: 2000, ease: "linear" }
          ] },
          { caption: "نردبان را توی حوض گذاشت. خاله سوسکه از نردبان بالا آمد.", key: 3600, hold: 6000, do: [
            { id: "ladder", to: { x: 92, y: 80, r: -38 }, dur: 1400 }, { id: "mouse", walk: [134, 82], dur: 1200 },
            { id: "beetle", to: { r: 0 }, at: 1500, dur: 400 },
            { id: "beetle", path: "M72 76Q80 74 84 70Q90 60 98 58Q104 66 106 82", at: 1900, dur: 3200 }
          ] },
          { caption: "خاله سوسکه گفت: «مرسی، آقا موشه!» و هر دو خندیدند.", do: [
            { id: "heart", to: { x: 120, y: 62, s: 0.2 }, dur: 1 }, { id: "heart", to: { o: 1, s: 1 }, at: 200, dur: 700, ease: "back" },
            { id: "beetle", to: { y: "-3" }, at: 900, dur: 1400, yoyo: true, times: 4 }, { id: "mouse", to: { y: "-3" }, at: 1100, dur: 1400, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "order", prompt: "قصه را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. اول چه شد؟ بعد چه شد؟ آخرش چه شد؟ به ترتیب بچین.",
        items: [{ pic: "🪲", say: "خاله سوسکه لباس پوشید و راه افتاد" }, { pic: "🐭", say: "آقا موشه را دید" },
          { pic: "💧", say: "توی حوض افتاد" }, { pic: "🪜", say: "آقا موشه با نردبان او را بیرون آورد" }] },
      { type: "talk", scene: "🪲 🐭 💧 🪜", caption: "حالا قصه خاله سوسکه را تو برای ما تعریف کن.",
        tips: ["بگذارید با تصویرها تعریف کند: «اول… بعد… آخرش…»", "اگر جایی را جا انداخت، بپرسید: «بعدش چه شد؟»",
          "اگر قصه کامل خاله سوسکه را می‌دانید، تکه‌های دیگرش را هم برایش بگویید."] },
      { type: "talk", scene: "🪲 😟 🐭 😄", caption: "وقتی خاله سوسکه توی آب افتاد چه حسی داشت؟ آقا موشه چه کار خوبی کرد؟",
        tips: ["بپرسید: «چرا آقا موشه نردبان آورد؟»", "بپرسید: «اگر دوستت توی دردسر بیفتد، تو چه کار می‌کنی؟»",
          "یادآوری کنید: «کنار آب، همیشه با یک بزرگ‌تر بازی می‌کنیم.»"] },
      { type: "talk", scene: "🪲 👗 👠", caption: "اگر تو هم می‌خواستی به سفر بروی، چه می‌پوشیدی؟ کجا می‌رفتی؟",
        tips: ["بگذارید خیال‌پردازی کند و جمله‌هایش را کامل‌تر برگردانید.", "بپرسید: «سر راه چه کسی را می‌دیدی؟ به او چه می‌گفتی؟»",
          "یک قصه کوچک تازه با هم بسازید: «یک روز خاله سوسکه رفت…»"] }
    ]
  },
  {
    id: "read-seed-32", subject: "read", level: "seed", emoji: "🖼️", title: "قصه را تو بگو",
    steps: [
      // Stories told only in pictures: the child works out the order, then tells it in words.
      { type: "order", prompt: "این قصه کلمه ندارد. تصویرها را به ترتیب بچین.", numbered: true,
        say: "این قصه کلمه ندارد. به تصویرها نگاه کن. اول چه شد؟ بعد؟ آخرش؟ به ترتیب بچین.",
        items: ["❄️", "⛄", "☀️", "💧"] },
      { type: "talk", scene: "❄️ ⛄ ☀️ 💧", caption: "حالا قصه آدم‌برفی را تو تعریف کن. اول چه شد؟",
        tips: ["بگذارید خودش قصه را بگوید؛ شما فقط بپرسید: «بعدش چه شد؟»", "اگر گیر کرد، به تصویر بعدی اشاره کنید.",
          "بپرسید: «آدم‌برفی آخرش چه شد؟ چرا؟»", "جمله‌هایش را کامل‌تر برگردانید و بگذارید دوباره بگوید."] },
      { type: "order", prompt: "این قصه را هم به ترتیب بچین.", numbered: true,
        say: "به تصویرها نگاه کن. اول چه شد؟ بعد؟ آخرش؟ به ترتیب بچین.",
        items: ["🥚", "🍳", "😋", "🍽️"] },
      { type: "talk", scene: "🥚 🍳 😋 🍽️", caption: "این قصه را تو بگو. چه کسی تخم‌مرغ را پخت؟ اسمش را خودت بگذار!",
        tips: ["بپرسید: «اسم این بچه را چه بگذاریم؟ صبحانه بود یا شام؟»", "کمکش کنید با «اول»، «بعد» و «آخرش» تعریف کند.",
          "بپرسید: «بعدش چه شد؟» تا قصه به آخر برسد."] },
      { type: "order", prompt: "این قصه را هم به ترتیب بچین.", numbered: true,
        say: "به تصویرها نگاه کن. اول چه شد؟ بعد؟ آخرش؟ به ترتیب بچین.",
        items: ["🥕", "🔪", "🍲", "🥣"] },
      { type: "talk", scene: "🥕 🔪 🍲 🥣", caption: "حالا این قصه را تو بگو. بعد یک قصه تازه بساز!",
        tips: ["قصه آش را با هم بگویید: «اول هویج‌ها را… بعد… آخرش…»", "بعد سه چیز در خانه پیدا کنید (مثلاً یک عروسک، یک کاسه، یک کلید) و بخواهید با آن‌ها قصه‌ای بسازد.",
          "مدام بپرسید «بعدش چه شد؟» و قصه را کامل‌تر برگردانید."] }
    ]
  },
  {
    id: "read-seed-33", subject: "read", level: "seed", emoji: "🍳", title: "با هم ببینیم و بگوییم: آشپزخانه",
    steps: [
      { type: "talk", scene: "🍳 🫖 🍞 🧀 👩 👧", caption: "صبح در آشپزخانه. این‌ها چیست؟ مامان چه کار می‌کند؟",
        tips: ["از کودک بخواهید اسم هر چیزی را که می‌بیند بگوید.", "یک کلمه تازه اضافه کنید: «این ماهیتابه است. تخم‌مرغ را در ماهیتابه می‌پزیم.»",
          "بپرسید: «تو صبحانه چه دوست داری؟»"] },
      { type: "talk", scene: "🥒 🍅 🧅 🥕 👨 🔪", caption: "بابا سالاد درست می‌کند. چه چیزهایی لازم دارد؟",
        tips: ["بپرسید: «خیار چه رنگی است؟ گوجه چه شکلی است؟ کدام ترش است؟»", "با هم وصف کنید: سبز و دراز، قرمز و گرد.",
          "بگویید: «کارد تیز است. فقط بزرگ‌ترها با کارد کار می‌کنند. تو چه کمکی می‌توانی بکنی؟»"] },
      { type: "talk", scene: "🍲 🍚 🥄 👵 👦 👧 👨", caption: "سر سفره شام. همه دور هم. چه غذایی می‌خورند؟",
        tips: ["بپرسید: «چه کسی کنار مادربزرگ نشسته؟ چه کسی برنج می‌کشد؟»", "یک «چرا» بپرسید: «چرا همه دور هم نشسته‌اند؟»",
          "از غذای خودتان بپرسید: «دیشب شام چه خوردیم؟»"] },
      { type: "talk", scene: "🍉 🍇 🍊 🍽️", caption: "بعد از غذا، میوه. هر میوه چه رنگی و چه مزه‌ای دارد؟",
        tips: ["با کلمه‌های وصفی بازی کنید: شیرین، ترش، آبدار، گرد، کوچک، بزرگ.", "بپرسید: «کدام از همه بزرگ‌تر است؟ کدام دانه دارد؟»",
          "میوه واقعی بیاورید، بو کنید، بچشید و درباره‌اش حرف بزنید."] },
      { type: "talk", scene: "🧽 🍽️ 🚰 👦 👩", caption: "بعد از شام، ظرف‌ها را می‌شوییم. چرا ظرف‌ها را می‌شوییم؟",
        tips: ["بگذارید دلیل بیاورد: «چون…»", "جوابش را کامل کنید: «چون ظرف‌های کثیف بو می‌گیرند و فردا ظرف تمیز لازم داریم.»",
          "از او بپرسید در آشپزخانه چه کمکی می‌تواند بکند و همان را به او بسپارید."] }
    ]
  },
  {
    id: "read-seed-34", subject: "read", level: "seed", emoji: "🌱", title: "کتاب علمی گوش کن",
    steps: [
      /* Information read aloud, like a picture book about nature: how a seed becomes a plant (the ground is shown
         cut open, so the roots can be seen), then where animals live (a walk past a tree, a hive, a burrow and a
         pond). Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "گوش کن: دانه چطور گیاه می‌شود؟",
        parts: {
          soil: { art: "read-soil" }, sun: { art: "read-sun", at: [24, 16], s: 1.3 },
          hand: { art: "hand", at: [80, 4], s: 0.7, r: 180, o: 0 }, bean: { art: "read-bean", at: [80, 22], s: 1.6, o: 0 },
          cover: { art: "read-hole-cover", o: 0 }, roots: { art: "read-roots", o: 0 },
          plant: { art: "read-plant", at: [80, 50], s: 1.9, sy: 0.01, o: 0 },
          can: { art: "read-can", at: [106, 24], s: 1.8, o: 0 }
        },
        scenes: [
          { caption: "دانه را در خاک می‌کاریم.", key: 2400, hold: 5000, do: [
            { id: "plant.leaf3", to: { s: 0 }, dur: 1 }, { id: "plant.leaf4", to: { s: 0 }, dur: 1 },
            { id: "hand", to: { o: 1, y: 14 }, dur: 900 }, { id: "bean", to: { o: 1 }, dur: 900 }, { id: "bean", to: { y: 32 }, dur: 900 },
            { id: "bean", path: "M80 32L80 62", at: 1300, dur: 1400, ease: "in" },
            { id: "cover", to: { o: 1 }, at: 2900, dur: 600 }, { id: "hand", to: { o: 0, y: 4 }, at: 3000, dur: 800 }
          ] },
          { caption: "به آن آب می‌دهیم.", key: 2400, do: [
            { id: "can", to: { o: 1 }, dur: 500 }, { id: "can", to: { r: 35 }, at: 500, dur: 600 },
            { emit: "drop", where: [86, 40], spread: [10, 3], rise: 9, n: 26, at: 900, dur: 2600, life: 800 },
            { id: "can", to: { r: 0, o: 0 }, at: 3700, dur: 700 }
          ] },
          { caption: "دانه زیر خاک ریشه می‌دهد.", do: [
            { id: "roots", to: { o: 1 }, dur: 100 }, { id: "roots", draw: true, dur: 2600 }
          ] },
          { caption: "یک جوانه از خاک بیرون می‌آید.", do: [
            { id: "plant", to: { o: 1 }, dur: 200 }, { id: "plant", to: { sy: 0.55 }, dur: 2600, ease: "out" }
          ] },
          { caption: "خورشید می‌تابد. گیاه بزرگ‌تر می‌شود و برگ‌های تازه درمی‌آورد.", hold: 6000, do: [
            { id: "sun", to: { s: 1.6 }, dur: 1600, yoyo: true, times: 2 },
            { id: "plant", to: { sy: 1 }, at: 1200, dur: 2400, ease: "out" },
            { id: "plant.leaf3", to: { s: 1 }, at: 2400, dur: 1400, ease: "back" }, { id: "plant.leaf4", to: { s: 1 }, at: 2800, dur: 1400, ease: "back" }
          ] }
        ],
        question: "دانه برای سبز شدن به چه چیزی نیاز داشت؟", pic: true,
        options: [{ label: "🍬", value: "آبنبات" }, { label: "💧", value: "آب" }, { label: "🧸", value: "عروسک" }], answer: "آب" },
      { type: "talk", scene: "🌰 💧 🌱 ☀️", caption: "از قصه دانه چه یاد گرفتی؟ یک چیز را بگو.",
        tips: ["بپرسید: «اول چه شد؟ ریشه کجا رفت؟ جوانه کجا رفت؟»", "با هم یک دانه لوبیا یا عدس را روی پنبه خیس بکارید و هر روز ببینید چه می‌شود.",
          "کلمه‌های تازه را چند بار به کار ببرید: دانه، ریشه، جوانه، برگ."] },
      { type: "scene", prompt: "گوش کن: هر حیوانی کجا زندگی می‌کند؟",
        parts: {
          sky: { art: "read-bg-sky", depth: 0 }, hills: { art: "read-hills-wide", depth: 0.3 }, ground: { art: "read-road-wide" },
          tree: { art: "read-tree-big", at: [56, 86], s: 1.1 }, nest: { art: "read-nest", at: [66, 48], s: 0.9, o: 0 },
          bird: { art: "🐦", at: [150, 16], s: 0.7 }, twig: { art: "read-twig", under: "bird", at: [-8, -11], s: 2 },
          hive: { art: "read-hive", at: [176, 84], s: 1.4 },
          bee1: { art: "🐝", at: [230, 30], s: 0.4 }, bee2: { art: "🐝", at: [244, 44], s: 0.4 },
          burrow: { art: "read-burrow" }, rabbit: { art: "read-rabbit", at: [266, 57], s: 1, flip: true },
          pond: { art: "read-pond" }, fish: { art: "🐟", at: [392, 76], s: 0.5 }
        },
        scenes: [
          { caption: "هر حیوانی خانه‌ای دارد. پرنده روی درخت لانه می‌سازد.", hold: 6000, do: [
            { id: "bird", path: "M150 16Q110 4 72 40", dur: 2600 },
            { id: "nest", to: { o: 1 }, at: 2600, dur: 1000 }, { id: "twig", to: { o: 0 }, at: 2600, dur: 400 },
            { id: "bird", to: { y: 46 }, at: 3800, dur: 700 }
          ] },
          { caption: "زنبورها در کندو زندگی می‌کنند.", key: 3300, do: [
            { cam: { x: 210 }, dur: 2000 },
            { id: "bee1", path: "M230 30Q200 40 186 61", at: 1600, dur: 1800 }, { id: "bee1", to: { s: 0.15, o: 0 }, at: 3200, dur: 300 },
            { id: "bee2", path: "M244 44Q220 70 180 62", at: 2000, dur: 1800 }, { id: "bee2", to: { s: 0.15, o: 0 }, at: 3600, dur: 300 }
          ] },
          { caption: "خرگوش زیر زمین، در لانه‌اش زندگی می‌کند.", key: 4600, do: [
            { cam: { x: 240 }, dur: 1200 },
            { id: "rabbit", path: "M266 57Q252 44 240 57Q236 50 230 58", at: 1200, dur: 1800 },
            { id: "rabbit", to: { o: 0 }, at: 3000, dur: 300 },
            { id: "rabbit", to: { x: 252, y: 86 }, at: 3400, dur: 1 }, { id: "rabbit", to: { o: 1 }, at: 3500, dur: 500 }
          ] },
          { caption: "ماهی در آب زندگی می‌کند.", key: 4600, do: [
            { cam: { x: 400 }, dur: 2600 },
            { id: "fish", to: { x: 410 }, at: 2600, dur: 2400, yoyo: true, times: 2 }
          ] }
        ],
        question: "خرگوش کجا زندگی می‌کند؟", pic: true,
        options: [{ label: "🌳", value: "روی درخت" }, { label: "🌊", value: "توی آب" }, { label: "🕳️", value: "زیر زمین" }], answer: "زیر زمین" },
      { type: "talk", scene: "🐦 🐝 🐇 🐟", caption: "خانه هر حیوان را بگو: پرنده؟ زنبور؟ خرگوش؟ ماهی؟",
        tips: ["بپرسید: «پرنده لانه‌اش را با چه ساخت؟» (با شاخه‌های کوچک.)", "از حیوان‌های دیگر هم بپرسید: «مورچه کجا زندگی می‌کند؟ گربه چطور؟»",
          "اگر کتاب یا تصویری از حیوان‌ها دارید، با هم نگاه کنید."] },
      { type: "talk", scene: "📖 💡", caption: "امروز یک چیز تازه یاد گرفتی. به کسی بگو چه یاد گرفتی!",
        tips: ["بگذارید یاد گرفته‌اش را برای یک نفر دیگر (پدربزرگ، خواهر، برادر) تعریف کند.",
          "بپرسید: «دوست داری درباره چه حیوانی بیشتر بدانی؟» و یک کتاب یا عکس پیدا کنید.", "در گردش‌ها لانه‌ها را با هم پیدا کنید: لانه مورچه، لانه پرنده."] }
    ]
  },
  {
    id: "read-seed-35", subject: "read", level: "seed", emoji: "〰️", title: "کاسه، دندانه، حلقه",
    steps: [
      // Shapes that letters are made of, on the same 200 × 200 grid as js/strokes.js (no baseline): each is first
      // shown being drawn, then traced. Everything that runs sideways starts on the right.
      { type: "trace", prompt: "یک کاسه پهن بکش.", say: "یک کاسه پهن بکش. از راست شروع کن، پایین بیا، به چپ برو و کمی بالا بیا.",
        strokes: ["M164 82 Q166 132 134 132 L72 132 Q40 132 38 100"] },
      { type: "trace", prompt: "دندانه‌ها را بکش.", say: "دندانه‌ها را بکش، مثل دندان‌های یک شانه. از راست شروع کن: پایین، بالا، پایین، بالا.",
        strokes: ["M178 96 Q179 128 162 128 Q148 128 148 104 Q149 128 132 128 Q118 128 118 104 Q119 128 102 128 Q88 128 88 104 Q89 128 72 128 L30 128"] },
      { type: "trace", prompt: "یک حلقه بکش و دمش را پایین بیاور.", say: "یک حلقه کوچک بکش، دورش بزن، بعد دمش را پایین بیاور.",
        strokes: ["M106 112 Q82 112 84 90 Q88 70 108 72 Q126 76 124 98 Q122 140 78 156"] },
      { type: "trace", prompt: "یک خط بکش. بعد یک نقطه بالا و یک نقطه پایین بگذار.",
        say: "از راست به چپ یک خط بکش. بعد یک نقطه بالای خط بگذار و یک نقطه پایینش.",
        strokes: ["M168 112 L32 112", [100, 76], [100, 148]] },
      { type: "trace", prompt: "یک خط بلند از بالا به پایین بکش.", say: "یک خط بلند و صاف بکش. از بالا شروع کن و یک‌راست پایین بیا.",
        strokes: ["M100 30 Q98 100 98 170"] },
      { type: "doit", pic: "✏️", text: "حالا روی کاغذ، با مداد، این شکل‌ها را بکش.",
        list: ["یک ردیف کاسه", "یک ردیف دندانه", "سه حلقه با دم", "یک خط با نقطه‌ای بالا و نقطه‌ای پایین", "سه خط بلند از بالا به پایین"] }
    ]
  },
  {
    id: "read-seed-37", subject: "read", level: "seed", emoji: "🔤", title: "حرف اول اسم من",
    steps: [
      { type: "doit", pic: "🪪", text: "از پدر یا مادرت بخواه اسمت را درشت روی یک کارت بنویسند و اولین حرفش را نشانت بدهند. اسم را از سمت راست شروع می‌کنیم.",
        list: ["با انگشت روی حرف اول اسمت بکش.", "صدای اول اسمت را بگو."] },
      { type: "choose", show: "آ", prompt: "این «آ» است، مثل اول «آب». «آ» را پیدا کن.", say: "این آ است. آ، مثل اول آب. حالا آ را پیدا کن.",
        options: ["ب", "آ", "م"], answer: "آ" },
      { type: "trace", letter: "آ", prompt: "«آ» را بنویس.", say: "آ را بنویس. اول خط بلند را از بالا به پایین بکش، بعد کلاهش را از راست به چپ." },
      { type: "choose", show: "ب", prompt: "این «ب» است، مثل اول «بابا». «ب» را پیدا کن.", say: "این ب است. ب، مثل اول بابا. حالا ب را پیدا کن.",
        options: ["م", "ن", "ب"], answer: "ب" },
      { type: "trace", letter: "ب", prompt: "«ب» را بنویس.", say: "ب را بنویس. از راست شروع کن، پایین بیا و به چپ برو. آخر سر، یک نقطه زیرش بگذار." },
      { type: "choose", show: "م", prompt: "این «م» است، مثل اول «ماهی». «م» را پیدا کن.", say: "این م است. م، مثل اول ماهی. حالا م را پیدا کن.",
        options: ["م", "س", "آ"], answer: "م" },
      { type: "trace", letter: "م", prompt: "«م» را بنویس.", say: "م را بنویس. اول سرش را گرد بکش، بعد دمش را پایین بیاور." },
      { type: "choose", show: "🐟", prompt: "«ماهی» با کدام حرف شروع می‌شود؟ پیدا کن.", say: "ماهی. ما ... هی. ماهی با کدام حرف شروع می‌شود؟",
        options: ["ب", "م", "آ"], answer: "م" },
      { type: "doit", pic: "🔍", text: "دور و برت بگرد: حرف اول اسمت و «آ»، «ب» و «م» را روی یک جعبه، یک کتاب یا یک تابلو پیدا کن.",
        list: ["هر کدام را پیدا کردی، به پدر یا مادرت نشان بده.", "بگو: «این حرف اول اسم من است!»"] }
    ]
  },
  {
    id: "read-seed-36", subject: "read", level: "seed", emoji: "🌰", title: "بازی باغچه دانه",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        say: "کارت‌ها را برگردان و اسمشان را بشنو. دو تصویر هم‌قافیه را پیدا کن.",
        pairs: [[{ pic: "🐍", say: "مار" }, { pic: "🥒", say: "خیار" }], [{ pic: "🦁", say: "شیر" }, { pic: "🧀", say: "پنیر" }],
          [{ pic: "🌸", say: "گل" }, { pic: "🌉", say: "پل" }]] },
      { type: "sort", prompt: "چند بار دست می‌زنی؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. با هر تکه دست بزن. یک بار؟ دو بار؟ سه بار؟",
        baskets: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }, { label: "👏👏👏", value: "3" }],
        items: [{ pic: "⚽", say: "توپ", basket: "1" }, { pic: "🐟", say: "ماهی", basket: "2" }, { pic: "🦋", say: "پروانه", basket: "3" },
          { pic: "🍎", say: "سیب", basket: "1" }, { pic: "🐈", say: "گربه", basket: "2" }, { pic: "🦒", say: "زرافه", basket: "3" }] },
      { type: "sort", prompt: "اولش مثل «بابا» است یا مثل «در»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. اولش مثل بابا است یا مثل در؟",
        baskets: [{ pic: "👨", value: "ب" }, { pic: "🚪", value: "د" }],
        items: [{ pic: "🍆", say: "بادمجان", basket: "ب" }, { pic: "🦷", say: "دندان", basket: "د" }, { pic: "🐑", say: "بره", basket: "ب" },
          { pic: "✋", say: "دست", basket: "د" }, { pic: "🌧️", say: "باران", basket: "ب" }, { pic: "🌊", say: "دریا", basket: "د" }] },
      { type: "sort", prompt: "آخرش مثل «قلم» است یا مثل «پنیر»؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. آخرش مثل قلم است یا مثل پنیر؟",
        baskets: [{ pic: "🖊️", value: "م" }, { pic: "🧀", value: "ر" }],
        items: [{ pic: "👁️", say: "چشم", basket: "م" }, { pic: "🐍", say: "مار", basket: "ر" }, { pic: "🥬", say: "کلم", basket: "م" },
          { pic: "🥒", say: "خیار", basket: "ر" }, { pic: "🌾", say: "گندم", basket: "م" }, { pic: "🦁", say: "شیر", basket: "ر" }] },
      { type: "sort", prompt: "میوه، حیوان یا لباس؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. میوه‌ها پیش سیب، حیوان‌ها پیش گربه، لباس‌ها پیش پیراهن.",
        baskets: [{ pic: "🍎", value: "میوه" }, { pic: "🐈", value: "حیوان" }, { pic: "👕", value: "لباس" }],
        items: [{ pic: "🍓", say: "توت‌فرنگی", basket: "میوه" }, { pic: "🐇", say: "خرگوش", basket: "حیوان" }, { pic: "🧤", say: "دستکش", basket: "لباس" },
          { pic: "🍊", say: "پرتقال", basket: "میوه" }, { pic: "🐢", say: "لاک‌پشت", basket: "حیوان" }, { pic: "🧣", say: "شال‌گردن", basket: "لباس" }] },
      { type: "order", prompt: "اول تخم کوچک بود. بعد چه شد؟ به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. اول تخم کوچک بود. بعد چه شد؟ آخرش چه شد؟ به ترتیب بچین.",
        items: [{ pic: "🥚", say: "یک تخم کوچک روی برگ" }, { pic: "🐛", say: "یک کرم از تخم بیرون آمد و برگ خورد" }, { pic: "🦋", say: "کرم پروانه شد" }] }
    ]
  },

  // ---------------- Reading: Sprout (first letters, syllables and words) ----------------
  // Sprout begins with sounds, pictures and talk (read-sprout-7 to 22); the first letters follow from read-sprout-1.
  // These lessons show no written words: everything is heard, and pictures carry the words.
  {
    id: "read-sprout-7", subject: "read", level: "sprout", emoji: "🔴", title: "صداها را بشمار",
    steps: [
      /* A word pulled apart into its sounds: one coloured block for each sound, the first on the right. The blocks
         move apart as each sound is said, then join back into the word. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین یک کلمه چطور صدا به صدا باز می‌شود", bg: "#fdf3df",
        parts: {
          wind: { art: "🌬️", at: [80, 36], s: 0.3, o: 0 },
          b1: { art: "read-sblock", look: { c: "#e46b8a" }, at: [100, 66], s: 1.4, o: 0 },
          b2: { art: "read-sblock", look: { c: "#f59e0b" }, at: [80, 66], s: 1.4, o: 0 },
          b3: { art: "read-sblock", look: { c: "#5b9bd5" }, at: [60, 66], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "این «باد» است. یک کلمه است.", say: "این باد است. یک کلمه است.", do: [
            { id: "wind", to: { s: 1.5, o: 1 }, dur: 800, ease: "back" },
            { id: "b1", to: { o: 1 }, at: 900, dur: 500 }, { id: "b2", to: { o: 1 }, at: 900, dur: 500 }, { id: "b3", to: { o: 1 }, at: 900, dur: 500 }
          ] },
          { caption: "باد را آرام می‌کشیم: بـ … آ … د", say: "باد را آرام می‌کشیم: بـ ... آ ... د", key: 4200, hold: 6000, do: [
            { id: "b1", to: { x: 116 }, dur: 1200 }, { id: "b3", to: { x: 44 }, dur: 1200 },
            { id: "b1", to: { s: 1.8 }, at: 1600, dur: 700, yoyo: true, times: 2 },
            { id: "b2", to: { s: 1.8 }, at: 2600, dur: 700, yoyo: true, times: 2 },
            { id: "b3", to: { s: 1.8 }, at: 3600, dur: 700, yoyo: true, times: 2 }
          ] },
          { caption: "باد سه صدا دارد: بـ، آ، د.", say: "باد سه صدا دارد: بـ، آ، د.", do: [
            { id: "b1", to: { y: 60 }, dur: 600, yoyo: true, times: 2 }, { id: "b2", to: { y: 60 }, at: 700, dur: 600, yoyo: true, times: 2 },
            { id: "b3", to: { y: 60 }, at: 1400, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "صداها را دوباره به هم می‌چسبانیم: باد!", say: "صداها را دوباره به هم می‌چسبانیم: بـ آ د ... باد!", do: [
            { id: "b1", to: { x: 100 }, dur: 1200, ease: "in" }, { id: "b3", to: { x: 60 }, dur: 1200, ease: "in" },
            { emit: "spark", where: [80, 58], spread: [44, 6], n: 8, at: 1200, dur: 200, life: 900 },
            { id: "wind", to: { s: 1.8 }, at: 1300, dur: 700, yoyo: true, times: 2 }
          ] }
        ] },
      { type: "boxes", pic: "🌬️", word: "باد", parts: ["بـ", "آ", "د"] },
      { type: "boxes", pic: "🍎", word: "سیب", parts: ["سـ", "ای", "ب"] },
      { type: "boxes", pic: "🐭", word: "موش", parts: ["مـ", "او", "ش"] },
      { type: "choose", prompt: "«آب» چند صدا دارد؟", say: "آب. آ ... ب. آب چند صدا دارد؟", pic: true,
        options: [{ label: "🔴", value: "1" }, { label: "🔴🔴", value: "2" }, { label: "🔴🔴🔴", value: "3" }], answer: "2" },
      { type: "choose", prompt: "صداها را به هم بچسبان. چه شد؟", say: "گوش بده: مـ ... آ ... ه. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🐭", value: "موش" }, { label: "🌙", value: "ماه" }, { label: "🐟", value: "ماهی" }], answer: "ماه" },
      { type: "choose", prompt: "صداها را به هم بچسبان. چه شد؟", say: "گوش بده: د ... ـَ ... س ... ت. به هم بچسبان. چه شد؟", pic: true,
        options: [{ label: "🦷", value: "دندان" }, { label: "✋", value: "دست" }, { label: "🚪", value: "در" }], answer: "دست" }
    ]
  },
  {
    id: "read-sprout-8", subject: "read", level: "sprout", emoji: "📍", title: "صدا کجاست؟",
    steps: [
      // Three squares stand for a word's start, middle and end; the red one is where the sound is. The first square
      // is on the right, as Persian is read.
      { type: "choose", prompt: "صدای «س» کجای «سیب» است؟ اول، وسط یا آخر؟", pic: true,
        say: "سیب. سـ ... یب. صدای س کجای سیب است؟ اول؟ وسط؟ یا آخر؟ مربع قرمز جای صداست. اول کلمه، سمت راست است.",
        options: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜🟥⬜", value: "وسط" }, { label: "⬜⬜🟥", value: "آخر" }], answer: "اول" },
      { type: "choose", prompt: "صدای «س» کجای «کاسه» است؟", pic: true,
        say: "کاسه. کا ... سه. صدای س کجای کاسه است؟ اول؟ وسط؟ یا آخر؟",
        options: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜🟥⬜", value: "وسط" }, { label: "⬜⬜🟥", value: "آخر" }], answer: "وسط" },
      { type: "choose", prompt: "صدای «س» کجای «خروس» است؟", pic: true,
        say: "خروس. خرو ... س. صدای س کجای خروس است؟ اول؟ وسط؟ یا آخر؟",
        options: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜🟥⬜", value: "وسط" }, { label: "⬜⬜🟥", value: "آخر" }], answer: "آخر" },
      { type: "choose", prompt: "صدای «م» کجای «ماهی» است؟", pic: true,
        say: "ماهی. مـ ... اهی. صدای م کجای ماهی است؟ اول؟ وسط؟ یا آخر؟",
        options: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜🟥⬜", value: "وسط" }, { label: "⬜⬜🟥", value: "آخر" }], answer: "اول" },
      { type: "choose", prompt: "صدای «م» کجای «بادام» است؟", pic: true,
        say: "بادام. بادا ... م. صدای م کجای بادام است؟ اول؟ وسط؟ یا آخر؟",
        options: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜🟥⬜", value: "وسط" }, { label: "⬜⬜🟥", value: "آخر" }], answer: "آخر" },
      { type: "sort", prompt: "صدای «ب» اول کلمه است یا آخر کلمه؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. صدای ب اول کلمه است یا آخر کلمه؟",
        baskets: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜⬜🟥", value: "آخر" }],
        items: [{ pic: "🌧️", say: "باران", basket: "اول" }, { pic: "🍎", say: "سیب", basket: "آخر" }, { pic: "🐑", say: "بره", basket: "اول" },
          { pic: "💧", say: "آب", basket: "آخر" }, { pic: "🍆", say: "بادمجان", basket: "اول" }, { pic: "📖", say: "کتاب", basket: "آخر" }] },
      { type: "sort", prompt: "صدای «د» اول کلمه است یا آخر کلمه؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. صدای د اول کلمه است یا آخر کلمه؟",
        baskets: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜⬜🟥", value: "آخر" }],
        items: [{ pic: "✋", say: "دست", basket: "اول" }, { pic: "🌬️", say: "باد", basket: "آخر" }, { pic: "🦷", say: "دندان", basket: "اول" },
          { pic: "🧺", say: "سبد", basket: "آخر" }, { pic: "🌊", say: "دریا", basket: "اول" }, { pic: "⚪", say: "سفید", basket: "آخر" }] }
    ]
  },
  {
    id: "read-sprout-9", subject: "read", level: "sprout", emoji: "🌰", title: "بخش و صدا",
    steps: [
      { type: "clap", pic: "🌰", word: "بادام", parts: ["با", "دام"], prompt: "«بادام» را بخش‌بخش کن. با هر بخش یک بار دست بزن." },
      { type: "choose", prompt: "بخش اول «بادام» «با» است. «با» چند صدا دارد؟", say: "با. بـ ... آ. با چند صدا دارد؟", pic: true,
        options: [{ label: "🔴", value: "1" }, { label: "🔴🔴", value: "2" }, { label: "🔴🔴🔴", value: "3" }], answer: "2" },
      { type: "clap", pic: "🧺", word: "سبد", parts: ["سَ", "بَد"], prompt: "«سبد» را بخش‌بخش کن. با هر بخش یک بار دست بزن." },
      { type: "choose", prompt: "بخش دوم «سبد» «بَد» است. «بَد» چند صدا دارد؟", say: "بَد. بـ ... اَ ... د. بد چند صدا دارد؟", pic: true,
        options: [{ label: "🔴", value: "1" }, { label: "🔴🔴", value: "2" }, { label: "🔴🔴🔴", value: "3" }], answer: "3" },
      { type: "clap", pic: "📖", word: "کتاب", parts: ["کِ", "تاب"], prompt: "«کتاب» را بخش‌بخش کن. با هر بخش یک بار دست بزن." },
      { type: "choose", prompt: "بخش دوم «کتاب» «تاب» است. «تاب» چند صدا دارد؟", say: "تاب. تـ ... آ ... ب. تاب چند صدا دارد؟", pic: true,
        options: [{ label: "🔴", value: "1" }, { label: "🔴🔴", value: "2" }, { label: "🔴🔴🔴", value: "3" }], answer: "3" },
      { type: "choose", prompt: "بخش اول «ماهی» «ما» است. اسم کدام هم با «ما» شروع می‌شود؟", pic: true,
        say: "ماهی. ما ... هی. اسم کدام هم با ما شروع می‌شود؟ موش؟ ماشین؟ سیب؟",
        options: [{ label: "🐭", value: "موش" }, { label: "🍎", value: "سیب" }, { label: "🚗", value: "ماشین" }], answer: "ماشین" }
    ]
  },
  {
    id: "read-sprout-10", subject: "read", level: "sprout", emoji: "🔁", title: "یک صدا را عوض کن",
    steps: [
      /* One sound changes and the word changes: سیب → سیر (the last block swaps), then گوشت → گوش (the last block
         goes away). The first sound is the block on the right. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین با عوض کردن یک صدا چه می‌شود", bg: "#fdf3df",
        parts: {
          apple: { art: "🍎", at: [80, 36], s: 0.3, o: 0 }, garlic: { art: "🧄", at: [80, 36], s: 0.3, o: 0 },
          c1: { art: "read-sblock", look: { c: "#5a9a45" }, at: [100, 66], s: 1.4, o: 0 }, c2: { art: "read-sblock", look: { c: "#f59e0b" }, at: [80, 66], s: 1.4, o: 0 },
          c3: { art: "read-sblock", look: { c: "#5b9bd5" }, at: [60, 66], s: 1.4, o: 0 }, cr: { art: "read-sblock", look: { c: "#9b6bd0" }, at: [60, 96], s: 1.4, o: 0 },
          meat: { art: "🥩", at: [80, 36], s: 0.3, o: 0 }, ear: { art: "👂", at: [80, 36], s: 0.3, o: 0 },
          g1: { art: "read-sblock", look: { c: "#e46b8a" }, at: [110, 66], s: 1.4, o: 0 }, g2: { art: "read-sblock", look: { c: "#2bb3a3" }, at: [90, 66], s: 1.4, o: 0 },
          g3: { art: "read-sblock", look: { c: "#f59e0b" }, at: [70, 66], s: 1.4, o: 0 }, g4: { art: "read-sblock", look: { c: "#5b9bd5" }, at: [50, 66], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "سیب: سـ … ای … ب", say: "سیب: سـ ... ای ... ب", hold: 5000, do: [
            { id: "apple", to: { s: 1.5, o: 1 }, dur: 800, ease: "back" },
            { id: "c1", to: { o: 1 }, at: 900, dur: 300 }, { id: "c1", to: { s: 1.8 }, at: 1100, dur: 600, yoyo: true, times: 2 },
            { id: "c2", to: { o: 1 }, at: 1900, dur: 300 }, { id: "c2", to: { s: 1.8 }, at: 2100, dur: 600, yoyo: true, times: 2 },
            { id: "c3", to: { o: 1 }, at: 2900, dur: 300 }, { id: "c3", to: { s: 1.8 }, at: 3100, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "صدای آخر را عوض می‌کنیم: به‌جای «ب»، «ر» می‌گذاریم.", say: "صدای آخر را عوض می‌کنیم: به جای بـ، ر می‌گذاریم.", hold: 5500, do: [
            { id: "c3", to: { y: 96, o: 0 }, dur: 1000, ease: "in" },
            { id: "cr", to: { o: 1 }, at: 1100, dur: 100 }, { id: "cr", to: { y: 66 }, at: 1100, dur: 1000, ease: "out" }
          ] },
          { caption: "سیب شد سیر!", say: "سـ ... ای ... ر ... سیر! سیب شد سیر!", do: [
            { id: "apple", to: { o: 0, s: 0.6 }, dur: 600 }, { id: "garlic", to: { s: 1.5, o: 1 }, at: 500, dur: 800, ease: "back" },
            { id: "cr", to: { s: 1.8 }, at: 1300, dur: 600, yoyo: true, times: 2 }
          ] },
          { caption: "حالا «گوشت»: گـ … او … ش … ت", say: "حالا گوشت: گـ ... او ... ش ... ت", hold: 5500, do: [
            { id: "garlic", to: { o: 0 }, dur: 500 }, { id: "c1", to: { o: 0 }, dur: 500 }, { id: "c2", to: { o: 0 }, dur: 500 }, { id: "cr", to: { o: 0 }, dur: 500 },
            { id: "meat", to: { s: 1.5, o: 1 }, at: 500, dur: 800, ease: "back" },
            { id: "g1", to: { o: 1 }, at: 1300, dur: 300 }, { id: "g2", to: { o: 1 }, at: 1900, dur: 300 },
            { id: "g3", to: { o: 1 }, at: 2500, dur: 300 }, { id: "g4", to: { o: 1 }, at: 3100, dur: 300 }
          ] },
          { caption: "صدای آخر را برمی‌داریم.", do: [
            { id: "g4", to: { y: 96, o: 0 }, dur: 1400, ease: "in" }
          ] },
          { caption: "گوشت شد گوش!", say: "گـ ... او ... ش ... گوش! گوشت شد گوش!", do: [
            { id: "meat", to: { o: 0, s: 0.6 }, dur: 600 }, { id: "ear", to: { s: 1.5, o: 1 }, at: 500, dur: 800, ease: "back" },
            { id: "g1", to: { x: 100 }, at: 600, dur: 700 }, { id: "g2", to: { x: 80 }, at: 600, dur: 700 }, { id: "g3", to: { x: 60 }, at: 600, dur: 700 }
          ] }
        ] },
      { type: "choose", prompt: "«ماه» را بگو، ولی به‌جای «ه» بگو «ر». چه شد؟", say: "ماه. حالا به جای هـ بگو ر. چه شد؟", pic: true,
        options: [{ label: "🌙", value: "ماه" }, { label: "🐍", value: "مار" }, { label: "🐭", value: "موش" }], answer: "مار" },
      { type: "choose", prompt: "«موش» را بگو، ولی به‌جای «م» بگو «گ». چه شد؟", say: "موش. حالا به جای مـ بگو گـ. چه شد؟", pic: true,
        options: [{ label: "👂", value: "گوش" }, { label: "🐈", value: "گربه" }, { label: "🐭", value: "موش" }], answer: "گوش" },
      { type: "choose", prompt: "«شیر» را بگو، ولی به‌جای «ش» بگو «س». چه شد؟", say: "شیر. حالا به جای شـ بگو سـ. چه شد؟", pic: true,
        options: [{ label: "🦁", value: "شیر" }, { label: "🍎", value: "سیب" }, { label: "🧄", value: "سیر" }], answer: "سیر" },
      { type: "choose", prompt: "«دست» را بگو، ولی به‌جای «د» بگو «ش». چه شد؟", say: "دست. حالا به جای د بگو شـ. چه شد؟", pic: true,
        options: [{ label: "👍", value: "شست" }, { label: "✋", value: "دست" }, { label: "🌊", value: "دریا" }], answer: "شست" },
      { type: "choose", prompt: "«بادام» را بگو، ولی «ام» آخرش را نگو. چه شد؟", say: "بادام. حالا آخرش را نگو: بادام بی ام. چه شد؟", pic: true,
        options: [{ label: "🌬️", value: "باد" }, { label: "🌰", value: "بادام" }, { label: "👨", value: "بابا" }], answer: "باد" }
    ]
  },
  {
    id: "read-sprout-11", subject: "read", level: "sprout", emoji: "🎲", title: "بازی صداها ۲",
    steps: [
      { type: "sort", prompt: "دو صدا دارد یا سه صدا؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. صداهایش را بشمار. دو صدا دارد یا سه صدا؟",
        baskets: [{ label: "🔴🔴", value: "2" }, { label: "🔴🔴🔴", value: "3" }],
        items: [{ pic: "💧", say: "آب", basket: "2" }, { pic: "🍎", say: "سیب", basket: "3" }, { pic: "🦶", say: "پا", basket: "2" },
          { pic: "🌙", say: "ماه", basket: "3" }, { pic: "🍲", say: "آش", basket: "2" }, { pic: "🦁", say: "شیر", basket: "3" }] },
      { type: "sort", prompt: "صدای «س» اول کلمه است یا آخر کلمه؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. صدای س اول کلمه است یا آخر کلمه؟",
        baskets: [{ label: "🟥⬜⬜", value: "اول" }, { label: "⬜⬜🟥", value: "آخر" }],
        items: [{ pic: "⭐", say: "ستاره", basket: "اول" }, { pic: "🐓", say: "خروس", basket: "آخر" }, { pic: "🧺", say: "سبد", basket: "اول" },
          { pic: "🚌", say: "اتوبوس", basket: "آخر" }, { pic: "🧄", say: "سیر", basket: "اول" }, { pic: "👕", say: "لباس", basket: "آخر" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. صداها را به هم بچسبان و تصویرش را پیدا کن.",
        say: "کارت‌ها را برگردان و گوش بده. صداها را به هم بچسبان و تصویرش را پیدا کن.",
        pairs: [[{ pic: "🔊", say: "مـ ... او ... ش" }, { pic: "🐭", say: "موش" }], [{ pic: "🔊", say: "سـ ... ای ... ب" }, { pic: "🍎", say: "سیب" }],
          [{ pic: "🔊", say: "د ... ـَ ... س ... ت" }, { pic: "✋", say: "دست" }]] },
      { type: "pairs", prompt: "دو تصویری را جفت کن که اسمشان فقط یک صدا فرق دارد.",
        say: "روی هر تصویر بزن و اسمش را بشنو. دو تصویری را جفت کن که اسمشان فقط یک صدا فرق دارد.",
        pairs: [[{ pic: "🍎", say: "سیب" }, { pic: "🧄", say: "سیر" }], [{ pic: "🌙", say: "ماه" }, { pic: "🐍", say: "مار" }],
          [{ pic: "🐭", say: "موش" }, { pic: "👂", say: "گوش" }]] },
      { type: "sort", prompt: "یک بخش دارد یا دو بخش؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. با هر بخش دست بزن. یک بخش دارد یا دو بخش؟",
        baskets: [{ label: "👏", value: "1" }, { label: "👏👏", value: "2" }],
        items: [{ pic: "🌬️", say: "باد", basket: "1" }, { pic: "🌰", say: "بادام", basket: "2" }, { pic: "🦁", say: "شیر", basket: "1" },
          { pic: "🧺", say: "سبد", basket: "2" }, { pic: "🌙", say: "ماه", basket: "1" }, { pic: "📖", say: "کتاب", basket: "2" }] }
    ]
  },
  {
    id: "read-sprout-12", subject: "read", level: "sprout", emoji: "🏠", title: "تصویر را بخوان: خانه",
    steps: [
      { type: "talk", scene: "🌅 🏠 👩 🍳 👧 🪥 🐈", caption: "صبح در خانه. در این تصویر چه می‌بینی؟ چه کسی؟ کجا؟ چه کار می‌کند؟",
        tips: ["مثل کلاس اول: اول بگذارید کودک هرچه می‌بیند بگوید.", "از او بخواهید با جمله کامل جواب دهد: نه «مامان»، بلکه «مامان صبحانه درست می‌کند.»",
          "بپرسید: «از کجا فهمیدی صبح است؟»"] },
      { type: "choose", prompt: "در تصویر، چه کسی صبحانه درست می‌کرد؟", say: "در تصویر، چه کسی صبحانه درست می‌کرد؟ مامان؟ دختر؟ گربه؟", pic: true,
        options: [{ label: "👧", value: "دختر" }, { label: "👩", value: "مامان" }, { label: "🐈", value: "گربه" }], answer: "مامان" },
      { type: "choose", prompt: "دختر چه کار می‌کرد؟", say: "دختر چه کار می‌کرد؟ مسواک می‌زد؟ می‌خوابید؟ توپ‌بازی می‌کرد؟", pic: true,
        options: [{ label: "🛌", value: "می‌خوابید" }, { label: "🪥", value: "مسواک می‌زد" }, { label: "⚽", value: "توپ‌بازی می‌کرد" }], answer: "مسواک می‌زد" },
      { type: "choose", prompt: "بعد از صبحانه، دختر با کیفش کجا می‌رود؟", say: "بعد از صبحانه، دختر کیفش را برمی‌دارد. فکر می‌کنی کجا می‌رود؟", pic: true,
        options: [{ label: "🏫", value: "مدرسه" }, { label: "🛏️", value: "رختخواب" }, { label: "🏖️", value: "دریا" }], answer: "مدرسه" },
      { type: "talk", scene: "👧 🎒 🏫 ❓", caption: "بعدش چه می‌شود؟ قصه این صبح را با جمله‌های کامل تعریف کن.",
        tips: ["بپرسید: «فکر می‌کنی بعدش چه می‌شود؟ چرا این‌طور فکر می‌کنی؟»", "اگر کوتاه جواب داد، جمله‌اش را کامل‌تر بگویید و بخواهید تکرار کند.",
          "تصویری از کتاب درسی یا یک مجله را هم همین‌طور با هم بخوانید."] }
    ]
  },
  {
    id: "read-sprout-13", subject: "read", level: "sprout", emoji: "🏪", title: "تصویر را بخوان: کوچه و بازار",
    steps: [
      { type: "talk", scene: "🏘️ 🚗 🚦 👵 👦 🐈", caption: "یک کوچه در شهر. چه کسانی را می‌بینی؟ هر کدام چه کار می‌کند؟",
        tips: ["بپرسید: «این کوچه شلوغ است یا خلوت؟ از کجا فهمیدی؟»", "کلمه‌های شهر را با هم بگویید: پیاده‌رو، چراغ راهنما، مغازه، خیابان.",
          "بخواهید با جمله کامل جواب دهد."] },
      { type: "choose", prompt: "چه کسی نان می‌پزد؟", say: "چه کسی نان می‌پزد؟ نانوا؟ پزشک؟ کشاورز؟", pic: true,
        options: [{ label: "👩‍⚕️", value: "پزشک" }, { label: "🧑‍🍳", value: "نانوا" }, { label: "🧑‍🌾", value: "کشاورز" }], answer: "نانوا" },
      { type: "choose", prompt: "وقتی بیمار می‌شویم، پیش چه کسی می‌رویم؟", say: "وقتی بیمار می‌شویم، پیش چه کسی می‌رویم؟", pic: true,
        options: [{ label: "👩‍⚕️", value: "پزشک" }, { label: "🧑‍🌾", value: "کشاورز" }, { label: "🧑‍🍳", value: "نانوا" }], answer: "پزشک" },
      { type: "choose", prompt: "چه کسی گندم می‌کارد؟", say: "چه کسی در مزرعه گندم می‌کارد؟", pic: true,
        options: [{ label: "👨‍🏫", value: "معلم" }, { label: "🧑‍🌾", value: "کشاورز" }, { label: "👩‍⚕️", value: "پزشک" }], answer: "کشاورز" },
      { type: "choose", prompt: "چه کسی به بچه‌ها درس می‌دهد؟", say: "چه کسی در مدرسه به بچه‌ها درس می‌دهد؟", pic: true,
        options: [{ label: "👨‍🏫", value: "معلم" }, { label: "🧑‍🍳", value: "نانوا" }, { label: "🧑‍🌾", value: "کشاورز" }], answer: "معلم" },
      { type: "talk", scene: "🍎 🍊 🍇 🧺 👨 👧", caption: "در میوه‌فروشی. میوه‌فروش چه می‌فروشد؟ تو چه می‌خری؟",
        tips: ["بازی خرید کنید: یکی میوه‌فروش، یکی مشتری. «سلام، یک کیلو سیب می‌خواهم.»", "اسم شغل‌ها را با هم بگویید و بپرسید: «این آدم‌ها چه کمکی به ما می‌کنند؟»",
          "بپرسید: «تو بزرگ شدی، دوست داری چه کاره شوی؟ چرا؟»"] }
    ]
  },
  {
    id: "read-sprout-14", subject: "read", level: "sprout", emoji: "🌾", title: "تصویر را بخوان: روستا و طبیعت",
    steps: [
      { type: "talk", scene: "🏡 🌾 🐄 🐑 🧑‍🌾 ⛰️", caption: "یک روستا. چه می‌بینی؟ مردم روستا چه کار می‌کنند؟",
        tips: ["بپرسید: «روستا با شهر چه فرقی دارد؟»", "کلمه‌های تازه بگویید: مزرعه، طویله، چشمه، کوه، دشت.",
          "اگر از روستایی آمده‌اید، از آن‌جا برایش تعریف کنید."] },
      { type: "talk", scene: "🌊 🐟 🌳 🦆 🪨", caption: "کنار رودخانه. آب از کجا می‌آید؟ چه حیوان‌هایی این‌جا زندگی می‌کنند؟",
        tips: ["بپرسید: «اردک‌ها چه کار می‌کنند؟ ماهی‌ها کجا هستند؟»", "از او بخواهید چیزی را که نمی‌بیند حدس بزند: «زیر سنگ‌ها چه چیزی ممکن است باشد؟»",
          "جمله‌هایش را با یک کلمه وصفی کامل کنید: «آب سرد و زلال است.»"] },
      { type: "sort", prompt: "هر چیز مال کدام فصل است؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. هر چیز را در فصل خودش بگذار: بهار، تابستان، پاییز، زمستان.",
        baskets: [{ pic: "🌸", value: "بهار" }, { pic: "☀️", value: "تابستان" }, { pic: "🍂", value: "پاییز" }, { pic: "❄️", value: "زمستان" }],
        items: [{ pic: "🌷", say: "گل‌های بهاری", basket: "بهار" }, { pic: "🍉", say: "هندوانه", basket: "تابستان" }, { pic: "🎒", say: "اول مهر، رفتن به مدرسه", basket: "پاییز" },
          { pic: "⛄", say: "آدم‌برفی", basket: "زمستان" }, { pic: "🐣", say: "جوجه‌های تازه", basket: "بهار" }, { pic: "🏖️", say: "دریا و شنا", basket: "تابستان" },
          { pic: "🍁", say: "برگ‌های زرد و نارنجی", basket: "پاییز" }, { pic: "🧣", say: "شال‌گردن", basket: "زمستان" }] },
      { type: "sort", prompt: "روی خشکی زندگی می‌کند یا در آب؟",
        say: "روی هر تصویر بزن و اسمش را بشنو. این حیوان روی خشکی زندگی می‌کند یا در آب؟",
        baskets: [{ pic: "🌳", value: "خشکی" }, { pic: "🌊", value: "آب" }],
        items: [{ pic: "🐄", say: "گاو", basket: "خشکی" }, { pic: "🐟", say: "ماهی", basket: "آب" }, { pic: "🐑", say: "گوسفند", basket: "خشکی" },
          { pic: "🦀", say: "خرچنگ", basket: "آب" }, { pic: "🐓", say: "خروس", basket: "خشکی" }, { pic: "🐬", say: "دلفین", basket: "آب" }] },
      { type: "talk", scene: "🌸 ☀️ 🍂 ❄️", caption: "کدام فصل را بیشتر دوست داری؟ چرا؟ در آن فصل چه کار می‌کنی؟",
        tips: ["بخواهید دلیل بیاورد: «چون…»", "بپرسید: «الان چه فصلی است؟ از کجا فهمیدی؟»", "از پنجره بیرون را نگاه کنید و نشانه‌های همین فصل را پیدا کنید."] }
    ]
  },
  {
    id: "read-sprout-15", subject: "read", level: "sprout", emoji: "🖼️", title: "قصه چهار تصویری",
    steps: [
      { type: "order", prompt: "این قصه کلمه ندارد. تصویرها را به ترتیب بچین.", numbered: true,
        say: "این قصه کلمه ندارد. به تصویرها نگاه کن و آن‌ها را به ترتیب بچین: اول، بعد، آخرش.",
        items: ["☀️", "☁️", "🌧️", "☂️"] },
      { type: "talk", scene: "☀️ ☁️ 🌧️ ☂️", caption: "حالا قصه را بگو: اولش چه بود؟ وسطش چه شد؟ آخرش چه شد؟",
        tips: ["کمکش کنید قصه «اول»، «وسط» و «آخر» داشته باشد.", "بپرسید: «این قصه مال چه کسی است؟ اسمش را بگذار.»", "بپرسید: «اگر چتر نداشت، چه می‌شد؟»"] },
      { type: "order", prompt: "این قصه را هم به ترتیب بچین.", numbered: true,
        say: "به تصویرها نگاه کن و آن‌ها را به ترتیب بچین: اول، بعد، آخرش.",
        items: ["🚰", "🫖", "🔥", "☕"] },
      { type: "talk", scene: "🚰 🫖 🔥 ☕", caption: "قصه چای را تعریف کن. چه کسی چای درست کرد؟ برای چه کسی؟",
        tips: ["بگذارید خودش برای قصه آدم‌ها و اسم‌ها بسازد.", "یادآوری کنید: «کار با کتری و اجاق، کار بزرگ‌ترهاست.»", "بپرسید: «آخرش چه کسی چای خورد؟ چه حسی داشت؟»"] },
      { type: "order", prompt: "این قصه را هم به ترتیب بچین.", numbered: true,
        say: "به تصویرها نگاه کن و آن‌ها را به ترتیب بچین: اول، بعد، آخرش.",
        items: ["🥚", "🐣", "🐥", "🐔"] },
      { type: "talk", scene: "🥚 🐣 🐥 🐔", caption: "قصه جوجه را از اول تا آخر بگو. یک اسم هم برایش بگذار!",
        tips: ["بخواهید قصه را با «یکی بود، یکی نبود» شروع کند.", "بپرسید: «وسط قصه چه اتفاقی افتاد؟»", "بعد خودش با چهار نقاشی یک قصه بی‌کلمه بکشد و برایتان تعریف کند."] }
    ]
  },
  {
    id: "read-sprout-16", subject: "read", level: "sprout", emoji: "🗂️", title: "کلمه‌های تازه",
    steps: [
      { type: "choose", prompt: "زانو کدام است؟", say: "بدن ما: سر، شانه، زانو، پا. زانو کدام است؟", pic: true,
        options: [{ label: "👁️", value: "چشم" }, { label: "🦵", value: "زانو" }, { label: "👂", value: "گوش" }], answer: "زانو" },
      { type: "choose", prompt: "آتش‌نشان کدام است؟", say: "شغل‌ها: آتش‌نشان، پزشک، کشاورز. آتش‌نشان با کدام ماشین می‌آید؟", pic: true,
        options: [{ label: "🚑", value: "آمبولانس" }, { label: "🚒", value: "ماشین آتش‌نشانی" }, { label: "🚌", value: "اتوبوس" }], answer: "ماشین آتش‌نشانی" },
      { type: "choose", prompt: "کدام صورت «نگران» است؟", say: "حس‌ها: خوشحال، غمگین، نگران، عصبانی. کدام صورت نگران است؟", pic: true,
        options: [{ label: "😄", value: "خوشحال" }, { label: "😟", value: "نگران" }, { label: "😠", value: "عصبانی" }], answer: "نگران" },
      { type: "choose", prompt: "هوای «ابری» کدام است؟", say: "هوا: آفتابی، ابری، بارانی، برفی. هوای ابری کدام است؟", pic: true,
        options: [{ label: "☀️", value: "آفتابی" }, { label: "❄️", value: "برفی" }, { label: "☁️", value: "ابری" }], answer: "ابری" },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر کلمه را با تصویرش جفت کن.",
        say: "کارت‌ها را برگردان و گوش بده. هر کلمه را با تصویرش جفت کن.",
        pairs: [[{ pic: "🔊", say: "زانو" }, { pic: "🦵", say: "زانو" }], [{ pic: "🔊", say: "پزشک" }, { pic: "👩‍⚕️", say: "پزشک" }],
          [{ pic: "🔊", say: "غمگین" }, { pic: "😢", say: "غمگین" }], [{ pic: "🔊", say: "برفی" }, { pic: "❄️", say: "برفی" }]] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر کلمه را با تصویرش جفت کن.",
        say: "کارت‌ها را برگردان و گوش بده. هر کلمه را با تصویرش جفت کن.",
        pairs: [[{ pic: "🔊", say: "کشاورز" }, { pic: "🧑‍🌾", say: "کشاورز" }], [{ pic: "🔊", say: "عصبانی" }, { pic: "😠", say: "عصبانی" }],
          [{ pic: "🔊", say: "بارانی" }, { pic: "🌧️", say: "بارانی" }], [{ pic: "🔊", say: "دندان" }, { pic: "🦷", say: "دندان" }]] }
    ]
  },
  {
    id: "read-sprout-17", subject: "read", level: "sprout", emoji: "🧼", title: "چطور؟ چرا؟",
    steps: [
      { type: "order", prompt: "دست شستن را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. دست‌ها را چطور می‌شوییم؟ به ترتیب بچین.",
        items: [{ pic: "🚰", say: "دست‌ها را خیس می‌کنیم" }, { pic: "🧼", say: "صابون می‌زنیم" }, { pic: "👐", say: "دست‌ها را خوب به هم می‌مالیم" },
          { pic: "💧", say: "آب می‌کشیم و خشک می‌کنیم" }] },
      { type: "talk", scene: "🚰 🧼 👐 💧", caption: "حالا تو بگو: دست‌هایت را چطور می‌شویی؟ اول… بعد… آخرش…",
        tips: ["بخواهید با دو سه جمله و به ترتیب توضیح دهد.", "اگر قدمی را جا انداخت، بپرسید: «قبل از آب کشیدن چه کار کردی؟»", "بعد واقعاً با هم دست بشویید و او قدم‌ها را بگوید."] },
      { type: "order", prompt: "کاشتن دانه را به ترتیب بچین.", numbered: true,
        say: "روی هر تصویر بزن و بشنو. یک دانه را چطور می‌کاریم؟ به ترتیب بچین.",
        items: [{ pic: "🪴", say: "گلدان را پر از خاک می‌کنیم" }, { pic: "🌰", say: "دانه را در خاک می‌گذاریم" }, { pic: "💧", say: "به آن آب می‌دهیم" },
          { pic: "☀️", say: "گلدان را کنار پنجره، زیر آفتاب می‌گذاریم" }] },
      { type: "talk", scene: "🪴 🌰 💧 ☀️", caption: "به من یاد بده: یک دانه را چطور می‌کاریم؟",
        tips: ["نقش شاگرد را بازی کنید و بپرسید: «بعدش چه کار کنم؟»", "تشویقش کنید از کلمه‌های ترتیب استفاده کند: اول، بعد، بعد، آخرش.", "اگر شد، واقعاً یک دانه بکارید."] },
      { type: "talk", scene: "🍦 ☀️ 💧", caption: "بستنی بیرون، زیر آفتاب ماند و آب شد. چرا؟",
        tips: ["بگذارید دلیل بیاورد: «چون…»", "اگر نمی‌دانست، کمک کنید: «آفتاب گرم است. بستنی سرد است. گرما با بستنی چه می‌کند؟»",
          "چیزهای دیگر را هم بپرسید: «چرا لباس‌ها در آفتاب زود خشک می‌شوند؟»"] }
    ]
  },
  {
    id: "read-sprout-18", subject: "read", level: "sprout", emoji: "🐦", title: "قصه گوش کن ۳",
    steps: [
      /* Two longer heard stories, each with a problem and how it was solved. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه گوش کن. مشکل چه بود؟",
        parts: {
          bg: { art: "read-bg-garden" }, wall: { art: "read-wall" },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#9b6bd0", hairColor: "#3d2c22", key: "sprout18-nasrin" }, at: [20, 86], s: 1.25 },
          boy: { art: "read-kid", look: { hair: "short", top: "#e5483f" }, at: [70, 86], s: 1.25, flip: true },
          ball: { art: "read-ball-c", at: [45, 70], s: 1.1 },
          ring: { art: "read-sound", at: [76, 50], s: 0.4, o: 0 },
          grandpa: { art: "👴", look: { cane: false }, at: [176, 86], flip: true },
          heart: { art: "read-heart", at: [52, 52], s: 0.2, o: 0 }
        },
        scenes: [
          { caption: "آرش و نسرین در حیاط توپ‌بازی می‌کنند.", do: [
            { id: "ball", path: "M45 70Q32 50 24 70Q38 46 60 70Q48 50 30 72", dur: 4200, ease: "linear" }
          ] },
          { caption: "توپ از روی دیوار پرید و افتاد توی حیاط همسایه.", do: [
            { id: "boy.armF", to: { r: -130 }, dur: 300 },
            { id: "ball", path: "M30 72Q70 4 128 82", at: 300, dur: 1800, ease: "linear" },
            { id: "boy.armF", to: { r: 0 }, at: 900, dur: 500 }
          ] },
          { caption: "بچه‌ها ناراحت شدند. توپشان آن طرف دیوار بود!", do: [
            { id: "girl.smile", to: { o: 0 }, dur: 300 }, { id: "girl.sad", to: { o: 1 }, dur: 300 },
            { id: "boy.smile", to: { o: 0 }, dur: 300 }, { id: "boy.sad", to: { o: 1 }, dur: 300 },
            { id: "girl", walk: [56, 86], at: 400, dur: 1600 }
          ] },
          { caption: "آرش بلند گفت: «ببخشید! توپ ما افتاده توی حیاط شما.»", key: 900, hold: 5500, do: [
            { id: "boy.armF", to: { r: -150 }, dur: 400 },
            { id: "ring", to: { o: 1 }, at: 300, dur: 100 }, { id: "ring", to: { s: 2, o: 0 }, at: 300, dur: 1300 },
            { id: "boy.armF", to: { r: 0 }, at: 2000, dur: 400 }
          ] },
          { caption: "پدربزرگ همسایه آمد و توپ را برایشان انداخت.", key: 4200, do: [
            { id: "grandpa", walk: [136, 86], dur: 2400 },
            { id: "grandpa.armF", to: { r: -60 }, at: 2500, dur: 400 }, { id: "ball", to: { x: 130, y: 74 }, at: 2600, dur: 300 },
            { id: "grandpa.armF", to: { r: -150 }, at: 3100, dur: 400 },
            { id: "ball", path: "M130 74Q100 0 64 78", at: 3200, dur: 1800, ease: "linear" }
          ] },
          { caption: "بچه‌ها خوشحال شدند و گفتند: «مرسی!»", do: [
            { id: "girl.sad", to: { o: 0 }, dur: 200 }, { id: "girl.eyes", to: { o: 0 }, dur: 200 }, { id: "girl.laugh", to: { o: 1 }, dur: 200 },
            { id: "boy.sad", to: { o: 0 }, dur: 200 }, { id: "boy.eyes", to: { o: 0 }, dur: 200 }, { id: "boy.laugh", to: { o: 1 }, dur: 200 },
            { id: "heart", to: { o: 1, s: 1 }, at: 400, dur: 700, ease: "back" },
            { id: "boy", to: { y: "-2" }, at: 600, dur: 1600, yoyo: true, times: 4 }, { id: "girl", to: { y: "-2" }, at: 800, dur: 1600, yoyo: true, times: 4 }
          ] }
        ],
        question: "مشکل بچه‌ها چه بود؟", pic: true,
        options: [{ label: "🌧️", value: "باران آمد" }, { label: "⚽", value: "توپشان رفت آن طرف دیوار" }, { label: "🍦", value: "بستنی‌شان افتاد" }], answer: "توپشان رفت آن طرف دیوار" },
      { type: "scene", prompt: "به قصه گوش کن. کلاغ مشکلش را چطور حل کرد؟",
        parts: {
          bg: { art: "read-bg-meadow" }, jar: { art: "read-jar", at: [70, 86], s: 2 },
          p1: { art: "read-pebble", at: [112, 87], s: 1.2 }, p2: { art: "read-pebble", at: [120, 88], s: 1.2 }, p3: { art: "read-pebble", at: [128, 87], s: 1.2 },
          crow: { art: "read-crow", at: [170, 30], s: 1.6, flip: true }
        },
        scenes: [
          { caption: "کلاغ خیلی تشنه بود. یک کوزه آب پیدا کرد.", do: [
            { id: "jar.water", to: { sy: 0.3 }, dur: 1 },
            { id: "crow", path: "M170 30Q120 10 84 42", dur: 2600 }
          ] },
          { caption: "آب ته کوزه بود. نوک کلاغ به آب نمی‌رسید.", key: 900, do: [
            { id: "crow.head", to: { r: 40 }, dur: 900, yoyo: true, times: 4 }
          ] },
          { caption: "کلاغ فکری کرد. سنگ‌ریزه‌ها را یکی‌یکی توی کوزه انداخت.", key: 5600, hold: 9000, do: [
            { id: "crow", path: "M84 42Q100 60 116 86", dur: 1000 }, { id: "crow.head", to: { r: 40 }, at: 1000, dur: 300, yoyo: true, times: 2 },
            { id: "crow", path: "M116 86Q100 50 84 42", at: 1700, dur: 1000 }, { id: "p1", path: "M112 87Q96 50 72 44", at: 1700, dur: 1000 },
            { id: "p1", path: "M72 44L70 80", at: 2800, dur: 500, ease: "in" }, { id: "p1", to: { o: 0 }, at: 3300, dur: 200 },
            { id: "jar.water", to: { sy: 0.5 }, at: 3300, dur: 500 },
            { id: "crow", path: "M84 42Q104 62 124 87", at: 3600, dur: 1000 },
            { id: "crow", path: "M124 87Q104 50 84 42", at: 4800, dur: 1000 }, { id: "p2", path: "M120 88Q100 50 72 44", at: 4800, dur: 1000 },
            { id: "p2", path: "M72 44L70 80", at: 5900, dur: 500, ease: "in" }, { id: "p2", to: { o: 0 }, at: 6400, dur: 200 },
            { id: "jar.water", to: { sy: 0.7 }, at: 6400, dur: 500 },
            { id: "p3", path: "M128 87Q104 50 72 44", at: 7000, dur: 1000 },
            { id: "p3", path: "M72 44L70 80", at: 8100, dur: 500, ease: "in" }, { id: "p3", to: { o: 0 }, at: 8600, dur: 200 },
            { id: "jar.water", to: { sy: 0.92 }, at: 8600, dur: 500 }
          ] },
          { caption: "آب بالا آمد و کلاغ آب خورد.", key: 700, do: [
            { id: "crow.head", to: { r: 40 }, dur: 700, yoyo: true, times: 6 }
          ] }
        ],
        question: "کلاغ چطور آب خورد؟", pic: true,
        options: [{ label: "🥤", value: "با نی" }, { label: "🌧️", value: "صبر کرد تا باران بیاید" }, { label: "🪨", value: "سنگ‌ریزه توی کوزه انداخت" }], answer: "سنگ‌ریزه توی کوزه انداخت" },
      { type: "talk", scene: "🐦 🫙 🪨 💧", caption: "کلاغ چه مشکلی داشت؟ چطور حلش کرد؟ تو بودی چه کار می‌کردی؟",
        tips: ["کمکش کنید بگوید: «مشکلش این بود که… بعد…»", "بپرسید: «اگر سنگ‌ریزه نبود، کلاغ چه کار دیگری می‌توانست بکند؟»",
          "این قصه را با یک لیوان آب و چند سنگ‌ریزه در خانه امتحان کنید."] },
      { type: "talk", scene: "⚽ 🧱 👴 ❓", caption: "بعد از این که توپ برگشت، بچه‌ها چه کار می‌کنند؟ فکر می‌کنی دوباره چه می‌شود؟",
        tips: ["بپرسید: «بچه‌ها می‌توانند کجا بازی کنند که توپ نپرد؟»", "بگذارید پیش‌بینی کند و دلیلش را بگوید.", "بپرسید: «پدربزرگ همسایه چه حسی داشت؟»"] },
      { type: "talk", scene: "🧒 🤔 💡", caption: "تو یک بار مشکلی داشتی و آن را حل کردی؟ برای ما تعریف کن.",
        tips: ["بپرسید: «مشکل چه بود؟ چه کار کردی؟ آخرش چه شد؟»", "خودتان هم یک مشکل کوچک و راه حلش را تعریف کنید.", "به راه حلش آفرین بگویید، نه فقط به نتیجه."] }
    ]
  },
  {
    id: "read-sprout-19", subject: "read", level: "sprout", emoji: "🐝", title: "شنیدیم، یاد گرفتیم",
    steps: [
      /* Two short information texts heard with pictures: bees and honey, then how bread is made (wheat, flour,
         dough, the oven). Each picture answers one question. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "گوش کن: زنبورها چه کار می‌کنند؟",
        parts: {
          bg: { art: "read-bg-meadow" }, f1: { art: "read-flower", look: { c: "#e46b8a" }, at: [30, 84], s: 1.7 },
          f2: { art: "read-flower", look: { c: "#fcd34d" }, at: [44, 86], s: 1.7 }, f3: { art: "read-flower", look: { c: "#9b6bd0" }, at: [58, 84], s: 1.7 },
          hive: { art: "read-hive", at: [128, 86], s: 1.7 },
          bee1: { art: "🐝", at: [96, 20], s: 0.45 }, bee2: { art: "🐝", at: [112, 30], s: 0.45 }
        },
        scenes: [
          { caption: "زنبورها روی گل‌ها می‌نشینند و شهد گل‌ها را می‌مکند.", do: [
            { id: "bee1", path: "M96 20Q60 20 30 60", dur: 2400 }, { id: "bee2", path: "M112 30Q80 50 58 60", at: 300, dur: 2400 },
            { id: "bee1", to: { r: 12 }, at: 2400, dur: 1600, yoyo: true, times: 4 }, { id: "bee2", to: { r: -12 }, at: 2700, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "بعد شهد را به کندو می‌برند.", key: 2000, do: [
            { id: "bee1", path: "M30 60Q80 30 128 71", dur: 2600 }, { id: "bee2", path: "M58 60Q90 40 128 72", at: 300, dur: 2600 },
            { id: "bee1", to: { s: 0.15, o: 0 }, at: 2600, dur: 300 }, { id: "bee2", to: { s: 0.15, o: 0 }, at: 2900, dur: 300 }
          ] }
        ],
        question: "زنبورها شهد را از کجا می‌آورند؟", pic: true,
        options: [{ label: "🌊", value: "از دریا" }, { label: "🌸", value: "از گل‌ها" }, { label: "🍞", value: "از نان" }], answer: "از گل‌ها" },
      { type: "scene", prompt: "گوش کن: عسل از کجا می‌آید؟",
        parts: {
          bg: { art: "read-bg-meadow" }, hive: { art: "read-hive", at: [70, 86], s: 2.2 },
          bee1: { art: "🐝", at: [20, 30], s: 0.45 }, bee2: { art: "🐝", at: [10, 50], s: 0.45 },
          honey: { art: "🍯", at: [116, 86], s: 0.3, o: 0 }, bread: { art: "🫓", at: [140, 86], s: 0.3, o: 0 }
        },
        scenes: [
          { caption: "در کندو، زنبورها از شهد گل‌ها عسل درست می‌کنند.", hold: 5500, do: [
            { id: "bee1", path: "M20 30Q50 40 70 68", dur: 2200 }, { id: "bee2", path: "M10 50Q40 70 70 69", at: 400, dur: 2200 },
            { id: "bee1", to: { s: 0.15, o: 0 }, at: 2200, dur: 300 }, { id: "bee2", to: { s: 0.15, o: 0 }, at: 2600, dur: 300 },
            { id: "hive", to: { s: 2.4 }, at: 2900, dur: 800, yoyo: true, times: 2 },
            { id: "honey", to: { s: 1.3, o: 1 }, at: 3600, dur: 900, ease: "back" }
          ] },
          { caption: "ما عسل را با نان می‌خوریم. چه شیرین است!", do: [
            { id: "bread", to: { s: 1.3, o: 1 }, dur: 900, ease: "back" },
            { id: "honey", to: { r: -10 }, at: 1000, dur: 1600, yoyo: true, times: 2 }
          ] }
        ],
        question: "عسل را چه کسی درست می‌کند؟", pic: true,
        options: [{ label: "🐄", value: "گاو" }, { label: "🐔", value: "مرغ" }, { label: "🐝", value: "زنبور" }], answer: "زنبور" },
      { type: "scene", prompt: "گوش کن: نان از چه درست می‌شود؟",
        parts: {
          bg: { art: "read-bg-meadow" },
          w1: { art: "read-wheat", at: [40, 86], s: 1.6, sy: 0.05 }, w2: { art: "read-wheat", at: [52, 84], s: 1.6, sy: 0.05 }, w3: { art: "read-wheat", at: [64, 86], s: 1.6, sy: 0.05 },
          w4: { art: "read-wheat", at: [76, 84], s: 1.6, sy: 0.05 }, w5: { art: "read-wheat", at: [88, 86], s: 1.6, sy: 0.05 },
          farmer: { art: "🧑‍🌾", at: [140, 88], flip: true }
        },
        scenes: [
          { caption: "کشاورز در مزرعه گندم می‌کارد.", key: 1700, do: [
            { id: "farmer", walk: [100, 88], dur: 3000 },
            { id: "farmer.armF", to: { r: -60 }, at: 400, dur: 500, yoyo: true, times: 6 },
            { emit: "dash", where: [86, 82], spread: [50, 4], rise: 4, n: 14, at: 400, dur: 2600, life: 800 }
          ] },
          { caption: "باران می‌بارد و آفتاب می‌تابد. گندم‌ها بزرگ و طلایی می‌شوند.", key: 3600, hold: 6000, do: [
            { emit: "drop", where: [64, 20], spread: [80, 6], rise: 50, n: 60, dur: 4200, life: 900 },
            { id: "w1", to: { sy: 1.6 }, at: 1600, dur: 2600, ease: "out" }, { id: "w2", to: { sy: 1.6 }, at: 1800, dur: 2600, ease: "out" },
            { id: "w3", to: { sy: 1.6 }, at: 2000, dur: 2600, ease: "out" }, { id: "w4", to: { sy: 1.6 }, at: 2200, dur: 2600, ease: "out" },
            { id: "w5", to: { sy: 1.6 }, at: 2400, dur: 2600, ease: "out" }
          ] }
        ],
        question: "نان را از چه درست می‌کنند؟", pic: true,
        options: [{ label: "🌾", value: "گندم" }, { label: "🍎", value: "سیب" }, { label: "🥛", value: "شیر" }], answer: "گندم" },
      { type: "scene", prompt: "گوش کن: گندم چطور خمیر می‌شود؟", bg: "#fdf3df",
        parts: {
          quern: { art: "read-quern", at: [50, 80], s: 2 }, bowl: { art: "read-bowl", at: [118, 80], s: 1.8 },
          seeds: { art: "read-wheat", at: [50, 46], s: 1, r: 90, o: 0 }
        },
        scenes: [
          { caption: "دانه‌های گندم را آسیاب می‌کنند. آرد سفید درست می‌شود.", hold: 5500, do: [
            { id: "quern.flour", to: { sy: 0.01 }, dur: 1 },
            { id: "seeds", to: { o: 1 }, dur: 300 }, { id: "seeds", to: { y: 56, o: 0 }, at: 400, dur: 1000, ease: "in" },
            { id: "quern.top", to: { r: 720 }, at: 1200, dur: 3200, ease: "inout" },
            { id: "quern.flour", to: { sy: 1 }, at: 1800, dur: 2600 }
          ] },
          { caption: "آرد را با آب مخلوط می‌کنند. خمیر درست می‌شود.", key: 2700, do: [
            { emit: "drop", where: [118, 50], spread: [6, 2], rise: 14, n: 24, dur: 3000, life: 700 },
            { id: "bowl.flour", to: { o: 0 }, at: 1600, dur: 1200 }, { id: "bowl.dough", to: { o: 1 }, at: 1600, dur: 1200 },
            { id: "bowl", to: { r: 6 }, at: 1600, dur: 1600, yoyo: true, times: 4 }
          ] }
        ],
        question: "آرد را با چه مخلوط می‌کنند تا خمیر شود؟", pic: true,
        options: [{ label: "🍯", value: "عسل" }, { label: "💧", value: "آب" }, { label: "🧊", value: "یخ" }], answer: "آب" },
      { type: "scene", prompt: "گوش کن: خمیر چطور نان می‌شود؟",
        parts: {
          bg: { art: "read-bg-street" }, bakery: { art: "read-bakery", at: [38, 60] },
          baker: { art: "🧑‍🍳", at: [85.7, 89], flip: true }, peel: { art: "read-peel", at: [75.8, 70], s: 0.72, r: 39.4 },
          steam: { art: "read-steam", at: [48, 45], o: 0 }
        },
        scenes: [
          { caption: "نانوا خمیر را در تنور داغ می‌گذارد.", do: [
            { id: "baker.armF", to: { r: -90 }, dur: 1 }, { id: "baker.armB", to: { r: -80 }, dur: 1 },
            { id: "baker", to: { x: "-8" }, at: 300, dur: 900 }, { id: "peel", to: { x: "-8" }, at: 300, dur: 900 },
            { id: "bakery.fire", to: { s: 1.3 }, at: 1200, dur: 1600, yoyo: true, times: 4 }
          ] },
          { caption: "کمی بعد، نان گرم و خوش‌بو بیرون می‌آید.", do: [
            { id: "peel.dough", to: { o: 0 }, dur: 600 }, { id: "peel.bread", to: { o: 1 }, dur: 600 },
            { id: "baker", to: { x: "+8" }, at: 700, dur: 900 }, { id: "peel", to: { x: "+8" }, at: 700, dur: 900 },
            { id: "steam", to: { o: 1 }, at: 1600, dur: 300 }, { id: "steam", to: { y: "-4" }, at: 1600, dur: 1200 }
          ] }
        ],
        question: "خمیر را کجا می‌پزند؟", pic: true,
        options: [{ label: "❄️", value: "در یخچال" }, { label: "🔥", value: "در تنور داغ" }, { label: "🛁", value: "در حمام" }], answer: "در تنور داغ" }
    ]
  },
  {
    id: "read-sprout-20", subject: "read", level: "sprout", emoji: "🐦", title: "شعر بخوان، حفظ کن",
    steps: [
      /* A short poem written for Baghcheh (من / چمن، تند / بلند), one line per picture: the sparrow flies in, sits on
         the grass, pecks the seeds and chirps. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به شعر گوش کن و با آن بگو",
        parts: {
          bg: { art: "read-bg-meadow" }, seeds: { art: "read-seeds" },
          bird: { art: "🐦", at: [150, 16], s: 1.4 }, ring: { art: "read-sound", at: [70, 62], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "گنجشک کوچک من", do: [
            { id: "bird", path: "M150 16Q110 4 92 50", dur: 2600 }
          ] },
          { caption: "نشسته روی چمن.", do: [
            { id: "bird", path: "M92 50Q84 66 78 84", dur: 1400, ease: "out" }, { id: "bird", to: { r: -6 }, at: 1400, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "دانه می‌چیند تند تند،", key: 900, do: [
            { id: "bird", to: { r: -30 }, dur: 3600, yoyo: true, times: 12 },
            { id: "seeds", to: { o: 0.2 }, dur: 3600 }
          ] },
          { caption: "جیک جیک می‌کند بلند.", key: 900, do: [
            { id: "ring", to: { o: 1 }, dur: 100 }, { id: "ring", to: { s: 2.4, o: 0 }, dur: 1500 },
            { id: "bird", to: { y: 80 }, at: 1200, dur: 600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "clap", pic: "🐦", word: "دانه می‌چیند", parts: ["دا", "نه", "می", "چی", "نَد"], prompt: "با شعر دست بزن: با هر بخش یک بار." },
      { type: "clap", pic: "🌱", word: "روی چمن", parts: ["رو", "یِ", "چَ", "مَن"], prompt: "با شعر دست بزن: با هر بخش یک بار." },
      { type: "choose", prompt: "«گنجشک کوچک من، نشسته روی …» روی چه؟", pic: true,
        say: "گنجشک کوچک من، نشسته روی ... روی چه؟ کدام با من هم‌قافیه است؟",
        options: [{ label: "🌳", value: "درخت" }, { label: "🌱", value: "چمن" }, { label: "🏠", value: "بام" }], answer: "چمن" },
      { type: "choose", show: "🐦", prompt: "کدام با «من» هم‌قافیه است؟", say: "من. کدام با من هم‌قافیه است؟ دهن؟ دست؟ ماهی؟", pic: true,
        options: [{ label: "✋", value: "دست" }, { label: "👄", value: "دهن" }, { label: "🐟", value: "ماهی" }], answer: "دهن" },
      { type: "doit", pic: "🐦", text: "شعر گنجشک را از حفظ بگو، برای پدر و مادر یا مادربزرگ و پدربزرگ. با هر بخش دست بزن!",
        list: ["گنجشک کوچک من", "نشسته روی چمن.", "دانه می‌چیند تند تند،", "جیک جیک می‌کند بلند."] }
    ]
  },
  {
    id: "read-sprout-21", subject: "read", level: "sprout", emoji: "📏", title: "روی خط",
    steps: [
      { type: "intro", letter: "✏️", write: "", text: "صاف بنشین. کاغذ کمی کج جلوی توست و دست دیگرت آن را نگه می‌دارد. مداد را با سه انگشت بگیر.",
        say: "صاف بنشین. کاغذ کمی کج جلوی توست و دست دیگرت آن را نگه می‌دارد. مداد را با سه انگشت بگیر." },
      { type: "trace", path: "down", prompt: "خط‌های صاف از بالا به پایین.", say: "از بالا شروع کن و صاف پایین بیا." },
      { type: "trace", path: "across", prompt: "خط‌های صاف از راست به چپ.", say: "از راست شروع کن و صاف به چپ برو، مثل نوشتن فارسی." },
      { type: "trace", strokes: ["M164 82 Q166 132 134 132 L72 132 Q40 132 38 100"], prompt: "یک کاسه روی خط.", say: "از راست شروع کن، پایین بیا، روی خط به چپ برو و کمی بالا بیا." },
      { type: "trace", strokes: ["M150 100 Q151 128 136 128 Q122 128 122 106 Q123 128 108 128 Q94 128 94 106 Q95 128 80 128 L44 128"], prompt: "دندانه‌ها روی خط.", say: "از راست شروع کن: پایین، بالا، پایین، بالا، بعد روی خط برو." },
      { type: "trace", strokes: ["M112 128 Q86 128 88 104 Q92 84 112 86 Q130 90 128 112 Q126 150 82 162"], prompt: "یک حلقه و دم.", say: "یک حلقه بکش، دورش بزن، بعد دمش را از زیر خط پایین بیاور." },
      { type: "paper", text: "حالا در دفتر خط‌دار، بین دو خط بکش: یک ردیف خط صاف، یک ردیف کاسه، یک ردیف دندانه و یک ردیف حلقه.",
        check: ["صاف نشسته بود و مداد را با سه انگشت گرفته بود؟", "از راست به چپ کشید؟", "شکل‌ها روی خط نشسته بودند؟"] }
    ]
  },
  {
    id: "read-sprout-22", subject: "read", level: "sprout", emoji: "🪪", title: "اسمم را می‌نویسم",
    steps: [
      { type: "talk", scene: "🪪 ✏️ 👧 👨", caption: "بزرگ‌ترت اسمت را درشت روی یک کارت می‌نویسد. با هم نگاهش کنید: از کجا شروع می‌شود؟",
        tips: ["اسم کودک را درشت و خوانا، با همان شکلی که در مدرسه می‌نویسند، بنویسید.", "بپرسید: «اسمت چند تکه دارد؟ کجا شروع می‌شود؟»",
          "هنوز اسم حرف‌ها را یاد نمی‌دهیم؛ فقط نگاه کردن و از رو نوشتن."] },
      { type: "paper", text: "اسمت را از روی کارت بنویس. از سمت راست شروع کن.",
        check: ["از سمت راست شروع کرد؟", "همه تکه‌های اسمش را نوشت؟", "مداد را درست گرفته بود؟"],
        note: "کارت را بالای کاغذ بگذارید تا از رویش بنویسد. اگر سخت بود، اول با مداد کم‌رنگ بنویسید تا او روی آن بکشد." },
      { type: "paper", text: "حالا اسم یک نفر از خانواده‌ات را از روی کارت بنویس: مامان، بابا، خواهر یا برادر.",
        check: ["از روی کارت درست نگاه کرد؟", "تکه‌ها را به همان ترتیب نوشت؟"],
        note: "اسم‌ها را روی کارت‌های جدا بنویسید و بگذارید خودش یکی را انتخاب کند." },
      { type: "talk", scene: "🪪 🪪 🔍", caption: "دو اسم را کنار هم بگذار. کجایشان شبیه هم است؟",
        tips: ["کمکش کنید شکل‌های یکسان را در دو اسم پیدا کند.", "بگویید: «این شکل در اسم تو هم هست!»", "به جای اسم حرف، صدایش را بگویید."] },
      { type: "paper", text: "یک نقاشی بکش و اسمت را زیرش بنویس، مثل نقاش‌ها!",
        check: ["اسمش را خودش، از روی کارت یا از حفظ، نوشت؟"] }
    ]
  },
  {
    id: "read-sprout-1", subject: "read", level: "sprout", emoji: "💧", title: "«آ» و «ب»",
    steps: [
      { type: "intro", letter: "آ", text: "این «آ» است؛ مثل صدای اول «آب».", say: "آ. مثل آب",
        forms: [["آ", "اول کلمه"], ["ا", "وسط و آخر"], ["ـا", "چسبیده"]], example: { pic: "💧", word: "آب" } },
      { type: "intro", letter: "ب", text: "این «ب» است؛ مثل صدای اول «بابا».", say: "ب. مثل بابا",
        forms: [["ب", "تنها"], ["بـ", "اول"], ["ـبـ", "وسط"], ["ـب", "آخر"]], example: { pic: "👨", word: "بابا" } },
      { type: "choose", prompt: "«ب» را پیدا کن", say: "ب را پیدا کن", options: ["آ", "ب", "م", "ن"], answer: "ب" },
      { type: "choose", prompt: "«آ» را پیدا کن", say: "آ را پیدا کن", options: ["ب", "د", "آ", "ر"], answer: "آ" },
      { type: "trace", letter: "ب", prompt: "با انگشتت «ب» بنویس" },
      { type: "blend", parts: ["آ", "ب"], word: "آب", pic: "💧", say: "آ ... ب ... آب" },
      { type: "blend", parts: ["با", "با"], word: "بابا", pic: "👨", say: "با ... با ... بابا" },
      { type: "choose", show: "آب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "👨", value: "بابا" }, { label: "💧", value: "آب" }], answer: "آب", pic: true },
      { type: "choose", show: "💧", prompt: "کدام کلمه «آب» است؟", say: "کدام کلمه آب است؟", options: ["بابا", "آب"], answer: "آب" }
    ]
  },
  {
    id: "read-sprout-2", subject: "read", level: "sprout", emoji: "🌰", title: "«د» و «م»",
    steps: [
      { type: "intro", letter: "د", text: "این «د» است؛ مثل صدای آخر «باد». «د» به حرف بعدی نمی‌چسبد.", say: "د. مثل باد",
        forms: [["د", "تنها"], ["ـد", "آخر"]], example: { pic: "🌬️", word: "باد" } },
      { type: "intro", letter: "م", text: "این «م» است؛ مثل صدای آخر «بام».", say: "م. مثل بام",
        forms: [["م", "تنها"], ["مـ", "اول"], ["ـمـ", "وسط"], ["ـم", "آخر"]], example: { pic: "🏠", word: "بام" } },
      { type: "choose", prompt: "«د» را پیدا کن", say: "د را پیدا کن", options: ["ر", "ب", "د", "م"], answer: "د" },
      { type: "choose", prompt: "«م» را پیدا کن", say: "م را پیدا کن", options: ["م", "آ", "د", "ب"], answer: "م" },
      { type: "trace", letter: "م", prompt: "با انگشتت «م» بنویس" },
      { type: "blend", parts: ["با", "د"], word: "باد", pic: "🌬️", say: "با ... د ... باد" },
      { type: "blend", parts: ["با", "م"], word: "بام", pic: "🏠", say: "با ... م ... بام" },
      { type: "blend", parts: ["با", "دام"], word: "بادام", pic: "🌰", say: "با ... دام ... بادام" },
      { type: "choose", show: "بادام", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🏠", value: "بام" }, { label: "🌰", value: "بادام" }, { label: "🌬️", value: "باد" }], answer: "بادام", pic: true },
      { type: "choose", show: "بام", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌬️", value: "باد" }, { label: "💧", value: "آب" }, { label: "🏠", value: "بام" }], answer: "بام", pic: true },
      { type: "choose", show: "🌬️", prompt: "کدام کلمه «باد» است؟", say: "کدام کلمه باد است؟", options: ["بام", "باد", "بابا"], answer: "باد" }
    ]
  },
  {
    id: "read-sprout-3", subject: "read", level: "sprout", emoji: "🐴", title: "«س» و «ـَ»",
    steps: [
      { type: "intro", letter: "س", text: "این «س» است؛ مثل صدای اول «سَبَد».", say: "س. مثل سبد",
        forms: [["س", "تنها"], ["سـ", "اول"], ["ـسـ", "وسط"], ["ـس", "آخر"]], example: { pic: "🧺", word: "سَبَد" } },
      { type: "intro", letter: "اَ", text: "این نشانه «زَبَر» است و صدای «اَ» می‌دهد. اول کلمه روی «ا» می‌نشیند و جاهای دیگر روی خود حرف.", say: "اَ. مثل اسب",
        forms: [["اَ", "اول کلمه"], ["بَ", "روی حرف"], ["سَ", "روی حرف"]], example: { pic: "🐴", word: "اَسب" } },
      { type: "choose", prompt: "«س» را پیدا کن", say: "س را پیدا کن", options: ["ش", "ب", "س", "م"], answer: "س" },
      { type: "choose", prompt: "کدام «بَ» است؟", say: "کدام بَ است؟", options: ["با", "بَ", "ب"], answer: "بَ" },
      { type: "trace", letter: "س", prompt: "با انگشتت «س» بنویس" },
      { type: "blend", parts: ["اَ", "س", "ب"], word: "اَسب", pic: "🐴", say: "اَ ... س ... ب ... اسب" },
      { type: "blend", parts: ["سَ", "بَد"], word: "سَبَد", pic: "🧺", say: "سَ ... بَد ... سبد" },
      { type: "choose", show: "سَبَد", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐴", value: "اَسب" }, { label: "🧺", value: "سَبَد" }, { label: "🌰", value: "بادام" }], answer: "سَبَد", pic: true },
      { type: "choose", show: "اَسب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌬️", value: "باد" }, { label: "🧺", value: "سَبَد" }, { label: "🐴", value: "اَسب" }], answer: "اَسب", pic: true },
      { type: "choose", show: "🧺", prompt: "کدام کلمه «سَبَد» است؟", say: "کدام کلمه سبد است؟", options: ["اَسب", "بادام", "سَبَد"], answer: "سَبَد" }
    ]
  },

  {
    id: "read-sprout-23", subject: "read", level: "sprout", emoji: "✍️", title: "«آ ب د م س» را بنویس",
    steps: [
      { type: "trace", letter: "آ", prompt: "«آ» را بنویس.", say: "آ را بنویس: اول خط بلند از بالا به پایین، بعد کلاهش از راست به چپ." },
      { type: "trace", letter: "ب", prompt: "«ب» را بنویس.", say: "ب را بنویس: از راست شروع کن، پایین بیا و روی خط به چپ برو. نقطه را آخر سر بگذار." },
      { type: "trace", letter: "بـ", prompt: "«بـ» اول کلمه را بنویس.", say: "بـ اول کلمه کوتاه است و به حرف بعدی می‌چسبد. نقطه را آخر بگذار." },
      { type: "trace", letter: "د", prompt: "«د» را بنویس.", say: "د را بنویس: کمی کج پایین بیا و روی خط به چپ برو." },
      { type: "trace", letter: "م", prompt: "«م» را بنویس.", say: "م را بنویس: سرش را گرد بکش، بعد دمش را پایین بیاور." },
      { type: "trace", letter: "س", prompt: "«س» را بنویس.", say: "س را بنویس: سه دندانه، بعد یک کاسه." },
      { type: "trace", letter: "بابا", prompt: "«بابا» را بنویس.", say: "بابا را بنویس: هر تکه را یک‌جا بنویس، نقطه‌ها را آخر بگذار." },
      { type: "paper", lang: "fa", text: "در دفترت، هر حرف را سه بار بنویس. بعد این کلمه‌ها را بنویس.",
        example: "آ ب د م س — آب، بابا، بادام",
        check: ["از راست شروع کرد؟", "حرف‌ها روی خط نشسته بودند؟", "نقطه‌ها را آخر سر گذاشت؟"] }
    ]
  },
  {
    id: "read-sprout-4", subject: "read", level: "sprout", emoji: "🧩", title: "بازی حرف‌ها و صداها",
    steps: [
      { type: "pairs", prompt: "هر حرف را با تصویری جفت کن که اسمش با صدای همان حرف شروع می‌شود",
        pairs: [["آ", { pic: "💧", say: "آب" }], ["ب", { pic: "👨", say: "بابا" }], ["س", { pic: "🧺", say: "سبد" }], ["م", { pic: "🐟", say: "ماهی" }]] },
      { type: "build", pic: "🌬️", word: "باد", parts: ["ب", "ا", "د"], extra: ["م"], say: "باد" },
      { type: "build", pic: "👨", word: "بابا", parts: ["با", "با"], extra: ["دا"], say: "بابا" },
      { type: "sort", prompt: "اسم هر تصویر با کدام صدا شروع می‌شود؟ آن را در سبد همان حرف بگذار.",
        baskets: [{ label: "ب" }, { label: "س" }],
        items: [{ pic: "🧺", say: "سبد", basket: "س" }, { pic: "🌬️", say: "باد", basket: "ب" }, { pic: "🍎", say: "سیب", basket: "س" },
          { pic: "🌧️", say: "باران", basket: "ب" }, { pic: "🧄", say: "سیر", basket: "س" }, { pic: "👨", say: "بابا", basket: "ب" }] },
      { type: "build", pic: "🧺", word: "سَبَد", parts: ["سَ", "بَد"], extra: ["با"], say: "سبد" },
      { type: "build", pic: "🌰", word: "بادام", parts: ["با", "دام"], extra: ["سَ"], say: "بادام" }
    ]
  },
  {
    id: "read-sprout-24", subject: "read", level: "sprout", emoji: "🔠", title: "جدول بخش‌ها",
    steps: [
      { type: "blend", parts: ["ب", "ا"], word: "با", say: "بـ ... آ ... با" },
      { type: "blend", parts: ["د", "َ"], word: "دَ", say: "د ... اَ ... دَ" },
      { type: "blend", parts: ["م", "ا"], word: "ما", say: "مـ ... آ ... ما" },
      { type: "blend", parts: ["سَ", "بَد"], word: "سَبَد", pic: "🧺", say: "سَ ... بَد ... سبد" },
      { type: "choose", prompt: "کدام بخش را شنیدی؟", say: "گوش بده: سا. کدام بخش را شنیدی؟", options: ["سَ", "سا", "با"], answer: "سا" },
      { type: "choose", prompt: "کدام بخش را شنیدی؟", say: "گوش بده: دَ. کدام بخش را شنیدی؟", options: ["دا", "مَ", "دَ"], answer: "دَ" },
      { type: "choose", prompt: "کدام بخش را شنیدی؟", say: "گوش بده: ما. کدام بخش را شنیدی؟", options: ["ما", "مَ", "با"], answer: "ما" },
      { type: "choose", prompt: "کدام کلمه با بخش «با» شروع می‌شود؟", say: "کدام کلمه با بخش با شروع می‌شود؟", options: ["سَبَد", "بادام", "اَسب"], answer: "بادام" }
    ]
  },
  {
    id: "read-sprout-5", subject: "read", level: "sprout", emoji: "📖", title: "اولین جمله‌ها",
    steps: [
      { type: "blend", parts: ["آ", "مَد"], word: "آمَد", pic: "🚶", say: "آ ... مَد ... آمد" },
      { type: "blend", parts: ["دا", "د"], word: "داد", pic: "🤲", say: "دا ... د ... داد" },
      { type: "blend", parts: ["بابا", "آمَد"], word: "بابا آمَد.", pic: "👨", say: "بابا ... آمد ... بابا آمد" },
      { type: "passage", text: "اَسب آمَد.", question: "چه کسی آمد؟",
        options: [{ label: "👨", value: "بابا" }, { label: "🐴", value: "اَسب" }], answer: "اَسب", pic: true },
      { type: "blend", parts: ["بابا", "آب", "داد"], word: "بابا آب داد.", pic: "💧", say: "بابا ... آب ... داد ... بابا آب داد" },
      { type: "passage", text: "بابا بادام داد.", question: "بابا چه داد؟",
        options: [{ label: "💧", value: "آب" }, { label: "🌰", value: "بادام" }, { label: "🧺", value: "سَبَد" }], answer: "بادام", pic: true },
      { type: "passage", text: "سام آمَد. بابا سَبَد داد.", question: "بابا به سام چه داد؟",
        options: [{ label: "🧺", value: "سَبَد" }, { label: "🐴", value: "اَسب" }, { label: "💧", value: "آب" }], answer: "سَبَد", pic: true },
      { type: "passage", text: "اَسب آمَد. سام آب داد.", question: "سام به اسب چه داد؟",
        options: [{ label: "🌰", value: "بادام" }, { label: "💧", value: "آب" }], answer: "آب", pic: true }
    ]
  },
  {
    id: "read-sprout-6", subject: "read", level: "sprout", emoji: "✏️", title: "کلمه‌ها را بساز",
    steps: [
      { type: "build", hidden: true, pic: "💧", word: "آب", parts: ["آ", "ب"], extra: ["د"], say: "آب" },
      { type: "build", hidden: true, pic: "🌬️", word: "باد", parts: ["ب", "ا", "د"], extra: ["م"], say: "باد" },
      { type: "build", hidden: true, pic: "🏠", word: "بام", parts: ["ب", "ا", "م"], extra: ["د"], say: "بام" },
      { type: "build", hidden: true, pic: "👨", word: "بابا", parts: ["ب", "ا", "ب", "ا"], extra: ["م"], say: "بابا" },
      { type: "build", hidden: true, pic: "🐴", word: "اَسب", parts: ["اَ", "س", "ب"], extra: ["آ"], say: "اسب" },
      { type: "build", hidden: true, pic: "🧺", word: "سَبَد", parts: ["سَ", "بَ", "د"], extra: ["ا"], say: "سبد" },
      { type: "build", hidden: true, pic: "🌰", word: "بادام", parts: ["ب", "ا", "د", "ا", "م"], extra: ["س"], say: "بادام" }
    ]
  },

  {
    id: "read-sprout-25", subject: "read", level: "sprout", emoji: "🗣️", title: "بلند بخوان: جوانه",
    steps: [
      { type: "readaloud", pic: "👨", text: "بابا آمَد. بابا آب داد." },
      { type: "readaloud", pic: "🧺", text: "سام آمَد. سام سَبَد داد." },
      { type: "readaloud", pic: "🐴", text: "اَسب آمَد. سام آب داد." },
      { type: "readaloud", pic: "🌰", text: "ماما آمَد. ماما بادام داد." },
      { type: "readaloud", pic: "💧", text: "بابا آب داد. سام بادام داد. اَسب آب داد." }
    ]
  },
  {
    id: "read-sprout-26", subject: "read", level: "sprout", emoji: "📝", title: "املای اول",
    steps: [
      { type: "build", hidden: true, pic: "🌬️", word: "باد", parts: ["ب", "ا", "د"], extra: ["م"], say: "باد" },
      { type: "build", hidden: true, pic: "🏠", word: "بام", parts: ["ب", "ا", "م"], extra: ["س"], say: "بام" },
      { type: "build", hidden: true, pic: "🧺", word: "سَبَد", parts: ["سَ", "بَ", "د"], extra: ["م"], say: "سبد" },
      { type: "build", hidden: true, pic: "🌰", word: "بادام", parts: ["ب", "ا", "د", "ا", "م"], extra: ["س"], say: "بادام" },
      { type: "paper", lang: "fa", text: "املا! بزرگ‌ترت پنج کلمه می‌گوید. هر کلمه را در دفترت بنویس. بعد با هم درستش کنید.",
        check: ["هر کلمه را بعد از شنیدن، خودش نوشت؟", "از راست شروع کرد؟", "بعد با جواب‌ها مقایسه کرد و اگر جایی فرق داشت، درستش کرد؟"],
        note: "کلمه‌ها (برای شما): آب، باد، بام، سَبَد، بادام. هر کلمه را آرام و دو بار بگویید و صبر کنید تا بنویسد. آخر سر جواب‌ها را بنویسید تا خودش مقایسه کند؛ اشتباه را با مهربانی و با گفتن صداها درست کنید." }
    ]
  },
  {
    id: "read-sprout-27", subject: "read", level: "sprout", emoji: "🌱", title: "بازی باغچه جوانه",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر حرف را با تصویری جفت کن که با صدای آن حرف شروع می‌شود.",
        pairs: [["آ", { pic: "💧", say: "آب" }], ["ب", { pic: "🌬️", say: "باد" }], ["م", { pic: "🐟", say: "ماهی" }], ["س", { pic: "🧺", say: "سبد" }]] },
      { type: "build", pic: "🏠", word: "بام", parts: ["ب", "ا", "م"], extra: ["د"], say: "بام" },
      { type: "build", pic: "🐴", word: "اَسب", parts: ["اَ", "س", "ب"], extra: ["م"], say: "اسب" },
      { type: "sort", prompt: "اولش «ب» است یا «م»؟", say: "روی هر کلمه بزن و بشنو. اولش ب است یا م؟",
        baskets: [{ label: "ب" }, { label: "م" }],
        items: [{ label: "باد", say: "باد", basket: "ب" }, { label: "ماما", say: "ماما", basket: "م" }, { label: "بادام", say: "بادام", basket: "ب" },
          { label: "مَداد", say: "مداد", basket: "م" }, { label: "بابا", say: "بابا", basket: "ب" }, { label: "مَس", say: "مس", basket: "م" }] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله شود.", numbered: true,
        say: "کلمه‌ها را به ترتیب بچین تا جمله شود: بابا آب داد.",
        items: ["بابا", "آب", "داد."] }
    ]
  },

  // ---------------- Reading: Sapling (the remaining first letters, short vowels, sentences) ----------------
  // Letters follow the first-grade textbook order after «س»: او، ت، ر، ای، ن، ز، ش، اِ، اُ، ک.
  // Words and passages use only letters taught earlier; instructions and questions are for the grown-up to read aloud.
  {
    id: "read-sapling-1", subject: "read", level: "sapling", emoji: "👃", title: "«او» و «ت»",
    steps: [
      { type: "intro", letter: "او", write: "و", text: "این «او» است؛ مثل صدای آخر «بو». «و» به حرف بعدی نمی‌چسبد.", say: "او. مثل بو",
        forms: [["او", "اول کلمه"], ["و", "بعد از حرف"], ["ـو", "چسبیده"]], example: { pic: "👃", word: "بو" } },
      { type: "intro", letter: "ت", text: "این «ت» است؛ مثل صدای آخر «دَست».", say: "ت. مثل دست",
        forms: [["ت", "تنها"], ["تـ", "اول"], ["ـتـ", "وسط"], ["ـت", "آخر"]], example: { pic: "✋", word: "دَست" } },
      { type: "choose", prompt: "«و» را پیدا کن", say: "و را پیدا کن", options: ["د", "و", "ر", "م"], answer: "و" },
      { type: "choose", prompt: "«ت» را پیدا کن", say: "ت را پیدا کن", options: ["ب", "ن", "ت", "ث"], answer: "ت" },
      { type: "trace", letter: "ت", prompt: "با انگشتت «ت» بنویس" },
      { type: "blend", parts: ["ب", "و"], word: "بو", pic: "👃", say: "ب ... او ... بو" },
      { type: "blend", parts: ["دو", "د"], word: "دود", pic: "💨", say: "دو ... د ... دود" },
      { type: "blend", parts: ["دَ", "س", "ت"], word: "دَست", pic: "✋", say: "دَ ... س ... ت ... دست" },
      { type: "choose", show: "دود", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "👃", value: "بو" }, { label: "💨", value: "دود" }, { label: "✋", value: "دَست" }], answer: "دود", pic: true },
      { type: "choose", show: "دَست", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "✋", value: "دَست" }, { label: "💧", value: "آب" }, { label: "💨", value: "دود" }], answer: "دَست", pic: true },
      { type: "choose", show: "👃", prompt: "کدام کلمه «بو» است؟", say: "کدام کلمه بو است؟", options: ["دود", "دَست", "بو"], answer: "بو" }
    ]
  },
  {
    id: "read-sapling-2", subject: "read", level: "sapling", emoji: "🍎", title: "«ر» و «ای»",
    steps: [
      { type: "intro", letter: "ر", text: "این «ر» است؛ مثل صدای آخر «اَبر». «ر» به حرف بعدی نمی‌چسبد.", say: "ر. مثل ابر",
        forms: [["ر", "تنها"], ["ـر", "آخر"]], example: { pic: "☁️", word: "اَبر" } },
      { type: "intro", letter: "ای", write: "ی", text: "این «ای» است؛ مثل صدای وسط «سیب».", say: "ای. مثل سیب",
        forms: [["ای", "اول کلمه"], ["ـیـ", "وسط"], ["ی", "آخر"], ["ـی", "چسبیده"]], example: { pic: "🍎", word: "سیب" } },
      { type: "choose", prompt: "«ر» را پیدا کن", say: "ر را پیدا کن", options: ["ز", "د", "ر", "و"], answer: "ر" },
      { type: "choose", prompt: "«ـیـ» را پیدا کن", say: "ای را پیدا کن", options: ["ـنـ", "ـیـ", "ـبـ", "ـتـ"], answer: "ـیـ" },
      { type: "trace", letter: "ی", prompt: "با انگشتت «ی» بنویس" },
      { type: "blend", parts: ["اَ", "بر"], word: "اَبر", pic: "☁️", say: "اَ ... بر ... ابر" },
      { type: "blend", parts: ["ما", "دَر"], word: "مادَر", pic: "👩", say: "ما ... دَر ... مادر" },
      { type: "blend", parts: ["سی", "ب"], word: "سیب", pic: "🍎", say: "سی ... ب ... سیب" },
      { type: "choose", show: "مادَر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "☁️", value: "اَبر" }, { label: "👩", value: "مادَر" }, { label: "🍎", value: "سیب" }], answer: "مادَر", pic: true },
      { type: "choose", show: "سیب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🚪", value: "دَر" }, { label: "🧄", value: "سیر" }, { label: "🍎", value: "سیب" }], answer: "سیب", pic: true },
      { type: "choose", show: "🚪", prompt: "کدام کلمه «دَر» است؟", say: "کدام کلمه در است؟", options: ["دَر", "اَبر", "سیر"], answer: "دَر" }
    ]
  },
  {
    id: "read-sapling-3", subject: "read", level: "sapling", emoji: "🐝", title: "«ن» و «ز»",
    steps: [
      { type: "intro", letter: "ن", text: "این «ن» است؛ مثل صدای اول «نان».", say: "ن. مثل نان",
        forms: [["ن", "تنها"], ["نـ", "اول"], ["ـنـ", "وسط"], ["ـن", "آخر"]], example: { pic: "🍞", word: "نان" } },
      { type: "intro", letter: "ز", text: "این «ز» است؛ مثل صدای اول «زَنبور». «ز» به حرف بعدی نمی‌چسبد.", say: "ز. مثل زنبور",
        forms: [["ز", "تنها"], ["ـز", "آخر"]], example: { pic: "🐝", word: "زَنبور" } },
      { type: "choose", prompt: "«ن» را پیدا کن", say: "ن را پیدا کن", options: ["ب", "ت", "ی", "ن"], answer: "ن" },
      { type: "choose", prompt: "«ز» را پیدا کن", say: "ز را پیدا کن", options: ["ر", "ز", "د", "ژ"], answer: "ز" },
      { type: "trace", letter: "ن", prompt: "با انگشتت «ن» بنویس" },
      { type: "blend", parts: ["نا", "ن"], word: "نان", pic: "🍞", say: "نا ... ن ... نان" },
      { type: "blend", parts: ["با", "ران"], word: "باران", pic: "🌧️", say: "با ... ران ... باران" },
      { type: "blend", parts: ["زَن", "بور"], word: "زَنبور", pic: "🐝", say: "زَن ... بور ... زنبور" },
      { type: "blend", parts: ["دَن", "دان"], word: "دَندان", pic: "🦷", say: "دَن ... دان ... دندان" },
      { type: "choose", show: "باران", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🍞", value: "نان" }, { label: "🌧️", value: "باران" }, { label: "🐝", value: "زَنبور" }], answer: "باران", pic: true },
      { type: "choose", show: "دَندان", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐝", value: "زَنبور" }, { label: "☀️", value: "روز" }, { label: "🦷", value: "دَندان" }], answer: "دَندان", pic: true },
      { type: "passage", text: "مادَر نان دارد.", question: "مادر چه دارد؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🍞", value: "نان" }, { label: "🦷", value: "دَندان" }], answer: "نان", pic: true }
    ]
  },
  {
    id: "read-sapling-4", subject: "read", level: "sapling", emoji: "✏️", title: "«ش» و «ـِ»",
    steps: [
      { type: "intro", letter: "ش", text: "این «ش» است؛ مثل صدای آخر «موش».", say: "ش. مثل موش",
        forms: [["ش", "تنها"], ["شـ", "اول"], ["ـشـ", "وسط"], ["ـش", "آخر"]], example: { pic: "🐭", word: "موش" } },
      { type: "intro", letter: "اِ", text: "این نشانه «زیر» است و صدای «اِ» می‌دهد. اول کلمه زیر «ا» می‌نشیند و جاهای دیگر زیر خود حرف.", say: "اِ. مثل مداد",
        forms: [["اِ", "اول کلمه"], ["مِ", "زیر حرف"], ["شِ", "زیر حرف"]], example: { pic: "✏️", word: "مِداد" } },
      { type: "choose", prompt: "«ش» را پیدا کن", say: "ش را پیدا کن", options: ["س", "ش", "ث", "ز"], answer: "ش" },
      { type: "choose", prompt: "کدام «مِ» است؟", say: "کدام مِ است؟", options: ["مَ", "ما", "مِ"], answer: "مِ" },
      { type: "trace", letter: "ش", prompt: "با انگشتت «ش» بنویس" },
      { type: "blend", parts: ["مو", "ش"], word: "موش", pic: "🐭", say: "مو ... ش ... موش" },
      { type: "blend", parts: ["ما", "شین"], word: "ماشین", pic: "🚗", say: "ما ... شین ... ماشین" },
      { type: "blend", parts: ["مِ", "داد"], word: "مِداد", pic: "✏️", say: "مِ ... داد ... مداد" },
      { type: "choose", show: "شیر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐭", value: "موش" }, { label: "🥛", value: "شیر" }, { label: "🚗", value: "ماشین" }], answer: "شیر", pic: true },
      { type: "choose", show: "مِداد", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "✏️", value: "مِداد" }, { label: "🏊", value: "شِنا" }, { label: "🍞", value: "نان" }], answer: "مِداد", pic: true },
      { type: "passage", text: "موش با ماشین می‌رود.", question: "موش با کدام می‌رود؟",
        options: [{ label: "🐝", value: "زَنبور" }, { label: "🚗", value: "ماشین" }, { label: "☁️", value: "اَبر" }], answer: "ماشین", pic: true }
    ]
  },
  {
    id: "read-sapling-5", subject: "read", level: "sapling", emoji: "🦆", title: "«ـُ» و «ک»",
    steps: [
      { type: "intro", letter: "ک", text: "این «ک» است؛ مثل صدای اول «کِتاب».", say: "ک. مثل کتاب",
        forms: [["ک", "تنها"], ["کـ", "اول"], ["ـکـ", "وسط"], ["ـک", "آخر"]], example: { pic: "📖", word: "کِتاب" } },
      { type: "intro", letter: "اُ", text: "این نشانه «پیش» است و صدای «اُ» می‌دهد. اول کلمه روی «ا» می‌نشیند و جاهای دیگر روی خود حرف.", say: "اُ. مثل اردک",
        forms: [["اُ", "اول کلمه"], ["کُ", "روی حرف"], ["دُ", "روی حرف"]], example: { pic: "🦆", word: "اُردَک" } },
      { type: "choose", prompt: "«ک» را پیدا کن", say: "ک را پیدا کن", options: ["گ", "ل", "ک", "ن"], answer: "ک" },
      { type: "choose", prompt: "کدام «کُ» است؟", say: "کدام کُ است؟", options: ["کَ", "کُ", "کِ"], answer: "کُ" },
      { type: "trace", letter: "ک", prompt: "با انگشتت «ک» بنویس" },
      { type: "blend", parts: ["اُر", "دَک"], word: "اُردَک", pic: "🦆", say: "اُر ... دَک ... اردک" },
      { type: "blend", parts: ["کَ", "بو", "تَر"], word: "کَبوتَر", pic: "🕊️", say: "کَ ... بو ... تَر ... کبوتر" },
      { type: "blend", parts: ["باد", "با", "دَک"], word: "بادبادَک", pic: "🪁", say: "باد ... با ... دَک ... بادبادک" },
      { type: "choose", show: "کِتاب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🦆", value: "اُردَک" }, { label: "🧥", value: "کُت" }, { label: "📖", value: "کِتاب" }], answer: "کِتاب", pic: true },
      { type: "choose", show: "بادبادَک", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🪁", value: "بادبادَک" }, { label: "🕊️", value: "کَبوتَر" }, { label: "🚗", value: "ماشین" }], answer: "بادبادَک", pic: true },
      { type: "passage", text: "اُردَک در آب است. کَبوتَر سَر بام است.", question: "کدام سر بام است؟",
        options: [{ label: "🦆", value: "اُردَک" }, { label: "🕊️", value: "کَبوتَر" }], answer: "کَبوتَر", pic: true }
    ]
  },
  {
    id: "read-sapling-29", subject: "read", level: "sapling", emoji: "🏋️", title: "«و»",
    steps: [
      { type: "intro", letter: "و", text: "«و» گاهی صدای «و» می‌دهد، مثل اول «وَرزِش» و وسط «دَوا».", say: "و. مثل ورزش. مثل دوا",
        forms: [["و", "تنها"], ["ـو", "چسبیده"]], example: { pic: "🏋️", word: "وَرزِش" } },
      { type: "choose", prompt: "«و» را پیدا کن", say: "و را پیدا کن", options: ["ر", "و", "د", "ز"], answer: "و" },
      { type: "trace", letter: "و", prompt: "با انگشتت «و» بنویس", say: "و را بنویس: اول سرش را گرد بکش، بعد دمش را پایین بیاور." },
      { type: "blend", parts: ["وَر", "زِش"], word: "وَرزِش", pic: "🏋️", say: "وَر ... زِش ... ورزش" },
      { type: "blend", parts: ["دَ", "وا"], word: "دَوا", pic: "💊", say: "دَ ... وا ... دوا" },
      { type: "blend", parts: ["آ", "واز"], word: "آواز", pic: "🎶", say: "آ ... واز ... آواز" },
      // «او» (u) or «و» (v): the same letter, two sounds.
      { type: "choose", show: "دَوا", prompt: "در «دَوا»، «و» چه صدایی دارد؟ مثل «وَرزِش» یا مثل «توت»؟", say: "دوا. و در دوا چه صدایی دارد؟ مثل ورزش، یا مثل توت؟",
        options: [{ label: "🏋️", value: "و" }, { label: "🍓", value: "او" }], answer: "و", pic: true },
      { type: "passage", text: "سارا وَ نیما وَرزِش کَردَند. بابا آمَد. بابا آب داد.", question: "سارا و نیما چه کار کردند؟",
        options: [{ label: "🏋️", value: "ورزش" }, { label: "🎶", value: "آواز" }], answer: "ورزش", pic: true },
      { type: "passage", text: "بابا وُ ماما آمَدَند. بابا نان وُ ماست آوَرد.", question: "بابا چه آورد؟ (اینجا «وُ» یعنی «و»، مثل وقتی حرف می‌زنیم.)",
        options: [{ label: "🍞", value: "نان و ماست" }, { label: "🍎", value: "سیب" }], answer: "نان و ماست", pic: true }
    ]
  },
  {
    id: "read-sapling-18", subject: "read", level: "sapling", emoji: "🧩", title: "بازی کلمه‌ها",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["موش", "🐭"], ["نان", "🍞"], ["کِتاب", "📖"], ["دَست", "✋"]] },
      { type: "build", pic: "📖", word: "کِتاب", parts: ["کِ", "تا", "ب"], extra: ["شِ"], say: "کتاب" },
      { type: "build", pic: "🚗", word: "ماشین", parts: ["ما", "شین"], extra: ["مو"], say: "ماشین" },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ک" }, { label: "م" }],
        items: [{ label: "کِتاب", basket: "ک" }, { label: "مادَر", basket: "م" }, { label: "کَبوتَر", basket: "ک" },
          { label: "موش", basket: "م" }, { label: "کُت", basket: "ک" }, { label: "مِداد", basket: "م" }] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["موش", "با", "ماشین", "می‌رود."] },
      { type: "build", pic: "🐝", word: "زَنبور", parts: ["زَن", "بور"], extra: ["نا"], say: "زنبور" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["اُردَک", "در", "آب", "است."] }
    ]
  },
  {
    id: "read-sapling-6", subject: "read", level: "sapling", emoji: "📖", title: "جمله بخوانیم، معنا بفهمیم",
    steps: [
      { type: "passage", text: "سارا کِتاب دارد. کِتابِ سارا آبی است.", question: "کتاب سارا آبی است یا سبز؟",
        options: ["سَبز", "آبی"], answer: "آبی" },
      { type: "passage", text: "بابا نان دارد. مادَر شیر دارد. بَرادَر سیب دارد.", question: "برادر چه دارد؟",
        options: [{ label: "🍞", value: "نان" }, { label: "🥛", value: "شیر" }, { label: "🍎", value: "سیب" }], answer: "سیب", pic: true },
      { type: "passage", text: "اِمروز باران آمد. آسمان اَبری است.", question: "امروز هوا چطور است؟",
        options: [{ label: "☀️", value: "آفتابی" }, { label: "🌧️", value: "بارانی" }], answer: "بارانی", pic: true },
      { type: "passage", text: "سینا بادبادَک دارد. سینا و نیما با بادبادَک بازی می‌کُنَند. نیما شاد است.", question: "سینا با چه کسی بازی می‌کند؟",
        options: ["سارا", "نیما", "مادَر"], answer: "نیما" }
    ]
  },
  // The rest of the alphabet, in the first-grade textbook order: ه/ـه، پ، ل، ج، گ، چ، خ، ف، ق، ی (یـ)، ژ،
  // then the letters that share a sound (ص ث، ذ ض ظ، ط، ح، ع غ), and finally تشدید and تنوین.
  // Check with: node tools/check-reading.js
  {
    id: "read-sapling-7", subject: "read", level: "sapling", emoji: "🌙", title: "«ه» و «ـه»",
    steps: [
      { type: "intro", letter: "ه", text: "این «ه» است؛ مثل صدای آخر «ماه».", say: "ه. مثل ماه",
        forms: [["ه", "تنها"], ["هـ", "اول"], ["ـهـ", "وسط"], ["ـه", "آخر"]], example: { pic: "🌙", word: "ماه" } },
      { type: "intro", letter: "ـه", text: "«ه» آخر کلمه گاهی صدای «اِ» می‌دهد؛ مثل «نامه».", say: "اِ. مثل نامه",
        forms: [["ـه", "چسبیده"], ["ه", "جدا"]], example: { pic: "✉️", word: "نامه" } },
      { type: "choose", prompt: "«ه» را پیدا کن", say: "ه را پیدا کن", options: ["ح", "م", "ه", "ع"], answer: "ه" },
      { type: "choose", prompt: "«ـه» را پیدا کن", say: "ه را پیدا کن", options: ["ـم", "ـه", "ـن", "ـع"], answer: "ـه" },
      { type: "trace", letter: "ه", prompt: "با انگشتت «ه» بنویس" },
      { type: "blend", parts: ["ما", "ه"], word: "ماه", pic: "🌙", say: "ما ... ه ... ماه" },
      { type: "blend", parts: ["کو", "ه"], word: "کوه", pic: "⛰️", say: "کو ... ه ... کوه" },
      { type: "blend", parts: ["نا", "مه"], word: "نامه", pic: "✉️", say: "نا ... مه ... نامه" },
      { type: "blend", parts: ["سَب", "زه"], word: "سَبزه", pic: "🌱", say: "سَب ... زه ... سبزه" },
      { type: "choose", show: "کوه", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌙", value: "ماه" }, { label: "⛰️", value: "کوه" }, { label: "✉️", value: "نامه" }], answer: "کوه", pic: true },
      { type: "choose", show: "🌱", prompt: "کدام کلمه «سَبزه» است؟", say: "کدام کلمه سبزه است؟", options: ["نامه", "سَبزه", "ماه"], answer: "سَبزه" },
      { type: "passage", text: "مادَر سَبزه کاشت. سَبزه سَبز شُد.", question: "مادر چه کاشت؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🌱", value: "سَبزه" }, { label: "🌰", value: "بادام" }], answer: "سَبزه", pic: true }
    ]
  },
  {
    id: "read-sapling-8", subject: "read", level: "sapling", emoji: "🐢", title: "«پ» و «ل»",
    steps: [
      { type: "intro", letter: "پ", text: "این «پ» است؛ مثل صدای آخر «توپ». «پ» سه نقطه زیرش دارد.", say: "پ. مثل توپ",
        forms: [["پ", "تنها"], ["پـ", "اول"], ["ـپـ", "وسط"], ["ـپ", "آخر"]], example: { pic: "⚽", word: "توپ" } },
      { type: "intro", letter: "ل", text: "این «ل» است؛ مثل صدای اول «لاله».", say: "ل. مثل لاله",
        forms: [["ل", "تنها"], ["لـ", "اول"], ["ـلـ", "وسط"], ["ـل", "آخر"]], example: { pic: "🌷", word: "لاله" } },
      { type: "choose", prompt: "«پ» را پیدا کن", say: "پ را پیدا کن", options: ["ب", "ت", "پ", "ث"], answer: "پ" },
      { type: "choose", prompt: "«ل» را پیدا کن", say: "ل را پیدا کن", options: ["ل", "ک", "ا", "د"], answer: "ل" },
      { type: "trace", letter: "ل", prompt: "با انگشتت «ل» بنویس" },
      { type: "blend", parts: ["تو", "پ"], word: "توپ", pic: "⚽", say: "تو ... پ ... توپ" },
      { type: "blend", parts: ["لا", "له"], word: "لاله", pic: "🌷", say: "لا ... له ... لاله" },
      { type: "blend", parts: ["بُل", "بُل"], word: "بُلبُل", pic: "🐦", say: "بُل ... بُل ... بلبل" },
      { type: "blend", parts: ["لاک", "پُشت"], word: "لاک‌پُشت", pic: "🐢", say: "لاک ... پُشت ... لاک‌پشت" },
      { type: "choose", show: "لاک‌پُشت", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "⚽", value: "توپ" }, { label: "🌷", value: "لاله" }, { label: "🐢", value: "لاک‌پُشت" }], answer: "لاک‌پُشت", pic: true },
      { type: "choose", show: "پا", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🦶", value: "پا" }, { label: "🐦", value: "بُلبُل" }, { label: "✋", value: "دَست" }], answer: "پا", pic: true },
      { type: "passage", text: "نَسرین توپ دارد. نَسرین با توپ بازی می‌کُنَد.", question: "نسرین با چه بازی می‌کند؟",
        options: [{ label: "🪁", value: "بادبادَک" }, { label: "📖", value: "کِتاب" }, { label: "⚽", value: "توپ" }], answer: "توپ", pic: true }
    ]
  },
  {
    id: "read-sapling-9", subject: "read", level: "sapling", emoji: "🐥", title: "«ج» و «گ»",
    steps: [
      { type: "intro", letter: "ج", text: "این «ج» است؛ مثل صدای اول «جوجه».", say: "ج. مثل جوجه",
        forms: [["ج", "تنها"], ["جـ", "اول"], ["ـجـ", "وسط"], ["ـج", "آخر"]], example: { pic: "🐥", word: "جوجه" } },
      { type: "intro", letter: "گ", text: "این «گ» است؛ مثل صدای اول «گُل». «گ» مثل «ک» است، با یک سرکش بیشتر.", say: "گ. مثل گل",
        forms: [["گ", "تنها"], ["گـ", "اول"], ["ـگـ", "وسط"], ["ـگ", "آخر"]], example: { pic: "🌸", word: "گُل" } },
      { type: "choose", prompt: "«ج» را پیدا کن", say: "ج را پیدا کن", options: ["چ", "خ", "ج", "ح"], answer: "ج" },
      { type: "choose", prompt: "«گ» را پیدا کن", say: "گ را پیدا کن", options: ["ک", "گ", "ل", "ق"], answer: "گ" },
      { type: "trace", letter: "ج", prompt: "با انگشتت «ج» بنویس" },
      { type: "blend", parts: ["جو", "جه"], word: "جوجه", pic: "🐥", say: "جو ... جه ... جوجه" },
      { type: "blend", parts: ["اَن", "گور"], word: "اَنگور", pic: "🍇", say: "اَن ... گور ... انگور" },
      { type: "blend", parts: ["جو", "راب"], word: "جوراب", pic: "🧦", say: "جو ... راب ... جوراب" },
      { type: "blend", parts: ["پَن", "جَ", "ره"], word: "پَنجَره", pic: "🪟", say: "پَن ... جَ ... ره ... پنجره" },
      { type: "choose", show: "اَنگور", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐥", value: "جوجه" }, { label: "🍇", value: "اَنگور" }, { label: "🌸", value: "گُل" }], answer: "اَنگور", pic: true },
      { type: "choose", show: "👂", prompt: "کدام کلمه «گوش» است؟", say: "کدام کلمه گوش است؟", options: ["موش", "گُل", "گوش"], answer: "گوش" },
      { type: "passage", text: "جوجه زیر سَبَد است. جوجه زَرد است.", question: "جوجه چه رنگی است؟",
        options: [{ label: "🔴", value: "قرمز" }, { label: "🟡", value: "زرد" }, { label: "⚫", value: "سیاه" }], answer: "زرد", pic: true }
    ]
  },
  {
    id: "read-sapling-10", subject: "read", level: "sapling", emoji: "☂️", title: "«چ» و «خ»",
    steps: [
      { type: "intro", letter: "چ", text: "این «چ» است؛ مثل صدای اول «چَتر». «چ» سه نقطه دارد.", say: "چ. مثل چتر",
        forms: [["چ", "تنها"], ["چـ", "اول"], ["ـچـ", "وسط"], ["ـچ", "آخر"]], example: { pic: "☂️", word: "چَتر" } },
      { type: "intro", letter: "خ", text: "این «خ» است؛ مثل صدای اول «خانه». «خ» یک نقطه رویش دارد.", say: "خ. مثل خانه",
        forms: [["خ", "تنها"], ["خـ", "اول"], ["ـخـ", "وسط"], ["ـخ", "آخر"]], example: { pic: "🏡", word: "خانه" } },
      { type: "choose", prompt: "«چ» را پیدا کن", say: "چ را پیدا کن", options: ["ج", "چ", "خ", "ح"], answer: "چ" },
      { type: "choose", prompt: "«خ» را پیدا کن", say: "خ را پیدا کن", options: ["ج", "ح", "چ", "خ"], answer: "خ" },
      { type: "trace", letter: "خ", prompt: "با انگشتت «خ» بنویس" },
      { type: "blend", parts: ["چَ", "تر"], word: "چَتر", pic: "☂️", say: "چَ ... تر ... چتر" },
      { type: "blend", parts: ["چَش", "م"], word: "چَشم", pic: "👁️", say: "چَش ... م ... چشم" },
      { type: "blend", parts: ["خُ", "روس"], word: "خُروس", pic: "🐓", say: "خُ ... روس ... خروس" },
      { type: "blend", parts: ["دِ", "رَخت"], word: "دِرَخت", pic: "🌳", say: "دِ ... رَخت ... درخت" },
      { type: "choose", show: "خُروس", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐥", value: "جوجه" }, { label: "🐝", value: "زَنبور" }, { label: "🐓", value: "خُروس" }], answer: "خُروس", pic: true },
      { type: "choose", show: "🌳", prompt: "کدام کلمه «دِرَخت» است؟", say: "کدام کلمه درخت است؟", options: ["دِرَخت", "خانه", "چَتر"], answer: "دِرَخت" },
      { type: "passage", text: "باران می‌بارَد. سارا چَتر دارد. سارا زیر چَتر است.", question: "سارا زیر چه چیزی است؟",
        options: [{ label: "🌳", value: "دِرَخت" }, { label: "☂️", value: "چَتر" }, { label: "🏡", value: "خانه" }], answer: "چَتر", pic: true }
    ]
  },
  {
    id: "read-sapling-11", subject: "read", level: "sapling", emoji: "🐘", title: "«ف» و «ق»",
    steps: [
      { type: "intro", letter: "ف", text: "این «ف» است؛ مثل صدای اول «فیل».", say: "ف. مثل فیل",
        forms: [["ف", "تنها"], ["فـ", "اول"], ["ـفـ", "وسط"], ["ـف", "آخر"]], example: { pic: "🐘", word: "فیل" } },
      { type: "intro", letter: "ق", text: "این «ق» است؛ مثل صدای اول «قاشُق». «ق» دو نقطه دارد.", say: "ق. مثل قاشق",
        forms: [["ق", "تنها"], ["قـ", "اول"], ["ـقـ", "وسط"], ["ـق", "آخر"]], example: { pic: "🥄", word: "قاشُق" } },
      { type: "choose", prompt: "«ف» را پیدا کن", say: "ف را پیدا کن", options: ["ق", "ف", "غ", "ع"], answer: "ف" },
      { type: "choose", prompt: "«ق» را پیدا کن", say: "ق را پیدا کن", options: ["ف", "ن", "ق", "غ"], answer: "ق" },
      { type: "trace", letter: "ق", prompt: "با انگشتت «ق» بنویس" },
      { type: "blend", parts: ["بَر", "ف"], word: "بَرف", pic: "❄️", say: "بَر ... ف ... برف" },
      { type: "blend", parts: ["کَف", "ش"], word: "کَفش", pic: "👟", say: "کَف ... ش ... کفش" },
      { type: "blend", parts: ["قا", "شُق"], word: "قاشُق", pic: "🥄", say: "قا ... شُق ... قاشق" },
      { type: "blend", parts: ["بُش", "قاب"], word: "بُشقاب", pic: "🍽️", say: "بُش ... قاب ... بشقاب" },
      { type: "choose", show: "بُشقاب", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🍽️", value: "بُشقاب" }, { label: "🥄", value: "قاشُق" }, { label: "👟", value: "کَفش" }], answer: "بُشقاب", pic: true },
      { type: "choose", show: "🐘", prompt: "کدام کلمه «فیل» است؟", say: "کدام کلمه فیل است؟", options: ["بَرف", "فیل", "کَفش"], answer: "فیل" },
      { type: "passage", text: "اِمروز بَرف آمد. آرَش کَفش پوشید و بیرون رَفت.", question: "امروز چه آمد؟",
        options: [{ label: "🌧️", value: "باران" }, { label: "❄️", value: "بَرف" }, { label: "🌬️", value: "باد" }], answer: "بَرف", pic: true }
    ]
  },
  {
    id: "read-sapling-19", subject: "read", level: "sapling", emoji: "🎲", title: "بازی کلمه‌ها ۲",
    steps: [
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ج" }, { label: "چ" }],
        items: [{ label: "جوجه", basket: "ج" }, { label: "چَتر", basket: "چ" }, { label: "جوراب", basket: "ج" }, { label: "چَشم", basket: "چ" }] },
      { type: "build", pic: "🥄", word: "قاشُق", parts: ["قا", "شُق"], extra: ["فا"], say: "قاشق" },
      { type: "build", pic: "❄️", word: "بَرف", parts: ["بَ", "ر", "ف"], extra: ["ق"], say: "برف" },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["فیل", "🐘"], ["خانه", "🏡"], ["گُل", "🌸"], ["توپ", "⚽"]] },
      { type: "build", pic: "🐓", word: "خُروس", parts: ["خُ", "روس"], extra: ["چَ"], say: "خروس" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["سارا", "زیر", "چَتر", "است."] }
    ]
  },
  {
    id: "read-sapling-12", subject: "read", level: "sapling", emoji: "🧥", title: "«یـ» و «ژ»",
    steps: [
      { type: "intro", letter: "یـ", text: "«ی» صدای «یـ» هم می‌دهد؛ مثل صدای اول «یَخ».", say: "یَ. مثل یخ",
        forms: [["یـ", "اول"], ["ـیـ", "وسط"], ["ی", "آخر"]], example: { pic: "🧊", word: "یَخ" } },
      { type: "intro", letter: "ژ", text: "این «ژ» است؛ مثل صدای اول «ژاکَت». «ژ» مثل «ز» است، با سه نقطه. به حرف بعدی نمی‌چسبد.", say: "ژ. مثل ژاکت",
        forms: [["ژ", "تنها"], ["ـژ", "آخر"]], example: { pic: "🧥", word: "ژاکَت" } },
      { type: "choose", prompt: "«ژ» را پیدا کن", say: "ژ را پیدا کن", options: ["ز", "ر", "ژ", "ش"], answer: "ژ" },
      { type: "choose", prompt: "کدام «یَ» است؟", say: "کدام یَ است؟", options: ["یَ", "یِ", "یُ"], answer: "یَ" },
      { type: "trace", letter: "ژ", prompt: "با انگشتت «ژ» بنویس" },
      { type: "blend", parts: ["یَ", "خ"], word: "یَخ", pic: "🧊", say: "یَ ... خ ... یخ" },
      { type: "blend", parts: ["یوز", "پَ", "لَنگ"], word: "یوزپَلَنگ", pic: "🐆", say: "یوز ... پَ ... لَنگ ... یوزپلنگ" },
      { type: "blend", parts: ["قا", "یِق"], word: "قایِق", pic: "⛵", say: "قا ... یِق ... قایق" },
      { type: "blend", parts: ["ژا", "کَت"], word: "ژاکَت", pic: "🧥", say: "ژا ... کَت ... ژاکت" },
      { type: "choose", show: "قایِق", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧊", value: "یَخ" }, { label: "⛵", value: "قایِق" }, { label: "🧅", value: "پیاز" }], answer: "قایِق", pic: true },
      { type: "choose", show: "🧅", prompt: "کدام کلمه «پیاز» است؟", say: "کدام کلمه پیاز است؟", options: ["پیاز", "یَخ", "ژاکَت"], answer: "پیاز" },
      { type: "passage", text: "بَرف می‌آیَد. آب یَخ زَد. سارا ژاکَت پوشید.", question: "سارا چه پوشید؟",
        options: [{ label: "👟", value: "کَفش" }, { label: "🧦", value: "جوراب" }, { label: "🧥", value: "ژاکَت" }], answer: "ژاکَت", pic: true }
    ]
  },
  {
    id: "read-sapling-30", subject: "read", level: "sapling", emoji: "👧", title: "«خود» و «خواهر»",
    steps: [
      { type: "intro", letter: "و", write: "", text: "در «تو»، «دو» و «خود»، «و» صدای «اُ» می‌دهد.", say: "تو. دو. خود. اینجا و صدای اُ می‌دهد.",
        forms: [["تو", "تُ"], ["دو", "دُ"], ["خود", "خُد"]], example: { pic: "2️⃣", word: "دو" } },
      { type: "intro", letter: "خوا", write: "", text: "در «خوا»، «و» خوانده نمی‌شود: «خواهر» را «خاهَر» می‌خوانیم.", say: "خواهر. خواب. خواندن. اینجا و خوانده نمی‌شود.",
        forms: [["خواهَر", "خاهَر"], ["خواب", "خاب"], ["خوانَدَن", "خانَدَن"]], example: { pic: "👧", word: "خواهَر" } },
      { type: "blend", parts: ["خوا", "هَر"], word: "خواهَر", pic: "👧", say: "خا ... هَر ... خواهر" },
      { type: "blend", parts: ["خو", "ش"], word: "خوش", pic: "😄", say: "خُ ... ش ... خوش" },
      { type: "choose", show: "خواب", prompt: "«خواب» را چطور می‌خوانیم؟", say: "این کلمه را چطور می‌خوانیم؟ خاب؟ یا خواب با صدای و؟",
        options: [{ label: "😴", value: "خاب" }, { label: "🏋️", value: "خواب با صدای و" }], answer: "خاب", pic: true },
      { type: "choose", show: "😴", prompt: "کدام کلمه «خواب» است؟", say: "کدام کلمه خواب است؟", options: ["خوب", "خواب", "خود"], answer: "خواب" },
      { type: "passage", text: "خواهَرَم دو کِتاب دارَد. او کِتاب را خوب می‌خوانَد. اَلان خواب است.", question: "خواهر حالا چه کار می‌کند؟",
        options: [{ label: "😴", value: "خواب است" }, { label: "📖", value: "کتاب می‌خواند" }, { label: "🍎", value: "سیب می‌خورد" }], answer: "خواب است", pic: true },
      { type: "passage", text: "تو چه داری؟ مَن یِک توپ دارَم. خودَم توپ را خَریدَم.", question: "چه کسی توپ را خرید؟",
        options: [{ label: "👨", value: "بابا" }, { label: "🧒", value: "خودم" }], answer: "خودم", pic: true }
    ]
  },
  {
    id: "read-sapling-13", subject: "read", level: "sapling", emoji: "🧼", title: "«ص» و «ث»",
    steps: [
      { type: "intro", letter: "ص", text: "این «ص» است. صدایش مثل «س» است، اما شکلش فرق دارد؛ مثل «صابون».", say: "ص. مثل صابون",
        forms: [["ص", "تنها"], ["صـ", "اول"], ["ـصـ", "وسط"], ["ـص", "آخر"]], example: { pic: "🧼", word: "صابون" } },
      { type: "intro", letter: "ث", text: "این «ث» است. صدای «ث» هم مثل «س» است؛ مثل «ثانیه». «ث» سه نقطه دارد.", say: "ث. مثل ثانیه",
        forms: [["ث", "تنها"], ["ثـ", "اول"], ["ـثـ", "وسط"], ["ـث", "آخر"]], example: { pic: "⏱️", word: "ثانیه" } },
      { type: "choose", prompt: "«ص» را پیدا کن", say: "ص را پیدا کن", options: ["س", "ض", "ص", "ط"], answer: "ص" },
      { type: "choose", prompt: "«ث» را پیدا کن", say: "ث را پیدا کن", options: ["ت", "ث", "ن", "پ"], answer: "ث" },
      { type: "trace", letter: "ص", prompt: "با انگشتت «ص» بنویس" },
      { type: "blend", parts: ["صا", "بون"], word: "صابون", pic: "🧼", say: "صا ... بون ... صابون" },
      { type: "blend", parts: ["صَن", "دَ", "لی"], word: "صَندَلی", pic: "🪑", say: "صَن ... دَ ... لی ... صندلی" },
      { type: "blend", parts: ["ثا", "نیه"], word: "ثانیه", pic: "⏱️", say: "ثا ... نیه ... ثانیه" },
      { type: "choose", show: "صَندَلی", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧼", value: "صابون" }, { label: "🪑", value: "صَندَلی" }, { label: "⏱️", value: "ثانیه" }], answer: "صَندَلی", pic: true },
      { type: "choose", show: "🧼", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["سابون", "صابون"], answer: "صابون" },
      { type: "passage", text: "سارا با آب و صابون دَست شُست. دَست سارا تَمیز شُد.", question: "سارا با چه دست شست؟",
        options: [{ label: "🪑", value: "صَندَلی" }, { label: "🍞", value: "نان" }, { label: "🧼", value: "صابون" }], answer: "صابون", pic: true }
    ]
  },
  {
    id: "read-sapling-14", subject: "read", level: "sapling", emoji: "🌽", title: "«ذ»، «ض» و «ظ»",
    steps: [
      { type: "intro", letter: "ذ", text: "این «ذ» است. صدایش مثل «ز» است؛ مثل «ذُرَت». «ذ» به حرف بعدی نمی‌چسبد.", say: "ذ. مثل ذرت",
        forms: [["ذ", "تنها"], ["ـذ", "آخر"]], example: { pic: "🌽", word: "ذُرَت" } },
      { type: "intro", letter: "ض", text: "این «ض» است. صدای «ض» هم مثل «ز» است؛ مثل «مَریض».", say: "ض. مثل مریض",
        forms: [["ض", "تنها"], ["ضـ", "اول"], ["ـضـ", "وسط"], ["ـض", "آخر"]], example: { pic: "🤒", word: "مَریض" } },
      { type: "intro", letter: "ظ", text: "این «ظ» است. صدای «ظ» هم مثل «ز» است؛ مثل «ظَرف».", say: "ظ. مثل ظرف",
        forms: [["ظ", "تنها"], ["ظـ", "اول"], ["ـظـ", "وسط"], ["ـظ", "آخر"]], example: { pic: "🥣", word: "ظَرف" } },
      { type: "choose", prompt: "«ذ» را پیدا کن", say: "ذ را پیدا کن", options: ["د", "ز", "ذ", "ر"], answer: "ذ" },
      { type: "choose", prompt: "«ظ» را پیدا کن", say: "ظ را پیدا کن", options: ["ط", "ظ", "ض", "ص"], answer: "ظ" },
      { type: "trace", letter: "ض", prompt: "با انگشتت «ض» بنویس" },
      { type: "blend", parts: ["ذُ", "رَت"], word: "ذُرَت", pic: "🌽", say: "ذُ ... رَت ... ذرت" },
      { type: "blend", parts: ["مَ", "ریض"], word: "مَریض", pic: "🤒", say: "مَ ... ریض ... مریض" },
      { type: "blend", parts: ["ظَر", "ف"], word: "ظَرف", pic: "🥣", say: "ظَر ... ف ... ظرف" },
      { type: "choose", show: "ظَرف", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🌽", value: "ذُرَت" }, { label: "🥣", value: "ظَرف" }, { label: "🤒", value: "مَریض" }], answer: "ظَرف", pic: true },
      { type: "choose", show: "🌽", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["ذُرَت", "زُرَت"], answer: "ذُرَت" },
      { type: "passage", text: "رِضا مَریض است. مادَر یک ظَرف سوپ بَرای رِضا بُرد.", question: "مادر برای رضا چه برد؟",
        options: [{ label: "🍲", value: "سوپ" }, { label: "🌽", value: "ذُرَت" }, { label: "🍞", value: "نان" }], answer: "سوپ", pic: true }
    ]
  },
  {
    id: "read-sapling-15", subject: "read", level: "sapling", emoji: "🦜", title: "«ط» و «ح»",
    steps: [
      { type: "intro", letter: "ط", text: "این «ط» است. صدایش مثل «ت» است؛ مثل «طوطی».", say: "ط. مثل طوطی",
        forms: [["ط", "تنها"], ["طـ", "اول"], ["ـطـ", "وسط"], ["ـط", "آخر"]], example: { pic: "🦜", word: "طوطی" } },
      { type: "intro", letter: "ح", text: "این «ح» است. صدایش مثل «ه» است؛ مثل «حَلَزون». «ح» نقطه ندارد.", say: "ح. مثل حلزون",
        forms: [["ح", "تنها"], ["حـ", "اول"], ["ـحـ", "وسط"], ["ـح", "آخر"]], example: { pic: "🐌", word: "حَلَزون" } },
      { type: "choose", prompt: "«ط» را پیدا کن", say: "ط را پیدا کن", options: ["ظ", "ص", "ت", "ط"], answer: "ط" },
      { type: "choose", prompt: "«ح» را پیدا کن", say: "ح را پیدا کن", options: ["ج", "ح", "خ", "چ"], answer: "ح" },
      { type: "trace", letter: "ط", prompt: "با انگشتت «ط» بنویس" },
      { type: "blend", parts: ["طو", "طی"], word: "طوطی", pic: "🦜", say: "طو ... طی ... طوطی" },
      { type: "blend", parts: ["قَ", "طار"], word: "قَطار", pic: "🚂", say: "قَ ... طار ... قطار" },
      { type: "blend", parts: ["حَ", "لَ", "زون"], word: "حَلَزون", pic: "🐌", say: "حَ ... لَ ... زون ... حلزون" },
      { type: "blend", parts: ["صُب", "حا", "نه"], word: "صُبحانه", pic: "🍳", say: "صُب ... حا ... نه ... صبحانه" },
      { type: "choose", show: "قَطار", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🐌", value: "حَلَزون" }, { label: "🦜", value: "طوطی" }, { label: "🚂", value: "قَطار" }], answer: "قَطار", pic: true },
      { type: "choose", show: "🦜", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["طوطی", "توتی"], answer: "طوطی" },
      { type: "passage", text: "حَسَن یک طوطی دارد. طوطی سَبز است. طوطی حَرف می‌زَنَد.", question: "طوطی حسن چه رنگی است؟",
        options: [{ label: "🟡", value: "زرد" }, { label: "🟢", value: "سبز" }, { label: "🔴", value: "قرمز" }], answer: "سبز", pic: true }
    ]
  },
  {
    id: "read-sapling-16", subject: "read", level: "sapling", emoji: "🐸", title: "«ع» و «غ»",
    steps: [
      { type: "intro", letter: "ع", text: "این «ع» است. صدایش مثل «اَ» در «اَسب» است؛ مثل «عَسَل».", say: "ع. مثل عسل",
        forms: [["ع", "تنها"], ["عـ", "اول"], ["ـعـ", "وسط"], ["ـع", "آخر"]], example: { pic: "🍯", word: "عَسَل" } },
      { type: "intro", letter: "غ", text: "این «غ» است. صدایش مثل «ق» است؛ مثل «مُرغ». «غ» یک نقطه رویش دارد.", say: "غ. مثل مرغ",
        forms: [["غ", "تنها"], ["غـ", "اول"], ["ـغـ", "وسط"], ["ـغ", "آخر"]], example: { pic: "🐔", word: "مُرغ" } },
      { type: "choose", prompt: "«ع» را پیدا کن", say: "ع را پیدا کن", options: ["غ", "ع", "ح", "ه"], answer: "ع" },
      { type: "choose", prompt: "«غ» را پیدا کن", say: "غ را پیدا کن", options: ["ع", "ف", "ق", "غ"], answer: "غ" },
      { type: "trace", letter: "ع", prompt: "با انگشتت «ع» بنویس" },
      { type: "blend", parts: ["عَ", "سَل"], word: "عَسَل", pic: "🍯", say: "عَ ... سَل ... عسل" },
      { type: "blend", parts: ["سا", "عَت"], word: "ساعَت", pic: "⏰", say: "سا ... عَت ... ساعت" },
      { type: "blend", parts: ["قور", "با", "غه"], word: "قورباغه", pic: "🐸", say: "قور ... با ... غه ... قورباغه" },
      { type: "blend", parts: ["تُخم", "مُرغ"], word: "تُخم‌مُرغ", pic: "🥚", say: "تُخم ... مُرغ ... تخم‌مرغ" },
      { type: "choose", show: "ساعَت", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "⏰", value: "ساعَت" }, { label: "🍯", value: "عَسَل" }, { label: "🐸", value: "قورباغه" }], answer: "ساعَت", pic: true },
      { type: "choose", show: "🍯", prompt: "کدام درست نوشته شده است؟", say: "کدام درست نوشته شده است؟", options: ["اَسَل", "عَسَل"], answer: "عَسَل" },
      { type: "passage", text: "مادَربُزُرگ در باغ مُرغ دارد. مُرغ تُخم گُذاشت.", question: "مرغ چه گذاشت؟",
        options: [{ label: "🍎", value: "سیب" }, { label: "🍯", value: "عَسَل" }, { label: "🥚", value: "تُخم" }], answer: "تُخم", pic: true }
    ]
  },
  {
    id: "read-sapling-17", subject: "read", level: "sapling", emoji: "🪚", title: "«ـّ» و «ـً»",
    steps: [
      { type: "intro", letter: "ـّ", text: "این نشانه «تَشدید» است. حرفی که تشدید دارد دو بار خوانده می‌شود؛ مثل «اَرّه».", say: "تشدید. مثل اره",
        forms: [["رّ", "روی حرف"], ["بّ", "روی حرف"], ["چّ", "روی حرف"]], example: { pic: "🪚", word: "اَرّه" } },
      { type: "intro", letter: "اً", text: "این نشانه «تَنوین» است. «اً» آخر کلمه صدای «اَن» می‌دهد؛ مثل «لُطفاً».", say: "تنوین. مثل لطفاً",
        forms: [["اً", "آخر کلمه"]], example: { pic: "🙏", word: "لُطفاً" } },
      { type: "choose", prompt: "کدام نشانه «تشدید» است؟", say: "کدام نشانه تشدید است؟", options: ["ـً", "ـّ", "ـُ"], answer: "ـّ" },
      { type: "choose", prompt: "کدام نشانه «تنوین» است؟", say: "کدام نشانه تنوین است؟", options: ["ـً", "ـَ", "ـّ"], answer: "ـً" },
      { type: "trace", letter: "اً", prompt: "با انگشتت «اً» بنویس" },
      { type: "blend", parts: ["اَر", "ره"], word: "اَرّه", pic: "🪚", say: "اَر ... ره ... اره" },
      { type: "blend", parts: ["بَچ", "چه"], word: "بَچّه", pic: "🧒", say: "بَچ ... چه ... بچه" },
      { type: "blend", parts: ["مُ", "رَب", "با"], word: "مُرَبّا", pic: "🍓", say: "مُ ... رَب ... با ... مربا" },
      { type: "blend", parts: ["لُط", "فاً"], word: "لُطفاً", pic: "🙏", say: "لُط ... فَن ... لطفاً" },
      { type: "choose", show: "مُرَبّا", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧒", value: "بَچّه" }, { label: "🍓", value: "مُرَبّا" }, { label: "🪚", value: "اَرّه" }], answer: "مُرَبّا", pic: true },
      { type: "choose", show: "🧒", prompt: "کدام کلمه «بَچّه» است؟", say: "کدام کلمه بچه است؟", options: ["بَچّه", "اَرّه", "لُطفاً"], answer: "بَچّه" },
      { type: "passage", text: "بَچّه‌ها در حَیاط بازی می‌کُنَند. مادَربُزُرگ می‌گوید: «لُطفاً آرام بازی کُنید.»", question: "بچه‌ها کجا بازی می‌کنند؟",
        options: ["کِلاس", "حَیاط", "باغ"], answer: "حَیاط" }
    ]
  },
  {
    id: "read-sapling-20", subject: "read", level: "sapling", emoji: "🎭", title: "«ء» و «ئـ»",
    steps: [
      { type: "intro", letter: "ء", text: "این «هَمزه» است. «ء» صدایی مثل «اَ» دارد، کوتاه و بُریده؛ مثل آخر «جُزء».", say: "همزه. مثل جزء",
        forms: [["ء", "تنها"], ["ئـ", "روی دندانه"], ["ئ", "روی «ی»"]], example: { pic: "🧩", word: "جُزء" } },
      { type: "intro", letter: "ئـ", text: "همزه روی دندانه هم می‌نشیند: «ئـ». مثل «تِئاتر» و «مَسئَله».", say: "مثل تئاتر",
        forms: [["ئـ", "اول یا وسط"], ["ـئـ", "وسط"]], example: { pic: "🎭", word: "تِئاتر" } },
      { type: "choose", prompt: "کدام «همزه» است؟", say: "کدام همزه است؟", options: ["ع", "ء", "ه"], answer: "ء" },
      { type: "trace", letter: "ء", prompt: "با انگشتت «ء» بنویس" },
      { type: "blend", parts: ["تِ", "ئا", "تر"], word: "تِئاتر", pic: "🎭", say: "تِ ... ئا ... تر ... تئاتر" },
      { type: "blend", parts: ["مَس", "ئَ", "له"], word: "مَسئَله", pic: "🧮", say: "مَس ... ئَ ... له ... مسئله" },
      { type: "choose", show: "تِئاتر", prompt: "بخوان. تصویرش کدام است؟",
        options: [{ label: "🧮", value: "مَسئَله" }, { label: "🎭", value: "تِئاتر" }, { label: "🧩", value: "جُزء" }], answer: "تِئاتر", pic: true },
      { type: "passage", text: "آیدا و کاوه در تَبریز به تِئاتر رَفتَند. روی صَحنه، روباه یک مَسئَله داشت: پَنیرَش را گُم کَرده بود!", question: "آیدا و کاوه کجا رفتند؟",
        options: ["باغ", "تِئاتر", "مَدرِسه"], answer: "تِئاتر" }
    ]
  },
  {
    id: "read-sapling-21", subject: "read", level: "sapling", emoji: "🃏", title: "بازی کلمه‌ها ۳",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن.",
        pairs: [["ژاکَت", "🧥"], ["صابون", "🧼"], ["طوطی", "🦜"], ["عَسَل", "🍯"]] },
      { type: "build", pic: "🐌", word: "حَلَزون", parts: ["حَ", "لَ", "زون"], extra: ["هَ"], say: "حلزون" },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ع" }, { label: "غ" }],
        items: [{ label: "عَسَل", basket: "ع" }, { label: "غاز", basket: "غ" }, { label: "عینَک", basket: "ع" },
          { label: "غَذا", basket: "غ" }, { label: "عَروسَک", basket: "ع" }, { label: "غُنچه", basket: "غ" }] },
      { type: "build", pic: "🍽️", word: "غَذا", parts: ["غَ", "ذا"], extra: ["زا"], say: "غذا" },
      { type: "pairs", prompt: "هر کلمه را بخوان و با تصویرش جفت کن.",
        pairs: [["بَچّه", "🧒"], ["اَرّه", "🪚"], ["مُرَبّا", "🍓"], ["لُطفاً", "🙏"]] },
      { type: "build", pic: "🧩", word: "جُزء", parts: ["جُ", "ز", "ء"], extra: ["ع"], say: "جزء" },
      { type: "build", pic: "🦜", word: "طوطی", parts: ["طو", "طی"], extra: ["تو"], say: "طوطی" }
    ]
  },
  {
    id: "read-sapling-22", subject: "read", level: "sapling", emoji: "🔤", title: "شکل‌های یک حرف",
    steps: [
      { type: "pairs", prompt: "هر حرف تنها را با شکل اولش جفت کن.",
        pairs: [["ب", "بـ"], ["س", "سـ"], ["ک", "کـ"], ["ع", "عـ"]] },
      { type: "sort", prompt: "این شکل‌ها اول کلمه می‌آیند، میان کلمه یا آخر کلمه؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "بـ", basket: "start" }, { label: "ـبـ", basket: "mid" }, { label: "ـب", basket: "end" },
          { label: "نـ", basket: "start" }, { label: "ـنـ", basket: "mid" }, { label: "ـن", basket: "end" }] },
      { type: "pairs", prompt: "هر حرف تنها را با شکل وسطش جفت کن.",
        pairs: [["ع", "ـعـ"], ["ه", "ـهـ"], ["ی", "ـیـ"], ["ج", "ـجـ"]] },
      { type: "sort", prompt: "هر کلمه را بخوان. «ب» اول کلمه است، میان یا آخر؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "بَرف", basket: "start" }, { label: "کَبوتَر", basket: "mid" }, { label: "سیب", basket: "end" },
          { label: "باغ", basket: "start" }, { label: "سَبزی", basket: "mid" }, { label: "کِتاب", basket: "end" }] },
      { type: "sort", prompt: "این شکل‌های «ع» و «ه» کجای کلمه می‌آیند؟",
        baskets: [{ label: "اول", value: "start" }, { label: "میان", value: "mid" }, { label: "آخر", value: "end" }],
        items: [{ label: "عـ", basket: "start" }, { label: "ـعـ", basket: "mid" }, { label: "ـع", basket: "end" },
          { label: "هـ", basket: "start" }, { label: "ـهـ", basket: "mid" }, { label: "ـه", basket: "end" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با تصویرش جفت کن. «ع» را در هر کلمه پیدا کن.",
        pairs: [["عَسَل", "🍯"], ["شَمع", "🕯️"], ["ساعَت", "⏰"], ["عینَک", "👓"]] }
    ]
  },
  {
    id: "read-sapling-23", subject: "read", level: "sapling", emoji: "👯", title: "حرف‌های هم‌صدا",
    steps: [
      /* Letters with one sound: one voice, lines to every letter that makes it, all bouncing together; then the
         words they are in, and words a reader has learnt by heart. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین و گوش کن.", bg: "#f6efe2",
        parts: {
          speaker: { art: "🗣️", at: [80, 30], s: 1.1, o: 0 }, ring: { art: "read-sound", at: [80, 18], o: 0 },
          tA: { art: "read-card", look: { text: "ت" }, at: [105, 64], s: 0.3, o: 0 },
          la1: { art: "read-line-to", look: { to: [105, 53] }, o: 0 },
          tB: { art: "read-card", look: { text: "ط" }, at: [55, 64], s: 0.3, o: 0 },
          la2: { art: "read-line-to", look: { to: [55, 53] }, o: 0 },
          s1: { art: "read-card", look: { text: "س" }, at: [120, 64], s: 0.3, o: 0 },
          lb1: { art: "read-line-to", look: { to: [120, 53] }, o: 0 },
          s2: { art: "read-card", look: { text: "ص" }, at: [80, 64], s: 0.3, o: 0 },
          lb2: { art: "read-line-to", look: { to: [80, 53] }, o: 0 },
          s3: { art: "read-card", look: { text: "ث" }, at: [40, 64], s: 0.3, o: 0 },
          lb3: { art: "read-line-to", look: { to: [40, 53] }, o: 0 },
          z1: { art: "read-card", look: { text: "ز" }, at: [128, 64], s: 0.3, o: 0 },
          lc1: { art: "read-line-to", look: { to: [128, 53] }, o: 0 },
          z2: { art: "read-card", look: { text: "ذ" }, at: [96, 64], s: 0.3, o: 0 },
          lc2: { art: "read-line-to", look: { to: [96, 53] }, o: 0 },
          z3: { art: "read-card", look: { text: "ض" }, at: [64, 64], s: 0.3, o: 0 },
          lc3: { art: "read-line-to", look: { to: [64, 53] }, o: 0 },
          z4: { art: "read-card", look: { text: "ظ" }, at: [32, 64], s: 0.3, o: 0 },
          lc4: { art: "read-line-to", look: { to: [32, 53] }, o: 0 },
          ball: { art: "⚽", at: [105, 60], s: 1.1, o: 0 }, parrot: { art: "🦜", at: [55, 60], s: 1.1, o: 0 },
          wT: { art: "read-wordcard", look: { text: "توپ", w: 30, hl: 5.8 }, at: [105, 72], o: 0 }, wTa: { art: "read-wordcard", look: { text: "طوطی", w: 40, hl: 11.3 }, at: [55, 72], o: 0 },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#8a6cc4" }, at: [52, 88], s: 1.4, o: 0 }, book: { art: "📖", at: [63, 76], s: 0.55, o: 0 },
          cloud: { art: "read-thought", o: 0 },
          k1: { art: "read-wordcard", look: { text: "صابون", w: 36, hl: 9.3 }, at: [63, 70], s: 0.3, o: 0 }, k2: { art: "read-wordcard", look: { text: "طوطی", w: 40, hl: 11.3 }, at: [63, 70], s: 0.3, o: 0 }, k3: { art: "read-wordcard", look: { text: "ظَرف", w: 32, hl: 6.9 }, at: [63, 70], s: 0.3, o: 0 }
        },
        scenes: [
          { caption: "این دو حرف یک صدا دارند: «ت» و «ط».", key: 3300, hold: 5000, do: [
            { id: "speaker", to: { o: 1 }, dur: 400 },
            { id: "tA", to: { s: 1, o: 1 }, at: 300, dur: 500, ease: "back" },
            { id: "tB", to: { s: 1, o: 1 }, at: 700, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 1600, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 1620, dur: 900, ease: "out" },
            { id: "la1", to: { o: 1 }, at: 1700, dur: 100 }, { id: "la1", draw: true, at: 1700, dur: 800 },
            { id: "la2", to: { o: 1 }, at: 1700, dur: 100 }, { id: "la2", draw: true, at: 1700, dur: 800 },
            { id: "tA", to: { s: 1.2 }, at: 2600, dur: 1400, yoyo: true, times: 4 },
            { id: "tB", to: { s: 1.2 }, at: 2600, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "«ت» در «توپ» است و «ط» در «طوطی».", hold: 5200, do: [
            { id: "speaker", to: { o: 0 }, dur: 400 }, { id: "la1", to: { o: 0 }, dur: 400 }, { id: "la2", to: { o: 0 }, dur: 400 },
            { id: "tA", to: { y: 24, s: 0.9 }, at: 300, dur: 700 }, { id: "tB", to: { y: 24, s: 0.9 }, at: 300, dur: 700 },
            { id: "ball", to: { o: 1 }, at: 1000, dur: 400 }, { id: "parrot", to: { o: 1 }, at: 1000, dur: 400 },
            { id: "wT", to: { o: 1 }, at: 1300, dur: 400 }, { id: "wTa", to: { o: 1 }, at: 1300, dur: 400 },
            { id: "wT.hl", to: { o: 1 }, at: 2400, dur: 300 }, { id: "tA", to: { s: 1.1 }, at: 2400, dur: 800, yoyo: true, times: 2 },
            { id: "wTa.hl", to: { o: 1 }, at: 3600, dur: 300 }, { id: "tB", to: { s: 1.1 }, at: 3600, dur: 800, yoyo: true, times: 2 }
          ] },
          { caption: "«س»، «ص» و «ث» هم یک صدا دارند.", key: 3600, hold: 5400, do: [
            { id: "tA", to: { o: 0 }, dur: 400 }, { id: "tB", to: { o: 0 }, dur: 400 }, { id: "ball", to: { o: 0 }, dur: 400 }, { id: "parrot", to: { o: 0 }, dur: 400 }, { id: "wT", to: { o: 0 }, dur: 400 }, { id: "wTa", to: { o: 0 }, dur: 400 },
            { id: "speaker", to: { o: 1 }, at: 300, dur: 400 },
            { id: "s1", to: { s: 1, o: 1 }, at: 600, dur: 500, ease: "back" },
            { id: "s2", to: { s: 1, o: 1 }, at: 900, dur: 500, ease: "back" },
            { id: "s3", to: { s: 1, o: 1 }, at: 1200, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 1900, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 1920, dur: 900, ease: "out" },
            { id: "lb1", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb1", draw: true, at: 2000, dur: 800 },
            { id: "lb2", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb2", draw: true, at: 2000, dur: 800 },
            { id: "lb3", to: { o: 1 }, at: 2000, dur: 100 }, { id: "lb3", draw: true, at: 2000, dur: 800 },
            { id: "s1", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 },
            { id: "s2", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 },
            { id: "s3", to: { s: 1.2 }, at: 2900, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "«ز»، «ذ»، «ض» و «ظ» چهار حرف هستند با یک صدا.", key: 3900, hold: 5800, do: [
            { id: "s1", to: { o: 0 }, dur: 400 }, { id: "s2", to: { o: 0 }, dur: 400 }, { id: "s3", to: { o: 0 }, dur: 400 }, { id: "lb1", to: { o: 0 }, dur: 400 }, { id: "lb2", to: { o: 0 }, dur: 400 }, { id: "lb3", to: { o: 0 }, dur: 400 },
            { id: "z1", to: { s: 1, o: 1 }, at: 500, dur: 500, ease: "back" },
            { id: "z2", to: { s: 1, o: 1 }, at: 800, dur: 500, ease: "back" },
            { id: "z3", to: { s: 1, o: 1 }, at: 1100, dur: 500, ease: "back" },
            { id: "z4", to: { s: 1, o: 1 }, at: 1400, dur: 500, ease: "back" },
            { id: "ring", to: { s: 1, o: 1 }, at: 2200, dur: 1 },
            { id: "ring", to: { s: 3, o: 0 }, at: 2220, dur: 900, ease: "out" },
            { id: "lc1", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc1", draw: true, at: 2300, dur: 800 },
            { id: "lc2", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc2", draw: true, at: 2300, dur: 800 },
            { id: "lc3", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc3", draw: true, at: 2300, dur: 800 },
            { id: "lc4", to: { o: 1 }, at: 2300, dur: 100 }, { id: "lc4", draw: true, at: 2300, dur: 800 },
            { id: "z1", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z2", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z3", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 },
            { id: "z4", to: { s: 1.2 }, at: 3200, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "از کجا بدانیم کدام را بنویسیم؟ باید کلمه را بشناسیم. هر چه بیشتر بخوانیم، شکل کلمه‌ها بهتر یادمان می‌ماند.", hold: 8000, do: [
            { id: "z1", to: { o: 0 }, dur: 400 }, { id: "z2", to: { o: 0 }, dur: 400 }, { id: "z3", to: { o: 0 }, dur: 400 }, { id: "z4", to: { o: 0 }, dur: 400 }, { id: "lc1", to: { o: 0 }, dur: 400 }, { id: "lc2", to: { o: 0 }, dur: 400 }, { id: "lc3", to: { o: 0 }, dur: 400 }, { id: "lc4", to: { o: 0 }, dur: 400 }, { id: "speaker", to: { o: 0 }, dur: 400 },
            { id: "girl.armF", to: { r: -70 }, dur: 1 }, { id: "girl.armB", to: { r: -60 }, dur: 1 },
            { id: "girl", to: { o: 1 }, at: 300, dur: 500 }, { id: "book", to: { o: 1 }, at: 300, dur: 500 },
            { id: "cloud", to: { o: 1 }, at: 1200, dur: 500 },
            { id: "k1", to: { o: 1 }, at: 1800, dur: 200 }, { id: "k1", path: "M63 70Q80 40 104 25", at: 1800, dur: 1100 }, { id: "k1", to: { s: 0.75 }, at: 1800, dur: 1100 },
            { id: "k2", to: { o: 1 }, at: 3200, dur: 200 }, { id: "k2", path: "M63 70Q76 44 96 36", at: 3200, dur: 1100 }, { id: "k2", to: { s: 0.75 }, at: 3200, dur: 1100 },
            { id: "k3", to: { o: 1 }, at: 4600, dur: 200 }, { id: "k3", path: "M63 70Q90 56 115 44", at: 4600, dur: 1100 }, { id: "k3", to: { s: 0.75 }, at: 4600, dur: 1100 },
            { id: "k1.hl", to: { o: 1 }, at: 6000, dur: 300 }, { id: "k2.hl", to: { o: 1 }, at: 6300, dur: 300 }, { id: "k3.hl", to: { o: 1 }, at: 6600, dur: 300 }
          ] }
        ] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ت" }, { label: "ط" }],
        items: [{ label: "توپ", basket: "ت" }, { label: "طوطی", basket: "ط" }, { label: "تَخته", basket: "ت" }, { label: "طَناب", basket: "ط" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "س" }, { label: "ص" }, { label: "ث" }],
        items: [{ label: "سیب", basket: "س" }, { label: "صابون", basket: "ص" }, { label: "مُثَلَّث", basket: "ث" },
          { label: "سَبَد", basket: "س" }, { label: "صُبح", basket: "ص" }, { label: "ثانیه", basket: "ث" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ز" }, { label: "ذ" }, { label: "ض" }, { label: "ظ" }],
        items: [{ label: "زَنبور", basket: "ز" }, { label: "ذُرَّت", basket: "ذ" }, { label: "حوض", basket: "ض" }, { label: "ظَرف", basket: "ظ" },
          { label: "زَمین", basket: "ز" }, { label: "کاغَذ", basket: "ذ" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ه" }, { label: "ح" }],
        items: [{ label: "ماه", basket: "ه" }, { label: "حَلَزون", basket: "ح" }, { label: "کوه", basket: "ه" }, { label: "صُبح", basket: "ح" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرفش بگذار.",
        baskets: [{ label: "ق" }, { label: "غ" }],
        items: [{ label: "قاشُق", basket: "ق" }, { label: "غاز", basket: "غ" }, { label: "قایِق", basket: "ق" }, { label: "باغ", basket: "غ" }] },
      { type: "sort", prompt: "هر کلمه را بخوان و در سبد حرف اولش بگذار.",
        baskets: [{ label: "ا" }, { label: "ع" }],
        items: [{ label: "اَسب", basket: "ا" }, { label: "عَسَل", basket: "ع" }, { label: "اَبر", basket: "ا" }, { label: "عینَک", basket: "ع" }] }
    ]
  },
  {
    id: "read-sapling-24", subject: "read", level: "sapling", emoji: "📝", title: "املا",
    steps: [
      { type: "build", hidden: true, pic: "🍯", word: "عَسَل", parts: ["عَ", "سَ", "ل"], extra: ["اَ", "صَ"], say: "عسل" },
      { type: "build", hidden: true, pic: "🦜", word: "طوطی", parts: ["ط", "و", "ط", "ی"], extra: ["ت"], say: "طوطی" },
      { type: "build", hidden: true, pic: "🧼", word: "صابون", parts: ["ص", "ا", "ب", "و", "ن"], extra: ["س"], say: "صابون" },
      { type: "build", hidden: true, pic: "🍽️", word: "غَذا", parts: ["غَ", "ذ", "ا"], extra: ["ز", "قَ"], say: "غذا" },
      { type: "build", hidden: true, pic: "🐌", word: "حَلَزون", parts: ["حَ", "لَ", "ز", "و", "ن"], extra: ["هَ"], say: "حلزون" },
      { type: "build", hidden: true, pic: "🌅", word: "صُبح", parts: ["صُ", "ب", "ح"], extra: ["سُ", "ه"], say: "صبح" },
      { type: "build", hidden: true, pic: "🐸", word: "قورباغه", parts: ["ق", "و", "ر", "ب", "ا", "غ", "ه"], extra: ["ح"], say: "قورباغه" }
    ]
  },
  {
    id: "read-sapling-25", subject: "read", level: "sapling", emoji: "💬", title: "جمله بساز",
    steps: [
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["نَرگِس", "در", "یَزد", "زِندگی", "می‌کُنَد."] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["هومَن", "کِنار", "دَریا", "بازی", "می‌کُنَد."] },
      { type: "choose", show: "اِمروز آفتابی است", prompt: "این جمله خبر می‌دهد. آخرش چه نشانه‌ای می‌گذاریم؟",
        say: "این جمله خبر می‌دهد. آخرش چه نشانه‌ای می‌گذاریم؟", options: [".", "؟"], answer: "." },
      { type: "choose", show: "تو کُجا زِندگی می‌کُنی", prompt: "این جمله می‌پرسد. آخرش چه نشانه‌ای می‌گذاریم؟",
        say: "این جمله می‌پرسد. آخرش چه نشانه‌ای می‌گذاریم؟", options: [".", "؟"], answer: "؟" },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا پرسش درست شود.", items: ["آیا", "تو", "اَنار", "دوست", "داری؟"] },
      { type: "order", prompt: "کلمه‌ها را به ترتیب بچین تا جمله درست شود.", items: ["بَهار", "و", "آرَش", "با", "هَم", "نَقّاشی", "می‌کِشَند."] },
      { type: "choose", prompt: "کدام جمله درست است؟", say: "کدام جمله درست است؟",
        options: ["سیب مَن دوست دارَم.", "مَن سیب دوست دارَم.", "دارَم سیب مَن دوست."], answer: "مَن سیب دوست دارَم." }
    ]
  },
  {
    id: "read-sapling-26", subject: "read", level: "sapling", emoji: "✍️", title: "کلمه‌ها را به هم بنویس",
    steps: [
      { type: "intro", letter: "بـ", text: "حرف‌ها در کلمه به هم می‌چسبند و شکلشان کمی کوتاه می‌شود. این «ب» اول کلمه است.", say: "حرف‌ها به هم می‌چسبند. مثل بابا",
        forms: [["ب", "تنها"], ["بـ", "اول"], ["ـبـ", "وسط"], ["ـب", "آخر"]], example: { pic: "👨", word: "بابا" } },
      { type: "trace", letter: "ـبـ", prompt: "با انگشتت «ب» وسط کلمه را بنویس" },
      { type: "trace", letter: "بابا", say: "بابا", prompt: "با انگشتت «بابا» را بنویس. هر تکه را یک‌جا بنویس، بعد نقطه‌اش را بگذار." },
      { type: "trace", letter: "نان", say: "نان", prompt: "با انگشتت «نان» را بنویس" },
      { type: "trace", letter: "لب", say: "لب", prompt: "با انگشتت «لب» را بنویس" },
      { type: "trace", letter: "سیب", say: "سیب", prompt: "با انگشتت «سیب» را بنویس. همه کلمه یک تکه است؛ نقطه‌ها را آخر بگذار." },
      { type: "trace", letter: "دست", say: "دست", prompt: "با انگشتت «دست» را بنویس. «د» به حرف بعدی نمی‌چسبد." }
    ]
  },
  {
    id: "read-sapling-27", subject: "read", level: "sapling", emoji: "📚", title: "قصه‌های کوتاه",
    steps: [
      /* Before each short text, a picture story that sets the scene (the text itself is read next, in a passage). */
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.",
        parts: {
          bg: { art: "read-bg-garden" }, tea: { art: "read-tea-rows" },
          girl: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#e46b8a", hairColor: "#3d2c22" }, at: [64, 86], s: 1.3 },
          umb: { art: "read-umbrella-green", under: "girl", at: [7.5, -15.9], s: 0.55, r: -20 },
          boy: { art: "read-kid", look: { hair: "short", top: "#f59e0b" }, at: [190, 86], s: 1.2, flip: true },
          grey: { art: "read-grey" }, cloud: { art: "read-raincloud" }
        },
        scenes: [
          { caption: "یک روز بارانی در رَشت.", key: 2500, do: [
            { id: "girl.armF", to: { r: -100 }, dur: 1 }, { id: "umb.open", to: { o: 0 }, dur: 1 }, { id: "umb.shut", to: { o: 1 }, dur: 1 },
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 60, dur: 3800, life: 1000 }
          ] },
          { caption: "گلی چتر دارد.", key: 2200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 50, dur: 3200, life: 1000 },
            { id: "umb.open", to: { sx: 0.15, o: 1 }, at: 300, dur: 1 }, { id: "umb.open", to: { sx: 1 }, at: 320, dur: 900, ease: "back" },
            { id: "umb.shut", to: { o: 0 }, at: 300, dur: 300 }
          ] },
          { caption: "برادرش هم می‌آید.", key: 3200, do: [
            { emit: "drop", where: [80, 22], spread: [160, 14], rise: 62, n: 60, dur: 3800, life: 1000 },
            { id: "boy", walk: [84, 86], dur: 2800 }
          ] }
        ] },
      { type: "passage", text: "گُلی در رَشت زِندگی می‌کُنَد. دیروز باران آمَد. گُلی چَتر سَبز و چَکمه قِرمِز داشت. او با بَرادَرَش، سینا، به باغ چای رَفت.",
        question: "چکمه گلی چه رنگی بود؟", options: ["سَبز", "قِرمِز", "آبی"], answer: "قِرمِز" },
      { type: "passage", text: "گُلی در رَشت زِندگی می‌کُنَد. دیروز باران آمَد. گُلی چَتر سَبز و چَکمه قِرمِز داشت. او با بَرادَرَش، سینا، به باغ چای رَفت.",
        question: "گلی با چه کسی به باغ چای رفت؟", options: ["مادَر", "سینا", "بابا"], answer: "سینا" },
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.",
        parts: {
          sky: { art: "read-dawn-sky" }, sun: { art: "read-sun", at: [124, 54] }, sea: { art: "read-sea" },
          boat: { art: "read-boat-back", at: [-30, 66] },
          grandpa: { art: "👴", look: { cane: false }, under: "boat", at: [-9, -6], s: 0.8 },
          boy: { art: "read-kid", look: { hair: "short", top: "#e5483f" }, under: "boat", at: [9, -6], s: 0.75 },
          hull: { art: "read-boat-hull", under: "boat" },
          f1: { art: "🐟", at: [176, 72], s: 0.45 }, f2: { art: "🐟", at: [184, 80], s: 0.45 }, f3: { art: "🐟", at: [192, 70], s: 0.45 },
          f4: { art: "🐟", at: [200, 84], s: 0.45 }, f5: { art: "🐟", at: [210, 76], s: 0.45 }, f6: { art: "🐟", at: [220, 82], s: 0.45 }
        },
        scenes: [
          { caption: "صبح زود در بوشهر.", key: 1500, do: [
            { id: "sun", to: { y: 22 }, dur: 3600, ease: "out" }, { id: "sky.day", to: { o: 1 }, at: 1400, dur: 3000 }
          ] },
          { caption: "آرش و پدربزرگ سوار قایق هستند.", do: [
            { id: "boat", to: { x: 64 }, dur: 2800, ease: "out" },
            { id: "boat", to: { r: 3 }, dur: 3000, yoyo: true, times: 6 }
          ] },
          { caption: "ماهی‌ها می‌آیند!", key: 2900, hold: 4200, do: [
            { id: "boat", to: { r: 3 }, dur: 4000, yoyo: true, times: 8 },
            { id: "f1", to: { x: 92 }, dur: 2400, ease: "out" }, { id: "f2", to: { x: 104 }, at: 200, dur: 2400, ease: "out" },
            { id: "f3", to: { x: 112 }, at: 400, dur: 2000, ease: "out" }, { id: "f4", to: { x: 120 }, at: 500, dur: 2400, ease: "out" },
            { id: "f5", to: { x: 130 }, at: 700, dur: 2400, ease: "out" }, { id: "f6", to: { x: 142 }, at: 900, dur: 2400, ease: "out" },
            { id: "f3", path: "M112 70Q104 44 96 66", at: 2400, dur: 1000 }, { id: "f3", to: { r: -40 }, at: 2400, dur: 1000, yoyo: true, times: 2 },
            { id: "boy.armF", to: { r: -120 }, at: 1600, dur: 500 }
          ] }
        ] },
      { type: "passage", text: "آرَش و پِدَربُزُرگ در بوشِهر بودَند. صُبح زود با قایِق به دَریا رَفتَند. پِدَربُزُرگ تور اَنداخت. آرَش سه ماهی شِمُرد.",
        question: "آرش چند ماهی شمرد؟", options: ["دو", "سه", "چَهار"], answer: "سه" },
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.", bg: "#dfe8f0",
        parts: {
          ground: { art: "read-ground" }, cloud: { art: "read-raincloud" }, house: { art: "read-house-snow" }, cover: { art: "read-snowcover", at: [0, 91], sy: 0.05 },
          bahar: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#5b9bd5", hairColor: "#6b3f26" }, at: [32, 62], s: 0.8, o: 0 },
          zhila: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#5a9a45", hairColor: "#3d2c22", skin: "#c98f63" }, at: [186, 86], s: 1.2, flip: true },
          scarf: { art: "read-scarf", under: "zhila" }, ring: { art: "read-ring-small", at: [99.6, 66.6], o: 0 }
        },
        scenes: [
          { caption: "در سنندج برف آمد.", key: 2600, do: [
            { id: "house.snow", to: { o: 0 }, dur: 1 },
            { emit: "bubble", where: [80, 4], spread: [160, 8], rise: 70, n: 80, dur: 4200, life: 1600 },
            { id: "cover", to: { sy: 1 }, at: 400, dur: 3600 }, { id: "house.snow", to: { o: 1 }, at: 400, dur: 3200 }
          ] },
          { caption: "بهار و ژیلا بیرون آمدند.", do: [
            { id: "bahar", to: { o: 1 }, dur: 300 }, { id: "bahar", to: { x: 58, y: 86, s: 1.2 }, at: 300, dur: 2200, ease: "linear" },
            { id: "bahar.legF", to: { r: 24 }, at: 300, dur: 2200, yoyo: true, times: 8 }, { id: "bahar.legB", to: { r: -24 }, at: 300, dur: 2200, yoyo: true, times: 8 },
            { id: "zhila", walk: [100, 86], dur: 2600 }
          ] },
          { caption: "ژیلا یک چیز گرم دارد.", key: 2200, do: [
            { id: "zhila.armF", to: { r: -130 }, dur: 600 },
            { id: "scarf.ends", to: { r: 25 }, at: 600, dur: 2400, yoyo: true, times: 6 },
            { id: "ring", to: { o: 1 }, at: 900, dur: 100 }, { id: "ring", draw: true, at: 900, dur: 900 },
            { id: "ring", to: { s: 1.15 }, at: 1900, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "passage", text: "در سَنَندَج بَرف آمَد. بَهار و دوستَش، ژیلا، یک آدَم‌بَرفی ساختَند. ژیلا شال‌گَردَنَش را به آدَم‌بَرفی داد. حالا آدَم‌بَرفی سَرما نِمی‌خورَد!",
        question: "ژیلا چه چیزی به آدم‌برفی داد؟",
        options: [{ label: "🎩", value: "کُلاه" }, { label: "🧣", value: "شال‌گَردَن" }, { label: "🥕", value: "هَویج" }], answer: "شال‌گَردَن", pic: true }
    ]
  },
  {
    id: "read-sapling-28", subject: "read", level: "sapling", emoji: "🗣️", title: "بلند بخوان",
    steps: [
      { type: "readaloud", pic: "⚽", text: "سارا و نیما در حَیاط هَستَند. سارا توپ دارد. توپ را به نیما می‌دَهَد. نیما توپ را می‌گیرَد." },
      { type: "readaloud", pic: "💧", text: "ماهان در زاهِدان زِندگی می‌کُنَد. اِمروز گَرم است. ماهان آب خُنَک می‌نوشَد و زیر سایه دِرَخت می‌نِشینَد." },
      { type: "readaloud", pic: "🍎", text: "تینا با مادَرَش به بازار رَفت. آن‌ها سیب و اَنار و نان سَنگَک خَریدَند. نان سَنگَک گَرم بود." },
      { type: "readaloud", pic: "🌸", text: "سامان در شیراز یک باغچه کوچَک دارد. او هَر روز به گُل‌ها آب می‌دَهَد. حالا گُل‌ها باز شُده‌اَند." },
      { type: "readaloud", pic: "📖", text: "زَهرا یک کِتاب قِصّه دارد. او قِصّه خَرگوش را بَرای پِدَرَش بُلَند می‌گوید. پِدَر می‌خَندَد و می‌گوید: «آفَرین، با دِقَّت گُفتی!»" }
    ]
  },
  {
    id: "read-sapling-31", subject: "read", level: "sapling", emoji: "✍️", title: "دندانه‌دارها را بنویس",
    steps: [
      { type: "intro", letter: "ب پ ت ث ن ی", write: "", text: "این حرف‌ها یک دندانه یا یک کاسه دارند و فرقشان در نقطه‌هاست. نقطه‌ها را همیشه آخر سر می‌گذاریم.",
        say: "ب، پ، ت، ث، ن، ی. این حرف‌ها شبیه هم‌اند و فرقشان در نقطه‌هاست. نقطه‌ها را همیشه آخر سر می‌گذاریم." },
      { type: "trace", letter: "پ", prompt: "«پ» را بنویس. سه نقطه زیرش.", say: "پ را بنویس، بعد سه نقطه را زیرش بگذار." },
      { type: "trace", letter: "ت", prompt: "«ت» را بنویس. دو نقطه رویش.", say: "ت را بنویس، بعد دو نقطه را رویش بگذار." },
      { type: "trace", letter: "ث", prompt: "«ث» را بنویس. سه نقطه رویش.", say: "ث را بنویس، بعد سه نقطه را رویش بگذار." },
      { type: "trace", letter: "ی", prompt: "«ی» را بنویس.", say: "ی را بنویس: یک پیچ کوچک بالا و یک کاسه بزرگ زیر خط." },
      { type: "trace", letter: "ـبـ", prompt: "«ـبـ» وسط کلمه را بنویس.", say: "ب وسط کلمه فقط یک دندانه است. به هر دو طرف می‌چسبد." },
      { type: "trace", letter: "نان", prompt: "«نان» را بنویس.", say: "نان را بنویس: هر تکه را یک‌جا، نقطه‌ها آخر." },
      { type: "paper", lang: "fa", text: "در دفترت این کلمه‌ها را دو بار بنویس.", example: "تاب   نان   پنیر   بینی",
        check: ["دندانه‌ها هم‌اندازه و روی خط بودند؟", "نقطه‌ها را آخر سر و سر جایشان گذاشت؟", "حرف‌های هر کلمه به هم چسبیده بودند؟"] }
    ]
  },
  {
    id: "read-sapling-32", subject: "read", level: "sapling", emoji: "✍️", title: "کاسه‌دارها را بنویس",
    steps: [
      { type: "trace", letter: "س", prompt: "«س» را بنویس: سه دندانه و یک کاسه.", say: "س را بنویس: سه دندانه، بعد یک کاسه زیر خط." },
      { type: "trace", letter: "ش", prompt: "«ش» را بنویس: مثل «س»، با سه نقطه.", say: "ش مثل س است. آخر سر سه نقطه رویش بگذار." },
      { type: "trace", letter: "ص", prompt: "«ص» را بنویس: یک حلقه و یک کاسه.", say: "ص را بنویس: یک حلقه دراز، بعد کاسه." },
      { type: "trace", letter: "ض", prompt: "«ض» را بنویس: مثل «ص»، با یک نقطه.", say: "ض مثل ص است، با یک نقطه رویش." },
      { type: "trace", letter: "ق", prompt: "«ق» را بنویس: یک حلقه و یک کاسه گرد.", say: "ق را بنویس: حلقه، کاسه گرد، بعد دو نقطه." },
      { type: "trace", letter: "ل", prompt: "«ل» را بنویس: خط بلند و کاسه.", say: "ل را بنویس: از بالا پایین بیا و کاسه را بکش." },
      { type: "trace", letter: "سیب", prompt: "«سیب» را بنویس.", say: "سیب را بنویس: دندانه‌ها، بعد ب، نقطه‌ها آخر." },
      { type: "paper", lang: "fa", text: "در دفترت این کلمه‌ها را دو بار بنویس.", example: "سوسن   شیش   صابون   قاشق",
        check: ["کاسه‌ها زیر خط و گرد بودند؟", "دندانه‌های «س» و «ش» هم‌اندازه بودند؟", "نقطه‌ها آخر سر؟"] }
    ]
  },
  {
    id: "read-sapling-33", subject: "read", level: "sapling", emoji: "✍️", title: "«ج چ ح خ» و «ع غ» را بنویس",
    steps: [
      { type: "trace", letter: "ج", prompt: "«ج» را بنویس.", say: "ج را بنویس: سرش را از راست بکش، بعد شکمش را دور بده. نقطه آخر." },
      { type: "trace", letter: "چ", prompt: "«چ» را بنویس: مثل «ج»، با سه نقطه.", say: "چ مثل ج است، با سه نقطه زیرش." },
      { type: "trace", letter: "ح", prompt: "«ح» را بنویس: بی‌نقطه.", say: "ح مثل ج است، ولی نقطه ندارد." },
      { type: "trace", letter: "خ", prompt: "«خ» را بنویس: یک نقطه رویش.", say: "خ مثل ح است، با یک نقطه رویش." },
      { type: "trace", letter: "ع", prompt: "«ع» را بنویس.", say: "ع را بنویس: یک سر کوچک، بعد شکم بزرگ." },
      { type: "trace", letter: "غ", prompt: "«غ» را بنویس: مثل «ع»، با یک نقطه.", say: "غ مثل ع است، با یک نقطه رویش." },
      { type: "paper", lang: "fa", text: "در دفترت این کلمه‌ها را دو بار بنویس. ببین «ع» و «ج» وسط کلمه چه شکلی می‌شوند.", example: "بچه   حلزون   جعبه   باغ",
        check: ["سر «ج» و «ح» روی خط بود و شکمشان زیر خط؟", "«ع» وسط کلمه («جعبه») شکل درست داشت؟", "نقطه‌ها سر جایشان بودند؟"] }
    ]
  },
  {
    id: "read-sapling-34", subject: "read", level: "sapling", emoji: "✍️", title: "«ک گ ف ق م ه ط ظ» را بنویس",
    steps: [
      { type: "trace", letter: "ک", prompt: "«ک» را بنویس: اول خط کج، بعد بدنش.", say: "ک را بنویس: اول خط کج بالا، بعد بدن را از بالا پایین بیاور و روی خط برو." },
      { type: "trace", letter: "گ", prompt: "«گ» را بنویس: مثل «ک»، با دو خط کج.", say: "گ مثل ک است، با دو خط کج." },
      { type: "trace", letter: "ف", prompt: "«ف» را بنویس.", say: "ف را بنویس: یک حلقه کوچک، بعد خط روی خط، نقطه آخر." },
      { type: "trace", letter: "م", prompt: "«م» را بنویس.", say: "م را بنویس: سر گرد، بعد دم." },
      { type: "trace", letter: "ه", prompt: "«ه» را بنویس.", say: "ه را بنویس: از بالا شروع کن و دور بزن." },
      { type: "trace", letter: "ط", prompt: "«ط» را بنویس.", say: "ط را بنویس: حلقه روی خط، بعد خط بلند از بالا." },
      { type: "trace", letter: "ظ", prompt: "«ظ» را بنویس.", say: "ظ مثل ط است، با یک نقطه." },
      { type: "paper", lang: "fa", text: "در دفترت این کلمه‌ها را دو بار بنویس.", example: "کفش   گلدان   مهتاب   طوطی   ظرف",
        check: ["خط کج «ک» و «گ» را آخر یا اول درست گذاشت؟", "خط بلند «ط» و «ظ» صاف بود؟", "حرف‌ها روی خط بودند؟"] }
    ]
  },
  {
    id: "read-sapling-35", subject: "read", level: "sapling", emoji: "🧩", title: "حرف‌هایی که نمی‌چسبند",
    steps: [
      { type: "sort", prompt: "این حرف به حرف بعدی می‌چسبد یا نمی‌چسبد؟", say: "این حرف به حرف بعدی‌اش می‌چسبد یا نمی‌چسبد؟",
        baskets: [{ label: "می‌چسبد" }, { label: "نمی‌چسبد" }],
        items: [{ label: "ا", basket: "نمی‌چسبد" }, { label: "ب", basket: "می‌چسبد" }, { label: "د", basket: "نمی‌چسبد" }, { label: "س", basket: "می‌چسبد" },
          { label: "ر", basket: "نمی‌چسبد" }, { label: "م", basket: "می‌چسبد" }, { label: "و", basket: "نمی‌چسبد" }, { label: "ک", basket: "می‌چسبد" }] },
      { type: "sort", prompt: "این‌ها هم؟ می‌چسبد یا نمی‌چسبد؟", say: "این حرف‌ها چطور؟ می‌چسبد یا نمی‌چسبد؟",
        baskets: [{ label: "می‌چسبد" }, { label: "نمی‌چسبد" }],
        items: [{ label: "ذ", basket: "نمی‌چسبد" }, { label: "ل", basket: "می‌چسبد" }, { label: "ز", basket: "نمی‌چسبد" }, { label: "ن", basket: "می‌چسبد" },
          { label: "ژ", basket: "نمی‌چسبد" }, { label: "ت", basket: "می‌چسبد" }] },
      { type: "choose", show: "دارو", prompt: "«دارو» چند تکه جدا دارد؟", say: "دارو. حرف‌هایش به هم نمی‌چسبند. چند تکه جدا دارد؟",
        options: ["۲", "۳", "۴"], answer: "۴" },
      { type: "choose", show: "روز", prompt: "«روز» چند تکه جدا دارد؟", say: "روز چند تکه جدا دارد؟", options: ["۱", "۲", "۳"], answer: "۳" },
      { type: "choose", show: "ژاله", prompt: "«ژاله» چند تکه جدا دارد؟", say: "ژاله چند تکه جدا دارد؟", options: ["۲", "۳", "۴"], answer: "۲" },
      { type: "trace", letter: "ر", prompt: "«ر» را بنویس. به حرف بعدی نمی‌چسبد.", say: "ر را بنویس. ر هیچ‌وقت به حرف بعدی‌اش نمی‌چسبد." },
      { type: "paper", lang: "fa", text: "این کلمه‌ها را در دفترت بنویس. حواست باشد بعد از «ا د ذ ر ز ژ و» فاصله کوچکی بگذاری.", example: "دارو   روز   ژاله   زود",
        check: ["بعد از حرف‌های نچسب، کلمه را قطع کرد و دوباره شروع کرد؟", "تکه‌های یک کلمه به هم نزدیک بودند و کلمه‌ها از هم دورتر؟"] }
    ]
  },
  {
    id: "read-sapling-36", subject: "read", level: "sapling", emoji: "🔤", title: "جدول الفبا",
    steps: [
      /* The alphabet table fills in, row by row from the right, as پایه اول ends; each letter is said by its name.
         Drawing: js/art/rig-read.js ("read-alphabet"). */
      { type: "scene", prompt: "ببین و گوش کن: حرف‌های الفبا به ترتیب", bg: "#f6efe2",
        parts: { tab: { art: "read-alphabet" } },
        scenes: [
          { caption: "الفبای فارسی ۳۲ حرف دارد. اولش «الف» است.", say: "الفبای فارسی سی و دو حرف دارد. اولش الف است.", hold: 4000, do: [
            { id: "tab.l1", to: { o: 1 }, at: 500, dur: 300 }
          ] },
          { caption: "الف، بِ، پِ، تِ، ثِ، جیم، چِ، حِ", say: "الف، ب، پ، ت، ث، جیم، چ، ح", hold: 7000, do: [
            { id: "tab.l2", to: { o: 1 }, at: 300, dur: 300 }, { id: "tab.l3", to: { o: 1 }, at: 1050, dur: 300 }, { id: "tab.l4", to: { o: 1 }, at: 1800, dur: 300 }, { id: "tab.l5", to: { o: 1 }, at: 2550, dur: 300 }, { id: "tab.l6", to: { o: 1 }, at: 3300, dur: 300 }, { id: "tab.l7", to: { o: 1 }, at: 4050, dur: 300 }, { id: "tab.l8", to: { o: 1 }, at: 4800, dur: 300 }
          ] },
          { caption: "خِ، دال، ذال، رِ، زِ، ژِ، سین، شین", say: "خ، دال، ذال، ر، ز، ژ، سین، شین", hold: 7000, do: [
            { id: "tab.l9", to: { o: 1 }, at: 300, dur: 300 }, { id: "tab.l10", to: { o: 1 }, at: 1050, dur: 300 }, { id: "tab.l11", to: { o: 1 }, at: 1800, dur: 300 }, { id: "tab.l12", to: { o: 1 }, at: 2550, dur: 300 }, { id: "tab.l13", to: { o: 1 }, at: 3300, dur: 300 }, { id: "tab.l14", to: { o: 1 }, at: 4050, dur: 300 }, { id: "tab.l15", to: { o: 1 }, at: 4800, dur: 300 }, { id: "tab.l16", to: { o: 1 }, at: 5550, dur: 300 }
          ] },
          { caption: "صاد، ضاد، طا، ظا، عین، غین، فِ، قاف", say: "صاد، ضاد، طا، ظا، عین، غین، ف، قاف", hold: 7000, do: [
            { id: "tab.l17", to: { o: 1 }, at: 300, dur: 300 }, { id: "tab.l18", to: { o: 1 }, at: 1050, dur: 300 }, { id: "tab.l19", to: { o: 1 }, at: 1800, dur: 300 }, { id: "tab.l20", to: { o: 1 }, at: 2550, dur: 300 }, { id: "tab.l21", to: { o: 1 }, at: 3300, dur: 300 }, { id: "tab.l22", to: { o: 1 }, at: 4050, dur: 300 }, { id: "tab.l23", to: { o: 1 }, at: 4800, dur: 300 }, { id: "tab.l24", to: { o: 1 }, at: 5550, dur: 300 }
          ] },
          { caption: "کاف، گاف، لام، میم، نون، واو، هِ، یِ. این هم آخرش!", say: "کاف، گاف، لام، میم، نون، واو، ه، ی. این هم آخرش!", hold: 7500, do: [
            { id: "tab.l25", to: { o: 1 }, at: 300, dur: 300 }, { id: "tab.l26", to: { o: 1 }, at: 1050, dur: 300 }, { id: "tab.l27", to: { o: 1 }, at: 1800, dur: 300 }, { id: "tab.l28", to: { o: 1 }, at: 2550, dur: 300 }, { id: "tab.l29", to: { o: 1 }, at: 3300, dur: 300 }, { id: "tab.l30", to: { o: 1 }, at: 4050, dur: 300 }, { id: "tab.l31", to: { o: 1 }, at: 4800, dur: 300 }, { id: "tab.l32", to: { o: 1 }, at: 5550, dur: 300 }
          ] }
        ] },
      { type: "order", prompt: "حرف‌ها را به ترتیب الفبا بچین.", items: ["ا", "ب", "پ", "ت", "ث"] },
      { type: "order", prompt: "این‌ها را هم به ترتیب الفبا بچین.", items: ["ک", "گ", "ل", "م", "ن"] },
      { type: "choose", show: "ج", prompt: "اسم این حرف چیست؟", say: "اسم این حرف چیست؟", options: ["جیم", "دال", "میم"], answer: "جیم" },
      { type: "choose", show: "🍎", prompt: "«سیب» با کدام حرف شروع می‌شود؟ اسمش را انتخاب کن.", say: "سیب با کدام حرف شروع می‌شود؟ اسمش را انتخاب کن.",
        options: ["شین", "سین", "صاد"], answer: "سین" },
      { type: "choose", prompt: "این کلمه با این حرف‌ها نوشته می‌شود: «بِ، الف، دال». کدام است؟", say: "ب، الف، دال. کدام کلمه است؟",
        options: ["باد", "داد", "بام"], answer: "باد" }
    ]
  },
  {
    id: "read-sapling-37", subject: "read", level: "sapling", emoji: "📖", title: "با هم بخوانیم",
    steps: [
      { type: "readaloud", pic: "🐢", prompt: "اول با بزرگ‌ترت بخوان، بعد تنها.",
        text: "لاک‌پُشت کوچولو کِنار دَریا زِندِگی می‌کَرد. یِک روز موج بُزُرگی آمَد و او را بِه آب بُرد. لاک‌پُشت تُرسید، اَمّا زود شِنا کَرد و بِه ساحِل بَرگَشت." },
      { type: "passage", text: "لاک‌پُشت کوچولو کِنار دَریا زِندِگی می‌کَرد. یِک روز موج بُزُرگی آمَد و او را بِه آب بُرد. لاک‌پُشت تُرسید، اَمّا زود شِنا کَرد و بِه ساحِل بَرگَشت.",
        question: "لاک‌پشت کجا زندگی می‌کرد؟", options: [{ label: "🏖️", value: "کنار دریا" }, { label: "🌳", value: "در جنگل" }, { label: "🏔️", value: "روی کوه" }], answer: "کنار دریا", pic: true },
      { type: "passage", text: "لاک‌پُشت کوچولو کِنار دَریا زِندِگی می‌کَرد. یِک روز موج بُزُرگی آمَد و او را بِه آب بُرد. لاک‌پُشت تُرسید، اَمّا زود شِنا کَرد و بِه ساحِل بَرگَشت.",
        question: "لاک‌پشت چطور به ساحل برگشت؟", options: ["پَرواز کَرد", "شِنا کَرد", "دَوید"], answer: "شِنا کَرد" },
      { type: "readaloud", pic: "🌙", prompt: "این شعر را با بزرگ‌ترت بخوان، بعد تنها.",
        text: "ماه آمَد بالای دِه،\nروشَن شُد کوچه وَ رَه.\nبَچّه‌ها خوابیدَند،\nخواب‌های خوش دیدَند." },
      { type: "passage", text: "ماه آمَد بالای دِه،\nروشَن شُد کوچه وَ رَه.\nبَچّه‌ها خوابیدَند،\nخواب‌های خوش دیدَند.",
        question: "در شعر، بچه‌ها چه کار کردند؟", options: [{ label: "😴", value: "خوابیدند" }, { label: "⚽", value: "بازی کردند" }], answer: "خوابیدند", pic: true }
    ]
  },
  {
    id: "read-sapling-38", subject: "read", level: "sapling", emoji: "📝", title: "املای جمله",
    steps: [
      { type: "build", hidden: true, pic: "☀️", word: "خورشید", parts: ["خ", "و", "ر", "ش", "ی", "د"], extra: ["س"], say: "خورشید" },
      { type: "build", hidden: true, pic: "🏫", word: "مدرسه", parts: ["م", "د", "ر", "س", "ه"], extra: ["ص"], say: "مدرسه" },
      { type: "build", hidden: true, pic: "🍞", word: "صبحانه", parts: ["ص", "ب", "ح", "ا", "ن", "ه"], extra: ["س", "ه"], say: "صبحانه" },
      { type: "paper", lang: "fa", text: "املا! بزرگ‌ترت سه جمله می‌گوید. هر جمله را در دفترت بنویس. بعد کلمه به کلمه با جواب مقایسه کن.",
        check: ["هر جمله را بعد از شنیدن نوشت؟", "آخر هر جمله نقطه گذاشت؟", "بعد خودش کلمه به کلمه مقایسه کرد و غلط‌ها را درست کرد؟"],
        note: "جمله‌ها (برای شما): «خورشید بالا آمد.» «سارا به مدرسه رفت.» «ما صبحانه نان و پنیر خوردیم.» هر جمله را آرام و دو بار بگویید. بعد جمله‌ها را بنویسید تا خودش مقایسه کند." },
      { type: "build", hidden: true, pic: "🧀", word: "پنیر", parts: ["پ", "ن", "ی", "ر"], extra: ["ب"], say: "پنیر" }
    ]
  },
  {
    id: "read-sapling-39", subject: "read", level: "sapling", emoji: "🔍", title: "نشانه‌ها کم می‌شوند",
    steps: [
      { type: "passage", prompt: "این متن همه نشانه‌ها را دارد. بخوان.", text: "مَریَم یِک گُلدان دارَد. هَر روز بِه گُل‌ها آب می‌دَهَد. گُل‌ها سُرخ وَ زَرد هَستَند.",
        question: "گل‌ها چه رنگی هستند؟", options: ["سُرخ وَ زَرد", "آبی وَ سَبز"], answer: "سُرخ وَ زَرد" },
      { type: "passage", prompt: "همان متن، با نشانه‌های کمتر. بخوان.", text: "مریم یک گلدان دارد. هر روز به گل‌ها آب می‌دهد. گل‌ها سُرخ و زرد هستند.",
        question: "مریم هر روز چه کار می‌کند؟", options: ["به گل‌ها آب می‌دهد", "گل می‌خرد"], answer: "به گل‌ها آب می‌دهد" },
      { type: "choose", show: "پسر با گِل بازی کرد و دست‌هایش کثیف شد.", prompt: "در این جمله، کلمه دوم «گُل» است یا «گِل»؟", say: "جمله را بخوان. گل اینجا گُل است یا گِل؟",
        options: ["گُل", "گِل"], answer: "گِل" },
      { type: "choose", show: "مادربزرگ یک گل سرخ در گلدان گذاشت.", prompt: "«گل» اینجا چطور خوانده می‌شود؟", say: "گل اینجا گُل است یا گِل؟",
        options: ["گُل", "گِل"], answer: "گُل" },
      { type: "choose", show: "کرم از زیر خاک بیرون آمد.", prompt: "«کرم» اینجا چطور خوانده می‌شود؟", say: "کرم اینجا کِرم است یا کَرَم؟",
        options: ["کِرم", "کَرَم"], answer: "کِرم" },
      { type: "passage", prompt: "حالا بی‌نشانه بخوان.", text: "سینا یک دوچرخه دارد. او با دوچرخه به پارک می‌رود و با دوستانش بازی می‌کند.",
        question: "سینا با چه به پارک می‌رود؟", options: [{ label: "🚲", value: "دوچرخه" }, { label: "🚗", value: "ماشین" }, { label: "🚌", value: "اتوبوس" }], answer: "دوچرخه", pic: true }
    ]
  },
  {
    id: "read-sapling-40", subject: "read", level: "sapling", emoji: "👀", title: "کلمه‌های پرکاربرد",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و دو کلمه مثل هم را پیدا کن. هر کلمه را بلند بخوان.",
        pairs: [["است", "است"], ["این", "این"], ["که", "که"], ["را", "را"]] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و دو کلمه مثل هم را پیدا کن. هر کلمه را بلند بخوان.",
        pairs: [["با", "با"], ["از", "از"], ["بود", "بود"], ["می‌رود", "می‌رود"]] },
      { type: "choose", show: "این کتاب مال من است.", prompt: "کلمه «است» کجای جمله است؟", say: "جمله را بخوان. کدام کلمه است است؟",
        options: ["این", "کتاب", "است"], answer: "است" },
      { type: "choose", show: "سارا از مدرسه آمد.", prompt: "کدام کلمه «از» است؟", say: "کدام کلمه از است؟", options: ["سارا", "از", "آمد"], answer: "از" },
      { type: "choose", show: "نیما نان را به مادر داد.", prompt: "کدام کلمه «را» است؟", say: "کدام کلمه را است؟", options: ["را", "نان", "به"], answer: "را" },
      { type: "choose", show: "آن گربه که در حیاط بود، به خانه رفت.", prompt: "کدام کلمه «که» است؟", say: "کدام کلمه که است؟", options: ["آن", "که", "بود"], answer: "که" }
    ]
  },
  {
    id: "read-sapling-41", subject: "read", level: "sapling", emoji: "🗣️", title: "بلند بخوان ۲",
    steps: [
      { type: "readaloud", pic: "🚂", text: "قطار از تونل بیرون آمد. بچه‌ها از پنجره کوه‌ها را تماشا کردند. یکی پرسید: «کِی می‌رسیم؟»" },
      { type: "readaloud", pic: "🌧️", text: "باران تند شد. پرنده‌ها زیر برگ‌ها پنهان شدند. بعد خورشید آمد و رنگین‌کمان پیدا شد." },
      { type: "readaloud", pic: "🍉", text: "تابستان است. پدربزرگ یک هندوانه بزرگ آورد. همه دور سفره نشستند و خندیدند." },
      { type: "readaloud", pic: "🐈", text: "گربه آرام روی دیوار راه رفت. ناگهان پرید و توپ را گرفت. چه گربه بازیگوشی!" },
      { type: "readaloud", pic: "📚", text: "زهرا به کتابخانه رفت. او یک کتاب درباره ستاره‌ها برداشت. می‌خواهد امشب آن را برای برادرش بخواند." }
    ]
  },
  {
    id: "read-sapling-42", subject: "read", level: "sapling", emoji: "🟰", title: "هم‌معنی",
    steps: [
      { type: "pairs", prompt: "هر کلمه را با هم‌معنی‌اش جفت کن.", pairs: [["شاد", "خوشحال"], ["زیبا", "قشنگ"], ["تند", "سریع"], ["شروع", "آغاز"]] },
      { type: "choose", show: "سارا امروز خیلی شاد است.", prompt: "به جای «شاد» کدام کلمه را می‌شود گذاشت؟", say: "سارا امروز خیلی شاد است. به جای شاد کدام کلمه را می‌شود گذاشت؟",
        options: ["خوشحال", "خسته", "گرسنه"], answer: "خوشحال" },
      { type: "choose", show: "باغ مادربزرگ خیلی زیبا است.", prompt: "به جای «زیبا» کدام کلمه را می‌شود گذاشت؟", say: "به جای زیبا کدام کلمه را می‌شود گذاشت؟",
        options: ["بزرگ", "قشنگ", "سرد"], answer: "قشنگ" },
      { type: "choose", show: "قطار سریع رفت.", prompt: "هم‌معنی «سریع» کدام است؟", say: "هم‌معنی سریع کدام است؟", options: ["آرام", "تند", "دیر"], answer: "تند" },
      { type: "pairs", prompt: "این‌ها را هم جفت کن.", pairs: [["خانه", "منزل"], ["دوست", "رفیق"], ["کوچک", "کوچولو"], ["نگاه کرد", "تماشا کرد"]] },
      { type: "choose", show: "نیما با رفیقش به پارک رفت.", prompt: "«رفیق» یعنی چه؟", say: "رفیق یعنی چه؟", options: ["برادر", "دوست", "معلم"], answer: "دوست" }
    ]
  },
  {
    id: "read-sapling-43", subject: "read", level: "sapling", emoji: "↔️", title: "مخالف",
    steps: [
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و هر کلمه را با مخالفش جفت کن.", pairs: [["بالا", "پایین"], ["روز", "شب"], ["زود", "دیر"], ["گرم", "سرد"]] },
      { type: "choose", show: "پرنده بالای درخت است، گربه … درخت.", prompt: "کدام کلمه جمله را کامل می‌کند؟", say: "پرنده بالای درخت است، گربه ... درخت.",
        options: ["پایین", "بالای", "کنار"], answer: "پایین" },
      { type: "choose", show: "روز، خورشید می‌تابد. …، ماه پیدا می‌شود.", prompt: "مخالف «روز» کدام است؟", say: "روز، خورشید می‌تابد. ... ماه پیدا می‌شود.",
        options: ["صبح", "شب", "ظهر"], answer: "شب" },
      { type: "choose", show: "من زود خوابیدم، ولی برادرم … خوابید.", prompt: "مخالف «زود» کدام است؟", say: "من زود خوابیدم، ولی برادرم ... خوابید.",
        options: ["دیر", "زود", "تند"], answer: "دیر" },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. این‌ها را هم با مخالفشان جفت کن.", pairs: [["پر", "خالی"], ["باز", "بسته"], ["بزرگ", "کوچک"], ["آمد", "رفت"]] },
      { type: "choose", show: "در یخچال باز ماند. لطفاً آن را … کن.", prompt: "مخالف «باز» کدام است؟", say: "در یخچال باز ماند. لطفاً آن را ... کن.",
        options: ["پر", "بسته", "روشن"], answer: "بسته" }
    ]
  },
  {
    id: "read-sapling-44", subject: "read", level: "sapling", emoji: "🌳", title: "یکی، چندتا",
    steps: [
      { type: "choose", show: "یک کتاب، چند …", prompt: "اگر بیشتر از یکی باشد، چه می‌گوییم؟", say: "یک کتاب. اگر چند تا باشد، چه می‌گوییم؟",
        options: ["کتاب‌ها", "کتابان", "کتابی"], answer: "کتاب‌ها" },
      { type: "choose", show: "یک درخت، چند …", prompt: "برای درخت، در شعر و کتاب، «ـان» هم می‌گوییم. کدام درست است؟", say: "یک درخت. چند درخت را در کتاب‌ها چه می‌نویسند؟",
        options: ["درختان", "درختی", "درختم"], answer: "درختان" },
      { type: "sort", prompt: "جمع با «ـها» است یا با «ـان»؟", baskets: [{ label: "ـها" }, { label: "ـان" }],
        items: [{ label: "مدادها", basket: "ـها" }, { label: "دانش‌آموزان", basket: "ـان" }, { label: "میزها", basket: "ـها" },
          { label: "پرندگان", basket: "ـان" }, { label: "توپ‌ها", basket: "ـها" }, { label: "کودکان", basket: "ـان" }] },
      { type: "sort", prompt: "یکی است یا چندتا؟", baskets: [{ label: "یکی" }, { label: "چندتا" }],
        items: [{ label: "گل", basket: "یکی" }, { label: "گل‌ها", basket: "چندتا" }, { label: "ستاره‌ها", basket: "چندتا" },
          { label: "ماه", basket: "یکی" }, { label: "مردان", basket: "چندتا" }, { label: "دریا", basket: "یکی" }] },
      { type: "choose", show: "سه گربه روی دیوار نشسته‌اند.", prompt: "بعد از عدد، اسم را چطور می‌گوییم؟", say: "سه گربه. بعد از عدد، اسم را یکی می‌گوییم یا جمع؟",
        options: ["یکی: سه گربه", "جمع: سه گربه‌ها"], answer: "یکی: سه گربه" }
    ]
  },
  {
    id: "read-sapling-45", subject: "read", level: "sapling", emoji: "🎲", title: "بازی کلمه‌ها ۴",
    steps: [
      { type: "pairs", prompt: "هم‌معنی‌ها را جفت کن.", pairs: [["شاد", "خوشحال"], ["قشنگ", "زیبا"], ["خانه", "منزل"]] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و مخالف‌ها را پیدا کن.", pairs: [["روز", "شب"], ["پر", "خالی"], ["زود", "دیر"]] },
      { type: "sort", prompt: "یکی است یا چندتا؟", baskets: [{ label: "یکی" }, { label: "چندتا" }],
        items: [{ label: "کتاب", basket: "یکی" }, { label: "درختان", basket: "چندتا" }, { label: "پرنده", basket: "یکی" }, { label: "بچه‌ها", basket: "چندتا" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان و دو کلمه مثل هم را پیدا کن. تند بخوان!", pairs: [["است", "است"], ["که", "که"], ["از", "از"]] },
      { type: "sort", prompt: "هم‌معنی «بزرگ» است یا مخالف آن؟", baskets: [{ label: "هم‌معنی" }, { label: "مخالف" }],
        items: [{ label: "کوچک", basket: "مخالف" }, { label: "گنده", basket: "هم‌معنی" }, { label: "ریز", basket: "مخالف" }, { label: "درشت", basket: "هم‌معنی" }] }
    ]
  },
  {
    id: "read-sapling-46", subject: "read", level: "sapling", emoji: "🧢", title: "قصه و آدم‌هایش",
    steps: [
      /* A short story seen first, then read: Ali's cap blows away in the park and a dog brings it back.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "ببین. بعد قصه را بخوان.",
        parts: {
          bg: { art: "read-bg-garden" },
          ali: { art: "read-kid", look: { hair: "short", top: "#5b9bd5" }, at: [56, 86], s: 1.4 },
          hat: { art: "read-hat", at: [56.8, 52.5], s: 1.2 }, wind: { art: "read-wind", at: [10, 40], o: 0 },
          dog: { art: "🐕", at: [176, 86], s: 1.1 }
        },
        scenes: [
          { caption: "علی با کلاه قرمزش در پارک بود.", do: [
            { id: "ali", to: { y: "-1.5" }, dur: 2400, yoyo: true, times: 4 }, { id: "hat", to: { y: "-1.5" }, dur: 2400, yoyo: true, times: 4 }
          ] },
          { caption: "باد تندی آمد و کلاه علی را برد.", key: 1800, do: [
            { id: "wind", to: { o: 1 }, dur: 300 }, { id: "wind", to: { x: 70 }, dur: 1800, ease: "linear" }, { id: "wind", to: { o: 0 }, at: 1700, dur: 300 },
            { id: "hat", path: "M56.8 52.5Q90 30 128 80", at: 600, dur: 2000 }, { id: "hat", to: { r: 200 }, at: 600, dur: 2000 }
          ] },
          { caption: "علی ناراحت شد.", do: [
            { id: "ali.smile", to: { o: 0 }, dur: 300 }, { id: "ali.sad", to: { o: 1 }, dur: 300 }
          ] },
          { caption: "یک سگ مهربان دوید، کلاه را با دهانش گرفت و برای علی آورد.", key: 3800, hold: 6000, do: [
            { id: "dog", to: { x: 134 }, dur: 1600, ease: "linear" },
            { id: "hat", to: { x: 124, y: 74, r: 0 }, at: 1700, dur: 300 },
            { id: "dog", to: { x: 82 }, at: 2200, dur: 1800, ease: "linear" }, { id: "hat", to: { x: 72 }, at: 2200, dur: 1800, ease: "linear" }
          ] },
          { caption: "علی کلاهش را گذاشت و سگ را ناز کرد. حالا خوشحال است.", do: [
            { id: "hat", to: { x: 56.8, y: 52.5 }, dur: 900 }, { id: "ali.armF", to: { r: -70 }, at: 1000, dur: 500 },
            { id: "ali.sad", to: { o: 0 }, at: 1000, dur: 200 }, { id: "ali.eyes", to: { o: 0 }, at: 1000, dur: 200 }, { id: "ali.laugh", to: { o: 1 }, at: 1000, dur: 200 },
            { id: "dog", to: { r: 6 }, at: 1400, dur: 1600, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "passage", text: "علی با کلاه قرمزش در پارک بود. باد تندی آمد و کلاه را برد. علی ناراحت شد. یک سگ مهربان دوید و کلاه را برایش آورد. علی سگ را ناز کرد.",
        question: "چه کسی کلاه را آورد؟", options: [{ label: "👨", value: "پدر" }, { label: "🐕", value: "سگ" }, { label: "🐈", value: "گربه" }], answer: "سگ", pic: true },
      { type: "passage", text: "علی با کلاه قرمزش در پارک بود. باد تندی آمد و کلاه را برد. علی ناراحت شد. یک سگ مهربان دوید و کلاه را برایش آورد. علی سگ را ناز کرد.",
        question: "این قصه کجا اتفاق افتاد؟", options: ["در مدرسه", "در پارک", "در خانه"], answer: "در پارک" },
      { type: "order", prompt: "اتفاق‌های قصه را به ترتیب بچین.", numbered: true,
        items: ["باد کلاه را برد.", "سگ کلاه را آورد.", "علی سگ را ناز کرد."] },
      { type: "talk", scene: "🧢 🌬️ 🐕 😄", caption: "قصه را با کلمه‌های خودت برای بزرگ‌ترت تعریف کن.",
        tips: ["بپرسید: «اول چه شد؟ بعد؟ آخرش؟»", "بپرسید: «علی کی ناراحت شد؟ کی خوشحال شد؟ چرا؟»", "اگر چیزی را جا انداخت، به متن نگاه کنید."] }
    ]
  },
  {
    id: "read-sapling-47", subject: "read", level: "sapling", emoji: "🤔", title: "چرا این‌طور شد؟",
    steps: [
      { type: "passage", text: "مینا چترش را برداشت و چکمه‌هایش را پوشید. آسمان پر از ابرهای سیاه بود.", question: "فکر می‌کنی هوا چطور بود؟",
        options: [{ label: "☀️", value: "آفتابی" }, { label: "🌧️", value: "بارانی" }], answer: "بارانی", pic: true },
      { type: "passage", text: "کاوه برج بلندی ساخت. برادر کوچکش آمد و به برج خورد. کاوه گریه کرد.", question: "چرا کاوه گریه کرد؟",
        options: ["چون برجش خراب شد", "چون گرسنه بود", "چون خوابش می‌آمد"], answer: "چون برجش خراب شد" },
      { type: "passage", text: "ساعت نه شب بود. نیلوفر خمیازه کشید و چشم‌هایش را مالید.", question: "نیلوفر چه حسی داشت؟",
        options: [{ label: "😴", value: "خواب‌آلود" }, { label: "😠", value: "عصبانی" }, { label: "😄", value: "خیلی شاد" }], answer: "خواب‌آلود", pic: true },
      { type: "passage", text: "رضا تخم‌مرغ را از دستش انداخت. تخم‌مرغ روی زمین افتاد.", question: "فکر می‌کنی بعدش چه شد؟",
        options: ["تخم‌مرغ شکست", "تخم‌مرغ پرواز کرد", "تخم‌مرغ بزرگ شد"], answer: "تخم‌مرغ شکست" },
      { type: "choose", show: "آب لیوان آن‌قدر داغ بود که بخار از آن بلند می‌شد.", prompt: "«بخار» یعنی چه؟ از جمله بفهم.", say: "از جمله بفهم: بخار یعنی چه؟",
        options: ["هوای گرمی که از آب داغ بلند می‌شود", "یک نوع میوه", "یک رنگ"], answer: "هوای گرمی که از آب داغ بلند می‌شود" },
      { type: "choose", show: "لاک‌پشت خیلی آهسته راه می‌رفت؛ آن‌قدر آرام که همه از او جلو زدند.", prompt: "«آهسته» یعنی چه؟", say: "آهسته یعنی چه؟",
        options: ["تند", "آرام", "بلند"], answer: "آرام" }
    ]
  },
  {
    id: "read-sapling-48", subject: "read", level: "sapling", emoji: "🦁", title: "حکایت",
    steps: [
      /* «شیر و موش», an old fable told in many languages, retold for Baghcheh. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به حکایت شیر و موش گوش کن",
        parts: {
          bg: { art: "read-bg-meadow" }, tree: { art: "read-tree-big", at: [36, 86], s: 0.9 },
          lion: { art: "🦁", at: [80, 84], s: 2 }, zz: { art: "zz", at: [96, 46], o: 0 },
          mouse: { art: "read-mouse", at: [176, 86], s: 1.1, flip: true },
          net: { art: "read-net", at: [80, 86], s: 1.4, o: 0 }
        },
        scenes: [
          { caption: "شیری زیر درخت خوابیده بود.", do: [
            { id: "zz", to: { o: 1 }, dur: 500 }, { id: "zz", to: { y: 40 }, dur: 2400, yoyo: true, times: 2 }
          ] },
          { caption: "موشی از روی پای شیر رد شد و شیر بیدار شد.", key: 2600, do: [
            { id: "mouse", walk: [94, 76], dur: 2000 }, { id: "zz", to: { o: 0 }, at: 2000, dur: 300 },
            { id: "lion", to: { s: 2.2 }, at: 2200, dur: 400, yoyo: true, times: 2 }
          ] },
          { caption: "شیر موش را گرفت. موش گفت: «مرا رها کن. شاید یک روز من هم به تو کمک کنم!»", hold: 7000, do: [
            { id: "mouse", to: { y: 66, r: -20 }, dur: 600 }, { id: "mouse", to: { y: 64 }, at: 700, dur: 1400, yoyo: true, times: 4 }
          ] },
          { caption: "شیر خندید و موش را رها کرد. موش دوید و رفت.", key: 2400, do: [
            { id: "lion", to: { r: 6 }, dur: 1000, yoyo: true, times: 2 },
            { id: "mouse", to: { y: 76, r: 0 }, at: 1000, dur: 600 },
            { id: "mouse", walk: [176, 86], at: 1700, dur: 2600 }
          ] },
          { caption: "چند روز بعد، شیر در دام شکارچی افتاد.", do: [
            { id: "net", to: { o: 1 }, dur: 100 }, { id: "net", draw: true, dur: 1600 },
            { id: "lion", to: { r: -6 }, at: 1600, dur: 600, yoyo: true, times: 4 }
          ] },
          { caption: "موش آمد و طناب‌های دام را با دندان‌هایش جوید.", key: 3400, do: [
            { id: "mouse", walk: [104, 86], dur: 2200 },
            { id: "mouse", to: { r: -14 }, at: 2400, dur: 1800, yoyo: true, times: 6 }
          ] },
          { caption: "دام باز شد و شیر آزاد شد. شیر از موش تشکر کرد.", do: [
            { id: "net", to: { y: 96, o: 0 }, dur: 1200 },
            { id: "lion", to: { y: "-3" }, at: 1300, dur: 1400, yoyo: true, times: 4 }
          ] }
        ] },
      { type: "passage", text: "شیری زیر درخت خوابیده بود. موشی از روی پایش رد شد. شیر بیدار شد و موش را گرفت. موش گفت: «مرا رها کن. شاید یک روز به تو کمک کنم!» شیر خندید و او را رها کرد. چند روز بعد، شیر در دام افتاد. موش آمد و طناب‌ها را جوید و شیر آزاد شد.",
        question: "موش چطور به شیر کمک کرد؟", options: ["طناب‌های دام را جوید", "برایش غذا آورد", "او را بیدار کرد"], answer: "طناب‌های دام را جوید" },
      { type: "passage", text: "شیر خندید، چون فکر می‌کرد موش کوچک نمی‌تواند به او کمک کند. ولی همان موش کوچک شیر را نجات داد.",
        question: "پیام این حکایت چیست؟", options: ["کوچک‌ها هم می‌توانند کمک کنند", "شیر از همه قوی‌تر است", "نباید زیر درخت خوابید"], answer: "کوچک‌ها هم می‌توانند کمک کنند" },
      { type: "talk", scene: "🦁 🐭 🕸️", caption: "حکایت شیر و موش را برای خانواده‌ات تعریف کن. پیامش را هم بگو.",
        tips: ["بگذارید با کلمه‌های خودش تعریف کند.", "بپرسید: «تو هم یک بار به کسی بزرگ‌تر از خودت کمک کرده‌ای؟»", "حکایت‌های کوتاه دیگری از کتاب‌های قدیمی برایش بخوانید."] }
    ]
  },
  {
    id: "read-sapling-49", subject: "read", level: "sapling", emoji: "🎵", title: "بخوان و حفظ کن",
    steps: [
      // A poem written for Baghcheh. Rhymes: باران — ناودان، شاد — باد.
      { type: "readaloud", pic: "🌧️", prompt: "این شعر را بلند بخوان.",
        text: "می‌بارد نم‌نم باران،\nشُرشُر می‌ریزد از ناودان.\nگل‌ها شدند تازه و شاد،\nمی‌رقصند با آواز باد." },
      { type: "clap", words: true, word: "می‌بارد نم‌نم باران", parts: ["می‌بارد", "نم‌نم", "باران"], prompt: "خط اول را بخوان و با هر کلمه دست بزن.", say: "می‌بارد نم نم باران" },
      { type: "clap", word: "گل‌ها شدند تازه و شاد", parts: ["گُل", "ها", "شُ", "دَند", "تا", "زه", "وُ", "شاد"], prompt: "خط سوم را بخش‌بخش بخوان و با هر بخش دست بزن. وزن شعر را حس کن.", say: "گل‌ها شدند تازه و شاد" },
      { type: "choose", prompt: "در شعر، کدام کلمه با «باران» هم‌قافیه است؟", options: ["ناودان", "گل‌ها", "باد"], answer: "ناودان" },
      { type: "choose", prompt: "کدام کلمه با «شاد» هم‌قافیه است؟", options: ["باران", "باد", "تازه"], answer: "باد" },
      { type: "doit", pic: "🎵", text: "شعر باران را حفظ کن و برای خانواده‌ات بخوان. با هر کلمه آرام دست بزن.",
        list: ["می‌بارد نم‌نم باران،", "شُرشُر می‌ریزد از ناودان.", "گل‌ها شدند تازه و شاد،", "می‌رقصند با آواز باد."] }
    ]
  },
  {
    id: "read-sapling-50", subject: "read", level: "sapling", emoji: "🧱", title: "جمله را کامل کن",
    steps: [
      { type: "choose", show: "مادر در آشپزخانه غذا …", prompt: "کدام کلمه جمله را کامل می‌کند؟", options: ["می‌پزد", "می‌خوابد", "می‌دود"], answer: "می‌پزد" },
      { type: "choose", show: "بچه‌ها در حیاط مدرسه …", prompt: "کدام کلمه جمله را کامل می‌کند؟", options: ["بازی می‌کنند", "پرواز می‌کنند", "شنا می‌کنند"], answer: "بازی می‌کنند" },
      { type: "choose", show: "پرسش: «کجا رفتی؟»", prompt: "کدام جواب یک جمله کامل است؟", options: ["پارک.", "من به پارک رفتم.", "رفتم پارک پارک."], answer: "من به پارک رفتم." },
      { type: "choose", show: "پرسش: «صبحانه چه خوردی؟»", prompt: "کدام جواب یک جمله کامل است؟", options: ["نان و پنیر خوردم.", "نان.", "خوردم."], answer: "نان و پنیر خوردم." },
      { type: "order", prompt: "کلمه‌ها را بچین تا جمله شود.", items: ["پرنده", "روی", "شاخه", "نشست."] },
      { type: "order", prompt: "کلمه‌ها را بچین تا جمله شود.", items: ["من", "هر", "شب", "کتاب", "می‌خوانم."] },
      { type: "choose", show: "سارا … را به دوستش داد. (کلمه: «توپش»)", prompt: "«توپش» کجای جمله می‌آید؟", options: ["سارا توپش را به دوستش داد.", "توپش سارا را به دوستش داد.", "سارا را به دوستش داد توپش."], answer: "سارا توپش را به دوستش داد." }
    ]
  },
  {
    id: "read-sapling-51", subject: "read", level: "sapling", emoji: "❗", title: "نشانه‌های نوشتن",
    steps: [
      { type: "choose", show: "امروز هوا آفتابی است…", prompt: "آخر این جمله کدام نشانه می‌آید؟", options: [".", "؟", "!"], answer: "." },
      { type: "choose", show: "اسم تو چیست…", prompt: "آخر این جمله کدام نشانه می‌آید؟", options: [".", "؟", "،"], answer: "؟" },
      { type: "choose", show: "وای، چه گل قشنگی…", prompt: "وقتی تعجب می‌کنیم یا خیلی خوشحالیم، کدام نشانه می‌آید؟", options: ["!", "؟", "،"], answer: "!" },
      { type: "choose", show: "من سیب… موز و انار خریدم.", prompt: "بین «سیب» و «موز» کدام نشانه می‌آید؟", options: ["،", "؟", "!"], answer: "،" },
      { type: "passage", text: "مادر پرسید: «کجا بودی؟» نیما گفت: «در کتابخانه بودم.»", question: "حرف نیما را کدام نشانه‌ها نشان می‌دهند؟",
        options: ["« »", "؟", "!"], answer: "« »" },
      { type: "choose", show: "معلم گفت … بچه‌ها، کتاب‌هایتان را باز کنید.", prompt: "حرف معلم را چطور می‌نویسیم؟",
        options: ["معلم گفت: «بچه‌ها، کتاب‌هایتان را باز کنید.»", "معلم گفت بچه‌ها؟ کتاب‌هایتان را باز کنید!", "معلم، گفت بچه‌ها کتاب‌هایتان را باز کنید"], answer: "معلم گفت: «بچه‌ها، کتاب‌هایتان را باز کنید.»" }
    ]
  },
  {
    id: "read-sapling-52", subject: "read", level: "sapling", emoji: "🖼️", title: "درباره تصویر بنویس",
    steps: [
      { type: "choose", show: "🏖️👧🪣", prompt: "کدام جمله درباره این تصویر است؟", options: ["دختری کنار دریا با سطلش بازی می‌کند.", "پسری در برف آدم‌برفی می‌سازد.", "گربه روی مبل خوابیده است."], answer: "دختری کنار دریا با سطلش بازی می‌کند." },
      { type: "choose", show: "🌳👴🍎", prompt: "کدام جمله درباره این تصویر است؟", options: ["پدربزرگ از درخت سیب می‌چیند.", "پدربزرگ در آشپزخانه چای می‌ریزد.", "پدربزرگ با اتوبوس می‌رود."], answer: "پدربزرگ از درخت سیب می‌چیند." },
      { type: "choose", show: "🌳👴🍎", prompt: "کدام جمله بیشتر درباره تصویر می‌گوید؟", options: ["پدربزرگ در باغ است.", "پدربزرگ در باغ، سیب‌های قرمز را می‌چیند و در سبد می‌گذارد."], answer: "پدربزرگ در باغ، سیب‌های قرمز را می‌چیند و در سبد می‌گذارد." },
      { type: "paper", lang: "fa", text: "یک تصویر از کتاب یا عکس خانوادگی انتخاب کن. درباره‌اش سه تا پنج جمله بنویس: چه کسی؟ کجا؟ چه کار می‌کند؟",
        example: "در عکس، مادربزرگ در حیاط است. او به گل‌ها آب می‌دهد. گربه کنارش خوابیده. هوا آفتابی است.",
        check: ["گفت چه کسی در تصویر است؟", "گفت کجاست؟", "گفت چه کار می‌کند؟", "هر جمله با نقطه تمام شد؟"] }
    ]
  },
  {
    id: "read-sapling-53", subject: "read", level: "sapling", emoji: "🔤", title: "هم‌صداها در کلمه‌ها",
    steps: [
      { type: "sort", prompt: "روی هر تصویر بزن و اسمش را بشنو. با «ص» نوشته می‌شود یا با «س»؟", say: "روی هر تصویر بزن و اسمش را بشنو. این کلمه با ص نوشته می‌شود یا با س؟",
        baskets: [{ label: "ص" }, { label: "س" }],
        items: [{ pic: "🌅", say: "صبح", basket: "ص" }, { pic: "🍎", say: "سیب", basket: "س" }, { pic: "🍞", say: "صبحانه", basket: "ص" },
          { pic: "🟩", say: "سبز", basket: "س" }, { pic: "🔊", say: "صدا", basket: "ص" }, { pic: "⚪", say: "سفید", basket: "س" }] },
      { type: "choose", show: "صبح، صبحانه", prompt: "«صبحانه» از خانواده «صبح» است. پس با کدام حرف شروع می‌شود؟", options: ["ص", "س", "ث"], answer: "ص" },
      { type: "choose", show: "ظهر، ظهرها", prompt: "«ظهرها» از خانواده «ظهر» است. با کدام حرف شروع می‌شود؟", options: ["ز", "ظ", "ض"], answer: "ظ" },
      { type: "build", hidden: true, pic: "🌅", word: "صبح", parts: ["ص", "ب", "ح"], extra: ["س", "ه"], say: "صبح" },
      { type: "build", hidden: true, pic: "🏡", word: "حیاط", parts: ["ح", "ی", "ا", "ط"], extra: ["ه", "ت"], say: "حیاط" },
      { type: "build", hidden: true, pic: "🍞", word: "صبحانه", parts: ["ص", "ب", "ح", "ا", "ن", "ه"], extra: ["س"], say: "صبحانه" }
    ]
  },
  {
    id: "read-sapling-54", subject: "read", level: "sapling", emoji: "👨‍👩‍👧", title: "خانواده کلمه‌ها",
    steps: [
      { type: "sort", prompt: "از خانواده «دان» است یا «کار»؟", baskets: [{ label: "دان" }, { label: "کار" }],
        items: [{ label: "دانا", basket: "دان" }, { label: "کارگر", basket: "کار" }, { label: "دانش", basket: "دان" },
          { label: "کارخانه", basket: "کار" }, { label: "دانشمند", basket: "دان" }, { label: "کاری", basket: "کار" }] },
      { type: "sort", prompt: "از خانواده «گل» است یا «باغ»؟", baskets: [{ label: "گل" }, { label: "باغ" }],
        items: [{ label: "گلدان", basket: "گل" }, { label: "باغبان", basket: "باغ" }, { label: "گلستان", basket: "گل" }, { label: "باغچه", basket: "باغ" }] },
      { type: "choose", prompt: "کدام کلمه از خانواده «دانش» نیست؟", options: ["دانا", "دانشمند", "دانه"], answer: "دانه" },
      { type: "build", word: "دانشمند", parts: ["دانش", "مند"], extra: ["گر"], prompt: "کلمه بساز: کسی که دانش زیادی دارد." },
      { type: "build", word: "کارگر", parts: ["کار", "گر"], extra: ["مند"], prompt: "کلمه بساز: کسی که کار می‌کند." }
    ]
  },
  {
    id: "read-sapling-55", subject: "read", level: "sapling", emoji: "➕", title: "کلمه بساز",
    steps: [
      { type: "build", word: "باغبان", parts: ["باغ", "بان"], extra: ["دان"], prompt: "کسی که از باغ نگه‌داری می‌کند: کلمه بساز." },
      { type: "build", word: "نمکدان", parts: ["نمک", "دان"], extra: ["بان"], prompt: "ظرفی که نمک در آن است: کلمه بساز." },
      { type: "build", word: "باغچه", parts: ["باغ", "چه"], extra: ["ستان"], prompt: "باغ کوچک: کلمه بساز." },
      { type: "build", word: "ایرانی", parts: ["ایران", "ی"], extra: ["چه"], prompt: "کسی که از ایران است: کلمه بساز." },
      { type: "choose", show: "گلستان", prompt: "«ـستان» در «گلستان» چه معنایی می‌دهد؟", options: ["جایی که گل زیاد دارد", "گل کوچک", "کسی که گل می‌فروشد"], answer: "جایی که گل زیاد دارد" },
      { type: "choose", show: "آهنگر", prompt: "«آهنگر» یعنی چه؟", options: ["کسی که با آهن کار می‌کند", "ظرف آهن", "آهن کوچک"], answer: "کسی که با آهن کار می‌کند" }
    ]
  },
  {
    id: "read-sapling-56", subject: "read", level: "sapling", emoji: "🔗", title: "کلمه‌های مرکب",
    steps: [
      { type: "build", word: "گل‌فروش", parts: ["گل", "‌فروش"], extra: ["‌خانه"], pic: "💐", prompt: "کسی که گل می‌فروشد." },
      { type: "build", word: "کتاب‌خانه", parts: ["کتاب", "‌خانه"], extra: ["‌فروش"], pic: "📚", prompt: "جایی که کتاب‌ها آن‌جاست." },
      { type: "build", word: "دست‌کش", parts: ["دست", "‌کش"], extra: ["‌پاش"], pic: "🧤", prompt: "چیزی که در زمستان دست می‌کنیم." },
      { type: "pairs", prompt: "هر کلمه مرکب را با معنایش جفت کن.",
        pairs: [["آب‌پاش", { pic: "🪴", say: "برای آب دادن به گل‌ها" }], ["دست‌کش", { pic: "🧤", say: "برای گرم کردن دست" }], ["کتاب‌خانه", { pic: "📚", say: "جای کتاب‌ها" }]] },
      { type: "choose", prompt: "کلمه مرکب را چطور درست می‌نویسیم؟", options: ["کتاب‌خانه", "کتاب خانه‌", "کتابخانهه"], answer: "کتاب‌خانه" }
    ]
  },
  {
    id: "read-sapling-57", subject: "read", level: "sapling", emoji: "🎲", title: "بازی کلمه‌سازی",
    steps: [
      { type: "sort", prompt: "از کدام خانواده است؟", baskets: [{ label: "کار" }, { label: "دان" }, { label: "گل" }],
        items: [{ label: "کارگر", basket: "کار" }, { label: "دانا", basket: "دان" }, { label: "گلدان", basket: "گل" },
          { label: "کارخانه", basket: "کار" }, { label: "دانش", basket: "دان" }, { label: "گلستان", basket: "گل" }] },
      { type: "build", word: "باغبان", parts: ["باغ", "بان"], extra: ["گر"], prompt: "کلمه بساز: کسی که از باغ نگه‌داری می‌کند." },
      { type: "build", word: "آب‌پاش", parts: ["آب", "‌پاش"], extra: ["‌کش"], prompt: "کلمه بساز: برای آب دادن به گل‌ها." },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر کلمه را با کلمه‌ای از خانواده‌اش جفت کن.",
        pairs: [["دانش", "دانشمند"], ["کار", "کارگر"], ["باغ", "باغچه"]] },
      { type: "sort", prompt: "کلمه مرکب است یا ساده؟", baskets: [{ label: "مرکب" }, { label: "ساده" }],
        items: [{ label: "گل‌فروش", basket: "مرکب" }, { label: "میز", basket: "ساده" }, { label: "دست‌کش", basket: "مرکب" }, { label: "کتاب", basket: "ساده" }] }
    ]
  },
  {
    id: "read-sapling-58", subject: "read", level: "sapling", emoji: "🌧️", title: "بخوانیم و یاد بگیریم",
    steps: [
      { type: "passage", prompt: "یک متن علمی بخوان. اول به عنوانش نگاه کن.",
        text: "باران چطور می‌بارد؟\nخورشید آب دریاها را گرم می‌کند. آب، بخار می‌شود و بالا می‌رود. بالای آسمان هوا سرد است. بخار سرد می‌شود و ابر درست می‌شود. وقتی قطره‌های ابر سنگین می‌شوند، باران می‌بارد.",
        question: "عنوان این متن چیست؟", options: ["باران چطور می‌بارد؟", "دریا", "خورشید"], answer: "باران چطور می‌بارد؟" },
      { type: "passage", text: "خورشید آب دریاها را گرم می‌کند. آب، بخار می‌شود و بالا می‌رود. بالای آسمان هوا سرد است. بخار سرد می‌شود و ابر درست می‌شود. وقتی قطره‌های ابر سنگین می‌شوند، باران می‌بارد.",
        question: "ابر از چه درست می‌شود؟", options: ["از بخار آب", "از دود", "از برف"], answer: "از بخار آب" },
      { type: "passage", text: "زیر عکس: «زنبورها از شهد گل‌ها عسل درست می‌کنند.»", question: "این جمله زیر عکس به ما چه می‌گوید؟",
        options: ["زنبورها با شهد گل عسل می‌سازند", "زنبورها گل می‌کارند"], answer: "زنبورها با شهد گل عسل می‌سازند" },
      { type: "choose", prompt: "از متن باران، کدام جمله درست است؟", options: ["بالای آسمان هوا سرد است.", "باران از خورشید می‌آید.", "ابرها از سنگ‌اند."], answer: "بالای آسمان هوا سرد است." },
      { type: "choose", prompt: "اگر بخواهی بدانی ماهی‌ها چطور نفس می‌کشند، کدام کتاب را برمی‌داری؟", options: ["کتاب علمی درباره ماهی‌ها", "کتاب شعر", "کتاب قصه جن و پری"], answer: "کتاب علمی درباره ماهی‌ها" }
    ]
  },
  {
    id: "read-sapling-59", subject: "read", level: "sapling", emoji: "💡", title: "کلمه‌های تازه",
    steps: [
      { type: "choose", show: "مادر گفت: «مواظب باش، زمین خیس است!»", prompt: "«مواظب باش» یعنی چه؟", options: ["دقت کن که اتفاقی نیفتد", "بدو", "بخواب"], answer: "دقت کن که اتفاقی نیفتد" },
      { type: "choose", show: "آرش فکر کرد و تصمیم گرفت اول تکالیفش را بنویسد.", prompt: "«تصمیم گرفت» یعنی چه؟", options: ["انتخاب کرد چه کار کند", "فراموش کرد", "خسته شد"], answer: "انتخاب کرد چه کار کند" },
      { type: "choose", show: "پسر کوچک به مادربزرگ کمک کرد تا کیسه‌ها را به خانه ببرد.", prompt: "«کمک کرد» یعنی چه؟", options: ["با او کار را انجام داد", "از او دور شد", "او را صدا زد"], answer: "با او کار را انجام داد" },
      { type: "choose", prompt: "کدام جمله «تصمیم» را درست به کار برده است؟", options: ["من تصمیم گرفتم امروز به گل‌ها آب بدهم.", "تصمیم روی درخت نشست.", "من یک تصمیم خوردم."], answer: "من تصمیم گرفتم امروز به گل‌ها آب بدهم." },
      { type: "pairs", prompt: "هر کلمه تازه را با معنایش جفت کن.", pairs: [["مواظب", "با دقت"], ["تصمیم", "انتخاب"], ["کمک", "یاری"], ["شجاع", "نترس"]] }
    ]
  },
  {
    id: "read-sapling-60", subject: "read", level: "sapling", emoji: "🗣️", title: "برایم تعریف کن",
    steps: [
      { type: "talk", scene: "🧒 📖 👨‍👩‍👧", caption: "یک قصه یا یک چیز تازه که یاد گرفتی را برای خانواده‌ات تعریف کن.",
        tips: ["از او بخواهید به ترتیب تعریف کند: «اول… بعد… آخرش…»", "بعد دو سؤال بپرسید: «چرا؟» و «بعدش چه شد؟»", "به او نگاه کنید و صبر کنید تا حرفش تمام شود."] },
      { type: "doit", pic: "🎤", text: "بلند و واضح حرف بزن، طوری که همه بشنوند. به کسی که گوش می‌دهد نگاه کن.",
        list: ["اول بگو درباره چه می‌خواهی تعریف کنی.", "به ترتیب بگو.", "آخرش بگو چه چیزی را بیشتر دوست داشتی."] },
      { type: "talk", scene: "🌳 🚶 👀", caption: "امروز در کوچه یا پارک چه دیدی؟ برای ما تعریف کن.",
        tips: ["بپرسید: «کجا بودی؟ چه کسی را دیدی؟ چه اتفاقی افتاد؟»", "اگر کوتاه گفت، بپرسید: «بیشتر بگو، چه شکلی بود؟»"] },
      { type: "doit", pic: "📞", text: "به یک نفر از فامیل (مادربزرگ، خاله، عمو) زنگ بزن و قصه امروزت را برایش تعریف کن.",
        list: ["سلام کن.", "قصه را به ترتیب بگو.", "از او بپرس: «تو امروز چه کردی؟»"] },
      { type: "talk", scene: "💭 ❓", caption: "حالا تو از بزرگ‌ترت بخواه یک چیز را برایت تعریف کند. تو دو سؤال بپرس.",
        tips: ["خودتان یک قصه کوتاه بگویید و صبر کنید تا او سؤال بپرسد.", "سؤال‌هایش را تشویق کنید: «سؤال خوبی پرسیدی!»"] }
    ]
  },
  {
    id: "read-sapling-61", subject: "read", level: "sapling", emoji: "📚", title: "کتاب‌خوانی",
    steps: [
      { type: "talk", scene: "📚 🧒 🔍", caption: "یک کتاب کوتاه انتخاب کن: از قفسه خانه، از کتابخانه، یا از یک دوست. به جلدش نگاه کن: فکر می‌کنی درباره چیست؟",
        tips: ["بگذارید خودش کتاب را انتخاب کند، حتی اگر ساده باشد.", "بپرسید: «از روی عنوان و تصویر جلد، حدس می‌زنی چه اتفاقی می‌افتد؟»"] },
      { type: "doit", pic: "📖", text: "کتاب را تنها بخوان. اگر کلمه‌ای سخت بود، آن را آرام صدا به صدا بخوان یا از بزرگ‌ترت بپرس.",
        list: ["جای آرامی بنشین.", "اگر خسته شدی، علامت بگذار و فردا ادامه بده."] },
      { type: "talk", scene: "📖 💬 👨‍👩‍👧", caption: "درباره کتابت بگو: چه کسانی در آن بودند؟ چه اتفاقی افتاد؟ کدام قسمتش را بیشتر دوست داشتی؟",
        tips: ["سؤال‌های باز بپرسید: «چرا آن قسمت را دوست داشتی؟»", "شما هم بگویید کدام قسمت را دوست داشتید.", "اگر حدسش درباره جلد درست بود، به آن اشاره کنید."] },
      { type: "paper", lang: "fa", text: "در دفتر کتاب‌خوانی‌ات بنویس: اسم کتاب، اسم نویسنده، و یک جمله درباره آن.",
        example: "کتاب: کدو قلقله‌زن. این کتاب درباره پیرزنی زرنگ است که در کدو قایم شد.",
        check: ["اسم کتاب را درست نوشت؟", "یک جمله کامل درباره کتاب نوشت؟"] },
      { type: "forparents", guide: "literacy", guideLabel: "راهنمای خواندن و نوشتن در خانه",
        tips: ["هر روز ده تا پانزده دقیقه وقت کتاب‌خوانی داشته باشید؛ کودک شما را هم در حال خواندن ببیند.",
          "از فهرست کتاب‌های شورای کتاب کودک و کتابخانه‌های عمومی محله کمک بگیرید.",
          "کتاب‌هایی را انتخاب کنید که کودک بیشترشان را می‌تواند بخواند و فقط چند کلمه برایش تازه است.",
          "دفتر کتاب‌خوانی را با هم نگه دارید و هر چند وقت یک بار آن را ورق بزنید."] }
    ]
  },
  {
    id: "read-sapling-62", subject: "read", level: "sapling", emoji: "📄", title: "متن بی‌نشانه",
    steps: [
      { type: "passage", prompt: "این متن نشانه ندارد. بخوان.", text: "پرستو پرنده کوچکی است. در پاییز به جاهای گرم می‌رود و در بهار برمی‌گردد. پرستوها لانه‌شان را با گل می‌سازند.",
        question: "پرستوها در پاییز کجا می‌روند؟", options: ["به جاهای گرم", "به کوه‌های برفی", "زیر زمین"], answer: "به جاهای گرم" },
      { type: "choose", show: "شیر را از یخچال درآوردم و در لیوان ریختم.", prompt: "«شیر» اینجا کدام است؟", pic: true,
        options: [{ label: "🦁", value: "حیوان" }, { label: "🥛", value: "نوشیدنی" }, { label: "🚰", value: "شیر آب" }], answer: "نوشیدنی" },
      { type: "choose", show: "لیوان پر از آب است.", prompt: "«پر» اینجا چطور خوانده می‌شود؟", options: ["پَر", "پُر"], answer: "پُر" },
      { type: "choose", show: "کبوتر یک پر سفید روی زمین انداخت.", prompt: "«پر» اینجا چطور خوانده می‌شود؟", options: ["پَر", "پُر"], answer: "پَر" },
      { type: "passage", prompt: "بی‌نشانه بخوان.", text: "در جنگل‌های شمال ایران درخت‌های بلند و سبز زیادی هست. باران زیاد می‌بارد و هوا مرطوب است. سنجاب‌ها روی درخت‌ها بازی می‌کنند.",
        question: "در جنگل‌های شمال، هوا چطور است؟", options: ["خشک و داغ", "مرطوب", "خیلی سرد و برفی"], answer: "مرطوب" },
      { type: "passage", prompt: "بی‌نشانه بخوان.", text: "مادربزرگ گفت: «امشب برایتان قصه می‌گویم.» بچه‌ها زود مسواک زدند و کنار مادربزرگ نشستند.",
        question: "بچه‌ها چرا زود مسواک زدند؟", options: ["چون می‌خواستند قصه بشنوند", "چون دندانشان درد می‌کرد", "چون صبح بود"], answer: "چون می‌خواستند قصه بشنوند" }
    ]
  },
  {
    id: "read-sapling-63", subject: "read", level: "sapling", emoji: "🎭", title: "روان و با حالت",
    steps: [
      { type: "readaloud", pic: "❓", prompt: "بلند بخوان. سر «؟» صدایت را بالا ببر.", text: "تو کجا بودی؟ چرا دیر آمدی؟ من خیلی منتظرت بودم." },
      { type: "readaloud", pic: "❗", prompt: "بلند بخوان. سر «!» با هیجان بخوان.", text: "وای، چه برف قشنگی! همه‌جا سفید شده! بیا آدم‌برفی بسازیم!" },
      { type: "readaloud", pic: "⏸️", prompt: "بلند بخوان. سر «،» کمی مکث کن و سر «.» بیشتر.", text: "در بازار، سیب، پرتقال، انار و خیار بود. ما سیب خریدیم. بعد، به خانه برگشتیم." },
      { type: "readaloud", pic: "🐻", prompt: "بلند بخوان. خرس با صدای کلفت حرف بزند و موش با صدای نازک.",
        text: "خرس گفت: «من خیلی گرسنه‌ام!» موش گفت: «بیا، این عسل مال تو!» خرس خندید و گفت: «ممنونم، دوست کوچکم.»" },
      { type: "readaloud", pic: "🌊", prompt: "این بند را آرام و با حالت بخوان.", text: "دریا آرام بود. موج‌های کوچک به ساحل می‌خوردند. ناگهان یک دلفین از آب بیرون پرید! بچه‌ها فریاد زدند: «دلفین!»" }
    ]
  },
  {
    id: "read-sapling-64", subject: "read", level: "sapling", emoji: "🏷️", title: "اسم",
    steps: [
      { type: "sort", prompt: "اسم آدم است، حیوان، چیز یا جا؟", baskets: [{ label: "آدم" }, { label: "حیوان" }, { label: "چیز" }, { label: "جا" }],
        items: [{ label: "معلم", basket: "آدم" }, { label: "گنجشک", basket: "حیوان" }, { label: "مداد", basket: "چیز" }, { label: "مدرسه", basket: "جا" },
          { label: "خواهر", basket: "آدم" }, { label: "اسب", basket: "حیوان" }, { label: "توپ", basket: "چیز" }, { label: "پارک", basket: "جا" }] },
      { type: "mark", prompt: "اسم‌های این جمله را علامت بزن.", text: "سارا یک کتاب و یک مداد خرید.", answer: ["سارا", "کتاب", "مداد"] },
      { type: "mark", prompt: "اسم‌ها را علامت بزن.", text: "گربه روی دیوار حیاط نشست.", answer: ["گربه", "دیوار", "حیاط"] },
      { type: "sort", prompt: "اسم خاص است (اسم یک نفر یا یک جای خاص) یا اسم عام؟", baskets: [{ label: "خاص" }, { label: "عام" }],
        items: [{ label: "تبریز", basket: "خاص" }, { label: "شهر", basket: "عام" }, { label: "سارا", basket: "خاص" }, { label: "دختر", basket: "عام" },
          { label: "کارون", basket: "خاص" }, { label: "رود", basket: "عام" }] },
      { type: "mark", prompt: "اسم‌های خاص را علامت بزن.", text: "نیما و مریم به شیراز رفتند.", answer: ["نیما", "مریم", "شیراز"] }
    ]
  },
  {
    id: "read-sapling-65", subject: "read", level: "sapling", emoji: "🏃", title: "فعل",
    steps: [
      { type: "mark", prompt: "فعل این جمله را علامت بزن: کاری که انجام شد. در فارسی، فعل معمولاً آخر جمله است.", text: "پسر توپ را انداخت.", answer: ["انداخت"] },
      { type: "mark", prompt: "فعل را علامت بزن.", text: "مادربزرگ برای ما آش پخت.", answer: ["پخت"] },
      { type: "mark", prompt: "فعل‌های این دو جمله را علامت بزن.", text: "سارا خندید. برادرش دوید.", answer: ["خندید", "دوید"] },
      { type: "sort", prompt: "فعل است یا اسم؟", baskets: [{ label: "فعل" }, { label: "اسم" }],
        items: [{ label: "نوشت", basket: "فعل" }, { label: "دفتر", basket: "اسم" }, { label: "می‌خوابد", basket: "فعل" },
          { label: "تخت", basket: "اسم" }, { label: "رفتیم", basket: "فعل" }, { label: "جاده", basket: "اسم" }] },
      { type: "mark", prompt: "فعل را علامت بزن.", text: "بچه‌ها در حیاط فوتبال بازی می‌کنند.", answer: ["می‌کنند"] }
    ]
  },
  {
    id: "read-sapling-66", subject: "read", level: "sapling", emoji: "🎨", title: "صفت",
    steps: [
      { type: "mark", prompt: "کلمه‌ای را که می‌گوید سیب چطور است علامت بزن.", text: "من یک سیب سرخ خوردم.", answer: ["سرخ"] },
      { type: "mark", prompt: "صفت‌ها را علامت بزن: کلمه‌هایی که می‌گویند چیزی چطور است.", text: "کوه بلند و رود آرام را دیدیم.", answer: ["بلند", "آرام"] },
      { type: "choose", show: "یک گربه … روی مبل خوابیده بود.", prompt: "کدام صفت جمله را قشنگ‌تر می‌کند؟", options: ["سفید", "دوید", "دیروز"], answer: "سفید" },
      { type: "choose", show: "پدربزرگ یک چای … برایم ریخت.", prompt: "کدام صفت مناسب است؟", options: ["داغ", "پرید", "مدرسه"], answer: "داغ" },
      { type: "mark", prompt: "صفت‌ها را علامت بزن.", text: "پرنده کوچک روی شاخه سبز نشست.", answer: ["کوچک", "سبز"] },
      { type: "choose", prompt: "در «کتاب قشنگ»، کدام کلمه صفت است؟", options: ["کتاب", "قشنگ"], answer: "قشنگ" }
    ]
  },
  {
    id: "read-sapling-67", subject: "read", level: "sapling", emoji: "📅", title: "دیروز، امروز، فردا",
    steps: [
      { type: "sort", prompt: "دیروز است، امروز (الان) یا فردا؟", baskets: [{ label: "دیروز" }, { label: "امروز" }, { label: "فردا" }],
        items: [{ label: "رفت", basket: "دیروز" }, { label: "می‌رود", basket: "امروز" }, { label: "خواهد رفت", basket: "فردا" },
          { label: "خورد", basket: "دیروز" }, { label: "می‌خورد", basket: "امروز" }, { label: "خواهد خورد", basket: "فردا" }] },
      { type: "passage", text: "دیروز به باغ وحش رفتیم. امروز در خانه نقاشی می‌کشیم. فردا به دیدن مادربزرگ خواهیم رفت.",
        question: "فردا چه کار خواهند کرد؟", options: ["به باغ وحش می‌روند", "نقاشی می‌کشند", "به دیدن مادربزرگ می‌روند"], answer: "به دیدن مادربزرگ می‌روند" },
      { type: "passage", text: "دیروز به باغ وحش رفتیم. امروز در خانه نقاشی می‌کشیم. فردا به دیدن مادربزرگ خواهیم رفت.",
        question: "کدام کار مال گذشته است؟", options: ["رفتیم", "می‌کشیم", "خواهیم رفت"], answer: "رفتیم" },
      { type: "sort", prompt: "این‌ها را هم جدا کن.", baskets: [{ label: "دیروز" }, { label: "امروز" }, { label: "فردا" }],
        items: [{ label: "نوشتم", basket: "دیروز" }, { label: "می‌نویسم", basket: "امروز" }, { label: "خواهم نوشت", basket: "فردا" }] },
      { type: "passage", text: "الان باران می‌بارد. نیما پشت پنجره ایستاده و بیرون را تماشا می‌کند.", question: "این کارها کی اتفاق می‌افتد؟",
        options: ["دیروز", "الان", "فردا"], answer: "الان" }
    ]
  },
  {
    id: "read-sapling-68", subject: "read", level: "sapling", emoji: "👥", title: "من، تو، او",
    steps: [
      { type: "choose", show: "من دیروز به پارک …", prompt: "کدام درست است؟", options: ["رفتم", "رفتی", "رفتند"], answer: "رفتم" },
      { type: "choose", show: "تو کتابت را …؟", prompt: "کدام درست است؟", options: ["آوردم", "آوردی", "آوردیم"], answer: "آوردی" },
      { type: "choose", show: "ما با هم ناهار …", prompt: "کدام درست است؟", options: ["خوردیم", "خورد", "خوردی"], answer: "خوردیم" },
      { type: "choose", show: "آن‌ها در حیاط بازی …", prompt: "کدام درست است؟", options: ["کردم", "کردید", "کردند"], answer: "کردند" },
      { type: "pairs", prompt: "هر کس را با فعلش جفت کن.", pairs: [["من", "دیدم"], ["تو", "دیدی"], ["او", "دید"], ["ما", "دیدیم"], ["شما", "دیدید"], ["آن‌ها", "دیدند"]] },
      { type: "choose", show: "شما کی …؟", prompt: "کدام درست است؟", options: ["آمدید", "آمدم", "آمد"], answer: "آمدید" }
    ]
  },
  {
    id: "read-sapling-69", subject: "read", level: "sapling", emoji: "🎲", title: "بازی دستور",
    steps: [
      { type: "sort", prompt: "اسم است، فعل یا صفت؟", baskets: [{ label: "اسم" }, { label: "فعل" }, { label: "صفت" }],
        items: [{ label: "درخت", basket: "اسم" }, { label: "دوید", basket: "فعل" }, { label: "بلند", basket: "صفت" }, { label: "مادر", basket: "اسم" },
          { label: "می‌نویسد", basket: "فعل" }, { label: "شیرین", basket: "صفت" }] },
      { type: "pairs", prompt: "هر کس را با فعلش جفت کن.", pairs: [["من", "رفتم"], ["ما", "رفتیم"], ["آن‌ها", "رفتند"]] },
      { type: "sort", prompt: "دیروز، امروز یا فردا؟", baskets: [{ label: "دیروز" }, { label: "امروز" }, { label: "فردا" }],
        items: [{ label: "دیدم", basket: "دیروز" }, { label: "می‌بینم", basket: "امروز" }, { label: "خواهم دید", basket: "فردا" }] },
      { type: "order", prompt: "کلمه‌ها را بچین تا جمله شود.", items: ["پرنده", "زیبا", "آواز", "خواند."] },
      { type: "pairs", prompt: "هر اسم را با یک صفت مناسب جفت کن.", pairs: [["آسمان", "آبی"], ["برف", "سفید"], ["عسل", "شیرین"]] }
    ]
  },
  {
    id: "read-sapling-70", subject: "read", level: "sapling", emoji: "🌵", title: "خار یا خوار؟",
    steps: [
      { type: "choose", show: "در بیابان، گل‌ها … دارند.", prompt: "کدام درست است؟ (تیغ گیاه)", options: ["خار", "خوار"], answer: "خار" },
      { type: "choose", show: "پلنگ گوشت‌… است.", prompt: "کدام درست است؟ (چیزی که می‌خورد)", options: ["خار", "خوار"], answer: "خوار" },
      { type: "choose", show: "مادربزرگ … سال دارد؟ نه، هفتاد سال!", prompt: "عدد ۱۰۰ را چطور می‌نویسیم؟", options: ["صد", "سد"], answer: "صد" },
      { type: "choose", show: "پشت … کرج، دریاچه بزرگی است.", prompt: "دیواری که جلوی آب رود را می‌گیرد چطور نوشته می‌شود؟", options: ["صد", "سد"], answer: "سد" },
      { type: "choose", show: "من … که بیشتر کتاب بخوانم.", prompt: "کدام درست است؟ (دلم می‌خواهد)", options: ["می‌خواهم", "می‌خاهم"], answer: "می‌خواهم" },
      { type: "choose", show: "او از جایش … و رفت.", prompt: "کدام درست است؟ (بلند شد)", options: ["برخاست", "برخواست"], answer: "برخاست" }
    ]
  },
  {
    id: "read-sapling-71", subject: "read", level: "sapling", emoji: "🪚", title: "املای تشدید، تنوین و همزه",
    steps: [
      { type: "build", hidden: true, pic: "👷", word: "بنّا", parts: ["ب", "نّ", "ا"], extra: ["ن"], say: "بنّا" },
      { type: "build", hidden: true, pic: "⏱️", word: "فوراً", parts: ["ف", "و", "ر", "اً"], extra: ["ن"], say: "فوراً" },
      { type: "build", hidden: true, pic: "🍂", word: "پاییز", parts: ["پ", "ا", "ی", "ی", "ز"], extra: ["ئ"], say: "پاییز" },
      { type: "choose", prompt: "کدام درست نوشته شده است؟", options: ["مسئله", "مسعله", "مسله"], answer: "مسئله" },
      { type: "choose", prompt: "کدام درست نوشته شده است؟", options: ["جزء", "جذء", "جز ع"], answer: "جزء" },
      { type: "choose", show: "او … به خانه برگشت.", prompt: "کدام درست است؟ (خیلی زود)", options: ["فوراً", "فورن", "فوران"], answer: "فوراً" }
    ]
  },
  {
    id: "read-sapling-72", subject: "read", level: "sapling", emoji: "📝", title: "املای بند",
    steps: [
      { type: "paper", lang: "fa", text: "املا! بزرگ‌ترت یک بند کوتاه می‌خواند. آن را در دفترت بنویس. بعد با متن مقایسه کن و غلط‌ها را درست کن.",
        check: ["همه جمله‌ها را نوشت؟", "نقطه و ویرگول را گذاشت؟", "خودش با متن مقایسه کرد؟", "کلمه‌های سخت را پیدا کرد؟"],
        note: "متن (برای شما): «صبح زود، خورشید از پشت کوه طلوع کرد. پرنده‌ها روی درخت حیاط آواز خواندند. مادر صبحانه را آماده کرد و همه با هم غذا خوردیم.» هر جمله را در دو یا سه تکه بخوانید و صبر کنید. آخر کار متن را نشانش بدهید تا خودش مقایسه کند." },
      { type: "build", hidden: true, pic: "🌅", word: "طلوع", parts: ["ط", "ل", "و", "ع"], extra: ["ت", "ا"], say: "طلوع" },
      { type: "build", hidden: true, pic: "🏡", word: "حیاط", parts: ["ح", "ی", "ا", "ط"], extra: ["ه", "ت"], say: "حیاط" },
      { type: "build", hidden: true, pic: "🍳", word: "آماده", parts: ["آ", "م", "ا", "د", "ه"], extra: ["ع"], say: "آماده" },
      { type: "build", hidden: true, pic: "🍲", word: "غذا", parts: ["غ", "ذ", "ا"], extra: ["ق", "ز"], say: "غذا" }
    ]
  },
  {
    id: "read-sapling-73", subject: "read", level: "sapling", emoji: "🔗", title: "جمله‌ها را به هم وصل کن",
    steps: [
      { type: "choose", show: "من سیب دوست دارم … خواهرم پرتقال.", prompt: "کدام کلمه دو جمله را خوب به هم وصل می‌کند؟", options: ["و", "چون", "امّا"], answer: "و" },
      { type: "choose", show: "می‌خواستم بازی کنم، … باران آمد.", prompt: "کدام کلمه درست است؟", options: ["امّا", "و", "چون"], answer: "امّا" },
      { type: "choose", show: "نیما چترش را برداشت، … باران می‌آمد.", prompt: "کدام کلمه درست است؟", options: ["امّا", "چون", "بعد"], answer: "چون" },
      { type: "choose", show: "اول مسواک زدم، … خوابیدم.", prompt: "کدام کلمه درست است؟", options: ["چون", "بعد", "امّا"], answer: "بعد" },
      { type: "order", prompt: "تکه‌ها را بچین تا یک جمله درست شود.", items: ["گرسنه بودم،", "پس", "نان و پنیر", "خوردم."] },
      { type: "order", prompt: "این‌ها را هم بچین.", items: ["هوا سرد بود،", "برای همین", "کلاهم را", "سرم گذاشتم."] }
    ]
  },
  {
    id: "read-sapling-74", subject: "read", level: "sapling", emoji: "📃", title: "بند بنویسیم",
    steps: [
      { type: "order", prompt: "جمله‌های این بند را به ترتیب بچین. جمله اول می‌گوید بند درباره چیست.", numbered: true,
        items: ["گربه ما خیلی بازیگوش است.", "صبح‌ها دنبال توپ کوچکش می‌دود.", "ظهرها روی فرش با کاموا بازی می‌کند.", "شب‌ها خسته کنار بخاری می‌خوابد."] },
      { type: "order", prompt: "این بند را هم به ترتیب بچین.", numbered: true,
        items: ["باغچه ما در بهار خیلی قشنگ است.", "گل‌های سرخ و زرد باز می‌شوند.", "زنبورها روی گل‌ها می‌نشینند.", "بوی خوب گل‌ها همه‌جا را پر می‌کند."] },
      { type: "paper", lang: "fa", text: "یک بند درباره یک تصویر یا یک حیوان بنویس: جمله اول بگوید درباره چیست، بعد سه جمله دیگر بنویس.",
        example: "سگ همسایه ما خیلی مهربان است. هر روز جلوی در منتظر بچه‌ها می‌نشیند. وقتی ما را می‌بیند، دُمش را تکان می‌دهد. شب‌ها خانه را نگهبانی می‌کند.",
        check: ["جمله اول گفت بند درباره چیست؟", "جمله‌های بعدی درباره همان موضوع بودند؟", "هر جمله با نقطه تمام شد؟", "بند را بلند خواند و یک جا را درست کرد؟"] },
      { type: "talk", scene: "📃 👂 ✏️", caption: "بندت را برای بزرگ‌ترت بلند بخوان. آیا جمله‌ای هست که بشود بهترش کرد؟",
        tips: ["اول به یک چیز خوب در نوشته‌اش اشاره کنید.", "فقط یک پیشنهاد بدهید، مثلاً: «یک صفت به این جمله اضافه کن.»"] }
    ]
  },
  {
    id: "read-sapling-75", subject: "read", level: "sapling", emoji: "📖", title: "قصه بنویس",
    steps: [
      { type: "order", prompt: "تصویرهای قصه را به ترتیب بچین: اول، وسط، آخر.", numbered: true, items: ["🌱", "🌻", "🐦"] },
      { type: "talk", scene: "🌱 🌻 🐦", caption: "قصه این تصویرها را بگو: اولش چه شد؟ وسطش؟ آخرش؟",
        tips: ["کمکش کنید به هر تصویر یک یا دو جمله بدهد.", "بپرسید: «قهرمان قصه کیست؟ اسمش چیست؟»"] },
      { type: "order", prompt: "جمله‌های این قصه را به ترتیب بچین.", numbered: true,
        items: ["مینا یک دانه آفتاب‌گردان کاشت.", "دانه بزرگ شد و یک گل زرد و بلند شد.", "پرنده‌ها آمدند و از دانه‌هایش خوردند."] },
      { type: "paper", lang: "fa", text: "حالا قصه خودت را بنویس: یک جمله برای اول، یک یا دو جمله برای وسط و یک جمله برای آخر. بعد بلند بخوان و یک چیز را درست کن.",
        check: ["قصه اول، وسط و آخر داشت؟", "قهرمان قصه اسم داشت؟", "بعد از نوشتن، خواند و یک چیز را درست کرد؟"] }
    ]
  },
  {
    id: "read-sapling-76", subject: "read", level: "sapling", emoji: "✉️", title: "نامه و دعوت‌نامه",
    steps: [
      { type: "passage", text: "سلام مادربزرگ عزیز،\nحالتان خوب است؟ من در مدرسه خواندن یاد گرفته‌ام. دلم برایتان تنگ شده. تابستان به دیدنتان می‌آییم.\nنوه شما، آیدا",
        question: "این نامه را چه کسی نوشته است؟", options: ["آیدا", "مادربزرگ", "معلم"], answer: "آیدا" },
      { type: "passage", text: "سلام مادربزرگ عزیز،\nحالتان خوب است؟ من در مدرسه خواندن یاد گرفته‌ام. دلم برایتان تنگ شده. تابستان به دیدنتان می‌آییم.\nنوه شما، آیدا",
        question: "نامه برای چه کسی است؟", options: ["برای معلم", "برای مادربزرگ", "برای دوستش"], answer: "برای مادربزرگ" },
      { type: "passage", text: "دعوت‌نامه\nدوست خوبم، رضا!\nجمعه ساعت ۴ تولد من است. خوشحال می‌شوم به خانه ما بیایی.\nنشانی: کوچه بهار، پلاک ۱۲\nکیان",
        question: "جشن تولد کی است؟", options: ["جمعه ساعت ۴", "شنبه صبح", "امروز"], answer: "جمعه ساعت ۴" },
      { type: "paper", lang: "fa", text: "یک نامه کوتاه یا یک پیام برای یکی از اعضای خانواده بنویس: سلام، چند جمله، و اسم خودت در آخر.",
        example: "سلام خاله جان،\nامروز یک کتاب درباره دلفین‌ها خواندم. خیلی جالب بود. دوستت دارم.\nسینا",
        check: ["با سلام شروع کرد؟", "گفت نامه برای کیست؟", "در آخر اسمش را نوشت؟"] },
      { type: "paper", lang: "fa", text: "یک دعوت‌نامه بنویس: برای چه جشنی؟ کی؟ کجا؟ از طرف چه کسی؟",
        check: ["نوشت جشن برای چیست؟", "روز و ساعت را نوشت؟", "جا را نوشت؟", "اسم خودش را نوشت؟"] }
    ]
  },
  {
    id: "read-sapling-77", subject: "read", level: "sapling", emoji: "📔", title: "دفتر خاطرات",
    steps: [
      { type: "passage", text: "دوشنبه، ۱۲ مهر\nامروز اولین روز کلاس شنا بود. اول کمی ترسیدم، ولی مربی کمکم کرد. آخر کلاس توانستم ده ثانیه روی آب بمانم. خیلی خوشحال بودم!",
        question: "این خاطره کی نوشته شده است؟", options: ["دوشنبه، ۱۲ مهر", "جمعه", "تابستان"], answer: "دوشنبه، ۱۲ مهر" },
      { type: "passage", text: "دوشنبه، ۱۲ مهر\nامروز اولین روز کلاس شنا بود. اول کمی ترسیدم، ولی مربی کمکم کرد. آخر کلاس توانستم ده ثانیه روی آب بمانم. خیلی خوشحال بودم!",
        question: "نویسنده آخر روز چه حسی داشت؟", options: ["ترسیده", "خوشحال", "خسته و ناراحت"], answer: "خوشحال" },
      { type: "passage", text: "جمعه، ۱۶ مهر\nامروز با پدرم به کوه رفتیم. باد سرد می‌آمد. وسط راه چای خوردیم. از بالای کوه، همه شهر پیدا بود.",
        question: "در خاطره جمعه، از بالای کوه چه دیدند؟", options: ["دریا", "همه شهر", "جنگل"], answer: "همه شهر" },
      { type: "paper", lang: "fa", text: "در دفتر خاطراتت بنویس: تاریخ امروز، چه اتفاقی افتاد، و چه حسی داشتی.",
        example: "سه‌شنبه، ۲۰ مهر\nامروز با خواهرم کیک پختیم. آرد روی زمین ریخت و خندیدیم. کیک خوشمزه شد. خیلی شاد بودم.",
        check: ["تاریخ را نوشت؟", "گفت چه اتفاقی افتاد؟", "گفت چه حسی داشت؟"] },
      { type: "paper", lang: "fa", text: "یک هفته، هر شب یک خاطره کوتاه بنویس. آخر هفته همه را با هم بخوانید.",
        check: ["هر روز نوشت؟", "هر خاطره تاریخ داشت؟"], note: "نوشتن هر شب، حتی دو جمله، از یک نوشته طولانی در هفته بهتر است. خاطره‌ها را فقط با اجازه خودش بخوانید." }
    ]
  },
  {
    id: "read-sapling-78", subject: "read", level: "sapling", emoji: "🌙", title: "شعر بخوانیم",
    steps: [
      /* A poem written for Baghcheh (پنجره / دره، زدند / دیدند), one line per picture. Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به شعر گوش کن و تصویرش را در ذهنت ببین",
        parts: {
          night: { art: "read-night-sky" }, light: { art: "read-moonlight", o: 0 }, house: { art: "read-cottage", look: { c: "#e7c69c" }, at: [104, 78], s: 2 },
          moon: { art: "🌙", at: [132, 70], s: 0.8 },
          room: { art: "read-group", o: 0 }, bedroom: { art: "read-bg-bedroom", under: "room" }, bed: { art: "read-bed-low", under: "room", at: [84, 84], s: 1.6 },
          kid: { art: "read-kid", look: { hair: "short", top: "#5b9bd5" }, under: "room", at: [116, 70], s: 1.2, r: -90 },
          blanket: { art: "read-blanket", under: "room", at: [80, 78], s: 1.6 },
          dream: { art: "read-thought", under: "room", o: 0 }, star: { art: "⭐", under: "room", at: [102, 34], s: 0.6, o: 0 }
        },
        scenes: [
          { caption: "ماه آمد پشت پنجره،", do: [
            { id: "moon", to: { y: 22 }, dur: 3600, ease: "out" }
          ] },
          { caption: "نور سفیدش روی دره.", do: [
            { id: "light", to: { o: 1 }, dur: 2400 }
          ] },
          { caption: "ستاره‌ها چشمک زدند،", key: 1500, do: [
            { emit: "spark", where: [80, 22], spread: [150, 30], rise: 0, n: 30, dur: 3600, life: 1200 }
          ] },
          { caption: "بچه‌ها خواب را دیدند.", hold: 5000, do: [
            { id: "room", to: { o: 1 }, dur: 900 },
            { id: "dream", to: { o: 1 }, at: 1400, dur: 600 }, { id: "star", to: { o: 1, s: 0.9 }, at: 1800, dur: 600, ease: "back" }
          ] }
        ] },
      { type: "readaloud", pic: "🌙", prompt: "شعر را بلند و با حالت بخوان.", text: "ماه آمد پشت پنجره،\nنور سفیدش روی دره.\nستاره‌ها چشمک زدند،\nبچه‌ها خواب را دیدند." },
      { type: "pairs", prompt: "کلمه‌های هم‌قافیه را جفت کن.", pairs: [["پنجره", "دره"], ["زدند", "دیدند"], ["ماه", "راه"], ["شب", "لب"]] },
      { type: "choose", prompt: "وقتی شعر را می‌خوانی، کدام تصویر در ذهنت می‌آید؟", pic: true,
        options: [{ label: "🌙", value: "شب و ماه" }, { label: "☀️", value: "ظهر آفتابی" }, { label: "🏖️", value: "ساحل دریا" }], answer: "شب و ماه" },
      { type: "doit", pic: "🌙", text: "شعر ماه را حفظ کن و شب، پیش از خواب، برای خانواده‌ات بخوان.",
        list: ["ماه آمد پشت پنجره،", "نور سفیدش روی دره.", "ستاره‌ها چشمک زدند،", "بچه‌ها خواب را دیدند."] }
    ]
  },
  {
    id: "read-sapling-79", subject: "read", level: "sapling", emoji: "🐢", title: "قصه‌های کهن",
    steps: [
      /* «لاک‌پشت و مرغابی‌ها» from کلیله و دمنه, retold gently for Baghcheh: the turtle falls into a pond and is safe.
         Drawings: js/art/rig-read.js. */
      { type: "scene", prompt: "به قصه‌ای از کلیله و دمنه گوش کن",
        parts: {
          bg: { art: "read-bg-meadow" }, pond: { art: "read-pond-small" }, pond2: { art: "read-pond-small", at: [74, 0] },
          kid1: { art: "read-kid", look: { hair: "short", top: "#e5483f" }, at: [146, 88], s: 1.1, flip: true },
          kid2: { art: "read-kid", look: { hair: "auto", kind: "girl", top: "#9b6bd0", hairColor: "#3d2c22", key: "kalileh-girl" }, at: [134, 88], s: 1.05, flip: true },
          stick: { art: "read-stick", at: [40, 62], o: 0 },
          turtle: { art: "🐢", at: [40, 80], s: 0.9 },
          duck1: { art: "🦆", at: [18, 78], s: 0.9 }, duck2: { art: "🦆", at: [62, 78], s: 0.9, flip: true }
        },
        scenes: [
          { caption: "آب برکه کم شد. لاک‌پشت و دو مرغابی که دوست بودند، نگران شدند.", do: [
            { id: "pond", to: { o: 0.3 }, dur: 2600 }
          ] },
          { caption: "مرغابی‌ها گفتند: «تو وسط این چوب را با دهانت بگیر. ما دو سرش را می‌گیریم و تو را به برکه دیگر می‌بریم. فقط در راه حرف نزن!»", hold: 9000, do: [
            { id: "stick", to: { o: 1 }, at: 1200, dur: 500 },
            { id: "duck1", to: { x: 25, y: 66 }, at: 1800, dur: 900 }, { id: "duck2", to: { x: 55, y: 66 }, at: 1800, dur: 900 },
            { id: "turtle", to: { y: 72 }, at: 2800, dur: 800 }
          ] },
          { caption: "پرواز کردند. بچه‌ها از پایین گفتند: «ببینید! لاک‌پشت پرواز می‌کند!»", key: 3600, do: [
            { id: "stick", path: "M40 62Q72 14 104 30", dur: 3200 }, { id: "duck1", path: "M25 66Q57 18 89 34", dur: 3200 },
            { id: "duck2", path: "M55 66Q87 18 119 34", dur: 3200 }, { id: "turtle", path: "M40 72Q72 24 104 40", dur: 3200 },
            { id: "kid1.armF", to: { r: -150 }, at: 2600, dur: 500 }, { id: "kid2.armF", to: { r: -140 }, at: 2800, dur: 500 }
          ] },
          { caption: "لاک‌پشت خواست جواب بدهد. دهانش را باز کرد و چوب از دهانش افتاد!", key: 1100, do: [
            { id: "turtle", path: "M104 40Q108 60 112 80", at: 600, dur: 1000, ease: "in" }, { id: "turtle", to: { r: 160 }, at: 600, dur: 1000 },
            { emit: "drop", where: [112, 76], spread: [16, 4], rise: -10, n: 14, at: 1600, dur: 300, life: 900 }
          ] },
          { caption: "خوشبختانه توی آب افتاد و سالم ماند. و یاد گرفت: اول فکر کن، بعد حرف بزن.", do: [
            { id: "turtle", to: { r: 0 }, dur: 600 }, { id: "turtle", to: { y: "-2" }, at: 600, dur: 1400, yoyo: true, times: 4 },
            { id: "kid1.armF", to: { r: 0 }, dur: 400 }, { id: "kid2.armF", to: { r: 0 }, dur: 400 }
          ] }
        ] },
      { type: "passage", text: "آب برکه کم شد. دو مرغابی به دوستشان لاک‌پشت گفتند: «وسط چوب را با دهانت بگیر تا تو را به برکه دیگر ببریم. ولی در راه حرف نزن.» در آسمان، بچه‌ها او را دیدند و خندیدند. لاک‌پشت خواست جواب بدهد و دهانش را باز کرد. چوب از دهانش رها شد و او توی آب افتاد.",
        question: "چرا لاک‌پشت افتاد؟", options: ["چون حرف زد و دهانش را باز کرد", "چون چوب شکست", "چون مرغابی‌ها خسته شدند"], answer: "چون حرف زد و دهانش را باز کرد" },
      { type: "passage", text: "مرغابی‌ها گفته بودند: «در راه حرف نزن.» لاک‌پشت حرف آن‌ها را فراموش کرد.", question: "پیام این قصه چیست؟",
        options: ["اول فکر کن، بعد حرف بزن", "همیشه پرواز کن", "در آب بازی نکن"], answer: "اول فکر کن، بعد حرف بزن" },
      { type: "passage", text: "ماه‌پیشونی دختری مهربان بود. یک روز به پیرزنی کمک کرد تا خانه‌اش را تمیز کند. پیرزن گفت: «چه دل مهربانی داری!» صبح فردا، یک ماه کوچک و روشن روی پیشانی دختر می‌درخشید.",
        question: "در این قصه قدیمی، چرا ماه روی پیشانی دختر نشست؟", options: ["چون مهربان بود و کمک کرد", "چون زیاد خوابید", "چون ماه را خرید"], answer: "چون مهربان بود و کمک کرد" },
      { type: "talk", scene: "🐢 🦆 🌙 👧", caption: "یکی از این دو قصه را برای خانواده‌ات تعریف کن و پیامش را بگو.",
        tips: ["بپرسید: «تو بودی، به حرف مرغابی‌ها گوش می‌دادی؟»", "قصه کامل ماه‌پیشونی و قصه‌های دیگر کلیله و دمنه را از کتاب‌های کودکان برایش بخوانید.",
          "بپرسید: «این قصه‌ها خیلی قدیمی‌اند. فکر می‌کنی چرا هنوز آن‌ها را می‌گوییم؟»"] }
    ]
  },
  {
    id: "read-sapling-80", subject: "read", level: "sapling", emoji: "🔡", title: "به ترتیب الفبا",
    steps: [
      { type: "order", prompt: "کلمه‌ها را به ترتیب الفبا بچین: به حرف اولشان نگاه کن.", items: ["انار", "بادام", "پسته", "توت"] },
      { type: "order", prompt: "این کلمه‌ها را هم به ترتیب الفبا بچین.", items: ["خرگوش", "روباه", "شیر", "گاو"] },
      { type: "choose", prompt: "«بابا» و «برف» هر دو با «ب» شروع می‌شوند. به حرف دومشان نگاه کن. کدام در فرهنگ لغت اول می‌آید؟", options: ["بابا", "برف"], answer: "بابا" },
      { type: "choose", prompt: "کدام اول می‌آید: «ماه» یا «موز»؟", options: ["ماه", "موز"], answer: "ماه" },
      { type: "choose", prompt: "در فرهنگ لغت، «گربه» را در کدام بخش پیدا می‌کنی؟", options: ["بخش «ک»", "بخش «گ»", "بخش «ق»"], answer: "بخش «گ»" },
      { type: "order", prompt: "این‌ها را به ترتیب الفبا بچین: حرف اول یکی است، به حرف دوم نگاه کن.", items: ["سبد", "ستاره", "سیب"] }
    ]
  },
  {
    id: "read-sapling-81", subject: "read", level: "sapling", emoji: "📕", title: "در فرهنگ لغت",
    steps: [
      { type: "passage", prompt: "این یک صفحه از فرهنگ لغت کودکان است.", text: "شکوفه: گل درخت‌های میوه در بهار، پیش از آن‌که میوه بدهند.\nشکار: گرفتن حیوان.\nشکستن: تکه‌تکه کردن چیزی.",
        question: "«شکوفه» یعنی چه؟", options: ["گل درخت‌های میوه", "تکه‌تکه کردن", "گرفتن حیوان"], answer: "گل درخت‌های میوه" },
      { type: "passage", text: "شکوفه: گل درخت‌های میوه در بهار، پیش از آن‌که میوه بدهند.\nشکار: گرفتن حیوان.\nشکستن: تکه‌تکه کردن چیزی.",
        question: "کلمه‌های این صفحه با کدام دو حرف شروع می‌شوند؟", options: ["شک", "سک", "شب"], answer: "شک" },
      { type: "passage", prompt: "یک کلمه می‌تواند چند معنی داشته باشد.", text: "شیر: ۱. حیوانی بزرگ و قوی. ۲. نوشیدنی سفید که از گاو می‌گیریم. ۳. وسیله‌ای که آب از آن می‌آید.",
        question: "در جمله «شیر آشپزخانه چکه می‌کند»، کدام معنی درست است؟", options: ["معنی ۱", "معنی ۲", "معنی ۳"], answer: "معنی ۳" },
      { type: "choose", show: "بچه‌ها در جنگل یک شیر دیدند و ترسیدند.", prompt: "«شیر» اینجا کدام معنی است؟", options: ["حیوان", "نوشیدنی", "شیر آب"], answer: "حیوان" },
      { type: "choose", show: "ماهی‌گیر با تور ماهی گرفت.", prompt: "اگر معنی «تور» را ندانی، بهترین کار چیست؟", options: ["در فرهنگ لغت پیدایش کنم و معنی‌ای را بخوانم که به جمله می‌خورد", "از آن رد شوم", "حدس بزنم یعنی میوه"], answer: "در فرهنگ لغت پیدایش کنم و معنی‌ای را بخوانم که به جمله می‌خورد" }
    ]
  },
  {
    id: "read-sapling-82", subject: "read", level: "sapling", emoji: "🖋️", title: "سرمشق",
    steps: [
      { type: "trace", letter: "نان", prompt: "«نان» را خوش‌خط بنویس: هم‌اندازه و روی خط.", say: "نان را آرام و خوش‌خط بنویس." },
      { type: "trace", letter: "سیب", prompt: "«سیب» را خوش‌خط بنویس.", say: "سیب را بنویس: دندانه‌ها هم‌اندازه باشند." },
      { type: "trace", letter: "دست", prompt: "«دست» را خوش‌خط بنویس.", say: "دست را بنویس. د نمی‌چسبد، پس بعدش فاصله کوچکی هست." },
      { type: "trace", letter: "بابا", prompt: "«بابا» را خوش‌خط بنویس.", say: "بابا را بنویس. دو تکه، هم‌اندازه." },
      { type: "paper", lang: "fa", text: "این سرمشق را با دقت و بدون عجله سه بار در دفترت بنویس. بین کلمه‌ها به اندازه یک انگشت فاصله بگذار.",
        example: "دانا توانا بود.   هر که دانا بود توانا بود.",
        check: ["حرف‌ها هم‌اندازه بودند؟", "بین کلمه‌ها فاصله یکسان بود؟", "روی خط نوشت؟", "عجله نکرد؟"] },
      { type: "paper", lang: "fa", text: "حالا این بند را از روی کتاب، خوش‌خط در دفترت بنویس.",
        example: "باران آمد. گل‌ها شاد شدند. پرنده‌ها روی شاخه‌ها آواز خواندند.",
        check: ["همه کلمه‌ها را درست نوشت؟", "نقطه‌ها را گذاشت؟", "نوشته‌اش تمیز و خوانا بود؟"] }
    ]
  },
  {
    id: "read-sapling-83", subject: "read", level: "sapling", emoji: "🌊", title: "متن علمی ۲",
    steps: [
      { type: "passage", prompt: "یک متن علمی با چند بخش. به عنوان هر بخش نگاه کن.",
        text: "دریا\nآب دریا\nآب دریا شور است. نمی‌شود آن را نوشید.\nجانوران دریا\nدر دریا ماهی، خرچنگ، لاک‌پشت و دلفین زندگی می‌کنند.\nدریاهای ایران\nایران در شمال دریای خزر و در جنوب خلیج فارس و دریای عمان دارد.",
        question: "بخش «آب دریا» چه می‌گوید؟", options: ["آب دریا شور است", "دلفین در دریا زندگی می‌کند", "ایران دو دریا دارد"], answer: "آب دریا شور است" },
      { type: "passage", text: "دریاهای ایران\nایران در شمال دریای خزر و در جنوب خلیج فارس و دریای عمان دارد.", question: "در شمال ایران کدام دریاست؟",
        options: ["دریای خزر", "خلیج فارس", "دریای عمان"], answer: "دریای خزر" },
      { type: "passage", prompt: "یک متن دیگر بخوان.", text: "جنگل\nدرخت‌های جنگل\nدرخت‌های بلند به ما هوای پاک و سایه می‌دهند.\nجانوران جنگل\nسنجاب، جغد و آهو در جنگل زندگی می‌کنند. جنگل خانه آن‌هاست.",
        question: "درخت‌ها به ما چه می‌دهند؟", options: ["هوای پاک و سایه", "آب شور", "برف"], answer: "هوای پاک و سایه" },
      { type: "choose", show: "آب دریا شور است. نمی‌شود آن را نوشید.", prompt: "از جمله بفهم: «شور» یعنی چه؟", options: ["نمک زیادی دارد", "شیرین است", "خیلی سرد است"], answer: "نمک زیادی دارد" },
      { type: "choose", show: "جنگل خانه جانوران است.", prompt: "«جانوران» یعنی چه؟", options: ["حیوان‌ها", "درخت‌ها", "آدم‌ها"], answer: "حیوان‌ها" }
    ]
  },
  {
    id: "read-sapling-84", subject: "read", level: "sapling", emoji: "🗒️", title: "گزارش کوتاه",
    steps: [
      { type: "talk", scene: "🫓 🏪 👀", caption: "یک جا رفتی و چیزی دیدی؟ مثلاً نانوایی. برای ما تعریف کن: کجا بود؟ چه دیدی؟ چه چیز جالبی بود؟",
        tips: ["کمکش کنید فقط چیزهایی را بگوید که واقعاً دید.", "بپرسید: «اول چه دیدی؟ بعد؟»", "یک کلمه تازه که امروز یاد گرفت را تکرار کنید."] },
      { type: "paper", lang: "fa", text: "حالا گزارشت را در سه جمله بنویس: کجا رفتی، چه دیدی، چه چیز جالبی یاد گرفتی.",
        example: "امروز با مادرم به نانوایی رفتیم. نانوا خمیر را روی سنگ‌های داغ تنور گذاشت. یاد گرفتم که نان سنگک روی سنگ پخته می‌شود.",
        check: ["گفت کجا رفت؟", "گفت چه دید؟", "یک چیز تازه که یاد گرفت را نوشت؟"] },
      { type: "talk", scene: "🗒️ 👂", caption: "گزارشت را برای یک نفر بلند بخوان. او یک سؤال از تو می‌پرسد.",
        tips: ["یک سؤال واقعی بپرسید که جوابش در گزارش نیست.", "اگر جواب داد، پیشنهاد کنید آن را هم به گزارش اضافه کند."] },
      { type: "paper", lang: "fa", text: "یک گیاه کوچک را یک هفته تماشا کن. هر سه روز یک جمله درباره‌اش بنویس.",
        example: "شنبه: لوبیا را کاشتیم. سه‌شنبه: یک جوانه سبز درآمد. جمعه: دو برگ کوچک باز شد.",
        check: ["تاریخ یا روز را نوشت؟", "فقط چیزی را نوشت که دید؟"] },
      { type: "talk", scene: "🌱 📅", caption: "گیاهت در این یک هفته چه تغییری کرد؟ گزارشت را برای ما بخوان.",
        tips: ["بپرسید: «کدام روز بیشتر تغییر کرد؟»", "اگر شد، از گیاه هر روز یک نقاشی کوچک بکشد."] }
    ]
  },
  {
    id: "read-sapling-86", subject: "read", level: "sapling", emoji: "💬", title: "نظر من",
    steps: [
      { type: "order", prompt: "این نوشته را به ترتیب بچین: اول نظر، بعد دلیل، بعد پایان.", numbered: true,
        items: ["من زمستان را از همه فصل‌ها بیشتر دوست دارم.", "چون برف می‌بارد و می‌توانم آدم‌برفی بسازم.", "پس زمستان بهترین فصل برای من است."] },
      { type: "order", prompt: "این یکی را هم به ترتیب بچین.", numbered: true,
        items: ["به نظر من، کتاب خواندن کار خیلی خوبی است.", "چون با کتاب چیزهای تازه یاد می‌گیریم.", "برای این‌که قصه‌ها ما را به جاهای دور می‌برند.", "پس هر روز کمی کتاب می‌خوانم."] },
      { type: "order", prompt: "کلمه‌ها را بچین تا جمله نظر درست شود.", items: ["من", "گربه‌ها را", "دوست دارم،", "چون", "مهربان‌اند."] },
      { type: "paper", lang: "fa", text: "نظرت را بنویس: کدام غذا را بیشتر دوست داری؟ چرا؟ (یک یا دو دلیل با «چون»، و یک جمله پایانی)",
        example: "من آش رشته را از همه غذاها بیشتر دوست دارم. چون گرم و خوشمزه است. برای این‌که مادربزرگ آن را می‌پزد. پس آش رشته غذای محبوب من است.",
        check: ["اول نظرش را گفت؟", "دست‌کم یک دلیل با «چون» یا «برای این‌که» آورد؟", "یک جمله پایانی نوشت؟"] },
      { type: "paper", lang: "fa", text: "حالا درباره یک موضوع دیگر نظرت را بنویس: بهترین بازی، بهترین فصل یا بهترین کتاب.",
        check: ["نظر، دلیل و پایان داشت؟", "جمله‌ها کامل بودند؟"] }
    ]
  },
  {
    id: "read-sapling-87", subject: "read", level: "sapling", emoji: "🦒", title: "درباره‌اش بنویس",
    steps: [
      { type: "passage", text: "یوزپلنگ ایرانی\nیوزپلنگ ایرانی در دشت‌های مرکز ایران زندگی می‌کند. او سریع‌ترین جانور خشکی است. بدنش زرد با خال‌های سیاه است. امروز فقط چند یوزپلنگ ایرانی مانده و باید از آن‌ها نگه‌داری کنیم.",
        question: "یوزپلنگ ایرانی کجا زندگی می‌کند؟", options: ["در دشت‌های مرکز ایران", "در دریا", "در جنگل‌های شمال"], answer: "در دشت‌های مرکز ایران" },
      { type: "passage", text: "یوزپلنگ ایرانی در دشت‌های مرکز ایران زندگی می‌کند. او سریع‌ترین جانور خشکی است. بدنش زرد با خال‌های سیاه است.",
        question: "کدام جمله یک واقعیت درباره بدن یوزپلنگ است؟", options: ["بدنش زرد با خال‌های سیاه است", "او خیلی بامزه است", "من او را دوست دارم"], answer: "بدنش زرد با خال‌های سیاه است" },
      { type: "passage", text: "یوزپلنگ ایرانی\nیوزپلنگ ایرانی در دشت‌های مرکز ایران زندگی می‌کند. او سریع‌ترین جانور خشکی است. بدنش زرد با خال‌های سیاه است. امروز فقط چند یوزپلنگ ایرانی مانده و باید از آن‌ها نگه‌داری کنیم.",
        question: "جمله آخر متن چه می‌گوید؟", options: ["باید از یوزپلنگ‌ها نگه‌داری کنیم", "یوزپلنگ زرد است", "یوزپلنگ تند می‌دود"], answer: "باید از یوزپلنگ‌ها نگه‌داری کنیم" },
      { type: "paper", lang: "fa", text: "درباره یک حیوان بنویس: یک جمله که بگوید درباره چه حیوانی است، سه واقعیت از یک کتاب یا متن، و یک جمله پایانی.",
        example: "زنبور عسل حشره کوچکی است. زنبورها در کندو زندگی می‌کنند. از شهد گل‌ها عسل درست می‌کنند. شش پا دارند. زنبورها به گل‌ها کمک می‌کنند میوه بدهند.",
        check: ["جمله اول گفت درباره چیست؟", "سه واقعیت نوشت؟", "واقعیت‌ها از متن یا کتاب بودند، نه نظر خودش؟", "یک جمله پایانی نوشت؟"] },
      { type: "paper", lang: "fa", text: "نوشته‌ات را بلند بخوان. یک واقعیت دیگر اضافه کن یا یک کلمه را بهتر کن.",
        check: ["نوشته را دوباره خواند؟", "یک چیز را بهتر کرد؟"] }
    ]
  },
  {
    id: "read-sapling-88", subject: "read", level: "sapling", emoji: "⚖️", title: "دو متن، یک موضوع",
    steps: [
      { type: "passage", prompt: "متن اول را بخوان.", text: "شتر\nشتر در بیابان زندگی می‌کند. می‌تواند روزها بدون آب راه برود. پاهای پهنش در شن فرو نمی‌روند.",
        question: "شتر کجا زندگی می‌کند؟", options: ["در بیابان", "در دریا", "در جنگل"], answer: "در بیابان" },
      { type: "passage", prompt: "متن دوم را بخوان.", text: "خرس قطبی\nخرس قطبی در یخ‌های سرد شمال زندگی می‌کند. پوست کلفت و موی سفید دارد. شنای خیلی خوبی دارد.",
        question: "خرس قطبی کجا زندگی می‌کند؟", options: ["در بیابان گرم", "در یخ‌های سرد شمال", "در کوه"], answer: "در یخ‌های سرد شمال" },
      { type: "sort", prompt: "این مال شتر است، خرس قطبی، یا هر دو؟", baskets: [{ label: "شتر" }, { label: "هر دو" }, { label: "خرس قطبی" }],
        items: [{ label: "بیابان", basket: "شتر" }, { label: "یخ", basket: "خرس قطبی" }, { label: "حیوان بزرگی است", basket: "هر دو" },
          { label: "بدون آب راه می‌رود", basket: "شتر" }, { label: "موی سفید", basket: "خرس قطبی" }, { label: "به جای زندگی‌اش عادت دارد", basket: "هر دو" }] },
      { type: "sort", prompt: "مثل هم است یا فرق دارد؟", baskets: [{ label: "مثل هم" }, { label: "فرق دارد" }],
        items: [{ label: "جای زندگی", basket: "فرق دارد" }, { label: "هر دو جانورند", basket: "مثل هم" }, { label: "رنگ مو", basket: "فرق دارد" }, { label: "هر دو چهار پا دارند", basket: "مثل هم" }] },
      { type: "passage", text: "شتر در بیابان گرم و خرس قطبی در یخ‌های سرد زندگی می‌کند. هر دو بدنی دارند که به جای زندگی‌شان می‌خورد.",
        question: "این دو حیوان در چه چیزی مثل هم‌اند؟", options: ["بدنشان به جای زندگی‌شان می‌خورد", "هر دو در بیابان‌اند", "هر دو سفیدند"], answer: "بدنشان به جای زندگی‌شان می‌خورد" }
    ]
  },
  {
    id: "read-sapling-89", subject: "read", level: "sapling", emoji: "🔎", title: "پژوهش کوچک",
    steps: [
      { type: "talk", scene: "❓ 📚 🧒", caption: "یک سؤال انتخاب کن که دوست داری جوابش را بدانی. مثلاً: «پروانه‌ها چه می‌خورند؟»",
        tips: ["سؤال را خودش انتخاب کند؛ کمکش کنید آن را کوتاه و روشن کند.", "سؤال‌هایی که جوابشان در یک کتاب کودک یا یک صفحه پیدا می‌شود بهترند."] },
      { type: "paper", lang: "fa", text: "سؤالت را بالای کاغذ بنویس. با بزرگ‌ترت در یک کتاب یا یک صفحه جواب را پیدا کن و سه واقعیت بنویس.",
        example: "سؤال: پروانه‌ها چه می‌خورند؟\n۱. پروانه‌ها شهد گل‌ها را می‌نوشند.\n۲. با یک لوله دراز به اسم خرطوم می‌نوشند.\n۳. کرم پروانه برگ می‌خورد.",
        check: ["سؤالش را نوشت؟", "سه واقعیت از کتاب یا صفحه نوشت؟", "نوشت جواب را از کجا پیدا کرد؟"] },
      { type: "talk", scene: "🗒️ 👨‍👩‍👧", caption: "سه چیزی را که پیدا کردی برای خانواده‌ات تعریف کن.",
        tips: ["بپرسید: «کدام را از همه جالب‌تر دیدی؟»", "بپرسید: «حالا چه سؤال تازه‌ای داری؟»"] },
      { type: "paper", lang: "fa", text: "یک نقاشی برای پژوهشت بکش و زیرش یک جمله بنویس.",
        check: ["نقاشی به سؤالش مربوط بود؟", "زیرش یک جمله نوشت؟"] },
      { type: "forparents", guide: "literacy", guideLabel: "راهنمای خواندن و نوشتن در خانه",
        tips: ["برای پژوهش کوچک، یک کتاب علمی کودک یا یک صفحه مطمئن کافی است؛ با هم بخوانید و او واقعیت‌ها را پیدا کند.",
          "کمکش کنید فرق «واقعیت» (چیزی که در کتاب هست) و «نظر» (چیزی که خودش فکر می‌کند) را ببیند.",
          "اگر از اینترنت استفاده می‌کنید، کنارش باشید و فقط صفحه‌های مناسب کودک را باز کنید."] }
    ]
  },
  {
    id: "read-sapling-85", subject: "read", level: "sapling", emoji: "🌿", title: "بازی باغچه نهال",
    steps: [
      { type: "sort", prompt: "از کدام خانواده است؟", baskets: [{ label: "دان" }, { label: "کار" }],
        items: [{ label: "دانشمند", basket: "دان" }, { label: "کارگر", basket: "کار" }, { label: "دانا", basket: "دان" }, { label: "کارخانه", basket: "کار" }] },
      { type: "pairs", hidden: true, prompt: "کارت‌ها را برگردان. هر کلمه را با کلمه هم‌معنی‌اش جفت کن.", pairs: [["شاد", "خوشحال"], ["زیبا", "قشنگ"], ["سریع", "تند"]] },
      { type: "sort", prompt: "اسم است، فعل یا صفت؟", baskets: [{ label: "اسم" }, { label: "فعل" }, { label: "صفت" }],
        items: [{ label: "کوه", basket: "اسم" }, { label: "نوشت", basket: "فعل" }, { label: "بلند", basket: "صفت" }, { label: "پرنده", basket: "اسم" }, { label: "خواند", basket: "فعل" }, { label: "سرد", basket: "صفت" }] },
      { type: "build", hidden: true, pic: "🌅", word: "صبح", parts: ["ص", "ب", "ح"], extra: ["س", "ه"], say: "صبح" },
      { type: "order", prompt: "جمله‌های قصه را به ترتیب بچین.", numbered: true,
        items: ["شیری زیر درخت خوابیده بود.", "شیر موش را گرفت و رها کرد.", "شیر در دام افتاد.", "موش طناب‌ها را جوید و شیر آزاد شد."] },
      { type: "choose", show: "مادربزرگ … سال دارد.", prompt: "عدد ۱۰۰ کدام است؟", options: ["صد", "سد"], answer: "صد" }
    ]
  }
);
