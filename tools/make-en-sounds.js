/* باغچه — makes the everyday sounds of the English course's sound-play lessons (english-seed-13, english-seed-18):
   a knock on the door, rain, a bell (loud and quiet), a clock, a car horn, and claps (slow, fast, two, three and
   four). Every sound is synthesised here from sine waves and noise, so it is our own and free to share; nothing is
   recorded or downloaded. Run once (node + lame): node tools/make-en-sounds.js. Writes audio/en/sounds/*.mp3. */
var fs = require("fs"), path = require("path"), cp = require("child_process");

var RATE = 22050, OUT = path.join(__dirname, "..", "audio", "en", "sounds");
fs.mkdirSync(OUT, { recursive: true });

// A seeded random, so the files come out the same every time.
var seed = 7;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647 * 2 - 1; }

function buffer(sec) { return new Float32Array(Math.round(sec * RATE)); }
function add(buf, at, sec, fn) {
  var s0 = Math.round(at * RATE), n = Math.round(sec * RATE);
  for (var i = 0; i < n && s0 + i < buf.length; i++) buf[s0 + i] += fn(i / RATE);
}
var TAU = 2 * Math.PI;

function knock(buf, at) {
  var lp = 0;
  add(buf, at, 0.18, function (t) {
    lp += (rnd() - lp) * 0.08;
    return (Math.sin(TAU * 140 * t) * 0.7 + lp * 1.6) * Math.exp(-t * 32);
  });
}
function bell(buf, at, gain) {
  add(buf, at, 2.2, function (t) {
    var e = Math.exp(-t * 2.2) * Math.min(1, t * 400);
    return gain * e * (Math.sin(TAU * 880 * t) * 0.5 + Math.sin(TAU * 1760 * t) * 0.22 + Math.sin(TAU * 2640 * t) * 0.12 + Math.sin(TAU * 1318 * t) * 0.16);
  });
}
function tick(buf, at, f) {
  add(buf, at, 0.05, function (t) { return (Math.sin(TAU * f * t) * 0.6 + rnd() * 0.3) * Math.exp(-t * 120); });
}
function horn(buf, at, sec) {
  add(buf, at, sec, function (t) {
    var env = Math.min(1, t * 60) * Math.min(1, (sec - t) * 60);
    var sq = function (f) { return Math.sin(TAU * f * t) > 0 ? 1 : -1; };
    return env * 0.18 * (sq(400) + sq(500));
  });
}
function clap(buf, at) {
  var hp = 0, prev = 0;
  add(buf, at, 0.16, function (t) {
    var n = rnd();
    hp = 0.6 * (hp + n - prev); prev = n;
    // A clap is a few quick bursts of noise close together.
    var bursts = Math.exp(-t * 40) * (t < 0.03 ? 0.6 + 0.4 * Math.sin(TAU * 110 * t) : 1);
    return hp * bursts * 1.4;
  });
}
function rain(buf) {
  var lp = 0, len = buf.length / RATE;
  add(buf, 0, len, function (t) {
    lp += (rnd() - lp) * 0.25;
    var env = Math.min(1, t / 0.6) * Math.min(1, (len - t) / 0.6);
    return lp * 0.35 * env;
  });
  // Drops: tiny high clicks here and there.
  for (var i = 0; i < 70; i++) {
    var at = 0.2 + Math.abs(rnd()) * (len - 0.5), f = 2500 + Math.abs(rnd()) * 2500;
    add(buf, at, 0.03, function (t) { return Math.sin(TAU * f * t) * 0.25 * Math.exp(-t * 160); });
  }
}

function write(name, buf) {
  var peak = buf.reduce(function (m, v) { return Math.max(m, Math.abs(v)); }, 0) || 1;
  var norm = peak > 0.95 ? 0.95 / peak : 1;
  var data = Buffer.alloc(buf.length * 2);
  for (var i = 0; i < buf.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i] * norm)) * 32767), i * 2);
  var head = Buffer.alloc(44);
  head.write("RIFF", 0); head.writeUInt32LE(36 + data.length, 4); head.write("WAVE", 8); head.write("fmt ", 12);
  head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22); head.writeUInt32LE(RATE, 24);
  head.writeUInt32LE(RATE * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34); head.write("data", 36); head.writeUInt32LE(data.length, 40);
  var wav = path.join(OUT, name + ".wav");
  fs.writeFileSync(wav, Buffer.concat([head, data]));
  cp.execFileSync("lame", ["--quiet", "-m", "m", "-b", "48", wav, path.join(OUT, name + ".mp3")]);
  fs.unlinkSync(wav);
}

var b;
b = buffer(1.6); [0.1, 0.32, 0.54, 1.0, 1.22].forEach(function (t) { knock(b, t); }); write("knock", b);
b = buffer(3); rain(b); write("rain", b);
// The quiet bell keeps its quietness: it is not normalised up (write only scales down).
b = buffer(2.4); bell(b, 0.05, 0.9); write("bell-loud", b);
b = buffer(2.4); bell(b, 0.05, 0.12); write("bell-quiet", b);
b = buffer(3); [0, 1, 2, 3, 4, 5].forEach(function (k) { tick(b, 0.1 + k * 0.48, k % 2 ? 1500 : 2100); }); write("clock", b);
b = buffer(1.3); horn(b, 0.05, 0.32); horn(b, 0.6, 0.45); write("horn", b);
b = buffer(3.4); [0, 1, 2].forEach(function (k) { clap(b, 0.1 + k * 1.1); }); write("claps-slow", b);
b = buffer(2.4); [0, 1, 2, 3, 4, 5, 6, 7].forEach(function (k) { clap(b, 0.1 + k * 0.26); }); write("claps-fast", b);
b = buffer(1.6); [0, 1].forEach(function (k) { clap(b, 0.1 + k * 0.6); }); write("claps-2", b);
b = buffer(2.2); [0, 1, 2].forEach(function (k) { clap(b, 0.1 + k * 0.6); }); write("claps-3", b);
b = buffer(2.8); [0, 1, 2, 3].forEach(function (k) { clap(b, 0.1 + k * 0.6); }); write("claps-4", b);
// A rhythm to copy: clap, clap, clap-clap, clap (long, long, short-short, long).
b = buffer(2.6); [0, 0.6, 1.2, 1.5, 2.1].forEach(function (t) { clap(b, 0.1 + t); }); write("claps-rhythm", b);
console.log("Wrote " + fs.readdirSync(OUT).join(", "));
