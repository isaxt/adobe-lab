// ════════════════════════════════════════════
// CURSOR
// ════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  updateCoords(e);
  cameraSway(e);       // #2 museum camera sway
  proximityActivate(e); // #3 proximity activation
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// ════════════════════════════════════════════
// HUD COORDINATES
// ════════════════════════════════════════════
function updateCoords(e) {
  const nx = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3);
  const ny = ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3);
  document.getElementById('coord-x').textContent = 'X: ' + nx;
  document.getElementById('coord-y').textContent = 'Y: ' + ny;
}

// ════════════════════════════════════════════
// #2 — MUSEUM CAMERA SWAY
// Makes the entire world feel physical
// ════════════════════════════════════════════
function cameraSway(e) {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  const world = document.getElementById('world');
  if (world) {
    world.style.transform =
      `rotateX(${y * -1.5}deg) rotateY(${x * 1.5}deg) translateZ(0px)`;
  }
}

// ════════════════════════════════════════════
// PARALLAX ON MOUSE (entrance grid + glows)
// ════════════════════════════════════════════
document.addEventListener('mousemove', e => {
  const dx = (e.clientX / window.innerWidth - 0.5) * 2;
  const dy = (e.clientY / window.innerHeight - 0.5) * 2;
  const grid = document.querySelector('.entrance-grid');
  if (grid) grid.style.transform = `perspective(800px) rotateX(${60 + dy * 2}deg) rotateY(${dx * 1}deg) translateY(40%)`;
  const glows = document.querySelectorAll('.amb-glow');
  glows.forEach((g, i) => {
    const factor = (i % 2 === 0 ? 1 : -1) * (i + 1) * 8;
    g.style.transform = `translate(${-50 + dx * factor}%, ${-50 + dy * factor}%)`;
  });
});

// ════════════════════════════════════════════
// #3 — PROXIMITY ACTIVATION
// Artworks react when cursor approaches
// ════════════════════════════════════════════
function proximityActivate(e) {
  document.querySelectorAll('.gallery-cell').forEach(cell => {
    const rect = cell.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 300) {
      const strength = 1 - dist / 300;
      // Don't override the nth-child imperfect transforms — add to them
      const baseRotate = cell.matches(':nth-child(3n)') ? -0.5 : cell.matches(':nth-child(3n+2)') ? 0.3 : 0;
      cell.style.transform =
        `translateY(${-strength * 10}px) scale(${1 + strength * 0.02}) rotate(${baseRotate}deg)`;
      cell.style.filter =
        `brightness(${1 + strength * 0.3})`;
    } else {
      cell.style.transform = '';
      cell.style.filter = '';
    }
  });
}

// ════════════════════════════════════════════
// LOADER
// ════════════════════════════════════════════
const loadTexts = [
  'Calibrating atmosphere...',
  'Preparing exhibition spaces...',
  'Loading sculptural data...',
  'Initializing ambient systems...',
  'Entering liminal space...'
];
const bar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');
let prog = 0;
const loadInterval = setInterval(() => {
  prog += Math.random() * 18 + 4;
  if (prog >= 100) { prog = 100; clearInterval(loadInterval); setTimeout(hideLoader, 400); }
  bar.style.width = Math.min(prog, 100) + '%';
  loaderText.textContent = loadTexts[Math.floor(prog / 25)] || loadTexts[4];
}, 150);

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
  setTimeout(spawnParticles, 800);
  setTimeout(animatePoetry, 1000);
  setTimeout(spawnSecretZones, 2000); // #6 invisible discoveries
  scheduleFalseUI();                  // #9 false UI
}

// ════════════════════════════════════════════
// PARTICLES
// ════════════════════════════════════════════
function spawnParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 30 + '%';
    const dur = 4 + Math.random() * 8;
    const delay = Math.random() * 6;
    p.style.animation = `float-particle ${dur}s ease ${delay}s infinite`;
    const size = Math.random() < 0.3 ? 2 : 1;
    p.style.width = p.style.height = size + 'px';
    const colors = ['#4af4e8', '#a44af4', '#f44a8a', '#f4a84a'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    if (Math.random() > 0.5) p.style.boxShadow = `0 0 4px ${p.style.background}`;
    container.appendChild(p);
  }
}

// ════════════════════════════════════════════
// SCROLL REVEAL
// ════════════════════════════════════════════
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ════════════════════════════════════════════
// POETRY REVEAL
// ════════════════════════════════════════════
function animatePoetry() {
  const lines = document.querySelectorAll('.poetry-line');
  const poetryObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      lines.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), i * 400);
      });
      poetryObs.disconnect();
    }
  }, { threshold: 0.3 });
  if (lines[0]) poetryObs.observe(lines[0]);
}
animatePoetry();

// ════════════════════════════════════════════
// #7 — KINETIC TYPOGRAPHY (section titles)
// Blur distortion on mouse enter/leave
// ════════════════════════════════════════════
document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('mouseenter', () => {
    title.style.filter = 'blur(0.5px)';
  });
  title.addEventListener('mouseleave', () => {
    title.style.filter = '';
  });
});

// ════════════════════════════════════════════
// ENTER EXHIBITION — #1 cinematic scroll
// ════════════════════════════════════════════
function cinematicScroll(target) {
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
  document.body.classList.add('transitioning');
  setTimeout(() => document.body.classList.remove('transitioning'), 1800);
}

function enterExhibition() {
  triggerGlitch();
  setTimeout(() => {
    cinematicScroll(document.getElementById('room-gallery'));
  }, 200);
}

// ════════════════════════════════════════════
// GLITCH EFFECT
// ════════════════════════════════════════════
function triggerGlitch() {
  const g = document.getElementById('glitch-overlay');
  g.classList.add('active');
  setTimeout(() => g.classList.remove('active'), 500);
}

// ════════════════════════════════════════════
// HORIZONTAL HALLS
// ════════════════════════════════════════════
let currentHall = 0;
const totalHalls = 4;

function goHall(index) {
  currentHall = Math.max(0, Math.min(index, totalHalls - 1));
  document.getElementById('halls-track').style.transform = `translateX(-${currentHall * 100}vw)`;
  document.querySelectorAll('.halls-dot').forEach((d, i) => d.classList.toggle('active', i === currentHall));
}

function shiftHall(dir) {
  triggerGlitch();
  setTimeout(() => goHall(currentHall + dir), 150);
}

// Keyboard navigation for halls
document.addEventListener('keydown', e => {
  const hallsSection = document.getElementById('room-halls');
  const rect = hallsSection.getBoundingClientRect();
  if (rect.top <= 0 && rect.bottom >= 0) {
    if (e.key === 'ArrowRight') shiftHall(1);
    if (e.key === 'ArrowLeft') shiftHall(-1);
  }
});

// ════════════════════════════════════════════
// #8 — EXHIBITION STATES
// Site reacts to cumulative discoveries
// ════════════════════════════════════════════
let discoveries = 0;

function onDiscovery() {
  discoveries++;

  if (discoveries === 3) {
    // Museum awakens — color palette shifts
    document.body.classList.add('museum-awake');
    triggerWhisper('The space has noticed you.', window.innerWidth / 2, window.innerHeight / 2);
  }

  if (discoveries === 6) {
    // Soundtrack distortion simulation
    triggerGlitch();
    setTimeout(triggerGlitch, 300);
    setTimeout(() => triggerWhisper('Something has shifted.', mx, my), 600);
  }
}

// ════════════════════════════════════════════
// MODAL / ARTIFACT VIEWER
// ════════════════════════════════════════════
const modal = document.getElementById('artifact-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalTag = document.getElementById('modal-tag');

function openModal(el) {
  const img = el.dataset.img || el.querySelector('img')?.src || '';
  const title = el.dataset.modalTitle || el.dataset.title || 'Artifact';
  const body = el.dataset.modalBody || '';
  modalImg.src = img;
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalTag.textContent = '— Exhibition Artifact —';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  onDiscovery(); // #8 track exhibition state
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ════════════════════════════════════════════
// MINIMAP NAVIGATION — #1 cinematic scroll
// ════════════════════════════════════════════
document.querySelectorAll('.map-room').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) {
      triggerGlitch();
      setTimeout(() => cinematicScroll(target), 150);
    }
  });
});

// Active room tracking
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.map-room').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === id);
      });
      document.getElementById('coord-room').textContent = 'ROOM: ' + id.toUpperCase().replace('-', ' ');
    }
  });
}, { threshold: 0.4 });

['entrance', 'room-gallery', 'room-sculpture', 'room-poetry', 'room-halls', 'exit-room'].forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObs.observe(el);
});

// ════════════════════════════════════════════
// RANDOM GLITCH — occasional ambient glitch
// ════════════════════════════════════════════
setInterval(() => {
  if (Math.random() < 0.15) triggerGlitch();
}, 8000);

// ════════════════════════════════════════════
// SCROLL-BASED PARALLAX
// ════════════════════════════════════════════
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      const grid = document.querySelector('.entrance-grid');
      if (grid) grid.style.opacity = Math.max(0, 0.4 - sy * 0.001);
      ticking = false;
    });
    ticking = true;
  }
});

// ════════════════════════════════════════════
// #6 — INVISIBLE DISCOVERIES / SECRET ZONES
// Reward curiosity with whispered messages
// ════════════════════════════════════════════
const secretMessages = [
  'The walls remember previous visitors.',
  'You have been counted.',
  'This room was not always here.',
  'Something watches from the threshold.',
  'The archive has a name for you.',
];

function spawnSecretZones() {
  const sections = ['room-gallery', 'room-sculpture', 'room-poetry'];
  sections.forEach((id, si) => {
    const section = document.getElementById(id);
    if (!section) return;
    const zone = document.createElement('div');
    zone.className = 'secret-zone';
    zone.dataset.message = secretMessages[si % secretMessages.length];
    // Place asymmetrically in different corners per section
    zone.style.top  = (20 + si * 30) + '%';
    zone.style.left = (si % 2 === 0 ? '5%' : '88%');
    section.appendChild(zone);

    zone.addEventListener('mouseenter', () => {
      triggerWhisper(zone.dataset.message, mx, my);
      onDiscovery(); // secret zones also count as discoveries
    });
  });
}

// ════════════════════════════════════════════
// #6 — WHISPER — temporary floating text
// ════════════════════════════════════════════
function triggerWhisper(msg, x, y) {
  const el = document.createElement('div');
  el.className = 'whisper';
  el.textContent = msg;
  el.style.left = (x || mx) + 'px';
  el.style.top  = ((y || my) - 20) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ════════════════════════════════════════════
// #9 — FALSE UI / GHOST MESSAGES
// Psychological texture — impossible interfaces
// ════════════════════════════════════════════
const ghostMessages = [
  'Someone was here before you.',
  'Visitor #0041 has left the archive.',
  'Transmission received. Origin unknown.',
  'The previous room is still watching.',
  'Signal strength: diminishing.',
];

function scheduleFalseUI() {
  // First ghost message after 45 seconds
  setTimeout(() => showGhostMessage(ghostMessages[0]), 45000);
  // Subsequent ones at longer intervals
  setTimeout(() => showGhostMessage(ghostMessages[1]), 90000);
  setTimeout(() => showGhostMessage(ghostMessages[2]), 140000);
  // Random one at unpredictable times
  setTimeout(function recurse() {
    if (Math.random() < 0.4) {
      showGhostMessage(ghostMessages[Math.floor(Math.random() * ghostMessages.length)]);
    }
    setTimeout(recurse, 60000 + Math.random() * 60000);
  }, 30000);
}

function showGhostMessage(msg) {
  const el = document.createElement('div');
  el.className = 'ghost-message';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5200);
}