// Keyboard input: held keys plus "pressed this step" edges.
const MAP = {
  ArrowUp: ['up', 'jump'], KeyW: ['up', 'jump'], ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  KeyE: ['interact', 'attack'], Space: ['interact', 'jump'], Enter: 'interact', NumpadEnter: 'interact',
  KeyJ: 'attack', KeyF: 'throw', KeyK: 'throw', KeyQ: 'bat',
  Escape: 'menu', KeyP: 'menu',
  F1: 'devtools', Backquote: 'devtools', Period: 'step',
  KeyV: 'viewer', BracketLeft: 'pagePrev', BracketRight: 'pageNext',
};
// a key can mean several things (Space = interact in the house, jump in the paintings)
const actions = (code) => [].concat(MAP[code] || []);

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
      const list = actions(e.code);
      if (!list.length) return;
      const a = list[0];
      if (this.blocked() && a !== 'devtools') return;
      if (['up', 'down', 'left', 'right', 'interact', 'devtools', 'menu'].includes(a)) e.preventDefault();
      if (this.menuActive() && MENU_KEYS.has(a)) { if (!e.repeat || a === 'up' || a === 'down') this.onGlobal(`menu:${a}`); return; }
      if (GLOBAL.has(a)) { if (!e.repeat) this.onGlobal(a); return; }
      for (const x of list) {
        if (!e.repeat) this.queue.push(x);
        this.held.add(x);
      }
    });
    window.addEventListener('keyup', (e) => { for (const a of actions(e.code)) this.held.delete(a); });
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
