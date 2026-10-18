/* باغچه — offline support.
   Each VERSION is one complete snapshot of the site: it is downloaded in full on install and then served
   from the cache, so old and new files are never mixed. Bump VERSION on every release (and add new files
   to FILES); open pages switch to the new snapshot by reloading once (see js/common.js). */
var VERSION = "baghcheh-v10";
var FILES = [
  "./", "index.html", "guide.html", "method.html", "policies.html", "open.html",
  "css/style.css", "js/common.js", "js/strings.js", "js/content.js", "js/engine.js", "js/sync.js", "js/app.js",
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
      if (cached) return cached;
      // Not part of the snapshot (e.g. an optional audio file): fetch it and keep a copy for offline use.
      return fetch(e.request).then(function (res) {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      });
    });
  }));
});
