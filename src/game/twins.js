// Frida and Wilhelmina in the house (top-down). Only Frida is drawn; Wilhelmina is Frida
// mirrored, so her bow is on the other side. They are ghosts: drawn a little see-through.
// x, y = the point between the feet.

const IDLE = { sheet: 'twins_td_idle', name: 'idle' };
const WALK = { sheet: 'twins_td_walk', name: 'walk' };

export class Twin {
  constructor(scene, who, x, y, dir = 'down') {
    this.scene = scene;
    this.type = who;
    this.who = who;
    this.mirror = who === 'wilhelmina';
    this.x = x; this.y = y; this.dir = dir;
    this.visible = true;
    this.alpha = 0;            // fades in when shown
    this.targetAlpha = 1;
    this.anim = { ...IDLE, row: dir, t: 0 };
    this.onDone = null;
    this.t = Math.random() * 3;
  }

  get game() { return this.scene.game; }

  show(on = true, instant = false) {
    this.visible = on || this.visible;
    this.targetAlpha = on ? 1 : 0;
    if (instant) { this.alpha = this.targetAlpha; this.visible = on; }
  }

  animDef(a = this.anim) { const s = this.game.sprites.sheet(a.sheet); return s?.anims?.[a.name]; }

  setAnim(a, row = this.dir) {
    if (this.anim.sheet !== a.sheet || this.anim.name !== a.name) this.anim = { ...a, row, t: 0 };
    this.anim.row = row;
  }

  // a one-off animation (giggle, point, peek, count); returns to idle when it ends
  play(sheet, name, row = 'down', onDone = null, hold = false) {
    this.anim = { sheet, name, row, t: 0, hold };
    this.onDone = onDone;
  }

  animDone() { const d = this.animDef(); return !d || (!d.loop && this.anim.t * d.fps >= d.frames.length); }

  frameIndex() {
    const d = this.animDef();
    if (!d) return 0;
    let i = Math.floor(this.anim.t * d.fps);
    // loopCount: the counting animation repeats (hands over the eyes, nodding) instead of ending
    i = d.loop || this.anim.loopCount ? i % (this.anim.loopCount ? d.frames.length - 1 : d.frames.length) : Math.min(i, d.frames.length - 1);
    return d.frames[i];
  }

  // hook used by walkTo() in cutscenes
  walk(dx, dy, moving) {
    if (moving) {
      if (Math.abs(dx) > Math.abs(dy)) this.dir = dx > 0 ? 'right' : 'left';
      else this.dir = dy > 0 ? 'down' : 'up';
      this.setAnim(WALK);
    } else this.setAnim(IDLE);
  }

  face(x, y) {
    const dx = x - this.x, dy = y - this.y;
    if (Math.abs(dx) > Math.abs(dy)) this.dir = dx > 0 ? 'right' : 'left'; else this.dir = dy > 0 ? 'down' : 'up';
    if (this.anim.sheet === IDLE.sheet) this.anim.row = this.dir;
  }

  update(dt) {
    this.t += dt;
    this.anim.t += dt;
    const fade = this.game.config.twins.fadeSeconds;
    if (this.alpha < this.targetAlpha) this.alpha = Math.min(this.targetAlpha, this.alpha + dt / fade);
    else if (this.alpha > this.targetAlpha) this.alpha = Math.max(this.targetAlpha, this.alpha - dt / fade);
    if (this.alpha <= 0 && this.targetAlpha <= 0) this.visible = false;
    const oneOff = this.anim.sheet !== IDLE.sheet && this.anim.sheet !== WALK.sheet;
    if (oneOff && !this.anim.hold && this.animDone()) {
      const cb = this.onDone; this.onDone = null;
      this.anim = { ...IDLE, row: this.dir, t: 0 };
      if (cb) cb();
    }
  }

  rowFor(sheetName, row) {
    const rows = this.game.sprites.sheet(sheetName)?.rows || ['down'];
    let r = row, flip = false;
    if (row === 'right') { r = rows.includes('left') ? 'left' : rows[0]; flip = rows.includes('left'); }
    else if (!rows.includes(row)) r = rows[0];
    // Wilhelmina = Frida mirrored. In profile the two look the same, so only front/back views flip.
    if (this.mirror && (r === 'down' || r === 'up')) flip = !flip;
    return { row: r, flip };
  }

  draw(ctx) {
    if (!this.visible || this.alpha <= 0.01) return;
    const T = this.game.config.twins;
    const a = this.alpha * (T.ghostAlpha + Math.sin(this.t * 2.3) * T.shimmer);
    ctx.save();
    ctx.globalAlpha = 0.2 * this.alpha;
    ctx.fillStyle = '#1a1020';
    ctx.beginPath(); ctx.ellipse(Math.round(this.x), Math.round(this.y), 7, 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    const { row, flip } = this.rowFor(this.anim.sheet, this.anim.row);
    const sp = this.game.sprites;
    if (sp.has(this.anim.sheet)) sp.draw(ctx, this.anim.sheet, row, this.frameIndex(), this.x, this.y, { flip, alpha: a });
    else {
      // placeholder: pale little girl with a bow on the correct side
      ctx.save(); ctx.globalAlpha = a;
      const X = Math.round(this.x), Y = Math.round(this.y), s = this.mirror ? -1 : 1;
      ctx.fillStyle = '#8d8b90'; ctx.fillRect(X - 6, Y - 22, 12, 22);
      ctx.fillStyle = '#e4e1db'; ctx.fillRect(X - 4, Y - 20, 8, 16);
      ctx.fillStyle = '#cfcdd1'; ctx.fillRect(X - 5, Y - 34, 10, 12);
      ctx.fillStyle = '#3a3740'; ctx.fillRect(X - 6, Y - 37, 12, 6);
      ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 3, Y - 30, 2, 3); ctx.fillRect(X + 1, Y - 30, 2, 3);
      ctx.fillStyle = '#f2f0ec'; ctx.fillRect(X + 3 * s - (s < 0 ? 4 : 0), Y - 40, 5, 4);
      ctx.restore();
    }
  }

  // a faint cold glow, so the Twins can be seen in a dark room
  lights() {
    if (!this.visible || this.alpha <= 0.05) return [];
    return [{ x: this.x, y: this.y - 24, r: this.game.config.twins.glowRadius, intensity: this.alpha * 0.7, warm: false, kind: 'ghost' }];
  }

  serialize() { return { who: this.who, x: this.x, y: this.y, dir: this.dir, visible: this.visible, targetAlpha: this.targetAlpha }; }
  restore(s) {
    Object.assign(this, { x: s.x, y: s.y, dir: s.dir, visible: s.visible, targetAlpha: s.targetAlpha, alpha: s.targetAlpha });
    this.anim = { ...IDLE, row: this.dir, t: 0 };
  }
}
