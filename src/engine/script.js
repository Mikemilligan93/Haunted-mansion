// Cutscene scripts as generator functions. A script yields "waiters"; each waiter is
//   { update(dt) -> true when finished }
// and the runner moves on when it reports done. Example:
//   function* meeting(s) { yield wait(1); yield say(g, lines); s.twins.show(); }
// Save states store which script was running and restart it from the top.

export class Script {
  constructor(gen, name = 'script') {
    this.gen = gen;
    this.name = name;
    this.cur = null;
    this.done = false;
    this.next();
  }

  next(value) {
    const r = this.gen.next(value);
    if (r.done) { this.done = true; this.cur = null; return; }
    this.cur = r.value || null;
  }

  update(dt) {
    // several instant steps can run in one frame; a waiter that needs time stops the loop
    for (let guard = 0; guard < 50 && !this.done; guard++) {
      if (this.cur && !this.cur.update(dt)) return;
      dt = 0;
      this.next();
    }
  }
}

// ---------------------------------------------------------------- waiters
export const wait = (t) => ({ update(dt) { t -= dt; return t <= 0; } });
export const until = (fn) => ({ update() { return !!fn(); } });
export const frames = (n = 1) => ({ update() { return --n <= 0; } });

// show lines and wait until they have all been read (E skips a line)
export function say(game, lines) {
  game.ui.sayAll([].concat(lines));
  return until(() => !game.ui.speaking);
}

// move an actor (anything with x, y and a walk(dx, dy, moving) hook) to a point
export function walkTo(actor, x, y, speed) {
  return {
    update(dt) {
      const dx = x - actor.x, dy = y - actor.y, d = Math.hypot(dx, dy);
      if (d < 1) { actor.x = x; actor.y = y; actor.walk?.(0, 0, false); return true; }
      const step = Math.min(d, speed * dt);
      actor.x += (dx / d) * step; actor.y += (dy / d) * step;
      actor.walk?.(dx, dy, true, dt);
      return false;
    },
  };
}

// run several waiters side by side; finished when all are
export const all = (...ws) => ({ update(dt) { let ok = true; for (const w of ws) if (!w.done) { w.done = w.update(dt); ok = ok && w.done; } return ok; } });
