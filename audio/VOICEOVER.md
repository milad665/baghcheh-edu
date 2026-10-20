# Voice-over plan (ElevenLabs)

Everything Baghcheh currently speaks with the device voice (`B.speak`, `B.speakEn`, `B.speakSeq`) is listed in
`voiceover-script.tsv`, one row per unique clip (2,237 clips; the same sentence used in several places is recorded once).
The list was extracted from the step code, so it holds only what is actually spoken: for example a passage is not read
aloud, and a `choose` prompt is spoken only through its `say`.

## Columns

| column | meaning |
| --- | --- |
| file | suggested file name: `fa/` or `en/` + the first 10 hex characters of sha1(text_as_written). Because the name comes from the text, `B.speak(text)` can find the clip through a manifest without changing any lesson data. |
| group | `ui` = player phrases from `js/strings.js` (praise, retry, breathing, number words…), `lesson` = lesson content, `ui-en` / `lesson-en` = the English versions of lessons (`js/en/*`) |
| register | how the Persian is spoken (see below) |
| text_as_written | the text exactly as it is in the code |
| spoken_script | the text sent to ElevenLabs. Persian rows are still empty: informal or formal as the register says, **always with full اعراب** |
| uses / used_in | how many places use it, and the first few (lesson id, step number, step type, field) |

## Voice

Persian: **Setareh – Expressive Tehrani Creator** (`8Ebkg5uUcbSbeqGucAoR`) on `eleven_v3`, chosen from a pilot of three
native Tehrani women's voices (`audio/pilot/`). Lines that need a native speaker's check are in `voiceover-review.md`.

## Register

- **informal** (841 clips): instructions, questions, feedback and narration. The text is written formally and spoken
  in everyday Persian: «کدام بزرگ‌تر است؟» → «کُدوم بُزُرگ‌تَره؟».
- **formal** (400 clips): what the child should hear exactly as written, i.e. letters, syllables, words to read, build
  or clap, word cards and sort items, and the reading-lesson stories the child reads along with. These are spoken as
  written, with اعراب: «سَبَد».
- **mixed** (66 clips): reading-lesson questions about a target word, such as «موش. کدام با موش هم‌قافیه است؟ سیب؟ گوش؟ ماه؟».
  The question is informal but the target words stay exact: «موش. کُدوم با موش هَم‌قافیه‌ست؟ سیب؟ گوش؟ ماه؟».

## Joined speech

A few lines are put together in code from two parts. They are listed as separate clips and should be played one
after the other:
- map: place name + praise or retry
- feelings: feeling name + `feelReply`
- meter: level + reply
- science test: what happened («روی آب ماند», «آهنربا کشید»…) + guess reply

## Not voiced today (optional extra)

There are 122 prompts with no `say` that are shown but never spoken (`choose`, `pairs`, `feed`, `tenframe`…),
about 4,200 characters. They are not in the list.

## Rough size and cost (October 2026)

| | clips | characters as written | characters sent (estimate) |
| --- | --- | --- | --- |
| Persian | 1,307 | 39,800 | ~56,000 (full اعراب adds ~35–45%; informal speech is a little shorter) |
| English, English course | 221 | 1,650 | 1,650 |
| English, English versions of other lessons + UI | 709 | 29,900 | 29,900 |
| **Total** | **2,237** | **71,350** | **~88,000** |

- Credits: Persian needs `eleven_v3`, which bills 1 credit per character, so one clean pass costs about 88k credits.
  With retakes for mispronounced lines (expect 2–3 tries per line for Persian), voice tests and a pilot, budget
  **~200–250k credits**.
- Audio length: about 95–110 minutes (Persian ~60, English ~40, plus a little silence per clip).
- Disk, mono MP3: 32 kbps ≈ 24 MB, **48 kbps ≈ 36 MB (recommended)**, 64 kbps ≈ 48 MB. A Persian pack is ~60% of
  that; the English versions of lessons could be a separate, optional pack.
