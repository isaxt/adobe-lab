  // ─── ASSET DATA ───
  const assets = [
    { file: 'textile_assets/global_textile.png', label: 'Global Textile', desc: 'CO₂ emissions mapped to textile density' },
    { file: 'textile_assets/acoustic_linguistic.png', label: 'Acoustic Linguistic', desc: 'Sound frequency as thread color' },
    { file: 'textile_assets/woodnotes.png', label: 'Woodnotes', desc: 'Finnish design data visualization' },
    { file: 'textile_assets/three_posters.png', label: 'Three Posters', desc: 'Comparative pattern studies' },
    { file: 'textile_assets/woodnotes_textiles.png', label: 'Woodnotes Textiles', desc: 'Material and data' },
    { file: 'textile_assets/emotional_density.png', label: 'Emotional Density', desc: 'Affect mapped to weave structure' },
    { file: 'textile_assets/variable_a.png', label: 'Variable A', desc: 'Multivariable network diagram' },
    { file: 'textile_assets/community_well_being.png', label: 'Community Well-being', desc: 'Social data in color bars' },
    { file: 'textile_assets/sleep_pattern.png', label: 'Sleep Pattern', desc: 'Circadian rhythm as weft' },
    { file: 'textile_assets/textile_data.png', label: 'Textile Data', desc: 'Raw measurement in thread' },
    { file: 'textile_assets/urban_noise.png', label: 'Urban Noise', desc: 'Sound pollution as concentric rings' },
    { file: 'textile_assets/microbiome.png', label: 'Microbiome', desc: 'Soil diversity visualization' },
    { file: 'textile_assets/plant_growth.png', label: 'Plant Growth', desc: 'Growth stress chart' },
    { file: 'textile_assets/circular_memory.png', label: 'Circular Memory', desc: 'Radial encoding of time' },
    { file: 'textile_assets/microplastic.png', label: 'Microplastic', desc: 'Pollution accumulation map' },
  ];

  // Grid layout patterns
  const layouts = [
    { col: 'span 1', row: 'span 2' }, // tall
    { col: 'span 2', row: 'span 1' }, // wide
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 2', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 2' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 2', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
  ];

  // Build gallery
  const grid = document.getElementById('gallery-grid');
  assets.forEach((asset, i) => {
    const layout = layouts[i % layouts.length];
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.style.gridColumn = layout.col;
    item.style.gridRow = layout.row;
    if (layout.row === 'span 2') item.style.aspectRatio = 'unset';
    item.style.transitionDelay = `${(i % 4) * 0.08}s`;
    item.innerHTML = `
      <img src="${asset.file}" alt="${asset.label}" loading="lazy"/>
      <div class="gallery-item-label">${asset.label}</div>
      <div class="pin">${String(i+1).padStart(2,'0')}</div>
    `;
    item.addEventListener('click', () => openLightbox(asset.file, asset.label, asset.desc));
    grid.appendChild(item);
  });

  // ─── LIGHTBOX ───
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');

  function openLightbox(src, label, desc) {
    lbImg.src = src;
    lbCaption.textContent = `${label} — ${desc}`;
    lightbox.classList.add('active');
  }
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  // ─── HERO SVG — Giorgia Lupi-style network ───
  (function buildHeroViz() {
    const svg = document.getElementById('hero-svg');
    const ns = 'http://www.w3.org/2000/svg';
    const W = 500, H = 500;

    // Background
    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('width', W); bg.setAttribute('height', H);
    bg.setAttribute('fill', '#ede8dd'); svg.appendChild(bg);

    // Grid lines (notebook)
    for (let x = 20; x < W; x += 20) {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', x); l.setAttribute('y1', 0);
      l.setAttribute('x2', x); l.setAttribute('y2', H);
      l.setAttribute('stroke', 'rgba(180,160,120,0.12)');
      l.setAttribute('stroke-width', '0.5');
      svg.appendChild(l);
    }
    for (let y = 20; y < H; y += 20) {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', 0); l.setAttribute('y1', y);
      l.setAttribute('x2', W); l.setAttribute('y2', y);
      l.setAttribute('stroke', 'rgba(180,160,120,0.12)');
      l.setAttribute('stroke-width', '0.5');
      svg.appendChild(l);
    }

    // Woven thread lines
    const colors = ['#b5471b','#4a6b8a','#5c7a5e','#c9922a','#8b7ba8','#d4826a'];
    const threadPaths = [
      'M40,80 Q140,40 220,120 Q300,200 380,140 Q440,100 460,180',
      'M30,200 Q100,160 180,220 Q280,290 360,230 Q420,190 470,260',
      'M60,320 Q140,280 200,340 Q300,410 380,350 Q440,310 460,380',
      'M80,140 Q160,200 240,160 Q320,120 400,190 Q450,220 470,300',
      'M40,440 Q120,400 200,450 Q300,500 390,440 Q440,410 470,460',
    ];

    threadPaths.forEach((d, i) => {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', colors[i % colors.length]);
      path.setAttribute('stroke-width', i === 0 ? '2' : '1.2');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.6');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
    });

    // Data nodes (circles at intersections)
    const nodes = [
      [220,120,'#b5471b',7],[380,140,'#4a6b8a',5],[180,220,'#5c7a5e',9],
      [360,230,'#c9922a',6],[200,340,'#8b7ba8',8],[380,350,'#d4826a',5],
      [240,160,'#b5471b',4],[400,190,'#4a6b8a',7],[200,450,'#5c7a5e',6],
      [390,440,'#c9922a',5],[300,290,'#8b7ba8',10],[140,200,'#d4826a',4],
    ];

    nodes.forEach(([x, y, color, r]) => {
      // Outer ring
      const ring = document.createElementNS(ns, 'circle');
      ring.setAttribute('cx', x); ring.setAttribute('cy', y);
      ring.setAttribute('r', r + 4);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', color);
      ring.setAttribute('stroke-width', '0.8');
      ring.setAttribute('opacity', '0.4');
      svg.appendChild(ring);
      // Fill
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y);
      c.setAttribute('r', r);
      c.setAttribute('fill', color);
      c.setAttribute('opacity', '0.85');
      svg.appendChild(c);
    });

    // Annotation text (Lupi-style)
    const annotations = [
      [100, 55, 'warp density →'],
      [320, 95, 'correlation r=0.73'],
      [40, 305, 'tension var.'],
      [310, 415, 'outlier event'],
      [240, 280, '← microbiome'],
    ];

    annotations.forEach(([x, y, text]) => {
      const t = document.createElementNS(ns, 'text');
      t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('font-family', 'DM Mono, monospace');
      t.setAttribute('font-size', '9');
      t.setAttribute('fill', '#1a1612');
      t.setAttribute('opacity', '0.45');
      t.textContent = text;
      svg.appendChild(t);

      // Small tick mark
      const tick = document.createElementNS(ns, 'line');
      tick.setAttribute('x1', x - 4); tick.setAttribute('y1', y + 3);
      tick.setAttribute('x2', x - 12); tick.setAttribute('y2', y + 3);
      tick.setAttribute('stroke', '#1a1612');
      tick.setAttribute('stroke-width', '0.7');
      tick.setAttribute('opacity', '0.3');
      svg.appendChild(tick);
    });

    // Small legend
    const legColors = ['#b5471b','#4a6b8a','#5c7a5e','#c9922a','#8b7ba8'];
    const legLabels = ['rust','blue','sage','ochre','lav.'];
    legColors.forEach((col, i) => {
      const lx = 20, ly = H - 60 + i * 12;
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', lx); dot.setAttribute('cy', ly);
      dot.setAttribute('r', 3); dot.setAttribute('fill', col);
      svg.appendChild(dot);
      const lab = document.createElementNS(ns, 'text');
      lab.setAttribute('x', lx + 8); lab.setAttribute('y', ly + 3);
      lab.setAttribute('font-family', 'DM Mono, monospace');
      lab.setAttribute('font-size', '7'); lab.setAttribute('fill', '#1a1612');
      lab.setAttribute('opacity', '0.45');
      lab.textContent = legLabels[i];
      svg.appendChild(lab);
    });
  })();

  // ─── STORY CHARTS ───
  function buildSmallChart(id, type) {
    const svg = document.getElementById(id);
    if (!svg) return;
    const ns = 'http://www.w3.org/2000/svg';
    const W = 240, H = 80;

    if (type === 'dots') {
      // Dot strip
      for (let i = 0; i < 20; i++) {
        const c = document.createElementNS(ns, 'circle');
        const x = 10 + i * 11;
        const y = 40 + (Math.sin(i * 0.9) * 20 + (Math.random() - 0.5) * 10);
        const r = 2 + Math.random() * 4;
        c.setAttribute('cx', x); c.setAttribute('cy', y);
        c.setAttribute('r', r);
        c.setAttribute('fill', ['#b5471b','#4a6b8a','#5c7a5e','#c9922a'][Math.floor(Math.random()*4)]);
        c.setAttribute('opacity', '0.7');
        svg.appendChild(c);
      }
    } else if (type === 'bars') {
      const vals = [0.3,0.6,0.8,0.5,0.9,0.4,0.7,0.55,0.65,0.85];
      vals.forEach((v, i) => {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', 8 + i * 23);
        rect.setAttribute('y', H - v * 60);
        rect.setAttribute('width', 16);
        rect.setAttribute('height', v * 60);
        rect.setAttribute('fill', i % 3 === 0 ? '#b5471b' : i % 3 === 1 ? '#4a6b8a' : '#5c7a5e');
        rect.setAttribute('opacity', '0.75');
        svg.appendChild(rect);
      });
    } else if (type === 'line') {
      const pts = Array.from({length:12}, (_,i) => [i*20+10, 40 + Math.sin(i*0.7)*25 + Math.cos(i*1.3)*10]);
      const d = pts.map((p,i) => (i===0?'M':'L') + p[0]+','+p[1]).join(' ');
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#c9922a');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
      pts.forEach(([x,y]) => {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', x); c.setAttribute('cy', y);
        c.setAttribute('r', 2); c.setAttribute('fill', '#c9922a'); c.setAttribute('opacity','0.8');
        svg.appendChild(c);
      });
    }
  }

  buildSmallChart('chart-collect', 'dots');
  buildSmallChart('chart-encode', 'bars');
  buildSmallChart('chart-weave', 'line');

  // ─── TECHNIQUE VIZS ───
  function buildTechViz(id, type) {
    const svg = document.getElementById(id);
    if (!svg) return;
    const ns = 'http://www.w3.org/2000/svg';

    if (type === 'ikat') {
      // Horizontal bars with gradient blur
      for (let i = 0; i < 8; i++) {
        const y = 10 + i * 10;
        for (let j = 0; j < 20; j++) {
          const rect = document.createElementNS(ns, 'rect');
          rect.setAttribute('x', j * 15);
          rect.setAttribute('y', y);
          rect.setAttribute('width', 14 + Math.random() * 4);
          rect.setAttribute('height', 7);
          rect.setAttribute('fill', ['#b5471b','#c9922a','#d4826a','#faf7f2'][Math.floor(Math.random()*4)]);
          rect.setAttribute('opacity', 0.4 + Math.random() * 0.5);
          svg.appendChild(rect);
        }
      }
    } else if (type === 'weft') {
      // Horizontal weave lines with floating threads
      for (let i = 0; i < 7; i++) {
        const y = 15 + i * 12;
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', 0); line.setAttribute('y1', y);
        line.setAttribute('x2', 300); line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(245,240,232,0.25)');
        line.setAttribute('stroke-width', '3');
        svg.appendChild(line);
      }
      // Floating accent threads
      [[20,30,280,25],[50,55,180,70],[90,15,220,50]].forEach(([x1,y1,x2,y2]) => {
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', `M${x1},${y1} Q${(x1+x2)/2},${(y1+y2)/2-15} ${x2},${y2}`);
        path.setAttribute('stroke', '#c9922a');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.8');
        svg.appendChild(path);
      });
    } else if (type === 'pile') {
      // Vertical lines of varying height
      for (let i = 0; i < 30; i++) {
        const x = 5 + i * 10;
        const h = 20 + Math.abs(Math.sin(i * 0.4) * 50) + Math.random() * 10;
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', x); line.setAttribute('y1', 90);
        line.setAttribute('x2', x); line.setAttribute('y2', 90 - h);
        line.setAttribute('stroke', ['#b5471b','#5c7a5e','#8b7ba8','#c9922a'][i % 4]);
        line.setAttribute('stroke-width', '2.5');
        line.setAttribute('opacity', '0.7');
        line.setAttribute('stroke-linecap', 'round');
        svg.appendChild(line);
      }
    } else if (type === 'color') {
      // Color swatch gradient bar
      const colors47 = [];
      for (let i = 0; i < 47; i++) {
        const t = i / 46;
        const r = Math.round(181 * (1-t) + 74 * t);
        const g = Math.round(71 * (1-t) + 107 * t);
        const b = Math.round(27 * (1-t) + 138 * t);
        colors47.push(`rgb(${r},${g},${b})`);
      }
      colors47.forEach((col, i) => {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', i * (300/47));
        rect.setAttribute('y', 30);
        rect.setAttribute('width', 300/47 + 1);
        rect.setAttribute('height', 20);
        rect.setAttribute('fill', col);
        svg.appendChild(rect);
      });
      // Labels
      ['min','median','max'].forEach((label, i) => {
        const t = document.createElementNS(ns, 'text');
        t.setAttribute('x', i === 0 ? 0 : i === 1 ? 140 : 280);
        t.setAttribute('y', 65);
        t.setAttribute('font-family', 'DM Mono, monospace');
        t.setAttribute('font-size', '8');
        t.setAttribute('fill', '#1a1612');
        t.setAttribute('opacity', '0.5');
        t.textContent = label;
        svg.appendChild(t);
      });
    }
  }

  buildTechViz('viz-ikat', 'ikat');
  buildTechViz('viz-weft', 'weft');
  buildTechViz('viz-pile', 'pile');
  buildTechViz('viz-color', 'color');

  // ─── SCROLL REVEAL ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ─── ANIMATED WOVEN CURSOR TRAIL ───
  const trails = [];
  const MAX_TRAILS = 8;
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.3) return;
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:3px;height:3px;border-radius:50%;
      background:${['#b5471b','#4a6b8a','#5c7a5e','#c9922a'][Math.floor(Math.random()*4)]};
      pointer-events:none;z-index:9999;opacity:0.6;
      transition:opacity 0.8s,transform 0.8s;
    `;
    document.body.appendChild(dot);
    trails.push(dot);
    if (trails.length > MAX_TRAILS) {
      const old = trails.shift();
      old.style.opacity = '0';
      setTimeout(() => old.remove(), 800);
    }
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'translateY(-8px)';
      setTimeout(() => dot.remove(), 900);
    });
  });