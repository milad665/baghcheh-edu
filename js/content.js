/* باغچه — curriculum DATA shared by every subject: gardens (levels), subjects, placement check and helpers.
   The lessons themselves live in one file per subject (js/lessons/read.js, math.js, feel.js…), each of which
   pushes its lessons into B.LESSONS. A new subject adds its own file (and pushes into B.SUBJECTS), so subjects
   can be written in parallel without touching the same file. Step types: see js/engine.js and README.md. */
var B = window.B || {};
window.B = B;

// Gardens (levels). Typical ages live only in the parent guide, never in the children's view.
B.LEVELS = [
  { id: "seed", name: "دانه", emoji: "🌰" },
  { id: "sprout", name: "جوانه", emoji: "🌱" },
  { id: "sapling", name: "نهال", emoji: "🌿" },
  { id: "tree", name: "درخت", emoji: "🌳" },
  { id: "forest", name: "جنگل", emoji: "🌲" }
];

B.SUBJECTS = [
  { id: "read", name: "فارسی", emoji: "📖", leveled: true },
  { id: "math", name: "ریاضی", emoji: "🔢", leveled: true },
  { id: "feel", name: "احساس‌های من", emoji: "💛", leveled: false }
];

B.NUMBER_WORDS = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه", "ده",
  "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده", "بیست"];

// Filled by js/lessons/*.js, in the order the files are loaded (index.html). Within a subject and garden,
// lessons are shown in the order they are pushed.
B.LESSONS = [];

/* Placement check, modelled on the ASER/TaRL one-to-one assessment: the parent shows each item
   and answers yes/no. The first "not yet" decides the starting garden. */
B.PLACEMENT = {
  read: [
    { title: "حرف‌ها", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این حرف‌ها را بگوید (نام یا صدایش را)؟",
      items: ["ب", "د", "م", "س", "ر"], ifNot: "seed" },
    { title: "کلمه‌ها", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این کلمه‌ها را بخواند؟",
      items: ["آب", "بابا", "سَبَد", "دَست", "کِتاب"], ifNot: "sprout" },
    { title: "بند کوتاه", ask: "آیا کودک می‌تواند این چند جمله را آرام اما درست بخواند (با کمتر از ۳ اشتباه)؟",
      text: "سارا یک گربه دارد. گربه سفید است. سارا با گربه بازی می‌کند. گربه شیر می‌خورد.", ifNot: "sapling" },
    { title: "داستان", ask: "آیا کودک می‌تواند این داستان را روان بخواند و بگوید چرا رضا خوشحال شد؟",
      text: "رضا و مادربزرگش در باغ درخت کاشتند. هر روز صبح رضا به درخت آب می‌داد. روزها گذشت و درخت کوچک بزرگ‌تر شد. تابستان که آمد، درخت پر از سیب‌های سرخ بود. رضا یک سیب چید و آن را با مادربزرگ نصف کرد. رضا خیلی خوشحال بود، چون درختی که خودش کاشته بود میوه داده بود.",
      ifNot: "tree" }
  ],
  readTop: "forest",
  math: [
    { title: "شمردن", ask: "آیا کودک می‌تواند این‌ها را یکی‌یکی درست بشمارد؟", items: ["🍎🍎🍎🍎🍎🍎🍎"], ifNot: "seed" },
    { title: "عددهای یک‌رقمی", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این عددها را بخواند؟", items: ["۳", "۷", "۵", "۹", "۲"], ifNot: "sprout" },
    { title: "عددهای دورقمی", ask: "آیا کودک می‌تواند دست‌کم ۴ تا از این عددها را بخواند؟", items: ["۲۳", "۴۷", "۶۱", "۸۵", "۳۹"], ifNot: "sprout" },
    { title: "تفریق", ask: "آیا کودک می‌تواند دست‌کم یکی از این دو را روی کاغذ درست حل کند؟", items: ["۵۲ − ۲۷", "۴۳ − ۱۸"], ifNot: "sapling" },
    { title: "تقسیم", ask: "آیا کودک می‌تواند این تقسیم را روی کاغذ درست حل کند؟", items: ["۶۸۴ ÷ ۴"], ifNot: "tree" }
  ],
  mathTop: "forest"
};

// A child's garden in a subject. Subjects added later (science, English, …) start at the subject's own
// defaultLevel if it has one (English starts at Seed for everyone), otherwise at the child's Persian garden,
// until a parent changes it.
B.levelOf = function (p, subjectId) {
  if (p.levels && p.levels[subjectId]) return p.levels[subjectId];
  var sub = B.subjectById(subjectId);
  return (sub && sub.defaultLevel) || (p.levels && p.levels.read) || "sprout";
};
B.levelById = function (id) { return B.LEVELS.find(function (l) { return l.id === id; }); };
B.subjectById = function (id) { return B.SUBJECTS.find(function (s) { return s.id === id; }); };
B.lessonById = function (id) { return B.LESSONS.find(function (l) { return l.id === id; }); };
B.lessonsFor = function (subject, level) {
  return B.LESSONS.filter(function (l) { return l.subject === subject && (l.level === level || l.level === null); });
};
