// A room built from level data (levels/*.json): any size, any wallpaper, doors to other rooms,
// props (drawn from the sprite manifest by frame name), hiding spots and furniture you bump into.
// Same interface as the test room's Room, so Liam, Ambrose, lighting and the overlays work in it.
import { hash2 } from '../engine/util.js';
import { sconcesLit } from './lighting.js';

export class MapRoom {
  constructor(game, id, def) {
    this.game = game;
    this.id = id;
    this.def = def;
    this.props = false;          // no test-room sunbeam / Ambrose ritual props
    this.curtain = 'closed';
    this.door = { state: 'closed' };
    this.doorStates = {};        // per door id: closed | ajar | open
    this.frames = {};            // per prop id: current frame name (set by the chapter logic)
    this.hiddenProps = {};
    this.build();
  }

  build() {
    const d = this.def;
    this.tilesW = d.tilesW; this.tilesH = d.tilesH;
    this.wallH = 96;
    const totalW = this.tilesW * 16 + 32;
    this.x0 = Math.round((640 - totalW) / 2);
    this.y0 = this.game.config.room.originY;
    this.inX = this.x0 + 16;
    this.inW = this.tilesW * 16;
    this.wallTop = this.y0 + 16;
    this.floorTop = this.wallTop + this.wallH;
    this.floorBottom = this.floorTop + this.tilesH * 16;
    const seed = this.game.seed + this.id.length * 131;
    const c = this.game.config.room;
    this.floor = [];
    for (let ty = 0; ty < this.tilesH; ty++) {
      for (let tx = 0; tx < this.tilesW; tx++) {
        const r = hash2(seed, tx, ty);
        let region = 'plain', idx = Math.floor(hash2(seed + 7, tx, ty) * 6);
        if (ty === 0) { region = 'edge'; idx = 4; }
        else if (tx === 0) { region = 'edge'; idx = 5; }
        else if (r < c.detailChance) region = 'detail';
        else if (r < c.detailChance + c.wornChance) region = 'worn';
        this.floor.push([region, idx]);
      }
    }
    this.strips = [];
    for (let i = 0; i < this.inW / 32; i++) {
      const r = hash2(seed + 3, i, 0);
      this.strips.push(r < c.wallVariantChance ? 2 + Math.floor(hash2(seed + 5, i, 0) * 4) : Math.floor(r * 2) % 2);
    }
    // the nursery's two identical height marks on the wainscot (wall strip variant 3)
    if (d.wallMarksAt != null) this.strips[Math.floor(d.wallMarksAt / 32)] = 3;
    this.doors = (d.doors || []).map((dr) => ({ ...dr, x: this.inX + dr.x }));
    for (const dr of this.doors) this.doorStates[dr.id] = 'closed';
    this.doorX = this.doors[0] ? this.doors[0].x : this.inX + 40;
    this.windowX = d.window != null ? this.inX + d.window : null;
    this.sconces = (d.sconces || []).map((x, i) => ({ x: this.inX + x, y: this.floorTop - 38, frame: 1 + (i % 3), t: i * 0.13, flick: 1 }));
    this.propList = (d.props || []).map((p) => ({ ...p, x: this.inX + p.x, y: this.floorTop + p.y }));
    for (const p of this.propList) { this.frames[p.id] = p.frame; if (p.hidden) this.hiddenProps[p.id] = true; }
    this.table = null; this.clock = null; this.wallDoor = null;
    this.plates = 0; this.clockStopped = null;
  }

  prop(id) { return this.propList.find((p) => p.id === id); }
  doorById(id) { return this.doors.find((d) => d.id === id); }
  resetNight() {}

  // ---------------------------------------------------------------- walking
  bounds() { return { x1: this.inX + 8, x2: this.inX + this.inW - 8, y1: this.floorTop + 6, y2: this.floorBottom - 2 }; }

  obstacles() {
    const out = [];
    for (const p of this.propList) {
      if (!p.solid || this.hiddenProps[p.id]) continue;
      const [hw, dp] = p.solid;
      out.push({ x1: p.x - hw, x2: p.x + hw, y1: p.y - dp, y2: p.y + 2, id: p.id });
    }
    return out;
  }

  blocked(x, y) { return this.obstacles().some((o) => x > o.x1 && x < o.x2 && y > o.y1 && y < o.y2); }

  sunStrength() { return 0; }
  sunPolys() { return []; }
  inSun() { return false; }
  cycleCurtain() { this.curtain = { open: 'half', half: 'closed', closed: 'open' }[this.curtain]; return this.curtain; }

  lights() {
    const L = this.game.config.light;
    const out = [];
    if (sconcesLit(this.game.clock.hour, L)) {
      for (const s of this.sconces) out.push({ x: s.x, y: s.y - 30, r: L.sconceRadius * s.flick * (this.dim ?? 1), intensity: this.dim ?? 1, warm: true, kind: 'sconce' });
    }
    return out;
  }

  // things Liam can press E on (doors included)
  interactables() {
    const out = this.doors.map((d) => ({ id: `door:${d.id}`, x: d.x, y: this.floorTop + 8, face: 'up', door: d }));
    for (const p of this.propList) {
      if (!p.spot || this.hiddenProps[p.id]) continue;
      // wall things: stand at the wall. Floor things: stand just in front of them, facing up.
      const wall = p.wall || p.kind === 'shelves' || p.kind === 'spotOnly';
      out.push({ id: p.spot, x: p.x, y: wall ? this.floorTop + 8 : Math.min(p.y + 8, this.floorBottom - 4), face: 'up', prop: p });
    }
    if (this.windowX != null) out.push({ id: 'window', x: this.windowX, y: this.floorTop + 8, face: 'up' });
    return out;
  }

  // ---------------------------------------------------------------- update
  update(dt) {
    const g = this.game, L = g.config.light;
    for (const s of this.sconces) {
      s.t -= dt;
      if (s.t <= 0) {
        s.t = g.rng.range(0.08, 0.2);
        s.frame = 1 + g.rng.int(3);
        s.flick = 1 - L.sconceFlicker + g.rng.next() * L.sconceFlicker * 2;
      }
    }
  }

  serialize() { return { id: this.id, doorStates: { ...this.doorStates }, frames: { ...this.frames }, hiddenProps: { ...this.hiddenProps }, curtain: this.curtain }; }
  restore(s) {
    if (!s) return;
    // doors are always closed when you come back to a room
    Object.assign(this.frames, s.frames || {});
    this.hiddenProps = { ...(s.hiddenProps || {}) };
    this.curtain = s.curtain || this.curtain;
  }

  // ---------------------------------------------------------------- drawing
  drawFloor(ctx) {
    const sp = this.game.sprites;
    let i = 0;
    for (let ty = 0; ty < this.tilesH; ty++) {
      for (let tx = 0; tx < this.tilesW; tx++, i++) {
        const [region, idx] = this.floor[i];
        const x = this.inX + tx * 16, y = this.floorTop + ty * 16;
        if (!sp.drawTile(ctx, 'tiles_floor_oak', region, idx, x, y)) {
          ctx.fillStyle = (tx + ty) % 2 ? '#8a6142' : '#6b4a33'; ctx.fillRect(x, y, 16, 16);
        }
      }
    }
    // flat things on the floor (rugs) go under everything
    for (const p of this.propList) if (p.flat && !this.hiddenProps[p.id]) this.drawProp(ctx, p);
  }

  drawSun() {}

  drawWalls(ctx) {
    const sp = this.game.sprites, sheet = this.def.wall || 'tiles_wall_sage';
    const nursery = sheet === 'tiles_wall_nursery';
    this.strips.forEach((v, i) => {
      const x = this.inX + i * 32;
      if (!sp.drawTile(ctx, sheet, 'wall', v, x, this.wallTop)) {
        ctx.fillStyle = nursery ? '#8796a2' : '#7a8c70'; ctx.fillRect(x, this.wallTop, 32, 60);
        ctx.fillStyle = nursery ? '#e6e1d6' : '#56402f'; ctx.fillRect(x, this.wallTop + 60, 32, 36);
        ctx.fillStyle = '#3e2c22'; ctx.fillRect(x, this.wallTop, 32, 4); ctx.fillRect(x, this.wallTop + 90, 32, 6);
      }
    });
    const cap = (idx, x, y) => { if (!sp.drawTile(ctx, sheet, 'cap', idx, x, y)) { ctx.fillStyle = '#2b2530'; ctx.fillRect(x, y, 16, 16); } };
    for (let x = this.inX; x < this.inX + this.inW; x += 16) { cap(0, x, this.y0); cap(5, x, this.floorBottom); }
    for (let y = this.y0 + 16; y < this.floorBottom; y += 16) { cap(1, this.x0, y); cap(2, this.inX + this.inW, y); }
    cap(3, this.x0, this.y0); cap(4, this.inX + this.inW, this.y0);
    cap(1, this.x0, this.floorBottom); cap(2, this.inX + this.inW, this.floorBottom);
  }

  drawProps(ctx) {
    const sp = this.game.sprites;
    const names = ['closed', 'ajar', 'open'];
    for (const d of this.doors) sp.draw(ctx, 'prop_door_panel', 0, names.indexOf(this.doorStates[d.id]), d.x, this.floorTop);
    if (this.windowX != null) sp.draw(ctx, 'prop_window_sash', 1, ['open', 'half', 'closed'].indexOf(this.curtain), this.windowX, this.floorTop - 6);
    const lit = sconcesLit(this.game.clock.hour, this.game.config.light);
    for (const s of this.sconces) sp.draw(ctx, 'prop_sconce', 0, lit ? s.frame : 0, s.x, s.y);
    for (const p of this.propList) if (p.wall && !this.hiddenProps[p.id]) this.drawProp(ctx, p);
    for (const p of this.propList) if (p.kind === 'shelves') this.drawShelves(ctx, p);
    for (const p of this.propList) if (p.kind === 'memento' && this.showMemento) this.drawMemento(ctx, p);
  }

  // furniture depth-sorted with the characters (by the bottom edge)
  sortables() {
    return this.propList
      .filter((p) => p.sheet && !p.wall && !p.flat && !this.hiddenProps[p.id])
      .map((p) => ({ y: p.y, draw: (ctx) => this.drawProp(ctx, p) }));
  }

  // a prop frame by name: "chest_open" etc. (fit sheets list their frame names)
  drawProp(ctx, p, frameName = this.frames[p.id], dx = 0, dy = 0) {
    // p.offset: a small shake set by the chapter (rattling toy chest)
    if (p.offset) { dx += p.offset[0]; dy += p.offset[1]; }
    const sp = this.game.sprites, s = sp.sheet(p.sheet);
    const names = s?.names || [];
    const idx = Math.max(0, names.indexOf(frameName));
    const cols = s?.grid ? s.grid[1] : names.length || 1;
    if (sp.has(p.sheet)) sp.draw(ctx, p.sheet, Math.floor(idx / cols), idx % cols, p.x + dx, p.y + dy, { alpha: p.alpha ?? 1 });
    else {
      // placeholder: a labelled box the size of the solid area
      const w = p.solid ? p.solid[0] * 2 : 20, h = p.wall ? 40 : 24;
      ctx.fillStyle = '#56402f'; ctx.fillRect(Math.round(p.x - w / 2 + dx), Math.round(p.y - h + dy), w, h);
      ctx.fillStyle = '#1a1020'; ctx.fillRect(Math.round(p.x - w / 2 + dx), Math.round(p.y - 1 + dy), w, 1);
    }
  }

  // code-drawn linen shelves (no art yet)
  drawShelves(ctx, p) {
    const X = Math.round(p.x), Y = Math.round(p.y);
    ctx.fillStyle = '#3e2c22'; ctx.fillRect(X - 18, Y - 60, 36, 62);
    ctx.fillStyle = '#56402f'; ctx.fillRect(X - 16, Y - 58, 32, 58);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = '#6e5440'; ctx.fillRect(X - 16, Y - 44 + i * 14, 32, 2);
      for (let j = 0; j < 3; j++) { ctx.fillStyle = (i + j) % 2 ? '#efe3c4' : '#d9c9a3'; ctx.fillRect(X - 14 + j * 10, Y - 54 + i * 14, 9, 10); }
    }
  }

  // the Twins' crayon drawing pinned on Liam's wall (code-drawn until it has art)
  drawMemento(ctx, p) {
    const X = Math.round(p.x), Y = Math.round(p.y);
    ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 12, Y - 16, 24, 18);
    ctx.fillStyle = '#e9dcc0'; ctx.fillRect(X - 11, Y - 15, 22, 16);
    ctx.fillStyle = '#56402f'; ctx.fillRect(X - 7, Y - 14, 14, 13);               // wardrobe
    ctx.fillStyle = '#1c1a24'; ctx.fillRect(X - 3, Y - 10, 6, 2); ctx.fillRect(X - 1, Y - 9, 2, 3); // bat
    ctx.fillStyle = '#a4433a'; ctx.fillRect(X - 9, Y - 3, 2, 2); ctx.fillRect(X + 7, Y - 3, 2, 2);   // two little figures
    ctx.fillStyle = '#9c8352'; ctx.fillRect(X - 1, Y - 18, 2, 2);                 // pin
  }

  navGrid() {
    const cols = 40, rows = 23, grid = [];
    const b = this.bounds();
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = c * 16 + 8, y = r * 16 + 8;
      grid.push(!(x >= b.x1 && x <= b.x2 && y >= b.y1 && y <= b.y2) || this.blocked(x, y));
    }
    return { cols, rows, grid };
  }
}
