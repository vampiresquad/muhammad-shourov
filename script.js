/* ================= SUBTITLE CINEMATIC ROTATION (CLS FREE) ================= */

const roles = [
  "Ethical Hacker",
  "Founder of Vampire Squad",
  "Cyber Security Consultant",
  "Writer"
];

const subtitle = document.querySelector(".subtitle");
const subtitleText = document.getElementById("subtitle-text");

let roleIndex = 0;

/*
  IMPORTANT:
  - No typing delete
  - No width/height change
  - Only fade-out → text swap → fade-in
*/
function rotateSubtitle() {
  subtitle.classList.remove("fade-in");
  subtitle.classList.add("fade-out");

  setTimeout(() => {
    subtitleText.textContent = roles[roleIndex];
    subtitle.classList.remove("fade-out");
    subtitle.classList.add("fade-in");

    roleIndex = (roleIndex + 1) % roles.length;
  }, 450); // fade-out duration
}

// initial load
rotateSubtitle();

// rotation interval
setInterval(rotateSubtitle, 3200);

/* ================= GITHUB PROJECTS ================= */

const grid = document.getElementById("tools-grid");
const status = document.getElementById("tools-status");

fetch("https://api.github.com/users/vampiresquad/repos")
  .then(res => res.json())
  .then(repos => {
    const list = repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    if (!list.length) {
      status.textContent = "Projects are temporarily unavailable.";
      return;
    }

    list.forEach(repo => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      grid.appendChild(card);
    });
  })
  .catch(() => {
    status.textContent = "Projects are temporarily unavailable.";
  });

/* ================= TERMINAL ================= */

const btn = document.getElementById("toggle-terminal");
const box = document.getElementById("terminal-box");
const txt = document.getElementById("terminal-text");

if (btn) {
  const lines = [
    "> Initializing secure environment...",
    "> Identity verified.",
    "> Role: Ethical Hacker",
    "> Principle: Responsibility before curiosity",
    "> Status: Active",
    "",
    "vampire@shourov:~$"
  ];

  let opened = false;

  btn.onclick = () => {
    box.classList.toggle("active");
    btn.textContent = box.classList.contains("active")
      ? "Close Terminal"
      : "Open Terminal";

    if (opened) return;
    opened = true;

    txt.textContent = "";
    let i = 0;

    (function typeTerminal() {
      if (i < lines.length) {
        txt.textContent += lines[i++] + "\n";
        setTimeout(typeTerminal, 350);
      }
    })();
  };
}

/* ================= CINEMATIC SCROLL REVEAL ================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 280); // cinematic pause
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));

/* Hero shows instantly */
document.querySelector(".hero")?.classList.add("visible");
