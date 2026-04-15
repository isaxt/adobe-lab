  /* Oracle toggle */
  const oracle = document.getElementById('oracle');
  const oracleResponse = document.getElementById('oracle-response');
  const redacted = document.getElementById('redacted-word');

  oracle.addEventListener('click', () => {
    const isOpen = oracle.classList.toggle('open');
    oracle.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      redacted.classList.add('revealed');
    }
  });
  oracle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      oracle.click();
    }
  });

  /* Date reveal */
  const dateEl = document.getElementById('date-redacted');
  dateEl.addEventListener('click', () => {
    dateEl.classList.toggle('revealed');
  });

  /* All redacted spans */
  document.querySelectorAll('.redacted').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('revealed'));
  });

  /* Occasional random glitch flash on body */
  function scheduleGlitch() {
    const delay = 4000 + Math.random() * 10000;
    setTimeout(() => {
      const els = document.querySelectorAll('.img-fragment img, .overflow-cell img');
      if (els.length) {
        const target = els[Math.floor(Math.random() * els.length)];
        target.style.animation = 'glitch-img 0.4s steps(3)';
        setTimeout(() => { target.style.animation = ''; }, 420);
      }
      scheduleGlitch();
    }, delay);
  }
  scheduleGlitch();

  /* Subtle title flicker additional timing */
  const t1 = document.querySelector('.title-layer-1');
  function scheduleTitle() {
    setTimeout(() => {
      t1.style.transform = `skewX(${(Math.random()-0.5)*1.5}deg)`;
      setTimeout(() => { t1.style.transform = ''; }, 100);
      scheduleTitle();
    }, 5000 + Math.random() * 15000);
  }
  scheduleTitle();