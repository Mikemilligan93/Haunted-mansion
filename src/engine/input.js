// Keyboard input: held keys plus "pressed this step" edges.
const MAP = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  KeyE: 'interact', Space: 'interact', Enter: 'interact', NumpadEnter: 'interact',
  Escape: 'menu', KeyP: 'menu',
  F1: 'devtools', Backquote: 'devtools', Period: 'step',
  KeyV: 'viewer', BracketLeft: 'pagePrev', BracketRight: 'pageNext',
};

// handled immediately, even while the game is paused
const GLOBAL = new Set(['menu', 'devtools', 'step', 'viewer', 'pagePrev', 'pageNext']);
// while the pause menu is open these go to the menu instead of the game
const MENU_KEYS = new Set(['up', 'down', 'left', 'right', 'interact']);

export class Input {
  constructor() {
    this.onGlobal = () => {};
    this.held = new Set();
    this.queue = [];      // presses waiting for the next simulation step
    this.pressed = new Set();
    this.blocked = () => false; // set by devtools: true while typing in a field
    this.menuActive = () => false; // set by main: true while the pause menu is open
    window.addEventListener('keydown', (e) => {
      const a = MAP[e.code];
      if (!a) return;
      if (this.blocked() && a !== 'devtools') return;
      if (['up', 'down', 'left', 'right', 'interact', 'devtools', 'menu'].includes(a)) e.preventDefault();
      if (this.menuActive() && MENU_KEYS.has(a)) { if (!e.repeat || a === 'up' || a === 'down') this.onGlobal(`menu:${a}`); return; }
      if (GLOBAL.has(a)) { if (!e.repeat) this.onGlobal(a); return; }
      if (!e.repeat) this.queue.push(a);
      this.held.add(a);
    });
    window.addEventListener('keyup', (e) => { const a = MAP[e.code]; if (a) this.held.delete(a); });
    window.addEventListener('blur', () => this.held.clear());
  }
  // called once per simulation step
  beginStep() { this.pressed = new Set(this.queue); this.queue = []; }
  isDown(a) { return this.held.has(a); }
  wasPressed(a) { return this.pressed.has(a); }
  // used by tests and the debug tools
  tap(a) { this.queue.push(a); }
  hold(a, on) { on ? this.held.add(a) : this.held.delete(a); }
}
