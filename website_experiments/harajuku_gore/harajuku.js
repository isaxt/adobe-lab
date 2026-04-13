const bg = document.getElementById('bgImg');
  window.addEventListener('scroll', () => {
    bg.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px)';
  });

  document.addEventListener('click', e => {
    for (let i = 0; i < 5; i++) {
      const d = document.createElement('div');
      d.className = 'bdrop';
      d.style.left   = (e.clientX + (Math.random()-0.5)*24) + 'px';
      d.style.top    = e.clientY + 'px';
      d.style.animationDelay = (i*0.07) + 's';
      d.style.width  = (4 + Math.random()*7) + 'px';
      d.style.height = (7 + Math.random()*11) + 'px';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2200);
    }
  });

  let n = 6661;
  setInterval(() => {
    n += Math.floor(Math.random()*2);
    document.getElementById('ctr').textContent = String(n).padStart(6,'0');
  }, 8000);