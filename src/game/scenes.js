// Scenes: the test room (the demo) and the sandbox (empty room + animation viewer).
import { Room } from './room.js';
import { Liam } from './liam.js';
import { Lighting, sconcesLit } from './lighting.js';
import { Ambrose } from './ambrose.js';

// ---------------------------------------------------------------- spawnable entities
// Anything the testing modal can spawn. Each has update/draw/serialize and may emit light.
export const SPAWNABLE = {
  candle: { label: 'Standing candle (light)' },
  liamDummy: { label: 'Liam dummy (plays an animation)' },
  ambrose: { label: 'Ambrose (test room: moves him here)' },
  dialogue: { label: 'Cutscene: test dialogue' },
};

class Entity {
  constructor(scene, type, x, y, extra = {}) { Object.assign(this, { scene, type, x, y, ...extra }); this.t = 0; }
  get game() { return this.scene.game; }
  update(dt) { this.t += dt; }
  lights() { return []; }
  serialize() { return { type: this.type, x: this.x, y: this.y, anim: this.anim }; }
}

class Candle extends Entity {
  draw(ctx) {
    const lit = true;
    const f = 1 + (Math.floor(this.t * 7) % 3);
    ctx.fillStyle = '#3e2c22'; ctx.fillRect(Math.round(this.x) - 4, Math.round(this.y) - 3, 8, 3);
    this.game.sprites.draw(ctx, 'prop_sconce', 0, lit ? f : 0, this.x, this.y - 2);
  }
  lights() { return [{ x: this.x, y: this.y - 30, r: this.game.config.light.sconceRadius, intensity: 1, warm: true, kind: 'candle' }]; }
}

class LiamDummy extends Entity {
  constructor(...a) {
    super(...a);
    this.anim = this.anim || { sheet: 'liam_td_walk', name: 'walk', row: 'down' };
  }
  draw(ctx) {
    const sp = this.game.sprites;
    const s = sp.sheet(this.anim.sheet);
    const d = s?.anims?.[this.anim.name];
    const col = d ? d.frames[Math.floor(this.t * d.fps) % d.frames.length] : 0;
    sp.draw(ctx, this.anim.sheet, this.anim.row, col, this.x, this.y);
  }
}

const CLASSES = { candle: Candle, liamDummy: LiamDummy };

// ---------------------------------------------------------------- base scene
class RoomScene {
  constructor(game, name, roomOpts) {
    this.game = game;
    this.name = name;
    this.room = new Room(game, roomOpts);
    this.lighting = new Lighting(640, 360);
    this.entities = [];
    const b = this.room.bounds();
    this.liam = new Liam(game, (b.x1 + b.x2) / 2, b.y1 + 60);
  }

  spawn(type, x, y, extra = {}) {
    if (type === 'dialogue') { this.game.ui.say(this.game.texts.debug?.testDialogue || 'Test dialogue.', { portrait: 'smug' }); return null; }
    const b = this.room.bounds();
    x = Math.max(b.x1, Math.min(b.x2, x)); y = Math.max(b.y1, Math.min(b.y2, y));
    if (type === 'ambrose') {
      // the test room already has him: move him instead of making a second Ambrose
      if (this.ambrose) { this.ambrose.force('none'); this.ambrose.x = x; this.ambrose.y = y; return this.ambrose; }
      const a = new Ambrose(this, x, y, { schedule: false });
      this.entities.push(a);
      return a;
    }
    const C = CLASSES[type];
    if (!C) return null;
    const e = new C(this, type, x, y, extra);
    this.entities.push(e);
    return e;
  }

  actors() { return [this.liam, ...(this.ambrose ? [this.ambrose] : []), ...this.entities]; }

  allLights() {
    return [...this.room.lights(), ...(this.ambrose ? this.ambrose.lights() : []), ...this.entities.flatMap((e) => e.lights())];
  }

  update(dt) {
    this.room.update(dt);
    this.liam.update(dt, this);
    if (this.ambrose) this.ambrose.update(dt);
    for (const e of this.entities) e.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = '#0d0b12';
    ctx.fillRect(0, 0, 640, 360);
    this.room.drawFloor(ctx);
    this.room.drawSun(ctx);
    this.room.drawWalls(ctx);
    this.room.drawProps(ctx);
    const list = [...this.actors(), ...this.room.sortables()].sort((a, b) => a.y - b.y);
    for (const e of list) e.draw(ctx);
    this.lighting.render(ctx, this.game, this.allLights());
  }

  drawUI() {}

  serialize() {
    return { room: this.room.serialize(), liam: this.liam.serialize(), ambrose: this.ambrose ? this.ambrose.serialize() : null, entities: this.entities.map((e) => e.serialize()) };
  }

  restore(s) {
    this.room.restore(s.room);
    this.liam.restore(s.liam);
    if (this.ambrose && s.ambrose) this.ambrose.restore(s.ambrose);
    this.entities = [];
    for (const e of s.entities || []) this.spawn(e.type, e.x, e.y, e.anim ? { anim: e.anim } : {});
  }
}

// ---------------------------------------------------------------- test room
export class TestRoomScene extends RoomScene {
  constructor(game, { intro = true } = {}) {
    super(game, 'testroom', { props: true });
    this.sunLineDay = -1;
    this.lastInteract = null;
    // Ambrose starts by the window, on duty
    this.ambrose = new Ambrose(this, this.room.windowX + 60, this.room.floorTop + 50);
    if (intro) this.startIntro();
    else { this.liam.x = this.room.windowX - 60; this.liam.y = this.room.floorTop + 70; }
  }

  // Liam comes in through the door and strikes his pose
  startIntro() {
    const r = this.room, l = this.liam, g = this.game;
    l.mode = 'scripted';
    l.x = r.doorX; l.y = r.floorTop + 1; l.dir = 'down';
    l.setAnim({ sheet: 'liam_td_idle', name: 'idle' });
    this.intro = { t: 0, phase: 'opening' };
    r.door.state = 'closed';
    this.introStep = (dt) => {
      const it = this.intro;
      it.t += dt;
      if (it.phase === 'opening') {
        r.door.state = it.t < 0.4 ? 'closed' : it.t < 0.6 ? 'ajar' : 'open';
        if (it.t > 0.8) { it.phase = 'walk'; it.t = 0; l.setAnim({ sheet: 'liam_td_walk', name: 'walk' }); }
      } else if (it.phase === 'walk') {
        l.y += g.config.liam.walkSpeed * dt;
        l.anim.t += dt;
        if (l.y >= r.floorTop + g.config.liam.introWalkPixels) { it.phase = 'closing'; it.t = 0; l.setAnim({ sheet: 'liam_td_idle', name: 'idle' }); }
      } else if (it.phase === 'closing') {
        l.anim.t += dt;
        r.door.state = it.t < 0.15 ? 'ajar' : 'closed';
        if (it.t > 0.3) {
          it.phase = 'pose';
          l.play('liam_td_doorpose', 'doorpose', { row: 'down', mode: 'action', onDone: () => {
            g.ui.say(g.texts.intro?.after, { portrait: 'flat' });
          } });
          g.ui.say(g.texts.intro?.entrance, { portrait: 'grand' });
          this.intro = null;
        }
      }
    };
  }

  update(dt) {
    if (this.intro) { this.room.update(dt); this.introStep(dt); this.ambrose.update(dt); for (const e of this.entities) e.update(dt); return; }
    super.update(dt);
    const g = this.game, l = this.liam;
    // grumpy line the first time he steps into the sun each day
    if (l.inSun && this.sunLineDay !== g.clock.day) {
      this.sunLineDay = g.clock.day;
      g.ui.say(g.rng.pick(g.texts.sun?.first || ['...']), { portrait: 'flat' });
    }
    // E: skip to the next line while someone talks; otherwise talk to Ambrose or inspect things
    this.nearAmbrose = this.ambrose.canTalk(l) && l.mode === 'free';
    this.near = this.nearAmbrose ? null : this.nearest();
    if (g.input.wasPressed('interact')) {
      if (g.ui.speaking && g.ui.messages.length > 1) g.ui.skip();
      else if (this.nearAmbrose) this.ambrose.talk();
      else if (this.near && l.mode === 'free' && l.form === 'human') this.interact(this.near);
    }
  }

  nearest() {
    const l = this.liam, range = this.game.config.liam.interactRange;
    let best = null, bd = range;
    for (const it of this.room.interactables()) {
      const d = Math.hypot(it.x - l.x, (it.y - l.y) * 1.5);
      if (d < bd) { bd = d; best = it; }
    }
    return best;
  }

  interact(it) {
    const g = this.game, l = this.liam, r = this.room;
    l.dir = it.face;
    this.lastInteract = it.id;
    l.play('liam_td_inspect', 'inspect', { row: 'up', onDone: () => {} });
    if (it.id === 'window') {
      const c = r.cycleCurtain();
      g.ui.say(g.texts.window?.[c], { portrait: c === 'closed' ? 'soft' : 'flat' });
    } else if (it.id === 'door') {
      g.ui.say(g.texts.door?.inspect, { portrait: 'sad' });
    } else if (it.id === 'table') {
      g.ui.say(r.plates ? g.texts.table?.set : g.texts.table?.empty, { portrait: r.plates ? 'flat' : 'soft' });
    } else if (it.id === 'clock') {
      g.ui.say(r.clockStopped != null ? g.texts.clock?.stopped : g.texts.clock?.ticking, { portrait: r.clockStopped != null ? 'startled' : 'flat' });
    } else {
      const lit = sconcesLit(g.clock.hour, g.config.light);
      g.ui.say(lit ? g.texts.sconce?.lit : g.texts.sconce?.unlit, { portrait: 'flat' });
    }
  }

  drawUI(ui) {
    const E = this.game.texts.prompt?.interact || 'E';
    if (ui.speaking) return;
    if (this.nearAmbrose) ui.prompt(E, this.ambrose.x, this.ambrose.y - 76);
    else if (this.near && this.liam.mode === 'free' && this.liam.form === 'human') ui.prompt(E, this.near.x, this.liam.y - 72);
  }

  serialize() { return { ...super.serialize(), sunLineDay: this.sunLineDay }; }
  restore(s) { super.restore(s); this.intro = null; this.sunLineDay = s.sunLineDay ?? -1; }
}

// ---------------------------------------------------------------- sandbox
export class SandboxScene extends RoomScene {
  constructor(game, { sheet = null } = {}) {
    super(game, 'sandbox', { props: false });
    this.viewer = { on: !!sheet, page: 0, t: 0 };
    if (sheet) { const i = this.pages().indexOf(sheet); if (i >= 0) this.viewer.page = i; }
  }

  pages() { return Object.keys(this.game.sprites.sheets).sort(); }

  update(dt) {
    if (this.viewer.on) { this.viewer.t += dt; return; }
    super.update(dt);
  }

  page(delta) {
    const n = this.pages().length;
    this.viewer.page = (this.viewer.page + delta + n) % n;
    this.viewer.t = 0;
  }

  draw(ctx) {
    super.draw(ctx);
    if (this.viewer.on) this.drawViewer(ctx);
  }

  // Every row of the sheet playing its animation(s) side by side, plus all frames as a strip.
  drawViewer(ctx) {
    const sp = this.game.sprites, name = this.pages()[this.viewer.page], s = sp.sheet(name);
    const k = this.game.config.debug.viewerScale;
    ctx.fillStyle = '#3c3a46'; ctx.fillRect(0, 0, 640, 360);
    // checker so transparency is visible
    ctx.fillStyle = '#44424f';
    for (let y = 0; y < 360; y += 16) for (let x = (y / 16) % 2 ? 16 : 0; x < 640; x += 32) ctx.fillRect(x, y, 16, 16);
    this.viewerLabels = [];
    if (!s) return;
    ctx.save();
    if (s.regions) {
      // tiles: every tile, then a 6x4 patch of the first region to check seams
      let y = 24;
      for (const [reg, info] of Object.entries(s.regions)) {
        for (let i = 0; i < info.count; i++) sp.drawTile(ctx, name, reg, i, 8 + i * (info.size[0] + 4), y);
        this.viewerLabels.push([reg, 8, y - 10]);
        y += info.size[1] + 14;
      }
      const [first, info] = Object.entries(s.regions)[0];
      this.viewerLabels.push(['seam test', 340, 14]);
      for (let ty = 0; ty < Math.min(4, Math.floor(300 / info.size[1])); ty++) for (let tx = 0; tx < Math.floor(280 / info.size[0]); tx++) sp.drawTile(ctx, name, first, (tx * 7 + ty * 3) % info.count, 340 + tx * info.size[0], 24 + ty * info.size[1]);
      ctx.restore();
      return;
    }
    const [fw, fh] = s.frame || [32, 32];
    const rows = s.rows || ['row'];
    const nRows = (s.grid || [1, 1])[0], nCols = (s.grid || [1, 1])[1];
    const anims = Object.entries(s.anims || {});
    ctx.scale(k, k);
    const W = 640 / k;
    // animated row previews
    let x = 6, y = 14;
    for (let r = 0; r < nRows; r++) {
      for (const [an, d] of anims.length ? anims : [['frames', { frames: [...Array(nCols).keys()], fps: 4, loop: true }]]) {
        if (x + fw > W) { x = 6; y += fh + 12; }
        const col = d.frames[Math.floor(this.viewer.t * d.fps) % d.frames.length];
        sp.draw(ctx, name, r, col, x + s.origin[0], y + s.origin[1]);
        this.viewerLabels.push([`${rows[r] || r} ${an}`, (x) * k, (y + fh) * k + 1]);
        x += fw + 6;
      }
    }
    ctx.restore();
    // static strip of every frame at 1x along the bottom
    const stripY = 360 - nRows * Math.min(fh, 64) - 6;
    ctx.save();
    const sc = Math.min(1, 64 / fh);
    ctx.translate(6, stripY);
    ctx.scale(sc, sc);
    for (let r = 0; r < nRows; r++) for (let c = 0; c < nCols; c++) sp.draw(ctx, name, r, c, c * (fw + 2) + s.origin[0], r * fh + s.origin[1]);
    ctx.restore();
  }

  drawUI(ui) {
    if (!this.viewer.on) {
      ui.text('SANDBOX  ·  V: animation viewer  ·  Esc: menu > Testing tools (spawn things here)', 8, 336, { size: 9 });
      return;
    }
    const name = this.pages()[this.viewer.page];
    ui.text(`${name}   (${this.viewer.page + 1}/${this.pages().length})   [ and ] to page, V to close`, 8, 2, { size: 10 });
    for (const [label, x, y] of this.viewerLabels || []) ui.text(label, x, y, { size: 8 });
    if (!this.game.sprites.has(name)) ui.text('NO IMAGE: showing fallback art', 8, 330, { size: 10, color: '#ff8080' });
  }

  serialize() { return { ...super.serialize(), viewer: { ...this.viewer } }; }
  restore(s) { super.restore(s); if (s.viewer) this.viewer = { ...s.viewer }; }
}
