/* باغچه — offline support.
   Each VERSION is one complete snapshot of the site: it is downloaded in full on install and then served
   from the cache, so old and new files are never mixed. Bump VERSION on every release (and add new files
   to FILES); open pages switch to the new snapshot by reloading once (see js/common.js). */
var VERSION = "baghcheh-v18";
var FILES = [
  "./", "index.html", "guide.html", "method.html", "policies.html", "open.html", "browse.html",
  "css/style.css", "js/common.js", "js/art.js", "js/art/people.js", "js/art/feelings.js", "js/art/animals.js", "js/art/food.js", "js/art/nature.js", "js/art/home.js", "js/art/things.js", "js/art/scenes.js", "js/strings.js", "js/content.js",
  "js/lessons/read.js", "js/lessons/math.js", "js/lessons/feel.js", "js/engine.js", "js/games.js", "js/strokes.js", "js/anim.js", "js/steps/reading.js", "js/lessons/science.js", "js/steps/science.js", "js/english-voice.js", "js/steps/english.js", "js/lessons/english.js", "js/sync.js", "js/activities.js", "js/lessons/health.js", "js/steps/health.js", "js/lessons/thinking.js", "js/steps/coding.js", "js/lessons/world.js", "js/steps/world.js", "js/steps/feel.js", "js/en/strings.js", "js/en/math.js", "js/en/health.js", "js/en/thinking.js", "js/en/science.js", "js/en/feel.js", "js/english-mode.js", "js/plan.js", "js/app.js", "js/browse.js",
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
