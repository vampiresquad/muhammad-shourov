// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

// Typing effect
const roles = [
  'Ethical Hacker',
  'Founder of Vampire Squad',
  'Cyber Security Consultant',
  'Writer'
];

const subtitle = document.querySelector('.subtitle');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    subtitle.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      setTimeout(() => deleting = true, 1200);
    }
  } else {
    subtitle.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// GitHub tools loader
const toolsContainer = document.getElementById('tools-container');
fetch('https://api.github.com/users/vampiresquad/repos')
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description available.'}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        toolsContainer.appendChild(card);
      });
  });

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  status.textContent = res.ok
    ? "Message sent successfully."
    : "Something went wrong.";
  form.reset();
});
