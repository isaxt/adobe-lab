  // Custom cursor
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('trail');
  let mx = 0, my = 0, tx = 0, ty = 0;
 
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top  = my - 6 + 'px';
  });
 
  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx - 16 + 'px';
    trail.style.top  = ty - 16 + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
 
  // Hover cursor scale
  document.querySelectorAll('a, button, .asset-card, .poster-card, .glitch-img-item, .org-img, .chaos-img-cell').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      trail.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      trail.style.transform = 'scale(1)';
    });
  });
 
  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbLabel  = document.getElementById('lightbox-label');
 
  function openLightbox(src, label) {
    lbImg.src = src;
    lbLabel.textContent = label;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
 
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));