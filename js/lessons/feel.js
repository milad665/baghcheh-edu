/* باغچه — احساس‌های من (me and my feelings): for every child, not leveled.
   Lessons are plain data; step types are listed in README.md and drawn by js/engine.js. */
var B = window.B || {};
window.B = B;

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
      { type: "story", prompt: "هر حسی یک اسم دارد",
        cast: { yas: "👧", arash: "👦", grandma: "👵", balloon: "🎈", blocks: "🧱", bag: "🎒", cat: "🐱", dog: "🐕", book: "📖",
          happy: "😊", sad: "😢", angry: "😠", worried: "😟", scared: "😨", calm: "😌" },
        scenes: [
          { caption: "مادربزرگ به خانه یاسمن آمده. یاسمن خوشحال است.",
            at: { yas: [35, 62, { size: 1.8 }], grandma: [65, 58, { size: 2 }], happy: [35, 22, { size: 1.5, act: "bounce" }] } },
          { caption: "بادکنک آرش در باد رفت. آرش غمگین است.",
            at: { yas: null, grandma: null, happy: null, arash: [40, 62, { size: 1.8 }], balloon: [72, 18, { act: "grow" }], sad: [40, 22, { size: 1.5 }] } },
          { caption: "برادر کوچک یاسمن برجش را خراب کرد. یاسمن عصبانی است.",
            at: { arash: null, balloon: null, sad: null, yas: [38, 62, { size: 1.8 }], blocks: [68, 70, { size: 1.4, act: "shake" }], angry: [38, 22, { size: 1.5 }] } },
          { caption: "فردا اولین روز مدرسه است. آرش نگران است.",
            at: { yas: null, blocks: null, angry: null, arash: [38, 62, { size: 1.8 }], bag: [68, 66, { size: 1.4 }], worried: [38, 22, { size: 1.5 }] } },
          { caption: "پیشی یک سگ بزرگ دید. پیشی ترسید.",
            at: { arash: null, bag: null, worried: null, cat: [32, 66, { size: 1.6 }], dog: [72, 62, { size: 2.2 }], scared: [32, 24, { size: 1.5, act: "shake" }] } },
          { caption: "سگ رفت. عصر، یاسمن کنار پیشی کتاب می‌خواند. یاسمن آرام است.",
            at: { dog: null, scared: null, cat: [62, 68, { size: 1.4 }], yas: [38, 62, { size: 1.8 }], book: [50, 70], calm: [38, 22, { size: 1.5, act: "grow" }] } },
          { caption: "همه این حس‌ها طبیعی‌اند. هر حسی یک اسم دارد و می‌گذرد.",
            at: { cat: null, book: null, calm: null, yas: [40, 62, { size: 1.8 }], arash: [60, 62, { size: 1.8 }] } }
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
      { type: "story", prompt: "بدن ما هم حس‌ها را می‌فهمد",
        cast: { kid: "🧒", happy: "😊", jump: "🤸", worried: "😟", tummy: "🌀", angry: "😠", hot: "♨️", sad: "😢", heavy: "🪨", calm: "🌷" },
        scenes: [
          { caption: "وقتی خوشحالیم، شاید دلمان بخواهد بپریم و بدویم.",
            at: { happy: [30, 30, { size: 1.5 }], jump: [55, 60, { size: 2.2, act: "bounce" }] } },
          { caption: "وقتی نگرانیم، شاید دلمان پیچ بخورد.",
            at: { happy: null, jump: null, worried: [30, 30, { size: 1.5 }], kid: [55, 60, { size: 2.2 }], tummy: [55, 72, { act: "spin" }] } },
          { caption: "وقتی عصبانی هستیم، شاید صورتمان داغ شود و دستمان را مشت کنیم.",
            at: { worried: null, tummy: null, angry: [30, 30, { size: 1.5 }], hot: [55, 30, { act: "grow" }] } },
          { caption: "وقتی غمگینیم، شاید گلویمان بغض کند و بدنمان سنگین شود.",
            at: { angry: null, hot: null, sad: [30, 30, { size: 1.5 }], heavy: [70, 72] } },
          { caption: "هر کسی حس‌ها را جای خودش حس می‌کند. همه‌اش درست است.",
            at: { sad: null, heavy: null, calm: [30, 30, { size: 1.5, act: "grow" }] } }
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
      { type: "story", prompt: "یک مربع چهار ضلع دارد",
        cast: { kid: "🧒", nose: "👃", hand: "✋", out: "😮‍💨", hand2: "✋" },
        scenes: [
          { caption: "امروز با یک مربع نفس می‌کشیم. مربع چهار ضلع دارد.", at: { kid: [50, 58, { size: 2.2 }] } },
          { caption: "ضلع اول: آرام از بینی نفس می‌کشیم و تا چهار می‌شماریم.", at: { kid: [30, 58, { size: 2 }], nose: [62, 50, { size: 1.6, act: "grow" }] } },
          { caption: "ضلع دوم: نفس را نگه می‌داریم و تا چهار می‌شماریم.", at: { nose: null, hand: [62, 50, { size: 1.6 }] } },
          { caption: "ضلع سوم: آرام از دهان بیرون می‌دهیم و تا چهار می‌شماریم.", at: { hand: null, out: [62, 50, { size: 1.6, act: "grow" }] } },
          { caption: "ضلع چهارم: باز هم صبر می‌کنیم و تا چهار می‌شماریم. بعد دوباره از اول.", at: { out: null, hand2: [62, 50, { size: 1.6 }] } }
        ] },
      { type: "breathe", pattern: [4, 4, 4, 4], cycles: 3 },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-5", subject: "feel", level: null, emoji: "👀", title: "پنج چیز که می‌بینم",
    steps: [
      { type: "story", prompt: "حس‌هایمان ما را به اینجا برمی‌گردانند",
        cast: { kid: "👦", cloud: "💭", eye: "👀", ear: "👂", hand: "✋", nose: "👃", flower: "🌷" },
        scenes: [
          { caption: "گاهی سرمان پر از فکر می‌شود، مثل یک ابر شلوغ.", at: { kid: [50, 62, { size: 2.2 }], cloud: [62, 24, { size: 1.8, act: "shake" }] } },
          { caption: "آن وقت می‌توانیم به دور و برمان نگاه کنیم.", at: { cloud: null, eye: [50, 22, { size: 1.6, act: "grow" }] } },
          { caption: "گوش کنیم.", at: { eye: null, ear: [50, 22, { size: 1.6, act: "grow" }] } },
          { caption: "به چیزها دست بزنیم و بو کنیم.", at: { ear: null, hand: [36, 22, { size: 1.5 }], nose: [64, 22, { size: 1.5 }] } },
          { caption: "و یک نفس آرام بکشیم. حالا حواسمان همین‌جاست.", at: { hand: null, nose: null, flower: [50, 22, { size: 1.6, act: "grow" }] } }
        ] },
      { type: "ground" },
      { type: "feelings" }
    ]
  },
  {
    id: "feel-6", subject: "feel", level: null, emoji: "🐿️", title: "وقتی نگرانم",
    steps: [
      { type: "story", prompt: "فندق نگران است", bg: "bedroom",
        cast: { fandogh: "🐿️", mom: "🐿️", bag: "🎒", moon: "🌙", cloud: "☁️", flower: "🌷", sun: "☀️", friend: "🐰", heart: "💛" },
        scenes: [
          { caption: "این فندق است. فردا اولین روز مدرسه‌اش است.",
            at: { fandogh: [40, 62, { size: 1.6 }], bag: [66, 68, { size: 1.3 }] } },
          { caption: "شب، فندق خوابش نمی‌برد. دلش پیچ می‌خورد. فندق نگران است.",
            at: { bag: null, moon: [78, 18], cloud: [42, 26, { size: 1.6, act: "shake" }] } },
          { caption: "فندق پیش مامانش می‌رود و می‌گوید: «من نگرانم.»",
            at: { fandogh: [38, 64, { size: 1.6 }], mom: [64, 58, { size: 2.4, flip: true }] } },
          { caption: "مامان بغلش می‌کند و می‌گوید: «ممنون که به من گفتی.»",
            at: { fandogh: [48, 64, { size: 1.6 }], heart: [56, 30, { act: "grow" }] } },
          { caption: "با هم نفس گل و شمع می‌کشند. گل را بو کن، شمع را فوت کن.",
            at: { heart: null, flower: [30, 34, { size: 1.4, act: "grow" }] } },
          { caption: "مامان می‌گوید: «نگرانی مثل ابر است. می‌آید و می‌رود.» ابر کم‌کم کوچک می‌شود.",
            at: { flower: null, cloud: [80, 14, { size: 0.8 }] } },
          { caption: "صبح، فندق به مدرسه رفت و یک دوست تازه پیدا کرد.", bg: "garden",
            at: { cloud: null, moon: null, mom: null, sun: [80, 18, { act: "grow" }], fandogh: [40, 64, { size: 1.6 }], friend: [64, 64, { size: 1.6, act: "bounce" }] } }
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
      { type: "story", prompt: "خشم هم مثل دما بالا و پایین می‌رود", bg: "room",
        cast: { kian: "👦", sis: "👧", blocks: "🧱", meter: "🌡️", angry: "😠", stop: "✋", flower: "🌷", talk: "🗣️", calm: "😌" },
        scenes: [
          { caption: "کیان یک برج بلند ساخت. خواهر کوچکش به آن خورد و برج افتاد.",
            at: { kian: [32, 62, { size: 1.8 }], sis: [66, 64, { size: 1.5 }], blocks: [50, 72, { size: 1.4, act: "shake" }] } },
          { caption: "کیان عصبانی شد. صورتش داغ شد. خشمش مثل دماسنج بالا رفت.",
            at: { angry: [32, 24, { size: 1.5 }], meter: [82, 40, { size: 2.4, act: "grow" }] } },
          { caption: "عصبانی شدن اشکالی ندارد. اما زدن و داد زدن کسی را ناراحت می‌کند. کیان ایستاد.",
            at: { angry: null, stop: [32, 24, { size: 1.5 }] } },
          { caption: "کیان آرام نفس کشید: گل را بو کرد، شمع را فوت کرد. خشمش کم‌کم پایین آمد.",
            at: { stop: null, flower: [32, 24, { size: 1.5, act: "grow" }], meter: [82, 50, { size: 1.6 }] } },
          { caption: "بعد گفت: «ناراحت شدم که برجم افتاد.» خواهرش گفت: «ببخشید.»",
            at: { flower: null, talk: [32, 24, { size: 1.5 }] } },
          { caption: "با هم یک برج تازه ساختند.",
            at: { talk: null, meter: null, calm: [32, 24, { size: 1.5, act: "grow" }], blocks: [50, 66, { size: 1.8, act: "bounce" }] } }
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
      { type: "story", prompt: "آیدین و شیرین در حیاط", bg: "garden",
        cast: { aydin: "👦", shirin: "👧", ball: "⚽", chalk: "🖍️", apple: "🍎", sorry: "🙏", heart: "💛", sun: "☀️" },
        scenes: [
          { caption: "آیدین در حیاط توپ‌بازی می‌کند. شیرین تنها نشسته و نگاه می‌کند.",
            at: { sun: [82, 16], aydin: [30, 62, { size: 1.8 }], ball: [44, 72, { act: "bounce" }], shirin: [74, 64, { size: 1.6 }] } },
          { caption: "آیدین می‌گوید: «سلام! بیا با هم بازی کنیم.»",
            at: { aydin: [48, 62, { size: 1.8 }], ball: [58, 72] } },
          { caption: "بعد از بازی، آیدین سیبش را نصف می‌کند: «بفرما، نصفش مال تو.» شیرین می‌گوید: «ممنون!»",
            at: { ball: null, apple: [60, 46, { act: "grow" }] } },
          { caption: "آیدین بی‌حواس پایش را روی نقاشی گچی شیرین گذاشت. نقاشی خراب شد.",
            at: { apple: null, chalk: [62, 76, { act: "shake" }] } },
          { caption: "آیدین گفت: «ببخشید، حواسم نبود. بیا با هم دوباره بکشیم.»",
            at: { sorry: [48, 26, { size: 1.4 }] } },
          { caption: "دوست خوب با هم بازی می‌کند، چیزهایش را تقسیم می‌کند و وقتی اشتباه کرد، می‌گوید ببخشید.",
            at: { sorry: null, chalk: null, heart: [61, 26, { size: 1.6, act: "grow" }] } }
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
      { type: "story", prompt: "یک تاب و دو نفر", bg: "garden",
        cast: { mina: "👧", sam: "👦", swing: "🛝", stop: "✋", flower: "🌷", talk: "🗣️", turn: "🔄", happy: "😊" },
        scenes: [
          { caption: "مینا و سام در پارک‌اند. هر دو می‌خواهند اول سوار تاب شوند.",
            at: { mina: [28, 62, { size: 1.8 }], swing: [50, 54, { size: 2 }], sam: [72, 62, { size: 1.8, flip: true }] } },
          { caption: "هر دو عصبانی می‌شوند و صدایشان بلند می‌شود.",
            at: { mina: [32, 62, { size: 1.8, act: "shake" }], sam: [68, 62, { size: 1.8, flip: true, act: "shake" }] } },
          { caption: "اول: می‌ایستیم.", at: { mina: [28, 62, { size: 1.8 }], sam: [72, 62, { size: 1.8, flip: true }], stop: [50, 18, { size: 1.6 }] } },
          { caption: "دوم: آرام نفس می‌کشیم.", at: { stop: null, flower: [50, 18, { size: 1.6, act: "grow" }] } },
          { caption: "سوم: می‌گوییم چه حسی داریم. مینا: «من هم خیلی تاب دوست دارم.»", at: { flower: null, talk: [50, 18, { size: 1.6 }] } },
          { caption: "چهارم: با هم راهی پیدا می‌کنیم. سام: «نوبتی! تو ده تا تاب بخور، بعد من.»", at: { talk: null, turn: [50, 18, { size: 1.6, act: "spin" }] } },
          { caption: "حالا هر دو خوشحال‌اند.", at: { turn: null, happy: [50, 18, { size: 1.6, act: "bounce" }], mina: [50, 54, { size: 1.8 }], sam: [74, 64, { size: 1.8, flip: true }] } }
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
      { type: "story", prompt: "سه چیز خوب شیرین", bg: "room",
        cast: { shirin: "👧", phone: "📞", ball: "⚽", bread: "🫓", star: "🌟", one: "۱", two: "۲", three: "۳" },
        scenes: [
          { caption: "شب، سر سفره شام، شیرین سه چیز خوب امروزش را می‌گوید.", at: { shirin: [50, 62, { size: 2 }] } },
          { caption: "یک: مادربزرگ تلفن زد و با هم خندیدیم.", at: { one: [20, 22, { size: 1.4 }], phone: [20, 42, { size: 1.4, act: "bounce" }] } },
          { caption: "دو: با آیدین توپ‌بازی کردم.", at: { two: [50, 22, { size: 1.4 }], ball: [50, 42, { size: 1.4, act: "bounce" }] } },
          { caption: "سه: نان تازه و گرم خوردم.", at: { three: [80, 22, { size: 1.4 }], bread: [80, 42, { size: 1.4, act: "bounce" }] } },
          { caption: "چیزهای خوب گاهی خیلی کوچک‌اند. وقتی به یادشان می‌آوریم، دلمان گرم می‌شود.",
            at: { one: null, two: null, three: null, phone: null, ball: null, bread: null, star: [50, 26, { size: 1.8, act: "grow" }] } }
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
