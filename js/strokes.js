/* باغچه — how each letter is written: the strokes of its stand-alone form, in writing order (usually the main body
   first, right to left, then dots and the small strokes on top). Drawn with an even pen line on a 200 × 200 grid with
   the baseline at y = 130. Starting points, directions and order follow the first-grade writing book of Iran's
   Ministry of Education, «نگارش فارسی (اول)», 1404–1405, code 104 (chap.sch.ir/books/13105): its shape pages
   (نگاره‌ها, pp. 8–29) and arrow models (pp. 22–23, 31). From that book: loops of «و ف ق م» start where the loop
   meets the rest of the letter and turn clockwise; «ه» starts at its top and turns the other way; the madd of «آ»
   goes right to left; the slanted stroke of «ک» comes first, then its body.
   Each stroke is a path ("M… Q… L… A…", one piece: no second M) or a dot [x, y]. Used by the intro and trace steps
   (js/anim.js). Below the letters: the Persian digits, the Latin letters for English, and the pre-writing paths. */
var B = window.B || {};
window.B = B;

(function () {
  var BEH = "M152 104 Q153 131 128 131 L72 131 Q49 131 47 108";
  var JEEM = "M68 94 Q96 80 128 92 Q88 102 76 126 Q66 162 104 168 Q128 170 142 158";
  var DAL = "M94 80 Q120 104 122 126 Q110 133 72 130";
  var REH = "M118 102 Q126 136 102 152 Q86 162 62 158";
  var SEEN = "M172 100 Q173 126 157 125 Q144 124 144 106 Q145 125 132 125 Q119 124 119 106 Q122 158 86 158 Q52 158 56 116";
  var SAD = "M112 130 Q124 98 154 100 Q178 104 166 122 Q158 131 118 131 Q104 131 104 112 Q108 160 76 160 Q46 158 50 118";
  var TAH = "M64 131 Q86 100 124 100 Q162 102 152 123 Q145 132 64 131";
  var AIN = "M134 88 Q114 66 96 82 Q86 100 114 112 Q72 112 68 140 Q64 172 106 172 Q128 172 142 160";
  var KAF = "M140 84 Q138 110 139 126 Q132 131 66 131 Q45 131 43 108";
  var KAF_SLANT = "M186 40 L150 72";

  B.STROKES = {
    "ا": ["M102 48 Q99 90 99 130"],
    "آ": ["M102 56 Q99 94 99 130", "M122 32 Q111 46 100 36 Q89 26 78 40"],
    "ب": [BEH, [100, 152]],
    "پ": [BEH, [90, 150], [110, 150], [100, 166]],
    "ت": [BEH, [90, 108], [110, 108]],
    "ث": [BEH, [90, 110], [110, 110], [100, 93]],
    "ج": [JEEM, [106, 134]],
    "چ": [JEEM, [96, 130], [116, 130], [106, 146]],
    "ح": [JEEM],
    "خ": [JEEM, [98, 68]],
    "د": [DAL],
    "ذ": [DAL, [92, 62]],
    "ر": [REH],
    "ز": [REH, [122, 82]],
    "ژ": [REH, [114, 82], [130, 82], [122, 66]],
    "س": [SEEN],
    "ش": [SEEN, [132, 86], [157, 86], [144, 70]],
    "ص": [SAD],
    "ض": [SAD, [142, 80]],
    "ط": [TAH, "M90 44 Q88 90 90 128"],
    "ظ": [TAH, "M90 44 Q88 90 90 128", [124, 84]],
    "ع": [AIN],
    "غ": [AIN, [110, 56]],
    "ف": ["M150 128 Q132 124 136 106 Q144 94 156 104 Q164 120 148 131 L72 131 Q49 131 47 108", [148, 80]],
    "ق": ["M138 116 Q122 112 128 96 Q138 86 150 96 Q156 110 144 118 Q150 160 100 160 Q56 160 60 112", [130, 72], [150, 72]],
    "ک": [KAF_SLANT, KAF],
    "گ": [KAF_SLANT, KAF, "M184 16 L150 47"],
    "ل": ["M130 48 Q126 100 128 126 Q130 160 96 160 Q62 160 62 120"],
    "م": ["M104 130 Q100 106 118 106 Q134 106 132 122 Q130 132 104 131 L90 131 Q80 140 82 176"],
    "ن": ["M142 100 Q146 154 100 154 Q54 154 58 100", [100, 112]],
    "و": ["M120 112 Q98 113 88 110 Q80 106 81 94 Q82 74 99 73 Q117 73 120 95 Q122 108 121 120 Q120 142 104 152 Q92 159 76 161"],
    "ه": ["M114 88 Q72 114 92 130 Q112 142 132 124 Q142 104 114 88"],
    "ی": ["M130 96 Q98 92 112 114 Q132 130 112 146 Q90 160 60 150 Q46 142 54 126"]
  };

  /* Persian digits, between y = 50 and the baseline. Like the letters: from the top down; the teeth of «۲» and «۳»
     right to left, ending at the top of the stem; the loop of «۹» starts where it meets the stem and turns clockwise;
     «۵» starts at its point and goes down on the right side; «۰» is a small round dot. Still to check against the
     first-grade math book («ریاضی اول»), like the letters: see CURRICULUM.md. */
  var DIGITS = {
    "۰": ["M100 82 A16 16 0 0 0 100 114 A16 16 0 0 0 100 82"],
    "۱": ["M102 50 Q99 92 100 130"],
    "۲": ["M126 48 Q124 66 110 65 Q98 64 95 54 Q93 92 96 130"],
    "۳": ["M134 46 Q133 63 123 62 Q115 61 114 52 Q113 64 104 63 Q95 62 93 54 Q91 92 94 130"],
    "۴": ["M126 50 Q100 46 102 62 Q104 74 122 76 Q99 78 97 98 Q95 116 99 130"],
    "۵": ["M100 52 Q124 78 122 106 Q120 130 100 130 Q80 130 78 106 Q76 78 100 52"],
    "۶": ["M82 50 Q90 64 108 60 Q118 58 120 52 Q114 90 92 130"],
    "۷": ["M124 50 L100 130 L76 50"],
    "۸": ["M124 130 L100 50 L76 130"],
    "۹": ["M114 68 Q113 84 98 84 Q82 84 82 66 Q82 48 98 48 Q114 48 114 68 Q116 100 112 130"]
  };
  Object.keys(DIGITS).forEach(function (d) { B.STROKES[d] = DIGITS[d]; });

  /* Latin letters for the English course, written left to right the way most schools teach print: small letters
     between the midline (y = 90) and the baseline, tall parts from y = 50, tails down to y = 172; capitals from
     y = 50. Round letters start at the top right and go round to the left («c», «o», the body of «a d g q»);
     sticks are drawn top to bottom, then the bumps and the cross strokes. */
  var BOWL = "M122 98 Q114 90 100 90 Q78 90 78 110 Q78 130 100 130 Q114 130 122 122"; // c-shaped: a d g q
  var HUMP = "M82 108 Q86 90 102 90 Q120 90 120 108 L120 130";                    // h n m
  var LATIN = {
    a: [BOWL, "M122 90 L122 130"],
    b: ["M82 50 L82 130", "M82 108 Q88 90 104 90 Q122 90 122 110 Q122 130 104 130 Q88 130 82 118"],
    c: [BOWL],
    d: [BOWL, "M122 50 L122 130"],
    e: ["M79 110 L121 110 Q121 90 100 90 Q78 90 78 110 Q78 130 100 130 Q113 130 121 122"],
    f: ["M118 56 Q110 48 100 50 Q92 52 92 66 L92 130", "M76 90 L110 90"],
    g: [BOWL, "M122 90 L122 158 Q122 172 102 172 Q88 172 81 164"],
    h: ["M82 50 L82 130", HUMP],
    i: ["M100 90 L100 130", [100, 70]],
    j: ["M108 90 L108 160 Q108 172 94 172 Q84 172 79 164", [108, 70]],
    k: ["M84 50 L84 130", "M118 88 L84 114", "M96 106 L120 130"],
    l: ["M100 50 L100 130"],
    m: ["M72 90 L72 130", "M72 106 Q74 90 87 90 Q100 90 100 106 L100 130", "M100 106 Q102 90 115 90 Q128 90 128 106 L128 130"],
    n: ["M82 90 L82 130", HUMP],
    o: ["M100 90 Q78 90 78 110 Q78 130 100 130 Q122 130 122 110 Q122 90 100 90"],
    p: ["M82 90 L82 172", "M82 108 Q88 90 104 90 Q122 90 122 110 Q122 130 104 130 Q88 130 82 118"],
    q: [BOWL, "M122 90 L122 172"],
    r: ["M86 90 L86 130", "M86 108 Q92 90 106 90 Q114 90 119 95"],
    s: ["M118 96 Q110 90 100 90 Q82 90 82 100 Q82 108 100 110 Q118 112 118 120 Q118 130 100 130 Q87 130 80 124"],
    t: ["M96 60 L96 122 Q96 130 104 130 Q110 130 115 125", "M80 90 L112 90"],
    u: ["M80 90 L80 112 Q80 130 100 130 Q120 130 120 112", "M120 90 L120 130"],
    v: ["M80 90 L100 130 L120 90"],
    w: ["M70 90 L85 130 L100 98 L115 130 L130 90"],
    x: ["M80 90 L120 130", "M120 90 L80 130"],
    y: ["M80 90 L101 130", "M120 90 L90 172"],
    z: ["M80 90 L120 90 L80 130 L120 130"],
    A: ["M100 50 L72 130", "M100 50 L128 130", "M84 100 L116 100"],
    B: ["M80 50 L80 130", "M80 50 L104 50 Q122 50 122 70 Q122 90 104 90 L80 90", "M80 90 L108 90 Q126 90 126 110 Q126 130 106 130 L80 130"],
    C: ["M124 62 Q114 50 100 50 Q74 50 74 90 Q74 130 100 130 Q114 130 124 118"],
    D: ["M80 50 L80 130", "M80 50 L98 50 Q126 50 126 90 Q126 130 98 130 L80 130"],
    E: ["M82 50 L82 130", "M82 50 L120 50", "M82 90 L114 90", "M82 130 L120 130"],
    F: ["M82 50 L82 130", "M82 50 L120 50", "M82 90 L114 90"],
    G: ["M124 62 Q114 50 100 50 Q74 50 74 90 Q74 130 100 130 Q124 130 124 102", "M104 100 L126 100"],
    H: ["M78 50 L78 130", "M122 50 L122 130", "M78 90 L122 90"],
    I: ["M100 50 L100 130", "M84 50 L116 50", "M84 130 L116 130"],
    J: ["M116 50 L116 108 Q116 130 96 130 Q80 130 76 114"],
    K: ["M80 50 L80 130", "M122 50 L80 96", "M94 82 L124 130"],
    L: ["M82 50 L82 130 L120 130"],
    M: ["M72 50 L72 130", "M72 50 L100 104 L128 50 L128 130"],
    N: ["M78 50 L78 130", "M78 50 L122 130 L122 50"],
    O: ["M100 50 Q74 50 74 90 Q74 130 100 130 Q126 130 126 90 Q126 50 100 50"],
    P: ["M80 50 L80 130", "M80 50 L104 50 Q124 50 124 72 Q124 94 104 94 L80 94"],
    Q: ["M100 50 Q74 50 74 90 Q74 130 100 130 Q126 130 126 90 Q126 50 100 50", "M106 108 L128 134"],
    R: ["M80 50 L80 130", "M80 50 L104 50 Q124 50 124 72 Q124 94 104 94 L80 94", "M100 94 L124 130"],
    S: ["M122 60 Q112 50 100 50 Q78 50 78 70 Q78 86 100 90 Q124 94 124 112 Q124 130 100 130 Q84 130 76 120"],
    T: ["M76 50 L124 50", "M100 50 L100 130"],
    U: ["M78 50 L78 106 Q78 130 100 130 Q122 130 122 106 L122 50"],
    V: ["M74 50 L100 130 L126 50"],
    W: ["M64 50 L81 130 L100 74 L119 130 L136 50"],
    X: ["M76 50 L124 130", "M124 50 L76 130"],
    Y: ["M76 50 L100 90", "M124 50 L100 90 L100 130"],
    Z: ["M78 50 L122 50 L78 130 L122 130"]
  };
  Object.keys(LATIN).forEach(function (ch) { B.STROKES[ch] = LATIN[ch]; });

  /* Pre-writing paths (the trace step's `path`): lines and shapes before letters. Straight lines go top to bottom,
     and everything that runs sideways starts on the right and goes left, the way Persian is written. */
  B.PATHS = {
    down: ["M150 40 L150 160", "M100 40 L100 160", "M50 40 L50 160"],
    across: ["M164 54 L36 54", "M164 100 L36 100", "M164 146 L36 146"],
    slant: ["M150 44 L106 156", "M118 44 L74 156", "M86 44 L42 156"],
    bowl: ["M164 64 Q164 148 100 148 Q36 148 36 64"],
    hills: ["M176 140 Q156 52 136 140 Q116 52 96 140 Q76 52 56 140 Q36 52 16 140"],
    wave: ["M178 100 Q159 56 140 100 Q121 144 102 100 Q83 56 64 100 Q45 144 26 100"],
    zigzag: ["M174 62 L150 140 L126 62 L102 140 L78 62 L54 140 L30 62"],
    circle: ["M100 40 A60 60 0 0 0 100 160 A60 60 0 0 0 100 40"]
  };
})();
