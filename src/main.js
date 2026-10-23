// Boot + main loop. Fixed 60 Hz simulation with speed, pause and frame-step controls.
// Test hooks are exposed on window.game (used by the testing modal and tests/smoke.mjs).
import { loadJSON, Sprites } from './engine/assets.js';
import { Input } from './engine/input.js';
import { UI } from './engine/ui.js';
import { Rng } from './engine/util.js';
import { TestRoomScene, SandboxScene } from './game/scenes.js';
import { ChapterScene, newChapter } from './game/chapter.js';
import { ToyFightScene } from './game/side.js';
import { daylight } from './game/lighting.js';
import { DevTools } from './debug/devtools.js';
import { PauseMenu } from './game/menu.js';
import { drawOverlays } from './debug/overlays.js';

const STEP = 1 / 60;
const params = new URLSearchParams(location.search);
const num = (k, d) => (params.has(k) && params.get(k) !== '' && !isNaN(+params.get(k)) ? +params.get(k) : d);

const game = {
  ready: false,
  params,
  errors: [],
  speed: num('speed', 1),
  paused: params.get('pause') === '1',
  stepRequests: 0,
  cheats: { god: false, infinite: false },
  overlays: Object.fromEntries((params.get('overlays') || '').split(',').filter(Boolean).map((k) => [k, true])),
  fps: 0,
  steps: 0,
};
window.game = game;
window.addEventListener('error', (e) => game.errors.push(String(e.message)));

async function boot() {
  game.config = await loadJSON('config.json', {});
  game.texts = await loadJSON('texts.json', {});
  game.levels = { twins: await loadJSON('levels/twins.json', null) };
  game.sprites = await Sprites.load('assets/sprites/', { noArt: params.get('noart') === '1' });
  game.seed = num('seed', Math.floor(Math.random() * 1e9));
  game.rng = new Rng(game.seed);
  game.clock = { hour: num('time', game.config.time.startHour), day: 0, frozen: params.get('freeze') === '1' };
  if (params.has('daylength')) game.config.time.dayLengthSeconds = num('daylength', 240);

  game.canvas = document.getElementById('game');
  game.ctx = game.canvas.getContext('2d');
  game.ctx.imageSmoothingEnabled = false;
  game.input = new Input();
  game.ui = new UI(document.getElementById('ui'), game);
  game.devtools = new DevTools(game);
  game.menu = new PauseMenu(game);
  game.input.blocked = () => game.devtools.typing();
  game.input.menuActive = () => game.menu.open;
  game.input.onGlobal = onGlobalKey;

  window.addEventListener('resize', resize);
  resize();
  switchScene(params.get('scene') || 'testroom', {
    intro: params.get('intro') !== '0',
    sheet: params.get('sheet'),
    step: params.get('step'),
    room: params.get('room'),
    phase: params.get('phase'),
    hp: params.get('hp'),
  });
  if (params.has('x')) game.scene.liam.x = num('x', 0);
  if (params.has('y')) game.scene.liam.y = num('y', 0);
  if (params.has('curtain') && game.scene.room?.props) game.scene.room.curtain = params.get('curtain');
  if (params.get('bat') === '1') game.scene.liam.setBat();
  if (params.get('tools') === '1') game.devtools.toggle(true);
  game.ready = true;
  last = performance.now();
  requestAnimationFrame(frame);
}

function resize() {
  const W = window.innerWidth, H = window.innerHeight;
  const k = Math.max(1, Math.floor(Math.min(W / 640, H / 360)));
  const offX = Math.floor((W - 640 * k) / 2), offY = Math.floor((H - 360 * k) / 2);
  Object.assign(game.canvas.style, { width: `${640 * k}px`, height: `${360 * k}px`, left: `${offX}px`, top: `${offY}px` });
  game.view = { k, offX, offY };
  game.ui.resize(k, offX, offY, W, H);
}

// ---------------------------------------------------------------- scenes
export function switchScene(name, opts = {}) {
  // the chapter's fight beat is its own (side-view) scene
  if (name === 'twins' && opts.step === 'fight') { game.chapter = newChapter('fight'); name = 'toyfight'; }
  if (name === 'toyfight' && !game.chapter) game.chapter = newChapter('fight');
  const make = { sandbox: SandboxScene, twins: ChapterScene, toyfight: ToyFightScene }[name] || TestRoomScene;
  game.scene = new make(game, opts);
  game.ui.messages = [];
  if (opts.restore) game.scene.restore(opts.restore);
  game.devtools.refresh();
}
game.switchScene = switchScene;

function onGlobalKey(a) {
  const s = game.scene;
  if (a === 'menu') game.menu.escape();
  else if (a.startsWith('menu:')) game.menu.key(a);
  else if (a === 'devtools') game.devtools.toggle();
  else if (a === 'step') { if (game.paused) game.stepRequests++; }
  else if (a === 'viewer' && s.viewer) { s.viewer.on = !s.viewer.on; }
  else if (a === 'pagePrev' && s.viewer) s.page(-1);
  else if (a === 'pageNext' && s.viewer) s.page(1);
}

// ---------------------------------------------------------------- loop
function step() {
  game.input.beginStep();
  const c = game.clock;
  if (!c.frozen) {
    c.hour += (STEP * 24) / game.config.time.dayLengthSeconds;
    if (c.hour >= 24) { c.hour -= 24; c.day++; }
  }
  game.scene.update(STEP);
  game.ui.update(STEP);
  game.playTime = (game.playTime || 0) + STEP;
  game.steps++;
}

// advance n steps synchronously (tests, frame stepping)
game.advance = (n = 1) => { for (let i = 0; i < n; i++) step(); render(); };

function render() {
  const ctx = game.ctx;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  game.scene.draw(ctx);
  drawOverlays(ctx, game);
  const ui = game.ui;
  ui.begin();
  game.scene.drawUI(ui);
  ui.drawDialogue();
  drawOverlays.ui(ui, game);
  if (!game.menu.open && (game.playTime || 0) < (game.config.ui?.startHintSeconds ?? 6)) {
    const hint = game.texts.hint?.start || 'Esc: menu';
    ui.font(10);
    const w = Math.ceil(ui.ctx.measureText(hint).width) + 12;
    ui.panel(640 - w - 8, 8, w, 16);
    ui.text(hint, 640 - w - 2, 11, { size: 10, outline: false });
  }
  game.menu.draw(ui);
}

let last = 0, acc = 0, fpsT = 0, fpsN = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  fpsT += dt; fpsN++;
  if (fpsT >= 0.5) { game.fps = Math.round(fpsN / fpsT); fpsT = 0; fpsN = 0; }
  try {
    if (game.menu.open) {
      acc = 0; // the pause menu freezes everything
    } else if (!game.paused) {
      acc += dt * game.speed;
      let n = 0;
      while (acc >= STEP && n < 20) { step(); acc -= STEP; n++; }
    } else {
      while (game.stepRequests > 0) { step(); game.stepRequests--; }
      acc = 0;
    }
    render();
  } catch (e) {
    console.error(e);
    game.errors.push(String(e && e.stack || e));
  }
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- save states / config
game.snapshot = () => ({
  version: 1,
  scene: game.scene.name,
  seed: game.seed,
  rng: game.rng.state,
  clock: { ...game.clock },
  speed: game.speed,
  cheats: { ...game.cheats },
  sceneState: game.scene.serialize(),
});

game.restore = (snap) => {
  game.seed = snap.seed;
  game.rng = new Rng(snap.seed);
  game.rng.state = snap.rng;
  game.clock = { ...snap.clock };
  game.speed = snap.speed ?? 1;
  game.cheats = { ...snap.cheats };
  switchScene(snap.scene, { intro: false, restore: snap.sceneState });
};

game.reloadConfig = async () => {
  const c = await loadJSON('config.json', null);
  if (!c) return false;
  game.config = c;
  game.devtools.refresh();
  return true;
};

game.setSeed = (seed) => {
  game.seed = seed >>> 0;
  game.rng = new Rng(game.seed);
  switchScene(game.scene.name, { intro: false });
};

game.state = () => {
  const s = game.scene, l = s.liam, r = s.room || {};
  return {
    scene: s.name, x: l.x, y: l.y, dir: l.dir, mode: l.mode, anim: `${l.anim.sheet}:${l.anim.name}`, form: l.form, panicLeft: l.panicLeft,
    inSun: l.inSun, speedNow: l.speedNow, hour: game.clock.hour, day: game.clock.day,
    daylight: daylight(game.clock.hour, game.config.time), darkness: s.lighting ? s.lighting.lastDarkness : 0,
    curtain: r.curtain, door: r.door?.state, lights: s.allLights().length, intro: !!s.intro,
    speaking: game.ui.speaking, message: game.ui.messages[0]?.text || null, entities: s.entities.length,
    ambrose: s.ambrose ? { x: s.ambrose.x, y: s.ambrose.y, dir: s.ambrose.dir, task: s.ambrose.task?.type || null, alpha: s.ambrose.alpha, hidden: s.ambrose.hidden, anim: `${s.ambrose.anim.sheet}:${s.ambrose.anim.name}`, talking: s.ambrose.talking > 0 } : null,
    plates: r.plates, clockStopped: r.clockStopped, speaker: game.ui.messages[0]?.speaker || null, queued: game.ui.messages.length,
    paused: game.paused, menu: game.menu.open ? game.menu.view : null, menuIndex: game.menu.index, speed: game.speed, steps: game.steps, viewer: s.viewer ? { ...s.viewer } : null,
    chapter: game.chapter ? { step: game.chapter.step, found: { ...game.chapter.found }, fright: game.chapter.fright, batAtWill: game.chapter.batAtWill, memento: game.chapter.memento } : null,
    room: s.isChapter ? s.room.id : null, script: s.script?.name || null, hidden: !!s.liamHidden, fade: s.fadeAlpha ?? 0,
    twins: s.isChapter ? Object.fromEntries(Object.entries(s.twins).map(([k, t]) => [k, { x: t.x, y: t.y, visible: t.visible && t.alpha > 0.05, anim: `${t.anim.sheet}:${t.anim.name}` }])) : null,
    fight: s.isSide ? { phase: s.phase, wave: s.wave, hp: l.hp, liamState: l.state, onGround: l.onGround, enemies: s.enemies.filter((e) => e.alive).map((e) => ({ type: e.type, x: e.x, y: e.y, state: e.state, hp: e.hp })), tagged: s.twins.filter((t) => t.tagged).length, shots: s.shots.length, cleared: s.cleared } : null,
  };
};

boot().catch((e) => { console.error(e); game.errors.push(String(e.stack || e)); });
