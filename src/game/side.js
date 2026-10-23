// The toy-army fight: a side-view arena inside the nursery's picture-book painting.
// Phase 1: waves of wind-up tin soldiers while the Twins throw toys from the fort towers.
// Phase 2: the rocking horse charges, lands, topples: hit it while it is down.
// Phase 3: tag both Twins as they float around the arena.
// A defeat retries the current phase (Liam panics out of it, never dies). All numbers: config.json -> side.
import { clamp } from '../engine/util.js';
import { Script, wait, say } from '../engine/script.js';

const PHASES = 3;
const overlap = (a, b) => a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;

export const SIDE_SPAWNABLE = {
  soldier: { label: 'Tin soldier' },
  horse: { label: 'Rocking horse' },
  toy: { label: 'A thrown toy (at Liam)' },
  dialogue: { label: 'Cutscene: test dialogue' },
};

// ---------------------------------------------------------------- Liam, side view
class LiamSide {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.facing = 1;
    this.onGround = true;
    this.state = 'idle';
    this.stateT = 0;
    this.hp = scene.cfg.liamHp;
    this.invuln = 0;
    this.coyote = 0; this.jumpBuf = 0;
    this.throwCd = 0;
    this.anim = { sheet: 'liam_sv_idle', name: 'idle', t: 0 };
    this.form = 'human'; this.mode = 'free'; this.dir = 'right'; this.panicLeft = 0; this.speedNow = 0; this.inSun = false;
  }

  get game() { return this.scene.game; }
  get cfg() { return this.scene.cfg; }

  setAnim(sheet, name) { if (this.anim.sheet !== sheet || this.anim.name !== name) this.anim = { sheet, name, t: 0 }; }

  box() { return { x1: this.x - 8, x2: this.x + 8, y1: this.y - 48, y2: this.y }; }
  swipeBox() {
    const f = this.facing, reach = this.cfg.swipeReach;
    return { x1: f > 0 ? this.x : this.x - reach, x2: f > 0 ? this.x + reach : this.x, y1: this.y - 52, y2: this.y - 4 };
  }
  swipeActive() { return this.state === 'swipe' && this.stateT > 0.06 && this.stateT < 0.26; }

  hurt(fromX) {
    const g = this.game;
    if (this.invuln > 0 || this.state === 'defeated') return false;
    if (!g.cheats.god) this.hp -= 1;
    this.invuln = this.cfg.invulnSeconds;
    this.state = 'hurt'; this.stateT = 0;
    this.vx = (this.x < fromX ? -1 : 1) * this.cfg.knockback; this.vy = -this.cfg.knockup;
    this.onGround = false;
    this.setAnim('liam_sv_hurt', 'hurt');
    if (this.hp <= 0) this.scene.defeat();
    return true;
  }

  update(dt) {
    const g = this.game, c = this.cfg, inp = g.input, sc = this.scene;
    this.anim.t += dt;
    this.stateT += dt;
    this.invuln = Math.max(0, this.invuln - dt);
    this.throwCd = Math.max(0, this.throwCd - dt);
    const control = this.mode === 'free' && this.state !== 'defeated';
    let ax = 0;
    if (control) ax = (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0);
    const busy = this.state === 'hurt' || (this.state === 'swipe' && this.onGround) || (this.state === 'throw' && this.onGround);
    if (this.state === 'hurt' && this.stateT > c.hurtSeconds) this.state = 'idle';
    if ((this.state === 'swipe' && this.stateT > c.swipeSeconds) || (this.state === 'throw' && this.stateT > c.throwSeconds)) this.state = 'idle';

    if (!busy) {
      this.vx = ax * c.runSpeed;
      if (ax) { this.facing = ax; this.dir = ax > 0 ? 'right' : 'left'; }
    } else if (this.state !== 'hurt') this.vx = 0;

    // jump: buffered, with a little coyote time and a shorter hop when the key is released early
    if (control && inp.wasPressed('jump')) this.jumpBuf = c.jumpBufferSeconds;
    this.jumpBuf = Math.max(0, this.jumpBuf - dt);
    this.coyote = this.onGround ? c.coyoteSeconds : Math.max(0, this.coyote - dt);
    if (this.jumpBuf > 0 && this.coyote > 0 && !busy) {
      this.vy = -c.jumpSpeed; this.onGround = false; this.coyote = 0; this.jumpBuf = 0;
    }
    if (!inp.isDown('jump') && this.vy < -c.jumpCutSpeed && this.state !== 'hurt') this.vy = -c.jumpCutSpeed; // short hop

    if (control && !busy && inp.wasPressed('attack')) { this.state = 'swipe'; this.stateT = 0; this.anim = { sheet: 'liam_sv_swipe', name: 'swipe', t: 0 }; }
    else if (control && !busy && inp.wasPressed('throw') && this.throwCd <= 0) {
      this.state = 'throw'; this.stateT = 0; this.throwCd = c.throwCooldown; this.thrown = false;
      this.anim = { sheet: 'liam_sv_throw', name: 'throw', t: 0 };
    }
    if (this.state === 'throw' && !this.thrown && this.stateT > 0.16) { this.thrown = true; sc.throwSketch(this); }

    // physics
    this.vy += c.gravity * dt;
    const oldY = this.y;
    this.x = clamp(this.x + this.vx * dt, sc.left, sc.right);
    this.y += this.vy * dt;
    this.onGround = false;
    if (this.vy >= 0) {
      for (const p of sc.platforms) {
        if (this.x > p.x1 && this.x < p.x2 && oldY <= p.y + 0.5 && this.y >= p.y && !(p.oneWay && inp.isDown('down') && control)) {
          this.y = p.y; this.vy = 0; this.onGround = true; break;
        }
      }
    }
    if (this.y >= sc.groundY) { this.y = sc.groundY; this.vy = 0; this.onGround = true; }
    this.speedNow = Math.abs(this.vx);

    // animation
    if (this.state === 'idle' || this.state === 'run') this.state = Math.abs(this.vx) > 1 ? 'run' : 'idle';
    if (this.state === 'idle' || this.state === 'run') {
      if (!this.onGround) this.setAnim('liam_sv_jump', this.vy < -80 ? 'rise' : this.vy > 80 ? 'fall' : 'apex');
      else if (this.state === 'run') this.setAnim('liam_sv_run', 'run');
      else this.setAnim('liam_sv_idle', 'idle');
    }
  }

  frame() {
    const s = this.game.sprites.sheet(this.anim.sheet), d = s?.anims?.[this.anim.name];
    if (!d) return 0;
    let i = Math.floor(this.anim.t * d.fps);
    i = d.loop ? i % d.frames.length : Math.min(i, d.frames.length - 1);
    return d.frames[i];
  }

  draw(ctx) {
    if (this.state === 'defeated' && Math.floor(this.stateT * 10) % 2) return;
    if (this.invuln > 0 && Math.floor(this.invuln * 16) % 2) return;
    ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#1a1020';
    const gy = this.scene.floorUnder(this.x, this.y);
    ctx.beginPath(); ctx.ellipse(Math.round(this.x), Math.round(gy), 9, 2, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    this.game.sprites.draw(ctx, this.anim.sheet, 0, this.frame(), this.x, this.y, { flip: this.facing < 0 });
  }
}

// ---------------------------------------------------------------- tin soldier
class Soldier {
  constructor(scene, x, dir) {
    Object.assign(this, { scene, x, y: scene.groundY, dir, state: 'march', t: 0, alive: true, type: 'soldier' });
    this.speed = scene.cfg.soldierSpeed * scene.game.rng.range(0.85, 1.15);
  }
  box() { return { x1: this.x - 6, x2: this.x + 6, y1: this.y - 30, y2: this.y }; }
  bayonet() { return { x1: this.dir > 0 ? this.x : this.x - 26, x2: this.dir > 0 ? this.x + 26 : this.x, y1: this.y - 22, y2: this.y - 14 }; }
  knock() {
    if (this.state === 'knocked' || this.state === 'gone') return false;
    this.state = 'knocked'; this.t = 0;
    return true;
  }
  update(dt) {
    const sc = this.scene, c = sc.cfg, L = sc.liam;
    this.t += dt;
    if (this.state === 'march') {
      const dx = L.x - this.x;
      this.dir = dx >= 0 ? 1 : -1;
      if (Math.abs(dx) < c.soldierLungeRange && Math.abs(L.y - this.y) < 30) { this.state = 'windup'; this.t = 0; }
      else this.x += this.dir * this.speed * dt;
    } else if (this.state === 'windup') {
      if (this.t > c.soldierWindup) { this.state = 'lunge'; this.t = 0; }
    } else if (this.state === 'lunge') {
      this.x += this.dir * c.soldierLungeSpeed * dt;
      if (overlap(this.bayonet(), L.box())) L.hurt(this.x);
      if (this.t > 0.25) { this.state = 'recover'; this.t = 0; }
    } else if (this.state === 'recover') {
      if (this.t > 0.35) { this.state = 'march'; this.t = 0; }
    } else if (this.state === 'knocked') {
      if (this.t > c.soldierDownSeconds) { this.state = 'gone'; this.alive = false; }
    }
    this.x = clamp(this.x, sc.left - 30, sc.right + 30);
    if (this.state !== 'knocked' && this.state !== 'gone' && overlap(this.box(), L.box())) L.hurt(this.x);
  }
  draw(ctx) {
    const sp = this.scene.game.sprites, flip = this.dir < 0;
    let row = 0, col = Math.floor(this.t * 8) % 6;
    if (this.state === 'windup') { row = 1; col = 0; }
    else if (this.state === 'lunge') { row = 1; col = 1; }
    else if (this.state === 'recover') { row = 1; col = 2; }
    else if (this.state === 'knocked') { row = 1; col = 3 + Math.min(2, Math.floor(this.t * 8)); }
    const a = this.state === 'knocked' && this.t > this.scene.cfg.soldierDownSeconds - 0.4 ? Math.max(0, (this.scene.cfg.soldierDownSeconds - this.t) / 0.4) : 1;
    if (sp.has('toy_soldier')) sp.draw(ctx, 'toy_soldier', row, col, this.x, this.y, { flip, alpha: a });
    else { ctx.fillStyle = '#a4433a'; ctx.fillRect(Math.round(this.x) - 5, Math.round(this.y) - 30, 10, 30); ctx.fillStyle = '#2a2630'; ctx.fillRect(Math.round(this.x) - 4, Math.round(this.y) - 38, 8, 9); }
  }
}

// ---------------------------------------------------------------- rocking horse
class Horse {
  constructor(scene, x, dir) {
    Object.assign(this, { scene, x, y: scene.groundY, dir, state: 'rock', t: 0, vx: 0, vy: 0, hp: scene.cfg.horseHp, alive: true, type: 'horse', hitFlash: 0 });
  }
  box() { return { x1: this.x - 24, x2: this.x + 24, y1: this.y - 44, y2: this.y }; }
  vulnerable() { return this.state === 'topple'; }
  hit(n = 1) {
    if (!this.vulnerable()) { this.scene.floatText('tink!', this.x, this.y - 50); return false; }
    this.hp -= n; this.hitFlash = 0.15;
    if (this.hp <= 0) { this.alive = false; this.state = 'beaten'; this.scene.floatText(this.scene.T.fight?.horseBeaten || '...', this.x, this.y - 50); }
    return true;
  }
  update(dt) {
    const sc = this.scene, c = sc.cfg, L = sc.liam;
    this.t += dt; this.hitFlash = Math.max(0, this.hitFlash - dt);
    if (this.state === 'rock' && this.t > c.horseRockSeconds) { this.state = 'windup'; this.t = 0; this.dir = L.x >= this.x ? 1 : -1; }
    else if (this.state === 'windup' && this.t > c.horseWindup) { this.state = 'leap'; this.t = 0; this.vx = this.dir * c.horseSpeed; this.vy = -c.horseLeap; }
    else if (this.state === 'leap') {
      this.vy += c.gravity * dt; this.x += this.vx * dt; this.y += this.vy * dt;
      if (this.y >= sc.groundY) { this.y = sc.groundY; this.state = 'land'; this.t = 0; }
      if (this.x < sc.left + 20 || this.x > sc.right - 20) { this.x = clamp(this.x, sc.left + 20, sc.right - 20); this.vx = 0; }
    } else if (this.state === 'land') {
      this.x = clamp(this.x + this.vx * 0.35 * dt, sc.left + 20, sc.right - 20);
      if (this.t > 0.3) { this.state = 'topple'; this.t = 0; }
    } else if (this.state === 'topple' && this.t > c.horseStunSeconds) { this.state = 'rock'; this.t = 0; this.dir = -this.dir; }
    if ((this.state === 'leap' || this.state === 'land') && overlap(this.box(), L.box())) L.hurt(this.x);
  }
  draw(ctx) {
    const sp = this.scene.game.sprites, flip = this.dir < 0;
    let row = 0, col = Math.floor(this.t * 6) % 4;
    if (this.state === 'windup') { row = 1; col = 0; }
    else if (this.state === 'leap') { row = 1; col = 1; }
    else if (this.state === 'land') { row = 1; col = 2; }
    else if (this.state === 'topple' || this.state === 'beaten') { row = 1; col = 3; }
    ctx.save();
    if (this.hitFlash > 0) ctx.filter = 'brightness(2)';
    if (sp.has('toy_rockinghorse')) sp.draw(ctx, 'toy_rockinghorse', row, col, this.x, this.y, { flip, alpha: this.state === 'beaten' ? 0.6 : 1 });
    else { ctx.fillStyle = '#b5aea2'; ctx.fillRect(Math.round(this.x) - 22, Math.round(this.y) - 40, 44, 30); ctx.fillStyle = '#6b4a33'; ctx.fillRect(Math.round(this.x) - 26, Math.round(this.y) - 6, 52, 6); }
    ctx.restore();
  }
}

// ---------------------------------------------------------------- a Twin, floating
class TwinSide {
  constructor(scene, who, x, y) {
    Object.assign(this, { scene, who, x, y, tx: x, ty: y, t: Math.random(), anim: 'float', animT: 0, tagged: false, throwT: 0, type: who });
    this.throwT = who === 'frida' ? 1.5 : 3;
  }
  box() { return { x1: this.x - 9, x2: this.x + 9, y1: this.y - 44, y2: this.y - 2 }; }
  update(dt) {
    const sc = this.scene, c = sc.cfg;
    this.t += dt; this.animT += dt;
    // glide towards the target point
    const dx = this.tx - this.x, dy = this.ty - this.y, d = Math.hypot(dx, dy);
    if (d > 1) { const s = Math.min(d, c.twinGlideSpeed * dt); this.x += (dx / d) * s; this.y += (dy / d) * s; }
    if (this.anim !== 'float' && this.animT > 0.6 && !(this.anim === 'tagged')) { this.anim = 'float'; this.animT = 0; }
    if (this.tagged || !sc.twinsThrow) return;
    this.throwT -= dt;
    if (this.throwT <= 0) {
      this.throwT = sc.phase === 3 ? c.twinThrowEveryP3 : c.twinThrowEvery;
      this.anim = 'throw'; this.animT = 0;
      this.pendingThrow = 0.22;
    }
    if (this.pendingThrow != null) { this.pendingThrow -= dt; if (this.pendingThrow <= 0) { this.pendingThrow = null; sc.throwToy(this.x, this.y - 30); } }
  }
  draw(ctx) {
    const sp = this.scene.game.sprites, L = this.scene.liam, flip = L.x < this.x;
    const sheet = { float: 'twins_sv_float', throw: 'twins_sv_throw', command: 'twins_sv_command', tagged: 'twins_sv_tagged' }[this.anim];
    const s = sp.sheet(sheet), n = s?.grid?.[1] || 4;
    const fps = this.anim === 'float' ? 4 : 8;
    let col = Math.floor(this.animT * fps);
    col = this.anim === 'float' ? col % n : Math.min(col, n - 1);
    const bob = Math.round(Math.sin(this.t * 2.2) * 2);
    const a = this.scene.game.config.twins.ghostAlpha;
    if (sp.has(sheet)) sp.draw(ctx, sheet, 0, col, this.x, this.y + bob, { flip, alpha: a });
    else { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#e4e1db'; ctx.fillRect(Math.round(this.x) - 6, Math.round(this.y) - 40 + bob, 12, 38); ctx.restore(); }
    if (this.tagged) this.scene.drawTagMark(ctx, this.x, this.y - 52 + bob);
  }
}

// ---------------------------------------------------------------- projectiles
class Shot {
  constructor(scene, kind, x, y, vx, vy, frame = 0) { Object.assign(this, { scene, kind, x, y, vx, vy, frame, t: 0, alive: true, spin: 0 }); }
  box() { return { x1: this.x - 5, x2: this.x + 5, y1: this.y - 5, y2: this.y + 5 }; }
  update(dt) {
    const sc = this.scene, g = this.kind === 'sketch' ? sc.cfg.sketchGravity : sc.cfg.toyGravity;
    this.t += dt; this.vy += g * dt; this.x += this.vx * dt; this.y += this.vy * dt; this.spin += dt * 12;
    if (this.y > sc.groundY + 2 || this.x < -20 || this.x > 660 || this.t > 4) this.alive = false;
    if (this.kind === 'toy' && overlap(this.box(), sc.liam.box())) { if (sc.liam.hurt(this.x)) this.alive = false; }
    if (this.kind === 'sketch') {
      for (const e of sc.enemies) {
        if (!e.alive || e.state === 'knocked' || !overlap(this.box(), e.box())) continue;
        if (e.type === 'soldier') e.knock(); else e.hit(1);
        this.alive = false; break;
      }
    }
  }
  draw(ctx) {
    const X = Math.round(this.x), Y = Math.round(this.y), sp = this.scene.game.sprites;
    if (this.kind === 'toy' && sp.has('toy_projectiles')) {
      ctx.save(); ctx.translate(X, Y); ctx.rotate(Math.round(this.spin / (Math.PI / 2)) * (Math.PI / 2));
      sp.draw(ctx, 'toy_projectiles', 0, this.frame, 0, 9); ctx.restore();
      return;
    }
    // crumpled sketch: a balled-up page (code-drawn until the projectile has art)
    ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 4, Y - 4, 8, 8);
    ctx.fillStyle = '#f2e6cc'; ctx.fillRect(X - 3, Y - 3, 6, 6);
    ctx.fillStyle = '#cdb98f'; ctx.fillRect(X - 1 + (Math.floor(this.spin) % 2), Y - 2, 1, 4); ctx.fillRect(X - 3, Y + (Math.floor(this.spin) % 2), 4, 1);
  }
}

// ---------------------------------------------------------------- the scene
export class ToyFightScene {
  constructor(game, opts = {}) {
    this.game = game;
    this.name = 'toyfight';
    this.isSide = true;
    this.entities = [];
    this.groundY = this.cfg.groundY;
    this.left = 20; this.right = 620;
    this.fortX = 320;
    const F = this.fortX, G = this.groundY;
    // one-way platforms: the fort's towers and walkway (measured from the fort sprite), two bookshelf planks
    this.platforms = [
      { x1: F - 52, x2: F - 18, y: G - 66, oneWay: true, kind: 'fort' },
      { x1: F + 22, x2: F + 56, y: G - 66, oneWay: true, kind: 'fort' },
      { x1: F - 18, x2: F + 22, y: G - 46, oneWay: true, kind: 'fort' },
      { x1: 96, x2: 176, y: G - 58, oneWay: true, kind: 'shelf' },
      { x1: 464, x2: 544, y: G - 58, oneWay: true, kind: 'shelf' },
    ];
    this.anchors = [[F - 35, G - 66], [F + 39, G - 66], [136, G - 58], [504, G - 58], [F + 2, G - 46], [220, G - 112], [420, G - 112]];
    this.floaters = [];
    this.fadeAlpha = 1;
    this.phase = clamp(+opts.phase || game.chapter?.fightPhase || 1, 1, PHASES);
    this.startPhase(this.phase, { hp: opts.hp });
  }

  get cfg() { return this.game.config.side; }
  get T() { return this.game.texts.twins || {}; }
  get liamX() { return this.liam.x; }

  // ---------------------------------------------------------------- phases
  startPhase(n, { hp = null, retry = false } = {}) {
    const G = this.groundY;
    this.phase = n;
    if (this.game.chapter) this.game.chapter.fightPhase = n;
    this.liam = new LiamSide(this, 120, G);
    if (hp) this.liam.hp = clamp(+hp, 1, this.cfg.liamHp);
    this.enemies = [];
    this.shots = [];
    this.wave = 0;
    this.waveSpawn = [];
    this.twins = [new TwinSide(this, 'frida', this.anchors[0][0], this.anchors[0][1]), new TwinSide(this, 'wilhelmina', this.anchors[1][0], this.anchors[1][1])];
    this.twinsThrow = false;
    this.cleared = false;
    this.fortFrame = 0;
    this.script = new Script(this.intro(n, retry), `phase${n}`);
  }

  *intro(n, retry) {
    const g = this.game, F = this.T.fight || {};
    this.liam.mode = 'scripted';
    yield this.fade(0, 0.5);
    if (!retry) yield say(g, this.lines(F[`phase${n}`]));
    else this.banner(F.retry || 'Again.');
    if (n === 1 || n === 3) for (const t of this.twins) { t.anim = 'command'; t.animT = 0; }
    yield wait(0.6);
    this.liam.mode = 'free';
    if (n === 1) { this.twinsThrow = true; this.nextWave(); }
    if (n === 2) { this.enemies.push(new Horse(this, 560, -1)); this.twinsThrow = false; }
    if (n === 3) { this.twinsThrow = true; this.twinMoveT = 0; }
  }

  nextWave() {
    const waves = this.cfg.waves;
    this.wave++;
    if (this.wave > waves.length) return this.phaseClear();
    this.banner(`${this.T.fight?.wave || 'Wave'} ${this.wave}/${waves.length}`);
    const n = waves[this.wave - 1];
    this.waveSpawn = [...Array(n).keys()].map((i) => ({ t: 0.8 + i * this.cfg.soldierSpawnGap, side: i % 2 ? 1 : -1 }));
  }

  phaseClear() {
    if (this.cleared) return;
    this.cleared = true;
    this.twinsThrow = false;
    this.script = new Script(this.afterPhase(), 'clear');
  }

  *afterPhase() {
    const g = this.game, F = this.T.fight || {};
    this.liam.mode = 'scripted';
    this.shots = [];
    yield wait(0.8);
    yield say(g, this.lines(F[`clear${this.phase}`]));
    if (this.phase < PHASES) {
      yield this.fade(1, 0.5);
      this.startPhase(this.phase + 1);
      return;
    }
    // won: back to the nursery for "your turn"
    this.fortFrame = 1;
    yield say(g, this.lines(F.won));
    yield this.fade(1, 0.8);
    if (g.chapter) { g.chapter.step = 'yourTurn'; g.chapter.fightPhase = 1; }
    g.switchScene('twins', { room: 'nursery' });
  }

  defeat() {
    if (this.script && this.script.name === 'defeat') return;
    this.liam.state = 'defeated'; this.liam.stateT = 0; this.liam.mode = 'scripted';
    this.twinsThrow = false;
    this.script = new Script(this.lose(), 'defeat');
  }

  *lose() {
    const g = this.game;
    yield wait(0.6);
    this.banner(this.T.fight?.defeat || 'Liam panics.');
    yield wait(1.2);
    yield this.fade(1, 0.5);
    this.startPhase(this.phase, { retry: true });
  }

  // ---------------------------------------------------------------- actions
  throwSketch(L) {
    const c = this.cfg;
    this.shots.push(new Shot(this, 'sketch', L.x + L.facing * 12, L.y - 34, L.facing * c.sketchSpeed, -c.sketchLift));
  }

  throwToy(x, y) {
    const L = this.liam, T = this.cfg.toyFlightSeconds, g = this.cfg.toyGravity;
    const tx = L.x + this.game.rng.range(-20, 20), ty = L.y - 24;
    const vx = (tx - x) / T, vy = (ty - y - 0.5 * g * T * T) / T;
    this.shots.push(new Shot(this, 'toy', x, y, vx, vy, this.game.rng.int(5)));
  }

  floatText(text, x, y) { this.floaters.push({ text, x, y, t: 0, life: 1.2 }); }
  banner(text) { this.bannerMsg = { text, t: 0 }; }

  lines(list) {
    const def = { liam: 'flat', twins: 'stare', ambrose: 'composed' };
    return [].concat(list || []).map((l) => (typeof l === 'string' ? { text: l, speaker: 'liam', portrait: 'flat' } : { text: l.text, speaker: l.who || 'liam', portrait: l.face || def[l.who || 'liam'] }));
  }

  fade(to, seconds) {
    const from = this.fadeAlpha;
    let t = 0;
    return { update: (dt) => { t += dt; this.fadeAlpha = from + (to - from) * Math.min(1, t / seconds); return t >= seconds; } };
  }

  floorUnder(x, y) {
    let best = this.groundY;
    for (const p of this.platforms) if (x > p.x1 && x < p.x2 && p.y >= y - 1 && p.y < best) best = p.y;
    return best;
  }

  // ---------------------------------------------------------------- update
  update(dt) {
    const g = this.game, L = this.liam;
    if (this.script) { this.script.update(dt); if (this.script?.done) this.script = null; }
    if (g.input.wasPressed('interact') && g.ui.speaking && g.ui.messages.length > 1) g.ui.skip();
    if (g.ui.speaking && this.script) return; // talking freezes the fight
    L.update(dt);
    for (const t of this.twins) t.update(dt);
    for (const e of this.enemies) e.update(dt);
    for (const s of this.shots) s.update(dt);
    for (const e of this.entities) e.update?.(dt);
    // the cape swipe knocks soldiers down, hurts a toppled horse and tags the Twins
    if (L.swipeActive()) {
      const hb = L.swipeBox();
      for (const e of this.enemies) {
        if (!e.alive || !overlap(hb, e.box())) continue;
        if (e.type === 'soldier') e.knock();
        else if (!e.swipedAt || e.swipedAt !== L.anim) { e.swipedAt = L.anim; e.hit(this.cfg.swipeDamage); }
      }
    }
    if (this.phase === 3 && !this.cleared) {
      for (const t of this.twins) {
        if (t.tagged) continue;
        if (overlap(L.box(), t.box()) || (L.swipeActive() && overlap(L.swipeBox(), t.box()))) {
          t.tagged = true; t.anim = 'tagged'; t.animT = 0;
          this.floatText(this.T.fight?.tagged || 'tag!', t.x, t.y - 60);
        }
      }
      this.twinMoveT = (this.twinMoveT ?? 0) - dt;
      if (this.twinMoveT <= 0 && !this.script) {
        this.twinMoveT = this.cfg.twinMoveEvery;
        for (const t of this.twins) {
          if (t.tagged) continue;
          const taken = this.twins.filter((o) => o !== t).map((o) => `${o.tx},${o.ty}`);
          const options = this.anchors.filter((a) => !taken.includes(`${a[0]},${a[1]}`) && Math.hypot(a[0] - t.x, a[1] - t.y) > 10);
          const [ax, ay] = g.rng.pick(options);
          t.tx = ax; t.ty = ay;
        }
      }
      if (this.twins.every((t) => t.tagged)) this.phaseClear();
    }
    // waves of soldiers
    if (this.phase === 1 && !this.cleared && !this.script) {
      for (const w of this.waveSpawn) {
        w.t -= dt;
        if (w.t <= 0 && !w.done) { w.done = true; this.enemies.push(new Soldier(this, w.side < 0 ? this.left - 20 : this.right + 20, -w.side)); }
      }
      if (this.waveSpawn.length && this.waveSpawn.every((w) => w.done) && this.enemies.every((e) => !e.alive)) {
        this.enemies = []; this.waveSpawn = [];
        this.waveGap = this.cfg.waveGapSeconds;
      }
      if (this.waveGap != null) { this.waveGap -= dt; if (this.waveGap <= 0) { this.waveGap = null; this.nextWave(); } }
    }
    if (this.phase === 2 && !this.cleared && this.enemies.length && this.enemies.every((e) => !e.alive) && !this.script) this.phaseClear();
    this.enemies = this.enemies.filter((e) => e.alive || e.type === 'horse');
    this.shots = this.shots.filter((s) => s.alive);
    for (const f of this.floaters) { f.t += dt; f.y -= 14 * dt; }
    this.floaters = this.floaters.filter((f) => f.t < f.life);
    if (this.bannerMsg) { this.bannerMsg.t += dt; if (this.bannerMsg.t > 1.8) this.bannerMsg = null; }
  }

  // ---------------------------------------------------------------- testing tools
  spawnables() { return SIDE_SPAWNABLE; }
  spawn(type, x) {
    const g = this.game;
    if (type === 'dialogue') { g.ui.say(g.texts.debug?.testDialogue || 'Test dialogue.', { portrait: 'smug' }); return null; }
    x = clamp(x, this.left, this.right);
    if (type === 'soldier') { const s = new Soldier(this, x, x < this.liam.x ? 1 : -1); this.enemies.push(s); return s; }
    if (type === 'horse') { const h = new Horse(this, x, x < this.liam.x ? 1 : -1); this.enemies.push(h); return h; }
    if (type === 'toy') { this.throwToy(this.twins[0].x, this.twins[0].y - 30); return null; }
    return null;
  }
  clearPhase() { this.enemies.forEach((e) => { e.alive = false; }); this.twins.forEach((t) => { t.tagged = true; }); this.wave = this.cfg.waves.length; this.phaseClear(); }

  // ---------------------------------------------------------------- drawing
  actors() { return [this.liam, ...this.enemies, ...this.twins]; }
  allLights() { return []; }

  draw(ctx) {
    const sp = this.game.sprites, G = this.groundY, L = this.liam, c = this.cfg;
    ctx.fillStyle = '#e9dcc0'; ctx.fillRect(0, 0, 640, 360);
    // far: the moonlit window, a slow parallax
    const px = (320 - L.x) * 0.04;
    if (sp.has('bg_picturebook_far')) sp.draw(ctx, 'bg_picturebook_far', 0, 0, 320 + px, G + c.farDrop);
    // mid: giant toys, dimmed so the fight reads in front of them
    if (sp.has('bg_picturebook_mid')) sp.draw(ctx, 'bg_picturebook_mid', 0, 0, 320 + px * 2.5, G + 4, { alpha: c.midAlpha });
    // a wash of page colour pushes the picture back, so the fight reads in front of it
    ctx.save(); ctx.globalAlpha = c.backWash; ctx.fillStyle = '#e9dcc0'; ctx.fillRect(0, 0, 640, G); ctx.restore();
    // ground
    for (let x = 0; x < 640; x += 16) {
      if (!sp.drawTile(ctx, 'tiles_picturebook', 'ground', 1 + (x / 16) % 3, x, G)) { ctx.fillStyle = '#8a6142'; ctx.fillRect(x, G, 16, 6); }
      for (let y = G + 14; y < 360; y += 16) if (!sp.drawTile(ctx, 'tiles_picturebook', 'fill', (x / 16 + y) % 2, x, y)) { ctx.fillStyle = '#d3c29f'; ctx.fillRect(x, y, 16, 16); }
    }
    // the fort
    if (sp.has('prop_toyfort')) sp.draw(ctx, 'prop_toyfort', 0, this.fortFrame, this.fortX, G + 1);
    else { ctx.fillStyle = '#a4433a'; ctx.fillRect(this.fortX - 56, G - 66, 112, 66); }
    // shelves
    for (const p of this.platforms.filter((q) => q.kind === 'shelf')) {
      for (let x = p.x1; x < p.x2; x += 16) {
        const i = x === p.x1 ? 0 : x + 16 >= p.x2 ? 2 : 1;
        if (!sp.drawTile(ctx, 'tiles_picturebook', 'shelf', i, x, p.y)) { ctx.fillStyle = '#56402f'; ctx.fillRect(x, p.y, 16, 4); }
      }
    }
    const list = [...this.twins, ...this.enemies, this.liam].sort((a, b) => a.y - b.y);
    for (const e of list) e.draw(ctx);
    for (const s of this.shots) s.draw(ctx);
    if (this.game.overlays.hitbox) this.drawHitboxes(ctx);
    if (this.fadeAlpha > 0) { ctx.save(); ctx.globalAlpha = this.fadeAlpha; ctx.fillStyle = '#0d0b12'; ctx.fillRect(0, 0, 640, 360); ctx.restore(); }
  }

  drawTagMark(ctx, x, y) {
    ctx.fillStyle = '#a4433a';
    ctx.fillRect(Math.round(x) - 1, Math.round(y) - 4, 3, 3); ctx.fillRect(Math.round(x) - 3, Math.round(y) - 2, 7, 3); ctx.fillRect(Math.round(x) - 1, Math.round(y) + 1, 3, 2);
  }

  drawHitboxes(ctx) {
    const r = (b, col) => { ctx.strokeStyle = col; ctx.strokeRect(Math.round(b.x1) + 0.5, Math.round(b.y1) + 0.5, b.x2 - b.x1, b.y2 - b.y1); };
    r(this.liam.box(), '#00ff88');
    if (this.liam.swipeActive()) r(this.liam.swipeBox(), '#ffff00');
    for (const e of this.enemies) { r(e.box(), '#ff4040'); if (e.type === 'soldier' && e.state === 'lunge') r(e.bayonet(), '#ff00ff'); }
    for (const t of this.twins) r(t.box(), '#c0a0ff');
    for (const s of this.shots) r(s.box(), '#ffaa00');
    for (const p of this.platforms) { ctx.strokeStyle = '#00c0ff'; ctx.beginPath(); ctx.moveTo(p.x1, p.y + 0.5); ctx.lineTo(p.x2, p.y + 0.5); ctx.stroke(); }
  }

  drawUI(ui) {
    const c = ui.ctx, L = this.liam, F = this.T.fight || {};
    // hit points: little crumpled pages
    ui.panel(10, 10, 14 + this.cfg.liamHp * 12, 18);
    for (let i = 0; i < this.cfg.liamHp; i++) {
      c.fillStyle = '#1a1020'; c.fillRect(16 + i * 12, 14, 10, 10);
      c.fillStyle = i < L.hp ? '#f2e6cc' : '#3a3340'; c.fillRect(17 + i * 12, 15, 8, 8);
    }
    const label = `${F.title || 'The toy army'}  ·  ${this.phase}/${PHASES}`;
    ui.text(label, 630, 12, { size: 10, align: 'right' });
    if (this.phase === 2) {
      const h = this.enemies.find((e) => e.type === 'horse');
      if (h) { const w = 120; ui.panel(260, 30, w, 8); c.fillStyle = '#a4433a'; c.fillRect(260, 30, Math.round(w * Math.max(0, h.hp) / this.cfg.horseHp), 8); }
    }
    for (const f of this.floaters) { c.save(); c.globalAlpha = Math.max(0, 1 - f.t / f.life); ui.text(f.text, f.x, f.y, { size: 10, align: 'center' }); c.restore(); }
    if (this.bannerMsg) {
      ui.font(14);
      const w = Math.ceil(c.measureText(this.bannerMsg.text).width) + 24;
      ui.panel(320 - w / 2, 120, w, 26);
      ui.text(this.bannerMsg.text, 320, 125, { size: 14, align: 'center', color: '#c9d3e0' });
    }
    if (this.phase === 1 && this.wave === 1 && !ui.speaking && this.liam.mode === 'free' && (this.hintT = (this.hintT ?? 6) - 1 / 60) > 0) {
      const hint = F.controls || 'Move: A/D  Jump: W/Space  Swipe: E/J  Throw sketch: F/K';
      ui.font(10); const w = Math.ceil(c.measureText(hint).width) + 14;
      ui.panel(320 - w / 2, 34, w, 16); ui.text(hint, 320, 36, { size: 10, align: 'center', outline: false });
    }
  }

  // ---------------------------------------------------------------- save states
  serialize() { return { phase: this.phase, hp: this.liam.hp, chapter: this.game.chapter ? JSON.parse(JSON.stringify(this.game.chapter)) : null }; }
  restore(s) { if (s.chapter) this.game.chapter = s.chapter; this.startPhase(s.phase || 1, { hp: s.hp, retry: true }); }
  testParams() { return { phase: this.phase, hp: this.liam.hp }; }

  describe() {
    const h = this.enemies.find((e) => e.type === 'horse');
    return `phase ${this.phase}  wave ${this.wave}  hp ${this.liam.hp}  enemies ${this.enemies.filter((e) => e.alive).length}  shots ${this.shots.length}${h ? `  horse ${h.state} hp ${h.hp}` : ''}  tagged ${this.twins.filter((t) => t.tagged).length}  script ${this.script?.name || '-'}`;
  }
}
