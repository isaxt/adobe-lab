  const scene = document.getElementById('scene');
  const sceneRect = () => scene.getBoundingClientRect();

  // Subtle parallax on mouse move
  scene.addEventListener('mousemove', (e) => {
    const rect = sceneRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;   // -0.5 to 0.5
    const dy = (e.clientY - cy) / rect.height;

    scene.querySelectorAll('img[data-speed]').forEach(el => {
      const spd = parseFloat(el.dataset.speed) * 22;
      const baseTransform = el.style.getPropertyValue('--base') || '';
      // preserve existing CSS transform for elements with animation
      const className = el.className;
      if (className === 'angel-face') {
        el.style.transform = `translateX(-55%) translateY(${-dy * spd}px) translateX(${dx * spd * 0.5}px)`;
      } else if (className === 'split-statue') {
        el.style.transform = `translateX(-50%) translateY(${-dy * spd}px)`;
      } else {
        el.style.transform = `translateY(${-dy * spd}px) translateX(${dx * spd * 0.5}px)`;
      }
    });
  });

  scene.addEventListener('mouseleave', () => {
    scene.querySelectorAll('img[data-speed]').forEach(el => {
      const className = el.className;
      if (className === 'angel-face') el.style.transform = '';
      else if (className === 'split-statue') el.style.transform = 'translateX(-50%)';
      else el.style.transform = '';
    });
  });

  const quotes = [
  "“What is important is to spread confusion, not eliminate it.”― Salvador Dalí",
  " “The dream remembered me first.”- ChatGPT (2026) ",
  " “You have to systematically create confusion, it sets creativity free. Everything that is contradictory creates life”― Salvador Dalí ",
  "Softness is a kind of gravity.",
  "Nothing here is entirely still.",
  "You were almost real."
];

const quoteContainer = document.getElementById("quote-container");

function spawnQuote() {
  const div = document.createElement("div");
  div.className = "quote";

  // pick random quote
  div.innerText = quotes[Math.floor(Math.random() * quotes.length)];

  // random position
  div.style.left = Math.random() * 80 + "%";
  div.style.top = Math.random() * 80 + "%";

  quoteContainer.appendChild(div);

  // remove after animation completes
  setTimeout(() => {
    div.remove();
  }, 6000);
}

// spawn every few seconds
setInterval(spawnQuote, 2500);
