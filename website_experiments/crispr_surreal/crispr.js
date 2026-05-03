const specimens = [
  {
    img: './website_experiments/crispr_surreal/crisper_assets/speculative_ears.png',
    id: 'SPECIMEN_001 // ASSET_A',
    title: 'Observation Journals\n(Listening Archive)',
    desc: 'Three volumes bound in decayed leather. Six ears emerge from the covers — neither decorative nor functional by any known taxonomy. The journals record nothing written; they absorb vibration. Background noise, subvocalizations, the creak of a building settling at 3am. Behind them: a bank of television monitors broadcasting medical scans on loop. The ears listen. The screens show what the ears cannot.',
    meta: [{k:'CLASSIFICATION',v:'Surreal / Catalogued'},{k:'STATUS',v:'Listening'},{k:'ORIGIN',v:'Unknown'},{k:'THREAT_LEVEL',v:'Passive'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/mouth_books.png',
    id: 'SPECIMEN_002 // SPEAKING_VOL',
    title: 'Volumes That\nSpeak Back',
    desc: 'A pile of ruined books — pages bloated with damp, spines split — each marked with a small photograph of a human mouth. The mouths are mid-expression: laughing, whispering, silent. The books have read themselves hollow. Now they only emit. No one has confirmed what language.',
    meta: [{k:'MEDIUM',v:'Analog / Photographic'},{k:'STATUS',v:'Emitting'},{k:'VOLUME',v:'Variable'},{k:'LANGUAGE',v:'Unconfirmed'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/eyes_body_color.png',
    id: 'SPECIMEN_003 // CORPUS_WATCH',
    title: 'Le Corps Surveillé\nà Multiple Échelles',
    desc: 'A human figure rendered transparent — circulatory system fully visible, pulsing in false color. It stands in a birch forest whose trees are lined with photographs of watching eyes. Beside it: thermal scans of lungs, pelvis, skull. Grid coordinates suggest this is a measurement, not a portrait. The eyes in the trees do not blink. The body has been mapped at every resolution except the one that matters.',
    meta: [{k:'SCALE',v:'0.0 — 10.6'},{k:'MODALITY',v:'Thermal / CT / MRI'},{k:'EYES',v:'23 confirmed'},{k:'SUBJECT',v:'Unknown'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/chromosone_figure.png',
    id: 'SPECIMEN_004 // CHR_UNFOLD',
    title: 'Chromosome:\nMetaphasic Unfolding',
    desc: 'The complete journey from base pair to metaphasic chromosome, rendered in six stages. At 2nm: the raw double helix, A-T-C-G. At 11nm: the nucleosome bead string. At 30nm: the solenoid fiber. At 1400nm: the full X-shaped chromosome, 700 times the width of the DNA it contains. A library compressed to a comma.',
    meta: [{k:'SCALE_MIN',v:'2nm'},{k:'SCALE_MAX',v:'1400nm'},{k:'HISTONE',v:'H1 present'},{k:'BASE_PAIRS',v:'A, T, C, G'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/surveillance_optics.png',
    id: 'SPECIMEN_005 // ASSET_C',
    title: 'Field Surveillance\nOptics (Direct View)',
    desc: 'Victorian field glasses repurposed: the objective lenses replaced with human eyes — blue irises, fully dilated. From the right barrel: a cascade of colored wires and circuit boards trails into open space. The base is mahogany. The function is unclear. Asset C sees in both directions simultaneously. What it transmits and to whom has not been determined.',
    meta: [{k:'ASSET_ID',v:'C'},{k:'OPTICS',v:'Biological / Optical hybrid'},{k:'WIRING',v:'Present — destination unknown'},{k:'MODE',v:'Direct View'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/micro_cell.png',
    id: 'SPECIMEN_006 // ASSET_B',
    title: 'Photosynthetic\nCircuitry Model',
    desc: 'A chloroplast-shaped housing cut open to reveal: stacked PCBs labeled LIGHT_HARVESTING_CIRCUIT. Gold traces carry current where electron transport chains once ran. PHOTOSYSTEM_II_PROCESSOR sits at center. The ATP_SYNTH_CHIP converts. The STROMA_DATA_STREAM is continuous. The plant does not know it has been optimized.',
    meta: [{k:'ASSET_ID',v:'B'},{k:'ENERGY_IN',v:'Photonic'},{k:'ENERGY_OUT',v:'ATP_equivalent signal'},{k:'EFFICIENCY',v:'94.7%'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/neutral_map.png',
    id: 'SPECIMEN_007 // ASSET_D',
    title: 'Neural Weight Matrix\nVisualization (Speculative)',
    desc: 'Twelve translucent cubes arranged in a 4×3 lattice. Each cube contains a heat-mapped weight matrix — blue for near-zero, red for saturated activation. Connection lines between cubes carry data at varying strengths. In the upper right: INPUT_WEIGHT_LAYER_1 and HIDDEN_WEIGHT_LAYER_3. In the corner, a fragment of an eye, watching the weights update. It does not know it is one of the inputs.',
    meta: [{k:'ASSET_ID',v:'D'},{k:'TYPE',v:'Speculative'},{k:'LAYERS',v:'Input / Hidden / Update'},{k:'STATUS',v:'Weights updating'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/mri_scan.png',
    id: 'SPECIMEN_008 // OBS_OBSERVER',
    title: 'Observing\nthe Observer',
    desc: 'A false-color sagittal MRI of a human brain. Every sulcus and gyrus carries a watermark: "OBSERVING THE OBSERVER". The text loops, shrinks, reverses, fills the corpus callosum with its recursion. The cerebellum is clean. The limbic system is dense with the phrase. This brain has been measured so many times it has begun to internalize the act of measurement.',
    meta: [{k:'MODALITY',v:'MRI // False-color'},{k:'ANNOTATION',v:'Recursive'},{k:'REGION',v:'Whole-brain'},{k:'NOTE',v:'Cortex only — cerebellum exempt'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/color_full.png',
    id: 'SPECIMEN_009 // MEDICAL_CHROM',
    title: 'Medical\nChromatics',
    desc: 'Nine medical images arranged in a grid on black: thermal vessels, false-color skull, cardiac PET scan, fetal ultrasound (false-color cyan), skeletal rib scan, pelvis CT, femur infrared, endoscopic colon, and a brain PET cross-section. The body has been translated into nine color languages. None of them agree on what color pain is.',
    meta: [{k:'MODALITIES',v:'PET, CT, MRI, US, Thermal'},{k:'COUNT',v:'9 images'},{k:'CONSENSUS',v:'None'},{k:'DOMINANT_PALETTE',v:'Magenta / Cyan'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/tv_colorful.png',
    id: 'SPECIMEN_010 // BROADCAST',
    title: 'Broadcast\nBodies',
    desc: 'Forty-plus CRT televisions stacked floor-to-ceiling in an abandoned concrete space. Each screen shows a different medical scan: brain cross-sections in jewel tones, spinal columns in electric blue, chest cavities in magenta. Wires cascade from the stack like roots. Every body in the archive is being broadcast simultaneously to no one. The signal is live.',
    meta: [{k:'SCREENS',v:'40+'},{k:'SIGNAL',v:'Live'},{k:'AUDIENCE',v:'None confirmed'},{k:'LOCATION',v:'Abandoned structure'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/hand_trio.png',
    id: 'SPECIMEN_011 // PROCESSOR_OFFER',
    title: 'Processor\nOffering (Trio)',
    desc: 'Three Victorian brass instrument stands — the type used to display specimens. Each supports an articulated arm terminating in a gloved hand. Each hand holds a microprocessor chip between thumb and forefinger. The gesture is identical across all three. Whether they offer or present or threaten is left to the viewer. The chips are real. The hands are marble-white.',
    meta: [{k:'COUNT',v:'3 units'},{k:'MATERIAL',v:'Brass / Marble composite'},{k:'SPECIMEN',v:'CPU chip'},{k:'GESTURE',v:'Offering / Unresolved'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/cartography.png',
    id: 'SPECIMEN_012 // OCEAN_MAP',
    title: 'Cartographie des\nCourants Océaniques',
    desc: 'A global current map rendered in false color — zero to ninety on the velocity scale. The Gulf Stream blazes red at the upper Atlantic. Current vectors mark direction across every ocean basin. The scale on the left runs from 1.0 to 16.6. This is not a map of water. It is a map of where the ocean has decided to go, and how fast it has decided to go there.',
    meta: [{k:'TYPE',v:'Oceanographic'},{k:'SCALE',v:'0 — 90'},{k:'HOTSPOT',v:'Gulf Stream / North Atlantic'},{k:'SOURCE',v:'Remote sensing'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/neuron_figure.png',
    id: 'SPECIMEN_013 // NEURO_HIER',
    title: 'Neural Hierarchy\nFigure 11-3',
    desc: 'Three levels of resolution in one diagram. At top: an artificial neural network, 1cm scale, nodes and weights. Below it: the biological neuron unit — dendrites branching, axon extending, synapse forming. At base: the synapse in cross-section, 10 microns. Vesicles releasing. Receptors receiving. The network above does not know it is modeling the thing below it. The synapse does not know it is being modeled.',
    meta: [{k:'SCALE_MACRO',v:'1 cm (ANN)'},{k:'SCALE_MICRO',v:'10 μm (synapse)'},{k:'FIGURE',v:'11-3'},{k:'LANGUAGE',v:'French'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/crispr_map.png',
    id: 'SPECIMEN_014 // ATMOS_TURB',
    title: 'Cartographie de la\nTurbulence Atmosphérique',
    desc: 'A patchwork map of atmospheric turbulence — each grid cell contains its own miniature flow visualization, colored by intensity. At the macro level: a vortex pattern emerges, centered around coordinates (8.0, 9.0). Black squares indicate data loss or sensor failure. The overall system is neither stable nor chaotic; it is between those states, as most things are.',
    meta: [{k:'TYPE',v:'Atmospheric / Turbulence'},{k:'SCALE',v:'0.0 — 15.8'},{k:'DATA_LOSS',v:'Multiple cells'},{k:'STRUCTURE',v:'Vortex (unconfirmed)'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/cells_up_close.png',
    id: 'SPECIMEN_015 // NUCLEOSOME',
    title: 'Nucleosome\nLandscape',
    desc: 'A molecular simulation at nanometer scale: hundreds of nucleosomes packed like alien fruit — orange, blue, teal — wrapped in purple chromatin fibers. Protein complexes hover above the surface: pink, gray, violet, blue. A green peptide snakes between them. This is the inside of a nucleus during active transcription. Everything here is reading or being read. Everything is a signal.',
    meta: [{k:'SCALE',v:'nm'},{k:'FEATURE',v:'Nucleosomes / Chromatin'},{k:'PROCESS',v:'Active transcription (probable)'},{k:'RESOLUTION',v:'Molecular simulation'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/microcontroller_diagram.png',
    id: 'SPECIMEN_016 // RETINAL_DIAG',
    title: 'Retinal Prosthetic\nCircuit Diagram',
    desc: 'A schematic for a visual prosthetic: photodiode layers on the left receive light input. A microprocessor converts signals. An electrode matrix on the right stimulates the optic nerve, which outputs rightward into darkness. The network of connections between layers mimics retinal ganglion cell topography. This is not a diagram of a device. It is a proposal for a new kind of seeing.',
    meta: [{k:'INPUT',v:'Photodiode Layer'},{k:'PROCESSOR',v:'Microprocesseur'},{k:'OUTPUT',v:'Nerf Optique'},{k:'LANGUAGE',v:'French'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/canal_bus.png',
    id: 'SPECIMEN_017 // SPINAL_IMP',
    title: 'Spinal Neural\nImplant Array',
    desc: 'A blueprint for a spinal cord connector implant. Colored wires — red, blue, yellow, green — emerge from the implant body and split at the synaptic bus into two identical circuit boards. Each board labels Canal Afférent, Canal Efférent, Bus Synaptique. Numbered channels 1–9 cross the implant core. This is what translation looks like when the languages are nerve and silicon.',
    meta: [{k:'CHANNELS',v:'9'},{k:'BOARDS',v:'2 (symmetric)'},{k:'SIGNAL',v:'Afferent + Efferent'},{k:'MEDIUM',v:'Neural / Silicon'}]
  },
  // NEW SPECIMENS
  {
    img: './website_experiments/crispr_surreal/crisper_assets/eye_microscopes.png',
    id: 'SPECIMEN_018 // OCL_001',
    title: 'Eye\nMicroscopes',
    desc: 'The eye turned instrument. Lenses where corneas should be. Magnification where sight once was. The microscope does not see — it measures. When the eye becomes the microscope, what does it measure? The distance between seeing and knowing collapses to nothing. The image produced has no viewer. It only has data.',
    meta: [{k:'CLASS',v:'Ocular / Instrument hybrid'},{k:'MAGNIFICATION',v:'Unknown'},{k:'SUBJECT',v:'Self-referential'},{k:'STATUS',v:'Active'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/ear_keys.png',
    id: 'SPECIMEN_019 // OCL_002',
    title: 'Ear Key\nMatrix',
    desc: 'Cochlear anatomy remapped as a key system. Each frequency band corresponds to a lock in the tympanic architecture. The basilar membrane as a corridor of doors. High frequency: small keys, shallow rooms. Low frequency: skeleton keys, chambers with no ceilings. This is not metaphor. The inner ear is already a frequency-sorting machine. It was already a key.',
    meta: [{k:'RANGE',v:'20Hz — 20kHz'},{k:'KEY_COUNT',v:'Uncounted'},{k:'LOCK_TYPE',v:'Hair cell / Mechanical'},{k:'ACCESS',v:'Restricted'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/eyes_trees.png',
    id: 'SPECIMEN_020 // OCL_003',
    title: 'Eyes in the\nTrees (Monochrome)',
    desc: 'A birch forest. Between the pale trunks: eyes. Not photographed, not painted — embedded. The bark has grown around them. Annual rings visible through the iris. These trees have been watching since before the archive existed. The archive only recently noticed them back. The photographs attached to each eye are of nothing recognizable. Field researchers declined to describe them.',
    meta: [{k:'SPECIES',v:'Betula pendula (modified)'},{k:'EYE_COUNT',v:'Indeterminate'},{k:'GROWTH_RING',v:'67 — 340 (variable)'},{k:'GAZE_DIR',v:'Inward'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/eyes_trees_colorful.png',
    id: 'SPECIMEN_021 // OCL_004',
    title: 'Arboreal\nChromatics',
    desc: 'The same forest in false color. The trees have not moved. The eyes have not moved. The spectrum has been shifted to reveal what normal vision suppresses. In this wavelength: the eyes are not passive. Thermal plumes rise from each iris. The trees are running warm. Whatever they are watching, they are paying attention.',
    meta: [{k:'SPECTRUM',v:'False-color thermal overlay'},{k:'THERMAL_DELTA',v:'+2.3°C (iris vs. bark)'},{k:'ATTENTION_STATE',v:'Active'},{k:'FIELD_NOTE',v:'Do not stand between trees'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/cell.png',
    id: 'SPECIMEN_022 // OCL_005',
    title: 'Cell\nSurface',
    desc: 'The plasma membrane at the threshold of resolution. Phospholipid bilayer: two layers of molecules facing in opposite directions, neither knowing the other is there. Receptor proteins protrude like antennae. The cell is waiting for a signal it has been trained to receive since before it knew what training was. It will respond correctly. It always does. This is called behavior.',
    meta: [{k:'STRUCTURE',v:'Plasma membrane'},{k:'THICKNESS',v:'7–10 nm'},{k:'STATE',v:'Resting potential'},{k:'SIGNAL',v:'Pending'}]
  },
  {
    img: './website_experiments/crispr_surreal/crisper_assets/cell_interior.png',
    id: 'SPECIMEN_023 // OCL_006',
    title: 'Cell\nInterior',
    desc: 'Everything the membrane was hiding. The nucleus sits off-center — it never sits at the exact center — surrounded by endoplasmic reticulum folded like a letter no one has ever opened. Mitochondria scattered throughout, each one a former bacterium that surrendered its autonomy two billion years ago and has not stopped producing energy since. The cytoplasm is not empty. It is extremely busy and has been for your entire life.',
    meta: [{k:'ORGANELLES',v:'Nucleus, ER, Mitochondria, Golgi'},{k:'VOLUME',v:'~2,000 μm³'},{k:'SYMBIONT',v:'Mitochondria (endosymbiotic)'},{k:'ACTIVITY',v:'Continuous'}]
  }
];
 
// ENTER SITE
function enterSite() {
  document.getElementById('intro').style.animation = 'introFade 0.5s ease forwards';
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('site').classList.add('visible');
  }, 500);
}
 
setTimeout(() => {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('site').classList.add('visible');
}, 4200);
 
// MODAL
function openModal(index) {
  const s = specimens[index];
  if (!s) return;
  document.getElementById('modalImg').src = s.img;
  document.getElementById('modalId').textContent = s.id;
  document.getElementById('modalTitle').innerHTML = s.title.replace('\n', '<br>');
  document.getElementById('modalDesc').textContent = s.desc;
  const metaEl = document.getElementById('modalMeta');
  metaEl.innerHTML = s.meta.map(m =>
    `<div class="meta-item"><div class="meta-key">${m.k}</div><div class="meta-val">${m.v}</div></div>`
  ).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
 
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
 
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
// CURSOR
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
 
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
  document.getElementById('statusCoords').textContent =
    `X: ${String(Math.round(e.clientX)).padStart(3,'0')} Y: ${String(Math.round(e.clientY)).padStart(3,'0')}`;
});
 
document.querySelectorAll('button, .asset-card, .seq-card, .ocular-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'var(--pink)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '40px';
    ring.style.height = '40px';
    ring.style.borderColor = 'var(--bio-green)';
  });
});
 
// GLITCH
function triggerGlitch() {
  document.body.classList.add('glitching');
  document.querySelectorAll('.asset-card img, .hero-img-stack img, .ocular-card img').forEach(img => {
    img.style.filter = 'saturate(3) hue-rotate(90deg) contrast(2)';
  });
  setTimeout(() => {
    document.body.classList.remove('glitching');
    document.querySelectorAll('.asset-card img, .hero-img-stack img, .ocular-card img').forEach(img => {
      img.style.filter = '';
    });
  }, 300);
}
 
setInterval(() => { if (Math.random() < 0.08) triggerGlitch(); }, 4000);
 
// PARTICLE TRAIL
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
 
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
document.addEventListener('mousemove', e => {
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: e.clientX + (Math.random() - 0.5) * 20,
      y: e.clientY + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 2 - 0.5,
      life: 1,
      size: Math.random() * 3 + 1,
      color: Math.random() < 0.5 ? '#00ff41' : '#ff2d78'
    });
  }
});
 
function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.life -= 0.02; p.vy += 0.02;
    ctx.globalAlpha = p.life * 0.6;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animParticles);
}
animParticles();
 
// PARALLAX
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.img-main');
  if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});
 
// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('.asset-card, .seq-card, .specimen-entry, .ocular-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});