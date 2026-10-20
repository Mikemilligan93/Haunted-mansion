// Visual debug overlays: hitboxes, ranges/auras, nav grid, FPS and live values.
// Toggled in the testing modal or with ?overlays=hitbox,ranges,grid,fps,values
export function drawOverlays(ctx, game) {
  const o = game.overlays, s = game.scene;
  if (!s) return;
  ctx.save();
  if (o.grid && s.room) {
    const { cols, rows, grid } = s.room.navGrid();
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      ctx.fillStyle = grid[r * cols + c] ? 'rgba(255,60,60,0.22)' : 'rgba(80,255,120,0.08)';
      ctx.fillRect(c * 16, r * 16, 16, 16);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 640; x += 16) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, 360); ctx.stroke(); }
    for (let y = 0; y <= 360; y += 16) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(640, y + 0.5); ctx.stroke(); }
  }
  if (o.hitbox) {
    const h = s.liam.hitbox();
    ctx.strokeStyle = '#00ff88';
    ctx.strokeRect(Math.round(h.x) + 0.5, Math.round(h.y) + 0.5, h.w, h.h);
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(Math.round(s.liam.x), Math.round(s.liam.y), 1, 1);
    const b = s.room.bounds();
    ctx.strokeStyle = 'rgba(0,255,136,0.5)';
    ctx.strokeRect(b.x1 + 0.5, b.y1 + 0.5, b.x2 - b.x1, b.y2 - b.y1);
    for (const e of s.entities) { ctx.strokeStyle = '#ffcc00'; ctx.strokeRect(Math.round(e.x) - 6.5, Math.round(e.y) - 3.5, 13, 6); }
  }
  if (o.ranges) {
    ctx.strokeStyle = 'rgba(255,220,80,0.8)';
    for (const p of s.room.sunPolys()) {
      ctx.beginPath(); p.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.stroke();
    }
    const R = game.config.liam.interactRange;
    for (const it of s.room.interactables()) {
      ctx.strokeStyle = 'rgba(120,200,255,0.8)';
      ctx.beginPath(); ctx.ellipse(it.x, it.y, R, R / 1.5, 0, 0, Math.PI * 2); ctx.stroke();
    }
    if (s.ambrose) {
      const A = s.ambrose, R2 = game.config.ambrose.talkRange;
      ctx.strokeStyle = 'rgba(200,160,255,0.8)';
      ctx.beginPath(); ctx.ellipse(A.x, A.y, R2, R2 / 1.4, 0, 0, Math.PI * 2); ctx.stroke();
      if (s.room.wallDoor) { ctx.fillStyle = 'rgba(200,160,255,0.8)'; ctx.fillRect(s.room.wallDoor.x - 2, s.room.wallDoor.y - 20, 4, 20); }
      for (const o of s.room.obstacles()) { ctx.strokeStyle = 'rgba(255,90,90,0.8)'; ctx.strokeRect(o.x1 + 0.5, o.y1 + 0.5, o.x2 - o.x1, o.y2 - o.y1); }
    }
    for (const lt of s.allLights()) {
      ctx.strokeStyle = 'rgba(255,170,60,0.7)';
      ctx.beginPath(); ctx.arc(lt.x, lt.y, lt.r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

drawOverlays.ui = (ui, game) => {
  const o = game.overlays;
  let y = 4;
  if (o.fps) { ui.text(`FPS ${game.fps}  speed x${game.speed}${game.paused ? '  FROZEN (. = step)' : ''}`, 4, y, { size: 9, color: '#9effa0' }); y += 12; }
  if (o.values) {
    const st = game.state();
    const h = Math.floor(st.hour), m = Math.floor((st.hour % 1) * 60);
    const lines = [
      `time ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} day ${st.day}  daylight ${st.daylight.toFixed(2)}  darkness ${st.darkness.toFixed(2)}`,
      `liam ${st.x.toFixed(1)},${st.y.toFixed(1)} ${st.dir} ${st.mode} ${st.form}${st.panicLeft > 0 ? ` (panic ${st.panicLeft.toFixed(1)}s)` : ''} ${st.anim}`,
      `speed ${st.speedNow.toFixed(0)} px/s  in sun ${st.inSun}  curtain ${st.curtain}  door ${st.door}`,
      `lights ${st.lights}  entities ${st.entities}  seed ${game.seed}  rng ${game.rng.state}`,
      `cheats god ${game.cheats.god} infinite ${game.cheats.infinite}`,
      ...(game.scene.ambrose ? [`ambrose ${game.scene.ambrose.describe()}  plates ${st.plates}  clock ${st.clockStopped ?? 'running'}`] : []),
    ];
    for (const l of lines) { ui.text(l, 4, y, { size: 8, color: '#9effa0' }); y += 10; }
  }
  if (game.paused && !o.fps) ui.text('FROZEN by the testing tools  (. steps one frame)', 4, 349, { size: 9, color: '#ffcc66' });
};
