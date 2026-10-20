#!/usr/bin/env node
// Records the recess games' lines (games/shared/lines.js) that have no recording yet, with ElevenLabs,
// in the same voice as the others (Matilda, eleven_v4). Saves audio/games/<key>.mp3 and writes the
// recording's version (a short hash of model, voice and text) into lines.js.
//
//   node tools/record-game-voice.mjs             record every line whose version is empty or no longer matches its text
//   node tools/record-game-voice.mjs --dry-run   show which lines and how many characters, record nothing
//
// To re-record a line after changing its text, just change the text: its version no longer matches.
// Needs ELEVENLABS_API_KEY (in the environment or in .env at the project root, not committed) and
// ffmpeg (brew install ffmpeg). Then bump VERSION in sw.js.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LINES_FILE = path.join(ROOT, 'games', 'shared', 'lines.js');
const OUT = path.join(ROOT, 'audio', 'games');
const MODEL = 'eleven_v4';
const VOICE = { name: 'Matilda', id: 'XrExE9yKIg1WjnnlVkGX' };
const dryRun = process.argv.includes('--dry-run');

const hashOf = text => createHash('sha1').update(`${MODEL}\n${VOICE.id}\n${text}`).digest('hex').slice(0, 10);

const sandbox = { self: {} };
vm.runInNewContext(fs.readFileSync(LINES_FILE, 'utf8'), sandbox);
const LINES = sandbox.self.VOICE_LINES;

const todo = Object.entries(LINES)
  .filter(([key, [text, version]]) => version !== hashOf(text) || !fs.existsSync(path.join(OUT, key + '.mp3')))
  .map(([key, [text]]) => ({ key, text, hash: hashOf(text) }));
const chars = todo.reduce((n, t) => n + t.text.length, 0);

console.log(`To record: ${todo.length} line(s), ${chars} characters (${VOICE.name}, ${MODEL}).`);
for (const t of todo) console.log(`  ${t.key.padEnd(16)} ${t.text.length.toString().padStart(3)}  ${t.text}`);
if (!todo.length) process.exit(0);

let KEY = process.env.ELEVENLABS_API_KEY;
try { KEY = KEY || fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/^ELEVENLABS_API_KEY=(.+)$/m)?.[1].trim(); } catch {}
if (!KEY) { if (dryRun) process.exit(0); console.error('✗ No ELEVENLABS_API_KEY (environment or .env)'); process.exit(1); }

async function api(p, init = {}) {
  const res = await fetch('https://api.elevenlabs.io' + p, { ...init, headers: { 'xi-api-key': KEY, ...init.headers } });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
  return res;
}

try {
  const sub = await (await api('/v1/user/subscription')).json();
  console.log(`Quota left: ${sub.character_limit - sub.character_count} characters.`);
} catch (e) { console.log(`(could not read the quota: ${e.message})`); }
if (dryRun) process.exit(0);

// write each finished line's version straight into lines.js, so an interrupted run keeps what it made
function saveVersion(key, hash) {
  const src = fs.readFileSync(LINES_FILE, 'utf8');
  const re = new RegExp(`^(\\s*${JSON.stringify(key).replace(/[.]/g, '\\.')}: \\[.*, )"[^"]*"(\\],?)$`, 'm');
  if (!re.test(src)) throw new Error(`could not find ${key} in lines.js`);
  fs.writeFileSync(LINES_FILE, src.replace(re, `$1"${hash}"$2`));
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'baghcheh-voice-'));
let made = 0;
for (const t of todo) {
  try {
    const res = await api(`/v1/text-to-speech/${VOICE.id}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: t.text, model_id: MODEL, language_code: 'fa' }),
    });
    const raw = path.join(tmp, t.key + '.mp3');
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
    // trim silence at both ends, mono, small mp3 (as the other clips)
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw,
      '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.08',
      '-ac', '1', '-ar', '44100', '-b:a', '64k', path.join(OUT, t.key + '.mp3')]);
    saveVersion(t.key, t.hash);
    made++;
    console.log(`  ✓ ${t.key}`);
  } catch (e) {
    console.error(`  ✗ ${t.key}: ${e.message}`);
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${made} of ${todo.length} recorded.` + (made ? ' Bump VERSION in sw.js.' : ''));
