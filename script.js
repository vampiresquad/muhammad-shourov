/* =========================================
   VAMPIRE SQUAD - PREMIUM CYBER SCRIPT
   ========================================= */

/* ================= CUSTOM CURSOR & TRAIL ================= */
const cursor = document.getElementById("custom-cursor");
const trail = document.getElementById("cursor-trail");

if (cursor && trail) {
  document.addEventListener("mousemove", (e) => {
    // Update main cursor instantly
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Update trail with a slight delay for smooth effect
    setTimeout(() => {
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    }, 60);
  });

  // Add hover effect on interactive elements
  const interactables = document.querySelectorAll("a, button, .card, input, textarea, .bengali-quote");
  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
      trail.style.borderColor = "transparent"; // Hide trail border on hover
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
      trail.style.borderColor = "var(--neon-cyan)"; // Restore trail border
    });
  });
}

/* ================= SUBTITLE TYPING + ICON ANIMATION ================= */
const roles = [
  {
    text: "Ethical Hacker",
    icon: "fa-user-secret",
    cls: "icon-hacker"
  },
  {
    text: "Cyber Security Specialist",
    icon: "fa-shield-halved",
    cls: "icon-cyber"
  },
  {
    text: "Founder of Vampire Squad",
    icon: "fa-users-viewfinder",
    cls: "icon-cyber"
  },
  {
    text: "Creative Writer",
    icon: "fa-pen-nib",
    cls: "icon-writer"
  }
];

const subtitleText = document.getElementById("subtitle-text");
const iconWrapper = document.querySelector(".role-icon");

if (subtitleText && iconWrapper) {
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

  // Initialize first role
  iconWrapper.className = `role-icon ${roles[0].cls}`;
  iconWrapper.innerHTML = `<i class="fa-solid ${roles[0].icon}"></i>`;
  subtitleText.style.transition = "opacity .4s ease";

  typeText();
}

/* ================= GITHUB PROJECTS (FETCH + FILTER + HIDE) ================= */
const grid = document.getElementById("tools-grid");
const status = document.getElementById("tools-status");

// Repos to feature manually (won't be fetched automatically)
const featuredRepos = ["webtrix", "quicktools", "toolzen", "trox"];

// Repos to hide completely from the portfolio
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

if (grid && status) {
  fetch("https://api.github.com/users/vampiresquad/repos")
    .then(res => res.json())
    .then(repos => {
      // Filter, Sort, and Slice
      const list = repos
        .filter(r => !r.fork)
        .filter(r => !featuredRepos.includes(r.name.toLowerCase()))
        .filter(r => !hideRepos.includes(r.name.toLowerCase()))
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      if (!list.length) {
        status.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Projects are temporarily unavailable or hidden.';
        return;
      }

      status.style.display = "none"; // Hide loading text

      list.forEach(repo => {
        const card = document.createElement("div");
        card.className = "card premium-card";

        card.innerHTML = `
          <h3><i class="fa-brands fa-github"></i> ${repo.name}</h3>
          <p class="card-note">${repo.description || "No description provided."}</p>
          <a href="${repo.html_url}" target="_blank" class="project-link"><i class="fa-solid fa-code-branch"></i> View Source</a>
        `;

        grid.appendChild(card);
      });
    })
    .catch(() => {
      status.innerHTML = '<i class="fa-solid fa-network-wired"></i> Failed to establish connection with GitHub Servers.';
    });
}

/* ================= ADVANCED TERMINAL ENGINE ================= */
const btn = document.getElementById("toggle-terminal");
const box = document.getElementById("terminal-box");
const txt = document.getElementById("terminal-text");

if (btn && box && txt) {
  const lines = [
    { t: "> Boot sequence initiated...", c: "#22d3ee", s: 60 },
    { t: "> Synchronizing system clock...", c: "#22d3ee", s: 60 },
    { t: "> Loading silent execution modules...", c: "#22d3ee", s: 70 },
    
    { t: "> Establishing encrypted environment...", c: "#06b6d4", s: 80 },
    { t: "> Cipher layer engaged [AES-256]", c: "#06b6d4", s: 90 },

    { t: "> Accessing identity vault...", c: "#22c55e", s: 90 },
    { t: "> Identity Confirmed: Muhammad Shourov", c: "#22c55e", s: 100 },
    { t: "> Alias: Vampire", c: "#22c55e", s: 100 },

    { t: "> Loading Professional Matrix...", c: "#38bdf8", s: 90 },
    { t: "> Role: Ethical Hacker & Security Specialist", c: "#38bdf8", s: 100 },
    { t: "> Initializing Vampire Squad protocols...", c: "#38bdf8", s: 100 },
    { t: "> Project Trox v2.0 status: SECURE & ONLINE", c: "#38bdf8", s: 100 },

    { t: "> Psychological Profile Loaded...", c: "#a78bfa", s: 100 },
    { t: "> Silence over noise. Discipline over chaos.", c: "#a78bfa", s: 110 },
    { t: "> Dual Entity: Cyber Warrior && Creative Writer", c: "#a78bfa", s: 110 },

    { t: "> Ethical Core Loaded...", c: "#facc15", s: 100 },
    { t: "> 'If I cannot help someone, I will never harm them.'", c: "#facc15", s: 120 },

    { t: "> Writing unspokable truths...", c: "#e879f9", s: 120 },
    { t: "> System fully operational.", c: "#27c93f", s: 100 },

    { t: "vampire@shourov:~$ ", c: "#22d3ee", s: 120 }
  ];

  let opened = false;

  /* Blinking Cursor Block */
  const cursorBlock = document.createElement("span");
  cursorBlock.textContent = "█";
  cursorBlock.style.marginLeft = "4px";

  let blink = true;
  setInterval(() => {
    cursorBlock.style.opacity = blink ? "1" : "0";
    blink = !blink;
  }, 500);

  btn.onclick = () => {
    box.classList.toggle("active");

    btn.innerHTML = box.classList.contains("active")
      ? '<i class="fa-solid fa-power-off"></i> Terminate Session'
      : '<i class="fa-solid fa-power-off"></i> Initialize Terminal';

    if (opened) return;
    opened = true;

    txt.innerHTML = "";
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) {
        txt.appendChild(cursorBlock);
        return;
      }

      const line = lines[lineIndex];
      const lineEl = document.createElement("div");
      lineEl.style.color = line.c;
      txt.appendChild(lineEl);

      let char = 0;

      function typeChar() {
        if (char < line.t.length) {
          lineEl.textContent += line.t[char++];
          txt.scrollTop = txt.scrollHeight;
          setTimeout(typeChar, line.s);
        } else {
          lineIndex++;
          setTimeout(typeLine, 120);
        }
      }

      typeChar();
    }

    typeLine();
  };
}

/* ================= CINEMATIC SCROLL REVEAL ================= */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 150);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => observer.observe(section));

// Reveal Hero Section immediately on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector(".hero")?.classList.add("visible");
});
