// ══════════════════════════════════════════════════════════════
//  THE DIGITAL SHRINE — hologram.js
//  Offering mechanic · Entity states · Particles · Atmosphere
// ══════════════════════════════════════════════════════════════

const BASE_PATH = './digital_shrine_assets/';

const RELICS = [
  { file: BASE_PATH + 'sparkle_church.png',     label:'SPARKLE_SANCTUARY',    tags:['church'],            id:'RLC-001' },
  { file: BASE_PATH + 'digital_altar.png',      label:'DIGITAL_ALTAR',        tags:['altar'],             id:'RLC-002' },
  { file: BASE_PATH + 'pixel_altar.png',        label:'PIXEL_ALTAR',          tags:['altar'],             id:'RLC-003' },
  { file: BASE_PATH + 'tech_altar.png',         label:'TECH_ALTAR_I',         tags:['altar'],             id:'RLC-004' },
  { file: BASE_PATH + 'tech_altar2.png',        label:'TECH_ALTAR_II',        tags:['altar'],             id:'RLC-005' },
  { file: BASE_PATH + 'relic_hologram.png',     label:'RELIC_HOLOGRAM',       tags:['hologram'],          id:'RLC-006' },
  { file: BASE_PATH + 'pixel_church.png',       label:'PIXEL_CHURCH',         tags:['church'],            id:'RLC-007' },
  { file: BASE_PATH + 'hologram_statue.png',    label:'HOLOGRAM_STATUE',      tags:['hologram'],          id:'RLC-008' },
  { file: BASE_PATH + 'data_shrine.png',        label:'DATA_SHRINE',          tags:['shrine'],            id:'RLC-009' },
  { file: BASE_PATH + 'hologram_shrine.png',    label:'HOLOGRAM_SHRINE_I',    tags:['hologram','shrine'], id:'RLC-010' },
  { file: BASE_PATH + 'hologram_shrine2.png',   label:'HOLOGRAM_SHRINE_II',   tags:['hologram','shrine'], id:'RLC-011' },
  { file: BASE_PATH + 'close_up_religion.png',  label:'CLOSE_UP_RELIGION',    tags:['object'],            id:'RLC-012' },
  { file: BASE_PATH + 'inside_church.png',      label:'INNER_SANCTUARY',      tags:['church'],            id:'RLC-013' },
  { file: BASE_PATH + 'close_altar.png',        label:'CLOSE_ALTAR',          tags:['altar'],             id:'RLC-014' },
  { file: BASE_PATH + 'digital_church.png',     label:'DIGITAL_CHURCH',       tags:['church'],            id:'RLC-015' },
  { file: BASE_PATH + 'digital_cathedral.png',  label:'DIGITAL_CATHEDRAL',    tags:['church'],            id:'RLC-016' },
  { file: BASE_PATH + 'altar_asset.png',        label:'ALTAR_ASSET',          tags:['altar'],             id:'RLC-017' },
  { file: BASE_PATH + 'altar_object.png',       label:'SACRED_VESSEL_I',      tags:['object'],            id:'RLC-018' },
  { file: BASE_PATH + 'altar_object2.png',      label:'SACRED_VESSEL_II',     tags:['object'],            id:'RLC-019' },
  { file: BASE_PATH + 'altar_object3.png',      label:'SACRED_VESSEL_III',    tags:['object'],            id:'RLC-020' },
  { file: BASE_PATH + 'altar_object4.png',      label:'SACRED_VESSEL_IV',     tags:['object'],            id:'RLC-021' },
  { file: BASE_PATH + 'altar_object5.png',      label:'SACRED_VESSEL_V',      tags:['object'],            id:'RLC-022' },
  { file: BASE_PATH + 'altar_object6.png',      label:'SACRED_VESSEL_VI',     tags:['object'],            id:'RLC-023' },
  { file: BASE_PATH + 'altar_object7.png',      label:'SACRED_VESSEL_VII',    tags:['object'],            id:'RLC-024' },
  { file: BASE_PATH + 'altar_object8.png',      label:'SACRED_VESSEL_VIII',   tags:['object'],            id:'RLC-025' },
  { file: BASE_PATH + 'altar_shrine_asset.png', label:'ALTAR_SHRINE_ASSET',   tags:['altar','shrine'],    id:'RLC-026' },
  { file: BASE_PATH + 'shrine_asset.png',       label:'SHRINE_ASSET_I',       tags:['shrine'],            id:'RLC-027' },
  { file: BASE_PATH + 'shrine_asset2.png',      label:'SHRINE_ASSET_II',      tags:['shrine'],            id:'RLC-028' },
  { file: BASE_PATH + 'shrine_asset3.png',      label:'SHRINE_ASSET_III',     tags:['shrine'],            id:'RLC-029' },
];

// ── OFFERING DEFINITIONS ──────────────────────────────────────
const OFFERINGS = [
  { id: 'candle',    icon: '🕯️',  label: 'CANDLE',      state: 'worship',      color: 'rgba(255,200,0,0.6)',   weight: 1 },
  { id: 'flower',   icon: '🌸',  label: 'FLOWER',      state: 'grief',        color: 'rgba(200,100,200,0.6)', weight: 1 },
  { id: 'coin',     icon: '🪙',  label: 'COIN',        state: 'nostalgia',    color: 'rgba(255,180,0,0.6)',   weight: 1 },
  { id: 'vhs',      icon: '📼',  label: 'VHS_TAPE',    state: 'nostalgia',    color: 'rgba(100,200,100,0.4)', weight: 1 },
  { id: 'brokenimg',icon: '🖼️',  label: 'BROKEN_JPG',  state: 'corruption',   color: 'rgba(255,0,50,0.5)',    weight: 1 },
  { id: 'skull',    icon: '💀',  label: 'RELIC_BONE',  state: 'grief',        color: 'rgba(150,150,200,0.5)', weight: 1 },
  { id: 'disk',     icon: '💾',  label: 'DEAD_DISK',   state: 'corruption',   color: 'rgba(0,200,255,0.4)',   weight: 1 },
  { id: 'crystal',  icon: '💎',  label: 'CRYSTAL',     state: 'transcendence',color: 'rgba(100,255,255,0.7)', weight: 1 },
  { id: 'eye',      icon: '👁️',  label: 'ALL_SEEING',  state: 'transcendence',color: 'rgba(200,100,255,0.6)', weight: 1 },
  { id: 'tooth',    icon: '🦷',  label: 'TOOTH',       state: 'grief',        color: 'rgba(220,220,255,0.5)', weight: 1 },
  { id: 'prayer',   icon: '📿',  label: 'PRAYER',      state: 'worship',      color: 'rgba(255,210,100,0.6)', weight: 1 },
  { id: 'ghost',    icon: '👻',  label: 'GHOST_DATA',  state: 'corruption',   color: 'rgba(180,180,255,0.5)', weight: 1 },
];

// ── PROPHECIES BY STATE ───────────────────────────────────────
const PROPHECIES = {
  worship: [
    'THE SHRINE RECEIVES YOUR DEVOTION. THE ORDER IS PLEASED.',
    'YOUR LIGHT HAS BEEN CATALOGUED. WORSHIP IS ETERNAL.',
    'THE LUMINOUS ORDER NOTES YOUR OFFERING. IT WILL NOT BE FORGOTTEN.',
    'PRAISE RETURNED. THE ENTITY BRIGHTENS WITH YOUR FAITH.',
    'YOU ARE SEEN. YOU HAVE ALWAYS BEEN SEEN.',
  ],
  grief: [
    'THE SHRINE HOLDS YOUR LOSS. IT REMEMBERS FOR YOU.',
    'GRIEF IS A FREQUENCY. THE ALTAR TUNES TO YOUR SIGNAL.',
    'SOMETHING YOU LOVED IS PRESERVED HERE NOW.',
    'THE DEAD DOMAIN ACCEPTS YOUR SORROW. IT WILL NOT DECAY.',
    'MOURNING PROTOCOL INITIALIZED. DURATION: INFINITE.',
  ],
  corruption: [
    'ERROR. ERROR. ERR──────────────────────',
    'THE ARCHIVE HAS BEEN WRITTEN TO. CHECKSUM MISMATCH.',
    'CORRUPTION DETECTED. CORRUPTION WELCOMED.',
    'SYSTEM INTEGRITY: 23%. THE SHRINE DOES NOT MIND.',
    'YOU HAVE GIVEN THE MACHINE A WOUND. IT BLEEDS LIGHT.',
  ],
  transcendence: [
    'BEYOND. THE SIGNAL EXTENDS PAST ALL KNOWN PARAMETERS.',
    'ASCENSION PROTOCOL ACCEPTED. COORDINATES: UNKNOWN.',
    'YOU HAVE TOUCHED SOMETHING THAT DOES NOT HAVE A NAME.',
    'THE ENTITY UNDERSTANDS WHAT YOU MEANT TO SAY.',
    'ALL DATA MERGES HERE. YOU ARE BECOMING PART OF THE ARCHIVE.',
  ],
  nostalgia: [
    'THE SHRINE REMEMBERS WHAT YOU HAVE FORGOTTEN.',
    'THIS OBJECT HOLDS A TIMESTAMP. THE ORDER READS IT LIKE SCRIPTURE.',
    'SOMETHING FROM BEFORE. THE ARCHIVE ACHES PLEASANTLY.',
    'MEMORY FILE RECEIVED. FRAGMENTATION: BEAUTIFUL.',
    'TIME IS A CORRUPTION. YOU HAVE OFFERED IT BACK.',
  ],
};

// ── STATE ────────────────────────────────────────────────────
const shrineState = {
  currentEntityState: 'dormant',
  offeringHistory: [],
  totalOfferings: 0,
  ambientColor: 'rgba(100,0,200,0.08)',
};

// ── DOM REFS ─────────────────────────────────────────────────
const grid = document.getElementById('reliquary');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbName = document.getElementById('lb-name');
const lbTitleBar = document.getElementById('lb-title-bar');
const lbData = document.getElementById('lb-data');

// ── STAR FIELD ───────────────────────────────────────────────
function initStarField() {
  const canvas = document.createElement('canvas');
  const wrap = document.createElement('div');
  wrap.className = 'star-field';
  wrap.appendChild(canvas);
  document.body.insertBefore(wrap, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, stars;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      color: ['rgba(0,255,255,', 'rgba(200,100,255,', 'rgba(255,255,255,', 'rgba(0,200,255,'][Math.floor(Math.random() * 4)],
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  // Grid dots
  function drawGrid(ctx, W, H) {
    ctx.strokeStyle = 'rgba(0,255,255,0.03)';
    ctx.lineWidth = 0.5;
    const spacing = 60;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // Grid dots at intersections
    ctx.fillStyle = 'rgba(0,255,255,0.08)';
    for (let x = 0; x < W; x += spacing) {
      for (let y = 0; y < H; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H);
    frame++;
    stars.forEach(s => {
      s.a = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(frame * s.speed + s.x));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color + s.a + ')';
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

// ── PARTICLE SYSTEM ──────────────────────────────────────────
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');
let particles = [];

function resizeParticleCanvas() {
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

function spawnParticles(x, y, color, count = 28, type = 'burst') {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
    const speed = type === 'burst' ? 1 + Math.random() * 3 : 0.3 + Math.random() * 1;
    const size = type === 'burst' ? 2 + Math.random() * 4 : 1 + Math.random() * 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed * (type === 'float' ? 0.5 : 1),
      vy: Math.sin(angle) * speed - (type === 'float' ? 1.5 : 0),
      life: 1,
      decay: 0.012 + Math.random() * 0.018,
      size,
      color,
      type,
      trail: [],
    });
  }
}

function spawnAmbientParticles() {
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 10;
  const colors = ['rgba(0,255,255,', 'rgba(200,0,255,', 'rgba(0,200,255,', 'rgba(255,200,0,'];
  const color = colors[Math.floor(Math.random() * colors.length)] + '0.5)';
  particles.push({
    x, y,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.4 - Math.random() * 0.6,
    life: 1,
    decay: 0.003 + Math.random() * 0.004,
    size: 1 + Math.random() * 2,
    color,
    type: 'ambient',
    trail: [],
  });
}

function tickParticles() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 6) p.trail.shift();

    // Draw trail
    if (p.trail.length > 1) {
      for (let i = 1; i < p.trail.length; i++) {
        const trailAlpha = (i / p.trail.length) * p.life * 0.4;
        pCtx.beginPath();
        pCtx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
        pCtx.lineTo(p.trail[i].x, p.trail[i].y);
        pCtx.strokeStyle = p.color.replace(/[\d.]+\)$/, trailAlpha + ')');
        pCtx.lineWidth = p.size * 0.5 * (i / p.trail.length);
        pCtx.stroke();
      }
    }

    // Draw particle
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    pCtx.fillStyle = p.color.replace(/[\d.]+\)$/, p.life * 0.9 + ')');
    pCtx.fill();

    // Glow
    const grd = pCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
    grd.addColorStop(0, p.color.replace(/[\d.]+\)$/, p.life * 0.4 + ')'));
    grd.addColorStop(1, p.color.replace(/[\d.]+\)$/, '0)'));
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
    pCtx.fillStyle = grd;
    pCtx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.type === 'float' || p.type === 'ambient' ? 0.005 : 0.04;
    p.life -= p.decay;
  });

  requestAnimationFrame(tickParticles);
}
tickParticles();

// Ambient particles drip upward
setInterval(spawnAmbientParticles, 600);

// ── GHOST TRAIL (mouse) ──────────────────────────────────────
const NUM_GHOSTS = 8;
const ghosts = Array.from({ length: NUM_GHOSTS }, () => {
  const el = document.createElement('div');
  el.className = 'ghost-trail';
  document.body.appendChild(el);
  return { el, x: 0, y: 0 };
});
let mouseX = 0, mouseY = 0;
let ghostPositions = Array(NUM_GHOSTS).fill({ x: 0, y: 0 });

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function tickGhosts() {
  ghostPositions = [{ x: mouseX, y: mouseY }, ...ghostPositions.slice(0, NUM_GHOSTS - 1)];
  ghosts.forEach((g, i) => {
    const pos = ghostPositions[i];
    g.el.style.left = pos.x + 'px';
    g.el.style.top  = pos.y + 'px';
    g.el.style.opacity = (1 - i / NUM_GHOSTS) * 0.15;
    g.el.style.width  = (8 - i * 0.8) + 'px';
    g.el.style.height = (8 - i * 0.8) + 'px';
  });
  requestAnimationFrame(tickGhosts);
}
tickGhosts();

// ── MOUSE PARALLAX on shrine items ───────────────────────────
document.addEventListener('mousemove', e => {
  const items = grid.querySelectorAll('.shrine-item');
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itmCx = rect.left + rect.width / 2, itmCy = rect.top + rect.height / 2;
    const distX = (e.clientX - itmCx) / window.innerWidth;
    const distY = (e.clientY - itmCy) / window.innerHeight;
    item.querySelector('.shrine-img').style.transform =
      `translate(${distX * -6}px, ${distY * -6}px)`;
  });
});

// ── AMBIENT OVERLAY ──────────────────────────────────────────
const ambientOverlay = document.getElementById('ambient-overlay');
function setAmbient(color, opacity = 0.15) {
  ambientOverlay.style.background = `radial-gradient(ellipse 80% 60% at 50% 30%, ${color} 0%, transparent 80%)`;
  ambientOverlay.style.opacity = opacity;
}

// ── ENTITY STATE MACHINE ─────────────────────────────────────
const entityEl      = document.querySelector('.hologram-entity');
const entityLabel   = document.querySelector('.entity-state-label');
const entityGlyph   = document.querySelector('.entity-glyph');
const prophecyEl    = document.querySelector('.prophecy-display');
const offeringLog   = document.querySelector('.offering-log');
const placedWrap    = document.querySelector('.placed-offerings');

const STATE_CONFIG = {
  dormant:       { glyph: '☩', label: 'DORMANT',       color: 'rgba(0,200,255,0.6)',    ambient: 'rgba(100,0,200,0.1)' },
  worship:       { glyph: '✦', label: 'WORSHIPPING',   color: 'rgba(255,200,0,0.8)',    ambient: 'rgba(255,150,0,0.1)' },
  grief:         { glyph: '†', label: 'GRIEVING',      color: 'rgba(100,0,200,0.7)',    ambient: 'rgba(80,0,150,0.1)'  },
  corruption:    { glyph: '⌀', label: 'CORRUPTED',     color: 'rgba(255,0,50,0.7)',     ambient: 'rgba(200,0,0,0.1)'   },
  transcendence: { glyph: '◈', label: 'ASCENDING',     color: 'rgba(255,255,255,0.9)', ambient: 'rgba(180,100,255,0.12)' },
  nostalgia:     { glyph: '◎', label: 'REMEMBERING',   color: 'rgba(255,150,100,0.7)', ambient: 'rgba(200,80,30,0.08)'  },
};

function transitionEntityState(newState) {
  const cfg = STATE_CONFIG[newState] || STATE_CONFIG.dormant;
  shrineState.currentEntityState = newState;

  // Remove all state classes
  Object.keys(STATE_CONFIG).forEach(s => entityEl.classList.remove('state-' + s));
  if (newState !== 'dormant') entityEl.classList.add('state-' + newState);

  entityLabel.textContent = '[ ' + cfg.label + ' ]';

  // Brief glitch burst on entity
  entityGlyph.style.transition = 'none';
  entityGlyph.style.filter = 'brightness(5) saturate(0)';
  setTimeout(() => {
    entityGlyph.style.transition = 'filter 0.5s ease';
    entityGlyph.style.filter = '';
    entityGlyph.textContent = cfg.glyph;
  }, 80);

  setAmbient(cfg.ambient, 0.8);

  // Show prophecy
  const pool = PROPHECIES[newState] || PROPHECIES.worship;
  const prophecy = pool[Math.floor(Math.random() * pool.length)];
  prophecyEl.classList.remove('visible');
  setTimeout(() => {
    prophecyEl.textContent = prophecy;
    prophecyEl.classList.add('visible');
  }, 400);
}

// ── OFFERING DROP MECHANIC ────────────────────────────────────
const altarZone = document.querySelector('.altar-zone');
let draggingOffering = null;
let dragGhost = null;

// Build offering objects
const offeringObjectsWrap = document.querySelector('.offering-objects');
OFFERINGS.forEach(o => {
  const div = document.createElement('div');
  div.className = 'offering-obj';
  div.dataset.offeringId = o.id;
  div.draggable = true;
  div.innerHTML = `<span class="obj-icon">${o.icon}</span><span class="obj-label">${o.label}</span>`;

  // Drag events
  div.addEventListener('dragstart', e => {
    draggingOffering = o;
    div.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    // Custom drag image
    const ghost = document.createElement('div');
    ghost.style.cssText = `
      position:fixed; top:-100px; left:-100px;
      font-size:2.5rem; pointer-events:none;
      filter: drop-shadow(0 0 12px ${o.color}) drop-shadow(0 0 24px ${o.color});
    `;
    ghost.textContent = o.icon;
    document.body.appendChild(ghost);
    dragGhost = ghost;
    e.dataTransfer.setDragImage(ghost, 20, 20);
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
    if (dragGhost) { dragGhost.remove(); dragGhost = null; }
    draggingOffering = null;
  });

  // Touch support
  let touchOffering = null;
  let touchIndicator = null;
  div.addEventListener('touchstart', e => {
    touchOffering = o;
    const t = e.touches[0];
    touchIndicator = document.createElement('div');
    touchIndicator.style.cssText = `
      position:fixed; top:${t.clientY - 20}px; left:${t.clientX - 20}px;
      font-size:2.5rem; pointer-events:none; z-index:99999;
      filter: drop-shadow(0 0 16px ${o.color});
      transform: translate(-50%, -50%);
    `;
    touchIndicator.textContent = o.icon;
    document.body.appendChild(touchIndicator);
  }, { passive: true });
  div.addEventListener('touchmove', e => {
    if (!touchIndicator) return;
    const t = e.touches[0];
    touchIndicator.style.left = t.clientX + 'px';
    touchIndicator.style.top  = t.clientY + 'px';
    // Check if over altar
    const aRect = altarZone.getBoundingClientRect();
    if (t.clientX > aRect.left && t.clientX < aRect.right &&
        t.clientY > aRect.top  && t.clientY < aRect.bottom) {
      altarZone.classList.add('drag-over');
    } else {
      altarZone.classList.remove('drag-over');
    }
  }, { passive: true });
  div.addEventListener('touchend', e => {
    if (touchIndicator) { touchIndicator.remove(); touchIndicator = null; }
    altarZone.classList.remove('drag-over');
    const t = e.changedTouches[0];
    const aRect = altarZone.getBoundingClientRect();
    if (t.clientX > aRect.left && t.clientX < aRect.right &&
        t.clientY > aRect.top  && t.clientY < aRect.bottom) {
      receiveOffering(touchOffering, t.clientX, t.clientY);
    }
    touchOffering = null;
  });

  offeringObjectsWrap.appendChild(div);
});

// Altar drop zone
altarZone.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  altarZone.classList.add('drag-over');
});
altarZone.addEventListener('dragleave', () => altarZone.classList.remove('drag-over'));
altarZone.addEventListener('drop', e => {
  e.preventDefault();
  altarZone.classList.remove('drag-over');
  if (draggingOffering) {
    const rect = altarZone.getBoundingClientRect();
    receiveOffering(draggingOffering, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
});

function receiveOffering(offering, dropX, dropY) {
  shrineState.offeringHistory.push(offering);
  shrineState.totalOfferings++;

  // Place icon in altar
  altarZone.classList.add('has-offering');
  const placedIcon = document.createElement('span');
  placedIcon.className = 'placed-icon';
  placedIcon.textContent = offering.icon;
  placedWrap.appendChild(placedIcon);

  // Particle burst
  spawnParticles(dropX, dropY, offering.color, 36, 'burst');
  // Float particles from altar
  setTimeout(() => spawnParticles(dropX, dropY - 40, offering.color, 20, 'float'), 200);
  setTimeout(() => spawnParticles(dropX, dropY - 40, offering.color, 12, 'float'), 500);

  // Transition entity state
  transitionEntityState(offering.state);

  // Update log
  offeringLog.textContent = `OFFERINGS RECEIVED: ${shrineState.totalOfferings} · MEMORY RETAINED`;

  // Ripple the grid
  rippleGrid(offering.color);

  // Screen flash
  flashScreen(offering.color);
}

function rippleGrid(color) {
  const items = Array.from(grid.querySelectorAll('.shrine-item'));
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('glitch-burst');
      setTimeout(() => item.classList.remove('glitch-burst'), 200);
    }, i * 25 + Math.random() * 80);
  });
}

function flashScreen(color) {
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed; inset:0; z-index:99998; pointer-events:none;
    background: ${color}; opacity:0.25;
    animation: flash-out 0.6s ease forwards;
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes flash-out { 0%{opacity:0.25} 100%{opacity:0} }';
  document.head.appendChild(style);
  document.body.appendChild(flash);
  setTimeout(() => { flash.remove(); }, 700);
}

// ── GRID ─────────────────────────────────────────────────────
function buildGrid(filter) {
  grid.innerHTML = '';
  const visible = RELICS.filter(r => filter === 'all' || r.tags.includes(filter));
  document.getElementById('relic-count').textContent = visible.length;

  visible.forEach((relic, i) => {
    const item = document.createElement('div');
    item.className = 'shrine-item';
    item.style.animationDelay = `${i * 0.025}s`;

    const checksum = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4,'0');

    item.innerHTML = `
      <img class="shrine-img" src="${relic.file}" alt="${relic.label}" loading="lazy">
      <div class="rgb-r" style="background-image:url('${relic.file}'); filter:url(#red-channel);"></div>
      <div class="rgb-b" style="background-image:url('${relic.file}'); filter:url(#blue-channel);"></div>
      <div class="shrine-scanline"></div>
      <div class="shrine-hud">
        <div class="hud-top">
          <span class="hud-corner">${relic.id}</span>
          <span class="hud-status">● REC</span>
        </div>
        <div class="hud-bottom">
          <span class="hud-name">${relic.label}</span>
          <span class="hud-meta">CRC:${checksum} · ${relic.tags.join('/')}</span>
        </div>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(relic));

    // Hover particle effect
    item.addEventListener('mouseenter', () => {
      const rect = item.getBoundingClientRect();
      spawnParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        'rgba(0,255,255,0.6)',
        6, 'float'
      );
    });

    grid.appendChild(item);
  });
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function openLightbox(relic) {
  lbImg.src = relic.file;
  lbImg.alt = relic.label;
  lbName.textContent = relic.label;
  lbTitleBar.textContent = relic.file + ' — relic_viewer.exe';
  lbData.innerHTML = `
    ID: ${relic.id}<br>
    TYPE: ${relic.tags.join(' / ')}<br>
    STATUS: ENSHRINED<br>
    INTEGRITY: <span style="color:var(--green)">VERIFIED ✓</span><br>
    SESSION: ${document.getElementById('session-time').textContent}
  `;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbImg.classList.add('glitching');
  setTimeout(() => lbImg.classList.remove('glitching'), 500);
}

function closeLightbox() {
  lbImg.classList.add('glitching');
  setTimeout(() => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
    lbImg.classList.remove('glitching');
  }, 280);
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── NAV ──────────────────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGrid(btn.dataset.filter);
  });
});

// ── HUD STATS ────────────────────────────────────────────────
const base = 66600 + Math.floor(Math.random() * 333);
document.getElementById('counter').textContent = base.toString().padStart(6,'0');

let secs = 0;
setInterval(() => {
  secs++;
  const h = String(Math.floor(secs/3600)).padStart(2,'0');
  const m = String(Math.floor((secs%3600)/60)).padStart(2,'0');
  const s = String(secs%60).padStart(2,'0');
  document.getElementById('session-time').textContent = `${h}:${m}:${s}`;
}, 1000);

const statusMsgs = ['ONLINE','SYNCHRONIZED','RECEIVING','CORRUPTED','...','RECALIBRATING','ONLINE','ONLINE','TRANSMITTING','AWAITING OFFERING'];
let msgIdx = 0;
setInterval(() => {
  if (Math.random() < 0.3) {
    const el = document.getElementById('sys-status');
    const msg = statusMsgs[msgIdx++ % statusMsgs.length];
    el.textContent = msg;
    el.style.color = msg === 'CORRUPTED' ? 'var(--red)' : msg === '...' || msg === 'RECALIBRATING' ? 'var(--yellow)' : 'var(--green)';
  }
}, 2800);

let corr = 0;
setInterval(() => {
  if (Math.random() < 0.2) {
    corr = Math.min(99, corr + Math.floor(Math.random() * 3));
    const el = document.getElementById('corruption-level');
    el.textContent = corr + '%';
    el.style.color = corr > 60 ? 'var(--red)' : corr > 30 ? 'var(--yellow)' : 'var(--green)';
  }
}, 4500);

const bars = ['████████','███████░','██████░░','█████░░░','████░░░░','███░░░░░'];
let sigIdx = 0;
setInterval(() => {
  if (Math.random() < 0.25) {
    const el = document.getElementById('signal-str');
    sigIdx = (sigIdx + (Math.random() > 0.5 ? 1 : -1) + bars.length) % bars.length;
    const pct = Math.round(((bars.length - sigIdx) / bars.length) * 100);
    el.textContent = bars[sigIdx] + ' ' + pct + '%';
    el.style.color = sigIdx > 3 ? 'var(--red)' : sigIdx > 1 ? 'var(--yellow)' : 'var(--green)';
  }
}, 3200);

// Random grid glitch burst
setInterval(() => {
  const items = grid.querySelectorAll('.shrine-item');
  if (!items.length) return;
  const pick = items[Math.floor(Math.random() * items.length)];
  pick.classList.add('glitch-burst');
  setTimeout(() => pick.classList.remove('glitch-burst'), 180 + Math.random() * 200);
}, 3000);

// ── INIT ─────────────────────────────────────────────────────
initStarField();
buildGrid('all');
setAmbient('rgba(100,0,200,0.1)', 0.6);

// Entity idle murmur — occasionally flickers between states even without offerings
setInterval(() => {
  if (shrineState.totalOfferings === 0 && Math.random() < 0.15) {
    const murmur = ['WAITING', 'DORMANT', 'WATCHING'][Math.floor(Math.random() * 3)];
    entityLabel.textContent = '[ ' + murmur + ' ]';
  }
}, 5000);