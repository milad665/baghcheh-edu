/* باغچه — sync with the family's home hub (the desktop app in desktop/) over the home Wi-Fi.
   Three ways this page can run:
   - in the desktop app's own window (window.BAGHCHEH_HUB_TOKEN): progress lives in the hub's file;
   - opened from the hub's address on a tablet or another computer (meta baghcheh-hub): pair with the code;
   - inside the Android app (window.BaghchehNative): pair with the hub's address and the code.
   Anywhere else (a normal mirror, a USB copy) this file does nothing and makes no requests.
   Merging is B.merge in js/common.js; the hub only stores what devices send it. */
(function () {
  var el = B.el;
  var KEY = "baghcheh.hub";
  var hubToken = window.BAGHCHEH_HUB_TOKEN || null;
  var native = window.BaghchehNative || null;
  var S = B.sync = {};

  S.isHub = !!hubToken;
  S.available = S.isHub || B.servedByHub || !!native;
  if (!S.available) return;

  // ---- Pairing (devices other than the hub) ----
  function pairing() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function setPairing(p) {
    try { if (p) localStorage.setItem(KEY, JSON.stringify(p)); else localStorage.removeItem(KEY); } catch (e) { /* storage blocked */ }
  }
  S.paired = function () { return S.isHub || !!pairing().token; };
  function token() { return hubToken || pairing().token; }

  // ---- Talking to the hub ----
  var calls = 0, waiting = {};
  if (native) {
    window.__baghchehNative = function (id, status, text) {
      var cb = waiting[id];
      delete waiting[id];
      if (cb) cb(status, text);
    };
  }

  // Resolves to {status, data}; status 0 means the hub could not be reached.
  function request(method, path, body, host) {
    var json = body ? JSON.stringify(body) : "";
    function parse(status, text) {
      var data = null;
      try { data = text ? JSON.parse(text) : null; } catch (e) { /* not json */ }
      return { status: status, data: data };
    }
    if (native) {
      host = host || pairing().host;
      if (!host) return Promise.resolve({ status: 0, data: null });
      return new Promise(function (resolve) {
        var id = ++calls;
        waiting[id] = function (status, text) { resolve(parse(status, text)); };
        native.request(id, method, "http://" + host + path, token() || "", json);
      });
    }
    var opts = { method: method, cache: "no-store", headers: { "Content-Type": "application/json" } };
    if (token()) opts.headers["X-Baghcheh-Token"] = token();
    if (body) opts.body = json;
    var timer, timeout = new Promise(function (resolve) { timer = setTimeout(function () { resolve({ status: 0, data: null }); }, 8000); });
    return Promise.race([timeout, fetch(path, opts).then(function (res) {
      return res.text().then(function (t) { return parse(res.status, t); });
    }, function () { return { status: 0, data: null }; })]).then(function (r) { clearTimeout(timer); return r; });
  }

  // Same content regardless of key order, to skip sending what the hub already has.
  function stable(v) {
    if (Array.isArray(v)) return "[" + v.map(stable).join(",") + "]";
    if (v && typeof v === "object") return "{" + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ":" + stable(v[k]); }).join(",") + "}";
    return JSON.stringify(v);
  }
  function shared() {
    var s = B.load();
    return { profiles: s.profiles, deleted: s.deleted || {}, family: s.family || {} };
  }

  // ---- Syncing ----
  var quiet = false, running = null, again = false, knownRev = null;

  function saveQuietly() { quiet = true; try { B.save(); } finally { quiet = false; } }

  function busy() { return /^#\/(lesson|place|new)/.test(location.hash); }
  function refresh() {
    // Shows what other devices sent, unless a child is in the middle of a lesson.
    if (!busy()) window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function attempt(tries) {
    return request("GET", "/api/state").then(function (got) {
      if (got.status === 401 && !S.isHub) { setPairing(null); throw "unpaired"; }
      if (got.status !== 200 || !got.data) throw "offline";
      var hub = got.data;
      var r = B.merge(hub, true);
      if (r.changed) saveQuietly();
      knownRev = hub.rev;
      var mine = shared();
      if (stable(mine) === stable({ profiles: hub.profiles, deleted: hub.deleted, family: hub.family || {} })) return r;
      return request("PUT", "/api/state", { rev: hub.rev, profiles: mine.profiles, deleted: mine.deleted, family: mine.family }).then(function (put) {
        if (put.status === 409 && tries > 1) return attempt(tries - 1).then(function (r2) { r2.changed = r2.changed || r.changed; return r2; });
        if (put.status !== 200 || !put.data) throw "offline";
        knownRev = put.data.rev;
        return r;
      });
    });
  }

  // Resolves to the merge result; rejects with "offline" or "unpaired".
  S.now = function () {
    if (!S.paired()) return Promise.reject("unpaired");
    if (running) { again = true; return running; }
    running = attempt(4).then(function (r) {
      var p = pairing();
      if (!S.isHub) { p.last = Date.now(); setPairing(p); }
      // The hub keeps a daily backup, so a sync counts as a backup.
      quiet = true; try { B.markBackedUp(); } finally { quiet = false; }
      if (r.changed) refresh();
      return r;
    });
    running.then(done, done);
    function done() {
      running = null;
      if (again) { again = false; S.now().catch(function () {}); }
    }
    return running;
  };

  S.lastSync = function () { return pairing().last || null; };

  // Every save is sent soon after (the hub's own window right away, so it reaches the file).
  var timer = null;
  B.onSave = function () {
    if (quiet || !S.paired()) return;
    clearTimeout(timer);
    timer = setTimeout(function () { S.now().catch(function () {}); }, S.isHub ? 0 : 1500);
  };
  B.onEraseAll = function () { if (!S.isHub) setPairing(null); };

  // Picks up what other devices sent: the hub checks often (it is on the same computer), devices less often.
  function poll() {
    if (document.hidden || !S.paired() || running) return;
    if (knownRev === null) { S.now().catch(function () {}); return; }
    request("GET", "/api/state?rev=" + knownRev).then(function (got) {
      if (got.status === 200 && got.data && !got.data.same) S.now().catch(function () {});
    });
  }
  setInterval(poll, S.isHub ? 4000 : 30000);
  document.addEventListener("visibilitychange", poll);

  // The hub's window loads the file before the first screen is drawn, so a cleared browser
  // cache never shows an empty class even for a moment.
  if (S.isHub) {
    try {
      var x = new XMLHttpRequest();
      x.open("GET", "/api/state", false);
      x.setRequestHeader("X-Baghcheh-Token", hubToken);
      x.send();
      if (x.status === 200) {
        var hub = JSON.parse(x.responseText);
        B.merge(hub, true);
        knownRev = hub.rev;
        var s = B.load();
        s.lastBackup = Date.now();
        s.changesSinceBackup = 0;
        if (!s.current && s.profiles.length === 1) s.current = s.profiles[0].id;
        saveQuietly();
        if (stable(shared()) !== stable({ profiles: hub.profiles, deleted: hub.deleted, family: hub.family || {} })) S.now().catch(function () {});
      }
    } catch (e) { /* falls back to the browser's copy and keeps trying */ }
  } else {
    S.now().catch(function () {});
  }

  // ---- Screens ----
  function when(t) {
    var days = Math.floor((Date.now() - t) / 864e5);
    return days < 1 ? B.t("today") : B.t("daysAgo", { n: B.fa(days) });
  }
  function header(app, title) {
    app.appendChild(el("div", { class: "row" }, [
      el("a", { class: "btn quiet", href: B.currentProfile() ? "#/parent" : "#/", text: B.t("back") }),
      el("h1", { style: "margin:0", text: title })
    ]));
  }
  function latin(s) {
    return String(s).replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 0x6f0; })
      .replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x660; });
  }

  // #/sync on the hub's own window: how to connect other devices, and the daily backups.
  function viewHub(app) {
    header(app, B.t("syncTitle"));
    var box = el("div");
    app.appendChild(el("div", { class: "prose" }, [el("p", { text: B.t("hubIntro") })]));
    app.appendChild(box);
    var shown = location.hash;

    function draw(info) {
      if (location.hash !== shown) return;
      box.innerHTML = "";
      if (!info.addresses.length) {
        box.appendChild(el("p", { class: "note warn", text: B.t("hubNoNetwork") }));
      } else {
        var steps = el("div", { class: "card hub-pair" }, [
          el("h2", { style: "margin-top:0", text: B.t("hubPairTitle") }),
          el("p", { text: B.t("hubStep1") }),
          el("p", { text: B.t("hubStep2") }),
          el("p", { class: "hub-address", dir: "ltr", text: "http://" + info.addresses[0] }),
          info.addresses.length > 1 ? el("p", { class: "hint", dir: "ltr", text: info.addresses.slice(1).map(function (a) { return "http://" + a; }).join("  ·  ") }) : null,
          el("p", { text: B.t("hubStep3") })
        ]);
        if (info.code) {
          var qr = el("div", { class: "hub-qr", role: "img", "aria-label": B.t("hubQrLabel") });
          qr.innerHTML = info.qr;
          steps.appendChild(el("div", { class: "hub-code-row" }, [
            el("p", { class: "hub-code", dir: "ltr", text: B.fa(info.code) }),
            qr
          ]));
          steps.appendChild(el("p", { class: "hint", text: B.t("hubCodeExpiry") }));
        }
        steps.appendChild(el("button", { class: info.code ? "btn secondary" : "btn", type: "button", text: info.code ? B.t("hubNewCode") : B.t("hubShowCode"), onclick: function () {
          hubCall("POST", "/api/hub/code").then(load);
        } }));
        steps.appendChild(el("p", { class: "hint", text: B.t("hubAndroid") }));
        steps.appendChild(el("p", { class: "hint", text: B.t("hubKeepOpen") }));
        box.appendChild(steps);
      }
      box.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
        el("h2", { style: "margin-top:0", text: B.t("hubDevicesTitle") }),
        el("p", { text: info.devices ? B.t("hubDevices", { n: B.fa(info.devices) }) : B.t("hubNoDevices") }),
        info.devices ? el("button", { class: "btn quiet", type: "button", text: B.t("hubForget"), onclick: function () {
          if (!confirm(B.t("hubForgetConfirm"))) return;
          hubCall("POST", "/api/hub/forget").then(load);
        } }) : null
      ]));
      box.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
        el("h2", { style: "margin-top:0", text: B.t("hubBackupsTitle") }),
        el("p", { text: B.t("hubBackupsText") }),
        el("p", { class: "hint", dir: "ltr", style: "text-align:left;word-break:break-all", text: info.backupsDir }),
        el("p", { class: "hint", text: info.lastBackup ? B.t("hubBackupsCount", { n: B.fa(info.backups) }) : B.t("hubBackupsNone") }),
        el("button", { class: "btn secondary", type: "button", text: B.t("hubBackupsOpen"), onclick: function () { hubCall("POST", "/api/hub/open-backups"); } })
      ]));
    }
    function hubCall(method, path) { return request(method, path); }
    function load() {
      return request("GET", "/api/hub/info").then(function (got) {
        if (got.status === 200 && got.data) draw(got.data);
      });
    }
    load();
    // The code expires and devices come and go, so keep the screen current while it is open.
    var tick = setInterval(function () { if (location.hash !== shown) clearInterval(tick); else load(); }, 5000);
  }

  // #/sync on other devices: pair with the code, then the sync button.
  function viewDevice(app, prefill) {
    header(app, B.t("syncTitle"));
    var msg = el("p", { class: "feedback", "aria-live": "polite" });
    function say(text, good) { msg.className = "feedback " + (good ? "good" : "try"); msg.textContent = text; }

    if (S.paired()) {
      var last = el("p", { class: "hint", text: S.lastSync() ? B.t("syncLast", { when: when(S.lastSync()) }) : B.t("syncNever") });
      var button = el("button", { class: "btn big-sync", type: "button", text: B.t("syncNow"), onclick: function () {
        button.disabled = true;
        say(B.t("syncing"), true);
        S.now().then(function () {
          say(B.t("syncDone"), true);
          last.textContent = B.t("syncLast", { when: when(S.lastSync()) });
        }, function (why) {
          if (why === "unpaired") { say(B.t("syncUnpaired"), false); setTimeout(function () { viewDeviceAgain(); }, 2500); }
          else say(B.t("syncFailed"), false);
        }).then(function () { button.disabled = false; });
      } });
      app.appendChild(el("div", { class: "card", style: "margin:14px 0;text-align:center" }, [
        el("p", { text: B.t("syncPaired") }),
        button,
        msg,
        last,
        el("p", { class: "hint", text: B.t("syncAutoHint") })
      ]));
      app.appendChild(el("p", null, [el("button", { class: "btn quiet", type: "button", text: B.t("syncForget"), onclick: function () {
        if (!confirm(B.t("syncForgetConfirm"))) return;
        setPairing(null);
        viewDeviceAgain();
      } })]));
      return;
    }

    var host = native ? el("input", { type: "text", dir: "ltr", inputmode: "url", placeholder: "192.168.1.5:8765", "aria-label": B.t("pairHostLabel"), value: pairing().host || "" }) : null;
    var code = el("input", { type: "text", dir: "ltr", inputmode: "numeric", maxlength: "4", autocomplete: "off", "aria-label": B.t("pairCodeLabel"),
      class: "pair-code", value: prefill || "" });
    var go = el("button", { class: "btn", type: "button", text: B.t("pairButton"), onclick: pair });
    code.addEventListener("keydown", function (e) { if (e.key === "Enter") pair(); });
    function pair() {
      var digits = latin(code.value).replace(/\D/g, "");
      var where = host ? latin(host.value).trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "") : null;
      if (host && !where) return say(B.t("pairNeedHost"), false);
      if (digits.length !== 4) return say(B.t("pairNeedCode"), false);
      go.disabled = true;
      request("POST", "/api/pair", { code: digits }, where).then(function (got) {
        go.disabled = false;
        if (got.status === 200 && got.data && got.data.token) {
          setPairing({ token: got.data.token, host: where || undefined });
          say(B.t("pairDone"), true);
          return S.now().then(function () { setTimeout(viewDeviceAgain, 1200); }, function () { say(B.t("syncFailed"), false); });
        }
        if (got.status === 403) say(B.t("pairWrong"), false);
        else if (got.status === 410) say(B.t("pairExpired"), false);
        else say(B.t("syncFailed"), false);
      });
    }
    app.appendChild(el("div", { class: "prose" }, [el("p", { text: native ? B.t("pairIntroApp") : B.t("pairIntro") })]));
    app.appendChild(el("div", { class: "card", style: "margin:14px 0" }, [
      host ? el("h2", { style: "margin-top:0", text: B.t("pairHostLabel") }) : null,
      host,
      host ? el("p", { class: "hint", text: B.t("pairHostHint") }) : null,
      el("h2", { style: host ? "" : "margin-top:0", text: B.t("pairCodeLabel") }),
      code,
      el("div", { class: "row", style: "margin-top:14px" }, [go]),
      msg
    ]));
    if (prefill && !native) pair();
  }
  function viewDeviceAgain() {
    if (!/^#\/(sync|pair)/.test(location.hash)) return;
    if (location.hash === "#/sync") window.dispatchEvent(new HashChangeEvent("hashchange"));
    else location.hash = "#/sync";
  }

  S.view = function (app, prefill) {
    if (S.isHub) viewHub(app);
    else viewDevice(app, prefill);
  };
})();
