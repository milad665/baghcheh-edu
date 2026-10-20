/* باغچه — the child who is playing a recess game (زنگ تفریح), and where the game keeps their progress.
   Load first on every game page. Baghcheh keeps every child in localStorage "baghcheh.v1" (js/common.js);
   the child chosen in the app ("current") is the one playing.

     Child.id, Child.name, Child.avatar, Child.level   the child (level: their Persian garden), or a guest
     Child.get(game) / Child.set(game, data)            small progress, kept in the child's profile
                                                         (p.games[game] = { d: data, t: time }), so it is backed up
                                                         and synced with the home hub like their lessons
     Child.key(name)                                    a localStorage key of this child's own, for bigger things
                                                         that stay on this device (drawings' list, a song, a stage)
     Child.db(name)                                     an IndexedDB name of this child's own (photos, drawings,
                                                         recorded stories: they stay on this device)
     Child.played(game)                                 notes the game in the child's learning log (p.log[day].g)
     Child.home                                         the address of «زنگ تفریح» in the app

   Time: while a game is open and the child is playing, the minutes are added to p.recess["2026-10-20"]. When
   today's minutes reach the child's daily recess time (p.recessLimit, chosen by the parent; by default from the
   garden, see B.recessLimit in js/recess.js), the game shows a gentle «time for a break» once.

   A game opened from the content browser (?guest) or with no child chosen plays as a guest: nothing is kept. */
(function () {
  var KEY = "baghcheh.v1";
  var guest = /[?&]guest\b/.test(location.search);
  var DEFAULT_LIMIT = { seed: 15, sprout: 15, sapling: 20, tree: 30, forest: 30 };
  var memory = {};

  function readState() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function findChild(s, id) { return s && Array.isArray(s.profiles) ? s.profiles.find(function (p) { return p.id === id; }) : null; }
  var start = readState();
  var me = guest || !start ? null : findChild(start, start.current);
  var id = me ? me.id : null;

  // Read, change and write back the child's profile in one go, so changes made elsewhere are kept.
  function update(fn) {
    if (!id) return false;
    var s = readState(), p = findChild(s, id);
    if (!p) return false;
    fn(p, s);
    s.changesSinceBackup = (s.changesSinceBackup || 0) + 1;
    try { localStorage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { return false; }
  }

  function day(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function get(game) {
    if (!id) return memory[game];
    var p = findChild(readState(), id), r = p && p.games && p.games[game];
    return r ? r.d : undefined;
  }
  function set(game, data) {
    if (!id) { memory[game] = JSON.parse(JSON.stringify(data)); return; }
    update(function (p) { p.games = p.games || {}; p.games[game] = { d: data, t: Date.now() }; });
  }
  function played(game) {
    update(function (p) {
      var k = day();
      p.log = p.log || {};
      var e = p.log[k] = p.log[k] || { l: [], a: [], p: [] };
      e.g = e.g || [];
      if (e.g.indexOf(game) < 0) e.g.push(game);
    });
  }

  // ---------- time ----------
  var level = me && me.levels ? me.levels.read || "sprout" : "sprout";
  function limitMinutes() {
    var p = id ? findChild(readState(), id) : null;
    if (p && p.recessLimit === 0) return 0; // the parent turned the reminder off
    return (p && p.recessLimit) || DEFAULT_LIMIT[level] || 15;
  }
  function todaySeconds() {
    var p = id ? findChild(readState(), id) : null;
    return (p && p.recess && p.recess[day()]) || 0;
  }

  var lastTouch = Date.now(), pending = 0, TICK = 5;
  ["pointerdown", "pointermove", "keydown"].forEach(function (t) { document.addEventListener(t, function () { lastTouch = Date.now(); }, { capture: true, passive: true }); });
  function flush() {
    if (!pending) return;
    var add = pending;
    pending = 0;
    update(function (p) {
      var k = day();
      p.recess = p.recess || {};
      p.recess[k] = (p.recess[k] || 0) + add;
      // keep two months
      var old = day(new Date(Date.now() - 62 * 24 * 3600 * 1000));
      Object.keys(p.recess).forEach(function (d) { if (d < old) delete p.recess[d]; });
    });
    checkBreak();
  }
  if (id) {
    setInterval(function () {
      // only while the page is seen and the child has touched it in the last minute (music and films count too)
      if (document.visibilityState === "visible" && Date.now() - lastTouch < 60000) pending += TICK;
      if (pending >= 30) flush();
    }, TICK * 1000);
    addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flush(); });
  }

  // ---------- the gentle break ----------
  var shownKey = "baghcheh.games.breakShown";
  function breakShownToday() { try { return localStorage.getItem(shownKey) === id + ":" + day(); } catch (e) { return false; } }
  function checkBreak() {
    var lim = limitMinutes();
    if (!lim || breakShownToday() || todaySeconds() < lim * 60) return;
    try { localStorage.setItem(shownKey, id + ":" + day()); } catch (e) { /* show it anyway */ }
    showBreak(lim);
  }
  function showBreak(lim) {
    if (document.getElementById("recessBreak")) return;
    var fa = function (n) { return String(n).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[+d]; }); };
    var box = document.createElement("div");
    box.id = "recessBreak";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<div class="rb-card" dir="rtl" lang="fa">' +
      '<div class="rb-pics" aria-hidden="true">🌳 🏃 🧸</div>' +
      '<p class="rb-title">زنگ تفریح امروز تمام شد!</p>' +
      '<p class="rb-text">امروز ' + fa(lim) + ' دقیقه بازی کردی. حالا وقت بازی بیرون از صفحه است: بدو، بپر، نقاشی بکش یا با اسباب‌بازی‌هایت بازی کن.</p>' +
      '<div class="rb-row"><a class="btn big go" href="' + home + '" aria-label="برگشت به باغچه">🏠</a></div>' +
      '<button type="button" class="rb-more">برای والدین: ۱۰ دقیقه دیگر</button>' +
      "</div>";
    box.querySelector(".rb-more").addEventListener("click", function () {
      // the parent allows a little more today: the reminder comes back after ten more minutes
      update(function (p) { p.recess = p.recess || {}; p.recess[day()] = Math.max(0, (p.recess[day()] || 0) - 600); });
      try { localStorage.removeItem(shownKey); } catch (e) { /* fine */ }
      box.remove();
    });
    document.body.appendChild(box);
    if (self.Voice) Voice.stop();
  }

  // the app's page, from games/<game>/index.html
  var home = "../../index.html#/play";

  self.Child = {
    id: id,
    guest: !id,
    name: me ? me.name : "",
    avatar: me ? me.avatar : "",
    level: level,
    get: get,
    set: set,
    played: played,
    key: function (name) { return "baghcheh.games." + (id || "guest") + "." + name; },
    db: function (name) { return "baghcheh-games-" + (id || "guest") + (name ? "-" + name : ""); },
    home: home
  };

  // a game counts as played once the child has spent a little while in it
  if (id) {
    var game = (location.pathname.match(/games\/([\w-]+)\//) || [])[1];
    if (game) setTimeout(function () { if (Date.now() - lastTouch < 60000) played(game); }, 20000);
    addEventListener("load", function () { setTimeout(checkBreak, 1500); });
  }
})();
