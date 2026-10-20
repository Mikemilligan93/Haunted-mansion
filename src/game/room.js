// A single room: oak floor, sage back wall, caps, and wall props (door, window, sconces).
// Also owns the sunbeam (shape, strength, dust motes) and the room's light sources.
import { hash2, pointInPoly, hexToRgb } from '../engine/util.js';
import { daylight, sconcesLit } from './lighting.js';

const CURTAINS = ['open', 'half', 'closed'];

export class Room {
  constructor(game, { props = true } = {}) {
    this.game = game;
    this.props = props;
    this.curtain = 'open';
    this.door = { state: 'closed' };
    this.motes = [];
    this.build();
  }

  build() {
    const c = this.game.config.room;
    this.tilesW = c.floorTilesW;
    this.tilesH = c.floorTilesH;
    this.wallH = c.wallHeight;
    const totalW = this.tilesW * 16 + 32;
    this.x0 = Math.round((640 - totalW) / 2);   // left edge of the left cap
    this.y0 = c.originY;                          // top edge of the top cap
    this.inX = this.x0 + 16;                      // interior left
    this.inW = this.tilesW * 16;
    this.wallTop = this.y0 + 16;
    this.floorTop = this.wallTop + this.wallH;
    this.floorBottom = this.floorTop + this.tilesH * 16;
    // stable tile choices for this seed
    const seed = this.game.seed;
    this.floor = [];
    for (let ty = 0; ty < this.tilesH; ty++) {
      for (let tx = 0; tx < this.tilesW; tx++) {
        const r = hash2(seed, tx, ty);
        let region = 'plain', idx = Math.floor(hash2(seed + 7, tx, ty) * 6);
        if (ty === 0) { region = 'edge'; idx = 4; }                 // wall shadow
        else if (tx === 0) { region = 'edge'; idx = 5; }            // left wall shadow
        else if (r < c.detailChance) region = 'detail';
        else if (r < c.detailChance + c.wornChance) region = 'worn';
        else if (r > 0.985) { region = 'edge'; idx = hash2(seed, tx, 99) < 0.5 ? 0 : 1; } // dust
        this.floor.push([region, idx]);
      }
    }
    this.strips = [];
    for (let i = 0; i < this.inW / 32; i++) {
      const r = hash2(seed + 3, i, 0);
      this.strips.push(r < c.wallVariantChance ? 2 + Math.floor(hash2(seed + 5, i, 0) * 4) : Math.floor(r * 2) % 2);
    }
    // props (positions in screen pixels; y = bottom of the sprite)
    this.doorX = this.inX + 160;
    this.windowX = this.inX + 384;
    this.sconces = this.props ? [{ x: this.inX + 256, y: this.wallTop + 58 }, { x: this.inX + 512, y: this.wallTop + 58 }] : [];
    this.sconces.forEach((s, i) => { s.frame = 1 + i; s.t = i * 0.13; s.flick = 1; });
    // Ambrose's ritual props: a small dining table, the grandfather clock, and the spot on the
    // left wall where the 1890s floor plan shows a door (he walks through it at night)
    const P = this.game.config.props || {};
    this.table = this.props ? { x: this.inX + (P.table?.x ?? 112), y: this.floorTop + (P.table?.y ?? 178) } : null;
    this.clock = this.props ? { x: this.inX + (P.clock?.x ?? 584), y: this.floorTop + 4, swing: 0 } : null;
    this.wallDoor = this.props ? { x: this.inX + 8, y: this.floorTop + (P.wallDoorY ?? 120) } : null;
    this.plates = this.plates || 0;
    this.clockStopped = this.clockStopped ?? null;
  }

  resetNight() { this.plates = 0; this.clockStopped = null; }

  // solid furniture for walking (feet level). The bat flies over it; Ambrose is a ghost.
  obstacles() {
    const out = [];
    if (this.table) {
      const T = this.game.config.props?.table || {}, hw = T.halfWidth ?? 32, dp = T.depth ?? 16;
      out.push({ x1: this.table.x - hw, x2: this.table.x + hw, y1: this.table.y - dp, y2: this.table.y + 2 });
    }
    if (this.clock) out.push({ x1: this.clock.x - 15, x2: this.clock.x + 15, y1: this.floorTop, y2: this.floorTop + 10 });
    return out;
  }

  blocked(x, y) { return this.obstacles().some((o) => x > o.x1 && x < o.x2 && y > o.y1 && y < o.y2); }

  // ---------------------------------------------------------------- state
  cycleCurtain() {
    this.curtain = CURTAINS[(CURTAINS.indexOf(this.curtain) + 1) % CURTAINS.length];
    return this.curtain;
  }

  serialize() { return { curtain: this.curtain, door: this.door.state, plates: this.plates, clockStopped: this.clockStopped }; }
  restore(s) { if (!s) return; this.curtain = s.curtain; this.door.state = s.door; this.plates = s.plates || 0; this.clockStopped = s.clockStopped ?? null; }

  // walkable floor rectangle for Liam's feet
  bounds() {
    return { x1: this.inX + 8, x2: this.inX + this.inW - 8, y1: this.floorTop + 6, y2: this.floorBottom - 2 };
  }

  sunStrength() { return this.props ? daylight(this.game.clock.hour, this.game.config.time) : 0; }

  // sunbeam polygon(s) on the floor, from the window's visible glass
  sunPolys() {
    if (!this.props || this.curtain === 'closed') return [];
    const s = this.game.config.sunbeam;
    const [a, b] = this.curtain === 'open' ? [-21, 21] : [-8, 8];
    const quad = (l, r) => {
      const x1 = this.windowX + l, x2 = this.windowX + r, y = this.floorTop;
      return [[x1, y], [x2, y], [x2 + s.slant, y + s.length], [x1 + s.slant, y + s.length]];
    };
    if (this.curtain === 'open') return [quad(a, -2), quad(2, b)]; // the window's middle bar casts a shadow
    return [quad(a, b)];
  }

  inSun(x, y) { return this.sunPolys().some((p) => pointInPoly(x, y, p)); }

  lights() {
    const L = this.game.config.light;
    const out = [];
    if (sconcesLit(this.game.clock.hour, L)) {
      for (const s of this.sconces) out.push({ x: s.x, y: s.y - 30, r: L.sconceRadius * s.flick, intensity: 1, warm: true, kind: 'sconce' });
    }
    return out;
  }

  // ---------------------------------------------------------------- update
  update(dt) {
    const g = this.game, L = g.config.light;
    if (this.clock) this.clock.swing += dt;
    for (const s of this.sconces) {
      s.t -= dt;
      if (s.t <= 0) {
        s.t = g.rng.range(0.08, 0.2);
        s.frame = 1 + g.rng.int(3);
        s.flick = 1 - L.sconceFlicker + g.rng.next() * L.sconceFlicker * 2;
      }
    }
    // dust motes drifting in the sunbeam
    const polys = this.sunPolys();
    const want = polys.length ? g.config.sunbeam.motes : 0;
    while (this.motes.length < want) {
      const p = polys[g.rng.int(polys.length)];
      const t = g.rng.next(), u = g.rng.next();
      const x = p[0][0] + (p[1][0] - p[0][0]) * u + g.config.sunbeam.slant * t;
      this.motes.push({ x, y: this.floorTop + g.config.sunbeam.length * t, vx: g.rng.range(-3, 3), vy: g.rng.range(-4, 2), life: g.rng.range(2, 5) });
    }
    if (this.motes.length > want) this.motes.length = want;
    for (const m of this.motes) {
      m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt;
    }
    this.motes = this.motes.filter((m) => m.life > 0 && polys.some((p) => pointInPoly(m.x, m.y, p)));
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
          ctx.fillStyle = (tx + ty) % 2 ? '#8a6142' : '#6b4a33';
          ctx.fillRect(x, y, 16, 16);
          ctx.fillStyle = '#4a3426';
          ctx.fillRect(x, y + 15, 16, 1);
        }
      }
    }
  }

  drawSun(ctx) {
    const strength = this.sunStrength();
    const s = this.game.config.sunbeam;
    const polys = this.sunPolys();
    if (!polys.length) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    if (strength > 0.01) {
      ctx.globalAlpha = s.alpha * strength;
      ctx.fillStyle = s.color;
      for (const p of polys) {
        ctx.beginPath();
        p.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 0.55 * strength;
      ctx.fillStyle = '#fff3c4';
      for (const m of this.motes) ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
    } else {
      // moonlight: a faint cool patch, no effect on Liam
      ctx.globalAlpha = this.game.config.light.moonbeamAlpha;
      ctx.fillStyle = '#a9c2d6';
      for (const p of polys) {
        ctx.beginPath();
        p.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawWalls(ctx) {
    const sp = this.game.sprites;
    // back wall face
    this.strips.forEach((v, i) => {
      const x = this.inX + i * 32;
      if (!sp.drawTile(ctx, 'tiles_wall_sage', 'wall', v, x, this.wallTop)) {
        ctx.fillStyle = '#7a8c70'; ctx.fillRect(x, this.wallTop, 32, 60);
        ctx.fillStyle = '#56402f'; ctx.fillRect(x, this.wallTop + 60, 32, 36);
        ctx.fillStyle = '#3e2c22'; ctx.fillRect(x, this.wallTop, 32, 4); ctx.fillRect(x, this.wallTop + 90, 32, 6);
      }
    });
    // caps: top, sides, bottom
    const cap = (idx, x, y) => {
      if (!sp.drawTile(ctx, 'tiles_wall_sage', 'cap', idx, x, y)) { ctx.fillStyle = '#2b2530'; ctx.fillRect(x, y, 16, 16); }
    };
    for (let x = this.inX; x < this.inX + this.inW; x += 16) { cap(0, x, this.y0); cap(5, x, this.floorBottom); }
    for (let y = this.y0 + 16; y < this.floorBottom; y += 16) { cap(1, this.x0, y); cap(2, this.inX + this.inW, y); }
    cap(3, this.x0, this.y0); cap(4, this.inX + this.inW, this.y0);
    cap(1, this.x0, this.floorBottom); cap(2, this.inX + this.inW, this.floorBottom);
  }

  drawProps(ctx) {
    if (!this.props) return;
    const sp = this.game.sprites;
    const names = ['closed', 'ajar', 'open'];
    sp.draw(ctx, 'prop_door_panel', 0, names.indexOf(this.door.state), this.doorX, this.floorTop);
    const night = daylight(this.game.clock.hour, this.game.config.time) < 0.5;
    sp.draw(ctx, 'prop_window_sash', night ? 1 : 0, CURTAINS.indexOf(this.curtain), this.windowX, this.floorTop - 6);
    const lit = sconcesLit(this.game.clock.hour, this.game.config.light);
    for (const s of this.sconces) sp.draw(ctx, 'prop_sconce', 0, lit ? s.frame : 0, s.x, s.y);
    if (this.clock) this.drawClock(ctx);
  }

  // furniture that has to be depth-sorted with the characters
  sortables() {
    return this.table ? [{ y: this.table.y, draw: (ctx) => this.drawTable(ctx) }] : [];
  }

  drawTable(ctx) {
    const sp = this.game.sprites, { x, y } = this.table;
    if (sp.has('prop_table')) sp.draw(ctx, 'prop_table', 0, this.game.config.props?.table?.variant ?? 0, x, y);
    else {
      // placeholder: walnut table with a cream cloth, seen in 3/4 view
      const X = Math.round(x), Y = Math.round(y);
      ctx.fillStyle = '#3e2c22';
      ctx.fillRect(X - 28, Y - 14, 3, 14); ctx.fillRect(X + 25, Y - 14, 3, 14);
      ctx.fillRect(X - 22, Y - 16, 2, 10); ctx.fillRect(X + 20, Y - 16, 2, 10);
      ctx.fillStyle = '#56402f'; ctx.fillRect(X - 32, Y - 40, 64, 24);
      ctx.fillStyle = '#d9c9a3'; ctx.fillRect(X - 30, Y - 39, 60, 20);
      ctx.fillStyle = '#efe3c4'; ctx.fillRect(X - 29, Y - 38, 58, 16);
      ctx.fillStyle = '#d9c9a3'; ctx.fillRect(X - 30, Y - 20, 60, 5);
      ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 32, Y - 15, 64, 1);
    }
    // the places Ambrose has set, in order
    const offs = this.game.config.props?.table?.placeOffsets || [[-16, -33], [16, -33], [-16, -24], [16, -24]];
    for (let i = 0; i < Math.min(this.plates, offs.length); i++) {
      const px = Math.round(x + offs[i][0]), py = Math.round(y + offs[i][1]);
      if (sp.has('prop_plate')) sp.draw(ctx, 'prop_plate', 0, i % 4, px, py);
      else {
        ctx.fillStyle = '#a9a39a'; ctx.fillRect(px - 5, py - 6, 11, 5); // (placeholder plate)
        ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 4, py - 6, 9, 4);
        ctx.fillStyle = '#efe3c4'; ctx.fillRect(px - 2, py - 5, 5, 2);
        ctx.fillStyle = '#9c8352'; ctx.fillRect(px - 7, py - 6, 1, 5); ctx.fillRect(px + 7, py - 6, 1, 5);
      }
    }
  }

  // grandfather clock against the back wall. The hands are drawn in code: they show the game
  // time, or Ambrose's hour once he has wound it back at night.
  drawClock(ctx) {
    const sp = this.game.sprites, C = this.game.config.props?.clock || {};
    const { x, y } = this.clock, X = Math.round(x), Y = Math.round(y);
    const swingFrame = Math.floor(this.clock.swing * 1.5) % 4; // 0 1 2 1
    if (sp.has('prop_clock')) sp.draw(ctx, 'prop_clock', 0, [0, 1, 2, 1][swingFrame], x, y);
    else {
      ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 13, Y - 88, 26, 88);
      ctx.fillStyle = '#3e2c22'; ctx.fillRect(X - 12, Y - 87, 24, 86);
      ctx.fillStyle = '#56402f'; ctx.fillRect(X - 10, Y - 84, 20, 26); ctx.fillRect(X - 8, Y - 54, 16, 40);
      ctx.fillStyle = '#6e5440'; ctx.fillRect(X - 12, Y - 88, 24, 3);
      ctx.fillStyle = '#efe3c4'; ctx.fillRect(X - 7, Y - 79, 14, 14);
      ctx.fillStyle = '#d9c9a3'; ctx.fillRect(X - 7, Y - 66, 14, 1);
      ctx.fillStyle = '#1a1020'; ctx.fillRect(X - 6, Y - 52, 12, 34);
      const sw = [-2, 0, 2, 0][swingFrame];
      ctx.fillStyle = '#9c8352'; ctx.fillRect(X + sw, Y - 50, 1, 22); ctx.fillRect(X - 2 + sw, Y - 30, 5, 5);
    }
    const [fx, fy] = C.faceOffset || [0, -72];
    const shown = this.clockStopped != null ? this.clockStopped : this.game.clock.hour;
    const hr = ((shown % 12) / 12) * Math.PI * 2, mn = ((shown % 1)) * Math.PI * 2;
    const hand = (a, len, col) => {
      ctx.fillStyle = col;
      for (let i = 0; i <= len; i++) ctx.fillRect(Math.round(X + fx + Math.sin(a) * i), Math.round(Y + fy - Math.cos(a) * i), 1, 1);
    };
    hand(mn, C.minuteHand ?? 5, '#1a1020');
    hand(hr, C.hourHand ?? 3, '#3e2c22');
  }

  // things Liam can press E on: {id, x, y (the spot Liam must be near), label}
  interactables() {
    if (!this.props) return [];
    return [
      { id: 'window', x: this.windowX, y: this.floorTop + 8, face: 'up' },
      { id: 'door', x: this.doorX, y: this.floorTop + 8, face: 'up' },
      ...this.sconces.map((s, i) => ({ id: `sconce${i}`, x: s.x, y: this.floorTop + 8, face: 'up' })),
      ...(this.clock ? [{ id: 'clock', x: this.clock.x, y: this.floorTop + 14, face: 'up' }] : []),
      ...(this.table ? [{ id: 'table', x: this.table.x, y: this.table.y + 8, face: 'up' }] : []),
    ];
  }

  // navigation grid for the debug overlay: true = blocked
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

export { hexToRgb };
