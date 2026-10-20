# Voice-over script: lines for a native speaker to check

The `spoken_script` column in `voiceover-script.tsv` is filled for all 1,307 Persian rows. The scripts were written
by AI from the conventions below, so please have a native speaker check them before recording.
They are most useful as a pilot list: generate these lines first with the chosen voice and listen.

## Conventions used throughout

- Every short vowel is marked (َ ِ ُ). There is no sukun on normal words, but isolated consonant sounds in blend
  lines get one («اَ ... سْ ... بْ ... اَسب»). Tashdid is marked. The ezafe is a kasra, or «هٔ» after a silent ه.
- The conjunction و ("and") follows the register. Informal and mixed lines: «وُ», said "o". Formal lines: «وَ», said
  "va", with a comma before it («می‌خورَد، وَ می‌رَوَد»). Without the comma, Setareh reads «وَ» as "o"; the pilot is in
  `audio/pilot/va/`. A و inside a word keeps its own vowel («آوُرد», «دُوُّم»).
- Voice: **Setareh** (`8Ebkg5uUcbSbeqGucAoR`), chosen from the pilot in `audio/pilot/`.
- Informal rows use gentle Tehrani everyday speech: را → «رو», است → ـه, نان/خانه → «نون/خونه», کدام → «کُدوم».
  Names are never changed.
- Formal rows: with the marks and the comma before «وَ» removed, each line is exactly the original text.
- **Listen to the comma before «وَ»** in short pairs, where a pause may sound odd: the number cards «دَه، وَ سِه»
  (often said "dah-o-se" in class), «میز، وَ کِتاب‌ها», «بالِش، وَ پَتو», «نانِ تازِه، وَ داغ», «ماهی، وَ موش».
- Mixed rows: the target and option words are as written («نان» stays «نان»), and the question around them
  is informal.

## Things to test in the pilot (affect many lines)

1. **Bare letters**: «ب رو پِیدا کُن», «ک رو پِیدا کُن» and the like, about 30 mixed rows. The letter is left as
   written, so the TTS chooses whether to say the letter name ("be", "kāf") or the sound. If it reads them
   inconsistently, write out how each letter should be said (e.g. «بِ») in these rows only.
2. **Isolated sounds with sukun**: «سْ», «مْـ», «بْر», «تْر» in blend and sound lines. Check that it says the
   sound, not "sin" or "mim".
3. **«کدام کلمه X است؟»** was reordered to «کَلَمِهٔ X کُدومِه؟», and «کدام بَ است؟» to «بَ کُدومِه؟». This keeps
   the target word separate (otherwise you get «دَره»، «بوئه»). Native check: does it sound natural?
4. **«کی» = who** (fa/a30175556d, fa/c817401b0d): it must be read "ki", not «کِی» (when).

## Individual lines

| file | change | question |
| --- | --- | --- |
| fa/2ae0dda25c | «هژار» → «هَژار» | Kurdish name: Hazhâr or Hezhâr? |
| fa/3297e0e77a, fa/ba993a0768 | «این عدد دو/سه است» → «دوئِه» / «سه‌ئِه» | TTS may stumble on «سه‌ئِه». Fallback is formal «سه اَست». |
| fa/1b3811f3c7 | «می‌ایستیم» → «وایمیسیم» | Too colloquial? |
| fa/308c09ce17, 1f7dc48487, c91c168fae, 0bcdfa0124, 301e34f1b2, ef8c901f15, 5e8b252284 | «می‌بارد» → «میاد» | Should science lessons keep «می‌باره»? |
| fa/bcfc70e3d1 | emergency number «صد و پانزده» → «صَد وُ پونزدَه» | The child should memorise this number. Use standard «پانزده»? |
| fa/dfd07d87b4 | «چه بنوشی» → «چی بُخوری» | Keep «بِنوشی»? |
| fa/5313c6dea1 | «۴ بار تکرار کن: جلو.» → «چَهار بار…» | The quoted code block shows «۴» on screen. |
| fa/de819f2223 | «حرف b … حرف d» → «حَرفِ بی … حَرفِ دی» | English letter names said in Persian. |
| fa/a1334bd40b, 8c85b93d87, 54e393c633, 49931f0f8b | حمام/گلدان/درمانگاه/نانوایی → «حَمّوم/گُلدون/دَرمونگاه/نونوایی» in informal lines | The formal word cards keep the written form. Should the informal lines match the cards? |
| math-seed-4 rows | «کوچک» → «کوچیک» | Fine for a size lesson? |
| fa/469a62edf7 | foreign names «هاروتوئه، وانجیروئه، پِدروئه», «بِرِزیل، ژاپُن، کِنیا» | Vowel marks on the foreign names are a best guess. |
| fa/2356a8cbec | «قطعه «تکرار» است» → «قِطعهٔ تَکرارِه» | The «» were dropped so ـه could attach. |
| fa/3d03b75599, fa/59c51027d5 | «اولشان مثل هم است» → «مِثلِ هَمِه» | Sounds like «همه». OK in context? |
| fa/594d34e4fc vs other lines | «نوشِ جان» kept in one place, «نوشِ جون» in another | Pick one. |
| fa/4e7cef1d15 | «تُخمِ‌مُرغ» | Marked with an ezafe kasra. |
