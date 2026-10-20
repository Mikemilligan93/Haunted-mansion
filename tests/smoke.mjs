// Automated smoke tests: the game starts, every scene loads, a scripted playthrough of the
// test room works, and nothing logs an error. Screenshots go to tests/screenshots/.
//
//   node tests/smoke.mjs            (needs Node 18+ and Playwright: npm i -g playwright && npx playwright install chromium)
//
// It starts its own small web server, so nothing else needs to be running.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOTS = path.join(ROOT, 'tests', 'screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

async function loadPlaywright() {
  try { return await import('playwright'); } catch { /* not local */ }
  const g = execSync('npm root -g').toString().trim();
  return import(path.join(g, 'playwright', 'index.mjs'));
}

// ---------------------------------------------------------------- tiny static server
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ttf': 'font/ttf' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  const f = p.endsWith('/') ? path.join(p, 'index.html') : p;
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}/`;

// ---------------------------------------------------------------- harness
const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
let failures = 0, passes = 0;
const check = (ok, name, info = '') => {
  if (ok) { passes++; console.log(`  ok   ${name}`); } else { failures++; console.log(`  FAIL ${name} ${info}`); }
};

async function open(query) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.problems = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.problems.push(m.text()); });
  page.on('response', (r) => { if (r.status() >= 400 && !/DotGothic16/.test(r.url())) page.problems.push(`${r.status()} ${r.url()}`); });
  page.on('pageerror', (e) => page.problems.push(e.message));
  await page.goto(`${BASE}?${query}`);
  await page.waitForFunction(() => window.game && window.game.ready, null, { timeout: 15000 });
  await page.evaluate(() => { game.paused = true; });
  return page;
}
const st = (page) => page.evaluate(() => game.state());
const adv = (page, n) => page.evaluate((k) => game.advance(k), n);
const hold = (page, key, n) => page.evaluate(([k, s]) => { game.input.hold(k, true); game.advance(s); game.input.hold(k, false); game.advance(1); }, [key, n]);
const holdState = (page, key, n) => page.evaluate(([k, s]) => { game.input.hold(k, true); game.advance(s); const r = game.state(); game.input.hold(k, false); return r; }, [key, n]);
const shot = (page, name) => page.screenshot({ path: path.join(SHOTS, `${name}.png`) });
const clean = async (page, name) => {
  const errs = await page.evaluate(() => game.errors);
  check(errs.length === 0 && page.problems.length === 0, `${name}: no errors`, JSON.stringify([...errs, ...page.problems]).slice(0, 400));
};

// ---------------------------------------------------------------- tests
console.log('Test room: intro');
let p = await open('debug=1&seed=42&time=11');
await adv(p, 30); await shot(p, '01_intro_door_opening');
await adv(p, 200);
let s = await st(p);
check(!s.intro && s.mode === 'free' && s.door === 'closed', 'intro finishes: door closed, Liam has control', JSON.stringify(s));
await shot(p, '02_after_intro');

console.log('Test room: movement');
const x0 = s.x, y0 = s.y;
await hold(p, 'right', 40); s = await st(p);
check(s.x > x0 + 30 && s.dir === 'right', 'walks right', `x ${x0} -> ${s.x}`);
await hold(p, 'down', 40); s = await st(p);
check(s.y > y0 + 30 && s.dir === 'down', 'walks down');
await hold(p, 'left', 20); s = await st(p);
check(s.dir === 'left', 'faces left');
await hold(p, 'up', 2000); s = await st(p);
check(s.y >= 116 + 6 && s.y < 130, 'cannot walk into the wall', `y ${s.y}`);

console.log('Test room: window and curtains');
await p.evaluate(() => { const r = game.scene.room; Object.assign(game.scene.liam, { x: r.windowX, y: r.floorTop + 12 }); });
await adv(p, 2);
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
check(s.curtain === 'half' && s.anim === 'liam_td_inspect:inspect' && /Half open/.test(s.message || ''), 'E on the window: inspect + curtains half + line', JSON.stringify(s));
await adv(p, 40); await shot(p, '03_curtains_half');
await p.evaluate(() => game.input.tap('interact')); await adv(p, 40);
s = await st(p);
check(s.curtain === 'closed', 'curtains close');
await p.evaluate(() => game.input.tap('interact')); await adv(p, 40);
check((await st(p)).curtain === 'open', 'curtains open again');

console.log('Test room: sunbeam');
await p.evaluate(() => { game.clock.hour = 12; game.ui.messages = []; game.scene.sunLineDay = -1; const r = game.scene.room; const q = r.sunPolys()[0]; Object.assign(game.scene.liam, { x: (q[0][0] + q[2][0]) / 2, y: (q[0][1] + q[2][1]) / 2 }); });
s = await holdState(p, 'right', 2);
const cfg = await p.evaluate(() => game.config);
check(s.inSun && Math.abs(s.speedNow - cfg.liam.walkSpeed * cfg.liam.sunSlowFactor) < 0.01, 'sunbeam slows Liam', JSON.stringify(s));
const sunLines = await p.evaluate(() => game.texts.sun.first);
check(sunLines.includes(s.message), 'grumpy sun line appears', s.message);
await adv(p, 10); await shot(p, '04_sunbeam_noon');
await p.evaluate(() => { game.scene.room.curtain = 'closed'; });
s = await holdState(p, 'right', 2);
check(!s.inSun && s.speedNow === cfg.liam.walkSpeed, 'closed curtains: no sun, normal speed');
await p.evaluate(() => { game.scene.room.curtain = 'open'; });

console.log('Test room: day and night');
await p.evaluate(() => { game.clock.hour = 19; game.ui.messages = []; }); await adv(p, 2);
s = await st(p);
check(s.daylight > 0 && s.daylight < 1 && s.lights === 3, 'dusk: half light, sconces + candelabra lit', JSON.stringify(s));
await shot(p, '05_dusk');
await p.evaluate(() => { game.clock.hour = 23.5; }); await adv(p, 2);
s = await st(p);
check(s.darkness > 0.6 && s.lights === 3, 'night: dark with two sconces and Ambrose\'s candelabra', `darkness ${s.darkness} lights ${s.lights}`);
await shot(p, '06_night');
await p.evaluate(() => { game.clock.hour = 23.99; game.clock.frozen = false; }); await adv(p, 60);
s = await st(p);
check(s.day === 1 && s.hour < 1, 'the clock rolls over to the next day');

console.log('Test room: fidget');
await p.evaluate(() => { game.clock.hour = 12; game.ui.messages = []; game.scene.liam.idleTime = 0; });
await adv(p, Math.ceil(cfg.liam.fidgetAfterSeconds * 60) + 5);
s = await st(p);
check(s.anim === 'liam_td_fidget:fidget', 'standing still long enough plays a fidget', s.anim);
await adv(p, 30); await shot(p, '07_fidget');

console.log('Testing tools');
await p.evaluate(() => { game.ui.messages = []; game.overlays.hitbox = game.overlays.ranges = game.overlays.values = game.overlays.fps = true; });
await adv(p, 2); await shot(p, '08_overlays');
const snap = await p.evaluate(() => { game.scene.spawn('candle', 300, 200); return game.snapshot(); });
await p.evaluate(() => { game.scene.liam.x = 50; game.clock.hour = 3; game.scene.entities = []; game.scene.room.curtain = 'closed'; });
await p.evaluate((sn) => game.restore(sn), snap); await adv(p, 1);
s = await st(p);
check(Math.abs(s.x - snap.sceneState.liam.x) < 0.01 && s.entities === 1 && s.curtain === snap.sceneState.room.curtain, 'save state restores position, entities and room');
check(await p.evaluate(() => game.reloadConfig()), 'config.json reloads live');
await p.keyboard.press('F1');
check(await p.evaluate(() => getComputedStyle(document.getElementById('devtools')).display === 'block'), 'F1 opens the testing modal');
await p.click('[data-id="speed-2"]'); check((await st(p)).speed === 2, 'speed buttons work');
await p.click('[data-id="speed-1"]');
await shot(p, '09_testing_modal');
await p.keyboard.press('F1');
console.log('Pause menu');
await p.evaluate(() => { game.ui.messages = []; Object.keys(game.overlays).forEach((k) => (game.overlays[k] = false)); });
await p.keyboard.press('Escape');
s = await st(p);
check(s.menu === 'main' && s.menuIndex === 0, 'Esc opens the pause menu');
await p.evaluate(() => { game.paused = false; });
const h0 = (await st(p)).hour; await p.waitForTimeout(400); const h1 = (await st(p)).hour;
await p.evaluate(() => { game.paused = true; });
check(h0 === h1, 'the game is frozen while the menu is open', `${h0} -> ${h1}`);
await adv(p, 1); await shot(p, '14_pause_menu');
await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter');
s = await st(p);
check(s.menu === 'controls', 'Controls shows the controls hint');
await adv(p, 1); await shot(p, '15_controls');
await p.keyboard.press('Escape');
check((await st(p)).menu === 'main', 'Esc goes back from Controls');
await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter');
s = await st(p);
const toolsOpen = await p.evaluate(() => getComputedStyle(document.getElementById('devtools')).display === 'block');
check(s.menu === null && toolsOpen, 'Testing tools opens the tools panel and closes the menu');
await adv(p, 1); await shot(p, '16_tools_from_menu');
await p.click('[data-id="close"]');
check(await p.evaluate(() => getComputedStyle(document.getElementById('devtools')).display === 'none'), 'tools panel closes');
await p.keyboard.press('KeyP');
check((await st(p)).menu === 'main', 'P opens the menu too');
await p.keyboard.press('KeyP');
check((await st(p)).menu === null, 'P closes it again');
const xBefore = (await st(p)).x;
await p.keyboard.press('Escape'); await p.keyboard.down('ArrowRight'); await adv(p, 20); await p.keyboard.up('ArrowRight');
check((await st(p)).x === xBefore, 'arrow keys move the menu cursor, not Liam');
await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown');
await p.keyboard.press('Enter'); await adv(p, 2);
s = await st(p);
check(s.menu === null && s.intro, 'Restart room replays the intro');
console.log('Bat form');
await p.evaluate(() => { game.ui.messages = []; game.scene.intro = null; const r = game.scene.room; Object.assign(game.scene.liam, { x: 320, y: 220, mode: 'free' }); });
await p.keyboard.press('F1');
await p.click('[data-id="bat-on"]');
s = await st(p);
check(s.form === 'transforming' && s.anim === 'liam_td_startle:startle', 'Turn into bat: startle first');
await adv(p, 30); s = await st(p);
check(s.anim === 'liam_bat_transform:transform', 'then the smoke puff', s.anim);
await adv(p, 30); s = await st(p);
check(s.form === 'bat' && s.anim === 'liam_bat_fly:fly', 'then he is a bat', JSON.stringify(s));
const bx = s.x;
s = await holdState(p, 'right', 30);
const bcfg = await p.evaluate(() => game.config.bat);
check(s.x > bx + 40 && Math.abs(s.speedNow - bcfg.speed) < 0.01 && s.dir === 'right', 'the bat flies with the arrow keys at bat speed', `x ${bx} -> ${s.x}, speed ${s.speedNow}`);
s = await holdState(p, 'up', 400);
check(s.y >= 116 + 6 && s.y < 130, 'the bat stays inside the room', `y ${s.y}`);
await p.evaluate(() => { game.scene.liam.y = 220; game.scene.room.curtain = 'open'; });
await p.evaluate(() => game.input.tap('interact')); await adv(p, 3);
check((await st(p)).form === 'bat', 'no interacting while a bat');
await adv(p, 5); await shot(p, '17_bat');
await p.click('[data-id="bat-off"]'); await adv(p, 60); s = await st(p);
check(s.form === 'human' && s.anim === 'liam_td_idle:idle', 'Turn back: human again');
await p.click('[data-id="bat-panic"]'); await adv(p, 70); s = await st(p);
check(s.form === 'bat' && s.panicLeft > 0, 'Panic bat: transforms and panics', JSON.stringify(s));
const pos = []; for (let i = 0; i < 6; i++) { await adv(p, 10); const q = await st(p); pos.push([q.x, q.y]); }
const moved = pos.some(([x, y], i) => i && Math.hypot(x - pos[i - 1][0], y - pos[i - 1][1]) > 5);
check(moved, 'panic flight moves on its own');
await shot(p, '18_bat_panic');
await adv(p, Math.ceil(bcfg.panicSeconds * 60) + 70); s = await st(p);
check(s.form === 'human', 'after the panic he turns back by himself', JSON.stringify(s));
const sn = await p.evaluate(() => { game.scene.liam.setBat(); return game.snapshot(); });
await p.evaluate((x) => { game.scene.liam.transform(false); game.advance(80); game.restore(x); }, sn);
check((await st(p)).form === 'bat', 'save states keep the bat form');
await p.keyboard.press('F1');
await p.evaluate(() => { game.scene.liam.transform(false); game.advance(80); });

console.log('Art pipeline');
const cut = await p.evaluate(() => {
  // the up-facing walk frames must have a rounded head, not a flat cut along the top
  const s = game.sprites.sheet('liam_td_walk'), img = game.sprites.images.liam_td_walk;
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const [fw, fh] = s.frame, widths = [];
  for (let col = 0; col < 6; col++) {
    const d = x.getImageData(col * fw, 2 * fh, fw, fh).data;
    for (let yy = 0; yy < fh; yy++) {
      let n = 0; for (let xx = 0; xx < fw; xx++) if (d[(yy * fw + xx) * 4 + 3]) n++;
      if (n) { widths.push(n); break; }
    }
  }
  return widths;
});
check(cut.every((w) => w <= 8), 'up-facing walk frames keep the top of the head', JSON.stringify(cut));
const floorA = await p.evaluate(() => JSON.stringify(game.scene.room.floor));
await clean(p, 'test room');
await p.close();

console.log('Ambrose');
p = await open('debug=1&seed=11&time=10&intro=0');
await p.evaluate(() => { game.ui.messages = []; });
s = await st(p);
check(!!s.ambrose && /ambrose_td_/.test(s.ambrose.anim), 'Ambrose is in the test room with his own sprites', JSON.stringify(s.ambrose));
const a0 = s.ambrose;
await adv(p, 600); s = await st(p);
check(Math.hypot(s.ambrose.x - a0.x, s.ambrose.y - a0.y) > 10, 'by day he walks his schedule', `${a0.x},${a0.y} -> ${s.ambrose.x},${s.ambrose.y}`);
// greeting bow
await p.evaluate(() => { const A = game.scene.ambrose; A.force('none'); A.greetCooldown = 0; A.x = 320; A.y = 200; Object.assign(game.scene.liam, { x: 380, y: 210 }); });
await adv(p, 2); await hold(p, 'left', 20); s = await st(p);
check(s.ambrose.anim === 'ambrose_td_bow:bow', 'he bows when Liam comes near', s.ambrose.anim);
await adv(p, 80);
// talking: the wrong-name gag
await p.evaluate(() => { game.ui.messages = []; const A = game.scene.ambrose; A.force('none'); A.x = 320; A.y = 200; Object.assign(game.scene.liam, { x: 350, y: 205, mode: 'free' }); });
await adv(p, 2);
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
const names = await p.evaluate(() => game.texts.ambrose.names);
check(s.speaker === 'ambrose' && s.queued === 3 && s.message.includes(names[0]), 'E talks to him: he calls Liam by an old master\'s name', JSON.stringify([s.speaker, s.queued, s.message]));
await adv(p, 2); await shot(p, '19_ambrose_talk');
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
check(s.speaker === 'liam' && s.queued === 2, 'E skips to the next line: Liam corrects him');
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
check(s.speaker === 'ambrose' && s.message.includes(names[0]), '...and he agrees, using the wrong name again', s.message);
await shot(p, '20_ambrose_wrong_name');
check((await st(p)).ambrose.talking, 'he stands still while talking');
await p.evaluate(() => { game.ui.messages = []; }); await adv(p, 2);
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
const T = await p.evaluate(() => game.texts.ambrose);
check(s.speaker === 'ambrose' && (T.smalltalk.includes(s.message)), 'second talk: small talk', s.message);
await p.evaluate(() => { game.ui.messages = []; }); await adv(p, 2);
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
check(s.message.includes(names[1]), 'third talk: an even older master\'s name', s.message);
await p.evaluate(() => { game.ui.messages = []; game.scene.liam.setBat(); game.scene.liam.x = 350; game.scene.liam.y = 205; game.scene.ambrose.talking = 0; }); await adv(p, 2);
await p.evaluate(() => game.input.tap('interact')); await adv(p, 2);
s = await st(p);
check(s.message === T.bat, 'to the bat: "Shall I open a window?"', s.message);
await p.evaluate(() => { game.ui.messages = []; game.scene.liam.transform(false); game.advance(80); });
// drift + fade
await p.evaluate(() => { game.scene.ambrose.talking = 0; game.scene.ambrose.force('drift'); });
await adv(p, 70); s = await st(p);
const fadeA = (await p.evaluate(() => game.config.ambrose.fadeAlpha));
check(Math.abs(s.ambrose.alpha - fadeA) < 0.01 && s.ambrose.anim === 'ambrose_td_drift:drift', 'drift: he fades while lost in thought', `alpha ${s.ambrose.alpha}`);
await shot(p, '21_ambrose_drift');
await adv(p, 200); s = await st(p);
check(s.ambrose.alpha === 1, 'and snaps back');
// furniture
await p.evaluate(() => { const t = game.scene.room.table; Object.assign(game.scene.liam, { x: t.x + 50, y: t.y - 6 }); });
await hold(p, 'left', 90); s = await st(p);
const tbl = await p.evaluate(() => game.scene.room.table);
check(s.x >= tbl.x + 32, 'Liam cannot walk through the table', `x ${s.x} table ${tbl.x}`);
// night rituals
await p.evaluate(() => { game.clock.hour = 21; game.clock.frozen = true; game.ui.messages = []; const A = game.scene.ambrose; A.force('none'); A.tasks = []; A.greetCooldown = 999; Object.assign(game.scene.liam, { x: 420, y: 300 }); });
const places = await p.evaluate(() => game.config.ambrose.tablePlaces);
let sawHidden = false, sawTable = false, sawClock = false;
for (let i = 0; i < 160; i++) {
  await adv(p, 30); s = await st(p);
  if (s.ambrose.anim === 'ambrose_td_settable:settable') sawTable = true;
  if (s.ambrose.anim === 'ambrose_td_windclock:windclock') sawClock = true;
  if (s.ambrose.hidden) sawHidden = true;
  if (i === 20) await shot(p, '22_ambrose_night_table');
  if (s.plates === places && s.clockStopped !== null && sawHidden && !s.ambrose.hidden) break;
}
check(sawTable && s.plates === places, `night: he sets all ${places} places`, `plates ${s.plates}`);
check(sawClock && s.clockStopped === 3, 'night: he winds the clock back to his hour', `clock ${s.clockStopped}`);
check(sawHidden, 'night: he walks through the wall and comes back');
await shot(p, '23_ambrose_night_done');
const snapA = await p.evaluate(() => game.snapshot());
await p.evaluate(() => { game.scene.room.resetNight(); });
await p.evaluate((x) => game.restore(x), snapA); s = await st(p);
check(s.plates === places && s.clockStopped === 3, 'save states keep the table and the clock');
await p.evaluate(() => { game.clock.hour = 9; }); await adv(p, 3); s = await st(p);
check(s.plates === 0 && s.clockStopped === null, 'dawn clears the table and restarts the clock');
// drifting is rare: at most one drift in two minutes of daytime
await p.evaluate(() => { game.clock.hour = 10; game.clock.frozen = true; game.ui.messages = []; const A = game.scene.ambrose; A.force('none'); A.tasks = []; A.driftCooldown = 0; A.greetCooldown = 999; Object.assign(game.scene.liam, { x: 600, y: 320 }); });
let drifts = 0, wasDrift = false;
for (let i = 0; i < 240; i++) {
  await adv(p, 30);
  const d = (await st(p)).ambrose.task === 'drift';
  if (d && !wasDrift) drifts++;
  wasDrift = d;
}
check(drifts <= 1, 'drifting is rare (at most once in two minutes)', `drifts ${drifts}`);
// the clock case must be identical in every frame; only the pendulum window may change
const clockDiff = await p.evaluate(() => {
  const s = game.sprites.sheet('prop_clock'), img = game.sprites.images.prop_clock;
  if (!img) return 'no image';
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const [fw, fh] = s.frame, f = [0, 1, 2].map((i) => x.getImageData(i * fw, 0, fw, fh).data);
  let outside = 0, inside = 0;
  for (let k = 0; k < fw * fh; k++) {
    const same = [0, 1, 2, 3].every((ch) => f[0][k * 4 + ch] === f[1][k * 4 + ch] && f[2][k * 4 + ch] === f[1][k * 4 + ch]);
    const yy = Math.floor(k / fw);
    if (!same) { if (yy > fh * 0.3 && yy < fh * 0.8) inside++; else outside++; }
  }
  return { outside, inside };
});
check(clockDiff.outside === 0 && clockDiff.inside > 0, 'the clock case stays still; only the pendulum moves', JSON.stringify(clockDiff));
await clean(p, 'ambrose');
await p.close();

console.log('Fixed seed');
p = await open('debug=1&seed=42&intro=0');
check(floorA === await p.evaluate(() => JSON.stringify(game.scene.room.floor)), 'same seed gives the same room');
await clean(p, 'seed');
await p.close();

console.log('Sandbox');
p = await open('debug=1&scene=sandbox&seed=3&time=12');
await adv(p, 5); await shot(p, '10_sandbox');
for (const t of ['candle', 'liamDummy', 'ambrose']) await p.evaluate((k) => game.scene.spawn(k, 200 + Math.random() * 200, 220), t);
await adv(p, 10); s = await st(p);
check(s.entities === 3, 'spawns candle, Liam dummy and Ambrose fallback');
await p.evaluate(() => { game.clock.hour = 23; game.ui.messages = []; }); await adv(p, 2); await shot(p, '11_sandbox_spawned_night');
await p.evaluate(() => { game.scene.viewer.on = true; });
const pages = await p.evaluate(() => game.scene.pages());
for (let i = 0; i < pages.length; i++) {
  await p.evaluate((k) => { game.scene.viewer.page = k; game.scene.viewer.t = 0; }, i);
  await adv(p, 20);
  if (['liam_td_walk', 'tiles_floor_oak', 'liam_portraits', 'prop_window_sash'].includes(pages[i])) await shot(p, `12_viewer_${pages[i]}`);
}
check(pages.length >= 20, `animation viewer pages through all ${pages.length} sheets`);
await clean(p, 'sandbox');
await p.close();

console.log('Fallback art (no images at all)');
p = await open('debug=1&noart=1&seed=1&time=12');
await adv(p, 260); await shot(p, '13_fallback_art');
s = await st(p);
check(!s.intro && s.mode === 'free', 'game runs without any art');
await clean(p, 'fallback');
await p.close();

await browser.close();
server.close();
console.log(`\n${passes} passed, ${failures} failed. Screenshots: tests/screenshots/`);
process.exit(failures ? 1 : 0);
