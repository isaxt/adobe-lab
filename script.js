/* ======================
   MODE SWITCH SYSTEM TOGGLE
====================== */
const toggles = document.querySelectorAll(".mode-toggle");

let manualMode = null;

toggles.forEach(btn => {
  btn.addEventListener("click", () => {
    toggles.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const mode = btn.dataset.mode;
    document.body.className = mode;
    manualMode = mode;
  });
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
  "What will caring about art look like?",
  "What will caring look like?",
  "What will art look like?"
];

let i = 0;
hero.addEventListener("click", () => {
  i = (i + 1) % variants.length;
  hero.innerText = variants[i];
});

/* ======================
   TIMELINE INTERACTION
====================== */
const timelineItems = document.querySelectorAll(".timeline-item");

window.addEventListener("scroll", () => {
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6) {
      item.classList.add("active");
    }
  });
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

/* ======================
   PARTICIPATION RANDOM RESPONSES
====================== */
const container = document.getElementById("participation");

function addResponse(text) {
  const div = document.createElement("div");
  div.className = "response";
  div.innerText = text;

  div.style.left = Math.random() * 80 + "%";
  div.style.top = Math.random() * 80 + "%";

  container.appendChild(div);
}

setInterval(() => {
  addResponse("This may have been generated.");
}, 2000);


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
