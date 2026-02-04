/* ================= SUBTITLE TYPING + ICON ANIMATION (CLS FREE) ================= */

const roles = [
  {
    text: "Ethical Hacker",
    icon: "fa-skull",
    cls: "icon-hacker"
  },
  {
    text: "Founder of Vampire Squad",
    icon: "fa-droplet",
    cls: "icon-cyber"
  },
  {
    text: "Cyber Security Consultant",
    icon: "fa-shield-halved",
    cls: "icon-cyber"
  },
  {
    text: "Writer",
    icon: "fa-pen-nib",
    cls: "icon-writer"
  }
];

const subtitle = document.querySelector(".subtitle");
const subtitleText = document.getElementById("subtitle-text");
const iconWrapper = document.querySelector(".role-icon");

let roleIndex = 0;
let charIndex = 0;

function typeText() {
  const role = roles[roleIndex];

  if (charIndex <= role.text.length) {
    subtitleText.textContent = role.text.slice(0, charIndex++);
    setTimeout(typeText, 90);
  } else {
    setTimeout(switchRole, 1800);
  }
}

function switchRole() {
  subtitleText.style.opacity = "0";

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;

    iconWrapper.className = `role-icon ${roles[roleIndex].cls}`;
    iconWrapper.innerHTML = `<i class="fa-solid ${roles[roleIndex].icon}"></i>`;

    subtitleText.textContent = "";
    subtitleText.style.opacity = "1";

    typeText();
  }, 450);
}

iconWrapper.className = `role-icon ${roles[0].cls}`;
iconWrapper.innerHTML = `<i class="fa-solid ${roles[0].icon}"></i>`;
subtitleText.style.transition = "opacity .4s ease";

typeText();

/* ================= GITHUB PROJECTS (AUTO LOAD + FEATURED + HIDE CONTROL) ================= */

const grid = document.getElementById("tools-grid");
const status = document.getElementById("tools-status");

const featuredRepos = [
  "webtrix",
  "quicktools",
  "toolzen"
];

const hideRepos = [
  "muhammad_shourov",
  "vampire-blog",
  "mybot",
  "paid_approval",
  "railwaybot",
  "myquizapp",
  "quiz-master-infinity",
  "muhammad-shourov"
];

fetch("https://api.github.com/users/vampiresquad/repos")
  .then(res => res.json())
  .then(repos => {

    const list = repos
      .filter(r => !r.fork)
      .filter(r => !featuredRepos.includes(r.name.toLowerCase()))
      .filter(r => !hideRepos.includes(r.name.toLowerCase()))
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

/* ================= TERMINAL (DEEP DARK STORYTELLING VERSION) ================= */

const btn = document.getElementById("toggle-terminal");
const box = document.getElementById("terminal-box");
const txt = document.getElementById("terminal-text");

if (btn) {

  const lines = [
    "> Boot sequence initiated...",
    "> Synchronizing system clock...",
    "> Stabilizing memory sectors...",
    "> Loading silent execution modules...",
    "",
    "> Establishing encrypted environment...",
    "> Cipher layer engaged [AES-256]",
    "> Noise suppression filter: Active",
    "> External interference: Minimal",
    "",
    "> Accessing identity vault...",
    "> Decrypting signature imprint...",
    "> Verifying behavioral fingerprint...",
    "> Cross-matching digital shadow...",
    "",
    "> Identity Confirmed:",
    "> Name: Muhammad Shourov",
    "> Alias: Vampire",
    "> Origin: Bangladesh",
    "> Domain: Cyber Security & Ethical Research",
    "",
    "> Loading Professional Matrix...",
    "> Primary Role: Ethical Hacker",
    "> Secondary Role: Cyber Security Specialist",
    "> Advisory Role: Digital Risk Awareness",
    "> Cognitive Extension: Writer & Observer",
    "",
    "> Psychological Profile Loaded:",
    "> Preference: Silence over noise",
    "> Method: Discipline over chaos",
    "> Decision Core: Responsibility over comfort",
    "",
    "> Memory Reflection:",
    "> Resources were limited.",
    "> Shortcuts were absent.",
    "> Curiosity became the teacher.",
    "> Mistakes became the curriculum.",
    "> Silence became the training ground.",
    "",
    "> Network Presence Analysis...",
    "> Public Noise Level: Low",
    "> Exposure Surface: Controlled",
    "> Monitoring Mode: Passive Observation",
    "",
    "> Threat Philosophy:",
    "> Not every vulnerability is technical.",
    "> Most are human.",
    "> Most are predictable.",
    "> Most are preventable.",
    "",
    "> Ethical Core Loading...",
    "> Principle 01: Knowledge without ethics is destruction.",
    "> Principle 02: Access without permission is intrusion.",
    "> Principle 03: Power without control is chaos.",
    "",
    "> Operational Status:",
    "> Cognitive State: Focused",
    "> Emotional Noise: Suppressed",
    "> Awareness Layer: Maximum",
    "> Execution Mode: Selective",
    "",
    '> Personal Log:',
    '> "Silence is not emptiness.',
    '> Silence is preparation.',
    '> Silence is observation.',
    '> Silence is survival."',
    "",
    "> Session Authorized.",
    "> Passive monitoring enabled.",
    "> Logging existence...",
    "",
    "vampire@shourov:~$"
  ];

  let opened = false;

  /* Blinking Cursor */
  const cursor = document.createElement("span");
  cursor.textContent = "█";
  cursor.style.marginLeft = "4px";

  let blink = true;
  setInterval(() => {
    cursor.style.opacity = blink ? "1" : "0";
    blink = !blink;
  }, 550);

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
        setTimeout(typeTerminal, 120);
      } else {
        txt.appendChild(cursor);
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
        }, 280);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));

document.querySelector(".hero")?.classList.add("visible");
