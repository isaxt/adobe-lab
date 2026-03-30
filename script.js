  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal, .timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // QUESTION TOGGLE
  function toggleQ(card) {
    card.classList.toggle('open');
    const expand = card.querySelector('.q-expand');
    expand.textContent = card.classList.contains('open') ? '− CLOSE' : '+ EXPAND';
  }

  // SUBMIT RESPONSE
  const responses = [];
  function submitResponse() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    const pool = document.getElementById('responsePool');
    const card = document.createElement('div');
    card.className = 'response-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'all 0.4s ease';
    card.textContent = text;
    pool.appendChild(card);
    input.value = '';

    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }

  // DOWNLOAD BAR ANIMATION
  function animateDl() {
    const fill = document.getElementById('dlFill');
    const pct = document.getElementById('dlPercent');
    const status = document.getElementById('dlStatus');
    let current = 0;

    const messages = [
      [0, 'Connecting to peers...'],
      [20, 'Found 3 seeders — human_creativity_network'],
      [45, 'Downloading authenticity from shared cache...'],
      [67, 'Integrity check: AMBIGUOUS'],
      [85, 'Almost there — verifying authorship...'],
      [95, 'Warning: origin unclear. Proceeding anyway.'],
      [100, 'AUTHENTICITY.ZIP — download complete (provenance: unknown)']
    ];

    let msgIdx = 0;

    const interval = setInterval(() => {
      current = Math.min(current + Math.random() * 3, 100);
      fill.style.width = current + '%';
      pct.textContent = Math.floor(current) + '%';

      while (msgIdx < messages.length && current >= messages[msgIdx][0]) {
        status.textContent = messages[msgIdx][1];
        msgIdx++;
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          current = 0;
          msgIdx = 0;
          fill.style.transition = 'none';
          fill.style.width = '0%';
          pct.textContent = '0%';
          setTimeout(() => {
            fill.style.transition = 'width 2s ease';
            animateDl();
          }, 100);
        }, 4000);
      }
    }, 80);
  }

  // START DOWNLOAD ANIMATION WHEN IN VIEW
  const dlObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateDl();
        dlObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const dlPanel = document.getElementById('dlFill');
  if (dlPanel) dlObserver.observe(dlPanel.closest('.win-panel'));