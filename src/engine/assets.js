// Loading JSON and sprites. Every missing asset falls back to a drawn placeholder,
// so the game runs before the art exists (and with ?noart=1 to test exactly that).

export async function loadJSON(url, fallback) {
  try {
    const r = await fetch(`${url}?v=${Date.now()}`);
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    console.warn(`[assets] could not load ${url}, using defaults`);
    return fallback;
  }
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => { console.warn(`[assets] missing image ${url}`); resolve(null); };
    img.src = url;
  });
}

// Default frame sizes, used when the manifest is missing too.
const DEFAULTS = {
  liam_td_idle: { frame: [48, 64], origin: [24, 62], grid: [3, 4], rows: ['down', 'left', 'up'], anims: { idle: { frames: [0, 1, 2, 3], fps: 3, loop: true } } },
  liam_td_walk: { frame: [48, 64], origin: [24, 62], grid: [3, 6], rows: ['down', 'left', 'up'], anims: { walk: { frames: [0, 1, 2, 3, 4, 5], fps: 9, loop: true } } },
  liam_td_inspect: { frame: [64, 64], origin: [32, 62], grid: [3, 3], rows: ['down', 'left', 'up'], anims: { inspect: { frames: [0, 1, 2], fps: 8, loop: false } } },
  liam_td_doorpose: { frame: [96, 64], origin: [48, 62], grid: [1, 4], rows: ['down'], anims: { doorpose: { frames: [0, 1, 2, 2, 2, 3], fps: 5, loop: false } } },
  liam_td_fidget: { frame: [80, 64], origin: [40, 62], grid: [3, 6], rows: ['cape', 'hair', 'rehearse'], anims: { fidget: { frames: [0, 1, 2, 3, 4, 5], fps: 4, loop: false } } },
  prop_window_sash: { frame: [64, 83], origin: [32, 83], grid: [2, 4], rows: ['day', 'night'], names: ['open', 'half', 'closed', 'bare'] },
  prop_door_panel: { frame: [55, 96], origin: [27, 96], grid: [1, 3], names: ['closed', 'ajar', 'open'] },
  prop_sconce: { frame: [15, 32], origin: [7, 32], grid: [1, 4], names: ['unlit', 'lit1', 'lit2', 'lit3'] },
  liam_portraits: { frame: [96, 96], origin: [0, 0], grid: [2, 4], names: ['grand', 'smug', 'flat', 'startled', 'panicked', 'embarrassed', 'soft', 'sad'] },
  ambrose_portraits: { frame: [96, 96], origin: [0, 0], grid: [2, 4], names: ['composed', 'polite', 'eyebrow', 'drifting', 'remembering', 'concerned', 'warm', 'shaken'] },
  ambrose_td_idle: { frame: [64, 80], origin: [32, 78], grid: [3, 4], rows: ['down', 'left', 'up'], anims: { idle: { frames: [0, 1, 2, 3], fps: 3, loop: true } } },
  ambrose_td_walk: { frame: [64, 80], origin: [32, 78], grid: [3, 6], rows: ['down', 'left', 'up'], anims: { walk: { frames: [0, 1, 2, 3, 4, 5], fps: 8, loop: true } } },
  ambrose_td_bow: { frame: [64, 80], origin: [32, 78], grid: [1, 4], rows: ['down'], anims: { bow: { frames: [0, 1, 2, 2, 2, 3, 0], fps: 6, loop: false } } },
  ambrose_td_drift: { frame: [64, 80], origin: [32, 78], grid: [1, 3], rows: ['down'], anims: { drift: { frames: [0, 1, 2], fps: 3, loop: false } } },
  ambrose_td_settable: { frame: [64, 80], origin: [32, 78], grid: [1, 5], rows: ['left'], anims: { settable: { frames: [0, 1, 2, 3, 4], fps: 4, loop: false } } },
  ambrose_td_windclock: { frame: [64, 88], origin: [32, 86], grid: [1, 4], rows: ['up'], anims: { windclock: { frames: [0, 1, 2, 1, 2, 3], fps: 5, loop: false } } },
};

export class Sprites {
  constructor(manifest, images) {
    this.sheets = { ...DEFAULTS, ...manifest.sheets };
    this.images = images;
  }

  static async load(base, { noArt = false } = {}) {
    const manifest = noArt ? { sheets: {} } : await loadJSON(`${base}manifest.json`, { sheets: {} });
    const images = {};
    await Promise.all(Object.entries(manifest.sheets).map(async ([name, s]) => {
      images[name] = await loadImage(`${base}${s.image}`);
    }));
    return new Sprites(manifest, images);
  }

  has(name) { return !!this.images[name]; }
  sheet(name) { return this.sheets[name]; }

  rowIndex(name, row) {
    const s = this.sheets[name];
    if (!s || typeof row === 'number') return row || 0;
    const i = (s.rows || []).indexOf(row);
    return i < 0 ? 0 : i;
  }

  // Draw frame (row, col) with its origin at (x, y). flip = mirror horizontally.
  draw(ctx, name, row, col, x, y, { flip = false, alpha = 1 } = {}) {
    const s = this.sheets[name];
    const img = this.images[name];
    if (!s || !img) return drawFallback(ctx, name, x, y, s, flip, col);
    const [fw, fh] = s.frame;
    const [ox, oy] = s.origin;
    const r = this.rowIndex(name, row);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (flip) {
      ctx.translate(Math.round(x), Math.round(y));
      ctx.scale(-1, 1);
      ctx.drawImage(img, col * fw, r * fh, fw, fh, -ox, -oy, fw, fh);
    } else {
      ctx.drawImage(img, col * fw, r * fh, fw, fh, Math.round(x - ox), Math.round(y - oy), fw, fh);
    }
    ctx.restore();
  }

  // Tiles: region row from the manifest ("plain", "wall", "cap"...)
  drawTile(ctx, name, region, index, x, y) {
    const s = this.sheets[name];
    const img = this.images[name];
    const reg = s && s.regions && s.regions[region];
    if (!img || !reg) return false;
    const [fw, fh] = s.frame;
    const [w, h] = reg.size;
    ctx.drawImage(img, index * fw, reg.row * fh, w, h, Math.round(x), Math.round(y), w, h);
    return true;
  }
}

// ---------------------------------------------------------------- fallbacks
function drawFallback(ctx, name, x, y, s, flip, col = 0) {
  ctx.save();
  x = Math.round(x); y = Math.round(y);
  if (name === 'ambrose_portraits') {
    ctx.fillStyle = '#3b2e26'; ctx.fillRect(x, y, 96, 96);
    ctx.fillStyle = '#d8bfa0'; ctx.fillRect(x + 32, y + 14, 34, 42);
    ctx.fillStyle = '#b8ad9c'; ctx.fillRect(x + 14, y + 34, 18, 18); ctx.fillRect(x + 66, y + 34, 18, 18);
    ctx.fillStyle = '#5a4636'; ctx.fillRect(x + 18, y + 64, 62, 32);
  } else if (name.startsWith('ambrose')) {
    // sepia column + whiskers + candelabra: Ambrose before his art exists
    ctx.fillStyle = '#3b2e26'; ctx.fillRect(x - 8, y - 46, 16, 46);
    ctx.fillStyle = '#efe3c4'; ctx.fillRect(x - 3, y - 44, 6, 10);
    ctx.fillStyle = '#d8bfa0'; ctx.fillRect(x - 6, y - 62, 12, 17);
    ctx.fillStyle = '#b8ad9c'; ctx.fillRect(x - 11, y - 55, 5, 8); ctx.fillRect(x + 6, y - 55, 5, 8);
    const s = flip ? -1 : 1;
    ctx.fillStyle = '#9c8352'; ctx.fillRect(x - 15 * s, y - 40, 2, 12); ctx.fillRect(x - 18 * s, y - 42, 8, 2);
    ctx.fillStyle = '#ffb13b'; [-18, -15, -12].forEach((dx) => ctx.fillRect(x + dx * s, y - 46, 1, 3));
  } else if (name.startsWith('liam_portraits')) {
    ctx.fillStyle = '#2e2b3a'; ctx.fillRect(x, y, 96, 96);
    ctx.fillStyle = '#c9d3e0'; ctx.fillRect(x + 28, y + 14, 40, 40);
    ctx.fillStyle = '#6e1f35'; ctx.fillRect(x + 18, y + 60, 60, 36);
  } else if (name.startsWith('liam_bat')) {
    ctx.fillStyle = '#1c1a24'; ctx.fillRect(x - 14, y - 6, 28, 8);
    ctx.fillStyle = '#c9d3e0'; ctx.fillRect(x - 3, y - 10, 6, 5);
  } else if (name.startsWith('liam')) {
    // a black cape body with a silver head: unmistakably "Liam, no art yet"
    ctx.fillStyle = '#1a1020'; ctx.fillRect(x - 10, y - 34, 20, 34);
    ctx.fillStyle = '#6e1f35'; ctx.fillRect(x - 10, y - 34, 3, 26); ctx.fillRect(x + 7, y - 34, 3, 26);
    ctx.fillStyle = '#f2e6cc'; ctx.fillRect(x - 5, y - 32, 10, 14);
    ctx.fillStyle = '#e8eef5'; ctx.fillRect(x - 9, y - 56, 18, 20);
    ctx.fillStyle = '#2a2233'; ctx.fillRect(x - 5 + (flip ? -1 : 1), y - 46, 3, 2); ctx.fillRect(x + 2 + (flip ? -1 : 1), y - 46, 3, 2);
  } else if (name === 'prop_window_sash') {
    ctx.fillStyle = '#56402f'; ctx.fillRect(x - 30, y - 80, 60, 80);
    ctx.fillStyle = col >= 4 ? '#2f3b4a' : '#a9c2d6'; ctx.fillRect(x - 24, y - 72, 48, 62);
  } else if (name === 'prop_door_panel') {
    ctx.fillStyle = '#3e2c22'; ctx.fillRect(x - 27, y - 96, 55, 96);
    ctx.fillStyle = col === 2 ? '#1a1020' : '#56402f'; ctx.fillRect(x - 21, y - 88, 43, 88);
  } else if (name === 'prop_sconce') {
    ctx.fillStyle = '#9c8352'; ctx.fillRect(x - 3, y - 26, 6, 26);
    ctx.fillStyle = '#efe3c4'; ctx.fillRect(x - 2, y - 32, 4, 8);
    if (col > 0) { ctx.fillStyle = '#ffb13b'; ctx.fillRect(x - 1, y - 36, 3, 4); }
  } else {
    // unknown: a loud checker so it is obvious something is missing
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      ctx.fillStyle = (i + j) % 2 ? '#ff00ff' : '#1a1020';
      ctx.fillRect(x - 8 + i * 4, y - 16 + j * 4, 4, 4);
    }
  }
  ctx.restore();
}
