  const entries = [
    { date: "Spring 14, Year 3:", text: "Finally unlocked the greenhouse!! I spent ALL of spring getting those bundles done. Now I can grow strawberries all year round. Also the void chickens laid some eggs today which means MORE void mayo which means MORE gold. Perfection is within reach..." },
    { date: "Spring 13, Year 3:", text: "Sebastian came over to visit the farm today. He said the purple decorations look 'actually really cool.' That's basically a 10/10 compliment from him. Also my iridium sprinklers arrived!! Life is good!!" },
    { date: "Spring 10, Year 3:", text: "Why does Pierre not carry more seeds. I need MORE blueberry seeds. I have so many plots. I am going to become the richest farmer in Pelican Town. Robin is building me another barn next week." },
    { date: "Winter 28, Year 2:", text: "Last day of the year!! Did a total farm reset -- okay not RESET but I reorganized everything. The pentagram crop design in the field took 3 in-game days to plan. Worth it. 100% worth it." }
  ];
 
  function showEntry(idx, el) {
    document.getElementById('diary-text').innerHTML =
      '<div class="diary-date">' + entries[idx].date + '</div>' + entries[idx].text;
    document.querySelectorAll('.diary-entry-list li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');
  }
 
  // Draggable popups
  document.querySelectorAll('.popup').forEach(popup => {
    const titlebar = popup.querySelector('.popup-titlebar');
    let dragging = false, ox = 0, oy = 0;
 
    titlebar.addEventListener('mousedown', e => {
      dragging = true;
      ox = e.clientX - popup.offsetLeft;
      oy = e.clientY - popup.offsetTop;
      popup.style.zIndex = 10000;
    });
 
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      popup.style.left = (e.clientX - ox) + 'px';
      popup.style.top = (e.clientY - oy) + 'px';
      popup.style.right = 'auto';
      popup.style.bottom = 'auto';
    });
 
    document.addEventListener('mouseup', () => { dragging = false; });
  });
 
  // Random popup spawner
  const funnyMessages = [
    { title: "Warning", icon: "⚠️", text: "Windows has categorized you a government employee. Switching to sleep mode." },
    { title: "Random Error", icon: "❌", text: "Windows 96 has detected a random error. This error occurs every once in a while. Please wait." },
    { title: "Virus Alert", icon: "⚠️", text: "You've got the flue" },
    { title: "Printer Wizard", icon: "🖨️", text: "The new and incredible 32bit intelligent wizard has obtained a solution to your printing problem. do not print." },
    { title: "SV Alert", icon: "🌾", text: "Your crops are ready for harvest! (please go outside)" },
  ];
 
  let popupCount = 0;
  function spawnRandomPopup() {
    if (popupCount > 6) return;
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    const div = document.createElement('div');
    div.className = 'popup';
    div.style.top = (Math.random() * 60 + 10) + 'vh';
    div.style.left = (Math.random() * 60 + 5) + 'vw';
    div.style.zIndex = 9999;
    div.innerHTML = `
      <div class="popup-titlebar">
        <div class="title-text">${msg.icon} ${msg.title}</div>
        <div class="popup-controls"><div class="popup-btn" onclick="this.closest('.popup').remove(); popupCount--;">✕</div></div>
      </div>
      <div class="popup-body"><div class="popup-icon">${msg.icon}</div><div class="popup-text">${msg.text}</div></div>
      <div class="popup-footer"><button class="win-btn" onclick="this.closest('.popup').remove(); popupCount--;">OK</button></div>
    `;
    document.body.appendChild(div);
    popupCount++;
 
    // Make draggable
    const tb = div.querySelector('.popup-titlebar');
    let dragging = false, ox = 0, oy = 0;
    tb.addEventListener('mousedown', e => { dragging = true; ox = e.clientX - div.offsetLeft; oy = e.clientY - div.offsetTop; });
    document.addEventListener('mousemove', e => { if (!dragging) return; div.style.left = (e.clientX - ox)+'px'; div.style.top=(e.clientY-oy)+'px'; div.style.right='auto'; div.style.bottom='auto'; });
    document.addEventListener('mouseup', () => dragging = false);
  }
 
  setInterval(spawnRandomPopup, 12000);