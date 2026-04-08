/* =========================================
   BLOOD CIPHER — PORTFOLIO SCRIPT
   Muhammad Shourov (Vampire)
   ========================================= */

/* ============ PARTICLE CANVAS ============ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const HEX = '0123456789abcdef';

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.init(true); }
    init(scatter) {
      this.x      = Math.random() * canvas.width;
      this.y      = scatter ? Math.random() * canvas.height : canvas.height + Math.random() * 120;
      this.speedY = Math.random() * 0.48 + 0.12;
      this.speedX = (Math.random() - 0.5) * 0.18;
      this.opacity = Math.random() * 0.32 + 0.04;
      this.fade    = Math.random() * 0.00022 + 0.00012;
      this.type    = Math.random() > 0.62 ? 'hex' : 'dot';
      this.char    = HEX[Math.floor(Math.random() * 16)];
      this.color   = Math.random() > 0.52 ? '#c0152a' : '#22d3ee';
      this.size    = Math.random() * 1.4 + 0.5;
      this.fontSize = Math.random() * 7 + 7;
    }
    update() {
      this.y       -= this.speedY;
      this.x       += this.speedX;
      this.opacity -= this.fade;
      if (this.y < -20 || this.opacity <= 0 || this.x < -20 || this.x > canvas.width + 20) {
        this.init(false);
      }
    }
    draw() {
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle   = this.color;
      if (this.type === 'hex') {
        ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
        ctx.fillText(this.char, this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  const COUNT = 90;
  const particles = Array.from({ length: COUNT }, () => new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ============ CUSTOM CURSOR ============ */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
})();

/* ============ SCROLL PROGRESS ============ */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });
})();

/* ============ NAV SCROLL + ACTIVE LINK ============ */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ============ HAMBURGER MENU ============ */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      btn.classList.remove('open');
      menu.classList.remove('open');
    }
  });
})();

/* ============ TYPING ANIMATION ============ */
(function () {
  const el = document.getElementById('subtitle-text');
  if (!el) return;

  const roles = [
    'Ethical Hacker',
    'Cyber Security Specialist',
    'Founder of Vampire Squad',
    'Creative Writer'
  ];

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 42 : 78);
  }
  tick();
})();

/* ============ SCROLL REVEAL ============ */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Staggered items
  const itemObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
        itemObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-item').forEach((el, i) => {
    el.dataset.delay = i * 115;
    itemObs.observe(el);
  });
})();

/* ============ GITHUB REPOSITORIES ============ */
(function () {
  const grid   = document.getElementById('tools-grid');
  const status = document.getElementById('tools-status');
  if (!grid || !status) return;

  const featured = ['webtrix', 'quicktools', 'toolzen', 'trox'];
  const hidden   = ['muhammad_shourov','vampire-blog','mybot','paid_approval','railwaybot','myquizapp','quiz-master-infinity','muhammad-shourov'];

  fetch('https://api.github.com/users/vampiresquad/repos?per_page=100')
    .then(r => r.json())
    .then(repos => {
      const list = repos
        .filter(r => !r.fork)
        .filter(r => !featured.includes(r.name.toLowerCase()))
        .filter(r => !hidden.includes(r.name.toLowerCase()))
        .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)))
        .slice(0, 6);

      if (!list.length) {
        status.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> No public repositories to display.';
        return;
      }

      status.style.display = 'none';

      list.forEach((repo, i) => {
        const card = document.createElement('div');
        card.className = 'project-card reveal-item';
        card.dataset.delay = i * 110;
        card.innerHTML = `
          <div class="proj-top">
            <span class="pbadge" style="color:var(--muted);border:1px solid var(--border)">
              <i class="fa-brands fa-github"></i> REPO
            </span>
            <span class="pver">${repo.stargazers_count} ★</span>
          </div>
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description provided.'}</p>
          <a href="${repo.html_url}" target="_blank" class="proj-link">
            View Source <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        `;
        grid.appendChild(card);

        // observe the dynamically added card
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.delay || 0));
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.08 });
        obs.observe(card);
      });
    })
    .catch(() => {
      status.innerHTML = '<i class="fa-solid fa-network-wired"></i> Could not connect to GitHub servers.';
    });
})();

/* ============ TERMINAL ENGINE ============ */
(function () {
  const btn  = document.getElementById('toggle-terminal');
  const box  = document.getElementById('terminal-box');
  const txt  = document.getElementById('terminal-text');
  if (!btn || !box || !txt) return;

  const lines = [
    { t: '> boot sequence initiated...',                    c: '#22d3ee', s: 48 },
    { t: '> synchronizing system clock...',                 c: '#22d3ee', s: 50 },
    { t: '> loading encrypted execution modules...',        c: '#06b6d4', s: 55 },
    { t: '> cipher layer engaged [AES-256]',                c: '#06b6d4', s: 60 },
    { t: '> establishing secure environment...',            c: '#06b6d4', s: 62 },
    { t: '',                                                c: '#333',    s: 0  },
    { t: '> accessing identity vault...',                   c: '#22c55e', s: 75 },
    { t: '> identity confirmed: Muhammad Shourov',          c: '#22c55e', s: 85 },
    { t: '> alias: Vampire',                               c: '#22c55e', s: 90 },
    { t: '',                                                c: '#333',    s: 0  },
    { t: '> loading professional matrix...',                c: '#38bdf8', s: 80 },
    { t: '> role: Ethical Hacker & Security Specialist',    c: '#38bdf8', s: 88 },
    { t: '> initializing vampire squad protocols...',       c: '#38bdf8', s: 85 },
    { t: '> project trox v2.0 — SECURE & ONLINE',          c: '#38bdf8', s: 90 },
    { t: '',                                                c: '#333',    s: 0  },
    { t: '> loading philosophical core...',                 c: '#a78bfa', s: 92 },
    { t: '> silence over noise. discipline over chaos.',    c: '#a78bfa', s: 100},
    { t: '> dual entity: cyber warrior && creative writer', c: '#a78bfa', s: 100},
    { t: '',                                                c: '#333',    s: 0  },
    { t: '> ethical directive loaded:',                     c: '#facc15', s: 88 },
    { t: '> "if i cannot help — i will never harm"',        c: '#facc15', s: 105},
    { t: '',                                                c: '#333',    s: 0  },
    { t: '> writing unspoken truths...',                    c: '#e879f9', s: 105},
    { t: '> all systems fully operational.',                c: '#22c55e', s: 80 },
    { t: '',                                                c: '#333',    s: 0  },
    { t: 'vampire@shourov:~$ ',                             c: '#22d3ee', s: 0  }
  ];

  let opened = false;

  // Blinking block cursor at end
  const cur = document.createElement('span');
  cur.textContent = '█';
  cur.style.cssText = 'margin-left:2px;animation:blink 0.9s step-end infinite;';

  btn.addEventListener('click', () => {
    box.classList.toggle('active');
    btn.innerHTML = box.classList.contains('active')
      ? '<i class="fa-solid fa-power-off"></i> Terminate Session'
      : '<i class="fa-solid fa-power-off"></i> Initialize Terminal';

    if (opened) return;
    opened = true;
    txt.innerHTML = '';
    let li = 0;

    function nextLine() {
      if (li >= lines.length) { txt.appendChild(cur); return; }
      const line = lines[li];
      const div  = document.createElement('div');
      div.style.color = line.c;
      txt.appendChild(div);
      let ci = 0;

      function nextChar() {
        if (ci < line.t.length) {
          div.textContent += line.t[ci++];
          txt.scrollTop = txt.scrollHeight;
          setTimeout(nextChar, line.s);
        } else {
          li++;
          setTimeout(nextLine, line.t.length === 0 ? 30 : 100);
        }
      }
      nextChar();
    }
    nextLine();
  });
})();

/* ============ HERO ENTRY ANIMATION ============ */
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Stagger hero text elements
    const els = document.querySelectorAll('.hero-greeting, .hero-name, .hero-alias, .hero-role, .hero-tagline, .hero-cta');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 130);
    });
  });
})();
