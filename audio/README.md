Recorded audio for lessons (optional). Add a file here and reference it from a step in
`js/content.js`, e.g. `{ type: "intro", ..., audio: "audio/be.mp3" }`.
Prefer short mono .mp3 or .ogg at 32–48 kbps to keep the offline pack small.
Steps without a recording fall back to the device's Persian voice, if it has one.

`audio/en/sounds/` holds the everyday sounds of the English course (a knock, rain, a bell, claps…). They are
synthesised, not recorded: `node tools/make-en-sounds.js` makes them again.
