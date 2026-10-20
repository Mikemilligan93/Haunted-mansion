// Pause menu (Esc or P): freezes the game. Resume, Controls, Testing tools, Restart room.
// Keyboard only: up/down to move, E / Space / Enter to choose, Esc to go back or close.

export class PauseMenu {
  constructor(game) {
    this.game = game;
    this.open = false;
    this.view = 'main';   // main | controls
    this.index = 0;
  }

  items() {
    const t = this.game.texts.menu || {};
    return [
      { id: 'resume', label: t.resume || 'Resume' },
      { id: 'controls', label: t.controls || 'Controls' },
      { id: 'tools', label: t.tools || 'Testing tools' },
      { id: 'restart', label: t.restart || 'Restart room' },
    ];
  }

  setOpen(on) {
    this.open = on;
    this.view = 'main';
    this.index = 0;
    this.game.input.held.clear(); // nobody keeps walking after the menu closes
  }

  // Esc / P
  escape() {
    if (!this.open) this.setOpen(true);
    else if (this.view !== 'main') this.view = 'main';
    else this.setOpen(false);
  }

  key(a) {
    if (this.view === 'controls') { if (a === 'menu:interact') this.view = 'main'; return; }
    const n = this.items().length;
    if (a === 'menu:up') this.index = (this.index + n - 1) % n;
    else if (a === 'menu:down') this.index = (this.index + 1) % n;
    else if (a === 'menu:interact') this.choose(this.items()[this.index].id);
  }

  choose(id) {
    const g = this.game;
    if (id === 'resume') this.setOpen(false);
    else if (id === 'controls') this.view = 'controls';
    else if (id === 'tools') { this.setOpen(false); g.devtools.toggle(true); }
    else if (id === 'restart') { this.setOpen(false); g.switchScene(g.scene.name, { intro: g.scene.name === 'testroom' }); }
  }

  draw(ui) {
    if (!this.open) return;
    const c = ui.ctx, t = this.game.texts.menu || {};
    c.fillStyle = 'rgba(13, 11, 18, 0.62)';
    c.fillRect(0, 0, 640, 360);
    if (this.view === 'controls') return this.drawControls(ui);
    const items = this.items();
    const w = 200, h = 44 + items.length * 22, x = 320 - w / 2, y = 180 - h / 2;
    ui.panel(x, y, w, h);
    ui.text(t.title || 'Paused', 320, y + 10, { size: 16, align: 'center', color: '#c9d3e0' });
    items.forEach((it, i) => {
      const iy = y + 40 + i * 22;
      if (i === this.index) {
        c.fillStyle = '#6e1f35';
        c.fillRect(x + 12, iy - 3, w - 24, 19);
      }
      ui.text(it.label, 320, iy, { size: 12, align: 'center', color: i === this.index ? '#ffffff' : '#f2e6cc' });
    });
    ui.text(t.navHint || '↑↓ choose · E select · Esc close', 320, y + h + 8, { size: 9, align: 'center', color: '#8b95a8' });
  }

  drawControls(ui) {
    const t = this.game.texts.menu || {};
    const rows = this.game.texts.controls || [];
    const w = 360, h = 50 + rows.length * 18, x = 320 - w / 2, y = 180 - h / 2;
    ui.panel(x, y, w, h);
    ui.text(t.controls || 'Controls', 320, y + 10, { size: 16, align: 'center', color: '#c9d3e0' });
    rows.forEach(([action, keys], i) => {
      const ry = y + 40 + i * 18;
      ui.text(action, x + 16, ry, { size: 11, color: '#c9d3e0' });
      ui.text(keys, x + w - 16, ry, { size: 11, align: 'right', color: '#f2e6cc' });
    });
    ui.text(t.back || 'E or Esc: back', 320, y + h + 8, { size: 9, align: 'center', color: '#8b95a8' });
  }
}
