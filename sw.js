/* باغچه — offline support.
   Each VERSION is one complete snapshot of the site: it is downloaded in full on install and then served
   from the cache, so old and new files are never mixed. Bump VERSION on every release (and add new files
   to FILES); open pages switch to the new snapshot by reloading once (see js/common.js). */
var VERSION = "baghcheh-v24";
var FILES = [
  "./", "index.html", "guide.html", "method.html", "policies.html", "open.html", "browse.html",
  "css/style.css", "fonts/BalooBhaijaan2.woff", "js/common.js", "js/art.js", "js/art/people.js", "js/art/feelings.js", "js/art/animals.js", "js/art/food.js", "js/art/nature.js", "js/art/home.js", "js/art/things.js", "js/art/scenes.js", "js/art/rig.js", "js/art/rig-science.js", "js/art/rig-feel.js", "js/art/rig-english.js", "js/art/rig-math.js", "js/art/rig-read.js", "js/art/rig-think.js", "js/art/rig-health.js", "js/art/rig-world.js", "js/strings.js", "js/content.js",
  "js/lessons/read.js", "js/lessons/math.js", "js/lessons/feel.js", "js/engine.js", "js/games.js", "js/strokes.js", "js/anim.js", "js/scene.js", "js/steps/paper.js", "js/steps/measure.js", "js/steps/math2.js", "js/steps/reading.js", "js/lessons/science.js", "js/steps/science.js", "js/english-voice.js", "js/steps/english.js", "js/lessons/english.js", "js/sync.js", "js/activities.js", "js/lessons/health.js", "js/steps/health.js", "js/lessons/thinking.js", "js/steps/coding.js", "js/steps/thinking.js", "js/steps/python.js", "js/lessons/world.js", "js/maps/iran.js", "js/maps/iran-relief.js", "js/maps/region.js", "js/maps/world.js", "js/maps/flags.js", "js/steps/world.js", "js/steps/numbers.js", "js/steps/feel.js", "js/en/strings.js", "js/en/math.js", "js/en/health.js", "js/en/thinking.js", "js/en/science.js", "js/en/feel.js", "js/en/world.js", "js/english-mode.js", "js/practice.js", "js/practice/read.js", "js/practice/math.js", "js/practice/english.js", "js/practice/science.js", "js/practice/health.js", "js/practice/thinking.js", "js/practice/world.js", "js/practice/feel.js", "js/plan.js", "js/app.js", "js/browse.js",
  // The everyday sounds of the English sound-play lessons (tools/make-en-sounds.js), so they work offline.
  "audio/en/sounds/knock.mp3", "audio/en/sounds/rain.mp3", "audio/en/sounds/bell-loud.mp3", "audio/en/sounds/bell-quiet.mp3", "audio/en/sounds/clock.mp3", "audio/en/sounds/horn.mp3", "audio/en/sounds/claps-slow.mp3", "audio/en/sounds/claps-fast.mp3", "audio/en/sounds/claps-2.mp3", "audio/en/sounds/claps-3.mp3", "audio/en/sounds/claps-4.mp3", "audio/en/sounds/claps-rhythm.mp3",
  "manifest.webmanifest", "icon.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (cache) {
    // Bypass the HTTP cache so the snapshot really is the new release.
    return cache.addAll(FILES.map(function (f) { return new Request(f, { cache: "reload" }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  // /api/ only exists on a home hub (desktop/): always ask the hub itself.
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.indexOf("/api/") !== -1) return;
  // The review tools (tools/storyboard.html …) always load fresh files, never the cached snapshot.
  if (url.pathname.indexOf("/tools/") !== -1 || (e.request.referrer && e.request.referrer.indexOf("/tools/") !== -1)) return;
  // The content plan (CURRICULUM.md, curriculum/*.md) changes between releases: always ask the network first and
  // keep a copy only for offline use, so the content browser never shows an old plan.
  if (/\.md$/.test(url.pathname)) {
    e.respondWith(fetch(e.request).then(function (res) {
      if (res.ok) caches.open(VERSION).then(function (cache) { cache.put(e.request, res.clone()); });
      return res;
    }).catch(function () { return caches.open(VERSION).then(function (cache) { return cache.match(e.request); }); }));
    return;
  }
  e.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (cached) {
      // Hosts like Cloudflare Pages redirect page.html to /page; a page load must not get a redirected response.
      if (cached) return cached.redirected ? new Response(cached.body, cached) : cached;
      // Not part of the snapshot (e.g. an optional audio file): fetch it and keep a copy for offline use.
      return fetch(e.request).then(function (res) {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      });
    });
  }));
});
