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

// ===== DRAGGABLE POPUPS =====
function makeDraggable(popup) {
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
    popup.style.left   = (e.clientX - ox) + 'px';
    popup.style.top    = (e.clientY - oy) + 'px';
    popup.style.right  = 'auto';
    popup.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

document.querySelectorAll('.popup').forEach(makeDraggable);

// ===== RANDOM POPUP SPAWNER =====
// Messages reference popup_1–5 as flavour; images displayed via <img> inside popup body
const funnyMessages = [
  {
    title: "Warning",
    icon: "⚠️",
    text: "Windows has categorized you a government employee. Switching to sleep mode.",
    img: "sdv_oldweb_assets/popup_1.png"
  },
  {
    title: "Random Error",
    icon: "❌",
    text: "Windows 96 has detected a random error. This error occurs every once in a while. Please wait.",
    img: null
  },
  {
    title: "Virus Alert",
    icon: "⚠️",
    text: "You've got the flue",
    img: "sdv_oldweb_assets/popup_2.png"
  },
  {
    title: "Printer Wizard",
    icon: "🖨️",
    text: "The new and incredible 32bit intelligent wizard has obtained a solution to your printing problem. do not print.",
    img: null
  },
  {
    title: "SV Alert",
    icon: "🌾",
    text: "Your crops are ready for harvest! (please go outside)",
    img: "sdv_oldweb_assets/popup_3.png"
  },
  {
    title: "Farm Update",
    icon: "🐔",
    text: "A void chicken has escaped the coop. Please locate your void chicken.",
    img: null
  },
  {
    title: "Closing Windows 95",
    icon: "❓",
    text: "You are about to exit Windows 95. Do you want to play another game?",
    img: "sdv_oldweb_assets/popup_4.png"
  },
  {
    title: "Dialog box",
    icon: "❓",
    text: "Sorry, Windows 95 was unable to comply with the 'go to hell' command you specified.",
    img: "sdv_oldweb_assets/popup_5.png"
  }
];

let popupCount = 0;

function spawnRandomPopup() {
  if (popupCount > 6) return;
  const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  const div = document.createElement('div');
  div.className = 'popup';
  div.style.top    = (Math.random() * 55 + 10) + 'vh';
  div.style.left   = (Math.random() * 55 + 5)  + 'vw';
  div.style.zIndex = 9999;

  // Optionally embed a popup screenshot image above the text
  const imgHtml = msg.img
    ? `<img src="${msg.img}" alt="" style="width:100%; display:block; image-rendering:pixelated; margin-bottom:6px;">`
    : '';

  div.innerHTML = `
    <div class="popup-titlebar">
      <div class="title-text">${msg.icon} ${msg.title}</div>
      <div class="popup-controls">
        <div class="popup-btn" onclick="this.closest('.popup').remove(); popupCount--;">✕</div>
      </div>
    </div>
    ${imgHtml ? '<div style="padding:6px 8px 0;">' + imgHtml + '</div>' : ''}
    <div class="popup-body">
      <div class="popup-icon">${msg.icon}</div>
      <div class="popup-text">${msg.text}</div>
    </div>
    <div class="popup-footer">
      <button class="win-btn" onclick="this.closest('.popup').remove(); popupCount--;">OK</button>
    </div>
  `;
  document.body.appendChild(div);
  popupCount++;
  makeDraggable(div);
}

setInterval(spawnRandomPopup, 12000);

// ===== DESKTOP ICON INTERACTIONS =====
// Double-click a desktop icon to get a fun response popup
const iconResponses = {
  'Farm Calc':   { title: '🧮 Farm Calc', text: '1 Parsnip × 597 = enough gold to buy Robin\'s whole shop. Probably.' },
  'My Saves':    { title: '📁 My Saves', text: 'Save file corrupted. Your 800 hours of progress are... just kidding. Probably.' },
  'Crop Notes':  { title: '📄 Crop Notes', text: 'Note: DO NOT forget to water. Note: watered everything. Note: forgot to harvest. Classic.' },
  'Coffee.exe':  { title: '☕ Coffee.exe', text: 'Coffee boost activated. Energy: +50. Farm productivity: unknowable. Please hydrate.' },
  'SV-FARM.bat': { title: '💻 SV-FARM.bat', text: 'Running... SV-FARM.bat\nC:\\>FARM /all /nonstop\nProcess cannot stop. Farm never ends.' },
  'Ye Olde Web': { title: '🌐 Ye Olde Web', text: 'Connecting to the Information Superhighway... \nDialing... Dialing... \n*screeeee ka-chunk*' },
  'Scarecrow':   { title: '🌾 Scarecrow', text: 'Scarecrow equipped. Crows: scared. Rabbits: somehow not scared. Farm: 50% vibes.' },
  'Chickens':    { title: '🐔 Chickens', text: '8 chickens, 6 eggs, 2 void eggs, and one of them is DEFINITELY plotting something.' }
};

document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('dblclick', () => {
    const label = icon.querySelector('span').textContent.trim();
    const resp  = iconResponses[label];
    if (!resp) return;

    const div = document.createElement('div');
    div.className = 'popup';
    div.style.top    = '30vh';
    div.style.left   = '30vw';
    div.style.zIndex = 10001;
    div.style.width  = '300px';
    div.innerHTML = `
      <div class="popup-titlebar">
        <div class="title-text">${resp.title}</div>
        <div class="popup-controls">
          <div class="popup-btn" onclick="this.closest('.popup').remove()">✕</div>
        </div>
      </div>
      <div class="popup-body">
        <div class="popup-text" style="white-space:pre-line;">${resp.text}</div>
      </div>
      <div class="popup-footer">
        <button class="win-btn" onclick="this.closest('.popup').remove()">OK</button>
      </div>
    `;
    document.body.appendChild(div);
    makeDraggable(div);
  });
});