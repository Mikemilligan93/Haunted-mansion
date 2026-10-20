// Day/night and lighting. Darkness is a layer over the scene; lights punch stepped
// (pixel-style) holes into it, then a soft warm glow is added on top.
import { smooth, hexToRgb } from '../engine/util.js';

// 0 = full night, 1 = full day
export function daylight(hour, t) {
  if (hour >= t.dayStart && hour < t.duskStart) return 1;
  if (hour >= t.dawnStart && hour < t.dayStart) return smooth((hour - t.dawnStart) / (t.dayStart - t.dawnStart));
  if (hour >= t.duskStart && hour < t.nightStart) return 1 - smooth((hour - t.duskStart) / (t.nightStart - t.duskStart));
  return 0;
}

export function sconcesLit(hour, l) {
  return hour >= l.sconcesLitFrom || hour < l.sconcesLitUntil;
}

function pixelDisc(ctx, cx, cy, r) {
  cx = Math.round(cx); cy = Math.round(cy); r = Math.round(r);
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.round(Math.sqrt(r * r - dy * dy));
    ctx.fillRect(cx - w, cy + dy, w * 2, 1);
  }
}

export class Lighting {
  constructor(w, h) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = w; this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.lastDarkness = 0;
  }

  // lights: [{x, y, r, intensity}]
  render(ctx, game, lights) {
    const L = game.config.light;
    const dl = daylight(game.clock.hour, game.config.time);
    const darkness = L.nightDarkness * (1 - dl);
    this.lastDarkness = darkness;
    const w = this.canvas.width, h = this.canvas.height;

    // dusk / dawn: a warm tint, strongest halfway through the transition
    if (dl > 0 && dl < 1) {
      ctx.save();
      ctx.globalCompositeOperation = 'soft-light';
      ctx.globalAlpha = L.duskTintStrength * Math.sin(Math.PI * dl) * 2;
      ctx.fillStyle = L.duskTint;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
    if (darkness <= 0.001) return;

    const d = this.ctx;
    d.globalCompositeOperation = 'source-over';
    d.clearRect(0, 0, w, h);
    d.globalAlpha = darkness;
    d.fillStyle = L.nightTint;
    d.fillRect(0, 0, w, h);
    d.globalCompositeOperation = 'destination-out';
    for (const lt of lights) {
      const k = lt.intensity ?? 1;
      for (const [rr, a] of [[1, 0.3], [0.72, 0.55], [0.45, 0.8], [0.22, 1]]) {
        d.globalAlpha = a * k;
        pixelDisc(d, lt.x, lt.y, lt.r * rr);
      }
    }
    d.globalCompositeOperation = 'source-over';
    d.globalAlpha = 1;
    ctx.drawImage(this.canvas, 0, 0);

    // warm glow around flames (additive), scaled by how dark it is
    const [r, g, b] = hexToRgb('#ffb13b');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const lt of lights) {
      if (!lt.warm) continue;
      ctx.globalAlpha = L.sconceGlowAlpha * (lt.intensity ?? 1) * Math.min(1, darkness * 1.5);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      pixelDisc(ctx, lt.x, lt.y, lt.r * 0.35);
    }
    ctx.restore();
  }
}
