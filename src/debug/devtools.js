// The testing tools panel: opened from the pause menu (Esc > Testing tools) or with F1 / `. Always available.
// Cheats, speed, pause/step, time of day, spawning, overlays, live config reload,
// save states, seed and a copyable test link.
import { SPAWNABLE } from '../game/scenes.js';
import { STEPS } from '../game/chapter.js';

const STORE = 'hm-savestate-';

export class DevTools {
  constructor(game) {
    this.game = game;
    this.el = document.getElementById('devtools');
    this.open = false;
    this.spawnWhere = 'player';
    this.pendingSpawn = null;
    game.canvas = game.canvas || document.getElementById('game');
    document.getElementById('game').addEventListener('click', (e) => this.onCanvasClick(e));
  }

  typing() {
    const a = document.activeElement;
    return !!a && this.el.contains(a) && ['INPUT', 'TEXTAREA', 'SELECT'].includes(a.tagName) && a.type !== 'checkbox' && a.type !== 'range';
  }

  toggle(force) {
    this.open = force ?? !this.open;
    this.el.style.display = this.open ? 'block' : 'none';
    if (this.open) this.refresh();
  }

  // ---------------------------------------------------------------- helpers
  h(tag, attrs = {}, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'class') e.className = v;
      else if (v !== false && v !== undefined) e.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids) e.append(k instanceof Node ? k : document.createTextNode(String(k)));
    return e;
  }

  btn(label, fn, on = false, id = undefined) { return this.h('button', { class: on ? 'on' : '', onclick: () => { fn(); this.refresh(); }, 'data-id': id }, label); }

  check(label, value, fn, id) {
    const box = this.h('input', { type: 'checkbox', 'data-id': id, onchange: (e) => { fn(e.target.checked); this.refresh(); } });
    box.checked = value;
    return this.h('label', {}, box, ` ${label}`);
  }

  // ---------------------------------------------------------------- build
  refresh() {
    if (!this.open || !this.game.scene) return;
    const g = this.game, s = g.scene, el = this.el;
    const scroll = el.scrollTop;
    el.innerHTML = '';
    const sec = (title, ...rows) => { el.append(this.h('h3', {}, title)); rows.forEach((r) => el.append(this.h('div', { class: 'row' }, ...[].concat(r)))); };

    el.append(this.h('div', { style: 'text-align:right' }, this.btn('Close (F1)', () => this.toggle(false), false, 'close')));
    sec('Scene',
      [this.btn('Test room', () => g.switchScene('testroom', { intro: true }), s.name === 'testroom', 'scene-testroom'),
       this.btn('Sandbox', () => g.switchScene('sandbox'), s.name === 'sandbox', 'scene-sandbox'),
       this.btn('Twins chapter', () => g.switchScene('twins', { step: 'opening' }), s.name === 'twins', 'scene-twins'),
       this.btn('Toy fight', () => g.switchScene('toyfight', { phase: 1 }), s.name === 'toyfight', 'scene-toyfight'),
       this.btn('Restart (no intro)', () => g.switchScene(s.name, { intro: false }), false, 'restart')],
      s.viewer ? [this.btn(s.viewer.on ? 'Close animation viewer' : 'Open animation viewer (V)', () => { s.viewer.on = !s.viewer.on; }, s.viewer.on, 'viewer'),
        this.btn('◀', () => s.page(-1)), this.btn('▶', () => s.page(1))] : []);

    sec('Cheats',
      [this.check('God mode (no damage)', g.cheats.god, (v) => (g.cheats.god = v), 'god'),
       this.check('Infinite resources', g.cheats.infinite, (v) => (g.cheats.infinite = v), 'infinite')],
      this.h('div', { class: 'hint' }, 'God mode: Liam takes no damage in the toy-army fight. Infinite resources is wired for later.'),
      ['Speed:', ...[0.5, 1, 2, 4].map((v) => this.btn(`×${v}`, () => (g.speed = v), g.speed === v, `speed-${v}`))],
      [this.btn(g.paused ? 'Unfreeze' : 'Freeze game', () => (g.paused = !g.paused), g.paused, 'pause'),
       this.btn('Step 1 frame (.)', () => { g.paused = true; g.stepRequests++; }, false, 'step')]);

    const hh = (x) => `${String(Math.floor(x)).padStart(2, '0')}:${String(Math.floor((x % 1) * 60)).padStart(2, '0')}`;
    const slider = this.h('input', { type: 'range', min: 0, max: 23.99, step: 0.05, value: g.clock.hour, 'data-id': 'time',
      oninput: (e) => { g.clock.hour = +e.target.value; label.textContent = hh(g.clock.hour); } });
    const label = this.h('span', {}, hh(g.clock.hour));
    const dayLen = this.h('input', { type: 'number', min: 10, max: 3600, value: g.config.time.dayLengthSeconds, style: 'width:70px',
      onchange: (e) => (g.config.time.dayLengthSeconds = Math.max(10, +e.target.value)) });
    sec('Time of day',
      [slider, ' ', label],
      ['Dawn', 'Noon', 'Dusk', 'Midnight'].map((n, i) => this.btn(n, () => (g.clock.hour = [6.5, 12, 19, 0][i]), false, `t-${n.toLowerCase()}`)),
      [this.check('Freeze time', g.clock.frozen, (v) => (g.clock.frozen = v), 'freeze'), ' Day length (s): ', dayLen]);

    if (s.isChapter) {
      const ch = g.chapter;
      sec('Twins chapter',
        [s.describe()],
        ['Jump to:', ...STEPS.map((st) => this.btn(st, () => g.switchScene('twins', { step: st }), ch.step === st, `step-${st}`))],
        ['Room:', ...Object.keys(g.levels.twins.rooms).map((id) => this.btn(id, () => s.enterRoom(id, { silent: true }), s.room.id === id, `room-${id}`))],
        ['Fright:', this.btn('+25', () => s.addFright(25), false, 'fright-add'), this.btn('Panic now', () => s.panic(), false, 'fright-panic'), this.btn('Reset', () => (ch.fright = 0), false, 'fright-reset')],
        [this.btn('Find Frida', () => s.run('found', s.foundTwin('frida')), ch.found.frida, 'find-frida'), this.btn('Find Wilhelmina', () => s.run('found', s.foundTwin('wilhelmina')), ch.found.wilhelmina, 'find-wilhelmina'),
         this.check('Bat at will (Q)', ch.batAtWill, (v) => (ch.batAtWill = v), 'bat-at-will')],
        this.h('div', { class: 'hint' }, 'Each step starts its own cutscene (if it has one). Lines: texts.json → twins. Numbers: config.json → twins, fright. Map: levels/twins.json.'));
    }
    if (s.isSide) {
      sec('Toy-army fight',
        [s.describe()],
        ['Phase:', ...[1, 2, 3].map((n) => this.btn(`${n}`, () => g.switchScene('toyfight', { phase: n }), s.phase === n, `phase-${n}`)),
         this.btn('Full HP', () => (s.liam.hp = g.config.side.liamHp), false, 'hp-full'), this.btn('Win this phase', () => s.clearPhase(), false, 'phase-win')],
        this.h('div', { class: 'hint' }, 'Phase 1 soldiers, 2 rocking horse, 3 tag the Twins. A defeat retries the phase. Numbers: config.json → side. Hitbox overlay shows hit areas and platforms.'));
    }

    const L = s.liam;
    const busy = L.form === 'transforming';
    if (L.transform) sec('Bat form',
      [`Liam is: ${busy ? 'transforming…' : L.form === 'bat' ? (L.panicLeft > 0 ? 'a panicking bat' : 'a bat') : 'human'}`],
      [this.btn('Turn into bat', () => L.transform(true), false, 'bat-on'),
       this.btn('Turn back', () => L.transform(false), false, 'bat-off'),
       this.btn(`Panic bat (${g.config.bat.panicSeconds}s)`, () => (L.form === 'bat' ? (L.panicLeft = g.config.bat.panicSeconds, L.panicTurn = 0) : L.transform(true, { panic: true })), false, 'bat-panic')],
      this.h('div', { class: 'hint' }, 'As a bat: arrow keys / WASD fly. Panic: he lurches around and the keys only nudge him, then he turns back. Speeds in config.json → bat.'));
    if (busy || L.panicLeft > 0) setTimeout(() => this.refresh(), 300);

    if (s.ambrose) {
      const A = s.ambrose;
      sec('Ambrose',
        [`Doing: ${A.describe()}`],
        [`Table: ${s.room.plates}/${g.config.ambrose.tablePlaces} places · clock: ${s.room.clockStopped != null ? `stopped at ${s.room.clockStopped}:00` : 'running'}`],
        [this.btn('Bring him here', () => { A.force('none'); A.x = L.x + 34; A.y = L.y; }, false, 'amb-here'),
         this.btn('Talk', () => A.talk(), false, 'amb-talk'), this.btn('Bow', () => A.force('bow'), false, 'amb-bow'),
         this.btn('Drift + fade', () => A.force('drift'), false, 'amb-drift')],
        [this.btn('Set a place', () => A.force('table'), false, 'amb-table'), this.btn('Wind the clock', () => A.force('clock'), false, 'amb-clock'),
         this.btn('Walk through the wall', () => A.force('wall'), false, 'amb-wall'), this.btn('Reset the night', () => s.room.resetNight(), false, 'amb-reset')],
        this.h('div', { class: 'hint' }, 'By day he wanders and sometimes drifts; at night (Time of day > Midnight) he sets the table, winds the clock back and walks through the left wall. Numbers in config.json → ambrose.'));
    }

    if (s.room && s.room.props) {
      sec('Room', ['Curtains:', ...['open', 'half', 'closed'].map((c) => this.btn(c, () => (s.room.curtain = c), s.room.curtain === c, `curtain-${c}`))]);
    }

    const spawnList = s.spawnables ? s.spawnables() : SPAWNABLE;
    if (!spawnList[this.spawnType]) this.spawnType = Object.keys(spawnList)[0];
    const typeSel = this.h('select', { 'data-id': 'spawn-type', onchange: (e) => { this.spawnType = e.target.value; this.refresh(); } },
      ...Object.entries(spawnList).map(([k, v]) => this.h('option', { value: k, selected: k === this.spawnType }, v.label)));
    const animOpts = [];
    for (const [name, sh] of Object.entries(g.sprites.sheets)) {
      if (!name.startsWith('liam_td') && !name.startsWith('liam_bat')) continue;
      for (const an of Object.keys(sh.anims || {})) for (const row of sh.rows || ['down']) animOpts.push(`${name}|${an}|${row}`);
    }
    const animSel = this.h('select', { 'data-id': 'spawn-anim', style: 'max-width:300px', onchange: (e) => (this.spawnAnim = e.target.value) },
      ...animOpts.map((o) => this.h('option', { value: o, selected: o === this.spawnAnim }, o.replace(/\|/g, ' · '))));
    this.spawnAnim = this.spawnAnim || animOpts[0];
    sec('Spawn',
      [typeSel],
      this.spawnType === 'liamDummy' ? [animSel] : [],
      ['Where:', this.btn('next to Liam', () => (this.spawnWhere = 'player'), this.spawnWhere === 'player'),
       this.btn('at cursor (click game)', () => (this.spawnWhere = 'cursor'), this.spawnWhere === 'cursor')],
      [this.btn('Spawn', () => this.spawn(), false, 'spawn'), this.btn('Clear spawned', () => (s.entities = []), false, 'clear')],
      this.pendingSpawn ? this.h('div', { class: 'hint' }, 'Click in the game to place it.') : []);

    const ov = g.overlays;
    sec('Overlays', [['hitbox', 'Hitboxes'], ['ranges', 'Ranges, auras, sunbeam'], ['grid', 'Navigation grid'], ['fps', 'FPS'], ['values', 'Live values']]
      .map(([k, l]) => this.check(l, !!ov[k], (v) => (ov[k] = v), `ov-${k}`)));

    const cfgStatus = this.h('span', { class: 'hint' }, this.cfgMsg || '');
    sec('Live tuning',
      [this.btn('Reload config.json', async () => { this.cfgMsg = (await g.reloadConfig()) ? `config reloaded ${new Date().toLocaleTimeString()}` : 'config.json could not be read'; this.refresh(); }, false, 'reload-config'),
       this.btn('Reload texts.json', async () => { const r = await fetch(`texts.json?v=${Date.now()}`); if (r.ok) g.texts = await r.json(); this.cfgMsg = 'texts reloaded'; this.refresh(); }, false, 'reload-texts')],
      cfgStatus);

    const slots = [...Array(g.config.debug?.saveSlots || 3).keys()].map((i) => {
      let has = false;
      try { has = !!localStorage.getItem(STORE + i); } catch (e) { /* storage blocked */ }
      return [`Slot ${i + 1}:`, this.btn('Save', () => this.save(i), false, `save-${i}`), this.btn('Load', () => this.load(i), false, `load-${i}`), has ? '✓' : ''];
    });
    const io = this.h('textarea', { 'data-id': 'state-json', placeholder: 'Export puts the state here; paste one and press Import.' });
    sec('Save states', ...slots,
      [this.btn('Export', () => { this.exported = JSON.stringify(g.snapshot()); }, false, 'export'),
       this.btn('Import', () => { try { g.restore(JSON.parse(io.value)); } catch (e) { alert('Not a valid state'); } }, false, 'import')],
      io);
    if (this.exported) io.value = this.exported;

    const seedIn = this.h('input', { type: 'number', value: g.seed, style: 'width:120px', 'data-id': 'seed' });
    sec('Random seed',
      [seedIn, this.btn('Apply', () => g.setSeed(+seedIn.value), false, 'seed-apply'), this.btn('Random', () => g.setSeed(Math.floor(Math.random() * 1e9)), false, 'seed-random')],
      this.h('div', { class: 'hint' }, 'Same seed = same floor, same flicker, same random lines. Restarts the scene.'));

    const link = this.testLink();
    sec('Test link', this.h('a', { href: link }, link.replace(location.origin, '')),
      this.btn('Copy', () => navigator.clipboard?.writeText(link)));
    el.scrollTop = scroll;
  }

  testLink() {
    const g = this.game, s = g.scene;
    const p = new URLSearchParams({ debug: 1, scene: s.name, time: g.clock.hour.toFixed(2), seed: g.seed, intro: 0 });
    if (g.clock.frozen) p.set('freeze', 1);
    if (g.speed !== 1) p.set('speed', g.speed);
    if (s.room?.props) p.set('curtain', s.room.curtain);
    if (s.testParams) for (const [k, v] of Object.entries(s.testParams())) p.set(k, v);
    p.set('x', s.liam.x.toFixed(0)); p.set('y', s.liam.y.toFixed(0));
    if (s.liam.form === 'bat') p.set('bat', 1);
    const ov = Object.keys(g.overlays).filter((k) => g.overlays[k]);
    if (ov.length) p.set('overlays', ov.join(','));
    return `${location.origin}${location.pathname}?${p}`;
  }

  // ---------------------------------------------------------------- actions
  spawn() {
    const g = this.game, s = g.scene;
    const extra = {};
    if (this.spawnType === 'liamDummy' && this.spawnAnim) {
      const [sheet, name, row] = this.spawnAnim.split('|');
      extra.anim = { sheet, name, row };
    }
    if (this.spawnWhere === 'cursor' && this.spawnType !== 'dialogue') { this.pendingSpawn = { type: this.spawnType, extra }; return; }
    s.spawn(this.spawnType, s.liam.x + 28, s.liam.y, extra);
  }

  onCanvasClick(e) {
    if (!this.pendingSpawn) return;
    const v = this.game.view;
    const x = (e.clientX - v.offX) / v.k, y = (e.clientY - v.offY) / v.k;
    this.game.scene.spawn(this.pendingSpawn.type, x, y, this.pendingSpawn.extra);
    this.pendingSpawn = null;
    this.refresh();
  }

  save(i) {
    try { localStorage.setItem(STORE + i, JSON.stringify(this.game.snapshot())); this.cfgMsg = `saved slot ${i + 1}`; } catch (e) { this.cfgMsg = 'saving blocked by the browser; use Export'; }
  }

  load(i) {
    let raw = null;
    try { raw = localStorage.getItem(STORE + i); } catch (e) { /* storage blocked */ }
    if (raw) this.game.restore(JSON.parse(raw)); else this.cfgMsg = `slot ${i + 1} is empty`;
  }
}
