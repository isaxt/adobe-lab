const BASE_PATH = '/website_experiments/hologram_digital_shrine/digital_shrine_assets/';

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

const grid = document.getElementById('reliquary');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbName = document.getElementById('lb-name');
const lbTitleBar = document.getElementById('lb-title-bar');
const lbData = document.getElementById('lb-data');

function buildGrid(filter) {
  grid.innerHTML = '';
  const visible = RELICS.filter(r => filter === 'all' || r.tags.includes(filter));
  document.getElementById('relic-count').textContent = visible.length;

  visible.forEach((relic, i) => {
    const item = document.createElement('div');
    item.className = 'shrine-item';
    item.style.animationDelay = `${i * 0.03}s`;

    const checksum = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4,'0');

    // RGB split divs — we set background-image via JS so clip works
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
    grid.appendChild(item);
  });
}

function openLightbox(relic) {
  lbImg.src = relic.file;
  lbImg.alt = relic.label;
  lbName.textContent = relic.label;
  lbTitleBar.textContent = relic.file + ' — relic_viewer.exe';
  lbData.innerHTML = `ID: ${relic.id}<br>TYPE: ${relic.tags.join(' / ')}<br>STATUS: ENSHRINED<br>INTEGRITY: <span style="color:var(--green)">VERIFIED ✓</span>`;
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
  }, 250);
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGrid(btn.dataset.filter);
  });
});

// Visitor counter
const base = 66600 + Math.floor(Math.random() * 333);
document.getElementById('counter').textContent = base.toString().padStart(6,'0');

// Session timer
let secs = 0;
setInterval(() => {
  secs++;
  const h = String(Math.floor(secs/3600)).padStart(2,'0');
  const m = String(Math.floor((secs%3600)/60)).padStart(2,'0');
  const s = String(secs%60).padStart(2,'0');
  document.getElementById('session-time').textContent = `${h}:${m}:${s}`;
}, 1000);

// System status flicker
const statusMsgs = ['ONLINE','SYNCHRONIZED','RECEIVING','CORRUPTED','...','RECALIBRATING','ONLINE','ONLINE','TRANSMITTING'];
let msgIdx = 0;
setInterval(() => {
  if (Math.random() < 0.3) {
    const el = document.getElementById('sys-status');
    const msg = statusMsgs[msgIdx++ % statusMsgs.length];
    el.textContent = msg;
    el.style.color = msg === 'CORRUPTED' ? 'var(--red)' : msg === '...' || msg === 'RECALIBRATING' ? 'var(--yellow)' : 'var(--green)';
  }
}, 2800);

// Corruption counter
let corr = 0;
setInterval(() => {
  if (Math.random() < 0.2) {
    corr = Math.min(99, corr + Math.floor(Math.random() * 3));
    const el = document.getElementById('corruption-level');
    el.textContent = corr + '%';
    el.style.color = corr > 60 ? 'var(--red)' : corr > 30 ? 'var(--yellow)' : 'var(--green)';
  }
}, 4500);

// Signal degradation
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

// Random grid item glitch burst
setInterval(() => {
  const items = grid.querySelectorAll('.shrine-item');
  if (!items.length) return;
  const pick = items[Math.floor(Math.random() * items.length)];
  pick.classList.add('glitch-burst');
  setTimeout(() => pick.classList.remove('glitch-burst'), 180 + Math.random() * 220);
}, 2500);

buildGrid('all');