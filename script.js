/* Typing effect */
const roles = [
  "Ethical Hacker",
  "Founder of Vampire Squad",
  "Cyber Security Consultant",
  "Writer"
];

let r = 0, c = 0, del = false;
const sub = document.querySelector(".subtitle");

(function type() {
  const text = roles[r];
  sub.textContent = del ? text.slice(0, --c) : text.slice(0, ++c);

  if (!del && c > text.length + 6) del = true;
  if (del && c === 0) {
    del = false;
    r = (r + 1) % roles.length;
  }
  setTimeout(type, del ? 45 : 85);
})();

/* GitHub projects */
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

/* Terminal */
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
    btn.textContent = box.classList.contains("active") ? "Close Terminal" : "Open Terminal";

    if (opened) return;
    opened = true;

    txt.textContent = "";
    let i = 0;
    (function t() {
      if (i < lines.length) {
        txt.textContent += lines[i++] + "\n";
        setTimeout(t, 350);
      }
    })();
  };
}
/* ===== CINEMATIC SCROLL TRIGGER (FINAL) ===== */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 280); // intentional cinematic pause
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));

/* Hero shows instantly */
document.querySelector(".hero")?.classList.add("visible");
