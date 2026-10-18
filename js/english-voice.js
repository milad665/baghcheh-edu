/* باغچه — English speech, next to B.speak (js/common.js). The device's English voice is used: almost every
   phone, tablet and computer has one, even when it has no Persian voice. A recorded file (audio/en/…) is
   preferred when a step names one. Text written only in Latin letters ("cat", "I can see a red ball.") is
   always spoken in English, wherever it is spoken from, so the games in js/games.js and the story animation
   speak English words with this voice without any change of their own. */
var B = window.B || {};
window.B = B;

(function () {
  var enVoice = null;
  // Prefer a local (offline) voice, and US or British English over other accents a child may find harder.
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var en = speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
    function score(v) {
      return (v.localService ? 4 : 0) + (/^en[-_](US|GB)/i.test(v.lang) ? 2 : 0) + (v.default ? 1 : 0);
    }
    en.sort(function (a, b) { return score(b) - score(a); });
    enVoice = en[0] || null;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    // js/common.js sets onvoiceschanged for the Persian voice; listening as well keeps both working.
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", pickVoice);
  }

  B.canSpeakEn = function () { return !!enVoice; };

  // Latin letters and no Persian ones: an English word or sentence.
  B.isEn = function (text) {
    return typeof text === "string" && /[A-Za-z]/.test(text) && !/[؀-ۿ]/.test(text);
  };

  B.speakEn = function (text, file) {
    if (file) {
      var a = new Audio(file);
      a.play().catch(function () { tts(text); });
      return;
    }
    tts(text);
  };

  function tts(text) {
    if (!enVoice || !text) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.voice = enVoice;
    u.lang = enVoice.lang;
    // A little slower than normal speech, as a teacher speaks to beginners, but not so slow it sounds odd.
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }

  /* A short instruction in Persian, then the English to listen to («گوش کن…», then "cat"): the English waits until
     the Persian has been said. Without a Persian voice the English is said straight away. */
  B.speakFaThenEn = function (fa, en, file) {
    var faVoice = "speechSynthesis" in window && speechSynthesis.getVoices().find(function (v) { return /^fa/i.test(v.lang); });
    if (!faVoice || !fa) return B.speakEn(en, file);
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(fa), said = false;
    u.voice = faVoice;
    u.lang = faVoice.lang;
    u.rate = 0.85;
    function then() { if (!said) { said = true; B.speakEn(en, file); } }
    u.onend = then;
    // Cut off by other speech (the child tapped something, or went on): the English is not said late.
    u.onerror = function (e) { if (e.error === "interrupted" || e.error === "canceled") said = true; else then(); };
    speechSynthesis.speak(u);
    // Some browsers never report the end of an utterance: then the English comes after a fair wait.
    setTimeout(function () { if (!speechSynthesis.speaking) then(); }, 2500 + fa.length * 120);
  };

  // English text goes to the English voice; everything else is spoken as before.
  var speakFa = B.speak;
  B.speak = function (text, file) {
    if (B.isEn(text)) return B.speakEn(text, file);
    return speakFa(text, file);
  };
})();
