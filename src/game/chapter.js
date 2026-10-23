// Chapter 1: the Twins. A multi-room scene (Liam's bedroom, the landing, the nursery, the guest
// room and the linen closet) driven by a story step:
//   opening -> toNursery -> meeting -> seeking -> pulled -> (toy-army fight) -> yourTurn -> epilogue -> done
// Cutscenes are generator scripts (src/engine/script.js). All lines are in texts.json -> twins,
// all numbers in config.json -> twins / fright, the map in levels/twins.json.
import { MapRoom } from './maproom.js';
import { Liam } from './liam.js';
import { Twin } from './twins.js';
import { Ambrose } from './ambrose.js';
import { Lighting } from './lighting.js';
import { Script, wait, until, say, walkTo, all } from '../engine/script.js';

export const STEPS = ['opening', 'toNursery', 'meeting', 'seeking', 'pulled', 'fight', 'yourTurn', 'epilogue', 'done'];
const after = (step, ref) => STEPS.indexOf(step) > STEPS.indexOf(ref);
const atLeast = (step, ref) => STEPS.indexOf(step) >= STEPS.indexOf(ref);

// a fresh chapter state, with everything an earlier step would have done (for test links)
export function newChapter(step = 'opening') {
  const c = {
    step, found: { frida: false, wilhelmina: false }, spots: {}, visited: {}, rooms: {},
    batAtWill: false, memento: false, fright: 0, fightPhase: 1,
  };
  if (after(step, 'meeting')) c.visited = { bedroom: true, landing: true, nursery: true };
  if (atLeast(step, 'pulled')) c.found = { frida: true, wilhelmina: true };
  if (after(step, 'yourTurn')) c.batAtWill = true;
  if (step === 'done') c.memento = true;
  return c;
}

export const CHAPTER_SPAWNABLE = {
  frida: { label: 'Frida (twin)' },
  wilhelmina: { label: 'Wilhelmina (twin, mirrored)' },
  ambrose: { label: 'Ambrose' },
  scare: { label: 'A scare (+fright)' },
  dialogue: { label: 'Cutscene: test dialogue' },
};

export class ChapterScene {
  constructor(game, opts = {}) {
    this.game = game;
    this.name = 'twins';
    this.isChapter = true;
    const C = game.config.twins;
    if (opts.step || !game.chapter) game.chapter = newChapter(opts.step || 'opening');
    this.level = game.levels.twins;
    this.lighting = new Lighting(640, 360);
    this.nightDarkness = C.nightDarkness;
    if (!game.params.has('time') || opts.step) { game.clock.hour = C.hour; }
    game.clock.frozen = true;          // the chapter happens in one night
    this.entities = [];
    this.floaters = [];                // "hee hee", counting numbers...
    this.propAnims = [];               // rocking horse, rattling chest, painting swirl
    this.fadeAlpha = 0;
    this.hint = null;                  // small panel at the top: { text, t }
    this.card = null;                  // chapter card at the end
    this.giggleT = C.giggleEverySeconds;
    this.frightShow = 0;
    this.liamHidden = false;
    this.twins = { frida: new Twin(this, 'frida', 0, 0), wilhelmina: new Twin(this, 'wilhelmina', 0, 0) };
    for (const t of Object.values(this.twins)) t.show(false, true);
    this.ambrose = null;
    this.liam = new Liam(game, 0, 0);
    const ch = game.chapter;
    const roomId = opts.room || (ch.step === 'opening' ? this.level.start.room : this.defaultRoom(ch.step));
    this.enterRoom(roomId, { silent: true, at: opts.at });
    if (!opts.restore) this.beginStep(ch.step);
  }

  get chapter() { return this.game.chapter; }
  get T() { return this.game.texts.twins || {}; }
  get C() { return this.game.config.twins; }

  defaultRoom(step) {
    return { toNursery: 'bedroom', meeting: 'nursery', seeking: 'nursery', pulled: 'nursery', yourTurn: 'nursery', epilogue: 'nursery', done: 'bedroom' }[step] || 'bedroom';
  }

  // ---------------------------------------------------------------- lines from texts.json
  // entries are { who, face, text } (who: liam | twins | ambrose); a string means Liam, flat
  lines(list) {
    const portraitDefault = { liam: 'flat', twins: 'stare', ambrose: 'composed' };
    return [].concat(list || []).map((l) => (typeof l === 'string'
      ? { text: l, speaker: 'liam', portrait: 'flat' }
      : { text: l.text, speaker: l.who || 'liam', portrait: l.face || portraitDefault[l.who || 'liam'] }));
  }
  sayLines(list) { return say(this.game, this.lines(list)); }

  // ---------------------------------------------------------------- rooms
  enterRoom(id, { fromDoor = null, silent = false, at = null } = {}) {
    const ch = this.chapter;
    if (this.room) ch.rooms[this.room.id] = this.room.serialize();
    this.room = new MapRoom(this.game, id, this.level.rooms[id]);
    this.room.restore(ch.rooms[id]);
    this.room.showMemento = ch.memento;
    this.applyRoomState();
    const l = this.liam;
    if (fromDoor) {
      const d = this.room.doorById(fromDoor);
      l.x = d.x; l.y = this.room.floorTop + 12; l.dir = 'down';
      this.room.doorStates[d.id] = 'ajar';
      this.doorCloseT = 0.3;
      this.doorClosing = d.id;
    } else if (at) { l.x = this.room.inX + at[0]; l.y = this.room.floorTop + at[1]; }
    else if (id === this.level.start.room) { l.x = this.room.inX + this.level.start.x; l.y = this.room.floorTop + this.level.start.y; }
    else { const b = this.room.bounds(); l.x = (b.x1 + b.x2) / 2; l.y = (b.y1 + b.y2) / 2; }
    if (l.form === 'human' && l.mode !== 'scripted') { l.mode = 'free'; l.setAnim({ sheet: 'liam_td_idle', name: 'idle' }); }
    this.entities = [];
    this.floaters = [];
    this.propAnims = [];
    this.placeTwins();
    const first = !ch.visited[id];
    ch.visited[id] = true;
    this.lastEnterFirst = first;
    if (!silent) this.onEnter(id, first);
  }

  // frames that follow the story (found twins leave their hiding places, etc.)
  applyRoomState() {
    const ch = this.chapter, r = this.room, sp = ch.spots;
    if (r.id === 'nursery') {
      r.frames.bed1 = ch.found.frida ? 'empty' : 'made';
      r.frames.bed2 = sp.bed2 ? 'empty' : 'hiding';
      r.hiddenProps.ragdoll = !sp.bed2;
      r.frames.chest = sp.chest ? 'chest_open' : 'chest_closed';
      r.frames.dollhouse = sp.dollhouse >= 2 ? 'lit' : sp.dollhouse ? 'open' : 'closed';
      r.frames.painting = 'still';
    }
    if (r.id === 'guest') {
      r.frames.wardrobe = this.chapter.step === 'yourTurn' ? 'open' : ch.found.wilhelmina ? 'closed' : 'ajar';
    }
  }

  placeTwins() {
    const ch = this.chapter, r = this.room, step = ch.step;
    const stand = this.level.rooms.nursery.twinsStand;
    for (const t of Object.values(this.twins)) t.show(false, true);
    if (r.id !== 'nursery') return;
    const put = (who, i) => { const t = this.twins[who]; t.x = r.inX + stand[i][0]; t.y = r.floorTop + stand[i][1]; t.dir = 'down'; t.show(true, true); t.anim = { sheet: 'twins_td_idle', name: 'idle', row: 'down', t: 0 }; };
    if (step === 'seeking') { if (ch.found.frida) put('frida', 0); if (ch.found.wilhelmina) put('wilhelmina', 1); }
    if (step === 'pulled' || step === 'epilogue' || step === 'done') { put('frida', 0); put('wilhelmina', 1); }
    if (step === 'yourTurn' && this.counting) this.placeCounting();
  }

  // during "your turn": both face the wall by the linen door with their hands over their eyes
  placeCounting() {
    const r = this.room, d = r.doorById('linen');
    [['frida', -26], ['wilhelmina', -8]].forEach(([who, dx]) => {
      const t = this.twins[who];
      t.x = d.x + dx - 40; t.y = r.floorTop + 10; t.dir = 'up'; t.show(true, true);
      t.play('twins_td_count', 'count', 'up', null, true);
      t.anim.loopCount = true;
    });
  }

  onEnter(id, first) {
    const ch = this.chapter, T = this.T;
    if (ch.step === 'toNursery' && id === 'nursery') { this.setStep('meeting'); return; }
    if (ch.step === 'pulled' && id === 'nursery') { this.run('pulled', this.pulled()); return; }
    // Liam's signature: a dramatic pose at every new door
    if (first && this.liam.form === 'human') {
      this.liam.play('liam_td_doorpose', 'doorpose', { row: 'down' });
      const line = T.enter?.[id];
      if (line) this.game.ui.sayAll(this.lines(line));
    }
    if (ch.step === 'toNursery' && id === 'landing' && !ch.spots.ball) this.run('landingBall', this.landingBall());
  }

  // ---------------------------------------------------------------- steps
  setStep(step) {
    this.chapter.step = step;
    this.beginStep(step);
    this.game.devtools?.refresh();
  }

  beginStep(step) {
    const r = this.room;
    this.script = null;
    this.counting = false;
    this.liamHidden = false;
    if (step === 'opening') this.run('opening', this.opening());
    else if (step === 'meeting') this.run('meeting', this.meeting());
    else if (step === 'pulled' && r.id === 'nursery') this.run('pulled', this.pulled());
    else if (step === 'yourTurn') this.run('yourTurn', this.yourTurn());
    else if (step === 'epilogue') this.run('epilogue', this.epilogue());
    else if (step === 'fight') this.goFight = true; // switched on the next update (never from inside a constructor)
    this.applyRoomState();
    this.placeTwins();
  }

  run(name, gen) { this.script = new Script(gen, name); }

  locked(door) {
    const step = this.chapter.step, from = this.room.id;
    if (['opening', 'meeting', 'epilogue'].includes(step)) return 'default';
    if (step === 'toNursery' && from === 'landing' && door.id === 'guest') return 'guest';
    if (step === 'toNursery' && from === 'nursery' && door.id === 'linen') return 'linen';
    return null;
  }

  tryDoor(door) {
    const g = this.game, l = this.liam;
    const why = this.locked(door);
    if (why) {
      if (!g.ui.speaking) g.ui.sayAll(this.lines(this.T.locked?.[why] || this.T.locked?.default));
      return;
    }
    this.room.doorStates[door.id] = 'open';
    l.mode = 'scripted';
    this.trans = { t: 0, door, phase: 'out' };
  }

  updateTransition(dt) {
    const tr = this.trans, F = this.C.doorFadeSeconds;
    tr.t += dt;
    if (tr.phase === 'out') {
      this.fadeAlpha = Math.min(1, tr.t / F);
      if (tr.t >= F) {
        const { door } = tr;
        this.enterRoom(door.to, { fromDoor: door.toDoor, silent: true });
        this.liam.mode = 'scripted';
        tr.phase = 'in'; tr.t = 0;
        tr.first = this.lastEnterFirst;
      }
    } else {
      this.fadeAlpha = Math.max(0, 1 - tr.t / F);
      if (tr.t >= F) {
        this.trans = null;
        this.fadeAlpha = 0;
        this.liam.mode = 'free';
        this.onEnter(this.room.id, tr.first);
      }
    }
  }

  // ---------------------------------------------------------------- spots (E)
  inspect(it) {
    const g = this.game, ch = this.chapter, T = this.T.spots || {}, l = this.liam, r = this.room;
    if (it.door) return this.tryDoor(it.door);
    if (l.form === 'human') { l.dir = it.face; l.play('liam_td_inspect', 'inspect', { row: it.face === 'down' ? 'down' : 'up' }); }
    const once = (id) => { const n = ch.spots[id] || 0; ch.spots[id] = n + 1; return n === 0; };
    const seeking = ch.step === 'seeking';
    const S = (key) => g.ui.sayAll(this.lines(T[key]));
    switch (it.id) {
      case 'teatable': return S(ch.memento ? 'teatableLater' : 'teatable');
      case 'window': {
        if (r.id === 'guest' && seeking && once('curtains')) { r.cycleCurtain(); this.scare('window'); return S('curtainsScare'); }
        const c = r.cycleCurtain();
        return g.ui.say(g.texts.window?.[c], { portrait: 'flat' });
      }
      case 'painting': return S(seeking ? 'paintingSeeking' : 'painting');
      case 'bed1':
        if (seeking && !ch.found.frida) return this.run('found', this.foundTwin('frida'));
        return S('bed1Empty');
      case 'bed2':
        if (!ch.spots.bed2) { once('bed2'); this.applyRoomState(); this.scare('bed2'); return S('bed2'); }
        return S('bed2Later');
      case 'chest':
        if (!ch.spots.chest) {
          once('chest');
          this.propAnims.push({ id: 'chest', shake: 0.6, then: () => { ch.spots.chest = 1; this.applyRoomState(); } });
          this.scare('chest');
          return S('chest');
        }
        return S('chestLater');
      case 'horse':
        if (once('horse')) { this.rockHorse(2.5); this.scare('horse'); return S('horse'); }
        this.rockHorse(1); return S('horseLater');
      case 'dollhouse': {
        const n = (ch.spots.dollhouse || 0) + 1;
        ch.spots.dollhouse = n;
        this.applyRoomState();
        return S(n === 1 ? 'dollhouse' : 'dollhouseLit');
      }
      case 'marks': return S('marks');
      case 'underbed': return S(ch.found.wilhelmina ? 'underbedLater' : 'underbed');
      case 'linens': return S('linens');
      case 'wardrobe':
        if (ch.step === 'yourTurn') {
          if (l.form === 'bat') return this.run('hidden', this.hiddenFound());
          return S('tooBig');
        }
        if (seeking && !ch.found.wilhelmina) return this.run('found', this.foundTwin('wilhelmina'));
        return S('wardrobeLater');
      default:
        return null;
    }
  }

  rockHorse(seconds) { this.propAnims.push({ id: 'horse', frames: ['level', 'forward', 'level2', 'back'], fps: 5, t: 0, left: seconds, end: 'level' }); }

  // ---------------------------------------------------------------- fright
  scare(kind) {
    const F = this.game.config.fright;
    this.addFright(F.scares[kind] ?? F.scares.default);
  }

  addFright(n) {
    const ch = this.chapter, F = this.game.config.fright, l = this.liam;
    if (l.form !== 'human') return;
    ch.fright = Math.min(F.max, ch.fright + n);
    this.frightShow = F.showSeconds;
    this.frightFlash = 0.4;
    if (ch.fright >= F.max && !this.script) this.panic();
  }

  panic() {
    const l = this.liam;
    if (l.form !== 'human') return false;
    l.mode = 'free';
    l.transform(true, { panic: true });
    this.game.ui.sayAll(this.lines(this.T.panicLine));
    return true;
  }

  // ---------------------------------------------------------------- cutscenes
  *opening() {
    const g = this.game, l = this.liam, r = this.room, door = r.doors[0];
    l.mode = 'scripted'; l.dir = 'down'; l.setAnim({ sheet: 'liam_td_idle', name: 'idle' });
    yield wait(0.6);
    // Ambrose comes in with the evening tea
    r.doorStates[door.id] = 'ajar';
    yield wait(0.2);
    r.doorStates[door.id] = 'open';
    const A = new Ambrose(this, door.x, r.floorTop + 10, { schedule: false });
    A.scripted = true; A.alpha = 0; this.ambrose = A;
    yield { update: (dt) => (A.alpha = Math.min(1, A.alpha + dt / 0.5)) >= 1 };
    r.doorStates[door.id] = 'closed';
    yield walkTo(A, l.x - 34, l.y - 2, g.config.ambrose.speed);
    A.dir = 'right'; A.walk(0, 0, false); l.dir = 'left';
    A.play('ambrose_td_bow', 'bow', 'down');
    yield until(() => A.animDone());
    A.play('ambrose_td_produce', 'produce', 'tea');
    yield until(() => A.animDone());
    A.dir = 'right'; A.walk(0, 0, false);
    yield this.sayLines(this.T.opening);
    yield walkTo(A, door.x, r.floorTop + 10, g.config.ambrose.speed);
    r.doorStates[door.id] = 'open';
    yield { update: (dt) => (A.alpha = Math.max(0, A.alpha - dt / 0.5)) <= 0 };
    r.doorStates[door.id] = 'closed';
    this.ambrose = null;
    yield this.sayLines(this.T.openingAfter);
    l.mode = 'free';
    this.showHint(this.T.ui?.goHint);
    this.chapter.step = 'toNursery';
    this.game.devtools?.refresh();
  }

  *landingBall() {
    const r = this.room, b = r.bounds();
    this.chapter.spots.ball = 1;
    const ball = { x: b.x2 + 10, y: r.floorTop + 40, t: 0 };
    this.rollingBall = ball;
    yield { update: (dt) => { ball.t += dt; ball.x -= 70 * dt; return ball.x < b.x1 - 10; } };
    this.rollingBall = null;
    this.scare('ball');
    yield this.sayLines(this.T.landingBall);
    this.giggle(r.doorById('nursery').x, r.floorTop - 30);
  }

  *meeting() {
    const g = this.game, l = this.liam, r = this.room, F = g.config.fright;
    this.chapter.step = 'meeting';
    if (r.id !== 'nursery') { this.enterRoom('nursery', { fromDoor: 'landing', silent: true }); }
    const room = this.room;
    l.mode = 'scripted';
    yield walkTo(l, l.x + 24, room.floorTop + 92, g.config.liam.walkSpeed * 0.6); // into the room, clear of the beds
    l.dir = 'right'; l.walk(0, 0, false);
    yield wait(0.6);
    this.rockHorse(3);
    this.addFright(F.scares.horse);
    yield this.sayLines(this.T.meeting?.horse);
    this.propAnims.push({ id: 'chest', shake: 1.0 });
    this.addFright(F.scares.chest);
    yield this.sayLines(this.T.meeting?.chest);
    room.dim = 0.35;
    this.addFright(F.scares.lights);
    yield wait(0.6);
    // "Found you..." right behind him
    const f = this.twins.frida, w = this.twins.wilhelmina;
    f.x = l.x - 22; f.y = l.y - 6; w.x = l.x + 22; w.y = l.y - 6;
    f.dir = 'right'; w.dir = 'left';
    f.anim.row = 'right'; w.anim.row = 'left';
    f.show(true); w.show(true);
    yield wait(0.6);
    yield this.sayLines(this.T.meeting?.whisper);
    f.show(false); w.show(false);
    // the meter fills up: his first panic
    yield { update: (dt) => { this.chapter.fright = Math.min(F.max, this.chapter.fright + F.max * dt * 1.5); this.frightShow = F.showSeconds; return this.chapter.fright >= F.max; } };
    this.panic();
    yield until(() => l.form === 'human' && l.mode === 'free');
    this.chapter.fright = 0;
    l.mode = 'scripted';
    room.dim = 1;
    // there they are
    this.chapter.step = 'meeting';
    const stand = this.level.rooms.nursery.twinsStand;
    f.x = room.inX + stand[0][0]; f.y = room.floorTop + stand[0][1];
    w.x = room.inX + stand[1][0]; w.y = room.floorTop + stand[1][1];
    f.show(true); w.show(true);
    yield wait(0.6);
    f.play('twins_td_giggle', 'giggle', 'down'); w.play('twins_td_giggle', 'giggle', 'down');
    yield this.sayLines(this.T.meeting?.after);
    // Liam counts; they hide
    yield this.fade(1, 0.6);
    f.show(false, true); w.show(false, true);
    yield this.sayLines(this.T.meeting?.count);
    this.chapter.step = 'seeking';
    this.applyRoomState();
    yield this.fade(0, 0.6);
    l.mode = 'free';
    this.showHint(this.T.ui?.seekHint);
    yield this.sayLines(this.T.meeting?.seekStart);
    this.game.devtools?.refresh();
  }

  *foundTwin(who) {
    const g = this.game, l = this.liam, r = this.room, ch = this.chapter, t = this.twins[who];
    l.mode = 'scripted';
    const prop = r.prop(who === 'frida' ? 'bed1' : 'wardrobe');
    r.frames[prop.id] = who === 'frida' ? 'empty' : 'open';
    t.x = prop.x + (who === 'frida' ? 0 : 0); t.y = prop.y + (who === 'frida' ? 8 : 10); t.dir = 'down';
    t.show(true);
    yield wait(0.3);
    t.play('twins_td_giggle', 'giggle', 'down');
    ch.found[who] = true;
    yield this.sayLines(this.T.found?.[who]);
    t.show(false);
    yield wait(0.4);
    this.applyRoomState();
    l.mode = 'free';
    if (ch.found.frida && ch.found.wilhelmina) {
      ch.step = 'pulled';
      if (r.id === 'nursery') { this.placeTwins(); this.run('pulled', this.pulled()); return; }
      yield this.sayLines(this.T.found?.both);
      this.showHint(this.T.ui?.backHint);
    } else {
      if (r.id === 'nursery') this.placeTwins();
      yield this.sayLines(this.T.found?.oneLeft);
    }
    this.game.devtools?.refresh();
  }

  *pulled() {
    const g = this.game, l = this.liam, r = this.room;
    this.chapter.step = 'pulled';
    l.mode = 'scripted';
    this.placeTwins();
    const f = this.twins.frida, w = this.twins.wilhelmina, p = r.prop('painting');
    yield walkTo(l, p.x, r.floorTop + 60, g.config.liam.walkSpeed);
    l.dir = 'up'; l.walk(0, 0, false);
    f.face(l.x, l.y); w.face(l.x, l.y);
    yield this.sayLines(this.T.pulled);
    // the painting turns into a portal and pulls them in
    this.propAnims.push({ id: 'painting', frames: ['still', 'swirl1', 'swirl2', 'portal'], fps: 2.5, t: 0, hold: true });
    yield wait(1.4);
    f.show(false); w.show(false);
    yield walkTo(l, p.x, r.floorTop + 20, 40);
    yield this.fade(1, 0.5);
    this.chapter.step = 'fight';
    this.chapter.fightPhase = 1;
    this.chapter.rooms[r.id] = r.serialize();
    g.switchScene('toyfight', { phase: 1 });
  }

  *yourTurn() {
    const g = this.game, l = this.liam, r = this.room;
    this.chapter.step = 'yourTurn';
    if (r.id !== 'nursery') this.enterRoom('nursery', { silent: true });
    const room = this.room, p = room.prop('painting');
    l.mode = 'scripted'; l.x = p.x; l.y = room.floorTop + 40; l.dir = 'up';
    if (l.form !== 'human') l.form = 'human';
    l.setAnim({ sheet: 'liam_td_idle', name: 'idle' });
    const stand = this.level.rooms.nursery.twinsStand, f = this.twins.frida, w = this.twins.wilhelmina;
    f.x = room.inX + stand[0][0]; f.y = room.floorTop + stand[0][1]; w.x = room.inX + stand[1][0]; w.y = room.floorTop + stand[1][1];
    f.show(true, true); w.show(true, true);
    this.fadeAlpha = 1;
    yield this.fade(0, 0.6);
    f.play('twins_td_giggle', 'giggle', 'down'); w.play('twins_td_giggle', 'giggle', 'down');
    yield this.sayLines(this.T.yourTurn);
    // they go and count by the linen door
    const d = room.doorById('linen');
    yield all(walkTo(f, d.x - 66, room.floorTop + 10, 40), walkTo(w, d.x - 48, room.floorTop + 10, 40));
    this.counting = true;
    this.placeCounting();
    this.chapter.batAtWill = true;
    this.showHint(this.T.ui?.batHint, 8);
    l.mode = 'free';
    this.game.devtools?.refresh();
  }

  *hiddenFound() {
    const g = this.game, l = this.liam;
    l.mode = 'scripted';
    const wr = this.room.prop('wardrobe');
    this.liamHidden = true;
    l.x = wr.x; l.y = wr.y + 6;
    yield wait(1.2);
    // they come looking, through the linen-closet door
    const d = this.room.doorById('linen'), f = this.twins.frida, w = this.twins.wilhelmina;
    this.counting = false;
    f.x = d.x - 8; f.y = this.room.floorTop + 10; w.x = d.x + 8; w.y = this.room.floorTop + 10;
    f.show(true); w.show(true);
    yield all(walkTo(f, wr.x - 12, wr.y + 22, 45), walkTo(w, wr.x + 12, wr.y + 22, 45));
    f.dir = w.dir = 'up';
    yield wait(0.4);
    f.dir = w.dir = 'down';
    f.play('twins_td_point', 'point', 'down', null, true); w.play('twins_td_point', 'point', 'down', null, true);
    yield this.sayLines(this.T.hiddenFound);
    this.liamHidden = false;
    l.y = wr.y + 14; l.dir = 'down';
    l.mode = 'free';
    l.transform(false);
    yield until(() => l.form === 'human');
    l.mode = 'scripted';
    f.play('twins_td_giggle', 'giggle', 'down'); w.play('twins_td_giggle', 'giggle', 'down');
    yield this.sayLines(this.T.hiddenAfter);
    this.showHint(this.T.ui?.learned, 5);
    yield wait(1.5);
    this.setStep('epilogue');
  }

  *epilogue() {
    const g = this.game, l = this.liam;
    this.chapter.step = 'epilogue';
    yield this.fade(1, 0.6);
    this.enterRoom('nursery', { silent: true });
    const r = this.room;
    this.placeTwins();
    const f = this.twins.frida, w = this.twins.wilhelmina;
    l.mode = 'scripted'; l.form = 'human'; l.setAnim({ sheet: 'liam_td_idle', name: 'idle' });
    l.x = f.x + 60; l.y = f.y + 26; l.dir = 'left';
    const A = new Ambrose(this, r.doorById('landing').x + 20, r.floorTop + 30, { schedule: false });
    A.scripted = true; A.dir = 'right'; this.ambrose = A;
    yield this.fade(0, 0.6);
    yield walkTo(A, f.x - 40, f.y + 8, g.config.ambrose.speed);
    A.dir = 'right'; A.walk(0, 0, false);
    yield this.sayLines(this.T.epilogue?.ask);
    // he drifts... then remembers
    A.play('ambrose_td_drift', 'drift', 'down');
    yield { update: (dt) => { A.alpha = Math.max(g.config.ambrose.fadeAlpha, A.alpha - dt / 0.8); return A.animDone(); } };
    yield this.sayLines(this.T.epilogue?.count);
    yield { update: (dt) => (A.alpha = Math.min(1, A.alpha + dt / 0.6)) >= 1 };
    A.dir = 'right'; A.walk(0, 0, false);
    A.play('ambrose_td_bow', 'bow', 'down');
    yield this.sayLines(this.T.epilogue?.found);
    f.play('twins_td_giggle', 'giggle', 'down'); w.play('twins_td_giggle', 'giggle', 'down');
    yield this.sayLines(this.T.epilogue?.after);
    yield this.fade(1, 0.8);
    // the drawing on Liam's wall
    this.ambrose = null;
    this.chapter.memento = true;
    this.chapter.step = 'done';
    this.enterRoom('bedroom', { silent: true });
    const mp = this.room.prop('memento');
    l.x = mp.x; l.y = this.room.floorTop + 14; l.dir = 'up'; l.setAnim({ sheet: 'liam_td_idle', name: 'idle' });
    yield this.fade(0, 0.8);
    yield this.sayLines(this.T.epilogue?.bedroom);
    l.mode = 'free';
    this.card = { t: 0 };
    this.game.devtools?.refresh();
  }

  fade(to, seconds) {
    const from = this.fadeAlpha;
    let t = 0;
    return { update: (dt) => { t += dt; this.fadeAlpha = from + (to - from) * Math.min(1, t / seconds); return t >= seconds; } };
  }

  showHint(text, seconds = 6) { if (text) this.hint = { text, t: seconds }; }

  giggle(x, y) {
    const T = this.T.ui || {};
    const word = this.game.rng.pick(T.giggles || ['hee hee']);
    this.floaters.push({ text: word, x: x + this.game.rng.range(-10, 10), y, t: 0, life: 1.8 });
  }

  // ---------------------------------------------------------------- update
  actors() { return [this.liam, ...(this.ambrose ? [this.ambrose] : []), ...Object.values(this.twins), ...this.entities]; }

  allLights() {
    return [...this.room.lights(), ...(this.ambrose ? this.ambrose.lights() : []), ...Object.values(this.twins).flatMap((t) => t.lights()), ...this.entities.flatMap((e) => (e.lights ? e.lights() : []))];
  }

  update(dt) {
    const g = this.game, l = this.liam, ch = this.chapter, F = g.config.fright;
    if (this.goFight) { this.goFight = false; g.switchScene('toyfight', { phase: ch.fightPhase || 1 }); return; }
    this.room.update(dt);
    if (this.doorClosing) {
      this.doorCloseT -= dt;
      if (this.doorCloseT <= 0) { this.room.doorStates[this.doorClosing] = 'closed'; this.doorClosing = null; }
    }
    if (this.trans) this.updateTransition(dt);
    if (this.script) { this.script.update(dt); if (this.script && this.script.done) this.script = null; }
    l.update(dt, this);
    if (this.ambrose) this.ambrose.update(dt);
    for (const t of Object.values(this.twins)) t.update(dt);
    for (const e of this.entities) e.update(dt);
    this.updateProps(dt);
    for (const f of this.floaters) { f.t += dt; f.y -= 8 * dt; }
    this.floaters = this.floaters.filter((f) => f.t < f.life);
    if (this.hint) { this.hint.t -= dt; if (this.hint.t <= 0) this.hint = null; }
    if (this.card) this.card.t += dt;
    this.frightShow = Math.max(0, this.frightShow - dt);
    this.frightFlash = Math.max(0, (this.frightFlash || 0) - dt);

    // fright drains slowly; after a panic it is empty again
    if (l.form === 'human' && !(this.script && this.script.name === 'meeting')) ch.fright = Math.max(0, ch.fright - F.decayPerSecond * dt);
    if (l.form !== 'human' && l.panicLeft > 0) ch.fright = 0;

    // giggles: the room (or the door) that still hides a twin
    if (ch.step === 'seeking' && !this.script) {
      this.giggleT -= dt;
      if (this.giggleT <= 0) {
        this.giggleT = this.C.giggleEverySeconds;
        this.giggleHint();
      }
    }
    if (ch.step === 'yourTurn' && this.counting) {
      this.countT = (this.countT ?? 0) - dt;
      if (this.countT <= 0 && this.room.id === 'nursery') {
        this.countT = 2.2;
        this.countN = (this.countN || 0) + 7;
        const fr = this.twins.frida;
        this.floaters.push({ text: String(Math.min(99, this.countN)), x: fr.x + 9, y: fr.y - 54, t: 0, life: 1.8 });
      }
    }

    if (this.script || this.trans) {
      if (g.input.wasPressed('interact') && g.ui.speaking) g.ui.skip();
      return;
    }

    // Q: bat at will (once the Twins have taught him); devtools can always do it
    if (g.input.wasPressed('bat') && ch.batAtWill && l.mode === 'free') l.transform(l.form !== 'bat');

    // doors: walk up into one (or press E on it). The bat can fly through too.
    if (l.mode === 'free' && (l.form === 'human' || l.form === 'bat') && g.input.isDown('up')) {
      for (const d of this.room.doors) {
        if (Math.abs(l.x - d.x) < 14 && l.y <= this.room.floorTop + 9) { this.tryDoor(d); break; }
      }
    }

    // E: skip a line while someone talks; otherwise talk to Ambrose or inspect things
    // E also interrupts a fidget or the door pose
    const idleAction = l.mode === 'action' && ['liam_td_fidget', 'liam_td_doorpose'].includes(l.anim.sheet);
    const canAct = (l.mode === 'free' || idleAction) && (l.form === 'human' || (l.form === 'bat' && l.panicLeft <= 0));
    this.nearAmbrose = this.ambrose && !this.ambrose.scripted && this.ambrose.canTalk(l) && (l.mode === 'free' || idleAction);
    this.near = this.nearAmbrose || !canAct ? null : this.nearest();
    if (this.near && l.form === 'bat' && !this.near.door && this.near.id !== 'wardrobe') this.near = null;
    if (g.input.wasPressed('interact')) {
      if (g.ui.speaking && g.ui.messages.length > 1) g.ui.skip();
      else if (this.nearAmbrose) this.ambrose.talk();
      else if (this.near) this.inspect(this.near);
    }
  }

  giggleHint() {
    const ch = this.chapter, r = this.room;
    const where = { frida: { room: 'nursery', prop: 'bed1' }, wilhelmina: { room: 'guest', prop: 'wardrobe' } };
    for (const [who, w] of Object.entries(where)) {
      if (ch.found[who]) continue;
      if (r.id === w.room) { const p = r.prop(w.prop); this.giggle(p.x, p.y - 50); return; }
      const d = r.doors.find((dd) => dd.to === w.room);
      if (d) { this.giggle(d.x, r.floorTop - 40); return; }
    }
  }

  updateProps(dt) {
    const r = this.room;
    for (const a of this.propAnims) {
      const p = r.prop(a.id);
      if (!p) { a.done = true; continue; }
      if (a.shake != null) {
        a.shake -= dt;
        p.offset = a.shake > 0 ? [Math.round(Math.sin(a.shake * 60)), 0] : null;
        if (a.shake <= 0) { a.done = true; if (a.then) a.then(); }
        continue;
      }
      a.t += dt;
      const i = Math.floor(a.t * a.fps);
      if (a.hold) { r.frames[a.id] = a.frames[Math.min(i, a.frames.length - 1)]; continue; }
      r.frames[a.id] = a.frames[i % a.frames.length];
      a.left -= dt;
      if (a.left <= 0) { r.frames[a.id] = a.end; a.done = true; }
    }
    this.propAnims = this.propAnims.filter((a) => !a.done);
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

  // ---------------------------------------------------------------- spawning (testing tools)
  spawnables() { return CHAPTER_SPAWNABLE; }

  spawn(type, x, y) {
    const g = this.game;
    if (type === 'dialogue') { g.ui.say(g.texts.debug?.testDialogue || 'Test dialogue.', { portrait: 'smug' }); return null; }
    if (type === 'scare') { this.addFright(g.config.fright.scares.default); return null; }
    const b = this.room.bounds();
    x = Math.max(b.x1, Math.min(b.x2, x)); y = Math.max(b.y1, Math.min(b.y2, y));
    if (type === 'ambrose') {
      if (this.ambrose) { this.ambrose.x = x; this.ambrose.y = y; return this.ambrose; }
      this.ambrose = new Ambrose(this, x, y, { schedule: false });
      return this.ambrose;
    }
    if (type === 'frida' || type === 'wilhelmina') {
      const t = new Twin(this, type, x, y);
      t.show(true, true);
      this.entities.push(t);
      return t;
    }
    return null;
  }

  // ---------------------------------------------------------------- drawing
  draw(ctx) {
    ctx.fillStyle = '#0d0b12';
    ctx.fillRect(0, 0, 640, 360);
    const r = this.room;
    r.drawFloor(ctx);
    r.drawWalls(ctx);
    r.drawProps(ctx);
    const list = [...this.actors().filter((a) => !(a === this.liam && this.liamHidden)), ...r.sortables()];
    if (this.liamHidden) list.push({ y: r.prop('wardrobe').y + 0.5, draw: (c) => this.drawHangingBat(c) });
    list.sort((a, b) => a.y - b.y);
    for (const e of list) e.draw(ctx);
    if (this.rollingBall) this.drawBall(ctx, this.rollingBall);
    this.lighting.render(ctx, this.game, this.allLights());
    if (this.fadeAlpha > 0) { ctx.save(); ctx.globalAlpha = this.fadeAlpha; ctx.fillStyle = '#0d0b12'; ctx.fillRect(0, 0, 640, 360); ctx.restore(); }
  }

  drawBall(ctx, b) {
    const sp = this.game.sprites, X = Math.round(b.x), Y = Math.round(b.y);
    if (sp.has('prop_toys')) sp.draw(ctx, 'prop_toys', 1, 0, X, Y);
    else { ctx.fillStyle = '#a4433a'; ctx.fillRect(X - 4, Y - 8, 8, 8); }
  }

  // Liam hanging upside down on the empty wardrobe rail
  drawHangingBat(ctx) {
    const wr = this.room.prop('wardrobe'), sp = this.game.sprites;
    this.room.drawProp(ctx, wr, 'open');
    ctx.save();
    ctx.translate(Math.round(wr.x), Math.round(wr.y - 40));
    ctx.scale(1, -1);
    sp.draw(ctx, 'liam_bat_fly', 'down', 1, 0, 0);
    ctx.restore();
  }

  drawUI(ui) {
    const ch = this.chapter, T = this.T.ui || {}, F = this.game.config.fright, c = ui.ctx;
    // fright meter
    if (ch.fright > 0 || this.frightShow > 0) {
      const x = 10, y = 10, w = 104;
      ui.panel(x, y, w, 22);
      ui.text(T.fright || 'FRIGHT', x + 4, y + 2, { size: 9, color: '#c9d3e0' });
      c.fillStyle = '#1a1020'; c.fillRect(x + 4, y + 14, w - 8, 5);
      const k = ch.fright / F.max;
      c.fillStyle = this.frightFlash > 0 ? '#ffffff' : k > 0.75 ? '#a8323e' : k > 0.4 ? '#c29f45' : '#8b95a8';
      c.fillRect(x + 4, y + 14, Math.round((w - 8) * k), 5);
    }
    // floating giggles and counting
    for (const f of this.floaters) {
      c.save(); c.globalAlpha = Math.max(0, 1 - f.t / f.life);
      ui.text(f.text, f.x, f.y, { size: 9, align: 'center', color: '#e4e1db' });
      c.restore();
    }
    if (this.hint && !ui.speaking) {
      ui.font(10);
      const wdt = Math.ceil(c.measureText(this.hint.text).width) + 14;
      ui.panel(320 - wdt / 2, 10, wdt, 16);
      ui.text(this.hint.text, 320, 12, { size: 10, align: 'center', outline: false });
    }
    if (this.card && this.card.t < this.C.cardSeconds) {
      c.save(); c.globalAlpha = Math.min(1, this.card.t * 2, (this.C.cardSeconds - this.card.t) * 2);
      ui.panel(170, 130, 300, 56);
      ui.text(T.chapterCard || 'The Twins', 320, 138, { size: 16, align: 'center', color: '#c9d3e0' });
      ui.text(T.chapterSub || 'Found.', 320, 162, { size: 11, align: 'center' });
      c.restore();
    }
    // E prompts
    const E = this.game.texts.prompt?.interact || 'E';
    if (ui.speaking || this.script || this.trans) return;
    if (this.nearAmbrose) ui.prompt(E, this.ambrose.x, this.ambrose.y - 76);
    else if (this.near) ui.prompt(E, this.near.x, this.liam.y - (this.liam.form === 'bat' ? 50 : 72));
  }

  // ---------------------------------------------------------------- save states
  serialize() {
    const ch = this.chapter;
    ch.rooms[this.room.id] = this.room.serialize();
    return { chapter: JSON.parse(JSON.stringify(ch)), room: this.room.id, liam: this.liam.serialize(), counting: this.counting, hidden: this.liamHidden };
  }

  restore(s) {
    this.game.chapter = JSON.parse(JSON.stringify(s.chapter));
    this.room = null;
    this.enterRoom(s.room, { silent: true });
    this.liam.restore(s.liam);
    this.counting = !!s.counting;
    // a cutscene that was running starts again from its beginning
    this.beginStep(this.chapter.step);
    if (s.hidden && this.chapter.step === 'yourTurn') this.run('hidden', this.hiddenFound());
  }

  testParams() { return { step: this.chapter.step, room: this.room.id }; }

  describe() {
    const ch = this.chapter;
    return `step ${ch.step}  room ${this.room.id}  fright ${ch.fright.toFixed(0)}  found ${['frida', 'wilhelmina'].filter((w) => ch.found[w]).join('+') || '-'}  script ${this.script?.name || '-'}  batAtWill ${ch.batAtWill}`;
  }
}
