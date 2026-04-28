/* ======================
   MODE SWITCH SYSTEM TOGGLE
====================== */
const toggles = document.querySelectorAll(".mode-toggle");
const indicator = document.querySelector(".pill-indicator");
let manualMode = null;

function moveIndicator(btn) {
  indicator.style.left = btn.offsetLeft + "px";
  indicator.style.width = btn.offsetWidth + "px";
}

toggles.forEach(btn => {
  btn.addEventListener("click", () => {
    toggles.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    moveIndicator(btn);
    document.body.className = btn.dataset.mode;
    manualMode = btn.dataset.mode;
  });
});

// initialize position on load
window.addEventListener("DOMContentLoaded", () => {
  moveIndicator(document.querySelector(".mode-toggle.active"));
});

/* ======================
   MODE SWITCH ON SCROLL (disabled if manual)
====================== */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  if (manualMode) return; // ← THIS LINE IS KEY

  const scrollY = window.scrollY;
  const height = window.innerHeight;

  sections.forEach((section, i) => {
    const top = section.offsetTop;
    if (scrollY >= top - height/2) {
      if (i === 0) document.body.className = "machine";
      if (i === 1) document.body.className = "human";
      if (i === 2) document.body.className = "collision";
    }
  });
});

/* ======================
   HERO TOGGLE TEXT
====================== */
const hero = document.getElementById("heroText");
const variants = [
  "What will making art look like?",
  "What will *making* look like?",
  "What will art look like?"
];

let i = 0;
hero.addEventListener("click", () => {
  i = (i + 1) % variants.length;
  hero.innerText = variants[i];
});

/* ======================
   QUESTIONS INTERACTION
====================== */
const questions = document.querySelectorAll(".question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    questions.forEach(x => x.classList.remove("active"));
    q.classList.add("active");

    const answer = q.querySelector(".answer");
    answer.style.display = "block";
  });
});

/* ======================
   AUTHENTICITY DETECTOR
====================== */
document.addEventListener("mousemove", () => {
  const value = Math.floor(Math.random() * 100);
  document.getElementById("detector").innerText = `Human Authenticity: ${value}%`;
});

const container = document.getElementById("participation");

// 1. Create a pool of responses
const responses = {
  human: [
    "I wrote this.",
    "This feels intentional.",
    "There was a decision here."
  ],
  machine: [
    "This may have been generated.",
    "Pattern recognized.",
    "Statistically probable output."
  ],
  hybrid: [
    "Co-authored.",
    "Prompted into existence.",
    "Neither fully human nor machine."
  ]
};

// 2. Utility: pick a random item
function getRandomResponse() {
  const categories = Object.keys(responses); // ["human", "machine", "hybrid"]
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const pool = responses[randomCategory];
  return pool[Math.floor(Math.random() * pool.length)];
}

function addResponse() {
  const div = document.createElement("div");
  div.className = "response";

  // 3. Use random response instead of fixed text
  div.innerText = getRandomResponse();

  div.style.left = Math.random() * 80 + "%";
  div.style.top = Math.random() * 80 + "%";

  container.appendChild(div);
}

// 4. Call without argument
setInterval(addResponse, 2000);


/* ======================
   NAV ACTIVE STATE
====================== */

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section").forEach(section => {
    const top = section.offsetTop;
    if (scrollY >= top - 200) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});