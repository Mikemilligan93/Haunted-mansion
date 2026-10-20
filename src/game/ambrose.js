// Ambrose, the butler. A ghost who doesn't know it.
// By day he glides between spots in the room and sometimes loses his train of thought (drift + fade).
// At night he does his rituals: sets the table for guests who never come, winds the clock back to
// the same hour, and walks through the wall where a door used to be.
// He bows when Liam comes near and talks when Liam presses E.
// x, y = the point between his feet.
import { clamp } from '../engine/util.js';

const IDLE = { sheet: 'ambrose_td_idle', name: 'idle' };
const WALK = { sheet: 'ambrose_td_walk', name: 'walk' };

export class Ambrose {
  constructor(scene, x, y, { schedule = true } = {}) {
    this.scene = scene;
    this.type = 'ambrose';
    this.x = x; this.y = y;
    this.dir = 'down';
    this.schedule = schedule;
    this.alpha = 1;
    this.hidden = false;
    this.anim = { ...IDLE, row: 'down', t: 0 };
    this.tasks = [];
    this.task = null;
    this.greetCooldown = 3;
    this.driftCooldown = 0;
    this.talking = 0;          // seconds left of facing Liam while talking
    this.talkCount = 0;
    this.nameIndex = 0;
    this.lastSmalltalk = null;
    this.phase = null;
    this.t = 0;
  }

  get game() { return this.scene.game; }
  get cfg() { return this.game.config.ambrose; }
  get room() { return this.scene.room; }

  // ---------------------------------------------------------------- animation helpers
  animDef(a = this.anim) {
    const s = this.game.sprites.sheet(a.sheet);
    return s && s.anims && s.anims[a.name];
  }

  setAnim(a, row = this.dir) {
    if (this.anim.sheet !== a.sheet || this.anim.name !== a.name) this.anim = { ...a, row, t: 0 };
    this.anim.row = row;
  }

  play(sheet, name, row) { this.anim = { sheet, name, row, t: 0 }; }

  frameIndex() {
    const d = this.animDef();
    if (!d) return 0;
    const frames = this.anim.reverse ? [...d.frames].reverse() : d.frames;
    let i = Math.floor(this.anim.t * d.fps);
    i = d.loop ? i % frames.length : Math.min(i, frames.length - 1);
    return frames[i];
  }

  animDone() {
    const d = this.animDef();
    return !d || (!d.loop && this.anim.t * d.fps >= d.frames.length);
  }

  rowFor(sheetName, row) {
    const rows = this.game.sprites.sheet(sheetName)?.rows || ['down'];
    if (row === 'right') return { row: rows.includes('left') ? 'left' : rows[0], flip: rows.includes('left') };
    if (rows.includes(row)) return { row, flip: false };
    return { row: rows[0], flip: false };
  }

  face(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) this.dir = dx > 0 ? 'right' : 'left';
    else if (dy) this.dir = dy > 0 ? 'down' : 'up';
  }

  // ---------------------------------------------------------------- routine
  phaseNow() {
    const h = this.game.clock.hour, t = this.game.config.time;
    return h >= t.nightStart || h < t.dawnStart ? 'night' : 'day';
  }

  // the room's fixed spots
  spots() {
    const r = this.room, b = r.bounds();
    return {
      day: [
        { x: r.windowX - 50, y: r.floorTop + 40 },
        { x: r.doorX + 40, y: r.floorTop + 30 },
        { x: (b.x1 + b.x2) / 2, y: r.floorTop + 110 },
        { x: r.clock ? r.clock.x - 34 : b.x2 - 40, y: r.floorTop + 60 },
      ],
      table: r.table ? { x: r.table.x + (this.game.config.props?.table?.halfWidth ?? 32) + 14, y: r.table.y - 10 } : null,
      clock: r.clock ? { x: r.clock.x, y: r.floorTop + 16 } : null,
      wall: r.wallDoor ? { x: r.wallDoor.x, y: r.wallDoor.y } : null,
    };
  }

  plan() {
    const g = this.game, c = this.cfg, sp = this.spots(), r = this.room;
    const wait = () => ({ type: 'wait', t: g.rng.range(c.waitSeconds[0], c.waitSeconds[1]) });
    if (!this.schedule) { this.tasks.push({ type: 'wait', t: 5 }); return; }
    if (this.phaseNow() === 'night' && sp.table && sp.clock && sp.wall) {
      if (r.plates < c.tablePlaces) {
        this.tasks.push({ type: 'go', ...sp.table });
        for (let i = r.plates; i < c.tablePlaces; i++) this.tasks.push({ type: 'setPlace' });
      }
      if (r.clockStopped == null) this.tasks.push({ type: 'go', ...sp.clock }, { type: 'wind' });
      this.tasks.push({ type: 'go', x: sp.wall.x + 30, y: sp.wall.y }, { type: 'throughWall' }, wait());
      if (r.plates >= c.tablePlaces && r.clockStopped != null) this.tasks.push({ type: 'go', ...sp.table }, wait());
      return;
    }
    const p = g.rng.pick(sp.day);
    this.tasks.push({ type: 'go', x: p.x, y: p.y }, wait());
    // drifting is rare: a small chance, and never again until the cooldown has passed
    if (this.driftCooldown <= 0 && g.rng.next() < c.driftChance) {
      this.tasks.push({ type: 'drift' });
      this.driftCooldown = c.driftCooldownSeconds;
    }
  }

  // used by the testing tools: do this now
  force(type) {
    const sp = this.spots();
    this.task = null;
    this.hidden = false; this.alpha = 1;
    const go = (p) => (p ? [{ type: 'go', x: p.x, y: p.y }] : []);
    this.tasks = {
      drift: [{ type: 'drift' }],
      table: [...go(sp.table), { type: 'setPlace' }],
      clock: [...go(sp.clock), { type: 'wind' }],
      wall: sp.wall ? [{ type: 'go', x: sp.wall.x + 30, y: sp.wall.y }, { type: 'throughWall' }] : [],
      bow: [{ type: 'bow' }],
    }[type] || [];
  }

  // ---------------------------------------------------------------- update
  update(dt) {
    const g = this.game, c = this.cfg, l = this.scene.liam;
    this.t += dt;
    this.anim.t += dt;
    this.greetCooldown = Math.max(0, this.greetCooldown - dt);
    this.driftCooldown = Math.max(0, (this.driftCooldown ?? 0) - dt);

    // dawn clears the night's work
    const ph = this.phaseNow();
    if (this.phase === 'night' && ph === 'day' && this.room.props) this.room.resetNight();
    if (this.phase !== ph && this.schedule) { this.tasks = []; if (this.task && this.task.type === 'go') this.task = null; }
    this.phase = ph;

    // talking: stand still and face Liam until the conversation ends
    if (this.talking > 0) {
      this.talking -= dt;
      if (!g.ui.speaking) this.talking = 0;
      this.face(l.x - this.x, l.y - this.y);
      this.setAnim(IDLE);
      return;
    }

    // greet: a bow when Liam comes close (not in the middle of a ritual)
    const near = Math.hypot(l.x - this.x, (l.y - this.y) * 1.4) < c.greetRange;
    const interruptible = !this.task || this.task.type === 'go' || this.task.type === 'wait';
    if (near && !this.hidden && this.greetCooldown <= 0 && interruptible && l.form === 'human') {
      this.greetCooldown = c.greetCooldownSeconds;
      if (this.task && this.task.type === 'go') this.tasks.unshift(this.task);
      this.task = { type: 'bow' };
    }

    if (!this.task) {
      if (!this.tasks.length) this.plan();
      this.task = this.tasks.shift() || null;
      if (this.task) this.task.t0 = this.task.t;
    }
    if (this.task) this.runTask(dt);
  }

  runTask(dt) {
    const k = this.task, c = this.cfg, r = this.room;
    const done = () => { this.task = null; };
    switch (k.type) {
      case 'go': {
        const dx = k.x - this.x, dy = k.y - this.y, d = Math.hypot(dx, dy);
        if (d < 1.5) { this.setAnim(IDLE); return done(); }
        const step = Math.min(d, c.speed * dt);
        this.x += (dx / d) * step; this.y += (dy / d) * step;
        this.face(dx, dy);
        this.setAnim(WALK);
        if (!k.fade) { const b = r.bounds(); this.x = clamp(this.x, b.x1 - 40, b.x2 + 40); this.y = clamp(this.y, b.y1, b.y2); }
        return;
      }
      case 'wait':
        this.setAnim(IDLE);
        k.t -= dt;
        if (k.t <= 0) done();
        return;
      case 'bow':
        if (!k.started) { k.started = true; this.dir = 'down'; this.play('ambrose_td_bow', 'bow', 'down'); }
        if (this.animDone()) { this.setAnim(IDLE, 'down'); done(); }
        return;
      case 'drift': {
        // loses his train of thought: drift pose, fade, hold, then snap back
        if (!k.started) { k.started = true; k.phase = 'in'; k.hold = c.driftHoldSeconds; this.dir = 'down'; this.play('ambrose_td_drift', 'drift', 'down'); }
        if (k.phase === 'in') {
          this.alpha = Math.max(c.fadeAlpha, this.alpha - dt / 0.8);
          if (this.animDone() && this.alpha <= c.fadeAlpha + 0.001) k.phase = 'hold';
        } else if (k.phase === 'hold') {
          k.hold -= dt;
          if (k.hold <= 0) { k.phase = 'out'; this.anim = { sheet: 'ambrose_td_drift', name: 'drift', row: 'down', t: 0, reverse: true }; }
        } else {
          this.alpha = Math.min(1, this.alpha + dt / 0.4);
          if (this.animDone() && this.alpha >= 1) { this.setAnim(IDLE, 'down'); done(); }
        }
        return;
      }
      case 'setPlace':
        if (!k.started) { k.started = true; this.dir = 'left'; this.play('ambrose_td_settable', 'settable', 'left'); }
        if (this.animDone()) { r.plates = Math.min(c.tablePlaces, r.plates + 1); this.setAnim(IDLE, 'left'); done(); }
        return;
      case 'wind':
        if (!k.started) { k.started = true; this.dir = 'up'; this.play('ambrose_td_windclock', 'windclock', 'up'); }
        if (this.animDone()) { r.clockStopped = c.deathHour; this.setAnim(IDLE, 'up'); done(); }
        return;
      case 'throughWall': {
        // walks into the wall where the old door was, fading out; comes back a while later
        const w = r.wallDoor;
        if (!k.started) { k.started = true; k.phase = 'out'; k.hidden = c.wallHiddenSeconds; }
        if (k.phase === 'out') {
          this.dir = 'left'; this.setAnim(WALK);
          this.x -= c.speed * dt;
          this.alpha = clamp((this.x - (w.x - 24)) / 30, 0, 1);
          if (this.alpha <= 0) { this.hidden = true; k.phase = 'gone'; }
        } else if (k.phase === 'gone') {
          k.hidden -= dt;
          if (k.hidden <= 0) { this.hidden = false; k.phase = 'back'; }
        } else {
          this.dir = 'right'; this.setAnim(WALK);
          this.x += c.speed * dt;
          this.alpha = clamp((this.x - (w.x - 24)) / 30, 0, 1);
          if (this.alpha >= 1) { this.alpha = 1; done(); }
        }
        return;
      }
      default: done();
    }
  }

  // ---------------------------------------------------------------- talking
  // Lines for one conversation: [{text, speaker, portrait}]
  conversation() {
    const g = this.game, T = g.texts.ambrose || {}, c = this.cfg, l = this.scene.liam;
    const names = T.names || ['Master Edmund'];
    const pick = (list) => (Array.isArray(list) ? g.rng.pick(list) : list);
    const A = (text, portrait = 'composed') => ({ text, speaker: 'ambrose', portrait });
    const L = (text, portrait = 'flat') => ({ text, speaker: 'liam', portrait });
    this.talkCount++;
    if (l.form === 'bat') return [A(T.bat, 'composed')];
    if (this.task && this.task.type === 'drift') return [A(T.drift, 'drifting')];
    const ritual = this.task && { setPlace: 'table', wind: 'clock', throughWall: 'wall' }[this.task.type];
    if (ritual) return [A(T.ritual?.[ritual], 'remembering')];
    if (this.talkCount % 2 === 1) {
      // the wrong-name gag: a different, older master each time
      const name = names[this.nameIndex % names.length];
      this.nameIndex++;
      const fill = (s) => (s || '').replace('{name}', name);
      return [A(fill(pick(T.greet)), 'polite'), L(pick(T.liamCorrects), 'flat'), A(fill(pick(T.accepts)), 'composed')];
    }
    // small talk; sometimes he tells you the same thing again
    if (this.lastSmalltalk && g.rng.next() < c.repeatChance) return [A(this.lastSmalltalk, 'composed'), A(T.repeat, 'eyebrow')];
    this.lastSmalltalk = pick(T.smalltalk);
    return [A(this.lastSmalltalk, g.rng.next() < 0.5 ? 'remembering' : 'composed')];
  }

  talk() {
    const lines = this.conversation();
    this.game.ui.sayAll(lines);
    this.talking = 30;
    this.greetCooldown = this.cfg.greetCooldownSeconds;
    if (this.task && this.task.type === 'go') { this.tasks.unshift(this.task); this.task = null; }
  }

  canTalk(liam) {
    return !this.hidden && this.alpha > 0.5 && Math.hypot(liam.x - this.x, (liam.y - this.y) * 1.4) < this.cfg.talkRange;
  }

  // ---------------------------------------------------------------- drawing
  candelabraOffset() {
    return { down: [-15, -44], left: [-18, -44], right: [18, -44], up: [15, -54] }[this.dir] || [0, -44];
  }

  lights() {
    if (this.hidden) return [];
    const [ox, oy] = this.candelabraOffset();
    return [{ x: this.x + ox, y: this.y + oy, r: this.cfg.lightRadius, intensity: this.alpha, warm: true, kind: 'candelabra' }];
  }

  draw(ctx) {
    if (this.hidden || this.alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = 0.25 * this.alpha;
    ctx.fillStyle = '#1a1020';
    ctx.beginPath(); ctx.ellipse(Math.round(this.x), Math.round(this.y), 10, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    const { row, flip } = this.rowFor(this.anim.sheet, this.anim.row);
    this.game.sprites.draw(ctx, this.anim.sheet, row, this.frameIndex(), this.x, this.y, { flip, alpha: this.alpha });
  }

  describe() {
    return `${this.task ? this.task.type : 'none'}${this.task?.phase ? `/${this.task.phase}` : ''} ${this.phase} alpha ${this.alpha.toFixed(2)}${this.hidden ? ' (in the wall)' : ''} queue ${this.tasks.length}`;
  }

  serialize() {
    return { type: 'ambrose', x: this.x, y: this.y, dir: this.dir, schedule: this.schedule, talkCount: this.talkCount, nameIndex: this.nameIndex, phase: this.phase };
  }

  restore(s) {
    Object.assign(this, { x: s.x, y: s.y, dir: s.dir, talkCount: s.talkCount || 0, nameIndex: s.nameIndex || 0, phase: s.phase || null });
    this.tasks = []; this.task = null; this.alpha = 1; this.hidden = false; this.talking = 0;
    this.anim = { ...IDLE, row: this.dir, t: 0 };
  }
}
