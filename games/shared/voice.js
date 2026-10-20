/* باغچه — the recess games' voice, in Persian. Load after lines.js.
   Plays the recorded clips in audio/games/<key>.mp3; if a clip is missing (or cannot be played), the device's
   Persian voice says the line, if the device has one.

     Voice.say('md.howMove')                  speak one line
     Voice.say(['rb.win1', 'rb.win2'])        pick one at random
     Voice.say('md.meadow', 'md.tapPencil')   speak several in a row
     Voice.stop()
     Voice.lang                               always "fa"

   Offline: Baghcheh's sw.js keeps every clip it has played. Shortly after a game opens, the clips of the lines
   that game uses (found by their prefix in the page's script, e.g. 'mm.') are fetched in the background, so the
   game then works offline too. */
(() => {
  const LINES = self.VOICE_LINES || {};
  // games/shared/voice.js → the site's root
  const ROOT = (document.currentScript && document.currentScript.src || location.href).replace(/games\/shared\/voice\.js.*$/, '');
  const clipUrl = key => {
    const line = LINES[key];
    return line && line[1] ? ROOT + 'audio/games/' + encodeURIComponent(key) + '.mp3?v=' + line[1] : null;
  };

  let ctx = null;
  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // iPad only allows sound after a touch, so wake the audio up on the first one
  document.addEventListener('pointerdown', audio, { capture: true });

  const buffers = new Map(); // url -> Promise<AudioBuffer>
  function load(url) {
    if (!buffers.has(url)) {
      const p = fetch(url)
        .then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
        .then(data => new Promise((ok, fail) => audio().decodeAudioData(data, ok, fail)));
      p.catch(() => buffers.delete(url));
      buffers.set(url, p);
    }
    return buffers.get(url);
  }

  // ---------- the device's voice, when there is no clip ----------
  let ttsVoice = null;
  function pickTtsVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices().filter(v => /^fa/i.test(v.lang));
    const score = v => (/premium|enhanced|natural|neural|siri/i.test(v.name) ? 4 : 0) + (/dariush|google/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0);
    ttsVoice = voices.sort((a, b) => score(b) - score(a))[0] || null;
  }
  if ('speechSynthesis' in window) { pickTtsVoice(); speechSynthesis.addEventListener?.('voiceschanged', pickTtsVoice); }

  function speakTts(text, token) {
    return new Promise(done => {
      if (!('speechSynthesis' in window) || !ttsVoice || token !== playing) return done();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = ttsVoice.lang; u.voice = ttsVoice;
      u.rate = .92; u.pitch = 1.05;
      u.onend = u.onerror = () => done();
      speechSynthesis.speak(u);
    });
  }

  // ---------- playing ----------
  let playing = 0;   // bumps on every new say() so older ones stop
  let source = null, element = null;

  function stop() {
    playing++;
    if (source) { try { source.stop(); } catch (e) {} source = null; }
    if (element) { element.pause(); element = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  // Opened from a file (a USB stick), fetch() cannot read the clips: an <audio> element still can.
  function playElement(url, token) {
    return new Promise((done, fail) => {
      if (token !== playing) return done();
      const a = new Audio(url);
      element = a;
      a.onended = () => done();
      a.onerror = () => fail(new Error('audio'));
      a.play().catch(fail);
    });
  }

  async function playOne(key, token) {
    const line = LINES[key];
    if (!line) { console.warn('Voice: unknown line', key); return; }
    const url = clipUrl(key);
    if (url) {
      try {
        if (location.protocol === 'file:') { await playElement(url, token); return; }
        const buf = await load(url);
        if (token !== playing) return;
        const a = audio();
        await new Promise(done => {
          source = a.createBufferSource();
          source.buffer = buf;
          source.connect(a.destination);
          source.onended = done;
          source.start();
        });
        return;
      } catch (e) { /* fall through to the device's voice */ }
    }
    await speakTts(line[0], token);
  }

  async function say(...items) {
    stop();
    const token = playing;
    for (let item of items) {
      if (!item) continue;
      if (Array.isArray(item)) item = item[Math.floor(Math.random() * item.length)];
      await playOne(item, token);
      if (token !== playing) return;
    }
  }

  // ---------- fetch this game's clips in the background (for offline play) ----------
  function warm() {
    if (location.protocol === 'file:' || !navigator.onLine) return;
    const code = [...document.scripts].filter(s => !s.src).map(s => s.textContent).join('\n');
    const prefixes = new Set((code.match(/['"`]([a-z]{2,3})\./g) || []).map(m => m.slice(1)));
    const keys = Object.keys(LINES).filter(k => prefixes.has(k.split('.')[0] + '.') && LINES[k][1]);
    let i = 0;
    // a few at a time, so the game itself is never slowed down
    const next = () => { if (i >= keys.length) return; const url = clipUrl(keys[i++]); fetch(url).catch(() => {}).then(next); };
    for (let n = 0; n < 3; n++) next();
  }
  addEventListener('load', () => setTimeout(warm, 4000));

  self.Voice = { say, stop, lang: 'fa', setLang() {} };
})();
