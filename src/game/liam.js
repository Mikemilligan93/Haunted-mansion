// Liam in top-down mode: walking in 4 directions, idle, fidgets, inspect, door pose,
// and bat form (controlled flight, or panic flight that he can barely steer).
// x, y = the point between his feet (as a bat: the spot on the floor under him).
import { clamp } from '../engine/util.js';

const MOVE_ANIM = { sheet: 'liam_td_walk', name: 'walk' };
const IDLE_ANIM = { sheet: 'liam_td_idle', name: 'idle' };

export class Liam {
  constructor(game, x, y, dir = 'down') {
    this.game = game;
    this.x = x; this.y = y;
    this.dir = dir;
    this.mode = 'free';        // free | action | scripted
    this.anim = { ...IDLE_ANIM, row: 'down', t: 0 };
    this.onAnimDone = null;
    this.idleTime = 0;
    this.speedNow = 0;
    this.inSun = false;
    this.form = 'human';       // human | transforming | bat
    this.panicLeft = 0;        // seconds of panic flight left (0 = controlled)
    this.seq = null;           // transformation steps
  }

  // ---------------------------------------------------------------- bat form
  // toBat: startle -> smoke -> bat.  Back: the smoke played in reverse.
  transform(toBat, { panic = false } = {}) {
    if (this.form === 'transforming' || (toBat && this.form === 'bat') || (!toBat && this.form === 'human')) return false;
    const steps = toBat
      ? [{ sheet: 'liam_td_startle', name: 'startle', row: this.dir }, { sheet: 'liam_bat_transform', name: 'transform', row: 'down' }]
      : [{ sheet: 'liam_bat_transform', name: 'transform', row: 'down', reverse: true }];
    this.form = 'transforming';
    this.mode = 'scripted';
    this.onAnimDone = null;
    this.seq = { steps, i: 0, toBat, panic };
    this.anim = { ...steps[0], t: 0 };
    this.speedNow = 0;
    return true;
  }

  finishTransform() {
    const { toBat, panic } = this.seq;
    this.seq = null;
    this.mode = 'free';
    if (toBat) {
      this.form = 'bat';
      this.panicLeft = panic ? this.game.config.bat.panicSeconds : 0;
      this.panicTurn = 0;
      this.anim = { sheet: 'liam_bat_fly', name: 'fly', row: this.dir, t: 0 };
    } else {
      this.form = 'human';
      this.dir = 'down';
      this.idleTime = 0;
      this.anim = { ...IDLE_ANIM, row: 'down', t: 0 };
    }
  }

  updateBat(dt, scene) {
    const g = this.game, B = g.config.bat, inp = g.input;
    let dx = (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0);
    let dy = (inp.isDown('down') ? 1 : 0) - (inp.isDown('up') ? 1 : 0);
    let speed = B.speed;
    if (this.panicLeft > 0) {
      // panic: lurches in random directions; the keys only nudge him
      this.panicLeft -= dt;
      this.panicTurn -= dt;
      if (this.panicTurn <= 0) {
        this.panicTurn = B.panicTurnSeconds * g.rng.range(0.6, 1.4);
        const a = g.rng.range(0, Math.PI * 2);
        this.panicVec = [Math.cos(a), Math.sin(a)];
      }
      dx = this.panicVec[0] + dx * B.panicControl;
      dy = this.panicVec[1] + dy * B.panicControl;
      speed = B.panicSpeed;
      if (this.panicLeft <= 0) { this.panicLeft = 0; this.transform(false); return; }
    }
    const len = Math.hypot(dx, dy);
    this.inSun = false;
    if (len > 0.01) {
      if (Math.abs(dx) > Math.abs(dy) * 1.2) this.dir = dx > 0 ? 'right' : 'left';
      else if (Math.abs(dy) > 0.01) this.dir = dy > 0 ? 'down' : 'up';
      const b = scene.room.bounds();
      const nx = this.x + (dx / len) * speed * dt, ny = this.y + (dy / len) * speed * dt;
      // panic: bounce off the walls instead of sliding along them
      if (this.panicLeft > 0 && (nx < b.x1 || nx > b.x2)) this.panicVec[0] *= -1;
      if (this.panicLeft > 0 && (ny < b.y1 || ny > b.y2)) this.panicVec[1] *= -1;
      this.x = clamp(nx, b.x1, b.x2);
      this.y = clamp(ny, b.y1, b.y2);
      this.speedNow = speed;
    } else this.speedNow = 0;
    this.anim.row = this.dir;
    this.anim.rate = this.panicLeft > 0 ? 1.6 : 1;
  }

  // ---------------------------------------------------------------- animation
  animDef(a = this.anim) {
    const s = this.game.sprites.sheet(a.sheet);
    return s && s.anims && s.anims[a.name];
  }

  play(sheet, name, { row = null, onDone = null, mode = 'action' } = {}) {
    this.anim = { sheet, name, row: row ?? this.dir, t: 0 };
    this.onAnimDone = onDone;
    this.mode = mode;
  }

  frameIndex() {
    const d = this.animDef();
    if (!d) return 0;
    const frames = this.anim.reverse ? [...d.frames].reverse() : d.frames;
    const n = frames.length;
    let i = Math.floor(this.anim.t * d.fps);
    i = d.loop ? i % n : Math.min(i, n - 1);
    return frames[i];
  }

  animFinished() {
    const d = this.animDef();
    return !d || (!d.loop && this.anim.t * d.fps >= d.frames.length);
  }

  rowFor(sheetName, row) {
    // right-facing = the left row mirrored
    const rows = this.game.sprites.sheet(sheetName)?.rows || ['down'];
    if (row === 'right') return { row: rows.includes('left') ? 'left' : rows[0], flip: true };
    if (rows.includes(row)) return { row, flip: false };
    return { row: rows[0], flip: false };
  }

  // ---------------------------------------------------------------- update
  update(dt, scene) {
    const g = this.game, cfg = g.config.liam, inp = g.input;
    this.anim.t += dt * (this.anim.rate || 1);

    if (this.form === 'transforming') {
      if (this.animFinished()) {
        const sq = this.seq;
        sq.i++;
        if (sq.i < sq.steps.length) this.anim = { ...sq.steps[sq.i], t: 0 };
        else this.finishTransform();
      }
      return;
    }
    if (this.form === 'bat') { if (this.mode === 'free') this.updateBat(dt, scene); return; }

    if (this.mode === 'action' && this.animFinished()) {
      const cb = this.onAnimDone;
      this.onAnimDone = null;
      this.mode = 'free';
      this.setAnim(IDLE_ANIM);
      if (cb) cb();
    }
    if (this.mode !== 'free' && this.mode !== 'action') return;

    let dx = (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0);
    let dy = (inp.isDown('down') ? 1 : 0) - (inp.isDown('up') ? 1 : 0);
    const moving = dx || dy;
    // moving interrupts fidgets and the door pose, but not inspecting
    if (this.mode === 'action') {
      if (moving && this.anim.sheet !== 'liam_td_inspect') { this.mode = 'free'; this.onAnimDone = null; } else return;
    }

    this.inSun = scene.room.inSun(this.x, this.y) && scene.room.sunStrength() >= g.config.sunbeam.minStrengthToSlow;
    if (moving) {
      if (dx && dy) {
        // diagonal: keep the current facing if it matches one of the keys
        const keep = (this.dir === 'left' && dx < 0) || (this.dir === 'right' && dx > 0) || (this.dir === 'up' && dy < 0) || (this.dir === 'down' && dy > 0);
        if (!keep) this.dir = dx > 0 ? 'right' : 'left';
      } else if (dx) this.dir = dx > 0 ? 'right' : 'left';
      else this.dir = dy > 0 ? 'down' : 'up';
      const len = Math.hypot(dx, dy);
      const speed = cfg.walkSpeed * (this.inSun ? cfg.sunSlowFactor : 1);
      this.speedNow = speed;
      const b = scene.room.bounds();
      const nx = clamp(this.x + (dx / len) * speed * dt, b.x1, b.x2);
      const ny = clamp(this.y + (dy / len) * speed * dt, b.y1, b.y2);
      // furniture: slide along it instead of stopping dead
      if (!scene.room.blocked(nx, this.y)) this.x = nx;
      if (!scene.room.blocked(this.x, ny)) this.y = ny;
      this.setAnim(MOVE_ANIM, this.inSun ? cfg.sunSlowFactor : 1);
      this.idleTime = 0;
    } else {
      this.speedNow = 0;
      this.setAnim(IDLE_ANIM);
      this.idleTime += dt;
      if (this.idleTime > cfg.fidgetAfterSeconds && !g.ui.speaking) {
        this.idleTime = -cfg.fidgetAfterSeconds; // wait twice as long before the next one
        const kind = g.rng.pick(['cape', 'hair', 'rehearse']);
        this.dir = 'down';
        this.play('liam_td_fidget', 'fidget', { row: kind });
        const line = g.texts.fidget?.[kind];
        if (line) g.ui.say(line, { portrait: kind === 'rehearse' ? 'embarrassed' : 'flat' });
      }
    }
  }

  setAnim(a, rate = 1) {
    if (this.anim.sheet !== a.sheet || this.anim.name !== a.name) this.anim = { ...a, row: this.dir, t: 0 };
    this.anim.row = this.dir;
    this.anim.rate = rate;
  }

  // ---------------------------------------------------------------- drawing
  // how high the bat floats above its floor spot (with a gentle bob)
  hover() {
    if (this.form === 'transforming') return this.transformLift();
    if (this.form !== 'bat') return 0;
    const B = this.game.config.bat;
    return B.hover + Math.round(Math.sin(this.anim.t * B.bobSpeed) * B.bobPixels);
  }

  // During the smoke puff, glide from standing on the floor (first frame) to exactly where
  // the flying bat hovers (last frame), so the bat doesn't jump when flight starts.
  transformLift() {
    if (this.anim.sheet !== 'liam_bat_transform') return 0;
    const sp = this.game.sprites, T = sp.sheet('liam_bat_transform'), F = sp.sheet('liam_bat_fly');
    const d = T?.anims?.transform;
    if (!d || !T.bounds || !F?.bounds) return 0;
    const last = d.frames[d.frames.length - 1];
    const tb = T.bounds[0][last], fb = F.bounds[0][0];
    if (!tb || !fb) return 0;
    const batInTransform = (tb[1] + tb[3]) / 2 - T.origin[1];   // bat centre relative to the feet
    const batInFlight = (fb[1] + fb[3]) / 2 - F.origin[1];      // bat centre relative to the hover point
    const target = -(this.game.config.bat.hover) + batInFlight - batInTransform; // offset that lines them up
    const n = d.frames.length;
    let k = Math.min(n - 1, Math.floor(this.anim.t * d.fps));
    if (this.anim.reverse) k = n - 1 - k;
    return -Math.round(target * (k / (n - 1)));
  }

  draw(ctx) {
    // soft contact shadow (smaller and lighter for the floating bat)
    const bat = this.form === 'bat';
    ctx.save();
    ctx.globalAlpha = bat ? 0.18 : 0.28;
    ctx.fillStyle = '#1a1020';
    ctx.beginPath();
    ctx.ellipse(Math.round(this.x), Math.round(this.y), bat ? 6 : 10, bat ? 2 : 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const { row, flip } = this.rowFor(this.anim.sheet, this.anim.row);
    this.game.sprites.draw(ctx, this.anim.sheet, row, this.frameIndex(), this.x, this.y - this.hover(), { flip });
  }

  hitbox() {
    const [w, h] = this.game.config.liam.hitbox;
    return { x: this.x - w / 2, y: this.y - h / 2, w, h };
  }

  serialize() {
    // a transformation in progress is saved as its end result
    const form = this.form === 'transforming' ? (this.seq?.toBat ? 'bat' : 'human') : this.form;
    return { x: this.x, y: this.y, dir: this.dir, mode: this.mode === 'scripted' ? 'free' : this.mode, idleTime: this.idleTime, form, panicLeft: this.panicLeft };
  }

  restore(s) {
    Object.assign(this, { x: s.x, y: s.y, dir: s.dir, mode: s.mode === 'action' ? 'free' : s.mode, idleTime: s.idleTime });
    this.form = s.form || 'human';
    this.seq = null;
    this.panicLeft = s.panicLeft || 0;
    this.panicTurn = 0;
    this.anim = this.form === 'bat' ? { sheet: 'liam_bat_fly', name: 'fly', row: s.dir, t: 0 } : { ...IDLE_ANIM, row: s.dir, t: 0 };
  }

  // jump straight into bat form (testing: ?bat=1)
  setBat() {
    this.form = 'bat'; this.mode = 'free'; this.seq = null; this.panicLeft = 0;
    this.anim = { sheet: 'liam_bat_fly', name: 'fly', row: this.dir, t: 0 };
  }
}
