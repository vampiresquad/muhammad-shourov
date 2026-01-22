console.log(`
> Vampire Terminal v1.0
> Identity confirmed
> Welcome.
`);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute('href'));
    if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
  };
});

// TYPING EFFECT
const roles = [
  'Ethical Hacker',
  'Founder of Vampire Squad',
  'Cyber Security Consultant',
  'Writer'
];
let r = 0, c = 0, del = false;
const subtitle = document.querySelector('.subtitle');

(function type() {
  const text = roles[r];
  subtitle.textContent = del ? text.slice(0, c--) : text.slice(0, c++);
  if (!del && c > text.length + 10) del = true;
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  setTimeout(type, del ? 40 : 80);
})();

// SECTION REVEAL
const sections = document.querySelectorAll('.section');
const reveal = () => sections.forEach(s => {
  if (s.getBoundingClientRect().top < innerHeight - 120) s.classList.add('show');
});
window.addEventListener('scroll', reveal);
reveal();

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, dots = [];

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
resize(); window.onresize = resize;

for (let i = 0; i < 60; i++) {
  dots.push({ x: Math.random()*w, y: Math.random()*h, dx: Math.random()-0.5, dy: Math.random()-0.5 });
}

(function animate() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = 'rgba(34,211,238,0.4)';
  dots.forEach(d => {
    d.x+=d.dx; d.y+=d.dy;
    if(d.x<0||d.x>w) d.dx*=-1;
    if(d.y<0||d.y>h) d.dy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,1.5,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(animate);
})();

// CURSOR
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// TERMINAL
const btn = document.getElementById('toggle-terminal');
const box = document.getElementById('terminal-box');
const txt = document.getElementById('terminal-text');
const lines = [
  'Initializing...',
  'Identity: Muhammad Shourov',
  'Role: Ethical Hacker',
  'Status: Active',
  'Access Granted.'
];
btn.onclick = () => {
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
  txt.textContent = '';
  let i = 0;
  (function typeLine(){
    if(i<lines.length){
      txt.textContent += lines[i++] + '\n';
      setTimeout(typeLine, 400);
    }
  })();
};
