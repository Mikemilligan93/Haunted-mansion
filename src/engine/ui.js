// The UI layer: a full-resolution canvas on top of the pixel canvas, so text stays crisp.
// Everything is positioned in game pixels (640x360) and scaled here.
import { words } from './util.js';

const FONT = '"DotGothic16", "Courier New", monospace';

export class UI {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;
    this.scale = 1;
    this.offX = 0;
    this.offY = 0;
    this.messages = []; // active dialogue lines
  }

  resize(scale, offX, offY, w, h) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.scale = scale * dpr;
    this.offX = offX * dpr;
    this.offY = offY * dpr;
  }

  // ---------------------------------------------------------------- dialogue
  duration(text) {
    const t = this.game.config.text;
    return Math.max(t.minSeconds, t.baseSeconds + t.perWordSeconds * words(text));
  }

  line(text, speaker = 'liam', portrait = 'flat') {
    return { text, speaker, portrait, left: this.duration(text), total: this.duration(text) };
  }

  // one line (replaces whatever is showing)
  say(text, { speaker = 'liam', portrait = 'flat' } = {}) {
    if (!text) return;
    this.messages = [this.line(text, speaker, portrait)];
  }

  // a conversation: [{text, speaker, portrait}, ...] shown one after another
  sayAll(lines) {
    this.messages = lines.filter((l) => l && l.text).map((l) => this.line(l.text, l.speaker || 'liam', l.portrait || 'flat'));
  }

  // E while someone is talking: jump to the next line
  skip() { this.messages.shift(); }

  update(dt) {
    if (!this.messages.length) return;
    this.messages[0].left -= dt;
    if (this.messages[0].left <= 0) this.messages.shift();
  }

  get speaking() { return this.messages.length > 0; }

  // ---------------------------------------------------------------- drawing
  begin() {
    const c = this.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    c.setTransform(this.scale, 0, 0, this.scale, this.offX, this.offY);
    c.imageSmoothingEnabled = false;
  }

  font(px, bold = false) { this.ctx.font = `${bold ? 'bold ' : ''}${px}px ${FONT}`; }

  panel(x, y, w, h) {
    const t = this.game.config.text;
    const c = this.ctx;
    c.fillStyle = t.panelBorder; c.fillRect(x - 2, y - 2, w + 4, h + 4);
    c.fillStyle = t.panelInner; c.fillRect(x - 1, y - 1, w + 2, h + 2);
    c.fillStyle = t.panelColor; c.fillRect(x, y, w, h);
  }

  // text with a dark outline (readable on anything)
  text(str, x, y, { color = '#f2e6cc', size = 11, align = 'left', outline = true } = {}) {
    const c = this.ctx;
    this.font(size);
    c.textAlign = align;
    c.textBaseline = 'top';
    if (outline) {
      c.fillStyle = '#000';
      for (const [dx, dy] of [[-0.6, 0], [0.6, 0], [0, -0.6], [0, 0.6]]) c.fillText(str, x + dx, y + dy);
    }
    c.fillStyle = color;
    c.fillText(str, x, y);
  }

  wrap(str, maxW, size) {
    this.font(size);
    const out = [];
    let line = '';
    for (const w of str.split(' ')) {
      const t = line ? `${line} ${w}` : w;
      if (this.ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
    }
    if (line) out.push(line);
    return out;
  }

  drawDialogue() {
    const m = this.messages[0];
    if (!m) return;
    const t = this.game.config.text;
    const g = this.game;
    const x = 64, w = 512, h = 104, y = 360 - h - 8;
    this.panel(x, y, w, h);
    // portrait: Liam on the left facing right, everyone else on the right facing left
    const pc = this.ctx;
    const sheetName = `${m.speaker}_portraits`;
    const sheet = g.sprites.sheet(sheetName);
    const idx = Math.max(0, (sheet && sheet.names ? sheet.names.indexOf(m.portrait) : 0));
    const cols = sheet && sheet.grid ? sheet.grid[1] : 4;
    const left = m.speaker === 'liam';
    const px = left ? x + 4 : x + w - 100;
    pc.fillStyle = '#2e2b3a'; pc.fillRect(px, y + 4, 96, 96);
    g.sprites.draw(pc, sheetName, Math.floor(idx / cols), idx % cols, px, y + 4);
    pc.strokeStyle = '#000'; pc.lineWidth = 1; pc.strokeRect(px + 0.5, y + 4.5, 95, 95);
    // name + text
    const tx = left ? x + 110 : x + 12;
    this.text(g.texts.names?.[m.speaker] || m.speaker, tx, y + 8, { color: t.nameColor, size: t.fontSizePx });
    const lines = this.wrap(m.text, w - 120, t.fontSizePx);
    lines.slice(0, 4).forEach((l, i) => this.text(l, tx, y + 28 + i * (t.fontSizePx + 5), { color: t.textColor, size: t.fontSizePx }));
    if (this.messages.length > 1) this.text('E ▸', left ? x + w - 22 : x + w - 126, y + h - 14, { size: 9, color: '#8b95a8' });
  }

  // small key hint above a world position
  prompt(label, x, y) {
    this.panel(x - 6, y - 8, 12, 12);
    this.text(label, x, y - 7, { size: 9, align: 'center', outline: false });
  }
}
