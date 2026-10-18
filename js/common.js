/* باغچه — shared helpers: storage on this device only, speech, Persian digits. */
var B = window.B || {};
window.B = B;

(function () {
  var KEY = "baghcheh.v1";
  var memory = null; // used when the browser blocks storage

  B.load = function () {
    if (memory) return memory;
    try {
      var raw = localStorage.getItem(KEY);
      memory = raw ? JSON.parse(raw) : null;
    } catch (e) { memory = null; }
    if (!memory || !Array.isArray(memory.profiles)) memory = { profiles: [], current: null };
    if (!memory.deleted) memory.deleted = {};
    return memory;
  };

  B.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch (e) { /* stays in memory */ }
    if (B.onSave) B.onSave();
  };

  B.currentProfile = function () {
    var s = B.load();
    return s.profiles.find(function (p) { return p.id === s.current; }) || null;
  };

  // Erases this device only: it also forgets any home hub it was paired with (see js/sync.js),
  // so the other devices keep their copy.
  B.eraseAll = function () {
    memory = { profiles: [], current: null, deleted: {} };
    try { localStorage.removeItem(KEY); } catch (e) { /* nothing stored */ }
    if (B.onEraseAll) B.onEraseAll();
  };

  // ---- Keeping progress safe ----
  // Ask the browser not to evict our storage when space runs low. Clearing browsing data still erases it,
  // which is why parents can also keep a backup file or code.
  B.persist = function () {
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) { /* unsupported */ }
  };

  // Profiles carry updatedAt (name, picture and levels; the newer copy wins when merging).
  // A deleted child leaves a tombstone in s.deleted ({id: time}) so syncing does not bring them back.
  B.touch = function (p) { p.updatedAt = Date.now(); };

  B.removeProfile = function (id) {
    var s = B.load();
    s.deleted = s.deleted || {};
    s.deleted[id] = Date.now();
    s.profiles = s.profiles.filter(function (x) { return x.id !== id; });
    if (s.current === id) s.current = null;
  };

  B.backup = function () {
    var s = B.load();
    return { app: "baghcheh", format: 1, exported: Date.now(), profiles: s.profiles, deleted: s.deleted || {} };
  };

  function rank(r) { return r ? (r.mastered ? 100 : 0) + (r.box || 0) + (r.done ? 1 : 0) : -1; }
  function validProfile(p) { return p && typeof p.id === "string" && typeof p.name === "string" && p.levels && p.lessons; }
  function copy(x) { return JSON.parse(JSON.stringify(x)); }
  function buried(s, p) { return !!s.deleted[p.id] && s.deleted[p.id] >= (p.updatedAt || 0); }

  // Merges profiles from a backup or another device into this one: new children are added; for a child
  // already here, each lesson keeps whichever record shows more progress, and name, picture and levels
  // come from the copy changed last. With sync, tombstones travel too and a child stays deleted unless
  // they were changed after the deletion.
  B.merge = function (data, sync) {
    var s = B.load(), r = { added: 0, updated: 0, removed: 0, changed: false };
    s.deleted = s.deleted || {};
    if (sync && data.deleted && typeof data.deleted === "object") {
      Object.keys(data.deleted).forEach(function (id) {
        var t = +data.deleted[id] || 0;
        if (t > (s.deleted[id] || 0)) { s.deleted[id] = t; r.changed = true; }
      });
    }
    data.profiles.forEach(function (p) {
      if (!validProfile(p)) return;
      var here = s.profiles.find(function (x) { return x.id === p.id; });
      if (!here) {
        if (buried(s, p)) return;
        s.profiles.push(copy(p));
        r.added++;
        r.changed = true;
        return;
      }
      Object.keys(p.lessons).forEach(function (id) {
        if (rank(p.lessons[id]) > rank(here.lessons[id])) { here.lessons[id] = copy(p.lessons[id]); r.changed = true; }
      });
      // Learning log (js/plan.js): days from both copies are combined.
      Object.keys(p.log || {}).forEach(function (day) {
        here.log = here.log || {};
        var mine = here.log[day] = here.log[day] || { l: [], a: [] }, theirs = p.log[day] || {};
        ["l", "a"].forEach(function (f) {
          (theirs[f] || []).forEach(function (id) { if (mine[f].indexOf(id) < 0) { mine[f].push(id); r.changed = true; } });
        });
      });
      // Weekly plan: the copy saved last wins.
      if (p.plan && (!here.plan || (p.plan.updatedAt || 0) > (here.plan.updatedAt || 0))) {
        here.plan = copy(p.plan);
        r.changed = true;
      }
      if ((p.updatedAt || 0) > (here.updatedAt || 0)) {
        here.name = p.name;
        here.avatar = p.avatar;
        here.levels = copy(p.levels);
        here.updatedAt = p.updatedAt;
        r.changed = true;
      }
      r.updated++;
    });
    var before = s.profiles.length;
    s.profiles = s.profiles.filter(function (p) { return !buried(s, p); });
    r.removed = before - s.profiles.length;
    if (r.removed) r.changed = true;
    if (s.current && !s.profiles.some(function (p) { return p.id === s.current; })) s.current = null;
    return r;
  };

  // Restoring a backup on purpose brings back children deleted earlier.
  B.restore = function (data) {
    if (!data || data.app !== "baghcheh" || !Array.isArray(data.profiles)) throw new Error("not a backup");
    var s = B.load();
    s.deleted = s.deleted || {};
    data = { profiles: data.profiles.filter(validProfile).map(function (p) {
      if (!s.deleted[p.id]) return p;
      delete s.deleted[p.id];
      p = copy(p);
      p.updatedAt = Date.now();
      return p;
    }) };
    var r = B.merge(data, false);
    if (!r.added && !r.updated) throw new Error("empty backup");
    B.save();
    return { added: r.added, updated: r.updated };
  };

  var CODE_PREFIX = "BAGHCHEH1-";
  B.toCode = function (data) {
    return CODE_PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  };
  B.fromCode = function (code) {
    code = String(code).replace(/\s+/g, "");
    if (code.indexOf(CODE_PREFIX) !== 0) throw new Error("not a code");
    return JSON.parse(decodeURIComponent(escape(atob(code.slice(CODE_PREFIX.length)))));
  };

  B.markBackedUp = function () {
    var s = B.load();
    s.lastBackup = Date.now();
    s.changesSinceBackup = 0;
    B.save();
  };

  B.noteProgress = function () {
    var s = B.load();
    s.changesSinceBackup = (s.changesSinceBackup || 0) + 1;
    B.save();
  };

  // True when there is progress that has not been backed up for two weeks.
  B.backupDue = function () {
    var s = B.load();
    if (!s.changesSinceBackup) return false;
    return !s.lastBackup || Date.now() - s.lastBackup > 14 * 24 * 60 * 60 * 1000;
  };

  // ---- Persian digits ----
  var FA = "۰۱۲۳۴۵۶۷۸۹";
  B.fa = function (n) {
    return String(n).replace(/[0-9]/g, function (d) { return FA[+d]; });
  };

  // ---- Speech ----
  // Recorded audio files are preferred (see README). If none, the device's Persian voice is used when it has one.
  var faVoice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var voices = speechSynthesis.getVoices();
    faVoice = voices.find(function (v) { return /^fa/i.test(v.lang); }) || null;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  B.canSpeak = function () { return !!faVoice; };

  B.speak = function (text, file) {
    if (file) {
      var a = new Audio(file);
      a.play().catch(function () { tts(text); });
      return;
    }
    tts(text);
  };

  function tts(text) {
    if (!faVoice || !text) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.voice = faVoice;
    u.lang = faVoice.lang;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }

  B.el = function (tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") e.className = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  };

  // Offline support. Only works over http(s); opening the files directly still works, just without caching.
  // Pages served by the desktop app's home hub (see desktop/) are marked with a meta tag; they need no offline cache.
  B.servedByHub = !!document.querySelector('meta[name="baghcheh-hub"]');
  if ("serviceWorker" in navigator && location.protocol !== "file:" && !B.servedByHub) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
    // When a new release takes over, reload once so the page runs entirely on the new files.
    // Skipped on the very first install, when there was no previous version.
    var hadController = !!navigator.serviceWorker.controller, reloading = false;
    function busy() { return /^#\/(lesson|place)\//.test(location.hash); }
    function reloadWhenFree() {
      if (reloading) return;
      if (busy()) { window.addEventListener("hashchange", reloadWhenFree, { once: true }); return; }
      reloading = true;
      location.reload();
    }
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (hadController) reloadWhenFree();
    });
  }
})();
